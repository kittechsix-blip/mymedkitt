// MedKitt — Thyroid Disorders (Decompensated Hypothyroidism & Thyroid Storm)
// Initial Assessment → Hypo Evaluation → Hypo Monitoring → Storm Treatment → Storm Special Situations → Subclinical
// 6 modules: Initial Assessment → Decompensated Hypothyroidism Evaluation → Decompensated Hypothyroidism Monitoring → Thyroid Storm Treatment → Thyroid Storm Special Situations → Subclinical Findings
// 33 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const THYROID_CRITICAL_ACTIONS = [
  { text: 'Levothyroxine 200-400 mcg IV load for decompensated hypothyroidism - do NOT delay for lab confirmation', nodeId: 'thyroid-hypo-tx' },
  { text: 'Hydrocortisone 100 mg IV q8h BEFORE levothyroxine (prevent adrenal crisis)', nodeId: 'thyroid-hypo-steroids' },
  { text: 'Propylthiouracil 600-1000 mg loading, then 200-250 mg q4h for thyroid storm', nodeId: 'thyroid-storm-ptu' },
  { text: 'Propranolol 60-80 mg PO q4h (or 1-2 mg IV q10-15 min) to block peripheral conversion', nodeId: 'thyroid-storm-betablock' },
  { text: 'Iodine therapy MUST wait 1 hour after PTU/methimazole - given too early worsens storm', nodeId: 'thyroid-storm-iodine' },
  { text: 'Aggressive cooling for thyroid storm hyperthermia - acetaminophen preferred (NOT aspirin)', nodeId: 'thyroid-storm-cooling' },
  { text: 'Decompensated hypothyroidism mortality 25-50% - treat empirically if suspected', nodeId: 'thyroid-hypo-confirm' },
  { text: 'Thyroid storm mortality 8-25% despite treatment - ICU admission required', nodeId: 'thyroid-storm-confirm' },
];

