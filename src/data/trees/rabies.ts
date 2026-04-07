// MedKitt — Rabies Consult
// Clinical rabies workup + post-exposure prophylaxis decision tree.
// 7 modules: Initial Assessment → Clinical Rabies → Diagnostic Workup → Exposure Assessment → Animal Risk & Wound Care → PEP Decision → Schedule & Follow-Up
// 30 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const RABIES_CRITICAL_ACTIONS = [
  { text: 'Rabies is 100% fatal once symptomatic - post-exposure prophylaxis is highly effective if given promptly', nodeId: 'rabies-start' },
  { text: 'Bat exposure = PEP even if no bite confirmed (bite marks can be invisible)', nodeId: 'rabies-bat' },
  { text: 'Wound care is the single most effective prevention: wash with soap and water ≥15 minutes', nodeId: 'rabies-wound' },
  { text: 'RIG 20 IU/kg: infiltrate as much as possible into wound, give remainder IM distant from vaccine site', nodeId: 'rabies-full-pep' },
  { text: 'Do NOT give RIG after day 7 of vaccine series (interferes with active immunity)', nodeId: 'rabies-full-pep' },
  { text: 'Immunocompromised: 5-dose vaccine series + RIG (even if previously vaccinated)', nodeId: 'rabies-immunocomp-pep' },
  { text: 'Previously vaccinated immunocompetent: 2 doses only (days 0 and 3), no RIG needed', nodeId: 'rabies-prevax-regimen' },
  { text: 'Pregnancy is NOT a contraindication to rabies PEP', nodeId: 'rabies-full-pep' },
  { text: 'Dogs/cats/ferrets can be observed for 10 days, but START PEP immediately for Category III exposures', nodeId: 'rabies-observe-severe' },
];

