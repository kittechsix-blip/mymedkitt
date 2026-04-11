// MedKitt — Cervical Spine Injuries
// Comprehensive cervical spine injury assessment, clearance, and spinal cord injury management
// Sources: EMCrit IBCC, EAST Guidelines, WikEM, ATLS, PECARN 2024
// 8 modules: Recognition → Decision Rules → Imaging → Upper C-Spine → Subaxial → SCI Syndromes → SCI Management → Clearance
// ~40 nodes

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const CERVICAL_SPINE_CRITICAL_ACTIONS = [
  { text: 'Assume C-spine injury until cleared in all trauma patients — immobilize early', nodeId: 'cspine-start' },
  { text: 'CCR > NEXUS for clinical clearance — sensitivity 99% vs 94%', nodeId: 'cspine-ccr' },
  { text: 'MAP 85-90 mmHg for 3-7 days improves SCI outcomes — norepinephrine first-line', nodeId: 'cspine-sci-resuscitation' },
  { text: 'NO STEROIDS — methylprednisolone is STRONGLY discouraged for acute SCI', nodeId: 'cspine-steroids' },
  { text: 'Hangman\'s Type IIa: NO TRACTION — flexion injury worsens with distraction', nodeId: 'cspine-hangman' },
  { text: 'Central cord syndrome has BEST prognosis — upper extremity > lower extremity weakness', nodeId: 'cspine-central-cord' },
] as const;

