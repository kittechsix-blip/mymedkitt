// MedKitt — Palpitations Hub (EM canonical + Cardiology cross-list, type: 'hub')
//
// 5-Module skeleton per ~/Desktop/claude-brain/patterns/hub-consult-pattern.md v2:
//   1. Sick Check
//   2. Time-Critical Exclusions (branches -> deep-dive consults)
//   3. Initial Bundle + Reassess
//   4. Workup / Monitoring Decision
//   5. Disposition
//
// CROSS-LINK DIRECTIONALITY (R8): hub links INTO splits; splits never link back.
// All outbound #/tree/ targets validated against the repo on 2026-07-12.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PALPITATIONS_HUB_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Sick Check
  // ============================================================
  {
    id: 'palp-start',
    type: 'info',
    module: 1,
    title: 'Palpitations Hub — Get the ECG, Sort Stable vs Unstable',
    body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Unstable tachyarrhythmia** \u2014 hypotension, chest pain, dyspnea, altered mentation, shock = synchronized cardioversion NOW, do not wait.\n2. **Wide-complex tachycardia = VT until proven otherwise** \u2014 do NOT treat as SVT with a nodal blocker.\n3. **The malignant substrates** \u2014 WPW/pre-excited AF, Brugada, long-QT/Torsades, Wellens \u2014 a resting or captured ECG saves lives.\n4. **Palpitations as a symptom of a bigger problem** \u2014 ACS, PE, hypoglycemia, thyroid storm, sepsis, GI bleed/anemia, drug/electrolyte effect.\n5. **Syncope with palpitations** \u2014 a red flag for a serious arrhythmia; do not discharge as \u201canxiety.\u201d\n\n**The single most important action: get a 12-lead ECG (and a rhythm strip) while the patient is symptomatic if at all possible.** The whole workup pivots on capturing the rhythm. [1,2]\n\n**Scan in 30 seconds \u2014 stable or unstable?** [1]\n- **Unstable signs** (any of): hypotension/shock, ischemic chest pain, acute heart failure/pulmonary edema, altered mentation. \u2192 If a tachyarrhythmia is present and causing this, prepare for **synchronized cardioversion** immediately.\n- **Rate & rhythm** \u2014 regular vs irregular, narrow vs wide complex, rate.\n- **Vitals** \u2014 BP, SpO2, temperature (sepsis/thyroid), glucose.\n- **Appearance** \u2014 pallor (anemia/GI bleed), tremor/goiter (thyroid), diaphoresis (ACS).\n\n**The 4 questions that change the differential:** [1,2]\n1. **Are you stable?** (unstable + tachyarrhythmia \u2192 cardioversion now)\n2. **Is the QRS wide or narrow, regular or irregular?** (drives the arrhythmia branch \u2014 wide = VT until proven otherwise)\n3. **Chest pain, dyspnea, or syncope with it?** (ACS, PE, or a dangerous arrhythmia)\n4. **Any triggers/systemic cause?** (thyroid, stimulants/drugs, fever/sepsis, bleeding/anemia, hypoglycemia, electrolytes)',
    citation: [1, 2],
    next: 'palp-exclusions',
    summary: 'Get a 12-lead ECG while symptomatic. Sort stable vs unstable first \u2014 unstable + tachyarrhythmia = synchronized cardioversion NOW. Wide-complex tachycardia is VT until proven otherwise.',
    safetyLevel: 'critical',
  },

  // ============================================================
  // Module 2 — Time-Critical Exclusions
  // ============================================================
  {
    id: 'palp-exclusions',
    type: 'question',
    module: 2,
    title: 'Time-Critical Exclusions — Pick the One That Fits',
    body: 'Instability first, then read the ECG. Each branch routes to a deep-dive and the next action.',
    options: [
      {
        label: 'Unstable: hypotension, ischemic chest pain, heart failure, altered \u2014 with a tachyarrhythmia',
        description: 'Synchronized cardioversion NOW \u2014 do not delay for drugs',
        next: 'palp-exc-unstable',
        urgency: 'critical',
      },
      {
        label: 'Wide-complex tachycardia (QRS \u2265120 ms), regular',
        description: 'VT until proven otherwise \u2014 do NOT give AV-nodal blockers',
        next: 'palp-exc-wct',
        urgency: 'critical',
      },
      {
        label: 'Irregularly irregular, often fast (AF/flutter); wide + irregular = pre-excited AF',
        description: 'Afib RVR / pre-excited AF \u2014 rate/rhythm control; procainamide if WPW',
        next: 'palp-exc-af',
        urgency: 'urgent',
      },
      {
        label: 'Regular narrow-complex tachycardia ~150-250, abrupt onset/offset',
        description: 'SVT \u2014 vagal maneuvers, adenosine',
        next: 'palp-exc-svt',
        urgency: 'urgent',
      },
      {
        label: 'Polymorphic VT / long QT / recent QT-prolonging drug or low K/Mg',
        description: 'Torsades de pointes \u2014 magnesium, correct QT drivers',
        next: 'palp-exc-torsades',
        urgency: 'critical',
      },
      {
        label: 'Baseline ECG red flag: delta wave (WPW), Brugada pattern, or Wellens',
        description: 'Malignant substrate \u2014 cardiology, avoid the wrong drug',
        next: 'palp-exc-substrate',
        urgency: 'urgent',
      },
      {
        label: 'Chest pain / dyspnea / systemic trigger driving the palpitations',
        description: 'ACS, PE, thyroid, sepsis, hypoglycemia, anemia \u2014 treat the cause',
        next: 'palp-exc-secondary',
        urgency: 'urgent',
      },
      {
        label: 'None of the above \u2014 palpitations now resolved / benign, stable',
        description: 'Initial bundle + structured workup',
        next: 'palp-rescue',
      },
    ],
    citation: [1, 2, 3],
    summary: 'Instability first (cardiovert), then read the ECG: wide=VT, irregular=AF (pre-excited if wide+irregular), regular narrow=SVT, polymorphic=torsades, plus baseline red-flag substrates and secondary causes.',
    safetyLevel: 'critical',
  },

  // -------- Time-critical exclusion branch results --------
  {
    id: 'palp-exc-unstable',
    type: 'result',
    module: 2,
    title: 'Unstable Tachyarrhythmia — Cardiovert Now',
    body: 'An unstable patient (hypotension, ischemic chest pain, acute heart failure, or altered mentation) whose picture is driven by a tachyarrhythmia needs **immediate synchronized cardioversion** \u2014 do not delay for a drug trial. [3]\n\n**Next 5 minutes:**\n- Confirm the instability is caused by the rhythm (not a fast sinus rate compensating for shock/sepsis/hemorrhage \u2014 cardioverting sinus tachycardia is useless and harmful; treat the underlying cause instead).\n- **Synchronized cardioversion:** sedate/analgese if time permits; energy per device/rhythm (e.g., narrow regular ~50-100 J, narrow irregular/AF ~120-200 J biphasic, wide regular ~100 J \u2014 follow ACLS).\n- If the rhythm is polymorphic/pulseless VT or degenerates to VF \u2192 defibrillate (unsynchronized) and run [Cardiac Arrest](#/tree/cardiac-arrest) / [Refractory VF/VT](#/tree/refractory-vfvt).\n- IV \u00d7 2, monitor, pads on, airway kit, correct K/Mg, treat reversible causes.\n- After stabilization, capture a 12-lead and route to the specific rhythm consult.\n\n\ud83d\uded1 Do NOT cardiovert a compensatory sinus tachycardia \u2014 confirm the arrhythmia is the cause of instability. \ud83d\uded1 Unstable = electricity first, not a prolonged drug trial.',
    recommendation: 'Confirm the arrhythmia is causing the instability (not compensatory sinus tach), then immediate synchronized cardioversion (defibrillate if pulseless/polymorphic). IV access, correct K/Mg, treat reversible causes.',
    confidence: 'definitive',
    citation: [3],
    safetyLevel: 'critical',
  },
  {
    id: 'palp-exc-wct',
    type: 'result',
    module: 2,
    title: 'Wide-Complex Tachycardia — VT Until Proven Otherwise',
    body: 'Open [Wide-Complex Tachycardia](#/tree/wide-complex-tachycardia) for the diagnostic approach and [Ventricular Tachycardia](#/tree/ventricular-tachycardia) for management.\n\n**Any regular wide-complex tachycardia (QRS \u2265120 ms) is ventricular tachycardia until proven otherwise \u2014 especially with structural heart disease or prior MI.** Treating VT as \u201cSVT with aberrancy\u201d by giving an AV-nodal blocker (verapamil/diltiazem/adenosine as therapy) can precipitate hemodynamic collapse. [4,10]\n\n**Next 5 minutes:**\n- **Unstable \u2192 synchronized cardioversion** (see the unstable branch).\n- **Stable, regular monomorphic WCT:** antiarrhythmic \u2014 procainamide (often preferred) or amiodarone; call cardiology; prepare for cardioversion if it fails.\n- **Avoid AV-nodal blocking agents** for undifferentiated WCT (dangerous if it is VT or pre-excited AF).\n- IV \u00d7 2, monitor, pads on, correct electrolytes (K, Mg).\n- Look for the substrate: prior MI, cardiomyopathy, channelopathy; get old ECGs.\n- **Polymorphic** wide-complex \u2192 think Torsades / ischemia (see Torsades branch and [STEMI](#/tree/stemi) if ischemic).\n\n\ud83d\uded1 Do NOT give calcium-channel blockers or adenosine as therapy for undifferentiated WCT. \ud83d\uded1 When in doubt, treat a wide-complex tachycardia as VT.',
    recommendation: 'Treat regular WCT as VT: unstable \u2192 cardiovert; stable \u2192 procainamide or amiodarone + cardiology. Avoid AV-nodal blockers. Correct K/Mg. Polymorphic \u2192 consider torsades/ischemia.',
    confidence: 'definitive',
    citation: [3, 4, 10],
    safetyLevel: 'critical',
  },
  {
    id: 'palp-exc-af',
    type: 'result',
    module: 2,
    title: 'Atrial Fibrillation / Flutter (incl. Pre-Excited AF)',
    body: 'Open [Atrial Fibrillation with RVR](#/tree/afib-rvr) for the rate/rhythm-control, anticoagulation, and disposition pathway.\n\n**Irregularly irregular tachycardia = AF (or atrial flutter with variable block).** Key ED tasks: control the rate/rhythm, decide on anticoagulation, and detect the dangerous variant. [5]\n\n**Next 5 minutes:**\n- **Unstable \u2192 synchronized cardioversion.**\n- **Stable AF with RVR:** rate control with a beta-blocker or a non-dihydropyridine calcium-channel blocker (diltiazem) \u2014 choose per LV function (avoid CCB in reduced EF; consider amiodarone/digoxin in heart failure).\n- **Pre-excited AF (WPW): irregular, wide, and often very fast (>200) with varying QRS morphology.** **Do NOT give AV-nodal blockers (adenosine, diltiazem, verapamil, digoxin, beta-blockers)** \u2014 they can accelerate conduction down the accessory pathway and precipitate VF. Use **procainamide** (or synchronized cardioversion, especially if unstable).\n- Assess stroke risk (CHA2DS2-VASc) and bleeding risk; decide on anticoagulation and the rate-vs-rhythm and cardioversion-timing questions per the AF consult (onset <48 h vs unknown/\u226548 h changes cardioversion safety).\n- Look for triggers: sepsis, PE, thyroid, ischemia, alcohol, electrolytes.\n\n\ud83d\uded1 Wide + irregular + very fast = pre-excited AF \u2014 procainamide or cardioversion, NEVER an AV-nodal blocker. \ud83d\uded1 Do not cardiovert AF of unknown/\u226548 h duration without addressing thromboembolic risk unless the patient is unstable.',
    recommendation: 'Rate/rhythm control per LV function; decide anticoagulation (CHA2DS2-VASc). Pre-excited AF (wide, irregular, fast) \u2192 procainamide or cardioversion, NEVER AV-nodal blockers. Hunt triggers (sepsis, PE, thyroid).',
    confidence: 'definitive',
    citation: [3, 5],
    safetyLevel: 'critical',
  },
  {
    id: 'palp-exc-svt',
    type: 'result',
    module: 2,
    title: 'Supraventricular Tachycardia',
    body: 'Open [SVT](#/tree/svt) for the vagal / adenosine / disposition pathway.\n\n**A regular, narrow-complex tachycardia around 150-250 with abrupt onset and offset is paroxysmal SVT (AVNRT/AVRT).** [6]\n\n**Next 5 minutes:**\n- **Unstable \u2192 synchronized cardioversion.**\n- **Stable:** **vagal maneuvers first** \u2014 the modified Valsalva (with leg raise) is more effective than the standard maneuver. [9]\n- **Adenosine 6 mg rapid IV push** (large proximal vein, fast flush), then 12 mg if needed \u2014 warn the patient about the transient unpleasant pause. Adenosine also unmasks flutter/atrial tachycardia diagnostically.\n- If refractory: rate-controlling agents (diltiazem or beta-blocker) in the stable patient with good LV function.\n- **Caution:** if the rhythm is actually pre-excited AF or VT (irregular or wide), do NOT use adenosine/AV-nodal blockers as your default \u2014 re-check the width and regularity.\n- Correct triggers (caffeine, stimulants, thyroid, electrolytes).\n\n\ud83d\uded1 Confirm the rhythm is regular AND narrow before treating as SVT \u2014 irregular/wide changes the drug. \ud83d\uded1 Push adenosine fast with an immediate saline flush or it will not work.',
    recommendation: 'Vagal maneuvers (modified Valsalva) first, then adenosine 6 mg \u2192 12 mg rapid IV push. Cardiovert if unstable. Confirm regular + narrow before treating as SVT. Correct stimulant/thyroid/electrolyte triggers.',
    confidence: 'definitive',
    citation: [3, 6, 9, 12],
    safetyLevel: 'warning',
  },
  {
    id: 'palp-exc-torsades',
    type: 'result',
    module: 2,
    title: 'Torsades de Pointes / Long QT',
    body: 'Open [Torsades de Pointes](#/tree/torsades-de-pointes) for the full pathway.\n\n**Polymorphic VT in the setting of a prolonged QT is torsades de pointes.** It is driven by QT-prolonging drugs and electrolyte depletion (low K, low Mg, low Ca) and can degenerate into VF. [7]\n\n**Next 5 minutes:**\n- **Unstable / pulseless \u2192 defibrillate** (polymorphic VT is treated with unsynchronized shock; run [Cardiac Arrest](#/tree/cardiac-arrest)).\n- **IV magnesium sulfate 2 g** over minutes is the drug of choice, even if the serum magnesium is normal; repeat as needed.\n- **Correct potassium** (target high-normal) and calcium.\n- **Stop all QT-prolonging drugs.**\n- **Increase the heart rate** to shorten the QT and suppress pauses \u2014 overdrive pacing or an isoproterenol infusion for recurrent/pause-dependent torsades (acquired long QT).\n- Cardiology/EP consult; admit with continuous monitoring.\n- Distinguish acquired (drugs/electrolytes) from congenital long-QT syndromes (may need beta-blockade, avoid isoproterenol).\n\n\ud83d\uded1 Give magnesium even with a normal level. \ud83d\uded1 Avoid QT-prolonging antiarrhythmics here \u2014 they make it worse; pacing/isoproterenol is the pause-dependent strategy.',
    recommendation: 'IV magnesium 2 g (even if level normal), correct K/Ca, stop QT-prolonging drugs, and raise the rate (overdrive pacing or isoproterenol) for recurrent acquired torsades. Defibrillate if pulseless. EP consult + monitored admission.',
    confidence: 'definitive',
    citation: [3, 4, 7, 10],
    safetyLevel: 'critical',
  },
  {
    id: 'palp-exc-substrate',
    type: 'result',
    module: 2,
    title: 'Dangerous Baseline Substrate — Read the Resting ECG',
    body: 'Even when the palpitations have resolved, the resting 12-lead can reveal a substrate that is dangerous and changes management. [1,2,10,11]\n\n**Recognize and route:**\n- **WPW (short PR + delta wave):** risk of pre-excited AF and sudden death; **avoid AV-nodal blockers** if they ever go into AF; EP referral for risk stratification/ablation. (Acute pre-excited AF \u2192 procainamide/cardioversion, see the AF branch.)\n- **[Brugada Syndrome](#/tree/brugada-syndrome)** (coved ST elevation in V1-V2): risk of polymorphic VT/sudden death; avoid provoking drugs and fever; cardiology/EP referral.\n- **[Wellens Syndrome](#/tree/wellens-syndrome)** (biphasic/deeply inverted T waves in V2-V3 in a pain-free patient): critical proximal LAD stenosis \u2014 do NOT stress test; admit for urgent cardiology/angiography.\n- **Long QT** (congenital or acquired): torsades risk \u2014 see the torsades branch; review QT-prolonging drugs.\n- **Ischemic changes / prior MI:** substrate for VT \u2014 troponin, cardiology.\n\n**Next steps:**\n- Compare with old ECGs; obtain cardiology/EP input for these patterns.\n- Counsel on avoiding specific triggers/drugs per the substrate.\n- Do not discharge a Wellens or newly identified malignant substrate without the appropriate admission/referral.\n\n\ud83d\uded1 A delta wave changes your entire AF drug list. \ud83d\uded1 Wellens = pain-free but pre-infarction \u2014 admit, do not stress test.',
    recommendation: 'Read the resting ECG for WPW (avoid nodal blockers in AF), Brugada, Wellens (admit, no stress test), and long QT. Compare with old ECGs and get cardiology/EP input; counsel on substrate-specific trigger/drug avoidance.',
    confidence: 'recommended',
    citation: [2, 4, 5, 10, 11, 12],
    safetyLevel: 'warning',
  },
  {
    id: 'palp-exc-secondary',
    type: 'result',
    module: 2,
    title: 'Secondary Cause — Palpitations as a Symptom',
    body: 'Palpitations are often the visible tip of another problem. When the rhythm is sinus (or a rate-driven response), treat the driver rather than the heart rate. [1,2,8]\n\n**Route to the cause:**\n- **ACS / ischemia** \u2014 chest pain, diaphoresis, ischemic ECG: [STEMI](#/tree/stemi) or the ACS pathway; troponin, aspirin, cardiology.\n- **Pulmonary embolism** \u2014 dyspnea, pleuritic pain, VTE risk, sinus tachycardia/right strain: [PE Treatment](#/tree/pe-treatment).\n- **Thyrotoxicosis / thyroid storm** \u2014 tremor, heat intolerance, goiter, AF: [Thyroid Emergencies](#/tree/thyroid).\n- **Hypoglycemia** \u2014 adrenergic palpitations + low glucose: [Hypoglycemia](#/tree/hypoglycemia).\n- **Sepsis / fever**, **hemorrhage / anemia** (GI bleed), **dehydration** \u2014 compensatory sinus tachycardia; treat the cause, do not cardiovert.\n- **Stimulants / drugs / withdrawal / caffeine**, **electrolyte disturbance** (K, Mg, Ca) \u2014 correct and remove the trigger.\n- **Anxiety/panic** \u2014 a diagnosis of exclusion only after the dangerous causes are addressed and the ECG is reviewed.\n\n**Next steps:**\n- 12-lead ECG, glucose, CBC, electrolytes (K, Mg, Ca), TSH, troponin if ischemia possible, \u03b2-hCG in reproductive-age females; targeted PE workup if suspected.\n- Treat the identified cause; the palpitations usually follow.\n\n\ud83d\uded1 Do NOT rate-control or cardiovert a compensatory sinus tachycardia \u2014 find and treat the cause (bleeding, sepsis, PE, thyroid). \ud83d\uded1 Anxiety is a last-resort diagnosis, never the first.',
    recommendation: 'When the rhythm is sinus/rate-driven, treat the cause: ACS, PE, thyroid, hypoglycemia, sepsis, anemia/hemorrhage, drugs, electrolytes. Do not cardiovert compensatory sinus tachycardia. Anxiety is a diagnosis of exclusion.',
    confidence: 'recommended',
    citation: [1, 2, 8],
    safetyLevel: 'warning',
  },

  // ============================================================
  // Module 3 — Initial Bundle + Reassess
  // ============================================================
  {
    id: 'palp-rescue',
    type: 'info',
    module: 3,
    title: 'Initial Bundle — Palpitations, Currently Stable',
    body: 'No unstable arrhythmia and no dangerous ECG captured on arrival. Standard ED bundle while you characterize the episode and screen for a cause: [1,2,8]\n\n**THE BUNDLE:**\n- **12-lead ECG (and capture a rhythm strip during any recurrence)** \u2014 the single highest-yield test; scrutinize for pre-excitation (delta wave), Brugada, prolonged QT, Wellens, ischemia, and prior MI.\n- **Continuous cardiac monitoring** while in the ED to catch a recurrence.\n- **IV access** if any concern; keep pads available if the history is high-risk.\n- **Focused labs:** electrolytes (K, Mg, Ca), glucose, CBC (anemia), TSH, troponin if ischemia is possible, \u03b2-hCG in reproductive-age females; targeted tests for suspected PE/thyroid.\n- **History that risk-stratifies:** abrupt vs gradual onset/offset, regular vs irregular, associated syncope/near-syncope, chest pain, dyspnea; family history of sudden death or known channelopathy; medications/stimulants/caffeine/alcohol/drugs; structural heart disease.\n- **Red flags mandating a serious workup:** syncope with the palpitations, palpitations during exertion, family history of sudden cardiac death, known structural heart disease, or an abnormal ECG.\n\n**Reassess:** benign, resolved, normal ECG, no red flags vs a captured/again-symptomatic arrhythmia or a red-flag history requiring monitoring and cardiology.',
    citation: [1, 2, 8],
    next: 'palp-rescue-reassess',
    summary: '12-lead ECG + continuous monitoring + focused labs (K/Mg/Ca, glucose, CBC, TSH, troponin if indicated). Risk-stratify by history; red flags = syncope, exertional palpitations, family history of sudden death, structural disease, abnormal ECG.',
    safetyLevel: 'warning',
  },
  {
    id: 'palp-rescue-reassess',
    type: 'question',
    module: 3,
    title: 'Reassess — Rhythm and Red Flags',
    body: 'Re-examine: the ECG/monitor, whether an arrhythmia recurred, and the red-flag history.',
    options: [
      {
        label: 'Resolved, normal ECG, no red flags, benign history, low-risk',
        description: 'Discharge with outpatient workup + follow-up',
        next: 'palp-dispo-discharge',
      },
      {
        label: 'Red-flag history (syncope, exertional, family SCD) or abnormal ECG, no active arrhythmia',
        description: 'Monitoring + cardiology; observe/admit for workup',
        next: 'palp-workup',
        urgency: 'urgent',
      },
      {
        label: 'Arrhythmia recurs or dangerous rhythm captured',
        description: 'STOP \u2014 return to time-critical exclusions and treat the rhythm',
        next: 'palp-exclusions',
        urgency: 'critical',
      },
      {
        label: 'Secondary cause identified (thyroid, PE, anemia, ACS, hypoglycemia)',
        description: 'Leave the hub \u2014 work the deep-dive for that cause',
        next: 'palp-dispo',
      },
    ],
    citation: [1, 2],
    summary: 'Resolved + normal ECG + no red flags \u2192 discharge. Red flags/abnormal ECG \u2192 monitor + cardiology. Recurrent/dangerous rhythm \u2192 STOP, return to exclusions.',
  },

  // ============================================================
  // Module 4 — Workup / Monitoring Decision
  // ============================================================
  {
    id: 'palp-workup',
    type: 'info',
    module: 4,
    title: 'Workup & Monitoring Decision',
    body: 'The goal is to capture the rhythm during symptoms and identify structural or ischemic substrate. [1,2,8]\n\n**In the ED:**\n- **12-lead ECG** (repeat with any recurrence) + **continuous telemetry** while the patient is monitored.\n- **Labs:** electrolytes (K, Mg, Ca), glucose, CBC, TSH, troponin (if ischemia possible), \u03b2-hCG; PE/thyroid testing as indicated.\n- **Echocardiography** (structural heart disease, reduced EF, valvular cause) \u2014 inpatient or expedited outpatient depending on risk.\n\n**Ambulatory rhythm monitoring (outpatient, matched to episode frequency):**\n- **Daily episodes** \u2192 24-48 h Holter monitor.\n- **Weekly episodes** \u2192 event/patch monitor (1-4 weeks).\n- **Rare but concerning episodes** \u2192 external loop recorder or, for infrequent high-risk syncope, an implantable loop recorder (via cardiology).\n\n**Cardiology/EP referral for:** documented SVT/VT, pre-excitation (WPW), Brugada, long QT, suspected structural/ischemic substrate, exertional palpitations, syncope with palpitations, or family history of sudden cardiac death.\n\n**Provocative testing:** exercise stress testing for exertional palpitations/suspected exercise-induced arrhythmia (NOT for Wellens \u2014 that is admitted for angiography).\n\n**Admit for monitoring when:** the palpitations are associated with syncope, a documented dangerous arrhythmia, an abnormal ECG substrate, structural heart disease, or a high-risk clinical picture \u2014 rather than sending the capture home.',
    citation: [1, 2, 4, 8],
    next: 'palp-dispo',
    summary: 'ECG + telemetry + labs (\u00b1 echo). Match ambulatory monitoring to episode frequency (Holter for daily, event/patch for weekly, loop recorder for rare). Cardiology/EP for documented arrhythmia, pre-excitation, Brugada, long QT, exertional palpitations, or syncope. Stress test for exertional (not Wellens).',
  },

  // ============================================================
  // Module 5 — Disposition
  // ============================================================
  {
    id: 'palp-dispo',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Disposition is driven by risk features and whether a dangerous rhythm/substrate is present. Defer to the deep-dive consult once a diagnosis is committed.',
    options: [
      {
        label: 'Discharge \u2014 benign, resolved, normal ECG, no red flags, reliable',
        description: 'Outpatient monitoring + cardiology if indicated + return precautions',
        next: 'palp-dispo-discharge',
      },
      {
        label: 'Observe \u2014 recurrent SVT/AF controlled, workup pending, borderline risk',
        description: 'ED obs / monitored bed for telemetry + workup',
        next: 'palp-dispo-observe',
        urgency: 'urgent',
      },
      {
        label: 'Admit \u2014 dangerous rhythm/substrate, syncope, structural/ischemic cause',
        description: 'Monitored/ICU admission per the deep-dive criteria',
        next: 'palp-dispo-admit',
        urgency: 'critical',
      },
    ],
    citation: [1, 2],
    summary: 'Discharge benign/resolved/normal-ECG low-risk; observe recurrent-but-controlled or pending workup; admit dangerous rhythm/substrate, syncope, or structural/ischemic cause.',
  },
  {
    id: 'palp-dispo-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge — Benign, Resolved Palpitations',
    body: 'Safe discharge criteria: [1,2,8]\n\n1. **Currently asymptomatic** with a **normal 12-lead ECG** (no pre-excitation, Brugada, long QT, Wellens, ischemia, or prior MI).\n2. **No red flags** \u2014 no syncope with the episode, not exertional, no family history of sudden cardiac death, no known structural heart disease.\n3. **No dangerous arrhythmia** documented; normal or corrected electrolytes and glucose; no secondary cause needing admission.\n4. **Hemodynamically stable** throughout.\n5. **Reliable follow-up** and an outpatient monitoring plan matched to episode frequency (Holter/event/patch), with cardiology referral if any concern.\n\n**Discharge plan:**\n- Arrange ambulatory monitoring and cardiology follow-up as indicated.\n- Remove reversible triggers: caffeine, stimulants, alcohol, sympathomimetics, decongestants; treat thyroid or electrolyte issues.\n- Teach vagal maneuvers for recurrent documented SVT if applicable.\n\n**Written return precautions:**\n- Palpitations with chest pain, shortness of breath, fainting or near-fainting \u2014 call 911\n- Palpitations that do not stop, occur with exertion, or are associated with a rapid sustained rate\n- Any new weakness, confusion, or collapse\n\n**Do NOT discharge if:** syncope with palpitations, exertional palpitations, abnormal ECG/substrate, documented dangerous arrhythmia, structural or ischemic heart disease, family history of sudden death, or unreliable follow-up.',
    recommendation: 'Discharge only if asymptomatic with a normal ECG, no red flags, stable, cause benign/corrected, with ambulatory monitoring matched to frequency, cardiology referral if indicated, trigger avoidance, and clear return precautions.',
    confidence: 'definitive',
    citation: [1, 2, 8],
  },
  {
    id: 'palp-dispo-observe',
    type: 'result',
    module: 5,
    title: 'Observe — Recurrent/Controlled or Pending Workup',
    body: 'ED observation / monitored bed appropriate when: [1,2,5,6]\n\n- Recurrent SVT or AF that has been controlled/converted but warrants a period of telemetry\n- Rate-controlled AF needing observation of response and anticoagulation decision-making\n- Borderline-risk history (some concerning features) while labs/echo/monitoring are completed\n- A secondary cause being treated (e.g., electrolyte correction, thyroid workup) that needs a few hours of monitoring\n\n**Observation protocol:**\n- Continuous telemetry; capture any recurrence with a 12-lead\n- Complete labs (electrolytes, TSH, troponin if indicated) and expedite echo if needed\n- Cardiology input for rhythm-control/anticoagulation and follow-up\n- **Escalate to admission** for any dangerous rhythm, syncope, hemodynamic change, or a newly identified high-risk substrate\n\n**Discharge from observation** once the rhythm is stable/controlled, the workup is reassuring or safely deferred to arranged outpatient follow-up, and a monitoring/cardiology plan is in place.',
    recommendation: 'Observe with telemetry for controlled recurrent SVT/AF or pending workup; complete labs/echo and get cardiology input. Escalate to admission for any dangerous rhythm, syncope, or high-risk substrate.',
    confidence: 'recommended',
    citation: [1, 2, 5, 6],
  },
  {
    id: 'palp-dispo-admit',
    type: 'result',
    module: 5,
    title: 'Admit',
    body: 'Monitored / ICU admission for: [1,2,4,7,10,11]\n\n- **Documented dangerous arrhythmia** \u2014 VT ([Ventricular Tachycardia](#/tree/ventricular-tachycardia)), pre-excited AF, torsades ([Torsades de Pointes](#/tree/torsades-de-pointes)) \u2014 continuous monitoring, EP involvement.\n- **Malignant substrate** newly identified \u2014 [Wellens Syndrome](#/tree/wellens-syndrome) (urgent angiography), [Brugada Syndrome](#/tree/brugada-syndrome), symptomatic long QT/WPW per cardiology.\n- **Palpitations with syncope** \u2014 high risk for a serious arrhythmia; admit for monitoring and workup.\n- **Structural or ischemic cause** \u2014 ACS ([STEMI](#/tree/stemi)/ACS pathway), significant cardiomyopathy, reduced EF.\n- **Secondary cause requiring admission** \u2014 thyroid storm ([Thyroid Emergencies](#/tree/thyroid)), significant PE ([PE Treatment](#/tree/pe-treatment)), symptomatic anemia/hemorrhage.\n- **Hemodynamic instability** or recurrent arrhythmia not controlled in the ED.\n\n**Service selection:**\n- **Cardiology / EP** for documented arrhythmia, pre-excitation, channelopathy, ablation candidates.\n- **ICU / monitored bed** for unstable or malignant arrhythmias, torsades, or post-cardioversion instability.\n- **Medicine** co-management for secondary systemic causes.\n\n**Handoff content:** the captured rhythm (with strips/12-leads), stability, treatments given (drugs, cardioversion energy, magnesium), electrolytes and correction, ECG substrate (delta wave, QT, Brugada, Wellens), suspected trigger/secondary cause, and the monitoring/EP plan.',
    recommendation: 'Admit documented dangerous arrhythmia, malignant substrate, palpitations with syncope, structural/ischemic cause, or a secondary cause requiring inpatient care. Cardiology/EP for rhythm substrate; ICU for instability/torsades.',
    confidence: 'recommended',
    citation: [1, 2, 4, 7, 10, 11],
    safetyLevel: 'warning',
  },
];

