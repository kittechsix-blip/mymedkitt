// MedKitt — PE in Pregnancy
// High-risk population: Anticoagulation decisions, imaging considerations, delivery planning
// 6 modules: Recognition → Risk Stratification → Diagnosis → Treatment → Thrombolysis → Disposition
// ~24 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PE_PREGNANCY_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'pep-start',
    type: 'info',
    module: 1,
    title: 'PE in Pregnancy',
    body: '**PE is a leading cause of maternal mortality** — responsible for ~10% of maternal deaths in developed countries.\n\n**Pregnancy is a hypercoagulable state:**\n• 5-10x increased VTE risk vs. non-pregnant\n• Risk persists 6 weeks postpartum\n• Highest risk in 3rd trimester and postpartum\n\n**Challenges:**\n• Symptoms overlap with normal pregnancy (dyspnea, edema, tachycardia)\n• D-dimer normally elevated in pregnancy\n• Concern about radiation exposure (often overstated)\n\n**Key Concept:** Missing PE is more dangerous than diagnostic radiation. [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'pregnancy-wells', label: 'Modified Wells Score' },
      { id: 'perc-rule', label: 'PERC Rule' },
      { id: 'years-algorithm', label: 'YEARS Algorithm' },
      { id: 'lmwh-dosing', label: 'LMWH Pregnancy Dosing' },
    ],
    next: 'pep-presentation',

    summary: 'PE causes 10% maternal deaths; 5-10x VTE risk in pregnancy; symptoms overlap normal pregnancy; missing PE worse than radiation',
    skippable: true,
  },

  {
    id: 'pep-presentation',
    type: 'info',
    module: 1,
    title: 'Clinical Presentation',
    body: '**Symptoms of PE in Pregnancy:**\n\n| Symptom | Frequency | Notes |\n|---------|-----------|-------|\n| Dyspnea | 70-80% | Common in normal pregnancy too |\n| Pleuritic chest pain | 50-70% | More specific |\n| Cough | 20-40% | |\n| Hemoptysis | 5-15% | Highly specific |\n| Syncope | 5-10% | Suggests massive PE |\n| Unilateral leg swelling | 30-50% | Suggests concurrent DVT |\n\n**Red Flags for Massive PE:**\n• Hypotension (SBP <90)\n• Syncope\n• Severe hypoxia\n• RV dysfunction on POCUS\n• Cardiac arrest [1][2][3]',
    citation: [1, 2, 3],
    next: 'pep-risk-assess',

    summary: 'Dyspnea 70-80%, pleuritic pain 50-70%; red flags: hypotension, syncope, severe hypoxia, RV dysfunction',
    skippable: true,
  },

  // =====================================================================
  // MODULE 2: RISK STRATIFICATION
  // =====================================================================

  {
    id: 'pep-risk-assess',
    type: 'question',
    module: 2,
    title: 'Initial Hemodynamic Assessment',
    body: '**First: Is the patient hemodynamically unstable?**\n\n**Unstable (Massive PE):**\n• SBP <90 mmHg or drop >40 from baseline\n• Requiring vasopressors\n• Signs of obstructive shock\n• Cardiac arrest\n\n**Submassive (Intermediate Risk):**\n• Hemodynamically stable\n• RV dysfunction on echo/CT\n• Elevated troponin or BNP\n\n**Low Risk:**\n• Stable hemodynamics\n• No RV dysfunction\n• Normal biomarkers [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Unstable — Massive PE suspected',
        next: 'pep-massive',
        urgency: 'critical',
      },
      {
        label: 'Stable — Proceed with workup',
        next: 'pep-clinical-prob',
      },
    ],

    summary: 'Classify massive (SBP <90, shock), submassive (stable + RV dysfunction), or low-risk to guide treatment',
  },

  {
    id: 'pep-massive',
    type: 'info',
    module: 2,
    title: 'Massive PE — Unstable Patient',
    body: '**Immediate Actions:**\n\n1. **Resuscitation:**\n   • IV fluids (careful — RV preload-sensitive)\n   • Vasopressors (norepinephrine preferred)\n   • High-flow oxygen\n\n2. **Bedside POCUS:**\n   • RV dilation, D-sign, McConnell\'s sign\n   • If positive → treat empirically\n\n3. **Anticoagulation:**\n   • [UFH](#/drug/heparin/pe) bolus 80 U/kg, then 18 U/kg/hr\n   • UFH preferred over LMWH in massive PE (reversible)\n\n4. **Consider thrombolysis or embolectomy**\n   → Go to thrombolysis module [1][2][4]',
    images: [{ src: 'images/pe-pregnancy/saddle-pe-ct.png', alt: 'CT pulmonary angiogram showing saddle embolus straddling the main pulmonary artery bifurcation with bilateral filling defects', caption: 'Saddle PE on CT-PA — massive embolus at pulmonary artery bifurcation. CTPA preferred over V/Q in most pregnant patients (radiation exposure lower than V/Q lung scan). (CC BY-SA 3.0, James Heilman MD)' }],
    citation: [1, 2, 4],
    next: 'pep-thrombolysis',

    summary: 'UFH bolus 80 U/kg, vasopressors, bedside POCUS for RV dilation; treat empirically if POCUS positive',
    safetyLevel: 'critical',
  },

  {
    id: 'pep-clinical-prob',
    type: 'info',
    module: 2,
    title: 'Clinical Probability Assessment',
    body: '**YEARS Algorithm (validated in pregnancy):**\n\n**YEARS Criteria:**\n1. Clinical signs of DVT\n2. Hemoptysis\n3. PE most likely diagnosis\n\n**Interpretation:**\n• 0 criteria + D-dimer <1000 → PE excluded\n• 1+ criteria + D-dimer <500 → PE excluded\n• Otherwise → Imaging required\n\n**D-dimer in Pregnancy:**\n• Normally rises throughout pregnancy\n• Trimester-adjusted cutoffs less useful\n• YEARS algorithm uses fixed thresholds\n• Consider clinical probability heavily [1][3][5]',
    citation: [1, 3, 5],
    next: 'pep-workup',

    summary: 'YEARS algorithm validated in pregnancy; 0 criteria + D-dimer <1000 excludes PE; fixed thresholds not trimester-adjusted',
  },

  // =====================================================================
  // MODULE 3: DIAGNOSIS
  // =====================================================================

  {
    id: 'pep-workup',
    type: 'question',
    module: 3,
    title: 'Diagnostic Approach',
    body: '**Which imaging study?**\n\n**CTPA (CT Pulmonary Angiography):**\n• Higher sensitivity than V/Q\n• Radiation to breast tissue (~3-10 mGy)\n• Can visualize alternative diagnoses\n• Preferred in most centers\n\n**V/Q Scan:**\n• Lower breast radiation\n• Higher fetal radiation (though still minimal)\n• More non-diagnostic results\n• Consider if high breast cancer risk\n\n**Radiation Perspective:**\n• Fetal dose from CTPA: ~0.1 mGy\n• Fetal dose from V/Q: ~0.5 mGy\n• Teratogenic threshold: 50-100 mGy\n• **Both are far below harmful threshold** [1][2][3]',
    citation: [1, 2, 3],
    options: [
      {
        label: 'CTPA — Preferred in most cases',
        next: 'pep-ctpa',
      },
      {
        label: 'V/Q Scan — Breast radiation concern',
        next: 'pep-vq',
      },
      {
        label: 'Leg ultrasound first — if DVT symptoms',
        next: 'pep-leg-us',
      },
    ],

    summary: 'CTPA vs V/Q vs leg US; both far below teratogenic threshold (50-100 mGy); CTPA preferred for sensitivity',
  },

  {
    id: 'pep-ctpa',
    type: 'question',
    module: 3,
    title: 'CTPA Result',
    body: '**CTPA Interpretation:**\n\n**Positive CTPA:**\n• Filling defect in pulmonary arteries\n• Begin treatment immediately\n\n**Negative CTPA:**\n• High NPV in pregnancy\n• If clinical suspicion remains high, consider:\n  - Repeat imaging in 24-48h\n  - Leg ultrasound for DVT\n  - Empiric anticoagulation\n\n**Suboptimal/Inconclusive:**\n• May need V/Q scan or repeat with better timing\n• Consider empiric treatment if high suspicion [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'CTPA Positive — PE confirmed',
        next: 'pep-treatment',
        urgency: 'urgent',
      },
      {
        label: 'CTPA Negative — PE excluded',
        next: 'pep-negative',
      },
      {
        label: 'CTPA Inconclusive',
        next: 'pep-inconclusive',
      },
    ],

    summary: 'Positive CTPA: treat immediately; negative: high NPV; inconclusive: consider V/Q or empiric treatment',
  },

  {
    id: 'pep-vq',
    type: 'info',
    module: 3,
    title: 'V/Q Scan',
    body: '**V/Q Scan Interpretation:**\n\n| Result | Interpretation |\n|--------|---------------|\n| Normal | PE excluded |\n| High probability | Treat as PE |\n| Non-diagnostic | Need additional testing |\n\n**Limitations:**\n• High rate of non-diagnostic scans (up to 25-50%)\n• Cannot evaluate other diagnoses\n• Ventilation phase can be omitted (perfusion-only) to reduce radiation\n\n**If non-diagnostic:** Proceed to CTPA or empiric anticoagulation based on clinical probability. [1][2]',
    citation: [1, 2],
    next: 'pep-treatment',

    summary: 'High rate of non-diagnostic V/Q scans (25-50%); if non-diagnostic proceed to CTPA or empiric anticoagulation',
    skippable: true,
  },

  {
    id: 'pep-leg-us',
    type: 'info',
    module: 3,
    title: 'Leg Ultrasound First',
    body: '**Strategy: If DVT symptoms present, start with leg US**\n\n**Rationale:**\n• If DVT found → treat as VTE (no need for chest imaging)\n• Avoids radiation entirely\n• Approximately 30-50% of PE patients have concurrent DVT\n\n**If DVT found:**\n• Begin anticoagulation\n• Treatment is same as for PE (LMWH in pregnancy)\n• May still need chest imaging if suspicious for massive PE\n\n**If DVT negative but PE still suspected:**\n• Proceed to CTPA or V/Q\n• Negative leg US does not rule out PE [1][2]',
    citation: [1, 2],
    next: 'pep-treatment',

    summary: 'DVT found avoids chest radiation; 30-50% of PE patients have concurrent DVT; negative leg US does not exclude PE',
    skippable: true,
  },

  {
    id: 'pep-negative',
    type: 'result',
    module: 3,
    title: 'PE Excluded',
    body: '**Negative CTPA with low/moderate clinical probability:**\n\nPE effectively ruled out.\n\n**Consider alternative diagnoses:**\n• Pulmonary edema\n• Pneumonia\n• Musculoskeletal pain\n• Anxiety/panic\n• Pericarditis\n• Aortic dissection\n\n**Safety-netting:**\n• Return precautions\n• Consider outpatient follow-up\n• If symptoms persist or worsen, reassess [1][2]',
    recommendation: 'PE excluded. Evaluate for alternative diagnoses. Provide return precautions.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'pep-inconclusive',
    type: 'info',
    module: 3,
    title: 'Inconclusive Imaging',
    body: '**Options for inconclusive results:**\n\n1. **Serial leg ultrasounds** (days 1, 3, 7)\n2. **Alternative imaging** (V/Q if CTPA inconclusive, vice versa)\n3. **Empiric anticoagulation** if clinical probability high\n4. **Repeat CTPA** with optimized protocol\n\n**High clinical suspicion → Treat empirically**\n\nBetter to anticoagulate a patient who may not have PE than to miss a PE in a pregnant patient. [1][2]',
    citation: [1, 2],
    next: 'pep-treatment',

    summary: 'If high clinical suspicion with inconclusive imaging, treat empirically; serial leg US or alternative imaging',
  },

  // =====================================================================
  // MODULE 4: TREATMENT
  // =====================================================================

  {
    id: 'pep-treatment',
    type: 'info',
    module: 4,
    title: 'Anticoagulation in Pregnancy',
    body: '**LMWH is the treatment of choice in pregnancy**\n\n**Why LMWH over other options:**\n• Does not cross placenta\n• No fetal teratogenicity\n• Predictable dosing\n• Can be self-administered at home\n\n**DOACs are CONTRAINDICATED** — cross placenta, teratogenic\n\n**Warfarin CONTRAINDICATED** in 1st trimester — teratogenic (warfarin embryopathy)\n\n**UFH** — reserved for massive PE or peripartum period [1][2][6]',
    citation: [1, 2, 6],
    next: 'pep-lmwh-dosing',

    summary: 'LMWH is treatment of choice; DOACs and warfarin contraindicated in pregnancy; UFH reserved for massive PE',
    safetyLevel: 'critical',
  },

  {
    id: 'pep-lmwh-dosing',
    type: 'info',
    module: 4,
    title: 'LMWH Dosing',
    body: '**[Enoxaparin](#/drug/enoxaparin/pregnancy) Dosing:**\n\n• **Therapeutic:** 1 mg/kg SC BID (preferred in pregnancy)\n• Once-daily dosing less preferred due to pharmacokinetics\n\n**Monitoring:**\n• Anti-Xa levels (target 0.6-1.0 U/mL at 4h post-dose)\n• Check monthly or with significant weight changes\n• Adjust dose as pregnancy progresses (weight gain)\n\n**Duration:**\n• Throughout pregnancy\n• At least 6 weeks postpartum\n• Minimum 3 months total treatment\n\n**Peripartum Management:**\n• Hold LMWH 24h before planned delivery\n• Regional anesthesia safe 12-24h after last dose [1][2][6]',
    citation: [1, 2, 6],
    treatment: {
      firstLine: {
        drug: 'Enoxaparin',
        dose: '1 mg/kg',
        route: 'SC',
        frequency: 'BID',
        duration: 'Through pregnancy + 6 weeks postpartum',
        notes: 'Monitor anti-Xa levels monthly',
      },
      alternative: {
        drug: 'Dalteparin',
        dose: '100 U/kg',
        route: 'SC',
        frequency: 'BID',
        duration: 'Through pregnancy + 6 weeks postpartum',
        notes: 'Alternative LMWH option',
      },
      monitoring: 'Anti-Xa levels 4h post-dose, target 0.6-1.0 U/mL',
    },
    next: 'pep-severity',

    summary: 'Enoxaparin 1 mg/kg SC BID; monitor anti-Xa monthly; hold 24h before delivery; 6 weeks postpartum minimum',
  },

  {
    id: 'pep-severity',
    type: 'question',
    module: 4,
    title: 'PE Severity Assessment',
    body: '**Risk Stratification for Treatment Decisions:**\n\n**Submassive PE indicators:**\n• RV dilation on CTPA or echo\n• Elevated troponin\n• Elevated BNP/NT-proBNP\n• Tachycardia, hypoxia\n\n**Does patient have submassive or massive PE?**\n\nThis determines whether thrombolysis should be considered. [1][2][4]',
    citation: [1, 2, 4],
    options: [
      {
        label: 'Low-risk PE — anticoagulation only',
        next: 'pep-low-risk',
      },
      {
        label: 'Submassive PE — monitor closely',
        next: 'pep-submassive',
        urgency: 'urgent',
      },
      {
        label: 'Massive PE — consider thrombolysis',
        next: 'pep-thrombolysis',
        urgency: 'critical',
      },
    ],

    summary: 'RV dilation, elevated troponin/BNP indicate submassive; determines whether thrombolysis should be considered',
  },

  {
    id: 'pep-low-risk',
    type: 'info',
    module: 4,
    title: 'Low-Risk PE Management',
    body: '**Low-risk PE in pregnancy:**\n\n• Hemodynamically stable\n• No RV dysfunction\n• Normal biomarkers\n\n**Management:**\n• Therapeutic LMWH\n• Can often be managed outpatient after initial stabilization\n• Close obstetric follow-up\n• Monitor for bleeding complications\n\n**Outpatient criteria:**\n• Reliable patient\n• Able to self-administer injections\n• No other high-risk features\n• Close follow-up arranged [1][2]',
    citation: [1, 2],
    next: 'pep-disposition',

    summary: 'Therapeutic LMWH; may manage outpatient if reliable patient can self-administer injections with close follow-up',
  },

  {
    id: 'pep-submassive',
    type: 'info',
    module: 4,
    title: 'Submassive PE Management',
    body: '**Submassive PE in pregnancy requires ICU monitoring:**\n\n**Management:**\n• Therapeutic anticoagulation (UFH or LMWH)\n• Continuous cardiac monitoring\n• Serial echocardiography\n• Watch for deterioration\n\n**Thrombolysis considerations:**\n• NOT routine for submassive PE in pregnancy\n• Consider if clinical deterioration\n• Consider catheter-directed therapy as alternative\n\n**Consult:**\n• Pulmonology\n• Cardiology\n• MFM (Maternal-Fetal Medicine) [1][2][4]',
    citation: [1, 2, 4],
    next: 'pep-disposition',

    summary: 'ICU monitoring; thrombolysis NOT routine for submassive; catheter-directed therapy as alternative if deteriorating',
  },

  // =====================================================================
  // MODULE 5: THROMBOLYSIS
  // =====================================================================

  {
    id: 'pep-thrombolysis',
    type: 'info',
    module: 5,
    title: 'Thrombolysis in Pregnancy',
    body: '**Thrombolysis is NOT contraindicated in pregnancy** when indicated for massive PE.\n\n**Indications:**\n• Massive PE with hemodynamic instability\n• Cardiac arrest from PE\n• Impending cardiovascular collapse\n\n**Risks:**\n• Maternal hemorrhage (especially if near delivery)\n• Placental abruption\n• Fetal loss\n\n**Risk-Benefit:**\n• Maternal death from untreated massive PE: 25-65%\n• Maternal mortality justifies thrombolysis risk\n• Fetal survival depends on maternal survival\n\n**tPA does NOT cross placenta** [1][2][4]',
    citation: [1, 2, 4],
    next: 'pep-tpa-dosing',

    summary: 'Thrombolysis NOT contraindicated in pregnancy for massive PE; maternal death 25-65% if untreated; tPA does not cross placenta',
    safetyLevel: 'critical',
  },

  {
    id: 'pep-tpa-dosing',
    type: 'info',
    module: 5,
    title: 'tPA Dosing for Massive PE',
    body: '**[Alteplase (tPA)](#/drug/alteplase/pe):**\n\n**Standard Dose:**\n• 100 mg IV over 2 hours\n• Or 50 mg bolus if cardiac arrest\n\n**Half-Dose Protocol (alternative):**\n• 50 mg IV over 2 hours\n• May reduce bleeding risk\n• Efficacy data limited\n\n**Post-tPA:**\n• Hold anticoagulation 2-4h then restart UFH\n• Monitor for bleeding\n• Serial fibrinogen levels\n\n**Alternative: Catheter-Directed Therapy**\n• Lower systemic dose\n• May be preferred if available [1][2][4]',
    citation: [1, 2, 4],
    treatment: {
      firstLine: {
        drug: 'Alteplase (tPA)',
        dose: '100 mg',
        route: 'IV',
        frequency: 'Over 2 hours',
        duration: 'Single dose',
        notes: 'For massive PE with hemodynamic instability',
      },
      monitoring: 'Close hemodynamic monitoring, watch for bleeding complications',
    },
    next: 'pep-disposition',

    summary: 'Alteplase 100 mg IV over 2h or 50 mg bolus in arrest; hold anticoagulation 2-4h post-tPA then restart UFH',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'pep-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**Disposition depends on PE severity and patient stability:**\n\n| Severity | Disposition |\n|----------|-------------|\n| Low-risk | May discharge with LMWH, close follow-up |\n| Submassive | ICU admission |\n| Massive | ICU, consider thrombolysis/embolectomy |\n\n**Before discharge (if appropriate):**\n• LMWH teaching and supplies\n• OB follow-up within 1 week\n• Hematology referral\n• Return precautions [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'ICU admission — submassive/massive PE',
        next: 'pep-icu',
        urgency: 'urgent',
      },
      {
        label: 'Admit to OB/telemetry — low-risk PE',
        next: 'pep-admit',
      },
      {
        label: 'Discharge with outpatient management',
        next: 'pep-discharge',
      },
    ],

    summary: 'Disposition by severity: low-risk may discharge with LMWH; submassive/massive require ICU admission',
  },

  {
    id: 'pep-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU Admission for Submassive/Massive PE:**\n\n• Continuous cardiac monitoring\n• Arterial line if on pressors\n• Serial echocardiography\n• Serial troponin/BNP\n• OB at bedside for fetal monitoring\n\n**Consultations:**\n• Pulmonology\n• Cardiology\n• MFM\n• Interventional radiology (for catheter-directed therapy)\n• CT surgery (for embolectomy backup)\n\n**Delivery planning:**\n• If near term, may need urgent delivery\n• Coordinate with MFM and anesthesia [1][2]',
    recommendation: 'ICU admission required. Multidisciplinary team involvement. OB at bedside for fetal monitoring.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  {
    id: 'pep-admit',
    type: 'result',
    module: 6,
    title: 'Admit to OB/Telemetry',
    body: '**Low-Risk PE Hospital Admission:**\n\n• Telemetry monitoring\n• Initiate therapeutic LMWH\n• LMWH teaching\n• OB monitoring of fetus\n• Transition to outpatient when stable\n\n**Before discharge:**\n• Confirm ability to self-inject\n• Arrange LMWH supply\n• Follow-up appointments\n• Return precautions [1][2]',
    recommendation: 'Admit to OB floor with telemetry. Initiate LMWH, arrange outpatient follow-up.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'pep-discharge',
    type: 'result',
    module: 6,
    title: 'Outpatient Management',
    body: '**Select patients with low-risk PE may be discharged:**\n\n**Requirements:**\n• Hemodynamically stable\n• No RV dysfunction\n• Reliable patient\n• Support system at home\n• Ability to self-inject LMWH\n• Close follow-up arranged\n\n**Discharge Instructions:**\n• LMWH injection technique\n• Signs of bleeding to watch for\n• Signs of PE progression\n• OB follow-up within 1 week\n• Hematology follow-up\n\n**Prescriptions:**\n• LMWH supply (consider 2-week supply)\n• Sharps container [1][2]',
    recommendation: 'Low-risk PE may be managed outpatient with therapeutic LMWH and close follow-up.',
    confidence: 'consider',
    citation: [1, 2],
  },

];

