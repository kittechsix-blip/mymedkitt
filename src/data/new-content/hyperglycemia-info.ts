import type { InfoPage } from '../info-pages.js';
import { HG_CITATIONS } from './hyperglycemia-evidence.js';

type Sec = { heading?: string; body: string; image?: { src: string; alt: string; caption?: string } };
const SUB = 'Adult ED hyperglycemia and bridge care';
const page = (id: string, title: string, sections: Sec[], shareable = false, subtitle = SUB): InfoPage =>
  ({ id, title, subtitle, sections, citations: HG_CITATIONS, shareable });
// Concept review template: definition, ED relevance, key numbers.
const explain = (id: string, title: string, what: string, why: string, nums: string, extra?: Sec[]): InfoPage =>
  page(id, title, [
    { heading: 'Definition', body: what },
    { heading: 'ED relevance', body: why },
    { heading: 'Key numbers', body: nums },
    ...(extra || []),
  ], false, 'Concept review');

export const HG_INFO_PAGES: Record<string, InfoPage> = {
  'hg-steps': page('hg-steps', 'Hyperglycemia: rapid roadmap', [
    { heading: 'The 5 steps', body: '1. [Safety screen](#/tree/hyperglycemia-ed/node/hg-start): crisis or not type 2? Stop here if yes.\n2. [Labs that change the plan](#/info/hg-labs): glucose, bicarb/ketones, eGFR, A1c.\n3. [Who is this patient?](#/tree/hyperglycemia-ed/node/hg-cause): new, ran out, pills not enough, on insulin, or steroid.\n4. [How severe?](#/tree/hyperglycemia-ed/node/hg-sev): A1c under 8.5 = 1 drug, 8.5 to 10 = 2 drugs, over 10 or symptoms = basal insulin plus metformin.\n5. Pick the card (kidney, heart, meals, money), then the [discharge bundle](#/info/hg-discharge).' },
    { heading: 'One-tap tools', body: '[Plan Builder](#/calculator/hg-plan-builder) • [Pills](#/info/hg-meds) • [Insulin](#/info/hg-insulin) • [Terms](#/info/hg-x-terms) • [Meal + Correction](#/calculator/hg-meal-correction) • [Costs](#/info/hg-access) • [Sick day](#/info/hg-sickday).' },
  ]),

  'hg-labs': page('hg-labs', 'Hyperglycemia: labs and crisis criteria', [
    { heading: 'What to order and why', body: 'Fingerstick glucose. BMP for sodium, potassium, bicarbonate and [eGFR](#/info/hg-x-egfr): eGFR picks which pills are allowed. Add [A1c](#/info/hg-x-a1c) if none in the last 3 months: it sets severity. Ketones (blood beta-hydroxybutyrate preferred) and VBG for vomiting, abdominal pain, fast breathing, dehydration, SGLT2 use or suspected [insulin deficiency](#/info/hg-x-insulin-deficiency). Osmolality if HHS is possible. [2,3]' },
    { heading: 'DKA: all three', body: 'Diabetes history OR glucose 200 or more; beta-hydroxybutyrate 3 mmol/L or more OR urine ketones 2+ or more; pH under 7.3 OR bicarbonate under 18. A normal glucose does not rule out DKA. [2]' },
    { heading: 'HHS: all four', body: 'Glucose 600 or more; effective osmolality over 300 (or total over 320); beta-hydroxybutyrate under 3 mmol/L; pH 7.3 or higher AND bicarbonate 15 or higher. Mixed DKA/HHS is treated as a crisis. Effective osm = 2 x Na + glucose/18. [2]' },
    { heading: 'Targeted testing', body: 'Pregnancy test when relevant. ECG, troponin, CBC, UA, cultures, imaging follow symptoms. Do not call a UTI from glucose alone. Anemia, transfusion and CKD can make A1c misleading. [1,3]' },
    { heading: 'Plan-changing numbers', body: '**eGFR 45 or more:** all pills allowed. **30 to 44:** do not start metformin. **Under 30:** no metformin. **Under 15 or dialysis:** this consult stops; call nephrology/endocrine.\n**A1c under 8.5:** one drug. **8.5 to 10:** two drugs. **Over 10, or glucose 300 or more with symptoms, or weight loss:** basal insulin. [1]' },
  ]),

  'hg-meds': page('hg-meds', 'Pills: pick by kidney, heart, meals and money', [
    { heading: 'Pill picker grid', body: 'Green = good fit, yellow = use with care, red = avoid. Tap a drug name below for its dose card.', image: { src: 'images/hyperglycemia-ed/pill-picker.svg', alt: 'Grid of diabetes pills by condition. Rows: metformin, SGLT2 inhibitor, sitagliptin, glipizide or glimepiride, pioglitazone. Columns: eGFR under 45, heart failure, heart attack or stroke, fatty liver, age 65 or older, unreliable meals, heavy alcohol. Cells are green, yellow or red.', caption: 'Pill picker. Original diagram, myMedKitt. Sources: ADA 2026 and DailyMed labels (see citations).' } },
    { heading: '1. Metformin first (if eGFR allows)', body: '[Metformin ER](#/drug/hg-metformin-er/ED bridge care) 500 mg with dinner, +500 mg weekly, up to 2000 mg. Cheap, no lows by itself, decades of safety. Not if eGFR under 30. Do not start at 30 to 44. See [why metformin first](#/info/hg-x-why-metformin). [5,14]' },
    { heading: '2. Second drug: pick by the patient', body: '**Heart failure, CKD or prior heart attack/stroke:** [SGLT2 inhibitor](#/info/hg-x-sglt2) ([empagliflozin](#/drug/hg-empagliflozin/ED bridge care) or [dapagliflozin](#/drug/hg-dapagliflozin/ED bridge care)).\n**Reliable meals, needs cheap and strong:** [glipizide](#/drug/hg-glipizide/ED bridge care) or [glimepiride](#/drug/hg-glimepiride/ED bridge care) (see [sulfonylureas and lows](#/info/hg-x-sulfonylurea)).\n**Unreliable meals, age 65+, frail, drinks alcohol:** [sitagliptin](#/drug/hg-sitagliptin/ED bridge care) (dose by eGFR) or [pioglitazone](#/drug/hg-pioglitazone/ED bridge care).\n**Fatty liver, no heart failure:** pioglitazone. [1,6-9,15,16]' },
    { heading: 'Not from the ED', body: '[GLP-1 drugs](#/info/hg-x-glp1): strong benefit but costly and need a start visit. Refer, do not start from the ED.' },
    { heading: 'Already on pills and still high', body: 'First check the boring causes: did they take them, can they afford them, are they at max tolerated dose. Then add one drug from step 2, or go to basal insulin if A1c is over 10. Use [Plan Builder](#/calculator/hg-plan-builder).' },
    { heading: 'Kidney cutoffs at a glance', body: 'See [eGFR and diabetes drugs](#/info/hg-x-egfr) for the full ladder.' },
  ]),

  'hg-insulin': page('hg-insulin', 'Insulin: start, adjust and compare', [
    { heading: 'Tools', body: '[Plan Builder](#/calculator/hg-plan-builder) • [Start basal](#/calculator/hg-basal-start) • [Titrate basal](#/calculator/hg-basal-titrate) • [Meal + Correction](#/calculator/hg-meal-correction). These are for stable adult type 2 bridge care, not DKA/HHS, pregnancy, children, type 1 starts or pumps.' },
    { heading: 'Which insulin is which', body: '[Basal](#/info/hg-x-basal-meal) (background): [glargine](#/drug/hg-glargine/ED bridge care) once daily, or [NPH](#/drug/hg-nph/ED bridge care) at bedtime.\nMealtime: [lispro](#/drug/hg-lispro/ED bridge care) (rapid analog) or [regular](#/drug/hg-regular/ED bridge care).\nBoth in one: [70/30 premix](#/drug/hg-7030/ED bridge care).\nFull explainer: [analog vs human insulin](#/info/hg-x-analog-human) and the action-curve diagram.' },
    { heading: 'Start basal (new insulin)', body: '10 units once daily, or 0.1 to 0.2 units/kg. Patient adds 2 units every 3 days until fasting glucose is 80 to 130. Any glucose under 70: cut the dose 10 to 20%. If the dose passes 0.5 units/kg, stop raising it and look at meals ([overbasalization](#/info/hg-x-no-sliding-scale)). [1]' },
    { heading: 'Basal vs total daily dose', body: 'Never write a total daily dose (TDD) as basal. [TDD explained](#/info/hg-x-tdd).' },
    { heading: 'Fasting vs after-meal pattern', body: '[Which dose do I change?](#/info/hg-x-fasting-vs-post) Fasting high: basal. Fasting fine but after-meal high: add a mealtime dose, do not keep raising basal.' },
    { heading: 'Prandial add-on', body: 'Add 4 units or 10% of the basal dose at the biggest meal. Adjust 1 to 2 units or 10 to 15% twice weekly. Unexplained low: cut that dose 10 to 20%. If A1c is under 8% when adding mealtime insulin, consider cutting basal by 4 units or 10%. [1]' },
    { heading: 'Cheaper insulin and conversions', body: '[Costs and $35 programs](#/info/hg-access). Switching between analog and human insulin has no labeled unit-for-unit rule: [conversions](#/info/hg-x-conversions).' },
    { heading: 'Steroids, NPO, concentrated insulin', body: 'Steroid cases: [steroid hyperglycemia](#/info/hg-x-steroid). NPO, U-200/U-500, pumps and IV-to-SC transitions need an individualized plan: call pharmacy or endocrine. [3]' },
  ]),

  'hg-meals': page('hg-meals', 'Meals and glucose correction', [
    { heading: 'Two separate parts', body: 'Meal units = carb grams / grams-per-unit ([ICR](#/info/hg-x-icr-isf)). Correction units = (glucose minus target) / mg/dL-per-unit ([ISF](#/info/hg-x-icr-isf)), only when positive. [Open the guarded calculator](#/calculator/hg-meal-correction). Check active insulin and food availability first. [4]' },
    { heading: 'Counting carbs', body: 'Use total carbohydrate on the label times servings eaten, not just sugars. Count rice, bread, tortillas, fruit, milk and sweet drinks. Do teach-back with a real label.' },
    { heading: 'Worked example, not a default', body: 'Established 1:15 ratio and 60 g carbs = 4 units. Glucose 250, target 150, sensitivity 50 = 2 units. Total 6 units. Clinician checks the dose and device rounding. [4]' },
    { heading: 'Estimates need a clinician', body: '500 / TDD estimates grams per unit; 1800 / TDD estimates mg/dL per unit (rapid analogs). TDD means every basal and mealtime dose, not basal alone. Starting estimates only. [4]' },
    { heading: 'Stacking and poor intake', body: 'A rapid dose can still work after 4 hours. Unknown insulin-on-board, pumps, vomiting or AKI: no automatic correction. No meal means no mealtime dose. Treat lows first. [1,4,11]' },
    { heading: 'Why not a discharge sliding scale', body: '[Explained here](#/info/hg-x-no-sliding-scale).' },
  ]),

  'hg-access': page('hg-access', 'Uninsured: cost and access plan', [
    { heading: 'Ask first', body: 'What can the patient pay today? Which pharmacy is open and stocks it? Budget the meter, strips, lancets, syringes or pen needles and glucose tablets too. Food insecurity changes drug safety: no reliable meals means no sulfonylurea.' },
    { heading: 'Cash prices (confirm at the pharmacy)', body: '**Metformin, glipizide, glimepiride, pioglitazone:** generics, often on the Walmart $4 list (active 2026; not every strength). Sitagliptin and generic dapagliflozin prices unknown: ask. [24]\n**Insulin, $35 per 30 days (uninsured eligible):**\n• Lilly Insulin Value Program: Basaglar, Rezvoglar, Humalog, Humulin R/N/70-30. Card expires 12/31/2026. [20]\n• NovoCare MyInsulinRx: Novolin N/R/70-30, NovoLog, Tresiba, up to 3 vials or 2 pen packs. [21]\n• Sanofi Insulins Valyou: Lantus and other Sanofi insulins (medium confidence, confirm). [22]\n• ReliOn human insulin vials about $25 at Walmart (2026 price unverified). [24]\n**Excluded from the manufacturer programs:** Medicaid, Medicare, VA, TRICARE (these patients have coverage: use it).' },
    { heading: 'Pills with assistance programs', body: 'Jardiance: BI Cares (about 200% of the poverty level). Farxiga: AZ&Me closed new enrollment 2026-05-01, but generic dapagliflozin is FDA approved (April 2026): ask the pharmacy for a price. GLP-1 drugs: manufacturer patient-assistance (income based); not a same-day option. [24]' },
    { heading: 'Cheapest safe insulin', body: 'Best: a basal analog on a $35 program (fewer lows than NPH). Next: NPH vial plus syringes at bedtime (about $25 plus syringes). Both need a meter and strips. [Why](#/info/hg-x-analog-human). Do not switch an existing analog patient to human insulin unless the $35 programs fail: [conversions](#/info/hg-x-conversions).' },
    { heading: 'Named destination', body: '[HRSA Find a Health Center](https://findahealthcenter.hrsa.gov/) for sliding-fee primary care. Book while the patient is still in the ED. If medicine, teaching and a meter cannot be secured, use case management or observation, not a prescription the patient cannot fill. [3,13]' },
  ]),

  'hg-discharge': page('hg-discharge', 'Hyperglycemia: discharge bundle', [
    { heading: 'Before leaving', body: 'No crisis, stable vitals and mental status, drinking and eating, symptoms improving, acceptable eGFR and potassium, trigger addressed. No single discharge glucose number replaces these checks. [2,12]' },
    { heading: 'Prescription and supplies', body: 'Write drug, strength, dose in mg or units, route, meal timing, frequency, quantity. Say which old medicines stop. Meter, strips, lancets, syringes or pen needles, sharps container, glucose tablets. For insulin: written titration and low-glucose plan. Confirm the patient can actually obtain all of it today. [3]' },
    { heading: 'Follow-up', body: 'Within 1 to 2 weeks after any medicine change; sooner (a phone check in a few days) for a new insulin start or a vulnerable patient. A routine month-out referral is not a bridge. Named clinic and phone number on the paper. [3]' },
    { heading: 'Teach-back (have them show you)', body: 'Test a glucose. Draw up or dial the dose and inject. Say what to do at glucose under 70 (15 g sugar, recheck in 15 minutes). Say the sick-day rules: [sick-day page](#/info/hg-sickday). Say when to return. Language-appropriate written instructions.' },
    { heading: 'Targets to write down', body: 'Fasting 80 to 130 for most adults; looser for elderly, frail or low-awareness patients. [Targets](#/info/hg-x-targets).' },
  ], true),

  'hg-sickday': page('hg-sickday', 'Sick-day and hypoglycemia plan', [
    { heading: 'Low glucose (under 70)', body: 'Awake and can swallow: 15 g fast sugar (4 glucose tablets or 4 oz juice), recheck in 15 minutes, repeat if still low, then eat. Confused, seizing or cannot swallow: 911. [Hypoglycemia consult](#/tree/hypoglycemia). Call the clinic before the next dose. [4]' },
    { heading: 'Not eating, vomiting, or sick', body: 'Never stop basal insulin on your own without a call, but cut it only as told. Skip mealtime insulin and glipizide or glimepiride when not eating. Hold metformin if vomiting, dehydrated or very sick. Hold [SGLT2 inhibitors](#/info/hg-x-sglt2) when sick, vomiting or not eating (ketoacidosis risk). [1,5,6,9]' },
    { heading: 'Return now', body: 'Vomiting or cannot keep fluids down, belly pain, deep or fast breathing, confusion, marked weakness, repeated lows, or glucose too high to read. DKA can occur with a normal glucose on an SGLT2 inhibitor. [2]' },
  ], true),

  'hyperglycemia-ed-stop': page('hyperglycemia-ed-stop', 'Hyperglycemia: do NOT', [
    { heading: 'Do NOT call it type 2 without thinking', body: 'Thin, young, rapid weight loss, ketones, autoimmune history: [insulin deficiency](#/info/hg-x-insulin-deficiency). Do not discharge on pills alone. Glucose alone does not rule out DKA. [Crisis check](#/tree/hyperglycemia-ed/node/hg-crisis). [2]' },
    { heading: 'Do NOT discharge on a sliding scale', body: 'It chases yesterday\'s number and stacks doses. [Why](#/info/hg-x-no-sliding-scale). [1,12]' },
    { heading: 'Do NOT start metformin at eGFR under 45', body: 'Contraindicated under 30. Existing users: max 1000 mg/day under 45. Hold in AKI, dehydration, hypoxia. [Kidney ladder](#/info/hg-x-egfr). [5]' },
    { heading: 'Do NOT give a sulfonylurea to someone who skips meals or drinks heavily', body: 'Prolonged lows. Never glyburide here. [Sulfonylureas and lows](#/info/hg-x-sulfonylurea). [6,15]' },
    { heading: 'Do NOT start an SGLT2 inhibitor in a sick or ketotic patient', body: 'Euglycemic DKA. [SGLT2](#/info/hg-x-sglt2). [9,16]' },
    { heading: 'Do NOT write a total daily dose as basal', body: '[TDD explained](#/info/hg-x-tdd). [1]' },
    { heading: 'Do NOT guess an insulin conversion', body: 'Analog to NPH, lispro to regular and 70/30 have no labeled unit-for-unit rule. [Conversions](#/info/hg-x-conversions). [10,18,19]' },
    { heading: 'Do NOT send insulin home without a meter, supplies and teach-back', body: '[Discharge bundle](#/info/hg-discharge). [3]' },
    { heading: 'Do NOT start a GLP-1 drug from the ED', body: '[Why](#/info/hg-x-glp1).' },
  ]),

  'hg-x-terms': page('hg-x-terms', 'Terms', [
    { heading: 'Insulin terms', body: '[Basal, mealtime (prandial), correction](#/info/hg-x-basal-meal)\n[Analog vs human insulin](#/info/hg-x-analog-human)\n[NPH, regular, 70/30 premix](#/info/hg-x-nph-reg-premix)\n[TDD, total daily dose](#/info/hg-x-tdd)\n[ICR and ISF (carb ratio, correction factor)](#/info/hg-x-icr-isf)\n[Switching insulins: conversions](#/info/hg-x-conversions)\n[Why no discharge sliding scale; overbasalization](#/info/hg-x-no-sliding-scale)\n[Fasting vs after-meal pattern](#/info/hg-x-fasting-vs-post)' },
    { heading: 'Lab and goal terms', body: '[A1c](#/info/hg-x-a1c)\n[eGFR and diabetes drugs](#/info/hg-x-egfr)\n[Glucose targets](#/info/hg-x-targets)\n[Spotting insulin deficiency (type 1, LADA, ketosis-prone)](#/info/hg-x-insulin-deficiency)' },
    { heading: 'Drug terms', body: '[Why metformin first](#/info/hg-x-why-metformin)\n[Sulfonylureas and lows](#/info/hg-x-sulfonylurea)\n[SGLT2 inhibitors](#/info/hg-x-sglt2)\n[GLP-1 drugs](#/info/hg-x-glp1)\n[Steroid hyperglycemia](#/info/hg-x-steroid)\n[Why insulin first when severe](#/info/hg-x-why-insulin-first)' },
  ], false, 'Clinical reference index'),

  'hg-x-basal-meal': explain('hg-x-basal-meal', 'Basal, mealtime (prandial) and correction insulin',
    '**Basal** insulin is the slow, steady background dose that suppresses hepatic glucose output between meals and overnight. **Mealtime (prandial, bolus)** insulin is a short burst taken with food to cover ingested carbohydrate. **Correction** insulin is a small extra mealtime dose to bring a high number down.',
    'A new type 2 patient who needs insulin almost always needs only basal insulin, taken once daily. Starting mealtime insulin from the ED means more injections, more lows and more teaching. Add it later if after-meal numbers stay high while fasting is fine.',
    'Basal start: 10 units once daily or 0.1 to 0.2 units/kg. Mealtime add-on: 4 units or 10% of the basal dose at the biggest meal. [1] See [fasting vs after-meal](#/info/hg-x-fasting-vs-post).'),

  'hg-x-analog-human': explain('hg-x-analog-human', 'Analog vs human insulin',
    '**Human insulin** (NPH, regular) is the older, cheaper insulin, with the native insulin structure. **Analog insulin** (glargine, detemir, degludec, lispro, aspart) has been modified to act more predictably (basal analogs) or faster (rapid analogs).',
    'Cheaper human insulin works, but it peaks, so it can cause overnight lows, and regular needs to be timed about 30 minutes before a meal. That requires more patient education and fixed meal timing. In 2026 the $35 manufacturer programs can make analogs as cheap as human insulin for uninsured patients, so check those first. [20,21]',
    'NPH: effect peaks around 4 to 12 hours (label: median maximum effect 6.5 h, range 2.8 to 13 h). Regular: inject about 30 minutes before meals. 70/30: about 30 to 45 minutes before a meal. Glargine: flat, once daily. [10,17-19]',
    [{ heading: 'Action-curve diagram', body: 'Glargine is flat. NPH has a peak. Regular peaks sooner and fades. Rapid analog is the fastest and shortest. Shapes are schematic, not exact hours for an individual patient.', image: { src: 'images/hyperglycemia-ed/insulin-curves.svg', alt: 'Schematic insulin action curves over 24 hours: glargine is a flat line, NPH rises to a peak at about 4 to 12 hours then falls, regular insulin peaks earlier and fades, rapid analog peaks fastest and shortest.', caption: 'Schematic insulin action curves. Original diagram, myMedKitt. Labels from FDA/DailyMed insulin labels.' } },
     { heading: 'Why bedtime NPH', body: 'Bedtime NPH peaks while the liver is releasing the most sugar overnight, so it covers the morning high. The risk is the same peak causing a 3 AM low if the dose is too big. That is why the start dose is small and titration is slow. [1,17]' }]),

  'hg-x-nph-reg-premix': explain('hg-x-nph-reg-premix', 'NPH, regular and 70/30 premix',
    '**NPH** is a cloudy human basal insulin. **Regular** is a clear human mealtime insulin. **70/30** is a cloudy mix of 70% NPH and 30% regular in one vial or pen.',
    'For an uninsured patient these are the fallback when an analog program is not possible. NPH at bedtime is a workable basal. 70/30 means fewer injections but locks the patient into regular meals and has a higher low risk with skipped meals. Doses are never guessed from an analog dose: [conversions](#/info/hg-x-conversions).',
    'NPH: peak 4 to 12 h. Regular: 30 minutes before meals. 70/30: 30 to 45 minutes before a meal. Cloudy insulins (NPH, 70/30) must be rolled gently to mix before each dose. [17-19]'),

  'hg-x-tdd': explain('hg-x-tdd', 'TDD (total daily dose)',
    'The sum of all insulin a patient takes in 24 hours: basal plus every mealtime dose plus corrections.',
    'Rules of thumb for ratios use TDD, so a basal-only dose written into the formula gives wrong ratios and dangerous mealtime doses. A basal dose is not TDD. Never write a TDD as a once-daily basal dose either: that is a large overdose.',
    'Only use [ICR/ISF](#/info/hg-x-icr-isf) estimates when TDD is known and reliable. A new basal-only start has no TDD to use. [4]'),

  'hg-x-icr-isf': explain('hg-x-icr-isf', 'ICR and ISF (carb ratio and correction factor)',
    '**ICR** (insulin-to-carb ratio): grams of carbs covered by 1 unit. **ISF** (insulin sensitivity factor, correction factor): how many mg/dL 1 unit drops the glucose.',
    'They differ for every patient. Never invent them in the ED. If the patient already has written ratios, the Meal + Correction calculator can use them. Otherwise start fixed doses of mealtime insulin, not ratios.',
    'Common estimating rules: 500 / TDD = grams per unit; 1800 / TDD = mg/dL per unit (rapid analogs). Starting estimates only. [4]'),

  'hg-x-a1c': explain('hg-x-a1c', 'A1c',
    'Percent of hemoglobin that is glycated, reflecting average glucose over the prior 2 to 3 months.',
    'A1c sets how aggressive treatment is: under 8.5 one drug, 8.5 to 10 two drugs, over 10 basal insulin. Diagnosis cutoff is 6.5%. It misleads after a recent transfusion, with anemia, hemoglobinopathy, CKD or recent blood loss: use glucose and symptoms instead. If no A1c is available, plan from the ED glucose and symptoms, and get one at follow-up.',
    'Diagnosis 6.5% or more. Typical goal under 7 to 8 depending on the patient. Insulin at diagnosis if A1c over 10% (ADA Rec 9.20). [1]'),

  'hg-x-insulin-deficiency': explain('hg-x-insulin-deficiency', 'Spotting insulin deficiency (type 1, LADA, ketosis-prone type 2)',
    'Little or no endogenous insulin production. That is type 1, slow-onset type 1 in adults (LADA), or ketosis-prone type 2. These patients need insulin and can slip into DKA.',
    'Pills only, in someone with insulin deficiency, can end in DKA a few days later. Clues: age under 40 or thin, weight loss over weeks, ketones, heavy thirst, autoimmune disease, family history of type 1, very high glucose with no obesity. Any of these: this consult is not the right branch. Use the specialist route and DKA pathway. Body type and adult age do not exclude type 1.',
    'Ketones: beta-hydroxybutyrate 3 mmol/L or more or urine 2+ means treat as a crisis. [2] See [crisis check](#/tree/hyperglycemia-ed/node/hg-crisis).'),

  'hg-x-egfr': page('hg-x-egfr', 'eGFR and diabetes drugs', [
    { heading: 'Definition', body: 'eGFR estimates glomerular filtration. Renally cleared diabetes drugs accumulate, and some lose glucose-lowering efficacy, as it falls.' },
    { heading: 'ED relevance', body: 'eGFR determines which oral agents are appropriate today. Check it before writing, not after. AKI or dehydration: do not start metformin or an SGLT2 inhibitor; recheck once recovered.' },
    { heading: 'Ladder', body: '**eGFR 60 or more:** everything allowed.\n**45 to 59:** all allowed; sitagliptin 100 mg.\n**30 to 44:** do NOT start metformin; existing metformin max 1000 mg/day. SGLT2: little sugar-lowering but start for heart/kidney benefit. Sitagliptin 50 mg. Sulfonylurea at lowest dose.\n**20 to 29:** no metformin. SGLT2 can be started for kidney/heart benefit (ADA 2026: eGFR 20 or more; dapagliflozin label initiation: 25 or more). Sitagliptin 25 mg. Insulin needs fall: start low.\n**Under 15 or dialysis:** this consult withholds a plan; call nephrology/endocrine. [1,5,8,16]', image: { src: 'images/hyperglycemia-ed/egfr-ladder.svg', alt: 'Ladder graphic of eGFR bands from 60 and above down to under 15, showing for each band whether metformin, SGLT2 inhibitor, sitagliptin dose and sulfonylurea are allowed.', caption: 'eGFR ladder. Original diagram, myMedKitt. Sources: ADA 2026, DailyMed labels.' } },
  ], false, 'Concept review'),

  'hg-x-sulfonylurea': explain('hg-x-sulfonylurea', 'Sulfonylureas (glipizide, glimepiride) and lows',
    'Insulin secretagogues that stimulate pancreatic insulin release independent of glucose and food intake. Glipizide and glimepiride are the preferred ones; glyburide is avoided.',
    'Cheap and strong, which is why they are used for uninsured patients, but they cause lows. Use only when meals are reliable. Avoid or lower the dose with age 65+, frailty, CKD, liver disease or heavy alcohol. Stop or reassess when starting insulin. Skip the pill on a day with no meal. Glyburide has long-acting active metabolites: do not use it here.',
    'Glipizide: start 5 mg before breakfast (2.5 mg if older or liver disease); max 15 mg once daily, 40 mg total. Glimepiride: start 1 to 2 mg with breakfast (1 mg if elderly or renal impairment); max 8 mg. [6,15]'),

  'hg-x-sglt2': explain('hg-x-sglt2', 'SGLT2 inhibitors (empagliflozin, dapagliflozin)',
    'Inhibit renal sodium-glucose cotransporter 2, producing glycosuria. They also have cardiac and renal protective effects.',
    'Best add-on for heart failure, CKD, or prior heart attack/stroke. Risks: euglycemic DKA (even with a normal glucose), genital yeast infections, volume depletion. Do not start in a sick, vomiting, dehydrated or ketotic patient, or when insulin deficiency is possible. Hold the day you are sick or not eating. Glucose-lowering is weak below eGFR 45, but the heart/kidney benefit remains.',
    'Empagliflozin 10 mg daily. Dapagliflozin 5 mg for glycemic control (may go to 10 mg); 10 mg for heart failure or CKD. Start for heart/kidney benefit at eGFR 20 or more (ADA 2026). [1,9,16]'),

  'hg-x-glp1': explain('hg-x-glp1', 'GLP-1 drugs (semaglutide, dulaglutide, tirzepatide)',
    'Weekly or daily injections (and one pill) that delay gastric emptying, reduce appetite and enhance glucose-dependent insulin secretion.',
    'Big benefit for weight, heart and kidney. But they cause nausea and vomiting (bad in a dehydrated ED patient), are expensive, and need a start visit with teaching. Do not start from the ED. Refer, and point uninsured patients to manufacturer patient-assistance programs (income based). Do not combine with sitagliptin.',
    'No ED dose. Start at a dedicated visit. [1,24]'),

  'hg-x-no-sliding-scale': explain('hg-x-no-sliding-scale', 'Why no discharge sliding scale; overbasalization',
    'A sliding scale is "take X units if the number is Y" with no link to meals. **Overbasalization** is serial basal escalation to chase after-meal highs; the sign is a basal dose over about 0.5 units/kg.',
    'A discharge sliding scale chases yesterday\'s number, stacks doses and causes lows. One basal dose that the patient titrates by a simple rule is safer. If basal is over 0.5 units/kg and numbers are still high, stop raising it: look at after-meal highs, add a mealtime dose or a GLP-1 referral.',
    'Titrate +2 units every 3 days to fasting 80 to 130. Low under 70: cut 10 to 20%. Stop raising above 0.5 units/kg. [1,3]'),

  'hg-x-fasting-vs-post': explain('hg-x-fasting-vs-post', 'Fasting vs after-meal pattern: which dose do I change?',
    'Fasting (morning, before eating) glucose reflects basal insulin. Readings 1 to 2 hours after a meal reflect the mealtime dose and the food eaten.',
    'If fasting is high: raise basal. If fasting is at goal but after-meal is high: do not raise basal; add or adjust the mealtime dose at the biggest meal, or change food. A low in the morning or overnight points to basal; a low after a meal points to the mealtime dose.',
    'Fasting goal 80 to 130. Mealtime add-on 4 units or 10% of basal. Cut the responsible dose 10 to 20% for a low. [1]'),

  'hg-x-targets': explain('hg-x-targets', 'Glucose targets',
    'The glucose and A1c goals set for the patient.',
    'Aim looser for elderly, frail patients and anyone with lows or poor awareness; tighter when young and healthy. Do not use a single discharge glucose to decide disposition.',
    'Fasting 80 to 130 mg/dL for most adults (ADA). Any glucose under 70 is a low. A1c goal usually under 7 to 8%, individualized. [1]'),

  'hg-x-why-metformin': explain('hg-x-why-metformin', 'Why metformin first',
    'Metformin reduces hepatic glucose output and improves insulin sensitivity.',
    'It is cheap (Walmart $4 list), does not cause lows by itself, is weight neutral and has decades of safety data. Most patients with eGFR 45 or more should start here unless insulin is needed. Take it with food and titrate slowly; ER is gentler on the stomach.',
    'Do not start if eGFR under 45; contraindicated under 30; existing users max 1000 mg/day under 45. Hold in AKI, dehydration, hypoxia, decompensated liver disease or heavy alcohol use. ER start 500 mg with dinner, +500 mg weekly, max 2000 mg. [1,5,14]'),

  'hg-x-why-insulin-first': explain('hg-x-why-insulin-first', 'Why basal insulin first when it is severe',
    'When A1c is over 10%, glucose is 300 or more with symptoms, or the patient is losing weight, the patient is catabolic and oral agents alone are too slow or too weak.',
    'Insulin works at once and at any dose, and "glucose toxicity" improves quickly once glucose falls, so many patients can later drop insulin. This is ADA 2026 Recommendation 9.20. Pair with metformin if eGFR allows. Delay SGLT2 inhibitors in this setting (ketoacidosis risk).',
    'Start 10 units or 0.1 to 0.2 units/kg once daily. Plan follow-up within about a week. [1]'),

  'hg-x-steroid': explain('hg-x-steroid', 'Steroid-induced hyperglycemia',
    'Steroids (prednisone, dexamethasone) raise glucose mostly in the afternoon and evening for morning-dosed steroids, because they block insulin action and raise liver sugar output.',
    'Evidence is thin and guidelines disagree. This app uses the conservative weight-based NPH dosing from a randomized trial: NPH given with the morning steroid, 0.15 units/kg for prednisone 10 to 40 mg, 0.3 units/kg for more than 40 mg. NPH peaks several hours after the morning dose, matching the steroid peak. Taper the NPH as the steroid is tapered and stop it with the steroid. Short burst with a normal A1c: often no treatment, check glucose and return for symptoms. Other steroids or split dosing: ask pharmacy/endocrine. This rule is lower confidence: it was tested mostly inpatient.',
    'Prednisone 10 to 40 mg: 0.15 units/kg NPH. More than 40 mg: 0.3 units/kg NPH. Give with the steroid. [3,17,23]'),

  'hg-x-conversions': page('hg-x-conversions', 'Switching insulins: what is and is not sourced', [
    { heading: 'Definition', body: 'Moving a patient from one insulin to another (analog to human, rapid to regular, basal-bolus to 70/30) because of cost or supply.' },
    { heading: 'ED relevance', body: 'First try to keep the same insulin and make it cheaper: the $35 programs cover most analogs. [Costs](#/info/hg-access). Only switch if that fails. Switching is a common cause of lows and highs.' },
    { heading: 'What the labels give us', body: '**Twice-daily NPH to once-daily glargine:** start at 80% of the total NPH dose (Lantus label). Once-daily NPH to glargine: same dose. [10]\n**Regular insulin:** inject about 30 minutes before meals. [18]\n**70/30:** inject about 30 to 45 minutes before a meal. [19]\n**ADA:** bedtime NPH can be a basal start (10 units or 0.1 to 0.2 units/kg), and can be changed to twice-daily NPH based on need. [1]' },
    { heading: 'What is NOT sourced (ask pharmacy or endocrine)', body: 'Glargine to NPH dose and split. Lispro to regular unit conversion. A 70/30 starting dose from an analog regimen. A restart percentage after a missed-dose gap. We do not publish numbers for these. Call the pharmacist or endocrine on call, give them the full current regimen, and have the patient start low with close glucose checks. Expect more lows with NPH, regular and 70/30.' },
  ], false, 'Concept review'),
};
