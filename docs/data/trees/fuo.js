// MedKitt — Fever of Unknown Origin (FUO)
// Classic FUO → Travel History → Category-Based Workup → Advanced Diagnostics → Empiric Treatment
// 6 modules: Definition → Travel Stratification → Initial Workup → Advanced Workup → Specific Etiologies → Disposition
// Evidence: NEJM 2022, CDC Yellow Book 2024, StatPearls 2024
export const FUO_CRITICAL_ACTIONS = [
    { text: 'Classic FUO: T ≥38.3°C (101°F) on multiple occasions, ≥3 weeks duration, diagnosis uncertain after initial workup', nodeId: 'fuo-start' },
    { text: 'TRAVEL HISTORY IS CRITICAL: Malaria is life-threatening and must be ruled out in ANY traveler to endemic area within 1 year', nodeId: 'fuo-travel' },
    { text: 'P. falciparum malaria can progress to death within 24-36 hours — treat as medical emergency', nodeId: 'fuo-travel-malaria' },
    { text: 'FDG-PET/CT has 50-70% diagnostic yield in FUO — consider early if initial workup negative', nodeId: 'fuo-advanced' },
    { text: 'Drug fever accounts for 3-7% of FUO — review ALL medications including OTCs and supplements', nodeId: 'fuo-drug-fever' },
    { text: 'Adult Still disease: quotidian fever spikes, salmon-colored rash, arthritis, ferritin >10,000', nodeId: 'fuo-autoimmune' },
    { text: 'Giant cell arteritis (GCA): Consider in all patients >50 years with FUO — ESR/CRP, temporal artery biopsy', nodeId: 'fuo-autoimmune' },
    { text: 'TB remains a leading infectious cause of FUO worldwide — maintain high index of suspicion', nodeId: 'fuo-infection' },
];
export const FUO_NODES = [
    // =====================================================================
    // MODULE 1: DEFINITION & INITIAL TRIAGE
    // =====================================================================
    {
        id: 'fuo-start',
        type: 'info',
        module: 1,
        title: 'Fever of Unknown Origin',
        body: '**Classic FUO Definition (Petersdorf 1961, modified Durack 1991):**\n\n• Temperature ≥38.3°C (101°F) on multiple occasions\n• Duration ≥3 weeks\n• Diagnosis uncertain after initial evaluation\n\n**REFERENCES**\n• [FUO Diagnostic Criteria](#/info/fuo-criteria)\n• [Initial Workup Checklist](#/info/fuo-initial-workup)\n• [Travel-Associated Diseases](#/info/fuo-travel-diseases)\n• [Drug Fever Culprits](#/info/fuo-drug-fever)\n• [FUO by Category](#/info/fuo-categories)\n\n**Four Categories of FUO:**\n1. **Classic FUO** — immunocompetent outpatient\n2. **Nosocomial FUO** — hospitalized ≥24h, fever develops ≥3 days\n3. **Neutropenic FUO** — ANC <500, fever ≥3 days\n4. **HIV-associated FUO** — confirmed HIV, fever ≥4 weeks',
        citation: [1, 2],
        next: 'fuo-category',
        summary: 'Classic FUO: T ≥38.3°C, ≥3 weeks, uncertain diagnosis after initial workup; four categories based on host status',
    },
    {
        id: 'fuo-category',
        type: 'question',
        module: 1,
        title: 'FUO Category',
        body: 'Select the FUO category based on clinical context:',
        citation: [1, 2],
        options: [
            {
                label: 'Classic FUO',
                description: 'Immunocompetent, outpatient or early admission',
                next: 'fuo-travel',
            },
            {
                label: 'Nosocomial FUO',
                description: 'Hospitalized ≥24h before fever onset, fever ≥3 days',
                next: 'fuo-nosocomial',
            },
            {
                label: 'Neutropenic FUO',
                description: 'ANC <500/µL, fever ≥3 days despite antibiotics',
                next: 'fuo-neutropenic',
            },
            {
                label: 'HIV-associated FUO',
                description: 'Confirmed HIV infection, fever ≥4 weeks',
                next: 'fuo-hiv',
            },
        ],
        summary: 'Categorize FUO: classic (immunocompetent), nosocomial (hospital-acquired), neutropenic (ANC<500), HIV-associated',
    },
    // =====================================================================
    // MODULE 2: TRAVEL HISTORY STRATIFICATION
    // =====================================================================
    {
        id: 'fuo-travel',
        type: 'question',
        module: 2,
        title: 'Travel History',
        body: '**CRITICAL: Travel history guides initial workup.**\n\nHas the patient traveled to an endemic area within the past year?\n\nSee [Travel-Associated Diseases by Region](#/info/fuo-travel-diseases) for geographic guidance.',
        citation: [3, 4],
        options: [
            {
                label: 'Recent travel to malaria-endemic area',
                description: 'Sub-Saharan Africa, SE Asia, South America, etc.',
                next: 'fuo-travel-malaria',
                urgency: 'critical',
            },
            {
                label: 'Recent travel to other endemic area',
                description: 'Tropical/subtropical travel without malaria exposure',
                next: 'fuo-travel-other',
                urgency: 'urgent',
            },
            {
                label: 'No significant travel history',
                description: 'Domestic travel only or no travel',
                next: 'fuo-no-travel',
            },
        ],
        summary: 'Travel history is critical — malaria-endemic travel requires urgent blood smear; other endemic travel guides specific testing',
    },
    {
        id: 'fuo-travel-malaria',
        type: 'info',
        module: 2,
        title: 'URGENT: Rule Out Malaria',
        body: '**MALARIA IS A MEDICAL EMERGENCY**\n\nP. falciparum can progress to death within 24-36 hours in a malaria-naive patient.\n\n**IMMEDIATE WORKUP:**\n• **Thick and thin blood smears** — gold standard\n• **Rapid diagnostic test (RDT)** — if smear delayed\n• **Repeat smears q12-24h x 3** if initial negative and suspicion high\n\n**EMPIRIC TREATMENT** if:\n• Unable to obtain smear within 2 hours\n• High clinical suspicion + hemodynamic instability\n• Severe disease features present\n\n**NOTE:** Chemoprophylaxis does NOT exclude malaria — breakthrough infections occur.\n\nSee [Malaria Treatment](#/drug/artemether-lumefantrine) and **Severe Malaria**',
        citation: [3, 4, 5],
        next: 'fuo-travel-workup',
        safetyLevel: 'critical',
        summary: 'P. falciparum can kill in 24-36h; thick/thin smears STAT; empiric treatment if unable to obtain smear or hemodynamically unstable',
    },
    {
        id: 'fuo-travel-other',
        type: 'info',
        module: 2,
        title: 'Travel-Associated Fever Workup',
        body: '**Consider based on travel region and incubation period:**\n\n**SHORT INCUBATION (<2 weeks):**\n• Dengue, Chikungunya, Zika (arboviruses)\n• Travelers diarrhea / Enteric pathogens\n• Influenza, COVID-19\n• Rickettsial diseases\n\n**MEDIUM INCUBATION (2-6 weeks):**\n• Typhoid/Paratyphoid fever\n• Malaria (esp. P. vivax, P. ovale)\n• Hepatitis A, E\n• Acute HIV seroconversion\n• Leptospirosis\n\n**LONG INCUBATION (>6 weeks):**\n• Tuberculosis\n• Visceral leishmaniasis\n• Amoebic liver abscess\n• Brucellosis\n\nSee [Travel-Associated Diseases](#/info/fuo-travel-diseases) for complete list.',
        citation: [3, 4],
        next: 'fuo-travel-workup',
        summary: 'Incubation period guides differential: <2wk = dengue/enteric; 2-6wk = typhoid/malaria/hepatitis; >6wk = TB/leishmania/abscess',
    },
    {
        id: 'fuo-travel-workup',
        type: 'info',
        module: 3,
        title: 'Travel-Related FUO Workup',
        body: '**INITIAL LABS:**\n• CBC with differential (eosinophilia → parasites)\n• CMP, LFTs\n• Blood cultures x 2\n• Thick and thin blood smears for malaria\n• Urinalysis + urine culture\n\n**DIRECTED TESTING:**\n• **Dengue:** NS1 antigen (acute), IgM/IgG serology\n• **Typhoid:** Blood cultures (gold standard), stool culture\n• **Hepatitis:** HAV IgM, HBV panel, HCV Ab\n• **Rickettsial:** Serology (often retrospective)\n• **Leptospirosis:** IgM serology, PCR\n• **Brucellosis:** Blood cultures (prolonged incubation), serology\n\n**IMAGING:**\n• CXR (TB, pneumonia)\n• Abdominal US or CT (abscess, hepatosplenomegaly)\n\n**WHEN TO CONSULT ID/TRAVEL MEDICINE:**\n• Severe illness, hemodynamic instability\n• Hemorrhagic symptoms\n• Diagnostic uncertainty\n• Exotic or rare pathogens suspected',
        citation: [3, 4, 5],
        next: 'fuo-travel-result',
        summary: 'Travel FUO: CBC, CMP, blood cultures, malaria smears, UA; directed testing based on region + incubation; consult ID if severe',
    },
    {
        id: 'fuo-travel-result',
        type: 'question',
        module: 3,
        title: 'Travel Workup Results',
        body: 'What did the travel-focused workup reveal?',
        citation: [3, 4],
        options: [
            {
                label: 'Diagnosis established',
                description: 'Specific pathogen or source identified',
                next: 'fuo-travel-dx',
            },
            {
                label: 'Workup negative, fever persists',
                description: 'Continue to standard FUO workup',
                next: 'fuo-no-travel',
            },
        ],
        summary: 'If travel workup positive → targeted treatment; if negative → proceed to standard FUO evaluation',
    },
    {
        id: 'fuo-travel-dx',
        type: 'result',
        module: 6,
        title: 'Travel-Associated Diagnosis',
        body: '**Diagnosis established from travel-focused workup.**\n\n**COMMON DIAGNOSES:**\n\n• **Malaria:** See [Malaria Treatment](#/drug/artemether-lumefantrine)\n• **Dengue:** Supportive care, monitor for warning signs\n• **Typhoid:** [Fluoroquinolone](#/drug/ciprofloxacin) or [Azithromycin](#/drug/azithromycin) or [Ceftriaxone](#/drug/ceftriaxone)\n• **Rickettsial:** [Doxycycline](#/drug/doxycycline) 100mg BID\n• **Leptospirosis:** [Doxycycline](#/drug/doxycycline) or [Ceftriaxone](#/drug/ceftriaxone)\n• **Brucellosis:** [Doxycycline](#/drug/doxycycline) + [Gentamicin](#/drug/gentamicin) or rifampin\n\n**DISPOSITION:**\n• Admit if hemodynamically unstable, severe disease, or requires IV therapy\n• Outpatient if mild disease with reliable follow-up\n• ID consult for complex or exotic pathogens',
        recommendation: 'Treat based on specific diagnosis. Admit if severe or unstable. ID consult for complex cases.',
        confidence: 'definitive',
        citation: [3, 4, 5],
    },
    // =====================================================================
    // MODULE 3: NON-TRAVEL FUO INITIAL WORKUP
    // =====================================================================
    {
        id: 'fuo-no-travel',
        type: 'info',
        module: 3,
        title: 'Initial FUO Workup',
        body: '**COMPREHENSIVE HISTORY:**\n• Duration, pattern, and degree of fever\n• ALL medications (including OTCs, supplements, herbals)\n• Occupational/animal exposures\n• Sexual history, HIV risk factors\n• Family history (familial Mediterranean fever, etc.)\n• Prior surgeries, implants, devices\n\n**INITIAL LABORATORY STUDIES:**\n• CBC with differential\n• CMP, LFTs\n• ESR, CRP (inflammatory markers)\n• Blood cultures x 2-3 sets\n• Urinalysis + urine culture\n• LDH, ferritin\n• HIV serology (if not recently tested)\n• ANA, RF (if autoimmune suspected)\n\n**INITIAL IMAGING:**\n• Chest X-ray\n• Abdominal ultrasound or CT\n\nSee [Initial Workup Checklist](#/info/fuo-initial-workup) for complete list.',
        citation: [1, 2, 6],
        next: 'fuo-initial-result',
        summary: 'Initial FUO workup: comprehensive history (meds, exposures, devices), CBC/CMP/ESR/CRP/ferritin, blood cultures x3, UA, CXR, abdominal imaging',
    },
    {
        id: 'fuo-initial-result',
        type: 'question',
        module: 3,
        title: 'Initial Workup Results',
        body: 'What did the initial FUO workup reveal?',
        citation: [1, 2],
        options: [
            {
                label: 'Diagnosis established',
                description: 'Specific etiology identified',
                next: 'fuo-dx-found',
            },
            {
                label: 'Clues but no diagnosis',
                description: 'Abnormal findings guide further testing',
                next: 'fuo-clues',
            },
            {
                label: 'No localizing signs, workup negative',
                description: 'Proceed to advanced diagnostics',
                next: 'fuo-advanced',
            },
        ],
        summary: 'Initial workup result triage: diagnosis found → treat; clues present → directed workup; negative → advanced diagnostics',
    },
    // =====================================================================
    // MODULE 4: CLUE-DIRECTED WORKUP
    // =====================================================================
    {
        id: 'fuo-clues',
        type: 'question',
        module: 4,
        title: 'Follow the Clues',
        body: 'Which abnormality or clinical finding is present?',
        citation: [1, 2, 6],
        options: [
            {
                label: 'Elevated inflammatory markers (ESR/CRP)',
                description: 'ESR >100 or markedly elevated CRP',
                next: 'fuo-high-esr',
            },
            {
                label: 'Lymphadenopathy or splenomegaly',
                description: 'Palpable nodes or enlarged spleen on imaging',
                next: 'fuo-lymph',
            },
            {
                label: 'Hepatic abnormalities',
                description: 'Elevated LFTs, hepatomegaly, or liver lesions',
                next: 'fuo-liver',
            },
            {
                label: 'Cardiac murmur or embolic phenomena',
                description: 'New murmur, splinter hemorrhages, Janeway lesions',
                next: 'fuo-endocarditis',
            },
            {
                label: 'Rash or skin findings',
                description: 'Any rash, nodules, or cutaneous lesions',
                next: 'fuo-skin',
            },
            {
                label: 'Medication history suspicious',
                description: 'Recent new medication or known drug fever culprit',
                next: 'fuo-drug-fever',
            },
        ],
        summary: 'Follow clues: high ESR → vasculitis/malignancy; adenopathy → lymphoma/TB; liver → abscess/hepatitis; murmur → endocarditis',
    },
    {
        id: 'fuo-high-esr',
        type: 'info',
        module: 4,
        title: 'High ESR/CRP Workup',
        body: '**ESR >100 mm/hr suggests:**\n• Giant cell arteritis (GCA) — age >50\n• Malignancy (lymphoma, renal cell carcinoma)\n• Endocarditis\n• Osteomyelitis\n• Tuberculosis\n• Adult Still disease\n\n**DIRECTED WORKUP:**\n\n**If age >50 years:**\n• Temporal artery biopsy (GCA)\n• PMR symptoms? (proximal muscle pain/stiffness)\n\n**Markedly elevated ferritin (>10,000):**\n• Adult Still disease\n• Hemophagocytic lymphohistiocytosis (HLH)\n\n**Consider:**\n• Blood cultures (if not already done)\n• Echocardiogram (endocarditis)\n• CT chest/abdomen/pelvis (malignancy)\n• Bone scan or MRI (osteomyelitis)\n• Quantiferon/PPD (TB)',
        citation: [1, 2, 7],
        next: 'fuo-advanced',
        summary: 'ESR >100: consider GCA (>50yo), malignancy, endocarditis, osteomyelitis, TB, Still disease; ferritin >10k = Still or HLH',
    },
    {
        id: 'fuo-lymph',
        type: 'info',
        module: 4,
        title: 'Lymphadenopathy/Splenomegaly Workup',
        body: '**DIFFERENTIAL:**\n• Lymphoma (Hodgkin, Non-Hodgkin)\n• Tuberculosis\n• Castleman disease\n• Kikuchi disease\n• Sarcoidosis\n• Infectious mononucleosis (EBV, CMV)\n• HIV\n• Systemic lupus erythematosus\n\n**DIRECTED WORKUP:**\n• **Lymph node biopsy** — excisional preferred over FNA\n• CT chest/abdomen/pelvis with contrast\n• EBV/CMV serologies\n• HIV serology\n• Quantiferon/PPD\n• LDH (lymphoma marker)\n• ACE level (sarcoidosis)\n• ANA, dsDNA (SLE)\n\n**TISSUE IS THE ISSUE:**\nIf accessible adenopathy present, proceed to biopsy early.',
        citation: [1, 2, 6],
        next: 'fuo-advanced',
        summary: 'Adenopathy/splenomegaly: lymphoma, TB, Castleman, EBV/CMV, HIV, sarcoid, SLE; excisional lymph node biopsy is key diagnostic step',
    },
    {
        id: 'fuo-liver',
        type: 'info',
        module: 4,
        title: 'Hepatic Abnormalities Workup',
        body: '**DIFFERENTIAL:**\n• Hepatic abscess (pyogenic, amoebic)\n• Granulomatous hepatitis\n• Hepatocellular carcinoma\n• Metastatic disease\n• Drug-induced liver injury\n• Viral hepatitis (HAV, HBV, HCV, EBV, CMV)\n• Q fever (Coxiella burnetii)\n• Brucellosis\n\n**DIRECTED WORKUP:**\n• CT abdomen with contrast or MRI\n• Hepatitis panel (HAV IgM, HBV, HCV)\n• EBV/CMV serologies\n• Blood cultures (prolonged incubation for Brucella)\n• Q fever serology\n• AFP (hepatocellular carcinoma)\n• **Liver biopsy** if lesion accessible and diagnosis unclear\n\n**ABSCESS MANAGEMENT:**\n• Pyogenic: aspiration/drainage + antibiotics\n• Amoebic: metronidazole ± aspiration if large',
        citation: [1, 2, 6],
        next: 'fuo-advanced',
        summary: 'Liver abnormalities: abscess, granulomatous hepatitis, HCC, viral hepatitis, Q fever, brucellosis; CT/MRI + serologies, consider biopsy',
    },
    {
        id: 'fuo-endocarditis',
        type: 'info',
        module: 4,
        title: 'Endocarditis Workup',
        body: '**Infective endocarditis is a classic cause of FUO.**\n\n**CLINICAL FEATURES:**\n• New or changing murmur\n• Splinter hemorrhages\n• Janeway lesions, Osler nodes\n• Petechiae\n• Splenomegaly\n• Embolic phenomena (stroke, renal infarcts)\n\n**MODIFIED DUKE CRITERIA:**\nSee **Endocarditis Criteria**\n\n**WORKUP:**\n• Blood cultures x 3 sets from separate sites\n• **Transthoracic echocardiogram (TTE)** — first line\n• **Transesophageal echocardiogram (TEE)** — if TTE negative but suspicion high, or prosthetic valve\n• ESR, CRP, RF\n• Urinalysis (microscopic hematuria)\n\n**CULTURE-NEGATIVE ENDOCARDITIS:**\n• HACEK organisms (fastidious)\n• Bartonella, Coxiella, Brucella\n• Fungi (Candida, Aspergillus)\n• Consider serologies and PCR of valve tissue',
        citation: [1, 2, 8],
        next: 'fuo-advanced',
        summary: 'Endocarditis: blood cultures x3, TTE first then TEE if negative + high suspicion; culture-negative = HACEK, Bartonella, Coxiella',
    },
    {
        id: 'fuo-skin',
        type: 'info',
        module: 4,
        title: 'Rash/Skin Findings Workup',
        body: '**RASH PATTERNS AND DIFFERENTIALS:**\n\n**Maculopapular:**\n• Drug reaction\n• Viral exanthem\n• Secondary syphilis\n• Adult Still disease (salmon-colored, evanescent)\n\n**Petechial/Purpuric:**\n• Endocarditis\n• Meningococcemia\n• Rocky Mountain Spotted Fever\n• Vasculitis\n\n**Nodules/Erythema nodosum:**\n• Sarcoidosis\n• Tuberculosis\n• Inflammatory bowel disease\n• Fungal infections (coccidioidomycosis, histoplasmosis)\n\n**DIRECTED WORKUP:**\n• **Skin biopsy** — often diagnostic\n• Blood cultures\n• RPR/VDRL (syphilis)\n• ANA, ANCA (vasculitis)\n• Fungal serologies based on exposure',
        citation: [1, 2],
        next: 'fuo-advanced',
        summary: 'Rash guides diagnosis: maculopapular = drug/viral/Still; petechial = endocarditis/RMSF/vasculitis; nodules = sarcoid/TB/fungal; biopsy early',
    },
    {
        id: 'fuo-drug-fever',
        type: 'info',
        module: 4,
        title: 'Drug Fever Evaluation',
        body: '**Drug fever accounts for 3-7% of FUO cases.**\n\n**COMMON CULPRITS:**\n• **Antibiotics:** Beta-lactams (most common), sulfonamides, vancomycin, nitrofurantoin\n• **Anticonvulsants:** Phenytoin, carbamazepine\n• **Cardiovascular:** Procainamide, quinidine, hydralazine\n• **Other:** Allopurinol, heparin, interferon, biologics\n\n**CHARACTERISTICS:**\n• Onset: days to weeks after starting drug\n• Patient may appear paradoxically well despite fever\n• Relative bradycardia common\n• Eosinophilia present in ~20%\n• Rash in ~20%\n\n**DIAGNOSIS:**\n• Diagnosis of exclusion\n• Fever typically resolves 48-72h after drug discontinuation\n• Re-challenge confirms diagnosis (rarely done)\n\nSee [Drug Fever Culprits](#/info/fuo-drug-fever) for complete list.',
        citation: [1, 2, 9],
        next: 'fuo-drug-result',
        summary: 'Drug fever: 3-7% of FUO; beta-lactams most common; patient appears well, relative bradycardia; fever resolves 48-72h after stopping',
    },
    {
        id: 'fuo-drug-result',
        type: 'question',
        module: 4,
        title: 'Drug Fever Management',
        body: 'Is there a suspected drug that can be safely discontinued?',
        citation: [1, 2],
        options: [
            {
                label: 'Yes — discontinue suspected drug',
                description: 'Stop drug and observe for 48-72h',
                next: 'fuo-drug-dispo',
            },
            {
                label: 'No — no clear culprit or cannot stop',
                description: 'Continue FUO workup',
                next: 'fuo-advanced',
            },
        ],
        summary: 'If drug fever suspected, discontinue culprit and observe for 48-72h defervescence; if not feasible, continue workup',
    },
    {
        id: 'fuo-drug-dispo',
        type: 'result',
        module: 6,
        title: 'Drug Fever — Observe After Discontinuation',
        body: '**Management:**\n• Discontinue suspected medication\n• Observe for 48-72 hours\n• Fever typically resolves within 48-72h (may take up to 5-7 days for some drugs)\n\n**IF FEVER PERSISTS >72 HOURS:**\n• Unlikely to be drug fever\n• Resume FUO workup\n\n**IF FEVER RESOLVES:**\n• Diagnosis confirmed\n• Document drug allergy/intolerance\n• Substitute alternative medication if needed\n\n**NOTE:** Do not re-challenge patient to confirm diagnosis unless absolutely necessary.',
        recommendation: 'Discontinue suspected drug. Observe 48-72h. If fever resolves, diagnosis confirmed. If persists, resume FUO workup.',
        confidence: 'recommended',
        citation: [1, 2, 9],
    },
    // =====================================================================
    // MODULE 5: ADVANCED DIAGNOSTICS
    // =====================================================================
    {
        id: 'fuo-advanced',
        type: 'info',
        module: 5,
        title: 'Advanced Diagnostic Workup',
        body: '**When initial workup is non-diagnostic, consider:**\n\n**IMAGING:**\n• **FDG-PET/CT** — 50-70% diagnostic yield in FUO\n  - Best for occult infection, malignancy, vasculitis\n  - Consider early if initial workup negative\n• CT chest/abdomen/pelvis with contrast (if not done)\n• MRI spine/pelvis (osteomyelitis, abscess)\n• Echocardiogram (TTE → TEE if negative)\n\n**TISSUE DIAGNOSIS:**\n• Bone marrow biopsy (granulomas, lymphoma, infection)\n• Temporal artery biopsy (if age >50, GCA suspected)\n• Lymph node biopsy (if adenopathy)\n• Liver biopsy (if hepatic abnormalities)\n\n**SEROLOGIES/CULTURES:**\n• TB: Quantiferon, sputum AFB, induced sputum\n• Fungal: Histoplasma/Blasto/Cocci antigens and serologies\n• Q fever, Bartonella, Brucella serologies\n• CMV, EBV serologies\n\nSee **Advanced FUO Workup** for complete algorithm.',
        citation: [1, 2, 6, 10],
        next: 'fuo-advanced-result',
        summary: 'Advanced FUO: FDG-PET/CT (50-70% yield), tissue biopsy (bone marrow, temporal artery, lymph node), TB/fungal/atypical serologies',
    },
    {
        id: 'fuo-advanced-result',
        type: 'question',
        module: 5,
        title: 'Advanced Workup Results',
        body: 'What category of disease was identified (or most likely)?',
        citation: [1, 2],
        options: [
            {
                label: 'Infection identified',
                description: 'TB, endocarditis, abscess, osteomyelitis, etc.',
                next: 'fuo-infection',
            },
            {
                label: 'Malignancy identified',
                description: 'Lymphoma, renal cell carcinoma, etc.',
                next: 'fuo-malignancy',
            },
            {
                label: 'Autoimmune/Inflammatory identified',
                description: 'GCA, Still disease, vasculitis, SLE, etc.',
                next: 'fuo-autoimmune',
            },
            {
                label: 'Still undiagnosed',
                description: 'No clear etiology despite advanced workup',
                next: 'fuo-undiagnosed',
            },
        ],
        summary: 'FUO etiologies: infection (~30%), malignancy (~20%), autoimmune (~20%), undiagnosed (~30%)',
    },
    // =====================================================================
    // MODULE 6: SPECIFIC ETIOLOGIES & DISPOSITION
    // =====================================================================
    {
        id: 'fuo-infection',
        type: 'result',
        module: 6,
        title: 'Infectious Etiology',
        body: '**COMMON INFECTIOUS CAUSES OF FUO:**\n\n**BACTERIAL:**\n• Tuberculosis (most common infectious cause worldwide)\n• Endocarditis (especially culture-negative)\n• Intra-abdominal abscess\n• Osteomyelitis\n• Prostatitis (elderly men)\n• Dental abscess\n\n**VIRAL:**\n• EBV, CMV (prolonged mononucleosis)\n• HIV (acute seroconversion or advanced)\n\n**FUNGAL:**\n• Histoplasmosis, Coccidioidomycosis (endemic areas)\n• Disseminated candidiasis\n\n**PARASITIC:**\n• Malaria (travel-related)\n• Visceral leishmaniasis\n• Toxoplasmosis\n\n**MANAGEMENT:**\n• Targeted antimicrobial therapy based on pathogen\n• ID consultation for complex or unusual infections\n• Source control (drainage of abscess, valve surgery for endocarditis)',
        recommendation: 'Treat based on specific pathogen identified. ID consultation recommended for complex infections. Source control as indicated.',
        confidence: 'definitive',
        citation: [1, 2, 6],
    },
    {
        id: 'fuo-malignancy',
        type: 'result',
        module: 6,
        title: 'Malignancy-Related FUO',
        body: '**MALIGNANCIES ASSOCIATED WITH FUO:**\n\n**HEMATOLOGIC (most common):**\n• Lymphoma (Hodgkin and Non-Hodgkin)\n• Leukemia (especially AML, CLL)\n• Castleman disease\n• Myelodysplastic syndrome\n\n**SOLID TUMORS:**\n• Renal cell carcinoma (classic FUO cause)\n• Hepatocellular carcinoma\n• Ovarian cancer\n• Atrial myxoma\n• Colon cancer (especially with liver metastases)\n\n**FEVER MECHANISM:**\n• Tumor necrosis\n• Cytokine production (IL-1, IL-6, TNF)\n• Superimposed infection\n• Paraneoplastic syndrome\n\n**MANAGEMENT:**\n• Oncology referral for staging and treatment\n• NSAIDs or acetaminophen for symptomatic fever control\n• Naproxen test: fever responds to naproxen more than acetaminophen in neoplastic fever (not definitive)',
        recommendation: 'Oncology referral for definitive diagnosis and treatment. NSAIDs may help control neoplastic fever.',
        confidence: 'definitive',
        citation: [1, 2, 6],
    },
    {
        id: 'fuo-autoimmune',
        type: 'result',
        module: 6,
        title: 'Autoimmune/Inflammatory FUO',
        body: '**AUTOIMMUNE/INFLAMMATORY CAUSES OF FUO:**\n\n**VASCULITIS:**\n• **Giant Cell Arteritis (GCA)** — age >50, headache, jaw claudication, visual changes\n  - ESR often >100, temporal artery biopsy diagnostic\n  - Start steroids immediately if vision threatened\n• Polyarteritis nodosa\n• ANCA-associated vasculitis\n\n**CONNECTIVE TISSUE:**\n• **Adult Still Disease** — quotidian fever, salmon rash, arthritis, ferritin >10,000\n• Systemic lupus erythematosus\n• Rheumatoid arthritis\n• Inflammatory myopathy\n\n**GRANULOMATOUS:**\n• Sarcoidosis\n• Granulomatosis with polyangiitis\n\n**AUTOINFLAMMATORY:**\n• Familial Mediterranean fever\n• TNF receptor-associated periodic syndrome (TRAPS)\n• Schnitzler syndrome\n\n**MANAGEMENT:**\n• Rheumatology consultation\n• Corticosteroids often first-line for many conditions\n• Disease-specific immunomodulatory therapy',
        recommendation: 'Rheumatology consultation. Corticosteroids often indicated. Start immediately if GCA with visual symptoms.',
        confidence: 'definitive',
        citation: [1, 2, 7],
    },
    {
        id: 'fuo-undiagnosed',
        type: 'result',
        module: 6,
        title: 'Undiagnosed FUO',
        body: '**~30% of FUO cases remain undiagnosed despite thorough workup.**\n\n**PROGNOSIS:**\n• Generally favorable if patient remains stable\n• Many resolve spontaneously over weeks to months\n• ~50% eventually diagnosed on long-term follow-up\n\n**MANAGEMENT OPTIONS:**\n\n**1. Watchful Waiting (preferred if stable):**\n• Close outpatient follow-up\n• Repeat evaluation if new symptoms develop\n• Serial inflammatory markers\n\n**2. Empiric Therapy Trial:**\n• **NSAIDs** — trial for possible autoimmune/inflammatory\n• **Corticosteroids** — only after infection excluded, consider if high suspicion for GCA or Still disease\n• **Antibiotics** — generally NOT recommended empirically unless clinical deterioration\n\n**3. Repeat Advanced Imaging:**\n• Repeat FDG-PET/CT in 4-6 weeks if initial negative\n\n**RED FLAGS (escalate workup):**\n• Clinical deterioration\n• Weight loss >10%\n• New localizing signs\n• Severe cytopenias',
        recommendation: 'Watchful waiting is appropriate if stable. Close follow-up with repeat evaluation if symptoms change. Avoid empiric steroids until infection excluded.',
        confidence: 'recommended',
        citation: [1, 2, 6],
    },
    // =====================================================================
    // SPECIAL POPULATIONS
    // =====================================================================
    {
        id: 'fuo-nosocomial',
        type: 'info',
        module: 2,
        title: 'Nosocomial FUO',
        body: '**Definition:** Fever developing ≥3 days after hospital admission in a patient admitted without fever.\n\n**COMMON CAUSES:**\n• **Line-related infection** — central lines, peripheral IVs\n• **Surgical site infection**\n• **Clostridium difficile colitis**\n• **Drug fever** (antibiotics very common)\n• **UTI** — especially with Foley catheter\n• **Pneumonia** — HAP/VAP\n• **DVT/PE** — immobility\n• **Sinusitis** — NG tube, intubation\n• **Decubitus ulcer infection**\n\n**WORKUP:**\n• Review all lines, catheters, surgical sites\n• Blood cultures from line AND peripheral\n• C. diff toxin assay\n• Chest X-ray\n• Urinalysis and culture\n• Lower extremity Doppler if DVT suspected\n• CT sinuses if intubated/NG tube\n\n**MANAGEMENT:**\n• Remove or replace lines/catheters if possible\n• Targeted antibiotics based on culture results\n• Stop unnecessary medications',
        citation: [1, 2],
        next: 'fuo-nosocomial-result',
        summary: 'Nosocomial FUO: lines, surgical sites, C. diff, drug fever, UTI, pneumonia, DVT; culture all sites, consider line removal',
    },
    {
        id: 'fuo-nosocomial-result',
        type: 'result',
        module: 6,
        title: 'Nosocomial FUO Disposition',
        body: '**Management approach:**\n\n• Remove/replace all unnecessary lines and catheters\n• Culture all potential sources\n• Targeted antibiotics based on culture results\n• Discontinue unnecessary medications (drug fever)\n\n**IF SOURCE IDENTIFIED:**\n• Treat accordingly\n• Source control (line removal, abscess drainage)\n\n**IF NO SOURCE FOUND:**\n• Continue surveillance\n• Consider CT imaging for occult abscess\n• ID consultation',
        recommendation: 'Systematic evaluation of all devices and medications. Remove unnecessary hardware. Culture-directed therapy.',
        confidence: 'recommended',
        citation: [1, 2],
    },
    {
        id: 'fuo-neutropenic',
        type: 'info',
        module: 2,
        title: 'Neutropenic FUO',
        body: '**Definition:** ANC <500/µL (or expected to fall <500), fever ≥38.3°C single or ≥38°C sustained, fever ≥3 days despite appropriate antibiotics.\n\n**HIGH-RISK FEATURES:**\n• Profound neutropenia (ANC <100)\n• Prolonged neutropenia (>7 days)\n• Hemodynamic instability\n• Mucositis\n• Pneumonia\n• New abdominal pain\n\n**COMMON PATHOGENS:**\n• Gram-positive: Staph, Strep, Enterococcus\n• Gram-negative: Pseudomonas, E. coli, Klebsiella\n• Fungal: Candida, Aspergillus (prolonged neutropenia)\n\n**EMPIRIC THERAPY:**\n• **Anti-pseudomonal beta-lactam:** [Cefepime](#/drug/cefepime), [Piperacillin-tazobactam](#/drug/piperacillin-tazobactam/sepsis empiric), or [Meropenem](#/drug/meropenem)\n• Add vancomycin if: MRSA risk, severe mucositis, catheter infection, skin/soft tissue infection\n• Add antifungal if: fever persists >4-7 days on antibiotics\n\nSee **Neutropenic Fever Protocol**',
        citation: [1, 2, 11],
        next: 'fuo-neutropenic-result',
        summary: 'Neutropenic FUO: empiric anti-pseudomonal therapy (cefepime/pip-tazo/meropenem); add vanco if MRSA risk; antifungal if fever persists 4-7d',
    },
    {
        id: 'fuo-neutropenic-result',
        type: 'result',
        module: 6,
        title: 'Neutropenic FUO Disposition',
        body: '**ALL neutropenic fever patients require:**\n• Hospital admission\n• Empiric broad-spectrum antibiotics\n• Daily assessment\n\n**ESCALATION:**\n• Add vancomycin if clinical deterioration, MRSA risk, or catheter concern\n• Add antifungal (echinocandin or amphotericin) if fever persists 4-7 days\n• Consider CT chest for pulmonary aspergillosis\n• Consider G-CSF for prolonged neutropenia\n\n**DURATION:**\n• Continue antibiotics until ANC >500 AND afebrile ≥48h\n• If source identified, treat for appropriate duration',
        recommendation: 'Admit all patients. Empiric anti-pseudomonal antibiotics. Escalate if no response. Continue until ANC recovery.',
        confidence: 'definitive',
        citation: [1, 2, 11],
        safetyLevel: 'critical',
    },
    {
        id: 'fuo-hiv',
        type: 'info',
        module: 2,
        title: 'HIV-Associated FUO',
        body: '**Definition:** Confirmed HIV, fever ≥38.3°C, duration ≥4 weeks outpatient or ≥3 days inpatient.\n\n**DIFFERENTIAL DEPENDS ON CD4 COUNT:**\n\n**CD4 >200:**\n• Similar to immunocompetent hosts\n• Bacterial infections, lymphoma\n\n**CD4 <200:**\n• **Pneumocystis jirovecii pneumonia (PCP)**\n• **Mycobacterium avium complex (MAC)** — CD4 <50\n• **Disseminated histoplasmosis/coccidioidomycosis**\n• **CMV disease** — CD4 <50\n• **Tuberculosis** — any CD4\n• **Lymphoma**\n• **Kaposi sarcoma**\n\n**WORKUP:**\n• CD4 count and HIV viral load\n• Blood cultures including mycobacterial\n• Chest X-ray, CT chest if abnormal\n• Sputum for AFB and PCP (induced if needed)\n• Serum cryptococcal antigen\n• Histoplasma/Coccidioides antigens\n• CMV viral load\n• Bone marrow biopsy if disseminated infection suspected',
        citation: [1, 2, 12],
        next: 'fuo-hiv-result',
        summary: 'HIV FUO: CD4 guides differential; <200 = PCP, MAC, fungal; workup includes mycobacterial cultures, fungal antigens, crypto antigen',
    },
    {
        id: 'fuo-hiv-result',
        type: 'result',
        module: 6,
        title: 'HIV-Associated FUO Disposition',
        body: '**Management approach:**\n\n**IF CD4 <200 OR SEVERELY ILL:**\n• Admit for expedited workup\n• ID consultation mandatory\n• Empiric treatment based on clinical presentation\n\n**COMMON EMPIRIC THERAPIES:**\n• PCP suspected: TMP-SMX\n• MAC suspected: Azithromycin + ethambutol\n• TB suspected: RIPE therapy\n• Fungal suspected: Amphotericin B or itraconazole\n\n**ALWAYS:**\n• Optimize or initiate ART (with ID guidance to avoid IRIS)\n• Prophylaxis for opportunistic infections based on CD4\n• Close outpatient follow-up if discharged',
        recommendation: 'ID consultation essential. Empiric therapy guided by CD4 count and clinical presentation. Optimize ART.',
        confidence: 'definitive',
        citation: [1, 2, 12],
    },
    {
        id: 'fuo-dx-found',
        type: 'result',
        module: 6,
        title: 'Diagnosis Established',
        body: '**Diagnosis established from FUO workup.**\n\nTreat based on the specific etiology identified:\n\n• **Infection:** Targeted antimicrobial therapy, source control\n• **Malignancy:** Oncology referral for staging and treatment\n• **Autoimmune/Inflammatory:** Rheumatology referral, immunomodulatory therapy\n• **Drug fever:** Discontinue offending agent\n\n**FOLLOW-UP:**\n• Ensure clinical response to treatment\n• Repeat labs to document improvement\n• Monitor for treatment complications',
        recommendation: 'Targeted treatment based on diagnosis. Appropriate subspecialty referral. Close follow-up to ensure response.',
        confidence: 'definitive',
        citation: [1, 2],
    },
];
export const FUO_NODE_COUNT = FUO_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const FUO_MODULE_LABELS = [
    'Definition & Triage',
    'Travel Stratification',
    'Initial Workup',
    'Clue-Directed Workup',
    'Advanced Diagnostics',
    'Specific Etiologies',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const FUO_CITATIONS = [
    { num: 1, text: 'Haidar G, Singh N. Fever of Unknown Origin. N Engl J Med. 2022;386(5):463-477.' },
    { num: 2, text: 'Wright WF, Mackowiak PA. Fever of Unknown Origin. StatPearls. Updated 2024.' },
    { num: 3, text: 'CDC Yellow Book 2024. Fever in the Returned Traveler. CDC Travelers Health.' },
    { num: 4, text: 'Wilson ME, et al. Fever in Returned Travelers: Results from GeoSentinel. Clin Infect Dis. 2007;44(12):1560-8.' },
    { num: 5, text: 'Freedman DO, et al. Spectrum of Disease and Relation to Place of Exposure among Ill Returned Travelers. N Engl J Med. 2006;354(2):119-30.' },
    { num: 6, text: 'Bleeker-Rovers CP, et al. A Prospective Multicenter Study on Fever of Unknown Origin. Medicine (Baltimore). 2007;86(1):26-38.' },
    { num: 7, text: 'Salvarani C, et al. Polymyalgia Rheumatica and Giant-Cell Arteritis. N Engl J Med. 2002;347(4):261-71.' },
    { num: 8, text: 'Habib G, et al. 2015 ESC Guidelines for the Management of Infective Endocarditis. Eur Heart J. 2015;36(44):3075-128.' },
    { num: 9, text: 'Patel RA, Gallagher JC. Drug Fever. Pharmacotherapy. 2010;30(1):57-69.' },
    { num: 10, text: 'Defined S, et al. FDG PET in Evaluation of Patients With Fever of Unknown Origin. AJR Am J Roentgenol. 2023;221(4):558-568.' },
    { num: 11, text: 'Freifeld AG, et al. Clinical Practice Guideline for the Use of Antimicrobial Agents in Neutropenic Patients with Cancer. Clin Infect Dis. 2011;52(4):e56-93.' },
    { num: 12, text: 'Kaplan JE, et al. Guidelines for Prevention and Treatment of Opportunistic Infections in HIV-Infected Adults. MMWR Recomm Rep. 2009;58(RR-4):1-207.' },
];
