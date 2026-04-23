// MedKitt — Dental Avulsion
// Time-critical: Reimplantation success depends on extraoral dry time
// 6 modules: Recognition → Storage/Transport → Reimplantation → Splinting → Medications → Follow-up
// ~24 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const DENTAL_AVULSION_CRITICAL_ACTIONS = [
  { text: 'TIME IS TOOTH - reimplantation success drops dramatically with extraoral dry time >30 min', nodeId: 'avulsion-start' },
  { text: 'NEVER reimplant primary (baby) teeth - risk of damaging permanent tooth bud', nodeId: 'avulsion-primary' },
  { text: 'Handle tooth by CROWN only - never touch the root', nodeId: 'avulsion-storage' },
  { text: 'Best storage: HBSS (up to 24h) or cold milk (up to 6h) - NOT water (hypotonic)', nodeId: 'avulsion-storage' },
  { text: 'Reimplant in ED if dentist not available within 15-30 minutes', nodeId: 'avulsion-reimplant-decision' },
  { text: 'Tooth missing - obtain CXR to rule out aspiration', nodeId: 'avulsion-missing' },
  { text: 'Flexible splint for 2 weeks - rigid splints cause ankylosis', nodeId: 'avulsion-splint' },
  { text: 'Doxycycline 100mg BID x7 days first-line antibiotic (adults/children >12y)', nodeId: 'avulsion-meds' },
  { text: 'Urgent dental follow-up within 24-48 hours mandatory', nodeId: 'avulsion-followup' },
] as const;

