// MedKitt — Trigeminal Neuralgia (Neurology, single-list)
//
// Second split of the headache-hub batch (PLAN.md Phase 6, canary order #2).
// Built BEFORE cluster + hub but AFTER occipital-nerve-block; no inbound
// dependencies on the other splits.
//
// CROSS-LINK DIRECTIONALITY (PLAN.md R8):
//   Links OUT to existing standalone consults when secondary causes are
//   suspected; the trigeminal-neuralgia tree does NOT link back to
//   #/tree/headache-hub. The hub (Phase 7) links INTO trigeminal-neuralgia,
//   not vice-versa.
//
// HIDDEN GATE (PLAN.md R16): id added to FLAGS.hiddenTreeIds while staging.
// Both category-service post-merge filter and tree-service.loadTree() refuse
// to surface until the canary flip removes it.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const TRIGEMINAL_NEURALGIA_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Recognition (ICHD-3 §13.1.1 paroxysmal phenotype)
  // ============================================================
  {
    id: 'tn-start',
    type: 'info',
    module: 1,
    title: 'Trigeminal Neuralgia — ED Approach',
    body: 'Paroxysmal, **unilateral**, electric-shock / stabbing facial pain confined to one or more divisions of the trigeminal nerve (V1/V2/V3 — most commonly V2 maxillary or V3 mandibular; pure V1 is rare and should prompt a hunt for secondary cause). Each paroxysm lasts seconds to <2 min; bouts of many paroxysms per day are typical. Triggered by **innocuous stimuli** to the face: chewing, talking, brushing teeth, shaving, cold wind, light touch.\n\nOpen first:\n- [TN Steps Summary](#/info/tn-steps)\n- [Stop / Pitfalls](#/info/tn-stop)\n\n**Time-critical ED tasks:**\n1. Confirm phenotype fits ICHD-3 §13.1.1 (Module 1 question below).\n2. Screen for secondary TN — atypical features (Module 2) trigger MRI BEFORE starting [carbamazepine](#/drug/carbamazepine/trigeminal neuralgia).\n3. Confirm HLA-B\\*1502 status / ancestry **BEFORE** the first CBZ dose if at-risk (Module 4).\n4. Address ED fluid + nutrition deficits — severe TN frequently causes dehydration and weight loss because patients fear the trigger.',
    citation: [1, 12],
    next: 'tn-phenotype',
    summary: 'Unilateral V2/V3 electric-shock pain, seconds-min, triggered by light touch. ICHD-3 §13.1.1.',
    safetyLevel: 'warning',
  },
  {
    id: 'tn-phenotype',
    type: 'question',
    module: 1,
    title: 'Does this fit ICHD-3 §13.1.1 trigeminal neuralgia?',
    body: '**Required (all):**\n- A. Recurrent paroxysms of unilateral facial pain in distribution of one or more divisions of the trigeminal nerve, with no radiation beyond\n- B. Pain has all 3 of:\n  • Lasts fraction of a second to 2 min\n  • Severe intensity\n  • Electric shock-like, shooting, stabbing, or sharp quality\n- C. Precipitated by innocuous stimuli within the affected trigeminal distribution\n- D. Not better accounted for by another ICHD-3 diagnosis\n\n**Typical features supporting primary TN:**\n- Unilateral every paroxysm\n- Refractory period after each paroxysm (no pain for seconds to minutes)\n- Most patients describe specific trigger zones (perinasal, perilabial, gingival)\n- Normal neurologic exam between paroxysms\n- Onset age 50-70 (peak ~60); 1.7× more common in women\n\n**Atypical / red-flag features that argue for SECONDARY TN — image (MRI brain with contrast + dedicated trigeminal sequences) BEFORE starting CBZ:**\n- Age <40 at onset → multiple sclerosis (TN is the presenting MS symptom in ~2-4%)\n- Bilateral pain (rare in primary TN; common in MS-associated TN and tumors)\n- Sensory deficit on exam (numbness, decreased corneal reflex) → tumor / structural lesion\n- Constant baseline pain between paroxysms (Burchiel TN2 phenotype — often poor surgical candidate, common in vascular loop)\n- V1-only distribution → uncommon for primary TN; reconsider\n- Hearing loss / facial weakness / other cranial nerve signs → cerebellopontine angle tumor (vestibular schwannoma, meningioma, epidermoid)',
    options: [
      {
        label: 'Fits ICHD-3 §13.1.1 + typical features only',
        description: 'Proceed to differential / secondary-cause screen',
        next: 'tn-differential',
      },
      {
        label: 'Atypical features (age <40, bilateral, sensory deficit, V1-only, constant baseline)',
        description: 'MRI first — secondary cause must be excluded before pharmacologic therapy',
        next: 'tn-secondary',
        urgency: 'urgent',
      },
    ],
    citation: [1, 2, 12],
    summary: 'ICHD-3 §13.1.1: paroxysmal unilateral V-distribution, seconds-2 min, innocuous trigger. Atypical → MRI first.',
  },

  // ============================================================
  // Module 2 — Differential / Secondary-Cause Screen
  // ============================================================
  {
    id: 'tn-differential',
    type: 'info',
    module: 2,
    title: 'Secondary-Cause Screen — Who Needs an MRI?',
    body: '**MRI brain with contrast + dedicated FIESTA/CISS trigeminal sequences is the standard pre-treatment imaging** in modern guidelines (AAN/EFNS Cruccu 2008, EAN 2019). High-yield in patients <40 yo, bilateral pain, sensory deficit, atypical phenotype, or any TN refractory to maximum-tolerated CBZ.\n\nThree imaging-defined etiologies — different management implications:\n\n1. **Vascular loop / neurovascular conflict** (most common in primary TN, ~60-80%): superior cerebellar artery (most common) or AICA looping against the trigeminal root entry zone. May still be called "classical TN" if other causes excluded. Surgical candidate for microvascular decompression (MVD).\n\n2. **Multiple sclerosis** (TN is presenting symptom in 2-4% of MS): demyelinating plaque at the pontine root entry zone. Bilateral TN, age <40, optic neuritis history, or other neurologic findings should prompt this consideration. MRI demonstrates plaque. Management: medical first; if MVD considered, lower success rate than primary TN.\n\n3. **Structural lesion** (~5-10%): vestibular schwannoma, meningioma, epidermoid cyst at cerebellopontine angle. Refer neurosurgery; pain may improve with lesion removal.\n\nThe most common ED scenario is a patient with classical phenotype, no MRI yet, and a previous outpatient diagnosis. Start CBZ (after HLA screen) AND order MRI as an outpatient if not already done.',
    citation: [2, 8],
    next: 'tn-burchiel',
    summary: 'MRI (FIESTA/CISS) standard pre-Rx. Vascular loop (60-80%), MS (2-4%), structural lesion (5-10%). Refer accordingly.',
  },
  {
    id: 'tn-secondary',
    type: 'result',
    module: 2,
    title: 'Atypical TN — MRI Before Pharmacotherapy',
    body: 'Atypical features make secondary TN likely. Order MRI brain with contrast + FIESTA/CISS trigeminal sequences BEFORE starting carbamazepine. Findings and next steps:\n\n- **MS plaque at trigeminal root** → neurology referral; treat MS per disease-modifying protocol; symptomatic TN therapy follows the same ladder (CBZ → oxcarb → adjuncts) but expect lower MVD success if surgery considered later\n- **Vestibular schwannoma / meningioma / epidermoid** → neurosurgery referral; pain may improve with lesion removal; symptomatic Rx as bridge\n- **Brainstem lesion (stroke, tumor)** → admit / urgent neuro consult\n- **Normal MRI in a patient with atypical phenotype** → reconsider diagnosis: hemicrania continua (indomethacin-responsive), SUNCT/SUNA, dental pathology, post-herpetic neuralgia, atypical facial pain, cluster — open the appropriate consult.\n\nIf in active severe ED pain, may give a SINGLE bridging dose of fosphenytoin or phenytoin IV (250 mg over 30 min) for acute relief — neurology guidance preferred. Do not start chronic CBZ until imaging + HLA cleared.',
    recommendation: 'MRI first; bridge with IV phenytoin/fosphenytoin if severe; defer chronic CBZ until imaging and HLA cleared.',
    confidence: 'definitive',
    citation: [2, 8],
    safetyLevel: 'warning',
  },

  // ============================================================
  // Module 3 — ICHD-3 / Burchiel Classification
  // ============================================================
  {
    id: 'tn-burchiel',
    type: 'info',
    module: 3,
    title: 'Burchiel Classification (TN1 vs TN2)',
    body: 'The Burchiel classification (Neurosurgery 2003) refines ICHD-3 by the presence of constant baseline pain — useful for surgical prognostication.\n\n**TN1 — Classical (purely paroxysmal):**\n- >50% of pain is episodic, paroxysmal, electric shock-like\n- Pain-free or near-pain-free between paroxysms\n- Best response to CBZ\n- **Best MVD surgical candidate** — 90% immediate pain relief, ~70% sustained at 10 years (Barker NEJM 1996)\n\n**TN2 — Atypical (paroxysmal + constant background pain):**\n- >50% of pain is constant, burning, aching baseline\n- Superimposed paroxysms\n- Less responsive to CBZ\n- **Lower MVD success** (~60-70% initial, drops to ~40% at 10 years)\n- May reflect more advanced nerve injury; consider gamma knife or balloon rhizotomy as alternatives to MVD\n\n**Symptomatic TN (Burchiel III):** secondary to MS, tumor, or other structural lesion — manage the underlying cause first.\n\n**Why this matters in the ED:**\n- TN2 patients often present in florid crisis because background pain is severe even at baseline; admit threshold is lower.\n- A patient describing "always-on burning facial pain with occasional electric shocks" is TN2 — do not be falsely reassured by an absent paroxysm during your exam.\n- Document the classification clearly in your note; it influences neurology and neurosurgery decisions downstream.',
    citation: [3],
    next: 'tn-cbz-hla',
    summary: 'TN1 = purely paroxysmal (best MVD candidate). TN2 = paroxysmal + constant baseline (lower MVD success, lower CBZ response).',
  },

  // ============================================================
  // Module 4 — First-Line Carbamazepine + HLA-B*1502 BANNER
  // ============================================================
  {
    id: 'tn-cbz-hla',
    type: 'info',
    module: 4,
    title: 'BEFORE Starting Carbamazepine — HLA-B*1502 Screen',
    body: '🛑 **FDA BOXED WARNING (2007).** Before the first dose of carbamazepine OR oxcarbazepine in a patient with ancestry from a population where the HLA-B\\*1502 allele is prevalent, **screen for HLA-B\\*1502**.\n\n**At-risk ancestry (HLA-B\\*1502 prevalence ≥10%):**\n- Han Chinese (10-15%)\n- Thai (8-27%)\n- Filipino\n- Malay\n- Vietnamese\n- Indonesian\n- Southern Indian (variable)\n- Indigenous populations of Southeast Asia\n\nRisk in HLA-B\\*1502-positive patients is several **hundred-fold** elevated for Stevens-Johnson Syndrome (SJS) and Toxic Epidermal Necrolysis (TEN), with mortality up to 30% in TEN.\n\n**Workflow:**\n1. ASK ancestry explicitly — do not assume from name or appearance.\n2. If at-risk ancestry and HLA-B\\*1502 status unknown:\n   • DO NOT start CBZ in the ED.\n   • Order HLA-B\\*1502 testing (send-out lab, results in 1-3 days).\n   • Bridge with [Gabapentin 300 mg PO qHS](#/drug/gabapentin/trigeminal neuralgia) titrated up, OR [Baclofen 5 mg PO TID](#/drug/baclofen/trigeminal neuralgia) titrated, OR IV phenytoin for crisis. Arrange close outpatient follow-up.\n   • If HLA-B\\*1502 POSITIVE: contraindicated; choose oxcarbazepine ONLY after confirming the same allele is also a contraindication (cross-reactivity well-documented — see below) — in HLA-B\\*1502 positive, AVOID BOTH CBZ AND OXCARBAZEPINE; use the adjunct ladder (baclofen / gabapentin / lamotrigine).\n   • If HLA-B\\*1502 NEGATIVE: standard CBZ titration acceptable.\n3. If non-at-risk ancestry: standard CBZ titration without screening.\n\n**Counsel every patient starting CBZ or oxcarbazepine on the rash warning:** any new rash → STOP the drug immediately, ED evaluation. Rash within first 2 months of starting is the highest-risk window.\n\n**Additional baseline labs before starting CBZ:** CBC (aplastic anemia, agranulocytosis), LFTs (hepatotoxicity), basic metabolic panel (baseline sodium — hyponatremia is dose-related).',
    citation: [3, 4, 5],
    next: 'tn-cbz-dose',
    summary: 'HLA-B*1502 screen BEFORE CBZ in Han Chinese / Thai / Vietnamese / Filipino / Malay / Indonesian ancestry. Positive → avoid BOTH CBZ + oxcarb. Counsel rash warning.',
    safetyLevel: 'critical',
  },
  {
    id: 'tn-cbz-dose',
    type: 'info',
    module: 4,
    title: 'Carbamazepine — First-Line Dosing',
    body: '**[Carbamazepine 100 mg PO BID](#/drug/carbamazepine/trigeminal neuralgia)** start.\n\n**Titrate:** increase by 100–200 mg every 3 days as tolerated → target **600–1200 mg/day** divided BID or TID. Maximum 1600 mg/day.\n\n**Efficacy (Wiffen Cochrane 2014):** NNT ~2 for at least 50% pain reduction. ~70% achieve good initial control. Effect dampens over years in ~50% (escape phenomenon).\n\n**Use IR (immediate-release) for ED initiation** because it titrates faster; transition to controlled-release (Tegretol XR, Carbatrol) for outpatient maintenance to flatten peak side effects.\n\n**Side effects to monitor (most common dose-limiting):**\n- Sedation, ataxia, diplopia, dizziness — slow titration if intolerable\n- Hyponatremia (~10% incidence at therapeutic doses; SIADH-like mechanism)\n- Hepatic enzyme induction → multiple drug interactions; auto-induces own metabolism over first month\n- Cytopenias (rare aplastic anemia; more common transient mild leukopenia)\n- Rash (any rash → STOP immediately, ED evaluation)\n\n**Drug interactions worth memorizing (auto-inducer + CYP3A4):** decreases efficacy of warfarin, OCPs, statins, many SSRIs, valproate, many psychotropics. **Increases own metabolism** → patients often need dose escalation in first 4-6 weeks even after symptom control.\n\n**Contraindications absolute:**\n- HLA-B\\*1502 positive in at-risk ancestry (see prior node)\n- Pregnancy (Category D — teratogenic, neural tube defects, craniofacial anomalies)\n- Bone marrow suppression\n- AV block\n- Concurrent MAOI use\n\n**Monitoring after start:**\n- CBC + LFTs + serum sodium at 2-4 weeks, then every 3-6 months\n- Trough drug level (target 4-12 mcg/mL) if breakthrough or toxicity\n- Repeat sodium with any escalation (cumulative hyponatremia risk)',
    citation: [3, 4],
    next: 'tn-cbz-response',
    summary: 'CBZ 100 mg BID → titrate q3d → 600-1200 mg/d (max 1600). NNT 2. Watch Na, CBC, LFTs, rash. Auto-inducer.',
    safetyLevel: 'critical',
  },
  {
    id: 'tn-cbz-response',
    type: 'question',
    module: 4,
    title: 'CBZ Response After Adequate Trial',
    body: 'Adequate trial = titrated to **600 mg/d or maximum tolerated** for **≥3 weeks** at the stable dose. Inadequate response or intolerance triggers the ladder.',
    options: [
      {
        label: 'Pain controlled — maintain CBZ + outpatient follow-up',
        description: 'Continue dose; monitor labs q3-6mo; titrate down annually if remission >6 mo',
        next: 'tn-disposition',
      },
      {
        label: 'CBZ intolerance — sedation/ataxia/rash/hyponatremia',
        description: 'Stop CBZ, move to oxcarbazepine OR adjunct ladder per HLA + Na considerations',
        next: 'tn-ladder',
      },
      {
        label: 'CBZ inadequate response despite max tolerated dose',
        description: 'Add adjunct (baclofen / gabapentin) OR switch to oxcarbazepine',
        next: 'tn-ladder',
        urgency: 'urgent',
      },
    ],
    citation: [4, 8],
    summary: 'Adequate trial = 600 mg/d × 3 wk OR max tolerated. Failure/intolerance → ladder.',
  },

  // ============================================================
  // Module 5 — Ladder: Oxcarbazepine 2L → Baclofen / Gabapentin / Lamotrigine adjuncts
  // ============================================================
  {
    id: 'tn-ladder',
    type: 'info',
    module: 5,
    title: 'Pharmacologic Ladder Beyond CBZ',
    body: '**2L Oxcarbazepine** — [Oxcarbazepine 150 mg PO BID](#/drug/oxcarbazepine/trigeminal neuralgia) start; titrate by 300 mg/week to 1200 mg/day (max 2400 mg/day). Similar efficacy to CBZ (Cruccu Neurology 2008); better tolerability for most patients; fewer drug interactions (weak CYP3A4 inducer).\n\n🛑 **CRITICAL — CBZ-induced HYPONATREMIA: do NOT switch to oxcarbazepine.** Oxcarbazepine causes MORE frequent and MORE severe hyponatremia than CBZ — incidence ~15-30% (severe in ~2-3%) vs CBZ ~10% (severe in ~1%). [Dong J Headache Pain 2005; Berghuis Epilepsia 2017]. Stop the offending Na-lowering anticonvulsant, correct the sodium with fluid restriction ± hypertonic saline if symptomatic, then switch to a **non-Na-lowering alternative** (baclofen, gabapentin, lamotrigine, pregabalin) with neurology input.\n\n**HLA-B\\*1502 considerations apply to oxcarbazepine too** — cross-reactivity with the same allele has been documented. Treat ancestry-based screening the same way as CBZ.\n\n**3L+ Adjuncts (combine with CBZ/oxcarb OR substitute when both contraindicated):**\n- **[Baclofen 5 mg PO TID](#/drug/baclofen/trigeminal neuralgia)** titrate by 5 mg every 3 days to 60-80 mg/day divided TID. Particularly useful for MS-associated TN (Fromm Ann Neurol 1984). Watch sedation, withdrawal seizures if abrupt discontinuation.\n- **[Gabapentin 300 mg PO qHS](#/drug/gabapentin/trigeminal neuralgia)** titrate to 1800-3600 mg/day divided TID over 1-2 weeks (Cheshire J Pain 2002). Renal dosing required. Sedation, peripheral edema common.\n- **[Lamotrigine 25 mg PO daily](#/drug/lamotrigine/trigeminal neuralgia)** with **VERY slow titration** (25 mg every 2 weeks) per the FDA-mandated dose-escalation protocol — Stevens-Johnson risk is dose-related AND titration-rate-related. Target 200-400 mg/day. Any rash → STOP immediately. Reserved for true refractory cases due to titration burden (Zakrzewska Pain 1997).\n- **Pregabalin 75 mg PO BID** — alternative to gabapentin; faster titration, more linear pharmacokinetics. Off-label for TN but widely used.\n\n**Combination therapy:** CBZ + baclofen and CBZ + gabapentin are the most commonly used dual regimens for partial responders. Sequential trials of monotherapy preferred before committing to combinations because monotherapy simplifies subsequent titration and surgical decision-making.',
    citation: [5, 6, 7, 9],
    next: 'tn-refractory',
    summary: '2L oxcarb 150 BID → 1200/d. CBZ-induced hypoNa → do NOT switch to oxcarb. Adjuncts: baclofen, gabapentin, lamotrigine (slow titration!).',
    safetyLevel: 'critical',
  },
  {
    id: 'tn-refractory',
    type: 'question',
    module: 5,
    title: 'Refractory After Adequate Ladder Trial',
    body: '**AAN/EFNS definition of medical refractoriness:** failure of **≥2 first-line agents** (typically CBZ + oxcarbazepine, or CBZ + a different mechanism agent) at **adequate dose and duration** with disabling pain. This triggers surgical referral — do not delay further medical trials at the cost of months of severe pain and weight loss.',
    options: [
      {
        label: 'Adequate response on current regimen — discharge plan',
        description: 'Continue Rx, outpatient follow-up, monitor labs',
        next: 'tn-disposition',
      },
      {
        label: 'Refractory by AAN/EFNS criteria — surgical referral',
        description: 'Proceed to surgical options module',
        next: 'tn-surgical',
        urgency: 'urgent',
      },
    ],
    citation: [8],
    summary: 'Refractory = ≥2 first-line failures at adequate dose/duration. Refer surgical — do not delay.',
  },

  // ============================================================
  // Module 6 — Surgical Referral Criteria
  // ============================================================
  {
    id: 'tn-surgical',
    type: 'info',
    module: 6,
    title: 'Surgical Options for Refractory TN',
    body: 'Four established procedures, each with a distinct trade-off. **Refer to a neurosurgery service with TN experience** — outcomes are operator-dependent.\n\n**1. Microvascular Decompression (MVD) — Jannetta procedure**\n- **Best long-term outcome** for classical (TN1) primary TN with imaging-proven vascular loop\n- Initial pain relief: ~90% (Barker NEJM 1996)\n- Sustained at 10 years: ~70%\n- Definitive — does NOT injure the nerve, preserves sensation\n- Criteria (AAN/EFNS Cruccu 2008):\n  • Refractory to ≥2 first-line agents at adequate dose/duration\n  • Age <70 (relative — fitness matters more than age; carefully selected 70-80 yo do well)\n  • Life expectancy >5 years\n  • MRI demonstrates neurovascular conflict at trigeminal root entry zone\n  • No major comorbidity preventing posterior fossa craniotomy\n- Risks: cranial nerve injury (esp. CN VII, VIII), CSF leak, meningitis, stroke (<1%), mortality ~0.2-0.5%\n\n**2. Percutaneous Glycerol Rhizotomy**\n- Office or short-stay procedure under local + light sedation\n- Initial pain relief ~80%; recurrence in 50% at 5 years (Lopez Neurosurgery 2004)\n- Causes partial sensory loss (numbness) on the affected side\n- Best for: medically refractory + poor surgical candidate (older, multiple comorbidities)\n- Can be repeated\n\n**3. Percutaneous Balloon Compression / Radiofrequency Rhizotomy**\n- Similar profile to glycerol rhizotomy\n- Balloon: ~92% initial relief, ~70% at 1 year, declining over time\n- RF: most controllable for selective fiber injury\n- Trade-off: numbness, occasional dysesthesia or anesthesia dolorosa (rare but devastating)\n\n**4. Stereotactic Radiosurgery (Gamma Knife)**\n- Noninvasive — focused radiation to trigeminal root\n- **Slower onset** (4-8 weeks to maximum effect)\n- Initial pain relief ~70-80% (Régis J Neurosurg 2006)\n- Sustained at 5 years ~50%\n- Lower immediate efficacy than MVD but better long-term tolerability for older/frail patients\n- Reasonable choice for: high surgical risk, MS-associated TN (lower MVD success), patients refusing open surgery\n\n**Selection summary:**\n| Patient Profile | Preferred |\n|---|---|\n| Young + fit + TN1 + vascular loop | MVD |\n| Older + frail + medically refractory | Gamma knife or glycerol rhizotomy |\n| MS-associated TN | Gamma knife (MVD less effective) |\n| TN2 (constant baseline pain) | Counsel reduced MVD success; consider gamma knife or balloon |\n| Bilateral TN | Address one side at a time; consider underlying MS workup |\n\nFor MS-associated TN, also pursue MS-specific therapy in parallel — disease-modifying therapy may reduce paroxysm frequency.',
    citation: [8, 10, 11],
    next: 'tn-pt-ed',
    summary: 'MVD = best for TN1 + vascular loop + fit. Glycerol/balloon/RF rhizotomy for poor surgical candidates. Gamma knife for elderly, MS-TN, refusers.',
  },

  // ============================================================
  // Module 7 — Disposition + Patient Education
  // ============================================================
  {
    id: 'tn-pt-ed',
    type: 'info',
    module: 7,
    title: 'Patient Education — Triggers, Daily Function, ED Return',
    body: '**Trigger avoidance during a flare (most patients learn these intuitively):**\n- Chew on the unaffected side\n- Soft foods (yogurt, smoothies, soup) until under control\n- Wear a scarf over the lower face in cold wind\n- Use lukewarm water for shaving / face washing\n- Electric toothbrush often better tolerated than manual\n- Avoid air conditioner vents blowing on the face\n\n**Nutrition + hydration — under-recognized ED problem:**\n- Severe TN reliably causes weight loss, dehydration, and electrolyte derangement because patients fear chewing and swallowing.\n- Encourage liquid nutritional supplements during a flare.\n- Address ED fluid + electrolyte deficits before discharge; document weight if able.\n\n**Medication counseling:**\n- "Any new rash → STOP the medication immediately and return to the ED." This is non-negotiable for CBZ, oxcarbazepine, and lamotrigine.\n- CBZ + alcohol = additive sedation and ataxia; counsel limit.\n- Do not stop CBZ abruptly — taper if discontinuing (withdrawal seizures possible).\n- CBZ + OCP → decreased OCP efficacy; backup contraception required.\n- Pregnancy planning: CBZ + valproate are teratogenic; switch to baclofen / gabapentin / lamotrigine (with slow titration) **before** conception with neurology input.\n\n**Mental health:**\n- TN has one of the highest suicide rates of any chronic pain syndrome. Screen for SI; provide 988; document.\n- Refer to chronic pain support resources; the Facial Pain Association (fpa-support.org) is patient-led and well-vetted.\n\n**Return immediately for:** any new rash, fever, severe sore throat / mouth ulcers (SJS prodrome), unable to tolerate liquids, severe sedation / ataxia, suicidal ideation, new sensory loss / facial weakness, sudden neurologic symptoms.',
    citation: [4, 8, 12],
    next: 'tn-disposition',
    summary: 'Trigger avoidance, liquid nutrition during flare, rash → STOP + ED, no abrupt CBZ stop, pregnancy planning needs neuro input.',
  },
  {
    id: 'tn-disposition',
    type: 'question',
    module: 7,
    title: 'Disposition',
    body: 'Most TN patients go home with a titration plan + neurology follow-up. Admit thresholds are narrow but specific.',
    options: [
      {
        label: 'Pain controlled OR titration plan + neuro follow-up arranged → discharge',
        description: 'Standard pathway',
        next: 'tn-dispo-discharge',
      },
      {
        label: 'Active crisis, dehydration, weight loss, suicidal ideation, or HLA pending in an at-risk patient',
        description: 'Admit for IV bridging therapy, safety planning, and expedited workup',
        next: 'tn-dispo-admit',
        urgency: 'urgent',
      },
    ],
    citation: [8],
    summary: 'Discharge if controlled + follow-up. Admit for crisis, dehydration, SI, or HLA-pending in at-risk.',
  },
  {
    id: 'tn-dispo-discharge',
    type: 'result',
    module: 7,
    title: 'Discharge Plan',
    body: '**Confirm before discharge:**\n- Ancestry / HLA-B\\*1502 question addressed — if at-risk and unknown, test ordered AND non-CBZ bridge (gabapentin / baclofen) prescribed\n- Initial pharmacologic plan documented with titration schedule:\n  • [Carbamazepine](#/drug/carbamazepine/trigeminal neuralgia) 100 mg BID → titrate q3d → 600 mg/d target (if HLA clear), OR\n  • [Oxcarbazepine](#/drug/oxcarbazepine/trigeminal neuralgia) 150 mg BID → titrate, OR\n  • [Gabapentin](#/drug/gabapentin/trigeminal neuralgia) / [Baclofen](#/drug/baclofen/trigeminal neuralgia) titration if CBZ/oxcarb contraindicated\n- Baseline labs ordered (CBC, BMP, LFTs, sodium) for outpatient follow-up\n- MRI ordered if not already obtained (patients <40, bilateral, atypical, refractory)\n- Counseling completed: rash STOP rule, no abrupt CBZ discontinuation, pregnancy planning, suicide screen\n- Neurology follow-up within 2 weeks (or sooner for atypical / refractory)\n- [TN Steps Summary](#/info/tn-steps) and [Stop / Pitfalls](#/info/tn-stop) reviewed with patient\n- Facial Pain Association (or comparable patient resource) provided\n\n**Return immediately for:** new rash, fever + sore throat (SJS prodrome), unable to tolerate liquids, severe sedation/ataxia, new sensory loss, suicidal ideation.',
    recommendation: 'Discharge with titration plan + safety counseling + neuro follow-up within 2 weeks.',
    confidence: 'definitive',
    citation: [8],
  },
  {
    id: 'tn-dispo-admit',
    type: 'result',
    module: 7,
    title: 'Admit — TN Crisis / Safety / Refractory',
    body: '**Admit when:**\n- Active TN crisis (paroxysms preventing all oral intake; severe dehydration; weight loss)\n- Suicidal ideation\n- HLA-B\\*1502 test pending in at-risk patient who cannot safely bridge as outpatient\n- New atypical features requiring expedited MRI + neuro consult that cannot be arranged outpatient\n- Severe medication adverse event (significant hyponatremia, rash, cytopenia) requiring IV correction + close monitoring\n- Initiation of IV phenytoin/fosphenytoin bridge in a patient who failed all PO trials\n\n**Inpatient orders:**\n- IV fluids + electrolyte repletion; correct sodium cautiously if CBZ/oxcarb-related (target ≤8 mEq/L in 24 h to avoid ODS; cap 10 mEq/L)\n- Inpatient neurology consult\n- IV phenytoin or fosphenytoin loading (15 mg/kg PE over 30 min) if active crisis — under neurology guidance\n- MRI brain with contrast + FIESTA/CISS sequences\n- Psychiatry consult if SI / safety planning needed\n- Pain management consult for refractory cases (consider IV lidocaine infusion under monitoring)',
    recommendation: 'Admit to medicine/neurology; IV bridge therapy + expedited workup + safety planning.',
    confidence: 'recommended',
    citation: [8],
    safetyLevel: 'warning',
  },
];

