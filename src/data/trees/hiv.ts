// MedKitt — HIV Emergency Department Management
// CD4/VL-guided assessment → Acute seroconversion → Well-controlled complications → Immunocompromised/OI → Medication effects → Prevention & disposition.
// 6 modules: Initial Assessment → Seroconversion & Testing → Well-Controlled HIV → Immunocompromised/OI → Medication Effects → Prevention & Disposition
// 33 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const HIV_CRITICAL_ACTIONS = [
  { text: 'Assess CD4 count and viral load status', nodeId: 'hiv-status-assess' },
  { text: 'Do NOT stop HAART without HIV specialist guidance', nodeId: 'hiv-immunocompromised-disposition' },
  { text: 'Start TMP-SMX prophylaxis if CD4 <200', nodeId: 'hiv-immunocompromised-disposition' },
  { text: 'PJP treatment: TMP-SMX 15-20 mg/kg/day + prednisone', nodeId: 'hiv-pulm-oi' },
  { text: 'Same-day ART initiation for new HIV diagnosis', nodeId: 'hiv-new-diagnosis' },
  { text: 'PEP must start within 72 hours of exposure', nodeId: 'hiv-pep-overview' },
  { text: 'Screen for HBV co-infection before stopping ARVs', nodeId: 'hiv-hbv-caution' },
  { text: 'Urgent ID consult for suspected opportunistic infections', nodeId: 'hiv-cns-oi' },
];

