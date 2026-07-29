// MedKitt — Acute Monoarthritis Hub (EM canonical + Rheum cross-list, type: 'hub')
//
// 5-Module skeleton per ~/Desktop/claude-brain/patterns/hub-consult-pattern.md v2:
//   1. Sick Check
//   2. Time-Critical Exclusions (branches -> deep-dive consults)
//   3. Initial Bundle + Reassess
//   4. Arthrocentesis / Imaging Decision
//   5. Disposition
//
// CROSS-LINK DIRECTIONALITY (R8): hub links INTO splits; splits never link back.
// All outbound #/tree/ targets validated against the repo on 2026-07-12.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const ACUTE_MONOARTHRITIS_HUB_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Sick Check
  // ============================================================
  {
    id: 'mono-start',
    type: 'info',
    module: 1,
    title: 'Acute Monoarthritis Hub — Rule Out the Septic Joint',
    body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Septic arthritis** \u2014 a joint that is infected today can be destroyed in days. This is the diagnosis you must exclude in EVERY acute monoarthritis.\n2. **Disseminated gonococcal infection** \u2014 young, sexually active; migratory arthritis, tenosynovitis, pustular rash.\n3. **Prosthetic joint infection** \u2014 any hot prosthetic joint is infected until proven otherwise; do not tap without ortho.\n4. **Crystal arthropathy that hides an infection** \u2014 gout and septic arthritis can coexist; crystals do not rule out infection.\n5. **Trauma with fracture / hemarthrosis** \u2014 especially anticoagulated patients; do not miss a fracture.\n\n**The one question that drives this entire hub: is this joint SEPTIC?** Because a missed septic joint means cartilage destruction, osteomyelitis, sepsis, and disability, the acute monoarthritis pathway is built around excluding infection first. Arthrocentesis is the answer to most of these patients. [1,2]\n\n**Scan in 30 seconds:** [1]\n- **The joint** \u2014 single hot, red, swollen, exquisitely painful joint with pain on any passive motion? That is septic arthritis until the tap says otherwise.\n- **Systemic signs** \u2014 fever, rigors, tachycardia, hypotension (septic joint can seed the blood).\n- **Prosthesis or recent joint procedure/injection** \u2014 changes everything; involve ortho, do not tap blindly.\n- **Immunocompromise / diabetes / IVDU / RA** \u2014 raises septic risk and can blunt the exam.\n- **Skin** \u2014 overlying cellulitis (can mimic and complicate), pustular/vesicular rash (gonococcal), tophi (gout), psoriasis.\n\n**The 4 questions that change the differential:** [1,2]\n1. **Is the joint prosthetic or recently instrumented?** (do not tap without ortho; PJI pathway)\n2. **Fever or systemic illness?** (raises septic + gonococcal probability)\n3. **Prior identical attacks that self-resolved in days?** (favors crystal \u2014 but does NOT exclude infection)\n4. **Trauma, or anticoagulated with a swollen joint?** (fracture / hemarthrosis)',
    citation: [1, 2, 7, 9],
    next: 'mono-exclusions',
    summary: 'The whole hub is built to exclude the SEPTIC joint. Arthrocentesis answers most patients. A prosthetic/instrumented joint is infected until proven otherwise \u2014 involve ortho, do not tap blindly.',
    safetyLevel: 'critical',
  },

  // ============================================================
  // Module 2 — Time-Critical Exclusions
  // ============================================================
  {
    id: 'mono-exclusions',
    type: 'question',
    module: 2,
    title: 'Time-Critical Exclusions — Pick the One That Fits',
    body: 'Infection first, always. Each branch routes to a deep-dive and the next action.',
    options: [
      {
        label: 'Hot single joint + fever / systemic illness, native joint',
        description: 'Septic arthritis \u2014 arthrocentesis NOW, then empiric antibiotics',
        next: 'mono-exc-septic',
        urgency: 'critical',
      },
      {
        label: 'Prosthetic joint or recent surgery/injection, now hot and painful',
        description: 'Prosthetic joint infection \u2014 do NOT tap blindly; ortho first',
        next: 'mono-exc-prosthetic',
        urgency: 'critical',
      },
      {
        label: 'Young, sexually active + migratory arthritis / tenosynovitis / pustular rash',
        description: 'Disseminated gonococcal infection \u2014 ceftriaxone, cultures, STI workup',
        next: 'mono-exc-gono',
        urgency: 'urgent',
      },
      {
        label: 'Recurrent self-limited attacks, 1st MTP / knee / wrist, tophi or CPPD history',
        description: 'Crystal arthropathy \u2014 but confirm and never assume it excludes infection',
        next: 'mono-exc-crystal',
        urgency: 'urgent',
      },
      {
        label: 'Trauma, or anticoagulated with a tense swollen joint',
        description: 'Fracture / hemarthrosis \u2014 imaging, reverse coagulopathy if needed',
        next: 'mono-exc-trauma',
        urgency: 'urgent',
      },
      {
        label: 'Tick exposure / endemic area + knee monoarthritis, subacute',
        description: 'Lyme arthritis \u2014 serology; still tap to exclude infection if acute/hot',
        next: 'mono-exc-lyme',
      },
      {
        label: 'None of the above \u2014 acute monoarthritis, stable, undifferentiated',
        description: 'Initial bundle + arthrocentesis decision',
        next: 'mono-rescue',
      },
    ],
    citation: [1, 2, 3, 7, 9],
    summary: 'Infection first. Each branch links to its deep-dive + the next action. Crystals never exclude sepsis.',
    safetyLevel: 'critical',
  },

  // -------- Time-critical exclusion branch results --------
  {
    id: 'mono-exc-septic',
    type: 'result',
    module: 2,
    title: 'Septic Arthritis — Tap Then Treat',
    body: 'Open [Septic Arthritis](#/tree/septic-arthritis) for the full diagnostic + antibiotic + drainage pathway, and [Joint Arthrocentesis](#/tree/joint-arthrocentesis) for the procedure.\n\n**A native hot joint with fever is septic arthritis until synovial fluid says otherwise.** No single feature rules it in or out \u2014 the joint aspirate is the test. Delay in drainage causes irreversible cartilage loss. [2]\n\n**Next 5 minutes:**\n- **Arthrocentesis BEFORE antibiotics when feasible** (do not delay antibiotics in a septic-appearing patient, but get the tap first if you can). Send synovial fluid for cell count + differential, Gram stain, culture, and crystals.\n- Synovial WBC interpretation: higher counts raise probability (often >50,000/mm3 with PMN predominance, but septic arthritis can occur at lower counts \u2014 no cutoff excludes it). Gram stain positive in only ~30-50%.\n- Blood cultures \u00d7 2, CBC, CMP, CRP/ESR, lactate; type/screen if septic.\n- **Empiric IV antibiotics** after the tap: cover Staph aureus (including MRSA \u2014 vancomycin) + gram-negatives per risk; add ceftriaxone if gonococcal possible.\n- **Orthopedic/surgical consult for joint drainage** (arthroscopic/open washout or serial aspiration) \u2014 antibiotics alone do not clear a septic joint.\n- Do not inject steroids into a possibly infected joint.\n\n\ud83d\uded1 Never withhold antibiotics/drainage waiting for confirmatory culture in a septic-appearing joint. \ud83d\uded1 A positive crystal analysis does NOT exclude co-existent infection \u2014 treat both if the picture fits.',
    recommendation: 'Arthrocentesis first (cell count, Gram stain, culture, crystals), blood cultures, then empiric IV antibiotics (cover MRSA), and orthopedic consult for drainage. Crystals do not exclude infection.',
    confidence: 'definitive',
    citation: [2, 9, 10],
    safetyLevel: 'critical',
  },
  {
    id: 'mono-exc-prosthetic',
    type: 'result',
    module: 2,
    title: 'Prosthetic Joint — Do Not Tap Blindly',
    body: 'A hot, painful prosthetic joint (or one recently operated/injected) is a prosthetic joint infection until proven otherwise \u2014 and the workup differs from a native joint. [3]\n\n**Next steps:**\n- **Consult orthopedics BEFORE aspirating.** ED aspiration of a prosthetic joint risks seeding the prosthesis and is often best done by orthopedics under sterile/image-guided conditions with their input on antibiotic timing.\n- **Do NOT start empiric antibiotics reflexively** if the patient is stable and cultures are pending \u2014 premature antibiotics can render prosthetic-joint cultures falsely negative and complicate management. Exception: a septic/unstable patient gets antibiotics after cultures.\n- Send blood cultures, CBC, CRP, ESR (CRP/ESR are useful screening tests for PJI).\n- X-ray the joint (loosening, lucency).\n- Analgesia, immobilize, admit per orthopedics.\n\n\ud83d\uded1 Do NOT perform a blind ED arthrocentesis of a prosthetic joint without orthopedic involvement. \ud83d\uded1 Avoid empiric antibiotics before cultures in a STABLE prosthetic-joint patient \u2014 it sabotages the diagnostic workup.',
    recommendation: 'Orthopedics FIRST for a hot prosthetic joint \u2014 do not tap blindly. Send blood cultures + CRP/ESR + X-ray. Hold empiric antibiotics in the stable patient until cultures obtained; give them if septic.',
    confidence: 'definitive',
    citation: [3, 13],
    safetyLevel: 'critical',
  },
  {
    id: 'mono-exc-gono',
    type: 'result',
    module: 2,
    title: 'Disseminated Gonococcal Infection',
    body: 'Disseminated gonococcal infection (DGI) is a leading cause of acute arthritis in young, sexually active adults and presents two ways: (1) the classic triad of migratory polyarthralgia, tenosynovitis, and dermatitis (pustular/vesiculopustular lesions), or (2) a purulent monoarthritis. [4]\n\n**Next steps:**\n- **Arthrocentesis** if an effusion is present \u2014 send cell count, Gram stain (often negative in DGI), culture; synovial fluid NAAT for N. gonorrhoeae where available.\n- **NAAT of urethral/cervical/rectal/pharyngeal sites + blood cultures** \u2014 the diagnosis is often made from mucosal sites, not the joint.\n- **Empiric ceftriaxone 1 g IV/IM daily** (per current CDC guidance) plus treatment for possible chlamydia co-infection.\n- Screen for other STIs (HIV, syphilis, chlamydia); counsel + partner notification.\n- Still cannot fully exclude Staph septic arthritis \u2014 if the joint is frankly purulent, cover accordingly and drain.\n\n\ud83d\uded1 Gram stain and even synovial culture are frequently negative in DGI \u2014 diagnose from mucosal NAAT + clinical picture; do not let a negative joint Gram stain reassure you.',
    recommendation: 'Suspect DGI in young sexually active patients with migratory arthritis + tenosynovitis + pustular rash. Tap the joint, NAAT all mucosal sites + blood cultures, empiric ceftriaxone, full STI workup. Joint Gram stain is often negative.',
    confidence: 'recommended',
    citation: [4, 8],
    safetyLevel: 'warning',
  },
  {
    id: 'mono-exc-crystal',
    type: 'result',
    module: 2,
    title: 'Crystal Arthropathy — Confirm, Never Assume',
    body: 'Gout and pseudogout (CPPD) are the most common causes of acute monoarthritis, but the ED trap is assuming crystal disease and missing an infected joint \u2014 the two coexist. [5]\n\n**Open [Gout](#/tree/gout)** for the acute-flare treatment and chronic pathway, and [Approach to Arthritis](#/tree/approach-to-arthritis) for the broader differential and synovial-fluid interpretation.\n\n**Recognize:**\n- **Gout** \u2014 rapid-onset, exquisitely painful, often 1st MTP (podagra), midfoot, ankle, or knee; tophi; hyperuricemia (may be normal during a flare). Negatively birefringent needle-shaped monosodium urate crystals.\n- **Pseudogout (CPPD)** \u2014 older patients, knee/wrist, chondrocalcinosis on X-ray. Positively birefringent rhomboid calcium pyrophosphate crystals.\n\n**Next steps:**\n- **Arthrocentesis with crystal analysis AND cell count/Gram stain/culture** whenever infection cannot be confidently excluded \u2014 especially with fever, very high inflammatory markers, or a first attack.\n- Treat the flare: NSAIDs, colchicine, or corticosteroids (intra-articular only after infection excluded; otherwise systemic).\n- **If any doubt about infection, treat as septic until cultures return** \u2014 crystals present + infection present is a real and dangerous combination.\n\n\ud83d\uded1 A history of gout does NOT exclude a septic joint in this attack. \ud83d\uded1 Positive crystals + high synovial WBC + fever \u2192 still tap for culture and consider empiric antibiotics.',
    recommendation: 'Confirm crystals by aspiration but ALWAYS send cell count/Gram stain/culture too. Treat the flare (NSAIDs/colchicine/steroids). If infection cannot be excluded, treat as septic until cultures return.',
    confidence: 'recommended',
    citation: [5, 11],
    safetyLevel: 'warning',
  },
  {
    id: 'mono-exc-trauma',
    type: 'result',
    module: 2,
    title: 'Trauma / Hemarthrosis',
    body: 'A swollen joint after trauma \u2014 or a spontaneously swollen joint in an anticoagulated or bleeding-disorder patient \u2014 points to fracture, ligamentous injury, or hemarthrosis rather than infection or crystals. [1]\n\n**Next steps:**\n- **X-ray** the joint (fracture, effusion, lipohemarthrosis \u2014 a fat-fluid level indicates intra-articular fracture). CT/MRI for occult fracture or internal derangement as indicated.\n- **Anticoagulated / hemophiliac:** consider spontaneous hemarthrosis \u2014 check coags, reverse if bleeding is significant ([Anticoagulation Reversal](#/tree/anticoag-reversal)); for hemophilia, replace the deficient factor early ([Hemophilia](#/tree/hemophilia)).\n- Arthrocentesis if the diagnosis is unclear or infection is possible \u2014 bloody aspirate suggests hemarthrosis; fat globules suggest intra-articular fracture. Do not aspirate over a fracture unnecessarily.\n- Analgesia, immobilize, ice, elevate; orthopedic follow-up or consult for significant injuries.\n\n\ud83d\uded1 A tense hemarthrosis in a hemophiliac needs factor replacement BEFORE or with any procedure \u2014 do not delay. \ud83d\uded1 Do not attribute a swollen joint to \u201ctrauma\u201d and miss a co-existent infection if there are systemic signs \u2014 tap if in doubt.',
    recommendation: 'X-ray for fracture/effusion (lipohemarthrosis = intra-articular fracture). Reverse coagulopathy / replace factor for hemarthrosis. Immobilize + analgesia + ortho follow-up. Tap if infection cannot be excluded.',
    confidence: 'recommended',
    citation: [1, 12],
    safetyLevel: 'warning',
  },
  {
    id: 'mono-exc-lyme',
    type: 'result',
    module: 2,
    title: 'Lyme Arthritis',
    body: 'In endemic areas, Lyme disease is a cause of subacute/recurrent monoarthritis (classically a large joint, especially the knee) weeks to months after a tick bite \u2014 often with a large effusion but relatively modest pain. [6]\n\n**Recognize:**\n- Endemic exposure (Northeast/upper Midwest US, parts of Europe), prior erythema migrans or flu-like illness, recurrent knee swelling.\n- The effusion can be large; systemic toxicity is usually mild.\n\n**Next steps:**\n- **Two-tier Lyme serology** (ELISA \u2192 confirmatory immunoblot); Lyme is a late manifestation, so serology is usually strongly positive.\n- **If the joint is acutely hot / the patient is febrile, still arthrocentesis to exclude septic arthritis** \u2014 do not let \u201cLyme\u201d cause you to miss a bacterial joint.\n- Treatment (once Lyme confirmed): oral doxycycline/amoxicillin course; refractory cases may need IV therapy and rheumatology.\n\n\ud83d\uded1 Do not diagnose Lyme arthritis on exposure alone in a hot, febrile joint \u2014 exclude infection with a tap first. \ud83d\uded1 A negative Lyme serology in established Lyme arthritis is unusual \u2014 reconsider the diagnosis if seronegative.',
    recommendation: 'Consider Lyme for subacute recurrent knee monoarthritis in endemic areas; send two-tier serology. If acutely hot/febrile, tap to exclude septic arthritis first. Treat confirmed Lyme with the appropriate antibiotic course.',
    confidence: 'recommended',
    citation: [6],
  },

  // ============================================================
  // Module 3 — Initial Bundle + Reassess
  // ============================================================
  {
    id: 'mono-rescue',
    type: 'info',
    module: 3,
    title: 'Initial Bundle — Undifferentiated Acute Monoarthritis',
    body: 'No clear life-threat branch fits, but infection still must be excluded. Standard ED bundle centered on the joint aspirate: [1,2]\n\n**THE BUNDLE:**\n- **IV access + monitor** if febrile/systemically ill; analgesia (acetaminophen \u00b1 NSAID if no contraindication, or opioid for severe pain).\n- **Arthrocentesis is the pivotal test** \u2014 for any effusion where infection is on the differential (see Module 4 for the decision). Send synovial fluid for: cell count + differential, Gram stain, culture, crystal analysis. (Glucose/protein add little.)\n- **Blood work:** CBC, CMP, CRP, ESR, uric acid (limited value acutely), blood cultures \u00d7 2 if febrile or septic-appearing; \u03b2-hCG if reproductive-age female before certain drugs/imaging.\n- **X-ray** the joint (fracture, chondrocalcinosis, erosions, effusion).\n- **STI/gonococcal screen** if the demographic/history fits.\n- **Do NOT inject intra-articular steroid** until infection is excluded.\n- Analgesia, immobilize/support, elevate.\n\n**Reassess after the tap results:** synovial cell count + Gram stain steer you toward septic vs inflammatory/crystal vs non-inflammatory, and toward disposition.',
    citation: [1, 2, 7, 9],
    next: 'mono-rescue-reassess',
    summary: 'Analgesia + arthrocentesis (cell count, Gram stain, culture, crystals) + CBC/CRP/ESR + blood cultures if febrile + X-ray + STI screen if fits. No intra-articular steroid until infection excluded.',
    safetyLevel: 'warning',
  },
  {
    id: 'mono-rescue-reassess',
    type: 'question',
    module: 3,
    title: 'Reassess — What Did the Tap Show?',
    body: 'Interpret the synovial fluid + clinical picture to choose the pathway.',
    options: [
      {
        label: 'High synovial WBC / positive Gram stain / septic-appearing',
        description: 'Treat as septic \u2014 antibiotics + drainage; re-enter exclusions',
        next: 'mono-exc-septic',
        urgency: 'critical',
      },
      {
        label: 'Crystals positive, infection excluded, flare controlled',
        description: 'Crystal arthropathy \u2014 discharge with flare treatment + follow-up',
        next: 'mono-dispo-discharge',
      },
      {
        label: 'Inconclusive tap or dry tap, infection not excluded',
        description: 'Imaging / image-guided aspiration; observe pending cultures',
        next: 'mono-imaging',
        urgency: 'urgent',
      },
      {
        label: 'Non-inflammatory fluid, benign picture, systemically well',
        description: 'Likely OA / mechanical / trauma \u2014 disposition',
        next: 'mono-dispo',
      },
    ],
    citation: [1, 2, 9, 10],
    summary: 'High WBC/positive Gram stain \u2192 treat septic. Crystals + infection excluded \u2192 discharge with flare Rx. Inconclusive/dry tap \u2192 image + observe pending cultures.',
  },

  // ============================================================
  // Module 4 — Arthrocentesis / Imaging Decision
  // ============================================================
  {
    id: 'mono-imaging',
    type: 'info',
    module: 4,
    title: 'Arthrocentesis & Imaging Decision',
    body: 'Arthrocentesis is the central decision in acute monoarthritis; imaging supports it. [2,7]\n\n**Aspirate the joint when:**\n- Any acute monoarthritis where septic arthritis cannot be confidently excluded (that is most of them)\n- Fever, systemic illness, or an atraumatic hot joint\n- Diagnostic uncertainty (is it crystal or infection?)\n- See [Joint Arthrocentesis](#/tree/joint-arthrocentesis) for landmarks and technique.\n\n**Do NOT aspirate (or defer to specialist) when:**\n- Overlying cellulitis at the needle site (risk of seeding the joint) \u2014 choose an alternate approach or ultrasound guidance; involve ortho.\n- Prosthetic joint \u2014 orthopedics performs it (see PJI branch).\n- Uncorrected severe coagulopathy \u2014 correct first if possible; a difficult tap in a bleeding patient needs weighing.\n\n**Imaging:**\n- **Plain X-ray** \u2014 first-line: fracture, chondrocalcinosis (CPPD), erosions (gout/inflammatory), effusion, joint-space narrowing, lipohemarthrosis.\n- **Point-of-care / formal ultrasound** \u2014 confirms and localizes an effusion, guides aspiration (especially hip, small joints, or when landmark tap fails). Very useful for a \u201cdry\u201d tap.\n- **MRI** \u2014 for suspected osteomyelitis, occult fracture, or when septic arthritis is suspected but the joint cannot be aspirated (e.g., hip, sacroiliac); also for early erosive changes.\n- **CT** \u2014 for complex bony anatomy (SI joint, sternoclavicular).\n\n**Synovial fluid interpretation (rough guide):** non-inflammatory (WBC <2,000) = OA/trauma; inflammatory (2,000-50,000) = crystal/inflammatory/early septic; septic (often >50,000, PMN-predominant) \u2014 but NO cutoff excludes infection; culture is the arbiter.',
    citation: [2, 7, 9, 10],
    next: 'mono-dispo',
    summary: 'Tap almost every acute monoarthritis unless cellulitis overlies the site, the joint is prosthetic, or uncorrected coagulopathy. X-ray first; ultrasound guides a dry tap; MRI for osteomyelitis or an un-aspiratable joint. No synovial WBC cutoff excludes sepsis.',
  },

  // ============================================================
  // Module 5 — Disposition
  // ============================================================
  {
    id: 'mono-dispo',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Disposition follows whether infection is excluded and how the patient looks. Defer to the deep-dive consult once a diagnosis is committed.',
    options: [
      {
        label: 'Discharge \u2014 infection excluded, benign/crystal cause, pain controlled, reliable',
        description: 'Flare/mechanical treatment + rheumatology or PCP follow-up',
        next: 'mono-dispo-discharge',
      },
      {
        label: 'Observe \u2014 cultures pending, inconclusive tap, borderline picture',
        description: 'Short stay / obs for culture results + serial exam',
        next: 'mono-dispo-observe',
        urgency: 'urgent',
      },
      {
        label: 'Admit \u2014 septic arthritis, PJI, systemic illness, needs drainage/IV abx',
        description: 'Admit per septic-arthritis / PJI criteria; ortho + IV antibiotics',
        next: 'mono-dispo-admit',
        urgency: 'critical',
      },
    ],
    citation: [1, 2, 7],
    summary: 'Discharge if infection excluded and benign; observe if cultures pending/inconclusive; admit septic arthritis, PJI, or systemic illness for drainage + IV antibiotics.',
  },
  {
    id: 'mono-dispo-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge — Infection Excluded, Benign Cause',
    body: 'Safe discharge criteria: [1,5]\n\n1. **Septic arthritis reasonably excluded** \u2014 non-septic synovial fluid (low WBC, negative Gram stain) OR a confident non-infectious diagnosis, and the patient is systemically well.\n2. **Cause identified/plausible** \u2014 crystal flare, osteoarthritis, minor trauma, resolving mechanical process.\n3. **Pain controlled** and the patient can bear weight / use the limb adequately.\n4. **No high-risk features** \u2014 no fever, no immunocompromise driving concern, no prosthetic joint, cultures either negative or reliably followed up.\n5. **Follow-up arranged** \u2014 rheumatology or primary care; culture-result callback plan for any tap sent.\n\n**Treatment on discharge (crystal flare):** NSAIDs (if no renal/GI/cardiac contraindication), colchicine, or a short oral steroid course; start/adjust urate-lowering therapy in coordination with follow-up (do not start it mid-flare without a plan).\n\n**Written return precautions:**\n- Fever, spreading redness, worsening pain or swelling, inability to move the joint\n- New joints involved, rash, or systemic illness\n\n**Do NOT discharge if:** septic arthritis not excluded, prosthetic joint, fever/systemic illness, immunocompromise with an unclear joint, or unreliable follow-up / no culture callback.',
    recommendation: 'Discharge only when infection is reasonably excluded and the patient is well: treat the crystal/mechanical cause, arrange rheum/PCP follow-up and culture callback, give clear return precautions.',
    confidence: 'definitive',
    citation: [1, 5, 7, 11],
  },
  {
    id: 'mono-dispo-observe',
    type: 'result',
    module: 5,
    title: 'Observe — Cultures Pending / Inconclusive Tap',
    body: 'Short-stay/observation appropriate when: [2]\n\n- Synovial cell count is intermediate and Gram stain negative, but infection cannot be confidently excluded and cultures are pending\n- A dry or inconclusive tap requiring image-guided re-aspiration\n- Borderline systemic picture (low-grade fever, elevated inflammatory markers) without a clear diagnosis\n- Pain not yet controlled or unable to bear weight, but no firm admission indication\n\n**Observation protocol:**\n- Serial joint and vital-sign checks; watch for evolving fever, spreading erythema, worsening effusion\n- Follow synovial and blood culture results\n- Ultrasound-guided re-aspiration if the initial tap failed and suspicion persists\n- Rheumatology / orthopedics input as needed\n- **Low threshold to start empiric antibiotics + admit** if the patient trends toward septic arthritis\n\n**Discharge from observation** once infection is excluded (negative cultures/reassuring course), pain is controlled, and follow-up is arranged; **admit** if the picture declares itself septic.',
    recommendation: 'Observe with serial joint/vital checks and pending cultures; re-aspirate under ultrasound if the tap was dry. Low threshold to start antibiotics and admit if the course trends septic.',
    confidence: 'recommended',
    citation: [2, 7, 10],
  },
  {
    id: 'mono-dispo-admit',
    type: 'result',
    module: 5,
    title: 'Admit',
    body: 'Admit when: [2,3]\n\n- **Septic arthritis** (native joint) \u2014 IV antibiotics + orthopedic drainage; see [Septic Arthritis](#/tree/septic-arthritis).\n- **Prosthetic joint infection** \u2014 orthopedic admission; surgical planning (debridement vs exchange).\n- **Disseminated gonococcal infection** with purulent arthritis or systemic illness \u2014 IV ceftriaxone.\n- **Systemic sepsis** from a joint source \u2014 resuscitate, IV antibiotics, source control.\n- **Uncontrolled pain**, inability to bear weight, or unsafe home situation with an undifferentiated hot joint.\n- **Immunocompromised** patient with an undiagnosed acute monoarthritis and any concern for infection.\n\n**Service selection:**\n- **Orthopedics** primary for septic native joint (washout) and prosthetic joint infection.\n- **Medicine / Infectious Disease** co-management for antibiotic selection and duration, DGI, and immunocompromised hosts.\n- **Rheumatology** for refractory inflammatory arthritis once infection is excluded.\n- **ICU** for septic shock from a joint source.\n\n**Handoff content:** which joint, native vs prosthetic, synovial fluid results (WBC, Gram stain, crystals), cultures sent, antibiotics given (drug + time), blood cultures, systemic status, and the drainage plan.',
    recommendation: 'Admit septic arthritis, PJI, DGI with systemic illness, or sepsis from a joint. Orthopedics for drainage; ID for antibiotics; ICU if shock. Give empiric IV antibiotics after cultures for a septic native joint.',
    confidence: 'recommended',
    citation: [2, 3, 8, 13],
    safetyLevel: 'warning',
  },
];

