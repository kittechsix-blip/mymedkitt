// MedKitt - Acute Psychosis Consult
// First-break psychosis workup, organic vs primary, anti-NMDA encephalitis
// ~20 nodes
export const ACUTE_PSYCHOSIS_CRITICAL_ACTIONS = [
    { text: 'New-onset psychosis age >45 = medical cause until proven otherwise', nodeId: 'ap-start' },
    { text: '20% of first-break psychosis has organic etiology - always workup', nodeId: 'ap-workup' },
    { text: 'Anti-NMDA receptor encephalitis: young women, prodrome, movement disorders', nodeId: 'ap-nmda' },
    { text: 'Rule out delirium: acute onset, fluctuating, inattention, visual hallucinations', nodeId: 'ap-delirium' },
];
export const ACUTE_PSYCHOSIS_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'ap-start',
        type: 'question',
        module: 1,
        title: 'Acute Psychosis Assessment',
        body: '**First-break or new-onset psychosis?**\n\n**Key questions:**\n* Age at onset?\n* Prior psychiatric history?\n* Onset timing (hours vs weeks)?\n* Substance use?\n\n**Red flags for organic cause:**\n* Age >45 with no prior psych history\n* Acute onset (hours-days)\n* Visual hallucinations predominant\n* Fluctuating mental status\n* Abnormal vital signs\n* New neurological deficits\n* Recent illness/prodrome',
        options: [
            { label: 'First-Break (No Prior History)', description: 'New-onset psychosis - full workup needed', next: 'ap-age' },
            { label: 'Known Psychiatric Patient', description: 'Established diagnosis - exacerbation', next: 'ap-known', urgency: 'urgent' },
            { label: 'Currently Agitated', description: 'Safety first - de-escalate before workup', next: 'ap-agitated', urgency: 'critical' },
        ],
        citation: [1],
        summary: 'Assess first-break vs known psychiatric patient. Organic cause in 20%.',
    },
    {
        id: 'ap-age',
        type: 'question',
        module: 1,
        title: 'Age at Onset',
        body: '**Age strongly predicts etiology:**\n\n**Typical age of onset for PRIMARY psychotic disorders:**\n* Schizophrenia: 18-25 (men), 25-35 (women)\n* Bipolar with psychosis: 20-30\n* Brief psychotic disorder: 30-50\n\n**Late-onset psychosis (>45) without prior history:**\n* Medical/neurological cause in majority\n* Dementia, delirium, stroke\n* Parkinson\'s, Lewy body\n* Substance-induced\n* Brain tumor\n\n**Very young onset (<13):**\n* Consider organic causes, developmental disorders',
        options: [
            { label: 'Age <45', description: 'Typical age range - still needs organic workup', next: 'ap-workup' },
            { label: 'Age >=45', description: 'High likelihood organic cause - extensive workup', next: 'ap-late-onset', urgency: 'urgent' },
        ],
        citation: [2],
        summary: 'First psychosis age >=45 = organic cause likely. Full medical workup needed.',
    },
    {
        id: 'ap-agitated',
        type: 'info',
        module: 1,
        title: 'Safety First',
        body: '**Address agitation before diagnostic workup:**\n\n**-> [Acute Agitation Consult](#/tree/acute-agitation)**\n\n**Priorities:**\n1. Verbal de-escalation (BETA protocol)\n2. Chemical restraint if de-escalation fails\n3. Physical restraint only if immediately necessary\n\n**Once patient is calm and cooperative:**\nReturn to this consult for psychosis workup.\n\n**Consider during sedation:**\n* POC glucose (rule out hypoglycemia)\n* Vital signs (fever, tachycardia = organic)\n* Quick neuro check if possible',
        citation: [3],
        next: 'ap-start',
        summary: 'Agitated patient - use Acute Agitation consult first, then return for workup.',
    },
    {
        id: 'ap-known',
        type: 'info',
        module: 1,
        title: 'Known Psychiatric Patient',
        body: '**Exacerbation of known psychotic disorder:**\n\n**Still consider organic causes if:**\n* Presentation differs from baseline\n* Abnormal vital signs\n* New neurological symptoms\n* Medication changes or non-adherence\n* Recent substance use\n\n**Common triggers for exacerbation:**\n* Medication non-adherence (#1 cause)\n* Substance use\n* Psychosocial stressors\n* Sleep deprivation\n* Medication interactions\n\n**Minimum workup:**\n* Vital signs, POC glucose\n* Urine drug screen\n* Medication levels if applicable (lithium, valproate)',
        citation: [1],
        next: 'ap-treatment',
        summary: 'Known psychiatric patient - check for triggers, ensure minimum workup.',
    },
    // =====================================================================
    // MODULE 2: ORGANIC WORKUP
    // =====================================================================
    {
        id: 'ap-workup',
        type: 'info',
        module: 2,
        title: 'First-Break Psychosis Workup',
        body: '**20% of first-break psychosis has organic etiology:**\n\n**Standard workup:**\n* CBC, CMP, glucose\n* TSH (hyper/hypothyroid)\n* Urinalysis (UTI in elderly)\n* Urine drug screen\n* B12, folate\n* RPR/VDRL (syphilis)\n* HIV (if risk factors)\n* ECG (baseline before antipsychotics)\n\n**Consider if indicated:**\n* Ammonia (hepatic encephalopathy)\n* Blood alcohol level\n* Heavy metals (lead, mercury)\n* Ceruloplasmin (Wilson\'s disease if <40)\n* ANA, ESR (autoimmune)',
        citation: [4],
        next: 'ap-imaging',
        summary: 'First-break psychosis: CBC, CMP, TSH, B12, RPR, HIV, UDS, ECG.',
    },
    {
        id: 'ap-late-onset',
        type: 'info',
        module: 2,
        title: 'Late-Onset Psychosis Workup',
        body: '**Age >45 first psychosis = extensive workup:**\n\n**High-yield investigations:**\n* **CT head** (stroke, tumor, hemorrhage)\n* **MRI brain** (if CT unrevealing)\n* **LP** (if meningitis/encephalitis suspected)\n* **EEG** (seizures, encephalopathy)\n\n**Labs (in addition to standard):**\n* Ammonia\n* Cortisol (Cushing\'s, Addison\'s)\n* Parathyroid hormone\n* Anti-NMDA receptor antibodies\n* Paraneoplastic panel\n* HIV, RPR\n\n**Consider:**\n* Neurology consult\n* Formal cognitive testing',
        citation: [2, 5],
        next: 'ap-imaging',
        summary: 'Late-onset psychosis: CT/MRI, LP if indicated, EEG, extensive labs, neurology consult.',
    },
    {
        id: 'ap-imaging',
        type: 'question',
        module: 2,
        title: 'Neuroimaging',
        body: '**When to image:**\n\n**CT head indicated if:**\n* First episode psychosis (controversial but often done)\n* Age >45\n* Focal neurological deficits\n* Headache\n* Recent head trauma\n* Papilledema\n* Atypical presentation\n\n**MRI preferred if:**\n* Concern for encephalitis\n* Demyelinating disease\n* Small lesions missed on CT\n\n**Yield of routine imaging:**\n* Abnormalities in 5-15% of first-break psychosis\n* Clinically significant findings in 2-5%\n* Higher yield with focal neuro signs, late onset',
        options: [
            { label: 'Imaging Normal', description: 'No structural cause identified', next: 'ap-delirium' },
            { label: 'Abnormality Found', description: 'Structural lesion, stroke, or other finding', next: 'ap-organic-cause' },
            { label: 'Deferring Imaging', description: 'Clinical judgment: low suspicion', next: 'ap-delirium' },
        ],
        citation: [4, 5],
        summary: 'CT head for first-break psychosis if >45, focal deficits, or atypical features.',
    },
    {
        id: 'ap-organic-cause',
        type: 'info',
        module: 2,
        title: 'Organic Cause Identified',
        body: '**Treat the underlying cause:**\n\n**Common organic causes of psychosis:**\n\n| Cause | Treatment |\n|-------|----------|\n| Stroke | Neurology, supportive |\n| Tumor | Neurosurgery, oncology |\n| Encephalitis | Acyclovir, immunotherapy |\n| Metabolic | Correct derangement |\n| Thyroid | Levothyroxine/PTU |\n| Substance | Supportive, time |\n| Medication | Discontinue |\n\n**Antipsychotics for symptom control:**\n* Low-dose, short-acting preferred\n* Quetiapine often well-tolerated\n* Avoid in Parkinson\'s, Lewy body (except quetiapine/clozapine)\n\n**Disposition:** Based on underlying cause.',
        citation: [5],
        next: 'ap-disposition',
        summary: 'Organic psychosis identified - treat underlying cause, low-dose antipsychotic PRN.',
    },
    // =====================================================================
    // MODULE 3: DIFFERENTIATION
    // =====================================================================
    {
        id: 'ap-delirium',
        type: 'question',
        module: 3,
        title: 'Delirium vs Primary Psychosis',
        body: '**Critical distinction - treatment differs:**\n\n| Feature | Delirium | Primary Psychosis |\n|---------|----------|------------------|\n| **Onset** | Hours-days | Weeks-months |\n| **Course** | Fluctuating | Stable |\n| **Attention** | Impaired | Intact |\n| **Hallucinations** | Visual | Auditory |\n| **Orientation** | Disoriented | Oriented |\n| **Sleep-wake** | Disrupted | Variable |\n| **Vital signs** | Often abnormal | Usually normal |\n| **Medical cause** | Present | Absent |\n\n**If delirium suspected:**\n-> [Medical Clearance - Psych](#/tree/medical-clearance-psych)',
        options: [
            { label: 'Delirium Features Present', description: 'Fluctuating, inattentive, visual hallucinations', next: 'ap-delirium-yes', urgency: 'urgent' },
            { label: 'Primary Psychosis Likely', description: 'Stable, auditory hallucinations, intact attention', next: 'ap-nmda-screen' },
        ],
        citation: [1, 6],
        summary: 'Delirium: fluctuating, inattention, visual hallucinations. Psychosis: stable, auditory.',
    },
    {
        id: 'ap-delirium-yes',
        type: 'info',
        module: 3,
        title: 'Delirium Identified',
        body: '**Delirium is a medical emergency:**\n\n**-> [Medical Clearance - Psych](#/tree/medical-clearance-psych)**\n\n**This is NOT a psychiatric admission.**\n\n**Search for cause:**\n* Infection (UTI, pneumonia, meningitis)\n* Metabolic (glucose, sodium, calcium)\n* Drugs (anticholinergics, benzos, opioids, withdrawal)\n* Hypoxia, hypercapnia\n* Urinary retention, fecal impaction\n* Pain\n\n**Avoid:**\n* Antipsychotics as first-line (unless severe agitation)\n* Benzodiazepines (worsen delirium, except in withdrawal)\n* Physical restraints (increase mortality)',
        citation: [6],
        next: 'ap-disposition',
        summary: 'Delirium identified - NOT psych admission. Treat underlying cause.',
    },
    {
        id: 'ap-nmda-screen',
        type: 'question',
        module: 3,
        title: 'Anti-NMDA Receptor Encephalitis Screen',
        body: '**Don\'t miss this treatable cause:**\n\n**High-risk features:**\n* Young woman (80% of cases, but can occur in men/elderly)\n* Viral-like prodrome (fever, headache)\n* Psychiatric symptoms -> movement disorder progression\n* Seizures\n* Autonomic instability\n* Decreased consciousness\n\n**Classic progression:**\n1. Psychiatric symptoms (psychosis, anxiety)\n2. Movement disorders (orofacial dyskinesias, choreoathetosis)\n3. Seizures\n4. Autonomic instability\n5. Decreased consciousness\n\n**50% have ovarian teratoma** (screen with pelvic ultrasound/CT)',
        options: [
            { label: 'High Suspicion for Anti-NMDA', description: 'Features present - urgent workup', next: 'ap-nmda', urgency: 'critical' },
            { label: 'Low Suspicion', description: 'Typical psychiatric presentation', next: 'ap-treatment' },
        ],
        citation: [7],
        summary: 'Anti-NMDA encephalitis: young woman, prodrome, psychosis -> movement disorder -> seizures.',
    },
    {
        id: 'ap-nmda',
        type: 'info',
        module: 3,
        title: 'Anti-NMDA Receptor Encephalitis',
        body: '**Urgent workup and treatment:**\n\n**Diagnosis:**\n* **LP:** Lymphocytic pleocytosis, anti-NMDA receptor antibodies (CSF more sensitive than serum)\n* **MRI:** Often normal or nonspecific\n* **EEG:** Extreme delta brush pattern (specific but not sensitive)\n\n**Tumor screen:**\n* Pelvic ultrasound/CT (ovarian teratoma in 50%)\n* CT chest/abdomen (other teratomas)\n\n**Treatment:**\n* **First-line:** Steroids, IVIG, plasmapheresis\n* **Tumor removal if present** (improves outcomes)\n* **Second-line:** Rituximab, cyclophosphamide\n\n**Prognosis:** Good with early treatment. 75% substantial recovery.',
        citation: [7, 8],
        next: 'ap-disposition',
        summary: 'Anti-NMDA encephalitis: LP, tumor screen, steroids/IVIG/PLEX. 75% recover with treatment.',
    },
    // =====================================================================
    // MODULE 4: TREATMENT
    // =====================================================================
    {
        id: 'ap-treatment',
        type: 'question',
        module: 4,
        title: 'Antipsychotic Selection',
        body: '**First-episode psychosis - antipsychotic principles:**\n\n**General approach:**\n* Start low, go slow\n* Second-generation (atypical) preferred\n* Monotherapy\n* Allow 2-4 weeks for full effect\n\n**Consider patient factors:**\n* Metabolic risk (avoid olanzapine if diabetic/obese)\n* QTc prolongation risk (avoid ziprasidone, high-dose haloperidol)\n* EPS sensitivity (avoid high-potency FGAs)\n* Sedation needs (quetiapine, olanzapine more sedating)\n\n**Common first-line options:**\n* Risperidone 1-2 mg\n* Olanzapine 5-10 mg\n* Aripiprazole 5-10 mg\n* Quetiapine 50-100 mg',
        options: [
            { label: 'Low Metabolic Risk', description: 'Can use olanzapine', next: 'ap-antipsychotic' },
            { label: 'Metabolic Concerns', description: 'Avoid olanzapine, use aripiprazole/ziprasidone', next: 'ap-antipsychotic' },
            { label: 'QTc Prolonged', description: 'Avoid ziprasidone, use aripiprazole', next: 'ap-antipsychotic' },
            { label: 'Needs Sedation', description: 'Olanzapine or quetiapine preferred', next: 'ap-antipsychotic' },
        ],
        citation: [9],
        summary: 'First-episode psychosis: second-gen antipsychotic, start low, monotherapy.',
    },
    {
        id: 'ap-antipsychotic',
        type: 'info',
        module: 4,
        title: 'Antipsychotic Dosing',
        body: '**First-episode dosing (lower than chronic patients):**\n\n| Medication | Starting Dose | Target Range |\n|------------|--------------|---------------|\n| [Risperidone](#/drug/risperidone/psychosis) | 0.5-1 mg BID | 2-4 mg/day |\n| [Olanzapine](#/drug/olanzapine/psychosis) | 5 mg daily | 10-15 mg/day |\n| [Aripiprazole](#/drug/aripiprazole/psychosis) | 5-10 mg daily | 10-15 mg/day |\n| [Quetiapine](#/drug/quetiapine/psychosis) | 50 mg BID | 300-600 mg/day |\n| [Ziprasidone](#/drug/ziprasidone/psychosis) | 40 mg BID | 80-160 mg/day |\n\n**Baseline monitoring:**\n* Weight, BMI, waist circumference\n* Fasting glucose, lipid panel\n* ECG (QTc)\n* Prolactin if risperidone\n\n**PRN for acute agitation:**\n* Olanzapine 5-10 mg IM or\n* Haloperidol 5 mg + lorazepam 2 mg IM',
        citation: [9, 10],
        next: 'ap-disposition',
        summary: 'First-episode: start low (risperidone 1 mg, olanzapine 5 mg). Monitor metabolics.',
    },
    // =====================================================================
    // MODULE 5: DISPOSITION
    // =====================================================================
    {
        id: 'ap-disposition',
        type: 'result',
        module: 5,
        title: 'Psychosis Disposition',
        body: '**Disposition depends on etiology and safety:**\n\n**Psychiatric admission if:**\n* Danger to self or others\n* Unable to care for self\n* First-break psychosis (for stabilization, family education)\n* Needs medication titration\n* Involuntary hold criteria met\n\n**Medical admission if:**\n* Organic cause identified\n* Delirium\n* Anti-NMDA encephalitis or other autoimmune\n* Abnormal vital signs\n\n**Discharge (rare for first-break):**\n* Mild symptoms, good insight\n* Strong support system\n* Outpatient follow-up arranged within 7 days\n* No safety concerns\n\n**Follow-up:** First-episode psychosis clinic, early intervention program if available.',
        recommendation: 'Admit most first-break psychosis. Psychiatric if primary, medical if organic cause. Early intervention improves outcomes.',
        confidence: 'recommended',
        summary: 'Admit most first-break psychosis. Psychiatric vs medical based on etiology.',
    },
];
export const ACUTE_PSYCHOSIS_MODULE_LABELS = [
    'Assessment',
    'Organic Workup',
    'Differentiation',
    'Treatment',
    'Disposition',
];
export const ACUTE_PSYCHOSIS_CITATIONS = [
    { num: 1, text: 'AAEP Task Force on Medical Clearance of Adult Psychiatric Patients. Western Journal of Emergency Medicine 2017;18:640-6.' },
    { num: 2, text: 'Howard R, et al. Late-onset schizophrenia and very-late-onset schizophrenia-like psychosis: an international consensus. Am J Psychiatry 2000;157:172-8.' },
    { num: 3, text: 'ACEP Clinical Policy: Severe Agitation in ED Patients. Annals of Emergency Medicine 2024.' },
    { num: 4, text: 'Freudenreich O, et al. The evaluation of patients with first-episode psychosis. Psychiatric Clin North Am 2012;35:715-29.' },
    { num: 5, text: 'Keshavan MS, et al. Second-generation antipsychotic drugs in first-episode psychosis: a review. CNS Drugs 2003;17:1033-45.' },
    { num: 6, text: 'Inouye SK, et al. Delirium in elderly people. Lancet 2014;383:911-22.' },
    { num: 7, text: 'Dalmau J, et al. Anti-NMDA-receptor encephalitis: case series and analysis of effects of antibodies. Lancet Neurol 2008;7:1091-8.' },
    { num: 8, text: 'Titulaer MJ, et al. Treatment and prognostic factors for long-term outcome in patients with anti-NMDA receptor encephalitis. Lancet Neurol 2013;12:157-65.' },
    { num: 9, text: 'APA Practice Guideline for Treatment of Patients With Schizophrenia, 3rd ed. 2021.' },
    { num: 10, text: 'Robinson DG, et al. Prescription practices in the treatment of first-episode schizophrenia spectrum disorders. Am J Psychiatry 2015;172:237-48.' },
];
export const ACUTE_PSYCHOSIS_NODE_COUNT = ACUTE_PSYCHOSIS_NODES.length;
