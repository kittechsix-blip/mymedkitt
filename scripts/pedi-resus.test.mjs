// Pedi Resus Numbers (2026-11-16).   node --test scripts/pedi-resus.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  parseInput, estimateWeightFromAge, zoneFor, resolvePatient, drugRows, drugRow, buildTabs, equipmentRows, ageFormulas,
  hypotensionSbp, vitalBandFor, maintenanceMlPerHr, fmtAmount, fmtMl, pediSearchAnswer, PEDI_DRUGS, PEDI_ZONES, PEDI_CITATIONS,
} from '../src/components/pedi-resus-engine.ts';
import { PEDI_RESUS_NUMBERS_NODES, PEDI_RESUS_NUMBERS_CITATIONS } from '../src/data/trees/pedi-resus-numbers.ts';

const P = (s) => resolvePatient(parseInput(s));
const line = (p, id, i = 0) => drugRow(p, id).lines[i];

test('parseInput: age, weight and length variants', () => {
  assert.deepEqual(parseInput('2y'), { ageMonths: 24 });
  assert.deepEqual(parseInput('2 yo'), { ageMonths: 24 });
  assert.deepEqual(parseInput('2 years'), { ageMonths: 24 });
  assert.deepEqual(parseInput('2 year old'), { ageMonths: 24 });
  assert.deepEqual(parseInput('18mo'), { ageMonths: 18 });
  assert.deepEqual(parseInput('18 months'), { ageMonths: 18 });
  assert.deepEqual(parseInput('6 m/o'), { ageMonths: 6 });
  assert.deepEqual(parseInput('14kg'), { weightKg: 14 });
  assert.deepEqual(parseInput('14 kg'), { weightKg: 14 });
  assert.deepEqual(parseInput('92cm'), { lengthCm: 92 });
  assert.deepEqual(parseInput({ value: 3, unit: 'yr' }), { ageMonths: 36 });
  assert.deepEqual(parseInput({ value: '9', unit: 'kg' }), { weightKg: 9 });
  assert.deepEqual(parseInput('2y 14kg'), { ageMonths: 24, weightKg: 14 });
  assert.deepEqual(parseInput('banana'), {});
  assert.deepEqual(parseInput('0kg'), {});
  assert.ok(Math.abs(parseInput('30 lb').weightKg - 13.6) < 0.05);
});

test('APLS 2011 weight from age', () => {
  assert.equal(estimateWeightFromAge(6).kg, 7);
  assert.equal(estimateWeightFromAge(24).kg, 12);
  assert.equal(estimateWeightFromAge(96).kg, 31);
  assert.equal(estimateWeightFromAge(36).kg, 14);
  assert.equal(estimateWeightFromAge(6).method, 'APLS 2011');
  const teen = estimateWeightFromAge(15 * 12);
  assert.equal(teen.useActualWeight, true);
  assert.equal(teen.capped, true);
  assert.equal(teen.kg, 50);
});

test('zone boundaries by weight', () => {
  const name = (kg) => { const z = zoneFor({ weightKg: kg }); return z.kind === 'zone' ? z.zone.color : z.kind; };
  assert.equal(name(5.9), 'Grey');
  assert.equal(name(3), 'Grey');
  assert.equal(name(6), 'Pink');
  assert.equal(name(8), 'Red');
  assert.equal(name(10), 'Purple');
  assert.equal(name(11.9), 'Purple');
  assert.equal(name(12), 'Yellow');
  assert.equal(name(14.9), 'Yellow');
  assert.equal(name(15), 'White');
  assert.equal(name(19), 'Blue');
  assert.equal(name(24), 'Orange');
  assert.equal(name(30), 'Green');
  assert.equal(name(36), 'Green');
  assert.equal(name(37), 'adult');
  assert.equal(name(2.5), 'neonate');
});

test('zone by length uses the tape ranges; weight beats length beats age', () => {
  const byLen = (cm) => { const z = zoneFor({ lengthCm: cm }); return z.kind === 'zone' ? z.zone.color : z.kind; };
  assert.equal(byLen(92), 'Purple');
  assert.equal(byLen(101), 'Yellow');
  assert.equal(byLen(114.4), 'Yellow');
  assert.equal(byLen(49), 'neonate');
  assert.equal(P('2y 20kg').weightSource, 'measured');
  assert.equal(P('2y 20kg').weightKg, 20);
  assert.equal(P('2y 92cm').weightSource, 'length');
  assert.equal(P('2y').weightSource, 'age');
  assert.equal(P('2y').weightKg, 12);
  assert.equal(P(''), null);
});

