// Frostbite calculators and consult wiring (2026-11-09).
//   node --test scripts/frostbite.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { reperfusionDecision, iloprostRate, FROSTBITE_REPERFUSION_CALCULATOR as R, FROSTBITE_CAUCHY_CALCULATOR as C, FROSTBITE_ILOPROST_RATE_CALCULATOR as I } from '../src/components/frostbite-calculators.ts';
import { FROSTBITE_NODES } from '../src/data/trees/frostbite.ts';

const d = (grade, hoursSinceThaw, tpaContraindicated = false, tpaCapable = true) => reperfusionDecision({ grade, hoursSinceThaw, tpaContraindicated, tpaCapable });

test('reperfusion follows the WMS windows', () => {
  assert.equal(d(-1, 6), 'incomplete');
  assert.equal(d(1, 6), 'none');
  assert.equal(d(3, null), 'incomplete');
  assert.equal(d(3, 6), 'tpa');
  assert.equal(d(3, 18, false, false), 'transfer');
  assert.equal(d(3, 6, true), 'iloprost', 'subdural hematoma: tPA contraindicated, iloprost (the ABEM case)');
  assert.equal(d(4, 48), 'iloprost', 'past 24 h, inside 72 h');
  assert.equal(d(3, 96), 'late');
  assert.equal(d(2, 6), 'iloprost-consider', 'grade 2 never gets tPA');
  assert.equal(d(2, 96), 'late');
});

test('reperfusion calculator: time windows are a select, defaults ask for input', () => {
  assert.equal(R.computeResult({ grade: -1, hours: -1, contra: 0, capable: 0 }).value, '--');
  assert.equal(R.computeResult({ grade: 3, hours: 6, contra: 1, capable: 1 }).value, 'Iloprost');
  assert.equal(R.computeResult({ grade: 4, hours: 6, contra: 0, capable: 1 }).value, 'tPA now');
});

test('iloprost rate matches the label formula (1,000 ng/mL)', () => {
  assert.equal(iloprostRate(0.5, 70), 2.1);   // 0.5 x 70 x 60 / 1000
  assert.equal(iloprostRate(2, 80), 9.6);
  assert.equal(iloprostRate(2.5, 80), null, 'above the 2 ng/kg/min maximum');
  assert.equal(iloprostRate(1, 0), null);
  assert.equal(I.computeResult({ weight: 70, dose: 50 }).value, '2.1 mL/h');
});

test('Cauchy grade 3+ points to reperfusion', () => {
  assert.match(C.computeResult({ level: 3 }).description, /tPA within 24 h/);
  assert.match(C.computeResult({ level: 2 }).description, /No tPA/);
});

test('consult: links resolve inside the tree, images ship, search words present', () => {
  const ids = new Set(FROSTBITE_NODES.map((n) => n.id));
  for (const n of FROSTBITE_NODES) {
    for (const o of n.options || []) assert.ok(ids.has(o.next), `${n.id} -> ${o.next}`);
    if (n.next) assert.ok(ids.has(n.next), `${n.id} next ${n.next}`);
    for (const m of (n.body || '').matchAll(/#\/node\/([a-z0-9-]+)/g)) assert.ok(ids.has(m[1]), `${n.id} links ${m[1]}`);
    for (const img of n.images || []) assert.ok(existsSync(new URL(`../docs/${img.src}`, import.meta.url)), img.src);
  }
  const all = FROSTBITE_NODES.map((n) => n.body).join(' ').toLowerCase();
  for (const w of ['frostbite', 'iloprost', 'prostacyclin', 'subdural', 'amputat', 'rewarming']) assert.ok(all.includes(w), w);
});
