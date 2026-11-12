// VKDB calculators and consult wiring (2026-11-11).
//   node --test scripts/vkdb.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { vkdbType, vkdbLikelihood, bleedPattern, vkdbDoses, VKDB_TYPE_RISK_CALCULATOR as T, VKDB_LAB_PATTERN_CALCULATOR as L, VKDB_DOSES_CALCULATOR as D } from '../src/components/vkdb-calculators.ts';
import { VKDB_NODES as N, VKDB_CITATIONS as C, VKDB_CRITICAL_ACTIONS as A } from '../src/data/trees/vkdb.ts';

const r = (age, vitK, o = {}) => vkdbLikelihood({ age, vitK, breastfed: false, maternalDrugs: false, cholestasis: false, malabsorption: false, ...o });

test('type by age', () => {
  assert.equal(vkdbType(0), 'early');
  assert.equal(vkdbType(1), 'classic');
  assert.equal(vkdbType(2), 'late');
  assert.equal(vkdbType(3), 'outside');
  assert.equal(vkdbType(-1), 'incomplete');
});

test('likelihood', () => {
  assert.equal(r(2, 2), 'high', 'late, no vitamin K');
  assert.equal(r(2, 3), 'high', 'late, unknown vitamin K');
  assert.equal(r(2, 0), 'low', 'IM given, no cholestasis');
  assert.equal(r(2, 0, { cholestasis: true }), 'possible', 'cholestasis can beat the shot');
  assert.equal(r(2, 1, { breastfed: true }), 'high', 'oral only + breastfed');
  assert.equal(r(0, 0, { maternalDrugs: true }), 'high', 'early with maternal drugs');
  assert.equal(r(3, 2), 'low');
  assert.equal(T.computeResult({ age: 2, vitk: 2, breastfed: 1 }).value, 'VKDB likely');
  assert.equal(T.computeResult({}).value, '--');
});

test('lab pattern', () => {
  assert.equal(bleedPattern({ ptLong: 1, pttLong: 1, pltLow: 0, fibLow: 0 }), 'vkdb');
  assert.equal(bleedPattern({ ptLong: 1, pttLong: 1, pltLow: 1, fibLow: 1 }), 'dic');
  assert.equal(bleedPattern({ ptLong: 0, pttLong: 1, pltLow: 0, fibLow: 0 }), 'factor-viii-ix');
  assert.equal(bleedPattern({ ptLong: 0, pttLong: 0, pltLow: 1, fibLow: -1 }), 'platelets');
  assert.equal(bleedPattern({ ptLong: 0, pttLong: 0, pltLow: 0, fibLow: -1 }), 'normal');
  assert.equal(bleedPattern({ ptLong: -1, pttLong: 0, pltLow: 0, fibLow: 0 }), 'incomplete');
  assert.match(L.computeResult({ pt: 0, ptt: 0, plt: 0, fib: 0 }).description, /inflicted-injury/);
});

test('doses', () => {
  const d = vkdbDoses(4);
  assert.equal(d.vitKmg, 1);
  assert.deepEqual(d.pcc, { low: 80, usual: 120, high: 200, usualMl: 4.8 });
  assert.deepEqual(d.ffpMl, { low: 60, high: 80 });
  assert.equal(d.prophylaxisMg, '1 mg IM');
  assert.match(vkdbDoses(1.2).prophylaxisMg, /0\.36-0\.6 mg IM/);
  assert.equal(vkdbDoses(0), null);
  assert.equal(vkdbDoses(45), null);
  assert.equal(D.computeResult({ weight: 4 }).value, 'Vitamin K 1 mg');
});

test('consult wiring', () => {
  const ids = new Set(N.map((n) => n.id));
  assert.equal(ids.size, N.length);
  assert.ok(ids.has('vkdb-start'));
  for (const n of N) {
    for (const nx of [n.next, ...(n.options || []).map((o) => o.next)].filter(Boolean)) assert.ok(ids.has(nx), `${n.id} -> ${nx}`);
    for (const c of n.citation || []) assert.ok(C.some((x) => x.num === c), `${n.id} cites [${c}]`);
    for (const img of n.images || []) assert.ok(existsSync(new URL(`../docs/${img.src}`, import.meta.url)), img.src);
  }
  for (const a of A) assert.ok(ids.has(a.nodeId), a.nodeId);
});
