// MedKitt — ECMO (Extracorporeal Membrane Oxygenation)
// Comprehensive consult for VV-ECMO vs VA-ECMO selection, indications,
// contraindications, cannulation strategies, complications, and CV colleague communication.
// 10 modules: Recognition → VV vs VA Selection → VV-ECMO → VA-ECMO → Contraindications →
//             Cannulation → Complications → Scores → Communication → Disposition
// Sources: EMCrit IBCC, ELSO Guidelines, Dr. Katrina Augustin CV-EMCrit, EOLIA, CESAR trials

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const ECMO_CRITICAL_ACTIONS = [
  { text: 'VV-ECMO provides oxygenation ONLY (no hemodynamic support) - patient must have adequate cardiac function', nodeId: 'ecmo-start' },
  { text: 'VA-ECMO provides oxygenation AND circulatory support - for cardiogenic shock and cardiac arrest', nodeId: 'ecmo-start' },
  { text: 'When in doubt between VV and VA, go VA - VA can support both heart and lungs, VV cannot support failing heart', nodeId: 'ecmo-selection-decision' },
  { text: 'VV-ECMO indication: PaO2/FiO2 <80 on FiO2 100% despite optimal ventilator settings', nodeId: 'ecmo-vv-indications' },
  { text: 'VA-ECMO indication: lactate >4 and rising + CI <2.0 + MAP <65 despite high-dose pressors', nodeId: 'ecmo-va-indications' },
  { text: 'ECPR (cardiac arrest): CPR <60 min, witnessed arrest, bystander CPR, shockable rhythm best outcomes', nodeId: 'ecmo-ecpr' },
  { text: 'Absolute contraindication: severe aortic regurgitation for VA-ECMO (worsens with retrograde flow)', nodeId: 'ecmo-contraindications' },
  { text: 'RESP score >3 predicts 75% survival on VV-ECMO | <-2 predicts 18% survival - use for triage', nodeId: 'ecmo-resp-score' },
  { text: 'Harlequin syndrome in VA-ECMO: upper body cyanosis + lower body pink = left ventricular failure with mixing', nodeId: 'ecmo-harlequin' },
];

