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
export const CLUSTER_HEADACHE_NODES = [
    // ============================================================
    // Module 1 — Recognition (ICHD-3 §3.1 cluster vs migraine)
    // ============================================================
    {
        id: 'cluster-start',
        type: 'info',
        module: 1,
        title: 'Cluster Headache — ED Approach',
        body: '"Suicide headache." Strictly unilateral, periorbital/temporal, severe (10/10), 15–180 min, with prominent ipsilateral autonomic features (lacrimation, conjunctival injection, ptosis, miosis, rhinorrhea, nasal congestion, eyelid edema, forehead sweating) and **psychomotor agitation** — the patient paces and rocks, distinct from the migraine patient who lies still in the dark.\n\nOpen first:\n- [Cluster Steps Summary](#/info/cluster-steps)\n- [Stop / Pitfalls](#/info/cluster-stop)\n\n**Time-critical work in the next 5 minutes:**\n1. Exclude red flags (Module 2) — SAH, dissection, CVST, hypertensive emergency, AACG. The autonomic features overlap with several mimics.\n2. Place patient on **high-flow O₂ via non-rebreather (NRB) at 12–15 L/min** while you finish the history. Empirical O₂ is both diagnostic and therapeutic; ~78% respond within 15 min. [1, 3]\n3. Confirm ICHD-3 §3.1 phenotype (next node).',
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
        body: '**Required (all 5):**\n- ≥5 lifetime attacks fitting B–D\n- Severe unilateral orbital, supraorbital, or temporal pain\n- Duration 15–180 min (untreated)\n- ≥1 ipsilateral autonomic feature OR sense of restlessness/agitation\n- Frequency 1 every other day → 8/day during a bout\n\n**Phenotype clues that ARE cluster, not migraine:**\n- Patient paces, rocks, cannot sit still (migraine prefers dark/quiet)\n- Strict unilaterality every attack (migraine often alternates sides)\n- Circadian / seasonal pattern — "alarm clock headache" waking patient ~90 min into sleep\n- Bout pattern: weeks to months of attacks separated by months to years of remission (episodic, ~80%) OR no remission >3 months (chronic, ~20%)\n\n**Phenotype clues that suggest a MIMIC, not cluster:**\n- First-ever attack >50 years old → secondary cause until proven otherwise\n- Bilateral or shifting side → reconsider migraine, hemicrania continua, secondary cause\n- Persistent autonomic features outside attacks → pituitary lesion, cavernous sinus pathology — image\n- Cough/Valsalva trigger → cough headache, Chiari, posterior fossa lesion\n- Postural component → CSF leak, IIH, CVST',
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
        body: 'Atypical features make primary cluster unlikely. Imaging (CT → CTA → MRI / MRV depending on suspicion) is warranted before assuming a primary headache disorder.\n\nReturn to the broader headache differential and re-screen for:\n- [SAH](#/tree/sah) — thunderclap onset, Ottawa SAH Rule\n- [Cervical Artery Dissection](#/tree/cervical-artery-dissection) — neck pain, Horner, recent trauma/manipulation\n- [CVST](#/tree/cvst) — postpartum, hypercoagulable, papilledema\n- [AACG](#/tree/aacg) — eye redness/halos, mid-dilated fixed pupil\n- Pituitary apoplexy — sudden severe HA + visual field deficit + ophthalmoplegia\n- Trigeminal autonomic cephalalgia (TAC) variants — paroxysmal hemicrania (indomethacin-responsive), SUNCT/SUNA',
        recommendation: 'Do not treat as primary cluster until red flags excluded and atypical features explained.',
        confidence: 'definitive',
        citation: [12, 13],
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
        body: 'Cluster phenotype mimics several life-threats. **Exclude these before any cluster-specific Rx.** Each item below links directly to its standalone consult — do not skip.\n\n**Systemic** — fever, malignancy, immunocompromise → imaging + workup\n**Secondary risk factors** — pregnancy/postpartum, anticoagulation, recent trauma, recent procedure\n**Neuro deficit** — focal sign, AMS, seizure → [SAH](#/tree/sah) / [ICH](#/tree/ich)\n**Onset thunderclap** — peak <1 min → [SAH](#/tree/sah) workup (Ottawa SAH Rule, non-contrast CT ± LP)\n**Older onset** (>50 yo new HA) — temporal arteritis (ESR/CRP), secondary cause, mass lesion\n**Pattern change** — new HA in someone with prior primary HA disorder → re-image\n**Positional** — worse lying flat (raised ICP) or worse upright (CSF leak)\n**Precipitated by Valsalva / cough / exertion** — Chiari, posterior fossa lesion, RCVS\n**Papilledema** — IIH, CVST, mass\n**Painful eye + autonomic features overlap with cluster:** [AACG](#/tree/aacg) — fixed mid-dilated pupil, hazy cornea, IOP >40\n**Pregnancy / postpartum** — [HTN in Pregnancy / Pre-eclampsia](#/tree/htn-pregnancy), eclampsia, RCVS, CVST\n**Neck pain / Horner / recent neck manipulation** — [Cervical Artery Dissection](#/tree/cervical-artery-dissection)\n**Postpartum + papilledema / seizure** — [CVST](#/tree/cvst)',
        citation: [12, 13, 14],
        next: 'cluster-redflag-q',
        summary: 'SNOOP10 + dedicated links to SAH, ICH, AACG, CAD, CVST, HTN-pregnancy. Exclude before treating cluster.',
        safetyLevel: 'critical',
    },
    {
        id: 'cluster-redflag-q',
        type: 'question',
        module: 2,
        title: 'Any Red Flag Present?',
        body: 'If ANY red flag is positive, this is not "just cluster" — pursue the secondary workup on the relevant consult before returning here.',
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
        citation: [13],
        safetyLevel: 'critical',
    },
    {
        id: 'cluster-redflag-positive',
        type: 'result',
        module: 2,
        title: 'Red Flag Positive — Pursue Secondary Workup',
        body: 'Do not treat as primary cluster. The autonomic features can be present in carotid dissection (Horner), AACG (red eye, mid-dilated pupil), and CVST (with postpartum / hypercoag risk).\n\nOpen the relevant consult:\n- [SAH](#/tree/sah)\n- [ICH](#/tree/ich)\n- [Cervical Artery Dissection](#/tree/cervical-artery-dissection)\n- [CVST](#/tree/cvst)\n- [AACG](#/tree/aacg)\n- [HTN in Pregnancy](#/tree/htn-pregnancy)\n- [Meningitis / Encephalitis](#/tree/meningitis) if fever / immunocompromise\n\nIf the secondary workup is unrevealing AND phenotype remains pure cluster, you may return to this consult.',
        recommendation: 'Complete the secondary workup before initiating cluster-specific therapy.',
        confidence: 'definitive',
        citation: [13],
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
        body: '**100% O₂ at 12–15 L/min via non-rebreather (NRB) for 15 min, patient seated and leaning forward.**\n\n- Onset ~5–10 min, full abort by 15 min in ~78% (Cohen JAMA 2009 RCT, AAN/AHS 2016).\n- **DO NOT use nasal cannula** — peak FiO₂ ~40%, inadequate for cluster.\n- Demand-valve mask delivers higher minute volume and may be more effective if available.\n- No relative contraindications in the ED setting (severe COPD on hypoxic drive is theoretical; brief high-flow for cluster does not blunt drive in a clinically meaningful way).\n- If O₂ aborts the attack: continue O₂ standby script for home (E-cylinder + NRB), arrange neurology follow-up, and proceed to bridge therapy (Module 4) since attacks will recur during the bout.\n\n**Parallel:** if O₂ has not aborted within ~7 min, do not wait the full 15 — give SQ triptan as below.',
        citation: [1, 3],
        next: 'cluster-acute-o2',
        summary: '100% O₂ 12-15 L/min via NRB × 15 min. NOT nasal cannula. ~78% abort. Add triptan if not aborted by 7 min.',
        safetyLevel: 'critical',
    },
    {
        id: 'cluster-acute-o2',
        type: 'question',
        module: 3,
        title: 'Did O₂ Abort the Attack?',
        body: 'Reassess at 7 and 15 min.',
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
        body: '**[Sumatriptan 6 mg SQ × 1](#/drug/sumatriptan/cluster acute)** — onset ≤15 min in ~74% (Ekbom NEJM 1991). Single attack only; **max 2 SQ injections in 24 h** with ≥1 h between.\n\n**Alternative when SQ unavailable, refused, or contraindicated:**\n- **[Zolmitriptan 5 mg intranasal](#/drug/zolmitriptan/cluster acute)** — ~62% at 30 min (Cittadini Arch Neurol 2006). Slower than SQ.\n- PO triptan **NOT preferred** — onset too slow for typical 30–90 min cluster attack.\n\n**Contraindications (absolute):** uncontrolled HTN, known CAD, prior MI or stroke, ergot within 24 h, basilar/hemiplegic migraine variants, pregnancy.\n\n**Serotonin syndrome warning** [FDA 2006]: triptan + SSRI/SNRI/MAOI/linezolid/lithium — risk is low (Cochrane 2018) but counsel patient. If patient is on chronic SSRI and otherwise tolerating triptans, do not withhold acute Rx for cluster.\n\n**Triptan-contraindicated alternative:** [Octreotide 100 mcg SQ × 1](#/drug/octreotide/cluster acute) — non-vasoconstrictor, safe in CAD / uncontrolled HTN; ~52% response at 30 min (Matharu Ann Neurol 2004); slower onset than sumatriptan. Reasonable when triptans absolutely contraindicated.\n\n**Ergot caution:** dihydroergotamine (DHE) has historical efficacy but is **not stocked at most ED pharmacies** in 2026 and overlaps the vasoconstriction risks of triptans. If DHE is on your formulary and triptans contraindicated, neurology-guided IV DHE (Raskin protocol) is an inpatient option — not an ED first move. **Never give DHE within 24 h of any triptan** (additive vasoconstriction).',
        citation: [4, 5, 14],
        next: 'cluster-acute-refractory',
        summary: 'Sumatriptan 6 mg SQ — 74% abort ≤15 min. Alt: zolmitriptan 5 mg IN. Max 2 SQ/24h. Hold ergot 24 h before/after.',
        safetyLevel: 'critical',
    },
    {
        id: 'cluster-acute-refractory',
        type: 'question',
        module: 3,
        title: 'Refractory to O₂ + Triptan — What Next?',
        body: 'A small subset of cluster attacks survive both maximal O₂ and SQ sumatriptan. Options at this point:',
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
        citation: [2, 7, 14],
        summary: 'Refractory: GON block (preferred — also bridges), repeat triptan w/in caps, or IN lidocaine 4%.',
    },
    {
        id: 'cluster-acute-onb',
        type: 'result',
        module: 3,
        title: 'Perform Greater Occipital Nerve Block',
        body: 'Use the dedicated procedure consult — [Greater Occipital Nerve Block](#/tree/occipital-nerve-block) — for landmarks, aspiration check, agent selection, and post-procedure care.\n\nClinical bottom line for cluster:\n- Block the ipsilateral GON only (cluster is unilateral)\n- Bupivacaine 0.5% PLAIN 2–3 mL ± methylprednisolone 40 mg (steroid adjunct preferred for cluster bridge effect, per Leroux Lancet Neurol 2011)\n- Onset 5–15 min, LA duration 4–6 h, steroid-bridge effect weeks\n- Acceptable to perform DURING the active attack if O₂ + triptan have failed\n\nAfter the block, transition to bridge therapy (Module 4) — the block alone does not prevent recurrent attacks during the bout.',
        recommendation: 'GON block now; then move to bridge + maintenance plan.',
        confidence: 'recommended',
        citation: [7],
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
        body: 'Why bridge: verapamil (maintenance prophylaxis, Module 5) takes 2–4 weeks to titrate to effective dose. The bridge suppresses attacks during this window.\n\nTwo evidence-based options — pick based on patient factors:',
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
        citation: [6, 7],
        summary: 'Prednisone 60 mg × 5 d taper OR GON block (preferred in pregnancy, diabetes, osteoporosis).',
    },
    {
        id: 'cluster-bridge-prednisone',
        type: 'info',
        module: 4,
        title: 'Prednisone Bridge',
        body: '**[Prednisone 60 mg PO daily × 5 d](#/drug/prednisone/cluster bridge), then taper 10 mg every 2 d (50 → 40 → 30 → 20 → 10 → 0).** Total course ~15 d.\n\n**Monitoring:** glucose (esp. diabetic), BP, mood (rare steroid psychosis), insomnia. With repeated courses: avascular necrosis, cataract, osteoporosis.\n\n**Cap:** do not repeat the full bridge more than 2–3 times per year due to cumulative steroid toxicity.\n\n**Concurrent action:** START verapamil titration on **day 1** of the prednisone bridge (Module 5) so the steroid taper coincides with reaching effective verapamil dose.\n\n**Counsel patient:** "The steroid covers you for ~2 weeks while we get the verapamil to a dose that prevents attacks. Do not stop the verapamil when the steroid taper ends."',
        citation: [6],
        next: 'cluster-maintenance-start',
        summary: 'Prednisone 60 mg × 5 d → taper 10 mg q2d × 10 d. Start verapamil day 1. Limit to 2-3 bridges/yr.',
    },
    {
        id: 'cluster-bridge-onb',
        type: 'info',
        module: 4,
        title: 'Occipital Nerve Block — Bridge Indication',
        body: 'Greater occipital nerve block with **bupivacaine 0.5% 2–3 mL PLAIN + methylprednisolone 40 mg** on the symptomatic side. The steroid depot provides weeks of suppression — comparable to oral prednisone bridge (Leroux Lancet Neurol 2011) with substantially fewer systemic side effects.\n\nUse the dedicated procedure consult — [Greater Occipital Nerve Block](#/tree/occipital-nerve-block) — for landmarks, aspiration check, contraindications, and post-procedure care.\n\n**Preferred over prednisone when:**\n- Pregnant (oral steroid relative concern; LA + low single-dose steroid acceptable to some — discuss with OB; LA-only block also reasonable)\n- Diabetes (steroid worsens glycemic control)\n- Osteoporosis / prior AVN\n- Steroid intolerance / psychiatric vulnerability\n- Patient preference\n\n**Concurrent action:** START verapamil titration on day 1 (Module 5).',
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
        body: '**[Verapamil](#/drug/verapamil/cluster maintenance) is the first-line prophylactic** for episodic and chronic cluster. Dose required for cluster suppression is **substantially higher** than for any cardiac indication.\n\n**Starting dose:** 80 mg PO TID (240 mg/day total).\n**Titration:** increase by 80 mg every 2 weeks → 320 → 400 → 480 → 560 → 640 → 720 → 800 → 880 → **960 mg/day max**, until attacks suppressed or ECG/side-effect limit reached.\n\n**Bridge while titrating:** continue prednisone taper (Module 4) or repeat ONB at 2 weeks.\n\n**Continue maintenance** through the cluster bout PLUS 2 weeks after attacks cease, then taper by 80 mg every 2 weeks.',
        citation: [8],
        next: 'cluster-verapamil-ecg',
        summary: 'Verapamil 80 mg TID → +80 mg q2wk → max 960 mg/d. Continue 2 wk past attack remission then taper.',
        safetyLevel: 'critical',
    },
    {
        id: 'cluster-verapamil-ecg',
        type: 'info',
        module: 5,
        title: 'Verapamil — ECG Protocol (CRITICAL)',
        body: '🛑 **ECG IS MANDATORY BEFORE EVERY DOSE ESCALATION.**\n\nCohen Neurology 2007 documented **PR prolongation in 19%** and **AV block in 4%** across the cluster-dose titration range.\n\n**Schedule:**\n1. **Baseline 12-lead ECG** before the first dose.\n2. Repeat 12-lead ECG **before EVERY dose escalation** (i.e., before each +80 mg step).\n3. Repeat 12-lead ECG **~10 days after each escalation** (capture late conduction effects).\n\n**HALT titration (do NOT escalate further) if:**\n- PR interval **>0.22 s** (some references use 0.24 s — the more conservative 0.22 s is safer for outpatient titration)\n- New 1st-degree AV block worsening\n- ANY 2nd or 3rd-degree AV block\n- Bradycardia <50 bpm\n- Symptomatic hypotension\n\n**At HALT:** hold escalation, repeat ECG in 1 week. If conduction normalizes, may attempt one more escalation. If not, plateau at current dose or transition to refractory ladder (Module 6).\n\n**Ownership:** outpatient ECG monitoring is the prescribing physician\'s responsibility — neurology or PCP. Document the plan explicitly in the ED note when initiating.',
        citation: [8],
        next: 'cluster-verapamil-response',
        summary: 'Baseline ECG + ECG BEFORE each +80 mg + 10 d after. HALT if PR >0.22 s, AVB, brady <50, sx hypotension.',
        safetyLevel: 'critical',
    },
    {
        id: 'cluster-verapamil-response',
        type: 'question',
        module: 5,
        title: 'Verapamil Response After Adequate Titration',
        body: 'Adequate trial = titrated to **480–960 mg/day** (or to ECG/side-effect limit) **for ≥2 weeks at the maximum tolerated dose**.',
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
        citation: [8],
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
        body: 'After verapamil failure or intolerance, options (typically initiated WITH neurology consult, not as ED monotherapy):\n\n1. **[Lithium carbonate](#/drug/lithium-carbonate/cluster maintenance)** — best evidence for **chronic** cluster (>1 year without remission). Episodic cluster usually does not need lithium.\n2. **[Topiramate](#/drug/topiramate/cluster maintenance)** — useful when verapamil contraindicated (heart block, severe hypotension) or as add-on.\n3. **CGRP monoclonal antibody (galcanezumab 300 mg SQ monthly)** — FDA-approved for episodic cluster prevention (Goadsby NEJM 2019). Outpatient initiation through neurology.\n4. **Greater occipital nerve block, repeated** — bridge while medication changes take effect. Use the [procedure consult](#/tree/occipital-nerve-block).\n5. **Neurology referral** for ongoing management, possible occipital nerve stimulation or sphenopalatine ganglion stimulation in tertiary centers.',
        citation: [9, 10, 11, 14],
        next: 'cluster-lithium',
        summary: 'Refractory ladder: lithium (chronic), topiramate, CGRP mAb (galcanezumab), repeat ONB, neuro referral.',
    },
    {
        id: 'cluster-lithium',
        type: 'info',
        module: 6,
        title: 'Lithium Carbonate (Chronic Cluster)',
        body: '**[Lithium carbonate 300 mg PO BID](#/drug/lithium-carbonate/cluster maintenance)** start; titrate to serum level **0.6–0.8 mEq/L** (lower than bipolar target). Check level 5 days after each dose change.\n\n**Best for:** chronic cluster (no remission >12 months).\n\n**Monitoring (every dose change + every 3 months on stable dose):**\n- Serum lithium level\n- Renal function (Cr, eGFR)\n- Thyroid (TSH, free T4) — hypothyroidism in ~20–30% long-term\n- Calcium — hyperparathyroidism in ~10%\n- ECG if cardiac history\n\n**Narrow therapeutic window:** toxicity begins at >1.2 mEq/L; severe at >2.5 mEq/L (tremor, ataxia, confusion, seizures, dysrhythmia).\n\n**Drug interactions that RAISE lithium level (avoid or dose-adjust):**\n- Thiazides, ACE-I / ARB\n- NSAIDs — including indomethacin used for paroxysmal hemicrania / hemicrania continua\n- Metronidazole\n- Dehydration of any cause (GI illness, heat exposure, diuresis)\n\n**Counsel:** consistent sodium and fluid intake, hold for any GI illness, recheck level within 1 week after any new interacting med.',
        citation: [9, 10],
        next: 'cluster-topiramate',
        summary: 'Lithium 300 BID → titrate to 0.6-0.8 mEq/L. Best for chronic. Beware NSAID/thiazide/ACEi/dehydration interactions.',
        safetyLevel: 'critical',
    },
    {
        id: 'cluster-topiramate',
        type: 'info',
        module: 6,
        title: 'Topiramate (Alternative / Add-on)',
        body: '**[Topiramate 25 mg PO qHS × 1 week](#/drug/topiramate/cluster maintenance)**, increase by 25 mg/week to **100 mg/day divided BID** (50 mg BID). May increase further to 200 mg/day if tolerated.\n\n**Role:** alternative when verapamil contraindicated (heart block, severe hypotension) or ineffective. May be combined with verapamil for refractory chronic cluster. Allow 2–4 weeks at target dose before declaring failure.\n\n**Side effects to monitor:**\n- Paresthesias (very common — usually resolve)\n- Cognitive slowing / word-finding difficulty ("Dopamax") — dose-limiting\n- Kidney stones (≥2 L water/day)\n- Metabolic acidosis (baseline + post-titration serum bicarbonate)\n- Acute angle-closure glaucoma (rare but vision-threatening — counsel)\n- Weight loss / anorexia\n- Oligohidrosis + hyperthermia in children\n\n**Teratogen:** cleft lip/palate risk in 1st trimester. Reliable contraception required for women of childbearing age.',
        citation: [11],
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
        body: '**During a bout, AVOID:**\n- Alcohol (ANY amount — even one drink commonly triggers an attack during an active bout; outside the bout, alcohol does not trigger)\n- Nitroglycerin / nitrate-containing meds\n- High altitude / hypoxic environments\n- Strong solvent or paint fumes\n- Histamine-releasing meds where avoidable\n\n**What to expect:**\n- **Episodic cluster (~80%):** bouts of weeks to months, then remission of months to years. Bouts may be seasonal (spring/fall most common).\n- **Chronic cluster (~20%):** no remission >3 months in a year. More likely to need lithium or CGRP mAb.\n- Circadian rhythm — many attacks wake patient ~90 min after sleep onset (REM-locked).\n\n**Take-home prescriptions for the bout:**\n1. Home **O₂ E-cylinder + NRB mask** (DME order — many insurers cover for cluster diagnosis). Patient should be able to start O₂ at first warning of an attack.\n2. **SQ sumatriptan 6 mg autoinjectors** (Imitrex STATdose) — max 2 doses per 24 h, ≥1 h between.\n3. **IN zolmitriptan 5 mg** as backup if SQ refused/unavailable.\n4. The bridge medication (prednisone taper OR documented ONB plan).\n5. The maintenance prescription (verapamil with explicit titration schedule + ECG follow-up plan).\n\n**Crisis support:** cluster has been called "suicide headache" for a reason. Provide crisis hotline (988), discuss safety planning, ensure follow-up within 1 week.',
        citation: [1, 14, 15],
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
        body: 'Most cluster patients go home from the ED after attack abortion and a bridge plan. Admit only for the specific scenarios below.',
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
        citation: [14],
        summary: 'Discharge if aborted + bridge + maintenance + neuro followup. Admit if refractory, SI, or no outpatient O₂.',
    },
    {
        id: 'cluster-dispo-discharge',
        type: 'result',
        module: 8,
        title: 'Discharge Plan',
        body: '**Confirm before discharge:**\n- Attack aborted in ED (O₂ ± triptan ± ONB)\n- Bridge therapy initiated (prednisone taper started OR ONB performed today)\n- Maintenance started ([verapamil](#/drug/verapamil/cluster maintenance) 80 mg TID with written titration + ECG schedule)\n- Acute rescue prescriptions: [SQ sumatriptan](#/drug/sumatriptan/cluster acute) autoinjector ± [IN zolmitriptan](#/drug/zolmitriptan/cluster acute)\n- Home O₂ ordered (E-cylinder + NRB; insurer-dependent, may require neurology letter)\n- **Neurology follow-up within 1 week** for ongoing titration, ECG review, refractory ladder if needed\n- Safety screen (cluster = "suicide headache" — assess SI, provide 988, document)\n- [Cluster Steps Summary](#/info/cluster-steps) and [Stop / Pitfalls](#/info/cluster-stop) reviewed with patient\n\n**Return immediately for:** new neurologic deficit, severe escalation of pain pattern, syncope, palpitations on verapamil, suicidal ideation.',
        recommendation: 'Discharge with full Rx bundle + neuro followup within 1 week.',
        confidence: 'definitive',
        citation: [14],
    },
    {
        id: 'cluster-dispo-admit',
        type: 'result',
        module: 8,
        title: 'Admit for Refractory Cluster / Safety',
        body: '**Admit when:**\n- Attack does not abort despite O₂ + 2 SQ triptans + ONB + IN lidocaine\n- Active suicidal ideation (cluster carries the highest SI rate of any primary HA disorder)\n- Cannot arrange outpatient O₂ before next anticipated attack (esp. if attacks are circadian-overnight)\n- Initiating lithium without reliable outpatient monitoring\n- Concurrent medical issue (severe verapamil bradycardia, hypotension, electrolyte derangement)\n\n**Inpatient orders:**\n- Continuous O₂ via NRB during attacks; document response\n- Inpatient neurology consult\n- Initiate verapamil titration with daily ECG\n- If chronic cluster + outpatient failures: start lithium with level checks\n- Psychiatry consult if SI / safety planning needed\n- Consider IV DHE protocol (Raskin) under neuro guidance if standard therapy refractory',
        recommendation: 'Admit to medicine/neurology service for inpatient titration + safety planning.',
        confidence: 'recommended',
        citation: [14],
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
];
export const CLUSTER_HEADACHE_CITATIONS = [
    { num: 1, text: 'Robbins MS, Starling AJ, Pringsheim TM, Becker WJ, Schwedt TJ. Treatment of Cluster Headache: The American Headache Society Evidence-Based Guidelines. Headache. 2016;56(7):1093-1106.' },
    { num: 2, text: 'Blumenfeld A, Ashkenazi A, Napchan U, et al. Expert consensus recommendations for the performance of peripheral nerve blocks for headaches—a narrative review. Headache. 2013;53(3):437-446.' },
    { num: 3, text: 'Cohen AS, Burns B, Goadsby PJ. High-flow oxygen for treatment of cluster headache: a randomized trial. JAMA. 2009;302(22):2451-2457.' },
    { num: 4, text: 'Ekbom K, et al. Treatment of acute cluster headache with sumatriptan. N Engl J Med. 1991;325(5):322-326.' },
    { num: 5, text: 'Cittadini E, May A, Straube A, et al. Effectiveness of intranasal zolmitriptan in acute cluster headache: a randomized, placebo-controlled, double-blind crossover study. Arch Neurol. 2006;63(11):1537-1542.' },
    { num: 6, text: 'Mir P, Alberca R, Navarro A, et al. Prophylactic treatment of episodic cluster headache with intravenous bolus of methylprednisolone. J Neurol. 2003;250(10):1232-1234.' },
    { num: 7, text: 'Leroux E, Valade D, Taifas I, et al. Suboccipital steroid injections for transitional treatment of patients with more than two cluster headache attacks per day: a randomised, double-blind, placebo-controlled trial. Lancet Neurol. 2011;10(10):891-897.' },
    { num: 8, text: 'Cohen AS, Matharu MS, Goadsby PJ. Electrocardiographic abnormalities in patients with cluster headache on verapamil therapy. Neurology. 2007;69(7):668-675.' },
    { num: 9, text: 'Bussone G, Leone M, Peccarisi C, et al. Double blind comparison of lithium and verapamil in cluster headache prophylaxis. Headache. 1990;30(7):411-417.' },
    { num: 10, text: 'Steiner TJ, Hering R, Couturier EG, et al. Double-blind placebo-controlled trial of lithium in episodic cluster headache. Cephalalgia. 1997;17(6):673-675.' },
    { num: 11, text: 'Láinez MJ, Pascual J, Pascual AM, Santonja JM, Ponz A, Salvador A. Topiramate in the prophylactic treatment of cluster headache. Headache. 2003;43(7):784-789.' },
    { num: 12, text: 'Headache Classification Committee of the International Headache Society (IHS). The International Classification of Headache Disorders, 3rd edition. Cephalalgia. 2018;38(1):1-211. (ICHD-3 §3.1)' },
    { num: 13, text: 'Godwin SA, Cherkas DS, Panagos PD, Shih RD, Byyny R, Wolf SJ. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the Emergency Department With Acute Headache. Ann Emerg Med. 2019;74(4):e41-e74. (ACEP 2019)' },
    { num: 14, text: 'Ailani J, Burch RC, Robbins MS; Board of Directors of the American Headache Society. The American Headache Society Consensus Statement: Update on integrating new migraine treatments into clinical practice. Headache. 2021;61(7):1021-1039.' },
    { num: 15, text: 'May A, Schwedt TJ, Magis D, Pozo-Rosich P, Evers S, Wang SJ. Cluster headache. Nat Rev Dis Primers. 2018;4:18006.' },
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