export const DENTAL_AVULSION_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'avulsion-start',
    type: 'info',
    module: 1,
    title: 'Dental Avulsion',
    body: '**Complete displacement of tooth from alveolar socket** — a true dental emergency.\n\n**TIME IS TOOTH:**\n> Reimplantation success drops dramatically with extraoral dry time:\n> • <5 min: ~95% survival\n> • 15 min: ~80% survival\n> • 30 min: ~50% survival\n> • >60 min dry: Poor prognosis\n\n**Key Question:** Is this a PRIMARY (baby) or PERMANENT tooth?\n\n**Primary teeth are NEVER reimplanted** — risk of damaging permanent tooth bud. [1][2]',
    images: [
      { src: 'images/dental-avulsion/tooth-avulsion.jpg', alt: 'Diagram of a tooth completely displaced from its alveolar socket (dental avulsion)', caption: 'Dental avulsion — complete displacement from the socket. Reimplantation success: ~95% at <5 min, ~50% at 30 min, poor prognosis after 60 min dry time. CC BY-SA 3.0, Endsurg. Wikimedia Commons.' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'tooth-id', label: 'Tooth Identification' },
      { id: 'extraoral-time', label: 'Extraoral Time Calculator' },
      { id: 'splint-technique', label: 'Splinting Guide' },
      { id: 'tetanus-status', label: 'Tetanus Prophylaxis' },
    ],
    next: 'avulsion-tooth-type',
  
    summary: 'Dental Avulsion — review key clinical information before proceeding',
  },

  {
    id: 'avulsion-tooth-type',
    type: 'question',
    module: 1,
    title: 'Primary or Permanent Tooth?',
    body: '**How to differentiate:**\n\n| Feature | Primary (Baby) | Permanent |\n|---------|---------------|----------|\n| **Age** | <6 years typically | >6 years |\n| **Size** | Smaller, whiter | Larger, more yellow |\n| **Root** | Short, tapered | Long, blunted |\n| **Crown shape** | Bulbous, rounded | More angular |\n| **Number** | 20 total | 32 total |\n\n**If uncertain:** Assume permanent and proceed with reimplantation. A dental X-ray can confirm. [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Primary (baby) tooth',
        next: 'avulsion-primary',
      },
      {
        label: 'Permanent tooth',
        next: 'avulsion-assess',
        urgency: 'critical',
      },
      {
        label: 'Uncertain',
        next: 'avulsion-assess',
        urgency: 'urgent',
      },
    ],
  
    summary: 'Primary or Permanent Tooth? — assess clinical status to guide next management decision',
  },

  {
    id: 'avulsion-primary',
    type: 'result',
    module: 1,
    title: 'Primary Tooth — Do NOT Reimplant',
    body: '**Primary teeth should NEVER be reimplanted:**\n\n**Reasons:**\n• Risk of damage to underlying permanent tooth bud\n• Risk of ankylosis affecting eruption\n• Risk of infection\n\n**Management:**\n• Reassure parents\n• Control bleeding with gauze pressure\n• Soft diet for 2-3 days\n• Dental follow-up within 1-2 weeks\n• Monitor for infection\n\n**If tooth fragment present:** X-ray to rule out embedded fragments. [1][2]',
    recommendation: 'Do NOT reimplant primary teeth. Control bleeding, reassure family, arrange dental follow-up.',
    confidence: 'definitive',
    citation: [1, 2],
  
    summary: 'Primary Tooth — Do NOT Reimplant — determine disposition and follow-up plan based on clinical findings',
  },

  {
    id: 'avulsion-assess',
    type: 'info',
    module: 1,
    title: 'Assess the Situation',
    body: '**Critical Assessment:**\n\n1. **Time since avulsion:**\n   • <60 min: Good prognosis\n   • >60 min dry: Poor prognosis but still attempt\n\n2. **Storage medium:**\n   • HBSS (Hank\'s Balanced Salt Solution): Best, up to 24h\n   • Milk: Good, up to 6h\n   • Saliva (in mouth): Acceptable, up to 2h\n   • Saline: Acceptable, up to 2h\n   • Water: Poor (hypotonic, damages cells)\n   • Dry: Worst\n\n3. **Tooth condition:**\n   • Clean root vs. contaminated\n   • Root fracture present?\n   • Crown damage?\n\n4. **Socket condition:**\n   • Intact vs. fractured\n   • Clot present? [1][2][3]',
    citation: [1, 2, 3],
    next: 'avulsion-has-tooth',
  
    summary: 'Assess the Situation — review key clinical information before proceeding',
  },

  {
    id: 'avulsion-has-tooth',
    type: 'question',
    module: 1,
    title: 'Is the Tooth Present?',
    body: '**Locate the avulsed tooth:**\n\n• Check the scene (ground, sports equipment)\n• Check patient\'s mouth (aspiration risk!)\n• Check clothing, hands\n\n**If tooth not found:**\n• CXR to rule out aspiration\n• Consider tooth embedded in soft tissue\n• X-ray of lips/face if swelling\n\n**WARNING:** If tooth cannot be located and patient has respiratory symptoms → CXR immediately. [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Tooth present and available',
        next: 'avulsion-storage',
        urgency: 'critical',
      },
      {
        label: 'Tooth not found — search ongoing',
        next: 'avulsion-missing',
        urgency: 'urgent',
      },
      {
        label: 'Already reimplanted (by patient/bystander)',
        next: 'avulsion-already-reimplanted',
      },
    ],
  
    summary: 'Is the Tooth Present? — assess clinical status to guide next management decision',
  },

  {
    id: 'avulsion-missing',
    type: 'info',
    module: 1,
    title: 'Missing Tooth',
    body: '**If tooth cannot be located:**\n\n1. **Rule out aspiration:**\n   • CXR (PA and lateral)\n   • Tooth in bronchus requires urgent removal\n\n2. **Rule out embedded tooth:**\n   • Palpate lips, cheeks\n   • X-ray soft tissue if suspicious\n   • CT face if significant swelling\n\n3. **Rule out ingestion:**\n   • Usually benign, will pass\n   • Inform patient\n\n4. **Document:**\n   • Tooth not found\n   • Imaging obtained\n   • Dental referral for prosthetic options [1][2]',
    citation: [1, 2],
    next: 'avulsion-followup',
  
    summary: 'Missing Tooth — review key clinical information before proceeding',
  },

  // =====================================================================
  // MODULE 2: STORAGE/TRANSPORT
  // =====================================================================

  {
    id: 'avulsion-storage',
    type: 'info',
    module: 2,
    title: 'Proper Tooth Handling',
    body: '**CRITICAL: Protect the periodontal ligament (PDL) cells**\n\n**DO:**\n• Handle by CROWN only (white part)\n• Keep tooth moist at all times\n• Rinse gently with saline if contaminated\n• Place in storage medium immediately\n\n**DO NOT:**\n• Touch the root\n• Scrub or scrape the root\n• Let tooth dry out\n• Wrap in tissue/gauze (dries it out)\n• Use water (hypotonic, kills cells)\n\n**Best Storage Media (in order):**\n1. HBSS (Save-A-Tooth kit) — up to 24h\n2. Cold milk — up to 6h\n3. Saliva (patient\'s mouth) — up to 2h\n4. Saline — up to 2h [1][2][3]',
    citation: [1, 2, 3],
    next: 'avulsion-reimplant-decision',
  
    summary: 'Proper Tooth Handling — review key clinical information before proceeding',
  },

  {
    id: 'avulsion-reimplant-decision',
    type: 'question',
    module: 2,
    title: 'Reimplantation Decision',
    body: '**Who should reimplant?**\n\n**Reimplant in ED if:**\n• Dentist not immediately available\n• Tooth has been extraoral >15-30 min\n• Every minute counts!\n\n**Wait for dentist if:**\n• Dentist available within 15-30 min\n• Tooth properly stored\n• Open apex (immature root) — needs specialist\n\n**Contraindications to reimplantation:**\n• Severe caries (decayed tooth)\n• Advanced periodontal disease\n• Uncooperative patient\n• Primary tooth [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Reimplant now in ED',
        next: 'avulsion-reimplant',
        urgency: 'critical',
      },
      {
        label: 'Store and transport to dentist',
        next: 'avulsion-transport',
        urgency: 'urgent',
      },
      {
        label: 'Poor prognosis but attempt reimplant',
        next: 'avulsion-poor-prognosis',
      },
    ],
  
    summary: 'Reimplantation Decision — assess clinical status to guide next management decision',
  },

  {
    id: 'avulsion-transport',
    type: 'info',
    module: 2,
    title: 'Transport to Dentist',
    body: '**If dentist available quickly:**\n\n1. **Store tooth properly:**\n   • HBSS (if available)\n   • Cold whole milk (most accessible)\n   • Patient\'s saliva (in cheek — if cooperative)\n\n2. **Call ahead** to dentist/oral surgeon\n\n3. **Transport immediately** — time is critical\n\n4. **Give patient:**\n   • Pain control\n   • Gauze for socket bleeding\n   • Written instructions\n\n**If no dentist available within 1 hour → Reimplant in ED.** [1][2]',
    citation: [1, 2],
    next: 'avulsion-followup',
  
    summary: 'Transport to Dentist — review key clinical information before proceeding',
  },

  // =====================================================================
  // MODULE 3: REIMPLANTATION
  // =====================================================================

  {
    id: 'avulsion-reimplant',
    type: 'info',
    module: 3,
    title: 'ED Reimplantation Technique',
    body: '**Step-by-Step Reimplantation:**\n\n**1. Prepare the socket:**\n• Gently irrigate with saline to remove clot\n• Do NOT curette the socket\n• Local anesthesia (lidocaine with epi — dental block or infiltration)\n\n**2. Prepare the tooth:**\n• Handle by crown only\n• Rinse gently with saline if contaminated\n• Do NOT scrub the root\n• If dry >60 min: soak in HBSS or saline x 30 min\n\n**3. Insert the tooth:**\n• Orient correctly (curve faces lip)\n• Insert with gentle steady pressure\n• Seat fully into socket\n• Have patient bite on gauze to maintain position\n\n**4. Confirm position:**\n• X-ray to confirm seating\n• Check occlusion (bite) [1][2][3]',
    citation: [1, 2, 3],
    next: 'avulsion-splint',
  
    summary: 'ED Reimplantation Technique — review key clinical information before proceeding',
  },

  {
    id: 'avulsion-poor-prognosis',
    type: 'info',
    module: 3,
    title: 'Poor Prognosis — Still Attempt',
    body: '**Even with prolonged extraoral time, attempt reimplantation:**\n\n**Rationale:**\n• May maintain space for future implant\n• May allow bone preservation\n• Better than no tooth aesthetically\n• Root resorption likely but buys time\n\n**Expected outcomes >60 min dry:**\n• High risk of root resorption\n• May need extraction in 2-5 years\n• Serves as space maintainer\n\n**Pre-soak protocol:**\n• Soak tooth in HBSS or saline for 30 min before reimplanting\n• Consider fluoride treatment per dental protocols\n\nProceed with reimplantation technique. [1][2]',
    citation: [1, 2],
    next: 'avulsion-reimplant',
  
    summary: 'Poor Prognosis — Still Attempt — review key clinical information before proceeding',
    skippable: true,
  },

  {
    id: 'avulsion-already-reimplanted',
    type: 'info',
    module: 3,
    title: 'Already Reimplanted',
    body: '**If tooth was reimplanted at scene:**\n\n**This is ideal! Fastest reimplantation = best outcomes.**\n\n**ED management:**\n1. Do NOT remove and re-reimplant\n2. Confirm proper positioning (X-ray)\n3. Check occlusion\n4. Splint if loose\n5. Give medications (antibiotics, tetanus)\n6. Arrange urgent dental follow-up\n\n**Assess position:**\n• Tooth should be at same level as adjacent teeth\n• Crown should face correct direction\n• If grossly malpositioned → reposition with gentle pressure [1][2]',
    citation: [1, 2],
    next: 'avulsion-splint',
  
    summary: 'Already Reimplanted — review key clinical information before proceeding',
  },

  // =====================================================================
  // MODULE 4: SPLINTING
  // =====================================================================

  {
    id: 'avulsion-splint',
    type: 'info',
    module: 4,
    title: 'Splinting Technique',
    body: '**Flexible splint is standard of care:**\n\n**Goal:** Stabilize tooth while allowing physiologic movement.\n\n---\n\n**ED SPLINTING: STEP-BY-STEP**\n\n**Materials (pick one method):**\n• 2-octyl cyanoacrylate (Dermabond) + N95 nasal bridge strip\n• COE-PAK periodontal dressing\n• Suture foil from suture pack + skin glue\n\n---\n\n**METHOD 1: Dermabond + N95 Strip (Preferred)**\n\n**Step 1 — Prepare:**\n• Cut metal nasal bridge from N95 mask\n• Round any sharp edges\n• Dry the tooth and adjacent teeth with gauze\n\n**Step 2 — Initial adhesion:**\n• Apply Dermabond to mesial and distal edges of reimplanted tooth\n• Adhere to adjacent teeth on each side\n• Hold firm pressure x 30 seconds\n\n**Step 3 — Splint placement:**\n• Apply Dermabond to inner aspect of nasal bridge strip\n• Apply Dermabond to buccal (front) surface of target tooth + 1-2 teeth on each side\n• Press strip firmly against teeth\n• Hold under pressure x 1 minute\n\n**Step 4 — Verify:**\n• Confirm stability\n• Check occlusion (bite alignment)\n\n---\n\n**METHOD 2: COE-PAK (periodontal dressing):**\n• Mix catalyst and base paste until uniform color\n• Roll into a rope shape\n• Apply across labial (front) and lingual (back) surfaces\n• Mold to cover 2-3 teeth on each side of avulsed tooth\n• Hardens in ~10 minutes\n\n---\n\n**METHOD 3: Suture foil + Dermabond:**\n• Cut foil from suture packaging to span 3-5 teeth\n• Apply Dermabond to foil and buccal tooth surfaces\n• Press and hold x 1 minute\n\n---\n\n**Duration:**\n• 2 weeks: Standard (extraoral dry time <60 min)\n• 4 weeks: If extraoral dry time >60 min or alveolar fracture (IADT 2020)\n\n**⚠️ Rigid splints are NOT recommended** — cause ankylosis. [1][2][3][5]',
    citation: [1, 2, 3, 5],
    next: 'avulsion-xray',

    summary: 'Splinting Technique — review key clinical information before proceeding',
  },

  {
    id: 'avulsion-xray',
    type: 'info',
    module: 4,
    title: 'Post-Reimplantation Imaging',
    body: '**Obtain X-ray after reimplantation:**\n\n**Confirm:**\n• Tooth fully seated in socket\n• Correct orientation\n• No root fracture\n• No alveolar fracture\n• No foreign body\n\n**Additional imaging if:**\n• Multiple teeth involved\n• Alveolar fracture suspected\n• Mandible/maxilla fracture suspected → CT face\n• Tooth fragments missing → soft tissue X-ray\n\n**Document tooth number and position.** [1][2]',
    citation: [1, 2],
    next: 'avulsion-meds',
  
    summary: 'Post-Reimplantation Imaging — review key clinical information before proceeding',
  },

  // =====================================================================
  // MODULE 5: MEDICATIONS
  // =====================================================================

  {
    id: 'avulsion-meds',
    type: 'info',
    module: 5,
    title: 'Medications',
    body: '**Standard medications after avulsion reimplantation:**\n\n**1. Antibiotics (evidence-based):**\n• [Doxycycline](#/drug/doxycycline/dental) 100 mg BID x 7 days (adults/children >12y)\n• Or [Amoxicillin](#/drug/amoxicillin/dental) if <12y or doxycycline contraindicated\n• Penicillin allergy: Clindamycin\n\n**2. Tetanus prophylaxis:**\n• Per standard wound guidelines\n• Td/Tdap if >5 years since last booster\n• TIG if unvaccinated/unknown\n\n**3. Pain control:**\n• NSAIDs (ibuprofen) first-line\n• Avoid aspirin (bleeding)\n• Opioids rarely needed\n\n**4. Chlorhexidine rinse:**\n• 0.12% BID x 2 weeks\n• Start day after reimplantation [1][2][4]',
    citation: [1, 2, 4],
    treatment: {
      firstLine: {
        drug: 'Doxycycline',
        dose: '100 mg',
        route: 'PO',
        frequency: 'BID',
        duration: '7 days',
        notes: 'First-line for adults and children >12y',
      },
      alternative: {
        drug: 'Amoxicillin',
        dose: '500 mg (adults) or 25 mg/kg (peds)',
        route: 'PO',
        frequency: 'TID',
        duration: '7 days',
        notes: 'For children <12y or doxycycline contraindicated',
      },
      monitoring: 'Watch for signs of infection, root resorption at follow-up',
    },
    next: 'avulsion-instructions',
  
    summary: 'Medications — review key clinical information before proceeding',
    skippable: true,
  },

  {
    id: 'avulsion-instructions',
    type: 'info',
    module: 5,
    title: 'Patient Instructions',
    body: '**Discharge Instructions:**\n\n**Diet:**\n• Soft diet x 2 weeks\n• Avoid biting on affected tooth\n• No hard, crunchy, or sticky foods\n\n**Oral hygiene:**\n• Gentle brushing with soft brush\n• Chlorhexidine rinse BID\n• No flossing around affected tooth x 2 weeks\n\n**Activity:**\n• No contact sports x 4 weeks\n• Mouthguard when cleared for sports\n\n**Warning signs — return if:**\n• Increasing pain\n• Swelling\n• Fever\n• Tooth becomes very loose\n• Abscess formation\n• Tooth changes color (darkens) [1][2]',
    citation: [1, 2],
    next: 'avulsion-followup',
  
    summary: 'Patient Instructions — review key clinical information before proceeding',
  },

  // =====================================================================
  // MODULE 6: FOLLOW-UP
  // =====================================================================

  {
    id: 'avulsion-followup',
    type: 'info',
    module: 6,
    title: 'Dental Follow-up',
    body: '**URGENT dental follow-up is essential:**\n\n**Timeline:**\n• 24-48 hours: Dental evaluation, permanent splint if needed\n• 2 weeks: Splint removal, assess healing\n• 4 weeks: Clinical and radiographic evaluation\n• 3 months: Pulp vitality testing\n• 6 months: Repeat evaluation\n• Annually x 5 years: Monitor for resorption\n\n**Expected Complications:**\n• **Root resorption** (most common, especially if dry >30 min)\n• **Pulp necrosis** (may need root canal)\n• **Ankylosis** (fusion to bone)\n• **Infection**\n\n**Communicate prognosis honestly** — even optimal care may result in eventual tooth loss. [1][2]',
    citation: [1, 2],
    next: 'avulsion-disposition',
  
    summary: 'Dental Follow-up — review key clinical information before proceeding',
  },

  {
    id: 'avulsion-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**Most dental avulsions can be discharged:**\n\n**Admission considerations:**\n• Associated maxillofacial fractures\n• Airway compromise\n• Severe bleeding not controlled\n• Multiple dental injuries requiring OR\n• Unable to tolerate PO (IV antibiotics needed)\n\n**Before discharge:**\n• Reimplantation complete (or tooth properly stored with patient)\n• Splint in place\n• Medications prescribed\n• Dental follow-up arranged within 24-48h\n• Written instructions given [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Discharge with dental follow-up',
        next: 'avulsion-discharge',
      },
      {
        label: 'Admit — associated injuries',
        next: 'avulsion-admit',
        urgency: 'urgent',
      },
      {
        label: 'Transfer — needs oral surgery',
        next: 'avulsion-transfer',
      },
    ],
  
    summary: 'Disposition — assess clinical status to guide next management decision',
  },

  {
    id: 'avulsion-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge',
    body: '**Discharge Checklist:**\n\n✓ Tooth reimplanted or stored properly\n✓ Splint applied if reimplanted\n✓ Post-procedure X-ray obtained\n✓ Antibiotics prescribed (doxycycline or amoxicillin)\n✓ Tetanus updated if needed\n✓ Pain control prescribed\n✓ Chlorhexidine rinse prescribed\n✓ Soft diet instructions\n✓ Warning signs reviewed\n✓ **Dental follow-up in 24-48 hours**\n\n**Give written instructions** — families are often in shock. [1][2]',
    recommendation: 'Discharge with antibiotics, pain control, and urgent dental follow-up within 24-48 hours.',
    confidence: 'recommended',
    citation: [1, 2],
  
    summary: 'Discharge — determine disposition and follow-up plan based on clinical findings',
  },

  {
    id: 'avulsion-admit',
    type: 'result',
    module: 6,
    title: 'Admission',
    body: '**Admit if:**\n\n• **Maxillofacial fractures** requiring observation/surgery\n• **Airway compromise**\n• **Uncontrolled bleeding**\n• **Multiple injuries** requiring staged repair\n• **Unable to tolerate PO** (IV antibiotics)\n\n**Consultations:**\n• Oral and maxillofacial surgery\n• ENT if airway involvement\n• Trauma surgery if polytrauma\n\n**Continue dental care:**\n• Splinting if not already done\n• IV antibiotics if indicated\n• Pain control [1][2]',
    recommendation: 'Admit for associated maxillofacial injuries or airway concerns. OMFS consultation.',
    confidence: 'recommended',
    citation: [1, 2],
  
    summary: 'Admission — determine disposition and follow-up plan based on clinical findings',
  },

  {
    id: 'avulsion-transfer',
    type: 'result',
    module: 6,
    title: 'Transfer',
    body: '**Transfer if:**\n\n• Complex maxillofacial fractures beyond local capability\n• Need for emergent oral surgery not available\n• Pediatric dental specialist needed\n\n**Before transfer:**\n• Stabilize airway\n• Control bleeding\n• Reimplant tooth if possible (or store properly)\n• Apply temporary splint\n• Start antibiotics\n• Document time of avulsion\n\n**Communicate:**\n• Time of injury\n• Storage medium used\n• Interventions performed\n• X-ray findings [1][2]',
    recommendation: 'Transfer to facility with OMFS coverage. Stabilize and reimplant before transport if possible.',
    confidence: 'recommended',
    citation: [1, 2],
  
    summary: 'Transfer — determine disposition and follow-up plan based on clinical findings',
  },

];

export const DENTAL_AVULSION_MODULE_LABELS = [
  'Recognition',
  'Storage/Transport',
  'Reimplantation',
  'Splinting',
  'Medications',
  'Follow-up',
];

export const DENTAL_AVULSION_CITATIONS: Citation[] = [
  { num: 1, text: 'UpToDate - Evaluation and management of dental injuries in children. 2024.' },
  { num: 2, text: 'International Association of Dental Traumatology (IADT) Guidelines. Dental Traumatology. 2020;36(4):331-342.' },
  { num: 3, text: 'EB Medicine - Dental Emergencies in the Emergency Department. Emergency Medicine Practice. 2021.' },
  { num: 4, text: 'American Academy of Pediatric Dentistry. Management of Acute Dental Trauma. Pediatr Dent. 2022;44(5):413-421.' },
  { num: 5, text: 'Roberts JR, Hedges JR. Roberts and Hedges\' Clinical Procedures in Emergency Medicine and Acute Care. 7th ed. Chapter 64: Emergency Dental Procedures. Elsevier; 2019.' },
];
