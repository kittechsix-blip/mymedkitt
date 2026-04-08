// MedKitt — Shoulder Dislocation Reduction
// ED evaluation, reduction techniques, analgesia, and disposition
// 6 modules: Assessment → Imaging → Analgesia → Reduction → Post-Reduction → Disposition
// Based on ACEP resources, systematic reviews, and orthopedic guidelines

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const SHOULDER_DISLOCATION_CRITICAL_ACTIONS = [
  { text: 'Document pre-reduction neurovascular exam (axillary nerve: regimental badge sensation)', nodeId: 'shoulder-neurovascular' },
  { text: 'FARES method - highest success (89-95%), lowest pain', nodeId: 'shoulder-fares' },
  { text: 'Intra-articular lidocaine 20 mL - fewer adverse events than PSA', nodeId: 'shoulder-ial-technique' },
  { text: 'Post-reduction radiographs to confirm reduction and assess for fractures', nodeId: 'shoulder-post-reduction' },
  { text: 'Repeat neurovascular exam post-reduction', nodeId: 'shoulder-post-reduction' },
  { text: 'First-time young patients (<30) - consider external rotation brace (reduced recurrence)', nodeId: 'shoulder-er-brace' },
  { text: 'Greater tuberosity fracture: single attempt only, immobilize in abduction sling', nodeId: 'shoulder-gt-fracture' },
  { text: 'Age >40 - high risk rotator cuff tear (70% at age >60)', nodeId: 'shoulder-elderly' },
];

