// MedKitt — HOP Killers (Physiologically Difficult Airway)
// Sources: EMCrit LAMW Series, REBEL EM, First10EM, Society for Airway Management
// 6 modules: Assessment → Hypotension → Hypoxia → Severe Acidosis → RV Failure → Metabolic & ICP
// ~50 nodes

import type { DecisionNode } from '../../models/types.js';

export interface Citation {
  num: number;
  text: string;
}

export const HOP_KILLERS_CRITICAL_ACTIONS = [
  { text: 'Screen all critical intubations for HOp killers', nodeId: 'hop-screen' },
  { text: 'Hypotension: push-dose pressors + ketamine induction', nodeId: 'hop-hypotension-intro' },
  { text: 'Hypoxemia: preoxygenate with PEEP, consider awake intubation', nodeId: 'hop-hypoxia-intro' },
  { text: 'Severe acidosis: delay intubation if possible, correct first', nodeId: 'hop-acidosis-intro' },
  { text: 'RV failure: avoid PPV, maintain preload and BP', nodeId: 'hop-rv-intro' },
  { text: 'Hyperkalemia: avoid sux, treat before intubation', nodeId: 'hop-hyperkalemia-intro' },
  { text: 'Elevated ICP: head up, normocarbia, prevent hypotension', nodeId: 'hop-icp-intro' },
  { text: 'Prepare for arrest in all physiologically difficult airways', nodeId: 'hop-start' },
];

