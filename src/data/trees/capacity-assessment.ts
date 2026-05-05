// MedKitt - Capacity Assessment Consult
// Four abilities, MacCAT, documentation framework
// ~14 nodes

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const CAPACITY_ASSESSMENT_CRITICAL_ACTIONS = [
  { text: 'Capacity is decision-specific - assess for THIS decision', nodeId: 'cap-start' },
  { text: 'Capacity != competency (competency is legal, capacity is clinical)', nodeId: 'cap-definitions' },
  { text: 'Four abilities: understand, appreciate, reason, communicate a choice', nodeId: 'cap-aid4' },
  { text: 'Document the specific decision, the process, and your reasoning', nodeId: 'cap-documentation' },
];

export const CAPACITY_ASSESSMENT_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: FUNDAMENTALS
  // =====================================================================

  {
    id: 'cap-start',
    type: 'question',
    module: 1,
    title: 'Capacity Assessment',
    body: '**Why is capacity being questioned?**\n\n**Common triggers:**\n* Refusing recommended treatment\n* Leaving AMA\n* Consenting to high-risk procedure\n* Signing DNR/POLST\n* Psychotic, intoxicated, or delirious\n\n**Key principle:**\n**Capacity is decision-specific** - a patient may have capacity for one decision but not another.\n\n*Example: A patient with mild dementia may have capacity to refuse blood draw but not to refuse life-saving surgery.*',
    options: [
      { label: 'Refusing Treatment', description: 'Patient declining recommended care', next: 'cap-refusing' },
      { label: 'Leaving AMA', description: 'Patient wants to leave against advice', next: 'cap-ama' },
      { label: 'Consenting to Procedure', description: 'Ensuring valid informed consent', next: 'cap-consent' },
      { label: 'End-of-Life Decision', description: 'DNR, hospice, withdrawal of care', next: 'cap-eol' },
    ],
    citation: [1],
    summary: 'Capacity is decision-specific. Identify the specific decision being assessed.',
  },

  {
    id: 'cap-definitions',
    type: 'info',
    module: 1,
    title: 'Capacity vs Competency',
    body: '**Important distinction:**\n\n| Term | Definition | Who Determines |\n|------|------------|----------------|\n| **Capacity** | Clinical ability to make a specific decision | Physician |\n| **Competency** | Legal status to make decisions | Court |\n\n**Key points:**\n* Patients are **presumed to have capacity** until proven otherwise\n* **Diagnosis alone does not determine capacity** (dementia, psychosis, intoxication)\n* A patient who makes a \"bad\" decision may still have capacity\n* Capacity can fluctuate - reassess if condition changes\n* When in doubt, treat the emergency first (implied consent)',
    citation: [1, 2],
    next: 'cap-aid4',
    summary: 'Capacity = clinical (physician). Competency = legal (court). Presume capacity exists.',
  },

  // =====================================================================
  // MODULE 2: ASSESSMENT FRAMEWORK
  // =====================================================================

  {
    id: 'cap-aid4',
    type: 'info',
    module: 2,
    title: 'Four-Abilities Framework',
    body: '**Four abilities required for capacity:**\n\n**1. Understanding**\n* Can the patient describe the condition, recommended treatment, risks/benefits, and alternatives in their own words?\n* *"Can you tell me what we are worried about and what treatment we recommend?"*\n\n**2. Appreciation**\n* Can they apply the information to their own situation?\n* Do they believe the condition and consequences are personally relevant?\n* *"What do you think will happen to you if you leave or decline treatment?"*\n\n**3. Reasoning**\n* Can they compare options and consequences using a coherent process?\n* The decision may be risky or against advice and still have capacity if the reasoning is intact.\n* *"What are the pros and cons of treatment?"*\n* *"Why are you choosing this option?"*\n\n**4. Communication of a choice**\n* Can they state a clear, stable choice?\n* *"What have you decided to do?"*\n\n**Aid4 mapping:** Appreciate = appreciation, Infer = reasoning, Decide = communication, and the "4" informed-consent elements belong under understanding.',
    citation: [2, 3],
    next: 'cap-questions',
    summary: 'Capacity uses four abilities: understanding, appreciation, reasoning, and communication of a stable choice.',
  },

  {
    id: 'cap-questions',
    type: 'info',
    module: 2,
    title: 'Assessment Questions',
    body: '**Structured questions for each domain:**\n\n**Understanding:**\n* *"Can you tell me in your own words what\'s wrong?"*\n* *"What treatment did we recommend?"*\n* *"What might happen without treatment?"*\n\n**Appreciation:**\n* *"Do you believe you have [condition]?"*\n* *"Why do you think we\'re recommending this?"*\n* *"What do you think will happen to YOU?"*\n\n**Reasoning:**\n* *"How did you arrive at your decision?"*\n* *"What made you choose this over the alternatives?"*\n* *"What concerns you about the treatment?"*\n\n**Communication:**\n* *"What is your final decision?"*\n* *(Reassess later)* *"Have you changed your mind?"*',
    citation: [2],
    next: 'cap-assessment',
    summary: 'Structured questions for understanding, appreciation, reasoning, communication.',
  },

  {
    id: 'cap-assessment',
    type: 'question',
    module: 2,
    title: 'Capacity Determination',
    body: '**Assess each four-abilities domain:**\n\n| Domain | Intact? | Notes |\n|--------|---------|-------|\n| **Understanding** of condition/options/risks | [ ] Yes [ ] No | |\n| **Appreciation** of personal relevance | [ ] Yes [ ] No | |\n| **Reasoning** about consequences/alternatives | [ ] Yes [ ] No | |\n| **Communication** of a stable choice | [ ] Yes [ ] No | |\n\n**Capacity present if:** All four abilities are sufficiently intact for this decision\n\n**Lack of capacity if:** A significant, decision-relevant deficit prevents informed decision-making\n\n**Gray zone?** Consider psychiatry consult, ethics consult, or more time to reassess.',
    options: [
      { label: 'Has Capacity', description: 'All four domains intact', next: 'cap-has-capacity' },
      { label: 'Lacks Capacity', description: 'Significant decision-relevant deficit in one or more domains', next: 'cap-lacks-capacity' },
      { label: 'Unclear / Borderline', description: 'Need more assessment', next: 'cap-unclear' },
    ],
    citation: [2, 3],
    summary: 'All four abilities must be sufficiently intact; lack of capacity requires a significant decision-relevant deficit.',
  },

  // =====================================================================
  // MODULE 3: SPECIFIC SCENARIOS
  // =====================================================================

  {
    id: 'cap-refusing',
    type: 'info',
    module: 3,
    title: 'Refusing Treatment',
    body: '**Patient refusing recommended treatment:**\n\n**Higher stakes = higher bar for capacity:**\n* Refusing Tylenol -> low threshold\n* Refusing life-saving surgery -> thorough assessment\n\n**If patient has capacity:**\n* Respect the decision, even if you disagree\n* Document capacity assessment thoroughly\n* Ensure informed refusal (risks of declining)\n* Offer alternatives, follow-up\n\n**If lacks capacity:**\n* Cannot refuse - proceed with surrogate decision-maker\n* Emergency? Treat under implied consent\n\n**Red flags suggesting lack of capacity:**\n* Delusional reasoning\n* Cannot articulate any risks\n* Decision based on hallucinations\n* Dramatic change from prior wishes',
    citation: [1],
    next: 'cap-definitions',
    summary: 'Treatment refusal: higher stakes = higher bar. If has capacity, respect decision.',
  },

  {
    id: 'cap-ama',
    type: 'info',
    module: 3,
    title: 'Leaving AMA',
    body: '**Patient leaving against medical advice:**\n\n**Capacity assessment is REQUIRED before AMA:**\n* Intoxication raises concern but does not automatically remove capacity - assess clinically and reassess when the decision can safely wait\n* Delirious patients generally cannot leave AMA until delirium is addressed\n* Psychiatric patients may require hold if they lack capacity or meet danger/grave disability criteria\n\n**If patient HAS capacity:**\n* They can leave, even if unsafe\n* Document: capacity present, risks explained, offered alternatives\n* Provide discharge instructions, prescriptions, follow-up\n* **AMA does NOT mean "punishment"** - give standard care info\n\n**If patient LACKS capacity:**\n* Cannot leave AMA - they cannot consent to departure\n* May need 1:1 sitter, security\n* Consider medical hold, psych evaluation\n* Restraints only if immediate safety risk',
    citation: [4],
    next: 'cap-definitions',
    summary: 'AMA requires capacity assessment. If lacks capacity, patient cannot leave.',
  },

  {
    id: 'cap-consent',
    type: 'info',
    module: 3,
    title: 'Consenting to Procedure',
    body: '**Ensuring valid informed consent:**\n\n**Elements of informed consent:**\n1. **Disclosure** - nature, risks, benefits, alternatives\n2. **Capacity** - patient can understand and decide\n3. **Voluntariness** - no coercion\n\n**Capacity for consent requires:**\n* Understanding the procedure\n* Appreciating personal relevance\n* Weighing risks vs benefits\n* Communicating a choice\n\n**Special situations:**\n* Minors: parent/guardian consent (except emancipated, emergencies)\n* Non-English speakers: professional interpreter required\n* Intoxicated: delay elective procedures until the patient can clinically demonstrate the four abilities\n* Emergency: implied consent if cannot wait',
    citation: [1, 5],
    next: 'cap-definitions',
    summary: 'Valid consent: disclosure + capacity + voluntariness. Interpreter if needed.',
  },

  {
    id: 'cap-eol',
    type: 'info',
    module: 3,
    title: 'End-of-Life Decisions',
    body: '**DNR, hospice, withdrawal of care:**\n\n**Higher bar for irreversible decisions:**\n* Ensure patient fully understands implications\n* Consider if decision is consistent with values\n* Rule out depression affecting decision-making\n\n**If patient HAS capacity:**\n* Respect their autonomous decision\n* Document thoroughly\n* Involve palliative care if available\n* Ensure family is informed (with patient permission)\n\n**If patient LACKS capacity:**\n* Use advance directive if exists\n* Healthcare proxy / POA makes decision\n* Substituted judgment: what would patient want?\n* Best interest standard if wishes unknown\n\n**Ethics consult** for complex or conflicted cases.',
    citation: [5],
    next: 'cap-definitions',
    summary: 'End-of-life decisions: higher bar, check for depression, use surrogate if lacks capacity.',
  },

  // =====================================================================
  // MODULE 4: OUTCOMES
  // =====================================================================

  {
    id: 'cap-has-capacity',
    type: 'result',
    module: 4,
    title: 'Patient Has Capacity',
    body: '**Patient has decision-making capacity:**\n\n**Next steps:**\n* Respect their autonomous choice\n* Ensure informed decision (risks, benefits, alternatives)\n* Document your assessment\n\n**Documentation should include:**\n* The specific decision being assessed\n* How you assessed understanding, appreciation, reasoning, and communication of a choice\n* Patient\'s responses demonstrating capacity\n* That you believe patient has capacity\n* Risks were discussed and understood\n\n**Even if you disagree with the decision:**\n* Respect patient autonomy\n* Offer alternatives, follow-up\n* Keep the door open for changing their mind',
    recommendation: 'Patient has capacity. Respect autonomous decision. Document assessment thoroughly.',
    confidence: 'recommended',
    summary: 'Patient has capacity - respect decision, document assessment.',
  },

  {
    id: 'cap-lacks-capacity',
    type: 'result',
    module: 4,
    title: 'Patient Lacks Capacity',
    body: '**Patient lacks decision-making capacity:**\n\n**Identify surrogate decision-maker:**\n1. **Healthcare proxy / POA** (if designated)\n2. **Spouse**\n3. **Adult children** (majority if multiple)\n4. **Parents**\n5. **Siblings**\n6. **Other relatives / close friends**\n*(Hierarchy varies by state)*\n\n**Surrogate uses:**\n* **Substituted judgment:** What would patient want?\n* **Best interest:** If wishes unknown\n\n**If emergency and no surrogate available:**\n* Treat under implied consent\n* Document that delay would harm patient\n\n**If surrogate unavailable or disagrees:**\n* Ethics consult\n* Court-appointed guardian (takes time)',
    recommendation: 'Patient lacks capacity. Identify surrogate decision-maker. Use substituted judgment.',
    confidence: 'recommended',
    summary: 'Patient lacks capacity - use surrogate, substituted judgment or best interest.',
  },

  {
    id: 'cap-unclear',
    type: 'info',
    module: 4,
    title: 'Unclear / Borderline Capacity',
    body: '**When capacity is unclear:**\n\n**Options:**\n\n**1. More time:**\n* Repeat assessment when patient is sober, rested, less stressed\n* Intoxication clears, delirium may improve with treatment\n\n**2. Psychiatry consult:**\n* Formal capacity evaluation\n* Especially if underlying psychiatric illness\n* May use MacCAT (MacArthur Competence Assessment Tool)\n\n**3. Ethics consult:**\n* Mediate complex situations\n* Help when family disagrees\n* Clarify ethical frameworks\n\n**4. Court involvement:**\n* Emergency guardianship if urgent\n* Competency hearing for long-term incapacity\n\n**Meanwhile:** Treat emergencies, presume capacity for low-stakes decisions.',
    citation: [3],
    next: 'cap-assessment',
    summary: 'Unclear capacity: wait and reassess, psychiatry consult, ethics consult, or court.',
  },

  {
    id: 'cap-documentation',
    type: 'info',
    module: 4,
    title: 'Documentation',
    body: '**Document your capacity assessment:**\n\n**Include:**\n\n1. **The specific decision** being assessed\n2. **Clinical context** (why capacity was questioned)\n3. **Mental status exam** findings\n4. **Assessment of each ability:**\n   * Understanding: *"Patient stated [X] when asked about condition/treatment/risks"*\n   * Appreciation: *"Patient expressed [Y] about personal impact"*\n   * Reasoning: *"Patient weighed options by considering [Z]"*\n   * Communication: *"Patient consistently chose [decision]"*\n5. **Your conclusion** and reasoning\n6. **What information was provided** to patient\n7. **Signature, date, time**\n\n**Example phrasing:**\n*"In my clinical judgment, this patient [has/lacks] capacity to [specific decision] because [reasoning]."*',
    citation: [1, 2],
    next: 'cap-has-capacity',
    summary: 'Document: specific decision, four-abilities assessment, conclusion with reasoning.',
  },

];

export const CAPACITY_ASSESSMENT_MODULE_LABELS = [
  'Fundamentals',
  'Assessment',
  'Scenarios',
  'Outcomes',
];

export const CAPACITY_ASSESSMENT_CITATIONS: Citation[] = [
  { num: 1, text: 'Appelbaum PS. Clinical practice: Assessment of patients\' competence to consent to treatment. N Engl J Med 2007;357:1834-40.' },
  { num: 2, text: 'Grisso T, Appelbaum PS. Assessing Competence to Consent to Treatment: A Guide for Physicians and Other Health Professionals. Oxford University Press, 1998.' },
  { num: 3, text: 'Palmer BW, Harmell AL. Assessment of healthcare decision-making capacity. Arch Clin Neuropsychol 2016;31:530-40.' },
  { num: 4, text: 'Alfandre DJ. "I\'m going home": Discharges against medical advice. Mayo Clin Proc 2009;84:255-60.' },
  { num: 5, text: 'Lo B. Resolving Ethical Dilemmas: A Guide for Clinicians, 6th ed. Lippincott Williams & Wilkins, 2019.' },
];

export const CAPACITY_ASSESSMENT_NODE_COUNT = CAPACITY_ASSESSMENT_NODES.length;