export const ACUTE_MONOARTHRITIS_HUB_CRITICAL_ACTIONS = [
  { text: 'Exclude the SEPTIC joint in EVERY acute monoarthritis \u2014 it is the diagnosis the whole hub is built around.', nodeId: 'mono-start' },
  { text: 'Arthrocentesis is the pivotal test for the septic joint; do not delay drainage.', nodeId: 'mono-exc-septic' },
  { text: 'A hot prosthetic or recently instrumented joint = do NOT tap blindly; involve orthopedics first and avoid premature antibiotics in the stable patient.', nodeId: 'mono-exc-prosthetic' },
  { text: 'Young, sexually active + migratory arthritis/tenosynovitis/pustular rash = disseminated gonococcal infection; NAAT all mucosal sites (joint Gram stain often negative).', nodeId: 'mono-exc-gono' },
  { text: 'Positive crystals do NOT exclude infection \u2014 gout and septic arthritis coexist; send culture and treat as septic if in doubt.', nodeId: 'mono-exc-crystal' },
  { text: 'Traumatic/anticoagulated swollen joint: X-ray for fracture (lipohemarthrosis), reverse coagulopathy / replace factor for hemarthrosis.', nodeId: 'mono-exc-trauma' },
  { text: 'Initial bundle: analgesia + arthrocentesis (cell count, Gram stain, culture, crystals) + CBC/CRP/ESR + blood cultures if febrile + X-ray. No intra-articular steroid until infection excluded.', nodeId: 'mono-rescue' },
  { text: 'High synovial WBC or positive Gram stain = treat as septic (antibiotics + drainage) even before cultures return.', nodeId: 'mono-rescue-reassess' },
  { text: 'Tap almost every acute monoarthritis unless cellulitis overlies the site, the joint is prosthetic, or coagulopathy is uncorrected; no synovial WBC cutoff excludes sepsis.', nodeId: 'mono-imaging' },
  { text: 'Discharge only when infection is reasonably excluded and the patient is well, with follow-up and a culture callback plan.', nodeId: 'mono-dispo-discharge' },
  { text: 'Admit septic arthritis, prosthetic joint infection, or systemic illness for orthopedic drainage + IV antibiotics.', nodeId: 'mono-dispo-admit' },
];