export const ECMO_NODES: DecisionNode[] = [
  // ═══════════════════════════════════════════════════════════════
  // MODULE 1: Recognition & Initial Assessment
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ecmo-start',
    type: 'question',
    module: 1,
    title: 'ECMO — Initial Assessment',
    body: '[ECMO Steps Summary](#/info/ecmo-steps-summary) — quick reference.\n\n**ECMO = Extracorporeal Membrane Oxygenation**\n\nA form of prolonged cardiopulmonary bypass that provides temporary support for refractory respiratory and/or cardiac failure [1][2].\n\n**Two primary configurations:**\n\n**VV-ECMO (Veno-Venous):**\n• Provides **oxygenation and CO₂ removal ONLY**\n• No hemodynamic support\n• Patient must have adequate cardiac function\n• Bridge to lung recovery or transplant\n\n**VA-ECMO (Veno-Arterial):**\n• Provides **oxygenation AND circulatory support**\n• Bypasses both heart and lungs\n• For cardiogenic shock, cardiac arrest (ECPR)\n• Bridge to recovery, LVAD, or transplant\n\n**Key question:** What is failing — the lungs, the heart, or both?',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'ecmo-vv-va-selector', label: 'VV vs VA Selector' },
      { id: 'ecmo-resp-score', label: 'RESP Score (VV)' },
      { id: 'ecmo-save-score', label: 'SAVE Score (VA)' },
    ],
    options: [
      {
        label: 'Respiratory Failure (Lungs)',
        description: 'ARDS, refractory hypoxemia, severe hypercapnia — heart function preserved',
        next: 'ecmo-vv-indications',
      },
      {
        label: 'Cardiogenic Shock (Heart)',
        description: 'Refractory cardiogenic shock, post-MI, myocarditis — needs circulatory support',
        next: 'ecmo-va-indications',
        urgency: 'urgent',
      },
      {
        label: 'Cardiac Arrest (ECPR)',
        description: 'Refractory arrest — extracorporeal CPR consideration',
        next: 'ecmo-ecpr',
        urgency: 'critical',
      },
      {
        label: 'Both / Unclear',
        description: 'Combined cardiopulmonary failure or diagnostic uncertainty',
        next: 'ecmo-selection-decision',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 2: VV vs VA Selection
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ecmo-selection-decision',
    type: 'question',
    module: 2,
    title: 'VV vs VA ECMO Selection',
    body: '[VV vs VA Decision Tool](#/calc/ecmo-vv-va-selector)\n\n**The fundamental question:** Does the patient need circulatory support?\n\n**Choose VV-ECMO if:**\n• Isolated respiratory failure\n• Adequate cardiac output (CI >2.2 L/min/m²)\n• No significant vasopressor requirement\n• MAP maintained without high-dose pressors\n• Cardiac function adequate on echo\n\n**Choose VA-ECMO if:**\n• Cardiogenic shock (any cause)\n• Refractory arrest\n• Combined cardiopulmonary failure\n• High vasopressor requirements\n• Evidence of inadequate cardiac output\n\n**If unsure:** VA-ECMO can support both heart and lungs. VV-ECMO cannot support a failing heart. **When in doubt, go VA** [1][3].\n\nWhat is the primary failure?',
    citation: [1, 3],
    options: [
      {
        label: 'Isolated Respiratory Failure → VV-ECMO',
        description: 'Adequate cardiac function, isolated lung disease',
        next: 'ecmo-vv-indications',
      },
      {
        label: 'Cardiogenic Component → VA-ECMO',
        description: 'Shock, high pressors, poor cardiac function',
        next: 'ecmo-va-indications',
        urgency: 'urgent',
      },
      {
        label: 'Cannot Determine',
        description: 'Need echo, hemodynamic assessment',
        next: 'ecmo-assessment',
      },
    ],
  },

  {
    id: 'ecmo-assessment',
    type: 'info',
    module: 2,
    title: 'Hemodynamic Assessment for ECMO Selection',
    body: '**Rapid bedside assessment to determine VV vs VA:**\n\n**ECHO findings favoring VV-ECMO:**\n• LVEF >35-40%\n• No significant RV dilation/dysfunction\n• Normal or near-normal cardiac output\n• No significant valvular disease\n\n**ECHO findings favoring VA-ECMO:**\n• LVEF <25-30%\n• Severe RV dysfunction\n• Global hypokinesis\n• Severe MR/AR (relative contraindication)\n\n**Hemodynamic parameters:**\n| Parameter | VV Candidate | VA Candidate |\n|-----------|--------------|---------------|\n| MAP | >65 on low pressors | <65 or high pressors |\n| CI | >2.2 L/min/m² | <2.0 L/min/m² |\n| ScvO₂ | >70% | <60% |\n| Lactate | <4 | >4, rising |\n\n**Clinical gestalt:**\n• If the patient "looks shocky" and has multiorgan failure → lean VA\n• If only lungs are failing → VV',
    citation: [1, 3, 4],
    next: 'ecmo-selection-decision',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 3: VV-ECMO Indications & Management
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ecmo-vv-indications',
    type: 'info',
    module: 3,
    title: 'VV-ECMO Indications',
    body: '[RESP Score Calculator](#/calc/ecmo-resp-score) — VV-ECMO survival prediction.\n\n**VV-ECMO is indicated for severe, potentially REVERSIBLE respiratory failure** [1][2][5].\n\n**Classic indications:**\n\n**Hypoxemic respiratory failure (EOLIA criteria):**\n• P/F ratio <50 for >3 hours, OR\n• P/F ratio <80 for >6 hours\n• Despite optimal ventilation, prone positioning, and FiO₂ >80%\n\n**Hypercapnic respiratory failure:**\n• pH <7.20-7.25 with PaCO₂ >60 mmHg\n• Despite optimal ventilation and rescue therapies\n\n**Common etiologies:**\n• ARDS (viral, bacterial pneumonia)\n• COVID-19 ARDS\n• Aspiration pneumonitis\n• Trauma/contusion\n• Status asthmaticus (refractory)\n• Drowning/near-drowning\n• Massive air leak syndrome\n• Bridge to lung transplant\n\n**KEY: The lungs must be recoverable or the patient must be a transplant candidate** [2][5].',
    citation: [1, 2, 5],
    calculatorLinks: [
      { id: 'ecmo-resp-score', label: 'RESP Score' },
      { id: 'ecmo-murray-score', label: 'Murray Lung Injury Score' },
    ],
    next: 'ecmo-vv-timing',
  },

  {
    id: 'ecmo-vv-timing',
    type: 'info',
    module: 3,
    title: 'VV-ECMO — When to Call',
    body: '**CALL THE ECMO CENTER EARLY** — don\'t wait until the patient is moribund [2][6].\n\n**Dr. Augustin\'s guidance (CV-EMCrit):**\n\n**Call for referral when:**\n• Young patient with single organ failure\n• Reversible cause of respiratory failure\n• Failing conventional management\n• Mechanical ventilation <7 days (ideally)\n\n**EOLIA/CESAR trial thresholds:**\n• P/F <80 despite optimization\n• pH <7.25 with rising PaCO₂\n• Murray score ≥3.0\n• Uncompensated hypercapnia with pH <7.20\n\n**Mortality increases sharply with:**\n• MV >7 days before ECMO: 77% mortality vs 38% if <7 days [6]\n• Pplat >30 + FiO₂ >90% for >7 days\n• Multi-organ failure\n\n**What to optimize before calling:**\n• Prone positioning (if not contraindicated)\n• Neuromuscular blockade\n• Conservative fluid management\n• Lung-protective ventilation\n\n**DON\'T delay the call waiting for everything to fail.**',
    citation: [2, 5, 6],
    next: 'ecmo-vv-flow',
  },

  {
    id: 'ecmo-vv-flow',
    type: 'info',
    module: 3,
    title: 'VV-ECMO — Circuit Basics',
    body: '[VV-ECMO Circuit Visualization](#/info/ecmo-vv-circuit)\n\n**How VV-ECMO works:**\n\n**Blood flow:**\n1. Deoxygenated blood **drained** from venous system (usually femoral vein → IVC)\n2. Passes through **membrane oxygenator** (adds O₂, removes CO₂)\n3. **Returned** to venous system (usually IJ → SVC/RA junction)\n4. Oxygenated blood flows through native heart → lungs → systemic circulation\n\n**The heart still does ALL the pumping** — VV-ECMO only provides gas exchange.\n\n**Typical cannulation (Femorojugular):**\n• **Drainage cannula:** Femoral vein, tip at IVC/RA junction (near hepatic veins)\n• **Return cannula:** Right IJ, tip at SVC/RA junction\n• **Optimal separation:** 8-15 cm to minimize recirculation [1]\n\n**Alternative: Dual-lumen Avalon cannula**\n• Single IJ cannula\n• Drains from SVC and IVC, returns to RA directed at tricuspid valve\n• Technically challenging, requires fluoroscopy/TEE\n\n**Initial flow target:** BSA × 1.8 L/min/m² (typically ~5 L/min)',
    citation: [1, 2],
    next: 'ecmo-vv-settings',
  },

  {
    id: 'ecmo-vv-settings',
    type: 'info',
    module: 3,
    title: 'VV-ECMO — Initial Settings & Lung Rest',
    body: '**ECMO circuit settings:**\n\n**Flow:** Start at predicted flow (BSA × 1.8 L/min/m²), then titrate\n• Typical adult: 4-6 L/min\n• Target: SpO₂ >88-92% (don\'t need 100%)\n\n**Sweep gas (CO₂ removal):**\n• Start 1:1 ratio with blood flow (e.g., 4 L/min flow → 4 L/min sweep)\n• Titrate to PaCO₂ goal (typically 35-45)\n• Increasing sweep = more CO₂ removal\n\n**FiO₂ on circuit:** Start 100%, wean as able\n\n---\n\n**LUNG REST ventilator settings:**\n\nThe goal is to rest the injured lungs while ECMO handles gas exchange [1][2].\n\n| Parameter | Target |\n|-----------|--------|\n| PEEP | ≥10 cm (maintain recruitment) |\n| Pplat | <25 cm H₂O |\n| RR | 5-10 breaths/min |\n| Vt | ~4 cc/kg IBW |\n| FiO₂ | 30-50% |\n\n**Anticoagulation:**\n• Target PTT 50-70 seconds, OR\n• Anti-Xa 0.3-0.5 IU/mL\n• Adjust based on bleeding risk\n\n**Monitoring thresholds:**\n• P venous: >-100 mmHg (drainage)\n• P arterial: <300 mmHg (return)\n• Transmembrane pressure: <60 mmHg',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Heparin anticoagulation',
        dose: 'Target PTT 50-70 sec OR anti-Xa 0.3-0.5 IU/mL',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Duration of ECMO support',
        notes: 'Adjust intensity based on bleeding risk. Some centers use bivalirudin for HIT.',
      },
      monitoring: 'PTT or anti-Xa q6h until stable. Daily fibrinogen, platelets, Hgb. Monitor for circuit thrombosis.',
    },
    next: 'ecmo-vv-recirculation',
  },

  {
    id: 'ecmo-vv-recirculation',
    type: 'info',
    module: 3,
    title: 'VV-ECMO — Recirculation',
    body: '[Recirculation Troubleshooting](#/calc/ecmo-recirculation)\n\n**Recirculation** = oxygenated blood returns to the circuit before reaching the systemic circulation [1][7].\n\n**Problem:** ECMO is oxygenating its own output, not the patient\'s blood.\n\n**Signs of significant recirculation:**\n• Poor systemic oxygenation despite high ECMO flow/FiO₂\n• Pre-membrane saturation (SpreO₂) >75-80%\n• Post-membrane saturation normal (SpostO₂ ~100%)\n• Patient saturation remains low\n\n**Calculating recirculation:**\n\n```\nRecirculation = (SpreO₂ - SvO₂) / (SpostO₂ - SvO₂) × 100%\n```\n\n**Causes:**\n• Cannulas too close together (<8 cm)\n• Excessive ECMO flow relative to cardiac output\n• Cannula malposition (return directed at drainage)\n\n**Fixes:**\n• Reposition cannulas (increase separation)\n• Decrease ECMO flow (if tolerated)\n• Increase native cardiac output (reduce sedation, add inotrope)\n• Consider dual-lumen cannula (Avalon) or reconfigure\n\n**Acceptable recirculation:** <10-15%',
    citation: [1, 7],
    next: 'ecmo-contraindications',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 4: VA-ECMO Indications & Management
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ecmo-va-indications',
    type: 'info',
    module: 4,
    title: 'VA-ECMO Indications',
    body: '[SAVE Score Calculator](#/calc/ecmo-save-score) — VA-ECMO survival prediction.\n\n**VA-ECMO provides BOTH oxygenation AND circulatory support** [1][3][4].\n\n**Primary indications:**\n\n**Cardiogenic shock (refractory):**\n• Acute MI with shock (SCAI Stage C-E)\n• Acute decompensated heart failure\n• Fulminant myocarditis\n• Post-cardiotomy shock (failed to wean from bypass)\n• Sepsis-induced cardiomyopathy\n\n**Massive pulmonary embolism:**\n• Hemodynamically unstable PE\n• Failed or contraindicated thrombolysis\n• Bridge to embolectomy\n\n**Refractory arrhythmias:**\n• Electrical storm\n• VT/VF storm not responding to medical therapy\n\n**Cardiotoxic drug overdose:**\n• Beta-blocker, calcium channel blocker, TCA overdose\n• Failing HIET and pressors\n\n**Cardiac arrest (ECPR):**\n• Refractory arrest with presumed reversible cause\n• Witnessed, shockable rhythm, short downtime\n\n**Bridge strategies:**\n• Bridge to cardiac recovery\n• Bridge to LVAD\n• Bridge to heart transplant\n• Bridge to decision',
    citation: [1, 3, 4],
    calculatorLinks: [
      { id: 'ecmo-save-score', label: 'SAVE Score' },
      { id: 'ecmo-scai-stages', label: 'SCAI Shock Stages' },
    ],
    next: 'ecmo-va-timing',
  },

  {
    id: 'ecmo-va-timing',
    type: 'info',
    module: 4,
    title: 'VA-ECMO — Timing Matters',
    body: '**Early initiation improves outcomes** [3][4][8].\n\n**Key timing data:**\n• Each 12-hour delay from admission to VA-ECMO initiation increases adjusted in-hospital mortality by **6%** [8]\n• Initiation after 24 hours associated with worse outcomes\n• Don\'t wait until all other options have failed\n\n**When to consider VA-ECMO:**\n\n**SCAI Shock Stage C (Classic):**\n• Hypotension requiring vasopressors\n• Signs of hypoperfusion (lactate 2-4, Cr rising)\n• May still respond to escalating support\n\n**SCAI Shock Stage D (Deteriorating):**\n• Failing to respond to initial interventions\n• Requiring multiple/escalating pressors\n• Lactate >4 and rising\n• **THIS IS THE TIME TO CALL**\n\n**SCAI Shock Stage E (Extremis):**\n• Near-arrest or arrest\n• Refractory to maximal support\n• May be too late — but VA-ECMO can still be attempted\n\n**Call the ECMO team at Stage D, not Stage E.**',
    citation: [3, 4, 8],
    next: 'ecmo-va-flow',
  },

  {
    id: 'ecmo-va-flow',
    type: 'info',
    module: 4,
    title: 'VA-ECMO — Circuit Basics',
    body: '[VA-ECMO Circuit Visualization](#/info/ecmo-va-circuit)\n\n**How VA-ECMO works:**\n\n**Blood flow:**\n1. Deoxygenated blood **drained** from venous system (femoral vein → IVC/RA)\n2. Passes through **centrifugal pump** (provides forward flow)\n3. Passes through **membrane oxygenator** (gas exchange)\n4. **Returned** to arterial system (femoral artery → aorta)\n5. ECMO flow is **retrograde** in peripheral VA-ECMO\n\n**The ECMO circuit does the work of the heart AND lungs.**\n\n**Peripheral cannulation (Femoral-Femoral):**\n• **Drainage:** Femoral vein, tip at IVC/RA junction\n• **Return:** Femoral artery, tip in common iliac or distal aorta\n• **Distal perfusion cannula:** ESSENTIAL to prevent limb ischemia\n\n**Central cannulation (surgical):**\n• Direct aortic and right atrial cannulation\n• Essentially cardiopulmonary bypass\n• Used post-cardiotomy or when peripheral access not possible\n• Nearly all central VA-ECMO patients get LV vent\n\n**Initial flow target:** BSA × 2.4 L/min/m² (typically ~4-5 L/min)',
    citation: [1, 3],
    next: 'ecmo-va-settings',
  },

  {
    id: 'ecmo-va-settings',
    type: 'info',
    module: 4,
    title: 'VA-ECMO — Initial Settings',
    body: '**ECMO circuit settings:**\n\n**Flow:** Start at BSA × 2.4 L/min/m²\n• Typical adult: 4-5 L/min\n• Target: MAP >65, lactate clearing, adequate perfusion\n• May need 80-100% of cardiac output initially\n\n**Sweep gas:** Similar to VV — titrate to PaCO₂ goal\n\n**FiO₂ on circuit:** 100% initially\n\n---\n\n**Ventilator settings during VA-ECMO:**\n\nUnlike VV-ECMO, the native lungs still receive blood flow from the recovering heart.\n\n| Parameter | Target |\n|-----------|--------|\n| PEEP | 8-10 cm |\n| RR | 10-12/min |\n| Vt | 6-8 cc/kg |\n| FiO₂ | Titrate to SpO₂ |\n\n**Anticoagulation:** Same as VV — PTT 50-70 or anti-Xa 0.3-0.5\n\n---\n\n**Critical VA-ECMO monitoring:**\n\n• **Right radial arterial line** — monitor for differential hypoxemia\n• **Pulse oximeter on RIGHT hand/ear** — cerebral/coronary oxygenation\n• **Distal limb perfusion** — check hourly, NIRS if available\n• **LV distension** — echo for aortic valve opening, MR, LV thrombus',
    citation: [1, 3, 4],
    next: 'ecmo-va-harlequin',
  },

  {
    id: 'ecmo-va-harlequin',
    type: 'info',
    module: 4,
    title: 'Harlequin Syndrome (North-South)',
    body: '[Harlequin Syndrome Management](#/calc/ecmo-harlequin)\n\n**Harlequin Syndrome = Differential Hypoxemia** [7][9]\n\nAlso called North-South Syndrome or dual-circulation syndrome.\n\n**What happens:**\nIn peripheral (femoral) VA-ECMO, as the native heart recovers:\n• Heart ejects **deoxygenated blood** (if lungs still failing) → goes to **upper body** (coronaries, brain)\n• ECMO returns **oxygenated blood** retrograde → goes to **lower body**\n• **Mixing zone** in descending aorta\n\n**Result:** Upper body hypoxia, lower body well-oxygenated.\n\n**Clinical recognition:**\n• Right hand SpO₂ <90% (upper body)\n• Left foot SpO₂ normal (lower body)\n• Cerebral NIRS low\n• Upper body appears cyanotic, lower body pink\n\n**Dangers:**\n• **Coronary hypoxia** → ischemia, arrhythmia\n• **Cerebral hypoxia** → stroke, encephalopathy\n\n**Management options:**\n1. **Optimize native lung function** (recruitment, FiO₂, PEEP)\n2. **Increase ECMO flow** (push mixing zone proximally)\n3. **Convert to VAV-ECMO** — add venous return cannula to RA via IJ\n4. **Central cannulation** (surgical)\n5. **Dual circuit VA + VV** (resource-intensive)\n\n**Prevention:** Early recognition, right radial arterial line.',
    citation: [7, 9],
    next: 'ecmo-va-lv-distension',
  },

  {
    id: 'ecmo-va-lv-distension',
    type: 'info',
    module: 4,
    title: 'LV Distension on VA-ECMO',
    body: '**LV distension is a serious VA-ECMO complication** [1][3].\n\n**Mechanism:**\n• VA-ECMO increases afterload (retrograde arterial flow)\n• Failing LV cannot eject against increased afterload\n• Blood accumulates in LV → distension → pulmonary edema\n• Aortic valve may not open → stasis → LV thrombus\n\n**Signs of LV distension:**\n• Pulmonary edema on CXR (worsening)\n• Aortic valve not opening on echo\n• Severe MR\n• Rising pulmonary artery pressures\n• Blood-tinged secretions from ETT\n\n**Management options:**\n\n**1. Optimize inotropy:**\n• Low-dose dobutamine or milrinone\n• Help LV eject, open aortic valve\n\n**2. Reduce ECMO flow:**\n• Allow more native cardiac output\n• Only if patient tolerates\n\n**3. LV venting (interventional/surgical):**\n• **Impella** (percutaneous LV → aorta)\n• **Intra-aortic balloon pump** (modest effect)\n• **Surgical LV vent** (direct LV cannula)\n• **Atrial septostomy** (decompress LA)\n\n**Prevention:** Echo daily, monitor for aortic valve opening.\n\n**If AV not opening >24-48h → high risk of LV thrombus.**',
    citation: [1, 3],
    next: 'ecmo-contraindications',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 5: ECPR (Extracorporeal CPR)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ecmo-ecpr',
    type: 'info',
    module: 5,
    title: 'ECPR — Extracorporeal CPR',
    body: '**ECPR = VA-ECMO during cardiac arrest** [3][4][8].\n\n**Rationale:** Conventional CPR provides only 20-30% of normal cardiac output. ECMO provides full circulatory support, allowing time for treatment of reversible cause.\n\n**Evidence:**\n• Belohlavek RCT: 31.5% survived to 180 days with good neuro outcomes (ECPR) vs 22% (conventional CPR) [8]\n• Observational data: 15-50% survival with ECPR vs 10-20% with conventional CPR\n\n**Ideal ECPR candidate:**\n• Witnessed arrest\n• Initial shockable rhythm (VF/pVT)\n• Age <65-70 years\n• Short low-flow time (<60 min ideal, <90 min max)\n• High-quality CPR ongoing\n• Presumed REVERSIBLE cause\n• No severe comorbidities\n• Signs of life during CPR (ETCO₂ >10, pupil reactivity)\n\n**Reversible causes:**\n• Acute MI (→ ECMO + PCI)\n• Massive PE (→ ECMO + embolectomy/thrombolysis)\n• Hypothermia\n• Refractory VT/VF\n• Drug toxicity\n• Myocarditis\n\n**Poor ECPR candidates:**\n• Unwitnessed arrest\n• Asystole as initial rhythm\n• Prolonged downtime (>60-90 min)\n• Non-reversible cause\n• Severe comorbidities\n• Known poor baseline function',
    citation: [3, 4, 8],
    calculatorLinks: [
      { id: 'ecmo-ecpr-criteria', label: 'ECPR Candidacy Checklist' },
    ],
    next: 'ecmo-ecpr-logistics',
  },

  {
    id: 'ecmo-ecpr-logistics',
    type: 'info',
    module: 5,
    title: 'ECPR — Logistics',
    body: '**ECPR requires preparation and rapid deployment** [8].\n\n**Time is critical:**\n• Every 10 min of CPR without ECMO = worse outcomes\n• Target: cannulation within 60 minutes of arrest\n• Have team pre-notified if considering ECPR\n\n**Cannulation during CPR:**\n• Continue chest compressions during cannulation\n• Mechanical CPR device (LUCAS) helpful\n• Femoral-femoral cannulation (percutaneous or cut-down)\n• Ultrasound-guided access\n\n**Immediate post-cannulation:**\n• Confirm flows (target 4-5 L/min)\n• Check perfusion (lactate, ETCO₂ improving)\n• Arterial line if not already\n• Address cause: cath lab for STEMI, CT for PE, etc.\n\n**Temperature management:**\n• Circuit allows precise temperature control\n• Target 33-36°C for post-arrest care\n• Avoid hyperthermia\n\n**Prognostication:**\n• Do NOT prognosticate in first 72 hours\n• Allow rewarming and sedation washout\n• Serial neuro exams, EEG, imaging\n\n**Withdrawal decision:**\n• If no neurologic recovery after adequate assessment\n• If underlying cause non-recoverable\n• Family involvement essential',
    citation: [3, 8],
    next: 'ecmo-contraindications',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 6: Contraindications
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ecmo-contraindications',
    type: 'info',
    module: 6,
    title: 'ECMO Contraindications',
    body: '**Patient selection is critical** — inappropriate candidacy is a leading cause of poor ECMO outcomes [1][2][6].\n\n**ABSOLUTE CONTRAINDICATIONS:**\n\n• **Irreversible underlying disease** — no recovery possible, not a transplant candidate\n• **Advanced malignancy** with poor prognosis\n• **Severe irreversible neurologic injury** (massive stroke, anoxic brain injury)\n• **Unwitnessed arrest** with prolonged downtime and no signs of life\n• **Uncontrolled bleeding** or absolute contraindication to anticoagulation\n\n**RELATIVE CONTRAINDICATIONS:**\n\n**VV-ECMO specific:**\n• Mechanical ventilation >7-10 days with Pplat >30 + FiO₂ >90%\n• Multi-organ failure (high SOFA score)\n• Severe immunosuppression (varies by etiology)\n• Pulmonary hypertension (mPAP >50) — consider VA instead\n\n**VA-ECMO specific:**\n• Severe aortic regurgitation (LV distension risk)\n• Severe peripheral vascular disease (cannulation difficulty)\n• Aortic dissection (type A with branch involvement)\n\n**GENERAL relative contraindications:**\n• Advanced age (>70-75, institution-dependent)\n• Frailty (Clinical Frailty Scale ≥4)\n• Pre-existing organ dysfunction (cirrhosis, ESRD without transplant plan)\n• Prolonged CPR without ROSC\n• Morbid obesity (technical difficulty)',
    citation: [1, 2, 6],
    next: 'ecmo-cannulation',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 7: Cannulation Strategies
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ecmo-cannulation',
    type: 'question',
    module: 7,
    title: 'Cannulation Strategies',
    body: '[Cannula Size Calculator](#/calc/ecmo-cannula-size)\n\n**Cannulation configurations vary by ECMO type and clinical situation.**\n\n**VV-ECMO options:**\n• **Femorojugular:** Femoral drainage + IJ return (most common)\n• **Dual-lumen (Avalon):** Single IJ cannula (technically challenging)\n• **Femoral-femoral:** Both via femoral (higher recirculation risk)\n\n**VA-ECMO options:**\n• **Peripheral femoral-femoral:** Femoral vein + femoral artery (most common)\n• **Central:** Direct RA + aortic (surgical, post-cardiotomy)\n• **Subclavian artery return:** Avoids limb ischemia, upper body perfusion\n\nSelect configuration to review:',
    citation: [1, 2],
    options: [
      {
        label: 'VV-ECMO Cannulation',
        description: 'Femorojugular, dual-lumen, or femoral-femoral',
        next: 'ecmo-vv-cannulation',
      },
      {
        label: 'VA-ECMO Cannulation',
        description: 'Peripheral or central, limb perfusion',
        next: 'ecmo-va-cannulation',
      },
      {
        label: 'Skip to Complications',
        description: 'Review common ECMO complications',
        next: 'ecmo-complications',
      },
    ],
  },

  {
    id: 'ecmo-vv-cannulation',
    type: 'info',
    module: 7,
    title: 'VV-ECMO Cannulation',
    body: '**Femorojugular (most common):**\n\n**Drainage cannula (femoral vein):**\n• Size: 21-25 Fr (based on patient size)\n• Tip position: IVC/RA junction, near hepatic veins\n• Multi-stage design for better drainage\n\n**Return cannula (right IJ):**\n• Size: 17-21 Fr\n• Tip position: SVC/RA junction\n• Must be 8-15 cm from drainage cannula to minimize recirculation\n\n**Confirmation:**\n• CXR: verify tip positions\n• Echo: confirm cannula placement, rule out complications\n\n---\n\n**Dual-lumen (Avalon/Crescent):**\n\n• Single cannula via right IJ\n• Drains from both SVC and IVC\n• Returns oxygenated blood directed at tricuspid valve\n• Size: 27-31 Fr\n• **Advantages:** Single access site, mobilization easier\n• **Disadvantages:** Technically challenging insertion, requires fluoroscopy/TEE, malposition risk\n\n---\n\n**Femoral-femoral VV:**\n• Both cannulas via femoral veins\n• Higher recirculation risk\n• Reserve for when IJ not accessible',
    citation: [1, 2],
    next: 'ecmo-complications',
  },

  {
    id: 'ecmo-va-cannulation',
    type: 'info',
    module: 7,
    title: 'VA-ECMO Cannulation',
    body: '**Peripheral femoral-femoral (most common):**\n\n**Drainage cannula (femoral vein):**\n• Size: 21-25 Fr\n• Tip: IVC/RA junction\n\n**Return cannula (femoral artery):**\n• Size: 15-19 Fr (smaller to reduce vascular injury)\n• Tip: Common iliac artery or distal aorta\n\n**⚠️ DISTAL PERFUSION CANNULA — ESSENTIAL:**\n• 6-8 Fr sheath placed in SFA distal to arterial cannula\n• Spliced into arterial return line\n• Prevents limb ischemia (compartment syndrome, amputation)\n• Check distal pulses, NIRS monitoring\n\n---\n\n**Central cannulation (surgical):**\n\n• Direct RA drainage, aortic return\n• Requires sternotomy/thoracotomy\n• Used post-cardiotomy, when peripheral access impossible\n• LV vent typically placed simultaneously\n\n---\n\n**Subclavian/axillary artery return:**\n\n• Alternative to femoral arterial return\n• Provides antegrade flow to brain/coronaries\n• Avoids limb ischemia and differential hypoxemia\n• Technically more challenging, higher stroke risk\n\n**Hybrid configurations (VAV, VV-A):** For combined support needs.',
    citation: [1, 3],
    next: 'ecmo-complications',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 8: Complications
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ecmo-complications',
    type: 'info',
    module: 8,
    title: 'ECMO Complications',
    body: '[ECMO Troubleshooting Guide](#/calc/ecmo-troubleshooting)\n\n**ECMO is life-saving but high-risk** — complications are common [1][2].\n\n**BLEEDING (30-50%):**\n• Anticoagulation + acquired vWF deficiency + platelet consumption\n• Cannulation sites, GI, intracranial, pulmonary\n• Management: reduce anticoagulation, transfuse, consider TXA\n\n**THROMBOSIS (10-20%):**\n• Circuit clots (oxygenator, pump head)\n• Patient clots (DVT, PE, stroke, limb)\n• Balance anticoagulation carefully\n\n**LIMB ISCHEMIA (VA-ECMO, 10-20%):**\n• Femoral artery cannula obstructs flow\n• **Distal perfusion cannula is essential**\n• Monitor: pulses, NIRS, compartment checks\n\n**HEMOLYSIS:**\n• Pump shear stress, kinking, high RPM\n• Monitor: LDH, plasma-free Hgb, haptoglobin\n\n**INFECTION (10-30%):**\n• Cannula site infections, bacteremia\n• Monitor daily, low threshold for cultures\n\n**NEUROLOGIC (10-15%):**\n• Stroke (ischemic or hemorrhagic)\n• Hypoxic injury (differential hypoxemia in VA)\n• Seizures\n\n**AIR EMBOLISM:**\n• Rare but catastrophic\n• Circuit breach, access disconnection\n\n**RENAL FAILURE:**\n• Often pre-existing, worsened by ECMO\n• CRRT can be integrated into circuit',
    citation: [1, 2],
    next: 'ecmo-scores',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 9: Prediction Scores
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ecmo-scores',
    type: 'info',
    module: 9,
    title: 'ECMO Survival Prediction Scores',
    body: '**Scores aid decision-making but should NOT solely determine candidacy** [1][2][10].\n\n---\n\n**RESP Score (VV-ECMO):**\n[Calculate RESP Score](#/calc/ecmo-resp-score)\n\n• 12 pre-ECMO variables\n• Developed from ELSO registry (n=2,355)\n• Risk classes I-V with survival 92%, 76%, 57%, 33%, 18%\n• **Limitation:** Poor predictor for COVID-19 ARDS [10]\n\n**Key variables:** Age, immunocompromised status, MV duration, diagnosis, CNS dysfunction, pre-ECMO arrest, NMB use, nitric oxide, bicarb infusion, PaCO₂, PIP\n\n---\n\n**SAVE Score (VA-ECMO):**\n[Calculate SAVE Score](#/calc/ecmo-save-score)\n\n• 13 pre-ECMO variables\n• Developed from ELSO registry (n=3,846)\n• Overall survival to discharge: 42%\n• **Limitation:** May underestimate survival in contemporary cohorts\n\n**Protective factors:** Young age, acute myocarditis, refractory VT/VF, higher DBP\n**Risk factors:** CKD, prolonged ventilation, pre-ECMO arrest, low HCO₃\n\n---\n\n**Murray Score (Lung Injury):**\n[Calculate Murray Score](#/calc/ecmo-murray-score)\n\n• 4 variables: P/F ratio, PEEP, compliance, CXR quadrants\n• Score ≥3.0 = severe ARDS, ECMO consideration\n• Used in CESAR trial criteria',
    citation: [1, 2, 10],
    calculatorLinks: [
      { id: 'ecmo-resp-score', label: 'RESP Score' },
      { id: 'ecmo-save-score', label: 'SAVE Score' },
      { id: 'ecmo-murray-score', label: 'Murray Score' },
    ],
    next: 'ecmo-communication',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 10: Communication & Disposition
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ecmo-communication',
    type: 'info',
    module: 10,
    title: 'Communicating with CV Surgery/ECMO Team',
    body: '**When calling for ECMO consultation, have this information ready:**\n\n**Patient basics:**\n• Age, weight, height (for BSA)\n• Chief complaint, timeline of deterioration\n• Comorbidities (especially vascular disease, bleeding risk, frailty)\n\n**Respiratory parameters (if VV):**\n• P/F ratio, FiO₂, PEEP, Pplat\n• Vent settings and duration of mechanical ventilation\n• ABG: pH, PaCO₂, PaO₂\n• Prone positioning attempted? Response?\n• Chest imaging findings\n\n**Hemodynamic parameters (if VA):**\n• MAP, HR, rhythm\n• Vasopressor doses (norepi, epi, vaso, etc.)\n• Lactate and trend\n• ScvO₂ or SvO₂ if available\n• ECHO findings (EF, RV function, valves)\n• SCAI shock stage\n\n**Reversibility assessment:**\n• What is the underlying cause?\n• Is it potentially reversible?\n• What is the exit strategy? (recovery, LVAD, transplant, comfort)\n\n**Scores (if calculated):**\n• RESP score (VV)\n• SAVE score (VA)\n• Murray score\n\n**Access assessment:**\n• Vascular access (existing lines, peripheral pulses)\n• Any contraindications to anticoagulation',
    citation: [1, 6],
    next: 'ecmo-disposition',
  },

  {
    id: 'ecmo-disposition',
    type: 'question',
    module: 10,
    title: 'Disposition',
    body: '**ECMO patients require specialized ICU care with experienced teams.**\n\nDisposition depends on ECMO availability and patient stability.',
    citation: [1],
    options: [
      {
        label: 'ECMO center — initiate here or transfer',
        description: 'Patient meets criteria, ECMO team available or being mobilized',
        next: 'ecmo-dispo-initiate',
        urgency: 'critical',
      },
      {
        label: 'Not an ECMO candidate',
        description: 'Contraindications or goals not aligned with ECMO',
        next: 'ecmo-dispo-not-candidate',
      },
      {
        label: 'Transfer for ECMO evaluation',
        description: 'ECMO not available locally, patient may be candidate',
        next: 'ecmo-dispo-transfer',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'ecmo-dispo-initiate',
    type: 'result',
    module: 10,
    title: 'Initiate ECMO',
    body: '**ECMO initiation — ICU admission with ECMO support.**\n\n**Pre-cannulation checklist:**\n• Consent obtained (if possible) or emergency consent\n• Blood products available (PRBCs, FFP, platelets, cryo)\n• Type and screen/crossmatch\n• Access assessed (ultrasound, pulses)\n• Anticoagulation plan\n• Goals of care discussed with family\n\n**Immediate post-cannulation:**\n• Confirm flows and pressures\n• CXR for cannula positions\n• Echo: rule out complications, assess function\n• Arterial line (right radial for VA)\n• Send labs: ABG, lactate, CBC, BMP, coags, fibrinogen, LDH\n\n**Ongoing care:**\n• ECMO specialist at bedside\n• Daily echo\n• Neurologic monitoring\n• Assess for complications\n• Daily reassess recovery and goals\n\n**Remember:** ECMO is a bridge, not a destination. Have an exit strategy.',
    recommendation: 'Proceed with ECMO cannulation per institutional protocol. ICU admission with ECMO team management.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  {
    id: 'ecmo-dispo-not-candidate',
    type: 'result',
    module: 10,
    title: 'Not an ECMO Candidate',
    body: '**Patient does not meet ECMO criteria or has contraindications.**\n\n**Document clearly:**\n• Specific contraindications (irreversible disease, prolonged arrest, etc.)\n• Discussion with ECMO team if consulted\n• Goals of care discussion with family\n\n**Continue aggressive conventional care:**\n• Optimize ventilation (lung-protective, prone positioning)\n• Maximize medical hemodynamic support\n• Consider other rescue therapies if appropriate:\n  - Inhaled pulmonary vasodilators\n  - HFOV (controversial)\n  - Impella (if RV adequate, VA-ECMO not appropriate)\n  - IABP\n\n**If goals transition to comfort:**\n• Palliative care consultation\n• Family support\n• Symptom management\n\n**This is a difficult conversation** — document thoroughly and involve the team.',
    recommendation: 'Not an ECMO candidate. Continue conventional management or transition to comfort care based on goals of care discussion.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  {
    id: 'ecmo-dispo-transfer',
    type: 'result',
    module: 10,
    title: 'Transfer for ECMO',
    body: '**Patient may be an ECMO candidate — arrange transfer to ECMO center.**\n\n**Contact ECMO center EARLY:**\n• Don\'t wait until patient is crashing\n• Provide all relevant data (see Communication module)\n• They may send a mobile ECMO team\n\n**Mobile ECMO (ECMO retrieval):**\n• Some centers can cannulate at referring hospital\n• Patient travels on ECMO support\n• Discuss logistics: distance, weather, staffing\n\n**Pre-transfer optimization:**\n• Maximize conventional support\n• Secure airway\n• Adequate IV access\n• Blood products if needed\n• Vasopressors running\n• Documentation prepared\n\n**Transfer considerations:**\n• Air vs ground (distance, stability, weather)\n• Transport team capabilities\n• Time to ECMO center\n\n**Critical:** If patient is in arrest or near-arrest, ECMO must be initiated locally or patient is unlikely to survive transfer.',
    recommendation: 'Transfer to ECMO center after discussion with receiving team. Optimize patient for transport. Consider mobile ECMO if available.',
    confidence: 'definitive',
    citation: [1, 6],
  },
];

export const ECMO_NODE_COUNT = ECMO_NODES.length;

export const ECMO_MODULE_LABELS = [
  'Initial Assessment',
  'VV vs VA Selection',
  'VV-ECMO',
  'VA-ECMO',
  'ECPR',
  'Contraindications',
  'Cannulation',
  'Complications',
  'Prediction Scores',
  'Communication & Disposition',
];

export const ECMO_CITATIONS: Citation[] = [
  { num: 1, text: 'Farkas J. ECMO Manual. EMCrit IBCC. https://emcrit.org/ibcc/ecmo/' },
  { num: 2, text: 'ELSO Guidelines for Adult Respiratory Failure. Extracorporeal Life Support Organization. 2017.' },
  { num: 3, text: 'Lorusso R, et al. ELSO Interim Guidelines for Venoarterial Extracorporeal Membrane Oxygenation in Adult Cardiac Patients. ASAIO J. 2021;67(8):827-844.' },
  { num: 4, text: 'Guglin M, et al. Venoarterial ECMO for Adults: JACC Scientific Expert Panel. J Am Coll Cardiol. 2019;73(6):698-716.' },
  { num: 5, text: 'Combes A, et al. Extracorporeal Membrane Oxygenation for Severe Acute Respiratory Distress Syndrome (EOLIA). N Engl J Med. 2018;378(21):1965-1975.' },
  { num: 6, text: 'Augustin K. Who to Refer for VV ECMO — Patient Selection and When to Call for Help. CV-EMCrit, EMCrit. 2023.' },
  { num: 7, text: 'Rao P, et al. Venoarterial ECMO Hemodynamics. StatPearls. NCBI Bookshelf. 2024.' },
  { num: 8, text: 'Belohlavek J, et al. Effect of Intra-arrest Transport, Extracorporeal Cardiopulmonary Resuscitation, and Immediate Invasive Assessment and Treatment on Functional Neurologic Outcome in Refractory Out-of-Hospital Cardiac Arrest (PRAGUE OHCA). JAMA. 2022;327(8):737-747.' },
  { num: 9, text: 'Wilson J, et al. Managing Harlequin Syndrome in VA-ECMO — Do Not Forget the Right Ventricle. Perfusion. 2022;37(4):380-385.' },
  { num: 10, text: 'Schmidt M, et al. Predicting Survival After ECMO for Severe Acute Respiratory Failure: The Respiratory ECMO Survival Prediction (RESP) Score. Am J Respir Crit Care Med. 2014;189(11):1374-1382.' },
];
