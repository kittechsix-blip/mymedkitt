// MedKitt — Syphilis ED Evaluation
// Initial Assessment → Stage Classification → Risk Assessment & Testing → Test Interpretation → Treatment → Special Populations & Disposition
// 6 modules: Initial Assessment → Stage Classification → Risk Assessment & Testing → Test Interpretation → Treatment → Special Populations & Disposition
// 32 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const SYPHILIS_CRITICAL_ACTIONS = [
  { text: 'Pregnancy: Penicillin is the ONLY acceptable treatment - desensitization MANDATORY if PCN-allergic', nodeId: 'syph-treat-pregnancy' },
  { text: 'Ocular/otosyphilis = neurosyphilis treatment (IV Penicillin G) regardless of CSF findings - do NOT delay for LP', nodeId: 'syph-neuro-route' },
  { text: 'Benzathine PCN-G does NOT achieve treponemicidal CSF levels - inadequate for neurosyphilis', nodeId: 'syph-neuro-route' },
  { text: 'Early syphilis (primary/secondary/early latent): Benzathine PCN-G 2.4M units IM × 1 dose', nodeId: 'syph-treat-early' },
  { text: 'Late latent/tertiary: Benzathine PCN-G 2.4M units IM weekly × 3 weeks (total 7.2M units)', nodeId: 'syph-treat-late' },
  { text: 'Azithromycin is NOT recommended - documented macrolide resistance and treatment failures', nodeId: 'syph-pcn-allergy' },
  { text: 'Partner exposure within 90 days = treat presumptively even if seronegative', nodeId: 'syph-partner-exposure' },
  { text: 'Jarisch-Herxheimer in pregnancy can cause preterm labor - monitor with continuous fetal monitoring × 24h if viable GA', nodeId: 'syph-treat-pregnancy' },
  { text: 'Treponemal tests (TP-PA, FTA-ABS) remain positive for life - cannot distinguish active from past infection', nodeId: 'syph-both-reactive' },
];

