// MedKitt — Diabetic Ketoacidosis (DKA)
// Diagnosis → Severity Assessment → Cause Evaluation → Fluid Resuscitation → Insulin Management → Electrolyte Monitoring → Special Scenarios
// 7 modules: Diagnosis → Severity → Precipitant Evaluation → Fluids → Insulin & Potassium → Electrolytes & Monitoring → Special Scenarios
// ~45 nodes total

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const DKA_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: DIAGNOSIS — IS THIS DKA?
  // =====================================================================

  {
    id: 'dka-start',
    type: 'question',
    module: 1,
    title: 'Suspected Diabetic Ketoacidosis — Diagnosis',
    body: '**DKA is a life-threatening metabolic emergency.** Defined by the 2024 consensus as: hyperglycemia (glucose >200 mg/dL, or known diabetes) + ketonemia (β-hydroxybutyrate >3 mmol/L or urine ketones 2+) + metabolic acidosis (pH <7.3 and/or bicarbonate <18 mEq/L). [1]\n\nIncidence: ~200,000 cases/year in the US. Mortality: 1-5% in young adults, up to 15% in elderly. Main precipitants: infection (30%), insulin noncompliance (25%), new diabetes diagnosis (20%), SGLT2 inhibitors (5-10%). [1][2]\n\n**KEY:** DKA can present with euglycemia (<200 mg/dL) — increasingly recognized with SGLT2i use. Maintain high suspicion in patients with diabetes and GI symptoms or dyspnea.',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Confirmed DKA',
        description: 'Hyperglycemia + ketonemia + acidosis (pH <7.3 or HCO3 <18)',
        next: 'dka-severity-assess',
        urgency: 'critical',
      },
      {
        label: 'Suspected DKA — Workup Needed',
        description: 'Unclear lab findings or euglycemic presentation',
        next: 'dka-workup-labs',
      },
      {
        label: 'Alternative Diagnosis',
        description: 'Hyperglycemia without ketonemia or acidosis',
        next: 'dka-exclude',
      },
    ],
    summary: 'Confirm triad: hyperglycemia + ketonemia (BOHB >3) + acidosis (pH <7.3). Watch for euglycemic DKA with SGLT2i.',
    safetyLevel: 'warning',
  },

  {
    id: 'dka-workup-labs',
    type: 'info',
    module: 1,
    title: 'Diagnostic Workup — Laboratory Assessment',
    body: '**Initial labs for suspected DKA:**\n\n**Acid-base & Electrolytes:**\n• Arterial or venous blood gas — pH, HCO3 (reliable on VBG for pH and HCO3)\n• Anion gap = Na - (Cl + HCO3). Normal ~10-12. AG >12-14 suggests metabolic acidosis. [2]\n• BMP: sodium, potassium, chloride, glucose, BUN, creatinine\n\n**Ketone Assessment (most important for diagnosis):**\n• **β-hydroxybutyrate (most specific):** >3 mmol/L = DKA confirmed, 1-3 = moderate ketosis (investigate further), <1 = unlikely DKA [1][2]\n• Serum/urine acetoacetate (rapid but less specific)\n• Urine dipstick ketones (insensitive, may miss euglycemic DKA)\n\n**Other critical labs:**\n• CBC with differential, lactate, phosphate, magnesium\n• Urinalysis with culture\n• Blood cultures if infection suspected\n• ECG (assess for peaked T-waves from hyperkalemia)\n• Pregnancy test in reproductive-age females\n\n**Imaging:**\n• Chest X-ray if infection suspected or respiratory distress\n• Abdominal imaging only if surgical abdomen suspected (DKA itself causes abd pain)\n\n**β-hydroxybutyrate correlation with severity:** >6 mmol/L = severe DKA (2024 ADA/EASD/JBDS). [1][3]',
    citation: [1, 2, 3],
    next: 'dka-bohb-interpret',
    summary: 'Order VBG, BMP, BOHB, lactate, UA, cultures, ECG. BOHB >3 confirms DKA, >6 = severe.',
    skippable: true,
  },

  {
    id: 'dka-bohb-interpret',
    type: 'question',
    module: 1,
    title: 'β-Hydroxybutyrate Interpretation',
    body: '**β-hydroxybutyrate (BOHB) is the gold standard for ketone diagnosis.**\n\nUnlike urine/serum acetoacetate or nitroprusside-based "ketones," BOHB:\n• Does not miss euglycemic DKA\n• Correlates with severity\n• Is the predominant ketone produced in DKA\n• Is NOT measured by urine dipstick (major cause of false-negative urine ketones in DKA)\n\n**BOHB level interpretation:**\n• >3 mmol/L: DKA confirmed — proceed to severity assessment\n• 1-3 mmol/L: Moderate ketosis — evaluate for precipitant and other causes of AG acidosis\n• <1 mmol/L: Unlikely DKA — consider alternative diagnosis (lactic acidosis, renal failure, alcoholic ketoacidosis)',
    citation: [1, 2],
    options: [
      {
        label: 'BOHB >3 mmol/L',
        description: 'DKA Confirmed',
        next: 'dka-severity-assess',
        urgency: 'critical',
      },
      {
        label: 'BOHB 1-3 mmol/L',
        description: 'Moderate Ketosis',
        next: 'dka-moderate-ketosis',
      },
      {
        label: 'BOHB <1 mmol/L',
        description: 'Unlikely DKA',
        next: 'dka-exclude',
      },
    ],
    summary: 'BOHB is the gold standard — urine dipstick misses DKA. >3 confirms, 1-3 investigate, <1 excludes.',
  },

  {
    id: 'dka-moderate-ketosis',
    type: 'question',
    module: 1,
    title: 'Moderate Ketosis (BOHB 1-3 mmol/L)',
    body: '**BOHB in the 1-3 mmol/L range may represent:**\n\n• Early/resolving DKA\n• Alcoholic ketoacidosis (history of heavy alcohol use, recent withdrawal, minimal hyperglycemia)\n• Starvation ketosis (minimal hyperglycemia, high AG acidosis without severe ketonemia)\n• Other AG metabolic acidosis (lactic acidosis, methanol/ethylene glycol, uremia)\n\n**Key discriminators:**\n• Glucose level: >200 favors DKA; <150 favors alcoholic ketoacidosis or starvation\n• Lactate: elevated suggests lactic acidosis\n• Osmolality: >320 increases ICU risk\n• pH <7.0 + bicarb <10 = severe metabolic acidosis regardless of BOHB level\n\n**Special case — Euglycemic DKA:**\n• Glucose <200 (often 150-250) with BOHB >3 and pH <7.3\n• Risk factors: SGLT2 inhibitors, recent illness, insulin dose reduction\n• Same treatment as classic DKA but requires earlier recognition',
    citation: [2, 10, 11],
    options: [
      {
        label: 'Glucose >200 + AG acidosis',
        description: 'Likely DKA or early presentation',
        next: 'dka-severity-assess',
        urgency: 'urgent',
      },
      {
        label: 'Glucose <150 + high AG acidosis',
        description: 'Suspect alcoholic or starvation ketoacidosis',
        next: 'dka-alt-ketosis',
      },
      {
        label: 'Euglycemic presentation (glucose 150-250)',
        description: 'Euglycemic DKA — SGLT2i risk',
        next: 'dka-euglycemic',
      },
    ],
    summary: 'Differentiate early DKA vs alcoholic/starvation ketoacidosis vs euglycemic DKA by glucose level.',
    safetyLevel: 'warning',
  },

  {
    id: 'dka-alt-ketosis',
    type: 'result',
    module: 1,
    title: 'Alternative Ketosis Diagnosis',
    body: '**If BOHB 1-3 mmol/L with glucose <150 and AG acidosis:**\n\n**Likely diagnoses:**\n• **Alcoholic ketoacidosis:** Heavy alcohol use, recent cessation, minimal hyperglycemia, often hypoglycemic. Treatment: dextrose + fluids, NOT insulin. [5]\n• **Starvation ketosis:** Prolonged fasting, minimal hyperglycemia, normal lactate. Resolves with oral intake/dextrose.\n• **Lactic acidosis:** Check lactate level (>2-4 mmol/L). Elevated lactate + AG acidosis. Different treatment paradigm.\n\n**Management:**\n• Hold insulin — may worsen hypoglycemia in alcoholic ketoacidosis\n• Start [D5W or D50 bolus](#/drug/dextrose/hypoglycemia) — glucose correction is primary therapy\n• IV fluids: NS ± dextrose, thiamine 100 mg IV (25% of patients are thiamine deficient)\n• Address underlying cause\n• Do NOT treat as DKA — insulin protocol inappropriate\n\n**Lactate check essential:** Lactate >4 mmol/L suggests lactic acidosis requiring different management.',
    recommendation: 'Do not initiate DKA insulin protocol. Give dextrose, IV fluids, thiamine. Hold insulin if hypoglycemic. Treat underlying cause. Lactate level determines lactic acidosis diagnosis.',
    citation: [5, 12],
    summary: 'NOT DKA — give dextrose + thiamine, hold insulin. Alcoholic ketoacidosis worsens with insulin.',
    safetyLevel: 'critical',
    treatment: {
      firstLine: {
        drug: 'Dextrose 50% (D50)',
        dose: '25-50 mL (12.5-25 g)',
        route: 'IV push',
        frequency: 'Once, then D5W or D10W infusion',
        duration: 'Until glucose stable >100 mg/dL',
        notes: 'Primary therapy for alcoholic ketoacidosis. Do NOT give insulin.',
      },
      alternative: {
        drug: 'Thiamine (Vitamin B1)',
        dose: '100 mg',
        route: 'IV',
        frequency: 'Once on admission',
        duration: 'Single dose',
        notes: 'Give BEFORE or WITH dextrose to prevent Wernicke encephalopathy. 25% of patients are deficient.',
      },
      monitoring: 'Glucose q1-2h. Lactate q4h. Mental status assessment. Hold insulin if hypoglycemic.',
    },
  },

  {
    id: 'dka-exclude',
    type: 'result',
    module: 1,
    title: 'DKA Excluded — Alternative Diagnosis',
    body: '**If BOHB <1 mmol/L or absence of AG acidosis:**\n\n**Alternative diagnoses to consider:**\n• **Hyperglycemic hyperosmolar state (HHS):** Glucose >600, osmolality >320, minimal ketonemia. Risk factors: older age, renal impairment, medication-induced. [9]\n• **Diabetic hyperglycemia without ketoacidosis:** Mild hyperglycemia, stress hyperglycemia, or medication-related\n• **Non-diabetic AG acidosis:** Lactic acidosis, methanol/ethylene glycol toxicity, salicylate poisoning, uremia\n\n**Management:**\n• Treat underlying cause and hyperglycemia\n• Do NOT use aggressive DKA insulin protocol\n• IV fluids, electrolyte monitoring\n• Endocrinology or toxicology consultation PRN\n\n**If HHS suspected:** Slower glucose correction (50 mg/dL/hr), careful fluid balance given osmolality risk.',
    recommendation: 'Exclude DKA confirmed. Identify alternative diagnosis. Adjust treatment accordingly.',
    citation: [1, 9],
    summary: 'DKA excluded — consider HHS (glucose >600, osm >320), lactic acidosis, or toxic ingestion.',
  },

  // =====================================================================
  // MODULE 2: SEVERITY ASSESSMENT
  // =====================================================================

  {
    id: 'dka-severity-assess',
    type: 'question',
    module: 2,
    title: 'DKA Severity Classification',
    body: '**DKA severity determines urgency, ICU admission, and management intensity.** [1]\n\n**2024 Consensus Criteria (ADA/EASD/JBDS):**\n\n| Severity | pH | HCO3 (mEq/L) | BOHB (mmol/L) | Altered Mental Status? |\n|----------|-----|-----|-----|-----|\n| **Mild** | 7.25-7.30 | 15-18 | 3-4 | No |\n| **Moderate** | 7.00-7.24 | 10-14 | 4-6 | Variable |\n| **Severe** | <7.00 | <10 | >6 | Often yes |\n\n**Additional risk factors requiring ICU:**\n• Osmolality >320 mOsm/kg (increased risk of cerebral edema in children)\n• Presentation in shock (SBP <90, lactate >5, altered MS)\n• Age >65 years\n• Pregnancy\n• Comorbidities (renal failure, cardiac disease, infection)\n\n**Severe DKA pathway:** pH <7.0 or HCO3 <10 requires ICU admission, aggressive management, closer monitoring for complications.',
    citation: [1, 2, 5],
    images: [{ src: 'images/dka/dka-pathophysiology.png', alt: 'Diabetic ketoacidosis pathophysiology concept map', caption: 'DKA pathophysiology: insulin deficiency → ketogenesis + hyperglycemia → osmotic diuresis → dehydration/electrolyte loss (Wikimedia Commons, CC BY-SA 4.0)' }],
    options: [
      {
        label: 'Mild DKA',
        description: 'pH 7.25-7.30, HCO3 15-18, alert and oriented',
        next: 'dka-mild-insulin-choice',
      },
      {
        label: 'Moderate DKA',
        description: 'pH 7.00-7.24, HCO3 10-14',
        next: 'dka-risk-factors',
        urgency: 'urgent',
      },
      {
        label: 'Severe DKA',
        description: 'pH <7.00, HCO3 <10, or altered mental status',
        next: 'dka-severe-pathway',
        urgency: 'critical',
      },
    ],
    summary: 'Classify by pH/HCO3/BOHB: mild (7.25-7.30), moderate (7.00-7.24), severe (<7.00). Severe = ICU.',
  },

  {
    id: 'dka-risk-factors',
    type: 'question',
    module: 2,
    title: 'Special Populations & Risk Factors',
    body: '**Certain populations have higher DKA mortality and require modified management:**\n\n**Higher-risk groups:**\n• **Hemodialysis patients:** Euvolemic/hypervolemic, cannot tolerate aggressive fluids, avoid K supplementation\n• **Insulin pump users:** Rapid presentation, missed boluses cause rapid DKA\n• **Pregnant patients:** DKA can occur at lower glucose (<200), higher fetal mortality, requires ICU/L&D coordination, continuous fetal monitoring\n• **SGLT2i-associated:** Euglycemic DKA, may present at glucose 150-300, avoid SGLT2i permanently\n• **New diabetes diagnosis:** Often presents with severe DKA; consider HHS overlap\n\n**Comorbidity assessment:**\n• Renal impairment (eGFR <30): slower glucose correction, K monitoring\n• Heart failure: aggressive fluids increase decompensation risk\n• Sepsis: additional ICU admission criterion\n• Cerebrovascular disease: osmolality >320 increases stroke risk',
    citation: [1, 2, 10, 11],
    options: [
      {
        label: 'Standard Risk',
        description: 'No major comorbidities or special populations',
        next: 'dka-precipitant-screen',
      },
      {
        label: 'High Risk — Special Protocol Needed',
        description: 'Pregnancy, HD, pump user, SGLT2i, severe comorbidity',
        next: 'dka-special-protocol',
        urgency: 'critical',
      },
    ],
    summary: 'Screen for HD, pregnancy, SGLT2i, pump user, HF — each requires modified fluid/insulin protocol.',
    safetyLevel: 'warning',
  },

  {
    id: 'dka-severe-pathway',
    type: 'info',
    module: 2,
    title: 'Severe DKA — Immediate Management',
    body: '**Severe DKA (pH <7.0, HCO3 <10) requires aggressive, immediate intervention:**\n\n**Immediate actions (parallel, do NOT delay):**\n• **IV access:** Two large-bore IVs, continuous cardiac monitor\n• **Labs:** VBG, CBC, BMP, lactate, BOHB, cultures, UA, EKG\n• **Fluids:** **Normal saline** 500-1000 mL IV bolus over 30-60 min. Reassess HR, BP, perfusion.\n• **Insulin:** Consider 10 U IV bolus IF: serum K <5.3 AND pH <6.9 AND delay to insulin drip. Otherwise start drip immediately (see Module 5). [1]\n• **Potassium:** Check K level STAT. If <3.3, HOLD insulin and replete K first (critical). If 3.3-5.3, start K repletion concurrent with insulin. [1]\n• **Bicarbonate:** Consider IV bicarbonate if pH <6.9 and BOHB >15 — risk of cardiovascular collapse. Hypertonic 8.4% bicarb: 100 mL IV over 5-10 min, recheck pH in 2-4 hrs. [2]\n\n**Disposition:** ICU admission mandatory.\n**Monitoring:** Reassess labs q1-2h initially.',
    citation: [1, 2, 5],
    next: 'dka-precipitant-screen',
    treatment: {
      firstLine: {
        drug: 'Normal saline',
        dose: '500-1000 mL',
        route: 'IV',
        frequency: 'Bolus over 30-60 min',
        duration: 'Initial resuscitation',
        notes: 'Reassess HR, BP, perfusion after bolus. Repeat if needed.',
      },
      alternative: {
        drug: 'Sodium bicarbonate 8.4%',
        dose: '100 mL (100 mEq)',
        route: 'IV',
        frequency: 'Over 5-10 min',
        duration: 'Single dose, recheck pH in 2-4 hrs',
        notes: 'Only if pH <6.9 and BOHB >15. Risk of cardiovascular collapse without treatment.',
      },
      monitoring: 'Continuous cardiac monitor. Labs q1-2h. ICU admission mandatory.',
    },
    summary: 'pH <7.0 = immediate parallel resuscitation: 2 IVs, NS bolus, check K+ before insulin, ICU.',
    safetyLevel: 'critical',
  },

  {
    id: 'dka-special-protocol',
    type: 'info',
    module: 2,
    title: 'Special Population Management Overview',
    body: '**High-risk populations require protocol modifications to prevent harm:**\n\n**Hemodialysis patients:**\n• Problem: Often euvolemic/hypervolemic; aggressive fluid resuscitation causes volume overload, pulmonary edema, hypertension\n• Solution: Target fluid resuscitation carefully; may only need insulin + modest fluids + dextrose\n• Insulin: Same 0.1 U/kg/hr drip protocol\n• Dialysis: Consider during severe DKA for K removal, HCO3 correction, acidosis clearance\n• Potassium: Very restricted; use [potassium acetate](#/drug/potassium-acetate/DKA) preferentially over KCl\n• Resolution marker: Use BOHB <1 mmol/L, not AG normalization (AG may not normalize in renal disease)\n\n**SGLT2 inhibitor-associated & Euglycemic DKA:**\n• Discontinue SGLT2i permanently — high recurrence risk\n• Lower glucose threshold for suspicion (<200 acceptable)\n• Same insulin + fluid protocol as classic DKA\n• Earlier basal glargine to prevent recurrence\n\n**Pregnancy:**\n• Higher risk, lower glucose threshold\n• Continuous fetal monitoring\n• Obstetric & endocrinology co-management\n• Insulin demand increases significantly in third trimester — may need 10-20 U/kg/day\n• Avoid bicarb if pH >6.9\n\n**Insulin pump users:**\n• Rapid onset — often severe at presentation (4-8h from failure to severe DKA)\n• [Detailed pump troubleshooting protocol](#node/dka-insulin-pump) in Module 7\n• Check pump function, infusion site, reservoir, tubing\n• Aggressive insulin dosing (IV drip + basal glargine early)\n• Decision: suspend pump vs continue with increased basal\n\n**Details for each path available in Module 7.**',
    citation: [1, 10, 11, 13, 14],
    next: 'dka-precipitant-screen',
    summary: 'HD = restrict fluids/K+. SGLT2i = permanently discontinue. Pregnancy = fetal monitoring + OB/endo.',
    safetyLevel: 'warning',
  },

  // ---------------------------------------------------------------------
  // MILD DKA: SUBCUTANEOUS INSULIN OPTION (2024 Consensus)
  // ---------------------------------------------------------------------

  {
    id: 'dka-mild-insulin-choice',
    type: 'question',
    module: 2,
    title: 'Mild DKA — Insulin Route Selection',
    body: '**Subcutaneous rapid-acting insulin is an evidence-based alternative to IV insulin for mild DKA.**\n\nThe 2024 ADA/EASD/JBDS Consensus and SQuID II trial support SC insulin for **uncomplicated mild DKA** in appropriate patients. [1][6]\n\n**SC insulin eligibility criteria (ALL must be met):**\n• pH ≥7.25 AND HCO3 ≥15 mEq/L (mild DKA only)\n• BOHB ≤6 mmol/L\n• Alert and oriented, able to tolerate PO\n• Hemodynamically stable (no shock, SBP >90)\n• No peritonitis, severe vomiting, or surgical abdomen\n• No concern for impaired absorption (severe edema, hypoperfusion)\n• Reliable patient/family for monitoring\n\n**Benefits of SC insulin:**\n• No IV insulin drip required → less ICU resource use\n• Can be managed on medical floor or observation unit\n• Similar resolution times in eligible patients (SQuID II trial)\n• Easier transition to outpatient regimen\n\n**When to choose IV insulin instead:**\n• Any doubt about eligibility criteria\n• Moderate-to-severe DKA (pH <7.25, HCO3 <15)\n• Hemodynamic instability\n• Unable to tolerate PO fluids\n• Pregnancy, ESRD, or special populations',
    citation: [1, 6],
    options: [
      {
        label: 'Eligible for SC Insulin',
        description: 'Meets all criteria: mild DKA, stable, alert, tolerates PO',
        next: 'dka-sc-insulin-protocol',
      },
      {
        label: 'IV Insulin Required',
        description: 'Does not meet SC criteria or provider preference',
        next: 'dka-precipitant-screen',
        urgency: 'urgent',
      },
    ],
    summary: 'SC insulin is an option for mild DKA (pH ≥7.25, stable, alert). All criteria must be met.',
    safetyLevel: 'warning',
  },

  {
    id: 'dka-sc-insulin-protocol',
    type: 'info',
    module: 2,
    title: 'Subcutaneous Insulin Protocol for Mild DKA',
    body: '**Rapid-acting SC insulin is safe and effective for mild DKA when eligibility criteria are met.** [1][6]\n\n**Initial Dose (Priming Bolus):**\n• [Insulin lispro (Humalog)](#/drug/insulin-lispro/DKA SC priming): **0.3 U/kg SC** (max 30 units) — [Calculate dose](#/drug/insulin-lispro/DKA SC priming)\n• Example: 70 kg patient → 21 units SC\n• Give immediately after confirming eligibility\n• Alternative: Insulin aspart (Novolog) same dosing\n\n**Maintenance Dosing (choose one):**\n\n**Option A — Hourly SC dosing:**\n• [Insulin lispro](#/drug/insulin-lispro/DKA SC q1h): **0.1 U/kg SC every hour** — [Calculate dose](#/drug/insulin-lispro/DKA SC q1h)\n• Example: 70 kg → 7 units q1h\n• More frequent monitoring required\n\n**Option B — Every-2-hour dosing (preferred):**\n• [Insulin lispro](#/drug/insulin-lispro/DKA SC q2h): **0.2 U/kg SC every 2 hours** — [Calculate dose](#/drug/insulin-lispro/DKA SC q2h)\n• Example: 70 kg → 14 units q2h\n• Easier to manage, similar efficacy\n\n**Monitoring (same as IV protocol):**\n• Glucose: q1-2h until stable, then q2-4h\n• K+ before each dose — **hold insulin if K+ <3.3 mEq/L**\n• BMP: q2-4h (Na, K, Cl, HCO3)\n• BOHB: q4h if available\n• Continue until DKA resolution criteria met\n\n**When glucose reaches 200-250 mg/dL:**\n• Add D5W or D10W to IV fluids (or oral carbs if eating)\n• Continue SC insulin until acidosis resolved\n• **Do NOT stop insulin for low glucose — give more dextrose**\n\n**Transition to maintenance:**\n• Once DKA resolved (AG <12, HCO3 >18, pH >7.3, tolerating PO):\n• Start [insulin glargine](#/drug/insulin-glargine/DKA basal) **0.25 U/kg SC** if not already given — [Calculate dose](#/drug/insulin-glargine/DKA basal)\n• Continue rapid-acting insulin with meals\n• Overlap SC rapid-acting × 1-2 hours after first basal dose\n\n**Escalation to IV insulin:**\n• If glucose not improving after 2-3 doses\n• If clinical deterioration (worsening mental status, hemodynamic instability)\n• If K+ <3.3 mEq/L (same as IV protocol — hold insulin, replete K+)',
    citation: [1, 6],
    next: 'dka-precipitant-screen',
    treatment: {
      firstLine: {
        drug: 'Insulin lispro (Humalog)',
        dose: '0.3 U/kg initial, then 0.2 U/kg q2h',
        route: 'Subcutaneous',
        frequency: 'Initial dose, then every 2 hours',
        duration: 'Until DKA resolved (AG <12, HCO3 >18, pH >7.3)',
        notes: 'Alternative: 0.1 U/kg q1h after initial 0.3 U/kg bolus. Max initial dose 30 units. Aspart (Novolog) can substitute.',
      },
      alternative: {
        drug: 'Regular insulin SC (if rapid-acting unavailable)',
        dose: '0.3 U/kg initial, then 0.1-0.2 U/kg q2h',
        route: 'Subcutaneous',
        frequency: 'Every 2 hours',
        duration: 'Until DKA resolved',
        notes: 'Onset slower than lispro/aspart (30-60 min vs 15-30 min). Monitor closely. Rapid-acting preferred.',
      },
      monitoring: 'Glucose q1-2h. K+ before each dose (hold if <3.3). BMP q2-4h. Escalate to IV if not improving.',
    },
    summary: 'Lispro/aspart: 0.3 U/kg initial → 0.2 U/kg q2h (or 0.1 U/kg q1h). Same K+ rules as IV.',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 3: EVALUATE PRECIPITATING CAUSE
  // =====================================================================

  {
    id: 'dka-precipitant-screen',
    type: 'info',
    module: 3,
    title: 'Common Precipitating Causes — "Five Is"',
    body: '**Common triggers for DKA — "Five Is" framework:** [1][2][3]\n\n• **Infection (30-40%):** Most common. Bacterial infection in adults (UTI, aspiration pneumonia, meningitis), viral in children. Fever, WBC >20-25k, bands elevated, CRP >70, lactate >2.\n• **Ischemia/Infarction:** Myocardial infarction, stroke, mesenteric ischemia. High mortality.\n• **Insulin noncompliance (20-30%):** Missed injections, running out of insulin, deliberate reduction, cost/access issues.\n• **Intoxication:** Alcohol withdrawal, cocaine, other drugs. Rare direct DKA cause but common precipitant of noncompliance.\n• **Iatrogenic (10-20%):** Steroid use (high-dose corticosteroids, IVIG), SGLT2 inhibitors, some antipsychotics (clozapine), thiazide diuretics.\n\n**~10% have no identifiable precipitant.** [1]\n\n**Workup steps:**\n1. History: Fever? Missed insulin? Recent medication changes? Alcohol use? Sick days?\n2. Vitals: Fever, tachycardia, hypotension?\n3. Labs from diagnostic workup: WBC, bands, lactate, UA for pyuria/nitrites, blood cultures, CXR\n4. Abdominal exam: Severe pain out of proportion to mild ketoacidosis argues AGAINST DKA as primary cause',
    citation: [1, 2, 3, 7],
    next: 'dka-infection-screen',
    summary: 'Use "Five Is": Infection (30%), Insulin noncompliance, Ischemia, Intoxication, Iatrogenic (SGLT2i/steroids).',
    skippable: true,
  },

  {
    id: 'dka-infection-screen',
    type: 'question',
    module: 3,
    title: 'Red Flags for Infection?',
    body: '**DKA impairs immune function — infection may be underappreciated at presentation.**\n\n**Red flags for occult infection:**\n• Fever (any temp >38°C is abnormal in DKA and suggests infection)\n• WBC >20-25k or <4k\n• Bands >10% (left shift)\n• Lactate >2 mmol/L (suggests tissue hypoperfusion/infection)\n• CRP >70 mg/L (sensitive for bacterial infection)\n• Neutrophil-to-lymphocyte ratio (NLR) >15 (strong infection predictor) [7]\n• Any focal symptoms: dysuria, cough, throat pain, wound infection\n\n**Sepsis screening:**\n• qSOFA: altered mentation, SBP <100, RR ≥22 — if ≥2, sepsis likely\n• Blood cultures ×2 if infection suspected\n• Urinalysis + culture\n• Chest X-ray if respiratory symptoms or any fever\n\n**Important:** Absence of fever does NOT exclude infection in DKA — young, immunocompromised, or severe illness may blunt fever response.',
    citation: [1, 2, 7],
    options: [
      {
        label: 'No Infection Red Flags',
        description: 'Afebrile, normal WBC, normal lactate, no focal symptoms',
        next: 'dka-precipitant-other',
      },
      {
        label: 'Possible Infection',
        description: 'Fever, elevated WBC/lactate, focal symptoms',
        next: 'dka-infection-treatment',
        urgency: 'critical',
      },
    ],
    summary: 'Any fever in DKA = infection until proven otherwise. Check WBC, lactate, NLR, cultures, UA, CXR.',
  },

  {
    id: 'dka-infection-treatment',
    type: 'info',
    module: 3,
    title: 'Infection Management in DKA',
    body: '**Infection in DKA requires aggressive treatment — high mortality if missed.**\n\n**Empiric antibiotics:**\n• Do NOT wait for culture results — start empiric coverage immediately\n• **Community-acquired:** [Ceftriaxone](#/drug/ceftriaxone/community-acquired) 1-2 g IV q12h + [azithromycin](#/drug/azithromycin/atypical-coverage) 500 mg IV/PO q24h (covers S. pneumoniae, atypicals, H. influenzae)\n• **Hospital-acquired or immunocompromised:** Add [vancomycin](#/drug/vancomycin/gram-positive) 15-20 mg/kg IV q8-12h (MRSA coverage)\n• **Aspiration concern:** Add [clindamycin](#/drug/clindamycin/anaerobic) 600 mg IV q6h or [metronidazole](#/drug/metronidazole/anaerobic) 500 mg IV q8h\n• **Urinary symptoms:** [Fluoroquinolone](#/drug/ciprofloxacin/UTI) preferred if creatinine normal\n\n**Sepsis management:**\n• Aggressive fluids (may exceed typical DKA fluid targets in sepsis)\n• Consider vasopressors if shock refractory to fluids (norepinephrine first-line)\n• Source control: catheterize for UTI, possible imaging for source\n• Repeat lactate in 2-4 hrs\n\n**ICU admission criterion met.** Coordinate infectious disease consultation if not already involved.',
    citation: [1, 2, 5],
    next: 'dka-fluid-management',
    treatment: {
      firstLine: {
        drug: 'Ceftriaxone + Azithromycin',
        dose: 'Ceftriaxone 1-2 g + Azithromycin 500 mg',
        route: 'IV',
        frequency: 'Ceftriaxone q12-24h, Azithromycin q24h',
        duration: '5-7 days (adjust per culture)',
        notes: 'Community-acquired coverage. Start immediately, do not wait for cultures.',
      },
      alternative: {
        drug: 'Vancomycin',
        dose: '15-20 mg/kg',
        route: 'IV',
        frequency: 'q8-12h (adjust for renal function)',
        duration: 'Per culture results',
        notes: 'Add for hospital-acquired, immunocompromised, or MRSA risk. Trough goal 15-20 mcg/mL.',
      },
      pcnAllergy: {
        drug: 'Levofloxacin + Vancomycin',
        dose: 'Levofloxacin 750 mg + Vancomycin 15-20 mg/kg',
        route: 'IV',
        frequency: 'Levofloxacin q24h, Vancomycin q8-12h',
        duration: 'Per culture results',
        notes: 'Fluoroquinolone for beta-lactam allergy. Covers atypicals and gram-negatives.',
      },
      monitoring: 'WBC, procalcitonin, lactate q4-6h. Blood cultures before antibiotics. Repeat lactate in 2-4 hrs. Vancomycin troughs.',
    },
    summary: 'Start empiric antibiotics immediately — do NOT wait for cultures. CTX + azithro; add vanc if HAP/immunocompromised.',
  },

  {
    id: 'dka-precipitant-other',
    type: 'question',
    module: 3,
    title: 'Other Precipitants',
    body: '**If infection excluded, assess for other triggers:**\n\n**Insulin noncompliance:**\n• Missed injections? Patient reports or history?\n• Running out of insulin — cost, access, supply issues?\n• Intentional reduction?\n• Pump failure or disconnection?\n\n**Medication-related (Iatrogenic):**\n• Recent steroid initiation or high-dose (prednisone >20 mg/day)? [Dexamethasone](#/drug/dexamethasone/indication) or IV methylprednisolone?\n• SGLT2 inhibitors (canagliflozin, dapagliflozin, empagliflozin)? → Permanent discontinuation\n• Antipsychotics (clozapine > others)?\n• Thiazide diuretics?\n\n**Cardiac/Vascular ischemia:**\n• Chest pain, EKG changes, elevated troponin?\n• Stroke symptoms?\n• Abdominal pain suggesting mesenteric ischemia?\n\n**New diabetes diagnosis:**\n• No prior known diabetes, presenting in DKA → often severe, consider HHS overlap, check osmolality\n• Check C-peptide/autoimmune markers for type 1 vs type 2\n\n**Alcohol withdrawal or intoxication:**\n• History of heavy use, recent cessation?\n• Tremor, autonomic instability?\n• May also reflect noncompliance with insulin\n\n**Unknown (10% of cases):**\n• Supportive care, optimize insulin, monitor for late-presenting infection',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Insulin Noncompliance Identified',
        description: 'Missed doses, cost, access issues, pump failure',
        next: 'dka-noncompliance-address',
      },
      {
        label: 'Medication-Related (Steroids, SGLT2i, Antipsych)',
        description: 'New steroid, SGLT2i, or antipsychotic initiation',
        next: 'dka-medication-adjust',
      },
      {
        label: 'Ischemia or Infarction Suspected',
        description: 'Chest pain, EKG changes, abdominal pain',
        next: 'dka-ischemia-workup',
        urgency: 'critical',
      },
      {
        label: 'New Diabetes Diagnosis or Unknown Cause',
        description: 'No prior history or precipitant unclear',
        next: 'dka-fluid-management',
      },
    ],
    summary: 'Assess noncompliance (cost/access), SGLT2i/steroids, cardiac ischemia, new-onset DM, or substance use.',
  },

  {
    id: 'dka-noncompliance-address',
    type: 'info',
    module: 3,
    title: 'Insulin Noncompliance — Management & Prevention',
    body: '**High recurrence risk in noncompliance-triggered DKA — requires intervention:**\n\n**During acute phase:**\n• Provide insulin pen/vial supply before discharge\n• Refer to social work/case management for insulin access programs\n• If cost is barrier: Samples from clinic, 340B pharmacy programs, manufacturer copay assistance programs\n• If access/storage: Distribute to safe location, deliver to home\n\n**Diabetes education:**\n• Reinforce sick-day insulin rules: NEVER stop insulin, even if vomiting\n• Recognition of early DKA symptoms (nausea, abdominal pain, dyspnea)\n• Insulin storage, rotation, injection technique\n\n**Follow-up plan:**\n• Endocrinology or primary care within 1-2 weeks\n• Consider insulin pump if basal-bolus noncompliance (single daily pump may improve adherence)\n• Behavioral health assessment if intentional noncompliance\n\n**Special consideration:** Recurrent DKA (>2 episodes/year) may indicate mental health crisis, substance use, or homelessness — screening essential. [1][5]',
    citation: [1, 5],
    next: 'dka-fluid-management',
    summary: 'High recurrence risk — ensure insulin supply, sick-day rules, and social work referral before discharge.',
    skippable: true,
  },

  {
    id: 'dka-medication-adjust',
    type: 'info',
    module: 3,
    title: 'Medication-Related DKA — Adjustments',
    body: '**Remove or modify offending agent if possible:**\n\n**Steroids:**\n• If high-dose (prednisone >20 mg/day): Taper rapidly if clinically feasible\n• If essential (cancer, autoimmune): Continue, increase insulin doses significantly (may need 10-50% increase or more)\n• Educate on insulin adjustment with steroid taper\n\n**SGLT2 Inhibitors:**\n• **PERMANENTLY discontinue** — euglycemic DKA recurrence risk very high [10][11]\n• Document in allergy section: \"SGLT2i-associated DKA\"\n• Switch to alternative agent (GLP-1 agonist, DPP-4 inhibitor, sulfonylurea if renal function adequate)\n• Counsel on euglycemic DKA risk if SGLT2i restarted\n\n**Antipsychotics:**\n• If clozapine: Consider switch to other agent if DKA recurs\n• Avoid if possible, but if essential for psychiatric stability: Continue with close monitoring\n• Increase insulin doses\n\n**Thiazides & Loop Diuretics:**\n• May worsen hyperglycemia; consider alternative BP agent if possible\n• ACE inhibitor or ARB preferred in diabetes\n\n**Follow-up:** Ensure new medications are not restarted without endocrinology input.',
    citation: [1, 10, 11],
    next: 'dka-fluid-management',
    summary: 'SGLT2i = permanently discontinue. Steroids = increase insulin significantly. Document as allergy.',
    safetyLevel: 'warning',
  },

  {
    id: 'dka-ischemia-workup',
    type: 'info',
    module: 3,
    title: 'Ischemic Complications — Evaluation',
    body: '**DKA in setting of possible ischemia has very high mortality (~30-50%).**\n\n**Myocardial infarction:**\n• Troponin I or T (high sensitivity preferred) — check at 0, 3, 6 hours\n• Serial EKG\n• Echocardiography if ejection fraction uncertain (affects fluid management)\n• Consider cardiology consultation\n• Management: Cautious fluid resuscitation (HFrEF risk with aggressive fluids), insulin therapy, possible IABP/mechanical support\n\n**Cerebral vascular accident:**\n• Head CT (r/o hemorrhage) if altered MS or focal neuro findings\n• Consider hyperglycemia as risk factor for worse stroke outcome\n• Glucose control essential but avoid overcorrection (>50-70 mg/dL/hr glucose drop)\n\n**Mesenteric ischemia:**\n• Severe abdominal pain with minimal exam findings (pain out of proportion)\n• Elevated lactate >5, worsening metabolic acidosis despite insulin therapy\n• CT angiography abdomen/pelvis if suspicion high\n• Surgery consultation if imaging confirms ischemia\n\n**Mortality drivers:** Ischemic events account for 10-15% of DKA deaths. Early recognition and specialist input reduce mortality.',
    citation: [1, 2, 5],
    next: 'dka-fluid-management',
    summary: 'DKA + ischemia = 30-50% mortality. Serial troponin, ECG, CT angio if mesenteric ischemia suspected.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 4: INITIAL RESUSCITATION — FLUIDS
  // =====================================================================

  {
    id: 'dka-fluid-management',
    type: 'info',
    module: 4,
    title: 'Fluid Resuscitation Strategy',
    body: '**Aggressive but careful IV fluid therapy is cornerstone of DKA management.** [1][2][8]\n\n**Overall strategy:**\n• Correct dehydration: Most DKA patients are 5-8L depleted (sometimes >10L in severe DKA)\n• Target: Replace half deficit in first 8-12 hours, remainder over next 24 hours\n• Monitor: Reassess HR, BP, urine output, perfusion q1-2h\n• Adjust based on clinical response\n\n**Fluid choice:**\n• ****Normal saline (0.9%)** — FIRST-LINE:** Preferred in initial resuscitation and ongoing therapy. No dextrose initially.\n• Alternative: **Balanced crystalloid (LR, Plasmalyte)** if available — may reduce hyperchloremic acidosis and NAGMA risk [8]\n\n**Initial bolus:**\n• For volume depletion/shock: 500 mL-1 L NS IV bolus over 30-60 min\n• Reassess hemodynamics, urine output\n• Repeat bolus if needed to achieve HR <100-110, SBP >90-100\n• Caution in heart failure, ESRD, pregnancy — use POCUS to assess intravascular volume vs edema\n\n**Ongoing fluids after bolus:**\n• Depends on glucose level — see next decision point',
    citation: [1, 2, 8],
    next: 'dka-glucose-threshold',
    treatment: {
      firstLine: {
        drug: 'Normal saline 0.9%',
        dose: '500 mL-1 L bolus, then 150-200 mL/hr',
        route: 'IV',
        frequency: 'Bolus over 30-60 min, then continuous',
        duration: 'Replace half deficit in 8-12 hrs, rest over 24 hrs',
        notes: 'Most patients 5-8L depleted. Goal HR <100-110, SBP >90-100. Caution in HF/ESRD.',
      },
      alternative: {
        drug: 'Lactated Ringers or Plasmalyte',
        dose: '500 mL-1 L bolus, then 150-200 mL/hr',
        route: 'IV',
        frequency: 'Same as NS',
        duration: 'Same protocol',
        notes: 'May reduce hyperchloremic acidosis (NAGMA) risk. Consider if available.',
      },
      monitoring: 'HR, BP, UOP q1-2h. POCUS if HF/ESRD/pregnancy. Switch to "drop and split" when glucose <300.',
    },
    summary: 'NS bolus 500-1000 mL first, then 150-200 mL/hr. Most patients 5-8L depleted. Caution in HF/ESRD.',
  },

  {
    id: 'dka-glucose-threshold',
    type: 'question',
    module: 4,
    title: 'Current Glucose Level?',
    body: '**Fluid composition changes based on glucose level to prevent hypoglycemia once acidosis resolves.**\n\n**Glucose >300 mg/dL:**\n• Continue **normal saline** at 150-200 mL/hr (or per urine output + insensible losses)\n• Goal: Replace remaining deficit gradually\n• NO dextrose yet\n\n**Glucose ≤300 mg/dL (most commonly 200-300):**\n• This is the critical transition point in DKA\n• **"Drop and Split":** Cut NS rate IN HALF + add [D10W](#/drug/dextrose/D10W) at equal rate\n• Example: If on 200 mL/hr NS → switch to 100 mL/hr NS + 100 mL/hr D10W = 200 mL/hr total\n• D10W is safe for peripheral IV (non-vesicant), can Y-site with NS\n• Goal: Continue replacing deficit while providing dextrose to prevent hypoglycemia during insulin therapy\n• Insulin therapy should NOT stop when glucose drops — reduce rate instead, use dextrose\n\n**Special populations:**\n• **Hemodialysis patient:** May require earlier switch to D10W (lower glucose tolerance), minimal NS (volume-overload risk)\n• **Pregnancy:** Watch glucose closely — insulin demands increase, need frequent reassessment\n• **Osmolality >320:** More cautious fluid resuscitation (cerebral edema risk); reduce rate to 100-150 mL/hr',
    citation: [1, 2, 5],
    options: [
      {
        label: 'Glucose >300 mg/dL',
        description: 'Continue NS — no dextrose yet',
        next: 'dka-ns-protocol',
      },
      {
        label: 'Glucose ≤300 mg/dL',
        description: '"Drop and Split" — reduce NS, add D10W',
        next: 'dka-drop-split-protocol',
      },
    ],
    summary: 'At glucose <=300: "Drop and Split" — cut NS in half, add D10W at equal rate. Never delay dextrose.',
    safetyLevel: 'warning',
  },

  {
    id: 'dka-ns-protocol',
    type: 'info',
    module: 4,
    title: 'NS Protocol (Glucose >300)',
    body: '**Continue **normal saline** at 150-200 mL/hr.**\n\nMonitoring:\n• Recheck glucose q1-2h (expect 50-70 mg/dL/hr drop with insulin therapy running)\n• UOP goal: 0.5-1 mL/kg/hr\n• When glucose reaches ≤300 → **IMMEDIATELY switch to "Drop and Split"** (see next node)\n• Do NOT delay dextrose addition — hypoglycemia risk as pH normalizes and insulin continues\n\nCommon error: Continuing NS after glucose drops below 300 → severe iatrogenic hypoglycemia despite ongoing acidosis. This is a critical transition point.\n\nRe-evaluate: Any signs of volume overload (crackles, JVD, pulmonary edema)? Reduce rate to 100 mL/hr. Any hypotension despite fluids? Reassess for cardiogenic shock, sepsis, or need for vasopressors.',
    citation: [1, 5],
    next: 'dka-potassium-check',
    summary: 'Continue NS at 150-200 mL/hr. Switch to Drop and Split the moment glucose hits 300 — common error point.',
    safetyLevel: 'warning',
  },

  {
    id: 'dka-drop-split-protocol',
    type: 'info',
    module: 4,
    title: '"Drop and Split" Protocol (Glucose ≤300)',
    body: '**At glucose ≤300, implement the critical "Drop and Split" strategy:**\n\n**Action:**\n• CUT **normal saline** rate IN HALF\n• ADD [D10W](#/drug/dextrose/D10W) at EQUAL rate to dropped NS rate\n• Example: 200 mL/hr NS → becomes 100 mL/hr NS + 100 mL/hr D10W\n\n**Why this works:**\n• Continues deficit replacement with dextrose to prevent hypoglycemia\n• Glucose typically drops 5-10 mg/dL/min once acidosis improving and glucose clearance increases\n• Allows insulin infusion to continue (CRITICAL) — stopping insulin can paradoxically worsen acidosis even if glucose normalized\n• Once dextrose running, hypoglycemia risk minimal\n\n**D10W peripheral IV safety:**\n• D10W is NON-vesicant — safe for peripheral IV\n• Can Y-site with NS in same line (preferred — fewer IVs)\n• Do NOT use for CVL extravasation concern\n\n**Reassessment every 1-2 hours:**\n• If glucose <150 → increase D10W rate or decrease NS further\n• If glucose >300 again → switch back to full-rate NS without dextrose\n\n**Critical point:** This transition is where most iatrogenic hypoglycemia in DKA occurs. Earlier switch = safer.',
    citation: [1, 5],
    next: 'dka-potassium-check',
    treatment: {
      firstLine: {
        drug: 'Dextrose 10% (D10W) + Normal saline (reduced)',
        dose: 'Cut NS rate in half + add D10W at equal rate',
        route: 'IV',
        frequency: 'Continuous',
        duration: 'Until DKA resolved and tolerating PO',
        notes: 'Example: 200 mL/hr NS becomes 100 mL/hr NS + 100 mL/hr D10W. D10W safe for peripheral IV.',
      },
      alternative: {
        drug: 'Dextrose 5% (D5W)',
        dose: 'Same "drop and split" protocol',
        route: 'IV',
        frequency: 'Continuous',
        duration: 'Until resolved',
        notes: 'Lower dextrose concentration. Use if glucose still trending high despite D10W.',
      },
      monitoring: 'Glucose q1-2h. If glucose <150, increase D10W rate. If glucose >300, switch back to full NS. NEVER stop insulin for low glucose.',
    },
    summary: 'Cut NS in half, add D10W at equal rate. NEVER stop insulin for low glucose — increase dextrose instead.',
    safetyLevel: 'critical',
  },

  {
    id: 'dka-hemodialysis-fluid',
    type: 'result',
    module: 4,
    title: 'Hemodialysis Patient — Fluid Protocol',
    body: '**Hemodialysis patients often euvolemic or hypervolemic — aggressive fluids cause harm:**\n\n**Assessment:**\n• POCUS or clinical exam: JVD, edema, crackles?\n• Weight compared to dry weight\n• Recent dialysis: When was last session? Any fluid removal?\n\n**Modified fluid strategy:**\n• Very cautious initial bolus: 250-500 mL NS only if hypotensive\n• Maintenance: Minimal — often 50-100 mL/hr NS (smaller total than non-HD DKA)\n• Often can omit separate fluids if on scheduled HD during DKA treatment\n\n**Insulin + dextrose approach:**\n• Start insulin drip per standard protocol (0.1 U/kg/hr)\n• Add [D10W or D5W](#/drug/dextrose/) to provide calories/glucose without volume burden\n• Minimal or no NS — insulin + dextrose often sufficient\n\n**Potassium management:**\n• Very restricted — DO NOT supplement even if K normal (paradoxically rises with acidosis correction)\n• Use [potassium acetate](#/drug/potassium-acetate/DKA) if any supplementation necessary (preferred over KCl to reduce Cl load)\n\n**Dialysis timing:**\n• Consider dialysis during severe DKA (pH <6.9, K >6.5, bicarb <5) for acid/K removal and hemodynamic support\n• Coordinate with nephrology\n\n**Resolution:** Use BOHB <1 mmol/L (not AG normalization) as stopping point.',
    recommendation: 'Minimal fluid resuscitation in HD patient. Insulin + dextrose protocol. Restricted K. Consider dialysis for severe DKA. Coordinate with nephrology.',
    citation: [1, 2, 14],
    summary: 'HD patient: minimal fluids (risk pulm edema), restrict K+, use BOHB not AG for resolution, consider dialysis.',
    safetyLevel: 'warning',
    treatment: {
      firstLine: {
        drug: 'Regular insulin IV drip + Dextrose 10%',
        dose: 'Insulin 0.1 U/kg/hr + D10W 50-100 mL/hr',
        route: 'IV',
        frequency: 'Continuous',
        duration: 'Until BOHB <1 mmol/L',
        notes: 'Minimal NS. D10W provides glucose without volume burden. Primary therapy is insulin + dextrose.',
      },
      alternative: {
        drug: 'Normal saline (cautious)',
        dose: '250-500 mL bolus, then 50-100 mL/hr',
        route: 'IV',
        frequency: 'Only if hypotensive',
        duration: 'Minimal total volume',
        notes: 'AVOID aggressive fluids. Risk of pulmonary edema. May omit if on scheduled HD.',
      },
      monitoring: 'BOHB for resolution (not AG). K very restricted. Coordinate dialysis STAT if pH <6.9 or K >6.5. POCUS for volume status.',
    },
  },

  // =====================================================================
  // MODULE 5: INSULIN MANAGEMENT & POTASSIUM
  // =====================================================================

  {
    id: 'dka-potassium-check',
    type: 'question',
    module: 5,
    title: 'Serum Potassium Level — Critical Gate',
    body: '**Potassium is the MOST CRITICAL electrolyte in DKA — wrong management is fatal.**\n\n**Paradox of DKA potassium:**\n• Presents with NORMAL or HIGH potassium despite total-body K depletion (often 1-2 L deficit)\n• Why? Acidosis shifts K OUT of cells — ECF K appears high, but ICF K is LOW\n• When insulin + bicarbonate given → K shifts BACK into cells → severe hypokalemia develops (risk of arrhythmia, cardiac arrest)\n• Therefore: HOLD insulin if K <3.3, or DELAY insulin start until K repleted to >3.3\n\n**Potassium tiers:**\n• **K <3.3 mEq/L (HYPOKALEMIA):** HOLD insulin until K >3.3 — CRITICAL urgency [1]\n• **K 3.3-5.3 mEq/L (NORMAL/MILD LOW):** Safe to start insulin WITH concurrent K repletion [1]\n• **K >5.3 mEq/L (HYPERKALEMIA):** Safe to start insulin immediately (insulin will bring K down) [1]\n\n**EKG findings correlate with danger:**\n• K >6: peaked T-waves\n• K >7: prolonged PR, widened QRS, atrial fibrillation possible\n• Physiology: Insulin + bicarb will LOWER K further → life-threatening hypokalemia if started without K repletion\n\n**ACTION:** If K <3.3, potassium chloride (KCl) or potassium acetate must be given BEFORE insulin infusion starts.',
    citation: [1, 2, 5, 12],
    options: [
      {
        label: 'K <3.3 mEq/L',
        description: 'HYPOKALEMIA — HOLD insulin',
        next: 'dka-hypokalemia-protocol',
        urgency: 'critical',
      },
      {
        label: 'K 3.3-5.3 mEq/L',
        description: 'Normal/mild low — start insulin WITH K repletion',
        next: 'dka-insulin-start',
      },
      {
        label: 'K >5.3 mEq/L',
        description: 'Hyperkalemia — start insulin immediately',
        next: 'dka-insulin-start',
      },
    ],
    summary: 'HOLD insulin if K+ <3.3 — giving insulin with low K+ causes fatal arrhythmia. Replete K+ first.',
    safetyLevel: 'critical',
  },

  {
    id: 'dka-hypokalemia-protocol',
    type: 'info',
    module: 5,
    title: 'Hypokalemia Management (K <3.3)',
    body: '**CRITICAL: Do NOT start insulin until K >3.3 — fatal arrhythmias if K falls further.**\n\n**Aggressive potassium repletion:**\n• **[Potassium chloride (KCl)](#/drug/potassium-chloride-iv/DKA) IV:** 40 mEq/hr maximum (or potassium acetate if preferring to avoid Cl load)\n• Goal: Bring K to 3.3-3.5 before insulin starts\n• Check K q1-2h during repletion — often need 40-80 mEq to raise K by 0.5-1 mEq/L\n• Do NOT trust estimates — must recheck lab\n\n**Oral potassium (if tolerating PO):**\n• [Potassium chloride solution or salt substitute](#/drug/potassium-chloride-oral/DKA) 60 mEq q2-4h\n• Much slower but useful adjunct if GI tolerant\n\n**Cardiac monitoring:**\n• Continuous monitor if possible\n• Watch for peaked T-waves, prolonged PR\n• Do NOT rely on EKG — renal or acid-base factors affect threshold\n\n**When insulin becomes safe:**\n• Once K >3.3, proceed to insulin protocol\n• But continue aggressive K repletion SIMULTANEOUSLY\n• Insulin lowers K rapidly once given — need replacement drip running during insulin infusion\n\n**Time consideration:** May delay insulin 1-2 hours to replete K — this is appropriate and safer than rushing insulin with low K.',
    citation: [1, 5, 12],
    next: 'dka-k-repleted',
    treatment: {
      firstLine: {
        drug: 'Potassium chloride (KCl)',
        dose: '20-40 mEq/hr',
        route: 'IV',
        frequency: 'Continuous infusion',
        duration: 'Until K >3.3 mEq/L',
        notes: 'Maximum 40 mEq/hr via central line, 10-20 mEq/hr peripheral. HOLD insulin until K >3.3.',
      },
      alternative: {
        drug: 'Potassium chloride oral',
        dose: '40-60 mEq',
        route: 'PO',
        frequency: 'q2-4h',
        duration: 'Adjunct to IV if tolerating PO',
        notes: 'Slower absorption. Use as supplement to IV if patient tolerating oral intake.',
      },
      monitoring: 'Continuous cardiac monitor. K level q1-2h during aggressive repletion. EKG for peaked T-waves, prolonged PR. Do NOT start insulin until K >3.3.',
    },
    summary: 'KCl 20-40 mEq/hr IV until K+ >3.3. Do NOT start insulin until repleted — fatal arrhythmia risk.',
    safetyLevel: 'critical',
  },

  {
    id: 'dka-k-repleted',
    type: 'info',
    module: 5,
    title: 'K Repleted — Now Safe for Insulin',
    body: '**Once K >3.3, insulin infusion can now be started safely.**\n\nBut REMEMBER: Insulin will lower K further. You must:\n• Continue potassium supplementation DURING insulin therapy\n• Target serum K >5 mEq/L during acute phase (normal renal function)\n• Check K q1-2h × 4-6 hrs, then q4h\n• Adjust K supplementation based on trending\n\n**Proceed to DKA insulin protocol (next node).**',
    citation: [1, 5],
    next: 'dka-insulin-start',
    summary: 'K+ now >3.3 — safe to start insulin, but continue K+ repletion concurrently. Target K+ >5 during treatment.',
  },

  {
    id: 'dka-insulin-start',
    type: 'info',
    module: 5,
    title: 'Insulin Infusion Protocol',
    body: '**Standard DKA insulin regimen:**\n\n**Dosing:**\n• [Regular insulin](#/drug/regular-insulin/DKA) IV infusion: **0.1 U/kg/hr** (starting dose, max 15 U/hr for safety)\n• Example: 70 kg patient → 7 U/hr. 100 kg patient → 10 U/hr.\n• Prepare: 100 units insulin in 100 mL normal saline = 1 U/mL solution. Use dedicated insulin drip IV (separate from fluid lines if possible to avoid delays in rate adjustment)\n\n**Bolus insulin (optional, consider if):**\n• 10 U IV bolus of regular insulin IF any of:\n  - Severe hyperkalemia (K >6.5) — insulin helps drive K into cells\n  - Severe acidosis (pH <6.9 or BOHB >15)\n  - Significant delay to drip establishment\n• Bolus is NOT required if drip starting immediately\n\n**Titration:**\n• Goal: Glucose drop 50-70 mg/dL per hour [1]\n• Reassess glucose q1-2h\n• If glucose dropping too slowly (<50 mg/dL/hr): Increase drip to 0.15 U/kg/hr or 15-20 U/hr\n• If glucose dropping too fast (>100 mg/dL/hr): Decrease drip; increase dextrose rate\n\n**When glucose reaches ~250 mg/dL:**\n• Reduce insulin to 0.05 U/kg/hr (holding rate, roughly 5 U/hr for 100 kg patient)\n• Continue until acidosis resolved (see stopping criteria)\n\n**Critical rule:** NEVER stop insulin even if glucose <100 — give MORE DEXTROSE instead. Continue insulin until acid-base normalized.',
    citation: [1, 2, 5],
    next: 'dka-basal-insulin',
    treatment: {
      firstLine: {
        drug: 'Regular insulin',
        dose: '0.1 U/kg/hr',
        route: 'IV continuous infusion',
        frequency: 'Continuous drip',
        duration: 'Until DKA resolved (AG <12, HCO3 >18)',
        notes: 'Mix 100 U in 100 mL NS (1 U/mL). Max 15 U/hr. Reduce to 0.05 U/kg/hr when glucose <250.',
      },
      alternative: {
        drug: 'Regular insulin bolus',
        dose: '10 units',
        route: 'IV push',
        frequency: 'Once (optional)',
        duration: 'Single dose before drip',
        notes: 'Consider if K >6.5, pH <6.9, or delay to drip. Not required if drip starts immediately.',
      },
      monitoring: 'Glucose q1-2h. Goal drop 50-70 mg/dL/hr. K level q2h. NEVER stop insulin for low glucose. Give dextrose instead.',
    },
    summary: 'Regular insulin 0.1 U/kg/hr IV. Goal glucose drop 50-70/hr. NEVER stop insulin — give dextrose instead.',
    safetyLevel: 'critical',
  },

  {
    id: 'dka-basal-insulin',
    type: 'info',
    module: 5,
    title: 'Early Basal Insulin (Glargine)',
    body: '**Give basal insulin on admission — this is critical to prevent recurrent DKA.**\n\n**Timing:** Administer [insulin glargine](#/drug/insulin-glargine/DKA basal) within first 6-12 hours of DKA presentation. Do NOT wait until glucose normalized or acidosis resolved.\n\n**Dosing:**\n• **Known diabetes on insulin:** Use home insulin glargine dose if known (or home total daily insulin × 0.5 if not on glargine)\n• **New diagnosis or dose unknown:** 0.25 U/kg once daily (example: 70 kg → 17-18 units once daily)\n• Some experts use 0.3 U/kg for new diagnosis\n• Starting glargine is SEPARATE from IV insulin drip — not calculated from drip rate\n\n**Why so early?**\n• IV insulin drip stops once acidosis resolves, but patient still has insulin requirement\n• Basal insulin prevents relapse (DKA recurrence common if basal not given)\n• Provides 24-hour coverage while transitioning from drip\n\n**Administration:**\n• [Insulin glargine (Lantus, Basagam)](#/drug/insulin-glargine/) SC daily (preferred: evening, or AM if long-acting preferred)\n• Can overlap with IV drip — no problem\n\n**Transition planning (later, see Module 6):** Transition from drip to basal + bolus SC insulin once patient eating and stable.',
    citation: [1, 5, 14],
    next: 'dka-electrolytes-monitor',
    treatment: {
      firstLine: {
        drug: 'Insulin glargine (Lantus)',
        dose: '0.25 U/kg',
        route: 'Subcutaneous',
        frequency: 'Once daily',
        duration: 'Ongoing (discharge on this)',
        notes: 'Give within 6-12 hrs of admission. Use home dose if known. Can overlap with IV drip.',
      },
      alternative: {
        drug: 'Insulin detemir (Levemir)',
        dose: '0.25-0.3 U/kg',
        route: 'Subcutaneous',
        frequency: 'Once or twice daily',
        duration: 'Ongoing',
        notes: 'Alternative long-acting. May require BID dosing. Less preferred in acute DKA.',
      },
      monitoring: 'Continue IV drip until DKA resolved. Give basal at least 2 hrs before stopping drip. Glucose q4-6h once on SC insulin only.',
    },
    summary: 'Give glargine 0.25 U/kg SC within 6-12h of admission — prevents rebound DKA when IV drip stops.',
  },

  // =====================================================================
  // MODULE 6: ELECTROLYTES & MONITORING
  // =====================================================================

  {
    id: 'dka-electrolytes-monitor',
    type: 'info',
    module: 6,
    title: 'Electrolyte Management & Monitoring',
    body: '**Aggressive potassium and phosphate/magnesium repletion is essential to prevent complications.**\n\n**Potassium Target:**\n• Goal: Maintain K >5 mEq/L during acute DKA (normal renal function) [1]\n• Aggressive repletion: [Potassium acetate](#/drug/potassium-acetate/DKA) IV (preferred over KCl to reduce chloride load and NAGMA risk) or [potassium chloride](#/drug/potassium-chloride-iv/DKA)\n• IV: 40 mEq/hr maximum, or oral potassium citrate 60 mEq q2-4h [1]\n• Can give up to 40 mEq/hr IV with continuous cardiac monitoring if aggressive repletion needed\n• Check K q1-2h × 6 hours, then q4h minimum\n\n**Magnesium & Phosphate:**\n• Check both on admission and q4-6h during acute phase\n• Repletion needed: Mg <1.5 mg/dL or Phos <1.5 mg/dL\n• [Magnesium sulfate](#/drug/magnesium-sulfate/DKA): 1-2 g IV over 10-15 min (recheck after 2-4 hrs) [1]\n• Phosphate repletion: Often done PO if tolerating (K2PO4 salt, 30 mmol q2-4h) or IV if severe\n• Both common in DKA — 25-50% of patients are Mg/Phos depleted\n\n**Thiamine (Vitamin B1):**\n• Give [thiamine](#/drug/thiamine/DKA) 100 mg IV on admission — 25% of DKA patients are thiamine deficient [1]\n• Prevents Wernicke encephalopathy if alcohol history\n\n**Monitoring Schedule:**\n• Glucose: q1-2h × 4h, then q2-4h\n• BMP (Na, K, Cl, HCO3): q2-4h until improving, then q4-6h\n• Mg, Phos, Ca: admission + q4-6h\n• Lactate: q4h if elevated initially\n• VBG: q2-4h to assess pH, HCO3 progress\n• EKG: admission, and if K abnormal\n• BOHB or serum ketones: q4-6h (optional but useful)\n\n**Trend interpretation:**\n• AG should decrease as insulin works (ketones being metabolized)\n• HCO3 should rise gradually\n• Glucose should drop 50-70 mg/dL/hr',
    citation: [1, 2, 5],
    next: 'dka-nagma-screen',
    treatment: {
      firstLine: {
        drug: 'Potassium chloride or acetate',
        dose: '20-40 mEq/hr',
        route: 'IV',
        frequency: 'Continuous per K level',
        duration: 'Throughout DKA treatment',
        notes: 'Goal K >5 mEq/L. Acetate preferred to reduce chloride load. Max 40 mEq/hr with cardiac monitor.',
      },
      alternative: {
        drug: 'Magnesium sulfate',
        dose: '1-2 g',
        route: 'IV',
        frequency: 'Over 10-15 min, repeat PRN',
        duration: 'Until Mg >1.5 mg/dL',
        notes: 'Give if Mg <1.5 mg/dL. Recheck in 2-4 hrs. 25-50% of DKA patients are depleted.',
      },
      monitoring: 'K q1-2h x6h then q4h. Mg/Phos q4-6h. Glucose q1-2h. VBG q2-4h. EKG if K abnormal.',
    },
    summary: 'Target K+ >5 during treatment. Replace Mg/Phos if low. Give thiamine 100 mg IV on admission.',
  },

  {
    id: 'dka-nagma-screen',
    type: 'question',
    module: 6,
    title: 'NAGMA (Hyperchloremic Acidosis) — Screen?',
    body: '**Normal anion gap metabolic acidosis (NAGMA) complicates ~30% of DKA cases as AG closes.**\n\n**What is NAGMA?**\n• Normal or low AG acidosis that develops as ketoacidosis improves\n• Caused by: aggressive normal saline (chloride load), urinary bicarb losses, impaired renal excretion\n• Delayed resolution — patient may seem "stuck" with persistent acidosis despite improving ketones\n\n**Detection:**\n• Calculate predicted final bicarb: **Predicted final HCO3 = Na - Cl - 10** (chloride is the anion replacing HCO3)\n• Example: Na 140, Cl 110 → predicted final HCO3 = 140 - 110 - 10 = 20 mEq/L\n• If this predicted value is <<20 (like 15-17), patient has NAGMA already or developing\n\n**Risk factors:**\n• High-dose normal saline infusion\n• Hyperchloremia (Cl >110-115)\n• Severe initial acidosis requiring large NS volumes\n• Renal dysfunction\n\n**Clinical significance:**\n• Slows acidosis resolution (limits recovery to HCO3 ~18-20 despite resolved ketonemia)\n• May require bicarbonate therapy to speed recovery\n• Does NOT change DKA treatment but explains delayed recovery',
    citation: [1, 2],
    options: [
      {
        label: 'No NAGMA Developing',
        description: 'Cl <110, predicted final HCO3 >20, good AG closure',
        next: 'dka-stopping-criteria',
      },
      {
        label: 'NAGMA Present or Developing',
        description: 'Hyperchloremia, predicted final HCO3 <20, slow HCO3 recovery',
        next: 'dka-nagma-treatment',
      },
    ],
    summary: 'Check for hyperchloremic acidosis (Cl >110) delaying recovery. Predicted final HCO3 = Na - Cl - 10.',
    safetyLevel: 'warning',
  },

  {
    id: 'dka-nagma-treatment',
    type: 'info',
    module: 6,
    title: 'NAGMA Treatment — IV Bicarbonate',
    body: '**If NAGMA present (Cl >110 or predicted final HCO3 <20), consider IV bicarbonate to speed resolution.**\n\n**Timing:**\n• Usually appears when initial acidosis improving (AG closing) and pH 7.15-7.30 range\n• Can start IV bicarb once AG <12 and HCO3 rising\n• Goal: Raise bicarb to >18-20\n\n**Bicarbonate Dosing Options:**\n\n**Option 1: Isotonic bicarbonate (preferred)**\n• [Sodium bicarbonate](#/drug/sodium-bicarbonate/DKA) 250 mL of isotonic solution (150 mEq/L bicarb in 250 mL D5W) IV at 250 mL/hr\n• Infuse until HCO3 >18-20\n• Gentler, lower hypernatremia risk\n\n**Option 2: Hypertonic bicarbonate (for urgent correction)**\n• [Sodium bicarbonate](#/drug/sodium-bicarbonate/DKA) ampules: 50 mEq in 50 mL (8.4%) IV over 5-10 min\n• Can repeat q2-4h if HCO3 still <18\n• Higher hypernatremia risk — use cautiously\n\n**Monitoring:**\n• Check BMP q2-4h to assess HCO3 rise\n• Watch sodium (risk of hypernatremia from bicarbonate)\n• Continue insulin, K repletion, fluids\n• Often can transition off drip once HCO3 >18\n\n**Controversial:** Some experts avoid routine bicarb unless pH <7.0; others use when HCO3 <10. Use clinical judgment.',
    citation: [1, 2, 5, 9],
    next: 'dka-stopping-criteria',
    treatment: {
      firstLine: {
        drug: 'Sodium bicarbonate isotonic',
        dose: '150 mEq in 250 mL D5W',
        route: 'IV',
        frequency: '250 mL/hr',
        duration: 'Until HCO3 >18-20',
        notes: 'Preferred for NAGMA. Lower hypernatremia risk than hypertonic.',
      },
      alternative: {
        drug: 'Sodium bicarbonate 8.4% (hypertonic)',
        dose: '50 mEq (50 mL ampule)',
        route: 'IV',
        frequency: 'Over 5-10 min, repeat q2-4h PRN',
        duration: 'Until HCO3 >18',
        notes: 'For urgent correction. Higher hypernatremia risk. Use cautiously.',
      },
      monitoring: 'BMP q2-4h. Watch sodium for hypernatremia. Continue insulin and K repletion. Goal HCO3 >18-20.',
    },
    summary: 'IV bicarb for NAGMA once AG <12: isotonic preferred, hypertonic if urgent. Watch for hypernatremia.',
  },

  {
    id: 'dka-stopping-criteria',
    type: 'info',
    module: 6,
    title: 'DKA Resolution — Stopping Insulin Infusion',
    body: '**ALL of the following criteria must be met to stop IV insulin and transition to SC insulin:**\n\n**Stopping criteria (modified from ADA 2024):** [1]\n1. **Anion gap <12** (essentially normalized, or approaching normal for chronic renal disease)\n2. **Serum bicarbonate ≥18 mEq/L** (or ≥15-20 if NAGMA present, pH >7.30)\n3. **Basal insulin given** (glargine or equivalent) at least 2 hours prior to stopping drip — ensures 24-hour coverage\n4. **Glucose <250 mg/dL** (well-controlled)\n5. **Patient tolerate oral intake** (able to eat, holding down food/fluids) — critical for transition to meal-associated insulin\n\n**Do NOT stop insulin if:**\n• Any single criterion not met\n• Patient still vomiting — cannot absorb SC insulin\n• Acidosis worsening or not improving\n• K still critically low despite repletion\n\n**Transition protocol:**\n• Once all criteria met, stop IV insulin drip\n• Continue basal glargine (given on admission)\n• Start meal-time insulin: regular insulin or rapid-acting (aspart, lispro) with meals\n• Sliding scale insulin for glucose >150: 2-4 units per 50 mg/dL above 150\n• Target glucose 120-180 mg/dL during hospitalization\n\n**Timing:** Usually 12-24 hours from presentation if no complications. Longer if severe DKA or complications present.',
    citation: [1, 2, 5],
    next: 'dka-disposition-plan',
    summary: 'Stop IV insulin when: AG <12, HCO3 >=18, glucose <250, tolerating PO, and basal given 2h+ prior.',
  },

  // =====================================================================
  // MODULE 7: SPECIAL SCENARIOS
  // =====================================================================

  {
    id: 'dka-euglycemic',
    type: 'result',
    module: 7,
    title: 'Euglycemic DKA Management',
    body: '**Euglycemic DKA: glucose 150-250 + BOHB >3 + pH <7.3, often with SGLT2i use.**\n\n**Presentation:**\n• Minimal hyperglycemia (may be euglycemic or only mildly elevated) — easily missed!\n• Nausea, vomiting, dyspnea, abdominal pain\n• Risk factors: SGLT2 inhibitors (primary), insulin pump with reduced basal dose, GLP-1 use, illness with reduced eating\n• Diagnosis: BOHB >3, pH <7.3, low-normal glucose\n\n**Unique management:**\n\n**Fluids:**\n• Start [D10W or D5W](#/drug/dextrose/) immediately — do NOT wait for glucose to drop\n• Euglycemic DKA requires dextrose infusion from the START (unlike classic DKA which waits for glucose 200-300)\n• **Normal saline** at 100-150 mL/hr PLUS [D10W](#/drug/dextrose/) at 100-150 mL/hr\n• Goal: Prevent further glucose drop while treating acidosis\n\n**Insulin:**\n• 0.1 U/kg/hr IV drip (same as classic DKA)\n• Titrate to pH/HCO3 improvement, not glucose\n• Glucose may actually decrease during early treatment (insulin + dextrose in parallel manages this)\n\n**Potassium & Electrolytes:**\n• Same aggressive approach as classic DKA\n• Check K early and often\n\n**Basal insulin:**\n• [Insulin glargine](#/drug/insulin-glargine/DKA) 0.25 U/kg on admission\n\n**CRITICAL: Discontinue SGLT2i permanently** — very high recurrence risk. Document as contraindication. [10][11]\n\n**Disposition:** ICU admission if pH <7.15 or altered mental status. Many cases can be managed on monitored floor bed with closer monitoring.',
    recommendation: 'Start D10W immediately. IV insulin 0.1 U/kg/hr. Aggressive K repletion. Discontinue SGLT2i permanently. Monitor closely for late hypoglycemia.',
    citation: [10, 11, 13],
    summary: 'Euglycemic DKA: start D10W IMMEDIATELY (do not wait). SGLT2i = permanently discontinue. Easily missed.',
    safetyLevel: 'critical',
    treatment: {
      firstLine: {
        drug: 'Dextrose 10% (D10W) + Normal saline',
        dose: 'D10W 100-150 mL/hr + NS 100-150 mL/hr',
        route: 'IV',
        frequency: 'Continuous',
        duration: 'Until acidosis resolved',
        notes: 'Start D10W IMMEDIATELY in euglycemic DKA. Do NOT wait for glucose drop. Run in parallel with NS.',
      },
      alternative: {
        drug: 'Regular insulin IV drip',
        dose: '0.1 U/kg/hr',
        route: 'IV continuous',
        frequency: 'Continuous',
        duration: 'Until DKA resolved',
        notes: 'Same protocol as classic DKA. Titrate to pH/HCO3, not glucose. Give with D10W.',
      },
      monitoring: 'Glucose q1-2h (risk of hypoglycemia). K q2h. BOHB q4-6h. Discontinue SGLT2i permanently.',
    },
  },

  {
    id: 'dka-intubation',
    type: 'info',
    module: 7,
    title: 'Intubation in DKA — Avoid if Possible',
    body: '**Intubation in DKA is HIGH RISK and generally avoided unless absolutely necessary.** [5]\n\n**Why avoid intubation:**\n• Removal of spontaneous hyperventilation → paradoxical CO2 retention and acidosis worsening\n• Positive pressure ventilation increases PEEP → worse acidosis\n• Risk of post-intubation hypotension despite fluids (loss of sympathetic tone)\n• Aspiration risk if altered MS or vomiting\n• Prolongs ICU stay\n\n**Indications for intubation (rare in pure DKA):**\n• Loss of airway protective reflexes + inability to protect\n• Respiratory failure (RR >35-40 with fatigue, inadequate gas exchange on ABG)\n• Severe altered mental status with risk of aspiration\n• Aspiration event already occurred\n• Septic shock requiring pressors (not DKA alone)\n\n**If intubation unavoidable:**\n\n**Preoperative management:**\n• AGGRESSIVE pre-intubation resuscitation — 1-2L fluid bolus if not already given\n• [Intravenous bicarbonate](#/drug/sodium-bicarbonate/DKA): Consider if pH <6.9 prior to intubation\n• Correct severe hyperkalemia (K >6.5) with insulin bolus\n\n**Drug selection:**\n• Induction: [Ketamine](#/drug/ketamine/induction) preferred (maintains BP, does not worsen acidosis)\n• Avoid propofol (myocardial depression), avoid theophylline derivatives\n\n**Ventilation post-intubation:**\n• High minute ventilation (MV): 12-18 L/min to maintain hyperventilation \n• Large ETT: ≥7.5 to allow high tidal volumes without excessive pressure\n• Mode: Assist-control (not pressure-limited)\n• PEEP: Minimize (0-5 cm H2O)\n\n**Monitoring:** Frequent ABGs (q30min × 2h, then q1-2h), K monitoring, sedation adequate to allow hyperventilation',
    citation: [1, 2, 5],
    next: 'dka-disposition-plan',
    treatment: {
      firstLine: {
        drug: 'Ketamine',
        dose: '1-2 mg/kg',
        route: 'IV push',
        frequency: 'Single induction dose',
        duration: 'Induction only',
        notes: 'Preferred induction agent. Maintains BP and does not worsen acidosis. AVOID propofol.',
      },
      alternative: {
        drug: 'Sodium bicarbonate (pre-intubation)',
        dose: '50-100 mEq',
        route: 'IV',
        frequency: 'Prior to intubation',
        duration: 'Single dose',
        notes: 'Consider if pH <6.9. Helps buffer acidosis worsening from loss of hyperventilation.',
      },
      monitoring: 'ABG q30min x2h then q1-2h. High MV (12-18 L/min). Minimize PEEP (0-5 cm H2O). Large ETT (>=7.5).',
    },
    summary: 'Avoid intubation if possible — loss of hyperventilation worsens acidosis. Use ketamine if unavoidable.',
    safetyLevel: 'critical',
  },

  {
    id: 'dka-recurrent',
    type: 'result',
    module: 7,
    title: 'Recurrent DKA (Prior Episode)',
    body: '**Recurrent DKA (≥2 episodes in 12 months) is a marker of adherence, psychiatric, or social problems with very high mortality (~5-10% per episode).**\n\n**Management differs from first presentation:**\n\n**Acute phase:**\n• Same insulin protocol (0.1 U/kg/hr drip or higher if needed)\n• Aggressive K repletion — maintain K >5 throughout\n• TREAT NAGMA aggressively with IV bicarbonate (more likely to develop in recurrent cases)\n• Higher threshold for ICU admission — coordinate psychiatry/social work early\n\n**Basal insulin intensification:**\n• Significantly uptitrate [insulin glargine](#/drug/insulin-glargine/DKA) at discharge\n• May need 0.4-0.5 U/kg/day (higher than standard new-onset doses)\n• Consider basal-bolus therapy (basal glargine + meal-time rapid-acting insulin)\n• Consider insulin pump if on MDI (some patients adhere better to pump)\n\n**Addressing root cause:**\n• **Psychiatric evaluation:** Screen for depression, bipolar disorder, anxiety — DKA often triggered by psychiatric crisis or substance use\n• **Behavioral health referral:** Therapy, crisis plan, medication optimization\n• **Social work:** Address food insecurity, housing, healthcare access, insurance\n• **Substance use screening:** Alcohol, opioids, stimulants — may precipitate missed insulin doses\n• **Provider continuity:** Assign primary care and endocrinology team to reduce fragmentation\n\n**Education:**\n• Intensive diabetes education (some patients benefit from home health nursing)\n• Sick-day rules written down and reviewed\n• Emergency contact numbers — encourage use before ER visit\n\n**Disposition:** Admission to monitored bed (or ICU if severe). Psychiatry, case management, and endocrinology consults mandatory before discharge. Discharge directly to outpatient support (not home alone).',
    recommendation: 'ICU or monitored admission. Aggressive basal insulin uptitration. Psychiatry evaluation and referral. Social work intervention. Address adherence barriers. Endocrinology continuity.',
    citation: [1, 5],
    summary: 'Recurrent DKA = psychiatric/social crisis marker. Uptitrate glargine, mandate psych eval and social work.',
  },

  {
    id: 'dka-hd-patient-result',
    type: 'result',
    module: 7,
    title: 'Hemodialysis Patient — Detailed Protocol',
    body: '**HD patients with DKA have unique needs: euvolemia/hypervolemia, limited K tolerance, accelerated correction possible via dialysis.**\n\n**Pathophysiology:**\n• Usually euvolemic or hypervolemic — aggressive fluids cause pulmonary edema, hypertensive crisis\n• K does NOT drain into dialysate if K concentration in bath = patient K (thus K may rise despite dialysis if not on low-K bath)\n• Acidosis can be corrected rapidly via hemodialysis (HCO3 diffusion and lactate clearance)\n\n**Fluid management:**\n• MINIMAL: 250-500 mL NS bolus only if hypotensive (SBP <90)\n• Maintenance: 50-100 mL/hr NS at most, often no separate NS infusion\n• Primary therapy: Insulin + dextrose\n\n**Insulin:**\n• 0.1 U/kg/hr IV drip (standard)\n• Once glucose <300 → switch to D10W (minimal NS)\n• Do NOT restrict insulin based on glucose alone — titrate to acid-base improvement\n\n**Potassium:**\n• VERY restrictive — do NOT supplement potassium even if K 4.5-5.5 (high end normal)\n• May only need [potassium acetate](#/drug/potassium-acetate/DKA) if K <3.0 (rare)\n• Use LOW-potassium dialysate bath (usually 1-2 mEq/L)\n• Coordinate dialysis K bath with nephrology\n\n**Dialysis integration:**\n• Schedule dialysis within first 4-6 hours of DKA diagnosis if available\n• Hemodialysis rapidly corrects K, H+, and metabolic acidosis (much faster than IV therapy alone) [1]\n• Dialysate composition: Low K bath (1 mEq/L) + bicarb bath 35-40 mEq/L\n• May need higher blood flow (300-400 mL/min) during DKA\n\n**Resolution criteria (differ from non-HD):**\n• Use **BOHB <1 mmol/L** as resolution marker (not AG normalization — AG may not close with renal disease)\n• May discharge when BOHB <1, able to eat, K stable, prior bicarb level achieved\n• pH <7.30 acceptable if trending up and BOHB very low\n\n**Disposition:** Monitored bed (ICU if severe). Nephrology co-management. Dialysis as first-line for severe DKA (pH <6.9, K >6.5).',
    recommendation: 'Minimal fluid resuscitation. Insulin + dextrose protocol. Restrict K. Coordinate dialysis STAT for K/acid removal. Use BOHB <1 for resolution. Nephrology co-management.',
    citation: [1, 2, 14],
    treatment: {
      firstLine: {
        drug: 'Regular insulin IV + Dextrose 10%',
        dose: 'Insulin 0.1 U/kg/hr + D10W when glucose <300',
        route: 'IV',
        frequency: 'Continuous',
        duration: 'Until BOHB <1 mmol/L',
        notes: 'Primary therapy. Minimal fluids. Titrate insulin to pH/HCO3, not glucose.',
      },
      alternative: {
        drug: 'Hemodialysis (urgent)',
        dose: 'Low K bath (1-2 mEq/L) + bicarb bath 35-40 mEq/L',
        route: 'HD circuit',
        frequency: 'Single session, may extend',
        duration: '3-4 hours or until stable',
        notes: 'First-line for severe DKA (pH <6.9, K >6.5). Blood flow 300-400 mL/min. Coordinate with nephrology.',
      },
      monitoring: 'BOHB for resolution (not AG). Very restricted K supplementation. POCUS for volume. Nephrology co-management.',
    },
    summary: 'HD DKA: insulin + D10W, minimal NS, restrict K+, low-K dialysate, BOHB <1 for resolution (not AG).',
    safetyLevel: 'warning',
  },

  {
    id: 'dka-disposition-plan',
    type: 'question',
    module: 7,
    title: 'Disposition Planning',
    body: '**DKA severity, presence of complications, and social stability determine discharge vs admission level.**\n\n**ICU admission criteria:**\n• pH <7.1 or HCO3 <10 (severe DKA)\n• Altered mental status (GCS <13)\n• Respiratory distress (RR >30, O2 requirement, considered for intubation)\n• Hemodynamic instability (SBP <90 despite fluids, need vasopressors)\n• Complications: myocardial infarction, stroke, mesenteric ischemia, sepsis\n• Recurrent DKA or behavioral/psychiatric crisis\n• Age >65 with comorbidities\n• Pregnancy\n• ESRD/HD patient\n• Osmolality >320\n\n**Monitored floor bed criteria:**\n• Mild-moderate DKA (pH 7.00-7.30, HCO3 10-18)\n• Stable hemodynamics\n• Alert and oriented\n• No acute complications\n• Social stability (home support, follow-up capability)\n\n**Step-down to general floor (rare, usually still needs monitoring):**\n• Well-controlled glucose on SC insulin\n• Eating well\n• No complications\n• Very mild presentation (pH >7.25 only)\n\n**Discharge direct from ED (extremely rare):**\n• Very mild DKA (pH ~7.25-7.30, minimal symptoms)\n• Reliable patient, good support system\n• Can follow up within 24 hours with primary care + endocrinology\n• Most DKA patients should be admitted for monitoring',
    citation: [1, 2, 5],
    options: [
      {
        label: 'ICU Admission',
        description: 'Severe DKA, complications, hemodynamic instability, altered MS',
        next: 'dka-icu-orders',
        urgency: 'critical',
      },
      {
        label: 'Monitored Floor Admission',
        description: 'Moderate DKA, stable hemodynamics, alert, no complications',
        next: 'dka-floor-orders',
      },
      {
        label: 'Consider Discharge Planning',
        description: 'Very mild DKA, excellent adherence history, strong support',
        next: 'dka-discharge-planning',
      },
    ],
    summary: 'ICU if pH <7.1, altered MS, shock, ischemia, pregnancy, or ESRD. Most DKA = monitored floor minimum.',
  },

  {
    id: 'dka-icu-orders',
    type: 'result',
    module: 7,
    title: 'ICU Admission Orders',
    body: '**ICU-level DKA management:**\n\n**Monitoring:**\n• Continuous cardiac monitor, pulse oximetry, capnography if intubated\n• Arterial line if shock or severe acidosis (pH <6.9)\n• Hourly vitals, UOP q1h, neuro q1h\n• Labs: VBG/ABG q1-2h × 4h, then q2-4h. BMP q2h × 6h then q4h. Lactate q4h. BOHB q4-6h\n\n**Medications:**\n• [Regular insulin IV drip](#/drug/regular-insulin/DKA): 0.1 U/kg/hr (adjust per protocol)\n• [Insulin glargine](#/drug/insulin-glargine/DKA) 0.25-0.3 U/kg SC daily (given on admission)\n• [Potassium chloride or acetate IV](#/drug/potassium-chloride-iv/DKA): Aggressive repletion (40 mEq/hr if K <3.3, then maintenance per K level)\n• **Normal saline or balanced crystalloid**: IV bolus then maintenance (or switch to D10W once glucose <300)\n• [Magnesium sulfate](#/drug/magnesium-sulfate/DKA): 1-2 g IV once if Mg <1.5\n• [Thiamine](#/drug/thiamine/DKA): 100 mg IV on admission\n• Consider [sodium bicarbonate](#/drug/sodium-bicarbonate/DKA) if pH <6.9 (250 mL isotonic or ampules)\n\n**Consultations:**\n• Endocrinology (mandatory)\n• Nephrology if ESRD/HD or worsening Cr\n• Cardiology if troponin elevated or EKG abnormal\n• Infectious disease if sepsis confirmed\n• Psychiatry if recurrent DKA or suicidal ideation\n\n**Disposition trigger:** When stable (pH >7.25, HCO3 >15, glucose controlled, tolerating PO), stepdown to monitored floor; discharge when all stopping criteria met.',
    recommendation: 'ICU admission. Hourly reassessment. Insulin + aggressive electrolyte repletion. Endocrinology, and specialist consultations as indicated. Serial labs q1-4h.',
    citation: [1, 2, 5],
    summary: 'ICU orders: insulin drip + glargine, aggressive K+, NS/D10W, thiamine, bicarb if pH <6.9. Labs q1-2h.',
    treatment: {
      firstLine: {
        drug: 'Regular insulin IV drip',
        dose: '0.1 U/kg/hr',
        route: 'IV continuous',
        frequency: 'Continuous, adjust per glucose',
        duration: 'Until DKA resolved',
        notes: 'Reduce to 0.05 U/kg/hr when glucose <250. Never stop for hypoglycemia, give D10W instead.',
      },
      alternative: {
        drug: 'Insulin glargine (basal)',
        dose: '0.25-0.3 U/kg',
        route: 'Subcutaneous',
        frequency: 'Once daily',
        duration: 'Give on admission, continue at discharge',
        notes: 'Give within 6-12 hrs. Must overlap with IV drip by 2+ hrs before stopping drip.',
      },
      monitoring: 'Continuous cardiac monitor. VBG/ABG q1-2h x4h then q2-4h. BMP q2h x6h then q4h. K q1-2h. Glucose q1-2h. UOP q1h.',
    },
  },

  {
    id: 'dka-floor-orders',
    type: 'result',
    module: 7,
    title: 'Monitored Floor Admission Orders',
    body: '**Moderate DKA on monitored medical floor:**\n\n**Monitoring:**\n• Continuous cardiac monitor + continuous pulse oximetry\n• Vitals q2h, UOP q1h\n• Labs: VBG/ABG q2-4h initially, then q4-6h. BMP q2-4h × 6h then q6h. Lactate q4-6h initially.\n• Neuro checks q2-4h (watch for cerebral edema — rare but catastrophic)\n\n**Medications:**\n• [Regular insulin IV drip](#/drug/regular-insulin/DKA): 0.1 U/kg/hr IV (adjust per glucose response)\n• [Insulin glargine](#/drug/insulin-glargine/DKA) 0.25 U/kg SC daily (given on admission)\n• [Potassium chloride or acetate IV](#/drug/potassium-chloride-iv/DKA): 20-40 mEq/hr per K level (goal K >5)\n• **Normal saline** then [D10W](#/drug/dextrose/) per \"drop and split\" protocol\n• [Magnesium sulfate](#/drug/magnesium-sulfate/DKA): 1-2 g IV if Mg low\n• [Thiamine](#/drug/thiamine/DKA): 100 mg IV on admission\n\n**Consultations:**\n• Endocrinology (routine, can consult next business day if needed)\n• Case management/social work (address precipitants, discharge planning)\n• Psychiatry if recurrent DKA or mental health concern\n\n**Diet/Activity:**\n• NPO until tolerating PO and glucose <250\n• Once able to eat: start meal-associated insulin (regular or rapid-acting 2-4U with meals)\n• Add sliding scale (2-4 U per 50 mg/dL glucose >150)\n\n**Discharge criteria:**\n• All DKA stopping criteria met (AG <12, HCO3 >18, basal insulin given 2+ hrs ago, glucose <250, tolerating PO)\n• Stable glucose on SC insulin ×2-4 doses\n• Patient education completed\n• Follow-up arranged (endocrinology within 1-2 weeks, PCP within 1 week)\n• Discharge medications and sick-day rules provided',
    recommendation: 'Admit to monitored floor. Insulin + electrolyte protocol. Endocrinology and case management consults. Discharge when stopping criteria met + patient stable on SC insulin.',
    citation: [1, 2, 5],
    summary: 'Floor orders: insulin drip, glargine, K+ repletion, D10W protocol, labs q2-4h. Discharge when all criteria met.',
    treatment: {
      firstLine: {
        drug: 'Regular insulin IV drip',
        dose: '0.1 U/kg/hr',
        route: 'IV continuous',
        frequency: 'Continuous',
        duration: 'Until DKA resolved',
        notes: 'Reduce to 0.05 U/kg/hr when glucose <250. Switch to D10W per drop-and-split protocol.',
      },
      alternative: {
        drug: 'Potassium chloride or acetate',
        dose: '20-40 mEq/hr',
        route: 'IV',
        frequency: 'Continuous per K level',
        duration: 'Goal K >5 throughout treatment',
        notes: 'Aggressive repletion essential. Acetate preferred to reduce chloride load.',
      },
      monitoring: 'Continuous cardiac monitor. VBG q2-4h then q4-6h. BMP q2-4h x6h then q6h. Glucose q1-2h. Neuro q2-4h.',
    },
  },

  {
    id: 'dka-insulin-pump',
    type: 'question',
    module: 7,
    title: 'Insulin Pump User — Troubleshooting & Management',
    body: '**Pump users develop DKA RAPIDLY — often 4-8 hours from pump failure to severe DKA.**\n\n**Why pump DKA is different:**\n• No long-acting basal insulin depot — rely 100% on continuous delivery\n• Pump failure = complete insulin deficiency within hours\n• Often MORE severe at presentation (pH <7.0 common)\n• Rapid onset ketosis masks early symptoms\n\n**STEP 1: Troubleshoot the pump system:**\n\n**Infusion site inspection:**\n• Check insertion site for erythema, induration, leakage, blood in tubing\n• Kinked or dislodged cannula? (most common cause)\n• Lipohypertrophy at site? (causes erratic absorption)\n• How long since site change? (>3 days = high failure risk)\n\n**Reservoir/cartridge check:**\n• Is there insulin remaining?\n• Is insulin cloudy, discolored, or expired?\n• Air bubbles in reservoir or tubing?\n\n**Pump device inspection:**\n• Battery status?\n• Any alarm history? (occlusion, low reservoir, delivery failure)\n• Is pump showing active basal delivery?\n• Review bolus history — missed meal boluses?\n\n**Tubing check:**\n• Kinks, disconnections, or cracks?\n• Primed after cartridge change?\n\n**STEP 2: Immediate management decision:**',
    citation: [1, 2, 5, 14],
    options: [
      {
        label: 'Pump Malfunction Identified',
        description: 'Site failure, occlusion, empty reservoir, device error',
        next: 'dka-pump-malfunction',
        urgency: 'critical',
      },
      {
        label: 'Pump Functioning — Other Cause',
        description: 'Pump appears normal, likely infection or other precipitant',
        next: 'dka-pump-functioning',
      },
      {
        label: 'Unknown — Treat Empirically',
        description: 'Cannot assess pump or unclear cause',
        next: 'dka-pump-empiric',
        urgency: 'urgent',
      },
    ],
    summary: 'Pump DKA is rapid (4-8h to severe). Check site, reservoir, tubing, alarms. Suspend if any doubt.',
  },

  {
    id: 'dka-pump-malfunction',
    type: 'question',
    module: 7,
    title: 'Pump Malfunction — Suspend vs Continue',
    body: '**When pump has clearly failed:**\n\n**SUSPEND THE PUMP immediately** if:\n• Site infection/abscess at insertion site\n• Cannula completely dislodged or kinked\n• Device error/alarm showing delivery failure\n• Empty reservoir discovered\n• Significant air in tubing\n• Patient unable to manage pump during illness\n\n**After suspending:**\n• Remove infusion set and cap the reservoir\n• Document pump settings (basal rates, correction factor, I:C ratio) for later\n• Patient keeps pump for outpatient follow-up\n\n**Start IV insulin protocol:**\n• 0.1 U/kg/hr IV drip (standard DKA protocol)\n• [Insulin glargine](#/drug/insulin-glargine/DKA) 0.25-0.3 U/kg SC within 6-12 hours\n• Aggressive K+ repletion (pump users often severely K+ depleted)\n\n**What about restarting the pump?**',
    citation: [1, 2, 5],
    options: [
      {
        label: 'Suspend Pump — IV Insulin Only',
        description: 'Clear malfunction, start IV drip, transition to MDI or restart pump outpatient',
        next: 'dka-pump-suspended',
        urgency: 'critical',
      },
      {
        label: 'Patient Wants to Restart Pump',
        description: 'Fixed issue, experienced pump user, wants to resume',
        next: 'dka-pump-restart-criteria',
      },
    ],
    summary: 'Suspend pump immediately if malfunction found. Document settings, remove set, start IV insulin drip.',
  },

  {
    id: 'dka-pump-suspended',
    type: 'result',
    module: 7,
    title: 'Pump Suspended — IV Insulin Protocol',
    body: '**Pump OFF — manage as standard severe DKA:**\n\n**Acute phase (IV insulin):**\n• [Regular insulin drip](#/drug/regular-insulin/DKA) 0.1 U/kg/hr\n• Aggressive fluid resuscitation (pump DKA often MORE dehydrated)\n• [Potassium](#/drug/potassium-chloride-iv/DKA) repletion per protocol (goal K+ >5 during treatment)\n• Switch to D10W when glucose <300\n\n**Basal insulin bridge:**\n• [Insulin glargine](#/drug/insulin-glargine/DKA) 0.25-0.3 U/kg SC within 6-12 hours\n• This is CRITICAL — prevents rebound DKA when IV stopped\n• If patient was on pump basal ~24 U/day → glargine ~20-24 U (slightly less, adjust for illness)\n\n**Transition options:**\n\n**Option A: Discharge on MDI (multiple daily injections):**\n• Basal: Continue glargine at ~80% of pump total daily basal\n• Bolus: [Insulin lispro](#/drug/insulin-lispro/DKA) or aspart with meals using patient\'s known I:C ratio\n• Correction: Same correction factor patient used on pump\n• Follow-up with endocrinology within 1 week to restart pump\n\n**Option B: Restart pump before discharge:**\n• Only if patient experienced, DKA fully resolved, and clear cause identified/fixed\n• See pump restart criteria\n\n**Documentation:**\n• Record pump settings (basal rates by hour, I:C ratios, correction factor, active insulin time)\n• Include pump brand/model for outpatient team\n• Note suspected cause of failure',
    recommendation: 'Suspend pump. IV insulin 0.1 U/kg/hr. Glargine 0.25 U/kg SC within 6-12h. Transition to MDI or supervised pump restart. Endocrinology follow-up within 1 week.',
    citation: [1, 2, 5, 14],
    summary: 'Pump off: IV insulin drip + glargine SC bridge. Document pump settings for outpatient endo follow-up.',
    treatment: {
      firstLine: {
        drug: 'Regular insulin IV + Insulin glargine SC',
        dose: 'Drip 0.1 U/kg/hr + Glargine 0.25-0.3 U/kg',
        route: 'IV continuous + SC daily',
        frequency: 'Drip continuous, glargine once',
        duration: 'Drip until DKA resolved, glargine ongoing',
        notes: 'Give glargine within 6-12h of admission. Overlap drip x2h after glargine before stopping.',
      },
      alternative: {
        drug: 'Insulin lispro or aspart (bolus)',
        dose: 'Per patient\'s I:C ratio',
        route: 'SC',
        frequency: 'With meals',
        duration: 'Ongoing',
        notes: 'Start when eating. Use patient\'s known pump settings for dosing.',
      },
      monitoring: 'Standard DKA monitoring. Document pump settings for outpatient team.',
    },
  },

  {
    id: 'dka-pump-restart-criteria',
    type: 'result',
    module: 7,
    title: 'Pump Restart Criteria — Before Discharge',
    body: '**Restarting pump in hospital is ONLY appropriate if ALL criteria met:**\n\n**Required criteria:**\n• ✓ DKA fully resolved (AG <12, HCO3 >18, pH >7.30, glucose <250)\n• ✓ Patient alert, oriented, able to manage pump\n• ✓ Clear cause of failure identified AND corrected\n• ✓ Patient experienced pump user (>6 months on pump)\n• ✓ Endocrinology approves restart\n• ✓ New infusion set placed at DIFFERENT site\n• ✓ Fresh insulin cartridge loaded\n• ✓ Pump settings verified correct\n\n**Contraindications to inpatient pump restart:**\n• ✗ Site infection (needs 48-72h antibiotics before new site)\n• ✗ Recurrent pump DKA (2+ episodes in 12 months)\n• ✗ Patient overwhelmed, fatigued, or unable to focus\n• ✗ Cause unclear — may recur\n• ✗ Psychiatric crisis or intentional noncompliance\n• ✗ No endocrinology input available\n\n**If restarting:**\n• Resume at ~80-90% of usual basal rate (illness increases insulin resistance but also infection risk)\n• Correction boluses via pump\n• Keep glargine dose on board for 12-24h overlap\n• Monitor glucose q1-2h for first 6 hours\n• Patient must have working pump supplies for home\n\n**Discharge instructions:**\n• New site every 2-3 days maximum\n• Check ketones if glucose >300 or nausea/vomiting\n• Sick-day rules: Do NOT suspend pump during illness\n• Have backup insulin pens at home\n• Low threshold to return if symptoms recur',
    recommendation: 'Only restart pump if ALL criteria met. Overlap with glargine x12-24h. Monitor q1-2h x6h. Ensure backup supplies and sick-day education. Endocrinology must approve.',
    citation: [1, 2, 5],
    summary: 'Restart pump inpatient ONLY if all criteria met, endo approves, and cause clearly fixed. Otherwise MDI.',
  },

  {
    id: 'dka-pump-functioning',
    type: 'info',
    module: 7,
    title: 'Pump Functioning — Investigate Other Causes',
    body: '**If pump appears to be working correctly, DKA was triggered by another cause:**\n\n**Common causes in pump users with functioning pumps:**\n• **Infection** — UTI, pneumonia, skin/soft tissue (most common)\n• **Missed boluses** — meals without boluses (check pump history)\n• **Illness-related insulin resistance** — basal rate inadequate during acute illness\n• **Site absorption issues** — lipohypertrophy, scarring (pump "working" but insulin not absorbing)\n• **Gastroparesis** — delayed gastric emptying causing mismatch between bolus and absorption\n\n**Management:**\n• Continue pump OR switch to IV insulin (either acceptable)\n• If continuing pump:\n  - Increase basal rate by 20-50% for illness\n  - Correction boluses via pump q2-4h\n  - Monitor closely — switch to IV if not improving in 4-6h\n• If switching to IV: Suspend pump, standard IV protocol\n\n**Pump history review (important!):**\n• Download or review last 72h of pump data\n• Look for missed meal boluses, suspended periods, site changes\n• Basal delivery vs programmed — discrepancy = delivery failure\n\n**Treat underlying precipitant per standard DKA protocol.**',
    citation: [1, 2, 5],
    next: 'dka-precipitant-screen',
    summary: 'Pump working but DKA occurred — check for missed boluses, infection, or site absorption failure.',
    skippable: true,
  },

  {
    id: 'dka-pump-empiric',
    type: 'result',
    module: 7,
    title: 'Unknown Pump Status — Empiric Management',
    body: '**When pump status unclear or cannot be assessed:**\n\n**Default approach: Suspend pump and start IV insulin**\n\nRationale: IV insulin gives predictable delivery and tight control during critical illness. Pump can be reassessed when patient stable.\n\n**Steps:**\n1. **Suspend pump** — remove infusion set, cap reservoir\n2. **Document pump settings** if accessible (photo of settings screen helpful)\n3. **Start IV insulin** 0.1 U/kg/hr\n4. **Give basal glargine** 0.25 U/kg SC within 6-12h\n5. **Standard DKA protocol** — fluids, K+, monitoring\n\n**When patient stable:**\n• Full pump interrogation (download history)\n• Determine cause of DKA\n• Decide: restart pump vs transition to MDI\n• Endocrinology consultation\n\n**Key point:** Do NOT let pump troubleshooting delay insulin therapy. If any doubt about pump function, start IV insulin immediately.\n\n**Hybrid closed-loop systems (670G, 780G, t:slim Control-IQ, Omnipod 5):**\n• These auto-adjust basal but can still fail\n• Sensor failures cause algorithm to revert to preset basal (may be inadequate)\n• Still suspend and use IV insulin during severe DKA\n• Resume only after full resolution and system check',
    recommendation: 'Suspend pump if any uncertainty. Start IV insulin 0.1 U/kg/hr immediately. Give glargine 0.25 U/kg SC. Full pump assessment when patient stable.',
    citation: [1, 2, 5],
    summary: 'When in doubt: suspend pump, start IV insulin immediately. Do NOT let troubleshooting delay treatment.',
    treatment: {
      firstLine: {
        drug: 'Regular insulin IV drip',
        dose: '0.1 U/kg/hr',
        route: 'IV continuous',
        frequency: 'Continuous',
        duration: 'Until DKA resolved',
        notes: 'Do not delay for pump troubleshooting. Suspend pump and start IV.',
      },
      alternative: {
        drug: 'Insulin glargine (basal bridge)',
        dose: '0.25 U/kg',
        route: 'SC',
        frequency: 'Once',
        duration: 'Within 6-12h of admission',
        notes: 'Critical to prevent rebound DKA. Overlap with IV drip.',
      },
      monitoring: 'Standard DKA monitoring. Pump interrogation when patient stable. Endocrinology consult.',
    },
  },

  {
    id: 'dka-discharge-planning',
    type: 'result',
    module: 7,
    title: 'Discharge Planning & Follow-Up',
    body: '**For very mild DKA (pH >7.25, HCO3 >15) in highly reliable patient with excellent support:**\n\n**Discharge checklist (ALL must be met):**\n• ✓ DKA resolved per stopping criteria (AG <12, HCO3 >18, tolerating PO, glucose <250)\n• ✓ Stable on SC basal + bolus insulin ×2-4 doses\n• ✓ Electrolytes normal (K 3.5-5.5, Mg >1.5, Phos >1.5)\n• ✓ Understanding of sick-day rules\n• ✓ Adequate insulin supply (pens, vials, syringes, or pump supplies)\n• ✓ Emergency glucagon kit or similar hypoglycemia rescue\n• ✓ Reliable transportation\n• ✓ Phone access for follow-up calls\n• ✓ Identified prescriber (PCP or endocrinologist)\n\n**Discharge medications:**\n• [Insulin glargine](#/drug/insulin-glargine/maintenance) (basal) — dose from hospitalization\n• Rapid-acting or regular insulin (bolus) — meal-time dosing\n• Metformin or other agents if not contraindicated (often held during acute phase, restart if GFR adequate)\n\n**Discharge education (written):**\n• **Sick-day rules:** Never skip insulin even if unable to eat; use dextrose instead of meal\n• **Hypoglycemia symptoms & glucagon use:** When to call 911 vs treat at home\n• **Hyperglycemia warning signs:** Nausea, dyspnea, fruity breath — seek care immediately\n• **Insulin administration:** Injection technique, storage, expiration\n• **Dietary guidelines:** Regular meals, hydration, carbohydrate consistency\n• **Exercise:** Adjust insulin for activity, carry fast carbs\n\n**Follow-up (CRITICAL):**\n• **Endocrinology:** Appointment within 2-4 weeks\n• **Primary care:** Within 1 week\n• **Diabetes educator:** Within 1-2 weeks (certified educators preferred)\n• **Case management:** Phone call within 24 hours to confirm discharge arrangements\n\n**Documentation:**\n• Precipitant clearly documented\n• Discharge summary includes basal + bolus insulin regimen, K level at discharge, glucose trend\n• Copy to endocrinologist + PCP\n\n**Return precautions (written & verbal):**\n• Nausea/vomiting >2 episodes\n• Dyspnea or chest pain\n• Altered mental status\n• Inability to take insulin or eat for 2+ hours\n• Glucose >400 despite insulin\n• Fever or signs of infection\n• Any DKA symptoms: fruity breath, severe fatigue, abdominal pain',
    recommendation: 'Discharge to home with strong outpatient support. Insulin supply + glucagon kit. Written sick-day rules & warning signs. PCP + endocrinology within 1-2 weeks. Case management follow-up call within 24h.',
    citation: [1, 2, 5, 15],
    summary: 'Discharge only if all criteria met, insulin supply secured, sick-day rules taught, and follow-up within 1-2 weeks.',
  },

];

