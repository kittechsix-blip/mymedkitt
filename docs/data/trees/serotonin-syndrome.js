// MedKitt — Serotonin Syndrome Management
// Recognition → Diagnosis → Differentiation → Treatment → Disposition
// 5 modules: Recognition → Hunter Criteria → Differentiation → Treatment → Disposition
// ~25 nodes total.
export const SEROTONIN_SYNDROME_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'ss-start',
        type: 'info',
        module: 1,
        title: 'Serotonin Syndrome',
        body: '[Serotonin Syndrome Steps Summary](#/info/ss-summary)\n\n**Definition:** Life-threatening condition caused by excessive serotonergic activity in the CNS. [1]\n\n**Classic Triad:** [1][2]\n• **Altered mental status** (agitation, confusion, anxiety)\n• **Autonomic dysfunction** (hyperthermia, tachycardia, diaphoresis, mydriasis)\n• **Neuromuscular excitation** (clonus, hyperreflexia, tremor, rigidity)\n\n**Key Features:**\n• Onset typically within **24 hours** (often within 6 hours) of drug change\n• Hyperkinetic state with **clonus** (unlike NMS)\n• Lower extremity findings more pronounced than upper\n• Rapid progression possible → hyperthermia >41°C, rhabdomyolysis, DIC, death',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'hunter-criteria', label: 'Hunter Criteria' },
        ],
        next: 'ss-drug-history',
        summary: 'Serotonergic excess causing AMS, autonomic dysfunction, neuromuscular excitation — onset within 24h of drug change, clonus is hallmark',
        skippable: true,
    },
    {
        id: 'ss-drug-history',
        type: 'question',
        module: 1,
        title: 'Serotonergic Drug Exposure?',
        body: '**Has the patient taken a serotonergic drug?**\n\nHunter Criteria REQUIRE exposure to a serotonergic agent for diagnosis.\n\n[Serotonergic Drug List](#/calculator/ss-drug-list)\n\n**Common triggers:**\n• SSRI/SNRI (most common)\n• MAOI combinations (most severe)\n• Tramadol, fentanyl, meperidine\n• MDMA/ecstasy, cocaine, amphetamines\n• Linezolid, methylene blue (MAOIs)\n• Drug interactions (SSRI + triptan, SSRI + MAOI)',
        citation: [1, 3],
        calculatorLinks: [
            { id: 'ss-drug-list', label: 'Serotonergic Drug Lookup' },
        ],
        options: [
            {
                label: 'Yes — Serotonergic drug taken',
                description: 'Known exposure to serotonergic medication',
                next: 'ss-hunter',
            },
            {
                label: 'Uncertain / Unknown ingestion',
                description: 'Possible exposure, need to investigate',
                next: 'ss-investigate-drugs',
            },
            {
                label: 'No — No serotonergic exposure',
                description: 'Consider alternative diagnosis',
                next: 'ss-alternative-dx',
            },
        ],
        summary: 'Determine serotonergic drug exposure — required for Hunter Criteria diagnosis, check SSRIs/SNRIs/MAOIs/tramadol/MDMA/linezolid',
    },
    {
        id: 'ss-investigate-drugs',
        type: 'info',
        module: 1,
        title: 'Investigate Drug Exposure',
        body: '**Obtain Complete Medication History:** [3]\n\n**Prescription medications:**\n• Antidepressants (SSRIs, SNRIs, TCAs, MAOIs)\n• Psychiatric medications (buspirone, lithium)\n• Pain medications (tramadol, fentanyl, meperidine)\n• Migraine medications (triptans)\n• Antibiotics (linezolid)\n• Antiemetics (ondansetron, metoclopramide)\n\n**OTC/Supplements:**\n• Dextromethorphan (DXM in cough syrups)\n• St. John\'s Wort\n• SAMe, tryptophan\n\n**Recreational drugs:**\n• MDMA/ecstasy\n• Cocaine, amphetamines\n• LSD\n\n**Recent changes:**\n• New medication started?\n• Dose increased?\n• Drug-drug interaction?\n• Medication switched without washout?',
        citation: [3],
        calculatorLinks: [
            { id: 'ss-drug-list', label: 'Serotonergic Drug Lookup' },
        ],
        next: 'ss-hunter',
        summary: 'Complete medication history including Rx, OTC/supplements, and recreational drugs — check for new starts, dose changes, and interactions',
        skippable: true,
    },
    // =====================================================================
    // MODULE 2: HUNTER CRITERIA DIAGNOSIS
    // =====================================================================
    {
        id: 'ss-hunter',
        type: 'info',
        module: 2,
        title: 'Hunter Serotonin Toxicity Criteria',
        body: '**Hunter Criteria** — More sensitive (84%) and specific (97%) than Sternbach criteria. [4]\n\n**REQUIRES:**\n1. Exposure to serotonergic agent, AND\n2. ONE of the following:\n\n**Spontaneous clonus** ✓\n**Inducible clonus** + (agitation OR diaphoresis) ✓\n**Ocular clonus** + (agitation OR diaphoresis) ✓\n**Tremor** + hyperreflexia ✓\n**Hypertonia** + temp >38°C + (ocular OR inducible clonus) ✓\n\n**Key exam findings:**\n• **Clonus** — rhythmic, involuntary muscle contractions\n• **Ocular clonus** — slow roving eye movements, lateral nystagmus\n• **Hyperreflexia** — more pronounced in lower extremities\n• Check ankle clonus (>3 beats = positive)',
        images: [{ src: 'images/serotonin-syndrome/serotonin-syndrome-triad.jpg', alt: 'Clinical diagram showing the triad of serotonin syndrome: altered mental status, autonomic instability, and neuromuscular abnormalities including clonus', caption: 'Serotonin syndrome triad — Hunter Criteria require clonus (spontaneous/inducible/ocular) as the key discriminator from NMS. Check ankle clonus >3 beats. (CC BY 4.0)' }],
        citation: [4],
        calculatorLinks: [
            { id: 'hunter-criteria', label: 'Hunter Criteria Calculator' },
        ],
        next: 'ss-hunter-result',
        summary: 'Hunter Criteria (84% sens, 97% spec) — serotonergic agent + clonus/tremor/hyperreflexia/hypertonia, check ankle clonus >3 beats',
    },
    {
        id: 'ss-hunter-result',
        type: 'question',
        module: 2,
        title: 'Hunter Criteria Result',
        body: '**Does the patient meet Hunter Criteria?**\n\nSerotonergic agent exposure + ONE of:\n• Spontaneous clonus\n• Inducible clonus + agitation/diaphoresis\n• Ocular clonus + agitation/diaphoresis\n• Tremor + hyperreflexia\n• Hypertonia + temp >38°C + ocular/inducible clonus',
        citation: [4],
        calculatorLinks: [
            { id: 'hunter-criteria', label: 'Hunter Criteria' },
        ],
        options: [
            {
                label: 'Hunter Criteria POSITIVE',
                description: 'Meets criteria — diagnose serotonin syndrome',
                next: 'ss-severity',
                urgency: 'urgent',
            },
            {
                label: 'Hunter Criteria NEGATIVE',
                description: 'Does not meet criteria — consider alternatives',
                next: 'ss-ddx',
            },
            {
                label: 'Equivocal / Borderline',
                description: 'Unclear findings — differentiate from mimics',
                next: 'ss-ddx',
            },
        ],
        summary: 'Assess if patient meets Hunter Criteria — serotonergic exposure + one clinical finding cluster',
    },
    // =====================================================================
    // MODULE 3: DIFFERENTIAL DIAGNOSIS
    // =====================================================================
    {
        id: 'ss-ddx',
        type: 'info',
        module: 3,
        title: 'Differential Diagnosis',
        body: '**Consider these mimics:** [2][5]\n\n• **Neuroleptic Malignant Syndrome (NMS)**\n• **Anticholinergic toxicity**\n• **Malignant hyperthermia**\n• **Sympathomimetic toxicity**\n• **Meningitis/encephalitis**\n• **Sepsis**\n• **Thyroid storm**\n• **Heat stroke**\n\n[SS vs NMS Differentiator](#/calculator/ss-vs-nms)\n\n**Key differentiating features:**\n• Onset timing (SS rapid, NMS slow)\n• Muscle tone (SS hyperkinetic/clonus, NMS rigid/bradyreflexic)\n• Drug class (serotonergic vs dopamine antagonist)\n• Pupils (SS dilated, NMS normal)',
        citation: [2, 5],
        calculatorLinks: [
            { id: 'ss-vs-nms', label: 'SS vs NMS Differentiator' },
        ],
        next: 'ss-vs-nms-q',
        summary: 'Differentiate SS from NMS, anticholinergic toxicity, malignant hyperthermia, sympathomimetics, sepsis, thyroid storm',
        skippable: true,
    },
    {
        id: 'ss-vs-nms-q',
        type: 'question',
        module: 3,
        title: 'SS vs NMS Differentiation',
        body: '**Key differentiating features:** [5][6]\n\n| Feature | Serotonin Syndrome | NMS |\n|---------|-------------------|-----|\n| **Onset** | Hours (within 24h) | Days to weeks |\n| **Drug** | Serotonergic | Dopamine antagonist |\n| **Muscle** | Hyperkinetic, clonus | "Lead-pipe" rigidity |\n| **Reflexes** | Hyperreflexia | Bradyreflexia |\n| **Pupils** | Dilated (mydriasis) | Normal |\n| **Bowel sounds** | Hyperactive | Normal/decreased |\n| **CK elevation** | Mild-moderate | Very high (>1000) |\n| **Resolution** | 24-72 hours | Days to weeks |',
        citation: [5, 6],
        calculatorLinks: [
            { id: 'ss-vs-nms', label: 'SS vs NMS Differentiator' },
        ],
        options: [
            {
                label: 'Serotonin Syndrome likely',
                description: 'Hyperkinetic, clonus, rapid onset, serotonergic drug',
                next: 'ss-severity',
            },
            {
                label: 'NMS likely',
                description: 'Rigidity, bradyreflexia, slow onset, antipsychotic',
                next: 'ss-nms-referral',
            },
            {
                label: 'Other diagnosis likely',
                description: 'Anticholinergic, sepsis, heat stroke, etc.',
                next: 'ss-alternative-dx',
            },
        ],
        summary: 'Compare SS vs NMS features — onset speed, drug class, muscle tone (hyperkinetic vs rigid), reflexes, pupils, CK level',
    },
    {
        id: 'ss-nms-referral',
        type: 'result',
        module: 3,
        title: 'NMS — Different Management',
        body: '**Neuroleptic Malignant Syndrome requires different treatment:** [6]\n\n**Immediate:**\n• Stop offending antipsychotic\n• Aggressive cooling\n• IV fluids\n• Benzodiazepines for rigidity\n\n**Specific therapy:**\n• **Dantrolene** — muscle relaxant, first-line\n• [Bromocriptine](#/drug/bromocriptine/NMS) — dopamine agonist (contraindicated in SS!)\n\n**Duration:**\n• Resolution takes days to weeks\n• 2-week washout before restarting antipsychotics\n\n**ICU admission** for all but mildest cases',
        recommendation: 'Consult toxicology and psychiatry. ICU admission for moderate-severe NMS.',
        citation: [6],
    },
    {
        id: 'ss-alternative-dx',
        type: 'result',
        module: 3,
        title: 'Alternative Diagnosis',
        body: '**Serotonin syndrome unlikely** — consider: [1][5][7]\n\n• **Anticholinergic toxicity:** Dry, hot, flushed, urinary retention, absent bowel sounds\n• **Sympathomimetic:** Cocaine, amphetamines — similar but no clonus\n• **Sepsis:** Fever, altered mental status — check source\n• **Meningitis/Encephalitis:** Meningismus, CSF analysis\n• **Thyroid storm:** History of hyperthyroidism, check TSH\n• **Heat stroke:** Environmental exposure, dry skin\n• **Malignant hyperthermia:** Anesthesia exposure, extreme rigidity\n\n**Workup:**\n• CBC, BMP, LFTs, CK, lactate\n• TSH, cortisol\n• Urinalysis, blood cultures\n• CT head if altered mental status\n• LP if meningitis concern',
        recommendation: 'Continue workup for alternative etiology.',
        citation: [1, 5, 7],
    },
    // =====================================================================
    // MODULE 4: TREATMENT
    // =====================================================================
    {
        id: 'ss-severity',
        type: 'question',
        module: 4,
        title: 'Severity Assessment',
        body: '**Classify severity to guide management:** [1][7]\n\n**Mild:**\n• Mild tremor, hyperreflexia\n• Tachycardia, diaphoresis\n• Alert and cooperative\n• Temp <38.5°C\n\n**Moderate:**\n• Significant agitation, confusion\n• Hypertension, tachycardia >120\n• Temp 38.5-40°C\n• Ocular clonus, inducible clonus\n• Hyperactive bowel sounds, diarrhea\n\n**Severe:**\n• Temp >40°C\n• Muscle rigidity\n• Seizures\n• Rhabdomyolysis (CK >1000)\n• Cardiovascular instability\n• Obtunded/comatose',
        citation: [1, 7],
        options: [
            {
                label: 'Mild',
                description: 'Tremor, hyperreflexia, mild tachycardia, alert',
                next: 'ss-mild-tx',
            },
            {
                label: 'Moderate',
                description: 'Agitation, confusion, temp 38.5-40°C, clonus',
                next: 'ss-moderate-tx',
                urgency: 'urgent',
            },
            {
                label: 'Severe',
                description: 'Temp >40°C, rigidity, seizures, rhabdo, unstable',
                next: 'ss-severe-tx',
                urgency: 'critical',
            },
        ],
        summary: 'Classify severity: mild (tremor, alert), moderate (agitation, temp 38.5-40), severe (temp >40, rigidity, seizures, rhabdo)',
    },
    {
        id: 'ss-mild-tx',
        type: 'info',
        module: 4,
        title: 'Mild SS — Treatment',
        body: '**Mild Serotonin Syndrome Management:** [1][7]\n\n**1. STOP offending agent(s)**\n• Identify and discontinue ALL serotonergic drugs\n• Review medication list thoroughly\n\n**2. Supportive care:**\n• IV fluids\n• Cardiac monitoring\n• Observation for 6-12 hours\n\n**3. Symptom management:**\n• **Benzodiazepines** for agitation/tremor\n  - Lorazepam 1-2 mg IV or\n  - Diazepam 5-10 mg IV\n\n**4. Cyproheptadine (optional for mild):**\n• Generally not needed for mild cases\n• Consider if symptoms persist\n\n**Resolution:**\n• Most mild cases resolve within **24-72 hours**\n• Half-life of offending drug determines duration',
        citation: [1, 7],
        next: 'ss-dispo-mild',
        summary: 'Stop serotonergic agents, benzos for agitation/tremor, IV fluids, observe 6-12h — most resolve in 24-72h',
        skippable: true,
    },
    {
        id: 'ss-moderate-tx',
        type: 'info',
        module: 4,
        title: 'Moderate SS — Treatment',
        body: '**Moderate Serotonin Syndrome Management:** [1][7][8]\n\n**1. STOP all serotonergic agents**\n\n**2. Supportive care:**\n• IV fluids (aggressive hydration)\n• Continuous cardiac monitoring\n• Cooling measures if temp >38.5°C\n\n**3. Sedation:**\n• **Benzodiazepines** — first-line for agitation\n  - Lorazepam 2-4 mg IV q15-30min PRN\n  - Diazepam 5-10 mg IV q15min PRN\n• May require large doses\n• Also reduces muscle activity → decreases thermogenesis\n\n**4. Cyproheptadine:**\n• **Loading:** 12 mg PO/NG once\n• **Maintenance:** 2 mg PO q2h until response\n• **Max:** 32 mg/24 hours\n• Continue 4-8 mg q6h for 24-48 hours after symptoms resolve\n• Only available PO — can crush for NG tube\n\n**5. Avoid:**\n• Physical restraints (worsen hyperthermia)\n• Antipyretics (ineffective — hyperthermia is muscular)',
        citation: [1, 7, 8],
        calculatorLinks: [
            { id: 'cyproheptadine-dose', label: 'Cyproheptadine Dosing' },
        ],
        next: 'ss-dispo-moderate',
        summary: 'Stop agents, high-dose benzos, cyproheptadine 12mg load then 2mg q2h (max 32mg/day), cooling — avoid restraints and antipyretics',
        safetyLevel: 'warning',
    },
    {
        id: 'ss-severe-tx',
        type: 'info',
        module: 4,
        title: 'Severe SS — Treatment',
        body: '**SEVERE Serotonin Syndrome — Life-Threatening Emergency** [1][7][8]\n\n**1. ABC — Secure airway if needed**\n• Consider early intubation if severely agitated/rigid\n• Avoid succinylcholine (hyperkalemia risk with rhabdo)\n• Use rocuronium or vecuronium\n\n**2. Aggressive cooling:**\n• Target temp <38.5°C\n• Ice packs, cooling blankets, mist/fan\n• Consider ice water immersion if >41°C\n• Paralysis may be needed for intractable hyperthermia\n\n**3. High-dose benzodiazepines:**\n• Lorazepam 4 mg IV, repeat q5-10min\n• No ceiling dose for severe agitation\n• Paralysis if benzos inadequate\n\n**4. Cyproheptadine:**\n• 12 mg loading via NG tube\n• 2 mg q2h until improvement\n• Less effective in severe cases\n\n**5. Treat complications:**\n• Rhabdomyolysis → aggressive fluids, monitor CK/renal\n• Seizures → benzodiazepines\n• DIC → supportive\n• Arrhythmias → avoid antiarrhythmics if possible',
        citation: [1, 7, 8],
        calculatorLinks: [
            { id: 'cyproheptadine-dose', label: 'Cyproheptadine Dosing' },
        ],
        next: 'ss-dispo-severe',
        summary: 'Secure airway (avoid succinylcholine), aggressive cooling, high-dose benzos, paralysis if needed, cyproheptadine via NG',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 5: DISPOSITION
    // =====================================================================
    {
        id: 'ss-dispo-mild',
        type: 'info',
        module: 5,
        title: 'Disposition — Mild SS',
        body: '**Discharge Considerations:** [7]\n\n**May discharge if:**\n• Symptoms resolving after 6-12 hour observation\n• Vital signs stable and normalizing\n• Able to tolerate PO\n• No ongoing exposure risk\n• Reliable follow-up\n\n**Before discharge:**\n• Confirm offending agent discontinued\n• Educate on drug interactions\n• Provide return precautions\n• Psychiatry follow-up if on psychotropic medications\n\n**Return precautions:**\n• Fever >38.5°C\n• Worsening confusion or agitation\n• Muscle stiffness or tremor\n• Rapid heart rate\n\n**Consider admission if:**\n• Symptoms not improving\n• Unable to discontinue serotonergic medication safely\n• Psychiatric risk (intentional overdose)',
        citation: [7],
        next: 'ss-complete',
        summary: 'Discharge if resolving after 6-12h observation, stable vitals, tolerating PO — educate on drug interactions, psych follow-up',
    },
    {
        id: 'ss-dispo-moderate',
        type: 'info',
        module: 5,
        title: 'Disposition — Moderate SS',
        body: '**Admission Required:** [7]\n\n**Floor vs Telemetry:**\n• Telemetry bed preferred\n• Continuous cardiac monitoring\n• Frequent neuro checks\n\n**Monitoring:**\n• Vital signs q2-4h\n• Neuro exam q4h (clonus, reflexes, mental status)\n• Temperature trending\n• CK levels if concern for rhabdomyolysis\n\n**Treatment continuation:**\n• Continue benzodiazepines PRN\n• Continue cyproheptadine q6h for 24-48h\n• IV fluids until PO tolerant\n\n**Consults:**\n• Toxicology\n• Psychiatry (medication management)\n\n**Resolution:**\n• Most cases resolve within 24-72 hours\n• MAOIs may take longer (up to 1 week)',
        citation: [7],
        next: 'ss-complete',
        summary: 'Telemetry admission, continue benzos and cyproheptadine q6h for 24-48h, tox and psych consults — MAOIs may take up to 1 week',
    },
    {
        id: 'ss-dispo-severe',
        type: 'info',
        module: 5,
        title: 'Disposition — Severe SS',
        body: '**ICU Admission Required:** [7][8]\n\n**ICU level care for:**\n• Temp >40°C\n• Intubation needed\n• Paralysis required for hyperthermia control\n• Hemodynamic instability\n• Rhabdomyolysis with renal failure\n• Seizures\n• DIC\n\n**ICU monitoring:**\n• Continuous vital signs\n• Core temperature\n• Urine output\n• Serial CK, renal function, coags\n• Lactate trending\n\n**Prolonged recovery:**\n• Severe cases may take days to weeks\n• MAOI-related SS has longest duration\n• Watch for complications during recovery\n\n**Mortality:**\n• Untreated severe SS can be fatal\n• Most deaths from hyperthermia complications\n• Early recognition and treatment improves outcomes',
        citation: [7, 8],
        next: 'ss-complete',
        summary: 'ICU for temp >40, intubation, paralysis, hemodynamic instability, rhabdo with renal failure, DIC — MAOI cases longest duration',
    },
    {
        id: 'ss-complete',
        type: 'result',
        module: 5,
        title: 'Serotonin Syndrome — Complete',
        body: '**Summary:** [1][2][4][7][8]\n\n**Diagnosis:**\n• Hunter Criteria = serotonergic drug + clinical findings\n• Clonus is the hallmark finding\n• Distinguish from NMS (rigidity, slow onset, antipsychotics)\n\n**Treatment:**\n• STOP serotonergic agents\n• Benzodiazepines for agitation\n• Cyproheptadine 12 mg load → 2 mg q2h (max 32 mg/day)\n• Aggressive cooling for hyperthermia\n• Supportive care\n\n**Prognosis:**\n• Most cases resolve in 24-72 hours\n• Excellent outcomes with early recognition\n• Severe cases can be fatal if untreated\n\n**Key Resources:**\n• [Hunter Criteria](#/calculator/hunter-criteria)\n• [SS vs NMS Differentiator](#/calculator/ss-vs-nms)\n• [Serotonergic Drug List](#/calculator/ss-drug-list)\n• [Cyproheptadine Dosing](#/calculator/cyproheptadine-dose)',
        recommendation: 'Management pathway complete. Ensure psychiatry follow-up for medication reconciliation.',
        citation: [1, 2, 4, 7, 8],
    },
];
export const SEROTONIN_SYNDROME_MODULE_LABELS = [
    'Recognition',
    'Hunter Criteria',
    'Differentiation',
    'Treatment',
    'Disposition',
];
export const SEROTONIN_SYNDROME_CRITICAL_ACTIONS = [
    { text: 'Stop all serotonergic agents immediately (SSRIs, SNRIs, MAOIs, tramadol, linezolid, etc)', nodeId: 'sero-stop-agents' },
    { text: 'Benzodiazepines for agitation: lorazepam 1-2 mg IV q5-10min to control myoclonus/rigidity', nodeId: 'sero-benzos' },
    { text: 'Cyproheptadine 12 mg PO initial, then 2 mg q2h (max 32 mg/day) for moderate-severe cases', nodeId: 'sero-cyprohep' },
    { text: 'Aggressive cooling for hyperthermia >41°C (evaporative + cold IV fluids)', nodeId: 'sero-cooling' },
    { text: 'Intubate with paralysis (rocuronium/vecuronium) if severe rigidity or temp >41°C', nodeId: 'sero-intubate' },
    { text: 'Avoid antipyretics (ineffective), avoid succinylcholine (rhabdo risk with rigidity)', nodeId: 'sero-avoid' },
    { text: 'Hunter criteria for diagnosis: serotonergic agent + (myoclonus + agitation) OR (tremor + hyperreflexia + temp >38)', nodeId: 'sero-hunter' },
];
export const SEROTONIN_SYNDROME_CITATIONS = [
    { num: 1, text: 'Boyer EW, Shannon M. The Serotonin Syndrome. N Engl J Med. 2005;352(11):1112-1120.' },
    { num: 2, text: 'Ables AZ, Nagubilli R. Prevention, recognition, and management of serotonin syndrome. Am Fam Physician. 2010;81(9):1139-1142.' },
    { num: 3, text: 'Volpi-Abadie J, Kaye AM, Kaye AD. Serotonin syndrome. Ochsner J. 2013;13(4):533-540.' },
    { num: 4, text: 'Dunkley EJ, Isbister GK, Sibbritt D, et al. The Hunter Serotonin Toxicity Criteria: simple and accurate diagnostic decision rules for serotonin toxicity. QJM. 2003;96(9):635-642.' },
    { num: 5, text: 'Perry PJ, Wilborn CA. Serotonin syndrome vs neuroleptic malignant syndrome: a contrast of causes, diagnoses, and management. Ann Clin Psychiatry. 2012;24(2):155-162.' },
    { num: 6, text: 'Berman BD. Neuroleptic malignant syndrome: a review for neurohospitalists. Neurohospitalist. 2011;1(1):41-47.' },
    { num: 7, text: 'Buckley NA, Dawson AH, Isbister GK. Serotonin syndrome. BMJ. 2014;348:g1626.' },
    { num: 8, text: 'Graudins A, Stearman A, Chan B. Treatment of the serotonin syndrome with cyproheptadine. J Emerg Med. 1998;16(4):615-619.' },
];
