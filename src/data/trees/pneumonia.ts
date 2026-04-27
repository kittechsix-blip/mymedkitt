// MedKitt — Pneumonia
// Comprehensive pneumonia management: CAP, HAP/VAP, complicated (empyema, abscess), special populations
// Severity scoring (PSI, CURB-65, SMART-COP), empiric antibiotics, MRSA/Pseudomonas risk, disposition
// 8 modules: Initial → Severity → CAP Outpatient → CAP Inpatient → HAP/VAP → Complicated → Special → Disposition
// 26 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction, Citation } from '../../services/tree-service.js';

export const PNEUMONIA_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'PSI Class I-II or CURB-65 0: outpatient treatment appropriate', nodeId: 'pna-severity' },
  { text: 'Severe CAP: 1 major criterion (septic shock, mechanical ventilation) OR 3+ minor criteria → ICU', nodeId: 'pna-severe-criteria' },
  { text: 'MRSA coverage: add if prior MRSA isolation, recent hospitalization, ESRD, recent IV antibiotics', nodeId: 'pna-mrsa-risk' },
  { text: 'Pseudomonas coverage: add if prior isolation, bronchiectasis, severe COPD, tracheostomy history', nodeId: 'pna-pseudo-risk' },
  { text: 'Macrolide monotherapy NO LONGER recommended for CAP (>30% resistance in US)', nodeId: 'pna-outpatient-healthy' },
  { text: 'ACCP Stage 3-4 effusion (pH <7.2, glucose <40, positive culture, pus) requires drainage', nodeId: 'pna-effusion-assess' },
  { text: 'Loculated effusion: tPA 10mg + DNase 5mg BID × 3 days (MIST2 protocol) → 90% success', nodeId: 'pna-drainage-fibrinolytics' },
  { text: 'Failed tube drainage 48-72h → escalate to VATS; early surgery (7-10d) has better outcomes', nodeId: 'pna-surgery-indications' },
  { text: 'HAP/VAP: 7 days total treatment, de-escalate at 48h if cultures negative', nodeId: 'pna-hap-abx' },
  { text: 'CAP duration: 5 days total if clinically stable with normal vitals', nodeId: 'pna-inpatient-nonsevere' },
];

export const PNEUMONIA_MODULE_LABELS: string[] = [
  'Initial Assessment',
  'Severity Assessment',
  'CAP Outpatient',
  'CAP Inpatient',
  'HAP/VAP',
  'Complicated Pneumonia',
  'Special Populations',
  'Disposition',
];

