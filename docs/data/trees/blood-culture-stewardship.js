// MedKitt — Blood Culture Stewardship
// When to Order Blood Cultures in the ED — Evidence-Based Decision Support
// 5 modules: Indications • High-Yield Settings • Low-Yield Settings • Contamination • Interpretation
// 22 nodes total.
export const BLOOD_CULTURE_STEWARDSHIP_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'bcs-start',
        type: 'question',
        module: 1,
        title: 'Blood Culture Stewardship — Overview',
        body: '[When to Order Blood Cultures](#/info/bcs-indications)\n\n**The Problem:** Blood cultures are often ordered reflexively. In the ED, 20-25% of all blood cultures are drawn, but many have low diagnostic yield and high contamination rates. [1][2]\n\n**The Cost of False Positives:** [2][3]\n• Unnecessary vancomycin and prolonged antibiotic courses\n• Longer hospital stays (mean 2-4 extra days)\n• Increased healthcare costs ($1,000-$5,000 per false positive)\n• Antibiotic resistance from inappropriate therapy\n\n**Key Principle:** Order blood cultures when the *pre-test probability of true bacteremia* exceeds the *contamination rate* (~3%). [1][4]\n\n[Contamination Guide](#/info/bcs-contamination)\n\nWhat is the clinical scenario?',
        citation: [1, 2, 3, 4],
        options: [
            {
                label: 'Sepsis / Septic Shock',
                description: 'SIRS criteria + suspected infection, vasopressor need',
                next: 'bcs-sepsis',
                urgency: 'critical',
            },
            {
                label: 'Febrile Illness — Evaluate Yield',
                description: 'Fever, infection suspected, stable patient',
                next: 'bcs-fever',
            },
            {
                label: 'Specific Infection Source Identified',
                description: 'CAP, UTI, cellulitis, etc.',
                next: 'bcs-source-specific',
            },
        ],
        summary: 'Order blood cultures when pre-test probability of bacteremia exceeds contamination rate (~3%); false positives cost $1-5K and add 2-4 hospital days',
    },
    // =====================================================================
    // MODULE 2: HIGH-YIELD INDICATIONS
    // =====================================================================
    {
        id: 'bcs-sepsis',
        type: 'info',
        module: 2,
        title: 'Sepsis / Septic Shock — High Yield',
        body: '**ALWAYS obtain blood cultures before antibiotics in sepsis/septic shock.** [1][5]\n\n**Pre-test probability for bacteremia:** [4][6]\n• Severe sepsis: ~38%\n• Septic shock: ~69%\n\n**Best Practice:** [1][5]\n• **2 sets from 2 separate peripheral sites** (not through indwelling lines — high false positive rate)\n• Draw 20-30 mL total (10-15 mL per set)\n• **Before antibiotics** when feasible — but do NOT delay antibiotics for culture collection\n• Use blood culture diversion device if available (reduces contamination by ~64%) [1]\n\n**Do NOT draw through central lines** unless line infection is suspected — contamination rates significantly higher. [3][7]\n\n[Technique Guide](#/info/bcs-technique)',
        citation: [1, 3, 4, 5, 6, 7],
        next: 'bcs-high-yield-other',
        safetyLevel: 'critical',
        summary: '2 sets from 2 peripheral sites before antibiotics — septic shock has 69% bacteremia rate; do NOT draw through central lines',
    },
    {
        id: 'bcs-high-yield-other',
        type: 'info',
        module: 2,
        title: 'Other High-Yield Indications',
        body: '**Blood cultures ARE recommended for:** [3][4][5]\n\n**Suspected endocarditis:**\n• 3 sets from 3 separate sites over 1-24 hours\n• Yield: ~95% with proper technique\n\n**Meningitis/encephalitis:**\n• Before or concurrent with LP\n• Critical for organism identification\n\n**Osteomyelitis / septic arthritis:**\n• Before antibiotics\n• Positive in 30-50% of cases\n\n**Healthcare-associated infections:**\n• Hospital-acquired pneumonia\n• Central line-associated bloodstream infection (CLABSI)\n• Surgical site infection\n\n**Pyelonephritis with systemic toxicity:**\n• Rigors, hypotension, immunocompromised\n• Consider for complicated pyelonephritis (obstruction, catheter)\n\n**Immunocompromised:**\n• Febrile neutropenia (ANC <500)\n• Solid organ transplant within 1 year\n• Active chemotherapy\n\n[High-Yield Quick Reference](#/info/bcs-high-yield)',
        citation: [3, 4, 5],
        next: 'bcs-technique',
        summary: 'High yield: endocarditis (3 sets), meningitis, osteomyelitis, HAP, CLABSI, complicated pyelonephritis, immunocompromised',
    },
    {
        id: 'bcs-technique',
        type: 'info',
        module: 2,
        title: 'Optimal Collection Technique',
        body: '**Volume matters most:** [1][7]\n• **20-30 mL total** (10-15 mL per bottle pair)\n• Each additional mL increases yield by 3%\n• Under-filling is the most common error\n\n**Skin antisepsis:** [1]\n• Chlorhexidine/alcohol preferred over povidone-iodine\n• Allow to dry before venipuncture\n• Reduces contamination by 30-50%\n\n**Diversion devices:** [1]\n• Initial ~0.5-1 mL of blood diverted away from culture bottle\n• Reduces contamination by average 64%\n• Strongly recommended by ASM/IDSA 2024 guidelines\n\n**Site selection:**\n• 2 peripheral venipunctures preferred\n• If must use line: draw peripheral + line simultaneously, note which is which\n• Never draw only from indwelling catheter\n\n**Timing:** [5]\n• Obtain before antibiotics when possible\n• If already on antibiotics: draw at trough (just before next dose)\n• Do NOT delay antibiotic therapy to obtain cultures in critically ill patients',
        citation: [1, 5, 7],
        next: 'bcs-disposition-high',
        summary: '20-30mL total (volume matters most), chlorhexidine antisepsis, 2 peripheral sites, diversion device reduces contamination 64%',
        skippable: true,
    },
    {
        id: 'bcs-disposition-high',
        type: 'result',
        module: 2,
        title: 'Proceed with Blood Cultures',
        body: '**This is a HIGH-YIELD indication for blood cultures.**\n\n**Checklist:**\n✓ 2 sets from 2 separate peripheral venipunctures\n✓ 20-30 mL total blood volume\n✓ Chlorhexidine antisepsis, allow to dry\n✓ Use diversion device if available\n✓ Draw before antibiotics (but do not delay abx for culture)\n✓ Document time of draw and sites used\n\n**If positive:**\n• Assess for true pathogen vs contaminant\n• Repeat cultures if uncertain\n• Adjust antibiotics based on susceptibilities',
        recommendation: 'Obtain blood cultures. Pre-test probability of bacteremia exceeds contamination risk. Follow optimal collection technique.',
        confidence: 'definitive',
        citation: [1, 5],
    },
    // =====================================================================
    // MODULE 3: LOW-YIELD / NOT RECOMMENDED
    // =====================================================================
    {
        id: 'bcs-source-specific',
        type: 'question',
        module: 3,
        title: 'Infection Source — Assess Yield',
        body: '**Pre-test probability varies significantly by infection source.** [3][4][8]\n\nThe chance of a false-positive culture is greater than the prevalence of true positive cultures in many common ED presentations. [3]\n\n[Yield by Infection Type](#/info/bcs-yield-table)\n\nSelect the primary infection source:',
        citation: [3, 4, 8],
        options: [
            {
                label: 'Community-Acquired Pneumonia',
                description: 'CAP without ICU admission',
                next: 'bcs-cap',
            },
            {
                label: 'Cellulitis / Skin Infection',
                description: 'Uncomplicated cellulitis, abscess',
                next: 'bcs-ssti',
            },
            {
                label: 'UTI / Pyelonephritis',
                description: 'Urinary tract infection',
                next: 'bcs-uti',
            },
            {
                label: 'Other (Assess Risk Factors)',
                description: 'GI infection, surgical, unknown',
                next: 'bcs-risk-factors',
            },
        ],
        summary: 'False-positive rate often exceeds true bacteremia rate in CAP, cellulitis, uncomplicated UTI — assess yield before ordering',
    },
    {
        id: 'bcs-cap',
        type: 'info',
        module: 3,
        title: 'Community-Acquired Pneumonia',
        body: '**Blood cultures are generally NOT recommended for uncomplicated CAP.** [3][4][8]\n\n**Evidence:** [4][8]\n• Overall yield: 0.5-14%, typically **6-9%** for non-ICU CAP\n• Antibiotic selection rarely changes: only **0.5-1%** of cases have antibiotics broadened based on blood cultures\n• False positive rate often exceeds true positive rate\n\n**When to OBTAIN blood cultures in CAP:** [4][5]\n• Severe CAP requiring ICU admission (yield: ~14-33%)\n• Immunocompromised patients\n• Specific radiographic findings (empyema, cavitation)\n• Clinical deterioration despite empiric therapy\n• Chronic liver disease, asplenia, leukopenia\n\n**When to SKIP blood cultures in CAP:**\n• Routine admission to non-ICU floor\n• Immunocompetent patients responding to empiric therapy\n• Clear viral syndrome\n\n**Pearl:** Current IDSA guidelines recommend blood cultures only for severe CAP, specific radiographic findings, or predisposing risk factors for bacteremia. [5]',
        citation: [3, 4, 5, 8],
        next: 'bcs-disposition-low',
        summary: 'Routine CAP: 6-9% yield, antibiotics changed in <1% — skip unless ICU-level, immunocompromised, or risk factors',
    },
    {
        id: 'bcs-ssti',
        type: 'info',
        module: 3,
        title: 'Cellulitis / Skin & Soft Tissue',
        body: '**Blood cultures are NOT recommended for uncomplicated cellulitis.** [3][9]\n\n**Evidence:** [3][9]\n• Bacteremia rate in simple cellulitis: **<2%**\n• False positive rate (~3%) *exceeds* true positive rate\n• Cultures rarely change management\n\n**When to CONSIDER blood cultures in SSTI:** [3][9]\n• Suspected necrotizing fasciitis / deep space infection\n• Sepsis or septic shock physiology\n• Severe infections requiring surgical intervention\n• Immunocompromised patients\n• Central line or surgical site infection\n• Rapidly progressive cellulitis\n• Bite wounds with systemic symptoms\n\n**When to SKIP blood cultures:**\n• Uncomplicated cellulitis without systemic toxicity\n• Abscess for I&D (wound culture more useful)\n• Mild infection in immunocompetent patient\n\n**Pearl:** For SSTI, a *wound culture* from abscess drainage is far more useful than blood cultures for guiding therapy.',
        citation: [3, 9],
        next: 'bcs-disposition-low',
        summary: 'Simple cellulitis: <2% bacteremia rate — contamination exceeds true positives; skip unless necrotizing, septic, or immunocompromised',
    },
    {
        id: 'bcs-uti',
        type: 'info',
        module: 3,
        title: 'UTI / Pyelonephritis',
        body: '**Blood cultures add little value in most UTIs when a urine culture is available.** [3][10]\n\n**Evidence for pyelonephritis:** [3][10]\n• Pre-test probability for bacteremia: **19-25%** (moderate risk)\n• However: blood and urine cultures yield the *same organism* in >97% of cases\n• Blood cultures changed management in only **2.3%** of cases\n\n**When to SKIP blood cultures in UTI:** [3][10]\n• Uncomplicated cystitis\n• Simple pyelonephritis with reliable urine culture\n• Immunocompetent patients without systemic toxicity\n• Good quality midstream or catheterized urine sample available\n\n**When to OBTAIN blood cultures in UTI:** [10]\n• Sepsis or septic shock\n• Urinary tract obstruction (stone, catheter, stricture)\n• Immunocompromised patients\n• Recent antibiotics (urine may be sterile but blood positive)\n• Polymicrobial urine culture where single pathogen unclear\n• Hospital-acquired UTI\n• No reliable urine sample available\n\n**Pearl:** If you have a good urine culture, blood cultures rarely add actionable information in UTI. [10]',
        citation: [3, 10],
        next: 'bcs-disposition-low',
        summary: 'Pyelonephritis: 19-25% bacteremia but same organism in 97% as urine — blood culture changed management in only 2.3% of cases',
    },
    {
        id: 'bcs-fever',
        type: 'question',
        module: 3,
        title: 'Febrile Patient — Risk Stratify',
        body: '**Fever alone is NOT an indication for blood cultures.** [4][6]\n\n**The Shapiro Decision Rule** helps predict true bacteremia: [6]\n\n**Major criteria (3 points each):**\n• Temperature >39.4°C (103°F)\n• Indwelling vascular catheter\n• Clinical suspicion of endocarditis\n\n**Minor criteria (1 point each):**\n• Temperature 38.3-39.3°C\n• Age >65 years\n• Rigors\n• Vomiting\n• Hypotension (SBP <90)\n• WBC >18,000\n• Bands >5%\n• Platelets <150,000\n• Creatinine >2.0\n\n**Score ≥2 points:** 19% bacteremia risk → cultures indicated\n**Score <2 points:** <1% bacteremia risk → consider skipping\n\n**Shapiro Rule Calculator**\n\nWhat is the Shapiro score or clinical gestalt?',
        citation: [4, 6],
        options: [
            {
                label: 'Shapiro ≥2 or High Clinical Suspicion',
                description: 'Major criteria present, rigors, unstable',
                next: 'bcs-high-yield-other',
            },
            {
                label: 'Shapiro <2, Low Risk',
                description: 'No major criteria, stable, clear source',
                next: 'bcs-disposition-low',
            },
        ],
        summary: 'Shapiro rule: >=2 points = 19% bacteremia risk (cultures indicated); <2 points = <1% risk (consider skipping)',
    },
    {
        id: 'bcs-risk-factors',
        type: 'question',
        module: 3,
        title: 'Bacteremia Risk Factors',
        body: '**Physical exam findings that increase bacteremia risk:** [4][6]\n\n**Most predictive:** [6]\n• **Rigors** — likelihood ratio 4.7 for bacteremia\n• **Shaking chills** — highly specific\n• Fever + rigors in combination\n\n**Other risk factors:** [4]\n• Indwelling vascular device\n• Immunosuppression\n• Recent hospitalization\n• Injection drug use\n• Chronic liver disease\n• Asplenia\n• Prosthetic valves/joints\n\n**Low-risk features:**\n• Isolated low-grade fever\n• Clear viral syndrome\n• Stable vital signs\n• No rigors\n\nDoes the patient have high-risk features?',
        citation: [4, 6],
        options: [
            {
                label: 'Yes — High-Risk Features Present',
                description: 'Rigors, indwelling device, immunocompromised',
                next: 'bcs-high-yield-other',
            },
            {
                label: 'No — Low-Risk Febrile Illness',
                description: 'No rigors, no devices, immunocompetent',
                next: 'bcs-disposition-low',
            },
        ],
        summary: 'Rigors = LR 4.7 for bacteremia; high risk with indwelling devices, immunosuppression, liver disease, asplenia',
    },
    {
        id: 'bcs-disposition-low',
        type: 'result',
        module: 3,
        title: 'Blood Cultures NOT Recommended',
        body: '**This is a LOW-YIELD indication. Blood cultures are NOT recommended.** [3]\n\n**Reasons to skip:**\n• Pre-test probability of bacteremia is low (<3-5%)\n• False positive rate may exceed true positive rate\n• Result unlikely to change management\n• Unnecessary vancomycin, prolonged stays, increased costs\n\n**Document your reasoning:**\n"Blood cultures not obtained given low pre-test probability of bacteremia, clear source amenable to source-specific cultures, and risk of false-positive exceeding clinical benefit."\n\n**Alternative diagnostics:**\n• **UTI:** Urine culture\n• **SSTI:** Wound/abscess culture\n• **CAP:** Sputum culture, respiratory panel, procalcitonin\n\n**When to reconsider:**\n• Clinical deterioration\n• Failure to respond to empiric therapy\n• New risk factors identified',
        recommendation: 'Do NOT obtain blood cultures. Pre-test probability is low and false-positive risk exceeds benefit. Use source-specific cultures instead.',
        confidence: 'definitive',
        citation: [3],
    },
    // =====================================================================
    // MODULE 4: CONTAMINATION & FALSE POSITIVES
    // =====================================================================
    {
        id: 'bcs-contamination',
        type: 'info',
        module: 4,
        title: 'Contamination — The Problem',
        body: '**Blood culture contamination rates in EDs often exceed 3% benchmark.** [1][2]\n\n**Most common contaminants:** [2][11]\n• **Coagulase-negative staphylococci (CoNS)** — 45-60% of all isolates, only 10-12% represent true infection\n• *Corynebacterium* species\n• *Bacillus* species\n• *Propionibacterium acnes*\n\n**Organisms that ALWAYS/NEARLY ALWAYS (>90%) represent true infection:** [11]\n• *S. aureus*\n• *S. pneumoniae*\n• *E. coli* and other Enterobacteriaceae\n• *Candida* species\n• *Pseudomonas aeruginosa*\n\n**Cost of contamination:** [2][3]\n• Median 2-4 extra hospital days\n• $1,000-$5,000 additional cost per episode\n• Unnecessary vancomycin therapy\n• Drives antibiotic resistance\n\n[How to Reduce Contamination](#/info/bcs-technique)',
        citation: [1, 2, 3, 11],
        next: 'bcs-interpret',
        summary: 'CoNS = most common contaminant (only 10-12% true infection); S. aureus, E. coli, Candida >90% true pathogens',
    },
    {
        id: 'bcs-interpret',
        type: 'question',
        module: 4,
        title: 'Interpreting Positive Cultures',
        body: '**When a blood culture comes back positive, assess likelihood of true bacteremia vs contamination.** [11]\n\n**Factors suggesting TRUE bacteremia:** [11]\n• Organism: *S. aureus*, Enterobacteriaceae, *Candida*\n• Multiple positive bottles (≥2 of 4)\n• Positive culture from multiple separate draws\n• Clinical picture consistent with bacteremia\n• ≥3 SIRS criteria present (probability 72.3%)\n• Time to positivity <14 hours\n\n**Factors suggesting CONTAMINATION:** [11]\n• Organism: CoNS, *Corynebacterium*, *Bacillus*\n• Single positive bottle of 4 drawn\n• Only one venipuncture site positive\n• Patient clinically well\n• Time to positivity >14-24 hours (especially CoNS)\n\n**CoNS most likely true BSI if:** [11]\n• ≥3 SIRS criteria (72.3% probability)\n• OR ≥2 SIRS criteria + central venous catheter\n\nIs the isolate a typical pathogen or typical contaminant?',
        citation: [11],
        options: [
            {
                label: 'Typical Pathogen',
                description: 'S. aureus, E. coli, Strep, Candida',
                next: 'bcs-true-bsi',
            },
            {
                label: 'Typical Contaminant',
                description: 'CoNS, Corynebacterium, Bacillus, single bottle',
                next: 'bcs-contaminant',
            },
        ],
        summary: 'S. aureus/E. coli/Candida = true pathogen >90%; CoNS in single bottle with <3 SIRS = likely contaminant',
    },
    {
        id: 'bcs-true-bsi',
        type: 'result',
        module: 4,
        title: 'Likely True Bacteremia',
        body: '**This organism is highly likely to represent true bloodstream infection.** [11]\n\n**Next steps:**\n• Continue/adjust antibiotics based on susceptibilities\n• Repeat cultures to document clearance (esp. *S. aureus*)\n• Search for source (POCUS, CT, echo)\n• Evaluate for endocarditis if *S. aureus*\n• ID consultation for persistent or complicated bacteremia\n\n**Duration of therapy:**\n• Varies by organism and source\n• *S. aureus* bacteremia: minimum 2 weeks IV (longer if endocarditis, metastatic foci)\n• Gram-negative bacteremia: typically 7-14 days depending on source control\n\n**Echo indications:**\n• All *S. aureus* bacteremia (TTE +/- TEE)\n• Prosthetic valve or device\n• Persistently positive cultures\n• Injection drug use',
        recommendation: 'True bacteremia likely. Narrow antibiotics by susceptibilities, repeat cultures, source search, consider ID consultation.',
        confidence: 'definitive',
        citation: [11],
    },
    {
        id: 'bcs-contaminant',
        type: 'result',
        module: 4,
        title: 'Likely Contaminant',
        body: '**This organism is likely contamination, NOT true infection.** [11]\n\n**Clinical decision:**\n• Assess patient clinical status — are they improving?\n• If stable/improving: contamination more likely\n• If deteriorating: consider repeat cultures and broader coverage\n\n**For isolated CoNS in single bottle:** [11]\n• If <3 SIRS criteria and no CVC: 77-85% likely contamination\n• Consider observation without vancomycin\n• Repeat cultures only if clinical concern\n\n**Do NOT reflexively start vancomycin for single-bottle CoNS** in a stable patient without a central line.\n\n**When to treat CoNS as true pathogen:** [11]\n• Prosthetic valve or device\n• Multiple positive bottles from separate draws\n• Central venous catheter + ≥2 SIRS criteria\n• Persistent positive cultures despite antibiotics\n\n**Documentation:** "Single positive bottle with coagulase-negative staphylococci in clinically stable patient without indwelling device — most consistent with contamination. Observation without antibiotics."',
        recommendation: 'Likely contamination. Do not reflexively treat with vancomycin. Reassess clinical status. Repeat cultures only if clinical concern.',
        confidence: 'recommended',
        citation: [11],
    },
    // =====================================================================
    // MODULE 5: SPECIAL POPULATIONS
    // =====================================================================
    {
        id: 'bcs-special',
        type: 'info',
        module: 5,
        title: 'Special Populations',
        body: '**Immunocompromised — Lower threshold for cultures:** [5]\n• Febrile neutropenia (ANC <500): ALWAYS culture\n• Solid organ transplant within 1 year\n• Hematologic malignancy on chemotherapy\n• HIV with CD4 <200\n• Chronic high-dose steroids\n\n**ESRD/Hemodialysis:** [3]\n• Higher bacteremia risk (intravascular devices)\n• Same initial fluid boluses recommended despite dialysis status\n• Culture if febrile or systemic symptoms\n\n**Elderly:** [4]\n• May not mount typical fever or SIRS response\n• Lower threshold for cultures if altered baseline, functional decline\n• Shapiro rule still applicable\n\n**Recent antibiotics:** [10]\n• Urine may be sterile but blood still positive\n• Consider blood cultures if recent antibiotic exposure and concern for missed bacteremia\n• Draw at antibiotic trough\n\n**IVDU:** [4]\n• High risk for *S. aureus* bacteremia and endocarditis\n• Lower threshold for cultures in febrile IVDU patient',
        citation: [3, 4, 5, 10],
        summary: 'Neutropenic fever: always culture; ESRD/IVDU: low threshold; elderly may not mount SIRS; recent abx: draw at trough',
        skippable: true,
    },
    {
        id: 'bcs-2024-shortage',
        type: 'info',
        module: 5,
        title: '2024 Shortage & Stewardship Response',
        body: '**The June 2024 blood culture bottle shortage accelerated stewardship adoption.** [1][12]\n\n**What happened:** [12]\n• BD Diagnostics shortage forced conservation strategies\n• FDA added blood culture media bottles to shortage list\n• CDC issued Health Advisory urging mitigation plans\n\n**What we learned:** [1][12]\n• Stewardship protocols *reduced* blood culture use **without increasing sepsis mortality**\n• Many institutions reduced cultures by 20-40% with no adverse outcomes\n• "Every crisis is an opportunity" — shortage forced evidence-based ordering\n\n**Key takeaways:**\n• Blood cultures are overused in routine care\n• Thoughtful ordering improves care, does not harm it\n• Best practice advisories and clinical decision support are effective\n\n**IDSA/ASM 2024 guidance:** [1]\n• Implement diversion devices\n• Train on optimal technique (volume, antisepsis)\n• Use clinical decision support for appropriate indications\n• Avoid cultures through indwelling lines\n\n**2024 Stewardship Summary**',
        citation: [1, 12],
        summary: '2024 shortage showed 20-40% reduction in cultures caused no harm — overuse is the norm; stewardship improves care',
        skippable: true,
    },
];
// =====================================================================
// MODULE LABELS
// =====================================================================
export const BLOOD_CULTURE_STEWARDSHIP_MODULE_LABELS = [
    'Initial Assessment',
    'High-Yield Indications',
    'Low-Yield / Not Recommended',
    'Contamination & Interpretation',
    'Special Populations',
];
export const BLOOD_CULTURE_STEWARDSHIP_NODE_COUNT = 22;
// =====================================================================
// CITATIONS
// =====================================================================
export const BLOOD_CULTURE_STEWARDSHIP_CRITICAL_ACTIONS = [
    { text: 'Order blood cultures ONLY when pre-test probability exceeds contamination rate (~3%)', nodeId: 'bcs-start' },
    { text: 'Sepsis/septic shock: 2 sets from 2 peripheral sites, 20-30mL total, BEFORE antibiotics', nodeId: 'bcs-sepsis' },
    { text: 'Do NOT draw blood cultures through central lines unless line infection suspected', nodeId: 'bcs-sepsis' },
    { text: 'CAP without ICU admission: blood cultures rarely change management (0.5-1% of cases)', nodeId: 'bcs-cap' },
    { text: 'Uncomplicated cellulitis: bacteremia <2% — contamination exceeds true positives', nodeId: 'bcs-ssti' },
    { text: 'UTI with good urine culture: blood culture changed management in only 2.3% of cases', nodeId: 'bcs-uti' },
    { text: 'Rigors = LR 4.7 for bacteremia — most predictive physical exam finding', nodeId: 'bcs-risk-factors' },
    { text: 'Single-bottle CoNS in stable patient without CVC = likely contaminant — do NOT reflexively treat', nodeId: 'bcs-contaminant' },
];
export const BLOOD_CULTURE_STEWARDSHIP_CITATIONS = [
    {
        num: 1,
        text: 'Humphries RM, et al. IDSA/ASM Guide to Utilization of the Microbiology Laboratory for Diagnosis of Infectious Diseases: 2024 Update. Clin Infect Dis. 2024.',
    },
    {
        num: 2,
        text: 'Hall KK, Lyman JA. Updated Review of Blood Culture Contamination. Clin Microbiol Rev. 2006;19(4):788-802.',
    },
    {
        num: 3,
        text: 'Coburn B, Morris AM, Tomlinson G, Detsky AS. Does This Adult Patient with Suspected Bacteremia Require Blood Cultures? JAMA. 2012;308(5):502-511.',
    },
    {
        num: 4,
        text: 'Long B, Koyfman A. Best Clinical Practice: Blood Culture Utility in the Emergency Department. J Emerg Med. 2016;51(5):529-539.',
    },
    {
        num: 5,
        text: 'Evans L, Rhodes A, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
    },
    {
        num: 6,
        text: 'Shapiro NI, Wolfe RE, Wright SB, et al. Who Needs a Blood Culture? A Prospectively Derived and Validated Prediction Rule. J Emerg Med. 2008;35(3):255-264.',
    },
    {
        num: 7,
        text: 'Lamy B, Dargère S, Arendrup MC, et al. How to Optimize the Use of Blood Cultures for the Diagnosis of Bloodstream Infections? A State-of-the Art. Front Microbiol. 2016;7:697.',
    },
    {
        num: 8,
        text: 'Chalasani NP, et al. Blood Cultures for Community-Acquired Pneumonia: Piecing Together a Mosaic for Doing Less. Am J Respir Crit Care Med. 2014;190(11):1197-1199.',
    },
    {
        num: 9,
        text: 'IDSA Practice Guidelines for Skin and Soft Tissue Infections. Clin Infect Dis. 2014;59(2):e10-e52.',
    },
    {
        num: 10,
        text: 'Liao S, et al. Blood Culture Useful Only in Selected Patients with Urinary Tract Infections — A Literature Review. Eur J Clin Microbiol Infect Dis. 2018;37(4):639-646.',
    },
    {
        num: 11,
        text: 'Saunders JM, et al. Contaminated or Not? Guidelines for Interpretation of Positive Blood Cultures. AHRQ PSNet. 2023.',
    },
    {
        num: 12,
        text: 'Wilson GM, et al. Every Crisis Is an Opportunity: Advancing Blood Culture Stewardship During a Blood Culture Bottle Shortage. Open Forum Infect Dis. 2024;11(9):ofae479.',
    },
];