export const PALPITATIONS_HUB_CRITICAL_ACTIONS = [
  { text: 'Get a 12-lead ECG while symptomatic and sort stable vs unstable first \u2014 unstable + tachyarrhythmia = synchronized cardioversion NOW.', nodeId: 'palp-start' },
  { text: 'Confirm the arrhythmia (not compensatory sinus tach) is causing instability before cardioverting; defibrillate if pulseless/polymorphic.', nodeId: 'palp-exc-unstable' },
  { text: 'Regular wide-complex tachycardia = VT until proven otherwise \u2014 procainamide/amiodarone or cardioversion; NEVER AV-nodal blockers.', nodeId: 'palp-exc-wct' },
  { text: 'Pre-excited AF (wide, irregular, very fast) \u2192 procainamide or cardioversion, NEVER adenosine/CCB/beta-blocker/digoxin.', nodeId: 'palp-exc-af' },
  { text: 'Regular narrow SVT \u2192 modified Valsalva then adenosine 6\u219212 mg rapid IV push; confirm regular + narrow first.', nodeId: 'palp-exc-svt' },
  { text: 'Polymorphic VT / long QT = torsades \u2192 IV magnesium 2 g (even if level normal), correct K/Ca, stop QT drugs, raise the rate; defibrillate if pulseless.', nodeId: 'palp-exc-torsades' },
  { text: 'Read the resting ECG for WPW (avoid nodal blockers in AF), Brugada, Wellens (admit, no stress test), and long QT.', nodeId: 'palp-exc-substrate' },
  { text: 'Do NOT cardiovert a compensatory sinus tachycardia \u2014 treat the cause (ACS, PE, thyroid, sepsis, anemia, hypoglycemia). Anxiety is a diagnosis of exclusion.', nodeId: 'palp-exc-secondary' },
  { text: 'Initial bundle: 12-lead + continuous monitoring + labs (K/Mg/Ca, glucose, CBC, TSH, troponin if indicated). Red flags = syncope, exertional, family SCD, structural disease, abnormal ECG.', nodeId: 'palp-rescue' },
  { text: 'Match ambulatory monitoring to episode frequency (Holter daily, event/patch weekly, loop recorder rare); cardiology/EP for documented arrhythmia or dangerous substrate.', nodeId: 'palp-workup' },
  { text: 'Discharge only if asymptomatic with a normal ECG, no red flags, stable, with monitoring and follow-up arranged.', nodeId: 'palp-dispo-discharge' },
  { text: 'Admit documented dangerous arrhythmia, malignant substrate, palpitations with syncope, or structural/ischemic cause \u2014 monitored/ICU with cardiology/EP.', nodeId: 'palp-dispo-admit' },
];

