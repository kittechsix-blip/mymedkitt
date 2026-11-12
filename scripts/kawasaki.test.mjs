// Kawasaki calculators and consult wiring (2026-11-12).
//   node --test scripts/kawasaki.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import {
  kdCriteria, incompleteKd, sonScore, kdHighRisk, coronaryClass, kawasakiDoses,
  KAWASAKI_CRITERIA_CALCULATOR as CR, KAWASAKI_INCOMPLETE_CALCULATOR as IN, KAWASAKI_HIGH_RISK_CALCULATOR as HR,
  KAWASAKI_CORONARY_Z_CALCULATOR as CZ, KAWASAKI_DOSES_CALCULATOR as D,
} from '../src/components/kawasaki-calculators.ts';
import { KAWASAKI_NODES as N, KAWASAKI_CITATIONS as C, KAWASAKI_CRITICAL_ACTIONS as A } from '../src/data/trees/kawasaki.ts';

const c = (feverDays, features, o = {}) => kdCriteria({ feverDays, features, infant: false, alternative: false, ...o });
const ik = (o) => incompleteKd({ crp: NaN, esr: NaN, supplemental: 0, echo: -1, peeling: false, ...o });

test('criteria: complete, incomplete, infant rule, too early', () => {
  assert.equal(c(5, 4), 'complete');
  assert.equal(c(4, 4), 'complete', 'day 4 with 4 or more features');
  assert.equal(c(5, 3), 'incomplete-kd');
  assert.equal(c(5, 2), 'incomplete-kd');
  assert.equal(c(5, 1), 'unlikely');
  assert.equal(c(3, 5), 'too-early');
  assert.equal(c(7, 0, { infant: true }), 'incomplete-kd', 'infant 7+ days unexplained fever');
  assert.equal(c(6, 0, { infant: true }), 'unlikely');
  assert.equal(c(0, 5), 'incomplete-input', 'empty box reads 0');
  assert.equal(CR.computeResult({ fever: 6, lips: 1, eyes: 1, rash: 1, extremities: 1 }).value, 'Complete Kawasaki');
  assert.equal(CR.computeResult({ fever: 6, lips: 1, eyes: 1, rash: 1, extremities: 1, alt: 1 }).value, 'Look for another diagnosis first', 'alternative features override Treat now');
});

test('incomplete algorithm: when to treat before the echo (AHA 2017 Figure 3)', () => {
  assert.equal(ik({}), 'need-labs');
  assert.equal(ik({ crp: 0, esr: 0 }), 'need-labs', 'empty boxes read 0');
  assert.equal(ik({ crp: 5, supplemental: 3 }), 'treat-labs', 'high CRP + 3 labs: treat without the echo');
  assert.equal(ik({ esr: 40, supplemental: 4, echo: -1 }), 'treat-labs', 'ESR 40 is high');
  assert.equal(ik({ crp: 3, supplemental: 2 }), 'echo', 'CRP 3.0 is high; fewer than 3 labs: echo');
  assert.equal(ik({ crp: 3, supplemental: 2, echo: 1 }), 'treat-echo');
  assert.equal(ik({ crp: 3, supplemental: 2, echo: 0 }), 'echo-negative');
  assert.equal(ik({ crp: 2.9, esr: 39 }), 'reassess');
  assert.equal(ik({ crp: 2.9 }), 'need-labs', 'low CRP alone is not enough to call it low');
  assert.equal(ik({ crp: 1, esr: 20, peeling: true }), 'echo-peeling');
  assert.equal(ik({ crp: 1, esr: 20, echo: 1 }), 'treat-echo');
  assert.equal(IN.computeResult({ crp: 8, esr: 0, anemia: 1, alb: 1, wbc: 1, echo: -1 }).value, 'Treat now, before the echo');
});

