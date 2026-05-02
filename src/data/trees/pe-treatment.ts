// MedKitt — Pulmonary Embolism Treatment
// Risk stratification → Category D-E (Crashing) → Category C (Intermediate) → Category A-B (Low-risk) → Anticoagulation
// Updated per 2026 AHA/ACC/ACCP/ACEP PE Guidelines + EMCrit Episode 424
// 6 modules: Risk Stratification → Crashing PE (D-E) → Intermediate-Risk (C) → Low-Risk (A-B) → Advanced Interventions → Anticoagulation
// 17 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PE_TREATMENT_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RISK STRATIFICATION (2026 AHA/ACC Categories A-E)
  // =====================================================================

  {
    id: 'pe-start',
    type: 'question',
    module: 1,
    title: 'PE Risk Stratification (2026)',
    body: '[PE Treatment Summary](#/info/pe-steps)\n\nConfirmed or high-probability acute PE. **2026 AHA/ACC categories** replace old massive/submassive terminology.\n\nAssess **hemodynamic status** first:\n• SBP <90 or drop ≥40 mmHg for >15 min?\n• Signs of shock (altered mental status, cool extremities, oliguria)?\n• **Bradycardia (HR <40) = most ominous finding**\n• Bedside echo for RV strain\n• Troponin, BNP, lactate (>2 mM = 10% absolute mortality increase)\n\nUse [PESI](#/calculator/pesi) or [sPESI](#/calculator/spesi) for normotensive patients.',
    citation: [1, 6],
    calculatorLinks: [
      { id: 'pesi', label: 'PESI Score' },
      { id: 'spesi', label: 'sPESI Score' },
      { id: 'pe-risk-category', label: 'PE Risk Category (A-E)' },
    ],
    options: [
      {
        label: 'Category D-E: Crashing PE',
        description: 'Hypotension, shock, cardiac arrest, or pre-arrest (borderline BP, HR <40)',
        next: 'pe-crashing',
        urgency: 'critical',
      },
      {
        label: 'Category C: Intermediate-Risk',
        description: 'Normotensive with RV dysfunction, elevated biomarkers, or PESI >85',
        next: 'pe-intermediate',
        urgency: 'urgent',
      },
      {
        label: 'Category A-B: Low-Risk',
        description: 'Normal hemodynamics, no RV dysfunction, normal biomarkers, sPESI 0',
        next: 'pe-low-risk',
      },
    ],

    summary: '2026 AHA/ACC 5-category system (A-E); assess SBP, RV strain, troponin, lactate; bradycardia <40 = ominous',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 2: CRASHING PE (CATEGORY D-E)
  // =====================================================================

  {
    id: 'pe-crashing',
    type: 'info',
    module: 2,
    title: 'Crashing PE — Category D-E',
    body: '**Category E:** Cardiopulmonary failure — sustained SBP <90 or ≥40 mmHg drop for >15 min, cardiogenic shock, cardiac arrest.\n\n**Category D:** Pre-failure — transient/borderline hypotension, approaching deterioration, HR <40.\n\n**Mortality >15%** without immediate reperfusion.\n\n**Red flags:**\n• **Bradycardia (HR <40)** — most ominous, harbinger of brady-asystolic arrest\n• Lactate >2 mM — 10% absolute mortality increase, HR 12 for death\n• RV dilatation on echo/CT\n\n**ICD-10:** I26.02 (saddle PE with cor pulmonale), I26.09, I26.90',
    images: [{ src: 'images/pe-treatment/saddle-pe-ct.png', alt: 'CT pulmonary angiogram showing saddle embolus straddling the main pulmonary artery bifurcation with bilateral filling defects', caption: 'Saddle PE on CT-PA — massive embolus at the main PA bifurcation with bilateral filling defects. (CC BY-SA 3.0, James Heilman MD)' }],
    citation: [1, 6],
    next: 'pe-crashing-resus',

    summary: 'Category E = shock/arrest; Category D = pre-arrest (HR <40 = ominous); lactate >2 mM = 10% mortality increase',
    safetyLevel: 'critical',
  },

  {
    id: 'pe-crashing-resus',
    type: 'info',
    module: 2,
    title: 'Immediate Resuscitation',
    body: '**CRITICAL:** Standard shock resuscitation worsens massive PE.\n\n**1. AVOID INTUBATION if possible**\n• Positive pressure worsens RV performance\n• May precipitate cardiac arrest\n• Use high-flow O2 (100% O2 = pulmonary vasodilator)\n\n**2. AVOID FLUID LOADING**\n• RV already dilated — fluids worsen failure\n• **Diuresis may improve hemodynamics** (Terlipressin 2013)\n• Cautious: <500 mL only if clearly hypovolemic\n\n**3. EARLY VASOPRESSORS**\n• [Norepinephrine](#/drug/norepinephrine/pe) preferred first-line\n• Push-dose [phenylephrine](#/drug/phenylephrine/push-dose) 100-200 mcg for immediate support\n• Peripheral line OK if expedites stabilization\n\n**4. ACTIVATE PERT** — Class 1 recommendation (2026 AHA/ACC)',
    citation: [1, 6, 7],
    calculatorLinks: [
      { id: 'pe-resus-checklist', label: 'Crashing PE Checklist' },
    ],
    next: 'pe-crashing-reperfusion',

    summary: 'AVOID intubation + fluid loading; high-flow O2; norepinephrine early; activate PERT immediately',
    safetyLevel: 'critical',
  },

  {
    id: 'pe-crashing-reperfusion',
    type: 'question',
    module: 2,
    title: 'Reperfusion Strategy',
    body: '**Anticoagulation** — start immediately:\n• [UFH](#/drug/ufh/pe) — no bolus if thrombolysis imminent; low-dose infusion ≤500 U/hr\n• UFH preferred (can be stopped if hemorrhage)\n\n**Systemic thrombolysis** — only intervention with mortality benefit data.\n\n**Dosing options:**\n• Standard: [Alteplase](#/drug/alteplase/pulmonary) **100 mg IV over 2h**\n• Reduced-dose: **50 mg IV bolus** (emerging evidence — less bleeding, equivalent efficacy)\n• Cardiac arrest: **50 mg IV bolus** + sustained CPR\n\n**2026 update:** Mechanical thrombectomy now preferred over CDT for stable-enough patients (PEERLESS trial).',
    citation: [1, 6, 7, 8],
    calculatorLinks: [
      { id: 'alteplase-pe-dosing', label: 'Alteplase Dosing' },
    ],
    treatment: {
      firstLine: {
        drug: 'Alteplase',
        dose: '100 mg (or 50 mg reduced-dose)',
        route: 'IV',
        frequency: 'Over 2 hours (or bolus if cardiac arrest)',
        duration: 'Single dose',
        notes: 'Cardiac arrest: 50 mg IV bolus + CPR; avoid concurrent heparin bolus',
      },
      alternative: {
        drug: 'UFH (low-dose)',
        dose: '≤500 units/hr infusion (no bolus)',
        route: 'IV',
        frequency: 'Continuous',
        duration: 'Until reperfusion achieved',
        notes: 'Give alteplase BEFORE heparin to reduce bleeding risk',
      },
      monitoring: 'Hemodynamics; fibrinogen if reduced-dose protocol; bleeding signs',
    },
    options: [
      {
        label: 'Systemic Thrombolysis',
        description: 'No absolute contraindications — proceed with alteplase',
        next: 'pe-anticoag-selection',
      },
      {
        label: 'Thrombolysis Contraindicated',
        description: 'Recent surgery, active bleeding, prior ICH, etc.',
        next: 'pe-advanced-interventions',
        urgency: 'urgent',
      },
      {
        label: 'Refractory Shock / Arrest',
        description: 'Failed thrombolysis or deteriorating despite treatment',
        next: 'pe-advanced-interventions',
        urgency: 'critical',
      },
    ],

    summary: 'UFH (no bolus) + alteplase 100 mg over 2h (or 50 mg reduced-dose); cardiac arrest = 50 mg bolus + CPR',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 3: INTERMEDIATE-RISK PE (CATEGORY C)
  // =====================================================================

  {
    id: 'pe-intermediate',
    type: 'question',
    module: 3,
    title: 'Intermediate-Risk — Category C',
    body: 'Normotensive but with evidence of elevated clinical severity.\n\n**Category C criteria:**\n• PESI >85 or sPESI ≥1\n• RV dysfunction — echo (RV/LV >0.9, McConnell sign, TAPSE <16mm) or CT (RV/LV ≥0.9)\n• Elevated biomarkers — troponin AND/OR BNP/NT-proBNP\n• Lactate >2 mM\n\nFurther stratify by **combined risk factors:**',
    citation: [1, 6],
    options: [
      {
        label: 'High-Risk Category C',
        description: 'RV dysfunction + elevated biomarkers + lactate >2',
        next: 'pe-intermediate-high',
        urgency: 'urgent',
      },
      {
        label: 'Low-Risk Category C',
        description: 'Only 1-2 risk factors present',
        next: 'pe-intermediate-low',
      },
    ],

    summary: 'Category C = PESI >85, RV dysfunction, elevated troponin/BNP, lactate >2; stratify by combined risk factors',
  },

  {
    id: 'pe-intermediate-high',
    type: 'question',
    module: 3,
    title: 'High-Risk Category C',
    body: 'Multiple risk factors: RV dysfunction + elevated biomarkers + lactate elevation.\n\n**Management:**\n• [UFH](#/drug/ufh/pe) preferred (allows rapid escalation)\n• **ICU monitoring** — watch for decompensation\n• **Activate PERT** for multidisciplinary planning\n\n**2026 update:** For stable Category C patients, **mechanical thrombectomy now preferred over CDT** (PEERLESS trial — lower ICU admission, lower deterioration rate).\n\n**If decompensation occurs:**\n• Reduced-dose alteplase 25-50 mg IV over 2-6h\n• Or mechanical thrombectomy if PERT/IR available',
    citation: [1, 6, 8],
    treatment: {
      firstLine: {
        drug: 'UFH',
        dose: '80 units/kg bolus, then 18 units/kg/hr',
        route: 'IV',
        frequency: 'Continuous',
        duration: 'Until oral anticoagulation therapeutic',
        notes: 'Preferred over LMWH — allows rapid escalation to thrombolysis',
      },
      alternative: {
        drug: 'Reduced-dose Alteplase (rescue)',
        dose: '25-50 mg',
        route: 'IV',
        frequency: 'Over 2-6 hours',
        duration: 'Single dose',
        notes: 'For decompensation; monitor fibrinogen, hold if <150 mg/dL',
      },
      monitoring: 'Hemodynamics q1-2h; troponin/lactate q6h; fibrinogen if lytics given',
    },
    options: [
      {
        label: 'Continue Anticoagulation + Monitoring',
        description: 'Remains hemodynamically stable',
        next: 'pe-anticoag-selection',
      },
      {
        label: 'Advanced Intervention',
        description: 'Decompensating or high clot burden — consider mechanical thrombectomy',
        next: 'pe-advanced-interventions',
        urgency: 'urgent',
      },
    ],

    summary: 'UFH + ICU monitoring; PERT activation; mechanical thrombectomy preferred if intervention needed (PEERLESS)',
    safetyLevel: 'warning',
  },

  {
    id: 'pe-intermediate-low',
    type: 'info',
    module: 3,
    title: 'Low-Risk Category C',
    body: 'Only 1-2 risk factors present (RV dysfunction OR elevated biomarkers, not all three).\n\n**Anticoagulation alone** — advanced therapy not routinely indicated:\n• [Enoxaparin](#/drug/enoxaparin/pe) 1 mg/kg SC q12h, OR\n• [UFH](#/drug/ufh/pe) if CrCl <30 or concern for escalation\n\n**Telemetry admission** for monitoring (step-down unit appropriate).\n\nReassess if clinical deterioration → escalate to high-risk Category C pathway.',
    citation: [1, 6],
    treatment: {
      firstLine: {
        drug: 'Enoxaparin',
        dose: '1 mg/kg',
        route: 'SC',
        frequency: 'Every 12 hours',
        duration: 'Until transition to oral anticoagulation',
      },
      alternative: {
        drug: 'UFH',
        dose: '80 units/kg bolus, then 18 units/kg/hr',
        route: 'IV',
        frequency: 'Continuous',
        duration: 'Until transition to oral anticoagulation',
        notes: 'Preferred if CrCl <30 or concern for rapid escalation',
      },
      monitoring: 'Telemetry; CBC, Cr; reassess if clinical deterioration',
    },
    next: 'pe-anticoag-selection',

    summary: 'Anticoagulation alone; telemetry monitoring; escalate to high-risk pathway if deterioration',
  },

  // =====================================================================
  // MODULE 4: ADVANCED INTERVENTIONS
  // =====================================================================

  {
    id: 'pe-advanced-interventions',
    type: 'question',
    module: 4,
    title: 'Advanced Interventions',
    body: '**2026 update:** For patients stable enough for procedure, **mechanical thrombectomy is now preferred over catheter-directed lysis** (PEERLESS trial).\n\n**PEERLESS trial results (N=550):**\n• Mechanical thrombectomy vs CDT for intermediate-risk PE\n• Lower clinical deterioration: 1.8% vs 5.4%\n• Lower ICU admission: 41.6% vs 98.6%\n• Lower 30-day readmission: 3.2% vs 7.9%\n• No difference in mortality or major bleeding\n\n**Options by clinical scenario:**',
    citation: [6, 8],
    options: [
      {
        label: 'Mechanical Thrombectomy',
        description: 'Preferred for intermediate-risk; patient stable for transport to IR',
        next: 'pe-mechanical-thrombectomy',
      },
      {
        label: 'Catheter-Directed Lysis (CDT)',
        description: 'Alternative if mechanical not available; lower systemic bleeding than full-dose',
        next: 'pe-cdt',
      },
      {
        label: 'VA-ECMO',
        description: 'Refractory shock despite treatment, or cardiac arrest from PE',
        next: 'pe-ecmo',
        urgency: 'critical',
      },
      {
        label: 'Surgical Embolectomy',
        description: 'Refractory cases, contraindications to other approaches, or cardiothoracic available',
        next: 'pe-surgery',
      },
    ],

    summary: 'Mechanical thrombectomy now preferred over CDT (PEERLESS); VA-ECMO for refractory shock; surgical embolectomy as backup',
    safetyLevel: 'warning',
  },

  {
    id: 'pe-mechanical-thrombectomy',
    type: 'info',
    module: 4,
    title: 'Mechanical Thrombectomy',
    body: '**Large-bore aspiration devices** (FlowTriever, Inari, etc.) remove clot without systemic thrombolytics.\n\n**Advantages:**\n• No systemic lytic exposure — lower bleeding risk\n• Faster clot removal than CDT\n• Lower ICU admission rates (PEERLESS)\n\n**Requirements:**\n• IR suite availability\n• Patient stable enough for transport\n• PERT coordination recommended\n\n**Post-procedure:**\n• Anticoagulation with UFH initially\n• Transition to oral anticoagulation when stable\n• Echo at 24h to assess RV recovery (aim for >75% clot reduction)',
    citation: [6, 8],
    next: 'pe-anticoag-selection',

    summary: 'Large-bore aspiration (FlowTriever); no systemic lytics; lower ICU admission; requires IR + patient stability',
  },

  {
    id: 'pe-cdt',
    type: 'info',
    module: 4,
    title: 'Catheter-Directed Thrombolysis',
    body: '**Low-dose alteplase delivered directly to clot** via catheter.\n\n**Typical protocol:**\n• Alteplase 1-2 mg/hr per catheter (total 8-24 mg over 6-24h)\n• With or without ultrasound assistance (EKOS)\n\n**Key insight (OPTALYSE PE):**\n• Peripheral slow infusion achieves equivalent outcomes to catheter-directed\n• Avoids procedural risk and cost\n• Option: 25 mg alteplase IV over 6h with fibrinogen monitoring\n\n**Bleeding risk:** 0.13% ICH in CDT trials (much lower than systemic full-dose)',
    citation: [7, 9],
    next: 'pe-anticoag-selection',

    summary: 'Alteplase 8-24 mg over 6-24h via catheter; peripheral slow infusion (25 mg over 6h) may be equivalent',
  },

  {
    id: 'pe-ecmo',
    type: 'info',
    module: 4,
    title: 'VA-ECMO',
    body: '**Indications:**\n• Refractory cardiogenic shock despite vasopressors/inotropes\n• Cardiac arrest from PE\n• Failed or contraindicated thrombolysis\n\n**Role:** Bridge to reperfusion (systemic lysis, surgical embolectomy, or catheter intervention).\n\n**Outcomes:**\n• Mortality ~57% with ECMO alone (no reperfusion)\n• Better outcomes when ECMO bridges to definitive clot removal\n\n**Requirements:**\n• ECMO center capability\n• Multidisciplinary PERT coordination\n• Rapid cannulation team',
    citation: [6, 10],
    next: 'pe-anticoag-selection',

    summary: 'Bridge to reperfusion for refractory shock/arrest; ~57% mortality with ECMO alone; requires ECMO center',
    safetyLevel: 'critical',
  },

  {
    id: 'pe-surgery',
    type: 'info',
    module: 4,
    title: 'Surgical Embolectomy',
    body: '**Indications:**\n• Refractory shock despite other therapies\n• Contraindications to thrombolysis AND catheter therapy\n• Cardiothoracic surgery available\n• Right heart thrombus in transit\n\n**Requires:**\n• Cardiopulmonary bypass\n• Experienced surgical team\n• PERT coordination\n\n**Outcomes:** Variable mortality (15-50%) depending on pre-operative status.',
    citation: [1, 6],
    next: 'pe-anticoag-selection',

    summary: 'Reserved for refractory cases; requires cardiopulmonary bypass; variable mortality 15-50%',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 5: LOW-RISK PE (CATEGORY A-B)
  // =====================================================================

  {
    id: 'pe-low-risk',
    type: 'info',
    module: 5,
    title: 'Low-Risk — Category A-B',
    body: '**Category A:** Asymptomatic/subclinical PE — may discharge from ED.\n**Category B:** Symptomatic, low clinical severity — early discharge possible.\n\nCriteria for low-risk:\n• No RV dysfunction on imaging\n• Normal cardiac biomarkers (troponin, BNP)\n• No hypotension\n• **PESI Class I–II** or **sPESI = 0**\n\nUse [PESI](#/calculator/pesi) or [sPESI](#/calculator/spesi) to confirm.',
    citation: [1, 6],
    calculatorLinks: [
      { id: 'pesi', label: 'PESI Score' },
      { id: 'spesi', label: 'sPESI Score' },
    ],
    next: 'pe-outpatient-check',

    summary: 'Category A = asymptomatic (may d/c); Category B = symptomatic low-risk (early d/c); sPESI 0, normal biomarkers',
  },

  {
    id: 'pe-outpatient-check',
    type: 'question',
    module: 5,
    title: 'Outpatient Treatment Eligible?',
    body: 'Assess for **outpatient management** (Hestia criteria or institutional protocol):\n\n• Hemodynamically stable\n• No need for supplemental O₂\n• No active bleeding or high bleeding risk\n• No severe renal impairment (CrCl >30)\n• No severe pain requiring IV analgesics\n• Good social support and reliable follow-up\n• Able to take oral medications\n• No pregnancy',
    citation: [1, 4],
    options: [
      {
        label: 'Yes — Outpatient eligible',
        description: 'Meets all outpatient criteria',
        next: 'pe-outpatient-tx',
      },
      {
        label: 'No — Brief inpatient stay',
        description: 'Any concern for outpatient safety',
        next: 'pe-inpatient-low',
      },
    ],

    summary: 'Hestia-type criteria: stable, no O2 need, no bleeding risk, good support, able to take oral meds, not pregnant',
  },

  {
    id: 'pe-outpatient-tx',
    type: 'info',
    module: 5,
    title: 'Outpatient Anticoagulation',
    body: '**DOACs preferred** (no parenteral bridge needed):\n• [Apixaban](#/drug/apixaban/pe) 10 mg BID × 7 days → 5 mg BID\n• [Rivaroxaban](#/drug/rivaroxaban/pe) 15 mg BID × 21 days → 20 mg daily with food\n\n**Follow-up:** Within 3–7 days with primary care or hematology.\n\n**Patient education:**\n• Return for worsening dyspnea, chest pain, hemoptysis, syncope\n• Adherence to anticoagulation is critical\n• Minimum 3 months of therapy; reassess for extended treatment',
    citation: [1, 4],
    treatment: {
      firstLine: {
        drug: 'Apixaban',
        dose: '10 mg x 7 days, then 5 mg',
        route: 'PO',
        frequency: 'BID',
        duration: 'Minimum 3 months',
        notes: 'No parenteral bridge required',
      },
      alternative: {
        drug: 'Rivaroxaban',
        dose: '15 mg BID x 21 days, then 20 mg daily',
        route: 'PO',
        frequency: 'BID then daily',
        duration: 'Minimum 3 months',
        notes: 'Take with food; no parenteral bridge required',
      },
      monitoring: 'Follow-up within 3-7 days; reassess at 3 months for extended therapy',
    },
    next: 'pe-anticoag-selection',

    summary: 'Apixaban 10 mg BID x7d then 5 mg BID, or rivaroxaban 15 mg BID x21d then 20 mg daily; no bridge needed',
  },

  {
    id: 'pe-inpatient-low',
    type: 'info',
    module: 5,
    title: 'Brief Inpatient Stay',
    body: 'Admit for **24–48h observation** with initiation of anticoagulation.\n\nStart oral DOAC therapy:\n• [Apixaban](#/drug/apixaban/pe) 10 mg BID × 7 days → 5 mg BID, OR\n• [Rivaroxaban](#/drug/rivaroxaban/pe) 15 mg BID × 21 days → 20 mg daily\n\nTransition to outpatient when clinically stable and oral intake confirmed.',
    citation: [1],
    treatment: {
      firstLine: {
        drug: 'Apixaban',
        dose: '10 mg x 7 days, then 5 mg',
        route: 'PO',
        frequency: 'BID',
        duration: 'Minimum 3 months',
      },
      alternative: {
        drug: 'Rivaroxaban',
        dose: '15 mg BID x 21 days, then 20 mg daily',
        route: 'PO',
        frequency: 'BID then daily',
        duration: 'Minimum 3 months',
        notes: 'Take with food',
      },
      monitoring: 'Observe 24-48h; confirm oral intake before discharge',
    },
    next: 'pe-anticoag-selection',

    summary: 'Admit 24-48h observation; start oral DOAC; transition to outpatient when stable and tolerating PO',
  },

  // =====================================================================
  // MODULE 6: ANTICOAGULATION SELECTION
  // =====================================================================

  {
    id: 'pe-anticoag-selection',
    type: 'question',
    module: 6,
    title: 'Anticoagulation Selection',
    body: 'Choice depends on renal function, bleeding risk, patient preference, and cost.\n\n**Key decision points:**\n• CrCl <30 mL/min → UFH preferred\n• Cancer-associated VTE → DOAC (apixaban/rivaroxaban) or LMWH\n• Pregnancy → LMWH only (DOACs contraindicated)\n• HIT → argatroban or fondaparinux',
    citation: [4],
    options: [
      {
        label: 'DOAC (Preferred)',
        description: 'Apixaban, rivaroxaban, edoxaban, dabigatran',
        next: 'pe-doac',
      },
      {
        label: 'LMWH → Warfarin',
        description: 'Enoxaparin bridge to warfarin (INR target 2–3)',
        next: 'pe-lmwh-warfarin',
      },
      {
        label: 'Renal/Hepatic Impairment',
        description: 'CrCl <30 or severe hepatic disease',
        next: 'pe-renal-hepatic',
      },
    ],

    summary: 'DOACs preferred; CrCl <30 use UFH; cancer VTE use DOAC or LMWH; pregnancy use LMWH only; HIT use argatroban/fondaparinux',
  },

  {
    id: 'pe-doac',
    type: 'info',
    module: 6,
    title: 'DOAC Regimens (Preferred)',
    body: '**Single-drug approach (no parenteral lead-in):**\n• [Apixaban](#/drug/apixaban/pe) 10 mg BID × 7 days → 5 mg BID\n• [Rivaroxaban](#/drug/rivaroxaban/pe) 15 mg BID × 21 days → 20 mg daily (with food)\n\n**Parenteral lead-in required (5–10 days LMWH/UFH first):**\n• [Edoxaban](#/drug/edoxaban/pe) 60 mg daily (30 mg if CrCl 15–50, weight ≤60 kg, or P-gp inhibitor)\n• [Dabigatran](#/drug/dabigatran/pe) 150 mg BID\n\n**Duration:** Minimum 3 months. Extended treatment for unprovoked PE, recurrent VTE, or persistent risk factors.',
    citation: [4],
    treatment: {
      firstLine: {
        drug: 'Apixaban',
        dose: '10 mg x 7 days, then 5 mg',
        route: 'PO',
        frequency: 'BID',
        duration: 'Minimum 3 months',
        notes: 'No parenteral lead-in required',
      },
      alternative: {
        drug: 'Rivaroxaban',
        dose: '15 mg BID x 21 days, then 20 mg daily',
        route: 'PO',
        frequency: 'BID then daily',
        duration: 'Minimum 3 months',
        notes: 'Take with food; no parenteral lead-in required',
      },
      monitoring: 'Cr at baseline; reassess at 3 months for extended therapy decision',
    },

    summary: 'Apixaban/rivaroxaban no bridge needed; edoxaban/dabigatran require 5-10d parenteral lead-in; minimum 3 months',
  },

  {
    id: 'pe-lmwh-warfarin',
    type: 'info',
    module: 6,
    title: 'LMWH Bridge to Warfarin',
    body: '• [Enoxaparin](#/drug/enoxaparin/pe) 1 mg/kg SC q12h (or 1.5 mg/kg daily)\n• Start warfarin on day 1 — overlap until INR 2.0–3.0 for ≥24 hours\n• Discontinue LMWH after INR therapeutic × 2 consecutive days\n• Target INR: 2.0–3.0\n\n**Duration:** Minimum 3 months. Extended for unprovoked or recurrent VTE.\n\n**Monitoring:** INR weekly until stable, then monthly.',
    citation: [4],
    treatment: {
      firstLine: {
        drug: 'Enoxaparin',
        dose: '1 mg/kg (or 1.5 mg/kg daily)',
        route: 'SC',
        frequency: 'Every 12 hours (or daily)',
        duration: 'Until INR 2.0-3.0 x 2 consecutive days',
        notes: 'Start warfarin on day 1; overlap required',
      },
      alternative: {
        drug: 'Warfarin',
        dose: 'Variable (typically 5 mg start)',
        route: 'PO',
        frequency: 'Once daily',
        duration: 'Minimum 3 months',
        notes: 'Target INR 2.0-3.0',
      },
      monitoring: 'INR weekly until stable, then monthly; CBC',
    },

    summary: 'Enoxaparin bridge to warfarin; overlap until INR 2-3 for 2 consecutive days; INR monitoring weekly then monthly',
  },

  {
    id: 'pe-renal-hepatic',
    type: 'info',
    module: 6,
    title: 'Renal or Hepatic Impairment',
    body: '**CrCl <30 mL/min:**\n• [UFH](#/drug/ufh/pe) preferred — renally independent clearance\n• Adjust LMWH dose for CrCl 15–30 (enoxaparin 1 mg/kg SC daily)\n• Apixaban may be used cautiously (least renal elimination of DOACs)\n\n**Severe hepatic disease (Child-Pugh C):**\n• UFH preferred\n• DOACs contraindicated in severe hepatic impairment\n\n**HIT (heparin-induced thrombocytopenia):**\n• Discontinue ALL heparin products immediately\n• [Fondaparinux](#/drug/fondaparinux/pe) or argatroban as alternatives\n• Bridge to warfarin only after platelet recovery (>150k)',
    citation: [4, 5],
    treatment: {
      firstLine: {
        drug: 'Unfractionated Heparin (UFH)',
        dose: '80 units/kg bolus, then 18 units/kg/hr',
        route: 'IV',
        frequency: 'Continuous infusion',
        duration: 'Until transition to oral anticoagulation',
        notes: 'Preferred for CrCl <30 mL/min and severe hepatic disease',
      },
      alternative: {
        drug: 'Enoxaparin (dose-adjusted)',
        dose: '1 mg/kg daily',
        route: 'SC',
        frequency: 'Once daily',
        duration: 'Until transition to oral anticoagulation',
        notes: 'For CrCl 15-30 mL/min; avoid if CrCl <15',
      },
      pcnAllergy: {
        drug: 'Fondaparinux',
        dose: '5-10 mg (weight-based)',
        route: 'SC',
        frequency: 'Once daily',
        duration: 'Until transition to oral anticoagulation',
        notes: 'Alternative for HIT; use with caution if CrCl <30',
      },
      monitoring: 'aPTT q6h (UFH); anti-Xa levels for LMWH in renal impairment; platelets for HIT',
    },

    summary: 'CrCl <30 use UFH; severe hepatic use UFH; HIT: stop ALL heparin, use fondaparinux or argatroban',
    safetyLevel: 'warning',
  },
];

export const PE_TREATMENT_NODE_COUNT = PE_TREATMENT_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const PE_TREATMENT_MODULE_LABELS = [
  'Risk Stratification',
  'Crashing PE (D-E)',
  'Intermediate-Risk (C)',
  'Advanced Interventions',
  'Low-Risk (A-B)',
  'Anticoagulation Selection',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const PE_TREATMENT_CRITICAL_ACTIONS = [
  { text: 'AVOID intubation if possible — positive pressure worsens RV failure and may cause arrest', nodeId: 'pe-crashing-resus' },
  { text: 'AVOID fluid loading — RV already dilated; diuresis may improve hemodynamics', nodeId: 'pe-crashing-resus' },
  { text: 'Early vasopressors: norepinephrine preferred; push-dose phenylephrine 100-200 mcg for immediate support', nodeId: 'pe-crashing-resus' },
  { text: 'Activate PERT immediately for Category D-E (Class 1 recommendation, 2026 AHA/ACC)', nodeId: 'pe-crashing-resus' },
  { text: 'UFH without bolus if thrombolysis imminent; give alteplase BEFORE heparin to reduce bleeding', nodeId: 'pe-crashing-reperfusion' },
  { text: 'Thrombolysis: alteplase 100 mg over 2h (standard) or 50 mg bolus (reduced-dose/cardiac arrest)', nodeId: 'pe-crashing-reperfusion' },
  { text: 'Mechanical thrombectomy preferred over CDT for stable intermediate-risk (PEERLESS trial)', nodeId: 'pe-advanced-interventions' },
  { text: 'Bradycardia (HR <40) is most ominous sign — harbinger of brady-asystolic arrest', nodeId: 'pe-crashing' },
];

export const PE_TREATMENT_CITATIONS: Citation[] = [
  { num: 1, text: 'Konstantinides SV, Meyer G, Becattini C, et al. 2019 ESC Guidelines for the Diagnosis and Management of Acute Pulmonary Embolism. Eur Heart J. 2020;41(4):543-603.' },
  { num: 2, text: 'Torbicki A, Perrier A, Konstantinides S, et al. Guidelines on the Diagnosis and Management of Acute Pulmonary Embolism. Eur Heart J. 2008;29(18):2276-315.' },
  { num: 3, text: 'Jaff MR, McMurtry MS, Archer SL, et al. Management of Massive and Submassive Pulmonary Embolism. Circulation. 2011;123(16):1788-830.' },
  { num: 4, text: 'Stevens SM, Woller SC, Kreuziger LB, et al. Antithrombotic Therapy for VTE Disease: Second Update of the CHEST Guideline. CHEST. 2021;160(6):e545-e608.' },
  { num: 5, text: 'Warkentin TE, Greinacher A, Gruel Y, et al. Heparin-Induced Thrombocytopenia in the Cardiovascular Patient. Circulation. 2021;144(5):e1-e22.' },
  { num: 6, text: '2026 AHA/ACC/ACCP/ACEP/CHEST/SCAI/SHM/SIR/SVM/SVN Guideline for Acute Pulmonary Embolism. Circulation. 2026.' },
  { num: 7, text: 'Weingart S. EMCrit Episode 424 — Crashing PE Update. EMCrit.org. 2026.' },
  { num: 8, text: 'Toma C, Jaber WA, Engelman Z, et al. PEERLESS Trial: Mechanical Thrombectomy vs Catheter-Directed Lysis for Intermediate-Risk PE. JACC. 2024.' },
  { num: 9, text: 'Piazza G, Hohlfelder B, Jaff MR, et al. OPTALYSE PE: Ultrasound-Assisted Catheter-Directed Thrombolysis. JACC Cardiovasc Interv. 2015;8(11):1382-92.' },
  { num: 10, text: 'Corsi F, Lebreton G, Aubert S, et al. ECMO for Massive Pulmonary Embolism. Ann Thorac Surg. 2017;103(1):188-194.' },
];
