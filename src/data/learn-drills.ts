// myMedKitt — MedKitt Learn OSCE drills (Phase 6)
// 3 interactive drills — each is a vignette + sequenced multiple-choice steps
// with per-option scoring. Renderer is `components/learn-drill.ts`.

import type { OSCEDrill } from './learn-rotations.js';
import { _registerDrills } from './learn-rotations.js';

// ===================================================================
// Drill 1: Suicide Risk OSCE — C-SSRS Guided
// ===================================================================
const SUICIDE_DRILL: OSCEDrill = {
  id: 'drill-suicide-osce',
  rotationId: 'psychiatry',
  title: 'Suicide Risk OSCE — C-SSRS Guided',
  scenario: 'A 27-year-old presents to the ED after a recent breakup. Triage note: "Doesn\'t want to be here anymore." Vital signs are normal. The patient is sitting on the gurney, dressed appropriately, and is willing to talk.',
  learningObjectives: [
    'Apply the C-SSRS step ladder (passive ideation → active → method → intent → plan).',
    'Identify high-risk responses that escalate disposition.',
    'Counsel on means restriction, especially firearms.',
    'Construct a safety plan WITH the patient.',
    'Determine appropriate disposition based on risk stratification.',
  ],
  estMinutes: 8,
  feedbackInfoPageId: 'drill-suicide-feedback',
  scoringRubric: [],
  steps: [
    {
      id: 's1',
      prompt: 'Your first question is:',
      options: [
        { id: 'a', label: 'Are you suicidal?', correct: false, points: 0, feedback: 'Closed-ended and stigma-loaded; patient may shut down. Use the C-SSRS ladder to start at passive ideation.' },
        { id: 'b', label: 'In the past month, have you wished you were dead or wished you could go to sleep and not wake up?', correct: true, points: 2, feedback: 'C-SSRS Question 1 — passive death wish. Non-judgmental, opens the ladder.' },
        { id: 'c', label: 'Are you planning to kill yourself?', correct: false, points: 0, feedback: 'Skipping ahead to plan/intent before establishing ideation. Patient may feel cornered or judged.' },
        { id: 'd', label: 'Have you ever tried before?', correct: false, points: 0, feedback: 'History of attempt is the strongest single risk factor — but ask AFTER establishing current ideation.' },
      ],
      pearl: 'C-SSRS starts at passive ideation. Climb the ladder one rung at a time so the patient feels heard and you do not skip a level.',
    },
    {
      id: 's2',
      prompt: 'Patient answers "Yes — for the past two weeks I sometimes wish I just wouldn\'t wake up." Next:',
      options: [
        { id: 'a', label: 'Have you actually had thoughts of killing yourself?', correct: true, points: 2, feedback: 'C-SSRS Question 2 — active ideation. The right next rung.' },
        { id: 'b', label: 'Tell me more about that breakup.', correct: false, points: 0, feedback: 'Empathy is good, but you must complete the C-SSRS ladder first before disposition decisions.' },
        { id: 'c', label: 'Do you have access to a gun?', correct: false, points: 0, feedback: 'Means restriction matters, but ask after establishing ideation severity.' },
        { id: 'd', label: 'I think we need to admit you.', correct: false, points: 0, feedback: 'Premature — you do not yet know severity, plan, or intent.' },
      ],
      pearl: 'Severity matters: passive death wish (1) is different from active suicidal ideation (2-5). Climb the ladder.',
    },
    {
      id: 's3',
      prompt: 'Patient answers "Yeah, sometimes. I think about ending it." Next:',
      options: [
        { id: 'a', label: 'Have you been thinking about HOW you might do this?', correct: true, points: 2, feedback: 'C-SSRS Question 3 — method. Critical to risk stratification.' },
        { id: 'b', label: 'Do you have a specific plan?', correct: false, points: 1, feedback: 'Close, but C-SSRS asks about method first, then intent, then plan. Plan = method + intent + specifics.' },
        { id: 'c', label: 'How often do you have these thoughts?', correct: false, points: 0, feedback: 'Frequency matters but is not the next rung — you need to characterize whether thoughts are about a method.' },
        { id: 'd', label: 'I want to talk to your family.', correct: false, points: 0, feedback: 'Patient autonomy and confidentiality first. Family contact comes later, with permission unless imminent danger.' },
      ],
    },
    {
      id: 's4',
      prompt: 'Patient says "I\'ve thought about my dad\'s gun. He keeps it in the closet. I haven\'t taken it out, but I\'ve thought about it." Risk?',
      options: [
        { id: 'a', label: 'Low risk — passive ideation only.', correct: false, points: 0, feedback: 'Patient has identified method (firearm) AND access — this is NOT passive.' },
        { id: 'b', label: 'High risk — active ideation with method and access. C-SSRS severity 3 with means access.', correct: true, points: 3, feedback: 'Correct. Method + access escalates this dramatically. Means restriction is now urgent.' },
        { id: 'c', label: 'Moderate — needs further evaluation.', correct: false, points: 1, feedback: 'You are right that more evaluation is needed, but the firearm access alone elevates this above moderate.' },
        { id: 'd', label: 'Cannot determine without more information.', correct: false, points: 0, feedback: 'You have enough — method identified, access present, ideation active. Act now.' },
      ],
      pearl: 'Firearms account for >50% of US suicide deaths and have an ~85-90% case-fatality rate per attempt. Access alone changes the conversation.',
    },
    {
      id: 's5',
      prompt: 'What is the SINGLE most evidence-based intervention you can offer in this moment?',
      options: [
        { id: 'a', label: 'Means restriction counseling — discuss removing or securing the firearm with a trusted person or storing it off-site.', correct: true, points: 3, feedback: 'Means restriction is the most evidence-based suicide prevention intervention. Reduces lethality of any future attempt and removes the immediate access pathway.' },
        { id: 'b', label: 'Start an SSRI before discharge.', correct: false, points: 0, feedback: 'Antidepressant has black-box for SI in young adults. Even if indicated, it is not the FIRST intervention.' },
        { id: 'c', label: 'Refer to outpatient counseling.', correct: false, points: 1, feedback: 'Will eventually be part of the plan, but does not address the immediate firearm access.' },
        { id: 'd', label: 'Admit involuntarily.', correct: false, points: 0, feedback: 'May be needed, but means restriction can and should happen NOW regardless of disposition.' },
      ],
      pearl: 'Means restriction reduces suicide deaths by 30-50% in studies of household firearm storage and OTC analgesic dose limits. Single highest-impact intervention.',
    },
    {
      id: 's6',
      prompt: 'You ask about prior attempts. Patient says they overdosed on Tylenol 3 years ago, was admitted, but never followed up after discharge. Risk now?',
      options: [
        { id: 'a', label: 'High risk — prior attempt is the strongest single predictor of completed suicide.', correct: true, points: 3, feedback: 'Correct. Plus method available + active ideation = clear high risk requiring psychiatric admission.' },
        { id: 'b', label: 'Old history is less relevant now.', correct: false, points: 0, feedback: 'Wrong — prior attempts are the strongest single risk factor regardless of how recent.' },
        { id: 'c', label: 'Risk depends on severity of prior attempt.', correct: false, points: 1, feedback: 'Severity of past attempt is one factor, but ANY prior attempt elevates risk significantly.' },
        { id: 'd', label: 'Need more details before deciding.', correct: false, points: 0, feedback: 'You already have enough: method, access, prior attempt, active ideation in past 2 weeks.' },
      ],
    },
    {
      id: 's7',
      prompt: 'Disposition?',
      options: [
        { id: 'a', label: 'Discharge with safety plan and outpatient follow-up.', correct: false, points: 0, feedback: 'Active ideation + means + access + prior attempt = high risk requiring inpatient psychiatric admission.' },
        { id: 'b', label: 'Psychiatric admission with 1:1 sitter, lethal means counseling, family contact for firearm removal.', correct: true, points: 3, feedback: 'Correct. High-risk disposition includes inpatient + 1:1 + means restriction + family involvement.' },
        { id: 'c', label: 'Observation in ED for 6 hours.', correct: false, points: 0, feedback: 'Inadequate — high-risk patient with method access needs psychiatric admission.' },
        { id: 'd', label: 'Crisis intervention without admission.', correct: false, points: 0, feedback: 'Crisis intervention is part of admission, not a substitute for it in high-risk patients.' },
      ],
      pearl: 'High-risk disposition: psychiatric admission + 1:1 monitoring + means restriction (firearm removal/secure storage) + family involvement + safety plan documented in chart.',
    },
  ],
};