export const CERVICAL_SPINE_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'cspine-start',
    type: 'question',
    module: 1,
    title: 'Cervical Spine Injury Assessment',
    body: '**ATLS Principle:**\nAssume cervical spine injury until cleared in ALL trauma patients.\n\n**High-Risk Mechanisms:**\n• Falls ≥3 ft or 5 stairs\n• Axial load (diving, falling object)\n• MVC >100 km/hr, rollover, ejection\n• Motorized recreation collision\n• Bicycle vs vehicle or ejection\n\n**Red Flags:**\n• Midline cervical tenderness\n• Neurologic deficit\n• Altered mental status\n• Intoxication\n• Painful distracting injury\n\n⚠️ **Secondary injury from hypotension/hypoxemia may exceed primary injury** — prioritize ABCs [1][2]',
    options: [
      { label: 'Alert, cooperative patient', description: 'Apply clinical decision rules', next: 'cspine-cdr-choice', urgency: 'routine' },
      { label: 'Obtunded or unreliable patient', description: 'Cannot apply clinical rules', next: 'cspine-obtunded', urgency: 'urgent' },
      { label: 'Known neurologic deficit', description: 'Spinal cord injury suspected', next: 'cspine-sci-syndromes', urgency: 'critical' },
      { label: 'Pediatric patient (<18 years)', description: 'PECARN pediatric rules', next: 'cspine-pediatric' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'cspine-nexus', label: 'NEXUS Criteria' },
      { id: 'cspine-ccr', label: 'Canadian C-Spine Rule' },
    ],
  },

  // =====================================================================
  // MODULE 2: CLINICAL DECISION RULES
  // =====================================================================

  {
    id: 'cspine-cdr-choice',
    type: 'question',
    module: 2,
    title: 'Clinical Decision Rules',
    body: '**Which Rule to Use?**\n\n**Canadian C-Spine Rule (CCR)**\n• Sensitivity: **99-100%**\n• Includes mechanism assessment\n• Works in intoxicated if alert\n• Age ≥65 mandates imaging\n\n**NEXUS Criteria**\n• Sensitivity: **94%**\n• Simpler, 5 criteria\n• No age cutoffs\n• Less sensitive in elderly\n\n**Bottom Line:**\n✅ **CCR is preferred over NEXUS** — higher sensitivity, fewer missed injuries [3][4]',
    options: [
      { label: 'Apply Canadian C-Spine Rule', description: 'Preferred — higher sensitivity', next: 'cspine-ccr' },
      { label: 'Apply NEXUS Criteria', description: 'Alternative — simpler', next: 'cspine-nexus' },
    ],
    citation: [3, 4],
  },

  {
    id: 'cspine-ccr',
    type: 'question',
    module: 2,
    title: 'Canadian C-Spine Rule',
    body: '**Step 1: Any HIGH-RISK Factor?**\n(Mandates radiography)\n\n| High-Risk Factor | Points |\n|-----------------|--------|\n| Age ≥65 years | Yes |\n| Dangerous mechanism | Yes |\n| Paresthesias in extremities | Yes |\n\n**Dangerous Mechanisms:**\n• Fall ≥3 ft / 5 stairs\n• Axial load to head\n• MVC >100 km/hr, rollover, ejection\n• Motorized recreation collision\n• Bicycle collision\n\n**If YES to any → Imaging required**\n\nIf NO high-risk factors, proceed to low-risk assessment: [3]',
    options: [
      { label: 'HIGH-RISK present', description: 'Imaging required', next: 'cspine-imaging', urgency: 'urgent' },
      { label: 'No high-risk factors', description: 'Check for low-risk factors', next: 'cspine-ccr-lowrisk' },
    ],
    citation: [3],
    calculatorLinks: [
      { id: 'cspine-ccr', label: 'CCR Calculator' },
    ],
  },

  {
    id: 'cspine-ccr-lowrisk',
    type: 'question',
    module: 2,
    title: 'CCR — Low-Risk Assessment',
    body: '**Step 2: Any LOW-RISK Factor?**\n(Allows ROM assessment)\n\n| Low-Risk Factor |\n|-----------------|\n| Simple rear-end MVC |\n| Sitting position in ED |\n| Ambulatory at any time |\n| Delayed onset of neck pain |\n| No midline cervical tenderness |\n\n**If YES to any low-risk factor:**\nPatient can attempt active range of motion\n\n**If NO low-risk factors:**\nImaging required [3]',
    options: [
      { label: 'Low-risk factor present', description: 'Can assess ROM', next: 'cspine-ccr-rom' },
      { label: 'No low-risk factors', description: 'Imaging required', next: 'cspine-imaging', urgency: 'urgent' },
    ],
    citation: [3],
  },

  {
    id: 'cspine-ccr-rom',
    type: 'question',
    module: 2,
    title: 'CCR — Range of Motion',
    body: '**Step 3: Active Range of Motion**\n\nPatient ACTIVELY rotates neck:\n• 45° to the LEFT\n• 45° to the RIGHT\n\n⚠️ **Patient must perform this actively** — do not passively manipulate the neck.\n\n**Result:**',
    options: [
      { label: 'Full ROM — 45° both directions', description: 'No imaging required', next: 'cspine-cleared' },
      { label: 'Unable to rotate 45°', description: 'Imaging required', next: 'cspine-imaging', urgency: 'urgent' },
    ],
    citation: [3],
  },

  {
    id: 'cspine-nexus',
    type: 'question',
    module: 2,
    title: 'NEXUS Criteria',
    body: '**NEXUS Criteria for C-Spine Clearance**\n\n**ALL 5 criteria must be met to clear clinically:**\n\n| Criterion | Present? |\n|-----------|----------|\n| No midline cervical tenderness | □ |\n| No focal neurologic deficit | □ |\n| Normal alertness | □ |\n| No intoxication | □ |\n| No painful distracting injury | □ |\n\n**If ALL 5 met:** Clinical clearance possible\n**If ANY not met:** Imaging required\n\n⚠️ **NEXUS is less sensitive than CCR (94% vs 99%)** — may miss injuries, especially in elderly [4]',
    options: [
      { label: 'All 5 criteria met', description: 'Clinical clearance', next: 'cspine-cleared' },
      { label: 'Any criterion NOT met', description: 'Imaging required', next: 'cspine-imaging', urgency: 'urgent' },
    ],
    citation: [4],
    calculatorLinks: [
      { id: 'cspine-nexus', label: 'NEXUS Calculator' },
    ],
  },

  {
    id: 'cspine-cleared',
    type: 'info',
    module: 2,
    title: 'C-Spine Clinically Cleared',
    body: '**C-Spine Cleared by Clinical Decision Rule**\n\n✅ No imaging required\n✅ Remove cervical collar\n\n**Document:**\n• Which rule used (CCR preferred)\n• All criteria assessed\n• ROM if applicable\n\n**Discharge Instructions:**\n• Return if symptoms worsen\n• New numbness, tingling, weakness = return immediately\n• Ibuprofen/acetaminophen for pain\n• Activity as tolerated [3][4]',
    citation: [3, 4],
    next: undefined,
  },

  // =====================================================================
  // MODULE 3: IMAGING
  // =====================================================================

  {
    id: 'cspine-imaging',
    type: 'question',
    module: 3,
    title: 'C-Spine Imaging Strategy',
    body: '**CT C-Spine is the Primary Modality**\n\n**CT Protocol:**\n• Axial images from occiput to T1\n• Sagittal and coronal reconstructions\n• ~98% sensitivity for fractures\n\n**Plain films:** No longer first-line for screening\n\n**If injury identified:**\n• Image full thoracolumbar spine (occult injuries in 20%)\n• Consider CTA for vertebral artery dissection\n\n**MRI Indications:**\n• Neurologic deficit with negative CT\n• Persistent symptoms/neck pain with negative CT\n• Ligamentous injury suspected\n• SCI evaluation — ideally within 72 hours [5][6]',
    options: [
      { label: 'CT negative — no symptoms', description: 'Clear and remove collar', next: 'cspine-cleared' },
      { label: 'CT negative — persistent pain', description: 'Consider MRI', next: 'cspine-persistent-pain' },
      { label: 'CT shows upper C-spine injury', description: 'C0-C2 injuries', next: 'cspine-upper-overview' },
      { label: 'CT shows subaxial injury', description: 'C3-C7 injuries', next: 'cspine-subaxial' },
      { label: 'CT negative — neurologic deficit', description: 'Get MRI urgently', next: 'cspine-sci-syndromes', urgency: 'critical' },
    ],
    citation: [5, 6],
  },

  {
    id: 'cspine-persistent-pain',
    type: 'info',
    module: 3,
    title: 'Persistent Pain — Negative CT',
    body: '**CT Negative with Persistent Pain**\n\n**Options:**\n\n1. **Continue collar + repeat exam**\n   - Reassess in 24-48 hours\n   - If resolves → clear\n\n2. **MRI within 72 hours**\n   - Most sensitive for ligamentous injury\n   - Shows abnormalities in ~25% with negative CT\n   - More useful after initial inflammation\n\n3. **Flexion-extension films**\n   - Only if cooperative and no neurologic symptoms\n   - Can identify dynamic instability\n\n**EAST Recommendation:**\nIn low-risk patients with isolated neck pain and negative CT, clinical clearance is reasonable with close follow-up [6]',
    citation: [6],
    next: undefined,
  },

  {
    id: 'cspine-obtunded',
    type: 'info',
    module: 3,
    title: 'Obtunded Patient — Clearance',
    body: '**C-Spine Clearance in Obtunded Patient**\n\n**EAST 2022 Guidelines:**\n\n✅ **High-quality negative CT alone is sufficient for collar removal**\n\n**Rationale:**\n• CT has very high NPV for unstable injuries\n• MRI adds mostly low-significance findings\n• Transport risks for MRI often outweigh benefits\n• **Collar complications increase 66% per day**\n\n**When to consider MRI:**\n• Focal neurologic deficit present\n• Concerning mechanism with high suspicion\n• Unable to obtain adequate CT\n\n**Protocol:**\n1. High-quality CT C-spine with reconstructions\n2. No focal neurologic deficit on exam\n3. → Remove collar [6]',
    citation: [6],
    next: 'cspine-imaging',
  },

  // =====================================================================
  // MODULE 4: UPPER C-SPINE (C0-C2)
  // =====================================================================

  {
    id: 'cspine-upper-overview',
    type: 'question',
    module: 4,
    title: 'Upper C-Spine Injuries (C0-C2)',
    body: '**Upper Cervical Spine Injuries**\n\n50% of all cervical fractures occur at C1-C2.\n\n**Injury Patterns:**\n\n| Injury | Key Feature |\n|--------|-------------|\n| **Atlanto-Occipital Dislocation** | Often fatal |\n| **Jefferson Fracture (C1)** | Burst fracture of atlas |\n| **Odontoid Fracture (C2)** | Most common in elderly |\n| **Hangman\'s Fracture (C2)** | Pars interarticularis |\n\n⚠️ **50% of C1 fractures have associated C2 injuries** — always look for both [7]',
    options: [
      { label: 'Odontoid (dens) fracture', description: 'C2 — most common type', next: 'cspine-odontoid' },
      { label: 'Jefferson fracture', description: 'C1 burst fracture', next: 'cspine-jefferson' },
      { label: 'Hangman\'s fracture', description: 'C2 pars fracture', next: 'cspine-hangman' },
      { label: 'Atlanto-occipital dislocation', description: 'Often fatal', next: 'cspine-aod' },
    ],
    citation: [7],
    calculatorLinks: [
      { id: 'cspine-injury-id', label: 'Injury Identifier' },
    ],
  },

  {
    id: 'cspine-odontoid',
    type: 'info',
    module: 4,
    title: 'Odontoid (Dens) Fracture',
    body: '**Anderson-D\'Alonzo Classification:**\n\n| Type | Description | Treatment |\n|------|-------------|----------|\n| **I** | Tip avulsion (above transverse ligament) | Rigid collar — usually stable |\n| **II** | Base of dens (most common) | See below — highest nonunion |\n| **IIA** | Comminuted base | Usually surgical |\n| **III** | Extends into C2 body | Usually collar — stable |\n\n**Type II Management:**\n• Non-displaced: Collar or halo\n• **Surgical if:**\n  - Displacement >5mm\n  - Angulation >10°\n  - Gap >2mm\n\n**Elderly Pearl:**\n🔴 Odontoid fractures are the **most common C-spine fracture in patients >65**\n• Type II: 22% mortality at 2 years in elderly\n• Lower threshold for surgical fixation [8]',
    citation: [8],
    calculatorLinks: [
      { id: 'cspine-odontoid-class', label: 'Odontoid Classification' },
    ],
    next: 'cspine-disposition',
  },

  {
    id: 'cspine-jefferson',
    type: 'info',
    module: 4,
    title: 'Jefferson Fracture (C1)',
    body: '**Jefferson Fracture — C1 Burst**\n\nAxial loading injury causing burst of the atlas ring.\n\n**Gehweiler Classification:**\n\n| Type | Description |\n|------|-------------|\n| 1 | Anterior arch fracture |\n| 2 | Posterior arch fracture |\n| 3 | Both arches (classic Jefferson) |\n| 4 | Lateral mass fracture |\n| 5 | Transverse process fracture |\n\n**Stability Assessment:**\n• **Stable:** Lateral mass displacement <7mm, transverse ligament intact\n• **Unstable:** Lateral mass displacement ≥7mm OR transverse ligament disruption\n\n**Treatment:**\n• Stable → Rigid collar 8-12 weeks\n• Unstable → Halo or surgical fixation\n\n⚠️ **50% have associated C2 fractures** — always check odontoid [7][9]',
    citation: [7, 9],
    next: 'cspine-disposition',
  },

  {
    id: 'cspine-hangman',
    type: 'info',
    module: 4,
    title: 'Hangman\'s Fracture',
    body: '**Hangman\'s Fracture — C2 Pars Interarticularis**\n\n**Levine-Edwards Classification:**\n\n| Type | Description | Treatment |\n|------|-------------|----------|\n| **I** | <3mm subluxation, intact disc | Rigid collar 6-12 weeks |\n| **II** | >4mm subluxation, >11° angulation, disc disruption | Traction reduction, halo vs surgery |\n| **IIa** | Minimal translation, significant angulation, FLEXION | ⚠️ **NO TRACTION** — halo |\n| **III** | Bilateral facet dislocation with C2-C3 | Surgical fixation |\n\n🔴 **Type IIa Critical Point:**\n**DO NOT apply traction** — this is a flexion injury\nTraction will worsen displacement\nTreat with halo immobilization\n\n**Prognosis:**\nType I/II = 90% fusion rate with conservative treatment [10]',
    citation: [10],
    calculatorLinks: [
      { id: 'cspine-hangman-class', label: 'Levine-Edwards Class' },
    ],
    next: 'cspine-disposition',
  },

  {
    id: 'cspine-aod',
    type: 'info',
    module: 4,
    title: 'Atlanto-Occipital Dislocation',
    body: '**Atlanto-Occipital Dislocation (AOD)**\n\n**Often fatal** — survivors have severe neurologic injury.\n\n**Diagnosis:**\n• Powers ratio (CT)\n• Basion-dental interval\n• Harris lines\n\n**Immediate Management:**\n1. Rigid immobilization\n2. Avoid neck manipulation\n3. **EMERGENCY spine surgery consultation**\n\n**Treatment:**\nSurgical occipitocervical fusion required\n\n**Prognosis:**\nVery poor — most fatal at scene. Survivors usually have significant permanent deficit [7]',
    citation: [7],
    next: 'cspine-disposition',
  },

  // =====================================================================
  // MODULE 5: SUBAXIAL INJURIES (C3-C7)
  // =====================================================================

  {
    id: 'cspine-subaxial',
    type: 'info',
    module: 5,
    title: 'Subaxial Injuries (C3-C7)',
    body: '**SLIC Score — Subaxial Injury Classification**\n\n**Morphology:**\n| Finding | Points |\n|---------|--------|\n| No abnormality | 0 |\n| Compression | 1 |\n| Burst | 2 |\n| Distraction | 3 |\n| Rotation/Translation | 4 |\n\n**Disco-Ligamentous Complex (DLC):**\n| Status | Points |\n|--------|--------|\n| Intact | 0 |\n| Indeterminate | 1 |\n| Disrupted | 2 |\n\n**Neurologic Status:**\n| Finding | Points |\n|---------|--------|\n| Intact | 0 |\n| Root injury | 1 |\n| Complete cord injury | 2 |\n| Incomplete cord injury | 3 |\n| +Continuous cord compression | +1 |\n\n**Treatment Decision:**\n| Score | Recommendation |\n|-------|---------------|\n| 1-3 | Conservative (collar) |\n| 4 | Surgeon discretion |\n| **≥5** | **Surgical stabilization** | [11]',
    citation: [11],
    calculatorLinks: [
      { id: 'cspine-slic', label: 'SLIC Calculator' },
    ],
    next: 'cspine-disposition',
  },

  // =====================================================================
  // MODULE 6: SPINAL CORD SYNDROMES
  // =====================================================================

  {
    id: 'cspine-sci-syndromes',
    type: 'question',
    module: 6,
    title: 'Spinal Cord Injury Syndromes',
    body: '**Identify the SCI Pattern:**\n\nExam findings determine syndrome and prognosis.\n\n**Key Findings:**\n• Motor weakness distribution\n• Sensory level and pattern\n• Rectal tone, priapism\n• Complete vs incomplete [12][13]',
    options: [
      { label: 'Complete loss below level', description: 'Complete cord transection', next: 'cspine-complete-sci' },
      { label: 'UE weakness > LE weakness', description: 'Central cord syndrome', next: 'cspine-central-cord' },
      { label: 'Motor loss + pain/temp loss', description: 'Anterior cord syndrome', next: 'cspine-anterior-cord' },
      { label: 'Ipsilateral motor + contralateral sensory', description: 'Brown-Séquard syndrome', next: 'cspine-brown-sequard' },
      { label: 'Proprioception/vibration loss only', description: 'Posterior cord syndrome', next: 'cspine-posterior-cord' },
    ],
    citation: [12, 13],
  },

  {
    id: 'cspine-complete-sci',
    type: 'info',
    module: 6,
    title: 'Complete Spinal Cord Injury',
    body: '**Complete Cord Transection**\n\n**Findings:**\n• Total loss of motor function below level\n• Total loss of sensory function below level\n• Absent rectal tone\n• Flaccid paralysis initially (spinal shock)\n\n**Spinal Shock:**\n• Lasts hours to weeks\n• Areflexia below lesion\n• Resolution: Return of bulbocavernosus reflex\n• After shock resolves → spasticity develops\n\n**Prognosis:**\n• Poor for functional recovery\n• <5% regain meaningful motor function\n• Focus on rehabilitation and complication prevention [12][13]',
    citation: [12, 13],
    next: 'cspine-sci-resuscitation',
  },

  {
    id: 'cspine-central-cord',
    type: 'info',
    module: 6,
    title: 'Central Cord Syndrome',
    body: '**Central Cord Syndrome — Most Common Incomplete SCI**\n\n**Classic Presentation:**\n• **Upper extremity weakness > lower extremity**\n• Cape distribution sensory loss\n• Bladder dysfunction (retention > incontinence)\n• Variable motor/sensory patterns\n\n**Mechanism:**\nHyperextension in elderly with pre-existing cervical stenosis or spondylosis\n\n**Pathophysiology:**\nCentral cord (arm fibers) more affected than lateral (leg fibers)\n\n**Prognosis:**\n✅ **Most favorable of incomplete injuries**\n• Recovery sequence: Legs → Proximal arms → Hands → Bladder\n• Younger patients have better outcomes\n• 75% regain some ambulatory function\n\n**Treatment:**\n• Early surgery (≤24 hours) may improve outcomes\n• Conservative if no compression/instability [12][13][14]',
    citation: [12, 13, 14],
    next: 'cspine-sci-resuscitation',
  },

  {
    id: 'cspine-anterior-cord',
    type: 'info',
    module: 6,
    title: 'Anterior Cord Syndrome',
    body: '**Anterior Cord Syndrome — Worst Prognosis of Incomplete**\n\n**Findings:**\n• **Motor paralysis** (corticospinal tracts)\n• **Loss of pain and temperature** (spinothalamic tracts)\n• **Preserved proprioception and vibration** (dorsal columns intact)\n\n**Causes:**\n• Anterior spinal artery occlusion\n• Burst fracture with anterior cord compression\n• Aortic surgery complication\n• Disc herniation\n\n**Prognosis:**\n❌ **Worst of incomplete injuries**\n• Only 10-20% recover functional motor\n• Even with good sensory recovery, motor often poor [12][13]',
    citation: [12, 13],
    next: 'cspine-sci-resuscitation',
  },

  {
    id: 'cspine-brown-sequard',
    type: 'info',
    module: 6,
    title: 'Brown-Séquard Syndrome',
    body: '**Brown-Séquard Syndrome — Best Prognosis**\n\nCord hemisection.\n\n**Findings:**\n\n**Ipsilateral (same side as lesion):**\n• Motor paralysis\n• Loss of proprioception and vibration\n\n**Contralateral (opposite side):**\n• Loss of pain and temperature (1-2 levels below injury)\n\n**Causes:**\n• Penetrating trauma (knife, bullet)\n• Lateral mass fracture with cord compression\n• Tumor, epidural hematoma\n\n**Prognosis:**\n✅ **Best prognosis of all incomplete injuries**\n• 75-90% regain ambulatory function\n• Recovery continues up to 2 years\n• Most recover bladder/bowel function [12][13]',
    citation: [12, 13],
    next: 'cspine-sci-resuscitation',
  },

  {
    id: 'cspine-posterior-cord',
    type: 'info',
    module: 6,
    title: 'Posterior Cord Syndrome',
    body: '**Posterior Cord Syndrome — Rare**\n\n**Findings:**\n• **Loss of proprioception and vibration** (dorsal columns)\n• Motor preserved\n• Pain and temperature preserved\n• Sensory ataxia\n\n**Causes:**\n• Posterior spinal artery infarct\n• Tabes dorsalis (syphilis)\n• B12 deficiency (subacute combined degeneration)\n• Multiple sclerosis\n\n**Clinical:**\n• Patients can\'t sense position in space\n• Romberg positive\n• Wide-based gait\n\nRare as pure syndrome from trauma [12]',
    citation: [12],
    next: 'cspine-sci-resuscitation',
  },

  // =====================================================================
  // MODULE 7: SCI MANAGEMENT
  // =====================================================================

  {
    id: 'cspine-sci-resuscitation',
    type: 'info',
    module: 7,
    title: 'SCI Resuscitation',
    body: '**Spinal Cord Injury Resuscitation**\n\n**Blood Pressure Targets:**\n\n| Parameter | Target | Duration |\n|-----------|--------|----------|\n| **MAP** | **85-90 mmHg** | 3-7 days |\n| SBP | 90-100 mmHg minimum | Continuous |\n\n**Evidence:** Higher MAP associated with improved neurologic outcomes. Strongest evidence for first 72 hours.\n\n**Vasopressor:**\n✅ **Norepinephrine first-line** (α + β activity)\n\n**Neurogenic Shock:**\n• Hypotension + bradycardia (distinguish from hypovolemic)\n• Initial: IV fluids (often sufficient)\n• ❌ **Avoid phenylephrine alone** (pure α1 → reflex bradycardia worsens)\n• For bradycardia: Atropine or glycopyrrolate\n\n**Airway:**\n• C2-C4 injuries: High risk for respiratory failure\n• Monitor for delayed deterioration (edema peaks days 3-6)\n• Consider early tracheostomy [1][15]',
    citation: [1, 15],
    calculatorLinks: [
      { id: 'cspine-map-goals', label: 'MAP Goals' },
    ],
    next: 'cspine-steroids',
  },

  {
    id: 'cspine-steroids',
    type: 'info',
    module: 7,
    title: 'Steroids in SCI — NOT Recommended',
    body: '**Methylprednisolone in Acute SCI**\n\n🔴 **NOT RECOMMENDED — STRONGLY DISCOURAGED**\n\n**Evidence:**\n• No Level I/II evidence of benefit\n• NASCIS trials heavily criticized\n• No FDA approval for this indication\n\n**AANS/CNS Guidelines:**\n> "Administration of methylprednisolone for the treatment of acute spinal cord injury is not recommended."\n\n**Risks:**\n• Increased infection\n• Wound complications\n• GI bleeding\n• Possible increased mortality\n\n**Bottom Line:**\nDo not give steroids for acute traumatic SCI. If asked by consulting service, cite AANS/CNS guidelines. [1][16]',
    citation: [1, 16],
    next: 'cspine-sci-surgery',
  },

  {
    id: 'cspine-sci-surgery',
    type: 'info',
    module: 7,
    title: 'Surgical Timing',
    body: '**Surgical Decompression Timing**\n\n**Early Surgery (<24 hours):**\n• Associated with improved neurologic outcomes\n• Especially for incomplete injuries\n• STASCIS trial: 2-grade improvement more likely\n\n**Indications for Urgent Surgery:**\n• Progressive neurologic deterioration\n• Unstable fractures\n• Persistent cord compression\n• Incomplete injury with compression\n\n**Consult Neurosurgery/Spine Immediately:**\n• Any spinal cord injury\n• Unstable fractures\n• Uncertain stability\n\n**DVT Prophylaxis:**\n• Initiate within 72 hours (24h post-op if surgery)\n• Chemical + mechanical\n• 15% VTE rate despite prophylaxis\n• Prophylactic IVC filters NOT recommended [1][17]',
    citation: [1, 17],
    next: 'cspine-disposition',
  },

  // =====================================================================
  // MODULE 8: SPECIAL POPULATIONS & DISPOSITION
  // =====================================================================

  {
    id: 'cspine-pediatric',
    type: 'info',
    module: 8,
    title: 'Pediatric C-Spine Assessment',
    body: '**PECARN 2024 — Pediatric C-Spine Rule**\n\n**High Risk (warrant CT):**\n• GCS 3-8 or AVPU = U\n• Abnormal airway/breathing/circulation\n• Focal neurologic deficit\n→ CSI rate: 12.1%\n\n**Intermediate Risk (warrant X-ray):**\n• Altered mental status (GCS 9-14)\n• Self-reported neck pain\n• Substantial torso or head injury\n• Posterior midline tenderness\n→ CSI rate: 2.8%\n\n**Low Risk (clinical clearance):**\n• None of above\n→ CSI rate: 0.2% (NPV 99.9%)\n\n**SCIWORA:**\n(Spinal Cord Injury Without Radiographic Abnormality)\n• More common in children <8 years\n• CT and X-ray normal; MRI may show cord abnormality\n• **52% have delayed onset up to 4 days**\n• MRI-negative: 100% complete recovery\n• Treatment: Collar immobilization [18][19]',
    citation: [18, 19],
    calculatorLinks: [
      { id: 'cspine-pecarn', label: 'PECARN C-Spine' },
    ],
    next: 'cspine-start',
  },

  {
    id: 'cspine-disposition',
    type: 'question',
    module: 8,
    title: 'Disposition',
    body: '**Disposition Planning**\n\n**Consult Spine Surgery For:**\n• Any unstable injury\n• Neurologic deficit\n• Progressive symptoms\n• Uncertain stability\n• Type II odontoid\n• Hangman\'s Type IIa/III\n• SLIC ≥5\n\n**Admit to ICU:**\n• Spinal cord injury (MAP monitoring)\n• High cervical injury (C2-C4)\n• Neurogenic shock\n• Need for mechanical ventilation [1]',
    options: [
      { label: 'ICU admission needed', description: 'SCI, high cervical, shock', next: 'cspine-icu-checklist', urgency: 'critical' },
      { label: 'Floor admission — stable', description: 'Stable fracture, observation', next: 'cspine-floor-checklist' },
      { label: 'Discharge with collar', description: 'Stable, outpatient follow-up', next: 'cspine-discharge' },
    ],
    citation: [1],
  },

  {
    id: 'cspine-icu-checklist',
    type: 'info',
    module: 8,
    title: 'ICU Admission Checklist',
    body: '**ICU Admission for C-Spine/SCI**\n\n**Orders:**\n□ Continuous arterial line monitoring\n□ MAP goal 85-90 mmHg\n□ Norepinephrine infusion PRN\n□ Foley catheter (neurogenic bladder)\n□ NG tube if high cervical (ileus common)\n□ DVT prophylaxis within 72 hours\n□ Respiratory monitoring (PFTs if C2-C4)\n□ Q1h neuro checks\n\n**Consults:**\n□ Neurosurgery or Orthopedic Spine\n□ PM&R for rehab planning\n□ Respiratory therapy\n\n**Avoid:**\n❌ Phenylephrine alone (worsens bradycardia)\n❌ Steroids\n❌ Excessive fluids (pulmonary edema)',
    citation: [1],
    next: undefined,
  },

  {
    id: 'cspine-floor-checklist',
    type: 'info',
    module: 8,
    title: 'Floor Admission Checklist',
    body: '**Floor Admission for Stable C-Spine Injury**\n\n**Orders:**\n□ Hard cervical collar at all times\n□ Log-roll precautions for repositioning\n□ Neuro checks Q4h\n□ DVT prophylaxis\n□ Pain management\n□ Stool softener (avoid straining)\n\n**Consults:**\n□ Spine surgery for operative planning\n□ PT/OT evaluation\n\n**Education:**\n□ Do not remove collar\n□ Report any new weakness, numbness, or changes',
    citation: [1],
    next: undefined,
  },

  {
    id: 'cspine-discharge',
    type: 'info',
    module: 8,
    title: 'Discharge with Collar',
    body: '**Discharge Instructions — Stable C-Spine Fracture**\n\n**Collar:**\n• Wear rigid collar at ALL times except brief showers\n• Keep collar on while sleeping\n• Follow-up in 1-2 weeks with spine surgery\n\n**Activity:**\n• No heavy lifting (>10 lbs)\n• No contact sports\n• Limit neck rotation\n• May work if sedentary job\n\n**Return IMMEDIATELY if:**\n• New numbness or tingling\n• New weakness in arms or legs\n• Loss of bladder/bowel control\n• Worsening pain despite medication\n• Difficulty breathing\n\n**Follow-up:**\n□ Spine surgery: 1-2 weeks\n□ Repeat imaging as directed\n□ Primary care for wound check if applicable',
    citation: [1],
    next: undefined,
  },

];

