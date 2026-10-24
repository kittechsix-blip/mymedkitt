import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateInhPyridoxine as dose, INH_PYRIDOXINE_CALCULATOR as calculator } from '../src/data/inh-pyridoxine.ts';

test('known adult dose is mg-for-mg, with a 5 g initial cap', () => {
  assert.deepEqual(dose({ patient: 'adult', exposure: 'known', inhMg: 3200 }), { mg: 3200, grams: 3.2, capped: false });
  assert.deepEqual(dose({ patient: 'adult', exposure: 'known', inhMg: 12000 }), { mg: 5000, grams: 5, capped: true });
});
test('unknown adult amount does not use a stale known-dose or weight field', () => {
  assert.deepEqual(dose({ patient: 'adult', exposure: 'unknown', inhMg: 100, weightKg: 20 }), { mg: 5000, grams: 5, capped: false });
});
test('known child dose is limited by ingestion, weight, and absolute initial cap', () => {
  assert.equal(dose({ patient: 'child', exposure: 'known', inhMg: 600, weightKg: 20 })?.mg, 600);
  assert.deepEqual(dose({ patient: 'child', exposure: 'known', inhMg: 3000, weightKg: 20 }), { mg: 1400, grams: 1.4, capped: true });
  assert.equal(dose({ patient: 'child', exposure: 'known', inhMg: 8000, weightKg: 80 })?.mg, 5000);
});
test('unknown child dose uses weight, capped at 5 g', () => {
  assert.equal(dose({ patient: 'child', exposure: 'unknown', weightKg: 12.5 })?.mg, 875);
  assert.equal(dose({ patient: 'child', exposure: 'unknown', weightKg: 80 })?.mg, 5000);
});
test('missing, zero, negative, and non-finite required values produce no dose', () => {
  for (const invalid of [undefined, 0, -1, NaN, Infinity, -Infinity]) {
    assert.equal(dose({ patient: 'adult', exposure: 'known', inhMg: invalid }), null);
    assert.equal(dose({ patient: 'child', exposure: 'known', inhMg: 100, weightKg: invalid }), null);
    assert.equal(dose({ patient: 'child', exposure: 'unknown', weightKg: invalid }), null);
  }
});
test('UI requires explicit patient/exposure selection and preserves dosing units and warning', () => {
  assert.equal(calculator.computeResult({}).value, '—');
  assert.equal(calculator.computeResult({ patient: 0, exposure: 2 }).value, '—');
  assert.equal(calculator.computeResult({ patient: 1, exposure: 0 }).value, '—');
  assert.equal(calculator.computeResult({ patient: 2, exposure: 2, weightKg: 0 }).value, '—');
  const result = calculator.computeResult({ patient: 2, exposure: 2, weightKg: 12.5 });
  assert.equal(result.value, '875 mg (0.875 g)');
  assert.match(result.description, /not a cumulative ceiling/);
  assert.match(result.description, /500 mg\/min/);
  assert.match(result.description, /does not calculate volume/);
});
