// MedKitt — Deep Vein Thrombosis (DVT)
// Comprehensive DVT consult: diagnosis, treatment selection, special populations, disposition.
// Based on ACCP Guidelines, UpToDate, EB Medicine, CHEST 2021.
// 7 modules: Risk Stratification → D-dimer/Imaging → Ultrasound → Treatment Selection → Special Populations → Duration → Disposition.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';

export interface Citation {
  num: number;
  text: string;
}

export const DVT_CITATIONS: Citation[] = [
  { num: 1, text: 'Kearon C, et al. Antithrombotic Therapy for VTE Disease: CHEST Guideline and Expert Panel Report. Chest. 2016;149(2):315-352.' },
  { num: 2, text: 'Stevens SM, et al. Antithrombotic Therapy for VTE Disease: Second Update of the CHEST Guideline. Chest. 2021;160(6):e545-e608.' },
  { num: 3, text: 'Wells PS, et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. N Engl J Med. 2003;349(13):1227-1235.' },
  { num: 4, text: 'Righini M, et al. Age-adjusted D-dimer cutoff levels to rule out pulmonary embolism: the ADJUST-PE study. JAMA. 2014;311(11):1117-1124.' },
  { num: 5, text: 'EINSTEIN Investigators. Oral rivaroxaban for symptomatic venous thromboembolism. N Engl J Med. 2010;363(26):2499-2510.' },
  { num: 6, text: 'Agnelli G, et al. Apixaban for extended treatment of venous thromboembolism. N Engl J Med. 2013;368(8):699-708.' },
  { num: 7, text: 'Carrier M, et al. Subsegmental pulmonary embolism diagnosed by computed tomography: incidence and clinical implications. A systematic review and meta-analysis. J Thromb Haemost. 2010;8(8):1716-1722.' },
  { num: 8, text: 'Bates SM, et al. VTE, thrombophilia, antithrombotic therapy, and pregnancy. Chest. 2012;141(2 Suppl):e691S-e736S.' },
  { num: 9, text: 'Raskob GE, et al. Edoxaban for the treatment of cancer-associated venous thromboembolism. N Engl J Med. 2018;378(7):615-624.' },
  { num: 10, text: 'Decousus H, et al. Factors at admission associated with bleeding risk in medical patients: findings from the IMPROVE investigators. Chest. 2011;139(1):69-79.' },
  { num: 11, text: 'Jaff MR, et al. Management of massive and submassive pulmonary embolism: PERT scientific statement. Circulation. 2011;123(16):1788-1830.' },
  { num: 12, text: 'UpToDate. Overview of the treatment of lower extremity deep vein thrombosis. 2024.' },
  { num: 13, text: 'EB Medicine. Evidence-Based Management of Deep Vein Thrombosis. 2023.' },
];

export const DVT_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Use Wells score + D-dimer to guide imaging - DO NOT image everyone', nodeId: 'dvt-wells' },
  { text: 'Age-adjusted D-dimer: cutoff = age × 10 µg/L for patients >50 years', nodeId: 'dvt-ddimer' },
  { text: 'Repeat ultrasound in 5-7 days if initially negative with high clinical probability', nodeId: 'dvt-negative-us' },
  { text: 'LMWH is first-line for pregnancy - DOACs are CONTRAINDICATED', nodeId: 'dvt-pregnancy' },
  { text: 'Apixaban or LMWH preferred in active cancer - avoid warfarin', nodeId: 'dvt-cancer' },
  { text: 'Consider IVC filter ONLY if true anticoagulation contraindication - not for "high bleeding risk"', nodeId: 'dvt-ivc' },
];

export const DVT_MODULE_LABELS = [
  'Risk Stratification',
  'D-dimer & Imaging',
  'Ultrasound Findings',
  'Treatment Selection',
  'Special Populations',
  'Duration & Disposition',
];

