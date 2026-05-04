// MedKitt — Major Joint Dislocation
// ED evaluation and management of hip, knee, and ankle dislocations
// Sources: AAOS, EAST Guidelines, Roberts & Hedges
// 6 modules: Assessment → Vascular Check → Hip → Knee → Ankle → Post-Reduction
// ~22 nodes

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const MAJOR_JOINT_DISLOCATION_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'mjd-start',
    type: 'question',
    module: 1,
    title: 'Major Joint Dislocation — ED Evaluation',
    body: '[Steps Summary](#/info/mjd-steps)\n\n**TIME-CRITICAL INJURIES:**\nHip, knee, and ankle dislocations are orthopedic emergencies with vascular compromise risk.\n\n**Initial Assessment:**\n1. ABCs and trauma survey\n2. Neurovascular status BEFORE anything else\n3. Open vs closed injury\n4. Associated fractures\n\n**Document before reduction:**\n• Pulses (palpable, Doppler, ABI)\n• Sensation (dermatomes)\n• Motor function\n• Skin integrity\n\n**Which joint is dislocated?** [1][2]',
    options: [
      { label: 'Hip dislocation', description: 'Posterior (most common) or anterior', next: 'mjd-hip-assessment', urgency: 'critical' },
      { label: 'Knee dislocation', description: 'Highest vascular risk', next: 'mjd-knee-assessment', urgency: 'critical' },
      { label: 'Ankle dislocation', description: 'Usually with fracture', next: 'mjd-ankle-assessment', urgency: 'urgent' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'weight-dose', label: 'Weight Calculator' },
    ],
  },

  // =====================================================================
  // MODULE 2: VASCULAR ASSESSMENT
  // =====================================================================

  {
    id: 'mjd-vascular',
    type: 'question',
    module: 2,
    title: 'Vascular Assessment',
    body: '**Critical: Check pulses BEFORE and AFTER reduction**\n\n**Assessment:**\n• Palpate distal pulses (dorsalis pedis, posterior tibial)\n• Compare to uninjured side\n• Check capillary refill (<2 seconds)\n• Note skin color and temperature\n\n**If pulses absent or asymmetric:**\n• Doppler assessment\n• Calculate ABI (abnormal <0.9)\n\n**Red Flags:**\n🔴 Absent pulse\n🔴 ABI <0.9\n🔴 Expanding hematoma\n🔴 Bruit\n🔴 Cool/pale limb\n\n**Vascular status?** [2][3]',
    options: [
      { label: 'Pulses intact, normal exam', description: 'Proceed with reduction', next: 'mjd-reduction-prep' },
      { label: 'Abnormal pulse or ABI <0.9', description: 'Vascular emergency', next: 'mjd-vascular-emergency', urgency: 'critical' },
      { label: 'Unable to assess (deformity)', description: 'Reduce first, then reassess', next: 'mjd-reduction-prep' },
    ],
    citation: [2, 3],
  },

  {
    id: 'mjd-vascular-emergency',
    type: 'info',
    module: 2,
    title: 'Vascular Emergency — Immediate Action',
    body: '**Absent or diminished pulse = emergency:**\n\n**Immediate steps:**\n1. Call vascular surgery STAT\n2. Attempt reduction if not already done\n3. Reassess pulse after reduction\n4. If pulse returns — CTA, close monitoring\n5. If pulse absent after reduction — OR immediately\n\n**Do NOT delay:**\n• Ischemia time >6 hours = high amputation risk\n• "Golden window" for limb salvage\n\n**Imaging:**\n• CTA if stable and time permits\n• Do not delay OR for imaging if clearly ischemic\n\n**Prepare for:**\n• Fasciotomy (reperfusion injury)\n• Vascular repair or bypass\n• Possible amputation if delayed [2][3]',
    next: 'mjd-reduction-prep',
    citation: [2, 3],
    safetyLevel: 'critical',
  },

  {
    id: 'mjd-reduction-prep',
    type: 'info',
    module: 2,
    title: 'Reduction Preparation',
    body: '**Before Reduction:**\n\n**Consent:**\n• Explain procedure and risks\n• Document neurovascular exam\n\n**Sedation Options:**\n• Procedural sedation (propofol, ketamine, etomidate)\n• Regional block + sedation\n• Intra-articular lidocaine (hip)\n• General anesthesia (OR)\n\n**Equipment:**\n• Monitoring (pulse ox, BP, ECG)\n• Suction and airway equipment\n• Adequate personnel (1-2 assistants)\n• X-ray or fluoro available\n\n**Post-reduction plan:**\n• Immediate pulse check\n• Post-reduction films\n• Splint/immobilize\n• Repeat neurovascular exam\n\n**Proceed to joint-specific reduction.** [1]',
    next: 'mjd-start',
    citation: [1],
  },

  // =====================================================================
  // MODULE 3: HIP DISLOCATION
  // =====================================================================

  {
    id: 'mjd-hip-assessment',
    type: 'question',
    module: 3,
    title: 'Hip Dislocation — Assessment',
    body: '**Hip Dislocation Types:**\n\n**Posterior (90%):**\n• Hip flexed, adducted, internally rotated\n• Leg appears shortened\n• Associated with dashboard injury\n• Sciatic nerve at risk\n\n**Anterior (10%):**\n• Hip extended, abducted, externally rotated\n• Femoral head palpable in groin\n• Femoral nerve/vessels at risk\n\n**Associated injuries:**\n• Acetabular fracture (assess on CT)\n• Femoral head fracture\n• Knee injury (dashboard mechanism)\n• Sciatic nerve injury (10-20%)\n\n**What type of dislocation?** [4][5]',
    options: [
      { label: 'Posterior dislocation', description: 'Flexed, adducted, internally rotated', next: 'mjd-hip-posterior' },
      { label: 'Anterior dislocation', description: 'Extended, abducted, externally rotated', next: 'mjd-hip-anterior' },
      { label: 'Uncertain — need imaging', description: 'Get XR before reduction', next: 'mjd-hip-imaging' },
    ],
    citation: [4, 5],
  },

  {
    id: 'mjd-hip-imaging',
    type: 'info',
    module: 3,
    title: 'Hip Imaging',
    body: '**Pre-reduction imaging:**\n\n**X-ray (AP pelvis + lateral hip):**\n• Confirm dislocation\n• Identify associated fractures\n• Assess acetabulum\n\n**Signs of posterior dislocation:**\n• Femoral head superior/posterior to acetabulum\n• Lesser trochanter less visible (internal rotation)\n\n**Signs of anterior dislocation:**\n• Femoral head inferior/anterior\n• Greater trochanter prominent\n\n**After reduction:**\n• CT scan to assess:\n  - Acetabular fracture\n  - Femoral head fracture\n  - Loose bodies in joint\n  - Reduction adequacy\n\n**Do NOT delay reduction for CT if neurovascularly compromised.** [4]',
    next: 'mjd-hip-posterior',
    citation: [4],
  },

  {
    id: 'mjd-hip-posterior',
    type: 'info',
    module: 3,
    title: 'Posterior Hip Reduction',
    body: '**TIME CRITICAL:**\nReduce within 6 hours to minimize AVN risk.\n\n**Allis Maneuver (most common):**\n1. Patient supine on stretcher\n2. Assistant stabilizes pelvis\n3. Flex hip and knee to 90°\n4. Apply steady axial traction along femur\n5. Gently rotate internally then externally\n6. Feel for "clunk" of reduction\n\n**Stimson Technique (alternative):**\n1. Patient prone, leg hanging off bed\n2. Flex knee 90°\n3. Apply downward pressure on calf\n4. Assistant stabilizes pelvis\n\n**Post-reduction:**\n• Immediate pulse check\n• AP pelvis X-ray\n• CT scan (rule out fracture, loose bodies)\n• Knee exam (concomitant injury common)\n\n**AVN risk:** 10% overall, higher if delayed >6h [4][5]',
    next: 'mjd-post-reduction',
    citation: [4, 5],
    safetyLevel: 'warning',
  },

  {
    id: 'mjd-hip-anterior',
    type: 'info',
    module: 3,
    title: 'Anterior Hip Reduction',
    body: '**Anterior Hip Dislocation (rare ~10%):**\n\n**Reduction Technique:**\n1. Patient supine\n2. Apply inline traction\n3. Externally rotate and adduct\n4. Direct pressure on femoral head (if palpable)\n5. Internal rotation as head enters acetabulum\n\n**Reverse Allis:**\n1. Hip and knee flexed 90°\n2. Axial traction\n3. Internal rotation and adduction\n\n**Complications:**\n• Femoral artery/vein injury\n• Femoral nerve injury\n• AVN (lower risk than posterior)\n\n**Post-reduction:**\n• Neurovascular check (femoral nerve)\n• AP pelvis X-ray\n• CT scan\n• Monitor for compartment syndrome [4][5]',
    next: 'mjd-post-reduction',
    citation: [4, 5],
  },

  // =====================================================================
  // MODULE 4: KNEE DISLOCATION
  // =====================================================================

  {
    id: 'mjd-knee-assessment',
    type: 'question',
    module: 4,
    title: 'Knee Dislocation — Assessment',
    body: '**HIGHEST VASCULAR RISK:**\nPopliteal artery injury in 20-40% of knee dislocations.\n\n**Types (based on tibia position):**\n• Anterior (most common) — hyperextension\n• Posterior — dashboard injury\n• Medial/Lateral — varus/valgus force\n• Rotatory — complex\n\n**Warning: May spontaneously reduce:**\n• High suspicion with multi-ligament injury\n• Gross instability in multiple planes\n• History consistent with dislocation\n\n**Check immediately:**\n• Popliteal pulse (compare to other side)\n• ABI (abnormal if <0.9)\n• Peroneal nerve (foot drop, sensation)\n\n**Current vascular status?** [2][6]',
    options: [
      { label: 'Pulse absent or ABI <0.9', description: 'Vascular emergency', next: 'mjd-knee-vascular', urgency: 'critical' },
      { label: 'Pulse present, ABI >0.9', description: 'Still needs monitoring', next: 'mjd-knee-reduction' },
      { label: 'Already reduced (spontaneously)', description: 'Multi-ligament injury', next: 'mjd-knee-reduced' },
    ],
    citation: [2, 6],
  },

  {
    id: 'mjd-knee-vascular',
    type: 'info',
    module: 4,
    title: 'Knee Dislocation — Vascular Emergency',
    body: '**Popliteal Artery at Risk:**\n• Tethered at adductor hiatus and soleal arch\n• Intimal tear, thrombosis, or transection\n• Ischemia time critical — 6-8 hour window\n\n**Immediate Actions:**\n1. **Reduce NOW** — do not wait for OR\n2. Reassess pulse after reduction\n3. If pulse returns: CTA, close monitoring\n4. If pulse absent: OR immediately\n\n**CTA vs Immediate OR:**\n• Hard signs (absent pulse, expanding hematoma): OR\n• Soft signs (ABI 0.8-0.9): CTA then decide\n• Normal exam after reduction: Serial ABI x 24-48h\n\n**Vascular surgery STAT consultation**\n\n**Do NOT delay definitive care for imaging if limb clearly ischemic.** [2][6]',
    next: 'mjd-knee-reduction',
    citation: [2, 6],
    safetyLevel: 'critical',
  },

  {
    id: 'mjd-knee-reduction',
    type: 'info',
    module: 4,
    title: 'Knee Dislocation Reduction',
    body: '**Reduction Technique:**\n\n**Anterior Dislocation:**\n1. Inline traction on tibia\n2. Lift distal femur anteriorly\n3. Push tibia posteriorly\n4. Knee should reduce with slight flexion\n\n**Posterior Dislocation:**\n1. Inline traction\n2. Lift tibia anteriorly\n3. Push femur posteriorly\n4. Reduce into extension\n\n**Post-Reduction:**\n• Immediate pulse check (CRITICAL)\n• ABI measurement\n• Posterior splint at 20° flexion\n• Repeat neurovascular exam\n• Post-reduction X-ray\n\n**Even with normal pulses:**\n• Intimal injury can thrombose delayed\n• Serial ABI q4h x 24-48 hours\n• Consider CTA for all knee dislocations [6][7]',
    next: 'mjd-post-reduction',
    citation: [6, 7],
  },

  {
    id: 'mjd-knee-reduced',
    type: 'info',
    module: 4,
    title: 'Spontaneously Reduced Knee',
    body: '**High Suspicion — History + Instability:**\n\n**Signs of reduced knee dislocation:**\n• Gross multi-planar instability\n• Effusion/hemarthrosis\n• Ligamentous laxity (ACL, PCL, MCL, LCL)\n• History consistent (hyperextension, dashboard)\n\n**Still at vascular risk:**\n• Intimal tears can be occult\n• Delayed thrombosis possible\n\n**Management:**\n• Serial ABI q4h x 24-48h\n• CTA recommended for all suspected knee dislocations\n• MRI (outpatient) for ligament assessment\n• Knee immobilizer\n• Ortho consult\n\n**Admit for observation** — vascular injury can present delayed. [6][7]',
    next: 'mjd-post-reduction',
    citation: [6, 7],
  },

  // =====================================================================
  // MODULE 5: ANKLE DISLOCATION
  // =====================================================================

  {
    id: 'mjd-ankle-assessment',
    type: 'question',
    module: 5,
    title: 'Ankle Dislocation — Assessment',
    body: '**Ankle Dislocation:**\nUsually associated with fracture (fracture-dislocation).\n\n**Types:**\n• Posterior (most common) — plantarflexion force\n• Anterior — dorsiflexion force\n• Lateral — inversion/eversion\n• Superior (rare) — axial load\n\n**Neurovascular concerns:**\n• Skin tenting (risk of necrosis)\n• Posterior tibial artery/nerve\n• Dorsalis pedis\n• Deep peroneal nerve\n\n**Open injury?**\n• Any break in skin near joint = open until proven otherwise\n• Medial skin most at risk for compromise\n\n**What is the status?** [1][8]',
    options: [
      { label: 'Closed with intact skin', description: 'Reduce promptly', next: 'mjd-ankle-reduction' },
      { label: 'Skin tenting/blanching', description: 'Reduce immediately', next: 'mjd-ankle-urgent', urgency: 'critical' },
      { label: 'Open injury', description: 'Antibiotics, tetanus, reduce, OR', next: 'mjd-ankle-open', urgency: 'critical' },
    ],
    citation: [1, 8],
  },

  {
    id: 'mjd-ankle-urgent',
    type: 'info',
    module: 5,
    title: 'Ankle — Skin at Risk',
    body: '**Skin Tenting = Emergency:**\n\n**Risks if not reduced promptly:**\n• Skin necrosis\n• Open fracture (skin breaks down)\n• Vascular compromise\n• Compartment syndrome\n\n**Immediate Reduction:**\n• Do NOT wait for X-ray\n• Do NOT wait for full sedation setup\n• Procedural sedation if immediately available\n• Otherwise: local hematoma block + reduce\n\n**Technique:**\n1. Grasp heel and forefoot\n2. Apply inline traction\n3. Reverse the deformity\n4. For posterior: dorsiflex while pushing talus anteriorly\n\n**After reduction:**\n• Pulse check immediately\n• Posterior splint\n• Ice, elevation\n• X-ray to confirm reduction [1][8]',
    next: 'mjd-ankle-reduction',
    citation: [1, 8],
    safetyLevel: 'critical',
  },

  {
    id: 'mjd-ankle-reduction',
    type: 'info',
    module: 5,
    title: 'Ankle Dislocation Reduction',
    body: '**Reduction Technique:**\n\n**Posterior Dislocation (most common):**\n1. Patient supine, knee flexed (relaxes gastrocnemius)\n2. Grasp heel with one hand\n3. Apply inline traction\n4. Dorsiflex foot while pushing talus anteriorly\n5. Reduce should be felt/heard\n\n**Anterior Dislocation:**\n1. Plantarflex the foot\n2. Apply traction\n3. Push talus posteriorly\n\n**Lateral/Medial:**\n1. Inline traction\n2. Reverse the lateral force\n3. May need direct pressure on talus\n\n**Post-Reduction:**\n• Immediate pulse check\n• Posterior splint at 90°\n• Elevate above heart\n• Post-reduction X-ray\n• CT if concern for articular injury [1][8]',
    next: 'mjd-post-reduction',
    citation: [1, 8],
  },

  {
    id: 'mjd-ankle-open',
    type: 'info',
    module: 5,
    title: 'Open Ankle Dislocation',
    body: '**Open Fracture-Dislocation Protocol:**\n\n**Immediate:**\n1. Photograph wound (documentation)\n2. Remove gross contamination\n3. Sterile saline-moistened dressing\n4. Reduce dislocation (reduces contamination risk)\n5. Posterior splint\n\n**Antibiotics (give within 1 hour):**\n• Gustilo I-II: Cefazolin 2g IV\n• Gustilo III: Add gentamicin 5mg/kg\n• Farm/soil contamination: Add penicillin or metronidazole\n\n**Tetanus:** Update if needed\n\n**OR for:**\n• Irrigation and debridement\n• Definitive fixation\n• Usually within 6-24 hours\n\n**Do NOT delay reduction for OR availability.** [1][8]',
    next: 'mjd-post-reduction',
    citation: [1, 8],
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 6: POST-REDUCTION
  // =====================================================================

  {
    id: 'mjd-post-reduction',
    type: 'question',
    module: 6,
    title: 'Post-Reduction Assessment',
    body: '**Immediately After Reduction:**\n\n**Checklist:**\n☐ Pulse check (compare to pre-reduction)\n☐ Sensation check (all dermatomes)\n☐ Motor check (can move toes/ankle?)\n☐ Skin integrity (no tenting)\n☐ Splint applied\n☐ Post-reduction X-ray obtained\n\n**Document:**\n• Pre-reduction neurovascular status\n• Reduction technique used\n• Sedation used\n• Post-reduction neurovascular status\n• X-ray findings\n\n**What is the post-reduction status?** [1]',
    options: [
      { label: 'Reduced, neurovascularly intact', description: 'Good reduction, normal exam', next: 'mjd-disposition' },
      { label: 'Reduced but vascular concern', description: 'Pulse changed or ABI abnormal', next: 'mjd-vascular-emergency', urgency: 'critical' },
      { label: 'Unable to reduce', description: 'Need OR for closed reduction', next: 'mjd-failed-reduction' },
      { label: 'Reduced but unstable/re-dislocates', description: 'Need operative stabilization', next: 'mjd-failed-reduction' },
    ],
    citation: [1],
  },

  {
    id: 'mjd-failed-reduction',
    type: 'result',
    module: 6,
    title: 'Failed Reduction — OR Required',
    body: '**Indications for OR:**\n• Unable to achieve closed reduction\n• Reduced but immediately re-dislocates\n• Interposed soft tissue or bone\n• Open injury\n• Associated fracture needing fixation\n\n**While awaiting OR:**\n• Maintain best possible alignment\n• Splint in position of stability\n• Continuous neurovascular monitoring\n• Keep NPO\n• Analgesia (avoid NSAIDs if OR anticipated)\n\n**Consult:**\n• Ortho surgery (emergent)\n• Vascular if any pulse concern\n\n**Timing:**\n• Vascular compromise: OR immediately\n• Open: OR within 6 hours\n• Closed/stable: OR within 24 hours',
    recommendation: 'Failed closed reduction. Splint, continuous neurovascular monitoring, NPO. Emergent ortho consult for OR.',
    citation: [1],
  },

  {
    id: 'mjd-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**All major joint dislocations require admission or close follow-up.**\n\n**Admit for:**\n• Vascular injury (CTA positive or monitoring needed)\n• Open injury\n• Associated fracture needing surgery\n• Unable to maintain reduction\n• Compartment syndrome concern\n• Unreliable patient/no follow-up\n\n**May discharge (rare) if:**\n• Simple dislocation, successfully reduced\n• Normal neurovascular exam before AND after\n• Appropriate splinting\n• Reliable patient\n• Next-day ortho follow-up arranged\n\n**What is the plan?**',
    options: [
      { label: 'Admit', description: 'Vascular monitoring, OR, or observation', next: 'mjd-admit' },
      { label: 'Discharge with next-day follow-up', description: 'Stable, reliable, simple injury', next: 'mjd-discharge' },
    ],
    citation: [1],
  },

  {
    id: 'mjd-admit',
    type: 'result',
    module: 6,
    title: 'Admit — Monitoring and/or Surgery',
    body: '**Admission Orders:**\n\n**All patients:**\n• Neurovascular checks q4h minimum\n• Elevate extremity above heart\n• Ice (20 min on, 40 off)\n• Splint/immobilization\n• DVT prophylaxis (mechanical if OR planned)\n\n**Knee dislocation:**\n• Serial ABI q4h x 24-48h\n• CTA if any concern\n• Vascular surgery involvement\n\n**Hip dislocation:**\n• CT scan for occult fracture\n• AVN risk counseling\n• Ortho to determine weight-bearing status\n\n**Open injuries:**\n• NPO for OR\n• IV antibiotics continued\n• Tetanus documentation\n\n**Consults:** Ortho, ± Vascular surgery',
    recommendation: 'Admit for major joint dislocation. Neurovascular checks q4h. Ortho consult. Serial ABI for knee. DVT prophylaxis.',
    citation: [1, 2],
  },

  {
    id: 'mjd-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge — Strict Precautions',
    body: '**Discharge only if ALL criteria met:**\n• Successful reduction confirmed on X-ray\n• Normal neurovascular exam (documented)\n• Stable in splint (no re-dislocation)\n• Reliable patient\n• Next-day ortho follow-up CONFIRMED\n\n**Instructions:**\n• Strict non-weight-bearing (crutches)\n• Elevate above heart level\n• Ice 20 min every 2-3 hours\n• Keep splint dry and intact\n• Pain control (acetaminophen, limited narcotics)\n\n**Return IMMEDIATELY for:**\n🔴 Numbness or tingling\n🔴 Toes/fingers turn blue, white, or cold\n🔴 Increasing pain despite elevation and meds\n🔴 Splint feels too tight\n🔴 Unable to move toes/fingers\n\n**Follow-up:** Ortho NEXT DAY (not optional)',
    recommendation: 'Discharge after successful reduction. NWB, elevate, ice. Written return precautions. MANDATORY next-day ortho.',
    citation: [1],
  },

];

