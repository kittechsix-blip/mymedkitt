// MedKitt — Psychiatric Assessment (Mental Status Examination)
// History → Appearance → Behavior → Speech → Mood → Affect → Thought Process →
// Thought Content/Perception → Cognition → Safety → Insight/Judgment → Labs → Disposition
// 5 modules: History & Presentation → Behavior, Speech & Emotions →
//            Thought, Perception & Cognition → Safety Assessment → Insight, Labs & Disposition
// 19 nodes total. Standard 10-component MSE flow.
export const PSYCH_ASSESSMENT_CRITICAL_ACTIONS = [
    { text: 'MSE differs from MMSE - MSE is comprehensive psychological state, MMSE is cognitive screening only', nodeId: 'psych-start' },
    { text: 'Document mood in patient\'s own words (subjective) vs affect (your objective observation)', nodeId: 'psych-mood' },
    { text: 'Always screen for suicidal ideation: "Have you had thoughts of hurting yourself or ending your life?"', nodeId: 'psych-safety' },
    { text: 'Collateral sources critical - family, EMS, pharmacy records, prior ED visits document sources', nodeId: 'psych-history' },
    { text: 'Tardive dyskinesia: lip smacking, tongue writhing, grimacing - document movement disorders', nodeId: 'psych-behavior' },
    { text: 'Thought process vs thought content: process = HOW they think, content = WHAT they think', nodeId: 'psych-thought-process' },
    { text: 'Flat affect = no emotional expression (schizophrenia, severe depression) vs blunted (minimal)', nodeId: 'psych-affect' },
    { text: 'CPT 90792 requires: complete history + MSE + initial diagnosis + treatment plan + capacity assessment', nodeId: 'psych-start' },
];
export const PSYCH_ASSESSMENT_NODES = [
    // =====================================================================
    // MODULE 1: HISTORY & PRESENTATION
    // =====================================================================
    {
        id: 'psych-start',
        type: 'info',
        module: 1,
        title: 'Psychiatric Assessment — Overview',
        body: 'A **comprehensive psychiatric assessment** follows a structured format including both historical information and a systematic **Mental Status Examination (MSE)**.\n\nThe MSE is a structured way to assess and document a patient\'s current cognitive, behavioral, and emotional functioning. Unlike the MMSE (cognitive screening), the MSE offers a **broader view** of the patient\'s psychological state during a specific encounter.\n\n**10 Components of the MSE:**\n1. Appearance\n2. Behavior\n3. Speech & Language\n4. Mood (subjective)\n5. Affect (objective)\n6. Thought Process\n7. Thought Content & Perception\n8. Suicidal / Homicidal Risk\n9. Cognition\n10. Insight & Judgment\n\n**Documentation for CPT 90792 must include:**\n• Complete medical and psychiatric history\n• Mental status examination findings\n• Initial diagnosis\n• Evaluation of capacity to respond to treatment\n• Initial treatment plan\n\n*Basis:* The 10-component MSE structure and the MSE-vs-MMSE distinction are drawn from narrative reviews of MSE technique in Am Fam Physician [1][2][6] and from non-peer-reviewed educational templates [9] — see the citation list for evidence-quality notes on [9]. The MSE itself is a **descriptive documentation framework, not a validated diagnostic instrument**: no MSE component has a published sensitivity, specificity, or likelihood ratio for any diagnosis, and findings must be interpreted with history, vital signs, and physical examination. The CPT 90792 documentation elements are a billing requirement defined by the AMA CPT code set [25], not a clinical evidence statement.',
        citation: [1, 2, 6, 9, 25],
        next: 'psych-history',
        summary: '10-component MSE: appearance through insight/judgment — CPT 90792 requires full MSE + treatment plan',
        skippable: true,
    },
    {
        id: 'psych-history',
        type: 'info',
        module: 1,
        title: 'History Taking',
        body: '**Presenting Complaint:**\n• Chief complaint in patient\'s own words\n• Onset, duration, and course of current symptoms\n• Precipitating events or stressors\n\n**Psychiatric History:**\n• Previous psychiatric diagnoses\n• Prior hospitalizations (voluntary vs. involuntary)\n• Previous treatments and response\n• History of self-harm or suicide attempts\n\n**Medication History:**\n• Current psychotropic medications (dose, duration, adherence)\n• Previous medication trials and why discontinued\n• Over-the-counter and herbal supplements\n\n**Substance Use:**\n• Alcohol — type, quantity, frequency, last use\n• Illicit drugs — type, route, frequency, last use\n• Tobacco/nicotine, caffeine\n• History of withdrawal symptoms or DTs\n\n**Medical History:**\n• Relevant medical conditions (thyroid, neurologic, metabolic)\n• Recent head trauma or seizures\n• Current medical medications\n\n**Family Psychiatric History:**\n• Psychiatric diagnoses in first-degree relatives\n• Family history of suicide or substance use\n\n**Social History:**\n• Living situation, employment, relationships\n• Support system, legal issues\n\n**Collateral Sources:**\n• Family members, EMS, pharmacy records, prior ED visits\n• Document who provided information and relationship to patient',
        citation: [3, 4, 5],
        next: 'psych-appearance',
        summary: 'Chief complaint, psych/med/substance history, collateral sources — document who provided information',
        skippable: true,
    },
    {
        id: 'psych-appearance',
        type: 'info',
        module: 1,
        title: '1. Appearance',
        body: '**Appearance** refers to how the patient presents physically. These observations offer insight into level of functioning, mood, and potential psychiatric symptoms.\n\n**Hygiene & Grooming:**\n• Clean, neat, shaven\n• Body odor, disheveled, unkempt, malodorous\n\n**Dress:**\n• Appropriate, casual, neat, business, fashionable\n• Bizarre, inappropriate, dirty, stained, ragged, layered\n\n**Posture:**\n• Relaxed, rigid, slumped, tense\n\n**Facial Expressions:**\n• Calm, sad, anxious, angry, perplexed, masked, grimacing, tearful\n\n**Apparent Age:**\n• Younger than / older than / consistent with stated age\n\n**Body Habitus:**\n• Normal, underweight, overweight, obese, cachectic\n\n**Distinguishing Features:**\n• Tattoos, piercings, scars, visible injuries, track marks\n\n**Makeup/Adornment:**\n• Appropriate, garish, bizarre, none\n\n**Assessment Prompts:**\n• "How do you usually get ready for the day?"\n• "Have you noticed any changes in your daily routines or energy levels?"\n\n**Example:** "Patient appears older than stated age. Disheveled, with stained clothing and poor hygiene. Avoids eye contact and sits with a slouched posture."',
        citation: [1, 6, 9],
        next: 'psych-behavior',
        summary: 'Assess hygiene, dress, posture, facial expression, apparent age — insights into functioning and mood',
        skippable: true,
    },
    // =====================================================================
    // MODULE 2: BEHAVIOR, SPEECH & EMOTIONS
    // =====================================================================
    {
        id: 'psych-behavior',
        type: 'question',
        module: 2,
        title: '2. Behavior & Motor',
        body: '**Behavior** refers to how the patient moves, responds, and engages during the encounter.\n\n**Eye Contact:**\n• Good, fleeting, intense, avoidant, staring, none\n\n**Cooperativeness / Attitude:**\n• Friendly, cooperative, open, relaxed, candid\n• Guarded, evasive, hostile, withdrawn, suspicious\n• Passive, sullen, manipulative, demanding, overly friendly\n\n**Psychomotor Activity:**\n• Normal, restless, tense, agitated\n• Decreased activity, psychomotor retardation, catatonic\n\n**Movement Disorders:**\n• Tremor, tics, twitches, stereotypies\n• Tardive dyskinesia (lip smacking, tongue writhing, grimacing)\n• Akathisia, dystonia, posturing\n\n**Body Language / Gestures:**\n• Open, closed, defensive, threatening\n• Appropriate gesturing, mannerisms\n\n**Gait:**\n• Steady, unsteady, shuffling, limping, uses assistive device\n\n**Level of Arousal:**\n• Alert, drowsy, somnolent, obtunded, comatose\n\n**Rapport / Engagement:**\n• Engaged, cooperative, distant, superficial, disinhibited\n\n**Assessment Prompts:**\n• "How are you feeling about today\'s visit?"\n• "Have you noticed any changes in your movement or body sensations lately?"\n\n**Example:** "Patient sits rigidly, avoids eye contact, and displays frequent lip smacking. Motor activity is tense but controlled. Guarded attitude throughout the session."',
        citation: [1, 6, 9, 10],
        options: [
            {
                label: 'Observations complete — proceed',
                description: 'Behavior and motor assessment documented',
                next: 'psych-speech',
            },
            {
                label: 'Acute agitation / safety concern',
                description: 'Patient is acutely agitated, combative, or poses immediate risk',
                urgency: 'critical',
                next: 'psych-safety',
            },
        ],
        summary: 'Eye contact, cooperation, psychomotor activity, movement disorders (tardive dyskinesia), level of arousal',
    },
    {
        id: 'psych-speech',
        type: 'info',
        module: 2,
        title: '3. Speech & Language',
        body: '**Speech patterns** offer insight into cognitive and emotional state. Disruptions may indicate mood disorders, anxiety, thought disorganization, or neurocognitive impairment.\n\n**Rate:**\n• Normal (~100-150 words/minute)\n• Rapid / pressured (→ mania, anxiety)\n• Slow / hesitant (→ depression, sedation)\n• Delayed onset\n\n**Rhythm:**\n• Normal prosody, articulate\n• Monotone, stuttering, dysarthric, slurred\n\n**Volume:**\n• Normal, loud, soft, whispered, mute\n\n**Content / Quantity:**\n• Normal, fluent, verbose / loquacious\n• Impoverished / poverty of speech (→ depression, negative symptoms)\n• Spontaneous vs. only responsive to questions\n\n**Tone:**\n• Normal, anxious, angry, whiny, flat, tremulous\n\n**Fluency:**\n• Fluent, non-fluent, word-finding difficulty\n\n**Articulation:**\n• Clear, slurred (→ intoxication, neurologic), mumbling\n\n**Latency:**\n• Normal response time\n• Increased latency (→ depression, thought blocking, sedation)\n\n**Assessment Prompts:**\n• "Has anyone mentioned changes in the way you speak lately?"\n• "Do you feel like it\'s harder to find words or express yourself?"\n\n**Example:** "Speech is slow in rate, low in volume, with increased latency. Normal articulation. Poverty of speech noted."',
        citation: [1, 6, 9, 10],
        next: 'psych-mood',
        summary: 'Rate, rhythm, volume, content, latency — pressured speech suggests mania, poverty suggests depression',
        skippable: true,
    },
    {
        id: 'psych-mood',
        type: 'info',
        module: 2,
        title: '4. Mood (Subjective)',
        body: '**Mood** is the patient\'s **self-reported** emotional state — what they TELL you they feel. It represents a **sustained emotion** present over a prolonged period that can alter their perception of the world.\n\n**Ask the patient:**\n• "How is your mood today?"\n• "How have you been feeling over the past few days?"\n• "Would you say your emotions have been steady or up and down?"\n• "Have you felt sad or discouraged?"\n• "Have you been feeling anxious or worried?"\n• "On a scale of 1-10, how would you rate your mood?"\n\n**Document in patient\'s own words** (in quotes).\n\n**Common Descriptors:**\n• Euthymic (normal)\n• Depressed, sad, hopeless, empty\n• Irritable, angry\n• Anxious, fearful, worried\n• Euphoric, elevated, expansive\n• Apathetic, flat\n• Labile (rapidly changing)\n\n**Key Distinction:**\n• **Mood** = what the patient TELLS you (subjective, sustained)\n• **Affect** = what you OBSERVE (objective, moment-to-moment)\n\n**Example:** "Patient describes mood as \'I just feel empty inside.\'"',
        citation: [1, 6, 9, 10],
        next: 'psych-affect',
        summary: 'Document in patient\'s own words — mood is SUBJECTIVE (what they tell you), sustained emotional state',
    },
    {
        id: 'psych-affect',
        type: 'info',
        module: 2,
        title: '5. Affect (Objective)',
        body: '**Affect** is the clinician\'s **objective observation** of the patient\'s emotional expression — what you SEE. It is an observable emotion expressed in the moment, fluctuating during the encounter.\n\n**Intensity:**\n• Normal\n• Flat (no emotional expression → schizophrenia, severe depression)\n• Blunted (minimal expression)\n• Exaggerated\n\n**Quality:**\n• Sad, agitated, euphoric, anxious, angry, fearful, indifferent\n\n**Fluctuation / Stability:**\n• Stable\n• Labile — rapidly shifting, easily altered between states (→ mania, TBI, pseudobulbar affect)\n\n**Range:**\n• Broad / full (normal variation)\n• Restricted / constricted (reduced variation)\n• Flat (absent expression)\n• Expansive\n\n**Congruence:**\n• Mood-congruent (affect matches stated mood)\n• Mood-incongruent (laughing while describing sadness → psychosis)\n\n**Appropriateness:**\n• Appropriate to content of discussion\n• Inappropriate (affect mismatches topic)\n\n**Assessment Prompts:**\n• "How have you been feeling over the past few days?"\n• "Would you say your emotions have been steady or up and down lately?"\n\n**Example:** "Affect is restricted in range, blunted in intensity, mood-congruent, and appropriate to content."',
        citation: [1, 6, 9, 10],
        next: 'psych-thought-process',
        summary: 'Affect is OBJECTIVE — your observation of intensity, quality, range, congruence with stated mood',
    },
    // =====================================================================
    // MODULE 3: THOUGHT, PERCEPTION & COGNITION
    // =====================================================================
    {
        id: 'psych-thought-process',
        type: 'info',
        module: 3,
        title: '6. Thought Process',
        body: '**Thought process** describes the *form and flow* of thinking — HOW the patient thinks. Assess the amount, speed, and the way thoughts are linked together.\n\n**Stream of Thought** (amount and speed):\n• **Goal-directed / linear** — thoughts connect logically (normal)\n• **Rapid** — increased speed but still coherent\n• **Impoverished** — slow thinking, few spontaneous ideas\n• **Thought blocking** — abrupt interruption mid-sentence (→ schizophrenia)\n• **Distractible** — easily pulled off-topic by stimuli\n\n**Form of Thought** (how thoughts are linked):\n• **Circumstantial** — reaches the point via excessive detail\n• **Tangential** — wanders off topic, never reaches the point\n• **Loose associations** — unrelated ideas shift without logic\n• **Flight of ideas** — rapid shifting between loosely connected topics (→ mania)\n• **Perseveration** — repetitive return to same idea\n• **Clang associations** — connections based on sound, not meaning\n• **Word salad** — incoherent, random words without structure\n• **Neologisms** — made-up words\n• **Illogical** — conclusions don\'t follow from premises\n• **Incoherent** — incomprehensible speech\n\n**Assessment Prompts:**\n• "Do you find it easy to focus or follow through on your thoughts?"\n\n**Example:** "Thought process is tangential with loose associations. Patient unable to maintain goal-directed conversation."',
        citation: [1, 6, 9, 10],
        next: 'psych-thought-content',
        summary: 'HOW they think — goal-directed, tangential, loose associations, flight of ideas, thought blocking',
    },
    {
        id: 'psych-thought-content',
        type: 'info',
        module: 3,
        title: '7. Thought Content & Perception',
        body: '**THOUGHT CONTENT** — WHAT the patient is thinking about.\n\n**Content of Thought:**\n• **Delusions** (fixed false beliefs):\n  — Paranoid / persecutory — being watched, followed, harmed\n  — Grandiose — inflated self-importance or abilities\n  — Somatic — false beliefs about body\n  — Referential — events/media directed at them\n  — Erotomanic — belief someone is in love with them\n  — Nihilistic — belief that self/world doesn\'t exist\n  — Religious — divine mission or possession\n• **Obsessions** — intrusive, unwanted thoughts\n• **Compulsions** — repetitive behaviors to reduce anxiety\n• **Phobias** — specific fears\n• **Ruminations** — repetitive worried thoughts\n• **Overvalued ideas** — strongly held but not delusional\n\n**Possession of Thought:**\n• Thought broadcasting — belief thoughts are transmitted to others\n• Thought insertion — belief thoughts are placed by external force\n• Thought withdrawal — belief thoughts are being removed\n\n**PERCEPTION** — sensory experiences.\n\n**PERCEPTIONS Mnemonic:**\n• **P**erception disturbances?\n• **E**ncephalitis considered?\n• **R**eflex hallucinations?\n• **C**oncentration affected?\n• **E**xperiences — derealization, depersonalization?\n• **P**seudohallucinations (insight preserved)?\n• **T**actile, auditory, visual, gustatory, olfactory hallucinations?\n• **I**pseity disturbance (disturbed sense of self)?\n• **O**rganic states?\n• **N**egative symptoms?\n• **S**ensory impairment?\n\n**Command hallucinations:** Ask specifically, document content.\n\n**Screening Questions:**\n• "Do you see or hear things that others don\'t?"\n• "Do you ever feel like things aren\'t real?"\n• "Do you have thoughts that feel intrusive or hard to stop?"\n\n**Note:** SI/HI is assessed in the Safety module.\n\n**Example:** "Patient reports auditory hallucinations (non-command voices commenting on actions). Denies visual hallucinations. Endorses paranoid ideation that coworkers are monitoring him."',
        citation: [1, 6, 9, 10],
        next: 'psych-cognition',
        summary: 'WHAT they think — delusions, obsessions, hallucinations, command hallucinations (ask specifically)',
        safetyLevel: 'warning',
    },
    {
        id: 'psych-cognition',
        type: 'info',
        module: 3,
        title: '9. Cognition',
        body: '**Cognitive assessment** determines how well the patient processes information, recalls memories, and maintains awareness.\n\n**Alertness:**\n• Alert, lethargic, obtunded, stuporous, comatose\n\n**Orientation** (document as A&Ox3 or A&Ox4):\n• Person — "What is your name?"\n• Place — "Where are you right now?"\n• Time — "What year/month/day is it?"\n• Situation — "Why are you here today?"\n\n**Clouding of Consciousness:**\n• Drowsiness, memory impairment, impaired concentration\n• Subtle fluctuations in awareness (→ delirium)\n\n**Attention & Concentration:**\n• Serial 7s (100, 93, 86, 79, 72...)\n• Spell "WORLD" backward\n• Days of the week backward\n• Digit span forward/backward\n\n**Memory:**\n• **Immediate** — repeat 3 words (apple, table, penny)\n• **Short-term** — recall those 3 words after 5 minutes\n• **Long-term** — biographical facts (birthday, address)\n\n**Visuospatial Functioning:**\n• Clock drawing test (draw clock showing 11:10)\n• Copy intersecting pentagons or 3D cube\n\n**Abstract Reasoning:**\n• Similarities — "How are an apple and orange alike?"\n• Proverb interpretation — "A stitch in time saves nine"\n\n**Language:**\n• Naming — point to common objects\n• Comprehension — follow multi-step commands\n• Repetition — "No ifs, ands, or buts"\n\n**Formal Screening:** Consider MMSE (cutoff 24/30) or MoCA (cutoff 26/30) if cognitive impairment suspected.\n\n**Cultural Considerations:** Language barriers, education level, and cultural norms may affect performance. Use interpreter services. Adjust expectations for literacy and background. General knowledge varies by culture/ethnicity.\n\n**Reversible causes to consider:** hypothyroidism, B12 deficiency, infections, medications (beta-blockers, steroids, anticholinergics), substance use.\n\n**Assessment Prompts:**\n• "Can you tell me where we are and what today\'s date is?"\n• "I\'ll say 3 words — can you repeat them back to me?"\n\n**Example:** "Alert and oriented x4. Attention fair, distracted during serial 7s. Recalls 2/3 words at 5 minutes. Insight and judgment limited."',
        citation: [1, 4, 6, 9, 10],
        next: 'psych-safety',
        summary: 'Orientation, attention (serial 7s), memory (3-word recall), abstract reasoning, clock drawing test',
    },
    // =====================================================================
    // MODULE 4: SAFETY ASSESSMENT
    // =====================================================================
    {
        id: 'psych-safety',
        type: 'question',
        module: 4,
        title: '8. Safety — SI/HI Screening',
        body: '**Joint Commission NPSG.15.01.01 (renumbered NPSG.08.01.01 in 2026):** Requires screening **all patients age 12+** evaluated/treated for a primary behavioral health condition using a **validated tool** (C-SSRS, PHQ-2, Patient Safety Screener, ASQ). Positive screen → full risk assessment using an evidence-based process.\n\n**Suicidal Ideation — ask directly:**\n• "Do you feel that life is not worth living?"\n• "Have you had thoughts of hurting yourself?"\n• "Have you thought about killing yourself?"\n• "Do you have a plan? Do you have the means?"\n• "Have you ever attempted suicide before?"\n\n**Columbia Suicide Severity Rating Scale (C-SSRS)** is the most widely validated structured tool and is explicitly endorsed by TJC NPSG.15.01.01.\n\n**Homicidal Ideation — ask directly:**\n• "Have you had thoughts of hurting anyone else?"\n• "Is there anyone you feel angry enough to harm?"\n• "Do you have a plan or access to weapons?"\n\n**Risk Factors for Suicide:**\n• Previous attempts (strongest predictor)\n• Access to lethal means — **ask specifically about firearms**\n• Recent losses, social isolation\n• Substance use, chronic pain\n• Male sex, older age, psychiatric diagnosis\n• Recent ED visits, recent discharge from psychiatric facility\n\n**Protective Factors:**\n• Social support, children at home\n• Future orientation, religious beliefs\n• Therapeutic alliance, treatment engagement\n\n**Descriptors:** Not suicidal, passive ideation, active ideation with/without plan, intent reported, homicidal intent reported.',
        citation: [1, 5, 11],
        summary: 'Ask directly about SI/HI — previous attempts strongest predictor, ask specifically about firearms access',
        safetyLevel: 'critical',
        options: [
            {
                label: 'No SI / HI',
                description: 'Denies suicidal and homicidal ideation. No acute safety concern.',
                next: 'psych-insight',
            },
            {
                label: 'Passive SI — no plan',
                description: '"Life isn\'t worth living" but no plan or intent',
                urgency: 'urgent',
                next: 'psych-si-passive',
            },
            {
                label: 'Active SI — with plan or intent',
                description: 'Active suicidal ideation with plan, means, or intent',
                urgency: 'critical',
                next: 'psych-si-active',
            },
            {
                label: 'HI present',
                description: 'Endorses homicidal ideation toward identified or unidentified target',
                urgency: 'critical',
                next: 'psych-hi',
            },
        ],
    },
    {
        id: 'psych-si-passive',
        type: 'info',
        module: 4,
        title: 'Passive Suicidal Ideation',
        body: '**Passive SI** — patient expresses desire to be dead or not alive but denies active plan or intent.\n\n**Further Assessment:**\n• Frequency and duration of thoughts\n• Any preparatory behaviors (giving away possessions, writing notes)\n• Access to means — **ask specifically about firearms**\n• Substance use (acutely increases risk)\n• Recent changes in behavior or functioning\n\n**Stanley-Brown Safety Planning Intervention (SPI) — 6 steps (~20 min):**\n1. Warning signs that a crisis is developing\n2. Internal coping strategies\n3. People and social settings that provide distraction\n4. People to contact for help\n5. Professionals and agencies to contact\n6. Making the environment safe (lethal means counseling)\n\n**Evidence:** SPI + structured follow-up phone calls (SPI+) cut suicidal behavior by ~50% in the VA cohort (NNT 44, Stanley/Brown JAMA Psychiatry 2018). The updated Stanley-Brown form (5/2/2024) is at suicidesafetyplan.com.\n\n**Disposition Considerations:**\n• Means restriction counseling (document specifically — firearms, medications, sharps)\n• Outpatient psychiatric follow-up within 48-72 hours\n• **Structured follow-up phone call within 24-72 h of discharge** (SPI+ component)\n• Crisis resources: **988 Suicide & Crisis Lifeline** (text or call)\n• Consider social work consult\n• Discharge may be appropriate if patient is **not intoxicated, has a support system, completes a collaborative safety plan, has lethal means addressed, and has reliable follow-up**\n\n**Document:** risk factors, protective factors, safety plan, lethal means counseling, and clinical reasoning for disposition.',
        citation: [1, 5, 11],
        next: 'psych-insight',
        summary: 'Safety planning (Stanley-Brown), means restriction counseling, 988 Lifeline, outpatient follow-up 48-72h',
    },
    {
        id: 'psych-si-active',
        type: 'result',
        module: 4,
        title: 'Active Suicidal Ideation — Psych Emergency',
        body: '**Active SI with plan or intent requires immediate intervention.**\n\n**Immediate Actions:**\n• 1:1 sitter / continuous observation\n• Remove all potential means (sharps, cords, medications)\n• Place patient in safe environment (ligature-resistant room)\n• Voluntary vs. involuntary hold based on jurisdiction\n\n**Consult Psychiatry for:**\n• Risk assessment and safety planning\n• Medication evaluation\n• Inpatient admission recommendation\n• Voluntary vs. involuntary commitment determination\n\n**Labs to Consider:**\n• Urine drug screen, blood alcohol\n• TSH, CBC, BMP (rule out medical contributors)\n• Acetaminophen/salicylate levels if ingestion suspected\n\n**Documentation Must Include:**\n• Specific ideation content (in patient\'s own words)\n• Presence/absence of plan and means\n• Risk factors and protective factors\n• Disposition rationale\n• Who was consulted\n\n**Example:** "Patient endorses SI with plan to overdose on home medications. Has access to stockpiled pills. Prior attempt 6 months ago. 1:1 sitter placed. Psychiatry consulted."',
        recommendation: 'Psychiatric consultation. 1:1 observation. Means restriction. Consider voluntary vs. involuntary hold. Inpatient admission likely indicated.',
        citation: [1, 5, 7],
    },
    {
        id: 'psych-hi',
        type: 'result',
        module: 4,
        title: 'Homicidal Ideation — Safety Protocol',
        body: '**Homicidal ideation requires immediate safety measures and may trigger duty to warn/protect obligations.**\n\n**Immediate Actions:**\n• Ensure staff safety — do not interview alone\n• Security at bedside if agitated or threatening\n• Search for weapons per hospital protocol\n• 1:1 observation\n\n**Assessment:**\n• Specificity of target (identified vs. generalized)\n• Specificity of plan\n• Access to weapons\n• History of violence\n• Substance intoxication\n\n**Duty to Warn / Protect (Tarasoff) — State-Specific:**\n• **Mandatory states (~23):** CA, NJ, others — must warn/protect when identifiable target + credible threat\n• **Permissive/discretionary states:** NY, CT, TX, FL, OR — may breach confidentiality but not required\n• **No-duty states:** ME, NC, ND, NV — no Tarasoff obligation\n• **Texas specifically:** *Thapar v. Zezulka* (1999) — Texas Supreme Court declined to adopt a Tarasoff duty. Disclosure is permitted, not mandated.\n• Triggers in mandatory states: explicit, realistic threat against an identifiable victim\n• Discharge the duty by: warning the victim, notifying law enforcement, and/or hospitalizing the patient\n• **Document:** threat content, target, your decision to warn or not, justification, and actions taken\n\n**Consult Psychiatry** for risk assessment and disposition.\n\n**Document:** specific threats made, targets identified, actions taken, and parties notified.',
        recommendation: 'Psychiatric consultation. 1:1 observation. Assess Tarasoff duty. Notify security. Document all threats and actions taken.',
        citation: [1, 5, 7],
    },
    // =====================================================================
    // MODULE 5: INSIGHT, LABS & DISPOSITION
    // =====================================================================
    {
        id: 'psych-insight',
        type: 'info',
        module: 5,
        title: '10. Insight & Judgment',
        body: '**Insight** — the extent to which the patient recognizes and appraises their experiences.\n\n**Levels of Insight:**\n• **Good / Complete** — acknowledges illness, understands need for treatment, willing to engage\n• **Fair / Partial** — acknowledges some symptoms but minimizes severity or attributes to wrong cause\n• **Poor / Limited** — denies illness, blames external factors, resistant to treatment\n• **Absent / None** — no recognition of illness whatsoever\n\n**Key Questions:**\n• Do they have insight into their symptoms and diagnosis?\n• What is their judgment on the problem?\n• Are they willing to work with healthcare professionals?\n• Are they AWARE of potential treatments?\n• Are they ACCEPTING that the problem may be a result of mental illness?\n\n**Judgment** — patient\'s decision-making capacity.\n\n**Judgment Levels:** Good, fair, poor, impaired, inflated.\n\n**Assessment Methods:**\n• "What would you do if you found a stamped, addressed letter on the ground?"\n• "What would you do if you smelled smoke in a crowded theater?"\n• Evaluate recent decisions and their consequences\n• Assess understanding of treatment recommendations\n• Assess problem-solving ability\n\n**Capacity** (4 criteria):\n1. Express a consistent choice\n2. Understand the relevant information\n3. Appreciate how it applies to their situation\n4. Rationally manipulate the information\n\n**Clinical Judgment & Risk Assessment:**\nSynthesize all MSE findings into an overall risk formulation. Consider whether the patient is a danger to self, danger to others, or gravely disabled.\n\n**Example:** "Insight is poor — patient denies any mental health concerns despite florid psychotic symptoms. Judgment impaired as evidenced by inability to plan for basic safety needs."',
        citation: [1, 3, 9, 10],
        next: 'psych-labs',
        summary: 'Insight: good/fair/poor/absent; Judgment: decision-making capacity (4 criteria); synthesize overall risk',
    },
    {
        id: 'psych-labs',
        type: 'info',
        module: 5,
        title: 'Laboratory Considerations',
        body: '**Consider labs to rule out medical contributors to psychiatric symptoms:**\n\n**ACEP Clinical Policy + AAEM Position (consistent in 2024):** Routine laboratory testing — including urine drug screens (Level C) — is **NOT indicated** for the alert, cooperative, asymptomatic adult psychiatric patient. Testing should be driven by history, vital signs, and physical exam findings.\n\n**Low-risk known psychiatric presentation:**\n• Normal vitals, normal exam, similar prior episodes → routine labs are often unnecessary\n• Check glucose and pregnancy test when applicable\n\n**Targeted testing when clinically indicated:**\n• CBC — infection, anemia\n• BMP — electrolytes, glucose, renal function\n• TSH — thyroid symptoms, mood syndrome, unclear cause\n• Urinalysis — urinary symptoms, pregnancy concern, elderly, or delirium concern\n• Urine drug screen / blood alcohol — substance-induced symptoms or intoxication concern\n• B12 and folate — cognitive/mood changes or malnutrition risk\n• LFTs/ammonia — hepatic encephalopathy concern\n• HIV and RPR/VDRL — risk factors, atypical presentation, or local protocol\n• Acetaminophen and salicylate levels — if overdose suspected\n\n**Imaging:**\n• CT head — focal neuro findings, headache/seizure, trauma, delirium features, anticoagulation/immunosuppression, or elderly/late-onset new psychiatric symptoms\n• MRI brain — stable first-break psychosis when structural evaluation is needed and can be non-emergent\n\n**Abnormal findings should prompt medical workup before attributing symptoms to primary psychiatric illness.**\n\n**Environmental Assessment:**\nWhen conducting MSE in the patient\'s home or residential setting, physical surroundings offer clues about cognitive functioning, reality testing, and self-care capacity (hoarding, safety hazards, food availability).',
        citation: [1, 4, 9],
        next: 'psych-disposition',
        summary: 'Labs are targeted by risk; low-risk known psych with normal vitals/exam often does not need routine testing.',
    },
    {
        id: 'psych-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: '**Determine appropriate level of care based on the complete assessment.**\n\n**Your documentation must include:**\n1. Complete medical and psychiatric history\n2. Mental status examination findings (all 10 components)\n3. Initial diagnosis\n4. Evaluation of capacity to respond to treatment\n5. Initial treatment plan\n\n**Use objective and descriptive language.** Avoid vague terms like "seems sad." Instead: "Patient avoided eye contact, sat hunched over, spoke in a low tone."\n\n**Include direct quotes** when describing mood, thought content, or delusions.\n\n**Clearly document any safety concerns** — be specific about what was reported, how risk was assessed, and what actions were taken.\n\n**Consider cultural context** — behavior and communication are influenced by cultural background. What appears to be restricted affect or guardedness may be culturally appropriate.',
        citation: [5, 8, 9],
        options: [
            {
                label: 'Discharge with outpatient follow-up',
                description: 'No acute safety concern, adequate support, safety plan completed',
                next: 'psych-discharge',
            },
            {
                label: 'Voluntary psychiatric admission',
                description: 'Patient agrees to inpatient treatment',
                urgency: 'urgent',
                next: 'psych-admit',
            },
            {
                label: 'Involuntary hold / commitment',
                description: 'Danger to self or others, unable to care for self, refuses voluntary treatment',
                urgency: 'critical',
                next: 'psych-admit',
            },
        ],
        summary: 'Document all 10 MSE components, diagnosis, capacity assessment, treatment plan — use objective language',
    },
    {
        id: 'psych-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge — Outpatient Follow-Up',
        body: '**Discharge Criteria Met:**\n• No active suicidal or homicidal ideation\n• Patient is not acutely intoxicated\n• Adequate support system identified\n• Patient agrees to safety plan\n• Outpatient follow-up arranged\n\n**Discharge Plan:**\n• Safety plan completed and reviewed with patient\n• Means restriction counseling documented\n• Crisis resources provided (**988 Suicide & Crisis Lifeline**)\n• Outpatient psychiatry appointment within 48-72 hours\n• Medication reconciliation if applicable\n• Return precautions reviewed\n\n**Return to ED if:**\n• Worsening suicidal or homicidal thoughts\n• Inability to maintain safety\n• New or worsening psychotic symptoms\n• Medication side effects or adverse reactions',
        recommendation: 'Discharge with safety plan, means restriction counseling, crisis resources, and outpatient psychiatry follow-up within 48-72 hours.',
        citation: [5, 11],
    },
    {
        id: 'psych-admit',
        type: 'result',
        module: 5,
        title: 'Psychiatric Admission',
        body: '**Admission Criteria:**\n• Active suicidal or homicidal ideation with plan/intent\n• Acute psychosis requiring stabilization\n• Inability to care for self (gravely disabled)\n• Failed outpatient management\n• Need for medication adjustment requiring monitoring\n• Substance withdrawal requiring medical management\n\n**Voluntary Admission:**\n• Patient consents to treatment\n• Document capacity to consent\n• Patient retains right to request discharge\n\n**Involuntary Hold:**\n• Criteria vary by state (typically: danger to self, danger to others, gravely disabled)\n• Document specific behaviors and statements supporting criteria\n• Know your state\'s hold duration and process\n• Physician certification required\n\n**Orders:**\n• Admit to psychiatric unit\n• 1:1 or Q15 safety checks as indicated\n• Medications as recommended by psychiatry\n• Diet, activity level\n• Labs if not already obtained\n\n**Document:** clinical reasoning for admission, voluntary vs. involuntary status, patient\'s statements supporting criteria.',
        recommendation: 'Psychiatric admission — voluntary or involuntary per clinical assessment. Document specific safety concerns, legal criteria met, and disposition reasoning.',
        confidence: 'recommended',
        citation: [3, 5],
    },
];
export const PSYCH_ASSESSMENT_NODE_COUNT = PSYCH_ASSESSMENT_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const PSYCH_ASSESSMENT_MODULE_LABELS = [
    'History & Presentation',
    'Behavior, Speech & Emotions',
    'Thought, Perception & Cognition',
    'Safety Assessment',
    'Insight, Labs & Disposition',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const PSYCH_ASSESSMENT_CITATIONS = [
    { num: 1, text: 'Wiley AT, Dreher JW, London JD. Mental Status Examination in Primary Care. Am Fam Physician. 2024;109(1):51-60. PMID: 38227871. Scope: narrative review of MSE technique in the primary care setting; supports MSE component description and documentation, NOT emergency department suicide-risk protocol, laboratory policy, or duty-to-warn law.' },
    { num: 2, text: 'Snyderman D, Rovner B. Mental status exam in primary care: a review. Am Fam Physician. 2009;80(8):809-14. PMID: 19835342.' },
    { num: 3, text: 'Bourgeois JA, Tiamson-Kassab M, Sheehan KA, Robinson D, Zein M. Resource Document on Decisional Capacity Determinations in Consultation-Liaison Psychiatry: A Guide for the General Psychiatrist. American Psychiatric Association Council on Consultation-Liaison Psychiatry; approved June 2019. No PMID/DOI (APA resource document). https://www.psychiatry.org/psychiatrists/search-directories-databases/resource-documents/2019/decisional-capacity-determinations-in-consultation' },
    { num: 4, text: 'Park LT, Zarate CA Jr. Depression in the Primary Care Setting. N Engl J Med. 2019;380(6):559-568. PMID: 30726688. doi:10.1056/NEJMcp1712493' },
    { num: 5, text: 'American College of Surgeons Committee on Trauma. Best Practices Guidelines: Screening and Intervention for Mental Health Disorders and Substance Use and Misuse in the Acute Trauma Patient. Expert panel co-led by Brasel KJ and deRoon-Cassini TA. Chicago, IL: American College of Surgeons; 2022 (released January 2023). No PMID/DOI (institutional guideline). https://www.facs.org/media/nrcj31ku/mental-health-guidelines.pdf — Scope: acute TRAUMA population screening and intervention. It does not address emergency department psychiatric disposition criteria, involuntary commitment, or duty-to-warn obligations; do not treat it as the basis for those recommendations.' },
    { num: 6, text: 'Norris D, Clark MS, Shipley S. The Mental Status Examination. Am Fam Physician. 2016;94(8):635-641. PMID: 27929229.' },
    { num: 7, text: 'Veauthier B, Hornecker JR, Thrasher T. Recent-Onset Altered Mental Status: Evaluation and Management. Am Fam Physician. 2021;104(5):461-470. PMID: 34783500. Scope: evaluation of altered mental status; supports organic workup, not suicide or homicide risk management.' },
    { num: 8, text: 'American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR). Washington, DC: American Psychiatric Association Publishing; 2022. ISBN 978-0-89042-576-3 (paperback). doi:10.1176/appi.books.9780890425787' },
    { num: 9, text: 'Boyles O. Mental Status Exam Cheat Sheet + Examples and Templates. ICANotes Behavioral Health EHR; published 31 March 2021. https://www.icanotes.com/2021/03/31/mental-status-exam-cheat-sheet/ — EVIDENCE QUALITY: non-peer-reviewed educational content published by a commercial EHR vendor. Cited only as the source of descriptive MSE terminology and documentation templates. It is NOT an evidence basis for any clinical recommendation, threshold, or disposition decision in this consult.' },
    { num: 10, text: 'Hufton F. Ten Point Guide to Mental State Examination (MSE) in Psychiatry. Psych Scene Hub; 2020. https://psychscenehub.com/psychinsights/ten-point-guide-to-mental-state-examination-mse-in-psychiatry/ — EVIDENCE QUALITY: non-peer-reviewed educational infographic authored by a student mental health nurse. Cited only for descriptive MSE terminology. NOT an evidence basis for any clinical recommendation or threshold.' },
    { num: 11, text: 'Stanley B, Brown GK, Brenner LA, et al. Comparison of the Safety Planning Intervention With Follow-up vs Usual Care of Suicidal Patients Treated in the Emergency Department. JAMA Psychiatry. 2018;75(9):894-900. PMID: 29998307. doi:10.1001/jamapsychiatry.2018.1776 — Design: non-randomised cohort comparison across 9 Veterans Health Administration EDs (n=1640; 88.5% men, mean age 47), not a randomised controlled trial.' },
    { num: 12, text: 'American College of Emergency Physicians Clinical Policies Subcommittee (Writing Committee) on the Adult Psychiatric Patient; Nazarian DJ, Broder JS, Thiessen MEW, Wilson MP, Zun LS, Brown MD. Clinical Policy: Critical Issues in the Diagnosis and Management of the Adult Psychiatric Patient in the Emergency Department. Ann Emerg Med. 2017;69(4):480-498. PMID: 28335913. doi:10.1016/j.annemergmed.2017.01.036 — This 2017 policy SUPERSEDES the 2006 ACEP policy (Lukens TW, et al. Ann Emerg Med. 2006;47(1):79-99. PMID: 16387222) and is the current ACEP policy on the adult psychiatric patient.' },
    { num: 13, text: 'Posner K, Brown GK, Stanley B, et al. The Columbia-Suicide Severity Rating Scale: initial validity and internal consistency findings from three multisite studies with adolescents and adults. Am J Psychiatry. 2011;168(12):1266-77. PMID: 22193671. doi:10.1176/appi.ajp.2011.10111704' },
    { num: 14, text: 'The Joint Commission. National Patient Safety Goal 15.01.01 — reduce the risk for suicide (7 elements of performance, effective 1 July 2019). R3 Report Issue 18, published 20 November 2019, updated 3 December 2025. https://www.jointcommission.org/en-us/standards/r3-report/r3-report-18 — DESIGNATION NOTE: effective 1 January 2026 this requirement moved into the new National Performance Goals chapter for hospitals and critical access hospitals and is designated NPG.08.01.01. NPSG.15.01.01 remains the correct designation for behavioral health care and human services programs.' },
    { num: 15, text: 'Anderson EL, Nordstrom K, Wilson MP, et al. American Association for Emergency Psychiatry Task Force on Medical Clearance of Adults Part I: Introduction, Review and Evidence-Based Guidelines. West J Emerg Med. 2017;18(2):235-242. PMID: 28210358. doi:10.5811/westjem.2016.10.32258' },
    { num: 16, text: 'Wilson MP, Nordstrom K, Anderson EL, et al. American Association for Emergency Psychiatry Task Force on Medical Clearance of Adult Psychiatric Patients. Part II: Controversies over Medical Assessment, and Consensus Recommendations. West J Emerg Med. 2017;18(4):640-646. PMID: 28611885. doi:10.5811/westjem.2017.3.32259' },
    { num: 17, text: 'Srivastava A, Nair R. Utility of Investigations, History, and Physical Examination in "Medical Clearance" of Psychiatric Patients: A Meta-Analysis. Psychiatr Serv. 2022;73(10):1140-1152. PMID: 35734861. doi:10.1176/appi.ps.202000858 — Pooled yield of investigations 1.1% (95% CI 0.5-2.2%) vs history 15.6% and physical examination 14.9%.' },
    { num: 18, text: 'American Academy of Emergency Medicine. Position Statement: Routine Laboratory Testing of Psychiatric Patients in the Emergency Department is Unnecessary. Approved 21 August 2014; supported by the American Association for Emergency Psychiatry. https://www.aaem.org/statements/routine-laboratory-testing-of-psychiatric-patients-in-the-emergency-department-is-unnecessary/' },
    { num: 19, text: 'Appelbaum PS. Clinical practice. Assessment of patients\' competence to consent to treatment. N Engl J Med. 2007;357(18):1834-40. PMID: 17978292. doi:10.1056/NEJMcp074045 — Primary source for the four-element capacity standard (communicate a choice, understand, appreciate, reason).' },
    { num: 20, text: 'Folstein MF, Folstein SE, McHugh PR. "Mini-mental state": a practical method for grading the cognitive state of patients for the clinician. J Psychiatr Res. 1975;12(3):189-98. PMID: 1202204. doi:10.1016/0022-3956(75)90026-6' },
    { num: 21, text: 'Nasreddine ZS, Phillips NA, Bedirian V, et al. The Montreal Cognitive Assessment, MoCA: a brief screening tool for mild cognitive impairment. J Am Geriatr Soc. 2005;53(4):695-9. PMID: 15817019. doi:10.1111/j.1532-5415.2005.53221.x' },
    { num: 22, text: 'Duty to warn / protect authorities: Tarasoff v. Regents of the University of California, 17 Cal.3d 425, 551 P.2d 334 (Cal. 1976); Thapar v. Zezulka, 994 S.W.2d 635 (Tex. 1999) (Supreme Court of Texas, decided 24 June 1999, Enoch J., declined to recognise a common-law duty to warn because the Texas mental-health confidentiality statute makes such a duty unwise); National Conference of State Legislatures, Mental Health Professionals\' Duty to Warn, https://www.ncsl.org/health/mental-health-professionals-duty-to-warn (last substantively updated 2022). No PMID/DOI (case law and legislative tracking). CURRENCY WARNING: state duty-to-warn statutes change frequently, particularly regarding firearms access. Verify the current statute in your jurisdiction before relying on any state classification.' },
    { num: 23, text: 'Miller IW, Camargo CA Jr, Arias SA, et al. Suicide Prevention in an Emergency Department Population: The ED-SAFE Study. JAMA Psychiatry. 2017;74(6):563-570. PMID: 28456130. doi:10.1001/jamapsychiatry.2017.0678' },
    { num: 24, text: 'Chung DT, Ryan CJ, Hadzi-Pavlovic D, et al. Suicide Rates After Discharge From Psychiatric Facilities: A Systematic Review and Meta-analysis. JAMA Psychiatry. 2017;74(7):694-702. PMID: 28564699. doi:10.1001/jamapsychiatry.2017.1044 — Basis for treating recent discharge from a psychiatric facility as a high-risk period.' },
    { num: 25, text: 'American Medical Association. Current Procedural Terminology (CPT) code 90792, Psychiatric diagnostic evaluation with medical services. AMA CPT Professional Edition. Chicago, IL: American Medical Association. No PMID/DOI (proprietary code set). https://www.ama-assn.org/topics/cpt-codes — Billing/documentation requirement, not a clinical evidence source.' },
];
