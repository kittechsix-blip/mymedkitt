// Two local anesthetics, one shared limit (2026-11-13).   node --test scripts/la-combo.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { laCombo, agentMaxMg, agentOf, LA_COMBO_CALCULATOR as C } from '../src/components/la-combo-calculators.ts';

const base = { weightKg: 70, agent1: 1, mgPerMl1: 10, ml1: 0, agent2: 3, mgPerMl2: 5, ml2: 0 };

test('max per drug: weight-based, never above the adult cap', () => {
  assert.deepEqual(agentMaxMg(agentOf(1), 50), { mg: 225, capped: false });
  assert.deepEqual(agentMaxMg(agentOf(1), 100), { mg: 300, capped: true });
  assert.deepEqual(agentMaxMg(agentOf(3), 70), { mg: 175, capped: false });
  assert.deepEqual(agentMaxMg(agentOf(4), 100), { mg: 225, capped: true });
});

test('no volumes: even split is half of each max', () => {
  const r = laCombo(base);
  assert.equal(r.mode, 'split');
  assert.equal(r.max1, 300); // 70 x 4.5 = 315, capped 300
  assert.equal(r.max2, 175);
  assert.equal(r.splitMl1, 15); // 150 mg / 10
  assert.equal(r.splitMl2, 17.5); // 87.5 mg / 5
});

test('one drug given: the rest of the limit goes to the other (additive)', () => {
  const r = laCombo({ ...base, ml1: 15 }); // 150 mg lido = 50%
  assert.equal(r.mode, 'remaining');
  assert.ok(Math.abs(r.used - 0.5) < 1e-9);
  assert.ok(Math.abs(r.remainingMg2 - 87.5) < 1e-9);
  assert.ok(Math.abs(r.remainingMl2 - 17.5) < 1e-9);
  const back = laCombo({ ...base, ml2: 35 }); // full bupivacaine max
  assert.equal(back.remainingMg2, 0, 'nothing left of drug 1');
  assert.match(C.computeResult({ weight: 70, agent1: 1, conc1: 100, ml1: 15, agent2: 3, conc2: 50 }).value, /^17.5 mL$/);
});

test('both given: total share, warnings at 50% and 80%', () => {
  const r = laCombo({ ...base, ml1: 24, ml2: 7 }); // 80% + 20%
  assert.equal(Math.round(r.used * 100), 100);
  const out = C.computeResult({ weight: 70, agent1: 1, conc1: 100, ml1: 24, agent2: 3, conc2: 50, ml2: 7 });
  assert.equal(out.value, '100% of limit');
  assert.equal(out.colorVar, '--color-danger');
  assert.equal(C.computeResult({ weight: 70, agent1: 1, conc1: 100, ml1: 6, agent2: 3, conc2: 50, ml2: 7 }).colorVar, '--color-primary'); // 20% + 20%
});

test('blank weight shows the prompt; defaults are lidocaine 1% + bupivacaine 0.5%', () => {
  assert.equal(C.computeResult({}).value, '--');
  assert.equal(C.fields.find((f) => f.name === 'agent2').selectOptions[0].points, 3);
  assert.equal(C.fields.find((f) => f.name === 'conc2').selectOptions[0].points, 50);
});
