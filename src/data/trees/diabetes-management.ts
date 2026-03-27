// MedKitt - Diabetes Management
// Comprehensive inpatient/outpatient glucose management for EM and hospital medicine
// 5 modules: Initial Assessment -> Hypoglycemia -> Inpatient Hyperglycemia -> Outpatient Management -> Special Situations
// ~50 nodes total

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const DIABETES_MANAGEMENT_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'dm-start',
    type: 'info',
    module: 1,
    title: 'Diabetes Management - Initial Assessment',
    body: '[Diabetes Management Steps Summary](#/info/dm-summary) - quick reference.\n\n**Approach to the diabetic patient:**\n\n**Immediate triage based on glucose level:**\n- Glucose <70 mg/dL: [Hypoglycemia pathway](#/node/dm-hypo-severity)\n- Glucose 70-180 mg/dL: Assess for DKA/HHS risk factors\n- Glucose 180-300 mg/dL: Mild hyperglycemia, assess context\n- Glucose >300 mg/dL: Evaluate for DKA/HHS\n- Glucose >600 mg/dL: High suspicion for HHS\n\n**Critical questions:**\n1. Type 1 vs Type 2 diabetes?\n2. On insulin? What type (pump, basal-bolus, premixed)?\n3. Recent illness, missed doses, new medications?\n4. Last oral intake? NPO status?\n\n**Red flags requiring immediate action:**\n- Altered mental status\n- Kussmaul respirations (deep, rapid breathing)\n- Fruity breath odor (ketones)\n- Signs of dehydration/shock',
    citation: [1, 2],
    next: 'dm-glucose-triage',
  },

  {
    id: 'dm-glucose-triage',
    type: 'question',
    module: 1,
    title: 'Current Glucose Level',
    body: '**What is the current point-of-care glucose?**\n\nIf glucose unknown, obtain fingerstick immediately.\n\n**Clinical context matters:**\n- Symptomatic hypoglycemia can occur at higher glucose in poorly controlled diabetics\n- Euglycemic DKA (glucose <250) occurs with SGLT2 inhibitors\n- Elderly/renal patients may have HHS at lower glucose levels',
    citation: [1],
    options: [
      {
        label: 'Hypoglycemia (<70 mg/dL)',
        description: 'Or symptomatic at higher glucose',
        next: 'dm-hypo-severity',
        urgency: 'critical',
      },
      {
        label: 'Normal/Mild Hyperglycemia (70-300 mg/dL)',
        description: 'Assess for underlying cause',
        next: 'dm-dka-screen',
      },
      {
        label: 'Significant Hyperglycemia (>300 mg/dL)',
        description: 'Evaluate for DKA/HHS',
        next: 'dm-dka-screen',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'dm-dka-screen',
    type: 'question',
    module: 1,
    title: 'DKA/HHS Screening',
    body: '**Check for diabetic emergencies before routine hyperglycemia management.**\n\n**DKA criteria (any 2 of 3):** [1][2]\n- pH <7.3 or HCO3 <18 mEq/L\n- Anion gap >12\n- Beta-hydroxybutyrate >3 mmol/L (or ketones 2+)\n\n**HHS criteria:** [3]\n- Glucose >600 mg/dL\n- Serum osmolality >320 mOsm/kg\n- Minimal/no ketosis\n- pH usually >7.3\n\n**Euglycemic DKA:**\n- SGLT2 inhibitor use (empagliflozin, dapagliflozin, canagliflozin)\n- Can present with glucose 150-250 mg/dL with full DKA\n- Check beta-hydroxybutyrate if SGLT2i and any GI symptoms',
    citation: [1, 2, 3],
    options: [
      {
        label: 'DKA Confirmed or Suspected',
        description: 'Acidosis + ketosis + hyperglycemia',
        next: 'dm-dka-link',
        urgency: 'critical',
      },
      {
        label: 'HHS Suspected',
        description: 'Glucose >600, osmolality >320, no significant ketosis',
        next: 'dm-hhs-management',
        urgency: 'critical',
      },
      {
        label: 'No DKA/HHS - Routine Hyperglycemia',
        description: 'Proceed to inpatient or outpatient pathway',
        next: 'dm-type-assess',
      },
    ],
  },

  {
    id: 'dm-dka-link',
    type: 'result',
    module: 1,
    title: 'DKA Management',
    body: '**DKA requires dedicated protocol management.**\n\n[Go to DKA Consult](#/tree/dka) for comprehensive management including:\n- Fluid resuscitation strategy\n- Insulin drip protocol\n- Potassium management\n- Transition to subcutaneous insulin\n- Special populations (pregnancy, HD, SGLT2i)\n\n**Key DKA pearls:**\n- Never stop insulin just because glucose is low - add dextrose instead\n- Start basal insulin early (within 6-12h) to prevent rebound DKA\n- Resolution = AG <12, HCO3 >18, pH >7.3, eating (not just glucose normalization)',
    recommendation: 'Navigate to DKA consult for detailed protocol management.',
    citation: [1, 2],
    confidence: 'definitive',
  },

  {
    id: 'dm-hhs-management',
    type: 'result',
    module: 1,
    title: 'HHS Management',
    body: '**Hyperglycemic Hyperosmolar State (HHS)** [3]\n\n**Characteristics:**\n- Glucose often >600 mg/dL (can be >1000)\n- Serum osmolality >320 mOsm/kg\n- Minimal ketosis (BOHB usually <3)\n- pH usually >7.3\n- Profound dehydration (average 8-10L deficit)\n- Mortality 10-20% (higher than DKA)\n\n**Key differences from DKA:**\n- Slower onset (days to weeks)\n- More severe dehydration\n- Higher mortality\n- Often elderly with Type 2 DM\n- Precipitants: infection, stroke, MI, medications\n\n**Management priorities:**\n1. **Aggressive fluid resuscitation** - NS 1L/hr for first 1-2 hours, then adjust\n2. **Slower glucose correction** - Target 50-75 mg/dL/hr (faster correction risks cerebral edema)\n3. **Insulin** - May delay until fluid resuscitation begun; lower doses than DKA (0.05-0.1 U/kg/hr)\n4. **Electrolyte monitoring** - K shifts similar to DKA\n5. **Thromboprophylaxis** - High risk for VTE\n\n**Osmolality calculation:** [2 x Na] + [Glucose/18] + [BUN/2.8]',
    recommendation: 'ICU admission. Aggressive fluid resuscitation with NS. Slower glucose correction than DKA. Thromboprophylaxis. Search for precipitant.',
    citation: [3, 4],
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Normal Saline 0.9%',
        dose: '1 L/hr for 1-2 hours, then 250-500 mL/hr',
        route: 'IV',
        frequency: 'Continuous',
        duration: 'Until euvolemic',
        notes: 'Average deficit 8-10L. Switch to 0.45% NS when Na normalizes or is high. Add dextrose when glucose <300.',
      },
      alternative: {
        drug: 'Regular Insulin',
        dose: '0.05-0.1 U/kg/hr IV infusion',
        route: 'IV',
        frequency: 'Continuous',
        duration: 'Until resolution',
        notes: 'May delay until after initial fluid bolus. Lower dose than DKA. Target glucose drop 50-75 mg/dL/hr.',
      },
      monitoring: 'Glucose q1h, BMP q2-4h, osmolality q4h. ICU admission mandatory. Target osmolality decrease <3 mOsm/kg/hr.',
    },
  },

  {
    id: 'dm-type-assess',
    type: 'question',
    module: 1,
    title: 'Type 1 vs Type 2 Assessment',
    body: '**Distinguishing diabetes type affects management decisions.**\n\n**Type 1 indicators:**\n- Younger onset (though can occur at any age)\n- Normal or low BMI\n- Rapid onset of symptoms\n- History of DKA\n- On basal-bolus insulin\n- C-peptide low or undetectable\n- Autoantibodies positive (GAD65, IA-2, ZnT8)\n\n**Type 2 indicators:**\n- Older onset (though increasing in youth)\n- Overweight/obese BMI\n- Gradual symptom onset\n- May be on oral agents, GLP-1, or insulin\n- C-peptide normal or high\n- Associated metabolic syndrome\n\n**Key management implications:**\n- Type 1: NEVER stop insulin (will develop DKA)\n- Type 2: Can often manage with oral agents initially',
    citation: [1, 5],
    options: [
      {
        label: 'Type 1 or Insulin-Dependent',
        description: 'On basal-bolus, history of DKA, or confirmed Type 1',
        next: 'dm-pump-assess',
      },
      {
        label: 'Type 2 Diabetes',
        description: 'On oral agents, GLP-1, or basal insulin only',
        next: 'dm-inpatient-vs-outpatient',
      },
      {
        label: 'New Diagnosis / Unknown',
        description: 'First presentation or type unclear',
        next: 'dm-new-dx',
      },
    ],
  },

  {
    id: 'dm-pump-assess',
    type: 'question',
    module: 1,
    title: 'Insulin Pump Assessment',
    body: '**Is the patient on an insulin pump?**\n\n**Pump continuation criteria:** [6]\n- Patient is alert and able to manage pump\n- Pump is functioning properly\n- Adequate supplies available\n- Patient is eating or will be eating\n- Not going to OR\n\n**Disconnect pump if:**\n- Altered mental status\n- Unable to self-manage\n- Going to surgery/procedure\n- DKA (need IV insulin)\n- Pump malfunction\n- MRI (must remove)\n\n**When disconnecting:**\n- Start IV insulin OR basal-bolus SC within 30 minutes\n- Pump users have NO long-acting insulin - will develop DKA quickly without coverage\n- Document pump settings (basal rates, ICR, correction factor)',
    citation: [6],
    options: [
      {
        label: 'On Pump - Continue',
        description: 'Alert, functioning pump, able to manage',
        next: 'dm-pump-continue',
      },
      {
        label: 'On Pump - Disconnect',
        description: 'AMS, surgery, DKA, pump issue',
        next: 'dm-pump-disconnect',
        urgency: 'urgent',
      },
      {
        label: 'Not on Pump',
        description: 'On injections (MDI)',
        next: 'dm-inpatient-vs-outpatient',
      },
    ],
  },

  {
    id: 'dm-pump-continue',
    type: 'result',
    module: 1,
    title: 'Continue Insulin Pump',
    body: '**Insulin pump continuation protocol:** [6]\n\n**Document:**\n- Pump type and model\n- Current basal rate(s)\n- Insulin-to-carb ratio (ICR)\n- Correction factor (sensitivity)\n- Target glucose range\n- Active insulin time\n\n**Patient responsibilities:**\n- Continue self-management\n- Count carbs and bolus for meals\n- Check glucose before meals and at bedtime\n- Alert staff to any pump alarms\n- Change infusion site if indicated\n\n**Staff responsibilities:**\n- Document glucose values in EMR\n- Notify diabetes team if glucose consistently out of range\n- Have backup insulin available (basal-bolus or IV drip)\n- Know how to suspend/disconnect pump in emergency\n\n**Target glucose:** 140-180 mg/dL inpatient',
    recommendation: 'Continue patient-managed insulin pump with documented settings. Target glucose 140-180 mg/dL. Have backup insulin available.',
    citation: [6],
    confidence: 'definitive',
  },

  {
    id: 'dm-pump-disconnect',
    type: 'result',
    module: 1,
    title: 'Disconnect Insulin Pump',
    body: '**Pump discontinuation with insulin transition:** [6]\n\n**CRITICAL: Must start alternative insulin within 30 minutes of pump removal.**\n\nPump users have no long-acting insulin depot - DKA can develop within 4-6 hours.\n\n**Transition to IV insulin (preferred for DKA, NPO, surgery):**\n- Start IV regular insulin drip at 0.5-1 U/hr\n- Adjust based on glucose monitoring\n- See DKA consult if acidosis present\n\n**Transition to SC basal-bolus:**\n1. Calculate total daily dose: sum of 24h pump basal + typical daily boluses\n2. Give 50% as basal (glargine SC once daily)\n3. Divide remaining 50% as bolus insulin with meals\n4. Add correction scale\n\n**Example:** Pump user with basal rate 1 U/hr (24 U/day) + average 18 U boluses/day = 42 U TDD\n- Basal: 21 U glargine SC daily\n- Bolus: 7 U lispro with each meal',
    recommendation: 'Disconnect pump and start IV insulin or SC basal-bolus within 30 minutes. Calculate TDD from pump history. Monitor closely.',
    citation: [6],
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Insulin Glargine + Rapid-Acting Insulin',
        dose: 'TDD from pump history: 50% as glargine, 50% divided with meals',
        route: 'Subcutaneous',
        frequency: 'Glargine daily, lispro/aspart with meals',
        duration: 'Until pump resumed or discharge',
        notes: 'Must start within 30 min of pump removal. Add correction scale.',
      },
      alternative: {
        drug: 'Regular Insulin IV Drip',
        dose: '0.5-1 U/hr, titrate to target',
        route: 'IV',
        frequency: 'Continuous',
        duration: 'Until eating/pump resumed',
        notes: 'Preferred for surgery, NPO, or DKA. See DKA consult for acidosis.',
      },
      monitoring: 'Glucose q1h on IV drip, q4-6h on SC. Start basal 2-4h before stopping IV drip.',
    },
  },

  {
    id: 'dm-new-dx',
    type: 'info',
    module: 1,
    title: 'New Diabetes Diagnosis',
    body: '**Approach to new diabetes in the ED/hospital:**\n\n**Immediate assessment:**\n1. Check for DKA (glucose, VBG, BMP, ketones)\n2. Assess symptoms: polyuria, polydipsia, weight loss, fatigue\n3. HbA1c if not recently checked\n\n**Classification clues:**\n- **Likely Type 1:** young, thin, rapid onset, DKA at presentation, FH of autoimmune disease\n- **Likely Type 2:** older, obese, gradual onset, metabolic syndrome features\n- **Uncertain:** send C-peptide (fasting), consider GAD65 antibodies\n\n**Initial management:**\n- If DKA: treat as DKA protocol\n- If stable hyperglycemia: start basal insulin 0.1-0.2 U/kg/day\n- Diabetes education consult\n- Outpatient endocrinology follow-up\n\n**Do NOT discharge without:**\n- Glucose monitoring supplies\n- Basic insulin education if starting insulin\n- Follow-up appointment\n- Hypoglycemia education and treatment supplies',
    citation: [1, 5],
    next: 'dm-inpatient-vs-outpatient',
  },

  {
    id: 'dm-inpatient-vs-outpatient',
    type: 'question',
    module: 1,
    title: 'Inpatient vs Outpatient Management',
    body: '**Is this patient being admitted or discharged?**\n\n**Admission criteria for diabetes-related issues:**\n- DKA or HHS\n- Severe hypoglycemia with altered mental status\n- Recurrent hypoglycemia\n- New Type 1 diabetes\n- Significant comorbid illness\n- Unable to take oral medications\n- Social factors preventing safe discharge\n\n**Outpatient management appropriate if:**\n- Stable glucose\n- Eating/drinking normally\n- No acute illness\n- Able to self-manage\n- Follow-up available',
    citation: [1],
    options: [
      {
        label: 'Inpatient Management',
        description: 'Admission for hyperglycemia or comorbid illness',
        next: 'dm-inpatient-target',
      },
      {
        label: 'Outpatient Management',
        description: 'Discharge with new/adjusted diabetes regimen',
        next: 'dm-outpatient-start',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: HYPOGLYCEMIA MANAGEMENT
  // =====================================================================

  {
    id: 'dm-hypo-severity',
    type: 'question',
    module: 2,
    title: 'Hypoglycemia Severity Assessment',
    body: '**Classify hypoglycemia severity:** [7]\n\n**Level 1 (Alert, glucose 54-70 mg/dL):**\n- Mild symptoms: tremor, palpitations, sweating, hunger\n- Patient can self-treat\n- Neurologically intact\n\n**Level 2 (Alert, glucose <54 mg/dL):**\n- More significant symptoms\n- Still able to self-treat\n- Clinically significant hypoglycemia\n\n**Level 3 (Severe):**\n- Altered mental status, confusion, seizure, loss of consciousness\n- Requires assistance from another person\n- May or may not have documented low glucose\n\n**Whipple triad (confirms hypoglycemia as cause):**\n1. Symptoms consistent with hypoglycemia\n2. Low plasma glucose at time of symptoms\n3. Resolution of symptoms with glucose correction',
    citation: [7, 8],
    options: [
      {
        label: 'Level 1-2: Alert Patient',
        description: 'Can take oral glucose',
        next: 'dm-hypo-oral',
      },
      {
        label: 'Level 3: Severe/AMS',
        description: 'Cannot take oral, needs IV/IM treatment',
        next: 'dm-hypo-severe',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'dm-hypo-oral',
    type: 'result',
    module: 2,
    title: 'Oral Hypoglycemia Treatment',
    body: '**Alert patient with hypoglycemia - oral treatment preferred:** [7]\n\n**First-line: Fast-acting carbohydrates (15-20g)**\n- 4 glucose tablets (4g each)\n- 4 oz (120 mL) juice or regular soda\n- 1 tablespoon honey or sugar\n- 6-8 hard candies\n\n**Rule of 15:**\n1. Give 15-20g fast-acting carbs\n2. Recheck glucose in 15 minutes\n3. Repeat if still <70 mg/dL\n4. Once >70, give snack with protein/fat to sustain\n\n**Avoid:**\n- Chocolate (fat slows absorption)\n- Diet drinks (no sugar)\n- Complex carbs initially (too slow)\n\n**Follow with:**\n- Snack or meal if next meal >1 hour away\n- Investigate cause (missed meal, extra insulin, exercise, alcohol)',
    recommendation: 'Give 15-20g fast-acting carbohydrates. Recheck glucose in 15 minutes. Repeat if needed. Follow with protein-containing snack.',
    citation: [7],
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Oral Glucose',
        dose: '15-20 grams',
        route: 'PO',
        frequency: 'Repeat every 15 min if glucose remains <70',
        duration: 'Until glucose >70 mg/dL',
        notes: '4 glucose tablets, 4 oz juice, or 1 tbsp honey. Follow with protein snack.',
      },
      monitoring: 'Recheck glucose q15 min until >70. Investigate underlying cause.',
    },
  },

  {
    id: 'dm-hypo-severe',
    type: 'question',
    module: 2,
    title: 'Severe Hypoglycemia - IV Access?',
    body: '**Severe hypoglycemia requires immediate intervention.** [7][8]\n\n**IV access available:**\n- Dextrose 50% (D50W) or Dextrose 10% (D10W) preferred\n- Faster and more reliable than IM glucagon\n\n**No IV access:**\n- Glucagon IM/SC/intranasal\n- Can use IM in outer thigh through clothing\n- Intranasal glucagon (Baqsimi) if available\n\n**Special considerations:**\n- Alcoholics: Give thiamine BEFORE or WITH dextrose (Wernicke prevention)\n- Malnourished patients: Same thiamine consideration\n- Sulfonylurea overdose: Will need prolonged monitoring/treatment',
    citation: [7, 8],
    options: [
      {
        label: 'IV Access Available',
        description: 'Give IV dextrose',
        next: 'dm-hypo-iv-dextrose',
        urgency: 'critical',
      },
      {
        label: 'No IV Access',
        description: 'Give IM/intranasal glucagon',
        next: 'dm-hypo-glucagon',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'dm-hypo-iv-dextrose',
    type: 'result',
    module: 2,
    title: 'IV Dextrose for Severe Hypoglycemia',
    body: '**IV dextrose is first-line for severe hypoglycemia with IV access:** [7][8]\n\n**Adult dosing:**\n- **D50W:** 25-50 mL (12.5-25g dextrose) IV push\n- **D10W:** 100-250 mL (10-25g dextrose) IV infusion\n\n**Why D10W may be preferred:**\n- Less osmotic/tissue injury if extravasation\n- Can run through peripheral IV safely\n- Easier to titrate\n- D50W is hyperosmolar and can cause phlebitis/tissue necrosis\n\n**Expected response:**\n- Mental status should improve within 5-15 minutes\n- Recheck glucose after 15 minutes\n- May need repeat dosing\n\n**Calculator:** [Hypoglycemia Treatment Calculator](#/calculator/hypo-treatment)\n\n**IMPORTANT - Give thiamine first in:**\n- Chronic alcoholics\n- Malnourished patients\n- Suspected thiamine deficiency\n- [Thiamine](#/drug/thiamine/hypoglycemia) 100 mg IV before or with dextrose',
    recommendation: 'D50W 25-50 mL IV push or D10W 100-250 mL IV. Recheck glucose in 15 min. Give thiamine first in alcoholics/malnourished.',
    citation: [7, 8],
    confidence: 'definitive',
    calculatorLinks: [{ id: 'hypo-treatment', label: 'Calculate Dextrose Dose' }],
    treatment: {
      firstLine: {
        drug: 'Dextrose 50% (D50W)',
        dose: '25-50 mL (12.5-25g)',
        route: 'IV push',
        frequency: 'Repeat in 15 min if glucose remains <70',
        duration: 'Until glucose >70 mg/dL',
        notes: 'Hyperosmolar - use large vein. Risk of phlebitis/extravasation injury.',
      },
      alternative: {
        drug: 'Dextrose 10% (D10W)',
        dose: '100-250 mL',
        route: 'IV infusion',
        frequency: 'Over 10-15 min, repeat PRN',
        duration: 'Until glucose stable',
        notes: 'Safer for peripheral IV. Preferred in some protocols.',
      },
      monitoring: 'Glucose q15 min until stable >100. May need D10W infusion for sustained hypoglycemia.',
    },
  },

  {
    id: 'dm-hypo-glucagon',
    type: 'result',
    module: 2,
    title: 'Glucagon for Severe Hypoglycemia',
    body: '**Glucagon when IV access unavailable:** [7][8]\n\n**Intramuscular/Subcutaneous:**\n- [Glucagon](#/drug/glucagon/hypoglycemia) 1 mg IM or SC\n- Can inject through clothing into lateral thigh\n- Onset: 10-15 minutes\n- May cause nausea/vomiting when patient wakes\n\n**Intranasal (Baqsimi):**\n- 3 mg intranasal (single-use device)\n- No reconstitution needed\n- Administer into one nostril\n- Patient does not need to inhale\n\n**Limitations of glucagon:**\n- Requires intact hepatic glycogen stores\n- May be ineffective in:\n  - Alcohol-induced hypoglycemia (depleted glycogen)\n  - Starvation\n  - Adrenal insufficiency\n  - Liver disease\n- Duration shorter than IV dextrose\n\n**After glucagon:**\n- Position patient on side (vomiting risk)\n- Give oral carbs when able to swallow\n- Obtain IV access when possible\n- Monitor for rebound hypoglycemia',
    recommendation: 'Glucagon 1 mg IM/SC or 3 mg intranasal. Position on side. Give oral carbs when alert. Obtain IV access.',
    citation: [7, 8],
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Glucagon',
        dose: '1 mg',
        route: 'IM or SC',
        frequency: 'May repeat in 15 min if no response',
        duration: 'Single dose usually sufficient',
        notes: 'Can inject through clothing. Onset 10-15 min. Causes nausea.',
      },
      alternative: {
        drug: 'Glucagon Intranasal (Baqsimi)',
        dose: '3 mg',
        route: 'Intranasal',
        frequency: 'Single dose',
        duration: 'One-time use device',
        notes: 'No reconstitution. Does not require inhalation.',
      },
      monitoring: 'Recheck glucose q15 min. Give oral carbs when able to swallow. Obtain IV access.',
    },
  },

  {
    id: 'dm-hypo-cause',
    type: 'question',
    module: 2,
    title: 'Hypoglycemia - Underlying Cause',
    body: '**After treating acute hypoglycemia, identify the cause:** [7][9]\n\n**Common causes in diabetics:**\n- Missed or delayed meal\n- Excessive insulin dose\n- Increased physical activity\n- Alcohol (especially without food)\n- Medication error\n- Renal impairment (reduced insulin clearance)\n- New medication interaction\n\n**Sulfonylurea hypoglycemia:**\n- Glipizide, glyburide, glimepiride\n- Can cause prolonged hypoglycemia (12-72 hours)\n- Requires extended monitoring\n- May need octreotide\n\n**Non-diabetic hypoglycemia (less common in ED):**\n- Insulinoma\n- Adrenal insufficiency\n- Sepsis\n- Liver failure\n- Accidental/intentional insulin administration',
    citation: [7, 9],
    options: [
      {
        label: 'Sulfonylurea-Induced',
        description: 'On glipizide, glyburide, or glimepiride',
        next: 'dm-hypo-sulfonylurea',
        urgency: 'urgent',
      },
      {
        label: 'Insulin-Induced',
        description: 'Excessive dose or missed meal',
        next: 'dm-hypo-insulin',
      },
      {
        label: 'Other/Unknown Cause',
        description: 'Alcohol, illness, or unclear etiology',
        next: 'dm-hypo-other',
      },
    ],
  },

  {
    id: 'dm-hypo-sulfonylurea',
    type: 'result',
    module: 2,
    title: 'Sulfonylurea-Induced Hypoglycemia',
    body: '**Sulfonylurea hypoglycemia requires extended monitoring:** [9]\n\n**Why it is dangerous:**\n- Long half-life (glipizide 2-5h, glyburide 10h, glimepiride 5-9h)\n- Continuous insulin secretion independent of glucose\n- Active metabolites in renal impairment\n- Hypoglycemia can recur for 12-72+ hours\n\n**Management:**\n1. IV dextrose as above\n2. **D10W infusion** to maintain glucose 100-150 mg/dL\n3. Consider **octreotide** for refractory cases\n4. Frequent glucose monitoring (q1-2h)\n5. Admission for observation\n\n**Octreotide:** [9]\n- Inhibits insulin secretion\n- Dose: 50-100 mcg SC/IV q6-8h\n- Indicated for recurrent hypoglycemia despite dextrose\n- Duration: until drug cleared (24-72h typically)\n\n**Disposition:** Admission for observation minimum 12-24 hours, longer for glyburide or renal impairment.',
    recommendation: 'Admit for extended monitoring. D10W infusion to maintain glucose 100-150. Consider octreotide 50-100 mcg SC q6-8h for refractory cases.',
    citation: [9],
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Dextrose 10% (D10W) Infusion',
        dose: '100-200 mL/hr, titrate to glucose 100-150',
        route: 'IV',
        frequency: 'Continuous',
        duration: '24-72 hours depending on agent',
        notes: 'Goal glucose 100-150 mg/dL. Check q1-2h initially.',
      },
      alternative: {
        drug: 'Octreotide',
        dose: '50-100 mcg',
        route: 'SC or IV',
        frequency: 'q6-8h',
        duration: 'Until sulfonylurea cleared',
        notes: 'For refractory hypoglycemia despite dextrose infusion. Inhibits insulin release.',
      },
      monitoring: 'Glucose q1-2h initially. Admission required. Extended monitoring for glyburide.',
    },
  },

  {
    id: 'dm-hypo-insulin',
    type: 'result',
    module: 2,
    title: 'Insulin-Induced Hypoglycemia',
    body: '**Insulin hypoglycemia - duration depends on insulin type:** [7]\n\n**Rapid-acting (lispro, aspart, glulisine):**\n- Peak: 1-2 hours\n- Duration: 3-5 hours\n- Observation: 2-4 hours usually sufficient\n\n**Regular insulin:**\n- Peak: 2-4 hours\n- Duration: 6-8 hours\n- Observation: 4-6 hours\n\n**NPH/intermediate:**\n- Peak: 4-10 hours\n- Duration: 10-16 hours\n- Observation: extended, consider admission\n\n**Long-acting (glargine, detemir, degludec):**\n- No significant peak but prolonged action\n- Duration: 20-42 hours\n- May cause delayed/prolonged hypoglycemia\n\n**Disposition considerations:**\n- Can discharge if glucose stable >100 for 2-4 hours (rapid-acting)\n- Educate on cause and prevention\n- Adjust insulin regimen if needed\n- Follow up with diabetes provider',
    recommendation: 'Duration of observation based on insulin type. Educate on cause. Adjust regimen if indicated. Consider endocrine follow-up.',
    citation: [7],
    confidence: 'definitive',
  },

  {
    id: 'dm-hypo-other',
    type: 'result',
    module: 2,
    title: 'Hypoglycemia - Other Causes',
    body: '**Investigate underlying cause for recurrent/unexplained hypoglycemia:**\n\n**Alcohol-induced:**\n- Inhibits gluconeogenesis\n- Depletes glycogen stores\n- Glucagon may not work\n- Give thiamine with dextrose\n- May need D10W infusion\n\n**Sepsis:**\n- Increased glucose utilization\n- Impaired gluconeogenesis\n- Poor prognostic sign\n- Treat underlying infection\n\n**Adrenal insufficiency:**\n- Cortisol required for gluconeogenesis\n- Consider if recurrent hypoglycemia + hypotension\n- Give stress-dose steroids if suspected\n\n**Renal impairment:**\n- Reduced insulin clearance\n- Reduce insulin doses in CKD\n\n**Discharge considerations:**\n- Ensure glucose stable for appropriate observation period\n- Investigate cause\n- Diabetes regimen adjustment\n- Outpatient follow-up\n- Hypoglycemia education for patient/family',
    recommendation: 'Investigate underlying cause. Treat accordingly. Ensure appropriate observation period before discharge.',
    citation: [7, 9],
    confidence: 'recommended',
  },

  // =====================================================================
  // MODULE 3: INPATIENT HYPERGLYCEMIA (NON-DKA)
  // =====================================================================

  {
    id: 'dm-inpatient-target',
    type: 'info',
    module: 3,
    title: 'Inpatient Glucose Targets',
    body: '**Glycemic targets for hospitalized patients:** [1][10]\n\n**General inpatient (non-ICU):**\n- Target: 140-180 mg/dL\n- Preprandial: <140 mg/dL\n- Random: <180 mg/dL\n- Avoid glucose <70 mg/dL (hypoglycemia)\n\n**ICU patients:**\n- Target: 140-180 mg/dL (same as general)\n- Previous target of 80-110 mg/dL abandoned due to increased hypoglycemia and mortality (NICE-SUGAR trial)\n\n**Stricter targets (110-140 mg/dL) may be appropriate for:**\n- Cardiac surgery patients\n- Stroke patients (avoid hyperglycemia)\n- Selected stable patients with low hypoglycemia risk\n\n**Less strict targets (>180-200 mg/dL) may be appropriate for:**\n- Terminal/palliative patients\n- Severe comorbidities\n- History of severe hypoglycemia\n- Limited life expectancy',
    citation: [1, 10, 11],
    next: 'dm-inpatient-regimen',
  },

  {
    id: 'dm-inpatient-regimen',
    type: 'question',
    module: 3,
    title: 'Inpatient Insulin Regimen Selection',
    body: '**Select insulin regimen based on clinical status:** [1][10]\n\n**Basal-bolus-correction (preferred):**\n- Best for most hospitalized diabetics\n- Mimics physiologic insulin secretion\n- Better glycemic control than sliding scale alone\n- Requires patient to be eating\n\n**IV insulin infusion:**\n- Critical illness/ICU\n- NPO status expected >12-24 hours\n- DKA/HHS\n- Perioperative management\n- Refractory hyperglycemia\n\n**Sliding scale alone (NOT recommended):**\n- Reactive rather than proactive\n- Does not prevent hyperglycemia\n- Associated with worse outcomes\n- Only appropriate for short-term/transitional use\n\n**Calculators:**\n- [TDD Estimator](#/calculator/tdd-estimator)\n- [Basal/Bolus Calculator](#/calculator/basal-bolus-calc)',
    citation: [1, 10],
    calculatorLinks: [
      { id: 'tdd-estimator', label: 'Calculate TDD' },
      { id: 'basal-bolus-calc', label: 'Split Basal/Bolus' },
    ],
    options: [
      {
        label: 'Basal-Bolus-Correction',
        description: 'Patient is eating or will eat',
        next: 'dm-basal-bolus-protocol',
      },
      {
        label: 'IV Insulin Drip',
        description: 'NPO, critical illness, or perioperative',
        next: 'dm-iv-insulin',
      },
      {
        label: 'NPO Patient - Not Critical',
        description: 'Short NPO period expected',
        next: 'dm-npo-management',
      },
    ],
  },

  {
    id: 'dm-basal-bolus-protocol',
    type: 'info',
    module: 3,
    title: 'Basal-Bolus-Correction Protocol',
    body: '**Step 1: Estimate Total Daily Dose (TDD)** [1][10]\n\n**If insulin-naive or dose unknown:**\n- General: 0.4-0.5 U/kg/day\n- Elderly/renal impairment: 0.2-0.3 U/kg/day\n- Insulin-resistant (obese, on steroids): 0.5-0.6 U/kg/day\n- High-dose steroids: may need 0.6-1.0 U/kg/day\n\n**If on home insulin:**\n- Use home TDD as starting point\n- May reduce by 20-25% for acute illness with poor intake\n\n**Step 2: Distribute TDD**\n- **50% as BASAL:** Glargine once daily (or NPH BID)\n- **50% as BOLUS:** Divide equally among 3 meals (lispro/aspart/glulisine)\n\n**Step 3: Add Correction Scale**\n- Correction factor = 1800 / TDD (for rapid insulin)\n- Example: TDD 60 U -> CF = 1800/60 = 30 (1 U drops glucose ~30 mg/dL)\n\n[Sliding Scale Generator](#/calculator/sliding-scale-gen)',
    citation: [1, 10],
    calculatorLinks: [{ id: 'sliding-scale-gen', label: 'Generate Sliding Scale' }],
    next: 'dm-basal-bolus-example',
  },

  {
    id: 'dm-basal-bolus-example',
    type: 'result',
    module: 3,
    title: 'Basal-Bolus Example & Orders',
    body: '**Example: 80 kg patient, insulin-naive** [10]\n\n**Step 1: Calculate TDD**\n- 0.4 U/kg x 80 kg = 32 U/day\n\n**Step 2: Distribute**\n- Basal: 16 U [Glargine](#/drug/insulin-glargine/inpatient) SC at bedtime\n- Bolus: 16 U divided = ~5 U [Lispro](#/drug/insulin-lispro/inpatient) with each meal\n\n**Step 3: Correction Scale (CF = 1800/32 = 56, round to 50)**\n\n| Glucose | Correction Dose |\n|---------|----------------|\n| 150-199 | +1 U |\n| 200-249 | +2 U |\n| 250-299 | +3 U |\n| 300-349 | +4 U |\n| >350 | +5 U, notify MD |\n\n**Adjustments:**\n- If BG consistently >180: increase TDD by 10-20%\n- If BG <100: decrease TDD by 10-20%\n- If hypoglycemia: investigate cause, reduce insulin\n\n**Hold bolus if NPO** (continue basal at 75-100%)',
    recommendation: 'Basal-bolus-correction: 50% TDD as glargine, 50% divided as meal-time lispro/aspart. Add correction scale. Adjust based on glucose trends.',
    citation: [1, 10],
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Insulin Glargine (Basal)',
        dose: '50% of TDD once daily',
        route: 'Subcutaneous',
        frequency: 'Once daily at bedtime',
        duration: 'Throughout hospitalization',
        notes: 'Continue even if NPO (may reduce to 75-80% of usual dose).',
      },
      alternative: {
        drug: 'Insulin Lispro/Aspart (Bolus)',
        dose: '50% of TDD divided equally at meals',
        route: 'Subcutaneous',
        frequency: 'With each meal (breakfast, lunch, dinner)',
        duration: 'When eating',
        notes: 'Hold if NPO or <50% meal consumed. Add correction scale.',
      },
      monitoring: 'Glucose before meals and at bedtime (QID). Adjust TDD by 10-20% based on trends.',
    },
  },

  {
    id: 'dm-iv-insulin',
    type: 'result',
    module: 3,
    title: 'IV Insulin Drip Protocol',
    body: '**IV insulin for critical illness, NPO, or perioperative:** [10][11]\n\n**Standard preparation:**\n- [Regular Insulin](#/drug/regular-insulin/iv drip) 100 U in 100 mL NS = 1 U/mL\n\n**Starting rate:**\n- Glucose 150-200: start 1-2 U/hr\n- Glucose 200-300: start 2-4 U/hr\n- Glucose >300: start 4-6 U/hr\n- DKA: 0.1 U/kg/hr (see DKA consult)\n\n**Titration (check glucose q1h):**\n- Target: 140-180 mg/dL\n- Glucose dropping appropriately (50-70/hr): no change\n- Glucose dropping too slowly: increase rate by 1-2 U/hr\n- Glucose dropping too fast or <100: decrease rate, add dextrose\n\n**Dextrose supplementation:**\n- Add D5W or D10W when glucose <150-200\n- Goal: maintain glucose 140-180 while continuing insulin\n- Never stop insulin abruptly in Type 1 or DKA\n\n**Transition to SC:**\n- Give basal insulin 2-4 hours BEFORE stopping drip\n- Calculate TDD from IV rate: (avg hourly rate x 24) x 0.8\n- Do not stop drip until SC basal has been absorbed',
    recommendation: 'Regular insulin drip 1 U/mL. Start 1-4 U/hr based on glucose. Target 140-180. Add dextrose when glucose <150-200.',
    citation: [10, 11],
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Regular Insulin IV Drip',
        dose: '1-6 U/hr, titrate q1h to target 140-180',
        route: 'IV continuous infusion',
        frequency: 'Continuous with q1h glucose checks',
        duration: 'Until eating or transitioned to SC',
        notes: '100 U in 100 mL NS = 1 U/mL. Add D5W/D10W when glucose <150.',
      },
      monitoring: 'Glucose q1h while on drip. BMP q6-12h for potassium. Transition to SC: give basal 2-4h before stopping drip.',
    },
  },

  {
    id: 'dm-npo-management',
    type: 'result',
    module: 3,
    title: 'NPO Diabetic Patient Management',
    body: '**Managing the NPO diabetic patient (non-critical):** [10]\n\n**Type 1 Diabetes (NPO):**\n- MUST continue basal insulin (will develop DKA without it)\n- Hold meal-time bolus insulin\n- May reduce basal by 20-25% if prolonged NPO\n- Consider D5W maintenance to prevent hypoglycemia\n- Monitor glucose q4-6h\n\n**Type 2 Diabetes (NPO):**\n- Continue basal insulin at 75-100% of usual dose\n- Hold oral agents (especially metformin if contrast planned)\n- Hold GLP-1 agonists\n- Correction-scale insulin for hyperglycemia\n- Monitor glucose q4-6h\n\n**Short NPO period (<12 hours):**\n- Usually can manage with basal + correction scale\n- Resume normal regimen when eating\n\n**Extended NPO (>24 hours):**\n- Consider IV insulin drip for tighter control\n- D5W infusion to prevent hypoglycemia\n- Frequent monitoring',
    recommendation: 'Type 1: Continue basal, hold bolus, monitor closely. Type 2: Continue basal at 75-100%, hold oral agents, correction scale PRN.',
    citation: [10],
    confidence: 'definitive',
  },

  {
    id: 'dm-steroid-induced',
    type: 'result',
    module: 3,
    title: 'Steroid-Induced Hyperglycemia',
    body: '**Corticosteroids cause significant hyperglycemia:** [12]\n\n**Mechanism:**\n- Increase hepatic gluconeogenesis\n- Decrease peripheral glucose uptake\n- Increase insulin resistance\n\n**Pattern with once-daily morning steroids:**\n- Glucose peaks afternoon/evening (4-8 hours post-dose)\n- May be near-normal fasting\n- NPH at breakfast covers this pattern well\n\n**Management approach:**\n\n**New hyperglycemia on steroids:**\n- Start NPH 0.1-0.2 U/kg in morning (with steroid dose)\n- Or increase basal by 20-40%\n- Add correction scale\n\n**Known diabetic on steroids:**\n- Increase TDD by 20-50% depending on steroid dose\n- May need to double insulin in high-dose steroids\n- Consider adding NPH to existing basal-bolus\n\n**Steroid taper:**\n- Reduce insulin proportionally as steroids reduced\n- Monitor closely for hypoglycemia during taper\n\n**Rule of thumb:**\n- Prednisone 10-20 mg: increase TDD ~20%\n- Prednisone 20-40 mg: increase TDD ~40%\n- Prednisone >40 mg: increase TDD ~50-100%',
    recommendation: 'Add or increase insulin based on steroid dose. NPH covers afternoon peak from morning steroids. Reduce insulin as steroids taper.',
    citation: [12],
    confidence: 'recommended',
    treatment: {
      firstLine: {
        drug: 'NPH Insulin',
        dose: '0.1-0.2 U/kg in morning with steroid dose',
        route: 'Subcutaneous',
        frequency: 'Once daily with morning steroid',
        duration: 'While on steroids',
        notes: 'Matches peak action of NPH (4-8h) with steroid-induced hyperglycemia peak.',
      },
      alternative: {
        drug: 'Increase existing basal insulin',
        dose: 'Increase TDD 20-50% based on steroid dose',
        route: 'Subcutaneous',
        frequency: 'As per existing regimen',
        duration: 'While on steroids',
        notes: 'Reduce proportionally as steroids tapered.',
      },
      monitoring: 'Glucose QID. Watch for afternoon/evening peaks. Adjust with steroid taper.',
    },
  },

  // =====================================================================
  // MODULE 4: OUTPATIENT INITIATION/ADJUSTMENT
  // =====================================================================

  {
    id: 'dm-outpatient-start',
    type: 'question',
    module: 4,
    title: 'Outpatient Diabetes Management',
    body: '**Outpatient diabetes management decision points:** [5]\n\n**Is patient already on therapy?**\n- If yes: assess current control, adjust regimen\n- If no: determine initial therapy\n\n**HbA1c targets:**\n- General: <7.0%\n- More strict (<6.5%): young, healthy, low hypoglycemia risk\n- Less strict (<8.0%): elderly, limited life expectancy, hypoglycemia risk\n\n**When to initiate insulin:**\n- HbA1c >10%\n- Glucose >300 mg/dL with symptoms\n- Type 1 diabetes (always)\n- Pregnancy with diabetes\n- Failure of oral agents\n- Hospitalization for hyperglycemia',
    citation: [5, 13],
    options: [
      {
        label: 'Start New Oral Therapy',
        description: 'First-line therapy or adding agents',
        next: 'dm-oral-agents',
      },
      {
        label: 'Start Insulin',
        description: 'HbA1c >10%, glucose >300, or failed oral agents',
        next: 'dm-outpatient-insulin',
      },
      {
        label: 'Adjust Existing Regimen',
        description: 'Patient on therapy, not at goal',
        next: 'dm-regimen-adjust',
      },
    ],
  },

  {
    id: 'dm-oral-agents',
    type: 'info',
    module: 4,
    title: 'Oral Diabetes Agents',
    body: '**First-line: Metformin** [5][13]\n\n[Metformin](#/drug/metformin/diabetes):\n- Start 500 mg daily with dinner, increase to 500 mg BID after 1 week\n- Target: 1000 mg BID (max 2550 mg/day)\n- GI side effects common initially (start low, titrate slow)\n- Contraindicated: eGFR <30, acute kidney injury, contrast within 48h\n- Hold if eGFR 30-45 (reassess)\n\n**Second-line agents (add to metformin if not at goal):**\n\n**SGLT2 Inhibitors** (empagliflozin, dapagliflozin, canagliflozin):\n- Cardiovascular and renal benefits (especially with HFrEF or CKD)\n- Weight loss\n- Risk: euglycemic DKA, UTI, genital yeast infections\n- Stop before surgery\n\n**GLP-1 Receptor Agonists** (semaglutide, liraglutide, dulaglutide):\n- Weight loss benefit\n- Cardiovascular benefit\n- GI side effects (nausea, vomiting)\n- Injectable or oral (semaglutide)\n\n**Sulfonylureas** (glipizide, glimepiride):\n- Inexpensive\n- Risk of hypoglycemia and weight gain\n- Avoid glyburide (long half-life, hypoglycemia risk)',
    citation: [5, 13],
    next: 'dm-oral-agents-choice',
  },

  {
    id: 'dm-oral-agents-choice',
    type: 'result',
    module: 4,
    title: 'Oral Agent Selection',
    body: '**Agent selection based on patient factors:** [5][13]\n\n**If HFrEF or CKD (eGFR 25-60):**\n- SGLT2 inhibitor preferred (empagliflozin, dapagliflozin)\n- Proven mortality benefit in heart failure\n- Renal protection independent of glucose\n\n**If ASCVD:**\n- GLP-1 agonist (semaglutide, liraglutide) or SGLT2i\n- Both have cardiovascular benefit\n\n**If weight loss desired:**\n- GLP-1 agonist (significant weight loss)\n- SGLT2 inhibitor (modest weight loss)\n- Avoid sulfonylureas (weight gain)\n\n**If cost is major factor:**\n- Metformin (very inexpensive)\n- Sulfonylurea (inexpensive)\n- GLP-1 and SGLT2i are expensive without insurance\n\n**If hypoglycemia risk high:**\n- Avoid sulfonylureas\n- Metformin, SGLT2i, GLP-1 agonists have low hypoglycemia risk\n\n**SGLT2i warning:**\n- Risk of euglycemic DKA (counsel patients)\n- Hold before major surgery\n- UTI/yeast infection risk',
    recommendation: 'Metformin first-line. Add SGLT2i if HF/CKD, GLP-1 if weight loss/ASCVD. Avoid sulfonylureas if hypoglycemia risk.',
    citation: [5, 13],
    confidence: 'definitive',
  },

  {
    id: 'dm-outpatient-insulin',
    type: 'info',
    module: 4,
    title: 'Outpatient Insulin Initiation',
    body: '**Starting insulin in the outpatient setting:** [5]\n\n**Basal insulin first (easiest for patients):**\n- [Glargine](#/drug/insulin-glargine/outpatient) or degludec once daily\n- Start: 0.1-0.2 U/kg/day (or 10 U fixed dose)\n- Take at same time daily (bedtime or morning)\n- Titrate: increase by 2 U every 3 days until fasting glucose at target\n\n**Calculator:** [TDD Estimator](#/calculator/tdd-estimator)\n\n**Example: 90 kg patient**\n- Starting dose: 0.15 U/kg = ~14 U glargine at bedtime\n- Target fasting glucose: 80-130 mg/dL\n- If fasting glucose >130: increase by 2 U every 3 days\n\n**Continue oral agents initially:**\n- Continue metformin (unless contraindicated)\n- May continue GLP-1 agonist\n- Consider stopping sulfonylurea (hypoglycemia risk with insulin)\n\n**When to add mealtime insulin:**\n- Basal optimized (fasting at goal) but A1c still elevated\n- Start with largest meal\n- Or consider premixed insulin (simpler but less flexible)',
    citation: [5],
    calculatorLinks: [{ id: 'tdd-estimator', label: 'Calculate Starting Dose' }],
    next: 'dm-outpatient-insulin-titration',
  },

  {
    id: 'dm-outpatient-insulin-titration',
    type: 'result',
    module: 4,
    title: 'Insulin Titration Protocol',
    body: '**Basal insulin titration (patient self-titration):** [5]\n\n**Fasting Glucose-Based Adjustment:**\n\n| Fasting Glucose (mg/dL) | Adjustment |\n|------------------------|------------|\n| <70 (hypoglycemia) | Decrease by 2-4 U |\n| 70-130 (at goal) | No change |\n| 130-180 | Increase by 2 U |\n| >180 | Increase by 4 U |\n\n**Titrate every 3 days until fasting glucose at goal.**\n\n**Adding mealtime insulin:**\n- Start 4 U or 10% of basal dose with largest meal\n- Titrate based on post-meal glucose (target <180 at 2h)\n- Carb counting: use insulin-to-carb ratio (ICR)\n\n[Carb-to-Insulin Ratio Calculator](#/calculator/icr-calc)\n\n**ICR calculation (500 rule):**\n- ICR = 500 / TDD\n- Example: TDD 50 U -> ICR = 10 (1 U per 10g carbs)\n\n**Correction factor (1800 rule for rapid insulin):**\n- CF = 1800 / TDD\n- Example: TDD 50 U -> CF = 36 (1 U drops glucose ~36 mg/dL)',
    recommendation: 'Start basal 0.1-0.2 U/kg. Titrate by 2-4 U every 3 days based on fasting glucose. Add mealtime insulin when basal optimized but A1c still elevated.',
    citation: [5],
    confidence: 'definitive',
    calculatorLinks: [{ id: 'icr-calc', label: 'Calculate ICR' }],
    treatment: {
      firstLine: {
        drug: 'Insulin Glargine (Basal)',
        dose: '0.1-0.2 U/kg once daily',
        route: 'Subcutaneous',
        frequency: 'Once daily at bedtime',
        duration: 'Ongoing',
        notes: 'Titrate by 2-4 U every 3 days until fasting glucose 80-130.',
      },
      alternative: {
        drug: 'Insulin Lispro/Aspart (Mealtime)',
        dose: '4 U or 10% of basal with largest meal',
        route: 'Subcutaneous',
        frequency: 'With meal',
        duration: 'When adding prandial coverage',
        notes: 'Use carb counting with ICR for flexible dosing.',
      },
      monitoring: 'Fasting glucose daily. Adjust every 3 days. Check A1c in 3 months.',
    },
  },

  {
    id: 'dm-regimen-adjust',
    type: 'result',
    module: 4,
    title: 'Adjusting Existing Regimen',
    body: '**Adjusting diabetes regimen for patients not at goal:** [5]\n\n**If on metformin alone (A1c 7-9%):**\n- Add second agent: SGLT2i, GLP-1 agonist, or sulfonylurea\n- Choose based on comorbidities and patient factors\n\n**If on dual oral therapy (A1c 8-10%):**\n- Add third agent OR\n- Add basal insulin (often more effective)\n\n**If on basal insulin + orals:**\n- Optimize basal dose first (titrate to fasting goal)\n- If fasting at goal but A1c still elevated: add mealtime insulin\n- Consider GLP-1 agonist if not already on (can combine with basal)\n\n**If on basal-bolus:**\n- Review technique (injection sites, timing)\n- Review carb counting accuracy\n- Adjust TDD based on patterns\n- Consider CGM for trend data\n\n**Red flags requiring urgent intervention:**\n- A1c >10% or glucose >300 with symptoms\n- Recent hospitalization for hyperglycemia\n- New DKA (especially in Type 2 - concerning for latent autoimmune diabetes)',
    recommendation: 'Intensify therapy stepwise. Optimize current regimen before adding agents. Basal insulin often more effective than third oral agent.',
    citation: [5],
    confidence: 'recommended',
  },

  // =====================================================================
  // MODULE 5: SPECIAL SITUATIONS
  // =====================================================================

  {
    id: 'dm-special-situations',
    type: 'question',
    module: 5,
    title: 'Special Situations',
    body: '**Select the clinical scenario:**',
    options: [
      {
        label: 'IV to SC Insulin Transition',
        description: 'Transitioning from drip to subcutaneous',
        next: 'dm-iv-to-sc',
      },
      {
        label: 'Discharge Planning',
        description: 'Preparing diabetic patient for discharge',
        next: 'dm-discharge-planning',
      },
      {
        label: 'Perioperative Management',
        description: 'Surgery/procedure in diabetic patient',
        next: 'dm-perioperative',
      },
    ],
  },

  {
    id: 'dm-iv-to-sc',
    type: 'result',
    module: 5,
    title: 'IV to SC Insulin Transition',
    body: '**Transitioning from IV insulin drip to subcutaneous:** [10]\n\n**Timing is critical:**\n- Give SC basal insulin 2-4 hours BEFORE stopping IV drip\n- This allows SC insulin to reach therapeutic level\n- Stopping drip without basal = rapid hyperglycemia/DKA in Type 1\n\n**Calculating SC dose from IV drip:**\n1. Determine average hourly IV rate over last 6-12 hours\n2. Calculate estimated daily dose: (hourly rate x 24) x 0.8\n3. Distribute as basal-bolus (50/50) if eating\n\n**Example:**\n- Average IV rate: 2.5 U/hr\n- Estimated TDD: (2.5 x 24) x 0.8 = 48 U/day\n- Basal: 24 U glargine SC\n- Bolus: 8 U with each meal (if eating)\n\n**Alternative for NPO patient:**\n- Give full calculated dose as basal only\n- Add correction scale\n- Start bolus when eating\n\n**Timeline:**\n- Give glargine at usual basal time (or now if transitioning)\n- Continue IV drip for 2-4 hours\n- Stop drip, start meal-time insulin with next meal',
    recommendation: 'Calculate TDD from IV rate x 24 x 0.8. Give basal 2-4 hours before stopping drip. Never stop IV drip without basal coverage.',
    citation: [10],
    confidence: 'definitive',
  },

  {
    id: 'dm-discharge-planning',
    type: 'result',
    module: 5,
    title: 'Diabetes Discharge Planning',
    body: '**Essential discharge components:** [14]\n\n**Medication reconciliation:**\n- Clear insulin regimen (names, doses, timing)\n- Oral agent adjustments\n- Supplies: insulin, needles/pens, glucose monitor, strips, lancets\n\n**Patient education (Teach-back method):**\n- Insulin injection technique\n- Glucose monitoring schedule\n- Hypoglycemia recognition and treatment\n- Sick-day rules (when to check ketones, when to seek care)\n\n**Follow-up:**\n- Primary care or endocrinology within 1-2 weeks\n- A1c check in 3 months\n- Diabetes educator referral if new to insulin\n\n**Red flag education - return if:**\n- Persistent vomiting\n- Glucose consistently >300 despite medication\n- Signs of DKA (nausea, vomiting, abdominal pain, rapid breathing)\n- Severe hypoglycemia\n- Unable to eat or drink\n\n**Written instructions:**\n- Insulin type, dose, and timing\n- Target glucose ranges\n- Hypoglycemia treatment steps\n- Emergency contact numbers',
    recommendation: 'Ensure clear medication instructions, adequate supplies, hypoglycemia education, sick-day rules, and close follow-up.',
    citation: [14],
    confidence: 'definitive',
  },

  {
    id: 'dm-perioperative',
    type: 'result',
    module: 5,
    title: 'Perioperative Diabetes Management',
    body: '**Perioperative glucose management:** [15]\n\n**Preoperative:**\n- Target glucose 140-180 mg/dL\n- Hold metformin if contrast planned or major surgery\n- Hold SGLT2 inhibitors 3-4 days before surgery (DKA risk)\n- Continue basal insulin at 75-100% of usual dose\n- Hold morning bolus/mealtime insulin if NPO\n\n**Day of surgery:**\n- Check morning glucose\n- Basal insulin: give 75-100% of usual dose\n- Bolus insulin: hold if NPO\n- Oral agents: hold day of surgery\n- GLP-1 agonists: hold (delays gastric emptying)\n\n**Intraoperative:**\n- IV insulin drip for major surgery or poor control\n- Check glucose q1-2h\n- D5W if glucose <150 and on insulin\n\n**Postoperative:**\n- Continue IV insulin until eating\n- Transition to SC as above (basal 2-4h before stopping drip)\n- Resume oral agents when eating and renal function stable\n- Resume metformin when creatinine stable and no contrast planned\n\n**SGLT2 inhibitor post-op:**\n- Do not restart until eating well\n- Monitor for euglycemic DKA\n- Ensure adequate hydration',
    recommendation: 'Continue basal insulin, hold bolus/orals day of surgery. IV insulin for major surgery. Transition to SC when eating.',
    citation: [15],
    confidence: 'definitive',
  },

];

