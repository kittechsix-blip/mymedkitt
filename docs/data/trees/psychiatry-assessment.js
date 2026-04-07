// MedKitt — Psychiatry Assessment (MSE Dictation Guide)
// Structured Mental Status Exam walkthrough for documentation.
// 6 modules: Start → Appearance & Behavior → Speech & Mood/Affect → Thought Process & Content → Perceptions & Cognition → Insight, Judgment & Risk
// 7 nodes total.
export const PSYCHIATRY_ASSESSMENT_CRITICAL_ACTIONS = [
    { text: 'Active SI with plan and intent = high risk requiring admission or safety plan', nodeId: 'mse-insight-judgment-risk' },
    { text: 'Command auditory hallucinations to harm self/others = immediate safety concern', nodeId: 'mse-perceptions-cognition' },
    { text: 'Document suicidal ideation as passive, active without plan, or active with plan', nodeId: 'mse-thought-process-content' },
    { text: 'Quote patient\'s exact words for mood (subjective) vs your observation for affect (objective)', nodeId: 'mse-speech-mood' },
    { text: 'Assess insight and judgment - poor insight may require involuntary commitment', nodeId: 'mse-insight-judgment-risk' },
];
export const PSYCHIATRY_ASSESSMENT_NODES = [
    // =====================================================================
    // MODULE 0: START
    // =====================================================================
    {
        id: 'mse-start',
        type: 'info',
        module: 0,
        title: 'Mental Status Exam Dictation Guide',
        body: 'This is a **structured walkthrough for MSE documentation**. Each section presents descriptive options you can reference while dictating your mental status exam.\n\n**Purpose:** Guide your dictation through each MSE component with standardized terminology.\n\n**Not intended for:** Copy/paste documentation. Use as a reference only.\n\n**MSE Components:**\n1. Appearance & Behavior\n2. Speech & Mood/Affect\n3. Thought Process & Content\n4. Perceptions & Cognition\n5. Insight, Judgment & Risk Stratification',
        citation: [1, 2],
        next: 'mse-appearance-behavior',
    },
    // =====================================================================
    // MODULE 1: APPEARANCE & BEHAVIOR
    // =====================================================================
    {
        id: 'mse-appearance-behavior',
        type: 'info',
        module: 1,
        title: 'Appearance & Behavior',
        body: '**APPEARANCE**\n\n**Grooming:**\n• Well-groomed\n• Disheveled\n• Unkempt\n\n**Hygiene:**\n• Good\n• Fair\n• Poor\n\n**Dress:**\n• Appropriate to weather/situation\n• Inappropriate\n• Bizarre\n\n**Age Appearance:**\n• Appears stated age\n• Appears older than stated age\n• Appears younger than stated age\n\n---\n\n**BEHAVIOR**\n\n**Psychomotor Activity:**\n• Normal\n• Agitated (increased motor activity, restlessness)\n• Retarded (slowed movements, decreased activity)\n• Catatonic (minimal response to environment)\n\n**Eye Contact:**\n• Good (appropriate engagement)\n• Poor (limited engagement)\n• Avoidant (actively looks away)\n• Intense/staring (fixed, unwavering)\n\n**Cooperation:**\n• Cooperative\n• Guarded (cautious, reluctant to share)\n• Hostile\n• Uncooperative',
        citation: [1, 2],
        next: 'mse-speech-mood',
    },
    // =====================================================================
    // MODULE 2: SPEECH & MOOD/AFFECT
    // =====================================================================
    {
        id: 'mse-speech-mood',
        type: 'info',
        module: 2,
        title: 'Speech & Mood/Affect',
        body: '**SPEECH**\n\n**Rate:**\n• Normal\n• Rapid\n• Slow\n• Pressured (rapid, difficult to interrupt)\n\n**Rhythm:**\n• Normal\n• Dysarthric (slurred, unclear articulation)\n• Stuttering\n\n**Volume:**\n• Normal\n• Loud\n• Soft\n• Mute\n\n**Tone:**\n• Normal\n• Monotone\n• Anxious\n\n---\n\n**MOOD** (patient\'s subjective description)\n\nQuote the patient\'s own words. Examples:\n• "Depressed"\n• "Anxious"\n• "Fine"\n• "I want to die"\n• "Scared"\n• "Angry"\n• "Empty"\n\n---\n\n**AFFECT** (your objective observation)\n\n**Range:**\n• Full (normal range of emotional expression)\n• Restricted (limited range)\n• Blunted (significantly diminished)\n• Flat (absent emotional expression)\n\n**Congruence:**\n• Congruent (affect matches stated mood)\n• Incongruent (affect does not match stated mood)\n\n**Quality:**\n• Euthymic (normal, baseline)\n• Dysphoric (sad, depressed)\n• Euphoric (elevated, excessive happiness)\n• Anxious\n• Irritable\n• Labile (rapidly shifting)',
        citation: [1, 2],
        next: 'mse-thought-process-content',
    },
    // =====================================================================
    // MODULE 3: THOUGHT PROCESS & CONTENT
    // =====================================================================
    {
        id: 'mse-thought-process-content',
        type: 'info',
        module: 3,
        title: 'Thought Process & Content',
        body: '**THOUGHT PROCESS**\n\n• **Linear/Goal-directed:** Logical, coherent progression toward a point\n• **Circumstantial:** Eventually reaches the point but with excessive, unnecessary detail\n• **Tangential:** Never reaches the point, deviates to unrelated topics\n• **Loose associations:** Ideas shift between unrelated topics without logical connection\n• **Flight of ideas:** Rapid shifting between topics with tenuous connections (seen in mania)\n• **Thought blocking:** Abrupt interruption of thought mid-sentence\n• **Perseveration:** Repetitive focus on a single topic despite attempts to change subject\n• **Word salad:** Incoherent, random words without meaningful connections\n\n---\n\n**THOUGHT CONTENT**\n\n**Suicidal Ideation (SI):**\n• None\n• Passive ("I wish I was dead," "I wish I wouldn\'t wake up")\n• Active without plan ("I want to kill myself" but no specific plan)\n• Active with plan (has specific method in mind)\n• Active with plan and intent (plan + intention to act)\n\n**Homicidal Ideation (HI):**\n• None\n• Passive thoughts (fleeting, no intent)\n• Active without plan\n• Active with plan\n\n**Delusions:**\n• None\n• Paranoid (belief of persecution, conspiracy)\n• Grandiose (inflated self-importance, special powers)\n• Somatic (false beliefs about body/health)\n• Religious (inappropriate religious content)\n• Erotomanic (belief someone is in love with them)\n• Ideas of reference (belief that random events have personal significance)\n\n**Obsessions/Compulsions:**\n• Present\n• Absent',
        citation: [1, 2, 3],
        next: 'mse-perceptions-cognition',
    },
    // =====================================================================
    // MODULE 4: PERCEPTIONS & COGNITION
    // =====================================================================
    {
        id: 'mse-perceptions-cognition',
        type: 'info',
        module: 4,
        title: 'Perceptions & Cognition',
        body: '**PERCEPTIONS**\n\n**Hallucinations:**\n• None\n• Auditory\n  - Non-command (voices that do not direct behavior)\n  - Command (voices directing specific actions)\n• Visual\n• Tactile\n• Olfactory\n\n**Illusions:**\n• Present (misperception of actual stimulus)\n• Absent\n\n---\n\n**COGNITION**\n\n**Orientation:**\n• Oriented x4 (person, place, time, situation)\n• Oriented x3 (person, place, time)\n• Oriented x2 (person, place)\n• Oriented x1 (person only)\n• Oriented x0 (disoriented to all)\n\n**Attention:**\n• Intact\n• Impaired\n\n*Testing methods:*\n• Serial 7s (subtract 7 from 100 sequentially)\n• Spell WORLD backward\n• Days of week backward\n• Months of year backward\n\n**Memory:**\n• Intact\n• Impaired\n\n*Types:*\n• Immediate (repeat 3 words)\n• Recent/Short-term (recall 3 words after 5 minutes)\n• Remote/Long-term (past events, personal history)',
        citation: [1, 2],
        next: 'mse-insight-judgment-risk',
    },
    // =====================================================================
    // MODULE 5: INSIGHT, JUDGMENT & RISK
    // =====================================================================
    {
        id: 'mse-insight-judgment-risk',
        type: 'result',
        module: 5,
        title: 'Insight, Judgment & Risk Stratification',
        body: '**INSIGHT**\n\n• **Good:** Understands they have an illness and need for treatment\n• **Fair:** Partial awareness of illness or inconsistent acknowledgment\n• **Poor (Anosognosia):** No insight into illness, denies any problem\n\n---\n\n**JUDGMENT**\n\n• **Good:** Makes appropriate decisions, understands consequences\n• **Fair:** Some impairment in decision-making\n• **Poor:** Significantly impaired, unable to make appropriate decisions\n\n*Testing example:* "What would you do if you found a stamped, addressed letter on the ground?"\n\n---\n\n**SUICIDE RISK STRATIFICATION**\n\n**LOW RISK:**\n• No suicidal ideation\n• No plan or intent\n• No history of attempts\n• Protective factors present (family support, reasons for living, future orientation)\n\n**MODERATE RISK:**\n• Passive suicidal ideation, OR\n• History of prior attempts, OR\n• Limited protective factors\n• Current stressors without active plan\n\n**HIGH RISK:**\n• Active suicidal ideation with plan\n• Intent to act\n• Access to means (especially lethal means)\n• Recent suicide attempt\n• Command auditory hallucinations to harm self\n• Hopelessness\n• Impulsivity\n• Intoxication',
        citation: [1, 2, 3, 4],
        recommendation: 'Document MSE findings. Risk stratification guides disposition and safety planning. Use C-SSRS for standardized suicide risk assessment.',
        confidence: 'definitive',
    },
];
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const PSYCHIATRY_ASSESSMENT_MODULE_LABELS = [
    'Start',
    'Appearance & Behavior',
    'Speech & Mood/Affect',
    'Thought Process & Content',
    'Perceptions & Cognition',
    'Insight, Judgment & Risk',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const PSYCHIATRY_ASSESSMENT_CITATIONS = [
    { num: 1, text: 'Sadock BJ, Sadock VA, Ruiz P. Kaplan & Sadock\'s Synopsis of Psychiatry: Behavioral Sciences/Clinical Psychiatry. 11th ed. Wolters Kluwer; 2015.' },
    { num: 2, text: 'Lukens TW, Wolf SJ, Edlow JA, et al. Clinical Policy: Critical Issues in the Diagnosis and Management of the Adult Psychiatric Patient in the Emergency Department. Ann Emerg Med. 2006;47(1):79-99.' },
    { num: 3, text: 'Posner K, Brown GK, Stanley B, et al. The Columbia-Suicide Severity Rating Scale (C-SSRS): Initial Validity and Internal Consistency Findings From Three Multisite Studies With Adolescents and Adults. Am J Psychiatry. 2011;168(12):1266-1277.' },
    { num: 4, text: 'Marx JA, Hockberger RS, Walls RM. Rosen\'s Emergency Medicine: Concepts and Clinical Practice. 9th ed. Elsevier; 2018. Chapter 100: Thought Disorders.' },
];
// -------------------------------------------------------------------
// Node Count
// -------------------------------------------------------------------
export const PSYCHIATRY_ASSESSMENT_NODE_COUNT = PSYCHIATRY_ASSESSMENT_NODES.length;
