// MedKitt - Extensor Tendon Repair
// Zone classification (I-VIII), ED repair vs referral, examination, repair techniques, splinting
// 6 modules: Overview -> Assessment -> Zone Classification -> Repair Techniques -> Splinting -> Disposition
// 28 nodes total.
// Sources: Roberts & Hedges, ACEP Now, Medscape, ALiEM, StatPearls, Journal of Hand Surgery

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const EXTENSOR_TENDON_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Test extension strength with active ROM against gravity', nodeId: 'ext-exam' },
  { text: 'Determine zone of injury using anatomic landmarks', nodeId: 'ext-zones' },
  { text: 'Refer Zones III, VII, VIII to hand surgery (complex anatomy)', nodeId: 'ext-zones' },
  { text: 'Irrigate wound thoroughly before repair', nodeId: 'ext-repair-overview' },
  { text: 'Repair with 4-0 or 5-0 non-absorbable suture (nylon/prolene)', nodeId: 'ext-repair-overview' },
  { text: 'Use figure-of-8 or horizontal mattress for flat tendons', nodeId: 'ext-repair-overview' },
  { text: 'Splint in extension with proper position for each zone', nodeId: 'ext-splint-overview' },
  { text: 'Arrange hand surgery follow-up within 5-7 days', nodeId: 'ext-splint-overview' },
];

