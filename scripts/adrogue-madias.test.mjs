// Hand-computed cases for the Adrogué-Madias sodium change calculator (2026-11-09).
//   node --test scripts/adrogue-madias.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sodiumChange, litersToLimit, totalBodyWater, FLUIDS, TBW_FACTORS, ADROGUE_MADIAS_CALCULATOR as C } from '../src/components/adrogue-madias.ts';

const near = (a, b, tol = 0.05) => assert.ok(Math.abs(a - b) <= tol, `${a} != ${b}`);
// 80-year-old, 60 kg woman, Na 112 (Kittech Daily News worked example; Adrogué & Madias NEJM 2000 method).
const pt = { serumNa: 112, weightKg: 60, tbwFactor: TBW_FACTORS.olderWoman, fluidNaK: FLUIDS.hypertonic3 };

test('per liter matches the published formula', () => {
  near(totalBodyWater(60, 0.45), 27);
  near(sodiumChange(pt), 401 / 28); // 14.3
  near(sodiumChange({ ...pt, fluidNaK: FLUIDS.ns }), 42 / 28); // 1.5
  near(sodiumChange({ ...pt, fluidNaK: FLUIDS.d5w }), -112 / 28); // -4.0
  near(sodiumChange({ ...pt, fluidNaK: FLUIDS.ns, addedK: 40 }), (154 + 40 - 112) / 28, 0.01); // potassium counts
});

test('partial volumes use the same mixing logic', () => {
  near(sodiumChange(pt, 0.1), (0.1 * 401) / 27.1); // ~1.48 per 100 mL bolus
  near(sodiumChange(pt, 0.3), (0.3 * 401) / 27.3); // ~4.4 for three boluses
});

test('volume to the 24-hour limit, and a fluid that cannot get there', () => {
  near(litersToLimit(pt, 8), (8 * 27) / (401 - 8), 0.001); // ~0.55 L of 3%
  assert.equal(litersToLimit({ ...pt, serumNa: 150, fluidNaK: FLUIDS.ns }, 10), null, 'NS cannot lower 150 by 10 (gap is 4)');
  near(litersToLimit({ serumNa: 160, weightKg: 70, tbwFactor: 0.6, fluidNaK: 0 }, 10), (10 * 42) / 150, 0.001); // D5W in hypernatremia
});

test('the calculator view: placeholders, colors and the urine warning', () => {
  assert.equal(C.computeResult({}).value, '--');
  const base = { 'serum-na': 112, weight: 60, tbw: 45, fluid: 513, limit: 8 };
  const r = C.computeResult(base);
  assert.equal(r.value, '+14.3 mEq/L per L');
  assert.match(r.description, /PER 100 mL:\*\* \+1\.5/);
  assert.match(r.description, /about 550 mL/);
  assert.match(r.description, /ignores urine output/);
  assert.equal(C.computeResult({ ...base, volume: 300 }).colorVar, '--color-primary');
  assert.equal(C.computeResult({ ...base, volume: 450 }).colorVar, '--color-warning');
  assert.equal(C.computeResult({ ...base, volume: 700 }).colorVar, '--color-danger');
  assert.equal(C.computeResult({ ...base, fluid: 0 }).value, '−4 mEq/L per L', 'D5W (0) is not treated as missing');
  assert.equal(C.id, 'adrogue-madias');
});
