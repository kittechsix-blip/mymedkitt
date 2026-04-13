// MedKitt — Le Fort Fracture Management
// Classification → Airway → Hemorrhage → Associated Injuries → Disposition
// 5 modules: Classification → Airway Management → Hemorrhage Control → Workup → Disposition
// ~26 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const LE_FORT_FRACTURE_CRITICAL_ACTIONS = [
  { text: 'All Le Fort fractures involve pterygoid plates — if pterygoids intact, NOT a Le Fort', nodeId: 'lefort-start' },
  { text: 'NEVER nasally intubate or place NG tube in Le Fort II/III — risk of intracranial passage', nodeId: 'lefort-airway-decision' },
  { text: 'Double setup: Have cricothyrotomy kit OPEN when intubating — CICO risk is high', nodeId: 'lefort-airway-approach' },
  { text: 'C-spine injury until proven otherwise — maintain inline stabilization', nodeId: 'lefort-cspine' },
  { text: 'Raccoon eyes may be delayed 1-3 days — absence does not rule out injury', nodeId: 'lefort-type2' },
  { text: 'Halo sign is nonspecific — confirm CSF with beta-2 transferrin', nodeId: 'lefort-csf' },
  { text: 'Le Fort II has increased mortality compared to isolated facial fractures', nodeId: 'lefort-type2' },
];

