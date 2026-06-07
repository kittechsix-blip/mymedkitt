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
        body: '[Hepatitis Workup Summary](#/info/hep-summary)\n\nClassify the injury **pattern** first, then chase the differential. Compute the **R-factor** = (ALT ÷ ALT-ULN) ÷ (ALP ÷ ALP-ULN): **>5 hepatocellular · 2–5 mixed · <2 cholestatic**.\n\nBefore any leisurely workup, screen for **acute liver failure** — coagulopathy + encephalopathy in a patient without known cirrhosis is time-critical.',
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
        body: '**ALF = INR ≥1.5 + hepatic encephalopathy + illness <26 weeks, no prior cirrhosis.**\n\nCheck mental status, INR/coags, ammonia, glucose, lactate, and trend bilirubin. Any encephalopathy with coagulopathy = treat as ALF until proven otherwise.',
        citation: [3, 4],
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
        body: '**AST:ALT >2:1, both usually <300–400 IU/L** (rarely >500). GGT elevated. History of heavy use.\n\nIf jaundiced/sick, assess severity (Maddrey discriminant function ≥32 or MELD) before considering corticosteroids — see [Management threads](#/node/hep-management).',
        citation: [1, 5],
        next: 'hep-management',
        summary: 'Alcohol: AST:ALT >2:1, transaminases usually <300, GGT high. Severity-stratify before steroids.',
    },
    {
        id: 'hep-viral',
        type: 'info',
        module: 2,
        title: 'Suspect Viral Hepatitis',
        body: 'Order the serologies, then interpret with the **Viral Serology Interpreter**.\n\n• **Hep A** — anti-HAV IgM (acute; fecal-oral, travel/outbreak)\n• **Hep B** — HBsAg, anti-HBc IgM vs total, anti-HBs\n• **Hep C** — HCV Ab + HCV RNA (confirms active)\n• **Hep D** — only co/super-infects with B\n• **Hep E** — anti-HEV IgM (travel, pork; severe in pregnancy)',
        citation: [6, 7],
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
        body: 'ALT/AST in the **thousands**, peaking fast and falling fast (~50%/day) after a hemodynamic insult (shock, arrest, severe hypoxia, RV failure). LDH high, early INR rise.\n\n**Treatment is of the cause** — restore perfusion/oxygenation. Liver typically recovers if the insult is corrected.',
        recommendation: 'Treat the hemodynamic cause; transaminases normalize as perfusion is restored.',
        confidence: 'recommended',
        citation: [1, 2],
        summary: 'Shock liver: transaminases in thousands, rapid rise/fall after hypoperfusion. Fix the cause.',
    },
    {
        id: 'hep-dili',
        type: 'info',
        module: 2,
        title: 'Drug-Induced Liver Injury (DILI)',
        body: 'Review all meds, OTCs, herbals/supplements, and **acetaminophen** dose/timeline. Apply **Hy\'s law** (hepatocellular DILI + bilirubin >2× ULN + no other cause → ~10% mortality risk).\n\n**Stop the offending agent.** For APAP toxicity, give [N-acetylcysteine](#/drug/n-acetylcysteine/acetaminophen-toxicity) and use the dedicated APAP pathway.',
        citation: [1, 8],
        next: 'hep-management',
        summary: 'DILI: review meds/OTC/herbals/APAP. Hy\'s law flags high-risk. Stop agent; NAC for APAP.',
    },
    {
        id: 'hep-hepatocellular-other',
        type: 'info',
        module: 2,
        title: 'Metabolic / Autoimmune / Inherited',
        body: '• **MASLD/MASH** (formerly NAFLD) — most common chronic cause; mild ALT↑, metabolic syndrome; diagnosis of exclusion + imaging.\n• **Autoimmune hepatitis** — young/middle-aged, ↑IgG, ANA/ASMA positive; can flare to ALF → see [Management](#/node/hep-management).\n• **Wilson disease** — age <40, low ceruloplasmin, Coombs-negative hemolysis, low ALP-to-bilirubin ratio.\n• **Hemochromatosis** — high ferritin + transferrin saturation >45%.',
        citation: [1, 2],
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
        body: 'Feed the panel into the **Viral Serology Interpreter** to resolve acute vs chronic vs immune (vaccinated) vs resolved vs window period.\n\n**Hep B quick map:**\n• HBsAg+ / anti-HBc IgM+ → **acute**\n• HBsAg+ / anti-HBc IgG+ (>6 mo) → **chronic**\n• anti-HBs+ only → **vaccinated/immune**\n• anti-HBs+ and anti-HBc+ → **resolved infection**\n• anti-HBc+ alone → window period or occult\n\n**Hep C:** HCV Ab+ with HCV RNA+ = active; Ab+ / RNA– = cleared or treated.',
        citation: [6, 7],
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
        body: 'A high ALP with a **normal GGT** points away from the liver: bone (Paget, fracture, mets, vitamin D deficiency), growth in children/adolescents, or placenta in pregnancy.',
        recommendation: 'Pursue non-hepatic ALP source (bone/placenta/growth); liver workup not indicated.',
        confidence: 'recommended',
        citation: [1],
        summary: 'High ALP + normal GGT = non-hepatic (bone, growth, placenta). No liver workup needed.',
    },
    {
        id: 'hep-extrahepatic',
        type: 'info',
        module: 4,
        title: 'Extrahepatic / Obstructive Cholestasis',
        body: '**Image the ducts: RUQ ultrasound first.** If dilated ducts or stones, escalate to MRCP/ERCP.\n\nCauses: choledocholithiasis, benign/malignant stricture, pancreatic/cholangiocarcinoma. If ascending cholangitis (fever + jaundice + RUQ pain ± shock/AMS), this is an emergency — see the [Gallbladder consult](#/tree/gallbladder) for biliary emergencies.',
        citation: [1, 2],
        next: 'hep-management',
        summary: 'RUQ US first → MRCP/ERCP if dilated. Stones/stricture/malignancy. Cholangitis = emergency.',
    },
    {
        id: 'hep-intrahepatic',
        type: 'info',
        module: 4,
        title: 'Intrahepatic Cholestasis',
        body: '• **PBC** — middle-aged women, anti-mitochondrial antibody (AMA), pruritus.\n• **PSC** — associated with IBD; MRCP shows beading; ↑cholangiocarcinoma risk.\n• **Drug-induced cholestasis** — amoxicillin-clavulanate, anabolic steroids, etc. → [DILI](#/node/hep-dili).\n• **Infiltrative** — sarcoidosis, lymphoma, amyloid, granulomatous disease.',
        citation: [1, 2],
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
        body: 'Both transaminases and ALP elevated. Most often **DILI** or an evolving/resolving viral hepatitis. Manage by the dominant clinical features and **recheck the trend** — the pattern often declares itself over time.',
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
        body: '**Match therapy to the cause:**\n• **Acetaminophen toxicity** → [N-acetylcysteine](#/drug/n-acetylcysteine/acetaminophen-toxicity).\n• **Autoimmune hepatitis** → corticosteroids; GI/hepatology.\n• **Severe alcohol-associated hepatitis** (Maddrey ≥32) → consider corticosteroids after sepsis/GI-bleed excluded.\n• **DILI** → stop the offending agent; supportive care.\n• **Obstruction** → biliary decompression (ERCP).\n\nIf encephalopathy develops, treat with **lactulose** (titrate to 2–3 soft stools/day) ± **rifaximin** and reassess for ALF.',
        citation: [1, 5, 8],
        next: 'hep-disposition',
        summary: 'Cause-specific: NAC (APAP), steroids (AIH/severe alcohol), stop drug (DILI), ERCP (obstruction).',
    },
    {
        id: 'hep-disposition',
        type: 'result',
        module: 6,
        title: 'Disposition',
        body: '**Admit:** ALF features, severe symptomatic hepatitis, intractable vomiting/dehydration, cholangitis/obstruction needing intervention, or uncertain rapidly rising LFTs.\n\n**Discharge with follow-up:** mild stable transaminitis, reliable patient, clear outpatient plan and repeat labs arranged.',
        recommendation: 'Admit ALF/severe/obstructive cases; discharge mild stable transaminitis with timed recheck.',
        confidence: 'recommended',
        citation: [1, 2],
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
        body: 'Apply the **King\'s College Criteria** to decide transplant-center transfer.\n\n**Supportive care:**\n• [N-acetylcysteine](#/drug/n-acetylcysteine/acetaminophen-toxicity) — give for APAP-ALF and reasonable in **non-APAP** early ALF.\n• Watch for **cerebral edema** (grade III/IV HE) — elevate head, treat raised ICP.\n• Correct coagulopathy only for bleeding/procedures (don\'t mask the INR trend).\n• Glucose, electrolytes, renal support; low threshold for ICU.\n\n**Transfer early** to a transplant center — do not wait for criteria to be fully met.',
        citation: [3, 4, 8],
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
        body: '**Acetaminophen ALF** — list for transplant if **arterial pH <7.3** OR all three: INR >6.5 + creatinine >300 µmol/L (>3.4 mg/dL) + grade III/IV encephalopathy.\n\n**Non-acetaminophen ALF** — INR >6.5 (PT >100 s) alone, OR any **3 of**: unfavorable etiology (non-A/non-B, drug, halothane), age <10 or >40, jaundice-to-encephalopathy >7 days, INR >3.5 (PT >50 s), bilirubin >300 µmol/L (>17.5 mg/dL).',
        recommendation: 'Meeting criteria → emergency transplant evaluation. High specificity (~90%), modest sensitivity — transfer early even if not met.',
        confidence: 'recommended',
        citation: [3, 4],
        calculatorLinks: [
            { id: 'hep-kings-college', label: "King's College Criteria" },
        ],
        summary: "APAP: pH<7.3 OR (INR>6.5 + Cr>300 + grade III/IV HE). Non-APAP: INR>6.5 OR any 3 minors.",
        safetyLevel: 'critical',
    },
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
    { num: 1, text: 'Kwo PY, Cohen SM, Lim JK. ACG Clinical Guideline: Evaluation of Abnormal Liver Chemistries. Am J Gastroenterol. 2017;112(1):18-35. PMID 27995906' },
    { num: 2, text: 'Newsome PN, Cramb R, Davison SM, et al. Guidelines on the management of abnormal liver blood tests. Gut. 2018;67(1):6-19. PMID 29122851' },
    { num: 3, text: "O'Grady JG, Alexander GJ, Hayllar KM, Williams R. Early indicators of prognosis in fulminant hepatic failure. Gastroenterology. 1989;97(2):439-445. PMID 2490426" },
    { num: 4, text: 'Lee WM, Stravitz RT, Larson AM. AASLD Position Paper: The Management of Acute Liver Failure: Update 2011. Hepatology. 2012;55(3):965-967. PMID 22213561' },
    { num: 5, text: 'Crabb DW, Im GY, Szabo G, et al. ACG Clinical Guideline: Alcoholic Liver Disease. Am J Gastroenterol. 2018;113(2):175-194. PMID 29336434' },
    { num: 6, text: 'Terrault NA, Lok ASF, McMahon BJ, et al. AASLD 2018 Hepatitis B Guidance. Hepatology. 2018;67(4):1560-1599. PMID 29405329' },
    { num: 7, text: 'AASLD-IDSA. Recommendations for Testing, Managing, and Treating Hepatitis C. hcvguidelines.org (accessed 2026).' },
    { num: 8, text: 'Chalasani N, Bonkovsky HL, Fontana R, et al. ACG Clinical Guideline: The Diagnosis and Management of Idiosyncratic Drug-Induced Liver Injury. Am J Gastroenterol. 2021;116(5):878-898. PMID 33929376' },
];
export const HEPATITIS_NODE_COUNT = HEPATITIS_NODES.length;
