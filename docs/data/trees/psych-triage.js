// MedKitt — Psych Triage (Gateway Consult)
// Symptom-based entry point for psychiatric emergencies
// Routes to: Agitation, Suicidal Patient, Psych Medical Stability, Psychosis, Withdrawal
// ~12 nodes
export const PSYCH_TRIAGE_CRITICAL_ACTIONS = [
    { text: 'Safety first — secure environment before assessment', nodeId: 'pst-start' },
    { text: 'Rule out organic causes in ALL psychiatric presentations', nodeId: 'pst-altered' },
    { text: 'Agitated patient — verbal de-escalation before chemical restraint', nodeId: 'pst-agitated' },
    { text: 'Suicidal patient — 1:1 observation, remove ligatures/sharps', nodeId: 'pst-suicidal' },
    { text: 'Withdrawal symptoms — early benzodiazepines prevent seizures/DTs', nodeId: 'pst-withdrawal' },
];
export const PSYCH_TRIAGE_NODES = [
    // =====================================================================
    // MODULE 1: ENTRY & TRIAGE
    // =====================================================================
    {
        id: 'pst-start',
        type: 'question',
        module: 1,
        title: 'Psych Triage',
        body: '**What is the PRIMARY presenting concern?**\n\nSelect the most urgent/dominant feature. Many psychiatric presentations overlap — this routes to the most appropriate starting point.',
        options: [
            { label: 'Agitation / Aggression', description: 'Combative, threatening, pacing, unable to cooperate', next: 'pst-agitated', urgency: 'critical' },
            { label: 'Suicidal Ideation / Attempt', description: 'Expressed SI, self-harm, or post-attempt', next: 'pst-suicidal', urgency: 'critical' },
            { label: 'Altered Mental Status', description: 'Confused, disoriented, fluctuating consciousness', next: 'pst-altered', urgency: 'urgent' },
            { label: 'Bizarre Behavior / Psychosis', description: 'Hallucinations, delusions, disorganized thinking', next: 'pst-psychotic' },
            { label: 'Anxiety / Panic', description: 'Acute anxiety, panic attack, hyperventilation', next: 'pst-anxiety' },
            { label: 'Withdrawal Symptoms', description: 'Tremor, diaphoresis, tachycardia, h/o alcohol/benzo/opioid use', next: 'pst-withdrawal', urgency: 'urgent' },
            { label: 'Unresponsive / Mute / Rigid', description: 'Catatonic features, not speaking, waxy flexibility', next: 'pst-catatonia', urgency: 'urgent' },
            { label: 'Medication Reaction', description: 'Suspected NMS, serotonin syndrome, dystonia', next: 'pst-med-reaction', urgency: 'critical' },
            { label: 'Not Eating / Purging', description: 'Eating disorder presentation, weight loss, electrolyte concerns', next: 'pst-eating' },
        ],
        citation: [1],
        summary: 'Route to appropriate psychiatric pathway based on primary presenting concern.',
    },
    // =====================================================================
    // MODULE 2: ROUTING NODES
    // =====================================================================
    {
        id: 'pst-agitated',
        type: 'info',
        module: 2,
        title: 'Agitation Pathway',
        body: '**→ [Acute Agitation Consult](#/tree/acute-agitation)**\n\n**Immediate priorities:**\n• Verbal de-escalation (BETA protocol)\n• Chemical restraint if de-escalation fails\n• Rule out organic causes (hypoglycemia, hypoxia, intoxication)\n\n**Key decision:** Is this delirium/medical OR primary psychiatric?',
        citation: [2],
        next: 'pst-end',
        summary: 'Agitated patient — route to Acute Agitation consult for BETA protocol and chemical restraint.',
    },
    {
        id: 'pst-suicidal',
        type: 'info',
        module: 2,
        title: 'Suicidal Patient Pathway',
        body: '**→ [Suicidal Patient Consult](#/tree/suicidal-patient)**\n\n**Immediate priorities:**\n• 1:1 constant visual observation\n• Remove ligatures, sharps, medications from room\n• Environmental safety checklist\n• ASQ or C-SSRS screening\n\n**Key decision:** Risk stratification → disposition (discharge vs voluntary vs involuntary)',
        citation: [3],
        next: 'pst-end',
        summary: 'Suicidal patient — route to Suicidal Patient consult for C-SSRS and risk stratification.',
    },
    {
        id: 'pst-altered',
        type: 'info',
        module: 2,
        title: 'Altered Mental Status Pathway',
        body: '**→ [Psych Medical Stability](#/tree/medical-clearance-psych)**\n\n**Critical question:** Is this DELIRIUM or PRIMARY PSYCHOSIS?\n\n**Delirium red flags:**\n• Acute onset (hours-days)\n• Fluctuating course\n• Inattention (cannot focus on interview)\n• Visual hallucinations\n• Abnormal vital signs\n• Age >45 with first psychiatric symptoms\n\nUse history, vitals, exam, mentation, and red flags to decide the medical workup intensity.',
        citation: [4],
        next: 'pst-end',
        summary: 'Altered mental status — route to Psych Medical Stability for organic workup.',
    },
    {
        id: 'pst-psychotic',
        type: 'info',
        module: 2,
        title: 'Psychosis Pathway',
        body: '**Start with:** [Psych Medical Stability](#/tree/medical-clearance-psych)\n\n**Then continue:** [Acute Psychosis / First Break](#/tree/acute-psychosis)\n\n**Rule out organic causes FIRST when red flags are present:**\n• Anti-NMDA receptor encephalitis\n• Stimulant intoxication\n• Medication toxicity\n• Encephalitis/meningitis\n• Metabolic derangement\n\n**New-onset psychosis in patient >45:** Medical cause until proven otherwise.\n\n**If agitated:** [Acute Agitation](#/tree/acute-agitation) for chemical restraint options.',
        citation: [4, 5],
        next: 'pst-end',
        summary: 'Psychosis — start with medical stability assessment, then use Acute Psychosis / First Break for workup and disposition.',
    },
    {
        id: 'pst-anxiety',
        type: 'info',
        module: 2,
        title: 'Anxiety / Panic Pathway',
        body: '**Panic attack vs medical emergency:**\n\nBefore diagnosing panic, rule out:\n• Pulmonary embolism (consider PERC, Wells)\n• Acute coronary syndrome (especially if risk factors)\n• Arrhythmia (check ECG)\n• Hyperthyroidism\n• Pheochromocytoma\n• Stimulant intoxication\n\n**If true panic attack:**\n• Reassurance, calm environment\n• Breathing exercises\n• Benzodiazepine if severe (lorazepam 0.5-1 mg PO/SL)\n• Outpatient psychiatry/therapy referral',
        citation: [1],
        next: 'pst-end',
        summary: 'Anxiety/panic — rule out PE, ACS, arrhythmia before diagnosing panic disorder.',
    },
    {
        id: 'pst-withdrawal',
        type: 'info',
        module: 2,
        title: 'Withdrawal Pathway',
        body: '**→ [Alcohol Withdrawal Consult](#/tree/alcohol-withdrawal)**\n\n**Early treatment prevents:**\n• Withdrawal seizures (peak 12-48h)\n• Delirium tremens (peak 48-96h, mortality 5-15%)\n\n**Which substance?**\n• **Alcohol/Benzos:** CIWA-Ar, benzodiazepines, phenobarbital\n• **Opioids:** COWS score, buprenorphine initiation, clonidine\n• **Stimulants:** Supportive care, benzos for agitation\n\n**High-risk features:** Prior seizures/DTs, PAWSS ≥4, prolonged heavy use',
        citation: [6],
        next: 'pst-end',
        summary: 'Withdrawal — route to Alcohol Withdrawal consult for CIWA-Ar and benzo protocols.',
    },
    {
        id: 'pst-catatonia',
        type: 'info',
        module: 2,
        title: 'Catatonia Pathway',
        body: '**→ [Catatonia Consult](#/tree/catatonia)**\n\n**Recognize catatonia early — it is treatable.**\n\n**Bush-Francis catatonia signs:**\n• Immobility / stupor\n• Mutism\n• Staring / fixed gaze\n• Posturing / waxy flexibility\n• Negativism (resistance to movement)\n\n**Treatment:**\n• **Lorazepam challenge:** 2 mg IV — improvement within 10-15 min strongly supports diagnosis\n• If response: Continue lorazepam 2 mg q4-6h\n• If no response: Consider ECT\n\n⚠️ **AVOID antipsychotics initially** — can trigger malignant catatonia or NMS',
        citation: [7],
        next: 'pst-end',
        summary: 'Catatonia — lorazepam challenge 2 mg IV. Avoid antipsychotics initially.',
    },
    {
        id: 'pst-med-reaction',
        type: 'info',
        module: 2,
        title: 'Medication Reaction Pathway',
        body: '**Differentiate these emergencies:**\n\n| Feature | NMS | Serotonin Syndrome | Dystonia |\n|---------|-----|-------------------|----------|\n| **Onset** | Days | Hours | Minutes-hours |\n| **Rigidity** | Lead-pipe | Hyperreflexia, clonus | Focal (torticollis, oculogyric) |\n| **Temp** | >40°C | Variable | Normal |\n| **Mental status** | Altered | Agitated | Clear |\n| **Pupils** | Normal | Dilated | Normal |\n| **Cause** | Antipsychotics | SSRIs, MAOIs | Antipsychotics, antiemetics |\n\n**Treatments:**\n• **NMS:** Stop offending agent, dantrolene, bromocriptine, cooling\n• **Serotonin syndrome:** Stop offending agent, cyproheptadine, benzos\n• **Dystonia:** [Diphenhydramine](#/drug/diphenhydramine/dystonia) 50 mg IV/IM or benztropine 2 mg',
        citation: [8, 9],
        next: 'pst-end',
        summary: 'Med reaction — differentiate NMS vs serotonin syndrome vs dystonia. Treatment differs.',
    },
    {
        id: 'pst-eating',
        type: 'info',
        module: 2,
        title: 'Eating Disorder Pathway',
        body: '**Eating disorder emergency — focus on medical stability:**\n\n**Check immediately:**\n• Electrolytes: K+, PO4, Mg2+ (refeeding risk)\n• ECG: QTc prolongation, bradycardia\n• Glucose\n• Vitals: Bradycardia, orthostatic hypotension\n\n**MARSIPAN criteria for admission:**\n• BMI <13 or rapid weight loss >1 kg/week\n• K+ <3.0 or PO4 <0.5\n• HR <40 or BP <90 systolic\n• QTc >450 ms\n• Syncope\n• Hypoglycemia\n\n**Refeeding syndrome risk:** Start feeding slowly, monitor PO4/K+/Mg2+ daily × 3 days',
        citation: [10],
        next: 'pst-end',
        summary: 'Eating disorder — check electrolytes, ECG, vitals. Refeeding syndrome risk.',
    },
    {
        id: 'pst-end',
        type: 'result',
        module: 2,
        title: 'Routed to Consult',
        body: 'Continue with the linked specialty consult for detailed management.\n\n**Return to Psych Triage** if the clinical picture changes or a different pathway is needed.',
        recommendation: 'Follow the linked consult pathway for detailed management.',
        confidence: 'recommended',
        summary: 'Continue with specialty consult for detailed management.',
    },
];
export const PSYCH_TRIAGE_MODULE_LABELS = [
    'Entry',
    'Routing',
];
export const PSYCH_TRIAGE_CITATIONS = [
    { num: 1, text: 'ACEP Clinical Policy: Adult Psychiatric Emergencies. Annals of Emergency Medicine 2021.' },
    { num: 2, text: 'ACEP Clinical Policy: Severe Agitation in ED Patients. Annals of Emergency Medicine 2024.' },
    { num: 3, text: 'Joint Commission National Patient Safety Goal NPSG 15.01.01: Suicide Prevention. 2024.' },
    { num: 4, text: 'AAEP Task Force on Medical Clearance of Adult Psychiatric Patients. Western Journal of Emergency Medicine 2017.' },
    { num: 5, text: 'Dalmau J, et al. Anti-NMDA-receptor encephalitis: case series and analysis of the effects of antibodies. Lancet Neurol 2008;7:1091-8.' },
    { num: 6, text: 'ASAM Clinical Practice Guideline on Alcohol Withdrawal Management. 2020.' },
    { num: 7, text: 'Sienaert P, et al. A Clinical Review of the Treatment of Catatonia. Front Psychiatry 2014;5:181.' },
    { num: 8, text: 'Berman BD. Neuroleptic malignant syndrome: a review for neurohospitalists. Neurohospitalist 2011;1:41-7.' },
    { num: 9, text: 'Boyer EW, Shannon M. The serotonin syndrome. N Engl J Med 2005;352:1112-20.' },
    { num: 10, text: 'MARSIPAN: Management of Really Sick Patients with Anorexia Nervosa. Royal College of Psychiatrists 2014.' },
];
export const PSYCH_TRIAGE_NODE_COUNT = PSYCH_TRIAGE_NODES.length;
