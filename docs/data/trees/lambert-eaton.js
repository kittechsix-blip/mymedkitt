// MedKitt - Lambert-Eaton Myasthenic Syndrome (LEMS)
// Recognition (the MG mirror-image) -> Triad -> Diagnosis (anti-VGCC, RNS increment) -> Hunt the SCLC -> Drugs to AVOID (highest ED-safety yield) -> Treatment -> Differential -> Disposition & Prognosis
// 9 modules. Core teaching hook: facilitation (improves with use) vs MG fatigability. Highest ED danger: paralytics/CCB/aminoglycoside/Mg precipitating respiratory failure.
export const LAMBERT_EATON_CRITICAL_ACTIONS = [
    { text: 'Recognize the MG mirror-image: proximal leg weakness that IMPROVES with use + dry mouth + hyporeflexia', nodeId: 'lems-triad' },
    { text: 'AVOID neuromuscular blockers (profound prolonged paralysis), aminoglycosides/fluoroquinolones, IV magnesium, calcium-channel blockers, IV contrast', nodeId: 'lems-avoid' },
    { text: 'Monitor respiratory function (FVC/NIF, single-breath count) — crisis is less common than MG but occurs, often iatrogenic', nodeId: 'lems-resp' },
    { text: 'Hunt small cell lung cancer (CT chest -> PET) in every new LEMS diagnosis', nodeId: 'lems-cancer' },
    { text: 'Send anti-P/Q-type VGCC antibodies; coordinate neurology + oncology', nodeId: 'lems-diagnosis' },
    { text: 'Do not diagnose LEMS off an isolated N-type VGCC result — N-type antibodies are not useful in isolation (low sensitivity, nonspecific)', nodeId: 'lems-diagnosis' },
    { text: 'If initial imaging is negative, repeat screening every 3-6 months for at least 2 years (high-risk: every 3 months)', nodeId: 'lems-cancer' },
    { text: 'If RSI is unavoidable, anticipate marked dose sensitivity and delayed recovery; favor a sugammadex-reversible agent', nodeId: 'lems-avoid' },
    { text: 'Do not be reassured by a normal SpO2 — pulse oximetry is a poor/late indicator of neuromuscular respiratory strength', nodeId: 'lems-resp' },
    { text: 'Treat the underlying cancer — for paraneoplastic LEMS, anti-tumor therapy is central and often the most effective intervention', nodeId: 'lems-treatment' },
    { text: 'Admit for respiratory compromise, rapidly progressive weakness, significant bulbar dysfunction, or decompensation after a precipitant drug', nodeId: 'lems-disposition' },
];
export const LAMBERT_EATON_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'lems-start',
        type: 'info',
        module: 1,
        title: 'Lambert-Eaton Myasthenic Syndrome (LEMS)',
        body: '**LEMS** is a **presynaptic** autoimmune disorder of the neuromuscular junction. Antibodies against **P/Q-type voltage-gated calcium channels (VGCC)** on the motor nerve terminal reduce calcium influx and therefore reduce acetylcholine release. The postsynaptic receptor is normal — the defect is upstream.\n\n**The mechanistic signature:** one nerve impulse releases too little ACh (weakness, low resting CMAP), but **rapid repetitive activity lets calcium build up**, transiently boosting ACh release. That is why strength and reflexes **improve with use** — *facilitation*, the mirror image of myasthenia gravis fatigability.\n\n**~50-60% is paraneoplastic**, almost always tied to **small cell lung cancer (SCLC)** — and LEMS often **precedes the cancer diagnosis by months to years.** The rest is autoimmune/idiopathic.\n\n**Classic patient:** an older smoker with proximal leg weakness, a dry mouth, and hard-to-elicit reflexes.\n\n*Basis: presynaptic anti-P/Q VGCC pathophysiology and the SCLC association are established in peer-reviewed reviews of LEMS [2,3]. The tumour-association figure is a range across cohorts — Titulaer 2011 and Gilhus 2011 both state "half" (~50%), while the classic 50-case Newsom-Davis series found a 62% risk of underlying SCLC that declines sharply after 2 years [17]. Treat "~50-60%" as a cohort-dependent estimate, not a fixed rate. Epidemiology and mechanism, not a treatment directive — no ED action follows from this node alone.*',
        images: [{
                src: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 220" font-family="sans-serif">'
                    + '<rect width="440" height="220" fill="#0f172a"/>'
                    + '<text x="220" y="24" fill="#e2e8f0" font-size="15" font-weight="bold" text-anchor="middle">LEMS vs MG — opposite NMJ defects</text>'
                    + '<rect x="30" y="44" width="170" height="150" rx="10" fill="#1e293b" stroke="#fbbf24"/>'
                    + '<text x="115" y="66" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">LEMS (presynaptic)</text>'
                    + '<text x="115" y="90" fill="#cbd5e1" font-size="10" text-anchor="middle">anti-VGCC, low ACh release</text>'
                    + '<text x="115" y="112" fill="#34d399" font-size="11" text-anchor="middle">IMPROVES with use</text>'
                    + '<text x="115" y="132" fill="#cbd5e1" font-size="10" text-anchor="middle">proximal legs &gt; ocular</text>'
                    + '<text x="115" y="152" fill="#cbd5e1" font-size="10" text-anchor="middle">dry mouth / autonomic</text>'
                    + '<text x="115" y="172" fill="#cbd5e1" font-size="10" text-anchor="middle">SCLC link</text>'
                    + '<rect x="240" y="44" width="170" height="150" rx="10" fill="#1e293b" stroke="#60a5fa"/>'
                    + '<text x="325" y="66" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">MG (postsynaptic)</text>'
                    + '<text x="325" y="90" fill="#cbd5e1" font-size="10" text-anchor="middle">anti-AChR/MuSK</text>'
                    + '<text x="325" y="112" fill="#f87171" font-size="11" text-anchor="middle">WORSENS with use</text>'
                    + '<text x="325" y="132" fill="#cbd5e1" font-size="10" text-anchor="middle">ocular / bulbar onset</text>'
                    + '<text x="325" y="152" fill="#cbd5e1" font-size="10" text-anchor="middle">reflexes normal</text>'
                    + '<text x="325" y="172" fill="#cbd5e1" font-size="10" text-anchor="middle">thymoma link</text>'
                    + '</svg>'),
                alt: 'Two panels contrasting LEMS (presynaptic, anti-VGCC, improves with use, proximal legs, autonomic, SCLC) with myasthenia gravis (postsynaptic, anti-AChR, worsens with use, ocular onset, thymoma).',
                caption: 'LEMS is the mirror image of MG: presynaptic, improves with use, proximal, autonomic, SCLC-linked. (Original schematic.)'
            }],
        citation: [2, 3, 17],
        next: 'lems-triad',
        summary: 'Presynaptic anti-VGCC NMJ disorder; improves with use (facilitation). ~50-60% paraneoplastic with SCLC, often preceding the cancer.',
    },
    // =====================================================================
    // MODULE 2: THE TRIAD
    // =====================================================================
    {
        id: 'lems-triad',
        type: 'question',
        module: 2,
        title: 'The LEMS Triad',
        body: '**(1) Proximal muscle weakness** — the dominant complaint. **Legs > arms**, symmetric. Difficulty rising from a chair, climbing stairs, waddling gait. Atrophy is mild relative to weakness.\n\n**(2) Autonomic dysfunction** — present in 80-96%. **Dry mouth is the most common and often earliest** symptom. Also constipation, erectile dysfunction, orthostatic hypotension, blurred vision, reduced sweating.\n\n**(3) Hypo/areflexia that AUGMENTS after exercise** — a reflex that is absent at rest may reappear after ~10-15 seconds of sustained contraction (**post-exercise facilitation**). This is the bedside hallmark and the **opposite of MG fatigability.**\n\n**Ocular/bulbar:** present but milder and later than MG. Bulbar/ocular *onset* should make you reconsider MG.\n\n*Basis: the triad and its component frequencies come from clinical case series, not trials. The 50-patient Newsom-Davis series found proximal lower-limb weakness in 100%, depressed reflexes in 92%, post-tetanic potentiation in 78% and dry mouth in 74% [17]; a separate Mayo series characterises the autonomic phenotype and its serologic correlates [16]. Individual percentages vary by cohort and by how "autonomic dysfunction" is ascertained (symptom questionnaire vs formal autonomic testing) — the quoted 80-96% is at the upper end of that literature. This node is a recognition aid; it does not by itself establish the diagnosis, which requires serology plus electrodiagnostics [2].*',
        citation: [2, 16, 17],
        options: [
            {
                label: 'Proximal leg weakness + dry mouth + reflexes improve with use',
                description: 'The classic LEMS triad — confirm and hunt for cancer',
                next: 'lems-diagnosis',
            },
            {
                label: 'Ocular/bulbar onset, fatigable, reflexes normal',
                description: 'Looks more like myasthenia gravis — switch tracks',
                next: 'lems-mg-compare',
            },
        ],
        summary: 'Triad: proximal (legs>arms) weakness + autonomic (dry mouth) + reflexes that augment with exercise. Facilitation = bedside hallmark.',
    },
    {
        id: 'lems-mg-compare',
        type: 'info',
        module: 2,
        title: 'LEMS vs Myasthenia Gravis',
        body: '| Feature | **LEMS** | **[Myasthenia gravis](#/tree/myasthenia-gravis)** |\n|---|---|---|\n| Weakness pattern | **Proximal** (legs > arms) | **Ocular / bulbar** onset |\n| Response to use | **Improves** (facilitation) | **Worsens** (fatigability) |\n| Reflexes | Hypo/areflexic; **augment post-exercise** | Normal |\n| Autonomic | **Prominent** (dry mouth, ED, orthostasis) | Absent |\n| Antibody | **Anti-P/Q VGCC** (~85-95%) | Anti-AChR / anti-MuSK |\n| Tumor | **SCLC** (~50-60%) | **Thymoma** (~10-15%) |\n| RNS | High-freq / post-exercise **increment** | Low-freq **decrement** |\n\n**If the picture is ocular/bulbar-onset and fatigable, work it up as MG.** If it is proximal, autonomic, and improves with use, it is LEMS until proven otherwise.\n\n*Basis: the weakness-distribution contrast in row 1 is drawn from a direct head-to-head comparison of MG and LEMS patients [18]; the RNS row (decrement vs increment) is drawn from direct RNS comparison studies [13]; the antibody, autonomic and tumour rows from LEMS reviews [2]. Note the table states discriminating tendencies, not absolute rules — overlap exists (LEMS can have ocular/bulbar features, MG can show low-frequency decrement in only about half of patients [13]). Use it to direct testing, not to substitute for serology and electrodiagnostics.*',
        citation: [2, 13, 18],
        next: 'lems-diagnosis',
        summary: 'LEMS: proximal, improves with use, autonomic, anti-VGCC, SCLC, RNS increment. MG: ocular/bulbar, fatigable, anti-AChR, thymoma, RNS decrement.',
        skippable: true,
    },
    // =====================================================================
    // MODULE 3: DIAGNOSIS
    // =====================================================================
    {
        id: 'lems-diagnosis',
        type: 'info',
        module: 3,
        title: 'Diagnosis',
        body: '**Three pillars: clinical triad + serology + electrodiagnostics.**\n\n**Serology:**\n- **Anti-P/Q-type VGCC antibodies** — positive in ~85-95% (titers >~30 pmol/L support the diagnosis in context). ~10-15% seronegative.\n- **N-type VGCC antibodies are NOT useful in isolation** (low sensitivity, nonspecific) — do not diagnose LEMS off an isolated N-type result.\n- **SOX1 antibodies** (~64% in SCLC-LEMS, ~95% specific) — a useful paraneoplastic flag.\n\n**Electrodiagnostics (repetitive nerve stimulation):**\n- Low **resting** CMAP amplitude\n- **Decrement** at low-frequency (2-5 Hz) stimulation\n- **>60% (often >100%) INCREMENT at high-frequency (20-50 Hz) or after 10 s of maximal contraction** — post-exercise facilitation, the electrodiagnostic signature.\n\nSerology and EMG must be interpreted together with the clinical picture.\n\n*Basis: the >60% increment threshold is not consensus opinion — it comes from a direct comparison of 34 LEMS patients against 40 normal controls and 538 RNS studies in myasthenia gravis, where a 60% increment on post-exercise facilitation or high-rate stimulation gave 97% sensitivity for LEMS and 99% specificity against MG, versus 85% sensitivity for the older 100% "gold standard" [13]; the same group re-confirmed the 60% figure in a 50-year reappraisal [13]. The advice against relying on isolated N-type VGCC antibodies comes from a Mayo Clinic laboratory series [4]. The SOX1 figures are separately sourced: ~64% positivity in SCLC-LEMS versus 0% in idiopathic LEMS [14], and ~95% specificity for discriminating SCLC-LEMS from non-tumour LEMS [15]. The anti-P/Q VGCC sensitivity is a cohort-dependent range — reviews quote ~85% [3] up to the ~95% upper bound shown here [2]; a negative antibody does not exclude LEMS (~10-15% seronegative). Diagnostic thresholds, not treatment directives — confirm assay units and cutoffs with your own laboratory.*',
        citation: [2, 4, 13, 14, 15],
        next: 'lems-cancer',
        summary: 'Anti-P/Q VGCC (~85-95%); RNS shows high-frequency/post-exercise increment >60%. N-type antibody not useful alone; SOX1 flags SCLC.',
    },
    // =====================================================================
    // MODULE 4: HUNT THE CANCER
    // =====================================================================
    {
        id: 'lems-cancer',
        type: 'info',
        module: 4,
        title: 'Hunt the Small Cell Lung Cancer',
        body: '**Every new LEMS diagnosis triggers a malignancy hunt** — treating the SCLC often improves the neurologic syndrome, and LEMS may be the first sign of an otherwise-occult tumor.\n\n**Imaging:**\n- **CT chest** first-line; if negative, **FDG-PET/CT.**\n- If initial imaging is negative, **repeat screening every 3-6 months for at least 2 years** (high-risk: every 3 months). *FLAGGED: confirm the surveillance interval against your institution / current guidance.*\n\n**Risk-stratify with DELTA-P** (1 point each, assessed at/within 3 months of onset): age ≥50, current smoking, weight loss ≥5%, bulbar involvement, erectile dysfunction, Karnofsky <70.\n- Score 0-1 → SCLC risk near 0-2.6%\n- Scores 4/5/6 → ~93.5% / 96.6% / 100%\n\nHigh DELTA-P → expedite PET and oncology.\n\n*Basis: the DELTA-P items and the probabilities shown here are the DERIVATION-cohort figures from a 107-patient Dutch cohort validated in 112 British patients (AUC 94.4% / 94.6%) [6]. An independent PROSPECTIVE cohort of 87 newly diagnosed patients found meaningfully weaker discrimination — AUC 82.5%, and a score of 1 carried an 18.8% SCLC rate rather than the 0-2.6% quoted for scores 0-1, with only weight loss, smoking and age >=50 remaining independent predictors [8]. Read the low-risk band as "lower risk", not "rule out", and do not use DELTA-P to skip imaging. The imaging strategy (CT chest, then FDG-PET/CT) follows a European task-force recommendation on tumour screening in paraneoplastic syndromes [5]; the 2-year surveillance window is supported by the observation that SCLC became evident within 2 years of LEMS onset in 20 of 21 tumour cases [17], but the exact 3-6 month interval is expert consensus, not trial-derived — hence the FLAG above.*',
        citation: [5, 6, 8, 17],
        calculatorLinks: [{ id: 'lems-delta-p', label: 'DELTA-P SCLC Risk Score' }],
        next: 'lems-avoid',
        summary: 'CT chest -> PET; repeat surveillance for >=2 years if negative. DELTA-P (age>=50, smoking, weight loss, bulbar, ED, low Karnofsky) stratifies SCLC risk.',
    },
    // =====================================================================
    // MODULE 5: DRUGS TO AVOID (highest ED-safety yield)
    // =====================================================================
    {
        id: 'lems-avoid',
        type: 'info',
        module: 5,
        title: 'Drugs to AVOID — Highest ED-Safety Yield',
        body: '**This is where the ED can harm a LEMS patient.** Several common drugs worsen presynaptic NMJ transmission and can precipitate respiratory failure.\n\n**Avoid / use with extreme caution:**\n- **Neuromuscular blockers (depolarizing AND non-depolarizing)** — profound, **prolonged paralysis**. LEMS is frequently *first discovered* via unexpected prolonged blockade after anesthesia. If RSI is unavoidable, anticipate marked dose sensitivity and delayed recovery; favor a sugammadex-reversible agent. *FLAGGED: paralytic strategy is a clinical-judgment call.*\n- **Aminoglycosides, fluoroquinolones** — impair NMJ transmission.\n- **IV magnesium** — competes with presynaptic calcium; can precipitate severe weakness.\n- **Calcium-channel blockers (esp. verapamil, diltiazem)** — documented precipitants of respiratory failure in LEMS.\n- **Iodinated IV contrast** — reported to exacerbate weakness.\n\n**Practical ED move:** flag the chart, avoid these agents, and if intubation is truly required, plan for prolonged paralysis and reversibility.\n\n*Basis: this list is built on observational and case-based evidence, not randomised trials — no trial has been or will be run deliberately exposing LEMS patients to these agents. Neuromuscular-blocker sensitivity is the best supported item: a 37-patient / 60-surgery perioperative series concluded that LEMS patients have increased sensitivity to neuromuscular blocking drugs, that 4 patients (11%) had respiratory complications, and that 3 of those were undiagnosed or untreated at the time and developed weakness after a blocker was given [11]. The calcium-channel-blocker warning rests on a case of intubation-requiring respiratory failure after combined diltiazem plus verapamil, plus a literature review that at the time identified only 5 published cases of definite cardiac CCB harm across LEMS and MG [12] — a real but rare signal. Aminoglycosides, fluoroquinolones and magnesium are grouped from the general drug-induced neuromuscular-blockade literature, which is largely derived from myasthenia gravis and extrapolated to LEMS . The iodinated-contrast item is the weakest link in the list, supported by isolated reports only. Treat the whole node as risk-avoidance guidance whose strength varies item by item; the paralytic decision itself remains a clinical judgement, as flagged above.*',
        citation: [11, 12],
        next: 'lems-resp',
        summary: 'AVOID: NM blockers (prolonged paralysis), aminoglycosides/fluoroquinolones, IV magnesium, CCBs (verapamil/diltiazem), IV contrast. These precipitate respiratory failure.',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 6: RESPIRATORY MONITORING
    // =====================================================================
    {
        id: 'lems-resp',
        type: 'info',
        module: 6,
        title: 'Respiratory Monitoring',
        body: '**Frank respiratory failure is less common than in MG but does occur — and is often iatrogenic** (see drugs to avoid). It is the only truly emergent LEMS complication.\n\n**Monitor:**\n- **FVC and NIF**; bedside **single-breath count** (cannot reach 20 = concerning)\n- Bulbar safety: cough strength, secretion handling, swallow\n\n**Pulse oximetry is a poor/late indicator** of neuromuscular respiratory strength — do not be reassured by a normal SpO2.\n\n*FLAGGED: specific FVC/NIF intubation thresholds here are extrapolated from the vetted [Myasthenia Gravis](#/tree/myasthenia-gravis) consult, as LEMS-specific cutoffs are not well established. Use the MG thresholds and trend the patient.*\n\n*Basis: there is no LEMS-specific validated respiratory threshold in the literature and no prospective study of FVC/NIF cutoffs in LEMS — the numbers this node points you to are borrowed from myasthenia gravis, which is why the FLAG above exists and why the linked calculator is explicitly labelled "MG thresholds". The claim that respiratory failure occurs but is uncommon and often iatrogenic is supported by a published case report with literature review of acute respiratory failure as a LEMS presentation [10] and by the perioperative series in which respiratory complications clustered in patients given neuromuscular blockers [11]; the underlying general-review framing is tertiary [1]. Use these parameters as a trend, not as a validated LEMS decision rule, and escalate on the clinical trajectory.*',
        citation: [1, 10, 11],
        calculatorLinks: [{ id: 'mg-fvc-nif', label: 'FVC/NIF Respiratory Monitor (MG thresholds)' }],
        next: 'lems-treatment',
        summary: 'Crisis less common than MG but occurs, often iatrogenic. Trend FVC/NIF + single-breath count; SpO2 is late. Thresholds mirror the MG consult.',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 7: TREATMENT
    // =====================================================================
    {
        id: 'lems-treatment',
        type: 'info',
        module: 7,
        title: 'Treatment',
        body: '**Symptomatic:**\n- **First-line: amifampridine (3,4-diaminopyridine, 3,4-DAP)** — blocks presynaptic K+ channels, prolonging the action potential and boosting calcium influx / ACh release. **Start 15-30 mg/day PO in 3-4 divided doses; titrate by 5 mg every 3-4 days; single dose ≤20 mg. FDA max (Firdapse, US labeling updated May 2024): 100 mg/day for patients >45 kg (was 80 mg/day); for patients <45 kg start 7.5-15 mg/day, max 50 mg/day.** FDA-approved for LEMS. *FLAGGED: confirm formulation (phosphate vs base) and current institutional dosing.*\n- **Pyridostigmine** — adjunct; **less effective than in MG**, sometimes combined with amifampridine.\n- **Guanidine** — only if amifampridine unavailable (renal/marrow toxicity).\n\n**Immunotherapy (refractory/severe, usually inpatient with neurology):** IVIG (~2 g/kg over 2-5 days), corticosteroids, plasma exchange; steroid-sparing maintenance (azathioprine, mycophenolate, rituximab).\n\n**Treat the underlying cancer** — for paraneoplastic LEMS, anti-tumor therapy is central and often the most effective intervention.\n\n*Therapy is rarely initiated in the ED; the ED role is recognition, safety (drug avoidance), respiratory monitoring, and coordinating neuro/onc.*\n\n*Basis: amifampridine is the only FDA-approved therapy for LEMS and the authoritative dosing source is the manufacturer\'s current US prescribing information for FIRDAPSE (amifampridine phosphate), which is publicly reviewable on DailyMed [21]. **Read the numbers above against that label before prescribing** — the label is revised periodically, it specifies different starting doses, titration increments, maximum single doses and maximum daily doses for adults/patients at or above 45 kg versus paediatric patients below 45 kg, and it separately reduces the starting dose in renal impairment, hepatic impairment and NAT2 poor metabolisers. It also differs from the older 3,4-DAP base-form literature, which is why the formulation FLAG above matters. The efficacy claim for amifampridine and the relative weakness of pyridostigmine rest on a drug review [7] and on a Cochrane systematic review of LEMS treatment [9], which found only small randomised trials with short follow-up and surrogate (muscle-strength/CMAP) endpoints; the immunotherapy regimens are extrapolated from small trials and clinical practice rather than large comparative studies [3]. No dose in this node should be initiated from the ED without neurology involvement and a direct label check.*',
        citation: [3, 7, 9, 21],
        next: 'lems-differential',
        summary: 'Amifampridine (3,4-DAP) 15-30 mg TID first-line; pyridostigmine adjunct. IVIG/steroids/PLEX for severe. Treat the SCLC. ED rarely initiates therapy.',
    },
    // =====================================================================
    // MODULE 8: DIFFERENTIAL
    // =====================================================================
    {
        id: 'lems-differential',
        type: 'info',
        module: 8,
        title: 'Differential',
        body: '- **[Myasthenia gravis](#/tree/myasthenia-gravis)** — closest mimic; fatigability vs facilitation, ocular/bulbar vs proximal, autonomic features, antibody, RNS decrement vs increment.\n- **[Guillain-Barré](#/tree/guillain-barre)** — ascending weakness + areflexia, but with sensory involvement, CSF albuminocytologic dissociation, and a demyelinating EMG.\n- **[Botulism](#/tree/botulism)** — also **presynaptic** with **autonomic** features (dry mouth, ileus), but **descending**, cranial-nerve-first, with **dilated/poorly reactive pupils** and an exposure history (food/wound/infant). Botulism RNS can also increment — the clinical tempo and pupil/bulbar predominance separate it.\n- **Inflammatory myopathy / polymyositis** — proximal weakness but normal reflexes, elevated CK, no facilitation, no autonomic signs.\n- Also: ALS, inclusion-body myositis, lumbar canal stenosis — LEMS is initially misdiagnosed as one of these in up to ~60% of cases.\n\n*Basis: the LEMS-versus-MG discriminators are supported by a direct comparison of weakness distribution between the two conditions [18] and by LEMS reviews [1,2]; the caution against over-reading an isolated antibody result is sourced separately [4]. The remaining entries (GBS, botulism, inflammatory myopathy, ALS, IBM, canal stenosis) are pattern-recognition contrasts drawn from narrative review, not from a prospective diagnostic-accuracy study of this differential — no validated decision rule discriminates them. The "~60% initially misdiagnosed" figure is a frequently repeated review-level estimate rather than a pooled measurement, and the underlying case series vary widely in referral pattern and era; treat it as an argument for keeping LEMS on the list, not as a performance statistic.*',
        citation: [1, 2, 4, 18],
        next: 'lems-disposition',
        summary: 'MG (fatigable/decrement), GBS (sensory/CSF/demyelinating), botulism (descending/pupils/exposure), myopathy (normal reflexes, high CK). Often misdiagnosed early.',
    },
    // =====================================================================
    // MODULE 9: DISPOSITION & PROGNOSIS
    // =====================================================================
    {
        id: 'lems-disposition',
        type: 'result',
        module: 9,
        title: 'Disposition & Prognosis',
        body: '**Disposition:**\n- **Stable:** outpatient **neurology + oncology** workup (antibody panel, EMG, CT/PET, DELTA-P). Therapy is rarely initiated in the ED.\n- **Admit** for respiratory compromise, rapidly progressive weakness, significant bulbar dysfunction, or decompensation after a precipitant drug. ICU + immunotherapy for crisis.\n\n**Prognosis:**\n- **Non-tumor LEMS:** near-normal life expectancy with treatment (~60% independent at diagnosis → ~85% within 1 year).\n- **Paraneoplastic LEMS:** tied to the SCLC. Notably, SCLC-LEMS patients have **better median survival than SCLC alone** (~17 vs ~7 months) — LEMS drives earlier detection and reflects a more active anti-tumor immune response. Complete neurologic recovery is often not achieved.',
        recommendation: 'Recognize the MG mirror-image (proximal weakness improving with use + dry mouth + augmenting reflexes), send anti-P/Q VGCC antibodies, and hunt SCLC with CT chest -> PET (DELTA-P to stratify). AVOID neuromuscular blockers, aminoglycosides/fluoroquinolones, IV magnesium, calcium-channel blockers, and IV contrast. Monitor respiratory function using MG-derived thresholds. Amifampridine is first-line symptomatic therapy; treat the underlying cancer. Admit for respiratory or bulbar compromise; otherwise outpatient neuro + onc.',
        confidence: 'recommended',
        citation: [1, 3, 6],
        summary: 'Stable -> outpatient neuro+onc; admit for respiratory/bulbar compromise. Non-tumor: good prognosis. Paraneoplastic: tied to SCLC (paradoxically better SCLC survival).',
    },
];
export const LAMBERT_EATON_NODE_COUNT = LAMBERT_EATON_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const LAMBERT_EATON_MODULE_LABELS = [
    'Recognition',
    'The Triad',
    'Diagnosis',
    'Hunt the Cancer',
    'Drugs to Avoid',
    'Respiratory Monitoring',
    'Treatment',
    'Differential',
    'Disposition',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const LAMBERT_EATON_CITATIONS = [
    { num: 1, text: 'Jayarangaiah A, Lui F, Theetha Kariyanna P. Lambert-Eaton Myasthenic Syndrome. StatPearls. Treasure Island (FL): StatPearls Publishing; updated 2023. PMID: 29939668.' },
    { num: 2, text: 'Titulaer MJ, Lang B, Verschuuren JJ. Lambert-Eaton myasthenic syndrome: from clinical characteristics to therapeutic strategies. Lancet Neurol. 2011;10(12):1098-1107.' },
    { num: 3, text: 'Lambert-Eaton myasthenic syndrome: pathogenesis, diagnosis, and therapy. PMC3182560.' },
    { num: 4, text: 'Mayo Clinic. N-type voltage-gated calcium channel antibody testing lacks diagnostic value in LEMS. 2025. PMID: 40651295.' },
    { num: 5, text: 'Titulaer MJ, Soffietti R, Dalmau J, et al; EFNS. Screening for tumours in paraneoplastic syndromes: report of an EFNS task force. Eur J Neurol. 2011;18(1):19-e3.' },
    { num: 6, text: 'Titulaer MJ, Maddison P, Sont JK, et al. Clinical DELTA-P score accurately predicts small-cell lung cancer in LEMS. J Clin Oncol. 2011;29(7):902-908.' },
    { num: 7, text: 'Amifampridine to treat Lambert-Eaton myasthenic syndrome. Review. 2020. PMID: 33185628.' },
    { num: 8, text: 'Lipka AF, et al. Lung cancer prediction in LEMS in a prospective cohort. Sci Rep. 2020;10:10802.' },
    { num: 9, text: 'Maddison P, et al. Diagnosis and Treatment of Lambert-Eaton Myasthenic Syndrome. Practical Neurology review.' },
    { num: 10, text: 'Acute Respiratory Failure Resulting From Lambert-Eaton Myasthenic Syndrome: Case Report and Literature Review. 2024. PMC11144040.' },
    { num: 11, text: 'Lambert-Eaton myasthenic syndrome during anesthesia: a report of 37 patients (Mayo perioperative series). Anaesthesia. 2014. PMID: 25468580.' },
    { num: 12, text: 'Respiratory failure in LEMS precipitated by calcium-channel blockers: case report and literature review. 2008. PMID: 19078691.' },
    { num: 13, text: 'Oh SJ, Kurokawa K, Claussen GC, Ryan HF Jr. Electrophysiological diagnostic criteria of Lambert-Eaton myasthenic syndrome. Muscle Nerve. 2005;32(4):515-520. PMID: 16003742. | Oh SJ. Distinguishing features of the repetitive nerve stimulation test between Lambert-Eaton myasthenic syndrome and myasthenia gravis, 50-year reappraisal. J Clin Neuromuscul Dis. 2017;19(2):66-75. PMID: 29189551. (The 2005 study is the source of the 60% increment threshold: 34 LEMS patients compared against reference values in 40 normal subjects and data from 538 RNS tests in myasthenia gravis, giving 97% sensitivity for LEMS and 99% specificity in excluding MG, versus 85% sensitivity for the older 100% increment "gold standard". The 2017 reappraisal — 34 LEMS vs 140 MG patients — re-confirms the >=60% increment in 97% of LEMS and is the source for low-rate-stimulation decrement being present in only 46% of MG patients.)' },
    { num: 14, text: 'Sabater L, Titulaer M, Saiz A, Verschuuren J, Güre AO, Graus F. SOX1 antibodies are markers of paraneoplastic Lambert-Eaton myasthenic syndrome. Neurology. 2008;70(12):924-928. PMID: 18032743. (SOX1 antibodies were present in 64% of patients with LEMS and SCLC but in none of the 50 patients with idiopathic LEMS, p < 0.0001; series of 105 LEMS patients, 55 with SCLC.)' },
    { num: 15, text: 'Titulaer MJ, Klooster R, Potman M, et al. SOX antibodies in small-cell lung cancer and Lambert-Eaton myasthenic syndrome: frequency and relation with survival. J Clin Oncol. 2009;27(26):4260-4267. PMID: 19667272. (In 86 LEMS patients, 43 with SCLC, SOX antibodies were 67% sensitive and 95% specific for discriminating LEMS with SCLC from non-tumour LEMS. Note the assay measures a SOX1/SOX2/SOX3/SOX21 panel, not SOX1 alone.)' },
    { num: 16, text: 'O\'Suilleabhain P, Low PA, Lennon VA. Autonomic dysfunction in the Lambert-Eaton myasthenic syndrome: serologic and clinical correlates. Neurology. 1998;50(1):88-93. PMID: 9443463. (Mayo Clinic series of 30 patients: dry mouth 77% and impotence in 45% of men were the most common symptoms; Composite Autonomic Scoring Scale abnormal in 93%, with severe autonomic failure in 20%. 93% were seropositive for P/Q-type VGCC antibodies versus only 31% for N-type — evidence against a pathogenic role for N-type antibodies.)' },
    { num: 17, text: 'O\'Neill JH, Murray NM, Newsom-Davis J. The Lambert-Eaton myasthenic syndrome. A review of 50 cases. Brain. 1988;111(Pt 3):577-596. doi:10.1093/brain/111.3.577. PMID: 2838124. (50 consecutive patients: proximal lower-limb weakness 100%, depressed tendon reflexes 92%, post-tetanic potentiation 78%, dry mouth 74%, mild/moderate ptosis 54%. A patient presenting with LEMS has a 62% risk of underlying SCLC, and that risk declines sharply after 2 years; SCLC was evident within 2 years of LEMS onset in 20 of 21 tumour cases.)' },
    { num: 18, text: 'Wirtz PW, Sotodeh M, Nijnuis M, et al. Difference in distribution of muscle weakness between myasthenia gravis and the Lambert-Eaton myasthenic syndrome. J Neurol Neurosurg Psychiatry. 2002;73(6):766-768. PMID: 12438488. (Direct comparison of 101 myasthenia gravis and 38 LEMS patients: initial weakness was extraocular in 59% of MG patients, whereas no LEMS patient had ocular weakness at onset and 95% had limb-onset weakness, p < 0.001. The authors conclude that if the first symptom is ocular weakness, LEMS is virtually excluded.)' },
    { num: 21, text: 'FIRDAPSE (amifampridine) tablets — FDA-approved prescribing information (Structured Product Label). Catalyst Pharmaceuticals, Inc. Revised 5/2024. DailyMed SPL setid f015fe60-3128-4a43-8c31-19fc6b5def3f. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f015fe60-3128-4a43-8c31-19fc6b5def3f (Indicated for the treatment of LEMS in adults and pediatric patients 6 years of age and older. Adults and pediatric patients >=45 kg: start 15-30 mg daily in 3 to 5 divided doses, increase total daily dosage by 5 mg every 3 or 4 days, maximum single dose 20 mg, maximum 100 mg/day. Pediatric patients <45 kg: start 5-15 mg daily in 3 to 5 divided doses, increase by 2.5 mg every 3 or 4 days, maximum single dose 10 mg, maximum 50 mg/day. In renal impairment, hepatic impairment and NAT2 poor metabolisers the recommended starting dosage is the lowest recommended initial daily dosage — 15 mg for patients >=45 kg, 5 mg for patients <45 kg.)' },
];
