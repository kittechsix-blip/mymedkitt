// MedKitt — Pneumothorax POCUS Consult
// Technique → Lung Sliding → A' Profile → Lung Point → Management
// 4 modules: POCUS Technique → Findings Interpretation → Pneumothorax Confirmation → Management
// 13 nodes total.

import type { DecisionNode } from '../../models/types.js';

export const PNEUMOTHORAX_CRITICAL_ACTIONS = [
  { text: 'Needle decompression at 2nd ICS MCL if tension PTX (hypotension + JVD + tracheal deviation)', nodeId: 'needle-decompression' },
  { text: 'Asymptomatic / minimally symptomatic PSP: conservative management is first-line REGARDLESS of size (ERS/EACTS/ESTS 2024, BTS 2023)', nodeId: 'small-ptx' },
  { text: 'Symptomatic PSP requiring intervention: needle aspiration PREFERRED over chest tube (ERS 2024 strong recommendation)', nodeId: 'large-ptx' },
  { text: 'If chest drain used for PSP: small-bore pigtail (<14 Fr); large-bore (>28 Fr) only for SSP with hemothorax/air leak', nodeId: 'large-ptx' },
  { text: 'Lung point on POCUS is pathognomonic for PTX (100% specificity)', nodeId: 'confirmed-ptx' },
  { text: 'Normal lung sliding, B-lines, or seashore sign excludes PTX (NPV >99%)', nodeId: 'normal-findings' },
  { text: 'Do NOT delay needle decompression for imaging if tension suspected', nodeId: 'needle-decompression' },
  { text: 'Occult PTX on POCUS requires chest tube if positive pressure ventilation planned', nodeId: 'trauma-efast' },
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
    summary: 'POCUS detects 20-50 mL air — indicated for chest trauma, sudden dyspnea, decreased breath sounds',
    skippable: true,
  },

  {
    id: 'pocus-technique',
    type: 'info',
    module: 1,
    title: 'POCUS Technique',
    body: '**Probe:** High-frequency linear probe\n\n**Position:** Scan anterior chest at **2nd-4th intercostal spaces**, mid-clavicular line\n\n**Steps:**\n1. Compare bilateral lung sliding\n2. Use **M-mode** to confirm findings\n3. Look for lung point if no sliding\n\n**Tip:** In trauma, this is part of the **eFAST** exam. Supine position — air rises anteriorly.',
    citation: [2, 3],
    images: [{ src: 'images/pneumothorax/us-anatomy.jpg', alt: 'Lung ultrasound anatomy — pleural line, rib shadows, A-lines', caption: 'POCUS anatomy: rib shadows (R), pleural line (P), and A-lines (horizontal reverberation artifacts). Normal lung sliding occurs at the pleural line.' }],
    next: 'lung-sliding-assessment',
    summary: 'Linear probe at 2nd-4th ICS MCL, M-mode confirmation, part of eFAST in trauma',
    skippable: true,
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
    images: [{ src: 'images/pneumothorax/b-lines.png', alt: 'B-lines on lung ultrasound — comet tail artifacts', caption: 'B-lines (comet tail artifacts): vertical hyperechoic lines from pleural surface. Presence of B-lines EXCLUDES pneumothorax — cannot have interstitial edema without pleural contact.' }],
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
    summary: 'Lung sliding + B-lines = no PTX; absent sliding + barcode sign = possible PTX, find lung point',
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
    images: [{ src: 'images/pneumothorax/m-mode-barcode.png', alt: 'M-mode barcode sign — stratosphere sign indicating absent lung sliding', caption: 'Barcode/stratosphere sign: horizontal parallel lines throughout M-mode image. Replaces normal seashore sign, indicating absent lung sliding. Suggests but does not confirm PTX — look for lung point.' }],
    next: 'lung-point',
    summary: 'Absent sliding alone is not diagnostic — rule out mainstem intubation, adhesions, apnea, ARDS',
  },

  {
    id: 'lung-point',
    type: 'question',
    module: 3,
    title: 'Lung Point Identified?',
    body: 'The **lung point** is **pathognomonic** for pneumothorax — where lung sliding appears and disappears with respiration at the border of the collapsed lung.\n\n**Specificity: 100%**\n\nSlide the probe laterally from the area of absent sliding until you see intermittent sliding.',
    citation: [2, 3],
    images: [{ src: 'images/pneumothorax/lung-point.png', alt: 'Lung point on POCUS — intermittent sliding at PTX border', caption: 'Lung point: intermittent appearance/disappearance of lung sliding with each breath at the edge of the pneumothorax. Pathognomonic for PTX (100% specificity). Location estimates size — more lateral = larger PTX.' }],
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
    summary: 'Lung point is pathognomonic for PTX (100% specificity) — slide probe laterally to find border',
  },

  {
    id: 'confirmed-ptx',
    type: 'info',
    module: 3,
    title: 'Pneumothorax Confirmed',
    body: '**POCUS confirmed pneumothorax** (lung point = 100% specificity).\n\n**Size estimation by lung point location:**\n• Anterior chest only → **Small**\n• Extends to mid-axillary line → **Moderate**\n• Extends posteriorly → **Large**',
    citation: [2, 4],
    next: 'tension-assessment',
    summary: 'PTX confirmed — estimate size by lung point location: anterior=small, mid-axillary=moderate, posterior=large',
  },

  {
    id: 'no-lung-point',
    type: 'info',
    module: 3,
    title: 'No Lung Point — Massive PTX?',
    body: 'If absent lung sliding throughout the **entire hemithorax** without a lung point, suspect **massive pneumothorax** with complete lung collapse.\n\n**Confirm with CXR** — assess for mediastinal shift.\n\nIf hemodynamically unstable → treat as tension pneumothorax.',
    citation: [2, 3],
    next: 'tension-assessment',
    summary: 'No lung point = suspect massive PTX with complete collapse — if unstable, treat as tension',
    safetyLevel: 'critical',
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
    summary: 'Hypotension + JVD + tracheal deviation = tension — do NOT wait for imaging, decompress now',
    safetyLevel: 'critical',
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
    body: 'Obtain **CXR or CT** to assess pneumothorax size, but **2024 ERS/EACTS/ESTS + BTS 2023 emphasize symptom-based, not size-based, decisions.** [6]\n\nPOCUS lung point location provides initial size estimate.\n\n**Updated paradigm (2024):**\n• Asymptomatic / minimally symptomatic PSP → conservative management regardless of size (Brown et al NEJM 2020 conservative-non-inferior trial)\n• Symptomatic → needle aspiration preferred over chest tube as first invasive step',
    citation: [1, 5, 6],
    images: [{ src: 'images/pneumothorax/ptx-cxr-annotated.png', alt: 'Annotated chest X-ray showing pneumothorax', caption: 'CXR: visceral pleural line (white arrow) with absent lung markings lateral to it. Size historically measured at apex (BTS); 2024 guidelines now prioritize symptoms over absolute size.' }],
    options: [
      {
        label: 'Asymptomatic / minimally symptomatic',
        description: '2024 ERS/EACTS/ESTS: conservative management first-line regardless of size',
        next: 'small-ptx',
      },
      {
        label: 'Symptomatic PSP (pain, dyspnea)',
        description: 'Needle aspiration preferred over chest tube per 2024 ERS',
        next: 'large-ptx',
      },
    ],
    summary: '2024 ERS/EACTS/ESTS + BTS 2023 — symptom-based, not size-based; conservative for asymptomatic PSP, needle aspiration before chest tube for symptomatic',
  },

  {
    id: 'small-ptx',
    type: 'result',
    module: 4,
    title: 'Asymptomatic / Minimally Symptomatic PSP — Conservative Management',
    body: '**2024 ERS/EACTS/ESTS + BTS 2023:** Conservative (watch-and-wait) management is first-line for asymptomatic or minimally symptomatic primary spontaneous pneumothorax (PSP), **regardless of size**. [6]\n\n**Evidence:** Brown et al (NEJM 2020 PSP-CMT trial): conservative care non-inferior to chest drain for 8-week radiologic resolution, with fewer adverse events and lower 1-year recurrence. Pooled meta-analysis (11,922 cases, 8 studies): RR of recurrence 0.98 (95% CI 0.75-1.28).\n\n**ED disposition options:**\n• Observation 4-6 hours, repeat CXR — if stable, discharge with close follow-up (48-72h)\n• Ambulatory management (Heimlich valve) if local infrastructure supports it\n• Supplemental O2 increases reabsorption rate (~2%/day → ~4%/day) but is not mandatory in modern conservative protocols\n\n**Discharge criteria:**\n• Stable on repeat imaging at 4-6h\n• No respiratory distress\n• Reliable follow-up within 48-72h\n• Patient understands return precautions (worsening dyspnea, chest pain)\n\n**Admission for observation** still appropriate for: secondary spontaneous PTX (SSP — underlying lung disease), uncertain follow-up, large symptomatic PSP awaiting intervention.',
    citation: [1, 6],
    confidence: 'recommended',
  },

  {
    id: 'large-ptx',
    type: 'result',
    module: 4,
    title: 'Symptomatic PSP — Intervention',
    body: '**2024 ERS/EACTS/ESTS strong recommendation:** Needle aspiration is **preferred over chest tube** as the first invasive intervention for symptomatic PSP. [6]\n\n**Step 1 — Needle Aspiration:**\n• 16-18G angiocath or aspiration kit, 2nd ICS MCL\n• Aspirate up to 2.5 L; stop if resistance, cough, or 2.5 L reached\n• Reassess with CXR — if lung re-expanded: observe, then discharge with close follow-up\n• Success rate ~60-70% for PSP\n\n**Step 2 — Chest Drain (if aspiration fails or SSP):**\n• **Small-bore pigtail catheter (<14 Fr) preferred for PSP** (2010 BTS, retained in 2023)\n• Large-bore (>28 Fr) reserved for SSP with hemothorax, large air leak, or mechanical ventilation\n• Connect to underwater seal ± suction\n\n**Ambulatory device (Heimlich/Atrium Pneumostat):** Increasingly favored for select PSP patients with good support and access to follow-up.\n\nSee [Chest Tube / Pneumothorax Management](#/tree/chest-tube) for tube thoracostomy procedure.',
    citation: [1, 6],
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
    summary: 'Supine trauma — air rises anteriorly, 50% of PTX occult on CXR; chest tube if positive pressure ventilation planned',
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
  { num: 6, text: 'Mummadi SR, Lehmann KJ, Murray E, et al; ERS/EACTS/ESTS Task Force. ERS/EACTS/ESTS clinical practice guidelines on adults with spontaneous pneumothorax. Eur Respir J. 2024;63(5):2300797. https://doi.org/10.1183/13993003.00797-2023' },
];
