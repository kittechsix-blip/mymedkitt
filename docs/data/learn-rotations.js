// myMedKitt — MedKitt Learn rotation + student card data
// Phase 1 pilot: Psychiatry only. Hand-curated 7-field cards that wrap
// existing consult trees with MS3/MS4-facing context and prep.
// ===================================================================
// Psychiatry — 10 hand-curated student cards
// ===================================================================
const PSYCH_CARDS = [
    // ---- Section 1: I'm Seeing A Psych Patient ----
    {
        id: 'psych-capacity',
        rotationId: 'psychiatry',
        sectionId: 'seeing',
        title: 'Capacity vs Competence',
        trigger: 'Patient is refusing treatment, leaving AMA, or consenting to a high-risk procedure and someone says "do they have capacity?"',
        askThree: [
            'Can you tell me, in your own words, what is wrong with you?',
            'Why do you think we are recommending this treatment, and what could happen if you do not get it?',
            'Walk me through how you are deciding — what matters to you about this choice?',
        ],
        oneBreathReframe: 'A decision-specific clinical assessment of whether this patient, right now, can understand, appreciate, reason about, and communicate a choice — not a global "competence" judgment.',
        sayOnRounds: 'I assessed capacity for [specific decision] using Appelbaum\'s four abilities. The patient demonstrated **understanding** of [X] and **communication** of a clear choice, but **appreciation** was impaired because [Y]. I recommend [next step: surrogate / ethics / re-assess later].',
        doNotMiss: [
            'Capacity is decision-specific — a patient can have capacity to refuse a flu shot but not to refuse intubation.',
            'Capacity is clinical (any physician can assess); competence is legal (court-determined).',
            'Intoxication, delirium, or active psychosis usually impair capacity — reassess when cleared.',
            'A patient who repeats facts back accurately but denies they apply to them lacks **appreciation**, not understanding.',
        ],
        pimpPrep: [
            { question: 'Name Appelbaum\'s four abilities for capacity.', answer: 'Communicate a choice, Understand information, Appreciate the situation, Reason about options.', tag: 'criteria' },
            { question: 'Patient with schizophrenia refuses chemotherapy. Does she lack capacity?', answer: 'Not automatically — diagnosis ≠ incapacity. Assess the four abilities for THIS decision.', tag: 'pearl' },
            { question: 'Who decides if a patient lacks capacity in an emergency?', answer: 'The treating physician — implied consent applies and treatment proceeds.', tag: 'next-step' },
        ],
        shelfHighYield: [
            'Capacity = clinical, situation-specific. Competence = legal, global.',
            'Appelbaum 4: Communicate · Understand · Appreciate · Reason.',
            'Higher stakes → higher threshold for capacity (sliding scale).',
            'Document the four abilities, the specific decision, and your reasoning — not just "has/lacks capacity."',
        ],
        linkedTreeId: 'capacity-assessment',
    },
    {
        id: 'psych-delirium-vs-psychosis',
        rotationId: 'psychiatry',
        sectionId: 'seeing',
        title: 'Delirium vs Psychosis (the >45 rule)',
        trigger: 'New altered mental status, hallucinations, or "this patient is acting strange" — especially in a patient over 45 or with a medical illness.',
        askThree: [
            'When did this start, and does it come and go through the day?',
            'Any fever, recent infection, new medication, or substance use?',
            'Has the patient ever had psychiatric symptoms before this episode?',
        ],
        oneBreathReframe: 'Acute, fluctuating disturbance of attention and cognition is delirium until proven otherwise — primary psychosis is a diagnosis of exclusion in anyone over 45 or with new-onset symptoms.',
        sayOnRounds: '[Age]-y/o with [PMH] presenting with **acute, fluctuating** [confusion / agitation / hallucinations]. CAM positive — concerning for delirium from [suspected cause]. Workup includes [glucose, infection screen, med review, imaging if focal]. Plan: treat underlying cause, non-pharm first, low-dose haloperidol PRN.',
        doNotMiss: [
            '**>45 with new psychotic symptoms = medical workup mandatory** (70% have an organic cause).',
            'Hypoactive delirium (quiet, withdrawn) is missed more often than hyperactive — same workup applies.',
            'Visual hallucinations + fluctuation + inattention = delirium, not schizophrenia.',
            'Avoid benzos in delirium (worsens it) — except alcohol/benzo withdrawal.',
            'Anti-NMDA receptor encephalitis: young woman + viral prodrome + psychosis → movement disorder → seizures.',
        ],
        pimpPrep: [
            { question: 'What is the CAM, and what does a positive screen require?', answer: 'Confusion Assessment Method: (1) acute onset + fluctuation AND (2) inattention, PLUS either (3) altered LOC OR (4) disorganized thinking.', tag: 'criteria' },
            { question: 'Why avoid benzos in routine delirium?', answer: 'They worsen confusion and disinhibit. Exception: alcohol or benzodiazepine withdrawal.', tag: 'mechanism' },
            { question: 'First-line pharm for severe delirium agitation?', answer: 'Low-dose haloperidol (0.5–1 mg IV/IM) or olanzapine (2.5–5 mg). Monitor QTc.', tag: 'next-step' },
        ],
        shelfHighYield: [
            'Delirium: acute, fluctuating, **inattention** is core feature.',
            'Dementia: chronic, progressive, attention preserved early.',
            'Lewy Body: visual hallucinations + parkinsonism + fluctuating cognition.',
            'Common reversible causes: UTI, hypoxia, hypoglycemia, opioids, benzos, anticholinergics.',
            'Treat the cause, then non-pharm (reorient, family, lights, sleep) before meds.',
        ],
        linkedTreeId: 'delirium',
    },
    {
        id: 'psych-suicide-cssrs',
        rotationId: 'psychiatry',
        sectionId: 'seeing',
        title: 'C-SSRS in 60 seconds',
        trigger: 'Any patient with depression, recent loss, substance use, or a chief complaint that could mask suicidal ideation — universal screening on psych and trauma.',
        askThree: [
            'In the past month, have you wished you were dead or wished you could go to sleep and not wake up?',
            'Have you actually had thoughts of killing yourself?',
            'Have you thought about how you might do it, and do you have access to those means?',
        ],
        oneBreathReframe: 'A 5-step ladder from passive death wish → active ideation → method → intent → plan; severity 4–5 OR any recent self-injurious behavior = high risk regardless of stated intent.',
        sayOnRounds: '[Age]-y/o presenting with [CC]. C-SSRS severity **[1–5]** with [no / passive / active] ideation. [Has / has not] disclosed plan, intent, means access. Prior attempts: [yes/no, when]. Protective factors: [list]. Risk: [low/moderate/high]. Plan: [outpatient with follow-up / psychiatric admission / 1:1 sitter / means restriction counseling].',
        doNotMiss: [
            'Severity 4–5 OR recent behavior = HIGH risk → psychiatric admission with 1:1.',
            '**Always ask about firearm access** — and counsel safe storage / removal even if discharging.',
            'Intoxication amplifies risk — never clear an intoxicated patient with SI for outpatient.',
            'Document protective factors (kids, faith, future plans) — they matter for disposition.',
            'A safety plan is collaborative — write it WITH the patient, not FOR them.',
        ],
        pimpPrep: [
            { question: 'C-SSRS severity 4 vs 5 — what is the difference?', answer: '4 = active ideation with intent (no plan). 5 = active ideation with intent AND plan.', tag: 'criteria' },
            { question: 'Strongest single risk factor for completed suicide?', answer: 'Prior suicide attempt.', tag: 'pearl' },
            { question: 'Patient with passive SI ("better off dead") and no plan — admit?', answer: 'Usually no — severity 1–2 with protective factors and reliable follow-up may be safe outpatient with safety plan and means restriction.', tag: 'next-step' },
        ],
        shelfHighYield: [
            'Demographics: middle-aged white men have highest completion rate; women attempt more often.',
            'Method matters: firearms = highest lethality (50% of US completions).',
            'SSRIs in adolescents: **black-box warning** for increased suicidal ideation in first weeks — monitor closely, do not avoid the drug.',
            'Lithium decreases suicide risk in bipolar (independent of mood stabilization).',
            'Discharge documentation: ideation, plan, intent, means, prior attempts, protective factors, safety plan, follow-up.',
        ],
        linkedTreeId: 'suicide-risk-assessment',
    },
    // ---- Section 2: Patient Is Unsafe Or Agitated ----
    {
        id: 'psych-agitation-beta',
        rotationId: 'psychiatry',
        sectionId: 'unsafe',
        title: 'Agitation: BETA Protocol → Chemical Ladder',
        trigger: 'Escalating patient — pacing, yelling, threatening — before they hurt themselves, you, or staff.',
        askThree: [
            'What triggered this — pain, fear, intoxication, withdrawal, psychosis, or delirium?',
            'Last set of vitals, glucose, and oxygen — any abnormal?',
            'Any clonus, rigidity, fever, or recent serotonergic / antipsychotic medication?',
        ],
        oneBreathReframe: 'Agitation is a symptom, not a diagnosis — treat the underlying cause (medical, intoxication, withdrawal, psychiatric) while using the least restrictive intervention that keeps everyone safe.',
        sayOnRounds: 'Patient is RASS [+1 to +4] with [features]. De-escalation [attempted/successful/failed]. Most likely cause: [medical / intoxication / withdrawal / primary psych]. Treatment: [verbal de-escalation → PO offer → IM if refused/danger]. Vitals/glucose/temp [normal/abnormal]. Plan: [observation / chemical sedation / restraints if both fail].',
        doNotMiss: [
            'Always check glucose, O₂ sat, and temp BEFORE giving sedatives.',
            'Hyperthermia + agitation + clonus or rigidity = serotonin syndrome or NMS — do NOT give antipsychotics.',
            'Never use prone restraint — positional asphyxia kills.',
            'Excited delirium (hyperthermia + altered mentation) = ICU after sedation.',
            'After ketamine or droperidol: monitor airway, pulse ox, telemetry.',
        ],
        pimpPrep: [
            { question: 'BETA stands for?', answer: 'Best practices in Evaluation and Treatment of Agitation — the APA project guideline emphasizing verbal de-escalation first.', tag: 'mechanism' },
            { question: 'IM agent for severe agitation when you cannot get an IV?', answer: 'Ketamine 4–5 mg/kg IM (fastest), or droperidol 5 mg + midazolam 5 mg IM ("B-52" replacement).', tag: 'next-step' },
            { question: 'Why not give haloperidol to a patient with hyperthermia and rigidity?', answer: 'Risk of NMS. Use benzodiazepines + cooling instead until NMS/SS ruled out.', tag: 'adverse-effect' },
        ],
        shelfHighYield: [
            'De-escalation order: verbal → environmental → PO offer → IM.',
            'Antipsychotic options: haloperidol 5–10 mg IM, olanzapine 5–10 mg IM, droperidol 5 mg IM.',
            'Avoid IM olanzapine + parenteral benzo together (respiratory depression).',
            'Ketamine 4–5 mg/kg IM = onset in 2–5 min for excited delirium.',
            'Document: indication, less restrictive alternatives tried, time-limited orders, monitoring plan.',
        ],
        linkedTreeId: 'acute-agitation',
    },
    {
        id: 'psych-alcohol-withdrawal',
        rotationId: 'psychiatry',
        sectionId: 'unsafe',
        title: 'Alcohol Withdrawal: PAWSS → CIWA → Phenobarb',
        trigger: 'Patient with chronic alcohol use, tremor, tachycardia, or last drink within 72 hours — life-threatening if undertreated.',
        askThree: [
            'When was your last drink, and how much do you drink on a typical day?',
            'Have you ever had a withdrawal seizure, DTs, or been admitted for withdrawal?',
            'Any vomiting, diarrhea, fever, or hallucinations since you stopped?',
        ],
        oneBreathReframe: 'Hyperadrenergic CNS rebound from chronic alcohol-related GABA tolerance — predictable timeline (tremor 6h → hallucinations 12h → seizure 24–48h → DTs 48–96h) and prevention is far easier than rescue.',
        sayOnRounds: '[Age]-y/o with chronic alcohol use, last drink [time], presenting with [symptoms]. **PAWSS** [score] predicts [risk tier]. **CIWA-Ar** [score] guiding [symptom-triggered / fixed-dose] therapy. Plan: thiamine 100 mg IV before glucose, [phenobarbital load if PAWSS ≥4 or DTs] vs [scheduled benzo taper], magnesium / folate, monitor for seizure.',
        doNotMiss: [
            '**Thiamine 100 mg IV BEFORE glucose** — Wernicke prevention.',
            'PAWSS ≥4 = high risk for severe withdrawal → consider phenobarbital prophylaxis.',
            'DTs (hallucinations + autonomic instability + altered mentation) → ICU, mortality 5–15%.',
            'Withdrawal seizures = phenobarbital 15–20 mg/kg IV (not just benzos).',
            'Hepatic encephalopathy contraindicates phenobarbital (use benzos only).',
        ],
        pimpPrep: [
            { question: 'What does CIWA-Ar measure, and what score triggers treatment?', answer: '10 items (tremor, sweating, anxiety, agitation, etc.). Score ≥8–10 → benzo dose; score ≥15 → severe.', tag: 'criteria' },
            { question: 'Why thiamine before glucose in alcoholics?', answer: 'Glucose drives thiamine-dependent metabolism; giving glucose first can precipitate Wernicke encephalopathy.', tag: 'mechanism' },
            { question: 'First-line if a patient seizes during withdrawal?', answer: 'IV benzodiazepine for the active seizure, then phenobarbital 15–20 mg/kg IV load to prevent recurrence.', tag: 'next-step' },
        ],
        shelfHighYield: [
            'Wernicke triad: confusion, ataxia, ophthalmoplegia (often incomplete).',
            'Korsakoff: anterograde amnesia + confabulation — irreversible.',
            'Withdrawal timeline: 6h tremor, 12h hallucinations, 24–48h seizure, 48–96h DTs.',
            'Treatment: benzos (lorazepam if liver disease, diazepam otherwise) + thiamine + folate + magnesium.',
            'AUD pharmacology: naltrexone (cravings), acamprosate (anxiety/sleep), disulfiram (aversion).',
        ],
        linkedTreeId: 'alcohol-withdrawal',
    },
    {
        id: 'psych-nms-vs-ss',
        rotationId: 'psychiatry',
        sectionId: 'unsafe',
        title: 'NMS vs Serotonin Syndrome',
        trigger: 'Fever + altered mentation + neuromuscular signs in a patient on psychiatric medications.',
        askThree: [
            'What psychiatric medications, and any started or increased in the last 1–2 weeks?',
            'Any tramadol, fentanyl, MDMA, linezolid, methylene blue, or new antibiotics?',
            'When did the fever, rigidity, or muscle jerks start — hours or days?',
        ],
        oneBreathReframe: 'Two life-threatening medication reactions that look similar but split on temporal pattern (SS = hours, NMS = days), neuromuscular signature (SS = clonus/hyperreflexia, NMS = lead-pipe rigidity), and offending agent (SS = serotonergic, NMS = dopamine antagonist).',
        sayOnRounds: '[Age]-y/o on [serotonergic / dopamine-blocker] medications presenting with [fever, rigidity/clonus, AMS, autonomic instability]. **Hunter Criteria** [met/not met] for serotonin syndrome / **Levenson Criteria** [met/not met] for NMS. Plan: STOP offending agent, [benzodiazepines + cyproheptadine for SS / dantrolene + bromocriptine for NMS], ICU, aggressive cooling.',
        doNotMiss: [
            'STOP the offending drug **first** — supportive care comes second.',
            'Hyperthermia >40°C → intubate, cool aggressively, paralytic if rigidity prevents cooling.',
            'Rhabdomyolysis (CK >5,000) → IV fluids, monitor for AKI.',
            'Do not give bromocriptine for SS (worsens serotonergic state).',
            'Do not give cyproheptadine for NMS (no benefit, delays correct treatment).',
        ],
        pimpPrep: [
            { question: 'How do you tell NMS from serotonin syndrome at the bedside?', answer: 'SS = clonus + hyperreflexia (hyperkinetic), onset hours, after serotonergic drug. NMS = lead-pipe rigidity + bradyreflexia, onset days, after dopamine blocker.', tag: 'criteria' },
            { question: 'First-line treatment for serotonin syndrome (besides stopping the drug)?', answer: 'Benzodiazepines for agitation + cyproheptadine 12 mg PO load, then 2 mg q2h.', tag: 'next-step' },
            { question: 'Why does dantrolene work for NMS?', answer: 'Direct skeletal muscle relaxant — blocks calcium release from sarcoplasmic reticulum, reducing rigidity-driven hyperthermia.', tag: 'mechanism' },
        ],
        shelfHighYield: [
            'NMS: F-E-V-E-R — Fever, Encephalopathy, Vitals unstable, Elevated CK, Rigidity.',
            'SS triad: mental status change, autonomic hyperactivity, neuromuscular abnormalities (clonus).',
            'Both can elevate CK and cause renal failure from rhabdomyolysis.',
            'Malignant hyperthermia: post-anesthesia (succinylcholine, halothanes) — same dantrolene treatment, different trigger.',
            'After NMS resolves, atypical antipsychotic can be re-trialed cautiously after 2-week washout.',
        ],
        linkedTreeId: 'nms',
    },
    // ---- Section 3: I Need To Present This Patient ----
    {
        id: 'psych-mse',
        rotationId: 'psychiatry',
        sectionId: 'present',
        title: 'MSE You Will Not Be Embarrassed By',
        trigger: 'Any psych presentation, every consult note, every discharge summary — the MSE is the physical exam of psychiatry.',
        askThree: [
            'Observe before you ask: appearance, behavior, eye contact, motor activity.',
            'Speech: rate, volume, prosody — listen for pressured, slowed, or impoverished.',
            'Ask "How is your mood today?" — quote the patient. Then observe affect (range, congruence, reactivity).',
        ],
        oneBreathReframe: 'A structured snapshot of the patient\'s mental state at THIS moment — appearance/behavior/speech/mood/affect/thought process/thought content/perception/cognition/insight/judgment — using observation language, not interpretation.',
        sayOnRounds: '**Appearance:** [age-appropriate, kempt, in gown]. **Behavior:** [cooperative, no abnormal movements]. **Speech:** [normal rate/rhythm/volume]. **Mood:** "[patient\'s words]". **Affect:** [full range, congruent]. **Thought process:** [linear, goal-directed]. **Thought content:** [denies SI/HI/AVH, no delusions elicited]. **Cognition:** [A&O ×3]. **Insight/judgment:** [fair/fair].',
        doNotMiss: [
            'Mood = patient\'s words (in quotes). Affect = your observation.',
            'Thought process = HOW they think (linear, tangential, loose, flight of ideas).',
            'Thought content = WHAT they think about (SI, HI, AVH, delusions).',
            'Always document SI/HI/AVH explicitly — "denies" beats silence.',
            'Insight (do they know they are ill?) and judgment (will they make safe decisions?) are separate.',
        ],
        pimpPrep: [
            { question: 'Difference between tangential and circumstantial thought?', answer: 'Circumstantial: gets there eventually. Tangential: never returns to the original point.', tag: 'criteria' },
            { question: 'Patient says "I am fine" but is tearful — how do you document affect?', answer: '"Affect tearful, incongruent with stated mood."', tag: 'pearl' },
            { question: 'What is "blocking"?', answer: 'Sudden interruption of thought mid-sentence — patient cannot recall what they were saying. Classic in schizophrenia.', tag: 'mechanism' },
        ],
        shelfHighYield: [
            'MSE order: ASEPTIC — Appearance, Speech, Emotion (mood/affect), Perception, Thought, Insight, Cognition.',
            'Pressured speech + flight of ideas + grandiosity = mania.',
            'Poverty of speech + flat affect + alogia = negative symptoms of schizophrenia.',
            'Word salad = severe formal thought disorder, often schizophrenia.',
            'Folie à deux = shared delusional disorder between two close people.',
        ],
        linkedTreeId: 'psychiatry-assessment',
    },
    {
        id: 'psych-presentation',
        rotationId: 'psychiatry',
        sectionId: 'present',
        title: 'Full Psych H&P One-Liner',
        trigger: 'Presenting any new psychiatric admission, consult, or ED hold — the first 12 seconds set the tone.',
        askThree: [
            'Age, sex, pertinent psychiatric history (diagnoses, hospitalizations, attempts) — not all medical history.',
            'Chief complaint in patient\'s words OR primary symptom (not your diagnosis).',
            'Why NOW — what changed today/this week that brought them in?',
        ],
        oneBreathReframe: 'A surgical 1–2 sentence opener that names the patient, frames the problem, and sets the audience\'s expectation for what comes next — replacing "well, so, this patient..." with diagnostic momentum.',
        sayOnRounds: '"[Age]-y/o [sex] with history of [psychiatric dx — schizophrenia, BPAD, MDD, AUD] presenting with [duration] of [primary symptom in patient\'s words] in the setting of [trigger / med non-adherence / substance use]. Brought in by [self / family / EMS / police] for [SI / HI / functional decline / safety]." Then: HPI → MSE → safety assessment → A&P by problem.',
        doNotMiss: [
            'Lead with the **chief complaint**, not your diagnosis ("hearing voices for 3 days," not "psychotic decompensation").',
            'Always include **legal status** if admitted (voluntary, EDO, certified).',
            'Mention **substance use, last use, and meds** in the one-liner if they are driving the presentation.',
            '**Risk assessment** (SI/HI/safety) before the assessment & plan — never bury it.',
            'Plan organized by problem, not by service ("1. SI: 1:1 sitter, lethal means restriction. 2. AUD: CIWA, thiamine. 3. Disposition: psych admission.").',
        ],
        pimpPrep: [
            { question: 'What is wrong with: "This patient is a 32-year-old schizophrenic"?', answer: 'Person-first language — "patient with schizophrenia," not "schizophrenic." Defines them by illness.', tag: 'pearl' },
            { question: 'You forgot to ask about firearm access. Bring it up where in the presentation?', answer: 'Acknowledge gap, then close it: "I did not ask about means access — I will follow up before we finalize disposition."', tag: 'next-step' },
            { question: 'Family member is in the room during your presentation. Continue?', answer: 'Pause. Patient confidentiality first — step out or move to the hall.', tag: 'pearl' },
        ],
        shelfHighYield: [
            'EDO (Emergency Detention Order) terminology varies by state — know yours.',
            'Voluntary admission: patient can request discharge (usually with 72-hour notice).',
            'Involuntary criteria (most states): danger to self, danger to others, OR grave disability.',
            'Tarasoff duty: warn identified third party of credible homicidal threat.',
            'HIPAA exceptions in psychiatry: imminent danger, court order, child abuse reporting, mandatory reporting.',
        ],
        linkedTreeId: 'psych-assessment',
    },
    // ---- Section 4: I Need To Understand The Diagnosis ----
    {
        id: 'psych-first-break',
        rotationId: 'psychiatry',
        sectionId: 'understand',
        title: 'First-Break Psychosis (organic until proven)',
        trigger: 'New onset hallucinations, delusions, or disorganized thought in a patient without a prior psychiatric diagnosis.',
        askThree: [
            'Age at onset and timeline — acute (hours-days) vs subacute (weeks-months)?',
            'Substance use, recent prescription changes, head trauma, fever, or seizures?',
            'Family history of psychiatric illness — especially schizophrenia or bipolar?',
        ],
        oneBreathReframe: 'A new psychotic syndrome that is medical until proven otherwise — particularly in patients over 45, with focal exam, fever, or atypical features — before primary psychiatric diagnosis is even considered.',
        sayOnRounds: '[Age]-y/o with no prior psychiatric history presenting with [duration] of [hallucinations / delusions / disorganized thought]. No fever, focal deficits, [drug use]. Workup: tox screen, glucose, TSH, B12, RPR, HIV, MRI [if focal/atypical], LP [if fever/encephalopathy]. Differential: organic (delirium, encephalitis, anti-NMDA, neurosyphilis), substance-induced, primary psychiatric.',
        doNotMiss: [
            '**Age >45 with new psychosis = 70% have organic cause** — full medical workup.',
            'Anti-NMDA receptor encephalitis: young woman + viral prodrome + psychosis → movement disorder → seizures. Check ovaries (teratoma).',
            'Visual > auditory hallucinations suggests organic, not primary psychiatric.',
            'Fever + AMS + psychosis → LP, empiric antibiotics + acyclovir until ruled out.',
            'Substance-induced psychosis can persist — does not auto-resolve at the ED door.',
        ],
        pimpPrep: [
            { question: 'Schizophrenia DSM-5 duration criterion?', answer: '≥6 months of symptoms (including ≥1 month of active phase). <1 month = brief psychotic disorder; 1–6 months = schizophreniform.', tag: 'criteria' },
            { question: 'Why is anti-NMDA encephalitis on the boards every year?', answer: 'Young woman + new psychosis + autonomic instability + seizures + ovarian teratoma — classic vignette. CSF anti-NMDA antibody is diagnostic.', tag: 'pearl' },
            { question: 'First-line antipsychotic for first-break psychosis?', answer: 'Atypical (risperidone, olanzapine, aripiprazole) at low dose — better metabolic profile than typicals long-term.', tag: 'next-step' },
        ],
        shelfHighYield: [
            'MR. FISC — Mood swings, Reduced reality, Flat affect, Inattention, Speech disturbance, Cognitive deficits (schizophrenia features).',
            'Positive symptoms: hallucinations, delusions, disorganization. Negative: flat affect, alogia, avolition, anhedonia.',
            'Schizoaffective: psychosis + mood episode (≥2 weeks of psychosis WITHOUT mood symptoms).',
            'Brief psychotic: <1 month, full return to baseline.',
            'Atypicals → metabolic syndrome (clozapine, olanzapine worst). Monitor weight, lipids, glucose.',
        ],
        linkedTreeId: 'acute-psychosis',
    },
    {
        id: 'psych-catatonia',
        rotationId: 'psychiatry',
        sectionId: 'understand',
        title: 'Catatonia: Bush-Francis + Lorazepam Challenge',
        trigger: 'Patient is mute, immobile, posturing, or has waxy flexibility — often missed because it looks like depression or "non-cooperation."',
        askThree: [
            'How long has the patient been like this — hours, days, or weeks?',
            'Any underlying psychiatric diagnosis (depression, mania, schizophrenia) or medical illness (encephalitis, stroke)?',
            'Any recent antipsychotic exposure (risk of malignant catatonia/NMS overlap)?',
        ],
        oneBreathReframe: 'A treatable neuropsychiatric syndrome of motor and behavioral abnormalities — recognizable by Bush-Francis screen, confirmed by lorazepam challenge, and reversed by benzodiazepines or ECT in most patients.',
        sayOnRounds: '[Age]-y/o with [psychiatric / medical history] presenting with [duration] of [immobility / mutism / posturing / waxy flexibility]. **Bush-Francis** [≥2 features positive]. **Lorazepam 2 mg IV challenge** [response in 10–15 min / no response]. Plan: lorazepam 2–4 mg IV q4–6h; if benzo-resistant, ECT consult. Avoid antipsychotics until catatonia resolves (NMS risk).',
        doNotMiss: [
            '**Lorazepam 2 mg IV is both diagnostic AND therapeutic** — response within 10–15 min confirms.',
            'Avoid antipsychotics in active catatonia — risk of malignant catatonia / NMS.',
            'Malignant catatonia: fever + rigidity + autonomic instability — ICU, may need ECT urgently.',
            'Catatonia is NOT just a feature of schizophrenia — most cases are mood-related (depression, mania).',
            'Medical causes: encephalitis (anti-NMDA), stroke, paraneoplastic — workup if no psych history.',
        ],
        pimpPrep: [
            { question: 'Name three Bush-Francis features.', answer: 'Immobility, mutism, staring, posturing, negativism, waxy flexibility, echolalia, stereotypy. ≥2 = positive screen.', tag: 'criteria' },
            { question: 'Why ECT for benzo-resistant catatonia?', answer: 'ECT is the most effective treatment — works in >85% of cases including malignant catatonia.', tag: 'next-step' },
            { question: 'Patient with catatonia from schizophrenia — when can you give an antipsychotic?', answer: 'AFTER catatonia resolves with benzos — premature antipsychotic risks NMS / malignant catatonia.', tag: 'pearl' },
        ],
        shelfHighYield: [
            'Bush-Francis Catatonia Rating Scale: 23 items, ≥2 = catatonia.',
            'Lorazepam 1–2 mg IV → reassess in 10–15 minutes.',
            'Most catatonia is mood-related (depression > mania > schizophrenia).',
            'Anti-NMDA encephalitis presents with catatonia + psychosis + dyskinesias in young women.',
            'Malignant catatonia and NMS are clinically and pathophysiologically overlapping; treatment is the same.',
        ],
        linkedTreeId: 'catatonia',
    },
];
// ===================================================================
// Psychiatry rotation definition
// ===================================================================
const PSYCHIATRY_ROTATION = {
    id: 'psychiatry',
    name: 'Psychiatry',
    subtitle: 'Clinical rotation mode for medical students',
    categoryId: 'psychiatry',
    preRoundTitle: 'Pre-Round Template',
    shelfTitle: 'Shelf High-Yield',
    sections: [
        {
            id: 'seeing',
            title: "I'm Seeing A Psych Patient",
            blurb: 'First moves when a patient hits your service — orient, screen, decide who is sick.',
            cardIds: ['psych-capacity', 'psych-delirium-vs-psychosis', 'psych-suicide-cssrs'],
        },
        {
            id: 'unsafe',
            title: 'Patient Is Unsafe Or Agitated',
            blurb: 'Acute behavioral or medication emergencies — recognize, de-escalate, escalate.',
            cardIds: ['psych-agitation-beta', 'psych-alcohol-withdrawal', 'psych-nms-vs-ss'],
        },
        {
            id: 'present',
            title: 'I Need To Present This Patient',
            blurb: 'MSE language and the one-liner that earns you the rest of the morning.',
            cardIds: ['psych-mse', 'psych-presentation'],
        },
        {
            id: 'understand',
            title: 'I Need To Understand The Diagnosis',
            blurb: 'Clinical reasoning frameworks for the calls that come up most.',
            cardIds: ['psych-first-break', 'psych-catatonia'],
        },
    ],
};
export const ALL_LEARN_ROTATIONS = [PSYCHIATRY_ROTATION];
const ALL_CARDS = [...PSYCH_CARDS];
// ===================================================================
// Public accessors
// ===================================================================
export function getAllLearnRotations() {
    return ALL_LEARN_ROTATIONS;
}
export function getLearnRotation(id) {
    return ALL_LEARN_ROTATIONS.find(r => r.id === id);
}
export function getStudentCard(id) {
    return ALL_CARDS.find(c => c.id === id);
}
export function getCardsForSection(rotationId, sectionId) {
    const rotation = getLearnRotation(rotationId);
    if (!rotation)
        return [];
    const section = rotation.sections.find(s => s.id === sectionId);
    if (!section)
        return [];
    return section.cardIds
        .map(id => getStudentCard(id))
        .filter((c) => c !== undefined);
}
export function getAllCardsForRotation(rotationId) {
    return ALL_CARDS.filter(c => c.rotationId === rotationId);
}
