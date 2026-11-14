// Hyperglycemia Bridge Plan Builder (2026-11-14).   node --test scripts/hg-plan-builder.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planBridge, computeBridgePlan, HG_PLAN_BUILDER_CALCULATOR as C, HYPERGLYCEMIA_CALCULATORS } from '../src/components/hyperglycemia-calculators.ts';

const base = { patientType: 1, egfr: 90, a1c: 7.5, glucose: 200, weight: 80 };
const drugs = (p) => p.items.map((i) => i.drug).join(' | ');
const text = (p) => JSON.stringify(p);

test('registered with the other hyperglycemia calculators', () => {
  assert.equal(C.id, 'hg-plan-builder');
  assert.ok(HYPERGLYCEMIA_CALCULATORS.includes(C));
});

test('hard stops withhold a plan', () => {
  for (const k of ['crisis', 'pregnant', 'under18', 'type1Clues', 'dialysis']) {
    const p = planBridge({ ...base, [k]: 1 });
    assert.equal(p.blocked, true, k);
    assert.equal(p.items.length, 0, k);
    assert.equal(computeBridgePlan({ ...base, [k]: 1 }).value, '—', k);
  }
  assert.equal(planBridge({ ...base, egfr: 14 }).blocked, true);
  assert.equal(planBridge({ ...base, egfr: 0 }).blocked, true);
  assert.equal(planBridge({ ...base, egfr: undefined }).blocked, true);
  assert.equal(planBridge({ ...base, patientType: 0 }).blocked, true);
  assert.equal(planBridge({ ...base, egfr: 15 }).blocked, false);
  // stops apply to every patient type
  for (const t of [1, 2, 3, 4, 5]) assert.equal(planBridge({ ...base, patientType: t, crisis: 1 }).blocked, true);
});

test('A mild: metformin ER alone, with cost', () => {
  const p = planBridge(base);
  assert.equal(p.severity, 'mild');
  assert.equal(drugs(p), 'Metformin ER');
  assert.match(p.items[0].rx, /500 mg/);
  assert.match(p.items[0].rx, /2000 mg/);
  assert.match(p.items[0].cash, /\$4/);
});

test('A mild with no A1c is planned as mild with a note', () => {
  const p = planBridge({ ...base, a1c: 0 });
  assert.equal(p.severity, 'mild');
  assert.ok(p.notes.some((n) => /No A1c/.test(n)));
});

test('A moderate: metformin plus glipizide when meals reliable', () => {
  const p = planBridge({ ...base, a1c: 9 });
  assert.equal(p.severity, 'moderate');
  assert.equal(drugs(p), 'Metformin ER | Glipizide IR');
  assert.match(p.items[1].rx, /5 mg/);
});

test('A1c boundaries: 8.4 mild, 8.5 and 10 moderate, 10.1 severe', () => {
  assert.equal(planBridge({ ...base, a1c: 8.4 }).severity, 'mild');
  assert.equal(planBridge({ ...base, a1c: 8.5 }).severity, 'moderate');
  assert.equal(planBridge({ ...base, a1c: 10 }).severity, 'moderate');
  assert.equal(planBridge({ ...base, a1c: 10.1 }).severity, 'severe');
});

test('severe triggers: A1c over 10, glucose 300+ with symptoms, weight loss', () => {
  assert.equal(planBridge({ ...base, glucose: 320, symptoms: 1 }).severity, 'severe');
  assert.equal(planBridge({ ...base, glucose: 320 }).severity, 'mild'); // 300+ without symptoms is not severe by itself
  assert.equal(planBridge({ ...base, weightLoss: 1 }).severity, 'severe');
});

test('modifier: unreliable meals, 65+/frail or alcohol swap glipizide for sitagliptin', () => {
  for (const k of ['mealsUnreliable', 'frail']) {
    const p = planBridge({ ...base, a1c: 9, [k]: 1 });
    assert.equal(drugs(p), 'Metformin ER | Sitagliptin', k);
    assert.ok(p.avoided.some((a) => /Glipizide.*avoided/.test(a)), k);
  }
  const alc = planBridge({ ...base, a1c: 9, alcohol: 1 });
  assert.ok(!drugs(alc).includes('Metformin'));
  assert.ok(!drugs(alc).includes('Glipizide'));
  assert.ok(alc.avoided.some((a) => /Metformin avoided.*alcohol/.test(a)));
});

