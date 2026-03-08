// MedKitt — Psychiatric Assessment
// History → General Observations → Mood/Affect/Speech → Thought/Cognition → Safety → Disposition
// 4 modules: History & General → Mood, Affect & Speech → Thought & Cognition → Safety & Disposition
// 16 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PSYCH_ASSESSMENT_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: HISTORY & GENERAL OBSERVATIONS
  // =====================================================================

  {
    id: 'psych-start',
    type: 'info',
    module: 1,
    title: 'Psychiatric Assessment — Overview',
    body: 'A **comprehensive psychiatric assessment** follows a structured format including both historical information and a systematic mental status examination.\n\nDocumentation must be **thorough, organized, and include both subjective patient reports and objective clinical observations**.\n\n**Components of this assessment:**\n• History taking (HPI, PMH, psychiatric history, meds, substances)\n• General observations (appearance, behavior, motor)\n• Mood and affect\n• Speech and language\n• Thought process and content\n• Cognition (orientation, attention, memory)\n• Safety assessment (SI/HI)\n• Insight and judgment\n• Labs and disposition',
    citation: [1, 2],
    next: 'psych-history',
  },

  {
    id: 'psych-history',
    type: 'info',
    module: 1,
    title: 'History Taking',
    body: '**Presenting Complaint:**\n• Chief complaint in patient\'s own words\n• Onset, duration, and course of current symptoms\n• Precipitating events or stressors\n\n**Psychiatric History:**\n• Previous psychiatric diagnoses\n• Prior hospitalizations (voluntary vs. involuntary)\n• Previous treatments and response\n• History of self-harm or suicide attempts\n\n**Medication History:**\n• Current psychotropic medications (dose, duration, adherence)\n• Previous medication trials and why discontinued\n• Over-the-counter and herbal supplements\n\n**Substance Use:**\n• Alcohol — type, quantity, frequency, last use\n• Illicit drugs — type, route, frequency, last use\n• Tobacco/nicotine, caffeine\n• History of withdrawal symptoms or DTs\n\n**Medical History:**\n• Relevant medical conditions (thyroid, neurologic, metabolic)\n• Recent head trauma or seizures\n• Current medical medications\n\n**Family Psychiatric History:**\n• Psychiatric diagnoses in first-degree relatives\n• Family history of suicide or substance use\n\n**Social History:**\n• Living situation, employment, relationships\n• Support system, legal issues\n• Collateral information from family/providers when available',
    citation: [3, 4, 5],
    next: 'psych-appearance',
  },

  {
    id: 'psych-appearance',
    type: 'question',
    module: 1,
    title: 'General Observations',
    body: '**Appearance:**\n• Level of cleanliness, grooming, hygiene\n• Manner of dress (appropriate, disheveled, bizarre)\n• Distinguishing features, visible injuries\n• Apparent age vs. stated age\n• Body habitus, nutritional status\n\n**Behavior:**\n• Eye contact — good, fleeting, intense, avoidant\n• Interpersonal style — cooperative, guarded, hostile, withdrawn, seductive\n• Psychomotor activity — normal, agitated, retarded, catatonic\n• Abnormal movements — tremor, tics, tardive dyskinesia, akathisia\n• Facial expressions — appropriate, flat, incongruent\n• Posture — relaxed, tense, slumped\n\n**Document findings, then proceed to mood assessment.**',
    citation: [1],
    options: [
      {
        label: 'Observations complete — proceed',
        description: 'General observations documented',
        next: 'psych-mood',
      },
      {
        label: 'Acute agitation / safety concern',
        description: 'Patient is acutely agitated, combative, or poses immediate risk',
        urgency: 'critical',
        next: 'psych-safety',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: MOOD, AFFECT & SPEECH
  // =====================================================================

  {
    id: 'psych-mood',
    type: 'info',
    module: 2,
    title: 'Mood Assessment',
    body: '**Mood** — the patient\'s **subjective** report of their emotional state.\n\n**Ask the patient:**\n• "How is your mood today?"\n• "How have you been feeling lately?"\n• "Have you felt sad or discouraged?"\n• "Have you been feeling anxious or worried?"\n\n**Document in patient\'s own words** (in quotes).\n\n**Common descriptors:**\n• Euthymic (normal), dysphoric (sad), irritable, anxious\n• Euphoric, angry, fearful, hopeless, apathetic\n\n**Key distinction:** Mood is what the patient *tells you* they feel. Affect is what you *observe*.',
    citation: [1, 6],
    next: 'psych-affect',
  },

  {
    id: 'psych-affect',
    type: 'info',
    module: 2,
    title: 'Affect Assessment',
    body: '**Affect** — the clinician\'s **objective** observation of the patient\'s emotional state.\n\n**Assess and document:**\n\n**Range:**\n• Full / broad (normal variation)\n• Restricted / constricted (reduced variation)\n• Flat (absent emotional expression)\n\n**Intensity:**\n• Normal, blunted, exaggerated\n\n**Stability:**\n• Stable vs. labile (rapidly shifting)\n\n**Congruence:**\n• Mood-congruent (affect matches stated mood)\n• Mood-incongruent (laughing while describing sadness)\n\n**Appropriateness:**\n• Appropriate to content of discussion\n• Inappropriate (affect mismatches topic)\n\n**Example documentation:**\n"Affect is restricted in range, blunted in intensity, mood-congruent, and appropriate to content."',
    citation: [1, 6],
    next: 'psych-speech',
  },

  {
    id: 'psych-speech',
    type: 'info',
    module: 2,
    title: 'Speech & Language',
    body: '**Assess speech characteristics:**\n\n**Rate:**\n• Normal (approximately 100+ words/minute)\n• Rapid / pressured (may indicate mania)\n• Slow / hesitant (may indicate depression)\n\n**Rhythm:**\n• Normal prosody\n• Monotone, stuttering, dysarthric\n\n**Volume:**\n• Normal, loud, soft, whispered\n\n**Quantity:**\n• Normal, talkative/verbose, poverty of speech\n• Spontaneous vs. only responsive to questions\n\n**Tone:**\n• Normal, angry, whiny, anxious\n\n**Latency:**\n• Normal response time\n• Increased latency (delayed responses — seen in depression, thought blocking)\n\n**Articulation:**\n• Clear vs. slurred, mumbling\n\n**Example documentation:**\n"Speech is slow in rate, low in volume, with increased latency. Normal articulation. Poverty of speech noted."',
    citation: [1, 6],
    next: 'psych-thought-process',
  },

  // =====================================================================
  // MODULE 3: THOUGHT & COGNITION
  // =====================================================================

  {
    id: 'psych-thought-process',
    type: 'info',
    module: 3,
    title: 'Thought Process',
    body: '**Thought process** — the *form* and *flow* of thinking (HOW the patient thinks).\n\n**Assess and document:**\n\n**Linear / goal-directed** — thoughts connect logically (normal)\n\n**Abnormal thought processes:**\n• **Circumstantial** — reaches the point but via excessive detail\n• **Tangential** — wanders off topic, never reaches the point\n• **Loose associations** — unrelated ideas shift without logic\n• **Flight of ideas** — rapid shifting between loosely connected topics\n• **Thought blocking** — abrupt interruption mid-sentence\n• **Perseveration** — repetitive return to same idea\n• **Clang associations** — connections based on sound, not meaning\n• **Word salad** — incoherent, random words without structure\n• **Neologisms** — made-up words\n\n**Example documentation:**\n"Thought process is tangential with loose associations. Patient unable to maintain goal-directed conversation."',
    citation: [1, 6],
    next: 'psych-thought-content',
  },

  {
    id: 'psych-thought-content',
    type: 'info',
    module: 3,
    title: 'Thought Content',
    body: '**Thought content** — WHAT the patient is thinking about.\n\n**Assess for the following:**\n\n**Delusions** (fixed false beliefs):\n• Paranoid — persecutory, being watched/followed\n• Grandiose — inflated self-importance or abilities\n• Somatic — false beliefs about body\n• Referential — events/media directed at them\n• Erotomanic — belief someone is in love with them\n\n**Hallucinations** (perceptions without stimulus):\n• Auditory — command vs. non-command (document content)\n• Visual, tactile, olfactory, gustatory\n• Ask: "Do you see or hear things others don\'t?"\n\n**Other abnormal content:**\n• Obsessions — intrusive, unwanted thoughts\n• Compulsions — repetitive behaviors\n• Phobias — specific fears\n• Ideas of reference\n• Thought broadcasting, insertion, or withdrawal\n\n**Suicidal/homicidal ideation is assessed in the Safety module.**',
    citation: [1, 6],
    next: 'psych-cognition',
  },

  {
    id: 'psych-cognition',
    type: 'info',
    module: 3,
    title: 'Cognitive Assessment',
    body: '**Orientation:**\n• Person — "What is your name?"\n• Place — "Where are you right now?"\n• Time — "What year/month/day is it?"\n• Situation — "Why are you here today?"\n\n**Attention & Concentration:**\n• Serial 7s (100, 93, 86, 79, 72...)\n• Spell "WORLD" backward\n• Days of the week backward\n\n**Memory:**\n• **Immediate** — repeat 3 words (apple, table, penny)\n• **Short-term** — recall those 3 words after 5 minutes\n• **Long-term** — biographical facts (birthday, address)\n\n**Executive Function:**\n• Clock drawing test (draw clock, set to 10:10)\n• Trail-Making Test (A1, B2, C3, D4...)\n• Similarities ("How are an apple and orange alike?")\n• Proverb interpretation ("A stitch in time saves nine")\n\n**Language:**\n• Naming — point to common objects\n• Comprehension — follow multi-step commands\n• Repetition — "No ifs, ands, or buts"\n\n**Visuospatial:**\n• Copy intersecting pentagons\n• Draw a three-dimensional cube\n\n**Abnormal findings should prompt consideration of reversible causes:** hypothyroidism, B12 deficiency, infections, medications (beta-blockers, steroids, anticholinergics), substance use.',
    citation: [1, 4, 6],
    next: 'psych-safety',
  },

  // =====================================================================
  // MODULE 4: SAFETY & DISPOSITION
  // =====================================================================

  {
    id: 'psych-safety',
    type: 'question',
    module: 4,
    title: 'Safety Assessment',
    body: '**Suicidal Ideation — ask directly:**\n• "Do you feel that life is not worth living?"\n• "Have you had thoughts of hurting yourself?"\n• "Have you thought about killing yourself?"\n• "Do you have a plan? Do you have the means?"\n• "Have you ever attempted suicide before?"\n\n**Homicidal Ideation — ask directly:**\n• "Have you had thoughts of hurting anyone else?"\n• "Is there anyone you feel angry enough to harm?"\n• "Do you have a plan or access to weapons?"\n\n**Risk factors for suicide:**\n• Previous attempts (strongest predictor)\n• Access to lethal means (firearms)\n• Recent losses, social isolation\n• Substance use, chronic pain\n• Male sex, older age, psychiatric diagnosis\n\n**Protective factors:**\n• Social support, children at home\n• Future orientation, religious beliefs\n• Therapeutic alliance, treatment engagement',
    citation: [1, 7],
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
    body: '**Passive SI** — patient expresses desire to be dead or not alive but denies active plan or intent.\n\n**Further assessment:**\n• Frequency and duration of thoughts\n• Any preparatory behaviors (giving away possessions, writing notes)\n• Access to means — **ask specifically about firearms**\n• Substance use (acutely increases risk)\n• Recent changes in behavior or functioning\n\n**Disposition considerations:**\n• Safety planning — collaborate with patient\n• Means restriction counseling\n• Outpatient psychiatric follow-up within 48-72 hours\n• Crisis hotline numbers (988 Suicide & Crisis Lifeline)\n• Consider social work consult\n• Discharge may be appropriate if patient is **not intoxicated, has support system, agrees to safety plan, and can contract for safety**\n\n**Document:** risk factors, protective factors, safety plan, and clinical reasoning for disposition.',
    citation: [1, 7],
    next: 'psych-insight',
  },

  {
    id: 'psych-si-active',
    type: 'result',
    module: 4,
    title: 'Active Suicidal Ideation — Psych Emergency',
    body: '**Active SI with plan or intent requires immediate intervention.**\n\n**Immediate actions:**\n• 1:1 sitter / continuous observation\n• Remove all potential means (sharps, cords, medications)\n• Place patient in safe environment (ligature-resistant room)\n• Voluntary vs. involuntary hold based on jurisdiction\n\n**Consult psychiatry** for:\n• Risk assessment and safety planning\n• Medication evaluation\n• Inpatient admission recommendation\n• Voluntary vs. involuntary commitment determination\n\n**Labs to consider:**\n• Urine drug screen, blood alcohol\n• TSH, CBC, BMP (rule out medical contributors)\n• Acetaminophen/salicylate levels if ingestion suspected\n\n**Documentation must include:**\n• Specific ideation content (in patient\'s own words)\n• Presence/absence of plan and means\n• Risk factors and protective factors\n• Disposition rationale\n• Who was consulted',
    recommendation: 'Psychiatric consultation. 1:1 observation. Means restriction. Consider voluntary vs. involuntary hold. Inpatient admission likely indicated.',
    citation: [1, 5, 7],
  },

  {
    id: 'psych-hi',
    type: 'result',
    module: 4,
    title: 'Homicidal Ideation — Safety Protocol',
    body: '**Homicidal ideation requires immediate safety measures and may trigger duty to warn/protect obligations.**\n\n**Immediate actions:**\n• Ensure staff safety — do not interview alone\n• Security at bedside if agitated or threatening\n• Search for weapons per hospital protocol\n• 1:1 observation\n\n**Assessment:**\n• Specificity of target (identified vs. generalized)\n• Specificity of plan\n• Access to weapons\n• History of violence\n• Substance intoxication\n\n**Duty to warn / Tarasoff obligations:**\n• Varies by state — know your jurisdiction\n• Generally required when there is an **identifiable target** and **credible threat**\n• Document notification of intended victim and/or law enforcement\n\n**Consult psychiatry** for risk assessment and disposition.\n\n**Document:** specific threats made, targets identified, actions taken, and parties notified.',
    recommendation: 'Psychiatric consultation. 1:1 observation. Assess Tarasoff duty. Notify security. Document all threats and actions taken.',
    citation: [1, 5, 7],
  },

  {
    id: 'psych-insight',
    type: 'info',
    module: 4,
    title: 'Insight & Judgment',
    body: '**Insight** — patient\'s awareness and understanding of their illness.\n\n**Levels of insight:**\n• **Good** — acknowledges illness, understands need for treatment\n• **Partial** — acknowledges some symptoms but minimizes severity\n• **Poor** — denies illness, attributes symptoms to external causes\n• **Absent** — no recognition of illness\n\n**Judgment** — patient\'s decision-making capacity and ability to respond to treatment.\n\n**Assess with:**\n• "What would you do if you found a stamped, addressed letter on the ground?"\n• "What would you do if you smelled smoke in a crowded theater?"\n• Evaluate recent decisions and their consequences\n• Assess understanding of treatment recommendations\n\n**Capacity** — can the patient:\n1. Express a consistent choice?\n2. Understand the relevant information?\n3. Appreciate how it applies to their situation?\n4. Rationally manipulate the information?',
    citation: [1, 3],
    next: 'psych-labs',
  },

  {
    id: 'psych-labs',
    type: 'info',
    module: 4,
    title: 'Laboratory Considerations',
    body: '**Consider labs to rule out medical contributors to psychiatric symptoms:**\n\n**Routine:**\n• CBC — infection, anemia\n• BMP — electrolytes, glucose, renal function\n• TSH — hypothyroidism / hyperthyroidism\n• Urinalysis — UTI (especially elderly)\n\n**As clinically indicated:**\n• Urine drug screen — substance-induced symptoms\n• Blood alcohol level\n• B12 and folate — deficiency causes cognitive/mood changes\n• LFTs — hepatic encephalopathy\n• HIV testing\n• RPR/VDRL — neurosyphilis\n• Lyme titer (endemic areas)\n• Ammonia level\n• Acetaminophen and salicylate levels (if overdose suspected)\n\n**Imaging:**\n• CT head — if first psychotic break, focal neuro findings, trauma, or elderly new-onset symptoms\n\n**Abnormal findings should prompt medical workup before attributing symptoms to primary psychiatric illness.**',
    citation: [1, 4],
    next: 'psych-disposition',
  },

  {
    id: 'psych-disposition',
    type: 'question',
    module: 4,
    title: 'Disposition',
    body: '**Determine appropriate level of care based on the complete assessment.**\n\n**Documentation for psychiatric evaluation (CPT 90792) must include:**\n1. Complete medical and psychiatric history\n2. Mental status examination findings\n3. Initial diagnosis\n4. Evaluation of capacity to respond to treatment\n5. Initial treatment plan\n\n**APA recommends using cross-cutting symptom measures** for systematic assessment of 13 symptom domains to support measurement-based care.',
    citation: [5, 8],
    options: [
      {
        label: 'Discharge with outpatient follow-up',
        description: 'No acute safety concern, adequate support, able to contract for safety',
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
  },

  {
    id: 'psych-discharge',
    type: 'result',
    module: 4,
    title: 'Discharge — Outpatient Follow-Up',
    body: '**Discharge criteria met:**\n• No active suicidal or homicidal ideation\n• Patient is not acutely intoxicated\n• Adequate support system identified\n• Patient agrees to safety plan\n• Outpatient follow-up arranged\n\n**Discharge plan:**\n• Safety plan completed and reviewed with patient\n• Means restriction counseling documented\n• Crisis resources provided (988 Suicide & Crisis Lifeline)\n• Outpatient psychiatry appointment within 48-72 hours\n• Medication reconciliation if applicable\n• Return precautions reviewed\n\n**Return to ED if:**\n• Worsening suicidal or homicidal thoughts\n• Inability to maintain safety\n• New or worsening psychotic symptoms\n• Medication side effects or adverse reactions',
    recommendation: 'Discharge with safety plan, means restriction counseling, crisis resources, and outpatient psychiatry follow-up within 48-72 hours.',
    citation: [5, 7],
  },

  {
    id: 'psych-admit',
    type: 'result',
    module: 4,
    title: 'Psychiatric Admission',
    body: '**Admission criteria:**\n• Active suicidal or homicidal ideation with plan/intent\n• Acute psychosis requiring stabilization\n• Inability to care for self (gravely disabled)\n• Failed outpatient management\n• Need for medication adjustment requiring monitoring\n• Substance withdrawal requiring medical management\n\n**Voluntary admission:**\n• Patient consents to treatment\n• Document capacity to consent\n• Patient retains right to request discharge\n\n**Involuntary hold:**\n• Criteria vary by state (typically: danger to self, danger to others, gravely disabled)\n• Document specific behaviors and statements supporting criteria\n• Know your state\'s hold duration and process\n• Physician certification required\n\n**Orders:**\n• Admit to psychiatric unit\n• 1:1 or Q15 safety checks as indicated\n• Medications as recommended by psychiatry\n• Diet, activity level\n• Labs if not already obtained\n\n**Document:** clinical reasoning for admission, voluntary vs. involuntary status, patient\'s statements supporting criteria.',
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
  'History & General',
  'Mood, Affect & Speech',
  'Thought & Cognition',
  'Safety & Disposition',
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
];