test('zone table is complete and contiguous', () => {
  assert.deepEqual(PEDI_ZONES.map((z) => z.color), ['Grey', 'Pink', 'Red', 'Purple', 'Yellow', 'White', 'Blue', 'Orange', 'Green']);
  for (let i = 1; i < PEDI_ZONES.length; i++) assert.equal(PEDI_ZONES[i].weightMin, PEDI_ZONES[i - 1].weightMax + 1);
  for (const z of PEDI_ZONES) for (const k of ['ettCuffed', 'ettUncuffed', 'depthCm', 'blade', 'lma', 'ngFr', 'foleyFr', 'chestTubeFr', 'ivG']) assert.ok(z[k], `${z.color} ${k}`);
});

test('ETT for a 2 year old: 4.0 cuffed, 4.5 uncuffed, formula check', () => {
  const p = P('2y');
  assert.equal(p.zone.zone.color, 'Yellow');
  assert.equal(p.zone.zone.ettCuffed, '4.0');
  assert.equal(p.zone.zone.ettUncuffed, '4.5');
  assert.equal(p.zone.zone.depthCm, '12.5-13.5');
  const f = ageFormulas(p.ageMonths);
  assert.equal(f.cuffed, '4.0');
  assert.equal(f.uncuffed, '4.5');
  assert.equal(f.depthCm, '13.0');
  assert.equal(ageFormulas(18), null);
  assert.equal(ageFormulas(undefined), null);
  const eq = equipmentRows(p);
  assert.match(eq.airway[0].lines[0].dose, /^4\.0 cuffed$/);
  assert.ok(!equipmentRows(P('14kg')).airway.some((r) => r.id === 'ett-formula'));
});

test('caps are applied and flagged', () => {
  const big = { ...P('36kg'), weightKg: 120 };
  const epi = drugRow(big, 'epi-ivio');
  assert.equal(epi.lines[0].dose, '1 mg');
  assert.equal(epi.capped, true);
  const ad = drugRow(big, 'adenosine');
  assert.equal(ad.lines[0].dose, '6 mg');
  assert.equal(ad.lines[1].dose, '12 mg');
  assert.equal(ad.capped, true);
  assert.equal(drugRow(big, 'amiodarone').lines[0].dose, '300 mg');
  assert.equal(drugRow(big, 'levetiracetam').lines[0].dose, '4500 mg');
  assert.equal(drugRow(big, 'levetiracetam').capped, true);
  assert.equal(drugRow(P('12kg'), 'epi-ivio').capped, false);
  assert.equal(drugRow(big, 'fosphenytoin').lines[0].dose, '1500 mg PE');
  assert.equal(drugRow(big, 'phenobarbital').lines[0].dose, '1000 mg');
  assert.equal(drugRow(big, 'd10').lines[0].dose, '25 g');
});

test('mg and mL math: epinephrine 12 kg is 0.12 mg = 1.2 mL', () => {
  const l = line(P('12kg'), 'epi-ivio');
  assert.equal(l.dose, '0.12 mg');
  assert.equal(l.ml, '1.2 mL');
  assert.equal(line(P('12kg'), 'epi-ett').dose, '1.2 mg');
  assert.equal(line(P('12kg'), 'epi-ett').ml, '1.2 mL');
  assert.equal(line(P('12kg'), 'amiodarone').ml, '1.2 mL');
  assert.equal(line(P('12kg'), 'fentanyl').dose, '12-24 mcg');
  assert.equal(line(P('12kg'), 'fentanyl').ml, '0.24-0.48 mL');
  assert.equal(line(P('12kg'), 'defib').dose, '24 J');
  assert.equal(line(P('12kg'), 'defib', 1).dose, '48 J');
  assert.equal(line(P('12kg'), 'ketamine').dose, '12-24 mg');
  assert.equal(line(P('12kg'), 'bolus').dose, '120-240 mL');
  const merged = buildTabs(P('12kg')).shock.rows.find((r) => r.id === 'bolus');
  assert.equal(merged.lines[1].label, 'If cardiogenic');
  assert.equal(merged.lines[1].dose, '60-120 mL');
  assert.equal(fmtAmount(0.0734), '0.073');
  assert.equal(fmtAmount(14.44), '14.4');
  assert.equal(fmtMl(0.1234), '0.12');
  assert.equal(fmtMl(12.34), '12.3');
});

test('sodium bicarbonate uses 4.2% under 1 month, 8.4% otherwise', () => {
  assert.equal(drugRow(P('6mo'), 'bicarb').conc, '8.4% = 1 mEq/mL');
  assert.match(drugRow(P('0.5mo'), 'bicarb').conc, /4\.2%/);
});

