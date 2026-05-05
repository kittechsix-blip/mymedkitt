// MedKitt — Post-Cardiac Arrest Care
// Immediate Post-ROSC → Hemodynamic Targets → Temperature Management → Neuroprognostication → ICU Targets
// AHA 2023, TTM2 Trial, ERC 2021. 5 modules, 16 nodes.
export const POST_ROSC_CRITICAL_ACTIONS = [
    { text: '12-lead ECG immediately — STEMI → emergent PCI, do not delay', nodeId: 'rosc-stemi' },
    { text: 'MAP ≥65 mmHg — start norepinephrine if hypotensive', nodeId: 'rosc-hemo' },
    { text: 'SpO₂ 94-98% — avoid hyperoxia; PaCO₂ 35-45 — avoid hypocapnia', nodeId: 'rosc-hemo' },
    { text: 'Prevent fever >37.8°C × 72h for comatose patients', nodeId: 'rosc-ttm-coma' },
    { text: 'Continuous EEG monitoring — 20-30% have post-arrest seizures', nodeId: 'rosc-seizure' },
    { text: 'Do NOT prognosticate <72h post-rewarming', nodeId: 'rosc-neuro' },
];
export const POST_ROSC_NODES = [
    // =====================================================================
    // MODULE 1: IMMEDIATE POST-ROSC (First 10 min)
    // =====================================================================
    {
        id: 'rosc-start',
        type: 'info',
        module: 1,
        title: 'ROSC Confirmed — Immediate Priorities',
        body: '[Post-ROSC Steps Summary](#/info/rosc-steps-summary)\n\nROSC confirmed. Immediate priorities:\n\n**Airway & Ventilation:**\n• Secure airway if not already — intubate if GCS ≤8\n• Waveform capnography to confirm ETT placement\n• Target ETCO₂ 35-45 mmHg — guides ventilation\n\n**Immediate Workup:**\n• **12-lead ECG** — STEMI identification is the #1 priority\n• Avoid hypoxia (SpO₂ <94%) and hypotension (SBP <90)\n• Arterial line for continuous BP monitoring\n• Labs: ABG, lactate, troponin, BMP, CBC, coags\n• Portable CXR (ETT position, pulmonary edema)',
        citation: [1, 2, 5],
        next: 'rosc-stemi',
        summary: 'Secure airway, 12-lead ECG immediately, target ETCO2 35-45, arterial line, labs/CXR',
        safetyLevel: 'critical',
    },
    {
        id: 'rosc-stemi',
        type: 'question',
        module: 1,
        title: 'STEMI on 12-Lead ECG?',
        body: 'STEMI or STEMI-equivalent on 12-lead ECG?',
        citation: [7, 14],
        options: [
            {
                label: 'Yes — STEMI identified',
                description: 'ST elevation or STEMI-equivalent pattern',
                next: 'rosc-cath',
                urgency: 'critical',
            },
            {
                label: 'No STEMI',
                description: 'No ST elevation, no acute ischemic changes',
                next: 'rosc-no-stemi',
            },
            {
                label: 'ECG indeterminate / new LBBB',
                description: 'Cannot rule out acute coronary occlusion',
                next: 'rosc-angio-consider',
                urgency: 'urgent',
            },
        ],
        summary: 'STEMI identification is #1 priority post-ROSC — emergent PCI if found, do not delay',
    },
    {
        id: 'rosc-cath',
        type: 'info',
        module: 1,
        title: 'STEMI + ROSC → Emergent PCI',
        body: '**STEMI + ROSC → emergent PCI.** Do not delay for CT head or other workup.\n\n• Activate cath lab immediately\n• TTM can be initiated in cath lab\n• Transfer to PCI-capable center if not available\n• Dual antiplatelet therapy per ACS protocol\n• Heparin bolus per cath lab protocol\n\n[STEMI Management](#/tree/stemi)',
        citation: [7, 13],
        next: 'rosc-hemo',
        summary: 'STEMI + ROSC = emergent PCI — do not delay for CT head, TTM can start in cath lab',
        safetyLevel: 'critical',
    },
    {
        id: 'rosc-no-stemi',
        type: 'info',
        module: 1,
        title: 'No STEMI — Stabilize First',
        body: 'No STEMI: stabilize hemodynamics first.\n\n**Consider coronary angiography if:**\n• Witnessed arrest with shockable rhythm\n• High suspicion for cardiac cause\n• Hemodynamic instability suggesting cardiogenic shock\n\n**COACT Trial (2019):** Immediate angiography in OHCA without STEMI did NOT improve survival vs delayed/selective strategy.\n\nTiming is less urgent — can wait for clinical stabilization.',
        citation: [14, 7],
        next: 'rosc-hemo',
        summary: 'COACT trial: no STEMI = no benefit from immediate angiography — stabilize hemodynamics first',
        skippable: true,
    },
    {
        id: 'rosc-angio-consider',
        type: 'info',
        module: 1,
        title: 'Indeterminate ECG — Cardiology Consult',
        body: 'Indeterminate ECG or new LBBB: cardiology consult.\n\n**Consider early angiography within 2h if:**\n• Shockable rhythm arrest\n• Hemodynamically unstable\n• High suspicion for ACS\n\n**Non-shockable rhythm with stable hemodynamics →** angiography can be deferred pending further workup and clinical trajectory.',
        citation: [7, 13, 14],
        next: 'rosc-hemo',
        summary: 'Indeterminate ECG or new LBBB — cardiology consult, early angiography if shockable rhythm',
    },
    // =====================================================================
    // MODULE 2: HEMODYNAMIC TARGETS
    // =====================================================================
    {
        id: 'rosc-hemo',
        type: 'info',
        module: 2,
        title: 'Hemodynamic Targets',
        body: '**Hemodynamic targets:**\n• **MAP ≥65 mmHg** (some guidelines ≥70) — avoid SBP <90\n• **SpO₂ 94-98%** — avoid hyperoxia (PaO₂ >300 mmHg is harmful, causes oxidative injury)\n• **PaCO₂ 35-45 mmHg** — avoid hypocapnia (causes cerebral vasoconstriction)\n• **ETCO₂ 35-45 mmHg** — correlates with PaCO₂, use to guide ventilator\n\n**Titrate FiO₂ DOWN** to target SpO₂ 94-98% once stable. Most post-arrest patients don\'t need 100% FiO₂ after ROSC.',
        citation: [1, 2, 5, 6],
        next: 'rosc-pressors',
        summary: 'MAP >=65, SpO2 94-98% (avoid hyperoxia), PaCO2 35-45 (avoid hypocapnia) — titrate FiO2 down',
        safetyLevel: 'critical',
    },
    {
        id: 'rosc-pressors',
        type: 'info',
        module: 2,
        title: 'Vasopressor Support',
        body: '**Vasopressor support:**\n• First-line: [Norepinephrine](#/drug/norepinephrine/post-rosc) 0.1-0.5 mcg/kg/min\n• Refractory: add [Vasopressin](#/drug/vasopressin/post-rosc) 0.04 units/min\n• If cardiac dysfunction: [Dobutamine](#/drug/dobutamine/cardiogenic shock) 2-20 mcg/kg/min or [Milrinone](#/drug/milrinone/cardiogenic shock)\n• Echo to assess LV function — post-arrest myocardial stunning is common and usually recovers in 24-72h\n\n**Avoid epinephrine infusion** post-ROSC if possible (tachyarrhythmias, myocardial oxygen demand).',
        citation: [1, 5, 6],
        next: 'rosc-ttm-check',
        summary: 'Norepinephrine first-line, add vasopressin if refractory, dobutamine for cardiac dysfunction',
    },
    // =====================================================================
    // MODULE 3: TARGETED TEMPERATURE MANAGEMENT
    // =====================================================================
    {
        id: 'rosc-ttm-check',
        type: 'question',
        module: 3,
        title: 'Patient Following Commands?',
        body: 'Is the patient following commands after ROSC?',
        citation: [2, 3],
        options: [
            {
                label: 'No — comatose (GCS motor ≤3)',
                description: 'Not following commands, no purposeful movement',
                next: 'rosc-ttm-coma',
                urgency: 'critical',
            },
            {
                label: 'Yes — following commands',
                description: 'Purposeful movement, following simple commands',
                next: 'rosc-ttm-awake',
            },
        ],
        summary: 'Comatose patients need aggressive fever prevention; following commands = good neuro sign',
    },
    {
        id: 'rosc-ttm-coma',
        type: 'info',
        module: 3,
        title: 'Comatose — Prevent Fever Aggressively',
        body: '**Comatose after ROSC: prevent fever aggressively.**\n\n**TTM2 Trial (2021):** 33°C vs 37.5°C showed no difference in mortality or neurological outcome.\n\n**Current approach (2023 AHA):**\n• Target **normothermia** — actively prevent fever >37.8°C × 72h (32-37.5°C for at least 36h per AHA 2025)\n• Cooling to 32-36°C is acceptable but NOT required\n• Surface cooling devices, IV cold saline bolus, or intravascular cooling\n\n**Anti-shivering protocol:**\n• [Magnesium Sulfate](#/drug/magnesium-sulfate/ttm) 4g IV (raises shivering threshold)\n• Sedation: propofol or midazolam infusion\n• [Meperidine](#/drug/meperidine/shivering) 25-50mg IV (centrally acting)\n• Neuromuscular blockade if refractory\n\n**Monitor:** Core temp continuously (esophageal or bladder probe). Avoid overcooling.',
        citation: [2, 3, 4, 10],
        next: 'rosc-neuro',
        summary: 'TTM2: no benefit of cooling to 33C — prevent fever >37.7C x72h, anti-shivering protocol required',
        safetyLevel: 'critical',
    },
    {
        id: 'rosc-ttm-awake',
        type: 'info',
        module: 3,
        title: 'Following Commands — Standard Care',
        body: 'Following commands = good neurological sign.\n\n**Standard care:**\n• Monitor temperature — actively treat any fever >37.7°C\n• No need for aggressive cooling\n• Continue hemodynamic optimization\n• Workup for arrest cause (echo, labs, serial ECGs)\n• Neurology consult if any concern for seizure activity',
        citation: [2, 6],
        next: 'rosc-neuro',
        summary: 'Awake post-ROSC — standard care, treat fever, echo for arrest cause, neuro consult if seizure concern',
        skippable: true,
    },
    // =====================================================================
    // MODULE 4: NEUROPROGNOSTICATION
    // =====================================================================
    {
        id: 'rosc-neuro',
        type: 'info',
        module: 4,
        title: 'Neuroprognostication — Wait 72h Minimum',
        body: '**⚠️ Do NOT prognosticate within 72h post-rewarming.**\n\nSedation, hypothermia, and neuromuscular blockade confound neurological exam. Premature withdrawal of care is the leading cause of preventable death in post-arrest patients.\n\n**Multimodal approach (after 72h rewarming):**\n• **Clinical exam:** absent corneal + pupillary reflexes at 72h = poor prognosis\n• **EEG:** burst suppression or status epilepticus\n• **SSEP:** bilaterally absent N20 cortical responses (most specific)\n• **CT/MRI:** diffuse anoxic injury pattern\n• **NSE (neuron-specific enolase):** >33 ng/mL at 48-72h suggests poor outcome\n\n**No single test is sufficient.** Multimodal concordance is required. Each test has false positive rate. Give minimum 72h before any withdrawal discussion.',
        citation: [6, 8, 9, 12],
        next: 'rosc-seizure',
        summary: 'Do NOT prognosticate within 72h post-rewarming — multimodal approach required, no single test sufficient',
        safetyLevel: 'critical',
    },
    {
        id: 'rosc-seizure',
        type: 'info',
        module: 4,
        title: 'Post-Arrest Seizures',
        body: '**Post-arrest seizures** occur in 20-30% of comatose survivors.\n\n• Continuous EEG monitoring recommended for all comatose post-arrest patients\n• Clinical seizures may be subtle (eye twitching, nystagmus) or masked by paralysis\n• Treatment: [Levetiracetam](#/drug/levetiracetam/seizure) 60 mg/kg IV (max 4500mg) — first-line\n• Refractory: valproate, phenobarbital, midazolam/propofol infusion\n• **Myoclonus ≠ seizure** — Lance-Adams syndrome (post-hypoxic myoclonus) has better prognosis than true status epilepticus',
        citation: [5, 6, 8],
        next: 'rosc-icu-targets',
        summary: '20-30% have post-arrest seizures — continuous EEG, levetiracetam first-line, myoclonus is not always seizure',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 5: ICU TARGETS & DISPOSITION
    // =====================================================================
    {
        id: 'rosc-icu-targets',
        type: 'info',
        module: 5,
        title: 'ICU Bundle',
        body: '**ICU bundle:**\n• **Glucose 140-180 mg/dL** — avoid hypoglycemia (<70), treat hyperglycemia with insulin infusion\n• **Seizure surveillance:** continuous EEG × 24-48h minimum\n• **Echo:** assess LV function, wall motion abnormalities, post-arrest stunning\n• **Ventilator:** TV 6 mL/kg IBW, PEEP 5-8, target PaCO₂ 35-45\n• **Labs q4-6h:** lactate (trending down = good), troponin, electrolytes, ABG\n• **Foley:** strict I/O monitoring, target UOP >0.5 mL/kg/hr\n• **DVT prophylaxis:** enoxaparin or heparin SQ once hemostasis confirmed',
        citation: [1, 5, 6],
        next: 'rosc-disposition',
        summary: 'Glucose 140-180, EEG x24-48h, echo, TV 6 mL/kg IBW, labs q4-6h, DVT prophylaxis',
    },
    {
        id: 'rosc-disposition',
        type: 'result',
        module: 5,
        title: 'ICU Admission',
        body: '**Admit to ICU.** Document: code duration, initial rhythm, ETCO₂ values during resuscitation, number of shocks, medications given, total epi doses, neurological exam at ROSC, cooling plan.\n\n**Communicate to ICU:**\n• Arrest circumstances (witnessed/unwitnessed, bystander CPR, initial rhythm)\n• Total downtime\n• Interventions and response\n• Current hemodynamics and vasopressor support\n• TTM plan and current temp\n• Pending workup (cath, EEG, imaging)',
        citation: [1, 2, 6],
        recommendation: 'ICU admission with continuous monitoring. Document full resuscitation details. TTM plan. Neuroprognostication after 72h minimum.',
        confidence: 'definitive',
    },
];
export const POST_ROSC_MODULE_LABELS = [
    'Immediate Post-ROSC',
    'Hemodynamic Targets',
    'Temperature Management',
    'Neuroprognostication',
    'ICU Targets',
];
export const POST_ROSC_CITATIONS = [
    { num: 1, text: 'Callaway CW et al. Part 8: Post-Cardiac Arrest Care. Circulation. 2015;132(18 Suppl 2):S465-S482.' },
    { num: 2, text: 'AHA Guidelines for CPR and ECC. Part 11: Post-Cardiac Arrest Care. Circulation. 2025.' },
    { num: 3, text: 'Dankiewicz J et al. Hypothermia versus Normothermia after OHCA (TTM2). NEJM. 2021;384:2283-2294.' },
    { num: 4, text: 'Nielsen N et al. Targeted Temperature Management at 33°C versus 36°C (TTM). NEJM. 2013;369:2197-2206.' },
    { num: 5, text: 'Soar J et al. ERC Guidelines 2021: Advanced Life Support. Resuscitation. 2021;161:115-151.' },
    { num: 6, text: 'Nolan JP et al. ERC/ESICM Guidelines on Post-Resuscitation Care. Resuscitation. 2021;161:220-269.' },
    { num: 7, text: 'Dumas F et al. Routine Post-Resuscitation ECG to Predict Early Coronary Angiography. JACC. 2012.' },
    { num: 8, text: 'Sandroni C et al. Prognostication in Comatose Survivors of Cardiac Arrest. Intensive Care Med. 2014;40(12):1816-1831.' },
    { num: 9, text: 'Elmer J et al. Long-Term Outcomes of Post-Arrest Patients. Neurology. 2016.' },
    { num: 10, text: 'Donnino MW et al. Temperature Management After Cardiac Arrest. Circulation. 2015.' },
    { num: 11, text: 'Farkas J. Post-Cardiac Arrest Care. EMCrit IBCC. https://emcrit.org/ibcc/post-arrest/' },
    { num: 12, text: 'Geocadin RG et al. Standards for Studies of Neurological Prognostication in Comatose Survivors. Resuscitation. 2019.' },
    { num: 13, text: 'Zanuttini D et al. Routine Coronary Angiography After OHCA Without Obvious Non-Cardiac Cause. Resuscitation. 2012;83(10):1259-1263.' },
    { num: 14, text: 'Lemkes JJ et al. Coronary Angiography After OHCA Without STEMI (COACT). NEJM. 2019;380:1397-1407.' },
];
