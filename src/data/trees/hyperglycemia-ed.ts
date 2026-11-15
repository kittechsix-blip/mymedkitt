import type { DecisionNode } from '../../models/types.js';
import { HG_CITATIONS } from '../new-content/hyperglycemia-evidence.js';

// Citations are shared with the info pages and drug cards (single source of truth).
export const HYPERGLYCEMIA_ED_CITATIONS = HG_CITATIONS;

export const HYPERGLYCEMIA_ED_CRITICAL_ACTIONS = [
  { text: 'Exclude DKA/HHS and insulin deficiency before outpatient type 2 treatment.', nodeId: 'hg-crisis' },
  { text: 'Do not send home a discharge sliding scale or repeat corrections without reviewing active insulin.', nodeId: 'hg-meal-plan' },
  { text: 'Confirm medicine, supplies, food, monitoring and follow-up access before discharge.', nodeId: 'hg-access-check' },
  { text: 'Basal dose is not total daily basal-bolus insulin; start 10 units or 0.1 to 0.2 units/kg.', nodeId: 'hg-basal' },
  { text: 'Check eGFR before any pill: no metformin start under 45, none under 30.', nodeId: 'hg-labs-node' },
];

export const HYPERGLYCEMIA_ED_MODULE_LABELS = ['Safety', 'Labs & access', 'Who & how severe', 'Pick the pills', 'Start insulin', 'Already on insulin / steroid', 'Disposition'];

// Prescription card: exact Rx, uninsured version, Why, Don't use if, Recheck when.
const card = (c: { rx: string; unins: string; why: string; dont: string; recheck: string }): string =>
  `**Rx:** ${c.rx}\n\n**Uninsured:** ${c.unins}\n\n**Why?** ${c.why}\n\n**Don't use if:** ${c.dont}\n\n**Recheck when:** ${c.recheck}\n\n[Discharge bundle](#/info/hg-discharge) • [Sick-day rules](#/info/hg-sickday) • [Plan Builder](#/calculator/hg-plan-builder) • [Terms](#/info/hg-x-terms)`;
const FOLLOW = 'Clinic in 1 to 2 weeks; A1c in 3 months. Sooner for vomiting, belly pain or deep breathing.';
const MET_RX = '[Metformin ER](#/drug/hg-metformin-er/ED bridge care) 500 mg by mouth with dinner. Increase by 500 mg every week as tolerated, up to 2000 mg once daily. Disp #120 (500 mg ER). Cheaper option: [metformin IR](#/drug/hg-metformin-ir/ED bridge care) 500 mg twice daily with meals, up by 500 mg weekly, to 1000 mg twice daily.';
const MET_UNINS = 'Generic metformin, about $4 to $10 per month (Walmart $4 list covers IR; confirm ER price).';
const MET_DONT = 'eGFR under 45 (do not start; none under 30); AKI, dehydration, hypoxia, heavy alcohol use, decompensated liver disease; DKA.';
const SGLT_RX = 'SGLT2 inhibitor: [empagliflozin](#/drug/hg-empagliflozin/ED bridge care) 10 mg or [dapagliflozin](#/drug/hg-dapagliflozin/ED bridge care) 10 mg by mouth every morning. Disp #30.';
const SGLT_UNINS = 'Generic dapagliflozin was FDA approved April 2026 (price unknown, ask the pharmacy). BI Cares helps with Jardiance (about 200% of poverty level; an application, not same-day). AZ&Me closed new Farxiga enrollment May 2026.';
const SGLT_DONT = 'Sick, vomiting, dehydrated, ketotic or fasting; suspected insulin deficiency; eGFR under 20; history of DKA; active genital infection.';

