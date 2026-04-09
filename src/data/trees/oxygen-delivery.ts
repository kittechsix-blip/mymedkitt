// MedKitt — Oxygen Delivery Systems
// Sources: UpToDate, EMCrit, IBCC, ATS/ERS Guidelines
// 6 modules: Assessment → Device Selection → Settings → Titration → Monitoring → Escalation
// ~28 nodes

import type { DecisionNode } from '../../models/types.js';

export interface Citation {
  num: number;
  text: string;
}

export const OXYGEN_DELIVERY_CRITICAL_ACTIONS = [
  { text: 'COPD target SpO2 88-92% (NOT 94-98%) - over-oxygenation worsens hypercapnia via Haldane effect', nodeId: 'o2-copd-device' },
  { text: 'Non-rebreather mask requires 10-15 L/min to keep reservoir bag ≥1/3 full - inadequate flow = inadequate O2', nodeId: 'o2-nrb-info' },
  { text: 'HFNC ROX Index <3.85 at 2h = high risk of intubation - consider NIV or intubation', nodeId: 'o2-titrate-hfnc' },
  { text: 'BiPAP for hypercapnic failure: IPAP 10-12 → titrate up by 2 q5-10 min to max 20-25', nodeId: 'o2-bipap-info' },
  { text: 'CPAP for CHF/flash pulmonary edema: Start 5 cmH2O → titrate to 8-12 cmH2O by 2-3 increments', nodeId: 'o2-cpap-info' },
  { text: 'Apneic oxygenation during intubation: Nasal cannula 15 L/min or HFNC 60-70 L/min throughout attempt', nodeId: 'o2-intubation-bridge' },
  { text: 'Nasal cannula max effective flow 6 L/min (≈44% FiO2) - higher flows do NOT increase FiO2', nodeId: 'o2-mild-device' },
  { text: 'Venturi mask provides precise FiO2 regardless of breathing pattern - use for COPD or protocol titration', nodeId: 'o2-venturi-info' },
  { text: 'Check ABG at 1-2h on NIV - if pH unchanged/worse → escalate to intubation', nodeId: 'o2-titrate-bipap' },
];

