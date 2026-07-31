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
// All outbound tree-route links validated against the repo on 2026-07-30 (16 targets, all present
// in src/data/trees/ AND registered in src/services/tree-service.ts). No info-page overlays exist
// for this hub yet, so no overlay links are present -- author the overlays in src/data/info-pages.ts
// BEFORE linking to them, or the links will be dead.
//
// Medical audit: Dr. Kitlowski 2026-07-30 -- see
// ~/Desktop/claude-brain/wikis/emergency-medicine/wiki/consults/palpitations-hub.md

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
    body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Unstable tachyarrhythmia** \u2014 hypotension, chest pain, dyspnea, altered mentation, shock = synchronized cardioversion NOW, do not wait.\n2. **Wide-complex tachycardia = VT until proven otherwise** \u2014 do NOT treat as SVT with a nodal blocker.\n3. **The malignant substrates** \u2014 WPW/pre-excited AF, Brugada, long-QT/Torsades, **short QT, HCM, ARVC, CPVT**, Wellens \u2014 a resting or captured ECG saves lives (CPVT and some LQTS have a *normal* resting ECG, so history carries the weight there). [4,10]\n4. **Palpitations as a symptom of a bigger problem** \u2014 ACS, PE, hypoglycemia, thyroid storm, sepsis, GI bleed/anemia, drug/electrolyte effect.\n5. **Syncope with palpitations** \u2014 a red flag for a serious arrhythmia; do not discharge as \u201canxiety.\u201d\n\n**The single most important action: get a 12-lead ECG (and a rhythm strip) while the patient is symptomatic if at all possible.** The whole workup pivots on capturing the rhythm. [1,2]\n\n**Scan in 30 seconds \u2014 stable or unstable?** [1]\n- **Unstable signs** (any of): hypotension/shock, ischemic chest pain, acute heart failure/pulmonary edema, altered mentation. \u2192 If a tachyarrhythmia is present and causing this, prepare for **synchronized cardioversion** immediately.\n- **Rate & rhythm** \u2014 regular vs irregular, narrow vs wide complex, rate.\n- **Vitals** \u2014 BP, SpO2, temperature (sepsis/thyroid), glucose.\n- **Appearance** \u2014 pallor (anemia/GI bleed), tremor/goiter (thyroid), diaphoresis (ACS).\n\n**The 4 questions that change the differential:** [1,2]\n1. **Are you stable?** (unstable + tachyarrhythmia \u2192 cardioversion now)\n2. **Is the QRS wide or narrow, regular or irregular?** (drives the arrhythmia branch \u2014 wide = VT until proven otherwise)\n3. **Chest pain, dyspnea, or syncope with it?** (ACS, PE, or a dangerous arrhythmia)\n4. **Any triggers/systemic cause?** (thyroid, stimulants/drugs, fever/sepsis, bleeding/anemia, hypoglycemia, electrolytes)',
    citation: [1, 2, 4, 10],
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
    body: 'An unstable patient (hypotension, ischemic chest pain, acute heart failure, or altered mentation) whose picture is driven by a tachyarrhythmia needs **immediate synchronized cardioversion** \u2014 do not delay for a drug trial. [3]\n\n**Next 5 minutes:**\n- Confirm the instability is caused by the rhythm (not a fast sinus rate compensating for shock/sepsis/hemorrhage \u2014 cardioverting sinus tachycardia is useless and harmful; treat the underlying cause instead).\n- **Synchronized cardioversion:** sedate/analgese if time permits; energy per device/rhythm (e.g., narrow regular ~50-100 J, narrow irregular/AF ~120-200 J biphasic, wide regular ~100 J \u2014 follow ACLS).\n\n\u26A0\uFE0F **Energy guidance changed in 2025 \u2014 read this before you dial a number.** The **2025 AHA ALS guideline no longer publishes a fixed joule ladder**. It directs you to **the energy setting recommended by your specific defibrillator, and if that is not known, to use the maximum energy setting** to maximize first-shock success. The stepwise numbers above are the legacy 2020 ACLS values, retained here for familiarity. [3]\n- **For AF specifically: an initial shock of at least 200 J biphasic is reasonable** (2025 AHA, COR 2b, LOE C-LD; \u2265200 J achieved >90% cumulative success across all three US biphasic platforms in a network meta-analysis of >3000 patients). **200 J initial may also be reasonable for atrial flutter.** The [Atrial Fibrillation with RVR](#/tree/afib-rvr) consult uses 200 J biphasic and escalates \u2014 prefer that over the low end of the legacy 120-200 J range. [3,5]\n- If the rhythm is polymorphic/pulseless VT or degenerates to VF \u2192 defibrillate (unsynchronized) and run [Cardiac Arrest](#/tree/cardiac-arrest) / [Refractory VF/VT](#/tree/refractory-vfvt).\n- IV \u00d7 2, monitor, pads on, airway kit, correct K/Mg, treat reversible causes.\n- After stabilization, capture a 12-lead and route to the specific rhythm consult.\n\n\ud83d\uded1 Do NOT cardiovert a compensatory sinus tachycardia \u2014 confirm the arrhythmia is the cause of instability. \ud83d\uded1 Unstable = electricity first, not a prolonged drug trial.',
    recommendation: 'Confirm the arrhythmia is causing the instability (not compensatory sinus tach), then immediate synchronized cardioversion (defibrillate if pulseless/polymorphic). IV access, correct K/Mg, treat reversible causes.',
    confidence: 'definitive',
    citation: [3, 5],
    safetyLevel: 'critical',
  },
  {
    id: 'palp-exc-wct',
    type: 'result',
    module: 2,
    title: 'Wide-Complex Tachycardia — VT Until Proven Otherwise',
    body: 'Open [Wide-Complex Tachycardia](#/tree/wide-complex-tachycardia) for the diagnostic approach and [Ventricular Tachycardia](#/tree/ventricular-tachycardia) for management.\n\n**Any regular wide-complex tachycardia (QRS \u2265120 ms) is ventricular tachycardia until proven otherwise \u2014 especially with structural heart disease or prior MI.** Treating VT as \u201cSVT with aberrancy\u201d by giving an AV-nodal blocker (verapamil/diltiazem/adenosine as therapy) can precipitate hemodynamic collapse. [4,10]\n\n**Next 5 minutes:**\n- **Unstable \u2192 synchronized cardioversion** (see the unstable branch).\n- **Stable, regular monomorphic WCT:** antiarrhythmic \u2014 procainamide (often preferred) or amiodarone; call cardiology; prepare for cardioversion if it fails. **Doses per the deep-dive:** procainamide **20-50 mg/min IV** (or 10 mg/kg over 20 min; max 17 mg/kg) \u2014 **stop the infusion if the QRS widens >50%, hypotension develops, or the rhythm terminates**; amiodarone **150 mg IV over 10 min**, then 1 mg/min \u00d7 6 h \u2192 0.5 mg/min \u00d7 18 h. Procainamide outperformed amiodarone in the **PROCAMIO** RCT (67% vs 38% termination; 9% vs 41% major adverse events). [17]\n- **Avoid AV-nodal blocking agents** for undifferentiated WCT (dangerous if it is VT or pre-excited AF). Per the 2025 AHA ALS guideline, adenosine may be used in a wide-complex tachycardia **only if the rhythm is both regular AND monomorphic** \u2014 never for an irregular or polymorphic WCT. [3]\n- \u26A0\uFE0F **Do not let an ECG algorithm talk you out of VT.** The Brugada and Vereckei criteria look authoritative but degrade badly outside the derivation lab. In a blinded study of 157 EP-proven WCT tracings, **board-certified emergency physicians achieved only 79-83% sensitivity and 43-70% specificity** with the Brugada algorithm (cardiologists 85-91% / 55-60%) \u2014 nowhere near the 98.7%/96.5% originally reported. Specificity falling to ~43% means frequent false \u201cSVT\u201d calls on true VT. **A negative algorithm does not exclude VT.** [18]\n- IV \u00d7 2, monitor, pads on, correct electrolytes (K, Mg).\n- Look for the substrate: prior MI, cardiomyopathy, channelopathy; get old ECGs.\n- **Polymorphic** wide-complex \u2192 think Torsades / ischemia (see Torsades branch and [STEMI](#/tree/stemi) if ischemic).\n\n\ud83d\uded1 Do NOT give calcium-channel blockers or adenosine as therapy for undifferentiated WCT. \ud83d\uded1 When in doubt, treat a wide-complex tachycardia as VT.',
    recommendation: 'Treat regular WCT as VT: unstable \u2192 cardiovert; stable \u2192 procainamide 20-50 mg/min (stop if QRS widens >50%) or amiodarone 150 mg over 10 min + cardiology. Avoid AV-nodal blockers; adenosine only if regular AND monomorphic. Correct K/Mg. A negative Brugada/Vereckei algorithm does not exclude VT.',
    confidence: 'definitive',
    citation: [3, 4, 10, 17, 18],
    safetyLevel: 'critical',
  },
  {
    id: 'palp-exc-af',
    type: 'result',
    module: 2,
    title: 'Atrial Fibrillation / Flutter (incl. Pre-Excited AF)',
    body: 'Open [Atrial Fibrillation with RVR](#/tree/afib-rvr) for the rate/rhythm-control, anticoagulation, and disposition pathway.\n\n**Irregularly irregular tachycardia = AF (or atrial flutter with variable block).** Key ED tasks: control the rate/rhythm, decide on anticoagulation, and detect the dangerous variant. [5]\n\n**Next 5 minutes:**\n- **Unstable \u2192 synchronized cardioversion.**\n- **Stable AF with RVR:** rate control with a beta-blocker or a non-dihydropyridine calcium-channel blocker (diltiazem) \u2014 choose per LV function (avoid CCB in reduced EF; consider amiodarone/digoxin in heart failure).\n- **Pre-excited AF (WPW): irregular, wide, and often very fast (>200) with varying QRS morphology.** **Do NOT give AV-nodal blockers (adenosine, diltiazem, verapamil, digoxin, beta-blockers)** \u2014 they can accelerate conduction down the accessory pathway and precipitate VF. Use **procainamide** (or synchronized cardioversion, especially if unstable); **ibutilide** is an accepted alternative. [5,6]\n- Assess stroke risk (CHA2DS2-VASc) and bleeding risk; decide on anticoagulation and the rate-vs-rhythm and cardioversion-timing questions per the AF consult. The legacy teaching splits at 48 h of symptom duration \u2014 **but read the next paragraph before you rely on that number, because current guidelines no longer do.**\n\n\u26A0\uFE0F **The \u201c48-hour safe window\u201d is obsolete \u2014 do not treat <48 h as a free pass to cardiovert without anticoagulation.** The 2023 ACC/AHA/ACCP/HRS guideline narrowed it sharply: DCCV **without** preceding TEE or anticoagulation is only a **Class 2b** (weak) recommendation, and only in patients with **CHA2DS2-VASc 0-1 AND symptom duration <12 h**. The 2024 ESC/EACTS guideline independently cut the threshold from 48 h to **24 h**. Outside those narrow windows, address thromboembolic risk (anticoagulation and/or TEE) before elective cardioversion. Unstable patients are still cardioverted immediately, with anticoagulation started as soon as feasible. [5,16]\n- **Anticoagulation threshold:** CHA2DS2-VASc **\u22652 in men / \u22653 in women** (\u2248 \u22652%/yr thromboembolic risk) \u2192 anticoagulate; 1 in men / 2 in women (\u22481-2%/yr) \u2192 reasonable, shared decision. The 2023 guideline **de-emphasizes CHA2DS2-VASc as the sole tool** and accepts other validated scores (e.g. ATRIA, GARFIELD-AF); it also replaced the old paroxysmal/persistent labels with **stages of AF (1 at-risk \u2192 4 permanent)**. [5]\n- Look for triggers: sepsis, PE, thyroid, ischemia, alcohol, electrolytes.\n\n\ud83d\uded1 Wide + irregular + very fast = pre-excited AF \u2014 procainamide or cardioversion, NEVER an AV-nodal blocker. \ud83d\uded1 Do not cardiovert AF of unknown/\u226548 h duration without addressing thromboembolic risk unless the patient is unstable \u2014 and note that under the 2023 ACC/AHA and 2024 ESC guidelines the unanticoagulated window is far narrower than 48 h (Class 2b, CHA2DS2-VASc 0-1, <12 h; ESC 24 h).',
    recommendation: 'Rate/rhythm control per LV function; anticoagulate at CHA2DS2-VASc \u22652 men / \u22653 women. The 48-h window is obsolete \u2014 unanticoagulated DCCV without TEE is Class 2b and only at CHA2DS2-VASc 0-1 with <12 h of symptoms. Pre-excited AF (wide, irregular, fast) \u2192 procainamide or ibutilide or cardioversion, NEVER AV-nodal blockers. Hunt triggers (sepsis, PE, thyroid).',
    confidence: 'definitive',
    citation: [3, 5, 6, 16],
    safetyLevel: 'critical',
  },
  {
    id: 'palp-exc-svt',
    type: 'result',
    module: 2,
    title: 'Supraventricular Tachycardia',
    body: 'Open [SVT](#/tree/svt) for the vagal / adenosine / disposition pathway.\n\n**A regular, narrow-complex tachycardia around 150-250 with abrupt onset and offset is paroxysmal SVT (AVNRT/AVRT).** [6]\n\n**Next 5 minutes:**\n- **Unstable \u2192 synchronized cardioversion.**\n- **Stable:** **vagal maneuvers first** \u2014 the modified Valsalva (with leg raise) is more effective than the standard maneuver: **43% vs 17% conversion in the REVERT RCT (NNT \u2248 4)**. A standard Valsalva terminates only 20-30% of these rhythms; modified techniques reach up to ~50%. [3,9]\n- **Adenosine 6 mg rapid IV push** (large proximal vein, fast flush), then 12 mg if needed \u2014 warn the patient about the transient unpleasant pause. Adenosine also unmasks flutter/atrial tachycardia diagnostically. [3,6]\n- **Adenosine dose adjustments and cautions (easy to miss):**\n  - **Reduce the first dose to 3 mg** if giving via a **central line**, in a **heart-transplant / denervated heart** (supersensitive \u2014 threefold to sixfold exaggerated nodal response; prolonged asystole reported at 6 mg), or on **dipyridamole or carbamazepine** (both potentiate adenosine). [6,12,21,22]\n  - **Bronchospasm:** adenosine can provoke **severe bronchospasm** and is contraindicated/avoided in **active or severe bronchospastic disease** \u2014 in that patient prefer **diltiazem or verapamil** (or cardioversion if unstable). Distinguish true bronchospasm from the transient dyspnea ~28% of patients report. [3,6]\n  - **Have pads on and a defibrillator ready** \u2014 transient sinus arrest/AV block is expected, and adenosine can rarely precipitate AF/VF.\n- If refractory: rate-controlling agents (diltiazem or beta-blocker) in the stable patient with good LV function.\n- **Caution:** if the rhythm is actually pre-excited AF or VT (irregular or wide), do NOT use adenosine/AV-nodal blockers as your default \u2014 re-check the width and regularity.\n- Correct triggers (caffeine, stimulants, thyroid, electrolytes).\n\n\ud83d\uded1 Confirm the rhythm is regular AND narrow before treating as SVT \u2014 irregular/wide changes the drug. \ud83d\uded1 Push adenosine fast with an immediate saline flush or it will not work.',
    recommendation: 'Vagal maneuvers (modified Valsalva, 43% vs 17%) first, then adenosine 6 mg \u2192 12 mg rapid IV push. Reduce the first dose to 3 mg for central-line delivery, transplanted heart, or dipyridamole/carbamazepine; avoid in active bronchospasm (use diltiazem/verapamil instead). Cardiovert if unstable. Confirm regular + narrow before treating as SVT.',
    confidence: 'definitive',
    citation: [3, 6, 9, 12, 21, 22],
    safetyLevel: 'warning',
  },
  {
    id: 'palp-exc-torsades',
    type: 'result',
    module: 2,
    title: 'Torsades de Pointes / Long QT',
    body: 'Open [Torsades de Pointes](#/tree/torsades-de-pointes) for the full pathway.\n\n**Polymorphic VT in the setting of a prolonged QT is torsades de pointes.** It is driven by QT-prolonging drugs and electrolyte depletion (low K, low Mg, low Ca) and can degenerate into VF. [7]\n\n**Put a number on the QT.** The AHA/ACCF action thresholds are a **QTc >500 ms**, or a **rise of \u226560 ms from the pre-drug baseline** \u2014 either one demands prompt action (stop/substitute the offending drug, correct electrolytes, defibrillator at the bedside, no off-unit transport). QTc >500 ms carries a **2- to 3-fold** higher torsades risk, and risk climbs continuously (~5-7% per additional 10 ms) rather than switching on at a cutoff. Look for the classic **short-long-short** initiating sequence and QT-U deformity. Beware Bazett over-correction at rates >85 bpm. [7]\n\n**Next 5 minutes:**\n- **Unstable / pulseless \u2192 defibrillate** (polymorphic VT is treated with unsynchronized shock; run [Cardiac Arrest](#/tree/cardiac-arrest)).\n- **IV magnesium sulfate 2 g** over minutes is the drug of choice, even if the serum magnesium is normal; repeat as needed.\n- **Correct potassium** (target high-normal) and calcium.\n- **Stop all QT-prolonging drugs.**\n- **Increase the heart rate** to shorten the QT and suppress pauses \u2014 overdrive pacing or an isoproterenol infusion for recurrent/pause-dependent torsades (acquired long QT). **Put numbers on it:** overdrive pacing at **90-110 bpm**, or **isoproterenol 1-10 mcg/min titrated to a heart rate of 90-110** \u2014 the endpoint is the *rate*, not the drug dose. Correct **potassium to >4.5 mEq/L** while you do it. Both are bridges until the offending drug clears. [4,7]\n- Cardiology/EP consult; admit with continuous monitoring.\n- Distinguish acquired (drugs/electrolytes) from congenital long-QT syndromes (may need beta-blockade, avoid isoproterenol).\n\n\ud83d\uded1 Give magnesium even with a normal level. \ud83d\uded1 Avoid QT-prolonging antiarrhythmics here \u2014 they make it worse; pacing/isoproterenol is the pause-dependent strategy.',
    recommendation: 'Act at a QTc >500 ms or a \u226560 ms rise from baseline. IV magnesium 2 g (even if level normal), correct K to >4.5 mEq/L and Ca, stop QT-prolonging drugs, and raise the rate to 90-110 bpm (overdrive pacing, or isoproterenol 1-10 mcg/min titrated to rate) for recurrent acquired torsades. Defibrillate if pulseless. EP consult + monitored admission.',
    confidence: 'definitive',
    citation: [3, 4, 7, 10],
    safetyLevel: 'critical',
  },
  {
    id: 'palp-exc-substrate',
    type: 'result',
    module: 2,
    title: 'Dangerous Baseline Substrate — Read the Resting ECG',
    body: 'Even when the palpitations have resolved, the resting 12-lead can reveal a substrate that is dangerous and changes management. [1,2,10,11]\n\n**Recognize and route:**\n- **WPW (short PR + delta wave):** risk of pre-excited AF and sudden death; **avoid AV-nodal blockers** if they ever go into AF; EP referral for risk stratification/ablation. (Acute pre-excited AF \u2192 procainamide/cardioversion, see the AF branch.)\n- **[Brugada Syndrome](#/tree/brugada-syndrome)** (coved ST elevation in V1-V2): risk of polymorphic VT/sudden death; avoid provoking drugs and fever; cardiology/EP referral.\n- **[Wellens Syndrome](#/tree/wellens-syndrome)** (biphasic/deeply inverted T waves in V2-V3 in a pain-free patient): critical proximal LAD stenosis \u2014 do NOT stress test; admit for urgent cardiology/angiography.\n- **Long QT** (congenital or acquired): torsades risk \u2014 see the torsades branch; review QT-prolonging drugs. Act at **QTc >500 ms** or a **\u226560 ms rise from baseline**.\n- **Short QT** (QTc \u2264340-360 ms with tall peaked T waves, no ST segment): rare but a genuine sudden-death channelopathy \u2014 EP referral, do not dismiss a \u201cshort\u201d QT as normal.\n- **HCM** (LVH with deep narrow \u201cdagger\u201d lateral/inferior Q waves, giant T inversions in the apical variant): exertional palpitations/syncope with a systolic murmur that *increases* on Valsalva \u2014 echo, EP/cardiology, exercise restriction pending evaluation.\n- **ARVC** (T-wave inversion in V1-V3 with an epsilon wave or delayed S upstroke): exercise-triggered palpitations/VT in a young patient \u2014 cardiac MRI, EP referral.\n- **CPVT:** exertional or emotion-triggered palpitations and syncope with a **completely normal resting ECG** \u2014 the diagnosis lives in the history and exercise testing, not the 12-lead. Do not clear an exertional syncope/palpitation story on a normal ECG alone.\n- **Ischemic changes / prior MI:** substrate for VT \u2014 troponin, cardiology.\n\n**Next steps:**\n- Compare with old ECGs; obtain cardiology/EP input for these patterns.\n- Counsel on avoiding specific triggers/drugs per the substrate.\n- Do not discharge a Wellens or newly identified malignant substrate without the appropriate admission/referral.\n\n\ud83d\uded1 A delta wave changes your entire AF drug list. \ud83d\uded1 Wellens = pain-free but pre-infarction \u2014 admit, do not stress test. \ud83d\uded1 A normal resting ECG does not exclude CPVT or every long-QT genotype \u2014 an exertional syncope/palpitation history outranks a clean 12-lead.',
    recommendation: 'Read the resting ECG for WPW (avoid nodal blockers in AF), Brugada, Wellens (admit, no stress test), long QT (>500 ms), short QT, HCM, and ARVC. Compare with old ECGs and get cardiology/EP input; counsel on substrate-specific trigger/drug avoidance. A normal ECG does not exclude CPVT or all LQTS genotypes \u2014 refer on the exertional history alone.',
    confidence: 'recommended',
    citation: [2, 4, 5, 10, 11, 12],
    safetyLevel: 'warning',
  },
  {
    id: 'palp-exc-secondary',
    type: 'result',
    module: 2,
    title: 'Secondary Cause — Palpitations as a Symptom',
    body: 'Palpitations are often the visible tip of another problem. When the rhythm is sinus (or a rate-driven response), treat the driver rather than the heart rate. [1,2,8]\n\n**Route to the cause:**\n- **ACS / ischemia** \u2014 chest pain, diaphoresis, ischemic ECG: [STEMI](#/tree/stemi), [NSTEMI/NSTE-ACS](#/tree/nstemi), or the [Chest Pain](#/tree/chest-pain-hub) hub; troponin, aspirin, cardiology.\n- **Syncope with the palpitations** \u2014 this is an arrhythmic-syncope story until proven otherwise: run [Syncope](#/tree/syncope) and risk-stratify with the **Canadian Syncope Risk Score**, the best-validated ED tool. [13,14,15]\n- **Pulmonary embolism** \u2014 dyspnea, pleuritic pain, VTE risk, sinus tachycardia/right strain: [PE Treatment](#/tree/pe-treatment). PE can present with **palpitations or new-onset AF as the dominant complaint**, and the ECG may show only sinus tachycardia \u2014 do not let a \u201cjust palpitations\u201d framing stop you from asking the PE question in a dyspneic or hypoxic patient.\n- **Thyrotoxicosis / thyroid storm** \u2014 tremor, heat intolerance, goiter, AF: [Thyroid Emergencies](#/tree/thyroid).\n- **Hypoglycemia** \u2014 adrenergic palpitations + low glucose: [Hypoglycemia](#/tree/hypoglycemia).\n- **Sepsis / fever**, **hemorrhage / anemia** (GI bleed), **dehydration** \u2014 compensatory sinus tachycardia; treat the cause, do not cardiovert.\n- **Stimulants / drugs / withdrawal / caffeine**, **electrolyte disturbance** (K, Mg, Ca) \u2014 correct and remove the trigger.\n- **Anxiety/panic** \u2014 a diagnosis of exclusion only after the dangerous causes are addressed and the ECG is reviewed.\n\n**Next steps:**\n- 12-lead ECG, glucose, CBC, electrolytes (K, Mg, Ca), TSH, troponin if ischemia possible, \u03b2-hCG in reproductive-age females; targeted PE workup if suspected.\n- Treat the identified cause; the palpitations usually follow.\n\n\ud83d\uded1 Do NOT rate-control or cardiovert a compensatory sinus tachycardia \u2014 find and treat the cause (bleeding, sepsis, PE, thyroid). \ud83d\uded1 Anxiety is a last-resort diagnosis, never the first.',
    recommendation: 'When the rhythm is sinus/rate-driven, treat the cause: ACS, PE, thyroid, hypoglycemia, sepsis, anemia/hemorrhage, drugs, electrolytes. Palpitations plus syncope routes to the Syncope pathway (Canadian Syncope Risk Score), not to reassurance. Do not cardiovert compensatory sinus tachycardia. Anxiety is a diagnosis of exclusion.',
    confidence: 'recommended',
    citation: [1, 2, 8, 13, 14, 15],
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
    body: 'No unstable arrhythmia and no dangerous ECG captured on arrival. Standard ED bundle while you characterize the episode and screen for a cause: [1,2,8]\n\n**THE BUNDLE:**\n- **12-lead ECG (and capture a rhythm strip during any recurrence)** \u2014 the single highest-yield test; scrutinize for pre-excitation (delta wave), Brugada, prolonged QT, Wellens, ischemia, and prior MI.\n- **Continuous cardiac monitoring** while in the ED to catch a recurrence.\n- **IV access** if any concern; keep pads available if the history is high-risk.\n- **Focused labs:** electrolytes (K, Mg, Ca), glucose, CBC (anemia), TSH, troponin if ischemia is possible, \u03b2-hCG in reproductive-age females; targeted tests for suspected PE/thyroid.\n- **History that risk-stratifies:** abrupt vs gradual onset/offset, regular vs irregular, associated syncope/near-syncope, chest pain, dyspnea; family history of sudden death or known channelopathy; medications/stimulants/caffeine/alcohol/drugs; structural heart disease.\n- **Red flags mandating a serious workup:** syncope with the palpitations, palpitations during exertion, **family history of sudden cardiac death in a first-degree relative under 40-50 years** (an unexplained drowning, single-vehicle crash, or \u201cmassive heart attack\u201d in a young relative counts), known structural heart disease, or an abnormal ECG.\n- **If there was true syncope, stop treating this as isolated palpitations.** Run the [Syncope](#/tree/syncope) pathway and score it: the **Canadian Syncope Risk Score** (\u22123 to +11) is the best-validated ED tool \u2014 derived in 4030 patients and prospectively validated in 3819 across 9 Canadian EDs (AUC 0.91). 30-day serious-outcome rates: **very low (\u22123 to \u22122) 0.3%, low (\u22121 to 0) 0.7%, medium (1-3) 8%, high (4-5) ~20%, very high (6-11) 51%.** No very-low- or low-risk patient died or had a ventricular arrhythmia. **Note what the score does and does not contain:** the eight predictors are predisposition to vasovagal symptoms, history of heart disease, any ED systolic BP <90 or >180, elevated troponin, abnormal QRS axis, QRS >130 ms, QTc >480 ms, and the ED diagnosis (vasovagal \u22122 / cardiac +2). **Palpitations itself is not a scored variable** \u2014 it earns no points, so do not read a low score as reassurance about a palpitation-then-syncope story. Exertional syncope and a family history of young sudden death are likewise outside the score and remain non-negotiable red flags. [13,14,15]\n\n**Reassess:** benign, resolved, normal ECG, no red flags vs a captured/again-symptomatic arrhythmia or a red-flag history requiring monitoring and cardiology.',
    citation: [1, 2, 8, 13, 14, 15],
    next: 'palp-rescue-reassess',
    summary: '12-lead ECG + continuous monitoring + focused labs (K/Mg/Ca, glucose, CBC, TSH, troponin if indicated). Risk-stratify by history; red flags = syncope (run the Syncope pathway + Canadian Syncope Risk Score), exertional palpitations, family history of sudden cardiac death in a first-degree relative <40-50 y, structural disease, abnormal ECG.',
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
    body: 'The goal is to capture the rhythm during symptoms and identify structural or ischemic substrate. [1,2,8]\n\n**In the ED:**\n- **12-lead ECG** (repeat with any recurrence) + **continuous telemetry** while the patient is monitored.\n- **Labs:** electrolytes (K, Mg, Ca), glucose, CBC, TSH, troponin (if ischemia possible), \u03b2-hCG; PE/thyroid testing as indicated.\n- **Echocardiography** (structural heart disease, reduced EF, valvular cause) \u2014 inpatient or expedited outpatient depending on risk.\n\n**Ambulatory rhythm monitoring (outpatient, matched to episode frequency):**\n- **Daily episodes** \u2192 24-48 h Holter monitor.\n- **Weekly episodes** \u2192 event/patch monitor (1-4 weeks).\n- **Rare but concerning episodes** \u2192 external loop recorder or, for infrequent high-risk syncope, an implantable loop recorder (via cardiology).\n- **Why frequency-matching matters \u2014 the yield gap is enormous.** Yield tracks monitoring *duration* against event frequency, not device sophistication. A 24-h Holter achieves symptom-rhythm correlation in only about **22%**; a randomized comparison found an external loop recorder reached **56%** in the same syncope/presyncope population. [19] With ~3-4 weeks of external loop recording, a conclusive diagnosis was reached in **86% of patients with palpitations but only 17% of those with syncope** \u2014 because palpitations are frequent and self-reportable while syncope is rare and incapacitating. [20] Practical translation: **a 2-week patch usually settles palpitations; unexplained recurrent syncope with suspected arrhythmia needs an implantable loop recorder, not another Holter.** Note that ~23% of patients with a symptomatic recurrence fail to activate a patient-triggered recorder, so auto-trigger capability matters. [19]\n- Do not order a 24-h Holter for symptoms that happen monthly \u2014 that is a guaranteed non-diagnostic test.\n\n**Cardiology/EP referral for:** documented SVT/VT, pre-excitation (WPW), Brugada, long QT, short QT, HCM/ARVC features, suspected structural/ischemic substrate, exertional palpitations, syncope with palpitations (also run [Syncope](#/tree/syncope)), or family history of sudden cardiac death in a first-degree relative <40-50 y.\n\n**Provocative testing:** exercise stress testing for exertional palpitations/suspected exercise-induced arrhythmia (NOT for Wellens \u2014 that is admitted for angiography).\n\n**Admit for monitoring when:** the palpitations are associated with syncope, a documented dangerous arrhythmia, an abnormal ECG substrate, structural heart disease, or a high-risk clinical picture \u2014 rather than sending the capture home.',
    citation: [1, 2, 4, 8, 13, 19, 20],
    next: 'palp-dispo',
    summary: 'ECG + telemetry + labs (\u00b1 echo). Match ambulatory monitoring to episode frequency: Holter (~22% symptom-rhythm yield) for daily, event/patch or external loop recorder (~56%; 86% in palpitations) for weekly, implantable loop recorder for rare high-risk syncope (external monitoring is only ~17% diagnostic there). Cardiology/EP for documented arrhythmia, pre-excitation, Brugada, long/short QT, HCM/ARVC, exertional palpitations, or syncope. Stress test for exertional (not Wellens).',
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
    body: 'Safe discharge criteria: [1,2,8]\n\n1. **Currently asymptomatic** with a **normal 12-lead ECG** (no pre-excitation, Brugada, long QT, Wellens, ischemia, or prior MI).\n2. **No red flags** \u2014 no syncope with the episode, not exertional, no family history of sudden cardiac death, no known structural heart disease.\n3. **No dangerous arrhythmia** documented; normal or corrected electrolytes and glucose; no secondary cause needing admission.\n4. **Hemodynamically stable** throughout.\n5. **Reliable follow-up** and an outpatient monitoring plan matched to episode frequency (Holter/event/patch), with cardiology referral if any concern.\n\n**Discharge plan:**\n- Arrange ambulatory monitoring and cardiology follow-up as indicated.\n- Remove reversible triggers: caffeine, stimulants, alcohol, sympathomimetics, decongestants; treat thyroid or electrolyte issues.\n- Teach vagal maneuvers for recurrent documented SVT if applicable.\n\n**Written return precautions:**\n- Palpitations with chest pain, shortness of breath, fainting or near-fainting \u2014 call 911\n- Palpitations that do not stop, occur with exertion, or are associated with a rapid sustained rate\n- Any new weakness, confusion, or collapse\n\n**Do NOT discharge if:** syncope with palpitations (run [Syncope](#/tree/syncope) instead \u2014 and note that palpitations earn no points on the Canadian Syncope Risk Score, so a low score is not clearance), exertional palpitations, abnormal ECG/substrate, documented dangerous arrhythmia, structural or ischemic heart disease, family history of sudden cardiac death in a first-degree relative <40-50 y, or unreliable follow-up. [13,14]',
    recommendation: 'Discharge only if asymptomatic with a normal ECG, no red flags, stable, cause benign/corrected, with ambulatory monitoring matched to frequency, cardiology referral if indicated, trigger avoidance, and clear return precautions. Syncope with the palpitations, exertional symptoms, or a family history of young sudden cardiac death all block discharge.',
    confidence: 'definitive',
    citation: [1, 2, 8, 13, 14],
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
    body: 'Monitored / ICU admission for: [1,2,4,7,10,11]\n\n- **Documented dangerous arrhythmia** \u2014 VT ([Ventricular Tachycardia](#/tree/ventricular-tachycardia)), pre-excited AF, torsades ([Torsades de Pointes](#/tree/torsades-de-pointes)) \u2014 continuous monitoring, EP involvement.\n- **Malignant substrate** newly identified \u2014 [Wellens Syndrome](#/tree/wellens-syndrome) (urgent angiography), [Brugada Syndrome](#/tree/brugada-syndrome), symptomatic long QT/WPW per cardiology.\n- **Palpitations with syncope** \u2014 high risk for a serious arrhythmia; admit for monitoring and workup. Run [Syncope](#/tree/syncope) and document the **Canadian Syncope Risk Score**; note that palpitations are *not* one of its scored variables, so a low score does not license discharge of a palpitation-then-collapse story. [13,14,15]\n- **Structural or ischemic cause** \u2014 ACS ([STEMI](#/tree/stemi), [NSTEMI/NSTE-ACS](#/tree/nstemi)), significant cardiomyopathy, reduced EF.\n- **Secondary cause requiring admission** \u2014 thyroid storm ([Thyroid Emergencies](#/tree/thyroid)), significant PE ([PE Treatment](#/tree/pe-treatment)), symptomatic anemia/hemorrhage.\n- **Hemodynamic instability** or recurrent arrhythmia not controlled in the ED.\n\n**Service selection:**\n- **Cardiology / EP** for documented arrhythmia, pre-excitation, channelopathy, ablation candidates.\n- **ICU / monitored bed** for unstable or malignant arrhythmias, torsades, or post-cardioversion instability.\n- **Medicine** co-management for secondary systemic causes.\n\n**Handoff content:** the captured rhythm (with strips/12-leads), stability, treatments given (drugs, cardioversion energy, magnesium), electrolytes and correction, ECG substrate (delta wave, QT, Brugada, Wellens), suspected trigger/secondary cause, and the monitoring/EP plan.',
    recommendation: 'Admit documented dangerous arrhythmia, malignant substrate, palpitations with syncope, structural/ischemic cause, or a secondary cause requiring inpatient care. Cardiology/EP for rhythm substrate; ICU for instability/torsades.',
    confidence: 'recommended',
    citation: [1, 2, 4, 7, 10, 11, 13, 14, 15],
    safetyLevel: 'warning',
  },
];

