// MedKitt — Cluster Headache (Neurology, dual-listed in EM)
//
// Third split of the headache-hub batch (PLAN.md Phase 5, canary order #3).
// Built AFTER occipital-nerve-block so the bridge / refractory links resolve.
//
// CROSS-LINK DIRECTIONALITY (PLAN.md R8):
//   This file links OUT to existing standalone consults (sah, cervical-artery-
//   dissection, cvst, htn-pregnancy, aacg) and to occipital-nerve-block.
//   It NEVER links back to #/tree/headache-hub — the hub is built last in
//   Phase 7 and back-links would break during the splits-deployed-but-hub-
//   not-yet window.
//
// HIDDEN GATE (PLAN.md R16): this tree id is added to
//   FLAGS.hiddenTreeIds in src/data/feature-flags.ts during staging. Both the
//   category-service.ts post-merge filter and tree-service.ts loadTree() filter
//   refuse to surface it until the canary flip removes the id.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const CLUSTER_HEADACHE_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Recognition (ICHD-3 §3.1 cluster vs migraine)
  // ============================================================
  {
    id: 'cluster-start',
    type: 'info',
    module: 1,
    title: 'Cluster Headache — ED Approach',
    body: '"Suicide headache." Strictly unilateral, periorbital/temporal, severe (10/10), 15–180 min, with prominent ipsilateral autonomic features (lacrimation, conjunctival injection, ptosis, miosis, rhinorrhea, nasal congestion, eyelid edema, forehead sweating) and **psychomotor agitation** — the patient paces and rocks, distinct from the migraine patient who lies still in the dark.\n\nOpen first:\n- [Cluster Steps Summary](#/info/cluster-steps)\n- [Stop / Pitfalls](#/info/cluster-stop)\n\n**Time-critical work in the next 5 minutes:**\n1. Exclude red flags (Module 2) — SAH, dissection, CVST, hypertensive emergency, AACG. The autonomic features overlap with several mimics.\n2. Place patient on **high-flow O₂ via non-rebreather (NRB) at 12–15 L/min** while you finish the history. Empirical O₂ is both diagnostic and therapeutic; ~78% respond within 15 min. [1, 3]\n3. Confirm ICHD-3 §3.1 phenotype (next node).\n\n*Basis: ICHD-3 §3.1 defines the phenotype [12]. High-flow O₂ rendered the patient pain-free or adequately relieved at 15 min in 78% of attacks vs 20% with air in a 109-patient double-blind randomised crossover trial (Cohen, JAMA 2009) [3]; high-flow O₂ carries a Level A recommendation in the AHS 2016 cluster-headache guideline [1].*',
    citation: [1, 3, 12],
    next: 'cluster-phenotype',
    summary: '"Suicide HA" — unilateral, periorbital, 15-180 min, autonomic + restless. Start NRB O₂ ≥12 L/min while excluding red flags.',
    safetyLevel: 'critical',
  },
  {
    id: 'cluster-phenotype',
    type: 'question',
    module: 1,
    title: 'Does this fit ICHD-3 §3.1 cluster?',
    body: '**Required (all 5):**\n- ≥5 lifetime attacks fitting B–D\n- Severe unilateral orbital, supraorbital, or temporal pain\n- Duration 15–180 min (untreated)\n- ≥1 ipsilateral autonomic feature OR sense of restlessness/agitation\n- Frequency 1 every other day → 8/day during a bout\n\n**Phenotype clues that ARE cluster, not migraine:**\n- Patient paces, rocks, cannot sit still (migraine prefers dark/quiet)\n- Strict unilaterality every attack (migraine often alternates sides)\n- Circadian / seasonal pattern — "alarm clock headache" waking patient ~90 min into sleep\n- Bout pattern: weeks to months of attacks separated by months to years of remission (episodic, ~80%) OR no remission >3 months (chronic, ~20%)\n\n**Phenotype clues that suggest a MIMIC, not cluster:**\n- First-ever attack >50 years old → secondary cause until proven otherwise\n- Bilateral or shifting side → reconsider migraine, hemicrania continua, secondary cause\n- Persistent autonomic features outside attacks → pituitary lesion, cavernous sinus pathology — image\n- Cough/Valsalva trigger → cough headache, Chiari, posterior fossa lesion\n- Postural component → CSF leak, IIH, CVST\n\n*Basis: the five required criteria are ICHD-3 §3.1 verbatim [12]; the episodic/chronic proportions, the circadian "alarm clock" pattern and the mimic list are from May, Nat Rev Dis Primers 2018 [15].*',
    options: [
      {
        label: 'Fits ICHD-3 cluster phenotype',
        description: 'Proceed to red-flag exclusion before initiating cluster-specific Rx',
        next: 'cluster-redflags',
        urgency: 'urgent',
      },
      {
        label: 'Atypical — first attack, bilateral, persistent autonomic, postural, or >50 yo onset',
        description: 'Send back through full headache workup before assuming primary cluster',
        next: 'cluster-not-cluster',
      },
    ],
    citation: [12, 15],
    summary: 'Confirm ICHD-3 §3.1 (≥5 attacks, severe unilateral periorbital, 15-180 min, autonomic OR restless, 1qod-8/d).',
  },
  {
    id: 'cluster-not-cluster',
    type: 'result',
    module: 1,
    title: 'Atypical Presentation — Reconsider Diagnosis',
    body: 'Atypical features make primary cluster unlikely. Imaging (CT → CTA → MRI / MRV depending on suspicion) is warranted before assuming a primary headache disorder.\n\nReturn to the broader headache differential and re-screen for:\n- [SAH](#/tree/sah) — thunderclap onset, Ottawa SAH Rule\n- [Cervical Artery Dissection](#/tree/cervical-artery-dissection) — neck pain, Horner, recent trauma/manipulation\n- [CVST](#/tree/cvst) — postpartum, hypercoagulable, papilledema\n- [AACG](#/tree/aacg) — eye redness/halos, mid-dilated fixed pupil\n- Pituitary apoplexy — sudden severe HA + visual field deficit + ophthalmoplegia\n- Trigeminal autonomic cephalalgia (TAC) variants — paroxysmal hemicrania (indomethacin-responsive), SUNCT/SUNA\n\n*Basis: secondary-headache criteria and the TAC differential per ICHD-3 [12] and May, Nat Rev Dis Primers 2018 [15]. ED neuroimaging decisions per the ACEP 2019 clinical policy on adult acute headache [13]. Pituitary and parasellar lesions can reproduce a cluster phenotype; the yield and indications for pituitary MRI in cluster headache are analysed in Grangeon, Cephalalgia 2021 [33].*',
    recommendation: 'Do not treat as primary cluster until red flags excluded and atypical features explained.',
    confidence: 'definitive',
    citation: [12, 13, 15, 33],
    safetyLevel: 'warning',
  },

  // ============================================================
  // Module 2 — Red Flags (DIRECT links to existing standalone consults)
  // ============================================================
  {
    id: 'cluster-redflags',
    type: 'info',
    module: 2,
    title: 'Red-Flag Exclusion — SNOOP10',
    body: 'Cluster phenotype mimics several life-threats. **Exclude these before any cluster-specific Rx.** Each item below links directly to its standalone consult — do not skip.\n\n**Systemic** — fever, malignancy, immunocompromise → imaging + workup\n**Secondary risk factors** — pregnancy/postpartum, anticoagulation, recent trauma, recent procedure\n**Neuro deficit** — focal sign, AMS, seizure → [SAH](#/tree/sah) / [ICH](#/tree/ich)\n**Onset thunderclap** — peak <1 min → [SAH](#/tree/sah) workup (Ottawa SAH Rule, non-contrast CT ± LP)\n**Older onset** (>50 yo new HA) — temporal arteritis (ESR/CRP), secondary cause, mass lesion\n**Pattern change** — new HA in someone with prior primary HA disorder → re-image\n**Positional** — worse lying flat (raised ICP) or worse upright (CSF leak)\n**Precipitated by Valsalva / cough / exertion** — Chiari, posterior fossa lesion, RCVS\n**Papilledema** — IIH, CVST, mass\n**Painful eye + autonomic features overlap with cluster:** [AACG](#/tree/aacg) — fixed mid-dilated pupil, hazy cornea, IOP >40\n**Pregnancy / postpartum** — [HTN in Pregnancy / Pre-eclampsia](#/tree/htn-pregnancy), eclampsia, RCVS, CVST\n**Neck pain / Horner / recent neck manipulation** — [Cervical Artery Dissection](#/tree/cervical-artery-dissection)\n**Postpartum + papilledema / seizure** — [CVST](#/tree/cvst)\n\n*Basis: the red/orange-flag items above are the SNNOOP10 list (Do, Neurology 2019) [35]; ED evaluation and neuroimaging thresholds per the ACEP 2019 clinical policy on adult acute headache [13]; secondary-headache criteria per ICHD-3 [12]; cluster-specific mimics per May, Nat Rev Dis Primers 2018 [15].*',
    citation: [12, 13, 15, 35],
    next: 'cluster-redflag-q',
    summary: 'SNOOP10 + dedicated links to SAH, ICH, AACG, CAD, CVST, HTN-pregnancy. Exclude before treating cluster.',
    safetyLevel: 'critical',
  },
  {
    id: 'cluster-redflag-q',
    type: 'question',
    module: 2,
    title: 'Any Red Flag Present?',
    body: 'If ANY red flag is positive, this is not "just cluster" — pursue the secondary workup on the relevant consult before returning here.\n\n*Basis: SNNOOP10 red/orange flags (Do, Neurology 2019) [35] and the ACEP 2019 clinical policy on adult ED acute headache [13].*',
    options: [
      {
        label: 'No red flags — phenotype is pure cluster',
        description: 'Proceed to acute treatment',
        next: 'cluster-acute-start',
      },
      {
        label: 'Thunderclap, neuro deficit, papilledema, pregnancy, neck pain, eye findings, fever',
        description: 'Stop cluster pathway. Open the relevant consult above.',
        next: 'cluster-redflag-positive',
        urgency: 'critical',
      },
    ],
    citation: [13, 35],
    safetyLevel: 'critical',
  },
  {
    id: 'cluster-redflag-positive',
    type: 'result',
    module: 2,
    title: 'Red Flag Positive — Pursue Secondary Workup',
    body: 'Do not treat as primary cluster. The autonomic features can be present in carotid dissection (Horner), AACG (red eye, mid-dilated pupil), and CVST (with postpartum / hypercoag risk).\n\nOpen the relevant consult:\n- [SAH](#/tree/sah)\n- [ICH](#/tree/ich)\n- [Cervical Artery Dissection](#/tree/cervical-artery-dissection)\n- [CVST](#/tree/cvst)\n- [AACG](#/tree/aacg)\n- [HTN in Pregnancy](#/tree/htn-pregnancy)\n- [Meningitis / Encephalitis](#/tree/meningitis) if fever / immunocompromise\n\nIf the secondary workup is unrevealing AND phenotype remains pure cluster, you may return to this consult.\n\n*Basis: ACEP 2019 clinical policy on adult ED acute headache [13]; SNNOOP10 red/orange-flag list (Do, Neurology 2019) [35]; cluster-mimic autonomic overlap per May, Nat Rev Dis Primers 2018 [15].*',
    recommendation: 'Complete the secondary workup before initiating cluster-specific therapy.',
    confidence: 'definitive',
    citation: [13, 15, 35],
    safetyLevel: 'critical',
  },

  // ============================================================
  // Module 3 — Acute Treatment Algorithm
  // ============================================================
  {
    id: 'cluster-acute-start',
    type: 'info',
    module: 3,
    title: 'Acute Rx — First-Line: 100% O₂',
    body: '**100% O₂ at 12–15 L/min via non-rebreather (NRB) for 15 min, patient seated and leaning forward.**\n\n- Onset ~5–10 min, full abort by 15 min in ~78% (Cohen JAMA 2009 RCT, AAN/AHS 2016).\n- **DO NOT use nasal cannula** — peak FiO₂ ~40%, inadequate for cluster.\n- Demand-valve mask delivers higher minute volume and may be more effective if available.\n- No relative contraindications in the ED setting (severe COPD on hypoxic drive is theoretical; brief high-flow for cluster does not blunt drive in a clinically meaningful way).\n- If O₂ aborts the attack: continue O₂ standby script for home (E-cylinder + NRB), arrange neurology follow-up, and proceed to bridge therapy (Module 4) since attacks will recur during the bout.\n\n**Parallel:** if O₂ has not aborted within ~7 min, do not wait the full 15 — give SQ triptan as below.\n\n*Basis: Cohen, JAMA 2009 — double-blind randomised placebo-controlled crossover trial, 109 adults, 100% inhaled oxygen at 12 L/min by face mask for 15 min at attack onset; pain-free or adequate relief at 15 min in 78% (95% CI 71–85) of oxygen-treated attacks vs 20% (95% CI 14–26) of air-treated attacks, no important adverse events [3]. High-flow oxygen holds a Level A recommendation in the AHS 2016 cluster guideline [1] and is first-line acute therapy in the EAN 2023 guideline [20]. The trial did not test nasal cannula; the cannula caution rests on delivered-FiO₂ limits discussed in those guidelines [1, 20].*',
    citation: [1, 3, 20],
    next: 'cluster-acute-o2',
    summary: '100% O₂ 12-15 L/min via NRB × 15 min. NOT nasal cannula. ~78% abort. Add triptan if not aborted by 7 min.',
    safetyLevel: 'critical',
  },
  {
    id: 'cluster-acute-o2',
    type: 'question',
    module: 3,
    title: 'Did O₂ Abort the Attack?',
    body: 'Reassess at 7 and 15 min.\n\n*Basis: the 15-min oxygen endpoint is the primary endpoint of Cohen, JAMA 2009 [3]; sumatriptan 6 mg SQ has a 15-min response endpoint in the Sumatriptan Cluster Headache Study Group trial [4]; both are Level A acute options in the AHS 2016 guideline [1].*',
    options: [
      {
        label: 'Yes — attack aborted on O₂ alone',
        description: 'Continue O₂ standby plan + move to bridge therapy',
        next: 'cluster-bridge-decision',
      },
      {
        label: 'No — partial response or still in attack at 7-15 min',
        description: 'Add SQ sumatriptan (or IN zolmitriptan if SQ contraindicated)',
        next: 'cluster-acute-triptan',
        urgency: 'urgent',
      },
    ],
    citation: [1, 3, 4],
    summary: 'Reassess at 7 and 15 min; partial response → add triptan.',
  },
  {
    id: 'cluster-acute-triptan',
    type: 'info',
    module: 3,
    title: 'Acute Rx — SQ Sumatriptan',
    body: '**[Sumatriptan 6 mg SQ × 1](#/drug/sumatriptan/cluster acute)** — onset ≤15 min in ~74% (Ekbom NEJM 1991). Single attack only; **max 2 SQ injections in 24 h** with ≥1 h between.\n\n**Alternative when SQ unavailable, refused, or contraindicated:**\n- **[Zolmitriptan 5 mg intranasal](#/drug/zolmitriptan/cluster acute)** — ~62% at 30 min (Cittadini Arch Neurol 2006). Slower than SQ.\n- PO triptan **NOT preferred** — onset too slow for typical 30–90 min cluster attack.\n\n**Contraindications (absolute):** uncontrolled HTN, known CAD, prior MI or stroke, ergot within 24 h, basilar/hemiplegic migraine variants, pregnancy.\n\n**Serotonin syndrome warning** [FDA 2006]: triptan + SSRI/SNRI/MAOI/linezolid/lithium — risk is low (Cochrane 2018) but counsel patient. If patient is on chronic SSRI and otherwise tolerating triptans, do not withhold acute Rx for cluster.\n\n**Triptan-contraindicated alternative:** [Octreotide 100 mcg SQ × 1](#/drug/octreotide/cluster acute) — non-vasoconstrictor, safe in CAD / uncontrolled HTN; ~52% response at 30 min (Matharu Ann Neurol 2004); slower onset than sumatriptan. Reasonable when triptans absolutely contraindicated.\n\n**Ergot caution:** dihydroergotamine (DHE) has historical efficacy but is **not stocked at most ED pharmacies** in 2026 and overlaps the vasoconstriction risks of triptans. If DHE is on your formulary and triptans contraindicated, neurology-guided IV DHE (Raskin protocol) is an inpatient option — not an ED first move. **Never give DHE within 24 h of any triptan** (additive vasoconstriction).\n\n*Basis: sumatriptan 6 mg SQ — randomised, double-blind, placebo-controlled crossover trial in 49 cluster patients (39 fully evaluable); headache severity decreased within 15 min in 74% of sumatriptan-treated attacks vs 26% of placebo attacks, and 46% vs 10% were pain-free at 15 min (Sumatriptan Cluster Headache Study Group, NEJM 1991) [4]. Zolmitriptan nasal spray — randomised, placebo-controlled, double-blind crossover trial in 92 patients; 30-min headache-relief rates were placebo 21%, zolmitriptan 5 mg 40%, zolmitriptan 10 mg 62% (Cittadini, Arch Neurol 2006) [5]. Octreotide 100 mcg SQ — randomised placebo-controlled double-blind crossover trial, 30-min headache response 52% vs 36% placebo (Matharu, Ann Neurol 2004) [19]. The ≥1 h dosing interval, the 2-injection 24-hour maximum, the ergot/DHE-within-24-h rule, and the coronary-artery-disease, prior-MI/stroke, uncontrolled-hypertension, hemiplegic/basilar-migraine and pregnancy contraindications are all from the FDA-approved sumatriptan injection [26] and zolmitriptan nasal spray [27] labels. The serotonin-syndrome caution is the FDA 2006 public-health advisory on triptan + SSRI/SNRI co-prescription [25]; the low observed incidence is from Orlova, JAMA Neurol 2018, a retrospective cohort of patients co-prescribed a triptan with an SSRI/SNRI [24] — note the body text attributes this to a Cochrane review; no Cochrane review of that question was located. Repetitive IV DHE (Raskin protocol) [23].*',
    citation: [4, 5, 19, 23, 24, 25, 26, 27],
    next: 'cluster-acute-refractory',
    summary: 'Sumatriptan 6 mg SQ — 74% abort ≤15 min. Alt: zolmitriptan 5 mg IN. Max 2 SQ/24h. Hold ergot 24 h before/after.',
    safetyLevel: 'critical',
  },
  {
    id: 'cluster-acute-refractory',
    type: 'question',
    module: 3,
    title: 'Refractory to O₂ + Triptan — What Next?',
    body: 'A small subset of cluster attacks survive both maximal O₂ and SQ sumatriptan. Options at this point:\n\n*Basis: greater occipital nerve block — Leroux, Lancet Neurol 2011, randomised double-blind placebo-controlled suboccipital steroid injection trial [7]; block technique per the Blumenfeld expert-consensus recommendations [2]. Intranasal lidocaine for cluster rests on small studies only: Kittrelle, Arch Neurol 1985 (local anaesthetic abortive agents, 4% lidocaine intranasally with the head extended and rotated) [22] and Robbins, Headache 1995 [21]. The ≥1 h interval and 2-injection 24-hour cap on repeat SQ sumatriptan are from the FDA sumatriptan injection label [26].*',
    options: [
      {
        label: 'Greater Occipital Nerve Block (GON)',
        description: 'Bedside ED procedure — bupivacaine ± steroid; 5-15 min onset; doubles as bridge',
        next: 'cluster-acute-onb',
        urgency: 'urgent',
      },
      {
        label: 'Repeat SQ sumatriptan (if ≥1 h since first dose AND <2 doses in 24 h)',
        description: 'Allow only if interval and 24-h cap respected',
        next: 'cluster-bridge-decision',
      },
      {
        label: 'IN lidocaine 4% (4-6 drops to ipsilateral nostril, head extended) — adjunct',
        description: 'Sphenopalatine ganglion blockade; modest evidence; useful when other options exhausted',
        next: 'cluster-bridge-decision',
      },
    ],
    citation: [2, 7, 21, 22, 26],
    summary: 'Refractory: GON block (preferred — also bridges), repeat triptan w/in caps, or IN lidocaine 4%.',
  },
  {
    id: 'cluster-acute-onb',
    type: 'result',
    module: 3,
    title: 'Perform Greater Occipital Nerve Block',
    body: 'Use the dedicated procedure consult — [Greater Occipital Nerve Block](#/tree/occipital-nerve-block) — for landmarks, aspiration check, agent selection, and post-procedure care.\n\nClinical bottom line for cluster:\n- Block the ipsilateral GON only (cluster is unilateral)\n- Bupivacaine 0.5% PLAIN 2–3 mL ± methylprednisolone 40 mg (steroid adjunct preferred for cluster bridge effect, per Leroux Lancet Neurol 2011)\n- Onset 5–15 min, LA duration 4–6 h, steroid-bridge effect weeks\n- Acceptable to perform DURING the active attack if O₂ + triptan have failed\n\nAfter the block, transition to bridge therapy (Module 4) — the block alone does not prevent recurrent attacks during the bout.\n\n*Basis: Leroux, Lancet Neurol 2011 — randomised, double-blind, placebo-controlled trial of suboccipital steroid injection in cluster patients with more than two attacks per day [7]. On the strength of that trial, suboccipital steroid injection is the only preventive intervention carrying a Level A recommendation in the AHS 2016 cluster guideline [1]. Landmarks, aspiration check and agent selection per the Blumenfeld expert-consensus recommendations [2].*',
    recommendation: 'GON block now; then move to bridge + maintenance plan.',
    confidence: 'recommended',
    citation: [1, 2, 7],
    safetyLevel: 'warning',
  },

  // ============================================================
  // Module 4 — Bridge Therapy
  // ============================================================
  {
    id: 'cluster-bridge-decision',
    type: 'question',
    module: 4,
    title: 'Choose Bridge Therapy',
    body: 'Why bridge: verapamil (maintenance prophylaxis, Module 5) takes 2–4 weeks to titrate to effective dose. The bridge suppresses attacks during this window.\n\nTwo evidence-based options — pick based on patient factors:\n\n*Basis: oral prednisone as short-term transitional prevention in episodic cluster — Obermann, Lancet Neurol 2021, multicentre double-blind randomised placebo-controlled trial [16]. The steroid-bridge concept also derives from an older uncontrolled series of IV methylprednisolone followed by oral prednisone (Mir, Neurol Sci 2003) [6]. Greater occipital nerve steroid injection — Leroux, Lancet Neurol 2011 randomised placebo-controlled trial [7]. Both routes are recommended transitional options in the EAN 2023 cluster guideline [20].*',
    options: [
      {
        label: 'Oral Prednisone — first-line if no contraindication',
        description: '60 mg × 5 d, then taper 10 mg q2d × 10 d. Suppresses 70-80% of attacks within 24-48 h.',
        next: 'cluster-bridge-prednisone',
      },
      {
        label: 'Greater Occipital Nerve Block — preferred if pregnant, diabetic, osteoporotic, or steroid-intolerant',
        description: 'Comparable efficacy (Leroux 2011), fewer systemic side effects',
        next: 'cluster-bridge-onb',
      },
    ],
    citation: [6, 7, 16, 20],
    summary: 'Prednisone 60 mg × 5 d taper OR GON block (preferred in pregnancy, diabetes, osteoporosis).',
  },
  {
    id: 'cluster-bridge-prednisone',
    type: 'info',
    module: 4,
    title: 'Prednisone Bridge',
    body: '**[Prednisone 60 mg PO daily × 5 d](#/drug/prednisone/cluster bridge), then taper 10 mg every 2 d (50 → 40 → 30 → 20 → 10 → 0).** Total course ~15 d.\n\n**Monitoring:** glucose (esp. diabetic), BP, mood (rare steroid psychosis), insomnia. With repeated courses: avascular necrosis, cataract, osteoporosis.\n\n**Cap:** do not repeat the full bridge more than 2–3 times per year due to cumulative steroid toxicity.\n\n**Concurrent action:** START verapamil titration on **day 1** of the prednisone bridge (Module 5) so the steroid taper coincides with reaching effective verapamil dose.\n\n**Counsel patient:** "The steroid covers you for ~2 weeks while we get the verapamil to a dose that prevents attacks. Do not stop the verapamil when the steroid taper ends."\n\n*Basis: the only randomised controlled trial of oral prednisone for transitional prevention in episodic cluster is Obermann, Lancet Neurol 2021, which used prednisone 100 mg (or the highest tolerated dose) daily for 5 days followed by a reduction of 20 mg every 3 days [16]; the schedule above is the shorter regimen in common North American practice and is not the regimen tested in that trial. The reference historically cited for the steroid bridge [6] studied IV methylprednisolone 250 mg on 3 consecutive days followed by oral prednisone 90 mg/day tapered over 4 weeks in 14 patients — not oral prednisone 60 mg × 5 days. Glucose, blood-pressure, mood, insomnia, avascular-necrosis, cataract and osteoporosis monitoring per the FDA prednisone label [32]. Transitional corticosteroid use is recommended in the EAN 2023 cluster guideline [20].*',
    citation: [6, 16, 20, 32],
    next: 'cluster-maintenance-start',
    summary: 'Prednisone 60 mg × 5 d → taper 10 mg q2d × 10 d. Start verapamil day 1. Limit to 2-3 bridges/yr.',
  },
  {
    id: 'cluster-bridge-onb',
    type: 'info',
    module: 4,
    title: 'Occipital Nerve Block — Bridge Indication',
    body: 'Greater occipital nerve block with **bupivacaine 0.5% 2–3 mL PLAIN + methylprednisolone 40 mg** on the symptomatic side. The steroid depot provides weeks of suppression — comparable to oral prednisone bridge (Leroux Lancet Neurol 2011) with substantially fewer systemic side effects.\n\nUse the dedicated procedure consult — [Greater Occipital Nerve Block](#/tree/occipital-nerve-block) — for landmarks, aspiration check, contraindications, and post-procedure care.\n\n**Preferred over prednisone when:**\n- Pregnant (oral steroid relative concern; LA + low single-dose steroid acceptable to some — discuss with OB; LA-only block also reasonable)\n- Diabetes (steroid worsens glycemic control)\n- Osteoporosis / prior AVN\n- Steroid intolerance / psychiatric vulnerability\n- Patient preference\n\n**Concurrent action:** START verapamil titration on day 1 (Module 5).\n\n*Basis: Leroux, Lancet Neurol 2011 — randomised, double-blind, placebo-controlled trial of suboccipital steroid injection as transitional treatment in cluster patients with more than two attacks per day [7]; block technique, agent selection and contraindications per the Blumenfeld expert-consensus recommendations [2].*',
    citation: [2, 7],
    next: 'cluster-maintenance-start',
    summary: 'GON block + methylpred 40 mg: comparable to oral prednisone bridge, fewer systemic SE. Use procedure consult.',
  },

  // ============================================================
  // Module 5 — Maintenance Prophylaxis (Verapamil + ECG Protocol)
  // ============================================================
  {
    id: 'cluster-maintenance-start',
    type: 'info',
    module: 5,
    title: 'Maintenance — Verapamil (First-Line)',
    body: '**[Verapamil](#/drug/verapamil/cluster maintenance) is the first-line prophylactic** for episodic and chronic cluster. Dose required for cluster suppression is **substantially higher** than for any cardiac indication.\n\n**Starting dose:** 80 mg PO TID (240 mg/day total).\n**Titration:** increase by 80 mg every 2 weeks → 320 → 400 → 480 → 560 → 640 → 720 → 800 → 880 → **960 mg/day max**, until attacks suppressed or ECG/side-effect limit reached.\n\n**Bridge while titrating:** continue prednisone taper (Module 4) or repeat ONB at 2 weeks.\n\n**Continue maintenance** through the cluster bout PLUS 2 weeks after attacks cease, then taper by 80 mg every 2 weeks.\n\n*Basis: verapamil efficacy in episodic cluster prophylaxis — Leone, Neurology 2000, double-blind double-dummy placebo-controlled study showing significant reduction in attack frequency and abortive-agent consumption [17]. The 240 mg/day start, the +80 mg increment every 2 weeks with a check ECG at each step, and the 960 mg/day ceiling are the titration protocol used in 217 cluster outpatients in Cohen, Neurology 2007 [8]. Verapamil is the first-line preventive in the EAN 2023 cluster guideline [20]. Cluster dosing substantially exceeds labelled cardiovascular dosing and is off-label; product contraindications (severe LV dysfunction, sick sinus syndrome or second/third-degree AV block without a pacemaker, hypotension) are in the FDA verapamil label [28].*',
    citation: [8, 17, 20, 28],
    next: 'cluster-verapamil-ecg',
    summary: 'Verapamil 80 mg TID → +80 mg q2wk → max 960 mg/d. Continue 2 wk past attack remission then taper.',
    safetyLevel: 'critical',
  },
  {
    id: 'cluster-verapamil-ecg',
    type: 'info',
    module: 5,
    title: 'Verapamil — ECG Protocol (CRITICAL)',
    body: '🛑 **ECG IS MANDATORY BEFORE EVERY DOSE ESCALATION.**\n\nCohen Neurology 2007 documented **PR prolongation in 19%** and **AV block in 4%** across the cluster-dose titration range.\n\n**Schedule:**\n1. **Baseline 12-lead ECG** before the first dose.\n2. Repeat 12-lead ECG **before EVERY dose escalation** (i.e., before each +80 mg step).\n3. Repeat 12-lead ECG **~10 days after each escalation** (capture late conduction effects).\n\n**HALT titration (do NOT escalate further) if:**\n- PR interval **>0.22 s** (some references use 0.24 s — the more conservative 0.22 s is safer for outpatient titration)\n- New 1st-degree AV block worsening\n- ANY 2nd or 3rd-degree AV block\n- Bradycardia <50 bpm\n- Symptomatic hypotension\n\n**At HALT:** hold escalation, repeat ECG in 1 week. If conduction normalizes, may attempt one more escalation. If not, plateau at current dose or transition to refractory ladder (Module 6).\n\n**Ownership:** outpatient ECG monitoring is the prescribing physician\'s responsibility — neurology or PCP. Document the plan explicitly in the ED note when initiating.\n\n*Basis: Cohen, Neurology 2007 — audit of 217 cluster outpatients started at verapamil 240 mg/day and increased by 80 mg every 2 weeks with a check ECG at each step to a maximum of 960 mg/day. Of the 108 patients with ECGs available, 21 (19%) had arrhythmias: 13 (12%) first-degree heart block defined as PR >0.2 s (one requiring a permanent pacemaker), 4 junctional rhythm, 1 second-degree heart block, 4 right bundle branch block; bradycardia (HR <60 bpm) occurred in 39 (36%). First-degree block occurred across the whole 240–960 mg/day range. The authors strongly recommend ECG monitoring in all cluster patients on verapamil [8]. Note that the source defines first-degree block at PR >0.2 s, not the >0.22 s halt threshold used above, and does not itself specify a 10-day post-escalation ECG. Conduction monitoring is also required by the EAN 2023 cluster guideline [20] and by the FDA verapamil label [28].*',
    citation: [8, 20, 28],
    next: 'cluster-verapamil-response',
    summary: 'Baseline ECG + ECG BEFORE each +80 mg + 10 d after. HALT if PR >0.22 s, AVB, brady <50, sx hypotension.',
    safetyLevel: 'critical',
  },
  {
    id: 'cluster-verapamil-response',
    type: 'question',
    module: 5,
    title: 'Verapamil Response After Adequate Titration',
    body: 'Adequate trial = titrated to **480–960 mg/day** (or to ECG/side-effect limit) **for ≥2 weeks at the maximum tolerated dose**.\n\n*Basis: the 2-week-per-step escalation interval and the 960 mg/day ceiling are the protocol used in Cohen, Neurology 2007 [8]; verapamil efficacy per Leone, Neurology 2000 [17]; escalation and failure definitions per the EAN 2023 cluster guideline [20].*',
    options: [
      {
        label: 'Attacks suppressed — continue maintenance',
        description: 'Continue through bout + 2 wk, then taper 80 mg q2wk',
        next: 'cluster-pt-ed',
      },
      {
        label: 'Inadequate response OR intolerable conduction/hypotension limits dose',
        description: 'Move to refractory ladder: combine with lithium or topiramate; consider neuro referral for galcanezumab',
        next: 'cluster-refractory-start',
        urgency: 'urgent',
      },
    ],
    citation: [8, 17, 20],
    summary: 'Adequate trial = ≥480 mg/d × ≥2 wk. Failure → refractory ladder.',
  },

  // ============================================================
  // Module 6 — Refractory (lithium, topiramate, CGRP referral)
  // ============================================================
  {
    id: 'cluster-refractory-start',
    type: 'info',
    module: 6,
    title: 'Refractory Cluster — Ladder',
    body: 'After verapamil failure or intolerance, options (typically initiated WITH neurology consult, not as ED monotherapy):\n\n1. **[Lithium carbonate](#/drug/lithium-carbonate/cluster maintenance)** — best evidence for **chronic** cluster (>1 year without remission). Episodic cluster usually does not need lithium.\n2. **[Topiramate](#/drug/topiramate/cluster maintenance)** — useful when verapamil contraindicated (heart block, severe hypotension) or as add-on.\n3. **CGRP monoclonal antibody (galcanezumab 300 mg SQ monthly)** — FDA-approved for episodic cluster prevention (Goadsby NEJM 2019). Outpatient initiation through neurology.\n4. **Greater occipital nerve block, repeated** — bridge while medication changes take effect. Use the [procedure consult](#/tree/occipital-nerve-block).\n5. **Neurology referral** for ongoing management, possible occipital nerve stimulation or sphenopalatine ganglion stimulation in tertiary centers.\n\n*Basis: lithium — Bussone, Headache 1990, double-blind crossover comparison of lithium carbonate and verapamil in chronic cluster [9]; the placebo-controlled trial in episodic cluster (Steiner, Cephalalgia 1997) was stopped at planned sequential analysis because superiority over placebo could not be demonstrated, which is why lithium is positioned for chronic disease only [10]. Topiramate — Láinez, Headache 2003, open prospective series of 26 refractory patients (no randomised trial exists) [11]. Galcanezumab 300 mg SQ — Goadsby, NEJM 2019, randomised placebo-controlled trial in episodic cluster [18]; dosing and FDA-approved indication per the galcanezumab label [31]; integration of CGRP monoclonals into practice per the AHS 2021 consensus statement [14]. Sphenopalatine ganglion stimulation — Goadsby, Lancet Neurol 2019, double-blind randomised sham-controlled trial in chronic cluster [34]. Repeat GON steroid injection — Leroux, Lancet Neurol 2011 [7]. Overall refractory sequencing per the EAN 2023 cluster guideline [20].*',
    citation: [7, 9, 10, 11, 14, 18, 20, 31, 34],
    next: 'cluster-lithium',
    summary: 'Refractory ladder: lithium (chronic), topiramate, CGRP mAb (galcanezumab), repeat ONB, neuro referral.',
  },
  {
    id: 'cluster-lithium',
    type: 'info',
    module: 6,
    title: 'Lithium Carbonate (Chronic Cluster)',
    body: '**[Lithium carbonate 300 mg PO BID](#/drug/lithium-carbonate/cluster maintenance)** start; titrate to serum level **0.6–0.8 mEq/L** (lower than bipolar target). Check level 5 days after each dose change.\n\n**Best for:** chronic cluster (no remission >12 months).\n\n**Monitoring (every dose change + every 3 months on stable dose):**\n- Serum lithium level\n- Renal function (Cr, eGFR)\n- Thyroid (TSH, free T4) — hypothyroidism in ~20–30% long-term\n- Calcium — hyperparathyroidism in ~10%\n- ECG if cardiac history\n\n**Narrow therapeutic window:** toxicity begins at >1.2 mEq/L; severe at >2.5 mEq/L (tremor, ataxia, confusion, seizures, dysrhythmia).\n\n**Drug interactions that RAISE lithium level (avoid or dose-adjust):**\n- Thiazides, ACE-I / ARB\n- NSAIDs — including indomethacin used for paroxysmal hemicrania / hemicrania continua\n- Metronidazole\n- Dehydration of any cause (GI illness, heat exposure, diuresis)\n\n**Counsel:** consistent sodium and fluid intake, hold for any GI illness, recheck level within 1 week after any new interacting med.\n\n*Basis: Bussone, Headache 1990 — double-blind, double-dummy crossover comparison of lithium carbonate and verapamil in chronic cluster; both were effective, verapamil with fewer side effects and shorter latency [9]. Steiner, Cephalalgia 1997 — double-blind placebo-controlled parallel-group trial of slow-release lithium 800 mg/day in episodic cluster, stopped at planned sequential analysis because superiority over placebo could not be demonstrated; plasma lithium was mostly 0.5–0.6 mmol/L [10]. Serum-level monitoring, toxicity thresholds, renal, thyroid and calcium surveillance, and the thiazide, ACE-inhibitor, ARB, NSAID, metronidazole and dehydration interactions are all from the FDA lithium carbonate label, which carries a boxed warning on lithium toxicity and its close relation to serum levels [29].*',
    citation: [9, 10, 29],
    next: 'cluster-topiramate',
    summary: 'Lithium 300 BID → titrate to 0.6-0.8 mEq/L. Best for chronic. Beware NSAID/thiazide/ACEi/dehydration interactions.',
    safetyLevel: 'critical',
  },
  {
    id: 'cluster-topiramate',
    type: 'info',
    module: 6,
    title: 'Topiramate (Alternative / Add-on)',
    body: '**[Topiramate 25 mg PO qHS × 1 week](#/drug/topiramate/cluster maintenance)**, increase by 25 mg/week to **100 mg/day divided BID** (50 mg BID). May increase further to 200 mg/day if tolerated.\n\n**Role:** alternative when verapamil contraindicated (heart block, severe hypotension) or ineffective. May be combined with verapamil for refractory chronic cluster. Allow 2–4 weeks at target dose before declaring failure.\n\n**Side effects to monitor:**\n- Paresthesias (very common — usually resolve)\n- Cognitive slowing / word-finding difficulty ("Dopamax") — dose-limiting\n- Kidney stones (≥2 L water/day)\n- Metabolic acidosis (baseline + post-titration serum bicarbonate)\n- Acute angle-closure glaucoma (rare but vision-threatening — counsel)\n- Weight loss / anorexia\n- Oligohidrosis + hyperthermia in children\n\n**Teratogen:** cleft lip/palate risk in 1st trimester. Reliable contraception required for women of childbearing age.\n\n*Basis: Láinez, Headache 2003 — open prospective series of 26 patients with refractory episodic or chronic cluster, topiramate started at 25 mg once daily and titrated every 3 to 7 days to a maximum of 200 mg/day; six patients discontinued for side effects, all at daily doses over 100 mg. There is no randomised controlled trial of topiramate in cluster headache [11]. Paresthesia, cognitive/language adverse effects, nephrolithiasis and the fluid-intake advice, hyperchloraemic non-anion-gap metabolic acidosis with bicarbonate monitoring, acute secondary angle-closure glaucoma, oligohidrosis and hyperthermia in paediatric patients, weight loss, and the cleft lip/cleft palate teratogenicity warning are all from the FDA topiramate label [30]; cluster headache is not a labelled indication, so this use is off-label.*',
    citation: [11, 30],
    next: 'cluster-pt-ed',
    summary: 'Topiramate 25 mg qHS → 100 mg/d BID. Alternative when verapamil CI. Counsel cognitive SE, stones, contraception.',
  },

  // ============================================================
  // Module 7 — Patient Education
  // ============================================================
  {
    id: 'cluster-pt-ed',
    type: 'info',
    module: 7,
    title: 'Patient Education — Triggers, Bout Pattern, Take-Home Plan',
    body: '**During a bout, AVOID:**\n- Alcohol (ANY amount — even one drink commonly triggers an attack during an active bout; outside the bout, alcohol does not trigger)\n- Nitroglycerin / nitrate-containing meds\n- High altitude / hypoxic environments\n- Strong solvent or paint fumes\n- Histamine-releasing meds where avoidable\n\n**What to expect:**\n- **Episodic cluster (~80%):** bouts of weeks to months, then remission of months to years. Bouts may be seasonal (spring/fall most common).\n- **Chronic cluster (~20%):** no remission >3 months in a year. More likely to need lithium or CGRP mAb.\n- Circadian rhythm — many attacks wake patient ~90 min after sleep onset (REM-locked).\n\n**Take-home prescriptions for the bout:**\n1. Home **O₂ E-cylinder + NRB mask** (DME order — many insurers cover for cluster diagnosis). Patient should be able to start O₂ at first warning of an attack.\n2. **SQ sumatriptan 6 mg autoinjectors** (Imitrex STATdose) — max 2 doses per 24 h, ≥1 h between.\n3. **IN zolmitriptan 5 mg** as backup if SQ refused/unavailable.\n4. The bridge medication (prednisone taper OR documented ONB plan).\n5. The maintenance prescription (verapamil with explicit titration schedule + ECG follow-up plan).\n\n**Crisis support:** cluster has been called "suicide headache" for a reason. Provide crisis hotline (988), discuss safety planning, ensure follow-up within 1 week.\n\n*Basis: alcohol as a bout-limited trigger, the nitroglycerin/histamine provocation model, the circadian and seasonal bout pattern, the roughly 80% episodic / 20% chronic split, and the elevated suicidality of cluster are from May, Nat Rev Dis Primers 2018 [15]. The episodic-versus-chronic definitions (remission periods and the ≥3-month remission-free threshold) are ICHD-3 §3.1.1/§3.1.2 [12]. Home oxygen by non-rebreather is based on the Cohen randomised trial of high-flow oxygen [3] and is a Level A recommendation in the AHS 2016 cluster guideline [1]. The sumatriptan autoinjector maximum of two doses per 24 hours with at least 1 hour between doses is from the FDA sumatriptan injection label [26]; the intranasal zolmitriptan 5 mg dose is from the FDA zolmitriptan nasal spray label [27]. 988 is the US Suicide and Crisis Lifeline.*',
    citation: [1, 3, 12, 15, 26, 27],
    next: 'cluster-dispo',
    summary: 'Avoid alcohol/nitrates during bout. Rx home O₂ + sumatriptan SQ + IN zolmitriptan + bridge + maintenance. Safety check.',
  },

  // ============================================================
  // Module 8 — Disposition
  // ============================================================
  {
    id: 'cluster-dispo',
    type: 'question',
    module: 8,
    title: 'Disposition',
    body: 'Most cluster patients go home from the ED after attack abortion and a bridge plan. Admit only for the specific scenarios below.\n\n*Basis: no trial or guideline defines admission criteria for cluster headache. Outpatient management after acute abortive treatment plus transitional and preventive therapy is the pathway described in the AHS 2016 cluster guideline [1] and the EAN 2023 cluster guideline [20]; neither addresses ED disposition explicitly. The ACEP 2019 clinical policy on acute headache in the ED does not include cluster-specific disposition criteria [13]. The admit triggers listed here are therefore consensus/expert judgment, not guideline-derived.*',
    options: [
      {
        label: 'Aborted in ED + bridge + maintenance + neuro follow-up arranged → discharge',
        description: 'Standard disposition for confirmed cluster',
        next: 'cluster-dispo-discharge',
      },
      {
        label: 'Refractory to all acute Rx, intractable pain, suicidal ideation, or unable to arrange outpatient O₂',
        description: 'Admit for IV cocktail + inpatient neurology consult + safety planning',
        next: 'cluster-dispo-admit',
        urgency: 'urgent',
      },
    ],
    citation: [1, 13, 20],
    summary: 'Discharge if aborted + bridge + maintenance + neuro followup. Admit if refractory, SI, or no outpatient O₂.',
  },
  {
    id: 'cluster-dispo-discharge',
    type: 'result',
    module: 8,
    title: 'Discharge Plan',
    body: '**Confirm before discharge:**\n- Attack aborted in ED (O₂ ± triptan ± ONB)\n- Bridge therapy initiated (prednisone taper started OR ONB performed today)\n- Maintenance started ([verapamil](#/drug/verapamil/cluster maintenance) 80 mg TID with written titration + ECG schedule)\n- Acute rescue prescriptions: [SQ sumatriptan](#/drug/sumatriptan/cluster acute) autoinjector ± [IN zolmitriptan](#/drug/zolmitriptan/cluster acute)\n- Home O₂ ordered (E-cylinder + NRB; insurer-dependent, may require neurology letter)\n- **Neurology follow-up within 1 week** for ongoing titration, ECG review, refractory ladder if needed\n- Safety screen (cluster = "suicide headache" — assess SI, provide 988, document)\n- [Cluster Steps Summary](#/info/cluster-steps) and [Stop / Pitfalls](#/info/cluster-stop) reviewed with patient\n\n**Return immediately for:** new neurologic deficit, severe escalation of pain pattern, syncope, palpitations on verapamil, suicidal ideation.\n\n*Basis: the discharge bundle assembles elements each sourced elsewhere in this consult — high-flow oxygen and verapamil as first-line acute and preventive therapy per the AHS 2016 cluster guideline [1]; transitional (bridge) therapy and neurology follow-up per the EAN 2023 cluster guideline [20]; sumatriptan autoinjector and intranasal zolmitriptan prescribing limits per the FDA labels [26][27]; the ECG-before-titration requirement and the syncope/palpitation return precautions per the FDA verapamil label, which lists AV block, bradycardia and hypotension as dose-related effects [28]. The ACEP 2019 acute-headache clinical policy governs the exclusion of secondary causes before discharge [13]. The specific 1-week follow-up interval and the composite checklist itself are expert consensus, not guideline-specified.*',
    recommendation: 'Discharge with full Rx bundle + neuro followup within 1 week.',
    confidence: 'definitive',
    citation: [1, 13, 20, 26, 27, 28],
  },
  {
    id: 'cluster-dispo-admit',
    type: 'result',
    module: 8,
    title: 'Admit for Refractory Cluster / Safety',
    body: '**Admit when:**\n- Attack does not abort despite O₂ + 2 SQ triptans + ONB + IN lidocaine\n- Active suicidal ideation (cluster carries the highest SI rate of any primary HA disorder)\n- Cannot arrange outpatient O₂ before next anticipated attack (esp. if attacks are circadian-overnight)\n- Initiating lithium without reliable outpatient monitoring\n- Concurrent medical issue (severe verapamil bradycardia, hypotension, electrolyte derangement)\n\n**Inpatient orders:**\n- Continuous O₂ via NRB during attacks; document response\n- Inpatient neurology consult\n- Initiate verapamil titration with daily ECG\n- If chronic cluster + outpatient failures: start lithium with level checks\n- Psychiatry consult if SI / safety planning needed\n- Consider IV DHE protocol (Raskin) under neuro guidance if standard therapy refractory\n\n*Basis: the repetitive IV dihydroergotamine protocol is Raskin, Neurology 1986, an open series in intractable headache [23]. Lithium serum-level monitoring as the reason inpatient initiation may be needed is from the FDA lithium carbonate label and its boxed warning on toxicity in relation to serum levels [29]. Verapamil bradycardia and hypotension as dose-related effects requiring monitoring are from the FDA verapamil label [28]. No trial defines admission criteria for cluster headache; the specific triggers above are expert consensus. Note: DHE is an ergot and must not be given within 24 hours of a triptan [26].*',
    recommendation: 'Admit to medicine/neurology service for inpatient titration + safety planning.',
    confidence: 'recommended',
    citation: [23, 26, 28, 29],
    safetyLevel: 'warning',
  },
];