export const DKA_MODULE_LABELS = [
  'Diagnosis — Is This DKA?',
  'Severity Assessment',
  'Evaluate Precipitating Cause',
  'Initial Resuscitation — Fluids',
  'Insulin Management & Potassium',
  'Electrolytes & Monitoring',
  'Special Scenarios & Disposition',
];

export const DKA_CRITICAL_ACTIONS = [
  { text: 'IV fluid bolus 500-1000 mL NS over 30-60 min for volume depletion/shock', nodeId: 'dka-fluid-management' },
  { text: 'Check K+ before starting insulin - hold insulin if K+ <3.3 mEq/L', nodeId: 'dka-initial-insulin' },
  { text: 'Regular insulin infusion 0.1 units/kg/hr (or 0.14 units/kg/hr per 2024 guidelines) after K+ ≥3.3', nodeId: 'dka-initial-insulin' },
  { text: 'Add dextrose to IV fluids when glucose drops to 200-250 mg/dL to prevent hypoglycemia', nodeId: 'dka-dextrose-timing' },
  { text: 'Potassium repletion 20-40 mEq/L in IV fluids if K+ 3.3-5.3 (avoid if K+ >5.3)', nodeId: 'dka-k-repletion' },
  { text: 'Check β-hydroxybutyrate (BOHB) ≥3 mmol/L to confirm DKA diagnosis', nodeId: 'dka-bohb-interpret' },
  { text: 'Repeat labs q2-4h: BMP, glucose, anion gap, BOHB until DKA resolved', nodeId: 'dka-monitoring-protocol' },
  { text: 'DKA resolution: glucose <200 + anion gap <12 + pH >7.3 + HCO₃ >18', nodeId: 'dka-resolution-criteria' },
  { text: 'Overlap insulin: continue IV insulin x1-2 hours after starting subcutaneous insulin', nodeId: 'dka-insulin-transition' },
  { text: 'Identify and treat precipitant (infection most common) to prevent recurrence', nodeId: 'dka-precipitant' },
  { text: 'PUMP USERS: Suspend pump if malfunction suspected — start IV insulin, do not delay for troubleshooting', nodeId: 'dka-insulin-pump' },
];