export const DIABETES_MANAGEMENT_NODE_COUNT = DIABETES_MANAGEMENT_NODES.length;

export const DIABETES_MANAGEMENT_MODULE_LABELS = [
  'Initial Assessment',
  'Hypoglycemia',
  'Inpatient Hyperglycemia',
  'Outpatient Management',
  'Special Situations',
];

export const DIABETES_MANAGEMENT_CITATIONS: Citation[] = [
  { num: 1, text: 'ElSayed NA, Aleppo G, Aroda VR, et al. 16. Diabetes Care in the Hospital: Standards of Care in Diabetes - 2024. Diabetes Care. 2024;47(Suppl 1):S295-S306.' },
  { num: 2, text: 'Kitabchi AE, Umpierrez GE, Miles JM, Fisher JN. Hyperglycemic Crises in Adult Patients With Diabetes. Diabetes Care. 2009;32(7):1335-1343.' },
  { num: 3, text: 'Pasquel FJ, Umpierrez GE. Hyperosmolar Hyperglycemic State: A Historic Review of the Clinical Presentation, Diagnosis, and Treatment. Diabetes Care. 2014;37(11):3124-3131.' },
  { num: 4, text: 'Fadini GP, de Kreutzenberg SV, Rigato M, et al. Characteristics and Outcomes of the Hyperglycemic Hyperosmolar Non-Ketotic Syndrome in a Cohort of 51 Consecutive Cases at a Single Center. Diabetes Res Clin Pract. 2011;94(2):172-179.' },
  { num: 5, text: 'ElSayed NA, Aleppo G, Aroda VR, et al. 9. Pharmacologic Approaches to Glycemic Treatment: Standards of Care in Diabetes - 2024. Diabetes Care. 2024;47(Suppl 1):S158-S178.' },
  { num: 6, text: 'Boyle ME, Seifert KM, Beer KA, et al. Guidelines for Application of Continuous Subcutaneous Insulin Infusion (Insulin Pump) Therapy in the Perioperative Period. J Diabetes Sci Technol. 2012;6(1):184-190.' },
  { num: 7, text: 'ElSayed NA, Aleppo G, Aroda VR, et al. 6. Glycemic Goals and Hypoglycemia: Standards of Care in Diabetes - 2024. Diabetes Care. 2024;47(Suppl 1):S111-S125.' },
  { num: 8, text: 'Cryer PE, Axelrod L, Grossman AB, et al. Evaluation and Management of Adult Hypoglycemic Disorders: An Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab. 2009;94(3):709-728.' },
  { num: 9, text: 'Murad MH, Coto-Yglesias F, Wang AT, et al. Drug-Induced Hypoglycemia: A Systematic Review. J Clin Endocrinol Metab. 2009;94(3):741-745.' },
  { num: 10, text: 'Umpierrez GE, Hellman R, Korytkowski MT, et al. Management of Hyperglycemia in Hospitalized Patients in Non-Critical Care Setting: An Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab. 2012;97(1):16-38.' },
  { num: 11, text: 'NICE-SUGAR Study Investigators. Intensive versus Conventional Glucose Control in Critically Ill Patients. N Engl J Med. 2009;360(13):1283-1297.' },
  { num: 12, text: 'Kwon S, Hermayer KL. Glucocorticoid-Induced Hyperglycemia. Am J Med Sci. 2013;345(4):274-277.' },
  { num: 13, text: 'American Diabetes Association Professional Practice Committee. Summary of Revisions: Standards of Care in Diabetes - 2024. Diabetes Care. 2024;47(Suppl 1):S1-S4.' },
  { num: 14, text: 'Dungan KM. The Effect of Diabetes on Hospital Readmissions. J Diabetes Sci Technol. 2012;6(5):1045-1052.' },
  { num: 15, text: 'Duggan EW, Carlson K, Umpierrez GE. Perioperative Hyperglycemia Management: An Update. Anesthesiology. 2017;126(3):547-560.' },
];