export const THYROID_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'thyroid-start',
    type: 'question',
    module: 1,
    title: 'Thyroid Disorders — Presentation',
    body: '[Thyroid Disorders Steps Summary](#/info/thyroid-summary)\n\n**Thyroid emergencies are rare but lethal.** Decompensated hypothyroidism mortality: 25-50%. Thyroid storm mortality: 8-25%. Both are **clinical diagnoses** — lab values reflect chronic state, not acute severity. Do NOT delay treatment for lab confirmation. [1][14]\n\nSepsis is the most common precipitant for BOTH conditions and can occur concurrently. Always consider endocrine emergency in the undifferentiated critically ill patient, especially if elderly, known thyroid disease, or on thyroid-altering medications (amiodarone, lithium, checkpoint inhibitors). [6][14]',
    images: [{ src: 'images/thyroid/goiter.png', alt: 'Clinical photograph of a woman with visible anterior neck enlargement from goiter with annotated thyroid diagram', caption: 'Goiter — visible thyroid enlargement; may precipitate thyroid storm in hyperthyroid patients with physiologic stress. (CC BY-SA 4.0)' }],
    citation: [1, 6, 14],
    calculatorLinks: [
      { id: 'burch-wartofsky', label: 'Burch-Wartofsky Score' },
    ],
    options: [
      {
        label: 'Suspected Decompensated Hypothyroidism',
        description: 'AMS, hypothermia, bradycardia, hemodynamic instability',
        next: 'thyroid-hypo-confirm',
        urgency: 'critical',
      },
      {
        label: 'Suspected Thyroid Storm / Thyrotoxicosis',
        description: 'Fever, tachycardia, agitation, known hyperthyroid or new presentation',
        next: 'thyroid-storm-confirm',
        urgency: 'critical',
      },
      {
        label: 'Incidental Subclinical Finding',
        description: 'Abnormal TSH on routine labs, asymptomatic or mildly symptomatic',
        next: 'thyroid-subclinical',
      },
    ],

    summary: 'Thyroid emergencies are clinical diagnoses — do NOT delay treatment for labs; sepsis is #1 precipitant for both',
  },

  {
    id: 'thyroid-hypo-confirm',
    type: 'question',
    module: 1,
    title: 'Confirm Decompensated Hypothyroidism',
    body: '**"Myxedema coma" is a misnomer** — most patients are NOT comatose, and most do not have myxedema. Better termed **decompensated hypothyroidism**: hypothyroidism causing organ failure, with the brain typically failing first. [3][14]\n\n**Core features (IBCC):**\n• **Altered mental status** (~90%) — usually hypoactive delirium, rarely frank coma\n• **Hypothermia** (70-90%) — may be severe; concurrent infection can mask this\n• **Bradycardia** (~70%)\n\n**Additional features:** hypoventilation/CO₂ narcosis, hyponatremia (~50%), hypoglycemia, non-pitting edema (face/hands/ankles), delayed DTR relaxation (Woltman sign), pericardial effusion, constipation/ileus, macroglossia\n\n**Common precipitants:**\n• Levothyroxine noncompliance (#1)\n• Infection/sepsis\n• Cold exposure (90% present in winter)\n• Medications: amiodarone, lithium, checkpoint inhibitors, sedatives, opioids\n• Surgery, trauma, MI, stroke, GI bleed\n\n[Precipitants & Differential Diagnosis](#/info/thyroid-precipitants)',
    citation: [3, 6, 8, 14],
    options: [
      {
        label: 'Clinical Features Present — Treat Emergently',
        next: 'thyroid-hypo-airway',
        urgency: 'critical',
      },
      {
        label: 'Mild / Compensated Hypothyroidism',
        next: 'thyroid-subclinical',
      },
    ],

    summary: 'Decompensated hypothyroidism: AMS (~90%), hypothermia (70-90%), bradycardia (~70%) — 25-50% mortality',
  },

  {
    id: 'thyroid-storm-confirm',
    type: 'question',
    module: 1,
    title: 'Confirm Thyroid Storm',
    body: '**Thyroid storm = thyrotoxicosis causing end-organ dysfunction.** No validated diagnostic test — diagnosis is clinical. The Burch-Wartofsky Score helps frame the assessment but is NOT diagnostic. [4][9]\n\n**IBCC cognitive triggers to consider thyroid storm:**\n1. Known hyperthyroid + any acute deterioration\n2. New-onset AFib and/or dilated cardiomyopathy\n3. New delirium/psychosis + fever + tachycardia\n4. Hyperthermia (temp >40°C / 104°F)\n5. Septic-appearing patient without infection source\n\n**Common precipitants:**\n• Antithyroid medication noncompliance\n• Infection (#1 in most series)\n• Acute iodine load (contrast, amiodarone)\n• Surgery, trauma\n• DKA, pregnancy/delivery, PE, MI\n• No identifiable trigger in ~30% [2]\n\n**Underlying etiologies:** Graves disease (~30%), amiodarone-induced thyroiditis (~30%), toxic multinodular goiter, toxic adenoma [2]\n\n[Precipitants & Differential Diagnosis](#/info/thyroid-precipitants)',
    citation: [2, 4, 9, 14],
    calculatorLinks: [
      { id: 'burch-wartofsky', label: 'Burch-Wartofsky Score' },
    ],
    options: [
      {
        label: 'Thyroid Storm (BWS ≥45 or High Clinical Suspicion)',
        next: 'thyroid-storm-eval',
        urgency: 'critical',
      },
      {
        label: 'Impending Storm (BWS 25-44)',
        description: 'Treat aggressively — same protocol as confirmed storm',
        next: 'thyroid-storm-eval',
        urgency: 'urgent',
      },
      {
        label: 'Mild Thyrotoxicosis — Not Storm',
        next: 'thyroid-tox-mild',
      },
    ],

    summary: 'Thyroid storm = thyrotoxicosis + end-organ dysfunction — Burch-Wartofsky helps frame but is NOT diagnostic',
  },

  {
    id: 'thyroid-tox-mild',
    type: 'result',
    module: 1,
    title: 'Mild Thyrotoxicosis — Outpatient Management',
    body: 'No features of thyroid storm or end-organ dysfunction.\n\n**ED Workup:** TSH, free T4, free T3\n\n**Symptomatic relief:** [Propranolol](#/drug/propranolol/thyrotoxicosis) 10-40 mg PO TID for palpitations, tremor, anxiety (if no contraindications)\n\n**Disposition:**\n• Urgent endocrinology referral (1-2 weeks)\n• Return precautions: fever >38.5°C, confusion, persistent vomiting, palpitations at rest, inability to take fluids',
    recommendation: 'Endocrinology referral within 1-2 weeks. Return for worsening symptoms.',
    citation: [4, 8],
    treatment: {
      firstLine: {
        drug: 'Propranolol',
        dose: '10-40 mg',
        route: 'PO',
        frequency: 'TID',
        duration: 'Until endocrinology follow-up',
        notes: 'For symptomatic relief of palpitations, tremor, anxiety. Contraindicated in asthma, decompensated HF.',
      },
      monitoring: 'Heart rate, blood pressure. Return precautions for worsening symptoms.',
    },
  },

  // =====================================================================
  // MODULE 2: DECOMPENSATED HYPOTHYROIDISM — EVALUATION
  // =====================================================================

  {
    id: 'thyroid-hypo-airway',
    type: 'info',
    module: 2,
    title: 'Airway Assessment & Supportive Care',
    body: '**Airway is the first priority — these patients have a physiologically AND anatomically difficult airway.**\n\n**Anatomic challenges:** macroglossia, posterior pharyngeal myxedema, goiter (tracheal compression, laryngeal deviation), vocal cord edema, reduced neck mobility\n\n**Physiologic challenges:** severe respiratory muscle weakness, depressed central ventilatory drive (CO₂ narcosis), decreased lung elasticity, pleural effusions\n\n**Video laryngoscopy as first-line.** Fiberoptic backup. Surgical airway technically challenging with goiter. If stable + predicted difficult airway → consider awake intubation with ENT/anesthesia standby. [14]\n\n[Airway Management in Thyroid Disease](#/info/thyroid-airway)\n\n**Supportive care (SIMULTANEOUS with hormone therapy):**\n• **Passive rewarming ONLY** — blankets, warm room, warm IV fluids. **NO active rewarming** (heating blankets, forced air) — causes peripheral vasodilation → cardiovascular collapse [3][14]\n• NS bolus for hypotension — careful not to overresuscitate (impaired free water excretion)\n• [Dextrose](#/drug/dextrose/hypoglycemia) for hypoglycemia — follow glucose q2-4h\n• **Avoid sedatives, opioids, antipsychotics** — extreme sensitivity, may precipitate further decompensation [3]',
    citation: [3, 14],
    next: 'thyroid-hypo-steroids',

    summary: 'Difficult airway (macroglossia, goiter); passive rewarming ONLY — active rewarming causes cardiovascular collapse',
    safetyLevel: 'critical',
  },

  {
    id: 'thyroid-hypo-steroids',
    type: 'info',
    module: 2,
    title: 'Step 1 — Stress-Dose Steroids FIRST',
    body: '**CRITICAL SEQUENCE: Give steroids BEFORE thyroid hormone replacement.**\n\nConcomitant adrenal insufficiency is present in ~5-10% of patients (autoimmune polyglandular syndrome or pituitary disease). Thyroid hormone accelerates cortisol metabolism — giving T4 without cortisol can **precipitate adrenal crisis**. [1][5][14]\n\n**Adults:**\n• [Hydrocortisone](#/drug/hydrocortisone/decompensated hypothyroidism) 100 mg IV bolus, then 50 mg IV q8h\n• IBCC protocol: 50 mg IV q6h\n\n**If hydrocortisone unavailable:**\n• [Methylprednisolone](#/drug/methylprednisolone/thyroid crisis) 40 mg IV\n\n**Draw random cortisol BEFORE steroids if practical — but do NOT delay treatment.** A cortisol <18 μg/dL during acute stress is suggestive of AI. [5]\n\n**Taper:** Wean steroids over 2-3 days once hemodynamically stable and cortisol results available. If cortisol was adequate (>18 μg/dL), steroids may be discontinued.',
    citation: [1, 3, 5, 14],
    next: 'thyroid-hypo-t4',
    treatment: {
      firstLine: {
        drug: 'Hydrocortisone',
        dose: '100 mg IV load, then 50 mg',
        route: 'IV',
        frequency: 'q8h (or q6h per IBCC)',
        duration: 'Taper over 2-3 days once stable',
        notes: 'Give BEFORE thyroid hormone. Draw random cortisol first if practical.',
      },
      alternative: {
        drug: 'Methylprednisolone',
        dose: '40 mg',
        route: 'IV',
        frequency: 'Once',
        duration: 'Bridge if hydrocortisone unavailable',
        notes: 'Use if hydrocortisone not available.',
      },
      monitoring: 'Cortisol level, hemodynamics, glucose. Taper when cortisol >18 μg/dL confirmed.',
    },
    summary: 'Give steroids BEFORE T4 — concomitant adrenal insufficiency in 5-10%; T4 without cortisol can precipitate adrenal crisis',
    safetyLevel: 'critical',
  },

  {
    id: 'thyroid-hypo-t4',
    type: 'info',
    module: 2,
    title: 'Step 2 — IV Levothyroxine (T4)',
    body: '**[Levothyroxine](#/drug/levothyroxine/decompensated hypothyroidism) — mainstay of thyroid replacement:**\n\n**Loading dose:** 200-400 mcg IV\n• IBCC: 200 mcg for most patients (lower end preferred)\n• ATA guidelines: 200-400 mcg based on severity, age, body weight, cardiac history [5]\n• Use lower end (200 mcg) for: elderly, low body weight, coronary artery disease, arrhythmias\n\n**Maintenance:** 50-100 mcg IV daily (or 1.2 mcg/kg/day IV) [5]\n\n**Why IV?** GI absorption is unreliable in decompensated hypothyroidism (ileus, mucosal edema). Oral levothyroxine should NOT be used for initial treatment. Transition to PO (1.6 mcg/kg/day) once GI function restored. [3][5]\n\n**Safety note:** IV levothyroxine is safe to give empirically. T4 is the inactive pro-hormone — the normal circulating pool is ~1,000 mcg, so even if the diagnosis is wrong, 200-400 mcg won\'t cause harm. [3]',
    citation: [3, 5, 14],
    next: 'thyroid-hypo-t3',

    summary: 'Levothyroxine 200-400 mcg IV load — oral unreliable in decompensated state; safe to give empirically',
    treatment: {
      firstLine: {
        drug: 'Levothyroxine',
        dose: '200-400 mcg IV load, then 50-100 mcg/day (or 1.2 mcg/kg/day)',
        route: 'IV',
        frequency: 'Daily',
        duration: 'Until GI function restored, then transition to PO',
        notes: 'Use lower end (200 mcg) for elderly, low body weight, CAD, arrhythmias. Transition to PO 1.6 mcg/kg/day when tolerating oral intake.',
      },
      monitoring: 'TSH + fT4 every 1-2 days. TSH falls ~50%/week. fT4 should normalize within 4 days.',
    },
  },

  {
    id: 'thyroid-hypo-t3',
    type: 'question',
    module: 2,
    title: 'Step 3 — Consider IV Liothyronine (T3)',
    body: '**T3 is the biologically active form — faster onset but higher risk.**\n\nRationale: In decompensated hypothyroidism, peripheral T4→T3 conversion may be impaired. T3 bypasses this step. However, older studies associated high-dose T3 (>75 mcg/day) with increased mortality. [5]\n\n**IBCC recommendation:** Reserve T3 for critically ill patients requiring hemodynamic or ventilatory support. Not mandatory. [3]\n\n**If adding T3:**\n• [Liothyronine](#/drug/liothyronine/decompensated hypothyroidism) 5-20 mcg IV loading dose\n• Then 2.5-10 mcg IV q8h\n• Use lower end for elderly, cardiac disease, smaller patients [5]\n\n**When to stop T3:**\n• Clinical improvement (improved consciousness, hemodynamics)\n• T3 levels become elevated on monitoring\n• After 48 hours regardless (by then, T4→T3 conversion should resume) [3]',
    citation: [3, 5],
    options: [
      {
        label: 'Adding T3 — Critically Ill / No T4 Response',
        next: 'thyroid-hypo-labs',
      },
      {
        label: 'T4 Alone — Standard Approach',
        next: 'thyroid-hypo-labs',
      },
    ],
    treatment: {
      firstLine: {
        drug: 'Liothyronine (T3)',
        dose: '5-20 mcg IV load, then 2.5-10 mcg',
        route: 'IV',
        frequency: 'q8h',
        duration: 'Stop at 48h or with clinical improvement',
        notes: 'Reserve for critically ill requiring hemodynamic/ventilatory support. Use lower end for elderly, cardiac disease.',
      },
      monitoring: 'T3 levels, clinical response (consciousness, hemodynamics). Stop if T3 elevated or after 48h.',
    },

    summary: 'T3 is biologically active, faster onset but higher risk — reserve for critically ill; stop after 48h or if T3 elevated',
  },

  // =====================================================================
  // MODULE 3: DECOMPENSATED HYPOTHYROIDISM — MONITORING
  // =====================================================================

  {
    id: 'thyroid-hypo-labs',
    type: 'info',
    module: 3,
    title: 'Evaluation & Lab Workup',
    body: '**Core labs:**\n• TSH — very high in primary hypothyroidism (most common), low/normal in central (pituitary)\n• Free T4 — should be low; low-normal does not exclude diagnosis [3]\n• Random cortisol — rule out concurrent adrenal insufficiency\n• BMP — hyponatremia (~50%), hypoglycemia, hyperkalemia (rare)\n• CBC — anemia common, leukopenia possible\n• Lactate\n• ABG/VBG — hypercapnia, respiratory acidosis (even without obvious respiratory distress) [3]\n• CK — rhabdomyolysis from hypothermia/immobility\n• Coagulation studies — acquired von Willebrand syndrome possible [3]\n\n**Imaging:**\n• ECG — bradycardia, low voltages, flattened T waves, QT prolongation, heart block [14]\n• CXR — pleural effusions, cardiomegaly\n• Echocardiogram — pericardial effusion, reduced EF\n• Abdominal XR if distended — ileus, megacolon\n\n**Infection workup (sepsis is #1 precipitant):**\n• Blood cultures, UA/UCx, CXR\n• Consider CT head + LP if etiology unclear [14]\n\n[Lab Interpretation Guide](#/info/thyroid-labs)',
    citation: [3, 14],
    next: 'thyroid-hypo-monitoring',

    summary: 'TSH, fT4, random cortisol, BMP, ABG, CK; infection workup mandatory — sepsis is #1 precipitant',
  },

  {
    id: 'thyroid-hypo-monitoring',
    type: 'info',
    module: 3,
    title: 'Monitoring & Ongoing Care',
    body: '**ICU-level monitoring is mandatory for decompensated hypothyroidism.**\n\n**Monitoring parameters:**\n• Core temperature q1h — goal: passive rewarming to normothermia\n• Continuous cardiac monitoring — bradycardia, QT prolongation, heart block\n• Glucose q2-4h — risk of recurrent hypoglycemia\n• Sodium q4-6h — hyponatremia corrects with T4 therapy; fluid restrict if Na <130\n• Hemodynamics q1h — BP, HR, urine output\n• ABG/VBG if intubated — track CO₂ clearance\n\n**Medications to AVOID:**\n• Sedatives, opioids (extreme sensitivity → respiratory depression)\n• Amiodarone (can worsen hypothyroidism)\n• Diuretics (volume depletion + electrolyte shifts)\n\n**Vasopressor-refractory shock:** May occur — myocardium is profoundly depressed. Vasopressors are unlikely to work until thyroid hormone replacement takes effect. Prioritize thyroid replacement alongside standard resuscitation. Consider T3 if not already started. [3]\n\n**Thyroid labs for monitoring:** Check TSH + fT4 every 1-2 days (trough levels). TSH falls ~50%/week. fT4 should normalize within 4 days. If TSH not trending down → increase T4 dose. [3]',
    citation: [3, 5],
    next: 'thyroid-hypo-dispo',

    summary: 'ICU monitoring mandatory — avoid sedatives/opioids (extreme sensitivity); vasopressors unlikely to work until T4 takes effect',
    safetyLevel: 'warning',
  },

  {
    id: 'thyroid-hypo-dispo',
    type: 'question',
    module: 3,
    title: 'Disposition',
    body: 'Clinical improvement expected in 24-72h with appropriate treatment. TSH/fT4 are NOT useful for acute decision-making — changes lag by days. Follow **clinical parameters:** mental status, temperature, hemodynamics. [3][5]\n\n**All patients with decompensated hypothyroidism require admission.** The question is ICU vs monitored floor. [14]',
    citation: [3, 5, 14],
    options: [
      {
        label: 'ICU Admission',
        description: 'Hemodynamic instability, intubated, severe AMS, requiring IV T4/T3',
        next: 'thyroid-hypo-icu',
      },
      {
        label: 'Monitored Floor',
        description: 'Improving on IV T4, stable hemodynamics, mild-moderate presentation',
        next: 'thyroid-hypo-floor',
      },
    ],

    summary: 'Follow clinical parameters (mental status, temperature, hemodynamics) — TSH/fT4 changes lag by days',
  },

  {
    id: 'thyroid-hypo-icu',
    type: 'result',
    module: 3,
    title: 'ICU Admission — Decompensated Hypothyroidism',
    body: '**Continue:**\n• IV [Levothyroxine](#/drug/levothyroxine/decompensated hypothyroidism) maintenance (50-100 mcg/day or 1.2 mcg/kg/day)\n• Stress-dose [hydrocortisone](#/drug/hydrocortisone/thyroid storm) until cortisol results available\n• IV liothyronine if started (reassess at 48h)\n• Aggressive treatment of precipitant (antibiotics if infection suspected)\n• Passive rewarming\n• Glucose + electrolyte monitoring\n\n**Consults:**\n• Endocrinology\n• Consider ENT/anesthesia if airway concerns\n\n**Complications to watch for:**\n• Arrhythmias during hormone replacement (especially if T3 used)\n• Pericardial tamponade (rare — effusion usually improves with treatment; avoid pericardiocentesis if possible due to bleeding risk from acquired vWD) [3]\n• Seizures (potentially exacerbated by hyponatremia)\n• Ileus → megacolon → perforation',
    recommendation: 'ICU admission. Endocrinology consult. Continue IV T4 + steroids.',
    citation: [3, 5],
  },

  {
    id: 'thyroid-hypo-floor',
    type: 'result',
    module: 3,
    title: 'Monitored Floor Admission',
    body: '**Transition plan:**\n• Switch to PO [Levothyroxine](#/drug/levothyroxine/hypothyroid maintenance) (1.6 mcg/kg/day) when tolerating oral intake\n• Taper [hydrocortisone](#/drug/hydrocortisone/thyroid storm) over 2-3 days once cortisol results confirm adequate adrenal function\n• Aggressive bowel regimen (hypothyroid patients have severe constipation)\n• Telemetry monitoring for arrhythmias\n\n**Follow-up:**\n• TSH recheck in 6-8 weeks (adjustments in 12.5-25 mcg increments)\n• Endocrinology referral for dose titration\n• Patient education: lifelong therapy, medication adherence, sick-day rules, MedicAlert bracelet\n• Identify and address precipitant (medication noncompliance? new drug interaction?)',
    recommendation: 'Monitored floor with telemetry. Transition to PO T4. Endocrinology follow-up.',
    citation: [5],
  },

  // =====================================================================
  // MODULE 4: THYROID STORM — TREATMENT SEQUENCE
  // =====================================================================

  {
    id: 'thyroid-storm-eval',
    type: 'info',
    module: 4,
    title: 'Step 1 — Evaluation & Sepsis Workup',
    body: '**Thyroid storm mimics sepsis — and sepsis can trigger thyroid storm.** Always perform full sepsis workup. [2][14]\n\n**Labs:**\n• TSH, free T4, free T3 (T3 often disproportionately elevated in storm)\n• BMP, CBC with differential, lactate\n• Blood cultures, UA/UCx\n• LFTs (hepatic dysfunction common — if severe, consider congestive hepatopathy from heart failure) [14]\n• Coags + fibrinogen (DIC can occur) [2]\n• CK (rhabdomyolysis)\n• Calcium (hypercalcemia from enhanced bone resorption)\n• Glucose (mild hyperglycemia common from catecholamine-mediated glycogenolysis)\n\n**Critical — ECHO BEFORE beta-blockers:** Up to 38% of thyroid storm patients develop cardiogenic shock. Beta-blockers in decompensated systolic heart failure = cardiac arrest. [2]\n\n**ECG:** Sinus tachycardia (most common), AFib (~15%), VT/VF possible\n**CXR:** Evaluate for pulmonary edema, pneumonia, pleural effusion\n\n**Empiric antibiotics if any concern for infection.** Infection is the #1 trigger. [2][14]',
    citation: [2, 12, 14],
    next: 'thyroid-storm-steroids',

    summary: 'ECHO BEFORE beta-blockers — 38% develop cardiogenic shock; full sepsis workup, empiric antibiotics if any concern',
    safetyLevel: 'critical',
  },

  {
    id: 'thyroid-storm-steroids',
    type: 'info',
    module: 4,
    title: 'Step 2 — Steroids',
    body: '**Give early — dual benefit:**\n1. Blocks peripheral T4→T3 conversion (reduces active hormone)\n2. Treats potential concurrent adrenal insufficiency\n\n**IBCC protocol (preferred):**\n• [Hydrocortisone](#/drug/hydrocortisone/thyroid storm) 300 mg IV loading dose, then 100 mg IV q8h [2]\n\n**ATA protocol:**\n• [Hydrocortisone](#/drug/hydrocortisone/thyroid storm) 100 mg IV q8h (no separate load) [8]\n\n**Alternative if HC unavailable:**\n• [Methylprednisolone](#/drug/methylprednisolone/thyroid crisis) 125 mg IV load, then 60 mg IV daily\n\n**Duration:** Continue until clinical improvement (usually 3-5 days), then rapid taper.\n\n**Note:** Data is limited — one retrospective study of 811 patients found no mortality difference with early glucocorticoids in thyroid storm. [2] However, the theoretical benefit + low risk profile supports routine use.',
    citation: [2, 7, 8, 14],
    next: 'thyroid-storm-thionamide',

    summary: 'Steroids: dual benefit — blocks T4→T3 conversion and treats potential concurrent adrenal insufficiency',
    treatment: {
      firstLine: {
        drug: 'Hydrocortisone',
        dose: '300 mg IV load, then 100 mg',
        route: 'IV',
        frequency: 'q8h',
        duration: '3-5 days, then rapid taper',
        notes: 'IBCC protocol preferred. Blocks T4→T3 conversion and treats potential adrenal insufficiency.',
      },
      alternative: {
        drug: 'Methylprednisolone',
        dose: '125 mg IV load, then 60 mg',
        route: 'IV',
        frequency: 'Daily',
        duration: '3-5 days, then rapid taper',
        notes: 'Use if hydrocortisone unavailable.',
      },
      monitoring: 'Clinical improvement, hemodynamics. Taper once storm resolving.',
    },
  },

  {
    id: 'thyroid-storm-thionamide',
    type: 'question',
    module: 4,
    title: 'Step 3 — Thionamide (Block Synthesis)',
    body: '**Thionamides block new thyroid hormone synthesis** by inhibiting thyroid peroxidase. They have NO effect on pre-formed hormone already released. Must give BEFORE iodine. [2][8]\n\n[Thionamide Comparison — Methimazole vs PTU](#/info/thyroid-thionamide-compare)\n\n**Methimazole (IBCC preferred — safer long-term):**\n• [Methimazole](#/drug/methimazole/thyroid storm) 40 mg PO load, then 20 mg PO q6h [2]\n• Longer duration of action, irreversible binding to thyroperoxidase\n• Lower risk of hepatotoxicity and agranulocytosis\n\n**PTU (alternative — pregnancy 1st trimester, or theoretical preference):**\n• [PTU](#/drug/ptu/thyroid storm) 500-1000 mg PO load, then 250 mg PO q4h [8]\n• Additional benefit: blocks peripheral T4→T3 conversion\n• ATA guidelines favor PTU in acute setting for this reason, but IBCC notes no clinical evidence this matters [2]\n\n**Administration:** PO, via NG tube, or rectally (compounded) if NPO. No IV formulation exists.\n\n**Pregnancy:** PTU is mandatory in 1st trimester — methimazole is teratogenic (aplasia cutis, choanal atresia). Switch to methimazole after 1st trimester. [8][15]',
    citation: [2, 8, 15, 18],
    options: [
      {
        label: 'Methimazole — Standard Choice',
        next: 'thyroid-storm-iodine',
      },
      {
        label: 'PTU — Pregnancy or Methimazole Contraindication',
        next: 'thyroid-storm-iodine',
      },
    ],
    treatment: {
      firstLine: {
        drug: 'Methimazole',
        dose: '40 mg PO load, then 20 mg',
        route: 'PO (or NG/rectal)',
        frequency: 'q6h',
        duration: 'Continue until storm resolved, then transition to maintenance',
        notes: 'IBCC preferred. Safer long-term profile. Give BEFORE iodine. No IV formulation.',
      },
      alternative: {
        drug: 'PTU (Propylthiouracil)',
        dose: '500-1000 mg PO load, then 250 mg',
        route: 'PO (or NG/rectal)',
        frequency: 'q4h',
        duration: 'Until storm resolved',
        notes: 'MANDATORY in 1st trimester pregnancy. Also blocks T4→T3 conversion. Higher hepatotoxicity risk.',
      },
      monitoring: 'LFTs, CBC (agranulocytosis risk). Monitor for rash, fever, sore throat.',
    },

    summary: 'Thionamide blocks new synthesis — give BEFORE iodine; PTU mandatory in 1st trimester pregnancy',
    safetyLevel: 'warning',
  },

  {
    id: 'thyroid-storm-iodine',
    type: 'info',
    module: 4,
    title: 'Step 4 — Iodine (Block Release)',
    body: '**Iodine immediately suppresses thyroid hormone release** via the Wolff-Chaikoff effect. [2]\n\n**TIMING: Give ≥1 hour after thionamide.** Without thionamide on board, iodine can be used as substrate for NEW hormone synthesis — potentially worsening thyrotoxicosis (especially with toxic multinodular goiter or toxic adenoma). [2][8]\n\n**Dosing options:**\n• [SSKI](#/drug/sski/thyroid storm) 5 drops (250 mg) PO q6h\n• Lugol\'s 5% solution 8 drops (0.4 mL) PO q6h — take with food/fluid to avoid gastritis\n\n**Duration:** Up to 10 days (suppressive effect eventually wears off). [2]\n\n**Alternative (if iodine "allergy" claimed):**\n• Lithium carbonate 300 mg PO q8h — blocks thyroid hormone release\n• Note: true iodine allergy does not exist — iodine is an essential element. Allergies are to carrier molecules (shellfish, contrast dye), not iodine itself. [2]',
    citation: [2, 8],
    next: 'thyroid-storm-cholestyramine',

    summary: 'Iodine MUST wait ≥1h after thionamide — given too early, iodine becomes substrate for MORE hormone synthesis',
    safetyLevel: 'critical',
    treatment: {
      firstLine: {
        drug: 'SSKI (Saturated Solution of Potassium Iodide)',
        dose: '5 drops (250 mg)',
        route: 'PO',
        frequency: 'q6h',
        duration: 'Up to 10 days',
        notes: 'Give at least 1 hour AFTER thionamide. Suppressive effect wears off after ~10 days.',
      },
      alternative: {
        drug: 'Lugol\'s Iodine 5%',
        dose: '8 drops (0.4 mL)',
        route: 'PO',
        frequency: 'q6h',
        duration: 'Up to 10 days',
        notes: 'Take with food/fluid to avoid gastritis. Or use lithium 300 mg PO q8h if claimed iodine allergy.',
      },
      monitoring: 'Clinical response. Discontinue after 10 days (Wolff-Chaikoff escape).',
    },
  },

  {
    id: 'thyroid-storm-cholestyramine',
    type: 'info',
    module: 4,
    title: 'Step 5 — Cholestyramine (Block Recirculation)',
    body: '**[Cholestyramine](#/drug/cholestyramine/thyroid storm) 4 g PO q6h**\n\nBinds thyroid hormone in the gut, preventing enterohepatic recirculation. Effective even in endogenous thyrotoxicosis (Graves, toxic adenoma) — not just exogenous overdose. Can reduce T4 levels by an additional 20-30%. [2][16]\n\nIBCC considers this an important adjunct that is often overlooked. Extremely safe (available OTC for diarrhea). [2]\n\n**Drug interaction warning:** Cholestyramine binds many oral medications, reducing their absorption. Separate ALL oral drugs by ≥1 hour before or 2 hours after cholestyramine. This includes the thionamide — coordinate timing carefully. [14]',
    citation: [2, 14, 16],
    next: 'thyroid-storm-hyperthermia',

    summary: 'Cholestyramine 4g PO q6h — blocks enterohepatic recirculation, reduces T4 20-30%; separate oral meds by 1-2h',
    skippable: true,
    treatment: {
      firstLine: {
        drug: 'Cholestyramine',
        dose: '4 g',
        route: 'PO',
        frequency: 'q6h',
        duration: 'Until storm resolved',
        notes: 'Reduces T4 by 20-30% via blocking enterohepatic recirculation. Separate from other oral meds by 1h before or 2h after.',
      },
      monitoring: 'T4 levels. Coordinate timing with thionamide administration.',
    },
  },

  {
    id: 'thyroid-storm-hyperthermia',
    type: 'info',
    module: 4,
    title: 'Step 6 — Hyperthermia Management',
    body: '**[Acetaminophen](#/drug/acetaminophen/fever) 650-1000 mg PO/IV q6h** (max 4g/day)\n\n**Active cooling** for temp >40°C: cooling blankets, ice packs to axillae/groin [2][12]\n\n**AVOID aspirin and NSAIDs** — they displace T4 from thyroxine-binding globulin, increasing free (active) T4 and T3 levels. This can worsen thyrotoxicosis. [14]\n\nHyperthermia is harmful: increases myocardial oxygen demand and can cause rhabdomyolysis, delirium, and organ damage. However, avoid inducing shivering (also increases cardiac workload). [2]',
    citation: [2, 12, 14],
    next: 'thyroid-storm-agitation',

    summary: 'Acetaminophen for fever — AVOID aspirin/NSAIDs (displace T4 from binding protein, worsen thyrotoxicosis)',
    safetyLevel: 'critical',
    treatment: {
      firstLine: {
        drug: 'Acetaminophen',
        dose: '650-1000 mg',
        route: 'PO or IV',
        frequency: 'q6h',
        duration: 'Until normothermic',
        notes: 'Max 4g/day. AVOID aspirin/NSAIDs (worsen thyrotoxicosis). Add active cooling if temp >40C.',
      },
      monitoring: 'Temperature. Avoid inducing shivering (increases cardiac workload).',
    },
  },

  {
    id: 'thyroid-storm-agitation',
    type: 'info',
    module: 4,
    title: 'Step 7 — Agitation Management',
    body: 'Agitation worsens hyperthermia and impedes care.\n\n**IBCC preferred: [Olanzapine](#/drug/olanzapine/agitation)** 5-10 mg IM/PO [2]\n• Provides sedation without respiratory depression\n• May have direct antithyroid properties\n\n**Alternatives:**\n• Benzodiazepines (midazolam 2-5 mg IM) — avoid in elderly\n• Dexmedetomidine (ICU setting) — alpha-2 agonist, no respiratory depression\n• Phenobarbital — historical agent, enhances T4 hepatic metabolism\n\n**Avoid haloperidol** — QT prolongation risk is elevated in thyrotoxicosis. Case reports of haloperidol precipitating thyroid storm (dubious but concerning). [2]\n\n**Avoid ketamine** if possible — sympathomimetic properties may worsen tachycardia/hypertension.',
    citation: [2, 18],
    next: 'thyroid-storm-cardiovascular',

    summary: 'Olanzapine preferred for agitation — avoid haloperidol (QT risk) and ketamine (sympathomimetic)',
    treatment: {
      firstLine: {
        drug: 'Olanzapine',
        dose: '5-10 mg',
        route: 'IM or PO',
        frequency: 'PRN',
        duration: 'Until agitation controlled',
        notes: 'IBCC preferred. No respiratory depression. May have direct antithyroid properties. Avoid haloperidol (QT risk).',
      },
      alternative: {
        drug: 'Midazolam',
        dose: '2-5 mg',
        route: 'IM',
        frequency: 'PRN',
        duration: 'Until agitation controlled',
        notes: 'Alternative if olanzapine unavailable. Avoid in elderly. Dexmedetomidine preferred in ICU setting.',
      },
      monitoring: 'Sedation level, respiratory status, QTc.',
    },
  },

  {
    id: 'thyroid-storm-cardiovascular',
    type: 'question',
    module: 4,
    title: 'Step 8 — Cardiovascular Management',
    body: '**THE most controversial topic in thyroid storm management.**\n\n**ECHO FIRST** — this is the critical step before ANY cardiovascular intervention. [2]\n\nThyroid storm causes complex hemodynamic derangements:\n1. **Hypovolemia** (diaphoresis, vomiting, diarrhea)\n2. **Systolic heart failure** (thyrotoxic cardiomyopathy — up to 38% of ICU patients)\n3. **Distributive shock** (systemic vasodilation from tissue hypermetabolism)\n4. **Tachycardia** (sinus or AFib — may be compensatory)\n\n**Standard ICU hemodynamic management:**\n• Fluid resuscitation guided by POCUS\n• Vasopressors if needed (phenylephrine may be preferred — avoids exacerbating tachycardia)\n• Treat the CAUSE: steps 2-7 will reduce heart rate as storm resolves\n\n[Beta-Blocker Controversy in Thyroid Storm](#/info/thyroid-bb-controversy)',
    citation: [2, 6, 14],
    options: [
      {
        label: 'Preserved EF — Consider Beta-Blocker',
        next: 'thyroid-storm-bb',
      },
      {
        label: 'Reduced EF / Heart Failure — Avoid Beta-Blockers',
        next: 'thyroid-storm-no-bb',
        urgency: 'urgent',
      },
      {
        label: 'AFib in Thyroid Storm',
        next: 'thyroid-storm-afib',
      },
    ],

    summary: 'ECHO FIRST before any cardiovascular intervention — up to 38% develop cardiogenic shock; beta-blockers in decompensated HF = arrest',
    safetyLevel: 'critical',
  },

  {
    id: 'thyroid-storm-bb',
    type: 'info',
    module: 4,
    title: 'Beta-Blocker Use — Preserved EF',
    body: '**ONLY if echo confirms preserved ejection fraction and no decompensated heart failure.**\n\n**Traditional ATA/EMP view:** Beta-blockers are first-line for rate/symptom control. Propranolol preferred (also blocks T4→T3 conversion at high doses). [8][14]\n\n**IBCC critical view:** Beta-blockers may be harmful — use for standard accepted indications (hypertension, preserved-EF rate control) rather than reflexively in all thyroid storm. One meta-analysis linked beta-blockers to cardiogenic collapse and cardiac arrest in thyroid storm. [2]\n\n**If using beta-blocker:**\n• [Propranolol](#/drug/propranolol/thyroid storm) 20-40 mg PO q4-6h — start low, titrate to HR <110\n• [Esmolol](#/drug/esmolol/thyroid storm) 250-500 mcg/kg IV load → 50-100 mcg/kg/min infusion — **preferred in unstable patients** (ultra-short acting, immediately titratable, can be stopped if hypotension develops) [2][8]\n\n**Reactive airway disease:** Use cardioselective agent (esmolol, metoprolol) with caution, or calcium-channel blocker (diltiazem, verapamil) for rate control [8]\n\n**KEY: Start low, monitor closely, stop immediately if hypotension develops.**',
    citation: [2, 8, 14],
    next: 'thyroid-storm-dispo',

    summary: 'ONLY with preserved EF — esmolol preferred (ultra-short, titratable); start low, stop immediately if hypotension',
    safetyLevel: 'warning',
    treatment: {
      firstLine: {
        drug: 'Esmolol',
        dose: '250-500 mcg/kg IV load, then 50-100 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until rate controlled or hypotension',
        notes: 'Preferred in unstable patients (ultra-short acting, immediately titratable). Stop if hypotension develops.',
      },
      alternative: {
        drug: 'Propranolol',
        dose: '20-40 mg',
        route: 'PO',
        frequency: 'q4-6h',
        duration: 'Titrate to HR <110',
        notes: 'Also blocks T4→T3 conversion at high doses. Start low. Use only with confirmed preserved EF.',
      },
      monitoring: 'Continuous HR, BP. ECHO before starting. Stop immediately if hypotension.',
    },
  },

  {
    id: 'thyroid-storm-no-bb',
    type: 'info',
    module: 4,
    title: 'Reduced EF / Heart Failure — Avoid Beta-Blockers',
    body: '**If EF is reduced or clinical signs of decompensated heart failure: do NOT give beta-blockers.** [2]\n\n**Manage tachycardia by treating the storm:**\n1. Aggressive multimodal thyroid storm treatment (steps 2-7) will reduce heart rate as thyroid hormone levels fall\n2. **[Digoxin](#/drug/digoxin/thyroid)** 0.25-0.5 mg IV — lacks negative inotropic properties. However, thyrotoxicosis increases renal clearance and Vd, so higher doses may be needed and response may be blunted [2]\n3. **Diltiazem** with extreme caution ONLY if rate control is desperate — still carries negative inotropic risk\n4. **Vasopressor selection:** Phenylephrine (pure alpha — no beta stimulation) or vasopressin. Avoid catecholamines that worsen tachycardia (norepinephrine, epinephrine)\n\n**Permissive tachycardia:** Targeting HR <130 may be more realistic and safer than aggressive rate control in decompensated HF + thyroid storm. [2]\n\n**Cardiogenic pulmonary edema:** NIV (BiPAP) for respiratory support. These patients are often intravascularly depleted despite pulmonary edema — diuretics may worsen hemodynamics. [14]',
    citation: [2, 14],
    next: 'thyroid-storm-dispo',

    summary: 'Reduced EF: NO beta-blockers — treat the storm; digoxin for rate (no negative inotropy); permissive tachy HR <130',
    safetyLevel: 'critical',
    treatment: {
      firstLine: {
        drug: 'Digoxin',
        dose: '0.25-0.5 mg',
        route: 'IV',
        frequency: 'Load, then per digoxin protocol',
        duration: 'Until rate controlled',
        notes: 'No negative inotropy. May need higher doses in thyrotoxicosis (increased Vd, renal clearance). Response may be blunted.',
      },
      monitoring: 'HR target <130 (permissive). Digoxin level. Avoid beta-blockers with reduced EF.',
    },
  },

  // =====================================================================
  // MODULE 5: THYROID STORM — SPECIAL SITUATIONS
  // =====================================================================

  {
    id: 'thyroid-storm-afib',
    type: 'info',
    module: 5,
    title: 'AFib in Thyroid Storm',
    body: '**AFib occurs in 10-35% of thyroid storm.** Usually resolves spontaneously once thyrotoxicosis is treated (within 8-10 weeks). [14]\n\n**Rate control (depends on EF):**\n• **Preserved EF:** Cautious beta-blocker (esmolol preferred — titratable) or diltiazem\n• **Reduced EF:** Digoxin (reduced effectiveness in thyrotoxicosis but no negative inotropy), amiodarone (contains iodine — give AFTER methimazole; reasonable short-term bridge)\n\n**Magnesium repletion** — good first step. Hyperthyroidism causes hypomagnesemia. [2]\n\n**Anticoagulation:**\n• CHA₂DS₂-VASc score still applies\n• Embolic risk may be elevated in thyrotoxicosis even without traditional risk factors\n• Consider LMWH acutely\n\n**Cardioversion** is usually ineffective until thyroid hormones normalize — defer elective cardioversion. [2]\n\n**Cross-reference:** [A-Fib RVR Consult](#/tree/afib-rvr) for full AFib management pathway',
    citation: [2, 14],
    next: 'thyroid-storm-dispo',

    summary: 'AFib in 10-35% — usually resolves with storm treatment; cardioversion ineffective until hormones normalize',
  },

  {
    id: 'thyroid-storm-pregnancy',
    type: 'info',
    module: 5,
    title: 'Thyroid Storm in Pregnancy',
    body: '**Treatment is similar to non-pregnant patients with key modifications:** [15]\n\n[Special Populations Guide](#/info/thyroid-special-pops)\n\n**Thionamide:**\n• **1st trimester: PTU is MANDATORY** — [PTU](#/drug/ptu/thyroid storm pregnancy) methimazole is teratogenic (aplasia cutis, choanal/esophageal atresia, cardiac malformations)\n• **2nd/3rd trimester:** Switch to methimazole (lower hepatotoxicity risk)\n• Use the lowest effective dose — both drugs cross the placenta and can cause fetal hypothyroidism [15]\n\n**Iodine:** Use cautiously — crosses placenta, can cause fetal goiter/hypothyroidism\n\n**Beta-blocker:** Propranolol category C. Use lowest effective dose. Prolonged use associated with IUGR. [15]\n\n**Steroids:** Hydrocortisone — same dosing as non-pregnant\n\n**Additional concerns:**\n• Thyrotoxic heart failure + cardiomyopathy more common in pregnancy from uncontrolled hyperthyroidism [15]\n• Coordinate with OB/MFM\n• Fetal thyroid function monitoring needed\n• Beta-agonist tocolytics are contraindicated\n\n**TSH reference ranges in pregnancy:** Lower TSH normal range (reduce upper limit by ~0.5 mIU/L in 1st trimester). T4/T3 total values increase 50% after 16 weeks due to increased TBG. [15]',
    citation: [15],
    next: 'thyroid-storm-dispo',

    summary: 'PTU mandatory 1st trimester (methimazole teratogenic); iodine cautiously (fetal goiter risk); coordinate with OB/MFM',
    safetyLevel: 'critical',
  },

  {
    id: 'thyroid-storm-dispo',
    type: 'question',
    module: 5,
    title: 'Thyroid Storm — Disposition',
    body: '**All thyroid storm patients require ICU admission.** Mortality 8-25%. [1][14]\n\n**Monitor for complications:**\n• Worsening hemodynamics / cardiogenic shock\n• Arrhythmias (AFib, VT)\n• Hepatic failure (elevated LFTs common — liver failure is a grave prognostic sign)\n• DIC\n• Rhabdomyolysis\n\n**Clinical improvement expected in 24-72h** with aggressive multimodal therapy. [2]\n\n**Risk factors for mortality:** Age >60, neuropsychiatric manifestations, mechanical ventilation, non-use of antithyroid drugs or beta-blockers. [12]',
    citation: [1, 2, 12, 14],
    options: [
      {
        label: 'ICU Admission — Standard',
        next: 'thyroid-storm-icu',
      },
      {
        label: 'Refractory Storm — No Improvement Despite Treatment',
        description: 'Consider rescue therapies',
        next: 'thyroid-storm-refractory',
        urgency: 'urgent',
      },
    ],

    summary: 'ALL thyroid storm patients require ICU — mortality 8-25%; improvement expected 24-72h with aggressive multimodal therapy',
  },

  {
    id: 'thyroid-storm-icu',
    type: 'result',
    module: 5,
    title: 'ICU Admission — Thyroid Storm',
    body: '**Continue full multimodal regimen:**\n• Steroids (taper as storm resolves)\n• Thionamide (transition to maintenance dosing — [methimazole](#/drug/methimazole/maintenance) 10-20 mg daily preferred long-term)\n• Iodine (continue up to 10 days, then discontinue)\n• Cholestyramine (continue until improved)\n• Supportive care (temperature, agitation, hemodynamics)\n\n**Consults:**\n• Endocrinology\n• Consider cardiology if cardiomyopathy or persistent AFib\n\n**Definitive therapy planning** (once stable):\n• Radioactive iodine ablation (RAI)\n• Thyroidectomy\n• Long-term antithyroid medication\n\n**Monitoring:** TSH may remain suppressed for weeks. Follow free T4 and free T3 to guide thionamide dose titration.',
    recommendation: 'ICU admission. Multimodal thyroid storm treatment. Endocrinology consult.',
    citation: [2, 8],
  },

  {
    id: 'thyroid-storm-refractory',
    type: 'result',
    module: 5,
    title: 'Refractory Thyroid Storm',
    body: '**If no improvement after 24-48h of maximal medical therapy:** [2]\n\n1. **Therapeutic plasma exchange (plasmapheresis)** — most effective short-term rescue. Removes circulating thyroid hormones, autoantibodies, catecholamines, cytokines. Can be a bridge to thyroidectomy. [13]\n\n2. **Emergency thyroidectomy** — definitive treatment. Very high surgical risk in unstable patients. Typically done after plasmapheresis to stabilize. [2][8]\n\n3. **Lithium carbonate** 300 mg PO q8h — if not already using. Blocks thyroid hormone release via mechanism distinct from iodine.\n\n4. **CVVH (continuous venovenous hemofiltration)** — case reports of successful thyroid hormone removal [2]\n\n**Mortality in refractory thyroid storm approaches 50%.** [2]',
    recommendation: 'Multidisciplinary: endocrinology, surgery, critical care, nephrology (if plasmapheresis).',
    citation: [2, 8, 13],
  },

  // =====================================================================
  // MODULE 6: SUBCLINICAL FINDINGS
  // =====================================================================

  {
    id: 'thyroid-subclinical',
    type: 'question',
    module: 6,
    title: 'Incidental Thyroid Lab Abnormality',
    body: 'Incidental finding on ED labs. Most common: elevated TSH with normal free T4 (subclinical hypothyroidism). Prevalence: 4-10% of general population, higher in elderly and women. [14]\n\n**Euthyroid sick syndrome:** Acutely ill patients often have low T3 with low/normal TSH and free T4. This is NOT primary thyroid disease — do not treat. Reassess thyroid function after illness resolves. [14]\n\n[Lab Interpretation Guide](#/info/thyroid-labs)',
    citation: [14],
    options: [
      {
        label: 'TSH ≥ 10 mIU/L',
        description: 'Overt or significant subclinical hypothyroidism',
        next: 'thyroid-subclinical-treat',
      },
      {
        label: 'TSH 4.5-10 mIU/L',
        description: 'Mild subclinical hypothyroidism',
        next: 'thyroid-subclinical-observe',
      },
      {
        label: 'Suppressed TSH (< 0.1 mIU/L)',
        description: 'Subclinical hyperthyroidism',
        next: 'thyroid-subclinical-hyper',
      },
    ],

    summary: 'Euthyroid sick syndrome in acute illness — do NOT treat; reassess after illness resolves',
  },

  {
    id: 'thyroid-subclinical-treat',
    type: 'result',
    module: 6,
    title: 'Subclinical Hypothyroidism — Initiate Treatment',
    body: 'TSH ≥10 mIU/L is associated with progression to overt hypothyroidism, increased risk of coronary heart disease, heart failure, and cardiovascular mortality. Treatment is recommended. [14][17]\n\n**Start:** [Levothyroxine](#/drug/levothyroxine/subclinical hypothyroidism) 25-50 mcg PO daily\n• Elderly or cardiac disease: start 12.5-25 mcg\n• Take on empty stomach, 30-60 min before breakfast\n• Separate from calcium, iron, antacids by 4 hours\n\n**Follow-up:**\n• TSH recheck in 6-8 weeks\n• PCP or endocrinology referral for dose titration\n• Target TSH: 1-3 mIU/L',
    recommendation: 'Start levothyroxine 25-50 mcg daily. PCP/endocrinology follow-up in 6-8 weeks.',
    citation: [5, 14, 17],
    treatment: {
      firstLine: {
        drug: 'Levothyroxine',
        dose: '25-50 mcg (12.5-25 mcg if elderly/cardiac)',
        route: 'PO',
        frequency: 'Daily',
        duration: 'Lifelong',
        notes: 'Empty stomach, 30-60 min before breakfast. Separate from calcium, iron, antacids by 4 hours.',
      },
      monitoring: 'TSH recheck in 6-8 weeks. Target TSH 1-3 mIU/L. Adjust dose in 12.5-25 mcg increments.',
    },
  },

  {
    id: 'thyroid-subclinical-observe',
    type: 'result',
    module: 6,
    title: 'Mild Subclinical Hypothyroidism — Observation',
    body: 'TSH 4.5-10 mIU/L with normal free T4 in an asymptomatic patient. **No treatment in the ED.** [14]\n\n**Treatment may be considered if:**\n• Symptomatic (fatigue, weight gain, cognitive changes)\n• Pregnant or planning pregnancy\n• Anti-TPO antibodies positive (higher progression risk — ~4.3%/year)\n• Significant cardiovascular risk factors\n\n**Annual TSH monitoring recommended** — progression to overt hypothyroidism occurs in 2-5% per year. [14][17]\n\n**Counsel patient:** This is not an emergency. Follow-up with PCP within 1-2 months.',
    recommendation: 'PCP follow-up within 1-2 months. Annual TSH monitoring.',
    citation: [14, 17],
  },

  {
    id: 'thyroid-subclinical-hyper',
    type: 'result',
    module: 6,
    title: 'Subclinical Hyperthyroidism — Urgent Referral',
    body: 'Suppressed TSH (<0.1 mIU/L) with normal free T4/T3. Risk depends on degree of TSH suppression and age. [14]\n\n**Risks of untreated subclinical hyperthyroidism:**\n• AFib (especially if TSH <0.1 and age >65)\n• Osteoporosis (accelerated bone turnover)\n• Progression to overt hyperthyroidism\n\n**Common causes (check first):**\n• Exogenous thyroid hormone (most common cause — is patient on levothyroxine?)\n• Amiodarone\n• Recent iodinated contrast\n\n**ED text:** No acute treatment needed.\n\n**Disposition:** Urgent endocrinology referral within 1-2 weeks. Repeat TSH + free T4/T3 to confirm (may be transient).',
    recommendation: 'Urgent endocrinology referral within 1-2 weeks. Confirm with repeat labs.',
    citation: [8, 14],
  },

];

