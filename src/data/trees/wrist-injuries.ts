// MedKitt Decision Tree: Wrist Injuries
// Comprehensive guide to wrist fractures, dislocations, and ligament injuries

import type { DecisionNode } from '../../models/types.js'

interface Citation {
  num: number;
  text: string;
}

export const WRIST_INJURIES_NODES: DecisionNode[] = [
  {
    id: 'wrist-start',
    type: 'question',
    module: 0,
    title: 'Wrist Injury Assessment',
    body: 'Wrist injuries account for ~15% of ED orthopedic visits. Recognition of fracture patterns, associated dislocations, and neurovascular compromise is critical.\n\n**Mechanism guides injury pattern:**\n• **FOOSH (fall on outstretched hand)** → distal radius, scaphoid, perilunate dislocation\n• **Fall on dorsum of hand** → Smith fracture, triquetral fracture\n• **Direct blow to hypothenar** → hamate hook fracture\n• **High-energy hyperextension** → perilunate/lunate dislocation\n• **Forced rotation** → DRUJ dislocation, TFCC tear\n\n**Red flags requiring emergent management:**\n• Neurovascular compromise (absent pulses, motor deficit, median nerve symptoms)\n• Open fracture\n• Compartment syndrome\n• Obvious dislocation\n• Tense swelling with skin tenting [1][2]',
    options: [
      { label: 'Distal radius fracture', description: '', next: 'wrist-distal-radius' },
      { label: 'Carpal bone fracture', description: '', next: 'wrist-carpal-type' },
      { label: 'Perilunate/lunate dislocation', description: '', next: 'wrist-peri-lunate' },
      { label: 'DRUJ dislocation', description: '', next: 'wrist-druj' },
      { label: 'Ligament injury (TFCC, scapholunate)', description: '', next: 'wrist-ligament' },
      { label: 'Soft tissue injury / uncertain', description: '', next: 'wrist-imaging\n\n**What type of wrist injury?**' },
    ],
    citation: [1, 2],
  },

  // ===================================================================
  // MODULE 1: DISTAL RADIUS FRACTURES
  // ===================================================================

  {
    id: 'wrist-distal-radius',
    type: 'info',
    module: 1,
    title: 'Distal Radius Fracture Types',
    body: '**Three main patterns:**\n\n**1. Colles Fracture (Most Common)**\n• Dorsal angulation + displacement\n• "Dinner fork" deformity\n• FOOSH with wrist dorsiflexion\n• Often with ulnar styloid fracture\n\n**2. Smith Fracture (Reverse Colles)**\n• Volar displacement/angulation\n• "Garden spade" deformity\n• Fall on dorsum of hand\n• **More unstable** — often requires surgery\n\n**3. Barton Fracture**\n• Intra-articular rim fracture (dorsal or volar)\n• **Carpal bones dislocate with rim fragment**\n• Inherently unstable\n• High likelihood of operative fixation\n\n**🚨 ALWAYS assess for:**\n• Neurovascular status (median nerve most at risk)\n• Ulnar styloid fracture (base fractures can disrupt DRUJ)\n• DRUJ stability\n• Acute carpal tunnel syndrome (up to 20% incidence) [1][3]',
    citation: [1, 3],
    next: 'wrist-dr-which-type',
  },

  {
    id: 'wrist-dr-which-type',
    type: 'question',
    module: 1,
    title: 'Distal Radius Fracture Classification',
    body: 'Based on radiographs, what type of distal radius fracture?',
    options: [
      { label: 'Colles (dorsal angulation)', description: '', next: 'wrist-colles' },
      { label: 'Smith (volar angulation)', description: '', next: 'wrist-smith' },
      { label: 'Barton (rim fracture + carpal dislocation)', description: '', next: 'wrist-barton\n\n**Fracture pattern?**' },
    ],
    citation: [1],
  },

  {
    id: 'wrist-colles',
    type: 'result',
    module: 1,
    title: 'Colles Fracture Management',
    body: '**Classic Charnley Reduction Technique:**\n\n**Pre-Reduction:**\n• Procedural sedation\n• Consider hematoma block (10-15 mL lidocaine into fracture site)\n• Finger traps × 10 minutes (optional)\n\n**Reduction Steps:**\n1. Apply continuous longitudinal traction\n2. **Disimpact** fracture: exaggerate dorsal angulation (increase deformity)\n3. **Robert-Jones maneuver:** While maintaining traction, force distal fragment volarly (push volar with thumbs on dorsal fragment)\n4. Return wrist to neutral to slight extension (10-20°)\n5. Maintain traction while applying splint\n\n**Post-Reduction:**\n• Sugar tong splint (limits forearm rotation)\n• Post-reduction films (PA, lateral, oblique)\n• Reassess neurovascular status\n\n**Acceptable Reduction:**\n• Radial shortening <3mm\n• Dorsal tilt <10° (or <5° for intra-articular)\n• Intra-articular step-off <2mm\n\n**📞 Urgent ortho if:**\n• Unable to achieve acceptable reduction\n• Intra-articular involvement\n• Significant comminution\n• Loss of reduction after splinting [1][3][4]',
    images: [
      { src: 'images/wrist-injuries/colles-deformity.png', alt: 'Colles fracture dinner fork deformity', caption: 'Classic "dinner fork" deformity: dorsal angulation and displacement' },
      { src: 'images/wrist-injuries/colles-reduction.png', alt: 'Charnley reduction technique', caption: 'Charnley technique: longitudinal traction + volar force on dorsal fragment' },
    ],
    recommendation: 'Reduce with Charnley technique. Sugar tong splint. Ortho follow-up 3-5 days if stable, urgent if intra-articular or unable to maintain reduction.',
    citation: [1, 3, 4],
    next: 'wrist-splinting',
  },

  {
    id: 'wrist-smith',
    type: 'result',
    module: 1,
    title: 'Smith Fracture Management',
    body: '**Smith Fracture = Reverse Colles**\n\n**Key Point:** More difficult to maintain closed reduction than Colles. High rate of operative intervention.\n\n**Reduction Technique:**\n1. Procedural sedation\n2. Apply longitudinal traction\n3. Force distal fragment dorsally (opposite of Colles)\n4. Return to neutral position\n\n**Immobilization:**\n• Volar splint if attempting closed management\n• BUT: inherently unstable, often loses reduction\n\n**📞 URGENT Orthopedic Referral:**\n• Most Smith fractures require surgical fixation\n• Low threshold for urgent consultation (within 24-48h)\n\n**Pitfall:** Attempting prolonged conservative management in the ED → refer early for definitive fixation [1][5]',
    recommendation: 'Urgent orthopedic consultation (24-48h). If attempting ED reduction, use volar splint, but expect surgical referral. Smith fractures are inherently unstable.',
    citation: [1, 5],
    next: 'wrist-splinting',
  },

  {
    id: 'wrist-barton',
    type: 'result',
    module: 1,
    title: 'Barton Fracture Management',
    body: '**Barton Fracture = Intra-Articular Rim + Carpal Dislocation**\n\n**Definition:**\n• Fracture of dorsal or volar articular rim of distal radius\n• **Carpal bones sublux/dislocate WITH the rim fragment**\n• Dorsal rim more common (forced dorsiflexion + pronation)\n\n**Why It Matters:**\n• Inherently unstable\n• Intra-articular involvement\n• High likelihood of operative fixation\n• Cannot be adequately treated with closed reduction\n\n**ED Management:**\n1. Neurovascular assessment\n2. Splint for comfort (sugar tong)\n3. **URGENT orthopedic consultation**\n\n**📞 Call Orthopedics NOW:**\n• All Barton fractures require urgent surgical evaluation\n• Do not attempt closed reduction in ED\n• High risk of post-traumatic arthritis if not anatomically reduced\n\n**Pitfall:** Mistaking for simple distal radius fracture → missing intra-articular involvement and carpal subluxation [1][6]',
    recommendation: 'Urgent orthopedic consultation. Sugar tong splint. Do NOT attempt closed reduction in ED. Barton fractures require surgical fixation.',
    citation: [1, 6],
    next: 'wrist-splinting',
  },

  // ===================================================================
  // MODULE 2: CARPAL BONE FRACTURES
  // ===================================================================

  {
    id: 'wrist-carpal-type',
    type: 'question',
    module: 2,
    title: 'Carpal Bone Fracture Identification',
    body: '**Carpal bone fracture frequency:**\n1. **Scaphoid** — 60-70% (most common)\n2. **Triquetrum** — 15% (second most common)\n3. **Lunate** — 0.5-4%\n4. **Hamate** — 2-4%\n5. **Others** — trapezium, trapezoid, capitate, pisiform (rare)\n\n**Clinical exam guides diagnosis:**\n• Snuffbox tenderness → scaphoid\n• Dorsal ulnar tenderness → triquetrum\n• Central dorsal wrist pain → lunate\n• Hypothenar pain → hamate\n\n**⚠️ High-risk fractures for AVN:**\n• Scaphoid (proximal pole)\n• Lunate (Kienböck disease)\n\nBoth have retrograde blood supply → immobilize aggressively [7]',
    options: [
      { label: 'Scaphoid (snuffbox tenderness)', description: '', next: 'wrist-scaphoid' },
      { label: 'Triquetrum (dorsal ulnar pain)', description: '', next: 'wrist-triquetrum' },
      { label: 'Lunate (central wrist pain)', description: '', next: 'wrist-lunate' },
      { label: 'Hamate (hypothenar pain)', description: '', next: 'wrist-hamate\n\n**Which carpal bone is fractured (or suspected)?**' },
    ],
    citation: [7],
  },

  {
    id: 'wrist-scaphoid',
    type: 'result',
    module: 2,
    title: 'Scaphoid Fracture Management',
    body: '**Most commonly fractured carpal bone (60-70%)**\n\n**Clinical Diagnosis (even if X-rays negative):**\n• Snuffbox tenderness (dorsal)\n• Scaphoid tubercle tenderness (volar)\n• Pain with axial thumb loading\n• Decreased grip strength\n\n**Imaging:**\n• Initial: PA, lateral, oblique, **scaphoid view** (PA with ulnar deviation)\n• **Plain X-rays only 70% sensitive** — negative films do NOT exclude fracture\n• If clinical suspicion + negative X-rays → **immobilize and arrange MRI/CT in 3-5 days**\n• MRI preferred (detects bone marrow edema)\n• CT: alternative for immediate triage\n\n**Immobilization:**\n• **Thumb spica splint** (includes thumb IP joint)\n• Position: wrist extended 20-30°, thumb in "soda can" grasp\n• Even for **clinically suspected** fractures with negative X-rays\n\n**Why Aggressive Treatment:**\n• **Retrograde blood supply** via dorsal ridge vessels\n• Proximal pole at highest AVN risk (poor blood supply)\n• Complications: AVN, nonunion, SNAC wrist (scapholunate advanced collapse)\n\n**📞 Orthopedic Referral:**\n• **Urgent (24-48h):** Displaced fractures, proximal pole fractures\n• **Routine (3-7 days):** Non-displaced waist or distal pole fractures\n\n**Follow-Up Imaging:**\n• If initial X-rays negative but clinical suspicion: MRI at 3-5 days or repeat X-rays at 10-14 days [7][8][9][10]',
    images: [
      { src: 'images/wrist-injuries/scaphoid-anatomy.png', alt: 'Scaphoid anatomy and blood supply', caption: 'Scaphoid retrograde blood supply: proximal pole at highest AVN risk' },
      { src: 'images/wrist-injuries/scaphoid-snuffbox.png', alt: 'Anatomic snuffbox examination', caption: 'Snuffbox tenderness: key clinical sign of scaphoid fracture' },
      { src: 'images/wrist-injuries/scaphoid-xray.png', alt: 'Scaphoid fracture on X-ray', caption: 'Scaphoid view (PA with ulnar deviation) showing waist fracture' },
    ],
    recommendation: 'Thumb spica splint for all clinically suspected scaphoid fractures, even if X-rays negative. Arrange MRI/CT in 3-5 days if initial films negative. Urgent ortho for proximal pole or displaced fractures.',
    citation: [7, 8, 9, 10],
    next: 'wrist-splinting',
  },

  {
    id: 'wrist-triquetrum',
    type: 'result',
    module: 2,
    title: 'Triquetral Fracture Management',
    body: '**Second most common carpal fracture (15%)**\n\n**Two Types:**\n1. **Dorsal chip fracture** (most common) — FOOSH mechanism, visible on lateral view\n2. **Body fracture** — less common, requires CT for diagnosis\n\n**Imaging:**\n• Standard wrist series\n• **18.9% require CT for accurate diagnosis**\n• Dorsal chip: look on lateral radiograph\n\n**Clinical Presentation:**\n• Tenderness over dorsal triquetrum (between pisiform and ulnar head)\n• Pain with ulnar deviation\n\n**Management:**\n• **Dorsal chip (FOOSH mechanism):**\n  - Removable splint × 3-4 weeks\n  - Early mobilization acceptable\n  - Very low complication rate\n\n• **Body fracture:**\n  - Plaster/fiberglass splint initially\n  - Short arm cast × 6 weeks\n  - Early orthopedic follow-up\n\n**Prognosis:** Excellent. Very low rate of complications and nonunion compared to scaphoid.\n\n**📞 Orthopedic Referral:**\n• **Urgent:** Large displaced body fractures\n• **Routine (3-7 days):** Most triquetral fractures [7][11]',
    recommendation: 'Dorsal chip: removable splint × 3-4 weeks. Body fracture: short arm cast × 6 weeks. Routine ortho follow-up. Excellent prognosis.',
    citation: [7, 11],
    next: 'wrist-splinting',
  },

  {
    id: 'wrist-lunate',
    type: 'result',
    module: 2,
    title: 'Lunate Fracture Management',
    body: '**Rare (0.5-4% of carpal fractures) but HIGH RISK**\n\n**Mechanism:** High-energy trauma, axial loading\n\n**Clinical Presentation:**\n• Central wrist pain\n• Tenderness over lunate (dorsal and volar)\n• Reduced grip strength\n\n**Imaging:**\n• Standard wrist radiographs\n• **MRI for suspected occult fracture** (preferred)\n• Look for:\n  - Lunate fracture line\n  - Increased density (suggests AVN/Kienböck disease)\n  - Collapse (late finding)\n\n**⚠️ HIGH RISK FOR AVN (Kienböck Disease):**\n• Tenuous retrograde blood supply (like scaphoid)\n• Can progress to collapse, fragmentation, carpal instability\n• Early immobilization critical\n\n**Immobilization:**\n• **Long arm thumb spica × 10-12 weeks**\n• First half: cast\n• Second half: custom orthosis\n\n**📞 URGENT Orthopedic Referral (24-48h):**\n• All lunate body fractures (high AVN risk)\n• Close monitoring for signs of AVN on follow-up imaging\n\n**Pitfall:** Missing lunate fracture on initial X-rays → late AVN and collapse [7][12]',
    recommendation: 'Long arm thumb spica × 10-12 weeks. URGENT orthopedic referral (24-48h) for all lunate fractures due to high AVN risk. Consider MRI if clinical suspicion despite negative X-rays.',
    citation: [7, 12],
    next: 'wrist-splinting',
  },

  {
    id: 'wrist-hamate',
    type: 'result',
    module: 2,
    title: 'Hamate Fracture Management',
    body: '**Hook of Hamate Fracture (Most Common Hamate Injury)**\n\n**Mechanism:**\n• Direct blow to hypothenar eminence\n• Common in racquet sports, baseball, golf ("grip injuries")\n\n**Clinical Presentation:**\n• Hypothenar pain and tenderness\n• Pain with resisted finger flexion (FDP to ring/small fingers)\n• May have ulnar nerve symptoms (paresthesias in ring/small fingers)\n\n**Imaging Challenge:**\n• **Standard wrist views often MISS hook fractures**\n• **Carpal tunnel view (skyline view)** — hand supinated, wrist hyperextended\n• **CT scan for confirmation** (gold standard)\n\n**Complications if Missed:**\n• Non-union → chronic pain, weak grip\n• Flexor tendon rupture (FDP)\n• Ulnar nerve injury\n\n**Management:**\n• **Non-displaced fractures:** Short arm cast × 6 weeks\n• **Displaced or symptomatic non-unions:** Often require surgical excision\n\n**Body Fractures:**\n• Less common\n• Higher energy mechanism\n• May be associated with CMC joint disruption\n• Requires orthopedic consultation\n\n**📞 Orthopedic Referral:**\n• **Routine (3-7 days):** Suspected or confirmed hook fractures\n• Surgical excision often preferred over prolonged immobilization\n\n**Clinical Pearl:** High index of suspicion in athletes with hypothenar pain + grip weakness. Standard X-rays inadequate — get carpal tunnel view or CT [7][13]',
    recommendation: 'High clinical suspicion in athletes with hypothenar pain. Carpal tunnel view or CT for diagnosis (standard X-rays miss it). Short arm cast × 6 weeks for non-displaced. Routine ortho referral; surgical excision often needed.',
    citation: [7, 13],
    next: 'wrist-splinting',
  },

  // ===================================================================
  // MODULE 3: CARPAL DISLOCATIONS
  // ===================================================================

  {
    id: 'wrist-peri-lunate',
    type: 'info',
    module: 3,
    title: 'Perilunate vs Lunate Dislocation',
    body: '**Two stages of the same injury spectrum:**\n\n**1. Perilunate Dislocation:**\n• Carpus (capitate + distal row) dislocates **dorsally**\n• Lunate maintains normal relationship with radius\n• **Lateral X-ray:** Lunate aligned with radius, capitate displaced dorsally\n\n**2. Lunate Dislocation (More Severe):**\n• Lunate dislocates **volarly** (rotates into carpal tunnel)\n• "Spilled teacup" sign on lateral view\n• **Lateral X-ray:** Lunate tilted volar, loss of relationship with radius\n\n**Mechanism:**\n• High-energy hyperextension injury (FOOSH with ulnar deviation)\n• MVA, fall from height\n• Progressive perilunate instability (Mayfield classification)\n\n**🚨 ACUTE CARPAL TUNNEL SYNDROME:**\n• **15-50% of cases**\n• Median nerve compressed by displaced lunate or hematoma\n• Paresthesias in thumb, index, middle, radial half of ring finger\n• **Resolve in 92% after reduction**\n\n**Associated Injuries:**\n• Trans-scaphoid perilunate fracture-dislocation (scaphoid fracture + dislocation)\n• Other carpal fractures\n\n**⚠️ REDUCE EMERGENTLY** to decompress median nerve and restore vascular supply [14][15][16]',
    images: [
      { src: 'images/wrist-injuries/perilunate-lateral.png', alt: 'Perilunate dislocation lateral X-ray', caption: 'Perilunate dislocation: lunate aligned with radius, capitate displaced dorsally' },
      { src: 'images/wrist-injuries/lunate-dislocation.png', alt: 'Lunate dislocation lateral X-ray', caption: 'Lunate dislocation: "spilled teacup" sign — lunate tilted volarly into carpal tunnel' },
    ],
    citation: [14, 15, 16],
    next: 'wrist-peri-reduce',
  },

  {
    id: 'wrist-peri-reduce',
    type: 'result',
    module: 3,
    title: 'Perilunate/Lunate Reduction Technique',
    body: '**Tavernier Method for ED Reduction:**\n\n**Pre-Reduction:**\n• Procedural sedation (required)\n• Neurovascular documentation (especially median nerve)\n• Assistant for countertraction\n\n**Reduction Steps:**\n1. **Finger trap traction × 10 minutes** with elbow flexed 90°\n2. After distraction, **release traction**\n3. **Extend wrist** while stabilizing lunate on volar aspect with thumb\n4. **Gradually flex wrist** to allow capitate to reduce into lunate concavity\n5. **Push lunate dorsally** while flexing wrist\n6. **Return to neutral position**\n7. Maintain reduction while applying splint\n\n**Alternative Technique (if finger traps unavailable):**\n• Assistant applies longitudinal traction\n• Operator extends wrist maximally\n• Apply pressure to capitate dorsally while pushing lunate volarly\n• Gradually flex wrist into neutral\n\n**Success Rate:** >80% ED closed reduction success\n\n**Post-Reduction:**\n• **Dorsal short arm thumb spica** in neutral position\n• Post-reduction films (PA and lateral)\n• Reassess median nerve function\n• **Median nerve symptoms resolve in 92% after reduction**\n\n**📞 EMERGENT Orthopedic Consultation:**\n• Call after successful reduction\n• Most require surgical repair (ligament reconstruction, K-wire fixation)\n• If irreducible in ED → urgent OR\n• Acute carpal tunnel → decompress within 40 hours\n\n**Pitfall:** Delaying reduction → increased risk of permanent median nerve injury and AVN [14][15][17]',
    recommendation: 'REDUCE EMERGENTLY using Tavernier method (finger traps × 10min, extend then flex wrist, push lunate dorsally). Thumb spica after reduction. Call ortho immediately — most require surgery.',
    citation: [14, 15, 17],
    next: 'wrist-splinting',
  },

  // ===================================================================
  // MODULE 4: DRUJ & LIGAMENT INJURIES
  // ===================================================================

  {
    id: 'wrist-druj',
    type: 'result',
    module: 4,
    title: 'DRUJ (Distal Radioulnar Joint) Dislocation',
    body: '**DRUJ Dislocation — Easily Missed!**\n\n**Types:**\n• **Dorsal** (more common) — forced pronation + hyperextension\n• **Volar** — forced supination injury\n\n**Clinical Presentation:**\n• Ulnar-sided wrist pain\n• **Dorsal dislocation:** Prominent ulnar head dorsally\n• **Volar dislocation:** Absent ulnar head prominence\n• Limited/painful forearm rotation (pronation/supination)\n• Often subtle → frequently missed\n\n**Imaging:**\n• **True lateral wrist radiograph** essential\n• Compare DRUJ relationship bilaterally\n• **CT for subtle cases**\n\n**🚨 ASSOCIATED WITH:**\n• Distal radius fractures (Galeazzi fracture-dislocation)\n• Ulnar styloid base fractures (>2mm displacement disrupts TFCC)\n• **Always assess DRUJ with ANY distal radius or ulnar fracture**\n\n**Reduction Technique:**\n\n**Dorsal Dislocation:**\n1. Elbow at 90° flexion\n2. Apply longitudinal traction\n3. Direct dorsal pressure on ulnar head\n4. **Fully supinate forearm** (key maneuver)\n5. Feel/hear clunk as ulnar head reduces\n\n**Volar Dislocation:**\n1. Longitudinal traction\n2. **Fully pronate forearm**\n3. Direct pressure on ulnar head volarly\n\n**Post-Reduction:**\n• **Above-elbow cast** in position of stability\n• Dorsal dislocation: **supination**\n• Volar dislocation: **pronation**\n• Duration: 4-6 weeks\n\n**Stability Assessment:**\n• Test stability after reduction in neutral, pronation, supination\n• If unstable → may require K-wire fixation\n\n**📞 URGENT Orthopedic Referral:**\n• All DRUJ dislocations, especially if unstable or irreducible\n• Associated distal radius fractures\n\n**Pitfall:** Missing DRUJ dislocation with distal radius fracture (Galeazzi) → chronic pain, instability, limited rotation [18][19][20]',
    images: [
      { src: 'images/wrist-injuries/druj-normal-lateral.png', alt: 'Normal DRUJ on lateral X-ray', caption: 'Normal DRUJ: ulnar head aligned with sigmoid notch of radius' },
      { src: 'images/wrist-injuries/druj-dorsal-dislocation.png', alt: 'Dorsal DRUJ dislocation', caption: 'Dorsal DRUJ dislocation: ulnar head displaced dorsally on lateral view' },
    ],
    recommendation: 'Reduce with longitudinal traction + forced supination (dorsal) or pronation (volar). Above-elbow cast in position of stability × 4-6 weeks. URGENT ortho referral, especially if unstable. Always check DRUJ with distal radius fractures.',
    citation: [18, 19, 20],
    next: 'wrist-splinting',
  },

  {
    id: 'wrist-ligament',
    type: 'question',
    module: 4,
    title: 'Wrist Ligament Injury Type',
    body: '**Two major ligamentous injuries:**\n\n**1. Scapholunate Dissociation**\n• Disruption of scapholunate interosseous ligament\n• Radial-sided wrist pain\n• "Terry Thomas sign" (gap >5mm on PA X-ray)\n• Progressive SLAC wrist if untreated\n\n**2. TFCC (Triangular Fibrocartilage Complex) Tear**\n• Ulnar-sided wrist pain\n• Clicking with forearm rotation\n• Associated with DRUJ instability\n• Often requires MRI or arthroscopy for diagnosis\n\nBoth can be occult on plain films. Clinical suspicion guides management [21][22]',
    options: [
      { label: 'Scapholunate dissociation (radial pain, widened gap)', description: '', next: 'wrist-sl-dissoc' },
      { label: 'TFCC tear (ulnar pain, clicking, DRUJ instability)', description: '', next: 'wrist-tfcc\n\n**Which ligament injury is suspected?**' },
    ],
    citation: [21, 22],
  },

  {
    id: 'wrist-sl-dissoc',
    type: 'result',
    module: 4,
    title: 'Scapholunate Dissociation Management',
    body: '**Scapholunate Dissociation = Disruption of SL Interosseous Ligament**\n\n**Mechanism:** Forceful wrist hyperextension in ulnar deviation (FOOSH)\n\n**Clinical Presentation:**\n• Radial-sided wrist pain\n• Tenderness over scapholunate interval (1cm distal to Lister tubercle)\n• **Watson test (scaphoid shift test):** Clunk/pain with scaphoid displacement\n• Weakened grip strength\n\n**Imaging:**\n• **PA radiograph:**\n  - **Scapholunate gap ≥5mm** ("Terry Thomas sign" or "David Letterman sign")\n  - Normal gap: ≤2mm\n  - **Clenched fist PA view** accentuates gap\n\n• **Lateral radiograph:**\n  - Scapholunate angle >70° (normal: 30-60°)\n  - **DISI pattern** (dorsal intercalated segment instability) — lunate tilts dorsally\n\n• **MRI:** Useful preliminary diagnostic tool (shows ligament disruption)\n• **Wrist arthroscopy:** Gold standard\n\n**Complications if Untreated:**\n• Progressive carpal instability\n• **SLAC wrist** (scapholunate advanced collapse) — severe degenerative arthritis\n\n**Emergency Management:**\n1. Thumb spica splint\n2. Analgesia\n3. **URGENT hand specialist referral (24-48h)**\n\n**Surgical Timing:**\n• **Acute injuries (<6 weeks):** Primary ligament repair possible\n• **Chronic injuries:** More complex reconstruction required\n• Best outcomes with early intervention\n\n**📞 URGENT Orthopedic Referral (24-48h):**\n• All suspected or confirmed scapholunate dissociations\n• Time-sensitive — early surgery improves outcomes\n\n**Pitfall:** Dismissing as "wrist sprain" → progressive arthritis and disability [21][23][24]',
    images: [
      { src: 'images/wrist-injuries/scapholunate-gap.png', alt: 'Terry Thomas sign on PA X-ray', caption: 'Scapholunate dissociation: gap ≥5mm between scaphoid and lunate (Terry Thomas sign)' },
      { src: 'images/wrist-injuries/scapholunate-lateral.png', alt: 'DISI pattern on lateral X-ray', caption: 'DISI pattern: scapholunate angle >70°, lunate tilted dorsally' },
    ],
    recommendation: 'Thumb spica splint. URGENT hand specialist referral (24-48h). Surgical repair within 6 weeks for best outcomes. Do not dismiss as simple sprain — risk of SLAC wrist.',
    citation: [21, 23, 24],
    next: 'wrist-splinting',
  },

  {
    id: 'wrist-tfcc',
    type: 'result',
    module: 4,
    title: 'TFCC Tear Management',
    body: '**Triangular Fibrocartilage Complex (TFCC) Tear**\n\n**Anatomy:** TFCC = fibrocartilaginous disc + ulnar collateral ligament + ECU subsheath + radioulnar ligaments\n\n**Mechanism:**\n• **Acute:** FOOSH, axial loading with pronation/ulnar deviation\n• **Degenerative:** Chronic overload, positive ulnar variance\n\n**Classification:**\n• **Class 1:** Traumatic (1A-D)\n• **Class 2:** Degenerative (2A-E)\n\n**Clinical Presentation:**\n• Ulnar-sided wrist pain\n• Clicking/popping with forearm rotation\n• Point tenderness between pisiform and ulnar head\n• **TFCC compression test:** Pain with ulnar deviation + axial loading\n• **Ulnar grind test:** Pain with passive pronation/supination\n\n**Associated Injuries:**\n• DRUJ instability (common)\n• Lunotriquetral ligament tear\n• Ulnar styloid fractures (base fractures disrupt TFCC attachment)\n\n**Imaging:**\n• Plain X-rays: Often normal (diagnoses exclusion, ulnar variance)\n• **MRI:** Useful preliminary diagnostic tool (shows TFCC tear)\n• **Wrist arthroscopy:** Gold standard for diagnosis and treatment\n\n**Emergency Management:**\n1. Splint immobilization (ulnar gutter or sugar tong)\n2. Rest, ice, NSAIDs\n3. Activity modification\n\n**Conservative Treatment Trial:**\n• Splinting × 3-6 weeks\n• Physical therapy\n• NSAIDs\n• Many improve without surgery\n\n**📞 Orthopedic Referral:**\n• **URGENT (24-48h):** DRUJ instability present\n• **Routine (1-2 weeks):** Failed conservative treatment, mechanical symptoms (clicking, locking)\n• **Consider surgical referral:** Persistent symptoms after 3-6 weeks conservative treatment\n\n**Surgical Options:**\n• Arthroscopic debridement (peripheral tears)\n• TFCC repair (central tears in young patients)\n• Ulnar shortening (if positive ulnar variance)\n\n**Prognosis:** Variable. Peripheral tears heal better than central tears. Many respond to conservative treatment [22][25][26]',
    recommendation: 'Ulnar gutter splint. Trial of conservative treatment × 3-6 weeks (splint, NSAIDs, rest). URGENT ortho if DRUJ unstable. Routine ortho if failed conservative treatment or mechanical symptoms. Many improve without surgery.',
    citation: [22, 25, 26],
    next: 'wrist-splinting',
  },

  // ===================================================================
  // MODULE 5: IMAGING & SPLINTING
  // ===================================================================

  {
    id: 'wrist-imaging',
    type: 'info',
    module: 5,
    title: 'Wrist Imaging Approach',
    body: '**Standard Wrist Series:**\n• PA (posteroanterior)\n• Lateral (true lateral, not oblique)\n• Oblique\n\n**Special Views:**\n• **Scaphoid view:** PA with ulnar deviation + slight supination (for suspected scaphoid fracture)\n• **Carpal tunnel view:** Wrist hyperextended, hand supinated (for hook of hamate)\n• **Clenched fist PA:** Accentuates scapholunate dissociation\n\n**Systematic Review:**\n\n**PA View:**\n1. **Carpal arcs:** Three smooth curves (proximal carpal row, distal carpal row, distal carpal articular surfaces)\n   - Disruption suggests dislocation\n2. **Scapholunate gap:** Normal ≤2mm; ≥5mm = dissociation\n3. **Carpal alignment:** Lunate should be quadrilateral (triangular = dislocation)\n4. **Fracture lines**\n\n**Lateral View:**\n1. **Lunate alignment:** Lunate should articulate with radius ("cup of radius")\n   - Volar tilt = lunate dislocation ("spilled teacup")\n2. **Capitate-lunate-radius alignment:** Should form straight line\n   - Capitate displaced dorsally = perilunate dislocation\n3. **Scapholunate angle:** Normal 30-60°; >70° = dissociation/DISI\n4. **DRUJ relationship:** Ulnar head should align with sigmoid notch of radius\n\n**⚠️ ALWAYS ASSESS:**\n• **DRUJ on lateral view** (easily missed with distal radius fractures)\n• **Radial head-capitellum alignment** (if ulnar shaft fracture present → rule out Monteggia)\n\n**Advanced Imaging Indications:**\n• **MRI:** Suspected occult scaphoid or lunate fracture (3-5 days if initial X-rays negative), ligament tears, AVN\n• **CT:** Immediate triage for scaphoid fractures, complex carpal fractures, surgical planning, hook of hamate\n• **Wrist arthroscopy:** Gold standard for ligament injuries [2][27]',
    images: [
      { src: 'images/wrist-injuries/wrist-pa-systematic.png', alt: 'PA wrist systematic review', caption: 'PA view: three carpal arcs, scapholunate gap, carpal alignment' },
      { src: 'images/wrist-injuries/wrist-lateral-systematic.png', alt: 'Lateral wrist systematic review', caption: 'Lateral view: lunate in "cup of radius", capitate-lunate-radius line, DRUJ' },
    ],
    citation: [2, 27],
    next: 'wrist-splinting',
  },

  {
    id: 'wrist-splinting',
    type: 'info',
    module: 5,
    title: 'Wrist Splinting Techniques',
    body: '**Four Main Splint Types:**\n\n**1. Volar Splint**\n• **Indications:** Carpal fractures (except scaphoid), soft tissue injuries, stable distal radius\n• **Position:** Wrist 20° extension\n• **Coverage:** Volar forearm from proximal forearm to just proximal to MCP joints\n• **Advantage:** Allows thumb motion\n\n**2. Sugar Tong Splint**\n• **Indications:** Acute distal radius fractures, distal ulna fractures\n• **Position:** Forearm neutral rotation, wrist neutral to 10-20° extension, elbow 90°\n• **Coverage:** U-shaped from dorsal MCPs, along dorsal forearm, around elbow, along volar forearm to volar MCPs\n• **Advantage:** Limits forearm rotation (pronation/supination)\n\n**3. Thumb Spica Splint**\n• **Indications:** **Scaphoid fractures** (confirmed or suspected), first metacarpal fractures, de Quervain tenosynovitis\n• **Position:** Forearm neutral, wrist extended 20-30°, thumb in "soda can" grasp position\n• **Coverage:** Radial forearm to just past thumb IP joint\n• **Critical:** Immobilize thumb IP joint (some protocols allow IP free for distal pole scaphoid)\n• **⚠️ Use for ALL suspected scaphoid fractures** (even if X-rays negative)\n\n**4. Ulnar Gutter Splint**\n• **Indications:** 4th/5th metacarpal fractures, ulnar-sided wrist injuries, ulnar styloid fractures\n• **Position:** Wrist neutral to slight extension, slight ulnar deviation\n• **Coverage:** Ulnar forearm to fingertips of 4th and 5th digits\n• **Position:** MCP 70-90° flexion, PIP/DIP slight flexion\n\n**Post-Splint Check:**\n• Capillary refill <2 seconds\n• Sensation intact (median, radial, ulnar distributions)\n• Finger movement (flexion/extension)\n• No excessive tightness or pressure points\n\n**Splinting Pearls:**\n• Apply over stockinette + padding (especially bony prominences)\n• Plaster: 8-10 layers; fiberglass: 3-4 layers\n• Splint should cover 1/2 to 2/3 circumference (not circumferential)\n• Edges smooth and rolled to prevent skin irritation [2][28][29][30]',
    images: [
      { src: 'images/wrist-injuries/volar-splint.png', alt: 'Volar wrist splint', caption: 'Volar splint: wrist 20° extension, volar forearm to proximal MCP' },
      { src: 'images/wrist-injuries/sugar-tong-splint.png', alt: 'Sugar tong splint', caption: 'Sugar tong: U-shaped, limits rotation, elbow 90°' },
      { src: 'images/wrist-injuries/thumb-spica-splint.png', alt: 'Thumb spica splint', caption: 'Thumb spica: "soda can" grasp, immobilizes thumb IP for scaphoid fractures' },
      { src: 'images/wrist-injuries/ulnar-gutter-splint.png', alt: 'Ulnar gutter splint', caption: 'Ulnar gutter: 4th/5th digits, MCP flexed 70-90°' },
    ],
    citation: [2, 28, 29, 30],
    next: 'wrist-complications',
  },

  // ===================================================================
  // MODULE 6: COMPLICATIONS & REFERRAL
  // ===================================================================

  {
    id: 'wrist-complications',
    type: 'info',
    module: 6,
    title: 'Wrist Injury Complications',
    body: '**1. Acute Carpal Tunnel Syndrome**\n• **Incidence:** Up to 20% of wrist fractures; 15-50% of perilunate dislocations\n• **Pathophysiology:** Hematoma, fracture displacement, soft tissue swelling compress median nerve\n• **Presentation:** Median nerve paresthesias (thumb, index, middle, radial half ring finger), thenar weakness (late)\n• **Management:** Urgent carpal tunnel decompression + fracture fixation\n• **Best outcomes:** Decompression within 40 hours of symptom onset\n\n**2. Avascular Necrosis (AVN)**\n• **High-risk fractures:**\n  - **Scaphoid** (especially proximal pole) — retrograde blood supply\n  - **Lunate** (Kienböck disease) — tenuous retrograde blood supply\n• **Prevention:** Early immobilization, appropriate splinting, close follow-up\n• **Late findings:** Increased density, collapse, fragmentation on X-rays\n\n**3. Missed Galeazzi & Monteggia Fracture-Dislocations**\n• **Galeazzi:** Distal radius fracture + DRUJ dislocation\n• **Monteggia:** Proximal ulna fracture + radial head dislocation\n• **Why missed:** Dislocation component overlooked\n• **Recognition tip:** ANY radius/ulna fracture → specifically assess DRUJ and radial head alignment\n• **Consequences:** Chronic pain, malunion, instability, restricted rotation, deformity\n\n**4. Compartment Syndrome**\n• Rare but devastating\n• High-energy trauma, crush injuries, vascular injury\n• **5 Ps:** Pain (out of proportion, with passive stretch), Pressure, Paresthesias, Pallor, Pulselessness (late)\n• **Measurement:** Compartment pressure >30 mmHg absolute or within 30 mmHg of diastolic BP\n• **Management:** Emergent fasciotomy\n\n**5. Complex Regional Pain Syndrome (CRPS)**\n• Chronic complication\n• Disproportionate pain, swelling, temperature changes, skin changes\n• Prevention: Early mobilization when appropriate, adequate analgesia [31][32][33][34]',
    citation: [31, 32, 33, 34],
    next: 'wrist-referral',
  },

  {
    id: 'wrist-referral',
    type: 'result',
    module: 6,
    title: 'Orthopedic Referral Guidelines',
    body: '**🚨 EMERGENT Referral (Immediate ED Consultation):**\n• Open fractures\n• Neurovascular compromise (absent pulses, motor deficit, acute carpal tunnel syndrome)\n• Compartment syndrome\n• Tense compartments, severe skin tenting\n• All perilunate/lunate dislocations (after ED reduction attempt)\n• Joint dislocation with neurovascular compromise\n• Irreducible dislocations\n\n**⚠️ URGENT Referral (24-48 Hours):**\n• Intra-articular fractures with displacement\n• Unstable fractures (Barton, Smith, most DRUJ dislocations)\n• Scapholunate dissociation\n• TFCC injury with DRUJ instability\n• Fractures that lose reduction after splinting\n• Scaphoid proximal pole fractures\n• All lunate fractures (AVN risk)\n• Post-reduction distal radius with:\n  - Radial shortening >3mm\n  - Dorsal tilt >10°\n  - Intra-articular step-off >2mm (non-geriatric)\n• Significant comminution\n\n**📅 ROUTINE Referral (3-7 Days):**\n• Stable, minimally displaced distal radius fractures\n• Non-displaced scaphoid waist/distal pole fractures\n• Triquetral fractures\n• Hamate fractures\n• Ulnar styloid tip fractures with stable DRUJ\n• Radiographic parameters outside acceptable range but stable\n• Most TFCC tears (after conservative trial)\n\n**Acceptable Radiographic Parameters for Distal Radius:**\n• Radial inclination: 15-25° (normal 22-23°)\n• Radial length: 9-12mm (normal 11-12mm)\n• Volar tilt: 0-15° (normal 11-12°)\n• Intra-articular step-off: <2mm\n• Radial shortening: <3mm\n• Dorsal angulation: <10°\n\n**Discharge Instructions for All Wrist Injuries:**\n• Keep splint clean and dry\n• Elevate hand above heart level × 48-72 hours\n• Ice 20 min q2-4h × 48 hours\n• Finger ROM exercises (unless contraindicated)\n• Return immediately if:\n  - Increasing pain despite elevation/meds\n  - Numbness/tingling\n  - Fingers cold, blue, or unable to move\n  - Splint too tight\n  - Fever, drainage, foul odor\n• Follow up with orthopedics as directed [1][2][35]',
    recommendation: 'Refer emergently for open fractures, neurovascular compromise, compartment syndrome, or irreducible dislocations. Urgent referral (24-48h) for unstable fractures, intra-articular displacement, scapholunate dissociation, proximal scaphoid/lunate fractures. Routine referral (3-7 days) for stable fractures within acceptable parameters.',
    citation: [1, 2, 35],
  },
]