export const CLUSTER_HEADACHE_CRITICAL_ACTIONS = [
  { text: 'Exclude SAH, dissection, CVST, AACG, hypertensive emergency, and meningitis before treating as primary cluster.', nodeId: 'cluster-redflags' },
  { text: 'High-flow O₂ via NON-REBREATHER at 12-15 L/min (NOT nasal cannula) for 15 min as first-line acute Rx.', nodeId: 'cluster-acute-start' },
  { text: 'SQ sumatriptan 6 mg if O₂ inadequate by 7-15 min; max 2 SQ doses/24 h; no triptan + ergot within 24 h.', nodeId: 'cluster-acute-triptan' },
  { text: 'Start bridge (prednisone taper OR GON block) the same day as verapamil — verapamil takes 2-4 wk to titrate.', nodeId: 'cluster-bridge-decision' },
  { text: '12-lead ECG BEFORE every verapamil titration step + 10 days after each step; halt for PR >0.22 s, AVB, brady <50.', nodeId: 'cluster-verapamil-ecg' },
  { text: 'Lithium for chronic cluster only; titrate to 0.6-0.8 mEq/L; beware NSAID / thiazide / ACE-I / dehydration interactions.', nodeId: 'cluster-lithium' },
  { text: 'Counsel: avoid alcohol and nitrates DURING the bout; safety screen for suicidal ideation (highest SI of any primary HA disorder).', nodeId: 'cluster-pt-ed' },
  { text: 'Discharge bundle: bridge + maintenance + acute rescue + home O₂ + neuro followup within 1 week.', nodeId: 'cluster-dispo-discharge' },
  { text: 'Red flag positive: do not treat as primary cluster — complete the secondary workup first, and open the Meningitis / Encephalitis consult if fever or immunocompromise.', nodeId: 'cluster-redflag-positive' },
  { text: 'Triptan absolute contraindications: uncontrolled HTN, known CAD, prior MI or stroke, ergot within 24 h, basilar/hemiplegic migraine variants, pregnancy.', nodeId: 'cluster-acute-triptan' },
  { text: 'Never give DHE within 24 h of any triptan (additive vasoconstriction).', nodeId: 'cluster-acute-triptan' },
  { text: 'Do not repeat the full prednisone bridge more than 2-3 times per year due to cumulative steroid toxicity.', nodeId: 'cluster-bridge-prednisone' },
  { text: 'Lithium has a narrow therapeutic window: toxicity begins at >1.2 mEq/L; severe at >2.5 mEq/L (tremor, ataxia, confusion, seizures, dysrhythmia).', nodeId: 'cluster-lithium' },
  { text: 'Topiramate is a teratogen (cleft lip/palate, 1st trimester) — reliable contraception required for women of childbearing age.', nodeId: 'cluster-topiramate' },
];

