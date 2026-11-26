import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DRESS_SYNDROME_NODES as nodes, DRESS_SYNDROME_CITATIONS as citations, DRESS_SYNDROME_CRITICAL_ACTIONS as critical } from '../src/data/trees/dress-syndrome.ts';
import { INFO_PAGES } from '../docs/data/info-pages.js';
import { DRESS_SYNDROME_INFO_PAGES } from '../docs/data/new-content/dress-syndrome-info.js';
import { TOOLBAR_CONFIGS } from '../docs/data/toolbar-configs.js';
import { DEFAULT_CATEGORIES } from '../docs/data/categories.js';
import { TREE_REGISTRY } from './tree-registry.mjs';
import { ALL_DRUGS } from '../docs/data/drug-store.js';
import { getCalculatorIds } from '../docs/components/calculator.js';

const read = (p: string) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const byId = new Map(nodes.map(n => [n.id, n]));
const infoPages: Record<string, any> = INFO_PAGES;

test('dress-syndrome is registered in registry, categories and tree-service', () => {
  assert.equal(TREE_REGISTRY['dress-syndrome'].entryNodeId, 'dress-start');
  assert.equal(TREE_REGISTRY['dress-syndrome'].prefix, 'DRESS_SYNDROME');
  const cat = DEFAULT_CATEGORIES.find((c: any) => c.id === 'dermatology');
  const entry = cat.decisionTrees.find((t: any) => t.id === 'dress-syndrome');
  assert.ok(entry, 'category entry');
  assert.equal(entry.nodeCount, nodes.length);
  assert.match(read('src/services/tree-service.ts'), /'dress-syndrome': async/);
  assert.match(read('docs/services/tree-service.js'), /'dress-syndrome': async/);
});

test('every next/option target resolves, all reachable, all cited', () => {
  assert.equal(byId.size, nodes.length);
  const targets = (n: (typeof nodes)[number]) => [...(n.next ? [n.next] : []), ...(n.options ?? []).map(o => o.next)];
  const seen = new Set<string>();
  const queue = ['dress-start'];
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
    if (n.type === 'result') assert.ok(n.recommendation, n.id + ' lacks recommendation');
  }
  for (const c of critical) assert.ok(byId.has(c.nodeId), c.nodeId);
});

test('toolbar has at least 5 tools whose targets exist, and the stop page exists', () => {
  const tools = TOOLBAR_CONFIGS['dress-syndrome'];
  assert.ok(tools.length >= 5);
  for (const t of tools) {
    if (t.action === 'jump') assert.ok(byId.has(t.target!), t.target);
    else assert.ok(infoPages[t.target!], t.target);
  }
  assert.ok(infoPages['dress-syndrome-stop'], 'dress-syndrome-stop missing');
});

test('every #/drug, #/tree, #/info and #/calculator link resolves', () => {
  const texts: string[] = nodes.map(n => n.body);
  for (const p of Object.values(DRESS_SYNDROME_INFO_PAGES) as any[]) for (const s of p.sections) texts.push(s.body);
  const trees = new Set(Object.keys(TREE_REGISTRY));
  let checked = 0;
  for (const t of texts) {
    for (const m of t.matchAll(/\]\(#\/([a-z]+)\/([^)]*)\)/g)) {
      const [, kind, rest] = m;
      checked++;
      if (kind === 'drug') assert.ok(ALL_DRUGS.find((x: any) => x.id === rest.split('/')[0]), 'drug ' + rest);
      else if (kind === 'tree') {
        const [id, , node] = rest.split('/');
        assert.ok(trees.has(id), 'tree ' + id);
        if (id === 'dress-syndrome' && node) assert.ok(byId.has(node), 'node ' + node);
      } else if (kind === 'info') assert.ok(infoPages[rest], 'info ' + rest);
      else if (kind === 'calculator') assert.ok(getCalculatorIds().includes(rest), 'calculator ' + rest);
      else assert.fail('unexpected link kind ' + kind + ' ' + rest);
    }
  }
  assert.ok(checked > 10);
  for (const l of nodes.flatMap(n => n.calculatorLinks ?? [])) if (l.kind === 'tree') assert.ok(trees.has(l.id), l.id);
});

test('dress-severe carries the slow-taper instruction', () => {
  const n = byId.get('dress-severe')!;
  assert.ok(n.body.includes('taper') || n.body.includes('TAPER'));
  assert.ok(n.body.includes('3 TO 6 MONTHS') || n.body.includes('3 to 6 months'));
  assert.equal(n.safetyLevel, 'critical');
  const order = ['ADMIT', 'STOP the culprit', 'START systemic glucocorticoids', 'TAPER SLOWLY', 'REFRACTORY'].map(s => n.body.indexOf(s));
  assert.ok(order.every(i => i >= 0), JSON.stringify(order));
  assert.deepEqual([...order].sort((a, b) => a - b), order);
});

test('pruritus verdict, SJS/TEN and onc severe-skin link to dress-syndrome', () => {
  assert.ok(read('src/data/trees/generalized-pruritus-hub.ts').includes('(#/tree/dress-syndrome)'));
  assert.ok(read('src/data/trees/generalized-pruritus-hub.ts').includes('#/tree/dress-syndrome/node/dress-severe'));
  assert.ok(read('src/data/trees/sjs-ten.ts').includes('#/tree/dress-syndrome'));
  assert.ok(read('src/data/trees/onc-drug-side-effects.ts').includes('#/tree/dress-syndrome'));
});
