// Check ONE strip without registering it and without tsc (read-only, writes nothing).
//   node scripts/rapid-check.ts <treeId>
// Loads src/data/rapid/<treeId>.ts and research/rapid/<treeId>.findings.json straight from src, runs the full gate-time
// verification (hard checks incl. excerpts, drug-as-steps, critical-coverage, plus the face and excerpt canaries).
// Exit 0 iff zero hard failures.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, makeCtx } from './lib/rapid-load.ts';
import { exportName } from './lib/rapid-register-lib.ts';

const V = await import(pathToFileURL(join(ROOT, 'src/services/rapid-verify.ts')).href);
const { verifyStrip, parseFindings, makeCanary, makeExcerptCanary, tileExcerpts, flagIds } = V;

const id = process.argv[2];
const die = (m: string): never => { console.error(`rapid-check: ${m}`); process.exit(2); };
if (!id || id.startsWith('-')) die('usage: node scripts/rapid-check.ts <treeId>');

const file = join(ROOT, `src/data/rapid/${id}.ts`);
if (!existsSync(file)) die(`src/data/rapid/${id}.ts does not exist`);
const mod = await import(pathToFileURL(file).href).catch((e: Error) => die(`cannot load ${id}.ts: ${e.message}`));
const name = exportName(id);
const strip = (mod as Record<string, any>)[name];
if (!strip) die(`${id}.ts must export "${name}" (found: ${Object.keys(mod).join(', ') || 'nothing'})`);
if (strip.treeId !== id) die(`${name}.treeId is "${strip.treeId}" but the file is ${id}.ts: they must match`);

const ffile = join(ROOT, `research/rapid/${id}.findings.json`);
if (!existsSync(ffile)) die(`research/rapid/${id}.findings.json is missing (use [] when there are no findings)`);
let parsed: unknown;
try { parsed = parseFindings(JSON.parse(readFileSync(ffile, 'utf8'))); } catch (e) { die(`${id}.findings.json is not valid JSON: ${(e as Error).message}`); }
if (typeof parsed === 'string') die(`${id}.findings.json: ${parsed}`);

let made: Awaited<ReturnType<typeof makeCtx>>;
try { made = await makeCtx(id); } catch (e) { die((e as Error).message); }
const { ctx, tree } = made!;
ctx.findings = parsed as never; // the file we just validated (makeCtx reads the same path)

const r = verifyStrip(strip, ctx);
const hard: { message: string; nearest?: string[] }[] = [...r.failures];

// canaries: the gate must go red on exactly the mutated tile
const canary = makeCanary(strip, ctx);
if (!canary) hard.push({ message: `CANARY: no numeric face token to mutate (a strip with no number cannot prove the gate looked)` });
else {
  const rc = verifyStrip(canary.strip, ctx);
  const gained = rc.failures.filter((f: any) => !r.failures.some((b: any) => b.message === f.message));
  if (!(gained.length > 0 && gained.every((f: any) => f.tileId === canary.tileId))) hard.push({ message: `CANARY: mutating ${canary.tileId}.${canary.field} did not turn the gate red on exactly that tile` });
}
const ecan = makeExcerptCanary(strip);
if (!ecan) hard.push({ message: 'CANARY: the strip has no excerpt to mutate (a steps tile needs >= 1 line)' });
else {
  const rc = verifyStrip(ecan.strip, ctx);
  const gained = rc.failures.filter((f: any) => !r.failures.some((b: any) => b.message === f.message));
  if (!(gained.length > 0 && gained.every((f: any) => f.tileId === ecan.tileId && f.kind === 'excerpt'))) hard.push({ message: `CANARY: changing one character of ${ecan.tileId}.${ecan.field} did not hard-fail exactly that tile` });
}

console.log(`HARD ${hard.length}`);
for (const f of hard) console.log(`  ${f.message}${f.nearest && f.nearest.length ? `\n      nearest: ${f.nearest.join(' | ')}` : ''}`);
console.log(`FLAGS ${r.flags.length}`);
for (const f of r.flags) console.log(`  ${f.id}\n      ${f.field}: ${f.text}${f.nearest.length ? '\n      ' + f.nearest.join('\n      ') : ''}`);

const cited = new Set<string>();
for (const v of strip.variants) for (const t of v.tiles) for (const n of t.nodeIds) cited.add(n);
console.log(`CRITICAL ACTIONS (${tree.criticalActions.length})`);
for (const c of tree.criticalActions) console.log(`  ${cited.has(c.nodeId) ? 'on strip    ' : 'NOT on strip'}  ${c.nodeId}  ${c.text.slice(0, 90)}`);

console.log('TILES');
for (const v of strip.variants) for (const t of v.tiles) {
  const n = (tileExcerpts(t) as unknown[]).length;
  console.log(`  ${v.id} > ${t.id} (${t.layout}): ${n} excerpt line(s)`);
}
console.log(`flag ids: ${flagIds(r).length}`);
process.exit(hard.length === 0 ? 0 : 1);
