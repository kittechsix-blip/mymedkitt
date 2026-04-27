// MedKitt — Brain Herniation Syndromes
// Emergency recognition and management of cerebral herniation
// Sources: Neurocritical Care Society 2020, LITFL, StatPearls, BTF Guidelines
// 6 modules: Recognition → Types → Imaging → Medical Management → Surgical → Monitoring
// ~22 nodes

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const BRAIN_HERNIATION_CRITICAL_ACTIONS = [
  { text: 'Anisocoria + altered consciousness = ASSUME HERNIATION — treat immediately, do not wait for CT', nodeId: 'hern-start' },
  { text: 'Mannitol 20% 1 g/kg IV over 15-20 min OR Hypertonic saline 3% 250 mL bolus — either is first-line', nodeId: 'hern-osmolar' },
  { text: 'Head of bed 30°, midline head position — simple interventions that reduce ICP', nodeId: 'hern-positioning' },
  { text: 'Hyperventilation to PaCO2 32-35 mmHg is TEMPORIZING ONLY — max 2 hours, causes ischemia if prolonged', nodeId: 'hern-hypervent' },
  { text: 'Midline shift >5 mm on CT = CALL NEUROSURGERY STAT — threshold for surgical evacuation', nodeId: 'hern-imaging' },
  { text: 'Cushing triad (HTN + bradycardia + irregular respirations) = IMMINENT HERNIATION — act NOW', nodeId: 'hern-cushing' },
] as const;

