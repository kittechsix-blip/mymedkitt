import type { DecisionNode } from '../../models/types.js';

const IMG_EM_CLASSIC = {
  src: 'images/lyme-disease/em-classic.jpg',
  alt: 'Classic erythema migrans: expanding red ring with central clearing on an upper arm',
  caption: 'Classic target-like erythema migrans. Photo: James Gathany, CDC PHIL #9874, public domain.',
};
const IMG_EM_SOLID = {
  src: 'images/lyme-disease/em-solid.jpg',
  alt: 'Solid, uniformly red erythema migrans rash on the neck without central clearing',
  caption: 'Solid (uniformly red) erythema migrans, the more common look. Photo: Boyce RM et al., Emerg Infect Dis 2024, public domain (CDC journal).',
};
const IMG_TICK_STAGES = {
  src: 'images/lyme-disease/tick-stages.jpg',
  alt: 'Blacklegged tick Ixodes scapularis adult female, adult male, nymph and larva shown beside a ruler and a dime',
  caption: 'Blacklegged tick (Ixodes scapularis) life stages with scale. Image: CDC, public domain.',
};
const IMG_TICK_ENGORGED = {
  src: 'images/lyme-disease/tick-engorged.jpg',
  alt: 'Engorged adult deer tick, swollen and rounded after feeding',
  caption: 'Engorged adult deer tick. Photo: NIAID, CC BY 2.0 (via Wikimedia Commons).',
};

const TREE = '#/tree/lyme-disease/node/';

