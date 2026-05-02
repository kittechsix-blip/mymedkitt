// MedKitt — Acute Mesenteric Ischemia (AMI)
// Pain out of proportion → CTA → Type-specific treatment → Surgery vs Endovascular
// 6 modules: Recognition → Workup → Resuscitation → Type-Specific Tx → Surgery → Disposition
// ~32 nodes total.
export const MESENTERIC_ISCHEMIA_CRITICAL_ACTIONS = [
    { text: 'Pain out of proportion to exam = AMI until proven otherwise', nodeId: 'ami-start' },
    { text: 'CTA immediately — do NOT wait for labs; every 6h delay doubles mortality', nodeId: 'ami-imaging' },
    { text: 'Normal lactate does NOT rule out AMI — lactate rises late', nodeId: 'ami-labs' },
    { text: 'Heparin 80 U/kg bolus → 18 U/kg/hr infusion — start before surgery', nodeId: 'ami-anticoag' },
    { text: 'Pip-tazo 4.5g IV q6h — broad gut coverage immediately', nodeId: 'ami-abx' },
    { text: 'Avoid vasopressors — worsen mesenteric ischemia; use norepi + dobutamine if required', nodeId: 'ami-resus' },
    { text: 'Peritonitis = immediate laparotomy regardless of type', nodeId: 'ami-peritonitis' },
];
export const MESENTERIC_ISCHEMIA_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'ami-start',
        type: 'info',
        module: 1,
        title: 'Acute Mesenteric Ischemia',
        body: '[AMI Decision Summary](#/info/ami-summary)\n\n**Definition:** Life-threatening abdominal emergency from inadequate intestinal blood flow.\n\n**Mortality:**\n• 14% if treated within 12 hours\n• 80-100% if delayed >24 hours\n\n**The Classic Presentation:**\n**Severe abdominal pain OUT OF PROPORTION to physical exam**\n\nPatient appears in extreme distress; abdomen is soft with minimal tenderness.\n\n⚠️ **WSES:** "Severe pain out of proportion should be assumed AMI until proven otherwise"',
        citation: [1, 2],
        next: 'ami-types',
        summary: 'AMI = inadequate gut blood flow. 14% mortality if treated <12h; 80-100% if >24h. Pain out of proportion is classic.',
        skippable: true,
    },
    {
        id: 'ami-types',
        type: 'info',
        module: 1,
        title: 'The 4 Types of AMI',
        body: '**Type determines treatment:**\n\n| Type | % | Mechanism | Classic Patient |\n|------|---|-----------|----------------|\n| **AMAE** (Arterial Embolism) | 40-50% | Cardiogenic embolus to SMA | AFib, recent MI, valvular disease |\n| **AMAT** (Arterial Thrombosis) | 25-30% | Atherosclerotic plaque rupture | Known PVD, chronic mesenteric angina |\n| **MVT** (Venous Thrombosis) | 10-15% | Venous occlusion | Younger, hypercoagulable state |\n| **NOMI** (Non-Occlusive) | 20% | Vasospasm/low-flow | ICU patient on vasopressors |',
        citation: [2, 3],
        next: 'ami-risk-factors',
        summary: 'AMAE (40-50%, embolism), AMAT (25-30%, thrombosis), MVT (10-15%, venous), NOMI (20%, ICU/vasopressors).',
    },
    {
        id: 'ami-risk-factors',
        type: 'question',
        module: 1,
        title: 'Risk Factor Assessment',
        body: 'Which risk factors are present?\n\n**High-risk for AMI:**\n• AFib or recent MI\n• Age >60 + unexplained severe abdominal pain\n• Known vascular disease (PVD, CAD)\n• Hypercoagulable state\n• ICU patient on vasopressors\n• History of postprandial pain / "food fear"',
        options: [
            { label: 'High-risk features present', description: 'AFib, vascular disease, vasopressors, age >60', next: 'ami-exam', urgency: 'urgent' },
            { label: 'No high-risk features', description: 'Still consider if pain out of proportion', next: 'ami-exam' },
        ],
        summary: 'High-risk: AFib, age >60, PVD, vasopressors, hypercoagulable. Low threshold for CTA in these patients.',
    },
    {
        id: 'ami-exam',
        type: 'question',
        module: 1,
        title: 'Physical Exam Findings',
        body: '**Classic triad:**\n1. Severe abdominal pain\n2. Minimal tenderness on exam\n3. Rapid clinical deterioration\n\n**Late findings (necrosis):**\n• Peritonitis / rebound\n• Bloody diarrhea\n• Shock\n\nIs peritonitis present?',
        options: [
            { label: 'Yes — peritonitis / rebound', description: 'Suggests necrosis → emergent surgery', next: 'ami-peritonitis', urgency: 'critical' },
            { label: 'No — soft abdomen, pain out of proportion', description: 'Classic early presentation', next: 'ami-imaging' },
            { label: 'Shock without clear source', description: 'Consider AMI in differential', next: 'ami-imaging' },
        ],
        summary: 'Pain out of proportion = soft abdomen + severe pain. Peritonitis = late/necrosis → emergent surgery.',
        safetyLevel: 'critical',
    },
    {
        id: 'ami-peritonitis',
        type: 'info',
        module: 1,
        title: 'Peritonitis — Emergent Laparotomy',
        body: '🛑 **Peritonitis = immediate laparotomy regardless of type**\n\n**Do not delay for CTA if:**\n• Clear peritonitis\n• Free air on imaging\n• Hemodynamic instability with obvious acute abdomen\n\n**Surgical goals:**\n• Assess bowel viability\n• Resect necrotic segments\n• Revascularize if possible\n• Plan second-look laparotomy at 24-48h\n\n**Call:**\n• Vascular Surgery\n• General Surgery\n• OR / Anesthesia STAT',
        citation: [2, 4],
        next: 'ami-resus',
        summary: 'Peritonitis = immediate laparotomy. Resect necrotic bowel, revascularize, plan second-look at 24-48h.',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 2: DIAGNOSTIC WORKUP
    // =====================================================================
    {
        id: 'ami-imaging',
        type: 'info',
        module: 2,
        title: 'CTA — The Gold Standard',
        body: '**CT Angiography: Sensitivity 93-100%, Specificity 94-100%**\n\n🛑 **Do NOT wait for labs — go straight to CTA**\n\n**Protocol:** Biphasic CTA (arterial + venous phase)\n• Arterial phase: SMA/celiac occlusion, emboli\n• Venous phase: MVT, bowel wall enhancement\n\n**CT Findings — Ischemia:**\n• Filling defect in SMA\n• Bowel wall thickening >3mm\n• Absent bowel wall enhancement\n• "Target sign" / halo appearance\n• Mesenteric fat stranding\n\n[CT Findings Atlas](#/info/ami-ct-findings)',
        citation: [1, 2, 3],
        next: 'ami-ct-necrosis',
        summary: 'CTA = gold standard (93-100% sens). Biphasic protocol. Do NOT wait for labs. Look for SMA occlusion, wall thickening.',
    },
    {
        id: 'ami-ct-necrosis',
        type: 'info',
        module: 2,
        title: 'CT Findings — Necrosis',
        body: '**Late/severe findings indicating NECROSIS:**\n\n| Finding | Specificity |\n|---------|-------------|\n| Pneumatosis intestinalis (bowel wall gas) | 97-100% |\n| Portal venous gas | 94-100% |\n| Free intraperitoneal air | Perforation |\n| Loss of bowel wall enhancement | Transmural |\n\n⚠️ **Pneumatosis + portal venous gas = transmural necrosis in 78-81%**\n\nThis is a **surgical emergency** — go directly to OR.',
        citation: [2, 3],
        next: 'ami-labs',
        summary: 'Pneumatosis + portal venous gas = transmural necrosis (78-81%). Surgical emergency.',
        safetyLevel: 'critical',
    },
    {
        id: 'ami-labs',
        type: 'info',
        module: 2,
        title: 'Laboratory Studies',
        body: '**Order but do NOT delay imaging:**\n\n| Test | Finding | Significance |\n|------|---------|-------------|\n| Lactate | >2 mmol/L | Irreversible ischemia (HR 4.1) |\n| Lactate | >3.8 mmol/L | Predicts mortality |\n| WBC | Leukocytosis | >90% but nonspecific |\n| D-dimer | >0.9 mg/L | 82% specificity, 60% sensitivity |\n| BMP | Metabolic acidosis | Late finding |\n| Amylase | Elevated ~50% | Risk of pancreatitis misdiagnosis |\n\n🛑 **CRITICAL: Normal lactate does NOT rule out AMI**\n\nLactate rises LATE when necrosis has occurred. WSES and ESVS recommend AGAINST using a single biomarker to confirm or exclude AMI.',
        citation: [2, 4],
        next: 'ami-cta-result',
        summary: 'Lactate >2 suggests irreversibility; >3.8 predicts mortality. BUT normal lactate does NOT rule out AMI.',
    },
    {
        id: 'ami-cta-result',
        type: 'question',
        module: 2,
        title: 'CTA Result',
        body: 'What does the CTA show?',
        options: [
            { label: 'SMA embolism (filling defect)', description: 'AMAE — arterial embolism', next: 'ami-amae' },
            { label: 'SMA thrombosis with atherosclerosis', description: 'AMAT — arterial thrombosis', next: 'ami-amat' },
            { label: 'SMV/portal vein thrombosis', description: 'MVT — venous thrombosis', next: 'ami-mvt' },
            { label: 'No occlusion but bowel wall changes', description: 'NOMI — non-occlusive', next: 'ami-nomi' },
            { label: 'Signs of necrosis (pneumatosis, portal gas)', description: 'Transmural necrosis — OR now', next: 'ami-peritonitis', urgency: 'critical' },
        ],
        summary: 'CTA determines type: AMAE (embolism), AMAT (thrombosis), MVT (venous), NOMI (non-occlusive), or necrosis → OR.',
    },
    // =====================================================================
    // MODULE 3: RESUSCITATION — THE 11 As
    // =====================================================================
    {
        id: 'ami-resus',
        type: 'info',
        module: 3,
        title: 'Resuscitation — The 11 As',
        body: '[The 11 As Checklist](#/info/ami-11as)\n\n**Start immediately while awaiting definitive treatment:**\n\n1. **Aggressive fluids** — LR boluses, blood products PRN\n2. **Address metabolic derangements** — correct acidosis, K+, Mg2+\n3. **Antibiotics** — [Pip-tazo 4.5g IV q6h](#/drug/piperacillin-tazobactam/ami)\n4. **Anticoagulation** — [Heparin](#/drug/heparin/ami) 80 U/kg bolus → 18 U/kg/hr\n5. **Analgesia** — IV opioids (do NOT withhold)\n6. **Avoid vasopressors** — worsen ischemia\n7. **Alleviate distension** — NG tube\n8. **Avoid hyperoxia** — target SpO2 96-99%\n9. **Advance directives** — discuss GOC early\n10. **Abdominal compartment syndrome** — monitor bladder pressures\n11. **All the help** — Vascular, General Surgery, IR, ICU',
        citation: [2, 4, 5],
        next: 'ami-anticoag',
        summary: 'The 11 As: Aggressive fluids, Antibiotics, Anticoagulation, Analgesia, Avoid vasopressors, consults.',
    },
    {
        id: 'ami-anticoag',
        type: 'info',
        module: 3,
        title: 'Anticoagulation — Start Early',
        body: '**Unfractionated Heparin (preferred):**\n\n• **Bolus:** [Heparin](#/drug/heparin/ami) 80 U/kg IV (max 5000 U)\n• **Infusion:** 18 U/kg/hr\n• **Goal aPTT:** 40-60 seconds\n\n**Why heparin:**\n• Can be rapidly reversed with protamine if surgery needed\n• Early anticoagulation improves survival\n• Prevents clot propagation\n\n🛑 **Do NOT delay anticoagulation waiting for surgery**\n\nStart immediately; it can be reversed if OR needed urgently.',
        citation: [2, 4],
        next: 'ami-abx',
        summary: 'Heparin 80 U/kg bolus → 18 U/kg/hr, goal aPTT 40-60. Start immediately — can reverse with protamine if needed.',
    },
    {
        id: 'ami-abx',
        type: 'info',
        module: 3,
        title: 'Antibiotics — Immediate',
        body: '**First-line: Piperacillin-Tazobactam**\n\n• [Pip-tazo](#/drug/piperacillin-tazobactam/ami) 4.5g IV q6h\n• Consider extended infusion (3-4 hours) for better tissue penetration\n• Excellent gut flora coverage (aerobic + anaerobic)\n\n**Alternative:** [Meropenem](#/drug/meropenem/ami) 1g IV q8h (if ESBL concern)\n\n**Rationale:**\n• Bacterial translocation occurs early in ischemia\n• Gut flora includes anaerobes, gram-negatives, enterococci\n• Delay worsens sepsis and mortality',
        citation: [2, 8],
        next: 'ami-vasopressors',
        summary: 'Pip-tazo 4.5g IV q6h (or meropenem 1g q8h). Covers gut flora. Start immediately for bacterial translocation.',
    },
    {
        id: 'ami-vasopressors',
        type: 'info',
        module: 3,
        title: 'Avoid Vasopressors',
        body: '🛑 **Vasopressors worsen mesenteric ischemia**\n\n**If absolutely required:**\n• **Norepinephrine + Dobutamine** combination\n• Dobutamine provides inotropic support, may offset norepi vasoconstriction\n• Minimize dose and duration\n\n❌ **Avoid vasopressin** — direct splanchnic vasoconstriction\n\n**NOMI patients:**\n• Already on vasopressors = the cause\n• Optimize cardiac output\n• Wean pressors as able\n• Consider papaverine infusion',
        citation: [2, 5],
        next: 'ami-type-branch',
        summary: 'Vasopressors worsen AMI. If required: norepi + dobutamine combo. Avoid vasopressin. Minimize dose.',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 4: TYPE-SPECIFIC TREATMENT
    // =====================================================================
    {
        id: 'ami-type-branch',
        type: 'question',
        module: 4,
        title: 'Type-Specific Treatment',
        body: 'Select the confirmed or suspected AMI type:\n\n(Based on CTA findings and clinical presentation)',
        options: [
            { label: 'AMAE — Arterial Embolism', description: 'SMA embolus, AFib history', next: 'ami-amae' },
            { label: 'AMAT — Arterial Thrombosis', description: 'Atherosclerosis, chronic symptoms', next: 'ami-amat' },
            { label: 'MVT — Venous Thrombosis', description: 'SMV/portal vein clot', next: 'ami-mvt' },
            { label: 'NOMI — Non-Occlusive', description: 'ICU patient, no occlusion on CTA', next: 'ami-nomi' },
        ],
        summary: 'Treatment differs by type: AMAE/AMAT (revascularization), MVT (anticoagulation), NOMI (treat underlying cause).',
    },
    {
        id: 'ami-amae',
        type: 'info',
        module: 4,
        title: 'AMAE — Arterial Embolism',
        body: '**No peritonitis → Endovascular first (if expertise available)**\n\n**Aspiration embolectomy:**\n• 88% technical success\n• 26% in-hospital mortality\n• 38% still require subsequent laparotomy\n\n**Surgical option:**\n• Fogarty catheter embolectomy via SMA arteriotomy\n• Observe bowel viability 10-15 min post-revascularization\n\n**Post-procedure:**\n• Anticoagulation (continue heparin)\n• Plan second-look laparotomy if any viability concern\n\n**With peritonitis:**\n→ Immediate laparotomy with simultaneous revascularization',
        citation: [2, 4],
        next: 'ami-surgery',
        summary: 'AMAE: Endovascular aspiration embolectomy (88% success) or surgical Fogarty embolectomy. 38% need laparotomy.',
    },
    {
        id: 'ami-amat',
        type: 'info',
        module: 4,
        title: 'AMAT — Arterial Thrombosis',
        body: '**No peritonitis → Endovascular preferred**\n\n**Angioplasty and stenting:**\n• 30-day mortality 17% (vs 38% open surgery)\n• Lower morbidity than open approach\n\n**Surgical options:**\n• Antegrade aortomesenteric bypass (preferred)\n• Autogenous saphenous vein if bowel perforation present\n• Transaortic endarterectomy\n\n**Hybrid approach (ROMS):**\n• Retrograde open mesenteric stenting\n• Combines laparotomy with endovascular\n• Patency rates 76-88%\n\n**With peritonitis:**\n→ Laparotomy + revascularization simultaneously',
        citation: [2, 4],
        next: 'ami-surgery',
        summary: 'AMAT: Endovascular stenting (17% mortality) > open surgery (38%). Hybrid ROMS for complex cases.',
    },
    {
        id: 'ami-mvt',
        type: 'info',
        module: 4,
        title: 'MVT — Venous Thrombosis',
        body: '**Primary treatment: Anticoagulation**\n\n**Unfractionated heparin:**\n• Continuous infusion\n• Early heparin improves survival\n\n**Surgery only if peritonitis develops**\n\n**Duration:**\n• Minimum 6 months anticoagulation\n• Lifelong if underlying hypercoagulability identified\n\n**Thrombolytics:**\n• Rarely indicated\n• SMA thrombolysis ineffective with increased bleeding risk\n\n**Workup:**\n• Hypercoagulability panel\n• Malignancy screening (CT chest/abd/pelvis)',
        citation: [2, 4],
        next: 'ami-disposition',
        summary: 'MVT: Anticoagulation is primary treatment. Surgery only if peritonitis. 6 months minimum, lifelong if hypercoagulable.',
    },
    {
        id: 'ami-nomi',
        type: 'info',
        module: 4,
        title: 'NOMI — Non-Occlusive',
        body: '**Primary treatment: Correct the underlying cause**\n\n**The cause is usually:**\n• Vasopressor use (norepi, vasopressin)\n• Cardiogenic shock\n• Severe sepsis\n• Post-cardiac surgery\n\n**Management:**\n• Optimize cardiac output\n• Aggressive fluid resuscitation\n• STOP or minimize vasopressors\n• Systemic heparin\n\n**Papaverine infusion:**\n• [Papaverine](#/drug/papaverine/nomi) 30-60 mg/hr into SMA catheter\n• Continue ≥24 hours\n• Associated with lower mortality and reduced surgery need\n• ⚠️ Incompatible with heparin in same line\n\n**Mortality: 70-90%** — even with optimal treatment',
        citation: [2, 5],
        next: 'ami-disposition',
        summary: 'NOMI: Treat underlying cause (reduce vasopressors, optimize CO). Papaverine 30-60 mg/hr into SMA. Mortality 70-90%.',
    },
    // =====================================================================
    // MODULE 5: SURGICAL CONSIDERATIONS
    // =====================================================================
    {
        id: 'ami-surgery',
        type: 'info',
        module: 5,
        title: 'Surgical Considerations',
        body: '**Intraoperative bowel viability assessment:**\n\n• Visual inspection: Pink/healthy vs red/edematous vs black/necrotic\n• Peristalsis assessment\n• Doppler flow\n• Fluorescein angiography: 1g IV, Wood lamp (viable bowel fluoresces)\n\n**Damage control surgery if:**\n• Severe physiologic compromise\n• Extensive intestinal resection\n• Severe abdominal sepsis\n\n**Anastomosis:**\n• Hand-sewn preferred (bowel edema increases stapler leak risk)\n• Consider delayed anastomosis if viability uncertain',
        citation: [2, 4],
        next: 'ami-second-look',
        summary: 'Assess viability: visual, Doppler, fluorescein. Damage control if unstable. Hand-sewn anastomosis preferred.',
    },
    {
        id: 'ami-second-look',
        type: 'info',
        module: 5,
        title: 'Second-Look Laparotomy',
        body: '**Timing:** 24-48 hours after initial surgery\n\n**Indications:**\n• Questionable bowel viability at initial surgery\n• Extensive involvement\n• MVT with significant mesenteric involvement\n\n**Purpose:**\n• Reassess viability after revascularization\n• Resect additional necrotic segments (occurs in 53%)\n• Avoid unnecessary resection of potentially viable bowel\n\n⚠️ **Do NOT skip second-look** if any viability concern at initial surgery',
        citation: [2, 4],
        next: 'ami-disposition',
        summary: 'Second-look at 24-48h if viability uncertain. 53% require additional resection. Do not skip if any concern.',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'ami-disposition',
        type: 'info',
        module: 6,
        title: 'Disposition',
        body: '**ALL patients with confirmed AMI → ICU admission**\n\n**Post-operative monitoring:**\n• Serial lactate clearance\n• Central venous oxygen saturation\n• Hemodynamics\n\n**Continue:**\n• Heparin infusion (aPTT 40-60)\n• Broad-spectrum antibiotics (minimum 4 days)\n• Enteral nutrition when tolerated',
        citation: [2],
        next: 'ami-longterm',
        summary: 'All AMI patients to ICU. Monitor lactate clearance, CVP. Continue heparin and antibiotics.',
    },
    {
        id: 'ami-longterm',
        type: 'info',
        module: 6,
        title: 'Long-Term Management',
        body: '**Anticoagulation duration:**\n\n| Indication | Duration |\n|------------|----------|\n| Post-stent | Clopidogrel 6 months + lifelong ASA |\n| MVT | Minimum 6 months; lifelong if hypercoagulable |\n| AFib | Lifelong anticoagulation |\n\n**Follow-up:**\n• CTA or duplex within 6 months, then annually\n• Cardiac evaluation\n• Carotid duplex if diffuse atherosclerosis\n\n**Prognosis:**\n• 30-day mortality: 17-51% depending on approach\n• Short bowel syndrome risk if extensive resection\n• Teduglutide (GLP-2 analog) can reduce TPN dependence',
        citation: [2, 4],
        next: 'ami-end',
        summary: 'Long-term anticoag based on type. CTA/duplex follow-up. 30-day mortality 17-51%. Short bowel syndrome risk.',
    },
    {
        id: 'ami-end',
        type: 'info',
        module: 6,
        title: 'AMI Management Complete',
        body: '**Key Takeaways:**\n\n1. **Pain out of proportion = AMI until proven otherwise**\n2. **CTA immediately** — do NOT wait for labs\n3. **Normal lactate does NOT rule out AMI**\n4. **Start heparin and antibiotics immediately**\n5. **Avoid vasopressors** — worsen ischemia\n6. **Peritonitis = OR immediately**\n7. **Type determines treatment**: AMAE/AMAT (revascularize), MVT (anticoag), NOMI (treat cause)\n\n[AMI Stop Page](#/info/mesenteric-ischemia-stop)',
        citation: [1, 2],
        summary: 'AMI complete. Pain out of proportion, CTA now, heparin + abx, avoid pressors, type-specific treatment.',
    },
];
// =====================================================================
// MODULE LABELS
// =====================================================================
export const MESENTERIC_ISCHEMIA_MODULE_LABELS = [
    'Recognition',
    'Diagnostic Workup',
    'Resuscitation',
    'Type-Specific Treatment',
    'Surgical Considerations',
    'Disposition',
];
// =====================================================================
// TOOLBAR CONFIG
// =====================================================================
export const MESENTERIC_ISCHEMIA_TOOLBAR_CONFIG = {
    defaultTools: ['heparin', 'piperacillin-tazobactam', 'ami-11as', 'ami-ct-findings', 'lactate-clearance'],
    contextualTools: {
        'ami-nomi': ['papaverine'],
        'ami-anticoag': ['heparin'],
    },
};
// =====================================================================
// CITATIONS
// =====================================================================
export const MESENTERIC_ISCHEMIA_CITATIONS = [
    { num: 1, text: 'EB Medicine: Diagnosis and Management of Acute Mesenteric Ischemia in the ED. Dec 2024.' },
    { num: 2, text: 'WSES 2022 Updated Guidelines: Acute Mesenteric Ischemia. World J Emerg Surg. PMC9580452.' },
    { num: 3, text: 'StatPearls: Acute Mesenteric Ischemia. NCBI Bookshelf NBK431068.' },
    { num: 4, text: 'ESVS 2025 Clinical Practice Guidelines: Mesenteric and Renal Artery Disease.' },
    { num: 5, text: 'Medscape: Acute Mesenteric Ischemia Treatment & Management.' },
    { num: 6, text: 'AHRQ PSNet: Delayed Diagnosis of Mesenteric Ischemia. Patient Safety Case Study.' },
    { num: 7, text: 'SAEM Mesenteric Ischemia Teaching Module.' },
    { num: 8, text: 'Thrombosis J: Antibiotic Use in Acute Mesenteric Ischemia. PMC10088293.' },
];
