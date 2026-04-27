// MedKitt — Multiple Sclerosis
// ED-focused MS consult: Presentation → True Relapse vs Pseudoexacerbation → Acute Management → Optic Neuritis → Transverse Myelitis → Complications → DMT Side Effects
// Sources: UpToDate, EB Medicine, McDonald 2017, ONTT Trial, EMCrit, WikEM
// 8 modules: Presentation → Assessment → Acute Relapse → Optic Neuritis → Transverse Myelitis → Complications → DMT Issues → Disposition
// ~40 nodes

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const MULTIPLE_SCLEROSIS_CRITICAL_ACTIONS = [
  { text: 'Check UA, CBC, CXR in ALL MS patients with worsening — UTI is the #1 cause of pseudoexacerbation', nodeId: 'ms-pseudoexacerbation' },
  { text: 'NEVER give oral prednisone ALONE for optic neuritis — doubles recurrence risk (ONTT trial)', nodeId: 'ms-on-treatment' },
  { text: 'Get MRI BEFORE steroids if any concern for cord compression or alternative diagnosis', nodeId: 'ms-mri-indications' },
  { text: 'Baclofen withdrawal is LIFE-THREATENING — hyperthermia, rigidity, AMS = restore baclofen immediately', nodeId: 'ms-baclofen-withdrawal' },
  { text: 'PML risk with natalizumab — new progressive deficits (not typical relapse) = hold steroids, urgent MRI + LP for JCV', nodeId: 'ms-pml' },
  { text: 'NMOSD and MOG-Ab disease require DIFFERENT treatment — some MS DMTs worsen these conditions', nodeId: 'ms-nmosd-vs-ms' },
  { text: 'Postpartum MS patients are HIGH-RISK for severe relapses (especially first 3 months)', nodeId: 'ms-pregnancy' },
  { text: 'Respiratory failure can occur with brainstem/high cervical lesions — low threshold for intubation', nodeId: 'ms-respiratory' },
] as const;

