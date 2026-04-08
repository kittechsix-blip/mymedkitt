// MedKitt — Comprehensive Dental Trauma
// Ellis fractures, luxations, alveolar fractures, avulsion management
// 7 modules: Assessment → Ellis Fractures → Luxations → Alveolar Fractures → Avulsion → Medications → Disposition
// Based on IADT 2020 Guidelines, Roberts & Hedges, EB Medicine

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const DENTAL_TRAUMA_CRITICAL_ACTIONS = [
  { text: 'Ellis III = EMERGENCY - exposed pulp viable only 3-6 hours, apply calcium hydroxide + same-day dental', nodeId: 'dental-ellis3' },
  { text: 'Permanent tooth avulsion: TIME IS TOOTH - reimplant within 60 min, store in milk or HBSS', nodeId: 'dental-avulsion-permanent' },
  { text: 'NEVER reimplant primary (baby) teeth - risk of damaging permanent tooth bud', nodeId: 'dental-avulsion-primary' },
  { text: 'Handle avulsed tooth by CROWN only - never touch or scrub the root', nodeId: 'dental-avulsion-handling' },
  { text: 'Intrusion >3mm needs surgical repositioning - do not force eruption', nodeId: 'dental-intrusion' },
  { text: 'Alveolar fracture = open fracture - requires antibiotics and rigid splinting 4 weeks', nodeId: 'dental-alveolar' },
  { text: 'Flexible splint 7-14 days for most luxations - rigid splints cause ankylosis', nodeId: 'dental-splinting' },
  { text: 'Account for all tooth fragments - CXR if aspiration suspected', nodeId: 'dental-fragments' },
];

