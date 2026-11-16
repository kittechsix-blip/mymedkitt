// Neonate Numbers (<3 kg), 2026-11-16.   node --test scripts/neo-numbers.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  parseInput, resolvePatient, neoPatientFrom, parseNeo, neoBandIndex, NEO_BANDS, kempleyDepthByGa, kempleyDepthByWeight, weightPlus6,
  neoLma, neoFio2, neoAirwayRows, neoDrugRows, neoTabs, neoSearchAnswer, pediSearchAnswer, NEO_CITATIONS, NEO_TABS,
} from '../src/components/pedi-resus-engine.ts';

const N = (s) => neoPatientFrom(parseInput(s));
const row = (rows, id) => rows.find((r) => r.id === id);

test('parsing: kg, g, GA, newborn, age under 1 month', () => {
  assert.equal(parseInput('1.8kg').weightKg, 1.8);
  assert.equal(parseInput('1800g').weightKg, 1.8);
  assert.equal(parseInput('1800 g').weightKg, 1.8);
  assert.equal(parseInput('1,8 kg').weightKg, 1.8);
  assert.equal(parseInput('32wk').gaWeeks, 32);
  assert.equal(parseInput('32 weeks').gaWeeks, 32);
  assert.equal(parseInput('32w').gaWeeks, 32);
  assert.equal(parseInput('32+3 wk').gaWeeks, 32);
  assert.equal(parseInput('newborn').newborn, true);
  assert.equal(parseInput('neonate').newborn, true);
  assert.deepEqual(parseInput('1800g 32wk'), { weightKg: 1.8, gaWeeks: 32 });
  // ages: weeks and days under 1 month
  assert.ok(parseInput('2 weeks').ageMonths < 1);
  assert.ok(parseInput('10 days').ageMonths < 1);
  assert.equal(parseInput('2 weeks').gaWeeks, undefined);
  assert.equal(parseInput('500 mg').weightKg, undefined);
  // existing parses unchanged
  assert.deepEqual(parseInput('2y'), { ageMonths: 24 });
  assert.deepEqual(parseInput('14kg'), { weightKg: 14 });
  // UI field helper
  assert.deepEqual(parseNeo('1800', 'g', '32'), { weightKg: 1.8, gaWeeks: 32 });
  assert.deepEqual(parseNeo('1.8', 'kg', ''), { weightKg: 1.8 });
  assert.deepEqual(parseNeo('', 'kg', '30'), { gaWeeks: 30 });
});

test('ETT, blade, suction and OG bands by weight', () => {
  const ett = (kg) => NEO_BANDS[neoBandIndex({ weightKg: kg })].ett;
  assert.equal(ett(0.9), '2.5');
  assert.equal(ett(1.0), '3.0');
  assert.equal(ett(1.99), '3.0');
  assert.equal(ett(2.0), '3.5');
  assert.equal(ett(2.99), '3.5');
  assert.equal(ett(3.0), '3.5-4.0');
  assert.deepEqual(NEO_BANDS.map((b) => b.blade), ['00', '0', '0-1', '1']);
  assert.deepEqual(NEO_BANDS.map((b) => b.suction), ['5-6 Fr', '6-8 Fr', '8 Fr', '8-10 Fr']);
  assert.deepEqual(NEO_BANDS.map((b) => b.og), ['5 Fr', '5-8 Fr', '8 Fr', '8 Fr']);
  assert.equal(neoBandIndex({ gaWeeks: 26 }), 0);
  assert.equal(neoBandIndex({ gaWeeks: 32 }), 1);
  assert.equal(neoBandIndex({}), -1);
});

test('depth: Kempley by GA, weight + 6, Kempley by weight', () => {
  assert.equal(kempleyDepthByGa(24), 5.5);
  assert.equal(kempleyDepthByGa(30), 7.0);
  assert.equal(kempleyDepthByGa(34), 7.5);
  assert.equal(kempleyDepthByGa(39), 8.5);
  assert.equal(kempleyDepthByGa(41), 9.0);
  assert.equal(weightPlus6(1.8), 7.8);
  assert.equal(kempleyDepthByWeight(0.55), 5.5);
  assert.equal(kempleyDepthByWeight(1.5), 7.5);
  assert.equal(kempleyDepthByWeight(3.3), 9.0);
  const both = row(neoAirwayRows({ weightKg: 1.8, gaWeeks: 32 }), 'depth');
  assert.equal(both.lines[0].dose, '7.0 cm');
  assert.match(both.basis, /Weight \+ 6 check: 7\.8 cm/);
  assert.match(both.notes, /gum line/);
  const w = row(neoAirwayRows({ weightKg: 1.8 }), 'depth');
  assert.equal(w.lines[0].dose, '7.8 cm');
  assert.match(w.basis, /Kempley weight pairing: 7\.5 cm/);
});

