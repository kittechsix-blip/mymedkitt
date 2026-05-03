// MedKitt — Ankle Fractures
// ED evaluation and management of ankle fractures
// Sources: Ottawa Ankle Rules, Weber Classification, NICE Guidelines 2024
// 6 modules: Ottawa Rules → Classification → Syndesmosis → Stability → Treatment → Disposition
// ~18 nodes

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const ANKLE_FRACTURES_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: OTTAWA ANKLE RULES
  // =====================================================================

  {
    id: 'af-start',
    type: 'question',
    module: 1,
    title: 'Ankle Injury — ED Evaluation',
    body: '[Steps Summary](#/info/af-steps)\n\n**Ottawa Ankle Rules (OAR):**\nSensitivity 97.6% for excluding fracture. NPV >99%.\n\n**X-ray indicated if ANY:**\n• Bone tenderness at posterior edge of lateral malleolus (distal 6cm)\n• Bone tenderness at posterior edge of medial malleolus (distal 6cm)\n• Inability to bear weight (4 steps) immediately AND in ED\n\n**Also check midfoot (separate Ottawa Foot Rules):**\n• Base of 5th metatarsal tenderness\n• Navicular bone tenderness\n\n**Does patient meet Ottawa Ankle Rules criteria?** [1][2]',
    options: [
      { label: 'OAR positive — X-ray indicated', description: 'Malleolar tenderness or cannot bear weight', next: 'af-xray-findings' },
      { label: 'OAR negative — no X-ray needed', description: 'No bony tenderness, can bear weight', next: 'af-sprain' },
      { label: 'OAR not applicable', description: 'Age <2 or >55, intoxicated, distracting injury', next: 'af-xray-findings' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'weight-dose', label: 'Weight Calculator' },
    ],
  },

  {
    id: 'af-sprain',
    type: 'result',
    module: 1,
    title: 'Ankle Sprain — No Fracture',
    body: '**Ottawa Ankle Rules Negative:**\nFracture very unlikely (sensitivity 97.6%, NPV >99%).\n\n**Management:**\n• RICE protocol (Rest, Ice, Compression, Elevation)\n• NSAIDs PRN\n• Ankle brace or stirrup splint for comfort\n• Early mobilization encouraged\n• Weight-bearing as tolerated\n\n**Return Precautions:**\n• Worsening pain despite rest\n• New inability to bear weight\n• Significant swelling increase\n\n**Follow-up:** PCP in 1-2 weeks if symptoms persist.\n\n**High Ankle Sprain (Syndesmotic):**\nIf tenderness ABOVE malleoli or positive squeeze test, consider syndesmotic injury even without fracture. [1]',
    recommendation: 'Ankle sprain. RICE protocol, NSAIDs, ankle brace. Weight-bearing as tolerated. PCP follow-up if symptoms persist >2 weeks.',
    citation: [1],
  },

  // =====================================================================
  // MODULE 2: X-RAY FINDINGS & CLASSIFICATION
  // =====================================================================

  {
    id: 'af-xray-findings',
    type: 'question',
    module: 2,
    title: 'X-Ray Findings',
    body: '**Standard Views:** AP, Mortise (15° internal rotation), Lateral\n\n**Assess:**\n1. **Fibula fracture location** (Weber classification)\n2. **Medial malleolus** — fracture or widened medial clear space\n3. **Posterior malleolus** — lateral view\n4. **Mortise alignment** — talar dome congruent?\n\n**Weber Classification (based on fibula fracture level):**\n• **Weber A** — Below syndesmosis (infrasyndesmotic)\n• **Weber B** — At syndesmosis level (transsyndesmotic)\n• **Weber C** — Above syndesmosis (suprasyndesmotic)\n\n**What does the X-ray show?** [3]',
    options: [
      { label: 'No fracture on X-ray', description: 'Negative radiographs', next: 'af-occult' },
      { label: 'Weber A (below syndesmosis)', description: 'Lateral malleolus avulsion/fracture', next: 'af-weber-a' },
      { label: 'Weber B (at syndesmosis)', description: 'Spiral fibula at joint line', next: 'af-weber-b' },
      { label: 'Weber C (above syndesmosis)', description: 'Fibula fracture above joint', next: 'af-weber-c', urgency: 'urgent' },
      { label: 'Bimalleolar or trimalleolar', description: 'Multiple malleoli fractured', next: 'af-bimalleolar', urgency: 'critical' },
    ],
    citation: [3],
  },

  {
    id: 'af-occult',
    type: 'info',
    module: 2,
    title: 'Negative X-Ray — Consider Occult Injury',
    body: '**X-ray negative but high clinical suspicion:**\n\n**Consider:**\n• Occult fracture (MRI sensitivity >CT for subtle injuries)\n• Syndesmotic injury without fracture (high ankle sprain)\n• Osteochondral lesion of talus\n• Stress fracture\n\n**Syndesmotic Injury Exam:**\n• **Squeeze test** — compress tibia/fibula at mid-calf, pain at ankle = positive\n• **External rotation test** — knee bent, externally rotate foot, pain = positive\n• Tenderness anterior to syndesmosis\n\n**If syndesmotic injury suspected:**\n• Weight-bearing films if possible\n• Consider MRI outpatient\n• Ortho follow-up within 5-7 days\n\n**Otherwise:** Treat as sprain with close follow-up. [4]',
    citation: [4],
    next: 'af-disposition-nonop',
  },

  // =====================================================================
  // MODULE 3: SYNDESMOSIS ASSESSMENT
  // =====================================================================

  {
    id: 'af-weber-a',
    type: 'info',
    module: 3,
    title: 'Weber A — Infrasyndesmotic',
    body: '**Weber A Fractures:**\nFibula fracture BELOW the syndesmosis.\n\n**Characteristics:**\n• Usually stable\n• Syndesmosis intact\n• Often avulsion fracture from lateral ligament\n• Low energy mechanism\n\n**Stability Assessment:**\n• Check medial clear space on mortise view\n• Normal: ≤4 mm (equal to superior clear space)\n• Widened: >4 mm = unstable\n\n**Management:**\n• **Stable (isolated):** Non-operative\n  - Walking boot or short leg cast\n  - Weight-bearing as tolerated\n• **Unstable (medial involvement):** Operative\n\n**Prognosis:** Excellent with conservative management. [3][5]',
    citation: [3, 5],
    next: 'af-disposition-nonop',
  },

  {
    id: 'af-weber-b',
    type: 'question',
    module: 3,
    title: 'Weber B — Transsyndesmotic',
    body: '**Weber B Fractures:**\nFibula fracture AT the level of the syndesmosis.\n\n**Key Question: Is it STABLE or UNSTABLE?**\n\n**Stability Indicators:**\n\n| Stable | Unstable |\n|--------|----------|\n| Mortise congruent | Mortise widened |\n| Medial clear space ≤4mm | Medial clear space >4mm |\n| No medial tenderness | Medial malleolus fracture or deltoid rupture |\n| Negative stress test | Positive stress test |\n\n**Assess medial structures:**\n• Palpate medial malleolus\n• Check for deltoid ligament tenderness\n• Review mortise view carefully\n\n**Is the fracture stable?** [3][5]',
    options: [
      { label: 'Stable Weber B', description: 'Mortise congruent, no medial injury', next: 'af-disposition-nonop' },
      { label: 'Unstable Weber B', description: 'Widened mortise or medial involvement', next: 'af-operative' },
      { label: 'Uncertain — need stress films', description: 'Borderline findings', next: 'af-stress-test' },
    ],
    citation: [3, 5],
  },

  {
    id: 'af-stress-test',
    type: 'info',
    module: 3,
    title: 'Stress Testing',
    body: '**Weight-Bearing or Stress Films:**\n\nUsed when stability uncertain on non-weight-bearing films.\n\n**Options:**\n1. **Weight-bearing mortise view** — patient stands on injured leg\n2. **Gravity stress view** — external rotation with leg hanging\n3. **Manual stress** — external rotation under fluoro (usually ortho)\n\n**Positive Test:**\n• Medial clear space widens >4-5 mm under stress\n• Indicates deltoid ligament rupture\n• Fracture is UNSTABLE\n\n**If pain prevents weight-bearing:**\n• Consider short-term immobilization\n• Repeat films in 5-7 days when swelling decreased\n• Ortho follow-up arranged\n\n**Clinical Pearl:** If in doubt, treat as unstable and get ortho involved. [5]',
    citation: [5],
    next: 'af-operative',
  },

  {
    id: 'af-weber-c',
    type: 'info',
    module: 3,
    title: 'Weber C — Suprasyndesmotic',
    body: '**Weber C Fractures:**\nFibula fracture ABOVE the syndesmosis.\n\n**Characteristics:**\n• Almost always UNSTABLE\n• Syndesmosis disrupted by definition\n• Higher energy mechanism\n• May have associated medial injury\n\n**CRITICAL: Rule out Maisonneuve Fracture**\n• Proximal fibula fracture + syndesmotic disruption\n• Palpate entire fibula to knee\n• If proximal tenderness: full leg films\n\n**Management:**\n• Virtually ALL require operative fixation\n• Syndesmotic screw placement needed\n• Posterior splint, strict non-weight-bearing\n• Ortho consult in ED\n\n**Complications if missed:**\n• Chronic instability\n• Post-traumatic arthritis\n• Poor functional outcomes [3][6]',
    citation: [3, 6],
    safetyLevel: 'warning',
    next: 'af-maisonneuve',
  },

  {
    id: 'af-maisonneuve',
    type: 'info',
    module: 3,
    title: 'Maisonneuve Fracture — Do Not Miss',
    body: '**Maisonneuve Fracture:**\nProximal fibula fracture + complete syndesmotic disruption + medial injury.\n\n**Why Commonly Missed:**\n• Ankle pain dominates — proximal fibula not examined\n• Proximal fracture not on ankle films\n• High index of suspicion required\n\n**Red Flags — Get Full Leg Films:**\n• Medial malleolus fracture without lateral malleolus fracture\n• Syndesmotic widening on ankle films\n• Tenderness over proximal fibula\n• High ankle sprain findings\n• Weber C fracture pattern\n\n**Exam:**\n• Palpate ENTIRE fibula from ankle to knee\n• Squeeze test\n• Proximal fibula tenderness = Maisonneuve until proven otherwise\n\n**Management:**\n• Full tibia/fibula X-rays (AP + lateral)\n• ALL require operative fixation\n• Non-weight-bearing, posterior splint\n• Ortho consult in ED [6]',
    citation: [6],
    safetyLevel: 'critical',
    next: 'af-operative',
  },

  // =====================================================================
  // MODULE 4: BIMALLEOLAR / TRIMALLEOLAR
  // =====================================================================

  {
    id: 'af-bimalleolar',
    type: 'info',
    module: 4,
    title: 'Bimalleolar / Trimalleolar Fractures',
    body: '**Bimalleolar:**\nFractures of BOTH lateral AND medial malleoli.\n\n**Trimalleolar:**\nLateral + medial + posterior malleolus (posterior tibial lip).\n\n**Key Points:**\n• ALL are inherently UNSTABLE\n• ALL require operative fixation\n• Higher complication rates than unimalleolar\n• Posterior malleolus involvement affects outcomes\n\n**ED Management:**\n• Assess neurovascular status\n• Reduce if grossly displaced/dislocated\n• Posterior splint in neutral\n• Strict non-weight-bearing\n• Ice, elevation\n• Ortho consult — admission vs next-day OR\n\n**Timing of Surgery:**\n• Within 24 hours optimal\n• Delay >12 days associated with worse outcomes\n• May delay for severe swelling (wait for "wrinkle sign") [5][7]',
    citation: [5, 7],
    safetyLevel: 'critical',
    next: 'af-operative',
  },

  // =====================================================================
  // MODULE 5: TREATMENT
  // =====================================================================

  {
    id: 'af-operative',
    type: 'result',
    module: 5,
    title: 'Operative Fracture — Ortho Consult',
    body: '**Indications for Operative Fixation (ORIF):**\n• Weber C (suprasyndesmotic)\n• Unstable Weber B\n• Bimalleolar or trimalleolar\n• Maisonneuve fracture\n• Ankle dislocation (after reduction)\n• Intra-articular displacement >2mm\n\n**ED Management:**\n1. **Neurovascular check** — document pulse, sensation, motor\n2. **Reduction** if dislocated (procedural sedation)\n3. **Posterior splint** — ankle at 90°, well-padded\n4. **Non-weight-bearing**\n5. **Ice and elevation** — critical for swelling\n6. **Analgesia** — consider nerve block\n7. **Ortho consult** — same day\n\n**Admit vs Discharge:**\n• Admit if: open fracture, neurovascular compromise, unable to manage at home\n• Discharge OK if: closed, reduced, splinted, reliable follow-up 24-48h\n\n**Surgery Timing:** Within 24h optimal; may delay for soft tissue swelling. [5][7]',
    recommendation: 'Operative ankle fracture. Reduce if displaced. Posterior splint, non-weight-bearing. Ortho consult today. Follow-up 24-48h for OR planning.',
    citation: [5, 7],
  },

  {
    id: 'af-disposition-nonop',
    type: 'result',
    module: 5,
    title: 'Non-Operative Fracture — Conservative Management',
    body: '**Non-Operative Management:**\n\n**Indications:**\n• Stable Weber A\n• Stable Weber B (congruent mortise, no medial injury)\n• Isolated lateral malleolus avulsion\n\n**Immobilization:**\n• **Walking boot** (preferred) — allows early weight-bearing\n• **Posterior splint** — if significant swelling initially\n• Short leg cast — if non-compliance concern\n\n**Weight-Bearing:**\n• Modern approach: weight-bearing as tolerated from day 1\n• Evidence supports early mobilization (better outcomes, faster return to work)\n• Traditional NWB x 6 weeks no longer recommended for most stable fractures\n\n**Duration:**\n• Boot/cast: 4-6 weeks\n• Healing: 10-12 weeks\n\n**Follow-up:**\n• Ortho within 5-7 days\n• Repeat films at follow-up to confirm alignment\n• Progress to ROM exercises as tolerated [5][7]',
    recommendation: 'Stable ankle fracture. Walking boot, weight-bearing as tolerated. Ice, elevation, NSAIDs. Ortho follow-up within 5-7 days for repeat films.',
    citation: [5, 7],
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'af-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**Admission Criteria:**\n• Open fracture\n• Neurovascular compromise\n• Irreducible dislocation\n• Unable to manage at home\n• Pending OR (surgeon preference)\n\n**Discharge Criteria:**\n• Closed, stable or reduced fracture\n• Neurovascularly intact\n• Adequate pain control\n• Reliable follow-up arranged\n• Can manage non-weight-bearing at home\n\n**Follow-up Timing:**\n• Operative fractures: 24-48 hours (ortho)\n• Non-operative: 5-7 days (ortho)\n• Return precautions given',
    options: [
      { label: 'Admit', description: 'Open, NV compromise, OR today', next: 'af-admit' },
      { label: 'Discharge with ortho follow-up', description: 'Stable, closed, good follow-up', next: 'af-discharge' },
    ],
    citation: [5, 7],
  },

  {
    id: 'af-admit',
    type: 'result',
    module: 6,
    title: 'Admit — Operative Management',
    body: '**Admission Orders:**\n\n• NPO after midnight (anticipate OR)\n• Posterior splint, elevate on pillows\n• Ice 20 min q2h while awake\n• Strict non-weight-bearing\n• DVT prophylaxis if prolonged immobility expected\n• Pain management (consider regional block)\n• Ortho to determine OR timing\n\n**Open Fracture Protocol:**\n• Tetanus update\n• IV antibiotics (cefazolin ± gentamicin per Gustilo grade)\n• Irrigation in ED if contaminated\n• OR within 6-24h depending on grade\n\n**Neurovascular Compromise:**\n• Emergent reduction\n• Vascular surgery if pulse not restored\n• Compartment syndrome watch [7]',
    recommendation: 'Admit for operative ankle fracture. NPO, posterior splint, elevation, DVT prophylaxis. Ortho to schedule OR.',
    citation: [7],
  },

  {
    id: 'af-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge — Outpatient Management',
    body: '**Discharge Instructions:**\n\n**Immobilization:**\n• Keep splint/boot on at all times except bathing\n• Do not get splint wet\n\n**Activity:**\n• Elevate above heart level as much as possible first 48-72h\n• Ice 20 min every 2-3 hours while awake\n• Weight-bearing per ortho instructions (usually WBAT in boot for stable fractures)\n\n**Medications:**\n• NSAIDs (ibuprofen 400-600mg q6h with food) or acetaminophen\n• Narcotic for breakthrough pain only\n\n**Follow-up:**\n• Ortho appointment within 5-7 days\n• Bring all imaging\n\n**Return to ED if:**\n• Increasing pain despite elevation and meds\n• Numbness or tingling in toes\n• Toes turn blue or white\n• Fever >101°F\n• Splint becomes too tight or loose',
    recommendation: 'Discharge with walking boot/splint. RICE protocol, NSAIDs. Ortho follow-up 5-7 days. Written return precautions.',
    citation: [5],
  },

];

