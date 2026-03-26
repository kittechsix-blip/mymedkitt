// MedKitt — Tuberculosis
// ED evaluation, diagnosis, drug-susceptible treatment, latent TB, drug-resistant TB, HIV-TB co-infection
// 6 modules: ED Evaluation → Diagnosis → Drug-Susceptible Treatment → Latent TB → Drug-Resistant TB → HIV-TB
// 34 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const TUBERCULOSIS_NODES: DecisionNode[] = [
  // ===================================================================
  // MODULE 1: ED Evaluation & Initial Assessment
  // ===================================================================
  {
    id: 'tb-start',
    type: 'info',
    module: 1,
    title: 'Tuberculosis',
    body: '[TB Steps Summary](#/info/tb-steps-summary) — quick reference.\n\nNearly **2 billion people** (~25% of world population) are infected with *Mycobacterium tuberculosis*. In 2024, an estimated **10.7 million** became ill with TB (131/100,000 incidence), and **1.23 million died**. [1]\n\nPrompt diagnosis facilitates timely treatment and minimizes community transmission. [1]\n\nThis consult covers:\n• ED evaluation and isolation decisions\n• Diagnostic workup (AFB, NAA, culture)\n• Drug-susceptible treatment (RIPE + 4-month regimen)\n• Latent TB treatment\n• Drug-resistant TB (MDR/XDR, BPaL/BPaLM)\n• HIV-TB co-infection management',
    citation: [1],
    next: 'tb-suspicion',
  },
  {
    id: 'tb-suspicion',
    type: 'info',
    module: 1,
    title: 'Clinical Suspicion',
    body: 'Suspect pulmonary TB in patients with relevant **clinical manifestations** AND **epidemiologic risk factors**: [1]\n\n**Symptoms:**\n• Cough **>2–3 weeks** duration\n• Lymphadenopathy\n• Fevers, night sweats\n• Weight loss\n• Hemoptysis\n\n**Epidemiologic factors:**\n• History of prior TB infection or disease\n• Known or possible TB exposure\n• Past or present residence in / travel to TB-endemic area\n• Incarceration, homelessness, immigration\n• HIV infection or immunosuppression\n\n**Important:** Patients may report **no symptoms** — suspicion may be raised by incidental findings on unrelated evaluation. [1]\n\n[TB Risk Factors](#/info/tb-risk-factors) — detailed risk factor checklist.',
    citation: [1],
    next: 'tb-isolation',
  },
  {
    id: 'tb-isolation',
    type: 'question',
    module: 1,
    title: 'Airborne Isolation Required?',
    body: 'Patients being evaluated for pulmonary TB who pose a **public health risk for transmission** should be admitted and isolated with **airborne precautions** (negative pressure room, N95 respirator). [1]\n\n**Isolate if:**\n• Active cough + risk factors for TB\n• Chest imaging consistent with active TB\n• Known TB exposure + symptoms\n• Sputum AFB smear positive',
    citation: [1],
    options: [
      {
        label: 'Yes — isolate now',
        description: 'Active symptoms + risk factors or known exposure',
        next: 'tb-specimen-type',
        urgency: 'critical',
      },
      {
        label: 'Low suspicion — continue workup',
        description: 'Incidental finding, minimal risk factors, or asymptomatic',
        next: 'tb-specimen-type',
      },
    ],
  },
  {
    id: 'tb-specimen-type',
    type: 'question',
    module: 1,
    title: 'Specimen Collection',
    body: 'The diagnosis of pulmonary TB is definitively established by **isolation of M. tuberculosis** from a bodily secretion, fluid, or tissue. [1]\n\nCollect **3 sputum specimens** at least **8 hours apart** (including one early morning specimen). [1]\n\n**Specimen options:**',
    citation: [1],
    options: [
      {
        label: 'Sputum (expectorated or induced)',
        description: 'First-line: 3 specimens, 8+ hours apart, including 1 early morning',
        next: 'tb-sputum-collection',
      },
      {
        label: 'Bronchoscopy',
        description: 'When sputum cannot be obtained or smears are negative',
        next: 'tb-bronch',
      },
      {
        label: 'Tissue biopsy',
        description: 'Pleural, lymph node, or lung biopsy for extrapulmonary or smear-negative cases',
        next: 'tb-cxr',
      },
    ],
  },
  {
    id: 'tb-sputum-collection',
    type: 'info',
    module: 1,
    title: 'Sputum Collection Technique',
    body: '**Expectorated sputum:**\n• Patient takes deep breaths, coughs forcefully\n• Collect in sterile container\n• Early morning specimen has highest yield\n\n**Induced sputum** (preferred if patient cannot produce):\n• Nebulize with **hypertonic saline (3–5%)**\n• 15–20 minutes of inhalation\n• Yields specimens comparable to bronchoscopy in many studies [1]\n\n**Collect 3 specimens** at least 8 hours apart — sensitivity increases with multiple specimens. [1]\n\n**Important:** Perform specimen collection in airborne isolation (negative pressure room or well-ventilated area with appropriate PPE).',
    citation: [1],
    next: 'tb-cxr',
  },
  {
    id: 'tb-bronch',
    type: 'info',
    module: 1,
    title: 'Bronchoscopy Specimens',
    body: '**Indications for bronchoscopy:** [1]\n• Unable to produce sputum (even with induction)\n• Smear-negative sputum with high clinical suspicion\n• Need for tissue sampling\n\n**Bronchoalveolar lavage (BAL):**\n• Directed to affected lobe on imaging\n• Send for AFB smear, NAA testing, and mycobacterial culture\n• Higher yield than sputum in some smear-negative cases\n\n**Post-bronchoscopy sputum** — collect sputum specimen after bronchoscopy (may have higher yield). [1]\n\n**Infection control:** Bronchoscopy is an aerosol-generating procedure — perform in negative pressure room with full airborne precautions.',
    citation: [1],
    next: 'tb-cxr',
  },

  // ===================================================================
  // MODULE 2: Diagnosis
  // ===================================================================
  {
    id: 'tb-cxr',
    type: 'info',
    module: 2,
    title: 'Chest Radiography',
    body: 'CXR is an important **supportive diagnostic tool** but cannot confirm or exclude TB. [1]\n\n**Classic findings (immunocompetent):**\n• Upper lobe infiltrates or cavitation\n• Apical scarring\n• Hilar/mediastinal lymphadenopathy\n• Miliary pattern (diffuse small nodules)\n\n**Atypical presentations (HIV/immunocompromised):**\n• Lower lobe disease\n• Non-cavitary infiltrates\n• Isolated lymphadenopathy\n• Normal CXR (up to 10–15% of HIV+ TB cases)\n\n**Key point:** Radiographic findings should prompt microbiologic confirmation — **never treat based on CXR alone**. [1]',
    citation: [1],
    next: 'tb-afb-naa',
  },
  {
    id: 'tb-afb-naa',
    type: 'info',
    module: 2,
    title: 'AFB Smear & NAA Testing',
    body: '[AFB/NAA Interpretation Algorithm](#/info/tb-afb-naa-algorithm) — diagnostic decision aid.\n\n**AFB Smear (Ziehl-Neelsen or Fluorochrome):**\n• Rapid result (same day)\n• Sensitivity: **50–80%** for pulmonary TB (higher with cavitary disease)\n• Specificity: limited — positive smear could be non-tuberculous mycobacteria (NTM)\n• Fluorochrome staining is preferred (faster, more sensitive than Ziehl-Neelsen) [1]\n\n**Nucleic Acid Amplification (NAA) Testing:**\n• Rapid molecular detection of *M. tuberculosis* DNA\n• Results in **2–8 hours**\n• Sensitivity: **95–98%** in smear-positive, **60–77%** in smear-negative specimens [1]\n• **A positive NAA** (with or without AFB smear positivity) in a person at risk for TB with no prior treatment history is **considered sufficient for diagnosis** [1]\n\n**GeneXpert MTB/RIF:** Simultaneously detects *M. tuberculosis* AND rifampin resistance — preferred initial test where available. [1]',
    citation: [1],
    next: 'tb-afb-naa-result',
  },
  {
    id: 'tb-afb-naa-result',
    type: 'question',
    module: 2,
    title: 'AFB Smear & NAA Results',
    body: '**Interpretation of combined AFB smear and NAA results:** [1]\n\nNote: Culture remains the gold standard — send all specimens for mycobacterial culture regardless of smear/NAA results.',
    citation: [1],
    options: [
      {
        label: 'AFB (+) / NAA (+)',
        description: 'Presumptive TB confirmed — initiate treatment',
        next: 'tb-confirmed',
        urgency: 'critical',
      },
      {
        label: 'AFB (−) / NAA (+)',
        description: 'Presumptive TB — NAA positive is sufficient for diagnosis in at-risk patient',
        next: 'tb-confirmed',
        urgency: 'urgent',
      },
      {
        label: 'AFB (+) / NAA (−)',
        description: 'Consider NTM — repeat NAA, send for culture, assess clinical picture',
        next: 'tb-afb-pos-naa-neg',
      },
      {
        label: 'AFB (−) / NAA (−)',
        description: 'TB less likely but not excluded — clinical judgment, await culture',
        next: 'tb-smear-neg',
      },
    ],
  },
  {
    id: 'tb-afb-pos-naa-neg',
    type: 'info',
    module: 2,
    title: 'AFB (+) / NAA (−) — Consider NTM',
    body: 'When AFB smear is **positive** but NAA is **negative**: [1]\n\n• Most likely explanation: **non-tuberculous mycobacteria (NTM)** rather than TB\n• **Repeat NAA testing** on a new specimen — false-negative NAA can occur\n• Clinical context matters — if TB risk is high, **treat empirically** while awaiting culture\n• If repeat NAA remains negative and clinical suspicion is low → likely NTM\n\n**Do NOT delay isolation** — maintain airborne precautions until TB is excluded.\n\nCulture results (2–6 weeks) will definitively distinguish TB from NTM. [1]',
    citation: [1],
    next: 'tb-culture',
  },
  {
    id: 'tb-smear-neg',
    type: 'info',
    module: 2,
    title: 'Smear-Negative TB',
    body: 'When both AFB smear and NAA are **negative**: [1]\n\n• TB is less likely but **not excluded** — smear-negative TB accounts for a significant proportion of cases\n• **Clinical judgment** is essential — if suspicion remains high:\n  → Continue isolation\n  → Repeat sputum collection\n  → Consider bronchoscopy for BAL\n  → Await culture results (2–6 weeks)\n\n• If clinical suspicion is **low** and alternative diagnosis is likely → discontinue isolation\n\n**HIV co-infection:** Smear-negative TB is more common in HIV patients. Consider **urine LAM antigen testing** (lipoarabinomannan) in HIV-positive patients with CD4 <200 — sensitivity ~50–60%, rapid point-of-care result. [1]',
    citation: [1],
    next: 'tb-culture',
  },
  {
    id: 'tb-culture',
    type: 'info',
    module: 2,
    title: 'Mycobacterial Culture',
    body: 'Culture is the **gold standard** for TB diagnosis and is essential for drug susceptibility testing (DST). [1]\n\n**Conventional culture (Löwenstein-Jensen solid media):**\n• Growth in **3–6 weeks** (slow but highly sensitive)\n• Allows full drug susceptibility testing\n\n**Rapid liquid culture (BACTEC MGIT 960):**\n• Growth detection in **1–3 weeks**\n• Preferred method due to faster time to detection [1]\n\n**Drug Susceptibility Testing (DST):**\n• Test all initial isolates for at least **isoniazid** and **rifampin** resistance\n• Results guide therapy — resistance changes the regimen entirely\n• Molecular DST (GeneXpert, line probe assays) can detect rifampin resistance within hours [1]\n\n**Important:** Culture ALL specimens — even when smear/NAA results are available. Culture provides definitive species identification and full susceptibility data.',
    citation: [1],
    next: 'tb-confirmed',
  },
  {
    id: 'tb-confirmed',
    type: 'question',
    module: 2,
    title: 'TB Diagnosis Confirmed',
    body: 'Active TB diagnosed or presumptive treatment initiated.\n\n**Immediate actions:**\n• Airborne isolation if not already in place\n• Notify public health department (TB is a **reportable disease** in all US states) [1]\n• Obtain baseline labs: **LFTs, CBC, BMP, HIV testing, hepatitis B/C serologies** [2]\n• Assess for drug-resistant TB risk factors\n\n**Risk factors for drug-resistant TB:** [1]\n• Prior TB treatment\n• Contact with known drug-resistant case\n• Birth in or travel to area with high MDR-TB prevalence (Eastern Europe, Central Asia, parts of Africa)\n• HIV co-infection\n• Cavitary disease with positive sputum cultures after 2 months of treatment\n\n**Select treatment pathway:**',
    citation: [1, 2],
    options: [
      {
        label: 'Drug-susceptible TB',
        description: 'No risk factors for resistance, or susceptibility confirmed',
        next: 'tb-ripe',
      },
      {
        label: 'Latent TB (infection, no disease)',
        description: 'Positive TST/IGRA but no active disease — treat to prevent reactivation',
        next: 'tb-latent-entry',
      },
      {
        label: 'Drug-resistant TB suspected',
        description: 'Risk factors present, resistance detected, or treatment failure',
        next: 'tb-resistant-class',
        urgency: 'urgent',
      },
      {
        label: 'HIV co-infection',
        description: 'TB with known HIV — special treatment considerations',
        next: 'tb-hiv-entry',
        urgency: 'urgent',
      },
    ],
  },

  // ===================================================================
  // MODULE 3: Drug-Susceptible Treatment
  // ===================================================================
  {
    id: 'tb-ripe',
    type: 'info',
    module: 3,
    title: 'RIPE Regimen — Standard Treatment',
    body: '[TB Treatment Regimens](#/info/tb-treatment-regimens) — full dosing tables.\n\nThe ATS/CDC/IDSA standard regimen for drug-susceptible pulmonary TB: [2,8]\n\n**Intensive Phase (2 months — daily):**\n• [Isoniazid](#/drug/isoniazid/tuberculosis) **5 mg/kg** PO daily (max 300 mg)\n• [Rifampin](#/drug/rifampin/tuberculosis) **10 mg/kg** PO daily (max 600 mg)\n• [Pyrazinamide](#/drug/pyrazinamide/tuberculosis) **25 mg/kg** PO daily (max 2000 mg)\n• [Ethambutol](#/drug/ethambutol/tuberculosis) **15–20 mg/kg** PO daily (max 1600 mg)\n\n**Continuation Phase (4 months — daily or 3×/week):**\n• Isoniazid + Rifampin only\n• Daily: INH 5 mg/kg + RIF 10 mg/kg\n• 3×/week (DOT only): INH 15 mg/kg + RIF 10 mg/kg [2]\n\n**Pyridoxine (B6):** 25–50 mg PO daily with INH to prevent peripheral neuropathy [2]\n\n**Total duration: ≥6 months** (may extend to 9 months if cavitary disease + positive 2-month culture)',
    citation: [2, 8],
    treatment: {
      firstLine: {
        drug: 'RIPE: Isoniazid + Rifampin + Pyrazinamide + Ethambutol',
        dose: 'INH 5 mg/kg (max 300 mg) + RIF 10 mg/kg (max 600 mg) + PZA 25 mg/kg (max 2000 mg) + EMB 15-20 mg/kg (max 1600 mg)',
        route: 'PO',
        frequency: 'Daily',
        duration: '2 months intensive (RIPE), then 4 months continuation (INH + RIF)',
        notes: 'Add pyridoxine (B6) 25-50 mg daily with INH. Total duration ≥6 months.',
      },
      alternative: {
        drug: 'RIPE 3x/week (DOT only)',
        dose: 'INH 15 mg/kg (max 900 mg) + RIF 10 mg/kg (max 600 mg) + PZA 50 mg/kg (max 3000 mg) + EMB 30 mg/kg (max 2400 mg)',
        route: 'PO',
        frequency: '3x/week',
        duration: '2 months intensive, then 4 months INH + RIF 3x/week',
        notes: 'Directly observed therapy required for intermittent dosing.',
      },
      monitoring: 'Monthly sputum cultures until conversion. LFTs at baseline; monthly if risk factors. Visual acuity baseline and monthly (ethambutol). 2-month culture determines continuation phase duration.',
    },
    next: 'tb-2month-check',
  },
  {
    id: 'tb-2month-check',
    type: 'question',
    module: 3,
    title: '2-Month Sputum Culture Check',
    body: 'After completing the **intensive phase (2 months)**, obtain sputum cultures to assess treatment response. [2]\n\nThe combination of **2-month culture result** and **cavitary disease on initial CXR** determines continuation phase duration:',
    citation: [2],
    options: [
      {
        label: 'Culture (−), no cavitation',
        description: 'Standard 4-month continuation phase (total 6 months)',
        next: 'tb-standard-continuation',
      },
      {
        label: 'Culture (−), cavitation present',
        description: 'Consider extending to 9 months total (7-month continuation)',
        next: 'tb-extended-continuation',
      },
      {
        label: 'Culture (+) at 2 months',
        description: 'Treatment failure risk — extend therapy, reassess susceptibility',
        next: 'tb-positive-2mo',
        urgency: 'urgent',
      },
    ],
  },
  {
    id: 'tb-standard-continuation',
    type: 'result',
    module: 3,
    title: 'Standard Continuation Phase',
    body: '**Continue INH + RIF for 4 additional months** (6 months total). [2]\n\n**Monitoring during continuation phase:**\n• Monthly sputum cultures until conversion documented\n• Monthly clinical assessment (symptoms, weight, adherence)\n• LFTs if symptomatic hepatotoxicity suspected\n• Directly observed therapy (DOT) strongly recommended [2]\n\n**Completion criteria:**\n• Minimum 6 months of treatment AND\n• Minimum 4 months of INH + RIF continuation AND\n• At least 2 negative sputum cultures during continuation phase [2]\n\n[Hepatotoxicity Management](#/info/tb-hepatotox-guide) — monitor for drug-induced liver injury.\n[TB Patient Information](#/info/tb-patient-info) — shareable patient education sheet.',
    recommendation: 'Complete 6-month RIPE regimen with DOT. Monthly sputum cultures, clinical monitoring, and LFT surveillance.',
    confidence: 'definitive',
    citation: [2, 8],
  },
  {
    id: 'tb-extended-continuation',
    type: 'result',
    module: 3,
    title: 'Extended Continuation — Cavitary Disease',
    body: 'Cavitary disease on initial CXR with **negative 2-month culture** — consider extending continuation phase to **7 months** (9 months total). [2]\n\n**Rationale:** Cavitary disease is associated with higher bacterial burden and increased risk of relapse with standard 6-month therapy. [2]\n\n**Continued monitoring:**\n• Monthly sputum cultures\n• Monthly clinical assessment\n• Complete minimum 9 months of treatment AND minimum 7 months of INH + RIF\n\n[Hepatotoxicity Management](#/info/tb-hepatotox-guide) — monitor for drug-induced liver injury.\n[TB Patient Information](#/info/tb-patient-info) — shareable patient education sheet.',
    recommendation: 'Extend to 9-month regimen (7-month continuation of INH + RIF) for cavitary disease.',
    confidence: 'recommended',
    citation: [2],
  },
  {
    id: 'tb-positive-2mo',
    type: 'info',
    module: 3,
    title: 'Positive Culture at 2 Months',
    body: 'Positive sputum culture at 2 months indicates **higher risk of treatment failure and relapse**. [2]\n\n**Immediate actions:**\n• **Repeat drug susceptibility testing** — rule out acquired resistance\n• **Extend continuation phase** to 7 months (9 months total minimum)\n• Ensure **directly observed therapy** — non-adherence is the most common cause\n• Assess for malabsorption, drug interactions, or incorrect dosing\n\n**If cultures remain positive at 4 months:** [2]\n• Consider treatment failure\n• Repeat DST with expanded panel\n• Consult TB specialist\n• Reassess regimen — may need to transition to drug-resistant TB protocol\n\n**Never add a single drug** to a failing regimen — this promotes resistance. [2]',
    citation: [2],
    next: 'tb-4month-regimen',
  },
  {
    id: 'tb-4month-regimen',
    type: 'info',
    module: 3,
    title: '4-Month Rifapentine-Moxifloxacin Regimen',
    body: '[TB Treatment Regimens](#/info/tb-treatment-regimens) — comparative dosing table.\n\nCDC 2022 interim guidance introduced a shortened **4-month regimen** for selected patients: [2,9]\n\n**Regimen (daily throughout):**\n• [Isoniazid](#/drug/isoniazid/tuberculosis) 300 mg PO daily\n• [Rifapentine](#/drug/rifapentine/tuberculosis) 1200 mg PO daily\n• [Moxifloxacin](#/drug/moxifloxacin/tuberculosis) 400 mg PO daily\n• [Pyrazinamide](#/drug/pyrazinamide/tuberculosis) (weight-based, 2 months only)\n\n**Patient selection (ALL criteria must be met):** [2,9]\n• Age ≥12 years\n• Drug-susceptible, non-cavitary pulmonary TB\n• HIV-negative (or HIV+ with CD4 >100 and not on certain ARVs)\n• Not pregnant or breastfeeding\n• No fluoroquinolone resistance\n• Sputum AFB smear grade ≤2+\n\n**QTc monitoring required** — both moxifloxacin and bedaquiline can prolong QTc. [2]',
    citation: [2, 9],
    treatment: {
      firstLine: {
        drug: 'Isoniazid + Rifapentine + Moxifloxacin + Pyrazinamide',
        dose: 'INH 300 mg + RPT 1200 mg + MOX 400 mg + PZA weight-based',
        route: 'PO',
        frequency: 'Daily',
        duration: '4 months total (PZA for first 2 months only)',
        notes: 'Pyridoxine 25-50 mg daily. Strict patient selection criteria required.',
      },
      monitoring: 'Baseline ECG then monthly QTc monitoring (moxifloxacin prolongs QTc). Monthly sputum cultures. LFTs at baseline and monthly.',
    },
    next: 'tb-hepatotox',
    calculatorLinks: [{ id: 'tb-duration', label: 'Treatment Duration Guide' }],
  },
  {
    id: 'tb-hepatotox',
    type: 'question',
    module: 3,
    title: 'Drug-Induced Hepatotoxicity?',
    body: '[Hepatotoxicity Management](#/info/tb-hepatotox-guide) — stepwise protocol.\n\n**Baseline LFTs** should be obtained in all patients before starting TB treatment. [2]\n\n**Monitor for hepatotoxicity if:**\n• Baseline LFTs abnormal\n• HIV co-infection\n• Chronic hepatitis B or C\n• Alcohol use\n• Age >35 years\n• Pregnancy or immediate postpartum\n• Concurrent hepatotoxic medications [2]\n\n**Definition of drug-induced hepatotoxicity:**\n• AST/ALT >3× ULN WITH symptoms (nausea, vomiting, abdominal pain, jaundice)\n• AST/ALT >5× ULN WITHOUT symptoms [2]',
    citation: [2],
    options: [
      {
        label: 'No hepatotoxicity',
        description: 'Normal LFTs or mild elevation <3× ULN — continue treatment',
        next: 'tb-standard-continuation',
      },
      {
        label: 'Hepatotoxicity present',
        description: 'AST/ALT >3× ULN with symptoms OR >5× ULN without symptoms',
        next: 'tb-hepatotox-manage',
        urgency: 'urgent',
      },
    ],
  },
  {
    id: 'tb-hepatotox-manage',
    type: 'result',
    module: 3,
    title: 'Hepatotoxicity Management',
    body: '**Step 1 — Stop ALL hepatotoxic TB drugs** (INH, RIF, PZA). [2]\n• Continue ethambutol (not hepatotoxic)\n• Consider adding a fluoroquinolone ([Moxifloxacin](#/drug/moxifloxacin/tuberculosis) 400 mg PO daily) as bridge therapy\n\n**Step 2 — Monitor LFTs** weekly until AST/ALT <2× ULN [2]\n\n**Step 3 — Stepwise rechallenge** (one drug at a time, 1 week apart): [2]\n1. **Rifampin** first (least hepatotoxic of the 3, most important for efficacy)\n2. **Isoniazid** second (recheck LFTs after 1 week)\n3. **Pyrazinamide** last (most commonly implicated — may choose to omit permanently)\n\n**If PZA is permanently discontinued:** Extend total treatment duration to **9 months**. [2]\n\n**If hepatotoxicity recurs on rechallenge:** Use non-hepatotoxic regimen (ethambutol + fluoroquinolone ± injectable). Consult TB specialist.',
    recommendation: 'Hold hepatotoxic TB drugs. Stepwise rechallenge: RIF → INH → PZA, one week apart. If PZA omitted permanently, extend to 9 months total.',
    confidence: 'recommended',
    citation: [2],
    treatment: {
      firstLine: {
        drug: 'Ethambutol + Moxifloxacin (bridge therapy)',
        dose: 'EMB 15-20 mg/kg (max 1600 mg) + MOX 400 mg',
        route: 'PO',
        frequency: 'Daily',
        duration: 'Until hepatotoxicity resolves and rechallenge complete',
        notes: 'Bridge therapy while holding hepatotoxic drugs. Stepwise rechallenge: RIF first, then INH, then PZA (1 week apart each).',
      },
      monitoring: 'Weekly LFTs until AST/ALT <2x ULN. Recheck LFTs 1 week after each drug rechallenge. If PZA omitted permanently, extend total duration to 9 months.',
    },
  },

  // ===================================================================
  // MODULE 4: Latent TB
  // ===================================================================
  {
    id: 'tb-latent-entry',
    type: 'info',
    module: 4,
    title: 'Latent TB Infection',
    body: 'TB infection (latent TB) = positive TST or IGRA with **no clinical, radiographic, or microbiologic evidence of active disease**. [3]\n\nTreatment of latent TB reduces reactivation risk by up to **90%**. [3]\n\n**Who to treat:** [3]\n• Positive TST or IGRA AND any of:\n  → Close contacts of active TB case\n  → HIV infection\n  → Immunosuppression (TNF-α inhibitors, transplant, chronic steroids ≥15 mg/day prednisone)\n  → Recent TST/IGRA conversion (within 2 years)\n  → Fibrotic changes on CXR consistent with prior untreated TB\n  → Injection drug use\n  → Healthcare workers',
    citation: [3],
    next: 'tb-latent-exclude',
  },
  {
    id: 'tb-latent-exclude',
    type: 'info',
    module: 4,
    title: 'Exclude Active TB Disease',
    body: '**Before starting latent TB treatment, MUST exclude active TB disease:** [3]\n\n**1. Symptom screen:**\n• Cough (any duration), fevers, night sweats, weight loss, hemoptysis\n• Any positive symptom → evaluate for active TB before treating latent\n\n**2. Chest radiography:**\n• Normal CXR → proceed with latent TB treatment\n• Abnormal CXR → sputum for AFB/culture before starting therapy\n• Old fibrotic changes without symptoms → may treat as latent if cultures negative\n\n**3. Assess comorbidities:** [3]\n• Check baseline LFTs if: age >35, hepatitis B/C, HIV, alcohol use, pregnancy/postpartum, or concurrent hepatotoxic meds\n• Document HIV status\n• Evaluate for drug interactions (especially rifamycin-based regimens)',
    citation: [3],
    next: 'tb-latent-regimen',
  },
  {
    id: 'tb-latent-regimen',
    type: 'question',
    module: 4,
    title: 'Latent TB Regimen Selection',
    body: '[TB Treatment Regimens](#/info/tb-treatment-regimens) — comparative latent TB dosing table.\n\nRifamycin-based regimens are **preferred** over isoniazid monotherapy due to shorter duration, better adherence, and comparable efficacy. [3]\n\n**Select regimen based on patient factors:**',
    citation: [3],
    options: [
      {
        label: '3HP — Rifapentine + INH weekly × 12',
        description: 'PREFERRED: 12 weekly doses by DOT. Best adherence. Not for <2yr, HIV on certain ARVs, or pregnant',
        next: 'tb-latent-3hp',
      },
      {
        label: '4R — Rifampin daily × 4 months',
        description: 'PREFERRED alternative: Daily self-administered. Better tolerated than INH. Good for INH-resistant contacts',
        next: 'tb-latent-4r',
      },
      {
        label: '3HR — INH + Rifampin daily × 3 months',
        description: 'Daily combination. Similar efficacy to 3HP. Option when rifapentine unavailable',
        next: 'tb-latent-3hr',
      },
      {
        label: '9H — Isoniazid daily × 9 months',
        description: 'Longest regimen, lowest adherence. Use when rifamycins are contraindicated (drug interactions)',
        next: 'tb-latent-9h',
      },
    ],
  },
  {
    id: 'tb-latent-3hp',
    type: 'result',
    module: 4,
    title: '3HP — Weekly INH + Rifapentine × 12 Weeks',
    body: '**Regimen:** [3]\n• [Isoniazid](#/drug/isoniazid/latent tb) **15 mg/kg** rounded to nearest 50/100 mg (max 900 mg) ONCE WEEKLY\n• [Rifapentine](#/drug/rifapentine/latent tb) **900 mg** (weight >50 kg) ONCE WEEKLY\n• Pyridoxine (B6) 50 mg with each dose\n• **12 doses total** — must complete all 12 within 16 weeks\n\n**Administration:** Directly observed therapy (DOT) recommended [3]\n\n**Contraindications:**\n• Age <2 years\n• Pregnancy or planning pregnancy during treatment\n• HIV on protease inhibitors or certain NNRTIs (rifapentine interaction)\n• INH-resistant TB contact [3]\n\n**Monitoring:** LFTs at baseline if risk factors. Reassess monthly for symptoms of hepatotoxicity.\n\n[TB Patient Information](#/info/tb-patient-info) — shareable patient education sheet.',
    recommendation: 'Start 3HP regimen (12 weekly doses of INH + rifapentine by DOT). Complete within 16 weeks. Pyridoxine with each dose.',
    confidence: 'definitive',
    citation: [3],
    treatment: {
      firstLine: {
        drug: 'Isoniazid + Rifapentine (3HP)',
        dose: 'INH 15 mg/kg (max 900 mg) + RPT 900 mg (if >50 kg)',
        route: 'PO',
        frequency: 'Once weekly',
        duration: '12 weeks (12 doses total)',
        notes: 'Pyridoxine (B6) 50 mg with each dose. Must complete within 16 weeks. DOT recommended.',
      },
      monitoring: 'LFTs at baseline if risk factors (age >35, hepatitis, HIV, alcohol use). Monthly clinical assessment for hepatotoxicity symptoms.',
    },
  },
  {
    id: 'tb-latent-4r',
    type: 'result',
    module: 4,
    title: '4R — Rifampin Daily × 4 Months',
    body: '**Regimen:** [3]\n• [Rifampin](#/drug/rifampin/latent tb) **10 mg/kg** PO daily (max 600 mg) × 4 months\n• Self-administered (DOT not required)\n\n**Advantages:** [3]\n• Shorter than INH monotherapy\n• Better tolerated (lower hepatotoxicity rate than INH)\n• Good for INH-resistant TB contacts\n• Self-administered — no DOT required\n\n**Cautions:**\n• Potent CYP3A4 inducer — extensive drug interactions\n• Cannot use with most HIV ARVs (protease inhibitors, some NNRTIs)\n• Colors body fluids orange-red — counsel patient [3]\n\n**Monitoring:** Baseline LFTs if risk factors. Monthly clinical assessment.\n\n[TB Patient Information](#/info/tb-patient-info) — shareable patient education sheet.',
    recommendation: 'Start rifampin 600 mg PO daily × 4 months. Monthly clinical assessment. Counsel about drug interactions and orange body fluids.',
    confidence: 'definitive',
    citation: [3],
    treatment: {
      firstLine: {
        drug: 'Rifampin (4R)',
        dose: '10 mg/kg (max 600 mg)',
        route: 'PO',
        frequency: 'Daily',
        duration: '4 months',
        notes: 'Self-administered. Counsel: orange body fluids, extensive drug interactions (CYP3A4 inducer).',
      },
      monitoring: 'Baseline LFTs if risk factors. Monthly clinical assessment for hepatotoxicity.',
    },
  },
  {
    id: 'tb-latent-3hr',
    type: 'result',
    module: 4,
    title: '3HR — INH + Rifampin Daily × 3 Months',
    body: '**Regimen:** [3]\n• [Isoniazid](#/drug/isoniazid/latent tb) **5 mg/kg** PO daily (max 300 mg) × 3 months\n• [Rifampin](#/drug/rifampin/latent tb) **10 mg/kg** PO daily (max 600 mg) × 3 months\n• Pyridoxine (B6) 25–50 mg PO daily\n\n**Similar efficacy to 3HP** — option when rifapentine is unavailable. [3]\n\n**Same drug interaction profile as 4R** (rifampin-based).\n\n**Monitoring:** Baseline LFTs if risk factors. Monthly clinical assessment.\n\n[TB Patient Information](#/info/tb-patient-info) — shareable patient education sheet.',
    recommendation: 'Start 3HR regimen (daily INH + rifampin × 3 months). Pyridoxine supplementation. Monthly clinical assessment.',
    confidence: 'recommended',
    citation: [3],
    treatment: {
      firstLine: {
        drug: 'Isoniazid + Rifampin (3HR)',
        dose: 'INH 5 mg/kg (max 300 mg) + RIF 10 mg/kg (max 600 mg)',
        route: 'PO',
        frequency: 'Daily',
        duration: '3 months',
        notes: 'Pyridoxine (B6) 25-50 mg daily. Same drug interaction profile as rifampin monotherapy.',
      },
      monitoring: 'Baseline LFTs if risk factors. Monthly clinical assessment for hepatotoxicity.',
    },
  },
  {
    id: 'tb-latent-9h',
    type: 'result',
    module: 4,
    title: '9H — Isoniazid Daily × 9 Months',
    body: '**Regimen:** [3]\n• [Isoniazid](#/drug/isoniazid/latent tb) **5 mg/kg** PO daily (max 300 mg) × 9 months\n• Pyridoxine (B6) 25–50 mg PO daily\n• Alternative: 15 mg/kg PO twice weekly by DOT (max 900 mg) [3]\n\n**Use when rifamycins are contraindicated:**\n• HIV on protease inhibitors or certain ARVs\n• Drug interactions precluding rifampin/rifapentine\n• Known rifampin-resistant TB contact [3]\n\n**Drawback:** Lowest completion rates (~50%) due to 9-month duration. [3]\n\n**Hepatotoxicity risk** increases with age, alcohol use, and concurrent hepatotoxic drugs. Monthly LFT monitoring recommended for patients >35 years. [3]\n\n**Completion:** Must take ≥270 of 270 planned doses within 12 months. [3]\n\n[TB Patient Information](#/info/tb-patient-info) — shareable patient education sheet.',
    recommendation: 'Start isoniazid 300 mg PO daily × 9 months with pyridoxine. Monthly LFTs if age >35. Monitor adherence closely.',
    confidence: 'recommended',
    citation: [3],
    treatment: {
      firstLine: {
        drug: 'Isoniazid (9H)',
        dose: '5 mg/kg (max 300 mg)',
        route: 'PO',
        frequency: 'Daily',
        duration: '9 months (270 doses)',
        notes: 'Pyridoxine (B6) 25-50 mg daily. Must complete within 12 months. Lowest completion rates (~50%).',
      },
      alternative: {
        drug: 'Isoniazid twice weekly (DOT)',
        dose: '15 mg/kg (max 900 mg)',
        route: 'PO',
        frequency: 'Twice weekly',
        duration: '9 months',
        notes: 'Directly observed therapy required for intermittent dosing.',
      },
      monitoring: 'Monthly LFTs if age >35, hepatitis, HIV, alcohol use. Monthly clinical assessment for hepatotoxicity symptoms.',
    },
  },

  // ===================================================================
  // MODULE 5: Drug-Resistant TB
  // ===================================================================
  {
    id: 'tb-resistant-class',
    type: 'question',
    module: 5,
    title: 'Drug-Resistant TB Classification',
    body: '[MDR-TB Drug Guide](#/info/tb-mdr-guide) — regimen building reference.\n\n**Resistance definitions:** [4]\n\n• **Monoresistant:** Resistance to ONE first-line drug only\n• **Polyresistant:** Resistance to >1 first-line drug (but NOT both INH + RIF)\n• **MDR-TB:** Resistance to at least **isoniazid AND rifampin**\n• **Pre-XDR-TB:** MDR-TB + resistance to any **fluoroquinolone**\n• **XDR-TB:** MDR-TB + resistance to a fluoroquinolone AND at least one Group A drug (bedaquiline or linezolid) [4]\n\n**Management of drug-resistant TB should involve TB specialists.** [4]\n\n**Select resistance pattern:**',
    citation: [4],
    options: [
      {
        label: 'INH monoresistance',
        description: 'Resistant to isoniazid only — most common pattern',
        next: 'tb-inh-mono',
      },
      {
        label: 'MDR-TB',
        description: 'Resistant to at least INH + RIF — requires modified regimen',
        next: 'tb-mdr-approach',
        urgency: 'urgent',
      },
      {
        label: 'Pre-XDR or XDR-TB',
        description: 'MDR + fluoroquinolone resistance (± bedaquiline/linezolid resistance)',
        next: 'tb-bpal',
        urgency: 'critical',
      },
    ],
  },
  {
    id: 'tb-inh-mono',
    type: 'result',
    module: 5,
    title: 'INH Monoresistance',
    body: 'INH monoresistance is the **most common** resistance pattern worldwide. [4]\n\n**Recommended regimen:** [4]\n• **Discontinue isoniazid**\n• Continue [Rifampin](#/drug/rifampin/tuberculosis), [Pyrazinamide](#/drug/pyrazinamide/tuberculosis), [Ethambutol](#/drug/ethambutol/tuberculosis)\n• Add a **fluoroquinolone** ([Moxifloxacin](#/drug/moxifloxacin/tuberculosis) 400 mg daily preferred)\n• Duration: **6 months** minimum (extend to 9 months if PZA not tolerated) [4]\n\n**Monitoring:**\n• Monthly sputum cultures\n• Drug susceptibility testing to confirm no additional resistance\n• LFTs monthly',
    recommendation: 'Discontinue INH. Continue RIF + PZA + EMB + add moxifloxacin. Minimum 6 months. Monthly sputum cultures.',
    confidence: 'recommended',
    citation: [4],
    treatment: {
      firstLine: {
        drug: 'Rifampin + Pyrazinamide + Ethambutol + Moxifloxacin',
        dose: 'RIF 10 mg/kg (max 600 mg) + PZA 25 mg/kg (max 2000 mg) + EMB 15-20 mg/kg (max 1600 mg) + MOX 400 mg',
        route: 'PO',
        frequency: 'Daily',
        duration: '6 months minimum (9 months if PZA not tolerated)',
        notes: 'Discontinue isoniazid. Add fluoroquinolone to compensate for INH loss.',
      },
      monitoring: 'Monthly sputum cultures. DST to confirm no additional resistance. Monthly LFTs. ECG monitoring for QTc (moxifloxacin).',
    },
  },
  {
    id: 'tb-mdr-approach',
    type: 'info',
    module: 5,
    title: 'MDR-TB — Initial Approach',
    body: '**MDR-TB = resistance to at least INH + RIF.** [4]\n\nThis requires **expert consultation** — management should be undertaken by individuals with TB expertise or in close consultation with such individuals. [4]\n\n**Guiding principles:** [4]\n• **Never add a single drug** to a failing regimen\n• Include at least **4–5 effective drugs** in the regimen\n• Use DST results to guide drug selection\n• Prioritize WHO Group A drugs (fluoroquinolones, bedaquiline, linezolid)\n• Duration: typically **9–20 months** depending on regimen\n\n**WHO drug grouping for MDR-TB regimens:** [4,10]\n• **Group A (preferred):** Fluoroquinolones, bedaquiline, linezolid\n• **Group B (add next):** Clofazimine, cycloserine\n• **Group C (when A+B insufficient):** Ethambutol, delamanid, pyrazinamide, imipenem, amikacin\n\n**Two regimen approaches available:**\n→ Abbreviated (BPaL/BPaLM) — 6–9 months\n→ Longer individualized — 15–20 months',
    citation: [4, 10],
    next: 'tb-bpal',
  },
  {
    id: 'tb-bpal',
    type: 'info',
    module: 5,
    title: 'BPaL / BPaLM Regimens',
    body: '[MDR-TB Drug Guide](#/info/tb-mdr-guide) — detailed drug dosing and monitoring.\n\n**BPaL Regimen (Bedaquiline + Pretomanid + Linezolid):** [4]\n• [Bedaquiline](#/drug/bedaquiline/mdr-tb) 400 mg daily × 2 weeks, then 200 mg 3×/week × 24 weeks\n• [Pretomanid](#/drug/pretomanid/mdr-tb) 200 mg daily × 26 weeks\n• [Linezolid](#/drug/linezolid/mdr-tb) 1200 mg daily × 26 weeks (reduce to 600 mg if toxicity)\n• **Total duration: 26 weeks (6 months)**\n\n**BPaLM Regimen (add Moxifloxacin):** [4]\n• Same as BPaL PLUS [Moxifloxacin](#/drug/moxifloxacin/mdr-tb) 400 mg daily\n• Use when fluoroquinolone susceptibility is confirmed\n• May improve outcomes and allow linezolid dose reduction\n\n**Key monitoring:** [4]\n• **QTc** — bedaquiline AND moxifloxacin both prolong QTc\n  → Baseline ECG, then at least monthly\n  → Hold if QTc >500 ms\n• **CBC weekly** — linezolid causes thrombocytopenia and anemia\n• **Visual acuity + neuropathy assessment** monthly — linezolid toxicity\n• **LFTs** monthly — hepatotoxicity from bedaquiline/pretomanid',
    citation: [4],
    treatment: {
      firstLine: {
        drug: 'BPaL: Bedaquiline + Pretomanid + Linezolid',
        dose: 'BDQ 400 mg daily (2 wk) then 200 mg 3x/wk + Pa 200 mg daily + LZD 1200 mg daily',
        route: 'PO',
        frequency: 'Daily (BDQ 3x/wk after week 2)',
        duration: '26 weeks (6 months)',
        notes: 'Reduce linezolid to 600 mg if toxicity occurs. For MDR-TB and pre-XDR/XDR-TB.',
      },
      alternative: {
        drug: 'BPaLM: Bedaquiline + Pretomanid + Linezolid + Moxifloxacin',
        dose: 'BDQ 400 mg (2 wk) then 200 mg 3x/wk + Pa 200 mg + LZD 1200 mg + MOX 400 mg daily',
        route: 'PO',
        frequency: 'Daily (BDQ 3x/wk after week 2)',
        duration: '26 weeks (6 months)',
        notes: 'Use when fluoroquinolone susceptibility confirmed. May allow LZD dose reduction.',
      },
      monitoring: 'ECG baseline then monthly (QTc - hold if >500 ms). Weekly CBC (linezolid). Monthly visual acuity and neuropathy assessment. Monthly LFTs.',
    },
    next: 'tb-mdr-result',
    calculatorLinks: [{ id: 'tb-interaction', label: 'Drug Interaction Checker' }],
  },
  {
    id: 'tb-mdr-result',
    type: 'result',
    module: 5,
    title: 'MDR-TB Treatment Plan',
    body: '**Selected MDR-TB regimen initiated.** [4]\n\n**Ongoing management:**\n• Monthly sputum cultures until conversion documented\n• **DST-guided therapy** — adjust regimen based on full susceptibility results\n• Monthly clinical assessment: weight, symptoms, adherence\n• Monthly labs: LFTs, CBC (weekly if on linezolid), BMP\n• ECG monitoring for QTc (monthly minimum if on bedaquiline/moxifloxacin) [4]\n\n**Treatment completion criteria:** [4]\n• BPaL/BPaLM: Complete 26 weeks\n• Longer regimen: 15–20 months (at least 15 months after culture conversion)\n\n**Role of surgery:** Consider for localized, drug-resistant disease not responding to medical therapy. [4]\n\n**Resources for expert guidance:** [4]\n• CDC Division of Tuberculosis Elimination: 404-639-8120\n• Regional TB Centers of Excellence\n• State/local TB control programs',
    recommendation: 'MDR-TB regimen with expert consultation. Monthly cultures, QTc monitoring, CBC, LFTs. Minimum 6 months (BPaL) or 15-20 months (longer regimen).',
    confidence: 'recommended',
    citation: [4],
  },

  // ===================================================================
  // MODULE 6: HIV-TB Co-infection
  // ===================================================================
  {
    id: 'tb-hiv-entry',
    type: 'info',
    module: 6,
    title: 'HIV-TB Co-infection',
    body: '[HIV-TB Considerations](#/info/tb-hiv-considerations) — ARV interactions reference.\n\nTB treatment in HIV-positive patients requires simultaneous consideration of: [5]\n\n• **Anti-TB regimen** — same RIPE backbone, but drug interactions with ARVs\n• **Antiretroviral therapy (ART)** — timing, drug selection, interaction management\n• **Immune reconstitution inflammatory syndrome (IRIS)** — paradoxical worsening\n• **Duration adjustments** — may need extended therapy\n\n**Key principles:** [5]\n• Start TB treatment immediately\n• Start ART within **2 weeks** if CD4 <50 (unless CNS TB — delay to 8 weeks)\n• Start ART within **8 weeks** for all other CD4 counts\n• **Never delay TB treatment** while waiting for ART',
    citation: [5],
    next: 'tb-hiv-art',
  },
  {
    id: 'tb-hiv-art',
    type: 'info',
    module: 6,
    title: 'ARV Considerations with TB',
    body: '**Rifampin is a potent CYP3A4 inducer** — major drug interactions with ARVs: [5]\n\n**Compatible ARV regimens:** [5]\n• **Efavirenz-based** — standard dose, no adjustment needed\n• **Dolutegravir-based** — increase to DTG 50 mg BID (from daily) with rifampin\n• **Raltegravir-based** — increase to RAL 800 mg BID with rifampin\n\n**Incompatible with rifampin:**\n• Protease inhibitors (boosted or unboosted)\n• Cobicistat-boosted regimens\n• Most NNRTIs except efavirenz\n\n**Alternative:** Use **rifabutin** instead of rifampin — fewer drug interactions, compatible with some PIs. [5]\n\n**Timing of ART initiation:** [5]\n• CD4 <50: Start ART within **2 weeks** of TB treatment\n• CD4 ≥50: Start ART within **8 weeks**\n• **Exception — CNS TB (TB meningitis):** Delay ART to **8 weeks** regardless of CD4 (high IRIS risk)',
    citation: [5],
    calculatorLinks: [{ id: 'tb-interaction', label: 'Drug Interaction Checker' }],
    next: 'tb-hiv-duration',
  },
  {
    id: 'tb-hiv-duration',
    type: 'question',
    module: 6,
    title: 'Treatment Duration — HIV',
    body: 'Standard RIPE regimen duration for HIV-TB: [5]\n\n**Traditional regimen:** Same as HIV-negative patients, but extend if:\n• Cavitary disease AND positive 2-month sputum culture → extend to **9 months total**\n\n**4-month rifapentine-moxifloxacin regimen:** [5]\n• May be used in HIV+ patients with CD4 >100 who are on compatible ARVs\n• Not recommended if CD4 ≤100\n\n**Assess clinical response:**',
    citation: [5],
    options: [
      {
        label: 'Good response — standard duration',
        description: 'Negative 2-month culture, improving symptoms, no cavitation',
        next: 'tb-hiv-monitoring',
      },
      {
        label: 'Poor response — extend therapy',
        description: 'Positive 2-month culture, cavitary disease, slow improvement',
        next: 'tb-hiv-extended',
        urgency: 'urgent',
      },
      {
        label: 'Paradoxical worsening (suspect IRIS)',
        description: 'New/worsening symptoms after starting ART — fever, lymphadenopathy, worsening CXR',
        next: 'tb-hiv-iris',
        urgency: 'urgent',
      },
    ],
  },
  {
    id: 'tb-hiv-monitoring',
    type: 'result',
    module: 6,
    title: 'HIV-TB Monitoring & Follow-Up',
    body: '**Treatment monitoring for HIV-TB:** [5]\n\n**Sputum monitoring:**\n• Monthly cultures until conversion documented\n• If positive at 2 months → extend therapy to 9 months total\n\n**Drug-related side effects:** [5]\n• Monitor for hepatotoxicity (INH, RIF, PZA — all hepatotoxic, HIV increases risk)\n• Peripheral neuropathy (INH — give pyridoxine B6)\n• Optic neuritis (EMB — monthly visual acuity)\n• GI intolerance, rash\n\n**ARV monitoring:**\n• HIV viral load at 4–8 weeks after ART start\n• CD4 count quarterly\n• Watch for drug interactions with rifampin\n\n**Therapeutic drug monitoring (TDM):**\n• Consider for patients with slow response, malabsorption, or drug interactions [5]\n\n**Completion criteria:** Same as HIV-negative (6 months standard, 9 months if cavitary + positive 2-month cx).\n\n[TB Patient Information](#/info/tb-patient-info) — shareable patient education sheet.',
    recommendation: 'Standard RIPE regimen with monthly sputum cultures. Monitor for hepatotoxicity, IRIS. ART timing per CD4 count. Pyridoxine B6 with INH.',
    confidence: 'definitive',
    citation: [5],
  },
  {
    id: 'tb-hiv-extended',
    type: 'result',
    module: 6,
    title: 'Extended Therapy — HIV-TB',
    body: '**Extend continuation phase to 7 months (9 months total)** if: [5]\n• Cavitary disease on initial CXR\n• Positive sputum culture at 2 months\n• Slow clinical response\n\n**If cultures remain positive at 4 months:** [5]\n• Consider treatment failure\n• Repeat DST — exclude acquired drug resistance\n• Consult TB specialist\n• Assess adherence, malabsorption, drug interactions\n• Consider TDM (therapeutic drug monitoring)\n\n**Do not stop ART** during TB treatment unless directed by HIV specialist.',
    recommendation: 'Extend to 9-month regimen. Repeat DST if cultures positive at 4 months. Ensure ART adherence and compatibility.',
    confidence: 'recommended',
    citation: [5],
  },
  {
    id: 'tb-hiv-iris',
    type: 'result',
    module: 6,
    title: 'IRIS — Immune Reconstitution',
    body: '**Immune Reconstitution Inflammatory Syndrome (IRIS):** [5]\n\nParadoxical clinical worsening after starting ART, caused by recovering immune system mounting an exaggerated inflammatory response to TB antigens.\n\n**Timing:** Typically **1–4 weeks** after ART initiation, more common with:\n• Low baseline CD4 (<50)\n• High TB burden (cavitary, disseminated)\n• Early ART initiation [5]\n\n**Clinical features:**\n• New or worsening fever\n• Enlarging lymph nodes\n• New or worsening pulmonary infiltrates\n• New pleural effusions\n• Worsening of original TB symptoms\n\n**Management:** [5]\n• **Continue both TB treatment and ART** — do NOT stop\n• Mild: NSAIDs for symptomatic relief\n• Moderate-severe: **Prednisone** 1.5 mg/kg/day × 2 weeks, then taper over 2–4 weeks\n• Life-threatening (respiratory failure, CNS involvement): High-dose corticosteroids, consider temporary ART interruption only with specialist guidance\n\n**Key point:** IRIS is a sign of immune recovery, not treatment failure. Most cases resolve with continued therapy.',
    recommendation: 'Continue both TB treatment and ART. Mild IRIS: NSAIDs. Moderate-severe: prednisone taper. Do NOT stop ART unless life-threatening.',
    confidence: 'recommended',
    citation: [5],
  },
];

