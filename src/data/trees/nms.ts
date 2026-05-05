// MedKitt - Neuroleptic Malignant Syndrome (NMS)
// Recognition -> Levenson Criteria -> Treatment -> Differentiation -> Disposition
// Evidence: Berman 2011, Strawn 2007, UpToDate
// ~18 nodes

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const NMS_CRITICAL_ACTIONS = [
  { text: 'Stop ALL antipsychotics/dopamine blockers immediately', nodeId: 'nms-stop-agents' },
  { text: 'Lead-pipe rigidity + hyperthermia + antipsychotic = NMS', nodeId: 'nms-start' },
  { text: 'Dantrolene 1-2.5 mg/kg IV q6h for severe hyperthermia', nodeId: 'nms-dantrolene' },
  { text: 'Bromocriptine 2.5 mg PO/NG q8h for dopamine restoration', nodeId: 'nms-bromocriptine' },
  { text: 'Distinguish from SS: NMS = rigidity, normal reflexes; SS = clonus, hyperreflexia', nodeId: 'nms-vs-ss' },
];

export const NMS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'nms-start',
    type: 'info',
    module: 1,
    title: 'Neuroleptic Malignant Syndrome',
    body: '[Steps Summary](#/info/nms-steps)\n\n**Definition:** Life-threatening reaction to dopamine antagonists (antipsychotics).\n\n**Classic tetrad:**\n* **Hyperthermia** (often >40 degC)\n* **Lead-pipe rigidity** (severe, generalized)\n* **Autonomic instability** (tachycardia, labile BP, diaphoresis)\n* **Mental status changes** (confusion -> coma)\n\n**Onset:** Usually within 2 weeks of drug initiation/dose change (often 4-14 days)',
    citation: [1],
    next: 'nms-triggers',
    summary: 'NMS = hyperthermia + lead-pipe rigidity + autonomic instability + AMS. Onset 4-14 days.',
  },

  {
    id: 'nms-triggers',
    type: 'info',
    module: 1,
    title: 'Causative Agents',
    body: '**Dopamine antagonists:**\n\n| Class | Examples |\n|-------|----------|\n| Typical antipsychotics | Haloperidol, droperidol, chlorpromazine |\n| Atypical antipsychotics | Olanzapine, risperidone, quetiapine, clozapine |\n| Antiemetics | Metoclopramide, prochlorperazine, promethazine |\n| Other | Lithium withdrawal, dopamine agonist withdrawal |\n\n**Risk factors:**\n* High-potency agents (haloperidol highest risk)\n* Rapid dose escalation\n* IM administration\n* Dehydration\n* Organic brain disease\n* Previous NMS episode (17-30% recurrence)',
    citation: [1, 2],
    next: 'nms-criteria',
    summary: 'Haloperidol, droperidol, olanzapine, metoclopramide. High potency = higher risk.',
  },

  {
    id: 'nms-criteria',
    type: 'info',
    module: 1,
    title: 'Diagnostic Criteria',
    body: '**Levenson Criteria:**\n\n**Major (3 required if no other cause):**\n* Fever (>38 degC)\n* Rigidity\n* Elevated CK (>1000 U/L typical)\n\n**Minor (need 2 additional):**\n* Tachycardia\n* Abnormal BP (hyper or hypotension)\n* Tachypnea\n* Altered consciousness\n* Diaphoresis\n* Leukocytosis\n\n**Labs:**\n* CK markedly elevated (often >1000, can be >100,000)\n* Leukocytosis (10,000-40,000)\n* Metabolic acidosis\n* Elevated LFTs, myoglobinuria',
    citation: [3],
    next: 'nms-criteria-check',
    summary: 'Levenson: 3 major (fever, rigidity, elevated CK) + 2 minor. CK often >1000.',
  },

  {
    id: 'nms-criteria-check',
    type: 'question',
    module: 1,
    title: 'Diagnostic Assessment',
    body: '**Does patient meet Levenson criteria?**\n\nRecent antipsychotic/dopamine blocker + rigidity + fever + elevated CK?',
    options: [
      { label: 'Yes - criteria met', description: 'NMS diagnosis', next: 'nms-severity', urgency: 'critical' },
      { label: 'Possible - incomplete picture', description: 'Early NMS or mimic', next: 'nms-exam' },
      { label: 'No - consider other diagnosis', description: 'Does not fit NMS', next: 'nms-vs-ss' },
    ],
    citation: [3],
    summary: 'Levenson criteria met = NMS diagnosis. Incomplete = early NMS or mimic.',
  },

  {
    id: 'nms-exam',
    type: 'info',
    module: 1,
    title: 'Physical Exam Findings',
    body: '**Neuromuscular:**\n* **Lead-pipe rigidity** (constant resistance through full ROM)\n* Normal or DECREASED reflexes (unlike SS)\n* Bradykinesia\n* Tremor\n* Dysphagia, dysarthria\n\n**Autonomic:**\n* Hyperthermia (often >40 degC, can reach 42 degC)\n* Tachycardia\n* Labile blood pressure\n* Diaphoresis\n* Tachypnea\n\n**Mental status:**\n* Confusion -> delirium -> coma\n* Mutism',
    citation: [1],
    next: 'nms-criteria-check',
    summary: 'Lead-pipe rigidity, normal/decreased reflexes, severe hyperthermia, autonomic instability.',
  },

  // =====================================================================
  // MODULE 2: TREATMENT
  // =====================================================================

  {
    id: 'nms-severity',
    type: 'question',
    module: 2,
    title: 'Severity Assessment',
    body: '**Assess severity:**',
    options: [
      { label: 'Mild', description: 'Temp <39 degC, mild rigidity, stable vitals', next: 'nms-mild' },
      { label: 'Moderate', description: 'Temp 39-40 degC, significant rigidity, autonomic instability', next: 'nms-moderate', urgency: 'urgent' },
      { label: 'Severe / Life-threatening', description: 'Temp >40 degC, severe rigidity, rhabdo, organ failure', next: 'nms-severe', urgency: 'critical' },
    ],
    citation: [1],
    summary: 'Mild (<39 degC), Moderate (39-40 degC), Severe (>40 degC, organ failure).',
  },

  {
    id: 'nms-mild',
    type: 'info',
    module: 2,
    title: 'Mild NMS Management',
    body: '**Management:**\n\n1. **Stop causative agent(s)**\n2. **Supportive care:**\n   * IV fluids\n   * External cooling if febrile\n   * Benzodiazepines PRN for rigidity/agitation\n3. **Monitoring:**\n   * Vitals q2-4h\n   * Serial CK\n   * Renal function\n4. **Consider bromocriptine** if not improving\n\n**Duration:** Symptoms can persist 5-10 days after stopping oral agents; 2-3 weeks after depot.',
    citation: [1, 4],
    next: 'nms-stop-agents',
    summary: 'Mild: stop agent, supportive care, benzos PRN. May last 5-10 days.',
  },

  {
    id: 'nms-moderate',
    type: 'info',
    module: 2,
    title: 'Moderate NMS Management',
    body: '**Management:**\n\n1. **Stop ALL dopamine antagonists**\n2. **Aggressive IV fluids** - rhabdo prevention\n3. **External cooling**\n4. **Benzodiazepines:**\n   * [Lorazepam](#/drug/lorazepam/agitation) 2-4 mg IV q5-10min PRN\n5. **Bromocriptine:**\n   * 2.5 mg PO/NG q8h\n   * Increase to 5 mg q8h if no response\n   * Max 45 mg/day\n6. **Admit** to ICU or step-down for monitoring',
    citation: [1, 4],
    next: 'nms-bromocriptine',
    summary: 'Moderate: stop agents, fluids, cooling, benzos, bromocriptine 2.5 mg q8h.',
    safetyLevel: 'critical',
  },

  {
    id: 'nms-severe',
    type: 'info',
    module: 2,
    title: 'Severe NMS Management',
    body: '**LIFE-THREATENING - ICU mandatory**\n\n1. **Airway:** Intubate if severe rigidity/hyperthermia\n2. **Stop ALL dopamine antagonists**\n3. **Dantrolene:**\n   * 1-2.5 mg/kg IV\n   * Repeat q6h PRN (max 10 mg/kg/day)\n   * Reduces muscle rigidity -> decreases heat production\n4. **Bromocriptine:**\n   * 2.5-5 mg PO/NG q8h (via NG if intubated)\n5. **Aggressive cooling:**\n   * Ice packs, cooling blankets, cold IV fluids\n6. **Aggressive IV fluids:**\n   * Target UOP 200-300 mL/hr (rhabdo prevention)\n7. **Consider ECT** if refractory',
    citation: [1, 2, 4],
    next: 'nms-dantrolene',
    summary: 'Severe: intubate, dantrolene 1-2.5 mg/kg IV q6h, bromocriptine, aggressive cooling/fluids.',
    safetyLevel: 'critical',
  },

  {
    id: 'nms-stop-agents',
    type: 'info',
    module: 2,
    title: 'Stop Causative Agents',
    body: '**Discontinue ALL dopamine antagonists:**\n\n* Typical and atypical antipsychotics\n* Metoclopramide, prochlorperazine, promethazine\n* Droperidol\n\n**Also consider:**\n* Stopping lithium (can contribute)\n* Restarting recently discontinued dopamine agonists (if applicable)\n\n**Duration of risk:**\n* Oral agents: symptoms may persist 5-10 days\n* Depot/long-acting: may persist 2-3 weeks\n\n**Rechallenge:** If antipsychotic needed later, wait >=2 weeks, use different class, start LOW dose.',
    citation: [1, 4],
    next: 'nms-bromocriptine',
    summary: 'Stop all antipsychotics/dopamine blockers. Symptoms persist 5-10 days (oral) or weeks (depot).',
  },

  {
    id: 'nms-bromocriptine',
    type: 'info',
    module: 2,
    title: 'Bromocriptine',
    body: '**Dopamine agonist - restores dopaminergic transmission**\n\n**Dosing:**\n* **Initial:** 2.5 mg PO/NG q8h\n* **Escalate:** 5 mg q8h if no improvement in 24h\n* **Max:** 45 mg/day\n* **Duration:** Continue for 10 days minimum after NMS resolves\n\n**Route:** PO or NG tube\n\n**Mechanism:** D2 agonist - counteracts dopamine blockade\n\n**Cautions:**\n* Hypotension (start low)\n* Nausea/vomiting\n* Psychosis (rare at these doses)',
    citation: [4],
    next: 'nms-dantrolene',
    summary: 'Bromocriptine 2.5 mg q8h, increase to 5 mg q8h. Continue 10 days after resolution.',
  },

  {
    id: 'nms-dantrolene',
    type: 'info',
    module: 2,
    title: 'Dantrolene',
    body: '**Muscle relaxant - for severe hyperthermia/rigidity**\n\n**Dosing:**\n* 1-2.5 mg/kg IV\n* Repeat q6h PRN\n* Max: 10 mg/kg/day\n\n**Mechanism:** Blocks calcium release from sarcoplasmic reticulum -> reduces muscle contraction -> decreases heat production\n\n**Indication:** Severe hyperthermia (>40 degC) with marked rigidity\n\n**Monitoring:**\n* LFTs (hepatotoxicity risk)\n* Respiratory function (can cause weakness)\n\n**NOT first-line** for mild-moderate NMS. Use bromocriptine + benzos first.',
    citation: [2, 4],
    next: 'nms-monitoring',
    summary: 'Dantrolene 1-2.5 mg/kg IV q6h for severe hyperthermia. Max 10 mg/kg/day.',
  },

  // =====================================================================
  // MODULE 3: DIFFERENTIATION
  // =====================================================================

  {
    id: 'nms-vs-ss',
    type: 'info',
    module: 3,
    title: 'NMS vs Serotonin Syndrome',
    body: '**Critical distinction:**\n\n| Feature | NMS | Serotonin Syndrome |\n|---------|-----|-------------------|\n| **Onset** | Days (4-14) | Hours (<24h) |\n| **Drug** | Dopamine blocker | Serotonergic |\n| **Rigidity** | LEAD-PIPE (severe) | Mild, lower > upper |\n| **Reflexes** | Normal or ↓ | HYPERREFLEXIA |\n| **Clonus** | NO | YES (key finding) |\n| **CK** | Very elevated | Mildly elevated |\n| **Bradykinesia** | Yes | No |\n| **Treatment** | Bromocriptine, dantrolene | Cyproheptadine, benzos |\n\n**Mnemonic:**\n* **NMS = SLOW** (onset days, bradykinesia, lead-pipe)\n* **SS = FAST** (onset hours, hyperreflexia, clonus)',
    citation: [1, 5],
    next: 'nms-differential',
    summary: 'NMS = slow onset, lead-pipe rigidity, normal reflexes. SS = fast onset, clonus, hyperreflexia.',
  },

  {
    id: 'nms-differential',
    type: 'info',
    module: 3,
    title: 'Differential Diagnosis',
    body: '**Other hyperthermic emergencies:**\n\n* **Serotonin syndrome** - serotonergic drugs, clonus, hyperreflexia\n* **Malignant hyperthermia** - post-anesthesia, genetic, succinylcholine/inhalational agents\n* **Anticholinergic toxicity** - dry skin, urinary retention, absent bowel sounds\n* **Lethal catatonia** - psychiatric history, may precede NMS\n* **Infections** - meningitis, encephalitis, sepsis\n* **Thyroid storm** - thyroid history, goiter\n* **Heat stroke** - environmental, dry skin\n* **Illicit drugs** - cocaine, amphetamines, MDMA',
    citation: [1],
    next: 'nms-monitoring',
    summary: 'DDx: SS, malignant hyperthermia, anticholinergic, catatonia, infection, thyroid storm.',
  },

  // =====================================================================
  // MODULE 4: DISPOSITION
  // =====================================================================

  {
    id: 'nms-monitoring',
    type: 'question',
    module: 4,
    title: 'Disposition',
    body: '**Where does patient need to go?**',
    options: [
      { label: 'ICU', description: 'Severe: temp >40 degC, intubated, rhabdo, organ failure', next: 'nms-icu-admit' },
      { label: 'Step-down/Telemetry', description: 'Moderate: requires monitoring and treatment', next: 'nms-floor-admit' },
    ],
    summary: 'ICU for severe, step-down for moderate. All NMS requires admission.',
  },

  {
    id: 'nms-icu-admit',
    type: 'result',
    module: 4,
    title: 'ICU Admission',
    body: '**ICU mandatory for:** [1][2][6]\n* Temp >40 degC\n* Severe rigidity\n* Rhabdomyolysis (CK >10,000)\n* Respiratory compromise\n* Renal failure\n* Autonomic instability\n\n**Mortality:** 10-20% even with treatment. Higher if delayed diagnosis. [3][7]',
    recommendation: 'ICU admission for severe NMS.',
    confidence: 'definitive',
    citation: [1, 2, 3, 6, 7],
    summary: 'ICU for severe NMS. Mortality 10-20% with treatment.',
  },

  {
    id: 'nms-floor-admit',
    type: 'result',
    module: 4,
    title: 'Step-down Admission',
    body: '**Step-down/telemetry for:** [1][2][8]\n* Mild-moderate symptoms\n* Stable vitals\n* CK <10,000\n* No respiratory compromise\n\n**Continue:**\n* Bromocriptine\n* Benzos PRN\n* Aggressive hydration\n* Serial CK and renal function\n\n**Duration:** Average hospitalization 7-14 days. [4][8]',
    recommendation: 'Step-down admission for moderate NMS.',
    confidence: 'definitive',
    citation: [1, 2, 4, 8],
    summary: 'Step-down for moderate. Average stay 7-14 days.',
  },

];