// ===================================================================
// MODULE LABELS
// ===================================================================

export const WRIST_INJURIES_MODULE_LABELS: string[] = [
  'Recognition',
  'Distal Radius',
  'Carpal Fractures',
  'Dislocations',
  'Ligaments & DRUJ',
  'Imaging & Splinting',
  'Complications & Referral',
]

// ===================================================================
// CITATIONS
// ===================================================================

export const WRIST_INJURIES_CITATIONS: Citation[] = [
  { num: 1, text: 'Distal Radius Fractures. StatPearls. 2024. https://www.ncbi.nlm.nih.gov/books/NBK536916/' },
  { num: 2, text: 'Evaluation and Management of Wrist Injuries in the Urgent Care Setting. EB Medicine. June 2025. https://www.ebmedicine.net/topics/orthopedic-musculoskeletal/urgent-care-wrist-injuries' },
  { num: 3, text: 'Colles Fracture. StatPearls. 2024. https://www.ncbi.nlm.nih.gov/books/NBK553071/' },
  { num: 4, text: 'Closed reduction methods for treating distal radial fractures. PMC. 2021. https://pmc.ncbi.nlm.nih.gov/articles/PMC8728634/' },
  { num: 5, text: 'Smith Fracture. StatPearls. 2024. https://www.ncbi.nlm.nih.gov/books/NBK547714/' },
  { num: 6, text: 'Barton Fracture. StatPearls. 2024. https://www.ncbi.nlm.nih.gov/books/NBK499906/' },
  { num: 7, text: 'Carpal Bone Injuries - The Big 4. Emergency Medicine Cases. https://emergencymedicinecases.com/carpal-bone-injuries-big-4/' },
  { num: 8, text: 'Acute scaphoid fractures: guidelines for diagnosis and treatment. PMC. 2020. https://pmc.ncbi.nlm.nih.gov/articles/PMC7047900/' },
  { num: 9, text: 'CT for Triage of Suspected Scaphoid Fractures. PMC. 2008. https://pmc.ncbi.nlm.nih.gov/articles/PMC2529140/' },
  { num: 10, text: 'MRI for clinically suspected scaphoid fractures. PMC. 2022. https://pmc.ncbi.nlm.nih.gov/articles/PMC8244792/' },
  { num: 11, text: 'Triquetral fractures: a retrospective multi-centre study. AJOPS. 2025. https://ajops.com/article/33245-triquetral-fractures-a-retrospective-multi-centre-study-of-management-and-outcomes' },
  { num: 12, text: 'Carpal Fractures. OrthoPaedia. https://www.orthopaedia.com/carpal-fractures/' },
  { num: 13, text: 'Carpal Fractures in Athletes. Orthobullets. https://upload.orthobullets.com/journalclub/free_pdf/19643337_19643337.pdf' },
  { num: 14, text: 'Perilunate Dislocation Reduction Technique. PubMed. 2025. https://pubmed.ncbi.nlm.nih.gov/39949064/' },
  { num: 15, text: 'Perilunate Dislocation. PMC. 2015. https://pmc.ncbi.nlm.nih.gov/articles/PMC4321386/' },
  { num: 16, text: 'Lunate Dislocation. Core EM. https://coreem.net/core/lunate-dislocation/' },
  { num: 17, text: 'Review of Perilunate Dislocations and Acute Carpal Tunnel Syndrome. PMC. 2024. https://pmc.ncbi.nlm.nih.gov/articles/PMC12304676/' },
  { num: 18, text: 'Isolated acute dorsal DRUJ dislocation. PMC. 2022. https://pmc.ncbi.nlm.nih.gov/articles/PMC9118533/' },
  { num: 19, text: 'Distal Radioulnar Joint Instability. PMC. 2015. https://pmc.ncbi.nlm.nih.gov/articles/PMC4536508/' },
  { num: 20, text: 'Systematic Review of DRUJ Dislocation Treatment. MDPI. 2024. https://www.mdpi.com/2077-0383/13/24/7817' },
  { num: 21, text: 'Image Diagnosis: Scapholunate Dissociation. PMC. 2019. https://pmc.ncbi.nlm.nih.gov/articles/PMC6443367/' },
  { num: 22, text: 'Triangular Fibrocartilage Complex. StatPearls. 2024. https://www.ncbi.nlm.nih.gov/books/NBK537055/' },
  { num: 23, text: 'Treatment of scapholunate ligament injury. PMC. 2017. https://pmc.ncbi.nlm.nih.gov/articles/PMC5644424/' },
  { num: 24, text: 'Scapholunate Dissociation. Physiopedia. https://www.physio-pedia.com/Scapholunate_dissociation' },
  { num: 25, text: 'TFCC Tear. Cleveland Clinic. https://my.clevelandclinic.org/health/diseases/21832-triangular-fibrocartilage-complex-tear-tfcc' },
  { num: 26, text: 'Combined repair of scapholunate and TFCC lesions. PubMed. 2023. https://pubmed.ncbi.nlm.nih.gov/37227663/' },
  { num: 27, text: 'Distal Radius Fractures. Core EM. https://coreem.net/core/distal-radius-fractures/' },
  { num: 28, text: 'Wrist Splint. StatPearls. 2024. https://www.ncbi.nlm.nih.gov/sites/books/NBK557630/' },
  { num: 29, text: 'Splints and Casts: Indications and Methods. AAFP. 2009. https://www.aafp.org/pubs/afp/issues/2009/0901/p491.html' },
  { num: 30, text: 'Thumb Spica Splinting. StatPearls. 2024. https://www.ncbi.nlm.nih.gov/books/NBK538525/' },
  { num: 31, text: 'Incidence of Carpal Tunnel Syndrome after Distal Radius Fracture. PMC. 2022. https://pmc.ncbi.nlm.nih.gov/articles/PMC9678711/' },
  { num: 32, text: 'Acute Carpal Tunnel Syndrome: Early Decompression. PMC. 2023. https://pmc.ncbi.nlm.nih.gov/articles/PMC10079339/' },
  { num: 33, text: 'Orthopedic pitfalls in the ED: Galeazzi and Monteggia. PubMed. 2001. https://pubmed.ncbi.nlm.nih.gov/11326352/' },
  { num: 34, text: 'Monteggia Fractures. StatPearls. 2024. https://www.ncbi.nlm.nih.gov/books/NBK470575/' },
  { num: 35, text: 'Common Fractures of the Radius and Ulna. AAFP. 2021. https://www.aafp.org/pubs/afp/issues/2021/0315/p345.html' },
]

// ===================================================================
// CRITICAL ACTIONS
// ===================================================================

