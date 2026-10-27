// Hand-computed cases for the draft consult calculators (HTNE, ARDS, RibScore, Ranson).
// Imports the TypeScript sources directly (Node type stripping); the compiled docs/ copies
// do not exist until the deploy compile step.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeHtneBpTarget } from '../src/components/htne-bp-target.ts';
import { predictedBodyWeightKg, computeArdsPbwTidalVolume, plateauAction, drivingPressure } from '../src/components/ards-pbw-tidal-volume.ts';
import { pfRatio, berlinSeverity, meetsProneEntry, ARDS_PF_BERLIN_CALCULATOR } from '../src/components/ards-pf-berlin.ts';
import { scoreRibScore } from '../src/components/ribscore.ts';
import { scoreRanson, ransonBand } from '../src/components/ranson.ts';

const near = (a, b, tol = 0.01) => assert.ok(Math.abs(a - b) <= tol, `${a} != ${b}`);

test('HTNE BP target: MAP, guideline SBP floor, draft MAP floors', () => {
  // 2017 ACC/AHA sec 11.2: SBP reduced by no more than 25% in the first hour -> floor = 0.75 x SBP.
  const a = computeHtneBpTarget({ sbp: 200, dbp: 120 });
  near(a.map, 146.67); near(a.sbpFloor25, 150); near(a.mapFloor25, 110); near(a.mapFloor20, 117.33);
  // Hypertensive emergency inequality (guideline): SBP > 180 and/or DBP > 120.
  const above = computeHtneBpTarget({ sbp: 181, dbp: 100 });
  assert.equal(above.severeRange, true, 'SBP 181 is above 180');
  const dbpAbove = computeHtneBpTarget({ sbp: 170, dbp: 121 });
  assert.equal(dbpAbove.severeRange, true, 'DBP 121 is above 120');
  const edge = computeHtneBpTarget({ sbp: 180, dbp: 120 });
  assert.equal(edge.severeRange, false, '180/120 is not above 180/120');
  const normal = computeHtneBpTarget({ sbp: 120, dbp: 80 });
  near(normal.map, 93.33); assert.equal(normal.severeRange, false);
  const preg = computeHtneBpTarget({ sbp: 160, dbp: 90, pregnant: true });
  assert.equal(preg.severeRange, true, 'pregnancy threshold SBP >=160');
  assert.equal(preg.compelling, true, 'pregnancy is a compelling condition');
});

test('HTNE BP target: compelling condition flag', () => {
  assert.equal(computeHtneBpTarget({ sbp: 190, dbp: 110 }).compelling, false);
  assert.equal(computeHtneBpTarget({ sbp: 190, dbp: 110, dissection: true }).compelling, true);
  assert.equal(computeHtneBpTarget({ sbp: 190, dbp: 110, pheo: true }).compelling, true);
});

test('HTNE BP target: invalid entry returns null', () => {
  assert.equal(computeHtneBpTarget({ sbp: 80, dbp: 90 }), null);
  assert.equal(computeHtneBpTarget({ sbp: 0, dbp: 0 }), null);
  assert.equal(computeHtneBpTarget({ sbp: NaN, dbp: 80 }), null);
});

test('ARDS PBW: ARDSNet predicted body weight', () => {
  near(predictedBodyWeightKg('female', 65), 57.0);
  near(predictedBodyWeightKg('male', 70), 73.0);
  near(predictedBodyWeightKg('male', 60), 50.0);
  assert.equal(predictedBodyWeightKg('male', 0), null);
});

test('ARDS PBW: plateau action edges (30 and 25 boundaries, 4 and 6 mL/kg)', () => {
  assert.equal(plateauAction(30, 6), 'within-target', 'exactly 30 is within target');
  assert.equal(plateauAction(31, 4), 'above-30-at-floor');
  assert.equal(plateauAction(31, 6), 'above-30-reduce');
  assert.equal(plateauAction(22, 5), 'below-25-increase');
  assert.equal(plateauAction(22, 6.67), 'within-target', 'VT at or above 6 mL/kg is not raised');
  assert.equal(plateauAction(0, 6), 'unknown');
});