export const DKA_CITATIONS: Citation[] = [
  { num: 1, text: 'Umpierrez GE, Davis GM, ElSayed NA, et al. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report. Diabetes Care. 2024;47(8):1257-1275.' },
  { num: 2, text: 'Farkas J. Diabetic Ketoacidosis (DKA). Internet Book of Critical Care (IBCC). Updated Sep 2025.' },
  { num: 3, text: 'Dhatariya KK, Glaser NS, Codner E, Umpierrez GE. Diabetic ketoacidosis. Nat Rev Dis Primers. 2020;6(1):40.' },
  { num: 4, text: 'Canadian Diabetes Association, Goguen J, Gilbert J. Hyperglycemic emergencies in adults. Can J Diabetes. 2013;37 Suppl 1:S72-6.' },
  { num: 5, text: 'Long B, Willis GC, Lentz S, et al. Evaluation and Management of the Critically Ill Adult With Diabetic Ketoacidosis. J Emerg Med. 2020;59(3):371-383.' },
  { num: 6, text: 'Griffey RT, Schneider RM, et al. SQuID II: Clinical and operational effectiveness of subcutaneous insulin protocol. Acad Emerg Med. 2025;32(1):61-71.' },
  { num: 7, text: 'Slovis CM, Mork VG, et al. Diabetic ketoacidosis and infection: leukocyte count and neutrophil-to-lymphocyte ratio as early predictors. Am J Emerg Med. 1987;5(1):1-5.' },
  { num: 8, text: 'Self WH, Evans CS, Jenkins CA, et al. Clinical Effects of Balanced Crystalloids vs Saline in Adults With Diabetic Ketoacidosis. JAMA Netw Open. 2020;3(11):e2024596.' },
  { num: 9, text: 'Cardoso L, Vicente N, et al. Controversies in management of hyperglycaemic emergencies. Metabolism. 2017;68:43-54.' },
  { num: 10, text: 'Rawla P, Vellipuram AR, et al. Euglycemic diabetic ketoacidosis: a diagnostic and therapeutic dilemma. Endocrinol Diabetes Metab Case Rep. 2017;2017:17-0081.' },
  { num: 11, text: 'Long B, Lentz S, et al. Euglycemic diabetic ketoacidosis: Etiologies, evaluation, and management. Am J Emerg Med. 2021;44:157-160.' },
  { num: 12, text: 'Kitabchi AE, Umpierrez GE, et al. Hyperglycemic crises in adult patients with diabetes: a practical approach. Diabetes Care. 2009;32(7):1335-43.' },
  { num: 13, text: 'Mehta AE, Zimmerman R. Classic diabetic ketoacidosis and the euglycemic variant. Cleve Clin J Med. 2025;92(1):33-39.' },
  { num: 14, text: 'Fayfman M, Pasquel FJ, Umpierrez GE. Management of Hyperglycemic Crises: Diabetic Ketoacidosis and Hyperglycemic Hyperosmolar State. Med Clin North Am. 2017;101(3):587-606.' },
  { num: 15, text: 'EBMedicine. Diabetic Hyperglycemic Emergencies: A Systematic Approach to Diagnosis and Management. Emergency Medicine Practice. 2020;22(2):1-20.' },
];
