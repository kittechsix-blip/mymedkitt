// RAPID gate (v3): every face number is found in its declared source; every expansion line is a verbatim excerpt. Fails on zero.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, loadStrips, loadApprovals, loadRegistry, makeCtx } from './lib/rapid-load.ts';

const V = await import(pathToFileURL(join(ROOT, 'src/services/rapid-verify.ts')).href);
const { verifyStrip, makeCanary, makeExcerptCanary, parseFindings, stripHash, approvalStatus } = V;

/** Ratchet: raise as the fleet lands strips, never lower. */
const MIN_STRIPS = 49;

const strips = await loadStrips();
const approvals = await loadApprovals();
const registry = await loadRegistry();
const ids = Object.keys(strips);

test(`registry holds at least ${MIN_STRIPS} strips (MIN_STRIPS ratchet)`, () => {
  assert.ok(ids.length >= MIN_STRIPS, `MIN_STRIPS: RAPID_STRIPS holds ${ids.length} strip(s), needs >= ${MIN_STRIPS}`);
});

test('every strip file is registered and every registered strip has a file', () => {
  const dir = join(ROOT, 'src/data/rapid');
  const files = readdirSync(dir).filter((f) => f.endsWith('.ts') && !['types.ts', 'index.ts', 'approvals.ts'].includes(f)).map((f) => f.slice(0, -3));
  for (const f of files) assert.ok(ids.includes(f), `strip file ${f}.ts is not registered in RAPID_STRIPS`);
  for (const id of ids) assert.ok(files.includes(id), `RAPID_STRIPS["${id}"] has no src/data/rapid/${id}.ts`);
  for (const [key, s] of Object.entries(strips)) assert.equal((s as { treeId: string }).treeId, key, `registry key ${key} != strip.treeId`);
});

test('approvals only name registered strips and carry well-formed hashes', () => {
  for (const [id, a] of Object.entries(approvals)) {
    assert.ok(ids.includes(id), `approval for "${id}" has no strip in RAPID_STRIPS`);
    assert.match(a.stripHash, /^[0-9a-f]{64}$/, `approval ${id} stripHash malformed`);
    assert.ok(a.regimenPins && typeof a.regimenPins === 'object', `approval ${id} regimenPins malformed`);
    for (const [tid, h] of Object.entries(a.regimenPins)) assert.match(h as string, /^[0-9a-f]{64}$/, `approval ${id} pin ${tid} malformed`);
    assert.ok(!('sourceHash' in a), `approval ${id} carries the v2 sourceHash field`);
    assert.match(a.approvedOn, /^\d{4}-\d{2}-\d{2}$/, `approval ${id} approvedOn malformed`);
    assert.ok(Array.isArray(a.ackedFlags) && a.ackedFlags.every((x: unknown) => typeof x === 'string'), `approval ${id} ackedFlags malformed`);
  }
});

