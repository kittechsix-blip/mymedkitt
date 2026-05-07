// myMedKitt — MedKitt Learn rotation + student card data
// Phase 1 pilot: Psychiatry only. Hand-curated 7-field cards that wrap
// existing consult trees with MS3/MS4-facing context and prep.

export type PimpTag = 'criteria' | 'mechanism' | 'adverse-effect' | 'next-step' | 'pearl';

export interface PimpQuestion {
  question: string;
  answer: string;
  tag: PimpTag;
}

// Pillar — drives navigation-mode grouping. Survival = action-oriented bedside
// kit; Condition = ADMSEP-mapped diagnosis card; Pharmacology = drug-class card.
export type CardPillar = 'survival' | 'condition' | 'pharmacology';

// ADMSEP psychiatry clerkship domains — 12 here so we can reuse `domain` field
// for the cross-cutting OSCE skills + pharm rows in Domain-mode without a
// second taxonomy.
export type ADMSEPDomain =
  | 'mood'
  | 'anxiety-trauma'
  | 'psychotic'
  | 'substance'
  | 'cognitive'
  | 'eating'
  | 'personality'
  | 'pediatric'
  | 'geriatric'
  | 'emergencies'
  | 'skills'
  | 'pharmacology';

export interface StudentCard {
  id: string;
  rotationId: string;
  sectionId: string;
  title: string;
  trigger: string;            // "Use this when..."
  askThree: [string, string, string];
  oneBreathReframe: string;   // Semantic-qualifier rephrase
  sayOnRounds: string;        // Fill-in-the-blanks template
  doNotMiss: string[];        // 3-5 red flags
  pimpPrep: PimpQuestion[];   // <= 3
  shelfHighYield: string[];   // 3-5 bullets
  linkedTreeId: string;       // existing tree in src/data/trees, info page id, or '' if none
  pillar: CardPillar;
  domain: ADMSEPDomain;
  tier: 1 | 2;                // 1 = must-master this rotation, 2 = breadth
  shelfPriority?: 'high' | 'med' | 'low';
  // Optional: override link target for cards that point to an info page or drill
  // instead of a consult tree. If present, supersedes `linkedTreeId`.
  linkType?: 'tree' | 'info' | 'drill';
}

// OSCE drill — uses inline steps (simpler than full DecisionTree integration).
// Each step is a prompt + options where some options are correct. Score is
// the sum of points from correct options. Feedback info page shown at end.
export interface OSCEDrillOption {
  id: string;
  label: string;
  correct: boolean;
  points: number;       // Awarded if selected (0 for incorrect, positive for correct)
  feedback?: string;    // Shown after the student picks any option
}

export interface OSCEDrillStep {
  id: string;
  prompt: string;
  options: OSCEDrillOption[];
  multiSelect?: boolean; // If true, student should select all correct options
  pearl?: string;        // Bonus teaching point shown after step
}

// Legacy field kept for compatibility — not used by the inline-steps renderer.
export interface OSCEDrillRubricEntry {
  nodeId: string;
  correctOptionLabel: string;
  points: number;
  feedback?: string;
}

export interface OSCEDrill {
  id: string;
  rotationId: string;
  title: string;
  scenario: string;            // 1-paragraph patient vignette
  learningObjectives: string[];
  treeId?: string;             // Optional — backed by a DecisionTree
  steps: OSCEDrillStep[];      // Inline steps (preferred over treeId)
  scoringRubric: OSCEDrillRubricEntry[]; // Legacy / optional
  feedbackInfoPageId: string;  // Info page shown at end with debrief
  estMinutes: number;
}

export interface LearnSection {
  id: string;
  title: string;
  blurb: string;
  cardIds: string[];
}

export interface TexasModuleRef {
  infoPageId: string;
  title: string;
  subtitle?: string;
}

export interface LearnRotation {
  id: string;
  name: string;
  subtitle: string;
  categoryId: string;          // links to existing category for color/branding
  sections: LearnSection[];
  preRoundTitle: string;
  shelfTitle: string;
  drills?: OSCEDrill[];
  texasModule?: TexasModuleRef;
}

// Domain display order + human-readable labels for Domain-mode headers.
export const ADMSEP_DOMAINS: { id: ADMSEPDomain; label: string }[] = [
  { id: 'emergencies', label: 'Emergencies & Safety' },
  { id: 'mood', label: 'Mood Disorders' },
  { id: 'anxiety-trauma', label: 'Anxiety & Trauma' },
  { id: 'psychotic', label: 'Psychotic Disorders' },
  { id: 'substance', label: 'Substance Use' },
  { id: 'cognitive', label: 'Cognitive & Delirium' },
  { id: 'eating', label: 'Eating Disorders' },
  { id: 'personality', label: 'Personality Disorders' },
  { id: 'pediatric', label: 'Child & Adolescent' },
  { id: 'geriatric', label: 'Geriatric' },
  { id: 'skills', label: 'Interview & Documentation Skills' },
  { id: 'pharmacology', label: 'Pharmacology' },
];

