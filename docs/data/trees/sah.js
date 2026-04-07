// MedKitt — Subarachnoid Hemorrhage
// Diagnostic workup and ED management of spontaneous SAH
// 5 modules: Recognition → Diagnostics → Severity → ED Management → Disposition
// 25 nodes total.
// ───────────────────────────────────────────────
// Module 1 — Recognition & Assessment
// ───────────────────────────────────────────────
const SAH_START = {
    id: 'sah-start',
    type: 'info',
    module: 1,
    title: 'Subarachnoid Hemorrhage',
    body: '[SAH Steps Summary](#/info/sah-summary) — quick reference.\n\nSpontaneous SAH (sSAH) results from extravasation of blood into the CSF. **85% are caused by aneurysm rupture.** 10% are nonaneurysmal perimesencephalic hemorrhage (better prognosis).\n\n• Incidence: ~10 per 100,000/year in the US\n• Mortality: ~40% at 1 week; 10-15% die prehospital\n• Misdiagnosis rate: up to 5% on initial ED visit\n• Delayed or missed diagnosis → significantly worse outcomes\n\n**Risk factors:** Hypertension, smoking, heavy alcohol use, cocaine, family history of aSAH, polycystic kidney disease, connective tissue disorders, female sex.',
    citation: [1, 2, 3],
    next: 'sah-presentation',
};
const SAH_PRESENTATION = {
    id: 'sah-presentation',
    type: 'info',
    module: 1,
    title: 'Clinical Presentation',
    body: '**Classic:** Sudden-onset severe headache ("worst headache of my life") peaking within seconds — **thunderclap headache**. Neither sensitive nor specific for SAH.\n\n• 10-16% of thunderclap headaches are SAH\n• 70% present with headache alone, no focal symptoms\n• **Normal neurologic exam in 75%** of aSAH patients\n• Transient LOC in ~25%\n• Vomiting in ~70%; neck stiffness in ~60%\n• Seizures or cranial nerve palsies suggest serious pathology\n\n**Atypical presentations:**\n• Isolated neck/back pain (8% have no headache)\n• General malaise without typical headache\n• Sentinel/warning headache (10-43%) days to weeks before major SAH — **10x higher rebleeding risk**\n\n**Key pearl:** No headache features reliably distinguish SAH from benign causes. Pain responding to analgesics does NOT exclude SAH.',
    citation: [1, 4, 13, 14],
    next: 'sah-ottawa',
};
const SAH_OTTAWA = {
    id: 'sah-ottawa',
    type: 'question',
    module: 1,
    title: 'Ottawa SAH Rule',
    body: 'For patients with **acute nontraumatic headache** reaching maximal intensity within 1 hour and a **normal neurologic examination**, apply the Ottawa SAH Rule.\n\n**Further workup required if ANY present:**\n• Age ≥40 years\n• Neck pain or stiffness\n• Witnessed loss of consciousness\n• Onset during exertion\n• Thunderclap headache (peaks within 1 minute)\n• Limited neck flexion on examination\n\nSensitivity **100%** (validation studies). Specificity 27.5%.\n\n2019 ACEP Clinical Policy supports using this rule to identify patients who may not require imaging.',
    citation: [1, 4, 15],
    calculatorLinks: [{ id: 'ottawa-sah', label: 'Ottawa SAH Rule' }],
    options: [
        {
            label: '≥1 criteria present',
            description: 'Patient meets one or more Ottawa SAH Rule criteria',
            next: 'sah-ct',
            urgency: 'urgent',
        },
        {
            label: 'All criteria absent',
            description: 'No criteria present — may avoid imaging per ACEP 2019',
            next: 'sah-low-risk',
            urgency: 'routine',
        },
    ],
};
const SAH_LOW_RISK = {
    id: 'sah-low-risk',
    type: 'result',
    module: 1,
    title: 'Ottawa Rule Negative — Low Risk',
    body: 'Patient meets **no Ottawa SAH Rule criteria** (age <40, no neck pain/stiffness, no LOC, no exertional onset, no thunderclap, normal neck flexion).\n\n2019 ACEP Clinical Policy supports that these patients may not require imaging for SAH.\n\n**However**, if clinical suspicion remains high based on overall presentation, proceeding with CT is still appropriate. The rule is designed to identify the lowest-risk cohort, not to replace clinical judgment.\n\n**Discharge instructions:**\n• Return immediately for worsening headache, new neurologic symptoms, or altered consciousness\n• Follow up with primary care within 1-2 weeks',
    recommendation: 'Low-risk per Ottawa SAH Rule — may discharge with return precautions if clinical suspicion is low',
    confidence: 'recommended',
    citation: [1, 4, 15],
};
// ───────────────────────────────────────────────
// Module 2 — Diagnostic Workup
// ───────────────────────────────────────────────
const SAH_CT = {
    id: 'sah-ct',
    type: 'info',
    module: 2,
    title: 'Noncontrast CT Head',
    body: 'The initial test for suspected sSAH is **noncontrast head CT**. CT sensitivity is time-dependent — blood is degraded and diluted by CSF circulation over time.\n\n**CT sensitivity by timing:**\n• Within 6 hours: **98.7%** (meta-analysis of 8,907 patients)\n• Day 0: 92-100%\n• Day 1: 86%\n• Day 2: 76%\n• Day 5: 58%\n\n**Conditions for highest sensitivity (≤6h):**\n• Third-generation or newer scanner\n• Interpreted by attending radiologist\n• Normal neurologic examination\n• Normal hematocrit (anemia may make blood isodense with CSF)\n\n**Key pearl:** A negative CT does not rule out SAH, especially with later presentations.',
    citation: [1, 5, 6],
    next: 'sah-ct-result',
};
const SAH_CT_RESULT = {
    id: 'sah-ct-result',
    type: 'question',
    module: 2,
    title: 'CT Result',
    body: 'Interpret the noncontrast head CT result in the context of **time from symptom onset.**\n\n**CT positive:** Hyperdensity in the basal cisterns (typical aneurysmal pattern) or cerebral convexities (consider traumatic or convexal SAH).\n\n**CT negative ≤6h:** In a prospective study of 3,132 patients, CT within 6 hours had 100% sensitivity. A meta-analysis reports 98.7% sensitivity with appropriate conditions.\n\n**CT negative >6h:** Sensitivity decreases progressively — additional testing is needed.',
    citation: [5, 6, 13],
    options: [
        {
            label: 'CT positive for SAH',
            description: 'Subarachnoid blood identified',
            next: 'sah-confirmed',
            urgency: 'critical',
        },
        {
            label: 'CT negative, ≤6h from onset',
            description: 'Normal CT within 6 hours of headache onset',
            next: 'sah-early-neg',
        },
        {
            label: 'CT negative, >6h from onset',
            description: 'Normal CT more than 6 hours after headache onset',
            next: 'sah-lp',
            urgency: 'urgent',
        },
    ],
};
const SAH_EARLY_NEG = {
    id: 'sah-early-neg',
    type: 'question',
    module: 2,
    title: 'CT Negative Within 6 Hours',
    body: 'A negative CT within 6 hours of symptom onset has very high sensitivity for SAH, **but may not be 100%** depending on scanner generation and interpretation.\n\n**ACEP 2019 Level B recommendation:** In patients presenting within 6 hours with a negative CT on a third-generation or newer scanner read by an attending radiologist, a normal neurologic exam, and no anemia, sSAH may be ruled out without LP.\n\n**Consider proceeding to LP if:**\n• High clinical suspicion despite negative CT\n• Uncertain scanner generation\n• CT read by non-radiologist\n• Patient has anemia (Hct <30%)\n• Symptom onset time uncertain',
    citation: [1, 5, 6],
    options: [
        {
            label: 'All criteria met — rule out SAH',
            description: '3rd-gen+ scanner, attending radiologist, normal neuro exam, normal Hct, low suspicion',
            next: 'sah-negative-workup',
            urgency: 'routine',
        },
        {
            label: 'Criteria not met or high suspicion',
            description: 'Proceed to lumbar puncture for definitive evaluation',
            next: 'sah-lp',
            urgency: 'urgent',
        },
    ],
};
const SAH_LP = {
    id: 'sah-lp',
    type: 'info',
    module: 2,
    title: 'Lumbar Puncture',
    body: '[LP Interpretation Guide](#/info/sah-lp-guide) — detailed reference.\n\nFor patients with negative CT and ongoing suspicion for SAH, LP is the next diagnostic step.\n\n**Technique:**\n• Patient in lateral recumbent position\n• Measure **opening pressure** (elevated >20 cm H₂O in 60% of sSAH)\n• Collect **4 serial tubes** of CSF\n• Send last tube for cell count AND xanthochromia\n\n**Key considerations:**\n• Traumatic tap occurs in 10-15% of patients\n• Xanthochromia takes up to 12 hours to develop\n• If LP performed <12h after onset, accept either RBCs or xanthochromia as positive\n• Finding normal CSF at any time point excludes SAH\n\n**Opening pressure clues:** Elevated → SAH, cerebral venous thrombosis, or idiopathic intracranial hypertension. Decreased → spontaneous intracranial hypotension.',
    citation: [1, 2, 13],
    next: 'sah-lp-results',
};
const SAH_LP_RESULTS = {
    id: 'sah-lp-results',
    type: 'question',
    module: 2,
    title: 'LP Interpretation',
    body: '**Assess the CSF results:**\n\n**Positive for SAH:**\n• Xanthochromia (yellow color from hemoglobin breakdown) — highly suggestive, unlikely with traumatic tap\n• Persistent RBCs constant across all 4 tubes (usually in thousands)\n\n**Equivocal:**\n• Partial clearing of RBCs (e.g., 3,000 in tube 1, 400 in tube 4) — may be traumatic tap OR SAH\n• >10,000 RBCs in final tube = 6x more likely SAH\n\n**Negative:**\n• Zero RBCs in final tube = traumatic tap\n• Normal CSF (no RBCs, no xanthochromia) = SAH excluded\n\n**Visual xanthochromia:** Centrifuge last tube, compare against water on white background. Sensitivity 93%, specificity 95%, NPV 99%.',
    citation: [1, 6, 13],
    options: [
        {
            label: 'Xanthochromia or persistent RBCs',
            description: 'CSF positive for subarachnoid hemorrhage',
            next: 'sah-confirmed',
            urgency: 'critical',
        },
        {
            label: 'Equivocal — partial clearing',
            description: 'RBCs decrease but do not clear to zero',
            next: 'sah-equivocal',
            urgency: 'urgent',
        },
        {
            label: 'Normal CSF',
            description: 'No RBCs and no xanthochromia — SAH excluded',
            next: 'sah-negative-workup',
            urgency: 'routine',
        },
    ],
};
const SAH_EQUIVOCAL = {
    id: 'sah-equivocal',
    type: 'question',
    module: 2,
    title: 'Equivocal CSF Results',
    body: 'With partial clearing of RBCs, the distinction between traumatic tap and true SAH can be difficult.\n\n**Obtain CTA** to evaluate for aneurysm. CTA sensitivity for aneurysms is **97-99%** compared to digital subtraction angiography.\n\n**Key findings:**\n• Patients with bloody CSF and negative cerebrovascular imaging are at low risk for subsequent SAH\n• CTA may identify incidental aneurysms (2% of population) — require neurosurgical consultation\n• Aneurysm detection decreases for aneurysms <4 mm\n\n**Consult neurosurgery** for shared decision-making regarding further workup or observation.',
    citation: [2, 6],
    options: [
        {
            label: 'Aneurysm identified on CTA',
            description: 'Vascular abnormality found — treat as confirmed SAH',
            next: 'sah-confirmed',
            urgency: 'critical',
        },
        {
            label: 'CTA negative',
            description: 'No aneurysm found — low risk for subsequent SAH',
            next: 'sah-negative-workup',
            urgency: 'routine',
        },
    ],
};
const SAH_NEGATIVE_WORKUP = {
    id: 'sah-negative-workup',
    type: 'result',
    module: 2,
    title: 'SAH Excluded',
    body: 'SAH has been excluded by the diagnostic workup.\n\n**Negative CT + negative LP** = SAH confidently ruled out, supported by multiple prospective studies with long-term follow-up (no subsequent SAH over 3+ years).\n\n**Negative CT within 6h** (with appropriate conditions) = SAH ruled out per ACEP 2019 Level B recommendation.\n\n**Consider alternative diagnoses:**\n• Migraine or other primary headache syndrome\n• Cerebral venous sinus thrombosis\n• Idiopathic intracranial hypertension\n• Spontaneous intracranial hypotension\n• Meningitis\n• Reversible cerebral vasoconstriction syndrome (RCVS)\n\n**Discharge safely** with outpatient follow-up and return precautions for worsening symptoms.',
    recommendation: 'SAH excluded — safe discharge with outpatient follow-up and clear return precautions',
    confidence: 'definitive',
    citation: [1, 13],
};
// ───────────────────────────────────────────────
// Module 3 — Severity & Grading
// ───────────────────────────────────────────────
const SAH_CONFIRMED = {
    id: 'sah-confirmed',
    type: 'info',
    module: 3,
    title: 'SAH Confirmed',
    body: '**Subarachnoid hemorrhage is confirmed.** Immediately:\n\n• **Obtain neurosurgical consultation** — arrange definitive therapy\n• **Order CTA** (if not already done) to identify the aneurysm\n• Begin ED management and monitoring\n\n**CT hemorrhage patterns:**\n• **Basal cisterns** — typical aneurysmal SAH\n• **Cerebral convexities** — traumatic SAH, or convexal SAH (RCVS if <60y, cerebral amyloid angiopathy if >60y)\n• **Perimesencephalic** — blood around midbrain with normal angiogram; 10% of sSAH, excellent prognosis (98% survive without deficits)\n\n**Aneurysm locations** (85% of sSAH):\n• 70% in anterior communicating, posterior communicating, or middle cerebral arteries\n• Remainder in posterior circulation',
    citation: [2, 3, 14],
    next: 'sah-grading',
};
const SAH_GRADING = {
    id: 'sah-grading',
    type: 'info',
    module: 3,
    title: 'Clinical Severity Grading',
    body: '**Grade severity** to guide management and predict outcomes.\n\n**Hunt & Hess Scale** — most widely used clinically:\n• Grade 1: Asymptomatic or mild headache\n• Grade 2: Severe headache, stiff neck, no focal deficits\n• Grade 3: Drowsy, mild focal deficit\n• Grade 4: Stupor, moderate-severe hemiparesis\n• Grade 5: Coma, decerebrate posturing\n\nHigher grade = higher mortality. Grades 4-5 historically 70-90% mortality, improved with modern care.\n\n**Modified Fisher Scale** — predicts vasospasm risk from CT:\n• Grade 0-1: Low vasospasm risk\n• Grade 2-3: Moderate-high risk\n• Grade 4: Thick SAH with IVH → highest vasospasm risk',
    citation: [7, 8],
    calculatorLinks: [
        { id: 'hunt-hess', label: 'Hunt & Hess Scale' },
        { id: 'modified-fisher', label: 'Modified Fisher Scale' },
    ],
    next: 'sah-vasospasm-risk',
};
const SAH_VASOSPASM_RISK = {
    id: 'sah-vasospasm-risk',
    type: 'info',
    module: 3,
    title: 'Vasospasm Risk Assessment',
    body: '**Cerebral vasospasm** is a delayed complication developing **days to 2 weeks** post-SAH, with peak incidence at **7-10 days**.\n\n**Risk prediction (Modified Fisher Scale):**\n• Thick clot and intraventricular hemorrhage → highest risk\n• Thin SAH without IVH → lowest risk\n\n**Vasospasm may be:**\n• **Asymptomatic** — detected only on imaging\n• **Symptomatic** — delayed neurologic deterioration causing significant morbidity\n\n**Key management implications:**\n• All confirmed SAH patients should receive [Nimodipine](#/drug/nimodipine/vasospasm prevention) for vasospasm prevention\n• High-grade Fisher patients need closer monitoring and earlier neurosurgical intervention\n• The VASOGRADE scale (combines WFNS + Modified Fisher) further stratifies risk as green/yellow/red',
    citation: [8, 10],
    next: 'sah-initial-mgmt',
};
// ───────────────────────────────────────────────
// Module 4 — ED Management
// ───────────────────────────────────────────────
const SAH_INITIAL_MGMT = {
    id: 'sah-initial-mgmt',
    type: 'info',
    module: 4,
    title: 'Initial ED Management',
    body: '**Prioritize:** Airway management, hemodynamic monitoring, supportive care, and prevention of complications.\n\n**General measures:**\n• **Bed rest** with head of bed at 30° (facilitates venous drainage)\n• **NPO** until surgical/endovascular treatment plan is decided\n• **Continuous cardiac monitoring** — ECG changes in 50-100% of patients\n• **Serial neurologic examinations** — monitor for deterioration\n• **Adequate analgesia** — [Acetaminophen](#/drug/acetaminophen/headache) 1 g PO/IV q6h. Avoid NSAIDs (platelet dysfunction). Use opioids cautiously (interfere with neuro exam).\n• **Antiemetics** as needed for comfort\n\n**Outcomes are best** when care is provided by multidisciplinary teams at specialized high-volume centers (OR 0.77 for in-hospital mortality).',
    citation: [2, 3, 12],
    treatment: {
        firstLine: {
            drug: 'Acetaminophen',
            dose: '1 g',
            route: 'PO or IV',
            frequency: 'Every 6 hours',
            duration: 'As needed for pain control',
            notes: 'Avoid NSAIDs (platelet dysfunction). Use opioids cautiously (interfere with neuro exam).',
        },
        monitoring: 'Serial neurologic examinations. Continuous cardiac monitoring. Monitor for pain control adequacy.',
    },
    next: 'sah-bp-control',
};
const SAH_BP_CONTROL = {
    id: 'sah-bp-control',
    type: 'info',
    module: 4,
    title: 'Blood Pressure Management',
    body: '**Target: SBP <160 mmHg** until aneurysm is secured (AHA/ASA 2012).\n\nHigher pressures may increase rebleeding risk, but aggressive lowering may compromise cerebral perfusion.\n\n**Titratable IV agents:**\n• [Labetalol](#/drug/labetalol/sah blood pressure) — 10-20 mg IV bolus over 1-2 min. Repeat or start infusion 2-8 mg/min. Max 300 mg/24h.\n• [Nicardipine](#/drug/nicardipine/sah blood pressure) — 5 mg/hr IV, titrate by 2.5 mg/hr q5-15 min. Max 15 mg/hr.\n• [Clevidipine](#/drug/clevidipine/sah blood pressure) — 1-2 mg/hr IV, double q90 sec to target. Ultra-short t½ (~1 min).\n\n**Avoid nitroprusside** — increases intracranial pressure and risk of toxicity with prolonged infusion.\n\n**Arterial line** recommended for continuous BP monitoring if extended ED stay anticipated.',
    citation: [2, 3],
    treatment: {
        firstLine: {
            drug: 'Labetalol',
            dose: '10-20 mg IV bolus, then 2-8 mg/min infusion',
            route: 'IV',
            frequency: 'Bolus over 1-2 min, repeat PRN or continuous infusion',
            duration: 'Until SBP <160 mmHg sustained',
            notes: 'Max 300 mg/24h. Avoid in bradycardia, heart block, severe asthma.',
        },
        alternative: {
            drug: 'Nicardipine',
            dose: '5 mg/hr, titrate by 2.5 mg/hr q5-15 min',
            route: 'IV infusion',
            frequency: 'Continuous',
            duration: 'Until SBP <160 mmHg sustained',
            notes: 'Max 15 mg/hr. Preferred if beta-blocker contraindicated. Clevidipine (1-2 mg/hr, double q90 sec) is an alternative with ultra-short half-life.',
        },
        monitoring: 'Arterial line for continuous BP monitoring. Target SBP <160 mmHg. Avoid nitroprusside (increases ICP).',
    },
    next: 'sah-vasospasm-prev',
};
const SAH_VASOSPASM_PREV = {
    id: 'sah-vasospasm-prev',
    type: 'info',
    module: 4,
    title: 'Vasospasm Prevention — Nimodipine',
    body: '[Nimodipine](#/drug/nimodipine/vasospasm prevention) is the **only proven pharmacologic intervention** to reduce morbidity from vasospasm-related ischemia.\n\n**Dosing:** 60 mg PO every 4 hours × 21 days\n• If unable to swallow: crush and administer via nasogastric tube\n• **No evidence for IV nimodipine** — oral route only\n• Give to hemodynamically stable patients\n• Part of comprehensive stroke center measures\n\n**Evidence:** Cochrane review of 16 trials — risk ratio 0.67 (95% CI 0.55-0.81) for secondary ischemia. Landmark RCT (554 patients) established the standard regimen.\n\n**Not effective for vasospasm prevention:**\n• IV magnesium sulfate\n• Statins (no benefit in recent large RCTs despite early promise)\n\n**Note:** Can be initiated in the ED but does not necessarily need to start before transfer. Discuss with specialist team.',
    citation: [9, 10],
    treatment: {
        firstLine: {
            drug: 'Nimodipine',
            dose: '60 mg',
            route: 'PO (or via NG tube if unable to swallow)',
            frequency: 'Every 4 hours',
            duration: '21 days',
            notes: 'Only proven pharmacologic intervention for vasospasm prevention. Oral route only (no evidence for IV). Give to hemodynamically stable patients.',
        },
        monitoring: 'Monitor BP (may cause hypotension). Peak vasospasm risk days 7-10. IV magnesium and statins NOT effective for prevention.',
    },
    next: 'sah-seizure-mgmt',
};
const SAH_SEIZURE_MGMT = {
    id: 'sah-seizure-mgmt',
    type: 'info',
    module: 4,
    title: 'Seizure Management',
    body: 'Up to **20% of patients** have a seizure during or soon after aSAH. Seizures can cause rebleeding from an unsecured aneurysm.\n\n**Key points:**\n• **No RCTs** on prophylactic antiepileptic drugs (AEDs) in SAH\n• **Phenytoin should be avoided** — associated with worse outcomes, functional decline, and cognitive disability\n• If prophylaxis is used, prefer a **short course (<3 days)** — same benefit as longer courses without cumulative adverse effects\n\n**If prophylaxis is initiated:**\n• [Levetiracetam](#/drug/levetiracetam/sah seizure) 500 mg PO/IV BID — preferred due to better side-effect profile\n• No hepatic metabolism, no drug interactions, no cardiac effects\n\n**Reasonable to defer AED initiation** to the inpatient management service in patients who have not already seized. Use in accordance with local institutional protocols.',
    citation: [2, 3],
    treatment: {
        firstLine: {
            drug: 'Levetiracetam',
            dose: '500 mg',
            route: 'PO or IV',
            frequency: 'Twice daily (BID)',
            duration: '<3 days if used prophylactically',
            notes: 'Preferred AED due to better side-effect profile. No hepatic metabolism, no drug interactions, no cardiac effects. Avoid phenytoin (worse outcomes).',
        },
        monitoring: 'Monitor for seizure activity. Seizures can cause rebleeding from unsecured aneurysm. Reasonable to defer AED initiation to inpatient service if no seizures.',
    },
    next: 'sah-rebleed-prev',
};
const SAH_REBLEED_PREV = {
    id: 'sah-rebleed-prev',
    type: 'info',
    module: 4,
    title: 'Rebleeding Prevention',
    body: 'Rebleeding is **one of the most devastating complications** after aSAH, with the highest mortality of any complication.\n\n• Cumulative incidence: **8-23%** in first 72 hours\n• **50-90% of episodes occur within first 6 hours** after primary bleed\n• Clinical signs: acute/worsening headache, decreased consciousness, loss of brainstem reflexes, posturing, respiratory arrest, seizures\n\n**Risk factors for rebleeding:**\n• High-grade SAH (Hunt & Hess 4-5)\n• Larger aneurysms\n• Prolonged time to surgery\n• Sentinel/warning bleeds\n• Catheter angiography\n\n**Prevention strategies:**\n• **Early definitive repair** — primary strategy (within 72 hours)\n• **Blood pressure control** — SBP <160 mmHg\n• **Antifibrinolytics** — short courses may reduce rebleeding; discuss with neurosurgical team before initiating\n\n**Rapid diagnosis + early repair** remains the optimal approach.',
    citation: [2, 14],
    next: 'sah-cardiac-comp',
};
const SAH_CARDIAC_COMP = {
    id: 'sah-cardiac-comp',
    type: 'info',
    module: 4,
    title: 'Cardiac Complications',
    body: '[SAH ECG Changes](#/info/sah-ecg-changes) — detailed reference.\n\nCardiac abnormalities are **common** following acute sSAH due to catecholamine surge and autonomic stimulation.\n\n**ECG changes (50-100% of patients):**\n• Nonspecific ST-segment and T-wave changes\n• Prolonged QRS, U waves, prolonged QT interval\n• ST elevations mimicking MI — coronary angiography typically normal\n• Serious arrhythmias in <5% (associated with worse outcomes)\n\n**Troponin:** Elevated in 20-40% of acute cases. Indicates cardiopulmonary complications and worse outcomes.\n\n**Neurogenic stunned myocardium (Takotsubo):**\n• Acutely depressed EF (can be as low as 20%)\n• Apical akinesis/ballooning with normal coronary arteries\n• Transient — most recover over several weeks\n• May present with pulmonary edema and ACS symptoms\n\n**Management:** SAH is a **contraindication to thrombolytics and anticoagulants**. Focus on the primary neurologic insult while supporting cardiac dysfunction.',
    citation: [2, 3],
    next: 'sah-definitive',
};
// ───────────────────────────────────────────────
// Module 5 — Disposition & Definitive Care
// ───────────────────────────────────────────────
const SAH_DEFINITIVE = {
    id: 'sah-definitive',
    type: 'info',
    module: 5,
    title: 'Definitive Aneurysm Repair',
    body: '**Vascular imaging:** Cerebral angiography (DSA) is the gold standard for preoperative planning. CTA has 97-99% sensitivity. Angiography may be negative in 10-20% (perimesencephalic hemorrhage, vasospasm, thrombosed aneurysm).\n\n**Two approaches to aneurysm repair:**\n\n**Endovascular coiling:**\n• ISAT trial (2,143 patients) — improved outcomes vs clipping\n• Slightly higher rebleeding risk\n• Increasing use as first-line approach\n\n**Microvascular clipping:**\n• Higher seizure risk\n• May be necessary for certain aneurysm anatomies\n\n**Timing:** Early treatment within 72 hours is the common approach.\n\nThe choice depends on **aneurysm anatomy, clinician expertise, and patient factors** — best made by a multidisciplinary team.',
    citation: [2, 11],
    next: 'sah-special-pop',
};
const SAH_SPECIAL_POP = {
    id: 'sah-special-pop',
    type: 'info',
    module: 5,
    title: 'Special Populations',
    body: '**Pregnant/Postpartum Women:**\n• Pregnancy and postpartum are hypercoagulable states\n• Also consider: ischemic stroke, cerebral venous thrombosis, RCVS, pre-eclampsia, PRES\n• Management principles are the same\n\n**Anticoagulated Patients:**\n• Reverse therapeutic anticoagulation in the acute setting\n• **Do NOT reverse antiplatelet agents** unless neurosurgical procedure is planned — transfusion without benefit increases mortality\n\n**Perimesencephalic Hemorrhage:**\n• 10% of sSAH; blood confined around midbrain on CT\n• Normal angiogram required (DSA is test of choice)\n• **Excellent prognosis** — 98% survive without deficits\n• Fewer complications than aSAH\n\n**Acute Clinical Deterioration:**\n• Repeat CT immediately to identify cause\n• Possible causes: rebleeding, cerebral infarction, acute hydrocephalus, subdural extension\n• These declines are potentially treatable — early identification is key',
    citation: [2, 3],
    next: 'sah-dispo',
};
const SAH_DISPO = {
    id: 'sah-dispo',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'All patients with confirmed SAH require **ICU admission**, preferably a neurointensive care unit, for continuous monitoring until definitive aneurysm repair.\n\n**Better outcomes at high-volume centers** — meta-analysis of 36,000+ patients: reduction in mortality (OR 0.77, 95% CI 0.60-0.97).\n\n**Transfer considerations:**\n• Average 5.2 hours from diagnosis to arrival at neurosurgical center\n• 90% arrive without significant GCS deterioration\n• Air transport is safe and effective\n• Prearranged interfacility agreements facilitate efficient transfer',
    citation: [2, 12],
    options: [
        {
            label: 'Transfer to specialized center',
            description: 'Requires transfer to a high-volume center with neurosurgical/endovascular capability',
            next: 'sah-transfer',
            urgency: 'critical',
        },
        {
            label: 'At specialized center',
            description: 'Already at a center with neurosurgical ICU and repair capabilities',
            next: 'sah-icu',
            urgency: 'urgent',
        },
    ],
};
const SAH_TRANSFER = {
    id: 'sah-transfer',
    type: 'result',
    module: 5,
    title: 'Transfer to High-Volume Center',
    body: '**Arrange emergent transfer** to a center with:\n• Neurosurgical ICU\n• Both surgical (clipping) and endovascular (coiling) capabilities\n• Multidisciplinary neurovascular team\n\n**Pre-transfer management:**\n• Secure airway if GCS ≤8\n• Continuous cardiac monitoring and BP management (SBP <160)\n• Start [Nimodipine](#/drug/nimodipine/vasospasm prevention) 60 mg PO q4h if hemodynamically stable\n• Communicate Hunt & Hess grade, Fisher grade, and CT findings to receiving team\n• NPO for potential procedural intervention\n• Bring all imaging on disc or ensure electronic transfer\n\n**Transfer is generally safe** — 90% of patients arrive without significant clinical deterioration.',
    recommendation: 'Emergent transfer to high-volume neurosurgical center for definitive aneurysm repair and neurointensive care',
    confidence: 'definitive',
    citation: [2, 12],
    treatment: {
        firstLine: {
            drug: 'Nimodipine',
            dose: '60 mg',
            route: 'PO (or via NG tube)',
            frequency: 'Every 4 hours',
            duration: '21 days total',
            notes: 'Start if hemodynamically stable. Continue during and after transfer.',
        },
        monitoring: 'BP management (SBP <160). Secure airway if GCS ≤8. Continuous cardiac monitoring during transfer.',
    },
};
const SAH_ICU = {
    id: 'sah-icu',
    type: 'result',
    module: 5,
    title: 'Neuro ICU Admission',
    body: '**Admit to neurointensive care unit** for:\n• Continuous hemodynamic and neuro monitoring\n• Definitive aneurysm repair (within 72 hours)\n• Vasospasm surveillance (peak risk days 7-10)\n• Management of secondary complications\n\n**Ongoing ED management until bed available:**\n• BP target SBP <160 with titratable IV agents\n• [Nimodipine](#/drug/nimodipine/vasospasm prevention) 60 mg PO q4h\n• Serial neuro checks q1h\n• NPO status maintained\n• Adequate analgesia and antiemetics\n• Watch for clinical deterioration — repeat CT immediately if decline\n\n**Prognosis:** In-hospital mortality >30% even at high-volume centers. Aggressive approaches may still be warranted in severe cases (Hunt & Hess 4-5) given improved modern outcomes.',
    recommendation: 'Neurointensive care admission with definitive aneurysm repair within 72 hours and vasospasm monitoring for 14 days',
    confidence: 'definitive',
    citation: [2, 3, 12],
    treatment: {
        firstLine: {
            drug: 'Nimodipine',
            dose: '60 mg',
            route: 'PO (or via NG tube)',
            frequency: 'Every 4 hours',
            duration: '21 days total',
            notes: 'Continue for vasospasm prevention. Peak risk days 7-10.',
        },
        alternative: {
            drug: 'Labetalol or Nicardipine',
            dose: 'Labetalol 2-8 mg/min or Nicardipine 5-15 mg/hr',
            route: 'IV infusion',
            frequency: 'Continuous',
            duration: 'Until SBP <160 mmHg sustained',
            notes: 'Titratable IV agents for BP control while awaiting ICU bed.',
        },
        monitoring: 'Serial neuro checks q1h. BP target SBP <160. Watch for clinical deterioration and repeat CT immediately if decline.',
    },
};
// ───────────────────────────────────────────────
// Exports
// ───────────────────────────────────────────────
export const SAH_NODES = [
    SAH_START,
    SAH_PRESENTATION,
    SAH_OTTAWA,
    SAH_LOW_RISK,
    SAH_CT,
    SAH_CT_RESULT,
    SAH_EARLY_NEG,
    SAH_LP,
    SAH_LP_RESULTS,
    SAH_EQUIVOCAL,
    SAH_NEGATIVE_WORKUP,
    SAH_CONFIRMED,
    SAH_GRADING,
    SAH_VASOSPASM_RISK,
    SAH_INITIAL_MGMT,
    SAH_BP_CONTROL,
    SAH_VASOSPASM_PREV,
    SAH_SEIZURE_MGMT,
    SAH_REBLEED_PREV,
    SAH_CARDIAC_COMP,
    SAH_DEFINITIVE,
    SAH_SPECIAL_POP,
    SAH_DISPO,
    SAH_TRANSFER,
    SAH_ICU,
];
export const SAH_NODE_COUNT = SAH_NODES.length;
export const SAH_MODULE_LABELS = [
    'Recognition',
    'Diagnostics',
    'Severity',
    'ED Management',
    'Disposition',
];
export const SAH_CRITICAL_ACTIONS = [
    { text: 'Lower MAP to 100-110 mmHg (SBP <160) within 30 minutes to prevent rebleeding', nodeId: 'sah-bp-control' },
    { text: 'Nimodipine 60 mg PO/NG q4h to prevent vasospasm (start within 96 hours)', nodeId: 'sah-nimodipine' },
    { text: 'Stat non-contrast head CT (98% sensitive if <6 hours from onset)', nodeId: 'sah-ct' },
    { text: 'LP if CT negative and high suspicion (xanthochromia, elevated RBC count)', nodeId: 'sah-lp' },
    { text: 'Neurosurgery consult immediately for aneurysm securing (clipping vs coiling)', nodeId: 'sah-neurosurg' },
    { text: 'Prevent Valsalva: stool softeners, antiemetics, adequate analgesia', nodeId: 'sah-prevent-rebleed' },
    { text: 'Seizure prophylaxis: levetiracetam 1000-1500 mg IV load (avoid phenytoin)', nodeId: 'sah-seizure-ppx' },
    { text: 'Maintain euvolemia (avoid hypovolemia which worsens vasospasm)', nodeId: 'sah-fluids' },
];
export const SAH_CITATIONS = [
    { num: 1, text: 'Godwin SA, Cherkas DS, Panagos PD, et al. Clinical policy: critical issues in the evaluation and management of adult patients presenting to the emergency department with acute headache. Ann Emerg Med. 2019;74(4):e41-e74.' },
    { num: 2, text: 'Connolly ES Jr, Rabinstein AA, Carhuapoma JR, et al. Guidelines for the management of aneurysmal subarachnoid hemorrhage: a guideline for healthcare professionals from the American Heart Association/American Stroke Association. Stroke. 2012;43(6):1711-1737.' },
    { num: 3, text: 'Diringer MN, Bleck TP, Claude Hemphill J 3rd, et al. Critical care management of patients following aneurysmal subarachnoid hemorrhage: recommendations from the Neurocritical Care Society\'s Multidisciplinary Consensus Conference. Neurocrit Care. 2011;15(2):211-240.' },
    { num: 4, text: 'Perry JJ, Stiell IG, Sivilotti ML, et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache. JAMA. 2013;310(12):1248-1255.' },
    { num: 5, text: 'Perry JJ, Stiell IG, Sivilotti ML, et al. Sensitivity of computed tomography performed within six hours of onset of headache for diagnosis of subarachnoid haemorrhage: prospective cohort study. BMJ. 2011;343:d4277.' },
    { num: 6, text: 'Dubosh NM, Bellolio MF, Rabinstein AA, et al. Sensitivity of early brain computed tomography to exclude aneurysmal subarachnoid hemorrhage: a systematic review and meta-analysis. Stroke. 2016;47(3):750-755.' },
    { num: 7, text: 'Hunt WE, Hess RM. Surgical risk as related to time of intervention in the repair of intracranial aneurysms. J Neurosurg. 1968;28(1):14-20.' },
    { num: 8, text: 'Frontera JA, Claassen J, Schmidt JM, et al. Prediction of symptomatic vasospasm after subarachnoid hemorrhage: the modified Fisher scale. Neurosurgery. 2006;59(1):21-27.' },
    { num: 9, text: 'Pickard JD, Murray GD, Illingworth R, et al. Effect of oral nimodipine on cerebral infarction and outcome after subarachnoid haemorrhage: British aneurysm nimodipine trial. BMJ. 1989;298(6674):636-642.' },
    { num: 10, text: 'Dorhout Mees SM, Rinkel GJ, Feigin VL, et al. Calcium antagonists for aneurysmal subarachnoid haemorrhage. Cochrane Database Syst Rev. 2007(3):CD000277.' },
    { num: 11, text: 'Molyneux A, Kerr R, Stratton I, et al. International Subarachnoid Aneurysm Trial (ISAT) of neurosurgical clipping versus endovascular coiling in 2143 patients with ruptured intracranial aneurysms: a randomised trial. Lancet. 2002;360(9342):1267-1274.' },
    { num: 12, text: 'Boogaarts HD, van Amerongen MJ, de Vries J, et al. Caseload as a factor for outcome in aneurysmal subarachnoid hemorrhage: a systematic review and meta-analysis. J Neurosurg. 2014;120(3):605-611.' },
    { num: 13, text: 'Perry JJ, Spacek A, Forbes M, et al. Is the combination of negative computed tomography result and negative lumbar puncture result sufficient to rule out subarachnoid hemorrhage? Ann Emerg Med. 2008;51(6):707-713.' },
    { num: 14, text: 'Larsen CC, Astrup J. Rebleeding after aneurysmal subarachnoid hemorrhage: a literature review. World Neurosurg. 2013;79(2):307-312.' },
    { num: 15, text: 'Perry JJ, Sivilotti MLA, Émond M, et al. Prospective Implementation of the Ottawa Subarachnoid Hemorrhage Rule and 6-Hour Computed Tomography Rule. Stroke. 2020;51(2):424-430.' },
];