export const TRIGEMINAL_NEURALGIA_CRITICAL_ACTIONS = [
  { text: 'Screen HLA-B*1502 BEFORE first CBZ or oxcarbazepine dose in Han Chinese / Thai / Vietnamese / Filipino / Malay / Indonesian ancestry.', nodeId: 'tn-cbz-hla' },
  { text: 'MRI brain (with contrast + FIESTA/CISS) BEFORE chronic CBZ in any atypical TN: age <40, bilateral, sensory deficit, V1-only, constant baseline.', nodeId: 'tn-differential' },
  { text: 'CBZ-induced hyponatremia → do NOT switch to oxcarbazepine (oxcarb causes MORE hyponatremia). Switch to non-Na-lowering alt (gabapentin, baclofen, lamotrigine).', nodeId: 'tn-ladder' },
  { text: 'Any new rash on CBZ, oxcarbazepine, or lamotrigine → STOP the drug immediately + ED evaluation (SJS/TEN risk).', nodeId: 'tn-cbz-dose' },
  { text: 'Lamotrigine titration must follow the FDA-mandated slow protocol (25 mg q2wk) — SJS risk is dose- AND titration-rate-related.', nodeId: 'tn-ladder' },
  { text: 'Pregnancy: avoid CBZ and valproate (teratogenic). Plan switch to baclofen / gabapentin / lamotrigine BEFORE conception with neuro input.', nodeId: 'tn-pt-ed' },
  { text: 'Refractory by AAN/EFNS definition (failure of ≥2 first-line agents at adequate dose/duration) = surgical referral. Do not delay.', nodeId: 'tn-refractory' },
  { text: 'Address ED fluid + nutrition deficits — severe TN reliably causes dehydration and weight loss before discharge.', nodeId: 'tn-pt-ed' },
  { text: 'Screen for SI — TN has one of the highest suicide rates among chronic pain syndromes. Provide 988, document.', nodeId: 'tn-pt-ed' },
];