export function getDomainLabel(id: ADMSEPDomain): string {
  return ADMSEP_DOMAINS.find(d => d.id === id)?.label ?? id;
}

// ===================================================================
// Psychiatry — 10 hand-curated student cards
// ===================================================================

const PSYCH_CARDS: StudentCard[] = [
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
    pillar: 'survival',
    domain: 'skills',
    tier: 1,
    shelfPriority: 'high',
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
      { question: 'What is the CAM, and what does a positive screen require?', answer: 'Confusion Assessment Method: (1) acute onset + fluctuating course AND (2) inattention, PLUS either (3) disorganized thinking OR (4) altered LOC.', tag: 'criteria' },
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
    pillar: 'survival',
    domain: 'cognitive',
    tier: 1,
    shelfPriority: 'high',
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
    oneBreathReframe: 'A 5-step ladder from passive death wish → active ideation → method → intent → plan; ideation 4–5 in the past month OR any suicidal behavior (attempt, interrupted, aborted, preparatory) in the past 3 months = high risk per Columbia triage.',
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
      'Method matters: firearms account for **>50% of US suicide deaths** (CDC WISQARS, ~55% in 2022–2023); case-fatality ~85–90% per attempt.',
      'SSRIs in patients **≤24 yo**: black-box warning for increased suicidal ideation in first weeks — monitor closely, do not avoid the drug.',
      'Lithium decreases suicide risk in bipolar (independent of mood stabilization).',
      'Discharge documentation: ideation, plan, intent, means, prior attempts, protective factors, safety plan, follow-up.',
    ],
    linkedTreeId: 'suicide-risk-assessment',
    pillar: 'survival',
    domain: 'emergencies',
    tier: 1,
    shelfPriority: 'high',
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
      { question: 'IM agent for severe agitation when you cannot get an IV?', answer: 'Droperidol 5 mg ± midazolam 5 mg IM ("DMX"), or olanzapine 10 mg IM (do NOT combine IM olanzapine with parenteral benzo). For excited/agitated delirium with no IV, ketamine 4–5 mg/kg IM is fastest — EM/EMS practice, not BETA-endorsed.', tag: 'next-step' },
      { question: 'What is the classic "B-52"?', answer: 'Benadryl 50 mg + Haldol 5 mg + Ativan 2 mg IM. Modern alternatives: "5-and-2" (haloperidol 5 + lorazepam 2) or DMX (droperidol + midazolam).', tag: 'pearl' },
    ],
    shelfHighYield: [
      'De-escalation order: verbal → environmental → PO offer → IM.',
      'Antipsychotic options: haloperidol 5–10 mg IM, olanzapine 5–10 mg IM, droperidol 5 mg IM.',
      '**Elderly/frail: start haloperidol 0.5–1 mg IM** (Beers high-risk drug — full dose risks oversedation, falls, QT, NMS).',
      'Avoid IM olanzapine + parenteral benzo together (respiratory depression).',
      'Ketamine 4–5 mg/kg IM = onset in 2–5 min for excited delirium (EM practice; not BETA-endorsed for psych emergency).',
      'Document: indication, less restrictive alternatives tried, time-limited orders, monitoring plan.',
    ],
    linkedTreeId: 'acute-agitation',
    pillar: 'survival',
    domain: 'emergencies',
    tier: 1,
    shelfPriority: 'high',
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
      'In severe hepatic disease/encephalopathy, prefer **lorazepam** (no active metabolites) over diazepam; use phenobarbital cautiously with reduced load — discuss with attending.',
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
    pillar: 'survival',
    domain: 'substance',
    tier: 1,
    shelfPriority: 'high',
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
    oneBreathReframe: 'Two life-threatening medication reactions that look similar but split on temporal pattern (SS = hours, NMS = days), neuromuscular signature (SS = clonus + hyperreflexia, NMS = lead-pipe rigidity with hypo-/normoreflexia and NO clonus), and offending agent (SS = serotonergic, NMS = dopamine antagonist).',
    sayOnRounds: '[Age]-y/o on [serotonergic / dopamine-blocker] medications presenting with [fever, rigidity/clonus, AMS, autonomic instability]. **Hunter Criteria** [met/not met] for serotonin syndrome / **Levenson Criteria** [met/not met] for NMS. Plan: STOP offending agent, [benzodiazepines + cyproheptadine for SS / dantrolene + bromocriptine for NMS], ICU, aggressive cooling.',
    doNotMiss: [
      'STOP the offending drug **first** — supportive care comes second.',
      'Hyperthermia >40°C → intubate, cool aggressively, paralytic if rigidity prevents cooling.',
      'Rhabdomyolysis (CK >5,000) → IV fluids, monitor for AKI.',
      'Do not give bromocriptine for SS (worsens serotonergic state).',
      'Do not give cyproheptadine for NMS (no benefit, delays correct treatment).',
    ],
    pimpPrep: [
      { question: 'How do you tell NMS from serotonin syndrome at the bedside?', answer: 'SS = clonus + hyperreflexia (hyperkinetic, lower extremities > upper), onset hours, after serotonergic drug. NMS = lead-pipe rigidity, hypo-/normoreflexia, NO clonus, onset days, after dopamine blocker.', tag: 'criteria' },
      { question: 'First-line treatment for serotonin syndrome (besides stopping the drug)?', answer: 'Benzodiazepines for agitation + cyproheptadine 12 mg PO load, then 2 mg q2h.', tag: 'next-step' },
      { question: 'Why does dantrolene work for NMS?', answer: 'Direct skeletal muscle relaxant — blocks calcium release from sarcoplasmic reticulum, reducing rigidity-driven hyperthermia.', tag: 'mechanism' },
    ],
    shelfHighYield: [
      'NMS: F-E-V-E-R — Fever, Encephalopathy, Vitals unstable, Elevated CK, Rigidity.',
      'SS triad: mental status change, autonomic hyperactivity, neuromuscular abnormalities (clonus).',
      'Both can elevate CK and cause renal failure from rhabdomyolysis.',
      'Malignant hyperthermia: post-anesthesia (succinylcholine, halothanes) — same dantrolene treatment, different trigger.',
      'After NMS fully resolves, rechallenge with a low-potency or atypical antipsychotic after **at least 2 weeks of full recovery** (longer if depot agent caused it). Many experts wait ≥4 weeks from episode onset.',
    ],
    linkedTreeId: 'nms',
    pillar: 'survival',
    domain: 'emergencies',
    tier: 1,
    shelfPriority: 'high',
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
      'Folie à deux (shared psychotic disorder) — **removed as distinct diagnosis in DSM-5**; now coded under "Other Specified Schizophrenia Spectrum…" Still a high-yield historical term.',
    ],
    linkedTreeId: 'psychiatry-assessment',
    pillar: 'survival',
    domain: 'skills',
    tier: 1,
    shelfPriority: 'high',
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
      'Tarasoff duty (**majority rule**): warn identified third party of credible homicidal threat. **Texas exception:** no duty-to-warn per Thapar v. Zezulka (1999) — TX limits the duty to reasonable clinical steps. Always know your state.',
      'HIPAA exceptions in psychiatry: imminent danger, court order, child abuse reporting, mandatory reporting.',
    ],
    linkedTreeId: 'psych-assessment',
    pillar: 'survival',
    domain: 'skills',
    tier: 1,
    shelfPriority: 'med',
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
      '**Age >40 with new psychosis** — overwhelmingly medical or substance-induced; full workup mandatory before any primary psychiatric label.',
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
      'Schizoaffective: ≥2 weeks of psychosis WITHOUT mood symptoms AND mood symptoms present for the **majority (≥50%) of total illness duration**. Without that 50% rule, it is a mood disorder with psychotic features.',
      'Brief psychotic: <1 month, full return to baseline.',
      'Atypicals → metabolic syndrome (clozapine, olanzapine worst). Monitor weight, lipids, glucose.',
    ],
    linkedTreeId: 'acute-psychosis',
    pillar: 'survival',
    domain: 'psychotic',
    tier: 1,
    shelfPriority: 'high',
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
    sayOnRounds: '[Age]-y/o with [psychiatric / medical history] presenting with [duration] of [immobility / mutism / posturing / waxy flexibility]. **BFCSI screen** ≥2 of first 14 items positive → full **BFCRS** rating scale. **Lorazepam 2 mg IV challenge** [response in 10–15 min / no response]. Plan: lorazepam 2–4 mg IV q4–6h; if benzo-resistant, ECT consult. Avoid antipsychotics until catatonia resolves (NMS risk).',
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
      'Bush-Francis Catatonia Screening Instrument (BFCSI): ≥2 of the first 14 items → positive screen → proceed to full 23-item BFCRS rating scale.',
      'Lorazepam 1–2 mg IV → reassess in 10–15 minutes.',
      'Most catatonia is mood-related (depression > mania > schizophrenia).',
      'Anti-NMDA encephalitis presents with catatonia + psychosis + dyskinesias in young women.',
      'Malignant catatonia and NMS are clinically and pathophysiologically overlapping; treatment is the same.',
    ],
    linkedTreeId: 'catatonia',
    pillar: 'survival',
    domain: 'emergencies',
    tier: 1,
    shelfPriority: 'med',
  },

  // ===================================================================
  // Phase 2 — Survival Kit expansion (5 new cards)
  // ===================================================================
  {
    id: 'psych-opioid-od',
    rotationId: 'psychiatry',
    sectionId: 'unsafe',
    title: 'Opioid OD & Withdrawal: Naloxone, Buprenorphine, COWS',
    trigger: 'Patient with depressed respirations and pinpoint pupils — or someone in opioid withdrawal asking for "help with the dope sickness."',
    askThree: [
      'What did you use, when, and how — IV, smoked, snorted? Any fentanyl analogues or test strips used?',
      'When was your last opioid dose, and what is your usual daily amount in morphine equivalents?',
      'Any benzo, alcohol, or stimulant co-use, and any prior overdoses or naloxone reversals?',
    ],
    oneBreathReframe: 'Two opposite poles of the same axis — overdose (mu agonism → respiratory depression, miosis, depressed mentation) reverses with naloxone titrated to respirations, not consciousness; withdrawal (autonomic surge, mydriasis, GI distress) is treated with buprenorphine after COWS ≥8 with mu-agonist-free interval to avoid precipitated withdrawal.',
    sayOnRounds: '[Age]-y/o with [opioid use history] presenting [overdose: pinpoint pupils, RR <12, depressed mentation / withdrawal: piloerection, mydriasis, yawning, abdominal cramping]. **COWS** [score] / **Glasgow** [score]. Plan: [overdose: naloxone 0.04–0.4 mg IV titrated to RR ≥12, supportive ventilation, fentanyl re-dosing risk] vs [withdrawal: buprenorphine 4–8 mg SL after COWS ≥8 (low-dose initiation possible if mu agonist active), clonidine, ondansetron, loperamide]. Outpatient buprenorphine bridge + harm reduction (naloxone Rx, fentanyl test strips, never-use-alone counseling).',
    doNotMiss: [
      'Naloxone titrate to **respirations**, not mentation — full reversal precipitates withdrawal and re-use.',
      'Fentanyl: longer duration than naloxone — patients re-sedate after initial reversal. Observe ≥2 hours minimum.',
      'Precipitated withdrawal with **buprenorphine**: avoid by waiting for COWS ≥8 with last full mu agonist >12–16h (heroin) / >24–72h (methadone). For chronic fentanyl, consider low-dose initiation (microdosing) protocols.',
      'Co-ingestion with **benzos or alcohol** — naloxone does NOT reverse those; respiratory depression may persist.',
      'Always offer a take-home naloxone kit and connect to MAT clinic on discharge — every encounter is a touchpoint.',
    ],
    pimpPrep: [
      { question: 'How much naloxone for an opioid OD?', answer: '0.04–0.4 mg IV/IM/IN, titrated to respirations ≥12. Higher doses for synthetic opioids; redose q2–3 min until effective.', tag: 'next-step' },
      { question: 'Why does buprenorphine precipitate withdrawal?', answer: 'High mu-receptor affinity but partial agonism — displaces full agonists and produces less mu activation, causing withdrawal in patients with active full-agonist occupancy.', tag: 'mechanism' },
      { question: 'COWS ≥8 means what for buprenorphine induction?', answer: 'Patient is sufficiently in withdrawal that a buprenorphine dose will provide net-positive mu activity rather than displace residual agonist into more withdrawal.', tag: 'criteria' },
    ],
    shelfHighYield: [
      'Opioid toxidrome: pinpoint pupils, depressed RR, depressed mentation, decreased GI motility.',
      'Opioid withdrawal: yawning, lacrimation, rhinorrhea, piloerection, mydriasis, abdominal cramps, diarrhea, anxiety. **NOT life-threatening in adults** — but is in neonates (NAS).',
      'Naltrexone (oral or extended-release IM): blocks relapse but **requires 7-day opioid-free interval** before initiation.',
      'Methadone: full mu agonist — outpatient only via licensed OTP for OUD; ED can give a single 24h dose under "3-day rule" exception.',
      'Buprenorphine prescribing: **DEA X-waiver no longer required** since the MAT Act (2023) — any DEA-registered clinician can prescribe.',
    ],
    linkedTreeId: 'opioid-withdrawal',
    pillar: 'survival',
    domain: 'substance',
    tier: 1,
    shelfPriority: 'high',
  },
  {
    id: 'psych-tx-573',
    rotationId: 'psychiatry',
    sectionId: 'seeing',
    title: 'Texas Emergency Detention (Chapter 573)',
    trigger: 'Patient meets danger-to-self / danger-to-others / grave-disability criteria and refuses voluntary admission — anywhere in Texas.',
    askThree: [
      'Is the patient an imminent danger to self or others, OR experiencing such severe deterioration of psychosocial functioning that they cannot make rational decisions about treatment?',
      'Has a peace officer or physician-completed application been initiated, AND is there a physician\'s certificate of medical examination ready?',
      'Where will the 48-hour clock be served — local psychiatric facility, JPS, Austin State Hospital, or Integral Care?',
    ],
    oneBreathReframe: 'A 48-hour involuntary hold under Texas Health & Safety Code Chapter 573 — initiated by police on probable cause OR by a physician via written application — that buys time for a court-ordered Chapter 574 commitment if needed.',
    sayOnRounds: '[Age]-y/o presenting with [SI / HI / grave disability] and refusing voluntary admission. **EDO under Texas HSC §573** initiated by [peace officer / physician]. Probable cause: [danger to self / others / inability to provide for basic needs]. Plan: complete physician\'s certificate of medical examination, transport to [facility] within 48 hours. Court hearing for Chapter 574 commitment if continued involuntary care needed.',
    doNotMiss: [
      '**48-hour clock starts at detention**, not arrival at facility — document time of EDO initiation.',
      'Peace officer detention requires **probable cause that the person is mentally ill AND there is a substantial risk of serious harm to self or others if not immediately restrained**.',
      'Physician\'s certificate of medical examination must include: clinical findings, opinion that detention criteria are met, and reasons for that opinion.',
      '**SB 1164 (effective 9/1/2025)** broadened officer detention authority — know what your jurisdiction follows.',
      'EDO is NOT a finding of incapacity — capacity assessment is separate. A patient on EDO can still refuse a non-emergent procedure.',
    ],
    pimpPrep: [
      { question: 'What are the three criteria for an EDO in Texas?', answer: 'Mental illness AND (1) substantial risk of serious harm to self, (2) substantial risk of serious harm to others, OR (3) deterioration so severe that the person cannot provide for their basic needs.', tag: 'criteria' },
      { question: 'Difference between Chapter 573 and Chapter 574?', answer: '573 = 48-hour emergency detention initiated by police or physician. 574 = court-ordered commitment after a hearing — 90 days (temporary) or 12 months (extended).', tag: 'pearl' },
      { question: 'Does Texas have a Tarasoff duty-to-warn?', answer: 'NO — Thapar v. Zezulka (1999) limited the duty. Texas requires reasonable clinical steps but no specific duty-to-warn third parties.', tag: 'pearl' },
    ],
    shelfHighYield: [
      'TX HSC §573 — Emergency Detention (48 hours).',
      'TX HSC §574 — Court-Ordered Mental Health Services (90d or 12mo).',
      'Local resources: Austin State Hospital, Integral Care (Travis County MHMR), JPS Behavioral Health.',
      'Capacity (clinical) is decision-specific. Commitment (legal) is a different question.',
      '**Tarasoff duty in TX: NONE per Thapar v. Zezulka** — but reasonable clinical steps still expected.',
    ],
    linkedTreeId: 'learn-tx-mh-code',
    pillar: 'survival',
    domain: 'emergencies',
    tier: 1,
    shelfPriority: 'high',
    linkType: 'info',
  },
  {
    id: 'psych-signout',
    rotationId: 'psychiatry',
    sectionId: 'present',
    title: 'The 30-Second Psych Signout',
    trigger: 'End of shift, change of service, or handing off to night float — every patient gets one of these whether you write it or not.',
    askThree: [
      'What is the legal status, and is anything pending today (clinic team meeting, court hearing, expected discharge)?',
      'What is the active risk assessment — SI/HI/elopement — and what monitoring is in place (1:1 sitter, q15, line-of-sight)?',
      'What is the disposition barrier RIGHT NOW — placement? insurance? medical clearance? family contact?',
    ],
    oneBreathReframe: 'A surgical 4-line bedside packet — Identifier · Legal · Risk · Disposition — that hands the next clinician everything they need to act safely without re-interviewing the chart.',
    sayOnRounds: '"Bed [N], [age]-y/o with [primary dx]. **Legal:** [voluntary / EDO at hour X / certified through date]. **Risk:** [SI/HI/elopement status + monitoring level]. **Plan:** [today\'s active todo — meds, labs, family meeting, dispo barrier]. **Watch for:** [acute concern, e.g., escalating agitation, COWS rising, pending tox screen]." Done in 30 seconds. Anything else lives in the chart.',
    doNotMiss: [
      'NEVER include patient identifiers in handwritten or texted signouts — verbal at the bedside or formal EHR I-PASS only.',
      'Always state legal status — voluntary patients can leave; EDO patients have a clock.',
      '**Updated** suicide / homicide risk — yesterday\'s assessment is stale by morning.',
      'Disposition barrier is the most useful single field — names what is preventing discharge today.',
      'Closed-loop: receiver reads back the plan or the signout did not happen.',
    ],
    pimpPrep: [
      { question: 'What does I-PASS stand for?', answer: 'Illness severity, Patient summary, Action list, Situation awareness/contingency planning, Synthesis by receiver.', tag: 'criteria' },
      { question: 'What single field do you NEVER skip on a psych signout?', answer: 'Legal status. A voluntary patient ≠ an EDO patient ≠ a certified patient — the next person needs to know.', tag: 'pearl' },
      { question: 'Closed-loop signout means what?', answer: 'The receiver verbalizes the plan back so both sides confirm understanding. If you talked AT them, you did not hand off.', tag: 'mechanism' },
    ],
    shelfHighYield: [
      'I-PASS reduces preventable adverse events ~30% in published studies.',
      'Most-missed signout fields: pending tasks, contingency plans, code status changes.',
      'Texas EDO clock: 48 hours from time of detention, not arrival.',
      'Voluntary admission discharge: usually 72-hour written notice to leave AMA.',
      'Never sign out a SI/HI patient without naming current monitoring level (1:1, q15, line-of-sight).',
    ],
    linkedTreeId: '',
    pillar: 'survival',
    domain: 'skills',
    tier: 1,
    shelfPriority: 'med',
  },
  {
    id: 'psych-lithium-tox',
    rotationId: 'psychiatry',
    sectionId: 'unsafe',
    title: 'Lithium Toxicity at the Bedside',
    trigger: 'Patient on lithium with new tremor, GI symptoms, ataxia, confusion, or any acute illness — narrow therapeutic index strikes again.',
    askThree: [
      'Is this acute (overdose), acute-on-chronic, or chronic toxicity — and what is the lithium level + when was it drawn relative to the last dose?',
      'Any volume contraction (vomiting, diarrhea, fever), new NSAID, ACEi/ARB, thiazide, or recent dose increase?',
      'Renal function, sodium, and any neurologic findings — tremor, ataxia, dysarthria, confusion, seizures, or myoclonus?',
    ],
    oneBreathReframe: 'A renally-cleared mood stabilizer with a therapeutic window of 0.6–1.2 mEq/L where toxicity scales with chronicity — acute overdose tolerates higher peaks transiently while chronic toxicity at 1.5–2.5 mEq/L can produce permanent neuro sequelae (SILENT syndrome).',
    sayOnRounds: '[Age]-y/o on lithium [dose, indication] presenting with [tremor / GI / neuro symptoms]. **Lithium level [value]** drawn [timing]. Renal: Cr [value], urinary output [adequate/poor]. Volume status: [euvolemic / contracted]. Plan: stop lithium, IV NS at maintenance + replacement, monitor q4–6h levels, **hemodialysis** if level >4.0 (acute) or >2.5 (chronic) with neuro symptoms / renal failure / level not falling. Consult nephrology and psychiatry.',
    doNotMiss: [
      '**Chronic toxicity is more dangerous than acute** — chronic at 1.5 can outdo acute at 4.0. Treat by chronicity, not absolute level.',
      'NEVER give thiazides, ACEi/ARBs, or NSAIDs to a lithium-toxic patient — all decrease lithium clearance.',
      'Hemodialysis indications: level >4.0 (acute) or >2.5 (chronic) with sx, renal failure, or level not declining at 0.5 mEq/L per 12h.',
      'After HD, levels REBOUND — recheck 4–6h after session as tissue lithium re-equilibrates.',
      '**SILENT syndrome:** persistent neurologic sequelae (cerebellar, EPS, cognitive) after lithium toxicity — even after level normalizes.',
    ],
    pimpPrep: [
      { question: 'Why does volume contraction worsen lithium toxicity?', answer: 'Lithium reabsorption parallels sodium in the proximal tubule. Volume contraction → enhanced Na (and Li) reabsorption → rising levels even at unchanged dose.', tag: 'mechanism' },
      { question: 'Therapeutic range for lithium?', answer: '0.6–1.2 mEq/L (acute mania) and 0.4–0.8 mEq/L (maintenance). Levels >1.5 = toxic, >2.5 = severe.', tag: 'criteria' },
      { question: 'When do you dialyze for lithium toxicity?', answer: 'Level >4.0 (acute) or >2.5 (chronic) with neuro symptoms, renal failure, or level not falling. Continuous renal replacement also acceptable.', tag: 'next-step' },
    ],
    shelfHighYield: [
      'Lithium side effects: tremor, polyuria/nephrogenic DI, hypothyroidism, weight gain, acne, cognitive slowing.',
      'Lithium TI: 0.6–1.2 mEq/L. Toxic >1.5. Severe >2.5. Trough drawn 12 hours after last dose.',
      'Drug interactions: thiazides ↑ Li (↓ clearance), NSAIDs ↑ Li, ACEi ↑ Li, caffeine ↓ Li slightly.',
      'Pregnancy: Ebstein anomaly risk in 1st trimester (~0.05–0.1%, far lower than older estimates) — discuss risk/benefit, do not auto-discontinue.',
      'Lithium **decreases suicide risk in bipolar** — independent of mood stabilization.',
    ],
    linkedTreeId: 'learn-lithium-toxicity',
    pillar: 'survival',
    domain: 'emergencies',
    tier: 1,
    shelfPriority: 'high',
    linkType: 'info',
  },
  {
    id: 'psych-anticholinergic',
    rotationId: 'psychiatry',
    sectionId: 'unsafe',
    title: 'Anticholinergic Delirium',
    trigger: 'Patient with new confusion + hot/dry/red skin + urinary retention + mydriasis — especially the elderly on poly-pharmacy or after antihistamine/TCA exposure.',
    askThree: [
      'What new medication or dose change in the last 24–72 hours — especially diphenhydramine, hydroxyzine, TCAs, low-potency antipsychotics, or scopolamine?',
      'Vitals: temperature, HR, BP, urinary output, bowel sounds — looking for dry skin, mydriasis, ileus, retention?',
      'Anything ingested intentionally — Jimson weed (datura), benztropine bingeing, or "TCA cocktail"?',
    ],
    oneBreathReframe: '"**Hot as a hare, dry as a bone, red as a beet, blind as a bat, mad as a hatter, full as a flask**" — a muscarinic-blockade toxidrome from antihistamines, TCAs, antipsychotics, or plant alkaloids that crosses the blood-brain barrier and causes delirium with hyperthermia.',
    sayOnRounds: '[Age]-y/o presenting with [duration] of confusion in setting of [agent + dose]. Exam: [tachycardia, hyperthermia, mydriasis, dry mucous membranes, flushed skin, urinary retention, ileus, agitation]. Differential: anticholinergic vs sympathomimetic vs serotonergic. Plan: stop offending agent, supportive (IV fluids, cooling, benzodiazepines for agitation), consider physostigmine 1–2 mg IV slow over 5 min for severe central toxicity (NOT in TCA OD — risk of asystole). Monitor for prolonged QT and seizures.',
    doNotMiss: [
      '**Physostigmine is contraindicated in TCA overdose** — risk of asystole, seizures, and prolonged QRS. Sodium bicarbonate is the answer for TCA-related cardiotoxicity.',
      'Hyperthermia + agitation → dantrolene or active cooling, not phenothiazines (worsen anticholinergic burden).',
      'Elderly are exquisitely sensitive — single diphenhydramine dose can precipitate delirium per Beers Criteria.',
      'Tricyclic OD: wide QRS >100 ms = give bicarb. >160 ms = high risk of seizure / arrhythmia.',
      'Differential: sympathomimetic = wet (sweating). Serotonergic = clonus + hyperreflexia. Anticholinergic = dry + mydriasis + ileus.',
    ],
    pimpPrep: [
      { question: 'Six classic features of anticholinergic toxidrome?', answer: 'Hot (hyperthermia), Dry (anhidrosis), Red (flushed), Blind (mydriasis, blurred vision), Mad (delirium), Full (urinary retention).', tag: 'criteria' },
      { question: 'When do you give physostigmine?', answer: 'Severe central anticholinergic delirium with hemodynamic stability and **NO TCA exposure**. Dose: 1–2 mg IV slowly. Have atropine at bedside for bradycardia.', tag: 'next-step' },
      { question: 'Why is sodium bicarbonate the answer for TCA-induced wide QRS?', answer: 'TCAs block fast sodium channels in cardiac myocytes — bicarbonate raises serum sodium and pH, displacing TCA from the channel and narrowing QRS.', tag: 'mechanism' },
    ],
    shelfHighYield: [
      'Anticholinergic burden score (ACB): higher score = worse cognition in elderly. Common offenders: diphenhydramine, hydroxyzine, TCAs, oxybutynin, paroxetine.',
      'Beers Criteria flags first-gen antihistamines and TCAs for elderly — consider second-gen alternatives.',
      'Physostigmine half-life is short (~30 min) — toxin half-life often longer → re-dose or supportive care.',
      'Datura/Jimson weed ingestion: classic college-age presentation with severe central anticholinergic syndrome.',
      'Coma cocktail in undifferentiated AMS: thiamine, glucose, naloxone — physostigmine is NOT routine.',
    ],
    linkedTreeId: 'delirium',
    pillar: 'survival',
    domain: 'cognitive',
    tier: 1,
    shelfPriority: 'med',
  },
];