test('modifier: glipizide starts 2.5 mg with CKD-range eGFR or liver disease', () => {
  const p = planBridge({ ...base, a1c: 9, egfr: 55 });
  assert.match(p.items[1].rx, /2\.5 mg/);
  assert.match(planBridge({ ...base, a1c: 9, liver: 1 }).items.map((i) => i.rx).join(' '), /2\.5 mg|pioglitazone|Pioglitazone/);
});

test('modifier: fatty liver without heart failure prefers pioglitazone; with HF it does not', () => {
  assert.equal(drugs(planBridge({ ...base, a1c: 9, liver: 1 })), 'Metformin ER | Pioglitazone');
  const hf = planBridge({ ...base, a1c: 9, liver: 1, hf: 1 });
  assert.ok(!drugs(hf).includes('Pioglitazone'));
  assert.ok(hf.avoided.some((a) => /Pioglitazone avoided: heart failure/.test(a)));
});

test('modifier: decompensated liver avoids metformin, sulfonylurea and pioglitazone', () => {
  const p = planBridge({ ...base, a1c: 9, liver: 2 });
  assert.equal(drugs(p), 'Sitagliptin');
  assert.ok(p.avoided.some((a) => /decompensated/.test(a)));
});

test('modifier: HF, ASCVD or CKD adds an SGLT2 inhibitor', () => {
  for (const k of ['hf', 'ascvd', 'ckd']) {
    assert.equal(drugs(planBridge({ ...base, [k]: 1 })), 'SGLT2 inhibitor', `${k} mild`);
    assert.equal(drugs(planBridge({ ...base, a1c: 9, [k]: 1 })), 'SGLT2 inhibitor | Metformin ER', `${k} moderate`);
  }
});

test('eGFR bands: metformin never started under 45; sitagliptin renal doses', () => {
  const p44 = planBridge({ ...base, egfr: 44 });
  assert.equal(drugs(p44), 'Sitagliptin');
  assert.match(p44.items[0].rx, /50 mg/);
  assert.ok(p44.avoided.some((a) => /not started: eGFR 30 to 44/.test(a)));
  assert.match(planBridge({ ...base, egfr: 25 }).items[0].rx, /25 mg/);
  assert.match(planBridge({ ...base, egfr: 45 }).items[0].drug, /Metformin/);
  assert.match(planBridge({ ...base, egfr: 29 }).avoided.join(' '), /contraindicated/);
  const mod = planBridge({ ...base, egfr: 40, a1c: 9 });
  assert.ok(!drugs(mod).includes('Metformin'));
  assert.equal(mod.items.length, 2);
  assert.ok(!drugs(planBridge({ ...base, egfr: 25, a1c: 9 })).includes('Glipizide'));
});

test('SGLT2 not offered below eGFR 20', () => {
  const p = planBridge({ ...base, egfr: 18, hf: 1 });
  assert.ok(!drugs(p).includes('SGLT2'));
});

test('B ran out: restart pills from the starting dose, not the old max', () => {
  const p = planBridge({ ...base, patientType: 2, a1c: 9, onMetformin: 1, metforminMaxed: 1 });
  assert.match(p.items[0].rx, /500 mg by mouth with dinner/);
  assert.ok(p.notes.some((n) => /label starting dose/.test(n)));
});

test('B ran out of insulin goes to the insulin restart branch', () => {
  const known = planBridge({ ...base, patientType: 2, priorInsulin: 1, currentBasal: 20 });
  assert.match(known.items[0].rx, /prior reconciled dose \(20 units\)/);
  const unknown = planBridge({ ...base, patientType: 2, priorInsulin: 1 });
  assert.match(unknown.items[0].rx, /new insulin start/);
  assert.match(text(known), /pharmacy\/endocrine/);
});

test('C pills still high: continue current agents, add what is missing', () => {
  const titr = planBridge({ ...base, patientType: 3, onMetformin: 1 });
  assert.match(titr.items[0].rx, /Increase metformin by 500 mg/);
  const maxed = planBridge({ ...base, patientType: 3, onMetformin: 1, metforminMaxed: 1 });
  assert.equal(maxed.items.length, 2);
  assert.match(maxed.items[0].drug, /continue/);
  const cap = planBridge({ ...base, patientType: 3, onMetformin: 1, egfr: 40, a1c: 9 });
  assert.match(cap.items[0].rx, /cap at 1000 mg/);
  const stopMet = planBridge({ ...base, patientType: 3, onMetformin: 1, egfr: 25, a1c: 9 });
  assert.ok(stopMet.avoided.some((a) => /Stop current metformin/.test(a)));
  const stopSU = planBridge({ ...base, patientType: 3, onSU: 1, a1c: 9, frail: 1 });
  assert.ok(stopSU.avoided.some((a) => /Stop current glipizide/.test(a)));
});

