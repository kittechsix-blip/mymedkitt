// myMedKitt — Right Heart Failure (RHF) Decision Tree
// Author: Andy Kitlowski, MD | Built 2026-05-06
// Sources: EMCrit/IBCC RV failure chapter, EB Medicine acute PE/RV update,
// ESC 2022 PH guidelines (Humbert), AHA 2018 Evaluation/Mgmt RV (Konstam),
// ESC 2019 PE (Konstantinides), MOPETT (Sharifi 2013), PEITHO (Meyer 2014),
// FLASH (Toma 2023), SEATTLE II (Piazza 2015), Farkas RV-protective RSI.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const RHF_CRITICAL_ACTIONS = [
    { text: 'Bedside POCUS for RV/LV ratio + D-sign + TAPSE in any unexplained shock or dyspnea before intubation', nodeId: 'rhf-pocus' },
    { text: 'STOP large-volume IVF (>500 mL) in known/suspected PAH or chronic RV failure — worsens RV dilation and ischemia', nodeId: 'rhf-fluid-strategy' },
    { text: 'NO nitrates / morphine / diuretics in RV MI — preload-dependent; use volume + dobutamine', nodeId: 'rhf-rvmi-mgmt' },
    { text: 'Pre-induct with norepi (if MAP <70) + iNO/inhaled epo (if PH); ketamine + low-dose etomidate; AVOID propofol bolus', nodeId: 'rhf-rsi-protocol' },
    { text: 'Norepinephrine FIRST — phenylephrine alone increases pulmonary vascular resistance and worsens RV failure', nodeId: 'rhf-pressor-ladder' },
    { text: 'Massive PE (sustained SBP <90 or arrest) → systemic alteplase 100 mg over 2 hr OR 50 mg push if peri-arrest', nodeId: 'rhf-pe-massive' },
    { text: 'NEVER abruptly discontinue home PAH-targeted therapy (epoprostenol, treprostinil, sildenafil) — rebound crisis can be fatal', nodeId: 'rhf-pah-crisis' },
];