export const SHOULDER_DISLOCATION_NODES: DecisionNode[] = [
  // ===================================================================
  // MODULE 1: Initial Assessment
  // ===================================================================
  {
    id: 'shoulder-start',
    type: 'info',
    module: 1,
    title: 'Shoulder Dislocation',
    body: '[Shoulder Reduction Summary](#/info/shoulder-summary) — assessment, reduction, and disposition pathway.\n\n**Most common large joint dislocation** — comprising ~50% of all major joint dislocations seen in the ED.\n\n**Anterior dislocation: 95-97%** of all shoulder dislocations\n• Mechanism: abduction + external rotation + extension\n• Arm held in slight abduction, externally rotated\n• Loss of deltoid contour, prominent acromion\n\n**Posterior dislocation: 2-4%** (easily missed)\n• Mechanism: seizure, electrocution, direct anterior force\n• Arm held in adduction, internally rotated\n• Coracoid prominent, limited external rotation\n\n**Inferior (luxatio erecta): <1%**\n• Arm locked in full abduction overhead\n• High association with neurovascular injury',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'isis-score', label: 'ISIS Score' },
      { id: 'shoulder-recurrence', label: 'Recurrence Risk' },
      { id: 'quebec-xray', label: 'Quebec Decision Rule' },
    ],
    next: 'shoulder-neurovascular',
  },
  {
    id: 'shoulder-neurovascular',
    type: 'info',
    module: 1,
    title: 'Neurovascular Assessment',
    body: '**MANDATORY pre-reduction neurovascular exam:**\n\n**Axillary nerve (most commonly injured — 5-35%):**\n• Sensation: "regimental badge" area (lateral deltoid)\n• Motor: deltoid contraction (difficult to test pre-reduction)\n• Document ANY sensory deficit before reduction\n\n**Musculocutaneous nerve:**\n• Sensation: lateral forearm\n• Motor: elbow flexion\n\n**Vascular assessment:**\n• Radial pulse — compare to unaffected side\n• Capillary refill\n• Axillary artery injury: expanding hematoma, absent pulse, bruit\n\n**Document findings clearly** — neurovascular deficits are common and must be established as pre-existing vs iatrogenic.',
    citation: [1, 3],
    next: 'shoulder-first-recurrent',
  },
  {
    id: 'shoulder-first-recurrent',
    type: 'question',
    module: 1,
    title: 'First-Time or Recurrent?',
    body: '**Determine dislocation history:**\n\n**First-time dislocation:**\n• Higher risk of associated injuries (Bankart, Hill-Sachs, GT fracture)\n• Pre-reduction imaging more important\n• Higher recurrence risk in young patients\n\n**Recurrent dislocation:**\n• Often requires less analgesia/sedation\n• May self-reduce or reduce easily\n• Known mechanism and anatomy\n• May defer pre-reduction imaging\n\nIs this a **first-time** or **recurrent** dislocation?',
    citation: [1, 4],
    options: [
      { label: 'First-time dislocation', description: 'No prior history of this shoulder dislocating', next: 'shoulder-imaging-decision' },
      { label: 'Recurrent dislocation', description: 'Has dislocated before, known mechanism', next: 'shoulder-recurrent-path' },
      { label: 'Uncertain history', description: 'Cannot confirm prior dislocations', next: 'shoulder-imaging-decision' },
    ],
  },
  {
    id: 'shoulder-recurrent-path',
    type: 'question',
    module: 1,
    title: 'Recurrent Dislocation Assessment',
    body: '**Recurrent dislocators often require:**\n• Less or no sedation\n• Simpler reduction techniques\n• May self-reduce with coaching\n\n**Consider pre-reduction imaging if:**\n• Different mechanism than usual\n• Higher energy mechanism\n• More pain than prior episodes\n• Concern for new fracture\n\n**Red flags in recurrent dislocator:**\n• New neurovascular deficit\n• Unusual limb position\n• Significantly more pain than prior\n\nDoes this recurrent dislocation have any concerning features?',
    citation: [4, 5],
    options: [
      { label: 'Typical presentation', description: 'Same as prior episodes, low-energy, no red flags', next: 'shoulder-analgesia-choice' },
      { label: 'Atypical or concerning features', description: 'Different mechanism, more pain, new deficits', next: 'shoulder-imaging-decision' },
    ],
  },

  // ===================================================================
  // MODULE 2: Imaging Decision
  // ===================================================================
  {
    id: 'shoulder-imaging-decision',
    type: 'question',
    module: 2,
    title: 'Pre-Reduction Imaging',
    body: '**Pre-reduction radiographs add ~30 minutes to treatment** [5]\n\n**Quebec Decision Rule suggests imaging when:**\n• Age >40 years\n• First episode\n• High-energy mechanism (fall >1 flight, MVA, assault)\n\n**May defer pre-reduction imaging if:**\n• Age 18-40 years (fracture risk <1%)\n• Recurrent dislocator with typical mechanism\n• Clinical certainty by experienced provider\n• Low-energy mechanism\n\n**Note:** 37.5% of fractures visible only post-reduction [5]\n\nWhat is the patient\'s age and mechanism?',
    citation: [5, 6],
    calculatorLinks: [
      { id: 'quebec-xray', label: 'Quebec Decision Rule' },
    ],
    options: [
      { label: 'Age <40, low energy', description: 'Low fracture risk, may defer imaging', next: 'shoulder-analgesia-choice' },
      { label: 'Age >40 or high energy', description: 'Higher fracture risk, image first', next: 'shoulder-xray-findings' },
      { label: 'First episode, any age', description: 'Consider imaging for baseline', next: 'shoulder-xray-findings' },
      { label: 'Clinical certainty, defer imaging', description: 'Experienced provider, typical presentation', next: 'shoulder-analgesia-choice' },
    ],
  },
  {
    id: 'shoulder-xray-findings',
    type: 'question',
    module: 2,
    title: 'Radiograph Findings',
    body: '**Standard views:** AP, scapular Y (or axillary)\n\n**Confirm dislocation direction:**\n• Anterior: humeral head inferior to coracoid\n• Posterior: "lightbulb sign" (internal rotation), loss of half-moon overlap\n\n**Associated fractures:**\n• **Greater tuberosity (15-25%)** — usually reduces with humeral head\n• **Hill-Sachs (40-90%)** — posterolateral humeral head compression\n• **Bankart (bony)** — anteroinferior glenoid avulsion\n• **Humeral neck fracture** — change reduction strategy\n\nAre there associated fractures?',
    citation: [1, 7],
    images: [{ src: 'images/shoulder-dislocation/shoulder-anterior-dislocation.png', alt: 'Anterior shoulder dislocation X-ray — AP view showing subcoracoid displacement', caption: 'Anterior dislocation (95% of cases): humeral head displaced anterior/inferior to glenoid, subcoracoid position — AP and scapular Y views confirm (Wikimedia Commons, CC BY-SA 4.0)' }],
    options: [
      { label: 'No fracture', description: 'Isolated dislocation', next: 'shoulder-analgesia-choice' },
      { label: 'Greater tuberosity fracture', description: '15-25% of anterior dislocations', next: 'shoulder-gt-fracture' },
      { label: 'Humeral neck/surgical neck fracture', description: 'Fracture-dislocation, modify approach', next: 'shoulder-fracture-dislocation' },
      { label: 'Glenoid fracture (bony Bankart)', description: 'May affect stability', next: 'shoulder-analgesia-choice' },
    ],
  },
  {
    id: 'shoulder-gt-fracture',
    type: 'info',
    module: 2,
    title: 'Greater Tuberosity Fracture',
    body: '**Greater tuberosity fractures (15-25% of anterior dislocations):**\n\n**ED reduction criteria:** [7]\n• Age <50 years\n• Good bone quality\n• No concern for neck fracture\n• Experienced provider\n• **Single attempt only**\n\n**Consider OR reduction if:**\n• Age >50 with osteoporosis\n• Concern for pathologic fracture\n• Multi-part fracture\n• Failed ED attempt\n\n**Post-reduction management:**\n• GT typically reduces anatomically with humeral head\n• Immobilize in abduction pillow sling for 6 weeks\n• Weekly radiographs x3 weeks to monitor displacement\n• Ortho referral — surgery if >5mm displacement',
    citation: [7],
    next: 'shoulder-analgesia-choice',
  },
  {
    id: 'shoulder-fracture-dislocation',
    type: 'info',
    module: 2,
    title: 'Fracture-Dislocation',
    body: '**Humeral neck fracture-dislocation requires modified approach:**\n\n**High risk for:**\n• Neurovascular injury (5-34% have nerve injury)\n• Iatrogenic fracture displacement\n• Need for surgical intervention\n\n**ED approach:**\n• **Single gentle reduction attempt** under procedural sedation\n• Use traction-based technique (NOT leverage)\n• Avoid rotation-based maneuvers\n• Low threshold for OR reduction\n\n**Call orthopedics early:**\n• Multi-part fractures\n• Surgical neck involvement\n• Vascular compromise\n• Failed single attempt\n\n**If successful:** Coaptation splint, strict non-weight bearing, ortho follow-up within 48 hours.',
    citation: [1, 7],
    next: 'shoulder-analgesia-choice',
  },

  // ===================================================================
  // MODULE 3: Analgesia Selection
  // ===================================================================
  {
    id: 'shoulder-analgesia-choice',
    type: 'question',
    module: 3,
    title: 'Analgesia Strategy',
    body: '**Two main approaches with similar success rates:**\n\n**Intra-articular lidocaine (IAL):**\n• 20 mL of 1% lidocaine into glenohumeral joint\n• Fewer adverse events than PSA\n• Shorter ED length of stay\n• Patient satisfaction slightly lower\n• Ideal for: hemodynamically unstable, difficult airway, solo coverage\n\n**Procedural sedation and analgesia (PSA):**\n• Propofol, ketamine, or etomidate\n• Higher patient satisfaction\n• More adverse events (hypotension, apnea)\n• Requires monitoring, recovery time\n\n**Meta-analysis [8]:** IAL similar effectiveness with fewer adverse events\n\nSelect analgesia approach:',
    citation: [8, 9],
    options: [
      { label: 'Intra-articular lidocaine', description: 'IAL — fewer adverse events, shorter stay', next: 'shoulder-ial-technique' },
      { label: 'Procedural sedation', description: 'PSA — higher satisfaction, more monitoring', next: 'shoulder-psa' },
      { label: 'No sedation/analgesia', description: 'Cooperative patient, biomechanical technique', next: 'shoulder-technique-select' },
    ],
  },
  {
    id: 'shoulder-ial-technique',
    type: 'info',
    module: 3,
    title: 'Intra-Articular Lidocaine',
    body: '**IAL Injection Technique:**\n\n**Position:** Patient seated or supine, arm supported\n\n**Approach (posterior):**\n1. Identify landmarks: acromion, coracoid, humeral head\n2. Entry point: 2 cm inferior and 2 cm medial to posterolateral acromion\n3. Direct needle anteriorly toward coracoid\n4. Advance until joint space entered (loss of resistance)\n\n**Injection:**\n• **20 mL of 1% lidocaine** (some use 10 mL if confident)\n• May aspirate hemarthrosis first\n• Wait 10-15 minutes for full effect\n\n**Alternative (lateral approach):**\n• 2 cm below lateral acromion\n• Direct medially toward glenoid\n\n**Onset:** 10-15 minutes | **Duration:** 60-90 minutes',
    citation: [8],
    next: 'shoulder-technique-select',
  },
  {
    id: 'shoulder-psa',
    type: 'info',
    module: 3,
    title: 'Procedural Sedation',
    body: '**Procedural Sedation Options:**\n\n**[Propofol](#/drug/propofol/sedation):**\n• 0.5-1 mg/kg IV, titrate to effect\n• Rapid onset, short duration\n• Risk: hypotension, apnea\n\n**[Ketamine](#/drug/ketamine/sedation):**\n• 1-2 mg/kg IV\n• Maintains airway reflexes\n• Ideal for younger patients\n\n**[Etomidate](#/drug/etomidate/sedation):**\n• 0.1-0.2 mg/kg IV\n• Hemodynamically stable\n• Brief myoclonus\n\n**Ketofol (ketamine + propofol):**\n• 0.5 mg/kg each\n• Synergistic, fewer adverse effects\n\n**Required monitoring:**\n• Continuous pulse oximetry\n• Capnography (recommended)\n• BP monitoring\n• Suction, BVM, rescue airway ready',
    citation: [9],
    next: 'shoulder-technique-select',
  },

  // ===================================================================
  // MODULE 4: Reduction Techniques
  // ===================================================================
  {
    id: 'shoulder-technique-select',
    type: 'question',
    module: 4,
    title: 'Reduction Technique Selection',
    body: '**First-line techniques (evidence-based ranking):**\n\n| Technique | Success | Pain | Sedation |\n|-----------|---------|------|----------|\n| **FARES** | 89-95% | Low (VAS 1.6) | Often not needed |\n| **Scapular manipulation** | 79-97% | Low-moderate | Often not needed |\n| **External rotation** | 78-90% | Low | 61-81% not needed |\n| **Cunningham** | 35-77% | Minimal | Not needed |\n\n**Second-line:**\n• Stimson (prone): 28-97%, no assistant needed\n• Traction-countertrtext: ~80%, backup method\n\n**Avoid:** Kocher technique, Hippocratic (foot in axilla) — high complication rates\n\nSelect your reduction technique:',
    citation: [2, 10, 11],
    options: [
      { label: 'FARES Method', description: 'Best evidence — highest success, lowest pain', next: 'shoulder-fares' },
      { label: 'Scapular Manipulation', description: 'Fast, simple, high success', next: 'shoulder-scapular' },
      { label: 'External Rotation', description: 'Low-tech, cooperative patient', next: 'shoulder-external-rotation' },
      { label: 'Cunningham Technique', description: 'No force, muscle relaxation', next: 'shoulder-cunningham' },
      { label: 'Stimson (Prone)', description: 'No assistant needed', next: 'shoulder-stimson' },
      { label: 'Traction-Countertraction', description: 'Backup method, high success', next: 'shoulder-traction' },
    ],
  },
  {
    id: 'shoulder-fares',
    type: 'info',
    module: 4,
    title: 'FARES Method',
    body: '**FARES (Fast, Reliable, and Safe)** — Success: 89-95%, VAS pain 1.6\n\n**Position:** Patient supine, arm at side\n\n**Steps:**\n1. **Grasp wrist** with both hands\n2. Apply **gentle longitudinal traction** (along axis of arm)\n3. Begin **vertical oscillations** (±5 cm up/down) at 2-3 cycles/second\n4. **Slowly abduct** arm while maintaining traction and oscillations\n5. At ~90° abduction, add **external rotation**\n6. Continue oscillations until reduction achieved (~120° abduction)\n\n**Key points:**\n• Oscillations relax muscles, reduce pain\n• No sudden movements or force\n• Can be performed by junior residents\n• Average time: 2-3 minutes\n\n**Signs of reduction:** Palpable clunk, restored contour, patient relief',
    citation: [10],
    next: 'shoulder-post-reduction',
  },
  {
    id: 'shoulder-scapular',
    type: 'info',
    module: 4,
    title: 'Scapular Manipulation',
    body: '**Scapular Manipulation** — Success: 79-97%, 65% reduced in <1 minute\n\n**Position:** Patient prone (original) or seated\n\n**Prone technique:**\n1. Patient prone on stretcher, affected arm hanging off edge\n2. Apply **5-10 lbs downward traction** on arm\n3. Push **inferior tip of scapula medially** (toward spine)\n4. Simultaneously push **superior scapula laterally**\n5. This rotates glenoid to meet humeral head\n\n**Seated/upright variation:**\n1. Assistant applies forward traction on arm (10-15°)\n2. Operator pushes inferior scapular tip medially\n3. Superior scapula pushed laterally\n\n**Advantages:**\n• Very fast when successful\n• 81% report no/mild pain\n• Works well in recurrent dislocators (100% success in one study)',
    citation: [11],
    next: 'shoulder-post-reduction',
  },
  {
    id: 'shoulder-external-rotation',
    type: 'info',
    module: 4,
    title: 'External Rotation Method',
    body: '**External Rotation** — Success: 78-90%\n\n**Position:** Patient supine or seated, arm at side\n\n**Steps:**\n1. **Flex elbow to 90°**, arm adducted at side\n2. Slowly **externally rotate** forearm (moving hand away from body)\n3. Rotate at ~1° per second — SLOW is key\n4. Continue to maximum external rotation (~90°)\n5. If not reduced, **abduct arm** while maintaining external rotation\n6. Then **internally rotate** to complete reduction\n\n**Key points:**\n• Stop if patient reports significant pain\n• Requires patient cooperation\n• 61-81% success without any sedation (ERWOSA study)\n• Average time: <2 minutes\n\n**Contraindications:**\n• Uncooperative patient\n• Surgical neck fracture',
    citation: [2],
    next: 'shoulder-post-reduction',
  },
  {
    id: 'shoulder-cunningham',
    type: 'info',
    module: 4,
    title: 'Cunningham Technique',
    body: '**Cunningham Technique** — Success: 35-77% (highly variable)\n\n**Position:** Patient seated, examiner at same level\n\n**Steps:**\n1. Patient sits upright, **relaxes shoulders back**\n2. **Flex elbow to 90°**, support wrist on your forearm\n3. Patient **shrugs shoulders** then relaxes them down\n4. **Massage biceps** — firm strokes from mid-arm to elbow\n5. **Massage trapezius** and deltoid similarly\n6. Patient focuses on **relaxing** — humeral head self-reduces\n\n**Key points:**\n• Works via muscle relaxation, NOT force\n• Requires calm, cooperative patient\n• May take several minutes\n• Best for: recurrent dislocators, pre-hospital\n\n**If not working after 5-10 minutes:** Switch to another technique',
    citation: [12],
    next: 'shoulder-post-reduction',
  },
  {
    id: 'shoulder-stimson',
    type: 'info',
    module: 4,
    title: 'Stimson Technique (Prone)',
    body: '**Stimson Technique** — Success: 28-97% (variable)\n\n**Position:** Patient prone on stretcher, arm hanging off edge\n\n**Steps:**\n1. Patient prone with affected arm **hanging freely**\n2. Apply **5-10 lbs weight** to wrist (or gentle manual traction)\n3. Wait 15-30 minutes for muscle fatigue and relaxation\n4. May gently **externally rotate** arm if needed\n5. Reduction occurs as muscles relax\n\n**Advantages:**\n• No assistant required\n• Minimal manipulation\n\n**Disadvantages:**\n• Time-intensive (15-30 min)\n• Monitoring in prone position\n• Lower success without sedation (28% in one RCT)\n• Risk of patient sliding off stretcher\n\n**Alternative: Milch technique** — 82.8% success (supine, external rotation + abduction)',
    citation: [13],
    next: 'shoulder-post-reduction',
  },
  {
    id: 'shoulder-traction',
    type: 'info',
    module: 4,
    title: 'Traction-Countertraction',
    body: '**Traction-Countertraction** — Success: ~80%\n\n**Position:** Patient supine\n\n**Steps:**\n1. Wrap **sheet around patient\'s chest** (under axilla on affected side)\n2. Assistant provides **countertraction** via sheet\n3. Operator applies **inline traction** on arm (slight abduction)\n4. Gradually **externally rotate** while maintaining traction\n5. May add gentle **lateral traction** on proximal humerus\n\n**Key points:**\n• Usually requires procedural sedation\n• Sheet padding prevents axillary injury\n• Avoid excessive force\n• Good backup method when others fail\n\n**AVOID:**\n• Hippocratic technique (foot in axilla) — neurovascular injury risk\n• Kocher technique (forceful leverage) — fracture risk',
    citation: [1, 2],
    next: 'shoulder-post-reduction',
  },

  // ===================================================================
  // MODULE 5: Post-Reduction
  // ===================================================================
  {
    id: 'shoulder-post-reduction',
    type: 'info',
    module: 5,
    title: 'Post-Reduction Assessment',
    body: '**Immediate post-reduction steps:**\n\n**1. Clinical confirmation:**\n• Palpate deltoid contour — should be restored\n• Assess range of motion — improved\n• Patient reports relief\n\n**2. Neurovascular re-examination:**\n• Axillary nerve: regimental badge sensation\n• Distal pulses: radial artery\n• Compare to pre-reduction exam\n• **Document any changes**\n\n**3. Post-reduction radiographs:**\n• Confirm anatomic reduction\n• Assess for iatrogenic fracture\n• Identify Hill-Sachs/Bankart lesions\n\n**4. Immobilization:**\n• Sling and swathe initially\n• Decision on internal vs external rotation positioning',
    citation: [1, 4],
    calculatorLinks: [
      { id: 'isis-score', label: 'ISIS Score' },
      { id: 'shoulder-recurrence', label: 'Recurrence Risk' },
    ],
    next: 'shoulder-immobilization',
  },
  {
    id: 'shoulder-immobilization',
    type: 'question',
    module: 5,
    title: 'Immobilization Strategy',
    body: '**Internal vs External Rotation Debate:**\n\n**Traditional (internal rotation — sling):**\n• Standard sling with arm at side\n• More comfortable for patient\n• Easier compliance\n\n**External rotation brace:**\n• Some RCTs show reduced recurrence (RR 0.56)\n• Best evidence in patients ≤30 years\n• Anatomical rationale: better Bankart coaptation on MRI\n• Other studies show no difference\n\n**2016 meta-analysis:** No overall significant difference [14]\n\n**Duration:** 3-6 weeks regardless of position\n\nPatient age and risk factors?',
    citation: [14],
    options: [
      { label: 'Age <30, first dislocation', description: 'Consider external rotation brace', next: 'shoulder-er-brace' },
      { label: 'Age >30 or recurrent', description: 'Standard sling adequate', next: 'shoulder-sling' },
      { label: 'Patient preference', description: 'Discuss options with patient', next: 'shoulder-sling' },
    ],
  },
  {
    id: 'shoulder-er-brace',
    type: 'info',
    module: 5,
    title: 'External Rotation Immobilization',
    body: '**External rotation brace for high-risk patients:**\n\n**Best candidates:**\n• Age 20-30 years\n• First-time dislocation\n• Bankart lesion on imaging\n• Greater tuberosity fracture\n• Motivated, compliant patient\n\n**Evidence:**\n• 46% relative risk reduction in recurrence (age ≤30)\n• Better Bankart lesion coaptation on MRI\n• May reduce surgical need\n\n**Prescription:**\n• External rotation brace at 10-15° ER\n• Wear 24/7 except for bathing\n• Duration: 3-4 weeks\n• Follow with physical therapy\n\n**Patient counseling:**\n• More cumbersome than sling\n• Evidence not conclusive\n• Shared decision-making',
    citation: [14],
    next: 'shoulder-disposition',
  },
  {
    id: 'shoulder-sling',
    type: 'info',
    module: 5,
    title: 'Standard Sling Immobilization',
    body: '**Standard sling immobilization:**\n\n**Application:**\n• Arm at side, elbow flexed 90°\n• Sling supports forearm and wrist\n• Swathe optional for first few days\n\n**Duration:**\n• **Age <40:** 3 weeks (balance stability vs stiffness)\n• **Age >40:** 1-2 weeks (prioritize early ROM to prevent stiffness)\n\n**Patient instructions:**\n• Remove sling 3x daily for elbow/wrist ROM\n• Pendulum exercises after 1 week\n• Ice for pain and swelling\n• No lifting, pushing, pulling with affected arm\n\n**When to remove:**\n• Pain controlled\n• Starting physical therapy\n• Per orthopedic guidance',
    citation: [1, 4],
    next: 'shoulder-disposition',
  },

  // ===================================================================
  // MODULE 6: Disposition
  // ===================================================================
  {
    id: 'shoulder-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition Planning',
    body: '**Factors determining disposition:**\n\n**Urgent orthopedic consult (consider admission):**\n• Failed reduction\n• Neurovascular compromise\n• Open dislocation\n• Fracture-dislocation requiring surgery\n• Bilateral dislocations\n\n**Outpatient orthopedic follow-up:**\n• Successful reduction\n• All first-time dislocations\n• Recurrent dislocations (surgical evaluation)\n• Associated fractures\n\n**Follow-up timing:**\n• First-time, age <30: within 1 week (high recurrence risk)\n• First-time, age >40: within 1-2 weeks (rotator cuff evaluation)\n• Recurrent: 1-2 weeks (surgical discussion)\n\nWhat is the clinical situation?',
    citation: [1, 4, 15],
    calculatorLinks: [
      { id: 'shoulder-recurrence', label: 'Recurrence Risk' },
    ],
    options: [
      { label: 'Successful reduction, stable', description: 'Discharge with follow-up', next: 'shoulder-discharge' },
      { label: 'Failed reduction', description: 'Ortho consult, likely OR', next: 'shoulder-failed' },
      { label: 'Neurovascular compromise', description: 'Urgent ortho consult', next: 'shoulder-nv-compromise' },
      { label: 'Young athlete', description: 'Special considerations', next: 'shoulder-athlete' },
      { label: 'Elderly patient (>40)', description: 'Rotator cuff concerns', next: 'shoulder-elderly' },
    ],
  },
  {
    id: 'shoulder-discharge',
    type: 'info',
    module: 6,
    title: 'Discharge Instructions',
    body: '**Discharge checklist:**\n\n**Medications:**\n• NSAIDs: [Ibuprofen](#/drug/ibuprofen/pain) 600-800mg TID with food\n• Consider short course opioid for severe pain\n• Muscle relaxant optional: [Cyclobenzaprine](#/drug/cyclobenzaprine/spasm) 10mg TID\n\n**Activity restrictions:**\n• Sling immobilization as prescribed\n• No lifting >5 lbs with affected arm\n• No overhead activities\n• No driving until out of sling\n\n**Return precautions:**\n• Numbness/tingling that worsens\n• New weakness\n• Severe pain not controlled with medications\n• Signs of re-dislocation\n\n**Follow-up:**\n• Orthopedics within 1-2 weeks\n• Physical therapy referral\n• First-time young patients: discuss surgical options',
    citation: [1],
    next: 'shoulder-recurrence-counseling',
  },
  {
    id: 'shoulder-recurrence-counseling',
    type: 'info',
    module: 6,
    title: 'Recurrence Counseling',
    body: '**Age-based recurrence risk (5-year rates):**\n\n| Age at First Dislocation | Recurrence Risk |\n|--------------------------|------------------|\n| **15-20 years** | 86.6% |\n| **21-25 years** | 73.8% |\n| **26-30 years** | 48.8% |\n| **31-35 years** | 30.7% |\n| **>40 years** | 10-15% |\n\n**Additional risk factors:**\n• Male sex (OR 1.92)\n• Contact/collision sports\n• Hyperlaxity\n• Manual occupation\n\n**Surgical consideration:**\n• Age <25: Surgery reduces re-dislocation significantly (RR 0.14-0.15)\n• ISIS score ≥4: Augmented repair (Latarjet) may be needed\n• Discuss early surgical referral with high-risk patients',
    citation: [4, 15],
    calculatorLinks: [
      { id: 'shoulder-recurrence', label: 'Recurrence Risk' },
      { id: 'isis-score', label: 'ISIS Score' },
    ],
    next: undefined,
  },
  {
    id: 'shoulder-failed',
    type: 'info',
    module: 6,
    title: 'Failed Reduction',
    body: '**Failed closed reduction — call orthopedics:**\n\n**Reasons for failure:**\n• Soft tissue interposition (capsule, labrum, biceps tendon)\n• Associated fracture blocking reduction\n• Locked dislocation (chronic)\n• Inadequate muscle relaxation\n\n**Next steps:**\n• Deeper sedation/general anesthesia\n• OR reduction with fluoroscopy\n• Arthroscopic or open reduction\n• Address concurrent injuries\n\n**While awaiting OR:**\n• Sling immobilization\n• Pain control\n• Ice\n• Neurovascular monitoring\n• NPO for OR',
    citation: [1, 3],
    next: undefined,
  },
  {
    id: 'shoulder-nv-compromise',
    type: 'info',
    module: 6,
    title: 'Neurovascular Compromise',
    body: '**Neurovascular compromise is a surgical emergency:**\n\n**Vascular injury (rare but catastrophic):**\n• Axillary artery injury: expanding hematoma, absent pulse, bruit\n• Immediate vascular surgery consult\n• CTA if stable, OR if unstable\n\n**Nerve injury (5-35%):**\n• Axillary nerve most common\n• Most are neurapraxia — resolve in weeks to months\n• EMG at 3-4 weeks if no improvement\n\n**Management of nerve deficit:**\n• Document pre- and post-reduction status\n• Neurapraxia: observation, PT\n• No improvement at 3 months: consider exploration\n\n**Vascular compromise:**\n• Do NOT attempt reduction\n• Emergent vascular surgery\n• May need OR reduction with vascular repair',
    citation: [1, 3],
    next: undefined,
  },
  {
    id: 'shoulder-athlete',
    type: 'info',
    module: 6,
    title: 'Athlete Considerations',
    body: '**Athletic shoulder dislocation — special considerations:**\n\n**In-season quick return:**\n• Possible in 2-3 weeks with protective bracing\n• **Recurrence risk: 37-90%** if return to contact sports\n• Discuss risk with athlete and team\n\n**Return-to-play criteria:**\n• Pain-free\n• Symmetric shoulder strength\n• Bilateral scapular strength\n• Functional ROM for sport-specific activities\n\n**Surgical consideration:**\n• First-time dislocation in young athlete: discuss early surgery\n• Post-Latarjet return: 88% return to sport, 72.6% at prior level\n• Conservative: 3+ months before vigorous training\n\n**2022 Bern Consensus Statement:**\n• Best-practice guidance for prevention, rehab, return to sport',
    citation: [15],
    calculatorLinks: [
      { id: 'isis-score', label: 'ISIS Score' },
    ],
    next: undefined,
  },
  {
    id: 'shoulder-elderly',
    type: 'info',
    module: 6,
    title: 'Elderly Patient Considerations',
    body: '**Age >40 — rotator cuff concerns:**\n\n**Risk of rotator cuff tear:**\n• Age >60: 70% risk of full-thickness tear\n• Age >80: 80% tear rate\n• Significantly higher than young patients\n\n**Red flags for cuff tear:**\n• Persistent weakness after reduction\n• Inability to actively abduct\n• Positive drop arm test\n• Pain out of proportion\n\n**Imaging:**\n• MRI preferred for full assessment\n• Ultrasound alternative if skilled operator\n\n**Management:**\n• Early surgical repair of acute cuff tears (within 4 weeks) yields better outcomes\n• 84% excellent/good results with early surgery vs 50% non-operative\n• Consider reverse total shoulder arthroplasty for irreparable tears\n\n**Immobilization:**\n• Shorter duration (1-2 weeks) to prevent stiffness\n• Early ROM exercises',
    citation: [3],
    next: undefined,
  },
];