test('Son score and high risk', () => {
  assert.equal(sonScore({ zMax: 2.0, under6mo: false, asian: false, crp: 5 }), 2);
  assert.equal(sonScore({ zMax: 1.9, under6mo: true, asian: true, crp: 13 }), 3);
  assert.equal(sonScore({ zMax: 2.1, under6mo: true, asian: true, crp: 14 }), 5);
  const low = kdHighRisk({ zMax: 1, under6mo: false, asian: true, crp: 5, shock: false, mas: false });
  assert.equal(low.tier, 'low'); assert.equal(low.steroids, false);
  assert.equal(kdHighRisk({ zMax: 2.2, under6mo: false, asian: false, crp: 5, shock: false, mas: false }).steroids, false, 'Son 2 = moderate, no routine steroids');
  assert.equal(kdHighRisk({ zMax: 2.6, under6mo: false, asian: false, crp: 5, shock: false, mas: false }).steroids, true, 'Z 2.5+');
  assert.equal(kdHighRisk({ zMax: 0, under6mo: true, asian: false, crp: 0, shock: false, mas: false }).steroids, true, 'under 6 months');
  assert.equal(kdHighRisk({ zMax: 0, under6mo: false, asian: false, crp: 0, shock: true, mas: false }).steroids, false, 'shock alone: specialist-directed therapy, not the adjunct trigger');
  assert.match(HR.computeResult({ shock: 1 }).description, /Shock or macrophage activation/);
  assert.match(HR.computeResult({ z: 3, crp: 10 }).description, /prednisolone 2 mg\/kg\/day/);
  assert.match(HR.computeResult({ z: 3, crp: 10 }).description, /infliximab/);
});

test('coronary Z classes (AHA)', () => {
  assert.equal(coronaryClass(1.5, 0), 'normal');
  assert.equal(coronaryClass(2, 0), 'dilation');
  assert.equal(coronaryClass(2.5, 0), 'small');
  assert.equal(coronaryClass(5, 0), 'medium');
  assert.equal(coronaryClass(9.9, 8), 'giant', '8 mm or more is giant');
  assert.equal(coronaryClass(10, 0), 'giant');
  assert.equal(coronaryClass(0, 0), 'none');
  assert.equal(coronaryClass(0, 9), 'giant');
  assert.match(CZ.computeResult({ z: 12 }).description, /warfarin/);
});

test('doses', () => {
  const d = kawasakiDoses(20);
  assert.equal(d.ivigG, 40);
  assert.deepEqual(d.asaModMg, [600, 1000]);
  assert.deepEqual(d.asaHighMg, [1600, 2000]);
  assert.deepEqual(d.asaLowMg, [60, 100]);
  assert.equal(d.prednisoloneMgDay, 40);
  assert.equal(d.infliximabMg, 200);
  assert.equal(d.mpPulseMg, 600);
  assert.equal(kawasakiDoses(40).prednisoloneMgDay, 60, 'max 60 mg/day');
  assert.equal(kawasakiDoses(40).mpPulseMg, 1000, 'max 1 g');
  assert.equal(kawasakiDoses(0), null);
  assert.equal(D.computeResult({ weight: 20 }).value, 'IVIG 40 g');
});

test('consult wiring', () => {
  const ids = new Set(N.map((n) => n.id));
  assert.equal(ids.size, N.length);
  assert.equal(N.length, 16);
  assert.ok(ids.has('kd-start'));
  for (const n of N) {
    for (const nx of [n.next, ...(n.options || []).map((o) => o.next)].filter(Boolean)) assert.ok(ids.has(nx), `${n.id} -> ${nx}`);
    for (const cn of n.citation || []) assert.ok(C.some((x) => x.num === cn), `${n.id} cites [${cn}]`);
    for (const img of n.images || []) assert.ok(existsSync(new URL(`../docs/${img.src}`, import.meta.url)), img.src);
    for (const m of (n.body || '').matchAll(/\(#\/node\/([a-z0-9-]+)\)/g)) assert.ok(ids.has(m[1]), `${n.id} links ${m[1]}`);
  }
  for (const a of A) assert.ok(ids.has(a.nodeId), a.nodeId);
});