test('succinylcholine: 2 mg/kg under 10 kg, 1.5 mg/kg otherwise', () => {
  assert.equal(line(P('9kg'), 'succinylcholine').dose, '18 mg');
  assert.equal(line(P('10kg'), 'succinylcholine').dose, '15 mg');
  assert.match(drugRow(P('9kg'), 'succinylcholine').basis, /^2 mg\/kg/);
  assert.match(drugRow(P('20kg'), 'succinylcholine').basis, /^1\.5 mg\/kg/);
});

test('diazepam PR by age, or by weight when age is unknown', () => {
  assert.equal(line(P('4y'), 'diazepam-pr').dose, '8 mg');      // 16 kg x 0.5
  assert.equal(line(P('8y'), 'diazepam-pr').dose, '9.3 mg');    // 31 kg x 0.3
  assert.equal(line(P('13y'), 'diazepam-pr').dose, '9.2 mg');   // 46 kg x 0.2
  assert.equal(line(P('18kg'), 'diazepam-pr').dose, '9 mg');
  assert.equal(line(P('19kg'), 'diazepam-pr').dose, '5.7 mg');
});

test('recalled-tape regression: no vecuronium, flumazenil absent, no ketamine analgesia', () => {
  const all = JSON.stringify(PEDI_DRUGS).toLowerCase();
  assert.ok(!all.includes('vecuronium'));
  const ids = PEDI_DRUGS.map((d) => d.id);
  const flum = PEDI_DRUGS.filter((d) => /flumazenil/i.test(d.name));
  for (const d of flum) assert.equal(d.perKg, 0.01);
  assert.ok(ids.length > 0);
  for (const d of PEDI_DRUGS.filter((x) => /ketamine/i.test(x.name))) {
    assert.ok(!/analges/i.test(d.indication), 'ketamine row must not be an analgesia dose');
    assert.deepEqual(d.perKg, [1, 2]);
    assert.equal(d.tab, 'rsi');
  }
  const tabs = JSON.stringify(buildTabs(P('14kg'))).toLowerCase();
  assert.ok(!tabs.includes('vecuronium') || /not listed|not recommended/.test(tabs));
  assert.ok(!tabs.includes('flumazenil'));
});

test('hypotension, vitals and maintenance', () => {
  assert.equal(hypotensionSbp(4 * 12), 78);
  assert.equal(hypotensionSbp(0.5), 60);
  assert.equal(hypotensionSbp(6), 70);
  assert.equal(hypotensionSbp(11 * 12), 90);
  assert.equal(hypotensionSbp(12), 72);
  assert.deepEqual(vitalBandFor(6).hr, [100, 190]);
  assert.deepEqual(vitalBandFor(30).rr, [24, 40]);
  assert.deepEqual(vitalBandFor(15 * 12).hr, [60, 100]);
  const rows = buildTabs(P('4y')).shock.rows;
  assert.equal(rows.find((r) => r.id === 'vital-sbp').lines[0].dose, '78 mmHg');
  const wOnly = buildTabs(P('14kg')).shock.rows;
  assert.match(wOnly.find((r) => r.id === 'vital-hr').basis, /from the zone/);
  assert.equal(maintenanceMlPerHr(12), 44);
  assert.equal(maintenanceMlPerHr(25), 65);
  assert.equal(maintenanceMlPerHr(8), 32);
});

test('neonate and adult-size routes', () => {
  assert.equal(P('2.5kg').zone.kind, 'neonate');
  assert.equal(buildTabs(P('2.5kg')).arrest.rows.length, 0);
  assert.equal(P('50kg').zone.kind, 'adult');
  assert.match(equipmentRows(P('50kg')).airway[0].lines[0].dose, /6\.5-7\.0/);
});

test('every row carries a valid citation number', () => {
  const tabs = buildTabs(P('4y'));
  let n = 0;
  for (const t of Object.values(tabs)) for (const r of t.rows) { n++; assert.ok(r.cite.length > 0, r.id); for (const c of r.cite) assert.ok(c >= 1 && c <= PEDI_CITATIONS.length, `${r.id} cite ${c}`); }
  assert.ok(n > 40);
});