export const HYPERGLYCEMIA_ED_NODES: DecisionNode[] = [
  {
    id: 'hg-start', type: 'question', module: 1,
    title: 'Hyperglycemia: what do I prescribe?',
    body: 'Adult ED hyperglycemia. Rule out a crisis, find the patient type, then get an exact prescription with a cash price. Underlined terms link to concise clinical references.\n\n[Roadmap](#/info/hg-steps) • [Terms](#/info/hg-x-terms) • [Do NOT](#/info/hyperglycemia-ed-stop)\n\n**Safety screen.** Any of: vomiting, belly pain, deep or fast breathing, confusion, ketones or acidosis, glucose 600 or more, or weight loss with ketones?',
    citation: [2, 3],
    options: [
      { label: 'Yes: possible crisis or insulin deficiency', next: 'hg-crisis', urgency: 'critical' },
      { label: 'No red flags', next: 'hg-scope' },
    ],
    calculatorLinks: [
      { id: 'hg-plan-builder', label: 'Plan Builder', kind: 'calculator' },
    ],
  },
  {
    id: 'hg-crisis', type: 'question', module: 1,
    title: 'Possible DKA, HHS or insulin deficiency',
    body: '[Diagnostic criteria and labs](#/info/hg-labs). Check ketones and acidosis even with a near-normal glucose, especially on an [SGLT2 inhibitor](#/info/hg-x-sglt2). Get IV access, monitor, check volume and electrolytes, treat the trigger. Use a monitored crisis pathway, not oral outpatient therapy.\n\n[DKA/HHS consult](#/tree/dka). Mixed pictures happen: treat as a crisis.',
    citation: [2],
    options: [
      { label: 'Crisis confirmed, cannot exclude, or unstable', next: 'hg-admit', urgency: 'critical' },
      { label: 'Crisis excluded after evaluation', next: 'hg-scope' },
    ],
  },
  {
    id: 'hg-scope', type: 'question', module: 1,
    title: 'Is this routine adult type 2 bridge care?',
    body: 'Not routine: pregnant, under 18, pump or essential basal insulin interrupted, or **looks like type 1** (thin or young, weeks of weight loss, ketones, autoimmune history). See [spotting insulin deficiency](#/info/hg-x-insulin-deficiency). Adult age or body size does not exclude type 1.',
    citation: [1, 2],
    options: [
      { label: 'Pregnant, under 18, pump, or looks like type 1', next: 'hg-special' },
      { label: 'Stable nonpregnant adult, likely type 2', next: 'hg-labs-node' },
    ],
  },
  {
    id: 'hg-special', type: 'info', module: 1,
    title: 'Special population: specialist or monitored pathway',
    body: '**Pregnant:** obstetric plus endocrine, insulin-based plan. **Under 18:** [pediatric DKA](#/tree/peds-dka) and pediatric endocrine. **Suspected new type 1 or LADA:** insulin and teaching today, not pills alone. **Pump failure or missed basal:** restore basal insulin urgently and check ketones. Do not use the type 2 starter doses here. The [Plan Builder](#/calculator/hg-plan-builder) withholds these cases.',
    citation: [1, 2, 3],
    next: 'hg-admit',
  },
  {
    id: 'hg-labs-node', type: 'info', module: 2,
    title: 'Labs that change today’s plan',
    body: '[Labs and crisis criteria](#/info/hg-labs). Get glucose, bicarbonate, potassium and **eGFR** before choosing a drug. Add an [A1c](#/info/hg-x-a1c) if none in 3 months.\n\n**eGFR decides the pills ([ladder](#/info/hg-x-egfr)):**\n• 45 or more: all allowed\n• 30 to 44: do not START metformin\n• Under 30: no metformin\n• Under 15 or dialysis: stop, call nephrology/endocrine\n\n**A1c sets severity:** under 8.5 = one drug; 8.5 to 10 = two drugs; over 10 (or glucose 300 or more with symptoms, or weight loss) = basal insulin plus metformin.',
    citation: [1, 2, 3, 5],
    images: [{ src: 'images/hyperglycemia-ed/egfr-ladder.svg', alt: 'eGFR ladder showing which diabetes drugs are allowed at each kidney function band.', caption: 'eGFR ladder (original diagram; ADA 2026 and DailyMed labels).' }],
    next: 'hg-ed-care',
  },
  {
    id: 'hg-ed-care', type: 'question', module: 2,
    title: 'Treat the patient first, then plan',
    body: 'Oral fluids if they can drink; IV isotonic fluid for real volume depletion (reassess often in heart failure or CKD). Fix potassium or sodium problems. Treat the trigger (infection, ischemia, steroids, missed medicine). If you give insulin in the ED, watch the glucose long enough to see its effect wear off.',
    citation: [2, 3],
    options: [
      { label: 'Stable, drinking and eating, ready for a plan', next: 'hg-access-check' },
      { label: 'Persistent symptoms, AKI, electrolyte problem or unsafe trajectory', next: 'hg-admit', urgency: 'urgent' },
    ],
  },
  {
    id: 'hg-access-check', type: 'question', module: 2,
    title: 'Can this patient actually get and use the medicine?',
    body: 'Ask now, before you pick a drug: **Insurance** (none, Medicaid, Medicare)? **Pharmacy** open and close by? **Cash** on hand today? **Meals** reliable? **Meter and strips**? **Follow-up** possible within 1 to 2 weeks? Uninsured costs and $35 insulin programs: [Costs](#/info/hg-access). Every result card shows an uninsured version.',
    citation: [1, 3, 13],
    options: [
      { label: 'Medicine, supplies and follow-up can be arranged', next: 'hg-cause' },
      { label: 'Need help arranging them', next: 'hg-case-management' },
    ],
  },
  {
    id: 'hg-case-management', type: 'question', module: 2,
    title: 'Close the access gap before discharge',
    body: 'Involve case management and pharmacy now. Call the pharmacy for the quote, book the safety-net clinic ([HRSA Find a Health Center](https://findahealthcenter.hrsa.gov/)) while the patient is here, and enroll in an insulin program if insulin is likely ([$35 programs](#/info/hg-access)). Budget the meter, strips and syringes too.',
    citation: [1, 3, 13],
    options: [
      { label: 'Plan secured', next: 'hg-cause' },
      { label: 'Essential medicine or monitoring still unavailable', next: 'hg-admit' },
    ],
  },
  {
    id: 'hg-cause', type: 'question', module: 3,
    title: 'Who is this patient?',
    body: 'Pick the closest match. The prescription card follows.\n\n**A.** New diagnosis, never treated\n**B.** Known diabetes, ran out or stopped medicine\n**C.** Taking pills, still high\n**D.** Taking [insulin](#/info/hg-x-basal-meal): still high, having lows, or cannot afford it\n**E.** [Steroid](#/info/hg-x-steroid)-induced or illness-driven\n\nOr enter everything in the [Plan Builder](#/calculator/hg-plan-builder).',
    citation: [1, 3],
    options: [
      { label: 'A. New diagnosis, never treated', next: 'hg-sev' },
      { label: 'B. Known diabetes, ran out or stopped', next: 'hg-refill' },
      { label: 'C. Taking pills, still high', next: 'hg-pattern' },
      { label: 'D. Taking insulin: still high, lows, or cannot afford', next: 'hg-d-start' },
      { label: 'E. Steroid-induced or illness-driven', next: 'hg-e-start' },
    ],
    calculatorLinks: [{ id: 'hg-plan-builder', label: 'Plan Builder', kind: 'calculator' }],
  },
  {
    id: 'hg-refill', type: 'question', module: 3,
    title: 'B. Ran out or stopped: what were they on?',
    body: 'Find out what, what dose, and why it stopped (cost, side effect, access). Do not call an unaffordable prescription a drug failure. Restart pills at the label starting dose and retitrate (do not resume the old maximum). Do not double insulin to catch up.',
    citation: [1, 3],
    options: [
      { label: 'Pills (or nothing known)', next: 'hg-sev' },
      { label: 'Insulin', next: 'hg-d-start' },
    ],
  },
  {
    id: 'hg-pattern', type: 'info', module: 3,
    title: 'C. Pills, still high: rule out the boring causes',
    body: 'Before adding drugs: Are they taking it (pharmacy fill history, cost)? At the right dose and not skipping? Steroids, infection or a new interacting drug? Has eGFR fallen (metformin cap 1000 mg/day under 45; stop under 30)? Is metformin at 2000 mg ER or the highest tolerated dose? Then pick severity: you will **add** a drug, not replace the current one. Existing agents are credited in the [Plan Builder](#/calculator/hg-plan-builder).',
    citation: [1, 3, 5],
    next: 'hg-sev',
  },
  {
    id: 'hg-sev', type: 'question', module: 3,
    title: 'How severe? Use A1c (or ED glucose) plus symptoms',
    body: '**Mild:** A1c under 8.5, no symptoms: ONE drug.\n**Moderate:** A1c 8.5 to 10: TWO drugs.\n**Severe:** A1c over 10, OR glucose 300 or more with symptoms, OR weight loss: [basal insulin](#/info/hg-x-why-insulin-first) plus metformin. Many can drop insulin later once glucose toxicity clears.\n\nNo A1c and no severe features: treat as mild, get an A1c at follow-up. [A1c explained](#/info/hg-x-a1c).',
    citation: [1],
    options: [
      { label: 'Mild: A1c under 8.5, no symptoms', next: 'hg-mild' },
      { label: 'Moderate: A1c 8.5 to 10', next: 'hg-moderate' },
      { label: 'Severe: A1c over 10, symptomatic 300+, or weight loss', next: 'hg-basal', urgency: 'urgent' },
    ],
  },
  {
    id: 'hg-mild', type: 'question', module: 4,
    title: 'Mild (one drug): check kidney, heart, liver and alcohol',
    body: 'Pick the first match. Already on metformin (type C)? Titrate it to the max allowed first; if already maxed, add the next drug here. [Pill grid](#/info/hg-meds).',
    citation: [1, 5, 8, 9, 16],
    images: [{ src: 'images/hyperglycemia-ed/pill-picker.svg', alt: 'Pill picker grid of diabetes drugs by condition with green, yellow and red cells.', caption: 'Pill picker (original diagram; ADA 2026 and DailyMed labels).' }],
    options: [
      { label: 'eGFR 45 or more; no heart failure, CKD or ASCVD; no heavy alcohol or decompensated liver', next: 'hg-r-met' },
      { label: 'Heart failure, CKD (eGFR 20 or more) or prior heart attack/stroke', next: 'hg-r-sglt' },
      { label: 'Metformin not allowed: eGFR under 45, heavy alcohol or decompensated liver', next: 'hg-r-sita' },
    ],
  },
  {
    id: 'hg-moderate', type: 'question', module: 4,
    title: 'Moderate (two drugs): metformin plus a second drug chosen by the patient',
    body: 'Already on metformin? Keep it, add only the second drug. Choose by the patient, not by price alone: [sulfonylureas and lows](#/info/hg-x-sulfonylurea), [SGLT2](#/info/hg-x-sglt2), [eGFR ladder](#/info/hg-x-egfr).',
    citation: [1, 5, 6, 7, 8, 9, 15, 16],
    options: [
      { label: 'Reliable meals, under 65, no alcohol problem, eGFR 45+', next: 'hg-r-met-glip' },
      { label: 'Unreliable meals, age 65+ or frail (eGFR 45+)', next: 'hg-r-met-sita' },
      { label: 'Fatty liver (MASLD), no heart failure (eGFR 45+)', next: 'hg-r-met-pio' },
      { label: 'Heart failure, CKD or prior heart attack/stroke', next: 'hg-r-met-sglt' },
      { label: 'eGFR under 45 or heavy alcohol use (no metformin)', next: 'hg-r-nomet-two' },
    ],
  },
  {
    id: 'hg-basal', type: 'question', module: 5,
    title: 'Severe: basal insulin plus metformin',
    body: '[Basal insulin](#/info/hg-x-basal-meal): 10 units once daily, or 0.1 to 0.2 units/kg (low end if age 65+, frail, eGFR under 45, unreliable meals). Never write a [total daily dose](#/info/hg-x-tdd) as basal. Add metformin if eGFR is 45 or more. Do NOT start an SGLT2 inhibitor or GLP-1 now.\n\nCan the patient inject? Need a meter, strips, syringes or pen needles, a fridge or cool spot, and teach-back. Insulin curves: [analog vs human](#/info/hg-x-analog-human).',
    citation: [1, 3, 10, 17],
    images: [{ src: 'images/hyperglycemia-ed/insulin-curves.svg', alt: 'Schematic insulin action curves: glargine flat, NPH peaks about 4 to 12 hours, regular, rapid analog.', caption: 'Insulin action curves (schematic, original diagram).' }],
    options: [
      { label: 'Uninsured', next: 'hg-r-basal-unins' },
      { label: 'Insured (or Medicare/Medicaid)', next: 'hg-r-basal-ins' },
      { label: 'Cannot self-inject safely or no supplies or follow-up', next: 'hg-case-management' },
    ],
    calculatorLinks: [{ id: 'hg-basal-start', label: 'Basal starter', kind: 'calculator' }, { id: 'hg-plan-builder', label: 'Plan Builder', kind: 'calculator' }],
  },

  // ---- Result cards: A, B, C (pills) ----
  {
    id: 'hg-r-met', type: 'result', module: 4,
    title: 'Mild: metformin alone',
    body: card({
      rx: MET_RX,
      unins: MET_UNINS,
      why: '[Why metformin first](#/info/hg-x-why-metformin): cheap, no lows by itself, weight neutral, decades of safety. Take with food; ER is gentler. ADA 2026.',
      dont: MET_DONT,
      recheck: FOLLOW + ' If A1c is still 8.5 or higher in 3 months, add a second drug.',
    }),
    citation: [1, 5, 14, 24],
    recommendation: 'Metformin ER 500 mg with dinner, +500 mg weekly to 2000 mg.',
    confidence: 'recommended',
  },
  {
    id: 'hg-r-sglt', type: 'result', module: 4,
    title: 'Mild with heart failure, CKD or ASCVD: SGLT2 inhibitor',
    body: card({
      rx: `${SGLT_RX} Start for heart and kidney protection at eGFR 20 or more (ADA 2026). Glucose lowering is weak when eGFR is under 45. Dapagliflozin glycemic start is 5 mg (label); 10 mg is the heart failure and CKD dose. Add metformin at follow-up if eGFR is 45 or more and A1c stays high.`,
      unins: SGLT_UNINS,
      why: '[SGLT2 inhibitors](#/info/hg-x-sglt2): they cut heart failure admissions and slow kidney decline whatever the A1c.',
      dont: SGLT_DONT,
      recheck: 'Phone check in 1 week for genital infection and dehydration; clinic in 1 to 2 weeks; eGFR in 2 to 4 weeks. Hold on sick days.',
    }),
    citation: [1, 9, 16, 24],
    recommendation: 'Empagliflozin 10 mg or dapagliflozin 10 mg every morning.',
    confidence: 'recommended',
  },
  {
    id: 'hg-r-sita', type: 'result', module: 4,
    title: 'Mild, metformin not allowed: sitagliptin (dose by eGFR)',
    body: card({
      rx: '[Sitagliptin](#/drug/hg-sitagliptin/ED bridge care): eGFR 45 or more 100 mg daily; eGFR 30 to 44 50 mg daily; eGFR under 30 25 mg daily. Disp #30. Not with a GLP-1 drug. Add an [SGLT2 inhibitor](#/info/hg-x-sglt2) at follow-up if heart failure, CKD or ASCVD.',
      unins: 'Generic sitagliptin price unknown in 2026: ask the pharmacy. Cheaper alternatives: glipizide 2.5 mg before breakfast (reliable meals only, not heavy alcohol; $4) or pioglitazone 15 mg (no heart failure; about $4 to $10).',
      why: 'Low lows risk and safe at low eGFR. [eGFR ladder](#/info/hg-x-egfr).',
      dont: 'History of pancreatitis; on a GLP-1 drug; eGFR under 15 or dialysis (stop).',
      recheck: FOLLOW,
    }),
    citation: [1, 6, 7, 8, 24],
    recommendation: 'Sitagliptin dosed to eGFR (100 / 50 / 25 mg daily).',
    confidence: 'recommended',
  },
  {
    id: 'hg-r-met-glip', type: 'result', module: 4,
    title: 'Moderate: metformin plus glipizide',
    body: card({
      rx: `${MET_RX}\n\nPLUS [glipizide IR](#/drug/hg-glipizide/ED bridge care) 5 mg by mouth 30 minutes before breakfast (2.5 mg if CKD or eGFR under 60). Raise by 2.5 to 5 mg only after several days with glucose review. Once-daily max 15 mg. Disp #30. Meter and strips required.`,
      unins: `${MET_UNINS} Glipizide about $4 per month (Walmart list).`,
      why: '[Sulfonylureas](#/info/hg-x-sulfonylurea) are cheap and strong, but only safe with reliable meals. Glipizide (not glyburide) has the shorter action.',
      dont: 'Skips meals, heavy alcohol, age 65+ or frail, eGFR under 30, or any prior low. Skip the glipizide on a day with no meal. Glimepiride 1 to 2 mg is an alternative.',
      recheck: 'Phone check in 3 to 5 days for lows; clinic in 1 to 2 weeks. Teach: glucose under 70 means 15 g sugar and recheck in 15 minutes.',
    }),
    citation: [1, 5, 6, 14, 15, 24],
    recommendation: 'Metformin ER 500 mg with dinner (titrate) plus glipizide 5 mg before breakfast.',
    confidence: 'recommended',
  },
  {
    id: 'hg-r-met-sita', type: 'result', module: 4,
    title: 'Moderate, unreliable meals or older: metformin plus sitagliptin',
    body: card({
      rx: `${MET_RX}\n\nPLUS [sitagliptin](#/drug/hg-sitagliptin/ED bridge care) 100 mg daily at eGFR 45 or more. Disp #30. Alternative second drug if no heart failure: [pioglitazone](#/drug/hg-pioglitazone/ED bridge care) 15 mg daily. With heavy alcohol use or decompensated liver disease, skip metformin and use sitagliptin alone, then call primary care.`,
      unins: `${MET_UNINS} Sitagliptin price unknown in 2026 (ask); pioglitazone about $4 to $10.`,
      why: 'No sulfonylurea: [lows with skipped meals, age or alcohol](#/info/hg-x-sulfonylurea). Sitagliptin and pioglitazone rarely cause lows by themselves.',
      dont: 'Pioglitazone with any heart failure or edema. Sitagliptin with pancreatitis or a GLP-1 drug. Metformin with heavy alcohol use.',
      recheck: FOLLOW,
    }),
    citation: [1, 5, 7, 8, 14, 24],
    recommendation: 'Metformin ER titrated plus sitagliptin 100 mg daily (no sulfonylurea).',
    confidence: 'recommended',
  },
  {
    id: 'hg-r-met-pio', type: 'result', module: 4,
    title: 'Moderate with fatty liver, no heart failure: metformin plus pioglitazone',
    body: card({
      rx: `${MET_RX}\n\nPLUS [pioglitazone](#/drug/hg-pioglitazone/ED bridge care) 15 mg by mouth once daily (15 to 30 mg start range, max 45 mg). Slow: full effect takes weeks. Disp #30.`,
      unins: `${MET_UNINS} Pioglitazone about $4 to $10 per month.`,
      why: 'Pioglitazone treats insulin resistance and helps fatty liver, with no lows.',
      dont: 'Heart failure, edema or volume overload; active bladder cancer; decompensated cirrhosis. Check liver tests first. Not for rapid rescue.',
      recheck: 'Weight and leg swelling at 1 to 2 weeks; ALT at follow-up.',
    }),
    citation: [1, 5, 7, 14, 24],
    recommendation: 'Metformin ER titrated plus pioglitazone 15 mg daily.',
    confidence: 'recommended',
  },
  {
    id: 'hg-r-met-sglt', type: 'result', module: 4,
    title: 'Moderate with heart failure, CKD or ASCVD: SGLT2 inhibitor plus metformin',
    body: card({
      rx: `${SGLT_RX}\n\nPLUS ${MET_RX}\n\nIf eGFR is under 45, skip metformin and add sitagliptin ([dose by eGFR](#/info/hg-x-egfr)) as the second drug.`,
      unins: `${SGLT_UNINS} ${MET_UNINS}`,
      why: '[SGLT2 inhibitors](#/info/hg-x-sglt2) protect the heart and kidney. Metformin adds low-cost glucose lowering.',
      dont: `${SGLT_DONT} Metformin: ${MET_DONT}`,
      recheck: 'Phone check in 1 week; clinic in 1 to 2 weeks; eGFR in 2 to 4 weeks.',
    }),
    citation: [1, 5, 9, 16, 24],
    recommendation: 'SGLT2 inhibitor 10 mg every morning plus metformin ER titrated.',
    confidence: 'recommended',
  },
  {
    id: 'hg-r-nomet-two', type: 'result', module: 4,
    title: 'Moderate, no metformin (eGFR under 45 or heavy alcohol): two drugs',
    body: card({
      rx: '[Sitagliptin](#/drug/hg-sitagliptin/ED bridge care) (eGFR 45 or more: 100 mg daily; 30 to 44: 50 mg daily; under 30: 25 mg daily) PLUS ONE of: an [SGLT2 inhibitor](#/info/hg-x-sglt2) 10 mg every morning if heart failure, CKD or ASCVD (eGFR 20 or more; glucose effect is weak, benefit is heart and kidney); OR [glipizide](#/drug/hg-glipizide/ED bridge care) 2.5 mg before breakfast if meals are reliable, age under 65 and eGFR 30 or more; OR [pioglitazone](#/drug/hg-pioglitazone/ED bridge care) 15 mg daily if no heart failure. Existing metformin users: cap at 1000 mg/day (eGFR 30 to 44) or stop (under 30).',
      unins: 'Glipizide and pioglitazone are about $4 to $10; sitagliptin and generic dapagliflozin prices unknown (ask).',
      why: '[Kidney ladder](#/info/hg-x-egfr): metformin is not started under 45, and pills lose power as eGFR falls. If A1c stays 8.5 or higher, ask endocrine about low-dose insulin.',
      dont: 'eGFR under 15 or dialysis; sulfonylurea with unreliable meals; pioglitazone with heart failure.',
      recheck: 'eGFR and glucose in 1 to 2 weeks; call endocrine if not improving.',
    }),
    citation: [1, 5, 6, 7, 8, 16],
    recommendation: 'Sitagliptin dosed to eGFR plus an SGLT2 inhibitor, glipizide 2.5 mg or pioglitazone as the patient allows.',
    confidence: 'consider',
  },

  // ---- Severe: basal insulin ----
  {
    id: 'hg-r-basal-unins', type: 'result', module: 5,
    title: 'Severe, uninsured: basal insulin at $35 (analog) or NPH ($25)',
    body: card({
      rx: '[Glargine](#/drug/hg-glargine/ED bridge care) 10 units subcutaneously once daily, same time each day (0.1 to 0.2 units/kg: low end if age 65+, frail, eGFR under 45 or unreliable meals). Patient adds 2 units every 3 days while fasting glucose is above 130 (goal 80 to 130). Any glucose under 70: cut the dose 10 to 20% and call. Stop raising if the dose passes 0.5 units/kg. PLUS metformin if eGFR is 45 or more: ' + MET_RX + ' Stop or reassess any sulfonylurea. Disp: syringes or pen needles, meter, strips, lancets, glucose tablets.',
      unins: '**Option 1 (preferred): $35 per 30 days.** Lilly Insulin Value Program for Basaglar or Rezvoglar (card expires 12/31/2026), Sanofi Insulins Valyou for Lantus (confirm), or NovoCare MyInsulinRx for Tresiba. Not for Medicaid, Medicare, VA or TRICARE patients.\n**Option 2: [NPH](#/drug/hg-nph/ED bridge care).** ReliOn NPH vial about $25 (2026 price unverified) or Novolin N $35 via MyInsulinRx. 10 units at BEDTIME, same ADA starting range, then the same titration. NPH peaks 4 to 12 hours later (more overnight lows). If the dose grows, the twice-daily split is per pharmacy/endocrine. [Analog vs human](#/info/hg-x-analog-human).',
      why: '[Why basal insulin first](#/info/hg-x-why-insulin-first): pills are too slow when A1c is over 10 or symptoms/weight loss are present (ADA 2026 Rec 9.20). [Why not a sliding scale](#/info/hg-x-no-sliding-scale).',
      dont: 'Suspected insulin deficiency (thin, young, ketones); cannot inject; no meter or strips; recent low glucose; eGFR under 15. No SGLT2 inhibitor or GLP-1 from the ED.',
      recheck: 'Phone check in 2 to 3 days (fasting numbers, lows); clinic within 1 week; A1c in 3 months.',
    }),
    citation: [1, 3, 5, 10, 17, 20, 21, 22, 24],
    recommendation: 'Basal insulin 10 units daily (glargine $35 program, or bedtime NPH) plus metformin if eGFR 45+.',
    confidence: 'recommended',
    calculatorLinks: [{ id: 'hg-basal-start', label: 'Basal starter', kind: 'calculator' }, { id: 'hg-basal-titrate', label: 'Basal titration', kind: 'calculator' }],
  },
  {
    id: 'hg-r-basal-ins', type: 'result', module: 5,
    title: 'Severe, insured: glargine plus metformin',
    body: card({
      rx: '[Glargine](#/drug/hg-glargine/ED bridge care) (or the formulary basal analog) 10 units subcutaneously once daily, same time each day (0.1 to 0.2 units/kg: low end if age 65+, frail, eGFR under 45 or unreliable meals). Add 2 units every 3 days while fasting is above 130 (goal 80 to 130). Any glucose under 70: cut the dose 10 to 20% and call. Stop raising above 0.5 units/kg. PLUS metformin if eGFR is 45 or more: ' + MET_RX + ' Disp: pen needles, meter, strips, lancets, glucose tablets.',
      unins: 'Medicaid, Medicare, VA and TRICARE patients cannot use the manufacturer $35 cards: use their own coverage; ask the pharmacy about the plan’s preferred basal. If coverage fails: [NPH at bedtime](#/drug/hg-nph/ED bridge care) is the fallback.',
      why: '[Why basal insulin first](#/info/hg-x-why-insulin-first). Glargine is flat and has fewer lows than NPH: [analog vs human](#/info/hg-x-analog-human). ADA 2026.',
      dont: 'Suspected insulin deficiency; cannot inject; no meter; eGFR under 15. No SGLT2 or GLP-1 start from the ED.',
      recheck: 'Phone check in 2 to 3 days; clinic within 1 week. Add a mealtime dose later only if fasting is at goal but after-meal readings are high.',
    }),
    citation: [1, 3, 5, 10],
    recommendation: 'Glargine 10 units daily plus metformin if eGFR 45+.',
    confidence: 'recommended',
    calculatorLinks: [{ id: 'hg-basal-start', label: 'Basal starter', kind: 'calculator' }, { id: 'hg-basal-titrate', label: 'Basal titration', kind: 'calculator' }],
  },

  // ---- D: already on insulin ----
  {
    id: 'hg-d-start', type: 'question', module: 6,
    title: 'D. On insulin: what is the problem?',
    body: 'Reconcile the exact product, dose and last dose. Is the insulin basal only, basal plus mealtime, NPH/regular, or 70/30? Pumps, U-200/U-500 and doses you cannot verify go to pharmacy/endocrine. Which pattern?',
    citation: [1, 3],
    options: [
      { label: 'Fasting high, no lows (basal only)', next: 'hg-r-d-titrate' },
      { label: 'Having lows', next: 'hg-r-d-lows' },
      { label: 'Cannot afford the insulin', next: 'hg-r-d-afford' },
      { label: 'Fasting OK, high after meals', next: 'hg-meal-plan' },
      { label: 'Ran out or missed doses', next: 'hg-r-d-restart' },
      { label: 'Unknown dose, pump, concentrated, NPH or 70/30 titration', next: 'hg-dose-review' },
    ],
  },
  {
    id: 'hg-r-d-titrate', type: 'result', module: 6,
    title: 'D: fasting high on basal insulin: raise basal by 2 units',
    body: card({
      rx: 'Raise basal insulin by 2 units once daily (example: 14 to 16 units). Then 2 more units every 3 days while fasting is above 130 (goal 80 to 130), if no lows and every dose was taken. Use the [basal titration calculator](#/calculator/hg-basal-titrate).',
      unins: 'Keep the SAME insulin and use a $35 program ([Costs](#/info/hg-access)). No conversion needed.',
      why: 'Fasting glucose reflects basal ([fasting vs after meals](#/info/hg-x-fasting-vs-post)). If the dose is over 0.5 units/kg and still high, stop raising: look at meals ([overbasalization](#/info/hg-x-no-sliding-scale)).',
      dont: 'Any glucose under 70, missed doses, unclear injection technique, NPH/regular/70/30 (no sourced rule: ask pharmacy/endocrine).',
      recheck: 'Phone check in 3 days; clinic within 1 to 2 weeks.',
    }),
    citation: [1, 3, 10],
    recommendation: 'Basal +2 units every 3 days to fasting 80 to 130; stop above 0.5 units/kg.',
    confidence: 'recommended',
    calculatorLinks: [{ id: 'hg-basal-titrate', label: 'Basal titration', kind: 'calculator' }],
  },
  {
    id: 'hg-r-d-lows', type: 'result', module: 6,
    title: 'D: lows on insulin: cut the responsible dose 10 to 20%',
    body: card({
      rx: 'Cut the dose that matches the timing of the lows by 10 to 20% (example: 20 units to 16 to 18). **Fasting or overnight lows = basal. Lows after a meal = the mealtime dose.** Stop any sulfonylurea. Find the cause: skipped meal, alcohol, falling eGFR, extra dose, recent steroid stop.',
      unins: 'No new cost. Glucose tablets (about $5) and a working meter.',
      why: 'Lows are the main danger of insulin. [Fasting vs after-meal](#/info/hg-x-fasting-vs-post). ADA 2026.',
      dont: 'Raising any insulin dose before the lows are explained.',
      recheck: 'Phone check in 2 to 3 days; clinic within 1 week. Treat lows: [sick-day and low plan](#/info/hg-sickday).',
    }),
    citation: [1, 3],
    recommendation: 'Reduce the responsible insulin dose by 10 to 20% and stop sulfonylureas.',
    confidence: 'recommended',
  },
  {
    id: 'hg-r-d-afford', type: 'result', module: 6,
    title: 'D: cannot afford insulin: same insulin, cheaper source first',
    body: card({
      rx: 'Keep the **same product** and enroll in a $35 per 30 day program: Lilly Insulin Value Program (Basaglar, Rezvoglar, Humalog, Humulin R/N/70-30; card expires 12/31/2026), NovoCare MyInsulinRx (NovoLog, Tresiba, Novolin N/R/70-30), Sanofi Insulins Valyou (Lantus; confirm).',
      unins: 'Only if no program fits: human insulin. Glargine to NPH dose and split, lispro to regular unit conversion, and 70/30 start dose are all **per pharmacy/endocrine** (no labeled rule). Regular goes in about 30 minutes before meals; 70/30 about 30 to 45 minutes before a meal. Twice-daily NPH to once-daily glargine is 80% of the NPH total (label). ReliOn vials about $25 (unverified). Expect more lows. [Conversions](#/info/hg-x-conversions).',
      why: 'Switching insulins is a common cause of lows and highs; keeping the same product avoids it. [Analog vs human](#/info/hg-x-analog-human).',
      dont: 'Guessing a conversion dose. Medicaid, Medicare, VA, TRICARE patients cannot use manufacturer cards.',
      recheck: 'Phone check in 2 to 3 days after any switch; clinic within 1 week.',
    }),
    citation: [10, 17, 18, 19, 20, 21, 22],
    recommendation: 'Same insulin on a $35 program; human-insulin conversions only per pharmacy/endocrine.',
    confidence: 'recommended',
  },
  {
    id: 'hg-meal-plan', type: 'result', module: 6,
    title: 'D: fasting OK, high after meals: add ONE mealtime dose',
    body: card({
      rx: 'Add rapid-acting insulin ([lispro](#/drug/hg-lispro/ED bridge care)) at the biggest meal: 4 units or 10% of the basal dose. Give within 15 minutes before or right after eating. Adjust by 1 to 2 units or 10 to 15% twice a week. No meal means no dose. Established ratios: [Meal + Correction](#/calculator/hg-meal-correction) (no active bolus, no pump).',
      unins: 'Humalog $35 (Lilly program) or NovoLog $35 (MyInsulinRx). Cheaper fallback: [regular insulin](#/drug/hg-regular/ED bridge care) about 30 minutes before the meal; start dose per pharmacy/endocrine.',
      why: 'Fasting is at goal, so more basal will not help ([fasting vs after meals](#/info/hg-x-fasting-vs-post)). Mealtime vs correction: [terms](#/info/hg-x-basal-meal). No [sliding scale](#/info/hg-x-no-sliding-scale).',
      dont: 'Skipped meals, unknown active insulin, pump, NPH or 70/30 regimen. If A1c is under 8%, consider cutting basal by 4 units or 10% when adding mealtime insulin.',
      recheck: 'Clinic within 1 to 2 weeks with a meal log.',
    }),
    citation: [1, 3, 4, 11, 18],
    recommendation: 'Add 4 units (or 10% of basal) of rapid insulin at the largest meal.',
    confidence: 'recommended',
    calculatorLinks: [{ id: 'hg-meal-correction', label: 'Meal + Correction', kind: 'calculator' }],
  },
  {
    id: 'hg-r-d-restart', type: 'result', module: 6,
    title: 'D: ran out or missed insulin: restart safely',
    body: card({
      rx: 'If the old dose is verified and the patient is eating normally: restart the prior dose; do not double up. If the dose is unknown or doubtful: restart as a new basal start (10 units or 0.1 to 0.2 units/kg once daily, titrate +2 units every 3 days). If many days were missed, intake is low or the patient is frail, the restart dose is per pharmacy/endocrine (no sourced percentage).',
      unins: 'Same product on a $35 program ([Costs](#/info/hg-access)). Same-day enrollment is possible by phone.',
      why: 'Old doses can cause lows after a gap or illness. Check [crisis criteria](#/info/hg-labs) first: missed insulin can mean DKA.',
      dont: 'Ketosis or vomiting (DKA workup), type 1, a pump, or an unverified dose.',
      recheck: 'Phone check in 2 to 3 days; clinic within 1 week.',
    }),
    citation: [1, 2, 3],
    recommendation: 'Restart a verified dose; otherwise restart as a new basal start.',
    confidence: 'recommended',
  },
  {
    id: 'hg-dose-review', type: 'info', module: 6,
    title: 'Complex or unverified regimen: get a reviewed plan',
    body: 'Unknown doses, pumps and AID, U-200 or U-500, NPH or 70/30 titration, dexamethasone or split-dose steroids, and any insulin conversion have no sourced rule here. Treat low glucose, review eGFR, meals and timing, then call the pharmacist or endocrine on call with the full regimen. Observe or admit if a safe plan cannot be made. [Conversions](#/info/hg-x-conversions) • [Hypoglycemia](#/tree/hypoglycemia).',
    citation: [1, 3, 10, 18, 19],
    next: 'hg-dispo',
  },

  // ---- E: steroid / illness ----
  {
    id: 'hg-e-start', type: 'question', module: 6,
    title: 'E. Steroid- or illness-driven hyperglycemia',
    body: '[Steroids raise glucose mostly in the afternoon and evening](#/info/hg-x-steroid). Evidence is thin; this app uses conservative weight-based NPH from an RCT. Which case?',
    citation: [3, 23],
    options: [
      { label: 'Short steroid burst and A1c normal', next: 'hg-r-e-none' },
      { label: 'Once-daily MORNING prednisone, 10 mg or more, needs treatment', next: 'hg-r-e-nph' },
      { label: 'Illness or stress (not steroid)', next: 'hg-sev' },
      { label: 'Dexamethasone, split or evening dosing, other', next: 'hg-dose-review' },
    ],
  },
  {
    id: 'hg-r-e-none', type: 'result', module: 6,
    title: 'E: short burst, A1c normal: often no insulin',
    body: card({
      rx: 'No insulin. Check fingerstick before dinner and at bedtime while on the steroid. Return for thirst, frequent urination, glucose over 300 or vomiting. Treat the illness.',
      unins: 'Meter, strips and lancets only (about $10 to $25).',
      why: '[Steroid hyperglycemia](#/info/hg-x-steroid) fades as the steroid wears off; insulin risks lows when it ends.',
      dont: 'A1c high or unknown with symptoms, DKA signs, or a long steroid course.',
      recheck: 'Primary care glucose and A1c recheck after the course.',
    }),
    citation: [3, 23],
    recommendation: 'Monitor glucose; no insulin for a short burst with a normal A1c.',
    confidence: 'consider',
  },
  {
    id: 'hg-r-e-nph', type: 'result', module: 6,
    title: 'E: morning prednisone: NPH given with the steroid',
    body: card({
      rx: '[NPH](#/drug/hg-nph/ED bridge care) each morning with the prednisone: **0.15 units/kg for prednisone 10 to 40 mg; 0.3 units/kg for more than 40 mg** (round down; example 80 kg on 40 mg = 12 units). Taper the NPH as the steroid tapers; stop it the day the steroid stops. Any glucose under 70: cut the NPH 10 to 20% and call. Use the [Plan Builder](#/calculator/hg-plan-builder) for the exact units.',
      unins: 'ReliOn NPH vial about $25 (unverified), or Novolin N $35 (MyInsulinRx) or Humulin N $35 (Lilly program). Plus syringes, meter and strips.',
      why: '[Steroid hyperglycemia](#/info/hg-x-steroid): NPH peaks several hours later, matching the steroid glucose peak. Lower-confidence rule (RCT, mostly inpatient); this is the conservative dose.',
      dont: 'eGFR under 30 (ask pharmacy/endocrine), frail or age 65+ without early follow-up, poor oral intake, steroid other than once-daily morning prednisone, type 1 or DKA.',
      recheck: 'Phone check in 2 to 3 days and at each steroid taper step; clinic within 1 week.',
    }),
    citation: [3, 17, 23],
    recommendation: 'NPH 0.15 units/kg (prednisone 10 to 40 mg) or 0.3 units/kg (over 40 mg) with the morning steroid.',
    confidence: 'consider',
    calculatorLinks: [{ id: 'hg-plan-builder', label: 'Plan Builder', kind: 'calculator' }],
  },

  // ---- Disposition ----
  {
    id: 'hg-dispo', type: 'question', module: 7,
    title: 'Is the discharge bundle complete?',
    body: 'Use the [discharge checklist](#/info/hg-discharge): medicine and supplies actually in hand or obtainable today, teach-back done, written dose and hold plan, named follow-up with a date. Do not require one arbitrary discharge glucose; do not ignore persistent symptoms just because glucose fell.',
    citation: [3, 12],
    options: [
      { label: 'Complete and appropriate for discharge', next: 'hg-discharge' },
      { label: 'Essential elements missing or continued concern', next: 'hg-admit' },
    ],
  },
  {
    id: 'hg-discharge', type: 'result', module: 7,
    title: 'Discharge with a concrete bridge plan',
    body: 'Give [written discharge instructions](#/info/hg-discharge) and [sick-day and low-glucose rules](#/info/hg-sickday). Document the drug, dose, supplies, how the patient will pay for and get them, teach-back, and the follow-up date. Phone check in 2 to 3 days for any new insulin or sulfonylurea. [Costs](#/info/hg-access).',
    citation: [1, 3, 12],
    recommendation: 'Discharge only with a feasible treatment, monitoring and follow-up plan.',
    confidence: 'recommended',
  },
  {
    id: 'hg-admit', type: 'result', module: 7,
    title: 'Observe, admit or escalate',
    body: 'Choose monitored care for crisis, suspected insulin deficiency needing initiation and teaching, continued illness, important electrolyte or kidney problems, or an unsafe discharge plan. Fix the clinical and access barriers rather than prescribing a complex outpatient regimen without support. [DKA/HHS](#/tree/dka).',
    citation: [2, 3],
    recommendation: 'Use observation or admission and the appropriate crisis or specialist pathway.',
    confidence: 'recommended',
  },
];

export const HYPERGLYCEMIA_ED_NODE_COUNT = HYPERGLYCEMIA_ED_NODES.length;
