// MedKitt — PTSD Screening in the ED
// Trauma exposure screening, brief intervention, and referral pathway
// Index Trauma → Screening Tools → ASD vs PTSD → Brief Intervention → Pharmacology → Disposition
// 6 modules, 38 nodes total.
export const PTSD_SCREENING_CRITICAL_ACTIONS = [
    { text: 'NEVER prescribe benzodiazepines for acute trauma or established PTSD - worsens trajectory, impairs extinction learning', nodeId: 'ptsd-pharm-avoid' },
    { text: 'NEVER offer single-session psychological debriefing (CISD) - Cochrane shows OR 2.51 for PTSD at 1 year', nodeId: 'ptsd-pfa-protocol' },
    { text: 'NEVER diagnose PTSD before 1 month post-trauma - use ASD pathway for 3d-1mo window', nodeId: 'ptsd-time-window' },
    { text: 'ALWAYS run C-SSRS suicide screen on every PTSD/ASD patient - severity 4-5 = psychiatric admission consideration', nodeId: 'ptsd-cssrs' },
    { text: 'ALWAYS offer warm-handoff referral to trauma-focused CBT (CPT/PE/EMDR) - paper referral is NOT enough', nodeId: 'ptsd-disposition-outpatient' },
    { text: 'IPV screening MUST occur in private - separate patient from accompanying partner before screening', nodeId: 'ptsd-ipv-pathway' },
    { text: 'Sexual assault <120h: activate SANE, RAINN warm handoff, PEP/EC consideration before disposition', nodeId: 'ptsd-sa-acute' },
];
export const PTSD_SCREENING_NODES = [
    // =====================================================================
    // MODULE 1: TRIAGE & INDEX TRAUMA IDENTIFICATION
    // =====================================================================
    {
        id: 'ptsd-start',
        type: 'info',
        module: 1,
        title: 'PTSD Screening — ED Approach',
        body: '**Universal screening at trauma centers is now ACS best-practice standard** (Zatzick stepped care). [1][2]\n\n**DSM-5-TR Criterion A — qualifying trauma:**\n• **A1:** Directly experiencing the event\n• **A2:** Witnessing in person, the event happening to others\n• **A3:** Learning event happened to a close family/friend (must be violent/accidental)\n• **A4:** Repeated/extreme exposure to aversive details (first responders, ED staff)\n\n**Critical:** A4 does NOT apply through media/TV unless work-related. Subjective response (helplessness/horror) was REMOVED from DSM-5/DSM-5-TR. [3]\n\n**Time-window logic** drives pathway:\n• **0-3 days** post-trauma → Acute Stress Reaction (ASR) — not a Dx\n• **3 days - 1 month** → Acute Stress Disorder (ASD)\n• **>1 month** → PTSD pathway\n• **>6 months delayed onset** → PTSD with delayed expression specifier\n\n**ED-relevant trauma yield:** sexual assault (lifetime PTSD 30-50%), IPV (30-60%), refugees (30-60%), MVC (10-25%), medical trauma/ICU (15-30%). [4]',
        citation: [1, 2, 3, 4],
        calculatorLinks: [
            { id: 'pc-ptsd-5', label: 'PC-PTSD-5 Screen' },
            { id: 'pcl-5', label: 'PCL-5 (Full DSM-5-TR)' },
            { id: 'cssrs-screen', label: 'C-SSRS Suicide Screen' },
        ],
        next: 'ptsd-triage',
        summary: 'DSM-5-TR Criterion A: direct/witness/learn-of/repeated exposure; time-window drives pathway: <3d ASR, 3d-1mo ASD, >1mo PTSD',
        skippable: true,
    },
    {
        id: 'ptsd-triage',
        type: 'question',
        module: 1,
        title: 'Triage by Presentation',
        body: 'Select the chief presentation. Each pathway carries specific time-sensitive actions.',
        options: [
            {
                label: 'Recent trauma <1 month + symptomatic',
                description: 'Assault, MVC, witnessed death, peds emergency, medical trauma',
                next: 'ptsd-time-window',
            },
            {
                label: 'Trauma >1 month + intrusion / avoidance / hyperarousal',
                description: 'Nightmares, flashbacks, avoidance, hypervigilance',
                next: 'ptsd-pcl5-screen',
            },
            {
                label: 'Sexual assault — acute (<120 hours)',
                description: 'Time-sensitive: SANE, forensic kit, PEP, emergency contraception',
                next: 'ptsd-sa-acute',
                urgency: 'critical',
            },
            {
                label: 'IPV / domestic violence survivor',
                description: 'PRIVATE screening required — separate from accompanying partner',
                next: 'ptsd-ipv-pathway',
                urgency: 'urgent',
            },
            {
                label: 'High-risk routine screen',
                description: 'Veteran, first responder, refugee/asylum seeker, post-ICU/cardiac arrest',
                next: 'ptsd-pcptsd-screen',
            },
        ],
        summary: 'Triage: recent <1mo→ASD pathway; >1mo+sx→PCL-5; SA<120h→SANE; IPV→private screen; high-risk→PC-PTSD-5',
    },
    {
        id: 'ptsd-time-window',
        type: 'question',
        module: 1,
        title: 'Time Since Trauma',
        body: '**Time window determines diagnosis pathway** — never diagnose PTSD before 1 month. [3][5]\n\n**0-3 days:** Acute Stress Reaction (ASR) — ICD term, NOT a DSM-5-TR diagnosis. PFA + reassurance only.\n\n**3 days - 1 month:** Acute Stress Disorder (ASD). Requires ≥9 of 14 symptoms across 5 categories (intrusion, negative mood, dissociation, avoidance, arousal). Total symptom count, NOT cluster-by-cluster.\n\n**>1 month:** PTSD pathway. PCL-5 cluster scoring applies.\n\n**Predictive value of ASD for later PTSD is LIMITED** — Bryant review: ASD identifies SOME cases but MISSES the majority of eventual PTSD. A negative ASD screen does NOT rule out future PTSD. [6]',
        citation: [3, 5, 6],
        options: [
            {
                label: '0-3 days post-trauma',
                description: 'Acute Stress Reaction — PFA + reassurance, no Dx',
                next: 'ptsd-asr-management',
            },
            {
                label: '3 days - 1 month post-trauma',
                description: 'Acute Stress Disorder pathway',
                next: 'ptsd-asd-screen',
            },
            {
                label: 'More than 1 month post-trauma',
                description: 'PTSD pathway — full PCL-5 screen',
                next: 'ptsd-pcl5-screen',
            },
        ],
        summary: 'Time gates Dx: 0-3d=ASR (no Dx), 3d-1mo=ASD (≥9/14 sx), >1mo=PTSD; ASD misses majority of eventual PTSD',
    },
    // =====================================================================
    // MODULE 2: SCREENING TOOLS
    // =====================================================================
    {
        id: 'ptsd-pcptsd-screen',
        type: 'info',
        module: 2,
        title: 'PC-PTSD-5 Screen (5-item)',
        body: '**JCAHO/Joint Commission and VA/DoD endorsed primary screen.** [7]\n\n**Performance characteristics (Prins 2016):**\n• AUC > 0.92, kappa ≥ 0.75\n• **Cutoff ≥3** = optimally sensitive (94.8%) — best for ED screening\n• **Cutoff ≥4** = optimally balanced (men/overall sample)\n• Women may need cutoff ≥3 to avoid false negatives\n\n**Stem question first:** Has the patient ever experienced a Criterion A trauma? If NO — do not score symptom items.\n\n**Caveat:** Avoid PC-PTSD-5 during acute crisis states (transient elevations may produce false positives). Best for ≥1 month post-trauma or chronic trauma history identification.',
        citation: [7],
        calculatorLinks: [
            { id: 'pc-ptsd-5', label: 'PC-PTSD-5 Calculator' },
        ],
        next: 'ptsd-pcptsd-result',
        summary: 'PC-PTSD-5: 5 items, JCAHO/VA endorsed; cutoff ≥3 sens, ≥4 balanced; stem question gates symptom items',
    },
    {
        id: 'ptsd-pcptsd-result',
        type: 'question',
        module: 2,
        title: 'PC-PTSD-5 Result',
        body: 'Use the PC-PTSD-5 calculator and select the result band.',
        options: [
            {
                label: 'Score ≥3 — Positive screen',
                description: 'Proceed to PCL-5 for full DSM-5-TR characterization',
                next: 'ptsd-pcl5-screen',
            },
            {
                label: 'Score 0-2 — Negative screen',
                description: 'Document, provide patient education, follow-up if symptoms emerge',
                next: 'ptsd-asr-management',
            },
        ],
        summary: 'PC-PTSD-5: ≥3 → PCL-5; 0-2 → document, education, follow-up if sx emerge',
    },
    {
        id: 'ptsd-pcl5-screen',
        type: 'info',
        module: 2,
        title: 'PCL-5 Full DSM-5-TR Screen',
        body: '**20-item self-report, fully aligned with DSM-5-TR.** [8]\n\n**Scoring:** Each item 0 (Not at all) to 4 (Extremely); total range 0-80.\n\n**Probable PTSD cutoff: 31-33** (Bovin 2016, National Center for PTSD). Population-specific variation 23-49 across studies. [9]\n\n**Two scoring methods:**\n• **Total severity ≥31-33** → probable PTSD (most reliable single metric)\n• **DSM-5-TR cluster rule:** items rated ≥2 ("Moderately") count as endorsed:\n  - ≥1 of B (items 1-5, intrusion)\n  - ≥1 of C (6-7, avoidance)\n  - ≥2 of D (8-14, negative cognitions/mood)\n  - ≥2 of E (15-20, arousal)\n\n**Treatment monitoring:** ~10-point reduction = clinically meaningful response. PCL-5 <28 after treatment = clinically significant change (Marx 2022).\n\n**PCL-5 is NOT a stand-alone diagnostic tool** — gold standard remains CAPS-5 structured interview.',
        citation: [8, 9],
        calculatorLinks: [
            { id: 'pcl-5', label: 'PCL-5 Calculator' },
        ],
        next: 'ptsd-pcl5-result',
        summary: 'PCL-5: 20 items, DSM-5-TR aligned; cutoff 31-33; cluster rule needs B≥1, C≥1, D≥2, E≥2 (items rated ≥2)',
    },
    {
        id: 'ptsd-pcl5-result',
        type: 'question',
        module: 2,
        title: 'PCL-5 Result',
        body: 'Use the PCL-5 calculator and select the result band.',
        options: [
            {
                label: 'Total ≥33 OR meets DSM-5-TR cluster rule',
                description: 'Probable PTSD — proceed to brief intervention + warm-handoff referral',
                next: 'ptsd-cssrs',
            },
            {
                label: 'Total 23-32 — Subthreshold',
                description: 'Subthreshold; warrants follow-up + symptom-targeted treatment if functional impairment',
                next: 'ptsd-cssrs',
            },
            {
                label: 'Total <23 — Below threshold',
                description: 'Below threshold; provide education, return precautions, optional follow-up',
                next: 'ptsd-cssrs',
            },
        ],
        summary: 'PCL-5: ≥33 probable PTSD; 23-32 subthreshold; <23 below; ALL pathways → C-SSRS suicide screen',
    },
    {
        id: 'ptsd-asd-screen',
        type: 'info',
        module: 2,
        title: 'Acute Stress Disorder Screen (DSM-5-TR)',
        body: '**ASD (3 days - 1 month post-trauma):** Requires ≥9 of 14 symptoms across 5 categories. [3]\n\n**Categories (any combination, total ≥9):**\n• **Intrusion** (5): recurrent memories, dreams, dissociative reactions/flashbacks, distress at cues, physiological reactivity\n• **Negative mood** (1): persistent inability to experience positive emotions\n• **Dissociative** (2): altered sense of reality, inability to remember key trauma aspects\n• **Avoidance** (2): efforts to avoid memories/thoughts, efforts to avoid external reminders\n• **Arousal** (5): sleep disturbance, irritable behavior, hypervigilance, problems with concentration, exaggerated startle\n\n**Functional impairment required.**\n\n**Distinct from ASR** (ICD): ASR = 0-3 days, normal acute response, NOT a DSM-5-TR Dx.\n\n**ASD is a TOTAL count, not cluster-based** (unlike PTSD).',
        citation: [3],
        options: [
            {
                label: '≥9 of 14 symptoms + functional impairment',
                description: 'ASD diagnosis — PFA + close follow-up + sleep support if needed',
                next: 'ptsd-asd-management',
            },
            {
                label: '<9 symptoms OR no impairment',
                description: 'Subthreshold — supportive care, education, follow-up at 2-4 weeks',
                next: 'ptsd-asr-management',
            },
        ],
        summary: 'ASD (DSM-5-TR): ≥9/14 sx across 5 categories + impairment; ASR (ICD, 0-3d) is NOT a DSM Dx',
    },
    {
        id: 'ptsd-cssrs',
        type: 'question',
        module: 2,
        title: 'C-SSRS Suicide Screen — MANDATORY',
        body: '**Every PTSD/ASD patient gets a suicide screen.** [10][11]\n\n**Columbia Suicide Severity Rating Scale (Screen Version):** FDA-recommended, validated in ED including PTSD/veteran populations.\n\n• **Severity 1-3** (ideation without method/intent/plan) = low/moderate risk\n• **Severity 4-5** (active method/intent/plan) = HIGH risk → psychiatric admission consideration\n• **Any "yes" to behavior section in past 3 months** = HIGH risk\n\n**Performance:** In 18,684 psychiatric ED patients, optimal cutoff carried adjusted OR 4.7 for suicide death within 1 week (Legarreta 2015).',
        citation: [10, 11],
        calculatorLinks: [
            { id: 'cssrs-screen', label: 'C-SSRS Calculator' },
        ],
        safetyLevel: 'critical',
        options: [
            {
                label: 'C-SSRS severity 4-5 OR recent behavior',
                description: 'HIGH risk — psychiatric consult, 1:1 observation, lethal means counseling',
                next: 'ptsd-disposition-admit',
                urgency: 'critical',
            },
            {
                label: 'C-SSRS severity 1-3, no behavior',
                description: 'Low/moderate risk — proceed to brief ED intervention',
                next: 'ptsd-pfa-protocol',
            },
            {
                label: 'C-SSRS negative',
                description: 'No suicidal ideation — proceed to brief intervention',
                next: 'ptsd-pfa-protocol',
            },
        ],
        summary: 'C-SSRS mandatory for every PTSD pt; severity 4-5 OR recent behavior = HIGH risk = psych consult',
    },
    // =====================================================================
    // MODULE 3: ASR / ASD INITIAL MANAGEMENT
    // =====================================================================
    {
        id: 'ptsd-asr-management',
        type: 'result',
        module: 3,
        title: 'Acute Stress Reaction (0-3 days)',
        body: '**Normal acute response — NOT a DSM-5-TR diagnosis.** [3][12]\n\n**Management:**\n• **Psychological First Aid (PFA)** — 5 elements (see [PFA protocol](#/info/ptsd-pfa-protocol))\n• Reassurance: stress reactions in first month are EXPECTED (sleep disturbance, intrusions, avoidance, irritability)\n• Written discharge materials (PTSD Coach app: free, NCPTSD)\n• **Avoid pharmacotherapy** unless medical stabilization required\n• Specifically AVOID: benzodiazepines (worsen PTSD trajectory), single-session debriefing/CISD (Cochrane: OR 2.51 for PTSD at 1y)\n• Outpatient follow-up at 2-4 weeks for re-screen\n• Anticipatory guidance to caregivers (NICE NG116) — especially for pediatric patients\n\n**For pediatric patients:** Per NICE NG116, give parents anticipatory guidance about normal trauma responses, common PTSD symptoms (nightmares, intrusive thoughts, behavioral changes, hypervigilance, sleep difficulty), and instruction to contact GP if symptoms persist >1 month.',
        recommendation: '**ASR management: PFA + reassurance + written materials + 2-4 week follow-up; AVOID benzos + CISD; anticipatory guidance for caregivers.**',
        confidence: 'definitive',
        citation: [3, 12],
        summary: 'ASR (0-3d): PFA + reassurance + 2-4wk FU; AVOID benzos + CISD; pediatric → caregiver anticipatory guidance',
    },
    {
        id: 'ptsd-asd-management',
        type: 'result',
        module: 3,
        title: 'Acute Stress Disorder Management',
        body: '**ASD (3d-1mo, ≥9/14 symptoms + impairment).** [3][12]\n\n**Management:**\n• **Psychological First Aid** — see [PFA protocol](#/info/ptsd-pfa-protocol)\n• **Trauma-focused CBT referral** — early TF-CBT can reduce PTSD progression\n• **Sleep support** if needed (non-benzo): [hydroxyzine](#/drug/hydroxyzine/anxiety) 25-100 mg qhs OR [trazodone](#/drug/trazodone/insomnia) 25-100 mg qhs (counsel re priapism)\n• **C-SSRS** suicide screen (mandatory)\n• Safety plan if any IPV/SI/unsafe living\n• Warm-handoff referral to mental health within 1-2 weeks\n• AVOID: benzodiazepines, propranolol prophylaxis, CISD/debriefing\n\n**Pharmacology in ASD window:** Most acute-window pharmacoprevention has FAILED in trials. SSRIs are not first-line during ASD window — their evidence is in chronic PTSD (>1mo).',
        recommendation: '**ASD: PFA + early TF-CBT referral + non-benzo sleep support + C-SSRS + safety plan + warm-handoff in 1-2wk.**',
        confidence: 'definitive',
        citation: [3, 12],
        summary: 'ASD: PFA + early TF-CBT referral + hydroxyzine/trazodone for sleep + C-SSRS + warm handoff 1-2wk',
    },
    // =====================================================================
    // MODULE 4: BRIEF ED INTERVENTION
    // =====================================================================
    {
        id: 'ptsd-pfa-protocol',
        type: 'info',
        module: 4,
        title: 'Psychological First Aid (PFA) — ED Protocol',
        body: '**WHO/IASC/NICE-recommended early intervention.** [12][13][14]\n\n**Hobfoll 5 elements:** safety, calming, self/community efficacy, connectedness, hope.\n\n**ED PFA in 5 minutes (5 actions):**\n1. **Listen and validate** — NO forced disclosure of trauma details\n2. **Provide accurate information** — about the event and normal stress reactions\n3. **Practical assistance** — transportation, food, contacts, shelter\n4. **Connect to social support** — family, friends, community\n5. **Refer** — formal services for those with persistent or severe symptoms\n\n**STRONG WARN: Single-session psychological debriefing / CISD is HARMFUL.**\nCochrane review (Rose 2002): OR 2.51 (95% CI 1.24-5.09) for PTSD at 1 year in those who received debriefing. WHO and 2023 VA/DoD CPG strongly recommend AGAINST. [15][16]\n\n**Stepped Care (Zatzick / ACS-endorsed):**\n• Step 1: Universal screening + post-injury case management\n• Step 2: Motivational interviewing for substance use\n• Step 3: Evidence-based pharmacotherapy and/or trauma-focused CBT for persistent symptoms at 3 months\n\n**Cultural considerations:**\n• Use trained medical interpreters; family members should NOT interpret trauma content\n• Refugee/asylum populations: validated tools include Harvard Trauma Questionnaire (HTQ)\n• IPV screening must occur in private, separate from accompanying partner',
        citation: [12, 13, 14, 15, 16],
        next: 'ptsd-pharm-decision',
        summary: 'PFA 5 elements: listen, info, practical, connect, refer; AVOID CISD (Cochrane OR 2.51); Stepped Care = ACS std',
        safetyLevel: 'warning',
    },
    {
        id: 'ptsd-tf-cbt-referral',
        type: 'info',
        module: 4,
        title: 'Trauma-Focused CBT — Gold Standard Referral',
        body: '**2023 VA/DoD CPG (published Annals 2024):** Three trauma-focused psychotherapies are first-line OVERALL for PTSD (preferred over pharmacotherapy). [17]\n\n**1. Cognitive Processing Therapy (CPT)** — addresses stuck points and trauma-related cognitions\n\n**2. Prolonged Exposure (PE)** — graded exposure to trauma memories and avoided situations\n\n**3. Eye Movement Desensitization and Reprocessing (EMDR)** — bilateral stimulation during trauma processing\n\n**ED action:** Warm referral (call to therapist, scheduled appointment, accompanied phone introduction). Warm handoff substantially outperforms paper referral, especially for at-risk populations.\n\n**Resources for warm handoff:**\n• Local trauma-focused therapist directory\n• PTSD Coach app (free, NCPTSD)\n• Vet Center walk-in (1-877-WAR-VETS)\n• 988 Suicide & Crisis Lifeline (call/text/chat)\n• Telehealth platforms with PTSD focus',
        citation: [17],
        next: 'ptsd-pharm-decision',
        summary: 'TF-CBT first-line: CPT, PE, EMDR (VA/DoD 2023); warm handoff > paper referral; PTSD Coach app + 988',
    },
    // =====================================================================
    // MODULE 5: PHARMACOLOGY PEARLS
    // =====================================================================
    {
        id: 'ptsd-pharm-decision',
        type: 'question',
        module: 5,
        title: 'Pharmacology Decision',
        body: '**Most ED clinicians do NOT initiate chronic PTSD pharmacotherapy** — defer to psychiatry/PCP follow-up. However, ED-relevant scenarios do exist.',
        options: [
            {
                label: 'Chronic PTSD established >1 mo, willing to start',
                description: 'First-line SSRI; counsel re 4-6 wk onset, transient activation',
                next: 'ptsd-pharm-firstline',
            },
            {
                label: 'Trauma-related nightmares dominant',
                description: 'Prazosin titration (Raskind protocol)',
                next: 'ptsd-pharm-prazosin',
            },
            {
                label: 'Sleep impairment without nightmares',
                description: 'Non-benzo sleep bridges (hydroxyzine, trazodone, mirtazapine)',
                next: 'ptsd-pharm-sleep',
            },
            {
                label: 'What to AVOID',
                description: 'Benzodiazepines, propranolol prophylaxis, CISD',
                next: 'ptsd-pharm-avoid',
            },
            {
                label: 'Skip pharm — go to disposition',
                description: 'Defer all pharm decisions to outpatient follow-up',
                next: 'ptsd-disposition-decision',
            },
        ],
        summary: 'Pharm decision: SSRI for chronic, prazosin for nightmares, non-benzo for sleep; AVOID benzos/CISD',
    },
    {
        id: 'ptsd-pharm-firstline',
        type: 'result',
        module: 5,
        title: 'First-Line PTSD Pharmacotherapy',
        body: '**2023 VA/DoD CPG Recommendation 15** — three agents recommended: [17]\n\n**[Sertraline](#/drug/sertraline/ptsd) (Zoloft)** — FDA-approved for PTSD\n• Start: 25 mg PO daily × 1 week\n• Target: 50-200 mg/day\n\n**[Paroxetine](#/drug/paroxetine/ptsd) (Paxil)** — FDA-approved for PTSD\n• Start: 10 mg PO daily\n• Target: 20-50 mg/day\n\n**[Venlafaxine XR](#/drug/venlafaxine-xr/ptsd) (Effexor)** — off-label, recommended\n• Start: 37.5 mg PO daily\n• Target: 75-300 mg/day\n\n**Notable change:** Fluoxetine was REMOVED from recommended list in 2023 CPG (no benefit in newer clinician-rated trial).\n\n**Pearls:**\n• Counsel about 4-6 week onset to full effect\n• Transient activation/anxiety/insomnia in first 1-2 weeks\n• Black box: suicidality in young adults — combine with safety plan\n• Sexual dysfunction common — anticipate and discuss\n• ED clinicians typically defer initiation unless robust outpatient FU established',
        recommendation: '**First-line: sertraline 25mg→50-200mg, paroxetine 10mg→20-50mg, OR venlafaxine XR 37.5mg→75-300mg. Counsel onset 4-6wk, transient activation. Coordinate with outpatient.**',
        confidence: 'definitive',
        citation: [17],
        next: 'ptsd-disposition-decision',
        summary: 'First-line: sertraline 25→50-200, paroxetine 10→20-50, venlafaxine XR 37.5→75-300; fluoxetine removed 2023 CPG',
    },
    {
        id: 'ptsd-pharm-prazosin',
        type: 'result',
        module: 5,
        title: 'Prazosin for PTSD Nightmares',
        body: '**Indication: trauma-related nightmares + sleep disruption.** [18][19]\n\n**Evidence picture:**\n• PACT trial (Raskind NEJM 2018): negative in 26-week, 12-VA-site RCT in clinically stable veterans (likely underpowered, over-selected)\n• 2025 meta-analysis (10 RCTs, n=648): improves insomnia (SMD -0.654) and nightmares (SMD -0.641); does NOT improve overall PTSD symptoms\n• 2023 VA/DoD CPG: SUGGESTS prazosin for PTSD nightmares specifically\n• Harvard South Shore 2024-2025: remains first-line for PTSD-related sleep impairment\n\n**[Prazosin](#/drug/prazosin/ptsd-nightmares) — Raskind dosing protocol:**\n• Start: 1 mg PO qhs × 2 days, then 2 mg qhs × 5 days\n• Titrate weekly until nightmares absent or max dose\n• **Max (men):** 5 mg mid-morning + 20 mg qhs\n• **Max (women):** 2 mg mid-morning + 10 mg qhs\n• **Older adults:** mean effective dose ~5 mg qhs\n\n**ED counsel:**\n• First-dose orthostasis — take qhs\n• Hold next dose if dizziness\n• AVOID in symptomatic hypotension\n• Check BP before initiating',
        recommendation: '**Prazosin nightmares: start 1mg qhs × 2d → 2mg qhs × 5d → titrate weekly. Max men 5+20mg, women 2+10mg. Counsel orthostasis.**',
        confidence: 'recommended',
        citation: [18, 19],
        next: 'ptsd-disposition-decision',
        summary: 'Prazosin nightmares: 1mg qhs → titrate weekly; max men 5+20, women 2+10; PACT neg but 2025 meta + VA/DoD support',
    },
    {
        id: 'ptsd-pharm-sleep',
        type: 'result',
        module: 5,
        title: 'Non-Benzo Sleep Bridges',
        body: '**Off-label, reasonable bridge therapy when sleep is dominant complaint.** [20]\n\n**[Hydroxyzine](#/drug/hydroxyzine/anxiety)** 25-100 mg qhs\n• First-line PTSD sleep-onset agent (Harvard South Shore algorithm)\n• Non-habit-forming\n• Anticholinergic — caution in elderly\n\n**[Trazodone](#/drug/trazodone/insomnia)** 25-200 mg qhs (most patients 50-150 mg)\n• PTSD-specific data: 72% reduction in nightmares, 92% sleep onset improvement (Palo Alto VA survey)\n• **WARN: 12% priapism rate** — counsel and ask directly at follow-up\n\n**[Mirtazapine](#/drug/mirtazapine/depression)** 7.5-30 mg qhs\n• Effective hypnotic in non-PTSD insomnia\n• 2024 NMA found NO PTSD-specific benefit\n• Best when comorbid depression, weight loss, anorexia\n\n**AVOID for sleep in PTSD:**\n• Z-drugs (zolpidem, eszopiclone) — NMA found ineffective + dependence risk\n• Benzodiazepines (see avoid section)',
        recommendation: '**Non-benzo sleep: hydroxyzine 25-100mg qhs OR trazodone 25-150mg qhs (warn priapism) OR mirtazapine 7.5-30mg qhs. AVOID Z-drugs + benzos.**',
        confidence: 'recommended',
        citation: [20],
        next: 'ptsd-disposition-decision',
        summary: 'Sleep bridges: hydroxyzine 25-100, trazodone 25-150 (priapism warn), mirtazapine 7.5-30; AVOID Z-drugs + benzos',
    },
    {
        id: 'ptsd-pharm-avoid',
        type: 'result',
        module: 5,
        title: 'What to AVOID — Critical Safety Teaching',
        body: '**STRONG: AVOID Benzodiazepines** [21][22]\n\nGuina 2015 meta-analysis (18 trials, 5236 participants) + 2023 VA/DoD CPG:\n• BZDs are **ineffective** for PTSD treatment AND prevention\n• Associated with **WORSE overall PTSD severity, INCREASED risk of developing PTSD when given after trauma, worse psychotherapy outcomes, aggression, depression, substance use**\n• Mechanism: interfere with extinction learning, reduce REM sleep — both critical for trauma memory consolidation\n• **"Should be considered relatively contraindicated"** in PTSD or recent trauma\n• VA prescribing for PTSD has dropped from 30% (FY12) to 7% (FY22)\n\n**ED action:** Do NOT prescribe alprazolam/lorazepam/clonazepam for "anxiety" or "sleep" in a patient with recent trauma or established PTSD. Active deprescribing is appropriate when feasible.\n\n**WARN: AVOID Routine Acute Propranolol**\nFailed to prevent PTSD in pooled meta-analyses (Argolo 2015, Steenen 2016, CADTH 2020, Raut 2022). Attenuates HR without changing PTSD incidence. Neither ISTSS nor APA recommends.\n\n**WARN: AVOID Single-Session Debriefing (CISD)**\nCochrane review: OR 2.51 (95% CI 1.24-5.09) for PTSD at 1 year. WHO and VA/DoD strongly against.\n\n**Currently NOT available outside research:**\n• MDMA-AT: FDA REJECTED Lykos NDA Aug 9, 2024\n• Cannabis: insufficient evidence, risk of cannabis use disorder\n\n**Emerging (NOT routine ED practice):**\n• Hydrocortisone in critical illness/septic shock (CIRCI) — favorable PTSD secondary outcome (Kothgassner 2021)',
        recommendation: '**NEVER: benzos for trauma/PTSD (Guina 2015), routine propranolol prophylaxis, CISD/single-session debriefing (Cochrane OR 2.51).**',
        confidence: 'definitive',
        citation: [21, 22, 15],
        next: 'ptsd-disposition-decision',
        summary: 'AVOID: benzos (worsen PTSD), propranolol prophylaxis, CISD; MDMA-AT FDA rejected 8/2024; cannabis insufficient',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 6: SPECIAL POPULATIONS
    // =====================================================================
    {
        id: 'ptsd-sa-acute',
        type: 'result',
        module: 6,
        title: 'Sexual Assault — Acute (<120h)',
        body: '**Time-sensitive multi-track response.** [23][24]\n\n**Forensic & medical:**\n• **SANE** (Sexual Assault Nurse Examiner) — activate immediately\n• Forensic kit consent + chain of custody (kit valid up to 120h, ideally <72h)\n• Gentle but thorough exam; minimize re-traumatization\n• Photo documentation per institution protocol\n\n**Pharmacology:**\n• **HIV PEP** within 72h: tenofovir-emtricitabine + raltegravir (or per local protocol) × 28d\n• **Emergency contraception** within 120h: levonorgestrel 1.5mg PO × 1 OR ulipristal 30mg × 1 OR copper IUD\n• **STI prophylaxis:** ceftriaxone 500mg IM + doxycycline 100mg BID × 7d + metronidazole 2g PO × 1\n• **Hepatitis B post-exposure** if non-immune: HBIG + vaccination\n• **Tetanus** if any wound\n\n**Behavioral health:**\n• PFA in private, trauma-informed manner\n• **National Sexual Assault Hotline: 1-800-656-HOPE (RAINN)** — warm handoff\n• Offer follow-up appointment within 1-2 weeks (CBT/CPT/PE/EMDR are specifically effective for sexual trauma)\n• Safety plan if living with perpetrator\n\n**Documentation & reporting:**\n• Mandatory reporting requirements vary by state (peds always reportable; adult depends)\n• Patient choice re law enforcement involvement (do NOT pressure)\n• Document index trauma in HIPAA-protected manner\n\n**C-SSRS** suicide screen mandatory before disposition.',
        recommendation: '**SA <120h: SANE + forensic kit + HIV PEP + EC + STI ppx + hep B + RAINN 1-800-656-HOPE warm handoff + C-SSRS + 1-2wk FU.**',
        confidence: 'definitive',
        citation: [23, 24],
        next: 'ptsd-disposition-decision',
        summary: 'SA acute: SANE + kit (≤120h) + HIV PEP + EC + STI ppx + hep B + tetanus + RAINN warm handoff + C-SSRS',
        safetyLevel: 'critical',
    },
    {
        id: 'ptsd-ipv-pathway',
        type: 'result',
        module: 6,
        title: 'IPV / Domestic Violence',
        body: '**USPSTF 2024 recommends screening reproductive-age women for IPV and providing intervention services.** [25]\n\n**CRITICAL: Screen in PRIVATE.** Separate the patient from accompanying partner BEFORE any IPV question is asked. Use a clinical reason ("I need to do a confidential exam") if needed.\n\n**Validated tools:**\n• **HARK** (4 items): Humiliation, Afraid, Rape, Kick\n• **HITS** (4 items): Hurt, Insulted, Threatened, Screamed\n• **E-HITS** (5 items): adds emotional abuse\n• **WAST** (8 items)\n\n**Co-screen for depression and SUD** — high comorbidity.\n\n**Acute management:**\n• Document injuries (photos, body diagrams)\n• PFA, validate, do not pressure decisions\n• **National DV Hotline: 1-800-799-SAFE (1-800-799-7233)** — warm handoff offer\n• Safety planning before discharge: safe place to go, code word, important docs, money, clothes for child\n• Lethality assessment (Campbell DA): firearm in home, choking history, threats with weapon, escalation = high lethality\n• If high lethality + willing → shelter coordination, NOT home discharge\n\n**Disposition pearls:**\n• Mandatory reporting varies by state (most: NOT mandatory for competent adult IPV)\n• Children in home → mandatory child abuse report if witnessed/exposed (varies by state)\n• Address IPV survivor coercion in disposition planning — NEVER share safety plan with partner\n• C-SSRS mandatory\n\n**Pharm:** Same PTSD pathway. AVOID benzos (impair safety judgment + memory).',
        recommendation: '**IPV: PRIVATE screen with HARK/HITS, document, NDV 1-800-799-SAFE warm handoff, safety plan (NEVER shared with partner), shelter if high lethality, C-SSRS.**',
        confidence: 'definitive',
        citation: [25],
        next: 'ptsd-disposition-decision',
        summary: 'IPV: PRIVATE screen, HARK/HITS, NDV 1-800-799-SAFE, lethality assess, shelter if high, never share plan w/partner',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 6 CONT: DISPOSITION & REFERRAL
    // =====================================================================
    {
        id: 'ptsd-disposition-decision',
        type: 'question',
        module: 6,
        title: 'Disposition Decision',
        body: 'Combine PCL-5/PC-PTSD-5/ASD result + C-SSRS + social context to choose disposition.',
        options: [
            {
                label: 'High suicide risk OR severe ASD with functional collapse',
                description: 'Psychiatric admission consideration',
                next: 'ptsd-disposition-admit',
                urgency: 'critical',
            },
            {
                label: 'Moderate symptoms + adequate support',
                description: 'Outpatient referral with warm handoff',
                next: 'ptsd-disposition-outpatient',
            },
            {
                label: 'Crisis services / mobile crisis appropriate',
                description: 'Distress without admission criteria + insufficient outpatient access',
                next: 'ptsd-disposition-crisis',
            },
            {
                label: 'Active IPV with no safe place to go',
                description: 'Shelter coordination before discharge',
                next: 'ptsd-disposition-shelter',
                urgency: 'urgent',
            },
        ],
        summary: 'Disposition: high SI/severe ASD→admit; moderate+support→OP warm handoff; crisis svc; IPV→shelter coord',
    },
    {
        id: 'ptsd-disposition-admit',
        type: 'result',
        module: 6,
        title: 'Psychiatric Admission Pathway',
        body: '**Indications for emergent psychiatric consult/admission:** [26]\n\n• C-SSRS severity 4-5 (active method/intent/plan)\n• Recent suicidal behavior (any "yes" to behavior section past 3 months)\n• Homicidal ideation with means\n• Acute psychosis or severe dissociation impairing safety\n• Inability to maintain safety post-discharge (e.g., severe IPV with no safe place)\n• Severe ASD with functional collapse\n\n**Voluntary vs Involuntary:**\n• **Voluntary preferred** when patient agrees and engaged\n• **Involuntary hold** standard varies by state — generally requires:\n  - Imminent danger to self (suicidal plan/intent, recent attempt)\n  - Imminent danger to others (homicidal threat with means)\n  - Grave disability (unable to provide for basic needs because of mental illness)\n  - Plus refusal of voluntary admission AND current mental illness Dx\n\n**Texas-specific:**\n• APOWW (Application by Peace Officer With Warrant)\n• Emergency Detention / OPC (Order of Protective Custody)\n• Mental health warrant (MHW) — judge-ordered\n\n**ED actions:**\n• 1:1 observation\n• Lethal means restriction\n• Remove belongings (belt, shoelaces, sharp objects)\n• Safety plan documented\n• Psychiatric consult or transfer arrangements\n• Document risk assessment thoroughly (Joint Commission sentinel event if suicide within 7 days of ED discharge)',
        recommendation: '**Psych admit: 1:1 obs + lethal means restriction + voluntary preferred; involuntary if danger to self/others or grave disability. TX: APOWW/OPC/MHW. Document.**',
        confidence: 'definitive',
        citation: [26],
        summary: 'Psych admit: C-SSRS 4-5, recent behavior, severe ASD; voluntary > involuntary; TX = APOWW/OPC/MHW; 1:1 obs + means restriction',
        safetyLevel: 'critical',
    },
    {
        id: 'ptsd-disposition-outpatient',
        type: 'result',
        module: 6,
        title: 'Outpatient Disposition with Warm Handoff',
        body: '**Most ED PTSD/ASD presentations are appropriate for outpatient referral if criteria met.** [17][27]\n\n**Discharge criteria (ALL must be met):**\n• C-SSRS low risk (severity 1-3, no recent behavior)\n• Adequate social support\n• Safe living environment (no active IPV without shelter plan)\n• No active substance intoxication impairing decision-making\n• Patient willing/able to engage in outpatient care\n• Appointment scheduled (ideally ≤2 weeks)\n• Crisis plan reviewed; 988 + local resources documented\n\n**Warm handoff is the standard** — call to therapist, scheduled appointment, or accompanied phone introduction. Paper referral alone is insufficient.\n\n**Resources to provide ALL patients:**\n• **988 Suicide & Crisis Lifeline** (call/text/chat)\n• **PTSD Coach app** (free, NCPTSD)\n• **Local trauma-focused therapist (CPT, PE, EMDR)** — see [Trauma Resources](#/info/ptsd-trauma-resources)\n\n**Population-specific resources:**\n• Veterans: 988 → press 1 (Veterans Crisis Line); Vet Center walk-in 1-877-WAR-VETS\n• Sexual assault: RAINN 1-800-656-HOPE\n• IPV: NDV 1-800-799-SAFE\n• Disaster: SAMHSA 1-800-985-5990\n\n**Documentation required:**\n• DSM-5-TR criteria mapping if Dx made\n• C-SSRS result\n• Index trauma description (HIPAA-minimum-necessary)\n• Safety plan if any IPV/SI/SUD\n• Mandatory reporting compliance (peds, elders, vulnerable adults)\n• Follow-up plan with appointment\n\n**Stepped Care monitoring:** screen at 1 month and 3 months — symptom persistence at 3 months triggers step 3 (TF-CBT and/or pharm).',
        recommendation: '**OP discharge if: C-SSRS low + safe + supported + appt scheduled. Warm handoff > paper. Provide 988 + PTSD Coach + population-specific hotlines. Document fully.**',
        confidence: 'definitive',
        citation: [17, 27],
        summary: 'OP disposition: low C-SSRS + safe + appt ≤2wk; warm handoff std; 988 + PTSD Coach + RAINN/NDV/Vet hotlines',
    },
    {
        id: 'ptsd-disposition-crisis',
        type: 'result',
        module: 6,
        title: 'Crisis Services / Mobile Crisis',
        body: '**Indications:**\n• Moderate distress with insufficient outpatient access\n• Active SI without plan/intent who can engage with crisis support\n• IPV survivors needing immediate shelter coordination\n• Patient prefers crisis services over admission and risk allows\n\n**Resources:**\n• **988 Suicide & Crisis Lifeline** — connects to local mobile crisis where available\n• **Local mobile crisis team** (varies by community)\n• **Crisis Stabilization Unit (CSU)** if available\n• **Peer support specialist** for warm handoff\n\n**Documentation:**\n• Crisis plan in writing\n• Direct phone connection during ED visit (warm transfer)\n• Follow-up appointment within 24-48 hours\n• Lethal means counseling',
        recommendation: '**Crisis svc: warm 988 transfer + mobile crisis dispatch + CSU if available + 24-48h FU + lethal means counseling.**',
        confidence: 'recommended',
        next: 'ptsd-disposition-outpatient',
        summary: 'Crisis svc: warm 988 transfer, mobile crisis, CSU, 24-48h FU; appropriate for moderate SI w/ engagement',
    },
    {
        id: 'ptsd-disposition-shelter',
        type: 'result',
        module: 6,
        title: 'IPV Shelter Coordination',
        body: '**Active IPV + no safe place to go = shelter coordination before discharge.** [25]\n\n**Steps:**\n• Confirm patient consent and willingness\n• Lethality assessment (Campbell DA): firearm in home, choking history, threats with weapon, escalation\n• Call **NDV Hotline 1-800-799-SAFE** — they coordinate local shelter availability\n• Social work consult for transportation, paperwork, child custody concerns\n• Document confidentially — NEVER share location with partner or in EHR notes accessible to partner\n• Safety plan: code word with trusted contact, important documents (ID, SS card, custody papers, financial), money, clothes for self/children\n\n**Pediatric considerations:**\n• Children witnessing IPV → mandatory child abuse report (varies by state, generally yes)\n• Coordinate child protective services if needed\n• Pediatric trauma-focused therapy referral\n\n**Pharm avoidance reminder:**\n• AVOID benzodiazepines — impair safety judgment, sedate during a time when alertness may be safety-critical\n• Sleep support if needed: hydroxyzine 25-50mg qhs\n\n**Follow-up:**\n• 24-72h follow-up call from advocacy organization\n• Trauma-focused therapy referral once stable',
        recommendation: '**IPV shelter coord: consent + Campbell DA lethality + NDV 1-800-799-SAFE + SW + safety plan (NOT shared) + peds CPS if applicable. AVOID benzos. 24-72h advocate FU.**',
        confidence: 'definitive',
        citation: [25],
        summary: 'IPV shelter: NDV 1-800-799-SAFE, Campbell DA, SW, safety plan never shared, peds CPS, AVOID benzos',
        safetyLevel: 'critical',
    },
];
// =====================================================================
// MODULE LABELS
// =====================================================================
export const PTSD_SCREENING_MODULE_LABELS = [
    'Triage & Trauma ID',
    'Screening Tools',
    'ASR / ASD Mgmt',
    'Brief Intervention',
    'Pharmacology',
    'Disposition & Special Pop',
];
// =====================================================================
// CITATIONS
// =====================================================================
export const PTSD_SCREENING_CITATIONS = [
    { num: 1, text: 'Zatzick D, et al. Stepped Collaborative Care Targeting Posttraumatic Stress Disorder Symptoms and Comorbidity for US Trauma Care Systems: A Randomized Clinical Trial. JAMA Surg. 2021;156(5):430-470.' },
    { num: 2, text: 'American College of Surgeons Committee on Trauma. Resources for Optimal Care of the Injured Patient: Best Practices Guidelines for Mental Health Screening and Intervention. 2024.' },
    { num: 3, text: 'American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders, 5th Edition, Text Revision (DSM-5-TR). Washington DC: APA; 2022.' },
    { num: 4, text: 'Kessler RC, et al. Trauma and PTSD in the WHO World Mental Health Surveys. Eur J Psychotraumatol. 2017;8(sup5):1353383.' },
    { num: 5, text: 'NICE. Post-traumatic stress disorder. NICE guideline [NG116]. December 2018, updated 2024.' },
    { num: 6, text: 'Bryant RA. Acute Stress Disorder as a Predictor of Posttraumatic Stress Disorder: A Systematic Review. J Clin Psychiatry. 2011;72(2):233-239.' },
    { num: 7, text: 'Prins A, Bovin MJ, Smolenski DJ, et al. The Primary Care PTSD Screen for DSM-5 (PC-PTSD-5): Development and Evaluation Within a Veteran Primary Care Sample. J Gen Intern Med. 2016;31(10):1206-1211.' },
    { num: 8, text: 'Weathers FW, Litz BT, Keane TM, et al. The PTSD Checklist for DSM-5 (PCL-5). National Center for PTSD; 2013, updated 2023.' },
    { num: 9, text: 'Bovin MJ, Marx BP, Weathers FW, et al. Psychometric Properties of the PTSD Checklist for DSM-5 (PCL-5) in Veterans. Psychol Assess. 2016;28(11):1379-1391.' },
    { num: 10, text: 'Posner K, Brown GK, Stanley B, et al. The Columbia-Suicide Severity Rating Scale: Initial Validity and Internal Consistency Findings From Three Multisite Studies. Am J Psychiatry. 2011;168(12):1266-1277.' },
    { num: 11, text: 'Legarreta M, Graham J, North L, et al. Suicide Risk and the C-SSRS in Veterans with PTSD. Suicide Life Threat Behav. 2015;45(2):225-238.' },
    { num: 12, text: 'World Health Organization, War Trauma Foundation, and World Vision International. Psychological First Aid: Guide for Field Workers. WHO; 2011.' },
    { num: 13, text: 'NCTSN/NCPTSD. Psychological First Aid: Field Operations Guide. 2nd Ed. National Child Traumatic Stress Network; 2006.' },
    { num: 14, text: 'Wang L, Norman I, Edleston V, et al. Evaluating the Implementation and Effectiveness of Psychological First Aid: An Integrative Review. Trauma Violence Abuse. 2024;25(2):1450-1466.' },
    { num: 15, text: 'Rose S, Bisson J, Churchill R, Wessely S. Psychological debriefing for preventing post traumatic stress disorder (PTSD). Cochrane Database Syst Rev. 2002;(2):CD000560.' },
    { num: 16, text: 'VA/DoD Clinical Practice Guideline for the Management of Posttraumatic Stress Disorder and Acute Stress Disorder. Version 4.0. 2023.' },
    { num: 17, text: 'Hamblen JL, Norman SB, Sonis JH, et al. The 2023 VA/DoD Clinical Practice Guideline for the Management of PTSD and ASD: A Synopsis. Ann Intern Med. 2024;177(3):363-374.' },
    { num: 18, text: 'Raskind MA, Peskind ER, Chow B, et al. Trial of Prazosin for Post-Traumatic Stress Disorder in Military Veterans. N Engl J Med. 2018;378(6):507-517.' },
    { num: 19, text: 'Reist C, Streja E, Tang CC, et al. Prazosin for treatment of post-traumatic stress disorder: a systematic review and meta-analysis. CNS Spectrums. 2025;30(1):e3.' },
    { num: 20, text: 'De Berardis D, et al. Pharmacological Treatments for PTSD-Related Sleep Disturbances: A Network Meta-Analysis. Sleep Med Rev. 2024;76:101952.' },
    { num: 21, text: 'Guina J, Rossetter SR, DeRhodes BJ, Nahhas RW, Welton RS. Benzodiazepines for PTSD: A Systematic Review and Meta-Analysis. J Psychiatr Pract. 2015;21(4):281-303.' },
    { num: 22, text: 'US Department of Veterans Affairs. Benzodiazepines and PTSD: Evidence Update. National Center for PTSD; 2023.' },
    { num: 23, text: 'Linden JA. Care of the Adult Patient after Sexual Assault. N Engl J Med. 2011;365(9):834-841.' },
    { num: 24, text: 'CDC. Sexually Transmitted Infections Treatment Guidelines, 2021 — Sexual Assault and Abuse and STIs. MMWR Recomm Rep. 2021;70(4):1-187.' },
    { num: 25, text: 'US Preventive Services Task Force. Screening for Intimate Partner Violence and Abuse of Older or Vulnerable Adults: Recommendation Statement. JAMA. 2024;331(11):951-958.' },
    { num: 26, text: 'American Psychiatric Association. Practice Guideline for the Psychiatric Evaluation of Adults, 3rd Ed. APA; 2016 (reaffirmed 2024).' },
    { num: 27, text: 'Stanley B, Brown GK. Safety Planning Intervention: A Brief Intervention to Mitigate Suicide Risk. Cogn Behav Pract. 2012;19(2):256-264.' },
];
export const PTSD_SCREENING_NODE_COUNT = PTSD_SCREENING_NODES.length;