export const SYPHILIS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT & PRESENTATION
  // =====================================================================

  {
    id: 'syph-start',
    type: 'question',
    module: 1,
    title: 'Syphilis — ED Evaluation',
    body: '[Syphilis Steps Summary](#/info/syph-steps-summary)\n\n207,255 total US cases in 2022 (80% increase since 2018). 59,233 primary/secondary cases. Congenital syphilis increased 755% from 2012-2022. Known as "the great imitator" — can mimic many conditions. [1][2][4]',
    citation: [1, 2, 4],
    calculatorLinks: [{ id: 'syphilis-serology', label: 'Serology Interpreter' }],
    options: [
      {
        label: 'Genital or Oral Lesion',
        description: 'Painless ulcer/chancre, oral lesion',
        next: 'syph-primary-exam',
      },
      {
        label: 'Diffuse Rash or Systemic Symptoms',
        description: 'Palmar/plantar rash, condylomata lata, prodrome',
        next: 'syph-secondary-exam',
      },
      {
        label: 'Positive Syphilis Screening Test',
        description: 'Incidental finding, prenatal screen, STI panel',
        next: 'syph-test-interpret',
      },
      {
        label: 'Partner Notification / Contact Tracing',
        description: "Notified of partner's syphilis diagnosis",
        next: 'syph-partner-exposure',
      },
      {
        label: 'Neurologic, Ocular, or Otic Symptoms',
        description: 'Vision changes, hearing loss, cognitive changes',
        next: 'syph-neuro-screen',
        urgency: 'urgent',
      },
      {
        label: 'Pregnancy With Syphilis Concern',
        description: 'Prenatal positive, new exposure, or active lesion',
        next: 'syph-pregnancy',
        urgency: 'urgent',
      },
    ],

    summary: 'Syphilis 80% increase since 2018 — "the great imitator"; route by presentation: lesion, rash, screening, partner, neuro, pregnancy',
  },

  {
    id: 'syph-partner-exposure',
    type: 'info',
    module: 1,
    title: 'Partner Notification Exposure',
    body: 'Exposed contacts of primary/secondary syphilis within the preceding **90 days** should be treated presumptively, even if seronegative. [5][21]\n\nContacts >90 days ago should be tested and treated based on results.\n\n**Contact tracing windows by stage:**\n• Primary syphilis: 3 months + symptom duration\n• Secondary syphilis: 6 months + symptom duration\n• Early latent: 1 year\n\n[Partner Notification & Reporting](#/info/syph-partner-notification)',
    citation: [5, 21],
    next: 'syph-risk-factors',

    summary: 'Partner exposure <90 days: treat presumptively even if seronegative; contact tracing windows vary by stage',
  },

  {
    id: 'syph-neuro-screen',
    type: 'question',
    module: 1,
    title: 'Neurological, Ocular, or Otic Symptoms',
    body: 'Neurosyphilis can occur at **ANY stage** of syphilis infection. Ocular and otosyphilis are clinical diagnoses that require neurosyphilis-level treatment regardless of CSF findings. [1][6]\n\n**Key findings:**\n• **Ocular:** uveitis (most common), vision loss, floaters, disc edema, retinitis\n• **Otic:** hearing loss (conductive or sensorineural), tinnitus, vertigo\n• **Meningeal:** headache, stiff neck, photophobia, CN VI/VII/VIII palsies\n• **Late neuro:** cognitive decline, personality changes, Argyll Robertson pupils, tabes dorsalis ("foot-slapping" gait), general paresis\n• **Vascular:** stuttering stroke-like symptoms from meningovascular disease',
    citation: [1, 6, 7],
    options: [
      {
        label: 'Ocular or Otic Symptoms Present',
        description: 'Vision changes, uveitis, hearing loss, tinnitus',
        next: 'syph-neuro-route',
        urgency: 'critical',
      },
      {
        label: 'Other Neurological Symptoms',
        description: 'Cognitive changes, CN palsies, meningismus, stroke-like',
        next: 'syph-neuro-route',
        urgency: 'critical',
      },
      {
        label: 'No Neuro/Ocular/Otic Symptoms',
        description: 'Proceed to stage classification',
        next: 'syph-stage-classify',
      },
    ],

    summary: 'Neurosyphilis can occur at ANY stage — ocular/otosyphilis are clinical diagnoses requiring neurosyphilis-level treatment',
    safetyLevel: 'critical',
  },

  {
    id: 'syph-neuro-route',
    type: 'result',
    module: 1,
    title: 'Neurosyphilis Pathway',
    body: 'Patient has neurological, ocular, or otic symptoms with known or suspected syphilis. This requires the **neurosyphilis evaluation pathway**.\n\n[Neurosyphilis Evaluation & Treatment](#/tree/neurosyphilis) — full CSF workup and IV Penicillin G protocol.\n\n**Key principles:**\n• Ocular/otosyphilis is treated as neurosyphilis **regardless of CSF findings** — do NOT delay treatment for LP results\n• [Penicillin G (IV)](#/drug/penicillin-g-iv/neurosyphilis) 18-24 million units/day (3-4M units q4h) × 10-14 days\n• [Benzathine Penicillin G](#/drug/benzathine-penicillin/primary) does NOT achieve treponemicidal CSF levels — inadequate for neurosyphilis\n• Emergent ophthalmology consult for ocular syphilis, ENT/audiology for otosyphilis',
    recommendation: 'Route to Neurosyphilis consult for CSF evaluation and IV Penicillin G protocol.',
    citation: [1, 6, 7, 8],
    treatment: {
      firstLine: {
        drug: 'Aqueous Crystalline Penicillin G',
        dose: '18-24 million units/day (3-4 million units)',
        route: 'IV',
        frequency: 'q4h',
        duration: '10-14 days',
        notes: 'Do NOT delay for LP results if ocular/otic symptoms; benzathine PCN does NOT achieve CSF levels',
      },
      pcnAllergy: {
        drug: 'Ceftriaxone',
        dose: '2g',
        route: 'IV',
        frequency: 'daily',
        duration: '10-14 days',
        notes: 'Limited data; desensitization strongly preferred if true PCN allergy',
      },
      monitoring: 'Repeat CSF at 6 months; if CSF not improving, re-treat; ophthalmology/ENT follow-up as indicated',
    },
  },

  {
    id: 'syph-pregnancy',
    type: 'info',
    module: 1,
    title: 'Syphilis in Pregnancy',
    body: 'Syphilis in pregnancy is a **public health emergency**. Congenital syphilis cases increased 755% from 2012-2022 (3,761 cases in 2022), with 282 stillbirths and infant deaths. [3][10][11]\n\n**Critical rules:**\n• ALL pregnant patients with syphilis must receive **penicillin** — there are **NO adequate alternatives**\n• If PCN-allergic: **desensitization is MANDATORY** (oral protocol preferred, can be done in ED/L&D with monitoring)\n• Vertical transmission risk is highest in primary/secondary syphilis but can occur at any stage\n\n**Screening schedule:**\n• First prenatal visit\n• Beginning of third trimester (28 weeks)\n• At delivery (in high-prevalence areas)\n\n**Jarisch-Herxheimer retext:** Can precipitate preterm labor and fetal distress. Monitor with continuous fetal monitoring × 24h if viable gestational age. [3][12]\n\n[Congenital Syphilis Risks & Signs](#/info/syph-congenital)',
    citation: [3, 10, 11, 12],
    next: 'syph-stage-classify',

    summary: 'Pregnancy: PCN ONLY effective — desensitize if allergic; congenital syphilis up 755%; Jarisch-Herxheimer can cause preterm labor',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 2: STAGE CLASSIFICATION & EXAMINATION
  // =====================================================================

  {
    id: 'syph-stage-classify',
    type: 'question',
    module: 2,
    title: 'Syphilis Stage Classification',
    body: 'Classification determines treatment. Staging is based on clinical findings, serologic history, and time since acquisition. [1][2]\n\n[Stage Classification Guide](#/info/syph-stages)\n\nSyphilis progresses through defined stages. Previous infection does **not** confer immunity, and reinfected patients are less likely to be symptomatic.',
    citation: [1, 2],
    options: [
      {
        label: 'Primary Syphilis',
        description: 'Painless chancre at inoculation site, usually single',
        next: 'syph-primary-exam',
      },
      {
        label: 'Secondary Syphilis',
        description: 'Rash (palms/soles), condylomata lata, systemic symptoms',
        next: 'syph-secondary-exam',
      },
      {
        label: 'Early Latent (< 1 Year)',
        description: 'Asymptomatic, documented seroconversion or exposure < 1 year',
        next: 'syph-latent-early',
      },
      {
        label: 'Late Latent (> 1 Year or Unknown)',
        description: 'Asymptomatic, no documentation of acquisition time',
        next: 'syph-latent-late',
      },
      {
        label: 'Tertiary (Non-Neurologic)',
        description: 'Gummatous disease, cardiovascular syphilis',
        next: 'syph-tertiary',
      },
    ],

    summary: 'Classification determines treatment — stage by clinical findings, serologic history, and time since acquisition',
  },

  {
    id: 'syph-primary-exam',
    type: 'info',
    module: 2,
    title: 'Primary Syphilis',
    body: '**Classic chancre:** painless, firm, round, indurated ulcer with clean base at the inoculation site. Appears 10-90 days after exposure (average 21 days). Heals spontaneously in 3-6 weeks even without treatment. [1][14][15]\n\n**Characteristics:**\n• Usually **single**, but can be multiple (especially in HIV+ patients or with high spirochete load)\n• Common sites: penis, vulva, cervix, anus, mouth (oral sexual contact), fingers\n• Bilateral, painless inguinal lymphadenopathy in ~70%\n• Patients often do not notice the primary lesion because it is **not painful** and may not be easily visible\n\n**Atypical presentations:** painful lesions, multiple lesions, atypical appearance — maintain high suspicion in at-risk populations.\n\n**Definitive diagnosis:** Dark-field microscopy of lesion fluid (rarely available in EDs). PCR testing is emerging but not FDA-approved.\n\n[Differential Diagnosis of Genital Lesions](#/info/syph-genital-ddx)',
    images: [{ src: 'images/syphilis/primary-chancre.jpg', alt: 'Primary syphilis chancres on penile shaft', caption: 'Primary syphilis — painless, indurated chancres at the inoculation site. CDC/PHIL.' }],
    citation: [1, 14, 15],
    next: 'syph-risk-factors',

    summary: 'Painless indurated chancre at inoculation site, 10-90 days post-exposure — heals spontaneously, often unnoticed',
    skippable: true,
  },

  {
    id: 'syph-secondary-exam',
    type: 'info',
    module: 2,
    title: 'Secondary Syphilis',
    body: 'Occurs **4-10 weeks after chancre** (which may still be present). Represents hematogenous dissemination of T. pallidum. [1][16][17]\n\n**Rash:**\n• Diffuse, symmetric, maculopapular\n• Classically involves **palms and soles** (50-80% of cases)\n• Non-pruritic, red to red-brown, flat and scaly\n• Can be more generalized — "the great imitator" can mimic virtually any dermatologic condition\n• May be difficult to identify on darker skin tones\n• Can present atypically: vesicular, pustular, follicular, smooth, or as **malignant syphilis** (lues maligna — cutaneous ulcers with central necrosis and black-brown crust)\n\n**Other findings:**\n• **Condylomata lata:** moist, flat, broad-based, highly infectious lesions in warm/moist areas (perineum, vulva, inner thighs)\n• **Mucous patches:** painless, silvery-gray oral/genital erosions\n• **Moth-eaten alopecia:** patchy, non-scarring hair loss\n\n**Systemic symptoms:** low-grade fever, malaise, weight loss, diffuse lymphadenopathy, arthralgias, hepatitis, nephrotic syndrome, uveitis\n\nUntreated: resolves in 3-12 weeks, then enters latent phase. [1][16]',
    images: [
      { src: 'images/syphilis/secondary-palmar-rash.png', alt: 'Secondary syphilis — maculopapular rash on both palms', caption: 'Secondary syphilis — classic palmar rash. Red-brown, flat, scaly lesions on both palms. CDC.' },
    ],
    citation: [1, 16, 17],
    next: 'syph-risk-factors',

    summary: 'Diffuse rash with palms/soles (50-80%), condylomata lata, mucous patches — hematogenous dissemination 4-10w after chancre',
    skippable: true,
  },

  {
    id: 'syph-latent-early',
    type: 'info',
    module: 2,
    title: 'Early Latent Syphilis',
    body: 'Acquired within the preceding year but **no clinical signs or symptoms**. [1][5]\n\n**Diagnosed when:**\n• Documented seroconversion or 4-fold titer rise within 12 months\n• History of primary/secondary symptoms within 12 months\n• Sex partner with primary, secondary, or early latent syphilis within 12 months\n• Reactive NTT and TT only in persons previously tested seronegative within 12 months\n\n**Clinical significance:**\n• Still sexually transmissible — ~25% may relapse to secondary stage\n• Treatment is same as primary/secondary: single dose benzathine PCN-G',
    citation: [1, 5],
    next: 'syph-risk-factors',

    summary: 'Early latent: <1 year, asymptomatic, still sexually transmissible — same treatment as primary/secondary',
    skippable: true,
  },

  {
    id: 'syph-latent-late',
    type: 'info',
    module: 2,
    title: 'Late Latent / Unknown Duration',
    body: 'Acquired **> 1 year ago** OR unknown duration of infection. [1][5]\n\n**Key points:**\n• Not sexually transmissible (except in pregnancy — can transmit vertically at any stage)\n• Can progress to tertiary syphilis (in ~30% of untreated patients) over years to decades\n• If no documentation of timing, classified as **late latent** (more conservative treatment — 3 weekly doses)\n\n**Evaluate for neurosyphilis if:**\n• Neurologic symptoms present\n• Treatment failure (no 4-fold titer decline)\n• HIV co-infection\n• RPR titer ≥ 1:32\n• Planned treatment with non-penicillin agent (must rule out neurosyphilis first — doxycycline does NOT penetrate CSF) [1]',
    citation: [1, 5, 18],
    next: 'syph-risk-factors',

    summary: 'Late latent >1 year or unknown — not sexually transmissible but can transmit vertically; 3 weekly PCN doses',
    skippable: true,
  },

  {
    id: 'syph-tertiary',
    type: 'info',
    module: 2,
    title: 'Tertiary Syphilis',
    body: 'Occurs in **~30% of untreated** patients, 3-15+ years after initial infection. Now rare in developed countries. [1][19]\n\n**Gummatous syphilis (~15%):**\n• Granulomatous, nodular lesions with necrotic center surrounded by immune cells\n• Found in skin, bone, liver, testes, and other organs\n• Destructive but responds well to treatment\n\n**Cardiovascular syphilis (~10%):**\n• Aortitis, ascending aortic aneurysm, aortic valve insufficiency\n• Coronary ostial stenosis, myocarditis\n• Typically 15-30 years after initial infection\n• Antibiotic treatment does not reverse existing aortic damage — treats active infection\n\n**Neurologic involvement:** Must rule out before treating as non-neurologic tertiary.\n\n[Neurosyphilis Evaluation](#/tree/neurosyphilis)',
    citation: [1, 19],
    next: 'syph-risk-factors',

    summary: 'Tertiary in ~30% untreated: gummatous, cardiovascular (aortitis/aneurysm), or neurologic — must rule out neurosyphilis',
    skippable: true,
  },

  // =====================================================================
  // MODULE 3: RISK ASSESSMENT & TESTING
  // =====================================================================

  {
    id: 'syph-risk-factors',
    type: 'info',
    module: 3,
    title: 'Risk Factor Assessment',
    body: 'Document risk factors to guide testing strategy and counseling. [1][2][14]\n\n**High-risk populations:**\n• **MSM** — highest incidence (56% of primary/secondary cases, rate 240× higher than women)\n• **HIV co-infection** — syphilis facilitates HIV acquisition 2-5× and vice versa\n• **Persons on PrEP** — test at initiation and at least every 6 months (every 3 months for high-risk MSM)\n• **Multiple sexual partners**, sex work, incarceration history\n• **IV drug users** — needle-sharing and higher-risk sexual activity\n• **Prior STI history** — indicates higher-risk exposure\n\n**Co-testing (MANDATORY with syphilis):**\n• HIV Ag/Ab (4th gen combo)\n• Gonorrhea/Chlamydia NAAT (urine or swab)\n• Hepatitis B surface Ag/Ab/core Ab\n• Hepatitis C antibody [24][25]',
    citation: [1, 2, 14, 24, 25],
    next: 'syph-testing-strategy',

    summary: 'MSM 56% of primary/secondary cases; HIV co-infection 2-5x mutual facilitation; mandatory co-testing: HIV, GC/CT, HepB/C',
  },

  {
    id: 'syph-testing-strategy',
    type: 'question',
    module: 3,
    title: 'Diagnostic Testing Strategy',
    body: 'Two serologic algorithms exist. Most labs now use the **reverse algorithm** (start with treponemal test). No single test is definitive in all scenarios — the combination of NTT + TT + clinical context determines diagnosis. [6][22][23]\n\n[Testing Algorithm Guide](#/info/syph-testing-algorithm)\n\n**Nontreponemal tests (NTT):** RPR, VDRL — detect antibodies to tissue damage, not T. pallidum itself. Quantitative titers correlate with disease activity.\n\n**Treponemal tests (TT):** TP-PA, FTA-ABS, EIA, CIA — detect specific T. pallidum antibodies. ⚠️ Remain **positive for life** (cannot distinguish active vs past).',
    calculatorLinks: [{ id: 'syphilis-serology', label: 'Serology Interpreter' }],
    citation: [6, 22, 23],
    options: [
      {
        label: 'Clinical Suspicion — Order Labs From ED',
        description: 'Primary/secondary findings, exposure, partner notification',
        next: 'syph-ed-orders',
      },
      {
        label: 'Labs Already Resulted — Interpret',
        description: 'RPR/VDRL + treponemal test results available',
        next: 'syph-test-interpret',
      },
      {
        label: 'Point-of-Care Testing Available',
        description: 'Rapid treponemal test, dark-field microscopy',
        next: 'syph-poc-testing',
      },
    ],

    summary: 'Two algorithms: traditional (NTT first) or reverse (TT first) — combination of NTT + TT + clinical context determines diagnosis',
  },

  {
    id: 'syph-ed-orders',
    type: 'info',
    module: 3,
    title: 'ED Lab Orders for Syphilis',
    body: '**Standard ED workup:** [22][23]\n\n**Serologic testing:**\n• RPR (quantitative) — nontreponemal test, reflects disease activity\n• Treponemal test (TP-PA or FTA-ABS) — if not already reflexed by lab\n\n**Co-testing:**\n• HIV Ag/Ab combo (4th generation) — mandatory\n• GC/CT NAAT (urine or swab)\n• Hepatitis B surface Ag/Ab/core Ab, Hepatitis C Ab\n\n**If neurologic symptoms:**\n• LP for CSF-VDRL, cell count, protein → [Neurosyphilis Evaluation](#/tree/neurosyphilis)\n\n**Direct detection (if lesion present):**\n• Dark-field microscopy — definitive for primary syphilis (rarely available in EDs)\n• PCR testing — emerging, not yet FDA-approved in US\n\n**Window period:** NTTs become reactive 1-4 weeks after chancre appears. TTs seroconvert slightly earlier. Very early primary syphilis can be **seronegative** — if clinical suspicion is high, treat empirically and repeat serologies in 2-4 weeks. [22][25]',
    citation: [22, 23, 25],
    next: 'syph-test-interpret',

    summary: 'Order RPR (quantitative) + treponemal test + HIV + GC/CT NAAT + HepB/C; very early primary can be seronegative',
  },

  {
    id: 'syph-poc-testing',
    type: 'info',
    module: 3,
    title: 'Point-of-Care Testing',
    body: 'Rapid treponemal POC tests are becoming available in the US (Syphilis Health Check™, DPP® HIV-syphilis assay). [26][27]\n\n**Performance:**\n• Sensitivity 85-98%, specificity 95-99% for treponemal antibodies\n• Comparable to laboratory-based treponemal testing\n\n**Limitations:**\n• TT positive for life — cannot distinguish active vs treated\n• Still require NTT (RPR) for staging/monitoring\n• Positive → confirm with NTT + different TT\n\n**Dark-field microscopy:** Gold standard for primary chancre diagnosis. Requires immediate examination of fluid from lesion base. Specialized equipment rarely available in EDs.\n\n**PCR-based testing:** Emerging but no FDA-approved tests currently available in the US.',
    citation: [26, 27],
    next: 'syph-test-interpret',

    summary: 'Rapid POC tests 85-98% sensitive — TT positive for life, still need NTT for staging; dark-field rarely available in EDs',
    skippable: true,
  },

  // =====================================================================
  // MODULE 4: TEST INTERPRETATION
  // =====================================================================

  {
    id: 'syph-test-interpret',
    type: 'question',
    module: 4,
    title: 'Serologic Test Interpretation',
    body: 'Interpret the combination of **nontreponemal test** (NTT = RPR or VDRL) and **treponemal test** (TT = TP-PA, FTA-ABS, EIA, or CIA). Both tests may be nonreactive in up to **30% of patients with primary syphilis**. [6][22][23]\n\n[Testing Algorithm Guide](#/info/syph-testing-algorithm)',
    calculatorLinks: [{ id: 'syphilis-serology', label: 'Serology Interpreter' }],
    citation: [6, 22, 23],
    options: [
      {
        label: 'NTT Reactive + TT Reactive',
        description: 'RPR+ and TP-PA/FTA-ABS+ — active or recently treated',
        next: 'syph-both-reactive',
      },
      {
        label: 'NTT Nonreactive + TT Reactive',
        description: 'RPR- but TP-PA+ — previously treated, early primary, or late latent',
        next: 'syph-ntt-neg-tt-pos',
      },
      {
        label: 'NTT Reactive + TT Nonreactive',
        description: 'RPR+ but TP-PA- — possible biologic false positive',
        next: 'syph-ntt-pos-tt-neg',
      },
      {
        label: 'Both Nonreactive',
        description: 'RPR- and TP-PA- — no syphilis or incubating',
        next: 'syph-both-nonreactive',
      },
      {
        label: 'Results Pending — Treat Empirically',
        description: 'High clinical suspicion, treat before results',
        next: 'syph-empiric-treat',
        urgency: 'urgent',
      },
    ],

    summary: 'Interpret NTT + TT combination — both may be nonreactive in 30% of primary syphilis; 5 result patterns',
  },

  {
    id: 'syph-both-reactive',
    type: 'info',
    module: 4,
    title: 'NTT Reactive + TT Reactive',
    body: '**Classic positive result** — confirms treponemal infection. [6][22][23]\n\n**No prior treatment:**\n• New diagnosis — stage and treat accordingly\n• RPR ≥1:32 → higher neurosyphilis risk\n\n**Prior treatment:**\n• Compare current vs prior RPR titer\n• **4-fold rise** (e.g., 1:4 → 1:16) = reinfection/failure → re-treat\n• Stable low titer = **serofast state** (~10% of treated patients) — may not need re-treatment\n\n',
    citation: [6, 22, 23, 28],
    next: 'syph-determine-treatment',

    summary: 'NTT+/TT+ = confirmed treponemal infection — compare titers to prior; 4-fold rise = reinfection/failure',
  },

  {
    id: 'syph-ntt-neg-tt-pos',
    type: 'info',
    module: 4,
    title: 'NTT Nonreactive + TT Reactive',
    body: 'Clinical context determines interpretation. [6][22][23]\n\n**Most common: Previously treated**\n• Documented treatment + asymptomatic → no re-treatment\n\n**Very early primary:**\n• TT seroconverts before NTT\n• Chancre present → treat empirically, repeat RPR in 2-4 weeks\n\n**Very late latent:**\n• NTT reverts in ~25% of untreated late latent\n• No documented treatment → treat as late latent\n\n**Reverse algorithm discordance:**\n• Reactive EIA/CIA + nonreactive NTT → confirm with **different TT** (e.g., TP-PA)\n• Second TT reactive → prior treated or late latent\n• Second TT nonreactive → likely false-positive (no treatment if low risk) [29]',
    citation: [6, 22, 23, 29],
    next: 'syph-determine-treatment',

    summary: 'NTT-/TT+: most likely prior treated; may be very early primary or very late latent — clinical context determines',
  },

  {
    id: 'syph-ntt-pos-tt-neg',
    type: 'info',
    module: 4,
    title: 'NTT Reactive + TT Nonreactive',
    body: 'Most likely **biologic false-positive (BFP)** — no syphilis treatment. [6][22][30]\n\n**BFP causes:** Pregnancy, SLE, antiphospholipid syndrome, acute illness, vaccination, IVDU, liver disease, advanced age, HIV\n\n**Action:** No treatment. Consider repeat TT with different assay. Chronic BFP (>6 mo) → autoimmune workup.\n\n⚠️ **Prozone phenomenon:** Very high titers in secondary syphilis can saturate assay → false-negative NTT. If clinically suspected → request **diluted/prozone-checked RPR**.',
    citation: [6, 22, 30],
    next: 'syph-disposition',

    summary: 'NTT+/TT- = likely biologic false positive — no treatment; prozone phenomenon can cause false-negative in secondary',
  },

  {
    id: 'syph-both-nonreactive',
    type: 'info',
    module: 4,
    title: 'Both Tests Nonreactive',
    body: '**No serologic evidence of syphilis.** [6][22][23]\n\n**High suspicion (chancre present):** May be in window period (1-4 wks post-exposure). Treat empirically, repeat serologies in 2-4 wks.\n\n**Recent exposure (<90 days):** Treat presumptively, repeat serologies in 2-4 wks.\n\n**Low suspicion:** Syphilis excluded.',
    citation: [6, 22, 23],
    next: 'syph-disposition',

    summary: 'Both nonreactive: no syphilis or window period — treat empirically if high suspicion, repeat serology in 2-4 weeks',
  },

  // =====================================================================
  // MODULE 5: TREATMENT
  // =====================================================================

  {
    id: 'syph-determine-treatment',
    type: 'question',
    module: 5,
    title: 'Treatment by Stage',
    body: '[Penicillin G](#/drug/penicillin-g-iv/neurosyphilis) is the only proven treatment for syphilis. Treatment regimen is determined by disease stage. [1][5][31]\n\n[Treatment Summary Table](#/info/syph-treatment-table)\n\nJarisch-Herxheimer reaction may occur within hours of treatment — counsel all patients. [32]',
    citation: [1, 5, 31, 32],
    options: [
      {
        label: 'Primary / Secondary / Early Latent',
        description: 'Benzathine PCN-G 2.4M units IM × 1',
        next: 'syph-treat-early',
      },
      {
        label: 'Late Latent / Tertiary (Non-Neuro)',
        description: 'Benzathine PCN-G 2.4M units IM weekly × 3',
        next: 'syph-treat-late',
      },
      {
        label: 'Neurosyphilis / Ocular / Otic',
        description: 'IV Penicillin G — see neurosyphilis consult',
        next: 'syph-neuro-route',
        urgency: 'critical',
      },
      {
        label: 'Penicillin Allergy',
        description: 'Alternative agents or desensitization',
        next: 'syph-pcn-allergy',
      },
      {
        label: 'Pregnant',
        description: 'PCN ONLY — desensitize if allergic',
        next: 'syph-treat-pregnancy',
        urgency: 'urgent',
      },
    ],

    summary: 'PCN G is the only proven treatment — regimen determined by stage; Jarisch-Herxheimer is NOT an allergy',
  },

  {
    id: 'syph-treat-early',
    type: 'result',
    module: 5,
    title: 'Early Syphilis Treatment',
    body: '**Primary / Secondary / Early Latent (<1 year):** [1][5][31]\n\n[Benzathine Penicillin G](#/drug/benzathine-penicillin/primary) **2.4M units IM × 1 dose**\n\n**Jarisch-Herxheimer:** [32] 10-35% primary, 75-90% secondary. Onset 2-8h, resolves <24h. Fever, rigors, myalgias — NOT an allergic reaction (dying spirochetes). Treat supportively.\n\n[Jarisch-Herxheimer Reaction](#/info/syph-jarisch-herxheimer)\n\n**Follow-up:** RPR at 6 & 12 months. Expect 4-fold titer decline.',
    recommendation: 'Benzathine PCN-G 2.4M units IM × 1. Counsel on Jarisch-Herxheimer. RPR at 6 and 12 months.',
    citation: [1, 5, 31, 32],
    treatment: {
      firstLine: {
        drug: 'Benzathine Penicillin G',
        dose: '2.4 million units',
        route: 'IM',
        frequency: 'single dose',
        duration: '1 dose',
        notes: 'Can split into two gluteal sites; counsel on Jarisch-Herxheimer',
      },
      pcnAllergy: {
        drug: 'Doxycycline',
        dose: '100 mg',
        route: 'PO',
        frequency: 'BID',
        duration: '14 days',
        notes: 'Not in pregnancy',
      },
      monitoring: 'RPR at 6 and 12 months; expect 4-fold titer decline',
    },
    next: 'syph-disposition',
  },

  {
    id: 'syph-treat-late',
    type: 'result',
    module: 5,
    title: 'Late Syphilis Treatment',
    body: '**Late Latent / Tertiary (non-neurologic):** [1][5][31]\n\n[Benzathine Penicillin G](#/drug/benzathine-penicillin/late latent) **2.4M units IM weekly × 3 weeks** (total 7.2M units)\n\n**Missed dose:** >14 days between doses → restart series.\n\n**Before treating:** Rule out neurosyphilis (neuro exam; LP if RPR ≥1:32, HIV+, or neuro symptoms). CV syphilis: treatment doesn\'t reverse aortic damage.\n\n**Follow-up:** RPR at 6, 12, 24 months. No 4-fold decline → evaluate for failure/neurosyphilis.',
    recommendation: 'Benzathine PCN-G 2.4M units IM weekly × 3 weeks. Rule out neurosyphilis. RPR at 6, 12, 24 months.',
    citation: [1, 5, 31],
    treatment: {
      firstLine: {
        drug: 'Benzathine Penicillin G',
        dose: '2.4 million units',
        route: 'IM',
        frequency: 'weekly',
        duration: '3 weeks (total 7.2 million units)',
        notes: '>14 days between doses → restart series; rule out neurosyphilis first',
      },
      pcnAllergy: {
        drug: 'Doxycycline',
        dose: '100 mg',
        route: 'PO',
        frequency: 'BID',
        duration: '28 days',
        notes: 'Rule out neurosyphilis first; not in pregnancy',
      },
      monitoring: 'RPR at 6, 12, 24 months; no 4-fold decline → evaluate for neurosyphilis',
    },
    next: 'syph-disposition',
  },

  {
    id: 'syph-pcn-allergy',
    type: 'question',
    module: 5,
    title: 'Penicillin Allergy Alternatives',
    body: '**Desensitization preferred** — PCN is the only proven curative therapy. [1][5][31][33]\n\n⚠️ **Azithromycin NOT recommended** — macrolide resistance documented, treatment failures in US. [34][35][36]',
    citation: [1, 5, 31, 33, 34, 35, 36],
    options: [
      {
        label: 'Non-Pregnant, Early Syphilis',
        description: 'Doxycycline is the primary alternative',
        next: 'syph-alt-early',
      },
      {
        label: 'Non-Pregnant, Late Latent / Tertiary',
        description: 'Doxycycline 28 days',
        next: 'syph-alt-late',
      },
      {
        label: 'Non-Pregnant, Neurosyphilis',
        description: 'Ceftriaxone or desensitization',
        next: 'syph-alt-neuro',
      },
      {
        label: 'Pregnant — Any Stage',
        description: 'MUST desensitize — no alternatives',
        next: 'syph-treat-pregnancy',
        urgency: 'critical',
      },
    ],

    summary: 'Azithromycin NOT recommended — documented resistance and failures; desensitization preferred over alternatives',
    safetyLevel: 'warning',
  },

  {
    id: 'syph-alt-early',
    type: 'result',
    module: 5,
    title: 'PCN Allergy — Early Syphilis Alternatives',
    body: '**Non-pregnant, Primary / Secondary / Early Latent:** [1][5][31]\n\n**First:** [Doxycycline](#/drug/doxycycline/primary) 100 mg PO BID × 14 days (contraindicated in pregnancy)\n\n**Second:** [Ceftriaxone](#/drug/ceftriaxone/neurosyphilis) 1-2g IM/IV daily × 10-14 days (PCN cross-reactivity ~2-5%)',
    recommendation: 'Doxycycline 100mg PO BID × 14 days. RPR at 6 and 12 months.',
    citation: [1, 5, 31, 34, 35, 36],
    treatment: {
      firstLine: {
        drug: 'Doxycycline',
        dose: '100 mg',
        route: 'PO',
        frequency: 'BID',
        duration: '14 days',
        notes: 'Not in pregnancy',
      },
      alternative: {
        drug: 'Ceftriaxone',
        dose: '1-2g',
        route: 'IM/IV',
        frequency: 'daily',
        duration: '10-14 days',
        notes: 'PCN cross-reactivity ~2-5%',
      },
      monitoring: 'RPR at 6 and 12 months',
    },
    next: 'syph-disposition',
  },

  {
    id: 'syph-alt-late',
    type: 'result',
    module: 5,
    title: 'PCN Allergy — Late Syphilis Alternatives',
    body: '**Non-pregnant, Late Latent / Tertiary:** [1][5][31]\n\n[Doxycycline](#/drug/doxycycline/late latent) **100 mg PO BID × 28 days**\n\n⚠️ **Must rule out neurosyphilis first** — doxy doesn\'t reach CSF. If neuro can\'t be excluded → [Neurosyphilis PCN Allergy](#/node/syph-alt-neuro)',
    recommendation: 'Doxycycline 100mg PO BID × 28 days. Rule out neurosyphilis first. RPR at 6, 12, 24 months.',
    citation: [1, 5, 31],
    treatment: {
      firstLine: {
        drug: 'Doxycycline',
        dose: '100 mg',
        route: 'PO',
        frequency: 'BID',
        duration: '28 days',
        notes: 'Rule out neurosyphilis first; not in pregnancy',
      },
      monitoring: 'RPR at 6, 12, 24 months; ID follow-up essential',
    },
    next: 'syph-disposition',
  },

  // =====================================================================
  // MODULE 6: SPECIAL POPULATIONS & DISPOSITION
  // =====================================================================

  {
    id: 'syph-treat-pregnancy',
    type: 'result',
    module: 6,
    title: 'Syphilis in Pregnancy — Treatment',
    body: '**Penicillin is the ONLY acceptable treatment.** No alternatives prevent congenital syphilis. [3][10][11][12]\n\n**PCN-allergic:** Desensitization is **MANDATORY** (oral protocol preferred, can be done in ED/L&D).\n\n**Treatment:** Same as non-pregnant — Early: 2.4M units × 1; Late: 2.4M units weekly × 3\n\n**Jarisch-Herxheimer in pregnancy:** Can precipitate preterm labor. Continuous fetal monitoring × 24h if viable GA. Do NOT delay treatment.\n\n**Inadequate for congenital prevention:**\n• Non-penicillin regimen\n• Treatment <30 days before delivery\n• No 4-fold titer decline',
    recommendation: 'PCN per stage. PCN-allergic: desensitize. Fetal monitoring if viable GA. OB involvement mandatory.',
    citation: [3, 10, 11, 12],
    treatment: {
      firstLine: {
        drug: 'Benzathine Penicillin G',
        dose: '2.4 million units',
        route: 'IM',
        frequency: 'Per stage',
        duration: 'Early: 1 dose; Late: 3 weekly doses',
        notes: 'ONLY penicillin acceptable in pregnancy',
      },
      pcnAllergy: {
        drug: 'Penicillin desensitization',
        dose: 'Per protocol',
        route: 'Oral (preferred)',
        frequency: 'Single procedure',
        duration: 'Then treat per stage',
        notes: 'MANDATORY — can be done in ED/L&D',
      },
      monitoring: 'Fetal monitoring × 24h if viable GA; monthly RPR until delivery',
    },
    next: 'syph-disposition',
  },

  {
    id: 'syph-alt-neuro',
    type: 'result',
    module: 6,
    title: 'Neurosyphilis — PCN Allergy',
    body: '**Desensitization strongly preferred** — PCN is the only proven neurosyphilis therapy. [1][7][8]\n\n**Alternative:** [Ceftriaxone](#/drug/ceftriaxone/neurosyphilis) 2g IV daily × 10-14 days (PCN cross-reactivity ~2-5%)\n\nTrue IgE-mediated anaphylaxis → desensitization under allergist supervision.\n\n[Neurosyphilis Evaluation](#/tree/neurosyphilis)',
    recommendation: 'Desensitize if possible. Alternative: Ceftriaxone 2g IV daily × 10-14 days.',
    citation: [1, 7, 8, 33],
    treatment: {
      firstLine: {
        drug: 'Ceftriaxone',
        dose: '2g',
        route: 'IV',
        frequency: 'daily',
        duration: '10-14 days',
        notes: 'Desensitization preferred if feasible',
      },
      alternative: {
        drug: 'PCN desensitization + IV Penicillin G',
        dose: '18-24 million units/day',
        route: 'IV',
        frequency: 'q4h (after desensitization)',
        duration: '10-14 days',
        notes: 'Allergist supervision for true IgE-mediated allergy',
      },
      monitoring: 'CSF at 6 months; ID follow-up essential',
    },
    next: 'syph-disposition',
  },

  {
    id: 'syph-empiric-treat',
    type: 'result',
    module: 6,
    title: 'Empiric Treatment',
    body: 'High clinical suspicion, results pending. [1][5]\n\n**Indications:** Partner exposure <90 days, classic chancre, palms/soles rash, high-risk with concerning lesion.\n\n[Benzathine Penicillin G](#/drug/benzathine-penicillin/primary) **2.4M units IM × 1**\n\n⚠️ **Draw RPR + TT BEFORE treatment** to establish baseline. Follow up results — if late latent confirmed, add 2 more weekly doses.',
    recommendation: 'Draw RPR + TT first, then Benzathine PCN-G 2.4M IM × 1. Follow up results.',
    citation: [1, 5],
    treatment: {
      firstLine: {
        drug: 'Benzathine Penicillin G',
        dose: '2.4 million units',
        route: 'IM',
        frequency: 'single dose',
        duration: '1 dose (add 2 more if late latent)',
        notes: 'Draw serologies BEFORE treatment',
      },
      pcnAllergy: {
        drug: 'Doxycycline',
        dose: '100 mg',
        route: 'PO',
        frequency: 'BID',
        duration: '14 days (28 if late latent)',
        notes: 'Not in pregnancy',
      },
      monitoring: 'Follow up results; RPR at 6 and 12 months',
    },
    next: 'syph-disposition',
  },

  {
    id: 'syph-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: 'Most patients discharged after ED treatment. [1][5]\n\n**All patients:** Mandatory public health reporting (all 50 states), partner notification, RPR monitoring.\n\n[Partner Notification & Reporting](#/info/syph-partner-notification)',
    citation: [1, 5],
    options: [
      {
        label: 'Discharge — Uncomplicated Syphilis',
        description: 'Early or late syphilis, treated, stable',
        next: 'syph-discharge',
      },
      {
        label: 'Admit — Neurosyphilis or Complications',
        description: 'IV PCN, cardiac involvement, pregnancy complications',
        next: 'syph-admit',
        urgency: 'urgent',
      },
    ],

    summary: 'Most patients discharged after ED treatment — mandatory public health reporting, partner notification, RPR monitoring',
  },

  {
    id: 'syph-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge Plan',
    body: '**Mandatory:** File public health report, partner notification. [1][5][21]\n\n**Counseling:** No sex × 7 days + lesion resolution. Return for vision/hearing changes or neuro symptoms.\n\n**Follow-up:** STI clinic 1-2 wks. RPR at 6, 12, 24 months. HIV result if pending.',
    recommendation: 'File report. Partner notification. STI clinic follow-up. RPR monitoring.',
    citation: [1, 5, 21],
  },

  {
    id: 'syph-admit',
    type: 'result',
    module: 6,
    title: 'Admission Criteria',
    body: '**Admit for:** [1][6][7]\n• Neurosyphilis (IV PCN × 10-14 days)\n• Ocular syphilis (+ ophthalmology)\n• Otosyphilis (+ ENT/audiology)\n• PCN desensitization\n• Pregnant at viable GA (fetal monitoring)\n• CV syphilis with acute complications\n• Congenital syphilis in newborn\n\n**All admissions:** ID consult mandatory.',
    recommendation: 'Admit for IV PCN. ID consult. Ophthalmology/ENT if ocular/otic.',
    citation: [1, 6, 7],
  },

];

export const SYPHILIS_MODULE_LABELS = [
  'Initial Assessment',
  'Stage Classification',
  'Risk Assessment & Testing',
  'Test Interpretation',
  'Treatment',
  'Special Populations & Disposition',
];

export const SYPHILIS_CITATIONS: Citation[] = [
  { num: 1, text: 'New York City Department of Health and Mental Hygiene. The diagnosis, management, and prevention of syphilis: an update and review. 2019.' },
  { num: 2, text: 'Ramchandani MS, Cannon CA, Marra CM. Syphilis: a modern resurgence. Infect Dis Clin North Am. 2023;37(2):195-222.' },
  { num: 3, text: 'Eppes CS, Stafford I, Rac M. Syphilis in pregnancy: an ongoing public health threat. Am J Obstet Gynecol. 2022;227(6):822-838.' },
  { num: 4, text: 'US Centers for Disease Control and Prevention. Sexually transmitted infections surveillance, 2024 (provisional). 2025.' },
  { num: 5, text: 'Hazra A, Collison MW, Davis AM. CDC sexually transmitted infections treatment guidelines, 2021. JAMA. 2022;327(9):870-871.' },
  { num: 6, text: 'Papp JR, Park IU, Fakile Y, et al. CDC laboratory recommendations for syphilis testing, United States, 2024. MMWR Recomm Rep. 2024;73(1):1-32.' },
  { num: 7, text: 'Smit DP, Cunningham ET Jr, Thorne JE, et al. Ocular syphilis. Ocul Immunol Inflamm. 2023;31(7):1313-1314.' },
  { num: 8, text: 'Ren M, Dashwood T, Walmsley S. The intersection of HIV and syphilis: update on the key considerations in testing and management. Curr HIV/AIDS Rep. 2021;18(4):280-288.' },
  { num: 9, text: 'Chesson HW, Pinkerton SD, Voigt R, et al. HIV infections and associated costs attributable to syphilis coinfection among African Americans. Am J Public Health. 2003;93(6):943-948.' },
  { num: 10, text: 'Uku A, Albujasim Z, Dwivedi T, et al. Syphilis in pregnancy: the impact of "the great imitator." Eur J Obstet Gynecol Reprod Biol. 2021;259:207-210.' },
  { num: 11, text: 'Wan Z, Zhang H, Xu H, et al. Maternal syphilis treatment and pregnancy outcomes: a retrospective study in Jiangxi Province, China. BMC Pregnancy Childbirth. 2020;20(1):648.' },
  { num: 12, text: 'Thean L, Moore A, Nourse C. New trends in congenital syphilis: epidemiology, testing in pregnancy, and management. Curr Opin Infect Dis. 2022;35(5):452-460.' },
  { num: 13, text: 'Peeling RW, Mabey D, Chen XS, et al. Syphilis. Lancet. 2023;402(10398):336-346.' },
  { num: 14, text: 'US Centers for Disease Control and Prevention. Sexually transmitted disease surveillance 2021.' },
  { num: 15, text: 'US Centers for Disease Control and Prevention. National overview of STIs, 2022. Sexually transmitted infections surveillance, 2022.' },
  { num: 16, text: 'Centers for Disease Control and Prevention. Syphilis & MSM (men who have sex with men) – CDC fact sheet. 2024.' },
  { num: 17, text: 'Wu S, Wang J, Guo Q, et al. Prevalence of HIV, syphilis, and hepatitis B and C in pregnant women: a systematic review and meta-analysis. Clin Microbiol Infect. 2023;29(8):1000-1007.' },
  { num: 18, text: 'Chevalier FJ, Bacon O, Johnson KA, et al. Syphilis: a review. JAMA. 2025;334(21):1927-1940.' },
  { num: 19, text: 'Avila-Nieto C, Pedreno-Lopez N, Mitja O, et al. Syphilis vaccine: challenges, controversies and opportunities. Front Immunol. 2023;14:1126170.' },
  { num: 20, text: "US Department of Health and Human Services. Syphilis: a provider's guide to treatment and prevention." },
  { num: 21, text: 'Guidance for STD clinical preventive services for persons infected with HIV. Sex Transm Dis. 2001;28(8):460-463.' },
  { num: 22, text: 'Larsen SA, Steiner BM, Rudolph AH. Laboratory diagnosis and interpretation of tests for syphilis. Clin Microbiol Rev. 1995;8(1):1-21.' },
  { num: 23, text: 'Wendel GD Jr, Sheffield JS, Hollier LM, et al. Treatment of syphilis in pregnancy and prevention of congenital syphilis. Clin Infect Dis. 2002;35(Suppl 2):S200-209.' },
  { num: 24, text: 'Baffi CW, Aban I, Willig JH, et al. New syphilis cases and concurrent STI screening in a Southeastern US HIV clinic. AIDS Patient Care STDS. 2010;24(1):23-29.' },
  { num: 25, text: 'Risseeuw-Appel IM, Kothe FC. Transfusion syphilis: a case report. Sex Transm Dis. 1983;10(4):200-201.' },
  { num: 26, text: 'Saxena AK, Panhotra BR, Naguib M, et al. Nosocomial transmission of syphilis during haemodialysis. Scand J Infect Dis. 2002;34(2):88-92.' },
  { num: 27, text: 'Jordan EOB, W. Textbook of Bacteriology. 14th ed. Philadelphia, PA: Saunders; 1945.' },
  { num: 28, text: 'Mahoney JF, Arnold RC, Harris A. Penicillin treatment of early syphilis — a preliminary report. Am J Public Health Nations Health. 1943;33(12):1387-1391.' },
  { num: 29, text: 'Stokes JH, Sternberg TH, Schwartz WH, et al. The action of penicillin in late syphilis. JAMA. 1944;126(2):73-80.' },
  { num: 30, text: 'Clement ME, Okeke NL, Hicks CB. Treatment of syphilis: a systematic review. JAMA. 2014;312(18):1905-1917.' },
  { num: 31, text: 'Wong T, Singh AE, De P. Primary syphilis: serological treatment response to doxycycline/tetracycline versus benzathine penicillin. Am J Med. 2008;121(10):903-908.' },
  { num: 32, text: 'Li J, Zheng HY. Early syphilis: serological treatment response to doxycycline/tetracycline versus benzathine penicillin. J Infect Dev Ctries. 2014;8(2):228-232.' },
  { num: 33, text: 'Hook EW 3rd, Martin DH, Stephens J, et al. A randomized, comparative pilot study of azithromycin versus benzathine penicillin G for treatment of early syphilis. Sex Transm Dis. 2002;29(8):486-490.' },
  { num: 34, text: 'Riedner G, Rusizoka M, Todd J, et al. Single-dose azithromycin versus penicillin G benzathine for the treatment of early syphilis. N Engl J Med. 2005;353(12):1236-1244.' },
  { num: 35, text: 'Lukehart SA, Godornes C, Molini BJ, et al. Macrolide resistance in Treponema pallidum in the United States and Ireland. N Engl J Med. 2004;351(2):154-158.' },
  { num: 36, text: 'Mitchell SJ, Engelman J, Kent CK, et al. Azithromycin-resistant syphilis infection: San Francisco, California, 2000-2004. Clin Infect Dis. 2006;42(3):337-345.' },
  { num: 37, text: 'Tobin MJ. Fiftieth anniversary of uncovering the Tuskegee syphilis study. Am J Respir Crit Care Med. 2022;205(10):1145-1158.' },
  { num: 38, text: 'Rockwell DH, Yobs AR, Moore MB Jr. The Tuskegee study of untreated syphilis; the 30th year of observation. Arch Intern Med. 1964;114:792-798.' },
  { num: 39, text: 'Semeniuk I, Reverby S. A shocking discovery. Nature. 2010;467(7316):645.' },
  { num: 40, text: 'Roberts CP, Raich A, Stafylis C, et al. Alternative treatments for syphilis during pregnancy. Sex Transm Dis. 2019;46(10):637-640.' },
  { num: 41, text: 'Stafylis C, Keith K, Mehta S, et al. Clinical efficacy of cefixime for the treatment of early syphilis. Clin Infect Dis. 2021;73(5):907-910.' },
  { num: 42, text: 'Luetkemeyer AF, Donnell D, Dombrowski JC, et al. Postexposure doxycycline to prevent bacterial sexually transmitted infections. N Engl J Med. 2023;388(14):1296-1306.' },
  { num: 43, text: 'Molina JM, Charreau I, Chidiac C, et al. Post-exposure prophylaxis with doxycycline to prevent sexually transmitted infections in men who have sex with men. Lancet Infect Dis. 2018;18(3):308-317.' },
  { num: 44, text: 'Tuddenham S, Hamill MM, Ghanem KG. Diagnosis and treatment of sexually transmitted infections: a review. JAMA. 2022;327(2):161-172.' },
  { num: 45, text: 'Chevalier FJ, Bacon O, Johnson KA, Cohen SE. Syphilis. JAMA. 2025;:2840085.' },
  { num: 46, text: 'Ghanem KG, Ram S, Rice PA. The modern epidemic of syphilis. N Engl J Med. 2020;382(9):845-854.' },
  { num: 47, text: 'Hook EW, Dionne JA, Workowski K, et al. One dose versus three doses of benzathine penicillin G in early syphilis. N Engl J Med. 2025;393(9):869-878.' },
  { num: 48, text: 'Park IU, Tran A, Pereira L, Fakile Y. Sensitivity and specificity of treponemal-specific tests for the diagnosis of syphilis. Clin Infect Dis. 2020;71(Suppl 1):S13-S20.' },
];
