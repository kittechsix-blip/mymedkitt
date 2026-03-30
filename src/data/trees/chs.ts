// MedKitt — Cannabinoid Hyperemesis Syndrome (CHS)
// Clinical Recognition → Rule Out Organic Causes → Acute Antiemetic Management → Capsaicin Adjunct → Treatment Response → Disposition
// 6 modules: Clinical Recognition & Diagnosis → Rule Out Organic Causes → Acute Antiemetic Management → Capsaicin Adjunct → Treatment Response & Escalation → Disposition & Discharge Counseling
// 25 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const CHS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: CLINICAL RECOGNITION & DIAGNOSIS
  // =====================================================================

  {
    id: 'chs-start',
    type: 'info',
    module: 1,
    title: 'Cannabinoid Hyperemesis Syndrome',
    body: '[CHS Steps Summary](#/info/chs-summary)\n\nCHS is a clinical syndrome in chronic cannabis users characterized by cyclic nausea/vomiting and compulsive hot water bathing (~90% of patients). Traditional antiemetics (ondansetron) usually **FAIL**. GRACE-4 guidelines recommend butyrophenones as first-line therapy. Definitive treatment is cannabis cessation.',
    citation: [1, 2, 9],
    next: 'chs-presentation',
  },

  {
    id: 'chs-presentation',
    type: 'question',
    module: 1,
    title: 'Clinical Phase',
    body: 'Which phase is the patient presenting in?\n\n**Prodromal:** Morning nausea, food aversion, vague abdominal discomfort\n**Hyperemetic:** Intense nausea/vomiting, compulsive hot bathing, significant dehydration\n**Recovery:** Resolving symptoms with cannabis abstinence',
    citation: [1, 6],
    options: [
      {
        label: 'Prodromal',
        description: 'Morning nausea, food aversion, mild symptoms',
        next: 'chs-diagnostic-criteria',
      },
      {
        label: 'Hyperemetic',
        description: 'Intense vomiting, hot water bathing, dehydration',
        urgency: 'urgent',
        next: 'chs-hyperemetic',
      },
      {
        label: 'Recovery / Follow-up',
        description: 'Symptom resolution with abstinence',
        next: 'chs-diagnostic-criteria',
      },
    ],
  },

  {
    id: 'chs-hyperemetic',
    type: 'info',
    module: 1,
    title: 'Hyperemetic Phase',
    body: 'Profuse vomiting (often >7 episodes/day), diffuse abdominal pain, compulsive hot water bathing for relief, significant volume depletion.\n\n**Complications to screen for:**\n\u2022 AKI from dehydration\n\u2022 Electrolyte abnormalities (hypokalemia, hyponatremia, hypomagnesemia)\n\u2022 Mallory-Weiss tear (hematemesis)\n\u2022 Boerhaave syndrome (rare but life-threatening \u2014 chest pain, subcutaneous emphysema after forceful vomiting)\n\nWeight loss common with recurrent episodes.',
    citation: [1, 6, 7, 11],
    next: 'chs-diagnostic-criteria',
  },

  {
    id: 'chs-diagnostic-criteria',
    type: 'info',
    module: 1,
    title: 'Diagnostic Criteria',
    body: '**CHS is a clinical diagnosis of exclusion.** No standardized ED diagnostic criteria exist.\n\n**Simonetto Criteria (2012):**\n1. Long-term cannabis use (usually daily, >1 year)\n2. Cyclic nausea and vomiting\n3. Symptom resolution with cannabis cessation\n4. No alternative diagnosis\n\n**Supportive features:**\n\u2022 Compulsive hot water bathing (~90%)\n\u2022 Age <50 at onset\n\u2022 Morning predominance of nausea\n\u2022 Weight loss >5 kg\n\u2022 Cannabis use \u2265weekly for \u22651 year\n\n**Key distinction from Cyclic Vomiting Syndrome (CVS):** [Differential Diagnosis](#/info/chs-ddx)',
    citation: [1, 2, 6, 14],
    next: 'chs-red-flags',
  },

  // =====================================================================
  // MODULE 2: RULE OUT ORGANIC CAUSES
  // =====================================================================

  {
    id: 'chs-red-flags',
    type: 'question',
    module: 2,
    title: 'Red Flags Present?',
    body: 'Screen for features suggesting an alternative diagnosis:\n\u2022 Hematemesis or melena\n\u2022 Severe localized abdominal pain (RUQ, RLQ, epigastric)\n\u2022 Peritoneal signs (guarding, rigidity, rebound)\n\u2022 Bilious emesis\n\u2022 Fever >38.5\u00b0C\n\u2022 Jaundice\n\u2022 Age of first episode >50\n\u2022 No cannabis use history\n\n[Differential Diagnosis](#/info/chs-ddx)',
    citation: [2, 3],
    options: [
      {
        label: 'Red flags present',
        description: 'Features suggest alternative diagnosis',
        urgency: 'urgent',
        next: 'chs-organic-workup',
      },
      {
        label: 'No red flags',
        description: 'Clinical picture consistent with CHS',
        next: 'chs-labs',
      },
    ],
  },

  {
    id: 'chs-organic-workup',
    type: 'info',
    module: 2,
    title: 'Alternative Diagnosis Workup',
    body: 'Red flags present \u2014 pursue targeted workup:\n\n**Differential Diagnosis:**\n\u2022 **Cyclic Vomiting Syndrome** \u2014 no cannabis association, may respond to triptans\n\u2022 **Gastroparesis** \u2014 worse postprandially, delayed gastric emptying study\n\u2022 **Cannabis withdrawal** \u2014 occurs AFTER cessation, not during use\n\u2022 **Biliary disease** \u2014 RUQ pain, Murphy sign, check LFTs/RUQ US\n\u2022 **Pancreatitis** \u2014 epigastric radiating to back, check lipase\n\u2022 **Bowel obstruction** \u2014 distension, absent bowel sounds, imaging\n\u2022 **Pregnancy** \u2014 check hCG\n\u2022 **Adrenal insufficiency** \u2014 morning nausea overlap, check cortisol\n\nOrder imaging and labs as clinically indicated.',
    citation: [2, 6, 14],
    next: 'chs-organic-found',
  },

  {
    id: 'chs-organic-found',
    type: 'result',
    module: 2,
    title: 'Alternative Diagnosis Found',
    body: 'Workup reveals an alternative etiology for the patient\'s symptoms.',
    recommendation: 'Treat the underlying cause. CHS remains a diagnosis of exclusion \u2014 if no alternative diagnosis is identified on repeat evaluation, reconsider CHS.',
    confidence: 'consider',
    citation: [2],
  },

  {
    id: 'chs-labs',
    type: 'info',
    module: 2,
    title: 'Lab Panel & ECG',
    body: '**Order baseline labs:**\n\u2022 **BMP** \u2014 Cr (AKI screening), electrolytes (hypokalemia, hyponatremia)\n\u2022 **Magnesium** \u2014 often depleted with prolonged vomiting\n\u2022 **Lipase** \u2014 rule out pancreatitis\n\u2022 **Urine drug screen** \u2014 confirms cannabis use\n\u2022 **Pregnancy test** \u2014 all women of reproductive age\n\u2022 **Lactate** \u2014 if severe dehydration/hypoperfusion\n\n**ECG** \u2014 obtain BEFORE administering butyrophenones (haloperidol, droperidol). Check baseline QTc.\n\n**Note:** Ondansetron is typically ineffective in CHS \u2014 do not rely on it as first-line therapy.',
    citation: [2, 3, 7],
    next: 'chs-ecg',
  },

  {
    id: 'chs-ecg',
    type: 'question',
    module: 2,
    title: 'QTc Assessment',
    body: 'Is the baseline QTc prolonged (>500ms)?\n\nButyrophenones (haloperidol, droperidol) carry QTc prolongation risk. If QTc >500ms, avoid butyrophenones and use olanzapine instead.',
    citation: [2, 4],
    options: [
      {
        label: 'QTc >500ms',
        description: 'Avoid butyrophenones',
        urgency: 'urgent',
        next: 'chs-qtc-prolonged',
      },
      {
        label: 'QTc normal (<500ms)',
        description: 'Safe to use butyrophenones',
        next: 'chs-iv-access',
      },
    ],
  },

  // =====================================================================
  // MODULE 3: ACUTE ANTIEMETIC MANAGEMENT
  // =====================================================================

  {
    id: 'chs-iv-access',
    type: 'info',
    module: 3,
    title: 'Initial Resuscitation',
    body: '**Immediate interventions:**\n\u2022 IV access \u2014 2 large-bore IVs if severe dehydration\n\u2022 **NS bolus 20 mL/kg** for volume repletion\n\u2022 NPO (nothing by mouth until vomiting controlled)\n\u2022 Cardiac monitor\n\n**GRACE-4 Good Practice Statement:**\n\u26a0\ufe0f **AVOID opioids and benzodiazepines** \u2014 opioids worsen gastroparesis, benzodiazepines are ineffective for CHS nausea, and both create dependence risk in this population.\n\nProceed to first-line antiemetic therapy.',
    citation: [2, 3, 8],
    next: 'chs-first-line',
  },

  {
    id: 'chs-first-line',
    type: 'question',
    module: 3,
    title: 'First-Line Antiemetic \u2014 Butyrophenone Choice',
    body: '**GRACE-4 Recommendation 1:** Suggest butyrophenones over 5-HT3 antagonists (ondansetron) for CHS (conditional, low certainty evidence).\n\nThe **HaVOC Trial** (2021) demonstrated haloperidol 0.05 mg/kg IV achieved greater nausea VAS reduction at 2 hours compared to ondansetron 4mg IV.\n\nChoose butyrophenone:',
    citation: [2, 4, 10],
    options: [
      {
        label: 'Haloperidol',
        description: 'HaVOC trial dose: 0.05 mg/kg IV',
        next: 'chs-haloperidol',
      },
      {
        label: 'Droperidol',
        description: '0.625-2.5 mg IV \u2014 faster onset',
        next: 'chs-droperidol',
      },
    ],
  },

  {
    id: 'chs-haloperidol',
    type: 'info',
    module: 3,
    title: 'Haloperidol Protocol',
    body: '[Haloperidol](#/drug/haloperidol/chs) **0.05 mg/kg IV** over 5 minutes (max 5 mg)\n\n**HaVOC Trial Evidence:**\n\u2022 Greater nausea VAS reduction at 2 hours vs ondansetron 4mg IV\n\u2022 More patients achieved adequate relief\n\u2022 Dose is LOWER than standard agitation dosing (0.1 mg/kg)\n\n**May repeat once** at 30 min if inadequate response\n\n**Monitor:** QTc (repeat ECG after dosing), EPS (treat dystonia with diphenhydramine 50mg IV/IM)',
    citation: [2, 4],
    next: 'chs-capsaicin',
  },

  {
    id: 'chs-droperidol',
    type: 'info',
    module: 3,
    title: 'Droperidol Protocol',
    body: '[Droperidol](#/drug/droperidol/chs) **0.625-2.5 mg IV**\n\n\u2022 **Faster onset** than haloperidol (3-10 min vs 10-20 min)\n\u2022 GRACE-4 recommends butyrophenones as a class for CHS\n\u2022 More sedating than haloperidol (greater H1/5-HT2A activity)\n\n**May repeat once** at 15-20 min if inadequate response\n\n**Monitor:** QTc (repeat ECG after dosing), blood pressure (alpha-1 blockade can cause hypotension)',
    citation: [2, 3, 10],
    next: 'chs-capsaicin',
  },

  {
    id: 'chs-qtc-prolonged',
    type: 'info',
    module: 3,
    title: 'QTc >500ms \u2014 Avoid Butyrophenones',
    body: 'QTc >500ms \u2014 **haloperidol and droperidol are contraindicated.**\n\nUse [Olanzapine](#/drug/olanzapine/chs) instead:\n\u2022 **No significant QTc prolongation** \u2014 major advantage\n\u2022 5-10 mg IM or PO\n\u2022 Do NOT combine with parenteral benzodiazepines\n\nAlso apply topical capsaicin as adjunct.',
    citation: [2, 3],
    next: 'chs-olanzapine',
  },

  // =====================================================================
  // MODULE 4: CAPSAICIN ADJUNCT
  // =====================================================================

  {
    id: 'chs-capsaicin',
    type: 'info',
    module: 4,
    title: 'Topical Capsaicin Protocol',
    body: '**GRACE-4 Recommendation 2:** Suggest capsaicin in addition to standard antiemetics (conditional, very low certainty evidence).\n\n[Capsaicin 0.075% Cream](#/drug/capsaicin-topical/chs)\n\n**Mechanism:** TRPV1 (transient receptor potential vanilloid 1) receptor agonist \u2014 the **same pathway activated by hot water bathing**, which is why CHS patients instinctively seek hot showers. Capsaicin provides targeted activation without the dehydration risk of prolonged hot showers.\n\nMultiple RCTs and systematic reviews support adjunctive use.',
    citation: [2, 5, 12, 13],
    next: 'chs-capsaicin-apply',
  },

  {
    id: 'chs-capsaicin-apply',
    type: 'info',
    module: 4,
    title: 'Capsaicin Application Technique',
    body: '**Application:**\n\u2022 Use 0.075% cream (e.g., Zostrix, Capzasin-HP)\n\u2022 Apply ~1 inch ribbon to periumbilical area (~15 cm diameter)\n\u2022 **Wear gloves** during application\n\u2022 Reapply every 6-8 hours as needed\n\n**Patient counseling:**\n\u2022 Initial burning sensation is expected and temporary\n\u2022 Avoid contact with eyes, nose, mouth\n\u2022 Do NOT apply heating pad over capsaicin\n\u2022 Wash hands thoroughly if gloves not used',
    citation: [5, 12, 13],
    next: 'chs-response',
  },

  // =====================================================================
  // MODULE 5: TREATMENT RESPONSE & ESCALATION
  // =====================================================================

  {
    id: 'chs-response',
    type: 'question',
    module: 5,
    title: 'Response to Initial Treatment?',
    body: 'Reassess at 30-60 minutes after butyrophenone + capsaicin.\n\nAssess:\n\u2022 Nausea/vomiting frequency and severity\n\u2022 Ability to tolerate PO fluids\n\u2022 Vital sign improvement\n\u2022 Patient-reported symptom relief',
    citation: [2, 3],
    options: [
      {
        label: 'Symptoms improving',
        description: 'Tolerating PO, nausea improving',
        next: 'chs-improved',
      },
      {
        label: 'Refractory',
        description: 'Persistent vomiting despite treatment',
        urgency: 'urgent',
        next: 'chs-refractory',
      },
    ],
  },

  {
    id: 'chs-improved',
    type: 'info',
    module: 5,
    title: 'Symptoms Improving',
    body: '**Continue supportive care:**\n\u2022 Complete IV fluid resuscitation\n\u2022 Trial PO fluids \u2014 start with small sips of clear liquids\n\u2022 Recheck electrolytes if initially abnormal\n\u2022 Continue capsaicin application\n\nIf tolerating PO, proceed to disposition planning.',
    citation: [2],
    next: 'chs-disposition',
  },

  {
    id: 'chs-refractory',
    type: 'info',
    module: 5,
    title: 'Refractory \u2014 Escalation Options',
    body: 'Persistent vomiting despite butyrophenone + capsaicin.\n\n**Escalation options:**\n1. **Repeat butyrophenone dose** if first dose was subtherapeutic\n2. **Olanzapine** 5-10 mg IM/PO as second-line agent\n3. Reassess for alternative diagnoses if truly refractory\n4. Consider admission for continued IV antiemetics\n\n\u26a0\ufe0f Do NOT escalate to opioids or benzodiazepines.',
    citation: [2, 3],
    next: 'chs-olanzapine',
  },

  {
    id: 'chs-olanzapine',
    type: 'info',
    module: 5,
    title: 'Olanzapine \u2014 Second-Line',
    body: '[Olanzapine](#/drug/olanzapine/chs) **5-10 mg IM or PO**\n\n**Advantages:**\n\u2022 No significant QTc prolongation\n\u2022 No dystonia risk\n\u2022 Effective antiemetic with D2, 5-HT2A, 5-HT3, H1 receptor blockade\n\n**\u26a0\ufe0f DO NOT combine with parenteral (IM/IV) benzodiazepines** \u2014 risk of respiratory depression and death.\n\nUsed when:\n\u2022 Butyrophenones contraindicated (QTc >500ms)\n\u2022 Refractory to butyrophenone therapy\n\u2022 Patient preference for IM/PO vs IV',
    citation: [2, 3],
    next: 'chs-avoid',
  },

  {
    id: 'chs-avoid',
    type: 'info',
    module: 5,
    title: 'Medications to AVOID',
    body: '**GRACE-4 Good Practice Statement:**\n\n\u274c **Opioids** \u2014 worsen gastroparesis, promote dependence, do not treat underlying CHS nausea\n\n\u274c **Benzodiazepines** \u2014 ineffective for CHS nausea, cause sedation without antiemetic benefit\n\n\u274c **Ondansetron as sole therapy** \u2014 typically fails in CHS. The HaVOC trial showed butyrophenones are superior. May use as adjunct but should not be first-line.\n\n\u274c **IV cannabinoids (dronabinol)** \u2014 paradoxically worsens CHS despite being a cannabinoid\n\n\u26a0\ufe0f Many CHS patients receive multiple ED visits with ondansetron and opioids before diagnosis \u2014 break this cycle.',
    citation: [2, 3, 8],
    next: 'chs-disposition',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION & DISCHARGE COUNSELING
  // =====================================================================

  {
    id: 'chs-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: 'Assess discharge readiness:\n\n**Discharge criteria:**\n\u2022 Vomiting controlled\n\u2022 Tolerating PO fluids\n\u2022 Adequate rehydration (normal Cr, improved UOP)\n\u2022 Electrolytes corrected or stable\n\u2022 Cannabis cessation counseling provided\n\n**Admission criteria:**\n\u2022 Persistent vomiting despite antiemetics\n\u2022 AKI (elevated creatinine)\n\u2022 Severe electrolyte derangements\n\u2022 Mallory-Weiss tear or concern for Boerhaave\n\u2022 Unable to tolerate PO',
    citation: [2, 3],
    options: [
      {
        label: 'Discharge criteria met',
        description: 'Symptoms controlled, tolerating PO',
        next: 'chs-discharge',
      },
      {
        label: 'Admission criteria met',
        description: 'Refractory, AKI, or complications',
        urgency: 'urgent',
        next: 'chs-admit',
      },
    ],
  },

  {
    id: 'chs-admit',
    type: 'result',
    module: 6,
    title: 'Admission',
    body: '**Admit for:**\n\u2022 Continued IV hydration and electrolyte repletion\n\u2022 Serial labs (BMP, Mg q6-8h)\n\u2022 IV antiemetic management (scheduled butyrophenone + capsaicin)\n\u2022 Nephrology consult if AKI does not improve with hydration\n\u2022 GI consult if concern for Boerhaave (CT chest/abdomen with PO contrast)\n\u2022 Social work/addiction medicine for cessation support',
    recommendation: 'Admit to medicine/observation for IV hydration, antiemetic management, and electrolyte monitoring.',
    confidence: 'recommended',
    citation: [2, 3, 11],
  },

  {
    id: 'chs-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge with Counseling',
    body: '[CHS Discharge Instructions](#/info/chs-discharge-instructions)\n\n**Prescriptions:**\n\u2022 OTC capsaicin cream 0.075% (Zostrix) \u2014 apply to abdomen during episodes\n\u2022 Consider amitriptyline 25-50 mg qhs for prophylaxis (limited evidence)\n\n**Counseling:**\n\u2022 [Cannabis Cessation Counseling](#/node/chs-cessation) \u2014 cannabis cessation is the ONLY definitive cure\n\u2022 Symptoms will recur with resumed cannabis use\n\u2022 Refer to primary care within 1 week\n\u2022 Substance use counseling resources\n\n**Return precautions:** Inability to keep fluids down, hematemesis, severe abdominal pain, decreased urine output',
    recommendation: 'Discharge with cannabis cessation counseling, OTC capsaicin cream, and close follow-up.',
    confidence: 'definitive',
    citation: [2, 3, 6],
  },

  {
    id: 'chs-cessation',
    type: 'info',
    module: 6,
    title: 'Cannabis Cessation Counseling',
    body: '**Cannabis cessation is the ONLY definitive cure for CHS.**\n\n**Key counseling points:**\n\u2022 Symptoms typically resolve within **days to weeks** of complete abstinence\n\u2022 Recurrence is expected with ANY resumed cannabis use \u2014 even reduced amounts\n\u2022 Synthetic cannabinoids (K2/Spice) can also cause CHS\n\u2022 CBD products may contain enough THC to trigger symptoms\n\n**Support resources:**\n\u2022 SAMHSA National Helpline: 1-800-662-4357 (free, 24/7)\n\u2022 Marijuana Anonymous: www.marijuana-anonymous.org\n\u2022 Primary care follow-up for ongoing support\n\u2022 Consider cognitive behavioral therapy (CBT)\n\n**Prophylaxis (limited evidence):**\n\u2022 Amitriptyline 25-50 mg qhs \u2014 may reduce episode frequency in patients not yet abstinent\n\u2022 Not a substitute for cessation',
    citation: [1, 6, 9],
    next: undefined,
  },

];

