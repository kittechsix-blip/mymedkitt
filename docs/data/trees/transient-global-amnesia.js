// MedKitt — Transient Global Amnesia
// ED evaluation and management of TGA
// Sources: Lancet Neurology Review, AAN Guidelines
// 6 modules: Assessment → Diagnostic Criteria → Mimics → Workup → Prognosis → Disposition
// ~18 nodes
export const TRANSIENT_GLOBAL_AMNESIA_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'tga-start',
        type: 'question',
        module: 1,
        title: 'TGA — ED Evaluation',
        body: '[Steps Summary](#/info/tga-steps)\n\n**Classic Presentation:**\n• Sudden onset anterograde amnesia\n• Repetitive questioning ("What day is it?" "Why am I here?")\n• Personal identity preserved\n• No focal neurologic deficits\n• Resolves within 24 hours\n\n**Key History (from witness):**\n• Exact onset time\n• Precipitating event (physical exertion, emotional stress, Valsalva, water immersion)\n• Witnessed seizure activity?\n• Recent head trauma?\n\n**Is this classic TGA?** [1][2]',
        options: [
            { label: 'Classic presentation', description: 'Anterograde amnesia, repetitive questions, no deficits', next: 'tga-criteria' },
            { label: 'Focal neurologic signs present', description: 'Weakness, speech difficulty, visual changes', next: 'tga-stroke-workup', urgency: 'critical' },
            { label: 'Seizure witnessed or post-ictal', description: 'Convulsions, tongue biting, incontinence', next: 'tga-tep' },
            { label: 'Recent head trauma', description: 'Post-traumatic amnesia', next: 'tga-trauma' },
        ],
        citation: [1, 2],
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
        body: '**Hodges & Warlow Diagnostic Criteria (1990):**\n\n**ALL must be present:**\n1. ✓ Attack witnessed by capable observer\n2. ✓ Clear-cut anterograde amnesia during attack\n3. ✓ No clouding of consciousness or loss of personal identity\n4. ✓ No focal neurologic signs during or after attack\n5. ✓ No epileptic features\n6. ✓ No recent head injury\n7. ✓ Resolution within 24 hours\n\n**Supportive features:**\n• Age typically 50-80 years\n• Precipitant often identified\n• Repetitive questioning is hallmark\n• Retrograde amnesia variable (usually hours to days)\n\n**Does patient meet ALL criteria?** [1][3]',
        options: [
            { label: 'Meets all criteria', description: 'Classic TGA', next: 'tga-confirmed' },
            { label: 'Episode >24 hours', description: 'Not TGA — further workup needed', next: 'tga-stroke-workup' },
            { label: 'Focal signs present', description: 'Not TGA — stroke workup', next: 'tga-stroke-workup', urgency: 'critical' },
            { label: 'Recurrent episodes', description: 'Atypical — consider TEP', next: 'tga-tep' },
        ],
        citation: [1, 3],
    },
    {
        id: 'tga-confirmed',
        type: 'info',
        module: 2,
        title: 'TGA Confirmed — Pathophysiology',
        body: '**Transient Global Amnesia — Confirmed:**\n\n**Epidemiology:**\n• Incidence: 3-8 per 100,000/year\n• Peak age: 50-70 years\n• Rare <40 years (consider epilepsy)\n• Slight female predominance\n\n**Proposed mechanisms:**\n• Transient hippocampal dysfunction\n• Venous congestion (Valsalva, jugular reflux)\n• Cortical spreading depression\n• NOT ischemic stroke (despite DWI lesions)\n\n**Common triggers:**\n• Physical exertion\n• Emotional stress\n• Pain\n• Sexual intercourse\n• Water immersion (hot/cold)\n• Medical procedures\n\n**DWI-MRI:**\n• May show punctate hippocampal lesions\n• Best seen 24-72h after onset\n• Not required for diagnosis [1][2][4]',
        next: 'tga-workup',
        citation: [1, 2, 4],
    },
    // =====================================================================
    // MODULE 3: MIMICS / DIFFERENTIAL
    // =====================================================================
    {
        id: 'tga-stroke-workup',
        type: 'info',
        module: 3,
        title: 'Stroke Workup — TGA Mimic',
        body: '**Posterior Circulation Stroke vs TGA:**\n\n**Red flags for stroke:**\n• Focal neurologic deficits (even transient)\n• Vertigo, diplopia, dysarthria\n• Visual field cut\n• Ataxia\n• Duration >24 hours\n• Vascular risk factors prominent\n\n**Thalamic/PCA stroke can cause:**\n• Anterograde amnesia (similar to TGA)\n• But usually has other posterior circulation signs\n\n**Workup:**\n• Non-contrast CT head (rule out hemorrhage)\n• MRI with DWI (preferred, can show acute infarct)\n• CTA head/neck\n• ECG, telemetry\n• Labs: glucose, CBC, BMP, lipids, A1c\n\n**If stroke confirmed:** Follow stroke protocol.\n\n**If negative workup and resolving:** May still be TGA. [2][5]',
        next: 'tga-workup',
        citation: [2, 5],
        safetyLevel: 'warning',
    },
    {
        id: 'tga-tep',
        type: 'info',
        module: 3,
        title: 'Transient Epileptic Amnesia',
        body: '**Transient Epileptic Amnesia (TEA) vs TGA:**\n\n**Suspect TEA if:**\n• Episodes <1 hour (TGA usually 4-6 hours)\n• Recurrent episodes (TGA rarely recurs)\n• Occurs upon waking\n• Subtle automatisms or lip smacking\n• History of epilepsy\n• Younger patient (<50)\n\n**TEA features:**\n• Brief episodes of isolated amnesia\n• May be only seizure manifestation\n• Often temporal lobe origin\n• Responds to antiepileptics\n\n**Workup:**\n• EEG (may need prolonged/sleep-deprived)\n• MRI brain with epilepsy protocol\n• Neurology referral\n\n**Treatment:**\n• Antiepileptic drugs (levetiracetam, lamotrigine)\n• Driving restrictions per state law [1][6]',
        next: 'tga-workup',
        citation: [1, 6],
    },
    {
        id: 'tga-trauma',
        type: 'info',
        module: 3,
        title: 'Post-Traumatic Amnesia',
        body: '**Post-Traumatic Amnesia vs TGA:**\n\n**Key difference:** Recent head injury\n\n**Post-traumatic amnesia (PTA):**\n• Occurs after head trauma\n• Duration correlates with injury severity\n• May have retrograde + anterograde components\n• Often associated with other TBI findings\n\n**Assessment:**\n• CT head per Canadian CT Head Rule or PECARN\n• GCS monitoring\n• Repeated neuro exams\n• Consider MRI if persistent deficits\n\n**Management:**\n• Treat underlying TBI\n• Cognitive rest\n• Return precautions\n• Neurology/neurosurgery as needed\n\n**Do NOT diagnose TGA if recent head trauma.** [1]',
        next: 'tga-disposition',
        citation: [1],
    },
    {
        id: 'tga-other-mimics',
        type: 'info',
        module: 3,
        title: 'Other TGA Mimics',
        body: '**Differential Diagnosis:**\n\n**Vascular:**\n• Posterior circulation TIA/stroke\n• Thalamic infarct\n• Subarachnoid hemorrhage\n\n**Epileptic:**\n• Transient epileptic amnesia\n• Post-ictal confusion\n• Complex partial status\n\n**Toxic/Metabolic:**\n• Hypoglycemia\n• Wernicke encephalopathy\n• Drug intoxication (benzodiazepines, anticholinergics)\n• Carbon monoxide\n\n**Psychiatric:**\n• Dissociative amnesia (psychogenic)\n• Malingering\n\n**Infectious:**\n• Herpes encephalitis (usually more confused, febrile)\n\n**Structural:**\n• Tumor (gradual, not transient)\n• Hydrocephalus\n\n**Key:** TGA is a diagnosis of exclusion. Consider workup if atypical. [1][2]',
        next: 'tga-workup',
        citation: [1, 2],
    },
    // =====================================================================
    // MODULE 4: WORKUP
    // =====================================================================
    {
        id: 'tga-workup',
        type: 'question',
        module: 4,
        title: 'TGA — Workup Strategy',
        body: '**ED Workup for TGA:**\n\n**Minimal workup (classic presentation):**\n• Fingerstick glucose\n• Basic labs if indicated (CBC, BMP)\n• ECG (atrial fibrillation screening)\n\n**Extended workup (atypical features):**\n• CT head (rule out hemorrhage, mass)\n• MRI with DWI (posterior circulation stroke, hippocampal lesions)\n• EEG (if seizure suspected)\n• CTA (vascular risk factors)\n\n**MRI findings in TGA:**\n• Small punctate DWI lesions in hippocampus\n• Best seen 24-72h after onset\n• Present in ~80% of cases\n• NOT diagnostic requirement\n\n**What is the clinical picture?** [1][4]',
        options: [
            { label: 'Classic TGA, resolving', description: 'Minimal workup sufficient', next: 'tga-prognosis' },
            { label: 'Atypical features', description: 'CT, consider MRI/EEG', next: 'tga-imaging' },
            { label: 'Concerned for stroke', description: 'Full stroke workup', next: 'tga-stroke-workup', urgency: 'urgent' },
            { label: 'Concerned for seizure', description: 'EEG, neurology consult', next: 'tga-tep' },
        ],
        citation: [1, 4],
    },
    {
        id: 'tga-imaging',
        type: 'info',
        module: 4,
        title: 'TGA — Imaging',
        body: '**Imaging in TGA:**\n\n**CT Head:**\n• Usually normal in TGA\n• Rules out hemorrhage, mass\n• Reasonable first-line for atypical cases\n\n**MRI Brain (DWI):**\n• Gold standard if obtained\n• Small hippocampal DWI lesions in 70-80%\n• Best seen 24-72 hours after symptom onset\n• CA1 region of hippocampus most affected\n• Lesions resolve without infarction\n\n**Timing of MRI:**\n• If needed, can do in ED or within 24-72h outpatient\n• Very early MRI may be negative\n• NOT required if classic presentation\n\n**CTA/MRA:**\n• Only if stroke concern\n• TGA is not a vascular event\n\n**When to image:**\n• Focal deficits\n• Duration >24h\n• Recurrent episodes\n• Young patient\n• High vascular risk [4][5]',
        next: 'tga-prognosis',
        citation: [4, 5],
    },
    // =====================================================================
    // MODULE 5: PROGNOSIS
    // =====================================================================
    {
        id: 'tga-prognosis',
        type: 'info',
        module: 5,
        title: 'TGA — Prognosis',
        body: '**Excellent Prognosis:**\n\n**Natural history:**\n• Complete resolution within 24 hours (usually 4-8h)\n• Dense amnesia for the event itself persists\n• Retrograde amnesia for hours-days before event\n• Full cognitive recovery otherwise\n\n**Recurrence:**\n• Annual recurrence rate: 2-3%\n• Lifetime recurrence: 6-10%\n• If frequent recurrence: reconsider diagnosis (TEP?)\n\n**Long-term outcomes:**\n• NO increased stroke risk\n• NO increased dementia risk\n• NO increased mortality\n• Quality of life unaffected\n\n**Reassurance is key:**\n• Patients often frightened by experience\n• Family may think it was stroke\n• Explain benign nature\n• Amnesia for the event is normal [1][2][7]',
        next: 'tga-disposition',
        citation: [1, 2, 7],
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'tga-disposition',
        type: 'question',
        module: 6,
        title: 'Disposition',
        body: '**Disposition considerations:**\n\n**Admit if:**\n• Persistent deficits >24 hours\n• Focal neurologic signs\n• Stroke on imaging\n• Recurrent episodes needing EEG\n• Diagnostic uncertainty\n\n**Discharge if:**\n• Classic TGA criteria met\n• Symptoms resolving or resolved\n• No focal deficits\n• Safe home environment\n• Reliable follow-up\n\n**What is the clinical status?**',
        options: [
            { label: 'Classic TGA, resolved', description: 'Safe for discharge', next: 'tga-discharge' },
            { label: 'Still symptomatic', description: 'Observe, may need admission', next: 'tga-observe' },
            { label: 'Stroke identified', description: 'Admit stroke service', next: 'tga-admit-stroke' },
            { label: 'Diagnostic uncertainty', description: 'Admit for workup', next: 'tga-admit-workup' },
        ],
        citation: [1],
    },
    {
        id: 'tga-observe',
        type: 'info',
        module: 6,
        title: 'TGA — Observation',
        body: '**Observation Protocol:**\n\n**If symptoms ongoing:**\n• Serial neuro exams q1-2h\n• Monitor for resolution\n• Most resolve within 4-8 hours\n• Max duration by definition: 24 hours\n\n**Reassess at 4-6 hours:**\n• Improving → continue observation, plan discharge\n• Worsening or focal signs → CT/MRI, neuro consult\n\n**Reassess at 24 hours:**\n• Resolved → discharge with follow-up\n• NOT resolved → no longer TGA, admit for workup\n\n**During observation:**\n• Keep patient calm (repetitive questioning is distressing)\n• Family at bedside for support\n• Simple, repeated orientation\n• Written information (patient won\'t remember your explanations)\n\n**Document:** Time of onset, duration, resolution time. [1]',
        next: 'tga-disposition',
        citation: [1],
    },
    {
        id: 'tga-discharge',
        type: 'result',
        module: 6,
        title: 'Discharge — TGA Resolved',
        body: '**Discharge — Classic TGA:**\n\n**Criteria:**\n• Symptoms fully resolved\n• No focal deficits\n• Normal mental status\n• Able to form new memories\n• Safe home environment with observer\n\n**Instructions:**\n• TGA is benign, NOT a stroke\n• Patient will NOT remember the episode\n• This is normal and expected\n• Low recurrence risk (2-3%/year)\n• No specific treatment needed\n\n**Activity:**\n• No driving for 24-48 hours (patient discretion)\n• No legal/financial decisions for 24 hours\n• Avoid triggers if identified\n\n**Follow-up:**\n• PCP within 1-2 weeks\n• Neurology if recurrent or atypical\n• MRI outpatient if desired (not required)\n\n**Return for:**\n• New episode\n• Focal weakness or numbness\n• Speech difficulty\n• Severe headache',
        recommendation: 'Discharge home. Classic TGA, benign prognosis. No driving 24-48h. PCP follow-up 1-2 weeks. Return for new symptoms.',
        citation: [1, 7],
    },
    {
        id: 'tga-admit-stroke',
        type: 'result',
        module: 6,
        title: 'Admit — Stroke Identified',
        body: '**Admission for Stroke:**\n\n**If stroke identified on workup:**\n• This is NOT TGA\n• Follow standard stroke protocols\n• Admit to stroke service/neuro ICU\n\n**Standard stroke workup:**\n• MRI DWI if not done\n• CTA head/neck\n• Echo (TTE or TEE)\n• Telemetry\n• Lipids, A1c\n• Hypercoagulability workup if young\n\n**Treatment:**\n• Antiplatelet therapy\n• Statin\n• Risk factor modification\n• Consider thrombolysis if within window and deficit present\n\n**Posterior circulation stroke note:**\n• Can present with isolated amnesia\n• Usually has other brainstem/cerebellar signs\n• Higher stroke risk than TGA',
        recommendation: 'Admit stroke service. This is NOT TGA. Follow stroke protocol.',
        citation: [5],
    },
    {
        id: 'tga-admit-workup',
        type: 'result',
        module: 6,
        title: 'Admit — Diagnostic Uncertainty',
        body: '**Admission for Workup:**\n\n**Indications:**\n• Symptoms >24 hours\n• Recurrent episodes\n• Atypical features\n• Cannot rule out stroke/seizure\n• Young patient (<50)\n\n**Workup:**\n• MRI brain with DWI\n• EEG (routine or prolonged)\n• Continuous telemetry\n• Neurology consult\n\n**If TEA suspected:**\n• EEG (may need sleep-deprived)\n• Trial of antiepileptic\n\n**If vascular concern:**\n• Complete stroke workup\n• Echo, CTA\n\n**Observation:**\n• Serial neuro exams\n• Document resolution time\n• Memory testing\n\n**Most will still be TGA** — but workup needed for atypical cases.',
        recommendation: 'Admit for observation and workup. MRI, EEG, neuro consult. Monitor for resolution.',
        citation: [1],
    },
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
    { num: 1, text: 'Arena JE, Rabinstein AA. Transient Global Amnesia. Mayo Clin Proc. 2015;90(2):264-272.' },
    { num: 2, text: 'Bartsch T, Deuschl G. Transient global amnesia: functional anatomy and clinical implications. Lancet Neurol. 2010;9(2):205-214.' },
    { num: 3, text: 'Hodges JR, Warlow CP. Syndromes of transient amnesia: towards a classification. A study of 153 cases. J Neurol Neurosurg Psychiatry. 1990;53(10):834-843.' },
    { num: 4, text: 'Bartsch T, et al. Focal lesions of human hippocampal CA1 neurons in transient global amnesia impair place memory. Science. 2010;328(5984):1412-1415.' },
    { num: 5, text: 'Enzinger C, et al. Transient global amnesia: diffusion-weighted imaging lesions and cerebrovascular disease. Stroke. 2008;39(8):2219-2225.' },
    { num: 6, text: 'Zeman AZ, et al. Transient epileptic amnesia: a description of the clinical and neuropsychological features in 10 cases and a review of the literature. J Neurol Neurosurg Psychiatry. 1998;64(4):435-443.' },
    { num: 7, text: 'Pantoni L, et al. Transient global amnesia: a review emphasizing pathogenic aspects. Acta Neurol Scand. 2000;102(5):275-283.' },
];
