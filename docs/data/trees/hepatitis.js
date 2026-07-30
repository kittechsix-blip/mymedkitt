// MedKitt — Hepatitis / Elevated Liver Enzymes
// Pattern Classification → Hepatocellular → Viral Serology → Cholestatic → Mixed → Management → Acute Liver Failure
// 7 modules. Workup-of-elevated-LFTs spine: classify pattern (R-factor) → branch differential → don't miss ALF.
export const HEPATITIS_NODES = [
    // =====================================================================
    // MODULE 1: TRIAGE & PATTERN CLASSIFICATION
    // =====================================================================
    {
        id: 'hepatitis-start',
        type: 'question',
        module: 1,
        title: 'Elevated Liver Enzymes — Start',
        body: '[Hepatitis Workup Summary](#/info/hep-summary)\n\nClassify the injury **pattern** first, then chase the differential. Compute the **R-factor** = (ALT ÷ ALT-ULN) ÷ (ALP ÷ ALP-ULN): **>5 hepatocellular · 2–5 mixed · <2 cholestatic**.\n\nBefore any leisurely workup, screen for **acute liver failure** — coagulopathy + encephalopathy in a patient without known cirrhosis is time-critical.\n\n*Basis: R-factor pattern classification per the ACG guideline on abnormal liver chemistries [1] and the BSG guidelines on abnormal liver blood tests [2].*',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'hep-r-factor', label: 'R-Factor Calculator' },
        ],
        options: [
            {
                label: 'Red flags for Acute Liver Failure',
                description: 'INR ≥1.5 + any altered mentation, or rapidly rising bilirubin',
                next: 'hep-alf-gate',
                urgency: 'critical',
            },
            {
                label: 'Hepatocellular (R >5)',
                description: 'ALT/AST disproportionately high',
                next: 'hep-hepatocellular',
            },
            {
                label: 'Mixed (R 2–5)',
                description: 'Both transaminases and ALP elevated',
                next: 'hep-mixed',
            },
            {
                label: 'Cholestatic (R <2)',
                description: 'ALP disproportionately high',
                next: 'hep-cholestatic',
            },
        ],
        summary: 'R-factor classifies pattern: >5 hepatocellular, 2–5 mixed, <2 cholestatic. Screen ALF up front.',
    },
    {
        id: 'hep-alf-gate',
        type: 'question',
        module: 1,
        title: 'Acute Liver Failure Screen',
        body: '**ALF = INR ≥1.5 + hepatic encephalopathy + illness <26 weeks, no prior cirrhosis.**\n\nCheck mental status, INR/coags, ammonia, glucose, lactate, and trend bilirubin. Any encephalopathy with coagulopathy = treat as ALF until proven otherwise.\n\n*Basis: ALF case definition per the AASLD position paper on acute liver failure [4] and the current ACG Acute Liver Failure Guidelines [9].*',
        citation: [4, 9],
        options: [
            {
                label: 'Meets ALF criteria',
                description: 'Coagulopathy + encephalopathy',
                next: 'hep-alf-management',
                urgency: 'critical',
            },
            {
                label: 'No ALF — continue pattern workup',
                next: 'hepatitis-start',
            },
        ],
        summary: 'ALF = INR ≥1.5 + encephalopathy + <26 wks without cirrhosis → Module 7.',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 2: HEPATOCELLULAR BRANCH (R >5)
    // =====================================================================
    {
        id: 'hep-hepatocellular',
        type: 'question',
        module: 2,
        title: 'Hepatocellular Injury (R >5)',
        body: 'Use the **AST:ALT ratio** and the magnitude of transaminitis to narrow the cause.\n\n[Massive transaminitis (ALT >1000) differential](#/info/hep-massive-transaminitis)',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'hep-viral-serology', label: 'Viral Serology Interpreter' },
        ],
        options: [
            {
                label: 'AST:ALT >2:1 (± GGT high)',
                description: 'Alcohol-associated pattern',
                next: 'hep-alcohol',
            },
            {
                label: 'ALT-dominant, suspect viral',
                description: 'Risk factors / exposures for A, B, C, D, E',
                next: 'hep-viral',
            },
            {
                label: 'ALT >1000, rapid rise/fall + hypotension',
                description: 'Ischemic / shock liver',
                next: 'hep-ischemic',
            },
            {
                label: 'Drug / toxin (incl. acetaminophen)',
                description: 'Med list, supplements, APAP timeline',
                next: 'hep-dili',
            },
            {
                label: 'Other (MASLD, autoimmune, Wilson, hemochromatosis)',
                description: 'Metabolic, autoimmune, inherited',
                next: 'hep-hepatocellular-other',
            },
        ],
        summary: 'AST:ALT >2:1 → alcohol; ALT >1000 + shock → ischemic; consider viral, DILI, metabolic, inherited.',
    },
    {
        id: 'hep-alcohol',
        type: 'info',
        module: 2,
        title: 'Alcohol-Associated Liver Injury',
        body: '**AST:ALT >2:1, both usually <300–400 IU/L** (rarely >500). GGT elevated. History of heavy use.\n\nIf jaundiced/sick, assess severity (Maddrey discriminant function ≥32 or MELD) before considering corticosteroids — see [Management threads](#/node/hep-management).\n\n*Basis: ACG Clinical Guideline on Alcoholic Liver Disease [5] and AASLD practice guidance on alcohol-associated liver diseases [16].*',
        citation: [5, 16],
        next: 'hep-management',
        summary: 'Alcohol: AST:ALT >2:1, transaminases usually <300, GGT high. Severity-stratify before steroids.',
    },
    {
        id: 'hep-viral',
        type: 'info',
        module: 2,
        title: 'Suspect Viral Hepatitis',
        body: 'Order the serologies, then interpret with the **Viral Serology Interpreter**.\n\n• **Hep A** — anti-HAV IgM (acute; fecal-oral, travel/outbreak)\n• **Hep B** — HBsAg, anti-HBc IgM vs total, anti-HBs\n• **Hep C** — HCV Ab + HCV RNA (confirms active)\n• **Hep D** — only co/super-infects with B\n• **Hep E** — anti-HEV IgM (travel, pork; severe in pregnancy)\n\n*Basis: hepatitis A testing per CDC/ACIP recommendations [13]; hepatitis B per AASLD hepatitis B guidance [6]; hepatitis C per AASLD-IDSA guidance [7]; hepatitis E per the EASL clinical practice guidelines [21].*',
        citation: [6, 7, 13, 21],
        calculatorLinks: [
            { id: 'hep-viral-serology', label: 'Viral Serology Interpreter' },
        ],
        next: 'hep-serology',
        summary: 'Send HAV IgM, HBsAg/anti-HBc/anti-HBs, HCV Ab+RNA, HEV IgM; HDV only with HBV.',
    },
    {
        id: 'hep-ischemic',
        type: 'result',
        module: 2,
        title: 'Ischemic (Shock) Liver',
        body: 'ALT/AST in the **thousands**, peaking fast and falling fast (~50%/day) after a hemodynamic insult (shock, arrest, severe hypoxia, RV failure). LDH high, early INR rise.\n\n**Treatment is of the cause** — restore perfusion/oxygenation. Liver typically recovers if the insult is corrected.\n\n*Basis: enzyme kinetics and clinical course of hypoxic (ischemic) hepatitis [20]; general evaluation framework [2].*',
        recommendation: 'Treat the hemodynamic cause; transaminases normalize as perfusion is restored.',
        confidence: 'recommended',
        citation: [2, 20],
        summary: 'Shock liver: transaminases in thousands, rapid rise/fall after hypoperfusion. Fix the cause.',
    },
    {
        id: 'hep-dili',
        type: 'info',
        module: 2,
        title: 'Drug-Induced Liver Injury (DILI)',
        body: 'Review all meds, OTCs, herbals/supplements, and **acetaminophen** dose/timeline. Apply **Hy\'s law** (hepatocellular DILI + bilirubin >2× ULN + no other cause → ~10% mortality risk).\n\n**Stop the offending agent.** For APAP toxicity, give [N-acetylcysteine](#/drug/n-acetylcysteine/acetaminophen-toxicity) and use the dedicated APAP pathway.\n\n*Basis: Hy\'s law, causality assessment and withdrawal of the implicated agent per the ACG guideline on idiosyncratic drug-induced liver injury [8].*',
        citation: [8],
        next: 'hep-management',
        summary: 'DILI: review meds/OTC/herbals/APAP. Hy\'s law flags high-risk. Stop agent; NAC for APAP.',
    },
    {
        id: 'hep-hepatocellular-other',
        type: 'info',
        module: 2,
        title: 'Metabolic / Autoimmune / Inherited',
        body: '• **MASLD/MASH** (formerly NAFLD) — most common chronic cause; mild ALT↑, metabolic syndrome; diagnosis of exclusion + imaging.\n• **Autoimmune hepatitis** — young/middle-aged, ↑IgG, ANA/ASMA positive; can flare to ALF → see [Management](#/node/hep-management).\n• **Wilson disease** — age <40, low ceruloplasmin, Coombs-negative hemolysis, low ALP-to-bilirubin ratio.\n• **Hemochromatosis** — high ferritin + transferrin saturation >45%.\n\n*Basis: MASLD/MASH nomenclature and evaluation per AASLD [22]; autoimmune hepatitis per AASLD practice guidance [15]; Wilson disease per AASLD practice guidance [19]; the transferrin-saturation threshold per the ACG hereditary hemochromatosis guideline [18].*',
        citation: [15, 18, 19, 22],
        next: 'hep-management',
        summary: 'MASLD (exclusion), AIH (↑IgG/ANA/ASMA), Wilson (<40, low ceruloplasmin), hemochromatosis (↑Fe sat).',
    },
    // =====================================================================
    // MODULE 3: VIRAL SEROLOGY INTERPRETATION
    // =====================================================================
    {
        id: 'hep-serology',
        type: 'info',
        module: 3,
        title: 'Interpreting Viral Serology',
        body: 'Feed the panel into the **Viral Serology Interpreter** to resolve acute vs chronic vs immune (vaccinated) vs resolved vs window period.\n\n**Hep B quick map:**\n• HBsAg+ / anti-HBc IgM+ → **acute**\n• HBsAg+ / anti-HBc IgG+ (>6 mo) → **chronic**\n• anti-HBs+ only → **vaccinated/immune**\n• anti-HBs+ and anti-HBc+ → **resolved infection**\n• anti-HBc+ alone → window period or occult\n\n**Hep C:** HCV Ab+ with HCV RNA+ = active; Ab+ / RNA– = cleared or treated.\n\n*Basis: HBV serologic interpretation table per CDC/ACIP [14] and AASLD hepatitis B guidance [6]; HCV antibody-plus-RNA testing algorithm per AASLD-IDSA guidance [7].*',
        citation: [6, 7, 14],
        calculatorLinks: [
            { id: 'hep-viral-serology', label: 'Viral Serology Interpreter' },
        ],
        next: 'hep-management',
        summary: 'HBsAg + anti-HBc IgM = acute B; anti-HBs only = vaccinated; HCV Ab+/RNA+ = active C.',
    },
    // =====================================================================
    // MODULE 4: CHOLESTATIC BRANCH (R <2)
    // =====================================================================
    {
        id: 'hep-cholestatic',
        type: 'question',
        module: 4,
        title: 'Cholestatic Injury (R <2)',
        body: 'First confirm the ALP is **hepatobiliary**, not bone/placental: check **GGT** (or ALP isoenzymes). GGT elevated → hepatobiliary; GGT normal → extrahepatic ALP source (bone, growth, pregnancy) — not liver disease.',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'hep-ggt-source', label: 'GGT Source Interpreter' },
        ],
        options: [
            {
                label: 'GGT normal — not liver',
                description: 'ALP from bone/placenta/growth; pursue non-hepatic cause',
                next: 'hep-ggt-nonhepatic',
            },
            {
                label: 'GGT high → extrahepatic / obstructive',
                description: 'Stones, stricture, malignancy — image the ducts',
                next: 'hep-extrahepatic',
            },
            {
                label: 'GGT high → intrahepatic cholestasis',
                description: 'PBC, PSC, drug, infiltrative',
                next: 'hep-intrahepatic',
            },
        ],
        summary: 'Confirm hepatic ALP with GGT first. Then split extrahepatic (obstruction) vs intrahepatic.',
    },
    {
        id: 'hep-ggt-nonhepatic',
        type: 'result',
        module: 4,
        title: 'Isolated ALP, Normal GGT',
        body: 'A high ALP with a **normal GGT** points away from the liver: bone (Paget, fracture, mets, vitamin D deficiency), growth in children/adolescents, or placenta in pregnancy.\n\n*Basis: use of GGT to confirm a hepatobiliary source for a raised ALP per ACG [1] and BSG [2].*',
        recommendation: 'Pursue non-hepatic ALP source (bone/placenta/growth); liver workup not indicated.',
        confidence: 'recommended',
        citation: [1, 2],
        summary: 'High ALP + normal GGT = non-hepatic (bone, growth, placenta). No liver workup needed.',
    },
    {
        id: 'hep-extrahepatic',
        type: 'info',
        module: 4,
        title: 'Extrahepatic / Obstructive Cholestasis',
        body: '**Image the ducts: RUQ ultrasound first.** If dilated ducts or stones, escalate to MRCP/ERCP.\n\nCauses: choledocholithiasis, benign/malignant stricture, pancreatic/cholangiocarcinoma. If ascending cholangitis (fever + jaundice + RUQ pain ± shock/AMS), this is an emergency — see the [Gallbladder consult](#/tree/gallbladder) for biliary emergencies.\n\n*Basis: ultrasound-first imaging of a cholestatic pattern with escalation to MRCP/ERCP per ACG [1] and BSG [2].*',
        citation: [1, 2],
        next: 'hep-management',
        summary: 'RUQ US first → MRCP/ERCP if dilated. Stones/stricture/malignancy. Cholangitis = emergency.',
    },
    {
        id: 'hep-intrahepatic',
        type: 'info',
        module: 4,
        title: 'Intrahepatic Cholestasis',
        body: '• **PBC** — middle-aged women, anti-mitochondrial antibody (AMA), pruritus.\n• **PSC** — associated with IBD; MRCP shows beading; ↑cholangiocarcinoma risk.\n• **Drug-induced cholestasis** — amoxicillin-clavulanate, anabolic steroids, etc. → [DILI](#/node/hep-dili).\n• **Infiltrative** — sarcoidosis, lymphoma, amyloid, granulomatous disease.\n\n*Basis: PBC diagnosis and AMA testing per AASLD practice guidance [17]; drug-induced cholestasis and infiltrative causes per the ACG abnormal liver chemistries guideline [1].*',
        citation: [1, 17],
        next: 'hep-management',
        summary: 'PBC (AMA), PSC (IBD, MRCP beading), drug cholestasis, infiltrative (sarcoid/lymphoma/amyloid).',
    },
    // =====================================================================
    // MODULE 5: MIXED PATTERN (R 2–5)
    // =====================================================================
    {
        id: 'hep-mixed',
        type: 'result',
        module: 5,
        title: 'Mixed Pattern (R 2–5)',
        body: 'Both transaminases and ALP elevated. Most often **DILI** or an evolving/resolving viral hepatitis. Manage by the dominant clinical features and **recheck the trend** — the pattern often declares itself over time.\n\n*Basis: R-value definition of a mixed pattern per ACG [1]; mixed-pattern DILI per the ACG idiosyncratic DILI guideline [8].*',
        recommendation: 'Work up by dominant features (most often DILI or evolving viral); recheck LFT trend.',
        confidence: 'consider',
        citation: [1, 8],
        summary: 'Mixed (R 2–5): usually DILI or evolving viral. Trend the labs; manage by dominant feature.',
    },
    // =====================================================================
    // MODULE 6: TARGETED MANAGEMENT THREADS
    // =====================================================================
    {
        id: 'hep-management',
        type: 'info',
        module: 6,
        title: 'Targeted Management',
        body: '**Match therapy to the cause:**\n• **Acetaminophen toxicity** → [N-acetylcysteine](#/drug/n-acetylcysteine/acetaminophen-toxicity).\n• **Autoimmune hepatitis** → corticosteroids; GI/hepatology.\n• **Severe alcohol-associated hepatitis** (Maddrey ≥32) → consider corticosteroids after sepsis/GI-bleed excluded.\n• **DILI** → stop the offending agent; supportive care.\n• **Obstruction** → biliary decompression (ERCP).\n\nIf encephalopathy develops, treat with **lactulose** (titrate to 2–3 soft stools/day) ± **rifaximin** and reassess for ALF.\n\n*Basis: lactulose titration endpoint and rifaximin add-on per the AASLD/EASL hepatic encephalopathy practice guideline [12]; alcohol-associated hepatitis severity scoring and corticosteroid use per ACG [5] and AASLD [16]; autoimmune hepatitis corticosteroid therapy per AASLD practice guidance [15]; withdrawal of the implicated agent in DILI per ACG [8].*',
        citation: [5, 8, 12, 15, 16],
        next: 'hep-disposition',
        summary: 'Cause-specific: NAC (APAP), steroids (AIH/severe alcohol), stop drug (DILI), ERCP (obstruction).',
    },
    {
        id: 'hep-disposition',
        type: 'result',
        module: 6,
        title: 'Disposition',
        body: '**Admit:** ALF features, severe symptomatic hepatitis, intractable vomiting/dehydration, cholangitis/obstruction needing intervention, or uncertain rapidly rising LFTs.\n\n**Discharge with follow-up:** mild stable transaminitis, reliable patient, clear outpatient plan and repeat labs arranged.\n\n*Basis: admission of patients meeting acute liver failure criteria per the ACG Acute Liver Failure Guidelines [9]; outpatient follow-up and repeat testing of mild stable abnormalities per BSG [2].*',
        recommendation: 'Admit ALF/severe/obstructive cases; discharge mild stable transaminitis with timed recheck.',
        confidence: 'recommended',
        citation: [2, 9],
        summary: 'Admit ALF/severe/obstruction; discharge mild stable cases with arranged recheck.',
    },
    // =====================================================================
    // MODULE 7: ACUTE LIVER FAILURE — RED FLAGS & TRANSFER
    // =====================================================================
    {
        id: 'hep-alf-management',
        type: 'info',
        module: 7,
        title: 'Acute Liver Failure — Management & Transfer',
        body: 'Apply the **King\'s College Criteria** to decide transplant-center transfer.\n\n**Supportive care:**\n• [N-acetylcysteine](#/drug/n-acetylcysteine/acetaminophen-toxicity) — give for APAP-ALF and reasonable in **non-APAP** early ALF.\n• Watch for **cerebral edema** (grade III/IV HE) — elevate head, treat raised ICP.\n• Correct coagulopathy only for bleeding/procedures (don\'t mask the INR trend).\n• Glucose, electrolytes, renal support; low threshold for ICU.\n\n**Transfer early** to a transplant center — do not wait for criteria to be fully met.\n\n*Basis: N-acetylcysteine in non-acetaminophen ALF rests on the Acute Liver Failure Study Group randomized controlled trial (n=173), in which the transplant-free survival benefit was confined to coma grades I-II [10]. Cerebral-edema surveillance, coagulopathy management and early transplant-center transfer per the ACG Acute Liver Failure Guidelines [9] and the AASLD position paper [4]. Transplant-referral criteria: King\'s College criteria, O\'Grady 1989 [3].*',
        citation: [3, 4, 9, 10],
        calculatorLinks: [
            { id: 'hep-kings-college', label: "King's College Criteria" },
        ],
        next: 'hep-alf-kings',
        summary: 'ALF: NAC (APAP + early non-APAP), watch cerebral edema, ICU, transfer early to transplant center.',
        safetyLevel: 'critical',
    },
    {
        id: 'hep-alf-kings',
        type: 'result',
        module: 7,
        title: "King's College Criteria",
        body: '**Acetaminophen ALF** — list for transplant if **arterial pH <7.3** OR all three: INR >6.5 + creatinine >300 µmol/L (>3.4 mg/dL) + grade III/IV encephalopathy.\n\n**Non-acetaminophen ALF** — INR >6.5 (PT >100 s) alone, OR any **3 of**: unfavorable etiology (non-A/non-B, drug, halothane), age <10 or >40, jaundice-to-encephalopathy >7 days, INR >3.5 (PT >50 s), bilirubin >300 µmol/L (>17.5 mg/dL).\n\n*Basis: King\'s College criteria as originally derived by O\'Grady 1989 in 588 patients with acute liver failure [3], restated in the ACG Acute Liver Failure Guidelines [9]. Pooled diagnostic performance in acetaminophen-associated ALF: sensitivity 58% (95% CI 51-65%), specificity 89% (95% CI 85-93%) [11].*',
        recommendation: 'Meeting criteria → emergency transplant evaluation. High specificity (~90%), modest sensitivity — transfer early even if not met.',
        confidence: 'recommended',
        citation: [3, 9, 11],
        calculatorLinks: [
            { id: 'hep-kings-college', label: "King's College Criteria" },
        ],
        summary: "APAP: pH<7.3 OR (INR>6.5 + Cr>300 + grade III/IV HE). Non-APAP: INR>6.5 OR any 3 minors.",
        safetyLevel: 'critical',
    },
];
export const HEPATITIS_CRITICAL_ACTIONS = [
    { text: 'Screen for acute liver failure first — INR ≥1.5 + any encephalopathy without known cirrhosis is time-critical.', nodeId: 'hep-alf-gate' },
    { text: 'Drug/toxin injury: stop the offending agent.', nodeId: 'hep-dili' },
    { text: 'For APAP toxicity, give N-acetylcysteine and use the dedicated APAP pathway.', nodeId: 'hep-dili' },
    { text: 'In ALF, give N-acetylcysteine for APAP-ALF; it is reasonable in non-APAP early ALF.', nodeId: 'hep-alf-management' },
    { text: 'Watch for cerebral edema (grade III/IV HE) — elevate head, treat raised ICP.', nodeId: 'hep-alf-management' },
    { text: 'Correct coagulopathy only for bleeding/procedures — do not mask the INR trend.', nodeId: 'hep-alf-management' },
    { text: 'Transfer early to a transplant center — do not wait for criteria to be fully met.', nodeId: 'hep-alf-management' },
    { text: 'Meeting King’s College Criteria → emergency transplant evaluation.', nodeId: 'hep-alf-kings' },
    { text: 'Cholestatic pattern: image the ducts — RUQ ultrasound first.', nodeId: 'hep-extrahepatic' },
    { text: 'Ascending cholangitis (fever + jaundice + RUQ pain ± shock/AMS) is an emergency.', nodeId: 'hep-extrahepatic' },
    { text: 'Severe alcohol-associated hepatitis (Maddrey ≥32) → consider corticosteroids after sepsis/GI-bleed excluded.', nodeId: 'hep-management' },
    { text: 'Admit ALF features, severe symptomatic hepatitis, and cholangitis/obstruction needing intervention.', nodeId: 'hep-disposition' },
];
export const HEPATITIS_MODULE_LABELS = [
    'Pattern Classification',
    'Hepatocellular',
    'Viral Serology',
    'Cholestatic',
    'Mixed',
    'Management',
    'Acute Liver Failure',
];
export const HEPATITIS_CITATIONS = [
    { num: 1, text: 'Kwo PY, Cohen SM, Lim JK. ACG Clinical Guideline: Evaluation of Abnormal Liver Chemistries. Am J Gastroenterol. 2017;112(1):18-35. PMID 27995906. doi:10.1038/ajg.2016.517' },
    { num: 2, text: 'Newsome PN, Cramb R, Davison SM, et al. Guidelines on the management of abnormal liver blood tests. Gut. 2018;67(1):6-19. PMID 29122851. doi:10.1136/gutjnl-2017-314924' },
    { num: 3, text: "O'Grady JG, Alexander GJ, Hayllar KM, Williams R. Early indicators of prognosis in fulminant hepatic failure. Gastroenterology. 1989;97(2):439-445. PMID 2490426. doi:10.1016/0016-5085(89)90081-4 — original derivation of the King's College criteria (n=588)." },
    { num: 4, text: 'Lee WM, Stravitz RT, Larson AM. Introduction to the revised American Association for the Study of Liver Diseases Position Paper on acute liver failure 2011. Hepatology. 2012;55(3):965-967. PMID 22213561. doi:10.1002/hep.25551 — introduction to the 2011 AASLD position paper; for current US practice see ref 9.' },
    { num: 5, text: 'Singal AK, Bataller R, Ahn J, Kamath PS, Shah VH. ACG Clinical Guideline: Alcoholic Liver Disease. Am J Gastroenterol. 2018;113(2):175-194. PMID 29336434. doi:10.1038/ajg.2017.469' },
    { num: 6, text: 'Terrault NA, Lok ASF, McMahon BJ, et al. Update on prevention, diagnosis, and treatment of chronic hepatitis B: AASLD 2018 hepatitis B guidance. Hepatology. 2018;67(4):1560-1599. PMID 29405329. doi:10.1002/hep.29800' },
    { num: 7, text: 'Ghany MG, Morgan TR; AASLD-IDSA Hepatitis C Guidance Panel. Hepatitis C Guidance 2019 Update: AASLD-IDSA Recommendations for Testing, Managing, and Treating Hepatitis C Virus Infection. Hepatology. 2020;71(2):686-721. PMID 31816111. doi:10.1002/hep.31060. Continuously updated living version: https://www.hcvguidelines.org/' },
    { num: 8, text: 'Chalasani NP, Maddur H, Russo MW, Wong RJ, Reddy KR; Practice Parameters Committee of the American College of Gastroenterology. ACG Clinical Guideline: Diagnosis and Management of Idiosyncratic Drug-Induced Liver Injury. Am J Gastroenterol. 2021;116(5):878-898. PMID 33929376. doi:10.14309/ajg.0000000000001259' },
    { num: 9, text: 'Shingina A, Mukhtar N, Wakim-Fleming J, et al. Acute Liver Failure Guidelines. Am J Gastroenterol. 2023;118(7):1128-1153. PMID 37377263. doi:10.14309/ajg.0000000000002340 — current US guideline for acute liver failure.' },
    { num: 10, text: 'Lee WM, Hynan LS, Rossaro L, et al.; Acute Liver Failure Study Group. Intravenous N-acetylcysteine improves transplant-free survival in early stage non-acetaminophen acute liver failure. Gastroenterology. 2009;137(3):856-864. PMID 19524577. doi:10.1053/j.gastro.2009.06.006 — randomized trial (n=173); benefit confined to coma grades I-II. Erratum: Gastroenterology. 2013;145(3):695 (dosage error in article text).' },
    { num: 11, text: "McPhail MJ, Farne H, Senvar N, Wendon JA, Bernal W. Ability of King's College Criteria and Model for End-Stage Liver Disease Scores to Predict Mortality of Patients With Acute Liver Failure: A Meta-analysis. Clin Gastroenterol Hepatol. 2016;14(4):516-525.e5. PMID 26499930. doi:10.1016/j.cgh.2015.10.007" },
    { num: 12, text: 'Vilstrup H, Amodio P, Bajaj J, et al. Hepatic encephalopathy in chronic liver disease: 2014 Practice Guideline by the American Association for the Study of Liver Diseases and the European Association for the Study of the Liver. Hepatology. 2014;60(2):715-735. PMID 25042402. doi:10.1002/hep.27210' },
    { num: 13, text: 'Nelson NP, Weng MK, Hofmeister MG, et al. Prevention of Hepatitis A Virus Infection in the United States: Recommendations of the Advisory Committee on Immunization Practices, 2020. MMWR Recomm Rep. 2020;69(5):1-38. PMID 32614811. doi:10.15585/mmwr.rr6905a1' },
    { num: 14, text: 'Schillie S, Vellozzi C, Reingold A, et al. Prevention of Hepatitis B Virus Infection in the United States: Recommendations of the Advisory Committee on Immunization Practices. MMWR Recomm Rep. 2018;67(1):1-31. PMID 29939980. doi:10.15585/mmwr.rr6701a1 — source of the HBV serologic interpretation table.' },
    { num: 15, text: 'Mack CL, Adams D, Assis DN, et al. Diagnosis and Management of Autoimmune Hepatitis in Adults and Children: 2019 Practice Guidance and Guidelines From the American Association for the Study of Liver Diseases. Hepatology. 2020;72(2):671-722. PMID 31863477. doi:10.1002/hep.31065' },
    { num: 16, text: 'Crabb DW, Im GY, Szabo G, Mellinger JL, Lucey MR. Diagnosis and Treatment of Alcohol-Associated Liver Diseases: 2019 Practice Guidance From the American Association for the Study of Liver Diseases. Hepatology. 2020;71(1):306-333. PMID 31314133. doi:10.1002/hep.30866' },
    { num: 17, text: 'Lindor KD, Bowlus CL, Boyer J, Levy C, Mayo M. Primary Biliary Cholangitis: 2018 Practice Guidance from the American Association for the Study of Liver Diseases. Hepatology. 2019;69(1):394-419. PMID 30070375. doi:10.1002/hep.30145' },
    { num: 18, text: 'Kowdley KV, Brown KE, Ahn J, Sundaram V. ACG Clinical Guideline: Hereditary Hemochromatosis. Am J Gastroenterol. 2019;114(8):1202-1218. PMID 31335359. doi:10.14309/ajg.0000000000000315' },
    { num: 19, text: 'Schilsky ML, Roberts EA, Bronstein JM, et al. A multidisciplinary approach to the diagnosis and management of Wilson disease: 2022 Practice Guidance on Wilson disease from the American Association for the Study of Liver Diseases. Hepatology. 2025;82(3):E41-E90. PMID 36151586. doi:10.1002/hep.32801' },
    { num: 20, text: 'Waseem N, Chen PH. Hypoxic Hepatitis: A Review and Clinical Update. J Clin Transl Hepatol. 2016;4(3):263-268. PMID 27777895. doi:10.14218/JCTH.2016.00022' },
    { num: 21, text: 'European Association for the Study of the Liver. EASL Clinical Practice Guidelines on hepatitis E virus infection. J Hepatol. 2018;68(6):1256-1271. PMID 29609832. doi:10.1016/j.jhep.2018.03.005' },
    { num: 22, text: 'Kanwal F, Neuschwander-Tetri BA, Loomba R, Rinella ME. Metabolic dysfunction-associated steatotic liver disease: Update and impact of new nomenclature on the American Association for the Study of Liver Diseases practice guidance on nonalcoholic fatty liver disease. Hepatology. 2024;79(5):1212-1219. PMID 38445559. doi:10.1097/HEP.0000000000000670' },
];
export const HEPATITIS_NODE_COUNT = HEPATITIS_NODES.length;
