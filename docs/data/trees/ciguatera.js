// MedKitt — Ciguatera Fish Poisoning Consult
// Diagnosis → Severity → Treatment → Disposition
// Category: Toxicology. 4 modules, ~25 nodes.
export const CIGUATERA_MODULE_LABELS = [
    'Recognition & Diagnosis',
    'Severity Assessment',
    'ED Treatment',
    'Disposition & Chronic Care',
];
export const CIGUATERA_CITATIONS = [
    { num: 1, text: 'Friedman MA, et al. An Updated Review of Ciguatera Fish Poisoning: Clinical, Epidemiological, Environmental, and Public Health Management. Mar Drugs. 2017;15(3):72.' },
    { num: 2, text: 'Isbister GK, Kiernan MC. Neurotoxic marine poisoning. Lancet Neurol. 2005;4(4):219-228.' },
    { num: 3, text: 'Schnorf H, et al. Ciguatera fish poisoning: a double-blind randomized trial of mannitol therapy. Neurology. 2002;58(6):873-880.' },
    { num: 4, text: 'CDC Yellow Book 2024. Food Poisoning from Marine Toxins.' },
    { num: 5, text: 'Palafox NA, et al. Successful treatment of ciguatera fish poisoning with intravenous mannitol. JAMA. 1988;259(18):2740-2742.' },
    { num: 6, text: 'Pearn J. Neurology of ciguatera. J Neurol Neurosurg Psychiatry. 2001;70(1):4-8.' },
    { num: 7, text: 'Mullins ME, Hoffman RS. Is mannitol the treatment of choice for patients with ciguatera fish poisoning? Clin Toxicol. 2017;55(9):947-955.' },
    { num: 8, text: 'Bagnis R, et al. Origins, epidemiology, clinical features and treatment of ciguatera fish poisoning. Toxicon. 1979;17(5):575-588.' },
];
export const CIGUATERA_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION & DIAGNOSIS
    // =====================================================================
    {
        id: 'cig-start',
        type: 'info',
        module: 1,
        title: 'Ciguatera Fish Poisoning',
        body: 'Ciguatera is the most common nonbacterial seafood poisoning worldwide, affecting 50,000-500,000 people annually. Caused by ciguatoxin from dinoflagellates that bioaccumulate in reef fish.\n\nKEY FEATURES\n\u2022 GI symptoms (early) + neurological symptoms (characteristic)\n\u2022 Pathognomonic: HOT-COLD REVERSAL (cold feels burning, hot feels cold)\n\u2022 Cardiovascular instability in 20-40%\n\u2022 No rapid lab test \u2014 clinical diagnosis\n\nTOXIN CHARACTERISTICS\n\u2022 Heat-stable: cooking does not destroy it\n\u2022 Lipid-soluble: concentrates in fish tissue\n\u2022 No taste, smell, or visual indicators\n\u2022 Larger fish (>5-6 lbs) accumulate more toxin\n\nGEOGRAPHIC RISK\n\u2022 Caribbean, Pacific Islands, Hawaii, Florida Keys\n\u2022 Expanding range due to warming oceans\n\u2022 Can occur anywhere contaminated fish is shipped',
        citation: [1, 4],
        next: 'cig-history',
    },
    {
        id: 'cig-history',
        type: 'question',
        module: 1,
        title: 'Exposure History',
        body: 'Confirm fish consumption and timeline. Symptoms typically begin 15 minutes to 6 hours after ingestion, but can be delayed up to 72 hours.',
        options: [
            {
                label: 'Reef fish within 6 hours',
                description: 'Barracuda, grouper, snapper, sea bass, amberjack',
                next: 'cig-symptoms',
            },
            {
                label: 'Reef fish 6-72 hours ago',
                description: 'Delayed presentation still consistent',
                next: 'cig-symptoms',
            },
            {
                label: 'Unknown fish type',
                description: 'Restaurant meal, travel, cannot identify species',
                next: 'cig-unknown-fish',
            },
            {
                label: 'No recent fish consumption',
                description: 'Consider other diagnoses',
                next: 'cig-differential',
            },
        ],
    },
    {
        id: 'cig-unknown-fish',
        type: 'info',
        module: 1,
        title: 'High-Risk Fish Species',
        body: 'If fish species unknown, assess risk based on geographic source and preparation.\n\nHIGHEST RISK (Avoid entirely)\n\u2022 Barracuda \u2014 most common culprit\n\u2022 Moray eel\n\u2022 Amberjack\n\nHIGH RISK\n\u2022 Grouper, Red snapper, Sea bass\n\u2022 Sturgeon, Parrotfish, Surgeonfish\n\u2022 Kingfish, Jack, Hogfish\n\nRISK FACTORS\n\u2022 Fish >5-6 lbs (larger = more toxin)\n\u2022 Fish head, liver, roe, intestines (highest concentration)\n\u2022 Reef-caught vs. open ocean\n\u2022 Tropical/subtropical source\n\nLOW RISK\n\u2022 Pelagic fish (tuna, mahi-mahi, salmon)\n\u2022 Shellfish (different toxins)\n\nIf recent tropical reef fish consumption with compatible symptoms, treat as presumptive ciguatera.',
        citation: [1, 4, 8],
        next: 'cig-symptoms',
    },
    {
        id: 'cig-differential',
        type: 'info',
        module: 1,
        title: 'Differential Diagnosis',
        body: 'Without fish exposure history, consider alternative diagnoses.\n\nOTHER MARINE TOXINS\n\u2022 Scombroid: histamine-like (flushing, urticaria, rapid onset)\n\u2022 Shellfish poisoning: paralytic, amnestic, neurotoxic\n\u2022 Tetrodotoxin: pufferfish (rapid paralysis)\n\nINFECTIOUS\n\u2022 Vibrio, Salmonella, Campylobacter\n\u2022 Norovirus (outbreak pattern)\n\nNEUROLOGICAL\n\u2022 Guillain-Barr\u00e9 (ascending weakness)\n\u2022 Multiple sclerosis (chronic cases)\n\u2022 Botulism (descending paralysis)\n\nOTHER\n\u2022 Organophosphate poisoning\n\u2022 Anxiety/panic disorder (chronic phase)\n\nKey differentiator: HOT-COLD REVERSAL is essentially pathognomonic for ciguatera.',
        citation: [2, 6],
        next: 'cig-symptoms',
    },
    {
        id: 'cig-symptoms',
        type: 'question',
        module: 1,
        title: 'Symptom Pattern',
        body: 'Which symptom complex predominates? GI symptoms typically appear first (1-2 hours), neurological symptoms follow (6-24 hours), cardiovascular can occur early or late.',
        options: [
            {
                label: 'GI only (early presentation)',
                description: 'Nausea, vomiting, diarrhea within 1-6 hours',
                next: 'cig-gi-only',
            },
            {
                label: 'GI + Neurological',
                description: 'Paresthesias, weakness, or hot-cold reversal',
                next: 'cig-neuro-assess',
            },
            {
                label: 'GI + Cardiovascular',
                description: 'Bradycardia, hypotension, or chest pain',
                next: 'cig-cardiac-assess',
                urgency: 'urgent',
            },
            {
                label: 'All three systems',
                description: 'GI + neuro + cardiovascular symptoms',
                next: 'cig-severe',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'cig-gi-only',
        type: 'info',
        module: 2,
        title: 'GI-Predominant Ciguatera',
        body: 'Early presentation with primarily GI symptoms. Neurological symptoms often develop over the next 12-24 hours.\n\nTYPICAL GI SYMPTOMS\n\u2022 Nausea and vomiting (onset 1-2 hours)\n\u2022 Watery diarrhea (can be profuse)\n\u2022 Abdominal cramping\n\u2022 Duration: 1-4 days typically\n\nMANAGEMENT\n\u2022 IV fluids for dehydration\n\u2022 Antiemetics (ondansetron 4-8 mg IV/PO)\n\u2022 Monitor for neurological symptom development\n\nIMPORTANT: Ask specifically about:\n\u2022 Tingling around lips/tongue\n\u2022 Temperature perception changes\n\u2022 Weakness or fatigue\n\nThese suggest evolving neurological involvement.',
        citation: [1, 8],
        next: 'cig-treatment',
    },
    // =====================================================================
    // MODULE 2: SEVERITY ASSESSMENT
    // =====================================================================
    {
        id: 'cig-neuro-assess',
        type: 'question',
        module: 2,
        title: 'Neurological Severity',
        body: 'Neurological symptoms are the hallmark of ciguatera and can persist for weeks to months.\n\nASK SPECIFICALLY about hot-cold reversal \u2014 patients may not volunteer this symptom.',
        options: [
            {
                label: 'Mild: Paresthesias only',
                description: 'Tingling lips, fingers, toes; no motor deficit',
                next: 'cig-neuro-mild',
            },
            {
                label: 'Moderate: Multiple neuro symptoms',
                description: 'Hot-cold reversal, myalgias, arthralgias, fatigue',
                next: 'cig-neuro-moderate',
            },
            {
                label: 'Severe: Motor/CNS involvement',
                description: 'Ataxia, weakness, altered mental status, seizures',
                next: 'cig-neuro-severe',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'cig-neuro-mild',
        type: 'info',
        module: 2,
        title: 'Mild Neurological Symptoms',
        body: 'Mild sensory symptoms without motor involvement.\n\nTYPICAL SYMPTOMS\n\u2022 Perioral paresthesias (tingling lips/tongue)\n\u2022 Distal extremity paresthesias\n\u2022 Mild headache\n\u2022 Metallic taste\n\nEXPECTED COURSE\n\u2022 May worsen over first 24-48 hours\n\u2022 Usually resolves within 1-2 weeks\n\u2022 Some patients develop chronic symptoms\n\nTREATMENT\n\u2022 Supportive care\n\u2022 Consider amitriptyline 25 mg PO daily for neuropathic symptoms\n\u2022 NSAIDs for myalgias/headache\n\nMONITOR FOR PROGRESSION\n\u2022 Hot-cold reversal development\n\u2022 Motor weakness\n\u2022 Cardiac symptoms',
        citation: [2, 6],
        next: 'cig-treatment',
    },
    {
        id: 'cig-neuro-moderate',
        type: 'info',
        module: 2,
        title: 'Moderate Neurological Symptoms',
        body: 'Classic ciguatera presentation with hot-cold reversal and sensory symptoms.\n\nPATHOGNOMONIC: HOT-COLD REVERSAL\n\u2022 Cold objects feel burning hot\n\u2022 Hot objects feel cold\n\u2022 Present in ~80% if specifically asked\n\u2022 May persist for months\n\nOTHER SYMPTOMS\n\u2022 Diffuse paresthesias\n\u2022 Myalgias, arthralgias\n\u2022 Severe fatigue\n\u2022 Pruritus (itching)\n\u2022 Cold allodynia (burning pain on cold contact)\n\nTREATMENT\n\u2022 Consider IV mannitol if within 72 hours\n\u2022 Amitriptyline 25-50 mg daily\n\u2022 Gabapentin 300-400 mg TID for neuropathic pain\n\u2022 Antihistamines for pruritus\n\nThese patients often have prolonged recovery (weeks to months).',
        citation: [2, 5, 6],
        next: 'cig-mannitol',
    },
    {
        id: 'cig-neuro-severe',
        type: 'result',
        module: 2,
        title: 'Severe Neurological Symptoms',
        body: 'Motor or CNS involvement indicates severe poisoning.',
        recommendation: 'ADMIT TO ICU/MONITORED BED\n\nSEVERE NEUROLOGICAL FEATURES\n\u2022 Ataxia or incoordination\n\u2022 Motor weakness (may mimic GBS)\n\u2022 Altered mental status\n\u2022 Seizures (rare but reported)\n\u2022 Respiratory compromise\n\nIMMEDIATE MANAGEMENT\n\u2022 Continuous cardiac monitoring\n\u2022 Frequent neuro checks\n\u2022 Consider IV mannitol 1 g/kg over 30-45 min\n\u2022 Airway assessment \u2014 intubation if respiratory muscle weakness\n\nWORKUP\n\u2022 ECG (assess for bradycardia, QT prolongation)\n\u2022 Basic metabolic panel\n\u2022 Consider LP if meningitis in differential\n\u2022 MRI brain if symptoms atypical\n\nNEUROLOGY CONSULTATION if motor weakness or altered mental status.',
        confidence: 'definitive',
        citation: [2, 6],
    },
    {
        id: 'cig-cardiac-assess',
        type: 'question',
        module: 2,
        title: 'Cardiovascular Assessment',
        body: 'Cardiovascular toxicity occurs in 20-40% of cases. Bradycardia is most common; hypotension can be severe.',
        options: [
            {
                label: 'Bradycardia (HR <50)',
                description: 'Symptomatic or asymptomatic slow heart rate',
                next: 'cig-bradycardia',
                urgency: 'urgent',
            },
            {
                label: 'Hypotension (SBP <90)',
                description: 'With or without symptoms',
                next: 'cig-hypotension',
                urgency: 'urgent',
            },
            {
                label: 'Both bradycardia and hypotension',
                description: 'Combined hemodynamic instability',
                next: 'cig-severe',
                urgency: 'critical',
            },
            {
                label: 'Chest pain or palpitations',
                description: 'Cardiac symptoms without vital sign changes',
                next: 'cig-chest-pain',
            },
        ],
    },
    {
        id: 'cig-bradycardia',
        type: 'info',
        module: 2,
        title: 'Ciguatera Bradycardia',
        body: 'Bradycardia is the most common cardiovascular manifestation (67% of cardiac cases). Usually responds to atropine.\n\nMECHANISM\n\u2022 Ciguatoxin opens sodium channels\n\u2022 Vagal stimulation predominates\n\u2022 Direct cardiac ion channel effects\n\nMANAGEMENT\n\nASYMPTOMATIC (HR 40-50)\n\u2022 Monitor on telemetry\n\u2022 IV access\n\u2022 Observe for progression\n\nSYMPTOMATIC (HR <40 or symptoms)\n\u2022 Atropine 0.5-1 mg IV push\n\u2022 May repeat q3-5 min to max 3 mg\n\u2022 Transcutaneous pacing if refractory\n\nAVOID\n\u2022 Beta-blockers\n\u2022 Calcium channel blockers\n\u2022 These worsen bradycardia\n\nMost bradycardia resolves within 2-5 days.',
        citation: [1, 8],
        next: 'cig-treatment',
    },
    {
        id: 'cig-hypotension',
        type: 'info',
        module: 2,
        title: 'Ciguatera Hypotension',
        body: 'Hypotension occurs in up to 75% of patients with cardiovascular involvement. Usually responds to fluids.\n\nMANAGEMENT\n\nFIRST-LINE: IV Fluids\n\u2022 NS or LR 20 mL/kg bolus over 30 min\n\u2022 Repeat as needed\n\u2022 Monitor urine output\n\nREFRACTORY HYPOTENSION\n\u2022 Norepinephrine if persistent shock\n\u2022 Consider concurrent bradycardia (treat with atropine)\n\u2022 Rule out other causes (sepsis, bleeding)\n\nMONITORING\n\u2022 Continuous cardiac monitoring\n\u2022 Serial BPs q15 min until stable\n\u2022 Strict I/Os\n\nMost hypotension resolves within 2-5 days with supportive care.',
        citation: [1],
        next: 'cig-treatment',
    },
    {
        id: 'cig-chest-pain',
        type: 'info',
        module: 2,
        title: 'Cardiac Symptoms Without Instability',
        body: 'Chest pain, palpitations, and dyspnea can occur without hemodynamic compromise.\n\nWORKUP\n\u2022 12-lead ECG (assess rhythm, QT interval)\n\u2022 Troponin (ciguatoxin can cause myocardial injury)\n\u2022 Continuous monitoring\n\nECG FINDINGS TO WATCH\n\u2022 Sinus bradycardia (most common)\n\u2022 AV blocks (rare)\n\u2022 QT prolongation\n\u2022 T-wave inversions\n\nMANAGEMENT\n\u2022 Observation with telemetry\n\u2022 Treat symptoms supportively\n\u2022 Consider admission if ECG abnormal or troponin elevated\n\nMost cardiac symptoms resolve within 2-5 days.',
        citation: [1],
        next: 'cig-treatment',
    },
    {
        id: 'cig-severe',
        type: 'result',
        module: 2,
        title: 'Severe Ciguatera Poisoning',
        body: 'Multi-system involvement requires ICU-level care.',
        recommendation: 'ADMIT TO ICU\n\nIMMEDIATE INTERVENTIONS\n\u2022 Continuous cardiac monitoring\n\u2022 Large-bore IV access\n\u2022 Airway assessment\n\nFOR BRADYCARDIA\n\u2022 Atropine 0.5-1 mg IV, repeat q3-5 min to max 3 mg\n\u2022 Transcutaneous pacing if refractory\n\nFOR HYPOTENSION\n\u2022 NS/LR 20 mL/kg bolus\n\u2022 Norepinephrine if persistent shock\n\nCONSIDER IV MANNITOL\n\u2022 1 g/kg over 30-45 minutes\n\u2022 If within 72 hours of ingestion\n\u2022 Monitor renal function and osmolality\n\nNEURO MONITORING\n\u2022 Frequent neuro checks\n\u2022 Seizure precautions\n\u2022 Respiratory status (may need intubation)\n\nMortality is <1% but severe cases can progress rapidly in first 24 hours.',
        confidence: 'definitive',
        citation: [1, 5, 7],
    },
    // =====================================================================
    // MODULE 3: ED TREATMENT
    // =====================================================================
    {
        id: 'cig-treatment',
        type: 'info',
        module: 3,
        title: 'ED Treatment Overview',
        body: 'Treatment is primarily supportive. No antidote exists.\n\nALL PATIENTS\n\u2022 IV access and fluids for dehydration\n\u2022 Antiemetics: ondansetron 4-8 mg IV/PO q4-6h\n\u2022 Cardiac monitoring if any cardiovascular symptoms\n\nGI DECONTAMINATION\n\u2022 Activated charcoal: consider if within 3-4 hours (limited evidence)\n\u2022 AVOID ipecac and lavage\n\nPAIN/NEUROPATHY\n\u2022 Acetaminophen, NSAIDs for myalgias/headache\n\u2022 Amitriptyline 25-50 mg PO daily for neuropathic symptoms\n\u2022 Gabapentin 300-400 mg TID if severe paresthesias\n\nPRURITUS\n\u2022 Diphenhydramine 25-50 mg IV/PO q4-6h\n\u2022 Cool compresses for dysesthesias\n\nAVOID\n\u2022 Opiates (worsen GI and neuro symptoms)\n\u2022 Barbiturates\n\u2022 Beta-blockers, calcium channel blockers',
        citation: [1, 4, 7],
        next: 'cig-mannitol',
    },
    {
        id: 'cig-mannitol',
        type: 'question',
        module: 3,
        title: 'IV Mannitol Consideration',
        body: 'IV mannitol has been used for neurological symptoms, though evidence is mixed. One RCT showed no benefit over saline, but case series report improvement.\n\nBest evidence is within 72 hours of ingestion.',
        options: [
            {
                label: 'Give mannitol',
                description: 'Moderate-severe neuro symptoms, within 72 hours',
                next: 'cig-mannitol-protocol',
            },
            {
                label: 'Do not give mannitol',
                description: 'Mild symptoms, >72 hours, or contraindicated',
                next: 'cig-dispo',
            },
        ],
    },
    {
        id: 'cig-mannitol-protocol',
        type: 'info',
        module: 3,
        title: 'Mannitol Protocol',
        body: 'IV mannitol may reduce neurological symptoms if given early.\n\nDOSING\n\u2022 25% mannitol 1.0 g/kg IV over 30-45 minutes\n\u2022 May repeat in 3-4 hours if partial response\n\u2022 Maximum 2 doses in 24 hours\n\nMONITORING (REQUIRED)\n\u2022 Strict intake/output\n\u2022 Serum osmolality (keep <320 mOsm/kg)\n\u2022 Electrolytes q4-6 hours\n\u2022 Renal function\n\nCONTRAINDICATIONS\n\u2022 Oliguric or anuric renal failure\n\u2022 Severe dehydration (correct first)\n\u2022 Pulmonary edema or CHF\n\u2022 Active intracranial hemorrhage\n\nFLUID REPLACEMENT\n\u2022 Replace urine output with isotonic crystalloid\n\u2022 Mannitol causes significant diuresis\n\nEvidence: Palafox 1988 case series showed benefit; Schnorf 2002 RCT showed no difference vs saline. Still considered reasonable if given early.',
        citation: [3, 5, 7],
        next: 'cig-dispo',
    },
    // =====================================================================
    // MODULE 4: DISPOSITION & CHRONIC CARE
    // =====================================================================
    {
        id: 'cig-dispo',
        type: 'question',
        module: 4,
        title: 'Disposition Decision',
        body: 'Assess for admission criteria.',
        options: [
            {
                label: 'Discharge criteria met',
                description: 'Stable vitals, mild symptoms, able to tolerate PO, safe environment',
                next: 'cig-discharge',
            },
            {
                label: 'Observation needed',
                description: 'Moderate symptoms, need IV hydration, mannitol given',
                next: 'cig-observe',
            },
            {
                label: 'Admission required',
                description: 'Hemodynamic instability, severe neuro symptoms, respiratory concerns',
                next: 'cig-admit',
            },
        ],
    },
    {
        id: 'cig-discharge',
        type: 'result',
        module: 4,
        title: 'Discharge Home',
        body: 'Mild ciguatera with stable vital signs.',
        recommendation: 'DISCHARGE CRITERIA MET\n\u2022 Normal vital signs\n\u2022 No severe neurological symptoms\n\u2022 No cardiovascular instability\n\u2022 Tolerating oral fluids\n\u2022 Safe discharge environment\n\nDISCHARGE MEDICATIONS\n\u2022 Antiemetic PRN (ondansetron ODT)\n\u2022 Amitriptyline 25 mg PO qHS for neuropathic symptoms\n\u2022 NSAIDs PRN for myalgias\n\nSTRICT AVOIDANCE (6+ months minimum)\n\u2022 ALL fish and seafood (risk of sensitization)\n\u2022 Alcohol (triggers symptom recurrence)\n\u2022 Caffeine, nuts, chocolate (reported triggers)\n\nFOLLOW-UP\n\u2022 PCP within 48-72 hours\n\u2022 Neurology if symptoms persist >2 weeks\n\nRETURN PRECAUTIONS\n\u2022 Worsening neurological symptoms\n\u2022 Bradycardia or palpitations\n\u2022 Syncope or near-syncope\n\u2022 Inability to tolerate fluids',
        confidence: 'recommended',
        citation: [1, 4],
    },
    {
        id: 'cig-observe',
        type: 'result',
        module: 4,
        title: 'Observation',
        body: 'Moderate symptoms requiring observation.',
        recommendation: 'ADMIT TO OBSERVATION (23-hour)\n\nINDICATIONS\n\u2022 Moderate neurological symptoms\n\u2022 Requiring IV hydration\n\u2022 Mannitol administered\n\u2022 Mild cardiovascular symptoms\n\u2022 Unreliable follow-up\n\nMONITORING\n\u2022 Continuous cardiac monitoring for first 6-12 hours\n\u2022 Serial vitals q2-4h\n\u2022 Neuro checks q4h\n\u2022 Strict I/Os (especially if mannitol given)\n\nDISCHARGE WHEN\n\u2022 Stable vitals x 6 hours\n\u2022 Symptoms improving or stable\n\u2022 Tolerating PO\n\u2022 No cardiac arrhythmias\n\nProvide same discharge instructions and avoidance list as outpatient discharge.',
        confidence: 'recommended',
        citation: [1],
    },
    {
        id: 'cig-admit',
        type: 'result',
        module: 4,
        title: 'Inpatient Admission',
        body: 'Severe ciguatera requiring admission.',
        recommendation: 'ADMIT TO TELEMETRY OR ICU\n\nADMISSION CRITERIA\n\u2022 Bradycardia requiring atropine\n\u2022 Hypotension requiring IV fluids or vasopressors\n\u2022 Respiratory symptoms\n\u2022 Seizures or altered mental status\n\u2022 Severe dehydration\n\u2022 Syncope with hemodynamic changes\n\u2022 ECG abnormalities\n\u2022 Pregnancy\n\nMONITORING\n\u2022 Continuous cardiac monitoring x 24-48 hours minimum\n\u2022 Serial vitals q1h initially\n\u2022 Neuro checks q2h\n\u2022 Repeat ECG if initial abnormal\n\u2022 Serial electrolytes\n\nCONSULTS\n\u2022 Toxicology (if available)\n\u2022 Cardiology if arrhythmias\n\u2022 Neurology if motor weakness or AMS\n\nMost severe cases stabilize within 24-48 hours.',
        confidence: 'definitive',
        citation: [1, 2],
    },
    {
        id: 'cig-chronic',
        type: 'info',
        module: 4,
        title: 'Chronic Ciguatera Syndrome',
        body: 'For patients with persistent symptoms >2 weeks.\n\nCHRONIC SYMPTOMS (3-20% of patients)\n\u2022 Fatigue (most common)\n\u2022 Persistent paresthesias\n\u2022 Myalgias, arthralgias\n\u2022 Cognitive difficulties\n\u2022 Depression, mood changes\n\u2022 Duration: months to years\n\nSENSITIZATION PHENOMENON\n\u2022 Symptoms recur with:\n  \u2014 Any fish consumption (even safe species)\n  \u2014 Alcohol (even years later)\n  \u2014 Caffeine, nuts, chocolate\n\u2022 May persist for 6-12+ months\n\nLONG-TERM MANAGEMENT\n\u2022 Amitriptyline 25-50 mg daily (fatigue, pain, mood)\n\u2022 Gabapentin 300-400 mg TID (neuropathy)\n\u2022 SSRIs for depression (fluoxetine)\n\u2022 Strict dietary avoidance\n\nREFERRALS\n\u2022 Neurology if symptoms persist\n\u2022 Toxicology for chronic management\n\u2022 Psychiatry if significant depression/anxiety',
        citation: [2, 6],
        next: 'cig-start',
    },
];
