// MedKitt - Emergency Joint Arthrocentesis
// Bedside procedure support: indication, safe tap, specimen handling, fluid interpretation.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const JOINT_ARTHROCENTESIS_NODES: DecisionNode[] = [
  {
    id: 'arth-start',
    type: 'info',
    module: 1,
    title: 'Emergency Joint Arthrocentesis',
    body: 'Use this for ED aspiration of an acutely painful/swollen joint when infection, crystal arthritis, hemarthrosis, or diagnostic uncertainty is clinically important.\n\nOpen first:\n- [Tap Steps](#/info/arth-steps)\n- [Contraindications](#/info/arth-contra)\n- [Knee Tap Technique](#/info/arth-tap)\n- [Fluid Interpretation](#/info/arth-fluid)\n- [Stop / Escalate](#/info/arth-stop)',
    citation: [1, 2, 3],
    images: [
      {
        src: 'images/joint-arthrocentesis/knee-effusion-annotated.jpg',
        alt: 'Annotated knee effusion radiograph',
        caption: 'Knee effusion supports the need for aspiration when septic arthritis is possible. Wikimedia Commons, CC0.',
      },
    ],
    next: 'arth-indication',
    summary: 'Tap suspected septic joint or unclear acute effusion; interpret fluid at bedside.',
    safetyLevel: 'warning',
  },
  {
    id: 'arth-indication',
    type: 'question',
    module: 1,
    title: 'Is Aspiration Indicated?',
    body: 'Do not rely on fever, serum WBC, ESR, or CRP alone to exclude septic arthritis.',
    options: [
      {
        label: 'Tap needed',
        description: 'Acute monoarthritis, hot/swollen joint, immunocompromise, prosthetic joint concern, or unclear effusion',
        next: 'arth-contra-screen',
        urgency: 'urgent',
      },
      {
        label: 'No tap now',
        description: 'No effusion, clear nonarticular cause, or needs image-guided/specialist pathway',
        next: 'arth-stop',
      },
    ],
    citation: [1, 2, 3],
    summary: 'Septic arthritis remains a clinical diagnosis until synovial fluid is evaluated.',
  },
  {
    id: 'arth-contra-screen',
    type: 'info',
    module: 1,
    title: 'Contraindication Screen',
    body: 'Avoid passing through overlying cellulitis/abscess when an alternate route or specialist/image-guided approach is feasible.\n\nRelative cautions: anticoagulation/coagulopathy, prosthetic joint, small/deep joint, difficult anatomy, and inability to keep sterile field. Do not withhold a clinically urgent diagnostic tap solely for abnormal coagulation labs without weighing septic joint risk.',
    citation: [1, 2, 4],
    next: 'arth-joint-choice',
    summary: 'Screen route, infection over skin, prosthetic joint, anticoagulation, and anatomy.',
  },
  {
    id: 'arth-joint-choice',
    type: 'question',
    module: 2,
    title: 'Which Joint / Approach?',
    body: 'Use the safest route with the highest likelihood of obtaining fluid.',
    options: [
      {
        label: 'Knee / large accessible joint',
        description: 'Proceed with sterile landmark or ultrasound-assisted aspiration',
        next: 'arth-knee-technique',
        urgency: 'urgent',
      },
      {
        label: 'Hip, shoulder, small/deep joint, prosthetic joint',
        description: 'Consider ultrasound guidance, radiology, orthopedics, or proceduralist support',
        next: 'arth-image-guided',
        urgency: 'urgent',
      },
    ],
    citation: [1, 2, 4],
    summary: 'Large accessible joints can often be tapped in the ED; deep/prosthetic joints need help.',
  },
  {
    id: 'arth-knee-technique',
    type: 'info',
    module: 2,
    title: 'Knee Tap: Simple ED Technique',
    body: 'Technique:\n1. Position knee slightly flexed or extended with support.\n2. Prep widely and maintain sterile field.\n3. Use local [Lidocaine](#/drug/lidocaine/local-anesthesia) without injecting into the joint if avoidable.\n4. Common route: superolateral or lateral approach into suprapatellar recess.\n5. Aspirate gently; redirect only after withdrawing to safe tissue plane.\n6. Stop if patient has severe pain, paresthesia, or no safe trajectory.',
    citation: [1, 2],
    next: 'arth-specimen',
    summary: 'Sterile large-joint tap: position, local anesthesia, safe trajectory, gentle aspiration.',
  },
  {
    id: 'arth-image-guided',
    type: 'info',
    module: 2,
    title: 'Image-Guided / Specialist Route',
    body: 'Use ultrasound to confirm effusion and needle path when anatomy is unclear, effusion is small, or prior attempt failed.\n\nEscalate early for hip aspiration, prosthetic joint aspiration, small/deep joints, overlying infection blocking safe route, or anticipated need for operative washout.',
    citation: [2, 4],
    next: 'arth-specimen',
    summary: 'Use ultrasound or specialist pathway for deep, prosthetic, small, or difficult joints.',
  },
  {
    id: 'arth-specimen',
    type: 'info',
    module: 3,
    title: 'Send The Fluid Correctly',
    body: 'Prioritize tests:\n1. Gram stain and culture\n2. Cell count with differential\n3. Crystal analysis\n4. Glucose/protein only if local practice uses them\n\nIf fluid volume is limited, culture and cell count usually matter most. Blood cultures are recommended when septic arthritis is possible.',
    citation: [1, 2, 3],
    images: [
      {
        src: 'images/joint-arthrocentesis/septic-joint-fluid.jpg',
        alt: 'Cloudy purulent synovial fluid aspirated from septic arthritis',
        caption: 'Purulent synovial fluid is concerning for septic arthritis. Wikimedia Commons, CC BY-SA 4.0.',
      },
    ],
    next: 'arth-fluid-appearance',
    summary: 'Culture, cell count/differential, and crystals are the core ED synovial tests.',
  },
  {
    id: 'arth-fluid-appearance',
    type: 'question',
    module: 4,
    title: 'How Does The Fluid / Result Read?',
    body: 'Do not let crystals falsely reassure you; crystal arthritis and infection can coexist.',
    options: [
      {
        label: 'Purulent / Gram stain positive / very inflammatory',
        description: 'Treat as septic arthritis while cultures and disposition proceed',
        next: 'arth-septic',
        urgency: 'critical',
      },
      {
        label: 'Crystals present',
        description: 'Treat crystal disease but still consider infection if risk or inflammatory fluid',
        next: 'arth-crystal',
        urgency: 'urgent',
      },
      {
        label: 'Bloody fluid',
        description: 'Traumatic tap, hemarthrosis, anticoagulation, fracture, tumor, or internal derangement',
        next: 'arth-bloody',
      },
      {
        label: 'Noninflammatory / low concern',
        description: 'Reassess for nonarticular pain, OA flare, trauma, or referred pain',
        next: 'arth-noninflammatory',
      },
    ],
    citation: [1, 2, 3],
    summary: 'Interpret fluid by infection risk, appearance, WBC/PMN, Gram stain, culture, crystals, and blood.',
  },
  {
    id: 'arth-septic',
    type: 'result',
    module: 5,
    title: 'Septic Arthritis Pathway',
    body: 'If septic arthritis is possible, obtain blood cultures when feasible, start empiric antibiotics after cultures/aspiration when this does not dangerously delay care, consult orthopedics, and admit.\n\nNeedle aspiration is diagnostic; definitive management often requires serial aspiration or operative washout depending on joint and severity.',
    recommendation: 'Treat septic arthritis as time-sensitive joint-threatening infection.',
    confidence: 'recommended',
    citation: [1, 3, 5],
    summary: 'Culture, antibiotics, orthopedic consultation, admission, and source control planning.',
    safetyLevel: 'critical',
  },
  {
    id: 'arth-crystal',
    type: 'result',
    module: 5,
    title: 'Crystal Arthritis Result',
    body: 'Crystals support gout or CPPD, but infection is not excluded when fever, immunocompromise, bacteremia risk, prosthetic joint, severe pain, or highly inflammatory fluid is present.\n\nIf the clinical story is low risk for infection, treat crystal arthritis and arrange follow-up.',
    recommendation: 'Treat crystals, but continue septic arthritis pathway if infection risk remains.',
    confidence: 'recommended',
    citation: [1, 2, 3],
    summary: 'Crystals do not exclude infection.',
  },
  {
    id: 'arth-bloody',
    type: 'result',
    module: 5,
    title: 'Bloody Fluid / Hemarthrosis',
    body: 'Bloody aspirate suggests hemarthrosis or traumatic tap. Reassess trauma, anticoagulation, fracture, ligament injury, and need for imaging or specialist input.\n\nAvoid repeated traumatic passes when diagnostic yield is low.',
    recommendation: 'Use history, imaging, anticoagulation status, and exam to determine disposition.',
    confidence: 'consider',
    citation: [1, 2],
    summary: 'Bloody fluid requires trauma/anticoagulation/fracture reassessment.',
  },
  {
    id: 'arth-noninflammatory',
    type: 'result',
    module: 5,
    title: 'Low-Inflammation Fluid',
    body: 'Low-inflammatory fluid lowers concern for septic arthritis but does not replace clinical judgment.\n\nReassess for osteoarthritis flare, trauma/internal derangement, bursitis, cellulitis, radiculopathy, or referred pain.',
    recommendation: 'Disposition depends on exam, culture plan, pain control, function, and follow-up reliability.',
    confidence: 'consider',
    citation: [1, 2],
    summary: 'Low-inflammatory fluid should prompt a broader noninfectious differential.',
  },
  {
    id: 'arth-stop',
    type: 'result',
    module: 5,
    title: 'Stop / Escalate',
    body: 'Stop blind ED arthrocentesis and escalate when there is no safe route, overlying infection blocks all approaches, prosthetic/deep joint requires specialty pathway, patient cannot cooperate safely, or prior attempt caused severe pain/paresthesia.\n\nDo not delay antibiotics for a dangerous infection while waiting for an impossible tap.',
    recommendation: 'Escalate to ultrasound guidance, radiology, orthopedics, or empiric treatment when the tap is unsafe or not feasible.',
    confidence: 'recommended',
    citation: [1, 2, 5],
    summary: 'Unsafe route, deep/prosthetic joint, or failed attempt requires escalation.',
    safetyLevel: 'warning',
  },
];

