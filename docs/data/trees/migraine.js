// MedKitt — Migraine (Diagnosis & Treatment)
// Sources: EB Medicine, UpToDate, OpenEvidence, AHS 2025 Guidelines
// 6 modules: Red Flag Screen → Diagnosis → First-Line Treatment → Rescue Therapy → Nerve Blocks → Disposition
// ~30 nodes total
export const MIGRAINE_NODES = [
    // =====================================================================
    // MODULE 1: RED FLAG SCREENING
    // =====================================================================
    {
        id: 'migraine-start',
        type: 'info',
        module: 1,
        title: 'Migraine: Initial Assessment',
        body: '**Primary headache** — migraine, tension-type, cluster — accounts for most ED headache visits. But first, **rule out secondary causes**.\n\n**Key Question:** Does this patient have any red flags suggesting a dangerous secondary headache?\n\n**SNNOOP10 Mnemonic — Red Flags:**\n- **S**ystemic symptoms (fever, weight loss, immunocompromise)\n- **N**eoplasm history\n- **N**eurologic deficit (decreased LOC, focal signs)\n- **O**nset sudden (thunderclap — SAH, RCVS, CVT)\n- **O**lder age onset (>50 years — GCA, stroke, mass)\n- **P**attern change or new headache\n- Positional, Precipitated by Valsalva, Papilledema\n- Progressive, Pregnancy/puerperium, Painful eye + autonomic\n- Post-traumatic, Pathology of immune system, Painkiller overuse\n\n[Ottawa SAH Rule](#/calculator/ottawa-sah) — validated decision tool for thunderclap headache. [1][2]',
        images: [
            { src: 'images/migraine/trigeminal-nerve.png', alt: 'Sensory distribution of the three divisions of the trigeminal nerve (V1, V2, V3) on the face', caption: 'Trigeminal nerve sensory distribution — migraine pain is mediated through the trigeminovascular pathway. V1 (ophthalmic), V2 (maxillary), V3 (mandibular). Henry Vandyke Carter / Gray\'s Anatomy (1918). Public domain.' },
        ],
        citation: [1, 2],
        calculatorLinks: [
            { id: 'ottawa-sah', label: 'Ottawa SAH Rule' },
        ],
        next: 'migraine-red-flags',
    },
    {
        id: 'migraine-red-flags',
        type: 'question',
        module: 1,
        title: 'Red Flag Assessment',
        body: '**Does the patient have ANY of the following?**\n\n- Sudden onset "thunderclap" headache (peak intensity <1 min)\n- Worst headache of life\n- New neurologic deficit (weakness, numbness, vision loss, confusion)\n- Fever + neck stiffness (meningitis signs)\n- Papilledema on fundoscopy\n- New headache in patient >50 years old\n- Headache with immunocompromise or cancer history\n- Post-traumatic headache\n- Pregnancy/postpartum\n- Progressively worsening over days-weeks\n\n**If ANY present → workup for secondary cause before treating as migraine.**',
        citation: [1, 2],
        options: [
            {
                label: 'Yes — Red Flag Present',
                description: 'Workup for secondary cause (CT, LP, etc.)',
                next: 'migraine-secondary-workup',
                urgency: 'critical',
            },
            {
                label: 'No — No Red Flags',
                description: 'Proceed to migraine diagnosis',
                next: 'migraine-diagnosis',
            },
        ],
    },
    {
        id: 'migraine-secondary-workup',
        type: 'info',
        module: 1,
        title: 'Secondary Headache Workup',
        body: '**Red flag present — evaluate for dangerous secondary causes:**\n\n**Thunderclap headache:**\n- CT head non-contrast (sens ~95% for SAH within 6h)\n- If CT negative + high suspicion → LP (xanthochromia)\n- Consider CTA for aneurysm, RCVS, CVT\n\n**Fever + neck stiffness:**\n- LP for meningitis (unless contraindicated)\n- Blood cultures, empiric antibiotics if delayed LP\n\n**New neuro deficit:**\n- CT head → MRI if CT negative\n- Consider stroke workup\n\n**Age >50, new headache:**\n- ESR, CRP for giant cell arteritis (GCA)\n- Temporal artery biopsy if high suspicion\n\n**Papilledema:**\n- CT/MRI for mass, hydrocephalus\n- LP for opening pressure (IIH)\n\n**If workup negative** → return to migraine pathway.\n\n[SAH Consult](#/consult/sah) | [Meningitis Consult](#/consult/meningitis) | [Stroke Consult](#/consult/stroke)',
        citation: [1, 2],
        next: 'migraine-diagnosis',
    },
    // =====================================================================
    // MODULE 2: DIAGNOSIS
    // =====================================================================
    {
        id: 'migraine-diagnosis',
        type: 'question',
        module: 2,
        title: 'Does This Meet Migraine Criteria?',
        body: '**ICHD-3 Migraine Without Aura Criteria:**\n\n**A.** ≥5 attacks meeting B-D\n\n**B.** Duration 4-72 hours (untreated)\n\n**C.** ≥2 of 4:\n- Unilateral location\n- Pulsating quality\n- Moderate-severe intensity\n- Aggravated by routine physical activity\n\n**D.** During headache, ≥1 of:\n- Nausea and/or vomiting\n- Photophobia AND phonophobia\n\n**E.** Not better explained by another diagnosis\n\n**Migraine WITH Aura:** Add fully reversible visual, sensory, or speech symptoms lasting 5-60 min, followed by headache within 60 min.\n\nDoes this presentation meet migraine criteria?',
        citation: [1, 3],
        calculatorLinks: [
            { id: 'migraine-criteria', label: 'ICHD-3 Criteria Check' },
        ],
        options: [
            {
                label: 'Yes — Meets Migraine Criteria',
                description: 'Typical migraine features present',
                next: 'migraine-severity',
            },
            {
                label: 'Probable Migraine',
                description: 'Most features but missing 1 criterion',
                next: 'migraine-severity',
            },
            {
                label: 'Not Migraine — Other Primary Headache',
                description: 'Consider tension-type, cluster, or other',
                next: 'migraine-other-primary',
            },
        ],
    },
    {
        id: 'migraine-other-primary',
        type: 'info',
        module: 2,
        title: 'Other Primary Headaches',
        body: '**If not migraine, consider:**\n\n**Tension-Type Headache:**\n- Bilateral, pressing/tightening (non-pulsating)\n- Mild-moderate intensity\n- NOT aggravated by routine activity\n- No nausea/vomiting\n- Treatment: NSAIDs, acetaminophen\n\n**Cluster Headache (Trigeminal Autonomic Cephalalgia):**\n- Severe unilateral orbital/supraorbital pain\n- Duration 15-180 min, up to 8/day\n- Ipsilateral autonomic features (tearing, rhinorrhea, ptosis, miosis)\n- Treatment: 100% O₂ 12-15 L/min x 15 min, sumatriptan SC\n\n**Medication Overuse Headache:**\n- Headache ≥15 days/month\n- Regular overuse of acute headache meds ≥3 months\n- Treatment: Withdraw offending medication, bridge therapy\n\nIf atypical features → reassess for secondary causes.',
        citation: [1],
        next: 'migraine-severity',
    },
    {
        id: 'migraine-severity',
        type: 'question',
        module: 2,
        title: 'Assess Migraine Severity',
        body: '**Assess current attack severity:**\n\n**Mild:**\n- Pain 1-3/10\n- Able to function\n- No significant nausea/vomiting\n- May respond to oral meds\n\n**Moderate:**\n- Pain 4-6/10\n- Functional impairment\n- Some nausea\n- May need parenteral therapy\n\n**Severe / Status Migrainosus:**\n- Pain 7-10/10\n- Debilitated\n- Significant nausea/vomiting\n- May have been >72 hours (status migrainosus)\n- Requires IV therapy\n\nWhat is the severity?',
        citation: [1, 3],
        options: [
            {
                label: 'Mild',
                description: 'Pain 1-3/10, functional',
                next: 'migraine-mild-treatment',
            },
            {
                label: 'Moderate',
                description: 'Pain 4-6/10, impaired function',
                next: 'migraine-first-line',
            },
            {
                label: 'Severe',
                description: 'Pain 7-10/10, debilitated',
                next: 'migraine-first-line',
                urgency: 'urgent',
            },
            {
                label: 'Status Migrainosus (>72 hours)',
                description: 'Prolonged severe migraine',
                next: 'migraine-status',
                urgency: 'urgent',
            },
        ],
    },
    // =====================================================================
    // MODULE 3: FIRST-LINE TREATMENT
    // =====================================================================
    {
        id: 'migraine-mild-treatment',
        type: 'info',
        module: 3,
        title: 'Mild Migraine — Oral Therapy',
        body: '**Mild migraine may respond to oral medications:**\n\n**First-Line Options:**\n- **NSAIDs:** Ibuprofen 400-800 mg, Naproxen 500-550 mg, Ketorolac 10 mg PO\n- **Acetaminophen:** 1000 mg (if NSAIDs contraindicated)\n- **Triptan:** Sumatriptan 50-100 mg, Rizatriptan 10 mg, Eletriptan 40 mg\n\n**Combination more effective than monotherapy:**\n- Sumatriptan 50-100 mg + Naproxen 500 mg (Treximet)\n\n**Antiemetic if nausea:**\n- Ondansetron 4-8 mg ODT\n- Metoclopramide 10 mg PO\n\n**If no improvement in 1-2 hours** → escalate to parenteral therapy.\n\n**Triptan Contraindications:**\n- CAD, prior MI/stroke\n- Uncontrolled hypertension\n- Hemiplegic or basilar migraine\n- MAO inhibitor use within 14 days',
        citation: [3, 4],
        treatment: {
            firstLine: {
                drug: 'Ibuprofen + Sumatriptan',
                dose: 'Ibuprofen 400-800 mg + Sumatriptan 50-100 mg',
                route: 'PO',
                frequency: 'Once, may repeat sumatriptan x1 after 2h',
                duration: 'Single dose',
                notes: 'Combination therapy more effective than monotherapy',
            },
            alternative: {
                drug: 'Naproxen',
                dose: '500-550 mg',
                route: 'PO',
                frequency: 'Once',
                duration: 'Single dose',
                notes: 'May combine with triptan; preferred NSAID for longer duration',
            },
            nsaidAllergy: {
                drug: 'Acetaminophen + Sumatriptan',
                dose: 'Acetaminophen 1000 mg + Sumatriptan 50-100 mg',
                route: 'PO',
                frequency: 'Once',
                duration: 'Single dose',
                notes: 'Use if NSAIDs contraindicated',
            },
            monitoring: 'Reassess in 1-2 hours; escalate to parenteral therapy if no improvement',
        },
        next: 'migraine-response-check',
    },
    {
        id: 'migraine-first-line',
        type: 'info',
        module: 3,
        title: 'Moderate-Severe Migraine — IV Cocktail',
        body: '**2025 AHS Guidelines — ED First-Line:**\n\n**Standard "Migraine Cocktail":**\n\n| Step | Medication | Dose | Notes |\n|------|------------|------|-------|\n| 1 | **Diphenhydramine** | 25-50 mg IV | Give FIRST (prevents akathisia) |\n| 2 | **Prochlorperazine** | 10 mg IV over 15 min | **Level A — Must Offer** (upgraded 2025) |\n| 3 | **Ketorolac** | 15-30 mg IV | 15 mg equally effective as 30 mg |\n| 4 | **NS Bolus** | 500-1000 mL | If dehydrated from vomiting |\n\n⚡ **2025 Update:** Prochlorperazine upgraded to Level A (from Level B). Preferred over metoclopramide when available.\n\n**Before discharge, add:**\n- **Dexamethasone** 10 mg IV — prevents 48-72h recurrence (NNT=9)\n\n**Key Points:**\n- Slow infusion (15 min) reduces akathisia by 61%\n- Darken the room\n- Give all meds up front (more effective than stepwise)\n- Reassess at 30-60 min [1][3][4]',
        citation: [1, 3, 4],
        calculatorLinks: [
            { id: 'migraine-tx-algo', label: 'Treatment Algorithm' },
        ],
        treatment: {
            firstLine: {
                drug: 'Diphenhydramine + Prochlorperazine + Ketorolac',
                dose: 'Diphenhydramine 25-50 mg + Prochlorperazine 10 mg + Ketorolac 15-30 mg',
                route: 'IV',
                frequency: 'Once (give all meds together)',
                duration: 'Single dose; infuse prochlorperazine over 15 min',
                notes: 'Give diphenhydramine FIRST to prevent akathisia; 15 mg ketorolac equally effective as 30 mg',
            },
            alternative: {
                drug: 'Diphenhydramine + Metoclopramide + Ketorolac',
                dose: 'Diphenhydramine 25-50 mg + Metoclopramide 10-20 mg + Ketorolac 15-30 mg',
                route: 'IV',
                frequency: 'Once',
                duration: 'Single dose; infuse metoclopramide slowly',
                notes: 'Second-line per 2025 AHS (Level B); use if prochlorperazine unavailable',
            },
            adjunct: {
                drug: 'Dexamethasone',
                dose: '10 mg',
                route: 'IV',
                frequency: 'Once before discharge',
                duration: 'Single dose',
                notes: 'Prevents 48-72h recurrence (NNT=9); give to all patients before discharge',
            },
            monitoring: 'Reassess at 30-60 min; monitor for akathisia, dystonia, sedation',
        },
        next: 'migraine-response-check',
    },
    {
        id: 'migraine-status',
        type: 'info',
        module: 3,
        title: 'Status Migrainosus (>72 hours)',
        body: '**Status migrainosus = migraine lasting >72 hours**\n\n**Initial Management:**\n- Aggressive IV hydration (1-2L NS)\n- Standard migraine cocktail (prochlorperazine + diphenhydramine + ketorolac)\n- **Dexamethasone 10 mg IV** (reduces recurrence)\n\n**If standard cocktail fails:**\n\n**Dihydroergotamine (DHE) Protocol:**\n- Metoclopramide 10 mg IV (give 30 min before DHE)\n- DHE 1 mg IV over 3 min\n- Can repeat DHE 0.5-1 mg q8h x 24-48h if needed\n- **Contraindicated:** CAD, uncontrolled HTN, pregnancy, recent triptan use\n\n**Alternative:**\n- **Valproate** 500-1000 mg IV (Level C)\n- **Magnesium sulfate** 1-2 g IV\n\n**Consider admission if:**\n- Refractory to multiple agents\n- Severe dehydration\n- Unable to tolerate PO\n- Need for DHE protocol [1][3]',
        citation: [1, 3],
        treatment: {
            firstLine: {
                drug: 'Migraine Cocktail + Dexamethasone + IV Fluids',
                dose: 'Diphenhydramine 25-50 mg + Prochlorperazine 10 mg + Ketorolac 15-30 mg + Dexamethasone 10 mg + NS 1-2L',
                route: 'IV',
                frequency: 'Once',
                duration: 'Single dose cocktail; fluids over 1-2 hours',
                notes: 'Aggressive hydration critical in status migrainosus',
            },
            alternative: {
                drug: 'Dihydroergotamine (DHE) Protocol',
                dose: 'Metoclopramide 10 mg IV (30 min before), then DHE 1 mg IV over 3 min',
                route: 'IV',
                frequency: 'DHE 0.5-1 mg q8h',
                duration: '24-48 hours (requires admission)',
                notes: 'Contraindicated: CAD, uncontrolled HTN, pregnancy, triptan within 24h',
            },
            adjunct: {
                drug: 'Magnesium sulfate',
                dose: '1-2 g',
                route: 'IV',
                frequency: 'Once',
                duration: 'Infuse over 15-30 min',
                notes: 'Especially helpful if migraine with aura',
            },
            monitoring: 'Monitor for DHE side effects: nausea, chest tightness, leg cramps; telemetry if DHE protocol',
        },
        next: 'migraine-response-check',
    },
    {
        id: 'migraine-response-check',
        type: 'question',
        module: 3,
        title: 'Treatment Response Assessment',
        body: '**Reassess at 30-60 minutes:**\n\n**Good response:**\n- Pain significantly improved (≥50% reduction)\n- Nausea resolved\n- Able to tolerate PO\n- Ready for discharge\n\n**Partial response:**\n- Some improvement but still significant pain\n- May need additional therapy\n\n**No response:**\n- Pain unchanged or worse\n- Consider rescue therapy or nerve block\n\nWhat is the response?',
        citation: [1],
        options: [
            {
                label: 'Good Response',
                description: 'Pain significantly improved, ready for discharge',
                next: 'migraine-disposition',
            },
            {
                label: 'Partial Response',
                description: 'Some improvement, needs more therapy',
                next: 'migraine-rescue',
            },
            {
                label: 'No Response',
                description: 'Pain unchanged, need rescue therapy',
                next: 'migraine-rescue',
                urgency: 'urgent',
            },
        ],
    },
    // =====================================================================
    // MODULE 4: RESCUE THERAPY
    // =====================================================================
    {
        id: 'migraine-rescue',
        type: 'question',
        module: 4,
        title: 'Rescue Therapy Options',
        body: '**First-line failed — rescue options:**\n\n**Level A (Must Offer):**\n- **Greater Occipital Nerve Block** — highly effective, no systemic side effects\n\n**Level B (Should Offer):**\n- **Sumatriptan SC** 6 mg — if no contraindications\n- **Supraorbital Nerve Block** — alternative to GON\n\n**Level C (May Offer):**\n- **Valproate IV** 500-1000 mg — third-line\n- **Chlorpromazine IV** 12.5 mg — alternative antiemetic\n- **Magnesium sulfate** 1-2 g IV — especially if aura\n\n**Emerging (Limited Evidence):**\n- **Ketamine** low-dose IV\n- **Lidocaine** IV infusion\n- **SPG block** (intranasal)\n\n**DO NOT USE:**\n- **Opioids** — Level A against (hydromorphone ineffective)\n- **IV Acetaminophen** — likely ineffective\n\nSelect rescue approach:',
        citation: [1, 3, 4],
        options: [
            {
                label: 'Greater Occipital Nerve Block',
                description: 'Level A recommendation, highly effective',
                next: 'migraine-gon-block',
            },
            {
                label: 'Sumatriptan SC 6 mg',
                description: 'If no vascular contraindications',
                next: 'migraine-triptan-rescue',
            },
            {
                label: 'Valproate IV',
                description: 'Third-line option',
                next: 'migraine-valproate',
            },
            {
                label: 'SPG Block (Intranasal)',
                description: 'Non-invasive nerve block',
                next: 'migraine-spg-block',
            },
        ],
    },
    {
        id: 'migraine-triptan-rescue',
        type: 'info',
        module: 4,
        title: 'Triptan Rescue',
        body: '**Sumatriptan SC 6 mg:**\n\n**Dosing:** 6 mg SC, may repeat x1 after 1 hour (max 12 mg/24h)\n\n**Contraindications:**\n- Coronary artery disease, prior MI\n- Stroke or TIA history\n- Uncontrolled hypertension\n- Hemiplegic or basilar migraine\n- MAO inhibitor within 14 days\n- Pregnancy (relative)\n\n**Side Effects:**\n- Chest tightness (usually benign "triptan sensation")\n- Tingling, flushing, dizziness\n- Injection site reaction\n\n**Alternative Routes:**\n- Sumatriptan nasal 20 mg\n- Zolmitriptan nasal 5 mg\n\n**If triptan fails or contraindicated** → proceed to nerve block.',
        citation: [3, 4],
        treatment: {
            firstLine: {
                drug: 'Sumatriptan',
                dose: '6 mg',
                route: 'SC',
                frequency: 'May repeat x1 after 1 hour',
                duration: 'Max 12 mg/24h',
                notes: 'Most effective route; onset 10-15 min',
            },
            alternative: {
                drug: 'Sumatriptan nasal',
                dose: '20 mg',
                route: 'Intranasal',
                frequency: 'May repeat x1 after 2 hours',
                duration: 'Max 40 mg/24h',
                notes: 'Alternative if patient refuses injection',
            },
            vascularContraindication: {
                drug: 'Proceed to nerve block',
                dose: 'N/A',
                route: 'N/A',
                frequency: 'N/A',
                duration: 'N/A',
                notes: 'If CAD, prior MI/stroke, uncontrolled HTN, hemiplegic/basilar migraine',
            },
            monitoring: 'Observe for chest tightness (usually benign triptan sensation); contraindicated if vascular disease',
        },
        next: 'migraine-response-rescue',
    },
    {
        id: 'migraine-valproate',
        type: 'info',
        module: 4,
        title: 'Valproate IV — Third-Line',
        body: '**Valproate sodium IV:**\n\n**Dosing:** 500-1000 mg IV over 30-60 min\n\n**Mechanism:** Anticonvulsant with migraine prophylactic effect; may work acutely via GABA modulation.\n\n**Evidence:** Level C (may offer) — limited but some trials show benefit.\n\n**Contraindications:**\n- Hepatic disease\n- Pregnancy (teratogenic — neural tube defects)\n- Pancreatitis history\n- Urea cycle disorders\n\n**Side Effects:**\n- Nausea, sedation\n- Thrombocytopenia (with chronic use)\n- Hepatotoxicity (rare)\n\n**Best for:**\n- Refractory status migrainosus\n- Patients who cannot receive other options\n- Consider if planning prophylaxis with valproate',
        citation: [1, 3],
        treatment: {
            firstLine: {
                drug: 'Valproate sodium',
                dose: '500-1000 mg',
                route: 'IV',
                frequency: 'Once',
                duration: 'Infuse over 30-60 min',
                notes: 'Level C evidence; third-line option for refractory migraine',
            },
            pregnancyContraindication: {
                drug: 'DO NOT USE',
                dose: 'N/A',
                route: 'N/A',
                frequency: 'N/A',
                duration: 'N/A',
                notes: 'Teratogenic (neural tube defects); contraindicated in pregnancy',
            },
            monitoring: 'Monitor for nausea, sedation; check LFTs if hepatic disease suspected; avoid in pregnancy',
        },
        next: 'migraine-response-rescue',
    },
    // =====================================================================
    // MODULE 5: NERVE BLOCKS
    // =====================================================================
    {
        id: 'migraine-gon-block',
        type: 'info',
        module: 5,
        title: 'Greater Occipital Nerve Block',
        body: '**GON Block — Level A Recommendation**\n\n**Indications:**\n- Migraine with occipital component\n- Refractory to first-line therapy\n- Contraindication to other treatments\n\n**Equipment:**\n- 25-27 gauge, 1.5 inch needle\n- 3 mL syringe\n- 2% lidocaine OR 0.5% bupivacaine (2-3 mL per side)\n\n**Technique:**\n1. Patient seated, head flexed forward\n2. Locate occipital protuberance\n3. GON is 1/3 distance from protuberance to mastoid, medial to occipital artery\n4. Clean with alcohol\n5. Insert needle at 45° angle, aim superior/medial\n6. Advance to bone, withdraw 1-2 mm\n7. Aspirate → inject 2-3 mL\n8. Can do bilateral if needed\n\n**Onset:** 5-10 minutes\n**Duration:** Hours to days\n\n**Complications:** Rare — local hematoma, transient numbness, rare vasovagal [1][5]',
        citation: [1, 5],
        images: [],
        treatment: {
            firstLine: {
                drug: 'Lidocaine 2%',
                dose: '2-3 mL per side',
                route: 'Local injection (GON)',
                frequency: 'Once; can do bilateral',
                duration: 'Hours to days effect',
                notes: 'Onset 5-10 min; Level A recommendation',
            },
            alternative: {
                drug: 'Bupivacaine 0.5%',
                dose: '2-3 mL per side',
                route: 'Local injection (GON)',
                frequency: 'Once; can do bilateral',
                duration: 'Longer duration than lidocaine',
                notes: 'Preferred for longer-lasting effect',
            },
            monitoring: 'Observe 15 min post-procedure; watch for vasovagal, local hematoma; reassess pain at 30 min',
        },
        next: 'migraine-response-rescue',
    },
    {
        id: 'migraine-spg-block',
        type: 'info',
        module: 5,
        title: 'Sphenopalatine Ganglion Block',
        body: '**SPG Block — Non-Invasive Alternative**\n\n**Indications:**\n- Migraine, cluster headache\n- Alternative when GON not appropriate\n\n**Cotton Applicator Technique:**\n1. Soak 10 cm cotton-tipped applicator in 2% lidocaine\n2. Patient supine, head in sniffing position\n3. Insert along floor of nose / superior to middle turbinate\n4. Advance until resistance at nasopharynx\n5. Leave in place 10-20 minutes\n6. Repeat on other side if bilateral symptoms\n\n**Atomizer Technique:**\n1. 5 mL syringe with atomizer attachment\n2. Apply 2 mL 2% lidocaine to each nostril\n3. Patient holds breath, sniffs gently\n4. Reassess in 10-15 minutes\n\n**Warn patient:** Throat numbness — avoid eating/drinking until resolved.\n\n**Evidence:** Level U (insufficient) but safe and reasonable to try. [5]',
        citation: [5],
        treatment: {
            firstLine: {
                drug: 'Lidocaine 2% (cotton applicator)',
                dose: 'Saturate 10 cm cotton-tipped applicator',
                route: 'Intranasal (transnasal)',
                frequency: 'Leave in place 10-20 min; bilateral if needed',
                duration: 'Single application',
                notes: 'Non-invasive; patient supine with head in sniffing position',
            },
            alternative: {
                drug: 'Lidocaine 2% (atomizer)',
                dose: '2 mL per nostril',
                route: 'Intranasal spray',
                frequency: 'Once; reassess in 10-15 min',
                duration: 'Single application',
                notes: 'Faster but may be less effective than applicator technique',
            },
            monitoring: 'Warn patient about throat numbness; NPO until numbness resolves; reassess pain at 15-20 min',
        },
        next: 'migraine-response-rescue',
    },
    {
        id: 'migraine-response-rescue',
        type: 'question',
        module: 5,
        title: 'Rescue Response Assessment',
        body: '**Reassess 30-60 minutes after rescue therapy:**\n\n**Improved:**\n- Pain now tolerable\n- Ready for discharge planning\n\n**Still refractory:**\n- Multiple treatments failed\n- Consider admission for DHE protocol\n- Neurology consult\n\nWhat is the response?',
        citation: [1],
        options: [
            {
                label: 'Improved — Ready for Discharge',
                description: 'Pain tolerable, can take PO',
                next: 'migraine-disposition',
            },
            {
                label: 'Still Refractory',
                description: 'Multiple treatments failed',
                next: 'migraine-refractory',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'migraine-refractory',
        type: 'info',
        module: 5,
        title: 'Refractory Migraine — Consider Admission',
        body: '**Multiple treatments failed — options:**\n\n**Admission for DHE Protocol:**\n- Metoclopramide 10 mg IV q8h (30 min before each DHE)\n- DHE 1 mg IV q8h x 24-72 hours\n- Requires telemetry monitoring\n- Contraindicated: CAD, uncontrolled HTN, recent triptan\n\n**Neurology Consult indications:**\n- Status migrainosus >72h refractory to ED treatment\n- Frequent ED visits for migraine\n- Need for prophylaxis evaluation\n- Atypical features concerning for secondary cause\n\n**Admission Criteria:**\n- Refractory to ≥3 parenteral treatments\n- Severe dehydration\n- Unable to tolerate PO\n- Need for DHE protocol\n- Concern for secondary cause requiring inpatient workup\n\n**If discharging despite incomplete relief:**\n- Provide rescue meds (triptan, NSAID, antiemetic)\n- Neurology follow-up within 1-2 weeks\n- Clear return precautions',
        citation: [1, 3],
        next: 'migraine-disposition',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'migraine-disposition',
        type: 'result',
        module: 6,
        title: 'Migraine — Disposition',
        body: '**Before Discharge:**\n\n**1. Dexamethasone 10 mg IV** — prevents 48-72h recurrence (NNT=9)\n\n**2. Discharge Medications:**\n- Triptan (sumatriptan, rizatriptan) — if no contraindications\n- NSAID (naproxen, ibuprofen)\n- Antiemetic PRN (ondansetron ODT, metoclopramide)\n\n**3. Return Precautions:**\n- Sudden severe "worst headache of life"\n- New fever, neck stiffness\n- Confusion, weakness, vision changes\n- Seizure\n- Headache significantly different from usual\n\n**4. Referral:**\n- Neurology if ≥4 migraines/month (prophylaxis candidate)\n- PCP follow-up for medication optimization\n\n**5. Patient Education:**\n- Avoid medication overuse (>10-15 days/month)\n- Keep headache diary\n- Identify triggers (sleep, stress, diet, menses)\n\n**Admission if:** Refractory to multiple treatments, dehydration, unable to tolerate PO, DHE protocol needed.',
        recommendation: 'Discharge with dexamethasone (prevents recurrence), triptan + NSAID prescription, and neurology referral if frequent migraines. Return precautions for thunderclap headache, fever, or neuro changes.',
        confidence: 'recommended',
        citation: [1, 3, 4],
        calculatorLinks: [
            { id: 'migraine-criteria', label: 'ICHD-3 Criteria' },
            { id: 'migraine-tx-algo', label: 'Treatment Algorithm' },
        ],
        treatment: {
            firstLine: {
                drug: 'Dexamethasone (pre-discharge)',
                dose: '10 mg',
                route: 'IV',
                frequency: 'Once before discharge',
                duration: 'Single dose',
                notes: 'Prevents 48-72h recurrence (NNT=9); give to all migraine discharges',
            },
            dischargeMeds: {
                drug: 'Sumatriptan + Naproxen + Ondansetron',
                dose: 'Sumatriptan 50-100 mg, Naproxen 500 mg, Ondansetron 4-8 mg ODT',
                route: 'PO',
                frequency: 'PRN for recurrence',
                duration: 'Rx for 6-9 doses each',
                notes: 'Triptan contraindicated if vascular disease; can substitute rizatriptan 10 mg',
            },
            vascularContraindication: {
                drug: 'NSAID + Antiemetic only',
                dose: 'Naproxen 500 mg + Ondansetron 4-8 mg ODT',
                route: 'PO',
                frequency: 'PRN',
                duration: 'Rx for 6-9 doses',
                notes: 'Omit triptan if CAD, prior MI/stroke, uncontrolled HTN',
            },
            monitoring: 'Return if thunderclap headache, fever/neck stiffness, neuro changes, or significantly different headache pattern',
        },
    },
];
export const MIGRAINE_NODE_COUNT = MIGRAINE_NODES.length;
export const MIGRAINE_MODULE_LABELS = [
    'Red Flag Screen',
    'Diagnosis',
    'First-Line Treatment',
    'Rescue Therapy',
    'Nerve Blocks',
    'Disposition',
];
export const MIGRAINE_CRITICAL_ACTIONS = [
    { text: 'Ottawa SAH Rule: sudden-onset worst headache, thunderclap onset, age ≥40 with new headache = CT + LP if negative', nodeId: 'migraine-red-flags' },
    { text: 'First-line: Prochlorperazine 10 mg IV + metoclopramide 10 mg IV + ketorolac 30 mg IV + NS 1L bolus', nodeId: 'migraine-first-line' },
    { text: 'Magnesium 2g IV over 15 min (especially for aura)', nodeId: 'migraine-magnesium' },
    { text: 'Avoid opioids (rebound headache, medication overuse)', nodeId: 'migraine-avoid-opioids' },
    { text: 'Greater occipital nerve block for refractory migraine (0.5% bupivacaine 3-5 mL)', nodeId: 'migraine-nerve-block' },
    { text: 'Dexamethasone 10 mg IV/IM to prevent recurrence within 72h', nodeId: 'migraine-dexamethasone' },
    { text: 'Triptans contraindicated in basilar/hemiplegic migraine, uncontrolled HTN, recent stroke/MI', nodeId: 'migraine-triptan-contraindications' },
    { text: 'Admit for thunderclap onset, new neurologic deficits, or inability to exclude secondary cause', nodeId: 'migraine-admit' },
    { text: 'Discharge with rescue triptan (sumatriptan 100 mg) and follow-up with neurology', nodeId: 'migraine-discharge' },
    { text: 'Red flags: sudden onset, fever, seizure, focal deficit, altered mental status, papilledema', nodeId: 'migraine-red-flags' },
];
export const MIGRAINE_CITATIONS = [
    { num: 1, text: 'EB Medicine. Evidence-Based Emergency Medicine Management of Migraine and Other Primary Headaches. 2024.' },
    { num: 2, text: 'Perry JJ, et al. Ottawa SAH Rule for Headache Evaluation. JAMA. 2013;310(12):1248-1255.' },
    { num: 3, text: 'Marmura MJ, et al. 2025 AHS Guideline Update: Emergency Department Management of Acute Migraine. Headache. 2025.' },
    { num: 4, text: 'UpToDate. Acute Treatment of Migraine in Adults. 2025.' },
    { num: 5, text: 'ACEP. Minimally Invasive Procedures for Headaches: GON and SPG Blocks. 2023.' },
];
