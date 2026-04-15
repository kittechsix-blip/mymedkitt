// MedKitt — Organic vs Psychiatric Emergency
// Differentiating medical vs psychiatric causes of behavioral presentations.
// Based on ACEP Now 2017, AAEP Task Force guidelines, and contemporary literature.
// 6 modules: Initial Assessment → Red Flags → Organic Mimics → Targeted Workup → Risk Stratification → Disposition.
// 28 nodes total.
export const ORGANIC_PSYCH_CITATIONS = [
    { num: 1, text: 'ACEP Now. How to Tell Whether a Psychiatric Emergency is Due to Disease or Psychological Illness. September 2017.' },
    { num: 2, text: 'Anderson EL, et al. AAEP Task Force on Medical Clearance Part I: Introduction, Review and Evidence-Based Guidelines. West J Emerg Med. 2017;18(2):235-242.' },
    { num: 3, text: 'Wilson MP, et al. AAEP Task Force on Medical Clearance Part II: Controversies over Medical Assessment and Consensus Recommendations. West J Emerg Med. 2017;18(4):640-646.' },
    { num: 4, text: 'Olshaker JS, et al. Medical clearance and screening of psychiatric patients in the ED. Am J Emerg Med. 1997;15(4):400-405.' },
    { num: 5, text: 'Henneman PL, et al. Prospective evaluation of ED medical clearance for 100 patients with new-onset psychiatric symptoms. Ann Emerg Med. 1994;24(4):672-677.' },
    { num: 6, text: 'Han JH, et al. Delirium in older emergency department patients: recognition, risk factors, and psychomotor subtypes. Acad Emerg Med. 2009;16(3):193-200.' },
    { num: 7, text: 'ACEP Clinical Policy: Critical Issues in the Diagnosis and Management of the Adult Psychiatric Patient in the Emergency Department. Ann Emerg Med. 2017;69(4):480-498.' },
    { num: 8, text: 'Chennapan K, et al. Medical Screening of Mental Health Patients in the Emergency Department: A Systematic Review. J Emerg Med. 2018;55(6):799-812.' },
    { num: 9, text: 'Inouye SK, et al. Clarifying confusion: the confusion assessment method. Ann Intern Med. 1990;113(12):941-948.' },
    { num: 10, text: 'Journal of Urgent Care Medicine. Psychiatric Manifestations of Organic Disease: Don\'t Get Fooled. 2021.' },
];
export const ORGANIC_PSYCH_CRITICAL_ACTIONS = [
    { text: 'Obtain complete vital signs on every behavioral patient (abnormal VS are the best clue to organic cause)', nodeId: 'ovp-vital-signs' },
    { text: 'Check fingerstick glucose immediately (hypoglycemia can mimic any psychiatric presentation)', nodeId: 'ovp-start' },
    { text: 'Screen for red flags: new-onset symptoms, age >45 without psych history, abnormal vitals, focal deficits', nodeId: 'ovp-red-flags' },
    { text: 'Obtain collateral history: family, prior records, EMS - baseline mental status is critical', nodeId: 'ovp-history' },
    { text: 'Consider delirium in ALL elderly patients with behavioral change (missed 76% of the time)', nodeId: 'ovp-delirium' },
    { text: 'Do NOT use routine labs for all psychiatric patients - selective testing based on clinical findings', nodeId: 'ovp-workup' },
];
export const ORGANIC_PSYCH_MODULE_LABELS = [
    'Initial Assessment',
    'History & Red Flags',
    'Organic Mimics',
    'Targeted Workup',
    'Psychiatric Assessment',
    'Disposition',
];
export const ORGANIC_PSYCH_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'ovp-start',
        type: 'info',
        module: 1,
        title: 'Organic vs Psychiatric Emergency',
        body: '[Quick Reference: Red Flags for Organic Cause](#/info/ovp-red-flags-summary)\n\n**The Challenge:** 19-80% of presentations attributed to psychiatric illness have an underlying medical cause. Missed medical diagnosis rates: **8-48%** in EDs, with highest rates in first presentations.\n\n**Key Principle:** The approach to behavioral complaints should be the same as general medical conditions: ABCs, thorough history (including collateral), physical exam, and **selective** testing.\n\n**History is most sensitive:** Olshaker et al (1997) showed complete history was **94% sensitive** for identifying medical conditions - more than physical exam or lab tests.\n\n**This consult guides:** Differentiating organic from psychiatric causes, targeted workup, and safe disposition.',
        citation: [1, 2, 4],
        next: 'ovp-vital-signs',
        summary: 'Medical causes underlie 19-80% of behavioral presentations - history is 94% sensitive',
    },
    {
        id: 'ovp-vital-signs',
        type: 'question',
        module: 1,
        title: 'Vital Signs Assessment',
        body: '**Complete vital signs are mandatory** - only 50% of psych patients have full VS documented.\n\n**SMART Protocol thresholds:**\n• Temp >100.4°F (38°C) or <96.8°F (36°C)\n• HR <50 or >100\n• BP <100 systolic or >180/110 (x2, 15 min apart)\n• RR <8 or >22\n• SpO2 <95% on room air\n\n**Fingerstick glucose** - the "6th vital sign." Hypoglycemia can mimic ANY psychiatric presentation from catatonia to mania.\n\nAny vital sign abnormality **must be explained and addressed** before psychiatric disposition.',
        citation: [2, 3],
        options: [
            {
                label: 'All vital signs normal',
                description: 'Proceed to history and red flag assessment',
                next: 'ovp-history',
            },
            {
                label: 'Abnormal vital signs',
                description: 'Organic cause more likely - requires medical workup',
                next: 'ovp-abnormal-vs',
                urgency: 'urgent',
            },
            {
                label: 'Hypoglycemia (glucose <60)',
                description: 'Treat immediately with D50W',
                next: 'ovp-hypoglycemia',
                urgency: 'critical',
            },
        ],
        summary: 'Abnormal vital signs suggest organic cause - all must be explained before psych disposition',
    },
    {
        id: 'ovp-abnormal-vs',
        type: 'info',
        module: 1,
        title: 'Abnormal Vital Signs',
        body: '**Abnormal vitals strongly suggest organic etiology.** Do NOT attribute to "anxiety" without investigation.\n\n**Fever + behavioral change:**\n• Infection (UTI most common in elderly, meningitis, encephalitis)\n• Neuroleptic malignant syndrome (NMS)\n• Serotonin syndrome\n• Thyroid storm\n• Excited delirium syndrome (if >104°F)\n\n**Tachycardia:**\n• Sympathomimetic toxidrome\n• Alcohol/benzo withdrawal\n• Thyrotoxicosis\n• PE (panic overlap)\n• Pheochromocytoma (mimics panic)\n\n**Hypertension:**\n• Stimulant intoxication\n• Withdrawal syndromes\n• Hypertensive encephalopathy\n\n**Hypoxia:**\n• PE, pneumonia, aspiration\n• CO toxicity (multiple patients same location)\n\nProceed with targeted workup based on vital sign pattern.',
        citation: [2, 10],
        next: 'ovp-workup',
        summary: 'Vital sign patterns guide differential - fever suggests infection/toxidrome, tachycardia suggests withdrawal/stimulants',
    },
    {
        id: 'ovp-hypoglycemia',
        type: 'info',
        module: 1,
        title: 'Hypoglycemia',
        body: '**Hypoglycemia can cause ANY psychiatric presentation:**\n• Anxiety, agitation, combativeness\n• Confusion, altered consciousness\n• Bizarre behavior, psychosis\n• Catatonia, unresponsiveness\n• Seizures\n\n**Treatment:**\n• D50W 25g (50 mL) IV push (adults)\n• D10W 2-5 mL/kg (pediatrics)\n• Glucagon 1mg IM if no IV access\n\n**Recheck glucose in 15 minutes.** If mental status does not improve after glucose correction, proceed with full organic workup.\n\n**Consider underlying cause:** Insulinoma, sepsis, liver failure, insulin/sulfonylurea overdose, adrenal insufficiency.',
        citation: [1, 10],
        next: 'ovp-history',
        summary: 'Hypoglycemia mimics any psych presentation - treat and recheck glucose in 15 minutes',
    },
    // =====================================================================
    // MODULE 2: HISTORY AND RED FLAGS
    // =====================================================================
    {
        id: 'ovp-history',
        type: 'info',
        module: 2,
        title: 'Critical History Elements',
        body: '**History is 94% sensitive** for identifying organic causes.\n\n**Essential collateral:** Family, prior records, group home staff, EMS. What is BASELINE mental status?\n\n**Key questions:**\n• Psychiatric history? (prior diagnoses, hospitalizations, medications)\n• Substance use? (alcohol, drugs, new prescriptions)\n• Recent medication changes? (especially anticholinergics, steroids, opioids)\n• Recent illness, surgery, or trauma?\n• Chronic medical conditions? (diabetes, thyroid, renal, hepatic)\n• Living situation and social supports?\n• Similar episodes in past? (if yes, what was the cause?)\n\n**Without baseline, delirium diagnosis is unreliable.** If no collateral available, err on side of medical workup.',
        citation: [1, 4, 5],
        next: 'ovp-red-flags',
        summary: 'Collateral history is critical - cannot diagnose delirium without knowing baseline',
    },
    {
        id: 'ovp-red-flags',
        type: 'question',
        module: 2,
        title: 'Red Flags for Organic Cause',
        body: '[Red Flags Quick Reference](#/info/ovp-red-flags-summary)\n\n**High-risk features suggesting organic etiology:**\n\n• **New-onset psychiatric symptoms** without prior history\n• **Age >45** with first psychiatric presentation\n• **Age <12** with behavioral emergency\n• **Altered level of consciousness** (drowsy, obtunded)\n• **Fluctuating course** (waxes and wanes)\n• **Visual hallucinations** (rare in primary psych)\n• **Disorientation** (to person, place, time)\n• **Memory impairment** (recent memory)\n• **Focal neurologic deficits**\n• **Abnormal vital signs**\n• **Recent head trauma**\n• **Immunocompromised** (HIV, transplant, chemo)\n• **Catatonia** (immobility, mutism, posturing)\n\n**63% of patients with new-onset psychiatric symptoms had organic etiology** (Henneman 1994).',
        citation: [2, 5, 6],
        options: [
            {
                label: 'Red flags present',
                description: 'High suspicion for organic cause - proceed to targeted workup',
                next: 'ovp-workup',
                urgency: 'urgent',
            },
            {
                label: 'No red flags',
                description: 'Known psych history, similar presentation, normal exam',
                next: 'ovp-low-risk',
            },
            {
                label: 'Elderly patient (≥65)',
                description: 'Higher risk - delirium missed 76% of the time',
                next: 'ovp-elderly',
                urgency: 'urgent',
            },
        ],
        summary: '63% of new-onset psych symptoms have organic cause - visual hallucinations, fluctuation, disorientation suggest delirium',
    },
    {
        id: 'ovp-low-risk',
        type: 'info',
        module: 2,
        title: 'Low-Risk Presentation',
        body: '**Low-risk criteria (all must be present):**\n• Known psychiatric history\n• Similar to prior presentations\n• Alert, cooperative, oriented\n• Normal vital signs\n• Normal physical exam\n• Non-contributory history\n• Age <45\n• No recent medication/substance changes\n\n**ACEP 2017 recommendation:** "Do not routinely order laboratory testing on patients with acute psychiatric symptoms" who meet low-risk criteria.\n\n**Testing adds little** beyond clinical judgment of attending EP for disposition decisions in low-risk patients.\n\n**However:** If anything about the presentation differs from baseline or raises clinical concern, proceed with targeted workup.',
        citation: [3, 7, 8],
        next: 'ovp-psych-features',
        summary: 'Low-risk: known psych history, similar presentation, normal VS/exam - routine labs not indicated',
    },
    // =====================================================================
    // MODULE 3: ORGANIC MIMICS
    // =====================================================================
    {
        id: 'ovp-organic-mimics',
        type: 'info',
        module: 3,
        title: 'Medical Conditions Mimicking Psychiatric Illness',
        body: '[AEIOU-TIPS Mnemonic](#/info/ovp-aeiou-tips)\n\n**Neurologic:**\n• Encephalitis (autoimmune increasing - present with psychosis, catatonia)\n• Complex partial seizures (postictal state, temporal lobe)\n• Stroke/TIA (frontal, temporal)\n• Subdural hematoma (especially elderly on anticoagulants)\n• Neurosyphilis (resurgence - syphilis rates up 70%)\n• Parkinson disease (psychiatric symptoms precede motor)\n• Huntington disease\n\n**Endocrine:**\n• Thyroid (hyper = anxiety 60%; hypo = depression, "myxedema madness")\n• Hypoglycemia, hyperglycemia\n• Cushing syndrome (depression, anxiety in 50%+)\n• Pheochromocytoma (mimics panic attacks)\n• Adrenal insufficiency\n\n**Metabolic:**\n• Hyponatremia (common, especially elderly on diuretics/SSRIs)\n• Hypercalcemia\n• Uremia, hepatic encephalopathy\n• B12 deficiency (depression, psychosis, OCD)\n\n**Infectious:**\n• UTI (most common delirium trigger in elderly women)\n• Pneumonia\n• Sepsis\n• HIV-related CNS infections',
        citation: [5, 10],
        next: 'ovp-workup',
        summary: 'Thyroid, glucose, sodium, B12, UTI are common mimics - encephalitis and neurosyphilis are re-emerging',
    },
    {
        id: 'ovp-elderly',
        type: 'info',
        module: 3,
        title: 'Elderly Patient (≥65 years)',
        body: '**Delirium is missed 76% of the time** in ED elderly patients.\n\n**20-30% of elderly ED patients** have delirium. New psychiatric symptoms in elderly = delirium until proven otherwise.\n\n**Common precipitants in elderly:**\n• UTI (most common in women)\n• Medications (anticholinergics, benzos, opioids, polypharmacy)\n• Dehydration\n• Constipation/urinary retention\n• Pneumonia\n• Metabolic (Na, glucose, Ca)\n• Acute coronary syndrome (ACS can present as confusion)\n• Stroke\n\n**Screen with CAM or bCAM:**\n[CAM Screening Tool](#/info/ovp-cam-tool)\n\n• bCAM: 84% sensitive, 96% specific when performed by physician\n• Takes <2 minutes\n\n**If CAM positive or uncertain:** Admit for medical workup. Do NOT send to psychiatric facility.',
        citation: [6, 9],
        calculatorLinks: [{ id: 'cam-icu', label: 'CAM-ICU' }],
        next: 'ovp-workup',
        summary: 'Elderly + behavioral change = delirium until proven otherwise. UTI is #1 cause in elderly women.',
    },
    // =====================================================================
    // MODULE 4: TARGETED WORKUP
    // =====================================================================
    {
        id: 'ovp-workup',
        type: 'question',
        module: 4,
        title: 'Targeted Medical Workup',
        body: '**Not all patients need labs.** Routine testing of low-yield and not recommended by ACEP 2017.\n\n**Selective testing based on clinical picture:**\n\n**All patients with red flags or concern for organic cause:**\n• Fingerstick glucose (if not already done)\n• BMP (Na, glucose, renal function)\n• Consider CBC, UA\n\n**If fever, infection suspected:**\n• CBC, lactate, UA, CXR\n• Blood cultures if sepsis concern\n• LP if meningitis/encephalitis suspected\n\n**If toxidrome or overdose:**\n• Acetaminophen, salicylate levels\n• ECG (QTc, sodium channel blockers)\n• Consider UDS (though rarely changes management)\n\n**If focal deficits or new psychosis:**\n• CT head\n• Consider MRI, LP, EEG\n\n**If elderly or metabolic concern:**\n• TSH, B12, calcium\n• Ammonia if liver disease\n• RPR if risk factors',
        citation: [3, 7, 8],
        options: [
            {
                label: 'Workup normal',
                description: 'No organic cause identified - reassess for primary psychiatric',
                next: 'ovp-psych-features',
            },
            {
                label: 'Abnormality found',
                description: 'Medical condition identified - treat and reassess',
                next: 'ovp-medical-found',
            },
            {
                label: 'Workup pending',
                description: 'Results not yet available',
                next: 'ovp-pending',
            },
        ],
        summary: 'Selective testing based on presentation - not all patients need labs',
    },
    {
        id: 'ovp-medical-found',
        type: 'info',
        module: 4,
        title: 'Medical Condition Identified',
        body: '**Medical condition found - classify as:**\n\n**CAUSAL:** Medical condition is directly causing the psychiatric symptoms\n• Treat the medical condition\n• Psychiatric symptoms should improve with treatment\n• Medical admission usually required\n\n**CONTRIBUTORY:** Medical condition is worsening or triggering underlying psychiatric illness\n• Treat both medical and psychiatric components\n• May need medical stabilization before psychiatric care\n\n**INCIDENTAL:** Medical finding unrelated to presentation\n• Address per standard care\n• May still proceed with psychiatric evaluation\n\n**Reassess mental status after treating medical condition.** If symptoms persist, may have co-existing psychiatric illness requiring further evaluation.',
        citation: [2, 3],
        next: 'ovp-dispo-medical',
        summary: 'Classify as causal, contributory, or incidental - treat medical condition and reassess',
    },
    {
        id: 'ovp-pending',
        type: 'info',
        module: 4,
        title: 'Workup Pending',
        body: '**While awaiting results:**\n\n• Continue monitoring vital signs\n• Maintain safe environment\n• Avoid physical restraints if possible (worsens delirium)\n• Verbal de-escalation preferred\n• If sedation needed, avoid benzodiazepines (worsen delirium) - use antipsychotics\n\n**Document clearly:**\n• "Patient remains under observation pending medical workup"\n• "Not medically cleared for psychiatric facility"\n\n**Do NOT transfer to psychiatric facility** with pending workup or abnormal vital signs.\n\n**Repeat assessment** after results return.',
        citation: [2, 3],
        next: 'ovp-workup',
        summary: 'Do not transfer to psych facility with pending workup - continue monitoring and reassess',
    },
    // =====================================================================
    // MODULE 5: PSYCHIATRIC ASSESSMENT
    // =====================================================================
    {
        id: 'ovp-psych-features',
        type: 'info',
        module: 5,
        title: 'Features Suggesting Primary Psychiatric Illness',
        body: '**Suggests primary psychiatric (vs organic):**\n\n• **Auditory hallucinations** (command voices, commentary) - common in schizophrenia\n• **Intact orientation** and attention\n• **Stable consciousness** - no fluctuation\n• **Organized delusions** (paranoid, persecutory, grandiose)\n• **Normal vital signs**\n• **No cognitive impairment** on testing\n• **Chronic/subacute course** (not acute onset)\n• **Known psychiatric history** with similar episodes\n• **Identifiable stressor** (relapse trigger)\n\n**Contrast with organic:**\n• Visual hallucinations suggest delirium\n• Fluctuating consciousness suggests organic\n• Disorientation suggests organic\n• Inattention suggests organic\n\n[Delirium vs Psychiatric Features](#/info/ovp-delirium-vs-psych)',
        citation: [1, 6],
        next: 'ovp-risk-assess',
        summary: 'Auditory hallucinations, organized delusions, intact orientation favor psychiatric - visual hallucinations favor organic',
    },
    {
        id: 'ovp-risk-assess',
        type: 'question',
        module: 5,
        title: 'Psychiatric Risk Assessment',
        body: '**Assess dangerousness:**\n\n**Suicidal ideation:**\n• Active SI with plan/intent?\n• Access to means (firearms)?\n• Prior attempts?\n• Risk factors: recent loss, hopelessness, substance use, psychiatric illness\n\n**Homicidal ideation:**\n• Specific threats toward identified person?\n• Access to weapons?\n• History of violence?\n\n**Unable to care for self:**\n• Gravely disabled?\n• Unable to meet basic needs?\n\n**Document findings clearly** for disposition decision.',
        citation: [7],
        options: [
            {
                label: 'High risk (SI/HI with plan, prior attempts)',
                description: 'Requires psychiatric admission or extended observation',
                next: 'ovp-dispo-psych-admit',
            },
            {
                label: 'Moderate risk',
                description: 'SI/HI without plan, needs psychiatric evaluation',
                next: 'ovp-dispo-psych-eval',
            },
            {
                label: 'Low risk',
                description: 'No SI/HI, able to care for self, has supports',
                next: 'ovp-dispo-outpatient',
            },
        ],
        summary: 'Assess SI, HI, ability to care for self - document risk level for disposition',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'ovp-dispo-medical',
        type: 'result',
        module: 6,
        title: 'Disposition: Medical Admission',
        body: '**Medical admission indicated when:**\n• Organic cause identified requiring inpatient treatment\n• Abnormal vital signs not explained or corrected\n• Pending workup with clinical concern\n• Delirium requiring ongoing medical evaluation\n• Patient unsafe for psychiatric facility (medical instability)\n\n**Document as:**\n• "Patient has [medical condition] causing/contributing to psychiatric symptoms"\n• "Patient is medically UNSTABLE for psychiatric facility"\n• "Requires medical admission for [treatment/workup]"\n\n**Avoid "medical clearance" terminology** - use specific descriptors:\n• Causal, contributory, or incidental medical conditions\n• Medically stable vs unstable',
        citation: [2, 3],
        recommendation: 'Medical admission for evaluation and treatment of organic cause. Document specific medical condition and instability.',
        confidence: 'recommended',
        summary: 'Medical admission for organic cause, unstable vitals, or pending concerning workup',
    },
    {
        id: 'ovp-dispo-psych-admit',
        type: 'result',
        module: 6,
        title: 'Disposition: Psychiatric Admission',
        body: '**Criteria for psychiatric admission:**\n• High risk for suicide or harm to others\n• Unable to care for self (gravely disabled)\n• Requires medication stabilization or ECT\n• No adequate outpatient support\n\n**Before transfer to psychiatric facility, ensure:**\n✓ Vital signs normal and stable\n✓ No pending abnormal labs\n✓ Medical causes evaluated and ruled out/treated\n✓ Patient is medically stable for facility\n✓ Appropriate documentation provided\n\n**Documentation should include:**\n• Specific medical evaluation performed\n• Results of any testing\n• Statement: "Patient is medically STABLE for inpatient psychiatric care"\n• Any ongoing medical needs (medications, monitoring)',
        citation: [2, 3, 7],
        recommendation: 'Transfer to psychiatric facility after ensuring medical stability. Document evaluation and stable status.',
        confidence: 'recommended',
        summary: 'Ensure medically stable before transfer - document all medical evaluation performed',
    },
    {
        id: 'ovp-dispo-psych-eval',
        type: 'result',
        module: 6,
        title: 'Disposition: Psychiatric Evaluation',
        body: '**Extended observation or psychiatric consultation:**\n\n**In ED:**\n• Psychiatry consult if available\n• Crisis team evaluation\n• Social work involvement\n• Continue safety monitoring\n\n**Transfer considerations:**\n• If inpatient psychiatric bed needed, ensure medical stability before transfer\n• Crisis stabilization unit if available\n• Average ED length of stay for psychiatric patients: 15-30 hours\n\n**If disposition unclear:**\n• Period of observation (sober up, medication effect)\n• Re-evaluate after 4-8 hours\n• Document serial assessments',
        citation: [1, 7],
        recommendation: 'Psychiatric consultation or extended observation with serial reassessment.',
        confidence: 'recommended',
        summary: 'Psychiatric consult, crisis team, or extended observation - serial reassessment for unclear cases',
    },
    {
        id: 'ovp-dispo-outpatient',
        type: 'result',
        module: 6,
        title: 'Disposition: Outpatient Follow-up',
        body: '**Safe discharge criteria:**\n✓ No SI/HI or denies with reliable historian\n✓ Able to contract for safety\n✓ Has adequate social support\n✓ Able to care for self\n✓ Has follow-up plan (PCP, psychiatrist, therapist)\n✓ Access to crisis resources provided\n\n**Provide:**\n• Crisis hotline: 988 (Suicide & Crisis Lifeline)\n• Local crisis resources\n• Follow-up appointment or referral\n• Medication refills if needed\n• Safety plan if any SI history\n\n**Involve family/support persons** in discharge planning.\n\n**Document:**\n• Risk assessment findings\n• Patient\'s stated plan\n• Resources provided\n• Follow-up arranged',
        citation: [7],
        recommendation: 'Discharge with outpatient follow-up. Provide crisis resources (988), safety plan, and ensure follow-up arranged.',
        confidence: 'recommended',
        summary: 'Discharge if low risk, has supports, can contract for safety - provide crisis resources and follow-up',
    },
    // =====================================================================
    // ADDITIONAL INFO NODES
    // =====================================================================
    {
        id: 'ovp-delirium',
        type: 'info',
        module: 3,
        title: 'Delirium Recognition',
        body: '[Jump to Delirium Consult](#/tree/delirium)\n\n**Delirium = Organic until proven otherwise**\n\n**CAM Criteria (need 1+2, plus 3 or 4):**\n1. **Acute onset / fluctuating course** (change from baseline)\n2. **Inattention** (cannot spell WORLD backward, months backward, or count 20 to 1)\n3. **Altered level of consciousness** (hyper- or hypoactive)\n4. **Disorganized thinking** (illogical, rambling, unpredictable)\n\n**Risk factors:**\n• Age >65\n• Cognitive impairment/dementia\n• Polypharmacy\n• Recent surgery/anesthesia\n• Infection\n• Dehydration\n\n**Key distinction:**\n• Delirium: acute onset, fluctuating, inattention\n• Dementia: chronic, progressive, attention relatively preserved\n• Psychiatric: chronic/subacute, stable consciousness, intact attention',
        citation: [6, 9],
        next: 'ovp-elderly',
        summary: 'Delirium = acute onset + inattention + either altered consciousness or disorganized thinking',
    },
];
