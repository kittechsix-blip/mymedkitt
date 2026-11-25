import type { InfoPage } from '../info-pages.js';

const T = '#/tree/lyme-disease/node/';

const CITES = [
  { num: 1, text: 'Lantos PM, Rumbaugh J, Bockenstedt LK, et al. Clinical Practice Guidelines by IDSA, AAN, and ACR: 2020 Guidelines for the Prevention, Diagnosis and Treatment of Lyme Disease. Clin Infect Dis. 2021;72(1):e1-e48.' },
  { num: 2, text: 'CDC. Lyme Carditis (Clinical Care). cdc.gov/lyme/hcp/clinical-care/lyme-carditis.html' },
  { num: 3, text: 'CDC. Erythema Migrans / Neurologic Lyme / Lyme Arthritis clinical care pages. cdc.gov/lyme/hcp/clinical-care/' },
  { num: 4, text: 'CDC. Caring for Patients after a Tick Bite (2021) and Prophylaxis poster.' },
  { num: 5, text: 'CDC. Lyme Disease Diagnosis and Testing. cdc.gov/lyme/hcp/diagnosis-testing/' },
  { num: 6, text: 'Kusumoto FM, Schoenfeld MH, et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay. Circulation. 2019;140:e382-e482.' },
  { num: 7, text: 'Besant G, Wan D, Yeung C, et al. Suspicious index in Lyme carditis: systematic review and proposed new risk score. Clin Cardiol. 2018;41(12):1611-1616.' },
  { num: 8, text: 'Yeung C, Baranchuk A. Diagnosis and Treatment of Lyme Carditis: JACC Review Topic of the Week. J Am Coll Cardiol. 2019;73(6):717-726.' },
  { num: 9, text: 'Biggs HM, et al. Diagnosis and Management of Tickborne Rickettsial Diseases. MMWR Recomm Rep. 2016;65(2):1-44.' },
];