export const DVT_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RISK STRATIFICATION
  // =====================================================================

  {
    id: 'dvt-start',
    type: 'info',
    module: 1,
    title: 'Deep Vein Thrombosis (DVT)',
    body: '**Clinical Overview:**\n\nDVT affects ~1-2 per 1,000 adults annually. Up to 50% of untreated proximal DVT progresses to PE.\n\n**Key Principles:**\n• Clinical diagnosis alone is unreliable (50% of suspected DVT is ruled out)\n• Use validated clinical probability scores to guide testing\n• D-dimer is highly sensitive but nonspecific\n• Compression ultrasound is the diagnostic gold standard\n• Treatment should be risk-stratified by patient factors\n\n**This consult guides:**\n• Risk stratification with Wells score\n• D-dimer interpretation and imaging protocols\n• Treatment selection by patient profile\n• Special populations (pregnancy, cancer, renal failure)\n• IVC filter indications\n• Duration of therapy and safe disposition',
    citation: [1, 2, 12],
    next: 'dvt-wells',
    summary: 'DVT workup requires structured approach - Wells score guides need for D-dimer vs direct imaging',
  },

  {
    id: 'dvt-wells',
    type: 'info',
    module: 1,
    title: 'Wells Score for DVT',
    body: '[Wells DVT Calculator](#/calculator/wells-dvt)\n\n**Wells Criteria (modified):**\n\n| Criterion | Points |\n|-----------|--------|\n| Active cancer (treatment within 6 months or palliative) | +1 |\n| Paralysis, paresis, or recent cast of lower extremity | +1 |\n| Bedridden >3 days or major surgery within 12 weeks | +1 |\n| Localized tenderness along deep venous system | +1 |\n| Entire leg swollen | +1 |\n| Calf swelling >3 cm compared to asymptomatic leg | +1 |\n| Pitting edema (greater in symptomatic leg) | +1 |\n| Collateral superficial veins (non-varicose) | +1 |\n| Previously documented DVT | +1 |\n| Alternative diagnosis as likely or more likely | −2 |\n\n**Interpretation:**\n• **DVT Unlikely (score ≤1):** Check D-dimer → if negative, DVT excluded\n• **DVT Likely (score ≥2):** Proceed directly to compression ultrasound',
    citation: [3],
    calculatorLinks: [{ id: 'wells-dvt', label: 'Wells DVT Score' }],
    next: 'dvt-probability',
    summary: 'Wells score ≤1 is "unlikely" (use D-dimer), ≥2 is "likely" (go to ultrasound)',
  },

  {
    id: 'dvt-probability',
    type: 'question',
    module: 1,
    title: 'Clinical Probability Assessment',
    body: '**Based on Wells Score, classify pretest probability:**\n\n**DVT Unlikely (Wells ≤1):**\n• Prevalence ~6%\n• Negative D-dimer safely excludes DVT\n• False negative rate <1% if D-dimer negative\n\n**DVT Likely (Wells ≥2):**\n• Prevalence ~28%\n• D-dimer NOT sufficient to exclude\n• Proceed directly to imaging\n• If imaging negative with high suspicion, repeat in 5-7 days\n\n**Alternative scoring (three-tier):**\n• Low (0): 5% prevalence\n• Moderate (1-2): 17% prevalence\n• High (≥3): 53% prevalence',
    citation: [3, 13],
    options: [
      {
        label: 'DVT Unlikely (Wells ≤1)',
        description: 'Check D-dimer first',
        next: 'dvt-ddimer',
      },
      {
        label: 'DVT Likely (Wells ≥2)',
        description: 'Proceed directly to ultrasound',
        next: 'dvt-imaging',
      },
      {
        label: 'High-risk features present',
        description: 'Phlegmasia, unstable, massive swelling',
        next: 'dvt-high-risk',
        urgency: 'urgent',
      },
    ],
    summary: 'DVT unlikely → D-dimer first; DVT likely → go directly to ultrasound',
  },

  {
    id: 'dvt-high-risk',
    type: 'info',
    module: 1,
    title: 'High-Risk DVT Features',
    body: '**Phlegmasia Cerulea Dolens (PCD):**\n• Massive iliofemoral DVT with near-total venous obstruction\n• Triad: severe pain, cyanosis, massive edema\n• Risk of venous gangrene and limb loss\n• May progress to shock and death\n\n**Phlegmasia Alba Dolens:**\n• Less severe, "milk leg" (pale, swollen)\n• Can progress to PCD\n\n**Management:**\n• Immediate anticoagulation\n• Consider catheter-directed thrombolysis (CDT)\n• Urgent vascular surgery/IR consultation\n• Limb elevation\n• May need fasciotomy if compartment syndrome\n\n**Contraindications to CDT:**\n• Active bleeding\n• Recent stroke (<3 months)\n• High bleeding risk\n• Life expectancy <1 year',
    citation: [11, 12],
    next: 'dvt-imaging',
    summary: 'Phlegmasia = limb-threatening DVT - needs immediate anticoagulation and consider CDT',
  },

  // =====================================================================
  // MODULE 2: D-DIMER & IMAGING
  // =====================================================================

  {
    id: 'dvt-ddimer',
    type: 'question',
    module: 2,
    title: 'D-dimer Interpretation',
    body: '**Standard D-dimer Cutoff:** 500 µg/L (or 0.5 µg/mL FEU)\n\n**Age-Adjusted D-dimer (patients >50 years):**\nCutoff = Age × 10 µg/L\n• Example: 75-year-old → cutoff 750 µg/L\n• Increases specificity without losing sensitivity\n• Reduces unnecessary imaging by 5-8%\n\n**D-dimer Sensitivity:** ~95-97%\n**D-dimer Specificity:** ~40-50%\n\n**False Positives:**\n• Pregnancy, postpartum\n• Active cancer\n• Recent surgery/trauma\n• Infection, sepsis\n• Advanced age\n• Liver disease\n• Hospitalization\n\n**Key Point:** D-dimer is used to RULE OUT, not rule in. A positive D-dimer requires imaging.',
    citation: [3, 4],
    options: [
      {
        label: 'D-dimer NEGATIVE',
        description: 'Below age-adjusted cutoff',
        next: 'dvt-ddimer-negative',
      },
      {
        label: 'D-dimer POSITIVE',
        description: 'Above cutoff - proceed to imaging',
        next: 'dvt-imaging',
      },
      {
        label: 'Patient >50 years',
        description: 'Use age-adjusted cutoff',
        next: 'dvt-age-adjusted',
      },
    ],
    summary: 'Age-adjusted D-dimer = age × 10 µg/L for patients >50 - increases specificity',
  },

  {
    id: 'dvt-age-adjusted',
    type: 'info',
    module: 2,
    title: 'Age-Adjusted D-dimer',
    body: '**ADJUST-VTE Study (2014):**\n\nAge-adjusted cutoff safely excludes VTE in older patients:\n\n| Age | Standard Cutoff | Age-Adjusted Cutoff |\n|-----|-----------------|---------------------|\n| 50 | 500 µg/L | 500 µg/L |\n| 60 | 500 µg/L | 600 µg/L |\n| 70 | 500 µg/L | 700 µg/L |\n| 80 | 500 µg/L | 800 µg/L |\n| 90 | 500 µg/L | 900 µg/L |\n\n**Formula:** Cutoff = Age × 10 µg/L (for age >50)\n\n**Impact:**\n• Increases proportion of patients in whom DVT excluded from 6.4% to 11.6%\n• 3-month VTE rate in excluded patients: 0.3% (acceptably low)\n• Reduces unnecessary imaging by ~30% in elderly\n\n**Apply ONLY when Wells score indicates DVT Unlikely.**',
    citation: [4],
    next: 'dvt-ddimer',
    summary: 'Age-adjusted D-dimer reduces imaging by 30% in elderly with no increase in missed DVT',
  },

  {
    id: 'dvt-ddimer-negative',
    type: 'result',
    module: 2,
    title: 'Negative D-dimer: DVT Excluded',
    body: '**DVT Safely Excluded:**\n\nWith DVT Unlikely (Wells ≤1) + Negative D-dimer:\n• 3-month VTE rate: <0.5%\n• No imaging required\n• No anticoagulation\n\n**When to reconsider:**\n• Symptoms persist >7 days\n• New or worsening symptoms\n• High clinical suspicion despite negative D-dimer\n\n**Discharge instructions:**\n• Return if leg swelling worsens\n• Return if shortness of breath develops\n• Return if chest pain occurs\n• Follow up with PCP in 1-2 weeks\n\n**Alternative diagnoses to consider:**\n• Cellulitis\n• Baker\'s cyst rupture\n• Muscle strain/hematoma\n• Chronic venous insufficiency\n• Lymphedema',
    citation: [3],
    recommendation: 'DVT excluded with Wells ≤1 + negative D-dimer. No imaging or treatment needed. Discharge with return precautions.',
    confidence: 'recommended',
    summary: 'Wells unlikely + negative D-dimer = <0.5% 3-month VTE risk - safe to discharge',
  },

  {
    id: 'dvt-imaging',
    type: 'info',
    module: 2,
    title: 'Compression Ultrasound',
    body: '**Gold Standard: Compression Ultrasonography (CUS)**\n\n**Technique:**\n• Compress vein with transducer\n• Normal: vein completely compresses\n• DVT: vein does not compress (thrombus visible)\n\n**Types:**\n• **Proximal CUS:** Popliteal fossa to common femoral\n  - Sensitivity ~94%, Specificity ~94%\n• **Whole-leg CUS:** Includes calf veins\n  - Higher sensitivity for isolated calf DVT\n  - More false positives\n\n**Interpretation:**\n• **Positive:** Non-compressible vein = DVT\n• **Negative:** Consider repeat in 5-7 days if high suspicion\n• **Indeterminate:** Repeat or alternative imaging\n\n**Alternative Imaging:**\n• CT venography (if PE workup concurrent)\n• MR venography (pelvic/iliac veins)\n• Venography (rarely needed now)',
    citation: [12, 13],
    next: 'dvt-us-result',
    summary: 'Compression ultrasound is gold standard - non-compressible vein = DVT',
  },

  {
    id: 'dvt-us-result',
    type: 'question',
    module: 2,
    title: 'Ultrasound Results',
    body: '**Based on compression ultrasound findings:**\n\n**Positive for DVT:**\n• Proceed to treatment selection\n• Determine proximal vs distal location\n• Assess for iliofemoral involvement\n\n**Negative:**\n• If low/moderate probability: DVT excluded\n• If high probability: consider repeat US in 5-7 days\n\n**Note on Calf DVT (isolated distal):**\n• 15-25% propagate to proximal veins\n• Treatment controversial\n• Options: anticoagulation vs serial imaging',
    citation: [12],
    options: [
      {
        label: 'Positive: Proximal DVT',
        description: 'Popliteal or above - requires treatment',
        next: 'dvt-proximal',
        urgency: 'urgent',
      },
      {
        label: 'Positive: Isolated Calf DVT',
        description: 'Below popliteal only',
        next: 'dvt-calf',
      },
      {
        label: 'Negative Ultrasound',
        description: 'No DVT identified',
        next: 'dvt-negative-us',
      },
    ],
    summary: 'Proximal DVT requires treatment; isolated calf DVT can consider serial imaging',
  },

  // =====================================================================
  // MODULE 3: ULTRASOUND FINDINGS
  // =====================================================================

  {
    id: 'dvt-proximal',
    type: 'info',
    module: 3,
    title: 'Proximal DVT Confirmed',
    body: '**Definition:** DVT involving popliteal vein or above (femoral, iliac)\n\n**Risk of PE:** 40-50% have subclinical PE on imaging\n\n**Treatment Required:**\n• All proximal DVTs require anticoagulation\n• Duration minimum 3 months\n• Assess for provoked vs unprovoked\n\n**Iliofemoral DVT:**\n• Involves iliac and/or common femoral vein\n• Higher risk of post-thrombotic syndrome (PTS)\n• Consider catheter-directed thrombolysis if:\n  - Symptom onset <14 days\n  - Good functional status\n  - Low bleeding risk\n  - Life expectancy >1 year\n\n**Before starting treatment, assess:**\n• Bleeding risk\n• Renal function\n• Active cancer?\n• Pregnancy?\n• Drug interactions',
    citation: [1, 2, 11],
    next: 'dvt-treatment-selection',
    summary: 'All proximal DVT requires anticoagulation ≥3 months - assess for CDT in iliofemoral DVT',
  },

  {
    id: 'dvt-calf',
    type: 'question',
    module: 3,
    title: 'Isolated Calf DVT',
    body: '**Definition:** DVT limited to calf veins (tibial, peroneal, muscular)\n\n**Prevalence:** ~50% of all symptomatic DVTs\n\n**Natural history:**\n• 15-25% propagate to proximal veins (usually within 2 weeks)\n• Low risk of PE if remains isolated\n\n**Management Options:**\n\n**1. Anticoagulation (CHEST preferred):**\n• Severe symptoms\n• High risk of extension (cancer, prior VTE, immobility)\n• D-dimer markedly elevated\n• Extensive calf involvement\n• Inpatient/immobilized\n\n**2. Serial Imaging (reasonable alternative):**\n• Mild symptoms\n• Low risk of extension\n• High bleeding risk\n• Repeat US in 1 week, then 2 weeks if negative\n• If propagates to proximal: anticoagulate',
    citation: [2, 12],
    options: [
      {
        label: 'Anticoagulate',
        description: 'Severe symptoms, high extension risk, or patient preference',
        next: 'dvt-treatment-selection',
      },
      {
        label: 'Serial imaging',
        description: 'Mild symptoms, low extension risk, high bleeding risk',
        next: 'dvt-calf-surveillance',
      },
    ],
    summary: 'Isolated calf DVT: anticoagulation preferred but serial imaging acceptable if low risk',
  },

  {
    id: 'dvt-calf-surveillance',
    type: 'result',
    module: 3,
    title: 'Calf DVT: Serial Imaging Protocol',
    body: '**Serial Ultrasound Surveillance:**\n\n• Repeat US at 1 week\n• If negative: repeat at 2 weeks\n• If propagation to proximal veins: anticoagulate\n\n**Patient Instructions:**\n• Avoid prolonged immobility\n• Stay hydrated\n• Leg elevation when resting\n• Return immediately if:\n  - Increased swelling or pain\n  - Shortness of breath\n  - Chest pain\n\n**Indications to switch to anticoagulation:**\n• Extension to proximal veins\n• Worsening symptoms despite surveillance\n• Patient preference\n• Difficulty ensuring follow-up\n\n**Follow-up:** Ensure scheduled US appointments before discharge.',
    citation: [2, 12],
    recommendation: 'Serial US at 1 week, then 2 weeks. Anticoagulate if proximal propagation. Return precautions for PE symptoms.',
    confidence: 'recommended',
    summary: 'Repeat US at 1 and 2 weeks - anticoagulate if propagates to proximal veins',
  },

  {
    id: 'dvt-negative-us',
    type: 'question',
    module: 3,
    title: 'Negative Ultrasound',
    body: '**When to consider DVT still possible after negative US:**\n\n**High clinical probability (Wells ≥2) + negative US:**\n• 5-7% still have DVT on repeat imaging\n• Recommend repeat US in 5-7 days\n• Consider D-dimer if not done\n• Alternative: whole-leg US or CT/MR venography\n\n**Low/moderate probability + negative US:**\n• DVT safely excluded\n• No repeat imaging needed\n• 3-month VTE rate <1%\n\n**Iliac vein DVT:**\n• May be missed on standard CUS\n• Consider CT or MR venography if:\n  - Bilateral leg swelling\n  - Abdominal/back pain\n  - Pregnancy (iliac compression)\n  - Pelvic mass/malignancy',
    citation: [12, 13],
    options: [
      {
        label: 'Low/Moderate probability',
        description: 'DVT excluded - discharge',
        next: 'dvt-ddimer-negative',
      },
      {
        label: 'High probability (Wells ≥2)',
        description: 'Consider repeat US or further imaging',
        next: 'dvt-repeat-imaging',
      },
      {
        label: 'Suspect iliac vein DVT',
        description: 'Consider CT/MR venography',
        next: 'dvt-advanced-imaging',
      },
    ],
    summary: 'Negative US with high probability → repeat in 5-7 days; low probability → DVT excluded',
  },

  {
    id: 'dvt-repeat-imaging',
    type: 'result',
    module: 3,
    title: 'Repeat Ultrasound Protocol',
    body: '**High Clinical Probability + Negative Initial US:**\n\nOptions:\n1. **Repeat CUS in 5-7 days** (preferred)\n   - Detects propagating thrombus\n   - 5-7% will have positive repeat\n\n2. **Whole-leg ultrasound**\n   - Includes calf veins\n   - Single visit approach\n\n3. **D-dimer testing**\n   - If negative: lowers post-test probability\n   - If positive: supports repeat imaging\n\n**Before discharge:**\n• Schedule repeat US appointment\n• Provide return precautions\n• Consider interim prophylactic anticoagulation if:\n  - Very high suspicion\n  - Difficulty with follow-up\n  - Severe symptoms',
    citation: [12],
    recommendation: 'Schedule repeat US in 5-7 days. Provide PE return precautions. Consider interim anticoagulation if very high suspicion.',
    confidence: 'recommended',
    summary: 'Repeat US in 5-7 days - consider interim anticoag if very high suspicion',
  },

  {
    id: 'dvt-advanced-imaging',
    type: 'info',
    module: 3,
    title: 'Advanced Imaging',
    body: '**When to consider CT or MR venography:**\n\n**CT Venography:**\n• Can be added to CTPA (PE workup)\n• Good for iliac veins\n• Radiation exposure\n• Contrast required\n\n**MR Venography:**\n• Best for pelvic/iliac veins\n• No radiation (safe in pregnancy)\n• Limited availability\n• May-Thurner syndrome evaluation\n\n**Indications:**\n• Suspected iliac vein DVT\n• Pregnancy with high suspicion\n• Bilateral symptoms suggesting IVC involvement\n• Malignancy with pelvic mass\n• Prior pelvic surgery/radiation\n\n**May-Thurner Syndrome:**\n• Left iliac vein compression by right iliac artery\n• Left leg DVT, especially in young women\n• Consider MRV or IVUS',
    citation: [12],
    next: 'dvt-treatment-selection',
    summary: 'CT/MR venography for suspected iliac DVT, May-Thurner, or pregnancy with high suspicion',
  },

  // =====================================================================
  // MODULE 4: TREATMENT SELECTION
  // =====================================================================

  {
    id: 'dvt-treatment-selection',
    type: 'question',
    module: 4,
    title: 'Anticoagulant Selection',
    body: '[Anticoagulant Selection Tool](#/info/dvt-anticoag-tool)\n\n**First-Line: DOACs (Direct Oral Anticoagulants)**\n• Rivaroxaban, apixaban, edoxaban, dabigatran\n• CHEST 2021: DOACs preferred over warfarin for most patients\n• No bridging required (except edoxaban/dabigatran)\n\n**Consider patient factors:**\n• Renal function (CrCl)\n• Active cancer\n• Pregnancy/breastfeeding\n• Drug interactions\n• GI bleeding history\n• Antiphospholipid syndrome\n• Extreme body weight\n• Cost/insurance\n\n**Proceed to patient-specific pathway:**',
    citation: [2, 5, 6],
    options: [
      {
        label: 'Standard patient',
        description: 'No major complicating factors',
        next: 'dvt-standard-doac',
      },
      {
        label: 'Active cancer',
        description: 'Receiving cancer treatment or palliative',
        next: 'dvt-cancer',
      },
      {
        label: 'Pregnancy or breastfeeding',
        description: 'DOACs contraindicated',
        next: 'dvt-pregnancy',
      },
      {
        label: 'Renal impairment',
        description: 'CrCl <30 mL/min or on dialysis',
        next: 'dvt-renal',
      },
      {
        label: 'Special populations',
        description: 'APS, extremes of weight, bleeding risk',
        next: 'dvt-special-treatment',
      },
    ],
    summary: 'DOACs are first-line for most patients - select based on patient-specific factors',
  },

  {
    id: 'dvt-standard-doac',
    type: 'info',
    module: 4,
    title: 'DOAC Options for DVT',
    body: '**Preferred DOACs for DVT:**\n\n**Rivaroxaban (Xarelto):**\n• 15 mg BID × 21 days, then 20 mg daily\n• Take with food\n• No bridging needed\n• Single-drug approach\n\n**Apixaban (Eliquis):**\n• 10 mg BID × 7 days, then 5 mg BID\n• With or without food\n• No bridging needed\n• Lowest GI bleeding risk\n• Preferred if GI bleed history\n\n**Edoxaban (Savaysa):**\n• 60 mg daily (30 mg if CrCl 15-50 or ≤60 kg)\n• Requires 5-10 days of initial parenteral anticoag\n• Once-daily dosing\n\n**Dabigatran (Pradaxa):**\n• 150 mg BID\n• Requires 5-10 days of initial parenteral anticoag\n• Reversible with idarucizumab\n\n**My recommendation:** Rivaroxaban or apixaban (no bridging required)',
    citation: [2, 5, 6],
    next: 'dvt-duration',
    summary: 'Rivaroxaban or apixaban preferred - single-drug approach, no bridging required',
  },

  // =====================================================================
  // MODULE 5: SPECIAL POPULATIONS
  // =====================================================================

  {
    id: 'dvt-cancer',
    type: 'info',
    module: 5,
    title: 'Cancer-Associated DVT',
    body: '**CHEST 2021: DOACs or LMWH preferred over warfarin**\n\n**DOAC Options (preferred for most):**\n• [Apixaban](#/drug/apixaban/dvt treatment) - preferred, lowest GI bleeding\n  - 10 mg BID × 7 days → 5 mg BID\n  - Good option for GI malignancies (SELECT-D substudy)\n\n• [Edoxaban](#/drug/edoxaban/dvt treatment) - alternative\n  - Avoid in GI malignancies (higher GI bleed)\n  - 60 mg daily after 5+ days LMWH\n\n• [Rivaroxaban](#/drug/rivaroxaban/dvt treatment) - alternative\n  - Caution in GI malignancies\n\n**LMWH (if DOAC not suitable):**\n• Enoxaparin 1 mg/kg BID or 1.5 mg/kg daily\n• Dalteparin 200 U/kg daily × 30 days, then 150 U/kg daily\n• Preferred if:\n  - GI malignancy with high bleed risk\n  - Drug interactions with chemo\n  - Thrombocytopenia (hold if plt <50k)\n  - Poor oral intake\n\n**Duration:** Indefinite while cancer active, reassess periodically',
    citation: [2, 9],
    next: 'dvt-duration',
    summary: 'Cancer DVT: apixaban preferred, LMWH if GI malignancy or drug interactions. Indefinite treatment.',
  },

  {
    id: 'dvt-pregnancy',
    type: 'info',
    module: 5,
    title: 'DVT in Pregnancy',
    body: '**⚠️ DOACs and WARFARIN are CONTRAINDICATED in pregnancy**\n\n**Treatment: LMWH**\n• Enoxaparin 1 mg/kg BID (weight-based, use current weight)\n• Do NOT use once-daily dosing in pregnancy\n• Anti-Xa monitoring generally not needed (consider in extremes of weight)\n\n**Duration:**\n• Throughout pregnancy\n• Continue for at least 6 weeks postpartum\n• Minimum total duration: 3 months\n\n**Delivery Planning:**\n• Hold LMWH 24 hours before planned delivery\n• Neuraxial anesthesia: hold 24 hours (prophylactic dose: 12 hours)\n• Restart 6-12 hours after delivery (24 hours if epidural)\n\n**Postpartum:**\n• Can switch to warfarin (safe in breastfeeding)\n• DOACs: limited data in breastfeeding (generally avoided)\n\n**IVC filter:**\n• Only if true contraindication to anticoag (not for delivery)',
    citation: [8],
    next: 'dvt-duration',
    summary: 'Pregnancy DVT = LMWH BID. Continue through pregnancy + 6 weeks postpartum. No DOACs.',
  },

  {
    id: 'dvt-renal',
    type: 'info',
    module: 5,
    title: 'DVT with Renal Impairment',
    body: '**Anticoagulation in CKD:**\n\n**CrCl 30-50 mL/min:**\n• DOACs okay with dose adjustments\n• Apixaban: 5 mg BID (or 2.5 mg BID if 2 of 3: age ≥80, weight ≤60 kg, Cr ≥1.5)\n• Rivaroxaban: standard dosing okay\n• Edoxaban: 30 mg daily\n• Dabigatran: use with caution\n\n**CrCl 15-30 mL/min:**\n• **Apixaban:** 5 mg BID (preferred DOAC in severe CKD)\n• Rivaroxaban: 15 mg daily (limited data)\n• Avoid dabigatran, edoxaban not studied\n• LMWH: dose-reduce, consider anti-Xa monitoring\n• UFH: no renal adjustment needed\n\n**CrCl <15 mL/min or Dialysis:**\n• **Apixaban:** 5 mg BID (FDA approved, use with caution)\n• Or warfarin\n• Or UFH\n• Avoid LMWH (accumulates)\n\n**Note:** Dabigatran dialyzable; other DOACs are not.',
    citation: [2, 12],
    next: 'dvt-duration',
    summary: 'CrCl 15-30: apixaban preferred. CrCl <15/dialysis: apixaban, warfarin, or UFH.',
  },

  {
    id: 'dvt-special-treatment',
    type: 'info',
    module: 5,
    title: 'Other Special Populations',
    body: '**Antiphospholipid Syndrome (APS):**\n• ⚠️ DOACs are INFERIOR to warfarin\n• Use warfarin, target INR 2-3\n• Triple-positive APS: higher target (INR 3-4) may be needed\n• TRAPS trial: higher thrombosis with rivaroxaban vs warfarin\n\n**Extreme Body Weight:**\n• **>120 kg or BMI >40:**\n  - Standard DOAC dosing appears effective\n  - Consider drug-specific anti-Xa levels if concern\n  - Alternative: warfarin or LMWH with anti-Xa monitoring\n• **<50 kg:**\n  - Edoxaban: 30 mg daily\n  - Apixaban: may qualify for 2.5 mg BID dose\n  - LMWH: weight-based, usually appropriate\n\n**High Bleeding Risk:**\n• Apixaban has lowest GI bleeding\n• Consider LMWH (reversible with protamine partially)\n• Assess HAS-BLED or RIETE bleeding scores\n• May need shorter duration therapy\n\n**Drug Interactions:**\n• Strong CYP3A4 inhibitors/inducers\n• P-gp inhibitors\n• Check specific DOAC interactions',
    citation: [2, 10, 12],
    next: 'dvt-duration',
    summary: 'APS = warfarin only. Obesity: standard DOAC dosing likely okay. High bleed risk: apixaban or LMWH.',
  },

  {
    id: 'dvt-ivc',
    type: 'info',
    module: 5,
    title: 'IVC Filter Indications',
    body: '**IVC Filter: Very Limited Indications**\n\n**Absolute Indication:**\n• Acute proximal DVT/PE with **true contraindication** to anticoagulation\n  - Active major bleeding\n  - Recent major surgery with high bleeding risk\n  - Hemorrhagic stroke\n  - NOT "high bleeding risk" alone\n\n**Relative Indications (controversial):**\n• Recurrent PE despite therapeutic anticoagulation\n• Massive PE with hemodynamic instability (as bridge)\n• Poor cardiopulmonary reserve where any PE would be fatal\n\n**NOT Indications:**\n• Prophylaxis in trauma (use anticoag when safe)\n• Free-floating thrombus (anticoagulate)\n• "High bleeding risk" without active bleeding\n• Patient preference\n\n**Important:**\n• Retrievable filters preferred\n• Must attempt retrieval when anticoag becomes safe\n• Filters do NOT reduce mortality\n• Increase long-term DVT risk',
    citation: [2, 11],
    next: 'dvt-treatment-failure',
    summary: 'IVC filter ONLY for true anticoag contraindication (active bleeding) - not for "high risk"',
  },

  {
    id: 'dvt-treatment-failure',
    type: 'info',
    module: 5,
    title: 'Treatment Failure / Recurrent VTE',
    body: '**Recurrent VTE on Anticoagulation:**\n\n**First: Confirm compliance and therapeutic levels**\n• Missed doses?\n• Drug interactions?\n• Absorption issues?\n• Check anti-Xa level (for LMWH) or drug level (for DOACs)\n\n**Management Options:**\n\n**On DOAC:**\n• Switch to LMWH\n• Or increase DOAC dose (limited data)\n• Or switch to different DOAC\n\n**On LMWH:**\n• Increase dose by 25-33%\n• Check anti-Xa (target 0.6-1.0 IU/mL)\n• Consider twice-daily dosing if on once-daily\n\n**On Warfarin:**\n• Switch to LMWH or DOAC\n• If remains on warfarin: higher INR target (3-4)\n\n**Additional considerations:**\n• IVC filter if recurs despite therapeutic anticoag\n• Evaluate for occult malignancy\n• Consider thrombophilia workup (APS)',
    citation: [2, 12],
    next: 'dvt-duration',
    summary: 'Treatment failure: verify compliance → switch to LMWH or increase dose → consider IVC filter if recurs on therapeutic anticoag',
  },

  // =====================================================================
  // MODULE 6: DURATION & DISPOSITION
  // =====================================================================

  {
    id: 'dvt-duration',
    type: 'info',
    module: 6,
    title: 'Duration of Anticoagulation',
    body: '**Minimum Duration: 3 months for all DVT**\n\n**Provoked DVT (transient risk factor):**\n• Major surgery, trauma, immobilization, hospitalization\n• **Duration: 3 months**, then stop\n• Low recurrence risk (<3% per year after stopping)\n\n**Minor Transient Risk Factor:**\n• Long flight, oral contraceptives, minor surgery\n• **Duration: 3 months**, consider extended\n• Intermediate recurrence risk (5% per year)\n\n**Unprovoked DVT (no identifiable risk factor):**\n• **Duration: Extended/indefinite** (preferred)\n• Or minimum 3 months, then reassess\n• Recurrence risk: 10% year 1, 30% at 5 years\n• Males have higher recurrence than females\n\n**Recurrent Unprovoked VTE:**\n• **Indefinite anticoagulation**\n\n**Cancer-Associated:**\n• **Indefinite** while cancer active\n• Reassess if cancer in remission\n\n**After 3 months:** Reassess bleeding risk vs thrombosis risk annually.',
    citation: [1, 2],
    next: 'dvt-extended-therapy',
    summary: 'Provoked = 3 months. Unprovoked = extended/indefinite. Cancer = indefinite while active.',
  },

  {
    id: 'dvt-extended-therapy',
    type: 'info',
    module: 6,
    title: 'Extended Therapy Considerations',
    body: '**Factors Favoring Extended Therapy (>3 months):**\n• Unprovoked DVT\n• Male sex (higher recurrence)\n• Positive D-dimer 1 month after stopping\n• Residual thrombus on imaging\n• Prior VTE\n• Active cancer\n• Antiphospholipid syndrome\n• Thrombophilia (moderate-strong)\n\n**Factors Favoring Stopping at 3 Months:**\n• Provoked DVT (major transient risk factor)\n• High bleeding risk\n• Patient preference\n• Falls risk\n• Poor compliance expected\n• Limited life expectancy (<3 months)\n\n**Extended Therapy Options:**\n• Continue full-dose DOAC (standard approach)\n• Reduced-dose DOAC (after 6 months):\n  - Apixaban 2.5 mg BID\n  - Rivaroxaban 10 mg daily\n  - Similar efficacy, lower bleeding (AMPLIFY-EXT, EINSTEIN-CHOICE)\n• Aspirin: inferior to anticoag but better than nothing if anticoag stopped',
    citation: [2, 6],
    next: 'dvt-disposition',
    summary: 'Extended therapy for unprovoked DVT - can consider reduced-dose DOAC after 6 months',
  },

  {
    id: 'dvt-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition Decision',
    body: '**Most DVT patients can be treated as outpatients**\n\n**Outpatient Treatment Criteria:**\n✓ Hemodynamically stable\n✓ Low bleeding risk\n✓ No severe symptoms (phlegmasia)\n✓ No significant comorbidities requiring admission\n✓ Adequate renal function for chosen anticoag\n✓ Able to afford/obtain anticoagulation\n✓ Reliable follow-up available\n✓ Good social support\n✓ No concurrent PE requiring admission\n\n**Consider Admission If:**\n• Massive DVT (phlegmasia)\n• Concurrent high-risk PE\n• High bleeding risk requiring monitoring\n• Severe renal impairment\n• Unable to obtain anticoagulation\n• Social/compliance concerns\n• Need for parenteral anticoag bridge',
    citation: [12, 13],
    options: [
      {
        label: 'Outpatient treatment',
        description: 'Stable, low-risk, reliable follow-up',
        next: 'dvt-dispo-outpatient',
      },
      {
        label: 'Admit for treatment',
        description: 'High-risk features, social concerns, or need monitoring',
        next: 'dvt-dispo-admit',
      },
    ],
    summary: 'Most DVT patients can be treated as outpatients if stable with reliable follow-up',
  },

  {
    id: 'dvt-dispo-outpatient',
    type: 'result',
    module: 6,
    title: 'Outpatient DVT Treatment',
    body: '**Discharge Checklist:**\n\n✓ **Anticoagulation prescribed**\n  - First dose given in ED (if appropriate)\n  - Prescription sent to pharmacy\n  - Patient can afford medication\n\n✓ **Patient education provided**\n  - Medication dosing instructions\n  - Bleeding precautions\n  - Drug/food interactions\n  - Signs of PE (dyspnea, chest pain, syncope)\n\n✓ **Follow-up arranged**\n  - PCP or anticoagulation clinic in 1-2 weeks\n  - Labs if on warfarin (INR in 3-5 days)\n  - Hematology if complex\n\n✓ **Return precautions given**\n  - Shortness of breath\n  - Chest pain\n  - Syncope/presyncope\n  - Major bleeding\n  - Worsening leg swelling\n\n**Compression stockings:** Previously recommended, now optional (SOX trial showed no benefit for PTS prevention).',
    citation: [12, 13],
    recommendation: 'Discharge with DOAC (first dose in ED). Follow-up in 1-2 weeks. Return for PE symptoms, bleeding, or worsening swelling.',
    confidence: 'recommended',
    summary: 'Discharge with DOAC, first dose in ED, follow-up in 1-2 weeks, PE precautions',
  },

  {
    id: 'dvt-dispo-admit',
    type: 'result',
    module: 6,
    title: 'Inpatient DVT Treatment',
    body: '**Admission Indications:**\n• Phlegmasia (limb-threatening DVT)\n• Concurrent high-risk PE\n• High bleeding risk requiring monitoring\n• Need for parenteral anticoagulation\n• Unable to obtain oral anticoagulation\n• Severe renal impairment\n• Social/compliance concerns\n\n**Inpatient Management:**\n• Start anticoagulation immediately (no delay for imaging)\n• If parenteral needed: LMWH or UFH\n• Monitor for bleeding\n• Vascular/IR consult if phlegmasia (CDT consideration)\n• Transition to oral anticoag when appropriate\n• Discharge planning: ensure medication access, follow-up\n\n**Length of stay:**\n• Most can be discharged in 24-48 hours once:\n  - Stable on anticoagulation\n  - Symptoms improving\n  - Discharge medications available\n  - Follow-up arranged',
    citation: [12],
    recommendation: 'Admit for high-risk features. Start anticoag immediately. Plan for transition to outpatient therapy within 24-48 hours if stable.',
    confidence: 'recommended',
    summary: 'Admit for phlegmasia, high-risk PE, or social concerns. Most ready for discharge in 24-48h.',
  },

];