test('search: pediatric numbers answer card', () => {
  const a = pediSearchAnswer('age 2 yo ET tube');
  assert.equal(a.title, 'Age 2 yr · ~12 kg · YELLOW');
  assert.match(a.subtitle, /^ETT 4\.0 cuffed \(4\.5 uncuffed\) · depth 12\.5-13\.5 cm/);
  assert.match(a.route, /^\/calculator\/pedi-zone\?q=2y&tab=airway/);
  assert.equal(a.bgHex, '#FFD700');
  assert.equal(a.textHex, '#000');
  assert.match(pediSearchAnswer('2 year old ett size').subtitle, /^ETT 4\.0 cuffed/);
  const epi = pediSearchAnswer('6 month old epi dose');
  assert.match(epi.title, /^Age 6 mo · ~7 kg · PINK/);
  assert.match(epi.subtitle, /^Epinephrine IV\/IO 0\.07 mg \(0\.7 mL\)/);
  const defib = pediSearchAnswer('20 kg defib');
  assert.match(defib.title, /^20 kg · BLUE/);
  assert.match(defib.subtitle, /First 40 J, Second 80 J/);
  const bro = pediSearchAnswer('broselow 14 kg');
  assert.match(bro.title, /^14 kg · YELLOW/);
  assert.match(bro.subtitle, /^ETT 4\.0 cuffed/);
  const ad = pediSearchAnswer('18 months adenosine');
  assert.match(ad.title, /^Age 18 mo · ~11 kg · PURPLE/);
  assert.match(ad.subtitle, /^Adenosine IV\/IO rapid push First 1\.1 mg/);
  assert.match(pediSearchAnswer('chest tube 3 yr').subtitle, /^chest tube 20-24 Fr/);
  assert.match(pediSearchAnswer('92 cm ett').title, /^92 cm · ~10\.5 kg · PURPLE/);
  assert.equal(pediSearchAnswer('pedi resus').route, '/calculator/pedi-zone');
  assert.equal(pediSearchAnswer('broselow').pointer, true);
  assert.equal(pediSearchAnswer('peds ett').pointer, true);
  assert.equal(pediSearchAnswer('2.5 kg ett').route, '/calculator/neo-numbers?q=2.5kg&tab=airway');
});

test('search: ordinary queries are untouched', () => {
  for (const q of ['K 6.8 what do I give', 'metformin 500 mg', 'dka fluids', 'afib', 'heparin 80 units/kg bolus', '80 kg epi', '30 yo ett', 'tpa 0.9 mg/kg', '10 mL/kg bolus', 'lidocaine max dose awake intubation', 'ett', '', 'ab'])
    assert.equal(pediSearchAnswer(q), null, q);
});

test('consult tree links all eight calculators and shares the citation text', () => {
  const links = PEDI_RESUS_NUMBERS_NODES.flatMap((n) => n.calculatorLinks ?? []).filter((l) => !l.kind || l.kind === 'calculator').map((l) => l.id);
  for (const id of ['pedi-zone', 'pedi-weight', 'pedi-airway', 'pedi-tubes', 'pedi-arrest', 'pedi-rsi', 'pedi-seizure', 'pedi-shock']) assert.ok(links.includes(id), id);
  assert.equal(PEDI_RESUS_NUMBERS_NODES[0].id, 'prn-start');
  assert.equal(PEDI_RESUS_NUMBERS_CITATIONS.length, PEDI_CITATIONS.length);
  PEDI_RESUS_NUMBERS_CITATIONS.forEach((c, i) => { assert.equal(c.num, i + 1); assert.equal(c.text, PEDI_CITATIONS[i]); });
  for (const n of PEDI_RESUS_NUMBERS_NODES) for (const c of n.citation ?? []) assert.ok(c >= 1 && c <= PEDI_RESUS_NUMBERS_CITATIONS.length);
  assert.ok(PEDI_RESUS_NUMBERS_NODES.some((n) => /ECRI/.test(n.body) && /vecuronium/.test(n.body)));
});

test('calculators are registered; drug-store uses the engine (single source)', () => {
  const calc = fs.readFileSync(new URL('../src/components/calculator.ts', import.meta.url), 'utf8');
  for (const id of ['pedi-zone', 'pedi-weight', 'pedi-airway', 'pedi-tubes', 'pedi-arrest', 'pedi-rsi', 'pedi-seizure', 'pedi-shock']) assert.match(calc, new RegExp(`'${id}': PEDI_`), id);
  const ds = fs.readFileSync(new URL('../src/components/drug-store.ts', import.meta.url), 'utf8');
  assert.match(ds, /from '\.\/pedi-resus-engine\.js'/);
  assert.ok(!ds.includes('#FFD700'), 'zone table must live only in the engine');
  assert.ok(!/ageValue \* 2\) \+ 10/.test(ds), 'old 2*age+10 weight formula must be gone');
});

test('drugRows covers every tab it should', () => {
  const p = P('14kg');
  for (const tab of ['arrest', 'rsi', 'seizure', 'shock', 'other']) assert.ok(drugRows(p, tab).length >= 3, tab);
  assert.ok(buildTabs(p).airway.rows.length >= 4);
  assert.equal(buildTabs(p).tubes.rows.length, 4);
});
