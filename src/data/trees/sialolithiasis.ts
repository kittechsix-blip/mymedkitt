import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const SIALOLITHIASIS_NODES: DecisionNode[] = [
  {
    id: 'sialo-start',
    type: 'question',
    module: 1,
    title: 'Meal-related swelling or a dangerous neck infection?',
    body: 'Recurrent pain and swelling under the jaw or in the cheek with meals suggests duct obstruction. Check the floor of mouth, tongue position, swallowing and vital signs before examining the duct. [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Floor-of-mouth elevation, drooling, respiratory distress or systemic toxicity',
        next: 'sialo-danger',
      },
      {
        label: 'Stable airway and localized swelling',
        next: 'sialo-exam',
      },
    ],
  },
  {
    id: 'sialo-danger',
    type: 'result',
    module: 1,
    title: 'Escalate for deep neck infection',
    body: 'Call ENT and the airway team for threatened obstruction. Treat sepsis promptly. If airway stability permits, obtain contrast CT of the neck for deep extension or a drainable abscess. Admit for IV antibiotics and surgical source control as indicated. [Deep neck infection](#/tree/deep-neck-infection). [2]',
    citation: [2],
    recommendation: 'Escalate for deep neck infection',
  },
  {
    id: 'sialo-exam',
    type: 'question',
    module: 1,
    title: 'Examine the gland and duct',
    body: 'Palpate the submandibular duct bimanually along the floor of mouth to the opening beside the frenulum. Inspect the parotid duct opposite the upper second molar. Gently massage toward the papilla and look for saliva, a stone or pus. Assess facial movement and cervical nodes. [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Purulent drainage, fever or tender erythematous gland',
        next: 'sialo-infected',
      },
      {
        label: 'Typical recurrent meal-related symptoms without infection',
        next: 'sialo-stone',
      },
      {
        label: 'Unclear diagnosis, persistent mass or facial weakness',
        next: 'sialo-image',
      },
    ],
  },
  {
    id: 'sialo-image',
    type: 'question',
    module: 1,
    title: 'Localize obstruction or investigate a mass',
    body: 'Ultrasound can identify a stone, duct dilation or a focal lesion. If ultrasound is unrevealing and suspicion persists, CT can localize an occult calculus. Use contrast when evaluating an abscess or deep extension. A fixed mass, facial weakness or suspicious nodes warrants expedited ENT evaluation. [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Uncomplicated obstruction confirmed',
        next: 'sialo-stone',
      },
      {
        label: 'Suppurative infection',
        next: 'sialo-infected',
      },
      {
        label: 'Mass or ongoing uncertainty',
        next: 'sialo-refer',
      },
    ],
  },
  {
    id: 'sialo-stone',
    type: 'info',
    module: 2,
    title: 'Increase salivary flow',
    body: 'Encourage oral hydration, warm compresses and gentle massage toward the duct opening. A sugar-free sour lozenge may stimulate flow if swallowing is safe. Provide analgesia. Uncomplicated obstruction alone does not require antibiotics. Avoid blind instrumentation of the duct. [1][2]',
    citation: [1, 2],
    next: 'sialo-follow',
  },
  {
    id: 'sialo-infected',
    type: 'question',
    module: 2,
    title: 'Treat acute bacterial sialadenitis',
    body: 'Culture expressed pus when available. Cover staphylococci and oral anaerobes, then tailor to culture. For stable adults tolerating oral therapy with appropriate renal function, [amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/sialadenitis) 875/125 mg by mouth twice daily is an option. Individualize duration to severity and response. Review allergy history and local resistance. Add hydration, warm compresses and gentle massage. [2]',
    citation: [2],
    options: [
      {
        label: 'Stable, drinking and reliable for early reassessment',
        next: 'sialo-follow',
      },
      {
        label: 'Systemic illness, failed oral therapy or suspected abscess',
        next: 'sialo-danger',
      },
    ],
  },
  {
    id: 'sialo-follow',
    type: 'result',
    module: 3,
    title: 'Reassess infection and arrange stone follow-up',
    body: 'Arrange early reassessment for infection. Worsening pain, fever, spreading neck swelling, difficulty swallowing or breathing requires urgent reevaluation. Persistent or recurrent obstruction warrants ENT evaluation for sialendoscopy or stone removal. [1][2]',
    citation: [1, 2],
    recommendation: 'Reassess infection and arrange stone follow-up',
  },
  {
    id: 'sialo-refer',
    type: 'result',
    module: 3,
    title: 'Expedite ENT assessment',
    body: 'A persistent discrete mass or facial weakness requires evaluation for neoplasm even if pain occurs with eating. Arrange imaging and specialist review. Reevaluate urgently for new airway symptoms. [2]',
    citation: [2],
    recommendation: 'Expedite ENT assessment',
  },
];

export const SIALOLITHIASIS_MODULE_LABELS = ['Assessment', 'Treatment', 'Disposition'];

export const SIALOLITHIASIS_CRITICAL_ACTIONS = [
  {
    text: 'Escalate floor-of-mouth swelling with airway symptoms.',
    nodeId: 'sialo-danger',
  },
  {
    text: 'Treat suppuration and assess for abscess.',
    nodeId: 'sialo-infected',
  },
  {
    text: 'Expedite evaluation for a persistent mass or facial weakness.',
    nodeId: 'sialo-refer',
  },
];

export const SIALOLITHIASIS_CITATIONS: Citation[] = [
  {
    num: 1,
    text: 'University of Iowa. Sialolithiasis – Radiology. https://iowaprotocols.medicine.uiowa.edu/protocols/sialolithiasis-radiology',
  },
  {
    num: 2,
    text: 'Moore J et al. Approach to sialadenitis. Can Fam Physician. 2023;69:531–536. https://pmc.ncbi.nlm.nih.gov/articles/PMC10426371/',
  },
];