export const LYME_DISEASE_INFO_PAGES: Record<string, InfoPage> = {
  'lyme-steps': {
    id: 'lyme-steps',
    title: 'Lyme Disease: Steps',
    subtitle: 'One-screen pathway',
    sections: [
      { heading: '1. Match the stage', body: `[Start here](${T}lyme-start): tick bite, expanding rash, nerve, heart, joint, or symptoms after treatment. [1]` },
      { heading: '2. Tick bite', body: `[High-risk bite?](${T}lyme-tick-bite) Ixodes, endemic area, attached 36 h or more, removed within 72 h, no contraindication: doxycycline 200 mg once. Otherwise watch 30 days. [1,4]` },
      { heading: '3. Rash', body: `[Erythema migrans](${T}lyme-em) is a clinical diagnosis; no serology. [Treat](${T}lyme-em-treatment) with oral doxycycline, amoxicillin or cefuroxime. [1,3,5]` },
      { heading: '4. Heart: never miss it', body: `[Lyme carditis](${T}lyme-carditis-recognize): ECG and telemetry. Severe means admit, IV ceftriaxone now, temporary pacing if unstable, no acute permanent pacemaker. [1,2,6,8]` },
      { heading: '5. Nerve and joint', body: `[Neurologic Lyme](${T}lyme-neuro) and [Lyme arthritis](${T}lyme-arthritis). [1,3]` },
      { heading: '6. Test and finish', body: `[Testing](${T}lyme-testing) only when appropriate; [after treatment](${T}lyme-ptlds) no extra antibiotics; [disposition](${T}lyme-disposition). [1,5]` },
    ],
    citations: CITES,
  },

  'lyme-atlas': {
    id: 'lyme-atlas',
    title: 'Lyme: Rash & Tick Atlas',
    subtitle: 'Erythema migrans appearances, tick stages, engorged tick, high-risk-bite checklist',
    sections: [
      {
        heading: 'Classic erythema migrans',
        body: 'Expanding red ring, sometimes with central clearing. Only a minority look like a target. [1,3]',
        image: {
          src: 'images/lyme-disease/em-classic.jpg',
          alt: 'Classic erythema migrans: expanding red ring with central clearing on an upper arm',
          caption: 'Photo: James Gathany, CDC PHIL #9874, public domain.',
        },
      },
      {
        heading: 'Solid erythema migrans',
        body: 'A uniformly red expanding patch is common. Do not wait for a bull\'s-eye to treat. [1,3]',
        image: {
          src: 'images/lyme-disease/em-solid.jpg',
          alt: 'Solid, uniformly red erythema migrans rash on the neck without central clearing',
          caption: 'Photo: Boyce RM et al., Emerg Infect Dis 2024, public domain (CDC journal).',
        },
      },
      {
        heading: 'Fading and faint erythema migrans (about 8 weeks old)',
        body: 'Older or faint lesions can be subtle and patchy. [1]',
        image: {
          src: 'images/lyme-disease/em-late.jpg',
          alt: 'Faint patchy red erythema migrans on the thigh about 8 weeks after onset',
          caption: 'Photo: Mikael Häggström, CC0 (via Wikimedia Commons).',
        },
      },
      {
        heading: 'Atypical erythema migrans',
        body: 'Atypical, irregular or blotchy EM still counts. Multiple EM lesions mean disseminated disease. [1,3]',
        image: {
          src: 'images/lyme-disease/em-atypical.jpg',
          alt: 'Atypical erythema migrans one week after initial presentation',
          caption: 'Photo: Mikael Häggström, CC0 (via Wikimedia Commons).',
        },
      },
      {
        heading: 'Tick life stages',
        body: 'Nymphs (under 2 mm) cause most infections and are easy to miss. [4]',
        image: {
          src: 'images/lyme-disease/tick-stages.jpg',
          alt: 'Blacklegged tick Ixodes scapularis adult female, adult male, nymph and larva beside a ruler and a dime',
          caption: 'Blacklegged tick life stages with scale. Image: CDC, public domain.',
        },
      },
      {
        heading: 'Engorged tick',
        body: 'A swollen, rounded tick has been feeding a long time; a flat unfed tick is unlikely to have transmitted. Attachment of 36 hours or more is one criterion for prophylaxis. [4]',
        image: {
          src: 'images/lyme-disease/tick-engorged.jpg',
          alt: 'Engorged adult deer tick, swollen and rounded after feeding',
          caption: 'Photo: NIAID, CC BY 2.0 (via Wikimedia Commons).',
        },
      },
      {
        heading: 'High-risk-bite checklist (all must be true)',
        body: '• Ixodes (blacklegged) tick, adult or nymph\n• Highly endemic area (or more than 20% of ticks infected per CDC)\n• Attached 36 hours or more\n• 72 hours or less since removal\n• No doxycycline contraindication\n\nAll met: [prophylaxis](' + T + 'lyme-prophylaxis). Otherwise [watch](' + T + 'lyme-bite-watch). [1,4]',
      },
      {
        heading: 'Image credits',
        body: '• Classic EM: James Gathany, CDC PHIL #9874, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bullseye_rash_linked_to_Lyme_disease.jpg), public domain. Downscaled.\n• Solid EM: Boyce RM, Pretsch P, Tyrlik K, Schulz A, Giandomenico DA, Barbarin AM, Williams C. Emerg Infect Dis 2024, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Solid_erythema_migrans_rash_on_the_neck_of_a_woman_with_Lyme_disease.jpg), public domain. Cropped by the Commons uploader.\n• Faint EM (about 8 weeks): Mikael Häggström, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Approximately_8_weeks_old_erythema_migrans_on_the_thigh.jpg), [CC0](https://creativecommons.org/publicdomain/zero/1.0/). Downscaled.\n• Atypical EM: Mikael Häggström, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Atypical_erythema_migrans_1_week_after_initial_presentation.jpg), [CC0](https://creativecommons.org/publicdomain/zero/1.0/). Downscaled.\n• Tick life stages: CDC, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Deer_tick_Ixodes_scapularis.jpg), public domain. Unmodified.\n• Engorged tick: NIAID, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Engorged_Adult_Deer_Tick_(33651733580).jpg), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). Downscaled.',
      },
    ],
    citations: CITES,
  },

  'lyme-rx-guide': {
    id: 'lyme-rx-guide',
    title: 'Lyme: Rx Guide',
    subtitle: 'Adult and child doses by stage',
    sections: [
      {
        heading: 'Tick bite prophylaxis (high-risk bite only)',
        body: 'Adult: doxycycline 200 mg PO once.\nChild under 45 kg: doxycycline 4.4 mg/kg PO once (max 200 mg).\nDoes not prevent anaplasmosis, babesiosis, ehrlichiosis or RMSF. [1,4]\n\n[Doxycycline card](#/drug/doxycycline/Lyme prophylaxis after high-risk tick bite)',
      },
      {
        heading: 'Early localized: erythema migrans',
        body: 'Adult: doxycycline 100 mg BID x 10 days (IDSA; CDC 10 to 14 days); amoxicillin 500 mg TID x 14 days; cefuroxime 500 mg BID x 14 days.\nChild: doxycycline 4.4 mg/kg/day divided BID (max 100 mg/dose); amoxicillin 50 mg/kg/day divided TID (max 500 mg/dose); cefuroxime 30 mg/kg/day divided BID (max 500 mg/dose).\nPregnancy: amoxicillin or cefuroxime. Azithromycin is second-line and less effective. [1,3]',
      },
      {
        heading: 'Facial palsy',
        body: 'Adult: doxycycline 100 mg PO BID x 14 to 21 days. Child: 4.4 mg/kg/day divided BID (max 100 mg/dose). [1,3]',
      },
      {
        heading: 'Meningitis or radiculoneuritis',
        body: 'Adult: doxycycline 200 mg/day PO in 1 to 2 doses, or ceftriaxone 2 g IV daily, for 14 to 21 days. Child: ceftriaxone 50 to 75 mg/kg IV daily (max 2 g). Parenchymal CNS disease: IV ceftriaxone 2 g daily and ID consult. [1,3]',
      },
      {
        heading: 'Carditis',
        body: 'Severe: ceftriaxone 2 g IV daily (child 50 to 75 mg/kg, max 2 g), started now without waiting for serology; oral step-down (doxycycline 100 mg BID, amoxicillin or cefuroxime) once block and symptoms resolve; total 14 to 21 days.\nMild: oral doxycycline 100 mg BID (or amoxicillin or cefuroxime) 14 to 21 days. [1,2]\n\n[Ceftriaxone card](#/drug/ceftriaxone/Lyme carditis (severe))',
      },
      {
        heading: 'Arthritis',
        body: 'Oral x 28 days: doxycycline 100 mg BID, amoxicillin 500 mg TID, or cefuroxime 500 mg BID (child dosing as EM; under 8 years amoxicillin or cefuroxime). Refractory after oral: IV ceftriaxone 2 to 4 weeks. [1,3]',
      },
      {
        heading: 'Dose cards',
        body: '[Doxycycline](#/drug/doxycycline/Early Lyme disease (adult)) | [Amoxicillin](#/drug/amoxicillin/Early Lyme disease (adult)) | [Cefuroxime](#/drug/cefuroxime/Early Lyme disease) | [Ceftriaxone](#/drug/ceftriaxone/Lyme carditis (severe))',
      },
    ],
    citations: CITES,
  },

  'lyme-testing-guide': {
    id: 'lyme-testing-guide',
    title: 'Lyme: Testing Guide',
    subtitle: 'What to send and when to stop',
    sections: [
      { heading: 'Two-tier serology', body: 'Standard: EIA then Western blot. Modified: EIA then EIA. A negative first tier means stop. [1,5]' },
      { heading: 'Timing', body: 'Falsely negative in the first 4 to 6 weeks. Disregard IgM if the patient has been ill for more than 30 days. [1,5]' },
      { heading: 'Do not test', body: 'Typical erythema migrans (treat clinically). Also do not test for Lyme in ALS, MS, Parkinson disease, dementia, new-onset seizures or psychiatric illness. [1,5]' },
      { heading: 'Do test', body: 'Neurologic Lyme (serum antibodies), Lyme arthritis (usually strongly IgG positive), and carditis when the SILC score is intermediate or high, without delaying treatment of suspected severe carditis. A Lyme titer is reasonable in unexplained AV block in a young patient in an endemic area. [1,3,6,7]' },
      { heading: 'Related', body: `[SILC calculator](#/calculator/silc-score) | [Testing node](${T}lyme-testing)` },
    ],
    citations: CITES,
  },

  'lyme-disease-stop': {
    id: 'lyme-disease-stop',
    title: 'Lyme Disease: Do NOT',
    subtitle: 'Avoid preventable harm and delay',
    sections: [
      { heading: 'Do NOT send serology for classic EM', body: `Treat clinically; serology is falsely negative for the first 4 to 6 weeks. [1,5] [Erythema migrans](${T}lyme-em)` },
      { heading: 'Do NOT wait for serology before treating suspected carditis', body: `Start IV ceftriaxone now (CDC). [1,2] [Severe carditis](${T}lyme-carditis-severe)` },
      { heading: 'Do NOT implant a permanent pacemaker in acute Lyme carditis', body: `Use temporary pacing; the block usually resolves. [1,6,8] [Severe carditis](${T}lyme-carditis-severe)` },
      { heading: 'Do NOT give prolonged or repeated antibiotics for post-treatment symptoms', body: `IDSA recommends against additional antibiotics without objective evidence of failure or reinfection. [1] [After treatment](${T}lyme-ptlds)` },
      { heading: 'Do NOT use prophylaxis to prevent anaplasma, babesia or RMSF', body: `Single-dose doxycycline does not prevent them; keep watching for fever. [4] [Prophylaxis](${T}lyme-prophylaxis)` },
      { heading: 'Do NOT miss a coinfection with cytopenias', body: `Low white count or platelets: think anaplasmosis (doxycycline covers it). Fever with hemolytic anemia: babesiosis, which needs different drugs. [1,9] [Special populations](${T}lyme-special-pops)` },
    ],
    citations: CITES,
  },
};
