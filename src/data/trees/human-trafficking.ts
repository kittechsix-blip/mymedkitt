// MedKitt — Human Trafficking Screening
// ED recognition, safe screening, trauma-informed care, resources
// 6 modules: Recognition → Red Flags → Safe Screening → Response → Resources → Documentation
// ~24 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const HUMAN_TRAFFICKING_CRITICAL_ACTIONS = [
  { text: 'Separate patient from companion for private screening', nodeId: 'ht-separate' },
  { text: 'Screen using trauma-informed questions', nodeId: 'ht-screen' },
  { text: 'Call National Human Trafficking Hotline: 1-888-373-7888', nodeId: 'ht-activate' },
  { text: 'Activate social work and hospital trafficking response team', nodeId: 'ht-activate' },
  { text: 'Mandatory CPS/law enforcement reporting for minors', nodeId: 'ht-minor' },
  { text: 'Do NOT release minor to suspected trafficker', nodeId: 'ht-minor-dispo' },
  { text: 'Document using patient\'s own words in quotes', nodeId: 'ht-documentation' },
  { text: 'Provide resources discretely if patient not ready', nodeId: 'ht-not-ready' },
];

export const HUMAN_TRAFFICKING_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'ht-start',
    type: 'info',
    module: 1,
    title: 'Human Trafficking Screening',
    body: '**Human trafficking occurs in every community** — including yours.\n\n**Definition:** Use of force, fraud, or coercion to exploit a person for labor or commercial sex. For minors, ANY commercial sex is trafficking regardless of force/fraud/coercion.\n\n**Two main types:**\n• **Sex trafficking** — commercial sex acts induced by force, fraud, or coercion\n• **Labor trafficking** — forced labor through similar means\n\n**ED relevance:** 88% of trafficking victims access healthcare while being trafficked, often in EDs. You may be the only person who can help. [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'trafficking-red-flags', label: 'Trafficking Red Flags' },
      { id: 'vera-screen', label: 'VERA Screening Tool' },
      { id: 'safety-assessment', label: 'Safety Assessment' },
      { id: 'hotline-resources', label: 'Hotline & Resources' },
    ],
    next: 'ht-who',
  },

  {
    id: 'ht-who',
    type: 'info',
    module: 1,
    title: 'Who is Affected?',
    body: '**Trafficking affects all demographics:**\n\n**Vulnerable populations:**\n• Runaway/homeless youth\n• LGBTQ+ youth (especially those rejected by family)\n• Foster care involvement\n• History of abuse/neglect\n• Undocumented immigrants\n• Substance use disorders\n• Intellectual/developmental disabilities\n• Economic vulnerability\n\n**Traffickers can be:**\n• Intimate partners\n• Family members\n• Employers\n• "Boyfriends" / Romeo pimps\n• Organized criminal networks\n\n**Both domestic and international** — US citizens are commonly trafficked within the US. [1][2][3]',
    citation: [1, 2, 3],
    next: 'ht-barriers',
  },

  {
    id: 'ht-barriers',
    type: 'info',
    module: 1,
    title: 'Barriers to Disclosure',
    body: '**Why victims don\'t disclose:**\n\n| Barrier | Manifestation |\n|---------|---------------|\n| **Fear** | Of trafficker, law enforcement, deportation |\n| **Shame** | Self-blame, stigma, family rejection |\n| **Distrust** | Of authorities, healthcare providers |\n| **Trauma bonding** | May not see self as victim |\n| **Control** | Trafficker may be present in ED |\n| **Debt bondage** | Believe they owe trafficker money |\n| **Threats** | To self, family members |\n| **Isolation** | No support network, language barriers |\n\n**They may not identify as "trafficked"** — use concrete questions about experiences, not labels. [1][2]',
    citation: [1, 2],
    next: 'ht-red-flags',
  },

  // =====================================================================
  // MODULE 2: RED FLAGS
  // =====================================================================

  {
    id: 'ht-red-flags',
    type: 'info',
    module: 2,
    title: 'Clinical Red Flags',
    body: '**Physical findings:**\n• Multiple STIs, especially in young patients\n• Recurrent UTIs, pelvic pain\n• Signs of physical abuse (bruises, burns, scars)\n• **Tattoos/brands** (names, barcodes, "Daddy")\n• Poor dental health\n• Malnourishment despite appearing well-dressed\n• Untreated chronic conditions\n\n**Pregnancy-related:**\n• Multiple pregnancies, especially in teens\n• No prenatal care\n• Multiple abortions\n• Doesn\'t know gestational age\n\n**Injuries:**\n• Inconsistent with stated mechanism\n• Delayed presentation\n• Multiple stages of healing [1][2][4]',
    citation: [1, 2, 4],
    next: 'ht-behavioral',
  },

  {
    id: 'ht-behavioral',
    type: 'info',
    module: 2,
    title: 'Behavioral Red Flags',
    body: '**Behavioral indicators:**\n\n| Red Flag | What You See |\n|----------|-------------|\n| **Controlling companion** | Answers questions for patient, won\'t leave room |\n| **Scripted responses** | Rehearsed history, inconsistent details |\n| **Fearful demeanor** | Avoids eye contact, hypervigilant |\n| **No control over ID/money** | Someone else holds documents |\n| **Doesn\'t know location** | Can\'t say where they live/work |\n| **Inconsistent history** | Story doesn\'t match presentation |\n| **Older "boyfriend"** | Especially with young patients |\n\n**Work-related:**\n• Long hours, no days off\n• Lives at workplace\n• Owes employer money\n• Not allowed to leave\n• No control over earnings [1][2][3]',
    citation: [1, 2, 3],
    next: 'ht-question',
  },

  {
    id: 'ht-question',
    type: 'question',
    module: 2,
    title: 'Suspicion Assessment',
    body: '**How suspicious are you?**\n\nConsider:\n• Number of red flags present\n• Patient demeanor\n• Controlling companion behavior\n• Inconsistencies in history\n• Your gut feeling\n\n**Trust your instincts** — if something feels wrong, it probably is.\n\n**Remember:** You don\'t need to be certain to screen. Screening is low-risk and may be life-saving. [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'High suspicion — multiple red flags',
        next: 'ht-separate',
        urgency: 'urgent',
      },
      {
        label: 'Moderate suspicion — some concerning features',
        next: 'ht-universal',
      },
      {
        label: 'Low suspicion but vulnerable population',
        next: 'ht-universal',
      },
    ],
  },

  // =====================================================================
  // MODULE 3: SAFE SCREENING
  // =====================================================================

  {
    id: 'ht-separate',
    type: 'info',
    module: 3,
    title: 'Separating from Companion',
    body: '**Safe separation is essential for screening:**\n\n**Strategies:**\n• "It\'s hospital policy to examine patients privately"\n• "We need to take the patient to X-ray/CT"\n• "The patient needs to use the restroom"\n• Have security present but unobtrusive\n\n**If companion resists:**\n• Document the resistance\n• Involve security/social work\n• Do NOT confront the companion\n• Prioritize patient safety\n\n**Never screen in front of the companion** — this puts the patient at risk.\n\n**If unable to separate:** Document the situation and attempt again before discharge. [1][2][5]',
    citation: [1, 2, 5],
    next: 'ht-screen',
  },

  {
    id: 'ht-universal',
    type: 'info',
    module: 3,
    title: 'Universal Screening Approach',
    body: '**Consider routine screening for high-risk presentations:**\n\n**Normalize the questions:**\n> "I ask everyone these questions to make sure they\'re safe..."\n\n**High-yield presentations for screening:**\n• Sexual assault\n• STI evaluation (especially adolescents)\n• Pregnancy in minors\n• Psychiatric complaints in young patients\n• Substance use in young patients\n• Injuries with inconsistent history\n\n**Universal screening removes stigma** — patient doesn\'t feel singled out. [1][2]',
    citation: [1, 2],
    next: 'ht-screen',
  },

  {
    id: 'ht-screen',
    type: 'info',
    module: 3,
    title: 'Screening Questions',
    body: '**Trauma-informed screening:**\n\n**Environment questions:**\n> "Where do you sleep at night?"\n> "Is there anyone who controls where you go?"\n> "Do you feel safe at home?"\n\n**Work questions:**\n> "Can you leave your job if you want to?"\n> "Has anyone ever threatened you to make you work?"\n> "Do you owe your employer money?"\n\n**Control questions:**\n> "Does anyone hold your ID or documents?"\n> "Are you free to come and go as you wish?"\n> "Has anyone ever made you do something you didn\'t want to do?"\n\n**For adolescents:**\n> "Has anyone ever asked you to have sex in exchange for something?"\n> "Has anyone ever taken pictures of you?" [1][2][4]',
    citation: [1, 2, 4],
    next: 'ht-positive',
  },

  {
    id: 'ht-positive',
    type: 'question',
    module: 3,
    title: 'Screening Result',
    body: '**Based on screening:**\n\n**Positive screen indicators:**\n• Answers suggest exploitation\n• Patient discloses trafficking\n• Patient confirms red flag behaviors\n• Patient expresses fear of companion\n\n**Uncertain:**\n• Evasive answers\n• Inconsistent responses\n• Unable to adequately assess\n\n**Negative screen:**\n• No concerning responses\n• Patient denies exploitation\n• Plausible explanations for red flags [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Positive screen — trafficking suspected',
        next: 'ht-response',
        urgency: 'urgent',
      },
      {
        label: 'Uncertain — unable to determine',
        next: 'ht-uncertain',
      },
      {
        label: 'Negative screen',
        next: 'ht-negative',
      },
    ],
  },

  // =====================================================================
  // MODULE 4: RESPONSE
  // =====================================================================

  {
    id: 'ht-response',
    type: 'info',
    module: 4,
    title: 'Responding to Disclosure',
    body: '**Trauma-informed response:**\n\n**DO:**\n• Believe them\n• Stay calm and supportive\n• Emphasize it\'s not their fault\n• Respect their autonomy\n• Offer help but don\'t force it\n• Maintain confidentiality as much as possible\n\n**SAY:**\n> "Thank you for trusting me with this."\n> "This is not your fault."\n> "You deserve to be safe."\n> "There are people who can help if you want."\n\n**DON\'T:**\n• Express shock or judgment\n• Promise outcomes you can\'t guarantee\n• Make them repeat story multiple times\n• Contact law enforcement without consent (unless minor) [1][2][5]',
    citation: [1, 2, 5],
    next: 'ht-wants-help',
  },

  {
    id: 'ht-wants-help',
    type: 'question',
    module: 4,
    title: 'Does Patient Want Help?',
    body: '**Respect their autonomy:**\n\nLeaving a trafficking situation is complex and dangerous. The patient may not be ready.\n\n**If they want help:**\n• Activate resources (social work, advocacy)\n• Safety planning\n• Consider admission for safety if appropriate\n\n**If they don\'t want help:**\n• Respect the decision\n• Provide resources for future use\n• Let them know they can return\n• Do NOT force intervention (except for minors) [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Patient wants help now',
        next: 'ht-activate',
        urgency: 'urgent',
      },
      {
        label: 'Patient not ready for help',
        next: 'ht-not-ready',
      },
      {
        label: 'Patient is a minor',
        next: 'ht-minor',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'ht-activate',
    type: 'info',
    module: 4,
    title: 'Activating Resources',
    body: '**Immediate steps when patient wants help:**\n\n1. **Safety first:**\n   • Keep patient in private area\n   • Do not let companion know\n   • Consider security presence\n\n2. **Activate resources:**\n   • Social work (immediately)\n   • Hospital\'s trafficking response team (if exists)\n   • Contact local anti-trafficking organization\n\n3. **National Hotline:**\n   • **1-888-373-7888** (National Human Trafficking Hotline)\n   • Text "HELP" to 233733 (BeFree)\n   • 24/7, confidential, multiple languages\n\n4. **Safety planning:**\n   • Where will they go?\n   • Emergency shelter?\n   • Law enforcement involvement (patient\'s choice except for minors) [1][2][5]',
    citation: [1, 2, 5],
    next: 'ht-resources',
  },

  {
    id: 'ht-not-ready',
    type: 'info',
    module: 4,
    title: 'Patient Not Ready',
    body: '**When patient isn\'t ready to leave:**\n\n**This is normal and expected.**\n\n**Your role:**\n• Plant seeds for the future\n• Provide resources they can hide\n• Treat their medical needs\n• Let them know the door is always open\n\n**Provide discreetly:**\n• Hotline number (on small card, band-aid wrapper, etc.)\n• Your contact information\n• Information about local resources\n\n**Say:**\n> "I understand you\'re not ready right now. That\'s okay."\n> "Here is a number you can call anytime."\n> "You can always come back here."\n\n**They may need multiple contacts before they\'re ready.** [1][2]',
    citation: [1, 2],
    next: 'ht-resources',
  },

  {
    id: 'ht-minor',
    type: 'info',
    module: 4,
    title: 'Minor Involved',
    body: '**MINORS: Mandatory reporting applies**\n\n**Key points:**\n• ANY commercial sex involving a minor is trafficking (no force/fraud/coercion required)\n• **Mandatory reporting to CPS/law enforcement**\n• Does not require patient consent\n• Document thoroughly\n\n**Process:**\n1. Notify social work immediately\n2. Contact CPS hotline\n3. Law enforcement notification (may be same call)\n4. Keep child safe in hospital\n5. Do NOT release to suspected trafficker\n\n**If trafficker is parent/guardian:**\n• CPS involvement essential\n• May need to involve security/LE to prevent removal\n• Hospital can refuse to release if safety concern [1][2][3]',
    citation: [1, 2, 3],
    next: 'ht-documentation',
  },

  {
    id: 'ht-uncertain',
    type: 'info',
    module: 4,
    title: 'Uncertain Screening',
    body: '**When you\'re not sure:**\n\n**Still provide resources:**\n• Offer information about trafficking hotline\n• Provide domestic violence resources\n• Give return instructions\n\n**Document:**\n• Red flags observed\n• Screening attempted\n• Barriers encountered\n• Resources provided\n\n**Consider:**\n• Admission for observation if medical indication\n• Social work consultation\n• Repeat screening attempt before discharge\n\n**Trust your instincts** — if something feels wrong, involve social work. [1][2]',
    citation: [1, 2],
    next: 'ht-documentation',
  },

  {
    id: 'ht-negative',
    type: 'info',
    module: 4,
    title: 'Negative Screen',
    body: '**When screening is negative:**\n\n**Still document:**\n• That screening occurred\n• Patient\'s responses\n• No indicators identified\n\n**Provide safety resources anyway:**\n• "Here\'s a number anyone can call if they ever feel unsafe"\n• Normalize offering resources\n\n**Return precautions:**\n• If situation changes, come back\n• ED is always available\n\n**Be aware:** Patients may deny trafficking even if it\'s occurring. One negative screen doesn\'t mean never follow up. [1][2]',
    citation: [1, 2],
    next: 'ht-documentation',
  },

  // =====================================================================
  // MODULE 5: RESOURCES
  // =====================================================================

  {
    id: 'ht-resources',
    type: 'info',
    module: 5,
    title: 'Resources',
    body: '**National Resources:**\n\n**National Human Trafficking Hotline:**\n• **1-888-373-7888**\n• Text "HELP" to 233733 (BeFree)\n• Chat: humantraffickinghotline.org\n• 24/7, confidential, 200+ languages\n\n**Other Resources:**\n• **HEAL Trafficking** (healtrafficking.org) — healthcare provider resources\n• **Polaris Project** (polarisproject.org) — comprehensive services\n• **Office for Victims of Crime** — victim services referrals\n• **FBI** — for federal trafficking cases\n\n**Local Resources:**\n• Document your hospital\'s response protocol\n• Know your local anti-trafficking organizations\n• Identify local emergency shelters [1][2][5]',
    citation: [1, 2, 5],
    next: 'ht-documentation',
  },

  // =====================================================================
  // MODULE 6: DOCUMENTATION
  // =====================================================================

  {
    id: 'ht-documentation',
    type: 'info',
    module: 6,
    title: 'Documentation',
    body: '**Document carefully — it may be used legally:**\n\n**Include:**\n• Red flags identified\n• Screening questions asked and responses\n• Physical exam findings (photograph if patient consents)\n• Patient\'s own words (in quotes)\n• Demeanor and affect\n• Companion behavior (if applicable)\n• Resources provided\n• Reporting (CPS, LE if applicable)\n\n**Be specific:**\n• "Patient states boyfriend controls her phone and money"\n• Not: "Possible trafficking victim"\n\n**Confidentiality:**\n• Be aware of who can access records\n• Patient may not want trafficker to know\n• Discuss with patient what will be documented [1][2]',
    citation: [1, 2],
    next: 'ht-disposition',
  },

  {
    id: 'ht-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**Disposition considerations:**\n\n| Scenario | Disposition |\n|----------|-------------|\n| Wants help, resources activated | May need admission for safety |\n| Not ready, safe to discharge | Discharge with resources |\n| Minor with confirmed trafficking | CPS custody, do not release |\n| Uncertain, concerning companion | Consider admission, further assessment |\n\n**Before discharge:**\n• Resources provided\n• Safety plan discussed\n• Follow-up arranged if appropriate\n• Documentation complete [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Admit for safety/resources',
        next: 'ht-admit',
      },
      {
        label: 'Discharge with resources',
        next: 'ht-discharge',
      },
      {
        label: 'Minor — CPS/LE involvement',
        next: 'ht-minor-dispo',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'ht-admit',
    type: 'result',
    module: 6,
    title: 'Admission',
    body: '**Admission for trafficking victim:**\n\n**Medical indication if possible:**\n• May be safer to admit with medical reason\n• Allows time for resource mobilization\n• Keeps patient safe while planning\n\n**In hospital:**\n• Restrict visitor access (block companion)\n• Social work involvement\n• Security awareness\n• Connect with advocacy organizations\n• Plan for safe discharge\n\n**Discharge planning:**\n• Where will they go?\n• Emergency shelter?\n• Family (if safe)?\n• Victim services program? [1][2]',
    recommendation: 'Admit for safety while coordinating resources. Restrict visitor access. Social work essential.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'ht-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge with Resources',
    body: '**Discharging patient not ready for help:**\n\n**Provide discretely:**\n• Hotline number (small, hideable)\n• Your business card\n• Local resource information\n• Safety planning information\n\n**Say:**\n> "The door is always open. You can come back anytime."\n> "Call this number day or night if you need help."\n\n**Document:**\n• Resources provided\n• Patient declined intervention\n• Safety discussion occurred\n\n**Follow-up:**\n• Consider callback if safe\n• Flag chart for future visits [1][2]',
    recommendation: 'Discharge with resources and return instructions. Patient declined intervention at this time.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'ht-minor-dispo',
    type: 'result',
    module: 6,
    title: 'Minor — CPS Involvement',
    body: '**Minor trafficking victim:**\n\n**Required actions:**\n• CPS notification (mandatory)\n• Law enforcement notification\n• **Do NOT release to suspected trafficker**\n\n**Process:**\n1. Keep child safe in hospital\n2. CPS takes custody\n3. Coordinate with law enforcement\n4. Advocate involvement if available\n5. Trauma-informed care throughout\n\n**Documentation critical:**\n• Detailed history\n• Physical findings\n• Photographs (with consent if possible)\n• All communications with CPS/LE [1][2][3]',
    recommendation: 'Mandatory CPS and law enforcement notification. Do NOT release minor to suspected trafficker.',
    confidence: 'definitive',
    citation: [1, 2, 3],
  },

];

export const HUMAN_TRAFFICKING_MODULE_LABELS = [
  'Recognition',
  'Red Flags',
  'Safe Screening',
  'Response',
  'Resources',
  'Documentation',
];

export const HUMAN_TRAFFICKING_CITATIONS: Citation[] = [
  { num: 1, text: 'HEAL Trafficking and Hope for Justice. Protocol Toolkit for Developing a Response to Victims of Human Trafficking. 2021.' },
  { num: 2, text: 'ACEP Policy Statement: Human Trafficking. Ann Emerg Med. 2021.' },
  { num: 3, text: 'National Human Trafficking Hotline. Federal and State Statistics. 2023.' },
  { num: 4, text: 'Lederer LJ, Wetzel CA. The Health Consequences of Sex Trafficking and Their Implications for Identifying Victims. Ann Health Law. 2014;23(1):61-91.' },
  { num: 5, text: 'UpToDate - Identification and care of human trafficking victims in health care settings. 2024.' },
];