export const NMS_MODULE_LABELS = [
  'Recognition',
  'Treatment',
  'Differentiation',
  'Disposition',
];

export const NMS_CITATIONS: Citation[] = [
  { num: 1, text: 'Berman BD. Neuroleptic Malignant Syndrome: A Review for Neurohospitalists. Neurohospitalist 2011;1:41-7.' },
  { num: 2, text: 'Strawn JR, et al. Neuroleptic Malignant Syndrome. Am J Psychiatry 2007;164:870-6.' },
  { num: 3, text: 'Levenson JL. Neuroleptic Malignant Syndrome. Am J Psychiatry 1985;142:1137-45.' },
  { num: 4, text: 'Rosenberg MR, Green M. Neuroleptic Malignant Syndrome: Review of Response to Therapy. Arch Intern Med 1989;149:1927-31.' },
  { num: 5, text: 'Boyer EW, Shannon M. The Serotonin Syndrome. N Engl J Med 2005;352:1112-20.' },
  { num: 6, text: 'Caroff SN, Mann SC. Neuroleptic Malignant Syndrome. Med Clin North Am 1993;77:185-202.' },
  { num: 7, text: 'Modi S, Dharaiya D, Schultz L, Varelas P. Neuroleptic Malignant Syndrome: Complications, Outcomes, and Mortality. Neurocrit Care 2016;24:97-103.' },
  { num: 8, text: 'Velamoor VR, Norman RM, Caroff SN, Mann SC, Sullivan KA, Antelo RE. Progression of symptoms in neuroleptic malignant syndrome. J Nerv Ment Dis 1994;182:168-73.' },
];

export const NMS_NODE_COUNT = NMS_NODES.length;
