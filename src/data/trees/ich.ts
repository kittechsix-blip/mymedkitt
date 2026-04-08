// MedKitt — Spontaneous Intracerebral Hemorrhage (ICH) Management
// Based on IBCC (Josh Farkas), AHA/ASA 2022, ESO/EANS 2025
// Assessment → Coagulation Reversal → BP Control → Surgical Considerations → ICU Management → Disposition
// 6 modules, 17 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const ICH_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'ich-start',
    type: 'info',
    module: 1,
    title: 'Intracerebral Hemorrhage (ICH)',
    body: '[ICH Steps Summary](#/info/ich-summary) — time-critical hemorrhage management.\n\nSpontaneous ICH accounts for 10–15% of all strokes with ~40% 30-day mortality. Early hemostatic therapy, BP control, and neurosurgical consultation are the cornerstones of acute management.\n\n**Immediate actions:**\n• Non-contrast CT head — confirm diagnosis, estimate hematoma volume\n• Establish IV access ×2\n• Activate stroke/neurosurgery team\n• NPO (potential surgical candidate)\n\n**Do NOT delay anticoagulant reversal while awaiting labs** — empiric reversal should be given immediately if clinical suspicion of anticoagulant use is high.',
    citation: [1, 2],
    next: 'ich-labs',
  },

  {
    id: 'ich-labs',
    type: 'info',
    module: 1,
    title: 'Evaluation & Imaging',
    body: '**Initial labs:**\n• CBC, BMP, Mg, Phos\n• INR, PTT, fibrinogen\n• Anti-Xa level if on oral Xa inhibitors (apixaban, rivaroxaban)\n• Toxicology screen (if clinically warranted)\n• Type & screen\n• ABG/VBG if intubated\n\n**Hematoma volume (ABC/2):**\nA × B × C ÷ 2 (cm) = volume in mL\n• A = largest diameter on axial CT\n• B = perpendicular diameter on same slice\n• C = number of slices with hemorrhage × slice thickness\n• <30 mL = relatively favorable prognosis\n• >30 mL = moderate-to-severe\n\n[CT Markers of Expansion](#/info/ich-ct-markers) — swirl sign, black hole sign, spot sign\n\n**CT Angiography:** Obtain for nearly all patients unless classic hypertensive location in an older patient. **Mandatory** if:\n• Lobar ICH in patient <70 years\n• Deep/posterior fossa ICH in patient <45 years\n• Deep ICH in patient 45–70 without hypertension history\n\n**Serial CT:** Repeat at ~6h and 24h for stable patients. More frequent if neuro decline or sedated.',
    images: [{ src: 'images/ich/ich-basal-ganglia-ct.png', alt: 'CT head showing basal ganglia intracranial hemorrhage', caption: 'Basal ganglia ICH: hyperdense (white) blood on noncontrast CT — most common spontaneous ICH location (Wikimedia Commons, CC BY 4.0)' }],
    citation: [1, 2, 3],
    next: 'ich-anticoag',
  },

  // =====================================================================
  // MODULE 2: COAGULATION OPTIMIZATION
  // =====================================================================

  {
    id: 'ich-anticoag',
    type: 'question',
    module: 2,
    title: 'Anticoagulation Status',
    body: '**Determine anticoagulant/antiplatelet status immediately.**\n\nDo NOT wait for lab results before initiating reversal — empiric reversal should begin as soon as the agent is identified.\n\n[Causes of ICH](#/info/ich-causes) — hypertensive, CAA, vascular malformation, coagulopathy',
    citation: [1, 2],
    options: [
      {
        label: 'Warfarin',
        description: 'INR likely elevated — urgent PCC + Vitamin K',
        next: 'ich-warfarin-rev',
        urgency: 'critical',
      },
      {
        label: 'Dabigatran (Pradaxa)',
        description: 'Direct thrombin inhibitor — idarucizumab reversal',
        next: 'ich-dabi-rev',
        urgency: 'critical',
      },
      {
        label: 'Xa Inhibitor (apixaban, rivaroxaban, edoxaban)',
        description: 'Factor Xa inhibitor — andexanet alfa or PCC',
        next: 'ich-xa-rev',
        urgency: 'critical',
      },
      {
        label: 'Heparin / LMWH',
        description: 'Protamine sulfate reversal',
        next: 'ich-heparin-rev',
        urgency: 'urgent',
      },
      {
        label: 'Not on anticoagulation',
        description: 'Antiplatelet only or no antithrombotics',
        next: 'ich-coag-adj',
      },
    ],
  },

  {
    id: 'ich-warfarin-rev',
    type: 'info',
    module: 2,
    title: 'Warfarin Reversal',
    body: '**Goal: INR <1.4 as rapidly as possible.**\n\n**First-line: [4-Factor PCC](#/drug/pcc-4factor/warfarin ich)**\n• 25–50 IU/kg IV based on INR and weight\n• Onset: 10–15 minutes\n• Superior to FFP — faster correction, less volume\n\n**PLUS [Vitamin K](#/drug/vitamin-k/warfarin ich)**\n• 10 mg IV slow push (over 15–30 min)\n• Prevents INR rebound after PCC wears off (6–8h)\n• IV route preferred — oral takes 12–24h\n\n**FFP** (15 mL/kg) only if PCC unavailable — slower, volume overload risk\n\n**Monitoring:**\n• Recheck INR 15–30 min post-PCC\n• If INR still >1.4 → repeat PCC dose\n• Recheck INR at 6h (Vitamin K sustains correction)',
    citation: [1, 2, 4],
    treatment: {
      firstLine: {
        drug: '4-Factor PCC + Vitamin K',
        dose: 'PCC 25-50 IU/kg (based on INR) + Vitamin K 10 mg',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Give PCC first. Vitamin K over 15-30 min to prevent anaphylaxis. May repeat PCC if INR >1.4 at 15-30 min.',
      },
      alternative: {
        drug: 'FFP',
        dose: '15 mL/kg',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Only if PCC unavailable. Slower onset, volume overload risk.',
      },
      monitoring: 'Recheck INR 15-30 min post-PCC. If still >1.4, repeat PCC. Recheck INR at 6h (Vitamin K sustains correction).',
    },
    next: 'ich-bp',
  },

  {
    id: 'ich-dabi-rev',
    type: 'info',
    module: 2,
    title: 'Dabigatran Reversal',
    body: '**First-line: [Idarucizumab](#/drug/idarucizumab/dabigatran ich) (Praxbind)**\n• 5 g IV as two consecutive 2.5 g bolus doses\n• Onset: immediate — complete reversal within minutes\n• Specific monoclonal antibody fragment for dabigatran\n\n**If idarucizumab unavailable:**\n• [4-Factor PCC](#/drug/pcc-4factor/doac ich) 50 IU/kg IV\n• OR activated PCC (FEIBA) 50 IU/kg IV\n\n**Adjuncts:**\n• Hemodialysis can remove dabigatran (60% reduction in 2–3h) — consider if idarucizumab unavailable and severe bleeding\n• Activated charcoal 50 g if ingestion within 2h (intubated patients only)\n\n**Note:** Dabigatran is the only DOAC with a specific reversal agent.',
    citation: [1, 2, 5],
    treatment: {
      firstLine: {
        drug: 'Idarucizumab (Praxbind)',
        dose: '5 g (two consecutive 2.5 g boluses)',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Specific monoclonal antibody fragment. Immediate complete reversal.',
      },
      alternative: {
        drug: '4-Factor PCC or aPCC (FEIBA)',
        dose: '50 IU/kg',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Only if idarucizumab unavailable. Hemodialysis can remove 60% in 2-3h as adjunct.',
      },
      monitoring: 'Clinical assessment of bleeding. Thrombin time or dilute thrombin time if available. Repeat CT at 6h.',
    },
    next: 'ich-bp',
  },

  {
    id: 'ich-xa-rev',
    type: 'info',
    module: 2,
    title: 'Xa Inhibitor Reversal',
    body: '**Applies to: apixaban, rivaroxaban, edoxaban**\n\n**Option 1: [4-Factor PCC](#/drug/pcc-4factor/doac ich)**\n• 50 IU/kg IV\n• Most widely available option\n• Onset: 15–30 minutes\n\n**Option 2: Andexanet alfa (Andexxa)**\n• Specific Xa inhibitor reversal agent\n• Dosing depends on agent and time since last dose\n• Note: recently withdrawn from US market due to thrombotic concerns — availability varies\n\n**If last dose within 2h (intubated patient):**\n• Activated charcoal 50 g via OG/NG tube\n\n**Monitoring:**\n• Anti-Xa levels if available (not required before treatment)\n• Repeat CT at 6h to assess for expansion\n• Watch for thrombotic complications post-reversal',
    citation: [1, 2, 4, 5],
    treatment: {
      firstLine: {
        drug: '4-Factor PCC',
        dose: '50 IU/kg',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Most widely available. Onset 15-30 min. Consider activated charcoal 50 g via OG/NG if last dose within 2h (intubated only).',
      },
      alternative: {
        drug: 'Andexanet alfa (Andexxa)',
        dose: 'Varies by agent and time since last dose',
        route: 'IV',
        frequency: 'Bolus then infusion',
        duration: 'Per protocol',
        notes: 'Specific Xa reversal agent. Limited availability. Watch for thrombotic complications.',
      },
      monitoring: 'Anti-Xa levels if available (not required before treatment). Repeat CT at 6h. Monitor for thrombotic complications post-reversal.',
    },
    next: 'ich-bp',
  },

  {
    id: 'ich-heparin-rev',
    type: 'info',
    module: 2,
    title: 'Heparin / LMWH Reversal',
    body: '**Unfractionated Heparin (UFH):**\n• [Protamine](#/drug/protamine/heparin reversal) 1 mg per 100 units UFH given in prior 2–3h\n• Max single dose: 50 mg\n• Onset: 5 minutes — complete reversal\n• Check PTT 15 min after administration\n\n**LMWH (enoxaparin):**\n• [Protamine](#/drug/protamine/lmwh reversal) — partial reversal only (~60%)\n• If enoxaparin given within 8h: Protamine 1 mg per 1 mg enoxaparin\n• If 8–12h: Protamine 0.5 mg per 1 mg enoxaparin\n• If >12h: likely no benefit\n\n**Thrombolysis-associated ICH:**\n• Cryoprecipitate 10 units (to replenish fibrinogen)\n• [Tranexamic acid](#/drug/tranexamic-acid/ich hemostasis) 1 g IV\n• Target fibrinogen >200 mg/dL\n• Platelets if count <100,000',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Protamine',
        dose: '1 mg per 100 units UFH (max 50 mg)',
        route: 'IV slow push',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'For UFH given in prior 2-3h. Onset 5 min. For LMWH: 1 mg per 1 mg enoxaparin if within 8h (partial reversal ~60%).',
      },
      alternative: {
        drug: 'TXA + Cryoprecipitate (tPA-associated ICH)',
        dose: 'TXA 1 g IV + Cryoprecipitate 10 units',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'For thrombolysis-associated ICH. Target fibrinogen >200 mg/dL. Add platelets if count <100,000.',
      },
      monitoring: 'Check PTT 15 min after protamine. Fibrinogen level for tPA-associated ICH.',
    },
    next: 'ich-bp',
  },

  {
    id: 'ich-coag-adj',
    type: 'info',
    module: 2,
    title: 'Hemostatic Adjuncts',
    body: '**Not on anticoagulation — consider adjunct measures:**\n\n**Tranexamic acid (TXA):**\n• [TXA](#/drug/tranexamic-acid/ich hemostasis) 1 g IV over 10 min (within 3h of onset)\n• Significant reduction in hematoma expansion (OR 0.82)\n• Did NOT improve mortality or functional outcomes in TICH-2\n• May be considered — TICH-3 trial underway\n\n**Antiplatelet agents:**\n• Platelet transfusion is **NOT recommended** (PATCH trial — worse outcomes)\n• [Desmopressin (DDAVP)](#/drug/desmopressin/ich hemostasis) 0.3 mcg/kg IV may be considered (limited evidence, DASH pilot)\n\n**Thrombocytopenia:**\n• Target platelets >100,000 if possible\n• Transfuse platelets if count <100,000\n\n**Coagulation factors:**\n• Check fibrinogen — supplement with cryoprecipitate if <200 mg/dL\n• Correct any identified coagulopathy',
    citation: [1, 2, 6],
    treatment: {
      firstLine: {
        drug: 'Tranexamic acid (TXA)',
        dose: '1 g',
        route: 'IV over 10 min',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Give within 3h of onset. Reduces hematoma expansion but no proven mortality benefit (TICH-2).',
      },
      alternative: {
        drug: 'Desmopressin (DDAVP)',
        dose: '0.3 mcg/kg',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Consider for patients on antiplatelet agents. Limited evidence (DASH pilot). Do NOT transfuse platelets (PATCH trial: worse outcomes).',
      },
      monitoring: 'Platelet count (target >100,000). Fibrinogen level (target >200 mg/dL, supplement with cryoprecipitate if low).',
    },
    next: 'ich-bp',
  },

  // =====================================================================
  // MODULE 3: BLOOD PRESSURE MANAGEMENT
  // =====================================================================

  {
    id: 'ich-bp',
    type: 'info',
    module: 3,
    title: 'Blood Pressure Control',
    body: '**Treat pain and anxiety FIRST** — hypertension may be secondary. Proper analgesia/sedation (especially in intubated patients) can significantly improve BP.\n\n**AHA/ASA 2022 BP Targets:**\n• SBP 150–220 → target **130–150 mmHg** (reasonable)\n• SBP >220 → target **140–180 mmHg** (less evidence)\n• **Avoid SBP <130** — potentially harmful\n• **Avoid drops >70 mmHg** in first hour\n\n**Timing:** Maximum benefit when started immediately (hematoma expansion risk highest in first 3h). Transition to oral agents after >24h if stable.\n\n**Preferred IV agents:**\n• [Clevidipine](#/drug/clevidipine/ich blood pressure) — smoothest titration (t½ ~1 min)\n• [Nicardipine](#/drug/nicardipine/ich blood pressure) — more widely available, less expensive\n• [Labetalol](#/drug/labetalol/ich blood pressure) — bolus dosing option\n\n**Avoid:** Nitroprusside, nitroglycerin, hydralazine — may increase ICP.',
    citation: [1, 2, 7, 8],
    treatment: {
      firstLine: {
        drug: 'Nicardipine',
        dose: '5 mg/h, titrate by 2.5 mg/h q5-15min (max 15 mg/h)',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until stable, then transition to PO >24h',
        notes: 'Target SBP 130-150 if presenting SBP 150-220. Avoid SBP <130 or drops >70 mmHg in first hour.',
      },
      alternative: {
        drug: 'Labetalol',
        dose: '10-20 mg IV q10-20min (max 300 mg) or 0.5-2 mg/min infusion',
        route: 'IV',
        frequency: 'q10-20min boluses or continuous infusion',
        duration: 'Until stable',
        notes: 'Alternative if CCB contraindicated. Clevidipine (1-2 mg/h, titrate q90sec) has smoothest titration if available.',
      },
      monitoring: 'Arterial line preferred. BP q5min during titration. Neuro checks q1h. Target SBP 130-150.',
    },
    next: 'ich-location',
  },

  // =====================================================================
  // MODULE 4: SURGICAL CONSIDERATIONS
  // =====================================================================

  {
    id: 'ich-location',
    type: 'question',
    module: 4,
    title: 'Hematoma Location',
    body: 'Hematoma location determines surgical approach and prognosis.\n\n**Supratentorial (most common):**\n• Basal ganglia/external capsule (60–65%)\n• Thalamus (15–20%)\n• Lobar (cortical)\n\n**Infratentorial:**\n• Cerebellar (5–10%) — unique urgency\n• Pontine (5%) — poor prognosis regardless\n\n**Intraventricular extension** occurs in >40% and worsens prognosis.',
    citation: [1, 3],
    options: [
      {
        label: 'Supratentorial',
        description: 'Basal ganglia, thalamic, or lobar hemorrhage',
        next: 'ich-supra-surg',
      },
      {
        label: 'Cerebellar',
        description: 'Posterior fossa — risk of brainstem compression',
        next: 'ich-cerebellar-surg',
        urgency: 'critical',
      },
      {
        label: 'Significant Intraventricular Hemorrhage',
        description: 'Blood in ventricles ± hydrocephalus',
        next: 'ich-ivh-evd',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'ich-supra-surg',
    type: 'info',
    module: 4,
    title: 'Supratentorial Hematoma',
    body: '**Evidence for surgical evacuation is limited:**\n\n**STITCH-I Trial** (1,033 patients): No benefit from early surgery overall. Possible trend toward benefit for hematomas within 1 cm of cortical surface and lobar hemorrhage with GCS 9–12.\n\n**STITCH-II Trial** (601 patients): Focused on predicted surgical benefit subgroup — still no significant difference vs conservative management.\n\n**Possible indications for craniotomy:**\n• Large hematoma with significant midline shift\n• Elevated ICP refractory to medical management\n• Hemorrhage secondary to resectable lesion (AVM, tumor)\n• Lobar location, no IVH extension, very early presentation\n\n**Emerging:** Minimally invasive surgery (MISTIE III) — may be more promising than traditional craniotomy.\n\n**Decompressive hemicraniectomy:** Consider for massive edema with impending herniation when other options exhausted.\n\nConsult neurosurgery for all supratentorial ICH — even if medical management planned initially.',
    citation: [9, 10, 11],
    next: 'ich-seizures',
  },

  {
    id: 'ich-cerebellar-surg',
    type: 'info',
    module: 4,
    title: 'Cerebellar Hematoma — Surgical Emergency',
    body: '**The cerebellum is unique — patients may deteriorate rapidly (12–24h).**\n\nRisks of cerebellar hemorrhage:\n• Direct brainstem compression → catastrophic damage\n• 4th ventricle compression → obstructive hydrocephalus\n• Upward transtentorial herniation\n\n**Paradox:** Cerebellar ICH patients tend to have better prognosis than other ICH types IF timely surgical intervention is performed.\n\n**AHA/ASA 2022 — Immediate surgical evacuation if:**\n• Hematoma volume **>15 mL**\n• Neurological deterioration\n• Brainstem compression\n• Hydrocephalus\n\n**Important:** Ventriculostomy (EVD) alone without posterior fossa decompression is **NOT recommended** — increases risk of upward transtentorial herniation.\n\nEVD pressure may not accurately reflect posterior fossa pressure.\n\nConsult neurosurgery **immediately** — this is a time-critical surgical emergency.',
    citation: [1, 2],
    next: 'ich-seizures',
  },

  {
    id: 'ich-ivh-evd',
    type: 'info',
    module: 4,
    title: 'Intraventricular Hemorrhage & EVD',
    body: '**IVH occurs in >40% of ICH patients and worsens prognosis.**\n\nComplications:\n• Hydrocephalus and elevated ICP\n• Central (neurogenic) fever\n\n**External Ventricular Drain (EVD):**\n• **Indicated** for hydrocephalus contributing to reduced consciousness\n• Ideal candidate: initially well, then develops hydrocephalus with neuroworsening\n• **Caveat:** EVD increases survival but may not increase rate of good neurologic outcome\n\n**Intraventricular tPA (CLEAR III Trial):**\n• 500 patients randomized to intraventricular tPA vs saline via EVD\n• Improved survival but did NOT increase good functional outcomes\n• May be considered when: predominantly IVH without large parenchymal hematoma, and hydrocephalus might resolve with clot dissolution\n\nConsult neurosurgery for EVD placement. Monitor ICP continuously.',
    citation: [1, 12, 13],
    next: 'ich-seizures',
  },

  // =====================================================================
  // MODULE 5: ICU MANAGEMENT
  // =====================================================================

  {
    id: 'ich-seizures',
    type: 'info',
    module: 5,
    title: 'Seizure Management',
    body: '**Incidence:** ~10% convulsive seizures; subclinical seizure rate is substantially higher.\n\n**Risk factors:**\n• Cortical involvement (lobar hemorrhages)\n• Coexisting subarachnoid or subdural hemorrhage\n• Rebleeding\n\n**Continuous EEG monitoring indications:**\n• Impaired consciousness disproportionate to CT findings\n• Unexplained fluctuations in mental status\n• Any witnessed seizure or clinical signs of seizure\n\n**Treatment:**\n• **Seizure prophylaxis is NOT recommended** — prior evidence showed no benefit with phenytoin, and phenytoin has numerous side effects\n• **Treat witnessed seizure, EEG seizure, or nonconvulsive status epilepticus:**\n  – [Levetiracetam](#/drug/levetiracetam/ich seizure) 20 mg/kg IV (max 3000 mg) — preferred first-line\n  – Avoid phenytoin (may worsen outcomes in ICH)',
    citation: [1, 14, 15],
    treatment: {
      firstLine: {
        drug: 'Levetiracetam',
        dose: '20 mg/kg IV (max 3000 mg)',
        route: 'IV',
        frequency: 'Loading dose, then q12h maintenance',
        duration: 'Acute phase, taper per neurology',
        notes: 'Preferred first-line. Treat witnessed seizure, EEG seizure, or NCSE only. Prophylaxis NOT recommended.',
      },
      monitoring: 'Continuous EEG if impaired consciousness disproportionate to CT, unexplained mental status changes, or witnessed seizure.',
    },
    next: 'ich-icp-fever',
  },

  {
    id: 'ich-icp-fever',
    type: 'info',
    module: 5,
    title: 'ICP, Sodium & Fever',
    body: '**Intracranial Pressure:**\n• ICP elevation from mass effect, perihematomal edema, and/or obstructive hydrocephalus\n• **Edema peaks at ~5–6 days** — anticipate delayed neurological deterioration\n• Boluses of hypertonic saline or hypertonic bicarbonate for acute ICP crisis (bridge to EVD or surgery)\n• Routine hypertonic saline not supported by evidence\n\n**Sodium:**\n• Avoid hyponatremia or rapid decreases in sodium — worsens cerebral edema\n• Target Na >135 mEq/L\n\n**Fever:**\n• Treat aggressively with [acetaminophen](#/drug/acetaminophen/fever) — also provides analgesic benefit\n• **Neurogenic fever** may occur, especially with IVH extension — diagnosis of exclusion\n• Work up infection first (blood/urine cultures, CXR)\n• For refractory neurogenic fever: bromocriptine\n• INTREPID trial: automated surface cooling does NOT improve outcomes — do not use enforced normothermia devices routinely',
    citation: [1, 16],
    next: 'ich-dvt',
  },

  {
    id: 'ich-dvt',
    type: 'info',
    module: 5,
    title: 'DVT Prophylaxis',
    body: '**AHA/ASA 2022 recommendations:**\n\n**Immediately:**\n• Intermittent pneumatic compression (IPC) — start on admission\n\n**After 24–48 hours:**\n• If ICH has demonstrated stability on serial imaging:\n  – Low-dose [UFH](#/drug/ufh/dvt prophylaxis) 5000 units SQ q8–12h\n  – OR [Enoxaparin](#/drug/enoxaparin/dvt prophylaxis) 40 mg SQ daily\n  – Starting chemical DVT prophylaxis is reasonable\n\n**Caution:**\n• Patients with underlying coagulopathy or imaging evidence of ongoing hemorrhage expansion may require individualized approach\n• Weigh bleeding risk vs thromboembolism risk (ICH patients are immobilized, high VTE risk)\n\nHigh-risk for DVT: immobilization, weakness/paralysis, older age, obesity.',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Enoxaparin',
        dose: '40 mg',
        route: 'SQ',
        frequency: 'Daily',
        duration: 'Until ambulatory',
        notes: 'Start after 24-48h if ICH stable on serial imaging. Use IPC immediately on admission.',
      },
      alternative: {
        drug: 'UFH (unfractionated heparin)',
        dose: '5000 units',
        route: 'SQ',
        frequency: 'q8-12h',
        duration: 'Until ambulatory',
        notes: 'Alternative to enoxaparin. Individualize if coagulopathy or ongoing expansion.',
      },
      monitoring: 'Serial CT to confirm hemorrhage stability before starting chemical prophylaxis. Monitor for signs of DVT/PE.',
    },
    next: 'ich-disposition',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION & PROGNOSIS
  // =====================================================================

  {
    id: 'ich-disposition',
    type: 'result',
    module: 6,
    title: 'Disposition & Prognosis',
    body: '**All ICH patients → ICU admission** for continuous neuro monitoring and BP management.\n\n**Ongoing care:**\n• Neuro checks q1h minimum (more frequent during acute phase)\n• Serial CT: 6h, 24h, and with any neuro decline\n• ICP monitoring if EVD placed\n• Transition IV antihypertensives to PO after >24h if stable\n• DVT prophylaxis per protocol\n• Early rehabilitation consultation\n• Goals of care discussion with family — especially for severe ICH\n\n**Prognostication:**\n• [ICH Score](#/calculator/ich-score) — 30-day mortality prediction (0–6 points)\n• [FUNC Score](#/calculator/func-score) — 90-day functional independence (0–11 points)\n• [Prognostication Details & Limitations](#/info/ich-prognostication)\n\n**Overall prognosis:**\n• 30-day mortality: ~40%\n• 1-year survival: ~50%\n• Functional independence at 1 year: ~20%\n\n**[Cerebral Amyloid Angiopathy](#/info/ich-caa)** — if lobar ICH in elderly, normotensive patient\n\nRestart anticoagulation decisions should be individualized (typically deferred ≥4 weeks, and avoided entirely in CAA).',
    recommendation: 'Admit to ICU. Serial CT at 6h and 24h. IPC for DVT. Transition to PO antihypertensives when stable >24h. Early rehab and goals-of-care discussions.',
    confidence: 'definitive',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'ich-score', label: 'ICH Score' },
      { id: 'func-score', label: 'FUNC Score' },
    ],
  },

];

