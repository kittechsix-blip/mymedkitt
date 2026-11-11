// MedKitt: Frostbite Consult (added 2026-11-09)
// Recognition → Rapid rewarming → Severity grading (Cauchy) → Reperfusion (tPA or iloprost) → Wound care → Compartment syndrome → Delayed amputation and disposition
// 7 modules. Doses live in drug entries; the reperfusion decision and iloprost pump rate live in calculators.
// Sources: WMS frostbite guidelines (2019 full text, 2024 update), FDA AURLUMYN (iloprost) label 2024, Cauchy NEJM 2011, Bruen Arch Surg 2007.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const FROSTBITE_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'frostbite-start',
    type: 'info',
    module: 1,
    title: 'Frostbite: Recognition',
    body: '[Frostbite Steps Summary](#/info/frostbite-summary): stepwise approach.\n\n**Frostbite is tissue that has frozen.** Ice crystals injure cells directly, and after thawing the small vessels clot (microvascular thrombosis). That second injury is the part you can still treat.\n\n**Frostnip** is cold, pale, numb skin that recovers fully on warming, with no tissue freezing. **Frostbite** is graded after rewarming as **superficial** (no tissue loss expected) or **deep** (tissue loss expected).\n\n**DO-NOT-MISS:**\n• **Hypothermia first:** moderate or severe hypothermia is treated before the frostbite.\n• **Never let thawed tissue refreeze.** A thaw-refreeze cycle is worse than staying frozen.\n• **The reperfusion clock starts at thaw:** tPA within 24 h (best within 12 h), [iloprost](#/drug/iloprost/frostbite) (a prostacyclin) up to 72 h.\n• **Compartment syndrome** can develop after thawing. [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'frostbite-cauchy', label: 'Cauchy Grade' },
      { id: 'frostbite-reperfusion', label: 'tPA vs Iloprost' },
    ],
    next: 'frostbite-hypothermia-check',
    summary: 'Hypothermia first, no refreezing, and the tPA/iloprost clock starts at thaw',
    safetyLevel: 'critical',
  },

  {
    id: 'frostbite-hypothermia-check',
    type: 'question',
    module: 1,
    title: 'Core Temperature',
    body: 'Hypothermia makes the extremities clamp down (peripheral vasoconstriction), which worsens frostbite. **Measure a core temperature** (rectal, bladder or esophageal).\n\n**Mild hypothermia** can be treated at the same time as the frostbite. **Moderate or severe hypothermia** should be treated effectively before treating the frostbite. Also treat serious trauma first. [1]',
    citation: [1],
    options: [
      {
        label: 'Moderate or severe hypothermia',
        description: 'Core temperature below 32 °C, altered, shivering stopped',
        next: 'frostbite-hypothermia-first',
        urgency: 'critical',
      },
      {
        label: 'Normal temperature or mild hypothermia',
        description: 'Treat the frostbite now (warm the patient alongside)',
        next: 'frostbite-thaw-status',
      },
    ],
    summary: 'Moderate/severe hypothermia is treated before the frostbite',
  },

  {
    id: 'frostbite-hypothermia-first',
    type: 'info',
    module: 1,
    title: 'Treat Hypothermia First',
    body: 'Open the [Accidental Hypothermia consult](#/tree/hypothermia) and rewarm the core first. Protect the frozen part from trauma and from partial thawing in the meantime.\n\nOnce the core temperature is restored, return here to rewarm the extremity. **Time from thaw still matters** for tPA and iloprost, so note the time the part thaws. [1]',
    citation: [1],
    next: 'frostbite-thaw-status',
    summary: 'Core first; record the time the part thaws',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 2: REWARMING
  // =====================================================================

  {
    id: 'frostbite-thaw-status',
    type: 'question',
    module: 2,
    title: 'Is the Part Still Frozen?',
    body: 'Frozen tissue is hard, pale or waxy and numb. Thawed tissue is soft, and is often red, purple or blistered.\n\n**Record the time of thaw.** It sets the window for [alteplase](#/drug/alteplase/frostbite) (24 h) and [iloprost](#/drug/iloprost/frostbite) (72 h).',
    options: [
      {
        label: 'Still frozen',
        description: 'Hard, pale or waxy',
        next: 'frostbite-rewarm',
        urgency: 'urgent',
      },
      {
        label: 'Already thawed',
        description: 'Thawed on the way in or in the field',
        next: 'frostbite-thawed',
      },
    ],
    summary: 'Frozen: rapid rewarming. Thawed: start supportive care and grade it',
  },

  {
    id: 'frostbite-rewarm',
    type: 'info',
    module: 2,
    title: 'Rapid Rewarming',
    body: '**Immerse the part in water at 37 to 39 °C (98.6 to 102.2 °F),** checked with a thermometer and kept at that temperature as it cools. Circulate the water and keep the skin off the sides of the container. **Do not use dry heat** (fire, heaters): it causes burns.\n\n**Rewarming is complete when the tissue turns red or purple and is soft and pliable,** usually about 30 minutes. Pat dry; do not rub.\n\n**Rewarming hurts.** Give analgesia during it, such as an NSAID or an opioid ([morphine](#/drug/morphine), [hydromorphone](#/drug/hydromorphone)).\n\n**Then, for every patient:**\n• [Ibuprofen](#/drug/ibuprofen/frostbite) 12 mg/kg/day divided twice daily, until healed or surgery (often 4 to 6 weeks).\n• Tetanus prophylaxis per standard guidelines ([Tdap](#/drug/tdap)).\n• Elevate the limb above the heart.\n• Antiseptic in the water (povidone-iodine, chlorhexidine) is optional. [1]',
    citation: [1],
    next: 'frostbite-grade',
    summary: '37-39 °C water until red/purple and pliable (~30 min); analgesia; ibuprofen; tetanus',
    safetyLevel: 'warning',
  },

  {
    id: 'frostbite-thawed',
    type: 'info',
    module: 2,
    title: 'Already Thawed',
    body: 'Do not re-immerse tissue that has already fully thawed. Start the same supportive care:\n• Analgesia.\n• [Ibuprofen](#/drug/ibuprofen/frostbite) 12 mg/kg/day divided twice daily.\n• Tetanus prophylaxis ([Tdap](#/drug/tdap)).\n• Elevate the limb.\n\n**Ask when it thawed.** If it thawed and then refroze, expect deeper injury. [1]',
    citation: [1],
    next: 'frostbite-grade',
    summary: 'No re-immersion; supportive care; establish the time of thaw',
  },

  // =====================================================================
  // MODULE 3: SEVERITY GRADING
  // =====================================================================

  {
    id: 'frostbite-grade',
    type: 'question',
    module: 3,
    title: 'Grade the Injury After Rewarming',
    body: '**Grade after rewarming:** look at how far toward the hand or foot the cyanosis (the persistent blue-grey colour) reaches. Hemorrhagic (bloody) blisters also signal deep injury.\n\n**Cauchy grade** (by the most proximal level of the lesion):\n• **0:** no lesion.\n• **1:** distal phalanx.\n• **2:** middle phalanx, or the proximal phalanx of the thumb or big toe.\n• **3:** proximal phalanx (other digits).\n• **4:** metacarpal or metatarsal.\n• **5:** carpal or tarsal.\n\nHigher grades mean more proximal injury and a greater risk of functionally important amputation. The grading is not formally validated, but it correlates well with bone scans and outcomes. [1][2]',
    images: [
      {
        src: 'images/frostbite/cauchy-grade-levels.svg',
        alt: 'Diagram of one finger and the hand bones beside it, divided into bands from the fingertip toward the wrist: distal phalanx is grade 1, middle phalanx grade 2, proximal phalanx grade 3, metacarpal grade 4, carpal bones grade 5.',
        caption: 'Cauchy grade by the most proximal level of the lesion after rewarming. For the thumb and big toe, the proximal phalanx counts as grade 2. (myMedKitt diagram, after the WMS frostbite guideline.)',
      },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'frostbite-cauchy', label: 'Cauchy Grade' },
    ],
    options: [
      {
        label: 'Grade 0-1: superficial or distal phalanx only',
        description: 'Clear blisters, no proximal cyanosis',
        next: 'frostbite-superficial',
      },
      {
        label: 'Grade 2: middle phalanx (proximal phalanx of the thumb or big toe)',
        description: 'Deep injury short of the proximal phalanx',
        next: 'frostbite-grade2',
        urgency: 'urgent',
      },
      {
        label: 'Grade 3-5: proximal phalanx or beyond',
        description: 'Deep injury at or proximal to the PIP joint',
        next: 'frostbite-reperfusion',
        urgency: 'critical',
      },
    ],
    summary: 'Cauchy grade after rewarming: how far proximally the cyanosis reaches',
  },

  {
    id: 'frostbite-superficial',
    type: 'result',
    module: 3,
    title: 'Superficial Frostbite',
    body: 'No tissue loss is expected. Reperfusion drugs are not indicated.\n\n• Continue [ibuprofen](#/drug/ibuprofen/frostbite), analgesia and elevation.\n• Wound care: [Blisters and dressings](#/node/frostbite-wound).\n• Discharge if pain is controlled and the patient can keep the part warm, dry and protected, with wound follow-up in a few days.\n• Re-grade if the colour changes. Cyanosis that persists or spreads means deeper injury. [1]',
    recommendation: 'Superficial frostbite (Cauchy grade 0-1): supportive care with ibuprofen, analgesia, elevation and blister care. Reperfusion therapy is not indicated. Outpatient follow-up if the patient can protect the tissue.',
    confidence: 'recommended',
    citation: [1],
    summary: 'Supportive care and wound follow-up; no reperfusion therapy',
  },

  {
    id: 'frostbite-grade2',
    type: 'result',
    module: 3,
    title: 'Grade 2: Consider Iloprost',
    body: '**tPA is not indicated at this depth.** The guideline reserves thrombolysis for injury reaching the proximal interphalangeal joint or beyond.\n\nThe WMS 2024 update extends [iloprost](#/drug/iloprost/frostbite) to deep frostbite reaching the distal interphalangeal joint or beyond (Cauchy grade 2 to 4), **within 72 h of injury.** The supporting trial enrolled grade 3 and 4 injuries, so the benefit at grade 2 is extrapolated.\n\nSee [Iloprost](#/node/frostbite-iloprost) for dosing, then [Wound care](#/node/frostbite-wound). [1][2][3]',
    recommendation: 'Cauchy grade 2 frostbite: thrombolysis is not indicated. IV iloprost may be considered within 72 hours of injury per the WMS 2024 update; supportive and wound care for all.',
    confidence: 'consider',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'frostbite-iloprost-rate', label: 'Iloprost Rate' },
    ],
    summary: 'No tPA; consider iloprost within 72 h (WMS 2024)',
  },

  // =====================================================================
  // MODULE 4: REPERFUSION (tPA OR ILOPROST)
  // =====================================================================

  {
    id: 'frostbite-reperfusion',
    type: 'question',
    module: 4,
    title: 'Reperfusion: tPA or Iloprost?',
    body: '**Deep frostbite at or beyond the PIP joint (grade 3 to 5) is time-critical.** Both drugs aim to clear the small-vessel clots that form after thawing.\n\n**Thrombolysis ([alteplase](#/drug/alteplase/frostbite)):** within 24 h of thaw, best within 12 h. Each hour of delay lowers salvage by about 28%. Needs ICU monitoring and angiography or a technetium scan.\n\n**[Iloprost](#/drug/iloprost/frostbite)** (a prostacyclin, PGI2 analogue): first line for grade 3 to 4 up to 72 h after injury when tPA is contraindicated, or where tPA is too risky or evacuation will be delayed.\n\n**Imaging:** angiography or technetium-99m pyrophosphate scintigraphy (or MR angiography) shows the perfusion deficit early and helps monitor treatment. [1][2][4][5]',
    citation: [1, 2, 4, 5],
    calculatorLinks: [
      { id: 'frostbite-reperfusion', label: 'tPA vs Iloprost' },
    ],
    options: [
      {
        label: 'Under 24 h since thaw, no bleeding contraindication, ICU and angiography available',
        description: 'Thrombolysis candidate',
        next: 'frostbite-tpa',
        urgency: 'critical',
      },
      {
        label: 'tPA contraindicated (e.g. intracranial hemorrhage, active bleeding, major trauma) or 24-72 h since thaw',
        description: 'Iloprost candidate',
        next: 'frostbite-iloprost',
        urgency: 'critical',
      },
      {
        label: 'Under 24 h, but no tPA capability here',
        description: 'Transfer decision',
        next: 'frostbite-transfer',
        urgency: 'critical',
      },
      {
        label: 'More than 72 h since injury',
        description: 'Past the studied windows',
        next: 'frostbite-late',
      },
    ],
    summary: 'tPA within 24 h of thaw; iloprost to 72 h or when tPA is contraindicated',
  },

  {
    id: 'frostbite-tpa',
    type: 'result',
    module: 4,
    title: 'Thrombolysis (tPA)',
    body: '**Start as soon as possible.** Best outcomes come within 12 h of thaw, and salvage falls about 28% for each hour of delay.\n\n**Regimen used in the WMS guideline:** [alteplase](#/drug/alteplase/frostbite) 3 mg bolus, then 1 mg/h, IV or intra-arterial, **with** [heparin](#/drug/ufh/frostbite) 500 units/h. Continue until specialists (vascular, burn, interventional radiology) say to stop. Follow local protocol.\n\n**Evidence:** in a retrospective single-centre series, digital amputation fell from 41% without tPA to 10% with tPA within 24 h of injury.\n\n**Risks:** bleeding (systemic and at the catheter site), compartment syndrome, and failure to salvage. Watch the compartments after reperfusion.\n\nThen: [Wound care](#/node/frostbite-wound). [1][4][5]',
    recommendation: 'Deep frostbite at or proximal to the PIP joint within 24 hours of thaw and without contraindication: IV or intra-arterial tPA with concurrent heparin in a monitored setting, as early as possible (ideally within 12 hours).',
    confidence: 'recommended',
    citation: [1, 4, 5],
    summary: 'Alteplase 3 mg bolus then 1 mg/h + heparin 500 units/h in an ICU; sooner is better',
    safetyLevel: 'critical',
  },

  {
    id: 'frostbite-iloprost',
    type: 'result',
    module: 4,
    title: 'Iloprost (Prostacyclin)',
    body: '**[Iloprost](#/drug/iloprost/frostbite) (AURLUMYN)** is a prostacyclin (PGI2) analogue: it dilates vessels and stops platelets clumping. It is FDA approved (2024) for severe frostbite in adults to lower the risk of finger or toe amputation.\n\n**When:** grade 3 to 4 within 72 h of injury when tPA is contraindicated (an intracranial hemorrhage such as a subdural hematoma, active bleeding, major trauma), when it is past the tPA window, or when evacuation will be delayed.\n\n**Label dosing:** start 0.5 ng/kg/min IV and increase by 0.5 ng/kg/min every 30 min as tolerated, to a maximum of 2 ng/kg/min. Run for **6 hours a day, for up to 8 days**. Child-Pugh B or C: start at 0.25 ng/kg/min.\n\n**Watch for hypotension.** Correct it before starting and monitor vital signs. Headache, flushing, nausea and palpitations are common.\n\n**Evidence:** in the randomized trial behind the approval, a day-7 bone-scan defect (which predicts amputation) occurred in 0% with iloprost, 19% with iloprost plus tPA and 60% with buflomedil.\n\nThen: [Wound care](#/node/frostbite-wound). [1][3][6]',
    recommendation: 'Severe frostbite (Cauchy grade 3-4) within 72 hours when thrombolysis is contraindicated or not feasible: IV iloprost per the FDA label, 0.5 ng/kg/min titrated to a maximum of 2 ng/kg/min, 6 hours daily for up to 8 days, with blood pressure monitoring.',
    confidence: 'recommended',
    citation: [1, 3, 6],
    calculatorLinks: [
      { id: 'frostbite-iloprost-rate', label: 'Iloprost Rate' },
    ],
    summary: 'Iloprost 0.5 → max 2 ng/kg/min, 6 h/day up to 8 days; watch BP',
    safetyLevel: 'warning',
  },

  {
    id: 'frostbite-transfer',
    type: 'result',
    module: 4,
    title: 'Transfer for Reperfusion',
    body: '**Transfer to a burn, frostbite or vascular centre** that can give and monitor tPA, if tPA can be started within 24 h of thaw. Call early: the clock is running.\n\n**If transfer will be delayed** past the tPA window, or tPA is too risky, start [iloprost](#/drug/iloprost/frostbite) here if it is available. See [Iloprost](#/node/frostbite-iloprost).\n\nKeep the part warm and protected, and send the time of thaw with the patient. [1]',
    recommendation: 'Deep frostbite within 24 hours of thaw at a centre without thrombolysis capability: early transfer to a centre that can give and monitor tPA; iloprost if transfer would miss the window or tPA is unsafe.',
    confidence: 'recommended',
    citation: [1],
    summary: 'Transfer if tPA can start within 24 h of thaw; iloprost if it cannot',
  },

  {
    id: 'frostbite-late',
    type: 'result',
    module: 4,
    title: 'Beyond 72 Hours',
    body: 'tPA and iloprost were studied within 24 h and 72 h. Past 72 h no reperfusion drug has shown benefit.\n\n• Supportive care: [ibuprofen](#/drug/ibuprofen/frostbite), analgesia, elevation, [wound care](#/node/frostbite-wound).\n• Imaging (technetium scan or MR angiography) to map viable tissue.\n• Refer to a surgeon experienced in frostbite, and plan [delayed amputation](#/node/frostbite-surgery) only if needed. [1]',
    recommendation: 'Deep frostbite presenting more than 72 hours after injury: supportive and wound care, imaging to define viability, and referral to a frostbite-experienced surgeon; no reperfusion therapy has proven benefit in this window.',
    confidence: 'recommended',
    citation: [1],
    summary: 'No proven reperfusion drug; supportive care and surgical referral',
  },

  // =====================================================================
  // MODULE 5: WOUND CARE
  // =====================================================================

  {
    id: 'frostbite-wound',
    type: 'info',
    module: 5,
    title: 'Blisters and Dressings',
    body: '**Blisters:** clear or cloudy blisters hold prostaglandins and thromboxanes that may damage the tissue underneath, so common practice is to **drain clear blisters** (e.g. needle aspiration) and **leave hemorrhagic blisters intact**. The evidence is limited.\n\n**Topical aloe vera** cream or gel on thawed tissue before dressing.\n\n**Dressings:** bulky, dry, padded, with gauze between the digits. Expect swelling. Elevate.\n\n**Antibiotics are not routine.** Give them for significant trauma, another infection source, cellulitis or sepsis.\n\n**Not recommended:** hyperbaric oxygen and sympathectomy (insufficient data). Pentoxifylline has been used but has no controlled trials. [1]',
    images: [
      {
        src: 'images/frostbite/frostbitten-hand-blisters.jpg',
        alt: 'Black-and-white photograph of a frostbitten hand lying flat: the index, middle and ring fingers are swollen with large fluid-filled blisters; the thumb and little finger look less affected.',
        caption: 'Frostbitten hand with large clear blisters on three fingers (Dr. Atkinson, Antarctica). (Herbert Ponting, public domain, via Wikimedia Commons.)',
      },
    ],
    citation: [1],
    next: 'frostbite-compartment',
    summary: 'Drain clear blisters, leave hemorrhagic ones; aloe vera; no routine antibiotics',
  },

  // =====================================================================
  // MODULE 6: COMPARTMENT SYNDROME
  // =====================================================================

  {
    id: 'frostbite-compartment',
    type: 'question',
    module: 6,
    title: 'Compartment Syndrome Check',
    body: 'Thawing reperfuses ischemic tissue, which can raise pressure in closed compartments, especially after tPA. Signs: **tense, painful swelling with reduced movement and sensation.** Reassess repeatedly over the first day. [1]',
    citation: [1],
    options: [
      {
        label: 'Tense, painful swelling with reduced movement or sensation',
        description: 'Possible compartment syndrome',
        next: 'frostbite-fasciotomy',
        urgency: 'critical',
      },
      {
        label: 'No signs of compartment syndrome',
        description: 'Continue care',
        next: 'frostbite-surgery',
      },
    ],
    summary: 'Tense, painful swelling after thaw: measure compartment pressures',
  },

  {
    id: 'frostbite-fasciotomy',
    type: 'result',
    module: 6,
    title: 'Fasciotomy',
    body: '**Urgent surgical evaluation.** Measure compartment pressures. If they are elevated, prompt surgical decompression (fasciotomy) is indicated to save the limb. If tPA is running, tell the surgeon. [1]',
    recommendation: 'Suspected compartment syndrome after thawing: urgent compartment pressure measurement and prompt fasciotomy if pressures are elevated.',
    confidence: 'definitive',
    citation: [1],
    summary: 'Elevated compartment pressures: prompt fasciotomy',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 7: DELAYED AMPUTATION AND DISPOSITION
  // =====================================================================

  {
    id: 'frostbite-surgery',
    type: 'info',
    module: 7,
    title: 'Delayed Amputation',
    body: '**Do not amputate early.** Complete demarcation (the clear line between living and dead tissue) can take **1 to 3 months**, and early surgery removes tissue that would have survived.\n\n**Operate early only for** sepsis from infected frostbitten tissue (wet gangrene) or compartment syndrome.\n\nAngiography, a technetium bone scan or MRI helps set surgical margins together with the exam. A surgeon experienced in frostbite should make the call, by telemedicine if none is local. Involve rehabilitation early: the limb is often insensate, so footwear and orthotics matter. [1]',
    images: [
      {
        src: 'images/frostbite/toes-frostbite-evolving.jpg',
        alt: 'Top view of a foot with frostbitten toes: the big toe is red and swollen with a purple-grey tip and peeling skin; the smaller toes have dark, dry, crusted tips (eschar) with purple discoloration.',
        caption: 'Frostbitten toes as the injury evolves: dark dry tips (eschar), purple-grey discoloration and red swelling; cropped. (CC0, Gerardolagunes, via Wikimedia Commons.)',
      },
    ],
    citation: [1],
    next: 'frostbite-dispo',
    summary: 'Wait 1-3 months for demarcation unless sepsis or compartment syndrome',
  },

  {
    id: 'frostbite-dispo',
    type: 'result',
    module: 7,
    title: 'Disposition',
    body: '• **Admit deep frostbite** (grade 2 or higher), and anyone on tPA (ICU) or iloprost (monitored bed for blood pressure).\n• **Transfer** to a burn or frostbite centre for deep injury when reperfusion or frostbite surgery is not available locally.\n• **Superficial frostbite** can go home if pain is controlled and the part can be kept warm, dry and protected.\n• Continue [ibuprofen](#/drug/ibuprofen/frostbite) until healed or surgery. Warn about cold sensitivity, numbness and pain that can last for months, and avoid re-exposure. [1]',
    recommendation: 'Admit deep frostbite and all patients receiving tPA or iloprost; transfer to a burn or frostbite centre when reperfusion therapy or experienced surgical care is unavailable. Superficial frostbite may be discharged with wound follow-up.',
    confidence: 'recommended',
    citation: [1],
    summary: 'Admit deep injury and anyone on tPA/iloprost; transfer if no capability',
  },

];