export const MULTIPLE_SCLEROSIS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: PRESENTATION
  // =====================================================================

  {
    id: 'ms-start',
    type: 'info',
    module: 1,
    title: 'Multiple Sclerosis — ED Approach',
    body: '[MS Do NOT — Critical Pitfalls](#/info/ms-stop)\n\n**Multiple Sclerosis** is an autoimmune demyelinating disease of the CNS. The ED encounters MS in three scenarios:\n\n1. **New-onset presentation** suspicious for MS\n2. **Acute relapse** in known MS patient\n3. **Complications** (infections, DMT side effects, spasticity crisis)\n\n**Key ED Role:**\n• Distinguish TRUE relapse vs PSEUDOEXACERBATION\n• Rule out mimics and emergencies\n• Initiate appropriate therapy\n• Arrange neurology follow-up\n\n**MS Demographics:**\n• Peak onset: 20-40 years\n• Female:Male = 2-3:1\n• New-onset unlikely <16 or >50 years\n\n**Classic MS Presentations:**\n• **Optic neuritis** (most common first presentation)\n• **Transverse myelitis** (sensory level, weakness, bladder)\n• **Brainstem syndromes** (INO, diplopia, vertigo)\n• **Long tract signs** (spastic paraplegia, Lhermitte sign) [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'ms-relapse-vs-pseudo', label: 'Relapse vs Pseudo' },
      { id: 'ms-mcdonald', label: 'McDonald Criteria' },
    ],
    next: 'ms-presentation-type',
    summary: 'New-onset, relapse, or complication — relapse vs pseudo',
  },

  {
    id: 'ms-presentation-type',
    type: 'question',
    module: 1,
    title: 'Clinical Scenario',
    body: 'What is the clinical scenario?\n\nThis determines the ED approach and urgency.',
    options: [
      { label: 'Known MS with new/worsening symptoms', description: 'Established diagnosis, symptom change', next: 'ms-known-assessment', urgency: 'routine' },
      { label: 'Suspected new-onset MS', description: 'No prior diagnosis, symptoms suggestive of demyelination', next: 'ms-new-onset' },
      { label: 'Optic neuritis', description: 'Painful vision loss, RAPD, dyschromatopsia', next: 'ms-on-start', urgency: 'urgent' },
      { label: 'Transverse myelitis / cord symptoms', description: 'Sensory level, weakness, bladder dysfunction', next: 'ms-tm-start', urgency: 'critical' },
      { label: 'MS complication / DMT concern', description: 'Infection, baclofen issues, DMT side effects', next: 'ms-complications-menu' },
    ],
    summary: 'Scenario determines urgency and approach',
  },

  {
    id: 'ms-new-onset',
    type: 'info',
    module: 1,
    title: 'Suspected New-Onset MS',
    body: '**Clues to MS in the ED:**\n\n• Young adult with unexplained neurological symptoms\n• Symptoms that "don\'t fit" traditional neuro patterns\n• History of prior unexplained neuro episodes (even if resolved)\n• Symptoms that wax and wane\n• Family history of MS\n\n**Common First Presentations:**\n• **Optic neuritis** (25%)\n• Sensory symptoms (numbness, paresthesias)\n• Motor symptoms (weakness, clumsiness)\n• Brainstem/cerebellar (diplopia, ataxia, vertigo)\n• Lhermitte sign (electric shock down spine with neck flexion)\n\n⚠️ **ED Pitfalls:**\n• **Don\'t diagnose MS in the ED** — requires neurology workup\n• **Don\'t assume symptoms are MS** without excluding emergencies\n• **Don\'t miss cord compression** — MRI before steroids\n\n**ED Action:**\n1. Rule out emergencies (cord compression, stroke, infection)\n2. MRI brain ± spine with gadolinium\n3. Neurology consultation\n4. Usually requires admission for workup [1][3]',
    citation: [1, 3],
    next: 'ms-mri-indications',
    summary: 'No MS Dx in ED — emergencies first, MRI, neuro consult',
  },

  // =====================================================================
  // MODULE 2: ASSESSMENT - KNOWN MS
  // =====================================================================

  {
    id: 'ms-known-assessment',
    type: 'info',
    module: 2,
    title: 'Known MS — Initial Assessment',
    body: '**First Priority: Rule out PSEUDOEXACERBATION**\n\nPseudoexacerbation = temporary worsening of EXISTING deficits triggered by physiological stressors. NOT a true relapse.\n\n**Check for triggers:**\n• **Infection** (especially UTI — #1 cause)\n• **Fever** (even low-grade)\n• **Heat exposure** (Uhthoff phenomenon)\n• **Metabolic derangements**\n• **Medication changes**\n\n**Initial Workup for ALL MS patients with symptom worsening:**\n• UA + urine culture\n• CBC with differential\n• BMP\n• Temperature\n• CXR if respiratory symptoms\n\n**Also consider:**\n• Recent DMT changes (rebound with fingolimod/natalizumab discontinuation)\n• Baclofen pump issues (withdrawal is life-threatening)\n• New medications that could worsen MS [4][5]',
    citation: [4, 5],
    calculatorLinks: [
      { id: 'ms-relapse-vs-pseudo', label: 'Relapse vs Pseudo' },
    ],
    next: 'ms-pseudoexacerbation',
    summary: 'UA CBC CXR ALL worsening — UTI #1 pseudo cause',
  },

  {
    id: 'ms-pseudoexacerbation',
    type: 'question',
    module: 2,
    title: 'Relapse vs Pseudoexacerbation',
    body: '**Distinguishing Features:**\n\n| Feature | TRUE Relapse | Pseudoexacerbation |\n|---------|--------------|--------------------|\n| Duration | >24 hours | <24h (resolves when trigger removed) |\n| Symptoms | NEW deficits | Worsening of EXISTING deficits |\n| Fever/infection | Absent | Often present |\n| Response | Requires steroids | Treat underlying cause |\n\n**Uhthoff Phenomenon:**\nHeat-induced temporary worsening (hot showers, exercise, fever). Resolves with cooling. NOT a true relapse.\n\nIs there evidence of infection, fever, or other trigger?',
    options: [
      { label: 'Yes — infection/fever/trigger present', description: 'Likely pseudoexacerbation', next: 'ms-pseudo-management' },
      { label: 'No — no trigger identified', description: 'Evaluate for true relapse', next: 'ms-true-relapse-eval' },
      { label: 'Unsure — need workup', description: 'Check UA, labs, temperature', next: 'ms-known-assessment' },
    ],
    summary: 'Pseudo: EXISTING worse + trigger — relapse: NEW >24hrs',
  },

  {
    id: 'ms-pseudo-management',
    type: 'info',
    module: 2,
    title: 'Pseudoexacerbation Management',
    body: '**Management of Pseudoexacerbation:**\n\n**1. Treat the Underlying Trigger:**\n• **UTI:** Empiric antibiotics (consider resistance patterns)\n• **Fever:** Antipyretics, identify source\n• **Heat exposure:** Cooling measures, avoid triggers\n• **Metabolic:** Correct abnormalities\n\n**2. Reassess After Trigger Resolved:**\n• Neurological deficits should improve within 24-48 hours\n• If deficits PERSIST after fever/infection resolved → likely true relapse\n\n**3. Steroids:**\n• **NOT indicated** for pseudoexacerbation\n• Wait until trigger treated and symptoms reassessed\n• Consider steroids if deficits persist 24-48h after infection treated\n\n**4. Disposition:**\n• Mild infection + stable neuro status → may discharge with close follow-up\n• Significant infection or uncertain → admission\n• Arrange neurology follow-up within 1-2 weeks [4][5]',
    citation: [4, 5],
    next: 'ms-disposition',
    summary: 'Treat trigger — steroids NOT for pseudo',
  },

  {
    id: 'ms-true-relapse-eval',
    type: 'info',
    module: 2,
    title: 'True MS Relapse Evaluation',
    body: '**Definition of MS Relapse:**\n\nNew or worsening neurological symptoms lasting **>24 hours** in the **absence of fever or infection**.\n\n**Relapse Characteristics:**\n• Symptoms develop over hours to days\n• Peak within 2-4 weeks\n• Gradual improvement over weeks to months\n• May leave residual deficits\n\n**Symptoms Suggesting True Relapse:**\n• NEW focal neurological deficit\n• Not explained by infection or metabolic cause\n• Consistent with CNS demyelination\n\n**When to Get MRI:**\n• New or atypical symptoms\n• First relapse in >1 year\n• Concern for cord involvement\n• Diagnostic uncertainty\n• Before starting PLEX\n\n**Note:** Routine MRI not required for every relapse in patients with established MS and typical symptoms [1][6]',
    citation: [1, 6],
    next: 'ms-relapse-severity',
    summary: 'New deficit >24hrs no infection = relapse — MRI first',
  },

  {
    id: 'ms-relapse-severity',
    type: 'question',
    module: 2,
    title: 'Relapse Severity',
    body: '**Assess Functional Impact:**\n\nSeverity determines need for admission and urgency of treatment.\n\n**Mild Relapse:**\n• Sensory symptoms only\n• Minor weakness not affecting function\n• Patient ambulatory and independent\n\n**Moderate Relapse:**\n• Motor weakness affecting function\n• Balance/gait impairment\n• Able to care for self with difficulty\n\n**Severe Relapse:**\n• Unable to ambulate safely\n• Bladder retention\n• Brainstem involvement\n• Visual loss affecting function\n• Respiratory symptoms\n\nWhat is the relapse severity?',
    options: [
      { label: 'Mild relapse', description: 'Sensory only, preserved function', next: 'ms-mild-relapse' },
      { label: 'Moderate relapse', description: 'Functional impairment, ambulatory with difficulty', next: 'ms-steroid-protocol' },
      { label: 'Severe relapse', description: 'Unable to ambulate, bladder issues, brainstem/respiratory', next: 'ms-severe-relapse' },
    ],
    summary: 'Mild=sensory, mod=impaired, severe=no ambulation',
  },

  // =====================================================================
  // MODULE 3: ACUTE RELAPSE TREATMENT
  // =====================================================================

  {
    id: 'ms-mild-relapse',
    type: 'info',
    module: 3,
    title: 'Mild Relapse Management',
    body: '**Mild MS Relapse:**\n\n**Key Point:** Steroids speed recovery but do NOT improve long-term outcome or prevent future relapses.\n\n**Options:**\n\n**1. Observation + Follow-up:**\n• Acceptable for purely sensory relapses\n• Many mild relapses resolve spontaneously\n• Close neurology follow-up within 1-2 weeks\n\n**2. Outpatient Steroids:**\n• If patient prefers treatment or symptoms bothersome\n• Oral methylprednisolone 1250 mg daily × 3 days (COPOUSEP trial showed non-inferiority to IV)\n\n**Discharge Criteria:**\n• Mild symptoms not affecting ADLs\n• Safe home environment\n• Able to take oral medications\n• Reliable follow-up arranged\n• Return precautions understood\n\n**Return Precautions:**\n• Worsening symptoms\n• New weakness or numbness\n• Vision changes\n• Bladder dysfunction\n• Difficulty walking [6][7]',
    citation: [6, 7],
    treatment: {
      firstLine: {
        drug: 'Methylprednisolone (oral)',
        dose: '1250 mg',
        route: 'PO',
        frequency: 'Daily',
        duration: '3 days',
        notes: 'Non-inferior to IV per COPOUSEP trial. Take with food. No taper needed for short course.',
        confidence: 'standard',
      },
      monitoring: 'Blood glucose if diabetic. Watch for insomnia, mood changes.',
    },
    next: 'ms-disposition',
    summary: 'Sensory may observe — oral methylpred option',
    skippable: true,
  },

  {
    id: 'ms-steroid-protocol',
    type: 'info',
    module: 3,
    title: 'High-Dose Steroid Protocol',
    body: '**Standard IV Methylprednisolone Protocol:**\n\n**Dosing:**\n• [Methylprednisolone](#/drug/methylprednisolone/ms-relapse) **1000 mg IV daily × 3-5 days**\n• Infuse over 1-2 hours\n• No taper required for short courses\n\n**Optional oral taper:**\n• Prednisone 1 mg/kg/day × 11 days, then 4-day taper\n• Not clearly beneficial; often omitted\n\n**Oral Alternative (COPOUSEP Trial):**\n• Methylprednisolone **1250 mg PO daily × 3 days**\n• Non-inferior to IV in RCT\n• Useful when IV access problematic or outpatient preferred\n\n**Evidence:**\n• Shortens relapse duration by ~13 days on average\n• Does NOT improve long-term disability outcomes\n• Does NOT prevent future relapses\n• Works best when started <14 days from relapse onset\n\n**Pre-Treatment Checklist:**\n• Check glucose (especially diabetics)\n• Screen for active infection\n• Review psych history\n• GI ulcer history (consider PPI) [6][7]',
    citation: [6, 7],
    treatment: {
      firstLine: {
        drug: 'Methylprednisolone',
        dose: '1000 mg',
        route: 'IV',
        frequency: 'Daily',
        duration: '3-5 days',
        notes: 'Infuse over 1-2 hours. No taper required. Monitor glucose.',
        confidence: 'standard',
      },
      monitoring: 'Blood glucose BID-TID. Mood/sleep monitoring. GI symptoms.',
    },
    next: 'ms-steroid-precautions',
    summary: 'IV methylpred 1000mg 3-5d — speeds recovery not prevention',
  },

  {
    id: 'ms-steroid-precautions',
    type: 'info',
    module: 3,
    title: 'Steroid Precautions & Side Effects',
    body: '**Contraindications/Cautions:**\n\n**Relative Contraindications:**\n• Uncontrolled diabetes (may still use with glucose monitoring)\n• Active infection (treat infection first)\n• Psychiatric history (steroids can trigger psychosis/mania)\n• GI ulcer disease (add PPI)\n• Uncontrolled hypertension\n\n**Common Side Effects (short-term):**\n• Insomnia (very common)\n• Hyperglycemia\n• Mood changes (euphoria, irritability, anxiety)\n• Metallic taste during infusion\n• Facial flushing\n• Fluid retention\n\n**Serious Side Effects (rare with short course):**\n• Psychosis\n• Avascular necrosis (with repeated courses)\n• Infection\n\n**Management Tips:**\n• Give morning dose to minimize insomnia\n• Check fingerstick glucose BID-TID\n• Sliding scale insulin PRN\n• PPI if GI risk factors\n• Warn patient about mood/sleep effects',
    next: 'ms-steroid-response',
    summary: 'Glucose, infection screen, psych — morning dosing',
    skippable: true,
  },

  {
    id: 'ms-severe-relapse',
    type: 'info',
    module: 3,
    title: 'Severe MS Relapse',
    body: '**Severe Relapse Management:**\n\n**Admission Criteria:**\n• Unable to ambulate safely\n• Bladder retention (check PVR, Foley PRN)\n• Brainstem involvement (dysphagia, respiratory)\n• Severe visual loss\n• Concern for cord compression\n• Unable to care for self\n\n**Treatment:**\n1. **IV Methylprednisolone 1000 mg daily × 5 days**\n2. MRI brain ± spine (if not recent)\n3. Neurology consult\n4. PT/OT evaluation\n5. Monitor for complications\n\n**If Steroid-Refractory:**\nConsider **plasmapheresis (PLEX)** if no improvement after 3-5 days of IV steroids.\n\n**ICU Considerations:**\n• Brainstem lesions with dysphagia → aspiration risk\n• High cervical lesions → respiratory monitoring\n• Severe bulbar symptoms → airway protection [6][8]',
    citation: [6, 8],
    next: 'ms-plex',
    summary: 'Admit: no ambulate, bladder, brainstem — 5d then PLEX',
  },

  {
    id: 'ms-steroid-response',
    type: 'question',
    module: 3,
    title: 'Response to Steroids',
    body: '**Typical Steroid Response:**\n\n• Improvement usually begins within 3-5 days\n• Maximum benefit by 2-3 weeks\n• Some patients continue to improve for months\n\n**No Response After 3-5 Days?**\n• Consider alternative diagnosis\n• Consider plasmapheresis\n• Ensure no underlying infection\n\nWhat is the response to steroid therapy?',
    options: [
      { label: 'Improving', description: 'Clinical improvement after steroids', next: 'ms-disposition' },
      { label: 'No improvement / refractory', description: 'Persistent deficits despite 3-5 days steroids', next: 'ms-plex' },
      { label: 'Worsening', description: 'Getting worse despite treatment', next: 'ms-plex' },
    ],
    summary: '3-5d improvement, max 2-3wk — no response = PLEX',
  },

  {
    id: 'ms-plex',
    type: 'info',
    module: 3,
    title: 'Plasmapheresis (PLEX)',
    body: '**Plasmapheresis for MS Relapse:**\n\n**Indications:**\n• Steroid-refractory relapse (no improvement after 3-5 days IV methylprednisolone)\n• Severe/fulminant relapse\n• Contraindication to high-dose steroids\n\n**Protocol:**\n• 5-7 exchanges over 10-14 days\n• 1-1.5 plasma volumes per exchange\n• Albumin or FFP as replacement fluid\n\n**Evidence:**\n• AAN 2011: "Probably effective" for steroid-refractory relapses (Level B)\n• Response rates: 40-90%\n• Better outcomes with earlier initiation\n\n**Predictors of PLEX Response:**\n• Younger age\n• Female sex\n• Earlier initiation\n• Preserved reflexes\n• Less severe at baseline\n\n**Logistics:**\n• Requires vascular access (central line or large-bore PIV)\n• Usually inpatient\n• Neurology + apheresis/hematology consultation [8]',
    citation: [8],
    next: 'ms-disposition',
    summary: '5-7 exchanges refractory — earlier = better',
    skippable: true,
  },

  // =====================================================================
  // MODULE 4: OPTIC NEURITIS
  // =====================================================================

  {
    id: 'ms-on-start',
    type: 'info',
    module: 4,
    title: 'Optic Neuritis — Evaluation',
    body: '**Classic Optic Neuritis Presentation:**\n\n**Triad:**\n1. **Painful vision loss** — pain with eye movement (90%)\n2. **RAPD** (relative afferent pupillary defect) — Marcus Gunn pupil\n3. **Dyschromatopsia** — red desaturation, color vision deficits\n\n**Other Features:**\n• Usually **unilateral**\n• Vision loss develops over hours to days\n• Visual acuity ranges from 20/20 to NLP\n• Central scotoma most common visual field defect\n• **Optic disc:** Normal (65%) or swollen (35%)\n• Phosphenes (flashing lights with eye movement)\n\n**ED Eye Exam:**\n• Visual acuity each eye (with correction)\n• Color vision (red desaturation test)\n• Visual fields (confrontation)\n• Pupil exam (RAPD — swinging flashlight test)\n• Fundoscopy (optic disc appearance) [9][10]',
    citation: [9, 10],
    calculatorLinks: [
      { id: 'ms-ontt-risk', label: 'ON → MS Risk' },
    ],
    next: 'ms-on-workup',
    summary: 'Painful vision + RAPD + dyschromatopsia — check color/pupils',
  },

  {
    id: 'ms-on-workup',
    type: 'info',
    module: 4,
    title: 'Optic Neuritis — Workup',
    body: '**ED Workup for Optic Neuritis:**\n\n**1. MRI Brain with and without Gadolinium:**\n• Evaluate for demyelinating lesions\n• Optic nerve enhancement\n• Predicts MS conversion risk\n\n**MRI Findings and MS Risk (ONTT 15-year follow-up):**\n\n| Baseline Brain MRI | 15-Year MS Risk |\n|-------------------|-----------------|\n| Normal (0 lesions) | **25%** |\n| ≥1 lesion | **72%** |\n\n**2. Additional Studies (based on presentation):**\n• AQP4 antibody (NMO workup)\n• MOG antibody\n• LP if atypical features\n• ESR, ANA, ACE (if atypical)\n\n**Features Suggesting Alternative Diagnosis:**\n• Bilateral simultaneous\n• No pain\n• Severe disc edema with hemorrhages\n• No recovery after 4 weeks\n• Progression beyond 2 weeks\n• Age >50 or <15 [9][10]',
    citation: [9, 10],
    next: 'ms-on-treatment',
    summary: 'MRI >=1 lesion = 72% MS risk vs 25% normal',
  },

  {
    id: 'ms-on-treatment',
    type: 'info',
    module: 4,
    title: 'Optic Neuritis — Treatment',
    body: '**ONTT Trial Protocol:**\n\n**IV Steroids:**\n• [Methylprednisolone](#/drug/methylprednisolone/optic-neuritis) **250 mg IV q6h × 3 days** (1000 mg/day)\n• THEN: Oral prednisone 1 mg/kg/day × 11 days\n• THEN: 4-day taper\n\n**ONTT Key Findings:**\n• IV steroids **speed visual recovery** but do NOT improve final visual outcome\n• **95% achieve 20/40 or better** regardless of treatment\n• IV steroids temporarily reduced MS conversion at 2 years (but not 3 years)\n\n⚠️ **CRITICAL: ORAL PREDNISONE ALONE IS CONTRAINDICATED**\n• ONTT showed oral prednisone alone **DOUBLED** the recurrence risk\n• If treating, must use IV steroids first or not at all\n\n**Treatment Decision:**\n• **Mild symptoms, good acuity:** Can observe without treatment\n• **Significant vision loss or desire for faster recovery:** IV steroids\n• **NEVER oral prednisone monotherapy** [9][10]',
    citation: [9, 10],
    treatment: {
      firstLine: {
        drug: 'Methylprednisolone',
        dose: '250 mg',
        route: 'IV',
        frequency: 'q6h',
        duration: '3 days, then oral prednisone 1 mg/kg/day × 11 days with taper',
        notes: 'NEVER use oral prednisone alone (doubles recurrence risk per ONTT). Speeds recovery but does not change final visual outcome.',
        confidence: 'standard',
      },
      monitoring: 'Visual acuity daily during treatment. Blood glucose monitoring (steroid-induced hyperglycemia). Ophthalmology follow-up within 24-48h, neurology within 1-2 weeks.',
    },
    next: 'ms-on-disposition',
    summary: 'NEVER oral pred ALONE — doubles recurrence per ONTT',
    safetyLevel: 'critical',
  },

  {
    id: 'ms-on-disposition',
    type: 'info',
    module: 4,
    title: 'Optic Neuritis — Disposition',
    body: '**Disposition:**\n\n**Admit if:**\n• Severe vision loss (NLP or light perception only)\n• Bilateral optic neuritis (atypical — consider NMO)\n• Concern for alternative diagnosis\n• Unable to arrange outpatient IV steroids\n• New MS diagnosis requiring workup\n\n**Discharge with Close Follow-up if:**\n• Typical presentation\n• Mild-moderate vision loss\n• Can receive outpatient IV steroids (infusion center)\n• Reliable follow-up with ophthalmology AND neurology\n\n**Consultations:**\n• **Ophthalmology** — urgent (within 24-48h)\n• **Neurology** — within 1-2 weeks for MS workup\n\n**Prognosis:**\n• Visual recovery typically begins within 2-3 weeks\n• Maximum recovery by 6-12 months\n• 95% achieve 20/40 or better\n• Recurrence in same or other eye: 28% at 5 years',
    next: 'ms-disposition',
    summary: 'Admit severe/bilateral — outpatient IV if typical',
  },

  // =====================================================================
  // MODULE 5: TRANSVERSE MYELITIS
  // =====================================================================

  {
    id: 'ms-tm-start',
    type: 'info',
    module: 5,
    title: 'Transverse Myelitis — Evaluation',
    body: '⚠️ **EMERGENT MRI SPINE REQUIRED**\n\nMust rule out **cord compression** before treating.\n\n**Classic Presentation:**\n• **Sensory level** — numbness/tingling below dermatomal level\n• **Weakness** — paraparesis or paraplegia\n• **Bladder dysfunction** — retention or incontinence\n• **Back pain** at level of lesion\n• Develops over hours to days\n\n**Exam Findings:**\n• Bilateral (often asymmetric) weakness\n• Hyperreflexia below lesion (may be areflexia initially = spinal shock)\n• Sensory level to pinprick/temperature\n• Positive Babinski\n• Check post-void residual (bladder scan)\n\n**Differential Diagnosis:**\n• **Cord compression** (tumor, abscess, hematoma)\n• **MS** (partial myelitis, <2 segments)\n• **NMOSD** (longitudinally extensive, ≥3 segments)\n• **ADEM** (post-infectious, children)\n• **MOG-antibody disease**\n• **Infarct** (anterior spinal artery)\n• **Infectious** (viral, bacterial, TB) [11][12]',
    citation: [11, 12],
    next: 'ms-tm-mri',
    summary: 'EMERGENT MRI spine — exclude compression before treating',
    safetyLevel: 'critical',
  },

  {
    id: 'ms-tm-mri',
    type: 'info',
    module: 5,
    title: 'Transverse Myelitis — MRI',
    body: '**STAT MRI Spine (entire spine) + Brain:**\n\n**Order:**\n• MRI cervical, thoracic, lumbar spine WITH gadolinium\n• MRI brain with gadolinium (evaluate for MS lesions)\n\n**MRI Findings Distinguish Causes:**\n\n| Condition | MRI Findings |\n|-----------|-------------|\n| **MS** | Partial myelitis (<2 segments), peripheral/asymmetric, brain lesions |\n| **NMOSD** | Longitudinally extensive (≥3 segments), central cord, AQP4+ |\n| **ADEM** | Diffuse, bilateral large lesions, children, monophasic |\n| **MOG-Ab** | Conus involvement, bilateral ON, longitudinal |\n| **Cord compression** | Mass effect, requires urgent surgery |\n| **Infarct** | Anterior 2/3 of cord, owl eyes on axial |\n\n**MS vs NMOSD is CRITICAL:**\nSome MS DMTs (interferon-beta, fingolimod) can **WORSEN** NMOSD. Do not start DMTs until diagnosis clarified. [11][12]',
    citation: [11, 12],
    next: 'ms-tm-workup',
    summary: 'MS <2seg, NMOSD >=3 longitudinal — critical distinction',
  },

  {
    id: 'ms-tm-workup',
    type: 'info',
    module: 5,
    title: 'Transverse Myelitis — Additional Workup',
    body: '**Laboratory Workup:**\n\n**Essential:**\n• AQP4 antibody (aquaporin-4, NMO-IgG)\n• MOG antibody\n• CBC, BMP, LFTs\n• B12, folate\n• HIV, RPR\n• ESR, CRP\n\n**Lumbar Puncture:**\n• Cell count with differential\n• Protein, glucose\n• Oligoclonal bands, IgG index\n• Cytology if concern for malignancy\n• Viral PCR panel if infectious concern\n\n**CSF Patterns:**\n\n| Condition | CSF Profile |\n|-----------|------------|\n| **MS** | OCBs present, mild pleocytosis (<50), mildly elevated protein |\n| **NMOSD** | Often no OCBs, can have high pleocytosis (>50), elevated protein |\n| **Infectious** | Pleocytosis, may have low glucose |\n| **GBS** | Albuminocytologic dissociation (high protein, normal cells) |',
    next: 'ms-tm-treatment',
    summary: 'AQP4 MOG antibodies — determines safe DMT choices',
  },

  {
    id: 'ms-tm-treatment',
    type: 'info',
    module: 5,
    title: 'Transverse Myelitis — Treatment',
    body: '**Initial Treatment (after excluding cord compression):**\n\n**High-Dose IV Steroids:**\n• [Methylprednisolone](#/drug/methylprednisolone/transverse-myelitis) **1000 mg IV daily × 3-5 days**\n\n**If Steroid-Refractory or Severe:**\n• **Plasmapheresis** — 5-7 exchanges\n• Earlier initiation = better outcomes\n\n**If NMOSD Suspected:**\n• Steroids + PLEX often combined\n• Avoid interferon-beta, fingolimod (can worsen)\n• Neurology/neuroimmunology consult essential\n\n**Supportive Care:**\n• Bladder management (Foley if retention)\n• DVT prophylaxis\n• Pain management\n• Early PT/OT\n• Respiratory monitoring if cervical lesion\n\n**Disposition:**\n• **Admit all patients** with acute transverse myelitis\n• Neurology consultation\n• Monitor for progression [11][12]',
    citation: [11, 12],
    treatment: {
      firstLine: {
        drug: 'Methylprednisolone',
        dose: '1000 mg',
        route: 'IV',
        frequency: 'Daily',
        duration: '3-5 days',
        notes: 'Start after MRI excludes cord compression. Add PLEX if refractory or NMOSD suspected.',
        confidence: 'standard',
      },
      monitoring: 'Neurological exam q4-6h for progression. Monitor respiratory function if cervical lesion. Serial bladder scans if retention concern.',
    },
    next: 'ms-nmosd-vs-ms',
    summary: 'Methylpred after MRI clear — PLEX if severe/refractory',
  },

  {
    id: 'ms-nmosd-vs-ms',
    type: 'info',
    module: 5,
    title: 'NMOSD vs MS — Critical Distinction',
    body: '**Why This Matters:**\n\nSome MS DMTs can **WORSEN** NMOSD:\n• Interferon-beta\n• Fingolimod\n• Natalizumab (uncertain)\n\n**Key Differentiating Features:**\n\n| Feature | MS | NMOSD |\n|---------|-----|-------|\n| Cord lesions | Short (<2 segments) | Long (≥3 segments) |\n| Cord location | Peripheral, asymmetric | Central cord |\n| Brain lesions | Periventricular | Less common, or in AQP4-rich areas |\n| Optic neuritis | Usually unilateral | Often bilateral, severe |\n| OCBs in CSF | Present (95%) | Often absent |\n| AQP4 antibody | Negative | Positive (70-80%) |\n| Recovery | Usually good | Often poor |\n\n**ED Action:**\n• Order AQP4 and MOG antibodies\n• Consult neurology before starting DMT\n• Steroids are safe for both conditions acutely\n• Document uncertainty in chart [13]',
    citation: [13],
    next: 'ms-disposition',
    summary: 'Interferon/fingolimod WORSEN NMOSD — clarify Dx first',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 6: COMPLICATIONS
  // =====================================================================

  {
    id: 'ms-complications-menu',
    type: 'question',
    module: 6,
    title: 'MS Complications',
    body: 'What complication is present?\n\nSelect the primary concern:',
    options: [
      { label: 'Infection / UTI', description: 'Most common trigger of pseudoexacerbation', next: 'ms-infection' },
      { label: 'Baclofen pump / withdrawal', description: 'Life-threatening if abrupt discontinuation', next: 'ms-baclofen-withdrawal', urgency: 'critical' },
      { label: 'Respiratory symptoms', description: 'Dyspnea, weakness, aspiration concern', next: 'ms-respiratory', urgency: 'critical' },
      { label: 'DMT side effects / PML concern', description: 'Natalizumab, fingolimod, other DMT issues', next: 'ms-dmt-menu' },
      { label: 'Spasticity / pain crisis', description: 'Severe spasms, neuropathic pain', next: 'ms-spasticity' },
    ],
    summary: 'UTI pseudo, baclofen withdrawal, resp failure, DMTs',
  },

  {
    id: 'ms-infection',
    type: 'info',
    module: 6,
    title: 'Infection in MS Patients',
    body: '**UTI is the #1 Cause of Pseudoexacerbation**\n\n**Why MS Patients are at Risk:**\n• Neurogenic bladder (retention, incomplete emptying)\n• Chronic catheterization\n• Immunosuppression from DMTs\n\n**ED Approach:**\n1. Check UA + urine culture in ALL MS patients with symptom worsening\n2. Treat UTI aggressively\n3. Reassess neuro status after fever resolves\n4. Only attribute to MS relapse if deficits persist 24-48h after infection treated\n\n**Lymphopenia Risk:**\nMany DMTs cause lymphopenia (fingolimod, dimethyl fumarate, cladribine, ocrelizumab).\n\n**If ALC <500:**\n• Increased infection risk\n• Lower threshold for broad-spectrum antibiotics\n• Consider opportunistic infections\n• Contact prescribing neurologist [5][14]',
    citation: [5, 14],
    next: 'ms-pseudo-management',
    summary: 'UTI #1 trigger — ALC <500 = broad abx',
  },

  {
    id: 'ms-baclofen-withdrawal',
    type: 'info',
    module: 6,
    title: 'Baclofen Withdrawal — EMERGENCY',
    body: '⚠️ **LIFE-THREATENING EMERGENCY**\n\n**Causes:**\n• Abrupt discontinuation of oral baclofen\n• Intrathecal pump malfunction/catheter issue\n• Empty pump reservoir\n• Medication error\n\n**Clinical Features:**\n• Severe rebound spasticity\n• **Hyperthermia** (can be >40°C)\n• Altered mental status, delirium\n• Tachycardia, hypertension or hypotension\n• **Seizures**\n• Rhabdomyolysis\n• Multi-organ failure\n\n**Mimics:** Sepsis, meningitis, NMS, malignant hyperthermia, autonomic dysreflexia\n\n**TREATMENT:**\n1. **Restore baclofen IMMEDIATELY**\n   • Oral: Resume or start 10-20 mg PO q8h\n   • IV: Not available in US; use oral/NG\n   • Intrathecal: Urgent neurosurgery consult\n2. **Benzodiazepines** (adjunct for spasticity/seizures)\n3. **ICU admission**\n4. Supportive: Cooling, IV fluids, monitoring\n5. If intrathecal pump: Evaluate for malfunction [15]',
    citation: [15],
    treatment: {
      firstLine: {
        drug: 'Baclofen',
        dose: '10-20 mg',
        route: 'PO/NG',
        frequency: 'q8h',
        duration: 'Ongoing — do not stop abruptly',
        notes: 'Restore baclofen IMMEDIATELY. Add benzodiazepines as adjunct. ICU admission required.',
        confidence: 'critical',
      },
      secondLine: {
        drug: 'Diazepam or Lorazepam',
        dose: 'Diazepam 5-10 mg IV or Lorazepam 2-4 mg IV',
        route: 'IV',
        frequency: 'q4-6h PRN',
        duration: 'Until spasticity controlled',
        notes: 'Adjunct for spasticity and seizure prevention.',
      },
      monitoring: 'ICU monitoring. Core temperature q1h. CPK q6h (rhabdomyolysis). Mental status checks. If intrathecal pump — neurosurgery consult for pump evaluation.',
    },
    next: 'ms-disposition',
    summary: 'Life-threatening: hyperthermia, rigidity — restore + ICU',
    safetyLevel: 'critical',
  },

  {
    id: 'ms-respiratory',
    type: 'info',
    module: 6,
    title: 'Respiratory Complications',
    body: '**Respiratory Failure in MS:**\n\nRare but serious — accounts for ~47% of MS deaths.\n\n**Causes:**\n• Acute brainstem demyelinating plaque\n• High cervical cord lesion (C3-C5 = phrenic nerve)\n• Diaphragmatic weakness\n• Aspiration (bulbar dysfunction)\n• Central sleep apnea (brainstem lesions)\n\n**Clinical Features:**\n• Rapid shallow breathing\n• Abdominal paradox (paradoxical inward movement on inspiration)\n• Dyspnea, orthopnea\n• Confusion (from hypercarbia)\n• Weak cough\n\n**ED Management:**\n1. ABG — look for hypercarbia\n2. Bedside spirometry if available (FVC <20 mL/kg = concerning)\n3. **Low threshold for intubation** if respiratory muscle weakness\n4. High-dose IV methylprednisolone\n5. Consider plasmapheresis for fulminant cases\n6. **ICU admission**\n7. Neurology and pulmonology consult [16]',
    citation: [16],
    next: 'ms-disposition',
    summary: 'Brainstem/cervical = resp failure — low intubation threshold',
    safetyLevel: 'critical',
  },

  {
    id: 'ms-spasticity',
    type: 'info',
    module: 6,
    title: 'Spasticity / Pain Crisis',
    body: '**Spasticity Management:**\n\n**Acute Management:**\n• **Baclofen** 5-10 mg PO TID (start low, titrate)\n• **Tizanidine** 2-4 mg PO TID (watch for hypotension, sedation)\n• [Diazepam](#/drug/diazepam/spasticity) 2-5 mg PO/IV TID (for acute relief)\n\n**For Severe Spasticity Crisis:**\n• Benzodiazepines IV\n• Rule out baclofen withdrawal\n• Look for trigger (UTI, constipation, skin issue)\n• Neurology consult\n\n**Neuropathic Pain:**\n• Gabapentin 100-300 mg TID (titrate)\n• Pregabalin 50-75 mg BID (titrate)\n• TCAs (amitriptyline, nortriptyline)\n• Carbamazepine (for trigeminal neuralgia)\n\n**Paroxysmal Symptoms (brief, stereotyped):**\n• Tonic spasms, Lhermitte sign, paroxysmal dysarthria\n• Respond to carbamazepine or oxcarbazepine',
    next: 'ms-disposition',
    summary: 'Baclofen mainstay — NEVER stop abruptly',
  },

  // =====================================================================
  // MODULE 7: DMT SIDE EFFECTS
  // =====================================================================

  {
    id: 'ms-dmt-menu',
    type: 'question',
    module: 7,
    title: 'DMT Side Effects',
    body: '**Common DMTs and ED-Relevant Issues:**\n\n| DMT | Key ED Concern |\n|-----|----------------|\n| Natalizumab (Tysabri) | **PML**, infusion reactions |\n| Fingolimod (Gilenya) | First-dose bradycardia, lymphopenia |\n| Dimethyl fumarate (Tecfidera) | Lymphopenia → PML risk |\n| Ocrelizumab (Ocrevus) | Infusion reactions, infections |\n| Interferon-beta | Flu-like symptoms, depression |\n| Alemtuzumab (Lemtrada) | Autoimmune disorders (thyroid, ITP) |\n\nWhat is the concern?',
    options: [
      { label: 'PML concern (natalizumab or other)', description: 'Progressive deficits, not typical relapse pattern', next: 'ms-pml', urgency: 'critical' },
      { label: 'Fingolimod cardiac effects', description: 'Bradycardia, usually first dose', next: 'ms-fingolimod-cardiac' },
      { label: 'Infusion reaction', description: 'During or after DMT infusion', next: 'ms-infusion-reaction' },
      { label: 'Rebound after stopping DMT', description: 'Severe relapse after stopping fingolimod/natalizumab', next: 'ms-rebound' },
      { label: 'Other DMT concern', description: 'General DMT side effects', next: 'ms-dmt-general' },
    ],
    summary: 'PML natalizumab = urgent MRI + JCV PCR',
  },

  {
    id: 'ms-pml',
    type: 'info',
    module: 7,
    title: 'PML — Progressive Multifocal Leukoencephalopathy',
    body: '⚠️ **HOLD STEROIDS IF PML SUSPECTED**\n\n**What is PML?**\nFatal opportunistic brain infection caused by JC virus reactivation in immunocompromised patients.\n\n**Risk by DMT:**\n• **Natalizumab:** 1/100 to 1/1000 (HIGHEST risk)\n• Fingolimod: ~1/18,000\n• Dimethyl fumarate: ~1/50,000 (if prolonged lymphopenia)\n• Ocrelizumab: Rare case reports\n\n**Risk Factors (Natalizumab):**\n• JCV antibody positive (especially high index)\n• Prior immunosuppressant use\n• Duration >2 years\n\n**Clinical Presentation:**\n• Subacute neurological deficits (NOT like typical MS relapse)\n• **Progressive over weeks** (vs hours-days for relapse)\n• Cognitive decline, confusion\n• Visual field defects\n• Ataxia, hemiparesis\n• Seizures\n\n**ED Action:**\n1. **Do NOT give steroids** (can worsen PML)\n2. Urgent MRI brain\n3. LP for JCV PCR\n4. Neurology consult STAT\n5. Stop DMT [17]',
    citation: [17],
    next: 'ms-disposition',
    summary: 'Progressive unlike relapse — hold steroids, MRI+JCV stat',
    safetyLevel: 'critical',
  },

  {
    id: 'ms-fingolimod-cardiac',
    type: 'info',
    module: 7,
    title: 'Fingolimod Cardiac Effects',
    body: '**Fingolimod First-Dose Bradycardia:**\n\n**Mechanism:**\nS1P receptor modulation causes transient bradycardia and AV block.\n\n**First-Dose Observation (FDO) Protocol:**\n• HR, BP monitoring hourly × 6 hours\n• ECG at baseline and 6 hours\n• Extended monitoring if:\n  - HR <45 bpm\n  - New AV block\n  - QTc prolongation\n\n**ED Presentation:**\n• Patient presents after first dose with symptomatic bradycardia\n• Dizziness, pre-syncope, syncope\n• Usually self-limiting\n\n**Treatment:**\n• Atropine for symptomatic bradycardia\n• Continuous monitoring\n• Rarely requires temporary pacing\n• Usually resolves within 24 hours\n\n**Note:** Can recur if fingolimod restarted after >14 days off therapy. [18]',
    citation: [18],
    next: 'ms-disposition',
  },

  {
    id: 'ms-infusion-reaction',
    type: 'info',
    module: 7,
    title: 'DMT Infusion Reactions',
    body: '**Infusion Reactions with Monoclonal Antibodies:**\n\n**Common with:** Natalizumab, Ocrelizumab, Alemtuzumab\n\n**Symptoms:**\n• Flushing, pruritus, urticaria\n• Throat tightness, dyspnea\n• Nausea, headache\n• Hypotension or hypertension\n• Fever, chills (especially ocrelizumab)\n\n**Anaphylaxis (rare but serious):**\n• Hypotension, bronchospasm, angioedema\n• More common with natalizumab\n\n**Treatment:**\n**Mild:**\n• Slow or pause infusion\n• Diphenhydramine 25-50 mg IV\n• Acetaminophen\n\n**Moderate:**\n• Stop infusion\n• Diphenhydramine + methylprednisolone 125 mg IV\n\n**Anaphylaxis:**\n• Stop infusion immediately\n• Epinephrine 0.3-0.5 mg IM\n• IV fluids, airway management\n• Do NOT rechallenge',
    next: 'ms-disposition',
  },

  {
    id: 'ms-rebound',
    type: 'info',
    module: 7,
    title: 'Rebound Disease Activity',
    body: '**Rebound After Stopping Fingolimod or Natalizumab:**\n\n**Risk:**\nStopping these DMTs can trigger severe rebound MS activity.\n\n**Timeline:**\n• Usually 2-6 months after discontinuation\n• Fingolimod: Rebound within 4-16 weeks\n• Natalizumab: Rebound within 3-6 months\n\n**Clinical Presentation:**\n• Severe, multi-focal relapses\n• Sometimes worse than pre-treatment baseline\n• Can be tumefactive (large, mass-like lesions)\n\n**ED Relevance:**\n• Ask about recent DMT changes in severe relapses\n• These patients need aggressive treatment\n• Neurology consult\n• May need PLEX\n\n**Prevention:**\nBridging to another DMT, rather than stopping without transition, reduces rebound risk.',
    next: 'ms-disposition',
  },

  {
    id: 'ms-dmt-general',
    type: 'info',
    module: 7,
    title: 'DMT Side Effects — General Reference',
    body: '**DMT Quick Reference:**\n\n| DMT | Route | ED-Relevant Side Effects |\n|-----|-------|--------------------------|\n| **Interferons** | IM/SC | Flu-like sx, injection site, depression |\n| **Glatiramer** | SC | Injection site, post-injection systemic reaction |\n| **Dimethyl fumarate** | Oral | GI upset, flushing, lymphopenia |\n| **Teriflunomide** | Oral | Hepatotoxicity, teratogenic |\n| **Fingolimod** | Oral | Bradycardia, macular edema, lymphopenia |\n| **Natalizumab** | IV | PML, infusion reactions, hepatotoxicity |\n| **Ocrelizumab** | IV | Infusion reactions, infections |\n| **Alemtuzumab** | IV | Autoimmune (thyroid, ITP, nephritis) |\n| **Cladribine** | Oral | Lymphopenia, herpes zoster |\n\n**General Principles:**\n• Check lymphocyte count in patients on lymphopenia-causing DMTs\n• Lower threshold for workup of opportunistic infections\n• Contact prescribing neurologist with concerns\n• Document DMT in chart',
    next: 'ms-disposition',
  },

  // =====================================================================
  // MODULE 8: SPECIAL POPULATIONS & DISPOSITION
  // =====================================================================

  {
    id: 'ms-pregnancy',
    type: 'info',
    module: 8,
    title: 'MS and Pregnancy',
    body: '**Relapse Risk Pattern:**\n\n| Period | Relapse Rate |\n|--------|-------------|\n| Pre-pregnancy | Baseline |\n| Pregnancy | **Decreased** (protective) |\n| 1st trimester | ↓↓ |\n| 3rd trimester | ↓↓↓ |\n| **Postpartum (0-3 mo)** | **↑↑ REBOUND** |\n\n**Key Points:**\n• Pregnancy is relatively protective\n• **Postpartum period is HIGH-RISK** (first 3 months)\n• ~37% relapse within 6 months postpartum\n• Exclusive breastfeeding may be protective\n\n**Treatment Considerations:**\n• Steroids: Category C but generally acceptable for severe relapses\n• MRI: Avoid gadolinium if possible; non-contrast OK\n• DMTs: Most stopped before conception\n  - Glatiramer: May continue\n  - Interferon-beta: Possibly safe\n  - Others: Stop before conception\n\n**Consult:**\n• Neurology + OB/maternal-fetal medicine [19]',
    citation: [19],
    next: 'ms-disposition',
    summary: 'Postpartum 3mo highest relapse — DMTs contraindicated',
  },

  {
    id: 'ms-mri-indications',
    type: 'info',
    module: 2,
    title: 'MRI Indications in MS',
    body: '**When to Order MRI in the ED:**\n\n**ALWAYS (emergent):**\n• Concern for cord compression\n• New sensory level or paraparesis\n• Rapidly progressive symptoms\n• Atypical presentation\n\n**Recommended:**\n• New-onset symptoms suspicious for MS\n• First relapse in >1 year\n• New neurological deficit not seen before\n• Before PLEX\n• Uncertainty about diagnosis\n\n**NOT Routinely Needed:**\n• Typical relapse in established MS patient\n• Similar symptoms to prior relapses\n• Pseudoexacerbation with clear trigger\n\n**MRI Protocol:**\n• Brain: T1, T2/FLAIR, DWI, gadolinium\n• Spine: If cord symptoms (entire spine)\n\n**MS-Specific Findings:**\n• Dawson fingers (periventricular lesions perpendicular to ventricles)\n• Ovoid lesions >3mm\n• Gadolinium enhancement = active inflammation\n• Black holes (T1 hypointense) = axonal loss',
    next: 'ms-known-assessment',
    summary: 'MRI before steroids if compression or alt Dx concern',
  },

  {
    id: 'ms-disposition',
    type: 'result',
    module: 8,
    title: 'MS Disposition',
    body: '**Admission Criteria:**\n• Severe functional impairment (unable to ambulate)\n• New diagnosis requiring workup\n• IV steroid therapy needed (if outpatient not available)\n• Brainstem involvement or respiratory concern\n• Bladder retention requiring catheterization\n• Cord symptoms requiring emergent MRI\n• Unable to exclude cord compression\n• Baclofen withdrawal or pump malfunction\n• Social factors preventing safe discharge\n\n**Discharge Criteria:**\n• Mild relapse with preserved function\n• Established diagnosis with typical pattern\n• Can receive oral steroids or outpatient IV\n• Safe home environment\n• Reliable follow-up arranged\n\n**Follow-up:**\n• Neurology: Within 1-2 weeks for relapse; urgent if new diagnosis\n• Ophthalmology: Within 24-48h for optic neuritis\n• PCP: Steroid side effect monitoring\n\n**Return Precautions:**\n• Worsening weakness or numbness\n• New vision changes\n• Difficulty walking or balance problems\n• Bladder dysfunction\n• Difficulty breathing or swallowing\n• High fever',
    recommendation: 'Disposition based on relapse severity, functional status, and ability to arrange outpatient treatment. All new MS diagnoses and severe relapses require admission. Mild relapses in established patients may be managed outpatient with close neurology follow-up.',
    summary: 'Admit: severe, cord, respiratory, baclofen withdrawal',
  },

];