// ===================================================================
// Drill 2: Capacity OSCE — Appelbaum 4-Prong
// ===================================================================
const CAPACITY_DRILL: OSCEDrill = {
  id: 'drill-capacity-osce',
  rotationId: 'psychiatry',
  title: 'Capacity OSCE — Appelbaum 4-Prong',
  scenario: 'A 73-year-old man on hemodialysis 3×/week for ESRD is refusing further dialysis. He has been on dialysis for 4 years. He says he is "tired of it." His daughter is at the bedside, distraught. The medical team has called you for a capacity evaluation.',
  learningObjectives: [
    'Apply Appelbaum\'s four abilities for decisional capacity.',
    'Probe (vs assume) each ability with specific questions.',
    'Recognize that capacity is decision-specific.',
    'Document the four abilities and the specific decision being assessed.',
  ],
  estMinutes: 8,
  feedbackInfoPageId: 'drill-capacity-feedback',
  scoringRubric: [],
  steps: [
    {
      id: 's1',
      prompt: 'Before entering the room, your single most important framing question is:',
      options: [
        { id: 'a', label: 'Does this patient have capacity?', correct: false, points: 0, feedback: 'Capacity is decision-SPECIFIC. The right question is "capacity for WHICH decision?"' },
        { id: 'b', label: 'Does this patient have capacity to refuse continued dialysis?', correct: true, points: 2, feedback: 'Correct. Capacity is always decision-specific. State the decision explicitly.' },
        { id: 'c', label: 'Is this patient depressed?', correct: false, points: 0, feedback: 'Depression may impair capacity but is not the framing question.' },
        { id: 'd', label: 'Should we honor his refusal?', correct: false, points: 0, feedback: 'That comes after capacity is assessed, not before.' },
      ],
      pearl: 'Capacity assessments are decision-specific: a patient may have capacity to refuse a flu shot and lack capacity to refuse intubation.',
    },
    {
      id: 's2',
      prompt: 'You enter and ask "Tell me what you know about your kidney disease." This probes which Appelbaum ability?',
      options: [
        { id: 'a', label: 'Communicate a choice', correct: false, points: 0, feedback: 'Communicate = expressing a stable choice. This question probes understanding instead.' },
        { id: 'b', label: 'Understand information', correct: true, points: 2, feedback: 'Correct. Understanding = factual comprehension of diagnosis, treatment, and consequences.' },
        { id: 'c', label: 'Appreciate the situation', correct: false, points: 0, feedback: 'Appreciation = applying facts to oneself. Different from understanding facts in general.' },
        { id: 'd', label: 'Reason about options', correct: false, points: 0, feedback: 'Reasoning = manipulating information to reach a decision. Different from baseline understanding.' },
      ],
    },
    {
      id: 's3',
      prompt: 'Patient correctly explains his disease and treatments. Next, you ask "What do you think will happen if you stop dialysis?" Why this question?',
      options: [
        { id: 'a', label: 'Probes appreciation — does he apply the medical facts to himself?', correct: true, points: 2, feedback: 'Correct. Appreciation requires applying general medical knowledge to one\'s own situation. Patients can recite facts and still fail this prong.' },
        { id: 'b', label: 'Probes reasoning — how he weighs consequences.', correct: false, points: 1, feedback: 'Close. This question is more directly probing whether he applies the consequences to himself (appreciation), but reasoning is also touched.' },
        { id: 'c', label: 'Probes communication.', correct: false, points: 0, feedback: 'Communication = expressing a stable choice over time, not understanding consequences.' },
        { id: 'd', label: 'Probes mood.', correct: false, points: 0, feedback: 'May elicit mood symptoms incidentally, but not the primary purpose.' },
      ],
    },
    {
      id: 's4',
      prompt: 'Patient answers "I will die in a few weeks. I know that. I have thought about this for months. My wife passed last year and I am tired." This demonstrates:',
      options: [
        { id: 'a', label: 'Lack of appreciation — must be depressed.', correct: false, points: 0, feedback: 'Acknowledging mortality and having considered the decision over months is appreciation, not lack of it. Depression doesn\'t auto-impair capacity; assess separately.' },
        { id: 'b', label: 'Appreciation intact — applies facts to self, has considered consequences.', correct: true, points: 2, feedback: 'Correct. He has applied medical facts to himself and considered the consequences. This is appreciation.' },
        { id: 'c', label: 'Failed reasoning — making an emotional decision.', correct: false, points: 0, feedback: 'Emotion does not equal failed reasoning. Reasoning fails if logic is incoherent, not if values are emotional.' },
        { id: 'd', label: 'Cannot determine.', correct: false, points: 0, feedback: 'You have enough information — patient is demonstrating clear appreciation.' },
      ],
      pearl: 'A decision can be sad, even tragic, and still demonstrate intact capacity. Capacity is about process, not outcome.',
    },
    {
      id: 's5',
      prompt: 'You ask "Walk me through how you decided this — what mattered most to you?" This probes:',
      options: [
        { id: 'a', label: 'Reasoning — manipulating information weighed against values.', correct: true, points: 2, feedback: 'Correct. Reasoning = how the patient weighs alternatives and reaches a decision based on stable values.' },
        { id: 'b', label: 'Understanding.', correct: false, points: 0, feedback: 'You already established understanding earlier. This probes the next prong.' },
        { id: 'c', label: 'Communicating a choice.', correct: false, points: 0, feedback: 'Communication is about expressing a stable choice — different from explaining how you reached it.' },
        { id: 'd', label: 'Appreciation.', correct: false, points: 1, feedback: 'Some overlap, but "how did you decide?" specifically targets reasoning process.' },
      ],
    },
    {
      id: 's6',
      prompt: 'You should also screen for depression because:',
      options: [
        { id: 'a', label: 'Depression auto-impairs capacity.', correct: false, points: 0, feedback: 'Depression does NOT automatically impair capacity. Many depressed patients retain decisional capacity.' },
        { id: 'b', label: 'Depression CAN impair appreciation and reasoning, especially if untreated, and is reversible — must screen and offer treatment.', correct: true, points: 2, feedback: 'Correct. Depression may distort appreciation ("nothing will help") or reasoning. Reversible — must screen and offer treatment, but does not auto-disqualify.' },
        { id: 'c', label: 'Insurance requires it.', correct: false, points: 0, feedback: 'Clinical, not bureaucratic, reason to screen.' },
        { id: 'd', label: 'It is irrelevant.', correct: false, points: 0, feedback: 'Highly relevant — but does not auto-impair capacity.' },
      ],
      pearl: 'Depression and capacity are separate assessments. A depressed patient may still have capacity. But you must offer treatment because it is reversible.',
    },
    {
      id: 's7',
      prompt: 'Family member says "He must be confused — he has never been one to give up." How does that change your assessment?',
      options: [
        { id: 'a', label: 'Family disagreement = lacks capacity. Override his decision.', correct: false, points: 0, feedback: 'Family disagreement is NOT a criterion for incapacity. Capacity is about the patient\'s abilities, not family agreement.' },
        { id: 'b', label: 'Useful collateral — but capacity is about THIS patient\'s abilities, not family agreement.', correct: true, points: 2, feedback: 'Correct. Family input is useful collateral data, but does not override an autonomous capacious decision.' },
        { id: 'c', label: 'Family overrides patient autonomy.', correct: false, points: 0, feedback: 'Patient autonomy supersedes family preference when capacity is intact.' },
        { id: 'd', label: 'Refer to ethics committee for arbitration.', correct: false, points: 1, feedback: 'Ethics consult can help with conflict, but family disagreement alone does not change the capacity finding.' },
      ],
    },
    {
      id: 's8',
      prompt: 'How do you document the capacity finding?',
      options: [
        { id: 'a', label: '"Patient has capacity. Discharge as planned."', correct: false, points: 0, feedback: 'Inadequate documentation — does not specify decision, abilities probed, or reasoning.' },
        { id: 'b', label: '"Patient has decisional capacity to refuse continued hemodialysis. Demonstrated understanding of ESRD and prognosis, appreciation of consequences (death within weeks), reasoning consistent with stated values, and clear stable communication of choice. Depression screened — PHQ-9 [N], offered SSRI/therapy. Decision honored, palliative care consult."', correct: true, points: 3, feedback: 'Correct. Specifies the decision, names each Appelbaum prong, screens reversible factors, and documents next step.' },
        { id: 'c', label: '"Patient lacks capacity due to family concern."', correct: false, points: 0, feedback: 'Wrong conclusion AND wrong reasoning. Family concern is not capacity criterion.' },
        { id: 'd', label: '"Patient understands risks. Defer decision to family."', correct: false, points: 0, feedback: 'Inappropriate — overrides patient autonomy when capacity is intact.' },
      ],
      pearl: 'Document the four abilities, the specific decision, depression screen, and next step. "Has capacity" alone is not enough.',
    },
  ],
};

