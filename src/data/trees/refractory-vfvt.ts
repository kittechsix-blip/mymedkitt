// MedKitt — Refractory VF/VT
// DOSE-VF Protocol: Optimize Basics → Vector Change → DSD → Pharmacology → ECPR → Emerging
// 6 modules: Recognition → Optimize Basics → Advanced Defibrillation → Pharmacology → ECPR → Emerging Therapies
// ~28 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const REFRACTORY_VFVT_CRITICAL_ACTIONS = [
  { text: 'Change pad position to AP after 3 failed shocks', nodeId: 'rvf-vector-change' },
  { text: 'Double sequential defibrillation with 2 defibrillators', nodeId: 'rvf-dsd-setup' },
  { text: 'Amiodarone 300 mg IV or lidocaine 1-1.5 mg/kg', nodeId: 'rvf-antiarrhythmic-dose' },
  { text: 'Esmolol 500 mcg/kg if refractory after standard therapy', nodeId: 'rvf-esmolol-dose' },
  { text: 'Activate ECPR if criteria met (<60 min to flow)', nodeId: 'rvf-ecpr-activate' },
  { text: 'Treat reversible causes: hyperK, toxins, PE', nodeId: 'rvf-hs-ts' },
  { text: 'Epinephrine 1 mg IV/IO every 3-5 minutes', nodeId: 'rvf-epi-timing' },
];

