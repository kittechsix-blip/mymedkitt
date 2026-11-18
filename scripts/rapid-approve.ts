// RAPID approval. Run ONLY for tree ids the owner has named in the current session.
//   node scripts/rapid-approve.ts <treeId> --hash <12 chars from the proof page> [--ack <flagId> ...]
//   --hash = first 12 chars of sha256(stripHash + sorted regimenPins + sorted flag ids), printed on the proof page: it binds the
//   approval to the strip, regimens and flags that were proofed.
//   node scripts/rapid-approve.ts --revoke <treeId>
// Refuses unless the HARD checks pass (incl. every excerpt) AND the --ack set EQUALS the strip's current flag set exactly.
// Writes stripHash, ackedFlags and regimenPins (sha256 of each drug tile's live regimen).
// "all" and any --ack-all are refused. Reads, asserts, THEN writes approvals.ts.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, loadStrips, loadApprovals, makeCtx } from './lib/rapid-load.ts';

const V = await import(pathToFileURL(join(ROOT, 'src/services/rapid-verify.ts')).href);
const { verifyStrip, stripHash, regimenPins, parseFindings, flagIds, ackDiff, approvalBinding } = V;
const FILE = join(ROOT, 'src/data/rapid/approvals.ts');

const args = process.argv.slice(2);
const revoke = args[0] === '--revoke';
const ids: string[] = [];
const acks: string[] = [];
let hashArg = '';
for (let i = revoke ? 1 : 0; i < args.length; i++) {
  if (args[i] === '--hash') {
    if (i + 1 >= args.length) { console.error('--hash needs the first 12 chars of the stripHash'); process.exit(2); }
    hashArg = args[++i];
  } else if (args[i] === '--ack') {
    if (i + 1 >= args.length) { console.error('--ack needs a flag id'); process.exit(2); }
    acks.push(args[++i]);
  } else ids.push(args[i]);
}
if (ids.length === 0 || ids.some((i) => i.startsWith('-') || i === 'all') || args.includes('--ack-all')) {
  console.error('usage: rapid-approve.ts <treeId> --hash <12 chars> [--ack <flagId> ...] | --revoke <treeId>   ("all" / --ack-all are not accepted)');
  process.exit(2);
}
if (!revoke && ids.length !== 1) { console.error('approve exactly one treeId at a time, with --hash'); process.exit(2); }
if (!revoke && !/^[0-9a-f]{12}$/.test(hashArg)) { console.error('--hash <12 chars from the proof page> is required (copy the command from the proof page)'); process.exit(2); }

type Appr = { stripHash: string; ackedFlags: string[]; approvedOn: string; regimenPins: Record<string, string> };
const strips = await loadStrips();
const approvals: Record<string, Appr> = { ...(await loadApprovals()) } as Record<string, Appr>;

for (const id of ids) {
  if (revoke) {
    if (!approvals[id]) { console.error(`${id}: not approved`); process.exit(1); }
    delete approvals[id];
    console.log(`${id}: revoked`);
    continue;
  }
  const strip = (strips as any)[id];
  if (!strip) { console.error(`${id}: no strip in RAPID_STRIPS`); process.exit(1); }
  const { ctx } = await makeCtx(id);
  const r = verifyStrip(strip, ctx);
  const binding = approvalBinding(strip, ctx.getDrug, r);
  if (binding !== hashArg) { console.error(`${id}: REFUSED: --hash ${hashArg} does not match the current strip, regimens and flag set (${binding}). Something changed since the proof page was generated: regenerate it and re-read it.`); process.exit(1); }
  const problems: string[] = r.failures.map((f: any) => f.message);
  let findingsRaw: unknown;
  try { findingsRaw = JSON.parse(readFileSync(join(ROOT, `research/rapid/${id}.findings.json`), 'utf8')); } catch { findingsRaw = null; }
  const findings = parseFindings(findingsRaw);
  if (typeof findings === 'string') problems.push(`findings: ${findings}`);
  if (problems.length) { console.error(`${id}: REFUSED (hard failures)\n  ` + problems.join('\n  ')); process.exit(1); }
  const { missing, extra } = ackDiff(r, acks);
  if (missing.length || extra.length) {
    console.error(`${id}: REFUSED: the --ack set must EQUAL the strip's current flag set.`);
    if (missing.length) console.error('  flags not acknowledged:\n    ' + missing.join('\n    '));
    if (extra.length) console.error('  acknowledged but not flagged:\n    ' + extra.join('\n    '));
    process.exit(1);
  }
  for (const v of strip.variants) for (const t of v.tiles) console.log(`  ${id} > ${v.id} > ${t.id}: ${t.action} | ${t.figure} | sources ${t.nodeIds.join(', ')}`);
  approvals[id] = { stripHash: stripHash(strip), ackedFlags: flagIds(r), approvedOn: new Date().toISOString().slice(0, 10), regimenPins: regimenPins(strip, ctx.getDrug) };
  console.log(`${id}: approved ${approvals[id].stripHash.slice(0, 12)} with ${approvals[id].ackedFlags.length} acknowledged flag(s)`);
}

// read -> assert -> write
const current = readFileSync(FILE, 'utf8');
if (!current.includes('export const RAPID_APPROVALS')) { console.error('approvals.ts has an unexpected shape; not writing'); process.exit(1); }
const body = Object.keys(approvals).sort().map((k) => `  ${JSON.stringify(k)}: { stripHash: '${approvals[k].stripHash}', approvedOn: '${approvals[k].approvedOn}', ackedFlags: ${JSON.stringify([...approvals[k].ackedFlags].sort())}, regimenPins: ${JSON.stringify(approvals[k].regimenPins)} },\n`).join('');
writeFileSync(FILE, `// myMedKitt — RAPID approvals. Changes ONLY through scripts/rapid-approve.ts, and only for ids the\n// owner has named in that session. Drafting agents never edit this file.\nimport type { RapidApproval } from './types.js';\n\nexport const RAPID_APPROVALS: Readonly<Record<string, RapidApproval>> = {\n${body}};\n`);
console.log('approvals.ts updated');