export const HOP_KILLERS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: ASSESSMENT — Identify Killers
  // =====================================================================

  {
    id: 'hop-start',
    type: 'info',
    module: 1,
    title: 'HOP Killers: Pre-Intubation Assessment',
    body: '**Physiologically Difficult Airway:** Standard RSI can kill patients with unstable physiology.\n\n**The Original HOp Triad (Weingart):**\n- **H**ypotension\n- **O**xygenation failure (hypoxemia)\n- **p**H (severe acidosis)\n\n**Expanded Killers:**\n- Right Heart Failure (PE, pulmonary HTN)\n- Metabolic (hyperkalemia)\n- Elevated ICP\n\n**Why Standard RSI Kills:**\n1. Sedatives drop SVR and sympathetic tone\n2. PPV drops preload and cardiac output\n3. Apnea loses respiratory compensation\n4. Paralysis prevents self-rescue\n\n**Key stat:** 40% of ED/ICU intubations complicated by hypoxemia, hypotension, or arrest. [1]',
    citation: [1],
    calculatorLinks: [
      { id: 'hop-hypotensive-intubation', label: 'Hypotensive Intubation Guide' },
    ],
    next: 'hop-screen',
  },

  {
    id: 'hop-screen',
    type: 'question',
    module: 1,
    title: 'Screen for Killers',
    body: '**Before any high-risk intubation, screen systematically:**\n\n| Question | Threshold | Killer |\n|----------|-----------|--------|\n| What is the SBP? | < 100 mmHg | Hypotension |\n| What is the SpO2? | < 93% on O2 | Hypoxemia |\n| What is the pH? | < 7.2 | Severe Acidosis |\n| Signs of RV failure? | JVD + hypotension | RV Failure |\n| What is the K+? | > 5.5 mEq/L | Metabolic |\n| Concern for elevated ICP? | TBI, herniation | Elevated ICP |\n\n**Which killer(s) are present?**\n\n*Note: Many critically ill patients have MULTIPLE killers. Address all.*',
    citation: [1, 2],
    options: [
      {
        label: 'Hypotension (SBP < 100)',
        description: 'Shock state, on pressors, volume depleted',
        next: 'hop-hypotension-intro',
        urgency: 'urgent',
      },
      {
        label: 'Hypoxemia (SpO2 < 93% on O2)',
        description: 'ARDS, pneumonia, shunt physiology',
        next: 'hop-hypoxia-intro',
        urgency: 'urgent',
      },
      {
        label: 'Severe Acidosis (pH < 7.2)',
        description: 'DKA, sepsis, toxic ingestion',
        next: 'hop-acidosis-intro',
        urgency: 'urgent',
      },
      {
        label: 'Right Heart Failure',
        description: 'PE, pulmonary hypertension, cor pulmonale',
        next: 'hop-rv-intro',
        urgency: 'critical',
      },
      {
        label: 'Metabolic (K+ > 5.5)',
        description: 'Renal failure, rhabdo, crush injury',
        next: 'hop-metabolic-intro',
        urgency: 'urgent',
      },
      {
        label: 'Elevated ICP',
        description: 'TBI, ICH, herniation signs',
        next: 'hop-icp-intro',
        urgency: 'urgent',
      },
      {
        label: 'Multiple Killers Present',
        description: 'More than one physiologic derangement',
        next: 'hop-multi-killer',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'hop-multi-killer',
    type: 'info',
    module: 1,
    title: 'Multiple Simultaneous Killers',
    body: '**Common Multi-Killer Scenarios:**\n\n| Scenario | Killers | Key Approach |\n|----------|---------|-------------|\n| **Septic shock + ARDS** | Hypotension + Hypoxia | ROCKETamine + DSI + push pressors |\n| **DKA + respiratory failure** | Acidosis + Hypoxia | VAPOX + high RR vent settings |\n| **Massive PE** | Hypoxia + RV + Hypotension | Awake if possible, pressors, low PEEP |\n| **TBI + hemorrhage** | ICP + Hypotension | Ketamine, aggressive BP support |\n| **Renal failure + pneumonia** | Metabolic + Hypoxia + Acidosis | Rocuronium only, treat K+ first |\n\n**Prioritization:**\n1. Address immediate life threats\n2. Stabilize hemodynamics (push pressors ready)\n3. Optimize oxygenation (DSI if needed)\n4. Address metabolic derangements\n5. Then proceed to modified RSI\n\n**Use toolbar calculators for each specific killer.**',
    citation: [1],
    calculatorLinks: [
      { id: 'hop-hypotensive-intubation', label: 'Hypotensive Guide' },
      { id: 'hop-hypoxic-intubation', label: 'Hypoxic Guide' },
      { id: 'hop-acidotic-intubation', label: 'Acidotic Guide' },
    ],
    next: 'hop-screen',
  },

  // =====================================================================
  // MODULE 2: HYPOTENSION
  // =====================================================================

  {
    id: 'hop-hypotension-intro',
    type: 'info',
    module: 2,
    title: 'Killer #1: Hypotension',
    body: '**Why RSI Kills the Hypotensive Patient:**\n\n1. **Sedatives drop SVR** - Even ketamine can cause hypotension in catecholamine-depleted patients\n2. **PPV drops preload** - Positive pressure reduces venous return\n3. **Loss of sympathetic drive** - Critically ill patients rely on endogenous catecholamines\n\n**High-Risk Patients:**\n- Septic shock (vasodilated, preload-dependent)\n- Hemorrhagic shock (hypovolemic)\n- Cardiogenic shock (pump failure)\n- Neurogenic shock (loss of sympathetic tone)\n- Already on vasopressors\n\n**Key Stat:** Cardiac arrest 12% vs 3% in hypotensive vs normotensive intubations (p < 0.002). [2]',
    citation: [2],
    calculatorLinks: [
      { id: 'hop-hypotensive-intubation', label: 'Hypotensive Intubation Calculator' },
    ],
    next: 'hop-hypotension-prep',
  },

  {
    id: 'hop-hypotension-prep',
    type: 'info',
    module: 2,
    title: 'Pre-Intubation Resuscitation',
    body: '**Optimize BEFORE Intubation:**\n\n| Target | Goal | Why |\n|--------|------|-----|\n| **MAP** | > 65 mmHg (ideally > 75) | Buffer for post-induction drop |\n| **SBP** | > 140 mmHg | Provides hemodynamic reserve |\n| **Volume** | 1-2L crystalloid if hypovolemic | Optimize preload |\n| **Access** | 2 large-bore proximal IVs | Rapid fluid/pressor access |\n| **Pressors** | Running BEFORE induction | Already infusing, not scrambling |\n\n**IVC Collapsibility Index:**\n- > 40-45% predicts post-induction hypotension\n- High suspicion for preload dependence\n\n**Never intubate unprepared - have push-dose pressors drawn and ready.**',
    citation: [2, 3],
    next: 'hop-hypotension-rocketamine',
  },

  {
    id: 'hop-hypotension-rocketamine',
    type: 'info',
    module: 2,
    title: 'ROCKETamine Protocol',
    body: '**Shock Dose RSI: Dose sedatives LOW, paralytics HIGH**\n\n| Medication | Standard Dose | Shock Dose | Notes |\n|------------|---------------|------------|-------|\n| **Ketamine** | 1-2 mg/kg | **0.5 mg/kg** | Add 0.5 mg/kg PRN until sedated |\n| **Rocuronium** | 1.0-1.2 mg/kg | **1.6 mg/kg** | Higher dose = faster onset, longer safe apnea |\n\n**Why Ketamine?**\n- Least cardio-depressant induction agent\n- Maintains SVR via sympathetic stimulation\n- BUT: In catecholamine-depleted patients, even ketamine can drop BP\n- Reduce dose and have push-dose pressors ready\n\n**Co-administer with induction:**\n- Push-dose epinephrine 5 mcg IV with ketamine',
    citation: [2, 3],
    calculatorLinks: [
      { id: 'hop-hypotensive-intubation', label: 'Calculate Doses' },
    ],
    next: 'hop-hypotension-pressors',
  },

  {
    id: 'hop-hypotension-pressors',
    type: 'info',
    module: 2,
    title: 'Push-Dose Pressors',
    body: '**Epinephrine (Preferred):**\n\n**Preparation:**\n1. Draw 1 mL cardiac epinephrine (1:10,000 = 100 mcg/mL)\n2. Add to 9 mL NS in 10 mL syringe\n3. Mix thoroughly\n4. Final concentration: **10 mcg/mL**\n\n**Dosing:**\n- 0.5-2 mL (5-20 mcg) IV push q2-5 min PRN\n- Prophylactic: 5 mcg (0.5 mL) with induction meds\n- Onset: < 1 min | Duration: ~5 min\n\n**Phenylephrine (if tachycardia a concern):**\n- 1 mL (10 mg/mL) + 99 mL NS = 100 mcg/mL\n- Dose: 50-200 mcg IV push q2-5 min\n\n**NEVER give code-dose epinephrine (1 mg) to patients with a pulse!**',
    citation: [2, 3],
    next: 'hop-hypotension-post',
  },

  {
    id: 'hop-hypotension-post',
    type: 'result',
    module: 2,
    title: 'Post-Intubation Hypotension',
    body: '**Immediate Actions:**\n\n1. **Start norepinephrine infusion immediately**\n   - Can run peripherally via proximal IV up to 4 hours\n   - Start 5-10 mcg/min, titrate to MAP > 65\n\n2. **Continue push-dose pressors** as bridge while infusion takes effect\n\n3. **Expedite central line** but do not delay vasopressors\n\n4. **Consider volume** if truly hypovolemic (avoid in cardiogenic shock)\n\n**Awake Intubation Alternative:**\n- Consider for profound shock where any sedation may be fatal\n- Topicalize with lidocaine (10 mL 4% spray oropharynx)\n- Preserves endogenous catecholamines and spontaneous ventilation',
    recommendation: 'ROCKETamine (ketamine 0.5 mg/kg + rocuronium 1.6 mg/kg), push-dose epinephrine with induction, have vasopressor infusion primed.',
    confidence: 'recommended',
    citation: [2, 3],
    calculatorLinks: [
      { id: 'hop-hypotensive-intubation', label: 'Hypotensive Intubation Guide' },
    ],
  },

  // =====================================================================
  // MODULE 3: HYPOXIA
  // =====================================================================

  {
    id: 'hop-hypoxia-intro',
    type: 'info',
    module: 3,
    title: 'Killer #2: Hypoxemia',
    body: '**Why RSI Kills the Hypoxic Patient:**\n\n1. **Cannot tolerate apnea** - Shunt physiology (ARDS, pneumonia) = desaturation in seconds\n2. **Cannot preoxygenate adequately** - Agitated hypoxic patients fight masks\n3. **Desaturation during laryngoscopy** - Even brief attempts cause critical hypoxemia\n\n**High-Risk Patients:**\n- ARDS\n- Severe pneumonia\n- Pulmonary edema\n- Morbid obesity\n- Pulmonary embolism\n- Any SpO2 < 93% despite supplemental O2\n\n**Key Intervention:** Delayed Sequence Intubation (DSI)',
    citation: [1, 4],
    calculatorLinks: [
      { id: 'hop-hypoxic-intubation', label: 'NODESAT & DSI Calculator' },
    ],
    next: 'hop-hypoxia-nodesat',
  },

  {
    id: 'hop-hypoxia-nodesat',
    type: 'info',
    module: 3,
    title: 'NODESAT Protocol',
    body: '**N-O-D-E-S-A-T:**\n\n| Letter | Intervention | Details |\n|--------|--------------|--------|\n| **N** | Nasal O2 | 15 lpm NC or HFNC 60 lpm |\n| **O** | Optimal positioning | Head elevated, ramped |\n| **D** | Delayed Sequence Intubation | If patient won\'t cooperate |\n| **E** | End-tidal CO2 | Baseline before paralysis |\n| **S** | Suction ready | At hand, tested |\n| **A** | Apneic oxygenation | NC stays on during laryngoscopy |\n| **T** | Two-person BVM | For rescue ventilation |\n\n**Rule of 15s (Preoxygenation):**\n- NC at 15 lpm + NRB at 15 lpm\n- OR NC at 15 lpm + CPAP/BiPAP up to 15 cmH2O\n- Minimum 3 minutes preoxygenation if stable',
    citation: [4, 5],
    next: 'hop-hypoxia-dsi',
  },

  {
    id: 'hop-hypoxia-dsi',
    type: 'info',
    module: 3,
    title: 'Delayed Sequence Intubation (DSI)',
    body: '**Concept:** Procedural sedation for preoxygenation. The "procedure" IS effective preoxygenation.\n\n**Indications:**\n- Agitated/delirious hypoxic patient unable to tolerate mask\n- SpO2 < 93% despite maximal preoxygenation attempts\n- Patient fighting NIV/mask\n\n**DSI Protocol:**\n1. Push **ketamine 1-2 mg/kg IV** (or dexmedetomidine 1 mcg/kg over 10 min)\n2. Wait 30-60 seconds for dissociation\n3. Apply preoxygenation (NRB, CPAP, or NIV)\n4. Continue for 2-3 minutes until SpO2 > 95%\n5. Document baseline ETCO2\n6. THEN push paralytic\n7. Intubate after 45-60 seconds\n\n**Key:** Often after sedation + NIV, parameters improve so much intubation can be AVOIDED.',
    citation: [4, 5],
    calculatorLinks: [
      { id: 'hop-hypoxic-intubation', label: 'DSI Protocol Calculator' },
    ],
    next: 'hop-hypoxia-apneic',
  },

  {
    id: 'hop-hypoxia-apneic',
    type: 'info',
    module: 3,
    title: 'Apneic Oxygenation',
    body: '**Keep NC in place during laryngoscopy - this is the key intervention.**\n\n| Method | Flow Rate | Evidence |\n|--------|-----------|----------|\n| Standard NC | 15 lpm | Effective, widely available |\n| HFNC | 60 lpm | Longer safe apnea (11 vs 7 min), no superiority for preventing desaturation |\n\n**HFNC Settings (if available):**\n- Flow: 60 lpm\n- FiO2: 100%\n- Provides moderate PEEP + dead space washout\n\n**Evidence for DSI:**\n- RCT: Peri-intubation hypoxemia 8% (DSI) vs 35% (standard RSI), p < 0.001\n- First-pass success: 83% vs 69%, p = 0.02\n- Adjusted OR for hypoxemia with standard RSI: 6.8 (95% CI 2.8-16.5)',
    citation: [4, 5],
    next: 'hop-hypoxia-result',
  },

  {
    id: 'hop-hypoxia-result',
    type: 'result',
    module: 3,
    title: 'Hypoxic Intubation Summary',
    body: '**NODESAT + DSI Summary:**\n\n1. **Nasal cannula 15 lpm** - Leave on throughout\n2. **Position head-up 20-30 degrees**\n3. **DSI with ketamine** if patient not cooperating\n4. **Preoxygenate 3+ minutes** to SpO2 > 95%\n5. **Document ETCO2** before paralysis\n6. **Push paralytic** only when adequately preoxygenated\n7. **Apneic oxygenation** - NC stays on during attempt\n\n**Post-Intubation:**\n- Confirm with ETCO2\n- Lung-protective ventilation (TV 6-8 mL/kg IBW)\n- Titrate FiO2 to SpO2 92-96%\n\n**If SpO2 drops during attempt:** Stop, BVM with PEEP, reoxygenate, then retry.',
    recommendation: 'DSI with ketamine, NODESAT protocol, apneic oxygenation with NC 15 lpm during laryngoscopy.',
    confidence: 'recommended',
    citation: [4, 5],
    calculatorLinks: [
      { id: 'hop-hypoxic-intubation', label: 'NODESAT Calculator' },
    ],
  },

  // =====================================================================
  // MODULE 4: SEVERE ACIDOSIS
  // =====================================================================

  {
    id: 'hop-acidosis-intro',
    type: 'info',
    module: 4,
    title: 'Killer #3: Severe Acidosis',
    body: '**Why RSI Kills the Acidotic Patient:**\n\n1. **Respiratory compensation lost during apnea** - CO2 rises 3-6 mmHg/min, pH crashes\n2. **Even brief apnea is dangerous** - Seconds can worsen pH enough to cause dysrhythmias\n3. **Post-intubation vent mismanagement** - Standard settings (RR 12, TV 500) do not maintain needed minute ventilation\n\n**High-Risk Patients:**\n- DKA (especially pH < 7.1)\n- Sepsis with severe lactic acidosis\n- Toxic ingestions (salicylates, methanol, ethylene glycol)\n- Renal failure with metabolic acidosis\n- Metformin-associated lactic acidosis\n\n**pH Thresholds:**\n- 7.2-7.3: Moderate risk\n- 7.1-7.2: High risk - consider avoiding intubation\n- < 7.1: Critical - intubation may be fatal',
    citation: [1, 6],
    calculatorLinks: [
      { id: 'hop-acidotic-intubation', label: 'Acidotic Intubation Calculator' },
    ],
    next: 'hop-acidosis-winters',
  },

  {
    id: 'hop-acidosis-winters',
    type: 'info',
    module: 4,
    title: 'Winter\'s Formula & Target MV',
    body: '**Calculate Expected Compensatory PaCO2:**\n\n**Winter\'s Equation:**\n```\nExpected PaCO2 = (1.5 x HCO3) + 8 (+/- 2)\n```\n\n**Example: pH 6.9, HCO3 5 mEq/L**\n- Expected PaCO2 = (1.5 x 5) + 8 = 15.5 mmHg\n- Patient must maintain PaCO2 of 13-18 to compensate\n- Standard vent settings (PaCO2 ~40) would be catastrophic\n\n**Key Principle:**\nBefore intubating, know what PaCO2 the patient is maintaining and what minute ventilation you need to match it.\n\n**TRY TO AVOID INTUBATION:**\n- Even a short trial of NIV while treating underlying cause\n- Many DKA patients improve dramatically within 1-2 hours',
    citation: [1, 6],
    calculatorLinks: [
      { id: 'hop-acidotic-intubation', label: 'Winter\'s Calculator' },
    ],
    next: 'hop-acidosis-vapox',
  },

  {
    id: 'hop-acidosis-vapox',
    type: 'info',
    module: 4,
    title: 'VAPOX Technique',
    body: '**Ventilator-Assisted Pre-Oxygenation:**\n\n**Equipment:**\n- ICU ventilator at bedside (NOT a BiPAP machine)\n- NIV mask\n- Someone who can adjust vent in real time\n\n**Pre-Intubation Settings (Pseudo-NIV Phase):**\n\n| Parameter | Setting | Rationale |\n|-----------|---------|----------|\n| Mode | SIMV | Allows spontaneous breaths |\n| TV | 550 mL (8 mL/kg IBW) | Standard |\n| FiO2 | 100% | Maximize oxygenation |\n| Flow Rate | 30 lpm | Slow to prevent gastric insufflation |\n| PSV | 5-15 cmH2O | Augments spontaneous breaths |\n| PEEP | 5 cmH2O (↑ to 15 if SpO2 stable) | Maintain oxygenation |\n| RR | **0** | Patient breathing spontaneously |\n\n**Attach ETCO2 monitoring - document baseline value.**',
    citation: [6],
    next: 'hop-acidosis-induction',
  },

  {
    id: 'hop-acidosis-induction',
    type: 'info',
    module: 4,
    title: 'During RSI - Apneic Phase',
    body: '**After pushing induction + paralytic:**\n\n1. **Increase RR to 12** on ventilator\n2. **Perform jaw thrust** to maintain airway\n3. **Wait 45 seconds** for medication onset\n4. **The ventilator is breathing for the patient** through the NIV mask during apneic window\n\n**This is the key innovation:** You\'re not truly apneic because the vent is providing breaths through the mask while you wait for paralytic onset.\n\n**Once intubated, immediately:**\n- Increase RR to match pre-intubation hyperventilation\n- Target ETCO2 at least as low as it was before intubation',
    citation: [6],
    next: 'hop-acidosis-vent',
  },

  {
    id: 'hop-acidosis-vent',
    type: 'result',
    module: 4,
    title: 'Post-Intubation Vent Settings',
    body: '**Immediately after tube placement:**\n\n| Parameter | Setting | Notes |\n|-----------|---------|-------|\n| **RR** | **30 breaths/min** | Match pre-intubation hyperventilation |\n| **TV** | 8 mL/kg IBW | Standard |\n| **Flow Rate** | 60 lpm | Standard intubated setting |\n| **FiO2** | 100% initially | Wean as tolerated |\n\n**Target:** ETCO2 at least as low as it was before intubation\n\n**GET ABG URGENTLY post-intubation** - Do not wait!\n\n**Sodium Bicarbonate - Generally NOT Recommended:**\n- Generates CO2 when buffering acid\n- Patient cannot blow off additional CO2\n- May worsen intracellular acidosis',
    recommendation: 'VAPOX technique, post-intubation RR 30, match pre-intubation ETCO2, urgent ABG.',
    confidence: 'recommended',
    citation: [6],
    calculatorLinks: [
      { id: 'hop-acidotic-intubation', label: 'Vent Settings Calculator' },
    ],
  },

  // =====================================================================
  // MODULE 5: RIGHT HEART FAILURE
  // =====================================================================

  {
    id: 'hop-rv-intro',
    type: 'info',
    module: 5,
    title: 'Killer #4: Right Heart Failure',
    body: '**Why RSI Kills the RV Failure Patient:**\n\n1. **PPV increases RV afterload** - Positive intrathoracic pressure transmitted to pulmonary vasculature\n2. **PPV drops RV preload** - Reduced venous return to already struggling RV\n3. **Sedatives drop SVR** - RV perfusion depends on systemic pressure\n\n**The RV Death Spiral:**\n↑ RV afterload → RV dilation → Septal shift → ↓ LV filling → ↓ Cardiac output → ↓ Coronary perfusion → RV ischemia → Further RV dysfunction → Death\n\n**High-Risk Patients:**\n- Massive pulmonary embolism\n- Known pulmonary hypertension\n- Cor pulmonale\n- Severe COPD with RV strain\n- RV infarction',
    citation: [1, 7],
    calculatorLinks: [
      { id: 'hop-rv-failure-intubation', label: 'RV Failure Intubation Guide' },
    ],
    next: 'hop-rv-avoid',
  },

  {
    id: 'hop-rv-avoid',
    type: 'info',
    module: 5,
    title: 'Avoid Intubation If Possible',
    body: '**AVOID INTUBATION IF AT ALL POSSIBLE**\n\nIntubation is truly a last resort in RV failure patients.\n\n**First, try:**\n- NIV/CPAP\n- Basic airway maneuvers\n- Treat underlying cause (thrombolytics for PE, diuresis)\n\n**Avoid These (Worsen RV Failure):**\n\n| Avoid | Why |\n|-------|-----|\n| **Hypoxia** | Pulmonary vasoconstriction |\n| **Hypercarbia** | Pulmonary vasoconstriction |\n| **Acidosis** | Pulmonary vasoconstriction |\n| **Propofol** | Drops SVR dramatically |\n| **Excessive fluid** | Worsens RV distension |\n| **High PEEP** | Increases RV afterload |\n\n**Consider awake intubation** - Maintains spontaneous ventilation and endogenous catecholamines.',
    citation: [7],
    next: 'hop-rv-prep',
  },

  {
    id: 'hop-rv-prep',
    type: 'info',
    module: 5,
    title: 'Pre-Intubation Stabilization',
    body: '**If intubation unavoidable, stabilize first:**\n\n| Intervention | Details | Rationale |\n|--------------|---------|----------|\n| **Vasopressors running** | Norepinephrine or epinephrine infusion | Maintain systemic pressure > pulmonary |\n| **Push-dose pressors ready** | Epinephrine 10 mcg/mL syringes | Immediate hemodynamic support |\n| **Avoid fluid boluses** | Most RV failure patients are volume OVERLOADED | Fluid may worsen RV distension |\n| **Consider diuresis** | Paradoxically, removing fluid may improve output | Reduces septal bowing |\n| **Correct hypoxia** | Supplemental O2 is a pulmonary vasodilator | Reduces PVR |\n| **Correct acidosis** | BiPAP if needed | Acidosis increases PVR |\n\n**Massive PE-Specific:** Consider thrombolytics BEFORE intubation if shock.',
    citation: [7],
    calculatorLinks: [
      { id: 'hop-rv-failure-intubation', label: 'RV Failure Calculator' },
    ],
    next: 'hop-rv-induction',
  },

  {
    id: 'hop-rv-induction',
    type: 'info',
    module: 5,
    title: 'Induction Strategy',
    body: '**Awake Intubation Probably Preferred** - Maintains spontaneous ventilation and endogenous catecholamines.\n\n**If RSI Required:**\n- **Ketamine 0.5 mg/kg** (maintains SVR)\n- **Vasopressors infusing BEFORE induction**\n- **Push-dose epinephrine WITH induction meds**\n\n**Pulmonary Vasodilators (consider immediately post-intubation):**\n\n| Agent | Route | Dose | Notes |\n|-------|-------|------|-------|\n| **Inhaled nitric oxide** | Via ventilator | 20-40 ppm | Expensive but effective |\n| **Inhaled epoprostenol** | Via ventilator | 50 ng/kg/min | Alternative to NO |\n| **IV nitroglycerin** | Infusion | 10-200 mcg/min | Reduces preload and PVR |',
    citation: [7],
    next: 'hop-rv-vent',
  },

  {
    id: 'hop-rv-vent',
    type: 'result',
    module: 5,
    title: 'Post-Intubation Ventilator Strategy',
    body: '**RV-Protective Ventilator Settings:**\n\n| Parameter | Target | Rationale |\n|-----------|--------|----------|\n| **PEEP** | Low (5-8 cmH2O) | Minimize RV afterload increase |\n| **TV** | 6-8 mL/kg | Avoid over-distension |\n| **Pplat** | < 30 cmH2O | Minimize transpulmonary pressure |\n| **FiO2** | 100% initially | Oxygen is original pulmonary vasodilator |\n| **RR** | Adequate to avoid hypercarbia | CO2 is pulmonary vasoconstrictor |\n\n**Massive PE Considerations:**\n- Thrombolytics may be needed emergently\n- ECMO conversation early\n- Catheter-directed therapy if available\n\n**Key:** Maintain systemic pressure, minimize RV afterload, avoid hypercarbia and hypoxia.',
    recommendation: 'Awake intubation if possible. If RSI: ketamine, vasopressors running, low PEEP post-intubation.',
    confidence: 'recommended',
    citation: [7],
    calculatorLinks: [
      { id: 'hop-rv-failure-intubation', label: 'RV Failure Intubation Guide' },
    ],
  },

  // =====================================================================
  // MODULE 6: METABOLIC & ICP
  // =====================================================================

  {
    id: 'hop-metabolic-intro',
    type: 'info',
    module: 6,
    title: 'Killer #5: Metabolic (Hyperkalemia)',
    body: '**Why RSI Kills the Hyperkalemic Patient:**\n\n**Succinylcholine raises K+ ~0.5 mEq/L** - In borderline patients, this can trigger fatal arrhythmias.\n\n**Succinylcholine-Induced Cardiac Arrest:** Well documented in patients with unrecognized hyperkalemia.\n\n**AVOID SUCCINYLCHOLINE in:**\n\n| Condition | Time Frame | Why |\n|-----------|------------|-----|\n| **Hyperkalemia (K+ > 5.5)** | Current | Additional K+ may be fatal |\n| **Burns** | > 24-72 hours | Upregulated ACh receptors |\n| **Crush injury** | > 24-72 hours | Upregulated ACh receptors |\n| **Spinal cord injury** | > 24 hours to 2 years | Upregulated ACh receptors |\n| **Prolonged immobilization** | > 1 week | Upregulated ACh receptors |\n| **Muscular dystrophy** | Always | Rhabdomyolysis risk |',
    citation: [1, 8],
    calculatorLinks: [
      { id: 'hop-metabolic-intubation', label: 'Metabolic Intubation Calculator' },
    ],
    next: 'hop-metabolic-treatment',
  },

  {
    id: 'hop-metabolic-treatment',
    type: 'info',
    module: 6,
    title: 'Pre-Intubation Hyperkalemia Treatment',
    body: '**Stabilize the membrane and shift K+ BEFORE intubation:**\n\n| Intervention | Dose | Onset | Duration | Mechanism |\n|--------------|------|-------|----------|----------|\n| **Calcium gluconate** | 1-2 g IV over 5-10 min | 1-3 min | 30-60 min | Membrane stabilization |\n| **Calcium chloride** | 1 g IV (central line) | 1-3 min | 30-60 min | 3x more elemental Ca |\n| **Regular insulin** | 10 units IV | 15-30 min | 4-6 hours | Intracellular K+ shift |\n| **Dextrose 50%** | 50 mL (25g) IV | -- | -- | Prevent hypoglycemia |\n| **Albuterol** | 10-20 mg nebulized | 15-30 min | 2-4 hours | Intracellular K+ shift |\n\n**Calcium FIRST** - Stabilizes myocardium within minutes while other therapies take effect.',
    citation: [8],
    next: 'hop-metabolic-paralytic',
  },

  {
    id: 'hop-metabolic-paralytic',
    type: 'result',
    module: 6,
    title: 'Paralytic Selection',
    body: '**Use Rocuronium, Not Succinylcholine:**\n\n| Agent | Dose | Onset | Notes |\n|-------|------|-------|-------|\n| **Rocuronium** | 1.2 mg/kg | 60 seconds | No K+ release, safe in hyperkalemia |\n| **Rocuronium** | 1.6 mg/kg | 45 seconds | Higher dose for faster onset (shock) |\n\n**Rocuronium 1.2 mg/kg has equivalent onset to succinylcholine with longer duration.**\n\n**Key Points:**\n- Rocuronium is the default paralytic for any patient with suspected hyperkalemia\n- Risk peaks at 7-10 days post-injury due to receptor upregulation\n- Risk persists up to 2 years after denervation injuries',
    recommendation: 'Treat hyperkalemia first (calcium, insulin/glucose), use rocuronium 1.2-1.6 mg/kg instead of succinylcholine.',
    confidence: 'recommended',
    citation: [8],
    calculatorLinks: [
      { id: 'hop-metabolic-intubation', label: 'Metabolic Intubation Guide' },
    ],
  },

  {
    id: 'hop-icp-intro',
    type: 'info',
    module: 6,
    title: 'Killer #6: Elevated ICP',
    body: '**Why RSI Kills the Elevated ICP Patient:**\n\n1. **Laryngoscopy raises ICP** - Sympathetic response to airway manipulation\n2. **Hypotension drops CPP** - CPP = MAP - ICP. If MAP drops while ICP elevated, brain suffers\n3. **Hypoxia worsens secondary injury** - Injured brain is exquisitely sensitive\n4. **Hypercarbia increases ICP** - CO2 is a cerebral vasodilator\n\n**High-Risk Patients:**\n- Traumatic brain injury (TBI)\n- Stroke with mass effect\n- Intracranial hemorrhage (ICH)\n- Brain tumor with edema\n- Herniation signs\n\n**Key Goals:**\n- SBP > 100 mmHg\n- MAP > 80 mmHg\n- SpO2 > 95%\n- PaCO2 35-40 mmHg',
    citation: [1, 9],
    calculatorLinks: [
      { id: 'hop-elevated-icp-intubation', label: 'Elevated ICP Calculator' },
    ],
    next: 'hop-icp-ketamine',
  },

  {
    id: 'hop-icp-ketamine',
    type: 'info',
    module: 6,
    title: 'Ketamine in Elevated ICP: Dogma Debunked',
    body: '**Traditional Teaching:** Ketamine raises ICP and is contraindicated in TBI.\n\n**Current Evidence:** This is NOT supported by modern studies.\n\n| Finding | Source |\n|---------|--------|\n| Ketamine does NOT increase ICP | Zeiler et al. systematic review |\n| Safe in intubated AND non-intubated TBI | Multiple studies |\n| May be neuroprotective | NMDA receptor antagonism |\n| Maintains hemodynamic stability | Critical for CPP |\n\n**2024-2025 Evidence:**\n- Meta-analysis: Ketamine does NOT increase ICP (RR 0.67, 95% CI 0.45-1.01)\n- Ketamine gaining recognition for neuroprotection via NMDA antagonism\n- Inhibits spreading depolarizations\n\n**In hypotensive TBI patient:** Ketamine is PREFERRED (maintains BP = maintains CPP).',
    citation: [9],
    next: 'hop-icp-induction',
  },

  {
    id: 'hop-icp-induction',
    type: 'info',
    module: 6,
    title: 'Induction Agent Selection',
    body: '**Agent Options:**\n\n| Agent | Dose | Considerations |\n|-------|------|----------------|\n| **Etomidate** | 0.3 mg/kg | Traditional choice, minimal hemodynamic effect |\n| **Ketamine** | 0.5-1 mg/kg | Safe in TBI, maintains hemodynamics |\n| **Propofol** | 1-2 mg/kg | Reduces ICP but causes hypotension |\n| **Propofol/Ketamine** | 75%/25% | Balanced approach |\n\n**Pretreatment:**\n- **Fentanyl 3-5 mcg/kg IV** 3-5 minutes before laryngoscopy (blunts sympathetic response)\n- Have push-dose pressors ready (hypotension risk)\n\n**Lidocaine 1.5 mg/kg IV:**\n- Evidence for benefit is LIMITED\n- Not routinely recommended\n\n**Paralytic:** Both rocuronium and succinylcholine acceptable. Transient ICP rise from succinylcholine is NOT clinically significant.',
    citation: [9],
    next: 'hop-icp-post',
  },

  {
    id: 'hop-icp-post',
    type: 'result',
    module: 6,
    title: 'Post-Intubation ICP Management',
    body: '**Post-Intubation Targets:**\n\n| Parameter | Target | Notes |\n|-----------|--------|-------|\n| **Head of bed** | 30-45 degrees | Promotes venous drainage |\n| **SpO2** | > 95% | Avoid hypoxia |\n| **PEEP** | Minimize (only as needed) | High PEEP can impair venous drainage |\n| **ETCO2** | 35 mmHg | Then get ABG for PaCO2 |\n| **PaCO2** | 35-40 mmHg | AVOID hyperventilation unless herniating |\n| **Sedation** | Propofol + fentanyl | Propofol reduces CMRO2 |\n\n**AVOID routine hyperventilation** - Causes cerebral vasoconstriction, may worsen ischemia.\n\n**Exception - Signs of Active Herniation:**\n- Unilateral/bilateral pupil dilation\n- Posturing\n- Cushing\'s triad\n- **Temporarily hyperventilate to PaCO2 30-35** while giving mannitol/hypertonic saline and calling neurosurgery.',
    recommendation: 'Ketamine safe in TBI, maintain MAP > 80, avoid hyperventilation (target PaCO2 35-40), head of bed 30 degrees.',
    confidence: 'recommended',
    citation: [9],
    calculatorLinks: [
      { id: 'hop-elevated-icp-intubation', label: 'Elevated ICP Intubation Guide' },
    ],
  },

  // =====================================================================
  // FINAL SUMMARY NODE
  // =====================================================================

  {
    id: 'hop-summary',
    type: 'result',
    module: 1,
    title: 'HOP Killers: Pre-Intubation Checklist',
    body: '**Before ANY high-risk intubation, systematically assess:**\n\n| Killer | Screen | If Present |\n|--------|--------|------------|\n| **Hypotension** | SBP < 100? On pressors? | ROCKETamine + push pressors |\n| **Hypoxemia** | SpO2 < 93%? | DSI + apneic oxygenation |\n| **Acidosis** | pH < 7.2? | VAPOX + high RR vent settings |\n| **RV Failure** | JVD? PE? Pulm HTN? | Awake intubation, low PEEP |\n| **Metabolic** | K+ > 5.5? | Rocuronium only, treat K+ first |\n| **Elevated ICP** | TBI? Herniation signs? | Maintain MAP, ketamine OK, PaCO2 35-40 |\n\n**Then:** Optimize, preoxygenate, modified RSI with condition-specific drugs/doses, post-intubation management tailored to physiology.',
    recommendation: 'Identify all physiologic derangements before intubation. Address each killer with specific modifications to RSI technique.',
    confidence: 'recommended',
    citation: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    calculatorLinks: [
      { id: 'hop-hypotensive-intubation', label: 'Hypotensive' },
      { id: 'hop-hypoxic-intubation', label: 'Hypoxic' },
      { id: 'hop-acidotic-intubation', label: 'Acidotic' },
      { id: 'hop-rv-failure-intubation', label: 'RV Failure' },
      { id: 'hop-metabolic-intubation', label: 'Metabolic' },
      { id: 'hop-elevated-icp-intubation', label: 'Elevated ICP' },
    ],
  },
];

export const HOP_KILLERS_NODE_COUNT = HOP_KILLERS_NODES.length;

export const HOP_KILLERS_MODULE_LABELS = [
  'Assessment',
  'Hypotension',
  'Hypoxia',
  'Severe Acidosis',
  'RV Failure',
  'Metabolic & ICP',
];

export const HOP_KILLERS_CITATIONS: Citation[] = [
  { num: 1, text: 'Weingart SD. EMCrit LAMW Series: The Physiologically Difficult Airway. EMCrit.org.' },
  { num: 2, text: 'Heffner AC, et al. Predictors of post-intubation hypotension. J Crit Care. 2012;27(6):587-593.' },
  { num: 3, text: 'Weingart SD. Push-dose pressors for immediate blood pressure control. AJEM. 2015;33(2):278-279.' },
  { num: 4, text: 'Weingart SD, et al. Delayed sequence intubation. Ann Emerg Med. 2015;65(4):349-355.' },
  { num: 5, text: 'Weingart SD, Levitan RM. Preoxygenation and prevention of desaturation. Ann Emerg Med. 2012;59(3):165-175.' },
  { num: 6, text: 'Farkas J. IBCC: Ventilatory management of severe metabolic acidosis. EMCrit.org.' },
  { num: 7, text: 'Farkas J. IBCC: RV failure and pulmonary hypertension. EMCrit.org.' },
  { num: 8, text: 'Martyn JAJ, et al. Succinylcholine-induced hyperkalemia. Anesthesiology. 2006;104(1):158-169.' },
  { num: 9, text: 'Zeiler FA, et al. Ketamine and ICP: A systematic review. J Neurotrauma. 2016;33(24):2089-2104.' },
];