export const RHF_NODES: DecisionNode[] = [
  // =====================================================================
  // MODULE 1: RECOGNITION + POCUS
  // =====================================================================
  {
    id: 'rhf-start',
    type: 'info',
    module: 1,
    title: 'Right Heart Failure — Phenotype Recognition',
    body: 'Right heart failure (RHF) is high-mortality and easy to miss. Classic phenotype:\n\n• **Clear lungs + elevated JVP + cool extremities** (vs LHF: wet lungs + JVP + cool)\n• Hypotension out of proportion to exam\n• Hypoxia without obvious LV dysfunction\n• Refractory to fluids — or **gets worse** with fluids\n• Common ED triggers: massive/submassive PE, RV MI, acute-on-chronic PAH crisis, sepsis-induced RV failure, post-LVAD RV failure, severe ARDS\n\n**Why this consult exists:** RV physiology is opposite to LV. Things that help LV failure (fluids, afterload reducers, propofol, phenyl) frequently kill RV failure patients. [1][2]',
    options: [
      { label: 'Hemodynamically unstable now (SBP <90, lactate >4, AMS)', next: 'rhf-unstable-resus', urgency: 'critical' },
      { label: 'Stable but high suspicion — POCUS + workup', next: 'rhf-pocus' },
      { label: 'Already intubated or about to intubate', next: 'rhf-rsi-protocol', urgency: 'urgent' },
      { label: 'Known PAH on home prostacyclin/PDE5i — symptomatic', next: 'rhf-pah-crisis', urgency: 'urgent' },
    ],
    calculatorLinks: [
      { id: 'spesi', label: 'sPESI (PE risk)' },
      { id: 'bova', label: 'BOVA (intermediate-risk PE)' },
    ],
    citation: [1, 2],
  },
  {
    id: 'rhf-unstable-resus',
    type: 'info',
    module: 1,
    title: 'Unstable RHF — Initial Resuscitation',
    body: '**Simultaneous priorities (90 seconds):**\n\n1. **Bedside POCUS** — RV/LV ratio, D-sign, McConnell, TAPSE, IVC, aorta, lung sliding\n2. **Norepinephrine** start 0.1 mcg/kg/min — TARGET MAP ≥65 (preserves RV coronary perfusion)\n3. **NO large-volume bolus** — give 250 mL crystalloid only if IVC <2 cm AND collapsing\n4. **12-lead ECG + V4R** — look for inferior STEMI (RV MI mimics PE)\n5. **Activate PERT / cards / pulm consults early** — RHF needs a team, not a hero\n6. **Plan disposition:** these patients need ICU, often advanced therapies (CDT, ECMO)\n\nIf already arrested or peri-arrest from suspected massive PE → **systemic alteplase 50 mg IV push** while compressions continue. [3][4][5]',
    recommendation: '**Norepi first (NOT phenyl), POCUS in 90 sec, NO big bolus, V4R always, alteplase 50 mg push if peri-arrest PE.**',
    confidence: 'definitive',
    citation: [3, 4, 5],
    summary: 'Unstable RHF: norepi + POCUS + V4R + restrained fluids + early PERT/ICU. Peri-arrest PE = 50 mg alteplase push.',
    safetyLevel: 'critical',
    options: [
      { label: 'POCUS + ECG done — drill into etiology', next: 'rhf-trigger-id' },
      { label: 'Need POCUS guide first', next: 'rhf-pocus' },
    ],
  },
  {
    id: 'rhf-pocus',
    type: 'info',
    module: 1,
    title: 'POCUS — Right Heart Failure Criteria',
    body: 'See full overlay: [POCUS RV Failure Reference](#/info/rhf-pocus-criteria) for views + values + image plates.\n\n**Top 6 findings (any one is significant; ≥2 = high specificity):**\n\n• **RV/LV end-diastolic ratio ≥1.0** (apical 4-chamber) — normal <0.6 [6]\n• **D-sign on PSAX** — septal flattening = RV pressure overload (acute = systolic D; chronic = diastolic D)\n• **McConnell sign** — RV free-wall hypokinesis with apical sparing — >94% specific for **acute** PE [7]\n• **TAPSE <17 mm** (M-mode through lateral tricuspid annulus) — RV systolic dysfunction\n• **IVC >2.1 cm with <50% inspiratory collapse** — elevated RA pressure\n• **60/60 sign** — pulmonary acceleration time <60 ms + tricuspid regurg gradient <60 mmHg — acute RV strain\n\n**Companion images (placeholders — replace with your own captures or licensed open-source files):**\n• [TAPSE M-mode example](#/image/rhf/tapse-mmode.jpg)\n• [McConnell apical 4-chamber](#/image/rhf/mcconnell-a4c.jpg)\n• [S1Q3T3 ECG](#/image/rhf/s1q3t3-ecg.jpg)\n• [Inferior MI ECG (RV MI proxy)](#/image/rhf/inferior-mi-ecg.jpg)',
    citation: [6, 7],
    options: [
      { label: 'Findings c/w acute RV strain — assess trigger', next: 'rhf-trigger-id' },
      { label: 'Tamponade or other shock mimic — exit consult', next: 'rhf-mimics' },
    ],
  },
  {
    id: 'rhf-mimics',
    type: 'result',
    module: 1,
    title: 'NOT Right Heart Failure — Common Mimics',
    body: 'Before you commit to RHF management, exclude:\n\n• **Cardiac tamponade** — diastolic RV/RA collapse, swinging heart → pericardiocentesis. Different physiology entirely.\n• **Tension pneumothorax** — absent lung sliding + lung point + obstructive shock\n• **Severe LV failure with RV dysfunction** — wet lungs, B-lines, dilated LV → afterload reduction OK\n• **Hypovolemic shock** — small/collapsing IVC, hyperdynamic LV — give fluids\n• **Distributive shock with normal heart** — septic vasoplegia — fluids + norepi\n• **Pericardial constriction** — septal bounce, respirophasic mitral inflow variation, normal RV size\n\nRoute these patients to the appropriate consult.',
    recommendation: '**Mimics: tamponade (drain), pneumo (decompress), LHF (treat differently), hypovolemia (fluids OK), constriction (cards). Do NOT apply RHF playbook.**',
    confidence: 'definitive',
    citation: [1],
    summary: 'Mimics: tamponade, tension PTX, LHF, hypovolemia, constriction — different management.',
  },

  // =====================================================================
  // MODULE 2: TRIGGER IDENTIFICATION
  // =====================================================================
  {
    id: 'rhf-trigger-id',
    type: 'question',
    module: 2,
    title: 'What is driving the RV failure?',
    body: 'Etiology dictates therapy. Use POCUS + ECG + history to pick the dominant trigger:',
    options: [
      { label: 'Acute PE (RV strain + sudden dyspnea + risk factors)', next: 'rhf-pe-pathway', urgency: 'urgent' },
      { label: 'RV MI (inferior STEMI + V4R elevation)', next: 'rhf-rvmi-mgmt', urgency: 'urgent' },
      { label: 'Acute-on-chronic PAH crisis (known PH, off meds, infection)', next: 'rhf-pah-crisis', urgency: 'urgent' },
      { label: 'Sepsis-induced RV failure', next: 'rhf-sepsis-rhf' },
      { label: 'Post-LVAD RV failure or post-cardiac-surgery', next: 'rhf-post-lvad' },
      { label: 'Severe ARDS / hypoxic pulmonary vasoconstriction', next: 'rhf-ards-rhf' },
    ],
  },

  // =====================================================================
  // MODULE 3: ETIOLOGY-SPECIFIC ALGORITHMS
  // =====================================================================
  {
    id: 'rhf-pe-pathway',
    type: 'question',
    module: 3,
    title: 'Acute PE — Severity Stratification',
    body: 'Risk-stratify before choosing therapy. Use [sPESI](#/calculator/spesi) + [BOVA](#/calculator/bova) + RV imaging + biomarkers (troponin, BNP).\n\n**Massive (high-risk):** sustained SBP <90 ≥15 min, vasopressors required, or arrest\n**Submassive intermediate-high:** RV strain on imaging + positive biomarkers + normotensive\n**Submassive intermediate-low:** RV strain OR positive biomarker (not both)\n**Low-risk:** sPESI 0, no RV strain, normal biomarkers',
    options: [
      { label: 'Massive (hemodynamic compromise)', next: 'rhf-pe-massive', urgency: 'critical' },
      { label: 'Submassive intermediate-high', next: 'rhf-pe-intermediate-high', urgency: 'urgent' },
      { label: 'Submassive intermediate-low', next: 'rhf-pe-intermediate-low' },
      { label: 'Low-risk (consider HESTIA + outpatient)', next: 'rhf-pe-lowrisk' },
    ],
    calculatorLinks: [
      { id: 'spesi', label: 'sPESI' },
      { id: 'bova', label: 'BOVA' },
      { id: 'half-dose-alteplase', label: 'Half-dose alteplase' },
    ],
    citation: [4, 5, 8],
  },
  {
    id: 'rhf-pe-massive',
    type: 'result',
    module: 3,
    title: 'Massive PE — Reperfusion NOW',
    body: '**Systemic thrombolysis (first-line if no absolute contraindications):**\n• **Alteplase 100 mg IV over 2 hours** (standard FDA dose)\n• **Peri-arrest / arrest:** alteplase 50 mg IV push, repeat 50 mg in 15 min if no ROSC; continue CPR ≥60 min after lytic\n• Hold heparin during infusion, restart aPTT <80 post-lysis\n\n**Catheter-directed alternatives** (call PERT):\n• **CDT/EKOS** — local tPA 1 mg/hr × 12-24 hr (lower bleed risk; SEATTLE II) [9]\n• **Mechanical thrombectomy (FlowTriever, Inari)** — first-line if absolute lytic contraindication; FLASH registry shows 1.8% major bleed [10]\n• **VA-ECMO bridge** — if arrest or refractory shock; activate ECMO team in parallel with lytics\n\n**Absolute lytic contraindications:** active major bleed, recent intracranial surgery/hemorrhage <3 mo, structural CNS lesion, ischemic stroke <3 mo, recent severe head trauma, suspected aortic dissection.\n\n**Surgical embolectomy** if lytic + catheter both contraindicated.',
    recommendation: '**Massive PE: alteplase 100 mg/2hr OR 50 mg push if peri-arrest. CDT/thrombectomy if lytic contraindicated. ECMO bridge if available.**',
    confidence: 'definitive',
    citation: [4, 5, 9, 10],
    summary: 'Massive PE = lyse: 100 mg alteplase/2hr or 50 mg push periarrest. CDT/Inari if contraindicated. ECMO bridge.',
    safetyLevel: 'critical',
  },
  {
    id: 'rhf-pe-intermediate-high',
    type: 'result',
    module: 3,
    title: 'Submassive PE Intermediate-High — Catheter > Systemic Lytic',
    body: '**PEITHO** showed full-dose lytic in submassive PE reduced decompensation but **doubled major bleed (11.5%) and tripled stroke (2.4%)** — net negative outside the most ill subset. [11]\n\n**Modern approach:**\n• **Heparin** anticoagulation immediately (UFH preferred — titratable)\n• **Activate PERT** — multi-D decision\n• **Catheter-directed thrombolysis (CDT/EKOS)** — local tPA 1 mg/hr × 12-24 hr; SEATTLE II showed RV/LV ratio reduction with major-bleed rate ~10% (lower than systemic) [9]\n• **Mechanical thrombectomy (FlowTriever)** — FLASH/FLAME data: rapid RV unloading, 1.8% major bleed, no lytic [10]\n• **Half-dose alteplase 50 mg** (MOPETT protocol) — Sharifi 2013 RCT: reduced PH at 28 mo without bleed signal in 121-pt single-center study; not yet societal standard but used at many centers [12]\n• If decompensating despite heparin → escalate to systemic 100 mg alteplase\n\nSee [Half-dose alteplase calculator](#/calculator/half-dose-alteplase) for MOPETT regimen.',
    recommendation: '**Heparin + PERT activation. CDT/thrombectomy preferred. Half-dose lytic (50 mg) reasonable. Full-dose only if decompensating.**',
    confidence: 'recommended',
    citation: [9, 10, 11, 12],
    summary: 'Submassive int-high: heparin + PERT + CDT/Inari preferred. MOPETT half-dose 50 mg is option. Full lyse if decompensating.',
    safetyLevel: 'warning',
  },
  {
    id: 'rhf-pe-intermediate-low',
    type: 'result',
    module: 3,
    title: 'Submassive PE Intermediate-Low — Anticoagulate + Monitor',
    body: '**Heparin** (UFH or LMWH) + admit to monitored bed.\n\n• Repeat troponin q6h × 2 to confirm trajectory\n• Repeat echo if hemodynamics worsen\n• If stable at 24-48 hr → transition to DOAC (apixaban or rivaroxaban) per ESC 2019 [4]\n• Outpatient follow-up at 3 mo for repeat echo + chronic thromboembolic disease screen',
    recommendation: '**Heparin/LMWH + monitor. Transition to DOAC at 24-48h if stable. 3-mo CTEPH screen.**',
    confidence: 'definitive',
    citation: [4],
    summary: 'Int-low: anticoag + monitor + DOAC bridge + 3-mo CTEPH screen.',
  },
  {
    id: 'rhf-pe-lowrisk',
    type: 'result',
    module: 3,
    title: 'Low-Risk PE — Outpatient Eligible',
    body: '**HESTIA criteria all met → outpatient candidate** with apixaban or rivaroxaban.\n\nApixaban: 10 mg PO BID × 7 days, then 5 mg BID\nRivaroxaban: 15 mg PO BID × 21 days, then 20 mg daily\n\nMust have:\n• Hemodynamically stable, sPESI 0, no RV strain on imaging or biomarkers\n• No active bleed, no severe pain, reliable follow-up <72 hr\n• Adequate renal function, no pregnancy\n• Patient understands return precautions',
    recommendation: '**HESTIA-eligible PE: apixaban 10 mg BID×7d→5 mg BID OR rivaroxaban 15 mg BID×21d→20 mg daily. Follow-up <72h.**',
    confidence: 'definitive',
    citation: [4],
    summary: 'Low-risk + HESTIA: discharge on DOAC, follow-up 72h.',
  },
  {
    id: 'rhf-rvmi-mgmt',
    type: 'result',
    module: 3,
    title: 'RV MI — Preload-Dependent Resuscitation',
    body: '**Confirm with V4R lead — ST elevation ≥1 mm = RV infarction** (40% of inferior MIs). [13]\n\n**STRONG WARN — DO NOT GIVE:**\n• ❌ Nitrates (nitroglycerin, ISDN) — preload drop = profound hypotension\n• ❌ Morphine — venodilation\n• ❌ Diuretics — preload drop\n• ❌ Beta-blockers acutely — bradycardia + ↓ contractility\n• ❌ ACE inhibitors acutely\n\n**DO:**\n• ✅ **Volume: 500 mL crystalloid bolus**, repeat to JVP/POCUS endpoint (RV is preload-dependent)\n• ✅ **Dobutamine 2-10 mcg/kg/min** if volume alone insufficient — augments RV contractility\n• ✅ **Norepi** if MAP <65\n• ✅ **Activate cath lab — primary PCI is definitive therapy**\n• ✅ Maintain sinus rhythm — atrial kick contributes ~25% of RV output (vs 15% for LV)\n• ✅ Pace AV-sequentially if heart block (common with RCA infarcts)\n\n**Key teaching:** every drug that lowers preload kills RV MI patients. Volume + inotrope + revascularization. [13][14]',
    recommendation: '**RV MI: NO nitrates/morphine/diuretics/BB. YES volume 500 mL → dobutamine → norepi. Cath lab now. Preserve sinus + AV synchrony.**',
    confidence: 'definitive',
    citation: [13, 14],
    summary: 'RV MI: NO nitrates/morphine/diuretics. YES volume + dobutamine + cath lab. Preload-dependent.',
    safetyLevel: 'critical',
  },
  {
    id: 'rhf-pah-crisis',
    type: 'result',
    module: 3,
    title: 'Acute-on-Chronic PAH Crisis',
    body: '**Highest-mortality phenotype** — these patients live on the edge of RV failure. Triggers: missed home meds, infection, surgery, dehydration, arrhythmia, anemia.\n\n**STRONG WARN:**\n• ❌ **DO NOT abruptly stop home prostacyclin (epoprostenol/Flolan, treprostinil)** — rebound PH crisis can be fatal within hours\n• ❌ DO NOT give large fluid bolus (>500 mL) — RV dilation worsens ischemia\n• ❌ DO NOT intubate without preparation — induction-related arrest is the leading cause of death\n• ❌ DO NOT use phenylephrine alone — pure α-1 increases pulmonary vascular resistance\n\n**DO:**\n• ✅ **Continue / restart home prostacyclin** — call patient\'s PH center for dose\n• ✅ **Inhaled pulmonary vasodilators** ([overlay reference](#/info/rhf-inhaled-vasodilators)):\n   - Inhaled NO 20-40 ppm via face mask or HFNC\n   - Inhaled epoprostenol 50 ng/kg/min via neb (more available than iNO)\n   - Inhaled milrinone 5 mg via neb (off-label, evidence growing)\n• ✅ **Norepinephrine first** for MAP support — preserves RV coronary perfusion without raising PVR much\n• ✅ **Add vasopressin 0.03 U/min** — pulmonary-sparing (V1 receptors don\'t constrict pulm vasculature)\n• ✅ **Dobutamine or milrinone** if low CO\n• ✅ Treat the trigger (abx for infection, transfuse if anemic, cardiovert if arrhythmia)\n• ✅ **Call PH center early** — these patients often need transfer to specialty ICU [15][16]',
    recommendation: '**PAH crisis: never stop home prostacyclin, no big bolus, iNO/inhaled epo, norepi+vaso, dobutamine. Call PH center.**',
    confidence: 'definitive',
    citation: [15, 16],
    summary: 'PAH crisis: keep home meds, iNO/epo, norepi+vaso, dobutamine, NO bolus, NO phenyl, call PH ctr.',
    safetyLevel: 'critical',
  },
  {
    id: 'rhf-sepsis-rhf',
    type: 'result',
    module: 3,
    title: 'Sepsis-Induced RV Failure',
    body: 'Sepsis can cause RV failure via:\n• Acute pulmonary hypertension (cytokines, hypoxic vasoconstriction, microthrombi)\n• Septic cardiomyopathy involving RV\n• ARDS-related cor pulmonale\n\n**Modified resuscitation:**\n• **Restrained fluid strategy** — POCUS-guided, 250 mL aliquots, stop when IVC plethoric or RV dilates further\n• **Norepinephrine first** + **vasopressin 0.03 U/min** (pulmonary-sparing)\n• **Source control + early appropriate antibiotics** unchanged\n• Consider **dobutamine** if low CO despite adequate MAP\n• **Lung-protective ventilation** if intubated (TV 4-6 mL/kg, PEEP titrated to RV not LV)\n• Avoid hyperventilation (hypocapnia helps PVR but barotrauma worsens RV)',
    recommendation: '**Septic RHF: POCUS-guided 250 mL aliquots, norepi+vaso, dobutamine prn, lung-protective vent, source control.**',
    confidence: 'recommended',
    citation: [17],
    summary: 'Sepsis + RHF: small fluids, norepi+vaso, dobutamine, lung-protective, source control.',
  },
  {
    id: 'rhf-post-lvad',
    type: 'result',
    module: 3,
    title: 'Post-LVAD or Post-Cardiac-Surgery RV Failure',
    body: '**Post-LVAD RV failure occurs in 10-40%** of LVAD recipients. Mechanism: increased venous return from improved CO unmasks marginal RV.\n\n**Critical: contact LVAD coordinator IMMEDIATELY** — they have institution-specific protocols.\n\n• Inhaled pulmonary vasodilators (iNO, inhaled epo) — first-line\n• Inotropes: milrinone 0.25-0.75 mcg/kg/min preferred (afterload reduction PLUS inotropy)\n• Avoid systemic vasodilators (drop LVAD flow alarms)\n• RV mechanical support: Impella RP, ProtekDuo, VA-ECMO\n• Adjust LVAD speed only with coordinator guidance — too high = suction events, too low = pulm congestion\n\nPost-cardiac-surgery RV failure: similar bundle + rule out tamponade (frequent post-op).',
    recommendation: '**Post-LVAD RHF: call coordinator NOW. iNO/inhaled epo, milrinone, RV MCS. NEVER adjust LVAD speed unsupervised.**',
    confidence: 'recommended',
    citation: [18],
    summary: 'Post-LVAD: call coordinator, iNO/epo, milrinone, MCS. Never touch LVAD speed alone.',
    safetyLevel: 'warning',
  },
  {
    id: 'rhf-ards-rhf',
    type: 'result',
    module: 3,
    title: 'ARDS-Related Cor Pulmonale',
    body: '**Acute cor pulmonale occurs in 20-25% of ARDS** patients and doubles mortality. [19]\n\n**Lung-protective + RV-protective ventilation:**\n• TV 4-6 mL/kg PBW (already standard)\n• Plateau pressure ≤27 cm H2O (lower than ARDSNet 30) — protects RV\n• Driving pressure ≤14 cm H2O\n• PEEP titrated to RV — NOT lung compliance alone\n• pH ≥7.20-7.25 (avoid permissive hypercapnia <7.15 — raises PVR)\n• Prone position if PaO2/FiO2 <150 — improves V/Q AND offloads RV\n• Inhaled NO or inhaled epoprostenol if refractory hypoxemia or RV failure\n• VV-ECMO if refractory; VA-ECMO if cardiogenic component\n• Cisatracurium 48 hr if PaO2/FiO2 <120 (ACURASYS subset benefit)',
    recommendation: '**ARDS+RHF: plateau ≤27, DP ≤14, PEEP for RV, pH ≥7.20, prone <150, iNO/iEpo, ECMO for refractory.**',
    confidence: 'recommended',
    citation: [19],
    summary: 'ARDS cor pulmonale: lung+RV-protective vent, prone, iNO, ECMO escalation.',
  },

  // =====================================================================
  // MODULE 4: HEMODYNAMIC LADDER
  // =====================================================================
  {
    id: 'rhf-fluid-strategy',
    type: 'info',
    module: 4,
    title: 'Fluid Strategy in RHF — POCUS-Guided',
    body: '**The biggest mistake in RHF is reflexive fluid loading.** A dilated RV pushes the septum into the LV, drops LV filling, raises wall stress, and worsens RV ischemia.\n\n**Decision rule:**\n• IVC small/collapsing + small RV → 250-500 mL bolus, reassess\n• IVC plethoric OR RV already dilated → **NO fluid**, go straight to vasopressors/inotropes\n• Each bolus reassessed at the bedside — no "give 30 mL/kg" reflex\n\n**Exception:** RV MI is preload-dependent and **does** benefit from volume early — but still POCUS-guided.\n\n**Diuresis** if patient is volume-overloaded (peripheral edema + plethoric IVC + RV dilated): furosemide 40 mg IV or higher per home dose, ultrafiltration if refractory.',
    recommendation: '**RHF fluid: POCUS first, 250-500 mL aliquots only if IVC small. Plethoric IVC = stop, escalate. RV MI is the exception — volume-dependent.**',
    confidence: 'definitive',
    citation: [1, 2],
    summary: 'RHF fluid = POCUS-guided 250-500 mL aliquots. Plethoric IVC = stop. RV MI = exception, give volume.',
    options: [
      { label: 'Continue to pressor/inotrope ladder', next: 'rhf-pressor-ladder' },
    ],
  },
  {
    id: 'rhf-pressor-ladder',
    type: 'info',
    module: 4,
    title: 'Pressors + Inotropes in RHF',
    body: 'See [Pressor/Inotrope Reference Card](#/info/rhf-pressors) for full doses.\n\n**Pressors:**\n• **Norepinephrine 0.05-1.0 mcg/kg/min** — FIRST-LINE (preserves RV coronary perfusion, modest pulm-vasoconstrictor)\n• **Vasopressin 0.03 U/min** — add-on (V1 receptors don\'t constrict pulmonary vasculature — pulmonary-sparing)\n• **Phenylephrine** — AVOID alone (raises PVR > SVR, worsens RV)\n• **Epinephrine** — reserve for refractory cardiogenic shock or arrest\n\n**Inotropes:**\n• **Dobutamine 2-10 mcg/kg/min** — β-1 inotropy + mild β-2 pulm vasodilation; titrate to MAP/CO\n• **Milrinone 0.25-0.75 mcg/kg/min** — PDE-3 inhibitor: RV inotropy + pulm vasodilation; preferred in PAH-RHF; can drop SVR (often need norepi alongside)\n• **Levosimendan 0.05-0.2 mcg/kg/min** — calcium sensitizer, where available\n\n**Inhaled pulmonary vasodilators** ([reference](#/info/rhf-inhaled-vasodilators)):\n• iNO 20-40 ppm\n• Inhaled epoprostenol 50 ng/kg/min via neb\n• Inhaled milrinone 5 mg via neb',
    recommendation: '**Norepi first → add vasopressin 0.03 → dobutamine OR milrinone for inotropy → inhaled iNO/epo for pulm afterload. AVOID phenyl alone.**',
    confidence: 'definitive',
    citation: [1, 15, 20],
    summary: 'Pressor ladder: norepi → +vaso → dobutamine/milrinone → iNO/iEpo. Avoid phenyl alone.',
    safetyLevel: 'warning',
    options: [
      { label: 'Need RSI / intubation guidance', next: 'rhf-rsi-protocol', urgency: 'urgent' },
      { label: 'Stable on current support — disposition', next: 'rhf-disposition' },
    ],
  },

  // =====================================================================
  // MODULE 5: RV-PROTECTIVE INTUBATION (FARKAS)
  // =====================================================================
  {
    id: 'rhf-rsi-protocol',
    type: 'info',
    module: 5,
    title: 'RV-Protective Intubation (Farkas Protocol)',
    body: '**Intubation is the leading cause of death in severe RHF/PAH** — induction agents drop SVR + preload, positive-pressure ventilation drops RV preload AND raises PVR, hypoxia + hypercapnia at any point arrests these patients.\n\nSee full bundle: [Farkas RV-Protective RSI](#/info/rhf-farkas-rsi)\n\n**Pre-induction (mandatory):**\n• Norepinephrine running at MAP ≥75 BEFORE induction (push-dose phenyl is NOT enough)\n• If known PAH: inhaled NO 20-40 ppm or inhaled epoprostenol running pre-induction\n• Pre-oxygenate with HFNC + apneic oxygenation\n• Plan for bedside POCUS during/after intubation\n• 2 IV access, A-line if time permits\n\n**Induction agents:**\n• ✅ **Ketamine 1-2 mg/kg** — preserves SVR, modest pulm vasodilator effect\n• ✅ **Etomidate 0.15-0.3 mg/kg** (lower than usual) — hemodynamic neutrality\n• ❌ **AVOID propofol bolus** — drops SVR and contractility — frequent arrest\n• ❌ Avoid high-dose midazolam\n\n**Paralytic:** rocuronium 1.2 mg/kg (sugammadex available)\n\n**Post-intubation ventilation:**\n• TV 4-6 mL/kg PBW\n• PEEP ≤5 initially, titrate up only by RV response\n• Plateau ≤27 cm H2O\n• pH ≥7.25 (raise rate before TV)\n• FiO2 to SpO2 ≥92% (hypoxia → pulm vasoconstr)\n• Avoid hyperventilation despite urge — ↑ intrathoracic pressure',
    recommendation: '**Farkas bundle: norepi MAP 75 + iNO/iEpo if PAH, ketamine+low-dose etomidate, NO propofol bolus, TV 4-6, PEEP ≤5, pH ≥7.25, FiO2 to 92%.**',
    confidence: 'recommended',
    citation: [1, 21],
    summary: 'Farkas RSI: norepi pre-induct, ketamine+etomidate (NO propofol), low TV, low PEEP, pH≥7.25.',
    safetyLevel: 'critical',
    options: [
      { label: 'Intubated — go to disposition', next: 'rhf-disposition' },
    ],
  },

  // =====================================================================
  // MODULE 6: DISPOSITION + PERT
  // =====================================================================
  {
    id: 'rhf-disposition',
    type: 'info',
    module: 6,
    title: 'Disposition — When to Call PERT / PH Team / Transfer',
    body: 'See full overlay: [Disposition + PERT Activation](#/info/rhf-disposition-pert)\n\n**ICU criteria (any one):**\n• Massive or submassive intermediate-high PE\n• Vasopressor or inotrope requirement\n• Mechanical ventilation\n• Lactate >4 or worsening\n• Active arrhythmia\n• Post-thrombolysis monitoring\n\n**Activate PERT (Pulmonary Embolism Response Team) for:**\n• Any massive or submassive PE\n• Bleeding contraindication to lytic\n• Decompensation despite anticoagulation\n• Need for catheter-directed therapy or surgical embolectomy\n\n**Transfer to PH center for:**\n• PAH crisis on home prostacyclin\n• New-onset suspected PAH (don\'t initiate chronic PAH meds in ED — wait for right-heart cath)\n• Need for advanced therapies (IV epo, inhaled treprostinil, transplant eval)\n\n**ECMO referral:**\n• Massive PE with arrest or refractory shock\n• ARDS with refractory hypoxia + RHF\n• Bridge to definitive therapy\n\n**Goals-of-care:**\n• Group 1 PAH 5-yr mortality without transplant ~50% — discuss prognosis early\n• Recurrent ICU admissions for PAH crisis = trigger for advanced-care planning\n• Post-arrest PE survival is poor — engage family realistically',
    recommendation: '**ICU for vasopressors/lytic/intubated. PERT for any massive or escalation. PH ctr for prostacyclin patients. ECMO if refractory. GOC early.**',
    confidence: 'recommended',
    citation: [4, 5, 22],
    summary: 'ICU + PERT + PH ctr + ECMO + GOC.',
    options: [
      { label: 'Stable on plan — return to start', next: 'rhf-start' },
    ],
  },
];