export const LE_FORT_FRACTURE_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: CLASSIFICATION
  // =====================================================================

  {
    id: 'lefort-start',
    type: 'info',
    module: 1,
    title: 'Le Fort Fracture — Overview',
    body: '[Le Fort Steps Summary](#/info/lefort-summary)\n\n**Definition:** Midface fractures involving separation of maxilla from skull base. [1][2]\n\n**Key Anatomical Rule:**\n⚠️ ALL Le Fort fractures require disruption of the **pterygoid plates**. If pterygoids are intact, it is NOT a Le Fort fracture.\n\n**Mechanism:** High-energy blunt trauma to midface:\n• Motor vehicle collisions (most common)\n• Assault/interpersonal violence\n• Falls from height\n• Sports injuries\n\n**Mixed patterns are common** — patients often have different Le Fort levels on each side (56.5% of cases).',
    images: [{ src: 'images/le-fort-fracture/lefort-classification.png', alt: 'Le Fort fracture classification — I, II, III fracture lines on facial skeleton', caption: 'Le Fort classification: I = horizontal (maxilla), II = pyramidal (nose + orbit), III = craniofacial disjunction. CC BY 3.0.' }],
    citation: [1, 2],
    next: 'lefort-exam',
    summary: 'Le Fort fractures: airway and hemorrhage are the immediate threats — secure airway first',
    safetyLevel: 'critical',
  },

  {
    id: 'lefort-exam',
    type: 'info',
    module: 1,
    title: 'Physical Examination Technique',
    body: '**Mobility Testing:** [1][2]\n\nPlace fingers on nasal bridge while mobilizing maxillary central incisors with other hand:\n\n| Finding | Fracture Type |\n|---------|---------------|\n| Only maxilla moves | **Le Fort I** |\n| Maxilla + nose move together | **Le Fort II** |\n| Entire midface + zygoma move | **Le Fort III** |\n\n**Memory Aid:**\n• Le Fort I = "Speak no evil" (involves mouth)\n• Le Fort II = "See no evil" (involves orbits)\n• Le Fort III = "Hear no evil" (involves zygoma near ears)\n\n**Which Le Fort pattern is present?**',
    citation: [1, 2],
    next: 'lefort-type-question',
    summary: 'Exam: midface mobility test — grasp anterior maxilla and check for movement at each level',
  },

  {
    id: 'lefort-type-question',
    type: 'question',
    module: 1,
    title: 'Le Fort Type',
    body: '**Select the fracture pattern identified:**\n\n[IMAGE: Le Fort Types Comparison](#/image/lefort-types)',
    options: [
      {
        label: 'Le Fort I (Floating Palate)',
        description: 'Alveolar process separates from upper face',
        next: 'lefort-type1',
      },
      {
        label: 'Le Fort II (Pyramidal)',
        description: 'Entire nasal complex mobile with central incisors',
        next: 'lefort-type2',
      },
      {
        label: 'Le Fort III (Craniofacial Disjunction)',
        description: 'Complete craniofacial separation',
        next: 'lefort-type3',
        urgency: 'critical',
      },
      {
        label: 'Mixed / Bilateral Different',
        description: 'Different levels on each side',
        next: 'lefort-mixed',
      },
    ],
    summary: 'Classify Le Fort level: I (floating palate), II (pyramidal), III (craniofacial disjunction)',
  },

  {
    id: 'lefort-type1',
    type: 'info',
    module: 1,
    title: 'Le Fort I — Horizontal Fracture',
    body: '**Also called:** Guerin Fracture, Floating Palate [1][2]\n\n**Fracture Line:**\nTransverse through maxilla above tooth roots, crossing:\n• Lateral nasal walls\n• Inferior maxillary sinus walls\n• Pterygoid plates\n\n**Unique Identifier:** Fracture of anterolateral margin of nasal fossa\n\n**Clinical Signs:**\n• Swollen upper lip\n• Anterior open bite malocclusion\n• Ecchymosis of maxillary buccal vestibule and palate\n• Mobile dental arch\n• Epistaxis\n\n**Mechanism:** Downward force applied below the nose\n\n[IMAGE: Le Fort I Anatomy](#/image/lefort-1-anatomy)',
    citation: [1, 2],
    next: 'lefort-airway-check',
    summary: 'Le Fort I: transverse maxillary fracture — floating palate, mobile alveolar ridge',
    skippable: true,
  },

  {
    id: 'lefort-type2',
    type: 'info',
    module: 1,
    title: 'Le Fort II — Pyramidal Fracture',
    body: '**Also called:** Pyramidal Fracture [1][2][3]\n\n**Fracture Line:**\nPyramid-shaped with base at teeth, apex at nasofrontal suture:\n• Nasal bones\n• Medial orbital walls\n• Orbital floor\n• Infraorbital rims\n• Lateral maxillary walls\n• Pterygoid plates\n\n**Unique Identifier:** Fracture of inferior orbital rim\n\n**Clinical Signs:**\n• Significant facial deformity and swelling\n• Bilateral periorbital edema and ecchymosis ("raccoon eyes")\n• Step-off at infraorbital rim (palpable)\n• Infraorbital nerve paresthesia (upper lip, nose)\n• Epistaxis\n• Possible CSF rhinorrhea\n• Diplopia (orbital floor involvement)\n\n⚠️ **Le Fort II is associated with increased mortality** compared to isolated facial fractures.\n\n[IMAGE: Le Fort II Anatomy](#/image/lefort-2-anatomy)',
    citation: [1, 2, 3],
    next: 'lefort-airway-check',
    summary: 'Le Fort II: pyramidal fracture through nasal bridge and orbital floor — CSF leak risk',
    safetyLevel: 'warning',
  },

  {
    id: 'lefort-type3',
    type: 'info',
    module: 1,
    title: 'Le Fort III — Craniofacial Disjunction',
    body: '**Also called:** Floating Face [1][2][3]\n\n**Fracture Line:**\nTransverse through:\n• Nasofrontal suture\n• Medial and lateral orbital walls\n• Zygomaticofrontal suture\n• Zygomatic arches\n• Pterygoid plates\n\n**Unique Identifier:** Zygomatic arch fracture\n\n**Clinical Signs:**\n• Complete craniofacial disjunction\n• "Dish-face deformity" — facial elongation and flattening\n• Bilateral periorbital edema and severe ecchymosis\n• Traumatic telecanthus (increased intercanthal distance)\n• Orbital hooding, enophthalmos\n• Mastoid ecchymosis (Battle sign) if basilar skull involved\n• CSF rhinorrhea/otorrhea (highest leak rate)\n• Hemotympanum\n• Anosmia\n• Severe epistaxis\n\n⚠️ **43.5% eventually require tracheostomy**\n\n[IMAGE: Le Fort III Anatomy](#/image/lefort-3-anatomy)',
    citation: [1, 2, 3],
    next: 'lefort-airway-check',
    summary: 'Le Fort III: craniofacial disjunction — entire face separates from skull, highest CSF leak risk',
    safetyLevel: 'critical',
  },

  {
    id: 'lefort-mixed',
    type: 'info',
    module: 1,
    title: 'Mixed Le Fort Patterns',
    body: '**Mixed patterns occur in 56.5% of cases** [1]\n\nPatients often have:\n• Different Le Fort levels on each side\n• Combinations of fracture types\n• Asymmetric involvement\n\n**Management Principle:**\nTreat to the HIGHEST level present.\n\nExample: Le Fort II on left + Le Fort III on right → Manage as Le Fort III\n\n**CT with 3D reconstruction** is essential for accurate classification and surgical planning.',
    citation: [1],
    next: 'lefort-airway-check',
    summary: 'Mixed patterns common — different Le Fort levels on each side, complicating surgical planning',
    skippable: true,
  },

  // =====================================================================
  // MODULE 2: AIRWAY MANAGEMENT
  // =====================================================================

  {
    id: 'lefort-airway-check',
    type: 'question',
    module: 2,
    title: 'Airway Assessment',
    body: '**Mechanisms of Airway Compromise:** [4][5]\n• Posterior-inferior displacement of fractured midface into oropharynx\n• Hemorrhage flooding upper airway\n• Soft tissue edema (may be delayed)\n• Foreign bodies (teeth, bone fragments, blood, vomitus)\n\n**Airway Statistics:** [4]\n• 80% secured by oro/nasotracheal intubation\n• 8% require urgent cricothyrotomy\n• 6% require tracheostomy\n• Le Fort III: 43.5% eventually require tracheostomy\n\n**Is there airway compromise or anticipated deterioration?**',
    citation: [4, 5],
    options: [
      {
        label: 'Airway Compromised / High Risk',
        description: 'Stridor, respiratory distress, inability to handle secretions, active hemorrhage',
        next: 'lefort-airway-decision',
        urgency: 'critical',
      },
      {
        label: 'Airway Currently Stable',
        description: 'Speaking clearly, no respiratory distress',
        next: 'lefort-hemorrhage-check',
      },
    ],
    summary: 'Assess airway: blood, edema, displaced fragments can rapidly obstruct — plan for difficult airway',
    safetyLevel: 'critical',
  },

  {
    id: 'lefort-airway-decision',
    type: 'info',
    module: 2,
    title: 'Airway Management — Approach',
    body: '⚠️ **CRITICAL CONTRAINDICATION:**\n**NEVER nasally intubate or place NG tube** in suspected Le Fort II/III — risk of intracranial passage through fractured cribriform plate. [4][5]\n\n**Preferred Approaches:** [4]\n1. **Video laryngoscopy with copious suction** — first-line in most cases\n2. **Awake intubation with ketamine** — for anticipated difficult airway\n3. **Retromolar intubation** — useful alternative when standard routes contraindicated\n4. **Surgical airway (cricothyrotomy)** — CICO scenario\n\n**Double Setup Approach:**\nPrepare for BOTH orotracheal intubation AND cricothyrotomy simultaneously. Allows rapid conversion if 1-2 laryngoscopy attempts fail.\n\n**Manual Reduction:**\nIn extremis, manually reducing the displaced maxilla forward can temporize airway obstruction and reduce bleeding.',
    citation: [4, 5],
    calculatorLinks: [
      { id: 'lemon-score', label: 'LEMON Score' },
    ],
    next: 'lefort-airway-approach',
    summary: 'Oral intubation preferred — do NOT nasally intubate Le Fort II/III (cribriform plate disruption risk)',
    safetyLevel: 'critical',
  },

  {
    id: 'lefort-airway-approach',
    type: 'info',
    module: 2,
    title: 'Intubation Technique',
    body: '**Positioning:** [4][5]\n• Maintain C-spine precautions (inline stabilization)\n• Slight reverse Trendelenburg if possible (reduces bleeding)\n• Suction IMMEDIATELY available\n\n**Technique:**\n1. Preoxygenation — maximize before attempt\n2. Video laryngoscopy with large-bore suction\n3. Have assistant apply manual reduction of midface if needed\n4. Limit to 1-2 attempts before surgical airway\n\n**Double Setup:**\n✓ Cricothyrotomy kit OPEN on table\n✓ Scalpel in hand of assistant\n✓ Bougie ready\n✓ 6.0 cuffed ETT ready for cric\n\n**RSI Medications:**\n• Ketamine 1-2 mg/kg (maintains respiratory drive if needed for awake)\n• Rocuronium 1.2 mg/kg (full dose for rapid onset)\n• Avoid succinylcholine if concern for hyperkalemia (crush injury)\n\n[IMAGE: Double Setup for Difficult Airway](#/image/double-setup)',
    citation: [4, 5],
    next: 'lefort-hemorrhage-check',
    summary: 'If oral intubation fails: surgical airway — avoid nasotracheal, avoid blind nasal passage in all Le Forts',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 3: HEMORRHAGE CONTROL
  // =====================================================================

  {
    id: 'lefort-hemorrhage-check',
    type: 'question',
    module: 3,
    title: 'Hemorrhage Assessment',
    body: '**Bleeding Risk by Type:** [3][6]\nLe Fort II and III have higher hemorrhage risk than other facial injuries.\n\n**Common Sources:**\n• Internal maxillary artery\n• Sphenopalatine artery branches\n• Can be life-threatening and obscure airway\n\n**Is there significant hemorrhage?**',
    citation: [3, 6],
    options: [
      {
        label: 'Significant Active Bleeding',
        description: 'Ongoing hemorrhage, hemodynamic impact',
        next: 'lefort-hemorrhage-control',
        urgency: 'critical',
      },
      {
        label: 'Minimal / Controlled Bleeding',
        description: 'Self-limited or easily controlled with pressure',
        next: 'lefort-csf',
      },
    ],
    summary: 'Massive midface hemorrhage common — posterior nasal packing, Foley balloon, prepare for intervention',
    safetyLevel: 'critical',
  },

  {
    id: 'lefort-hemorrhage-control',
    type: 'info',
    module: 3,
    title: 'Hemorrhage Control — Stepwise',
    body: '**Stepwise Approach:** [6][7]\n\n**1. Direct Pressure & Hemostatic Sutures**\n• Control lacerations\n• Pack oral cavity if needed\n\n**2. Anterior Nasal Packing**\n• Gauze soaked in 1:10,000 epinephrine\n• Commercial devices (Rapid Rhino, Merocel)\n• Can leave up to 48 hours\n\n**3. Posterior Nasal Packing / Balloon Tamponade**\n• Foley catheter: Insert through nose, inflate balloon (10-15 mL) in nasopharynx, apply anterior traction and secure\n• Double-balloon catheters: 70% success rate\n• Overall success: 48-83%\n• ⚠️ **Caution:** Risk of malposition intracranially if skull base fractured\n• **Requires:** Admission, telemetry (nasal-cardiac reflex), sometimes intubation\n\n[IMAGE: Posterior Nasal Packing Technique](#/image/posterior-packing)',
    citation: [6, 7],
    next: 'lefort-hemorrhage-refractory',
    summary: 'Anterior + posterior nasal packing — Foley catheter inflated in nasopharynx for posterior bleeding',
  },

  {
    id: 'lefort-hemorrhage-refractory',
    type: 'info',
    module: 3,
    title: 'Refractory Hemorrhage',
    body: '**If Packing Fails:** [6][7]\n\n**Interventional Radiology Embolization:**\n• Superselective embolization of maxillary artery branches\n• ~90% success rate\n• Less invasive than open ligation\n• Complications: Monocular blindness, stroke (rare but serious ~2%)\n\n**Surgical Ligation:**\n• Endoscopic sphenopalatine artery ligation: >85% success\n• Lower complication risk than embolization\n• Requires OR, general anesthesia\n\n**Manual Reduction:**\n• In extremis, manually reducing displaced maxilla forward can temporize bleeding\n• Grasp maxilla through mouth, pull anteriorly\n\n**Tranexamic Acid:**\nConsider TXA 1g IV if significant hemorrhage (off-label but reasonable in trauma).',
    citation: [6, 7],
    next: 'lefort-csf',
    summary: 'Refractory hemorrhage: interventional radiology for embolization — call early, do not wait',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 4: WORKUP & ASSOCIATED INJURIES
  // =====================================================================

  {
    id: 'lefort-csf',
    type: 'info',
    module: 4,
    title: 'CSF Leak Assessment',
    body: '**CSF Rhinorrhea/Otorrhea:** [2][3]\nIndicates skull base/cribriform plate fracture.\n\n**Detection:**\n• **Halo test:** Clear fluid diffusing around blood drop on filter paper\n• ⚠️ **Nonspecific** — mucus and tears can also create halos\n• **Confirmatory:** Beta-2 transferrin or beta-trace protein in fluid\n\n**Associated with:**\n• 40.7% have concurrent skull fracture\n• Highest leak rate in Le Fort III\n\n**Management if CSF Leak:**\n• Neurosurgery consult\n• Head of bed elevation\n• Avoid nose blowing, straining\n• Prophylactic antibiotics controversial — discuss with neurosurgery',
    citation: [2, 3],
    next: 'lefort-cspine',
    summary: 'Test for CSF leak: halo sign on gauze, beta-2 transferrin — do NOT pack nose if CSF rhinorrhea',
    safetyLevel: 'critical',
  },

  {
    id: 'lefort-cspine',
    type: 'info',
    module: 4,
    title: 'C-Spine & Associated Injuries',
    body: '**C-Spine Injury:** [3]\n• **Incidence:** 1.4-5.4% have cervical spine injuries\n• C5-C7 commonly involved\n• Maintain inline stabilization until cleared\n• Le Fort III has highest association with C-spine injury\n\n**Associated Injuries:** [3]\n\n| Injury | Incidence |\n|--------|-----------||\n| Skull fracture | 40.7% |\n| Traumatic brain injury | 5.4-10% |\n| Cervical spine injury | 1.4-5.4% |\n| Ocular injury | 24-28% |\n| Mandibular fracture | Common |\n| Dental avulsion | Common |\n\n⚠️ Le Fort III has highest association with cervical spine, intracranial, and neck vascular injuries.',
    citation: [3],
    next: 'lefort-imaging',
    summary: 'C-spine injury in 10% of midface fractures — immobilize until cleared',
    safetyLevel: 'warning',
  },

  {
    id: 'lefort-imaging',
    type: 'info',
    module: 4,
    title: 'Imaging Protocol',
    body: '**CT Face (Gold Standard):** [2][8]\n• Fine-cut CT (2-3mm slices)\n• Axial, coronal, and sagittal planes\n• Both bone and soft tissue windows\n\n**Key Findings to Identify:**\n• Pterygoid plate fractures (mandatory for diagnosis)\n• Anterolateral nasal fossa (Le Fort I)\n• Inferior orbital rim (Le Fort II)\n• Zygomatic arch (Le Fort III)\n\n**3D Reconstruction:**\n• Best method for classifying Le Fort fractures\n• Essential for surgical planning\n• Helps communicate injury extent\n\n**Additional Required Imaging:**\n• **CT Head:** Required — 40.7% have skull fractures, 5.4% TBI\n• **CT C-spine:** Required — maintain immobilization until cleared\n• **CT Angiography:** Consider if penetrating trauma or suspicion of major vascular injury\n\n[IMAGE: Le Fort CT Findings](#/image/lefort-ct)',
    citation: [2, 8],
    next: 'lefort-ocular',
    summary: 'CT face with 3D reconstruction — defines fracture pattern for surgical planning',
  },

  {
    id: 'lefort-ocular',
    type: 'info',
    module: 4,
    title: 'Ocular Assessment',
    body: '**Ocular Injury:** [3]\n• Present in 24-28% of facial fractures\n• Higher risk with Le Fort II and III (orbital involvement)\n\n**Examine For:**\n• Pupil irregularity\n• Hyphema\n• Restricted extraocular movements\n• Proptosis vs enophthalmos\n• Visual acuity changes\n• Afferent pupillary defect\n\n**Orbital Compartment Syndrome:**\n⚠️ **EMERGENCY** — Requires emergent lateral canthotomy if:\n• Tense globe with proptosis\n• Decreased visual acuity\n• Afferent pupillary defect\n• IOP >40 mmHg\n\n**Ophthalmology consult** for all Le Fort II/III fractures.',
    citation: [3],
    calculatorLinks: [
      { id: 'lateral-canthotomy', label: 'Lateral Canthotomy' },
    ],
    next: 'lefort-antibiotics',
    summary: 'Ophthalmology consult for orbital floor involvement — check VA, pupil reactivity, EOM',
    safetyLevel: 'warning',
  },

  {
    id: 'lefort-antibiotics',
    type: 'info',
    module: 4,
    title: 'Antibiotics',
    body: '**Indications:** [9]\n• Fractures communicating with sinuses or oral cavity (most Le Fort fractures)\n• CSF leak\n• Open wounds\n\n**Regimen:**\n• No evidence supports continuation beyond 24 hours post-operatively\n• Consider patient risk factors (elderly, diabetic, immunocompromised, smoker)\n\n**Typical Choices:**\n\n**Ampicillin-sulbactam (Unasyn)**\n• 3g IV q6h\n\n**OR if penicillin allergic:**\n\n**Ceftriaxone + Metronidazole**\n• Ceftriaxone 1-2g IV daily\n• Metronidazole 500mg IV q8h\n\n**Additional Medications:**\n• **Tetanus:** Update if indicated\n• **Steroids:** Reduce postoperative edema (per surgery)\n• **Analgesia:** Titrate IV opioids as needed',
    citation: [9],
    next: 'lefort-disposition',
    summary: 'Antibiotics if CSF leak or open fracture — avoid nasal instrumentation with CSF rhinorrhea',
    skippable: true,
  },

  // =====================================================================
  // MODULE 5: DISPOSITION
  // =====================================================================

  {
    id: 'lefort-disposition',
    type: 'info',
    module: 5,
    title: 'Disposition',
    body: '**Most Le Fort fractures require admission.** [3][9]\n\n**ICU Admission Indications:**\n• Airway compromise or high risk of deterioration\n• Intubated patient\n• Active hemorrhage requiring ongoing management\n• Significant TBI\n• Hemodynamic instability\n• CSF leak with skull base fracture\n\n**Floor Admission:**\n• Stable Le Fort I or II without airway concerns\n• No active bleeding\n• No significant associated injuries\n• IV antibiotics for open/sinus fractures\n\n**Surgical Timing:** [9]\n• **Ideal:** 7-14 days post-injury (allows edema to subside)\n• **Earlier if:** Airway compromise, persistent hemorrhage, globe injury\n• **Emergent:** Airway obstruction, uncontrolled hemorrhage, orbital compartment syndrome',
    citation: [3, 9],
    next: 'lefort-consults',
    summary: 'Admit all Le Fort fractures — OR for reduction and fixation, monitor for complications',
  },

  {
    id: 'lefort-consults',
    type: 'info',
    module: 5,
    title: 'Specialty Consults',
    body: '**Required Consults:**\n\n| Specialty | When |\n|-----------|------|\n| **OMFS / Facial Trauma Surgery** | All Le Fort fractures |\n| **Neurosurgery** | CSF leak, skull base fracture, intracranial hemorrhage |\n| **Ophthalmology** | Orbital involvement, visual complaints, periocular injury |\n| **Trauma Surgery** | Polytrauma, associated injuries |\n| **ENT** | Complex nasal/sinus involvement |\n| **Interventional Radiology** | Refractory hemorrhage |\n\n**Discharge Considerations (Rare):**\n• Stable, minimally displaced Le Fort I\n• Full dentition (natural MMF possible)\n• No airway concerns\n• Reliable follow-up within 24-48 hours with OMFS\n• Return precautions for airway deterioration',
    citation: [3, 9],
    next: 'lefort-summary-end',
    summary: 'OMFS or plastic surgery for fixation, ENT for nasal packing, ophthalmology for orbital involvement',
  },

  {
    id: 'lefort-summary-end',
    type: 'result',
    module: 5,
    title: 'Le Fort Fracture — Summary',
    body: '**Key Takeaways:**\n\n✓ All Le Fort fractures involve pterygoid plates\n✓ NEVER nasally intubate Le Fort II/III\n✓ Double setup: Cric kit OPEN when intubating\n✓ C-spine injury until proven otherwise\n✓ 40.7% have associated skull fractures\n✓ Le Fort II has increased mortality\n✓ OMFS consult for all Le Fort fractures\n✓ Surgery typically 7-14 days post-injury\n\n**Disposition:**\n• Most require admission\n• ICU if airway concern, active hemorrhage, or TBI\n• Discharge rare — only stable Le Fort I with close follow-up',
    recommendation: 'Admit for observation. OMFS consult. CT face with 3D reconstruction. CT head and C-spine. Ophthalmology if orbital involvement.',
    summary: 'Priorities: secure airway (no nasal), control hemorrhage, check for CSF leak, admit for OR repair',
  },
];

export const LE_FORT_FRACTURE_MODULE_LABELS = [
  'Classification',
  'Airway Management',
  'Hemorrhage Control',
  'Workup',
  'Disposition',
];

export const LE_FORT_FRACTURE_CITATIONS: Citation[] = [
  { num: 1, text: 'Le Fort R. Etude expérimentale sur les fractures de la machoire supérieure. Rev Chir Paris. 1901;23:208-227, 360-379, 479-507.' },
  { num: 2, text: 'Nguyen M, Koshy JC, Hollier LH Jr. Pearls of nasoorbitoethmoid trauma management. Semin Plast Surg. 2010;24(4):383-388.' },
  { num: 3, text: 'Mundinger GS, et al. Le Fort Fractures: Current Classification, Evaluation, and Management. JAMA Facial Plast Surg. 2013;15(2):108-113.' },
  { num: 4, text: 'Kovács AF, Ghahremani M. Minimization of ischemic tissue necrosis by careful dissection and early revascularization. Br J Oral Maxillofac Surg. 2001;39:429-435.' },
  { num: 5, text: 'Krausz AA, El-Naaj IA, Bhavi M. Maxillofacial and neck trauma: A damage control approach. World J Emerg Surg. 2009;4:31.' },
  { num: 6, text: 'Cogbill TH, et al. Management of maxillofacial injuries with severe oronasal hemorrhage: A multicenter perspective. J Trauma. 2008;65(5):994-999.' },
  { num: 7, text: 'Shimoyama T, et al. Control of massive hemorrhage in maxillofacial injuries. J Oral Maxillofac Surg. 2003;61(7):766-770.' },
  { num: 8, text: 'Hopper RA, Salemy S, Sze RW. Diagnosis of midface fractures with CT: what the surgeon needs to know. Radiographics. 2006;26(3):783-793.' },
  { num: 9, text: 'Ellis E III, Zide MF. Surgical Approaches to the Facial Skeleton. 3rd ed. Philadelphia: Wolters Kluwer; 2019.' },
];