export const EXTENSOR_TENDON_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: OVERVIEW
  // =====================================================================

  {
    id: 'ext-start',
    type: 'question',
    module: 1,
    title: 'Extensor Tendon Repair',
    body: 'Extensor tendon injuries are common in the ED. Unlike flexor tendons, many extensor injuries can be definitively managed by emergency physicians with appropriate training. [1][2]\n\n**Key Principles:**\n- Extensor tendons lack true sheaths, making them prone to adhesions\n- Flat, thin distal tendons are more challenging than thick proximal tendons\n- Zone classification guides repair approach and referral decisions\n- Up to 90% tendon laceration can preserve gravity-dependent extension - examine carefully [3]\n\n**ED-Repairable Zones:** I, II, IV, V, VI (with conditions)\n**Refer to Hand Surgery:** III, VII, VIII (complex anatomy)',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Physical Examination',
        description: 'Assessment techniques for extensor injury',
        next: 'ext-exam',
      },
      {
        label: 'Zone Classification',
        description: 'Zones I-VIII with anatomic landmarks',
        next: 'ext-zones',
      },
      {
        label: 'Repair Techniques',
        description: 'Suture methods by zone',
        next: 'ext-repair-overview',
      },
      {
        label: 'Splinting Protocols',
        description: 'Immobilization by zone',
        next: 'ext-splint-overview',
      },
    ],
    summary: 'ED-repairable zones: I, II, IV, V, VI. Refer zones III, VII, VIII to hand surgery',
  },

  // =====================================================================
  // MODULE 2: PHYSICAL EXAMINATION
  // =====================================================================

  {
    id: 'ext-exam',
    type: 'info',
    module: 2,
    title: 'Physical Examination',
    body: '**Preparation**\n- Adequate lighting and analgesia (digital or regional block)\n- Hemostasis: Penrose drain wrap for digit; BP cuff at 260 mmHg for hand/forearm [4]\n- Examine through full ROM - position at time of injury may differ from presentation\n\n**Key Assessment Steps:**\n\n1. **Digital Cascade Assessment**\n   - Compare resting posture to contralateral hand\n   - Loss of normal cascade = tendon injury\n\n2. **Active Extension Testing**\n   - Test extension at each joint (DIP, PIP, MCP) in isolation\n   - Test against resistance - partial injuries may have weak extension\n   - Juncturae tendinae allow MCP extension despite single EDC laceration\n\n3. **Elson Test (Central Slip Injury - Zone III)**\n   - Flex PIP to 90 degrees over table edge\n   - Ask patient to extend against resistance\n   - Positive: rigid DIP (lateral bands compensating) or inability to extend DIP\n   - Tests central slip integrity\n\n4. **Drop Finger Test**\n   - Patient cannot maintain active extension of digit\n   - Pathognomonic for complete tendon disruption\n\n5. **Wound Exploration**\n   - Extend wounds if needed to visualize tendon\n   - Examine with finger in position it was at time of injury\n   - Look for partial lacerations (>50% requires repair)',
    citation: [3, 4, 5],
    images: [
      {
        src: 'images/extensor-tendon/elson-test.png',
        alt: 'Elson test for central slip injury: PIP flexed 90 degrees over table edge, testing DIP extension',
        caption: 'Elson test: Positive if DIP is rigid during attempted PIP extension (lateral band compensation)',
      },
    ],
    next: 'ext-exam-pearls',
    summary: 'Test extension against resistance at each joint — 90% laceration can still allow gravity extension',
    safetyLevel: 'warning',
  },

  {
    id: 'ext-exam-pearls',
    type: 'info',
    module: 2,
    title: 'Examination Pearls',
    body: '**Critical Pitfalls:**\n\n- **Up to 90% tendon laceration can still allow gravity-dependent extension** - always test against resistance [3]\n- **Position of injury matters** - examine with joint in the position it was when injured\n- **Zone V over MCP** - treat as human bite until proven otherwise ("fight bite")\n\n**When to Suspect Partial Injury:**\n- Pain with extension against resistance\n- Weak extension compared to contralateral side\n- Visible tendon damage on wound exploration\n\n**Repair Thresholds:**\n| Injury | Management |\n|--------|------------|\n| <50% tendon | Splint x 6 weeks |\n| >50% tendon | Surgical repair (ED or OR) |\n| Complete laceration | Surgical repair |\n\n**Imaging:**\n- X-ray to rule out fracture/foreign body\n- High-resolution ultrasound more accurate than exam or MRI for detecting tendon injury [6]\n- MRI rarely needed in acute setting',
    citation: [3, 5, 6],
    next: 'ext-start',
    summary: 'Zone V over MCP = fight bite until proven otherwise. Always test against resistance, not just gravity',
    skippable: true,
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 3: ZONE CLASSIFICATION
  // =====================================================================

  {
    id: 'ext-zones',
    type: 'question',
    module: 3,
    title: 'Zone Classification (Kleinert-Verdan)',
    body: 'The dorsum of hand, wrist, and forearm are divided into **8 zones** (I-VIII). Odd numbers overlie joints; even numbers are between joints. [1][3]\n\n**Thumb has separate classification (TI-TV)** - generally parallels finger zones.\n\n| Zone | Location | Key Structures |\n|------|----------|----------------|\n| I | DIP joint to fingertip | Terminal tendon |\n| II | Middle phalanx | Lateral bands |\n| III | PIP joint | Central slip |\n| IV | Proximal phalanx | Broad expansion |\n| V | MCP joint | Sagittal bands |\n| VI | Dorsum of hand | Juncturae |\n| VII | Wrist/retinaculum | Extensor retinaculum |\n| VIII | Distal forearm | Muscle-tendon junction |\n\n**Select a zone for details:**',
    citation: [1, 3, 7],
    calculatorLinks: [
      { id: 'extensor-zone-guide', label: 'Zone Quick Reference' },
    ],
    images: [
      {
        src: 'images/extensor-tendon/zone-classification.png',
        alt: 'Diagram showing zones I through VIII on dorsum of hand and forearm',
        caption: 'Zone classification: Odd zones over joints, even zones between joints',
      },
    ],
    options: [
      {
        label: 'Zone I (DIP) - Mallet',
        description: 'Terminal tendon injuries',
        next: 'ext-zone-1',
      },
      {
        label: 'Zone II (Middle Phalanx)',
        description: 'Lateral band injuries',
        next: 'ext-zone-2',
      },
      {
        label: 'Zone III (PIP) - Boutonniere',
        description: 'Central slip injuries',
        next: 'ext-zone-3',
      },
      {
        label: 'Zone IV (Proximal Phalanx)',
        description: 'Extensor expansion',
        next: 'ext-zone-4',
      },
      {
        label: 'Zone V (MCP)',
        description: 'Fight bites, sagittal band',
        next: 'ext-zone-5',
      },
      {
        label: 'Zones VI-VIII',
        description: 'Hand, wrist, forearm',
        next: 'ext-zone-6-8',
      },
    ],
    summary: 'Odd zones overlie joints, even zones between joints — classification guides repair and referral',
  },

  {
    id: 'ext-zone-1',
    type: 'info',
    module: 3,
    title: 'Zone I - Mallet Finger',
    body: '**Anatomy:** DIP joint to fingertip. Terminal extensor tendon inserts on distal phalanx.\n\n**Mechanism:**\n- Closed: Forced flexion of extended DIP (ball striking fingertip)\n- Open: Laceration over dorsal DIP\n\n**Presentation:**\n- Flexion deformity at DIP (cannot actively extend)\n- "Dropped" fingertip\n\n**Classification:**\n- Type I: Closed, no fracture (most common)\n- Type II: Open laceration\n- Type III: Open with skin loss\n- Type IV: Fracture (A: pediatric, B: <50% articular, C: >50% articular)\n\n**ED Management:**\n\n**Closed (Type I):**\n- Stack splint (aluminum) x 8 weeks continuous, then 2 weeks night splinting [8]\n- DIP in slight hyperextension (0-10 degrees)\n- PIP FREE - prevents stiffness\n- Must maintain extension 100% of the time - any flexion restarts the clock\n- Even delayed splinting (weeks) can be effective\n\n**Open (Type II-III):**\n- Dermatotenodesis technique or figure-of-8 suture\n- Stack splint post-repair\n\n**With Fracture (Type IV):**\n- <50% articular, no subluxation: Splint\n- >50% articular or volar subluxation: Hand surgery referral',
    citation: [1, 3, 8],
    images: [
      {
        src: 'images/extensor-tendon/mallet-finger.png',
        alt: 'Mallet finger with DIP flexion deformity and stack splint application',
        caption: 'Mallet finger: Continuous DIP extension splinting x 8+ weeks',
      },
    ],
    next: 'ext-zones',
    summary: 'Mallet finger: stack splint DIP in hyperextension x 8 weeks continuous — PIP must be free',
    skippable: true,
  },

  {
    id: 'ext-zone-2',
    type: 'info',
    module: 3,
    title: 'Zone II - Middle Phalanx',
    body: '**Anatomy:** Lateral bands merge with central slip contribution at middle phalanx level.\n\n**ED Management:**\n\n**Partial Laceration (<50%):**\n- Wound care\n- Splint in extension x 3-4 weeks\n- Hand surgery follow-up\n\n**Complete or >50% Laceration:**\n- May repair in ED\n- Figure-of-8 sutures with 4-0 or 5-0 non-absorbable braided suture\n- Avoid shortening - can cause extension lag\n- Splint DIP in slight extension\n\n**Pearls:**\n- Tendons thin at this level - may not hold core sutures well\n- Use horizontal mattress or figure-of-8 rather than Kessler\n- Extension splint x 6 weeks post-repair',
    citation: [1, 5, 9],
    next: 'ext-zones',
    summary: 'Zone II: figure-of-8 sutures for >50% laceration, splint DIP in extension x 6 weeks',
    skippable: true,
  },

  {
    id: 'ext-zone-3',
    type: 'info',
    module: 3,
    title: 'Zone III - Boutonniere (Central Slip)',
    body: '**Anatomy:** Central slip inserts at base of middle phalanx. Lateral bands pass on either side.\n\n**REFER TO HAND SURGERY** - Complex anatomy beyond ED scope [4][5]\n\n**Why Zone III is Complex:**\n- Intricate interaction of central slip, lateral bands, and lumbrical insertion\n- Missed injuries lead to boutonniere deformity\n- Repair requires precise reconstruction to prevent deformity\n\n**Boutonniere Deformity (if missed/undertreated):**\n- PIP flexion + DIP hyperextension\n- Lateral bands migrate volar to PIP axis\n- Develops over days-weeks after injury\n\n**Closed Injuries:**\n- Splint PIP in full extension x 6 weeks\n- Leave DIP free (active flexion exercises prevent lateral band adhesion)\n- Prolonged night splinting x 6 more weeks\n\n**Open Injuries:**\n- Irrigate, debride, loosely close skin\n- Splint in extension\n- Hand surgery follow-up within 3-5 days for operative repair\n\n**Elson Test Reminder:**\n- Flex PIP 90 degrees over table edge\n- Positive: DIP rigid during attempted PIP extension',
    citation: [3, 4, 5, 10],
    images: [
      {
        src: 'images/extensor-tendon/boutonniere.png',
        alt: 'Boutonniere deformity with PIP flexion and DIP hyperextension',
        caption: 'Boutonniere deformity: Result of untreated central slip injury at Zone III',
      },
    ],
    next: 'ext-zones',
    summary: 'Zone III (boutonniere): REFER to hand surgery — missed injuries cause PIP flexion + DIP hyperextension',
    safetyLevel: 'warning',
  },

  {
    id: 'ext-zone-4',
    type: 'info',
    module: 3,
    title: 'Zone IV - Proximal Phalanx',
    body: '**Anatomy:** Broad extensor expansion with contributions from intrinsic muscles.\n\n**ED Management:**\n\n**May repair in ED** - relatively straightforward anatomy [4][5]\n\n**Partial (<50%):**\n- Splint x 3-4 weeks\n- Hand therapy follow-up\n\n**Complete or >50%:**\n- Modified Kessler or Bunnell stitch with 4-0 or 5-0 non-absorbable\n- Can use 2 figure-of-8 sutures side-by-side for broad tendon\n- Volar splint with wrist 30-45 degrees extension\n- MCP neutral, PIP/DIP free\n\n**Splinting Position:**\n- Wrist: 30-45 degrees extension\n- MCP: neutral to slight flexion\n- IP joints: free for motion\n\n**Follow-up:**\n- Hand surgery within 7 days\n- Hand therapy for early mobilization protocols',
    citation: [4, 5, 9],
    next: 'ext-zones',
    summary: 'Zone IV: modified Kessler or Bunnell stitch — wrist 30-45 ext, MCP neutral splint x 6 weeks',
    skippable: true,
  },

  {
    id: 'ext-zone-5',
    type: 'info',
    module: 3,
    title: 'Zone V - MCP Joint',
    body: '**CRITICAL: Treat as human bite until proven otherwise** [4][5]\n\n**Anatomy:** Sagittal bands stabilize extensor tendon over MCP. EDC, EIP, EDM present.\n\n**Fight Bite Protocol (Any laceration over MCP from punch):**\n1. X-ray for tooth fragment, fracture, air in joint\n2. Copious irrigation - at least 500 mL saline\n3. Wound exploration - look for joint capsule violation\n4. **Do NOT close primarily** - leave open\n5. Antibiotics: Amoxicillin-clavulanate 875/125 mg BID x 5-7 days\n6. Tetanus update if needed\n7. Hand surgery follow-up within 24-48 hours\n\n**Clean, Sharp Laceration (NOT bite):**\n- May repair in ED\n- Modified Kessler or Bunnell stitch with 4-0 non-absorbable\n- Repair sagittal bands if lacerated (prevents subluxation)\n- Splint: Wrist 45 degrees extension, MCP 20 degrees flexion\n\n**Splinting Position for Zone V:**\n- Wrist: 45 degrees extension\n- MCP: 20 degrees flexion\n- IP joints: free\n\n**Sagittal Band Repair:**\n- If lacerated, repair with figure-of-8 sutures\n- Prevents tendon subluxation with MCP flexion',
    citation: [4, 5, 11],
    images: [
      {
        src: 'images/extensor-tendon/fight-bite.png',
        alt: 'Fight bite over MCP joint with wound exploration',
        caption: 'Fight bite: Any MCP laceration from punch is contaminated until proven otherwise',
      },
    ],
    next: 'ext-zones',
    summary: 'Zone V MCP: ANY laceration from punch = fight bite — irrigate, do NOT close, antibiotics, hand surgery',
    safetyLevel: 'critical',
  },

  {
    id: 'ext-zone-6-8',
    type: 'info',
    module: 3,
    title: 'Zones VI, VII, VIII',
    body: '**ZONE VI - Dorsum of Hand**\n\n**May repair in ED** - often technically easy [4][5]\n\n- Juncturae tendinae connect adjacent tendons\n- Juncturae minimize tendon retraction after laceration\n- Multiple tendons may be involved\n\n**Repair:**\n- Modified Bunnell stitch with 4-0 non-absorbable\n- Excellent prognosis with primary repair\n\n**Splint:** Wrist 30 degrees, MCP neutral\n\n---\n\n**ZONE VII - Wrist/Retinaculum**\n\n**REFER TO HAND SURGERY** [4][5]\n\n- Extensor retinaculum covers tendons in 6 compartments\n- High risk of adhesion formation\n- Retinaculum release/repair requires OR expertise\n- Risk of tendon bowstringing if retinaculum not properly managed\n\n**ED Management:**\n- Irrigate, debride\n- Loosely close skin\n- Volar splint in extension\n- Urgent hand surgery referral\n\n---\n\n**ZONE VIII - Distal Forearm**\n\n**REFER TO HAND SURGERY** [4][5]\n\n- Muscle-tendon junction (musculotendinous junction)\n- Multiple tendons likely involved\n- Muscle bellies require figure-of-8 mattress sutures\n- Complex repair requiring OR\n\n**ED Management:**\n- Same as Zone VII\n- Static immobilization: Wrist 45 degrees extension x 4-5 weeks',
    citation: [4, 5, 9],
    next: 'ext-zones',
    summary: 'Zone VI: ED-repairable. Zones VII-VIII: REFER — retinaculum/muscle-tendon junction complexity',
    skippable: true,
  },

  // =====================================================================
  // MODULE 4: REPAIR TECHNIQUES
  // =====================================================================

  {
    id: 'ext-repair-overview',
    type: 'question',
    module: 4,
    title: 'Repair Techniques Overview',
    body: '**General Principles** [2][9]\n\n**Suture Selection:**\n- 3-0 for tendons at hand level (Zone VI)\n- 4-0 to 5-0 for finger tendons (Zones I-V)\n- Braided non-absorbable (Ethibond, Ticron) preferred\n- Tapered needle (avoid cutting needles)\n\n**Surgical Field:**\n- Good lighting, analgesia, tourniquet/hemostasis\n- Handle tendons delicately - avoid crushing with forceps\n- Minimize excessive punctures - adhesion risk\n- May need to extend wound for adequate exposure\n\n**Tendon Characteristics by Location:**\n- Proximal: Round, thick - holds core sutures well\n- Distal: Flat, thin - may only tolerate mattress/figure-of-8\n\n**Repair Timing:**\n- Optimal: Within 5 days (97.8% ROM vs 89.5% if >5 days) [12]\n- Delayed repair feasible up to 7 days with proper wound care\n- If delayed: irrigate, debride, loose skin closure, splint, hand surgery F/U\n\n**Select a technique:**',
    citation: [2, 9, 12],
    calculatorLinks: [
      { id: 'extensor-suture-guide', label: 'Suture Selection Guide' },
    ],
    options: [
      {
        label: 'Modified Kessler',
        description: 'Core suture for thicker tendons',
        next: 'ext-kessler',
      },
      {
        label: 'Modified Bunnell',
        description: 'Core suture alternative',
        next: 'ext-bunnell',
      },
      {
        label: 'Figure-of-8',
        description: 'Versatile for thin tendons',
        next: 'ext-figure8',
      },
      {
        label: 'Dermatotenodesis',
        description: 'For distal injuries (Zone I)',
        next: 'ext-dermatotenodesis',
      },
    ],
    summary: 'Use 4-0/5-0 braided non-absorbable suture — repair within 5 days for best outcomes (97.8% ROM)',
  },

  {
    id: 'ext-kessler',
    type: 'info',
    module: 4,
    title: 'Modified Kessler Stitch',
    body: '**Indications:** Zones IV, V, VI - thicker tendons that hold core sutures [2][9]\n\n**Technique:**\n\n1. Single suture enters tendon 1/3 diameter deep, approximately 1 cm from cut end\n2. Pass through lateral margin of tendon\n3. Wrap around tendon\n4. Re-enter perpendicular, 1-2 mm from cut end\n5. Thread through tendon to exit at cut surface\n6. Repeat on opposing half of tendon\n7. Tie knot within repair (buried)\n\n**Key Points:**\n- Creates a locking loop configuration\n- Knot buried between tendon ends\n- Maintains tendon apposition without gapping\n- Add epitendinous running suture for smooth gliding surface (optional in ED)\n\n**Suture:** 4-0 braided non-absorbable (Ethibond)\n\n**Post-Repair:**\n- Verify no gap at repair site\n- Test gentle passive ROM - repair should hold\n- Splint in appropriate position for zone',
    citation: [2, 9],
    images: [
      {
        src: 'images/extensor-tendon/kessler-stitch.png',
        alt: 'Modified Kessler stitch technique showing locking loop configuration',
        caption: 'Modified Kessler: Locking core suture, knot buried centrally',
      },
    ],
    next: 'ext-repair-overview',
    summary: 'Modified Kessler: locking loop core suture for zones IV-VI, knot buried between tendon ends',
    skippable: true,
  },

  {
    id: 'ext-bunnell',
    type: 'info',
    module: 4,
    title: 'Modified Bunnell Stitch',
    body: '**Indications:** Zones V, VI - alternative core suture technique [2][9]\n\n**Technique:**\n\n1. Single suture enters tendon 1/3 diameter deep\n2. Pass diagonally, exiting ulnar side\n3. Wrap around tendon\n4. Re-enter dorsally, pull through to exit radial side\n5. Diagonally cross initial stitch to exit ulnar side (creates X pattern)\n6. Repeat mirror image on opposite tendon end\n7. Tie ends together\n\n**Key Points:**\n- Creates crisscrossing pattern within tendon\n- Good purchase in flat tendons\n- Slightly more tendon trauma than Kessler\n- Provides strong repair\n\n**Zone VI Specific:**\n- Preferred technique for dorsal hand injuries\n- 4-0 suture adequate for larger tendons at this level\n\n**Post-Repair:**\n- Splint: Wrist 30 degrees extension, MCP neutral',
    citation: [2, 9],
    images: [
      {
        src: 'images/extensor-tendon/bunnell-stitch.png',
        alt: 'Modified Bunnell stitch showing crisscross pattern',
        caption: 'Modified Bunnell: Crisscross core suture with good tendon purchase',
      },
    ],
    next: 'ext-repair-overview',
    summary: 'Modified Bunnell: crisscross pattern, good purchase in flat tendons — zones V-VI',
    skippable: true,
  },

  {
    id: 'ext-figure8',
    type: 'info',
    module: 4,
    title: 'Figure-of-8 Suture',
    body: '**Indications:** All zones, especially thin distal tendons (I, II, III) [2][5][9]\n\n**Technique:**\n\n1. Insert needle through one tendon end, approximately 3-4 mm from cut edge\n2. Pass across to opposite tendon end\n3. Insert through opposite tendon, same distance from edge\n4. Cross back to first side, creating figure-of-8 pattern\n5. Tie knot on dorsal surface or buried\n6. May use 2-3 figure-of-8 sutures for broader tendons\n\n**Advantages:**\n- Simple technique familiar to ED physicians\n- Works well for flat, thin tendons\n- Less tendon trauma than core sutures\n- Acceptable strength for zones where tendons are thin\n\n**Zone I-II Application:**\n- 5-0 suture\n- 2 buried figure-of-8 sutures often sufficient\n\n**Zone VIII (Muscle Belly):**\n- Multiple figure-of-8 sutures required\n- Mattress configuration through muscle\n\n**Post-Repair:**\n- Extension splint appropriate to zone',
    citation: [2, 5, 9],
    images: [
      {
        src: 'images/extensor-tendon/figure-8-suture.png',
        alt: 'Figure-of-8 suture technique for extensor tendon',
        caption: 'Figure-of-8: Simple, versatile technique for thin tendons',
      },
    ],
    next: 'ext-repair-overview',
    summary: 'Figure-of-8: simplest technique, works for all zones especially thin distal tendons',
    skippable: true,
  },

  {
    id: 'ext-dermatotenodesis',
    type: 'info',
    module: 4,
    title: 'Dermatotenodesis',
    body: '**Indications:** Zone I (DIP) open mallet injuries [2]\n\n**Concept:** Incorporates skin closure with tendon repair - single suture anchors skin edges while passing through dorsal tendon.\n\n**Technique:**\n\n1. Place 4-0 or 5-0 non-absorbable suture\n2. Enter skin edge approximately 3 mm from wound\n3. Pass through dorsal aspect of tendon stump\n4. Continue through opposite tendon stump\n5. Exit through opposite skin edge\n6. Tie suture - approximates skin AND tendon\n\n**Advantages:**\n- Single suture repairs tendon and closes wound\n- Useful when tendon is too thin for traditional repair\n- Effective for terminal tendon at DIP level\n\n**Post-Procedure:**\n- Stack splint x 8 weeks (same as closed mallet)\n- DIP in slight hyperextension\n- Leave PIP free\n\n**Alternative:** Standard figure-of-8 tendon repair + separate skin closure',
    citation: [2],
    images: [
      {
        src: 'images/extensor-tendon/dermatotenodesis.png',
        alt: 'Dermatotenodesis technique showing skin and tendon incorporation',
        caption: 'Dermatotenodesis: Combined skin/tendon repair for distal injuries',
      },
    ],
    next: 'ext-repair-overview',
    summary: 'Dermatotenodesis: combined skin + tendon repair for Zone I open mallet injuries',
    skippable: true,
  },

  // =====================================================================
  // MODULE 5: SPLINTING PROTOCOLS
  // =====================================================================

  {
    id: 'ext-splint-overview',
    type: 'info',
    module: 5,
    title: 'Splinting Protocols by Zone',
    body: '**Splinting is Critical for Extensor Tendon Healing** [1][8][9]\n\n| Zone | Position | Duration |\n|------|----------|----------|\n| I (Mallet) | DIP extension/slight hyperextension, PIP FREE | 8 wks continuous + 2 wks night |\n| II | DIP extension | 6 weeks |\n| III | PIP full extension, DIP FREE | 6 wks + 6 wks night |\n| IV | Wrist 30-45 ext, MCP neutral | 6 weeks |\n| V | Wrist 45 ext, MCP 20 flex | 6 weeks |\n| VI | Wrist 30 ext, MCP neutral | 6 weeks |\n| VII-VIII | Wrist 30-45 ext | 4-5 weeks |\n\n**Key Principles:**\n\n1. **Continuous Extension** - Any flexion at the repair site disrupts healing\n2. **Free Adjacent Joints** - Prevents adhesion of uninvolved structures\n3. **Compliance Critical** - Patient education essential\n4. **Early Mobilization Protocols** - Available for zones 4-7 with hand therapy',
    citation: [1, 8, 9],
    calculatorLinks: [
      { id: 'extensor-splint-guide', label: 'Splint Protocol Guide' },
    ],
    next: 'ext-splint-types',
    summary: 'Continuous extension critical — any flexion at repair site disrupts healing and restarts the clock',
    safetyLevel: 'warning',
  },

  {
    id: 'ext-splint-types',
    type: 'info',
    module: 5,
    title: 'Splint Types and Application',
    body: '**STACK SPLINT (Zone I - Mallet)**\n- Aluminum finger splint\n- Extends from PIP joint to nail tip\n- DIP in 0-10 degrees hyperextension\n- Commercial stack splints available\n- CRITICAL: PIP must be FREE\n\n**FINGER SPLINT (Zone II-III)**\n- Dorsal or volar aluminum splint\n- Zone II: DIP extension\n- Zone III: PIP extension, DIP free\n- Custom molded to digit\n\n**VOLAR WRIST/HAND SPLINT (Zone IV-VIII)**\n- Plaster or fiberglass\n- Extends from forearm to MCPs or fingertips depending on zone\n- Position per zone requirements\n\n**Application Technique:**\n1. Apply over stockinette and padding\n2. Mold while drying for secure fit\n3. Ensure appropriate joint positioning\n4. Verify neurovascular status post-application\n5. Provide written instructions on splint care\n\n**Patient Instructions:**\n- Keep splint DRY\n- Do NOT remove splint (Zone I) or only as directed\n- Any flexion at repair site restarts healing clock\n- Follow-up within 7 days',
    citation: [1, 8, 9],
    images: [
      {
        src: 'images/extensor-tendon/stack-splint.png',
        alt: 'Stack splint application for mallet finger',
        caption: 'Stack splint: DIP hyperextension, PIP free. Continuous x 8 weeks.',
      },
    ],
    next: 'ext-splint-early-motion',
    summary: 'Stack splint for Zone I, finger splint for II-III, volar wrist/hand splint for IV-VIII',
    skippable: true,
  },

  {
    id: 'ext-splint-early-motion',
    type: 'info',
    module: 5,
    title: 'Early Motion Protocols',
    body: '**Static vs Dynamic vs Early Active Motion**\n\nResearch shows early controlled mobilization improves short-term outcomes compared to static immobilization. [9][12]\n\n**Static Immobilization:**\n- Traditional approach\n- 64% good/excellent results\n- Higher adhesion rates\n- Appropriate when hand therapy not available\n\n**Early Passive Motion (Dynamic Splinting):**\n- Outrigger splint holds fingers in extension\n- Allows active flexion against resistance\n- Requires dedicated hand therapy\n- Better outcomes but resource-intensive\n\n**Early Active Motion (EAM):**\n- Most cost-effective for Zones III-VI\n- Relative motion splint: Injured finger 15-20 degrees less motion than adjacent\n- 90% recovery in compliant patients\n- Requires patient compliance and therapist monitoring\n\n**ED Disposition:**\n- Static splinting appropriate for ED discharge\n- Early motion protocols initiated at hand therapy follow-up\n- All repairs need hand surgery F/U within 7 days',
    citation: [9, 12],
    next: 'ext-start',
    summary: 'Static splinting for ED discharge — early motion protocols initiated at hand therapy follow-up',
    skippable: true,
  },

  // =====================================================================
  // MODULE 6: DISPOSITION AND FOLLOW-UP
  // =====================================================================

  {
    id: 'ext-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition Decision',
    body: '**All extensor tendon injuries require specialist follow-up.** [4][5]\n\nEven uncomplicated repairs need:\n- Hand surgery follow-up in 7 days\n- Reassessment of repair\n- Skin suture removal (if applicable)\n- Hand therapy referral\n\n**Select disposition pathway:**',
    citation: [4, 5],
    options: [
      {
        label: 'ED Repair Candidates',
        description: 'When to repair and discharge',
        next: 'ext-ed-repair',
      },
      {
        label: 'Refer to Hand Surgery',
        description: 'When to defer repair',
        next: 'ext-refer',
      },
      {
        label: 'Complications',
        description: 'What to warn patients about',
        next: 'ext-complications',
      },
    ],
    summary: 'ALL extensor tendon injuries need hand surgery follow-up within 7 days',
  },

  {
    id: 'ext-ed-repair',
    type: 'info',
    module: 6,
    title: 'ED Repair Candidates',
    body: '**Zones Appropriate for ED Repair:** [4][5]\n\n| Zone | Condition |\n|------|----------|\n| I | Closed or open mallet (splint or dermatotenodesis) |\n| II | >50% laceration |\n| IV | Clean, sharp laceration |\n| V | Clean, sharp laceration (NOT fight bite) |\n| VI | Clean, any laceration |\n\n**Prerequisites for ED Repair:**\n- Adequate lighting, analgesia, tourniquet\n- Appropriate suture material available\n- Physician comfortable with technique\n- Ability to splint appropriately\n- Reliable follow-up confirmed\n\n**Relative Contraindications:**\n- Delayed presentation (>7 days) - may still attempt if wound clean\n- Significant contamination\n- Extensive tissue loss\n- Associated fracture requiring fixation\n- Tendon retraction beyond wound\n\n**Post-Repair Instructions:**\n- Tetanus update if needed\n- Keep splint dry and in place\n- Elevate hand above heart level\n- Return for worsening pain, swelling, drainage\n- Hand surgery follow-up in 7 days',
    citation: [4, 5],
    next: 'ext-disposition',
    summary: 'ED repair zones I, II, IV, V (not bite), VI — confirm adequate equipment and reliable follow-up',
    skippable: true,
  },

  {
    id: 'ext-refer',
    type: 'info',
    module: 6,
    title: 'Refer to Hand Surgery',
    body: '**Mandatory Hand Surgery Referral:** [4][5]\n\n| Indication | Reason |\n|------------|--------|\n| Zone III (PIP) | Complex anatomy, boutonniere risk |\n| Zone VII (Wrist) | Retinaculum management, adhesion risk |\n| Zone VIII (Forearm) | Multiple structures, muscle repair |\n| Fight bite (Zone V) | Contamination, infection risk |\n| Open fracture | Concurrent fixation needed |\n| Neurovascular injury | Multistructure repair |\n| Extensive skin loss | May need grafting |\n| Thumb injuries | Specialized repair |\n| Elite athletes | Optimal repair critical |\n| Immunocompromised | Higher infection risk |\n\n**ED Management for Referral Cases:**\n\n1. Irrigate thoroughly (500-1000 mL saline)\n2. Debride devitalized tissue\n3. Loosely approximate skin (do NOT close tightly)\n4. Volar resting splint in extension\n5. Antibiotics if contaminated:\n   - Amoxicillin-clavulanate 875/125 mg BID x 5-7 days\n6. Tetanus update\n7. Urgent hand surgery follow-up (24-72 hours)\n\n**Fight Bite - Leave Wound OPEN**',
    citation: [4, 5, 11],
    next: 'ext-disposition',
    summary: 'Refer zones III, VII, VIII, fight bites, open fractures — irrigate, splint, urgent hand surgery 24-72h',
  },

  {
    id: 'ext-complications',
    type: 'info',
    module: 6,
    title: 'Complications',
    body: '**Common Complications by Zone** [3][9][10]\n\n**Zone I-II:**\n- Swan neck deformity (DIP hyperextension, PIP flexion)\n- Mallet recurrence\n- Skin ulceration from splint\n\n**Zone III:**\n- Boutonniere deformity (PIP flexion, DIP hyperextension)\n- Most common long-term complication if missed/undertreated\n\n**Zone IV-VI:**\n- Adhesion formation (most common overall)\n- Extensor lag\n- Loss of flexion (impacts grip more than extension loss)\n- Tendon rupture (0.2-1.7%)\n\n**Zone VII-VIII:**\n- Adhesions to retinaculum\n- Tendon bowstringing\n- Reduced ROM\n\n**Reoperation Rates:**\n- Tenolysis for adhesions: 0-17%\n- Higher with static immobilization vs early motion protocols\n\n**Prognostic Factors:**\n- Repair within 5 days: 97.8% ROM vs 89.5% if >5 days [12]\n- Early mobilization improves outcomes\n- Patient compliance critical\n- Children heal better than adults despite prolonged immobilization\n\n**Miller Outcome Criteria:**\n- Excellent: No extension lag\n- Good: <10 degrees lag\n- Fair: 11-45 degrees lag\n- Poor: >45 degrees lag',
    citation: [3, 9, 10, 12],
    next: 'ext-disposition',
    summary: 'Adhesion formation most common — boutonniere deformity if Zone III missed, tendon rupture 0.2-1.7%',
    skippable: true,
  },

  {
    id: 'ext-summary',
    type: 'info',
    module: 6,
    title: 'Quick Reference Summary',
    body: '**ED Repair Decision Matrix:**\n\n| Zone | Location | ED Repair? | Technique | Splint Position |\n|------|----------|------------|-----------|------------------|\n| I | DIP | Yes | Stack splint/Dermatotenodesis | DIP ext, PIP free |\n| II | Mid phalanx | Yes | Figure-of-8 | DIP extension |\n| III | PIP | **NO** | Refer | PIP ext, DIP free |\n| IV | Prox phalanx | Yes | Kessler | Wrist 30, MCP 0 |\n| V | MCP | Conditional* | Kessler/Bunnell | Wrist 45, MCP 20 |\n| VI | Hand | Yes | Bunnell | Wrist 30, MCP 0 |\n| VII | Wrist | **NO** | Refer | Wrist ext |\n| VIII | Forearm | **NO** | Refer | Wrist ext |\n\n*Zone V: Only if clean, sharp laceration. Fight bites require irrigation, leave open, antibiotics, referral.\n\n**Suture Selection:**\n- Hand (Zone VI): 3-0 to 4-0 braided non-absorbable\n- Fingers (Zones I-V): 4-0 to 5-0 braided non-absorbable\n\n**Universal Follow-Up:**\n- ALL injuries need hand surgery F/U within 7 days\n- Hand therapy referral for rehabilitation\n\n**Timing Matters:**\n- Repair within 5 days optimal\n- Delayed repair up to 7 days acceptable with good wound care',
    citation: [1, 2, 3, 4, 5],
    next: 'ext-start',
    summary: 'Quick reference: zone-by-zone repair decisions, suture selection, splint positions, and follow-up',
    skippable: true,
  },

];

