// MedKitt — Thromboelastography (TEG) Interpretation
// When to use → Read the tracing/parameters → Goal-directed treatment → Special scenarios → Reassess
// 5 modules, 12 nodes total. Anchored on TEG 6s trauma cartridge (Sarani 2025 Delphi) + EAST 2020.
// Assay-labeling is mandatory: TEG 6s, rTEG, and CK-TEG 5000 cutoffs are NOT interchangeable.
export const TEG_NODES = [
    // =====================================================================
    // MODULE 1: WHEN TO USE & ORIENTATION
    // =====================================================================
    {
        id: 'teg-start',
        type: 'info',
        module: 1,
        title: 'Thromboelastography (TEG) — Whole-Blood Viscoelastic Testing',
        body: '[TEG Basics: When to Use & Limits](#/info/teg-basics) — read first.\n[The 4 Trauma Parameters](#/info/teg-parameters) · [Treatment Ladder](#/info/teg-treatment-ladder) · [Do NOT](#/info/teg-stop)\n\nTEG measures **real-time clot formation → strengthening → lysis** in whole blood, mapping the cell-based coagulation model at the point of care. Early values return in ~5–10 min — fast enough to direct **goal-directed** component therapy instead of fixed-ratio resuscitation. [1, 3]\n\n**⚠️ Assay matters.** Cutoffs differ between **TEG 6s** (cartridge), **rapid-TEG (rTEG)**, and **citrated-kaolin TEG 5000**. This consult uses **TEG 6s trauma-cartridge** thresholds. [6, 7] Do not apply them to another analyzer.\n\n**Evidence note:** viscoelastic-guided transfusion in trauma is a **conditional** recommendation on **VERY LOW** quality evidence (EAST 2020); the largest RCT (ITACTIC 2021) was negative for its primary outcome. [1, 2] Use TEG to *support* judgment, not replace it.',
        citation: [1, 2, 3, 6, 7],
        calculatorLinks: [
            { id: 'teg6s-interpreter', label: 'TEG 6s Interpreter' },
            { id: 'teg-fibrinolysis', label: 'Fibrinolysis / TXA' },
        ],
        next: 'teg-context',
    },
    {
        id: 'teg-context',
        type: 'question',
        module: 1,
        title: 'What do you need from the TEG?',
        body: 'Pick your task. You can return here to address additional findings.',
        options: [
            { label: 'Bleeding patient — what product should I give?', description: 'Goal-directed transfusion from the 4 trauma values', next: 'teg-which-abnormal', urgency: 'critical' },
            { label: 'Classify fibrinolysis / decide on TXA', description: 'LY30 → shutdown / physiologic / hyperfibrinolysis', next: 'teg-fib' },
            { label: 'Is there a heparin effect?', description: 'CK-R vs CKH-R (heparinase) channel', next: 'teg-heparin-node' },
            { label: 'Platelet function / antiplatelet drugs (PlateletMapping)', description: 'Elective / peri-procedural — NOT the acute bleed', next: 'teg-pmap' },
            { label: 'TEG looks normal but the patient keeps bleeding', next: 'teg-normal-bleeding', urgency: 'urgent' },
        ],
    },
    // =====================================================================
    // MODULE 2: READ THE TRACING / PARAMETERS
    // =====================================================================
    {
        id: 'teg-which-abnormal',
        type: 'question',
        module: 2,
        title: 'Which TEG 6s value is abnormal?',
        body: 'Read the live tracing — you can usually call a weak clot by ~10 min, before the full ~50-min trace completes. Tap the abnormal parameter to get its targeted treatment, then come back for the next one.\n\n**Normal ranges (TEG 6s trauma cartridge):** [6, 7]\n• **CK-R** 4.6–9.1 min — clotting factors\n• **CFF-MA** 15–32 mm — fibrinogen\n• **CRT-MA** 52–70 mm — overall strength (platelets + fibrinogen)\n• **CK-LY30** 0–2.6% — fibrinolysis\n\nOpen the [TEG 6s Interpreter](#/calculator/teg6s-interpreter) to enter all four at once.',
        citation: [6, 7],
        calculatorLinks: [
            { id: 'teg6s-interpreter', label: 'TEG 6s Interpreter' },
        ],
        options: [
            { label: 'Prolonged CK-R (>10 min)', description: 'Slow clot initiation — factors/anticoagulant', next: 'teg-tx-factors' },
            { label: 'Low CFF-MA (<14 mm)', description: 'Low fibrinogen contribution', next: 'teg-tx-fibrinogen', urgency: 'urgent' },
            { label: 'Low CRT-MA (<52 mm; esp. <45)', description: 'Weak overall clot — platelets', next: 'teg-tx-platelets' },
            { label: 'Elevated CK-LY30 (>2.6%)', description: 'Hyperfibrinolysis — clot breaking down', next: 'teg-tx-txa', urgency: 'critical' },
        ],
    },
    // =====================================================================
    // MODULE 3: GOAL-DIRECTED TREATMENT (result nodes with regimens)
    // =====================================================================
    {
        id: 'teg-tx-factors',
        type: 'result',
        module: 3,
        title: 'Prolonged CK-R → Replace Clotting Factors',
        body: 'A prolonged **CK-R (>10 min)** means delayed clot initiation — factor deficiency or a circulating anticoagulant. [6]\n\n**Give:**\n• **[Plasma / FFP](#/drug/ffp/trauma hemorrhage)** 15–30 mL/kg IV (~4 units in a 70 kg adult).\n• Low-volume alternative: **[4-factor PCC](#/drug/pcc-4factor/viscoelastic)** 25–50 IU/kg (off-label in trauma; thrombotic risk).\n\n**Before blaming factors:**\n• If on heparin, check the [heparin effect](#/node/teg-heparin-node) (CK-R vs CKH-R) → protamine, not plasma.\n• Reassess CK-R on a repeat TEG in 30–60 min.\n\n[Address another abnormal value](#/node/teg-which-abnormal) · [Reassessment targets](#/node/teg-reassess)',
        recommendation: 'Prolonged CK-R: give plasma 15–30 mL/kg (or 4F-PCC 25–50 IU/kg as a low-volume alternative); rule out a heparin effect first if on heparin.',
        confidence: 'recommended',
        citation: [6, 1],
        treatment: {
            firstLine: { drug: 'Plasma (FFP)', dose: '15–30 mL/kg', route: 'IV', frequency: 'bolus, reassess', duration: 'until CK-R normalizes', notes: '~4 units in a 70 kg adult. Each unit ~250 mL raises factors only ~2.5%.' },
            alternative: { drug: '4-Factor PCC', dose: '25–50 IU/kg', route: 'IV', frequency: 'once', duration: 'single dose', notes: 'Off-label in trauma. Low volume; thrombotic risk. Max 5000 IU.' },
            monitoring: 'Repeat TEG (CK-R) in 30–60 min. Maintain temperature, ionized calcium, and pH. Watch for TACO/TRALI with plasma.',
        },
    },
    {
        id: 'teg-tx-fibrinogen',
        type: 'result',
        module: 3,
        title: 'Low CFF-MA → Replace Fibrinogen (FIRST)',
        body: 'A low **CFF-MA (<14 mm)** means inadequate fibrinogen contribution to the clot. Functional fibrinogen is the **first** deficit to correct — a low overall clot strength (CRT-MA) is frequently driven by low fibrinogen, and cryo also raises the CRT-MA. [6, 7]\n\n**Give:**\n• **[Cryoprecipitate](#/drug/cryoprecipitate/massive transfusion)** 10 units (≈6 g) — or fibrinogen concentrate 4–6 g.\n• Each 10 U cryo raises fibrinogen ~50–100 mg/dL.\n\n**Target:** fibrinogen >150 mg/dL (>200 mg/dL if TBI/CNS injury).\n\nUse the [CFF-MA → Cryo dose](#/calculator/teg-fibrinogen-dose) tool to size the dose, then [recheck the TEG](#/node/teg-reassess).\n\n[Address another abnormal value](#/node/teg-which-abnormal)',
        recommendation: 'Low CFF-MA: give cryoprecipitate 10 U (≈6 g fibrinogen) or fibrinogen concentrate 4–6 g, target fibrinogen >150 (>200 if TBI). Correct fibrinogen before platelets.',
        confidence: 'recommended',
        citation: [6, 7, 1],
        calculatorLinks: [
            { id: 'teg-fibrinogen-dose', label: 'CFF-MA → Cryo Dose' },
        ],
        treatment: {
            firstLine: { drug: 'Cryoprecipitate', dose: '10 units (≈6 g fibrinogen)', route: 'IV', frequency: 'bolus, reassess', duration: 'until CFF-MA ≥15 mm / fibrinogen >150', notes: 'Or fibrinogen concentrate 4–6 g. Raises fibrinogen ~50–100 mg/dL per 10 U.' },
            monitoring: 'Repeat TEG (CFF-MA) and/or quantitative fibrinogen in 30–60 min. Correct fibrinogen BEFORE attributing a low CRT-MA to platelets.',
        },
    },
    {
        id: 'teg-tx-platelets',
        type: 'result',
        module: 3,
        title: 'Low CRT-MA → Platelets (after fibrinogen is adequate)',
        body: 'A low **CRT-MA (<52 mm)** reflects weak overall clot strength. The MA is ~80% platelets, ~20% fibrinogen — so **confirm CFF-MA is adequate (≥15 mm) first.** If fibrinogen is low, [correct it](#/node/teg-tx-fibrinogen) and recheck before giving platelets. [6, 7]\n\n**If CFF-MA is adequate and CRT-MA is low:**\n• **CRT-MA <45 mm** → **[Platelets](#/drug/platelets/massive transfusion)** 1–2 apheresis units.\n• **CRT-MA 45–50 mm** → **[Platelets](#/drug/platelets/massive transfusion)** 1 apheresis unit.\n\n**⚠️ Blind spot:** standard TEG is thrombin-driven and **cannot see aspirin/P2Y12 inhibition** — a normal CRT-MA does not exclude an antiplatelet effect. If the patient is on antiplatelets and bleeding, consider [PlateletMapping](#/node/teg-pmap) and empiric platelets.\n\n[Address another abnormal value](#/node/teg-which-abnormal) · [Reassessment targets](#/node/teg-reassess)',
        recommendation: 'Low CRT-MA with adequate fibrinogen: give 1 apheresis platelet unit (CRT-MA 45–50) or 1–2 units (<45). Correct fibrinogen first; TEG is blind to antiplatelet drugs.',
        confidence: 'recommended',
        citation: [6, 7],
        treatment: {
            firstLine: { drug: 'Platelets (apheresis)', dose: '1–2 units', route: 'IV', frequency: 'bolus, reassess', duration: 'until CRT-MA ≥52 mm', notes: 'CRT-MA <45 → 1–2 units; 45–50 → 1 unit. Only after CFF-MA ≥15 mm.' },
            monitoring: 'Repeat TEG (CRT-MA) in 30–60 min. Consider PlateletMapping / empiric platelets if on aspirin or P2Y12 inhibitors.',
        },
    },
    {
        id: 'teg-tx-txa',
        type: 'result',
        module: 3,
        title: 'Elevated CK-LY30 → Antifibrinolytic (TXA)',
        body: 'An elevated **CK-LY30 (>2.6%)** signals **hyperfibrinolysis** — the clot is being broken down faster than it forms. [10, 11]\n\n**Give:**\n• **[Tranexamic acid](#/drug/tranexamic-acid/trauma hemorrhage)** 1 g IV over 10 min, then 1 g IV over 8 h (CRASH-2 regimen). [7, 8]\n\n**Timing is critical:**\n• Greatest mortality benefit when given **≤3 h from injury**.\n• Given **>3 h** out, CRASH-2 showed TXA may **increase** bleeding death — weigh carefully. [8]\n\nUse the [Fibrinolysis Phenotype & TXA](#/calculator/teg-fibrinolysis) tool to classify shutdown vs physiologic vs hyperfibrinolysis.\n\n[Address another abnormal value](#/node/teg-which-abnormal) · [Reassessment targets](#/node/teg-reassess)',
        recommendation: 'Elevated CK-LY30 (>2.6%) = hyperfibrinolysis: give TXA 1 g IV over 10 min then 1 g over 8 h, ideally ≤3 h from injury.',
        confidence: 'recommended',
        citation: [7, 8, 10, 11],
        calculatorLinks: [
            { id: 'teg-fibrinolysis', label: 'Fibrinolysis / TXA' },
        ],
        treatment: {
            firstLine: { drug: 'Tranexamic acid (TXA)', dose: '1 g then 1 g', route: 'IV', frequency: 'loading over 10 min, then over 8 h', duration: 'per CRASH-2', notes: 'Most benefit ≤3 h from injury; possible harm if started >3 h out.' },
            monitoring: 'Repeat TEG (CK-LY30) in 30–60 min. Reassess for ongoing surgical bleeding.',
        },
    },
    // =====================================================================
    // MODULE 4: SPECIAL SCENARIOS
    // =====================================================================
    {
        id: 'teg-fib',
        type: 'result',
        module: 4,
        title: 'Fibrinolysis Phenotype & the TXA Decision',
        body: 'Post-injury fibrinolysis is a spectrum with **U-shaped mortality** — both extremes are worse than physiologic. Cut-points below are from the Denver rapid-TEG cohort (Moore 2016, n=2,540). [10, 11]\n\n• **Shutdown — LY30 <0.8%** (~46%): impaired clot clearance, increased mortality (~22%).\n• **Physiologic — LY30 0.8–2.9%** (~36%): lowest mortality (~14%) — the target.\n• **Hyperfibrinolysis — LY30 ≥3%** (~18%): highest mortality (~34%) → **give TXA**.\n\nOn the **TEG 6s** trauma cartridge, lysis **>2.6%** exceeds the upper limit of normal and should be treated as a fibrinolysis signal. [6, 7]\n\n**⚠️ Shutdown caveat:** the idea that TXA *harms* shutdown patients is the **Denver hypothesis** — contested by CRASH-2/CRASH-3/WOMAN. Do not withhold TXA from a bleeding patient on LY30 alone; decide on the whole picture and timing. [7, 8, 9]\n\nUse the [Fibrinolysis Phenotype & TXA](#/calculator/teg-fibrinolysis) tool. For dosing, see [TXA treatment](#/node/teg-tx-txa).\n\n[Back to tasks](#/node/teg-context)',
        recommendation: 'Classify LY30: shutdown <0.8% / physiologic 0.8–2.9% / hyperfibrinolysis ≥3% (TEG 6s flags >2.6%). Give TXA for hyperfibrinolysis; the "TXA harms shutdown" idea is an unproven hypothesis.',
        confidence: 'consider',
        citation: [10, 11, 7, 8, 9],
        calculatorLinks: [
            { id: 'teg-fibrinolysis', label: 'Fibrinolysis / TXA' },
        ],
    },
    {
        id: 'teg-heparin-node',
        type: 'result',
        module: 4,
        title: 'Heparin Effect — CK-R vs CKH-R (Heparinase)',
        body: 'The TEG 6s runs a heparin-neutralized channel (**CKH**, kaolin + heparinase) alongside the standard **CK** channel. Comparing the two isolates a heparin effect. [15, 16]\n\n**Interpretation:**\n• **CK-R prolonged + CKH-R normal** (CK-R > ~1.5× CKH-R, or Δ >2 min) → circulating **heparin** → consider **[protamine](#/drug/protamine/heparin reversal)** 25–50 mg IV.\n• **Both prolonged** → factor deficiency/anticoagulant, not heparin → [give plasma](#/node/teg-tx-factors), not protamine.\n\n**⚠️ Caveat:** the R-vs-heparinase → protamine logic is derived from **cardiac surgery / ICU** practice, **not validated in trauma**. Use clinical judgment. [15]\n\nUse the [Heparin Effect](#/calculator/teg-heparin) tool.\n\n[Back to tasks](#/node/teg-context)',
        recommendation: 'CK-R prolonged but CKH-R (heparinase) normal = heparin effect → protamine 25–50 mg. Both prolonged = factor deficiency → plasma. Protamine logic is cardiac-derived, not trauma-validated.',
        confidence: 'consider',
        citation: [15, 16],
        calculatorLinks: [
            { id: 'teg-heparin', label: 'Heparin Effect' },
        ],
        treatment: {
            firstLine: { drug: 'Protamine', dose: '25–50 mg', route: 'IV', frequency: 'once, titrate', duration: 'single dose', notes: 'Reverses unfractionated heparin; partial for LMWH. Only if CKH-R corrects the CK-R prolongation.' },
            monitoring: 'Repeat TEG after protamine. Watch for protamine reactions (hypotension, anaphylaxis, pulmonary hypertension).',
        },
    },
    {
        id: 'teg-pmap',
        type: 'result',
        module: 4,
        title: 'TEG PlateletMapping — Antiplatelet Assessment',
        body: 'PlateletMapping quantifies platelet inhibition in the **aspirin (AA / thromboxane)** and **P2Y12 (ADP)** pathways. Standard TEG is thrombin-driven and **overrides** platelet inhibition, so PlateletMapping is required to see antiplatelet effect. [12, 13]\n\n**Channels:** MA-Thrombin (HKH, max function) · MA-ActF (fibrin-only floor) · MA-AA (aspirin) · MA-ADP (P2Y12).\n**% Inhibition = 100 − [(MA_agonist − MA_ActF) / (MA_Thrombin − MA_ActF) × 100].** [12]\n\n**Thresholds:**\n• **Aspirin effect:** AA %inhibition ≥50% (or low AA-MA <51 mm).\n• **P2Y12 effect:** MA-ADP <~47–50 mm (more robust than ADP %inhibition).\n\n**⚠️ Use:** elective / peri-procedural antiplatelet assessment, clopidogrel-resistance, reversal decisions. **NOT for the acute bleed** (slower turnaround; large treated/untreated overlap). [12, 13]\n\nUse the [PlateletMapping](#/calculator/teg-plateletmapping) tool.\n\n[Back to tasks](#/node/teg-context)',
        recommendation: 'PlateletMapping: aspirin effect if AA %inhibition ≥50% (or AA-MA <51 mm); P2Y12 effect if MA-ADP <~47–50 mm. Elective/peri-procedural use only — not the acute bleed.',
        confidence: 'consider',
        citation: [12, 13],
        calculatorLinks: [
            { id: 'teg-plateletmapping', label: 'PlateletMapping' },
        ],
    },
    {
        id: 'teg-normal-bleeding',
        type: 'result',
        module: 4,
        title: 'Normal TEG but Still Bleeding',
        body: 'A normal TEG in a bleeding patient is a meaningful result: the clotting machinery is working. The bleeding is usually **anatomic/surgical**, or from something TEG cannot see. [1, 6]\n\n**Think:**\n• **Surgical / structural bleed** — TEG cannot detect anatomic bleeding. Pursue **source control** and transfuse 1:1:1 to replace ongoing losses evenly.\n• **TEG blind spots:**\n  • Aspirin / P2Y12 platelet inhibition (thrombin-driven assay overrides it) → [PlateletMapping](#/node/teg-pmap).\n  • Von Willebrand disease (high-shear vWF adhesion not captured).\n  • **Hypothermia** — the sample is warmed to 37 °C, masking the patient\'s true cold coagulopathy. Actively rewarm.\n• **Acidosis & hypocalcemia** — correct ionized calcium and pH; both impair hemostasis independent of the TEG.\n\n[See the Do NOT list](#/info/teg-stop) · [Back to tasks](#/node/teg-context)',
        recommendation: 'Normal TEG + ongoing bleeding = think surgical/structural bleed or a TEG blind spot (antiplatelet drugs, vWD, hypothermia, acidosis, low ionized Ca). Source control + 1:1:1; warm and correct Ca/pH.',
        confidence: 'recommended',
        citation: [1, 6],
    },
    // =====================================================================
    // MODULE 5: REASSESS & DISPOSITION
    // =====================================================================
    {
        id: 'teg-reassess',
        type: 'result',
        module: 5,
        title: 'Reassess & Targets',
        body: 'TEG-guided resuscitation is **iterative** — treat, then re-test. [1, 6]\n\n**Reassess:**\n• Repeat TEG every **30–60 min** or with each MTP round / after each product given.\n• Re-test specifically after the intervention that targeted the abnormal channel.\n\n**Targets (TEG 6s trauma cartridge):** [6, 7]\n• CK-R ≤10 min (factors)\n• CFF-MA ≥15 mm / fibrinogen >150 mg/dL (>200 if TBI)\n• CRT-MA ≥52 mm (overall strength)\n• CK-LY30 ≤2.6% (lysis controlled)\n\n**Don\'t forget the "lethal triad" adjuncts the TEG cannot show:**\n• Keep the patient **warm** (sample is run at 37 °C — masks hypothermia).\n• Correct **ionized calcium** (citrate from products chelates Ca²⁺).\n• Correct **pH / acidosis**.\n\nDe-escalate products once targets are met and bleeding is controlled. [Back to tasks](#/node/teg-context)',
        recommendation: 'Re-test TEG q30–60 min / per MTP round. Targets: CK-R ≤10, CFF-MA ≥15, CRT-MA ≥52, CK-LY30 ≤2.6%. Maintain temperature, ionized calcium, and pH — the TEG cannot show these.',
        confidence: 'recommended',
        citation: [1, 6, 7],
    },
];
export const TEG_NODE_COUNT = TEG_NODES.length;
export const TEG_MODULE_LABELS = [
    'When to Use',
    'Read the Parameters',
    'Goal-Directed Treatment',
    'Special Scenarios',
    'Reassess & Disposition',
];
export const TEG_CRITICAL_ACTIONS = [
    { text: 'Assay-label every cutoff — TEG 6s, rTEG, and CK-TEG 5000 are NOT interchangeable; this consult uses TEG 6s trauma-cartridge thresholds', nodeId: 'teg-start' },
    { text: 'Correct fibrinogen (low CFF-MA <14 mm → cryo) BEFORE attributing a low CRT-MA to platelets — cryo also raises the CRT-MA', nodeId: 'teg-tx-fibrinogen' },
    { text: 'Prolonged CK-R (>10 min) → plasma 15–30 mL/kg or 4F-PCC 25–50 IU/kg; rule out heparin (CK-R vs CKH-R) first if on heparin', nodeId: 'teg-tx-factors' },
    { text: 'Elevated CK-LY30 (>2.6%) = hyperfibrinolysis → TXA 1 g/10 min then 1 g/8 h; best ≤3 h from injury, possible harm if >3 h', nodeId: 'teg-tx-txa' },
    { text: 'Low CRT-MA (<45 → 1–2 units; 45–50 → 1 unit) platelets only after fibrinogen is adequate; TEG is blind to aspirin/P2Y12 inhibition', nodeId: 'teg-tx-platelets' },
    { text: 'Normal TEG + ongoing bleed = surgical/structural source or a TEG blind spot (antiplatelet drugs, vWD, hypothermia, acidosis) — TEG runs at 37 °C and masks hypothermia', nodeId: 'teg-normal-bleeding' },
    { text: 'Re-test TEG q30–60 min / per MTP round; maintain temperature, ionized calcium, and pH — the analyzer cannot show these', nodeId: 'teg-reassess' },
];
export const TEG_CITATIONS = [
    { num: 1, text: 'Bugaev N, Como JJ, Golani G, et al. Thromboelastography and rotational thromboelastometry in bleeding patients with coagulopathy: practice management guideline from the Eastern Association for the Surgery of Trauma. J Trauma Acute Care Surg. 2020;89(6):999-1017. doi:10.1097/TA.0000000000002944' },
    { num: 2, text: 'Baksaas-Aasen K, Gall LS, Stensballe J, et al. Viscoelastic haemostatic assay augmented protocols for major trauma haemorrhage (ITACTIC): a randomized, controlled trial. Intensive Care Med. 2021;47(1):49-59. doi:10.1007/s00134-020-06266-1' },
    { num: 3, text: 'Gonzalez E, Moore EE, Moore HB, et al. Goal-directed hemostatic resuscitation of trauma-induced coagulopathy: a pragmatic randomized clinical trial comparing a viscoelastic assay to conventional coagulation assays. Ann Surg. 2016;263(6):1051-1059. doi:10.1097/SLA.0000000000001608' },
    { num: 4, text: 'Einersen PM, Moore EE, Chapman MP, et al. Rapid thrombelastography thresholds for goal-directed resuscitation of patients at risk for massive transfusion. J Trauma Acute Care Surg. 2017;82(1):114-119. doi:10.1097/TA.0000000000001270' },
    { num: 5, text: 'Stettler GR, Sumislawski JJ, Moore EE, et al. Citrated kaolin thrombelastography (TEG) thresholds for goal-directed therapy in injured patients receiving massive transfusion. J Trauma Acute Care Surg. 2018;85(4):734-740. doi:10.1097/TA.0000000000002037' },
    { num: 6, text: 'Sarani B, Callum J, Neal MD, et al. A goal-directed transfusion algorithm for trauma patients with severe hemorrhage using TEG 6S: a Delphi consensus study. J Trauma Acute Care Surg. 2025;98(6):984-991. doi:10.1097/TA.0000000000004606' },
    { num: 7, text: 'Hartmann J, Dias J, Shilo A, et al. TEG 6s with a novel heparin-neutralization cartridge: technical validation and normal reference ranges. Am J Clin Pathol. 2025;163(1):12-19. doi:10.1093/ajcp/aqae088' },
    { num: 8, text: 'Shakur H, Roberts I, Bautista R, et al. (CRASH-2 trial collaborators). Effects of tranexamic acid on death, vascular occlusive events, and blood transfusion in trauma patients with significant haemorrhage (CRASH-2): a randomised, placebo-controlled trial. Lancet. 2010;376(9734):23-32. doi:10.1016/S0140-6736(10)60835-5' },
    { num: 9, text: 'Roberts I, Shakur H, Afolabi A, et al. (CRASH-2 collaborators). The importance of early treatment with tranexamic acid in bleeding trauma patients: an exploratory analysis of the CRASH-2 randomised controlled trial. Lancet. 2011;377(9771):1096-1101. doi:10.1016/S0140-6736(11)60278-X' },
    { num: 10, text: 'Moore HB, Moore EE, Liras IN, et al. Acute fibrinolysis shutdown after injury occurs frequently and increases mortality: a multicenter evaluation of 2,540 severely injured patients. J Am Coll Surg. 2016;222(4):347-355. doi:10.1016/j.jamcollsurg.2016.01.006' },
    { num: 11, text: 'Chapman MP, Moore EE, Moore HB, et al. Overwhelming tPA release, not PAI-1 degradation, is responsible for hyperfibrinolysis in severely injured trauma patients; fibrinolysis >3% is the critical value for initiation of antifibrinolytic therapy. J Trauma Acute Care Surg. 2013;75(6):961-967. doi:10.1097/TA.0b013e3182aa9c9f' },
    { num: 12, text: 'Collyer TC, Gray DJ, Sandhu R, Berridge J, Lyons G. Assessment of platelet inhibition secondary to clopidogrel and aspirin therapy in preoperative acute surgical patients measured by thrombelastography PlateletMapping. Br J Anaesth. 2009;102(4):492-498. doi:10.1093/bja/aep039' },
    { num: 13, text: 'Gurbel PA, Bliden KP, Tantry US, et al. First report of the point-of-care TEG: a technical validation study of the TEG-6S system. Platelets. 2016;27(7):642-649. doi:10.3109/09537104.2016.1153617' },
    { num: 14, text: 'CRASH-3 trial collaborators. Effects of tranexamic acid on death, disability, vascular occlusive events and other morbidities in patients with acute traumatic brain injury (CRASH-3): a randomised, placebo-controlled trial. Lancet. 2019;394(10210):1713-1723. doi:10.1016/S0140-6736(19)32233-0' },
    { num: 15, text: 'Maxey-Jones C, Seelhammer TG, Arabia FA, et al. A TEG 6s-guided algorithm for optimizing patient blood management in cardiovascular surgery. J Cardiothorac Vasc Anesth. 2025;39(5):1162-1172. doi:10.1053/j.jvca.2025.02.011' },
    { num: 16, text: 'US Food and Drug Administration. 510(k) Premarket Notification K232018: TEG 6s Citrated K, KH, RTH, FFH cartridge (Haemonetics). Cleared March 29, 2024.' },
];
