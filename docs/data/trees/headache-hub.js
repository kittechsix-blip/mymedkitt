// MedKitt — Headache Hub (EM canonical + Neurology cross-list, type: 'hub')
//
// REWRITE 2026-05-22 PM. Original v1 used a SNOOP10-walkthrough + ICHD-3
// "phenotype triage" framing that Andy correctly called out as neurology-
// clinic thinking, not ER workflow. This rewrite is structured around how
// an attending actually sorts a headache patient in the first 5 minutes:
//
//   1. Quick sick check (gestalt + vitals + AMS)
//   2. Time-critical exclusions (question form — branches to deep-dives,
//      each with "what to do in the next 5 min while you transition")
//   3. Rescue cocktail + reassess at 60-90 min
//   4. Imaging decision (only when needed)
//   5. Disposition (admit / observe / discharge with universal checklist)
//
// CROSS-LINK DIRECTIONALITY (PLAN.md R8): hub links INTO splits; splits
// never link back. All outbound #/tree/ targets validated.
export const HEADACHE_HUB_NODES = [
    // ============================================================
    // Module 1 — Quick Sick Check
    // ============================================================
    {
        id: 'hh-start',
        type: 'info',
        module: 1,
        title: 'Headache Hub — Sick Check First',
        body: 'Walk into the room. Before any framework, sort sick vs not-sick.\n\nOpen first:\n- [Hub Steps Summary](#/info/hh-steps)\n- [Hub Stop / Pitfalls](#/info/hh-stop)\n\n**Scan in 30 seconds:**\n- General appearance — diaphoretic, ill, holding head, rocking?\n- Mental status — talking to you in full sentences, oriented?\n- Vitals trend (not single snapshot) — BP rising, fever, brady + HTN (Cushing), tachycardia, hypoxia (true SpO₂ on co-oximetry if CO suspected)\n- Quick neuro — pupils, EOMs, gross motor, speech, gait if able\n- Quick eye — red? mid-dilated? halos? proptosis?\n- Skin — petechial rash, cherry-red (CO, late), trauma signs\n\n**If ANY of:** altered, hypotensive, hypoxic, febrile + meningeal, focal deficit, active seizure, status migrainosus with vomiting + dehydration — start resus parallel to workup. Bay 1, IV access, monitor, supplemental O₂, fluid bolus, glucose, call for help. Don\'t funnel down a "headache" pathway when the patient is unstable.\n\n**If they look stable + protecting airway:** continue to time-critical exclusions (next node).',
        citation: [1, 7],
        next: 'hh-exclusions',
        summary: 'Gestalt sick check + vitals trend + quick neuro + eye + skin. If unstable: resus first, hub later.',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 2 — Time-Critical Exclusions
    // ============================================================
    {
        id: 'hh-exclusions',
        type: 'question',
        module: 2,
        title: 'Time-Critical Exclusions — Pick the One That Fits',
        body: 'Ask history-first. The features below come straight out of "tell me about this headache" + a focused 2-minute exam. Pick the most acute hit; you can return for the others.',
        options: [
            {
                label: 'First-ever / worst-of-life / thunderclap (peak <1 min)',
                description: 'SAH until proven otherwise — Ottawa rule, non-contrast CT now',
                next: 'hh-exc-sah',
                urgency: 'critical',
            },
            {
                label: 'Focal deficit, AMS, or new seizure',
                description: 'Stroke / ICH / status / mass / encephalitis — image and consult',
                next: 'hh-exc-neuro',
                urgency: 'critical',
            },
            {
                label: 'Fever + meningeal signs OR immunocompromised',
                description: 'Empiric antibiotics within 60 min — do not wait for imaging or LP',
                next: 'hh-exc-fever',
                urgency: 'critical',
            },
            {
                label: 'Painful red eye + halos around lights + nausea',
                description: 'AACG — IOP now, no mydriatics, no dim lights',
                next: 'hh-exc-eye',
                urgency: 'critical',
            },
            {
                label: 'Pregnant or postpartum',
                description: 'Pre-eclampsia / CVST / RCVS / pituitary apoplexy all on the table',
                next: 'hh-exc-pregnancy',
                urgency: 'urgent',
            },
            {
                label: 'Neck pain + Horner OR recent neck trauma / manipulation',
                description: 'Carotid or vertebral artery dissection',
                next: 'hh-exc-dissection',
                urgency: 'urgent',
            },
            {
                label: 'Postpartum + papilledema, seizure, or focal deficit',
                description: 'CVST — MRV',
                next: 'hh-exc-cvst',
                urgency: 'urgent',
            },
            {
                label: 'Winter heater, indoor fuel-burner, multiple sick at same address, or suicide attempt',
                description: 'CO toxicity — co-oximetry (standard SpO₂ lies), 100% NRB now',
                next: 'hh-exc-co',
                urgency: 'critical',
            },
            {
                label: 'Severe unilateral periorbital + ipsilateral autonomic + can\'t sit still',
                description: 'Cluster — start 100% O₂ NRB while transitioning',
                next: 'hh-exc-cluster',
                urgency: 'urgent',
            },
            {
                label: 'Electric-shock V2/V3 face pain triggered by touch / chewing / cold wind',
                description: 'Trigeminal neuralgia — HLA-B*1502 ancestry screen BEFORE first CBZ dose',
                next: 'hh-exc-tn',
            },
            {
                label: 'Age >50 + new HA + jaw claudication / scalp tenderness / vision change / polymyalgia',
                description: 'Giant cell arteritis — ESR/CRP, empiric high-dose steroid before biopsy',
                next: 'hh-exc-gca',
                urgency: 'urgent',
            },
            {
                label: 'Recent trauma',
                description: 'TBI / subdural / epidural / post-concussive — Canadian CT Head Rule',
                next: 'hh-exc-trauma',
                urgency: 'urgent',
            },
            {
                label: 'None of the above — pattern matches prior benign HA',
                description: 'Rescue cocktail + reassess at 60-90 min',
                next: 'hh-rescue',
            },
        ],
        citation: [1, 7, 4, 5, 6],
        summary: 'Pick the most acute hit. Each option branches to its deep-dive consult + tells you the next 5-min action.',
        safetyLevel: 'critical',
    },
    // -------- Time-critical exclusion branch results --------
    {
        id: 'hh-exc-sah',
        type: 'result',
        module: 2,
        title: 'Thunderclap → SAH Workup Now',
        body: 'Open [SAH](#/tree/sah) for the Ottawa SAH Rule, non-contrast CT timing (sensitivity ~98% within 6 h, drops sharply after), and LP-for-xanthochromia indications.\n\n**Next 5 minutes while transitioning:** IV access, monitor, BP control if SBP >160 (target 140-160 with labetalol or nicardipine), neuro recheck every 15 min, neurosurgery consult on positive CT.\n\n**If CT and CSF analysis both negative AND symptom onset >6 h** — also consider [Cervical Artery Dissection](#/tree/cervical-artery-dissection), [CVST](#/tree/cvst), RCVS (recurrent thunderclap + vasoactive trigger), and pituitary apoplexy (sudden HA + visual field deficit + ophthalmoplegia).',
        recommendation: 'Open SAH consult. BP control 140-160. Neurosurgery on positive CT.',
        confidence: 'definitive',
        citation: [5, 6, 7],
        safetyLevel: 'critical',
    },
    {
        id: 'hh-exc-neuro',
        type: 'result',
        module: 2,
        title: 'Focal Deficit / AMS / Seizure',
        body: 'Image first. CT non-contrast for hemorrhage / mass effect; add contrast or MRI if infectious or tumor suspected.\n\n**Open the relevant consult:**\n- [SAH](#/tree/sah) if thunderclap onset is also present\n- [ICH](#/tree/ich) for any spontaneous intracranial bleed\n- Acute ischemic stroke pathway for the tPA / EVT decision and NIHSS\n- [Meningitis / Encephalitis](#/tree/meningitis) if fever + neuro signs OR isolated AMS in immunocompromised\n- [Status Epilepticus](#/tree/status-epilepticus) if active or recent seizure\n\n**Next 5 minutes:** IV access, monitor, fingerstick glucose, accucheck airway (consider RSI if GCS ≤8), reverse anticoagulation early if ICH suspected + on anticoagulant.',
        recommendation: 'Image first. Open the deep-dive consult that fits.',
        confidence: 'definitive',
        citation: [7],
        safetyLevel: 'critical',
    },
    {
        id: 'hh-exc-fever',
        type: 'result',
        module: 2,
        title: 'Fever + Meningismus OR Immunocompromised',
        body: 'Open [Meningitis / Encephalitis](#/tree/meningitis) for empiric antibiotic + antiviral selection by age + immune status, CT-before-LP indications, CSF interpretation, and steroid adjunct timing.\n\n**Empiric antibiotics target within 60 minutes of suspicion.** Do NOT wait for imaging or LP. CT before LP IS indicated for AMS / focal deficit / papilledema / immunocompromise / recent seizure / age >60 — but that does NOT delay the empiric dose.\n\n**Standard empiric (will be refined in the Meningitis consult):** ceftriaxone 2 g IV + vancomycin 15-20 mg/kg IV, add ampicillin 2 g IV if age <3 mo or >50 yo (Listeria), add acyclovir 10 mg/kg IV if encephalitis features. Dexamethasone 10 mg IV with or just before first antibiotic dose if bacterial meningitis suspected.',
        recommendation: 'Antibiotics within 60 min. Open Meningitis consult.',
        confidence: 'definitive',
        citation: [7],
        safetyLevel: 'critical',
    },
    {
        id: 'hh-exc-eye',
        type: 'result',
        module: 2,
        title: 'Painful Red Eye + Halos → AACG',
        body: 'Open [AACG](#/tree/aacg) — emergent ophthalmology, IOP measurement now, medical IOP-lowering (timolol + brimonidine + dorzolamide + oral acetazolamide + IV mannitol if severe).\n\n🛑 **Do NOT dim the room lights** (pupillary dilation worsens angle closure).\n🛑 **Do NOT use mydriatic drops** (same reason).\n🛑 **Do NOT discharge** without ophthalmology disposition.\n\n**Differential cross-check:** if the eye pain is more "behind/around" the eye and the pupil is NORMAL or miotic with autonomic features (lacrimation, conjunctival injection, ptosis, rhinorrhea) + restlessness → [Cluster Headache](#/tree/cluster-headache), not AACG. Tolosa-Hunt (painful ophthalmoplegia from cavernous sinus inflammation) is rare and steroid-responsive — MRI + neuro/ophtho.',
        recommendation: 'Ophthalmology now. Medical IOP-lowering. No dim lights, no mydriatics.',
        confidence: 'definitive',
        citation: [7],
        safetyLevel: 'critical',
    },
    {
        id: 'hh-exc-pregnancy',
        type: 'result',
        module: 2,
        title: 'Pregnancy / Postpartum HA',
        body: 'Pregnancy + postpartum massively broadens the differential. Workup all of the following in parallel based on findings:\n\n- **[HTN in Pregnancy / Pre-eclampsia](#/tree/htn-pregnancy)** if BP ≥140/90 (or rising from baseline) + proteinuria or end-organ signs. Magnesium prophylaxis; delivery is definitive Rx.\n- **[CVST](#/tree/cvst)** if papilledema, seizure, focal deficit — postpartum hypercoag peaks at ~3 weeks. MRV.\n- **RCVS** if recurrent thunderclap + vasoactive trigger (ergots, SSRIs, cannabis, postpartum). CTA/MRA. Nimodipine per neuro.\n- **Pituitary apoplexy** if sudden severe HA + visual field defect + ophthalmoplegia.\n- **[Cervical Artery Dissection](#/tree/cervical-artery-dissection)** if neck pain + Horner — postpartum is a known risk window.\n\n**Imaging in pregnancy:** non-contrast CT acceptable for life-threats. MRI without gadolinium preferred when available. Avoid gadolinium when feasible.\n\n**Migraine analgesia in pregnancy:** acetaminophen first-line. Avoid ergots, valproate. Triptan + NSAID safety is gestational-age dependent — discuss with OB.',
        recommendation: 'Pre-eclampsia / CVST / RCVS / apoplexy / dissection in parallel. MRI no-gad if feasible.',
        confidence: 'definitive',
        citation: [8],
        safetyLevel: 'critical',
    },
    {
        id: 'hh-exc-dissection',
        type: 'result',
        module: 2,
        title: 'Neck Pain + Horner — Suspect Dissection',
        body: 'Open [Cervical Artery Dissection](#/tree/cervical-artery-dissection) for risk stratification + imaging + management.\n\n**Imaging:** CTA neck (carotid + vertebral) is the practical first study in most EDs; MRA + fat-suppressed MRI of the neck is the reference standard if available and patient is stable. Vertebral artery dissection presents as **posterior HA + neck pain ± posterior circulation stroke symptoms** — different posture than carotid.\n\n**Triggers worth asking about:** recent chiropractic manipulation, MVC (even minor), strenuous exertion, persistent cough, recent forceful vomiting, fibromuscular dysplasia, connective tissue disease.',
        recommendation: 'CTA neck. Antithrombotic decision under stroke / neuro consult.',
        confidence: 'definitive',
        citation: [7],
        safetyLevel: 'warning',
    },
    {
        id: 'hh-exc-cvst',
        type: 'result',
        module: 2,
        title: 'CVST Pathway',
        body: 'Open [CVST](#/tree/cvst). MRV is the workhorse — CT venogram is acceptable when MRV unavailable.\n\n**Think CVST when:** postpartum (especially 1-3 weeks out), hypercoagulable (factor V Leiden, OCPs + smoking, malignancy, antiphospholipid, dehydration), papilledema with HA, seizure with HA, focal deficit + HA without an arterial stroke pattern, isolated raised ICP picture without obvious cause.\n\n**Treatment** (refined in the CVST consult): therapeutic anticoagulation (UFH or LMWH) even when hemorrhagic component is present on imaging; neurology + hematology consult.',
        recommendation: 'MRV. Open CVST consult. Anticoagulate per consult algorithm.',
        confidence: 'definitive',
        citation: [7],
        safetyLevel: 'warning',
    },
    {
        id: 'hh-exc-co',
        type: 'result',
        module: 2,
        title: 'CO Toxicity Suspicion',
        body: 'Open [CO Toxicity](#/tree/co-toxicity) for full pathway (CO-Hgb threshold, hyperbaric O₂ indications per UHMS 2019, pregnancy considerations).\n\n🛑 **Standard pulse oximetry reads CO-Hgb as oxyhemoglobin — FALSELY NORMAL.** Use **co-oximetry** (arterial OR venous blood gas with co-ox, OR a SpCO finger probe) for the actual reading.\n\n**Next 5 minutes:** place patient on **100% O₂ via non-rebreather mask** (cuts CO-Hgb half-life from ~5 h on room air to ~80 min). Continue O₂ regardless of measured CO-Hgb pending the result. Pregnancy + symptomatic kids get hyperbaric consideration at lower CO-Hgb thresholds.\n\n**Ask** about winter heater / indoor fuel use / generator indoor / suicide attempt / multiple household members ill / cherry-red skin (late and unreliable).',
        recommendation: '100% NRB now. Co-oximetry (not SpO₂). Open CO Toxicity consult for HBO decision.',
        confidence: 'definitive',
        citation: [9],
        safetyLevel: 'critical',
    },
    {
        id: 'hh-exc-cluster',
        type: 'result',
        module: 2,
        title: 'Cluster Phenotype',
        body: 'Open [Cluster Headache](#/tree/cluster-headache) for the full acute → bridge → maintenance pathway.\n\n**Next 5 minutes while transitioning:** place patient on **100% O₂ via NRB at 12-15 L/min** (NOT nasal cannula — peaks at ~40% FiO₂, inadequate). O₂ is both diagnostic and therapeutic — ~78% abort within 15 min. If not aborted by 7 min, add SQ sumatriptan (per cluster consult contraindication screen first).\n\nIf O₂ + triptan both fail → consider greater [occipital nerve block](#/tree/occipital-nerve-block) at the bedside while you finalize the bridge plan.',
        recommendation: 'Start O₂ NRB 12-15 L/min. Open Cluster Headache consult.',
        confidence: 'definitive',
        citation: [3],
        safetyLevel: 'warning',
    },
    {
        id: 'hh-exc-tn',
        type: 'result',
        module: 2,
        title: 'Trigeminal Neuralgia',
        body: 'Open [Trigeminal Neuralgia](#/tree/trigeminal-neuralgia) for the full ICHD-3 confirmation → MRI triggers → CBZ ladder → surgical referral.\n\n🛑 **Before the first CBZ or oxcarbazepine dose:** screen HLA-B*1502 ancestry — Han Chinese, Thai, Vietnamese, Filipino, Malay, Indonesian. Positive = avoid both; bridge with gabapentin or baclofen while test pending or use those long-term.\n\n**Atypical features** (age <40, bilateral, V1-only, constant baseline pain, sensory deficit) require MRI brain with FIESTA/CISS trigeminal sequences BEFORE chronic CBZ — looking for vascular loop, MS plaque, or cerebellopontine angle tumor.',
        recommendation: 'HLA screen by ancestry. MRI for atypical features. Open TN consult.',
        confidence: 'definitive',
        citation: [12],
    },
    {
        id: 'hh-exc-gca',
        type: 'result',
        module: 2,
        title: 'Giant Cell Arteritis (Temporal Arteritis)',
        body: 'Age ≥50 + new HA + ANY of: jaw claudication, scalp tenderness, visual change (transient monocular vision loss / amaurosis fugax / diplopia), polymyalgia rheumatica symptoms (proximal shoulder/hip stiffness).\n\n**Work up + treat IN PARALLEL — do NOT wait for biopsy to start steroid:**\n1. **ESR + CRP** stat (ESR usually >50; up to 5% have normal ESR — CRP is more sensitive).\n2. **Empiric high-dose corticosteroid NOW:**\n   - **No visual symptoms:** prednisone 60 mg PO daily.\n   - **Visual symptoms or jaw claudication:** methylprednisolone 1 g IV daily × 3 days, then prednisone 60 mg PO.\n3. **Ophthalmology + rheumatology consult** for visual symptoms (ophtho) and biopsy + long-term management (rheum).\n4. **Temporal artery biopsy within 1-2 weeks** — steroid does NOT obscure biopsy yield in that window. Bilateral biopsy increases sensitivity.\n\n**Why the urgency:** untreated GCA causes irreversible vision loss in ~20%. Once one eye is affected, the other can follow within days.',
        recommendation: 'ESR + CRP + empiric high-dose steroid NOW. Biopsy within 1-2 weeks. Ophtho for visual symptoms.',
        confidence: 'definitive',
        citation: [7],
        safetyLevel: 'critical',
    },
    {
        id: 'hh-exc-trauma',
        type: 'result',
        module: 2,
        title: 'Post-Traumatic HA',
        body: 'Mechanism + timing + new neuro features drive the workup.\n\n**Acute (<7 days from injury) with any red flag** — LOC, GCS drop, focal deficit, repeated emesis, anticoagulation, age >65, severe mechanism — apply Canadian CT Head Rule and image with non-contrast CT. Open your shop\'s TBI / subdural pathway. Reverse anticoagulation early if ICH suspected.\n\n**Chronic (>3 months) without progressive features** — conservative management, neuro / sports-medicine follow-up. Persistent post-concussive syndrome is well described; do NOT escalate workup without new red flags.\n\n**Post-LP HA** — orthostatic component + recent LP history. Hydration + caffeine + analgesia; blood patch if >24 h unresponsive.\n\n**Spontaneous CSF leak** — orthostatic HA + tinnitus + nausea, no LP history. MRI brain with contrast (diffuse pachymeningeal enhancement) + cisternogram if needed.',
        recommendation: 'CT for acute trauma with red flags. Conservative for chronic without progression.',
        confidence: 'recommended',
        citation: [7],
    },
    // ============================================================
    // Module 3 — Rescue Cocktail + Reassess
    // ============================================================
    {
        id: 'hh-rescue',
        type: 'info',
        module: 3,
        title: 'Rescue Cocktail — Benign-Pattern HA',
        body: 'No red flags, pattern matches prior benign HA (migraine, tension, undifferentiated). Standard parenteral cocktail:\n\n**THE COCKTAIL:**\n- [Prochlorperazine 10 mg IV](#/drug/prochlorperazine/migraine cocktail) over 2 min — workhorse antidopaminergic\n- [Diphenhydramine 25 mg IV](#/drug/diphenhydramine/migraine cocktail) — akathisia prophylaxis (DO NOT SKIP — Compazine is the worst offender)\n- [Ketorolac 15-30 mg IV](#/drug/ketorolac/migraine) — NSAID component (cap 15 mg if age >65, renal disease, or low body weight)\n- [Magnesium 1-2 g IV](#/drug/magnesium-sulfate/migraine) over 15 min — adjunct, especially good for menstrual migraine and aura\n- **1 L NS bolus** — often the most therapeutic part\n\n**Reglan alternative** if Compazine unavailable or QT concern: [Metoclopramide 10 mg IV](#/drug/metoclopramide/status migrainosus) — similar efficacy, slightly less akathisia.\n\n**Avoid:** opioids (acute opioids for benign HA worsen recurrence and feed medication-overuse HA), butalbital combination products (Fioricet), repeat triptans within 24 h of any ergot.\n\n**Pregnancy:** acetaminophen IV + metoclopramide IV + diphenhydramine IV + mag is the safest cocktail. Avoid ergots, valproate; NSAIDs only if <30 weeks.',
        citation: [2, 14],
        next: 'hh-rescue-reassess',
        summary: 'Compazine 10 IV + Benadryl 25 IV + Toradol 15-30 IV + Mag 1-2 g IV + 1 L NS. Reglan if Compazine unavailable. Avoid opioids + butalbital.',
        safetyLevel: 'warning',
    },
    {
        id: 'hh-rescue-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess at 60-90 Minutes',
        body: 'Re-examine: pain score trend, ability to tolerate PO, any new neurologic features (red flag emergence), orthostatic check before discharge.',
        options: [
            {
                label: 'Pain reduced ≥50% + tolerating PO + no new neuro findings → discharge plan',
                description: 'Standard pathway for benign-pattern HA',
                next: 'hh-dispo-discharge',
            },
            {
                label: 'Partial response — needs second round or observation',
                description: 'Repeat dose of antidopaminergic / NSAID, add DHE, ED obs unit reassess at 4-6 h',
                next: 'hh-rescue-second',
                urgency: 'urgent',
            },
            {
                label: 'Refractory after second round → consider ONB or DHE protocol',
                description: 'Greater occipital nerve block at bedside; DHE 0.5-1 mg IV after antiemetic pretreatment',
                next: 'hh-rescue-refractory',
                urgency: 'urgent',
            },
            {
                label: 'New neurologic finding appeared OR escalating pain unlike presentation',
                description: 'Stop the rescue pathway. Image now. Return to time-critical exclusions.',
                next: 'hh-exclusions',
                urgency: 'critical',
            },
        ],
        citation: [2, 14],
        summary: 'Reassess at 60-90 min. Discharge if ≥50% better + PO + no new neuro. Escalate or re-image if not.',
    },
    {
        id: 'hh-rescue-second',
        type: 'result',
        module: 3,
        title: 'Second Round / Observation',
        body: '**Options for partial response:**\n- Repeat [Prochlorperazine 10 mg IV](#/drug/prochlorperazine/migraine cocktail) (or switch to [Metoclopramide 10 mg IV](#/drug/metoclopramide/status migrainosus) if Compazine + akathisia despite Benadryl)\n- Add **dexamethasone 10 mg IV** — reduces recurrence at 24-72 h by ~30% (NNT ~9 in pooled trials)\n- Add **valproate 500-1000 mg IV** over 10-15 min if not contraindicated (avoid pregnancy, liver disease)\n- Repeat NS 1 L bolus if dehydrated\n- ED obs unit for 4-6 h with planned reassessment\n\n**At second reassessment (4-6 h):**\n- If improved → discharge bundle (next node)\n- If still refractory → ONB or DHE (next node)\n- If new neuro feature → image now',
        recommendation: 'Repeat antidopaminergic, add dexamethasone, consider obs unit reassessment at 4-6 h.',
        confidence: 'recommended',
        citation: [2, 14],
    },
    {
        id: 'hh-rescue-refractory',
        type: 'result',
        module: 3,
        title: 'Refractory — ONB or DHE',
        body: '**Greater occipital nerve block (ONB)** — bedside, 5-15 min onset, works for status migrainosus + cluster + occipital neuralgia + cervicogenic + post-traumatic. Open [Greater Occipital Nerve Block](#/tree/occipital-nerve-block) for landmarks, aspiration check, agent selection, and post-procedure care.\n\n**DHE (dihydroergotamine) IV** — Raskin-style protocol: metoclopramide 10 mg IV first (anti-nausea pretreatment), then DHE 0.5-1 mg IV slow push. Repeat q8h × 3 days as inpatient if status migrainosus refractory.\n\n**Contraindications absolute for DHE:** pregnancy, CAD, uncontrolled HTN, recent triptan within 24 h, peripheral vascular disease, breastfeeding.\n\n**Disposition for true refractory status migrainosus:** admit for inpatient DHE protocol, neurology consult, IV magnesium, sleep + hydration, taper of any overused acute analgesics.',
        recommendation: 'ONB at bedside; DHE if not contraindicated; admit if true status migrainosus.',
        confidence: 'recommended',
        citation: [2, 14],
        safetyLevel: 'warning',
    },
    // ============================================================
    // Module 4 — Imaging Decision (concise reference)
    // ============================================================
    {
        id: 'hh-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging Decision Cheat-Sheet',
        body: 'You should NOT image every headache. Image when ANY of the following:\n\n**Indications for non-contrast CT head:**\n- First-or-worst / thunderclap onset\n- New HA in age >50\n- Focal deficit, AMS, seizure\n- Post-traumatic with red flags (Canadian CT Head Rule)\n- HIV / immunocompromised with new HA\n- Anticoagulated with new HA\n- Papilledema\n- Pattern change in a known primary HA disorder (new quality, new location, new frequency)\n- Pregnancy + HA with any red flag (shield abdomen)\n\n**Add modality based on suspicion:**\n- **CTA / MRA brain + neck:** suspected dissection ([Cervical Artery Dissection](#/tree/cervical-artery-dissection)), RCVS, vasculitis, vertebral pathology\n- **CT venogram or MRV:** suspected [CVST](#/tree/cvst), papilledema with negative CT\n- **MRI brain with contrast:** suspected mass, infection, MS, lower-grade pathology missed on CT (esp. posterior fossa)\n- **LP:** suspected [SAH](#/tree/sah) with negative CT >6 h from onset; suspected [Meningitis](#/tree/meningitis); idiopathic intracranial hypertension (opening pressure)\n\n**CT BEFORE LP indicated when:**\n- Decreased LOC\n- Focal neurologic deficit\n- Papilledema\n- Immunocompromise (HIV, transplant, biologic immunosuppression)\n- Recent seizure (within 1 week)\n- History of CNS disease (mass, stroke, focal infection)\n- Age >60\n- Otherwise LP can proceed without CT.\n\n**Sensitivity caveats:**\n- Non-contrast CT for SAH: ~98% within 6 h of onset; drops sharply after 12-24 h. LP for xanthochromia is the rescue test after 6 h.\n- CT misses cerebellar / posterior fossa pathology more often than MRI — low threshold to MRI if posterior fossa suspected.\n\n**No imaging needed:**\n- Recurrent benign-pattern HA in a known migraineur with no red flags\n- Tension-type pattern with no SNOOP features (yes, this is the only place "SNOOP" earns its keep — as a recall checklist when you\'re NOT imaging)',
        citation: [5, 6, 7],
        next: 'hh-dispo',
        summary: 'Image when ANY red flag. CT first; CTA/MRV/MRI/LP added by suspicion. CT-before-LP if AMS/focal/papilledema/immunocomp/recent seizure/age >60.',
    },
    // ============================================================
    // Module 5 — Disposition
    // ============================================================
    {
        id: 'hh-dispo',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Common framework across undifferentiated HA. The deep-dive consults have phenotype-specific admit criteria — defer to those once you commit.',
        options: [
            {
                label: 'Discharge — pain controlled + tolerating PO + no red flags',
                description: 'Standard pathway for benign-pattern HA after the cocktail',
                next: 'hh-dispo-discharge',
            },
            {
                label: 'Observe — partial response, awaiting labs/imaging, or social barrier',
                description: 'ED observation unit; reassess at 4-6 h',
                next: 'hh-dispo-observe',
            },
            {
                label: 'Admit — red-flag workup positive, refractory, suicidal ideation, pregnancy emergency',
                description: 'Admit per the deep-dive consult\'s admit criteria',
                next: 'hh-dispo-admit',
                urgency: 'urgent',
            },
        ],
        citation: [7, 14],
        summary: 'Discharge if controlled + PO + no flags. Observe if partial / pending. Admit per deep-dive consult criteria.',
    },
    {
        id: 'hh-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge — Universal Checklist',
        body: 'Before discharge:\n\n1. Pain reduced to acceptable level (typically ≤3/10 or back to baseline)\n2. Tolerating PO\n3. Orthostatic vitals normal (Compazine + Benadryl + Toradol can drop BP)\n4. No new neurologic findings on recheck\n5. **Suicide screen** if cluster (highest SI of any primary HA), TN, chronic migraine, or features of mood disorder + chronic pain\n6. **Written return precautions covering:**\n   - First-or-worst severity\n   - New neurologic symptom (weakness, numbness, vision change, speech change)\n   - Fever or stiff neck\n   - Persistent vomiting\n   - Severe pain unresponsive to home Rx\n   - Vision change of any kind\n   - Seizure\n7. Follow-up arranged:\n   - PCP within 1-2 weeks for new tension-type, mild migraine\n   - Neurology within 1-2 weeks for new cluster, TN, refractory migraine, atypical features\n   - OB / MFM for pregnancy-related HA\n   - Ophthalmology for AACG, optic nerve / visual concerns\n8. **Consult-specific discharge bundle delivered** — see the relevant deep-dive (e.g., home O₂ + SQ sumatriptan for cluster; verapamil titration + ECG schedule for cluster maintenance; CBZ titration + lab plan for TN).\n\n**Counseling for the typical migraineur:**\n- Avoid daily analgesic use (medication-overuse HA risk: triptans/ergots ≥10 d/mo, simple analgesics ≥15 d/mo)\n- Sleep regularity, hydration, regular meals, stress management\n- Trigger diary for 4-6 weeks if recurrent\n- Consider prophylactic referral if ≥4 HA days/mo',
        recommendation: 'Discharge only after pain controlled, PO tolerated, no new neuro, written return precautions, follow-up arranged.',
        confidence: 'definitive',
        citation: [7, 14],
    },
    {
        id: 'hh-dispo-observe',
        type: 'result',
        module: 5,
        title: 'Observe — Partial Response or Pending Workup',
        body: 'ED observation unit appropriate when:\n\n- Partial response after first cocktail round — second round + reassess at 4-6 h\n- Awaiting CSF, advanced imaging (MRI, MRV)\n- Status migrainosus on IV cocktail — assess at 4-6 h for response before escalating\n- Pain control insufficient for discharge but no admission criteria\n- Patient transportation / safety / social barriers to discharge\n\n**Reassessment at 4-6 h:**\n- Re-examine for any new neurologic signs (red flag emergence — return to Module 2)\n- Pain score trend\n- Tolerating PO\n- Orthostatic vitals\n- If improving → discharge bundle\n- If not improving → escalate (DHE, ONB, admit)',
        recommendation: 'Obs unit + 4-6 h reassessment. Re-examine for new neuro signs; escalate if no improvement.',
        confidence: 'recommended',
        citation: [7],
    },
    {
        id: 'hh-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit',
        body: 'Admit when:\n\n- **Red-flag workup positive** — SAH, ICH, meningitis, dissection, CVST, AACG with IOP not controlled medically, pre-eclampsia / eclampsia, severe CO toxicity for hyperbaric\n- **Refractory primary HA** — status migrainosus failing IV cocktail + DHE; cluster failing O₂ + 2 SQ triptans + ONB; TN crisis with dehydration and weight loss\n- **Active suicidal ideation**\n- **Severe medication adverse event** requiring monitored correction (significant hyponatremia, SJS/TEN suspicion, severe drug interaction)\n- **Initiation of IV bridging therapy requiring continuous monitoring** (IV DHE Raskin protocol, IV phenytoin/fosphenytoin loading for TN crisis, lithium initiation without reliable outpatient monitoring)\n- **Pregnancy-related HA** with pre-eclampsia / eclampsia / RCVS / CVST findings\n- **Inability to safely discharge** — severe nutritional crisis, no outpatient O₂ access for cluster, no reliable outpatient lab monitoring for lithium\n\n**Service selection:**\n- Neurology for refractory primary HA, IV bridge, TN crisis\n- Medicine for general HA with infectious workup, comorbid medical issues\n- OB for pregnancy-related HA with BP component\n- Neurosurgery for SAH / ICH / mass lesion\n- ICU for AMS, hemodynamic instability, severe CO with hyperbaric pending',
        recommendation: 'Admit per deep-dive consult criteria. Match service to the dominant diagnosis.',
        confidence: 'recommended',
        citation: [7],
        safetyLevel: 'warning',
    },
];
export const HEADACHE_HUB_CRITICAL_ACTIONS = [
    { text: 'Sick check FIRST — vitals trend + AMS + quick neuro + quick eye. If unstable, resus parallel to workup.', nodeId: 'hh-start' },
    { text: 'Thunderclap = SAH until proven otherwise. CT (~98% sens ≤6 h) → LP for xanthochromia if >6 h or negative.', nodeId: 'hh-exc-sah' },
    { text: 'Fever + meningismus or immunocompromise = empiric antibiotics within 60 min. Do NOT delay for imaging or LP.', nodeId: 'hh-exc-fever' },
    { text: 'Painful red eye + halos + mid-dilated pupil + IOP >40 = AACG. Do NOT dim lights, no mydriatics.', nodeId: 'hh-exc-eye' },
    { text: 'Pregnancy / postpartum HA: pre-eclampsia / CVST / RCVS / pituitary apoplexy / dissection all in differential.', nodeId: 'hh-exc-pregnancy' },
    { text: 'CO toxicity requires co-oximetry — standard SpO₂ is FALSELY NORMAL. 100% NRB while disposition decided.', nodeId: 'hh-exc-co' },
    { text: 'Age ≥50 + new HA + jaw claudication / scalp tenderness / vision change = GCA. Empiric steroid BEFORE biopsy.', nodeId: 'hh-exc-gca' },
    { text: 'Trigeminal neuralgia + at-risk ancestry = HLA-B*1502 screen BEFORE first CBZ or oxcarbazepine dose.', nodeId: 'hh-exc-tn' },
    { text: 'Rescue cocktail: Compazine 10 IV + Benadryl 25 IV (akathisia prophylaxis — do not skip) + Toradol 15-30 IV + Mag 1-2 g IV + 1 L NS.', nodeId: 'hh-rescue' },
    { text: 'Reassess at 60-90 min. ANY new neuro finding = stop the rescue pathway, image, return to time-critical exclusions.', nodeId: 'hh-rescue-reassess' },
    { text: 'Avoid opioids and butalbital combos for benign-pattern HA — worsens recurrence, drives medication-overuse HA.', nodeId: 'hh-rescue' },
    { text: 'Discharge requires: pain controlled + PO tolerated + no new neuro + written return precautions + follow-up arranged.', nodeId: 'hh-dispo-discharge' },
];
export const HEADACHE_HUB_CITATIONS = [
    { num: 1, text: 'Headache Classification Committee of the International Headache Society (IHS). The International Classification of Headache Disorders, 3rd edition. Cephalalgia. 2018;38(1):1-211. (ICHD-3)' },
    { num: 2, text: 'Orr SL, Friedman BW, Christie S, et al. Management of Adults With Acute Migraine in the Emergency Department: The American Headache Society Evidence Assessment of Parenteral Pharmacotherapies. Headache. 2016;56(6):911-940.' },
    { num: 3, text: 'Robbins MS, Starling AJ, Pringsheim TM, Becker WJ, Schwedt TJ. Treatment of Cluster Headache: The American Headache Society Evidence-Based Guidelines. Headache. 2016;56(7):1093-1106.' },
    { num: 4, text: 'Do TP, Remmers A, Schytz HW, et al. Red and orange flags for secondary headaches in clinical practice: SNNOOP10 list. Neurology. 2019;92(3):134-144.' },
    { num: 5, text: 'Perry JJ, Stiell IG, Sivilotti ML, et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache. JAMA. 2013;310(12):1248-1255. (Ottawa SAH Rule)' },
    { num: 6, text: 'Perry JJ, Sivilotti MLA, Sutherland J, et al. Validation of the Ottawa Subarachnoid Hemorrhage Rule in patients with acute headache. CMAJ. 2017;189(45):E1379-E1385.' },
    { num: 7, text: 'Godwin SA, Cherkas DS, Panagos PD, Shih RD, Byyny R, Wolf SJ. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the Emergency Department With Acute Headache. Ann Emerg Med. 2019;74(4):e41-e74. (ACEP 2019)' },
    { num: 8, text: 'American College of Obstetricians and Gynecologists. ACOG Committee Opinion No. 723: Guidelines for diagnostic imaging during pregnancy and lactation. Obstet Gynecol. 2017;130(4):e210-e216. / ACOG Practice Bulletin: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.' },
    { num: 9, text: 'Weaver LK; Undersea and Hyperbaric Medical Society. Hyperbaric oxygen therapy indications. 14th ed. UHMS, 2019. (HBO indications for CO poisoning)' },
    { num: 12, text: 'Cruccu G, Gronseth G, Alksne J, et al. AAN-EFNS guidelines on trigeminal neuralgia management. Neurology. 2008;71(15):1183-1190.' },
    { num: 14, text: 'Friedman BW, Mulvey L, Esses D, et al. Metoclopramide for acute migraine: a dose-finding randomized clinical trial. Ann Emerg Med. 2011;57(5):475-482.' },
];
export const HEADACHE_HUB_NODE_COUNT = HEADACHE_HUB_NODES.length;
export const HEADACHE_HUB_MODULE_LABELS = [
    'Sick Check',
    'Time-Critical Exclusions',
    'Rescue Cocktail',
    'Imaging',
    'Disposition',
];