export const ACUTE_MONOARTHRITIS_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Ma L, Cranney A, Holroyd-Leduc JM. Acute monoarthritis: what is the cause of my patient\u2019s painful swollen joint? CMAJ. 2009;180(1):59-65. PMID 19124791. doi:10.1503/cmaj.080183' },
  { num: 2, text: 'Long B, Koyfman A, Gottlieb M. Evaluation and Management of Septic Arthritis and its Mimics in the Emergency Department. West J Emerg Med. 2019;20(2):331-341. PMID 30881554. doi:10.5811/westjem.2018.10.40974' },
  { num: 3, text: 'Osmon DR, Berbari EF, Berendt AR, et al. Diagnosis and management of prosthetic joint infection: clinical practice guidelines by the Infectious Diseases Society of America. Clin Infect Dis. 2013;56(1):e1-e25. PMID 23223583. doi:10.1093/cid/cis803. (Verified current as of this audit \u2014 IDSA has not published a superseding prosthetic joint infection guideline.)' },
  { num: 4, text: 'St. Cyr S, Barbee L, Workowski KA, et al. Update to CDC\u2019s Treatment Guidelines for Gonococcal Infection, 2020. MMWR Morb Mortal Wkly Rep. 2020;69(50):1911-1916. PMID 33332296. doi:10.15585/mmwr.mm6950a6. SCOPE NOTE: this update addresses UNCOMPLICATED gonococcal infection; for disseminated gonococcal infection (DGI) management see reference 8.' },
  { num: 5, text: 'FitzGerald JD, Dalbeth N, Mikuls T, et al. 2020 American College of Rheumatology Guideline for the Management of Gout. Arthritis Care Res (Hoboken). 2020;72(6):744-760. PMID 32391934. doi:10.1002/acr.24180' },
  { num: 6, text: 'Lantos PM, Rumbaugh J, Bockenstedt LK, et al. Clinical Practice Guidelines by IDSA, AAN, and ACR: 2020 Guidelines for the Prevention, Diagnosis and Treatment of Lyme Disease. Clin Infect Dis. 2021;72(1):e1-e48. PMID 33417672. doi:10.1093/cid/ciaa1215' },
  { num: 7, text: 'Sullivan R. Diagnosis and management of acute joint pain in the emergency department. Emerg Med Pract. 2022;24(1):1-28. PMID 34919366. (Supersedes Genes N, Chisolm-Straker M. Emerg Med Pract. 2012;14(5):1-19.)' },
  { num: 8, text: 'Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187. PMID 34292926. doi:10.15585/mmwr.rr7004a1' },
  { num: 9, text: 'Margaretten ME, Kohlwes J, Moore D, Bent S. Does this adult patient have septic arthritis? JAMA. 2007;297(13):1478-1488. PMID 17405973. doi:10.1001/jama.297.13.1478' },
  { num: 10, text: 'Carpenter CR, Schuur JD, Everett WW, Pines JM. Evidence-based diagnostics: adult septic arthritis. Acad Emerg Med. 2011;18(8):781-796. PMID 21843213. doi:10.1111/j.1553-2712.2011.01121.x' },
  { num: 11, text: 'Abhishek A, Tedeschi SK, Pascart T, et al. The 2023 ACR/EULAR Classification Criteria for Calcium Pyrophosphate Deposition Disease. Ann Rheum Dis. 2023;82(10):1248-1257. PMID 37495237. doi:10.1136/ard-2023-224575' },
  { num: 12, text: 'Srivastava A, Santagostino E, Dougall A, et al. WFH Guidelines for the Management of Hemophilia, 3rd edition. Haemophilia. 2020;26(Suppl 6):1-158. PMID 32744769. doi:10.1111/hae.14046' },
  { num: 13, text: 'McNally M, Sousa R, Wouthuyzen-Bakker M, et al. The EBJIS definition of periprosthetic joint infection. Bone Joint J. 2021;103-B(1):18-25. PMID 33380199. doi:10.1302/0301-620X.103B1.BJJ-2020-1381.R1' },
];

export const ACUTE_MONOARTHRITIS_HUB_NODE_COUNT = ACUTE_MONOARTHRITIS_HUB_NODES.length;
export const ACUTE_MONOARTHRITIS_HUB_MODULE_LABELS = [
  'Sick Check',
  'Time-Critical Exclusions',
  'Initial Bundle + Reassess',
  'Arthrocentesis & Imaging',
  'Disposition',
];
