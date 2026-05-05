// MedKitt — Psych Medical Stability
// Organic vs Psychiatric → Red Flags → Labs → Delirium vs Psychosis → Documentation
// Evidence: AAEP Task Force 2017, ACEP psychiatric patient policy
// ~22 nodes

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const MEDICAL_CLEARANCE_PSYCH_CRITICAL_ACTIONS = [
  { text: 'Medical assessment is clinical - history, vitals, exam, mentation, and red flags drive testing', nodeId: 'mcp-start' },
  { text: 'New-onset psychosis age >45 = medical until proven otherwise', nodeId: 'mcp-red-flags' },
  { text: 'Delirium = inattention + fluctuating course. Psychosis = fixed delusions + intact attention', nodeId: 'mcp-delirium-vs-psychosis' },
  { text: 'Normal vitals + normal exam + known psych history = labs usually unnecessary', nodeId: 'mcp-minimal-workup' },
  { text: 'ALWAYS check glucose, O2 sat, temperature', nodeId: 'mcp-vitals' },
];

export const MEDICAL_CLEARANCE_PSYCH_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'mcp-start',
    type: 'info',
    module: 1,
    title: 'Psych Medical Stability',
    body: '[Steps Summary](#/info/mcp-steps)\n\n**Use "medical assessment/stability," not a blanket clearance mindset.**\n\n**Why this matters:**\n• Medical mimics are uncommon in low-risk known psychiatric presentations, but high-impact when red flags are present\n• Missed medical diagnoses in psychiatric patients are reported across a wide range because risk depends heavily on age, vitals, exam, delirium, intoxication, and baseline history\n• Psychiatric patients have higher rates of comorbid medical illness\n\n**AAEP Task Force 2017:**\nMedical evaluation is based on clinical assessment, not routine testing.',
    citation: [1, 2],
    next: 'mcp-vitals',
    summary: 'Psych medical assessment: history, vitals, exam, mentation, and red flags drive testing; routine labs are not automatic.',
  },

  {
    id: 'mcp-vitals',
    type: 'info',
    module: 1,
    title: 'Vital Signs — Always Check',
    body: '**AAEP Recommendation: Check vitals on ALL patients**\n\n**Red flag vitals:**\n• HR >120 or <50\n• SBP >180 or <90\n• RR >25 or <10\n• Temp >38.5°C or <35°C\n• O2 sat <94%\n\n**Also check:**\n• Glucose (fingerstick) — hypoglycemia mimics psych\n• Pupils — toxidrome clues\n\n**If ANY vital abnormal:** → Organic cause more likely',
    citation: [1],
    next: 'mcp-history',
    summary: 'Always check vitals + glucose. Abnormal vitals = organic cause more likely.',
  },

  {
    id: 'mcp-history',
    type: 'question',
    module: 1,
    title: 'Psychiatric History',
    body: '**Does patient have KNOWN psychiatric history with SIMILAR presentation?**',
    options: [
      { label: 'Yes — known history, similar symptoms', description: 'Prior episodes, stable baseline', next: 'mcp-known-history' },
      { label: 'No — first episode or different', description: 'New symptoms, different pattern', next: 'mcp-red-flags', urgency: 'urgent' },
      { label: 'Unknown — cannot obtain history', description: 'Unable to verify', next: 'mcp-red-flags' },
    ],
    citation: [1],
    summary: 'Known psych history with similar presentation = lower organic risk. Unknown = higher.',
  },

  {
    id: 'mcp-known-history',
    type: 'question',
    module: 1,
    title: 'Known Psychiatric History',
    body: '**Patient has known psychiatric history.**\n\nAre there ANY concerning features?',
    options: [
      { label: 'Normal vitals, normal exam, no red flags', description: 'Appears similar to prior episodes', next: 'mcp-low-risk' },
      { label: 'Any concerning feature present', description: 'Abnormal vitals, new symptoms, red flags', next: 'mcp-red-flags', urgency: 'urgent' },
    ],
    summary: 'Known history + normal vitals/exam = low organic risk. Any red flag = workup needed.',
  },

  // =====================================================================
  // MODULE 2: RED FLAGS
  // =====================================================================

  {
    id: 'mcp-red-flags',
    type: 'info',
    module: 2,
    title: 'Red Flags for Organic Cause',
    body: '**Organic cause until proven otherwise if ANY present:**\n\n**Historical:**\n• Age >45 with first psychiatric symptoms\n• Acute onset (hours-days vs weeks-months)\n• No prior psychiatric history\n• Recent head trauma\n• Known medical illness (cancer, HIV, thyroid)\n• New medications or recent changes\n\n**Clinical:**\n• Visual hallucinations (vs auditory)\n• Fluctuating consciousness\n• Disorientation (time, place, person)\n• Abnormal vital signs\n• Focal neurologic findings\n• Signs of intoxication/withdrawal',
    citation: [1, 2],
    next: 'mcp-red-flag-check',
    summary: 'Age >45 first episode, visual hallucinations, fluctuating course, abnormal vitals = organic.',
    safetyLevel: 'critical',
  },

  {
    id: 'mcp-red-flag-check',
    type: 'question',
    module: 2,
    title: 'Red Flag Assessment',
    body: '**Are ANY red flags present?**',
    options: [
      { label: 'Yes — red flags present', description: 'Needs organic workup', next: 'mcp-delirium-vs-psychosis', urgency: 'urgent' },
      { label: 'No — no red flags', description: 'But unknown history or first episode', next: 'mcp-moderate-risk' },
    ],
    summary: 'Red flags present = organic workup. No red flags but first episode = moderate workup.',
  },

  // =====================================================================
  // MODULE 3: DELIRIUM VS PSYCHOSIS
  // =====================================================================

  {
    id: 'mcp-delirium-vs-psychosis',
    type: 'info',
    module: 3,
    title: 'Delirium vs Psychosis',
    body: '**KEY DISTINCTION — guides entire workup:**\n\n| Feature | Delirium | Psychosis |\n|---------|----------|----------|\n| **Onset** | Acute (hours-days) | Gradual (weeks-months) |\n| **Course** | Fluctuating | Stable |\n| **Attention** | IMPAIRED | Intact |\n| **Orientation** | Disoriented | Often oriented |\n| **Hallucinations** | Visual | Auditory |\n| **Vitals** | Often abnormal | Usually normal |\n| **Sleep-wake** | Disrupted | Variable |\n\n**Inattention test:** Serial 7s, spell WORLD backwards, months backwards\n→ Cannot perform = delirium',
    citation: [3],
    next: 'mcp-delirium-check',
    summary: 'Delirium = inattention, fluctuating, visual. Psychosis = intact attention, auditory.',
  },

  {
    id: 'mcp-delirium-check',
    type: 'question',
    module: 3,
    title: 'CAM Assessment',
    body: '**Confusion Assessment Method (CAM):**\n\n**Feature 1:** Acute onset AND fluctuating course\n**Feature 2:** Inattention (cannot focus on interview)\n**Feature 3:** Disorganized thinking (rambling, illogical)\n**Feature 4:** Altered level of consciousness (not alert)\n\n**DELIRIUM = Feature 1 + Feature 2 + (Feature 3 OR 4)**',
    options: [
      { label: 'CAM positive — DELIRIUM', description: 'Features 1+2 + (3 or 4)', next: 'mcp-delirium-workup', urgency: 'critical' },
      { label: 'CAM negative — likely psychosis', description: 'Attention intact', next: 'mcp-psychosis-workup' },
      { label: 'Unclear', description: 'Cannot assess', next: 'mcp-full-workup' },
    ],
    citation: [3],
    summary: 'CAM positive = delirium (organic). CAM negative = likely primary psychosis.',
  },

  // =====================================================================
  // MODULE 4: WORKUP PATHWAYS
  // =====================================================================

  {
    id: 'mcp-delirium-workup',
    type: 'info',
    module: 4,
    title: 'Delirium Workup',
    body: '**DELIRIUM = medical emergency**\n\n**Find the cause (I WATCH DEATH):**\n• **I**nfection (UTI, pneumonia, meningitis)\n• **W**ithdrawal (alcohol, benzos, opioids)\n• **A**cute metabolic (glucose, Na+, Ca2+, uremia)\n• **T**rauma (head injury, pain)\n• **C**NS pathology (stroke, bleed, mass, seizure)\n• **H**ypoxia\n• **D**eficiencies (thiamine, B12)\n• **E**ndocrine (thyroid, adrenal)\n• **A**cute vascular (MI, PE)\n• **T**oxins/drugs\n• **H**eavy metals\n\n**Workup:**\n• CBC, BMP, glucose, UA\n• Toxicology screen\n• Ammonia, LFTs if liver concern\n• CT head if focal findings or trauma\n• LP if meningitis concern',
    citation: [3, 4],
    next: 'mcp-labs-delirium',
    summary: 'Delirium = I WATCH DEATH mnemonic. Full workup for underlying cause.',
    safetyLevel: 'critical',
  },

  {
    id: 'mcp-labs-delirium',
    type: 'info',
    module: 4,
    title: 'Delirium Labs',
    body: '**Standard delirium panel:**\n\n**Always:**\n• CBC with differential\n• BMP (Na+, K+, glucose, BUN, Cr)\n• Urinalysis\n• Toxicology screen\n\n**Consider:**\n• LFTs, ammonia (hepatic encephalopathy)\n• TSH (thyroid storm/myxedema)\n• Lactate (sepsis)\n• Troponin (cardiac cause)\n• B12, folate (deficiency)\n• Blood cultures (sepsis)\n• VBG/ABG (hypoxia, acidosis)\n\n**Imaging:**\n• CT head if: trauma, focal findings, anticoagulation, new-onset\n• CXR if: hypoxia, cough, fever',
    citation: [3],
    next: 'mcp-disposition',
    summary: 'Delirium: CBC, BMP, UA, tox screen. CT head if focal/trauma. Consider ammonia, TSH.',
  },

  {
    id: 'mcp-psychosis-workup',
    type: 'info',
    module: 4,
    title: 'Psychosis Workup',
    body: '**Primary psychosis (CAM negative):**\n\n**Still consider organic causes:**\n• Anti-NMDA receptor encephalitis (young women, ovarian teratoma)\n• Stimulant intoxication (especially meth, cocaine)\n• Medication toxicity (steroids, anticholinergics)\n• Thyroid storm\n• Autoimmune encephalitis\n\n**First psychotic break workup:**\n• Vitals, glucose, CBC, BMP\n• TSH when thyroid symptoms, mood syndrome, or unclear cause\n• Toxicology screen when substance-induced symptoms are plausible\n• UA if urinary symptoms, pregnancy concern, elderly, or delirium concern\n• Consider HIV, syphilis (RPR), B12 based on risk factors, local protocol, or atypical presentation\n\n**Known psychosis, similar presentation:**\n→ Labs often unnecessary if normal vitals/exam',
    citation: [1, 5],
    next: 'mcp-labs-psychosis',
    summary: 'First psychotic break: targeted labs based on risk; known typical psychosis with normal assessment often needs no routine labs.',
  },

  {
    id: 'mcp-labs-psychosis',
    type: 'question',
    module: 4,
    title: 'Labs for Psychosis',
    body: '**Which scenario?**',
    options: [
      { label: 'First psychotic episode', description: 'New diagnosis, unknown cause', next: 'mcp-first-episode' },
      { label: 'Known psychosis, typical presentation', description: 'Normal vitals, no red flags', next: 'mcp-minimal-workup' },
      { label: 'Known psychosis, atypical features', description: 'Different from baseline, red flags', next: 'mcp-full-workup' },
    ],
    summary: 'First episode = full workup. Known + typical = minimal. Known + atypical = full.',
  },

  {
    id: 'mcp-first-episode',
    type: 'info',
    module: 4,
    title: 'First Psychotic Episode',
    body: '**First episode requires targeted medical assessment:**\n\n**Labs:**\n• CBC, BMP, glucose\n• TSH when clinically indicated\n• Toxicology screen when substance-induced symptoms are plausible\n• UA if urinary symptoms, pregnancy concern, elderly, or delirium concern\n• RPR/HIV/B12/folate based on risk factors, atypical features, or local protocol\n\n**Imaging:**\n• ED CT for focal deficits, headache/seizure, trauma, delirium features, anticoagulation/immunosuppression, or age >45\n• MRI brain is preferred for stable non-emergent structural evaluation when available\n\n**Consider:**\n• EEG if seizure concern\n• LP if encephalitis concern\n• Anti-NMDA antibodies when young patient has prodrome, seizures, dyskinesias, autonomic instability, or decreased consciousness',
    citation: [1, 5],
    next: 'mcp-disposition',
    summary: 'First episode: targeted labs; image for neurologic/atypical features or age >45; MRI can be non-emergent if stable.',
  },

  {
    id: 'mcp-minimal-workup',
    type: 'info',
    module: 4,
    title: 'Minimal Workup',
    body: '**Known psychiatric history + typical presentation + normal vitals/exam:**\n\n**AAEP Recommendation:**\n• Routine labs are NOT required\n• Check fingerstick glucose\n• Check pregnancy (if applicable)\n• Address specific concerns only\n\n**This approach is evidence-based:**\n• Studies show routine labs rarely change management\n• Reduces ED length of stay\n• Focus resources on high-yield assessments',
    citation: [1],
    next: 'mcp-disposition',
    summary: 'Known psych + typical + normal = glucose + pregnancy only. Routine labs not required.',
  },

  {
    id: 'mcp-moderate-risk',
    type: 'info',
    module: 4,
    title: 'Moderate Risk Workup',
    body: '**No red flags but first episode or unknown history:**\n\n**Reasonable workup:**\n• Fingerstick glucose\n• CBC, BMP\n• Toxicology screen\n• UA (especially elderly)\n• TSH\n\n**Clinical judgment drives additional testing.**\nThis is an intermediate approach — not as extensive as delirium but more than minimal.',
    citation: [1],
    next: 'mcp-disposition',
    summary: 'Moderate risk: glucose, CBC, BMP, tox, UA, TSH. Clinical judgment for more.',
  },

  {
    id: 'mcp-full-workup',
    type: 'info',
    module: 4,
    title: 'Full Medical Workup',
    body: '**Atypical presentation or unclear etiology:**\n\n**Full panel:**\n• CBC, BMP\n• LFTs, ammonia\n• TSH\n• Toxicology screen\n• UA with culture\n• Lactate\n• VBG/ABG\n\n**Imaging:**\n• CT head (or MRI if available)\n• CXR\n\n**Consider:**\n• LP if encephalitis/meningitis concern\n• EEG if seizure concern\n• HIV, RPR, B12',
    citation: [1, 3],
    next: 'mcp-disposition',
    summary: 'Full workup: CBC, BMP, LFTs, ammonia, TSH, tox, UA, lactate, imaging.',
  },

  {
    id: 'mcp-low-risk',
    type: 'info',
    module: 4,
    title: 'Low Risk — Known Stable',
    body: '**Known psychiatric history + similar presentation + normal assessment:**\n\n**Required:**\n• Fingerstick glucose\n• Pregnancy test (if applicable)\n\n**Not required:**\n• Routine CBC, BMP\n• Toxicology screen (unless clinically indicated)\n• Imaging\n\n**AAEP evidence:**\nRoutine testing in this population rarely changes management and prolongs ED boarding.',
    citation: [1],
    next: 'mcp-disposition',
    summary: 'Low risk: glucose + pregnancy only. Routine labs not indicated.',
  },

  // =====================================================================
  // MODULE 5: DISPOSITION
  // =====================================================================

  {
    id: 'mcp-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: '**Where does patient need to go?**',
    options: [
      { label: 'Medical admission', description: 'Active medical problem requiring treatment', next: 'mcp-medical-admit' },
      { label: 'Psychiatry (medically cleared)', description: 'No active medical issue, psych evaluation needed', next: 'mcp-psych-cleared' },
      { label: 'Discharge', description: 'Stable, safe, outpatient follow-up', next: 'mcp-discharge' },
    ],
    summary: 'Disposition: medical admission, psych evaluation, or discharge.',
  },

  {
    id: 'mcp-medical-admit',
    type: 'result',
    module: 5,
    title: 'Medical Admission',
    body: '**Active medical problem identified:**\n\n• Delirium requiring treatment\n• Infection (UTI, pneumonia, sepsis)\n• Metabolic derangement\n• Intoxication/withdrawal requiring monitoring\n• Acute organ dysfunction\n\n**Continue psychiatric assessment in parallel** if safe to do so.\nPsychiatry can evaluate once medically stabilized.',
    recommendation: 'Admit to medicine for treatment of underlying medical condition.',
    confidence: 'definitive',
    summary: 'Medical admission for active medical problem. Psych eval when stable.',
  },

  {
    id: 'mcp-psych-cleared',
    type: 'result',
    module: 5,
    title: 'Medically Stable for Psychiatry',
    body: '**Medical stability documentation:**\n\n✓ Vital signs reviewed and stable\n✓ Physical exam performed\n✓ Mental status exam documented\n✓ Labs reviewed (if obtained)\n✓ No acute medical condition requiring admission\n✓ Patient stable for psychiatric evaluation\n\n**Communicate to psychiatry:**\n• Pertinent medical findings\n• Medications given in ED\n• Labs and imaging results\n• Ongoing medical issues (stable)',
    recommendation: 'Patient is medically stable for psychiatric evaluation/admission.',
    confidence: 'definitive',
    citation: [1],
    summary: 'Medically stable — document vitals, exam, labs if obtained, and stability for psych eval.',
  },

  {
    id: 'mcp-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge',
    body: '**Criteria for discharge:**\n\n• No acute medical condition\n• No imminent safety risk\n• Stable psychiatric condition\n• Safe disposition (home, with family)\n• Follow-up arranged\n\n**Provide:**\n• Outpatient psychiatry follow-up\n• Crisis resources (988 Lifeline)\n• Return precautions',
    recommendation: 'Discharge with outpatient follow-up and crisis resources.',
    confidence: 'recommended',
    summary: 'Discharge if stable, safe, with follow-up and crisis resources.',
  },

];