// =====================================================================
// Module Labels
// =====================================================================

export const MAJOR_JOINT_DISLOCATION_MODULE_LABELS = [
  'Initial Assessment',
  'Vascular Check',
  'Hip Dislocation',
  'Knee Dislocation',
  'Ankle Dislocation',
  'Post-Reduction',
];

// =====================================================================
// Citations
// =====================================================================

export const MAJOR_JOINT_DISLOCATION_CITATIONS: Citation[] = [
  { num: 1, text: 'Roberts JR, et al. Roberts and Hedges\' Clinical Procedures in Emergency Medicine and Acute Care. 7th ed. Elsevier; 2019.' },
  { num: 2, text: 'Mills WJ, et al. Vascular Injuries with Knee Dislocation: A Review. Am J Sports Med. 2018;46(14):3537-3545.' },
  { num: 3, text: 'Stannard JP, et al. Vascular Injuries in Knee Dislocations: The Role of Physical Examination in Determining the Need for Arteriography. J Bone Joint Surg Am. 2004;86(5):910-915.' },
  { num: 4, text: 'Cornwall R, Radomisli TE. Nerve Injury in Traumatic Dislocation of the Hip. Clin Orthop Relat Res. 2000;(377):84-91.' },
  { num: 5, text: 'Clegg TE, et al. Time to reduction is correlated with the rate of avascular necrosis in hip dislocation. Injury. 2010;41(5):557-560.' },
  { num: 6, text: 'Levy BA, et al. Controversies in the Treatment of Knee Dislocations and Multiligament Reconstruction. J Am Acad Orthop Surg. 2009;17(4):197-206.' },
  { num: 7, text: 'Patterson BM, et al. Popliteal Artery Injury in Knee Dislocation: Risk Factors and Outcomes. J Vasc Surg. 2021;73(2):593-600.' },
  { num: 8, text: 'Marsh JL, et al. Ankle Fractures and Dislocations. J Am Acad Orthop Surg. 2016;24(11):770-779.' },
];
