// MedKitt — Resuscitative Hysterotomy (Perimortem Cesarean Delivery)
// Time-critical delivery of the fetus during maternal cardiac arrest to restore maternal circulation
// 6 modules: Recognition → Pre-Arrest Optimization → Arrest Response → 4-Minute Decision → Procedure → Post-Delivery
// 34 nodes total.
// Primary source: EMCrit — Weingart, Swaminathan (emcrit.org/emcrit/resuscitative-hysterotomy/)
// Secondary: AHA 2023 Scientific Statement (Circulation); SOAP 2014 Consensus (A&A); Katz 1986; Rose 2015 AJOG; Einav 2012 Resuscitation; ACOG

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const RESUSCITATIVE_HYSTEROTOMY_CRITICAL_ACTIONS = [
  { text: 'Recognize: fundus at or above umbilicus + cardiac arrest', nodeId: 'rh-fundal-check' },
  { text: 'Left Lateral Uterine Displacement (LUD) — manual, continuous', nodeId: 'rh-lud' },
  { text: 'Start the clock — designate timekeeper', nodeId: 'rh-start-timer' },
  { text: 'Decision by 4 minutes — incision by 5 minutes if no ROSC', nodeId: 'rh-decision-point' },
  { text: 'Do NOT move patient — hysterotomy at arrest site', nodeId: 'rh-proceed' },
  { text: 'Scalpel is the only tool you need — start', nodeId: 'rh-equipment' },
  { text: 'Continue CPR throughout the procedure', nodeId: 'rh-continue-cpr' },
  { text: 'Vertical skin, vertical uterus — fastest route', nodeId: 'rh-uterine-incision' },
  { text: 'Oxytocin + TXA + bimanual massage after delivery', nodeId: 'rh-uterine-atony' },
];