for (const id of ids) {
  const strip = strips[id];
  test(`${id}: structure, face numbers, excerpts and sources`, async () => {
    const reg = registry[id];
    assert.ok(reg, `${id} is not in TREE_REGISTRY`);
    assert.ok(existsSync(join(ROOT, `src/data/trees/${id}.ts`)), `src/data/trees/${id}.ts missing`);
    const { ctx, tree } = await makeCtx(id);
    assert.ok(tree.nodes.length > 0, `${reg.prefix}_NODES is empty`);
    assert.ok(tree.criticalActions.length > 0, `${reg.prefix}_CRITICAL_ACTIONS is empty (the Critical fallback must exist)`);
    const r = verifyStrip(strip, ctx);
    assert.ok(r.tokensChecked > 0, `${id}: no tokens were checked`);
    assert.ok(r.excerptsChecked > 0, `${id}: no excerpt was checked (a steps tile needs >= 1 line)`);
    for (const t of r.tiles) {
      assert.ok(t.tokensChecked + t.figureWordsChecked + t.excerptsChecked > 0, `${id} > ${t.tileId}: tile contributed nothing`);
      assert.ok(!t.nodeCorpusEmpty, `${id} > ${t.tileId}: node corpus empty`);
    }
    assert.ok(r.tiles.some((t) => t.numeric), `${id}: strip has no numeric face token at all`);
    assert.deepEqual(r.failures.map((f: { message: string; nearest?: string[] }) => f.message + (f.nearest?.length ? `  [nearest same-unit source tokens: ${f.nearest.join(' | ')}]` : '')), []);

    // findings file
    const fp = join(ROOT, `research/rapid/${id}.findings.json`);
    assert.ok(existsSync(fp), `research/rapid/${id}.findings.json is missing`);
    const parsed = parseFindings(JSON.parse(readFileSync(fp, 'utf8')));
    assert.ok(typeof parsed !== 'string', `findings: ${parsed}`);
  });

  test(`${id}: canary (a mutated face number must turn the gate red on exactly that tile)`, async () => {
    const { ctx } = await makeCtx(id);
    const c = makeCanary(strip, ctx);
    assert.ok(c, `${id}: no numeric face token to mutate: a strip with no number cannot prove the gate looked`);
    const r = verifyStrip(c.strip, ctx);
    assert.ok(!r.ok, `${id}: canary mutated ${c.tileId}.${c.field} to ${c.token} and the gate stayed green`);
    // Only the mutated tile may gain failures (other tiles may already fail for unrelated reasons).
    const base = verifyStrip(strip, ctx);
    const gained = r.failures.filter((f: { message: string }) => !base.failures.some((b: { message: string }) => b.message === f.message));
    assert.ok(gained.length > 0 && gained.every((f: { tileId: string }) => f.tileId === c.tileId), `${id}: canary should add failures on exactly tile ${c.tileId}, got ${JSON.stringify(gained.map((f: { tileId: string }) => f.tileId))}`);
    assert.ok(r.failures.some((f: { kind: string }) => f.kind === 'token'), `${id}: canary produced no token failure`);
  });

  test(`${id}: excerpt canary (one changed character in one excerpt must hard-fail exactly that tile)`, async () => {
    const { ctx } = await makeCtx(id);
    const c = makeExcerptCanary(strip);
    assert.ok(c, `${id}: the strip has no excerpt to mutate (a steps tile needs >= 1 line): the gate cannot prove it looked`);
    const base = verifyStrip(strip, ctx);
    const r = verifyStrip(c.strip, ctx);
    const gained = r.failures.filter((f: { message: string }) => !base.failures.some((b: { message: string }) => b.message === f.message));
    assert.ok(gained.length > 0 && gained.every((f: { tileId: string; kind: string }) => f.tileId === c.tileId && f.kind === 'excerpt'), `${id}: excerpt canary on ${c.tileId}.${c.field} did not hard-fail exactly that tile`);
  });

  test(`${id}: docs/ build matches src/ (run \`bunx tsc --skipLibCheck --noUnusedLocals false\`)`, async () => {
    const m = await import(pathToFileURL(join(ROOT, 'docs/data/rapid/index.js')).href);
    const docsStrip = m.RAPID_STRIPS[id];
    assert.ok(docsStrip, `docs/data/rapid/index.js has no strip "${id}": run \`bunx tsc --skipLibCheck --noUnusedLocals false\``);
    assert.equal(stripHash(docsStrip), stripHash(strip), `docs/ strip "${id}" differs from src/: run \`bunx tsc --skipLibCheck --noUnusedLocals false\``);
    const da = await import(pathToFileURL(join(ROOT, 'docs/data/rapid/approvals.js')).href);
    assert.equal(V.canonicalJson(da.RAPID_APPROVALS), V.canonicalJson(approvals), 'docs/data/rapid/approvals.js differs from src/: run `bunx tsc --skipLibCheck --noUnusedLocals false`');
  });

  test(`${id}: approval status (notice only, never a failure)`, async () => {
    const { ctx } = await makeCtx(id);
    const st = approvalStatus(strip, ctx, approvals[id]);
    if (st.status === 'draft') console.log(`  [rapid] ${id}: draft (unapproved)`);
    else if (st.status === 'dropped') console.log(`  [rapid] NOTICE ${id}: approved but DROPPED, will not show to users: ${st.reasons.join('; ')}`);
  });
}