export const REFRACTORY_VFVT_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'rvf-start',
    type: 'info',
    module: 1,
    title: 'Refractory VF/VT',
    body: '**Definition:** VF or pulseless VT persisting after:\n• 3+ defibrillation attempts with 2-minute CPR cycles\n• Standard ACLS interventions (epi, antiarrhythmic)\n\n**2025 AHA terminology:** "Persisting VF/pVT" (preferred when mechanism unclear) [1][2]\n\n**Subtypes:**\n| Type | Definition |\n|------|------------|\n| True shock-refractory | VF never terminates |\n| Recurrent VF | VF terminates but refibrillates <5 sec |\n| Electrical storm | 3+ sustained VT/VF in 24h |\n\n**Incidence:** 10-25% of OHCA; survival only 2-12% with standard care [1]',
    images: [
      { src: 'images/refractory-vfvt/vf-ecg-tracing.png', alt: 'ECG tracing showing ventricular fibrillation', caption: 'Ventricular fibrillation: chaotic, disorganized waveform with no discernible QRS complexes. Refractory VF persists after 3+ defibrillation attempts — requires escalation beyond standard ACLS. CC BY-SA 3.0 Wikimedia Commons.' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'ecpr-criteria', label: 'ECPR Criteria Checklist' },
      { id: 'dsd-setup', label: 'DSD Setup Guide' },
      { id: 'esmolol-calc', label: 'Esmolol Calculator' },
    ],
    next: 'rvf-optimize',

    summary: 'VF/pVT persisting after 3+ shocks and ACLS — 10-25% of OHCA, only 2-12% survival with standard care',
    skippable: true,
  },

  // =====================================================================
  // MODULE 2: OPTIMIZE BASICS
  // =====================================================================

  {
    id: 'rvf-optimize',
    type: 'info',
    module: 2,
    title: 'Optimize Basics (Before Escalation)',
    body: '**Pad Placement Check:**\n• Standard: Anterolateral (AL) — right infraclavicular + left lateral chest\n• Vector change: Anterior-Posterior (AP) — left parasternal + left infrascapular\n• **After 3 failed shocks → switch to AP position** [1][3]\n\n**CPR Quality:**\n• Rate: 100-120/min\n• Depth: ≥2 inches (5 cm)\n• Full chest recoil\n• Minimize interruptions (<10 sec for shocks)\n• Consider mechanical CPR (LUCAS, AutoPulse) for prolonged resuscitation [2]',
    citation: [1, 2, 3],
    next: 'rvf-epi-timing',

    summary: 'Switch pads to AP position after 3 failed shocks, ensure CPR quality 100-120/min and full recoil',
  },

  {
    id: 'rvf-epi-timing',
    type: 'info',
    module: 2,
    title: 'Epinephrine Timing (2025 AHA)',
    body: '| Rhythm | When to Give |\n|--------|-------------|\n| VF/pVT | After 2nd shock (not immediately) |\n| Asystole/PEA | ASAP |\n| Maintenance | 1 mg IV/IO every 3-5 min |\n\n**KEY:** Do NOT use high-dose epinephrine routinely (Class 3: No Benefit) [2]\n\n**Standard dosing:**\n• [Epinephrine](#/drug/epinephrine/acls) 1 mg IV/IO push every 3-5 minutes\n• Continue throughout resuscitation',
    citation: [2],
    next: 'rvf-hs-ts',
    treatment: {
      firstLine: {
        drug: 'Epinephrine',
        dose: '1 mg IV/IO push',
        route: 'IV/IO',
        frequency: 'Every 3-5 minutes',
        duration: 'Throughout resuscitation',
        notes: 'In VF/pVT, give after 2nd shock. High-dose NOT recommended.',
      },
      monitoring: 'Continuous rhythm, ETCO2, pulse checks',
    },

    summary: 'Epi 1mg IV/IO q3-5min — give after 2nd shock in VF/pVT, ASAP in asystole/PEA, no high-dose',
  },

  {
    id: 'rvf-hs-ts',
    type: 'question',
    module: 2,
    title: 'Reversible Causes — H\'s and T\'s',
    body: '**Search for and treat reversible causes:**\n\n**The H\'s:**\n• Hypoxia\n• Hypovolemia\n• Hydrogen ion (acidosis)\n• Hypo/Hyperkalemia\n• Hypothermia\n• Hypoglycemia\n\n**The T\'s:**\n• Tension pneumothorax\n• Tamponade (cardiac)\n• Toxins\n• Thrombosis — Coronary (MI)\n• Thrombosis — Pulmonary (PE)\n\nAny reversible cause identified?',
    citation: [2],
    options: [
      {
        label: 'Hyperkalemia suspected',
        next: 'rvf-hyperK',
        urgency: 'critical',
      },
      {
        label: 'Toxin/overdose suspected',
        next: 'rvf-toxin',
        urgency: 'critical',
      },
      {
        label: 'PE suspected',
        next: 'rvf-pe',
        urgency: 'critical',
      },
      {
        label: 'No clear reversible cause — escalate',
        next: 'rvf-vector-change',
      },
    ],

    summary: 'Systematically search Hs and Ts — hyperK, toxins, PE are treatable causes of refractory VF',
  },

  {
    id: 'rvf-hyperK',
    type: 'info',
    module: 2,
    title: 'Hyperkalemia Treatment Stack',
    body: '**During cardiac arrest:**\n\n1. **[Calcium chloride](#/drug/calcium-chloride/hyperK)** 1g IV (or Calcium gluconate 3g IV) — membrane stabilization\n2. **[Regular insulin](#/drug/regular-insulin/hyperK)** 10 units + **D50** 50 mL IV — intracellular shift\n3. **[Albuterol](#/drug/albuterol/hyperK)** 10-20 mg nebulized — intracellular shift\n4. **[Sodium bicarbonate](#/drug/sodium-bicarbonate/hyperK)** 50-100 mEq IV if acidotic\n5. **Dialysis** if refractory\n\n**Continue ACLS** while treating hyperkalemia [2]',
    citation: [2],
    next: 'rvf-vector-change',
    treatment: {
      firstLine: {
        drug: 'Calcium chloride',
        dose: '1g (10 mL of 10%) IV',
        route: 'IV push',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Membrane stabilization. Alternative: Calcium gluconate 3g IV.',
      },
      alternative: {
        drug: 'Insulin + D50',
        dose: 'Regular insulin 10 units + D50 50 mL',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Intracellular K shift. Add albuterol 10-20 mg neb.',
      },
      monitoring: 'Continue ACLS, check K when ROSC',
    },

    summary: 'Calcium chloride 1g IV for membrane stabilization, then insulin/D50 and albuterol for K shift',
    safetyLevel: 'critical',
  },

  {
    id: 'rvf-toxin',
    type: 'info',
    module: 2,
    title: 'Toxin-Induced VF/VT',
    body: '**Key antidotes during arrest:**\n\n| Toxin | Treatment |\n|-------|----------|\n| TCA | [NaHCO₃](#/drug/sodium-bicarbonate/tca) 1-2 mEq/kg IV, target pH 7.5 |\n| Beta-blocker | [Glucagon](#/drug/glucagon/bb) 5-10 mg IV, high-dose insulin |\n| CCB | [Calcium chloride](#/drug/calcium-chloride/ccb) 1-3g IV, high-dose insulin |\n| Digoxin | [DigiFab](#/drug/digifab/dig) |\n| Local anesthetic (LAST) | [Intralipid](#/drug/lipid-emulsion/last) 20% 1.5 mL/kg bolus |\n| Cocaine | Benzodiazepines, avoid beta-blockers |\n\n**Continue ACLS** while administering antidotes [2]',
    citation: [2],
    next: 'rvf-vector-change',

    summary: 'Match antidote to toxin — NaHCO3 for TCA, glucagon for BB, calcium for CCB, Intralipid for LAST',
    safetyLevel: 'critical',
  },

  {
    id: 'rvf-pe',
    type: 'info',
    module: 2,
    title: 'PE-Induced Cardiac Arrest',
    body: '**Massive PE with arrest:**\n\n• **[tPA](#/drug/alteplase/pe)** 50 mg IV bolus (half the systemic lysis dose)\n• Continue CPR for 60-90 minutes after thrombolytic\n• Consider ECPR if available\n\n**Relative contraindications may be overridden** in arrest setting — PE is a reversible cause [2]\n\n**Alternative:** Mechanical thrombectomy if ECMO available',
    citation: [2],
    next: 'rvf-vector-change',
    treatment: {
      firstLine: {
        drug: 'Alteplase (tPA)',
        dose: '50 mg IV bolus',
        route: 'IV push',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Continue CPR 60-90 min post-lytic. Half the standard systemic dose.',
      },
      monitoring: 'Continue ACLS, watch for ROSC',
    },

    summary: 'tPA 50mg IV bolus for PE arrest — continue CPR 60-90min post-lytic, consider ECPR',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 3: ADVANCED DEFIBRILLATION
  // =====================================================================

  {
    id: 'rvf-vector-change',
    type: 'info',
    module: 3,
    title: 'Vector Change Defibrillation',
    body: '**After 3 failed standard shocks → change vector:**\n\nMove pads to **AP position:**\n• Anterior: left parasternal\n• Posterior: left infrascapular\n\n**DOSE-VF Trial evidence:**\n• Vector change alone: 21.7% survival (vs 13.3% standard) [3]\n\n**Perform vector change BEFORE adding second defibrillator** — it\'s faster and may be sufficient',
    citation: [3],
    next: 'rvf-dsd-decision',

    summary: 'Move pads to AP position after 3 failed shocks — DOSE-VF showed 21.7% vs 13.3% survival',
  },

  {
    id: 'rvf-dsd-decision',
    type: 'question',
    module: 3,
    title: 'Double Sequential Defibrillation (DSD)',
    body: '**DOSE-VF Trial:** DSD showed 30.4% survival to discharge (vs 13.3% standard) [3]\n\n**Setup requires:**\n• Two defibrillators\n• Four defibrillation pads\n• Two operators (for near-simultaneous shock)\n\nIs a second defibrillator available?',
    citation: [3],
    options: [
      {
        label: 'Yes — proceed with DSD',
        next: 'rvf-dsd-setup',
        urgency: 'critical',
      },
      {
        label: 'No — continue with pharmacology',
        next: 'rvf-amio-lido',
      },
    ],

    summary: 'DSD showed 30.4% survival — requires two defibrillators, four pads, two operators',
  },

  {
    id: 'rvf-dsd-setup',
    type: 'info',
    module: 3,
    title: 'DSD Setup & Technique',
    body: '**Pad Placement:**\n```\nDefib 1: Right infraclavicular + Left lateral (standard AL)\nDefib 2: Left parasternal + Left posterior (AP)\n```\n\n**Technique:**\n1. Charge both defibrillators\n2. Shocks delivered <1 second apart (near-simultaneous)\n3. One operator per defibrillator\n4. Verbal countdown coordination\n\n**Energy:** Use maximum energy on both devices [3]',
    citation: [3],
    next: 'rvf-amio-lido',

    summary: 'Defib 1 in AL position, Defib 2 in AP — max energy, shocks <1 second apart with countdown',
  },

  // =====================================================================
  // MODULE 4: PHARMACOLOGY
  // =====================================================================

  {
    id: 'rvf-amio-lido',
    type: 'question',
    module: 4,
    title: 'Antiarrhythmic Selection',
    body: '**First-line antiarrhythmics (either is acceptable per AHA):**\n\n**[Amiodarone](#/drug/amiodarone/acls):**\n• First bolus: 300 mg IV/IO\n• Second bolus: 150 mg IV/IO\n\n**[Lidocaine](#/drug/lidocaine/acls):**\n• First bolus: 1-1.5 mg/kg IV/IO\n• Second bolus: 0.5-0.75 mg/kg\n\n**2025 update:** Target trial emulation suggests lidocaine may have higher prehospital ROSC rates [2]\n\nWhich antiarrhythmic has been given?',
    citation: [2],
    options: [
      {
        label: 'Amiodarone 300 mg given',
        next: 'rvf-esmolol-consider',
      },
      {
        label: 'Lidocaine given',
        next: 'rvf-esmolol-consider',
      },
      {
        label: 'Neither — give antiarrhythmic now',
        next: 'rvf-antiarrhythmic-dose',
      },
    ],

    summary: 'Choose amiodarone 300mg or lidocaine 1-1.5mg/kg — both acceptable per AHA, lidocaine may have higher prehospital ROSC',
  },

  {
    id: 'rvf-antiarrhythmic-dose',
    type: 'info',
    module: 4,
    title: 'Antiarrhythmic Dosing',
    body: '**[Amiodarone](#/drug/amiodarone/acls):**\n| Dose | Amount |\n|------|--------|\n| First bolus | 300 mg IV/IO |\n| Second bolus | 150 mg IV/IO |\n| Post-ROSC infusion | 1 mg/min x 6h, then 0.5 mg/min |\n| Max 24h | ~2.2 g |\n\n**[Lidocaine](#/drug/lidocaine/acls):**\n| Dose | Amount |\n|------|--------|\n| First bolus | 1-1.5 mg/kg IV/IO |\n| Second bolus | 0.5-0.75 mg/kg |\n| Infusion | 1-4 mg/min |\n| Max | 3 mg/kg total |',
    citation: [2],
    next: 'rvf-esmolol-consider',
    treatment: {
      firstLine: {
        drug: 'Amiodarone',
        dose: '300 mg IV/IO bolus',
        route: 'IV/IO',
        frequency: 'May repeat 150 mg',
        duration: 'Post-ROSC: 1 mg/min x 6h',
        notes: 'Max ~2.2g in 24h',
      },
      alternative: {
        drug: 'Lidocaine',
        dose: '1-1.5 mg/kg IV/IO',
        route: 'IV/IO',
        frequency: 'May repeat 0.5-0.75 mg/kg',
        duration: 'Infusion: 1-4 mg/min',
        notes: 'Max 3 mg/kg total',
      },
      monitoring: 'Continuous rhythm monitoring',
    },

    summary: 'Amiodarone 300mg then 150mg, or lidocaine 1-1.5mg/kg then 0.5-0.75mg/kg — post-ROSC infusion details',
  },

  {
    id: 'rvf-esmolol-consider',
    type: 'question',
    module: 4,
    title: 'Esmolol — Sympatholytic Strategy',
    body: '**Consider esmolol if:**\n• Still in VF after 3 shocks + 3 mg epi + 300 mg amiodarone [4]\n\n**Rationale:** Excessive catecholamines impair defibrillation; esmolol increases fibrillation threshold.\n\n**DOSING:**\n| Parameter | Dose |\n|-----------|------|\n| Bolus | 500 mcg/kg IV (or fixed 40 mg) |\n| Infusion | 50-100 mcg/kg/min |\n\nHas standard therapy failed?',
    citation: [4],
    options: [
      {
        label: 'Yes — give esmolol',
        next: 'rvf-esmolol-dose',
        urgency: 'critical',
      },
      {
        label: 'Continue standard ACLS',
        next: 'rvf-ecpr-assess',
      },
    ],

    summary: 'Consider esmolol 500mcg/kg bolus if still VF after 3 shocks + epi + amiodarone — counters catecholamine excess',
  },

  {
    id: 'rvf-esmolol-dose',
    type: 'info',
    module: 4,
    title: 'Esmolol Protocol',
    body: '**[Esmolol](#/drug/esmolol/vfvt) dosing:**\n\n**Bolus:** 500 mcg/kg IV (~40 mg for 80 kg patient)\n**Infusion:** Start 50 mcg/kg/min, titrate to 100 mcg/kg/min\n\n**Practical tips:**\n• Can give as fixed 40 mg bolus if weight unknown\n• Very short half-life (~9 min) — effect wears off quickly if ROSC\n• Continue CPR during administration\n\n**Evidence:** Observational data suggests improved ROSC rates [4]',
    citation: [4],
    next: 'rvf-ecpr-assess',
    treatment: {
      firstLine: {
        drug: 'Esmolol',
        dose: '500 mcg/kg IV bolus (or fixed 40 mg)',
        route: 'IV',
        frequency: 'Once, then infusion',
        duration: 'Infusion 50-100 mcg/kg/min',
        notes: 'Short half-life ~9 min. Consider after 3 shocks + epi + amio.',
      },
      monitoring: 'Continuous rhythm monitoring',
    },

    summary: 'Esmolol 500mcg/kg bolus (~40mg fixed), infuse 50-100mcg/kg/min — short t1/2 ~9min, continue CPR',
    safetyLevel: 'warning',
  },

  {
    id: 'rvf-other-agents',
    type: 'info',
    module: 4,
    title: 'Other Pharmacologic Options',
    body: '**Magnesium Sulfate:**\n• **Torsades de Pointes:** [Magnesium](#/drug/magnesium-sulfate/torsades) 2g IV over 2 min\n• **Routine refractory VF:** NOT recommended [2]\n\n**Sodium Bicarbonate:**\n• Severe acidosis (pH <7.2): 1 mEq/kg IV\n• Hyperkalemia: 50-100 mEq IV\n• TCA overdose: 1-2 mEq/kg IV\n• **Routine use:** NOT recommended [2]\n\n**Procainamide:**\n• 20 mg/min up to 17 mg/kg\n• Used for stable VT, uncertain in arrest',
    citation: [2],
    next: 'rvf-ecpr-assess',

    summary: 'MgSO4 only for torsades, NaHCO3 only for acidosis/hyperK/TCA — neither for routine refractory VF',
  },

  // =====================================================================
  // MODULE 5: ECPR
  // =====================================================================

  {
    id: 'rvf-ecpr-assess',
    type: 'question',
    module: 5,
    title: 'ECPR Assessment',
    body: '**ELSO Criteria for ECPR:**\n\n✓ Witnessed arrest\n✓ Initial shockable rhythm\n✓ Bystander CPR initiated\n✓ Age <70 years\n✓ Presumed reversible cause (MI, PE, hypothermia, toxin)\n✓ Refractory to standard ACLS 10-20 min\n\n**Time targets:**\n• Decision to cannulate: by 10-15 min of refractory arrest\n• Collapse to ECMO flow: <60 minutes\n• No-flow time: <5 minutes [5]',
    citation: [5],
    options: [
      {
        label: 'ECPR criteria met — activate team',
        next: 'rvf-ecpr-activate',
        urgency: 'critical',
      },
      {
        label: 'ECPR contraindicated or unavailable',
        next: 'rvf-emerging',
      },
    ],

    summary: 'ELSO criteria: witnessed, shockable, bystander CPR, age <70, reversible cause, collapse-to-flow <60min',
  },

  {
    id: 'rvf-ecpr-activate',
    type: 'info',
    module: 5,
    title: 'ECPR Activation',
    body: '**ECPR Contraindications:**\n• Known severe neurologic impairment pre-arrest\n• Metastatic malignancy or terminal illness\n• No-flow >5 minutes (no bystander CPR)\n• Prolonged low-flow (>60 min in non-hypothermic)\n• Irreversible primary disease\n• Severe sepsis or hemorrhagic shock [5]\n\n**If proceeding:**\n1. Continue high-quality CPR\n2. ECMO team cannulates (typically femoral VA)\n3. Target ECMO flow: 3-4 L/min\n4. Identify and treat underlying cause once on ECMO\n\n**ELSO Registry:** 29% survival to discharge with ECPR [5]',
    citation: [5],
    next: 'rvf-emerging',

    summary: 'ECPR contraindications: no-flow >5min, >60min low-flow, terminal illness — ELSO 29% survival to discharge',
  },

  // =====================================================================
  // MODULE 6: EMERGING THERAPIES
  // =====================================================================

  {
    id: 'rvf-emerging',
    type: 'question',
    module: 6,
    title: 'Emerging Therapies',
    body: '**Advanced options for truly refractory VF:**\n\n1. **Stellate ganglion block** — interrupts sympathetic outflow to heart\n2. **Overdrive pacing** — suppresses PVCs, shortens vulnerable period\n3. **Emergency catheter ablation** — if on ECMO with ongoing storm\n\nAre any of these available?',
    citation: [6, 7],
    options: [
      {
        label: 'Stellate ganglion block available',
        next: 'rvf-sgb',
      },
      {
        label: 'Overdrive pacing possible',
        next: 'rvf-pacing',
      },
      {
        label: 'None available — continue ACLS',
        next: 'rvf-termination',
      },
    ],

    summary: 'Stellate ganglion block, overdrive pacing, or catheter ablation — last-resort options for truly refractory VF',
  },

  {
    id: 'rvf-sgb',
    type: 'info',
    module: 6,
    title: 'Stellate Ganglion Block (SGB)',
    body: '**Mechanism:** Interrupts sympathetic outflow to myocardium\n\n**STAR Study (2024):** 131 patients, 19 centers [6]\n• 92% arrhythmia suppression\n• Complication rate: 1%\n• Periprocedural mortality: <1%\n\n**Technique:**\n1. Ultrasound-guided at C6 (Chassaignac\'s tubercle)\n2. **Left-sided** block preferred (more cardiac autonomic regulation)\n3. Inject 10 mL of 1% lidocaine\n4. Success marker: Ipsilateral Horner\'s syndrome (not required)\n\n**Consider when:** Refractory to intubation, sedation, antiarrhythmics; no VA-ECMO available',
    citation: [6],
    next: 'rvf-termination',

    summary: 'US-guided left C6 block with 10mL 1% lidocaine — STAR study: 92% arrhythmia suppression, 1% complications',
  },

  {
    id: 'rvf-pacing',
    type: 'info',
    module: 6,
    title: 'Overdrive Pacing',
    body: '**Mechanism:** Pacing 40% above baseline rate suppresses PVCs and shortens vulnerable period\n\n**Indications:**\n• Brady-dependent R-on-T phenomenon\n• Pause-dependent polymorphic VT\n• Drug-refractory electrical storm\n\n**Protocol:**\n1. Temporary transvenous pacing\n2. Start at 110-120 bpm\n3. Continue 24-48 hours as bridge to definitive therapy\n4. Titrate rate until PVCs/VT disappear\n\n**Evidence:** French multicenter study showed immediate arrhythmia control in majority of post-MI VF storms [7]',
    citation: [7],
    next: 'rvf-termination',

    summary: 'Pace 40% above baseline rate to suppress PVCs — transvenous at 110-120bpm for 24-48h bridge',
  },

  {
    id: 'rvf-termination',
    type: 'result',
    module: 6,
    title: 'Resuscitation Termination Considerations',
    body: '**No universal criteria** — consider termination when:\n\n• Prolonged arrest (>60 min in non-hypothermic)\n• No ROSC despite all interventions\n• No reversible cause identified\n• ECPR not available or contraindicated\n• Irreversible comorbidities\n\n**Continue resuscitation if:**\n• Reversible cause still being treated\n• ECPR in progress or available\n• Hypothermic cardiac arrest (warm and dead)\n• Drug overdose (may require prolonged CPR)\n\n**Document** all interventions and reasoning for termination decision.',
    recommendation: 'Consider termination after prolonged arrest with no reversible cause and no ECPR. Continue if reversible cause, hypothermia, or toxin.',
    confidence: 'consider',
    citation: [2],
  },

  {
    id: 'rvf-post-rosc',
    type: 'result',
    module: 6,
    title: 'Post-ROSC Management',
    body: '**Immediate post-ROSC:**\n\n1. **Antiarrhythmic infusion:** Continue amiodarone or lidocaine drip\n2. **Target hemodynamics:** SBP >90, MAP >65\n3. **Sedation:** Propofol or dexmedetomidine (sympatholytic)\n4. **Temperature management:** Target 32-36°C per 2025 AHA\n5. **Cardiology consult:** Emergent cath if STEMI or high suspicion ACS\n6. **Electrolytes:** Correct K, Mg\n\n→ [Full Post-Cardiac Arrest Care Protocol](#/tree/post-rosc)\n\n**Disposition:** ICU with continuous telemetry\n\n← [Return to Cardiac Arrest Hub](#/tree/cardiac-arrest)',
    recommendation: 'Antiarrhythmic infusion, targeted temperature management, emergent cath if indicated, ICU admission.',
    confidence: 'definitive',
    citation: [2],
    treatment: {
      firstLine: {
        drug: 'Amiodarone infusion',
        dose: '1 mg/min x 6 hours, then 0.5 mg/min',
        route: 'IV',
        frequency: 'Continuous',
        duration: '24 hours total',
        notes: 'Or lidocaine 1-4 mg/min. Continue antiarrhythmic post-ROSC.',
      },
      monitoring: 'ICU, telemetry, TTM, emergent cath consideration',
    },
  },

];