test('ARDS PBW: full result for female 65 in at 380 mL with plateau 22 and PEEP 8', () => {
  const r = computeArdsPbwTidalVolume({ sex: 2, 'height-in': 65, 'current-vt': 380, plateau: 22, peep: 8 });
  near(r.pbwKg, 57.0); near(r.vtMl[6], 342); near(r.vtMl[4], 228); near(r.currentVtKgPbw, 6.667, 0.001);
  assert.equal(r.plateauAction, 'within-target');
  assert.equal(r.drivingPressure, 14);
  assert.equal(computeArdsPbwTidalVolume({ 'height-in': 65 }), null, 'needs sex');
});

test('ARDS driving pressure: plateau minus PEEP, null when inconsistent', () => {
  assert.equal(drivingPressure(22, 8), 14);
  assert.equal(drivingPressure(8, 10), null);
});

test('ARDS Berlin: P/F ratio and FiO2 range', () => {
  near(pfRatio(80, 40), 200);
  near(pfRatio(100, 21), 476.19, 0.01);
  assert.equal(pfRatio(100, 20), null, 'FiO2 below 21% is invalid');
  assert.equal(pfRatio(0, 50), null);
});

test('ARDS Berlin: severity cutoffs at 100, 200, 300 and the PEEP 5 gate', () => {
  assert.equal(berlinSeverity(100, 5), 'severe');
  assert.equal(berlinSeverity(101, 5), 'moderate');
  assert.equal(berlinSeverity(200, 5), 'moderate');
  assert.equal(berlinSeverity(201, 5), 'mild');
  assert.equal(berlinSeverity(300, 5), 'mild');
  assert.equal(berlinSeverity(301, 5), 'not-berlin');
  assert.equal(berlinSeverity(160, 4), 'peep-below-5');
});

test('ARDS Berlin: CPAP or NIV caps the grade at mild (moderate and severe need invasive ventilation)', () => {
  assert.equal(berlinSeverity(250, 5, 'non-invasive'), 'mild', 'ratio above 200 on CPAP is mild');
  assert.equal(berlinSeverity(200, 5, 'non-invasive'), 'mild-capped', 'ratio at 200 on CPAP is capped');
  assert.equal(berlinSeverity(150, 5, 'non-invasive'), 'mild-capped');
  assert.equal(berlinSeverity(90, 5, 'non-invasive'), 'mild-capped', 'severe-range ratio on CPAP is capped, not severe');
  assert.equal(berlinSeverity(301, 5, 'non-invasive'), 'not-berlin');
  assert.equal(berlinSeverity(90, 4, 'non-invasive'), 'peep-below-5', 'PEEP gate applies first');
  assert.equal(berlinSeverity(150, 5, 'invasive'), 'moderate', 'explicit invasive keeps moderate');
  assert.equal(berlinSeverity(90, 5), 'severe', 'default support is invasive');
});

test('ARDS Berlin calculator: support mode gates the grade and the prone line', () => {
  const calc = ARDS_PF_BERLIN_CALCULATOR.computeResult;
  // PaO2 100 on FiO2 50 gives P/F 200 exactly.
  assert.equal(calc({ pao2: 100, fio2: 50, peep: 5, support: 0 }).value, '--', 'support not set shows entry prompt');
  assert.equal(calc({ pao2: 100, fio2: 50, peep: 5, support: 1 }).label, 'Moderate ARDS (Berlin)', 'invasive at P/F 200 is moderate');
  assert.match(calc({ pao2: 100, fio2: 50, peep: 5, support: 2 }).label, /^Mild ARDS \(Berlin\), capped/, 'CPAP or NIV at P/F 200 is capped at mild');
  assert.equal(calc({ pao2: 100, fio2: 50, peep: 5, support: 3 }).label, 'Not a Berlin support mode', 'high-flow only is not graded');
  // P/F 140 on FiO2 100 and PEEP 5 meets prone entry on invasive support only.
  assert.match(calc({ pao2: 140, fio2: 100, peep: 5, support: 1 }).description, /PRONE ENTRY/);
  assert.doesNotMatch(calc({ pao2: 140, fio2: 100, peep: 5, support: 2 }).description, /PRONE ENTRY/, 'no prone entry on CPAP or NIV');
});

