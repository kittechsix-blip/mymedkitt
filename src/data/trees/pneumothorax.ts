// MedKitt — Pneumothorax POCUS Consult
// Technique → Lung Sliding → A' Profile → Lung Point → Management
// 4 modules: POCUS Technique → Findings Interpretation → Pneumothorax Confirmation → Management
// 13 nodes total.

import type { DecisionNode } from '../../models/types.js';

export const PNEUMOTHORAX_CRITICAL_ACTIONS = [
  { text: 'Needle decompression at 2nd ICS MCL if tension PTX (hypotension + JVD + tracheal deviation)', nodeId: 'needle-decompression' },
  { text: 'Chest tube (28-32Fr) for PTX ≥3cm at apex or any symptomatic PTX', nodeId: 'large-ptx' },
  { text: 'Lung point on POCUS is pathognomonic for PTX (100% specificity)', nodeId: 'confirmed-ptx' },
  { text: 'Normal lung sliding, B-lines, or seashore sign excludes PTX (NPV >99%)', nodeId: 'normal-findings' },
  { text: 'Do NOT delay needle decompression for imaging if tension suspected', nodeId: 'needle-decompression' },
  { text: 'Occult PTX on POCUS requires chest tube if positive pressure ventilation planned', nodeId: 'trauma-efast' },
  { text: 'Small PTX (<3cm): high-flow O2 increases reabsorption rate from 2%/day to 4%/day', nodeId: 'small-ptx' },
];

