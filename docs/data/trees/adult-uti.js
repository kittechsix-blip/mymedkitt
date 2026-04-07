// MedKitt — Adult UTI Diagnostic Decision Tree
// Comprehensive ED management: uncomplicated vs complicated UTI,
// UA interpretation, antibiotic selection, special populations, disposition
// 6 modules: Initial Assessment → Diagnosis & UA Interpretation → UTI Classification → Antibiotic Selection → Special Populations → Disposition
// Sources: IDSA 2024 Guidelines, UpToDate, EB Medicine
export const ADULT_UTI_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'uti-start',
        type: 'info',
        module: 1,
        title: 'Adult UTI Assessment',
        body: '**Urinary Tract Infection** = infection involving bladder (cystitis), kidneys (pyelonephritis), or both. [1][2]\n\n**UTI is one of the most common ED diagnoses, but also one of the most over-diagnosed and over-treated.**\n\n**Key Principles:**\n• Distinguish **symptomatic UTI** from **asymptomatic bacteriuria (ASB)**\n• Classify as **uncomplicated** vs **complicated**\n• Use appropriate diagnostic criteria before treating\n• Choose antibiotics wisely (resistance is increasing)\n\n**This consult covers:**\n• History and physical findings\n• UA interpretation\n• Classification (uncomplicated/complicated/pyelo)\n• Antibiotic selection\n• Special populations (elderly, pregnant, catheterized)\n• Disposition criteria',
        citation: [1, 2],
        next: 'uti-history',
    },
    {
        id: 'uti-history',
        type: 'info',
        module: 1,
        title: 'History & Physical',
        body: '**Classic UTI Symptoms:** [3][4]\n\n**Lower UTI (Cystitis):**\n• Dysuria (painful urination)\n• Frequency (voiding small amounts often)\n• Urgency (sudden compelling need to void)\n• Suprapubic pain/pressure\n• Hematuria\n\n**Upper UTI (Pyelonephritis):**\n• Fever (≥38°C / 100.4°F)\n• Flank pain / CVA tenderness\n• Nausea/vomiting\n• ± Lower UTI symptoms\n\n**Probability of UTI by Symptoms (Women):**\n| Symptom Combination | Probability |\n|---------------------|-------------|\n| Dysuria + frequency, no vaginal discharge | 90% |\n| Any single symptom | 50% |\n| Vaginal discharge present | Much lower |\n\n**Physical Exam:**\n• Vital signs (fever, tachycardia = concern for sepsis)\n• Abdominal exam (suprapubic tenderness)\n• CVA tenderness (pyelonephritis)\n• Consider pelvic exam if vaginal symptoms present\n• Scrotal/prostate exam in men if indicated',
        citation: [3, 4],
        next: 'uti-initial-decision',
    },
    {
        id: 'uti-initial-decision',
        type: 'question',
        module: 1,
        title: 'Next Step',
        body: 'What is the clinical scenario?',
        options: [
            { label: 'Classic Symptoms - Order UA', description: 'Dysuria, frequency, urgency', next: 'uti-ua-interpretation' },
            { label: 'Classic Cystitis - Treat Empirically', description: 'Young woman, no complicating factors', next: 'uti-uncomplicated' },
            { label: 'Pyelonephritis Suspected', description: 'Fever, flank pain, CVA tenderness', next: 'uti-pyelonephritis' },
        ],
    },
    // =====================================================================
    // MODULE 2: DIAGNOSIS & UA INTERPRETATION
    // =====================================================================
    {
        id: 'uti-ua-interpretation',
        type: 'info',
        module: 2,
        title: 'UA Interpretation',
        body: '**Urinalysis Components:** [3][5]\n\n**PYURIA (WBCs in urine):**\n• Defined as ≥10 WBC/hpf on microscopy\n• Dipstick: Leukocyte esterase (LE) positive\n• **Most sensitive indicator of UTI**\n• **Absence of pyuria strongly argues AGAINST UTI**\n\n**BACTERIURIA:**\n• Nitrites positive = Gram-negative bacteria present\n• High specificity but low sensitivity (only ~25%)\n• Many bacteria don\'t reduce nitrates (Staph, Enterococcus, Pseudomonas)\n\n**HEMATURIA:**\n• Common in UTI but non-specific\n• Also: kidney stones, malignancy, trauma\n\n**Test Performance:**\n| Test | Sensitivity | Specificity |\n|------|-------------|-------------|\n| LE + | 75-90% | 95% |\n| Nitrite + | 25-40% | 95-98% |\n| Either + | 75-90% | 70% |\n\n**Key Interpretation:**\n• **LE negative AND Nitrite negative** → UTI unlikely (NPV >95%)\n• **LE positive OR Nitrite positive** → UTI possible, correlate clinically\n• **Pyuria + symptoms** = treat for UTI\n• **Bacteriuria without symptoms** = ASB (usually don\'t treat)',
        citation: [3, 5],
        next: 'uti-ua-result',
    },
    {
        id: 'uti-ua-result',
        type: 'question',
        module: 2,
        title: 'UA Results',
        body: 'What do the UA results show?',
        options: [
            { label: 'Pyuria Present (LE+ or WBC+)', description: 'Supports UTI diagnosis', next: 'uti-pyuria-present' },
            { label: 'No Pyuria (LE- and WBC-)', description: 'UTI unlikely', next: 'uti-no-pyuria' },
            { label: 'Need Culture', description: 'Complicated case', next: 'uti-culture' },
        ],
    },
    {
        id: 'uti-pyuria-present',
        type: 'info',
        module: 2,
        title: 'Pyuria Present',
        body: '**Pyuria + Symptoms = UTI** [1][2]\n\nPresence of pyuria supports the diagnosis of UTI when symptoms are present.\n\n**Next Step: Classify the UTI**\n\n**Questions to determine classification:**\n1. Is the patient female AND non-pregnant?\n2. Is there fever or flank pain (pyelonephritis)?\n3. Are there complicating factors?\n\n**Complicating Factors:**\n• Male sex\n• Pregnancy\n• Structural abnormality (stones, stent, stricture)\n• Indwelling catheter\n• Recent urologic procedure\n• Immunocompromised\n• Diabetes mellitus\n• Renal failure\n• Recent antibiotic use\n• Hospital-acquired infection',
        citation: [1, 2],
        next: 'uti-classification-decision',
    },
    {
        id: 'uti-classification-decision',
        type: 'question',
        module: 2,
        title: 'UTI Classification',
        body: 'Based on the clinical picture, what type of UTI?',
        options: [
            { label: 'Uncomplicated Cystitis', description: 'Non-pregnant woman, no complicating factors, no fever', next: 'uti-uncomplicated' },
            { label: 'Complicated UTI', description: 'Male, catheter, structural abnormality, DM, immunocompromised', next: 'uti-complicated' },
            { label: 'Pyelonephritis', description: 'Fever, flank pain, CVA tenderness', next: 'uti-pyelonephritis' },
        ],
    },
    {
        id: 'uti-no-pyuria',
        type: 'info',
        module: 2,
        title: 'No Pyuria - Reconsider Diagnosis',
        body: '**Absence of pyuria makes UTI unlikely:** [3][5]\n\n**NPV of negative LE and negative nitrite: >95%**\n\n**Alternative Diagnoses to Consider:**\n\n**Gynecologic:**\n• Vulvovaginitis (candida, BV, trich)\n• Cervicitis (gonorrhea, chlamydia)\n• Atrophic vaginitis (postmenopausal)\n\n**Urologic:**\n• Urethritis (STI)\n• Interstitial cystitis\n• Kidney stones\n• Bladder cancer (if hematuria)\n\n**Other:**\n• Prostatitis (men)\n• Epididymitis (men)\n• Reactive arthritis (Reiter\'s)\n\n**Before Concluding "Not UTI":**\n• Was specimen properly collected? (clean catch)\n• Very dilute urine can have false negative LE\n• Consider repeat UA if high clinical suspicion\n• In elderly, symptoms may be atypical\n\n**If symptoms classic for UTI but UA negative:**\nConsider empiric treatment in selected cases (young woman, classic symptoms)',
        citation: [3, 5],
        next: 'uti-no-pyuria-decision',
    },
    {
        id: 'uti-no-pyuria-decision',
        type: 'question',
        module: 2,
        title: 'No Pyuria - Next Step',
        body: 'How do you want to proceed?',
        options: [
            { label: 'Consider Alternative Diagnosis', description: 'Pursue other workup', next: 'uti-differential' },
            { label: 'Treat Empirically Anyway', description: 'Classic symptoms despite negative UA', next: 'uti-uncomplicated' },
        ],
    },
    {
        id: 'uti-differential',
        type: 'info',
        module: 2,
        title: 'Differential Diagnosis',
        body: '**Differential for UTI-like Symptoms:**\n\n**If Vaginal Discharge Present:**\n• Vaginitis (candida, BV, trichomoniasis)\n• Cervicitis (GC/CT)\n• Consider pelvic exam and wet mount\n\n**If STI Risk Factors:**\n• Urethritis (gonorrhea, chlamydia)\n• Test NAAT for GC/CT\n• Treat empirically if high risk\n\n**If Flank Pain:**\n• Kidney stone\n• Pyelonephritis\n• Musculoskeletal pain\n• Consider CT abdomen/pelvis\n\n**If Hematuria Without Pyuria:**\n• Kidney stone\n• Malignancy (especially >40 years)\n• Glomerulonephritis\n• Trauma\n\n**If Elderly with Non-Specific Symptoms:**\n• Likely NOT UTI if:\n  - No fever\n  - No suprapubic pain\n  - No dysuria/frequency\n• Consider other sources of infection\n• Confusion alone ≠ UTI\n\n**Workup:**\n• Pelvic exam if vaginal symptoms\n• GC/CT NAAT if STI risk\n• CT if stone suspected\n• Consider urology referral for persistent hematuria',
        citation: [2, 4],
        next: 'uti-start',
    },
    {
        id: 'uti-culture',
        type: 'info',
        module: 2,
        title: 'Urine Culture',
        body: '**When to Send Urine Culture:** [1][6]\n\n**SEND CULTURE FOR:**\n• Complicated UTI\n• Pyelonephritis\n• Men (all UTIs)\n• Pregnancy\n• Catheter-associated UTI\n• Recent UTI (<30 days)\n• Recent antibiotic use\n• Treatment failure\n\n**DO NOT NEED CULTURE FOR:**\n• Uncomplicated cystitis in young women\n• First UTI with classic symptoms\n• Reliable follow-up available\n\n**Culture Thresholds:**\n| Condition | Threshold |\n|-----------|----------|\n| Cystitis (women) | ≥10³ CFU/mL |\n| Pyelonephritis | ≥10⁴ CFU/mL |\n| Catheterized | ≥10⁵ CFU/mL |\n| Men | ≥10³ CFU/mL |\n\n**Common Pathogens:**\n• **E. coli**: 75-95% of uncomplicated UTI\n• **Staph saprophyticus**: 5-10% (young women)\n• **Klebsiella, Proteus**: 5-10%\n• **Enterococcus, Pseudomonas**: complicated UTI\n\n**Resistance Patterns:**\n• Know your local antibiogram\n• TMP-SMX resistance varies widely (10-30%)\n• FQ resistance increasing\n• ESBL-producing organisms more common',
        citation: [1, 6],
        next: 'uti-classification-decision',
    },
    // =====================================================================
    // MODULE 3: UTI CLASSIFICATION
    // =====================================================================
    {
        id: 'uti-uncomplicated',
        type: 'info',
        module: 3,
        title: 'Uncomplicated Cystitis',
        body: '**Uncomplicated cystitis** = lower UTI in non-pregnant premenopausal woman with no complicating factors. [1][2]\n\n**Criteria (ALL must be met):**\n• Female\n• Non-pregnant\n• No structural/functional urinary tract abnormalities\n• No recent instrumentation\n• Not immunocompromised\n• Lower urinary tract symptoms only (no fever/flank pain)\n\n**First-Line Treatment Options:**\n\n**1. Nitrofurantoin** (PREFERRED)\n• 100mg BID x 5 days\n• Excellent E. coli coverage\n• Low resistance rates\n• Avoid if CrCl <30\n\n**2. TMP-SMX**\n• 1 DS tab BID x 3 days\n• Use only if local resistance <20%\n• Avoid if recent TMP-SMX use\n\n**3. Fosfomycin**\n• 3g single dose\n• Slightly lower efficacy\n• Good for compliance concerns\n\n**AVOID for uncomplicated cystitis:**\n• Fluoroquinolones (reserve for complicated/pyelo)\n• Beta-lactams (lower cure rates)',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'crcl-cockcroft-gault', label: 'CrCl Calculator' },
        ],
        next: 'uti-uncomplicated-treatment',
    },
    {
        id: 'uti-uncomplicated-treatment',
        type: 'question',
        module: 3,
        title: 'Treatment Selection',
        body: 'Which antibiotic do you want to prescribe?',
        options: [
            { label: 'Nitrofurantoin', description: 'First-line, low resistance', next: 'uti-nitrofurantoin' },
            { label: 'TMP-SMX', description: 'If local resistance <20%', next: 'uti-tmpsmx' },
            { label: 'Fosfomycin', description: 'Single dose option', next: 'uti-disposition-uncomplicated' },
        ],
    },
    {
        id: 'uti-complicated',
        type: 'info',
        module: 3,
        title: 'Complicated UTI',
        body: '**Complicated UTI** = UTI with factors increasing treatment failure or recurrence risk. [6][7]\n\n**ALWAYS Complicated:**\n• Male sex (all UTI in men are complicated)\n• Pregnancy\n• Structural abnormality\n• Indwelling catheter\n• Recent urologic procedure\n• Renal transplant\n• Immunocompromised\n\n**Other Complicating Factors:**\n• Diabetes mellitus\n• Recent antibiotics\n• Hospital-acquired\n• Resistant organism history\n• Renal insufficiency\n\n**Workup for Complicated UTI:**\n• Always send urine culture\n• Consider imaging if:\n  - No improvement in 48-72h\n  - Suspected abscess\n  - Suspected obstruction\n• Labs: BMP (renal function)\n\n**Treatment (7-14 days):**\n• **Fluoroquinolone** (ciprofloxacin, levofloxacin)\n• **TMP-SMX** (if susceptible)\n• **Beta-lactam** (amoxicillin-clavulanate, cephalosporin)\n\n**Men with UTI:**\n• All are complicated by definition\n• Treat 7 days minimum\n• Consider prostatitis (treat 4-6 weeks)\n• Urology referral if recurrent',
        citation: [6, 7],
        next: 'uti-complicated-next',
    },
    {
        id: 'uti-complicated-next',
        type: 'question',
        module: 3,
        title: 'Complicated UTI - Next Step',
        body: 'What is the specific situation?',
        options: [
            { label: 'Male UTI', description: 'Consider prostatitis', next: 'uti-male' },
            { label: 'Catheter-Associated', description: 'CAUTI management', next: 'uti-cauti' },
            { label: 'Standard Complicated', description: 'Treat with FQ or culture-guided', next: 'uti-fluoroquinolones' },
        ],
    },
    {
        id: 'uti-pyelonephritis',
        type: 'info',
        module: 3,
        title: 'Pyelonephritis',
        body: '**Pyelonephritis** = upper urinary tract infection involving kidney parenchyma. [8][9]\n\n**Clinical Features:**\n• Fever (≥38°C / 100.4°F)\n• Flank pain\n• CVA tenderness\n• Nausea/vomiting\n• ± Cystitis symptoms\n\n**Labs:**\n• UA with culture (always)\n• CBC (leukocytosis)\n• BMP (creatinine)\n• Blood cultures if septic\n\n**Imaging:**\n• NOT routine for uncomplicated pyelo\n• CT if:\n  - No improvement in 48-72h\n  - Suspected obstruction (stone)\n  - Diabetic (emphysematous pyelo)\n  - Immunocompromised\n  - Suspected abscess\n\n**Treatment Duration:**\n• Outpatient: 5-7 days (FQ) or 10-14 days (TMP-SMX)\n• Inpatient: 10-14 days total',
        citation: [8, 9],
        next: 'uti-pyelo-disposition',
    },
    {
        id: 'uti-pyelo-disposition',
        type: 'question',
        module: 3,
        title: 'Pyelonephritis Disposition',
        body: 'Can this patient be treated as outpatient?',
        options: [
            { label: 'Outpatient Treatment', description: 'Tolerating PO, no sepsis, reliable follow-up', next: 'uti-pyelo-outpatient' },
            { label: 'Inpatient Treatment', description: 'Septic, vomiting, pregnant, unreliable', next: 'uti-pyelo-inpatient' },
        ],
    },
    {
        id: 'uti-pyelo-outpatient',
        type: 'info',
        module: 3,
        title: 'Outpatient Pyelonephritis',
        body: '**Outpatient treatment criteria (ALL required):** [8][9]\n• Able to tolerate PO intake\n• No significant comorbidities\n• No sepsis\n• Not pregnant\n• Reliable follow-up\n• Home support\n\n**First-Line Outpatient Regimens:**\n\n**1. Fluoroquinolone (PREFERRED):**\n• Ciprofloxacin 500mg BID x 7 days, OR\n• Levofloxacin 750mg daily x 5 days\n\n**2. TMP-SMX (if susceptible):**\n• 1 DS tab BID x 14 days\n• Give single dose ceftriaxone 1g IM first (covers while awaiting sensitivities)\n\n**Alternative:**\n• Ceftriaxone 1g IM x 1, then oral cephalosporin x 10-14 days\n\n**⚠️ DO NOT use nitrofurantoin for pyelonephritis** - does not achieve adequate renal tissue levels\n\n**Follow-Up:**\n• Call/return if worsening or no improvement in 48-72h\n• Repeat culture NOT needed if clinically improved\n• PCP follow-up in 2-3 days',
        citation: [8, 9],
        next: 'uti-disposition-pyelo',
    },
    {
        id: 'uti-pyelo-inpatient',
        type: 'info',
        module: 3,
        title: 'Inpatient Pyelonephritis',
        body: '**Admission Criteria:** [8][9]\n• Unable to tolerate PO (vomiting)\n• Sepsis or hemodynamic instability\n• Pregnancy\n• Complicated features (obstruction, abscess)\n• Significant comorbidity (diabetes, immunocompromised)\n• No reliable follow-up\n• Failed outpatient therapy\n\n**IV Antibiotic Options:**\n\n**1. Fluoroquinolone:**\n• Ciprofloxacin 400mg IV q12h, OR\n• Levofloxacin 750mg IV daily\n\n**2. Cephalosporin:**\n• Ceftriaxone 1g IV daily\n\n**3. Aminoglycoside-based:**\n• Gentamicin 5mg/kg IV daily + Ampicillin 2g IV q4h\n• For Enterococcus coverage or FQ allergy\n\n**4. Carbapenem (severe/MDR):**\n• Ertapenem 1g IV daily, OR\n• Meropenem 1g IV q8h (Pseudomonas)\n\n**Step-Down:**\n• Convert to PO when:\n  - Afebrile 24-48h\n  - Tolerating PO\n  - Clinically improving\n• Complete 10-14 day total course\n\n**If Not Improving:**\n• CT to rule out obstruction/abscess\n• Broaden antibiotics\n• Consider resistant organism\n• Urology consult if obstruction',
        citation: [8, 9],
        next: 'uti-disposition-pyelo',
    },
    // =====================================================================
    // MODULE 4: ANTIBIOTIC SELECTION
    // =====================================================================
    {
        id: 'uti-nitrofurantoin',
        type: 'info',
        module: 4,
        title: 'Nitrofurantoin',
        body: '**Nitrofurantoin - First-Line for Uncomplicated Cystitis** [1][2]\n\n**Dosing:**\n• Macrobid (monohydrate): 100mg BID x 5 days\n• Macrodantin (macrocrystals): 50-100mg QID x 7 days\n• **Macrobid preferred** (better GI tolerance)\n\n**Advantages:**\n• Excellent E. coli coverage\n• Low resistance rates (<5%)\n• Concentrated in urine\n• Minimal collateral damage to gut flora\n\n**Limitations:**\n• **Do NOT use for pyelonephritis** (no renal tissue penetration)\n• **Avoid if CrCl <30** (inadequate urine concentration)\n• Not effective against Proteus, Pseudomonas, Serratia\n\n**Side Effects:**\n• GI upset (take with food)\n• Headache\n• Rare: pulmonary toxicity (chronic use)\n• Rare: peripheral neuropathy\n\n**Pregnancy:**\n• Generally safe in 2nd/3rd trimester\n• Avoid at term (theoretical hemolysis risk)\n• Avoid in 1st trimester if alternatives available',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'crcl-cockcroft-gault', label: 'CrCl Calculator' },
        ],
        next: 'uti-disposition-uncomplicated',
    },
    {
        id: 'uti-tmpsmx',
        type: 'info',
        module: 4,
        title: 'TMP-SMX',
        body: '**TMP-SMX (Bactrim, Septra)** [1][2]\n\n**Dosing:**\n• 1 DS tablet (160/800mg) BID\n• Uncomplicated cystitis: 3 days\n• Pyelonephritis: 14 days\n• Complicated UTI: 7-14 days\n\n**Advantages:**\n• Excellent tissue penetration\n• Effective for pyelonephritis\n• Inexpensive\n• Once effective first-line\n\n**Major Limitation: RESISTANCE**\n• Use only if local resistance <20%\n• Check your hospital antibiogram\n• Many areas have 20-30% resistance\n\n**Contraindications:**\n• Sulfa allergy\n• G6PD deficiency\n• Pregnancy (1st trimester - teratogenic)\n• Severe renal impairment\n\n**Drug Interactions:**\n• Warfarin (increased INR)\n• Methotrexate (increased toxicity)\n• ACE inhibitors (hyperkalemia)\n\n**When to Use:**\n• Local resistance <20%\n• Culture confirms susceptibility\n• Patient tolerates sulfa\n• Not pregnant (1st trimester)',
        citation: [1, 2],
        next: 'uti-disposition-uncomplicated',
    },
    {
        id: 'uti-fluoroquinolones',
        type: 'info',
        module: 4,
        title: 'Fluoroquinolones',
        body: '**Fluoroquinolones - Reserve for Complicated UTI / Pyelonephritis** [1][2]\n\n**FDA Black Box Warning:**\n• Tendon rupture/tendinitis\n• Peripheral neuropathy\n• CNS effects\n• Reserve for when no alternatives\n\n**Dosing:**\n| Drug | Cystitis | Pyelonephritis |\n|------|----------|----------------|\n| Ciprofloxacin | 250mg BID x 3d | 500mg BID x 7d |\n| Levofloxacin | 250mg daily x 3d | 750mg daily x 5d |\n\n**When to Use:**\n• Complicated UTI\n• Pyelonephritis\n• Male UTI\n• Resistance/allergy to first-line agents\n• Culture-confirmed susceptibility\n\n**When NOT to Use:**\n• Uncomplicated cystitis (unless no alternatives)\n• Recent FQ use\n• Known FQ resistance\n• Pediatric/adolescent\n\n**Resistance Concerns:**\n• Increasing E. coli resistance (15-25%)\n• Cross-resistance within class\n• Promotes C. diff\n\n**Special Populations:**\n• Renal dosing required\n• Avoid in pregnancy\n• Caution in elderly (tendon rupture risk)',
        citation: [1, 2],
        next: 'uti-disposition-complicated',
    },
    // =====================================================================
    // MODULE 5: SPECIAL POPULATIONS
    // =====================================================================
    {
        id: 'uti-pregnancy',
        type: 'info',
        module: 5,
        title: 'UTI in Pregnancy',
        body: '**Pregnancy makes ALL UTIs complicated:** [10]\n\n**Key Principle: TREAT ASYMPTOMATIC BACTERIURIA (ASB)**\n• ASB in pregnancy → 25-40% progress to pyelonephritis\n• Pyelo in pregnancy → preterm labor, low birth weight\n• Screen and treat ASB at first prenatal visit\n\n**Safe Antibiotics in Pregnancy:**\n\n**First-Line:**\n• **Nitrofurantoin** 100mg BID x 5-7 days\n  - Avoid at term (theoretical hemolysis)\n  - Avoid in 1st trimester if alternatives\n• **Cephalexin** 500mg QID x 7 days\n• **Amoxicillin-clavulanate** 500mg TID x 7 days\n\n**For Pyelonephritis:**\n• **Admit for IV antibiotics**\n• Ceftriaxone 1g IV daily\n• Ampicillin + gentamicin\n\n**AVOID in Pregnancy:**\n• ❌ TMP-SMX (1st trimester - neural tube defects; 3rd trimester - kernicterus)\n• ❌ Fluoroquinolones (cartilage damage)\n• ❌ Tetracyclines\n\n**Duration:**\n• Cystitis: 7 days (longer than non-pregnant)\n• Pyelonephritis: 10-14 days\n• Consider suppressive therapy for recurrent UTI',
        citation: [10],
        next: 'uti-disposition-pregnant',
    },
    {
        id: 'uti-elderly',
        type: 'info',
        module: 5,
        title: 'UTI in Elderly',
        body: '**UTI in Elderly - Most Over-Diagnosed Condition:** [11]\n\n**Key Principle: Asymptomatic bacteriuria is COMMON and should NOT be treated**\n\n**ASB Prevalence:**\n• Community-dwelling elderly: 15-50%\n• Nursing home residents: 25-50%\n• Catheterized: up to 100%\n\n**DO NOT TREAT ASB (IDSA Guidelines):**\n• Positive UA/culture WITHOUT symptoms ≠ UTI\n• "Foul-smelling urine" alone is not a UTI\n• "Cloudy urine" alone is not a UTI\n• Non-specific symptoms (fatigue, weakness) are not UTI\n\n**What IS Symptomatic UTI in Elderly:**\n• Dysuria\n• New frequency/urgency\n• Fever without other source\n• Suprapubic pain\n• Gross hematuria\n• New or worsening incontinence\n\n**Altered Mental Status:**\n• UTI causing delirium is OVER-DIAGNOSED\n• Always look for other causes first\n• UTI should be diagnosis of exclusion\n• If treating, response to antibiotics should be rapid\n\n**Treatment in Elderly:**\n• Same antibiotics as younger adults\n• Mind drug interactions\n• Adjust for renal function\n• Avoid FQ if possible (tendon risk)',
        citation: [11],
        next: 'uti-elderly-decision',
    },
    {
        id: 'uti-elderly-decision',
        type: 'question',
        module: 5,
        title: 'Elderly - Assessment',
        body: 'Does the elderly patient have true symptomatic UTI?',
        options: [
            { label: 'Yes - True Symptoms', description: 'Dysuria, frequency, fever + pyuria', next: 'uti-complicated' },
            { label: 'No - Likely ASB', description: 'No symptoms, just positive UA', next: 'uti-asb' },
        ],
    },
    {
        id: 'uti-asb',
        type: 'result',
        module: 5,
        title: 'Asymptomatic Bacteriuria',
        body: '**Asymptomatic Bacteriuria (ASB):** [11]\n\n**Definition:**\nSignificant bacterial growth in urine WITHOUT urinary symptoms\n\n**TREAT ASB ONLY IN:**\n• **Pregnancy** (screen and treat at first prenatal visit)\n• **Before urologic procedures** that disrupt mucosa\n\n**DO NOT TREAT ASB IN:**\n• Elderly (regardless of living situation)\n• Diabetics\n• Catheterized patients\n• Spinal cord injury\n• Nursing home residents\n\n**Evidence Against Treating ASB:**\n• No reduction in symptomatic UTI\n• No reduction in mortality\n• Increases antibiotic resistance\n• Increases adverse effects\n• Increases C. diff risk\n\n**Rationale:**\n• ASB represents colonization, not infection\n• Treatment selects for resistant organisms\n• Bacteriuria often returns after treatment\n\n**What to Do Instead:**\n• Do not order UA if no symptoms\n• Do not treat positive UA without symptoms\n• Educate staff and families\n• Remove unnecessary catheters',
        recommendation: 'Do NOT treat asymptomatic bacteriuria in this patient. No reduction in outcomes, increases resistance and adverse effects.',
        confidence: 'recommended',
        citation: [11],
    },
    {
        id: 'uti-cauti',
        type: 'info',
        module: 5,
        title: 'Catheter-Associated UTI',
        body: '**Catheter-Associated UTI (CAUTI):** [12]\n\n**Definition:**\nSymptomatic UTI in patient with indwelling catheter or removed within 48h\n\n**Symptoms of CAUTI (need ≥1):**\n• Fever (no other source)\n• New flank/suprapubic pain\n• Costovertebral angle tenderness\n• Altered mental status (if no other cause)\n• New or worsening delirium\n\n**⚠️ NOT CAUTI:**\n• Positive culture alone (always positive if catheterized)\n• Cloudy or foul-smelling urine\n• Pyuria (universal in catheterized patients)\n\n**Management:**\n\n**1. REMOVE OR CHANGE CATHETER:**\n• Remove if no longer needed (preferred)\n• If still needed, change catheter before obtaining culture\n• Biofilm on old catheter harbors resistant organisms\n\n**2. Obtain Culture:**\n• From new catheter if changed\n• Or from freshly placed catheter\n\n**3. Empiric Antibiotics:**\n• FQ or cephalosporin (broader coverage)\n• Tailor based on culture\n• Duration: 7 days (10-14 if slow response)\n\n**Prevention:**\n• Remove catheters as soon as possible\n• Alternatives: intermittent cath, condom cath\n• Proper insertion technique\n• Maintain closed drainage system',
        citation: [12],
        next: 'uti-disposition-complicated',
    },
    {
        id: 'uti-male',
        type: 'info',
        module: 5,
        title: 'Male UTI',
        body: '**All UTI in Men Are Complicated:** [6][7]\n\n**Reasons:**\n• Anatomically longer urethra (UTI less common)\n• When UTI occurs, often underlying cause\n• Higher rate of treatment failure\n• Prostatitis common\n\n**Workup:**\n• UA with culture (always)\n• Consider prostate exam (tenderness = prostatitis)\n• Consider STI testing (young, sexually active)\n• Consider imaging if recurrent\n\n**When to Consider Prostatitis:**\n• Perineal or pelvic pain\n• Voiding symptoms\n• Tender prostate on exam\n• Recurrent UTI\n\n**Treatment:**\n\n**Simple UTI in Men:**\n• FQ or TMP-SMX x 7 days (minimum)\n• Culture to guide therapy\n\n**Prostatitis:**\n• FQ x 4-6 weeks (tissue penetration)\n• TMP-SMX x 4-6 weeks alternative\n• Must have good prostate penetration\n\n**Poor Prostate Penetration (avoid):**\n• Nitrofurantoin\n• Beta-lactams\n• Aminoglycosides\n\n**Referral:**\n• Urology for recurrent UTI\n• Evaluate for structural abnormality\n• Consider PSA, post-void residual',
        citation: [6, 7],
        next: 'uti-disposition-complicated',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'uti-disposition-uncomplicated',
        type: 'result',
        module: 6,
        title: 'Discharge - Uncomplicated UTI',
        body: '**Discharge Instructions for Uncomplicated Cystitis:** [1][2]\n\n**Medications:**\n• Nitrofurantoin 100mg BID x 5 days, OR\n• TMP-SMX DS BID x 3 days, OR\n• Fosfomycin 3g single dose\n\n**Patient Instructions:**\n• Take all antibiotics as prescribed\n• Increase fluid intake\n• Return if:\n  - Fever develops\n  - Flank pain develops\n  - Symptoms worsen or don\'t improve in 48h\n  - Vomiting (can\'t keep meds down)\n\n**Follow-Up:**\n• No routine follow-up needed if symptoms resolve\n• PCP if symptoms persist after completing antibiotics\n• Consider urology referral for ≥3 UTI/year\n\n**Recurrent UTI Prevention:**\n• Void after intercourse\n• Adequate hydration\n• Cranberry products (modest evidence)\n• Consider prophylaxis if ≥3 UTI/year\n\n**Test of Cure Culture:**\n• NOT needed for uncomplicated cystitis\n• Symptoms guide - if better, infection resolved',
        recommendation: 'Discharge with appropriate antibiotic (nitrofurantoin 5 days, TMP-SMX 3 days, or fosfomycin single dose). Return precautions for fever, flank pain, or worsening symptoms.',
        confidence: 'recommended',
        citation: [1, 2],
    },
    {
        id: 'uti-disposition-complicated',
        type: 'info',
        module: 6,
        title: 'Disposition - Complicated UTI',
        body: '**Complicated UTI Disposition:** [6][7]\n\n**Outpatient Criteria (ALL required):**\n• Stable vital signs\n• Able to tolerate PO\n• No sepsis\n• Reliable follow-up\n• Home support\n• Not high-risk\n\n**Outpatient Management:**\n• FQ or TMP-SMX x 7-14 days\n• Ensure culture sent\n• Close follow-up in 48-72h\n• Return precautions clearly explained\n\n**Admission Criteria:**\n• Sepsis or hemodynamic instability\n• Unable to tolerate PO\n• Significant comorbidity\n• Failed outpatient therapy\n• Obstruction or abscess suspected\n• No reliable follow-up\n\n**Follow-Up Plan:**\n• PCP in 48-72h\n• Culture results review\n• Adjust antibiotics based on sensitivities\n• Urology referral if:\n  - Structural abnormality\n  - Recurrent infections\n  - Failed treatment\n\n**Duration:**\n• Simple complicated UTI: 7 days\n• Prostatitis: 4-6 weeks\n• With bacteremia: 10-14 days',
        citation: [6, 7],
        next: 'uti-dispo-decision',
    },
    {
        id: 'uti-dispo-decision',
        type: 'question',
        module: 6,
        title: 'Disposition Decision',
        body: 'Based on clinical assessment, what is the disposition?',
        options: [
            { label: 'Discharge Home', description: 'Stable, tolerating PO, reliable follow-up', next: 'uti-discharge-complicated' },
            { label: 'Admit', description: 'Septic, vomiting, unreliable, high-risk', next: 'uti-admit' },
        ],
    },
    {
        id: 'uti-discharge-complicated',
        type: 'result',
        module: 6,
        title: 'Discharge - Complicated UTI',
        body: '**Discharge with:**\n• FQ (ciprofloxacin or levofloxacin) x 7 days, OR\n• TMP-SMX x 7-14 days (if culture susceptible)\n\n**Instructions:**\n• Take all antibiotics\n• Increase fluids\n• Follow-up in 48-72h for culture results\n• Return for: fever, worsening pain, vomiting, no improvement\n\n**Culture Follow-Up:**\n• Call patient with culture results\n• Adjust antibiotics if resistant organism\n• If not improving, may need admission',
        recommendation: 'Discharge with oral fluoroquinolone x 7 days or TMP-SMX x 7-14 days. Ensure culture sent. Follow-up in 48-72h.',
        confidence: 'recommended',
        citation: [6, 7],
    },
    {
        id: 'uti-admit',
        type: 'result',
        module: 6,
        title: 'Admission',
        body: '**Admit for:**\n• IV antibiotics\n• IV fluids\n• Monitoring\n\n**Initial IV Options:**\n• Ceftriaxone 1g IV daily\n• Ciprofloxacin 400mg IV q12h\n• Levofloxacin 750mg IV daily\n\n**Step-down to PO when:**\n• Afebrile 24-48h\n• Tolerating PO\n• Clinically improved\n\n**Complete total course:**\n• 7-14 days depending on severity',
        recommendation: 'Admit for IV antibiotics. Start ceftriaxone 1g IV daily or fluoroquinolone IV. Step-down to PO when afebrile and tolerating oral intake.',
        confidence: 'recommended',
        citation: [6, 8],
    },
    {
        id: 'uti-disposition-pyelo',
        type: 'result',
        module: 6,
        title: 'Disposition - Pyelonephritis',
        body: '**Pyelonephritis Disposition:** [8][9]\n\n**Outpatient Criteria:**\n• Uncomplicated pyelonephritis\n• Non-pregnant\n• Able to tolerate PO fluids and medications\n• No vomiting\n• No sepsis\n• Reliable follow-up within 24-48h\n• Home support available\n\n**Outpatient Regimen:**\n• FQ x 5-7 days (ciprofloxacin or levofloxacin), OR\n• TMP-SMX x 14 days (if susceptible, give ceftriaxone 1g IM first)\n• Anti-emetic as needed\n• Ensure culture sent\n\n**Admission Criteria:**\n• Pregnancy\n• Sepsis\n• Unable to tolerate PO\n• Significant comorbidities\n• Failed outpatient therapy\n• Obstruction suspected\n• Unreliable follow-up\n\n**Red Flags Requiring Imaging:**\n• No improvement in 48-72h\n• Diabetes (emphysematous pyelo)\n• Known kidney stones\n• History of urosepsis',
        recommendation: 'If outpatient: FQ x 5-7 days, anti-emetic, culture, 24-48h follow-up. If admission criteria met: IV antibiotics until afebrile 24-48h, then PO step-down.',
        confidence: 'recommended',
        citation: [8, 9],
    },
    {
        id: 'uti-disposition-pregnant',
        type: 'result',
        module: 6,
        title: 'Disposition - Pregnant',
        body: '**Pregnant UTI Disposition:** [10]\n\n**Cystitis in Pregnancy:**\n• Can treat outpatient if:\n  - No fever\n  - No vomiting\n  - Able to tolerate PO\n  - Reliable follow-up\n• Nitrofurantoin or cephalexin x 7 days\n• Follow-up culture recommended\n• OB follow-up in 1 week\n\n**Pyelonephritis in Pregnancy:**\n• **ADMIT ALL CASES**\n• IV antibiotics (ceftriaxone)\n• Monitoring for preterm labor\n• Fetal monitoring as appropriate for gestational age\n• OB consultation\n\n**After Treatment:**\n• Test of cure culture\n• Screening for recurrence\n• Consider suppressive therapy if recurrent:\n  - Nitrofurantoin 100mg daily\n  - Cephalexin 250mg daily\n\n**Red Flags in Pregnancy:**\n• Preterm contractions\n• Fever unresponsive to antibiotics\n• Sepsis\n• Renal function changes\n\n**Communication:**\n• Involve OB early\n• Document fetal well-being\n• Clear follow-up plan',
        recommendation: 'Cystitis: outpatient with nitrofurantoin or cephalexin x 7 days if stable. Pyelonephritis: ADMIT ALL pregnant patients for IV antibiotics and OB consultation.',
        confidence: 'recommended',
        citation: [10],
    },
];
// =====================================================================
// MODULE LABELS
// =====================================================================
export const ADULT_UTI_MODULE_LABELS = [
    'Initial Assessment',
    'Diagnosis & UA Interpretation',
    'UTI Classification',
    'Antibiotic Selection',
    'Special Populations',
    'Disposition',
];
export const ADULT_UTI_NODE_COUNT = 32;
// =====================================================================
// CRITICAL ACTIONS
// =====================================================================
export const ADULT_UTI_CRITICAL_ACTIONS = [
    { text: 'All men = complicated UTI', nodeId: 'uti-male' },
    { text: 'Pyuria absent → unlikely UTI', nodeId: 'uti-no-pyuria' },
    { text: 'Nitrofurantoin: avoid if pyelo', nodeId: 'uti-nitrofurantoin' },
    { text: 'FQ: reserve for complicated', nodeId: 'uti-fluoroquinolones' },
    { text: 'Pregnant: treat ASB', nodeId: 'uti-pregnancy' },
    { text: 'Catheter: remove/change if possible', nodeId: 'uti-cauti' },
    { text: 'Pyelo: IV abx if toxic/vomiting', nodeId: 'uti-pyelo-inpatient' },
    { text: 'Elderly: ASB common, don\'t overtreat', nodeId: 'uti-elderly' },
];
// =====================================================================
// CITATIONS
// =====================================================================
export const ADULT_UTI_CITATIONS = [
    {
        num: 1,
        text: 'Gupta K et al. IDSA Guidelines for Acute Uncomplicated Cystitis and Pyelonephritis. Clin Infect Dis 2011;52(5):e103-e120.',
    },
    {
        num: 2,
        text: 'UpToDate: Acute simple cystitis in women: Treatment. uptodate.com',
    },
    {
        num: 3,
        text: 'Bent S et al. Does this woman have an acute uncomplicated UTI? JAMA 2002;287(20):2701-2710.',
    },
    {
        num: 4,
        text: 'Hooton TM. Uncomplicated Urinary Tract Infection. N Engl J Med 2012;366(11):1028-1037.',
    },
    {
        num: 5,
        text: 'Grigoryan L et al. Diagnosis and Management of UTI in the Emergency Department. Am J Emerg Med 2014;32(9):972-976.',
    },
    {
        num: 6,
        text: 'Wagenlehner FM et al. Complicated Urinary Tract Infections. Nat Rev Dis Primers 2016;2:16038.',
    },
    {
        num: 7,
        text: 'IDSA/AUA Guidelines on Recurrent Uncomplicated UTI 2024. idsociety.org',
    },
    {
        num: 8,
        text: 'Johnson JR, Russo TA. Acute Pyelonephritis in Adults. N Engl J Med 2018;378(1):48-59.',
    },
    {
        num: 9,
        text: 'Colgan R et al. Diagnosis and Treatment of Acute Pyelonephritis in Women. Am Fam Physician 2011;84(5):519-526.',
    },
    {
        num: 10,
        text: 'Smaill FM, Vazquez JC. Antibiotics for asymptomatic bacteriuria in pregnancy. Cochrane Database Syst Rev 2015.',
    },
    {
        num: 11,
        text: 'Nicolle LE et al. Clinical Practice Guideline for the Management of Asymptomatic Bacteriuria: 2019 Update by IDSA. Clin Infect Dis 2019;68(10):e83-e110.',
    },
    {
        num: 12,
        text: 'Hooton TM et al. Diagnosis, Prevention, and Treatment of Catheter-Associated UTI. Clin Infect Dis 2010;50(5):625-663.',
    },
];
