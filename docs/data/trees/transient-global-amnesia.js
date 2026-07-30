// MedKitt — Transient Global Amnesia
// ED evaluation and management of TGA
// Sources: see TRANSIENT_GLOBAL_AMNESIA_CITATIONS below. Primary instruments are
// Hodges & Warlow (JNNP 1990, PMID 2266362) for the diagnostic criteria, the German
// Society of Neurology S1 TGA guideline (PMID 37076927), Bartsch & Deuschl
// (Lancet Neurol 2010, PMID 20129169), and Arena et al. (Mayo Clin Proc 2017,
// PMID 28185658) for long-term outcome. NOTE: the prior header claimed "AAN
// Guidelines" as a source; the American Academy of Neurology has published no
// guideline on transient global amnesia, and no such document is cited below.
// 6 modules: Assessment → Diagnostic Criteria → Mimics → Workup → Prognosis → Disposition
// 15 nodes
export const TRANSIENT_GLOBAL_AMNESIA_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'tga-start',
        type: 'question',
        module: 1,
        title: 'TGA — ED Evaluation',
        body: '[Steps Summary](#/info/tga-steps)\n\n**Classic Presentation:**\n• Sudden onset anterograde amnesia\n• Repetitive questioning ("What day is it?" "Why am I here?")\n• Personal identity preserved\n• No focal neurologic deficits\n• Resolves within 24 hours\n\n**Key History (from witness):**\n• Exact onset time\n• Precipitating event (physical exertion, emotional stress, Valsalva, water immersion)\n• Witnessed seizure activity?\n• Recent head trauma?\n\n**Is this classic TGA?** [1][2]\n\n*Basis: Hodges & Warlow transient-amnesia diagnostic criteria and classification [3]; German Society of Neurology (DGN) S1 guideline on Transient Global Amnesia [12]; peer-reviewed reviews [1][2].*',
        options: [
            { label: 'Classic presentation', description: 'Anterograde amnesia, repetitive questions, no deficits', next: 'tga-criteria' },
            { label: 'Focal neurologic signs present', description: 'Weakness, speech difficulty, visual changes', next: 'tga-stroke-workup', urgency: 'critical' },
            { label: 'Seizure witnessed or post-ictal', description: 'Convulsions, tongue biting, incontinence', next: 'tga-tep' },
            { label: 'Recent head trauma', description: 'Post-traumatic amnesia', next: 'tga-trauma' },
        ],
        citation: [1, 2, 3, 12],
        calculatorLinks: [
            { id: 'weight-dose', label: 'Weight Calculator' },
        ],
    },
    // =====================================================================
    // MODULE 2: DIAGNOSTIC CRITERIA
    // =====================================================================
    {
        id: 'tga-criteria',
        type: 'question',
        module: 2,
        title: 'TGA — Diagnostic Criteria',
        body: '**Hodges & Warlow Diagnostic Criteria (1990):**\n\n**ALL must be present:**\n1. ✓ Attack witnessed by capable observer\n2. ✓ Clear-cut anterograde amnesia during attack\n3. ✓ No clouding of consciousness or loss of personal identity\n4. ✓ No focal neurologic signs during or after attack\n5. ✓ No epileptic features\n6. ✓ No recent head injury\n7. ✓ Resolution within 24 hours\n\n**Supportive features:**\n• Age typically 50-80 years\n• Precipitant often identified\n• Repetitive questioning is hallmark\n• Retrograde amnesia variable (usually hours to days)\n\n**Does patient meet ALL criteria?** [1][3]\n\n*Basis: criteria as published in Hodges JR, Warlow CP. J Neurol Neurosurg Psychiatry. 1990;53(10):834-843 [3], with the companion Brain 1990 case-control cohort of 114 criteria-fulfilling cases [8]. The DGN S1 guideline states the diagnosis of TGA should be made clinically [12].*',
        options: [
            { label: 'Meets all criteria', description: 'Classic TGA', next: 'tga-confirmed' },
            { label: 'Episode >24 hours', description: 'Not TGA — further workup needed', next: 'tga-stroke-workup' },
            { label: 'Focal signs present', description: 'Not TGA — stroke workup', next: 'tga-stroke-workup', urgency: 'critical' },
            { label: 'Recurrent episodes', description: 'Atypical — consider TEP', next: 'tga-tep' },
        ],
        citation: [1, 3, 8, 12],
    },
    {
        id: 'tga-confirmed',
        type: 'info',
        module: 2,
        title: 'TGA Confirmed — Pathophysiology',
        body: '**Transient Global Amnesia — Confirmed:**\n\n**Epidemiology:**\n• Incidence: 3-8 per 100,000/year\n• Peak age: 50-70 years\n• Rare <40 years (consider epilepsy)\n• Slight female predominance\n\n**Proposed mechanisms:**\n• Transient hippocampal dysfunction\n• Venous congestion (Valsalva, jugular reflux)\n• Cortical spreading depression\n• NOT ischemic stroke (despite DWI lesions)\n\n**Common triggers:**\n• Physical exertion\n• Emotional stress\n• Pain\n• Sexual intercourse\n• Water immersion (hot/cold)\n• Medical procedures\n\n**DWI-MRI:**\n• May show punctate hippocampal lesions\n• Best seen 24-72h after onset\n• Not required for diagnosis [1][2][4]\n\n*Basis: incidence 3-8 per 100,000/year and 50-70 year predominance are stated in the DGN S1 TGA guideline [12] and the 142-case Quinette series [9]; CA1 hippocampal lesion biology from Bartsch, Science 2010 [4]; the 24-72h DWI detection window from Sedlaczek, Neurology 2004 [11] and [12]; "not required for diagnosis" from the DGN statement that TGA is a clinical diagnosis [12].*',
        next: 'tga-workup',
        citation: [1, 2, 4, 9, 11, 12],
    },
    // =====================================================================
    // MODULE 3: MIMICS / DIFFERENTIAL
    // =====================================================================
    {
        id: 'tga-stroke-workup',
        type: 'info',
        module: 3,
        title: 'Stroke Workup — TGA Mimic',
        body: '**Posterior Circulation Stroke vs TGA:**\n\n**Red flags for stroke:**\n• Focal neurologic deficits (even transient)\n• Vertigo, diplopia, dysarthria\n• Visual field cut\n• Ataxia\n• Duration >24 hours\n• Vascular risk factors prominent\n\n**Thalamic/PCA stroke can cause:**\n• Anterograde amnesia (similar to TGA)\n• But usually has other posterior circulation signs\n\n**Workup:**\n• Non-contrast CT head (rule out hemorrhage)\n• MRI with DWI (preferred, can show acute infarct)\n• CTA head/neck\n• ECG, telemetry\n• Labs: glucose, CBC, BMP, lipids, A1c\n\n**If stroke confirmed:** Follow stroke protocol.\n\n**If negative workup and resolving:** May still be TGA. [2][5]\n\n*Basis: TIA definition and required evaluation from the AHA/ASA scientific statement [14]; vascular workup elements (CTA, telemetry, lipids, A1c) from the AHA/ASA 2021 stroke/TIA secondary-prevention guideline [15]; acute ischemic stroke pathway from the AHA/ASA 2026 early-management guideline [16]; DWI change outside the hippocampus should prompt vascular evaluation per the DGN S1 guideline [12]; TGA-vs-cerebrovascular-disease imaging comparison from Enzinger, Stroke 2008 [5].*',
        next: 'tga-workup',
        citation: [2, 5, 12, 14, 15, 16],
        safetyLevel: 'warning',
    },
    {
        id: 'tga-tep',
        type: 'info',
        module: 3,
        title: 'Transient Epileptic Amnesia',
        body: '**Transient Epileptic Amnesia (TEA) vs TGA:**\n\n**Suspect TEA if:**\n• Episodes <1 hour (TGA usually 4-8 hours)\n• Recurrent episodes (TGA rarely recurs)\n• Occurs upon waking\n• Subtle automatisms or lip smacking\n• History of epilepsy\n• Younger patient (<50)\n\n**TEA features:**\n• Brief episodes of isolated amnesia\n• May be only seizure manifestation\n• Often temporal lobe origin\n• Responds to antiepileptics\n\n**Workup:**\n• EEG (may need prolonged/sleep-deprived)\n• MRI brain with epilepsy protocol\n• Neurology referral\n\n**Treatment:**\n• Antiepileptic drugs (levetiracetam, lamotrigine)\n• Driving restrictions per state law [1][6]\n\n*Basis: TEA phenotype (brief, recurrent, on waking) from Zeman, J Neurol Neurosurg Psychiatry 1998 [6] and the 50-case Butler series, Ann Neurol 2007 [13]; EEG to differentiate rare amnestic epileptic attacks, especially when recurrent, per the DGN S1 TGA guideline [12]. Driving restrictions are set by state statute, not by these sources.*',
        next: 'tga-workup',
        citation: [1, 6, 12, 13],
    },
    {
        id: 'tga-trauma',
        type: 'info',
        module: 3,
        title: 'Post-Traumatic Amnesia',
        body: '**Post-Traumatic Amnesia vs TGA:**\n\n**Key difference:** Recent head injury\n\n**Post-traumatic amnesia (PTA):**\n• Occurs after head trauma\n• Duration correlates with injury severity\n• May have retrograde + anterograde components\n• Often associated with other TBI findings\n\n**Assessment:**\n• CT head per Canadian CT Head Rule or PECARN\n• GCS monitoring\n• Repeated neuro exams\n• Consider MRI if persistent deficits\n\n**Management:**\n• Treat underlying TBI\n• Cognitive rest\n• Return precautions\n• Neurology/neurosurgery as needed\n\n**Do NOT diagnose TGA if recent head trauma.** [1]\n\n*Basis: recent head injury is an explicit exclusion in the Hodges & Warlow diagnostic criteria [3]. The CT decision rules named here are the Canadian CT Head Rule (Stiell, Lancet 2001) [17] and PECARN (Kuppermann, Lancet 2009) [18].*',
        next: 'tga-disposition',
        citation: [1, 3, 17, 18],
    },
    {
        id: 'tga-other-mimics',
        type: 'info',
        module: 3,
        title: 'Other TGA Mimics',
        body: '**Differential Diagnosis:**\n\n**Vascular:**\n• Posterior circulation TIA/stroke\n• Thalamic infarct\n• Subarachnoid hemorrhage\n\n**Epileptic:**\n• Transient epileptic amnesia\n• Post-ictal confusion\n• Complex partial status\n\n**Toxic/Metabolic:**\n• Hypoglycemia\n• Wernicke encephalopathy\n• Drug intoxication (benzodiazepines, anticholinergics)\n• Carbon monoxide\n\n**Psychiatric:**\n• Dissociative amnesia (psychogenic)\n• Malingering\n\n**Infectious:**\n• Herpes encephalitis (usually more confused, febrile)\n\n**Structural:**\n• Tumor (gradual, not transient)\n• Hydrocephalus\n\n**Key:** TGA is a diagnosis of exclusion. Consider workup if atypical. [1][2]\n\n*Basis: differential per [1][2]; the DGN S1 TGA guideline directs that when the presentation is atypical or a differential diagnosis is suspected, further diagnostics should be performed immediately [12]. Hodges & Warlow showed that patients presenting with transient amnesia who do NOT meet the criteria have a significantly worse prognosis with a high incidence of major vascular events [3].*',
        next: 'tga-workup',
        citation: [1, 2, 3, 12],
    },
    // =====================================================================
    // MODULE 4: WORKUP
    // =====================================================================
    {
        id: 'tga-workup',
        type: 'question',
        module: 4,
        title: 'TGA — Workup Strategy',
        body: '**ED Workup for TGA:**\n\n**Minimal workup (classic presentation):**\n• Fingerstick glucose\n• Basic labs if indicated (CBC, BMP)\n• ECG (atrial fibrillation screening)\n\n**Extended workup (atypical features):**\n• CT head (rule out hemorrhage, mass)\n• MRI with DWI (posterior circulation stroke, hippocampal lesions)\n• EEG (if seizure suspected)\n• CTA (vascular risk factors)\n\n**MRI findings in TGA:**\n• Small punctate DWI lesions in hippocampus\n• Best seen 24-72h after onset\n• Present in ~80% of cases\n• NOT diagnostic requirement\n\n**What is the clinical picture?** [1][4]\n\n*Basis: hippocampal DWI yield and the 24-72h detection window from Sedlaczek, Neurology 2004 [11] and the DGN S1 TGA guideline [12]; CA1 lesion localisation from Bartsch, Science 2010 [4]. "NOT diagnostic requirement" rests on Hodges & Warlow, who classify criteria-fulfilling attacks of more than one hour as not requiring detailed investigation [3], and on the DGN statement that the diagnosis of TGA should be made clinically [12].*',
        options: [
            { label: 'Classic TGA, resolving', description: 'Minimal workup sufficient', next: 'tga-prognosis' },
            { label: 'Atypical features', description: 'CT, consider MRI/EEG', next: 'tga-imaging' },
            { label: 'Concerned for stroke', description: 'Full stroke workup', next: 'tga-stroke-workup', urgency: 'urgent' },
            { label: 'Concerned for seizure', description: 'EEG, neurology consult', next: 'tga-tep' },
        ],
        citation: [1, 3, 4, 11, 12],
    },
    {
        id: 'tga-imaging',
        type: 'info',
        module: 4,
        title: 'TGA — Imaging',
        body: '**Imaging in TGA:**\n\n**CT Head:**\n• Usually normal in TGA\n• Rules out hemorrhage, mass\n• Reasonable first-line for atypical cases\n\n**MRI Brain (DWI):**\n• Gold standard if obtained\n• Small hippocampal DWI lesions in 70-80%\n• Best seen 24-72 hours after symptom onset\n• CA1 region of hippocampus most affected\n• Lesions resolve without infarction\n\n**Timing of MRI:**\n• If needed, can do in ED or within 24-72h outpatient\n• Very early MRI may be negative\n• NOT required if classic presentation\n\n**CTA/MRA:**\n• Only if stroke concern\n• TGA is not a vascular event\n\n**When to image:**\n• Focal deficits\n• Duration >24h\n• Recurrent episodes\n• Young patient\n• High vascular risk [4][5]\n\n*Basis: CA1 hippocampal lesion localisation from Bartsch, Science 2010 [4]; delayed lesion detection at 24-72h — and the fact that very early MRI is frequently negative — from Sedlaczek, Neurology 2004 [11] and the DGN S1 TGA guideline [12]. "NOT required if classic presentation" rests specifically on Hodges & Warlow, whose classification states that criteria-fulfilling attacks of more than one hour duration do not require detailed investigation [3], and on the DGN statement that the diagnosis of TGA should be made clinically [12]. Extrahippocampal DWI change should redirect to vascular evaluation [12][5].*',
        next: 'tga-prognosis',
        citation: [3, 4, 5, 11, 12],
    },
    // =====================================================================
    // MODULE 5: PROGNOSIS
    // =====================================================================
    {
        id: 'tga-prognosis',
        type: 'info',
        module: 5,
        title: 'TGA — Prognosis',
        body: '**Excellent Prognosis:**\n\n**Natural history:**\n• Complete resolution within 24 hours (usually 4-8h)\n• Dense amnesia for the event itself persists\n• Retrograde amnesia for hours-days before event\n• Full cognitive recovery otherwise\n\n**Recurrence:**\n• Annual recurrence rate: 2-3%\n• Lifetime recurrence: 6-10%\n• If frequent recurrence: reconsider diagnosis (TEP?)\n\n**Long-term outcomes:**\n• NO increased stroke risk\n• NO increased dementia risk\n• NO increased mortality\n• Quality of life unaffected\n\n**Reassurance is key:**\n• Patients often frightened by experience\n• Family may think it was stroke\n• Explain benign nature\n• Amnesia for the event is normal [1][2][7]\n\n*Basis: the absence of increased long-term risk of cerebrovascular events, seizures, cognitive impairment or death comes from the Olmsted County population-based study — 221 TGA patients vs 221 age- and sex-matched controls, mean 12-year follow-up, no significant difference in any endpoint (Arena, Mayo Clin Proc 2017) [10] — and is concordant with the DGN S1 guideline conclusion that there is no evidence for chronic sequelae with respect to cerebral ischemia, chronic memory impairment, or dementia [12]. Recurrence source data, for independent review: pooled meta-analysis of 4,514 TGA cases reports 12.73% recurrence overall (Hernández, Neurol Clin Pract 2022) [19]; the Olmsted County cohort reports 5.4% at median 4.2 years [10]; Quinette 142-case series [9].*',
        next: 'tga-disposition',
        citation: [1, 2, 7, 9, 10, 12, 19],
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'tga-disposition',
        type: 'question',
        module: 6,
        title: 'Disposition',
        body: '**Disposition considerations:**\n\n**Admit if:**\n• Persistent deficits >24 hours\n• Focal neurologic signs\n• Stroke on imaging\n• Recurrent episodes needing EEG\n• Diagnostic uncertainty\n\n**Discharge if:**\n• Classic TGA criteria met\n• Symptoms resolving or resolved\n• No focal deficits\n• Safe home environment\n• Reliable follow-up\n\n**What is the clinical status?**\n\n*Basis: the admit triggers listed (duration >24 hours, focal signs, recurrent episodes, diagnostic uncertainty) are the Hodges & Warlow exclusion criteria [3], reinforced by the DGN S1 guideline direction to perform further diagnostics immediately for atypical presentations or suspected differential diagnoses [12]. The discharge arm rests on the benign long-term course documented in the Olmsted County matched-cohort study [10].*',
        options: [
            { label: 'Classic TGA, resolved', description: 'Safe for discharge', next: 'tga-discharge' },
            { label: 'Still symptomatic', description: 'Observe, may need admission', next: 'tga-observe' },
            { label: 'Stroke identified', description: 'Admit stroke service', next: 'tga-admit-stroke' },
            { label: 'Diagnostic uncertainty', description: 'Admit for workup', next: 'tga-admit-workup' },
        ],
        citation: [1, 3, 10, 12],
    },
    {
        id: 'tga-observe',
        type: 'info',
        module: 6,
        title: 'TGA — Observation',
        body: '**Observation Protocol:**\n\n**If symptoms ongoing:**\n• Serial neuro exams q1-2h\n• Monitor for resolution\n• Most resolve within 4-8 hours\n• Max duration by definition: 24 hours\n\n**Reassess at 4-6 hours:**\n• Improving → continue observation, plan discharge\n• Worsening or focal signs → CT/MRI, neuro consult\n\n**Reassess at 24 hours:**\n• Resolved → discharge with follow-up\n• NOT resolved → no longer TGA, admit for workup\n\n**During observation:**\n• Keep patient calm (repetitive questioning is distressing)\n• Family at bedside for support\n• Simple, repeated orientation\n• Written information (patient won\'t remember your explanations)\n\n**Document:** Time of onset, duration, resolution time. [1]\n\n*Basis: attack duration of one hour to a maximum of 24 hours with an average of 6-8 hours is stated in the DGN S1 TGA guideline [12] and the 142-case Quinette series [9]; resolution within 24 hours is Hodges & Warlow criterion 7, so failure to resolve by 24 hours removes the diagnosis [3].*',
        next: 'tga-disposition',
        citation: [1, 3, 9, 12],
    },
    {
        id: 'tga-discharge',
        type: 'result',
        module: 6,
        title: 'Discharge — TGA Resolved',
        body: '**Discharge — Classic TGA:**\n\n**Criteria:**\n• Symptoms fully resolved\n• No focal deficits\n• Normal mental status\n• Able to form new memories\n• Safe home environment with observer\n\n**Instructions:**\n• TGA is benign, NOT a stroke\n• Patient will NOT remember the episode\n• This is normal and expected\n• Low recurrence risk (2-3%/year)\n• No specific treatment needed\n\n**Activity:**\n• No driving for 24-48 hours (patient discretion)\n• No legal/financial decisions for 24 hours\n• Avoid triggers if identified\n\n**Follow-up:**\n• PCP within 1-2 weeks\n• Neurology if recurrent or atypical\n• MRI outpatient if desired (not required)\n\n**Return for:**\n• New episode\n• Focal weakness or numbness\n• Speech difficulty\n• Severe headache\n\n*Basis for this discharge decision, for independent review: "TGA is benign, NOT a stroke" and the absence of increased long-term stroke, seizure, cognitive-impairment or mortality risk rest on the Olmsted County population-based matched-cohort study, 221 TGA cases vs 221 controls, mean 12-year follow-up (Arena, Mayo Clin Proc 2017) [10], and on the DGN S1 guideline conclusion that there is no evidence for chronic sequelae [12]. "MRI outpatient if desired (not required)" rests on Hodges & Warlow — criteria-fulfilling attacks of more than one hour do not require detailed investigation [3] — and on the DGN statement that TGA is a clinical diagnosis [12]. Recurrence source data: 12.73% pooled across 4,514 cases [19]; 5.4% at median 4.2 years in the population-based cohort [10]. The "no driving for 24-48 hours" and "no legal/financial decisions for 24 hours" intervals are expert-consensus practice; no trial or guideline instrument in this reference list establishes those specific time windows.*',
        recommendation: 'Discharge home. Classic TGA, benign prognosis. No driving 24-48h. PCP follow-up 1-2 weeks. Return for new symptoms.',
        citation: [1, 3, 7, 10, 12, 19],
    },
    {
        id: 'tga-admit-stroke',
        type: 'result',
        module: 6,
        title: 'Admit — Stroke Identified',
        body: '**Admission for Stroke:**\n\n**If stroke identified on workup:**\n• This is NOT TGA\n• Follow standard stroke protocols\n• Admit to stroke service/neuro ICU\n\n**Standard stroke workup:**\n• MRI DWI if not done\n• CTA head/neck\n• Echo (TTE or TEE)\n• Telemetry\n• Lipids, A1c\n• Hypercoagulability workup if young\n\n**Treatment:**\n• Antiplatelet therapy\n• Statin\n• Risk factor modification\n• Consider thrombolysis if within window and deficit present\n\n**Posterior circulation stroke note:**\n• Can present with isolated amnesia\n• Usually has other brainstem/cerebellar signs\n• Higher stroke risk than TGA\n\n*Basis: antiplatelet therapy, statin and risk-factor modification are per the AHA/ASA 2021 Guideline for the Prevention of Stroke in Patients With Stroke and TIA [15]; thrombolysis eligibility, time windows and acute inpatient stroke management are per the AHA/ASA 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke [16]; the TIA definition and required evaluation are per the AHA/ASA scientific statement [14]; the TGA-versus-cerebrovascular-disease comparison is from Enzinger, Stroke 2008 [5].*',
        recommendation: 'Admit stroke service. This is NOT TGA. Follow stroke protocol.',
        citation: [5, 14, 15, 16],
    },
    {
        id: 'tga-admit-workup',
        type: 'result',
        module: 6,
        title: 'Admit — Diagnostic Uncertainty',
        body: '**Admission for Workup:**\n\n**Indications:**\n• Symptoms >24 hours\n• Recurrent episodes\n• Atypical features\n• Cannot rule out stroke/seizure\n• Young patient (<50)\n\n**Workup:**\n• MRI brain with DWI\n• EEG (routine or prolonged)\n• Continuous telemetry\n• Neurology consult\n\n**If TEA suspected:**\n• EEG (may need sleep-deprived)\n• Trial of antiepileptic\n\n**If vascular concern:**\n• Complete stroke workup\n• Echo, CTA\n\n**Observation:**\n• Serial neuro exams\n• Document resolution time\n• Memory testing\n\n**Most will still be TGA** — but workup needed for atypical cases.\n\n*Basis: the DGN S1 TGA guideline states that TGA in patients under 50 years of age is a rarity and that it is mandatory to rapidly search for other causes in younger patients, and that EEG may help differentiate TGA from rare amnestic epileptic attacks, especially when attacks are recurrent [12]. EEG and antiepileptic trial for suspected transient epileptic amnesia are per Butler, Ann Neurol 2007 [13] and Zeman, J Neurol Neurosurg Psychiatry 1998 [6]. Symptoms beyond 24 hours exclude TGA by Hodges & Warlow criterion 7 [3]; Hodges & Warlow further showed that transient-amnesia patients who fail the criteria carry a significantly worse prognosis with a high incidence of major vascular events [3].*',
        recommendation: 'Admit for observation and workup. MRI, EEG, neuro consult. Monitor for resolution.',
        citation: [1, 3, 6, 12, 13],
    },
];
// =====================================================================
// Critical Actions — each string is lifted verbatim from the body of the
// node it anchors to, so a clinician can open the node and read the
// directive in its original context (Prong-4 independent review).
// =====================================================================
export const TRANSIENT_GLOBAL_AMNESIA_CRITICAL_ACTIONS = [
    { text: 'Fingerstick glucose', nodeId: 'tga-workup' },
    { text: 'TGA is a diagnosis of exclusion. Consider workup if atypical.', nodeId: 'tga-other-mimics' },
    { text: 'Do NOT diagnose TGA if recent head trauma.', nodeId: 'tga-trauma' },
    { text: 'Non-contrast CT head (rule out hemorrhage)', nodeId: 'tga-stroke-workup' },
    { text: 'MRI with DWI (preferred, can show acute infarct)', nodeId: 'tga-stroke-workup' },
    { text: 'NOT ischemic stroke (despite DWI lesions)', nodeId: 'tga-confirmed' },
    { text: 'Very early MRI may be negative', nodeId: 'tga-imaging' },
    { text: 'NOT resolved → no longer TGA, admit for workup', nodeId: 'tga-observe' },
    { text: 'Written information (patient won\'t remember your explanations)', nodeId: 'tga-observe' },
    { text: 'Consider thrombolysis if within window and deficit present', nodeId: 'tga-admit-stroke' },
    { text: 'Driving restrictions per state law', nodeId: 'tga-tep' },
    { text: 'Safe home environment with observer', nodeId: 'tga-discharge' },
    { text: 'No driving for 24-48 hours (patient discretion)', nodeId: 'tga-discharge' },
];
// =====================================================================
// Module Labels
// =====================================================================
export const TRANSIENT_GLOBAL_AMNESIA_MODULE_LABELS = [
    'Assessment',
    'Diagnostic Criteria',
    'Mimics',
    'Workup',
    'Prognosis',
    'Disposition',
];
// =====================================================================
// Citations
// =====================================================================
export const TRANSIENT_GLOBAL_AMNESIA_CITATIONS = [
    { num: 1, text: 'Arena JE, Rabinstein AA. Transient global amnesia. Mayo Clin Proc. 2015;90(2):264-272. PMID 25659242.' },
    { num: 2, text: 'Bartsch T, Deuschl G. Transient global amnesia: functional anatomy and clinical implications. Lancet Neurol. 2010;9(2):205-214. PMID 20129169.' },
    { num: 3, text: 'Hodges JR, Warlow CP. Syndromes of transient amnesia: towards a classification. A study of 153 cases. J Neurol Neurosurg Psychiatry. 1990;53(10):834-843. PMID 2266362. doi:10.1136/jnnp.53.10.834. [Source of the diagnostic criteria and of the statement that criteria-fulfilling attacks of more than one hour do not require detailed investigation.]' },
    { num: 4, text: 'Bartsch T, et al. Focal lesions of human hippocampal CA1 neurons in transient global amnesia impair place memory. Science. 2010;328(5984):1412-1415. PMID 20538952.' },
    { num: 5, text: 'Enzinger C, et al. Transient global amnesia: diffusion-weighted imaging lesions and cerebrovascular disease. Stroke. 2008;39(8):2219-2225. PMID 18583561.' },
    { num: 6, text: 'Zeman AZ, et al. Transient epileptic amnesia: a description of the clinical and neuropsychological features in 10 cases and a review of the literature. J Neurol Neurosurg Psychiatry. 1998;64(4):435-443. PMID 9576532.' },
    { num: 7, text: 'Pantoni L, et al. Transient global amnesia: a review emphasizing pathogenic aspects. Acta Neurol Scand. 2000;102(5):275-283. PMID 11083503.' },
    { num: 8, text: 'Hodges JR, Warlow CP. The aetiology of transient global amnesia. A case-control study of 114 cases with prospective follow-up. Brain. 1990;113(Pt 3):639-657. PMID 2194627.' },
    { num: 9, text: 'Quinette P, Guillery-Girard B, Dayan J, et al. What does transient global amnesia really mean? Review of the literature and thorough study of 142 cases. Brain. 2006;129(Pt 7):1640-1658. PMID 16670178.' },
    { num: 10, text: 'Arena JE, Brown RD, Mandrekar J, Rabinstein AA. Long-term outcome in patients with transient global amnesia: a population-based study. Mayo Clin Proc. 2017;92(3):399-405. PMID 28185658. doi:10.1016/j.mayocp.2016.11.015. [221 TGA patients vs 221 matched controls, mean 12-year follow-up: no significant difference in cerebrovascular events, seizures, cognitive impairment or death; recurrence 5.4% at median 4.21 years.]' },
    { num: 11, text: 'Sedlaczek O, Hirsch JG, Grips E, et al. Detection of delayed focal MR changes in the lateral hippocampus in transient global amnesia. Neurology. 2004;62(12):2165-2170. PMID 15210876.' },
    { num: 12, text: 'Sander D, Bartsch T, Connolly F, et al. Guideline "Transient Global Amnesia (TGA)" of the German Society of Neurology (Deutsche Gesellschaft fuer Neurologie): S1-guideline. Neurol Res Pract. 2023;5(1):15. PMID 37076927. doi:10.1186/s42466-023-00240-0. [Erratum: Neurol Res Pract. 2023;5(1):64. PMID 37941049.]' },
    { num: 13, text: 'Butler CR, Graham KS, Hodges JR, et al. The syndrome of transient epileptic amnesia. Ann Neurol. 2007;61(6):587-598. PMID 17444534.' },
    { num: 14, text: 'Easton JD, Saver JL, Albers GW, et al. Definition and evaluation of transient ischemic attack: a scientific statement for healthcare professionals from the American Heart Association/American Stroke Association. Stroke. 2009;40(6):2276-2293. PMID 19423857.' },
    { num: 15, text: 'Kleindorfer DO, Towfighi A, Chaturvedi S, et al. 2021 Guideline for the Prevention of Stroke in Patients With Stroke and Transient Ischemic Attack: a guideline from the American Heart Association/American Stroke Association. Stroke. 2021;52(7):e364-e467. PMID 34024117.' },
    { num: 16, text: 'Prabhakaran S, Gonzalez NR, Zachrison KS, et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke: a guideline from the American Heart Association/American Stroke Association. Stroke. 2026;57(8):e316-e436. PMID 41582814. [Correction: Stroke. 2026;57(8):e461-e467. PMID 42507797.]' },
    { num: 17, text: 'Stiell IG, Wells GA, Vandemheen K, et al. The Canadian CT Head Rule for patients with minor head injury. Lancet. 2001;357(9266):1391-1396. PMID 11356436.' },
    { num: 18, text: 'Kuppermann N, Holmes JF, Dayan PS, et al. Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study. Lancet. 2009;374(9696):1160-1170. PMID 19758692.' },
    { num: 19, text: 'Hernandez MA, Arena JE, Alessandro L, Allegri RF, Calandri IL. Transient global amnesia recurrence: prevalence and risk factor meta-analysis. Neurol Clin Pract. 2022;12(4):e35-e48. PMID 36382126. doi:10.1212/CPJ.0000000000001181. [36 studies, 4,514 TGA cases, 544 recurrence events = 12.73%.]' },
];
