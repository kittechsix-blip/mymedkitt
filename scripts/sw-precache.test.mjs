import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, mkdtempSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { classifyAsset, collectAssets } from './sw-precache-classify.mjs';
import { writeStableJson } from './lib/write-stable-json.mjs';

const docs = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const { core, lazy } = collectAssets(docs);
const coreSet = new Set(core.map((f) => f.path));
const lazySet = new Set(lazy.map((f) => f.path));

test('docs has a meaningful number of files (the walk really looked)', () => {
  assert.ok(core.length > 300, `core=${core.length}`);
  assert.ok(lazy.length > 100, `lazy=${lazy.length}`);
});

test('every data/trees, services and components js file is CORE', () => {
  for (const dir of ['data/trees', 'services', 'components']) {
    const files = readdirSync(join(docs, dir)).filter((f) => f.endsWith('.js'));
    assert.ok(files.length > 0, dir);
    for (const f of files) assert.ok(coreSet.has(`./${dir}/${f}`), `${dir}/${f} must be CORE`);
  }
});

test('infographics and skill are LAZY; procedure apps are CORE (offline from install)', () => {
  for (const p of coreSet) assert.ok(!/^\.\/(infographics|skill)\//.test(p), p);
  assert.ok([...lazySet].some((p) => p.startsWith('./infographics/')));
  for (const p of lazySet) assert.ok(!p.startsWith('./procedures/'), p);
  for (const id of ['chest-tube', 'thoracotomy-procedure', 'arterial-line']) {
    assert.ok(coreSet.has(`./procedures/${id}/index.html`), id);
  }
});

test('no path appears in both lists', () => {
  for (const p of lazySet) assert.ok(!coreSet.has(p), p);
});

test('visual-review/ and images/ appear in neither list', () => {
  for (const p of [...coreSet, ...lazySet]) {
    assert.ok(!/^\.\/(visual-review|images)\//.test(p), p);
    assert.ok(!p.startsWith('./assets/icons/source/'), p);
    assert.notEqual(p, './sw.js');
  }
});

test('classifier rules on synthetic paths', () => {
  assert.equal(classifyAsset('images/x/a.png', 10), null);
  assert.equal(classifyAsset('visual-review/a.html', 10), null);
  assert.equal(classifyAsset('sw.js', 10), null);
  assert.equal(classifyAsset('infographics/dka.html', 10), 'lazy');
  assert.equal(classifyAsset('assets/big.png', 5_000_000), 'lazy');
  assert.equal(classifyAsset('assets/small.png', 1000), 'core');
  assert.equal(classifyAsset('data/huge.json', 9_000_000), 'core');
  assert.equal(classifyAsset('data/trees/x.js', 9_000_000), 'core');
  assert.equal(classifyAsset('assets/mymedkitt-bag-transparent.png', 515246), 'core');
});

test('writeStableJson keeps the old timestamp (and bytes) when content is unchanged', () => {
  const f = join(mkdtempSync(join(tmpdir(), 'wsj-')), 'x.json');
  writeStableJson(f, { generated: 'T1', n: 1, a: [1] });
  const first = readFileSync(f, 'utf8');
  assert.equal(writeStableJson(f, { generated: 'T2', n: 1, a: [1] }), false);
  assert.equal(readFileSync(f, 'utf8'), first);
  assert.equal(writeStableJson(f, { generated: 'T3', n: 2, a: [1] }), true);
  assert.equal(JSON.parse(readFileSync(f, 'utf8')).generated, 'T3');
});