export const FROSTBITE_MODULE_LABELS = [
  'Recognition',
  'Rewarming',
  'Severity Grading',
  'Reperfusion: tPA or Iloprost',
  'Wound Care',
  'Compartment Syndrome',
  'Delayed Amputation & Disposition',
];

export const FROSTBITE_CITATIONS: Citation[] = [
  { num: 1, text: 'McIntosh SE, Freer L, Grissom CK, et al. Wilderness Medical Society Clinical Practice Guidelines for the Prevention and Treatment of Frostbite: 2019 Update. Wilderness Environ Med. 2019;30(4S):S19-S32.' },
  { num: 2, text: 'McIntosh SE, Freer L, Grissom CK, et al. Wilderness Medical Society Clinical Practice Guidelines for the Prevention and Treatment of Frostbite: 2024 Update. Wilderness Environ Med. 2024;35(2):183-197.' },
  { num: 3, text: 'AURLUMYN (iloprost) injection, for intravenous use. Prescribing information. US Food and Drug Administration; 2024.' },
  { num: 4, text: 'Bruen KJ, Ballard JR, Morris SE, Cochran A, Edelman LS, Saffle JR. Reduction of the incidence of amputation in frostbite injury with thrombolytic therapy. Arch Surg. 2007;142(6):546-553.' },
  { num: 5, text: 'Nygaard RM, Lacey AM, Lemere A, et al. Time matters in severe frostbite: assessment of limb/digit salvage on the individual patient level. J Burn Care Res. 2017;38(1):53-59.' },
  { num: 6, text: 'Cauchy E, Cheguillaume B, Chetaille E. A controlled trial of a prostacyclin and rt-PA in the treatment of severe frostbite. N Engl J Med. 2011;364(2):189-190.' },
];

export const FROSTBITE_CRITICAL_ACTIONS = [
  { text: 'Treat moderate or severe hypothermia before the frostbite', nodeId: 'frostbite-hypothermia-check' },
  { text: 'Never let thawed tissue refreeze; record the time of thaw', nodeId: 'frostbite-thaw-status' },
  { text: 'Rapid rewarming in 37-39 °C water until red/purple and pliable, with analgesia', nodeId: 'frostbite-rewarm' },
  { text: 'Grade after rewarming (Cauchy): grade 3+ is time-critical for reperfusion', nodeId: 'frostbite-grade' },
  { text: 'tPA within 24 h of thaw (best within 12 h) for deep frostbite without contraindication', nodeId: 'frostbite-tpa' },
  { text: 'Iloprost up to 72 h when tPA is contraindicated (e.g. intracranial hemorrhage) or not feasible', nodeId: 'frostbite-iloprost' },
  { text: 'Watch for compartment syndrome after thaw: fasciotomy if pressures are elevated', nodeId: 'frostbite-compartment' },
  { text: 'Delay amputation 1-3 months until demarcation unless sepsis', nodeId: 'frostbite-surgery' },
];

export const FROSTBITE_NODE_COUNT = FROSTBITE_NODES.length;