export const OXYGEN_DELIVERY_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: CLINICAL ASSESSMENT
  // =====================================================================

  {
    id: 'o2-start',
    type: 'info',
    module: 1,
    title: 'Oxygen Delivery: Initial Assessment',
    body: '**Goal:** Match oxygen delivery device to patient physiology.\n\n**Key Parameters:**\n- **SpO2** — target varies by condition\n- **Respiratory rate** — tachypnea suggests work of breathing\n- **Work of breathing** — accessory muscle use, retractions, tripoding\n- **Mental status** — hypoxemia vs hypercapnia\n- **Underlying diagnosis** — Type 1 vs Type 2 respiratory failure\n\n**Type 1 (Hypoxemic):** Low O2, normal/low CO2 → Oxygenation problem\n- Pneumonia, ARDS, PE, pulmonary edema\n\n**Type 2 (Hypercapnic):** High CO2 ± low O2 → Ventilation problem\n- COPD, asthma, neuromuscular disease, drug overdose\n\n**Important:** Over-oxygenation in COPD can worsen hypercapnia. Target SpO2 88-92% in CO2 retainers. [1][2]',
    images: [
      { src: 'images/oxygen-delivery/non-rebreather-mask.jpg', alt: 'Non-rebreather mask for high-flow oxygen delivery', caption: 'Non-rebreather mask (NRB) — delivers 90–95% FiO₂ at 15 L/min. One step below HFNC/NIV in the escalation ladder for severe hypoxemia. CC BY-SA 4.0, ICUnurses. Wikimedia Commons.' },
    ],
    citation: [1, 2],
    next: 'o2-severity',
  },

  {
    id: 'o2-severity',
    type: 'question',
    module: 1,
    title: 'Hypoxemia Severity',
    body: '**Assess current oxygen status:**\n\n**What is the patient\'s SpO2 on room air (or current O2)?**\n\nIf already on oxygen, assess response and trajectory.\n\n**Quick Reference:**\n- SpO2 >94% on RA → May not need supplemental O2\n- SpO2 88-94% → Mild-moderate hypoxemia\n- SpO2 <88% → Severe hypoxemia\n- SpO2 <80% → Critical, consider immediate escalation',
    citation: [1],
    options: [
      {
        label: 'Mild Hypoxemia (SpO2 88-94%)',
        description: 'Stable, minimal work of breathing',
        next: 'o2-mild-device',
      },
      {
        label: 'Moderate Hypoxemia (SpO2 75-88%)',
        description: 'Increased work of breathing, tachypnea',
        next: 'o2-moderate-device',
        urgency: 'urgent',
      },
      {
        label: 'Severe Hypoxemia (SpO2 <75%)',
        description: 'Critical hypoxemia, accessory muscle use',
        next: 'o2-severe-device',
        urgency: 'critical',
      },
      {
        label: 'COPD / CO2 Retainer',
        description: 'Target SpO2 88-92%, avoid over-oxygenation',
        next: 'o2-copd-device',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: DEVICE SELECTION
  // =====================================================================

  {
    id: 'o2-mild-device',
    type: 'info',
    module: 2,
    title: 'Mild Hypoxemia — Low-Flow Devices',
    body: '**Recommended: Nasal Cannula**\n\n| Device | Flow | Approx FiO2 | Notes |\n|--------|------|-------------|-------|\n| **Nasal Cannula** | 1-6 L/min | 24-44% | Comfortable, allows eating/talking |\n| Simple Mask | 5-10 L/min | 35-55% | Higher FiO2, less comfortable |\n\n**Nasal Cannula FiO2 Estimation:**\n- 1 L/min ≈ 24% FiO2\n- 2 L/min ≈ 28% FiO2\n- 3 L/min ≈ 32% FiO2\n- 4 L/min ≈ 36% FiO2\n- 5 L/min ≈ 40% FiO2\n- 6 L/min ≈ 44% FiO2\n\n⚠️ **Above 6 L/min:** Nasal cannula becomes uncomfortable and doesn\'t significantly increase FiO2. Escalate to mask or HFNC.\n\n**Pearl:** FiO2 estimation assumes normal minute ventilation. Fast/deep breathing dilutes inspired O2. [1][3]',
    citation: [1, 3],
    calculatorLinks: [
      { id: 'oxygen-settings', label: 'Oxygen Settings Calculator' },
    ],
    next: 'o2-settings-info',
  },

  {
    id: 'o2-moderate-device',
    type: 'question',
    module: 2,
    title: 'Moderate Hypoxemia — Device Selection',
    body: '**Options for SpO2 75-88%:**\n\n| Device | Flow/FiO2 | Best For |\n|--------|-----------|----------|\n| **Non-Rebreather (NRB)** | 10-15 L/min, 60-90% FiO2 | Acute hypoxemia, bridge to definitive therapy |\n| **Venturi Mask** | Set FiO2 (24-60%) | COPD, precise FiO2 needed |\n| **HFNC** | 20-70 L/min, 21-100% FiO2 | Type 1 RF, tolerating face device, avoiding intubation |\n\n**Choose based on clinical scenario:**',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Non-Rebreather Mask',
        description: 'Quick, high FiO2, bridge therapy',
        next: 'o2-nrb-info',
        urgency: 'urgent',
      },
      {
        label: 'Venturi Mask',
        description: 'Precise FiO2 control, COPD',
        next: 'o2-venturi-info',
      },
      {
        label: 'High-Flow Nasal Cannula (HFNC)',
        description: 'Type 1 respiratory failure, comfort',
        next: 'o2-hfnc-info',
      },
    ],
  },

  {
    id: 'o2-severe-device',
    type: 'question',
    module: 2,
    title: 'Severe Hypoxemia — Escalation',
    body: '**Critical hypoxemia (SpO2 <75%) requires immediate text:**\n\n**Options:**\n1. **HFNC** — If patient alert, tolerating, Type 1 RF\n2. **NIV (BiPAP/CPAP)** — If Type 2 RF, CHF, COPD exacerbation\n3. **Intubation** — If altered, not protecting airway, refractory\n\n**Red Flags Requiring Intubation:**\n- GCS ≤8 or declining mental status\n- Unable to protect airway (secretions, vomiting)\n- Severe respiratory acidosis (pH <7.20) not improving\n- Hemodynamic instability\n- Refractory hypoxemia despite maximal non-invasive support\n\n**What is the best approach?**',
    citation: [1, 2, 4],
    options: [
      {
        label: 'Trial of HFNC',
        description: 'Alert, tolerating, Type 1 RF',
        next: 'o2-hfnc-info',
        urgency: 'urgent',
      },
      {
        label: 'NIV (BiPAP or CPAP)',
        description: 'CHF, COPD, hypercapnic failure',
        next: 'o2-niv-selection',
        urgency: 'urgent',
      },
      {
        label: 'Proceed to Intubation',
        description: 'Altered, unable to protect airway, refractory',
        next: 'o2-intubation-bridge',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'o2-copd-device',
    type: 'info',
    module: 2,
    title: 'COPD / CO2 Retainer — Controlled Oxygen',
    body: '**Target SpO2: 88-92%** (avoid over-oxygenation)\n\n**Why?** Haldane effect + blunted hypoxic drive can worsen hypercapnia.\n\n**Recommended Devices:**\n\n| Device | Setting | Notes |\n|--------|---------|-------|\n| **Venturi Mask** | 24-28% | Most precise FiO2 control |\n| **Nasal Cannula** | 1-2 L/min | Comfortable, less precise |\n| **HFNC** | Low flow (20-30 L), low FiO2 | PEEP effect may help |\n\n**Venturi Mask Color Codes:**\n- Blue = 24% FiO2 (2-4 L/min)\n- Yellow = 28% FiO2 (4-6 L/min)\n- White = 31% FiO2 (6-8 L/min)\n- Green = 35% FiO2 (8-10 L/min)\n- Pink = 40% FiO2 (10-12 L/min)\n- Orange = 50% FiO2 (12-15 L/min)\n\n**If hypercapnic (pH <7.35, pCO2 >45):** Consider NIV (BiPAP). [1][2][5]',
    citation: [1, 2, 5],
    calculatorLinks: [
      { id: 'oxygen-settings', label: 'Oxygen Settings Calculator' },
    ],
    next: 'o2-settings-info',
  },

  {
    id: 'o2-nrb-info',
    type: 'info',
    module: 2,
    title: 'Non-Rebreather Mask',
    body: '**Non-Rebreather (NRB) Mask**\n\n**Settings:**\n- Flow: **10-15 L/min** (must keep reservoir bag inflated)\n- FiO2: **60-90%** (theoretical max ~90%)\n\n**Setup:**\n1. Attach reservoir bag to mask\n2. Occlude mask opening, flush bag with O2 until full\n3. Place on patient, adjust flow to keep bag ≥1/3 full during inspiration\n4. Typical starting flow: **15 L/min**\n\n**Critical Point:** If reservoir bag deflates during inspiration, patient is not getting adequate O2. Increase flow or check connections.\n\n**Limitations:**\n- Cannot eat/drink/speak easily\n- Maximum ~90% FiO2 due to room air entrainment\n- Short-term bridge — not definitive therapy\n\n**If SpO2 not improving on NRB:** Escalate to HFNC or NIV. [1][3]',
    citation: [1, 3],
    calculatorLinks: [
      { id: 'oxygen-settings', label: 'Oxygen Settings Calculator' },
    ],
    next: 'o2-settings-info',
  },

  {
    id: 'o2-venturi-info',
    type: 'info',
    module: 2,
    title: 'Venturi Mask — Precise FiO2',
    body: '**Venturi Mask (Air Entrainment Mask)**\n\n**Key Feature:** Delivers precise, fixed FiO2 regardless of patient\'s breathing pattern.\n\n**How It Works:** Jet of O2 entrains room air through calibrated ports. Total flow exceeds patient demand → reliable FiO2.\n\n**Color-Coded Adapters:**\n\n| Color | FiO2 | O2 Flow | Total Flow |\n|-------|------|---------|------------|\n| Blue | 24% | 2-4 L/min | ~50 L/min |\n| Yellow | 28% | 4-6 L/min | ~45 L/min |\n| White | 31% | 6-8 L/min | ~40 L/min |\n| Green | 35% | 8-10 L/min | ~35 L/min |\n| Pink | 40% | 10-12 L/min | ~30 L/min |\n| Orange | 50-60% | 12-15 L/min | ~25 L/min |\n\n**Best For:**\n- COPD (precise low FiO2)\n- Weaning from high-flow O2\n- When accurate FiO2 documentation needed [1][3]',
    citation: [1, 3],
    calculatorLinks: [
      { id: 'oxygen-settings', label: 'Oxygen Settings Calculator' },
    ],
    next: 'o2-settings-info',
  },

  {
    id: 'o2-hfnc-info',
    type: 'info',
    module: 2,
    title: 'High-Flow Nasal Cannula (HFNC)',
    body: '**High-Flow Nasal Cannula (HFNC)**\n\n**Settings:**\n- **Flow:** 20-70 L/min (start 40-50 L/min)\n- **FiO2:** 21-100% (start at level to achieve SpO2 target)\n- **Temperature:** 31-37°C (usually 37°C)\n\n**Physiologic Benefits:**\n1. **Meets inspiratory demand** — Flow matches/exceeds patient\'s peak inspiratory flow\n2. **Dead space washout** — Flushes nasopharyngeal dead space\n3. **PEEP effect** — ~1 cmH2O per 10 L/min flow (mouth closed)\n4. **Humidification** — Improves mucociliary clearance, comfort\n5. **Reduced work of breathing**\n\n**Initial Settings:**\n- Flow: **40-50 L/min**\n- FiO2: Titrate to SpO2 92-96% (88-92% in COPD)\n- Temperature: **37°C**\n\n**ROX Index** — Predicts HFNC failure:\n- ROX = (SpO2/FiO2) / RR\n- ROX ≥4.88 at 2, 6, 12h → Low risk of intubation\n- ROX <3.85 → High risk of intubation [2][4][6]',
    citation: [2, 4, 6],
    calculatorLinks: [
      { id: 'oxygen-settings', label: 'Oxygen Settings Calculator' },
      { id: 'rox-index', label: 'ROX Index Calculator' },
    ],
    next: 'o2-settings-info',
  },

  {
    id: 'o2-niv-selection',
    type: 'question',
    module: 2,
    title: 'NIV: CPAP vs BiPAP',
    body: '**Non-Invasive Ventilation Options:**\n\n| Mode | Pressures | Best For |\n|------|-----------|----------|\n| **CPAP** | Single pressure (PEEP only) | CHF/pulmonary edema, OSA, atelectasis |\n| **BiPAP** | IPAP + EPAP | COPD, hypercapnic failure, Type 2 RF |\n\n**CPAP:**\n- Delivers continuous positive airway pressure\n- Recruits alveoli, reduces preload/afterload\n- No ventilatory support (patient controls all breaths)\n\n**BiPAP:**\n- IPAP (inspiratory) + EPAP (expiratory) pressures\n- Pressure support = IPAP - EPAP\n- Augments ventilation → clears CO2\n- Can set backup rate for apnea\n\n**Which does this patient need?**',
    citation: [2, 5, 7],
    options: [
      {
        label: 'CPAP',
        description: 'CHF/flash pulmonary edema, OSA',
        next: 'o2-cpap-info',
        urgency: 'urgent',
      },
      {
        label: 'BiPAP',
        description: 'COPD, hypercapnic respiratory failure',
        next: 'o2-bipap-info',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'o2-cpap-info',
    type: 'info',
    module: 2,
    title: 'CPAP Settings',
    body: '**Continuous Positive Airway Pressure (CPAP)**\n\n**Mechanism:**\n- Single continuous pressure throughout respiratory cycle\n- Recruits collapsed alveoli\n- Reduces venous return (decreases preload)\n- Decreases LV afterload → improves cardiac output in CHF\n\n**Initial Settings:**\n- **Pressure:** 5-10 cmH2O (start 5, titrate up)\n- **FiO2:** Titrate to SpO2 ≥92%\n\n**Typical CHF Protocol:**\n1. Start CPAP 5 cmH2O, FiO2 100%\n2. Titrate CPAP up by 2-3 cmH2O q5-10 min as tolerated\n3. Typical effective range: 8-12 cmH2O\n4. Wean FiO2 as SpO2 improves\n5. Reassess q15-30 min\n\n**Signs of Response:**\n- Decreased RR, improved SpO2\n- Decreased work of breathing\n- Improved mental status\n- Diuresis (if given diuretics)\n\n**Stop/Intubate If:**\n- Worsening mental status\n- Unable to tolerate mask\n- Hemodynamic instability\n- No improvement after 1-2 hours [5][7]',
    citation: [5, 7],
    calculatorLinks: [
      { id: 'oxygen-settings', label: 'Oxygen Settings Calculator' },
    ],
    next: 'o2-settings-info',
  },

  {
    id: 'o2-bipap-info',
    type: 'info',
    module: 2,
    title: 'BiPAP Settings',
    body: '**Bilevel Positive Airway Pressure (BiPAP)**\n\n**Settings:**\n- **IPAP:** Inspiratory pressure (10-20 cmH2O)\n- **EPAP:** Expiratory pressure (5-10 cmH2O)\n- **Pressure Support** = IPAP - EPAP (drives ventilation)\n- **FiO2:** Titrate to target SpO2\n- **Backup Rate:** 8-12/min (for apnea)\n\n**Initial Settings (COPD Exacerbation):**\n| Parameter | Start | Titrate |\n|-----------|-------|--------|\n| IPAP | 10-12 cmH2O | ↑ by 2 q5-10 min to max 20-25 |\n| EPAP | 5 cmH2O | ↑ if not oxygenating |\n| FiO2 | 100% (then wean) | Target SpO2 88-92% |\n| Backup Rate | 10/min | Adjust for comfort |\n\n**Titration Principles:**\n- **Increase IPAP** → Better ventilation (↓ CO2)\n- **Increase EPAP** → Better oxygenation (↑ PEEP/recruitment)\n- **Increase FiO2** → Better oxygenation\n\n**Goals:**\n- Decreased RR (<25/min)\n- Improved tidal volumes\n- Improved pH/pCO2 on ABG\n- Decreased work of breathing [2][5][7]',
    citation: [2, 5, 7],
    calculatorLinks: [
      { id: 'oxygen-settings', label: 'Oxygen Settings Calculator' },
    ],
    next: 'o2-settings-info',
  },

  {
    id: 'o2-intubation-bridge',
    type: 'info',
    module: 2,
    title: 'Preoxygenation Before Intubation',
    body: '**Optimizing Oxygenation Before RSI:**\n\n**Goal:** Maximize oxygen reserve to extend safe apnea time.\n\n**Preoxygenation Options:**\n\n| Method | Duration | Expected SpO2 |\n|--------|----------|---------------|\n| NRB 15 L/min | 3-5 min | ~100% |\n| BVM with PEEP valve | 3-5 min | ~100% |\n| HFNC 60-70 L/min, 100% FiO2 | 3-5 min | ~100% |\n| NIV (if tolerated) | 3-5 min | ~100% |\n\n**During Apnea (Apneic Oxygenation):**\n- **Nasal cannula 15 L/min** OR\n- **HFNC 60-70 L/min** throughout intubation attempt\n- Provides passive oxygenation during apnea\n- Can extend safe apnea time by 2-3+ minutes\n\n**NODESAT Protocol:**\n- **N**asal cannula at 15 L/min (or HFNC)\n- **O**ral preoxygenation (NRB or BVM-PEEP)\n- **D**ead space washout\n- **E**levate head of bed 20-30°\n- **S**aturation target 100%\n- **A**void prolonged attempts\n- **T**ake your time [8]',
    citation: [8],
    next: 'o2-escalation',
  },

  // =====================================================================
  // MODULE 3: SETTINGS CONFIGURATION
  // =====================================================================

  {
    id: 'o2-settings-info',
    type: 'info',
    module: 3,
    title: 'Configure Device Settings',
    body: '**Use the Oxygen Settings Calculator to configure your device:**\n\n**Select a device, then adjust settings with the sliders.**\n\n**Quick Reference:**\n\n| Device | Flow/Pressure | FiO2 Range |\n|--------|---------------|------------|\n| Nasal Cannula | 1-6 L/min | 24-44% |\n| Simple Mask | 5-10 L/min | 35-55% |\n| Non-Rebreather | 10-15 L/min | 60-90% |\n| Venturi Mask | 2-15 L/min | 24-60% (set) |\n| HFNC | 20-70 L/min | 21-100% |\n| CPAP | 5-20 cmH2O | 21-100% |\n| BiPAP | IPAP 10-30 / EPAP 5-15 | 21-100% |\n\n**Open the calculator to configure settings interactively.** [1][2][3]',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'oxygen-settings', label: 'Oxygen Settings Calculator' },
    ],
    next: 'o2-titration',
  },

  // =====================================================================
  // MODULE 4: TITRATION PROTOCOLS
  // =====================================================================

  {
    id: 'o2-titration',
    type: 'question',
    module: 4,
    title: 'Titration Strategy',
    body: '**Titration depends on the device and clinical response.**\n\nWhich device are you titrating?',
    citation: [1, 2],
    options: [
      {
        label: 'Low-Flow (NC, Mask, NRB)',
        description: 'Titrate flow to SpO2 target',
        next: 'o2-titrate-lowflow',
      },
      {
        label: 'HFNC',
        description: 'Titrate flow and FiO2',
        next: 'o2-titrate-hfnc',
      },
      {
        label: 'CPAP',
        description: 'Titrate pressure and FiO2',
        next: 'o2-titrate-cpap',
      },
      {
        label: 'BiPAP',
        description: 'Titrate IPAP, EPAP, FiO2',
        next: 'o2-titrate-bipap',
      },
    ],
  },

  {
    id: 'o2-titrate-lowflow',
    type: 'info',
    module: 4,
    title: 'Titrating Low-Flow Oxygen',
    body: '**Low-Flow Device Titration:**\n\n**Nasal Cannula:**\n- Start 2 L/min, increase by 1 L/min q5 min\n- Target SpO2 92-96% (88-92% in COPD)\n- Max effective: 6 L/min\n- If need >6 L/min → escalate to mask or HFNC\n\n**Simple Mask:**\n- Minimum flow: 5 L/min (to prevent CO2 rebreathing)\n- Titrate 5-10 L/min to SpO2 target\n- If need >10 L/min → escalate to NRB or HFNC\n\n**Non-Rebreather:**\n- Always set to 10-15 L/min\n- Keep reservoir bag ≥1/3 full\n- If SpO2 still inadequate on 15 L/min → escalate to HFNC or NIV\n\n**Weaning:**\n- Stable SpO2 for 1-2 hours → trial lower flow\n- NC 2 L/min with SpO2 ≥92% on room air → discontinue [1][3]',
    citation: [1, 3],
    next: 'o2-monitoring',
  },

  {
    id: 'o2-titrate-hfnc',
    type: 'info',
    module: 4,
    title: 'Titrating HFNC',
    body: '**HFNC Titration Protocol:**\n\n**Initial Settings:**\n- Flow: 40-50 L/min\n- FiO2: Start 60-100%, titrate down\n- Temperature: 37°C\n\n**Titration Principles:**\n\n**Oxygenation (SpO2):**\n- ↑ FiO2 if SpO2 below target\n- ↓ FiO2 once SpO2 stable at target\n\n**Comfort/Work of Breathing:**\n- ↑ Flow if patient appears hungry for air\n- ↓ Flow if patient uncomfortable with high flow\n- Most patients tolerate 50-60 L/min\n\n**Weaning Strategy:**\n1. First, wean FiO2 to ≤40%\n2. Then, wean flow by 5-10 L/min q1-2h\n3. When flow <20 L/min and FiO2 <40% → trial NC\n\n**Escalation Triggers:**\n- ROX Index <3.85 at 2h or decreasing\n- RR >30 despite optimization\n- Accessory muscle use increasing\n- SpO2 <88% on FiO2 100% [2][4][6]',
    citation: [2, 4, 6],
    calculatorLinks: [
      { id: 'rox-index', label: 'ROX Index Calculator' },
    ],
    next: 'o2-monitoring',
  },

  {
    id: 'o2-titrate-cpap',
    type: 'info',
    module: 4,
    title: 'Titrating CPAP',
    body: '**CPAP Titration (CHF/Pulmonary Edema):**\n\n**Initial:**\n- CPAP: 5 cmH2O\n- FiO2: 100%\n\n**Titration:**\n1. Increase CPAP by 2-3 cmH2O q5-10 min\n2. Typical effective range: 8-12 cmH2O\n3. Max: 15-20 cmH2O (higher may cause discomfort)\n\n**Oxygenation:**\n- Once SpO2 >94%, begin weaning FiO2\n- Target SpO2 92-96%\n\n**Signs of Response (expect within 30-60 min):**\n- Decreased RR (<25/min)\n- Improved SpO2\n- Decreased accessory muscle use\n- Patient reports improved breathing\n- Diuresis (if diuretics given)\n\n**Weaning Protocol:**\n1. Once stable x1-2h: ↓ CPAP by 2 cmH2O q30 min\n2. When CPAP 5 cmH2O, FiO2 <40%, SpO2 >92% → trial off NIV\n3. Apply NC 2-4 L/min, observe x30 min\n\n**Failure/Intubation Criteria:**\n- No improvement after 1-2 hours\n- Worsening mental status\n- Hemodynamic instability [5][7]',
    citation: [5, 7],
    next: 'o2-monitoring',
  },

  {
    id: 'o2-titrate-bipap',
    type: 'info',
    module: 4,
    title: 'Titrating BiPAP',
    body: '**BiPAP Titration (COPD/Hypercapnic Failure):**\n\n**Initial Settings:**\n- IPAP: 10-12 cmH2O\n- EPAP: 5 cmH2O\n- FiO2: Start high, wean to SpO2 88-92%\n- Backup Rate: 10/min\n\n**Titration by Problem:**\n\n**Hypercapnia (pCO2 >45, pH <7.35):**\n- ↑ IPAP by 2 cmH2O q5-10 min\n- Goal: Increase tidal volume → blow off CO2\n- Max IPAP: 20-25 cmH2O\n\n**Hypoxemia (SpO2 <88%):**\n- ↑ FiO2 first\n- ↑ EPAP by 2 cmH2O (increases PEEP, recruits alveoli)\n- Max EPAP: 10-12 cmH2O\n\n**Patient-Ventilator Dyssynchrony:**\n- Adjust trigger sensitivity\n- Adjust rise time\n- Consider different mask fit\n\n**Check ABG at 1-2 hours:**\n- pH improving → continue current settings\n- pH worsening or unchanged → reassess, consider intubation\n\n**Weaning:**\n- Wean IPAP before EPAP\n- When IPAP ≤12, EPAP 5, FiO2 <40% → trial off [2][5][7]',
    citation: [2, 5, 7],
    next: 'o2-monitoring',
  },

  // =====================================================================
  // MODULE 5: MONITORING
  // =====================================================================

  {
    id: 'o2-monitoring',
    type: 'info',
    module: 5,
    title: 'Monitoring & Assessment',
    body: '**Continuous Monitoring:**\n\n**All Patients:**\n- SpO2 (continuous)\n- Respiratory rate q15-30 min\n- Work of breathing assessment\n- Mental status\n\n**HFNC — ROX Index:**\n- ROX = (SpO2/FiO2) / RR\n- Calculate at 2h, 6h, 12h\n- ROX ≥4.88 → Low risk of intubation\n- ROX <3.85 → High risk, consider escalation\n- ROX 3.85-4.88 → Intermediate, close monitoring\n\n**NIV — ABG Monitoring:**\n- Check ABG at 1-2 hours after initiation\n- If pH improving → continue\n- If pH unchanged/worse → escalate\n\n**Signs of Failure:**\n- Worsening tachypnea (RR >30-35)\n- Increasing FiO2 requirements\n- Declining mental status\n- Hemodynamic instability\n- Patient fatigue/exhaustion\n- ROX Index declining [2][4][6]',
    citation: [2, 4, 6],
    calculatorLinks: [
      { id: 'rox-index', label: 'ROX Index Calculator' },
      { id: 'oxygen-settings', label: 'Oxygen Settings Calculator' },
    ],
    next: 'o2-spo2-targets',
  },

  {
    id: 'o2-spo2-targets',
    type: 'info',
    module: 5,
    title: 'SpO2 Targets by Condition',
    body: '**Condition-Specific SpO2 Targets:**\n\n| Condition | Target SpO2 | Rationale |\n|-----------|-------------|----------|\n| **General hypoxemia** | 92-96% | Adequate oxygenation without hyperoxia |\n| **COPD / CO2 retainer** | 88-92% | Avoid suppressing hypoxic drive, Haldane effect |\n| **ARDS** | 88-95% | Permissive hypoxemia, avoid hyperoxia |\n| **MI / ACS** | 90-94% | Avoid hyperoxia (may worsen outcomes) |\n| **Stroke** | 94-98% | Adequate perfusion, avoid hypoxia |\n| **Pregnancy** | >95% | Fetal oxygenation |\n| **Post-cardiac arrest** | 94-98% | Avoid hypoxia and hyperoxia |\n| **COVID-19 / ARDS** | 88-92% | Permissive hypoxemia per protocols |\n\n**Hyperoxia Harm:**\n- Absorptive atelectasis\n- Oxygen free radical damage\n- Coronary/cerebral vasoconstriction\n- Worse outcomes in MI, stroke, cardiac arrest [1][9]',
    citation: [1, 9],
    next: 'o2-escalation',
  },

  // =====================================================================
  // MODULE 6: ESCALATION & DISPOSITION
  // =====================================================================

  {
    id: 'o2-escalation',
    type: 'question',
    module: 6,
    title: 'Escalation Decision',
    body: '**Current device failing — what\'s next?**\n\n**Escalation Ladder:**\n1. NC → Mask → NRB\n2. NRB → HFNC or NIV\n3. HFNC → NIV or Intubation\n4. NIV → Intubation\n\n**Current status?**',
    citation: [1, 2],
    options: [
      {
        label: 'Stable — Ready for Disposition',
        description: 'Improving on current therapy',
        next: 'o2-disposition',
      },
      {
        label: 'Failing Low-Flow → Escalate to HFNC',
        description: 'Need higher support',
        next: 'o2-hfnc-info',
        urgency: 'urgent',
      },
      {
        label: 'Failing HFNC → Trial NIV',
        description: 'Type 2 component or HFNC not enough',
        next: 'o2-niv-selection',
        urgency: 'urgent',
      },
      {
        label: 'Failing NIV → Intubation',
        description: 'Refractory hypoxemia/hypercapnia',
        next: 'o2-intubation-criteria',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'o2-intubation-criteria',
    type: 'info',
    module: 6,
    title: 'Intubation Criteria',
    body: '**Indications for Intubation:**\n\n**Absolute:**\n- Cardiac or respiratory arrest\n- GCS ≤8 or rapidly declining\n- Unable to protect airway (secretions, vomiting)\n- Upper airway obstruction\n\n**Strong Indications:**\n- Refractory hypoxemia (SpO2 <88% despite maximal NIV/HFNC)\n- Severe respiratory acidosis (pH <7.20) not improving on NIV\n- Respiratory fatigue/exhaustion\n- Hemodynamic instability\n- High work of breathing despite optimization\n- Anticipated deterioration (e.g., proceeding to OR)\n\n**Delayed Intubation Harm:**\n- Crash intubation = higher complication rate\n- Hypoxic arrest during intubation\n- Aspiration risk\n\n**Remember:** Intubation is a procedure, not a failure. Early controlled intubation > late emergent intubation. [8]',
    citation: [8],
    next: 'o2-disposition',
  },

  {
    id: 'o2-disposition',
    type: 'result',
    module: 6,
    title: 'Oxygen Delivery — Disposition',
    body: '**Disposition Based on O2 Requirements:**\n\n| O2 Device | Typical Disposition |\n|-----------|--------------------|\n| NC ≤4 L/min | Floor bed, monitor SpO2 |\n| NC 5-6 L/min | Step-down or tele bed |\n| High-flow mask / NRB | ICU or step-down |\n| HFNC | ICU |\n| NIV (CPAP/BiPAP) | ICU |\n| Intubated | ICU |\n\n**Discharge Criteria (if applicable):**\n- SpO2 ≥92% on ≤2 L/min NC (or baseline)\n- Stable vitals for 2-4 hours\n- Ambulate without significant desaturation\n- Underlying cause treated/controlled\n- Follow-up arranged\n\n**Documentation:**\n- Device and settings at time of disposition\n- SpO2 on current therapy\n- Trend (improving, stable, or worsening)\n- ROX Index (if HFNC)\n- ABG results (if obtained)',
    recommendation: 'Match disposition to oxygen requirements. HFNC and NIV require ICU-level monitoring. Ensure SpO2 targets are documented and communicated at handoff.',
    confidence: 'recommended',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'oxygen-settings', label: 'Oxygen Settings Calculator' },
      { id: 'rox-index', label: 'ROX Index Calculator' },
    ],
  },
];

export const OXYGEN_DELIVERY_NODE_COUNT = OXYGEN_DELIVERY_NODES.length;

export const OXYGEN_DELIVERY_MODULE_LABELS = [
  'Assessment',
  'Device Selection',
  'Settings',
  'Titration',
  'Monitoring',
  'Escalation',
];

export const OXYGEN_DELIVERY_CITATIONS: Citation[] = [
  { num: 1, text: 'UpToDate. Oxygen Delivery Systems and Devices. 2025.' },
  { num: 2, text: 'Farkas J. IBCC: Oxygen Therapy & High-Flow Nasal Cannula. 2024.' },
  { num: 3, text: 'Kallstrom TJ. AARC Clinical Practice Guideline: Oxygen Therapy for Adults. Respir Care. 2002;47(6):717-720.' },
  { num: 4, text: 'Roca O, et al. High-Flow Oxygen Therapy in Acute Respiratory Failure. Crit Care Med. 2016;44(10):1766-1773.' },
  { num: 5, text: 'Rochwerg B, et al. Official ERS/ATS Clinical Practice Guidelines: Noninvasive Ventilation for Acute Respiratory Failure. Eur Respir J. 2017;50(2):1602426.' },
  { num: 6, text: 'Roca O, et al. ROX Index Predicts Intubation in Patients with Acute Hypoxemic Respiratory Failure. Am J Respir Crit Care Med. 2019;199(10):1368-1376.' },
  { num: 7, text: 'Masip J, et al. Non-invasive Ventilation in Acute Cardiogenic Pulmonary Edema. Intensive Care Med. 2005;31(7):882-891.' },
  { num: 8, text: 'Weingart SD, Levitan RM. Preoxygenation and Prevention of Desaturation During Emergency Airway Management. Ann Emerg Med. 2012;59(3):165-175.' },
  { num: 9, text: 'Chu DK, et al. Mortality and Morbidity in Acutely Ill Adults Treated with Liberal versus Conservative Oxygen Therapy: A Systematic Review and Meta-analysis. Lancet. 2018;391(10131):1693-1705.' },
];
