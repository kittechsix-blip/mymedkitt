// MedKitt — Peripheral Neuropathy
// ED evaluation and management of peripheral neuropathy
// Sources: AAFP 2020, EMCrit IBCC, NINDS 2025, Nat Rev Neurol 2019
// 6 modules: Red Flags → Classification → Workup → Mimics → Treatment → Disposition
// ~24 nodes

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const PERIPHERAL_NEUROPATHY_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & RED FLAGS
  // =====================================================================

  {
    id: 'pn-start',
    type: 'question',
    module: 1,
    title: 'Peripheral Neuropathy — ED Evaluation',
    body: '[Steps Summary](#/info/pn-steps)\n\n**ED Role in Peripheral Neuropathy:**\n1. Identify emergencies (GBS, cord compression, vasculitis)\n2. Rule out dangerous mimics\n3. Determine workup urgency\n4. Initiate symptomatic treatment\n\n**Presentation Patterns:**\n• **Symmetric distal** — most common, "stocking-glove"\n• **Asymmetric/multifocal** — vasculitis, mononeuritis multiplex\n• **Proximal weakness** — GBS, CIDP, myopathy\n\n**First Question:** Are RED FLAGS present? [1][2]',
    options: [
      { label: 'Red flags present', description: 'Acute, rapidly progressive, motor-predominant, autonomic', next: 'pn-red-flags', urgency: 'critical' },
      { label: 'Subacute/chronic symptoms', description: 'Gradual onset, sensory-predominant, stable', next: 'pn-classification' },
      { label: 'Uncertain — need more info', description: 'Characterize the neuropathy first', next: 'pn-classification' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'gbs-fvc-nif', label: 'FVC/NIF Calculator' },
      { id: 'gbs-variants', label: 'GBS Variants' },
    ],
  },

  {
    id: 'pn-red-flags',
    type: 'info',
    module: 1,
    title: 'Red Flags — Emergent Workup Required',
    body: '**RED FLAGS requiring emergent evaluation:**\n\n| Red Flag | Concern |\n|----------|----------|\n| **Acute onset** (<4 weeks) | GBS, cord compression, vasculitis |\n| **Rapid progression** | GBS, malignancy, toxic |\n| **Motor > sensory** | GBS, motor neuron disease |\n| **Asymmetric pattern** | Vasculitis, radiculopathy, mononeuritis multiplex |\n| **Autonomic symptoms** | GBS, diabetic autonomic, porphyria |\n| **Respiratory symptoms** | GBS crisis — check FVC/NIF |\n| **Bulbar symptoms** | GBS variants, botulism |\n| **Bowel/bladder dysfunction** | Cord lesion, cauda equina |\n\n**If ANY red flag present:**\n• Admit or observe\n• Neurology consult\n• Consider LP, EMG/NCS\n• Monitor respiratory function\n\n**Respiratory Monitoring Thresholds:**\n• FVC <20 mL/kg → high intubation risk\n• NIF worse than −30 cmH2O → impending failure\n• 20-30-40 Rule: FVC <20, NIF <30, decline >40% [2][3]',
    citation: [2, 3],
    next: 'pn-emergent-workup',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 2: CLASSIFICATION
  // =====================================================================

  {
    id: 'pn-classification',
    type: 'question',
    module: 2,
    title: 'Classification — Pattern Recognition',
    body: '**Classify the neuropathy by:**\n\n**1. Anatomic Distribution:**\n• **Focal** — single nerve (carpal tunnel, peroneal)\n• **Multifocal** — multiple nerves, asymmetric (vasculitis, DM)\n• **Symmetric distal** — stocking-glove (most common)\n• **Symmetric proximal** — GBS, CIDP, myopathy\n\n**2. Fiber Type:**\n• **Large fiber** — weakness, vibration/proprioception loss, areflexia\n• **Small fiber** — pain, temperature loss, autonomic dysfunction\n• **Mixed** — most common\n\n**3. Tempo:**\n• **Acute** — <4 weeks (GBS, toxic, porphyria)\n• **Subacute** — 4-8 weeks (inflammatory, paraneoplastic)\n• **Chronic** — >8 weeks (DM, hereditary, idiopathic)\n\n**What is the dominant pattern?** [1]',
    options: [
      { label: 'Acute + motor-predominant', description: 'Suspect GBS or mimic', next: 'pn-gbs-pathway', urgency: 'critical' },
      { label: 'Symmetric distal sensory', description: 'Classic polyneuropathy pattern', next: 'pn-standard-workup' },
      { label: 'Asymmetric / multifocal', description: 'Vasculitis, radiculopathy, mononeuritis', next: 'pn-asymmetric' },
      { label: 'Small fiber predominant', description: 'Pain/burning, normal strength/reflexes', next: 'pn-small-fiber' },
    ],
    citation: [1],
  },

  {
    id: 'pn-asymmetric',
    type: 'info',
    module: 2,
    title: 'Asymmetric / Multifocal Neuropathy',
    body: '**Asymmetric patterns suggest specific etiologies:**\n\n**Mononeuropathy (single nerve):**\n• Carpal tunnel (median)\n• Ulnar neuropathy (elbow)\n• Peroneal palsy (fibular head)\n• Radiculopathy (dermatomal)\n\n**Mononeuritis Multiplex (multiple nerves, asymmetric):**\n• **Vasculitis** — PAN, RA, granulomatosis with polyangiitis\n• **Diabetes** — diabetic amyotrophy\n• **Infections** — Lyme, leprosy, HIV, HCV\n• **Sarcoidosis**\n• **Malignancy** — direct invasion, paraneoplastic\n\n**Key Workup:**\n• ESR, CRP (inflammation)\n• ANCA, RF, ANA (vasculitis)\n• HIV, Lyme, HCV serologies\n• Glucose/HbA1c\n• Consider nerve biopsy if vasculitis suspected\n\n**Urgent neurology referral** — vasculitic neuropathy can progress rapidly and requires immunosuppression [1][4]',
    citation: [1, 4],
    next: 'pn-standard-workup',
    safetyLevel: 'warning',
  },

  {
    id: 'pn-small-fiber',
    type: 'info',
    module: 2,
    title: 'Small Fiber Neuropathy',
    body: '**Small Fiber Neuropathy (SFN):**\n\nAffects Aδ and C fibers — pain/temperature sensation and autonomic function.\n\n**Clinical Features:**\n• Burning pain, allodynia, "pins and needles"\n• Length-dependent (feet → hands)\n• **Normal strength and reflexes**\n• **Normal EMG/NCS** (tests large fibers only)\n• Autonomic: sweating abnormalities, orthostatic intolerance, GI dysmotility\n\n**Common Causes:**\n• Diabetes/prediabetes (most common)\n• Idiopathic (30-50%)\n• Autoimmune (Sjögren, celiac, sarcoid)\n• Infectious (HIV, HCV)\n• Hereditary (Fabry disease, amyloidosis)\n• Toxic (alcohol, chemotherapy)\n\n**Diagnosis:**\n• Skin biopsy (intraepidermal nerve fiber density) — gold standard\n• Autonomic testing (QSART, tilt table)\n• Standard EMG/NCS usually normal\n\n**ED Role:**\n• Initiate symptomatic treatment\n• Outpatient neurology referral\n• Screen for treatable causes (glucose, B12, TSH) [1][5]',
    citation: [1, 5],
    next: 'pn-standard-workup',
  },

  // =====================================================================
  // MODULE 3: WORKUP
  // =====================================================================

  {
    id: 'pn-standard-workup',
    type: 'info',
    module: 3,
    title: 'Standard ED Workup',
    body: '**Initial Laboratory Evaluation:**\n\n**Tier 1 — Order on ALL patients:**\n• CBC with differential\n• Comprehensive metabolic panel\n• **Fasting glucose** or **HbA1c**\n• **TSH**\n• **Vitamin B12**\n\n**Tier 2 — If Tier 1 unrevealing:**\n• SPEP with immunofixation (paraproteinemia)\n• HIV\n• Hepatitis B and C\n• ESR/CRP\n• RPR/VDRL\n\n**Tier 3 — Specialist-guided:**\n• Anti-ganglioside antibodies (GBS variants)\n• Paraneoplastic panel\n• Genetic testing (CMT, Fabry)\n• Heavy metals (arsenic, lead, thallium)\n\n**Diagnostic Yield (AAFP 2020):**\n| Test | Yield |\n|------|-------|\n| Glucose abnormality | 11% |\n| Abnormal SPEP | 9% |\n| Low B12 | 3.6% |\n| Abnormal TSH | 2% |\n\n**25-46% remain idiopathic** after full workup [1]',
    citation: [1],
    next: 'pn-emg-decision',
  },

  {
    id: 'pn-emg-decision',
    type: 'question',
    module: 3,
    title: 'EMG/NCS — When to Order?',
    body: '**Electrodiagnostic Studies (EMG/NCS):**\n\nNot routinely needed in ED, but consider urgent referral if:\n\n**Indications for URGENT EMG/NCS:**\n• Acute/rapidly progressive weakness\n• Motor-predominant symptoms\n• Suspicion for GBS or CIDP\n• Asymmetric presentation\n• Normal initial workup with persistent symptoms\n\n**What EMG/NCS Tells You:**\n• **Axonal vs demyelinating** — helps narrow differential\n• **Severity and distribution** — confirms clinical pattern\n• **Prognosis** — axonal worse than demyelinating\n\n**Timing:**\n• GBS: May be normal first 1-2 weeks\n• Chronic neuropathy: Can schedule outpatient\n\n**Does patient need urgent EMG/NCS?** [1][3]',
    options: [
      { label: 'Yes — acute/motor symptoms', description: 'Arrange urgent neurology consult', next: 'pn-emergent-workup' },
      { label: 'No — chronic/sensory pattern', description: 'Outpatient EMG acceptable', next: 'pn-treatment' },
    ],
    citation: [1, 3],
  },

  {
    id: 'pn-emergent-workup',
    type: 'info',
    module: 3,
    title: 'Emergent Workup — Acute Neuropathy',
    body: '**Emergent Evaluation for Acute Neuropathy:**\n\n**Bedside Respiratory Assessment:**\n• **FVC** (Forced Vital Capacity) — most useful\n  - <20 mL/kg or <1 L = high intubation risk\n  - Decline >30% from baseline = concerning\n• **NIF** (Negative Inspiratory Force)\n  - Worse than −30 cmH2O = impending failure\n• Check q4h if GBS suspected\n\n**Lumbar Puncture:**\n• **Classic GBS finding:** Albuminocytologic dissociation\n  - Elevated protein (>45 mg/dL)\n  - Normal cell count (<10 cells)\n• May be normal in first week\n• Also rules out infectious/malignant meningitis\n\n**Labs:**\n• Standard workup PLUS:\n• Anti-ganglioside antibodies (GM1, GD1a, GQ1b)\n• Consider stool for botulinum toxin\n• Lyme serologies in endemic areas\n\n**Imaging:**\n• MRI spine if cord compression suspected\n• CXR (aspiration risk, pulmonary function)\n\n**Consults:**\n• Neurology — emergent\n• ICU if respiratory compromise [2][3][6]',
    citation: [2, 3, 6],
    calculatorLinks: [
      { id: 'gbs-fvc-nif', label: 'FVC/NIF Calculator' },
      { id: 'gbs-lp-interp', label: 'LP Interpreter' },
      { id: 'gbs-intubation', label: 'Intubation Decision' },
    ],
    next: 'pn-gbs-pathway',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 4: DIFFERENTIAL & MIMICS
  // =====================================================================

  {
    id: 'pn-gbs-pathway',
    type: 'question',
    module: 4,
    title: 'GBS vs Mimics — Critical Differentiation',
    body: '**Guillain-Barré Syndrome Features:**\n• Acute ascending weakness (<4 weeks to nadir)\n• Areflexia or hyporeflexia\n• Symmetric involvement\n• Recent infection (Campylobacter, CMV, EBV)\n• Autonomic instability (HR, BP fluctuations)\n\n**Key GBS Mimics to Exclude:**\n\n| Mimic | Distinguishing Features |\n|-------|-------------------------|\n| **Transverse myelitis** | Sensory level, sphincter early |\n| **Cord compression** | Back pain, sensory level, MRI+ |\n| **Botulism** | Descending, pupil involvement |\n| **Tick paralysis** | Look for tick, rapid reversal |\n| **Hypokalemia** | Check K+, resolves with repletion |\n| **Porphyria** | Abdominal pain, psychiatric, urine |\n| **Myasthenia gravis** | Fatigable, ocular, no sensory |\n| **Critical illness poly** | ICU setting, sepsis history |\n\n**Does this fit GBS criteria?** [2][6]',
    options: [
      { label: 'Likely GBS', description: 'Ascending, areflexic, symmetric', next: 'pn-gbs-management', urgency: 'critical' },
      { label: 'Mimic suspected', description: 'Features don\'t fit GBS', next: 'pn-mimic-workup' },
      { label: 'Uncertain', description: 'Need more evaluation', next: 'pn-emergent-workup' },
    ],
    citation: [2, 6],
    calculatorLinks: [
      { id: 'gbs-egris', label: 'EGRIS Score' },
      { id: 'bot-ddx', label: 'Botulism DDx' },
      { id: 'mg-ice-test', label: 'Ice Test (MG)' },
    ],
  },

  {
    id: 'pn-mimic-workup',
    type: 'info',
    module: 4,
    title: 'GBS Mimic Workup',
    body: '**Targeted Workup by Suspected Mimic:**\n\n**Spinal Cord Lesion:**\n• MRI spine with contrast\n• Look for sensory level on exam\n• Cord compression = surgical emergency\n\n**Botulism:**\n• Descending paralysis (cranial → limbs)\n• Dilated, poorly reactive pupils\n• Dry mouth, constipation\n• Stool for botulinum toxin\n• Contact public health\n\n**Tick Paralysis:**\n• Ascending paralysis mimics GBS\n• **Look for tick** — scalp, hairline, axilla, groin\n• Rapid reversal (hours) after tick removal\n• No sensory involvement typically\n\n**Hypokalemia:**\n• Check K+ — if <2.5, can cause weakness\n• Resolves with potassium repletion\n• ECG changes often present\n\n**Porphyria:**\n• Abdominal pain, psychiatric symptoms\n• Urine porphyrins (spot and 24h)\n• Autonomic instability\n\n**Myasthenia Gravis:**\n• Fatigable weakness\n• Ptosis, diplopia, bulbar symptoms\n• Ice pack test, AChR antibodies\n• See [MG Consult](#/tree/myasthenia-gravis) [6]',
    citation: [6],
    next: 'pn-disposition',
  },

  {
    id: 'pn-gbs-management',
    type: 'result',
    module: 4,
    title: 'GBS — ED Management',
    body: '**Suspected GBS — Immediate Actions:**\n\n**1. Airway/Respiratory Monitoring:**\n• Serial FVC and NIF q4h minimum\n• Intubation thresholds:\n  - FVC <20 mL/kg or <1 L\n  - NIF worse than −30 cmH2O\n  - Rapid decline (>30% in hours)\n  - Bulbar dysfunction with aspiration risk\n• Early intubation preferred — RSI okay\n\n**2. Autonomic Monitoring:**\n• Continuous cardiac monitoring\n• Watch for HR/BP lability\n• Avoid medications that worsen dysautonomia\n\n**3. Definitive Treatment (neurology-directed):**\n• **IVIG** 0.4 g/kg/day × 5 days, OR\n• **Plasmapheresis** (PLEX) 5 exchanges over 1-2 weeks\n• Equally effective — IVIG more practical in most settings\n• Steroids NOT effective in GBS\n\n**4. Supportive Care:**\n• DVT prophylaxis\n• Pain management (neuropathic pain common)\n• PT/OT early\n\n**Disposition:** ICU admission for respiratory monitoring.\n\n➡️ For detailed GBS management: [GBS Consult](#/tree/guillain-barre) [2][3][6]',
    recommendation: 'Admit to ICU. Serial respiratory monitoring (FVC/NIF q4h). Neurology consult for IVIG or plasmapheresis. Continuous cardiac monitoring for autonomic instability.',
    citation: [2, 3, 6],
    calculatorLinks: [
      { id: 'gbs-ivig-plex', label: 'IVIG vs PLEX' },
      { id: 'gbs-fvc-nif', label: 'FVC/NIF' },
      { id: 'gbs-intubation', label: 'Intubation Decision' },
    ],
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 5: TREATMENT
  // =====================================================================

  {
    id: 'pn-treatment',
    type: 'info',
    module: 5,
    title: 'Symptomatic Treatment — Neuropathic Pain',
    body: '**First-Line Agents (all have similar efficacy):**\n\n**Gabapentinoids:**\n• [Gabapentin](#/drug/gabapentin/neuropathic-pain) 300 mg TID, titrate to 900-3600 mg/day\n• [Pregabalin](#/drug/pregabalin/neuropathic-pain) 75 mg BID, titrate to 150-600 mg/day\n• Onset: 1-2 weeks for full effect\n• Adjust for renal function\n\n**SNRIs:**\n• Duloxetine 30-60 mg daily\n• Venlafaxine ER 75-225 mg daily\n• Also treats comorbid depression/anxiety\n\n**TCAs:**\n• Amitriptyline 10-25 mg qHS, titrate to 75-150 mg\n• Nortriptyline preferred in elderly (less anticholinergic)\n• Caution: cardiac effects, urinary retention\n\n**Topical Options:**\n• Lidocaine 5% patch (localized areas)\n• Capsaicin 8% patch (specialist application)\n\n**Second-Line:**\n• Tramadol (weak opioid + SNRI)\n• Opioids — LAST RESORT only [1][5]',
    citation: [1, 5],
    next: 'pn-treat-cause',
  },

  {
    id: 'pn-treat-cause',
    type: 'info',
    module: 5,
    title: 'Treat Underlying Cause',
    body: '**Reversible Causes — Treat in ED if Identified:**\n\n**B12 Deficiency:**\n• Cyanocobalamin 1000 mcg IM × 1, then daily × 1 week\n• Or high-dose oral (1000-2000 mcg daily)\n• Recovery may take months\n\n**Thiamine Deficiency:**\n• [Thiamine](#/drug/thiamine/deficiency) 100-500 mg IV/IM\n• Especially if alcohol use disorder\n• Can mimic GBS (dry beriberi)\n\n**Hypothyroidism:**\n• Start levothyroxine (outpatient usually)\n• Neuropathy improves slowly with treatment\n\n**Diabetes/Prediabetes:**\n• Tight glycemic control slows progression\n• Does not reverse existing damage\n• Screen ALL neuropathy patients for DM\n\n**Toxic Exposure:**\n• Remove offending agent\n• Alcohol cessation\n• Chemotherapy — often dose-limiting\n• Heavy metals — chelation (specialist)\n\n**Inflammatory/Autoimmune:**\n• CIDP — IVIG, steroids, plasmapheresis\n• Vasculitic — steroids, immunosuppression\n• Neurology-directed treatment [1][4]',
    citation: [1, 4],
    next: 'pn-disposition',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'pn-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition Decision',
    body: '**Admission Criteria:**\n\n**ICU Admission:**\n• Respiratory compromise (FVC <20, declining)\n• Autonomic instability\n• GBS or suspected GBS\n• Bulbar dysfunction with aspiration risk\n\n**Floor Admission:**\n• Unable to ambulate safely\n• Rapid symptom progression\n• Needs IV treatment\n• Unreliable follow-up\n\n**Observation:**\n• Diagnostic uncertainty\n• Pending LP results\n• Serial neuro exams needed\n\n**Discharge:**\n• Chronic/stable symptoms\n• Ambulatory\n• Reliable follow-up arranged\n• No red flags',
    options: [
      { label: 'ICU admission', description: 'Respiratory risk, GBS, autonomic instability', next: 'pn-admit-icu', urgency: 'critical' },
      { label: 'Floor admission', description: 'Progressive symptoms, needs workup', next: 'pn-admit-floor' },
      { label: 'Discharge', description: 'Stable, chronic, follow-up arranged', next: 'pn-discharge' },
    ],
    citation: [1, 2],
  },

  {
    id: 'pn-admit-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU Admission Protocol:**\n\n**Monitoring:**\n• Serial FVC/NIF q4h (or more frequently if declining)\n• Continuous cardiac monitoring\n• Frequent neuro checks\n• Swallow evaluation before PO intake\n\n**Treatments:**\n• DVT prophylaxis (mechanical + pharmacologic)\n• PPI for stress ulcer prophylaxis\n• Pain management\n• Early PT/OT consult\n\n**Intubation Preparation:**\n• Have equipment ready\n• RSI is safe in GBS\n• Avoid succinylcholine (hyperkalemia risk)\n• Rocuronium preferred\n\n**Consults:**\n• Neurology (emergent)\n• Pulmonology/critical care\n• Consider IR for PLEX access',
    recommendation: 'Admit to ICU with continuous monitoring. Serial respiratory assessments q4h. Neurology consult for IVIG or PLEX. DVT prophylaxis. Intubation equipment at bedside.',
    citation: [2, 3],
  },

  {
    id: 'pn-admit-floor',
    type: 'result',
    module: 6,
    title: 'Floor Admission',
    body: '**Floor Admission Protocol:**\n\n**Workup to Complete:**\n• Tier 1 and Tier 2 labs if not done\n• Consider LP if inflammatory cause suspected\n• EMG/NCS during admission\n• MRI if structural lesion suspected\n\n**Monitoring:**\n• Neuro checks q4-6h\n• Fall precautions\n• PT/OT evaluation\n\n**Symptomatic Treatment:**\n• Initiate neuropathic pain medication\n• Treat identified deficiencies (B12, thiamine)\n\n**Consults:**\n• Neurology (routine or urgent based on acuity)\n• PM&R for rehabilitation planning\n\n**Escalation Criteria:**\n• Transfer to ICU if:\n  - FVC declining\n  - New respiratory symptoms\n  - Autonomic instability\n  - Progression of weakness',
    recommendation: 'Admit to floor with fall precautions. Complete workup (labs, consider LP/EMG). Neurology consult. Initiate symptomatic treatment. Clear escalation criteria to nursing.',
    citation: [1, 2],
  },

  {
    id: 'pn-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge — Outpatient Management',
    body: '**Discharge Criteria (ALL must be met):**\n• ✅ No red flags (acute, progressive, motor, autonomic)\n• ✅ Able to ambulate safely\n• ✅ Chronic/stable symptoms\n• ✅ Follow-up arranged\n\n**Discharge Instructions:**\n\n**Medications to Start:**\n• Gabapentin 300 mg TID (titrate weekly)\n• OR pregabalin 75 mg BID\n• Prescribe short course only — needs follow-up\n\n**Labs to Order (outpatient):**\n• Fasting glucose or HbA1c\n• TSH, B12\n• SPEP with immunofixation\n• Consider HIV, Lyme, HCV based on risk\n\n**Follow-up:**\n• PCP within 1-2 weeks\n• Neurology referral (routine, 2-4 weeks)\n• EMG/NCS outpatient if indicated\n\n🚨 **Return Precautions:**\n• Weakness spreading or worsening\n• Difficulty breathing or swallowing\n• Unable to walk\n• Loss of bladder/bowel control\n• Any rapid change in symptoms',
    recommendation: 'Discharge with gabapentin or pregabalin. Order outpatient labs (glucose, TSH, B12, SPEP). PCP follow-up 1-2 weeks. Neurology referral. Written return precautions.',
    citation: [1],
  },

];

export const PERIPHERAL_NEUROPATHY_MODULE_LABELS: string[] = [
  'Recognition & Red Flags',
  'Classification',
  'Workup',
  'Differential & Mimics',
  'Treatment',
  'Disposition',
];

export const PERIPHERAL_NEUROPATHY_CITATIONS: Citation[] = [
  { num: 1, text: 'Castelli G, Desai KM, Cantone RE. Peripheral Neuropathy: Evaluation and Differential Diagnosis. Am Fam Physician. 2020;102(12):732-739.' },
  { num: 2, text: 'Farkas J. Neuromuscular Disorders. Internet Book of Critical Care (IBCC). EMCrit. 2024.' },
  { num: 3, text: 'Leonhard SE, Mandarakas MR, Gondim FAA, et al. Diagnosis and management of Guillain-Barré syndrome in ten steps. Nat Rev Neurol. 2019;15(11):671-683.' },
  { num: 4, text: 'Collins MP, Hadden RD. The nonsystemic vasculitic neuropathies. Nat Rev Neurol. 2017;13(5):302-316.' },
  { num: 5, text: 'National Institute of Neurological Disorders and Stroke. Peripheral Neuropathy Fact Sheet. NINDS. 2025.' },
  { num: 6, text: 'Willison HJ, Jacobs BC, van Doorn PA. Guillain-Barré syndrome. Lancet. 2016;388(10045):717-727.' },
];

export const PERIPHERAL_NEUROPATHY_NODE_COUNT = PERIPHERAL_NEUROPATHY_NODES.length;
