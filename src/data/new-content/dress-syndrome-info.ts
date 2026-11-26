import type { InfoPage } from '../info-pages.js';

const T = '#/tree/dress-syndrome/node/';

const CITES = [
  { num: 1, text: 'Brüggen MC, Walsh S, Ameri MM, et al. Management of Adult Patients With Drug Reaction With Eosinophilia and Systemic Symptoms: A Delphi-Based International Consensus. JAMA Dermatol. 2024;160(1):37-44. doi:10.1001/jamadermatol.2023.4450' },
  { num: 2, text: 'Kardaun SH, Sekula P, Valeyrie-Allanore L, et al. Drug reaction with eosinophilia and systemic symptoms (DRESS): an original multisystem adverse drug reaction. Results from the prospective RegiSCAR study. Br J Dermatol. 2013;169(5):1071-1080. doi:10.1111/bjd.12501' },
  { num: 3, text: 'Husain Z, Reddy BY, Schwartz RA. DRESS syndrome: Part I. Clinical perspectives. J Am Acad Dermatol. 2013;68(5):693.e1-14. doi:10.1016/j.jaad.2013.01.033' },
  { num: 4, text: 'Cacoub P, Musette P, Descamps V, et al. The DRESS syndrome: a literature review. Am J Med. 2011;124(7):588-597. doi:10.1016/j.amjmed.2011.01.017' },
  { num: 5, text: 'Nguyen E, Yanes D, Imadojemu S, Kroshinsky D. Evaluation of Cyclosporine for the Treatment of DRESS Syndrome. JAMA Dermatol. 2020;156(6):704-706. doi:10.1001/jamadermatol.2020.0048' },
];

export const DRESS_SYNDROME_INFO_PAGES: Record<string, InfoPage> = {
  'dress-steps': {
    id: 'dress-steps',
    title: 'DRESS Syndrome: Steps',
    subtitle: 'One-screen pathway',
    sections: [
      { heading: '1. Suspect it', body: `[Start here](${T}dress-start): new drug 2 to 8 weeks ago plus fever plus spreading rash. Blisters or mucosal erosions: think SJS/TEN. [2,3]` },
      { heading: '2. Recognize', body: `[Features, culprits and RegiSCAR bands](${T}dress-recognize). [2,3,4]` },
      { heading: '3. Stage', body: `[Baseline labs](${T}dress-workup), then [grade severity](${T}dress-severity). [1,3]` },
      { heading: '4. Stop the culprit', body: 'In every grade, stop the culprit and all non-essential drugs started in the suspect window. [1]' },
      { heading: '5. Treat by grade', body: `[Mild](${T}dress-mild), [moderate](${T}dress-moderate), [severe](${T}dress-severe): systemic steroids with a slow 3 to 6 month taper. [1,5]` },
      { heading: '6. Follow up', body: `[Follow-up](${T}dress-followup) and [disposition](${T}dress-disposition). [1]` },
    ],
    citations: CITES,
  },

  'dress-culprits': {
    id: 'dress-culprits',
    title: 'DRESS: Culprit Drugs',
    subtitle: 'RegiSCAR culprit classes',
    sections: [
      { heading: 'Antiepileptics: 35%', body: 'The largest group in RegiSCAR. Carbamazepine was the most reported drug in one literature review. [2,4]' },
      { heading: 'Allopurinol: 18%', body: 'Second most common culprit in RegiSCAR. [2]' },
      { heading: 'Antimicrobial sulfonamides plus dapsone: 12%', body: '[2]' },
      { heading: 'Other antibiotics: 11%', body: '[2]' },
      { heading: 'Window', body: 'Median latency 22 days (IQR 17 to 31); reviews give 2 to 6 weeks, or 2 to 8 weeks. List every drug started in that window. [2,3]' },
      { heading: 'Related', body: `[Recognize DRESS](${T}dress-recognize)` },
    ],
    citations: CITES,
  },

  'dress-regiscar': {
    id: 'dress-regiscar',
    title: 'DRESS: RegiSCAR Criteria',
    subtitle: 'Criteria and score bands (point values not shown)',
    sections: [
      { heading: 'Criteria scored', body: 'Fever of 38.5 C or higher; lymphadenopathy; eosinophilia; atypical lymphocytes; rash over 50% of body surface area; rash features (at least 2 of facial edema, infiltration, purpura, scaling); skin biopsy suggestive of DRESS; organ involvement; resolution taking 15 days or more; other causes excluded. [2]' },
      { heading: 'Score bands', body: 'Under 2: no case. 2 to 3: possible. 4 to 5: probable. 6 or more: definite. [2]' },
      { heading: 'Points per item', body: 'Not shown here. Use the published RegiSCAR scoring table (Kardaun 2013) for the item-by-item points. [2]' },
      { heading: 'Related', body: `[Recognize DRESS](${T}dress-recognize)` },
    ],
    citations: CITES,
  },

  'dress-syndrome-stop': {
    id: 'dress-syndrome-stop',
    title: 'DRESS Syndrome: Do NOT',
    subtitle: 'Avoid preventable harm',
    sections: [
      { heading: 'Do NOT continue or rechallenge the culprit', body: `Stop it and all non-essential drugs started in the suspect window. [1] [Stop the culprit](${T}dress-severe)` },
      { heading: 'Do NOT give a short steroid burst or rapid taper', body: `DRESS flares as the dose drops (10 to 15% overall; 38% in one series). Taper over 3 to 6 months in severe disease. [1,5] [Slow taper](${T}dress-severe)` },
      { heading: 'Do NOT miss mucosal involvement (SJS/TEN)', body: `Erosions, blisters, skin pain or a positive Nikolsky sign: treat as SJS/TEN until dermatology says otherwise. [3] [Differential](${T}dress-differential)` },
      { heading: 'Do NOT skip follow-up for thyroid and autoimmune disease', body: `Thyroiditis and type 1 diabetes can appear months to about 3 years later. [1] [Follow-up](${T}dress-followup)` },
    ],
    citations: CITES,
  },
};
