import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { ROOT } from './lib/rapid-load.ts';
import { exportName, renderIndex, stripIdsFromFiles } from './lib/rapid-register-lib.ts';

test('exportName: RAPID_ + treeId upper-cased, non-alphanumerics as "_"', () => {
  assert.equal(exportName('afib-rvr'), 'RAPID_AFIB_RVR');
  assert.equal(exportName('anaphylaxis'), 'RAPID_ANAPHYLAXIS');
  assert.equal(exportName('a-b.c d2'), 'RAPID_A_B_C_D2');
});

test('stripIdsFromFiles ignores types / index / approvals and non-ts files, sorted', () => {
  assert.deepEqual(stripIdsFromFiles(['types.ts', 'zeta.ts', 'index.ts', 'approvals.ts', 'alpha.ts', 'notes.md', 'alpha.js']), ['alpha', 'zeta']);
});

test('renderIndex: sorted by treeId, one import and one entry per strip, keeps the RAPID_STRIPS export', () => {
  const out = renderIndex(['zeta', 'alpha-one']);
  assert.ok(out.indexOf("from './alpha-one.js'") < out.indexOf("from './zeta.js'"));
  assert.ok(out.includes('export const RAPID_STRIPS: Readonly<Record<string, RapidStrip>>'));
  assert.ok(out.includes('[RAPID_ALPHA_ONE.treeId]: RAPID_ALPHA_ONE,'));
  assert.notEqual(renderIndex(['alpha-one']), out);
});

test('index.ts is up to date with the strip files (--check exits 0)', () => {
  const ids = stripIdsFromFiles(readdirSync(`${ROOT}/src/data/rapid`));
  assert.equal(readFileSync(`${ROOT}/src/data/rapid/index.ts`, 'utf8'), renderIndex(ids));
  const r = spawnSync(process.execPath, [`${ROOT}/scripts/rapid-register.ts`, '--check'], { encoding: 'utf8', cwd: ROOT });
  assert.equal(r.status, 0, r.stderr);
  assert.notEqual(readFileSync(`${ROOT}/src/data/rapid/index.ts`, 'utf8'), renderIndex([...ids, 'not-yet-registered']), 'a new strip file would make --check fail');
});
