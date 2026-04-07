// MedKitt — Rapid Code Status Conversation
// Communication framework for emergent goals-of-care discussions
// 6 modules: When to Have → Framework → Key Phrases → Common Scenarios → Documentation → Transitions
// ~22 nodes total.
export const CODE_STATUS_CRITICAL_ACTIONS = [
    { text: 'Use "Surprise Question": Would I be surprised if this patient died?', nodeId: 'code-when' },
    { text: 'MAKE A RECOMMENDATION (do not ask "do you want everything?")', nodeId: 'code-recommend' },
    { text: 'Explore patient values: "What matters most to you?"', nodeId: 'code-explore' },
    { text: 'Share prognosis honestly and pause to allow processing', nodeId: 'code-reframe' },
    { text: 'Explain CPR honestly: designed for sudden arrest in otherwise healthy patients', nodeId: 'code-key-phrases' },
    { text: 'Avoid phrases: "withdraw care", "do everything", "give up"', nodeId: 'code-avoid' },
    { text: 'Document: who present, capacity, prognosis shared, values expressed, recommendation made', nodeId: 'code-documentation' },
    { text: 'Communicate code status at ALL handoffs and update EMR orders', nodeId: 'code-transitions' },
];
export const CODE_STATUS_NODES = [
    // =====================================================================
    // MODULE 1: WHEN TO HAVE THE CONVERSATION
    // =====================================================================
    {
        id: 'code-start',
        type: 'info',
        module: 1,
        title: 'Rapid Code Status Conversation',
        body: '**The "code status" conversation is really a goals-of-care conversation** — not just a checklist of procedures to accept or refuse.\n\n**Key Principles:**\n• Focus on what the patient VALUES, not procedures\n• Make a recommendation when appropriate\n• Avoid asking patients to make medical decisions\n• Be honest about prognosis\n• A conversation, not a form to fill out\n\n**Remember:** This is hard. You\'re doing something important. [1][2]',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'surprise-question', label: 'Surprise Question' },
            { id: 'rapid-goc-framework', label: 'Rapid GOC Framework' },
            { id: 'prognostic-disclosure', label: 'Prognostic Phrases' },
            { id: 'dni-documentation', label: 'DNR/DNI Documentation' },
        ],
        next: 'code-when',
    },
    {
        id: 'code-when',
        type: 'question',
        module: 1,
        title: 'When is This Needed?',
        body: '**Situations requiring rapid code status discussion:**\n\n| Situation | Urgency |\n|-----------|--------|\n| Active deterioration / impending arrest | Immediate |\n| ICU admission with poor prognosis | Within hours |\n| Terminal diagnosis, new to patient | Early in visit |\n| Chronic illness with acute decompensation | During ED stay |\n| Patient/family initiates discussion | When ready |\n\n**The "Surprise Question":**\n> "Would I be surprised if this patient died in the next year/month/week?"\n\nIf NO → Goals of care conversation needed. [1][2][3]',
        citation: [1, 2, 3],
        options: [
            {
                label: 'Imminent deterioration — minutes to act',
                next: 'code-rapid',
                urgency: 'critical',
            },
            {
                label: 'Serious illness — time for full conversation',
                next: 'code-framework',
            },
            {
                label: 'Uncertain prognosis — seeking guidance',
                next: 'code-uncertain',
            },
        ],
    },
    {
        id: 'code-rapid',
        type: 'info',
        module: 1,
        title: 'Rapid/Emergent Conversation',
        body: '**When you have seconds to minutes:**\n\n**The 30-Second Conversation:**\n\n"I\'m Dr. [Name]. Your [mother/father/loved one] is very sick. I need to talk with you about what happens if [their] heart stops."\n\n"Based on what I\'m seeing, if we do CPR, I don\'t think it will help [them] survive, and it may cause more suffering. What I\'d recommend is that we focus on keeping [them] comfortable and let [them] die peacefully."\n\n"Is that okay? Do you have questions?"\n\n**Don\'t ask:** "Do you want us to do everything?"\n**Instead make a recommendation** based on medical judgment. [1][2]',
        citation: [1, 2],
        next: 'code-key-phrases',
    },
    // =====================================================================
    // MODULE 2: FRAMEWORK
    // =====================================================================
    {
        id: 'code-framework',
        type: 'info',
        module: 2,
        title: 'Goals-of-Care Framework',
        body: '**VitalTalk/REMAP Framework:**\n\n**R** — Reframe: Set the stage\n> "I wish we were meeting under different circumstances..."\n\n**E** — Expect emotion, explore values\n> "What\'s most important to you right now?"\n> "What gives your life meaning?"\n\n**M** — Map the future\n> "Given what you\'ve told me about what\'s important..."\n\n**A** — Align\n> "It sounds like what matters most is..."\n\n**P** — Plan\n> "Based on that, I\'d recommend..."\n\n**This takes 5-10 minutes when done well.** [1][2][4]',
        citation: [1, 2, 4],
        next: 'code-reframe',
    },
    {
        id: 'code-reframe',
        type: 'info',
        module: 2,
        title: 'Reframe — Setting the Stage',
        body: '**Opening the Conversation:**\n\n**Warning shot:**\n> "I\'m worried about what I\'m seeing today..."\n> "I have some serious news to discuss..."\n\n**Assess understanding:**\n> "What have the doctors told you about your condition?"\n> "What\'s your understanding of where things are?"\n\n**Share prognosis honestly:**\n> "I wish I had better news. The cancer has spread despite treatment."\n> "I\'m worried that [they] may not survive this hospitalization."\n\n**Pause.** Allow silence. Let them process. [1][2]',
        citation: [1, 2],
        next: 'code-explore',
    },
    {
        id: 'code-explore',
        type: 'info',
        module: 2,
        title: 'Explore Values',
        body: '**Understanding What Matters:**\n\n**Key Questions:**\n> "What\'s most important to you as you think about the future?"\n> "What are you hoping for?"\n> "What abilities are so important that you can\'t imagine living without them?"\n> "What would be a fate worse than death for you?"\n\n**For surrogates:**\n> "If [they] could see [themselves] now, what would [they] say?"\n> "What did [they] tell you about what [they\'d] want?"\n> "Knowing [them] as you do, what do you think [they] would choose?"\n\n**Listen more than you talk.** [1][2][4]',
        citation: [1, 2, 4],
        next: 'code-recommend',
    },
    {
        id: 'code-recommend',
        type: 'info',
        module: 2,
        title: 'Make a Recommendation',
        body: '**Doctors SHOULD make recommendations:**\n\n**Do NOT say:**\n> "Do you want us to do everything?"\n> "We can keep trying or we can stop."\n\nThis puts an impossible burden on families and implies false equivalence.\n\n**DO say:**\n> "Based on what you\'ve told me about what\'s important to [them], I\'d recommend..."\n> "Given the situation, I think the best thing we can do is..."\n> "In my medical opinion, CPR would not help [them] and would cause suffering."\n\n**A recommendation is a gift**, not an imposition.\nFamilies often feel relief when given clear guidance. [1][2][5]',
        citation: [1, 2, 5],
        next: 'code-key-phrases',
    },
    // =====================================================================
    // MODULE 3: KEY PHRASES
    // =====================================================================
    {
        id: 'code-key-phrases',
        type: 'info',
        module: 3,
        title: 'Key Phrases',
        body: '**Language That Works:**\n\n**On prognosis:**\n> "I\'m hoping for the best but preparing for the worst."\n> "I wish the situation were different."\n> "I\'m worried this illness is very serious."\n\n**On CPR:**\n> "CPR is designed to restart a heart that stops suddenly in an otherwise healthy person. In [their] situation, it would not restore [them] to health."\n\n**On ventilators:**\n> "The breathing machine can buy time, but it can\'t fix the underlying problem."\n\n**On comfort:**\n> "Allow natural death" (not "withdraw care")\n> "Focus on comfort" (not "do nothing")\n> "We will never abandon you." [1][2][5]',
        citation: [1, 2, 5],
        next: 'code-avoid',
    },
    {
        id: 'code-avoid',
        type: 'info',
        module: 3,
        title: 'Phrases to Avoid',
        body: '**Language That Harms:**\n\n| Avoid | Why | Say Instead |\n|-------|-----|-------------|\n| "Do you want us to do everything?" | Implies CPR = "everything" | Make a recommendation |\n| "Withdraw care" | Implies abandonment | "Shift focus to comfort" |\n| "There\'s nothing more we can do" | Never true | "We\'ll keep you comfortable" |\n| "Fight" or "give up" | War metaphors create guilt | "Allow natural death" |\n| "Coding" (with family) | Medical jargon | "If the heart stops..." |\n| "DNR means we won\'t treat you" | Untrue and frightening | Explain what WILL be done |\n\n**Never ask permission to stop futile treatments.** Make a recommendation. [1][2]',
        citation: [1, 2],
        next: 'code-scenarios',
    },
    // =====================================================================
    // MODULE 4: COMMON SCENARIOS
    // =====================================================================
    {
        id: 'code-scenarios',
        type: 'question',
        module: 4,
        title: 'Common Scenarios',
        body: '**Select the scenario you\'re facing:**',
        options: [
            {
                label: 'Patient with capacity — can speak for self',
                next: 'code-capacity',
            },
            {
                label: 'Surrogate decision-maker',
                next: 'code-surrogate',
            },
            {
                label: 'Family conflict / disagreement',
                next: 'code-conflict',
            },
            {
                label: 'Patient/family wants "everything"',
                next: 'code-everything',
            },
        ],
    },
    {
        id: 'code-capacity',
        type: 'info',
        module: 4,
        title: 'Patient with Capacity',
        body: '**Speaking directly with the patient:**\n\n**Advantages:**\n• Honors autonomy directly\n• Avoids surrogate burden\n• Patient knows their own values\n\n**Approach:**\n1. Assess understanding of illness\n2. Share prognosis honestly\n3. Explore values: "What matters most?"\n4. Make a recommendation\n5. Document carefully\n\n**If patient doesn\'t want to discuss:**\n> "I understand this is hard. I want to respect your wishes. Can you tell me who should make decisions if you become too sick to speak for yourself?"\n\n**Always identify a surrogate** even when patient has capacity. [1][2]',
        citation: [1, 2],
        next: 'code-documentation',
    },
    {
        id: 'code-surrogate',
        type: 'info',
        module: 4,
        title: 'Surrogate Decision-Maker',
        body: '**When the patient can\'t speak for themselves:**\n\n**Key concept: Substituted judgment**\n> "Our goal is to figure out what [they] would want, not what you want for them."\n\n**Questions for surrogates:**\n> "Did [they] ever tell you what [they] would want in a situation like this?"\n> "If [they] could see [themselves] right now, what would [they] say?"\n> "What did [they] value most in life?"\n\n**Relieve the burden:**\n> "You\'re not making this decision — you\'re helping us understand what [they] would want."\n> "Whatever happens, you didn\'t cause this illness."\n\n**Identify the legal decision-maker** (DPOA, next of kin by state law). [1][2][4]',
        citation: [1, 2, 4],
        next: 'code-documentation',
    },
    {
        id: 'code-conflict',
        type: 'info',
        module: 4,
        title: 'Family Conflict',
        body: '**When family members disagree:**\n\n**Strategies:**\n\n1. **Refocus on the patient:**\n   > "Let\'s step back and think about what [patient] would want."\n\n2. **Identify the decision-maker:**\n   > "Who is the person legally authorized to make decisions?"\n\n3. **Hold a family meeting:**\n   • Private room\n   • All stakeholders present (or on phone)\n   • Chaplain/social work if available\n\n4. **Acknowledge the difficulty:**\n   > "This is one of the hardest things families face. You all love [them]."\n\n5. **Time-limited trial:**\n   > "Let\'s try [intervention] for 72 hours and reassess."\n\n**You cannot please everyone.** Focus on the patient. [1][2]',
        citation: [1, 2],
        next: 'code-documentation',
    },
    {
        id: 'code-everything',
        type: 'info',
        module: 4,
        title: '"We Want Everything Done"',
        body: '**When family says "do everything":**\n\n**First, understand why:**\n> "Tell me more about what \'everything\' means to you."\n\nOften they mean:\n• Don\'t give up / keep fighting\n• Don\'t let them suffer\n• Make sure nothing is missed\n\n**Reframe:**\n> "I hear you — you want us to do everything that will help. So do I. What I\'m worried about is doing things that would hurt [them] without helping."\n\n**Be honest:**\n> "CPR is designed for hearts that stop suddenly. In [their] situation, it would not bring [them] back to the life [they] had. It would cause pain without helping."\n\n**Offer alternatives:**\n> "I will promise to do everything that will help. And I won\'t do anything that will only cause suffering." [1][2][5]',
        citation: [1, 2, 5],
        next: 'code-documentation',
    },
    {
        id: 'code-uncertain',
        type: 'info',
        module: 4,
        title: 'Uncertain Prognosis',
        body: '**When you don\'t know the outcome:**\n\n**It\'s okay to say:**\n> "I wish I could tell you exactly what will happen. I can\'t. But I can tell you what I\'m seeing and what I\'m worried about."\n\n**Consider a time-limited trial:**\n> "Let\'s try [intervention] for [48-72 hours]. If we see improvement, we\'ll continue. If not, we\'ll talk again about what makes sense."\n\n**Document the plan:**\n• Clear goals for the trial\n• Specific endpoints\n• Who will reassess and when\n\n**Revisit early and often.** Prognosis becomes clearer with time. [1][2]',
        citation: [1, 2],
        next: 'code-documentation',
    },
    // =====================================================================
    // MODULE 5: DOCUMENTATION
    // =====================================================================
    {
        id: 'code-documentation',
        type: 'info',
        module: 5,
        title: 'Documentation',
        body: '**Document thoroughly — this protects everyone:**\n\n**Include:**\n• Who was present at the conversation\n• Patient\'s capacity (or why surrogate is speaking)\n• Prognosis communicated\n• Values and goals expressed\n• Specific recommendation made\n• Decision reached\n• Questions/concerns addressed\n\n**Code Status Orders:**\n• Full Code\n• DNR/DNI\n• DNR only (intubation acceptable)\n• Comfort measures only / Allow natural death\n\n**Note:** Code status ≠ level of care. DNR patients can still receive aggressive treatment. [1][2]',
        citation: [1, 2],
        next: 'code-polst',
    },
    {
        id: 'code-polst',
        type: 'info',
        module: 5,
        title: 'POLST / MOLST Forms',
        body: '**POLST (Physician Orders for Life-Sustaining Treatment):**\n\n**What it is:**\n• A portable medical order (not an advance directive)\n• Follows patient across settings\n• Signed by physician/NP/PA AND patient/surrogate\n\n**When to complete:**\n• Serious illness with limited life expectancy\n• Clear goals have been established\n• Patient wants decisions documented as orders\n\n**Not appropriate for:**\n• Healthy patients\n• Patients who haven\'t had goals conversation\n• As a substitute for conversation\n\n**POLST does not replace advance directives** — they complement each other. [1][2]',
        citation: [1, 2],
        next: 'code-transitions',
    },
    // =====================================================================
    // MODULE 6: TRANSITIONS
    // =====================================================================
    {
        id: 'code-transitions',
        type: 'question',
        module: 6,
        title: 'Transitions of Care',
        body: '**After the conversation:**\n\n• Communicate code status at all handoffs\n• Update orders in EMR\n• Complete POLST if appropriate\n• Arrange follow-up conversation if goals are uncertain\n\n**For palliative/hospice transitions:**\n• Involve palliative care early if available\n• Hospice can be consulted from ED\n• Don\'t wait until "nothing more can be done"',
        options: [
            {
                label: 'Transition to comfort/hospice',
                next: 'code-comfort',
            },
            {
                label: 'Continue treatment with DNR',
                next: 'code-dnr-treatment',
            },
            {
                label: 'Full code with goals clarified',
                next: 'code-full',
            },
        ],
    },
    {
        id: 'code-comfort',
        type: 'result',
        module: 6,
        title: 'Transition to Comfort',
        body: '**Comfort-focused care:**\n\n**This IS active treatment:**\n• Symptom management (pain, dyspnea, nausea)\n• Emotional support\n• Family presence\n• Dignity and respect\n\n**Do:**\n• Continue medications for comfort\n• Allow family at bedside\n• Consider chaplain/spiritual care\n• Treat distressing symptoms aggressively\n\n**Consider:**\n• Inpatient hospice\n• Home hospice with rapid discharge\n• Inpatient palliative care\n\n**"We will never abandon you."** [1][2]',
        recommendation: 'Transition to comfort-focused care. Continue aggressive symptom management. Support family presence.',
        confidence: 'recommended',
        citation: [1, 2],
    },
    {
        id: 'code-dnr-treatment',
        type: 'result',
        module: 6,
        title: 'DNR with Active Treatment',
        body: '**DNR does not mean "do not treat":**\n\n**Continue as appropriate:**\n• Antibiotics\n• IV fluids\n• Vasopressors (if aligned with goals)\n• Dialysis\n• Surgery\n• ICU admission\n\n**Clarify specific wishes:**\n• Intubation preferences (DNI separate from DNR)\n• Vasopressor preferences\n• Dialysis preferences\n• Feeding tube preferences\n\n**Re-evaluate** as illness progresses. Goals may change. [1][2]',
        recommendation: 'DNR/DNI status does not preclude active treatment. Continue disease-directed therapy as appropriate.',
        confidence: 'recommended',
        citation: [1, 2],
    },
    {
        id: 'code-full',
        type: 'result',
        module: 6,
        title: 'Full Code — Goals Clarified',
        body: '**Full code is appropriate when:**\n\n• Patient/surrogate has clear understanding of prognosis\n• Values align with aggressive intervention\n• Reasonable chance of meaningful recovery\n• Patient prefers to "try everything"\n\n**Document:**\n• That conversation occurred\n• Understanding of prognosis was confirmed\n• Values support full intervention\n• Patient/surrogate voiced preference\n\n**Plan to revisit** if situation changes or patient deteriorates.\n\nFull code is not "default" — it\'s a choice. [1][2]',
        recommendation: 'Full code status confirmed after goals-of-care discussion. Revisit if clinical status changes.',
        confidence: 'recommended',
        citation: [1, 2],
    },
];
export const CODE_STATUS_MODULE_LABELS = [
    'When to Have',
    'Framework',
    'Key Phrases',
    'Common Scenarios',
    'Documentation',
    'Transitions',
];
export const CODE_STATUS_CITATIONS = [
    { num: 1, text: 'VitalTalk. Communication skills training for serious illness. https://www.vitaltalk.org/' },
    { num: 2, text: 'Grudzen CR et al. Emergency Department Goals-of-Care Conversations. Ann Emerg Med. 2016;68(6):740-748.' },
    { num: 3, text: 'Lynn J. The Surprise Question: A prognostic indicator for seriously ill patients. BMJ Supportive & Palliative Care. 2017.' },
    { num: 4, text: 'Back AL et al. Approaching Difficult Communication Tasks in Oncology. CA Cancer J Clin. 2005;55(3):164-177.' },
    { num: 5, text: 'EMCrit - End of Life Conversations in the ED. Weingart S. https://emcrit.org/emcrit/end-of-life/' },
];