export const TUBERCULOSIS_NODE_COUNT = TUBERCULOSIS_NODES.length;

export const TUBERCULOSIS_MODULE_LABELS = [
  'ED Evaluation',
  'Diagnosis',
  'Drug-Susceptible Treatment',
  'Latent TB',
  'Drug-Resistant TB',
  'HIV-TB',
];

export const TUBERCULOSIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Bernardo J. Diagnosis of pulmonary tuberculosis disease in adults. UpToDate. Updated Jan 30, 2026.' },
  { num: 2, text: 'Sterling TR. Treatment of drug-susceptible pulmonary tuberculosis in nonpregnant adults without HIV infection. UpToDate. Updated Nov 10, 2025.' },
  { num: 3, text: 'Horsburgh CR. Treatment of tuberculosis infection (latent tuberculosis) in nonpregnant adults without HIV infection. UpToDate. Updated Jan 30, 2026.' },
  { num: 4, text: 'Heysell SK. Treatment of drug-resistant pulmonary tuberculosis in adults. UpToDate. Updated Jan 7, 2026.' },
  { num: 5, text: 'Brust JCM. Treatment of pulmonary tuberculosis in adults with HIV infection: Follow-up after initiation of therapy. UpToDate. Updated Feb 17, 2026.' },
  { num: 6, text: 'World Health Organization. Global Tuberculosis Report 2024. Geneva: WHO; 2024.' },
  { num: 7, text: 'American Thoracic Society, CDC, Infectious Diseases Society of America. Treatment of tuberculosis. Am J Respir Crit Care Med. 2003;167(4):603-662.' },
  { num: 8, text: 'Nahid P, Dorman SE, Alipanah N, et al. Official ATS/CDC/IDSA clinical practice guideline: treatment of drug-susceptible tuberculosis. Clin Infect Dis. 2016;63(7):e147-e195.' },
  { num: 9, text: 'CDC. Interim guidance: 4-month rifapentine-moxifloxacin regimen for treatment of drug-susceptible pulmonary tuberculosis — United States, 2022. MMWR Morb Mortal Wkly Rep. 2022;71(8):285-289.' },
  { num: 10, text: 'World Health Organization. WHO consolidated guidelines on tuberculosis. Module 4: treatment — drug-resistant tuberculosis treatment, 2022 update. Geneva: WHO; 2022.' },
];
