// MedKitt — Neurogenic Shock & Spinal Shock
// Comprehensive management of neurogenic shock (hemodynamic) and spinal shock (neurologic)
// Sources: EMCrit IBCC, WikEM, StatPearls, 2024 SCI Guidelines
// 7 modules: Recognition → Rule Out Hemorrhage → Fluid/Vasopressors → Bradycardia → MAP Goals → Spinal Shock → Disposition
// ~32 nodes

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const NEUROGENIC_SHOCK_CRITICAL_ACTIONS = [
  { text: 'Neurogenic shock is a DIAGNOSIS OF EXCLUSION — rule out hemorrhage FIRST', nodeId: 'neuro-shock-rule-out' },
  { text: 'Norepinephrine is FIRST-LINE — has both α and β activity for BP AND heart rate', nodeId: 'neuro-shock-vasopressors' },
  { text: 'AVOID phenylephrine monotherapy — pure α causes reflex bradycardia, worsens existing bradycardia', nodeId: 'neuro-shock-avoid-phenyl' },
  { text: 'MAP target 85-90 mmHg for 3-7 days — small differences (2-3 mmHg) correlate with neurologic outcomes', nodeId: 'neuro-shock-map-targets' },
  { text: 'Spinal shock ≠ neurogenic shock: spinal shock is areflexia (neurologic), neurogenic shock is hypotension (hemodynamic)', nodeId: 'spinal-shock-definition' },
] as const;

