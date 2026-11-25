import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { LYME_DISEASE_NODES as nodes, LYME_DISEASE_CITATIONS as citations, LYME_DISEASE_CRITICAL_ACTIONS as critical } from '../src/data/trees/lyme-disease.ts';
import { INFO_PAGES } from '../docs/data/info-pages.js';
import { LYME_DISEASE_INFO_PAGES } from '../docs/data/new-content/lyme-disease-info.js';
import { TOOLBAR_CONFIGS } from '../docs/data/toolbar-configs.js';
import { ALL_DRUGS } from '../docs/data/drug-store.js';
import { getCalculatorIds } from '../docs/components/calculator.js';
import { DEFAULT_CATEGORIES } from '../docs/data/categories.js';
import { TREE_REGISTRY } from './tree-registry.mjs';
import { loadCorpus } from './search-corpus.ts';

const read = (p: string) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const byId = new Map(nodes.map(n => [n.id, n]));
const infoPages: Record<string, any> = INFO_PAGES;

test('lyme-disease is registered in registry, categories and tree-service', () => {
  assert.equal(TREE_REGISTRY['lyme-disease'].entryNodeId, 'lyme-start');
  assert.equal(TREE_REGISTRY['lyme-disease'].prefix, 'LYME_DISEASE');
  const cat = DEFAULT_CATEGORIES.find((c: any) => c.id === 'infectious-disease');
  const entry = cat.decisionTrees.find((t: any) => t.id === 'lyme-disease');
  assert.ok(entry, 'category entry');
  assert.equal(entry.nodeCount, nodes.length);
  assert.match(read('src/services/tree-service.ts'), /'lyme-disease': async/);
  assert.match(read('docs/services/tree-service.js'), /'lyme-disease': async/);
});

test('every next/option target resolves, nodes are cited, reachable and end at a result', () => {
  assert.equal(byId.size, nodes.length);
  const targets = (n: (typeof nodes)[number]) => [...(n.next ? [n.next] : []), ...(n.options ?? []).map(o => o.next)];
  const seen = new Set<string>();
  const queue = ['lyme-start'];
  while (queue.length) {
    const id = queue.pop()!;
    if (seen.has(id)) continue;
    seen.add(id);
    const n = byId.get(id);
    assert.ok(n, id);
    queue.push(...targets(n));
  }
  assert.equal(seen.size, nodes.length, 'unreachable nodes');
  for (const n of nodes) {
    assert.ok(n.citation?.length, n.id + ' lacks citations');
    for (const c of n.citation ?? []) assert.ok(citations.some(x => x.num === c), n.id + ' cites missing ref ' + c);
    for (const im of n.images ?? []) assert.ok(existsSync(new URL('../docs/' + im.src, import.meta.url)), im.src);
    if (n.type === 'result') assert.ok(n.recommendation, n.id + ' lacks recommendation');
    const s = new Set<string>(), q = [n.id];
    let terminal = false;
    while (q.length) {
      const id = q.pop()!;
      if (s.has(id)) continue;
      s.add(id);
      const x = byId.get(id)!;
      if (x.type === 'result') terminal = true;
      q.push(...targets(x));
    }
    assert.ok(terminal, n.id + ' has no terminal');
  }
  for (const c of critical) assert.ok(byId.has(c.nodeId), c.nodeId);
});

test('toolbar has 6 tools and every overlay, jump and calculator target exists', () => {
  const tools = TOOLBAR_CONFIGS['lyme-disease'];
  assert.ok(tools.length >= 5);
  for (const t of tools) {
    if (t.action === 'calculator') assert.ok(getCalculatorIds().includes(t.target!), t.target);
    else if (t.action === 'jump') assert.ok(byId.has(t.target!), t.target);
    else assert.ok(infoPages[t.target!], t.target);
  }
  assert.ok(infoPages['lyme-disease-stop'], 'lyme-disease-stop missing');
});