export const SHOULDER_DISLOCATION_CITATIONS: Citation[] = [
  { num: 1, text: 'Medscape eMedicine. Shoulder Dislocation Treatment & Management. Updated 2024.' },
  { num: 2, text: 'Alkaduhimi H, et al. Network meta-analysis of closed reduction methods for anterior shoulder dislocation. Bone Joint J. 2023;105-B(3):274-282. PMID: 36797133' },
  { num: 3, text: 'ACEP Sports Medicine Section. Pain Control Options for Shoulder Reduction. September 2022.' },
  { num: 4, text: 'Olds M, et al. Predicting recurrent instability of the shoulder (PRIS). JOSPT. 2020;50(8):431-437.' },
  { num: 5, text: 'Hendey GW, et al. Selective radiography in 100 patients with suspected shoulder dislocation. J Emerg Med. 2006;31(1):23-28. PMID: 20825841' },
  { num: 6, text: 'Emond M, et al. Clinical prediction rule for delayed diagnosis of posterior shoulder dislocation. CJEM. 2009;11(6):543-549. PMC6637797' },
  { num: 7, text: 'Neumann WH, et al. Anterior shoulder dislocation with greater tuberosity fracture. JSES Int. 2024;8(2):308-315. PMC11329025' },
  { num: 8, text: 'Jiang N, et al. Intra-articular lidocaine versus intravenous sedation for shoulder dislocation reduction: a meta-analysis. Am J Emerg Med. 2022;61:46-52. PMID: 36181665' },
  { num: 9, text: 'REBEL EM. Intra-articular Lidocaine vs Procedural Sedation for Closed Reduction of Acute Anterior Shoulder Dislocation. 2022.' },
  { num: 10, text: 'Sayegh FE, et al. Reduction of acute anterior dislocations: a prospective randomized study comparing a new technique with the Hippocratic and Kocher methods. JBJS Am. 2009;91(12):2884-2891.' },
  { num: 11, text: 'McNamara RM. Reduction of anterior shoulder dislocations by scapular manipulation. Ann Emerg Med. 1993;22(7):1140-1144. PMID: 8517564' },
  { num: 12, text: 'Cunningham NJ. Techniques for reduction of anteroinferior shoulder dislocation. Emerg Med Australas. 2005;17(5-6):463-471. PMID: 29044033' },
  { num: 13, text: 'Garnavos C, et al. Comparison of Stimson and Milch techniques for closed reduction of anterior shoulder dislocation: a prospective randomized study. Injury. 2013;44(7):985-990. PMID: 22516569' },
  { num: 14, text: 'Whelan DB, et al. Immobilization in external rotation versus internal rotation after primary anterior shoulder dislocation: a meta-analysis. Am J Sports Med. 2016;44(2):521-532. PMC7297495' },
  { num: 15, text: 'Ardern CL, et al. 2022 Bern Consensus Statement on Shoulder Injury Prevention, Rehabilitation, and Return to Sport. JOSPT. 2022;52(1):11-28.' },
];

export const SHOULDER_DISLOCATION_NODE_COUNT = SHOULDER_DISLOCATION_NODES.length;
export const SHOULDER_DISLOCATION_MODULE_LABELS = ['Assessment', 'Imaging', 'Analgesia', 'Reduction', 'Post-Reduction', 'Disposition'];