export const RESUSCITATIVE_HYSTEROTOMY_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & INDICATIONS
  // =====================================================================

  {
    id: 'rh-start',
    type: 'info',
    module: 1,
    title: 'Resuscitative Hysterotomy',
    body: '[Resuscitative Hysterotomy Steps Summary](#/info/rh-summary) — quick-reference checklist.\n\n**Resuscitative hysterotomy (RH)** — formerly perimortem cesarean delivery (PMCD) — is emergent delivery of the fetus in the setting of maternal cardiac arrest. The primary goal is **maternal resuscitation**, not fetal rescue. [1][2]\n\n**Why the name change?** "Perimortem" implied certain maternal death. "Resuscitative" reframes the procedure as **part of the resuscitation itself** — aortocaval decompression after delivery increases cardiac preload by ~60-80%, which is often the single maneuver that achieves ROSC. [2][3]\n\n**Core concept:** After ~20 weeks gestation the gravid uterus compresses the IVC and aorta in the supine position, reducing venous return and making CPR ineffective. Delivery evacuates the uterus → restores preload → restores circulation. [1][4]\n\n**This consult walks through:**\n• Module 1 — Recognition & indications\n• Module 2 — Pre-arrest optimization (LUD, airway, IV access)\n• Module 3 — Cardiac arrest response (pregnant ACLS modifications, BEAU-CHOPS causes)\n• Module 4 — The 4-minute decision point\n• Module 5 — Procedure, step by step\n• Module 6 — Post-delivery maternal + neonatal care',
    citation: [1, 2, 3, 4],
    next: 'rh-indications',
    summary: 'Emergent delivery during maternal arrest — goal is maternal resuscitation via aortocaval decompression',
    safetyLevel: 'critical',
  },

  {
    id: 'rh-indications',
    type: 'info',
    module: 1,
    title: 'Indications — When to Perform',
    body: '**RESUSCITATIVE HYSTEROTOMY IS INDICATED WHEN ALL OF THE FOLLOWING:**\n\n1. **Maternal cardiac arrest** (pulselessness requiring CPR)\n2. **Estimated gestational age ≥20 weeks** OR fundus palpable at or above the umbilicus\n3. **No ROSC within ~4 minutes** of high-quality CPR with LUD\n\n**KEY POINT:** This is a procedure done *during* CPR, not after it fails. You are not trying to save the fetus first — you are trying to save the mother *by* delivering the fetus. [1][2]\n\n**WHO DECIDES:** The senior EM physician at the bedside. **Do NOT wait for OB.** Obstetricians do not routinely perform this outside the OR and may never have done one. Every EM physician should be prepared to perform it. [1][5]\n\n**WHERE:** At the site of the arrest. **Do NOT move the patient to the OR.** CPR cannot continue effectively during transport, and every minute of delay worsens outcomes. [1][2][6]',
    citation: [1, 2, 5, 6],
    next: 'rh-fundal-check',
    summary: 'Indication: maternal arrest + fundus at/above umbilicus + no ROSC by 4 min — EM physician decides at bedside',
    safetyLevel: 'critical',
  },

  {
    id: 'rh-fundal-check',
    type: 'question',
    module: 1,
    title: 'Fundal Height Assessment',
    body: '**Palpate the uterine fundus.** Where is it?\n\nFundal height is a rapid bedside surrogate for gestational age when dates are unknown:\n\n• **Below umbilicus** → <20 weeks → fetus not viable, uterus not causing aortocaval compression → **standard ACLS** applies\n• **At umbilicus** → ~20 weeks → threshold for RH\n• **Above umbilicus** → >20 weeks → RH strongly indicated if arrest occurs\n• **Fundus at xiphoid** → ~36-38 weeks (term)\n\n**If unsure, assume ≥20 weeks and proceed.** The cost of an unnecessary hysterotomy in a truly pre-viable patient (who is already dying) is minimal. The cost of not performing it in a viable pregnancy is catastrophic. [1][2][7]',
    citation: [1, 2, 7],
    images: [
      {
        src: 'images/resuscitative-hysterotomy/fundal-height-gestational-age.svg',
        alt: 'Chart of fundal height in cm versus gestational age in weeks with 80% prediction interval',
        caption: 'Fundal height (cm) vs. gestational age. At ~20 weeks the fundus reaches the umbilicus — the clinical threshold for aortocaval compression and resuscitative hysterotomy. (Mikael Häggström — CC0, via Wikimedia Commons)',
      },
    ],
    options: [
      {
        label: 'Fundus at or above umbilicus (≥20 weeks)',
        description: 'Proceed with pregnancy-specific resuscitation',
        next: 'rh-pregnant-physiology',
        urgency: 'critical',
      },
      {
        label: 'Fundus below umbilicus (<20 weeks)',
        description: 'Standard ACLS — RH not indicated',
        next: 'rh-standard-acls',
      },
      {
        label: 'Unable to assess (obesity, anatomy)',
        description: 'Assume ≥20 weeks and proceed',
        next: 'rh-pregnant-physiology',
        urgency: 'critical',
      },
    ],
    summary: 'Fundus at/above umbilicus = ≥20 wk = RH indicated. If unsure, assume ≥20 wk and proceed.',
  },

  {
    id: 'rh-standard-acls',
    type: 'result',
    module: 1,
    title: 'Standard ACLS — Fetus Pre-Viable',
    body: '**Gestational age <20 weeks — resuscitative hysterotomy is NOT indicated.**\n\nThe uterus is not large enough to cause significant aortocaval compression, and the fetus is not viable.\n\n**MANAGEMENT:**\n• Proceed with **standard ACLS** — [Cardiac Arrest](#/tree/cardiac-arrest)\n• Treat reversible causes (H\'s and T\'s)\n• **Still apply LUD** — even at <20 weeks, some physiologic benefit; it is low cost\n• If early pregnancy complication suspected (ectopic, hemorrhage), address the underlying cause\n\nThe fetus will not survive maternal arrest at this age, and its delivery will not aid resuscitation.',
    recommendation: 'Standard ACLS — resuscitative hysterotomy not indicated at <20 weeks. Still apply LUD for marginal benefit.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  // =====================================================================
  // MODULE 2: PRE-ARREST OPTIMIZATION
  // =====================================================================

  {
    id: 'rh-pregnant-physiology',
    type: 'info',
    module: 2,
    title: 'Why Pregnancy Physiology Matters',
    body: '**AORTOCAVAL COMPRESSION SYNDROME:**\n\nIn the supine position after ~20 weeks, the gravid uterus compresses:\n\n• **Inferior vena cava (IVC)** → reduced venous return → ↓ preload → ↓ cardiac output by up to **30%**\n• **Abdominal aorta** → reduced uterine + lower extremity perfusion\n\nDuring CPR, this physiology makes chest compressions **functionally ineffective** — you can compress the heart, but there is nothing to pump. [1][4][8]\n\n**WHY THIS IS A RESUSCITATION PROCEDURE:**\n\nDelivery of the fetus → uterus evacuates → IVC/aortic compression relieved → **preload restored within seconds** → CPR becomes effective → ROSC possible.\n\n**OUTCOMES DATA (Einav 2012 systematic review, 94 cases):**\n• Maternal survival to discharge: **54.3%**\n• Good neurologic outcome (CPC 1-2) among survivors: **78.4%**\n• Maternal hemodynamic improvement after RH: **24.4%** of cases\n• Maternal harm attributable to RH: **0%** — the procedure carries essentially zero risk in arrest\n• Maternal ROSC documented up to **29 min** post-arrest; neonatal survival up to **47 min** [2][3][9]',
    citation: [1, 2, 3, 4, 8, 9],
    images: [
      {
        src: 'images/resuscitative-hysterotomy/gravid-uterus-nih-bioart.svg',
        alt: 'Lateral cross-section of pregnant human abdomen showing fetus and gravid uterus in relation to maternal torso and vertebral column',
        caption: 'Lateral cross-section of the gravid abdomen. In supine positioning, the uterus compresses the IVC and aorta against the vertebral column, reducing venous return — the anatomic basis for LUD and for resuscitative hysterotomy in arrest. (NIH BioArt #421, NIAID — Public Domain)',
      },
    ],
    next: 'rh-lud',
    summary: 'Gravid uterus compresses IVC → ↓preload by 30% → CPR ineffective. Delivery = aortocaval decompression = ROSC.',
    skippable: true,
  },

  {
    id: 'rh-lud',
    type: 'info',
    module: 2,
    title: 'Left Lateral Uterine Displacement (LUD)',
    body: '**LUD IS MANDATORY** for every pregnant patient ≥20 weeks with hemodynamic compromise or arrest. [1][10]\n\n**TECHNIQUE — MANUAL LUD (preferred during arrest):**\n\nOne provider stands on the patient\'s left side:\n\n1. **Two-handed grip** on the uterus from the patient\'s left\n2. **Pull the uterus up and to the left** (toward the patient\'s left shoulder)\n3. **Maintain continuously** — this is a dedicated role, not a periodic maneuver\n\n**Alternative — one-handed push:** From the right side, push the uterus up and leftward. Less effective; use only if left-side access is unavailable.\n\n**AVOID tilted-board / 30° tilt during arrest.** Tilting degrades chest compression quality by ~30%. Manual LUD maintains flat supine positioning for effective CPR. [1][4][10]\n\n**WHY MANUAL > TILT DURING ARREST:**\n• Flat supine = optimal compression depth and recoil\n• Manual LUD can be maintained continuously during CPR\n• Tilt makes everything harder — compressions, intubation, IV access, defibrillation pads',
    citation: [1, 4, 10],
    images: [
      {
        src: 'images/resuscitative-hysterotomy/gravid-uterus-nih-bioart.svg',
        alt: 'Lateral cross-section of pregnant abdomen showing the gravid uterus as a large intra-abdominal mass',
        caption: 'The uterus being displaced during LUD is this entire mass. Manual LUD = two-handed pull up and to the patient\'s left, continuous, dedicated provider. (NIH BioArt #421, NIAID — Public Domain)',
      },
    ],
    next: 'rh-iv-airway',
    summary: 'Manual LUD > tilt during arrest. Two-handed pull up-and-left, continuous, dedicated provider.',
    safetyLevel: 'critical',
  },

  {
    id: 'rh-iv-airway',
    type: 'info',
    module: 2,
    title: 'IV Access & Airway Considerations',
    body: '**IV ACCESS — ABOVE THE DIAPHRAGM:**\n\n• Place IV/IO in **upper extremities or neck** (external jugular, subclavian), NOT femoral or below-diaphragm sites\n• **Reason:** drugs given below the uterine compression point may not reach central circulation. IVC compression blocks return. [1][4]\n• **IO humerus** is excellent if no IV\n\n**AIRWAY — ANTICIPATE DIFFICULT:**\n\nPregnancy is a physiologically and anatomically difficult airway:\n• **Reduced FRC** → rapid desaturation (2-3x faster than non-pregnant)\n• **Increased oxygen consumption** → less reserve\n• **Mucosal edema, friable mucosa** → bleeding with manipulation\n• **Full stomach** (gastroparesis, progesterone) → aspiration risk\n• **Breast tissue** → blade insertion angle\n• **Smaller ETT often needed** — try 6.5 or 7.0 first\n\n**PREPARE:**\n• Video laryngoscopy first-line\n• Ramped position pre-arrest; flat supine during arrest with manual LUD\n• Have small ETTs and bougie ready\n• Suction, cricoid pressure, BURP if needed [4][11]',
    citation: [1, 4, 11],
    next: 'rh-pre-arrest-optimization',
    summary: 'IV above diaphragm (IVC compression!). Pregnant airway: rapid desat, edema, aspiration risk — VL + small ETT.',
    skippable: true,
  },

  {
    id: 'rh-pre-arrest-optimization',
    type: 'info',
    module: 2,
    title: 'Pre-Arrest Optimization (if still perfusing)',
    body: '**IF THE PATIENT IS DECOMPENSATING BUT NOT YET IN ARREST:**\n\nAggressive optimization may prevent arrest entirely:\n\n• **LUD** — always\n• **High-flow O2** — maternal SpO2 <95% causes fetal hypoxemia\n• **IV fluids** — 1-2 L crystalloid bolus unless pulmonary edema\n• **Treat reversible causes** — hemorrhage, hypoxia, eclampsia, sepsis, PE, LAST, amniotic fluid embolism\n• **Call for help** — OB, anesthesia, neonatology, blood bank (activate MTP if bleeding)\n• **Bedside ultrasound** — FAST for hemorrhage, cardiac for tamponade/RV strain, uterine fetal assessment\n\n**DO NOT WAIT FOR ARREST TO PREPARE FOR RH.**\n\nIf the patient is peri-arrest (e.g., severe PE with refractory shock), consider:\n• Having scalpel at bedside\n• Consenting partner/family if feasible\n• Mental rehearsal of the procedure\n\nBetter to have prepared and not needed than to scramble after arrest begins. [1][4][6]',
    citation: [1, 4, 6],
    next: 'rh-arrest-confirmed',
    summary: 'Peri-arrest: LUD, O2, fluids, find cause, call help, scalpel ready — prepare before arrest begins.',
    skippable: true,
  },

  // =====================================================================
  // MODULE 3: CARDIAC ARREST RESPONSE
  // =====================================================================

  {
    id: 'rh-arrest-confirmed',
    type: 'info',
    module: 3,
    title: 'Cardiac Arrest Confirmed — Start the Code',
    body: '**CARDIAC ARREST IN PREGNANCY — IMMEDIATE ACTIONS:**\n\nAll at once (parallel processing, not sequential):\n\n1. **Call the code** — announce "maternal cardiac arrest"\n2. **Start high-quality CPR** — see ACLS Modifications in Pregnancy\n3. **Establish continuous manual LUD** — dedicated provider\n4. **Start the timer** — designate timekeeper, call out minutes\n5. **Page overhead:** OB, neonatology, anesthesia, blood bank, OR\n6. **Have scalpel at bedside within 60 seconds**\n7. **Treat reversible causes** — see [BEAU-CHOPS mnemonic](#/info/rh-beauchops-details)\n\n**TEAM ROLES (assign immediately):**\n• **Leader** — EM attending at foot of bed\n• **Compressor** — rotate every 2 min\n• **LUD provider** — continuous, left-side\n• **Airway** — anesthesia or EM attending\n• **IV/meds** — upper extremity access\n• **Recorder/timekeeper** — call out times loudly\n• **Neonatal team** — warmer on, NRP ready\n\n**[ACLS Modifications in Pregnancy](#/info/rh-acls-mods)** — same drugs, same energies, specific positioning. [1][4][12]',
    citation: [1, 4, 12],
    next: 'rh-start-timer',
    summary: 'Call code, start CPR, manual LUD, start timer, page OB/Neo, scalpel to bedside, assign roles, find cause.',
    safetyLevel: 'critical',
  },

  {
    id: 'rh-start-timer',
    type: 'info',
    module: 3,
    title: 'Start the Clock',
    body: '**DESIGNATE A TIMEKEEPER IMMEDIATELY.**\n\nThe timer starts at the moment of arrest (or loss of pulse), not when you remember to start it.\n\n**TIMEKEEPER CALLS OUT:**\n• **Every 30 seconds** — "30 seconds into arrest"\n• **At 2 minutes** — rhythm check, pulse check\n• **At 3 minutes** — "3 minutes — consider hysterotomy preparation"\n• **At 4 minutes** — "4 MINUTES — DECISION POINT" — loud, clear\n• **At 5 minutes** — "5 minutes — if no ROSC, incision now"\n\n**WHY THE LOUD CALLOUT MATTERS:**\n\nUnder stress, providers consistently underestimate elapsed time by 30-50%. Without a loud timekeeper, the 4-minute decision point slips past unnoticed. Hard data: median time from arrest to RH in registries is **~10 minutes**, not 4-5 — because no one tracked it. [2][9][13]\n\n**USE A VISIBLE CLOCK.** Phone stopwatch, wall clock, whatever — visible to the leader. Do not rely on memory.',
    citation: [2, 9, 13],
    next: 'rh-acls-pregnancy',
    summary: 'Timekeeper calls out q30sec. 4-min = decision point. Without a timer, RH slips past unnoticed.',
    safetyLevel: 'warning',
  },

  {
    id: 'rh-acls-pregnancy',
    type: 'info',
    module: 3,
    title: 'ACLS Modifications in Pregnancy',
    body: '**[Full ACLS Pregnancy Modifications](#/info/rh-acls-mods)**\n\n**HIGH-YIELD DIFFERENCES FROM STANDARD ACLS:**\n\n**Hand position for compressions:**\n• **Standard position** (center of chest) — AHA 2015/2023 no longer recommends higher hand position. [4][12]\n• Compression depth and rate identical: **5-6 cm, 100-120/min**\n\n**Defibrillation:**\n• **Same energies** as non-pregnant (200J biphasic)\n• **Standard pad placement** (anterolateral)\n• **Fetal monitors MUST be removed** before shocking (arcing risk)\n• Fetus tolerates defibrillation without issue\n\n**Drugs:**\n• **All standard ACLS drugs at standard doses** — epinephrine, amiodarone, etc.\n• No dose adjustments\n• **Epinephrine 1 mg IV/IO q3-5 min** as usual\n\n**What IS different:**\n• **Continuous manual LUD** throughout\n• **IV access above diaphragm**\n• **Difficult airway anticipation**\n• **4-minute decision point for RH**\n• **Seek reversible causes** — see [BEAU-CHOPS](#/info/rh-beauchops-details) [4][12]',
    citation: [4, 12],
    next: 'rh-beauchops',
    summary: 'Same drugs, energies, pad placement. Different: LUD, IV above diaphragm, difficult airway, 4-min RH clock.',
    skippable: true,
  },

  {
    id: 'rh-beauchops',
    type: 'info',
    module: 3,
    title: 'BEAU-CHOPS — Reversible Causes in Pregnant Arrest',
    body: '**Pregnancy-specific reversible causes of cardiac arrest.** [See full BEAU-CHOPS](#/info/rh-beauchops-details)\n\n**B — Bleeding / DIC**\nHemorrhage (placenta, uterine rupture, abruption, AFE-DIC) — activate MTP. [Massive Transfusion](#/tree/massive-transfusion).\n\n**E — Embolism**\nPE, amniotic fluid embolism, air, fat. AFE is uniquely pregnancy-related and often fatal.\n\n**A — Anesthetic complications**\nHigh spinal, local anesthetic systemic toxicity (LAST) — give [Intralipid](#/drug/lipid-emulsion/last) 1.5 mL/kg bolus.\n\n**U — Uterine atony**\nMassive hemorrhage from atony after delivery — [Oxytocin](#/drug/oxytocin/postpartum hemorrhage), TXA, massage.\n\n**C — Cardiac disease**\nMI, [Peripartum Cardiomyopathy](#/tree/peripartum-cardiomyopathy), aortic dissection, congenital disease.\n\n**H — Hypertension**\n[Eclampsia](#/tree/eclampsia), preeclampsia with stroke/ICH, HELLP.\n\n**O — Other (standard ACLS H\'s/T\'s + magnesium toxicity)**\nHypoxia, hypovolemia, hypokalemia, hypothermia, tension PTX, tamponade, toxins, thrombosis. **Magnesium toxicity** is a pregnancy-specific cause — if patient was on MgSO4 for eclampsia/preterm labor, give [Calcium Gluconate](#/drug/calcium-gluconate/hypermagnesemia) 1 g IV or [Calcium Chloride](#/drug/calcium-chloride/hypermagnesemia) 1 g IV.\n\n**P — Placenta previa / abruption**\nMassive antepartum hemorrhage — prepare for RH + transfusion.\n\n**S — Sepsis**\nChorioamnionitis, pyelonephritis (common in pregnancy), pneumonia. [Sepsis](#/tree/sepsis).\n\n**TREAT THE CAUSE WHILE YOU CLOCK-WATCH.** Finding a reversible cause in the first 4 minutes may obviate the need for RH. [1][4][14]',
    citation: [1, 4, 14],
    next: 'rh-decision-point',
    summary: 'BEAU-CHOPS: Bleeding, Embolism, Anesthetic, Uterine atony, Cardiac, HTN, Other, Placenta, Sepsis.',
    skippable: true,
  },

  // =====================================================================
  // MODULE 4: THE 4-MINUTE DECISION
  // =====================================================================

  {
    id: 'rh-decision-point',
    type: 'question',
    module: 4,
    title: 'The 4-Minute Decision Point',
    body: '**FOUR MINUTES OF HIGH-QUALITY CPR HAVE ELAPSED.**\n\nAssess: **Has ROSC been achieved?**\n\n**THE RULE (Katz 1986, refined by SOAP 2014, AHA 2023):**\n\n• **If NO ROSC at ~4 minutes** → begin incision\n• **Goal: fetus delivered by 5 minutes** after arrest\n• This is the **4-minute decision / 5-minute delivery** rule [1][2][15]\n\n**CURRENT EVIDENCE (2015+):**\n\nThe rigid 4-minute threshold has been re-examined:\n\n• **Rose 2015** — "Challenging the 4-to-5 minute rule": registry data shows maternal benefit even when RH is performed at 10, 15, even 20+ minutes. **Later is still better than never.** [13]\n• **Benson 2016** — Aggregate case review: ROSC rates remain meaningful up to 15 min post-arrest [16]\n• **Einav 2012** — Systematic review: neonatal survival drops sharply after 5 minutes but maternal survival benefit persists much longer [9]\n\n**BOTTOM LINE:** The 4-minute rule is a **starting gun, not a finish line**. Proceed at 4 min if no ROSC. If you are past 4 min and have not started — **start now regardless of elapsed time**. The only time too late is after TOD has been called. [1][2][13][16]',
    citation: [1, 2, 13, 15, 16],
    options: [
      {
        label: 'ROSC achieved',
        description: 'Continue resuscitation, optimize, RH avoided',
        next: 'rh-rosc-continue',
      },
      {
        label: 'No ROSC — proceed with hysterotomy',
        description: 'Begin incision now',
        next: 'rh-proceed',
        urgency: 'critical',
      },
      {
        label: 'Past 4 minutes — just realizing the need',
        description: 'Start now — later is still better than never',
        next: 'rh-proceed',
        urgency: 'critical',
      },
    ],
    summary: '4 min + no ROSC = incision. 5 min = delivery. Past 4 min? Start NOW anyway — later still beats never.',
    safetyLevel: 'critical',
  },

  {
    id: 'rh-rosc-continue',
    type: 'result',
    module: 4,
    title: 'ROSC Achieved — Continue Resuscitation',
    body: '**ROSC ACHIEVED — RESUSCITATIVE HYSTEROTOMY AVERTED (for now).**\n\n**IMMEDIATE POST-ROSC PRIORITIES:**\n\n• **Continue LUD** — aortocaval compression persists, may cause re-arrest\n• **Aggressive hemodynamic support** — vasopressors ([Norepinephrine](#/drug/norepinephrine/post-cardiac arrest) if needed)\n• **Airway** — intubate if not already; anticipate difficult airway\n• **Fetal monitoring** — continuous CTG; fetal distress may persist after maternal ROSC\n• **Identify and treat the cause** — full workup: CBC, CMP, coags, fibrinogen, type+cross, lactate, ABG, tox, ECG, echo, CT as indicated\n\n**KEEP RH ON THE TABLE.** If the patient re-arrests and ROSC is not rapidly achievable, proceed with RH without hesitation.\n\n**DISPOSITION:**\n• **ICU admission** with maternal-fetal medicine + intensivist co-management\n• **OR for definitive cause management** if surgical (aortic dissection, ruptured ectopic, uterine rupture)\n• **OB consultation** for fetal assessment and delivery planning\n• **Level III NICU** notified\n\n**MONITORING:**\n• Continuous cardiac monitoring, arterial line, central line as appropriate\n• Fetal heart monitoring q5-15 min initially\n• Frequent reassessment for recurrent arrest',
    recommendation: 'ROSC achieved — continue LUD, aggressive hemodynamic support, identify cause, ICU admission with MFM/ICU co-management. Keep RH available if re-arrest occurs.',
    confidence: 'recommended',
    citation: [1, 2, 4],
  },

  {
    id: 'rh-proceed',
    type: 'info',
    module: 4,
    title: 'Proceed with Resuscitative Hysterotomy',
    body: '**DECISION MADE. PROCEEDING WITH RH.**\n\n**DO NOT:**\n• ❌ Move the patient to the OR\n• ❌ Wait for obstetrics to arrive\n• ❌ Prep with betadine, drapes, or formal sterile technique\n• ❌ Give anesthesia — the patient is in arrest\n• ❌ Stop CPR\n\n**DO:**\n• ✅ Perform the procedure **at the bedside, right now**\n• ✅ Continue CPR **throughout the procedure**\n• ✅ Continue LUD until the moment you open the uterus\n• ✅ Have the neonatal team at the warmer, ready\n• ✅ **Announce clearly:** "I am performing resuscitative hysterotomy, time is [X] minutes into arrest"\n\n**INFORMED CONSENT:**\nIn a true arrest, this is **emergent life-saving surgery** — no consent is required. Document the clinical scenario. Partner/family may be present; a brief "we are delivering the baby to try to save her" statement is appropriate if time allows. [1][2]\n\n**ABSOLUTE CONTRAINDICATIONS:** None during arrest. Previous C-section, anticoagulation, infection — none are contraindications when the patient is dying.',
    citation: [1, 2],
    next: 'rh-equipment',
    summary: 'Bedside now. No OR move, no prep, no consent needed, no anesthesia, continue CPR. No absolute contraindications.',
    safetyLevel: 'critical',
  },

  {
    id: 'rh-equipment',
    type: 'info',
    module: 4,
    title: 'Equipment — Scalpel is All You Need',
    body: '**MINIMUM EQUIPMENT:**\n\n• **#10 or #20 scalpel** — the ONLY essential tool\n• Everything else is optional\n\n**NICE TO HAVE (if immediately available — do not wait for them):**\n• Sterile or clean gloves\n• Suction (Yankauer)\n• Sterile towels (can substitute clean towels)\n• Cord clamps x2 (Kelly clamps or hemostats work)\n• Umbilical cord scissors (scalpel also works)\n• Warmed saline\n• Bovie (for later hemostasis, not initial incision)\n• Retractor (can use hands)\n\n**NEONATAL EQUIPMENT (separate team):**\n• Warmer — ON NOW\n• Bag-valve-mask (neonatal), BVM sized for term or preterm\n• Suction bulb\n• Towels for drying/stimulation\n• Pulse oximeter (right hand — preductal)\n• ETT 2.5/3.0/3.5 with blade\n• Epinephrine dosing chart (weight-based)\n• [Neonatal Resuscitation (NRP)](#/tree/neonatal-resus) protocol\n\n**EMCRIT PEARL (Weingart):** *"If you have a scalpel, you have what you need. Waiting for an OB tray is waiting for the patient to die."* [1]',
    citation: [1, 2],
    next: 'rh-positioning',
    summary: 'Scalpel is the only essential tool. Everything else is optional. Don\'t wait for an OB tray.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 5: THE PROCEDURE
  // =====================================================================

  {
    id: 'rh-positioning',
    type: 'info',
    module: 5,
    title: 'Patient Positioning',
    body: '**POSITIONING:**\n\n• **Patient supine, flat** (no tilt — manual LUD continues)\n• **You stand on the patient\'s right** (if right-handed)\n• **CPR continues at the head** — chest compressor and airway provider\n• **LUD provider on patient\'s left** — pulls uterus up and to the left; **releases only when you are about to incise the uterus**\n• **Neonatal team at the warmer** — ready to receive\n\n**BRIEF ANTISEPSIS (only if instant):**\n• Splash chlorhexidine or betadine on abdomen — do not scrub, do not wait\n• If not immediately available — skip it. **Do not delay.**\n\n**EXPOSURE:**\n• Cut or tear clothing — do not try to undress the patient\n• Expose abdomen from xiphoid to symphysis pubis\n\nTime from decision to skin incision should be **<60 seconds**. [1][2]',
    citation: [1, 2],
    next: 'rh-skin-incision',
    summary: 'Flat supine, LUD continues, CPR continues, quick splash antisepsis if instant. <60 sec to skin incision.',
  },

  {
    id: 'rh-skin-incision',
    type: 'info',
    module: 5,
    title: 'Step 1 — Skin Incision',
    body: '**VERTICAL MIDLINE INCISION.**\n\n**LANDMARKS:**\n• **From:** just below the xiphoid\n• **To:** symphysis pubis\n• **Length:** 15-20 cm — full length of the uterus\n\n**TECHNIQUE:**\n• One deliberate, firm, deep stroke with the scalpel\n• **Go through:** skin → subcutaneous fat → fascia (linea alba) → muscle (rectus abdominis — often already separated by pregnancy) → peritoneum\n• **Do NOT make repeated small strokes** — one confident pass is faster and safer\n• Blood loss is not an immediate concern — the patient is in arrest with low circulating pressure\n\n**WHY VERTICAL (NOT PFANNENSTIEL):**\n• Faster access\n• Avoids need to dissect rectus sheath\n• Exposes full uterus immediately\n• Not a cosmetic operation — this is resuscitation\n\nIf you feel the blade pop through the peritoneum, you are at the uterus. If not, the next stroke will get you there. [1][2][17]',
    citation: [1, 2, 17],
    images: [
      {
        src: 'images/resuscitative-hysterotomy/abdominal-incisions-torso.svg',
        alt: 'Annotated schematic of the torso labeling all major surgical incisions — midline vertical, paramedian, Pfannenstiel, subcostal, McBurney',
        caption: 'Surgical incisions of the torso. For resuscitative hysterotomy use the midline vertical incision (xiphoid to symphysis) — fastest, bloodless, maximum exposure. Pfannenstiel is wrong for this setting. (Mvolz — CC0, via Wikimedia Commons)',
      },
    ],
    next: 'rh-uterine-incision',
    summary: 'One firm vertical midline stroke: xiphoid → symphysis. Skin → fat → fascia → muscle → peritoneum.',
    safetyLevel: 'warning',
  },

  {
    id: 'rh-uterine-incision',
    type: 'info',
    module: 5,
    title: 'Step 2 — Uterine Incision',
    body: '**VERTICAL (CLASSICAL) UTERINE INCISION.**\n\nLUD provider **releases** the uterus now.\n\n**LANDMARKS:**\n• **Start:** mid-fundus\n• **Direction:** vertical, midline\n• **Length:** 10-15 cm — enough to deliver the fetus\n\n**TECHNIQUE:**\n• **Shallow initial cut** — 1-2 cm deep only — to avoid lacerating the fetus\n• **Feel for fetal parts or amniotic sac** through the initial incision\n• **Once in the uterine cavity:** enlarge the incision with scissors or blunt finger extension\n• **Use two fingers as a guide** to protect the fetus while extending the incision\n\n**WHY CLASSICAL (VERTICAL) INCISION — NOT LOW TRANSVERSE:**\n• **Faster** — no bladder mobilization needed\n• **Better exposure** — can be extended cephalad if needed\n• **Works regardless of placental location** (anterior placenta would be in the way of a low transverse)\n• The patient will not have future pregnancies to worry about — this is a life-saving operation [1][2][17]\n\n**BEWARE THE ANTERIOR PLACENTA.** If you hit placenta instead of membranes, go through it — do not stop. Deliver the fetus through the placenta if needed.',
    citation: [1, 2, 17],
    images: [
      {
        src: 'images/resuscitative-hysterotomy/hysterotomy-leishman-1888.jpg',
        alt: 'Historical surgical engraving showing hysterotomy — exposure of the uterus and incision technique for delivery',
        caption: 'Historical illustration of hysterotomy (Leishman & Stubbs, 1888). For resuscitative hysterotomy use a **classical vertical** uterine incision — faster, better exposure, avoids bladder mobilization, and works regardless of placental location. (Leishman & Stubbs, A System of Midwifery, 1888 — Public Domain)',
      },
    ],
    next: 'rh-extract-fetus',
    summary: 'Classical vertical uterine incision. Shallow 1-2cm entry to avoid fetal injury, then extend with fingers.',
    safetyLevel: 'warning',
  },

  {
    id: 'rh-extract-fetus',
    type: 'info',
    module: 5,
    title: 'Step 3 — Deliver the Fetus',
    body: '**DELIVER THE FETUS:**\n\n1. **Reach into the uterus** with your dominant hand\n2. **Cup the fetal head** — identify vertex, breech, or transverse lie\n3. **Deliver the head first** (if vertex) or the presenting part (if breech)\n4. **Apply gentle fundal pressure** from above (second provider) if needed\n5. **Follow with the body and limbs**\n\n**IF BREECH PRESENTATION:**\n• Grasp feet or hips\n• Deliver feet → legs → body → shoulders → head (last)\n• Do not pull on a single limb — use a firm two-handed grasp\n\n**IF TRANSVERSE LIE:**\n• Reach in, find a foot, deliver as breech\n• Alternatively, rotate internally and deliver vertex\n\n**TIME TARGET:** Fetus delivered **within 5 minutes total** of maternal arrest. Neonatal outcomes correlate strongly with delivery time. [2][9]\n\n**PASS THE FETUS to the neonatal team at the warmer.** Do not stop to assess the fetus — that is the neonatal team\'s job. You remain focused on the mother.',
    citation: [1, 2, 9, 17],
    images: [
      {
        src: 'images/resuscitative-hysterotomy/fetus-in-utero-gray38.png',
        alt: 'Classical sagittal cross-section of gravid uterus showing fetus, placenta, cervix, and maternal vertebral column',
        caption: 'Mid-trimester gravid uterus in sagittal section. This is the anatomy you are reaching into — the non-dominant hand slips between fetus and anterior uterine wall to protect the fetus while the incision is extended. (Gray\'s Anatomy, Plate 38, H.V. Carter, 1858 — Public Domain)',
      },
    ],
    next: 'rh-cord-clamp',
    summary: 'Cup fetal head, deliver head first (or presenting part). Target <5 min from arrest. Hand to neo team.',
  },

  {
    id: 'rh-cord-clamp',
    type: 'info',
    module: 5,
    title: 'Step 4 — Clamp and Cut the Cord',
    body: '**CLAMP AND CUT THE UMBILICAL CORD:**\n\n1. **Two clamps** (or hemostats) on the cord, 2-3 cm apart\n2. **First clamp** ~3-5 cm from the fetal abdomen\n3. **Cut between the two clamps** with scissors or scalpel\n4. **Hand the fetus** to the neonatal team\n\n**DO NOT DELAY CLAMPING.** This is not the time for 30-60 seconds of delayed clamping — the maternal circulation is non-functional. The fetus needs immediate resuscitation on the warmer.\n\n**IF NO CLAMPS:**\n• Use any available hemostat, forceps, or Kelly clamp\n• Can use **two sutures tied tightly** and cut between\n• **Last resort:** just cut the cord — the fetus will autotransfuse back briefly from the cord stump but this is not fatal; continue to the warmer\n\nNo time lost here. Move to placental delivery. [1][2]',
    citation: [1, 2],
    next: 'rh-placenta',
    summary: 'Two clamps 2-3cm apart, cut between. No delayed clamping — fetus needs the warmer now.',
  },

  {
    id: 'rh-placenta',
    type: 'info',
    module: 5,
    title: 'Step 5 — Deliver the Placenta',
    body: '**DELIVER THE PLACENTA:**\n\n• **Gentle cord traction** — one hand on the cord, steady pull\n• **Other hand on the fundus** — apply counter-pressure to guard against uterine inversion\n• Placenta should separate and deliver within 30-60 seconds\n\n**IF PLACENTA DOES NOT DELIVER WITHIN 1-2 MINUTES:**\n• **Manual extraction** — reach into the uterus, sweep the placental edge off the uterine wall with the side of your hand, deliver manually\n• **Do not force** — if adherent, may be [placenta accreta](#/tree/pregnancy-trauma) — continue resuscitation and get to OR\n\n**AFTER PLACENTAL DELIVERY:**\n• **Aortocaval compression is now fully relieved**\n• Chest compressions become dramatically more effective\n• **Watch for ROSC** — this is the moment it often happens [2][3]\n\n**SAVE THE PLACENTA** for pathology if possible (bag or basin). Useful for identifying cause of arrest (AFE, abruption, infection).',
    citation: [1, 2, 3],
    next: 'rh-continue-cpr',
    summary: 'Gentle cord traction + fundal counter-pressure. Manual extraction if stuck. ROSC often happens here.',
  },

  {
    id: 'rh-continue-cpr',
    type: 'info',
    module: 5,
    title: 'Step 6 — Continue CPR',
    body: '**CONTINUE CPR AND RESUSCITATION.**\n\n**KEY POINT:** Delivery of the fetus is **not the end** of the resuscitation — it is the inflection point that *makes* the resuscitation possible.\n\n**IMMEDIATELY AFTER DELIVERY:**\n• **Continue chest compressions** at 100-120/min\n• **Continue ACLS medications** per protocol\n• **Reassess rhythm** at the next scheduled 2-min pulse check\n• **Watch for ROSC** — now that preload is restored, it is much more likely\n\n**DO NOT CLOSE YET.** The abdomen and uterus are left open during ongoing resuscitation:\n• **Pack** with clean towels or saline-soaked gauze to control bleeding\n• **No formal closure** until ROSC is achieved\n• If ROSC → transfer to OR for formal closure\n• If no ROSC after prolonged resuscitation → team decides on TOD per standard criteria\n\n**HEMOSTASIS DURING CPR:**\n• Uterine bleeding may be significant — pack, apply manual pressure, do not waste time with formal suturing during arrest\n• Major vessel injury (rare) — clamp if obvious, pack if not [1][2]',
    citation: [1, 2],
    next: 'rh-neonate',
    summary: 'Delivery = inflection point, not endpoint. Keep CPR going. Pack abdomen, don\'t close until ROSC.',
  },

  // =====================================================================
  // MODULE 6: POST-DELIVERY CARE
  // =====================================================================

  {
    id: 'rh-neonate',
    type: 'question',
    module: 6,
    title: 'Neonatal Status',
    body: '**THE NEONATAL TEAM ASSESSES THE NEWBORN ON THE WARMER.**\n\nInitial assessment (first 30 seconds):\n\n• **Term?** (appearance, vernix)\n• **Tone?** (good flexion vs. flaccid)\n• **Breathing or crying?**\n\nIf breathing, good tone, term → routine care (warm, dry, stimulate, skin-to-skin if mother ROSC).\n\nIf any concerns → **initiate NRP (Neonatal Resuscitation Program)** — [Neonatal Resuscitation](#/tree/neonatal-resus).\n\n**APGAR score** at 1 and 5 minutes — [APGAR Calculator](#/calculator/apgar).\n\n**WHAT IS THE NEONATE\'S STATUS?**',
    citation: [1, 18],
    calculatorLinks: [{ id: 'apgar', label: 'APGAR Calculator' }],
    options: [
      {
        label: 'Vigorous — breathing, good tone, crying',
        description: 'Routine newborn care',
        next: 'rh-neonate-vigorous',
      },
      {
        label: 'Not vigorous — needs resuscitation',
        description: 'Initiate NRP protocol',
        next: 'rh-neonate-resus',
        urgency: 'critical',
      },
    ],
    summary: 'Assess term, tone, breathing. Vigorous → routine care. Any concern → NRP. APGAR at 1 and 5 min.',
  },

  {
    id: 'rh-neonate-vigorous',
    type: 'result',
    module: 6,
    title: 'Vigorous Newborn — Routine Care',
    body: '**NEONATE IS VIGOROUS.**\n\nDespite maternal arrest, this neonate is breathing, crying, and has good tone — excellent outcome.\n\n**ROUTINE NEWBORN CARE:**\n• Warm, dry, stimulate\n• **APGAR at 1 and 5 minutes** — [APGAR Calculator](#/calculator/apgar)\n• Pulse oximetry (right hand, preductal)\n• Monitor temperature closely — hypothermia is the #1 risk in ED deliveries\n• Skin-to-skin with mother if mother has ROSC and is stable\n\n**DISPOSITION:**\n• NICU evaluation regardless of initial appearance — the neonate was exposed to maternal arrest hypoxia\n• Blood gas, glucose, temperature check\n• Observation period for seizures, hypotonia, or feeding issues\n• Head imaging per NICU protocol\n\n**DOCUMENT:**\n• Time of delivery\n• Time from arrest to delivery\n• APGAR 1, 5, (and 10 min if <7)\n• All resuscitation interventions\n\nThis is the ideal outcome. Now return focus to the mother.',
    recommendation: 'Routine newborn care: warm, dry, stimulate. APGAR at 1/5 min. NICU evaluation regardless of appearance. Monitor temperature.',
    confidence: 'recommended',
    citation: [1, 18],
    calculatorLinks: [{ id: 'apgar', label: 'APGAR Calculator' }],
  },

  {
    id: 'rh-neonate-resus',
    type: 'result',
    module: 6,
    title: 'Neonatal Resuscitation Required',
    body: '**INITIATE NEONATAL RESUSCITATION (NRP).**\n\n**[Full NRP Protocol](#/tree/neonatal-resus).**\n\n**INITIAL STEPS (30 seconds):**\n• Warm, dry, stimulate (but do NOT delay PPV if HR <100)\n• Position airway — sniffing position, gentle suction only if obstructed\n• Reassess HR, respirations, tone\n\n**IF HR <100 OR APNEIC:**\n• **Positive Pressure Ventilation (PPV)** — 40-60 breaths/min, room air initially for term, 30% O2 for preterm\n• Continue for 30 seconds, then reassess\n• MR-SOPA if not adequate: Mask, Reposition, Suction, Open mouth, Pressure increase, Alternate airway\n\n**IF HR <60 DESPITE PPV:**\n• **Chest compressions** 3:1 with breaths (90 compressions + 30 breaths per minute)\n• **Intubate** if not already\n• **Epinephrine** 0.01-0.03 mg/kg IV/IO ([Epinephrine](#/drug/epinephrine/neonatal resuscitation))\n\n**APGAR at 1, 5, 10 minutes** — [APGAR Calculator](#/calculator/apgar). APGAR <7 at 5 min: continue scoring every 5 min until ≥7 or age 20 min.\n\n**TRANSFER TO NICU** as soon as stable enough.',
    recommendation: 'Initiate NRP: PPV if HR <100, compressions if HR <60, epinephrine if HR <60 despite PPV + compressions. APGAR q5min until >7. Transfer to NICU.',
    confidence: 'recommended',
    citation: [1, 18],
    calculatorLinks: [{ id: 'apgar', label: 'APGAR Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Positive Pressure Ventilation (PPV)',
        dose: '40-60 breaths/min',
        route: 'Bag-mask',
        frequency: 'continuous',
        duration: 'until HR >100 and spontaneous respirations',
        notes: 'Room air for term neonate, 30% O2 for preterm. MR-SOPA if inadequate.',
      },
      alternative: {
        drug: 'Epinephrine (for neonatal CPR)',
        dose: '0.01-0.03 mg/kg (0.1-0.3 mL/kg of 1:10,000)',
        route: 'IV/IO preferred; ETT 0.05-0.1 mg/kg',
        frequency: 'q3-5 min',
        duration: 'until HR >60',
        notes: 'Only after adequate PPV + chest compressions. Confirm ventilation is effective before escalating.',
      },
      monitoring: 'HR, respirations, tone, color, APGAR at 1/5/10 min. Pulse ox on right hand (preductal).',
    },
  },

  {
    id: 'rh-maternal-outcome',
    type: 'question',
    module: 6,
    title: 'Maternal Status After Delivery',
    body: '**RE-ASSESS THE MOTHER AT THE NEXT PULSE CHECK.**\n\nDelivery has restored preload. This is the moment ROSC most commonly occurs.\n\n**REASSESS:**\n• Pulse — palpate carotid or femoral\n• End-tidal CO2 — sudden rise suggests ROSC\n• Rhythm — organized rhythm with pulse\n• Blood pressure — arterial line if not yet placed\n\n**WHAT IS THE MATERNAL STATUS?**',
    citation: [1, 2, 3],
    options: [
      {
        label: 'ROSC achieved — pulse, rhythm, BP',
        description: 'Proceed to post-ROSC care',
        next: 'rh-rosc-postop',
        urgency: 'urgent',
      },
      {
        label: 'Continued arrest — no ROSC',
        description: 'Continue resuscitation',
        next: 'rh-continued-arrest',
        urgency: 'critical',
      },
    ],
    summary: 'Delivery relieves compression — ROSC often happens now. Reassess pulse, ETCO2, rhythm, BP.',
  },

  {
    id: 'rh-rosc-postop',
    type: 'info',
    module: 6,
    title: 'Maternal ROSC — Post-Arrest Care',
    body: '**ROSC ACHIEVED AFTER RESUSCITATIVE HYSTEROTOMY.**\n\n**IMMEDIATE PRIORITIES (the next 15 minutes):**\n\n1. **Hemostasis** — uterine atony is near-universal after RH. Proceed to [Uterine Atony Management](#/node/rh-uterine-atony).\n2. **Massive transfusion** — activate MTP if not already. Expected blood loss 1-2+ L. [Massive Transfusion](#/tree/massive-transfusion).\n3. **Airway secured** — intubate if not already\n4. **Hemodynamic support** — [Norepinephrine](#/drug/norepinephrine/post-cardiac arrest) infusion, arterial line, central line\n5. **Identify and treat cause** — what put her in arrest? (PE? AFE? hemorrhage? MI? eclampsia?)\n6. **Prophylactic antibiotics** — [Cefazolin](#/drug/cefazolin/surgical prophylaxis) 2 g IV (the field was non-sterile)\n7. **Definitive surgical closure** — transfer to OR\n\n**POST-ARREST CARE BUNDLE (standard + pregnancy-specific):**\n• Targeted temperature management — 32-36°C for 24 hours (safe in postpartum)\n• Maintain SBP ≥90, MAP ≥65\n• Glucose control 140-180\n• Lung-protective ventilation\n• Continuous EEG if altered\n• Serial exams for neuro recovery\n\n**TRANSFER TO OR** for formal closure, continued hemostasis, and definitive management.\n\n**ICU admission** with OB/MFM, ICU, anesthesia co-management. [1][2][4]',
    citation: [1, 2, 4],
    next: 'rh-uterine-atony',
    summary: 'ROSC post-RH: hemostasis, MTP, airway, pressors, find cause, OR for closure, ICU with MFM/ICU.',
    safetyLevel: 'critical',
  },

  {
    id: 'rh-uterine-atony',
    type: 'info',
    module: 6,
    title: 'Uterine Atony Management',
    body: '**UTERINE ATONY IS NEAR-UNIVERSAL AFTER RH.**\n\nThe uterus has been cut, the patient was in arrest with no myometrial tone, and postpartum hemorrhage is nearly certain.\n\n**FIRST-LINE — UTEROTONICS (start all that apply):**\n\n• **[Oxytocin](#/drug/oxytocin/postpartum hemorrhage)** — 20 units in 1L NS IV at 250 mL/hr (do NOT give IV push — profound hypotension)\n• **[Tranexamic Acid (TXA)](#/drug/tranexamic-acid/postpartum hemorrhage)** — 1 g IV over 10 minutes, repeat once at 30 min if bleeding continues (WOMAN trial — give within 3 hours)\n• **Bimanual uterine massage** — one hand in vagina, one on fundus, compress continuously\n\n**SECOND-LINE (if atony persists):**\n\n• **[Misoprostol](#/drug/misoprostol/postpartum hemorrhage)** — 800-1000 mcg PR (rectal) or SL\n• **Methylergonovine** (Methergine) — 0.2 mg IM (CONTRAINDICATED in hypertension, preeclampsia, eclampsia — this patient very possibly qualifies; be cautious)\n• **Carboprost** (Hemabate) — 250 mcg IM q15 min (CONTRAINDICATED in asthma)\n\n**THIRD-LINE (refractory PPH):**\n\n• **Uterine balloon tamponade** (Bakri, Ebb, or Foley)\n• **Surgical management** in OR — uterine artery ligation, B-Lynch suture, hysterectomy\n• **Interventional radiology** — uterine artery embolization\n\n**KEEP THE BLOOD PRODUCTS COMING.** Continue MTP — 1:1:1 ratio (pRBC:FFP:platelets). Goal: fibrinogen >200, platelets >50, Ca++ >1.0.',
    citation: [1, 2, 19, 20],
    treatment: {
      firstLine: {
        drug: 'Oxytocin',
        dose: '20 units in 1L NS',
        route: 'IV infusion',
        frequency: '250 mL/hr (never IV push)',
        duration: 'until atony resolves and 4+ hours post-delivery',
        notes: 'Do NOT give IV push — causes profound hypotension and arrhythmia.',
      },
      alternative: {
        drug: 'Tranexamic Acid (TXA)',
        dose: '1 g IV over 10 min',
        route: 'IV',
        frequency: 'repeat once at 30 min if bleeding continues',
        duration: 'single dose (or 2-dose regimen)',
        notes: 'WOMAN trial — give within 3 hours of delivery. Reduces maternal mortality from bleeding.',
      },
      pcnAllergy: {
        drug: 'Misoprostol',
        dose: '800-1000 mcg',
        route: 'PR (rectal) or SL',
        frequency: 'once',
        duration: 'single dose',
        notes: 'Alternative uterotonic. Side effects: fever, shivering, diarrhea. No contraindication in HTN.',
      },
      monitoring: 'Uterine tone (firm vs. boggy), vaginal bleeding, fibrinogen, platelets, calcium, vital signs. Continue MTP with 1:1:1 ratio until hemostasis achieved.',
    },
    next: 'rh-disposition',
    summary: 'Oxytocin drip + TXA 1g IV + bimanual massage first-line. Misoprostol, methergine (not in HTN), carboprost (not asthma) 2nd-line.',
    safetyLevel: 'critical',
  },

  {
    id: 'rh-continued-arrest',
    type: 'result',
    module: 6,
    title: 'Continued Arrest After Hysterotomy',
    body: '**NO ROSC AFTER RESUSCITATIVE HYSTEROTOMY.**\n\nThe aortocaval decompression maneuver did not achieve ROSC. Continue aggressive resuscitation.\n\n**CONTINUE FOR AT LEAST 10 MORE MINUTES (post-delivery):**\n• Standard ACLS — epinephrine q3-5 min, rhythm-appropriate shocks\n• Reassess and treat reversible causes\n• Consider **Intralipid** if LAST possible\n• Ultrasound — rule out tamponade, tension PTX, massive hemorrhage, AFE\n• Massive transfusion if hemorrhage suspected\n\n**CONSIDER:**\n• **ECMO** — [ECMO](#/tree/ecmo) — if available and arrest is clearly reversible (PE, drug OD)\n• **Open chest cardiac massage** — if penetrating trauma, hemorrhage, tamponade\n• **Continued CPR for much longer than usual** — pregnant patients have tolerated prolonged arrest with good outcomes; maternal survival reported after >30 min of CPR\n\n**IF REFRACTORY — TERMINATION OF RESUSCITATION:**\nPer standard criteria when all reversible causes excluded:\n• No ROSC after exhaustive resuscitation\n• No shockable rhythm for extended period\n• ETCO2 <10 mmHg after adequate CPR\n• Team consensus\n\nThis is an ethically complex decision. Involve senior personnel, document thoroughly, support the family and team.',
    recommendation: 'Continue full resuscitation for at least 10 more min post-delivery. Consider ECMO, open chest if indicated. Pregnant patients tolerate prolonged arrest — err toward longer resuscitation.',
    confidence: 'recommended',
    citation: [1, 2, 9],
  },

  {
    id: 'rh-disposition',
    type: 'result',
    module: 6,
    title: 'Disposition & Transfer',
    body: '**FINAL DISPOSITION AFTER MATERNAL ROSC + RESUSCITATIVE HYSTEROTOMY:**\n\n**IMMEDIATE (next 30 minutes):**\n• **Transfer to OR** — formal surgical closure, uterine repair, hemostasis verification\n• **Blood products continuing** — MTP until hemostasis, goal fibrinogen >200, platelets >50\n• **Arterial line, central line** placed\n• **OB + trauma surgery + anesthesia** at bedside in OR\n\n**NEONATE:**\n• **Level III NICU** for post-arrest neonatal care\n• Therapeutic hypothermia per NICU protocol if HIE criteria met\n• Head imaging, EEG monitoring, metabolic panel\n\n**MATERNAL ICU:**\n• Post-cardiac-arrest care bundle\n• Targeted temperature management 32-36°C for 24 hours (safe in postpartum — no increased bleeding risk demonstrated)\n• MFM + ICU + anesthesia co-management\n• Continuous EEG if altered\n• Serial neuro exams\n\n**CAUSE WORKUP:**\n• Complete metabolic, toxicology, coagulation panels\n• CT chest/abdomen/pelvis\n• Echo\n• Autopsy of placenta (AFE, abruption, infection)\n• Cardiology, MFM, hematology, ID consults as indicated\n\n**FAMILY, TEAM, LEGAL:**\n• Family: compassionate, clear communication throughout\n• Debrief the team — this is emotionally demanding for all involved\n• Chaplain / social work for family support\n• Document thoroughly — times, interventions, decisions, personnel\n• Risk management notification per institutional policy\n\n**LONG-TERM:**\n• Maternal outcome depends on cause of arrest\n• Neonatal outcome depends on arrest-to-delivery time and post-delivery care\n• Both patients need long-term follow-up',
    recommendation: 'OR for formal closure. ICU with MFM/ICU co-management, post-arrest care bundle, TTM. Level III NICU for neonate. Cause workup. Team debrief and family support.',
    confidence: 'recommended',
    citation: [1, 2, 4],
  },

];

export const RESUSCITATIVE_HYSTEROTOMY_NODE_COUNT = RESUSCITATIVE_HYSTEROTOMY_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const RESUSCITATIVE_HYSTEROTOMY_MODULE_LABELS = [
  'Recognition & Indications',
  'Pre-Arrest Optimization',
  'Cardiac Arrest Response',
  'The 4-Minute Decision',
  'The Procedure',
  'Post-Delivery Care',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const RESUSCITATIVE_HYSTEROTOMY_CITATIONS: Citation[] = [
  { num: 1, text: 'Weingart S, Swaminathan A. Resuscitative Hysterotomy. EMCrit Project. https://emcrit.org/emcrit/resuscitative-hysterotomy/' },
  { num: 2, text: 'Jeejeebhoy FM, Zelop CM, Lipman S, et al. Cardiac Arrest in Pregnancy: A Scientific Statement From the American Heart Association. Circulation. 2015;132(18):1747-1773. doi:10.1161/CIR.0000000000000300' },
  { num: 3, text: 'Drukker L, Hants Y, Sharon E, et al. Perimortem cesarean section for maternal and fetal salvage: concise review and protocol. Acta Obstet Gynecol Scand. 2014;93(10):965-972. doi:10.1111/aogs.12464' },
  { num: 4, text: 'Lipman S, Cohen S, Einav S, et al. The Society for Obstetric Anesthesia and Perinatology consensus statement on the management of cardiac arrest in pregnancy. Anesth Analg. 2014;118(5):1003-1016. doi:10.1213/ANE.0000000000000171' },
  { num: 5, text: 'Katz V, Balderston K, DeFreest M. Perimortem cesarean delivery: Were our assumptions correct? Am J Obstet Gynecol. 2005;192(6):1916-1920. doi:10.1016/j.ajog.2005.02.038' },
  { num: 6, text: 'ACOG Committee on Obstetric Practice. Committee Opinion No. 656: Guidelines for Perinatal Care of Pregnant Women With Cardiac Disease. Obstet Gynecol. 2016;127(4):e83-e90.' },
  { num: 7, text: 'Kodali BS, Chandrasekhar S, Bulich LN, Topulos GP, Datta S. Airway changes during labor and delivery. Anesthesiology. 2008;108(3):357-362. doi:10.1097/ALN.0b013e31816452d3' },
  { num: 8, text: 'Kinsella SM, Lohmann G. Supine hypotensive syndrome. Obstet Gynecol. 1994;83(5 Pt 1):774-788.' },
  { num: 9, text: 'Einav S, Kaufman N, Sela HY. Maternal cardiac arrest and perimortem caesarean delivery: evidence or expert-based? Resuscitation. 2012;83(10):1191-1200. doi:10.1016/j.resuscitation.2012.05.005' },
  { num: 10, text: 'Kundra P, Khanna S, Habeebullah S, Ravishankar M. Manual displacement of the uterus during Caesarean section. Anaesthesia. 2007;62(5):460-465. doi:10.1111/j.1365-2044.2007.05025.x' },
  { num: 11, text: 'Mhyre JM, Riesner MN, Polley LS, Naughton NN. A series of anesthesia-related maternal deaths in Michigan, 1985-2003. Anesthesiology. 2007;106(6):1096-1104.' },
  { num: 12, text: 'Panchal AR, Bartos JA, Cabañas JG, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for CPR and Emergency Cardiovascular Care. Circulation. 2020;142(suppl 2):S366-S468.' },
  { num: 13, text: 'Rose CH, Faksh A, Traynor KD, Cabrera D, Arendt KW, Brost BC. Challenging the 4- to 5-minute rule: from perimortem cesarean to resuscitative hysterotomy. Am J Obstet Gynecol. 2015;215(5):653-656.e1. doi:10.1016/j.ajog.2015.07.019' },
  { num: 14, text: 'Morris S, Stacey M. Resuscitation in pregnancy. BMJ. 2003;327(7426):1277-1279. doi:10.1136/bmj.327.7426.1277' },
  { num: 15, text: 'Katz VL, Dotters DJ, Droegemueller W. Perimortem cesarean delivery. Obstet Gynecol. 1986;68(4):571-576.' },
  { num: 16, text: 'Benson MD, Padovano A, Bourjeily G, Zhou Y. Maternal collapse: Challenging the four-minute rule. EBioMedicine. 2016;6:253-257. doi:10.1016/j.ebiom.2016.02.042' },
  { num: 17, text: 'Parry R, Asmussen T, Smith JE. Perimortem caesarean section. Emerg Med J. 2016;33(3):224-229. doi:10.1136/emermed-2014-204466' },
  { num: 18, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation (NRP). 8th ed. American Academy of Pediatrics; 2021.' },
  { num: 19, text: 'WOMAN Trial Collaborators. Effect of early tranexamic acid administration on mortality, hysterectomy, and other morbidities in women with post-partum haemorrhage (WOMAN): an international, randomised, double-blind, placebo-controlled trial. Lancet. 2017;389(10084):2105-2116. doi:10.1016/S0140-6736(17)30638-4' },
  { num: 20, text: 'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186. doi:10.1097/AOG.0000000000002351' },
];