// ===================================================================
// Psychiatry rotation definition
// ===================================================================

const PSYCHIATRY_ROTATION: LearnRotation = {
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
      cardIds: ['psych-capacity', 'psych-delirium-vs-psychosis', 'psych-suicide-cssrs', 'psych-tx-573'],
    },
    {
      id: 'unsafe',
      title: 'Patient Is Unsafe Or Agitated',
      blurb: 'Acute behavioral or medication emergencies — recognize, de-escalate, escalate.',
      cardIds: ['psych-agitation-beta', 'psych-alcohol-withdrawal', 'psych-opioid-od', 'psych-nms-vs-ss', 'psych-lithium-tox', 'psych-anticholinergic'],
    },
    {
      id: 'present',
      title: 'I Need To Present This Patient',
      blurb: 'MSE language, the one-liner that earns you the rest of the morning, and a 30-second signout.',
      cardIds: ['psych-mse', 'psych-presentation', 'psych-signout'],
    },
    {
      id: 'understand',
      title: 'I Need To Understand The Diagnosis',
      blurb: 'Clinical reasoning frameworks for the calls that come up most.',
      cardIds: ['psych-first-break', 'psych-catatonia'],
    },
  ],
  texasModule: {
    infoPageId: 'learn-tx-mh-code',
    title: 'Texas Mental Health Code',
    subtitle: 'Chapter 573 EDO · Chapter 574 commitment · Tarasoff in TX',
  },
};

