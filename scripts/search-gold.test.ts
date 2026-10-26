/**
 * Gate for the Home question search. Runs the real ranker (src/services/question-search.ts)
 * over documents built exactly as the app builds them from docs/ (so it needs `bunx tsc` and the
 * index scripts to have run: the deploy playbook does both before this).
 *
 *   gold set      rank 1 >= 90 %, top 3 = 100 %           (the set the ranker was tuned on)
 *   held-out set  regression floor; target is rank 1 >= 70 %, top 3 >= 90 %   (never tuned on)
 *   titles        every consult title typed as a query still opens that consult first
 *   preview       an answer preview is always the card's own words
 *   speed         median query < 50 ms
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { keysFor, parseQuestion, previewFor, plain } from '../src/services/question-search.ts';
import { loadCorpus } from './search-corpus.ts';
import { GOLD } from './search-gold.ts';
import { HELDOUT, type GoldQuestion } from './search-heldout.ts';

const { docs, index, keys } = await loadCorpus();

function score(set: GoldQuestion[]) {
  const rows = set.map((g) => {
    const { results } = index.search(g.q, 12);
    const rank = results.findIndex((r) => keysFor(r.doc).some((k) => g.expect.includes(k))) + 1;
    return { q: g.q, rank };
  });
  return { rows, r1: rows.filter((r) => r.rank === 1).length, t3: rows.filter((r) => r.rank >= 1 && r.rank <= 3).length, n: rows.length };
}

test('every pinned page exists in the app', () => {
  const missing: string[] = [];
  for (const g of [...GOLD, ...HELDOUT]) for (const k of g.expect) if (!keys.has(k)) missing.push(`${g.q} -> ${k}`);
  assert.deepEqual(missing, []);
});

test('gold set: expected page at rank 1 for >= 90 %, in the top 3 for 100 %', () => {
  const s = score(GOLD);
  const miss = s.rows.filter((r) => r.rank !== 1).map((r) => `${r.rank || '>12'}: ${r.q}`);
  console.log(`gold: rank1 ${s.r1}/${s.n}, top3 ${s.t3}/${s.n}; not at rank 1:\n  ${miss.join('\n  ')}`);
  assert.ok(s.r1 / s.n >= 0.9, `rank 1 is ${s.r1}/${s.n}`);
  assert.equal(s.t3, s.n, `top 3 is ${s.t3}/${s.n}: ${s.rows.filter((r) => r.rank < 1 || r.rank > 3).map((r) => r.q).join('; ')}`);
});

// The held-out questions were written before any ranking code and are never tuned on.
// Target 70 % / 90 %. The floor below is the measured result minus a small margin so a
// regression fails the deploy; raise it as the ranker earns it, never lower it to pass.
const HELDOUT_FLOOR = { rank1: 0.68, top3: 0.88 };
test('held-out set does not regress below its floor', () => {
  const s = score(HELDOUT);
  console.log(`held-out: rank1 ${s.r1}/${s.n} (${Math.round((100 * s.r1) / s.n)}%), top3 ${s.t3}/${s.n} (${Math.round((100 * s.t3) / s.n)}%)`);
  assert.ok(s.r1 / s.n >= HELDOUT_FLOOR.rank1, `held-out rank 1 fell to ${s.r1}/${s.n}`);
  assert.ok(s.t3 / s.n >= HELDOUT_FLOOR.top3, `held-out top 3 fell to ${s.t3}/${s.n}`);
});

test('a consult title typed as a query still opens that consult first', () => {
  const bad: string[] = [];
  for (const d of docs) {
    if (d.kind !== 'consult') continue;
    const { mode, results } = index.search(d.title, 5);
    // single-word titles take the unchanged alphabetical prefix path ("Tetanus" lists "Active Tetanus ..." first today too)
    if (mode === 'plain') continue;
    if (results[0]?.doc.id !== d.id) bad.push(`${d.title} -> ${results[0]?.doc.title ?? 'nothing'}`);
  }
  // a handful of titles are shared by two consults; those may tie, anything else is a regression
  const ids = new Map<string, number>();
  for (const d of docs) if (d.kind === 'consult') ids.set(d.title.toLowerCase(), (ids.get(d.title.toLowerCase()) ?? 0) + 1);
  const unexpected = bad.filter((b) => (ids.get(b.split(' -> ')[0].toLowerCase()) ?? 0) < 2);
  assert.deepEqual(unexpected, []);
});

test('answer previews are the card\'s own words', () => {
  let checked = 0;
  for (const g of [...GOLD, ...HELDOUT]) {
    const { parsed, results } = index.search(g.q, 3);
    for (const r of results) {
      if (!r.doc.text) continue;
      const p = previewFor(r.doc.text, parsed);
      if (!p) continue;
      const body = r.doc.text.replace(/\s+/g, ' ');
      const piece = p.replace(/…$/, '');
      checked++;
      assert.ok(body.includes(piece.replace(/\s+/g, ' ')) || piece.split(' ').every((w) => body.includes(w)), `preview not from the text: ${g.q} -> ${p}`);
      assert.ok(p.length <= 330, 'preview too long');
    }
  }
  assert.ok(checked > 40, `only ${checked} previews checked`);
});

test('plain queries are not treated as questions', () => {
  for (const q of ['afib', 'nihss', 'ketamine', 'DKA', 'heparin']) {
    const p = parseQuestion(q);
    assert.ok(!p.active && !p.wide, q);
  }
});

test('queries answer in under 50 ms (median) on the full corpus', () => {
  const ms: number[] = [];
  for (let rep = 0; rep < 3; rep++) {
    for (const g of [...GOLD, ...HELDOUT]) {
      const t = performance.now();
      index.search(g.q, 12);
      ms.push(performance.now() - t);
    }
  }
  ms.sort((a, b) => a - b);
  const median = ms[ms.length >> 1];
  const p95 = ms[Math.floor(ms.length * 0.95)];
  console.log(`query ms: median ${median.toFixed(1)}, p95 ${p95.toFixed(1)}, max ${ms[ms.length - 1].toFixed(1)}`);
  assert.ok(median < 50, `median ${median} ms`);
  assert.ok(p95 < 100, `p95 ${p95} ms`);
});
void plain;
