// MedKitt: Kawasaki Disease (added 2026-11-12)
// Recognition → Incomplete KD algorithm → Initial treatment → High risk and steroids → IVIG resistance and infliximab →
// Coronary arteries → Differential, shock and MIS-C → Disposition
// 8 modules. Doses live in drug entries and the Kawasaki Doses calculator; criteria, the incomplete algorithm, the high-risk
// screen and the Z-score classification live in calculators.
// Sources: AHA scientific statement 2017 (McCrindle) and 2024 update (Jone), ACR/Vasculitis Foundation 2021 (Gorelik),
// Son risk score 2019, RAISE 2012, KIDCARE 2021, Tremoulet 2014, ACR MIS-C guidance v3 2022, Kanegaye 2009 (KD shock syndrome).

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const KAWASAKI_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'kd-start',
    type: 'info',
    module: 1,
    title: 'Kawasaki Disease: Recognition',
    body: '[Kawasaki Steps Summary](#/info/kawasaki-summary): stepwise approach.\n\n**Kawasaki disease is a vasculitis of young children** (most under 5 years). About 25% of untreated children develop coronary artery aneurysms; it is the leading cause of acquired heart disease in children in developed countries. [1]\n\n**Think Kawasaki in any child with fever for 5 days or more**, and in an **infant with 7 days or more of fever and no other explanation**. Infants under 6 months often have few features and the highest aneurysm risk. [1]\n\n**The 5 principal features** (they come and go, so ask about earlier days):\n1. **Lips and mouth:** red, cracked lips, strawberry tongue, red mouth and throat\n2. **Eyes:** both eyes red (bulbar conjunctival injection) without pus\n3. **Rash:** polymorphous (maculopapular, diffuse erythroderma, or erythema multiforme-like)\n4. **Hands and feet:** red, swollen in the acute phase; peeling around the nails later\n5. **Neck node:** 1.5 cm or larger, usually one side\n\n**Complete Kawasaki:** fever for 5 days or more plus 4 or more features. With 4 or more features, experienced clinicians may diagnose it on day 4. [1][2]',
    citation: [1, 2],
    images: [{
      src: 'images/kawasaki/kawasaki-criteria.svg',
      alt: 'Diagram of a child showing the five principal features of Kawasaki disease around fever for 5 days or more: red cracked lips and strawberry tongue; both eyes red without pus; polymorphous rash on the trunk; red swollen hands and feet with later peeling around the nails; and a single neck lymph node 1.5 cm or larger. Complete Kawasaki needs 4 of 5 features; incomplete needs 2 or 3 with fever for 5 days, or an infant with 7 days of unexplained fever.',
      caption: 'Fever plus the 5 principal features. (myMedKitt original diagram, after AHA 2017.)',
    }],
    calculatorLinks: [
      { id: 'kawasaki-criteria', label: 'Criteria Checker' },
    ],
    next: 'kd-criteria',
    summary: 'Fever 5+ days (infant 7+ days unexplained) + the 5 features; complete = 4 or more',
    safetyLevel: 'warning',
  },

  {
    id: 'kd-criteria',
    type: 'question',
    module: 1,
    title: 'Which Fits?',
    body: '**Features that point away from Kawasaki:** pus in the eyes or throat, mouth ulcers, blisters or vesicles, widespread lymph nodes, or a big spleen. Look for another diagnosis first. [1]',
    citation: [1],
    calculatorLinks: [
      { id: 'kawasaki-criteria', label: 'Criteria Checker' },
    ],
    options: [
      {
        label: 'Complete Kawasaki',
        description: 'Fever 5+ days and 4 or more features (day 4 for experienced clinicians)',
        next: 'kd-initial-tx',
        urgency: 'urgent',
      },
      {
        label: 'Possible incomplete Kawasaki',
        description: 'Fever 5+ days with 2 or 3 features, or infant with 7+ days of unexplained fever',
        next: 'kd-incomplete-labs',
        urgency: 'urgent',
      },
      {
        label: 'Fewer features, or another diagnosis is more likely',
        description: 'Differential, shock and MIS-C',
        next: 'kd-differential',
      },
    ],
    summary: 'Complete → treat; 2-3 features or infant rule → incomplete algorithm',
  },

  // =====================================================================
  // MODULE 2: INCOMPLETE KAWASAKI ALGORITHM (AHA 2017 Figure 3)
  // =====================================================================

  {
    id: 'kd-incomplete-labs',
    type: 'question',
    module: 2,
    title: 'Incomplete Kawasaki: CRP and ESR',
    body: '**Send:** CRP, ESR, CBC with differential, albumin, ALT, urinalysis. Add blood culture, viral testing and SARS-CoV-2 testing as the picture suggests. [1][2]\n\n**The first branch is inflammation:** CRP **3.0 mg/dL (30 mg/L) or more** and/or ESR **40 mm/h or more**. [1]\n\nThe AHA 2024 update kept the 2017 algorithm unchanged. [2]',
    citation: [1, 2],
    images: [{
      src: 'images/kawasaki/incomplete-kd-algorithm.svg',
      alt: 'Flowchart of the incomplete Kawasaki disease algorithm. Fever 5 days or more with 2 or 3 features, or an infant with 7 days of unexplained fever. Check CRP and ESR. If CRP is under 3 mg/dL and ESR under 40, recheck daily while fever lasts and get an echo if peeling develops. If CRP is 3 or more or ESR 40 or more, count 6 supplemental labs. Three or more: treat now with IVIG and aspirin, without waiting for the echo. Fewer than 3: get the echo; positive means treat; negative with ongoing fever means repeat the echo or consult an expert.',
      caption: 'Incomplete Kawasaki algorithm: when to treat before the echo. (myMedKitt original diagram, after AHA 2017 Figure 3, unchanged in AHA 2024.)',
    }],
    calculatorLinks: [
      { id: 'kawasaki-incomplete', label: 'Incomplete KD Algorithm' },
    ],
    options: [
      {
        label: 'CRP 3.0 mg/dL or more, or ESR 40 mm/h or more',
        description: 'Count the supplemental labs',
        next: 'kd-supplemental',
        urgency: 'urgent',
      },
      {
        label: 'CRP under 3.0 and ESR under 40',
        description: 'Low inflammation',
        next: 'kd-low-inflam',
      },
    ],
    summary: 'CRP 3+ mg/dL or ESR 40+ → supplemental labs; both low → recheck daily',
  },

  {
    id: 'kd-low-inflam',
    type: 'info',
    module: 2,
    title: 'Low Inflammation: Recheck Daily',
    body: '• **Serial clinical and lab re-evaluation while the fever lasts.** Features and lab changes can appear over the next days. [1]\n• **Typical peeling** of fingers or toes appears: get an echocardiogram, and treat if it is positive. [1]\n• A positive echo at any point means treat: go to [Initial Treatment](#/node/kd-initial-tx).\n• **Infants under 6 months** with prolonged fever: low threshold for an echo and a call to pediatric cardiology or rheumatology.\n• Consider other causes: see [Differential, Shock and MIS-C](#/node/kd-differential).',
    citation: [1],
    calculatorLinks: [
      { id: 'kawasaki-incomplete', label: 'Incomplete KD Algorithm' },
    ],
    next: 'kd-differential',
    summary: 'Recheck daily while febrile; echo if peeling develops',
  },

  {
    id: 'kd-supplemental',
    type: 'question',
    module: 2,
    title: 'Count the Supplemental Labs',
    body: '**Six supplemental labs** (AHA 2017): [1]\n1. Anemia for age\n2. Platelets **450,000 or more** after day 7 of fever\n3. Albumin **3.0 g/dL or less**\n4. Raised ALT\n5. WBC **15,000 or more**\n6. Urine **10 or more WBC per high-power field**',
    citation: [1],
    calculatorLinks: [
      { id: 'kawasaki-incomplete', label: 'Incomplete KD Algorithm' },
    ],
    options: [
      {
        label: '3 or more supplemental labs',
        description: 'Treat now, before the echo',
        next: 'kd-treat-before-echo',
        urgency: 'critical',
      },
      {
        label: 'Fewer than 3',
        description: 'The echocardiogram decides',
        next: 'kd-echo',
        urgency: 'urgent',
      },
    ],
    summary: '3 or more of 6 labs → treat before the echo; fewer → echo decides',
  },

  {
    id: 'kd-treat-before-echo',
    type: 'info',
    module: 2,
    title: 'Treat Now, Before the Echo',
    body: '**High CRP/ESR plus 3 or more supplemental labs is enough to treat.** Give [IVIG](#/drug/ivig/kawasaki initial) and [aspirin](#/drug/aspirin/kawasaki acute) now; do not wait for the echocardiogram. [1]\n\n**Still get the echo** (at diagnosis, without delaying IVIG): it sets the baseline Z-score that decides high risk and steroids. **A normal echo does not exclude Kawasaki disease.** [2]\n\n**Timing:** treat within 10 days of fever onset; after day 10, treat if fever, coronary changes or high inflammatory markers persist. [1]',
    citation: [1, 2],
    recommendation: 'Incomplete Kawasaki disease with CRP 3.0 mg/dL or more and/or ESR 40 mm/h or more and 3 or more supplemental laboratory findings: start IVIG 2 g/kg and aspirin without waiting for the echocardiogram; obtain the echocardiogram at diagnosis.',
    confidence: 'recommended',
    next: 'kd-initial-tx',
    summary: 'IVIG + aspirin now; echo at diagnosis but never delays treatment',
    safetyLevel: 'critical',
  },

  {
    id: 'kd-echo',
    type: 'question',
    module: 2,
    title: 'Echocardiogram',
    body: '**Positive echo (AHA 2017):** [1]\n• LAD or RCA **Z-score 2.5 or more**, or a coronary aneurysm, **or**\n• **3 or more suggestive features:** decreased left ventricular function, mitral regurgitation, pericardial effusion, LAD or RCA Z-score 2 to 2.5.',
    citation: [1],
    calculatorLinks: [
      { id: 'kawasaki-coronary-z', label: 'Coronary Z-Score' },
    ],
    options: [
      {
        label: 'Positive echo',
        description: 'Treat',
        next: 'kd-initial-tx',
        urgency: 'critical',
      },
      {
        label: 'Negative echo',
        description: 'Fever continues',
        next: 'kd-echo-negative',
      },
    ],
    summary: 'Z 2.5+ or aneurysm or 3 suggestive features = positive → treat',
  },

  {
    id: 'kd-echo-negative',
    type: 'info',
    module: 2,
    title: 'Negative Echo, Fever Continues',
    body: '• **If the fever continues, repeat the echocardiogram or consult a Kawasaki expert** (pediatric cardiology or rheumatology). [1]\n• **A normal echo does not exclude Kawasaki disease.** [2]\n• **Repeat the labs:** supplemental findings often appear later (platelets rise after day 7). Re-run the [Incomplete KD Algorithm](#/calculator/kawasaki-incomplete).\n• A positive repeat echo, or 3 or more supplemental labs with high CRP/ESR, means treat: [Initial Treatment](#/node/kd-initial-tx).',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'kawasaki-incomplete', label: 'Incomplete KD Algorithm' },
    ],
    next: 'kd-differential',
    summary: 'Repeat echo or expert consult; normal echo does not exclude KD',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 3: INITIAL TREATMENT
  // =====================================================================

  {
    id: 'kd-initial-tx',
    type: 'info',
    module: 3,
    title: 'Initial Treatment: IVIG and Aspirin',
    body: '**Treat as soon as the diagnosis is made**, ideally within 10 days of fever onset. After day 10, still treat if fever persists without another cause, or coronary arteries are abnormal, with ongoing inflammation. **Get the echo at diagnosis, but it never delays treatment.** [1][2][3]\n\n• [IVIG](#/drug/ivig/kawasaki initial) **2 g/kg IV once, over 8-12 hours.** Slower with shock or poor heart function. [2]\n• [Aspirin](#/drug/aspirin/kawasaki acute) **moderate 30-50 or high 80-100 mg/kg/day PO split every 6 hours**, until afebrile for 48-72 hours. Either is acceptable: the optimal dose is unclear and high dose has not been shown to protect the coronaries better. Then **3-5 mg/kg once daily** until the 4-6 week echo. [1][2][3]\n\n**Aspirin cautions:**\n• **No ibuprofen** or other NSAIDs: they block aspirin\'s antiplatelet effect. [1]\n• **Influenza or recent varicella vaccine:** Reye syndrome risk. Discuss an alternative antiplatelet drug and use acetaminophen for fever. Give inactivated flu vaccine only. [1]\n\nNext: check for **high risk**, which decides whether steroids are added to this first treatment.',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'kawasaki-doses', label: 'Kawasaki Doses' },
    ],
    recommendation: 'Kawasaki disease: IVIG 2 g/kg as a single infusion over 8-12 hours plus aspirin (moderate 30-50 or high 80-100 mg/kg/day until afebrile 48-72 hours, then 3-5 mg/kg/day), given as soon as the diagnosis is made and ideally within 10 days of fever onset; do not delay for the echocardiogram.',
    confidence: 'recommended',
    next: 'kd-risk',
    summary: 'IVIG 2 g/kg over 8-12 h + aspirin 30-100 mg/kg/day; no ibuprofen',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 4: HIGH RISK AND STEROIDS
  // =====================================================================

  {
    id: 'kd-risk',
    type: 'question',
    module: 4,
    title: 'High Risk at Diagnosis?',
    body: '**High risk for coronary aneurysms (AHA 2024):** [2]\n• Coronary **Z-score 2.5 or more** on the first echo\n• **Age under 6 months**\n• **High Son score** (3-5 points): 2 points for a baseline LAD or RCA Z-score of 2.0 or more; 1 each for age under 6 months, Asian race, CRP 13 mg/dL or more [4]\n\n**Shock or macrophage activation syndrome:** get an echo with coronary measurements (ACR strong recommendation), treat MAS with additional agents alongside IVIG, and involve PICU and rheumatology; these children often resist IVIG. [3][8]\n\nJapanese risk scores (Kobayashi, Egami, Sano) perform poorly in North American children. [3]',
    citation: [2, 3, 4, 8],
    calculatorLinks: [
      { id: 'kawasaki-high-risk', label: 'High-Risk Screen' },
    ],
    options: [
      {
        label: 'Yes: high risk',
        description: 'Add an adjunct (steroids, or infliximab) to the first IVIG',
        next: 'kd-steroids',
        urgency: 'urgent',
      },
      {
        label: 'No',
        description: 'IVIG and aspirin alone',
        next: 'kd-response',
      },
    ],
    summary: 'Z 2.5+, age under 6 mo, Son 3+ = high risk; shock or MAS = specialist-directed therapy',
  },

  {
    id: 'kd-steroids',
    type: 'info',
    module: 4,
    title: 'High Risk: Add an Adjunct to the First IVIG',
    body: '**Adjuncts are added to IVIG and aspirin for high-risk patients, never instead of IVIG.** ACR 2021 conditionally recommends either:\n• **Glucocorticoids** (low certainty; the better-studied option), or\n• **A non-glucocorticoid immunomodulator** such as [infliximab](#/drug/infliximab/kawasaki), anakinra or cyclosporine (very low certainty). [3]\n\n**Steroids:**\n• [Prednisolone](#/drug/prednisolone/kawasaki) **2 mg/kg/day split every 8 hours (max 60 mg/day)**, IV first and then oral once afebrile; when CRP has normalized, **taper over 15 days** (RAISE regimen). In the US, where IV prednisolone is not marketed, the IV phase is given as methylprednisolone: agree the dose with pharmacy. [5]\n• **Evidence:** in RAISE (Japan; high risk defined by the Japanese Kobayashi score, not the North American criteria above), coronary abnormalities fell from 23% to 3%. [5]\n• **Strength:** ACR 2021 conditionally recommends IVIG plus glucocorticoids over IVIG alone for high-risk patients; AHA 2017 rates a longer steroid course with IVIG in high-risk patients **Class IIb**. [3][1]\n• **Not recommended:** a single pulse of methylprednisolone added to the first IVIG as routine therapy (AHA 2017 Class III). [1]\n\nChoose the adjunct with pediatric cardiology or rheumatology.',
    citation: [1, 3, 5],
    calculatorLinks: [
      { id: 'kawasaki-doses', label: 'Kawasaki Doses' },
    ],
    recommendation: 'High-risk Kawasaki disease (coronary Z-score 2.5 or more, age under 6 months, or high Son score): consider adding an adjunct to IVIG and aspirin with the specialist: a tapering corticosteroid course (prednisolone 2 mg/kg/day, max 60 mg/day, tapered over 15 days after CRP normalizes) or a non-glucocorticoid immunomodulator such as infliximab.',
    confidence: 'consider',
    next: 'kd-response',
    summary: 'Steroids (prednisolone 2 mg/kg/day, 15-day taper) or infliximab with the first IVIG',
  },

  // =====================================================================
  // MODULE 5: IVIG RESISTANCE AND INFLIXIMAB
  // =====================================================================

  {
    id: 'kd-response',
    type: 'question',
    module: 5,
    title: 'Fever After IVIG?',
    body: '**IVIG resistance:** fever that **persists or comes back 36 hours or more after the IVIG infusion ends**. About 10-20% of children. [1][6]',
    citation: [1, 6],
    options: [
      {
        label: 'Fever 36+ hours after IVIG ended',
        description: 'IVIG-resistant',
        next: 'kd-resistant',
        urgency: 'urgent',
      },
      {
        label: 'Afebrile',
        description: 'Responding',
        next: 'kd-coronary',
      },
    ],
    summary: 'Fever 36+ h after the infusion ends = IVIG-resistant',
  },

  {
    id: 'kd-resistant',
    type: 'info',
    module: 5,
    title: 'IVIG-Resistant Kawasaki: Infliximab, Second IVIG or Steroids',
    body: '**Options** (with pediatric rheumatology or cardiology): [1][2][3][6]\n• **Second** [IVIG](#/drug/ivig/kawasaki resistant) **2 g/kg** over 8-12 hours. ACR 2021 conditionally prefers it over steroids; AHA 2017 Class IIa.\n• [Infliximab](#/drug/infliximab/kawasaki) **10 mg/kg IV once, over 2 hours** (KIDCARE dose; AHA 2024 table). In KIDCARE, infliximab settled fever more often than a second IVIG (77% vs 51% met the primary outcome), with shorter fever and hospital stay. AHA 2017 Class IIb.\n• **Steroids:** [pulse methylprednisolone](#/drug/methylprednisolone/kawasaki) 20-30 mg/kg IV daily for 1-3 days (max 1 g) with or without an oral taper, or a longer prednisolone course (AHA 2017 Class IIb).\n\n**Still not settling:** cyclosporine, anakinra, or other immunomodulators with specialist input (AHA 2017 Class IIb). [1][2]\n\n**Infliximab with the first IVIG:** in an unselected trial it did not reduce IVIG resistance (11% in both groups), though fever ended a day sooner. [7] ACR 2021 still allows it as a first-line adjunct for high-risk children (conditional, very low certainty): see [High Risk](#/node/kd-steroids). [3]',
    citation: [1, 2, 3, 6, 7],
    calculatorLinks: [
      { id: 'kawasaki-doses', label: 'Kawasaki Doses' },
    ],
    recommendation: 'IVIG-resistant Kawasaki disease (fever 36 hours or more after IVIG): give a second IVIG 2 g/kg or infliximab 10 mg/kg IV, or corticosteroids, with pediatric rheumatology or cardiology.',
    confidence: 'recommended',
    next: 'kd-coronary',
    summary: 'Second IVIG 2 g/kg or infliximab 10 mg/kg (or steroids); specialist input',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 6: CORONARY ARTERIES
  // =====================================================================

  {
    id: 'kd-coronary',
    type: 'info',
    module: 6,
    title: 'Coronary Arteries by Z-Score',
    body: '**AHA classification** (largest coronary Z-score): [1][2]\n• **No involvement:** under 2\n• **Dilation only:** 2 to under 2.5\n• **Small aneurysm:** 2.5 to under 5\n• **Medium aneurysm:** 5 to under 10, and absolute diameter under 8 mm\n• **Large or giant aneurysm:** 10 or more, or 8 mm or more\n\n**Antithrombotic outline** (cardiology sets the plan): [1]\n• No involvement: [low-dose aspirin](#/drug/aspirin/kawasaki low-dose) 3-5 mg/kg/day until the 4-6 week echo (Class I).\n• Small or medium aneurysms: low-dose aspirin long term; some add a second antiplatelet drug.\n• Large or giant, or rapidly growing: low-dose aspirin **plus** warfarin (INR 2.0-3.0) or low-molecular-weight heparin (Class IIa).\n\n**Echo follow-up:** at diagnosis, 1-2 weeks and 4-6 weeks; more often with aneurysms, which can grow in the first weeks. [1]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'kawasaki-coronary-z', label: 'Coronary Z-Score' },
    ],
    next: 'kd-dispo',
    summary: 'Z <2 / 2-2.5 / 2.5-5 / 5-10 / 10+ or 8 mm; giant = aspirin + anticoagulant',
  },

  // =====================================================================
  // MODULE 7: DIFFERENTIAL, SHOCK AND MIS-C
  // =====================================================================

  {
    id: 'kd-differential',
    type: 'info',
    module: 7,
    title: 'Differential, Shock and MIS-C',
    body: '**Mimics:** viral infections (adenovirus, measles, EBV), scarlet fever, staphylococcal or streptococcal toxic shock, drug reactions and Stevens-Johnson syndrome, systemic juvenile arthritis, and a deep neck infection not improving on antibiotics. Kawasaki is also found in infants with prolonged fever and irritability, aseptic meningitis, and culture-negative shock. [1]\n\n**Kawasaki shock syndrome** (about 7% in one US series): hypotension or poor perfusion, often mistaken for septic or toxic shock. These children have higher CRP, lower platelets and hemoglobin, more coronary abnormalities and myocardial dysfunction, and more IVIG resistance. Resuscitate, treat as high risk, and involve PICU and cardiology. [8]\n\n**MIS-C** (after SARS-CoV-2) overlaps with Kawasaki and is now much less common. Suspect it in older children, with prominent GI symptoms, shock or heart dysfunction, low lymphocytes and platelets, and evidence of recent SARS-CoV-2 infection. Manage with pediatric rheumatology using ACR guidance. [2][9]',
    citation: [1, 2, 8, 9],
    next: 'kd-dispo',
    summary: 'Mimics; KD shock syndrome = high risk; consider MIS-C',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 8: DISPOSITION
  // =====================================================================

  {
    id: 'kd-dispo',
    type: 'info',
    module: 8,
    title: 'Disposition and Follow-Up',
    body: '• **Admit all children** with Kawasaki disease being treated, or with incomplete Kawasaki under evaluation who need serial labs and echocardiography.\n• **PICU:** shock, myocardial dysfunction, macrophage activation syndrome, or giant aneurysms needing anticoagulation.\n• **Pediatric cardiology** for every patient; rheumatology for high-risk or IVIG-resistant disease.\n• **Discharge** once afebrile on low-dose aspirin, with echo follow-up at 1-2 weeks and 4-6 weeks. [1][2]\n• **Vaccines:** defer measles and varicella vaccines for **11 months** after IVIG (the IVIG blocks them). While on aspirin, give inactivated influenza vaccine, not the live nasal vaccine (Reye syndrome risk). [1][2]\n• **Tell families:** return for new fever, and avoid ibuprofen while on aspirin.',
    citation: [1, 2],
    recommendation: 'Admit children treated for Kawasaki disease with pediatric cardiology involvement; arrange echocardiography at 1-2 and 4-6 weeks and defer measles and varicella vaccines for 11 months after IVIG.',
    confidence: 'recommended',
    summary: 'Admit; cardiology; echo at 1-2 and 4-6 weeks; defer MMR/varicella 11 months',
  },

];