// -------------------------------------------------------------------
// Module Labels
// -------------------------------------------------------------------

export const CHS_MODULE_LABELS = [
  'Clinical Recognition & Diagnosis',
  'Rule Out Organic Causes',
  'Acute Antiemetic Management',
  'Capsaicin Adjunct',
  'Treatment Response & Escalation',
  'Disposition & Discharge Counseling',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const CHS_CITATIONS: Citation[] = [
  { num: 1, text: 'Simonetto DA et al. Cannabinoid hyperemesis: a case series of 98 patients. Mayo Clin Proc. 2012;87(2):114-119.' },
  { num: 2, text: 'Borgundvaag B et al. GRACE-4: SAEM Guidelines for CHS in ED. Acad Emerg Med. 2024;31(5):425-455.' },
  { num: 3, text: 'Williams K, Byerrum J. Cannabis-Related Emergencies. EBMedicine. Dec 2025.' },
  { num: 4, text: 'Ruberto AJ et al. HaVOC Trial: Haloperidol vs ondansetron for CHS. Ann Emerg Med. 2021;77(6):613-619.' },
  { num: 5, text: 'Dean DJ et al. Topical capsaicin in CHS: A systematic review. Am J Emerg Med. 2020;38(4):846-851.' },
  { num: 6, text: 'Sorensen CJ et al. CHS: diagnosis, pathophysiology, and treatment. BMJ. 2017;356:j1446.' },
  { num: 7, text: 'Richards JR. CHS: pathophysiology and treatment in the ED. J Emerg Med. 2018;54(3):354-363.' },
  { num: 8, text: 'Farkas J. Cannabis use & complications. EMCrit IBCC. 2025.' },
  { num: 9, text: 'Allen JH et al. Cannabinoid hyperemesis: cyclical hyperemesis in association with chronic cannabis abuse. Gut. 2004;53(11):1566-1570.' },
  { num: 10, text: 'Westafer L. Drugs for Immediate Relief of CHS. ACEP Now. 2021.' },
  { num: 11, text: 'Nourbakhsh M et al. CHS: reports of fatal cases. J Forensic Sci. 2019;64(1):270-274.' },
  { num: 12, text: 'Lapoint J et al. CHS: potential mechanisms for the benefit of capsaicin. Clin Toxicol. 2018;56(1):15-16.' },
  { num: 13, text: 'Moon AM et al. Capsaicin cream for CHS: a systematic review. Pharmacotherapy. 2021;41(4):380-393.' },
  { num: 14, text: 'Venkatesan T et al. Role of chronic cannabis use: cyclic vomiting syndrome vs CHS. Neurogastroenterol Motil. 2020;32(6):e13853.' },
];