export const TRIGEMINAL_NEURALGIA_CITATIONS: Citation[] = [
  { num: 1, text: 'Headache Classification Committee of the International Headache Society (IHS). The International Classification of Headache Disorders, 3rd edition. Cephalalgia. 2018;38(1):1-211. (ICHD-3 §13.1.1 Trigeminal Neuralgia)' },
  { num: 2, text: 'Cruccu G, Gronseth G, Alksne J, et al. AAN-EFNS guidelines on trigeminal neuralgia management. Eur J Neurol. 2008;15(10):1013-1028. / Neurology. 2008;71(15):1183-1190.' },
  { num: 3, text: 'Burchiel KJ. A new classification for facial pain. Neurosurgery. 2003;53(5):1164-1167.' },
  { num: 4, text: 'Wiffen PJ, Derry S, Moore RA, Kalso EA. Carbamazepine for chronic neuropathic pain and fibromyalgia in adults. Cochrane Database Syst Rev. 2014;(4):CD005451.' },
  { num: 5, text: 'Chung WH, Hung SI, Hong HS, et al. Medical genetics: a marker for Stevens-Johnson syndrome. Nature. 2004;428(6982):486. (HLA-B*1502 first report)' },
  { num: 6, text: 'Fromm GH, Terrence CF, Chattha AS. Baclofen in the treatment of trigeminal neuralgia: double-blind study and long-term follow-up. Ann Neurol. 1984;15(3):240-244.' },
  { num: 7, text: 'Cheshire WP. Defining the role for gabapentin in the treatment of trigeminal neuralgia: a retrospective study. J Pain. 2002;3(2):137-142.' },
  { num: 8, text: 'Bendtsen L, Zakrzewska JM, Heinskou TB, et al. Advances in diagnosis, classification, pathophysiology, and management of trigeminal neuralgia. Lancet Neurol. 2020;19(9):784-796. (consolidated practice update)' },
  { num: 9, text: 'Zakrzewska JM, Chaudhry Z, Nurmikko TJ, Patton DW, Mullens EL. Lamotrigine (Lamictal) in refractory trigeminal neuralgia: results from a double-blind placebo controlled crossover trial. Pain. 1997;73(2):223-230.' },
  { num: 10, text: 'Lopez BC, Hamlyn PJ, Zakrzewska JM. Systematic review of ablative neurosurgical techniques for the treatment of trigeminal neuralgia. Neurosurgery. 2004;54(4):973-982.' },
  { num: 11, text: 'Régis J, Metellus P, Hayashi M, Roussel P, Donnet A, Bille-Turc F. Prospective controlled trial of gamma knife surgery for essential trigeminal neuralgia. J Neurosurg. 2006;104(6):913-924.' },
  { num: 12, text: 'Maarbjerg S, Di Stefano G, Bendtsen L, Cruccu G. Trigeminal neuralgia — diagnosis and treatment. Cephalalgia. 2017;37(7):648-657.' },
  { num: 13, text: 'Dong X, Leppik IE, White J, Rarick J. Hyponatremia from oxcarbazepine and carbamazepine. J Headache Pain. 2005;6(5):360-364.' },
  { num: 14, text: 'Berghuis B, van der Palen J, de Haan GJ, et al. Carbamazepine- and oxcarbazepine-induced hyponatremia in people with epilepsy. Epilepsia. 2017;58(7):1227-1233.' },
  { num: 15, text: 'Barker FG, Jannetta PJ, Bissonette DJ, Larkins MV, Jho HD. The long-term outcome of microvascular decompression for trigeminal neuralgia. N Engl J Med. 1996;334(17):1077-1083.' },
];

export const TRIGEMINAL_NEURALGIA_NODE_COUNT = TRIGEMINAL_NEURALGIA_NODES.length;
export const TRIGEMINAL_NEURALGIA_MODULE_LABELS = [
  'Recognition',
  'Differential',
  'Burchiel',
  'CBZ + HLA',
  'Ladder',
  'Surgical',
  'Disposition',
];