export const MEDICAL_CLEARANCE_PSYCH_MODULE_LABELS = [
  'Initial Assessment',
  'Red Flags',
  'Delirium vs Psychosis',
  'Workup',
  'Disposition',
];

export const MEDICAL_CLEARANCE_PSYCH_CITATIONS: Citation[] = [
  { num: 1, text: 'Wilson MP, Nordstrom K, Anderson EL, et al. AAEP Task Force on Medical Clearance of Adult Psychiatric Patients. Part II: Controversies over Medical Assessment, and Consensus Recommendations. West J Emerg Med. 2017;18(4):640-646.' },
  { num: 2, text: 'Henneman PL, et al. Prospective Study of the Incidence of an Abnormal Serum Sodium Level in Patients Evaluated for a Psychiatric Disorder. Ann Emerg Med 1994;24:203-7.' },
  { num: 3, text: 'Inouye SK, et al. Clarifying Confusion: The Confusion Assessment Method. Ann Intern Med 1990;113:941-8.' },
  { num: 4, text: 'Han JH, et al. Delirium in the Emergency Department: An Independent Predictor of Death Within 6 Months. Ann Emerg Med 2010;56:244-52.' },
  { num: 5, text: 'Dalmau J, et al. Anti-NMDA-receptor Encephalitis: Case Series and Analysis of the Effects of Antibodies. Lancet Neurol 2008;7:1091-8.' },
];

export const MEDICAL_CLEARANCE_PSYCH_NODE_COUNT = MEDICAL_CLEARANCE_PSYCH_NODES.length;
