// MedKitt — Xylazine Toxicity ("Tranq Dope")
// OA2A Toxidrome: Opioid + Alpha-2 Agonist
// 6 modules: Recognition → OA2A Toxidrome → Supportive Care → Wound Management → Withdrawal → Disposition
// ~26 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const XYLAZINE_TOXICITY_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'xyl-start',
    type: 'info',
    module: 1,
    title: 'Xylazine Toxicity ("Tranq")',
    body: '**What is Xylazine?**\n• Alpha-2 adrenergic agonist (like clonidine, dexmedetomidine)\n• FDA-approved for veterinary use only (NOT human)\n• Trade name: Rompun\n• **Not a controlled substance** (DEA scheduling pending)\n\n**Why it\'s in the drug supply:**\n• Cheap adulterant that extends/intensifies fentanyl high\n• 95% of xylazine OD deaths involve co-ingestion with fentanyl [1][2]\n\n**Detection:**\n• Standard UDS does NOT detect xylazine\n• Requires GC-MS or LC-MS (7-8 day turnaround)\n• Lateral flow test strips available via harm reduction [2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'xyl-wound-staging', label: 'Wound Staging Tool' },
      { id: 'naloxone-calc', label: 'Naloxone Dosing' },
    ],
    next: 'xyl-presentation',
  },

  {
    id: 'xyl-presentation',
    type: 'question',
    module: 1,
    title: 'Clinical Presentation',
    body: '**OA2A Toxidrome (Opioid + Alpha-2 Agonist):**\n\n| Finding | Opioid | Xylazine |\n|---------|--------|----------|\n| Sedation | ✓ | ✓ |\n| Miosis | ✓ | ✓ |\n| Respiratory depression | ✓ | ✓ |\n| Bradycardia | ✗ | ✓ |\n| Hypotension | Variable | ✓ |\n| Hypothermia | ✗ | ✓ |\n| Hyperglycemia | ✗ | ✓ |\n\n**Key clue:** Looks like opioid OD but naloxone doesn\'t fully wake them up [1]',
    citation: [1, 2],
    options: [
      {
        label: 'Respiratory depression / apnea',
        next: 'xyl-naloxone',
        urgency: 'critical',
      },
      {
        label: 'Sedated but breathing adequately',
        next: 'xyl-supportive',
        urgency: 'urgent',
      },
      {
        label: 'Skin wounds present',
        next: 'xyl-wound-assess',
        urgency: 'urgent',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: OA2A TOXIDROME — NALOXONE
  // =====================================================================

  {
    id: 'xyl-naloxone',
    type: 'info',
    module: 2,
    title: 'Naloxone Administration',
    body: '**STILL GIVE NALOXONE** — 95% involve fentanyl [1][2]\n\n**Key difference from pure opioid OD:**\n> Titrate to **adequate respiratory rate**, NOT wakefulness\n\n**EMCrit warning:**\n> "Avoid excessive dosing of naloxone. High naloxone dosing could provoke opioid withdrawal in a patient who remains sedated by alpha-2 agonists, leading to emesis with aspiration." [1]\n\n**Standard dosing:**\n• 0.4-2 mg IV/IM/IN\n• Repeat q2-3 min PRN for respiratory depression\n• Goal: RR >12, adequate SpO₂',
    citation: [1, 2],
    next: 'xyl-naloxone-response',
    treatment: {
      firstLine: {
        drug: 'Naloxone',
        dose: '0.4-2 mg IV/IM/IN',
        route: 'IV, IM, or intranasal',
        frequency: 'Every 2-3 minutes PRN',
        duration: 'Until adequate respirations',
        notes: 'Titrate to respiratory rate (>12), NOT wakefulness',
      },
      monitoring: 'SpO2, respiratory rate, aspiration risk (sedation persists)',
    },
  },

  {
    id: 'xyl-naloxone-response',
    type: 'question',
    module: 2,
    title: 'Naloxone Response Assessment',
    body: '**Decision point:**\n\n• Respirations improve → patient doesn\'t wake up → **SUSPECT XYLAZINE**\n• Continued sedation + bradycardia + hypotension after naloxone = high suspicion\n\nHow did the patient respond to naloxone?',
    citation: [1],
    options: [
      {
        label: 'Respirations improved but still sedated',
        next: 'xyl-supportive',
        urgency: 'urgent',
      },
      {
        label: 'Respirations still inadequate',
        next: 'xyl-airway',
        urgency: 'critical',
      },
      {
        label: 'Full arousal (likely pure opioid)',
        next: 'xyl-observation',
      },
    ],
  },

  {
    id: 'xyl-airway',
    type: 'info',
    module: 2,
    title: 'Airway Management',
    body: '**If apneic or inadequate respirations despite naloxone:**\n\n1. **Recovery position** if spontaneous respirations\n2. **Bag-valve mask** — rescue breaths especially helpful (xylazine slows breathing even after naloxone)\n3. **Supplemental O₂** via NC or NRB\n4. **Intubation** if:\n   • Persistent apnea\n   • Unable to protect airway\n   • GCS <8 with aspiration risk [1][2]\n\n**Post-intubation:** Continue supportive care, monitor for bradycardia/hypotension',
    citation: [1, 2],
    next: 'xyl-supportive',
  },

  // =====================================================================
  // MODULE 3: SUPPORTIVE CARE
  // =====================================================================

  {
    id: 'xyl-supportive',
    type: 'question',
    module: 3,
    title: 'Cardiovascular Support',
    body: '**Xylazine effects:**\n• Initial transient hypertension (alpha-2b vasoconstriction) → sustained hypotension (central sympatholysis)\n• Bradycardia (reduced NE release)\n• Potential QTc prolongation [2]\n\nWhat cardiovascular findings are present?',
    citation: [1, 2],
    options: [
      {
        label: 'Hypotension — SBP <90',
        next: 'xyl-hypotension',
        urgency: 'critical',
      },
      {
        label: 'Symptomatic bradycardia',
        next: 'xyl-bradycardia',
        urgency: 'urgent',
      },
      {
        label: 'Hemodynamically stable',
        next: 'xyl-monitoring',
      },
    ],
  },

  {
    id: 'xyl-hypotension',
    type: 'info',
    module: 3,
    title: 'Hypotension Management',
    body: '**First-line: Volume resuscitation**\n• NS or LR 500-1000 mL bolus\n• Often sufficient [1]\n\n**Refractory hypotension:**\n• [Norepinephrine](#/drug/norepinephrine/xylazine) 0.1-0.3 mcg/kg/min\n• Consider underlying vasoconstriction — pure alpha agonists may worsen tissue perfusion\n\n**Monitor:**\n• ECG (arrhythmias, QTc)\n• Glucose (hyperglycemia common)\n• Temperature (hypothermia) [1][2]',
    citation: [1, 2],
    next: 'xyl-monitoring',
    treatment: {
      firstLine: {
        drug: 'Normal saline or Lactated Ringer',
        dose: '500-1000 mL bolus',
        route: 'IV',
        frequency: 'Repeat PRN',
        duration: 'Until euvolemic',
        notes: 'IVF often sufficient. Consider underlying vasoconstriction.',
      },
      alternative: {
        drug: 'Norepinephrine',
        dose: '0.1-0.3 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until hemodynamically stable',
        notes: 'For refractory hypotension only',
      },
      monitoring: 'ECG, BP, glucose, temperature',
    },
  },

  {
    id: 'xyl-bradycardia',
    type: 'info',
    module: 3,
    title: 'Bradycardia Management',
    body: '**EMCrit approach (preferred):**\n• Generally does NOT require treatment\n• **Avoid atropine** — difficult to titrate, risk of hypertensive crisis from systemic vasoconstriction\n• If symptomatic: [Dobutamine](#/drug/dobutamine/xylazine) or [Isoproterenol](#/drug/isoproterenol/xylazine) (gradual, titratable inodilators) [1]\n\n**Alternative (case reports):**\n• [Atropine](#/drug/atropine/xylazine) 0.5-1 mg IV if symptomatic\n• May repeat q3-5 min (max 3 mg)\n\n**Note:** Bradycardia treatment is controversial — EMCrit discourages atropine [1]',
    citation: [1],
    next: 'xyl-monitoring',
    treatment: {
      firstLine: {
        drug: 'Observation',
        dose: 'N/A',
        route: 'N/A',
        frequency: 'N/A',
        duration: 'N/A',
        notes: 'Bradycardia often does NOT require treatment',
      },
      alternative: {
        drug: 'Dobutamine or Isoproterenol',
        dose: 'Dobutamine 2.5-10 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until HR improves',
        notes: 'Preferred over atropine if treatment needed. Titratable.',
      },
      monitoring: 'Continuous cardiac monitoring',
    },
  },

  {
    id: 'xyl-monitoring',
    type: 'info',
    module: 3,
    title: 'Monitoring Parameters',
    body: '**Standard monitoring:**\n• Continuous SpO₂ and cardiac telemetry\n• ECG (QTc prolongation)\n• Glucose (hyperglycemia common)\n• Temperature (hypothermia)\n• Electrolytes\n\n**Watch for:**\n• Thromboembolic complications\n• Aspiration (sedated patient)\n• Delayed wound complications\n\n**No antidote exists:** Atipamezole (alpha-2 antagonist) reversed xylazine in animal models but is NOT available for human use [1][2]',
    citation: [1, 2],
    next: 'xyl-wound-assess',
  },

  // =====================================================================
  // MODULE 4: WOUND MANAGEMENT
  // =====================================================================

  {
    id: 'xyl-wound-assess',
    type: 'question',
    module: 4,
    title: 'Xylazine-Associated Wounds',
    body: '**Key features:**\n• Necrotic ulcers — NOT always at injection sites\n• Can appear distant from injection (legs, arms, trunk, sternum, scalp)\n• Mechanism: vasoconstriction + direct tissue toxicity\n• May appear in users who smoke or snort (systemic effect) [3]\n\nAre xylazine-associated wounds present?',
    citation: [3, 4],
    options: [
      {
        label: 'No wounds',
        next: 'xyl-dispo-assess',
      },
      {
        label: 'Superficial wounds (Stage 1)',
        next: 'xyl-wound-stage1',
      },
      {
        label: 'Moderate wounds — exposed muscle/tendon (Stage 2)',
        next: 'xyl-wound-stage2',
        urgency: 'urgent',
      },
      {
        label: 'Severe wounds — exposed bone, possible osteomyelitis (Stage 3)',
        next: 'xyl-wound-stage3',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'xyl-wound-stage1',
    type: 'result',
    module: 4,
    title: 'Stage 1 — Superficial Wounds',
    body: '**Philadelphia Consensus Classification:**\n• Superficial, partial/full thickness skin only\n• No exposed tendon/muscle\n• Normal function preserved [3]\n\n**Treatment:**\n• Soap and water cleansing\n• Sterile nonadherent gauze\n• Daily dressing changes\n• **AVOID aggressive debridement** — islands of healthy tissue = healing potential\n\n**Antibiotics if infected:**\n• [TMP-SMX](#/drug/tmp-smx/xylazine) 1-2 DS tabs PO BID (MRSA coverage)\n• Culture data: 56% MRSA, 37% GAS',
    recommendation: 'Conservative wound care. Avoid aggressive debridement. Discharge with follow-up.',
    confidence: 'recommended',
    citation: [3, 4],
    treatment: {
      firstLine: {
        drug: 'TMP-SMX (if infected)',
        dose: '1-2 DS tablets PO BID',
        route: 'PO',
        frequency: 'BID',
        duration: '7-10 days',
        notes: 'MRSA coverage. Culture data: 56% MRSA prevalence.',
      },
      monitoring: 'Daily wound checks, return if worsening',
    },
  },

  {
    id: 'xyl-wound-stage2',
    type: 'result',
    module: 4,
    title: 'Stage 2 — Moderate Wounds',
    body: '**Philadelphia Consensus Classification:**\n• Full thickness loss\n• Exposed/compromised muscle/tendon\n• **Preserved function** [3]\n\n**Treatment:**\n• Conservative initially\n• **Autolytic debridement** with topical antibiotics (preferred)\n• Enzymatic debridement (collagenase) for heavy eschar\n• Consider excisional debridement + STSG after 3+ months abstinence\n\n**Antibiotics:**\n• [TMP-SMX](#/drug/tmp-smx/xylazine) + beta-lactam (GAS coverage)\n• Silver sulfadiazine topically — broad spectrum, active 72+ hours [3][4]',
    recommendation: 'Conservative wound care. Surgical debridement only if abscess/infection. Refer to wound care clinic.',
    confidence: 'recommended',
    citation: [3, 4],
    treatment: {
      firstLine: {
        drug: 'TMP-SMX + Amoxicillin',
        dose: 'TMP-SMX 1-2 DS BID + Amoxicillin 500 mg TID',
        route: 'PO',
        frequency: 'As above',
        duration: '7-14 days',
        notes: 'Covers MRSA + GAS. Add silver sulfadiazine topically.',
      },
      monitoring: 'Serial wound exams, watch for progression',
    },
  },

  {
    id: 'xyl-wound-stage3',
    type: 'result',
    module: 4,
    title: 'Stage 3 — Severe Wounds',
    body: '**Philadelphia Consensus Classification:**\n• **3A:** Severe necrosis, exposed bone, osteomyelitis possible, **preserved function** → aggressive debridement + BTM if abstinent\n• **3B:** Same as 3A but **no meaningful function preserved** → amputation recommended [3]\n\n**Critical distinction:** Differentiate XAW necrosis from acute NSTI — avoid misdiagnosing chronic XAW as NSTI (prevents unnecessary aggressive debridement)\n\n**ED management:**\n• IV antibiotics: [Vancomycin](#/drug/vancomycin/xylazine) + [Pip-Tazo](#/drug/pip-tazo/xylazine)\n• Admit for surgical evaluation\n• X-ray/MRI for osteomyelitis workup',
    recommendation: 'Admit for IV antibiotics and surgical evaluation. Stage 3B may require amputation.',
    confidence: 'recommended',
    citation: [3, 4],
    treatment: {
      firstLine: {
        drug: 'Vancomycin + Piperacillin-Tazobactam',
        dose: 'Vancomycin 25-30 mg/kg load, Pip-Tazo 4.5g q8h',
        route: 'IV',
        frequency: 'Vanc per levels, Pip-Tazo q8h',
        duration: 'Admit for duration',
        notes: 'Broad coverage including MRSA, GAS, GN, anaerobes',
      },
      monitoring: 'Surgical consult, imaging for osteomyelitis',
    },
  },

  // =====================================================================
  // MODULE 5: WITHDRAWAL
  // =====================================================================

  {
    id: 'xyl-withdrawal',
    type: 'info',
    module: 5,
    title: 'Xylazine Withdrawal',
    body: '**Timeline:** Symptoms begin 8-24 hours after last use\n\n**Symptoms (NOT reversed by opioids):**\n• Anxiety, irritability, restlessness, dysphoria\n• Tachycardia, diaphoresis, hypertension\n\n**Treatment Protocol:**\n| Medication | Dose | Notes |\n|------------|------|-------|\n| [Clonidine](#/drug/clonidine/xylazine) | 0.2-0.3 mg PO q4-6h | First-line; hold if SBP <90, HR <50 |\n| [Dexmedetomidine](#/drug/dexmedetomidine/xylazine) | 0.2-1.4 mcg/kg/hr IV | ICU; for severe withdrawal |\n| [Tizanidine](#/drug/tizanidine/xylazine) | 2-4 mg PO q6-8h | Alternative alpha-2 agonist |\n| [Gabapentin](#/drug/gabapentin/xylazine) | 300-600 mg PO TID | Adjunct for anxiety/pain |\n\n**De-escalation:** Transition dex → clonidine when tolerating PO (24-48h) [1][5]',
    citation: [1, 5],
    next: 'xyl-dispo-assess',
    treatment: {
      firstLine: {
        drug: 'Clonidine',
        dose: '0.2-0.3 mg PO q4-6h',
        route: 'PO',
        frequency: 'Q4-6 hours',
        duration: 'Taper over 3-5 days',
        notes: 'Hold if SBP <90 or HR <50',
      },
      alternative: {
        drug: 'Dexmedetomidine',
        dose: '0.2-1.4 mcg/kg/hr IV',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until PO tolerated, then transition to clonidine',
        notes: 'ICU setting only. For severe withdrawal.',
      },
      monitoring: 'Vital signs, symptom control',
    },
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'xyl-dispo-assess',
    type: 'question',
    module: 6,
    title: 'Disposition Assessment',
    body: '**Admit criteria:**\n• Persistent respiratory depression\n• Hemodynamic instability\n• Severe bradycardia requiring intervention\n• Deep wound involvement (Stage 2-3)\n• Suspected osteomyelitis/discitis\n• Bacteremia/endocarditis concern\n• Severe withdrawal requiring dex infusion [1][5]\n\nWhat is the patient\'s current status?',
    citation: [1, 5],
    options: [
      {
        label: 'Stable — discharge appropriate',
        next: 'xyl-discharge',
      },
      {
        label: 'Needs observation — monitor unit',
        next: 'xyl-admit-obs',
        urgency: 'urgent',
      },
      {
        label: 'ICU level care required',
        next: 'xyl-admit-icu',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'xyl-observation',
    type: 'info',
    module: 6,
    title: 'ED Observation',
    body: '**Observation period:**\n• Minimum 4-6 hours post naloxone\n• Monitor for recurrent respiratory depression (fentanyl outlasts naloxone)\n• Watch for delayed xylazine effects\n\n**Discharge criteria:**\n• Hemodynamically stable\n• Adequate respirations\n• Ambulatory\n• Tolerating PO\n• Wound care plan in place',
    citation: [1],
    next: 'xyl-discharge',
  },

  {
    id: 'xyl-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge Planning',
    body: '**Discharge supplies:**\n• Wound dressings, ointments, silver sulfadiazine if applicable\n• Antibiotics (complete course)\n\n**Harm reduction kit:**\n• Narcan nasal spray (2 doses)\n• Fentanyl test strips\n• Xylazine test strips\n• Sterile supplies\n\n**Resources:**\n• **Never Use Alone:** 1-800-484-3731\n• **SAMHSA Helpline:** 1-800-662-4357\n• Local syringe service programs\n\n**Follow-up:**\n• Low-barrier wound care clinic\n• Addiction medicine referral',
    recommendation: 'Discharge with harm reduction supplies, wound care, and addiction resources.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'xyl-admit-obs',
    type: 'result',
    module: 6,
    title: 'Admit — Observation/Telemetry',
    body: '**Admission indications:**\n• Persistent sedation >6 hours\n• Moderate wound requiring serial debridement\n• Withdrawal management with clonidine\n• Social concerns (no safe discharge)\n\n**Monitoring:**\n• Telemetry\n• Vitals q2-4h\n• Serial wound exams\n• Anaphylaxis kit at bedside',
    recommendation: 'Admit for observation. Telemetry monitoring, wound care, withdrawal management.',
    confidence: 'recommended',
    citation: [1],
  },

  {
    id: 'xyl-admit-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU criteria:**\n• Intubated patients\n• Vasopressor requirement\n• Dexmedetomidine infusion for withdrawal\n• Stage 3 wounds with sepsis/bacteremia\n• Severe medetomidine withdrawal (77.5% require ICU) [5]\n\n**Note:** Medetomidine is replacing xylazine in some markets — 100-200x more potent, more severe withdrawal, higher ICU rates [5]',
    recommendation: 'ICU for ongoing hemodynamic support, airway management, or severe withdrawal.',
    confidence: 'recommended',
    citation: [1, 5],
  },

];

export const XYLAZINE_TOXICITY_MODULE_LABELS = [
  'Recognition',
  'OA2A Toxidrome',
  'Supportive Care',
  'Wound Management',
  'Withdrawal',
  'Disposition',
];

export const XYLAZINE_TOXICITY_CITATIONS: Citation[] = [
  { num: 1, text: 'Farkas J. OA2A Syndrome (Opioid + Alpha-2 Agonist). Internet Book of Critical Care (IBCC). January 2025.' },
  { num: 2, text: 'CDC. Xylazine (Tranq): What You Should Know. Centers for Disease Control and Prevention. October 2024.' },
  { num: 3, text: 'Philadelphia Consensus on the Surgical Management of Xylazine-Associated Wounds. SurgiColl. 2024.' },
  { num: 4, text: 'Oxford Academic. Guidelines for Xylazine-Associated Wound Management. Open Forum Infect Dis. 2024.' },
  { num: 5, text: 'American Journal of Psychiatry. Medetomidine Withdrawal Syndrome. AJP Resident\'s Journal. 2025.' },
  { num: 6, text: 'SAMHSA. Overdose Prevention and Response Toolkit. 2023.' },
  { num: 7, text: 'PennCAMP. Xylazine Wound Best Practices. Philadelphia Department of Public Health. 2023.' },
];
