// MedKitt — Cardiogenic Shock
// EMCrit/IBCC-focused: Phenotypes → Hemodynamics → Inotropes/Vasopressors → MCS → Cath Lab
// 6 modules: Recognition → Hemodynamic Assessment → Initial Stabilization → Pharmacologic Support → Mechanical Support → Disposition
// ~28 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const CARDIOGENIC_SHOCK_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Recognize the SHOCK spiral: hypotension worsens coronary perfusion', nodeId: 'cs-start' },
  { text: 'Obtain bedside echo to assess EF, wall motion, and valves', nodeId: 'cs-hemodynamics' },
  { text: 'Avoid fluid boluses if POCUS shows B-lines or hyperdynamic LV', nodeId: 'cs-fluids' },
  { text: 'Start inotropes early: dobutamine for true cardiogenic shock', nodeId: 'cs-inotropes' },
  { text: 'Add vasopressor (norepinephrine) if MAP <65 despite inotropes', nodeId: 'cs-vasopressors' },
  { text: 'Activate cath lab immediately for STEMI-related shock', nodeId: 'cs-cath-lab' },
  { text: 'Consider mechanical circulatory support (IABP, Impella, ECMO) early', nodeId: 'cs-mcs' },
  { text: 'ICU admission required for all cardiogenic shock patients', nodeId: 'cs-dispo' },
];

