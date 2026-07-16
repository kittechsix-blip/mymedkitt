// MedKitt — Atraumatic Hip Pain / Unable to Bear Weight Hub (Rule-In / Rule-Out Engine, type: 'hub')
//
// 5-Module rule-in/rule-out skeleton (matches dyspnea-hub / abdominal-pain-hub template
// codified in CLAUDE.md "Chief-Complaint Hub Template"):
//   1. Sick Check
//   2. Rule In / Rule Out — per-differential chains: entry -> gate(s) -> verdict
//      (excluded verdicts loop back to hip-triage; confirmed verdicts link out to deep-dive)
//   3. Initial bundle / Reassess
//   4. Imaging
//   5. Disposition
//
// EBM-only citations. The decision instrument (Kocher criteria for septic vs transient hip;
// qSOFA for the toxic patient) lives in the bottom toolbar and is named in the nodes.
// Consult gaps handled as plain-text result nodes: SCFE, AVN of femoral head,
// occult / insufficiency hip fracture.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const HIP_PAIN_HUB_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Sick Check
  // ============================================================
  {
    id: 'hip-start',
    type: 'info',
    module: 1,
    title: 'Atraumatic Hip Pain — Sick Check First',
    body: '**\u26A0\uFE0F 4 DO NOT MISS:**\n1. **Septic arthritis of the hip** \u2014 fever + can\u2019t bear weight + resisted / painful ROM; arthrocentesis is the gold standard. A destroyed joint in <24 h.\n2. **Necrotizing soft-tissue infection / iliopsoas abscess** \u2014 pain out of proportion, systemic toxicity, skin changes, immunocompromise.\n3. **Occult / insufficiency hip fracture** \u2014 elderly, groin pain, unable to weight-bear, **normal X-ray** \u2192 needs CT/MRI.\n4. **SCFE** in the adolescent \u2014 the "knee/thigh pain" trap; a missed slip ends in avascular necrosis.\n\n**First 60 seconds:**\n- **Vitals** \u2014 fever, tachycardia, hypotension (septic joint / nec-fasc / abscess can be toxic).\n- **Weight-bearing** \u2014 can they bear weight at all? Complete inability is a red flag.\n- **The position** \u2014 a septic hip is held flexed, abducted, externally rotated; any passive ROM is exquisitely painful.\n- **Age anchor** \u2014 age drives the differential: child (transient synovitis vs septic vs osteomyelitis), adolescent (SCFE), adult (AVN, infection), elderly (occult fracture, OA, mets).\n- **The 4 screening questions:** (1) Fever or feeling systemically unwell? (2) Can you put weight on it? (3) Age + risk factors (steroids, alcohol, sickle cell, immunocompromise, cancer)? (4) Is the pain actually referred to the knee/thigh (SCFE / hip pathology)?\n\n**If ANY of:** fever + can\u2019t-weight-bear, toxic vitals, or systemic toxicity \u2014 **treat as septic hip / deep infection until proven otherwise**: labs (CBC, ESR, CRP, lactate, blood cultures), analgesia, and emergent arthrocentesis / imaging in parallel. Use **qSOFA** (toolbar) to flag sepsis.\n\n**If well-appearing + afebrile:** go to Rule In / Rule Out.',
    citation: [1, 2],
    next: 'hip-triage',
    summary: 'Sick check + vitals + weight-bearing + age anchor + 4-question screen. Fever + can\u2019t-weight-bear = septic hip until proven.',
    safetyLevel: 'critical',
  },

  // ============================================================
  // Module 2 — Rule In / Rule Out
  // ============================================================
  {
    id: 'hip-triage',
    type: 'question',
    module: 2,
    title: 'Rule In / Rule Out — Pick the Differential',
    body: 'Work the dangerous causes to an explicit verdict, one at a time. Age anchors the differential. Each branch walks its gate (score, exam, or imaging) to **excluded**, **test further**, or **rule in + treat**. Excluded loops back here for the next differential.',
    options: [
      { label: 'Septic arthritis of the hip', description: 'Fever + can\u2019t-weight-bear + painful ROM; Kocher criteria', next: 'hip-septic-entry', urgency: 'critical' },
      { label: 'Necrotizing infection / iliopsoas abscess', description: 'Pain out of proportion, toxicity, immunocompromise', next: 'hip-necfasc-entry', urgency: 'critical' },
      { label: 'SCFE (adolescent 8-15)', description: 'Obese teen, knee/thigh pain trap, out-toeing', next: 'hip-scfe-entry', urgency: 'urgent' },
      { label: 'Avascular necrosis of femoral head', description: 'Steroids / alcohol / sickle cell; X-ray may be normal', next: 'hip-avn-entry', urgency: 'urgent' },
      { label: 'Occult / insufficiency hip fracture', description: 'Elderly, groin pain, can\u2019t-weight-bear, normal X-ray', next: 'hip-occult-entry', urgency: 'urgent' },
      { label: 'Pediatric limping child', description: 'Osteomyelitis / transient synovitis in a child', next: 'hip-peds-entry', urgency: 'urgent' },
      { label: 'OA / GTPS / bursitis (mechanical)', description: 'Chronic, mechanical, well-appearing', next: 'hip-mech-entry', urgency: 'routine' },
      { label: 'None fit \u2014 undifferentiated, stable', description: 'Initial bundle + reassess', next: 'hip-rescue' },
    ],
    citation: [1, 2],
    summary: 'Age-anchored; pick the most acute differential and walk its gate to a verdict. Excluded loops back.',
    safetyLevel: 'critical',
  },

  // -------------------- SEPTIC ARTHRITIS --------------------
  {
    id: 'hip-septic-entry',
    type: 'question',
    module: 2,
    title: 'Septic Hip — Kocher / Arthrocentesis Gate',
    body: 'Fever + inability to bear weight + an ESR/CRP and WBC bump + a painful, guarded hip is septic arthritis until synovial fluid says otherwise. **Kocher criteria** (fever >38.5, non-weight-bearing, ESR >40, WBC >12k) risk-stratify a pediatric hip \u2014 open it in the toolbar. **Synovial fluid analysis is the gold standard** (WBC often >50k with PMN predominance, Gram stain, culture, crystals). A hip usually needs image-guided (US/fluoro) aspiration.',
    options: [
      { label: 'High Kocher score / synovial fluid consistent with infection, or high clinical suspicion', description: 'Treat as septic joint', next: 'hip-septic-verdict', urgency: 'critical' },
      { label: 'Low Kocher, benign fluid, afebrile, weight-bearing', description: 'Septic hip unlikely \u2014 move on', next: 'hip-septic-excluded', urgency: 'routine' },
    ],
    citation: [3],
    summary: 'Kocher risk-stratifies; synovial fluid is gold standard. High suspicion or infected fluid = treat as septic joint.',
    safetyLevel: 'critical',
  },
  {
    id: 'hip-septic-verdict',
    type: 'result',
    module: 2,
    title: 'Septic Hip — Aspirate + Treat',
    body: 'Open [Septic Arthritis](#/tree/septic-arthritis); for the aspiration technique use [Joint Arthrocentesis](#/tree/joint-arthrocentesis).\n\n**Next steps:**\n- **Arthrocentesis before antibiotics if achievable without delay** (a hip usually needs US/fluoroscopic guidance) \u2014 but do NOT delay antibiotics in a septic-looking patient.\n- Blood cultures \u00D7 2, CBC, ESR, CRP, lactate.\n- **Empiric IV antibiotics:** vancomycin (MRSA coverage) + an antipseudomonal / gram-negative agent (e.g., ceftriaxone, or cefepime if at-risk); tailor to Gram stain and host.\n- **Emergent orthopedic consult** \u2014 a septic hip is a surgical emergency needing urgent washout / drainage; the joint is destroyed within ~24-48 h untreated.\n- Analgesia, IV fluids; resuscitate if septic (qSOFA / sepsis pathway).',
    recommendation: 'Image-guided arthrocentesis, blood cultures, empiric vancomycin + gram-negative coverage, EMERGENT ortho for washout. Do not delay abx in a septic-looking patient.',
    citation: [3],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'hip-septic-excluded',
    type: 'result',
    module: 2,
    title: 'Septic Hip — Excluded / Low Probability',
    body: 'An afebrile, weight-bearing patient with a low Kocher score and benign synovial fluid (if sampled) makes a septic hip unlikely. **Transient synovitis is the main mimic in children** \u2014 but it is a diagnosis of exclusion; if the child cannot bear weight or has any inflammatory markers, do not clear the hip without imaging \u00B1 aspiration and orthopedic input.\n\nReturn to the hub for the next differential.',
    recommendation: 'Septic hip unlikely with benign markers / fluid; transient synovitis is a diagnosis of exclusion \u2014 reassess and aspirate if any doubt.',
    citation: [3],
    next: 'hip-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- NEC-FASC / ILIOPSOAS ABSCESS --------------------
  {
    id: 'hip-necfasc-entry',
    type: 'question',
    module: 2,
    title: 'Necrotizing Infection / Iliopsoas Abscess — Toxicity Gate',
    body: '**Pain out of proportion to exam + systemic toxicity** is the alarm. Necrotizing soft-tissue infection (rapidly spreading, skin changes, crepitus, bullae) and iliopsoas / deep-space abscess (fever, flexed hip, positive psoas sign, back/flank pain) both masquerade as "hip pain." Immunocompromise, diabetes, IVDU, and recent instrumentation raise the risk.',
    options: [
      { label: 'Pain out of proportion + toxicity / skin changes / psoas sign', description: 'Image + surgery / source control now', next: 'hip-necfasc-verdict', urgency: 'critical' },
      { label: 'No toxicity, benign soft tissue, localized joint pain', description: 'Deep infection unlikely \u2014 move on', next: 'hip-necfasc-excluded', urgency: 'routine' },
    ],
    citation: [4],
    summary: 'Pain out of proportion + toxicity = nec-fasc / abscess; image + surgery. No toxicity = unlikely.',
    safetyLevel: 'critical',
  },
  {
    id: 'hip-necfasc-verdict',
    type: 'result',
    module: 2,
    title: 'Deep Infection — Resuscitate + Source Control',
    body: '**Necrotizing soft-tissue infection:** open [Necrotizing Fasciitis](#/tree/necrotizing-fasciitis) \u2014 this is a surgical emergency. **Do NOT wait for imaging to consult surgery** if the exam is convincing; broad-spectrum antibiotics (vancomycin + piperacillin-tazobactam + clindamycin for toxin suppression), aggressive resuscitation, emergent operative debridement.\n\n**Iliopsoas / deep abscess:** CT abdomen/pelvis with contrast; broad-spectrum antibiotics; IR or surgical drainage; identify the source (spine, bowel, GU, hematogenous).\n\n**Also on the differential:** a pathologic fracture or bony metastasis presenting as hip pain \u2192 [Oncological Emergencies](#/tree/oncological-emergencies) (check for a lytic lesion, hypercalcemia, cord/cauda features).',
    recommendation: 'Nec-fasc = emergent surgery + broad abx (do not wait for imaging). Abscess = CT + drainage. Consider pathologic fracture / mets.',
    citation: [4],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'hip-necfasc-excluded',
    type: 'result',
    module: 2,
    title: 'Deep Infection — Unlikely',
    body: 'No systemic toxicity, benign overlying soft tissue, and localized joint-pattern pain makes a necrotizing infection or deep abscess unlikely right now. **These evolve fast** \u2014 if toxicity, spreading erythema, crepitus, or a psoas sign appears on reassessment, image and consult surgery immediately.\n\nReturn to the hub for the next differential.',
    recommendation: 'Deep infection unlikely; re-examine and image urgently if toxicity or spreading signs evolve.',
    citation: [4],
    next: 'hip-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- SCFE (consult gap: plain-text) --------------------
  {
    id: 'hip-scfe-entry',
    type: 'question',
    module: 2,
    title: 'SCFE — Adolescent Gate',
    body: '**Slipped capital femoral epiphysis:** the classic patient is an **obese adolescent 8-15** (often around the growth spurt), with hip, groin, **or referred knee/thigh** pain and an **externally rotated, out-toeing** gait; the hip obligately externally rotates on passive flexion. **Up to a quarter present with knee pain and no hip complaint** \u2014 the great trap. Get **AP pelvis + frog-leg (or cross-table) lateral** of BOTH hips.',
    options: [
      { label: 'Adolescent + hip/knee pain + out-toeing / positive frog-leg lateral', description: 'Treat as SCFE', next: 'hip-scfe-verdict', urgency: 'urgent' },
      { label: 'Not the SCFE demographic / normal imaging', description: 'SCFE unlikely \u2014 move on', next: 'hip-scfe-excluded', urgency: 'routine' },
    ],
    citation: [5],
    summary: 'Obese teen + knee/thigh or hip pain + out-toeing; frog-leg lateral of both hips. Up to 25% present as knee pain.',
    safetyLevel: 'warning',
  },
  {
    id: 'hip-scfe-verdict',
    type: 'result',
    module: 2,
    title: 'SCFE — Non-Weight-Bearing + Orthopedics',
    body: '**SCFE confirmed or strongly suspected** (no dedicated consult yet \u2014 manage here):\n\n- **Make the patient strictly non-weight-bearing immediately** (wheelchair, no crutches with weight-bearing) \u2014 continued weight-bearing can convert a stable slip to an unstable one, which carries a much higher risk of **avascular necrosis**.\n- **Urgent orthopedic consult** \u2014 the definitive treatment is operative in situ pinning (percutaneous screw fixation); do not attempt reduction in the ED.\n- Image BOTH hips \u2014 bilateral involvement is common; some centers pin the contralateral prophylactically.\n- Analgesia; admit per orthopedics.\n- For broader pediatric MSK context, see [Pediatric Arthritis](#/tree/pediatric-arthritis).',
    recommendation: 'Strict non-weight-bearing NOW + urgent ortho for in-situ pinning; do not reduce; image both hips. (Consult gap \u2014 managed in-hub.)',
    citation: [5],
    safetyLevel: 'warning',
    confidence: 'definitive',
  },
  {
    id: 'hip-scfe-excluded',
    type: 'result',
    module: 2,
    title: 'SCFE — Unlikely',
    body: 'Outside the SCFE demographic or with a normal frog-leg lateral, SCFE is unlikely. **In an adolescent with persistent hip or knee pain and normal early films, keep SCFE on the list** \u2014 a subtle slip can be missed; a low threshold to re-image or get orthopedic follow-up is appropriate.\n\nReturn to the hub for the next differential.',
    recommendation: 'SCFE unlikely; maintain suspicion in any adolescent with persistent hip/knee pain \u2014 re-image or refer.',
    citation: [5],
    next: 'hip-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- AVN (consult gap: plain-text) --------------------
  {
    id: 'hip-avn-entry',
    type: 'question',
    module: 2,
    title: 'Avascular Necrosis of Femoral Head — Risk Gate',
    body: '**AVN (osteonecrosis) of the femoral head:** insidious groin pain worse with weight-bearing, in a patient with a risk factor \u2014 **corticosteroids, alcohol, sickle cell disease, SLE, trauma, prior fracture, or idiopathic**. **Plain films are often normal early** (before subchondral collapse / the "crescent sign"); **MRI is the most sensitive test**.',
    options: [
      { label: 'Groin pain + AVN risk factor \u00B1 crescent sign', description: 'Work up for AVN', next: 'hip-avn-verdict', urgency: 'urgent' },
      { label: 'No risk factors, mechanical pattern', description: 'AVN unlikely \u2014 move on', next: 'hip-avn-excluded', urgency: 'routine' },
    ],
    citation: [6],
    summary: 'Groin pain + steroids/alcohol/sickle cell; plain film often normal early, MRI most sensitive.',
    safetyLevel: 'warning',
  },
  {
    id: 'hip-avn-verdict',
    type: 'result',
    module: 2,
    title: 'AVN Femoral Head — Image + Refer',
    body: '**AVN suspected** (no dedicated consult yet \u2014 manage here):\n\n- **MRI is the gold standard** and can detect AVN before plain-film changes; get AP + frog-leg films first, then arrange MRI (ED or urgent outpatient depending on severity).\n- **Protected weight-bearing** (crutches) and analgesia; early disease may respond to joint-preserving surgery (core decompression), advanced collapse needs arthroplasty \u2014 outcome is stage-dependent, so early diagnosis matters.\n- **Address the driver:** for sickle cell disease, manage the underlying process \u2192 [Sickle Cell](#/tree/sickle-cell); minimize steroids/alcohol where possible.\n- **Orthopedic referral** for staging and definitive management.',
    recommendation: 'MRI (most sensitive), protected weight-bearing, orthopedic referral, treat the driver (e.g., sickle cell). (Consult gap \u2014 managed in-hub.)',
    citation: [6],
    safetyLevel: 'warning',
    confidence: 'definitive',
  },
  {
    id: 'hip-avn-excluded',
    type: 'result',
    module: 2,
    title: 'AVN — Unlikely',
    body: 'Without a risk factor and with a mechanical pain pattern, AVN is unlikely. **If risk factors are present but early films are normal, a normal X-ray does not exclude AVN** \u2014 arrange MRI or orthopedic follow-up when suspicion persists.\n\nReturn to the hub for the next differential.',
    recommendation: 'AVN unlikely without risk factors; if risk present, a normal X-ray does not exclude it \u2014 MRI / refer.',
    citation: [6],
    next: 'hip-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- OCCULT FRACTURE (consult gap: plain-text) --------------------
  {
    id: 'hip-occult-entry',
    type: 'question',
    module: 2,
    title: 'Occult / Insufficiency Fracture — Elderly Gate',
    body: 'The classic miss: an **elderly / osteoporotic patient with groin or hip pain and inability to bear weight after minimal or no trauma**, whose **plain X-ray is normal or subtle**. Insufficiency fractures also occur with chronic steroid use, bisphosphonate-associated atypical femoral fractures, or metastatic bone disease. Do not clear a hip on plain films alone when the patient cannot walk.',
    options: [
      { label: 'Can\u2019t weight-bear + groin/hip pain + normal or equivocal X-ray', description: 'Advanced imaging (CT/MRI)', next: 'hip-occult-verdict', urgency: 'urgent' },
      { label: 'Weight-bearing well, benign exam, negative films', description: 'Occult fracture unlikely \u2014 move on', next: 'hip-occult-excluded', urgency: 'routine' },
    ],
    citation: [7],
    summary: 'Elderly + can\u2019t-weight-bear + normal X-ray = occult fracture until CT/MRI says otherwise.',
    safetyLevel: 'warning',
  },
  {
    id: 'hip-occult-verdict',
    type: 'result',
    module: 2,
    title: 'Occult Hip Fracture — Advanced Imaging + Ortho',
    body: '**Occult / insufficiency fracture suspected** (no dedicated consult yet \u2014 manage here):\n\n- **A normal X-ray does NOT rule out a hip fracture** in a patient who cannot bear weight \u2014 obtain **MRI (most sensitive, detects fracture within hours)** or **CT** if MRI is unavailable.\n- Keep the patient **non-weight-bearing** and provide adequate analgesia (consider a fascia iliaca / femoral nerve block for a suspected fracture).\n- **Orthopedic consult** \u2014 most femoral neck / intertrochanteric fractures need operative fixation; occult fractures can displace if the patient keeps walking.\n- Screen for the driver: osteoporosis, an atypical femoral fracture on bisphosphonates, or a pathologic fracture from **bony metastasis** \u2192 [Oncological Emergencies](#/tree/oncological-emergencies).',
    recommendation: 'Normal X-ray does NOT exclude \u2014 MRI (or CT); non-weight-bearing + analgesia (\u00B1 nerve block); ortho for fixation; screen for mets. (Consult gap \u2014 managed in-hub.)',
    citation: [7],
    safetyLevel: 'warning',
    confidence: 'definitive',
  },
  {
    id: 'hip-occult-excluded',
    type: 'result',
    module: 2,
    title: 'Occult Fracture — Unlikely',
    body: 'A patient who bears weight well with a benign exam and negative films is unlikely to have a significant occult fracture. **In the elderly with any inability to weight-bear, keep the threshold for MRI low** \u2014 the consequences of a missed hip fracture (displacement, AVN, immobility) are severe.\n\nReturn to the hub for the next differential.',
    recommendation: 'Occult fracture unlikely if weight-bearing well; low threshold for MRI in the elderly who cannot walk.',
    citation: [7],
    next: 'hip-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- PEDIATRIC LIMP --------------------
  {
    id: 'hip-peds-entry',
    type: 'question',
    module: 2,
    title: 'Pediatric Limping Child — Age + Fever Gate',
    body: 'The limping child needs the septic hip / osteomyelitis excluded before "transient synovitis." **Kocher criteria** (fever >38.5, non-weight-bearing, ESR >40, WBC >12k) plus CRP help separate septic arthritis from transient synovitis \u2014 open Kocher in the toolbar. Keep on the list by age: **osteomyelitis** (bone tenderness, fever), **Legg-Calv\u00E9-Perthes** (4-8 y, insidious), **SCFE** (older child), and non-accidental trauma.',
    options: [
      { label: 'Fever + can\u2019t-weight-bear + elevated markers (high Kocher) or focal bone tenderness', description: 'Septic joint / osteomyelitis pathway', next: 'hip-peds-verdict', urgency: 'urgent' },
      { label: 'Afebrile, weight-bearing, low Kocher, well child', description: 'Likely transient synovitis \u2014 move on', next: 'hip-peds-excluded', urgency: 'routine' },
    ],
    citation: [3],
    summary: 'Kocher + CRP separate septic arthritis from transient synovitis; keep osteomyelitis/Perthes/SCFE by age.',
    safetyLevel: 'warning',
  },
  {
    id: 'hip-peds-verdict',
    type: 'result',
    module: 2,
    title: 'Pediatric Septic Joint / Osteomyelitis — Treat',
    body: '**Osteomyelitis:** open [Pediatric Osteomyelitis](#/tree/peds-osteomyelitis) \u2014 focal bone tenderness + fever + elevated ESR/CRP; blood cultures, MRI, empiric antibiotics covering S. aureus (and Kingella in young children), orthopedic input.\n\n**Septic hip in a child:** high Kocher / infected synovial fluid \u2192 emergent orthopedic washout + IV antibiotics (see the [Septic Arthritis](#/tree/septic-arthritis) pathway above); US-guided aspiration confirms.\n\nFor the broader pediatric inflammatory-arthritis differential, see [Pediatric Arthritis](#/tree/pediatric-arthritis).',
    recommendation: 'Osteomyelitis \u2192 Peds Osteomyelitis consult (MRI + abx + ortho). Septic hip \u2192 aspirate + emergent washout + abx.',
    citation: [3],
    safetyLevel: 'warning',
    confidence: 'definitive',
  },
  {
    id: 'hip-peds-excluded',
    type: 'result',
    module: 2,
    title: 'Transient Synovitis — Likely (Exclusion Diagnosis)',
    body: 'A well-appearing, afebrile, weight-bearing child with a low Kocher score and reassuring markers most likely has **transient (toxic) synovitis** \u2014 a self-limited post-viral inflammation. **It remains a diagnosis of exclusion.** Manage with NSAIDs, rest, and **close follow-up in 24-48 h**; give strict return precautions for fever, worsening pain, or inability to bear weight, which would mandate re-evaluation for septic arthritis.\n\nReturn to the hub if another differential remains open.',
    recommendation: 'Transient synovitis (exclusion dx): NSAIDs + rest + 24-48 h recheck; return for fever / worsening / non-weight-bearing.',
    citation: [3],
    next: 'hip-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- MECHANICAL (OA / GTPS / bursitis) --------------------
  {
    id: 'hip-mech-entry',
    type: 'question',
    module: 2,
    title: 'Mechanical Hip Pain — Pattern Gate',
    body: 'Once the dangerous causes are excluded, chronic mechanical pain is common: **osteoarthritis** (deep groin pain, worse with activity, morning stiffness <30 min, reduced internal rotation), **greater trochanteric pain syndrome / trochanteric bursitis** (lateral hip pain, tender over the greater trochanter, worse lying on that side), and **gluteal / iliotibial pathology**.',
    options: [
      { label: 'Chronic mechanical pattern, well-appearing, afebrile, red flags excluded', description: 'Conservative management + referral', next: 'hip-mech-verdict', urgency: 'routine' },
      { label: 'Any red flag still unaddressed', description: 'Return to Rule In / Rule Out', next: 'hip-triage', urgency: 'urgent' },
    ],
    citation: [1],
    summary: 'OA / GTPS / bursitis once dangerous causes excluded; conservative care + referral.',
    safetyLevel: 'warning',
  },
  {
    id: 'hip-mech-verdict',
    type: 'result',
    module: 2,
    title: 'Mechanical Hip Pain — Conservative Management',
    body: 'Open [Approach to Arthritis](#/tree/approach-to-arthritis) for the degenerative / inflammatory work-up.\n\n- **Osteoarthritis:** analgesia (acetaminophen, topical or oral NSAIDs), activity modification, physical therapy, weight management; orthopedic referral for advanced disease / arthroplasty candidacy.\n- **Greater trochanteric pain syndrome / bursitis:** relative rest, NSAIDs, PT (hip abductor strengthening), and a corticosteroid injection for refractory cases.\n- Confirm you have **excluded the red flags** (no fever, weight-bearing, no AVN risk, adequate imaging) before committing to a mechanical label.',
    recommendation: 'OA/GTPS/bursitis \u2192 analgesia + activity modification + PT \u00B1 injection; ensure red flags are excluded first.',
    citation: [1],
    next: 'hip-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // ============================================================
  // Module 3 — Initial Bundle / Reassess
  // ============================================================
  {
    id: 'hip-rescue',
    type: 'info',
    module: 3,
    title: 'Initial Bundle — Atraumatic Hip Pain',
    body: 'No emergency ruled in; well-appearing patient. Standard ED bundle while the workup cooks:\n\n- **Analgesia** \u2014 acetaminophen / NSAID for mild-moderate; opioid PRN for severe; consider a **fascia iliaca / femoral nerve block** for a suspected fracture.\n- **Labs when infection or systemic disease is possible:** CBC, **ESR, CRP** (inflammatory / septic screen), CMP; blood cultures + lactate if febrile/toxic; consider uric acid, and joint aspiration for crystals if a crystal arthropathy is plausible.\n- **Imaging:** **AP pelvis + frog-leg / cross-table lateral** of the affected hip (both hips in a child / SCFE); advanced imaging (MRI > CT) for a suspected occult fracture or AVN with normal plain films.\n- **Weight-bearing status** documented; keep non-weight-bearing if fracture or SCFE is suspected.\n- **qSOFA** (toolbar) if any sepsis concern.\n\n**Reassess** for the ability to bear weight, pain response, fever, and returning labs/imaging.',
    citation: [1, 2],
    next: 'hip-reassess',
    summary: 'Analgesia (\u00B1 nerve block) + ESR/CRP/CBC if infection possible + AP/frog-leg films + advanced imaging for occult fx/AVN. Reassess weight-bearing.',
    safetyLevel: 'warning',
  },
  {
    id: 'hip-reassess',
    type: 'question',
    module: 3,
    title: 'Reassess — Weight-Bearing + Labs + Imaging',
    body: 'Re-examine: can they bear weight now? Fever? Inflammatory markers? Imaging results back?',
    options: [
      { label: 'Bearing weight + afebrile + benign labs/imaging + reliable', description: 'Discharge pathway', next: 'hip-disposition' },
      { label: 'Equivocal \u2014 normal plain film but can\u2019t weight-bear / needs MRI or aspiration', description: 'Imaging / advanced workup', next: 'hip-imaging', urgency: 'urgent' },
      { label: 'Fever / rising markers / toxic / new red flag', description: 'STOP \u2014 return to Rule In / Rule Out', next: 'hip-triage', urgency: 'critical' },
      { label: 'Specific diagnosis confirmed', description: 'Leave the hub \u2014 work that deep-dive consult', next: 'hip-disposition' },
    ],
    citation: [1],
    summary: 'Weight-bearing + benign = discharge; normal film but can\u2019t-weight-bear = MRI/aspirate; fever/red flag = STOP.',
  },

  // ============================================================
  // Module 4 — Imaging
  // ============================================================
  {
    id: 'hip-imaging',
    type: 'info',
    module: 4,
    title: 'Imaging Decision Cheat-Sheet',
    body: 'Match the study to the suspected pathology:\n\n**Plain radiographs (first-line):** AP pelvis + frog-leg (or cross-table) lateral \u2014 fractures, OA, SCFE (both hips in adolescents), lytic lesions. **A normal X-ray does NOT exclude occult fracture, early AVN, or septic arthritis.**\n\n**MRI (most sensitive):** occult / insufficiency hip fracture (detects within hours), early AVN (before plain-film collapse), osteomyelitis, soft-tissue infection / abscess extent, marrow / metastatic disease.\n\n**CT:** occult fracture when MRI is unavailable; iliopsoas / deep abscess (with contrast); complex bony anatomy.\n\n**Ultrasound:** detect a hip effusion and **guide arthrocentesis** (a hip effusion is not palpable); useful in the limping child.\n\n**Arthrocentesis (gold standard for septic arthritis):** synovial fluid cell count/differential, Gram stain, culture, crystals \u2014 image-guided for the hip.\n\n**qSOFA / sepsis screen** for the febrile, toxic patient.',
    citation: [2],
    next: 'hip-disposition',
    summary: 'Plain films first (normal does not exclude occult fx/AVN/septic); MRI most sensitive; US to find effusion + guide aspiration; arthrocentesis is gold standard for septic.',
  },

  // ============================================================
  // Module 5 — Disposition
  // ============================================================
  {
    id: 'hip-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Defer to the deep-dive consult\u2019s admit criteria once a diagnosis is committed. The framework below applies to undifferentiated / mechanical hip pain.',
    options: [
      { label: 'Admit \u2014 septic joint, deep infection, fracture, SCFE, symptomatic AVN, systemic illness', description: 'Admit per the deep-dive consult\u2019s criteria', next: 'hip-dispo-admit', urgency: 'urgent' },
      { label: 'Observe \u2014 awaiting MRI / aspiration / labs, equivocal', description: 'ED observation + serial exam', next: 'hip-dispo-observe' },
      { label: 'Discharge \u2014 mechanical pain, bearing weight, afebrile, red flags excluded, reliable', description: 'Standard discharge bundle', next: 'hip-dispo-discharge' },
    ],
    citation: [1],
    summary: 'Admit surgical/infectious/fracture diagnoses; observe if equivocal; discharge mechanical pain with follow-up.',
  },
  {
    id: 'hip-dispo-admit',
    type: 'result',
    module: 5,
    title: 'Admit',
    body: 'Admit for: septic arthritis (emergent ortho washout), necrotizing infection / deep abscess (surgery + IV abx), hip fracture (occult or displaced \u2014 operative fixation), SCFE (non-weight-bearing + pinning), symptomatic AVN needing intervention, pediatric osteomyelitis, or systemic toxicity / sepsis.\n\n**Service:** Orthopedics (septic joint, fracture, SCFE, AVN); Surgery (necrotizing infection); Medicine / ID (osteomyelitis on IV abx, systemic illness); ICU (septic shock, necrotizing infection with instability); Oncology / Orthopedics (pathologic fracture / bony mets).\n\n**Handoff:** onset + mechanism (or lack of trauma), weight-bearing status, vitals + fever, exam (ROM, position, neurovascular), labs (WBC, ESR, CRP, cultures) + trend, synovial fluid results, imaging + findings, antibiotics given (drug + time), analgesia / blocks, comorbidities (steroids, sickle cell, immunocompromise, cancer), allergies.',
    recommendation: 'Admit per deep-dive criteria; match service to diagnosis; emergent ortho/surgery for septic joint or nec-fasc; standard handoff.',
    citation: [1],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'hip-dispo-observe',
    type: 'result',
    module: 5,
    title: 'Observe — Pending Advanced Workup',
    body: 'ED observation when: normal plain films but persistent inability to bear weight (awaiting MRI / CT), awaiting synovial fluid or inflammatory-marker trends, or intermediate concern with social/safety barriers.\n\n**Protocol:** serial exams (weight-bearing, ROM, position); recheck temperature; repeat/trend inflammatory markers if intermediate; continue analgesia; keep non-weight-bearing if a fracture or SCFE is possible.\n\n**Escalate** (admit / aspiration / surgery) for fever, rising markers, a positive advanced study, or worsening exam. **Discharge** with strict follow-up if imaging is reassuring, the patient bears weight, and red flags stay excluded.',
    recommendation: 'Obs + serial weight-bearing/ROM + trend markers; escalate on fever/positive imaging; discharge when reassuring.',
    citation: [1],
    confidence: 'recommended',
  },
  {
    id: 'hip-dispo-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge — Universal Checklist',
    body: 'Before discharge: (1) **red flags excluded** (afebrile, no septic-joint features, no toxicity), (2) **able to bear weight** or a clear plan if not (fracture/SCFE excluded by adequate imaging), (3) **adequate imaging** for the clinical picture (remember a normal X-ray does not exclude occult fracture / early AVN), (4) pain controlled, (5) **reliable follow-up arranged** (orthopedics / PCP), (6) **written return precautions**.\n\n**Return precautions:** fever, worsening or spreading pain, redness / swelling, complete inability to bear weight, new numbness/weakness, or the pain becoming out of proportion \u2014 return immediately.\n\n**Do NOT discharge if:** the patient cannot bear weight with a normal plain film and no advanced imaging, any fever or systemic sign, an unexcluded septic joint, an adolescent with a possible SCFE not yet imaged, an elderly patient with an unexplained inability to walk, or unreliable follow-up. Counsel: "A normal X-ray does not rule out a hip fracture or early avascular necrosis \u2014 if you still cannot bear weight, you need an MRI before we can call this safe."',
    recommendation: 'Discharge only if red flags excluded, weight-bearing (or fracture/SCFE excluded by imaging), pain controlled, follow-up arranged, written precautions.',
    citation: [1],
    confidence: 'definitive',
  },
];

export const HIP_PAIN_HUB_CRITICAL_ACTIONS = [
  { text: 'Sick check FIRST \u2014 fever + can\u2019t-weight-bear = septic hip until proven otherwise. Age anchors the differential.', nodeId: 'hip-start' },
  { text: 'Septic hip \u2192 image-guided arthrocentesis (gold standard) + empiric IV abx + EMERGENT ortho washout. Do not delay abx in a septic patient.', nodeId: 'hip-septic-entry' },
  { text: 'Adolescent with hip OR knee/thigh pain + out-toeing \u2192 SCFE: strict non-weight-bearing NOW + urgent ortho. Up to 25% present as knee pain.', nodeId: 'hip-scfe-entry' },
  { text: 'Elderly + can\u2019t-weight-bear + normal X-ray \u2192 occult hip fracture until MRI/CT excludes it. A normal film does NOT rule it out.', nodeId: 'hip-occult-entry' },
];

export const HIP_PAIN_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Wilson JJ, Furukawa M. Evaluation of the patient with hip pain. Am Fam Physician. 2014;89(1):27-34.' },
  { num: 2, text: 'Frank C, Chughtai B, et al. American College of Radiology ACR Appropriateness Criteria: Chronic Hip Pain / Acute Hip Pain-Suspected Fracture. J Am Coll Radiol. 2017.' },
  { num: 3, text: 'Kocher MS, Zurakowski D, Kasser JR. Differentiating between septic arthritis and transient synovitis of the hip in children: an evidence-based clinical prediction algorithm. J Bone Joint Surg Am. 1999;81(12):1662-1670.' },
  { num: 4, text: 'Stevens DL, Bisno AL, Chambers HF, et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the Infectious Diseases Society of America. Clin Infect Dis. 2014;59(2):e10-e52.' },
  { num: 5, text: 'Peck DM, Voss LM, Voss TT. Slipped Capital Femoral Epiphysis: Diagnosis and Management. Am Fam Physician. 2017;95(12):779-784.' },
  { num: 6, text: 'Petek D, Hannouche D, Suva D. Osteonecrosis of the femoral head: pathophysiology and current concepts of treatment. EFORT Open Rev. 2019;4(3):85-97.' },
  { num: 7, text: 'Rehman H, Clement RGE, Perks F, White TO. Imaging of occult hip fractures: CT or MRI? Injury. 2016;47(6):1297-1301.' },
];

export const HIP_PAIN_HUB_NODE_COUNT = HIP_PAIN_HUB_NODES.length;
export const HIP_PAIN_HUB_MODULE_LABELS = [
  'Sick Check',
  'Rule In / Rule Out',
  'Rescue / Reassess',
  'Imaging',
  'Disposition',
];