test('LMA eligibility: 34 wk or more and 2 kg or more', () => {
  assert.equal(neoLma({ gaWeeks: 33, weightKg: 2.5 }).eligible, false);
  assert.equal(neoLma({ gaWeeks: 35, weightKg: 2.2 }).eligible, true);
  assert.equal(neoLma({ gaWeeks: 36, weightKg: 1.8 }).eligible, false);
  assert.equal(neoLma({ weightKg: 2.5 }).eligible, null);
});

test('starting FiO2 bands by GA', () => {
  assert.equal(neoFio2(31), '30-100%');
  assert.equal(neoFio2(32), '21-30%');
  assert.equal(neoFio2(34), '21-30%');
  assert.equal(neoFio2(35), '21%');
  assert.equal(neoFio2(40), '21%');
});

test('drug doses in mg and mL', () => {
  const d = neoDrugRows({ weightKg: 2 });
  const epi = row(d, 'epi-iv');
  assert.equal(epi.lines[0].dose, '0.02-0.06 mg');
  assert.equal(epi.lines[0].ml, '0.2-0.6 mL');
  assert.match(epi.notes, /3 mL NS flush regardless of weight/);
  assert.equal(row(d, 'epi-flush').lines[0].dose, '3 mL');
  assert.equal(row(neoDrugRows({ weightKg: 0.6 }), 'epi-flush').lines[0].dose, '3 mL');
  const ett = row(d, 'epi-ett');
  assert.equal(ett.lines[0].dose, '0.1-0.2 mg');
  assert.equal(ett.lines[0].ml, '1-2 mL');
  assert.equal(row(d, 'volume').lines[0].dose, '20-40 mL');
  assert.equal(row(d, 'd10').lines[0].dose, '4 mL');
  assert.equal(row(neoDrugRows({ weightKg: 3 }), 'alprostadil').lines[0].dose, '0.15-0.3 mcg/min');
  assert.match(row(neoDrugRows({ weightKg: 3 }), 'alprostadil').notes, /intubate/);
  assert.equal(row(d, 'ampicillin').lines[0].dose, '100 mg');
  assert.equal(row(d, 'gentamicin').lines[0].dose, '8 mg');
  assert.equal(row(d, 'acyclovir').lines[0].dose, '40 mg');
  assert.equal(row(d, 'phenobarbital').lines[0].dose, '40 mg');
  // no weight: per-kg text, not a dose
  assert.equal(row(neoDrugRows({}), 'epi-iv').lines[0].dose, '0.01-0.03 mg/kg');
});

test('naloxone and bicarbonate are flagged not recommended', () => {
  const d = neoDrugRows({ weightKg: 2 }, 'drugs');
  for (const id of ['naloxone', 'bicarb']) { assert.equal(row(d, id).warn, 'NOT RECOMMENDED', id); assert.equal(row(d, id).lines[0].dose, 'Not recommended'); }
});

test('every row cites a valid source number; tabs are complete', () => {
  const tabs = neoTabs({ weightKg: 1.8, gaWeeks: 32 });
  assert.deepEqual(Object.keys(tabs), NEO_TABS);
  let n = 0;
  for (const t of Object.values(tabs)) for (const r of t.rows) { n++; assert.ok(r.cite.length > 0, r.id); for (const c of r.cite) assert.ok(c >= 1 && c <= NEO_CITATIONS.length, `${r.id} cite ${c}`); }
  assert.ok(n > 25);
  assert.match(NEO_CITATIONS[0], /S385-S423/);
  assert.match(NEO_CITATIONS[0], /41122887/);
  assert.match(NEO_CITATIONS[5], /chop\.edu/);
  // breathe numbers
  const b = tabs.breathe.rows;
  assert.equal(row(b, 'ppv').lines[0].dose, '30-60 /min');
  assert.equal(row(b, 'pip').lines[0].dose, '20-30 cm H2O');
  assert.equal(row(b, 'fio2').lines[0].dose, '21-30%');
  assert.equal(row(tabs.circulate.rows, 'cpr').lines[0].dose, '3:1 (90 + 30 /min)');
  assert.equal(row(tabs.circulate.rows, 'uvc').lines[0].dose, '5 Fr');
  assert.match(row(tabs.rosc.rows, 'stop').basis, /20 minutes/);
});

