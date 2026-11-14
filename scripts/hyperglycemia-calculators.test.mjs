import test from 'node:test';
import assert from 'node:assert/strict';
import { computeBasalStart, computeBasalTitrate, computeMealCorrection, HYPERGLYCEMIA_CALCULATORS } from '../src/components/hyperglycemia-calculators.ts';

const start = { regimen: 1, weight: 90, safetyConfirmed: 1, insulinNaiveConfirmed: 1 };
const titrate = { currentDose: 10, fasting1: 160, fasting2: 175, fasting3: 150, target: 130, hypoglycemia: 0, glargineConfirmed: 1, threeDaysConfirmed: 1, safetyConfirmed: 1 };
const meal = { insulin: 1, ratioSource: 1, glucose: 250, carbs: 60, icr: 15, isf: 50, target: 150, hoursSinceBolus: 5, hypoglycemia: 0, noActiveBolusConfirmed: 1, crisisExcluded: 1, safetyConfirmed: 1 };
const noDose = (result) => assert.ok(['—', 'REVIEW', 'NO INCREASE'].includes(result.value), JSON.stringify(result));

test('basal start uses named fixed and locked weight regimens with floor rounding', () => {
  assert.equal(computeBasalStart(start).value, '10 units');
  assert.equal(computeBasalStart({ ...start, regimen: 2 }).value, '9 units');
  assert.equal(computeBasalStart({ ...start, regimen: 3 }).value, '18 units');
  assert.equal(computeBasalStart({ ...start, regimen: 3, weight: 94 }).value, '18 units');
  assert.equal(computeBasalStart({ ...start, regimen: 3, weight: 300 }).value, '60 units');
  assert.equal(computeBasalStart({ ...start, weight: undefined }).value, '10 units');
});

test('basal start fails closed for missing safety, unsupported selection, invalid weight', () => {
  noDose(computeBasalStart({}));
  for (const key of ['safetyConfirmed', 'insulinNaiveConfirmed']) {
    for (const value of [undefined, 0, -1, NaN]) noDose(computeBasalStart({ ...start, [key]: value }));
  }
  for (const regimen of [undefined, 0, 4, NaN]) noDose(computeBasalStart({ ...start, regimen }));
  for (const weight of [undefined, 0, -90, NaN, Infinity, Number.MAX_VALUE]) noDose(computeBasalStart({ ...start, regimen: 2, weight }));
});

test('basal titration needs all three readings above explicitly entered target', () => {
  assert.equal(computeBasalTitrate(titrate).value, '12 units');
  for (const fasting2 of [130, 100]) assert.equal(computeBasalTitrate({ ...titrate, fasting2 }).value, 'NO INCREASE');
  for (const key of ['currentDose', 'fasting1', 'fasting2', 'fasting3', 'target']) {
    for (const value of [undefined, 0, -1, NaN, Infinity]) noDose(computeBasalTitrate({ ...titrate, [key]: value }));
  }
  for (const key of ['safetyConfirmed', 'glargineConfirmed', 'threeDaysConfirmed']) noDose(computeBasalTitrate({ ...titrate, [key]: 0 }));
  noDose(computeBasalTitrate({ ...titrate, currentDose: 10.5 }));
  noDose(computeBasalTitrate({ ...titrate, hypoglycemia: undefined }));
});

test('hypoglycemia overrides escalation without producing an automatic reduced prescription', () => {
  for (const changes of [{ hypoglycemia: 1 }, { fasting1: 69 }, { fasting3: 55, threeDaysConfirmed: 0 }]) {
    const result = computeBasalTitrate({ ...titrate, ...changes });
    assert.equal(result.value, 'REVIEW');
    assert.match(result.description, /10–20%/);
    assert.match(result.description, /clinician review/);
  }
});

test('meal calculator shows established meal plus positive correction components', () => {
  const result = computeMealCorrection(meal);
  assert.equal(result.value, '6 units');
  assert.match(result.description, /60 g ÷ 15 g\/unit = 4 units/);
  assert.match(result.description, /Positive correction:.* = 2 units/);
  assert.equal(computeMealCorrection({ ...meal, insulin: 2, carbs: 65 }).value, '6 units');
  noDose(computeMealCorrection({ ...meal, glucose: 120 }));
  assert.equal(computeMealCorrection({ ...meal, glucose: 350 }).value, '8 units');
  assert.equal(computeMealCorrection({ ...meal, glucose: 150, carbs: 5 }).value, '0 units');
});

test('meal calculator requires source, safety, crisis exclusion and known absent active insulin', () => {
  noDose(computeMealCorrection({}));
  for (const key of ['safetyConfirmed', 'crisisExcluded', 'noActiveBolusConfirmed', 'ratioSource', 'insulin']) {
    for (const value of [undefined, 0, -1, NaN]) noDose(computeMealCorrection({ ...meal, [key]: value }));
  }
  for (const hoursSinceBolus of [undefined, 0, 3.99, -4, NaN, Infinity]) noDose(computeMealCorrection({ ...meal, hoursSinceBolus }));
  assert.equal(computeMealCorrection({ ...meal, hoursSinceBolus: 4 }).value, '6 units');
  noDose(computeMealCorrection({ ...meal, hypoglycemia: 1 }));
  noDose(computeMealCorrection({ ...meal, glucose: 69 }));
  noDose(computeMealCorrection({ ...meal, hypoglycemia: undefined }));
});

test('invalid numbers and missing or zero ratios never produce a meal dose', () => {
  for (const key of ['glucose', 'carbs', 'icr', 'isf', 'target']) {
    for (const value of [undefined, 0, -1, NaN, Infinity]) noDose(computeMealCorrection({ ...meal, [key]: value }));
  }
  noDose(computeMealCorrection({ ...meal, icr: Number.MIN_VALUE }));
  noDose(computeMealCorrection({ ...meal, carbs: Number.MAX_VALUE }));
});

test('all tools have unique IDs, sources and empty selection sentinels', () => {
  assert.deepEqual(HYPERGLYCEMIA_CALCULATORS.map(c => c.id), ['hg-basal-start', 'hg-basal-titrate', 'hg-meal-correction']);
  for (const calc of HYPERGLYCEMIA_CALCULATORS) {
    assert.ok(calc.citations.some(c => c.includes('10.2337/dc26-S009')));
    assert.equal(new Set(calc.fields.map(f => f.name)).size, calc.fields.length);
    for (const field of calc.fields.filter(f => f.type === 'select')) assert.equal(field.selectOptions[0].points, 0);
    noDose(calc.computeResult(Object.fromEntries(calc.fields.map(f => [f.name, 0]))));
  }
});

test('below individualized target withholds entire meal dose for manual review', () => {
  for (const glucose of [70, 80, 149]) {
    const result = computeMealCorrection({ ...meal, glucose });
    assert.equal(result.value, '—');
    assert.match(result.description, /below the individualized target/);
  }
  assert.equal(computeMealCorrection({ ...meal, glucose: 150 }).value, '4 units');
});