export const ANKLE_FRACTURES_MODULE_LABELS: string[] = [
  'Ottawa Ankle Rules',
  'Classification',
  'Syndesmosis',
  'Bimalleolar/Trimalleolar',
  'Treatment',
  'Disposition',
];

export const ANKLE_FRACTURES_CITATIONS: Citation[] = [
  { num: 1, text: 'Stiell IG, Greenberg GH, McKnight RD, et al. Decision rules for the use of radiography in acute ankle injuries. JAMA. 1993;269(9):1127-1132.' },
  { num: 2, text: 'Bachmann LM, Kolb E, Koller MT, et al. Accuracy of Ottawa ankle rules to exclude fractures of the ankle and mid-foot: systematic review. BMJ. 2003;326(7386):417.' },
  { num: 3, text: 'Okanobo H, Khurana B, Sheehan S, et al. Simplified diagnostic algorithm for Lauge-Hansen classification of ankle injuries. Radiographics. 2012;32(2):E71-E84.' },
  { num: 4, text: 'van den Bekerom MPJ, Kerkhoffs GMMJ, McCollum GA, et al. Management of acute lateral ankle ligament injury in the athlete. Knee Surg Sports Traumatol Arthrosc. 2013;21(6):1390-1395.' },
  { num: 5, text: 'NICE. Fractures (non-complex): assessment and management. NICE guideline NG38. 2016 (updated 2023).' },
  { num: 6, text: 'Stufkens SA, van den Bekerom MP, Kerkhoffs GM, et al. Long-term outcome after 1822 operatively treated ankle fractures. Acta Orthop. 2011;82(4):445-452.' },
  { num: 7, text: 'Konrath GA, Karges DE, Watson JT, et al. Early versus delayed treatment of severe ankle fractures. J Orthop Trauma. 1995;9(5):377-380.' },
];

export const ANKLE_FRACTURES_NODE_COUNT = ANKLE_FRACTURES_NODES.length;
