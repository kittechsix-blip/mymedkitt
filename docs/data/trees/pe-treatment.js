// MedKitt — Pulmonary Embolism Treatment
// Risk stratification → Massive/Submassive/Low-risk pathways → Anticoagulation selection
// 5 modules: Risk Stratification → Massive PE → Submassive PE → Low-Risk PE → Anticoagulation Selection
// 14 nodes total.
export const PE_TREATMENT_NODES = [
    // =====================================================================
    // MODULE 1: RISK STRATIFICATION
    // =====================================================================
    {
        id: 'pe-start',
        type: 'question',
        module: 1,
        title: 'PE Risk Stratification',
        body: 'Confirmed or high-probability acute pulmonary embolism. Risk stratification guides treatment.\n\nAssess **hemodynamic status** first:\n• SBP, heart rate, signs of shock\n• Bedside echo for RV strain\n• Troponin and BNP\n\nUse [PESI](#/calculator/pesi) or [sPESI](#/calculator/spesi) to risk-stratify normotensive patients.',
        citation: [1, 3],
        calculatorLinks: [
            { id: 'pesi', label: 'PESI Score' },
            { id: 'spesi', label: 'sPESI Score' },
        ],
        options: [
            {
                label: 'Massive PE (High-Risk)',
                description: 'Hypotension, cardiogenic shock, or cardiac arrest',
                next: 'pe-massive',
                urgency: 'critical',
            },
            {
                label: 'Submassive PE (Intermediate-Risk)',
                description: 'Normotensive with RV dysfunction or elevated biomarkers',
                next: 'pe-submassive',
                urgency: 'urgent',
            },
            {
                label: 'Low-Risk PE',
                description: 'Normal hemodynamics, no RV dysfunction, normal biomarkers',
                next: 'pe-low-risk',
            },
        ],
    },
    // =====================================================================
    // MODULE 2: MASSIVE PE (HIGH-RISK)
    // =====================================================================
    {
        id: 'pe-massive',
        type: 'info',
        module: 2,
        title: 'Massive PE — High-Risk',
        body: 'Sustained hypotension (SBP <90 mmHg or drop ≥40 mmHg for >15 min), cardiogenic shock, or cardiac arrest.\n\n**Mortality >15%** without immediate treatment.\n\n**ICD-10:** I26.02 (saddle embolus with acute cor pulmonale), I26.09, I26.90',
        images: [{ src: 'images/pe-treatment/saddle-pe-ct.png', alt: 'CT pulmonary angiogram showing saddle embolus straddling the main pulmonary artery bifurcation with bilateral filling defects', caption: 'Saddle PE on CT-PA — massive embolus at the main PA bifurcation with bilateral filling defects. (CC BY-SA 3.0, James Heilman MD)' }],
        citation: [1, 3],
        next: 'pe-massive-tx',
    },
    {
        id: 'pe-massive-tx',
        type: 'info',
        module: 2,
        title: 'Immediate Interventions',
        body: '**1. Anticoagulation** — start immediately:\n• [UFH](#/drug/ufh/pe) 80 units/kg bolus → 18 units/kg/hr infusion\n• Preferred over LMWH if thrombolysis anticipated\n\n**2. Systemic thrombolysis** (if no contraindications):\n• [Alteplase](#/drug/alteplase/pulmonary) 100 mg IV over 2 hours\n• OR accelerated regimen: 0.6 mg/kg (max 50 mg) over 15 min in cardiac arrest\n\n**3. If thrombolysis contraindicated:**\n• Catheter-directed therapy (CDT)\n• Surgical embolectomy\n• Consider ECMO as bridge in refractory shock\n\n**Volume resuscitation:** Cautious — >500 mL can worsen RV failure. Use vasopressors (norepinephrine preferred) for hemodynamic support.',
        citation: [1, 3],
        treatment: {
            firstLine: {
                drug: 'Alteplase',
                dose: '100 mg',
                route: 'IV',
                frequency: 'Over 2 hours',
                duration: 'Single dose',
                notes: 'Accelerated regimen in cardiac arrest: 0.6 mg/kg (max 50 mg) over 15 min',
            },
            alternative: {
                drug: 'Unfractionated Heparin (UFH)',
                dose: '80 units/kg bolus, then 18 units/kg/hr',
                route: 'IV',
                frequency: 'Continuous infusion',
                duration: 'Until transition to oral anticoagulation',
                notes: 'Preferred if thrombolysis anticipated; start immediately',
            },
            monitoring: 'aPTT q6h until stable (target 1.5-2.5x control); CBC, signs of bleeding; hemodynamic status',
        },
        next: 'pe-anticoag-selection',
    },
    // =====================================================================
    // MODULE 3: SUBMASSIVE PE (INTERMEDIATE-RISK)
    // =====================================================================
    {
        id: 'pe-submassive',
        type: 'question',
        module: 3,
        title: 'Submassive PE — Intermediate-Risk',
        body: 'Normotensive but with evidence of RV strain or myocardial injury.\n\nAssess for **both**:\n• **RV dysfunction** — echo (RV/LV ratio >0.9, McConnell sign, TAPSE <16mm) or CT (RV/LV ≥0.9)\n• **Elevated biomarkers** — troponin AND/OR BNP/NT-proBNP',
        citation: [1, 3],
        options: [
            {
                label: 'Intermediate-High Risk',
                description: 'BOTH RV dysfunction AND elevated biomarkers',
                next: 'pe-submassive-high',
                urgency: 'urgent',
            },
            {
                label: 'Intermediate-Low Risk',
                description: 'Either RV dysfunction OR elevated biomarkers (not both)',
                next: 'pe-submassive-low',
            },
        ],
    },
    {
        id: 'pe-submassive-high',
        type: 'info',
        module: 3,
        title: 'Intermediate-High Risk Management',
        body: '**Anticoagulation** — start immediately:\n• [Enoxaparin](#/drug/enoxaparin/pe) 1 mg/kg SC q12h, OR\n• [UFH](#/drug/ufh/pe) if considering escalation to thrombolysis, OR\n• [Fondaparinux](#/drug/fondaparinux/pe) 5–10 mg SC daily (weight-based)\n\n**ICU monitoring recommended.** Watch closely for clinical deterioration.\n\n**Rescue thrombolysis** if hemodynamic decompensation:\n• [Alteplase](#/drug/alteplase/pulmonary) 100 mg IV over 2h\n• Half-dose alteplase (50 mg) may reduce bleeding risk — emerging evidence\n\n**Consider catheter-directed therapy** if thrombolysis contraindicated but patient deteriorating.',
        citation: [1, 4],
        treatment: {
            firstLine: {
                drug: 'Enoxaparin',
                dose: '1 mg/kg',
                route: 'SC',
                frequency: 'Every 12 hours',
                duration: 'Until transition to oral anticoagulation',
            },
            alternative: {
                drug: 'Fondaparinux',
                dose: '5-10 mg (weight-based)',
                route: 'SC',
                frequency: 'Once daily',
                duration: 'Until transition to oral anticoagulation',
                notes: '<50 kg: 5 mg; 50-100 kg: 7.5 mg; >100 kg: 10 mg',
            },
            monitoring: 'CBC, Cr, signs of bleeding; hemodynamic status for escalation to thrombolysis',
        },
        next: 'pe-anticoag-selection',
    },
    {
        id: 'pe-submassive-low',
        type: 'info',
        module: 3,
        title: 'Intermediate-Low Risk Management',
        body: 'Either RV dysfunction OR elevated biomarkers, but **not both**.\n\n**Anticoagulation alone** — thrombolysis not indicated:\n• [Enoxaparin](#/drug/enoxaparin/pe) 1 mg/kg SC q12h, OR\n• [UFH](#/drug/ufh/pe) if CrCl <30 or concern for rapid escalation\n\n**Hospital admission** for monitoring (typically step-down unit).\n\nReassess if clinical deterioration → escalate to intermediate-high risk pathway.',
        citation: [1],
        treatment: {
            firstLine: {
                drug: 'Enoxaparin',
                dose: '1 mg/kg',
                route: 'SC',
                frequency: 'Every 12 hours',
                duration: 'Until transition to oral anticoagulation',
            },
            alternative: {
                drug: 'Unfractionated Heparin (UFH)',
                dose: '80 units/kg bolus, then 18 units/kg/hr',
                route: 'IV',
                frequency: 'Continuous infusion',
                duration: 'Until transition to oral anticoagulation',
                notes: 'Preferred if CrCl <30 mL/min or concern for rapid escalation',
            },
            monitoring: 'CBC, Cr; monitor for clinical deterioration requiring escalation',
        },
        next: 'pe-anticoag-selection',
    },
    // =====================================================================
    // MODULE 4: LOW-RISK PE
    // =====================================================================
    {
        id: 'pe-low-risk',
        type: 'info',
        module: 4,
        title: 'Low-Risk PE',
        body: 'No RV dysfunction on imaging, normal cardiac biomarkers, no hypotension.\n\n**PESI Class I–II** or **sPESI = 0**.\n\nUse [PESI](#/calculator/pesi) or [sPESI](#/calculator/spesi) to confirm low-risk classification.',
        citation: [1],
        calculatorLinks: [
            { id: 'pesi', label: 'PESI Score' },
            { id: 'spesi', label: 'sPESI Score' },
        ],
        next: 'pe-outpatient-check',
    },
    {
        id: 'pe-outpatient-check',
        type: 'question',
        module: 4,
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
    },
    {
        id: 'pe-outpatient-tx',
        type: 'info',
        module: 4,
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
    },
    {
        id: 'pe-inpatient-low',
        type: 'info',
        module: 4,
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
    },
    // =====================================================================
    // MODULE 5: ANTICOAGULATION SELECTION
    // =====================================================================
    {
        id: 'pe-anticoag-selection',
        type: 'question',
        module: 5,
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
    },
    {
        id: 'pe-doac',
        type: 'info',
        module: 5,
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
    },
    {
        id: 'pe-lmwh-warfarin',
        type: 'info',
        module: 5,
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
    },
    {
        id: 'pe-renal-hepatic',
        type: 'info',
        module: 5,
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
    },
];
export const PE_TREATMENT_NODE_COUNT = PE_TREATMENT_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const PE_TREATMENT_MODULE_LABELS = [
    'Risk Stratification',
    'Massive PE',
    'Submassive PE',
    'Low-Risk PE',
    'Anticoagulation Selection',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const PE_TREATMENT_CRITICAL_ACTIONS = [
    { text: 'Anticoagulation within 60 minutes: heparin bolus 80 units/kg IV (max 10,000 units)', nodeId: 'pe-anticoag-choice' },
    { text: 'Thrombolytics (tPA 50 mg IV over 2 hours) if massive PE with hypotension', nodeId: 'pe-thrombolytics' },
    { text: 'Avoid intubation if possible (positive pressure worsens RV strain) - use NIV if needed', nodeId: 'pe-avoid-intubation' },
    { text: 'Push-dose pressors for hypotension: phenylephrine 100-200 mcg IVP (preserve RV perfusion)', nodeId: 'pe-pressors' },
    { text: 'POCUS to assess RV strain (RV:LV ratio >1, McConnell sign, septal bowing)', nodeId: 'pe-pocus' },
    { text: 'Activate PERT (Pulmonary Embolism Response Team) for massive/submassive PE', nodeId: 'pe-pert' },
    { text: 'Consider ECMO/catheter-directed therapy for refractory shock', nodeId: 'pe-catheter-directed' },
];
export const PE_TREATMENT_CITATIONS = [
    { num: 1, text: 'Konstantinides SV, Meyer G, Becattini C, et al. 2019 ESC Guidelines for the Diagnosis and Management of Acute Pulmonary Embolism. Eur Heart J. 2020;41(4):543-603. https://academic.oup.com/eurheartj/article/41/4/543/5556506' },
    { num: 2, text: 'Torbicki A, Perrier A, Konstantinides S, et al. Guidelines on the Diagnosis and Management of Acute Pulmonary Embolism. Eur Heart J. 2008;29(18):2276-315.' },
    { num: 3, text: 'Jaff MR, McMurtry MS, Archer SL, et al. Management of Massive and Submassive Pulmonary Embolism. Circulation. 2011;123(16):1788-830.' },
    { num: 4, text: 'Stevens SM, Woller SC, Kreuziger LB, et al. Antithrombotic Therapy for VTE Disease: Second Update of the CHEST Guideline. CHEST. 2021;160(6):e545-e608.' },
    { num: 5, text: 'Warkentin TE, Greinacher A, Gruel Y, et al. Heparin-Induced Thrombocytopenia in the Cardiovascular Patient. Circulation. 2021;144(5):e1-e22.' },
];
