// Hemolytic anemia calculators and consult wiring (2026-11-11).
//   node --test scripts/hemolytic-anemia.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { hemolysisCall, supportCount, reticIndex, maturationFactor, HEMOLYSIS_LABS_CALCULATOR as L, RETIC_INDEX_CALCULATOR as R } from '../src/components/hemolytic-anemia-calculators.ts';
import { HEMOLYTIC_ANEMIA_NODES as N, HEMOLYTIC_ANEMIA_CITATIONS as C, HEMOLYTIC_ANEMIA_CRITICAL_ACTIONS as A } from '../src/data/trees/hemolytic-anemia.ts';

const labs = (ldhHigh, haptoLow, extra = {}) => ({ ldhHigh, haptoLow, biliHigh: -1, reticHigh: -1, hemoglobinuria: false, ...extra });

test('LDH + haptoglobin carry the call', () => {
  assert.equal(hemolysisCall(labs(-1, -1)), 'incomplete');
  assert.equal(hemolysisCall(labs(1, 1)), 'likely');
  assert.equal(hemolysisCall(labs(0, 0)), 'unlikely');
  assert.equal(hemolysisCall(labs(0, 0, { reticHigh: 1 })), 'possible', 'raised retics keep hemolysis possible');
  assert.equal(hemolysisCall(labs(0, 0, { biliHigh: 1 })), 'possible', 'raised indirect bilirubin keeps hemolysis possible');
  assert.equal(hemolysisCall(labs(0, 0, { hemoglobinuria: true })), 'possible', 'hemoglobinuria never reads as unlikely');
  assert.equal(hemolysisCall(labs(1, 0)), 'possible');
  assert.equal(hemolysisCall(labs(-1, 1)), 'possible');
  assert.equal(supportCount(labs(1, 1, { biliHigh: 1, reticHigh: 1, hemoglobinuria: true })), 3);
});

test('lab interpreter output', () => {
  assert.equal(L.computeResult({ ldh: 1, hapto: 1, bili: -1, retic: 0, hgburia: 0 }).value, 'Hemolysis likely');
  assert.match(L.computeResult({ ldh: 1, hapto: 1, bili: -1, retic: 0, hgburia: 0 }).description, /Low reticulocytes/);
  assert.match(L.computeResult({ ldh: 1, hapto: 1, bili: -1, retic: -1, hgburia: 1 }).description, /intravascular/);
  assert.equal(L.computeResult({ ldh: 0, hapto: 0, bili: -1, retic: -1, hgburia: 0 }).value, 'Hemolysis unlikely');
  assert.equal(L.computeResult({}).value, '--');
});

test('reticulocyte production index', () => {
  assert.equal(maturationFactor(45), 1);
  assert.equal(maturationFactor(35), 1.5);
  assert.equal(maturationFactor(25), 2);
  assert.equal(maturationFactor(15), 2.5);
  const r = reticIndex(10, 25); // corrected 5.56, factor 2.0
  assert.ok(Math.abs(r.corrected - 50 / 9) < 1e-9);
  assert.equal(r.factor, 2);
  // Continuous: Hct 39 and 40 give nearly the same factor (no step).
  assert.ok(Math.abs(maturationFactor(39) - maturationFactor(40)) < 0.051);
  assert.equal(maturationFactor(60), 1, 'clamped at 1.0');
  assert.equal(maturationFactor(5), 2.5, 'clamped at 2.5');
  assert.doesNotMatch(R.computeResult({ retic: 3.2, hct: 30.5 }).value, /^RPI 2\.0$/);
  assert.equal(reticIndex(-1, 30), null);
  assert.equal(reticIndex(3, 0), null);
  assert.equal(R.computeResult({ retic: 10, hct: 22.5 }).value, 'RPI 2.3');
  assert.match(R.computeResult({ retic: 2, hct: 24 }).label, /Inadequate/);
  assert.equal(R.computeResult({}).value, '--');
});

test('consult wiring', () => {
  const ids = new Set(N.map((n) => n.id));
  assert.equal(ids.size, N.length, 'unique node ids');
  assert.ok(ids.has('hemolytic-anemia-start'));
  for (const n of N) {
    for (const nx of [n.next, ...(n.options || []).map((o) => o.next)].filter(Boolean)) assert.ok(ids.has(nx), `${n.id} -> ${nx}`);
    for (const c of n.citation || []) assert.ok(C.some((x) => x.num === c), `${n.id} cites [${c}]`);
    for (const img of n.images || []) assert.ok(existsSync(new URL(`../docs/${img.src}`, import.meta.url)), img.src);
    for (const m of (n.body || '').matchAll(/#\/node\/([a-z0-9-]+)/g)) assert.ok(ids.has(m[1]), `${n.id} links ${m[1]}`);
  }
  for (const a of A) assert.ok(ids.has(a.nodeId), a.nodeId);
});
