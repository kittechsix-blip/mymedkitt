// MedKitt — STEMI (ST-Elevation Myocardial Infarction) Management
// Recognition → ECG Pattern → Initial Therapies → Reperfusion → Complications → Disposition
// 6 modules: Recognition & ECG → ECG Patterns → Initial Therapies → Reperfusion → Complications → Disposition
// 21 nodes total.
export const STEMI_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION & ECG DIAGNOSIS
    // =====================================================================
    {
        id: 'stemi-start',
        type: 'info',
        module: 1,
        title: 'Suspect STEMI',
        body: '[STEMI Steps Summary](#/info/stemi-summary)\n\n**Obtain 12-lead ECG within 10 minutes of first medical contact.**\n\nClassic presentation: chest pain/pressure \u00B1 radiation to arms, jaw, or back, with diaphoresis, nausea/vomiting, or dyspnea.\n\n**High-risk features:**\n\u2022 Chest pain + diaphoresis = highest likelihood ratio for STEMI [1]\n\u2022 Radiation to both arms \u2014 96% specific (but only 11% sensitive) [2]\n\u2022 8.4% of ACS presents WITHOUT chest pain \u2014 dyspnea, diaphoresis, nausea, syncope most common [3]\n\n**STEMI is an ECG diagnosis.** Do NOT delay for troponin. A negative troponin does NOT rule out STEMI.',
        citation: [1, 2, 3, 4],
        images: [{ src: 'images/stemi/vascular-territories.png', alt: 'ECG lead vascular territory map', caption: '12-lead ECG territories: leads map to coronary artery distributions' }],
        next: 'stemi-ecg-pattern',
    },
    {
        id: 'stemi-ecg-pattern',
        type: 'question',
        module: 1,
        title: 'ECG Pattern Assessment',
        body: '**STEMI criteria:** New J-point elevation in \u22652 contiguous leads:\n\u2022 \u22651 mm in all leads EXCEPT V2-V3\n\u2022 V2-V3: \u22652 mm in men \u226540y, \u22652.5 mm in men <40y, \u22651.5 mm in women\n\nAlso look for reciprocal changes \u2014 [PAILS Mnemonic](#/info/stemi-reciprocal)\n\nWhat does the 12-lead ECG show?',
        citation: [4, 5],
        options: [
            {
                label: 'Clear ST elevation meeting criteria',
                description: 'STE in \u22652 contiguous leads with reciprocal changes',
                next: 'stemi-confirmed',
                urgency: 'critical',
            },
            {
                label: 'ST depression V1-V3 (suspect posterior MI)',
                description: 'Anterior ST depression with upright T waves',
                next: 'stemi-posterior',
                urgency: 'urgent',
            },
            {
                label: 'LBBB or ventricular paced rhythm',
                description: 'Apply Sgarbossa criteria',
                next: 'stemi-lbbb',
            },
            {
                label: 'aVR elevation + diffuse ST depression',
                description: 'Concern for left main or triple vessel disease',
                next: 'stemi-avr',
                urgency: 'urgent',
            },
        ],
    },
    // =====================================================================
    // MODULE 2: ECG PATTERN IDENTIFICATION
    // =====================================================================
    {
        id: 'stemi-confirmed',
        type: 'info',
        module: 2,
        title: 'STEMI Confirmed \u2014 Activate Cath Lab',
        body: '**Immediately activate cardiac catheterization laboratory.**\n\n**Identify territory by STE distribution:**\n\u2022 **Anterior:** V1-V4 \u2014 LAD occlusion\n\u2022 **Inferior:** II, III, aVF \u2014 RCA (85%) or LCx (15%)\n\u2022 **Lateral:** I, aVL, V5, V6 \u2014 LCx occlusion\n\u2022 **Posterior:** V7-V9 STE (\u00B1 V1-V3 ST depression) \u2014 LCx\n\n**If inferior STEMI:** Get right-sided leads to assess for RV involvement (\u2192 avoid nitrates, volume-dependent)\n\nSee [Vascular Territories](#/info/stemi-vascular-territories) | [Pericarditis vs STEMI](#/info/stemi-pericarditis-diff)\n\nStart initial therapies immediately while preparing for reperfusion.',
        citation: [4, 5, 6],
        images: [
            { src: 'images/stemi/inferior-stemi.png', alt: 'Inferior STEMI ECG', caption: 'Inferior STEMI: ST elevation in II, III, aVF with reciprocal depression in aVL' },
            { src: 'images/stemi/lateral-mi.png', alt: 'Lateral STEMI ECG', caption: 'Lateral STEMI: ST elevation in I, aVL, V5, V6' },
        ],
        next: 'stemi-initial-tx',
    },
    {
        id: 'stemi-posterior',
        type: 'question',
        module: 2,
        title: 'Evaluate for Posterior STEMI',
        body: 'ST depression in V1-V3 with upright T waves and prominent R wave suggests posterior (inferobasal) STEMI.\n\n**Obtain posterior leads V7, V8, V9:**\n\u2022 V7 \u2014 posterior axillary line at level of V6\n\u2022 V8 \u2014 tip of scapula\n\u2022 V9 \u2014 halfway between V8 and left paraspinal muscles\n\n**Diagnostic criteria:** STE \u22650.5 mm in any posterior lead (\u22651 mm in men <40y has higher specificity)\n\nPosterior STEMI accounts for ~3% of acute MIs and is frequently missed. Per ESC guidelines, manage as STEMI. [7][8]',
        citation: [4, 7, 8],
        images: [
            { src: 'images/stemi/posterior-leads.png', alt: 'Posterior lead placement V7-V9', caption: 'Posterior lead placement: V7, V8, V9 on left posterior chest' },
            { src: 'images/stemi/posterior-mi.png', alt: 'Posterior MI ECG pattern', caption: 'Posterior STEMI: ST depression V1-V3 on standard ECG, STE on posterior leads' },
        ],
        options: [
            {
                label: 'Yes \u2014 posterior leads show STE',
                description: 'Posterior STEMI confirmed',
                next: 'stemi-confirmed',
                urgency: 'critical',
            },
            {
                label: 'No STE on posterior leads',
                description: 'Continue workup with serial ECGs',
                next: 'stemi-serial',
            },
        ],
    },
    {
        id: 'stemi-lbbb',
        type: 'question',
        module: 2,
        title: 'LBBB / Paced Rhythm \u2014 Sgarbossa Criteria',
        body: 'In LBBB or ventricular pacing, standard STEMI criteria cannot be applied. Use [Sgarbossa Criteria](#/calculator/sgarbossa) to evaluate.\n\n**Sgarbossa Criteria (any ONE positive = STEMI):**\n\u2022 Concordant STE \u22651 mm in leads with positive QRS (5 pts)\n\u2022 Concordant ST depression \u22651 mm in V1-V3 (3 pts)\n\u2022 Discordant STE \u22655 mm in leads with negative QRS (2 pts)\n\n**Modified Sgarbossa (Smith criteria):**\n\u2022 Replace 3rd criterion with ST/S ratio < \u22120.25\n\u2022 Significantly more accurate than original 3rd criterion [9]\n\nScore \u22653 = 98% specificity for STEMI. [10]\n\nPer 2017 ESC guidelines: LBBB + ongoing ischemic symptoms \u2192 manage as STEMI regardless of whether LBBB is old or new. [8]',
        citation: [4, 8, 9, 10],
        calculatorLinks: [{ id: 'sgarbossa', label: 'Sgarbossa Criteria' }],
        images: [
            { src: 'images/stemi/sgarbossa-criteria.png', alt: 'Sgarbossa criteria diagram', caption: 'Sgarbossa criteria for STEMI in LBBB: concordant STE, concordant STD in V1-V3, excessive discordant STE' },
            { src: 'images/stemi/anterior-stemi.png', alt: 'LBBB ECG pattern', caption: 'LBBB pattern: evaluate each lead for concordance vs expected discordance' },
        ],
        options: [
            {
                label: 'Sgarbossa positive \u2014 STEMI',
                next: 'stemi-confirmed',
                urgency: 'critical',
            },
            {
                label: 'Sgarbossa negative, high suspicion',
                description: 'Ongoing ischemic symptoms',
                next: 'stemi-serial',
                urgency: 'urgent',
            },
            {
                label: 'Sgarbossa negative, low suspicion',
                description: 'Consider NSTEMI workup',
                next: 'stemi-nstemi-workup',
            },
        ],
    },
    {
        id: 'stemi-avr',
        type: 'question',
        module: 2,
        title: 'aVR Elevation \u2014 Left Main Concern',
        body: 'STE in aVR with \u22651 mm ST depression in multiple leads may suggest:\n\u2022 **Left main coronary artery** stenosis or occlusion\n\u2022 Triple vessel disease\n\u2022 Diffuse subendocardial ischemia\n\n**Important:** Only 10% of patients with this pattern have acute thrombotic coronary occlusion. [11] Clinical context is critical.\n\nAssess hemodynamic status \u2014 instability strongly favors emergent catheterization.',
        citation: [5, 11],
        images: [{ src: 'images/stemi/avr-elevation.png', alt: 'aVR elevation with diffuse ST depression', caption: 'aVR elevation with widespread ST depression: consider left main or triple vessel disease' }],
        options: [
            {
                label: 'Hemodynamically unstable',
                description: 'Emergent cath indicated',
                next: 'stemi-confirmed',
                urgency: 'critical',
            },
            {
                label: 'Hemodynamically stable',
                description: 'Consult cardiology, consider echo, serial ECGs',
                next: 'stemi-serial',
            },
        ],
    },
    {
        id: 'stemi-serial',
        type: 'question',
        module: 2,
        title: 'Serial ECGs & Continued Monitoring',
        body: 'Obtain serial ECGs at **15- to 30-minute intervals** for the first 1\u20132 hours.\n\n\u2022 8% of all STEMIs are identified only on repeat ECG [12]\n\u2022 Dynamic ST changes are expected in evolving AMI\n\u2022 Use fixed electrode positions for comparison\n\n**Consider bedside echo:** RWMA present in 93% of AMI patients (but also in 43% without AMI \u2014 sensitive but not specific) [13]\n\n**STEMI is an ECG diagnosis.** Do NOT wait for troponin to make treatment decisions. [4]\n\nSee [STEMI Mimics](#/info/stemi-mimics)',
        citation: [4, 12, 13],
        options: [
            {
                label: 'Repeat ECG shows STEMI criteria',
                next: 'stemi-confirmed',
                urgency: 'critical',
            },
            {
                label: 'ECG unchanged, ongoing symptoms',
                description: 'Admit for observation, consult cardiology',
                next: 'stemi-nstemi-workup',
            },
            {
                label: 'Alternative diagnosis identified',
                description: 'Pericarditis, hyperkalemia, etc.',
                next: 'stemi-alt-dx',
            },
        ],
    },
    {
        id: 'stemi-nstemi-workup',
        type: 'result',
        module: 2,
        title: 'NSTEMI / ACS Workup',
        body: 'STEMI criteria not met but ACS remains on differential.\n\n\u2022 Serial troponins q3\u20136h\n\u2022 Continuous cardiac monitoring\n\u2022 [Aspirin](#/drug/aspirin/acs) 162\u2013325 mg if not already given\n\u2022 Consider anticoagulation per NSTEMI protocol\n\u2022 Consult cardiology for risk stratification\n\nSee [NSTEMI Management](#/tree/nstemi) for full NSTEMI decision pathway.',
        recommendation: 'Manage as NSTEMI/ACS. Serial troponins, cardiology consult, risk stratification. See NSTEMI consult for detailed management.',
        confidence: 'recommended',
        citation: [4, 5],
    },
    {
        id: 'stemi-alt-dx',
        type: 'result',
        module: 2,
        title: 'Alternative Diagnosis',
        body: 'ST elevation identified as non-ACS etiology.\n\n**Common STEMI mimics:**\n\u2022 Pericarditis \u2014 diffuse concave STE, PR depression, no reciprocal changes\n\u2022 Hyperkalemia \u2014 peaked T waves, wide QRS, pseudo-STEMI pattern\n\u2022 Left ventricular hypertrophy \u2014 strain pattern\n\u2022 Benign early repolarization\n\u2022 Takotsubo cardiomyopathy \u2014 apical ballooning\n\u2022 Brugada syndrome\n\nSee [Pericarditis vs STEMI](#/info/stemi-pericarditis-diff)\n\nManage underlying condition appropriately.',
        recommendation: 'Treat underlying condition. Maintain index of suspicion for ACS if clinical picture evolves.',
        confidence: 'recommended',
        citation: [5, 14],
    },
    // =====================================================================
    // MODULE 3: INITIAL THERAPIES
    // =====================================================================
    {
        id: 'stemi-initial-tx',
        type: 'info',
        module: 3,
        title: 'Initial Medical Therapy',
        body: 'Start simultaneously with cath lab activation:\n\n**Antiplatelet:**\n\u2022 [Aspirin](#/drug/aspirin/acs) 162\u2013325 mg chewed (if not given prehospital)\n\u2022 P2Y12 inhibitor loading \u2014 select agent next\n\n**Pain / Symptom management:**\n\u2022 [Nitroglycerin](#/drug/nitroglycerin/acs) 0.4 mg SL q5min \u00D7 3 (avoid if SBP <90, suspected RV infarct, or PDE-5 inhibitor use within 24\u201348h)\n\u2022 O\u2082 only if SpO\u2082 <90% \u2014 routine O\u2082 may INCREASE infarct size [15]\n\u2022 [Morphine](#/drug/morphine/acs) 4\u20138 mg IV only if refractory pain \u2014 may delay P2Y12 absorption and increase mortality [16][17]\n\n**Beta blocker:**\n\u2022 [Metoprolol](#/drug/metoprolol/acs) within 24h if no contraindications (do not need to start in ED)',
        citation: [5, 15, 16, 17],
        treatment: {
            firstLine: {
                drug: 'Aspirin',
                dose: '162-325 mg',
                route: 'PO',
                frequency: 'Once (chewed)',
                duration: 'Single dose, then 81 mg daily',
                notes: 'Give immediately if not given prehospital',
            },
            alternative: {
                drug: 'Nitroglycerin',
                dose: '0.4 mg',
                route: 'Sublingual',
                frequency: 'q5min x 3 doses',
                duration: 'PRN chest pain',
                notes: 'Avoid if SBP <90, RV infarct, or PDE-5 inhibitor use within 24-48h',
            },
            monitoring: 'Continuous cardiac monitoring. BP before each nitroglycerin dose. Avoid morphine unless refractory pain.',
        },
        next: 'stemi-p2y12',
    },
    {
        id: 'stemi-p2y12',
        type: 'question',
        module: 3,
        title: 'P2Y12 Inhibitor Selection',
        body: 'Load with ONE P2Y12 inhibitor before or at time of PCI. Discuss with interventional cardiologist.\n\n**[Prasugrel](#/drug/prasugrel/acs)** 60 mg loading \u2192 10 mg daily\n\u2022 More potent platelet inhibition, lower 30-day and 1-year mortality vs clopidogrel/ticagrelor [18]\n\u2022 **CONTRAINDICATED:** prior stroke/TIA\n\u2022 **No benefit:** age >75y, weight <60 kg\n\n**[Ticagrelor](#/drug/ticagrelor/acs)** 180 mg loading \u2192 90 mg BID\n\u2022 Fewer stent thromboses and lower death rate vs clopidogrel [19]\n\u2022 Higher stroke/ICH risk vs clopidogrel\n\n**[Clopidogrel](#/drug/clopidogrel/acs)** 600 mg loading \u2192 75 mg daily\n\u2022 Variable metabolism (CYP2C19)\n\u2022 Use if CI to prasugrel AND ticagrelor, or high bleeding risk\n\nAll three are Class I, Level B recommendations. [5]',
        citation: [5, 18, 19, 20],
        treatment: {
            firstLine: {
                drug: 'Prasugrel',
                dose: '60 mg loading, then 10 mg',
                route: 'PO',
                frequency: 'Once for loading, then daily',
                duration: '12 months DAPT',
                notes: 'CONTRAINDICATED if prior stroke/TIA. No benefit if age >75y or weight <60 kg.',
            },
            alternative: {
                drug: 'Ticagrelor',
                dose: '180 mg loading, then 90 mg',
                route: 'PO',
                frequency: 'Once for loading, then BID',
                duration: '12 months DAPT',
                notes: 'Higher stroke/ICH risk vs clopidogrel. Fewer stent thromboses than clopidogrel.',
            },
            pcnAllergy: {
                drug: 'Clopidogrel',
                dose: '600 mg loading, then 75 mg',
                route: 'PO',
                frequency: 'Once for loading, then daily',
                duration: '12 months DAPT',
                notes: 'Variable metabolism (CYP2C19). Use if CI to prasugrel AND ticagrelor, or high bleeding risk.',
            },
            monitoring: 'Monitor for bleeding complications. DAPT for 12 months post-PCI. Discuss with interventional cardiologist.',
        },
        options: [
            {
                label: 'Prasugrel (preferred if no CI)',
                next: 'stemi-anticoag',
            },
            {
                label: 'Ticagrelor',
                next: 'stemi-anticoag',
            },
            {
                label: 'Clopidogrel (CI to others or high bleed risk)',
                next: 'stemi-anticoag',
            },
        ],
    },
    {
        id: 'stemi-anticoag',
        type: 'info',
        module: 3,
        title: 'Anticoagulation',
        body: '**For primary PCI:**\n\u2022 [UFH](#/drug/ufh/stemi) 70\u2013100 units/kg IV bolus (without GP IIb/IIIa) OR 50\u201370 units/kg (with GP IIb/IIIa)\n\u2022 [Bivalirudin](#/drug/bivalirudin/acs) 0.75 mg/kg IV bolus then 1.75 mg/kg/hr \u2014 preferred if high bleeding risk\n\n**For fibrinolytic therapy** (minimum 48 hours):\n\u2022 [UFH](#/drug/ufh/stemi) weight-based bolus + infusion\n\u2022 [Enoxaparin](#/drug/enoxaparin/stemi) \u2014 alternative (age-adjusted dosing)\n\u2022 [Fondaparinux](#/drug/fondaparinux/stemi) 2.5 mg SC daily \u2014 alternative\n\nSee [Anticoagulation Details](#/info/stemi-anticoag-detail)',
        citation: [5, 8],
        treatment: {
            firstLine: {
                drug: 'Unfractionated Heparin (UFH)',
                dose: '70-100 units/kg IV bolus (without GP IIb/IIIa) OR 50-70 units/kg (with GP IIb/IIIa)',
                route: 'IV',
                frequency: 'Bolus for PCI',
                duration: 'During PCI procedure',
                notes: 'For primary PCI. ACT-guided dosing in cath lab.',
            },
            alternative: {
                drug: 'Bivalirudin',
                dose: '0.75 mg/kg IV bolus, then 1.75 mg/kg/hr',
                route: 'IV',
                frequency: 'Bolus then infusion',
                duration: 'During and post-PCI',
                notes: 'Preferred if high bleeding risk. Direct thrombin inhibitor.',
            },
            monitoring: 'ACT during PCI. Monitor for bleeding. For fibrinolysis: anticoagulation minimum 48 hours.',
        },
        next: 'stemi-reperfusion-q',
    },
    // =====================================================================
    // MODULE 4: REPERFUSION STRATEGY
    // =====================================================================
    {
        id: 'stemi-reperfusion-q',
        type: 'question',
        module: 4,
        title: 'Reperfusion Strategy',
        body: 'Primary PCI is preferred over fibrinolysis.\n\nSee [Reperfusion Decision Pathway](#/info/stemi-reperfusion-pathway)\n\n**Time targets:**\n\u2022 FMC-to-device \u226490 min at PCI-capable facility\n\u2022 FMC-to-device \u2264120 min for transfer patients\n\u2022 DIDO (door-in\u2013door-out) \u226430 min at referring hospital\n\u2022 Door-to-needle \u226430 min for fibrinolytics\n\nIs PCI available within target timeframes?',
        citation: [5, 8, 21],
        options: [
            {
                label: 'PCI available \u2014 FMC-to-device \u226490 min',
                description: 'At PCI-capable facility',
                next: 'stemi-pci',
            },
            {
                label: 'Transfer can achieve \u2264120 min',
                next: 'stemi-transfer',
            },
            {
                label: 'PCI NOT available within 120 min',
                description: 'Consider fibrinolytics',
                next: 'stemi-lytics',
                urgency: 'urgent',
            },
            {
                label: 'Cardiogenic shock or severe HF',
                description: 'Transfer immediately regardless of time',
                next: 'stemi-shock',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'stemi-pci',
        type: 'info',
        module: 4,
        title: 'Primary PCI',
        body: '**Goal: First medical contact-to-device \u226490 minutes.**\n\n\u2022 Indicated for symptom onset <12 hours\n\u2022 Between 12\u201324 hours: reasonable if clinical or ECG evidence of ongoing ischemia\n\u2022 >24 hours, asymptomatic, stable: PCI NOT recommended (no benefit) [22]\n\n**Advantages over fibrinolysis:**\n\u2022 Higher infarct artery patency rates\n\u2022 Lower rates of recurrent ischemia, reinfarction, ICH, and death\n\n**Potential complications:** access site problems, contrast reactions, reperfusion arrhythmias, stent thrombosis.\n\n**Reperfusion arrhythmias** are common after successful PCI \u2014 assess next.',
        citation: [5, 22],
        next: 'stemi-complications',
    },
    {
        id: 'stemi-transfer',
        type: 'info',
        module: 4,
        title: 'Transfer for PCI',
        body: '**Goal: Total FMC-to-device \u2264120 minutes. DIDO \u226430 minutes.**\n\n\u2022 Consider helicopter EMS to reduce transport time\n\u2022 Continue anticoagulation during transport\n\u2022 Prehospital cath lab activation reduces FMC-to-balloon time\n\u2022 Bypass non-PCI facilities if transport time <30 min to PCI center [5]\n\n**If transfer cannot achieve 120 min:** Switch to fibrinolytic strategy.\n\n**Cardiogenic shock or severe HF:** Transfer immediately regardless of time delay from MI onset. [5]',
        citation: [5, 21],
        next: 'stemi-complications',
    },
    {
        id: 'stemi-lytics',
        type: 'question',
        module: 4,
        title: 'Fibrinolytic Therapy',
        body: '**Door-to-needle \u226430 minutes.** Fibrin-specific agents preferred.\n\nCheck [Fibrinolytic Contraindications](#/info/stemi-lytic-contraindications)\n\n**Agents** (see [Fibrinolytic Dosing](#/info/stemi-lytic-agents)):\n\u2022 [Tenecteplase](#/drug/tenecteplase/stemi) \u2014 single weight-based IV bolus (preferred)\n\u2022 [Alteplase](#/drug/alteplase/stemi) \u2014 accelerated 90-min regimen\n\u2022 [Reteplase](#/drug/reteplase/stemi) \u2014 10 + 10 unit double bolus\n\n**Age >75 years:** Consider half-dose tenecteplase (reduced ICH risk) [23]\n\n**After fibrinolysis:** Transfer to PCI center. Angiography within 3\u201324 hours (NOT within first 2\u20133 hours). [5]\n\nAny contraindications to fibrinolysis?',
        citation: [5, 8, 23],
        treatment: {
            firstLine: {
                drug: 'Tenecteplase',
                dose: 'Weight-based: <60kg: 30mg | 60-69kg: 35mg | 70-79kg: 40mg | 80-89kg: 45mg | >=90kg: 50mg',
                route: 'IV bolus',
                frequency: 'Single dose',
                duration: 'One-time administration',
                notes: 'Preferred fibrinolytic. Consider half-dose if age >75 years (reduced ICH risk).',
            },
            alternative: {
                drug: 'Alteplase',
                dose: '15 mg IV bolus, then 0.75 mg/kg over 30 min (max 50 mg), then 0.5 mg/kg over 60 min (max 35 mg)',
                route: 'IV',
                frequency: 'Accelerated 90-min regimen',
                duration: 'Total 90 minutes',
                notes: 'Total dose not to exceed 100 mg.',
            },
            monitoring: 'Continuous cardiac monitoring. Monitor for reperfusion signs: pain resolution, >50% ST resolution within 60-90 min, reperfusion arrhythmias. Watch for bleeding complications.',
        },
        options: [
            {
                label: 'No contraindications \u2014 give fibrinolytic',
                next: 'stemi-post-lytics',
            },
            {
                label: 'Absolute contraindication',
                description: 'Must transfer for PCI regardless of time',
                next: 'stemi-transfer',
                urgency: 'critical',
            },
            {
                label: 'Relative contraindication',
                description: 'Weigh risks vs benefits, consider transfer',
                next: 'stemi-transfer',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'stemi-post-lytics',
        type: 'info',
        module: 4,
        title: 'Post-Fibrinolysis Management',
        body: '**After administering fibrinolytic:**\n\n**1. Anticoagulation** (minimum 48 hours):\n\u2022 [UFH](#/drug/ufh/stemi) weight-based bolus + infusion, OR\n\u2022 [Enoxaparin](#/drug/enoxaparin/stemi) (age-adjusted), OR\n\u2022 [Fondaparinux](#/drug/fondaparinux/stemi) 2.5 mg SC daily\n\n**2. Transfer** to PCI-capable center for angiography:\n\u2022 Within 3\u201324 hours (NOT within first 2\u20133 hours after lytics)\n\u2022 Rescue PCI if fibrinolysis fails (persistent symptoms/STE)\n\n**3. Monitor for reperfusion signs:**\n\u2022 Pain resolution\n\u2022 \u226550% ST-segment resolution within 60\u201390 min\n\u2022 Reperfusion arrhythmias (PVCs, AIVR)\n\n**AIVR** (accelerated idioventricular rhythm) \u2014 well-tolerated, self-limited. Do NOT treat with antidysrhythmics (may cause hemodynamic collapse). [24]',
        citation: [5, 24],
        treatment: {
            firstLine: {
                drug: 'Enoxaparin',
                dose: '<75y: 30 mg IV bolus + 1 mg/kg SC q12h | >=75y: NO bolus, 0.75 mg/kg SC q12h | CrCl <30: 1 mg/kg SC q24h',
                route: 'IV bolus then SC',
                frequency: 'q12h (age-adjusted)',
                duration: 'Minimum 48 hours or until PCI',
                notes: 'Age-adjusted dosing critical. Alternative to UFH post-fibrinolysis.',
            },
            alternative: {
                drug: 'UFH',
                dose: '60 units/kg IV bolus (max 4000 units), then 12 units/kg/hr (max 1000 units/hr)',
                route: 'IV',
                frequency: 'Continuous infusion',
                duration: 'Minimum 48 hours or until PCI',
                notes: 'Target aPTT 1.5-2x control (50-70 seconds). Check aPTT at 3, 6, 12, 24h.',
            },
            monitoring: 'Anticoagulation minimum 48h. Transfer to PCI center within 3-24h (NOT within first 2-3h). Monitor reperfusion signs: pain resolution, >50% ST resolution, reperfusion arrhythmias.',
        },
        next: 'stemi-complications',
    },
    // =====================================================================
    // MODULE 5: SPECIAL POPULATIONS & COMPLICATIONS
    // =====================================================================
    {
        id: 'stemi-complications',
        type: 'question',
        module: 5,
        title: 'Complications Assessment',
        body: 'Assess for STEMI complications:\n\u2022 **Cardiogenic shock** (5\u201310% of AMI) \u2014 hypotension, cool skin, AMS\n\u2022 **RV involvement** (33\u201350% of inferior STEMIs) \u2014 hypotension with clear lungs\n\u2022 **Reperfusion arrhythmias** \u2014 PVCs, VT, AIVR, AF, VF\n\u2022 **AV block** (7% with thrombolytics) [25]\n\u2022 **Mechanical complications** \u2014 VSD, papillary muscle rupture, free wall rupture',
        citation: [5, 25, 26],
        options: [
            {
                label: 'Cardiogenic shock',
                next: 'stemi-shock',
                urgency: 'critical',
            },
            {
                label: 'Suspected RV involvement',
                description: 'Inferior STEMI with hypotension',
                next: 'stemi-rv',
                urgency: 'urgent',
            },
            {
                label: 'Reperfusion arrhythmia',
                next: 'stemi-arrhythmia',
            },
            {
                label: 'No complications',
                next: 'stemi-special',
            },
        ],
    },
    {
        id: 'stemi-shock',
        type: 'result',
        module: 5,
        title: 'Cardiogenic Shock',
        body: 'Cardiogenic shock complicates 5\u201310% of AMI. [26]\n\n**Immediate management:**\n\u2022 **PCI regardless of time from MI onset** (Class I)\n\u2022 Volume resuscitation if no pulmonary edema\n\u2022 Vasopressors to maintain coronary perfusion (norepinephrine preferred)\n\u2022 Consider mechanical circulatory support (IABP, Impella, ECMO)\n\n**Do NOT withhold vasopressors** for fear of worsening ischemia \u2014 the goal is coronary perfusion until revascularization.\n\nIf at non-PCI center: **transfer immediately regardless of time delay.**',
        recommendation: 'Emergent PCI regardless of timing. Vasopressors for perfusion. Transfer immediately if not at PCI center. Consider mechanical support.',
        confidence: 'definitive',
        citation: [5, 26],
    },
    {
        id: 'stemi-rv',
        type: 'info',
        module: 5,
        title: 'Right Ventricular Involvement',
        body: '33\u201350% of inferior STEMIs involve the right ventricle. [27]\n\n**Diagnosis \u2014 get right-sided leads:**\n\u2022 STE \u22651 mm in V4R is diagnostic\n\u2022 Place V1R-V6R as mirror image of standard precordial leads\n\n**Management \u2014 volume-dependent:**\n\u2022 **AVOID nitrates** (reduce preload \u2192 hemodynamic collapse)\n\u2022 **AVOID diuretics**\n\u2022 Volume resuscitation with NS boluses (250\u2013500 mL, reassess)\n\u2022 If hypotensive despite fluids: dobutamine or milrinone for RV support\n\u2022 Reperfusion via PCI remains the priority',
        citation: [5, 27],
        images: [{ src: 'images/stemi/right-sided-leads.png', alt: 'Right-sided ECG lead placement', caption: 'Right-sided precordial leads (V1R\u2013V6R): mirror standard placement to right chest' }],
        next: 'stemi-special',
    },
    {
        id: 'stemi-arrhythmia',
        type: 'info',
        module: 5,
        title: 'Reperfusion Arrhythmias',
        body: 'Most common reperfusion arrhythmias: PVCs, VT, AIVR, AF, VF. [24]\n\n**AIVR (Accelerated Idioventricular Rhythm):**\n\u2022 Regular wide-complex rhythm, rate 50\u2013110 bpm\n\u2022 Usually a SIGN OF SUCCESSFUL REPERFUSION\n\u2022 Well-tolerated and self-limited\n\u2022 **Do NOT treat with antidysrhythmics** \u2014 may cause hemodynamic collapse\n\u2022 Resolves when sinus rate exceeds ventricular focus\n\n**VT/VF:** Defibrillate per ACLS protocol\n\n**AV block:** Incidence 7% with thrombolytic therapy. Manage bradycardia (atropine, transcutaneous pacing). [25]\n\n**Atrial fibrillation:** Rate control, see [A-Fib RVR](#/tree/afib-rvr) consult if needed.',
        citation: [24, 25],
        next: 'stemi-special',
    },
    {
        id: 'stemi-special',
        type: 'info',
        module: 5,
        title: 'Special Populations',
        body: '**Women:**\n\u2022 Less likely to present with central chest pain [28]\n\u2022 Same risk factors and treatment as men\n\u2022 CV mortality has remained higher in women since 1980s\n\n**Elderly (>75 years):**\n\u2022 More atypical presentations (dyspnea, syncope, nausea)\n\u2022 Higher complication rate, more contraindications to reperfusion\n\u2022 Age alone is NOT a reason to withhold reperfusion [29]\n\u2022 Consider half-dose tenecteplase if fibrinolysis indicated\n\n**Cocaine-associated STEMI:**\n\u2022 PCI strongly preferred over fibrinolysis (higher ICH risk with lytics)\n\u2022 Benzodiazepines for chest pain, HR, and BP control\n\u2022 **Avoid pure beta-blockers** (unopposed alpha stimulation); consider [Labetalol](#/drug/labetalol/acs) if beta-blockade needed [30]\n\n**Post-cardiac arrest with STEMI:**\n\u2022 Early cath for sustained ROSC with STEMI or new LBBB\n\u2022 2\u20133\u00D7 higher favorable survival with early cath lab access [31]\n\u2022 Consider ECMO for refractory VF/pVT',
        citation: [28, 29, 30, 31],
        next: 'stemi-dispo',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'stemi-dispo',
        type: 'result',
        module: 6,
        title: 'Disposition \u2014 Admit ICU/CCU',
        body: '**All STEMI patients are admitted** after reperfusion (PCI or fibrinolysis).\n\n**In-hospital management:**\n\u2022 Continuous cardiac monitoring for reperfusion arrhythmias\n\u2022 [Metoprolol](#/drug/metoprolol/acs) within 24h if no CI (HR, BP permitting)\n\u2022 [Atorvastatin](#/drug/atorvastatin/acs) 80 mg (start immediately)\n\u2022 ACE inhibitor/ARB within 24h if EF \u226440%, HTN, or diabetes\n\u2022 DAPT: [Aspirin](#/drug/aspirin/acs) 81 mg + P2Y12 inhibitor \u00D7 12 months\n\n**Goals of care discussions** should be held for elderly patients and those with severe comorbidities. DNR/POLST/advance directives do NOT necessarily preclude intervention. [29]\n\n**Cardiac rehabilitation** referral before discharge (25% reduction in CV mortality). [5]',
        recommendation: 'Admit ICU/CCU. Start GDMT: beta-blocker, high-intensity statin, ACEi/ARB. Continue DAPT \u00D712 months. Cardiac rehab referral.',
        treatment: {
            firstLine: {
                drug: 'Atorvastatin',
                dose: '80 mg',
                route: 'PO',
                frequency: 'Daily',
                duration: 'Indefinite',
                notes: 'High-intensity statin. Start immediately. No need to wait for lipid panel.',
            },
            alternative: {
                drug: 'Metoprolol succinate',
                dose: '25-50 mg',
                route: 'PO',
                frequency: 'Daily',
                duration: 'Indefinite',
                notes: 'Start within 24h if HR and BP permit. Contraindications: HR <60, SBP <100, decompensated HF, AV block, severe reactive airway disease.',
            },
            monitoring: 'Continuous cardiac monitoring. Echo for EF assessment. DAPT (aspirin 81 mg + P2Y12 inhibitor) x 12 months. ACEi/ARB if EF <=40%, HTN, or DM. Cardiac rehab referral before discharge.',
        },
        confidence: 'definitive',
        citation: [5, 29],
    },
];
export const STEMI_NODE_COUNT = STEMI_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const STEMI_MODULE_LABELS = [
    'Recognition & ECG',
    'ECG Patterns',
    'Initial Therapies',
    'Reperfusion Strategy',
    'Complications & Special',
    'Disposition',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const STEMI_CRITICAL_ACTIONS = [
    { text: '12-lead ECG within 10 minutes of first medical contact - STEMI is an ECG diagnosis', nodeId: 'stemi-start' },
    { text: 'Activate cath lab immediately for confirmed STEMI - goal door-to-device <90 min', nodeId: 'stemi-confirmed' },
    { text: 'Aspirin 162-325 mg chewed + P2Y12 inhibitor loading before/during PCI', nodeId: 'stemi-initial-tx' },
    { text: 'Check posterior leads V7-V9 if V1-V3 show ST depression with upright T waves', nodeId: 'stemi-posterior' },
    { text: 'Apply Sgarbossa criteria for STEMI diagnosis in LBBB or paced rhythm', nodeId: 'stemi-lbbb' },
    { text: 'Give beta-lactam FIRST when also giving vancomycin (improved survival)', nodeId: 'stemi-p2y12' },
    { text: 'Do NOT give morphine unless refractory pain - delays P2Y12 absorption, increases mortality', nodeId: 'stemi-initial-tx' },
    { text: 'Fibrinolytics within 30 min if PCI not available within 120 min FMC-to-device', nodeId: 'stemi-lytics' },
    { text: 'Check right-sided leads for all inferior STEMIs - avoid nitrates if RV involvement', nodeId: 'stemi-rv' },
    { text: 'AIVR post-reperfusion is benign - do NOT treat with antidysrhythmics (may cause collapse)', nodeId: 'stemi-arrhythmia' },
];
export const STEMI_CITATIONS = [
    { num: 1, text: 'Gokhroo RK, et al. Sweating: a Specific Predictor of ST-Segment Elevation Myocardial Infarction Among the Symptoms of ACS (SWIMI Study). Clin Cardiol. 2016;39(2):90-95.' },
    { num: 2, text: 'Fanaroff AC, et al. Does This Patient with Chest Pain Have Acute Coronary Syndrome? JAMA. 2015;314(18):1955-1965.' },
    { num: 3, text: 'Brieger D, et al. Acute Coronary Syndromes Without Chest Pain, an Underdiagnosed and Undertreated High-Risk Group. Chest. 2004;126(2):461-469.' },
    { num: 4, text: 'Thygesen K, et al. Fourth Universal Definition of Myocardial Infarction (2018). Eur Heart J. 2019;40(3):237-269.' },
    { num: 5, text: 'O\u2019Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction. Circulation. 2013;127(4):e362-e425.' },
    { num: 6, text: 'Hassen GW, et al. Lead aVL on Electrocardiogram: Emerging as Important Lead in Early Diagnosis of Myocardial Infarction? Am J Emerg Med. 2014;32(7):785-788.' },
    { num: 7, text: 'Wong C-K, White HD. Patients with Circumflex Occlusions Miss Out on Reperfusion. Curr Opin Cardiol. 2012;27(4):327-330.' },
    { num: 8, text: 'Ibanez B, et al. 2017 ESC Guidelines for the Management of Acute Myocardial Infarction in Patients Presenting with ST-Segment Elevation. Eur Heart J. 2018;39(2):119-177.' },
    { num: 9, text: 'Smith SW, et al. Diagnosis of STEMI in the Presence of Left Bundle Branch Block with the ST-Elevation to S-Wave Ratio in a Modified Sgarbossa Rule. Ann Emerg Med. 2012;60(6):766-776.' },
    { num: 10, text: 'Tabas JA, et al. Electrocardiographic Criteria for Detecting Acute MI in Patients with Left Bundle Branch Block: A Meta-Analysis. Ann Emerg Med. 2008;52(4):329-336.' },
    { num: 11, text: 'Harhash AA, et al. aVR ST Segment Elevation: Acute STEMI or Not? Incidence of an Acute Coronary Occlusion. Am J Med. 2019;132(5):622-630.' },
    { num: 12, text: 'Tanguay A, et al. Detection of STEMI Using Prehospital Serial 12-Lead Electrocardiograms. Prehosp Emerg Care. 2018;22(4):419-426.' },
    { num: 13, text: 'Sabia P, et al. Value of Regional Wall Motion Abnormality in the Emergency Room Diagnosis of Acute Myocardial Infarction. Circulation. 1991;84(3 Suppl):I85-I92.' },
    { num: 14, text: 'Lange RA, Hillis LD. Acute Pericarditis. N Engl J Med. 2004;351(21):2195-2202.' },
    { num: 15, text: 'Hofmann R, et al. Oxygen Therapy in Suspected Acute Myocardial Infarction. N Engl J Med. 2017;377(13):1240-1249.' },
    { num: 16, text: 'Meine TJ, et al. Association of Intravenous Morphine Use and Outcomes in Acute Coronary Syndromes: Results from the CRUSADE Quality Improvement Initiative. Am Heart J. 2005;149(6):1043-1049.' },
    { num: 17, text: 'Kubica J, et al. Morphine Delays and Attenuates Ticagrelor Exposure and Action in Patients with Myocardial Infarction (IMPRESSION Trial). Eur Heart J. 2016;37(3):245-252.' },
    { num: 18, text: 'Olier I, et al. Association of Different Antiplatelet Therapies with Mortality After Primary PCI. Heart. 2018;104(20):1683-1690.' },
    { num: 19, text: 'Wallentin L, et al. Ticagrelor versus Clopidogrel in Patients with Acute Coronary Syndromes (PLATO). N Engl J Med. 2009;361(11):1045-1057.' },
    { num: 20, text: 'Koski R, Kennedy B. Comparative Review of Oral P2Y(12) Inhibitors. P T. 2018;43(6):352-357.' },
    { num: 21, text: 'American College of Emergency Physicians Clinical Policies Subcommittee. Clinical Policy: Emergency Department Management of Patients Needing Reperfusion Therapy for Acute STEMI. Ann Emerg Med. 2017;70(5):724-739.' },
    { num: 22, text: 'Armstrong PW, et al. Fibrinolysis or Primary PCI in ST-Segment Elevation Myocardial Infarction (STREAM). N Engl J Med. 2013;368(15):1379-1387.' },
    { num: 23, text: 'Rao SV, et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients with Acute Coronary Syndromes. J Am Coll Cardiol. 2025;85(22):2135-2237.' },
    { num: 24, text: 'Gildea TH, Levis JT. ECG Diagnosis: Accelerated Idioventricular Rhythm. Perm J. 2018;22:17-173.' },
    { num: 25, text: 'Meine TJ, et al. Incidence, Predictors, and Outcomes of High-Degree AV Block Complicating Acute MI Treated with Thrombolytic Therapy. Am Heart J. 2005;149(4):670-674.' },
    { num: 26, text: 'Vahdatpour C, et al. Cardiogenic Shock. J Am Heart Assoc. 2019;8(8):e011991.' },
    { num: 27, text: 'Kinch JW, Ryan TJ. Right Ventricular Infarction. N Engl J Med. 1994;330(17):1211-1217.' },
    { num: 28, text: 'Mehta LS, et al. Acute Myocardial Infarction in Women: AHA Scientific Statement. Circulation. 2016;133(9):916-947.' },
    { num: 29, text: 'Engberding N, Wenger NK. Acute Coronary Syndromes in the Elderly. F1000Research. 2017;6:1791.' },
    { num: 30, text: 'McCord J, et al. Management of Cocaine-Associated Chest Pain and Myocardial Infarction: AHA Scientific Statement. Circulation. 2008;117(14):1897-1907.' },
    { num: 31, text: 'Yannopoulos D, et al. The Evolving Role of the Cardiac Catheterization Laboratory in the Management of Patients with Out-of-Hospital Cardiac Arrest: AHA Scientific Statement. Circulation. 2019;139(12).' },
];
// -------------------------------------------------------------------
// Clinical Notes (for reference table)
// -------------------------------------------------------------------
export const STEMI_CLINICAL_NOTES = [
    'Chest pain + diaphoresis has the highest likelihood ratio and positive predictive value for STEMI among ACS symptoms.',
    'STEMI is an ECG diagnosis \u2014 do NOT wait for troponin results. A negative troponin does not rule out STEMI.',
    '8% of STEMIs are identified only on repeat ECG. Obtain serial ECGs q15-30 min if initial ECG is nondiagnostic but clinical suspicion remains high.',
    'Posterior STEMI (LCx occlusion) accounts for ~3% of acute MIs and is frequently missed. Obtain posterior leads V7-V9 when V1-V3 show ST depression with upright T waves.',
    'In LBBB: Sgarbossa score \u22653 has 98% specificity for STEMI. Modified Sgarbossa (ST/S ratio < -0.25) outperforms the original 3rd criterion.',
    'Routine oxygen in non-hypoxic STEMI patients provides no benefit and may increase infarct size. Administer O2 only if SpO2 <90%.',
    'Morphine delays absorption of P2Y12 inhibitors (ticagrelor, clopidogrel) and was associated with higher mortality in the CRUSADE trial. Use only for refractory pain.',
    'AIVR (accelerated idioventricular rhythm) after reperfusion is benign and self-limited. Treating with antidysrhythmics may cause hemodynamic collapse.',
    '33-50% of inferior STEMIs involve the right ventricle. Get right-sided leads. Avoid nitrates and diuretics \u2014 these patients are volume-dependent.',
    'Age alone is NOT a reason to withhold reperfusion therapy. Consider half-dose tenecteplase for patients >75 years to reduce ICH risk.',
    'Cocaine-associated STEMI: PCI preferred over fibrinolysis. Avoid pure beta-blockers (unopposed alpha). Use benzodiazepines for symptom control.',
    'Pericarditis mimics STEMI but shows diffuse concave STE without reciprocal changes, PR depression, and chest pain worsened by supine position.',
];