export const PE_PREGNANCY_MODULE_LABELS = [
  'Recognition',
  'Risk Stratification',
  'Diagnosis',
  'Treatment',
  'Thrombolysis',
  'Disposition',
];

export const PE_PREGNANCY_CRITICAL_ACTIONS = [
  { text: 'Missing PE is more dangerous than diagnostic radiation (fetal radiation risk overstated)', nodeId: 'pep-start' },
  { text: 'D-dimer normally elevated in pregnancy - use pregnancy-adjusted thresholds (>1000 in 3rd trimester)', nodeId: 'pep-ddimer' },
  { text: 'CTA chest preferred imaging (lower breast radiation than V/Q, higher diagnostic yield)', nodeId: 'pep-imaging' },
  { text: 'Pregnancy-adapted YEARS algorithm: CTA if ≥1 clinical criterion + D-dimer >1000', nodeId: 'pep-years' },
  { text: 'Anticoagulation: LMWH preferred (enoxaparin 1 mg/kg SC q12h). Avoid warfarin (teratogenic).', nodeId: 'pep-anticoag' },
  { text: 'Thrombolysis indications: massive PE with hemodynamic instability (alteplase 100 mg IV over 2h)', nodeId: 'pep-thrombolysis' },
  { text: 'Pregnancy is 5-10x increased VTE risk (highest risk in 3rd trimester and postpartum)', nodeId: 'pep-start' },
  { text: 'Continue LMWH until delivery, switch to UFH at 36 weeks (shorter half-life for neuraxial anesthesia)', nodeId: 'pep-delivery-planning' },
  { text: 'Postpartum anticoagulation for 6 weeks minimum (can use warfarin postpartum)', nodeId: 'pep-postpartum' },
  { text: 'Fetal radiation exposure: CTA chest ~0.01-0.66 mGy (safe, <50 mGy threshold)', nodeId: 'pep-fetal-radiation' },
];

export const PE_PREGNANCY_CITATIONS: Citation[] = [
  { num: 1, text: 'EB Medicine - Pulmonary Embolism in Pregnancy. Emergency Medicine Practice. 2023.' },
  { num: 2, text: 'ACOG Practice Bulletin No. 196: Thromboembolism in Pregnancy. Obstet Gynecol. 2018;132(1):e1-e17.' },
  { num: 3, text: 'van der Pol LM et al. Pregnancy-Adapted YEARS Algorithm for Diagnosis of PE. N Engl J Med. 2019;380(12):1139-1149.' },
  { num: 4, text: 'EMCrit - Massive PE Management. Farkas J. https://emcrit.org/ibcc/pe/' },
  { num: 5, text: 'Righini M et al. Diagnosis of Pulmonary Embolism During Pregnancy. Ann Intern Med. 2018;169(11):766-773.' },
  { num: 6, text: 'UpToDate - Deep vein thrombosis and pulmonary embolism in pregnancy: Treatment. 2024.' },
];