export const JOINT_ARTHROCENTESIS_CRITICAL_ACTIONS = [
  { text: 'Tap acute monoarthritis when septic arthritis is clinically possible.', nodeId: 'arth-indication' },
  { text: 'Avoid passing through overlying cellulitis/abscess if another route is feasible.', nodeId: 'arth-contra-screen' },
  { text: 'Send culture, cell count/differential, and crystal analysis.', nodeId: 'arth-specimen' },
  { text: 'Crystals do not exclude infection.', nodeId: 'arth-fluid-appearance' },
  { text: 'Consult orthopedics/admit when septic arthritis remains possible.', nodeId: 'arth-septic' },
];

export const JOINT_ARTHROCENTESIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Margaretten ME, Kohlwes J, Moore D, Bent S. Does this adult patient have septic arthritis? JAMA. 2007;297(13):1478-1488.' },
  { num: 2, text: 'Horowitz DL, Katzap E, Horowitz S, Barilla-LaBarca ML. Approach to septic arthritis. Am Fam Physician. 2011;84(6):653-660.' },
  { num: 3, text: 'Shirtliff ME, Mader JT. Acute septic arthritis. Clin Microbiol Rev. 2002;15(4):527-544.' },
  { num: 4, text: 'Sibbitt WL Jr, Band PA, Kettwich LG, et al. A randomized controlled trial evaluating ultrasound-guided arthrocentesis. J Rheumatol. 2009;36(8):1891-1900.' },
  { num: 5, text: 'Ross JJ. Septic arthritis of native joints. Infect Dis Clin North Am. 2017;31(2):203-218.' },
];

export const JOINT_ARTHROCENTESIS_NODE_COUNT = JOINT_ARTHROCENTESIS_NODES.length;
export const JOINT_ARTHROCENTESIS_MODULE_LABELS = ['Indication', 'Approach', 'Specimen', 'Interpret', 'Disposition'];