export const PNEUMOTHORAX_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: POCUS INDICATION & TECHNIQUE
  // =====================================================================

  {
    id: 'pneumothorax-start',
    type: 'info',
    module: 1,
    title: 'POCUS for Pneumothorax',
    body: 'Point-of-care ultrasound (POCUS) is highly sensitive and specific for pneumothorax detection, especially in supine trauma patients. Can detect as little as **20-50 mL of air**.\n\n**Indications:**\n• Chest trauma\n• Sudden dyspnea\n• Pleuritic chest pain\n• Decreased breath sounds\n• Subcutaneous emphysema\n• Post-procedure evaluation',
    citation: [1, 2],
    next: 'pocus-technique',
  },

  {
    id: 'pocus-technique',
    type: 'info',
    module: 1,
    title: 'POCUS Technique',
    body: '**Probe:** High-frequency linear probe\n\n**Position:** Scan anterior chest at **2nd-4th intercostal spaces**, mid-clavicular line\n\n**Steps:**\n1. Compare bilateral lung sliding\n2. Use **M-mode** to confirm findings\n3. Look for lung point if no sliding\n\n**Tip:** In trauma, this is part of the **eFAST** exam. Supine position — air rises anteriorly.',
    citation: [2, 3],
    next: 'lung-sliding-assessment',
  },

  // =====================================================================
  // MODULE 2: FINDINGS INTERPRETATION
  // =====================================================================

  {
    id: 'lung-sliding-assessment',
    type: 'question',
    module: 2,
    title: 'Lung Sliding Present?',
    body: 'Assess for **lung sliding** — the shimmering movement of the visceral pleura against the parietal pleura during respiration.\n\nAlso look for:\n• **Comet tail artifacts** (B-lines)\n• **Seashore sign** on M-mode (normal)\n• **Barcode/stratosphere sign** on M-mode (abnormal)',
    citation: [2, 3],
    options: [
      {
        label: 'Lung Sliding Present',
        description: 'Normal sliding, comet tails, or seashore sign on M-mode',
        next: 'normal-findings',
      },
      {
        label: 'Absent Lung Sliding',
        description: 'No sliding, barcode/stratosphere sign on M-mode',
        next: 'stratosphere-sign',
      },
      {
        label: 'Trauma Patient — eFAST',
        description: 'Evaluate as part of extended FAST exam',
        next: 'trauma-efast',
      },
    ],
  },

  {
    id: 'normal-findings',
    type: 'result',
    module: 2,
    title: 'Normal: Pneumothorax Excluded',
    body: '**Lung sliding, comet tails, and B-lines exclude pneumothorax** at the scanned locations.\n\n**Negative predictive value >99%**\n\nIf clinical suspicion persists despite normal POCUS:\n• Scan additional rib spaces\n• Consider CT chest\n• Repeat imaging if symptoms change',
    citation: [2, 4],
    confidence: 'definitive',
  },

  // =====================================================================
  // MODULE 3: PNEUMOTHORAX CONFIRMATION
  // =====================================================================

  {
    id: 'stratosphere-sign',
    type: 'info',
    module: 3,
    title: 'Abnormal: Stratosphere Sign',
    body: 'Absent lung sliding with **stratosphere sign** on M-mode (barcode sign) suggests pneumothorax.\n\n**Important:** Absent sliding alone is not diagnostic — can also be seen in:\n• Mainstem intubation\n• Pleural adhesions\n• Apnea\n• Severe ARDS\n\nCheck **multiple rib spaces** and look for the **lung point**.',
    citation: [2, 3],
    next: 'lung-point',
  },

  {
    id: 'lung-point',
    type: 'question',
    module: 3,
    title: 'Lung Point Identified?',
    body: 'The **lung point** is **pathognomonic** for pneumothorax — where lung sliding appears and disappears with respiration at the border of the collapsed lung.\n\n**Specificity: 100%**\n\nSlide the probe laterally from the area of absent sliding until you see intermittent sliding.',
    citation: [2, 3],
    options: [
      {
        label: 'Lung Point Found',
        description: 'Intermittent sliding at border — PTX confirmed',
        next: 'confirmed-ptx',
        urgency: 'urgent',
      },
      {
        label: 'No Lung Point Found',
        description: 'Absent sliding throughout entire hemithorax',
        next: 'no-lung-point',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'confirmed-ptx',
    type: 'info',
    module: 3,
    title: 'Pneumothorax Confirmed',
    body: '**POCUS confirmed pneumothorax** (lung point = 100% specificity).\n\n**Size estimation by lung point location:**\n• Anterior chest only → **Small**\n• Extends to mid-axillary line → **Moderate**\n• Extends posteriorly → **Large**',
    citation: [2, 4],
    next: 'tension-assessment',
  },

  {
    id: 'no-lung-point',
    type: 'info',
    module: 3,
    title: 'No Lung Point — Massive PTX?',
    body: 'If absent lung sliding throughout the **entire hemithorax** without a lung point, suspect **massive pneumothorax** with complete lung collapse.\n\n**Confirm with CXR** — assess for mediastinal shift.\n\nIf hemodynamically unstable → treat as tension pneumothorax.',
    citation: [2, 3],
    next: 'tension-assessment',
  },

  // =====================================================================
  // MODULE 4: MANAGEMENT
  // =====================================================================

  {
    id: 'tension-assessment',
    type: 'question',
    module: 4,
    title: 'Signs of Tension?',
    body: '**Assess for tension pneumothorax:**\n• Hypotension\n• Tracheal deviation\n• Distended neck veins\n• Severe respiratory distress\n\n**DO NOT wait for imaging if tension suspected.**',
    citation: [1],
    options: [
      {
        label: 'Tension Signs Present',
        description: 'Hemodynamic compromise — immediate intervention',
        next: 'needle-decompression',
        urgency: 'critical',
      },
      {
        label: 'Stable Patient',
        description: 'No signs of tension — assess size',
        next: 'stable-ptx-management',
      },
    ],
  },

  {
    id: 'needle-decompression',
    type: 'result',
    module: 4,
    title: 'Immediate Needle Decompression',
    body: '**Needle decompression STAT:**\n• **14-gauge angiocath**\n• **2nd ICS, mid-clavicular line**\n• OR **4th-5th ICS, anterior axillary line**\n\n**Follow with chest tube placement.**\n\nSee [Chest Tube / Pneumothorax Management](#/tree/chest-tube) for tube thoracostomy procedure.',
    citation: [1],
    confidence: 'definitive',
  },

  {
    id: 'stable-ptx-management',
    type: 'question',
    module: 4,
    title: 'Stable Patient — Size Assessment',
    body: 'Obtain **CXR or CT** to assess pneumothorax size.\n\nPOCUS lung point location provides initial size estimate.',
    citation: [1, 5],
    options: [
      {
        label: 'Small PTX (<3cm at apex)',
        description: 'Observation with supplemental O2',
        next: 'small-ptx',
      },
      {
        label: 'Large PTX (≥3cm or symptomatic)',
        description: 'Chest tube or aspiration',
        next: 'large-ptx',
      },
    ],
  },

  {
    id: 'small-ptx',
    type: 'result',
    module: 4,
    title: 'Small Pneumothorax — Observation',
    body: '**Observation with high-flow O2** (if not COPD):\n• Repeat imaging in **6 hours**\n• Admit for observation\n• Supplemental O2 increases reabsorption rate (~2%/day → ~4%/day)\n\n**Discharge criteria:**\n• Stable or improving on repeat imaging\n• No respiratory distress\n• Reliable follow-up available',
    citation: [1],
    confidence: 'consider',
  },

  {
    id: 'large-ptx',
    type: 'result',
    module: 4,
    title: 'Large Pneumothorax — Intervention',
    body: '**Chest tube placement** indicated.\n\nSimple aspiration may be considered for **primary spontaneous pneumothorax** in select patients.\n\nSee [Chest Tube / Pneumothorax Management](#/tree/chest-tube) for:\n• Tube thoracostomy procedure\n• Insertion technique\n• Post-placement management',
    citation: [1],
    confidence: 'recommended',
  },

  // Trauma-specific eFAST branch

  {
    id: 'trauma-efast',
    type: 'info',
    module: 2,
    title: 'Trauma — eFAST Protocol',
    body: 'In trauma, pneumothorax evaluation is part of the **eFAST exam**.\n\n**Key points:**\n• Supine position — air rises **anteriorly**\n• Up to **50% of pneumothoraces** are occult on initial CXR but visible on CT\n• POCUS detects occult PTX missed on supine CXR\n\n**Occult PTX management:**\n• Observation appropriate for small, stable occult PTX\n• Consider chest tube if **positive pressure ventilation** planned or PTX enlarging',
    citation: [1, 4, 5],
    next: 'lung-sliding-assessment',
  },
];

export const PNEUMOTHORAX_MODULE_LABELS = [
  'POCUS Technique',
  'Findings Interpretation',
  'PTX Confirmation',
  'Management',
];

export const PNEUMOTHORAX_CITATIONS: { num: number; text: string }[] = [
  { num: 1, text: 'American College of Emergency Physicians. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the Emergency Department with Suspected Pneumothorax. Ann Emerg Med. 2019;74(4):e41-e46. https://doi.org/10.1016/j.annemergmed.2019.07.015' },
  { num: 2, text: 'Volpicelli G, Elbarbary M, Blaivas M, et al. International Evidence-Based Recommendations for Point-of-Care Lung Ultrasound. Intensive Care Med. 2012;38(4):577-91. https://doi.org/10.1007/s00134-012-2513-4' },
  { num: 3, text: 'Lichtenstein DA, Mezière GA. Bedside Lung Ultrasound in the Critically Ill (BLUE) Protocol. Chest. 2008;134(1):117-25. https://doi.org/10.1378/chest.07-2800' },
  { num: 4, text: 'Sistrom CL, Reiheld CT, Gay SB, et al. Accuracy of Transthoracic Sonography in Detection of Pneumothorax After Sonographically Guided Lung Biopsy. J Ultrasound Med. 2004;23(4):495-503. https://doi.org/10.7863/jum.2004.23.4.495' },
  { num: 5, text: 'Dietrich CF, Mathis G, Blaivas M, et al. EFSUMB Guidelines and Recommendations on the Clinical Use of Lung Ultrasound. Ultraschall Med. 2012;33(1):32-9. https://doi.org/10.1055/s-0031-1286386' },
];