export const THYROID_NODE_COUNT = THYROID_NODES.length;

export const THYROID_MODULE_LABELS = [
  'Initial Assessment',
  'Decompensated Hypothyroidism — Evaluation',
  'Decompensated Hypothyroidism — Monitoring',
  'Thyroid Storm — Treatment Sequence',
  'Thyroid Storm — Special Situations',
  'Subclinical Findings',
];

export const THYROID_CITATIONS: Citation[] = [
  { num: 1, text: 'Ono Y, Ono S, Yasunaga H, et al. Clinical characteristics and outcomes of myxedema coma: analysis of a national inpatient database in Japan. J Epidemiol. 2017;27(3):117-122.' },
  { num: 2, text: 'Farkas J. Thyroid Storm. Internet Book of Critical Care (IBCC). Updated November 25, 2025. https://emcrit.org/ibcc/thyroid-storm/' },
  { num: 3, text: 'Farkas J. Decompensated Hypothyroidism (aka Myxedema Coma). Internet Book of Critical Care (IBCC). Updated November 29, 2025. https://emcrit.org/ibcc/myxedema/' },
  { num: 4, text: 'Burch HB, Wartofsky L. Life-threatening thyrotoxicosis. Thyroid storm. Endocrinol Metab Clin North Am. 1993;22(2):263-277.' },
  { num: 5, text: 'Jonklaas J, Bianco AC, Bauer AJ, et al. Guidelines for the treatment of hypothyroidism: prepared by the American Thyroid Association Task Force on Thyroid Hormone Replacement. Thyroid. 2014;24(12):1670-1751.' },
  { num: 6, text: 'Bourcier S, Coutrot M, Ferré A, et al. Critically ill severe hypothyroidism: a retrospective multicenter cohort study. Ann Intensive Care. 2023;13(1):15.' },
  { num: 7, text: 'Senda A, Endo A, Tachimori H, et al. Early administration of glucocorticoid for thyroid storm: analysis of a national administrative database. Crit Care. 2020;24(1):470.' },
  { num: 8, text: 'Ross DS, Burch HB, Cooper DS, et al. 2016 American Thyroid Association guidelines for diagnosis and management of hyperthyroidism and other causes of thyrotoxicosis. Thyroid. 2016;26(10):1343-1421.' },
  { num: 9, text: 'Akamizu T, Satoh T, Isozaki O, et al. Diagnostic criteria, clinical features, and incidence of thyroid storm based on nationwide surveys. Thyroid. 2012;22(7):661-679.' },
  { num: 10, text: 'Swee DS, Chng CL, Lim A. Clinical characteristics and outcome of thyroid storm: a case series and review of neuropsychiatric derangements in thyrotoxicosis. Endocr Pract. 2015;21(2):182-189.' },
  { num: 11, text: 'Galindo RJ, Hurtado CR, Pasquel FJ, et al. National trends in incidence, mortality, and clinical outcomes of patients hospitalized for thyrotoxicosis with and without thyroid storm in the United States, 2004-2013. Thyroid. 2019;29(1):36-43.' },
  { num: 12, text: 'Ono Y, Ono S, Yasunaga H, et al. Factors associated with mortality of thyroid storm: analysis using a national inpatient database in Japan. Medicine. 2016;95(7):e2848.' },
  { num: 13, text: 'Vyas AA, Vyas P, Fillipon NL, et al. Successful treatment of thyroid storm with plasmapheresis in a patient with methimazole-induced agranulocytosis. Endocr Pract. 2010;16(4):673-676.' },
  { num: 14, text: 'Kruithoff ML, Gigliotti BJ. Thyroid Emergencies: A Narrative Review. Endocr Pract. 2025;31(10):1310-1318.' },
  { num: 15, text: 'Alexander EK, Pearce EN, Brent GA, et al. 2017 Guidelines of the American Thyroid Association for the diagnosis and management of thyroid disease during pregnancy and the postpartum. Thyroid. 2017;27(3):315-389.' },
  { num: 16, text: 'Kaykhaei MA, Shams M, Sadegholvad A, et al. Low doses of cholestyramine in the treatment of hyperthyroidism. Endocrine. 2008;34(1-3):52-55.' },
  { num: 17, text: 'Rodondi N, den Elzen WPJ, Bauer DC, et al. Subclinical hypothyroidism and the risk of coronary heart disease and mortality. JAMA. 2010;304(12):1365-1374.' },
  { num: 18, text: 'Satoh T, Isozaki O, Suzuki A, et al. 2016 Guidelines for the management of thyroid storm from The Japan Thyroid Association and Japan Endocrine Society. Endocr J. 2016;63(12):1025-1064.' },
];