// =====================================================================
// MODULE LABELS
// =====================================================================
export const RHF_MODULE_LABELS: string[] = [
  '', // index 0 unused
  'Recognition + POCUS',
  'Trigger Identification',
  'Etiology-Specific Algorithm',
  'Hemodynamic Ladder',
  'RV-Protective Intubation',
  'Disposition + PERT',
];

// =====================================================================
// CITATIONS
// =====================================================================
export const RHF_CITATIONS: Citation[] = [
    { num: 1, text: 'Farkas J. Internet Book of Critical Care: Right Ventricular Failure. EMCrit/IBCC. Updated 2024.' },
    { num: 2, text: 'Konstam MA, Kiernan MS, Bernstein D, et al. Evaluation and Management of Right-Sided Heart Failure: A Scientific Statement From the AHA. Circulation. 2018;137(20):e578-e622.' },
    { num: 3, text: 'Lavonas EJ, et al. Part 10: Special Circumstances of Resuscitation: 2020 AHA Guidelines for CPR and ECC. Circulation. 2020;142(suppl 2):S501-S518.' },
    { num: 4, text: 'Konstantinides SV, Meyer G, Becattini C, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism. Eur Heart J. 2020;41(4):543-603.' },
    { num: 5, text: 'Jaff MR, McMurtry MS, Archer SL, et al. Management of Massive and Submassive PE, IFDVT, and CTEPH: AHA Scientific Statement. Circulation. 2011;123(16):1788-1830.' },
    { num: 6, text: 'Rudski LG, Lai WW, Afilalo J, et al. Guidelines for the Echocardiographic Assessment of the Right Heart in Adults: A Report from the ASE. J Am Soc Echocardiogr. 2010;23(7):685-713.' },
    { num: 7, text: 'McConnell MV, Solomon SD, Rayan ME, et al. Regional right ventricular dysfunction detected by echocardiography in acute pulmonary embolism. Am J Cardiol. 1996;78(4):469-473.' },
    { num: 8, text: 'Bova C, Sanchez O, Prandoni P, et al. Identification of intermediate-risk patients with acute symptomatic pulmonary embolism. Eur Respir J. 2014;44(3):694-703.' },
    { num: 9, text: 'Piazza G, Hohlfelder B, Jaff MR, et al. A Prospective, Single-Arm, Multicenter Trial of Ultrasound-Facilitated, Catheter-Directed, Low-Dose Fibrinolysis for Acute Massive and Submassive Pulmonary Embolism: SEATTLE II. JACC Cardiovasc Interv. 2015;8(10):1382-1392.' },
    { num: 10, text: 'Toma C, Jaber WA, Weinberg MD, et al. Acute outcomes for the full US cohort of the FLASH mechanical thrombectomy registry in pulmonary embolism. EuroIntervention. 2023;18(14):1201-1212.' },
    { num: 11, text: 'Meyer G, Vicaut E, Danays T, et al. Fibrinolysis for patients with intermediate-risk pulmonary embolism (PEITHO). N Engl J Med. 2014;370(15):1402-1411.' },
    { num: 12, text: 'Sharifi M, Bay C, Skrocki L, et al. Moderate Pulmonary Embolism Treated With Thrombolysis (MOPETT). Am J Cardiol. 2013;111(2):273-277.' },
    { num: 13, text: 'Kinch JW, Ryan TJ. Right Ventricular Infarction. N Engl J Med. 1994;330(17):1211-1217.' },
    { num: 14, text: 'Goldstein JA. Acute right ventricular infarction. Cardiol Clin. 2012;30(2):219-232.' },
    { num: 15, text: 'Humbert M, Kovacs G, Hoeper MM, et al. 2022 ESC/ERS Guidelines for the diagnosis and treatment of pulmonary hypertension. Eur Heart J. 2022;43(38):3618-3731.' },
    { num: 16, text: 'Hoeper MM, Granton J. Intensive care unit management of patients with severe pulmonary hypertension and right heart failure. Am J Respir Crit Care Med. 2011;184(10):1114-1124.' },
    { num: 17, text: 'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Intensive Care Med. 2021;47(11):1181-1247.' },
    { num: 18, text: 'Lampert BC, Teuteberg JJ. Right ventricular failure after left ventricular assist devices. J Heart Lung Transplant. 2015;34(9):1123-1130.' },
    { num: 19, text: 'Mekontso Dessap A, Boissier F, Charron C, et al. Acute cor pulmonale during protective ventilation for ARDS. Intensive Care Med. 2016;42(5):862-870.' },
    { num: 20, text: 'Russ MA, Prondzinsky R, Carter JM, et al. Right ventricular function in myocardial infarction complicated by cardiogenic shock. Crit Care Med. 2009;37(12):3017-3023.' },
    { num: 21, text: 'Wilcox SR, Kabrhel C, Channick RN. Pulmonary Hypertension and Right Ventricular Failure in Emergency Medicine. Ann Emerg Med. 2015;66(6):619-628.' },
    { num: 22, text: 'Rosenfield K, Pulmonary Embolism Response Team Consortium. PERT Consortium consensus practice. Vasc Med. 2019;24(1):54-59.' },
];

export const RHF_NODE_COUNT = RHF_NODES.length;