export const PNEUMONIA_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'pna-start',
    type: 'question',
    module: 1,
    title: 'Pneumonia Type',
    body: '[Pneumonia Overview](#/info/pna-overview)\n\n**Clinical definition:** Acute respiratory infection with pulmonary infiltrate on imaging + compatible symptoms (cough, dyspnea, fever, sputum production).\n\n**Key initial questions:**\n• Where was pneumonia acquired?\n• Is the patient immunocompromised?\n• Are there risk factors for resistant organisms?\n\n**This pathway covers:**\n• Community-acquired pneumonia (CAP)\n• Hospital-acquired pneumonia (HAP) / Ventilator-associated (VAP)\n• Complicated pneumonia (empyema, abscess)\n• Special populations (aspiration, influenza, COVID-19)\n\n**Note:** Immunocompromised patients may need additional workup for opportunistic infections.',
    citation: [1, 2],
    options: [
      {
        label: 'Community-Acquired (CAP)',
        next: 'pna-severity',
      },
      {
        label: 'Hospital-Acquired (HAP/VAP)',
        next: 'pna-hap-start',
      },
      {
        label: 'Complicated (Effusion/Empyema/Abscess)',
        next: 'pna-complicated-start',
      },
      {
        label: 'Aspiration Pneumonia',
        next: 'pna-aspiration',
      },
      {
        label: 'Influenza Pneumonia',
        next: 'pna-influenza',
      },
    ],
    summary: 'Triage by acquisition setting: CAP vs HAP/VAP vs complicated vs aspiration vs influenza',
  },

  // =====================================================================
  // MODULE 2: SEVERITY ASSESSMENT
  // =====================================================================

  {
    id: 'pna-severity',
    type: 'info',
    module: 2,
    title: 'CAP Severity Assessment',
    body: '[PSI/PORT Calculator](#/calculator/psi-port) | [CURB-65 Calculator](#/calculator/curb-65) | [SMART-COP Calculator](#/calculator/smart-cop)\n\n**IDSA 2019 recommends PSI over CURB-65** for disposition decisions.\n\n**PSI/PORT Score (5 classes):**\n• Class I-II (<50 pts): Outpatient\n• Class III (51-70 pts): Observation/short admission\n• Class IV (71-130 pts): Hospitalization\n• Class V (>130 pts): ICU-level care\n\n**CURB-65 (simpler, 5 variables):**\n• 0: 0.9% mortality → outpatient\n• 1-2: 9.2% mortality → observation/short admission\n• 3-4: 22% mortality → hospitalization\n• 5: 57% mortality → ICU\n\n**SMART-COP (predicts ICU need):**\n• 0-2: Low risk (5% need IRVS)\n• 3-4: Moderate (13% need IRVS)\n• 5-6: High (33% need IRVS)\n• ≥7: Very high (67% need IRVS)',
    citation: [1, 3, 4],
    calculatorLinks: [
      { id: 'psi-port', label: 'PSI/PORT Score' },
      { id: 'curb-65', label: 'CURB-65' },
      { id: 'smart-cop', label: 'SMART-COP' },
    ],
    next: 'pna-severity-result',
    summary: 'PSI preferred over CURB-65 per IDSA 2019; PSI I-II = outpatient, III = observation, IV-V = admit/ICU',
  },

  {
    id: 'pna-severity-result',
    type: 'question',
    module: 2,
    title: 'Severity Score Result',
    body: '**Based on PSI or CURB-65:**\n\n**Low severity (PSI I-II or CURB-65 0-1):**\n• Outpatient treatment appropriate\n• Ensure no severe CAP criteria\n\n**Moderate severity (PSI III or CURB-65 2):**\n• Consider observation or short hospitalization\n• Patient factors may tip decision\n\n**High severity (PSI IV-V or CURB-65 ≥3):**\n• Hospitalization required\n• Assess for ICU need\n\n**Always check for severe CAP criteria regardless of score.**',
    citation: [1],
    options: [
      {
        label: 'Low Severity → Outpatient',
        next: 'pna-outpatient-comorbid',
      },
      {
        label: 'Moderate → Admit Non-ICU',
        next: 'pna-mrsa-risk',
      },
      {
        label: 'High Severity → Check Severe Criteria',
        next: 'pna-severe-criteria',
      },
    ],
    summary: 'Route to outpatient, inpatient, or ICU based on severity scoring',
  },

  {
    id: 'pna-severe-criteria',
    type: 'question',
    module: 2,
    title: 'Severe CAP Criteria',
    body: '[Severe CAP Criteria](#/info/pna-severe-info)\n\n**Major criteria (any 1 = ICU):**\n• Septic shock requiring vasopressors\n• Respiratory failure requiring mechanical ventilation\n\n**Minor criteria (3+ = severe CAP):**\n• RR ≥30\n• PaO2/FiO2 ≤250\n• Multilobar infiltrates\n• Confusion/disorientation\n• Uremia (BUN ≥20)\n• Leukopenia (WBC <4,000)\n• Thrombocytopenia (<100,000)\n• Hypothermia (<36°C)\n• Hypotension requiring aggressive fluid resuscitation\n\n**How many criteria does the patient meet?**',
    citation: [1, 2],
    options: [
      {
        label: 'Major Criterion (Shock or Vent) → ICU',
        next: 'pna-icu',
      },
      {
        label: '3+ Minor Criteria → ICU',
        next: 'pna-icu',
      },
      {
        label: '<3 Minor Criteria → Non-ICU',
        next: 'pna-mrsa-risk',
      },
    ],
    summary: 'Severe CAP: 1 major (shock/vent) or 3+ minor criteria → direct ICU admission',
  },

  // =====================================================================
  // MODULE 3: CAP OUTPATIENT
  // =====================================================================

  {
    id: 'pna-outpatient-comorbid',
    type: 'question',
    module: 3,
    title: 'Outpatient Risk Assessment',
    body: '**Does the patient have comorbidities?**\n\n**Comorbidities that affect treatment:**\n• Chronic heart disease\n• Chronic lung disease (COPD, asthma)\n• Chronic liver disease\n• Chronic kidney disease\n• Diabetes mellitus\n• Alcoholism\n• Malignancy\n• Asplenia\n• Recent antibiotic use (<90 days)\n\n**These patients need broader coverage** due to higher risk of resistant organisms.',
    citation: [1],
    options: [
      {
        label: 'Healthy, No Comorbidities',
        next: 'pna-outpatient-healthy',
      },
      {
        label: 'Has Comorbidities',
        next: 'pna-outpatient-comorbid-abx',
      },
    ],
    summary: 'Comorbidities (COPD, CHF, DM, CKD, liver disease, asplenia) → broader coverage needed',
  },

  {
    id: 'pna-outpatient-healthy',
    type: 'result',
    module: 3,
    title: 'Outpatient CAP — Healthy Patient',
    body: '[Antibiotic Dosing Reference](#/info/pna-abx-dosing)\n\n**IDSA 2019 First-Line (choose one):**\n\n**1. Amoxicillin** (preferred)\n• 1g PO TID × 5 days\n\n**2. Doxycycline**\n• 100mg PO BID × 5 days\n\n**3. Respiratory Fluoroquinolone** (if allergies)\n• Levofloxacin 750mg daily × 5 days\n• Moxifloxacin 400mg daily × 5 days\n\n**⚠️ Macrolide monotherapy (azithromycin) NO LONGER recommended**\n• S. pneumoniae resistance >30% in US\n• Only use if local resistance <25%\n\n**Duration:** 5 days if afebrile ≥48h and clinically stable\n\n**Return precautions:** Worsening symptoms, persistent fever >48h, new chest pain, hemoptysis',
    citation: [1, 5],
    recommendation: 'Amoxicillin 1g PO TID or doxycycline 100mg BID × 5 days. NO macrolide monotherapy. Return if worsening.',
    confidence: 'recommended',
    summary: 'Healthy outpatient: amoxicillin 1g TID or doxycycline 100mg BID × 5 days; NO macrolide monotherapy',
  },

  {
    id: 'pna-outpatient-comorbid-abx',
    type: 'result',
    module: 3,
    title: 'Outpatient CAP — With Comorbidities',
    body: '[Antibiotic Dosing Reference](#/info/pna-abx-dosing)\n\n**IDSA 2019 — Choose ONE regimen:**\n\n**Option 1: Respiratory Fluoroquinolone** (preferred)\n• Levofloxacin 750mg PO daily × 5 days, OR\n• Moxifloxacin 400mg PO daily × 5 days\n\n**Option 2: Beta-lactam + Macrolide/Doxycycline**\n• Amoxicillin-clavulanate 875/125mg TID × 5 days, PLUS\n• Azithromycin 500mg day 1, then 250mg daily × 4 days, OR\n• Doxycycline 100mg BID × 5 days\n\n**Option 3: 3rd-Gen Cephalosporin + Macrolide**\n• Cefpodoxime 200mg BID + azithromycin × 5 days\n\n**Duration:** 5 days if afebrile ≥48h and clinically stable\n\n**Close follow-up:** Return in 48-72h if not improving',
    citation: [1, 5],
    recommendation: 'FQ monotherapy OR beta-lactam + macrolide/doxy × 5 days. Close follow-up in 48-72h.',
    confidence: 'recommended',
    summary: 'Comorbid outpatient: FQ monotherapy OR beta-lactam + macrolide/doxy × 5 days',
  },

  // =====================================================================
  // MODULE 4: CAP INPATIENT
  // =====================================================================

  {
    id: 'pna-mrsa-risk',
    type: 'question',
    module: 4,
    title: 'MRSA Risk Assessment',
    body: '[MRSA Risk Factors](#/info/pna-mrsa-info)\n\n**Add empiric MRSA coverage if ANY of:**\n• Prior MRSA isolation (respiratory or other site)\n• IV antibiotics within past 90 days\n• Hospitalization within past 90 days\n• Nursing home/long-term care resident\n• End-stage renal disease (ESRD)\n• Injection drug use\n• Lung abscess or empyema\n• Recent influenza\n\n**Local epidemiology matters:**\n• If MRSA prevalence >10-20% in your facility, lower threshold to cover\n\n**MRSA nasal PCR:** Excellent NPV (~95%). If negative, can guide stopping vancomycin at 48h.',
    citation: [1, 2, 6],
    options: [
      {
        label: 'MRSA Risk Factors Present',
        next: 'pna-pseudo-risk',
      },
      {
        label: 'No MRSA Risk Factors',
        next: 'pna-pseudo-risk',
      },
    ],
    summary: 'MRSA coverage if: prior isolation, recent hospitalization/abx, ESRD, IVDU, abscess/empyema, recent flu',
  },

  {
    id: 'pna-pseudo-risk',
    type: 'question',
    module: 4,
    title: 'Pseudomonas Risk Assessment',
    body: '[Pseudomonas Risk Factors](#/info/pna-pseudo-info)\n\n**Add empiric Pseudomonas coverage if ANY of:**\n• Prior Pseudomonas respiratory isolation (strongest predictor)\n• Bronchiectasis\n• Severe COPD (FEV1 <25% predicted)\n• Tracheostomy history\n• Lung abscess or empyema\n• Recurrent pneumonia requiring hospitalization\n\n**Note:** Isolated COPD without additional factors has same Pseudomonas risk as general population (~1-2.5%).\n\n**Do NOT add Pseudomonas coverage routinely** — reserve for specific risk factors.',
    citation: [1, 2, 6],
    options: [
      {
        label: 'Pseudomonas Risk Factors Present',
        next: 'pna-inpatient-resistant',
      },
      {
        label: 'No Pseudomonas Risk Factors',
        next: 'pna-inpatient-nonsevere',
      },
    ],
    summary: 'Pseudomonas coverage if: prior isolation, bronchiectasis, severe COPD, tracheostomy; NOT routine COPD',
  },

  {
    id: 'pna-inpatient-nonsevere',
    type: 'result',
    module: 4,
    title: 'Inpatient CAP — Non-Severe',
    body: '[Antibiotic Dosing Reference](#/info/pna-abx-dosing)\n\n**IDSA 2019 — Choose ONE regimen:**\n\n**Option 1: Beta-lactam + Macrolide** (preferred)\n• Ceftriaxone 1-2g IV daily + azithromycin 500mg IV/PO daily, OR\n• Ampicillin-sulbactam 3g IV Q6h + azithromycin 500mg daily\n\n**Option 2: Respiratory Fluoroquinolone Monotherapy**\n• Levofloxacin 750mg IV/PO daily, OR\n• Moxifloxacin 400mg IV/PO daily\n\n**If MRSA risk flagged, add:**\n• Vancomycin 15-20 mg/kg IV Q8-12h (target trough 15-20), OR\n• Linezolid 600mg IV/PO BID\n\n**Duration:** 5 days total (IV + PO) if:\n• Afebrile ≥48h\n• Clinically stable (RR <24, HR <100, SBP >90)\n• Tolerating PO\n• Improving mentation\n\n**De-escalation:** Stop MRSA coverage at 48h if cultures negative and improving.',
    citation: [1, 5, 6],
    recommendation: 'CTX + azithro OR FQ monotherapy. Add vanc/linezolid if MRSA risk. 5 days total. De-escalate at 48h.',
    confidence: 'recommended',
    summary: 'Non-severe inpatient: CTX + azithro OR FQ; add vanc/linezolid if MRSA risk; 5 days total',
  },

  {
    id: 'pna-inpatient-resistant',
    type: 'result',
    module: 4,
    title: 'Inpatient CAP — MRSA/Pseudomonas Risk',
    body: '[Antibiotic Dosing Reference](#/info/pna-abx-dosing)\n\n**Empiric Regimen (cover all gaps):**\n\n**Anti-pseudomonal Beta-lactam (choose one):**\n• Cefepime 2g IV Q8h, OR\n• Piperacillin-tazobactam 4.5g IV Q6h, OR\n• Meropenem 1g IV Q8h (if ESBL concern)\n\n**PLUS Atypical Coverage:**\n• Azithromycin 500mg IV daily, OR\n• Levofloxacin 750mg IV daily (also covers Pseudomonas)\n\n**PLUS MRSA Coverage (if flagged):**\n• Vancomycin 15-20 mg/kg IV Q8-12h (trough 15-20), OR\n• Linezolid 600mg IV/PO BID\n\n**De-escalation at 48h:**\n• Stop Pseudomonas coverage if cultures negative\n• Stop MRSA coverage if nasal PCR negative or cultures negative\n• Narrow based on susceptibilities\n\n**Duration:** 5-7 days (may extend if slow response)',
    citation: [1, 2, 6],
    recommendation: 'Cefepime/pip-tazo + azithro/levo + vanc. Aggressive de-escalation at 48h based on cultures.',
    confidence: 'recommended',
    summary: 'MRSA/Pseudomonas risk: cefepime/pip-tazo + azithro/levo + vanc; de-escalate at 48h based on cultures',
  },

  {
    id: 'pna-icu',
    type: 'result',
    module: 4,
    title: 'Severe CAP — ICU Admission',
    body: '[Severe CAP Criteria](#/info/pna-severe-info) | [Antibiotic Dosing Reference](#/info/pna-abx-dosing)\n\n**Standard Severe CAP Regimen:**\n\n**Beta-lactam + Macrolide or FQ:**\n• Ceftriaxone 2g IV daily + azithromycin 500mg IV daily, OR\n• Ceftriaxone 2g IV daily + levofloxacin 750mg IV daily\n\n**If Pseudomonas risk:**\n• Cefepime 2g IV Q8h OR piperacillin-tazobactam 4.5g IV Q6h\n• PLUS levofloxacin 750mg IV daily (dual Pseudomonas coverage)\n\n**If MRSA risk:**\n• ADD vancomycin 25-30 mg/kg loading then 15-20 mg/kg Q8-12h, OR\n• ADD linezolid 600mg IV BID\n\n**Additional ICU considerations:**\n• Steroids: Consider methylprednisolone 40mg IV daily × 5 days if refractory shock\n• Source control: Check for empyema, abscess\n• Blood cultures × 2 before antibiotics\n• Procalcitonin at baseline (helps guide de-escalation)\n\n**Duration:** 7 days minimum; reassess at 48-72h',
    citation: [1, 2, 7],
    recommendation: 'CTX 2g + azithro/levo. Add anti-pseudomonal + vanc if risk factors. Consider steroids if shock. 7+ days.',
    confidence: 'definitive',
    summary: 'Severe/ICU CAP: CTX 2g + azithro/levo; add anti-pseudomonal + vanc if risk factors; consider steroids if shock',
  },

  // =====================================================================
  // MODULE 5: HAP/VAP
  // =====================================================================

  {
    id: 'pna-hap-start',
    type: 'info',
    module: 5,
    title: 'Hospital-Acquired Pneumonia',
    body: '**Definitions:**\n• **HAP:** Pneumonia ≥48h after hospital admission (non-intubated)\n• **VAP:** Pneumonia 48-72h after endotracheal intubation\n\n**Key pathogens (different from CAP):**\n• Staphylococcus aureus (including MRSA)\n• Pseudomonas aeruginosa\n• Enterobacteriaceae (Klebsiella, E. coli)\n• Acinetobacter (ICU-associated)\n\n**All HAP/VAP requires coverage for:**\n1. S. aureus (MRSA if local rate >10-20%)\n2. Pseudomonas aeruginosa\n3. Gram-negative bacilli\n\n**MDR Risk Factors:**\n• IV antibiotics within 90 days\n• Septic shock\n• ARDS\n• High antibiotic use in unit\n• Prolonged hospitalization before ICU',
    citation: [2, 6],
    next: 'pna-hap-mdr',
    summary: 'HAP = ≥48h post-admission; VAP = 48-72h post-intubation; must cover MRSA + Pseudomonas + GNB',
  },

  {
    id: 'pna-hap-mdr',
    type: 'question',
    module: 5,
    title: 'MDR Risk Assessment',
    body: '**Assess risk for multidrug-resistant organisms:**\n\n**High MDR Risk if ANY of:**\n• IV antibiotics within 90 days\n• Septic shock at time of VAP/HAP\n• ARDS preceding VAP\n• ≥5 days hospitalization prior to VAP\n• Acute renal replacement therapy prior to VAP\n• High local MRSA prevalence (>10-20%)\n• High local gram-negative resistance rates\n\n**Local antibiogram is critical** — adjust based on your facility\'s resistance patterns.',
    citation: [2],
    options: [
      {
        label: 'High MDR Risk',
        next: 'pna-hap-abx-mdr',
      },
      {
        label: 'Low MDR Risk',
        next: 'pna-hap-abx',
      },
    ],
    summary: 'High MDR risk: recent abx, shock, ARDS, prolonged hospitalization, high local resistance',
  },

  {
    id: 'pna-hap-abx',
    type: 'result',
    module: 5,
    title: 'HAP/VAP — Low MDR Risk',
    body: '[Antibiotic Dosing Reference](#/info/pna-abx-dosing)\n\n**Empiric Regimen:**\n\n**Anti-pseudomonal Beta-lactam (choose one):**\n• Piperacillin-tazobactam 4.5g IV Q6h, OR\n• Cefepime 2g IV Q8h, OR\n• Levofloxacin 750mg IV daily (if beta-lactam allergy)\n\n**MRSA Coverage (if local rate >10-20%):**\n• Vancomycin 15-20 mg/kg IV Q8-12h, OR\n• Linezolid 600mg IV BID\n\n**Duration:** 7 days total\n\n**De-escalation:**\n• Stop MRSA coverage at 48h if cultures negative\n• Narrow based on susceptibilities\n• Can shorten to 5 days if rapid clinical improvement\n\n**Aminoglycosides: NEVER as monotherapy** (increased mortality)',
    citation: [2, 6],
    recommendation: 'Pip-tazo or cefepime ± vanc. 7 days. De-escalate at 48h if cultures negative. Never aminoglycoside monotherapy.',
    confidence: 'recommended',
    summary: 'Low MDR HAP/VAP: pip-tazo or cefepime ± vanc; 7 days; de-escalate at 48h if cultures negative',
  },

  {
    id: 'pna-hap-abx-mdr',
    type: 'result',
    module: 5,
    title: 'HAP/VAP — High MDR Risk',
    body: '[Antibiotic Dosing Reference](#/info/pna-abx-dosing)\n\n**Empiric Regimen (broad coverage):**\n\n**TWO anti-pseudomonal agents from different classes:**\n\n**Agent 1 — Beta-lactam:**\n• Piperacillin-tazobactam 4.5g IV Q6h, OR\n• Cefepime 2g IV Q8h, OR\n• Meropenem 1g IV Q8h (if ESBL concern), OR\n• Imipenem 500mg IV Q6h\n\n**Agent 2 — Non-beta-lactam:**\n• Levofloxacin 750mg IV daily, OR\n• Ciprofloxacin 400mg IV Q8h, OR\n• Amikacin 15-20 mg/kg IV daily, OR\n• Tobramycin 5-7 mg/kg IV daily\n\n**PLUS MRSA Coverage:**\n• Vancomycin 25-30 mg/kg loading, then 15-20 mg/kg Q8-12h, OR\n• Linezolid 600mg IV BID (may be preferred for lung penetration)\n\n**Duration:** 7 days\n\n**De-escalation:** Aggressive narrowing at 48-72h based on cultures',
    citation: [2, 6],
    recommendation: 'Dual anti-pseudomonal (different classes) + vanc/linezolid. 7 days. Aggressive de-escalation at 48-72h.',
    confidence: 'definitive',
    summary: 'High MDR HAP/VAP: dual anti-pseudomonal (different classes) + vanc/linezolid; 7 days; aggressive de-escalation',
  },

  // =====================================================================
  // MODULE 6: COMPLICATED PNEUMONIA
  // =====================================================================

  {
    id: 'pna-complicated-start',
    type: 'question',
    module: 6,
    title: 'Complicated Pneumonia',
    body: '[Effusion Assessment](#/info/pna-effusion-info)\n\n**Complicated pneumonia includes:**\n• Parapneumonic effusion\n• Empyema\n• Lung abscess\n• Necrotizing pneumonia\n\n**Initial assessment:**\n• Chest imaging (CT preferred if complicated PNA suspected)\n• If effusion present → diagnostic thoracentesis\n• Send fluid for: pH, glucose, LDH, protein, cell count, gram stain, culture\n\n**What does the patient have?**',
    citation: [8],
    options: [
      {
        label: 'Parapneumonic Effusion',
        next: 'pna-effusion-assess',
      },
      {
        label: 'Empyema',
        next: 'pna-empyema',
      },
      {
        label: 'Lung Abscess',
        next: 'pna-abscess',
      },
    ],
    summary: 'Complicated PNA: effusion vs empyema vs abscess; CT preferred; thoracentesis for effusions',
  },

  {
    id: 'pna-effusion-assess',
    type: 'question',
    module: 6,
    title: 'Parapneumonic Effusion Assessment',
    body: '[RAPID Score](#/info/pna-rapid)\n\n**Step 1: Confirm exudate (Light\'s Criteria — ANY 1):**\n• Pleural/serum protein ratio >0.5\n• Pleural/serum LDH ratio >0.6\n• Pleural LDH >2/3 upper limit of serum normal\n\n**Step 2: ACCP Staging (determines drainage need):**\n\n| Stage | Pleural Findings | Risk | Drainage? |\n|-------|-----------------|------|----------|\n| 1 | Minimal (<10mm), free-flowing | Very low | No |\n| 2 | >10mm, free-flowing, pH ≥7.2, glucose ≥60, negative culture | Low | No |\n| 3 | pH <7.2 OR glucose <40 OR positive culture OR loculated | Moderate | **Yes** |\n| 4 | Frank pus | High | **Yes** |\n\n**What stage is this effusion?**',
    citation: [8, 9, 13],
    options: [
      {
        label: 'Stage 1-2: Simple Effusion',
        next: 'pna-effusion-simple',
      },
      {
        label: 'Stage 3: Complicated Effusion',
        next: 'pna-effusion-complicated',
      },
      {
        label: 'Stage 4: Empyema (Frank Pus)',
        next: 'pna-empyema',
      },
    ],
    summary: 'ACCP staging: Stage 1-2 = no drainage; Stage 3 (pH <7.2, loculated, positive culture) = drain; Stage 4 (pus) = drain',
  },

  {
    id: 'pna-effusion-simple',
    type: 'result',
    module: 6,
    title: 'Simple Parapneumonic Effusion (Stage 1-2)',
    body: '**Management — Antibiotics alone:**\n\n• Standard CAP regimen based on severity\n• Duration: 5-7 days\n• Drainage NOT required\n\n**Monitoring:**\n• Repeat imaging at 48-72h\n• 95% resolve with antibiotics alone\n\n**⚠️ Indications to Reclassify → Drain:**\n• Enlarging effusion despite antibiotics\n• Persistent fever >72h\n• Clinical deterioration\n• New loculations on follow-up imaging\n\n**Re-tap if any of above** — check pH, glucose, culture\n\nIf now meets Stage 3-4 criteria → proceed to drainage pathway.',
    citation: [8, 13],
    recommendation: 'Antibiotics alone. Repeat imaging 48-72h. Re-tap if enlarging, persistent fever, or deteriorating.',
    confidence: 'recommended',
    summary: 'Simple effusion: antibiotics alone; 95% resolve; re-tap if enlarging, fever >72h, or deteriorating',
  },

  {
    id: 'pna-effusion-complicated',
    type: 'question',
    module: 6,
    title: 'Complicated Effusion — Drainage Method',
    body: '**Drainage is REQUIRED for Stage 3 effusions.**\n\n**Assess effusion characteristics:**\n\n**Free-flowing (no loculations):**\n• Chest tube (≥14 Fr) or pigtail catheter\n• Success rate ~90%\n\n**Loculated/Septated:**\n• tPA + DNase (MIST2 protocol) with chest tube\n• Success rate ~90% vs 16% for tube alone\n• Alternative: early VATS\n\n**Large/Organizing (>50% hemithorax or pleural thickening >2mm):**\n• Consider early VATS\n• Higher tube failure rate\n\n**What are the effusion characteristics?**',
    citation: [8, 9, 14],
    options: [
      {
        label: 'Free-Flowing — Chest Tube',
        next: 'pna-drainage-tube',
      },
      {
        label: 'Loculated — tPA/DNase or VATS',
        next: 'pna-drainage-fibrinolytics',
      },
      {
        label: 'Large/Organizing — Consider Early Surgery',
        next: 'pna-surgery-indications',
      },
    ],
    summary: 'Free-flowing = tube; loculated = tPA/DNase or VATS; large/organizing = consider early surgery',
  },

  {
    id: 'pna-drainage-tube',
    type: 'question',
    module: 6,
    title: 'Chest Tube Drainage',
    body: '**Chest Tube Placement:**\n\n**Size:** ≥14 Fr (larger not proven better)\n• Small-bore (10-14 Fr) catheter equally effective\n• Image-guided placement preferred\n\n**Placement:**\n• Under ultrasound or CT guidance\n• Avoid "safe triangle" blind insertion if loculated\n\n**Management:**\n• -20 cm H2O suction\n• Daily drainage volume tracking\n• Flush Q6-8h with 20-30mL saline\n\n**Success criteria at 24-48h:**\n• Clinical improvement (fever, WBC, oxygenation)\n• Drainage >200mL/day initially\n• CXR: lung re-expansion, decreasing fluid\n\n**Assess response at 24-48h:**',
    citation: [8, 9],
    options: [
      {
        label: 'Adequate Response — Continue Tube',
        next: 'pna-drainage-success',
      },
      {
        label: 'Inadequate Response — Escalate',
        next: 'pna-drainage-failed',
      },
    ],
    summary: 'Small-bore (10-14 Fr) image-guided; -20 cmH2O suction; assess response at 24-48h',
  },

  {
    id: 'pna-drainage-fibrinolytics',
    type: 'info',
    module: 6,
    title: 'Intrapleural Fibrinolytics (MIST2)',
    body: '**tPA + DNase Protocol (MIST2 Trial):**\n\n**Indication:** Loculated/septated parapneumonic effusion or empyema\n\n**Regimen:**\n• tPA 10mg + DNase 5mg in 30mL saline\n• Instill via chest tube, clamp 1 hour\n• BID × 3 days (6 total doses)\n\n**Evidence (MIST2 NEJM 2011):**\n• Combination: 90% success, 4% surgery rate\n• tPA alone: 55% success\n• DNase alone: 22% success\n• Placebo: 16% success\n\n**Contraindications:**\n• Bronchopleural fistula\n• Active bleeding/coagulopathy\n• Recent surgery (<2 weeks)\n• Allergy to components\n\n**Monitor for:**\n• Chest pain (common, transient)\n• Bleeding (rare but serious)\n• Systemic fibrinolysis (very rare)\n\n**Assess response after 3 days. If inadequate → surgery.**',
    citation: [8, 14],
    next: 'pna-drainage-tube',
    summary: 'MIST2: tPA 10mg + DNase 5mg BID × 3 days; 90% success vs 16% placebo; contraindicated if fistula/bleeding',
  },

  {
    id: 'pna-drainage-success',
    type: 'result',
    module: 6,
    title: 'Successful Tube Drainage',
    body: '**Tube Management:**\n\n**Continue drainage until:**\n• Output <100-150 mL/day (some use <50mL)\n• CXR shows lung re-expansion\n• No air leak\n\n**Tube Removal:**\n• When output low AND imaging clear\n• Consider water seal trial before removal\n• CXR 2-4h post-removal to rule out pneumothorax\n\n**Antibiotics:**\n• Ampicillin-sulbactam 3g IV Q6h, OR\n• Piperacillin-tazobactam 4.5g IV Q6h\n• Add MRSA coverage if risk factors\n• **Duration: 2-4 weeks total** (IV → PO transition)\n\n**PO Transition Options:**\n• Amoxicillin-clavulanate 875mg TID\n• If MRSA: add TMP-SMX or linezolid\n\n**Follow-up:**\n• CXR at 4-6 weeks\n• Persistent opacity → CT to assess for trapped lung',
    citation: [8, 9],
    recommendation: 'Remove tube when <100-150mL/day + lung re-expanded. Antibiotics 2-4 weeks total. CXR at 4-6 weeks.',
    confidence: 'recommended',
    summary: 'Remove tube when <100-150mL/day + lung re-expanded; antibiotics 2-4 weeks; follow-up CXR 4-6 weeks',
  },

  {
    id: 'pna-drainage-failed',
    type: 'question',
    module: 6,
    title: 'Failed Tube Drainage — Escalation',
    body: '**Signs of Drainage Failure (at 24-48h):**\n• Persistent fever\n• No clinical improvement\n• Persistent/enlarging effusion on imaging\n• Loculations developing\n• Tube output <50mL with significant residual fluid\n\n**Options:**\n\n**1. Intrapleural Fibrinolytics (if not yet tried):**\n• tPA + DNase protocol\n• Success ~90% for loculated effusions\n\n**2. VATS (Video-Assisted Thoracoscopic Surgery):**\n• Break up loculations\n• Debride fibrinous peel\n• Definitive drainage\n• Success rate 85-90%\n\n**3. Thoracotomy with Decortication:**\n• Reserved for VATS failure or trapped lung\n• Higher morbidity but definitive\n\n**What is the next step?**',
    citation: [9, 14, 15],
    options: [
      {
        label: 'Try Fibrinolytics First',
        next: 'pna-drainage-fibrinolytics',
      },
      {
        label: 'Proceed to VATS',
        next: 'pna-surgery-indications',
      },
    ],
    summary: 'Failed drainage: try tPA/DNase if not done; otherwise VATS; thoracotomy reserved for VATS failure',
  },

  {
    id: 'pna-surgery-indications',
    type: 'result',
    module: 6,
    title: 'Surgical Indications — VATS vs Thoracotomy',
    body: '**VATS Indications (preferred first-line surgical approach):**\n\n• Failed chest tube ± fibrinolytics (48-72h no improvement)\n• Multiloculated empyema\n• Empyema with thick fibrinous peel\n• Large effusion (>50% hemithorax)\n• Organizing effusion (>2mm pleural thickening)\n• Early Stage 3 empyema (some centers prefer early VATS)\n\n**VATS Procedure:**\n• Debridement of loculations/peel\n• Complete evacuation of infected material\n• Chest tube placement under direct vision\n• Success: 85-90%, mortality 0-2%\n\n**Thoracotomy with Decortication Indications:**\n\n• **VATS failure** (10-15% conversion rate)\n• **Trapped lung** (organized fibrous peel preventing expansion)\n• **Stage IV empyema** (organized with lung entrapped)\n• **Bronchopleural fistula** requiring repair\n• **Suspected malignancy** requiring tissue\n\n**Timing Matters:**\n• Early surgery (within 7-10 days) has better outcomes\n• After 3-4 weeks, fibrosis makes decortication more difficult\n\n**Thoracotomy Risks:**\n• Mortality 2-8%\n• Prolonged air leak (10-20%)\n• Higher morbidity than VATS\n\n**Post-Op:**\n• Continue IV antibiotics 2-4 weeks\n• CT at 6-8 weeks to assess resolution',
    citation: [9, 14, 15],
    recommendation: 'VATS first if tube/fibrinolytics fail. Thoracotomy for VATS failure, trapped lung, or fistula. Early surgery (7-10d) preferred.',
    confidence: 'definitive',
    summary: 'VATS: failed tube, loculated, organizing; Thoracotomy: VATS failure, trapped lung, fistula. Early surgery (7-10d) better.',
  },

  {
    id: 'pna-empyema',
    type: 'question',
    module: 6,
    title: 'Empyema (Stage 4) — Frank Pus',
    body: '[RAPID Score](#/info/pna-rapid) | [Antibiotic Dosing Reference](#/info/pna-abx-dosing)\n\n**Definition:** Frank pus in the pleural space\n\n**IMMEDIATE DRAINAGE REQUIRED**\n\n**Antibiotics (anaerobic coverage critical):**\n• Ampicillin-sulbactam 3g IV Q6h, OR\n• Piperacillin-tazobactam 4.5g IV Q6h, OR\n• Ceftriaxone 2g IV + metronidazole 500mg IV Q8h\n\n**If MRSA risk:** Add vancomycin or linezolid\n\n**Duration:** 2-4 weeks total (IV → PO)\n\n**Common Organisms:**\n• Streptococcus (especially S. milleri group)\n• Staphylococcus aureus (including MRSA)\n• Anaerobes (esp. with aspiration history)\n• Gram-negatives (Klebsiella, E. coli)\n\n**Assess effusion characteristics for drainage method:**',
    citation: [8, 9],
    options: [
      {
        label: 'Free-Flowing Pus — Chest Tube',
        next: 'pna-drainage-tube',
      },
      {
        label: 'Loculated Pus — tPA/DNase',
        next: 'pna-drainage-fibrinolytics',
      },
      {
        label: 'Organizing/Trapped — Early VATS',
        next: 'pna-surgery-indications',
      },
    ],
    summary: 'Frank pus = immediate drainage; choose method by loculation status; antibiotics 2-4 weeks with anaerobic coverage',
  },

  {
    id: 'pna-abscess',
    type: 'result',
    module: 6,
    title: 'Lung Abscess Management',
    body: '[Antibiotic Dosing Reference](#/info/pna-abx-dosing)\n\n**First-Line Treatment (antibiotics alone):**\n• Success rate 63-95%\n\n**Preferred Regimen (anaerobic coverage):**\n• Ampicillin-sulbactam 3g IV Q6h, OR\n• Amoxicillin-clavulanate 875/125mg PO TID\n\n**Alternative:**\n• Ceftriaxone 1-2g IV daily + clindamycin 600mg IV Q6h, OR\n• Ceftriaxone + metronidazole 500mg IV Q8h\n\n**Duration:** 3-4 weeks total (minimum)\n• IV until clinical improvement (7-14 days)\n• PO to complete course\n• Treat until cavity resolved or stable on imaging\n\n**When to Drain:**\n• Abscess >6 cm (less likely to respond to antibiotics)\n• No improvement after 7-14 days antibiotics\n• Immunocompromised host\n• MRSA, Pseudomonas, or Klebsiella (higher failure rate)\n\n**Drainage Options:** Percutaneous CT-guided (84% success) or endoscopic\n\n**Surgery:** Reserved for failed medical/drainage, hemoptysis, suspected malignancy',
    citation: [8, 10],
    recommendation: 'Antibiotics first (amp-sulb) × 3-4 weeks. Drain if >6cm, refractory, or resistant organisms.',
    confidence: 'recommended',
    summary: 'Lung abscess: antibiotics first (amp-sulb) × 3-4 weeks; drain if >6cm, refractory, or resistant organisms',
  },

  // =====================================================================
  // MODULE 7: SPECIAL POPULATIONS
  // =====================================================================

  {
    id: 'pna-aspiration',
    type: 'result',
    module: 7,
    title: 'Aspiration Pneumonia',
    body: '**Modern Approach: DO NOT routinely cover anaerobes**\n\n**Standard treatment = Standard CAP regimen:**\n• Beta-lactam + macrolide OR respiratory fluoroquinolone\n• Anaerobic coverage NOT needed for simple aspiration PNA\n\n**ADD Anaerobic Coverage ONLY IF:**\n• Evidence of empyema\n• Necrotizing pneumonia\n• Lung abscess (diagnosed on CT)\n• Severe periodontal disease + putrid sputum\n\n**When Anaerobic Coverage Needed:**\n• Piperacillin-tazobactam 4.5g IV Q6h (monotherapy), OR\n• Ampicillin-sulbactam 3g IV Q6h, OR\n• Standard CAP regimen + metronidazole 500mg IV Q8h\n\n**Duration:** 5-7 days (longer if abscess/empyema)\n\n**Note:** Aspiration pneumonitis (chemical inflammation) does NOT need antibiotics unless bacterial superinfection develops.',
    citation: [1, 11],
    recommendation: 'Treat as standard CAP. Add anaerobic coverage ONLY if empyema, abscess, or necrotizing. 5-7 days.',
    confidence: 'recommended',
    summary: 'Aspiration PNA: treat as standard CAP; add anaerobic coverage ONLY if empyema, abscess, or necrotizing',
  },

  {
    id: 'pna-influenza',
    type: 'result',
    module: 7,
    title: 'Influenza Pneumonia',
    body: '**Antiviral Therapy (start within 48h, but benefit even if later):**\n• Oseltamivir 75mg PO BID × 5 days, OR\n• Peramivir 600mg IV × 1 (if unable to take PO)\n\n**Bacterial Superinfection Risk:** 26-77% of hospitalized influenza patients\n\n**When to Add Bacterial Coverage:**\n• Severe disease at presentation (extensive infiltrates, respiratory failure, hypotension)\n• Deterioration after initial improvement\n• Persistent/recurrent fever after 3-5 days\n\n**Bacterial Coverage (if needed):**\n• Standard CAP regimen (CTX + azithro or FQ)\n• MRSA coverage NOT routine — only if specific risk factors\n• Most common: S. pneumoniae, S. aureus\n\n**De-escalation:** Can stop bacterial antibiotics at 48-72h if:\n• Clinically stable\n• Cultures negative\n• Low suspicion for bacterial pneumonia\n\n**Duration:** Antiviral × 5 days; antibiotics × 5 days if started',
    citation: [1, 12],
    recommendation: 'Oseltamivir 75mg BID × 5d. Add CAP abx if severe or deteriorating. MRSA coverage not routine.',
    confidence: 'recommended',
    summary: 'Influenza PNA: oseltamivir 75mg BID × 5d; add CAP abx if severe or deteriorating; MRSA coverage not routine',
  },

  // =====================================================================
  // MODULE 8: DISPOSITION & MONITORING
  // =====================================================================

  {
    id: 'pna-disposition',
    type: 'question',
    module: 8,
    title: 'Disposition Decision',
    body: '**Criteria for Discharge (all must be met):**\n• Temperature <37.8°C for ≥24h\n• Heart rate <100 bpm\n• Respiratory rate <24\n• Systolic BP ≥90 mmHg\n• O2 sat ≥90% on room air (or baseline)\n• Tolerating oral intake\n• Normal mentation (or baseline)\n• Able to take oral antibiotics\n\n**Red flags requiring extended observation:**\n• Persistent hypoxia\n• Hemodynamic instability\n• Altered mentation\n• Inability to tolerate PO\n• Unreliable follow-up\n• Complicated pneumonia (effusion, abscess)',
    citation: [1],
    options: [
      {
        label: 'Meets Discharge Criteria',
        next: 'pna-discharge',
      },
      {
        label: 'Does Not Meet Criteria → Continue Inpatient',
        next: 'pna-inpatient-monitoring',
      },
    ],
    summary: 'Discharge if: afebrile 24h, HR <100, RR <24, SBP ≥90, O2 sat ≥90%, tolerating PO, normal mentation',
  },

  {
    id: 'pna-discharge',
    type: 'result',
    module: 8,
    title: 'Discharge Instructions',
    body: '**Oral Antibiotic Transition:**\n• Complete total 5-day course (IV + PO)\n• Respiratory fluoroquinolone if monotherapy appropriate\n• Amoxicillin-clavulanate + azithromycin if combination needed\n\n**Follow-up:**\n• PCP follow-up within 1 week\n• Repeat chest X-ray at 6-8 weeks (especially if smoker, age >50, or persistent symptoms)\n• Pneumococcal and influenza vaccination if not up to date\n\n**Return Precautions:**\n• Worsening shortness of breath\n• Persistent fever >48h\n• New chest pain\n• Hemoptysis\n• Confusion or lethargy\n\n**Smoking Cessation:** Counsel all smokers; offer NRT or prescription therapy',
    citation: [1],
    recommendation: 'Complete 5-day abx course PO. PCP follow-up 1 week. Repeat CXR 6-8 weeks if smoker or >50yo.',
    confidence: 'recommended',
    summary: 'Discharge: complete 5-day abx course PO; PCP follow-up 1 week; repeat CXR 6-8 weeks if smoker or >50yo',
  },

  {
    id: 'pna-inpatient-monitoring',
    type: 'info',
    module: 8,
    title: 'Inpatient Monitoring',
    body: '**Reassess at 48-72h:**\n\n**Signs of Clinical Response:**\n• Defervescence\n• Improving oxygenation\n• Decreasing WBC\n• Declining procalcitonin\n• Hemodynamic stability\n\n**If NOT Improving:**\n• Re-culture (blood, sputum, consider BAL)\n• CT chest to evaluate for complications (abscess, empyema)\n• Broaden antibiotic coverage\n• Consider resistant organisms or alternate diagnosis\n\n**Alternate Diagnoses to Consider:**\n• PE with infarct\n• Malignancy\n• Organizing pneumonia\n• Drug-induced pneumonitis\n• Heart failure with infiltrates\n\n**De-escalation:**\n• Narrow antibiotics based on culture results\n• Stop MRSA/Pseudomonas coverage if cultures negative\n• Use procalcitonin to guide stopping antibiotics',
    citation: [1, 2],
    next: 'pna-disposition',
    summary: 'Reassess 48-72h; if not improving: re-culture, CT chest, broaden coverage; consider PE, malignancy, CHF',
  },

];