// ===================================================================
// Drill 3: SBIRT Brief Intervention
// ===================================================================
const SBIRT_DRILL: OSCEDrill = {
  id: 'drill-sbirt-osce',
  rotationId: 'psychiatry',
  title: 'SBIRT Brief Intervention',
  scenario: 'A 42-year-old presents with chronic low back pain. Routine screening: AUDIT-C score is 7 (men: ≥4 is positive, ≥7 is at-risk). Vital signs normal. Patient does not initiate the alcohol topic. Your task: a brief intervention using motivational interviewing.',
  learningObjectives: [
    'Recognize an at-risk AUDIT-C and initiate the conversation.',
    'Use open-ended, reflective, change-talk-eliciting responses.',
    'Avoid confrontation, lecturing, and "fixing" the patient.',
    'Make a referral decision based on severity.',
  ],
  estMinutes: 6,
  feedbackInfoPageId: 'drill-sbirt-feedback',
  scoringRubric: [],
  steps: [
    {
      id: 's1',
      prompt: 'How do you raise the alcohol topic?',
      options: [
        { id: 'a', label: '"Your AUDIT-C score is 7. That puts you in the at-risk category."', correct: false, points: 1, feedback: 'Score-first framing can feel clinical and detached. MI prefers permission and empathy first.' },
        { id: 'b', label: '"I noticed your screen suggested some drinking. Would it be okay if we talked about that for a few minutes?"', correct: true, points: 3, feedback: 'Correct. Asks permission (engages autonomy), uses tentative language, opens space.' },
        { id: 'c', label: '"You really need to cut down on your drinking."', correct: false, points: 0, feedback: 'Confrontational, premature. Triggers reactance — patient is more likely to defend drinking than change.' },
        { id: 'd', label: 'Skip the topic — back pain is the chief complaint.', correct: false, points: 0, feedback: 'AUDIT-C ≥7 in men is "at-risk" — meaningful intervention opportunity. Brief interventions reduce drinking days even from a primary care visit.' },
      ],
      pearl: 'MI starts with engaging — ask permission, tentative language, no judgment. This sets up everything that follows.',
    },
    {
      id: 's2',
      prompt: 'Patient says "I drink wine in the evening to relax. It\'s not a big deal." Best MI response:',
      options: [
        { id: 'a', label: '"Tell me more about how the wine helps you relax."', correct: true, points: 3, feedback: 'Correct. Open-ended, reflects without judgment, invites elaboration. Builds engagement.' },
        { id: 'b', label: '"Are you aware that 3 glasses of wine per night is heavy drinking?"', correct: false, points: 0, feedback: 'Confrontational and lecturing. Patient becomes defensive.' },
        { id: 'c', label: '"How many glasses?"', correct: false, points: 1, feedback: 'Closed-ended, fact-focused. Better to use open-ended exploration first.' },
        { id: 'd', label: '"Have you tried other relaxation methods?"', correct: false, points: 1, feedback: 'Premature — pushes solutions before understanding the patient\'s perspective.' },
      ],
    },
    {
      id: 's3',
      prompt: 'Patient says "I have 3 glasses with dinner, sometimes more on weekends." Best response:',
      options: [
        { id: 'a', label: '"That\'s above what we consider low-risk. Three drinks per occasion or 14 per week for men is the upper limit."', correct: false, points: 1, feedback: 'Information without permission. MI prefers asking "would it be okay if I shared some information?" first.' },
        { id: 'b', label: '"Would it be okay if I shared some information about how the drinking compares to medical guidelines?" then share if yes.', correct: true, points: 3, feedback: 'Correct. Elicit-Provide-Elicit framework: ask permission, share, then check understanding.' },
        { id: 'c', label: '"You\'re drinking too much."', correct: false, points: 0, feedback: 'Confrontational. Triggers reactance.' },
        { id: 'd', label: '"What\'s your opinion of how much you drink?"', correct: false, points: 2, feedback: 'Reasonable open-ended question — but at this point, sharing factual information (with permission) is more useful.' },
      ],
      pearl: 'MI uses Elicit-Provide-Elicit: ask permission, share information, then check the patient\'s reaction. Avoids "telling at" the patient.',
    },
    {
      id: 's4',
      prompt: 'Patient says "I\'ve thought about cutting back. My back pain has been worse and I think the wine isn\'t helping me sleep." This is:',
      options: [
        { id: 'a', label: 'Resistance.', correct: false, points: 0, feedback: 'Opposite — patient is offering CHANGE TALK. Affirm and explore.' },
        { id: 'b', label: 'Change talk — explore and reinforce it.', correct: true, points: 3, feedback: 'Correct. Patient mentions reasons to change (back pain, sleep). Reflect and elicit more.' },
        { id: 'c', label: 'A stalling tactic.', correct: false, points: 0, feedback: 'No — explicit change talk. This is the goal of MI.' },
        { id: 'd', label: 'Manipulation.', correct: false, points: 0, feedback: 'Patient autonomy — they are sharing genuine ambivalence.' },
      ],
      pearl: 'Change talk = patient-generated reasons to change. The more change talk you elicit, the more likely behavior change. Reinforce, do not lecture.',
    },
    {
      id: 's5',
      prompt: 'Best response to that change talk:',
      options: [
        { id: 'a', label: '"That\'s great! You should join AA."', correct: false, points: 0, feedback: 'Premature jump to action. Reflect first.' },
        { id: 'b', label: '"Tell me more about how the wine and your back pain or sleep are connected for you."', correct: true, points: 3, feedback: 'Correct. Reflective open-ended question — deepens the patient\'s own change talk.' },
        { id: 'c', label: '"Why don\'t you just stop drinking?"', correct: false, points: 0, feedback: 'Confrontational, dismissive of ambivalence.' },
        { id: 'd', label: '"What would your wife think?"', correct: false, points: 1, feedback: 'Pulls in external pressure rather than the patient\'s own motivation. MI focuses on intrinsic motivation.' },
      ],
    },
    {
      id: 's6',
      prompt: 'After exploration, patient says "I\'d like to try cutting back to one or two glasses." Next:',
      options: [
        { id: 'a', label: 'Build a SMART goal with the patient and explore confidence.', correct: true, points: 3, feedback: 'Correct. Specific, Measurable, Attainable, Relevant, Time-bound goal — patient-generated. Then probe confidence and barriers.' },
        { id: 'b', label: '"You should aim for total abstinence."', correct: false, points: 0, feedback: 'Imposes goals. Patient autonomy: harm reduction is a legitimate goal in moderate-risk drinking.' },
        { id: 'c', label: 'Schedule referral to addiction medicine immediately.', correct: false, points: 1, feedback: 'AUDIT-C of 7 with no AUD criteria is at-risk drinking — brief intervention is appropriate. Referral if criteria for AUD or failure of brief intervention.' },
        { id: 'd', label: '"Good luck!" and end the visit.', correct: false, points: 0, feedback: 'Inadequate — no goal, no plan, no follow-up.' },
      ],
    },
    {
      id: 's7',
      prompt: 'Referral decision based on AUDIT-C 7 + brief intervention success?',
      options: [
        { id: 'a', label: 'Brief intervention sufficient + follow-up at next visit. No specialty referral needed unless brief intervention fails or AUD criteria met.', correct: true, points: 3, feedback: 'Correct. SBIRT framework: at-risk drinking gets brief intervention; specialty referral only if AUD diagnosis OR brief intervention fails.' },
        { id: 'b', label: 'Refer to addiction medicine for all positive screens.', correct: false, points: 0, feedback: 'Over-referral. SBIRT is structured to keep brief interventions in primary care for at-risk drinking.' },
        { id: 'c', label: 'Refer to AA.', correct: false, points: 1, feedback: 'AA is one option but is patient choice. AUDIT-C 7 without AUD diagnosis does not require specialty referral.' },
        { id: 'd', label: 'No follow-up needed.', correct: false, points: 0, feedback: 'Follow-up matters — re-screen at next visit, support sustained change.' },
      ],
      pearl: 'SBIRT severity tiers: Screen → Brief Intervention (at-risk) → Brief Treatment (problem drinking) → Referral to Treatment (AUD).',
    },
  ],
};

// Register all drills
_registerDrills('psychiatry', [SUICIDE_DRILL, CAPACITY_DRILL, SBIRT_DRILL]);
