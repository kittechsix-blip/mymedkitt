// MedKitt — Laceration Repair Consult
// Assessment → Irrigation → Anesthesia → Closure decision → Technique → Special sites → Aftercare
// Category: Procedures. 7 modules.
// Sources: ALiEM, LITFL, StatPearls NBK470598, Prabhakar 2015, Karounis 2004, CDC tetanus

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const LACERATION_REPAIR_MODULE_LABELS = [
  'Initial Assessment',
  'Irrigation & Prep',
  'Anesthesia',
  'Closure Decision',
  'Technique',
  'Special Sites',
  'Aftercare & Disposition',
];

export const LACERATION_REPAIR_CITATIONS: Citation[] = [
  { num: 1, text: 'Forsch RT, Little SH, Williams C. Laceration repair: a practical approach. Am Fam Physician. 2017;95(10):628-636. PMID: 28671378.' },
  { num: 2, text: 'Prabhakar H, Rath S, Kalaivani M, Bhanderi N. Adrenaline with lidocaine for digital nerve blocks. Cochrane Database Syst Rev. 2015;(3):CD010645. PMID: 25756162.' },
  { num: 3, text: 'Karounis H, et al. A randomized, controlled trial comparing long-term cosmetic outcomes of traumatic pediatric lacerations repaired with absorbable plain gut versus nonabsorbable nylon sutures. Acad Emerg Med. 2004;11(7):730-735. PMID: 15231459.' },
  { num: 4, text: 'Quinn JV, et al. A randomized trial comparing octylcyanoacrylate tissue adhesive and sutures in the management of lacerations. JAMA. 1997;277(19):1527-1530. PMID: 9153366.' },
  { num: 5, text: 'Hollander JE, Singer AJ. Laceration management. Ann Emerg Med. 1999;34(3):356-367. PMID: 10459093.' },
  { num: 6, text: 'CDC. Tetanus: For Clinicians. Updated 2022. Available at cdc.gov/tetanus/clinicians.html.' },
  { num: 7, text: 'Moscati RM, et al. A multicenter comparison of tap water versus sterile saline for wound irrigation. Acad Emerg Med. 2007;14(5):404-409. PMID: 17456554.' },
  { num: 8, text: 'StatPearls. Laceration Repair. NBK470598. Updated 2024.' },
  { num: 9, text: 'ALiEM. Sutures: When and What to Use. 2019. Available at aliem.com.' },
];

export const LACERATION_REPAIR_CRITICAL_ACTIONS = [
  { text: 'Screen for nerve, tendon, vessel, or joint involvement before closure', nodeId: 'lac-assessment' },
  { text: 'Tap water irrigation is non-inferior to sterile saline (Moscati 2007)', nodeId: 'lac-irrigation' },
  { text: 'Lidocaine + epi is safe in digits (Prabhakar 2015 Cochrane — no necrosis)', nodeId: 'lac-anesthesia' },
  { text: 'Absorbable plain gut equivalent to nylon for pediatric facial lacs (Karounis 2004)', nodeId: 'lac-suture-selection' },
  { text: 'Tetanus prophylaxis per CDC schedule — booster if >5 yr for dirty wound', nodeId: 'lac-aftercare' },
  { text: 'Bite wounds on face <24 hr may close primarily; hand bites do NOT close', nodeId: 'lac-bite-wounds' },
] as const;