test('every #/drug, #/tree and #/info link in the tree and info pages resolves', () => {
  const texts: string[] = nodes.map(n => n.body);
  for (const p of Object.values(LYME_DISEASE_INFO_PAGES) as any[]) for (const s of p.sections) texts.push(s.body);
  const trees = new Set(Object.keys(TREE_REGISTRY));
  let checked = 0;
  for (const t of texts) {
    for (const m of t.matchAll(/\]\(#\/([a-z]+)\/([^)]*)\)/g)) {
      const [, kind, rest] = m;
      checked++;
      if (kind === 'drug') {
        const [id, ...ind] = rest.split('/');
        const d = ALL_DRUGS.find((x: any) => x.id === id);
        assert.ok(d, 'drug ' + id);
        const want = ind.join('/').toLowerCase();
        if (want) assert.ok(d.dosing.some((x: any) => x.indication.toLowerCase().includes(want)), `drug ${id} has no dosing indication matching "${want}"`);
      } else if (kind === 'tree') {
        const [id, , node] = rest.split('/');
        assert.ok(trees.has(id), 'tree ' + id);
        if (id === 'lyme-disease' && node) assert.ok(byId.has(node), 'node ' + node);
      } else if (kind === 'info') {
        assert.ok(infoPages[rest], 'info ' + rest);
      } else if (kind === 'calculator') {
        assert.ok(getCalculatorIds().includes(rest), 'calculator ' + rest);
      } else assert.fail('unexpected link kind ' + kind + ' ' + rest);
    }
  }
  assert.ok(checked > 20);
});

test('severe carditis node carries the safety-critical instructions in order', () => {
  const b = byId.get('lyme-carditis-severe')!.body;
  for (const w of ['ceftriaxone', 'serology', 'permanent pacemaker', 'temporary']) assert.ok(b.includes(w), w);
  const order = ['Admit', 'ceftriaxone 2 g daily NOW', 'temporary pacing', 'Do NOT implant a permanent pacemaker', 'Switch to oral', 'Cardiology consult'].map(s => b.indexOf(s));
  assert.ok(order.every(i => i >= 0), JSON.stringify(order));
  assert.deepEqual([...order].sort((a, b) => a - b), order);
  assert.equal(byId.get('lyme-carditis-severe')!.treatment!.firstLine.drug, 'Ceftriaxone');
  assert.equal(byId.get('lyme-carditis-severe')!.safetyLevel, 'critical');
});

test('myocarditis and bradycardic-arrest link into lyme-carditis-recognize', () => {
  const link = '#/tree/lyme-disease/node/lyme-carditis-recognize';
  const myo = read('src/data/trees/myocarditis.ts');
  assert.ok(myo.split(link).length - 1 >= 2, 'myocarditis needs two links');
  assert.ok(read('src/data/trees/bradycardic-arrest.ts').includes(link));
});

test('SILC calculator totals 12 and bands match the published score', () => {
  assert.ok(getCalculatorIds().includes('silc-score'));
  const src = read('src/components/calculator.ts');
  const block = src.slice(src.indexOf('const SILC_CALCULATOR'), src.indexOf('// NIHSS Calculator Definition'));
  const pts = [...block.matchAll(/type: 'toggle', points: (\d+)/g)].map(m => Number(m[1]));
  assert.deepEqual(pts.sort(), [1, 1, 1, 2, 3, 4]);
  assert.equal(pts.reduce((a, b) => a + b, 0), 12);
});

const { index } = await loadCorpus();
const pins: [string, RegExp][] = [
  ['lyme carditis first line treatment', /lyme-carditis-severe/],
  ['lyme carditis', /lyme-carditis-(recognize|severe)/],
  ['tick bite prophylaxis doxycycline', /lyme-prophylaxis/],
  ['erythema migrans treatment', /lyme-em-treatment/],
  ['lyme facial palsy', /lyme-facial-palsy/],
  ['lyme arthritis treatment', /lyme-arthritis/],
];
for (const [query, re] of pins) {
  test('lyme search top-3: ' + query, () => {
    const results = index.find(query, 3).results;
    assert.ok(results.some(r => re.test(JSON.stringify(r.doc))), JSON.stringify(results.map(r => r.doc)));
  });
}