export const LYME_DISEASE_NODES: DecisionNode[] = [
  // ───────────── Module 1: Presentation & Exposure ─────────────
  {
    id: 'lyme-start',
    type: 'question',
    module: 1,
    title: 'Lyme Disease: What Is the Presentation?',
    body: 'Lyme disease is caused by Borrelia burgdorferi, spread by the blacklegged (Ixodes) tick in the Northeast, mid-Atlantic and upper Midwest. Nymphs are under 2 mm and bite mostly in spring and summer, so patients often never saw the tick. Ask about outdoor or endemic-area exposure. [1,4]\n\nCoinfection clue: fever with low white count or platelets suggests anaplasmosis; fever with hemolytic anemia suggests babesiosis. [1,9]\n\n[Steps](#/info/lyme-steps) | [Rash & Tick Atlas](#/info/lyme-atlas)',
    citation: [1, 4, 9],
    options: [
      { label: 'Tick bite, no rash or symptoms', next: 'lyme-tick-bite' },
      { label: 'Expanding rash (erythema migrans)', next: 'lyme-em' },
      { label: 'Facial palsy, meningitis or radiculopathy', next: 'lyme-neuro' },
      { label: 'Syncope, palpitations, dyspnea or AV block on ECG', next: 'lyme-carditis-recognize', urgency: 'critical' },
      { label: 'Joint swelling (large joint, often the knee)', next: 'lyme-arthritis' },
      { label: 'Symptoms persisting after treatment', next: 'lyme-ptlds' },
    ],
    images: [IMG_TICK_STAGES],
    summary: 'Match the presentation to the stage: bite, rash, nerve, heart, joint, or lingering symptoms.',
  },
  {
    id: 'lyme-tick-bite',
    type: 'question',
    module: 1,
    title: 'Tick Bite: Is It a High-Risk Bite?',
    body: 'Prophylaxis is for a bite that meets ALL of these (CDC):\n• Ixodes (blacklegged) tick, adult or nymph\n• Highly endemic area (or more than 20% of local ticks infected per CDC)\n• Attached 36 hours or more (engorged; a flat, unfed tick is unlikely to have transmitted)\n• 72 hours or less since removal\n• No doxycycline contraindication\n\nIf every box is checked, offer prophylaxis. Otherwise, watch. [1,4]',
    citation: [1, 4],
    options: [
      { label: 'All criteria met', next: 'lyme-prophylaxis' },
      { label: 'One or more not met', next: 'lyme-bite-watch' },
    ],
    images: [IMG_TICK_ENGORGED, IMG_TICK_STAGES],
    summary: 'Prophylaxis only if Ixodes, endemic area, attached 36 h or more, removed within 72 h, and no contraindication.',
  },
  {
    id: 'lyme-prophylaxis',
    type: 'result',
    module: 1,
    title: 'Tick Bite Prophylaxis: Doxycycline 200 mg Once',
    body: 'Single-dose doxycycline after a high-risk bite. Adult: 200 mg PO once. Child under 45 kg: 4.4 mg/kg PO once (max 200 mg). CDC considers a single dose safe at all ages. [1,4]\n\nIt does NOT prevent anaplasmosis, babesiosis, ehrlichiosis or Rocky Mountain spotted fever; keep watching for fever and rash. [4]\n\nPregnancy or lactation: individualize, because sources differ; discuss with the patient and OB. [1,4]\n\n[Doxycycline dosing](#/drug/doxycycline/Lyme prophylaxis after high-risk tick bite) | [Disposition](' + TREE + 'lyme-disposition)',
    citation: [1, 4],
    recommendation: 'High-risk Ixodes bite within 72 h of removal: doxycycline 200 mg PO once (child under 45 kg 4.4 mg/kg, max 200 mg), then watch for 30 days.',
    treatment: {
      firstLine: { drug: 'Doxycycline', dose: '200 mg (child under 45 kg: 4.4 mg/kg, max 200 mg)', route: 'PO', frequency: 'Once', duration: 'Single dose', notes: 'Does not prevent anaplasmosis, babesiosis, ehrlichiosis or RMSF.' },
      monitoring: 'Watch 30 days for rash or fever; return precautions.',
    },
    confidence: 'recommended',
  },
  {
    id: 'lyme-bite-watch',
    type: 'result',
    module: 1,
    title: 'Tick Bite Without High-Risk Features: Watch, Do Not Test',
    body: 'No routine prophylaxis and no routine serology. Remove any attached tick, then watch for 30 days for a rash or fever. Serology after a bite without symptoms is not useful. [1,4]\n\nReturn precautions: expanding rash, fever, facial droop, severe headache, palpitations or fainting, or a swollen joint. [Disposition](' + TREE + 'lyme-disposition)',
    citation: [1, 4],
    recommendation: 'No prophylaxis or serology; watch 30 days for rash or fever and give return precautions.',
    confidence: 'recommended',
  },

  // ───────────── Module 2: Early Localized (EM) ─────────────
  {
    id: 'lyme-em',
    type: 'info',
    module: 2,
    title: 'Erythema Migrans: Diagnose It Clinically',
    body: 'EM appears 3 to 30 days (average about 7) after the bite and expands over days, up to 30 cm. It is seen in about 70 to 80% of infections and is often NOT a bull\'s-eye; a uniformly red patch is common. [1,3,5]\n\nDiagnosis is clinical. Do NOT send serology for a typical EM: it is falsely negative for the first 4 to 6 weeks. Multiple EM lesions mean disseminated disease. [1,3,5]\n\nNot EM: a small red area that appears within the first day or two of the bite and does not expand is usually a tick-bite hypersensitivity reaction. Do not treat it as Lyme. [3]',
    citation: [1, 3, 5],
    next: 'lyme-em-treatment',
    images: [IMG_EM_CLASSIC, IMG_EM_SOLID],
    summary: 'Typical EM: treat clinically; do not send serology. Solid red patches are common.',
    safetyLevel: 'warning',
  },
  {
    id: 'lyme-em-treatment',
    type: 'result',
    module: 2,
    title: 'Erythema Migrans Treatment: Doxycycline, Amoxicillin or Cefuroxime',
    body: 'Adult options:\n• Doxycycline 100 mg PO BID x 10 days (IDSA 10 days; CDC 10 to 14 days)\n• Amoxicillin 500 mg PO TID x 14 days\n• Cefuroxime 500 mg PO BID x 14 days\n\nChildren: doxycycline 4.4 mg/kg/day divided BID (max 100 mg/dose); amoxicillin 50 mg/kg/day divided TID (max 500 mg/dose); cefuroxime 30 mg/kg/day divided BID (max 500 mg/dose). [1,3]\n\nPregnancy: amoxicillin or cefuroxime (CDC). Azithromycin is second-line and less effective; use only with close follow-up. [1,3]\n\nLow white count or platelets: think anaplasmosis; doxycycline covers it. [9]\n\n[Doxycycline](#/drug/doxycycline/Early Lyme disease (adult)) | [Amoxicillin](#/drug/amoxicillin/Early Lyme disease (adult)) | [Cefuroxime](#/drug/cefuroxime/Early Lyme disease) | [Special populations](' + TREE + 'lyme-special-pops) | [Disposition](' + TREE + 'lyme-disposition)',
    citation: [1, 3, 9],
    recommendation: 'Treat typical EM clinically with oral doxycycline, amoxicillin or cefuroxime. No serology.',
    treatment: {
      firstLine: { drug: 'Doxycycline', dose: '100 mg (child: 4.4 mg/kg/day divided, max 100 mg/dose)', route: 'PO', frequency: 'BID', duration: '10 days (IDSA); CDC 10 to 14 days', notes: 'Also covers anaplasmosis.' },
      alternative: { drug: 'Amoxicillin or cefuroxime', dose: 'Amoxicillin 500 mg TID, or cefuroxime 500 mg BID', route: 'PO', frequency: 'TID / BID', duration: '14 days', notes: 'Pregnancy and young children. Child: amoxicillin 50 mg/kg/day divided TID (max 500 mg/dose); cefuroxime 30 mg/kg/day divided BID (max 500 mg/dose).' },
      monitoring: 'Rash fades over days; return if new fever, palsy, palpitations, fainting or joint swelling.',
    },
    confidence: 'recommended',
  },

  // ───────────── Module 3: Early Disseminated ─────────────
  {
    id: 'lyme-neuro',
    type: 'question',
    module: 3,
    title: 'Neurologic Lyme: Which Syndrome?',
    body: 'Test for neurologic Lyme with serum antibody testing (two-tier). [1,3,5]\n\nGet an ECG in any patient with neurologic Lyme and cardiac symptoms. [1,2]',
    citation: [1, 2, 3, 5],
    options: [
      { label: 'Facial palsy', next: 'lyme-facial-palsy' },
      { label: 'Meningitis or radiculoneuritis', next: 'lyme-meningitis' },
      { label: 'Brain or spinal cord parenchymal involvement', next: 'lyme-cns-parenchymal', urgency: 'urgent' },
    ],
    summary: 'Facial palsy and meningitis can be treated orally; parenchymal disease needs IV and ID.',
  },
  {
    id: 'lyme-facial-palsy',
    type: 'result',
    module: 3,
    title: 'Lyme Facial Palsy: Oral Doxycycline',
    body: 'Oral doxycycline 100 mg BID x 14 to 21 days. Child: 4.4 mg/kg/day divided BID (max 100 mg/dose). [1,3]\n\nGet an ECG (carditis screen if any cardiac symptoms). Serum two-tier antibody testing supports the diagnosis. [1,2,3]\n\n[Doxycycline](#/drug/doxycycline/Lyme facial palsy) | [Disposition](' + TREE + 'lyme-disposition)\n\nSteroids: IDSA 2020 makes no recommendation for or against corticosteroids in Lyme facial palsy; antibiotics are the treatment. Bilateral facial palsy strongly suggests Lyme. LP only if headache, neck stiffness or other meningeal signs. [1,3]',
    citation: [1, 2, 3],
    recommendation: 'Lyme facial palsy: doxycycline 100 mg PO BID for 14 to 21 days; ECG.',
    treatment: {
      firstLine: { drug: 'Doxycycline', dose: '100 mg (child: 4.4 mg/kg/day divided, max 100 mg/dose)', route: 'PO', frequency: 'BID', duration: '14 to 21 days' },
      monitoring: 'ECG at presentation; reassess palsy and return for cardiac or meningeal symptoms.',
    },
    confidence: 'recommended',
  },
  {
    id: 'lyme-meningitis',
    type: 'result',
    module: 3,
    title: 'Lyme Meningitis or Radiculoneuritis: Oral Doxycycline or IV Ceftriaxone',
    body: 'Either is acceptable, 14 to 21 days:\n• Oral doxycycline 200 mg/day in 1 to 2 doses\n• IV ceftriaxone 2 g daily (child 50 to 75 mg/kg IV daily, max 2 g)\n\nOral is acceptable; switch IV to oral once the patient is stable. [1,3]\n\n[Doxycycline](#/drug/doxycycline/Lyme facial palsy / meningitis (oral)) | [Ceftriaxone](#/drug/ceftriaxone/Lyme neuroborreliosis) | [Disposition](' + TREE + 'lyme-disposition)',
    citation: [1, 3],
    recommendation: 'Lyme meningitis or radiculoneuritis: doxycycline 200 mg/day PO or ceftriaxone 2 g IV daily for 14 to 21 days.',
    treatment: {
      firstLine: { drug: 'Doxycycline', dose: '200 mg/day in 1 to 2 doses', route: 'PO', frequency: 'Daily or BID', duration: '14 to 21 days' },
      alternative: { drug: 'Ceftriaxone', dose: '2 g (child 50 to 75 mg/kg, max 2 g)', route: 'IV', frequency: 'Daily', duration: '14 to 21 days', notes: 'Switch to oral when stable.' },
      monitoring: 'Neurologic reassessment; ECG if cardiac symptoms.',
    },
    confidence: 'recommended',
  },
  {
    id: 'lyme-cns-parenchymal',
    type: 'result',
    module: 3,
    title: 'Lyme Brain or Spinal Cord Involvement: IV Ceftriaxone and ID',
    body: 'IDSA prefers IV over oral for parenchymal disease: ceftriaxone 2 g IV daily. Consult infectious disease. [1]\n\n[Ceftriaxone](#/drug/ceftriaxone/Lyme neuroborreliosis) | [Disposition](' + TREE + 'lyme-disposition)',
    citation: [1],
    recommendation: 'Parenchymal CNS Lyme: ceftriaxone 2 g IV daily and ID consult; IV preferred over oral.',
    treatment: {
      firstLine: { drug: 'Ceftriaxone', dose: '2 g', route: 'IV', frequency: 'Daily', duration: '14 to 21 days (IDSA); confirm with ID' },
      monitoring: 'Admit; ID consult.',
    },
    confidence: 'recommended',
    safetyLevel: 'warning',
  },
  {
    id: 'lyme-carditis-recognize',
    type: 'question',
    module: 3,
    title: 'Lyme Carditis: Recognize and Risk-Stratify',
    body: 'Think of it with light-headedness, syncope, dyspnea, palpitations or chest pain. AV block can fluctuate rapidly and progress from PR prolongation to complete block or asystole. Get an ECG and put the patient on telemetry. [1,2,8]\n\nSILC score (0 to 12): constitutional symptoms 2, outdoor activity or endemic area 1, male 1, tick bite 3, age under 50 1, erythema migrans 4. 0 to 2 low, 3 to 6 intermediate, 7 to 12 high; send serology if intermediate or high. [7]\n\nSEVERE = symptomatic, OR 1st-degree block with PR 300 ms or more, OR 2nd- or 3rd-degree block. MILD = 1st-degree block with PR under 300 ms. [1,2]\n\nA Lyme titer is reasonable in unexplained AV block in a young patient in an endemic area (bradycardia guideline 4.2.5, Class IIa). [6]\n\n[SILC calculator](#/calculator/silc-score)',
    citation: [1, 2, 6, 7, 8],
    options: [
      { label: 'Severe: symptomatic, PR 300 ms or more, or 2nd/3rd-degree block', next: 'lyme-carditis-severe', urgency: 'critical' },
      { label: 'Mild: asymptomatic 1st-degree block, PR under 300 ms', next: 'lyme-carditis-mild' },
    ],
    calculatorLinks: [{ id: 'silc-score', label: 'SILC score' }],
    summary: 'ECG plus telemetry; SEVERE if symptomatic, PR 300 ms or more, or 2nd/3rd-degree block.',
    safetyLevel: 'critical',
  },
  {
    id: 'lyme-carditis-severe',
    type: 'result',
    module: 3,
    title: 'Severe Lyme Carditis Treatment: Admit, IV Ceftriaxone, Temporary Pacing',
    body: '1) Admit to a monitored bed with continuous ECG (CDC: immediate hospitalization). [2]\n\n2) First-line treatment: start IV ceftriaxone 2 g daily NOW (child 50 to 75 mg/kg IV daily, max 2 g). Do not wait for Lyme serology (CDC: treat suspected carditis immediately). [1,2]\n\n3) Unstable high-grade block: temporary pacing (transcutaneous, then transvenous). About one third to 40% need temporary pacing. [8]\n\n4) Do NOT implant a permanent pacemaker during the acute illness. IDSA recommends temporary pacing over permanent; AHA/ACC/HRS Class I: medical therapy and temporary pacing before deciding on permanent pacing. The block usually resolves (median about 6 days, up to about 6 weeks). [1,6,8]\n\n5) Switch to oral (doxycycline 100 mg BID, or amoxicillin or cefuroxime) once high-grade block and symptoms resolve; total 14 to 21 days. [1,2]\n\n6) Cardiology consult.\n\nUnstable bradycardia algorithm: [Bradycardic Arrest](#/tree/bradycardic-arrest)\n\n[Ceftriaxone](#/drug/ceftriaxone/Lyme carditis (severe)) | [Disposition](' + TREE + 'lyme-disposition)',
    citation: [1, 2, 6, 8],
    summary: 'First-line treatment for severe Lyme carditis: IV ceftriaxone 2 g daily now, monitored bed, temporary pacing, no acute permanent pacemaker.',
    recommendation: 'Admit to a monitored bed, start IV ceftriaxone 2 g daily now without waiting for serology, use temporary pacing if unstable, and do not implant a permanent pacemaker acutely.',
    treatment: {
      firstLine: { drug: 'Ceftriaxone', dose: '2 g (child 50 to 75 mg/kg, max 2 g)', route: 'IV', frequency: 'Daily', duration: 'Until high-grade block and symptoms resolve, then oral to complete 14 to 21 days total', notes: 'Do not wait for Lyme serology.', confidence: 'critical' },
      alternative: { drug: 'Doxycycline (oral step-down)', dose: '100 mg', route: 'PO', frequency: 'BID', duration: 'Complete 14 to 21 days total', notes: 'Amoxicillin or cefuroxime are alternatives.' },
      monitoring: 'Continuous telemetry; cardiology; daily ECG for PR and block grade.',
    },
    confidence: 'recommended',
    safetyLevel: 'critical',
  },
  {
    id: 'lyme-carditis-mild',
    type: 'result',
    module: 3,
    title: 'Mild Lyme Carditis: Oral Antibiotics and ECG Follow-Up',
    body: 'Oral doxycycline 100 mg BID (or amoxicillin or cefuroxime) for 14 to 21 days total. [1,2]\n\nOutpatient care only if asymptomatic with PR under 300 ms and reliable follow-up. Repeat the ECG at follow-up. Return for syncope, dyspnea or palpitations. [1,2]\n\n[Doxycycline](#/drug/doxycycline/Lyme carditis (mild or oral step-down)) | [Disposition](' + TREE + 'lyme-disposition)',
    citation: [1, 2],
    recommendation: 'Mild carditis: oral antibiotics for 14 to 21 days, repeat ECG; outpatient only if asymptomatic, PR under 300 ms, reliable follow-up.',
    treatment: {
      firstLine: { drug: 'Doxycycline', dose: '100 mg', route: 'PO', frequency: 'BID', duration: '14 to 21 days total', notes: 'Amoxicillin or cefuroxime are alternatives.' },
      monitoring: 'Repeat ECG; return for syncope or dyspnea.',
    },
    confidence: 'recommended',
    safetyLevel: 'warning',
  },

  // ───────────── Module 4: Late (Arthritis) ─────────────
  {
    id: 'lyme-arthritis',
    type: 'info',
    module: 4,
    title: 'Lyme Arthritis Treatment: 28 Days Oral',
    body: 'Large-joint (usually knee) swelling, often painless relative to the size of the effusion. Serum antibody testing is usually strongly positive (IgG). [1,3]\n\nOral for 28 days: doxycycline 100 mg BID, amoxicillin 500 mg TID, or cefuroxime 500 mg BID. Child dosing as for EM; under 8 years: amoxicillin or cefuroxime (CDC table). [1,3]\n\nExclude septic arthritis before treating: [Septic Arthritis](#/tree/septic-arthritis); children: [Pediatric Arthritis](#/tree/pediatric-arthritis).\n\nNo response to oral therapy: [Refractory arthritis](' + TREE + 'lyme-arthritis-refractory).\n\n[Doxycycline](#/drug/doxycycline/Lyme arthritis) | [Amoxicillin](#/drug/amoxicillin/Lyme arthritis) | [Cefuroxime](#/drug/cefuroxime/Lyme arthritis) | [Disposition](' + TREE + 'lyme-disposition)',
    citation: [1, 3],
    recommendation: 'Lyme arthritis: oral doxycycline, amoxicillin or cefuroxime for 28 days after excluding septic arthritis.',
    treatment: {
      firstLine: { drug: 'Doxycycline', dose: '100 mg (child: 4.4 mg/kg/day divided, max 100 mg/dose)', route: 'PO', frequency: 'BID', duration: '28 days' },
      alternative: { drug: 'Amoxicillin or cefuroxime', dose: 'Amoxicillin 500 mg TID, or cefuroxime 500 mg BID', route: 'PO', frequency: 'TID / BID', duration: '28 days', notes: 'Under 8 years: amoxicillin or cefuroxime.' },
      monitoring: 'Reassess the joint; if no response, see refractory arthritis.',
    },
    confidence: 'recommended',
    next: 'lyme-arthritis-refractory',
  },
  {
    id: 'lyme-arthritis-refractory',
    type: 'info',
    module: 4,
    title: 'Refractory Lyme Arthritis',
    body: 'No response to an oral course: IV ceftriaxone for 2 to 4 weeks is preferred over a second oral course (IDSA). If symptoms persist after IV therapy, refer to rheumatology; more antibiotics do not help. [1,3]\n\n[Ceftriaxone](#/drug/ceftriaxone/Lyme arthritis (refractory))',
    citation: [1, 3],
    next: 'lyme-disposition',
    summary: 'IV ceftriaxone 2 to 4 weeks beats a second oral course; then rheumatology, not more antibiotics.',
  },

  // ───────────── Module 5: Testing, Special Populations, After Treatment ─────────────
  {
    id: 'lyme-ptlds',
    type: 'info',
    module: 5,
    title: 'Symptoms Persisting After Treatment',
    body: 'Persistent nonspecific symptoms after appropriate treatment, without objective evidence of reinfection or treatment failure: IDSA recommends AGAINST additional antibiotics. Give supportive care and look for other causes. [1]',
    citation: [1],
    next: 'lyme-testing',
    summary: 'No more antibiotics for lingering nonspecific symptoms; search for other causes.',
    safetyLevel: 'warning',
  },
  {
    id: 'lyme-testing',
    type: 'info',
    module: 5,
    title: 'Lyme Testing: When and How',
    body: 'Two-tier testing: standard EIA then Western blot, or modified (EIA then EIA). A negative first tier means stop. [1,5]\n\nDisregard IgM if ill for more than 30 days. Tests can be falsely negative in the first 4 to 6 weeks. [1,5]\n\nDo not test typical EM. Do not test for Lyme in ALS, MS, Parkinson disease, dementia, new-onset seizures or psychiatric illness. [1,5]\n\n[Testing guide](#/info/lyme-testing-guide)',
    citation: [1, 5],
    next: 'lyme-special-pops',
    summary: 'Two-tier serology; stop at a negative first tier; never test typical EM.',
  },
  {
    id: 'lyme-special-pops',
    type: 'info',
    module: 5,
    title: 'Special Populations and Coinfection',
    body: 'Pregnancy: amoxicillin or cefuroxime; doxycycline individualized. Children: doxycycline doses by weight; CDC lists any age for prophylaxis and neurologic disease. Doxycycline allergy: amoxicillin or cefuroxime; azithromycin as a fallback. [1,3]\n\nCoinfection: anaplasmosis (low white count or platelets; doxycycline covers it); babesiosis (fever and hemolytic anemia; needs different drugs). [1,9]',
    citation: [1, 3, 9],
    next: 'lyme-disposition',
    summary: 'Pregnancy and young children: amoxicillin or cefuroxime. Watch for anaplasma and babesia.',
  },
  {
    id: 'lyme-disposition',
    type: 'result',
    module: 5,
    title: 'Lyme Disposition: Discharge or Admit',
    body: 'ADMIT: suspected severe carditis (monitored bed), parenchymal CNS disease, meningitis needing IV therapy, or unstable patients. [1,2]\n\nDISCHARGE: tick bite with prophylaxis or watch plan; typical EM; facial palsy with a normal ECG; mild carditis only if asymptomatic, PR under 300 ms and reliable follow-up; uncomplicated arthritis. [1,2,3]\n\nGive return precautions for fainting, palpitations, dyspnea, new rash, fever, facial droop, severe headache or a swollen joint. [Do NOT list](#/info/lyme-disease-stop)',
    citation: [1, 2, 3],
    recommendation: 'Admit suspected severe carditis, parenchymal CNS disease and IV-requiring meningitis; discharge the rest with a defined follow-up plan and return precautions.',
    confidence: 'recommended',
  },
];

export const LYME_DISEASE_MODULE_LABELS = [
  'Presentation & Exposure',
  'Early Localized (EM)',
  'Early Disseminated',
  'Late (Arthritis)',
  'Testing & Special Populations',
];

export const LYME_DISEASE_CRITICAL_ACTIONS = [
  { text: 'Suspected Lyme carditis: ECG and telemetry, and start IV ceftriaxone without waiting for serology.', nodeId: 'lyme-carditis-severe' },
  { text: 'Do NOT implant a permanent pacemaker during acute Lyme carditis; use temporary pacing.', nodeId: 'lyme-carditis-severe' },
  { text: 'Typical erythema migrans: treat clinically; do not send serology.', nodeId: 'lyme-em' },
];

export const LYME_DISEASE_CITATIONS = [
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