test('pedi tool routes under 3 kg, newborn, GA and age under 1 month to the neonate screen', () => {
  for (const s of ['2kg', '2.5 kg', '1800g', '2 weeks', '10 days', 'newborn', '32wk', '0.5 mo']) {
    const p = resolvePatient(parseInput(s));
    assert.ok(p, s);
    assert.equal(p.zone.kind, 'neonate', s);
  }
  assert.equal(resolvePatient(parseInput('3kg')).zone.kind, 'zone');
  assert.equal(resolvePatient(parseInput('3 kg 5 days')).zone.kind, 'neonate');
  assert.equal(resolvePatient(parseInput('6 weeks')).zone.kind, 'zone');
});

test('search: neonate teal card first, prefilled', () => {
  const q1 = pediSearchAnswer('newborn ett');
  assert.equal(q1.bgHex, '#0F766E');
  assert.match(q1.route, /^\/calculator\/neo-numbers\?tab=airway$/);
  assert.match(q1.subtitle, /ETT/);
  const q2 = pediSearchAnswer('2 kg neonate tube');
  assert.match(q2.route, /^\/calculator\/neo-numbers\?q=2kg&tab=airway$/);
  assert.match(q2.subtitle, /^ETT 3\.5 uncuffed/);
  const q3 = pediSearchAnswer('1500 g epinephrine');
  assert.match(q3.route, /q=1\.5kg/);
  assert.match(q3.subtitle, /0\.015-0\.045 mg \(0\.15-0\.45 mL of 0\.1 mg\/mL\)/);
  assert.match(q3.subtitle, /3 mL NS flush/);
  const q4 = pediSearchAnswer('32 week ett depth');
  assert.match(q4.route, /ga=32/);
  assert.match(q4.subtitle, /depth 7\.0 cm at lip/);
  const q5 = pediSearchAnswer('neonatal epi dose');
  assert.equal(q5.bgHex, '#0F766E');
  assert.match(q5.route, /tab=drugs/);
  assert.match(q5.subtitle, /0\.01-0\.03 mg\/kg/);
  const q6 = pediSearchAnswer('uvc size');
  assert.match(q6.route, /tab=circulate/);
  assert.match(q6.subtitle, /UVC/);
  assert.equal(neoSearchAnswer('2 kg neonate tube').title, 'NEONATE · 2 kg');
});

test('search: pedi queries at 3 kg and above, and ordinary queries, are unchanged', () => {
  assert.match(pediSearchAnswer('age 2 yo ET tube').route, /^\/calculator\/pedi-zone/);
  assert.match(pediSearchAnswer('20 kg defib').route, /^\/calculator\/pedi-zone/);
  assert.match(pediSearchAnswer('3 kg ett').route, /^\/calculator\/pedi-zone/);
  for (const q of ['K 6.8 what do I give', 'metformin 500 mg', 'newborn jaundice', 'neonatal fever', '80 kg epi', 'ett', 'heparin 80 units/kg bolus', 'vit d 25 hydroxy'])
    assert.equal(neoSearchAnswer(q), null, q);
});

test('wiring: registered, linked, toolbar, consult fixes', () => {
  const read = (p) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
  assert.match(read('../src/components/calculator.ts'), /'neo-numbers': NEO_NUMBERS_CALCULATOR/);
  const tb = read('../src/data/toolbar-configs.ts');
  assert.equal((tb.match(/target: 'neo-numbers'/g) || []).length, 2);
  assert.match(read('../src/data/trees/pedi-resus-numbers.ts'), /id: 'neo-numbers'/);
  const nrp = read('../src/data/trees/neonatal-resus.ts');
  assert.ok(!/30[-–]60 seconds|30-60 sec|40[-–]60|20[-–]25 cm/.test(nrp), 'old 2020 numbers must be gone');
  assert.match(nrp, /S385-S423/);
  assert.ok(!/S399-S445/.test(nrp));
  assert.match(nrp, /3 mL NS/);
  const calc = read('../src/components/calculator.ts');
  assert.ok(!/Delayed cord clamping 30-60/.test(calc));
  assert.ok(!/neonate \? '3\.0'/.test(calc), 'old <1 month ETT branch must be gone');
});