export const LACERATION_REPAIR_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'lac-start',
    type: 'info',
    module: 1,
    title: 'Laceration Repair',
    body: '> **First-pass goal:** rule out occult injury (nerve/tendon/vessel/joint/foreign body), then decide closure method and timing.\n\n**Workflow:**\n1. Triage emergent findings\n2. Neurovascular and tendon exam **before anesthesia**\n3. Irrigation + foreign body sweep\n4. Anesthesia\n5. Closure decision (suture / staple / glue / leave open)\n6. Technique + special-site rules\n7. Aftercare + tetanus + follow-up\n\n[Steps Summary](#/info/lac-steps) · [Suture Selection Table](#/info/lac-suture-table) · [Anesthesia Cheat Sheet](#/info/lac-anesthesia-doses)',
    citation: [1, 8],
    next: 'lac-triage',
    skippable: false,
  },

  {
    id: 'lac-triage',
    type: 'question',
    module: 1,
    title: 'Emergent Findings?',
    body: 'Screen for injuries that change the workup.',
    options: [
      {
        label: 'Arterial bleeding / pulsatile flow',
        description: 'Pressure, tourniquet if needed, surgical consult',
        next: 'lac-arterial',
        urgency: 'critical',
      },
      {
        label: 'Open fracture / joint capsule violation',
        description: 'Bone visible, fat globules, air in joint',
        next: 'lac-open-fx',
        urgency: 'critical',
      },
      {
        label: 'Suspected nerve or tendon injury',
        description: 'Motor or sensory deficit distal to wound',
        next: 'lac-tendon-nerve',
        urgency: 'urgent',
      },
      {
        label: 'Bite wound (animal/human)',
        description: 'Different irrigation, antibiotic, closure rules',
        next: 'lac-bite-wounds',
        urgency: 'urgent',
      },
      {
        label: 'Routine soft tissue laceration',
        description: 'No vital structures, intact NV exam',
        next: 'lac-assessment',
      },
    ],
    summary: 'Screen arterial, open fx, tendon/nerve, and bite wounds before routine pathway',
  },

  {
    id: 'lac-arterial',
    type: 'result',
    module: 1,
    title: 'Arterial Bleeding — STOP',
    body: '> **Active arterial injury changes the algorithm.** Do not blind-clamp; vessel ligation in ED risks nerve injury.',
    recommendation: '**Bleeding control ladder:**\n1. Direct pressure × 10 min uninterrupted\n2. Elevate above heart if extremity\n3. Pressure dressing\n4. Tourniquet (note time) if life-threatening\n5. Surgical consult for exploration\n\n**Avoid:** blind hemostat clamping near nerves (hand, face, neck).\n\nReturn to [assessment](#/node/lac-assessment) only after definitive bleeding control.',
    citation: [1, 5],
    safetyLevel: 'critical',
  },

  {
    id: 'lac-open-fx',
    type: 'result',
    module: 1,
    title: 'Open Fracture / Joint — STOP',
    body: '> Bone visible, fat globules, or air in joint = open fracture or joint capsule violation.',
    recommendation: '**Actions:**\n• Cover with saline-moist gauze\n• X-ray (consider [Ottawa rules](#/tree/ankle-injury) if applicable)\n• Tetanus prophylaxis\n• IV antibiotics: [cefazolin](#/drug/cefazolin/open-fracture) within 1 hr of presentation\n• Orthopedics consult for OR washout (Gustilo I-IIIc)\n• Do NOT close in ED — surgical washout first',
    citation: [1, 8],
    safetyLevel: 'critical',
  },

  {
    id: 'lac-tendon-nerve',
    type: 'result',
    module: 1,
    title: 'Tendon or Nerve Injury Suspected',
    body: '> Any motor weakness, sensory deficit, or tendon visible in wound base needs hand/plastic surgery.',
    recommendation: '**Document before block:**\n• Two-point discrimination (<6 mm normal fingertip)\n• Motor: each FDS, FDP, EPL, EIP, etc. independently\n• Capillary refill\n\n**Disposition:**\n• Partial laceration <50%: can close skin, sling, hand clinic 3-5 d\n• Complete laceration or >50%: ED repair NOT indicated — splint, hand surgery in 1-2 wk\n• Open digital nerve repair within 7-14 d for best outcome\n\nGet [hand/plastics consult](#/info/lac-consult-criteria).',
    citation: [1, 8],
    safetyLevel: 'critical',
  },

  {
    id: 'lac-bite-wounds',
    type: 'info',
    module: 1,
    title: 'Bite Wound Pathway',
    body: '> Bites need separate rules. **Hand bites do not close primarily.**\n\n**Irrigation:** copious; consider extending wound to expose deep extent.\n\n**Closure:**\n• Face bite <24 hr, low-tension, clean: primary closure OK\n• Hand bite (human or animal): leave open, delayed primary closure at 72 hr if clean\n• Cat bite (deep puncture): leave open — high infection rate (~50%)\n• Dog bite trunk/extremity: case-by-case; primary if <12 hr and clean\n\n**Antibiotics:** [amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/bite-wound) 875/125 mg PO BID × 5-7 d.\n• PCN allergy: [doxycycline](#/drug/doxycycline/bite-wound) + [metronidazole](#/drug/metronidazole/anaerobic-coverage).\n\n**Rabies risk:** assess per [CDC rabies pathway](#/tree/rabies-exposure).',
    citation: [1, 6, 8],
    next: 'lac-assessment',
    safetyLevel: 'critical',
  },

  {
    id: 'lac-assessment',
    type: 'info',
    module: 1,
    title: 'Wound Assessment',
    body: '**Document before anesthesia:**\n• Location, length, depth\n• Mechanism (clean cut, crush, contamination)\n• Time since injury (golden period: face <24 hr, body <12 hr, hand <6 hr)\n• Foreign body suspected? (glass, wood, metal)\n• Motor and sensory exam distal to wound\n• Tendon function each compartment\n• Capillary refill + pulses\n\n**X-ray indications:**\n• Suspected radiopaque foreign body (glass >2 mm visible on plain film)\n• Injury near joint, periosteum\n• High-velocity mechanism\n\n**Ultrasound:** sensitive for wood/organic foreign body that x-ray misses.',
    citation: [1, 8],
    next: 'lac-irrigation',
    summary: 'Mechanism, time, FB risk, neurovascular exam documented before block',
  },

  // =====================================================================
  // MODULE 2: IRRIGATION & PREP
  // =====================================================================

  {
    id: 'lac-irrigation',
    type: 'info',
    module: 2,
    title: 'Irrigation & Preparation',
    body: '> **Irrigation is the single most important infection-prevention step.** Volume > antiseptic choice.\n\n**Solution:** tap water non-inferior to sterile saline (Moscati 2007). Use whichever is faster and adequate volume.\n\n**Volume:** 50-100 mL per cm of wound length. Pressure: 5-8 psi (19-gauge angiocath on 35-60 mL syringe, or commercial splash shield).\n\n**Avoid in wound:** povidone-iodine, hydrogen peroxide, chlorhexidine — all cytotoxic to fibroblasts.\n\n**OK on intact skin around wound:** chlorhexidine or povidone-iodine prep.\n\n**Hair removal:** clip if needed (do NOT shave eyebrows — may not grow back).',
    citation: [1, 7, 8],
    next: 'lac-foreign-body',
    summary: 'Tap water = saline; 50-100 mL/cm at 5-8 psi; no antiseptics in wound',
  },

  {
    id: 'lac-foreign-body',
    type: 'question',
    module: 2,
    title: 'Foreign Body Concern?',
    body: 'After irrigation, sweep wound for residual debris.',
    options: [
      {
        label: 'No foreign body suspected, wound clean',
        description: 'Glass/wood/metal mechanism ruled out',
        next: 'lac-anesthesia',
      },
      {
        label: 'Possible FB — get imaging',
        description: 'Glass mechanism, crush injury, organic material',
        next: 'lac-imaging',
      },
    ],
    summary: 'Sweep then image if any FB suspicion',
  },

  {
    id: 'lac-imaging',
    type: 'info',
    module: 2,
    title: 'Imaging for Foreign Body',
    body: '**Choose modality by FB type:**\n\n| FB type | Best test |\n|--|--|\n| Glass >2 mm | Plain x-ray (99% sensitive) |\n| Metal | Plain x-ray |\n| Wood/plastic/thorn | **Ultrasound** (US) |\n| Deep, complex, near joint | CT |\n\n**Tip:** Mark wound entry with paperclip taped to skin to localize on film.\n\nIf FB found and removable: extract, re-irrigate. If buried deep/migrated: ortho or surgery consult.',
    citation: [1, 8],
    next: 'lac-anesthesia',
    summary: 'X-ray for glass/metal; US for wood/organic; mark with paperclip',
  },

  // =====================================================================
  // MODULE 3: ANESTHESIA
  // =====================================================================

  {
    id: 'lac-anesthesia',
    type: 'info',
    module: 3,
    title: 'Anesthesia Selection',
    body: '> [Lidocaine](#/drug/lidocaine/laceration-repair) is workhorse. **Epi is safe in digits** (Prabhakar 2015 Cochrane review — no documented digital necrosis).\n\n**Local infiltration:**\n• [Lidocaine 1%](#/drug/lidocaine/laceration-repair): max 4.5 mg/kg (300 mg adult)\n• [Lidocaine 1% with epi 1:100,000](#/drug/lidocaine/laceration-repair): max 7 mg/kg (500 mg adult), longer duration, less bleeding\n• Bicarb buffer 1:10 (1 mL 8.4% NaHCO3 per 9 mL lido) reduces sting\n• Warm to body temp reduces sting\n• 30-gauge needle, inject through wound edge (not skin)\n\n**Regional blocks:** preferred when feasible — less distortion, larger area covered.\n• [Digital block](#/info/lac-digital-block): finger, toe\n• [Wrist block](#/info/lac-wrist-block): hand\n• [Ankle block](#/info/lac-ankle-block): foot\n• [Supraorbital / infraorbital / mental block](#/info/lac-face-blocks): face\n\n**Topical (pediatric, low-tension face/scalp):**\n• [LET gel](#/drug/let-gel/topical-anesthesia) (lidocaine-epinephrine-tetracaine): apply 20-30 min; check for blanching.\n• Avoid on mucous membranes, end-arteries (nose tip, ears, digits, penis).',
    citation: [1, 2, 8, 9],
    next: 'lac-anesthesia-special',
    safetyLevel: 'critical',
    summary: 'Lido+epi safe in digits per Cochrane; max dose 7 mg/kg with epi; bicarb buffer reduces sting',
  },

  {
    id: 'lac-anesthesia-special',
    type: 'question',
    module: 3,
    title: 'Special Anesthesia Situation?',
    body: 'Most lacs use local + epi. Special cases:',
    options: [
      {
        label: 'Pediatric — anxious, small lac',
        description: 'Consider LET + procedural sedation backup',
        next: 'lac-peds-anesthesia',
      },
      {
        label: 'Large wound, multiple sites',
        description: 'Need higher total dose — block over infiltration',
        next: 'lac-block',
      },
      {
        label: 'Standard infiltration, proceed',
        description: 'Lido or lido+epi as planned',
        next: 'lac-closure-decision',
      },
    ],
    summary: 'Peds → LET; large wound → regional; standard → infiltrate',
  },

  {
    id: 'lac-peds-anesthesia',
    type: 'info',
    module: 3,
    title: 'Pediatric Anesthesia',
    body: '**Stepwise:**\n1. Topical [LET gel](#/drug/let-gel/topical-anesthesia) × 20-30 min — sufficient for many small face/scalp lacs.\n2. Add small-volume infiltration if needed — use 30-gauge through wound edge, inject slowly, buffered lido.\n3. Consider [intranasal midazolam](#/drug/midazolam/anxiolysis-peds) 0.2 mg/kg or [PO midazolam](#/drug/midazolam/anxiolysis-peds) 0.5 mg/kg for anxiolysis.\n4. Procedural sedation ([ketamine](#/drug/ketamine/procedural-sedation) IM/IV) if needed — see [Pediatric Procedural Sedation](#/tree/procedural-sedation).\n\n**Restraint:** papoose or parent-hold for short procedures only; high stress alternative to sedation.',
    citation: [1, 8],
    next: 'lac-closure-decision',
    summary: 'LET first; add infiltration; intranasal midaz for anxiolysis; PSA if complex',
  },

  {
    id: 'lac-block',
    type: 'info',
    module: 3,
    title: 'Regional Block',
    body: '**Why block over infiltration?**\n• Higher total dose available without tissue distortion\n• Single injection covers large area\n• Better cosmesis (no tissue swelling at repair site)\n\n**Most useful:**\n• Digital block: 1 mL lido per side of digit, dorsal approach (Prabhakar — epi OK)\n• Supraorbital/infraorbital/mental: 1-2 mL each, onset 5-10 min\n• Wrist median/ulnar/radial: 3-5 mL each\n\n**Always:** aspirate before injecting; avoid intravascular.\n\nFull technique [details](#/info/lac-blocks-techniques).',
    citation: [1, 2],
    next: 'lac-closure-decision',
    summary: 'Block for larger wounds; 1-5 mL per nerve; aspirate before inject',
  },

  // =====================================================================
  // MODULE 4: CLOSURE DECISION
  // =====================================================================

  {
    id: 'lac-closure-decision',
    type: 'question',
    module: 4,
    title: 'Closure Method?',
    body: 'Match closure to wound type, location, tension, contamination.',
    options: [
      {
        label: 'Standard sutured closure',
        description: 'Most lacerations >0.5 cm, any depth, any tension',
        next: 'lac-suture-selection',
      },
      {
        label: 'Tissue adhesive (glue)',
        description: 'Low-tension, dry, linear, <5 cm, face/scalp/extremity',
        next: 'lac-glue',
      },
      {
        label: 'Staples',
        description: 'Scalp, trunk — fast, cosmesis less critical',
        next: 'lac-staples',
      },
      {
        label: 'Steri-Strips / hair apposition',
        description: 'Very superficial, no tension, scalp hair apposition',
        next: 'lac-steristrips',
      },
      {
        label: 'Leave open / delayed primary',
        description: 'Heavily contaminated, presented late, hand bite',
        next: 'lac-leave-open',
      },
    ],
    summary: 'Sutures default; glue for low-tension; staples for scalp; leave open if contaminated',
  },

  {
    id: 'lac-glue',
    type: 'info',
    module: 4,
    title: 'Tissue Adhesive (Cyanoacrylate)',
    body: '> Equivalent cosmesis to sutures for low-tension, dry wounds (Quinn 1997).\n\n**Indications:**\n• Linear, <5 cm, low tension\n• Face, scalp, extremity (NOT joints, hands, feet bottom)\n• Dry, hemostatic wound bed\n\n**Contraindications:**\n• High-tension or joint-crossing wound\n• Mucosal surfaces\n• Hair-bearing scalp (consider hair apposition first)\n• Infected or contaminated\n• Bite wound\n\n**Technique:**\n• Approximate edges with fingers/forceps\n• Apply 3 thin layers, 30 s between layers\n• Avoid pooling in wound (causes inflammation, dehiscence)\n• Sloughs in 5-10 d — no removal needed\n\n**Aftercare:** keep dry × 5 d. No bacitracin (dissolves adhesive).',
    citation: [4, 8, 9],
    next: 'lac-aftercare',
    summary: 'Low-tension, <5 cm; 3 thin layers; keep dry × 5 d; no ointment',
  },

  {
    id: 'lac-staples',
    type: 'info',
    module: 4,
    title: 'Staples',
    body: '**Best for:** scalp, trunk, extremity (not face, hands, feet, joints).\n\n**Pros:** fast, lower infection rate than sutures, removable without anesthesia.\n\n**Technique:**\n• Approximate edges with forceps, evert\n• Staple every 0.5-1 cm, perpendicular to long axis\n• Confirm scalp galea closed first if deep\n\n**Removal:** 7-14 d depending on site (see [aftercare table](#/info/lac-removal-times)).',
    citation: [1, 8],
    next: 'lac-aftercare',
    summary: 'Scalp/trunk/extremity; fast; remove 7-14 d',
  },

  {
    id: 'lac-steristrips',
    type: 'info',
    module: 4,
    title: 'Steri-Strips / Hair Apposition',
    body: '**Steri-Strips:**\n• Very superficial, no tension\n• Pre-treat skin with benzoin or Mastisol for adhesion\n• Cross-strips of perpendicular tape add strength\n• Avoid joint creases\n\n**Hair apposition technique (HAT):**\n• Scalp lacs with hair ≥3 cm long\n• Twist 4-5 strands from each side, cross over wound\n• Glue twist with cyanoacrylate\n• No suturing or shaving needed\n• Equivalent cosmesis to sutures',
    citation: [1, 8],
    next: 'lac-aftercare',
    summary: 'Steri-Strips for superficial no-tension; HAT for scalp ≥3 cm hair',
  },

  {
    id: 'lac-leave-open',
    type: 'info',
    module: 4,
    title: 'Leave Open / Delayed Primary Closure',
    body: '**Indications:**\n• Heavily contaminated\n• Hand bite (human or cat)\n• Presented late (>24 hr face, >12 hr body, >6 hr hand)\n• Crush with significant devitalized tissue\n• Abscess\n\n**Management:**\n• Irrigate thoroughly\n• Pack lightly with iodoform or wet-to-dry gauze\n• Daily wound check\n• Delayed primary closure at 72-96 hr if no infection\n\n**Antibiotics:** consider for high-risk wounds — see [bite wound pathway](#/node/lac-bite-wounds) or [skin & soft tissue infection](#/tree/skin-soft-tissue-infection).',
    citation: [1, 5, 8],
    next: 'lac-aftercare',
    safetyLevel: 'critical',
    summary: 'Contaminated, bite, late presentation → leave open, recheck 72-96 h',
  },

  // =====================================================================
  // MODULE 5: TECHNIQUE
  // =====================================================================

  {
    id: 'lac-suture-selection',
    type: 'info',
    module: 5,
    title: 'Suture Selection',
    body: '> Match suture to location and tension.\n\n**Skin (non-absorbable):**\n| Site | Size | Removal |\n|--|--|--|\n| Face | 6-0 nylon/prolene | 5 d |\n| Scalp | 4-0 to 5-0 nylon | 7-14 d |\n| Trunk/extremity | 4-0 to 5-0 | 7-10 d |\n| Hand/foot | 4-0 to 5-0 | 10-14 d |\n| Over joint | 3-0 to 4-0 | 10-14 d |\n\n**Absorbable for skin:** [Karounis 2004](#/info/lac-karounis) showed plain gut equivalent to nylon for pediatric face — avoids removal visit. Reasonable for any peds face or low-tension area.\n\n**Deep / dermal:** absorbable (Vicryl, Monocryl) 4-0 or 5-0.\n\n**Galea (scalp):** 3-0 Vicryl to prevent hematoma if deep.\n\nFull table: [Suture selection by site](#/info/lac-suture-table).',
    citation: [1, 3, 8],
    next: 'lac-technique',
    summary: 'Nylon 6-0 face / 4-0 trunk; absorbable OK for peds face (Karounis)',
  },

  {
    id: 'lac-technique',
    type: 'info',
    module: 5,
    title: 'Closure Technique',
    body: '**Principles:**\n• Evert edges (avoids inversion → depressed scar)\n• Equal bites either side\n• No tension across closure (use deep sutures if needed)\n• Match landmarks (vermillion border, eyebrow, hairline) FIRST\n• Knots 3 throws minimum (4 for monofilament)\n• Keep knots off the wound line\n\n**Stitch types:**\n• **Simple interrupted:** workhorse — most lacs\n• **Vertical mattress:** high tension, gaping wounds\n• **Horizontal mattress:** fragile tissue, ear cartilage\n• **Running:** long linear lacs, faster, less precise\n• **Subcuticular:** deep dermal, cosmetic\n• **Deep absorbable:** wounds deeper than dermis, reduce tension\n\n**Spacing:** 2-5 mm apart, 2-5 mm from edge — closer on face, wider on trunk.\n\n**Special:** [vermillion border](#/info/lac-vermillion), [eyebrow](#/info/lac-eyebrow), [ear cartilage](#/info/lac-ear), [eyelid](#/info/lac-eyelid).',
    citation: [1, 8, 9],
    next: 'lac-special-sites',
    summary: 'Evert edges; match landmarks first; spacing 2-5 mm; technique by tension',
  },

  // =====================================================================
  // MODULE 6: SPECIAL SITES
  // =====================================================================

  {
    id: 'lac-special-sites',
    type: 'question',
    module: 6,
    title: 'Special Site Considerations?',
    body: 'Some locations have specific rules.',
    options: [
      {
        label: 'Face — vermillion, eyebrow, ear, eyelid',
        description: 'Cosmetic + functional concerns',
        next: 'lac-face',
      },
      {
        label: 'Hand / digit',
        description: 'Tendon, nerve, joint concerns',
        next: 'lac-hand',
      },
      {
        label: 'Scalp',
        description: 'Galea check, hematoma prevention',
        next: 'lac-scalp',
      },
      {
        label: 'No special site — proceed to aftercare',
        description: 'Routine trunk or extremity',
        next: 'lac-aftercare',
      },
    ],
    summary: 'Face/hand/scalp have site-specific rules',
  },

  {
    id: 'lac-face',
    type: 'info',
    module: 6,
    title: 'Facial Lacerations',
    body: '**Landmarks first** — match before closure to avoid step-off.\n\n**Vermillion border (lip):** First stitch IS the vermillion line. Use 6-0 nylon, place suture exactly at white roll. A 1 mm step-off is visible at conversational distance.\n\n**Eyebrow:** Do NOT shave. Approximate hair direction. 5-0 or 6-0 nylon.\n\n**Ear:** Cover all exposed cartilage with skin — exposed cartilage = chondritis. Use 5-0 or 6-0 nylon through skin, NOT cartilage. Consider antibiotic ([ciprofloxacin](#/drug/ciprofloxacin/auricular)) if cartilage involved.\n\n**Eyelid:** Refer to ophthalmology if:\n• Through tarsal plate\n• Through lid margin\n• Medial 1/3 (canalicular system)\n• Levator involvement (ptosis)\n• Fat extruding (orbital septum violated → [globe rupture](#/tree/globe-rupture) workup)\n\nSimple superficial lid skin lac: 6-0 fast-absorbing gut.',
    citation: [1, 8],
    next: 'lac-aftercare',
    safetyLevel: 'critical',
    summary: 'Vermillion = first stitch; never shave brow; cover ear cartilage; eyelid red flags → ophtho',
  },

  {
    id: 'lac-hand',
    type: 'info',
    module: 6,
    title: 'Hand & Digit Lacerations',
    body: '**Before closing any hand lac, document:**\n• Two-point discrimination each digit\n• FDP, FDS, EPL, EIP function\n• Capillary refill, Doppler if concerned\n• Range of motion each joint\n\n**Closure:**\n• Digital block with [lido + epi](#/drug/lidocaine/laceration-repair) (safe per Prabhakar 2015)\n• 4-0 or 5-0 nylon, simple interrupted\n• Splint in position of function if over joint\n• Elevate × 24 hr\n\n**Specific:**\n• Subungual hematoma + nail-bed lac: see [nail-bed repair](#/info/lac-nail-bed)\n• Mallet finger / extensor injury: splint, hand follow-up\n• Volar > 1 cm: high index of suspicion for tendon\n• Web space: avoid running stitch (contracture)\n\nRemoval 10-14 d.',
    citation: [1, 2, 8],
    next: 'lac-aftercare',
    summary: 'Document nerve/tendon before block; lido+epi OK in fingers; remove 10-14 d',
  },

  {
    id: 'lac-scalp',
    type: 'info',
    module: 6,
    title: 'Scalp Lacerations',
    body: '**Galea check:** palpate base of wound. Galea is fibrous layer — if disrupted, must close separately with absorbable (4-0 Vicryl) to prevent expanding hematoma.\n\n**Hemostasis:** scalp bleeds dramatically. Direct pressure × 10 min. Raney clips if available. Lido + epi infiltration helps both anesthesia and hemostasis.\n\n**Closure options:**\n• Hair apposition (HAT) — if hair ≥3 cm\n• Staples — fast, equivalent cosmesis\n• Sutures — 4-0 nylon if cosmesis priority\n\n**Removal:** 7-14 d.\n\n**Red flags:** depressed skull, CSF leak, mechanism with possible TBI → [head injury pathway](#/tree/head-injury).',
    citation: [1, 8],
    next: 'lac-aftercare',
    summary: 'Galea check + close if open; staples or HAT fast; rule out depressed skull/TBI',
  },

  // =====================================================================
  // MODULE 7: AFTERCARE & DISPOSITION
  // =====================================================================

  {
    id: 'lac-aftercare',
    type: 'info',
    module: 7,
    title: 'Aftercare, Tetanus, Disposition',
    body: '**Wound care:**\n• Keep clean and dry × 24 hr (48 hr if glue)\n• Then gentle wash with soap and water daily\n• Petrolatum or bacitracin (NOT on glue) — keeps scar moist, improves cosmesis\n• Avoid hydrogen peroxide and antiseptics after closure\n• Sunblock × 6 mo to prevent hyperpigmentation\n\n**Tetanus (CDC):**\n| Status | Clean wound | Dirty wound |\n|--|--|--|\n| Uncertain or <3 doses | Tdap | Tdap + TIG |\n| ≥3 doses, last ≥10 yr | Tdap | Tdap |\n| ≥3 doses, last ≥5 yr | none | Tdap |\n| ≥3 doses, last <5 yr | none | none |\n\n**Suture/staple removal:**\n• Face: 5 d (then steri-strips × 5 d)\n• Scalp: 7-14 d\n• Trunk/extremity: 7-10 d\n• Hand/foot/over joint: 10-14 d\n\n**Prophylactic antibiotics — NOT routine.** Consider for:\n• Bite wounds (see [bite pathway](#/node/lac-bite-wounds))\n• Heavy contamination, delayed presentation\n• Immunocompromised (DM, HIV, transplant)\n• Open fracture, joint involvement\n\n**Follow-up:**\n• Wound check 48-72 hr if concerned\n• Suture removal at appropriate interval\n• Return if redness extending >1 cm, drainage, fever, increasing pain',
    citation: [1, 6, 8],
    next: 'lac-discharge',
    safetyLevel: 'critical',
    summary: 'Petrolatum + sunblock; tetanus per CDC; antibiotics not routine; removal table by site',
  },

  {
    id: 'lac-discharge',
    type: 'result',
    module: 7,
    title: 'Discharge — Laceration Repaired',
    body: '> Document everything. Photo before and after if able (with consent).',
    recommendation: '**Documentation checklist:**\n• Mechanism, time, contamination\n• Pre-block neurovascular exam\n• Irrigation volume + solution\n• Anesthetic type + dose\n• Closure method + materials\n• Tetanus status + given\n• Aftercare instructions given\n• Follow-up plan + suture removal date\n\n**Return precautions:**\n• Increasing redness, warmth, swelling beyond 24 hr\n• Drainage, pus, fever\n• Increasing pain after 48 hr\n• Wound dehiscence\n• Numbness or motor weakness new\n\n**Sunblock × 6 mo for cosmesis.**',
    citation: [1, 6, 8],
  },
];

export const LACERATION_REPAIR_NODE_COUNT = LACERATION_REPAIR_NODES.length;