export const ICH_NODE_COUNT = ICH_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const ICH_MODULE_LABELS = [
  'Initial Assessment',
  'Coagulation Optimization',
  'Blood Pressure Control',
  'Surgical Considerations',
  'ICU Management',
  'Disposition & Prognosis',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const ICH_CRITICAL_ACTIONS = [
  { text: 'Do NOT delay anticoagulant reversal for labs - start empiric reversal immediately', nodeId: 'ich-anticoag' },
  { text: 'Warfarin ICH: 4-factor PCC 25-50 IU/kg + Vitamin K 10 mg IV - target INR <1.4', nodeId: 'ich-warfarin-rev' },
  { text: 'Dabigatran ICH: Idarucizumab 5g IV (two 2.5g boluses) - immediate complete reversal', nodeId: 'ich-dabi-rev' },
  { text: 'Xa inhibitor ICH: 4-factor PCC 50 IU/kg - most widely available option', nodeId: 'ich-xa-rev' },
  { text: 'Target SBP 130-150 mmHg with nicardipine or clevidipine - avoid drops >70 mmHg first hour', nodeId: 'ich-bp' },
  { text: 'Do NOT transfuse platelets for antiplatelet-associated ICH (PATCH trial: worse outcomes)', nodeId: 'ich-coag-adj' },
  { text: 'Cerebellar hematoma >15 mL: immediate surgical evacuation - do NOT just place EVD', nodeId: 'ich-cerebellar-surg' },
  { text: 'Seizure prophylaxis NOT recommended - treat only witnessed or EEG-confirmed seizures', nodeId: 'ich-seizures' },
  { text: 'IPC immediately, chemical DVT prophylaxis after 24-48h if ICH stable on repeat CT', nodeId: 'ich-dvt' },
  { text: 'Perihematomal edema peaks at 5-6 days - anticipate delayed deterioration', nodeId: 'ich-icp-fever' },
];

export const ICH_CITATIONS: Citation[] = [
  { num: 1, text: 'Greenberg SM, Ziai WC, Cordonnier C, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage. Stroke. 2022;53(7):e282-e361.' },
  { num: 2, text: 'Steiner T, Purrucker JC, Aguiar de Sousa D, et al. European Stroke Organisation (ESO) and European Association of Neurosurgical Societies (EANS) guideline on stroke due to spontaneous intracerebral haemorrhage. Eur Stroke J. 2025;10(4):1007-1086.' },
  { num: 3, text: 'Nobleza COS. Intracerebral Hemorrhage. Continuum (Minneap Minn). 2021;27(5):1246-1277.' },
  { num: 4, text: 'Tomaselli GF, Mahaffey KW, Cuker A, et al. 2020 ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants. J Am Coll Cardiol. 2020;76(5):594-622.' },
  { num: 5, text: 'Frontera JA, Lewin JJ, Rabinstein AA, et al. Guideline for Reversal of Antithrombotics in Intracranial Hemorrhage. Crit Care Med. 2016;44(12):2251-2257.' },
  { num: 6, text: 'Baharoglu MI, Cordonnier C, Al-Shahi Salman R, et al. Platelet transfusion versus standard care after acute stroke due to spontaneous cerebral haemorrhage (PATCH). Lancet. 2016;387(10038):2605-2613.' },
  { num: 7, text: 'Anderson CS, Heeley E, Huang Y, et al. Rapid blood-pressure lowering in patients with acute intracerebral hemorrhage (INTERACT2). N Engl J Med. 2013;368(25):2355-2365.' },
  { num: 8, text: 'Qureshi AI, Palesch YY, Barsan WG, et al. Intensive Blood-Pressure Lowering in Patients with Acute Cerebral Hemorrhage (ATACH-2). N Engl J Med. 2016;375(11):1033-1043.' },
  { num: 9, text: 'Mendelow AD, Gregson BA, Fernandes HM, et al. Early surgery versus initial conservative treatment in patients with spontaneous supratentorial intracerebral haematomas (STITCH). Lancet. 2005;365(9457):387-397.' },
  { num: 10, text: 'Mendelow AD, Gregson BA, Rowan EN, et al. Early surgery versus initial conservative treatment in patients with spontaneous supratentorial lobar intracerebral haematomas (STITCH II). Lancet. 2013;382(9890):397-408.' },
  { num: 11, text: 'Schrag M, Kirshner H. Management of Intracerebral Hemorrhage: JACC Focus Seminar. J Am Coll Cardiol. 2020;75(15):1819-1831.' },
  { num: 12, text: 'Nieuwkamp DJ, de Gans K, Rinkel GJ, Algra A. Treatment and outcome of severe intraventricular extension in patients with subarachnoid or intracerebral hemorrhage: a systematic review. J Neurol. 2000;247(2):117-121.' },
  { num: 13, text: 'Hanley DF, Lane K, McBee N, et al. Thrombolytic removal of intraventricular haemorrhage in treatment of severe stroke (CLEAR III). Lancet. 2017;389(10069):603-611.' },
  { num: 14, text: 'Magid-Bernstein J, Girard R, Polster S, et al. Cerebral Hemorrhage: Pathophysiology, Treatment, and Future Directions. Circ Res. 2022;130(8):1204-1229.' },
  { num: 15, text: 'Hemphill JC 3rd, Greenberg SM, Anderson CS, et al. Guidelines for the Management of Spontaneous Intracerebral Hemorrhage: A Guideline for Healthcare Professionals (AHA/ASA). Stroke. 2015;46(7):2032-2060.' },
  { num: 16, text: 'O\'Carroll CB, Brown BL, Freeman WD. Intracerebral Hemorrhage: A Common yet Disproportionately Deadly Stroke Subtype. Mayo Clin Proc. 2021;96(6):1639-1654.' },
];

// -------------------------------------------------------------------
// Clinical Notes (for reference table)
// -------------------------------------------------------------------

export const ICH_CLINICAL_NOTES: string[] = [
  'Do NOT delay anticoagulant reversal while awaiting labs — empiric reversal should begin immediately upon identifying the agent.',
  'SBP target 130–150 mmHg when presenting SBP is 150–220. Avoid drops >70 mmHg in the first hour and avoid SBP <130.',
  'Platelet transfusion is NOT recommended for ICH on antiplatelets (PATCH trial — worse outcomes).',
  'Seizure prophylaxis is NOT recommended. Treat only witnessed or EEG-confirmed seizures.',
  'Cerebellar hematoma >15 mL with brainstem compression or hydrocephalus requires immediate surgical evacuation.',
  'EVD alone without posterior fossa decompression is NOT recommended for cerebellar hemorrhage — risk of upward herniation.',
  'Perihematomal edema peaks at ~5–6 days — anticipate delayed deterioration.',
];