export const CERVICAL_SPINE_MODULE_LABELS: string[] = [
  'Initial Assessment',
  'Decision Rules',
  'Imaging',
  'Upper C-Spine',
  'Subaxial Injuries',
  'SCI Syndromes',
  'SCI Management',
  'Disposition',
];

export const CERVICAL_SPINE_CITATIONS: Citation[] = [
  { num: 1, text: 'Farkas J. Traumatic Spinal Cord Injury. IBCC/EMCrit. https://emcrit.org/ibcc/sci/. 2025.' },
  { num: 2, text: 'American College of Surgeons. ATLS Advanced Trauma Life Support. 10th ed. 2018.' },
  { num: 3, text: 'Stiell IG, et al. The Canadian C-Spine Rule for Radiography in Alert and Stable Trauma Patients. JAMA. 2001;286(15):1841-8.' },
  { num: 4, text: 'Hoffman JR, et al. Validity of a Set of Clinical Criteria to Rule Out Injury to the Cervical Spine (NEXUS). NEJM. 2000;343(2):94-9.' },
  { num: 5, text: 'Stiell IG, et al. The Canadian C-Spine Rule versus the NEXUS Low-Risk Criteria in Patients with Trauma. NEJM. 2003;349(26):2510-8.' },
  { num: 6, text: 'EAST Practice Management Guidelines. Cervical Spine Collar Clearance in the Obtunded Patient. 2022.' },
  { num: 7, text: 'WikEM. Cervical Spine Injuries. https://wikem.org/wiki/Cervical_spine_injuries. 2024.' },
  { num: 8, text: 'Schroeder GD, et al. Odontoid Fractures. StatPearls. 2024.' },
  { num: 9, text: 'Kakarla UK, et al. Atlas Fractures. StatPearls. 2024.' },
  { num: 10, text: 'Mulligan RP, et al. Hangman\'s Fractures. StatPearls. 2024.' },
  { num: 11, text: 'Vaccaro AR, et al. The Subaxial Cervical Spine Injury Classification System (SLIC). Spine. 2007;32(21):2365-74.' },
  { num: 12, text: 'Kirshblum SC, et al. Spinal Cord Injury Syndromes. StatPearls. 2024.' },
  { num: 13, text: 'WikEM. Spinal Cord Injury. https://wikem.org/wiki/Spinal_cord_injury. 2024.' },
  { num: 14, text: 'Harrop JS, et al. Central Cord Syndrome. StatPearls. 2024.' },
  { num: 15, text: 'Ryken TC, et al. Blood Pressure Management After Acute Spinal Cord Injury. Neurosurgery. 2013;72 Suppl 2:228-36.' },
  { num: 16, text: 'Hurlbert RJ, et al. Pharmacological Therapy for Acute Spinal Cord Injury. Neurosurgery. 2013;72 Suppl 2:93-105.' },
  { num: 17, text: 'Fehlings MG, et al. Early versus Delayed Decompression for Traumatic Cervical SCI. PLOS ONE. 2012;7(2):e32037.' },
  { num: 18, text: 'Leonard JC, et al. PECARN Cervical Spine Injury Prediction Rule. Lancet Child Adolesc Health. 2024.' },
  { num: 19, text: 'Pang D. Spinal Cord Injury Without Radiographic Abnormality (SCIWORA). Childs Nerv Syst. 2004;20(11-12):765-86.' },
];