export const KAWASAKI_MODULE_LABELS = [
  'Recognition',
  'Incomplete KD Algorithm',
  'Initial Treatment',
  'High Risk & Steroids',
  'IVIG Resistance & Infliximab',
  'Coronary Arteries',
  'Differential, Shock & MIS-C',
  'Disposition',
];

export const KAWASAKI_CITATIONS: Citation[] = [
  { num: 1, text: 'McCrindle BW, Rowley AH, Newburger JW, et al. Diagnosis, treatment, and long-term management of Kawasaki disease: a scientific statement for health professionals from the American Heart Association. Circulation. 2017;135(17):e927-e999.' },
  { num: 2, text: 'Jone PN, Tremoulet A, Choueiter N, et al. Update on diagnosis and management of Kawasaki disease: a scientific statement from the American Heart Association. Circulation. 2024;150(23):e481-e500.' },
  { num: 3, text: 'Gorelik M, Chung SA, Ardalan K, et al. 2021 American College of Rheumatology/Vasculitis Foundation guideline for the management of Kawasaki disease. Arthritis Rheumatol. 2022;74(4):586-596.' },
  { num: 4, text: 'Son MBF, Gauvreau K, Tremoulet AH, et al. Risk model development and validation for prediction of coronary artery aneurysms in Kawasaki disease in a North American population. J Am Heart Assoc. 2019;8(11):e011319.' },
  { num: 5, text: 'Kobayashi T, Saji T, Otani T, et al. Efficacy of immunoglobulin plus prednisolone for prevention of coronary artery abnormalities in severe Kawasaki disease (RAISE study): a randomised, open-label, blinded-endpoints trial. Lancet. 2012;379(9826):1613-1620.' },
  { num: 6, text: 'Burns JC, Roberts SC, Tremoulet AH, et al. Infliximab versus second intravenous immunoglobulin for treatment of resistant Kawasaki disease in the USA (KIDCARE): a randomised, multicentre comparative effectiveness trial. Lancet Child Adolesc Health. 2021;5(12):852-861.' },
  { num: 7, text: 'Tremoulet AH, Jain S, Jaggi P, et al. Infliximab for intensification of primary therapy for Kawasaki disease: a phase 3 randomised, double-blind, placebo-controlled trial. Lancet. 2014;383(9930):1731-1738.' },
  { num: 8, text: 'Kanegaye JT, Wilder MS, Molkara D, et al. Recognition of a Kawasaki disease shock syndrome. Pediatrics. 2009;123(5):e783-e789.' },
  { num: 9, text: 'Henderson LA, Canna SW, Friedman KG, et al. American College of Rheumatology clinical guidance for multisystem inflammatory syndrome in children associated with SARS-CoV-2 and hyperinflammation in pediatric COVID-19: version 3. Arthritis Rheumatol. 2022;74(4):e1-e20.' },
];

export const KAWASAKI_CRITICAL_ACTIONS = [
  { text: 'Fever 5+ days in a child, or 7+ days unexplained in an infant: think Kawasaki', nodeId: 'kd-start' },
  { text: 'Incomplete KD with high CRP/ESR and 3+ supplemental labs: IVIG + aspirin before the echo', nodeId: 'kd-treat-before-echo' },
  { text: 'IVIG 2 g/kg + aspirin as soon as diagnosed; the echo never delays treatment', nodeId: 'kd-initial-tx' },
  { text: 'High risk (Z 2.5+, under 6 months, Son 3+): add steroids or infliximab to the first IVIG', nodeId: 'kd-steroids' },
  { text: 'Fever 36+ h after IVIG: second IVIG or infliximab 10 mg/kg (or steroids)', nodeId: 'kd-resistant' },
];

export const KAWASAKI_NODE_COUNT = KAWASAKI_NODES.length;