export const MULTIPLE_SCLEROSIS_MODULE_LABELS = [
  'Presentation',
  'Assessment',
  'Acute Relapse',
  'Optic Neuritis',
  'Transverse Myelitis',
  'Complications',
  'DMT Issues',
  'Disposition',
];

export const MULTIPLE_SCLEROSIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Thompson AJ, et al. Diagnosis of multiple sclerosis: 2017 revisions of the McDonald criteria. Lancet Neurol. 2018;17(2):162-173.' },
  { num: 2, text: 'Filippi M, et al. Multiple sclerosis. Nat Rev Dis Primers. 2018;4(1):43.' },
  { num: 3, text: 'Miller DH, et al. Clinically isolated syndromes. Lancet Neurol. 2012;11(2):157-169.' },
  { num: 4, text: 'Panitch HS. Influence of infection on exacerbations of multiple sclerosis. Ann Neurol. 1994;36 Suppl:S25-8.' },
  { num: 5, text: 'Correale J, et al. Infections and multiple sclerosis. Mult Scler. 2017;23(2):169-176.' },
  { num: 6, text: 'Le Page E, et al. Oral versus intravenous high-dose methylprednisolone for treatment of relapses in patients with multiple sclerosis (COPOUSEP): a randomised, controlled, double-blind, non-inferiority trial. Lancet. 2015;386(9997):974-981.' },
  { num: 7, text: 'Berkovich R. Treatment of acute relapses in multiple sclerosis. Neurotherapeutics. 2013;10(1):97-105.' },
  { num: 8, text: 'Llufriu S, et al. Plasma exchange for acute attacks of CNS demyelination: predictors of improvement at 6 months. Neurology. 2009;73(12):949-953.' },
  { num: 9, text: 'Beck RW, et al. The Optic Neuritis Treatment Trial: three-year follow-up results. Arch Ophthalmol. 1995;113(2):136-137.' },
  { num: 10, text: 'Optic Neuritis Study Group. Visual function 15 years after optic neuritis. Ophthalmology. 2008;115(6):1079-1082.' },
  { num: 11, text: 'Transverse Myelitis Consortium Working Group. Proposed diagnostic criteria and nosology of acute transverse myelitis. Neurology. 2002;59(4):499-505.' },
  { num: 12, text: 'Beh SC, et al. Transverse myelitis. Neurol Clin. 2013;31(1):79-138.' },
  { num: 13, text: 'Wingerchuk DM, et al. International consensus diagnostic criteria for neuromyelitis optica spectrum disorders. Neurology. 2015;85(2):177-189.' },
  { num: 14, text: 'Wijnands JM, et al. Infection-related health care utilization among people with and without multiple sclerosis. Mult Scler. 2017;23(11):1506-1516.' },
  { num: 15, text: 'Coffey RJ, et al. Intrathecal baclofen withdrawal syndrome. Neuromodulation. 2002;5(2):111-114.' },
  { num: 16, text: 'Gosselink R, et al. Respiratory muscle weakness and respiratory muscle training in severely disabled multiple sclerosis patients. Arch Phys Med Rehabil. 2000;81(6):747-751.' },
  { num: 17, text: 'Berger JR, et al. PML diagnostic criteria: consensus statement from the AAN Neuroinfectious Disease Section. Neurology. 2013;80(15):1430-1438.' },
  { num: 18, text: 'Gold R, et al. Placebo-controlled phase 3 study of oral BG-12 for relapsing multiple sclerosis. N Engl J Med. 2012;367(12):1098-1107.' },
  { num: 19, text: 'Confavreux C, et al. Rate of pregnancy-related relapse in multiple sclerosis. N Engl J Med. 1998;339(5):285-291.' },
];
