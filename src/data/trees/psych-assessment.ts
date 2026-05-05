// MedKitt — Psychiatric Assessment (Mental Status Examination)
// History → Appearance → Behavior → Speech → Mood → Affect → Thought Process →
// Thought Content/Perception → Cognition → Safety → Insight/Judgment → Labs → Disposition
// 5 modules: History & Presentation → Behavior, Speech & Emotions →
//            Thought, Perception & Cognition → Safety Assessment → Insight, Labs & Disposition
// 19 nodes total. Standard 10-component MSE flow.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

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

export const PSYCH_ASSESSMENT_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: HISTORY & PRESENTATION
  // =====================================================================

  {
    id: 'psych-start',
    type: 'info',
    module: 1,
    title: 'Psychiatric Assessment — Overview',
    body: 'A **comprehensive psychiatric assessment** follows a structured format including both historical information and a systematic **Mental Status Examination (MSE)**.\n\nThe MSE is a structured way to assess and document a patient\'s current cognitive, behavioral, and emotional functioning. Unlike the MMSE (cognitive screening), the MSE offers a **broader view** of the patient\'s psychological state during a specific encounter.\n\n**10 Components of the MSE:**\n1. Appearance\n2. Behavior\n3. Speech & Language\n4. Mood (subjective)\n5. Affect (objective)\n6. Thought Process\n7. Thought Content & Perception\n8. Suicidal / Homicidal Risk\n9. Cognition\n10. Insight & Judgment\n\n**Documentation for CPT 90792 must include:**\n• Complete medical and psychiatric history\n• Mental status examination findings\n• Initial diagnosis\n• Evaluation of capacity to respond to treatment\n• Initial treatment plan',
    citation: [1, 2, 9],
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
    body: '**Suicidal Ideation — ask directly:**\n• "Do you feel that life is not worth living?"\n• "Have you had thoughts of hurting yourself?"\n• "Have you thought about killing yourself?"\n• "Do you have a plan? Do you have the means?"\n• "Have you ever attempted suicide before?"\n\nConsider using the **Columbia Suicide Severity Rating Scale (C-SSRS)** for structured screening.\n\n**Homicidal Ideation — ask directly:**\n• "Have you had thoughts of hurting anyone else?"\n• "Is there anyone you feel angry enough to harm?"\n• "Do you have a plan or access to weapons?"\n\n**Risk Factors for Suicide:**\n• Previous attempts (strongest predictor)\n• Access to lethal means — **ask specifically about firearms**\n• Recent losses, social isolation\n• Substance use, chronic pain\n• Male sex, older age, psychiatric diagnosis\n• Recent ED visits, recent discharge from psychiatric facility\n\n**Protective Factors:**\n• Social support, children at home\n• Future orientation, religious beliefs\n• Therapeutic alliance, treatment engagement\n\n**Descriptors:** Not suicidal, passive ideation, active ideation with/without plan, intent reported, homicidal intent reported.',
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
    body: '**Passive SI** — patient expresses desire to be dead or not alive but denies active plan or intent.\n\n**Further Assessment:**\n• Frequency and duration of thoughts\n• Any preparatory behaviors (giving away possessions, writing notes)\n• Access to means — **ask specifically about firearms**\n• Substance use (acutely increases risk)\n• Recent changes in behavior or functioning\n\n**Safety Planning (Stanley-Brown Model):**\n1. Warning signs that a crisis is developing\n2. Internal coping strategies\n3. People and social settings that provide distraction\n4. People to contact for help\n5. Professionals and agencies to contact\n6. Making the environment safe (lethal means counseling)\n\n**Disposition Considerations:**\n• Means restriction counseling (document specifically)\n• Outpatient psychiatric follow-up within 48-72 hours\n• Crisis resources: **988 Suicide & Crisis Lifeline**\n• Consider social work consult\n• Discharge may be appropriate if patient is **not intoxicated, has a support system, completes a collaborative safety plan, has lethal means addressed, and has reliable follow-up**\n\n**Document:** risk factors, protective factors, safety plan, lethal means counseling, and clinical reasoning for disposition.',
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
    body: '**Homicidal ideation requires immediate safety measures and may trigger duty to warn/protect obligations.**\n\n**Immediate Actions:**\n• Ensure staff safety — do not interview alone\n• Security at bedside if agitated or threatening\n• Search for weapons per hospital protocol\n• 1:1 observation\n\n**Assessment:**\n• Specificity of target (identified vs. generalized)\n• Specificity of plan\n• Access to weapons\n• History of violence\n• Substance intoxication\n\n**Duty to Warn / Tarasoff Obligations:**\n• Varies by state — know your jurisdiction\n• Generally required when there is an **identifiable target** and **credible threat**\n• Document notification of intended victim and/or law enforcement\n\n**Consult Psychiatry** for risk assessment and disposition.\n\n**Document:** specific threats made, targets identified, actions taken, and parties notified.',
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
    body: '**Consider labs to rule out medical contributors to psychiatric symptoms:**\n\n**Low-risk known psychiatric presentation:**\n• Normal vitals, normal exam, similar prior episodes → routine labs are often unnecessary\n• Check glucose and pregnancy test when applicable\n\n**Targeted testing when clinically indicated:**\n• CBC — infection, anemia\n• BMP — electrolytes, glucose, renal function\n• TSH — thyroid symptoms, mood syndrome, unclear cause\n• Urinalysis — urinary symptoms, pregnancy concern, elderly, or delirium concern\n• Urine drug screen / blood alcohol — substance-induced symptoms or intoxication concern\n• B12 and folate — cognitive/mood changes or malnutrition risk\n• LFTs/ammonia — hepatic encephalopathy concern\n• HIV and RPR/VDRL — risk factors, atypical presentation, or local protocol\n• Acetaminophen and salicylate levels — if overdose suspected\n\n**Imaging:**\n• CT head — focal neuro findings, headache/seizure, trauma, delirium features, anticoagulation/immunosuppression, or elderly/late-onset new psychiatric symptoms\n• MRI brain — stable first-break psychosis when structural evaluation is needed and can be non-emergent\n\n**Abnormal findings should prompt medical workup before attributing symptoms to primary psychiatric illness.**\n\n**Environmental Assessment:**\nWhen conducting MSE in the patient\'s home or residential setting, physical surroundings offer clues about cognitive functioning, reality testing, and self-care capacity (hoarding, safety hazards, food availability).',
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

export const PSYCH_ASSESSMENT_CITATIONS: Citation[] = [
  { num: 1, text: 'Wiley AT, Dreher JW, London JD. Mental Status Examination in Primary Care. American Family Physician. 2024;109(1):51-60.' },
  { num: 2, text: 'Snyderman D, Rovner B. Mental Status Exam in Primary Care: A Review. American Family Physician. 2009;80(8):809-14.' },
  { num: 3, text: 'Bourgeois JA, Tiamson-Kassab M, Sheehan KA, Robinson D, Zein M. Resource Document on the Decisional Capacity Determinations in Consultation-Liaison Psychiatry. American Psychiatric Association. 2019.' },
  { num: 4, text: 'Park LT, Zarate CA. Depression in the Primary Care Setting. N Engl J Med. 2019;380(6):559-568.' },
  { num: 5, text: 'Brasel KJ, deRoon-Cassini TA, Bernard A, et al. Best Practices Guidelines: Screening and Intervention for Mental Health Disorders and Substance Use and Misuse in the Acute Trauma Patient. American College of Surgeons. 2022.' },
  { num: 6, text: 'Norris D, Clark MS, Shipley S. The Mental Status Examination. American Family Physician. 2016;94(8):635-641.' },
  { num: 7, text: 'Veauthier B, Hornecker JR, Thrasher T. Recent-Onset Altered Mental Status: Evaluation and Management. American Family Physician. 2021;104(5):461-470.' },
  { num: 8, text: 'American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders. 5th ed, Text Revision. 2022.' },
  { num: 9, text: 'Boyles O. Mental Status Exam Cheat Sheet + Examples and Templates. ICANotes Behavioral Health EHR. 2024.' },
  { num: 10, text: 'Hufton F. The Mental Status Examination Visual Guide. PsychSceneHub. 2023.' },
  { num: 11, text: 'Stanley B, Brown GK, Brenner LA, et al. Comparison of the Safety Planning Intervention With Follow-up vs Usual Care of Suicidal Patients Treated in the Emergency Department. JAMA Psychiatry. 2018;75(9):894-900.' },
];