export const PALPITATIONS_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Raviele A, Giada F, Bergfeldt L, et al. Management of patients with palpitations: a position paper from the European Heart Rhythm Association. Europace. 2011;13(7):920-934. PMID: 21697315. doi:10.1093/europace/eur130 (Verified 2026-07-29 as the current EHRA position paper on palpitations; not superseded.)' },
  { num: 2, text: 'Wexler RK, Pleister A, Raman SV. Palpitations: Evaluation in the Primary Care Setting. Am Fam Physician. 2017;96(12):784-789. PMID: 29431371. NOTE: narrative review, not a society guideline \u2014 used for the general evaluation framework only. Every arrhythmia-specific and disposition recommendation in this consult is independently supported by the society guidelines cited below.' },
  { num: 3, text: 'Wigginton JG, Agarwal S, Bartos JA, et al. Part 9: Adult Advanced Life Support: 2025 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation. 2025;152(16_suppl_2):S538-S577. PMID: 41122884. doi:10.1161/CIR.0000000000001376 (Supersedes Panchal AR et al. Part 3: Adult Basic and Advanced Life Support. Circulation. 2020;142(16 Suppl 2):S366-S468.)' },
  { num: 4, text: 'Al-Khatib SM, Stevenson WG, Ackerman MJ, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias and the Prevention of Sudden Cardiac Death. Circulation. 2018;138(13):e272-e391. PMID: 29084731. doi:10.1161/CIR.0000000000000549 (Verified 2026-07-29 as the current US ventricular-arrhythmia guideline; see ref 10 for the 2022 ESC counterpart.)' },
  { num: 5, text: 'Joglar JA, Chung MK, Armbruster AL, et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation: A Report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2024;149(1):e1-e156. PMID: 38033089. doi:10.1161/CIR.0000000000001193 (Supersedes January CT et al. 2019 AHA/ACC/HRS Focused Update. Circulation. 2019;140(2):e125-e151.)' },
  { num: 6, text: 'Page RL, Joglar JA, Caldwell MA, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia. Circulation. 2016;133(14):e506-e574. PMID: 26399663. doi:10.1161/CIR.0000000000000311 (Verified 2026-07-29 as the current US SVT guideline; see ref 12 for the 2019 ESC counterpart.)' },
  { num: 7, text: 'Drew BJ, Ackerman MJ, Funk M, et al. Prevention of torsade de pointes in hospital settings: a scientific statement from the American Heart Association and the American College of Cardiology Foundation. Circulation. 2010;121(8):1047-1060. PMID: 20142454. doi:10.1161/CIRCULATIONAHA.109.192704 (Verified 2026-07-29 as the operative AHA/ACCF statement on torsade prevention; not superseded.)' },
  { num: 8, text: 'Gauer RL, Thomas MF, McNutt RA. Palpitations: Evaluation, Management, and Wearable Smart Devices. Am Fam Physician. 2024;110(3):259-269. PMID: 39283849. (Supersedes Abbott AV. Diagnostic approach to palpitations. Am Fam Physician. 2005;71(4):743-750. PMID: 15742913.)' },
  { num: 9, text: 'Appelboam A, Reuben A, Mann C, et al. Postural modification to the standard Valsalva manoeuvre for emergency treatment of supraventricular tachycardias (REVERT): a randomised controlled trial. Lancet. 2015;386(10005):1747-1753. PMID: 26314489. doi:10.1016/S0140-6736(15)61485-4 (Randomised trial basis for the modified Valsalva with leg raise.)' },
  { num: 10, text: 'Zeppenfeld K, Tfelt-Hansen J, de Riva M, et al. 2022 ESC Guidelines for the management of patients with ventricular arrhythmias and the prevention of sudden cardiac death. Eur Heart J. 2022;43(40):3997-4126. PMID: 36017572. doi:10.1093/eurheartj/ehac262 (Basis for the wide-complex tachycardia and Brugada/long-QT substrate recommendations.)' },
  { num: 11, text: 'de Zwaan C, B\u00E4r FW, Wellens HJ. Characteristic electrocardiographic pattern indicating a critical stenosis high in left anterior descending coronary artery in patients admitted because of impending myocardial infarction. Am Heart J. 1982;103(4 Pt 2):730-736. PMID: 6121481. (Original description of the Wellens ECG pattern.)' },
  { num: 12, text: 'Brugada J, Katritsis DG, Arbelo E, et al. 2019 ESC Guidelines for the management of patients with supraventricular tachycardia. Eur Heart J. 2020;41(5):655-720. PMID: 31504425. doi:10.1093/eurheartj/ehz467' },
];

export const PALPITATIONS_HUB_NODE_COUNT = PALPITATIONS_HUB_NODES.length;
export const PALPITATIONS_HUB_MODULE_LABELS = [
  'Sick Check',
  'Time-Critical Exclusions',
  'Initial Bundle + Reassess',
  'Workup & Monitoring',
  'Disposition',
];