export const REFRACTORY_VFVT_MODULE_LABELS = [
  'Recognition',
  'Optimize Basics',
  'Advanced Defibrillation',
  'Pharmacology',
  'ECPR',
  'Emerging Therapies',
];

export const REFRACTORY_VFVT_CITATIONS: Citation[] = [
  { num: 1, text: 'Farkas J. Ventricular Arrhythmias (Electrical Storm). Internet Book of Critical Care (IBCC). 2024.' },
  { num: 2, text: 'AHA. 2025 Adult Advanced Life Support Guidelines. Circulation. 2025;151:e1-e103.' },
  { num: 3, text: 'Cheskes S, et al. DOSE-VF Trial: Defibrillation Strategies for Refractory VF. NEJM. 2022;387:1947-1956.' },
  { num: 4, text: 'EM Cases. Esmolol in Refractory Ventricular Fibrillation. Emergency Medicine Cases. 2023.' },
  { num: 5, text: 'ELSO. ECPR Guidelines. Extracorporeal Life Support Organization. 2023.' },
  { num: 6, text: 'STAR Study Investigators. Stellate Ganglion Block for VT/VF. Eur Heart J. 2024;45:823-830.' },
  { num: 7, text: 'European Heart Journal. Overdrive Pacing for VF Storm. 2024;45:4968-4975.' },
];