// =====================================================================
// CITATIONS
// =====================================================================

export const PNEUMONIA_CITATIONS: Citation[] = [
  { num: 1, text: 'Metlay JP, et al. Diagnosis and Treatment of Adults with Community-Acquired Pneumonia: IDSA/ATS Clinical Practice Guideline. Am J Respir Crit Care Med. 2019;200(7):e45-e67.' },
  { num: 2, text: 'Kalil AC, et al. Management of Adults with Hospital-Acquired and Ventilator-Associated Pneumonia: IDSA/ATS Clinical Practice Guidelines. Clin Infect Dis. 2016;63(5):e61-e111.' },
  { num: 3, text: 'Fine MJ, et al. A prediction rule to identify low-risk patients with community-acquired pneumonia. N Engl J Med. 1997;336(4):243-250.' },
  { num: 4, text: 'Charles PG, et al. SMART-COP: a tool for predicting the need for intensive respiratory or vasopressor support in community-acquired pneumonia. Clin Infect Dis. 2008;47(3):375-384.' },
  { num: 5, text: 'Mandell LA, Wunderink RG. Pneumonia. In: Jameson JL, et al., eds. Harrison\'s Principles of Internal Medicine. 21st ed. McGraw-Hill; 2022.' },
  { num: 6, text: 'Farkas J. Severe Community-Acquired Pneumonia. EMCrit IBCC. https://emcrit.org/ibcc/pneumonia/ Accessed 2026.' },
  { num: 7, text: 'Torres A, et al. Effect of corticosteroids on treatment failure among hospitalized patients with severe community-acquired pneumonia and high inflammatory response. JAMA. 2015;313(7):677-686.' },
  { num: 8, text: 'Rahman NM, et al. Intrapleural use of tissue plasminogen activator and DNase in pleural infection. N Engl J Med. 2011;365(6):518-526.' },
  { num: 9, text: 'Corcoran JP, et al. Pleural infection: past, present, and future directions. Lancet Respir Med. 2015;3(7):563-577.' },
  { num: 10, text: 'Kuhajda I, et al. Lung abscess-etiology, diagnostic and treatment options. Ann Transl Med. 2015;3(13):183.' },
  { num: 11, text: 'Mandell LA, Niederman MS. Aspiration Pneumonia. N Engl J Med. 2019;380(7):651-663.' },
  { num: 12, text: 'Uyeki TM, et al. Clinical Practice Guidelines by IDSA: 2018 Update on Diagnosis, Treatment, Chemoprophylaxis, and Institutional Outbreak Management of Seasonal Influenza. Clin Infect Dis. 2019;68(6):e1-e47.' },
  { num: 13, text: 'Colice GL, et al. Medical and Surgical Treatment of Parapneumonic Effusions: An Evidence-Based Guideline. ACCP. Chest. 2000;118(4):1158-1171.' },
  { num: 14, text: 'Piccolo F, et al. Management of the Infected Pleural Space. Semin Respir Crit Care Med. 2019;40(3):370-382.' },
  { num: 15, text: 'Reichert M, et al. Surgical treatment of pleural empyema: comparison of VATS decortication versus open thoracotomy. J Thorac Dis. 2021;13(7):4398-4406.' },
];
