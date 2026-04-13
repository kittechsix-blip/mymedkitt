// MedKitt - Eating Disorders Emergency
// Recognition, medical complications, risk stratification, acute management,
// psychiatric assessment, and disposition for eating disorder emergencies.
// 6 modules: Recognition -> Medical Complications -> Risk Stratification -> Acute Management -> Psychiatric Assessment -> Disposition
// 32 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const EATING_DISORDERS_NODES: DecisionNode[] = [
  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================
  {
    id: 'ed-start',
    type: 'info',
    module: 1,
    title: 'Eating Disorders - Initial Assessment',
    body: '**Eating disorders** are psychiatric conditions with the highest mortality rate of any mental illness. The ED is often the first medical contact for complications [1].\n\n[MARSIPAN Risk Assessment](#/calc/marsipan-risk)\n\n**Three main types:**\n- **Anorexia Nervosa (AN):** Restriction, fear of weight gain, distorted body image\n- **Bulimia Nervosa (BN):** Binge-purge cycles, often normal weight\n- **ARFID:** Avoidant/Restrictive Food Intake Disorder - no body image disturbance\n\n**Key ED presentations:**\n- Bradycardia, hypotension, hypothermia\n- Electrolyte abnormalities (hypokalemia, hypophosphatemia)\n- Syncope, weakness, palpitations\n- Dental erosions, parotid swelling (purging)\n- Severe malnutrition, cachexia\n\n**Critical point:** Medical instability takes precedence over psychiatric disposition. Stabilize first.',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'marsipan-risk', label: 'MARSIPAN Risk Assessment' },
      { id: 'bmi-severity', label: 'BMI Severity Classification' },
    ],
    next: 'ed-type-assessment',
    summary: 'Screen all ED patients with unexplained electrolyte abnormalities or weight loss for eating disorders',
  },
  {
    id: 'ed-type-assessment',
    type: 'question',
    module: 1,
    title: 'Eating Disorder Type Assessment',
    body: '**Distinguish the primary eating disorder type:**\n\n**Anorexia Nervosa (Restrictive or Binge-Purge):**\n- BMI <18.5 kg/m\u00b2 (or <5th percentile in peds)\n- Intense fear of gaining weight\n- Distorted body image\n- Restriction +/- purging behaviors\n\n**Bulimia Nervosa:**\n- Recurrent binge eating + compensatory behaviors\n- Often normal or slightly elevated BMI\n- Self-induced vomiting, laxatives, diuretics, excessive exercise\n\n**ARFID (Avoidant/Restrictive Food Intake Disorder):**\n- Significant nutritional deficiency or weight loss\n- No body image disturbance or fear of weight gain\n- Often sensory-based food avoidance\n\n**Atypical AN:** Meets all criteria but BMI is not low (significant weight loss from higher baseline)\n\nWhat is the predominant presentation?',
    citation: [1, 3],
    options: [
      { label: 'Anorexia Nervosa / Restrictive', description: 'Low BMI, restriction, fear of weight gain', next: 'ed-an-vitals' },
      { label: 'Bulimia / Purging Behaviors', description: 'Binge-purge, often normal weight', next: 'ed-bn-assessment' },
      { label: 'ARFID / Other', description: 'No body image disturbance, sensory avoidance', next: 'ed-arfid-assessment' },
    ],
    summary: 'Classify as anorexia nervosa, bulimia nervosa, or ARFID — guides medical workup',
  },
  {
    id: 'ed-an-vitals',
    type: 'info',
    module: 1,
    title: 'Anorexia Nervosa - Vital Sign Red Flags',
    body: '**Anorexia Nervosa** causes adaptive physiological changes that can rapidly decompensate [1][2].\n\n[MARSIPAN Risk Assessment](#/calc/marsipan-risk)\n\n**Vital Sign Red Flags (MARSIPAN 2022):**\n\n| Finding | High Risk Threshold |\n|---------|--------------------|\n| **Heart Rate** | <40 bpm (or <50 with QTc >450ms) |\n| **Blood Pressure** | Systolic <90 mmHg |\n| **Orthostatic Drop** | SBP drop >20 mmHg or HR rise >30 bpm |\n| **Temperature** | <35.5\u00b0C (95.9\u00b0F) |\n| **BMI** | <13 kg/m\u00b2 (extreme), <15 kg/m\u00b2 (high risk) |\n\n**Physical Exam Findings:**\n- Lanugo (fine downy hair)\n- Muscle wasting, loss of subcutaneous fat\n- Acrocyanosis, cold extremities\n- Peripheral edema (hypoalbuminemia)\n- Russell sign (knuckle calluses from purging)\n\n**ECG abnormalities:**\n- Sinus bradycardia\n- QTc prolongation (>450ms = high risk)\n- U waves, ST changes',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'qtc-calculator', label: 'QTc Calculator' },
    ],
    next: 'ed-complications',
    summary: 'AN vital sign red flags: HR <40, SBP <90, temp <35.5°C, BMI <13 — high mortality risk',
    safetyLevel: 'critical',
  },
  {
    id: 'ed-bn-assessment',
    type: 'info',
    module: 1,
    title: 'Bulimia Nervosa - Assessment',
    body: '**Bulimia Nervosa** often presents with complications from purging behaviors rather than low weight [1][3].\n\n**Purging Methods & Complications:**\n\n| Method | Complications |\n|--------|---------------|\n| **Vomiting** | Hypokalemia, metabolic alkalosis, dental erosions, Mallory-Weiss tears, esophageal rupture |\n| **Laxatives** | Hypokalemia, metabolic acidosis, dehydration, cathartic colon |\n| **Diuretics** | Hypokalemia, hyponatremia, volume depletion |\n| **Ipecac** | Cardiomyopathy (emetine toxicity) - can be fatal |\n\n**Physical Exam Findings:**\n- Dental enamel erosion (perimylolysis)\n- Parotid/salivary gland hypertrophy ("chipmunk cheeks")\n- Russell sign (calluses on knuckles)\n- Facial petechiae (from vomiting)\n\n**Lab Abnormalities:**\n- **Hypokalemia** (most common)\n- Hypochloremic metabolic alkalosis (vomiting)\n- Elevated amylase (salivary)\n- Hypomagnesemia\n\n**Cardiac risk:** QTc prolongation from hypokalemia - can cause Torsades de Pointes.',
    citation: [1, 3],
    calculatorLinks: [
      { id: 'electrolyte-replacement', label: 'Electrolyte Replacement Guide' },
    ],
    next: 'ed-complications',
    summary: 'Bulimia: hypokalemia most common, metabolic alkalosis from vomiting, QTc risk from low K+',
    safetyLevel: 'warning',
  },
  {
    id: 'ed-arfid-assessment',
    type: 'info',
    module: 1,
    title: 'ARFID - Assessment',
    body: '**ARFID (Avoidant/Restrictive Food Intake Disorder)** is characterized by nutritional deficiency without body image disturbance [3].\n\n**Diagnostic Criteria:**\n- Eating disturbance leading to:\n  - Significant weight loss or failure to gain\n  - Significant nutritional deficiency\n  - Dependence on enteral feeding or supplements\n  - Marked interference with psychosocial functioning\n- NOT explained by food scarcity or cultural practice\n- NOT due to AN/BN (no body image disturbance)\n- NOT better explained by medical condition\n\n**Common Presentations:**\n- Sensory sensitivity (textures, colors, smells)\n- Fear of choking or vomiting after food trauma\n- General lack of interest in eating\n- Highly selective/restrictive diet\n\n**Medical Complications:**\n- Same malnutrition complications as AN\n- Specific deficiencies based on avoided foods\n- Growth failure in children\n\n**Key Difference from AN:** No fear of weight gain, no distorted body image.',
    citation: [3],
    next: 'ed-complications',
    summary: 'ARFID: nutritional deficiency without body image distortion — same malnutrition complications as AN',
    skippable: true,
  },

  // =====================================================================
  // MODULE 2: MEDICAL COMPLICATIONS
  // =====================================================================
  {
    id: 'ed-complications',
    type: 'question',
    module: 2,
    title: 'Medical Complications Assessment',
    body: '**Eating disorders affect every organ system.** Identify the primary complication requiring treatment [1][2].\n\n**Cardiovascular:**\n- Bradycardia, hypotension, orthostatic changes\n- QTc prolongation, arrhythmias\n- Pericardial effusion, CHF (refeeding)\n\n**Metabolic/Electrolyte:**\n- Hypokalemia, hypophosphatemia, hypomagnesemia\n- Hypoglycemia\n- Refeeding syndrome (phosphate, K+, Mg2+ drops)\n\n**Hematologic:**\n- Pancytopenia, anemia, leukopenia\n- Bone marrow hypoplasia\n\n**GI:**\n- Gastroparesis, constipation\n- Superior mesenteric artery (SMA) syndrome\n- Mallory-Weiss tears, esophageal rupture\n\n**Endocrine:**\n- Amenorrhea, hypothalamic dysfunction\n- Osteoporosis, stress fractures\n- Sick euthyroid syndrome\n\nWhat is the primary concern?',
    citation: [1, 2],
    options: [
      { label: 'Cardiac Instability', description: 'Bradycardia <40, QTc prolongation, syncope', next: 'ed-cardiac', urgency: 'critical' },
      { label: 'Electrolyte Derangement', description: 'Hypokalemia, hypophosphatemia, hypomagnesemia', next: 'ed-electrolytes', urgency: 'urgent' },
      { label: 'Refeeding Syndrome Risk', description: 'Severely malnourished, about to initiate nutrition', next: 'ed-refeeding', urgency: 'critical' },
      { label: 'Stable - Proceed to Risk Stratification', description: 'No acute medical emergency', next: 'ed-risk-strat' },
    ],
    summary: 'Identify primary complication: cardiac instability, electrolytes, or refeeding syndrome risk',
  },
  {
    id: 'ed-cardiac',
    type: 'info',
    module: 2,
    title: 'Cardiac Complications',
    body: '**Cardiac complications** are the leading cause of death in eating disorders [1][2].\n\n[QTc Calculator](#/calc/qtc-calculator)\n\n**Bradycardia:**\n- Adaptive response to starvation (reduced metabolic demand)\n- HR <40 bpm is HIGH RISK - may indicate decompensation\n- Asymptomatic bradycardia still warrants monitoring\n- Usually improves with nutritional rehabilitation\n\n**QTc Prolongation:**\n- **QTc >450ms = high risk for arrhythmia**\n- Caused by hypokalemia, hypomagnesemia, hypocalcemia\n- Can progress to Torsades de Pointes, sudden death\n- Correct electrolytes BEFORE initiating refeeding\n\n**Other Cardiac Findings:**\n- Mitral valve prolapse (lost myocardial mass)\n- Pericardial effusion (protein-calorie malnutrition)\n- Cardiomyopathy (ipecac use)\n\n**Management:**\n- Continuous telemetry monitoring\n- Correct electrolytes (K+ >3.5, Mg2+ >2.0)\n- Avoid QTc-prolonging medications\n- If HR <30 or symptomatic bradycardia: cardiology consult\n\n**Refeeding can worsen cardiac function initially** - fluid shifts cause CHF risk.',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'qtc-calculator', label: 'QTc Calculator' },
    ],
    next: 'ed-risk-strat',
    summary: 'Bradycardia <50 or QTc >500ms — admit to telemetry, correct electrolytes first',
    safetyLevel: 'critical',
  },
  {
    id: 'ed-electrolytes',
    type: 'info',
    module: 2,
    title: 'Electrolyte Derangements',
    body: '**Electrolyte abnormalities** are common and potentially fatal [1][4].\n\n[Electrolyte Replacement Guide](#/calc/electrolyte-replacement)\n\n**Hypokalemia (Most Common):**\n- Causes: Vomiting, laxatives, diuretics, starvation\n- Symptoms: Weakness, constipation, arrhythmias\n- **K+ <3.0 mEq/L:** IV replacement required\n- **K+ <2.5 mEq/L:** HIGH RISK for arrhythmia\n- Target: K+ >3.5 mEq/L before refeeding\n\n**Hypophosphatemia:**\n- Often normal or high-normal on presentation\n- **DROPS PRECIPITOUSLY** with refeeding (shifts into cells)\n- Causes: Respiratory failure, cardiac dysfunction, rhabdomyolysis, hemolysis\n- **Phos <1.0 mg/dL:** Critical - IV replacement\n- Prophylactic supplementation during refeeding\n\n**Hypomagnesemia:**\n- Coexists with hypokalemia (difficult to correct K+ without Mg2+)\n- Mg2+ <1.5 mEq/L: Replace IV\n- Also contributes to QTc prolongation\n\n**Replacement Principles:**\n1. Correct Mg2+ first (enables K+ correction)\n2. Correct K+ to >3.5 mEq/L\n3. Prophylactic phosphate with refeeding\n4. Recheck levels q6-12h initially',
    citation: [1, 4],
    treatment: {
      firstLine: {
        drug: 'Potassium Chloride',
        dose: 'IV: 10-20 mEq/hr (max 40 mEq/hr via central line) | PO: 40-80 mEq/day divided',
        route: 'IV (if K+ <3.0 or symptomatic) or PO',
        frequency: 'Recheck q4-6h until stable',
        duration: 'Until K+ >3.5 mEq/L',
        notes: 'Do not exceed 10 mEq/hr via peripheral IV. Correct Mg2+ concurrently.',
      },
      alternative: {
        drug: 'Magnesium Sulfate',
        dose: '2g IV over 2 hours',
        route: 'IV',
        frequency: 'May repeat if Mg2+ <1.5',
        duration: 'Until Mg2+ >2.0 mEq/L',
        notes: 'Essential for refractory hypokalemia. Replace before/with potassium.',
      },
      monitoring: 'Telemetry, serial electrolytes q6-12h, ECG for QTc monitoring.',
    },
    calculatorLinks: [
      { id: 'electrolyte-replacement', label: 'Electrolyte Replacement Guide' },
    ],
    next: 'ed-risk-strat',
    summary: 'Correct hypokalemia, hypomagnesemia, and hypophosphatemia before refeeding',
    safetyLevel: 'critical',
  },
  {
    id: 'ed-refeeding',
    type: 'info',
    module: 2,
    title: 'Refeeding Syndrome',
    body: '**Refeeding syndrome** is a potentially fatal metabolic response to nutritional rehabilitation after starvation [1][4].\n\n[Refeeding Risk Calculator](#/calc/refeeding-risk)\n\n**Pathophysiology:**\n- Starvation depletes intracellular phosphate, potassium, magnesium\n- Carbohydrate reintroduction triggers insulin release\n- Insulin drives electrolytes INTO cells\n- Rapid extracellular depletion: arrhythmias, respiratory failure, death\n\n**High Risk Criteria (NICE):**\n- BMI <16 kg/m\u00b2\n- >15% weight loss in 3-6 months\n- Minimal nutritional intake >10 days\n- Low K+, Phos, or Mg2+ prior to feeding\n- History of alcohol misuse, cancer, or malabsorption\n\n**Prevention Protocol:**\n1. **Check baseline:** K+, Phos, Mg2+, glucose, ECG\n2. **Correct deficiencies FIRST**\n3. **Start low, go slow:** 10-20 kcal/kg/day initially\n4. **Thiamine 100-200 mg IV** BEFORE feeding (prevents Wernicke)\n5. **Prophylactic phosphate:** 0.3-0.6 mmol/kg/day\n6. **Monitor:** Electrolytes q6-12h for first 72h\n\n**Increase calories by 200 kcal/day** as tolerated over 5-7 days.',
    citation: [1, 4],
    treatment: {
      firstLine: {
        drug: 'Thiamine (Vitamin B1)',
        dose: '100-200 mg',
        route: 'IV',
        frequency: 'Daily x 3-5 days',
        duration: 'Before and during refeeding initiation',
        notes: 'MUST give before carbohydrate loading to prevent Wernicke encephalopathy.',
      },
      alternative: {
        drug: 'Sodium/Potassium Phosphate',
        dose: '0.3-0.6 mmol/kg/day (prophylactic) | 0.5-1 mmol/kg IV over 6h (treatment)',
        route: 'IV or PO',
        frequency: 'Daily, divided doses',
        duration: 'Until phosphate stable >2.5 mg/dL',
        notes: 'Start prophylactically with refeeding. IV for Phos <2.0 mg/dL.',
      },
      monitoring: 'Electrolytes q6-12h x 72h, daily weights, strict I/Os, telemetry.',
    },
    calculatorLinks: [
      { id: 'refeeding-risk', label: 'Refeeding Risk Calculator' },
    ],
    next: 'ed-risk-strat',
    summary: 'Refeeding syndrome risk: start low-calorie feeds, monitor phosphate q12h for 72h',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 3: RISK STRATIFICATION
  // =====================================================================
  {
    id: 'ed-risk-strat',
    type: 'question',
    module: 3,
    title: 'Risk Stratification - MARSIPAN Criteria',
    body: '**MARSIPAN (Management of Really Sick Patients with Anorexia Nervosa)** provides admission criteria [2].\n\n[MARSIPAN Risk Assessment](#/calc/marsipan-risk)\n\n**HIGH RISK - Admit to Medical Unit:**\n- **BMI <13 kg/m\u00b2** (adults) or **<70% median BMI** (peds)\n- **HR <40 bpm** or **QTc >450ms**\n- **SBP <90 mmHg** or orthostatic drop >20 mmHg\n- **Temperature <35.5\u00b0C**\n- **Hypoglycemia** (glucose <60 mg/dL)\n- **K+ <3.0**, Phos <2.0, Mg2+ <1.5 mEq/L\n- **Rapid weight loss** (>1 kg/week)\n- **Acute medical complication** (seizures, syncope, chest pain)\n\n**MODERATE RISK:**\n- BMI 13-15 kg/m\u00b2\n- HR 40-50 bpm with normal QTc\n- Electrolytes mildly abnormal\n- Weight loss 0.5-1 kg/week\n\n**LOWER RISK:**\n- BMI >15 kg/m\u00b2\n- Stable vital signs\n- Normal electrolytes\n- Slow weight loss with outpatient support\n\nWhat is the risk level?',
    citation: [2],
    calculatorLinks: [
      { id: 'marsipan-risk', label: 'MARSIPAN Risk Assessment' },
      { id: 'bmi-severity', label: 'BMI Severity Classification' },
    ],
    options: [
      { label: 'High Risk', description: 'Meets any high-risk criterion', next: 'ed-acute-mgmt', urgency: 'critical' },
      { label: 'Moderate Risk', description: 'Concerning but no critical findings', next: 'ed-acute-mgmt', urgency: 'urgent' },
      { label: 'Lower Risk', description: 'Medically stable, consider outpatient', next: 'ed-psych-assess' },
    ],
    summary: 'Risk stratify using MARSIPAN criteria: BMI, vitals, electrolytes, ECG — determines disposition',
  },
  {
    id: 'ed-bmi-classification',
    type: 'info',
    module: 3,
    title: 'BMI Severity Classification',
    body: '**BMI is a key indicator** of severity in Anorexia Nervosa (DSM-5 criteria) [1][3].\n\n[BMI Calculator](#/calc/bmi-severity)\n\n**Adult AN Severity by BMI:**\n\n| Severity | BMI (kg/m\u00b2) | Risk Level |\n|----------|------------|------------|\n| Mild | 17.0-18.49 | Outpatient |\n| Moderate | 16.0-16.99 | Day program |\n| Severe | 15.0-15.99 | Inpatient |\n| Extreme | <15.0 | Medical admission |\n\n**MARSIPAN Critical Thresholds:**\n- **BMI <13:** Extreme medical risk, ICU may be needed\n- **BMI <11:** Imminent life threat\n\n**Pediatric Considerations:**\n- Use **%median BMI** (based on 50th percentile for age/sex)\n- Severe: <70% median BMI\n- Moderate: 70-80% median BMI\n- Mild: 80-90% median BMI\n\n**Important Caveats:**\n- **Atypical AN:** Significant weight loss but BMI may be normal\n- **Dehydration:** Artificially elevates BMI\n- **Edema:** Artificially elevates weight\n- **Rate of loss matters:** Rapid loss is higher risk regardless of absolute BMI',
    citation: [1, 3],
    calculatorLinks: [
      { id: 'bmi-severity', label: 'BMI Severity Classification' },
    ],
    next: 'ed-acute-mgmt',
    summary: 'BMI severity: <15 high risk, <13 extreme risk — correlates with medical instability',
    skippable: true,
  },

  // =====================================================================
  // MODULE 4: ACUTE MANAGEMENT
  // =====================================================================
  {
    id: 'ed-acute-mgmt',
    type: 'info',
    module: 4,
    title: 'Acute Management Principles',
    body: '**ED management priorities** for medically unstable eating disorder patients [1][2][4].\n\n**Initial Stabilization:**\n1. **Cardiac monitoring:** Continuous telemetry\n2. **IV access:** Two large-bore IVs\n3. **Labs:** BMP, Mg2+, Phos, CBC, LFTs, glucose, ECG\n4. **Fluids:** Cautious - avoid rapid volume expansion (CHF risk)\n\n**Specific Interventions:**\n\n| Problem | Intervention |\n|---------|-------------|\n| Bradycardia <40 | Monitor, rewarming, atropine rarely needed |\n| Hypotension | Cautious fluids (250mL boluses), avoid vasopressors |\n| Hypothermia | Passive rewarming (blankets), warm IV fluids |\n| Hypoglycemia | D10W or D50 bolus, then D5 maintenance |\n| QTc >450ms | Correct K+, Mg2+, Phos; avoid QTc-prolonging drugs |\n\n**Medication Cautions:**\n- Avoid SSRIs acutely (QTc prolongation when malnourished)\n- Avoid metoclopramide (QTc, dystonias)\n- Use ondansetron cautiously (QTc)\n- Avoid laxatives (reinforces purging)\n\n**Do NOT delay refeeding** for mild electrolyte abnormalities - correct and feed simultaneously.',
    citation: [1, 2, 4],
    next: 'ed-electrolyte-replacement',
    summary: 'Medical stabilization takes precedence over psychiatric disposition — correct lethal derangements first',
    safetyLevel: 'warning',
  },
  {
    id: 'ed-electrolyte-replacement',
    type: 'info',
    module: 4,
    title: 'Electrolyte Replacement Protocol',
    body: '**Systematic electrolyte correction** before and during refeeding [4].\n\n[Electrolyte Replacement Guide](#/calc/electrolyte-replacement)\n\n**Order of Correction:**\n1. **Magnesium FIRST** (enables K+ repletion)\n2. **Potassium SECOND** (most common deficit)\n3. **Phosphate THIRD** (often normal until refeeding)\n\n**Potassium Replacement:**\n- **K+ 3.0-3.5:** PO KCl 40-80 mEq/day in divided doses\n- **K+ 2.5-3.0:** IV KCl 10 mEq/hr (peripheral) + PO\n- **K+ <2.5:** IV KCl 20 mEq/hr (central line), cardiac monitoring\n\n**Magnesium Replacement:**\n- **Mg2+ 1.5-2.0:** PO Mg oxide 400-800 mg/day\n- **Mg2+ <1.5:** IV MgSO4 2g over 2h, may repeat\n\n**Phosphate Replacement:**\n- **Phos 2.0-2.5:** PO Neutra-Phos 250-500 mg TID\n- **Phos 1.0-2.0:** IV sodium/potassium phos 0.16-0.32 mmol/kg over 6h\n- **Phos <1.0:** IV phos 0.5 mmol/kg over 6h (monitor for hypocalcemia)\n\n**Monitoring:**\n- Q6h electrolytes for first 24-48h of refeeding\n- Daily thereafter until stable\n- ECG daily while QTc elevated',
    citation: [4],
    treatment: {
      firstLine: {
        drug: 'Potassium Chloride',
        dose: 'PO: 40-80 mEq/day divided | IV: 10-20 mEq/hr',
        route: 'PO preferred if K+ >2.5 and tolerating PO',
        frequency: 'Divided doses PO or continuous IV',
        duration: 'Until K+ >3.5 mEq/L',
        notes: 'Max 10 mEq/hr via peripheral IV. Central line for higher rates.',
      },
      alternative: {
        drug: 'Magnesium Sulfate',
        dose: '2g IV over 2 hours',
        route: 'IV',
        frequency: 'May repeat q4-6h if Mg2+ remains low',
        duration: 'Until Mg2+ >2.0 mEq/L',
        notes: 'Correct before potassium for refractory hypokalemia.',
      },
      adjunct: {
        drug: 'Sodium/Potassium Phosphate',
        dose: 'Prophylactic: 0.3 mmol/kg/day PO | Treatment: 0.16-0.5 mmol/kg IV over 6h',
        route: 'PO (prophylactic) or IV (if Phos <2.0)',
        frequency: 'Daily, check Phos q6h during refeeding',
        duration: 'Until Phos stable >2.5 mg/dL',
        notes: 'Start prophylactically with refeeding. Monitor calcium (can cause hypocalcemia).',
      },
      monitoring: 'Telemetry, electrolytes q6h x 48h then daily, ECG daily while QTc elevated.',
    },
    calculatorLinks: [
      { id: 'electrolyte-replacement', label: 'Electrolyte Replacement Guide' },
    ],
    next: 'ed-refeeding-protocol',
    summary: 'Replace K+ before refeeding, Mg2+ before K+ (Mg depletion causes K+ wasting), check phosphate',
    safetyLevel: 'critical',
  },
  {
    id: 'ed-refeeding-protocol',
    type: 'info',
    module: 4,
    title: 'Refeeding Protocol - Start Low, Go Slow',
    body: '**Safe refeeding initiation** prevents refeeding syndrome [1][4].\n\n[Refeeding Risk Calculator](#/calc/refeeding-risk)\n\n**Before Starting:**\n- Correct K+ >3.0, Mg2+ >1.8, Phos >2.0\n- Give **Thiamine 100-200 mg IV** (prevents Wernicke)\n- Baseline ECG, electrolytes, glucose\n\n**Initial Caloric Prescription:**\n\n| Risk Level | Starting Calories | Advancement |\n|------------|------------------|-------------|\n| Extreme (BMI <13) | 5-10 kcal/kg/day | +5 kcal/kg q2-3 days |\n| High Risk | 10-15 kcal/kg/day | +200 kcal/day |\n| Moderate Risk | 15-20 kcal/kg/day | +200 kcal/day |\n\n**Route:**\n- Oral feeding preferred if patient is cooperative\n- NG tube if refusing or unable to meet caloric goals\n- TPN rarely needed (higher refeeding risk)\n\n**Monitoring During Refeeding:**\n- **Electrolytes:** q6-12h for 72h, then daily\n- **Glucose:** q6h initially (hypoglycemia common)\n- **Weights:** Daily (expect initial fluid retention)\n- **I/Os:** Strict - watch for fluid overload\n- **ECG:** Daily until QTc normalizes\n\n**Red Flags During Refeeding:**\n- Phosphate drop >30% = slow advancement\n- New arrhythmia, CHF symptoms = stop and reassess',
    citation: [1, 4],
    treatment: {
      firstLine: {
        drug: 'Thiamine (Vitamin B1)',
        dose: '100-200 mg',
        route: 'IV',
        frequency: 'Daily',
        duration: '3-5 days minimum',
        notes: 'MUST give before carbohydrate loading. Prevents Wernicke encephalopathy.',
      },
      alternative: {
        drug: 'Multivitamin + Minerals',
        dose: 'Standard multivitamin daily + Zinc 15 mg + Vitamin D',
        route: 'PO',
        frequency: 'Daily',
        duration: 'Throughout hospitalization and outpatient',
        notes: 'Nutritional deficiencies are universal. Include zinc for appetite.',
      },
      monitoring: 'Electrolytes q6-12h x 72h, daily weights, strict I/Os, daily ECG.',
    },
    calculatorLinks: [
      { id: 'refeeding-risk', label: 'Refeeding Risk Calculator' },
    ],
    next: 'ed-cardiac-monitoring',
    summary: 'Start 10-20 kcal/kg/day, advance slowly over 5-7 days, replace phosphate aggressively',
    safetyLevel: 'critical',
  },
  {
    id: 'ed-cardiac-monitoring',
    type: 'info',
    module: 4,
    title: 'Cardiac Monitoring Protocol',
    body: '**Cardiac complications** require vigilant monitoring [1][2].\n\n[QTc Calculator](#/calc/qtc-calculator)\n\n**Telemetry Indications:**\n- HR <50 bpm or >100 bpm\n- QTc >450 ms\n- Electrolyte abnormalities (K+ <3.5, Mg2+ <2.0)\n- During refeeding initiation (first 72h minimum)\n- Any arrhythmia history\n\n**QTc Monitoring:**\n- **QTc 450-480 ms:** Moderate risk - daily ECG, correct electrolytes\n- **QTc >480 ms:** High risk - q12h ECG, aggressive electrolyte correction\n- **QTc >500 ms:** Critical - ICU monitoring, cardiology consult\n\n**Drugs to AVOID:**\n- Metoclopramide, ondansetron (QTc)\n- Erythromycin, fluoroquinolones (QTc)\n- Antipsychotics (especially haloperidol, droperidol)\n- SSRIs during acute malnutrition\n\n**Bradycardia Management:**\n- Usually physiologic adaptation - observe\n- **HR <30 or symptomatic:** Atropine 0.5mg IV, transcutaneous pacing available\n- Improves with nutritional rehabilitation\n\n**When to consult cardiology:**\n- HR <30 bpm\n- QTc >500 ms\n- New arrhythmia\n- Signs of heart failure during refeeding',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'qtc-calculator', label: 'QTc Calculator' },
    ],
    next: 'ed-psych-assess',
    summary: 'Continuous telemetry if QTc >450ms, HR <40, or electrolyte derangement — arrhythmia risk',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 5: PSYCHIATRIC ASSESSMENT
  // =====================================================================
  {
    id: 'ed-psych-assess',
    type: 'question',
    module: 5,
    title: 'Psychiatric Assessment',
    body: '**Eating disorders have high rates of psychiatric comorbidity** [1][5].\n\n**Suicide Risk:**\n- **AN has the highest mortality of any psychiatric disorder**\n- ~20% due to suicide\n- All patients need suicide risk assessment\n- Document: ideation, plan, intent, means, protective factors\n\n**Common Comorbidities:**\n- Major Depression (50-75%)\n- Anxiety disorders (up to 60%)\n- OCD (25-40%)\n- Substance use disorders\n- Personality disorders (especially BN)\n- PTSD/trauma history\n\n**Capacity Assessment:**\n- Malnutrition impairs cognition and judgment\n- Anosognosia (lack of insight) is common in AN\n- Assess: understanding, appreciation, reasoning, communication\n- Severely malnourished patients may lack capacity\n\n**Treatment Refusal:**\n- **Medical emergency = treat without consent**\n- Otherwise, involve psychiatry and ethics\n- Consider involuntary commitment if imminent danger\n\nIs the patient at risk for self-harm or refusing treatment?',
    citation: [1, 5],
    options: [
      { label: 'Acute Suicide Risk', description: 'Active ideation with plan/intent', next: 'ed-suicide-risk', urgency: 'critical' },
      { label: 'Treatment Refusal', description: 'Refusing medical care or nutrition', next: 'ed-capacity', urgency: 'urgent' },
      { label: 'Cooperative, No Acute Risk', description: 'Accepting treatment, no self-harm risk', next: 'ed-involuntary' },
    ],
    summary: 'Psychiatric assessment after medical stabilization — assess suicidality, capacity, and motivation',
    safetyLevel: 'warning',
  },
  {
    id: 'ed-suicide-risk',
    type: 'info',
    module: 5,
    title: 'Suicide Risk Management',
    body: '**Suicide risk assessment** is critical in eating disorder patients [5].\n\n**Risk Factors Specific to Eating Disorders:**\n- Prior suicide attempts (strongest predictor)\n- Purging behaviors (higher risk than restrictive AN)\n- Comorbid depression, substance use, personality disorder\n- Recent weight restoration (paradoxically increases risk)\n- Treatment dropout\n- Longer duration of illness\n\n**Assessment Questions:**\n- "Have you had thoughts of hurting yourself or ending your life?"\n- "Do you have a plan? Access to means?"\n- "What has stopped you from acting on these thoughts?"\n- "How would you rate your safety right now on a scale of 1-10?"\n\n**Immediate Actions:**\n- 1:1 observation\n- Remove means (sharps, cords, medications)\n- Psychiatric consultation\n- Safety plan documentation\n- Consider involuntary hold if imminent risk\n\n**Documentation:**\n- Risk level (low/moderate/high/imminent)\n- Risk and protective factors\n- Means restriction counseling\n- Plan for monitoring and disposition',
    citation: [5],
    next: 'ed-disposition',
    summary: 'Eating disorders carry high suicide risk — formal safety assessment on all presentations',
    safetyLevel: 'warning',
  },
  {
    id: 'ed-capacity',
    type: 'info',
    module: 5,
    title: 'Capacity Evaluation & Treatment Refusal',
    body: '**Capacity assessment** is essential when patients refuse treatment [5].\n\n**Four Components of Capacity:**\n1. **Understanding:** Can explain the diagnosis and proposed treatment\n2. **Appreciation:** Recognizes how illness applies to their situation\n3. **Reasoning:** Can weigh risks/benefits, compare alternatives\n4. **Expression:** Can communicate a stable choice\n\n**Factors That Impair Capacity in AN:**\n- Severe malnutrition affects cognition\n- Anosognosia (inability to recognize illness severity)\n- Depression/anxiety cloud judgment\n- Obsessional thinking about weight/food\n\n**If Patient Refuses Treatment:**\n\n**Medical Emergency (imminent life threat):**\n- Treat without consent under emergency doctrine\n- Document the emergency clearly\n- Examples: K+ <2.5, HR <30, glucose <50\n\n**Not Immediate Emergency:**\n- Formal capacity evaluation\n- Psychiatry consult\n- If lacks capacity: seek surrogate decision-maker or court order\n- If has capacity: document informed refusal, offer alternatives\n\n**Consider Involuntary Commitment** if:\n- Lacks capacity AND\n- Imminent danger to self AND\n- Less restrictive alternatives exhausted',
    citation: [5],
    next: 'ed-involuntary',
    summary: 'Assess decision-making capacity — severe malnutrition can impair cognition and judgment',
    skippable: true,
  },
  {
    id: 'ed-involuntary',
    type: 'info',
    module: 5,
    title: 'Involuntary Treatment Considerations',
    body: '**Involuntary psychiatric hold** may be necessary for life-saving treatment [5].\n\n**Criteria for Involuntary Hold (vary by state):**\n1. Mental illness present (eating disorder qualifies)\n2. Imminent danger to self (medical instability or suicide risk)\n3. Unable to provide for basic needs (nutrition)\n4. Less restrictive alternatives insufficient\n\n**Medical Criteria Supporting Involuntary Hold:**\n- BMI <13 with refusal to eat\n- Life-threatening electrolyte abnormalities\n- Cardiac instability (HR <40, QTc >500)\n- Inability to recognize severity of illness\n\n**Process:**\n1. Document medical necessity thoroughly\n2. Psychiatry consultation\n3. Complete state-specific hold paperwork\n4. Arrange appropriate level of care (medical unit with psych support)\n5. Legal review within statutory timeframe\n\n**Ethical Considerations:**\n- Autonomy vs. beneficence\n- Preserving life allows future autonomous decisions\n- Malnutrition impairs the very cognition needed for capacity\n- Most patients later grateful for intervention\n\n**Court-ordered treatment** may be needed for extended medical treatment against patient wishes.',
    citation: [5],
    next: 'ed-disposition',
    summary: 'Involuntary treatment may be needed if life-threatening refusal of care and lacks capacity',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================
  {
    id: 'ed-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition Planning',
    body: '**Disposition depends on medical stability AND psychiatric safety** [1][2].\n\n**Medical Admission Criteria (MARSIPAN):**\n- BMI <13 kg/m\u00b2 (or rapid weight loss)\n- HR <40 or QTc >450ms\n- SBP <90 or significant orthostatic changes\n- Temperature <35.5\u00b0C\n- Electrolyte abnormalities requiring IV correction\n- Refeeding syndrome risk requiring monitoring\n- Unable to stop purging behaviors\n\n**Psychiatric Admission Criteria:**\n- Acute suicide risk\n- Unable to contract for safety\n- Treatment refusal with lack of capacity\n- Failure of outpatient treatment\n\n**Levels of Care (least to most intensive):**\n1. Outpatient (therapy + nutrition counseling)\n2. Intensive Outpatient (IOP) - 3+ days/week\n3. Partial Hospitalization (PHP) - daily treatment, home nights\n4. Residential Treatment - 24h treatment facility\n5. Inpatient Psychiatric - acute stabilization\n6. Medical Hospitalization - medical complications\n\nWhat is the appropriate disposition?',
    citation: [1, 2],
    options: [
      { label: 'Medical Admission', description: 'Medical instability requiring monitoring', next: 'ed-medical-admit', urgency: 'critical' },
      { label: 'Psychiatric Admission', description: 'Suicide risk or treatment refusal', next: 'ed-psych-admit', urgency: 'urgent' },
      { label: 'Outpatient with Close Follow-up', description: 'Medically and psychiatrically stable', next: 'ed-outpatient' },
    ],
    summary: 'Admit if BMI <15, HR <50, K+ <3.0, QTc >500, orthostatic, or refeeding risk',
  },
  {
    id: 'ed-medical-admit',
    type: 'result',
    module: 6,
    title: 'Medical Admission',
    body: '**Medical admission** for eating disorder requires specialized care [1][2].\n\n**Admission Orders:**\n- Telemetry monitoring\n- Strict I/Os, daily weights (AM, gowned, post-void)\n- Electrolytes q6-12h initially, then daily\n- Glucose q6h (hypoglycemia risk)\n- Daily ECG until QTc normalizes\n- 1:1 or close observation during/after meals\n- Bathroom supervision (prevent purging)\n\n**Nutrition Orders:**\n- Registered dietitian consult\n- Start 10-20 kcal/kg/day (based on risk)\n- Advance by 200 kcal/day as tolerated\n- Thiamine 100mg IV/PO daily\n- Multivitamin with minerals\n- Prophylactic phosphate supplementation\n\n**Consults:**\n- Psychiatry (mandatory)\n- Nutrition/Dietitian\n- Social Work\n- Consider Cardiology if QTc >480 or HR <40\n\n**Discharge Criteria:**\n- HR >50, SBP >90, afebrile\n- QTc <450ms\n- Electrolytes normal without IV supplementation\n- Tolerating adequate oral nutrition\n- No refeeding syndrome\n- Psychiatric clearance and follow-up arranged',
    recommendation: 'Medical admission with telemetry, refeeding protocol, and psychiatric consultation. Target HR >50, QTc <450ms, normal electrolytes before discharge. Arrange appropriate step-down level of care.',
    confidence: 'recommended',
    citation: [1, 2],
    summary: 'Medical admission: HR <50, QTc >450, K+ <3.0, BMI <15, orthostatic, refeeding risk',
    safetyLevel: 'warning',
  },
  {
    id: 'ed-psych-admit',
    type: 'result',
    module: 6,
    title: 'Psychiatric Admission',
    body: '**Psychiatric admission** for eating disorders requires medical clearance [1][5].\n\n**Indications:**\n- Acute suicidality with plan/intent\n- Severe self-harm behaviors\n- Treatment refusal with lack of capacity\n- Severe functional impairment\n- Failed outpatient/partial hospitalization\n- Need for intensive behavioral intervention\n\n**Medical Clearance Requirements:**\n- HR >50 bpm\n- QTc <450ms\n- Electrolytes stable (can continue PO replacement)\n- No active refeeding syndrome\n- Able to eat orally (some psychiatric units cannot do NG feeds)\n\n**If Medically Unstable for Psychiatric Unit:**\n- Admit to medical unit with psychiatric consultation\n- Some facilities have combined medical-psychiatric units\n- Transfer to psychiatric facility once medically stable\n\n**Documentation for Transfer:**\n- Medical stability summary\n- Current medications and labs\n- Psychiatric evaluation and risk assessment\n- Recommended level of care\n- Follow-up requirements\n\n**Post-Discharge:**\n- Outpatient therapy (CBT-E, FBT for adolescents)\n- Nutrition counseling\n- Medical monitoring\n- Psychiatric medication management if indicated',
    recommendation: 'Psychiatric admission after medical clearance. Ensure HR >50, QTc <450ms, stable electrolytes. Document risk assessment and recommended treatment level. Coordinate medical monitoring post-discharge.',
    confidence: 'recommended',
    citation: [1, 5],
    summary: 'Psychiatric admission if medically stable but high self-harm risk or unable to maintain nutrition',
  },
  {
    id: 'ed-outpatient',
    type: 'result',
    module: 6,
    title: 'Outpatient Disposition',
    body: '**Outpatient management** is appropriate for medically and psychiatrically stable patients [1].\n\n**Prerequisites for Discharge:**\n- HR >50 bpm\n- SBP >90 mmHg, no significant orthostatics\n- QTc <450ms\n- K+ >3.5, Phos >2.5, Mg2+ >2.0\n- No active suicidal ideation\n- Supportive living environment\n- Commitment to follow-up and treatment\n\n**Discharge Instructions:**\n1. **Follow-up:** PCP within 1 week, eating disorder specialist within 2 weeks\n2. **Warning signs to return:**\n   - Dizziness, fainting, chest pain, palpitations\n   - Severe weakness or inability to function\n   - Suicidal thoughts\n   - Unable to keep down food/fluids\n3. **Medications:** Continue electrolyte supplements as prescribed\n4. **Nutrition plan:** Provide written meal plan from dietitian\n\n**Outpatient Resources:**\n- **NEDA Helpline:** 1-800-931-2237\n- **Crisis Text Line:** Text "NEDA" to 741741\n- Individual therapy (CBT-E, DBT)\n- Family-Based Treatment (FBT) for adolescents\n- Registered dietitian specialized in eating disorders\n\n**Safety Planning:**\n- Identify warning signs\n- Coping strategies\n- Support contacts\n- Crisis resources',
    recommendation: 'Discharge with close outpatient follow-up. PCP within 1 week, eating disorder specialist within 2 weeks. Provide written nutrition plan, safety resources, and clear return precautions.',
    confidence: 'recommended',
    citation: [1],
    calculatorLinks: [
      { id: 'marsipan-risk', label: 'MARSIPAN Risk Assessment' },
    ],
    summary: 'Outpatient only if medically stable, eating disorder team in place, and reliable follow-up',
    skippable: true,
  },
];