export const NEUROGENIC_SHOCK_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & DEFINITIONS
  // =====================================================================

  {
    id: 'neuro-shock-start',
    type: 'question',
    module: 1,
    title: 'Neurogenic Shock vs Spinal Shock',
    body: '**These are DIFFERENT entities that can coexist:**\n\n| Term | Type | Definition |\n|------|------|------------|\n| **Neurogenic Shock** | Hemodynamic | Distributive shock from loss of sympathetic tone |\n| **Spinal Shock** | Neurologic | Transient loss of all function below lesion |\n\n**Neurogenic Shock Classic Triad:**\n1. ❤️ **Hypotension** — peripheral vasodilation, ↓SVR\n2. 🫀 **Bradycardia** — unopposed vagal tone\n3. 🌡️ **Hypothermia** — loss of thermoregulation\n\n⚠️ **Requires lesion at T6 or ABOVE** — 90% of complete injuries above T6 develop neurogenic shock [1][2]',
    options: [
      { label: 'Hypotension + bradycardia in spinal injury', description: 'Suspected neurogenic shock', next: 'neuro-shock-rule-out', urgency: 'critical' },
      { label: 'Flaccid paralysis + areflexia', description: 'Spinal shock (neurologic)', next: 'spinal-shock-definition' },
      { label: 'Review pathophysiology', description: 'Understanding the mechanisms', next: 'neuro-shock-patho' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'neuro-shock-ddx', label: 'Shock DDx' },
    ],
    summary: 'Differentiate neurogenic (hemodynamic: hypotension + bradycardia + hypothermia, T6+) from spinal shock (neurologic: areflexia)',
  },

  {
    id: 'neuro-shock-patho',
    type: 'info',
    module: 1,
    title: 'Neurogenic Shock Pathophysiology',
    body: '**Sympathetic Nervous System Disruption**\n\n**Anatomy:**\n• Preganglionic sympathetic neurons: **T1-L2**\n• Cardiac sympathetic innervation: **T1-T5**\n• Injuries at/above **T6** cause neurogenic shock\n\n**Mechanism:**\n1. Loss of descending sympathetic tracts\n2. Peripheral vasodilation (↓SVR)\n3. Venous pooling → ↓venous return → ↓cardiac output\n4. Unopposed vagal tone → bradycardia\n5. Loss of cutaneous vasoconstriction → hypothermia\n\n**Clinical Presentation:**\n\n| Feature | Neurogenic | Hypovolemic |\n|---------|------------|-------------|\n| Heart rate | ↓ Bradycardia | ↑ Tachycardia |\n| Skin | Warm, dry, pink | Cool, pale, clammy |\n| SVR | ↓ Low | ↑ High |\n| Cap refill | Normal/brisk | Delayed |\n\n**Key:** Warm extremities + bradycardia = think neurogenic [1][2]',
    citation: [1, 2],
    next: 'neuro-shock-start',
    summary: 'Loss of sympathetic T1-L2 tracts causes vasodilation, venous pooling, unopposed vagal bradycardia, and hypothermia',
    skippable: true,
  },

  // =====================================================================
  // MODULE 2: RULE OUT HEMORRHAGE
  // =====================================================================

  {
    id: 'neuro-shock-rule-out',
    type: 'info',
    module: 2,
    title: '⚠️ Rule Out Hemorrhage FIRST',
    body: '**NEUROGENIC SHOCK IS A DIAGNOSIS OF EXCLUSION**\n\n🔴 **The most dangerous mistake:** Missing hemorrhage masked by neurogenic shock.\n\n**Why it\'s dangerous:**\n• Trauma patients often have BOTH spinal injury AND hemorrhage\n• Neurogenic shock masks tachycardia — no "warning sign" of bleeding\n• Hypotension + bradycardia does NOT rule out hemorrhage\n\n**Required workup BEFORE attributing to neurogenic shock:**\n\n| Study | Looking For |\n|-------|-------------|\n| **E-FAST** | Intra-abdominal/pericardial blood |\n| **Pelvic XR** | Pelvic fracture with hemorrhage |\n| **CXR** | Hemothorax |\n| **Physical exam** | Long bone fractures, external bleeding |\n| **Labs** | Hgb, lactate, base deficit |\n\n**Only after excluding hemorrhage → proceed with neurogenic shock management** [1][3]',
    citation: [1, 3],
    calculatorLinks: [
      { id: 'neuro-shock-hemorrhage-check', label: 'Hemorrhage Checklist' },
    ],
    next: 'neuro-shock-fluid',
    summary: 'Neurogenic shock is diagnosis of EXCLUSION — complete E-FAST, pelvic XR, CXR, exam, and labs before attributing to neurogenic',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 3: FLUID RESUSCITATION & VASOPRESSORS
  // =====================================================================

  {
    id: 'neuro-shock-fluid',
    type: 'info',
    module: 3,
    title: 'Fluid Resuscitation — Be Cautious',
    body: '**Patients are VASODILATED, not volume depleted**\n\n**Approach:**\n• **Small boluses:** 250-500 mL NS with reassessment\n• **Maximum initial:** 1-2 L before vasopressors\n• **UOP goal:** >30 mL/hr\n\n**Avoid:**\n❌ Hypotonic fluids (D5W, 0.45% NS)\n❌ Aggressive crystalloid resuscitation\n\n**Why not aggressive fluids?**\n• Risk of pulmonary edema\n• Risk of worsening spinal cord edema\n• Dilutional anemia/coagulopathy in polytrauma\n• Does NOT fix the underlying vasodilation\n\n**Key:** If hypotension persists after 1-2L → **START VASOPRESSORS EARLY** [1][4]',
    citation: [1, 4],
    next: 'neuro-shock-vasopressors',
    summary: 'Patients are vasodilated not volume-depleted — limit crystalloid to 1-2L then start vasopressors early',
    safetyLevel: 'warning',
  },

  {
    id: 'neuro-shock-vasopressors',
    type: 'info',
    module: 3,
    title: 'Vasopressor Selection',
    body: '**FIRST LINE: NOREPINEPHRINE** ✅\n\n**Why preferred:**\n• Combined **α₁** (vasoconstriction) + **β₁** (chronotropic)\n• Addresses BOTH hypotension AND bradycardia\n• Best evidence for improved spinal cord perfusion\n\n**Dosing:**\n| Parameter | Value |\n|-----------|-------|\n| Start | 0.05-0.1 mcg/kg/min |\n| Titrate | Every 5-15 min |\n| Range | 0.05-2 mcg/kg/min |\n| Target | MAP ≥85 mmHg |\n\n**SECOND LINE OPTIONS:**\n\n**Epinephrine** — if prominent bradycardia\n• Better chronotropic effect\n• Push-dose: 10-20 mcg IV for profound hypotension\n\n**Dopamine** — if NE unavailable\n• 5-20 mcg/kg/min\n• Less effective, higher complication rate\n\n**Vasopressin** — adjunct for refractory cases\n• 0.03-0.04 units/min\n• Pure vasoconstrictor (no chronotropic effect) [1][4][5]',
    citation: [1, 4, 5],
    calculatorLinks: [
      { id: 'neuro-shock-pressor-calc', label: 'Pressor Dosing' },
    ],
    next: 'neuro-shock-avoid-phenyl',
    summary: 'Norepinephrine first-line (alpha + beta for BP and HR) — start 0.05-0.1 mcg/kg/min, target MAP ≥85',
  },

  {
    id: 'neuro-shock-avoid-phenyl',
    type: 'info',
    module: 3,
    title: '🚫 AVOID Phenylephrine Monotherapy',
    body: '**Phenylephrine is CONTRAINDICATED as sole agent**\n\n**Why:**\n• Pure **α₁ agonist** — NO β activity\n• Causes **reflex bradycardia** (baroreceptor-mediated)\n• **WORSENS** the already-present bradycardia\n\n**The problem:**\n↑ BP from α → baroreceptors sense hypertension → reflex ↓HR → patient more bradycardic\n\n**When phenylephrine might be acceptable:**\n• Lower thoracic injuries (below T6) where bradycardia is less prominent\n• MUST co-administer atropine to maintain HR 60-100\n• Even then, norepinephrine is preferred\n\n**Bottom Line:**\n🚫 Phenylephrine monotherapy\n✅ Norepinephrine first-line [1][4]',
    citation: [1, 4],
    next: 'neuro-shock-bradycardia',
    summary: 'Phenylephrine pure alpha causes reflex bradycardia — WORSENS existing bradycardia in neurogenic shock',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 4: BRADYCARDIA MANAGEMENT
  // =====================================================================

  {
    id: 'neuro-shock-bradycardia',
    type: 'info',
    module: 4,
    title: 'Bradycardia Management',
    body: '**Target HR:** >60 bpm with adequate perfusion\n\n**FIRST LINE: Anticholinergics**\n\n**Atropine:**\n• **Dose:** 0.4-0.6 mg IV q4h PRN\n• **Max:** 3 mg total\n• Often inadequate in neurogenic shock\n\n**Glycopyrrolate:**\n• Alternative to atropine\n• 0.1-0.2 mg IV\n• Less CNS penetration\n\n**SECOND LINE (Refractory):**\n\n**Methylxanthines:**\n• Aminophylline IV for acute management\n• Theophylline PO for ongoing\n• For atropine-refractory bradycardia\n\n**Isoproterenol:**\n• Pure β-agonist\n• Targeted chronotropic effect\n• 2-10 mcg/min IV infusion\n\n**Pacing:**\n• Transcutaneous for immediate stabilization\n• Transvenous for sustained symptomatic bradycardia [1][5]',
    citation: [1, 5],
    calculatorLinks: [
      { id: 'neuro-shock-brady-protocol', label: 'Brady Protocol' },
    ],
    next: 'neuro-shock-map-targets',
    summary: 'Atropine 0.4-0.6mg IV first-line for bradycardia — aminophylline or isoproterenol if refractory, pacing for sustained',
  },

  // =====================================================================
  // MODULE 5: MAP TARGETS & MONITORING
  // =====================================================================

  {
    id: 'neuro-shock-map-targets',
    type: 'info',
    module: 5,
    title: 'MAP Targets — Critical for Outcomes',
    body: '**2024 Guidelines — Hemodynamic Targets:**\n\n| Parameter | Target | Duration |\n|-----------|--------|----------|\n| **MAP** | **85-90 mmHg** | 3-7 days |\n| Lower limit | 75-80 mmHg | Minimum acceptable |\n| Upper limit | 90-95 mmHg | Maximum target |\n\n**Why this matters:**\n• A difference of **2-3 mmHg** in MAP over first 3 days distinguishes neurologic recovery vs non-recovery\n• MAPs <85 mmHg associated with poorer outcomes (AIS grades A, B, C)\n• Secondary injury from hypoperfusion is PREVENTABLE\n\n**Monitoring:**\n• Arterial line for continuous MAP monitoring\n• Hourly neuro checks\n• UOP >30 mL/hr\n• Lactate trending\n\n**Duration:**\n• Strongest evidence: first **72 hours**\n• Continue augmented targets for **5-7 days** [1][6]',
    citation: [1, 6],
    calculatorLinks: [
      { id: 'neuro-shock-map-calc', label: 'MAP Calculator' },
    ],
    next: 'neuro-shock-ancillary',
    summary: 'MAP target 85-90 mmHg for 3-7 days — 2-3 mmHg difference correlates with neurologic recovery, use arterial line',
    safetyLevel: 'critical',
  },

  {
    id: 'neuro-shock-ancillary',
    type: 'info',
    module: 5,
    title: 'Ancillary Management',
    body: '**Temperature Management:**\n• Poikilothermia common — cannot regulate temperature\n• Active rewarming for hypothermia\n• Temperature-sensing Foley for monitoring\n• Avoid hyperthermia (worsens secondary injury)\n\n**VTE Prophylaxis:**\n• Up to **40% DVT risk** in SCI\n• LMWH or UFH within 72 hours (24h post-op if surgery)\n• SCDs/compression stockings\n• IVC filters NOT routinely recommended\n\n**Steroids:**\n🚫 **NOT RECOMMENDED**\n• No Level I/II evidence of benefit\n• Increased complications (infection, GI bleed)\n• AANS/CNS: "strongly discouraged"\n\n**Spine Immobilization:**\n• Rigid collar (Miami J)\n• Log-roll precautions\n• Backboard removal ASAP (pressure injury risk)\n\n**See also:** [Cervical Spine Injuries](/consult/cervical-spine) for imaging, clearance, and injury classification [1][7]',
    citation: [1, 7],
    next: 'spinal-shock-definition',
    summary: 'VTE prophylaxis within 72h (40% DVT risk), active rewarming, NO steroids (strongly discouraged), spine immobilization',
  },

  // =====================================================================
  // MODULE 6: SPINAL SHOCK
  // =====================================================================

  {
    id: 'spinal-shock-definition',
    type: 'info',
    module: 6,
    title: 'Spinal Shock — Neurologic Phenomenon',
    body: '**Definition:**\nTransient loss of ALL spinal cord function below the level of injury:\n• Motor function → **flaccid paralysis**\n• Sensory function → **anesthesia**\n• Reflex activity → **areflexia**\n• Autonomic function → **loss of bladder/bowel/vascular tone**\n\n⚠️ **NOT a circulatory shock state** — different from neurogenic shock\n\n**Duration:** Days to weeks (average 4-12 weeks)\n\n**Clinical Features:**\n• Flaccid (not spastic) paralysis\n• Absent deep tendon reflexes\n• Absent Babinski\n• Absent bulbocavernosus reflex\n• Urinary retention\n• Paralytic ileus [2][8]',
    citation: [2, 8],
    next: 'spinal-shock-phases',
    summary: 'Spinal shock is transient loss of ALL cord function below lesion — flaccid paralysis, areflexia, not circulatory shock',
    skippable: true,
  },

  {
    id: 'spinal-shock-phases',
    type: 'info',
    module: 6,
    title: 'Four Phases of Spinal Shock',
    body: '**Evolution of Spinal Shock:**\n\n| Phase | Timing | Characteristics |\n|-------|--------|----------------|\n| **1** | 0-24 hours | Areflexia; motor neuron hyperpolarization |\n| **2** | 1-3 days | Initial reflex return; denervation supersensitivity |\n| **3** | 4 days - 1 month | DTRs return; Babinski may appear |\n| **4** | 1-12 months | Hyperreflexia, spasticity; autonomic dysreflexia |\n\n**Pattern of Reflex Return:**\n1. Delayed plantar reflex (DPR) — first\n2. **Bulbocavernosus reflex (BCR)** — typically 1-3 days\n3. Cremasteric reflex\n4. Ankle jerk, knee jerk — later (weeks)\n\n**Bulbocavernosus Reflex:**\n• Squeeze glans/clitoris or tug Foley → anal sphincter contracts\n• Return indicates end of spinal shock phase\n• ⚠️ **No prognostic value** for neurologic recovery (2023 NACTN data) [2][8][9]',
    citation: [2, 8, 9],
    next: 'spinal-shock-prognosis',
    summary: 'Four phases over weeks-months — BCR returns 1-3 days marking end of spinal shock, NO prognostic value for recovery',
    skippable: true,
  },

  {
    id: 'spinal-shock-prognosis',
    type: 'info',
    module: 6,
    title: 'Spinal Shock & Prognosis',
    body: '**Why Spinal Shock Matters for Prognosis:**\n\n**During spinal shock:**\n• Cannot reliably determine permanent vs temporary deficits\n• Must wait for resolution to assess true injury extent\n\n**After spinal shock resolves:**\n\n**SACRAL SPARING = INCOMPLETE INJURY = Better Prognosis**\n\nLook for:\n• Preserved perianal sensation\n• Voluntary toe flexion\n• Rectal tone present\n\n**Complete Injury (no sacral sparing):**\n• Poor prognosis for motor recovery below level\n• <5% regain meaningful function\n\n**Incomplete Injury (sacral sparing present):**\n• Better prognosis\n• May recover significant function\n• Central cord syndrome best prognosis\n\n**See also:** [Cervical Spine Injuries](/consult/cervical-spine) → SCI Syndromes module for detailed syndrome descriptions [2][8]',
    citation: [2, 8],
    next: 'neuro-shock-disposition',
    summary: 'Sacral sparing (perianal sensation, toe flexion, rectal tone) = incomplete injury = better prognosis; cannot assess during spinal shock',
  },

  // =====================================================================
  // MODULE 7: DISPOSITION
  // =====================================================================

  {
    id: 'neuro-shock-disposition',
    type: 'question',
    module: 7,
    title: 'Disposition',
    body: '**All patients with neurogenic shock require ICU admission**\n\n**ICU Criteria:**\n• Vasopressor requirement\n• MAP augmentation protocol\n• High cervical injury (C2-C4) — respiratory monitoring\n• Continuous cardiac monitoring (arrhythmia risk)\n• Potential for decompensation\n\n**Consults:**\n□ Neurosurgery or Orthopedic Spine — EMERGENT\n□ PM&R for rehab planning\n□ Respiratory therapy (C2-C4 injuries) [1]',
    options: [
      { label: 'ICU admission checklist', description: 'Orders and monitoring', next: 'neuro-shock-icu-checklist' },
      { label: 'Review C-spine injury management', description: 'Link to cervical spine consult', next: 'neuro-shock-cspine-link' },
    ],
    citation: [1],
    summary: 'All neurogenic shock requires ICU — vasopressors, MAP protocol, high C-spine respiratory monitoring, emergent spine consult',
  },

  {
    id: 'neuro-shock-icu-checklist',
    type: 'info',
    module: 7,
    title: 'ICU Admission Checklist',
    body: '**Orders for Neurogenic Shock ICU Admission:**\n\n**Monitoring:**\n□ Continuous arterial line (MAP monitoring)\n□ Continuous telemetry\n□ Temperature probe Foley\n□ Q1h neuro checks\n□ Strict I/Os\n\n**Hemodynamics:**\n□ MAP goal 85-90 mmHg\n□ Norepinephrine infusion (first-line)\n□ Atropine 0.4-0.6 mg IV PRN for HR <60\n□ Push-dose epi at bedside\n\n**General:**\n□ Foley catheter (neurogenic bladder)\n□ NG tube (paralytic ileus common)\n□ DVT prophylaxis within 72h\n□ Bowel regimen\n□ Log-roll precautions\n□ Pressure injury prevention (turn Q2h)\n\n**Avoid:**\n❌ Phenylephrine monotherapy\n❌ Steroids\n❌ Excessive fluid resuscitation\n\n**Consults:**\n□ Neurosurgery/Spine — STAT\n□ PM&R',
    citation: [1],
    next: undefined,
    summary: 'ICU orders: arterial line MAP 85-90, NE infusion, atropine PRN, DVT prophylaxis, Foley, NG tube, avoid phenylephrine/steroids',
  },

  {
    id: 'neuro-shock-cspine-link',
    type: 'info',
    module: 7,
    title: 'Related: Cervical Spine Injuries',
    body: '**For comprehensive C-spine injury management, see:**\n\n📋 **[Cervical Spine Injuries Consult](/consult/cervical-spine)**\n\n**Covers:**\n• Clinical decision rules (CCR, NEXUS)\n• Imaging strategy (CT, MRI)\n• Upper C-spine injuries (Jefferson, odontoid, hangman\'s)\n• Subaxial injuries (SLIC score)\n• **Spinal cord syndromes** (central cord, Brown-Séquard, etc.)\n• C-spine clearance protocols\n• Pediatric considerations (PECARN, SCIWORA)\n\n**Quick Links Within C-Spine Consult:**\n• SCI Syndromes module\n• SCI Management module (steroids controversy, surgical timing)\n• SLIC calculator for subaxial injuries',
    citation: [1],
    next: undefined,
    summary: 'Link to C-spine consult covering decision rules, imaging, SCI syndromes, clearance protocols, and pediatric considerations',
    skippable: true,
  },

  // =====================================================================
  // PITFALLS MODULE
  // =====================================================================

  {
    id: 'neuro-shock-pitfalls',
    type: 'info',
    module: 7,
    title: 'Critical Pitfalls',
    body: '**Pitfall #1: MISSING HEMORRHAGE**\n• Neurogenic shock is diagnosis of EXCLUSION\n• Always complete FAST, pelvic XR, long bone assessment\n• Bradycardia masks usual tachycardic response to bleeding\n\n**Pitfall #2: FLUID OVERLOADING**\n• Patients are vasodilated, NOT hypovolemic\n• Max 1-2L crystalloid before vasopressors\n• Aggressive fluids → pulmonary edema, spinal cord edema\n\n**Pitfall #3: PHENYLEPHRINE MONOTHERAPY**\n• Pure α causes reflex bradycardia\n• WORSENS existing bradycardia\n• Always use norepinephrine first-line\n\n**Pitfall #4: INADEQUATE MAP TARGETS**\n• Small differences (2-3 mmHg) affect outcomes\n• Target 85-90 mmHg for 3-7 days\n• Use arterial line for accurate monitoring\n\n**Pitfall #5: ATTRIBUTING ALL HYPOTENSION TO NEUROGENIC**\n• Not all hypotension in spinal injury is neurogenic\n• Consider: hemorrhage, tension PTX, tamponade, medications\n• Usually requires lesion at T6 or above [1][3]',
    citation: [1, 3],
    next: 'neuro-shock-start',
    summary: 'Five pitfalls: missing hemorrhage, fluid overload, phenylephrine monotherapy, inadequate MAP targets, assuming all hypotension is neurogenic',
    safetyLevel: 'critical',
  },

];

export const NEUROGENIC_SHOCK_MODULE_LABELS: string[] = [
  'Recognition',
  'Rule Out Hemorrhage',
  'Fluids & Vasopressors',
  'Bradycardia',
  'MAP Targets',
  'Spinal Shock',
  'Disposition',
];

export const NEUROGENIC_SHOCK_CITATIONS: Citation[] = [
  { num: 1, text: 'Farkas J. Traumatic Spinal Cord Injury. IBCC/EMCrit. https://emcrit.org/ibcc/sci/. 2025.' },
  { num: 2, text: 'StatPearls. Spinal Shock. https://www.ncbi.nlm.nih.gov/books/NBK448163/. 2024.' },
  { num: 3, text: 'WikEM. Neurogenic Shock. https://wikem.org/wiki/Neurogenic_shock. 2024.' },
  { num: 4, text: 'StatPearls. Neurogenic Shock. https://www.ncbi.nlm.nih.gov/books/NBK459361/. 2024.' },
  { num: 5, text: 'emDocs. Neurogenic Shock Definition, Identification, and Management in the ED. 2023.' },
  { num: 6, text: '2024 Clinical Practice Guidelines. Hemodynamic Management in Acute SCI. Sage Journals. 2024.' },
  { num: 7, text: 'Hurlbert RJ, et al. Pharmacological Therapy for Acute SCI. Neurosurgery. 2013;72 Suppl 2:93-105.' },
  { num: 8, text: 'Ditunno JF, et al. Spinal Shock Revisited. Spinal Cord. 2004;42(7):383-95.' },
  { num: 9, text: 'Jones CF, et al. Bulbocavernosus Reflex Has No Prognostic Utility. J Neurotrauma. 2023.' },
];
