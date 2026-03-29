// MedKitt — Brugada Syndrome
// ED recognition, risk stratification, and management
// 5 modules: Recognition → Diagnosis → Risk → Acute Management → Disposition
// Based on 2022 ESC Guidelines and HRS/EHRA Expert Consensus
export const BRUGADA_SYNDROME_NODES = [
    // ===================================================================
    // MODULE 1: Recognition & Initial Assessment
    // ===================================================================
    {
        id: 'brugada-start',
        type: 'info',
        module: 1,
        title: 'Brugada Syndrome',
        body: '[Brugada Summary](#/info/brugada-summary) — inherited channelopathy with SCD risk.\n\n**Brugada syndrome (BrS)** is an inherited sodium channelopathy causing distinctive ECG patterns and ventricular fibrillation risk.\n\n**Key features:**\n• **Type 1 ECG pattern** = diagnostic (coved ST elevation ≥2mm in V1-V3)\n• Male predominance (8:1)\n• Mean age of events: 40 years\n• Often presents with syncope, VF, or sudden death\n• **Undiagnosed BrS has ~10% annual mortality**\n\n**Triggers:**\n• Fever (most common)\n• Sodium channel blocking drugs\n• Vagal stimulation, large meals\n• Cocaine use',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'brugada-shanghai', label: 'Shanghai Score' },
            { id: 'brugada-drugs-avoid', label: 'Drugs to Avoid' },
        ],
        next: 'brugada-presentation',
    },
    {
        id: 'brugada-presentation',
        type: 'question',
        module: 1,
        title: 'Clinical Presentation',
        body: '**How did this patient present?**\n\n**High-risk presentations:**\n• Cardiac arrest/VF\n• Syncope (especially nocturnal or at rest)\n• Nocturnal agonal breathing\n\n**Incidental findings:**\n• ECG obtained for other reason\n• Family screening\n• Pre-operative evaluation\n\n**Consider Brugada if:**\n• Young patient with unexplained syncope\n• Family history of sudden death <45 years\n• Syncope with fever',
        citation: [1, 2],
        options: [
            { label: 'Cardiac arrest / VF', description: 'Resuscitated or ongoing', next: 'brugada-arrest' },
            { label: 'Syncope / Near-syncope', description: 'Concerning for arrhythmic cause', next: 'brugada-syncope' },
            { label: 'Incidental ECG finding', description: 'Asymptomatic, ECG abnormality noted', next: 'brugada-ecg-patterns' },
            { label: 'Known Brugada with complication', description: 'Fever, ICD shocks, medication concern', next: 'brugada-known-complication' },
        ],
    },
    // ===================================================================
    // MODULE 2: ECG Pattern Recognition
    // ===================================================================
    {
        id: 'brugada-ecg-patterns',
        type: 'info',
        module: 2,
        title: 'ECG Pattern Types',
        body: '**Brugada ECG Patterns:**\n\n**Type 1 (Coved) — DIAGNOSTIC**\n• Coved ST elevation ≥2mm in ≥1 lead (V1-V3)\n• Followed by T-wave inversion\n• Concave or straight ST descent below baseline\n• **This is the ONLY diagnostic pattern**\n\n**Type 2 (Saddleback) — SUGGESTIVE ONLY**\n• Saddleback ST elevation ≥0.5mm\n• J-point elevation ≥1mm\n• Positive or biphasic T wave\n• Requires provocation test if clinical suspicion\n\n**Type 3 — No longer considered diagnostic**\n• Now considered normal variant\n\n**Tip: Use HIGH precordial leads**\n• Place V1/V2 in 2nd or 3rd intercostal space\n• Increases sensitivity for detecting patterns',
        citation: [2, 3],
        calculatorLinks: [
            { id: 'brugada-shanghai', label: 'Shanghai Score' },
        ],
        next: 'brugada-phenocopy-check',
    },
    {
        id: 'brugada-phenocopy-check',
        type: 'question',
        module: 2,
        title: 'Rule Out Brugada Phenocopies',
        body: '**Brugada phenocopies** mimic BrS but are caused by reversible conditions.\n\n**Check for:**\n\n**Metabolic:**\n• Hyperkalemia (most common)\n• Hyponatremia, hypocalcemia\n• Hypothermia, acidosis\n\n**Structural:**\n• Pulmonary embolism\n• Anterior MI / RV infarct\n• Myocarditis, pericarditis\n\n**Mechanical:**\n• Tension pneumothorax\n• Mediastinal mass\n\n**Technical:**\n• Lead misplacement (V1/V2 too high)\n\n**Phenocopy resolves with treatment of underlying cause.**\n\nAny reversible cause identified?',
        citation: [3, 4],
        options: [
            { label: 'Yes — reversible cause found', description: 'Treat underlying condition', next: 'brugada-phenocopy-manage' },
            { label: 'No — true Brugada suspected', description: 'Continue workup', next: 'brugada-shanghai-assessment' },
            { label: 'Unclear — need workup', description: 'Labs and imaging needed', next: 'brugada-phenocopy-workup' },
        ],
    },
    {
        id: 'brugada-phenocopy-manage',
        type: 'info',
        module: 2,
        title: 'Brugada Phenocopy',
        body: '**Brugada Phenocopy — Treat Underlying Cause**\n\n**Management:**\n• Correct the underlying condition\n• ECG pattern should resolve\n• Repeat ECG after correction\n\n**If phenocopy:**\n• No long-term Brugada management needed\n• No ICD indication\n• No drug restrictions\n\n**If pattern persists after correction:**\n• May have true BrS unmasked by stressor\n• Proceed with Brugada evaluation\n• EP consultation recommended\n\n**Document:**\n• Pre- and post-treatment ECGs\n• Clear diagnosis of phenocopy vs true BrS',
        citation: [4],
        next: undefined,
    },
    {
        id: 'brugada-phenocopy-workup',
        type: 'info',
        module: 2,
        title: 'Phenocopy Workup',
        body: '**Labs to rule out phenocopies:**\n\n• BMP (K+, Na+, Ca++, glucose)\n• Magnesium\n• ABG/VBG (acidosis)\n• Troponin (MI)\n• D-dimer if PE suspected\n\n**Imaging:**\n• CXR (pneumothorax, mediastinal mass)\n• Echo (RV strain, pericardial effusion)\n\n**Temperature:**\n• Check for hypothermia or fever\n\n**If all negative:**\n• True Brugada syndrome likely\n• Proceed with Shanghai score assessment\n\n**If positive:**\n• Treat condition, repeat ECG\n• Pattern should resolve',
        citation: [3, 4],
        next: 'brugada-shanghai-assessment',
    },
    {
        id: 'brugada-shanghai-assessment',
        type: 'info',
        module: 2,
        title: 'Shanghai Score Assessment',
        body: '**Shanghai Diagnostic Score for Brugada Syndrome:**\n\n| Component | Points |\n|-----------|--------|\n| **ECG** | |\n| Spontaneous Type 1 | 3.5 |\n| Fever-induced Type 1 | 3.0 |\n| Drug-induced Type 1 | 2.0 |\n| **Clinical** | |\n| Cardiac arrest / documented VF | 3.0 |\n| Nocturnal agonal breathing | 2.0 |\n| Suspected arrhythmic syncope | 2.0 |\n| Unclear syncope | 1.0 |\n| AF/flutter <30 years | 0.5 |\n| **Family History** | |\n| 1st/2nd degree relative with BrS | 2.0 |\n| Suspicious SCD in relative | 1.0 |\n| Unexplained SCD <45y (neg autopsy) | 0.5 |\n| **Genetics** | |\n| Pathogenic SCN5A variant | 0.5 |\n\n**Interpretation:**\n• **≥3.5** = Probable/Definite BrS\n• **2-3** = Possible BrS\n• **<2** = Non-diagnostic',
        citation: [2, 3],
        calculatorLinks: [
            { id: 'brugada-shanghai', label: 'Shanghai Score' },
        ],
        next: 'brugada-risk-stratification',
    },
    // ===================================================================
    // MODULE 3: Risk Stratification
    // ===================================================================
    {
        id: 'brugada-syncope',
        type: 'info',
        module: 3,
        title: 'Syncope Evaluation',
        body: '**Syncope in suspected Brugada:**\n\n**High-risk features (arrhythmic syncope):**\n• Occurs at rest or during sleep\n• No prodrome (sudden loss of consciousness)\n• Associated with palpitations\n• Brief duration\n• Nocturnal occurrence\n\n**Lower-risk features:**\n• Clear vasovagal trigger\n• Typical prodrome (nausea, diaphoresis)\n• Prolonged standing\n• Situational (micturition, defecation)\n\n**If Type 1 ECG + arrhythmic syncope:**\n• **High-risk combination**\n• ICD discussion warranted (Class IIa)\n• Admit for monitoring\n• EP consultation',
        citation: [1, 5],
        next: 'brugada-risk-stratification',
    },
    {
        id: 'brugada-arrest',
        type: 'info',
        module: 3,
        title: 'Cardiac Arrest / VF',
        body: '**Cardiac arrest with suspected Brugada:**\n\n**Immediate management:**\n• Standard ACLS\n• Post-arrest care if ROSC\n\n**⚠️ AVOID in resuscitation:**\n• Amiodarone (may worsen BrS)\n• Procainamide\n• Flecainide\n\n**If VF refractory:**\n• Consider isoproterenol (suppresses VF in BrS)\n\n**Post-ROSC:**\n• 12-lead ECG (Type 1 pattern?)\n• Continuous monitoring\n• Check temperature (fever-induced?)\n• EP consultation STAT\n\n**ICD indication:**\n• **Class I** — Survivors of cardiac arrest from VF\n• Essentially all survivors should receive ICD',
        citation: [1, 5],
        next: 'brugada-risk-stratification',
    },
    {
        id: 'brugada-risk-stratification',
        type: 'question',
        module: 3,
        title: 'Risk Stratification',
        body: '**Risk factors for SCD in Brugada:**\n\n**High risk:**\n• Prior cardiac arrest (highest)\n• Documented spontaneous sustained VT\n• Arrhythmic syncope + spontaneous Type 1 ECG\n\n**Intermediate risk:**\n• Spontaneous Type 1 ECG (vs drug-induced)\n• Family history of SCD\n• QRS fragmentation\n• Inducible VF on EPS (controversial)\n\n**Lower risk:**\n• Drug-induced only pattern\n• Asymptomatic\n• No family history\n\n**Annual event rates:**\n• Asymptomatic: ~0.5%\n• Prior syncope: ~1.9%\n• Prior arrest: much higher\n\nWhat is this patient\'s risk category?',
        citation: [5, 6],
        options: [
            { label: 'High risk (arrest, VT, arrhythmic syncope)', description: 'ICD indicated', next: 'brugada-icd-indication' },
            { label: 'Intermediate risk (symptoms, family hx)', description: 'Risk/benefit discussion', next: 'brugada-intermediate-risk' },
            { label: 'Low risk (asymptomatic, drug-induced only)', description: 'Observation appropriate', next: 'brugada-low-risk' },
        ],
    },
    {
        id: 'brugada-icd-indication',
        type: 'info',
        module: 3,
        title: 'ICD Indications',
        body: '**ICD Recommendations (2022 ESC Guidelines):**\n\n**Class I (Definite):**\n• Survivors of cardiac arrest from VF/sustained VT\n• Documented spontaneous sustained VT\n\n**Class IIa (Reasonable):**\n• Spontaneous Type 1 ECG + arrhythmic syncope\n• Spontaneous Type 1 ECG + ≥2 multiparametric risk factors\n\n**Class III (Not Recommended):**\n• Asymptomatic with drug-induced only pattern\n• Type 2/3 pattern alone\n\n**Disposition:**\n• Admit to telemetry\n• EP consultation for ICD discussion\n• Continue cardiac monitoring\n• Aggressive fever control if present',
        citation: [1, 5],
        next: 'brugada-disposition',
    },
    {
        id: 'brugada-intermediate-risk',
        type: 'info',
        module: 3,
        title: 'Intermediate Risk Management',
        body: '**Intermediate risk Brugada — shared decision making:**\n\n**Options:**\n\n**1. ICD implantation**\n• Definitive protection against SCD\n• Complications: inappropriate shocks, infection, lead issues\n• Lifelong device management\n\n**2. Quinidine therapy**\n• Class IIa indication\n• 88% effective at suppressing VF induction\n• Side effects: GI, thrombocytopenia\n• Availability issues in some regions\n\n**3. Close surveillance**\n• Lifestyle modifications\n• Aggressive fever treatment\n• Drug avoidance\n• Regular EP follow-up\n• Consider implantable loop recorder\n\n**Factors favoring ICD:**\n• Spontaneous Type 1 (not drug-induced)\n• Strong family history SCD\n• Syncope of any type\n• QRS fragmentation on ECG',
        citation: [5, 6],
        next: 'brugada-disposition',
    },
    {
        id: 'brugada-low-risk',
        type: 'info',
        module: 3,
        title: 'Low Risk / Asymptomatic',
        body: '**Asymptomatic Brugada — observation appropriate:**\n\n**Annual event rate: ~0.5%** (vs 0.4% background mortality)\n\n**Management:**\n• Lifestyle modifications\n• Aggressive fever treatment (antipyretics immediately)\n• Drug avoidance list (provide to patient)\n• Avoid cocaine, cannabis, excessive alcohol\n• EP follow-up for ongoing risk assessment\n\n**Patient education:**\n• Symptoms to watch for (syncope, palpitations)\n• Fever management protocol\n• Drug list for all providers (anesthesia, dental)\n• Family screening discussion\n\n**Follow-up:**\n• Outpatient EP referral\n• Consider genetic testing\n• Periodic risk reassessment',
        citation: [5, 6],
        calculatorLinks: [
            { id: 'brugada-drugs-avoid', label: 'Drugs to Avoid' },
        ],
        next: 'brugada-disposition',
    },
    // ===================================================================
    // MODULE 4: Acute Management / Complications
    // ===================================================================
    {
        id: 'brugada-known-complication',
        type: 'question',
        module: 4,
        title: 'Known Brugada — Complication Type',
        body: '**Patient with known Brugada syndrome presenting with complication:**\n\nWhat is the presenting issue?',
        citation: [1],
        options: [
            { label: 'Fever', description: 'Can unmask/worsen pattern', next: 'brugada-fever' },
            { label: 'ICD shocks', description: 'Single or multiple', next: 'brugada-icd-shocks' },
            { label: 'Electrical storm', description: '≥3 VF/VT episodes per day', next: 'brugada-storm' },
            { label: 'Medication concern', description: 'Exposed to contraindicated drug', next: 'brugada-drug-exposure' },
        ],
    },
    {
        id: 'brugada-fever',
        type: 'info',
        module: 4,
        title: 'Fever Management',
        body: '**Fever in Brugada Syndrome — TREAT AGGRESSIVELY**\n\n**Why fever is dangerous:**\n• Temperature-sensitive sodium channels (SCN5A)\n• Fever unmasks Type 1 pattern 20× more frequently\n• 40% recurrence rate with subsequent fevers\n• Can trigger VF\n\n**Management protocol:**\n\n**1. Aggressive antipyresis:**\n• Acetaminophen 1000 mg q6h (IV if available)\n• Ibuprofen 400-600 mg q6h (if no contraindications)\n• **Do not wait for high fever — treat early**\n\n**2. External cooling if refractory:**\n• Cooling blankets\n• Ice packs to axillae/groin\n• Arctic Sun device if available\n\n**3. Continuous cardiac monitoring**\n\n**4. Treat underlying cause** (infection, etc.)\n\n**Admission criteria:**\n• Febrile patient without ICD → ADMIT\n• New Type 1 pattern with fever → ADMIT\n• History of fever-triggered events → ADMIT',
        citation: [7, 8],
        next: 'brugada-disposition',
    },
    {
        id: 'brugada-icd-shocks',
        type: 'question',
        module: 4,
        title: 'ICD Shocks',
        body: '**ICD shocks in Brugada patient:**\n\n**Assess:**\n• Number of shocks in past 24 hours\n• Circumstances (fever, medication, activity)\n• Symptoms before shocks\n\n**Device interrogation needed** to confirm:\n• Appropriate vs inappropriate shocks\n• VF/VT vs SVT vs artifact\n\nHow many shocks in the past 24 hours?',
        citation: [1, 8],
        options: [
            { label: '1-2 shocks', description: 'May be appropriate therapy', next: 'brugada-few-shocks' },
            { label: '≥3 shocks (electrical storm)', description: 'Urgent intervention needed', next: 'brugada-storm' },
        ],
    },
    {
        id: 'brugada-few-shocks',
        type: 'info',
        module: 4,
        title: 'Isolated ICD Shocks',
        body: '**1-2 ICD shocks — evaluation:**\n\n**Immediate:**\n• Continuous cardiac monitoring\n• 12-lead ECG\n• Check temperature (fever?)\n• Review medications\n• Magnet available at bedside\n\n**Device interrogation (EP/cardiology):**\n• Confirm appropriate vs inappropriate\n• Review stored episodes\n• Check lead integrity\n\n**If appropriate shocks (VF terminated):**\n• Assess for triggers (fever, drugs, ischemia)\n• May need medication adjustment\n• Admit for observation\n\n**If inappropriate shocks (SVT, artifact, lead issue):**\n• Address underlying cause\n• May need reprogramming\n• Consider lead revision if fractured',
        citation: [8],
        next: 'brugada-disposition',
    },
    {
        id: 'brugada-storm',
        type: 'info',
        module: 4,
        title: 'Electrical Storm Protocol',
        body: '**Electrical Storm (≥3 VF/VT episodes/day) — EMERGENCY**\n\n**First-line: ISOPROTERENOL**\n\n**Mechanism:** Increases HR → decreases J-point → suppresses VF\n\n**Protocol:**\n• **Bolus:** 1-2 mcg IV\n• **Infusion:** 0.15-2.0 mcg/min\n• **Target:** 20% increase in heart rate\n• **Duration:** Continue until stable (mean 24±13 days)\n\n**Add QUINIDINE when stable:**\n• 200 mg PO TID → increase to 400 mg TID\n• Allows weaning of isoproterenol in 24-48h\n\n**❌ DO NOT USE:**\n• **Beta-blockers** — ineffective\n• **Amiodarone** — may worsen\n• **Lidocaine** — ineffective\n• **Flecainide/propafenone** — will worsen\n\n**If refractory:**\n• Catheter ablation (RVOT epicardial substrate)\n• Consult EP urgently',
        citation: [8, 9],
        calculatorLinks: [
            { id: 'brugada-vf-storm', label: 'VF Storm Protocol' },
        ],
        next: 'brugada-disposition',
    },
    {
        id: 'brugada-drug-exposure',
        type: 'info',
        module: 4,
        title: 'Drug Exposure Management',
        body: '**Exposed to contraindicated medication:**\n\n**Immediate actions:**\n• Discontinue offending agent\n• Continuous cardiac monitoring\n• Serial 12-lead ECGs\n• Check for Type 1 pattern unmasking\n\n**High-risk drugs (AVOID):**\n• Class 1A/1C antiarrhythmics\n• Tricyclic antidepressants\n• Lithium\n• Cocaine\n• Flecainide, propafenone, procainamide\n\n**Monitoring duration:**\n• Depends on drug half-life\n• Ajmaline: minutes\n• Procainamide: 3-4 hours\n• Flecainide: 20 hours\n• TCAs: 24+ hours\n\n**If VF/VT develops:**\n• Isoproterenol protocol\n• ACLS (avoid amiodarone)',
        citation: [7, 8],
        calculatorLinks: [
            { id: 'brugada-drugs-avoid', label: 'Drugs to Avoid' },
        ],
        next: 'brugada-disposition',
    },
    // ===================================================================
    // MODULE 5: Disposition
    // ===================================================================
    {
        id: 'brugada-disposition',
        type: 'info',
        module: 5,
        title: 'Disposition',
        body: '**Admission Criteria:**\n\n**ADMIT to telemetry/ICU:**\n• Cardiac arrest / VF survivor\n• Electrical storm\n• New Type 1 ECG with syncope or concerning symptoms\n• Febrile Brugada patient without ICD\n• Multiple ICD shocks\n• Drug exposure with ECG changes\n\n**May discharge with close EP follow-up:**\n• Asymptomatic incidental finding\n• Drug-induced only pattern (confirmed)\n• Known Brugada, routine visit, no acute issue\n• Stable with ICD, single appropriate shock, no ongoing arrhythmia\n\n**Discharge requirements:**\n• Drug avoidance list provided\n• Fever management instructions\n• Return precautions (syncope, palpitations)\n• EP appointment scheduled\n• Family screening discussed',
        citation: [1, 5],
        calculatorLinks: [
            { id: 'brugada-drugs-avoid', label: 'Drugs to Avoid' },
        ],
        next: undefined,
    },
];
export const BRUGADA_SYNDROME_CITATIONS = [
    { num: 1, text: '2022 ESC Guidelines for ventricular arrhythmias and prevention of sudden cardiac death. Eur Heart J. 2022;43(40):3997-4126.' },
    { num: 2, text: 'Priori SG, et al. HRS/EHRA/APHRS Expert Consensus on Inherited Primary Arrhythmia Syndromes. Heart Rhythm. 2013;10(12):1932-1963.' },
    { num: 3, text: 'Probst V, et al. Shanghai Score System for Diagnosis of Brugada Syndrome. JACC Clin Electrophysiol. 2018;4(6):742-750.' },
    { num: 4, text: 'Anselm DD, et al. Brugada phenocopy: a new electrocardiogram phenomenon. World J Cardiol. 2014;6(3):81-86.' },
    { num: 5, text: 'Antzelevitch C, et al. Brugada syndrome: report of the second consensus conference. Circulation. 2005;111(5):659-670.' },
    { num: 6, text: 'Sieira J, et al. Prognostication in Brugada syndrome using right ventricular programmed stimulation. Circ Arrhythm Electrophysiol. 2015;8(5):1140-1147.' },
    { num: 7, text: 'Postema PG, et al. Drugs and Brugada syndrome: consensus report. Heart Rhythm. 2009;6(11):1335-1341.' },
    { num: 8, text: 'Nademanee K, et al. Isoproterenol in Brugada syndrome: prevention of ventricular fibrillation. Circulation. 2000;102(11):1307-1310.' },
    { num: 9, text: 'Pappone C, et al. Epicardial ablation in Brugada syndrome. Circ Arrhythm Electrophysiol. 2017;10(6):e005053.' },
];
export const BRUGADA_SYNDROME_NODE_COUNT = BRUGADA_SYNDROME_NODES.length;
export const BRUGADA_SYNDROME_MODULE_LABELS = ['Recognition', 'ECG Patterns', 'Risk Stratification', 'Acute Management', 'Disposition'];