export const BRAIN_HERNIATION_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'hern-start',
    type: 'question',
    module: 1,
    title: 'Brain Herniation — Recognition',
    body: '**Herniation = brain tissue displacement through rigid intracranial compartments.**\n\n**Immediately Concerning Signs:**\n\n| Finding | Significance |\n|---------|-------------|\n| 👁️ **Anisocoria** | CN III compression (uncal herniation) |\n| 💪 **Posturing** | Brainstem involvement |\n| 📉 **Declining GCS** | Progressing herniation |\n| 🫀 **Cushing triad** | Imminent/active herniation |\n\n**Cushing Triad (late, ominous):**\n1. Hypertension (often SBP >200)\n2. Bradycardia\n3. Irregular respirations\n\n⚠️ **Do NOT wait for CT** if clinical signs present — start treatment immediately! [1][2]',
    options: [
      { label: 'Clinical herniation signs', description: 'Anisocoria, posturing, declining GCS, Cushing triad', next: 'hern-emergency', urgency: 'critical' },
      { label: 'CT shows mass effect', description: 'Midline shift, hematoma, edema on imaging', next: 'hern-imaging-findings' },
      { label: 'Review herniation types', description: 'Understand the different syndromes', next: 'hern-types' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'hern-icp', label: 'ICP Calc' },
    ],
    summary: 'Anisocoria + altered consciousness = assume herniation — treat before CT',
    safetyLevel: 'critical',
  },

  {
    id: 'hern-emergency',
    type: 'info',
    module: 1,
    title: '🚨 EMERGENCY — Treat Herniation NOW',
    body: '**Immediate Actions (parallel, not sequential):**\n\n**1. AIRWAY**\n• Intubate if GCS ≤8\n• Avoid hypoxia (SaO2 >95%)\n• Avoid hypotension during RSI\n\n**2. HYPEROSMOLAR THERAPY (choose one)**\n• [Mannitol 20%](#/drug/mannitol/herniation) **1 g/kg IV** over 15-20 min\n• [Hypertonic saline 3%](#/drug/hypertonic-saline/herniation) **250-500 mL IV** bolus\n\n**3. POSITIONING**\n• Head of bed **30 degrees**\n• Head **midline** (no rotation)\n• Loosen cervical collar if present\n\n**4. HYPERVENTILATION (temporizing)**\n• Target PaCO2 **32-35 mmHg**\n• **Maximum 2 hours** — causes ischemia if prolonged\n• Bridge to definitive therapy only\n\n**5. CALL NEUROSURGERY STAT**\n• While doing above interventions\n• Prep for emergent CT and possible OR\n\n**6. BLOOD PRESSURE**\n• Target SBP >100-110 mmHg\n• Avoid hypotension aggressively [1][3][4]',
    citation: [1, 3, 4],
    next: 'hern-osmolar',
    summary: 'Parallel: intubate, osmolar therapy, HOB 30, hyperventilate, call neurosurgery',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 2: TYPES OF HERNIATION
  // =====================================================================

  {
    id: 'hern-types',
    type: 'question',
    module: 2,
    title: 'Herniation Syndromes — Types',
    body: '**Five Major Types:**\n\n| Type | Mechanism | Key Finding |\n|------|-----------|-------------|\n| **Uncal** | Temporal lobe → tentorial notch | Ipsilateral pupil dilation |\n| **Central** | Bilateral → diencephalon descent | Bilateral small pupils |\n| **Subfalcine** | Cingulate → under falx | Often precedes others |\n| **Tonsillar** | Cerebellum → foramen magnum | Cushing triad |\n| **Upward** | Posterior fossa → upward | Altered consciousness |\n\n**Most Common in Trauma:**\n• Uncal (epidural/subdural hematoma)\n• Central (diffuse cerebral edema)\n\n**Most Rapidly Fatal:**\n• Tonsillar (medullary compression)',
    options: [
      { label: 'Uncal herniation', description: 'Ipsilateral dilated pupil, "down and out" eye', next: 'hern-uncal' },
      { label: 'Central herniation', description: 'Bilateral small pupils, symmetric posturing', next: 'hern-central' },
      { label: 'Tonsillar herniation', description: 'Cushing triad, respiratory failure', next: 'hern-tonsillar' },
      { label: 'Proceed to management', description: 'Skip to treatment', next: 'hern-osmolar' },
    ],
    citation: [1, 2],
    summary: 'Five herniation types — uncal most common trauma, tonsillar most fatal',
    skippable: true,
  },

  {
    id: 'hern-uncal',
    type: 'info',
    module: 2,
    title: 'Uncal Herniation',
    body: '**Most Common Herniation Type**\n\n**Mechanism:**\n• Temporal lobe uncus herniates through tentorial notch\n• Compresses CN III and midbrain\n\n**Classic Progression:**\n\n**Stage 1 — Early:**\n• Ipsilateral pupil dilation (CN III compression)\n• May be subtle initially\n• Consciousness may be preserved\n\n**Stage 2 — Progressive:**\n• Pupil becomes fixed and dilated\n• "Down and out" eye position\n• Ptosis\n• Contralateral hemiparesis\n\n**Stage 3 — Late:**\n• Bilateral pupil dilation\n• Decerebrate posturing\n• Loss of consciousness\n• Respiratory failure\n\n**Kernohan Notch Phenomenon:**\n• Ipsilateral hemiparesis (false localizing sign)\n• Contralateral cerebral peduncle compressed against opposite tentorial edge\n\n**Common Causes:**\n• Epidural hematoma\n• Subdural hematoma\n• Temporal lobe mass/hemorrhage [1][2]',
    citation: [1, 2],
    next: 'hern-osmolar',
    summary: 'Ipsilateral dilated pupil to bilateral — Kernohan notch false localizing',
    skippable: true,
  },

  {
    id: 'hern-central',
    type: 'info',
    module: 2,
    title: 'Central (Transtentorial) Herniation',
    body: '**Bilateral Descent Through Tentorial Notch**\n\n**Mechanism:**\n• Diffuse bilateral cerebral edema\n• Bilateral mass effect\n• Diencephalon/midbrain descends centrally\n\n**Classic Progression:**\n\n**Early (Diencephalic):**\n• Altered consciousness\n• Small, reactive pupils (bilateral)\n• Cheyne-Stokes respirations\n• Decorticate posturing\n\n**Late (Midbrain/Pons):**\n• Midposition, fixed pupils\n• Decerebrate posturing\n• Central neurogenic hyperventilation\n\n**Terminal (Medullary):**\n• Dilated, fixed pupils\n• Flaccid paralysis\n• Ataxic/agonal respirations\n• Cardiovascular collapse\n\n**Duret Hemorrhage:**\n• Pontine artery rupture from downward pressure\n• Usually fatal\n• Appears as midbrain/pons hemorrhage on CT\n\n**Common Causes:**\n• Diffuse cerebral edema\n• Large frontal/parietal masses\n• Hydrocephalus [1][2]',
    citation: [1, 2],
    next: 'hern-osmolar',
    summary: 'Bilateral small pupils then midposition fixed — Duret hemorrhage fatal',
    skippable: true,
  },

  {
    id: 'hern-tonsillar',
    type: 'info',
    module: 2,
    title: 'Tonsillar (Foramen Magnum) Herniation',
    body: '**Cerebellar Tonsils Through Foramen Magnum**\n\n**Mechanism:**\n• Posterior fossa mass or edema\n• Cerebellar tonsils compress medulla\n• CSF outflow obstruction\n\n**Clinical Features:**\n\n**Early:**\n• Severe headache\n• Neck stiffness/pain\n• Head tilt\n• Vomiting\n\n**Progressive:**\n• **Cushing Triad:**\n  - Hypertension (often severe, SBP >200)\n  - Bradycardia\n  - Irregular respirations\n• Altered consciousness\n• Lower cranial nerve palsies\n\n**Late:**\n• Flaccid quadriplegia\n• Respiratory arrest\n• Cardiac arrest\n\n⚠️ **Most Rapidly Fatal Herniation**\n• Medullary compression = respiratory/cardiac failure\n• Requires immediate intervention\n\n**Common Causes:**\n• Cerebellar hemorrhage\n• Cerebellar infarction with edema\n• Posterior fossa tumor\n• Chiari malformation (acute decompensation) [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'hern-cushing', label: 'Cushing Check' },
    ],
    next: 'hern-osmolar',
    summary: 'Cushing triad = imminent medullary compression — HTN + brady + irregular resp',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 3: IMAGING
  // =====================================================================

  {
    id: 'hern-imaging',
    type: 'info',
    module: 3,
    title: 'CT Imaging — Critical Findings',
    body: '**Non-contrast CT Head is First-Line**\n\n**Midline Shift (MLS):**\n\n| Shift | Significance |\n|-------|-------------|\n| 0-3 mm | Normal/minimal |\n| 3-5 mm | Concerning — close monitoring |\n| **>5 mm** | **CRITICAL — emergent neurosurgery** |\n| >11 mm (at IVF) | Strongest predictor of herniation (OR 10) |\n\n**Other Critical CT Signs:**\n\n| Finding | Implication |\n|---------|-------------|\n| Basal cistern effacement | ICP critically elevated |\n| Hematoma >60 mL | High herniation risk |\n| Hydrocephalus | May need emergent EVD |\n| Sulcal effacement | Diffuse edema |\n| Uncal displacement | Active uncal herniation |\n| Tonsils below FM | Tonsillar herniation |\n| Duret hemorrhage | Often fatal — midbrain bleed |\n\n**Caveat:** ~1 in 1500 neurologically normal patients have imaging signs of herniation. Always correlate with clinical exam! [5][6]',
    citation: [5, 6],
    next: 'hern-imaging-findings',
    summary: 'Midline shift >5mm CT = neurosurgery stat for emergent evacuation',
    skippable: true,
    safetyLevel: 'critical',
  },

  {
    id: 'hern-imaging-findings',
    type: 'question',
    module: 3,
    title: 'CT Findings — Decision Point',
    body: '**Based on CT results:**\n\n**Emergent Surgical Indications:**\n• Midline shift >5 mm\n• Epidural hematoma with mass effect\n• Subdural hematoma >10 mm thick or MLS >5 mm\n• Cerebellar hemorrhage >3 cm or with hydrocephalus\n• Obstructive hydrocephalus\n\n**Medical Management + Monitoring:**\n• Mass effect without surgical lesion\n• Diffuse edema\n• Small hematomas\n• Contusions without significant mass effect',
    options: [
      { label: 'Surgical lesion', description: 'MLS >5mm, large hematoma, obstructive hydrocephalus', next: 'hern-surgery', urgency: 'critical' },
      { label: 'Mass effect, no surgical lesion', description: 'Edema, contusions, small hematoma', next: 'hern-osmolar' },
      { label: 'Minimal/no mass effect', description: 'Reassuring CT', next: 'hern-monitoring' },
    ],
    citation: [5, 6],
    summary: 'CT surgical vs medical — MLS >5mm or hematoma >60mL needs OR',
  },

  // =====================================================================
  // MODULE 4: MEDICAL MANAGEMENT
  // =====================================================================

  {
    id: 'hern-osmolar',
    type: 'question',
    module: 4,
    title: 'Hyperosmolar Therapy — First-Line',
    body: '**Choose ONE — Both Are Effective:**\n\n**[Mannitol 20%](#/drug/mannitol/herniation)**\n• Dose: **0.5-1 g/kg IV** over 15-20 min\n• Onset: 15-30 minutes\n• Duration: ~90 minutes\n• Max serum osmolarity: 320 mOsm/L\n• ⚠️ Diuretic effect — can drop BP\n\n**[Hypertonic Saline 3%](#/drug/hypertonic-saline/herniation)**\n• Dose: **250-500 mL** (or 2-5 mL/kg) IV bolus\n• Onset: 10-20 minutes\n• Duration: 60+ minutes (more sustained than mannitol)\n• May be preferred if hypotensive\n• Less rebound edema\n\n**Which to Choose?**\n\n| Prefer Mannitol | Prefer HTS |\n|-----------------|------------|\n| Euvolemic patient | Hypotensive |\n| No hypernatremia | Need sustained effect |\n| Renal function OK | Renal concerns |',
    options: [
      { label: 'Give Mannitol', description: '20% Mannitol 1 g/kg IV', next: 'hern-mannitol' },
      { label: 'Give Hypertonic Saline', description: '3% HTS 250-500 mL IV', next: 'hern-hts' },
      { label: 'Already given — next steps', description: 'Positioning, hyperventilation, surgery', next: 'hern-positioning' },
    ],
    citation: [3, 4],
    calculatorLinks: [
      { id: 'hern-mannitol-dose', label: 'Mannitol Dose' },
      { id: 'hern-hts-dose', label: 'HTS Dose' },
    ],
    summary: 'Mannitol 1g/kg or 3% HTS 250mL — HTS preferred if hypotensive',
  },

  {
    id: 'hern-mannitol',
    type: 'result',
    module: 4,
    title: 'Mannitol 20% Administration',
    body: '**Dosing:**\n• **1 g/kg IV** over 15-20 minutes\n• Example: 70 kg patient → 350 mL of 20% mannitol\n• Can repeat 0.25-0.5 g/kg q6h as needed\n\n**Monitoring:**\n• Serum osmolarity (hold if >320 mOsm/L)\n• Urine output (expect diuresis)\n• Blood pressure (may drop)\n• Renal function\n\n**Onset:** 15-30 minutes\n**Peak effect:** 20-60 minutes\n**Duration:** ~90 minutes (variable)\n\n**Cautions:**\n• Avoid in hypovolemia — can worsen hypotension\n• Slower infusion (20 min) = less rebound edema\n• Nephrotoxic at high cumulative doses\n• May worsen rebound edema in traumatic BBB disruption\n\n**Reassess in 15-30 minutes:**\n• Pupil response\n• Motor exam\n• Vital signs\n\n[Drug details](#/drug/mannitol/herniation)',
    recommendation: 'Mannitol 20% 1 g/kg IV over 15-20 min. Monitor osmolarity, BP, urine output. Reassess pupils/motor in 15-30 min. May repeat 0.25-0.5 g/kg q6h.',
    citation: [3, 4],
    treatment: {
      firstLine: {
        drug: 'Mannitol 20%',
        dose: '1 g/kg (5 mL/kg)',
        route: 'IV',
        frequency: 'Over 15-20 minutes',
        duration: 'Single dose; may repeat q6h',
        notes: 'Max osmolarity 320. Expect diuresis. Hold if hypotensive.',
      },
      monitoring: 'Osmolarity q6h, urine output, BP, pupils/motor exam q15-30min. Hold if serum osm >320 mOsm/L.',
    },
    next: 'hern-positioning',
    summary: 'Mannitol 1g/kg IV 15-20min — hold if serum osm >320 or hypotensive',
  },

  {
    id: 'hern-hts',
    type: 'result',
    module: 4,
    title: 'Hypertonic Saline 3% Administration',
    body: '**Dosing Options:**\n• **3% NaCl: 250-500 mL** IV bolus (or 2-5 mL/kg)\n• **23.4% NaCl: 30 mL** via central line (more concentrated)\n\n**Monitoring:**\n• Serum sodium (goal 145-155 mEq/L for ICP control)\n• Central line for concentrations >3% (peripheral OK for 3%)\n• Avoid rapid correction if chronic hyponatremia\n\n**Onset:** 10-20 minutes\n**Duration:** 60+ minutes (more sustained than mannitol)\n\n**Advantages Over Mannitol:**\n• No diuretic effect — better for hypotensive patients\n• More sustained ICP reduction\n• Less rebound edema\n• Can repeat without cumulative toxicity\n\n**Cautions:**\n• Monitor for central pontine myelinolysis (rare, chronic hyponatremia)\n• May cause hyperchloremic acidosis with repeated doses\n\n**Reassess in 15-30 minutes:**\n• Pupil response\n• Motor exam\n• Vital signs\n\n[Drug details](#/drug/hypertonic-saline/herniation)',
    recommendation: 'Hypertonic saline 3% 250-500 mL IV bolus. Target Na 145-155 for ICP control. Reassess pupils/motor in 15-30 min. May repeat.',
    citation: [3, 4],
    treatment: {
      firstLine: {
        drug: 'Hypertonic Saline 3%',
        dose: '250-500 mL (or 2-5 mL/kg)',
        route: 'IV',
        frequency: 'Bolus over 10-20 min',
        duration: 'Single dose; may repeat',
        notes: 'Target Na 145-155. Peripheral OK for 3%. Central line for 23.4%.',
      },
      monitoring: 'Serum Na q2-4h (target 145-155), pupils/motor exam q15-30min. Watch for hyperchloremic acidosis with repeated doses.',
    },
    next: 'hern-positioning',
    summary: '3% HTS 250-500mL bolus — target Na 145-155 for ICP control',
  },

  {
    id: 'hern-positioning',
    type: 'info',
    module: 4,
    title: 'Positioning & Basic Measures',
    body: '**Simple Interventions That Reduce ICP:**\n\n**Head Position:**\n• **Head of bed 30 degrees** — improves venous drainage\n• **Head midline** — avoid neck rotation (compresses jugular)\n• Loosen cervical collar if present (impedes venous outflow)\n\n**Oxygenation:**\n• Maintain **SaO2 >95%**\n• Target **PaO2 >80 mmHg**\n• Hypoxia worsens cerebral edema\n\n**Ventilation:**\n• **Normocapnia** (PaCO2 35-45) when stable\n• Hyperventilation only for acute herniation (see next)\n\n**Temperature:**\n• Treat fever aggressively\n• Target normothermia (36-37°C)\n• Hyperthermia increases metabolic demand\n\n**Sedation (if intubated):**\n• Adequate sedation/analgesia\n• Avoid coughing, straining\n• Consider paralysis if ICP refractory\n\n**Blood Pressure:**\n• Avoid hypotension\n• Target SBP >100-110 mmHg\n• CPP = MAP - ICP (goal CPP >60) [3][7]',
    citation: [3, 7],
    next: 'hern-hypervent',
    summary: 'HOB 30, head midline, loosen C-collar — simple interventions reduce ICP',
  },

  {
    id: 'hern-hypervent',
    type: 'info',
    module: 4,
    title: '⚠️ Hyperventilation — Use With Caution',
    body: '**TEMPORIZING MEASURE ONLY**\n\n**When to Use:**\n• Acute herniation with clinical signs\n• Bridge to surgery or osmolar therapy\n• Impending herniation despite other interventions\n\n**Target:**\n• **PaCO2 32-35 mmHg** (mild hypocapnia)\n• Do NOT go below 25 mmHg\n\n**Duration:**\n• **Maximum 2 hours**\n• Shorter is better\n\n**Why It\'s Dangerous Long-Term:**\n• Causes cerebral vasoconstriction\n• Reduces cerebral blood flow\n• Leads to cerebral **ischemia** if prolonged\n• Effect wanes as brain adapts (rebound ICP elevation)\n\n**When NOT to Use:**\n• Prophylactically\n• First 24 hours post-injury (unless herniation)\n• As primary/sustained therapy\n\n**Key Point:**\n• Hyperventilation is a **BRIDGE** — not a destination\n• Must be weaned once definitive therapy initiated [3][7][8]',
    citation: [3, 7, 8],
    next: 'hern-bp-targets',
    summary: 'PaCO2 32-35 BRIDGE ONLY max 2hrs — prolonged causes ischemia',
    safetyLevel: 'warning',
  },

  {
    id: 'hern-bp-targets',
    type: 'info',
    module: 4,
    title: 'Blood Pressure & CPP Targets',
    body: '**Avoid Hypotension — It Kills Brain Cells**\n\n**Emergency Phase (ED) Targets:**\n\n| Age | Minimum SBP |\n|-----|-------------|\n| 15-49 years | >110 mmHg |\n| 50-69 years | >100 mmHg |\n| >70 years | >110 mmHg |\n\n**ICU Phase (with ICP monitoring):**\n• Target **CPP 60-70 mmHg**\n• CPP = MAP - ICP\n• If ICP unknown, use MAP >80 mmHg\n\n**Why BP Matters:**\n• Single episode of SBP <90 = doubles mortality\n• Cerebral autoregulation impaired in TBI\n• Brain perfusion depends on adequate MAP\n\n**Vasopressors if Needed:**\n• [Norepinephrine](#/drug/norepinephrine/neuro) preferred\n• Avoid pure α-agonists if bradycardic\n• Target MAP, not just SBP\n\n**Caution:**\n• Don\'t overcorrect — HTN may be Cushing response\n• Treat underlying cause (herniation) rather than just lowering BP [7][9]',
    citation: [7, 9],
    next: 'hern-surgery',
    summary: 'Single SBP <90 doubles mortality — maintain MAP >80, CPP >60',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 5: SURGICAL MANAGEMENT
  // =====================================================================

  {
    id: 'hern-surgery',
    type: 'result',
    module: 5,
    title: 'Neurosurgical Intervention',
    body: '**CALL NEUROSURGERY STAT For:**\n\n**Imaging Indications:**\n• Midline shift >5 mm\n• Epidural hematoma with any mass effect\n• Subdural hematoma >10 mm or MLS >5 mm\n• Cerebellar hemorrhage >3 cm\n• Obstructive hydrocephalus (may need EVD)\n• Depressed skull fracture\n\n**Clinical Indications:**\n• Anisocoria + altered consciousness\n• Cushing triad\n• New/progressive posturing\n• Rapid neurological decline\n• GCS ≤8 with surgical lesion\n\n**Surgical Options:**\n\n| Procedure | Indication |\n|-----------|------------|\n| **Craniotomy** | Hematoma evacuation |\n| **EVD** | Hydrocephalus, ICP monitoring |\n| **Decompressive craniectomy** | Refractory ICP, malignant edema |\n\n**Decompressive Craniectomy Criteria:**\n• Refractory ICP >40 mmHg despite maximal medical therapy\n• Age <60 (better outcomes)\n• Within 24-48h of injury for best results\n• Team decision — reduces mortality but may not improve function [6][10]',
    recommendation: 'Emergent neurosurgery consultation. Prep for OR. Continue ICP management while awaiting surgery. EVD if hydrocephalus.',
    citation: [6, 10],
    summary: 'MLS >5mm, EDH mass effect, SDH >10mm, cerebellar >3cm = OR',
  },

  // =====================================================================
  // MODULE 6: MONITORING
  // =====================================================================

  {
    id: 'hern-monitoring',
    type: 'info',
    module: 6,
    title: 'ICP Monitoring Indications',
    body: '**When to Place ICP Monitor/EVD:**\n\n**GCS ≤8 + Abnormal CT:**\n• Hematoma, contusion, edema\n• Herniation signs\n• Basal cistern compression\n\n**GCS ≤8 + Normal CT if ≥2 of:**\n• Age >40 years\n• Motor posturing\n• SBP <90 mmHg\n\n**Other Indications:**\n• Hydrocephalus (EVD for drainage + monitoring)\n• SAH with poor grade\n• ICH with intraventricular extension\n• Post-craniotomy with swelling\n\n**Treatment Thresholds:**\n\n| ICP | Action |\n|-----|--------|\n| >20-22 mmHg | Initiate tier 1 therapy |\n| >25-30 mmHg | Escalate therapy |\n| >40 mmHg | Consider decompressive craniectomy |\n\n**CPP Goal:** >60 mmHg (60-70 optimal) [7][9]',
    citation: [7, 9],
    next: 'hern-reassess',
    summary: 'ICP monitor GCS <=8 + abnormal CT — treat >20-22, craniectomy >40',
  },

  {
    id: 'hern-reassess',
    type: 'info',
    module: 6,
    title: 'Reassessment Protocol',
    body: '**After Each Intervention, Reassess in 15-30 min:**\n\n**Pupillary Exam:**\n• Size, reactivity\n• Anisocoria improving or worsening?\n• Document with pupillometer if available\n\n**Motor Response:**\n• GCS motor component\n• Posturing type (decorticate → decerebrate = worsening)\n• Laterality changes\n\n**Vital Signs:**\n• BP trend (Cushing response?)\n• Heart rate\n• Respiratory pattern\n\n**ICP (if monitored):**\n• Absolute value\n• Trend\n• Waveform (A-waves = bad)\n• CPP calculation\n\n**Repeat Imaging If:**\n• Clinical deterioration\n• No improvement with treatment\n• New neurological findings\n• Pre-operative planning\n\n**Document Everything:**\n• Time of exam\n• Pupil size/reactivity\n• GCS breakdown\n• Interventions given and timing [1][7]',
    citation: [1, 7],
    next: 'hern-prognosis',
    summary: 'Pupils and motor q15-30min after each intervention — document trend',
    skippable: true,
  },

  {
    id: 'hern-prognosis',
    type: 'info',
    module: 6,
    title: 'Prognosis & Goals of Care',
    body: '**Poor Prognostic Signs:**\n• Bilateral fixed and dilated pupils\n• GCS 3 with loss of brainstem reflexes\n• Duret hemorrhage on CT\n• Age >65 with severe TBI\n• Refractory ICP despite maximal therapy\n\n**When to Discuss Goals:**\n• Persistent herniation despite treatment\n• Brainstem reflexes absent\n• Family present and stable\n\n**Brain Death Evaluation:**\n• Clinical exam for brainstem reflexes\n• Apnea test\n• Confirmatory testing if needed\n• Follow institutional protocol\n\n**Key Points:**\n• Early aggressive treatment = best chance\n• Age and initial GCS are strong predictors\n• Decompressive craniectomy saves lives but may not restore function\n• Family communication is critical\n• Involve palliative care early if prognosis poor [1][10]',
    citation: [1, 10],
    next: 'hern-start',
    summary: 'Bilateral fixed + GCS 3 + lost brainstem reflexes = poor prognosis',
    skippable: true,
  },

];

export const BRAIN_HERNIATION_MODULE_LABELS: string[] = [
  'Recognition',
  'Herniation Types',
  'Imaging',
  'Medical Management',
  'Surgical Management',
  'Monitoring & Prognosis',
];

export const BRAIN_HERNIATION_CITATIONS: Citation[] = [
  { num: 1, text: 'StatPearls. Brain Herniation. NCBI Bookshelf. 2024.' },
  { num: 2, text: 'LITFL. Brain Herniation. Critical Care Compendium. 2024.' },
  { num: 3, text: 'Cook AM, et al. Guidelines for the Acute Treatment of Cerebral Edema in Neurocritical Care Patients. Neurocrit Care. 2020;32(3):647-666.' },
  { num: 4, text: 'Shi J, et al. Hypertonic saline and mannitol in patients with traumatic brain injury: A systematic review and meta-analysis. Medicine. 2020;99(35):e21655.' },
  { num: 5, text: 'Johnson PL, et al. MDCT imaging of traumatic brain injury. AJR Am J Roentgenol. 2016;207(2):398-409.' },
  { num: 6, text: 'Carney N, et al. Guidelines for the Management of Severe Traumatic Brain Injury. Brain Trauma Foundation. 4th Ed. 2016.' },
  { num: 7, text: 'Stocchetti N, et al. Intracranial Pressure Monitoring and Treatment Thresholds. J Neurotrauma. 2023.' },
  { num: 8, text: 'Coles JP, et al. Hyperventilation therapy for control of posttraumatic intracranial hypertension. Crit Care Med. 2007;35(1):S589-S596.' },
  { num: 9, text: 'Donnelly J, et al. Cerebral perfusion pressure targets after traumatic brain injury: a reappraisal. Crit Care. 2025;29(1):82.' },
  { num: 10, text: 'Bor-Seng-Shu E, et al. Decompressive craniectomy in severe traumatic brain injury. J Clin Med. 2022;11(1):22.' },
];