test('severe: basal insulin 10 units plus metformin; insured and uninsured wording', () => {
  const ins = planBridge({ ...base, a1c: 11 });
  assert.equal(ins.severity, 'severe');
  assert.equal(ins.basalUnits, 10);
  assert.equal(drugs(ins), 'Basal insulin | Metformin ER');
  assert.match(ins.titration, /2 units every 3 days/);
  assert.match(ins.titration, /10 to 20%/);
  assert.match(ins.titration, /0\.5 units\/kg/);
  const un = planBridge({ ...base, a1c: 11, uninsured: 1 });
  assert.match(un.items[0].rx, /\$35 program/);
  assert.match(un.items[0].rx, /Medicaid, Medicare, VA/);
  assert.ok(un.notes.some((n) => /NPH/.test(n) && /bedtime/.test(n)));
  assert.match(text(un), /pharmacy\/endocrine/);
  assert.ok(un.avoided.some((a) => /SGLT2 inhibitor and GLP-1 not started/.test(a)));
});

test('severe modifiers: low-risk patients start at 0.1 units/kg when lower than 10', () => {
  assert.equal(planBridge({ ...base, a1c: 11, frail: 1, weight: 55 }).basalUnits, 5);
  assert.equal(planBridge({ ...base, a1c: 11, frail: 1, weight: 120 }).basalUnits, 10);
  assert.equal(planBridge({ ...base, a1c: 11, egfr: 40, weight: 70 }).basalUnits, 7);
  assert.equal(planBridge({ ...base, a1c: 11, weight: 55 }).basalUnits, 10);
});

test('severe: metformin dropped at eGFR under 45; sulfonylurea handled; cannot inject withholds', () => {
  assert.equal(drugs(planBridge({ ...base, a1c: 11, egfr: 40 })), 'Basal insulin');
  assert.ok(planBridge({ ...base, patientType: 3, a1c: 11, onSU: 1, frail: 1 }).avoided.some((a) => /Sulfonylurea stopped/.test(a)));
  const cant = planBridge({ ...base, a1c: 11, cantInject: 1 });
  assert.equal(cant.blocked, true);
  assert.equal(cant.severity, 'severe');
});

test('D fasting high: +2 units; 0.5 units/kg ceiling; NPH or 70/30 not titrated', () => {
  const d = { ...base, patientType: 4, dScenario: 1, currentBasal: 20, insulinKind: 1 };
  assert.match(planBridge(d).items[0].rx, /from 20 to 22 units/);
  assert.equal(planBridge(d).basalUnits, 22);
  const over = planBridge({ ...d, currentBasal: 45 });
  assert.match(over.items[0].drug, /Do not raise basal/);
  assert.equal(planBridge({ ...d, insulinKind: 3 }).blocked, true);
  assert.equal(planBridge({ ...d, insulinKind: 4 }).blocked, true);
  assert.equal(planBridge({ ...d, currentBasal: 0 }).blocked, true);
});

test('D lows: cut 10 to 20% of the dose that matches the timing', () => {
  const d = { ...base, patientType: 4, dScenario: 2, currentBasal: 30, currentMeal: 10, lowTiming: 1 };
  const fasting = planBridge(d);
  assert.match(fasting.items[0].rx, /from 30 to about 24 to 27 units/);
  const post = planBridge({ ...d, lowTiming: 2 });
  assert.match(post.items[0].rx, /from 10 to about 8 to 9 units/);
  assert.equal(planBridge({ ...d, lowTiming: 0 }).blocked, true);
  assert.ok(planBridge({ ...d, onSU: 1 }).avoided.some((a) => /Stop the sulfonylurea/.test(a)));
});

test('D cannot afford: same insulin via programs; no invented conversion numbers', () => {
  const p = planBridge({ ...base, patientType: 4, dScenario: 3, uninsured: 1 });
  const all = text(p);
  assert.match(all, /same product|SAME product/i);
  assert.match(all, /Lilly Insulin Value Program/);
  assert.match(all, /NovoCare MyInsulinRx/);
  assert.match(all, /pharmacy\/endocrine/);
  assert.match(all, /80% of the NPH total/);
  assert.doesNotMatch(all, /2\/3 AM|two[- ]thirds/i);
});

