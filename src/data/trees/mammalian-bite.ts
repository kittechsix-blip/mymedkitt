// MedKitt — Mammalian Bite Management
// ED evaluation and management of dog, cat, human, and other mammalian bites
// Sources: IDSA Guidelines, Sanford Guide, CDC Rabies Guidelines
// 6 modules: Assessment → Wound Care → Antibiotics → Rabies → Tetanus → Disposition
// ~22 nodes

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const MAMMALIAN_BITE_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'mb-start',
    type: 'question',
    module: 1,
    title: 'Mammalian Bite — ED Evaluation',
    body: '[Steps Summary](#/info/mb-steps)\n\n**Initial Assessment:**\n1. Animal type and circumstances\n2. Time since bite\n3. Location and depth of wound\n4. Tetanus and rabies risk\n5. Patient immunocompromised?\n\n**High-risk features:**\n• Cat bites (deep punctures, high infection rate)\n• Human bites (hand "fight bites")\n• Crush injuries\n• Delayed presentation (>8-12 hours)\n• Immunocompromise\n• Involvement of hand, face, joint, tendon\n\n**What type of bite?** [1][2]',
    options: [
      { label: 'Dog bite', description: 'Most common, crush + laceration', next: 'mb-dog' },
      { label: 'Cat bite', description: 'Deep puncture, high infection rate', next: 'mb-cat' },
      { label: 'Human bite', description: 'Including fight bites', next: 'mb-human' },
      { label: 'Other mammal', description: 'Rodent, bat, wildlife, exotic', next: 'mb-other' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'weight-dose', label: 'Weight Calculator' },
    ],
  },

  // =====================================================================
  // MODULE 2: ANIMAL-SPECIFIC ASSESSMENT
  // =====================================================================

  {
    id: 'mb-dog',
    type: 'info',
    module: 2,
    title: 'Dog Bite',
    body: '**Dog Bites — Most Common:**\n\n**Epidemiology:**\n• 4.5 million dog bites/year in US\n• 20% become infected\n• Children most commonly bitten\n• Face/head common in children; extremities in adults\n\n**Microbiology:**\n• Pasteurella spp. (50%)\n• Staphylococcus, Streptococcus\n• Capnocytophaga canimorsus (asplenic patients)\n• Anaerobes (Bacteroides, Fusobacterium)\n\n**High-risk dog bites:**\n• Hand involvement\n• Crush injury (large dog)\n• Puncture wounds\n• Presentation >12 hours\n• Immunocompromise\n• Asplenia (Capnocytophaga risk)\n\n**Rabies risk:**\n• Low in domestic vaccinated dogs\n• Contact local health department\n• 10-day quarantine observation if known dog [1][2]',
    next: 'mb-wound-assessment',
    citation: [1, 2],
  },

  {
    id: 'mb-cat',
    type: 'info',
    module: 2,
    title: 'Cat Bite',
    body: '**Cat Bites — Highest Infection Risk:**\n\n**Why more dangerous than dog bites:**\n• Sharp teeth cause deep puncture wounds\n• Inoculate bacteria deep into tissue\n• Cannot adequately irrigate puncture wounds\n• Infection rate: 30-50% (vs 5-20% dog)\n\n**Microbiology:**\n• Pasteurella multocida (75%) — rapid onset cellulitis\n• Staphylococcus, Streptococcus\n• Bartonella henselae (cat scratch disease)\n• Anaerobes\n\n**Clinical pearls:**\n• Pasteurella causes rapid infection (<24h)\n• Cat bites to hand very high risk\n• Tenosynovitis, septic arthritis common\n• Consider admission for hand bites\n\n**ALL cat bites should receive prophylactic antibiotics.** [1][2][3]',
    next: 'mb-wound-assessment',
    citation: [1, 2, 3],
    safetyLevel: 'warning',
  },

  {
    id: 'mb-human',
    type: 'info',
    module: 2,
    title: 'Human Bite',
    body: '**Human Bites — High Infection Risk:**\n\n**Two types:**\n1. **Occlusal bite** — direct bite\n2. **Fight bite** — tooth strikes clenched fist (MCP joint)\n\n**Fight bite is a surgical emergency:**\n• Tooth penetrates MCP joint capsule\n• Patient often delayed presentation\n• May deny mechanism\n• High rate of septic arthritis, osteomyelitis\n• Examine at full extension AND flexion\n\n**Microbiology:**\n• Streptococcus (alpha and beta hemolytic)\n• Staphylococcus aureus\n• Eikenella corrodens (unique to human)\n• Anaerobes (Bacteroides, Prevotella)\n\n**Workup for fight bite:**\n• X-ray (tooth fragment, fracture, joint involvement)\n• Explore wound in extension and flexion\n• Hand surgery consult if any concern for joint penetration\n\n**Bloodborne pathogen risk:** Hep B, Hep C, HIV — see exposure protocols. [1][4]',
    next: 'mb-wound-assessment',
    citation: [1, 4],
    safetyLevel: 'warning',
  },

  {
    id: 'mb-other',
    type: 'question',
    module: 2,
    title: 'Other Mammalian Bites',
    body: '**Other Animals:**\n\n**Rodents (rat, mouse, squirrel, hamster):**\n• Low infection rate\n• Rabies risk very low (nearly zero)\n• Antibiotics usually not needed unless high-risk\n• Rat-bite fever possible (Streptobacillus)\n\n**Bats:**\n• HIGH rabies risk — assume exposure\n• PEP indicated even without visible bite\n• Any contact = potential exposure\n\n**Wild carnivores (raccoon, skunk, fox, coyote):**\n• HIGH rabies risk\n• PEP indicated unless animal tested negative\n• Report to health department\n\n**Primates (monkey bites):**\n• Herpes B virus risk (cercopithecine herpesvirus)\n• Can be fatal — ID consult\n\n**What type of animal?** [5][6]',
    options: [
      { label: 'Rodent (rat, mouse, squirrel)', description: 'Low risk', next: 'mb-wound-assessment' },
      { label: 'Bat', description: 'High rabies risk', next: 'mb-bat', urgency: 'urgent' },
      { label: 'Wild carnivore (raccoon, skunk, fox)', description: 'High rabies risk', next: 'mb-rabies-assessment', urgency: 'urgent' },
      { label: 'Primate', description: 'Herpes B risk', next: 'mb-primate', urgency: 'urgent' },
    ],
    citation: [5, 6],
  },

  {
    id: 'mb-bat',
    type: 'info',
    module: 2,
    title: 'Bat Exposure',
    body: '**Bat Exposure — Rabies Risk:**\n\n**When to give PEP:**\n• Any bite or scratch from bat\n• Bat found in room with sleeping person\n• Bat found in room with unattended child\n• Bat found in room with intoxicated/impaired person\n• Direct contact with bat cannot be excluded\n\n**Why so cautious:**\n• Bat bites may be unnoticed (small teeth)\n• ~6% of tested bats are rabid\n• Rabies is 100% fatal once symptomatic\n\n**If bat available:**\n• Submit for rabies testing\n• If negative: discontinue PEP\n• If positive or untestable: complete PEP\n\n**PEP regimen:** See rabies module.\n\n**Report to local health department.** [5][6]',
    next: 'mb-rabies-assessment',
    citation: [5, 6],
    safetyLevel: 'critical',
  },

  {
    id: 'mb-primate',
    type: 'info',
    module: 2,
    title: 'Primate Bite — Herpes B Risk',
    body: '**Primate (Monkey) Bites:**\n\n**Herpes B Virus (Cercopithecine herpesvirus 1):**\n• Found in macaque monkeys\n• ~70% of adult macaques are seropositive\n• Can be transmitted via bite, scratch, or mucosal exposure\n• Mortality 70-80% if untreated\n\n**Clinical presentation:**\n• Vesicles at bite site (1-5 weeks)\n• Lymphadenopathy\n• Ascending encephalomyelitis\n• Can be rapidly fatal\n\n**Immediate management:**\n1. Copious wound irrigation (15 min)\n2. Povidone-iodine or chlorhexidine scrub\n3. **ID consult IMMEDIATELY**\n4. Consider prophylactic valacyclovir or acyclovir\n5. Baseline serology (patient and animal if possible)\n\n**This is a medical emergency.** Prophylaxis must start within hours. [7]',
    next: 'mb-wound-care',
    citation: [7],
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 3: WOUND CARE
  // =====================================================================

  {
    id: 'mb-wound-assessment',
    type: 'question',
    module: 3,
    title: 'Wound Assessment',
    body: '**Assess wound characteristics:**\n\n**Location:**\n• Hand — highest infection risk\n• Face — cosmetic concern, close follow-up\n• Over joint — septic arthritis risk\n• Near tendon — tenosynovitis risk\n\n**Type:**\n• Laceration — can irrigate, lower infection risk\n• Puncture — cannot irrigate, higher infection risk\n• Crush — devitalized tissue, higher infection risk\n• Avulsion — may need surgery\n\n**Depth:**\n• Superficial (dermis only)\n• Deep (subcutaneous, muscle)\n• Involving joint, tendon, or bone\n\n**Time since injury:**\n• <8-12 hours — lower risk\n• >12-24 hours — higher infection risk\n\n**What type of wound?** [1][2]',
    options: [
      { label: 'Superficial laceration', description: 'Can irrigate and close', next: 'mb-wound-care' },
      { label: 'Deep puncture wound', description: 'Cannot irrigate, high risk', next: 'mb-wound-care-puncture' },
      { label: 'Hand involvement', description: 'High risk, may need surgery', next: 'mb-hand-bite' },
      { label: 'Signs of infection present', description: 'Cellulitis, purulence, fever', next: 'mb-infected', urgency: 'urgent' },
    ],
    citation: [1, 2],
  },

  {
    id: 'mb-wound-care',
    type: 'info',
    module: 3,
    title: 'Wound Care — Lacerations',
    body: '**Standard Bite Wound Care:**\n\n**1. Copious irrigation:**\n• High-pressure irrigation (syringe + 18g catheter)\n• Normal saline or tap water\n• At least 150-200mL for small wounds\n• More for larger/contaminated wounds\n• Single most important infection prevention\n\n**2. Debridement:**\n• Remove devitalized tissue\n• Remove foreign material\n• Sharp debridement if needed\n\n**3. Wound closure:**\n• **Face wounds:** Primary closure (cosmesis, low infection rate)\n• **Hand wounds:** Often leave open or delayed closure\n• **Puncture wounds:** Do NOT close\n• **>12-24 hours old:** Generally leave open\n• **Infected wounds:** Leave open\n\n**4. Immobilization/elevation:**\n• Splint hand wounds\n• Elevate above heart\n\n**5. Tetanus prophylaxis:** See tetanus module. [1][2]',
    next: 'mb-antibiotics',
    citation: [1, 2],
  },

  {
    id: 'mb-wound-care-puncture',
    type: 'info',
    module: 3,
    title: 'Puncture Wounds',
    body: '**Puncture Wound Management:**\n\n**Challenge:** Cannot adequately irrigate\n\n**Approach:**\n1. Do NOT probe or try to irrigate forcefully\n2. Express any blood/exudate\n3. Soak in antiseptic (povidone-iodine or chlorhexidine)\n4. Leave wound OPEN\n5. **Prophylactic antibiotics indicated**\n\n**High-risk punctures:**\n• Cat bites (always)\n• Through-and-through wounds\n• Over joints or tendons\n• Delayed presentation\n\n**Follow-up:**\n• Recheck in 24-48 hours\n• Strict return precautions for infection signs\n• Low threshold for admission if hand involved\n\n**Cat bite to hand + puncture = high-risk**\nConsider admission for IV antibiotics. [1][3]',
    next: 'mb-antibiotics',
    citation: [1, 3],
    safetyLevel: 'warning',
  },

  {
    id: 'mb-hand-bite',
    type: 'info',
    module: 3,
    title: 'Hand Bite — High Risk',
    body: '**Hand Bites — Special Considerations:**\n\n**Why hand bites are dangerous:**\n• Complex anatomy (tendons, joints, sheaths)\n• Poor blood supply\n• Rapid spread of infection\n• High morbidity from complications\n\n**Workup:**\n• X-ray (fracture, foreign body, joint involvement)\n• Examine in extension AND flexion (fight bites)\n• Test tendon function\n• Assess for joint involvement\n\n**Management:**\n• Copious irrigation\n• Debridement in ED or OR\n• Leave wounds open\n• Splint in position of function\n• Elevate\n• **Prophylactic antibiotics always**\n\n**Consult hand surgery if:**\n• Fight bite with possible joint penetration\n• Tendon involvement\n• Significant tissue loss\n• Infection already present\n\n**Consider admission for:**\n• All fight bites to MCP\n• Cat bites to hand\n• Immunocompromised patients [1][4]',
    next: 'mb-antibiotics',
    citation: [1, 4],
    safetyLevel: 'warning',
  },

  {
    id: 'mb-infected',
    type: 'info',
    module: 3,
    title: 'Infected Bite Wound',
    body: '**Infected Bite — Already Infected:**\n\n**Signs of infection:**\n• Erythema, warmth, swelling\n• Purulent drainage\n• Lymphangitis\n• Fever\n• Rapid onset (<24h) suggests Pasteurella\n\n**Workup:**\n• Wound culture (aerobic + anaerobic)\n• Blood cultures if systemic signs\n• X-ray (osteomyelitis, foreign body, gas)\n• CBC, CRP if systemic\n\n**Management:**\n• Open wound, drain any abscess\n• Debride necrotic tissue\n• Leave wound open\n• Antibiotics — often IV initially\n\n**Admit for:**\n• Sepsis/systemic signs\n• Rapidly progressive cellulitis\n• Hand involvement\n• Deep space infection\n• Immunocompromised\n• Failed outpatient treatment\n\n**Antibiotics:** See next section. [1][2]',
    next: 'mb-antibiotics',
    citation: [1, 2],
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 4: ANTIBIOTICS
  // =====================================================================

  {
    id: 'mb-antibiotics',
    type: 'question',
    module: 4,
    title: 'Antibiotics — Prophylaxis vs Treatment',
    body: '**Antibiotic Indications:**\n\n**PROPHYLAXIS indicated for:**\n• All cat bites\n• All human bites\n• Dog bites to hand, face, or genital area\n• Puncture wounds\n• Wounds involving joints, tendons, bone\n• Crush injuries\n• Presentation >8-12 hours\n• Immunocompromised patients\n• Asplenic patients\n\n**PROPHYLAXIS NOT routinely needed:**\n• Minor dog bite lacerations\n• Superficial wounds, easily irrigated\n• <8 hours old, low-risk location\n\n**TREATMENT (full course):**\n• Already infected wounds\n• Abscess present\n• Systemic signs\n\n**What is the clinical scenario?** [1][2][3]',
    options: [
      { label: 'Prophylaxis indicated', description: 'High-risk wound, not yet infected', next: 'mb-abx-prophylaxis' },
      { label: 'Treatment needed', description: 'Already infected', next: 'mb-abx-treatment' },
      { label: 'No antibiotics needed', description: 'Low-risk, clean wound', next: 'mb-rabies-assessment' },
    ],
    citation: [1, 2, 3],
  },

  {
    id: 'mb-abx-prophylaxis',
    type: 'info',
    module: 4,
    title: 'Antibiotic Prophylaxis',
    body: '**Prophylactic Antibiotics (3-5 days):**\n\n**First-line:**\n• **Amoxicillin-clavulanate** 875/125mg PO BID\n  - Covers Pasteurella, Staph, Strep, Eikenella, anaerobes\n  - Drug of choice for ALL bite wounds\n\n**Penicillin allergy:**\n• Doxycycline 100mg PO BID (covers Pasteurella)\n  - PLUS metronidazole 500mg PO TID (anaerobes)\n  - OR TMP-SMX DS + metronidazole\n• Moxifloxacin 400mg PO daily (monotherapy option)\n\n**Pediatric dosing:**\n• Amoxicillin-clavulanate 25-45 mg/kg/day divided BID\n\n**Duration:**\n• 3-5 days for prophylaxis\n• Extend if wound concerning at follow-up\n\n**Key point:** Amoxicillin-clavulanate is preferred because it covers the unique pathogens in bite wounds. [1][2][3]',
    next: 'mb-rabies-assessment',
    citation: [1, 2, 3],
  },

  {
    id: 'mb-abx-treatment',
    type: 'info',
    module: 4,
    title: 'Antibiotic Treatment — Infected',
    body: '**Treatment of Infected Bite Wounds:**\n\n**Outpatient (mild cellulitis):**\n• Amoxicillin-clavulanate 875/125mg PO BID x 7-14 days\n\n**Inpatient IV therapy:**\n• **Ampicillin-sulbactam** 3g IV q6h\n• OR Piperacillin-tazobactam 4.5g IV q8h\n• OR Ceftriaxone 1g IV daily + metronidazole 500mg IV q8h\n\n**MRSA coverage (add if concern):**\n• Vancomycin, daptomycin, or linezolid\n• Consider if: prior MRSA, healthcare exposure, not improving\n\n**Penicillin allergy (inpatient):**\n• Ciprofloxacin + metronidazole + vancomycin\n• Or carbapenem (severe allergy)\n\n**Duration:**\n• 7-14 days depending on severity\n• May need longer for osteomyelitis, septic arthritis\n\n**Transition to oral when:**\n• Afebrile 24-48h\n• Cellulitis improving\n• Tolerating PO [1][2]',
    next: 'mb-rabies-assessment',
    citation: [1, 2],
  },

  // =====================================================================
  // MODULE 5: RABIES
  // =====================================================================

  {
    id: 'mb-rabies-assessment',
    type: 'question',
    module: 5,
    title: 'Rabies Risk Assessment',
    body: '**Rabies PEP Decision:**\n\n**High-risk animals (PEP indicated):**\n• Bats (any contact)\n• Raccoons, skunks, foxes, coyotes\n• Stray/feral dogs/cats (unknown vaccination)\n• Wild carnivores\n\n**Low-risk animals (PEP usually NOT needed):**\n• Domestic dogs/cats with current vaccination\n• Rabbits, hares\n• Rodents (rats, mice, squirrels, hamsters)\n• Livestock\n\n**Can observe (10 days) rather than treat:**\n• Healthy domestic dog, cat, or ferret\n• Owner available, animal can be observed\n• If animal develops signs → begin PEP\n\n**What is the animal status?** [5][6]',
    options: [
      { label: 'High-risk wild animal', description: 'Bat, raccoon, skunk, fox', next: 'mb-rabies-pep', urgency: 'urgent' },
      { label: 'Unknown dog/cat, cannot observe', description: 'Stray, escaped, unknown status', next: 'mb-rabies-pep' },
      { label: 'Known domestic animal, can observe', description: '10-day observation period', next: 'mb-rabies-observe' },
      { label: 'Low-risk animal (rodent, rabbit)', description: 'PEP not indicated', next: 'mb-tetanus' },
    ],
    citation: [5, 6],
  },

  {
    id: 'mb-rabies-pep',
    type: 'info',
    module: 5,
    title: 'Rabies Post-Exposure Prophylaxis',
    body: '**Rabies PEP Protocol:**\n\n**Components:**\n1. **Wound care** — immediate, thorough irrigation\n2. **Rabies immune globulin (RIG)** — passive immunity\n3. **Rabies vaccine** — active immunity\n\n**RIG (Human Rabies Immune Globulin - HRIG):**\n• Dose: 20 IU/kg\n• Infiltrate as much as possible into wound\n• Remainder IM at site distant from vaccine\n• Give on Day 0 ONLY (not after Day 7)\n\n**Rabies vaccine (HDCV or PCECV):**\n• Day 0, 3, 7, 14 (4 doses for immunocompetent)\n• Day 0, 3, 7, 14, 28 (5 doses if immunocompromised)\n• IM deltoid (NOT gluteal)\n\n**Previously vaccinated:**\n• Vaccine Day 0 and 3 only\n• NO RIG needed\n\n**Contact local/state health department** for guidance. [5][6]',
    next: 'mb-tetanus',
    citation: [5, 6],
    safetyLevel: 'critical',
  },

  {
    id: 'mb-rabies-observe',
    type: 'info',
    module: 5,
    title: 'Rabies — 10-Day Observation',
    body: '**10-Day Observation Period:**\n\n**Applies to:**\n• Healthy-appearing domestic dogs, cats, ferrets\n• Owner/animal available for observation\n• Animal can be confined\n\n**Protocol:**\n• Animal observed for 10 days by owner or animal control\n• If animal remains healthy: no rabies risk, no PEP needed\n• If animal develops symptoms: euthanize, test, begin PEP\n• If animal dies: test brain tissue\n\n**When to start PEP anyway:**\n• Animal showing neurologic signs at time of bite\n• Wild-caught animal\n• Animal cannot be observed\n• High suspicion despite healthy appearance\n\n**Contact local health department** for observation requirements.\n\n**Document:** Animal description, owner contact, health department notification. [5][6]',
    next: 'mb-tetanus',
    citation: [5, 6],
  },

  // =====================================================================
  // MODULE 6: TETANUS & DISPOSITION
  // =====================================================================

  {
    id: 'mb-tetanus',
    type: 'info',
    module: 6,
    title: 'Tetanus Prophylaxis',
    body: '**Tetanus Prophylaxis for Bite Wounds:**\n\n**All bite wounds are tetanus-prone.**\n\n| Vaccination History | Clean Minor | Tetanus-Prone |\n|---------------------|-------------|---------------|\n| Unknown or <3 doses | Tdap | Tdap + TIG |\n| ≥3 doses, <5 years | None | None |\n| ≥3 doses, 5-10 years | None | Tdap |\n| ≥3 doses, >10 years | Tdap | Tdap |\n\n**Tdap preferred over Td** (pertussis protection)\n\n**TIG (Tetanus Immune Globulin):**\n• 250 units IM\n• Give at different site from Tdap\n• For tetanus-prone wounds with inadequate vaccination\n\n**All bites are tetanus-prone** — contaminated, crush, puncture characteristics. [8]',
    next: 'mb-disposition',
    citation: [8],
  },

  {
    id: 'mb-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**Disposition:**\n\n**Admit for:**\n• Infected bite requiring IV antibiotics\n• Fight bite to MCP joint\n• Sepsis or systemic signs\n• Immunocompromised with high-risk wound\n• Need for operative debridement\n• Failed outpatient therapy\n\n**Discharge with close follow-up:**\n• Most bite wounds\n• Prophylactic antibiotics started\n• Wound care instructions\n• Recheck in 24-48 hours\n\n**What is the plan?**',
    options: [
      { label: 'Admit', description: 'Infection, IV antibiotics, surgery', next: 'mb-admit' },
      { label: 'Discharge with follow-up', description: 'Standard wound care, oral antibiotics', next: 'mb-discharge' },
    ],
    citation: [1],
  },

  {
    id: 'mb-admit',
    type: 'result',
    module: 6,
    title: 'Admit',
    body: '**Admission for Bite Wound:**\n\n**Orders:**\n• IV antibiotics (ampicillin-sulbactam or pip-tazo)\n• Wound care, debridement PRN\n• Splint and elevate if extremity\n• Serial wound checks\n• Hand surgery consult if hand involved\n• Rabies PEP if indicated (coordinate with pharmacy)\n\n**Consults:**\n• Hand surgery (fight bites, tendon involvement)\n• ID (complex infections, immunocompromised)\n• Plastic surgery (facial wounds, tissue loss)\n\n**Disposition criteria:**\n• Afebrile 24-48h\n• Cellulitis improving\n• Tolerating PO antibiotics\n• Wound care manageable outpatient\n\n**Follow-up:** Hand clinic or wound clinic within 1 week.',
    recommendation: 'Admit for IV antibiotics. Hand surgery consult if hand bite. Continue rabies PEP if indicated.',
    citation: [1],
  },

  {
    id: 'mb-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge',
    body: '**Discharge Instructions:**\n\n**Wound care:**\n• Keep clean and dry\n• Change dressing daily\n• Elevate affected area\n• Watch for signs of infection\n\n**Medications:**\n• Complete antibiotic course (3-5 days prophylaxis, 7-14 days treatment)\n• Pain control (acetaminophen, ibuprofen)\n\n**Rabies PEP (if indicated):**\n• Arrange Day 3, 7, 14 vaccine appointments\n• Provide schedule to patient\n\n**Return IMMEDIATELY for:**\n• Increasing redness, swelling, or pain\n• Purulent drainage\n• Fever >100.4°F\n• Red streaks up arm/leg\n• Numbness or difficulty moving fingers\n\n**Follow-up:**\n• Wound check in 24-48 hours (in person preferred)\n• Sooner if any concerns\n• Suture removal if closed (5-7 days face, 10-14 days extremities)',
    recommendation: 'Discharge with antibiotics. Wound check 24-48h. Written return precautions. Rabies vaccine schedule if PEP indicated.',
    citation: [1, 2],
  },

];

// =====================================================================
// Module Labels
// =====================================================================

export const MAMMALIAN_BITE_MODULE_LABELS = [
  'Assessment',
  'Animal Type',
  'Wound Care',
  'Antibiotics',
  'Rabies',
  'Disposition',
];

// =====================================================================
// Citations
// =====================================================================

export const MAMMALIAN_BITE_CITATIONS: Citation[] = [
  { num: 1, text: 'Stevens DL, et al. IDSA Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections: 2014 Update. Clin Infect Dis. 2014;59(2):e10-52.' },
  { num: 2, text: 'Baddour LM, et al. Skin Wound Infections: Management and Microbiology. UpToDate. 2024.' },
  { num: 3, text: 'Abrahamian FM, Goldstein EJ. Microbiology of animal bite wound infections. Clin Microbiol Rev. 2011;24(2):231-246.' },
  { num: 4, text: 'Kennedy SA, et al. Human and other mammalian bite injuries of the hand: evaluation and management. J Am Acad Orthop Surg. 2015;23(1):47-57.' },
  { num: 5, text: 'Manning SE, et al. Human Rabies Prevention — United States, 2008: ACIP Recommendations. MMWR Recomm Rep. 2008;57(RR-3):1-28.' },
  { num: 6, text: 'Rupprecht CE, et al. Can rabies be eradicated? Dev Biol (Basel). 2008;131:95-121.' },
  { num: 7, text: 'Cohen JI, et al. Recommendations for prevention of and therapy for exposure to B virus. Clin Infect Dis. 2002;35(10):1191-1203.' },
  { num: 8, text: 'Havers FP, et al. Use of Tetanus Toxoid, Reduced Diphtheria Toxoid, and Acellular Pertussis Vaccines: ACIP Recommendations — United States, 2020. MMWR Recomm Rep. 2020;69(3):77-83.' },
];