export const CLUSTER_HEADACHE_CITATIONS: Citation[] = [
  { num: 1, text: 'Robbins MS, Starling AJ, Pringsheim TM, Becker WJ, Schwedt TJ. Treatment of Cluster Headache: The American Headache Society Evidence-Based Guidelines. Headache. 2016;56(7):1093-1106. PMID 27432623. doi:10.1111/head.12866' },
  { num: 2, text: 'Blumenfeld A, Ashkenazi A, Napchan U, et al. Expert consensus recommendations for the performance of peripheral nerve blocks for headaches—a narrative review. Headache. 2013;53(3):437-446. PMID 23406160. doi:10.1111/head.12053' },
  { num: 3, text: 'Cohen AS, Burns B, Goadsby PJ. High-flow oxygen for treatment of cluster headache: a randomized trial. JAMA. 2009;302(22):2451-2457. PMID 19996400. doi:10.1001/jama.2009.1855' },
  { num: 4, text: 'The Sumatriptan Cluster Headache Study Group. Treatment of acute cluster headache with sumatriptan. N Engl J Med. 1991;325(5):322-326. PMID 1647496. doi:10.1056/NEJM199108013250505 (Corporate author; PubMed does not index Ekbom K as first author of this record.)' },
  { num: 5, text: 'Cittadini E, May A, Straube A, Evers S, Bussone G, Goadsby PJ. Effectiveness of intranasal zolmitriptan in acute cluster headache: a randomized, placebo-controlled, double-blind crossover study. Arch Neurol. 2006;63(11):1537-1542. PMID 16966497. doi:10.1001/archneur.63.11.nct60002 (30-min headache relief: placebo 21%, zolmitriptan 5 mg 40%, zolmitriptan 10 mg 62%.)' },
  { num: 6, text: 'Mir P, Alberca R, Navarro A, et al. Prophylactic treatment of episodic cluster headache with intravenous bolus of methylprednisolone. Neurol Sci. 2003;24(5):318-321. PMID 14716526. doi:10.1007/s10072-003-0182-3 (Uncontrolled series, n=14: IV methylprednisolone 250 mg daily x 3 days, then oral prednisone 90 mg/day tapered over 4 weeks. Does not establish the oral prednisone 60 mg x 5 day regimen. Citation previously recorded in this file as "J Neurol. 2003;250(10):1232-1234", which does not exist.)' },
  { num: 7, text: 'Leroux E, Valade D, Taifas I, et al. Suboccipital steroid injections for transitional treatment of patients with more than two cluster headache attacks per day: a randomised, double-blind, placebo-controlled trial. Lancet Neurol. 2011;10(10):891-897. PMID 21903477. doi:10.1016/S1474-4422(11)70186-7' },
  { num: 8, text: 'Cohen AS, Matharu MS, Goadsby PJ. Electrocardiographic abnormalities in patients with cluster headache on verapamil therapy. Neurology. 2007;69(7):668-675. PMID 17698788. doi:10.1212/01.wnl.0000267319.18123.d3 (n=217 titrated 240→960 mg/day; of 108 with ECGs, 21 (19%) had arrhythmias, 13 (12%) first-degree block defined as PR >0.2 s, 1 second-degree block, bradycardia in 39 (36%).)' },
  { num: 9, text: 'Bussone G, Leone M, Peccarisi C, et al. Double blind comparison of lithium and verapamil in cluster headache prophylaxis. Headache. 1990;30(7):411-417. PMID 2205598. doi:10.1111/j.1526-4610.1990.hed3007411.x' },
  { num: 10, text: 'Steiner TJ, Hering R, Couturier EG, Davies PT, Whitmarsh TE. Double-blind placebo-controlled trial of lithium in episodic cluster headache. Cephalalgia. 1997;17(6):673-675. PMID 9350389. doi:10.1046/j.1468-2982.1997.1706673.x (NEGATIVE trial — stopped at planned sequential analysis; superiority of lithium over placebo in EPISODIC cluster was not demonstrated.)' },
  { num: 11, text: 'Láinez MJ, Pascual J, Pascual AM, Santonja JM, Ponz A, Salvador A. Topiramate in the prophylactic treatment of cluster headache. Headache. 2003;43(7):784-789. PMID 12890134. doi:10.1046/j.1526-4610.2003.03137.x (Open prospective series, n=26. Not a randomised controlled trial; no RCT of topiramate in cluster headache exists.)' },
  { num: 12, text: 'Headache Classification Committee of the International Headache Society (IHS). The International Classification of Headache Disorders, 3rd edition. Cephalalgia. 2018;38(1):1-211. PMID 29368949. doi:10.1177/0333102417738202 (Cluster headache criteria at §3.1.)' },
  { num: 13, text: 'Godwin SA, Cherkas DS, Panagos PD, Shih RD, Byyny R, Wolf SJ. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the Emergency Department With Acute Headache. Ann Emerg Med. 2019;74(4):e41-e74. PMID 31543134. doi:10.1016/j.annemergmed.2019.07.009 (ACEP 2019. Does not address cluster-specific therapy or ED disposition for cluster.)' },
  { num: 14, text: 'Ailani J, Burch RC, Robbins MS; Board of Directors of the American Headache Society. The American Headache Society Consensus Statement: Update on integrating new migraine treatments into clinical practice. Headache. 2021;61(7):1021-1039. PMID 34160823. doi:10.1111/head.14153 (Scope is MIGRAINE, not cluster headache. Cited here only for CGRP monoclonal antibody practice integration.)' },
  { num: 15, text: 'May A, Schwedt TJ, Magis D, Pozo-Rosich P, Evers S, Wang SJ. Cluster headache. Nat Rev Dis Primers. 2018;4:18006. PMID 29493566. doi:10.1038/nrdp.2018.6' },
  { num: 16, text: 'Obermann M, Nägel S, Ose C, et al. Safety and efficacy of prednisone versus placebo in short-term prevention of episodic cluster headache: a multicentre, double-blind, randomised controlled trial. Lancet Neurol. 2021;20(1):29-37. PMID 33245858. doi:10.1016/S1474-4422(20)30363-X (The only RCT of oral prednisone for transitional prevention; regimen was 100 mg daily x 5 days, then reduced by 20 mg every 3 days.)' },
  { num: 17, text: 'Leone M, D\'Amico D, Frediani F, et al. Verapamil in the prophylaxis of episodic cluster headache: a double-blind study versus placebo. Neurology. 2000;54(6):1382-1385. PMID 10746617. doi:10.1212/wnl.54.6.1382' },
  { num: 18, text: 'Goadsby PJ, Dodick DW, Leone M, et al. Trial of galcanezumab in prevention of episodic cluster headache. N Engl J Med. 2019;381(2):132-141. PMID 31291515. doi:10.1056/NEJMoa1813440' },
  { num: 19, text: 'Matharu MS, Levy MJ, Meeran K, Goadsby PJ. Subcutaneous octreotide in cluster headache: randomized placebo-controlled double-blind crossover study. Ann Neurol. 2004;56(4):488-494. PMID 15455406. doi:10.1002/ana.20210' },
  { num: 20, text: 'May A, Evers S, Goadsby PJ, et al. European Academy of Neurology guidelines on the treatment of cluster headache. Eur J Neurol. 2023;30(10):2955-2979. PMID 37515405. doi:10.1111/ene.15956 (EAN 2023 — current European guideline; supersedes EFNS 2006.)' },
  { num: 21, text: 'Robbins L. Intranasal lidocaine for cluster headache. Headache. 1995;35(2):83-84. PMID 7737866. doi:10.1111/j.1526-4610.1995.hed3502083.x (Small uncontrolled series.)' },
  { num: 22, text: 'Kittrelle JP, Grouse DS, Seybold ME. Cluster headache. Local anesthetic abortive agents. Arch Neurol. 1985;42(5):496-498. PMID 3994568. doi:10.1001/archneur.1985.04060050098017 (Source of the 4% intranasal lidocaine technique with the head extended and rotated to the symptomatic side.)' },
  { num: 23, text: 'Raskin NH. Repetitive intravenous dihydroergotamine as therapy for intractable migraine. Neurology. 1986;36(7):995-997. PMID 3520384. doi:10.1212/wnl.36.7.995 (Open series in intractable headache; the "Raskin protocol". Primary population is migraine.)' },
  { num: 24, text: 'Orlova Y, Rizzoli P, Loder E. Association of coprescription of triptan antimigraine drugs and selective serotonin reuptake inhibitor or selective norepinephrine reuptake inhibitor antidepressants with serotonin syndrome. JAMA Neurol. 2018;75(5):566-572. PMID 29482205. doi:10.1001/jamaneurol.2017.5144 (Retrospective cohort; observed serotonin syndrome incidence was very low. No Cochrane review of this question was identified.)' },
  { num: 25, text: 'US Food and Drug Administration. Public Health Advisory: Combined use of 5-hydroxytryptamine receptor agonists (triptans), selective serotonin reuptake inhibitors (SSRIs) or selective serotonin/norepinephrine reuptake inhibitors (SNRIs) may result in life-threatening serotonin syndrome. 19 July 2006. Archived at https://wayback.archive-it.org/7993/20170112033203/http://www.fda.gov/Drugs/DrugSafety/PostmarketDrugSafetyInformationforPatientsandProviders/ucm085845.htm' },
  { num: 26, text: 'IMITREX (sumatriptan succinate) injection — FDA-approved prescribing information. DailyMed SPL setid fee7d073-0b99-48f2-7985-0d8cf970894b. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fee7d073-0b99-48f2-7985-0d8cf970894b (Source for the 6 mg SQ dose, the 2-injection/24-hour maximum, the ≥1 hour interval, the 24-hour ergot separation rule, and the coronary artery disease, prior MI/stroke, uncontrolled hypertension and hemiplegic/basilar migraine contraindications.)' },
  { num: 27, text: 'ZOMIG (zolmitriptan) nasal spray — FDA-approved prescribing information. DailyMed SPL setid 2438c223-605b-4885-afc3-a6794f190f89. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2438c223-605b-4885-afc3-a6794f190f89' },
  { num: 28, text: 'Verapamil hydrochloride immediate-release tablets — FDA-approved prescribing information. DailyMed SPL setid a0343397-897b-46d6-943f-a87e07e1de10. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a0343397-897b-46d6-943f-a87e07e1de10 (Contraindications: severe LV dysfunction, hypotension, sick sinus syndrome and second/third-degree AV block absent a pacemaker. Cluster dosing exceeds all labelled indications and is off-label.)' },
  { num: 29, text: 'LITHOBID (lithium carbonate) extended-release tablets — FDA-approved prescribing information. DailyMed SPL setid f7f5b69a-c2a1-4586-a189-1475d41387c0. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f7f5b69a-c2a1-4586-a189-1475d41387c0 (BOXED WARNING: lithium toxicity is closely related to serum lithium levels and can occur at doses close to therapeutic levels; serum level monitoring required. Source for the thiazide, ACE inhibitor, ARB, NSAID, metronidazole and dehydration interactions.)' },
  { num: 30, text: 'TOPAMAX (topiramate) tablets and sprinkle capsules — FDA-approved prescribing information. DailyMed SPL setid 21628112-0c47-11df-95b3-498d55d89593. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=21628112-0c47-11df-95b3-498d55d89593 (Source for paresthesia, cognitive/language adverse effects, nephrolithiasis, hyperchloraemic non-anion-gap metabolic acidosis, acute secondary angle-closure glaucoma, oligohidrosis/hyperthermia, weight loss, and the cleft lip/cleft palate teratogenicity warning.)' },
  { num: 31, text: 'EMGALITY (galcanezumab-gnlm) injection — FDA-approved prescribing information. DailyMed SPL setid 33a147be-233a-40e8-a55e-e40936e28db0. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=33a147be-233a-40e8-a55e-e40936e28db0 (Source for the 300 mg SQ episodic cluster headache dosing and indication.)' },
  { num: 32, text: 'Prednisone tablets — FDA-approved prescribing information. DailyMed SPL setid 3400d26a-41cb-40e4-99b4-780e1e0ec561. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3400d26a-41cb-40e4-99b4-780e1e0ec561' },
  { num: 33, text: 'Grangeon L, O\'Connor E, Danno D, et al. Is pituitary MRI screening necessary in cluster headache? Cephalalgia. 2021;41(7):779-788. PMID 33406848. doi:10.1177/0333102420983303' },
  { num: 34, text: 'Goadsby PJ, Sahai-Srivastava S, Kezirian EJ, et al. Safety and efficacy of sphenopalatine ganglion stimulation for chronic cluster headache: a double-blind, randomised controlled trial. Lancet Neurol. 2019;18(12):1081-1090. PMID 31701891. doi:10.1016/S1474-4422(19)30322-9' },
  { num: 35, text: 'Do TP, Remmers A, Schytz HW, et al. Red and orange flags for secondary headaches in clinical practice: SNNOOP10 list. Neurology. 2019;92(3):134-144. PMID 30587518. doi:10.1212/WNL.0000000000006697' },
];

export const CLUSTER_HEADACHE_NODE_COUNT = CLUSTER_HEADACHE_NODES.length;
export const CLUSTER_HEADACHE_MODULE_LABELS = [
  'Recognition',
  'Red Flags',
  'Acute Rx',
  'Bridge',
  'Maintenance',
  'Refractory',
  'Patient Ed',
  'Disposition',
];
