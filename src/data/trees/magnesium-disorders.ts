// MedKitt - Magnesium Disorders
// Hypomagnesemia and hypermagnesemia: cardiac, neuromuscular, obstetric, renal, and toxicologic management.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const MAGNESIUM_DISORDERS_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Torsades, seizure, or life-threatening arrhythmia: give IV magnesium immediately even before level returns.', nodeId: 'mg-torsades' },
  { text: 'Refractory hypokalemia or hypocalcemia often will not correct until magnesium is repleted.', nodeId: 'mg-hypo-workup' },
  { text: 'Hypermagnesemia with loss of reflexes, respiratory depression, hypotension, bradycardia, or heart block: stop Mg and give IV calcium.', nodeId: 'mg-hyper-toxic' },
  { text: 'Renal failure converts magnesium therapy from routine replacement to monitored drug administration.', nodeId: 'mg-renal' },
  { text: 'Dialysis is definitive for severe magnesium toxicity with renal failure or persistent cardiopulmonary compromise.', nodeId: 'mg-hyper-toxic' },
];

export const MAGNESIUM_DISORDERS_NODES: DecisionNode[] = [
  {
    id: 'mg-start',
    type: 'question',
    module: 1,
    title: 'Magnesium Disorder',
    body: 'Interpret magnesium with renal function, ECG, reflexes, respiratory status, potassium, calcium, phosphate, and recent magnesium exposure.\n\nWhich pathway fits?',
    citation: [1, 2, 3],
    options: [
      { label: 'Hypomagnesemia', description: 'Low magnesium or high-risk syndrome', next: 'mg-hypo-triage' },
      { label: 'Hypermagnesemia / toxicity', description: 'High Mg level or clinical toxicity', next: 'mg-hyper-triage' },
      { label: 'Renal failure / dialysis patient', description: 'Higher toxicity risk and slower Mg clearance', next: 'mg-renal', urgency: 'urgent' },
    ],
    summary: 'Route by low vs high Mg, but always interpret with renal function, ECG, reflexes, respiration, K, Ca, and phosphate.',
  },
  {
    id: 'mg-steps',
    type: 'info',
    module: 1,
    title: 'Magnesium Steps',
    body: '1. Assess ECG, reflexes, respiratory rate, BP, renal function, and paired electrolytes.\n2. Low Mg with torsades, seizure, severe arrhythmia, or severe symptoms: IV magnesium now.\n3. Low Mg without instability: replace IV or PO based on severity, GI tolerance, and renal function.\n4. High Mg/toxicity: stop sources, give IV calcium if symptomatic, support airway/hemodynamics, enhance elimination.\n5. Dialysis for severe toxicity with renal failure or persistent cardiopulmonary compromise.',
    citation: [1, 2, 3],
    next: 'mg-start',
    summary: 'Assess ECG/reflexes/respiration/renal function; replace low Mg, antagonize toxic Mg with calcium, dialyze severe renal toxicity.',
    skippable: true,
  },
  {
    id: 'mg-hypo-triage',
    type: 'question',
    module: 2,
    title: 'Hypomagnesemia Severity',
    body: 'Dangerous hypomagnesemia is clinical: torsades or prolonged QT, ventricular ectopy, seizures, tetany, severe weakness, refractory hypokalemia, refractory hypocalcemia, alcohol withdrawal, DKA, diarrhea, diuretics, amphotericin/cisplatin, or PPI-associated renal/GI wasting.',
    citation: [1, 2],
    options: [
      { label: 'Torsades / seizure / unstable arrhythmia', description: 'Treat before waiting for lab confirmation', next: 'mg-torsades', urgency: 'critical' },
      { label: 'Severe low Mg or symptomatic', description: 'Mg <1.2 mg/dL, symptoms, ICU, refractory K/Ca', next: 'mg-hypo-severe', urgency: 'urgent' },
      { label: 'Mild-moderate and stable', description: 'Able to take PO, no dangerous ECG/symptoms', next: 'mg-hypo-stable' },
    ],
    summary: 'Torsades/seizure/unstable rhythm gets IV magnesium immediately; stable mild cases can use oral/slow IV replacement.',
  },
  {
    id: 'mg-torsades',
    type: 'info',
    module: 2,
    title: 'Torsades / Seizure Mg',
    body: '[Magnesium Sulfate](#/drug/magnesium-sulfate/Torsades de pointes) 2 g IV over 5-15 min for torsades or unstable polymorphic VT (push over 1-2 min if pulseless/unstable); repeat 2 g at 5-15 min if it persists, then start a continuous infusion - a bolus alone wears off over hours and torsades recurs. Give even if serum magnesium is normal when torsades is present.\n\nCorrect K to high-normal, stop QT-prolonging drugs, treat bradycardia with overdrive pacing/isoproterenol when appropriate, and defibrillate unstable sustained/pulseless rhythms.',
    citation: [1, 5],
    next: 'mg-hypo-workup',
    summary: 'Torsades: Mg sulfate 2 g IV rapidly, correct K, stop QT drugs, manage bradycardia and defibrillate unstable rhythms.',
    safetyLevel: 'critical',
  },
  {
    id: 'mg-hypo-severe',
    type: 'info',
    module: 2,
    title: 'Severe Hypomagnesemia',
    body: 'If symptomatic but stable: [Magnesium Sulfate](#/drug/magnesium-sulfate/Hypomagnesemia / Hypokalemia adjunct) 1-2 g IV over about 1 hour; more aggressive repletion often requires scheduled 2-4 g doses or infusion when renal function is normal.\n\nFor Mg <1.2 mg/dL or severe total-body depletion, plan repeated dosing because serum Mg rises quickly but intracellular repletion is slower. Reduce dose and increase monitoring in renal impairment.',
    citation: [1, 2],
    next: 'mg-hypo-workup',
    summary: 'Severe/symptomatic low Mg needs IV replacement and repeated dosing; reduce dose and monitor closely in renal impairment.',
    safetyLevel: 'warning',
  },
  {
    id: 'mg-hypo-workup',
    type: 'info',
    module: 2,
    title: 'Hypomagnesemia Workup',
    body: 'Check K, Ca, phosphate, creatinine, ECG/QTc, acid-base status, and urinary Mg wasting when persistent.\n\nCommon drivers: diarrhea, malabsorption, alcohol use, malnutrition, DKA/insulin, refeeding, loop/thiazide diuretics, aminoglycosides, amphotericin, cisplatin, calcineurin inhibitors, EGFR inhibitors, PPIs, and inherited tubulopathies.\n\nReplete magnesium when potassium or calcium is refractory.',
    citation: [1, 2],
    next: 'mg-hypo-stable',
    summary: 'Find GI, renal, drug, alcohol/nutrition, DKA/refeeding, and renal wasting causes; low Mg blocks K/Ca correction.',
  },
  {
    id: 'mg-hypo-stable',
    type: 'result',
    module: 2,
    title: 'Stable Hypomagnesemia',
    body: 'Oral magnesium is reasonable when stable, mild-moderate, and able to tolerate GI effects. Use slower IV replacement when oral therapy is not tolerated, ongoing losses are high, or inpatient paired-electrolyte correction is needed.\n\nDischarge requires a cause addressed, no dangerous ECG/symptoms, renal-appropriate dose, and follow-up labs when ongoing losses or medications remain.',
    recommendation: 'Replace Mg, correct paired K/Ca problems, stop the cause when possible, and arrange lab follow-up for persistent-risk patients.',
    citation: [1, 2],
    confidence: 'recommended',
  },
  {
    id: 'mg-hyper-triage',
    type: 'question',
    module: 3,
    title: 'Hypermagnesemia Severity',
    body: 'Most clinically significant hypermagnesemia occurs with renal failure plus magnesium exposure: antacids/laxatives, supplements, obstetric MgSO4, missed dialysis, lithium/milk-alkali overlap, or massive tissue injury.\n\nClinical toxicity matters more than the number: hyporeflexia, weakness, somnolence, hypotension, bradycardia, AV block, widened QRS, respiratory depression, or arrest.',
    citation: [3, 4],
    options: [
      { label: 'Symptomatic / toxic', description: 'Loss of reflexes, respiratory depression, hypotension, bradycardia, heart block', next: 'mg-hyper-toxic', urgency: 'critical' },
      { label: 'Mild and asymptomatic', description: 'Normal renal function or improving, no cardiopulmonary toxicity', next: 'mg-hyper-stable' },
      { label: 'Renal failure / missed dialysis', description: 'High risk for persistent toxicity', next: 'mg-renal', urgency: 'urgent' },
    ],
    summary: 'Hypermagnesemia toxicity is clinical: reflexes, respiration, BP, bradycardia, and conduction disease drive urgency.',
  },
  {
    id: 'mg-hyper-toxic',
    type: 'info',
    module: 3,
    title: 'Magnesium Toxicity',
    body: '1. Stop all magnesium sources.\n2. Support airway, ventilation, circulation, and continuous ECG monitoring.\n3. Give [Calcium Gluconate](#/drug/calcium-gluconate/Hypermagnesemia / Magnesium Toxicity) 1-2 g IV over 5-10 min; repeat for recurrent cardiopulmonary toxicity. Use [Calcium Chloride](#/drug/calcium-chloride/Hypermagnesemia / Magnesium Toxicity) via central access if peri-arrest.\n4. If renal function is adequate: isotonic fluids plus loop diuretic may enhance excretion.\n5. If renal failure, severe level, persistent hypotension/bradycardia/respiratory depression, or missed dialysis: emergent hemodialysis.',
    citation: [3, 4],
    next: 'mg-renal',
    summary: 'Toxic Mg: stop source, support airway/hemodynamics, give IV calcium, diurese if renal function adequate, dialyze severe renal toxicity.',
    safetyLevel: 'critical',
  },
  {
    id: 'mg-hyper-stable',
    type: 'result',
    module: 3,
    title: 'Stable Hypermagnesemia',
    body: 'If mild, asymptomatic, and kidney function is adequate, remove exogenous magnesium and monitor. Recheck Mg, Ca, K, phosphate, creatinine, and ECG if level is meaningfully elevated or symptoms could evolve.\n\nMedication reconciliation should specifically look for magnesium-containing antacids, laxatives, supplements, bowel prep, and obstetric magnesium infusion.',
    recommendation: 'Stable mild hypermagnesemia is usually source control plus monitoring; escalate immediately if reflexes, respiration, BP, or conduction worsen.',
    citation: [3, 4],
    confidence: 'recommended',
  },
  {
    id: 'mg-renal',
    type: 'info',
    module: 4,
    title: 'Renal Failure Caveat',
    body: 'Renal impairment increases toxicity risk from both replacement and exposure. Avoid large empiric magnesium loads unless treating torsades, eclampsia, seizure, or clear severe deficiency. Use lower doses, longer intervals, and serial levels.\n\nFor toxicity with renal failure, dialysis is definitive. Calcium antagonizes toxicity transiently but does not remove magnesium.',
    citation: [1, 3, 4],
    next: 'mg-stop',
    summary: 'Renal failure turns magnesium into a monitored drug; calcium buys time in toxicity, dialysis removes magnesium.',
    safetyLevel: 'warning',
  },
  {
    id: 'mg-stop',
    type: 'result',
    module: 4,
    title: 'STOP: Magnesium Pitfalls',
    body: '- Do not wait for the Mg level before treating torsades.\n- Do not keep chasing potassium or calcium without correcting magnesium.\n- Do not give large magnesium replacement doses to oliguric/anuric patients without a monitoring plan.\n- Do not miss magnesium-containing laxatives/antacids in renal failure.\n- Do not assume calcium fixes hypermagnesemia; it antagonizes toxicity temporarily while elimination/dialysis is arranged.',
    recommendation: 'Magnesium disorders are ECG, renal, and paired-electrolyte problems; reassess the whole physiology after each intervention.',
    citation: [1, 2, 3, 4, 5],
    confidence: 'recommended',
  },
];

export const MAGNESIUM_DISORDERS_MODULE_LABELS = [
  'Start',
  'Low Magnesium',
  'High Magnesium',
  'Renal / Stop',
];

export const MAGNESIUM_DISORDERS_CITATIONS: Citation[] = [
  { num: 1, text: 'Farkas J. Hypomagnesemia. Internet Book of Critical Care (IBCC). EMCrit. Updated 2024. https://emcrit.org/ibcc/hypomagnesemia/' },
  { num: 2, text: 'Gragossian A, Bashir K, Friede R. Hypomagnesemia. StatPearls. Updated 2024. NCBI Bookshelf.' },
  { num: 3, text: 'Merck Manual Professional Edition. Hypermagnesemia. Reviewed/revised 2025.' },
  { num: 4, text: 'Ahmed F, Mohammed A. Hypermagnesemia. StatPearls. Updated 2024. NCBI Bookshelf.' },
  { num: 5, text: 'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 AHA Guidelines for CPR and ECC. Circulation. 2020;142:S366-S468.' },
];

export const MAGNESIUM_DISORDERS_NODE_COUNT = MAGNESIUM_DISORDERS_NODES.length;
