// MedKitt — Amniotic Fluid Embolism (AFE)
// Peripartum cardiovascular collapse + hypoxemia + DIC. Clinical diagnosis of exclusion.
// 6 modules: Recognition → Resuscitation → Perimortem C/S → Pharmacologic Rx → Hemodynamic + DIC → Post-ROSC
// 28 nodes. Source: SMFM Clinical Guideline #9 (2016), SMFM Checklist (2021), Rezai A-O-K (2017), AHA Pregnancy Arrest (2015), Pacheco (2020)

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const AFE_CRITICAL_ACTIONS = [
  { text: 'Call CODE: OB, anesthesia, critical care, NICU, blood bank — activate MTP now', nodeId: 'afe-call' },
  { text: 'Manual left uterine displacement if fundus ≥ umbilicus', nodeId: 'afe-lud' },
  { text: 'High-quality CPR with pregnancy-modified ACLS — standard hand position, standard joules', nodeId: 'afe-acls' },
  { text: 'Perimortem C/S at 4 minutes of arrest if ≥23 wk (AHA/SMFM)', nodeId: 'afe-pmcd' },
  { text: 'A-O-K: Atropine 0.2 mg + Ondansetron 8 mg + Ketorolac 15 mg IV simultaneously', nodeId: 'afe-pharm-branch' },
  { text: 'Activate MTP 1:1:1 — keep fibrinogen >150–200 mg/dL', nodeId: 'afe-mtp' },
  { text: 'TXA 1 g IV over 10 min — repeat once in 30 min if bleeding (<3 h from onset)', nodeId: 'afe-txa' },
  { text: 'Consider VA-ECMO early — survival 60–80% vs ~30% without', nodeId: 'afe-ecmo' },
];

