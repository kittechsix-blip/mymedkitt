// MedKitt - Catatonia Consult
// Bush-Francis Catatonia Rating Scale, lorazepam challenge, ECT referral
// ~16 nodes
export const CATATONIA_CRITICAL_ACTIONS = [
    { text: 'Lorazepam challenge: 2 mg IV - response within 10 min confirms diagnosis', nodeId: 'cat-challenge' },
    { text: 'AVOID antipsychotics initially - risk of malignant catatonia/NMS', nodeId: 'cat-avoid-ap' },
    { text: 'Check for underlying cause: medical, psychiatric, or drug-induced', nodeId: 'cat-etiology' },
    { text: 'ECT is highly effective if benzodiazepines fail', nodeId: 'cat-ect' },
];
export const CATATONIA_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION & SCREENING
    // =====================================================================
    {
        id: 'cat-start',
        type: 'question',
        module: 1,
        title: 'Catatonia Suspected',
        body: '**Is catatonia present?**\n\nScreen with Bush-Francis Catatonia Rating Scale (BFCRS):\n\n| Sign | Present? |\n|------|----------|\n| Immobility / stupor | [ ] |\n| Mutism | [ ] |\n| Staring / fixed gaze | [ ] |\n| Posturing | [ ] |\n| Negativism | [ ] |\n| Waxy flexibility | [ ] |\n| Echolalia / echopraxia | [ ] |\n| Stereotypy | [ ] |\n| Mannerisms | [ ] |\n| Verbigeration | [ ] |\n| Rigidity | [ ] |\n| Withdrawal | [ ] |\n\n**>=2 signs present = catatonia likely**',
        options: [
            { label: '>=2 Signs Present', description: 'Catatonia likely - proceed to lorazepam challenge', next: 'cat-challenge' },
            { label: '0-1 Signs', description: 'Catatonia unlikely - consider other diagnoses', next: 'cat-unlikely' },
            { label: 'Patient Agitated/Excited', description: 'Excited catatonia variant', next: 'cat-excited', urgency: 'urgent' },
        ],
        citation: [1],
        summary: 'Screen for catatonia using Bush-Francis Rating Scale. >=2 signs = likely catatonia.',
    },
    {
        id: 'cat-unlikely',
        type: 'info',
        module: 1,
        title: 'Catatonia Unlikely',
        body: '**Consider alternative diagnoses:**\n\n* **Severe depression** - may mimic psychomotor retardation\n* **Parkinson\'s disease** - rigidity, bradykinesia\n* **Locked-in syndrome** - intact consciousness, vertical eye movements preserved\n* **Akinetic mutism** - frontal lobe lesions\n* **Conversion disorder** - inconsistent findings\n* **Malingering** - secondary gain\n\n**If clinical suspicion remains high despite low BFCRS:**\nProceed with lorazepam challenge - it\'s both diagnostic and therapeutic.',
        citation: [1],
        next: 'cat-start',
        summary: 'Low BFCRS - consider depression, Parkinson\'s, locked-in syndrome, conversion.',
    },
    {
        id: 'cat-excited',
        type: 'info',
        module: 1,
        title: 'Excited Catatonia',
        body: '**Excited catatonia is a medical emergency!**\n\n**Features:**\n* Extreme motor agitation\n* Stereotyped, purposeless movements\n* Autonomic instability\n* Risk of exhaustion, hyperthermia, death\n\n**Immediate management:**\n* **Lorazepam 2 mg IV** - can repeat q5-10 min up to 8 mg\n* Supportive care: IV fluids, cooling if hyperthermic\n* Monitor vitals continuously\n* Consider ICU admission\n\n[!] **Do NOT give antipsychotics** - high risk of NMS',
        citation: [2],
        next: 'cat-challenge',
        summary: 'Excited catatonia - medical emergency. High-dose lorazepam, avoid antipsychotics.',
    },
    // =====================================================================
    // MODULE 2: LORAZEPAM CHALLENGE
    // =====================================================================
    {
        id: 'cat-challenge',
        type: 'question',
        module: 2,
        title: 'Lorazepam Challenge',
        body: '**Diagnostic & therapeutic test:**\n\n**[Lorazepam](#/drug/lorazepam/catatonia-challenge) 2 mg IV push**\n\nObserve for 10-15 minutes.\n\n**Positive response (confirms catatonia):**\n* Increased speech\n* Decreased rigidity\n* Improved eye contact\n* Spontaneous movement\n* More interactive\n\n**Any improvement within 10 minutes is significant.**\n\n*No IV access? Lorazepam 2 mg IM or sublingual acceptable.*',
        options: [
            { label: 'Positive Response', description: 'Improvement within 10 min - catatonia confirmed', next: 'cat-positive' },
            { label: 'No Response', description: 'No change after 10-15 min', next: 'cat-no-response' },
            { label: 'Partial Response', description: 'Some improvement but incomplete', next: 'cat-partial' },
        ],
        citation: [3],
        summary: 'Lorazepam 2 mg IV challenge - response within 10 min confirms catatonia.',
    },
    {
        id: 'cat-positive',
        type: 'info',
        module: 2,
        title: 'Positive Lorazepam Response',
        body: '**Catatonia confirmed - continue benzodiazepines:**\n\n**Maintenance regimen:**\n* **Lorazepam 2 mg IV/PO q4-6h** scheduled\n* Titrate to effect (some patients need 10-20+ mg/day)\n* Monitor for over-sedation, respiratory depression\n\n**Duration:**\n* Continue until underlying cause treated\n* Taper slowly over days-weeks once stable\n* Rapid taper -> relapse risk\n\n**Next step:** Investigate underlying etiology',
        citation: [3, 4],
        next: 'cat-etiology',
        summary: 'Catatonia confirmed. Lorazepam 2 mg q4-6h maintenance. Investigate etiology.',
    },
    {
        id: 'cat-no-response',
        type: 'info',
        module: 2,
        title: 'No Lorazepam Response',
        body: '**Options after failed lorazepam challenge:**\n\n**1. Repeat with higher dose:**\n* Lorazepam 4 mg IV - some patients need more\n* If still no response after cumulative 6-8 mg -> ECT\n\n**2. Consider alternative diagnosis:**\n* Locked-in syndrome\n* Akinetic mutism\n* Severe Parkinson\'s\n* Malignant catatonia (may need more aggressive treatment)\n\n**3. Proceed to ECT:**\n* ECT is first-line for benzo-resistant catatonia\n* Response rate >80% even in refractory cases\n* Urgent psychiatry consult for ECT evaluation',
        citation: [4, 5],
        next: 'cat-ect',
        summary: 'No lorazepam response - try higher dose or proceed to ECT.',
    },
    {
        id: 'cat-partial',
        type: 'info',
        module: 2,
        title: 'Partial Lorazepam Response',
        body: '**Partial response - optimize benzodiazepines:**\n\n**Strategies:**\n* **Increase dose:** Lorazepam 2-4 mg IV q2h until response or sedation\n* **Total daily doses of 20-30 mg may be needed**\n* Add scheduled dosing: 2-4 mg q4-6h around the clock\n\n**If plateau without full response after 48-72h:**\n* ECT referral\n* Consider adjunctive memantine or amantadine\n\n**Monitor for:**\n* Respiratory depression\n* Aspiration risk (NPO if swallowing impaired)\n* DVT (immobility)',
        citation: [3, 4],
        next: 'cat-etiology',
        summary: 'Partial response - increase lorazepam dose, consider ECT if plateau.',
    },
    // =====================================================================
    // MODULE 3: ETIOLOGY
    // =====================================================================
    {
        id: 'cat-etiology',
        type: 'question',
        module: 3,
        title: 'Investigate Underlying Cause',
        body: '**Catatonia has many etiologies - identify & treat:**\n\n**Medical causes:**\n* Encephalitis (anti-NMDA, viral)\n* Metabolic (hyponatremia, hepatic encephalopathy)\n* Autoimmune (lupus cerebritis)\n* Endocrine (thyroid, Addison\'s)\n* Drugs (withdrawal, intoxication)\n\n**Psychiatric causes:**\n* Mood disorders (depression, mania)\n* Schizophrenia\n* Brief psychotic disorder\n\n**Workup:**\n* CBC, CMP, TSH, UA\n* Urine drug screen\n* LP if encephalitis suspected\n* MRI brain\n* EEG\n* Anti-NMDA receptor antibodies',
        options: [
            { label: 'Medical Cause Identified', description: 'Treat underlying condition', next: 'cat-medical' },
            { label: 'Psychiatric Cause Likely', description: 'No organic cause found', next: 'cat-psychiatric' },
            { label: 'Drug-Induced', description: 'Medication or substance-related', next: 'cat-drug' },
        ],
        citation: [6],
        summary: 'Investigate catatonia etiology: medical, psychiatric, or drug-induced.',
    },
    {
        id: 'cat-medical',
        type: 'info',
        module: 3,
        title: 'Medical Cause',
        body: '**Treat the underlying medical condition:**\n\n**Anti-NMDA receptor encephalitis:**\n* Urgent neurology consult\n* First-line: steroids, IVIG, plasmapheresis\n* Tumor screen (ovarian teratoma)\n\n**Metabolic:**\n* Correct electrolytes, glucose\n* Hepatic encephalopathy: lactulose, rifaximin\n\n**Infectious:**\n* Viral encephalitis: acyclovir\n* Bacterial: appropriate antibiotics\n\n**Continue benzodiazepines** while treating underlying cause.\n\n[!] **Catatonia may persist even after treating the medical cause** - maintain lorazepam until symptoms fully resolve.',
        citation: [6, 7],
        next: 'cat-disposition',
        summary: 'Medical catatonia - treat underlying cause while continuing lorazepam.',
    },
    {
        id: 'cat-psychiatric',
        type: 'info',
        module: 3,
        title: 'Psychiatric Catatonia',
        body: '**Primary psychiatric catatonia:**\n\n**Most common associations:**\n* Major depressive disorder (most common)\n* Bipolar disorder (manic or depressed phase)\n* Schizophrenia (less common than historically thought)\n\n**Management:**\n* Continue lorazepam\n* Treat underlying mood disorder once catatonia resolves\n* **AVOID antipsychotics initially** - see next\n\n**When can antipsychotics be used?**\n* Only AFTER catatonia fully resolved (>48h symptom-free)\n* Start low, go slow\n* Monitor closely for recurrence',
        citation: [4],
        next: 'cat-avoid-ap',
        summary: 'Psychiatric catatonia - continue lorazepam, treat mood disorder once resolved.',
    },
    {
        id: 'cat-drug',
        type: 'info',
        module: 3,
        title: 'Drug-Induced Catatonia',
        body: '**Common culprits:**\n\n**Medications:**\n* Antipsychotic withdrawal (especially clozapine)\n* Benzodiazepine withdrawal\n* Corticosteroids\n* Immunosuppressants (tacrolimus, cyclosporine)\n\n**Substances:**\n* PCP/ketamine\n* Synthetic cannabinoids\n* Stimulant withdrawal\n\n**Management:**\n* Discontinue or reinstate offending agent as appropriate\n* Continue lorazepam\n* Supportive care\n\n**Clozapine withdrawal catatonia:**\nRestart clozapine at low dose with close monitoring.',
        citation: [8],
        next: 'cat-disposition',
        summary: 'Drug-induced catatonia - identify and address offending agent.',
    },
    // =====================================================================
    // MODULE 4: TREATMENT CONSIDERATIONS
    // =====================================================================
    {
        id: 'cat-avoid-ap',
        type: 'info',
        module: 4,
        title: 'Avoid Antipsychotics',
        body: '**[!] CRITICAL: Avoid antipsychotics in active catatonia**\n\n**Risks:**\n* Can worsen catatonia\n* Can precipitate **malignant catatonia**\n* Can trigger **NMS** (which shares features with catatonia)\n\n**If patient on antipsychotic when catatonia developed:**\n* Stop the antipsychotic\n* If clozapine - carefully weigh risks of stopping vs continuing\n* [NMS Consult](#/tree/nms) if fever + rigidity + autonomic instability\n\n**When is it safe to restart antipsychotics?**\n* After catatonia fully resolved >=48-72h\n* After successful ECT course (if used)\n* Low dose, slow titration\n* Avoid high-potency D2 blockers (haloperidol)',
        citation: [4, 9],
        next: 'cat-ect',
        summary: 'AVOID antipsychotics in active catatonia - risk of NMS/malignant catatonia.',
    },
    {
        id: 'cat-ect',
        type: 'info',
        module: 4,
        title: 'ECT for Catatonia',
        body: '**ECT is highly effective for catatonia:**\n\n**Indications:**\n* Lorazepam-resistant catatonia\n* Malignant catatonia (fever, autonomic instability)\n* Life-threatening complications (dehydration, DVT, PE)\n* Excited catatonia not responding to benzos\n\n**Efficacy:**\n* Response rate >80-90%\n* Often see improvement after 1-3 sessions\n* Bilateral placement typically used\n\n**Course:**\n* Usually 6-12 sessions\n* 3x/week initially\n* Maintenance ECT may be needed\n\n**Urgent psychiatry consult** for ECT evaluation.',
        citation: [5],
        next: 'cat-disposition',
        summary: 'ECT highly effective for benzo-resistant catatonia. Response >80%.',
    },
    // =====================================================================
    // MODULE 5: DISPOSITION
    // =====================================================================
    {
        id: 'cat-disposition',
        type: 'result',
        module: 5,
        title: 'Catatonia Disposition',
        body: '**Admission required for:**\n* All catatonia patients (cannot safely discharge)\n* Benzodiazepine titration and monitoring\n* Etiology workup\n* Nutrition/hydration support\n* DVT prophylaxis\n\n**ICU admission if:**\n* Malignant catatonia (fever >38 degC, autonomic instability)\n* Excited catatonia with exhaustion\n* Respiratory compromise\n* Severe dehydration/rhabdomyolysis\n\n**Psychiatry admission if:**\n* Stable on lorazepam\n* No medical complications\n* Awaiting ECT\n\n**Key orders:**\n* Lorazepam scheduled\n* DVT prophylaxis\n* NPO or supervised feeding if swallowing impaired\n* PT/OT consult\n* Foley if unable to void',
        recommendation: 'Admit all catatonia patients. ICU if malignant features. Continue scheduled lorazepam, DVT prophylaxis, consider ECT if benzo-resistant.',
        confidence: 'recommended',
        summary: 'Admit for lorazepam titration, etiology workup. ICU if malignant/excited.',
    },
];
export const CATATONIA_MODULE_LABELS = [
    'Recognition',
    'Lorazepam Challenge',
    'Etiology',
    'Treatment',
    'Disposition',
];
export const CATATONIA_CITATIONS = [
    { num: 1, text: 'Bush G, et al. Catatonia I: Rating scale and standardized examination. Acta Psychiatr Scand 1996;93:129-36.' },
    { num: 2, text: 'Fink M, Taylor MA. Catatonia: A Clinician\'s Guide to Diagnosis and Treatment. Cambridge University Press, 2003.' },
    { num: 3, text: 'Rosebush PI, Mazurek MF. Catatonia and its treatment. Schizophr Bull 2010;36:239-42.' },
    { num: 4, text: 'Sienaert P, et al. A Clinical Review of the Treatment of Catatonia. Front Psychiatry 2014;5:181.' },
    { num: 5, text: 'Luchini F, et al. Electroconvulsive therapy in catatonic patients: efficacy and predictors of response. World J Psychiatry 2015;5:182-92.' },
    { num: 6, text: 'Rogers JP, et al. Catatonia: demographic, clinical and laboratory associations. Psychol Med 2023;53:2492-2502.' },
    { num: 7, text: 'Dalmau J, et al. Anti-NMDA-receptor encephalitis: case series and analysis. Lancet Neurol 2008;7:1091-8.' },
    { num: 8, text: 'Bilbily J, et al. Clozapine-withdrawal catatonia: a systematic review. J Clin Psychiatry 2017;78:e1393-e1395.' },
    { num: 9, text: 'Berman BD. Neuroleptic malignant syndrome: a review for neurohospitalists. Neurohospitalist 2011;1:41-7.' },
];
export const CATATONIA_NODE_COUNT = CATATONIA_NODES.length;