export const RABIES_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'rabies-start',
    type: 'info',
    module: 1,
    title: 'Rabies — Clinical Concern or Exposure?',
    body: '[Rabies Steps Summary](#/info/rabies-summary) — quick-reference for both clinical rabies workup and post-exposure prophylaxis.\n\nRabies is nearly **100% fatal once symptomatic**. Post-exposure prophylaxis is highly effective if given promptly — no confirmed PEP failures when administered correctly.\n\nSelect your clinical scenario below.',
    citation: [1, 2],
    next: 'rabies-fork',
  },

  {
    id: 'rabies-fork',
    type: 'question',
    module: 1,
    title: 'Clinical Scenario',
    body: 'Is this a patient with **suspected rabies infection** (neuropsychiatric symptoms + possible exposure history) or a patient with a recent **animal exposure** requiring PEP evaluation?',
    options: [
      {
        label: 'Suspected Rabies Infection',
        description: 'Acute neuropsychiatric illness with possible animal exposure weeks to months ago',
        next: 'rabies-clinical',
      },
      {
        label: 'Animal Exposure / PEP Evaluation',
        description: 'Recent bite, scratch, or animal contact — needs PEP assessment',
        next: 'rabies-contact',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: CLINICAL RABIES
  // =====================================================================

  {
    id: 'rabies-clinical',
    type: 'info',
    module: 2,
    title: 'Suspected Clinical Rabies',
    body: '**Rabies is frequently missed at initial presentation.** The diagnosis requires high clinical suspicion.\n\n**Key clues:**\n• Acute neuropsychiatric illness + travel to rabies-endemic area\n• **Pain, paresthesia, or pruritus at a prior bite site** — relatively specific for rabies\n• History of animal exposure **weeks to months** prior (incubation typically several weeks to months)\n• Patients may not recall or report animal exposures\n\n[Rabies Differential Diagnosis](#/info/rabies-ddx) — distinguishing rabies from HSV encephalitis, tetanus, GBS, and autoimmune encephalitis.\n\n**Infection control:** Standard + contact precautions. Careful handling of saliva, respiratory secretions, CSF. Rabies is **nationally notifiable**.',
    citation: [1, 3, 4],
    next: 'rabies-form',
  },

  {
    id: 'rabies-form',
    type: 'question',
    module: 2,
    title: 'Clinical Form',
    body: 'Approximately **80% develop furious (encephalitic) rabies** and **20% develop paralytic rabies**. These forms are clinically distinct.\n\nBat rabies variants can present atypically.',
    citation: [3, 4],
    options: [
      {
        label: 'Furious Rabies (80%)',
        description: 'Hydrophobia, aerophobia, agitation, fluctuating consciousness',
        next: 'rabies-furious',
      },
      {
        label: 'Paralytic Rabies (20%)',
        description: 'Ascending flaccid paralysis mimicking GBS, preserved consciousness',
        next: 'rabies-paralytic',
      },
      {
        label: 'Atypical Presentation',
        description: 'Focal brainstem signs, myoclonus, hemichorea, Horner\'s syndrome',
        next: 'rabies-atypical',
      },
    ],
  },

  {
    id: 'rabies-furious',
    type: 'info',
    module: 2,
    title: 'Furious (Encephalitic) Rabies',
    body: '**Characteristic features:**\n• **Hydrophobia** — pharyngeal/laryngeal spasms triggered by attempts to swallow water or even the sight/sound of water\n• **Aerophobia** — similar spasms triggered by air blown on the face\n• **Fluctuating consciousness** with periods of agitation alternating with lucidity\n• **Inspiratory spasms** involving contraction of inspiratory muscles\n• **Hypersalivation** with difficulty swallowing\n• **Autonomic dysfunction** — tachycardia, hypertension, hyperthermia\n• Anxiety, hyperexcitability, and delirium\n\n**Average survival: 5-6 days** from symptom onset without intensive care.\n\n**Key differentiators from mimics:**\n• HSV encephalitis — lacks hydrophobia/aerophobia, temporal lobe MRI findings\n• Tetanus — continuous rigidity between spasms (absent in rabies), normal consciousness\n• Autoimmune encephalitis (anti-NMDAR) — prominent seizures (85%), responds to immunotherapy',
    citation: [3, 4, 5],
    next: 'rabies-dx-workup',
  },

  {
    id: 'rabies-paralytic',
    type: 'info',
    module: 2,
    title: 'Paralytic (Dumb) Rabies',
    body: '**Characteristic features:**\n• **Ascending flaccid paralysis** beginning in the bitten extremity — closely mimics Guillain-Barré syndrome\n• **Preserved consciousness** until preterminal phase (key distinguishing feature from GBS)\n• Lower motor neuron weakness without hyperexcitability of furious rabies\n• Progression to coma, myoedema, bladder incontinence\n\n**Average survival: ~11 days** (longer than furious form).\n\n**Distinguishing from GBS:**\n• Pain/paresthesias at bite site (rabies) vs distal paresthesias (GBS)\n• CSF: minimal pleocytosis (rabies) vs albuminocytologic dissociation (GBS)\n• Fever and rapid autonomic dysfunction (rabies) vs progression over 12h-28d (GBS)\n• Exposure history weeks to months prior\n\n**Note:** Paralytic rabies has **lower diagnostic sensitivity** across all specimen types compared to furious rabies.',
    citation: [3, 4, 6, 7],
    next: 'rabies-dx-workup',
  },

  {
    id: 'rabies-atypical',
    type: 'info',
    module: 2,
    title: 'Atypical Rabies Presentations',
    body: '**Bat rabies variants** can present with atypical features:\n• Focal brainstem signs\n• Myoclonus\n• Hemichorea\n• Horner\'s syndrome\n\n**Rare presentations mimicking:**\n• Transverse myelitis\n• Neuromyelitis optica\n• Tetanus with locked jaw\n\n**Diagnostic challenge:** These presentations may not trigger clinical suspicion for rabies. Always consider rabies in the differential of acute, unexplained neuropsychiatric illness — especially with any possible animal exposure history or travel to endemic areas.',
    citation: [3],
    next: 'rabies-dx-workup',
  },

  // =====================================================================
  // MODULE 3: DIAGNOSTIC WORKUP
  // =====================================================================

  {
    id: 'rabies-dx-workup',
    type: 'info',
    module: 3,
    title: 'Diagnostic Workup',
    body: '**Immediately consult local public health laboratory or CDC** — rabies diagnostic testing is not available at most hospital or reference laboratories.\n\n[Diagnostic Specimens & Interpretation](#/info/rabies-dx-guide) — complete 4-specimen protocol with sensitivities and timing.\n\n**No single test is sufficient for antemortem diagnosis.** Four specimen types should be collected:\n\n**1. Saliva** — RT-PCR for viral RNA (≥3 serial samples for >98% sensitivity)\n**2. Nuchal skin biopsy** — DFA for rabies antigen in cutaneous nerves (~100% sensitivity when adequate tissue)\n**3. CSF** — antibody testing (diagnostic in unvaccinated patients; ~100% sensitivity after day 12)\n**4. Serum** — antibody testing\n\n**Combined sensitivity is 100%** when all 4 specimen types are tested.\n\n**Timing:** Early illness (week 1) → prioritize saliva RT-PCR + nuchal biopsy. Later illness (>7-12 days) → antibody testing has higher yield.\n\n**Caveat:** Prior IVIG administration can cause false-positive serology.',
    citation: [8, 9, 10, 11],
    next: 'rabies-mgmt',
  },

  {
    id: 'rabies-mgmt',
    type: 'question',
    module: 3,
    title: 'Management of Clinical Rabies',
    body: 'Once clinical symptoms develop, **no effective therapy exists** and rabies is nearly uniformly fatal.\n\nOf ~10 documented rabies survivors, **most had received partial PEP before symptom onset**, and nearly all had permanent neurological deficits.',
    citation: [2, 3, 12],
    options: [
      {
        label: 'Palliative Care',
        description: 'Appropriate for most cases given the extremely poor prognosis',
        next: 'rabies-palliative',
      },
      {
        label: 'Aggressive / ICU Approach',
        description: 'Consider in young, immunocompetent patients with early detection',
        next: 'rabies-aggressive',
      },
    ],
  },

  {
    id: 'rabies-palliative',
    type: 'result',
    module: 3,
    title: 'Palliative Care Approach',
    body: '**Recommended for most patients with clinical rabies.**\n\n• Liberal use of **sedatives and analgesics** for comfort\n• Symptom management: antispasmodics for pharyngeal spasms, anxiolytics for agitation\n• Family counseling regarding prognosis\n• Avoid unnecessary invasive procedures\n\n**Infection control:**\n• Standard + contact precautions throughout\n• Careful handling of all secretions (saliva, respiratory, CSF)\n• Rapid risk assessment of all exposed personnel in coordination with public health\n• Report to local/state health department — **rabies is nationally notifiable**\n\n**2024 Kentucky/Ohio case:** Inconsistent adherence to standard precautions resulted in **52 of 60 healthcare workers requiring PEP** due to saliva exposure.',
    recommendation: 'Palliative care with liberal sedation/analgesia. Standard + contact precautions. Report to public health. Counsel family on prognosis.',
    confidence: 'recommended',
    citation: [2, 13],
  },

  {
    id: 'rabies-aggressive',
    type: 'result',
    module: 3,
    title: 'Aggressive / ICU Approach',
    body: '**The Milwaukee Protocol has failed in at least 26 subsequent cases** and is now considered ineffective. The original protocol included therapeutic coma with burst suppression, but this is **no longer recommended**.\n\n**Modified approach (current):**\n• Ketamine and midazolam for sedation and dysautonomia\n• Nimodipine (with caution — hypotension risk)\n• ICU supportive care\n• Standard + contact infection control precautions\n\n**Factors that may favor aggressive therapy** (outcomes still poor):\n• Prior partial PEP before symptom onset\n• Young age, previously healthy, immunocompetent\n• Mild neurological disease at therapy initiation\n• New World bat rabies variant (vs canine variant)\n• Early detection of neutralizing antibodies in serum/CSF\n\n**ID and neurology consultation recommended.**',
    recommendation: 'Modified Milwaukee Protocol: ketamine + midazolam + nimodipine + ICU support. Outcomes remain extremely poor. ID and neuro consults. Standard + contact precautions. Report to public health.',
    confidence: 'consider',
    citation: [2, 3, 12, 14],
    treatment: {
      firstLine: {
        drug: 'Ketamine + Midazolam',
        dose: 'Ketamine: titrate for sedation; Midazolam: titrate for dysautonomia control',
        route: 'IV',
        frequency: 'Continuous infusion',
        duration: 'Throughout ICU course',
        notes: 'Modified Milwaukee Protocol. Therapeutic coma with burst suppression is NO LONGER recommended. Outcomes remain extremely poor.',
      },
      alternative: {
        drug: 'Nimodipine',
        dose: '60 mg PO/NG q4h (use with caution)',
        route: 'PO or NG',
        frequency: 'Every 4 hours',
        duration: 'Throughout ICU course',
        notes: 'Use with caution due to hypotension risk. Monitor BP closely.',
      },
      monitoring: 'ICU-level monitoring. ID and neurology consultation. Standard + contact precautions. Report to public health. Monitor for hypotension with nimodipine.',
    },
  },

  // =====================================================================
  // MODULE 4: EXPOSURE ASSESSMENT
  // =====================================================================

  {
    id: 'rabies-contact',
    type: 'question',
    module: 4,
    title: 'Type of Animal Contact',
    body: 'Classify the exposure using WHO categories.\n\n**Category I — No exposure:** Touching, feeding, licks on intact skin\n**Category II — Minor:** Nibbling uncovered skin, minor scratches/abrasions without bleeding\n**Category III — Severe:** Transdermal bites/scratches, mucous membrane contamination, broken skin + saliva, **any direct bat contact**',
    citation: [1, 15],
    options: [
      {
        label: 'Category I — Touching/feeding, licks on intact skin',
        description: 'No broken skin, no mucous membrane contact',
        next: 'rabies-cat1',
      },
      {
        label: 'Category II — Minor scratches, nibbling, no bleeding',
        description: 'Uncovered skin contact, minor abrasion without bleeding',
        next: 'rabies-animal-type',
      },
      {
        label: 'Category III — Bite, scratch through skin, mucous membrane',
        description: 'Transdermal wound, saliva on broken skin, or bat contact',
        next: 'rabies-animal-type-severe',
      },
    ],
  },

  {
    id: 'rabies-cat1',
    type: 'result',
    module: 4,
    title: 'No PEP Indicated — Category I',
    body: 'Skin was not broken and no mucous membrane contamination occurred. This is **not a rabies exposure**.\n\n**Wound care:** Wash affected area with soap and water as a general hygiene measure.\n\nUpdate tetanus prophylaxis if not current.',
    recommendation: 'PEP is not recommended. Provide reassurance and wound care. If patient reports a bite or broken skin on re-evaluation, reassess as Category II or III.',
    confidence: 'definitive',
    citation: [1, 15],
  },

  // =====================================================================
  // MODULE 5: ANIMAL RISK & WOUND CARE
  // =====================================================================

  {
    id: 'rabies-animal-type',
    type: 'question',
    module: 5,
    title: 'Animal Species — Category II',
    body: 'What animal was involved? Species determines risk level and whether observation is an option.\n\n[Rabies Risk by Animal Type](#/info/rabies-animal-risk) — detailed reference table.',
    citation: [1, 16],
    options: [
      {
        label: 'Dog, cat, or ferret',
        description: 'Domestic animals — 10-day observation may be possible',
        next: 'rabies-observe',
      },
      {
        label: 'Bat',
        description: 'Any direct bat contact — treat as Category III',
        next: 'rabies-bat',
      },
      {
        label: 'Raccoon, skunk, fox, coyote',
        description: 'High-risk terrestrial wildlife',
        next: 'rabies-wildlife-cat2',
      },
      {
        label: 'Rodent, rabbit, or small mammal',
        description: 'Low-risk species',
        next: 'rabies-rodent',
      },
    ],
  },

  {
    id: 'rabies-animal-type-severe',
    type: 'question',
    module: 5,
    title: 'Animal Species — Category III',
    body: 'What animal caused the severe exposure?\n\nCategory III exposures require **RIG + vaccine** unless the animal can be confirmed rabies-negative.\n\n[Rabies Risk by Animal Type](#/info/rabies-animal-risk) — detailed reference.',
    citation: [1, 16],
    options: [
      {
        label: 'Dog, cat, or ferret',
        description: 'Domestic animals — 10-day observation if healthy and available',
        next: 'rabies-observe-severe',
      },
      {
        label: 'Bat',
        description: 'Any bat contact — PEP indicated',
        next: 'rabies-bat',
      },
      {
        label: 'Raccoon, skunk, fox, coyote',
        description: 'High-risk wildlife — immediate PEP',
        next: 'rabies-wildlife-cat3',
      },
      {
        label: 'Rodent, rabbit, or small mammal',
        description: 'Very low risk — consult public health',
        next: 'rabies-rodent',
      },
    ],
  },

  {
    id: 'rabies-observe',
    type: 'info',
    module: 5,
    title: '10-Day Observation — Category II (Vaccine Only)',
    body: '**Healthy dogs, cats, and ferrets can be observed for 10 days.**\n\nIf animal is:\n• **Available and healthy** — begin wound care, **hold PEP** pending observation. If animal develops signs of rabies or dies → begin PEP immediately.\n• **Unavailable, stray, or wild-acting** — begin PEP now (vaccine only for Category II)\n• **Dead or euthanized** — send head for testing. Begin PEP pending results; discontinue if negative.\n\n**Observation applies ONLY to dogs, cats, and ferrets.** No reliable observation period exists for wildlife.',
    citation: [1, 16, 17],
    next: 'rabies-wound',
  },

  {
    id: 'rabies-observe-severe',
    type: 'info',
    module: 5,
    title: '10-Day Observation — Category III (RIG + Vaccine)',
    body: '**Healthy dogs, cats, and ferrets can be observed for 10 days.**\n\nFor Category III exposures:\n• **Animal available and healthy** — **Start RIG + vaccine immediately.** If animal remains healthy at day 10, may discontinue vaccine series.\n• **Animal unavailable, stray, or wild-acting** — complete full RIG + vaccine series\n• **Dead or euthanized** — send head for testing. Start PEP pending results; discontinue if negative.\n\n**Do NOT delay RIG for Category III exposures.** RIG must be given with the first vaccine dose and **cannot be given after day 7** of the vaccine series.',
    citation: [1, 16, 17],
    next: 'rabies-wound',
  },

  {
    id: 'rabies-bat',
    type: 'info',
    module: 5,
    title: 'Bat Exposure — Special Rules',
    body: '**Bats require a lower threshold for PEP due to small, unnoticed bites.**\n\nPEP IS indicated if bat was found in room with:\n• Sleeping person\n• Unattended child\n• Intoxicated or cognitively impaired person\n• Person who cannot reliably exclude bite/scratch\n\nPEP is NOT indicated ONLY if patient can **definitively confirm** no bite, scratch, or mucous membrane exposure occurred.\n\n**Bat bites can be virtually invisible** — fang marks may not be visible to the naked eye.\n\n**All bat exposures should be treated as Category III** (RIG + vaccine) unless definitively excluded.',
    citation: [1, 16],
    next: 'rabies-wound',
  },

  {
    id: 'rabies-wildlife-cat2',
    type: 'info',
    module: 5,
    title: 'High-Risk Wildlife — Category II',
    body: 'Raccoons, skunks, foxes, and coyotes are **high-risk rabies reservoir species** in the US.\n\n• If animal captured/killed → send for testing. Start vaccine pending results.\n• If animal escaped → assume rabid, begin **vaccine series** (no RIG for Category II).\n\n**Wild animal behavior note:** A "friendly" or diurnal raccoon/skunk should raise suspicion for rabies.',
    citation: [1, 16],
    next: 'rabies-wound',
  },

  {
    id: 'rabies-wildlife-cat3',
    type: 'info',
    module: 5,
    title: 'High-Risk Wildlife — Category III',
    body: 'Raccoons, skunks, foxes, and coyotes are **high-risk rabies reservoir species** in the US.\n\n**Immediate PEP (RIG + vaccine) is indicated for all Category III wildlife exposures.**\n\n• If captured/killed → send for testing. Start full PEP pending results; discontinue only if testing confirms negative.\n• If escaped → complete full PEP course.\n\nConsult local public health for animal disposition and testing.',
    citation: [1, 16],
    next: 'rabies-wound',
  },

  {
    id: 'rabies-rodent',
    type: 'result',
    module: 5,
    title: 'PEP Generally Not Indicated — Small Rodent/Rabbit',
    body: 'Small rodents (mice, rats, squirrels, hamsters, gerbils, guinea pigs, chipmunks) and rabbits are **almost never found to be infected with rabies** and have not been known to transmit rabies to humans.\n\n**Exceptions requiring public health consultation:**\n• **Woodchucks (groundhogs)** — higher risk among rodents\n• Unusual behavior in the animal\n• Local public health advisory\n\n**Wound care:** Wash with soap and water ≥15 minutes. Update tetanus if needed.',
    recommendation: 'PEP is not routinely recommended. Provide wound care. Contact local public health if any concern. For woodchuck/groundhog bites, consult public health — PEP may be indicated.',
    confidence: 'recommended',
    citation: [1, 16],
  },

  {
    id: 'rabies-wound',
    type: 'info',
    module: 5,
    title: 'Wound Management',
    body: '**Wound care is the single most effective rabies prevention measure** — reduces risk by up to 90% in animal studies.\n\n**Immediate wound care:**\n1. **Wash wound with soap and water for at least 15 minutes** — vigorous flushing\n2. Irrigate with **povidone-iodine** (Betadine) or virucidal agent if available\n3. Do NOT apply caustic agents (bleach, acid)\n\n**Suturing guidance:**\n• **Delay primary closure if possible** — leaving wounds open reduces infection risk\n• If suturing required for cosmetic/hemostatic reasons: **infiltrate RIG into wound bed first**, then suture loosely\n• Approximate wound edges rather than tight closure\n\n**Tetanus:** Update tetanus prophylaxis per standard wound guidelines if not current.',
    citation: [1, 15, 18],
    treatment: {
      firstLine: {
        drug: 'Povidone-iodine (Betadine)',
        dose: 'Topical irrigation after soap and water wash',
        route: 'Topical',
        frequency: 'Once (at initial wound care)',
        duration: 'Single application',
        notes: 'Wash wound with soap and water for at least 15 minutes FIRST, then irrigate with povidone-iodine. Do NOT apply caustic agents (bleach, acid).',
      },
      alternative: {
        drug: 'Soap and water only',
        dose: 'Vigorous flushing for at least 15 minutes',
        route: 'Topical',
        frequency: 'Once',
        duration: 'Single application',
        notes: 'If povidone-iodine unavailable, thorough soap and water irrigation alone is effective.',
      },
      monitoring: 'Watch for signs of wound infection. Update tetanus prophylaxis if not current. Delay primary closure if possible.',
    },
    next: 'rabies-pep-decision',
  },

  // =====================================================================
  // MODULE 6: PEP DECISION
  // =====================================================================

  {
    id: 'rabies-pep-decision',
    type: 'question',
    module: 6,
    title: 'Previous Rabies Vaccination?',
    body: 'Has the patient **previously completed** a full rabies vaccine series (pre-exposure or post-exposure)?\n\nPreviously vaccinated patients need a **shorter protocol** (2 doses, no RIG) unless immunocompromised.',
    citation: [1, 18],
    options: [
      {
        label: 'No — Not previously vaccinated',
        description: 'First time receiving rabies PEP',
        next: 'rabies-immune-check',
      },
      {
        label: 'Yes — Previously vaccinated',
        description: 'Completed prior pre- or post-exposure series',
        next: 'rabies-prevax-immune',
      },
    ],
  },

  {
    id: 'rabies-immune-check',
    type: 'question',
    module: 6,
    title: 'Immunocompromised?',
    body: 'Is the patient immunocompromised?\n\n**Immunocompromising conditions include:**\n• HIV/AIDS\n• Active chemotherapy or radiation\n• Chronic corticosteroid use (>2 mg/kg or >20 mg/day prednisone for >14 days)\n• Solid organ or stem cell transplant\n• Primary immunodeficiency\n• Anti-CD20 therapy (rituximab) within 6 months',
    citation: [1, 19],
    options: [
      {
        label: 'No — Immunocompetent',
        description: 'Standard PEP protocol',
        next: 'rabies-full-pep',
      },
      {
        label: 'Yes — Immunocompromised',
        description: 'Modified protocol — 5-dose series + serology',
        next: 'rabies-immunocomp-pep',
      },
    ],
  },

  {
    id: 'rabies-prevax-immune',
    type: 'question',
    module: 6,
    title: 'Previously Vaccinated — Immune Status',
    body: 'Previously vaccinated patients have an **anamnestic immune response** — they need only 2 vaccine doses and **no RIG**.\n\nHowever, immunocompromised patients may not mount an adequate anamnestic response.',
    citation: [1, 18],
    options: [
      {
        label: 'Immunocompetent',
        description: '2-dose series, no RIG',
        next: 'rabies-prevax-regimen',
      },
      {
        label: 'Immunocompromised',
        description: 'Full protocol — RIG + 5-dose series + serology',
        next: 'rabies-immunocomp-pep',
      },
    ],
  },

  {
    id: 'rabies-full-pep',
    type: 'info',
    module: 6,
    title: 'Full PEP — RIG + 4-Dose Vaccine',
    body: '**RABIES IMMUNE GLOBULIN (RIG)**\n• [Rabies Immune Globulin (HRIG)](#/drug/rabies-rig/rabies pep) **20 IU/kg**\n• **Infiltrate as much as anatomically feasible into and around the wound(s)**\n• Inject remainder IM at a site **distant from the vaccine injection site**\n• Give with the first vaccine dose ONLY — **do NOT give RIG after day 7** of the vaccine series\n• Do NOT exceed 20 IU/kg (may interfere with active antibody production)\n\n**RABIES VACCINE**\n• [Rabies Vaccine (HDCV or PCECV)](#/drug/rabies-vaccine/rabies pep unvaccinated) **1.0 mL IM** deltoid (adults) or anterolateral thigh (children)\n• **4-dose series: Days 0, 3, 7, 14**\n• Day 0 = today (give vaccine at a different site than RIG)\n\n**PREGNANCY** is NOT a contraindication to rabies PEP.',
    citation: [1, 18, 19, 20],
    treatment: {
      firstLine: {
        drug: 'Rabies Immune Globulin (HRIG) + Rabies Vaccine (HDCV or PCECV)',
        dose: 'HRIG 20 IU/kg (infiltrate wound, remainder IM) + Vaccine 1.0 mL IM',
        route: 'IM (deltoid for adults, anterolateral thigh for children)',
        frequency: 'HRIG: Day 0 only; Vaccine: Days 0, 3, 7, 14',
        duration: '4-dose vaccine series over 14 days',
        notes: 'Infiltrate as much HRIG as anatomically feasible into wound. Give vaccine at different site than RIG. Do NOT give RIG after day 7.',
      },
      monitoring: 'Schedule vaccine doses per protocol. Watch wound for infection. Vaccine side effects: injection site pain (up to 74%), headache, nausea.',
    },
    next: 'rabies-schedule',
  },

  {
    id: 'rabies-immunocomp-pep',
    type: 'info',
    module: 6,
    title: 'Immunocompromised PEP — RIG + 5-Dose Vaccine',
    body: '**Immunocompromised patients require a modified protocol:**\n\n**RIG** — Give **even if previously vaccinated:**\n• [Rabies Immune Globulin (HRIG)](#/drug/rabies-rig/rabies pep) **20 IU/kg** — infiltrate wound, remainder IM distant from vaccine\n\n**VACCINE — 5-dose series:**\n• [Rabies Vaccine (HDCV or PCECV)](#/drug/rabies-vaccine/rabies pep immunocompromised) **1.0 mL IM**\n• **Days 0, 3, 7, 14, and 28** (additional day 28 dose)\n\n**POST-VACCINATION SEROLOGY:**\n• Check rabies virus neutralizing antibody (RVNA) titer **7-14 days after last dose**\n• Adequate response: ≥0.5 IU/mL\n• If inadequate: administer additional vaccine dose and recheck\n\n**ID/infectious disease consultation recommended** for all immunocompromised patients.',
    citation: [1, 19],
    treatment: {
      firstLine: {
        drug: 'Rabies Immune Globulin (HRIG) + Rabies Vaccine (HDCV or PCECV)',
        dose: 'HRIG 20 IU/kg (infiltrate wound, remainder IM) + Vaccine 1.0 mL IM',
        route: 'IM (deltoid for adults, anterolateral thigh for children)',
        frequency: 'HRIG: Day 0 only; Vaccine: Days 0, 3, 7, 14, 28',
        duration: '5-dose vaccine series over 28 days',
        notes: 'Give RIG even if previously vaccinated. ID consultation recommended. Additional day 28 dose for immunocompromised.',
      },
      monitoring: 'Check RVNA titer 7-14 days after last dose. Adequate response: ≥0.5 IU/mL. If inadequate, give additional dose and recheck.',
    },
    next: 'rabies-schedule',
  },

  {
    id: 'rabies-prevax-regimen',
    type: 'info',
    module: 6,
    title: 'Previously Vaccinated — 2-Dose Booster',
    body: '**No RIG needed** — previously vaccinated, immunocompetent patients already have memory B cells.\n\n**VACCINE — 2-dose series:**\n• [Rabies Vaccine (HDCV or PCECV)](#/drug/rabies-vaccine/rabies pep previously vaccinated) **1.0 mL IM** deltoid (adults) or anterolateral thigh (children)\n• **Days 0 and 3** only\n\n**Applies to patients who have received:**\n• Prior complete PEP series\n• Pre-exposure prophylaxis (2- or 3-dose series)\n• Prior series with documented adequate antibody titer',
    citation: [1, 18],
    treatment: {
      firstLine: {
        drug: 'Rabies Vaccine (HDCV or PCECV)',
        dose: '1.0 mL IM',
        route: 'IM (deltoid for adults, anterolateral thigh for children)',
        frequency: 'Days 0 and 3',
        duration: '2-dose booster series over 3 days',
        notes: 'No RIG needed for previously vaccinated immunocompetent patients. Applies to prior complete PEP, pre-exposure prophylaxis, or documented adequate antibody titer.',
      },
      monitoring: 'Schedule Day 3 vaccine dose. Watch wound for infection. Routine serology not needed for immunocompetent patients.',
    },
    next: 'rabies-schedule',
  },

  // =====================================================================
  // MODULE 7: SCHEDULE & FOLLOW-UP
  // =====================================================================

  {
    id: 'rabies-schedule',
    type: 'info',
    module: 7,
    title: 'Vaccination Schedule',
    body: '**UNVACCINATED, IMMUNOCOMPETENT — 4 doses:**\nDay 0 (today) | Day 3 | Day 7 | Day 14\n+ RIG on Day 0 only\n\n**UNVACCINATED, IMMUNOCOMPROMISED — 5 doses:**\nDay 0 (today) | Day 3 | Day 7 | Day 14 | Day 28\n+ RIG on Day 0 (even if previously vaccinated)\n+ Post-series serology\n\n**PREVIOUSLY VACCINATED, IMMUNOCOMPETENT — 2 doses:**\nDay 0 (today) | Day 3\nNo RIG needed\n\n**Administration site:**\n• Adults: **deltoid muscle** (NEVER gluteal — poor immunogenicity)\n• Children: anterolateral thigh acceptable\n• Vaccine and RIG must be given at **different anatomic sites**\n\n[Rabies PEP — Patient Information](#/info/rabies-patient-info) — shareable vaccination schedule and return instructions.',
    citation: [1, 18, 19],
    next: 'rabies-followup',
  },

  {
    id: 'rabies-followup',
    type: 'result',
    module: 7,
    title: 'Follow-Up and Disposition',
    body: '**FOLLOW-UP VACCINATION VISITS:**\n• Schedule vaccine doses per protocol above\n• Doses can be given at PCP, urgent care, public health department, or ED\n• **Do not restart the series if a dose is delayed** — resume where left off\n\n**ANIMAL OBSERVATION (dogs/cats/ferrets only):**\n• If 10-day observation in progress → contact animal control/public health for updates\n• Animal develops rabies signs or dies → ensure PEP is completed\n• Animal healthy at day 10 → may discontinue vaccine series\n\n**MONITORING:**\n• Watch wound for signs of infection\n• Vaccine side effects: injection site pain (up to 74%), headache, nausea — generally mild\n• Rare: immune complex-like reaction (urticaria, arthralgias) with booster doses of HDCV\n\n**PUBLIC HEALTH:**\n• Report animal bite to local animal control/health department\n• Ensure animal disposition plan is in place',
    recommendation: 'Administer Day 0 vaccine (+ RIG if indicated) before discharge. Schedule remaining vaccine doses. Report bite to animal control. Provide wound care instructions. Return for signs of wound infection or if observation animal becomes ill.',
    confidence: 'recommended',
    citation: [1, 18, 17],
  },
];

export const RABIES_MODULE_LABELS = [
  'Initial Assessment',
  'Clinical Rabies',
  'Diagnostic Workup',
  'Exposure Assessment',
  'Animal Risk & Wound Care',
  'PEP Decision',
  'Schedule & Follow-Up',
];

export const RABIES_CITATIONS: Citation[] = [
  { num: 1, text: 'Manning SE, et al. Human Rabies Prevention — United States, 2008: Recommendations of the Advisory Committee on Immunization Practices (ACIP). MMWR Recomm Rep. 2008;57(RR-3):1-28.' },
  { num: 2, text: 'Fooks AR, Banyard AC, Horton DL, et al. Current Status of Rabies and Prospects for Elimination. Lancet. 2014;384(9951):1389-99.' },
  { num: 3, text: 'Hemachudha T, Ugolini G, Wacharapluesadee S, et al. Human Rabies: Neuropathogenesis, Diagnosis, and Management. Lancet Neurol. 2013;12(5):498-513.' },
  { num: 4, text: 'Jackson AC. Rabies: A Medical Perspective. Rev Sci Tech. 2018;37(2):569-580.' },
  { num: 5, text: 'Tyler KL. Acute Viral Encephalitis. N Engl J Med. 2018;379(6):557-566.' },
  { num: 6, text: 'Yuki N, Hartung HP. Guillain-Barré Syndrome. N Engl J Med. 2012;366(24):2294-304.' },
  { num: 7, text: 'Gadre G, et al. Rabies Viral Encephalitis: Clinical Determinants in Diagnosis With Special Reference to Paralytic Form. J Neurol Neurosurg Psychiatry. 2010;81(7):812-20.' },
  { num: 8, text: 'Miller JM, Binnicker MJ, Campbell S, et al. Guide to Utilization of the Microbiology Laboratory for Diagnosis of Infectious Diseases: 2024 Update (IDSA/ASM). Clin Infect Dis. 2024;ciae104.' },
  { num: 9, text: 'Swedberg C, et al. Maximizing Human Rabies Case Detection: Understanding the Diagnostic Sensitivity of Antemortem Testing From 35 Years of U.S. Data. Clin Infect Dis. 2025;ciaf666.' },
  { num: 10, text: 'Damodar T, Mani RS, Prathyusha PV. Utility of Rabies Neutralizing Antibody Detection in CSF and Serum for Ante-Mortem Diagnosis. PLoS Negl Trop Dis. 2019;13(1):e0007128.' },
  { num: 11, text: 'Venkatesan A, et al. Acute Encephalitis in Immunocompetent Adults. Lancet. 2019;393(10172):702-716.' },
  { num: 12, text: 'Jackson AC. Current and Future Approaches to the Therapy of Human Rabies. Antiviral Res. 2013;99(1):61-7.' },
  { num: 13, text: 'Barger A, et al. Imported Human Rabies — Kentucky and Ohio, 2024. MMWR. 2026;75(2):23-27.' },
  { num: 14, text: 'Appolinario CM, Jackson AC. Antiviral Therapy for Human Rabies. Antiviral Ther. 2015;20(1):1-10.' },
  { num: 15, text: 'WHO. Rabies Vaccines: WHO Position Paper — April 2018. Wkly Epidemiol Rec. 2018;93(16):201-220.' },
  { num: 16, text: 'Pieracci EG, et al. Vital Signs: Trends in Human Rabies Deaths and Exposures — United States, 1938-2018. MMWR. 2019;68(23):524-528.' },
  { num: 17, text: 'National Association of State Public Health Veterinarians. Compendium of Animal Rabies Prevention and Control, 2016. JAVMA. 2016;248(5):505-517.' },
  { num: 18, text: 'Rupprecht CE, et al. Use of a Reduced (4-Dose) Vaccine Schedule for Postexposure Prophylaxis to Prevent Human Rabies — ACIP, 2010. MMWR Recomm Rep. 2010;59(RR-2):1-9.' },
  { num: 19, text: 'Rabies Vaccine (Imovax Rabies, RabAvert) Package Inserts. FDA/DailyMed.' },
  { num: 20, text: 'Hwang GS, et al. Adherence to Guideline Recommendations for HRIG in Rabies PEP. Hum Vaccin Immunother. 2020;16(1):51-60.' },
];