export const AFE_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & DIAGNOSTIC CRITERIA
  // =====================================================================

  {
    id: 'afe-start',
    type: 'question',
    module: 1,
    title: 'Suspected Amniotic Fluid Embolism',
    body: '[AFE Steps Summary](#/info/afe-steps-summary) — first-2-minutes checklist.\n\n**AFE is a clinical diagnosis of exclusion.** Classic triad: **hypoxia + hypotension + coagulopathy** in labor or within 30 min postpartum. Mortality 20–60%; neurologically intact survival depends on minutes, not hours. [1][2][3]\n\n**Prodrome in ~30%:** agitation, "sense of doom," restlessness, shivering, paresthesias, metallic taste — **precedes collapse by seconds to minutes.** [5]\n\nIs the patient in labor, C-section, D&E, or within 30 min postpartum AND experiencing sudden cardiopulmonary collapse (SBP <90, SpO₂ <90, dyspnea, cyanosis, or arrest)?',
    citation: [1, 2, 3, 5],
    options: [
      { label: 'Yes — peripartum + sudden collapse', next: 'afe-call', urgency: 'critical' },
      { label: 'No — consider other diagnoses', description: 'PE, anaphylaxis, sepsis, MI, eclampsia, hemorrhagic shock', next: 'afe-ddx' },
    ],
    summary: 'Peripartum sudden collapse + hypoxia + DIC — clinical dx of exclusion, ~30% have prodrome',
    safetyLevel: 'critical',
  },

  {
    id: 'afe-ddx',
    type: 'info',
    module: 1,
    title: 'Differential Diagnosis',
    body: '**Before committing to AFE, rule out treatable mimics:** [1][6]\n\n• **Pulmonary embolism** — bedside echo: RV strain without the fibrinolytic DIC pattern\n• **Anaphylaxis** — urticaria, bronchospasm, clear trigger; responds to epinephrine alone\n• **Septic shock** — fever, leukocytosis, source; slower onset\n• **Myocardial infarction** — ECG changes, troponin; rare peripartum but possible\n• **Eclampsia** — seizure, proteinuria, HTN (AFE typically hypotensive)\n• **Hemorrhagic shock** — identifiable bleeding source + responsive to volume; DIC is late\n• **Peripartum cardiomyopathy** — subacute onset, LV dysfunction, no DIC\n• **Air embolism / Local anesthetic toxicity** — context-specific (C-section, epidural placement)\n\n**[SMFM / Clark Diagnostic Criteria](#/info/afe-criteria)** — research-standard definition; do not wait for confirmation to treat empirically.',
    citation: [1, 6],
    next: 'afe-call',
    summary: 'Rule out PE, anaphylaxis, sepsis, MI, eclampsia, hemorrhage, PPCM, air/LAST — treat empirically',
  },

  {
    id: 'afe-call',
    type: 'info',
    module: 2,
    title: 'Call for Help — Activate Team',
    body: '**Announce the diagnosis out loud.** Call every resource simultaneously: [2]\n\n• **OB (senior)** — bedside for perimortem C/S if arrest\n• **Anesthesia** — airway + hemodynamics + massive transfusion support\n• **Critical care / ICU** — ECMO eligibility, post-arrest care\n• **NICU / Peds** — neonatal resuscitation team to bedside NOW\n• **Blood bank — activate Massive Transfusion Protocol (MTP) immediately**\n• **Perfusion / ECMO team** — page during the resuscitation, not after\n• **Runner / Recorder** — time-stamp every intervention (arrest time, drugs, shocks)\n\n**Do NOT transport** to OR — bring the OR to the patient. Resuscitative hysterotomy is a bedside procedure.',
    citation: [2],
    next: 'afe-acls',
    summary: 'Call OB, anesthesia, ICU, NICU, blood bank (MTP), ECMO — bring OR to patient',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 2: IMMEDIATE RESUSCITATION + ACLS PREGNANCY MODIFICATIONS
  // =====================================================================

  {
    id: 'afe-acls',
    type: 'question',
    module: 2,
    title: 'Cardiac Arrest?',
    body: '**Check pulse (≤10 sec). If no pulse, begin high-quality CPR immediately.** [Pregnancy-Modified ACLS](#/info/afe-acls-pregnancy)\n\n**Key pregnancy modifications (AHA 2015):** [9]\n\n• **Hand position:** standard — center of sternum (NOT higher; older teaching was wrong)\n• **Manual left uterine displacement (LUD)** — two-handed push-to-left preferred over tilt (see below)\n• **Defibrillation:** standard joules, standard pad placement — remove fetal monitors first\n• **IV access:** above the diaphragm (IVC compression below)\n• **Airway:** early intubation (higher aspiration risk, difficult airway); smaller ETT 6.0–7.0\n• **Drugs:** standard ACLS doses — epinephrine 1 mg q3–5 min\n\nIs the patient in cardiac arrest (no pulse)?',
    citation: [9],
    options: [
      { label: 'Yes — arrest', description: 'Begin CPR + prepare for perimortem C/S at 4 min', next: 'afe-lud', urgency: 'critical' },
      { label: 'No — shock but pulse present', description: 'Severe hypotension + hypoxemia without arrest', next: 'afe-airway' },
    ],
    summary: 'CPR if no pulse — standard hand position, standard joules, LUD, above-diaphragm IV',
    safetyLevel: 'critical',
  },

  {
    id: 'afe-lud',
    type: 'info',
    module: 2,
    title: 'Manual Left Uterine Displacement (LUD)',
    body: '**Mandatory if fundus ≥ umbilicus (≈ ≥20 weeks).** IVC compression by the gravid uterus can reduce venous return by up to 30% — CPR is ineffective without LUD. [9]\n\n**Preferred: Two-handed push-to-left technique**\n• Dedicated provider stands on patient\'s left\n• Both hands cup the uterus and push it up and to the patient\'s LEFT\n• Continuous throughout CPR — do not stop for rhythm checks\n\n**Tilt is inferior** — quality of compressions drops ~30% on any tilt. Use tilt only if LUD cannot be maintained.\n\n**Do NOT delay compressions** to achieve LUD. CPR first, then add LUD as soon as a provider is available.',
    citation: [9],
    next: 'afe-airway',
    summary: 'Two-handed push-to-left > tilt — continuous throughout CPR, do not delay compressions',
    safetyLevel: 'critical',
  },

  {
    id: 'afe-airway',
    type: 'info',
    module: 2,
    title: 'Airway & Oxygenation',
    body: '**Immediate intubation** — all AFE patients need a definitive airway. [1][2]\n\n• **100% FiO₂** — maximize oxygenation\n• **Smaller ETT (6.0–7.0)** — airway mucosal edema in pregnancy\n• **Rapid sequence** — etomidate 0.3 mg/kg or ketamine 1–2 mg/kg; avoid propofol (hypotension)\n• **PEEP 5–10 cm H₂O** initially, titrate up for hypoxemia\n• **Waveform capnography** immediately after intubation — ETCO₂ >20 mmHg = adequate CPR\n• **Aspiration risk is high** — apply cricoid pressure during bagging if not yet intubated\n\n**Difficult airway expected** — full-term pregnancy, airway edema, breast tissue, laryngeal edema from resuscitation.',
    citation: [1, 2],
    next: 'afe-access',
    summary: 'Intubate immediately, 100% FiO2, ETT 6.0-7.0, ETCO2 >20 = good CPR — expect difficult airway',
  },

  {
    id: 'afe-access',
    type: 'info',
    module: 2,
    title: 'Access & Monitoring',
    body: '**Establish rapidly (do not delay CPR):** [2]\n\n• **2× large-bore peripheral IVs (16-18 g)** — above the diaphragm\n• **Arterial line** — as soon as feasible (accurate MAP, serial labs)\n• **Central line** — IJ or subclavian once ROSC or for ECMO cannulation\n• **IO access** — tibial or humeral if no IV within 60 sec; above-diaphragm humeral preferred\n• **Foley with urometer** — trend urine output\n\n**Labs (draw with first access):**\n• ABG, lactate\n• **Fibrinogen, platelets, PT/INR, aPTT** — obstetric DIC criteria (Erez/Clark score)\n• TEG/ROTEM if available — FIBTEM A5 <12 mm triggers fibrinogen replacement\n• CBC, CMP, troponin, BNP\n• Type and crossmatch 6 units PRBC (if not already)',
    citation: [2],
    next: 'afe-pmcd-decision',
    summary: '2x large-bore IV above diaphragm, A-line, central + IO backup — fibrinogen + TEG are critical labs',
  },

  // =====================================================================
  // MODULE 3: PERIMORTEM C-SECTION / RESUSCITATIVE HYSTEROTOMY
  // =====================================================================

  {
    id: 'afe-pmcd-decision',
    type: 'question',
    module: 3,
    title: 'Perimortem C-Section Decision',
    body: '**Is the patient in cardiac arrest AND at ≥23 weeks gestation (or fundus ≥ umbilicus)?**\n\n**The 4-Minute Rule (AHA/SMFM):** if ROSC not achieved by 4 minutes of arrest, **start resuscitative hysterotomy at minute 4 — deliver by minute 5.** [7][8][9]\n\n**Why it works:**\n• Relieves aortocaval compression → improves maternal venous return and CPR effectiveness\n• Cardiac output in pregnancy CPR is only ~30% of non-pregnant; emptying the uterus restores it\n• **The primary goal is maternal survival** — not fetal rescue\n\n**Where:** at bedside. Do NOT transport to OR.\n**How:** midline vertical skin + vertical uterine incision; no anesthesia (patient in arrest); continue CPR throughout.\n\n→ Full procedural walkthrough: **[Resuscitative Hysterotomy consult](#/tree/resuscitative-hysterotomy)**',
    citation: [7, 8, 9],
    options: [
      { label: 'Arrest + ≥23 wk — perform hysterotomy', next: 'afe-pmcd', urgency: 'critical' },
      { label: 'Shock without arrest — continue resuscitation', description: 'Defer hysterotomy unless deterioration', next: 'afe-pharm-branch' },
      { label: '<20 wk or no fundus palpable', description: 'Hysterotomy not indicated — standard adult ACLS', next: 'afe-pharm-branch' },
    ],
    summary: '4-min rule: arrest >4 min + >=23 wk = start hysterotomy, deliver by 5 min — at bedside',
    safetyLevel: 'critical',
  },

  {
    id: 'afe-pmcd',
    type: 'info',
    module: 3,
    title: 'Start Resuscitative Hysterotomy NOW',
    body: '**Action — start immediately, do not wait for equipment beyond a scalpel:** [7][8]\n\n1. **Continue CPR + LUD** throughout the procedure\n2. **Midline vertical skin incision** — xiphoid to pubis\n3. **Vertical uterine incision** — avoid placenta if visible\n4. **Deliver fetus** — clamp and cut cord, hand to neonatal team\n5. **Deliver placenta** — manual extraction, uterine massage\n6. **Pack uterus** — do not attempt definitive closure during arrest\n7. **Close abdomen** only after ROSC or on transport to OR\n\n**Do NOT wait for:**\n• Anesthesia (patient is in arrest — no anesthesia needed)\n• Formal OR setup\n• Sterile prep beyond splash of Betadine\n• Fetal viability assessment\n\n**Einav 2015** — Maternal survival reported up to 15 min after arrest, neonatal survival up to 30 min. If ROSC not achieved, hysterotomy at any time is still reasonable. [8]\n\n→ **[Resuscitative Hysterotomy procedural consult](#/tree/resuscitative-hysterotomy)** for full step-by-step.',
    citation: [7, 8],
    next: 'afe-pharm-branch',
    summary: 'Bedside midline vertical, no anesthesia, CPR continuous — maternal survival to 15 min, neonate to 30 min',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 4: PHARMACOLOGIC THERAPY (A-O-K + Anaphylactoid)
  // =====================================================================

  {
    id: 'afe-pharm-branch',
    type: 'info',
    module: 4,
    title: 'Pharmacologic Adjuncts — A-O-K',
    body: '**A-O-K protocol** (Rezai 2017) — blocks three pulmonary vasoconstriction/platelet pathways simultaneously. Case-report evidence; not standard of care but reasonable adjunct to ACLS. [4]\n\n**Give all three together, IV push within 1 minute of recognition:**\n\n• **[Atropine](#/drug/atropine/amniotic fluid embolism) 0.2 mg IV** — vagolytic, reverses pulmonary reflex bradycardia/hypotension\n• **[Ondansetron](#/drug/ondansetron/amniotic fluid embolism) 8 mg IV** — 5-HT3 block → reduces pulmonary vasoconstriction\n• **[Ketorolac](#/drug/ketorolac/amniotic fluid embolism) 15 mg IV** — COX inhibition → blocks thromboxane, preserves platelets\n\n**Full protocol:** [A-O-K + Anaphylactoid Therapy Guide](#/info/afe-aok)\n\n**Alternative: "50-50-500"** (older anaphylactoid hypothesis, still reasonable):\n• [Diphenhydramine](#/drug/diphenhydramine/amniotic fluid embolism) 50 mg IV\n• [Famotidine](#/drug/famotidine/amniotic fluid embolism) 50 mg IV (or 20 mg — hospital formulary)\n• [Hydrocortisone](#/drug/hydrocortisone/amniotic fluid embolism) 500 mg IV\n\n**These are adjuncts — do not substitute for ACLS, MTP, pressors, or hysterotomy.**',
    citation: [4],
    next: 'afe-hemo',
    summary: 'A-O-K: Atropine 0.2mg + Ondansetron 8mg + Ketorolac 15mg IV — give simultaneously within 1 min',
  },

  // =====================================================================
  // MODULE 5: HEMODYNAMIC SUPPORT + DIC / MTP
  // =====================================================================

  {
    id: 'afe-hemo',
    type: 'info',
    module: 5,
    title: 'Hemodynamic Support — RV-First Strategy',
    body: '**AFE shock = acute RV failure from pulmonary HTN.** Fluid overload worsens RV distension and septal shift. [1][3]\n\n**Vasopressors (first-line — start early, titrate aggressively):**\n• **[Norepinephrine](#/drug/norepinephrine/amniotic fluid embolism)** 0.05–0.5 mcg/kg/min — first choice (α > β)\n• **[Vasopressin](#/drug/vasopressin/amniotic fluid embolism)** 0.04 U/min — spares pulmonary vasculature, synergistic with norepi\n• **[Epinephrine](#/drug/epinephrine/amniotic fluid embolism)** 0.05–0.5 mcg/kg/min — if arrest or mixed shock\n\n**Inotropes (for RV failure with preserved SBP):**\n• **[Milrinone](#/drug/milrinone/amniotic fluid embolism)** 0.25–0.75 mcg/kg/min (NO bolus — drops SBP)\n• **[Dobutamine](#/drug/dobutamine/amniotic fluid embolism)** 2.5–10 mcg/kg/min\n\n**Pulmonary vasodilators (selective — will not drop SBP):**\n• **Inhaled nitric oxide** 20–40 ppm (max 80)\n• **Inhaled epoprostenol (Flolan)** 50 ng/kg/min nebulized\n• **Inhaled milrinone** 5 mg nebulized\n\n**Fluids:** crystalloid 500 mL bolus MAX during initial resuscitation; after that, blood products preferred. CVP >12 or RV dilation on bedside echo = STOP fluids.',
    citation: [1, 3],
    next: 'afe-mtp',
    summary: 'RV failure physiology — pressors first (norepi + vaso), inotropes (milrinone no bolus), iNO — limit crystalloid',
  },

  {
    id: 'afe-mtp',
    type: 'question',
    module: 5,
    title: 'DIC / Massive Transfusion',
    body: '**Activate MTP at diagnosis — do not wait for labs.** AFE coagulopathy is often fibrinolytic PLUS consumptive. [10][12]\n\n**[MTP + DIC Targets](#/info/afe-mtp)** — full transfusion table.\n\n**Initial orders:**\n• **PRBC : FFP : Platelets = 1:1:1** (standard MTP pack)\n• **Fibrinogen target ≥150–200 mg/dL** (obstetric threshold higher than trauma)\n• **[Cryoprecipitate](#/drug/cryoprecipitate/amniotic fluid embolism)** 10 units (or 2 pooled bags) — raises fibrinogen ~70–100 mg/dL\n• **Fibrinogen concentrate** 2–4 g IV (if available — faster than cryo, volume-sparing)\n• **Platelets** — keep >50 ×10⁹/L (>75 if ongoing bleeding)\n\n**TEG/ROTEM-guided resuscitation:**\n• FIBTEM A5 <12 mm → fibrinogen\n• EXTEM CT prolonged → FFP or PCC\n• LY30 >3% → TXA\n\nIs there active hemorrhage (vaginal bleeding, oozing from IV sites, surgical field bleeding)?',
    citation: [10, 12],
    options: [
      { label: 'Yes — active bleeding + coagulopathy', next: 'afe-txa', urgency: 'critical' },
      { label: 'No bleeding yet — trend labs', description: 'Monitor fibrinogen, platelets, PT/PTT q30-60 min', next: 'afe-ecmo' },
    ],
    summary: 'MTP 1:1:1 + fibrinogen >150-200 — activate at dx, do not wait for labs',
    safetyLevel: 'critical',
  },

  {
    id: 'afe-txa',
    type: 'info',
    module: 5,
    title: 'TXA + Antifibrinolytics',
    body: '**[Tranexamic Acid (TXA)](#/drug/tranexamic-acid/amniotic fluid embolism) 1 g IV over 10 min → repeat 1 g IV over 10 min at 30 min if bleeding continues.** [10]\n\n**WOMAN trial (Lancet 2017):** TXA within 3 h of postpartum hemorrhage onset reduces death from bleeding. NNT 267. No increase in thromboembolic events. Give early — effect diminishes after 3 h.\n\n**Avoid rFVIIa** — Leighton 2011 systematic review showed increased thrombotic death in AFE patients who received rFVIIa. Reserve only for refractory bleeding AFTER maximal standard MTP has failed and surgical bleeding is controlled. [11]\n\n**Surgical/procedural hemostasis:**\n• Bakri balloon or uterine packing for uterine atony\n• [Oxytocin](#/drug/oxytocin/amniotic fluid embolism) 20 units in 1 L NS at 250 mL/hr + methylergonovine + carboprost if not contraindicated\n• Consider hysterectomy if refractory — do not delay for dying patient\n\n**Trend labs q30–60 min:** fibrinogen, platelets, PT/PTT, TEG.',
    citation: [10, 11],
    next: 'afe-ecmo',
    summary: 'TXA 1g IV over 10 min x 2 doses <3h — avoid rFVIIa (thrombotic death in AFE)',
  },

  {
    id: 'afe-ecmo',
    type: 'question',
    module: 5,
    title: 'ECMO / Mechanical Circulatory Support',
    body: '**Consider VA-ECMO early — case series show survival 60–80% with ECMO vs ~30% without.** [1][12]\n\n**Indications — call ECMO team DURING the resuscitation, not after:**\n• Prolonged CPR (>10 min) without ROSC\n• Refractory RV failure despite pressors + inotropes + pulmonary vasodilators\n• Refractory hypoxemia (PaO₂/FiO₂ <100) despite optimal ventilation\n• Patient is a reasonable candidate (not pre-existing irreversible multi-organ failure)\n\n**Alternatives if ECMO unavailable or delayed:**\n• **Impella RP** — percutaneous RV assist\n• **RVAD** — surgical RV assist\n• **Intra-aortic balloon pump (IABP)** — limited utility in RV-predominant AFE shock\n\n**Logistics:**\n• Peripheral VA-ECMO (femoral artery + vein) is fastest\n• If post-hysterotomy, central cannulation may be feasible during surgical exposure\n• Transfer to ECMO-capable center if not on site — do not delay\n\nHas the patient achieved ROSC AND stabilized hemodynamically?',
    citation: [1, 12],
    options: [
      { label: 'Yes — ROSC + stabilizing', next: 'afe-postrosc', urgency: 'critical' },
      { label: 'No — refractory arrest or shock', description: 'Continue ACLS + ECMO cannulation', next: 'afe-refractory' },
    ],
    summary: 'ECMO survival 60-80% vs 30% — call team during resus, not after; Impella RP / RVAD alternatives',
    safetyLevel: 'critical',
  },

  {
    id: 'afe-refractory',
    type: 'info',
    module: 5,
    title: 'Refractory Arrest — Extended Resuscitation',
    body: '**AFE is one of the few arrest scenarios where extended CPR and "futile-appearing" resuscitation can still produce neurologically intact survivors.** Do not terminate early without team consensus. [7][8][12]\n\n**Optimize every domain:**\n• **CPR quality** — rotate compressors q2 min, ETCO₂ >20 mmHg target, mechanical CPR device if available\n• **LUD** — confirm ongoing, two-handed push-to-left\n• **Hysterotomy** — if not yet performed and ≥20 wk, do it NOW (relieves aortocaval compression)\n• **ECMO cannulation** — continue CPR during cannulation; ROSC after ECMO start is acceptable\n• **Product replacement** — continue MTP 1:1:1 + cryo + TXA\n• **Pressors/inotropes** — push-dose epi/phenylephrine between ACLS rounds if IV infusions not tolerated\n\n**Reversible causes checklist (Hs and Ts, pregnancy-modified):**\n• Hypoxia — airway, FiO₂ 100%, PEEP\n• Hypovolemia — blood products, not crystalloid\n• Hyper/hypo-K — especially if extensive product replacement\n• H+ (acidosis) — bicarb for pH <7.1 with hemodynamic instability\n• Tension PTX — POCUS, needle decompress if suspected\n• Tamponade — bedside echo\n• Thrombosis — AFE itself; also true PE in this population\n• Toxins — magnesium in eclampsia (calcium gluconate 1 g IV reverses)\n\n**Termination criteria:** senior OB + EM + CCM consensus; ETCO₂ <10 mmHg after 30+ min of optimized CPR; no reversible cause remaining. Document thoroughly.',
    citation: [7, 8, 12],
    next: 'afe-postrosc',
    summary: 'Extended CPR warranted in AFE — optimize every domain, consider ECMO, do not terminate early',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 6: POST-RESUSCITATION CARE
  // =====================================================================

  {
    id: 'afe-postrosc',
    type: 'info',
    module: 6,
    title: 'Post-Resuscitation Care',
    body: '**Transfer to ICU immediately after initial stabilization.** [1][2][12]\n\n**Neuroprotection:**\n• **Targeted temperature management 32–36°C × 24 h** if comatose post-ROSC\n• Continuous EEG if persistent unresponsiveness — subclinical seizures common\n• Neuro exam formally at 72 h for prognosis (after rewarming, off sedation)\n\n**Ongoing support:**\n• Lung-protective ventilation (TV 6 mL/kg IBW, plateau <30, PEEP titrated)\n• Hemodynamic monitoring — arterial line, CVP/ScvO₂, bedside echo q6–12 h\n• **Trend fibrinogen, platelets, TEG, lactate q1–2 h** until stable\n• Urine output >0.5 mL/kg/hr target\n\n**Watch for delayed complications:**\n• **AKI** (shock + transfusion + myoglobinuria from CPR)\n• **ARDS**\n• **Ischemic hepatopathy**\n• **Sheehan syndrome** — pituitary necrosis from hemorrhagic shock (monitor cortisol, prolactin, TSH)\n• **Cardiomyopathy** — follow-up echo in 2–4 weeks\n• **Delayed DIC** — can recur; keep MTP products nearby for 24 h\n\n**Psychosocial:**\n• Neonatal status — update family as soon as feasible\n• **Maternal PTSD is common** — psychiatry consult before discharge\n• Debrief the code team\n\n**[Report to the AFE Registry](https://www.afesupport.org)** — AFE Foundation maintains international registry for research and family support.',
    citation: [1, 2, 12],
    next: 'afe-complete',
    summary: 'ICU + TTM 32-36 x 24h if comatose, trend fibrinogen/TEG, watch AKI/ARDS/Sheehan, report to AFE Registry',
  },

  {
    id: 'afe-complete',
    type: 'result',
    module: 6,
    title: 'AFE Resuscitation Complete',
    body: '**Resuscitation goals achieved. Transition to ICU care.** [1][2]\n\n**Before handoff, confirm:**\n✓ Definitive airway secured, appropriate ventilator settings\n✓ Hemodynamics stable on documented pressor regimen\n✓ MTP products given — documented ratios, fibrinogen >150, platelets >50\n✓ TXA dosed ×1 (±repeat), hemostasis achieved\n✓ Uterus firm or packed; Foley in place; bladder not distended\n✓ Neonatal team has infant — APGAR documented, disposition clear\n✓ Imaging post-stabilization: CXR (ETT position, ARDS), bedside echo (RV/LV function)\n✓ ICU bed, ECMO status if on support, continuous EEG if comatose\n✓ **Code team debrief scheduled**\n✓ **Family updated — both mother and infant status**\n\n**Document clearly:**\n• Time of symptom onset, arrest, ROSC, hysterotomy\n• All drugs, doses, times\n• All blood products (PRBC, FFP, platelets, cryo, fibrinogen)\n• Decision points and team consensus moments\n• **Report case to AFE Foundation registry** — improves epidemiology and future care',
    recommendation: 'Transfer to ICU. TTM 32–36 °C × 24 h if comatose. Trend labs q1–2 h. Watch AKI/ARDS/Sheehan/delayed DIC. Maternal psychiatry consult before discharge. Report to AFE Registry.',
    confidence: 'definitive',
    citation: [1, 2, 3, 12],
    summary: 'ICU transition with complete handoff, registry report, family/team debrief',
  },

];

export const AFE_NODE_COUNT = AFE_NODES.length;

// -------------------------------------------------------------------
// Module Labels
// -------------------------------------------------------------------

export const AFE_MODULE_LABELS = [
  'Recognition',
  'Resuscitation',
  'Perimortem C/S',
  'Pharmacologic Rx',
  'Hemodynamic + DIC',
  'Post-ROSC',
];

// -------------------------------------------------------------------
// Citations (12 references)
// -------------------------------------------------------------------

export const AFE_CITATIONS: Citation[] = [
  { num: 1, text: 'Pacheco LD, Saade G, Hankins GDV, Clark SL. SMFM Clinical Guideline #9: Amniotic fluid embolism — diagnosis and management. Am J Obstet Gynecol. 2016;215(2):B16-24. PMID: 26987420. https://pubmed.ncbi.nlm.nih.gov/26987420/' },
  { num: 2, text: 'Combs CA, Montgomery DM, Toner LE, Dildy GA. SMFM Special Statement: Checklist for initial management of amniotic fluid embolism. Am J Obstet Gynecol. 2021;224(4):B29-32. PMID: 33417901. https://pubmed.ncbi.nlm.nih.gov/33417901/' },
  { num: 3, text: 'Pacheco LD, Clark SL, Klassen M, Hankins GDV. Amniotic fluid embolism: principles of early clinical management. Am J Obstet Gynecol. 2020;222(1):48-52. PMID: 31376394. https://pubmed.ncbi.nlm.nih.gov/31376394/' },
  { num: 4, text: 'Rezai S, Hughes AC, Larsen TB, et al. Atypical amniotic fluid embolism managed with a novel therapeutic regimen (A-O-K: atropine, ondansetron, ketorolac). Case Rep Obstet Gynecol. 2017;2017:8458375. PMID: 29430313. https://pubmed.ncbi.nlm.nih.gov/29430313/' },
  { num: 5, text: 'Clark SL, Hankins GDV, Dudley DA, Dildy GA, Porter TF. Amniotic fluid embolism: analysis of the national registry. Am J Obstet Gynecol. 1995;172(4 Pt 1):1158-69. PMID: 7726251.' },
  { num: 6, text: 'Clark SL, Romero R, Dildy GA, et al. Proposed diagnostic criteria for the case definition of amniotic fluid embolism in research studies. Am J Obstet Gynecol. 2016;215(4):408-12. PMID: 27372270. https://pubmed.ncbi.nlm.nih.gov/27372270/' },
  { num: 7, text: 'Einav S, Kaufman N, Sela HY. Maternal cardiac arrest and perimortem caesarean delivery: evidence or expert-based? Resuscitation. 2012;83(10):1191-200. PMID: 22613275.' },
  { num: 8, text: 'Rose CH, Faksh A, Traynor KD, Cabrera D, Arendt KW, Brost BC. Challenging the 4- to 5-minute rule: from perimortem cesarean to resuscitative hysterotomy. Am J Obstet Gynecol. 2015;213(5):653-6. PMID: 26212180. https://pubmed.ncbi.nlm.nih.gov/26212180/' },
  { num: 9, text: 'Jeejeebhoy FM, Zelop CM, Lipman S, et al. Cardiac Arrest in Pregnancy: AHA Scientific Statement. Circulation. 2015;132(18):1747-73. PMID: 26443610. https://pubmed.ncbi.nlm.nih.gov/26443610/' },
  { num: 10, text: 'WOMAN Trial Collaborators. Effect of early tranexamic acid administration on mortality, hysterectomy, and other morbidities in women with post-partum haemorrhage (WOMAN): an international, randomised, double-blind, placebo-controlled trial. Lancet. 2017;389(10084):2105-16. PMID: 28456509.' },
  { num: 11, text: 'Leighton BL, Wall MH, Lockhart EM, Phillips LE, Zatta AJ. Use of recombinant factor VIIa in patients with amniotic fluid embolism: a systematic review of case reports. Anesthesiology. 2011;115(6):1201-8. PMID: 22037642.' },
  { num: 12, text: 'Andonotopo W, Bachnas MA, et al. Amniotic fluid embolism: comprehensive review of diagnosis and management. J Perinat Med. 2025. PMID: 40842297. https://pubmed.ncbi.nlm.nih.gov/40842297/' },
];