export const CARDIOGENIC_SHOCK_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'cs-start',
    type: 'info',
    module: 1,
    title: 'Cardiogenic Shock',
    body: '**Definition:** Inadequate tissue perfusion due to primary cardiac dysfunction.\n\n**The SHOCK Spiral (EMCrit):**\n> Hypotension → Coronary hypoperfusion → Worsening ischemia → Further pump failure → More hypotension\n\n**Key Concept:** Every minute in shock = myocardial damage. **Time is myocardium.**\n\n**Mortality:** 40-50% even with modern therapy. Early recognition and aggressive intervention are critical. [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'ecmo-scai-stages', label: 'SCAI Shock Stage' },
      { id: 'shock-index', label: 'Shock Index' },
    ],
    next: 'cs-recognize',
  },

  {
    id: 'cs-recognize',
    type: 'question',
    module: 1,
    title: 'Clinical Recognition',
    body: '**Classic Presentation:**\n| Finding | Significance |\n|---------|-------------|\n| SBP <90 or MAP <65 | Despite adequate volume |\n| Cold extremities | Peripheral vasoconstriction |\n| Mottled skin | Poor perfusion |\n| Altered mental status | Cerebral hypoperfusion |\n| Oliguria | Renal hypoperfusion |\n| Elevated lactate | Tissue hypoxia |\n\n**SCAI Shock Staging:**\n• **A** - At risk (e.g., large STEMI, no hypotension)\n• **B** - Beginning shock (SBP <90 or requiring support)\n• **C** - Classic (hypoperfusion + cold/wet)\n• **D** - Deteriorating (escalating support)\n• **E** - Extremis (refractory, dying) [1][2][3]',
    citation: [1, 2, 3],
    options: [
      {
        label: 'SCAI Stage B-C — Early/classic shock',
        next: 'cs-etiology',
        urgency: 'urgent',
      },
      {
        label: 'SCAI Stage D-E — Deteriorating/extremis',
        next: 'cs-crash',
        urgency: 'critical',
      },
      {
        label: 'SCAI Stage A — At risk, not yet in shock',
        next: 'cs-at-risk',
      },
    ],
  },

  {
    id: 'cs-crash',
    type: 'info',
    module: 1,
    title: 'SCAI D-E: Crashing Patient',
    body: '**Immediate Actions (EMCrit "Stabilize First"):**\n\n1. **Push-dose pressors** while setting up infusions:\n   • [Epinephrine](#/drug/epinephrine/push-dose) 10-20 mcg IV push (1 mL of 10 mcg/mL)\n   • [Phenylephrine](#/drug/phenylephrine/push-dose) 100-200 mcg if pure vasodilation\n\n2. **Airway:** Avoid intubation if possible — sedation + PPV will crash them further\n   • If must intubate: ketamine + push-dose epi ready\n\n3. **Call for help:** Cardiology, CT surgery, ECMO team\n\n4. **Consider VA-ECMO** if refractory to pressors\n\n**DO NOT** let them sit in hypotensive shock while figuring out the cause. [1][2]',
    citation: [1, 2],
    next: 'cs-etiology',
  },

  {
    id: 'cs-at-risk',
    type: 'info',
    module: 1,
    title: 'SCAI Stage A: At Risk',
    body: '**Patient at risk but not yet in shock:**\n\n• Large anterior STEMI\n• Severe LV dysfunction (EF <30%)\n• Recent high-risk PCI\n• Acute myocarditis\n\n**Proactive Management:**\n• Serial lactates q2-4h\n• Continuous BP monitoring (arterial line preferred)\n• POCUS to track LV function\n• Low threshold for early pressors/inotropes\n• **Do NOT wait for frank hypotension** [1][2]',
    citation: [1, 2],
    next: 'cs-etiology',
  },

  {
    id: 'cs-etiology',
    type: 'question',
    module: 1,
    title: 'Identify the Etiology',
    body: '**The cause matters — treatment differs:**\n\n| Etiology | Key Features |\n|----------|-------------|\n| **AMI (most common)** | Chest pain, ECG changes, troponin |\n| **Acute decompensated HF** | Chronic HF, volume overload, warm shock initially |\n| **Myocarditis** | Younger, viral prodrome, diffuse ST changes |\n| **Takotsubo** | Emotional stress, apical ballooning |\n| **Valvular emergency** | New murmur, acute MR/AR |\n| **Arrhythmia** | Tachy/brady as primary driver |\n| **RV failure** | Inferior MI, PE, RV infarct |\n| **Post-cardiotomy** | Recent cardiac surgery |\n\n**POCUS is essential** — do it NOW. [1][2][3]',
    citation: [1, 2, 3],
    options: [
      {
        label: 'AMI / ACS — likely ischemic',
        next: 'cs-ami',
        urgency: 'critical',
      },
      {
        label: 'Acute decompensated heart failure',
        next: 'cs-adhf',
        urgency: 'urgent',
      },
      {
        label: 'RV failure (inferior MI, PE, RV infarct)',
        next: 'cs-rv-failure',
        urgency: 'urgent',
      },
      {
        label: 'Other / mixed / uncertain',
        next: 'cs-hemodynamics',
      },
    ],
  },

  {
    id: 'cs-ami',
    type: 'info',
    module: 1,
    title: 'AMI-Related Cardiogenic Shock',
    body: '**STEMI + Shock = Emergent cath lab**\n\n**Critical Path:**\n1. Stabilize hemodynamics (pressors/inotropes)\n2. Activate cath lab immediately\n3. **PCI is definitive therapy** — every minute of delay = worse outcomes\n4. Consider MCS (Impella/IABP) before or during PCI\n\n**Culprit-only PCI** is standard (no multi-vessel in acute setting unless cardiogenic shock precludes identifying culprit)\n\n**Avoid if possible:**\n• Thrombolytics (inferior to PCI, contraindicated if MCS planned)\n• Excess fluids (they are NOT dry)\n• Delaying cath for additional workup [1][2][4]',
    citation: [1, 2, 4],
    next: 'cs-hemodynamics',
  },

  {
    id: 'cs-adhf',
    type: 'info',
    module: 1,
    title: 'Acute Decompensated HF with Shock',
    body: '**Different phenotype than AMI-shock:**\n\n**Warm Shock (early ADHF):**\n• May be vasodilated initially\n• Treat with diuresis + inotropes\n• Avoid vasopressors unless truly hypotensive\n\n**Cold Shock (late/severe):**\n• True cardiogenic shock\n• Needs inotropes ± vasopressors\n• May need MCS as bridge\n\n**Key:** Identify precipitant:\n• Medication non-compliance\n• Dietary indiscretion\n• New arrhythmia (A-fib with RVR common)\n• Ischemia\n• Infection [1][2]',
    citation: [1, 2],
    next: 'cs-hemodynamics',
  },

  {
    id: 'cs-rv-failure',
    type: 'info',
    module: 1,
    title: 'RV Failure',
    body: '**RV failure is a DIFFERENT animal:**\n\n**DO NOT** give aggressive fluids — the RV is preload-dependent but can\'t handle excess volume.\n\n**Management:**\n• **Small fluid boluses** only if clearly hypovolemic (250 mL, reassess)\n• **Norepinephrine** to maintain coronary perfusion\n• **Inotropes:** Dobutamine or milrinone (careful with milrinone — vasodilation)\n• **Reduce RV afterload:** Treat PE if present, optimize ventilation\n• **Avoid intubation** if possible — PPV worsens RV failure\n\n**PAPI (PA Pulsatility Index)** <1.0 = severe RV failure\n\nIf RV MI: **DO NOT give nitrates** [1][2][5]',
    citation: [1, 2, 5],
    next: 'cs-hemodynamics',
  },

  // =====================================================================
  // MODULE 2: HEMODYNAMIC ASSESSMENT
  // =====================================================================

  {
    id: 'cs-hemodynamics',
    type: 'info',
    module: 2,
    title: 'Hemodynamic Assessment',
    body: '**EMCrit Approach — Phenotype Your Patient:**\n\n**Use POCUS to determine:**\n• LV function (EPSS, visual EF)\n• RV size and function\n• IVC (preload status)\n• Pericardial effusion\n• B-lines (pulmonary edema)\n\n**Cardiac Power Output (CPO):**\n> CPO = (MAP × CO) / 451\n\n**CPO <0.6 W = severe cardiogenic shock**\n\n**Invasive Monitoring (PA catheter):**\n• Consider in refractory shock\n• Helps guide therapy when clinical assessment unclear\n• CI <2.2, PCWP >18 = classic cardiogenic shock [1][2][3]',
    citation: [1, 2, 3],
    next: 'cs-wet-dry',
  },

  {
    id: 'cs-wet-dry',
    type: 'question',
    module: 2,
    title: 'Wet/Dry, Warm/Cold Assessment',
    body: '**Forrester Classification:**\n\n| | **Dry (PCWP <18)** | **Wet (PCWP >18)** |\n|---|---|---|\n| **Warm (CI >2.2)** | Normal | Pulmonary edema — diurese |\n| **Cold (CI <2.2)** | Hypovolemic — cautious fluids | **Cardiogenic shock** — inotropes |\n\n**Most cardiogenic shock = Cold and Wet**\n\n**Bedside Assessment:**\n• Cold = cool extremities, delayed cap refill, mottling\n• Wet = JVD, rales, edema, B-lines on US\n• Warm = normal extremity temp, adequate perfusion\n• Dry = flat IVC, no edema [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Cold and Wet — classic cardiogenic shock',
        next: 'cs-initial-rx',
        urgency: 'critical',
      },
      {
        label: 'Cold and Dry — may need cautious fluids',
        next: 'cs-cold-dry',
        urgency: 'urgent',
      },
      {
        label: 'Warm and Wet — decompensated HF, not shock',
        next: 'cs-warm-wet',
      },
    ],
  },

  {
    id: 'cs-cold-dry',
    type: 'info',
    module: 2,
    title: 'Cold and Dry',
    body: '**Uncommon in true cardiogenic shock — consider:**\n\n• RV infarct (preload-dependent)\n• Hypovolemia + poor cardiac function\n• Post-diuresis overshoot\n\n**Management:**\n• Small fluid challenge (250 mL NS, reassess)\n• If no improvement with fluids → inotropes\n• **Do NOT over-resuscitate** — the heart can\'t handle it [1][2]',
    citation: [1, 2],
    next: 'cs-initial-rx',
  },

  {
    id: 'cs-warm-wet',
    type: 'info',
    module: 2,
    title: 'Warm and Wet',
    body: '**This is decompensated HF, not yet cardiogenic shock:**\n\n**Treatment:**\n• Aggressive diuresis (IV furosemide)\n• Vasodilators if BP tolerates (nitroprusside, nitroglycerin)\n• Treat precipitant (A-fib, ischemia, etc.)\n\n**Monitor closely** — can progress to cold and wet (true shock).\n\nIf SBP <90 or declining perfusion → transition to cardiogenic shock pathway. [1][2]',
    citation: [1, 2],
    next: 'cs-initial-rx',
  },

  // =====================================================================
  // MODULE 3: INITIAL STABILIZATION
  // =====================================================================

  {
    id: 'cs-initial-rx',
    type: 'info',
    module: 3,
    title: 'Initial Stabilization',
    body: '**EMCrit "Big Picture":**\n> Stabilize first, diagnose second, but don\'t forget the diagnosis.\n\n**Immediate Actions:**\n1. **Arterial line** — cuff pressures are unreliable in shock\n2. **Central line** — for pressors/inotropes\n3. **Foley** — monitor UOP as perfusion marker\n4. **Labs:** Lactate, troponin, BNP, CBC, BMP, LFTs, coags\n5. **ECG + POCUS** — immediately\n\n**Oxygenation:**\n• High-flow nasal cannula preferred over intubation\n• If must intubate: ketamine, avoid propofol, have pressors ready\n• PPV can worsen hemodynamics [1][2]',
    citation: [1, 2],
    next: 'cs-pressors',
  },

  // =====================================================================
  // MODULE 4: PHARMACOLOGIC SUPPORT
  // =====================================================================

  {
    id: 'cs-pressors',
    type: 'info',
    module: 4,
    title: 'Vasopressors and Inotropes',
    body: '**EMCrit Pressor Selection:**\n\n**First-Line: Norepinephrine**\n• Vasopressor + mild inotrope\n• Maintains coronary perfusion pressure\n• Start 5-10 mcg/min, titrate to MAP >65\n\n**Add Inotrope if CI remains low:**\n• **Dobutamine:** 2.5-20 mcg/kg/min (may drop BP — watch for hypotension)\n• **Milrinone:** 0.375-0.75 mcg/kg/min (potent vasodilator — only if adequate BP)\n• **Epinephrine:** If need both pressor + inotrope (0.01-0.1 mcg/kg/min)\n\n**Avoid pure vasoconstrictors** (phenylephrine, vasopressin) as monotherapy — increase afterload without helping contractility. [1][2][6]',
    citation: [1, 2, 6],
    treatment: {
      firstLine: {
        drug: 'Norepinephrine',
        dose: '5-30 mcg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until stabilized',
        notes: 'First-line vasopressor in cardiogenic shock',
      },
      alternative: {
        drug: 'Dobutamine',
        dose: '2.5-20 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until stabilized',
        notes: 'Add for inotropy if CI low despite norepinephrine',
      },
      monitoring: 'Arterial line, cardiac output monitoring, lactate clearance',
    },
    next: 'cs-pressor-choice',
  },

  {
    id: 'cs-pressor-choice',
    type: 'question',
    module: 4,
    title: 'Pressor Selection by Phenotype',
    body: '**Match the drug to the problem:**\n\n| Phenotype | Recommendation |\n|-----------|---------------|\n| Hypotension + low CO | Norepinephrine + dobutamine or epinephrine |\n| Low CO, adequate BP | Dobutamine or milrinone |\n| Severe hypotension | Norepinephrine first, then add inotrope |\n| RV failure | Norepinephrine ± dobutamine (avoid milrinone) |\n| Post-cardiotomy | Epinephrine or milrinone |\n\n**Warning Signs of Failure:**\n• Escalating pressor requirements\n• Worsening lactate despite pressors\n• Multi-organ dysfunction\n→ Consider MCS [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Responding to pressors/inotropes',
        next: 'cs-optimization',
      },
      {
        label: 'Refractory to pharmacologic support',
        next: 'cs-mcs',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'cs-optimization',
    type: 'info',
    module: 4,
    title: 'Optimization on Medical Therapy',
    body: '**Once stabilized, optimize:**\n\n**Preload:**\n• Avoid excess fluids in LV failure\n• Consider gentle diuresis if wet\n• Small boluses only if clearly dry\n\n**Afterload:**\n• Avoid excessive vasoconstriction\n• IABP reduces afterload (if placed)\n\n**Rate/Rhythm:**\n• Treat arrhythmias aggressively\n• A-fib with RVR → rate control\n• Bradycardia → pacing\n\n**Metabolic:**\n• Correct acidosis (improves catecholamine responsiveness)\n• Correct electrolytes (K+, Mg2+, Ca2+)\n• Treat anemia (Hgb <7-8 impairs O2 delivery) [1][2]',
    citation: [1, 2],
    next: 'cs-mcs-decision',
  },

  // =====================================================================
  // MODULE 5: MECHANICAL CIRCULATORY SUPPORT
  // =====================================================================

  {
    id: 'cs-mcs-decision',
    type: 'question',
    module: 5,
    title: 'Mechanical Support Decision',
    body: '**When to consider MCS (EMCrit):**\n\n**Early MCS indicators:**\n• Escalating pressor requirements\n• Lactate not clearing\n• SCAI Stage C-D despite medical therapy\n• CPO <0.6 W\n• Need for PCI but too unstable\n\n**"Doors to Drugs to Devices"** — don\'t wait for multi-organ failure to consider MCS.\n\n**MCS Options:**\n• IABP (intra-aortic balloon pump)\n• Impella (percutaneous LVAD)\n• VA-ECMO (venoarterial ECMO)\n• TandemHeart\n• Surgical VAD [1][2][7]',
    citation: [1, 2, 7],
    options: [
      {
        label: 'Stable on medical therapy — continue monitoring',
        next: 'cs-disposition',
      },
      {
        label: 'Consider MCS — not responding adequately',
        next: 'cs-mcs',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'cs-mcs',
    type: 'info',
    module: 5,
    title: 'Mechanical Circulatory Support',
    body: '**MCS Device Selection:**\n\n| Device | Hemodynamic Support | Best For |\n|--------|--------------------|---------|\n| **IABP** | ~0.5 L/min | Afterload reduction, AMI |\n| **Impella CP** | 3-4 L/min | LV unloading, PCI support |\n| **Impella 5.0/5.5** | 5+ L/min | Severe LV failure |\n| **VA-ECMO** | Full support | Biventricular failure, arrest |\n| **TandemHeart** | 4-5 L/min | Alternative to Impella |\n\n**IABP (still has a role):**\n• Reduces afterload, increases diastolic coronary flow\n• Less hemodynamic support than Impella\n• IABP-SHOCK II was negative, but still used as adjunct\n\n**Impella:**\n• Direct LV unloading\n• Better hemodynamic support than IABP\n• Requires femoral artery access [1][2][7]',
    citation: [1, 2, 7],
    calculatorLinks: [
      { id: 'ecmo-vv-va-selector', label: 'MCS Device Selection' },
      { id: 'ecmo-ecpr-criteria', label: 'VA-ECMO Criteria' },
    ],
    next: 'cs-ecmo',
  },

  {
    id: 'cs-ecmo',
    type: 'info',
    module: 5,
    title: 'VA-ECMO Considerations',
    body: '**VA-ECMO = Full cardiopulmonary support**\n\n**Indications:**\n• Refractory cardiogenic shock despite medical + MCS\n• Biventricular failure\n• Cardiac arrest with suspected reversible cause\n• Bridge to transplant/LVAD/recovery\n\n**Contraindications:**\n• Irreversible neurologic injury\n• Unwitnessed arrest with prolonged downtime\n• Terminal illness\n• Severe aortic regurgitation (relative)\n\n**Complications:**\n• Limb ischemia (monitor distal perfusion)\n• LV distension (may need Impella for venting)\n• Bleeding, thrombosis\n• North-South syndrome (differential hypoxia)\n\n**ECMO is a bridge, not a destination.** [1][2][7]',
    citation: [1, 2, 7],
    next: 'cs-disposition',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'cs-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**All cardiogenic shock patients need ICU admission.**\n\n**Disposition Considerations:**\n• **CCU/CICU** — standard for cardiogenic shock\n• **Cath lab** — if AMI requiring emergent PCI\n• **Transfer** — if need MCS not available at your facility\n\n**Transfer Criteria:**\n• Need for MCS not available locally\n• Need for cardiac surgery\n• ECMO candidacy\n• Transplant evaluation\n\n**Communicate early** with accepting facility — don\'t wait until patient is crashing. [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Admit to CCU/CICU at current facility',
        next: 'cs-admit',
      },
      {
        label: 'Transfer to higher level of care',
        next: 'cs-transfer',
        urgency: 'urgent',
      },
      {
        label: 'Emergent cath lab',
        next: 'cs-cath',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'cs-admit',
    type: 'result',
    module: 6,
    title: 'Admit to CCU/CICU',
    body: '**ICU Admission Orders:**\n\n• Continuous arterial BP monitoring\n• Central venous access for pressors\n• Telemetry monitoring\n• Foley catheter with hourly I/O\n• Serial lactates (q4-6h until clearing)\n• Serial troponins\n• POCUS reassessment PRN\n• Cardiology consultation\n\n**Goals:**\n• MAP >65 mmHg\n• Lactate clearance\n• UOP >0.5 mL/kg/hr\n• Improving mental status\n• Weaning pressors [1][2]',
    recommendation: 'Admit to CCU/CICU for continued resuscitation and monitoring. Cardiology consultation required.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'cs-transfer',
    type: 'result',
    module: 6,
    title: 'Transfer to Higher Level of Care',
    body: '**Transfer Checklist:**\n\n• **Stabilize before transport** (pressors running, airway secure)\n• **Communicate directly** with accepting physician\n• **Send all data:** ECG, labs, imaging, echo\n• **Arrange appropriate transport** (critical care transport if on pressors)\n\n**Don\'t delay transfer** for additional workup that won\'t change management.\n\n**Information for receiving facility:**\n• Current pressor doses\n• Hemodynamic status\n• Suspected etiology\n• Response to therapy\n• Code status [1][2]',
    recommendation: 'Transfer to facility with MCS/ECMO capability. Stabilize hemodynamics before transport.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'cs-cath',
    type: 'result',
    module: 6,
    title: 'Emergent Cardiac Catheterization',
    body: '**AMI + Cardiogenic Shock = Emergent PCI**\n\n**Before cath lab:**\n• Load aspirin 325 mg (if not contraindicated)\n• P2Y12 inhibitor per institutional protocol\n• Heparin per cath lab protocol\n• Continue pressors/inotropes\n• Consider MCS placement in cath lab\n\n**In cath lab:**\n• PCI to culprit lesion\n• Consider Impella placement if hemodynamically unstable\n• Avoid contrast nephropathy precautions (don\'t delay for this)\n\n**Door-to-balloon time matters** even more in cardiogenic shock. [1][2][4]',
    recommendation: 'Emergent cardiac catheterization for revascularization. Continue hemodynamic support throughout.',
    confidence: 'definitive',
    citation: [1, 2, 4],
  },

];

export const CARDIOGENIC_SHOCK_MODULE_LABELS = [
  'Recognition',
  'Hemodynamic Assessment',
  'Initial Stabilization',
  'Pharmacologic Support',
  'Mechanical Support',
  'Disposition',
];

export const CARDIOGENIC_SHOCK_CITATIONS: Citation[] = [
  { num: 1, text: 'EMCrit IBCC - Cardiogenic Shock. Farkas J. https://emcrit.org/ibcc/cardiogenic-shock/' },
  { num: 2, text: 'CV EMCrit Archives - Hemodynamic Management. https://emcrit.org/category/cardiovascular/' },
  { num: 3, text: 'SCAI SHOCK Stage Classification. Baran DA et al. Catheter Cardiovasc Interv. 2019;94(1):29-37.' },
  { num: 4, text: 'Hochman JS et al. Early revascularization in acute myocardial infarction complicated by cardiogenic shock. SHOCK Trial. N Engl J Med. 1999;341(9):625-634.' },
  { num: 5, text: 'Harjola VP et al. Contemporary management of cardiogenic shock. Eur Heart J. 2020;41(11):1179-1188.' },
  { num: 6, text: 'UpToDate - Inotropic agents in heart failure with reduced ejection fraction. 2024.' },
  { num: 7, text: 'Basir MB et al. Improved outcomes with early initiation of mechanical circulatory support. J Am Coll Cardiol. 2021;77(9):1125-1136.' },
];