export const EATING_DISORDERS_NODE_COUNT = EATING_DISORDERS_NODES.length;

export const EATING_DISORDERS_MODULE_LABELS = [
  'Recognition',
  'Medical Complications',
  'Risk Stratification',
  'Acute Management',
  'Psychiatric Assessment',
  'Disposition',
];

export const EATING_DISORDERS_CRITICAL_ACTIONS = [
  { text: 'MARSIPAN Risk Assessment for medical severity stratification', nodeId: 'ed-start' },
  { text: 'Check BMI - severe AN defined as BMI <15 (extreme <13)', nodeId: 'ed-medical-severity' },
  { text: 'Screen for refeeding syndrome risk: phosphate <0.6, K+ <2.5, Mg <1.4, or rapid weight loss', nodeId: 'ed-refeeding-risk' },
  { text: 'Start prophylactic thiamine 100-300 mg IV/PO BEFORE nutrition if at refeeding risk', nodeId: 'ed-refeeding-prevent' },
  { text: 'Initial feeding: 10-20 kcal/kg/day for high-risk, increase 200 kcal every 3-4 days', nodeId: 'ed-refeeding-prevent' },
  { text: 'Check phosphate, K+, Mg, glucose daily during first week of refeeding', nodeId: 'ed-labs-refeeding' },
  { text: 'ECG for prolonged QTc (>450ms) - increased risk of sudden death', nodeId: 'ed-medical-severity' },
  { text: 'Admit for HR <40, SBP <90, glucose <60, temp <35.5C, prolonged QTc, or severe electrolytes', nodeId: 'ed-admit-criteria' },
  { text: 'NG feeds if unable to meet oral nutrition goals (NOT as punishment)', nodeId: 'ed-nutrition-support' },
  { text: 'Psychiatric clearance required before discharge for intentional self-harm or active suicidal ideation', nodeId: 'ed-psych-assessment' },
];

export const EATING_DISORDERS_CITATIONS: Citation[] = [
  { num: 1, text: 'Mehler PS, Andersen AE. Eating Disorders: A Guide to Medical Care and Complications. 3rd ed. Johns Hopkins University Press. 2017.' },
  { num: 2, text: 'Royal College of Psychiatrists. MARSIPAN: Management of Really Sick Patients with Anorexia Nervosa. 2nd ed. CR189. 2022.' },
  { num: 3, text: 'American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders (DSM-5-TR). 5th ed. 2022.' },
  { num: 4, text: 'National Institute for Health and Care Excellence (NICE). Eating Disorders: Recognition and Treatment. NG69. 2017 (updated 2020).' },
  { num: 5, text: 'American Psychiatric Association. Practice Guideline for the Treatment of Patients with Eating Disorders. 3rd ed. 2023.' },
];