test('ARDS prone entry: P/F below 150, FiO2 60 or more, PEEP 5 or more', () => {
  assert.equal(meetsProneEntry(149, 60, 5), true);
  assert.equal(meetsProneEntry(150, 60, 5), false);
  assert.equal(meetsProneEntry(149, 59, 5), false);
  assert.equal(meetsProneEntry(149, 60, 4), false);
});

test('RibScore: one point per ON item, no weighting, 0 to 6', () => {
  assert.equal(scoreRibScore({}), 0);
  assert.equal(scoreRibScore({ bilateral: 1, flail: 1, 'first-rib': 1 }), 3);
  assert.equal(scoreRibScore({ 'six-or-more': 1, bilateral: 1, flail: 1, 'three-or-more-displaced': 1, 'first-rib': 1, 'all-three-areas': 1 }), 6);
  assert.equal(scoreRibScore({ bilateral: 2 }), 0, 'only value 1 counts');
});

test('Ranson: admission-only is incomplete until 48-hour items are entered', () => {
  const allAdmit = { age: true, wbc: true, glucose: true, ldh: true, ast: true };
  const none48 = { hematocritFall: false, bunRise: false, calcium: false, pao2: false, baseDeficit: false, fluidSequestration: false };
  const r = scoreRanson({ gallstone: false, admission: allAdmit, h48Entered: false, h48: none48 });
  assert.equal(r.band, 'incomplete'); assert.equal(r.total, null); assert.equal(r.maxTotal, 11);
});

test('Ranson: non-gallstone total of 4 is moderate; all-on totals 11 (top band)', () => {
  const h48 = (o) => ({ hematocritFall: false, bunRise: false, calcium: false, pao2: false, baseDeficit: false, fluidSequestration: false, ...o });
  const mid = scoreRanson({ gallstone: false, admission: { age: true, wbc: true, glucose: false, ldh: false, ast: false }, h48Entered: true, h48: h48({ calcium: true, pao2: true }) });
  assert.equal(mid.total, 4); assert.equal(mid.band, 'moderate');
  const max = scoreRanson({ gallstone: false, admission: { age: true, wbc: true, glucose: true, ldh: true, ast: true }, h48Entered: true, h48: h48({ hematocritFall: true, bunRise: true, calcium: true, pao2: true, baseDeficit: true, fluidSequestration: true }) });
  assert.equal(max.total, 11); assert.equal(max.band, 'very-high');
});

test('Ranson: gallstone set ignores PaO2 and caps at 10', () => {
  const all = { age: true, wbc: true, glucose: true, ldh: true, ast: true };
  const h48 = { hematocritFall: true, bunRise: true, calcium: true, pao2: true, baseDeficit: true, fluidSequestration: true };
  const g = scoreRanson({ gallstone: true, admission: all, h48Entered: true, h48 });
  assert.equal(g.h48Score, 5, 'PaO2 excluded for gallstone');
  assert.equal(g.total, 10); assert.equal(g.maxTotal, 10);
});

test('Ranson bands: edges at 2/3, 4/5, 6/7; top band is 7 or more', () => {
  assert.equal(ransonBand(2), 'low');
  assert.equal(ransonBand(3), 'moderate');
  assert.equal(ransonBand(4), 'moderate');
  assert.equal(ransonBand(5), 'high');
  assert.equal(ransonBand(6), 'high');
  assert.equal(ransonBand(7), 'very-high');
  assert.equal(ransonBand(8), 'very-high');
  assert.equal(ransonBand(9), 'very-high');
  assert.equal(ransonBand(11), 'very-high');
});