export const HIV_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT & HIV STATUS
  // =====================================================================

  {
    id: 'hiv-start',
    type: 'info',
    module: 1,
    title: 'HIV in the Emergency Department',
    body: '[HIV ED Management Steps Summary](#/info/hiv-steps-summary) — quick reference.\n\nHIV is now a manageable chronic disease with HAART, but ~14% of HIV-infected persons remain unaware of their status, driving continued transmission. [1] Approximately 80% of new transmissions are from persons not yet diagnosed or not in regular care.\n\nThe ED plays a critical role in:\n• Identifying undiagnosed HIV infection\n• Managing complications of chronic HIV and its treatment\n• Initiating [PEP](#/tree/pep) for potential exposures\n• Referring candidates for PrEP\n\n**Key first step:** Determine the patient\'s HIV disease status — this drives the entire differential diagnosis.',
    citation: [1, 2, 3],
    next: 'hiv-scenario',
    summary: 'Assess HIV status and presentation: new diagnosis, well-controlled, immunocompromised, or prevention',
  },

  {
    id: 'hiv-scenario',
    type: 'question',
    module: 1,
    title: 'Clinical Scenario',
    body: 'What brings this patient to the ED?',
    options: [
      {
        label: 'Known HIV — presenting with acute complaint',
        description: 'Assess disease control status, then complaint-driven workup',
        next: 'hiv-status-assess',
      },
      {
        label: 'Suspected acute HIV / seroconversion',
        description: 'Fever, rash, lymphadenopathy, recent exposure — no respiratory symptoms',
        next: 'hiv-seroconversion',
        urgency: 'urgent',
      },
      {
        label: 'Medication adverse effects / drug questions',
        description: 'ARV side effects, drug interactions, stopping therapy concerns',
        next: 'hiv-med-overview',
      },
      {
        label: 'HIV exposure / prevention (PEP or PrEP)',
        description: 'Sexual, needlestick, or other potential HIV exposure',
        next: 'hiv-prevention',
      },
      {
        label: 'Screening opportunity — patient may have undiagnosed HIV',
        description: 'Risk factors, STI diagnosis, or routine screening',
        next: 'hiv-screening',
      },
    ],
    summary: 'Determine clinical scenario to guide evaluation and management approach',
  },

  {
    id: 'hiv-status-assess',
    type: 'question',
    module: 1,
    title: 'HIV Disease Status Assessment',
    body: '**Ask the patient:**\n• Most recent CD4 count and viral load (or at least if VL is "undetectable")\n• Current antiretroviral medications and compliance\n• Prior opportunistic infections\n• Recent travel or sick contacts\n\nPatients unaware of their CD4/VL or not engaged in care should be considered at **higher risk** for OIs and complications of untreated infection. [4]\n\nCD4 counts and viral load can be ordered from the ED but results will typically not be available for real-time decision-making. An **absolute lymphocyte count <950 cells/mcL** may suggest CD4 <200, though guidelines do not advocate this as a reliable estimate. [5, 6]',
    citation: [4, 5, 6],
    options: [
      {
        label: 'Well-controlled (CD4 >200, undetectable VL, on HAART)',
        description: 'Treatment-adherent, engaged in care',
        next: 'hiv-well-controlled',
      },
      {
        label: 'Poorly controlled or unknown status',
        description: 'CD4 <200, detectable VL, not in care, nonadherent, or unknown values',
        next: 'hiv-immunocompromised',
        urgency: 'urgent',
      },
    ],
    summary: 'CD4 count and viral load guide risk stratification — CD4 <200 = AIDS, high OI risk',
  },

  {
    id: 'hiv-screening',
    type: 'info',
    module: 1,
    title: 'HIV Screening & Testing',
    body: '[HIV Testing & Screening Guide](#/info/hiv-testing-guide) — universal vs risk-based approach.\n\n**CDC (2006):** Routine opt-out HIV screening for ages 13-64 in healthcare settings where undiagnosed prevalence ≥0.1%. [3]\n**USPSTF (Grade A):** Routine screening ages 15-65. [7]\n**ACEP:** Endorsed ED HIV testing since 2007. [8]\n\n**High-risk patients who should NOT be missed:**\n• Sexually active MSM\n• Persons who inject drugs and their sex partners\n• Persons who exchange sex for money or drugs\n• Sex partners of HIV-infected persons\n• Patients with new STI diagnosis\n\n**Testing technology:**\n• **Fourth-generation (preferred):** Detects HIV antibody + p24 antigen — can identify infection as early as **2 weeks** post-exposure [9]\n• Rapid point-of-care tests available (fingerstick slightly less accurate than lab-based)\n• If acute infection suspected and 4th-gen test negative → **must send HIV viral load**\n\nA 2018 study of >200,000 ED patients showed 0.4% new-diagnosis yield with nontargeted 4th-gen screening, of which 14.5% were acute HIV. [9]',
    citation: [3, 7, 8, 9],
    next: 'hiv-scenario',
    summary: 'ED HIV screening: opt-out testing recommended for all adults 15-65 — 4th gen Ag/Ab preferred',
    skippable: true,
  },

  // =====================================================================
  // MODULE 2: ACUTE SEROCONVERSION & NEW DIAGNOSIS
  // =====================================================================

  {
    id: 'hiv-seroconversion',
    type: 'info',
    module: 2,
    title: 'Acute Retroviral Syndrome',
    body: '[Acute Seroconversion Features](#/info/hiv-seroconversion-features) — clinical presentation guide.\n\nAfter HIV exposure, local viral replication occurs over several days before entering the bloodstream with high viremia. **75-90% of patients** develop an acute illness during seroconversion. [1]\n\n**Classic presentation:**\n• Fever, headache, malaise\n• Sore throat (**without exudate**)\n• Lymphadenopathy (generalized)\n• GI symptoms (nausea, diarrhea)\n\n**More distinctive features:**\n• Genital or mucocutaneous ulcers\n• Nondescript **macular rash** (face, trunk, upper extremities) — mimics viral exanthem\n• **Notably absent:** respiratory or pulmonary symptoms\n\nCD4 count may drop acutely during seroconversion, rarely causing OIs (e.g., thrush). CD4 typically rebounds once the body gains some viral control.\n\nThe syndrome lasts **weeks** and patients frequently seek ED evaluation.',
    citation: [1],
    next: 'hiv-seroconversion-testing',
    summary: 'Acute seroconversion: fever + rash + lymphadenopathy WITHOUT respiratory symptoms — high viral load',
    safetyLevel: 'warning',
  },

  {
    id: 'hiv-seroconversion-testing',
    type: 'info',
    module: 2,
    title: 'Diagnosing Acute HIV',
    body: '**Diagnosis of acute seroconversion is challenging:**\n\n• Third-generation (antibody-only) tests may miss early infection — **no longer recommended as first-line**\n• **Fourth-generation tests** (antibody + p24 antigen) can often identify infection as early as **2 weeks** post-exposure — preferred initial test [9]\n• Early infection can still be missed within 2 weeks of exposure\n\n**Critical rule:** When acute infection is suspected and 4th-gen test is NEGATIVE → **order HIV viral load.** [9]\n\n**Why diagnosis matters:**\n• Patients with acute infection have **extremely high viral loads** and are more infectious than at any other stage\n• Identification allows prompt referral and rapid ART initiation\n• Undetectable = untransmittable (U=U) — the PARTNER 2 study showed zero transmissions when HIV+ partner had undetectable VL [10, 11]\n\n**Window periods:**\n• 4th-gen test: ~2 weeks\n• 3rd-gen antibody test: ~3-4 weeks\n• Viral load: ~10 days (earliest detection)',
    citation: [1, 9, 10, 11],
    next: 'hiv-new-diagnosis',
    summary: 'Standard antibody test may be negative early — order 4th gen Ag/Ab or viral load for acute infection',
    skippable: true,
  },

  {
    id: 'hiv-new-diagnosis',
    type: 'result',
    module: 2,
    title: 'New HIV Diagnosis — ED Management',
    body: '**Confirmed or highly suspected new HIV infection:**\n\n**Immediate actions:**\n• Baseline labs: CBC, BMP, hepatic function, CD4 count, viral load\n• Screen for co-infections: hepatitis B, hepatitis C, syphilis (RPR/VDRL), other STIs\n• Pregnancy test if applicable\n\n**Rapid ART initiation:**\nCurrent HHS and IAS-USA guidelines recommend **same-day initiation** of ART for newly diagnosed patients — reduces time to viral suppression and improves linkage to care. [12, 13]\n\nMost initial regimens use an **INSTI + 2 NRTIs:**\n• [Biktarvy](#/drug/biktarvy/hiv treatment) (BIC/FTC/TAF) — preferred single-tablet regimen\n• [TDF/FTC](#/drug/tdf-ftc/hiv prep) + [Dolutegravir](#/drug/dolutegravir/hiv pep)\n\n**ED role:**\n• Urgent referral to HIV specialist for same-day or next-day appointment\n• Ensure baseline labs are drawn\n• Counsel on transmission risk and safe practices\n• Document for linkage-to-care programs\n\n**If the patient has acute seroconversion illness,** treat symptoms supportively while expediting referral.',
    recommendation: 'Confirmed/suspected new HIV diagnosis. Draw baseline labs (CBC, BMP, LFTs, CD4, VL, HBV/HCV, syphilis, STI panel). Urgent referral to HIV specialist for same-day ART initiation. Counsel on transmission risk.',
    treatment: {
      firstLine: {
        drug: 'Biktarvy (bictegravir/emtricitabine/tenofovir alafenamide)',
        dose: '50mg/200mg/25mg',
        route: 'PO',
        frequency: 'Once daily',
        duration: 'Lifelong (initiate and refer to HIV specialist)',
        notes: 'Preferred single-tablet regimen. Take with or without food. Check renal function before starting.',
      },
      alternative: {
        drug: 'TDF/FTC + Dolutegravir',
        dose: 'TDF/FTC 300mg/200mg + Dolutegravir 50mg',
        route: 'PO',
        frequency: 'Once daily',
        duration: 'Lifelong (initiate and refer to HIV specialist)',
        notes: 'Alternative INSTI-based regimen. Review dolutegravir neural tube defect risk in women of childbearing potential.',
      },
      monitoring: 'HIV specialist follow-up within 24-48 hours. Baseline and 2-4 week labs: CBC, BMP, LFTs, CD4, viral load. Adherence counseling critical.',
    },
    confidence: 'recommended',
    citation: [1, 12, 13],
    summary: 'New HIV diagnosis in ED: baseline labs, PCP referral within 72h, consider same-day ART start',
  },

  // =====================================================================
  // MODULE 3: WELL-CONTROLLED HIV — COMPLAINT-DRIVEN MANAGEMENT
  // =====================================================================

  {
    id: 'hiv-well-controlled',
    type: 'question',
    module: 3,
    title: 'Well-Controlled HIV — Chief Complaint',
    body: 'Patients with **well-controlled HIV** (CD4 >200, undetectable VL, treatment-adherent) are living longer and now present with **typical diseases of aging**, adverse medication effects, and chronic inflammatory state complications rather than OIs. [14]\n\nTreat these patients similarly to immunocompetent individuals, with attention to:\n• Higher baseline cardiovascular risk\n• Chronic inflammatory state → hypercoagulability\n• Medication side effects and interactions\n\nWhat is the primary complaint?',
    citation: [14],
    options: [
      {
        label: 'Respiratory (cough, dyspnea, chest pain)',
        description: 'Pneumonia, COPD, PE risk',
        next: 'hiv-respiratory',
      },
      {
        label: 'Cardiovascular (chest pain, edema, syncope)',
        description: 'ACS, heart failure, VTE — increased risk',
        next: 'hiv-cardiovascular',
      },
      {
        label: 'Neurologic (headache, weakness, cognitive changes)',
        description: 'Stroke risk, HAND, low threshold for imaging',
        next: 'hiv-neuro',
      },
      {
        label: 'GI / Hepatobiliary (diarrhea, abdominal pain, jaundice)',
        description: 'Medication-related diarrhea most common; HCV co-infection',
        next: 'hiv-gi',
      },
      {
        label: 'Renal (flank pain, hematuria, AKI)',
        description: 'TDF nephrotoxicity, PI radiolucent stones',
        next: 'hiv-renal',
      },
      {
        label: 'Other systems (heme, endocrine, MSK, psych, derm)',
        description: 'Cytopenias, metabolic syndrome, fracture risk, psychiatric comorbidities',
        next: 'hiv-other-systems',
      },
      {
        label: 'Generalized weakness / unclear etiology',
        description: 'Broad differential — common presentation in HIV patients',
        next: 'hiv-weakness',
      },
    ],
    summary: 'Well-controlled HIV patients have unique complications: CV, renal, neuro, metabolic — not just OIs',
  },

  {
    id: 'hiv-respiratory',
    type: 'info',
    module: 3,
    title: 'Respiratory Complaints — Well-Controlled HIV',
    body: '**Well-controlled HIV patients** develop **traditional pulmonary infections** of immunocompetent patients. **Streptococcus pneumoniae** is the most common cause of bacterial pneumonia — treatment does not differ from non-HIV patients. [15, 16]\n\n**Disposition** can mirror practice for non-HIV patients, as well-controlled patients have similar pneumonia mortality. CURB-65 can be applied, though one small study found higher mortality with scores ≥2 AND CD4 <200. [17]\n\n**COPD** is an increasing concern:\n• HIV patients smoke at **2× the rate** of the general population [18]\n• Lung injury from prior OIs and drug effects contribute\n• Chronic HIV may be an independent risk factor [19]\n• Treatment is the same as for non-HIV patients\n\n**Venous thromboembolism / PE:**\n• Chronic inflammatory state → **hypercoagulability** → higher VTE rates [20, 21]\n• Consider PE with pleuritic chest pain, dyspnea — even if COPD is known\n• PERC criteria may not be validated for HIV patients (HIV status not reported in original study)\n\n**Key pitfall:** Do not anchor on COPD for an HIV patient with pleuritic chest pain — consider PE.',
    citation: [15, 16, 17, 18, 19, 20, 21],
    next: 'hiv-disposition',
    summary: 'Respiratory complaints: community-acquired pneumonia more common than PJP in controlled HIV',
    skippable: true,
  },

  {
    id: 'hiv-cardiovascular',
    type: 'info',
    module: 3,
    title: 'Cardiovascular Disease in HIV',
    body: 'HIV patients have **increased cardiovascular risk** from multiple factors: traditional risk factors, chronic inflammatory state, and medication effects (metabolic syndrome, abacavir MI association). [22, 23]\n\n**Acute coronary syndromes:**\n• HIV and some treatments are associated with CAD **absent traditional risk factors**\n• Abacavir has been associated with MI in retrospective studies (not yet confirmed prospectively) [24, 25]\n• Do NOT dismiss ACS in younger HIV patients — age alone does not rule it out\n\n**Heart failure:**\n• Prevalence 7.2% in HIV vs 4.4% in controls (P <.0001) [26]\n• Hazard ratio 3.2 for developing HF compared to non-HIV patients [27]\n• Only slightly lower rates even in patients on ARVs\n\n**Venous thromboembolism:**\n• 2.6 per 1000 patient-years [28]\n• Risk factors: CD4 <200, VL >100,000, current/recent OIs [29]\n• Chronic inflammatory state is the primary driver\n\n**Management:** Standard evidence-based protocols. Be aware of **drug interactions** between ARVs and anticoagulants, statins, and antiarrhythmics — especially with PI-based regimens.',
    citation: [22, 23, 24, 25, 26, 27, 28, 29],
    next: 'hiv-disposition',
    summary: 'HIV patients have 2x MI risk — PIs cause metabolic syndrome, consider ACS evaluation',
    skippable: true,
  },

  {
    id: 'hiv-neuro',
    type: 'info',
    module: 3,
    title: 'Neurologic Complaints in HIV',
    body: '**Guide evaluation by CD4 count.** Even well-controlled HIV carries slightly higher cerebrovascular risk.\n\n**Stroke:**\n• Risk ratio **2.56** (95% CI 1.43-4.61) compared to non-HIV [30]\n• Multifactorial: inflammatory state, atherosclerosis, smoking, metabolic medication effects\n• Follow standard evidence-based stroke algorithms\n\n**HIV-associated neurocognitive disorder (HAND):**\n• Most frequently identified neurologic disorder in HIV\n• Subacute cognitive deficits, central motor abnormalities, behavioral changes\n• Does NOT meet criteria for dementia\n• Rates decrease with longer periods of undetectable virus [31]\n\n**CNS OIs** (toxo, crypto, PML) are rare with well-controlled disease but increase dramatically with CD4 <200 → see [Immunocompromised pathway](#/node/hiv-cns-oi)\n\n**Imaging considerations:**\n• Immunocompetent HIV patient with headache probably does not need CT\n• But if CD4 is decreasing → CNS OIs and malignancy risk increases → neuroimaging indicated\n• CT may require **contrast** to identify infections or lymphoma\n• MRI provides better identification of smaller lesions and leptomeningeal enhancement\n• LP required if meningitis suspected',
    citation: [30, 31],
    next: 'hiv-disposition',
    summary: 'Neuro complaints: HAND (HIV-associated neurocognitive disorder), also stroke risk increased',
    skippable: true,
  },

  {
    id: 'hiv-gi',
    type: 'info',
    module: 3,
    title: 'GI & Hepatobiliary Complaints',
    body: '**Diarrhea** is one of the most common HIV presentations in the ED. Up to **60% of patients on treatment** report an episode in the prior month. [32]\n\n**In well-controlled patients, OIs are rarely the cause.** More common etiologies:\n• **Medication side effect** — leading diagnosis for isolated diarrhea [33]\n• HIV enteropathy\n• Same pathogens that affect non-HIV individuals\n\n**Critical exception: C. difficile** — more common in HIV than non-HIV patients. Careful history for recent antibiotics or hospitalizations. [34]\n\n**Hepatobiliary disease:**\n• **61% of HIV patients are co-infected with HCV** in a large US analysis [35]\n• 10% co-infected with HBV [36]\n• Nearly all ARVs have hepatotoxicity potential, worsened by viral hepatitis co-infection\n• ED visit is an opportunity to **screen for HCV** in HIV patients not previously tested\n\n**Atazanavir** (PI) inhibits UDP-glucuronosyltransferase → **indirect hyperbilirubinemia and jaundice** — benign, resolves when drug is stopped.\n\n**Key pitfall:** Do not assume diarrhea is always a medication side effect — exclude C. difficile and assess for red flags.',
    citation: [32, 33, 34, 35, 36],
    next: 'hiv-disposition',
    summary: 'GI issues common — consider medication side effects and opportunistic infections if CD4 low',
    skippable: true,
  },

  {
    id: 'hiv-renal',
    type: 'info',
    module: 3,
    title: 'Renal Disease in HIV',
    body: 'Renal disease can be caused by HIV infection itself AND nephrotoxic medications.\n\n**Tenofovir disoproxil fumarate (TDF) nephrotoxicity:**\n• Can cause **Fanconi syndrome** — polyuria, polydipsia, dehydration [37]\n• Labs: elevated creatinine, reduced GFR, acidemia, hypochloremia, hypokalemia, hypophosphatemia\n• UA: glucosuria, proteinuria\n• Higher risk in patients with pre-existing renal impairment\n• **TAF (tenofovir alafenamide)** has reduced risk — better renal biomarkers out to 144 weeks [38]\n• Withhold TDF and other nephrotoxins (e.g., ibuprofen) while resuscitating\n\n**PI-associated nephrolithiasis (CRITICAL for ED):**\n• [Atazanavir](#/drug/atazanavir/nephrolithiasis) and indinavir cause kidney stones\n• PIs have poor solubility + significant urinary excretion → stone formation\n• **Stones are RADIOLUCENT** if composed purely of drug metabolites [39, 40]\n• May NOT be visible on standard noncontrast CT\n• Look for **secondary signs**: hydroureter, perinephric stranding\n• If ongoing symptoms → urology consult for ureteroscopy\n• Discuss with HIV provider regarding medication adjustment\n\n**AKI treatment** is the same as for non-HIV patients.',
    citation: [37, 38, 39, 40],
    next: 'hiv-disposition',
    summary: 'HIV nephropathy and tenofovir nephrotoxicity — check creatinine and urinalysis',
    skippable: true,
  },

  {
    id: 'hiv-other-systems',
    type: 'info',
    module: 3,
    title: 'Other System Complications',
    body: '[HIV System-Based Complications](#/info/hiv-system-complications) — comprehensive reference.\n\n**Hematologic:**\n• Cytopenias of all cell lines common — bone marrow suppression in uncontrolled HIV\n• Medication-induced anemia often macrocytic (diagnosis of exclusion) [28]\n• Higher VTE rates (2.6/1000 patient-years)\n• Evaluate for thrombotic thrombocytopenic purpura (TTP) if hemolytic anemia + thrombocytopenia [41]\n\n**Endocrine & Metabolic:**\n• Metabolic syndrome: dyslipidemia, insulin resistance, truncal obesity (HIV-associated lipodystrophy) [42, 43]\n• Thyrotoxicosis/Graves disease with immune reconstitution (IRIS) — 8-33 months after starting HAART [44]\n• Glucocorticoid deficiency from adrenal involvement in AIDS — consider in hypotensive AIDS patients\n• Diabetes: both ARVs (especially PIs) and chronic inflammation increase risk [45]\n\n**Musculoskeletal:**\n• Lower bone mineral density → increased **fracture risk** [46, 47]\n• Higher rates of **avascular necrosis** — HIV and ARVs both implicated\n• As CD4 drops: spinal infections, osteomyelitis, discitis, atypical organisms (TB, NTM) [48]\n\n**Psychiatric:**\n• Depression, anxiety, substance use disorders are highly prevalent [49]\n• **Demoralization syndrome** — similar to depression but without anhedonia; does NOT respond to antidepressants\n• New-onset mania → evaluate for organic etiology (especially in untreated disease)\n• Screen all HIV patients for suicidal/homicidal ideation\n\n**Dermatologic:**\n• Drug-related skin reactions common → medication noncompliance [50]\n• Folliculitis (MRSA most common pathogen), HSV, HPV warts, seborrheic dermatitis, molluscum\n• Disseminated VZV in poorly controlled HIV — can cross dermatomes, may be superinfected',
    citation: [28, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    next: 'hiv-disposition',
    summary: 'Endocrine, MSK, psych, derm complications common in long-term HIV — screen broadly',
    skippable: true,
  },

  {
    id: 'hiv-weakness',
    type: 'info',
    module: 3,
    title: 'Weakness in HIV — Broad Differential',
    body: '**Weakness is one of the most challenging presentations** in HIV patients.\n\nCommon causes of weakness in non-HIV patients are also common in HIV:\n• **Sepsis** — from any source\n• **Metabolic:** Hypoglycemia, electrolyte derangements (K+, Ca2+, Na+)\n• **Carbon monoxide poisoning** (in winter months)\n• **Anemia** — medication-induced or HIV-related\n\n**HIV-specific considerations:**\n• **OIs** (if CD4 <200 or unknown) — PJP, TB, disseminated MAC\n• **Medication adverse effects** — lactic acidosis (rare with current NRTIs), Fanconi syndrome (TDF)\n• **Adrenal insufficiency** — consider in AIDS patients with hypotension\n• **Malignancy** — lymphoma, Kaposi sarcoma\n\n**Workup:**\n• CBC, BMP (glucose, K+, Ca2+, Na+), hepatic function, lactate, VBG\n• If CD4 unknown or <200: expand workup (cultures, CXR, CT as indicated)\n• Consider serum lactic acid if anion gap metabolic acidosis or severe illness\n• CD4 and viral load (results not available for ED decisions but guide outpatient management)\n\n**HIV patients receive ~4.5 lab tests per ED visit** compared to 3.5 for non-HIV patients. [4]',
    citation: [4, 14],
    next: 'hiv-disposition',
    summary: 'Weakness in HIV: GBS, myopathy (AZT), neuropathy, or deconditioning — workup based on pattern',
    skippable: true,
  },

  // =====================================================================
  // MODULE 4: IMMUNOCOMPROMISED — LOW CD4 / NOT IN CARE
  // =====================================================================

  {
    id: 'hiv-immunocompromised',
    type: 'question',
    module: 4,
    title: 'Immunocompromised HIV — OI Risk Assessment',
    body: 'Patient has **CD4 <200, detectable viral load, not in care, or unknown status.** These patients are at risk for opportunistic infections AND chronic disease complications.\n\n**AIDS** is defined by CD4 <200 cells/mcL OR development of certain OIs or cancers.\n\n**After acute illness, untreated HIV has ~8-10 years of clinical latency** before AIDS develops. Many remain asymptomatic but have lymphadenopathy. Chronic untreated infection causes a persistent inflammatory state predisposing to CAD, VTE, and COPD. [1]\n\nWhat is the primary concern?',
    citation: [1],
    options: [
      {
        label: 'Respiratory (cough, dyspnea, fever)',
        description: 'PJP, TB, atypical pneumonia — high suspicion if CD4 <200',
        next: 'hiv-pulm-oi',
        urgency: 'urgent',
      },
      {
        label: 'Neurologic (headache, focal deficits, AMS)',
        description: 'Toxo, cryptococcal meningitis, PML, CNS lymphoma',
        next: 'hiv-cns-oi',
        urgency: 'urgent',
      },
      {
        label: 'GI (diarrhea, abdominal pain)',
        description: 'C. difficile, CMV, Cryptosporidium, MAC (if CD4 very low)',
        next: 'hiv-gi-oi',
      },
      {
        label: 'General / constitutional / other',
        description: 'Fever, weight loss, cytopenias, skin findings',
        next: 'hiv-other-oi',
      },
    ],
    summary: 'CD4 <200: evaluate for PJP, toxo, crypto, CMV, MAC — OI risk by CD4 threshold guides workup',
    safetyLevel: 'warning',
  },

  {
    id: 'hiv-pulm-oi',
    type: 'info',
    module: 4,
    title: 'Pulmonary OIs — PJP, TB, Atypical Infections',
    body: '**Pneumocystis jirovecii pneumonia (PJP):**\n• Classic: indolent, **nonproductive cough** + exertional dyspnea\n• CXR: perihilar or **"batwing" infiltrate** (see image below)\n• **LDH typically elevated** — a normal LDH helps rule OUT PJP [51]\n• LDH is not specific (elevated in lymphoma, TB, toxoplasmosis)\n• Prophylaxis: [TMP-SMX](#/drug/tmp-smx/pjp prophylaxis) when CD4 <200\n\n**Tuberculosis:**\n• HIV patients at increased risk for both novel infection and reactivation\n• Risk increases with poorly controlled infection\n• In the US, most common in persons who inject drugs\n• Consider in any HIV patient with cough, fever, weight loss, night sweats\n\n**With disease progression and advanced immunosuppression:**\n• At risk for drug-resistant and atypical organisms\n• Consider expanding antibiotic coverage\n• Consult infectious disease\n\n**Treatment for common pneumonias** (Strep. pneumoniae) is the same as for non-HIV patients. [15, 16]',
    citation: [15, 16, 51],
    treatment: {
      firstLine: {
        drug: 'TMP-SMX (trimethoprim-sulfamethoxazole)',
        dose: 'TMP 15-20 mg/kg/day (SMX 75-100 mg/kg/day)',
        route: 'IV or PO',
        frequency: 'Divided q6-8h',
        duration: '21 days for PJP treatment',
        notes: 'Add prednisone if PaO2 <70 mmHg or A-a gradient >35: 40mg BID x5d, then 40mg daily x5d, then 20mg daily x11d. For prophylaxis (CD4 <200): TMP-SMX DS 1 tab daily or 1 SS daily.',
      },
      alternative: {
        drug: 'Pentamidine or Atovaquone',
        dose: 'Pentamidine 4 mg/kg IV daily OR Atovaquone 750 mg PO BID',
        route: 'IV (pentamidine) or PO (atovaquone)',
        frequency: 'Daily (pentamidine) or BID (atovaquone)',
        duration: '21 days',
        notes: 'Use for TMP-SMX allergy or intolerance. Pentamidine has significant toxicity (hypoglycemia, nephrotoxicity, pancreatitis). Atovaquone only for mild-moderate PJP.',
      },
      monitoring: 'Daily respiratory status, oxygen requirements. CBC, BMP, LFTs. Monitor for TMP-SMX adverse effects (rash, cytopenias, hyperkalemia). ID consultation for all suspected PJP.',
    },
    images: [
      {
        src: 'images/hiv/pjp-cxr.png',
        alt: 'Chest X-ray showing bilateral perihilar "batwing" infiltrates characteristic of Pneumocystis jirovecii pneumonia (PJP)',
        caption: 'PJP: Bilateral perihilar "batwing" infiltrates in an immunocompromised HIV patient',
      },
    ],
    next: 'hiv-immunocompromised-disposition',
    summary: 'PJP: bilateral ground-glass opacities, LDH elevated, hypoxia with exertion — TMP-SMX + steroids if PaO2 <70',
    safetyLevel: 'warning',
  },

  {
    id: 'hiv-cns-oi',
    type: 'info',
    module: 4,
    title: 'CNS Opportunistic Infections',
    body: 'CNS OIs typically do **not appear until CD4 <200.** Rates have decreased significantly with treatment adherence.\n\n**Toxoplasmosis:**\n• Ring-enhancing mass lesion(s) on contrast CT or MRI\n• Fever, headache, focal neurologic deficits, seizures\n• Most common CNS mass lesion in AIDS\n\n**Cryptococcal meningitis:**\n• Subacute headache, fever, meningismus\n• May have only headache with subtle findings\n• LP with opening pressure (often elevated), CSF cryptococcal antigen, India ink\n\n**Progressive multifocal leukoencephalopathy (PML):**\n• JC virus — progressive white matter lesions\n• Subacute cognitive decline, focal deficits without fever\n• No effective antiviral — treatment is immune reconstitution with ART\n\n**CNS lymphoma:**\n• Ring-enhancing lesion (can mimic toxoplasmosis)\n• Often periventricular\n\n**Imaging considerations:**\n• **Nonenhanced CT may miss lesions** — contrast required\n• **MRI is superior** for smaller lesions and leptomeningeal enhancement\n• LP required for suspected meningitis/encephalitis\n\n**Key pitfall:** Do not accept a normal nonenhanced CT in an immunocompromised patient with neurologic symptoms — get contrast or MRI.',
    citation: [1, 30],
    treatment: {
      firstLine: {
        drug: 'Pyrimethamine + Sulfadiazine + Leucovorin (Toxoplasmosis)',
        dose: 'Pyrimethamine 200mg load then 50-75mg/d + Sulfadiazine 1-1.5g q6h + Leucovorin 10-25mg/d',
        route: 'PO',
        frequency: 'Daily (pyrimethamine/leucovorin), q6h (sulfadiazine)',
        duration: '6 weeks minimum, then maintenance',
        notes: 'Empiric treatment for ring-enhancing lesions in AIDS. Clinical/radiologic response expected in 2 weeks. If no response, consider biopsy to rule out lymphoma.',
      },
      alternative: {
        drug: 'Amphotericin B + Flucytosine (Cryptococcal meningitis)',
        dose: 'Liposomal amphotericin B 3-4 mg/kg/d + Flucytosine 25 mg/kg q6h',
        route: 'IV (amphotericin) + PO (flucytosine)',
        frequency: 'Daily (amphotericin), q6h (flucytosine)',
        duration: 'Induction 2 weeks, then fluconazole consolidation 8 weeks',
        notes: 'Opening pressure management critical - serial LPs or drain if OP >25 cm H2O. After induction: Fluconazole 400mg daily x8 wks, then 200mg daily maintenance.',
      },
      monitoring: 'ID consultation required. Daily neuro checks. Serial LPs for cryptococcal meningitis (opening pressure). CBC, renal function, LFTs. MRI at 2 weeks for toxo response assessment.',
    },
    next: 'hiv-immunocompromised-disposition',
    summary: 'Toxoplasmosis (ring-enhancing lesions) vs CNS lymphoma (PET/thallium scan differentiates)',
    safetyLevel: 'warning',
  },

  {
    id: 'hiv-gi-oi',
    type: 'info',
    module: 4,
    title: 'GI Opportunistic Infections',
    body: 'As CD4 drops, GI OI risk increases significantly.\n\n**C. difficile** — more common in HIV vs non-HIV patients regardless of CD4 count. Careful history: recent antibiotics, hospitalizations. [34]\n\n**With progressive immunosuppression (CD4 <100-200):**\n• **Cryptosporidium** — watery diarrhea, can be chronic/severe\n• **Cytomegalovirus (CMV)** — bloody diarrhea, colitis, can cause perforation\n• **Microsporidiosis** — chronic watery diarrhea\n• **Mycobacterium avium complex (MAC)** — fever, weight loss, diarrhea, hepatosplenomegaly (usually CD4 <50)\n\n**Stool studies** guided by disease stage:\n• All patients: C. difficile toxin, bacterial cultures, ova/parasites\n• Immunosuppressed: add AFB stool culture, Cryptosporidium antigen, microsporidium stain, CMV evaluation\n\n**Key point:** Initiation of ART to restore GI immune function will help eradicate many of these OIs. Link patients to HIV care.\n\n**Hepatobiliary OIs:**\n• Acalculous cholecystitis (CMV, Cryptosporidium)\n• MAC hepatitis\n• Peliosis hepatis (Bartonella)',
    citation: [1, 33, 34],
    treatment: {
      firstLine: {
        drug: 'Vancomycin (C. difficile) or Ganciclovir (CMV colitis)',
        dose: 'Vancomycin 125mg PO q6h OR Ganciclovir 5 mg/kg IV q12h',
        route: 'PO (vancomycin) or IV (ganciclovir)',
        frequency: 'q6h (vancomycin) or q12h (ganciclovir)',
        duration: 'Vancomycin 10-14 days; Ganciclovir 21-42 days',
        notes: 'For severe C. diff: Vancomycin 500mg PO q6h + Metronidazole 500mg IV q8h. CMV colitis: Continue until endoscopic resolution. Foscarnet alternative if ganciclovir-resistant.',
      },
      alternative: {
        drug: 'Azithromycin + Ethambutol (MAC)',
        dose: 'Azithromycin 500-600mg + Ethambutol 15 mg/kg',
        route: 'PO',
        frequency: 'Once daily',
        duration: 'Lifelong until immune reconstitution (CD4 >100 for >6 months)',
        notes: 'For disseminated MAC (CD4 <50). Add rifabutin for severe disease. ART initiation is essential for clearance. MAC prophylaxis: Azithromycin 1200mg weekly if CD4 <50.',
      },
      monitoring: 'ID consultation. Stool studies, C. diff toxin. CMV viral load for CMV disease. Blood cultures for MAC (AFB). Monitor for ganciclovir myelosuppression.',
    },
    next: 'hiv-immunocompromised-disposition',
    summary: 'Cryptosporidium, CMV colitis, MAC — stool studies and colonoscopy based on CD4 and symptoms',
    skippable: true,
  },

  {
    id: 'hiv-other-oi',
    type: 'info',
    module: 4,
    title: 'Other OIs & Complications of Advanced HIV',
    body: '**Constitutional symptoms:**\n• Fever, weight loss, night sweats → evaluate for disseminated MAC, TB, lymphoma\n• Pancytopenia from bone marrow suppression\n\n**Dermatologic:**\n• **Kaposi sarcoma** — purple-red nodular lesions (HHV-8 associated)\n• Disseminated VZV — can cross dermatomes, may be superinfected\n• Severe molluscum contagiosum, extensive seborrheic dermatitis\n• Oral hairy leukoplakia (EBV — cannot be scraped off, unlike thrush)\n\n**Ocular:**\n• **CMV retinitis** (CD4 <50) — "pizza pie" fundoscopy, painless vision loss\n• Refer urgently to ophthalmology\n\n**Oropharyngeal:**\n• Oral candidiasis (thrush) — suggests CD4 <200\n• Oral hairy leukoplakia\n• Aphthous ulcers\n\n**When to strongly consider AIDS:**\n• CD4 <200 (by definition) or CD4 unknown\n• Any OI or AIDS-defining cancer\n• Recurrent bacterial pneumonia\n• Cervical cancer, lymphoma\n\n**All immunocompromised patients need:**\n• Comprehensive physical exam including oral mucosa and skin\n• Low threshold for imaging\n• Infectious disease consultation',
    citation: [1, 14],
    treatment: {
      firstLine: {
        drug: 'Fluconazole (Oropharyngeal Candidiasis)',
        dose: '100-200 mg',
        route: 'PO',
        frequency: 'Once daily',
        duration: '7-14 days',
        notes: 'For oral thrush. Esophageal candidiasis: 200-400mg daily x14-21 days. Clotrimazole troches 10mg 5x/day is alternative for mild oropharyngeal disease.',
      },
      alternative: {
        drug: 'Valganciclovir or IV Ganciclovir (CMV Retinitis)',
        dose: 'Valganciclovir 900mg PO BID or Ganciclovir 5 mg/kg IV q12h',
        route: 'PO (valganciclovir) or IV (ganciclovir)',
        frequency: 'BID (induction)',
        duration: 'Induction 14-21 days, then maintenance valganciclovir 900mg daily',
        notes: 'CMV retinitis is sight-threatening emergency. Urgent ophthalmology referral. Intravitreal ganciclovir/foscarnet for immediate sight-threatening lesions. ART initiation essential.',
      },
      monitoring: 'Ophthalmology consultation for suspected CMV retinitis. ID consultation for all OIs. Weekly dilated fundoscopic exams during induction for CMV. Monitor for ganciclovir myelosuppression.',
    },
    next: 'hiv-immunocompromised-disposition',
    summary: 'CMV retinitis (CD4 <50), cryptococcal meningitis, disseminated MAC — systemic approach by CD4',
    skippable: true,
  },

  {
    id: 'hiv-immunocompromised-disposition',
    type: 'result',
    module: 4,
    title: 'Immunocompromised HIV — Disposition',
    body: '**Low threshold for admission** in immunocompromised HIV patients.\n\n**Admit if:**\n• Suspected or confirmed OI requiring inpatient treatment (PJP, cryptococcal meningitis, toxoplasmosis, CMV)\n• Hemodynamic instability, sepsis\n• CNS symptoms with abnormal imaging or LP\n• Inability to tolerate oral medications or nutrition\n• Social barriers to outpatient follow-up\n\n**If discharging:**\n• Urgent follow-up with HIV specialist or infectious disease (within 24-72 hours)\n• Ensure patient has access to medications\n• Emphasize linkage to care — this is a critical opportunity\n• Start or resume OI prophylaxis if indicated ([TMP-SMX](#/drug/tmp-smx/pjp prophylaxis) for CD4 <200)\n\n**Do NOT stop HAART** for GI side effects or most complaints — viral resistance develops with inconsistent compliance. Very few scenarios warrant stopping: **Stevens-Johnson syndrome** and **nevirapine-associated hepatic failure** are clear indications. [1]\n\n**Involve the patient\'s HIV provider** or ID consultant in all decisions to modify or stop ART.',
    recommendation: 'Low admission threshold for immunocompromised HIV patients. Consult ID for suspected OIs. Do NOT stop HAART without specialist guidance. Ensure linkage to HIV care on discharge.',
    treatment: {
      firstLine: {
        drug: 'TMP-SMX (OI Prophylaxis)',
        dose: '1 double-strength tablet (160mg TMP/800mg SMX)',
        route: 'PO',
        frequency: 'Once daily',
        duration: 'Until CD4 >200 for 3+ months on ART',
        notes: 'Start/resume if CD4 <200. Provides prophylaxis for PJP and Toxoplasmosis. Alternative: Dapsone 100mg daily or Atovaquone 1500mg daily (for TMP-SMX allergy).',
      },
      alternative: {
        drug: 'Fluconazole + Azithromycin (additional OI prophylaxis)',
        dose: 'Fluconazole 100-200mg daily + Azithromycin 1200mg weekly',
        route: 'PO',
        frequency: 'Fluconazole daily; Azithromycin weekly',
        duration: 'Fluconazole: CD4 <100-150 until immune reconstitution; Azithromycin: CD4 <50 until >100 for 3+ months',
        notes: 'Fluconazole for recurrent mucocutaneous candidiasis or cryptococcal meningitis secondary prophylaxis. Azithromycin for MAC prophylaxis if CD4 <50.',
      },
      monitoring: 'Ensure patient has HIV specialist follow-up within 1-2 weeks. Continue home HAART. Monitor for OI symptoms. CD4 and viral load for outpatient management.',
    },
    confidence: 'recommended',
    citation: [1, 14],
    summary: 'Admit for new OIs, severe presentations, or inability to take PO — avoid IRIS if starting ART',
  },

  // =====================================================================
  // MODULE 5: MEDICATION EFFECTS
  // =====================================================================

  {
    id: 'hiv-med-overview',
    type: 'question',
    module: 5,
    title: 'Antiretroviral Drug Classes',
    body: '[ARV Drug Classes & Side Effects](#/info/hiv-arv-classes) — comprehensive reference table.\n\nMost current regimens use an **INSTI + 2 NRTIs** (e.g., Biktarvy). INSTI-based regimens are preferred for tolerability, reduced pill burden, and faster viral suppression. [12, 13]\n\nWhich drug class or concern?',
    citation: [12, 13],
    options: [
      {
        label: 'NRTI / NtRTI effects',
        description: 'Tenofovir (Fanconi, bone loss), abacavir (hypersensitivity, MI), lactic acidosis, HBV flare',
        next: 'hiv-nrti-effects',
      },
      {
        label: 'NNRTI effects',
        description: 'Efavirenz (neuropsych), SJS/TEN, hepatotoxicity (nevirapine)',
        next: 'hiv-nnrti-effects',
      },
      {
        label: 'PI effects',
        description: 'Radiolucent stones, metabolic syndrome, jaundice (atazanavir), drug interactions',
        next: 'hiv-pi-effects',
      },
      {
        label: 'INSTI & other classes',
        description: 'Generally well-tolerated; dolutegravir neural tube concern; entry inhibitors',
        next: 'hiv-insti-effects',
      },
      {
        label: 'HBV reactivation / stopping therapy',
        description: 'Tenofovir, emtricitabine, lamivudine — risk of fatal HBV flare on discontinuation',
        next: 'hiv-hbv-caution',
        urgency: 'urgent',
      },
      {
        label: 'Drug-drug interactions',
        description: 'CYP3A4 interactions with PIs/cobicistat — anticoagulants, statins, antiarrhythmics',
        next: 'hiv-drug-interactions',
      },
    ],
    summary: '5 ARV drug classes — ED-relevant adverse effects and drug interactions for each class',
    skippable: true,
  },

  {
    id: 'hiv-nrti-effects',
    type: 'info',
    module: 5,
    title: 'NRTI / NtRTI Adverse Effects',
    body: 'NRTIs/NtRTIs inhibit reverse transcription of HIV RNA into DNA. Current drugs are relatively well tolerated. [12]\n\n**Tenofovir disoproxil fumarate (TDF):**\n• **Fanconi syndrome** — polyuria, polydipsia, dehydration, elevated creatinine [37]\n• Labs: acidemia, hypokalemia, hypophosphatemia, glucosuria, proteinuria\n• Bone density loss and fractures\n• **TAF** (tenofovir alafenamide) has reduced renal and bone toxicity [38]\n\n**Abacavir:**\n• **Hypersensitivity reaction** in 3-5% — fever, rash, GI/respiratory symptoms, usually within first 6 weeks [52]\n• Associated with **HLA-B*5701 allele** — screening is mandatory before starting\n• If HLA-B*5701 positive → abacavir is **contraindicated**\n• **NEVER rechallenge** after hypersensitivity — can be fatal\n• Retrospective association with **myocardial infarction** (not confirmed prospectively) [24, 25]\n\n**Class effects (rare with current drugs):**\n• GI upset, nausea, headache, insomnia\n• Lactic acidosis — extremely rare with current regimens\n• Transaminitis — rare\n\n**For PrEP:** Both TDF/FTC and TAF/FTC are FDA-approved. TAF/FTC is NOT approved for use in heterosexual women (not studied). [53, 54]',
    citation: [12, 24, 25, 37, 38, 52, 53, 54],
    next: 'hiv-med-overview',
    summary: 'NRTIs: lactic acidosis (rare but fatal), tenofovir renal toxicity, AZT myelosuppression',
    skippable: true,
  },

  {
    id: 'hiv-nnrti-effects',
    type: 'info',
    module: 5,
    title: 'NNRTI Adverse Effects',
    body: 'NNRTIs directly bind and inactivate HIV reverse transcriptase. Examples: efavirenz, rilpivirine, doravirine, nevirapine, etravirine.\n\n**Efavirenz — neuropsychiatric effects:**\n• Vivid dreams, nightmares, insomnia, confusion (often resolve after first weeks) [55]\n• **Severe cases:** psychosis, suicidal ideation, attempted/completed suicide\n• **Immediate discontinuation** if severe psychosis or suicidality\n• Often avoided in patients with psychiatric history\n• Rilpivirine: may cause insomnia/depression but lower risk than efavirenz [13]\n\n**Doravirine (newest NNRTI):**\n• Fewer CNS adverse events than efavirenz [56, 57]\n• Favorable lipid profile\n• Most commonly used in treatment-experienced patients with limited options\n\n**Skin reactions (all NNRTIs):**\n• Rash, GI upset, headache, dizziness — common\n• Infrequently: **Stevens-Johnson syndrome, toxic epidermal necrolysis, erythema multiforme** (more common with nevirapine)\n\n**Nevirapine — hepatotoxicity:**\n• FDA black box warning (2000)\n• Most frequent in first 6 weeks\n• Higher risk: chronic hepatitis, female CD4 >250, male CD4 >400 [12, 13]\n• Can cause liver failure',
    citation: [12, 13, 55, 56, 57],
    next: 'hiv-med-overview',
    summary: 'NNRTIs: hepatotoxicity (nevirapine), neuropsychiatric effects (efavirenz), rash',
    skippable: true,
  },

  {
    id: 'hiv-pi-effects',
    type: 'info',
    module: 5,
    title: 'Protease Inhibitor Adverse Effects',
    body: 'PIs prevent cleavage of essential polyproteins needed for mature HIV virion production. Most common today: **atazanavir** and **darunavir**, used with a booster (low-dose ritonavir or cobicistat). [13]\n\n**Common side effects:** Nausea, diarrhea, abdominal discomfort.\n\n**Metabolic effects:**\n• Lipodystrophy (central fat accumulation, peripheral wasting)\n• Dyslipidemia, hypertriglyceridemia\n• Type 2 diabetes (less common with lower-dose ritonavir boosting)\n• Rarely: pancreatitis from hypertriglyceridemia\n\n**[Atazanavir](#/drug/atazanavir/hiv jaundice):**\n• Inhibits UDP-glucuronosyltransferase → **indirect hyperbilirubinemia and jaundice** — benign, resolves on discontinuation\n• **RADIOLUCENT kidney stones** — PIs have poor solubility and significant urinary excretion [39, 40]\n• Stones may NOT be seen on noncontrast CT — look for hydroureter, perinephric stranding\n• Requires **acidic environment** for absorption → PPIs and H2 blockers may interfere\n\n**Drug interactions (CRITICAL):**\n• PIs (especially boosted with ritonavir/cobicistat) inhibit **CYP3A4** → major interactions with anticoagulants, statins, corticosteroids, antiarrhythmics, antiepileptics, antidepressants [13]\n• Much higher interaction risk than INSTI or NNRTI regimens\n• See [Drug Interactions](#/node/hiv-drug-interactions)',
    citation: [13, 39, 40],
    next: 'hiv-med-overview',
    summary: 'PIs: atazanavir = radiolucent kidney stones (invisible on CT), CYP3A4 drug interactions',
    safetyLevel: 'warning',
  },

  {
    id: 'hiv-insti-effects',
    type: 'info',
    module: 5,
    title: 'INSTI & Entry Inhibitor Effects',
    body: '**Integrase strand transfer inhibitors (INSTIs):** Block incorporation of viral DNA into host cell DNA. First-line for most patients. [12, 13]\n\nExamples: [Biktarvy](#/drug/biktarvy/hiv treatment) (bictegravir), [Dolutegravir](#/drug/dolutegravir/hiv pep), elvitegravir/cobicistat, raltegravir.\n\n**Generally very well tolerated** — rare discontinuations in clinical trials.\n• ~90% of patients attain and maintain undetectable VL through 96 weeks [58]\n• Raltegravir has the lowest drug interaction risk\n• Elvitegravir requires cobicistat booster → higher drug interaction risk and GI intolerance\n\n**Dolutegravir pregnancy concern:**\n• Initial Botswana data showed 4 neural tube defects in dolutegravir-exposed pregnancies [59]\n• Subsequent studies: risk exists but is lower than initially feared\n• **Review guidelines before using dolutegravir for PEP in women of childbearing age**\n\n**Entry inhibitors (rarely used):**\n• **Enfuvirtide** — injection site nodules; largely replaced by INSTIs\n• **Maraviroc** — CCR5 blocker; rare hepatotoxicity, hypotension with renal impairment\n• **Ibalizumab** — monoclonal antibody; hypersensitivity risk during/after infusion\n• Reserved for treatment-experienced patients with limited options',
    citation: [12, 13, 58, 59],
    next: 'hiv-med-overview',
    summary: 'INSTIs: best tolerated class — insomnia, weight gain, rarely CPK elevation',
    skippable: true,
  },

  {
    id: 'hiv-hbv-caution',
    type: 'result',
    module: 5,
    title: 'HBV Reactivation Risk — Stopping Therapy',
    body: '**CRITICAL:** Several NRTIs/NtRTIs have dual activity against HIV AND hepatitis B:\n• **Tenofovir alafenamide (TAF)**\n• **Tenofovir disoproxil fumarate (TDF)**\n• **Emtricitabine (FTC)**\n• **Lamivudine (3TC)**\n\n**If a patient co-infected with HBV stops any of these medications**, there is risk of **acute hepatitis B flare** — fatalities have been reported. [1, 36]\n\n~10% of HIV patients are co-infected with HBV. [36]\n\n**ED presentation:**\n• Patient recently stopped or ran out of ARV medication\n• Elevated transaminases, jaundice, RUQ pain\n• May progress to fulminant hepatic failure\n\n**Management:**\n• Supportive care\n• **Consult infectious disease** for treatment options and reinitiation of therapy\n• Evaluate for other etiologies of hepatitis in parallel\n• Do NOT delay specialist consultation\n\n**When to stop HAART (very few scenarios):**\n• Stevens-Johnson syndrome\n• Nevirapine-associated hepatic failure\n• All other decisions to stop → involve HIV provider',
    recommendation: 'HBV co-infection + ARV discontinuation → risk of fatal hepatitis flare. Provide supportive care, consult ID urgently for medication reinitiation. Never stop HAART for mild GI side effects.',
    treatment: {
      firstLine: {
        drug: 'Resume HBV-active ART (TDF or TAF-containing regimen)',
        dose: 'TDF 300mg or TAF 25mg (as part of ART combination)',
        route: 'PO',
        frequency: 'Once daily',
        duration: 'Lifelong (do not discontinue HBV-active agents)',
        notes: 'Urgent ID consultation. If patient stopped medication, reinitiate immediately. Tenofovir (TDF or TAF), emtricitabine, and lamivudine have dual HIV/HBV activity. Never stop these in co-infected patients without HBV coverage.',
      },
      alternative: {
        drug: 'Entecavir (if HIV not being treated)',
        dose: '1 mg',
        route: 'PO',
        frequency: 'Once daily',
        duration: 'Lifelong',
        notes: 'Only if HIV is NOT being treated (entecavir has weak HIV activity and can select for resistance). Requires ID guidance. Preferred approach: treat both HIV and HBV with TDF/TAF + FTC or 3TC.',
      },
      monitoring: 'Urgent ID consult. Serial LFTs (daily if inpatient). HBV DNA viral load. Monitor for hepatic decompensation. Do not discharge without confirmed medication access and follow-up.',
    },
    confidence: 'definitive',
    citation: [1, 36],
    summary: 'Stopping tenofovir/emtricitabine/lamivudine can cause fatal HBV reactivation — never abruptly stop',
    safetyLevel: 'critical',
  },

  {
    id: 'hiv-drug-interactions',
    type: 'info',
    module: 5,
    title: 'Drug-Drug Interactions',
    body: '**PI-based regimens** (especially boosted with ritonavir or cobicistat) carry the highest risk of drug interactions through **CYP3A4 inhibition**. [13]\n\n**High-risk combinations in the ED:**\n• **Anticoagulants** — warfarin, DOACs: altered metabolism\n• **Statins** — lovastatin and simvastatin contraindicated with PIs; use atorvastatin/rosuvastatin with dose adjustment\n• **Corticosteroids** — fluticasone + ritonavir → iatrogenic Cushing syndrome\n• **Antiarrhythmics** — amiodarone, flecainide, lidocaine: levels may be dangerously altered\n• **Antiepileptics** — carbamazepine, phenytoin: bidirectional interactions\n• **Antimalarials, antidepressants** — various interactions\n\n**INSTI-based regimens** have fewer interactions but:\n• Dolutegravir/bictegravir: chelation with polyvalent cations (antacids, Ca2+, Fe2+)\n• Dolutegravir increases metformin levels\n\n**Atazanavir absorption** requires acidic environment — PPIs and H2 blockers interfere.\n\n**Before prescribing any new medication** to an HIV patient on PIs:\n• Use an HIV drug interaction checker\n• When in doubt, consult pharmacy or infectious disease\n\n**Key ED takeaway:** Always check drug interactions when prescribing to HIV patients, especially those on PI-based or cobicistat-boosted regimens.',
    citation: [13],
    next: 'hiv-med-overview',
    summary: 'PIs inhibit CYP3A4 — dangerous interactions with benzodiazepines, statins, PDE5 inhibitors',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 6: PREVENTION & DISPOSITION
  // =====================================================================

  {
    id: 'hiv-prevention',
    type: 'question',
    module: 6,
    title: 'HIV Prevention — PEP & PrEP',
    body: 'The ED plays a vital role in preventing new HIV infections through PEP and PrEP awareness. [1, 60]\n\nWhich prevention scenario?',
    citation: [1, 60],
    options: [
      {
        label: 'Potential HIV exposure — PEP indicated',
        description: 'Sexual exposure, needlestick, assault — within 72 hours',
        next: 'hiv-pep-overview',
        urgency: 'urgent',
      },
      {
        label: 'High-risk patient — PrEP referral',
        description: 'MSM with STI, ongoing high-risk behavior, PrEP candidate',
        next: 'hiv-prep-referral',
      },
    ],
    summary: 'PEP within 72h of exposure, PrEP for ongoing risk — cross-link to PEP consult for protocols',
  },

  {
    id: 'hiv-pep-overview',
    type: 'info',
    module: 6,
    title: 'Postexposure Prophylaxis (PEP)',
    body: '**PEP is most effective when given ASAP** — ideally within 2 hours of exposure.\n\n**NOT recommended when care is sought >72 hours after exposure.** [60]\n\n**Indications:** Sexual exposure, needlestick/percutaneous, mucous membrane exposure, sexual assault.\n\n**Preferred regimens (28 days):**\n• [Biktarvy](#/drug/biktarvy/hiv pep) 1 tablet daily — preferred single-tablet regimen\n• [TDF/FTC](#/drug/tdf-ftc/hiv pep) + [Dolutegravir](#/drug/dolutegravir/hiv pep) — alternative\n• [TDF/FTC](#/drug/tdf-ftc/hiv pep) + [Darunavir](#/drug/darunavir/hiv pep)/[Ritonavir](#/drug/ritonavir/hiv pep) — second alternative\n\n**Baseline testing:** HIV test on exposed patient.\n\n**Adherence is critical:** One study showed <60% follow-up rates and <25% completed full 28-day course. [61] Emphasize adherence and arrange follow-up.\n\n**For the complete PEP decision pathway** including exposure risk assessment, special populations, and follow-up: [Post Exposure Prophylaxis Consult](#/tree/pep)\n\nRisk of transmission depends on type of exposure and viral load of source. Undetectable viral load = virtually zero transmission risk (PARTNER 2 study). [10]',
    citation: [10, 60, 61],
    treatment: {
      firstLine: {
        drug: 'Biktarvy (bictegravir/emtricitabine/tenofovir alafenamide)',
        dose: '50mg/200mg/25mg (1 tablet)',
        route: 'PO',
        frequency: 'Once daily',
        duration: '28 days',
        notes: 'Preferred single-tablet PEP regimen. Start ASAP, ideally within 2 hours. NOT effective if started >72 hours post-exposure. Take with or without food.',
      },
      alternative: {
        drug: 'TDF/FTC + Dolutegravir',
        dose: 'TDF/FTC 300mg/200mg + Dolutegravir 50mg',
        route: 'PO',
        frequency: 'Once daily',
        duration: '28 days',
        notes: 'Alternative: TDF/FTC + Darunavir 800mg/Ritonavir 100mg daily. Review dolutegravir neural tube defect risk in women of childbearing potential. Dispense full 28-day course from ED if possible.',
      },
      monitoring: 'Baseline HIV test (must be negative). Follow-up at 4-6 weeks and 3 months for repeat HIV testing. Emphasize adherence - <25% complete full 28-day course. Arrange follow-up within 3-7 days.',
    },
    next: 'hiv-disposition',
    summary: 'PEP: Biktarvy or TDF/FTC + dolutegravir x 28 days — start within 72h, ideally within 2h',
    skippable: true,
  },

  {
    id: 'hiv-prep-referral',
    type: 'result',
    module: 6,
    title: 'Pre-Exposure Prophylaxis (PrEP) Referral',
    body: '**PrEP is highly effective:** PROUD trial showed **86% relative risk reduction** in HIV acquisition. IPREX and DISCOVER studies showed >90% reduction with daily adherence. [53, 54, 62]\n\n**FDA-approved PrEP regimens:**\n• [TDF/FTC](#/drug/tdf-ftc/hiv prep) (Truvada®) — approved for all genders\n• TAF/FTC (Descovy®) — approved for MSM and transgender women only (women not studied) [54]\n\n**PrEP follow-up protocol:**\n• Daily medication, follow-up every 3 months\n• HIV testing at each visit\n• STI symptom assessment, side effect evaluation\n• Renal function at 3 months, then every 6 months [53]\n\n**Who to refer from the ED:**\n• MSM (especially with recent STI diagnosis) [63, 64]\n• Persons who inject drugs and their sex partners\n• Persons exchanging sex for money or drugs\n• Sex partners of HIV-infected persons with detectable VL\n• Any patient requesting PrEP information\n\n**ED role:** Educate, provide referral to PrEP provider. Do NOT start PrEP from the ED without baseline HIV testing and renal function.',
    recommendation: 'Refer appropriate patients to PrEP provider. Counsel on high effectiveness (>86% risk reduction) with daily adherence. Ensure baseline HIV test and renal function before starting.',
    treatment: {
      firstLine: {
        drug: 'TDF/FTC (Truvada)',
        dose: '300mg/200mg',
        route: 'PO',
        frequency: 'Once daily',
        duration: 'Ongoing while at risk (requires q3 month follow-up)',
        notes: 'FDA-approved for all genders. Requires negative HIV test and CrCl >60 before starting. Do NOT start from ED without baseline testing. Refer to PrEP provider.',
      },
      alternative: {
        drug: 'TAF/FTC (Descovy)',
        dose: '25mg/200mg',
        route: 'PO',
        frequency: 'Once daily',
        duration: 'Ongoing while at risk (requires q3 month follow-up)',
        notes: 'Approved for MSM and transgender women ONLY (cisgender women not studied). Better renal and bone safety profile than TDF/FTC. Requires CrCl >30.',
      },
      monitoring: 'Refer to PrEP provider - do NOT initiate from ED. Required monitoring: HIV test every 3 months, renal function at 3 months then q6 months, STI screening, adherence assessment. >90% effective with daily adherence.',
    },
    confidence: 'recommended',
    citation: [53, 54, 62, 63, 64],
    summary: 'PrEP referral for ongoing risk: daily oral or long-acting injectable cabotegravir every 2 months',
    skippable: true,
  },

  {
    id: 'hiv-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition Decision',
    body: 'Based on the clinical assessment, determine appropriate disposition.',
    options: [
      {
        label: 'Admit — suspected OI, unstable, or requires IV treatment',
        description: 'ICU for critical illness; floor for workup/treatment of OIs',
        next: 'hiv-admit',
        urgency: 'urgent',
      },
      {
        label: 'Discharge with close follow-up',
        description: 'Stable patient with well-controlled or manageable complaint',
        next: 'hiv-discharge',
      },
    ],
    summary: 'Determine: admission for acute illness vs discharge with close ID/PCP follow-up',
  },

  {
    id: 'hiv-admit',
    type: 'result',
    module: 6,
    title: 'Admission',
    body: '**Admission criteria:**\n• Suspected or confirmed OI requiring inpatient treatment\n• Hemodynamic instability, sepsis, respiratory failure\n• CNS symptoms with concerning imaging or LP findings\n• New diagnosis with acute seroconversion illness and complications\n• Inability to tolerate oral medications\n• Social barriers to safe discharge and follow-up\n\n**Orders:**\n• Continue home HAART regimen (do NOT hold unless directed by ID)\n• Infectious disease consultation for OI management\n• CD4 count and viral load if not recently available\n• Screen for co-infections (HBV, HCV) if not previously documented\n• Medication reconciliation — alert pharmacy to ARV drug interactions\n\n**If patient has fallen out of care:**\n• Social work consultation for linkage to HIV services\n• This hospitalization is an opportunity to re-engage the patient in treatment',
    recommendation: 'Admit for OI workup/treatment, acute illness, or inability to manage outpatient. Continue HAART, consult ID, check CD4/VL, screen HBV/HCV. Social work for linkage to care.',
    confidence: 'recommended',
    citation: [1, 14],
    summary: 'Admit for new OIs, severe dehydration, altered mental status, or inability to tolerate PO meds',
  },

  {
    id: 'hiv-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge with Follow-Up',
    body: '**Discharge criteria:**\n• Stable vital signs, able to tolerate PO\n• No suspected OI requiring inpatient treatment\n• Well-controlled HIV with manageable complaint\n• Reliable follow-up available\n\n**Discharge instructions:**\n• Continue all HIV medications as prescribed — **do NOT stop HAART**\n• Follow up with HIV provider within 1-2 weeks (or sooner per complaint)\n• Return for worsening symptoms, new fever, inability to take medications\n\n**Linkage to care opportunities:**\n• If not engaged in HIV care → provide contact information for local HIV clinic\n• If PEP started → arrange follow-up in 3-7 days for adherence check\n• If PrEP candidate identified → refer to PrEP provider\n• If newly diagnosed → urgent HIV specialist referral (same day if possible)\n• If untested → offer HIV testing before discharge or provide referral\n\n**The ED visit is a critical touchpoint** — 80% of new transmissions come from those not diagnosed or not in care. Identifying and linking these patients is one of the highest-impact interventions the ED can provide. [1]\n\n[Discharge Instructions](#/info/hiv-ed-discharge) — shareable patient handout',
    recommendation: 'Discharge with continued HAART. Follow up with HIV provider. Link to care if not engaged. Offer HIV testing if untested. Refer for PEP/PrEP as indicated. Review [Discharge Instructions](#/info/hiv-ed-discharge) with patient.',
    confidence: 'recommended',
    citation: [1],
    summary: 'Discharge with ID/PCP follow-up within 72h, medication reconciliation, and adherence counseling',
  },

];

export const HIV_NODE_COUNT = HIV_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const HIV_MODULE_LABELS = [
  'Initial Assessment',
  'Seroconversion & Testing',
  'Well-Controlled HIV',
  'Immunocompromised / OI',
  'Medication Effects',
  'Prevention & Disposition',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const HIV_CITATIONS: Citation[] = [
  { num: 1, text: 'U.S. Centers for Disease Control and Prevention. CDC Fact Sheet: Vital Signs, 2019. (CDC data report)' },
  { num: 2, text: 'U.S. Centers for Disease Control and Prevention. HIV in the United States and Dependent Areas. (CDC statistics)' },
  { num: 3, text: 'Branson BM, Handsfield HH, Lampe MA, et al. Revised recommendations for HIV testing of adults, adolescents, and pregnant women in health-care settings. MMWR Recomm Rep. 2006;55(RR-14):1-17. (Practice guidelines)' },
  { num: 4, text: 'Mohareb AM, Rothman RE, Hsieh YH. Emergency department (ED) utilization by HIV-infected ED patients in the United States in 2009 and 2010. HIV Med. 2013;14(10):605-613. (Comparative study; 1,192,535 ED visits)' },
  { num: 5, text: 'Napoli AM, Fischer CM, Pines JM, et al. Absolute lymphocyte count in the emergency department predicts a low CD4 count in admitted HIV-positive patients. Acad Emerg Med. 2011;18(4):385-389. (Retrospective cohort; 866 patients)' },
  { num: 6, text: 'Shapiro NI, Karras DJ, Leech SH, et al. Absolute lymphocyte count as a predictor of CD4 count. Ann Emerg Med. 1998;32(3 Pt 1):323-328. (Retrospective; 807 samples)' },
  { num: 7, text: 'U.S. Preventive Services Task Force. Final Recommendation Statement: Human Immunodeficiency Virus (HIV) Infection: Screening. Grade A recommendation. (Guidelines)' },
  { num: 8, text: 'American College of Emergency Physicians. Policy Compendium 2021 — section on HIV testing and screening in EDs. (ACEP policies)' },
  { num: 9, text: 'White DAE, Giordano TP, Pasalar S, et al. Acute HIV discovered during routine HIV screening with HIV antigen-antibody combination tests in 9 US emergency departments. Ann Emerg Med. 2018;72(1):29-40. (Retrospective; 9 EDs, 214,524 patients)' },
  { num: 10, text: 'Rodger AJ, Cambiano V, Bruun T, et al. Risk of HIV transmission through condomless sex in serodifferent gay couples with the HIV-positive partner taking suppressive antiretroviral therapy (PARTNER 2). Lancet. 2019;393(10189):2428-2438. (Multicenter prospective observational; 972 gay couples)' },
  { num: 11, text: 'Bavinton BR, Pinto AN, Phanuphak N, et al. Viral suppression and HIV transmission in serodiscordant male couples (Opposites Attract). Lancet HIV. 2018;5(8):e438-e447. (Prospective observational; 358 couples)' },
  { num: 12, text: 'Saag MS, Gandhi RT, Hoy JF, et al. Antiretroviral drugs for treatment and prevention of HIV infection in adults: 2020 recommendations of the International Antiviral Society-USA panel. JAMA. 2020;324(16):1651-1669. (Guidelines)' },
  { num: 13, text: 'U.S. Department of Health and Human Services. Guidelines for the Use of Antiretroviral Agents in Adults and Adolescents with HIV. (Guidelines)' },
  { num: 14, text: 'Palella FJ Jr, Baker RK, Moorman AC, et al. Mortality in the highly active antiretroviral therapy era: changing causes of death and disease in the HIV outpatient study. J Acquir Immune Defic Syndr. 2006;43(1):27-34. (Prospective multicenter observational; 6945 patients)' },
  { num: 15, text: 'Almeida A, Boattini M. Community-acquired pneumonia in HIV-positive patients: an update on etiologies, epidemiology and management. Curr Infect Dis Rep. 2017;19(1):2. (Review)' },
  { num: 16, text: 'Cilloniz C, Garcia-Vidal C, Moreno A, et al. Community-acquired bacterial pneumonia in adult HIV-infected patients. Expert Rev Anti Infect Ther. 2018;16(7):579-588. (Review)' },
  { num: 17, text: 'Almeida A, Almeida AR, Castelo Branco S, et al. CURB-65 and other markers of illness severity in community-acquired pneumonia among HIV-positive patients. Int J STD AIDS. 2016;27(11):998-1004. (Retrospective; 396 patients)' },
  { num: 18, text: 'Fitzpatrick M, Brooks JT, Kaplan JE. Epidemiology of HIV-associated lung disease in the United States. Semin Respir Crit Care Med. 2016;37(2):181-198. (Review)' },
  { num: 19, text: 'Crothers K, Butt AA, Gibert CL, et al. Increased COPD among HIV-positive compared to HIV-negative veterans. Chest. 2006;130(5):1326-1333. (Prospective observational; 1014 HIV+ and 713 HIV- men)' },
  { num: 20, text: 'Alvaro-Meca A, Ryan P, Martinez-Larrull E, et al. Epidemiological trends of deep venous thrombosis in HIV-infected subjects (1997-2013). Eur J Intern Med. 2018;48:69-74. (Retrospective)' },
  { num: 21, text: 'Rasmussen LD, Dybdal M, Gerstoft J, et al. HIV and risk of venous thromboembolism: a Danish nationwide population-based cohort study. HIV Med. 2011;12(4):202-210. (Population-based cohort; 4333 patients)' },
  { num: 22, text: 'Ballocca F, D\'Ascenzo F, Gili S, et al. Cardiovascular disease in patients with HIV. Trends Cardiovasc Med. 2017;27(8):558-563. (Review)' },
  { num: 23, text: 'Barnes RP, Lacson JC, Bahrami H. HIV infection and risk of cardiovascular diseases beyond coronary artery disease. Curr Atheroscler Rep. 2017;19(5):20. (Review)' },
  { num: 24, text: 'Dorjee K, Choden T, Baxi SM, et al. Risk of cardiovascular disease associated with exposure to abacavir among individuals with HIV: a systematic review and meta-analyses of results from 17 epidemiologic studies. Int J Antimicrob Agents. 2018;52(5):541-553. (Systematic review; 17 studies)' },
  { num: 25, text: 'Elion RA, Althoff KN, Zhang J, et al. Recent abacavir use increases risk of type 1 and type 2 myocardial infarctions among adults with HIV. J Acquir Immune Defic Syndr. 2018;78(1):62-72. (Retrospective; 8265 patients)' },
  { num: 26, text: 'Al-Kindi SG, ElAmm C, Ginwalla M, et al. Heart failure in patients with human immunodeficiency virus infection: epidemiology and management disparities. Int J Cardiol. 2016;218:43-46. (Database review; 36,400 patients)' },
  { num: 27, text: 'Alonso A, Barnes AE, Guest JL, et al. HIV infection and incidence of cardiovascular diseases: an analysis of a large healthcare database. J Am Heart Assoc. 2019;8(14):e012241. (Database statistical analysis)' },
  { num: 28, text: 'Sullivan PS, Dworkin MS, Jones JL, et al. Epidemiology of thrombosis in HIV-infected individuals. AIDS. 2000;14(3):321-324. (Prospective observational; 42,935 patients)' },
  { num: 29, text: 'Howard JFB, Rokx C, Smit C, et al. Incidence of a first venous thrombotic event in people with HIV in the Netherlands. Lancet HIV. 2019;6(3):e173-e181. (Retrospective cohort; 14,389 patients)' },
  { num: 30, text: 'Shah ASV, Stelzle D, Lee KK, et al. Global burden of atherosclerotic cardiovascular disease in people living with HIV: systematic review and meta-analysis. Circulation. 2018;138(11):1100-1112. (Systematic review; 80 studies, 793,635 patients)' },
  { num: 31, text: 'Heaton RK, Franklin DR Jr, Deutsch R, et al. Neurocognitive change in the era of HIV combination antiretroviral therapy: the longitudinal CHARTER study. Clin Infect Dis. 2015;60(3):473-480. (Longitudinal cohort; 436 HIV-infected participants)' },
  { num: 32, text: 'daCosta DiBonaventura M, Gupta S, Cho M, et al. The association of HIV/AIDS treatment side effects with health status, work productivity, and resource use. AIDS Care. 2012;24(6):744-755. (Cross-sectional survey; 953 patients)' },
  { num: 33, text: 'Dikman AE, Schonfeld E, Srisarajivakul NC, et al. Human immunodeficiency virus-associated diarrhea: still an issue in the era of antiretroviral therapy. Dig Dis Sci. 2015;60(8):2236-2245. (Review)' },
  { num: 34, text: 'Collini PJ, Kuijper E, Dockrell DH. Clostridium difficile infection in patients with HIV/AIDS. Curr HIV/AIDS Rep. 2013;10(3):273-282. (Review)' },
  { num: 35, text: 'Radwan D, Cachay E, Falade-Nwulia O, et al. HCV screening and treatment uptake among patients in HIV care during 2014-2015. J Acquir Immune Defic Syndr. 2019;80(5):559-567. (Prospective observational; 29,071 patients)' },
  { num: 36, text: 'Chun HM, Fieberg AM, Hullsiek KH, et al. Epidemiology of hepatitis B virus infection in a US cohort of HIV-infected individuals during the past 20 years. Clin Infect Dis. 2010;50(3):426-436. (Observational cohort; 1078 patients)' },
  { num: 37, text: 'Gupta SK, Anderson AM, Ebrahimi R, et al. Fanconi syndrome accompanied by renal function decline with tenofovir disoproxil fumarate. PLoS One. 2014;9(3):e92717. (Prospective case-control; 19 cases, 37 controls)' },
  { num: 38, text: 'Arribas JR, Thompson M, Sax PE, et al. Randomized, double-blind comparison of tenofovir alafenamide (TAF) vs tenofovir disoproxil fumarate (TDF): week 144 results. J Acquir Immune Defic Syndr. 2017;75(2):211-218. (RCT double-blind; 1733 patients)' },
  { num: 39, text: 'Arumainayagam N, Gresty H, Shamsuddin A, et al. Human immunodeficiency virus (HIV)-related stone disease — a potential new paradigm? BJU Int. 2015;116(5):684-686. (Review)' },
  { num: 40, text: 'Izzedine H, Lescure FX, Bonnet F. HIV medication-based urolithiasis. Clin Kidney J. 2014;7(2):121-126. (Review)' },
  { num: 41, text: 'Becker S, Fusco G, Fusco J, et al. HIV-associated thrombotic microangiopathy in the era of highly active antiretroviral therapy: an observational study. Clin Infect Dis. 2004;39 Suppl 5:S267-S275. (Multicenter observational; 6022 patients)' },
  { num: 42, text: 'Non LR, Escota GV, Powderly WG. HIV and its relationship to insulin resistance and lipid abnormalities. Transl Res. 2017;183:41-56. (Review)' },
  { num: 43, text: 'Willig AL, Overton ET. Metabolic complications and glucose metabolism in HIV infection: a review of the evidence. Curr HIV/AIDS Rep. 2016;13(5):289-296. (Review)' },
  { num: 44, text: 'Weetman A. Immune reconstitution syndrome and the thyroid. Best Pract Res Clin Endocrinol Metab. 2009;23(6):693-702. (Review)' },
  { num: 45, text: 'Hadigan C, Kattakuzhy S. Diabetes mellitus type 2 and abnormal glucose metabolism in the setting of human immunodeficiency virus. Endocrinol Metab Clin North Am. 2014;43(3):685-696. (Review)' },
  { num: 46, text: 'Takhar SS, Hendey GW. Orthopedic illnesses in patients with HIV. Emerg Med Clin North Am. 2010;28(2):335-342. (Review)' },
  { num: 47, text: 'Hoy J, Young B. Do people with HIV infection have a higher risk of fracture compared with those without HIV infection? Curr Opin HIV AIDS. 2016;11(3):301-305. (Review)' },
  { num: 48, text: 'Marquez J, Restrepo CS, Candia L, et al. Human immunodeficiency virus-associated rheumatic disorders in the HAART era. J Rheumatol. 2004;31(4):741-746. (Prospective; 75 patients)' },
  { num: 49, text: 'Nedelcovych MT, Manning AA, Semenova S, et al. The psychiatric impact of HIV. ACS Chem Neurosci. 2017;8(7):1432-1434. (Review)' },
  { num: 50, text: 'Martins CR. Cutaneous drug reactions associated with newer antiretroviral agents. J Drugs Dermatol. 2006;5(10):976-982. (Review)' },
  { num: 51, text: 'Smith RL, Ripps CS, Lewis ML. Elevated lactate dehydrogenase values in patients with Pneumocystis carinii pneumonia. Chest. 1988;93(5):987-992. (Case comparison; 7 cases)' },
  { num: 52, text: 'Mallal S, Nolan D, Witt C, et al. Association between presence of HLA-B*5701 and hypersensitivity to HIV-1 reverse-transcriptase inhibitor abacavir. Lancet. 2002;359(9308):727-732. (Cohort; 200 participants)' },
  { num: 53, text: 'U.S. Centers for Disease Control and Prevention. Preexposure Prophylaxis for the Prevention of HIV Infection in the United States — 2017 Update: A Clinical Practice Guideline. (CDC guidelines)' },
  { num: 54, text: 'Mayer KH, Molina JM, Thompson MA, et al. Emtricitabine and tenofovir alafenamide vs emtricitabine and tenofovir disoproxil fumarate for HIV pre-exposure prophylaxis (DISCOVER). Lancet. 2020;396(10246):239-254. (RCT phase 3; 5857 participants)' },
  { num: 55, text: 'Cespedes MS, Aberg JA. Neuropsychiatric complications of antiretroviral therapy. Drug Saf. 2006;29(10):865-874. (Review)' },
  { num: 56, text: 'Gatell JM, Morales-Ramirez JO, Hagins DP, et al. Doravirine dose selection and 96-week safety and efficacy versus efavirenz. Antivir Ther. 2019;24(6):425-435. (Phase IIb double-blind; 558 participants)' },
  { num: 57, text: 'Molina JM, Squires K, Sax PE, et al. Doravirine versus ritonavir-boosted darunavir in antiretroviral-naive adults with HIV-1 (DRIVE-FORWARD): 96-week results. Lancet HIV. 2020;7(1):e16-e26. (RCT phase 3; 769 participants)' },
  { num: 58, text: 'Stellbrink HJ, Arribas JR, Stephens JL, et al. Co-formulated bictegravir, emtricitabine, and tenofovir alafenamide versus dolutegravir with emtricitabine and tenofovir alafenamide: week 96 results. Lancet HIV. 2019. (RCT phase 3; 657 patients)' },
  { num: 59, text: 'U.S. Centers for Disease Control and Prevention. Interim Statement Regarding Potential Fetal Harm from Exposure to Dolutegravir — Implications for HIV Post-exposure Prophylaxis (PEP). (CDC statement)' },
  { num: 60, text: 'Dominguez KL, Smith DK, Vasavi T, et al. Updated Guidelines for Antiretroviral Postexposure Prophylaxis After Sexual, Injection Drug Use, or Other Nonoccupational Exposure to HIV — United States, 2016. (Practice guideline)' },
  { num: 61, text: 'Bogoch II, Scully EP, Zachary KC, et al. Patient attrition between the emergency department and clinic among individuals presenting for HIV nonoccupational postexposure prophylaxis. Clin Infect Dis. 2014;58(11):1618-1624. (Observational; 180 patients)' },
  { num: 62, text: 'McCormack S, Dunn DT, Desai M, et al. Pre-exposure prophylaxis to prevent the acquisition of HIV-1 infection (PROUD): effectiveness results from the pilot phase. Lancet. 2016;387(10013):53-60. (Open-label RCT; 544 participants)' },
  { num: 63, text: 'Barbee LA, Khosropour CM, Dombrowski JC, et al. New human immunodeficiency virus diagnosis independently associated with rectal gonorrhea and Chlamydia in men who have sex with men. Sex Transm Dis. 2017;44(7):385-389. (Case-control; 176 cases, 704 controls)' },
  { num: 64, text: 'Llata E, Braxton J, Asbel L, et al. New human immunodeficiency virus diagnoses among men who have sex with men attending sexually transmitted disease clinics. Sex Transm Dis. 2018;45(9):577-582. (Retrospective; 640 diagnoses in 14,824 MSM)' },
];