export const PALPITATIONS_HUB_CRITICAL_ACTIONS = [
  { text: 'Get a 12-lead ECG while symptomatic and sort stable vs unstable first \u2014 unstable + tachyarrhythmia = synchronized cardioversion NOW.', nodeId: 'palp-start' },
  { text: 'Confirm the arrhythmia (not compensatory sinus tach) is causing instability before cardioverting; defibrillate if pulseless/polymorphic. The 2025 AHA guideline no longer publishes a fixed joule ladder \u2014 use your device\u2019s recommended energy, or maximum if unknown; \u2265200 J biphasic for AF.', nodeId: 'palp-exc-unstable' },
  { text: 'Regular wide-complex tachycardia = VT until proven otherwise \u2014 procainamide 20-50 mg/min (preferred, PROCAMIO) or amiodarone 150 mg over 10 min, or cardioversion; NEVER AV-nodal blockers. A negative Brugada/Vereckei algorithm does not exclude VT (EP specificity only 43-70%).', nodeId: 'palp-exc-wct' },
  { text: 'Pre-excited AF (wide, irregular, very fast) \u2192 procainamide or cardioversion, NEVER adenosine/CCB/beta-blocker/digoxin. The \u201c48-hour safe window\u201d is obsolete: unanticoagulated DCCV without TEE is Class 2b and only at CHA2DS2-VASc 0-1 with <12 h of symptoms (2024 ESC uses 24 h).', nodeId: 'palp-exc-af' },
  { text: 'Regular narrow SVT \u2192 modified Valsalva (43% vs 17%, NNT \u22484) then adenosine 6\u219212 mg rapid IV push; confirm regular + narrow first. Reduce the first dose to 3 mg with a central line, a transplanted (denervated) heart, dipyridamole, or carbamazepine; avoid in severe bronchospasm \u2014 use diltiazem or verapamil instead.', nodeId: 'palp-exc-svt' },
  { text: 'Polymorphic VT / long QT = torsades \u2192 act at QTc >500 ms or a \u226560 ms rise from baseline: IV magnesium 2 g (even if level normal), correct K to >4.5 and Ca, stop QT drugs, raise the rate to 90-110 bpm (pacing or isoproterenol 1-10 mcg/min); defibrillate if pulseless.', nodeId: 'palp-exc-torsades' },
  { text: 'Read the resting ECG for WPW (avoid nodal blockers in AF), Brugada, Wellens (admit, no stress test), long QT, short QT, HCM, and ARVC \u2014 and remember CPVT and some LQTS genotypes have a normal resting ECG, so an exertional history still earns a referral.', nodeId: 'palp-exc-substrate' },
  { text: 'Do NOT cardiovert a compensatory sinus tachycardia \u2014 treat the cause (ACS, PE, thyroid, sepsis, anemia, hypoglycemia). Anxiety is a diagnosis of exclusion.', nodeId: 'palp-exc-secondary' },
  { text: 'Initial bundle: 12-lead + continuous monitoring + labs (K/Mg/Ca, glucose, CBC, TSH, troponin if indicated). Red flags = syncope (run the Syncope pathway + Canadian Syncope Risk Score), exertional palpitations, family SCD in a first-degree relative <40-50 y, structural disease, abnormal ECG.', nodeId: 'palp-rescue' },
  { text: 'Match ambulatory monitoring to episode frequency \u2014 a 24-h Holter yields symptom-rhythm correlation only ~22% of the time vs ~56% for a loop recorder (86% when the complaint is palpitations, but only 17% when it is syncope). Holter for daily, patch/event for weekly, implantable loop recorder for rare high-risk syncope; cardiology/EP for documented arrhythmia or dangerous substrate.', nodeId: 'palp-workup' },
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
  { num: 13, text: 'Shen WK, Sheldon RS, Benditt DG, et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients With Syncope. J Am Coll Cardiol. 2017;70(5):e39-e110. PMID: 28286221. doi:10.1016/j.jacc.2017.03.003 (Verified 2026-07-30 as the current US syncope guideline; not superseded. Basis for routing palpitations-with-syncope to the syncope pathway and for frequency-matched ambulatory monitoring.)' },
  { num: 14, text: 'Thiruganasambandamoorthy V, Sivilotti MLA, Le Sage N, et al. Multicenter Emergency Department Validation of the Canadian Syncope Risk Score. JAMA Intern Med. 2020;180(5):737-744. PMID: 32202605. doi:10.1001/jamainternmed.2020.0288 (Prospective validation in 3819 patients across 9 Canadian EDs; AUC 0.91, calibration slope 1.0. Source of the risk-category outcome rates quoted in this consult.)' },
  { num: 15, text: 'Thiruganasambandamoorthy V, Kwong K, Wells GA, et al. Development of the Canadian Syncope Risk Score to predict serious adverse events after emergency department assessment of syncope. CMAJ. 2016;188(12):E289-E298. PMID: 27378464. doi:10.1503/cmaj.151469 (Derivation cohort, 4030 patients; source of the eight scored predictors listed in this consult.)' },
  { num: 16, text: 'Van Gelder IC, Rienstra M, Bunting KV, et al. 2024 ESC Guidelines for the management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS). Eur Heart J. 2024;45(36):3314-3414. PMID: 39210723. doi:10.1093/eurheartj/ehae176 (Independently narrowed the no-anticoagulation cardioversion window from 48 h to 24 h; cited alongside ref 5.)' },
  { num: 17, text: 'Ortiz M, Mart\u00EDn A, Arribas F, et al. Randomized comparison of intravenous procainamide vs. intravenous amiodarone for the acute treatment of tolerated wide QRS tachycardia: the PROCAMIO study. Eur Heart J. 2017;38(17):1329-1335. PMID: 27354046. doi:10.1093/eurheartj/ehw230 (Procainamide 67% vs amiodarone 38% tachycardia termination at 40 min; major adverse cardiac events 9% vs 41%.)' },
  { num: 18, text: 'Isenhour JL, Craig S, Gibbs M, et al. Wide-complex tachycardia: continued evaluation of diagnostic criteria. Acad Emerg Med. 2000;7(7):769-773. PMID: 10917326. doi:10.1111/j.1553-2712.2000.tb02266.x (Real-world performance of the Brugada criteria: emergency physicians 79-83% sensitivity and 43-70% specificity, far below the originally reported 98.7%/96.5% \u2014 the basis for the \u201cdo not let an algorithm talk you out of VT\u201d caution.)' },
  { num: 19, text: 'Sivakumaran S, Krahn AD, Klein GJ, et al. A prospective randomized comparison of loop recorders versus Holter monitors in patients with syncope or presyncope. Am J Med. 2003;115(1):1-5. PMID: 12867227. doi:10.1016/s0002-9343(03)00233-x (Symptom-rhythm correlation 56% with loop recorder vs 22% with Holter; 23% of patients with a symptomatic recurrence failed to activate the recorder.)' },
  { num: 20, text: 'Locati ET, Vecchi AM, Vargiu S, et al. Role of extended external loop recorders for the diagnosis of unexplained syncope, pre-syncope, and sustained palpitations. Europace. 2014;16(6):914-922. PMID: 24158255. doi:10.1093/europace/eut337 (Conclusive diagnosis in 86% of patients monitored for palpitations vs only 17% of those monitored for syncope \u2014 the basis for matching device choice to episode frequency.)' },
  { num: 21, text: 'Chang M, Wrenn K. Adenosine dose should be less when administered through a central line. J Emerg Med. 2002;22(2):195-198. PMID: 11858927. doi:10.1016/s0736-4679(01)00479-0 (Primary source for the central-line dose reduction to 3 mg. The 2015 ACC/AHA/HRS SVT guideline addresses prolonged adenosine effect in denervated transplanted hearts and on carbamazepine/dipyridamole, but the central-line-specific reduction comes from this report and the ACLS drug tables, not from ref 6 \u2014 cited separately to avoid mis-attribution.)' },
  { num: 22, text: 'Ellenbogen KA, Thames MD, DiMarco JP, et al. Electrophysiological effects of adenosine in the transplanted human heart. Evidence of supersensitivity. Circulation. 1990;81(3):821-828. PMID: 2306833. doi:10.1161/01.cir.81.3.821 (Source of the supersensitivity magnitude: threefold to fourfold increased donor sinus-node response and threefold to fivefold PR prolongation versus controls \u2014 the physiologic basis for reducing the first adenosine dose in a transplanted heart.)' },
];

export const PALPITATIONS_HUB_NODE_COUNT = PALPITATIONS_HUB_NODES.length;
export const PALPITATIONS_HUB_MODULE_LABELS = [
  'Sick Check',
  'Time-Critical Exclusions',
  'Initial Bundle + Reassess',
  'Workup & Monitoring',
  'Disposition',
];