export const DENTAL_TRAUMA_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'dental-trauma-start',
    type: 'info',
    module: 1,
    title: 'Dental Trauma — Assessment',
    body: '[Dental Trauma Steps Summary](#/info/dental-trauma-steps)\n\n**Dental trauma classification:** [1][2]\n\n**Crown Fractures (Ellis Classification):**\n• Ellis I — Enamel only\n• Ellis II — Enamel + Dentin\n• Ellis III — Enamel + Dentin + Pulp exposure\n\n**Luxation Injuries:**\n• Concussion, Subluxation\n• Extrusive, Lateral, Intrusive luxation\n\n**Other:**\n• Root fractures\n• Alveolar fractures\n• Avulsion (complete displacement)\n\n**First priority:** Locate ALL tooth fragments. If not found, CXR to rule out aspiration. [1]',
    citation: [1, 2],
    images: [
      {
        src: 'images/dental-trauma/tooth-anatomy.png',
        alt: 'Cross-section of tooth anatomy showing enamel (outermost), dentin (middle), and pulp (innermost) layers — the basis for Ellis fracture classification',
        caption: 'Tooth anatomy: Ellis I = enamel, Ellis II = dentin, Ellis III = pulp exposed. Source: WikEM (CC).',
      },
    ],
    next: 'dental-primary-or-permanent',
  },

  {
    id: 'dental-primary-or-permanent',
    type: 'question',
    module: 1,
    title: 'Primary or Permanent Dentition?',
    body: '**Critical distinction affects management:** [1][2]\n\n| Feature | Primary (Baby) | Permanent |\n|---------|---------------|----------|\n| **Age** | Typically <6 years | >6 years |\n| **Size** | Smaller, whiter | Larger, yellowish |\n| **Shape** | Bulbous, rounded | More angular |\n| **Root** | Short, tapered | Long, blunted |\n| **Count** | 20 total | 32 total |\n\n**Mixed dentition (ages 6-12):** Both present\n\n**Key differences in management:**\n• Primary avulsion: NEVER reimplant\n• Primary intrusion: Allow spontaneous eruption\n• Permanent teeth: More aggressive intervention',
    citation: [1, 2],
    options: [
      {
        label: 'Primary (Baby) Teeth',
        description: 'Typically age <6, smaller whiter teeth',
        next: 'dental-primary-management',
      },
      {
        label: 'Permanent Teeth',
        description: 'Age >6, larger more angular teeth',
        next: 'dental-injury-type',
      },
      {
        label: 'Mixed Dentition',
        description: 'Both primary and permanent affected',
        next: 'dental-injury-type',
      },
    ],
  },

  {
    id: 'dental-primary-management',
    type: 'info',
    module: 1,
    title: 'Primary Tooth Trauma — Key Principles',
    body: '**Primary teeth management is CONSERVATIVE:** [1][3]\n\n**Avulsion:**\n• NEVER reimplant — risk of damaging permanent tooth bud\n• Control bleeding with pressure\n• Soft diet 2-3 days\n• Dental follow-up 1-2 weeks\n\n**Luxation:**\n• Observation usually sufficient\n• Extract only if severely mobile and aspiration risk\n• Monitor for infection, color change\n\n**Intrusion:**\n• Allow spontaneous re-eruption (5-8 weeks)\n• Do NOT attempt to pull out\n• Refer if no eruption by 8 weeks\n\n**Fractures:**\n• Ellis I-II: Smooth edges, dental follow-up\n• Ellis III: Calcium hydroxide if accessible, dental referral\n\n**Main concern:** Damage to underlying permanent tooth bud (20-30% risk with severe trauma) [3]',
    citation: [1, 3],
    next: 'dental-injury-type',
  },

  {
    id: 'dental-injury-type',
    type: 'question',
    module: 1,
    title: 'Type of Dental Injury?',
    body: '**Identify the primary injury pattern:** [1][2]\n\n**Examine for:**\n• Crown damage (fracture line, exposed dentin/pulp)\n• Tooth mobility (compared to adjacent teeth)\n• Tooth position (displaced, intruded, extruded)\n• Gingival bleeding\n• Occlusion changes (bite feels "off")\n• Empty socket (avulsion)',
    citation: [1, 2],
    options: [
      {
        label: 'Crown Fracture (Ellis)',
        description: 'Chipped or broken tooth surface',
        next: 'dental-ellis-assess',
      },
      {
        label: 'Luxation Injury',
        description: 'Tooth loose, displaced, or pushed into bone',
        next: 'dental-luxation-type',
      },
      {
        label: 'Alveolar Fracture',
        description: 'Segment of teeth + bone moves together',
        next: 'dental-alveolar',
      },
      {
        label: 'Avulsion',
        description: 'Tooth completely out of socket',
        next: 'dental-avulsion-assess',
      },
      {
        label: 'Multiple/Combined',
        description: 'More than one injury type',
        next: 'dental-ellis-assess',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: ELLIS FRACTURES
  // =====================================================================

  {
    id: 'dental-ellis-assess',
    type: 'question',
    module: 2,
    title: 'Ellis Classification',
    body: '**Identify fracture depth:** [1][4]\n\n[IMAGE: Ellis Classification Diagram](#/image/dental-ellis-classification)\n\n**Ellis I — Enamel only:**\n• Smooth, whitish chip\n• No sensitivity to air/cold\n• Routine dental follow-up\n\n**Ellis II — Enamel + Dentin:**\n• Yellow/ivory dentin exposed\n• Sensitive to air, touch, temperature\n• May have slight bleeding\n\n**Ellis III — Enamel + Dentin + PULP:**\n• Pink pulp tissue visible or bleeding\n• Severe pain\n• **DENTAL EMERGENCY**',
    citation: [1, 4],
    options: [
      {
        label: 'Ellis I — Enamel Only',
        description: 'White chip, no sensitivity',
        next: 'dental-ellis1',
      },
      {
        label: 'Ellis II — Dentin Exposed',
        description: 'Yellow layer visible, temperature sensitive',
        next: 'dental-ellis2',
      },
      {
        label: 'Ellis III — Pulp Exposed',
        description: 'Pink tissue or active bleeding from tooth',
        next: 'dental-ellis3',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'dental-ellis1',
    type: 'result',
    module: 2,
    title: 'Ellis I — Enamel Fracture',
    body: '**Enamel-only fracture — lowest urgency:** [1][4]\n\n**Exam findings:**\n• White, chalky chip\n• Smooth or rough edges\n• No temperature sensitivity\n• No bleeding\n\n**ED Management:**\n• File/smooth rough edges if causing lip irritation\n• Can use emery board or fine file\n• Reassure patient\n\n**No urgency for dental referral.**\n\n**Discharge instructions:**\n• Routine dental follow-up (days to weeks)\n• Cosmetic repair if desired\n• Return if pain develops (may indicate deeper injury)',
    recommendation: 'Smooth rough edges if needed. Routine dental follow-up. No urgent intervention required.',
    confidence: 'definitive',
    citation: [1, 4],
  },

  {
    id: 'dental-ellis2',
    type: 'result',
    module: 2,
    title: 'Ellis II — Dentin Exposure',
    body: '**Dentin exposed — protect from sensitivity and infection:** [1][4]\n\n**Exam findings:**\n• Yellow/ivory dentin visible\n• Sensitive to air, cold, touch\n• May have slight bleeding from dentinal tubules\n\n**ED Management:**\n1. Irrigate with saline\n2. Apply **calcium hydroxide paste** to exposed dentin\n3. Cover with **glass ionomer cement** or dental wax\n4. Alternative: Aluminum foil barrier\n\n[IMAGE: Ellis II Dentin Coverage](#/image/dental-ellis2-coverage)\n\n**Medications:**\n• Ibuprofen 400-600 mg Q6h PRN\n• Acetaminophen 1000 mg Q6-8h PRN\n\n**Disposition:**\n• Urgent dental follow-up within **24 hours**\n• Soft diet\n• Avoid extreme temperatures',
    recommendation: 'Cover exposed dentin with calcium hydroxide + temporary seal. Dental follow-up within 24 hours.',
    confidence: 'definitive',
    citation: [1, 4],
    treatment: {
      firstLine: {
        drug: 'Calcium hydroxide paste',
        dose: 'Apply thin layer over exposed dentin',
        route: 'Topical',
        frequency: 'Once',
        duration: 'Until dental follow-up',
        notes: 'Cover with glass ionomer, zinc oxide, or foil barrier',
      },
      monitoring: 'Dental follow-up within 24 hours for definitive treatment',
    },
  },

  {
    id: 'dental-ellis3',
    type: 'result',
    module: 2,
    title: 'Ellis III — PULP EXPOSURE',
    body: '**DENTAL EMERGENCY — Pulp viable only 3-6 hours:** [1][4][5]\n\n**Exam findings:**\n• Pink pulp tissue visible\n• Active bleeding from tooth center\n• Severe pain\n\n**ED Management — Time Critical:**\n1. **Control bleeding:** Gentle pressure with saline gauze × 3-5 min\n2. **Apply calcium hydroxide paste** directly over exposed pulp\n3. **Cover/seal:** Glass ionomer cement, zinc oxide, or foil\n4. **SAME-DAY dental referral** — ideally within 3 hours\n\n[IMAGE: Ellis III Pulp Capping](#/image/dental-ellis3-treatment)\n\n**Antibiotics:**\n• [Amoxicillin](#/drug/amoxicillin/dental) 500 mg TID × 5 days\n• PCN allergy: [Clindamycin](#/drug/clindamycin/dental) 300 mg TID × 5 days\n\n**Prognosis:**\n• <3 hours: 60-70% pulp survival\n• 3-6 hours: 30-40%\n• >6 hours: <20% (root canal likely needed)',
    recommendation: 'EMERGENCY: Apply calcium hydroxide, seal, antibiotics. Same-day dental referral required.',
    confidence: 'definitive',
    citation: [1, 4, 5],
    treatment: {
      firstLine: {
        drug: 'Amoxicillin',
        dose: '500 mg',
        route: 'PO',
        frequency: 'TID',
        duration: '5 days',
        notes: 'Start immediately for pulp exposure',
      },
      alternative: {
        drug: 'Clindamycin',
        dose: '300 mg',
        route: 'PO',
        frequency: 'TID',
        duration: '5 days',
        notes: 'Penicillin allergy',
      },
      monitoring: 'Same-day dental referral for definitive pulp capping or root canal',
    },
  },

  // =====================================================================
  // MODULE 3: LUXATION INJURIES
  // =====================================================================

  {
    id: 'dental-luxation-type',
    type: 'question',
    module: 3,
    title: 'Luxation Type',
    body: '**Classify the luxation injury:** [1][2][6]\n\n**Concussion:** Tender to percussion, no mobility, no displacement\n\n**Subluxation:** Loose but in normal position\n\n**Extrusive:** Tooth pushed partially OUT of socket (appears longer)\n\n**Lateral:** Tooth displaced forward/backward/sideways\n\n**Intrusive:** Tooth pushed INTO the bone (appears shorter)\n\n[IMAGE: Luxation Types Diagram](#/image/dental-luxation-types)',
    citation: [1, 2, 6],
    options: [
      {
        label: 'Concussion',
        description: 'Tender but not loose, normal position',
        next: 'dental-concussion',
      },
      {
        label: 'Subluxation',
        description: 'Loose but in normal position',
        next: 'dental-subluxation',
      },
      {
        label: 'Extrusive Luxation',
        description: 'Tooth pushed outward, appears longer',
        next: 'dental-extrusive',
      },
      {
        label: 'Lateral Luxation',
        description: 'Tooth displaced forward/backward',
        next: 'dental-lateral',
      },
      {
        label: 'Intrusive Luxation',
        description: 'Tooth pushed into bone, appears shorter',
        next: 'dental-intrusion',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'dental-concussion',
    type: 'result',
    module: 3,
    title: 'Concussion — Minimal Injury',
    body: '**Tooth tender but stable:** [1][6]\n\n**Exam findings:**\n• Pain to percussion (tapping tooth)\n• NO mobility\n• NO displacement\n• Normal X-ray\n\n**Management:**\n• Observation only\n• Soft diet × 2 weeks\n• Monitor for color change (sign of necrosis)\n\n**No splinting required.**\n\n**Follow-up:**\n• Dental check if symptoms persist\n• Return if tooth darkens or pain worsens\n\n**Prognosis:** Excellent — pulp necrosis rare (~3%)',
    recommendation: 'Observation only. Soft diet. Follow up if pain persists or tooth discolors.',
    confidence: 'definitive',
    citation: [1, 6],
  },

  {
    id: 'dental-subluxation',
    type: 'result',
    module: 3,
    title: 'Subluxation — Loose Tooth',
    body: '**Tooth loose but not displaced:** [1][6]\n\n**Exam findings:**\n• Increased mobility (wiggles)\n• Normal position\n• May have gingival bleeding\n• Tender to percussion\n\n**Management:**\n• **Flexible splint × 2 weeks** (if significantly mobile)\n• Soft diet\n• Chlorhexidine rinse 0.12% BID × 1 week\n\n**Splinting technique:**\n• Wire-composite or resin-bonded\n• Do NOT use rigid splints (causes ankylosis)\n\n**Antibiotics:** Not routinely indicated\n\n**Follow-up:**\n• Dental within 1 week\n• Monitor for pulp necrosis (color change)',
    recommendation: 'Flexible splint if significantly loose. Soft diet. Dental follow-up within 1 week.',
    confidence: 'definitive',
    citation: [1, 6],
  },

  {
    id: 'dental-extrusive',
    type: 'result',
    module: 3,
    title: 'Extrusive Luxation',
    body: '**Tooth pushed outward — reposition and splint:** [1][6]\n\n**Exam findings:**\n• Tooth appears longer than adjacent teeth\n• Very loose\n• Elevated from socket\n\n**ED Management:**\n1. **Reposition:** Gentle finger pressure back into socket\n2. **Verify occlusion:** Should meet normally with bite\n3. **Flexible splint × 2 weeks**\n\n**Anesthesia:** Local infiltration if needed for repositioning\n\n**Medications:**\n• Chlorhexidine rinse 0.12% BID\n• Analgesics PRN\n• Antibiotics not routinely needed\n\n**Follow-up:**\n• Dental within 24-48 hours\n• Monitor for pulp necrosis — may need root canal\n\n**Prognosis:** Moderate — higher necrosis risk than subluxation',
    recommendation: 'Reposition gently into socket, flexible splint × 2 weeks. Dental follow-up 24-48h.',
    confidence: 'definitive',
    citation: [1, 6],
  },

  {
    id: 'dental-lateral',
    type: 'result',
    module: 3,
    title: 'Lateral Luxation',
    body: '**Tooth displaced forward or backward — reposition carefully:** [1][6]\n\n**Exam findings:**\n• Tooth angled forward (labially) or backward (palatally/lingually)\n• Usually locked in position due to alveolar bone impaction\n• Occlusion disturbed\n• High-pitched percussion sound\n\n**ED Management:**\n1. **Reposition first** (before bone reduction if fractured)\n2. Firm digital pressure to unlock and guide back\n3. May need to disengage from bony lock\n4. **Flexible splint × 2 weeks**\n\n**Imaging:** Periapical + occlusal X-rays to rule out root/alveolar fracture\n\n**High risk for pulp necrosis (~77%)** — prepare patient for likely root canal\n\n**Consider antibiotics** if alveolar fracture suspected\n\n**Follow-up:** Dental within 24 hours',
    recommendation: 'Reposition and flexible splint × 2 weeks. High necrosis risk. Dental follow-up within 24h.',
    confidence: 'definitive',
    citation: [1, 6],
  },

  {
    id: 'dental-intrusion',
    type: 'result',
    module: 3,
    title: 'Intrusive Luxation',
    body: '**Tooth pushed INTO bone — management depends on depth:** [1][6][7]\n\n**Exam findings:**\n• Tooth appears shorter than neighbors\n• May be partially covered by gum\n• Minimal mobility (locked in bone)\n• High-pitched percussion sound\n\n[IMAGE: Intrusion Depth Assessment](#/image/dental-intrusion)\n\n**Management by depth:**\n\n| Depth | Permanent Teeth | Primary Teeth |\n|-------|-----------------|---------------|\n| **<3 mm** | Allow spontaneous eruption (4-6 weeks) | Allow eruption |\n| **3-7 mm** | Orthodontic traction OR surgical repositioning | Refer pediatric dentist |\n| **>7 mm** | Surgical repositioning, splint × 4 weeks | May need extraction |\n\n**DO NOT attempt to pull out intruded tooth manually.**\n\n**Pulp prognosis:** Near 100% necrosis in mature teeth. Root canal typically needed within 2 weeks.\n\n**Follow-up:** Same-day dental/oral surgery referral for >3mm intrusion',
    recommendation: 'Management based on depth. >3mm needs surgical repositioning. Same-day referral.',
    confidence: 'definitive',
    citation: [1, 6, 7],
  },

  // =====================================================================
  // MODULE 4: ALVEOLAR FRACTURES
  // =====================================================================

  {
    id: 'dental-alveolar',
    type: 'result',
    module: 4,
    title: 'Alveolar Fracture',
    body: '**Fracture of bone housing teeth — ORAL SURGERY REFERRAL:** [1][8]\n\n**Exam findings:**\n• Multiple teeth move TOGETHER as a segment\n• Palpable bone step deformity\n• Malocclusion (bite feels "off")\n• Gingival bleeding\n\n**Imaging:** Periapical, occlusal, panorex, ± CBCT\n\n**ED Management:**\n1. **Closed reduction** under local anesthesia (before swelling)\n2. **Reposition teeth FIRST** if luxated (then reduce bone)\n3. **Splinting:** Rigid or semi-rigid × **3-4 weeks**\n4. **Antibiotics** (open fracture):\n   • [Amoxicillin](#/drug/amoxicillin/dental) 500 mg TID × 5-7 days\n   • Or [Cephalexin](#/drug/cephalexin/dental) 500 mg QID\n5. **Tetanus** update if indicated\n\n**Referral:** Oral surgery same day for definitive splinting\n\n**Complex fractures may need ORIF.**',
    recommendation: 'Alveolar fracture = open fracture. Reduce, splint 3-4 weeks, antibiotics. Oral surgery referral.',
    confidence: 'definitive',
    citation: [1, 8],
    treatment: {
      firstLine: {
        drug: 'Amoxicillin',
        dose: '500 mg',
        route: 'PO',
        frequency: 'TID',
        duration: '5-7 days',
        notes: 'Alveolar fracture = open fracture, antibiotics indicated',
      },
      monitoring: 'Oral surgery same-day for definitive splinting, 3-4 week healing',
    },
  },

  // =====================================================================
  // MODULE 5: AVULSION
  // =====================================================================

  {
    id: 'dental-avulsion-assess',
    type: 'question',
    module: 5,
    title: 'Tooth Avulsion',
    body: '**Complete displacement from socket — TIME CRITICAL:** [1][2][9]\n\n**Reimplantation success drops rapidly:**\n• <5 min dry: ~95% survival\n• 15 min dry: ~80%\n• 30 min dry: ~50%\n• >60 min dry: Poor prognosis\n\n**First:** Confirm primary vs. permanent tooth\n\n**NEVER reimplant primary teeth** — damages permanent bud',
    citation: [1, 2, 9],
    options: [
      {
        label: 'Primary Tooth Avulsion',
        description: 'Baby tooth out of socket',
        next: 'dental-avulsion-primary',
      },
      {
        label: 'Permanent Tooth Avulsion',
        description: 'Adult tooth out of socket',
        next: 'dental-avulsion-permanent',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'dental-avulsion-primary',
    type: 'result',
    module: 5,
    title: 'Primary Tooth Avulsion',
    body: '**DO NOT REIMPLANT primary teeth:** [1][3]\n\n**Risks of reimplanting primary teeth:**\n• Damage to underlying permanent tooth bud\n• Ankylosis interfering with eruption\n• Infection\n\n**Management:**\n• Reassure parents — this is the correct approach\n• Control bleeding with gauze pressure\n• Soft diet × 2-3 days\n• Ice for swelling\n\n**Assess for associated injuries:**\n• Check for alveolar fracture\n• X-ray if fragment may be embedded\n\n**Follow-up:**\n• Dental within 1-2 weeks\n• Monitor for damage to permanent successor (20-30% risk)\n\n**Counsel family:** Space maintainer may be needed if tooth lost early',
    recommendation: 'DO NOT reimplant. Control bleeding, reassure family, dental follow-up 1-2 weeks.',
    confidence: 'definitive',
    citation: [1, 3],
  },

  {
    id: 'dental-avulsion-permanent',
    type: 'info',
    module: 5,
    title: 'Permanent Tooth Avulsion — EMERGENCY',
    body: '**TIME IS TOOTH — Act immediately:** [1][2][9]\n\n**Step 1: Locate the tooth**\nIf not found → CXR to rule out aspiration\n\n**Step 2: Handle by CROWN only**\nNEVER touch, scrub, or dry the root\n\n**Step 3: If dirty, rinse briefly**\n• <10 seconds under cold running water\n• Do NOT scrub or use chemicals\n\n**Step 4: Optimal storage (if not reimplanting immediately)**\n\n| Medium | Duration | Notes |\n|--------|----------|-------|\n| **HBSS** | Up to 24h | GOLD standard |\n| **Cold milk** | Up to 6h | Excellent, accessible |\n| **Saliva** | <30 min | Place in buccal vestibule |\n| **Saline** | <1h | Acceptable |\n| **Water** | <5 min | AVOID — hypotonic |\n\n[IMAGE: Tooth Handling and Storage](#/image/dental-avulsion-storage)',
    citation: [1, 2, 9],
    next: 'dental-avulsion-reimplant',
  },

  {
    id: 'dental-avulsion-reimplant',
    type: 'info',
    module: 5,
    title: 'Reimplantation Technique',
    body: '**Reimplant in ED if dentist not available within 30 min:** [1][9]\n\n**Technique:**\n1. Rinse socket with saline (remove clot gently)\n2. Rinse tooth root briefly (<10 sec cold water)\n3. Insert tooth into socket with gentle pressure\n4. Have patient bite on gauze to stabilize\n5. Verify correct orientation (facial surface forward)\n6. Check occlusion\n\n[IMAGE: Tooth Reimplantation Steps](#/image/dental-reimplantation)\n\n**If resistance encountered:**\n• Do not force\n• Clot may be blocking — suction gently\n• If still difficult, refer to dentist\n\n**Splinting:**\n• Flexible splint × **7-10 days** (if <60 min dry)\n• Flexible splint × **14 days** (if >60 min dry)\n\n**Temporizing:** If splinting materials unavailable, patient bites on gauze, dental referral ASAP',
    citation: [1, 9],
    next: 'dental-avulsion-meds',
  },

  {
    id: 'dental-avulsion-meds',
    type: 'result',
    module: 5,
    title: 'Avulsion — Medications & Follow-up',
    body: '**Post-reimplantation care:** [1][2][9]\n\n**Antibiotics (strongly recommended):**\n• [Doxycycline](#/drug/doxycycline/dental) 100 mg day 1, then 50 mg × 4 days (PREFERRED — anti-resorptive)\n• Alternative: [Amoxicillin](#/drug/amoxicillin/dental) 500 mg TID × 5 days\n• Pediatric (<8 years): Amoxicillin 25 mg/kg TID × 5 days\n• PCN allergy: [Clindamycin](#/drug/clindamycin/dental) 300 mg TID × 5 days\n\n**Tetanus:** Update if >5 years or dirty wound\n\n**Mouth care:**\n• Chlorhexidine 0.12% rinse BID × 1 week\n• Soft foods only\n• No chewing on reimplanted tooth\n\n**Follow-up:**\n• **Dental within 24-48 hours** — MANDATORY\n• Root canal typically needed within 2-4 weeks\n• Long-term: 50% survive 5+ years even with optimal care\n\n**Return precautions:** Increased looseness, fever, worsening pain',
    recommendation: 'Antibiotics (doxycycline preferred), tetanus update, mandatory dental follow-up 24-48h.',
    confidence: 'definitive',
    citation: [1, 2, 9],
    treatment: {
      firstLine: {
        drug: 'Doxycycline',
        dose: '100 mg day 1, then 50 mg daily',
        route: 'PO',
        frequency: 'Daily',
        duration: '5 days total',
        notes: 'Preferred for anti-resorptive properties. Avoid if <8 years old.',
      },
      alternative: {
        drug: 'Amoxicillin',
        dose: '500 mg (adult) or 25 mg/kg (peds)',
        route: 'PO',
        frequency: 'TID',
        duration: '5 days',
        notes: 'Use if doxycycline contraindicated',
      },
      monitoring: 'Mandatory dental follow-up 24-48h. Root canal typically needed within 2-4 weeks.',
    },
  },

  // =====================================================================
  // MODULE 6: SPLINTING
  // =====================================================================

  {
    id: 'dental-splinting',
    type: 'info',
    module: 6,
    title: 'Splinting Techniques',
    body: '**Splinting principles:** [1][6]\n\n**FLEXIBLE splints preferred** (allow physiologic motion)\n• Wire-composite\n• Resin-bonded\n• Soft wire + adhesive\n\n**RIGID splints increase ankylosis risk** — avoid if possible\n\n**Duration by injury:**\n\n| Injury | Splint Type | Duration |\n|--------|-------------|----------|\n| Subluxation | Flexible | 2 weeks |\n| Extrusive | Flexible | 2 weeks |\n| Lateral | Flexible | 2 weeks |\n| Intrusion | Flexible | 4 weeks |\n| Avulsion <60 min | Flexible | 7-10 days |\n| Avulsion >60 min | Flexible | 14 days |\n| Alveolar fx | Semi-rigid | 4 weeks |\n| Root fx (cervical) | Flexible | 4 weeks |\n\n[IMAGE: Splinting Technique](#/image/dental-splinting)\n\n**ED Temporizing:**\n• Aluminum foil molded to teeth\n• Dental wax\n• Patient bites gauze until dental follow-up',
    citation: [1, 6],
    next: 'dental-disposition',
  },

  // =====================================================================
  // MODULE 7: DISPOSITION
  // =====================================================================

  {
    id: 'dental-disposition',
    type: 'result',
    module: 7,
    title: 'Dental Trauma — Disposition Summary',
    body: '**Follow-up timing by injury:** [1][2]\n\n| Injury | Urgency | Follow-up |\n|--------|---------|----------|\n| Ellis I | Routine | Days to weeks |\n| Ellis II | Urgent | 24 hours |\n| **Ellis III** | **EMERGENCY** | **Same day (<3h ideal)** |\n| Concussion | Routine | PRN |\n| Subluxation | Urgent | 1 week |\n| Extrusive | Urgent | 24-48 hours |\n| Lateral | Urgent | 24 hours |\n| **Intrusion >3mm** | **EMERGENCY** | **Same day** |\n| **Avulsion** | **EMERGENCY** | **24-48 hours** |\n| **Alveolar fx** | **EMERGENCY** | **Same day (oral surgery)** |\n\n**All patients:**\n• Soft diet\n• Chlorhexidine rinse if any splinting/wound\n• Return precautions: fever, increased pain/swelling, loosening\n• Tetanus update if indicated\n\n**Document:** Time of injury, storage medium, interventions performed',
    recommendation: 'Disposition based on injury severity. All splinted teeth need dental follow-up. Ellis III/avulsion/alveolar fx = same-day.',
    confidence: 'definitive',
    citation: [1, 2],
  },

];

export const DENTAL_TRAUMA_MODULE_LABELS = [
  'Assessment',
  'Ellis Fractures',
  'Luxations',
  'Alveolar Fractures',
  'Avulsion',
  'Splinting',
  'Disposition',
];

export const DENTAL_TRAUMA_CITATIONS: Citation[] = [
  { num: 1, text: 'International Association of Dental Traumatology (IADT). 2020 Guidelines for Management of Traumatic Dental Injuries.' },
  { num: 2, text: 'Roberts JR, Hedges JR. Clinical Procedures in Emergency Medicine and Acute Care, 8th ed. Elsevier, 2023.' },
  { num: 3, text: 'AAP Committee on Pediatrics. Management of Dental Trauma in a Primary Care Setting. Pediatrics. 2014;133(2):e466.' },
  { num: 4, text: 'EB Medicine. Dental Emergencies. Emergency Medicine Practice. 2021.' },
  { num: 5, text: 'Cvek M. A clinical report on partial pulpotomy and capping with calcium hydroxide in permanent incisors with complicated crown fracture. J Endod. 1978;4(8):232-7.' },
  { num: 6, text: 'Dental Trauma Guide (IADT & Copenhagen University). dentaltraumaguide.org.' },
  { num: 7, text: 'Tsilingaridis G, et al. Intrusive luxation of permanent teeth. Int J Paediatr Dent. 2017;27(5):391-399.' },
  { num: 8, text: 'PMC. Evidence-Based Management of Dentoalveolar Fractures. 2024.' },
  { num: 9, text: 'Core EM. Dental Trauma — Avulsion. coreem.net/core/dental-trauma.' },
];