test('D post-meal high: add 4 units or 10% of basal; complex regimens withheld', () => {
  const d = { ...base, patientType: 4, dScenario: 4, currentBasal: 40, insulinKind: 1 };
  const p = planBridge(d);
  assert.match(p.items[0].rx, /4 units or 10% of basal \(4 units\)/);
  assert.match(planBridge({ ...d, currentBasal: 60 }).items[0].rx, /\(6 units\)/);
  assert.equal(planBridge({ ...d, insulinKind: 4 }).blocked, true);
  assert.ok(p.notes.some((n) => /A1c is under 8%/.test(n)));
});

test('D with no scenario selected is withheld', () => {
  assert.equal(planBridge({ ...base, patientType: 4 }).blocked, true);
});

test('E steroid: 0.15 units/kg for prednisone 10 to 40 mg, 0.3 units/kg above 40', () => {
  const e = { ...base, patientType: 5, steroidMorningOnce: 1, prednisone: 20, weight: 80 };
  assert.equal(planBridge(e).basalUnits, 12);
  assert.equal(planBridge({ ...e, prednisone: 40 }).basalUnits, 12);
  assert.equal(planBridge({ ...e, prednisone: 41 }).basalUnits, 24);
  assert.equal(planBridge({ ...e, prednisone: 60, weight: 75 }).basalUnits, 22); // floor(22.5)
  assert.match(planBridge(e).items[0].rx, /Taper the NPH/);
  assert.match(planBridge({ ...e, uninsured: 1 }).items[0].cash, /ReliOn/);
});

test('E steroid: short burst needs no insulin; unsupported cases withheld', () => {
  const e = { ...base, patientType: 5, steroidMorningOnce: 1, prednisone: 20 };
  const burst = planBridge({ ...e, shortBurst: 1 });
  assert.equal(burst.blocked, false);
  assert.match(burst.headline, /no treatment/);
  assert.equal(planBridge({ ...e, steroidMorningOnce: 0 }).blocked, true);
  assert.equal(planBridge({ ...e, prednisone: 5 }).blocked, true);
  assert.equal(planBridge({ ...e, weight: 0 }).blocked, true);
  assert.equal(planBridge({ ...e, egfr: 25 }).blocked, true);
  assert.ok(planBridge({ ...e, frail: 1 }).notes.some((n) => /frail/.test(n)));
});

test('computeBridgePlan formats a headline and the required sections', () => {
  const r = computeBridgePlan({ ...base, a1c: 11, uninsured: 1 });
  assert.match(r.value, /Basal insulin 10 units daily/);
  for (const h of ['REGIMEN', 'CHEAPEST SAFE VERSION AND COST', 'WHY EACH CHOICE', 'TITRATION', 'DO NOT USE IF', 'SUPPLIES', 'FOLLOW-UP']) assert.match(r.description, new RegExp(`\\*\\*${h}`), h);
  assert.doesNotMatch(r.description, /—/);
});

test('no em dashes in any generated text across scenarios', () => {
  const cases = [base, { ...base, a1c: 9 }, { ...base, a1c: 11, uninsured: 1 }, { ...base, patientType: 4, dScenario: 3 }, { ...base, patientType: 5, steroidMorningOnce: 1, prednisone: 30 }];
  for (const c of cases) assert.doesNotMatch(computeBridgePlan(c).description, /—/);
});

test('type D withholds dose increases when the insulin product is unknown (audit 2026-11-14)', () => {
  for (const dScenario of [1, 4]) {
    const p = planBridge({ ...base, patientType: 4, dScenario, currentBasal: 20, currentMeal: 6, lowTiming: 1, insulinKind: 0 });
    assert.equal(p.blocked, true, String(dScenario));
  }
});

test('basal plus mealtime patients adjust the existing mealtime dose, not add one', () => {
  const p = planBridge({ ...base, patientType: 4, dScenario: 4, currentBasal: 30, insulinKind: 2 });
  assert.equal(p.blocked, false);
  assert.match(drugs(p), /Adjust the existing mealtime dose/);
  assert.doesNotMatch(drugs(p), /Add one mealtime dose/);
});