export const EXTENSOR_TENDON_NODE_COUNT = EXTENSOR_TENDON_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const EXTENSOR_TENDON_MODULE_LABELS = [
  'Overview',
  'Examination',
  'Zone Classification',
  'Repair Techniques',
  'Splinting',
  'Disposition',
];

// -------------------------------------------------------------------
// Evidence Citations (12 references)
// -------------------------------------------------------------------

export const EXTENSOR_TENDON_CITATIONS: Citation[] = [
  { num: 1, text: 'Roberts JR, Hedges JR, et al. Roberts and Hedges\' Clinical Procedures in Emergency Medicine. 7th ed. Elsevier; 2019. Chapter 48: Extensor and Flexor Tendon Injuries in the Hand, Wrist, and Foot.' },
  { num: 2, text: 'Peterson JJ, Bancroft LW. Extensor Tendon Repair by Emergency Physicians. ACEP Now. 2023. Available at: acepnow.com/article/extensor-tendon-repair-by-emergency-physicians/' },
  { num: 3, text: 'Newport ML. Upper extremity disorders in women. Clin Orthop Relat Res. 2000;372:85-94.' },
  { num: 4, text: 'Lin JC, Strauch RJ. Extensor Tendon Injuries of the Hand: Emergency Department Management. ALiEM. 2021. Available at: aliem.com/extensor-tendon-injuries-hand/' },
  { num: 5, text: 'Griffin M, Hindocha S, et al. Open Extensor Tendon Repair in the ED. Brown EM Blog. 2021. Available at: brownemblog.com/blogposts/2021/4/5/open-extensor-tendon-repair-in-the-ed' },
  { num: 6, text: 'Lee DH, Robbin ML, Galliott R, Graveman VA. Ultrasound evaluation of flexor tendon lacerations. J Hand Surg Am. 2000;25(2):236-41.' },
  { num: 7, text: 'Kleinert HE, Verdan C. Report of the Committee on Tendon Injuries. J Hand Surg Am. 1983;8(5 Pt 2):794-8.' },
  { num: 8, text: 'Handoll HH, Vaghela MV. Interventions for treating mallet finger injuries. Cochrane Database Syst Rev. 2004;(3):CD004574.' },
  { num: 9, text: 'Collocott SJ, Kelly E. Rehabilitation Regimens Following Surgical Repair of Extensor Tendon Injuries of the Hand - A Systematic Review of Controlled Trials. J Hand Ther. 2013;26(4):269-75.' },
  { num: 10, text: 'Matzon JL, Bozentka DJ. Extensor Tendon Injuries. J Hand Surg Am. 2010;35(5):854-61.' },
  { num: 11, text: 'Kennedy SA, Stoll LE, Lauder AS. Human and Other Mammalian Bite Wounds of the Hand: Evaluation and Management. J Am Acad Orthop Surg. 2015;23(1):47-57.' },
  { num: 12, text: 'Patillo D, Rayan GM. Open Extensor Tendon Injuries: An Epidemiologic Study. Hand Surg. 2012;17(1):37-42.' },
];
