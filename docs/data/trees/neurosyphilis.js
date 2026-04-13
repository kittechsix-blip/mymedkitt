// MedKitt — Neurosyphilis Evaluation & Treatment
// Screening → Neuro Symptoms → CSF Evaluation → CSF Interpretation → Treatment → Special Populations
// CDC 2021 STI Treatment Guidelines. 4 modules, 11 nodes.
export const NEUROSYPHILIS_CRITICAL_ACTIONS = [
    { text: 'CSF-VDRL reactive is diagnostic of neurosyphilis - start IV penicillin G immediately', nodeId: 'ns-confirmed' },
    { text: 'Aqueous crystalline penicillin G 18-24 million units/day IV × 10-14 days is first-line treatment', nodeId: 'ns-confirmed' },
    { text: 'CSF pleocytosis (>5 WBC/µL) or elevated protein with neuro symptoms → treat as neurosyphilis even if CSF-VDRL negative', nodeId: 'ns-probable' },
    { text: 'Ocular or otic syphilis: treat same as neurosyphilis - ophthalmology/ENT consult mandatory', nodeId: 'ns-ocular-otic' },
    { text: 'Repeat CSF at 6 months - CSF pleocytosis should normalize first (protein/VDRL lag)', nodeId: 'ns-confirmed' },
    { text: 'PCN allergy: desensitization preferred over ceftriaxone alternative (limited data for ceftriaxone)', nodeId: 'ns-confirmed' },
    { text: 'Do NOT use benzathine penicillin for neurosyphilis - does NOT penetrate blood-brain barrier', nodeId: 'ns-confirmed' },
];
export const NEUROSYPHILIS_NODES = [
    // =====================================================================
    // MODULE 1: SCREENING & PRESENTATION
    // =====================================================================
    {
        id: 'ns-start',
        type: 'info',
        module: 1,
        title: 'Neurosyphilis: When to Suspect',
        body: 'Neurosyphilis should be considered in any patient with confirmed syphilis who has neurological symptoms or signs.\n\nThe diagnosis requires a combination of clinical, serologic, and CSF findings.\n\n**Key presentations:**\n• Visual changes, hearing loss\n• Cognitive impairment, psychiatric symptoms\n• Cranial nerve deficits, meningismus\n• Stroke-like symptoms\n• Tabes dorsalis (late)\n• General paresis (late)',
        citation: [1, 3],
        next: 'ns-neuro-symptoms',
        summary: 'Suspect neurosyphilis in any confirmed syphilis with neuro symptoms — visual, cognitive, cranial nerve, meningismus, stroke-like',
        skippable: true,
    },
    {
        id: 'ns-neuro-symptoms',
        type: 'question',
        module: 1,
        title: 'Neurological Symptoms Present?',
        body: 'Does the patient have neurological, ocular, or otic symptoms?',
        options: [
            {
                label: 'Yes — neurological symptoms',
                description: 'Cognitive changes, CN deficits, meningismus, stroke-like symptoms',
                next: 'ns-csf-eval',
                urgency: 'urgent',
            },
            {
                label: 'Yes — ocular or otic symptoms',
                description: 'Visual changes, uveitis, hearing loss, tinnitus, vertigo',
                next: 'ns-ocular-otic',
                urgency: 'urgent',
            },
            {
                label: 'No — asymptomatic late latent',
                description: 'No neurological symptoms, late latent syphilis',
                next: 'ns-asymptomatic',
            },
        ],
        summary: 'Triage by symptom type: neuro symptoms need LP, ocular/otic treat as neurosyphilis regardless of CSF, asymptomatic rarely needs LP',
    },
    // =====================================================================
    // MODULE 2: CSF EVALUATION
    // =====================================================================
    {
        id: 'ns-csf-eval',
        type: 'info',
        module: 2,
        title: 'Perform CSF Evaluation',
        body: 'CSF analysis is indicated for patients with syphilis and neurological symptoms.\n\n**Order:**\n• CSF-VDRL (highly specific, low sensitivity)\n• CSF FTA-ABS (more sensitive, less specific)\n• CSF cell count with differential\n• CSF protein\n• CSF glucose\n\n**Interpretation aids:**\n• CSF-VDRL reactive → diagnostic\n• CSF pleocytosis (>5 WBC/µL) → supportive\n• Elevated CSF protein → supportive\n• CSF FTA-ABS negative → helps rule out',
        citation: [1, 4],
        next: 'ns-csf-result',
        summary: 'Order CSF-VDRL (highly specific), FTA-ABS (more sensitive), cell count, protein, glucose — reactive VDRL is diagnostic',
    },
    {
        id: 'ns-csf-result',
        type: 'question',
        module: 2,
        title: 'CSF-VDRL Result',
        body: 'What is the CSF-VDRL result?',
        options: [
            {
                label: 'CSF-VDRL Reactive',
                description: 'Diagnostic of neurosyphilis',
                next: 'ns-confirmed',
                urgency: 'critical',
            },
            {
                label: 'CSF-VDRL Non-reactive, abnormal CSF',
                description: 'Pleocytosis >5 WBC/µL or elevated protein with neuro symptoms',
                next: 'ns-probable',
                urgency: 'urgent',
            },
            {
                label: 'CSF-VDRL Non-reactive, normal CSF',
                description: 'Normal cell count and protein — neurosyphilis unlikely',
                next: 'ns-unlikely',
            },
        ],
        summary: 'CSF-VDRL reactive = confirmed, abnormal CSF with neuro symptoms = treat even if VDRL negative, normal CSF = unlikely',
    },
    // =====================================================================
    // MODULE 3: DIAGNOSIS & TREATMENT
    // =====================================================================
    {
        id: 'ns-confirmed',
        type: 'result',
        module: 3,
        title: 'Confirmed Neurosyphilis — Treat',
        body: 'A reactive CSF-VDRL is **diagnostic** of neurosyphilis.\n\n**First-line treatment:**\nAqueous crystalline penicillin G **18–24 million units/day** IV\n• 3–4 million units IV q4h, OR\n• Continuous infusion\n• Duration: **10–14 days**\n\n**Alternative (if IV not feasible):**\nProcaine penicillin 2.4 million units IM daily\nPLUS probenecid 500 mg PO QID\n× 10–14 days\n\n**PCN allergy:**\nDesensitization preferred. If not possible:\nCeftriaxone 2g IV/IM daily × 10–14 days (limited data)\n\n**Follow-up:**\n• Repeat CSF at 6 months\n• CSF pleocytosis should normalize first\n• Re-treat if CSF not improved at 6 months',
        citation: [1, 2],
        recommendation: 'Admit for IV Penicillin G. ID consult recommended.',
        treatment: {
            firstLine: {
                drug: 'Aqueous crystalline penicillin G',
                dose: '18-24 million units/day (3-4 million units per dose)',
                route: 'IV',
                frequency: 'q4h or continuous infusion',
                duration: '10-14 days',
                notes: 'Preferred regimen. Requires hospitalization.',
            },
            alternative: {
                drug: 'Procaine penicillin G + Probenecid',
                dose: 'Procaine PCN 2.4 million units + Probenecid 500 mg',
                route: 'IM + PO',
                frequency: 'Daily (PCN) + QID (probenecid)',
                duration: '10-14 days',
                notes: 'Use if IV access not feasible. Requires daily injections.',
            },
            pcnAllergy: {
                drug: 'Ceftriaxone',
                dose: '2 g',
                route: 'IV or IM',
                frequency: 'Daily',
                duration: '10-14 days',
                notes: 'Limited data. Desensitization to PCN preferred if possible.',
            },
            monitoring: 'Repeat CSF at 6 months. CSF pleocytosis should normalize first. Re-treat if CSF not improved at 6 months.',
        },
    },
    {
        id: 'ns-probable',
        type: 'result',
        module: 3,
        title: 'Probable Neurosyphilis — Treat',
        body: 'CSF-VDRL negative but CSF pleocytosis (>5 WBC/µL) or elevated protein with neurological symptoms → **treat as neurosyphilis**.\n\n**Treatment** (same as confirmed):\nAqueous crystalline penicillin G **18–24 million units/day** IV\n• 3–4 million units IV q4h × 10–14 days\n\n**Follow-up:**\n• Repeat CSF at 6 months\n• If CSF not improving, re-treat',
        citation: [1, 2],
        recommendation: 'Treat as neurosyphilis. Repeat CSF at 6 months.',
        treatment: {
            firstLine: {
                drug: 'Aqueous crystalline penicillin G',
                dose: '18-24 million units/day (3-4 million units per dose)',
                route: 'IV',
                frequency: 'q4h or continuous infusion',
                duration: '10-14 days',
                notes: 'Same regimen as confirmed neurosyphilis.',
            },
            alternative: {
                drug: 'Procaine penicillin G + Probenecid',
                dose: 'Procaine PCN 2.4 million units + Probenecid 500 mg',
                route: 'IM + PO',
                frequency: 'Daily (PCN) + QID (probenecid)',
                duration: '10-14 days',
                notes: 'Use if IV access not feasible.',
            },
            pcnAllergy: {
                drug: 'Ceftriaxone',
                dose: '2 g',
                route: 'IV or IM',
                frequency: 'Daily',
                duration: '10-14 days',
                notes: 'Limited data. Desensitization to PCN preferred.',
            },
            monitoring: 'Repeat CSF at 6 months. Re-treat if CSF not improving.',
        },
    },
    {
        id: 'ns-unlikely',
        type: 'result',
        module: 3,
        title: 'Neurosyphilis Unlikely',
        body: 'Normal CSF with non-reactive CSF-VDRL makes neurosyphilis unlikely.\n\n**Consider alternative diagnoses** for neurological symptoms.\n\n**Treat underlying syphilis stage:**\n• Early (primary/secondary/early latent): Benzathine PCN G 2.4M units IM × 1\n• Late latent: Benzathine PCN G 2.4M units IM weekly × 3 weeks\n\n**Re-evaluate** if symptoms progress or new neuro symptoms develop.',
        citation: [1],
        recommendation: 'Treat syphilis per stage. Neuro follow-up if symptoms persist.',
        treatment: {
            firstLine: {
                drug: 'Benzathine penicillin G',
                dose: '2.4 million units',
                route: 'IM',
                frequency: 'Once (early) or weekly x3 (late latent)',
                duration: 'Single dose for early syphilis; 3 weeks for late latent',
                notes: 'Treat underlying syphilis stage. Early = primary/secondary/early latent. Late latent = weekly x3 weeks.',
            },
            pcnAllergy: {
                drug: 'Doxycycline',
                dose: '100 mg',
                route: 'PO',
                frequency: 'BID',
                duration: '14 days (early) or 28 days (late latent)',
                notes: 'Desensitization to PCN preferred. Duration depends on syphilis stage.',
            },
            monitoring: 'Quantitative nontreponemal titers at 6 and 12 months (early) or 6, 12, and 24 months (late latent). Re-evaluate if neurological symptoms progress.',
        },
    },
    // =====================================================================
    // MODULE 4: SPECIAL POPULATIONS
    // =====================================================================
    {
        id: 'ns-ocular-otic',
        type: 'result',
        module: 4,
        title: 'Ocular/Otosyphilis — Treat as Neurosyphilis',
        body: 'Ocular and otosyphilis can occur at **any stage** of syphilis and require treatment as neurosyphilis **regardless of CSF findings**.\n\n**Ocular manifestations:**\n• Uveitis (most common), optic neuritis\n• Retinitis, papillitis\n• Vision loss\n\n**Otic manifestations:**\n• Sensorineural hearing loss\n• Tinnitus, vertigo\n\n**Treatment:**\nAqueous crystalline penicillin G **18–24 million units/day** IV\n• 3–4 million units IV q4h × 10–14 days\n\n**Consults:**\n• Ophthalmology (ocular involvement)\n• ENT/Audiology (otic involvement)\n• Infectious Disease\n\nCSF examination is recommended but treatment should NOT be delayed.',
        citation: [1, 4],
        recommendation: 'Treat as neurosyphilis. Ophthalmology/ENT consult. ID consult.',
        treatment: {
            firstLine: {
                drug: 'Aqueous crystalline penicillin G',
                dose: '18-24 million units/day (3-4 million units per dose)',
                route: 'IV',
                frequency: 'q4h or continuous infusion',
                duration: '10-14 days',
                notes: 'Treat regardless of CSF findings. Do not delay for LP.',
            },
            alternative: {
                drug: 'Procaine penicillin G + Probenecid',
                dose: 'Procaine PCN 2.4 million units + Probenecid 500 mg',
                route: 'IM + PO',
                frequency: 'Daily (PCN) + QID (probenecid)',
                duration: '10-14 days',
                notes: 'Use if IV access not feasible.',
            },
            pcnAllergy: {
                drug: 'Ceftriaxone',
                dose: '2 g',
                route: 'IV or IM',
                frequency: 'Daily',
                duration: '10-14 days',
                notes: 'Limited data. Desensitization to PCN preferred.',
            },
            monitoring: 'Ophthalmology or ENT follow-up as appropriate. Repeat CSF at 6 months if LP performed.',
        },
    },
    {
        id: 'ns-asymptomatic',
        type: 'question',
        module: 4,
        title: 'Asymptomatic Late Latent Syphilis',
        body: 'Routine CSF examination is **NOT recommended** for asymptomatic late latent syphilis.\n\n**Exceptions — CSF exam IS indicated if:**\n• Treatment failure (titer not declining)\n• HIV co-infection with late latent syphilis\n• Neurological signs develop\n• Tertiary syphilis (aortitis, gumma)',
        citation: [1],
        options: [
            {
                label: 'Standard late latent — no CSF indication',
                description: 'No treatment failure, no HIV, no neuro signs',
                next: 'ns-latent-treatment',
            },
            {
                label: 'CSF indicated — has exception criteria',
                description: 'Treatment failure, HIV, or developing neuro signs',
                next: 'ns-csf-eval',
                urgency: 'urgent',
            },
        ],
        summary: 'Routine LP NOT recommended for asymptomatic late latent — indicated only for treatment failure, HIV, developing neuro signs, or tertiary syphilis',
    },
    {
        id: 'ns-latent-treatment',
        type: 'result',
        module: 4,
        title: 'Late Latent Syphilis Treatment',
        body: '**First-line:**\nBenzathine penicillin G 2.4 million units IM weekly × 3 weeks\n(Total: 7.2 million units)\n\n**PCN allergy:**\nDesensitization preferred.\nAlternative: [Doxycycline](#/drug/doxycycline/neurosyphilis) 100 mg PO BID × 28 days\n\n**Follow-up:**\n• Quantitative nontreponemal titers at 6, 12, and 24 months\n• 4-fold decline expected\n• If titers do not decline → evaluate for treatment failure, consider CSF exam',
        citation: [1],
        recommendation: 'Benzathine PCN G IM weekly × 3 weeks. Follow titers.',
        treatment: {
            firstLine: {
                drug: 'Benzathine penicillin G',
                dose: '2.4 million units',
                route: 'IM',
                frequency: 'Weekly',
                duration: '3 weeks (total 7.2 million units)',
                notes: 'Standard treatment for late latent syphilis without neurological involvement.',
            },
            pcnAllergy: {
                drug: 'Doxycycline',
                dose: '100 mg',
                route: 'PO',
                frequency: 'BID',
                duration: '28 days',
                notes: 'Desensitization to PCN preferred. Doxycycline is alternative.',
            },
            monitoring: 'Quantitative nontreponemal titers at 6, 12, and 24 months. Expect 4-fold decline. If titers do not decline, evaluate for treatment failure and consider CSF exam.',
        },
    },
];
export const NEUROSYPHILIS_MODULE_LABELS = [
    'Screening',
    'CSF Evaluation',
    'Diagnosis & Treatment',
    'Special Populations',
];
export const NEUROSYPHILIS_CITATIONS = [
    { num: 1, text: 'Centers for Disease Control and Prevention. Sexually Transmitted Infections Treatment Guidelines, 2021: Syphilis. https://www.cdc.gov/std/treatment-guidelines/syphilis.htm' },
    { num: 2, text: 'Liu LL, Zheng HY, Zhang HP, et al. The Prognostic Value of the Cerebrospinal Fluid Venereal Disease Research Laboratory Test in Treated Syphilis. Sex Transm Dis. 2014;41(4):243-7.' },
    { num: 3, text: 'Marra CM. Clinical Manifestations and Diagnosis of Neurosyphilis. Curr Neurol Neurosci Rep. 2004;4(6):435-40.' },
    { num: 4, text: 'Ghanem KG, Workowski KA. Neurosyphilis: A Current Review. Curr Infect Dis Rep. 2011;13(2):128-35.' },
];