export const ALL_LEARN_ROTATIONS: LearnRotation[] = [PSYCHIATRY_ROTATION];

const ALL_CARDS: StudentCard[] = [...PSYCH_CARDS];

// ===================================================================
// Public accessors
// ===================================================================

export function getAllLearnRotations(): LearnRotation[] {
  return ALL_LEARN_ROTATIONS;
}

export function getLearnRotation(id: string): LearnRotation | undefined {
  return ALL_LEARN_ROTATIONS.find(r => r.id === id);
}

export function getStudentCard(id: string): StudentCard | undefined {
  return ALL_CARDS.find(c => c.id === id);
}

export function getCardsForSection(rotationId: string, sectionId: string): StudentCard[] {
  const rotation = getLearnRotation(rotationId);
  if (!rotation) return [];
  const section = rotation.sections.find(s => s.id === sectionId);
  if (!section) return [];
  return section.cardIds
    .map(id => getStudentCard(id))
    .filter((c): c is StudentCard => c !== undefined);
}

export function getAllCardsForRotation(rotationId: string): StudentCard[] {
  return ALL_CARDS.filter(c => c.rotationId === rotationId);
}

export function getCardsForPillar(rotationId: string, pillar: CardPillar): StudentCard[] {
  return ALL_CARDS.filter(c => c.rotationId === rotationId && c.pillar === pillar);
}

export function getCardsForDomain(rotationId: string, domain: ADMSEPDomain): StudentCard[] {
  return ALL_CARDS.filter(c => c.rotationId === rotationId && c.domain === domain);
}

// Internal helper used by future content files (conditions, pharmacology) to
// register additional cards into the global registry.
export function _registerCards(cards: StudentCard[]): void {
  for (const c of cards) {
    if (!ALL_CARDS.find(x => x.id === c.id)) ALL_CARDS.push(c);
  }
}

export function _registerDrills(rotationId: string, drills: OSCEDrill[]): void {
  const r = ALL_LEARN_ROTATIONS.find(x => x.id === rotationId);
  if (!r) return;
  if (!r.drills) r.drills = [];
  for (const d of drills) {
    if (!r.drills.find(x => x.id === d.id)) r.drills.push(d);
  }
}

export function _setTexasModule(rotationId: string, ref: TexasModuleRef): void {
  const r = ALL_LEARN_ROTATIONS.find(x => x.id === rotationId);
  if (r) r.texasModule = ref;
}

export function getDrill(rotationId: string, drillId: string): OSCEDrill | undefined {
  const r = getLearnRotation(rotationId);
  return r?.drills?.find(d => d.id === drillId);
}
