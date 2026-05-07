// myMedKitt — MedKitt Learn info pages
// Reference content surfaced from Learn cards. Lives in its own file so the
// massive global info-pages.ts doesn't get heavier with every Learn build.
// Merged into the global registry by services/info-service.ts.
// ===================================================================
// Texas Chapter 573/574 — emergency detention + commitment
// ===================================================================
const LEARN_TX_MH_CODE = {
    id: 'learn-tx-mh-code',
    title: 'Texas Mental Health Code',
    subtitle: 'Chapter 573 (EDO) · Chapter 574 (Commitment) · Tarasoff in TX',
    shareable: true,
    sections: [
        {
            body: 'Texas Health & Safety Code Chapters 573 and 574 govern involuntary psychiatric detention and commitment in the state. Every clinician seeing psychiatric patients in Texas should know the criteria, timelines, and local pathways. [1][2]',
        },
        {
            heading: '🟦 When does someone meet 573 criteria?',
            body: 'A peace officer or physician may initiate emergency detention when the patient has a **mental illness** AND there is a substantial risk of serious harm to the person or others, including:\n\n• Substantial risk of **serious harm to self** (suicidal acts/plans, severe self-neglect)\n• Substantial risk of **serious harm to others** (homicidal ideation/threats)\n• **Severe deterioration** in the ability to function independently to provide for basic needs (grave disability)\n\nProbable cause must be present and the harm must be imminent unless the person is restrained. [1]',
        },
        {
            heading: '⏱️ The 48-hour clock',
            body: '• The 48-hour detention period begins **at the moment of detention** (officer custody or facility presentation), not at arrival to a psychiatric unit.\n• A **physician\'s certificate of medical examination** must be completed within 24 hours of detention or transport, with clinical findings supporting detention criteria.\n• If continued detention is needed beyond 48 hours, a **court-ordered protective custody hearing** must convert the EDO to a Chapter 574 commitment hearing.\n• Court hearings are held within 72 hours of the protective custody order (excluding weekends/holidays).',
        },
        {
            heading: '🆕 SB 1164 — effective September 1, 2025',
            body: 'SB 1164 (88th Texas Legislature) **broadened officer detention authority** in several ways:\n\n• Officers may detain based on credible information from another person, not only direct observation\n• Telemedicine evaluation now expressly counts toward the physician\'s certificate of medical examination\n• Improved transport coordination between law enforcement and behavioral-health facilities\n\nReview your jurisdiction\'s current standard operating procedure — practice varies between Travis, Bexar, Dallas, Harris, and Tarrant counties. [3]',
        },
        {
            heading: '🟪 Chapter 574 — court-ordered commitment',
            body: 'Chapter 574 governs **court-ordered mental health services** following an EDO or other application:\n\n• **Temporary commitment**: up to 90 days, requires clear-and-convincing evidence of mental illness + likelihood of serious harm to self or others, OR distress + deterioration with inability to function and need for treatment.\n• **Extended commitment**: up to 12 months, requires the above PLUS evidence the patient\'s condition is expected to continue >90 days and the patient has received court-ordered services for at least 60 of the past 12 months.\n• Patient has the right to a jury trial, counsel, and to call/cross-examine witnesses.\n• Outpatient commitment (assisted outpatient treatment) is also available when criteria are met.',
        },
        {
            heading: '⚖️ Tarasoff duty in Texas — read carefully',
            body: '**Texas does NOT have a duty to warn identified third parties of homicidal threats**, per *Thapar v. Zezulka* (Tex. 1999). The court declined to adopt the Tarasoff doctrine.\n\nWhat IS expected in Texas:\n• Clinically reasonable efforts to protect the patient and others from foreseeable harm\n• Documentation of risk assessment and safety planning\n• Initiation of involuntary detention if criteria are met\n• Notification of probate court / mental health authorities for commitment\n• Disclosure to law enforcement is **permitted** (HIPAA exception for serious threat) but not mandated\n\nIf you trained in California or Washington, do NOT default to your home-state Tarasoff workflow when working in Texas — they differ in mandate. Always confirm with your facility\'s risk management and legal counsel for specific cases. [4]',
        },
        {
            heading: '🧠 Capacity vs commitment — they are NOT the same',
            body: '• **Capacity** is a clinical, decision-specific assessment that any physician can make at the bedside (Appelbaum 4 abilities). Hospitalized voluntary or EDO patients can have capacity for individual decisions.\n• **Commitment** (574) is a legal status determined by a court — it does not strip the patient of decisional capacity for non-emergent procedures.\n• A committed patient can still refuse a non-emergent surgery if they have capacity for that specific decision.\n• Substituted decision-making for involuntary medications: requires either emergency criteria, a specific court order under §574.106, or a guardian.',
        },
        {
            heading: '🏥 Local context (Travis County)',
            body: '• **Austin State Hospital** — state psychiatric hospital, primary 574 destination for the region.\n• **Integral Care** — Travis County Local Mental Health Authority (LMHA), coordinates 573 dispositions and outpatient commitment.\n• **Dell Seton Medical Center** — academic ED, frequent EDO origin point; coordinates with Integral Care for transfer.\n• **APD CIT** — Austin Police Department Crisis Intervention Team, primary peace-officer initiator; trained in de-escalation and EDO criteria.\n• **MAP (Medical Access Program)** — Travis County safety-net coverage that affects post-EDO outpatient access.',
        },
        {
            heading: '📋 Steps for the EDO clinician',
            body: '1. Confirm the patient meets one of the three statutory criteria.\n2. Document your clinical findings — quote the patient where useful.\n3. Complete a physician\'s certificate of medical examination (state form OCA-MHMR-573 in most counties).\n4. Document time of detention initiation (the 48-hour clock).\n5. Coordinate transport to the receiving facility (Austin State Hospital, JPS, etc.).\n6. Hand off legal status, risk, and pending tasks to receiving team — closed-loop signout.\n7. If continued involuntary care needed beyond 48h, advise psychiatry team to file 574 application with probate court.',
        },
        {
            heading: '📨 Patient handout — what an emergency hold means',
            body: 'You have been placed on a temporary emergency hold (Texas Code Chapter 573) because we believe you may be at imminent risk of serious harm to yourself or others. This hold can last up to 48 hours so we can keep you safe and offer treatment.\n\n**While you are on this hold:**\n• You will be evaluated by a physician.\n• You can request to speak with a lawyer.\n• Your loved ones can be contacted with your permission.\n• You may receive medications offered to help with anxiety, sleep, or symptoms — these are voluntary unless an emergency arises.\n\n**At the end of the 48 hours, one of three things will happen:**\n1. You will be discharged with outpatient follow-up if criteria for continued detention are not met.\n2. You will be offered voluntary admission for ongoing treatment.\n3. If we believe continued involuntary care is necessary, your team will file for a court hearing under Chapter 574.\n\nAt every step you have the right to ask questions and have your concerns documented.',
        },
    ],
    citations: [
        { num: 1, text: 'Texas Health & Safety Code §573 — Emergency Detention. https://statutes.capitol.texas.gov/Docs/HS/htm/HS.573.htm' },
        { num: 2, text: 'Texas Health & Safety Code §574 — Court-Ordered Mental Health Services. https://statutes.capitol.texas.gov/Docs/HS/htm/HS.574.htm' },
        { num: 3, text: 'Texas SB 1164 (88th Legislature, 2023) — effective September 1, 2025.' },
        { num: 4, text: 'Thapar v. Zezulka, 994 S.W.2d 635 (Tex. 1999) — Texas Supreme Court declined to adopt the Tarasoff duty-to-warn doctrine.' },
        { num: 5, text: 'Appelbaum PS. Assessment of Patients\' Competence to Consent to Treatment. N Engl J Med. 2007;357:1834-1840.' },
    ],
};
// ===================================================================
// Lithium Toxicity bedside reference
// ===================================================================
const LEARN_LITHIUM_TOXICITY = {
    id: 'learn-lithium-toxicity',
    title: 'Lithium Toxicity at the Bedside',
    subtitle: 'Recognition, classification, and dialysis indications',
    sections: [
        {
            body: 'Lithium has a narrow therapeutic index (0.6–1.2 mEq/L). Toxicity is graded by **chronicity** more than absolute level — a chronic level of 1.5 mEq/L can produce more morbidity than an acute one-time peak of 4.0 mEq/L. Treat the patient and the chronicity, not just the number. [1][2]',
        },
        {
            heading: 'Three patterns of toxicity',
            body: '• **Acute** — overdose in lithium-naive or lightly-loaded patient. Tissue lithium is low; serum levels can be high but neuro symptoms relatively mild. GI symptoms predominate (nausea, vomiting, diarrhea).\n• **Acute-on-chronic** — overdose superimposed on a maintenance regimen. Dangerous because tissue lithium is already loaded; symptoms severe out of proportion to acute serum level.\n• **Chronic** — gradual rise from dehydration, drug interaction, or worsening renal function. Most dangerous form. Levels of 1.5–2.5 mEq/L can produce confusion, ataxia, tremor, myoclonus, and seizures. Risk of permanent SILENT syndrome. [3]',
        },
        {
            heading: 'Signs and symptoms by severity',
            body: '• **Mild (1.2–1.5)**: fine tremor, lethargy, mild GI distress.\n• **Moderate (1.5–2.5)**: coarse tremor, ataxia, confusion, slurred speech, myoclonus, hyperreflexia.\n• **Severe (>2.5)**: stupor, coma, seizures, cardiovascular instability, prolonged QT.\n• **SILENT syndrome** (Syndrome of Irreversible Lithium-Effectuated Neurotoxicity) — persistent cerebellar dysfunction, EPS, dementia, brainstem signs. Can occur even after level normalizes, especially after severe chronic toxicity.',
        },
        {
            heading: 'Common precipitants — ALWAYS look for these',
            body: '• Volume contraction: vomiting, diarrhea, fever, heat exposure, diuretic-induced dehydration.\n• **Thiazide diuretics** — increase Li reabsorption in distal tubule.\n• **NSAIDs** — decrease renal blood flow → ↑ Li.\n• **ACE inhibitors / ARBs** — decrease renal Li clearance.\n• Recent dose increase or switch to extended-release formulation.\n• Hyponatremia (encourages compensatory Na+Li reabsorption).\n• Acute kidney injury from any cause.',
        },
        {
            heading: 'Management',
            body: '1. **Stop lithium immediately**.\n2. **IV normal saline** at maintenance + replacement to restore euvolemia and enhance renal clearance. Do NOT use forced diuresis routinely.\n3. **Serial levels q4–6h** until clearly trending down.\n4. **EKG** — look for prolonged QT, T-wave changes.\n5. **Activated charcoal does NOT bind lithium** — only useful for co-ingestants.\n6. **Whole bowel irrigation** — consider for sustained-release ingestions presenting early.\n7. **Hemodialysis** indications:\n  - Level >4.0 mEq/L (acute) regardless of symptoms\n  - Level >2.5 mEq/L (chronic) with neuro symptoms, renal failure, or hemodynamic instability\n  - Severe symptoms regardless of level\n  - Level not declining at >0.5 mEq/L per 12 hours despite IVF\n8. **Post-HD rebound** is the rule, not the exception — lithium re-equilibrates from tissue stores. Recheck level 4–6h after the session and continue HD until stable.',
        },
        {
            heading: 'Disposition',
            body: '• Mild toxicity, asymptomatic, falling level: monitor in observation/medical floor.\n• Moderate symptoms or rising level: ICU/step-down, nephrology consult.\n• Severe / dialysis indications: ICU + emergent HD.\n• After clinical resolution: psychiatry follow-up, consider switching to alternative mood stabilizer if recurrent toxicity or progressive renal disease.',
        },
        {
            heading: 'Pearls',
            body: '• **Lithium reduces suicide risk** in bipolar disorder — independent of mood stabilization. Do not abandon it after a single toxicity episode without weighing risks.\n• **Pregnancy** — Ebstein anomaly risk (~0.05–0.1%, lower than older estimates). Risk-benefit individualized; do not auto-discontinue.\n• **Nephrogenic DI** is a chronic side effect — patients may present with polyuria and dehydration that itself drives toxicity. A vicious cycle.\n• **Hypothyroidism** is the other classic chronic side effect — check TSH annually.',
        },
    ],
    citations: [
        { num: 1, text: 'McKnight RF, Adida M, Budge K, et al. Lithium toxicity profile: a systematic review and meta-analysis. Lancet. 2012;379(9817):721-728.' },
        { num: 2, text: 'Baird-Gunning J, Lea-Henry T, Hoegberg LCG, Gosselin S, Roberts DM. Lithium poisoning. J Intensive Care Med. 2017;32(4):249-263.' },
        { num: 3, text: 'Adityanjee, Munshi KR, Thampy A. The syndrome of irreversible lithium-effectuated neurotoxicity (SILENT). Clin Neuropharmacol. 2005;28(1):38-49.' },
        { num: 4, text: 'Decker BS, Goldfarb DS, Dargan PI, et al. Extracorporeal Treatment for Lithium Poisoning: Systematic Review and Recommendations. Clin J Am Soc Nephrol. 2015;10(5):875-887.' },
    ],
};
// ===================================================================
// Patient handout — Texas EDO (separate so it can be shared standalone)
// ===================================================================
const LEARN_TX_EDO_HANDOUT = {
    id: 'learn-tx-edo-handout',
    title: 'What an Emergency Hold Means',
    subtitle: 'Patient information — Texas emergency psychiatric detention',
    shareable: true,
    sections: [
        {
            body: 'You have been placed on a temporary emergency hold under Texas Code Chapter 573. This is sometimes called an "EDO" (Emergency Detention Order). It can last up to 48 hours so the medical and psychiatric team can keep you safe and offer you treatment.',
        },
        {
            heading: 'Why this hold was placed',
            body: 'A physician or peace officer believes there is a substantial risk that:\n• You may seriously harm yourself, OR\n• You may seriously harm someone else, OR\n• You are not currently able to provide for your basic needs (food, water, shelter, safety) because of how you are feeling right now.\n\nThis is a temporary, time-limited assessment — not a permanent commitment.',
        },
        {
            heading: 'Your rights during the hold',
            body: '• You will be evaluated by a physician.\n• You may request to speak with a lawyer at any time.\n• You may have your loved ones contacted with your permission.\n• You may decline non-emergency medications. We will discuss any medications offered.\n• You may ask questions and have your concerns documented in your chart.\n• You will be treated with dignity and respect.',
        },
        {
            heading: 'What happens next',
            body: 'At the end of the 48 hours, one of three things will happen:\n\n1. **You will be discharged** with outpatient follow-up if continued hospital care is not needed.\n2. **You will be offered voluntary admission** for ongoing treatment if you and the team agree it would help.\n3. **A court hearing** will be scheduled (Chapter 574) if the team believes continued involuntary care is necessary. You will have an attorney and the right to be heard.',
        },
        {
            heading: 'Resources',
            body: '• **National Suicide & Crisis Lifeline**: 988 (call or text)\n• **Crisis Text Line**: text HOME to 741741\n• **Integral Care (Travis County) 24/7 crisis line**: 512-472-HELP (4357)\n• **NAMI Texas**: 1-800-950-6264 (M–F 10am–10pm CT)\n\nIf you have questions about your rights, ask any member of your care team to connect you with patient advocacy or social work.',
        },
    ],
    citations: [
        { num: 1, text: 'Texas Health & Safety Code §573 — Emergency Detention.' },
    ],
};
// ===================================================================
// OSCE drill debrief pages
// ===================================================================
const DRILL_SUICIDE_FEEDBACK = {
    id: 'drill-suicide-feedback',
    title: 'Suicide Risk OSCE — Debrief',
    subtitle: 'C-SSRS, means restriction, and high-risk disposition',
    sections: [
        {
            body: 'A high-yield framework you should walk through every time you assess for suicide risk. The C-SSRS ladder is structured for a reason — each rung gives you actionable information about the next step.',
        },
        {
            heading: 'The C-SSRS ladder',
            body: '1. **Wish you were dead** (passive ideation, severity 1)\n2. **Active suicidal thoughts** (severity 2)\n3. **Suicidal thoughts with method, no intent or plan** (severity 3)\n4. **Suicidal intent without specific plan** (severity 4)\n5. **Suicidal intent with specific plan** (severity 5)\n\nClimb the ladder one rung at a time. Stop and use that severity for risk stratification along with method access, prior attempts, and protective factors.',
        },
        {
            heading: 'Means restriction is the highest-impact intervention',
            body: 'Means restriction is the most evidence-based suicide prevention intervention available to clinicians. [1][2]\n\n• Reduces lethality of any future attempt\n• Removes the immediate access pathway during the highest-risk period\n• Should be discussed at EVERY suicide risk encounter — including discharges with safety plans\n• Especially important for firearms, which account for >50% of US suicide deaths and have ~85-90% case-fatality per attempt',
        },
        {
            heading: 'When to admit',
            body: 'High-risk features that justify psychiatric admission:\n• Severity 4-5 (active intent ± plan)\n• Recent suicidal behavior (attempt, interrupted, aborted, preparatory) in past 3 months\n• Method + access (especially firearms)\n• Prior attempt (strongest single risk factor)\n• Severe psychiatric or medical illness\n• Intoxication that prevents clearance for safe outpatient follow-up\n• Inadequate outpatient resources or social support',
        },
        {
            heading: 'Safety planning if discharging',
            body: 'A safety plan is collaborative — built WITH the patient, not FOR them.\n\n• Warning signs the patient can identify\n• Internal coping strategies (distraction, self-soothing)\n• Social contacts and settings for support\n• People to ask for help\n• Professionals/agencies to contact in crisis (988, Crisis Text Line)\n• Means restriction commitment (firearms, medications, other lethal means)\n\nDocument the safety plan, give the patient a written copy, and confirm follow-up within 1 week.',
        },
    ],
    citations: [
        { num: 1, text: 'Mann JJ, Apter A, Bertolote J, et al. Suicide prevention strategies: a systematic review. JAMA. 2005;294(16):2064-2074.' },
        { num: 2, text: 'Anestis MD, Khazem LR, Law KC. Differentiating suicide decedents who died using firearms from those who died using other means. Psychiatry Res. 2015;230(3):725-727.' },
        { num: 3, text: 'Posner K, Brown GK, Stanley B, et al. The Columbia-Suicide Severity Rating Scale (C-SSRS). Am J Psychiatry. 2011;168(12):1266-1277.' },
    ],
};
const DRILL_CAPACITY_FEEDBACK = {
    id: 'drill-capacity-feedback',
    title: 'Capacity OSCE — Debrief',
    subtitle: 'Appelbaum 4-prong assessment of decisional capacity',
    sections: [
        {
            body: 'Capacity is decision-specific, clinical, and any physician can assess it. Use Appelbaum\'s four abilities every time. [1]',
        },
        {
            heading: 'Appelbaum\'s four abilities',
            body: '1. **Communicate a choice** — express a stable, consistent preference\n2. **Understand information** — factual comprehension of the diagnosis, treatment, and consequences\n3. **Appreciate the situation** — apply general medical facts to one\'s own circumstances\n4. **Reason about options** — weigh alternatives based on stable values\n\nProbe each ability with specific questions. Do not assume.',
        },
        {
            heading: 'Capacity is decision-specific',
            body: 'A patient may have capacity to refuse a flu shot but lack capacity to refuse intubation in an emergency. The threshold scales with the stakes:\n\n• Higher stakes (death, irreversible harm) → higher threshold\n• Lower stakes (minor procedure) → lower threshold\n\nThis is the "sliding scale" of capacity. State the SPECIFIC decision in your assessment.',
        },
        {
            heading: 'Capacity vs competence',
            body: '• **Capacity** is clinical, situation-specific, assessed by any physician at the bedside.\n• **Competence** is legal, global, determined by a court.\n\nA patient on involuntary psychiatric commitment (Texas Chapter 574) can still have capacity for medical decisions.',
        },
        {
            heading: 'Documentation that holds up',
            body: 'A capacity note should specify:\n• The decision being assessed (specifically)\n• What was discussed with the patient\n• Each of the four abilities — what you asked and what the patient said\n• Reversible factors screened (depression, delirium, intoxication, anxiety)\n• Conclusion and next step\n\nNever write "patient lacks capacity" without specifying the decision and the ability that is impaired.',
        },
        {
            heading: 'Common misconceptions',
            body: '• Diagnosis ≠ incapacity — schizophrenia, depression, BPD do not auto-impair capacity.\n• Family disagreement ≠ incapacity — capacity is about the patient\'s abilities.\n• Bad decisions ≠ incapacity — patients can make decisions you disagree with and still have capacity.\n• Refusal of recommended treatment ≠ incapacity — autonomy includes the right to refuse.',
        },
    ],
    citations: [
        { num: 1, text: 'Appelbaum PS. Assessment of patients\' competence to consent to treatment. N Engl J Med. 2007;357(18):1834-1840.' },
        { num: 2, text: 'Grisso T, Appelbaum PS. Assessing Competence to Consent to Treatment: A Guide for Physicians and Other Health Professionals. Oxford University Press; 1998.' },
    ],
};
const DRILL_SBIRT_FEEDBACK = {
    id: 'drill-sbirt-feedback',
    title: 'SBIRT Brief Intervention — Debrief',
    subtitle: 'Motivational interviewing for at-risk substance use',
    sections: [
        {
            body: 'SBIRT — Screening, Brief Intervention, Referral to Treatment — is the evidence-based framework for addressing at-risk substance use in any clinical encounter. Brief interventions reduce drinking days even from a single primary care visit. [1]',
        },
        {
            heading: 'The MI spirit (PACE)',
            body: '• **Partnership**: collaboration, not expert-on-novice\n• **Acceptance**: respect autonomy and worth\n• **Compassion**: prioritize the patient\'s welfare\n• **Evocation**: draw out the patient\'s own reasons to change\n\nMI is a way of being with the patient, not a script.',
        },
        {
            heading: 'OARS — the four core MI skills',
            body: '• **Open-ended questions** ("Tell me about...")\n• **Affirmations** (recognize strengths and effort)\n• **Reflective listening** (deepens understanding, evokes change talk)\n• **Summarizing** (transitions, highlights change talk)',
        },
        {
            heading: 'Change talk vs sustain talk',
            body: '**Change talk** — patient-generated reasons to change. The more change talk you elicit, the more likely actual behavior change.\n• "I worry about my health."\n• "I want to be there for my kids."\n• "Sleep would be better."\n\n**Sustain talk** — patient reasons NOT to change. Reflect, do not argue.\n\nGoal: create an environment where the patient hears their OWN reasons to change.',
        },
        {
            heading: 'Elicit-Provide-Elicit',
            body: 'When sharing information:\n1. **Elicit** — ask permission, ask what they already know\n2. **Provide** — share the information neutrally\n3. **Elicit** — ask their reaction, what it means to them\n\nThis avoids "telling at" the patient and respects autonomy.',
        },
        {
            heading: 'SBIRT severity tiers',
            body: '• **Screen positive, low-risk** → brief feedback, re-screen at next visit\n• **At-risk** (AUDIT-C 4+ men / 3+ women) → brief intervention\n• **Problem drinking** (more frequent positives, mild AUD) → brief treatment (4-6 sessions)\n• **AUD** → referral to specialty treatment + MAT\n\nNot every positive screen needs a specialty referral — much of this stays in primary care.',
        },
        {
            heading: 'Things to avoid',
            body: '• Confrontation ("You\'re drinking too much.")\n• Lecturing ("Did you know alcohol causes cancer?")\n• Premature solutions ("Just go to AA.")\n• Closed-ended interrogation ("How many drinks per day exactly?")\n• Judgment ("Why would you do that?")\n\nThese trigger reactance — patient defends drinking instead of considering change.',
        },
    ],
    citations: [
        { num: 1, text: 'SAMHSA. Screening, Brief Intervention, and Referral to Treatment (SBIRT). https://www.samhsa.gov/sbirt' },
        { num: 2, text: 'Miller WR, Rollnick S. Motivational Interviewing: Helping People Change. 3rd ed. Guilford Press; 2013.' },
        { num: 3, text: 'Bertholet N, Daeppen JB, Wietlisbach V, et al. Reduction of alcohol consumption by brief alcohol intervention in primary care. Arch Intern Med. 2005;165(9):986-995.' },
    ],
};
// ===================================================================
// Public registry
// ===================================================================
export const LEARN_INFO_PAGES = {
    'learn-tx-mh-code': LEARN_TX_MH_CODE,
    'learn-tx-edo-handout': LEARN_TX_EDO_HANDOUT,
    'learn-lithium-toxicity': LEARN_LITHIUM_TOXICITY,
    'drill-suicide-feedback': DRILL_SUICIDE_FEEDBACK,
    'drill-capacity-feedback': DRILL_CAPACITY_FEEDBACK,
    'drill-sbirt-feedback': DRILL_SBIRT_FEEDBACK,
};
export function getAllLearnInfoPages() {
    return Object.values(LEARN_INFO_PAGES);
}
