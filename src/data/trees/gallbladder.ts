// MedKitt — Gallbladder Disease
// Evidence-based biliary pathology: biliary colic, cholecystitis, cholangitis, choledocholithiasis
// Tokyo Guidelines 2018 severity grading, imaging, antibiotics, surgical timing, ERCP indications
// 8 modules: Initial → Imaging → Cholecystitis → Cholangitis → Choledocholithiasis → Antibiotics → Surgery → Disposition
// 30 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction, Citation } from '../../services/tree-service.js';

export const GALLBLADDER_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Tokyo Grade III cholecystitis: organ dysfunction → ICU, may need percutaneous drainage', nodeId: 'gb-cholecystitis-severe' },
  { text: 'Cholangitis: Charcot\'s triad (fever + jaundice + RUQ pain); Grade II-III needs ERCP <24h', nodeId: 'gb-cholangitis-severity' },
  { text: 'Murphy\'s sign: 79-96% specific for cholecystitis; negative has 90.5% NPV', nodeId: 'gb-exam' },
  { text: 'Elevated bili >1.7 + dilated CBD >10mm = high probability choledocholithiasis → ERCP', nodeId: 'gb-choledocholithiasis' },
  { text: 'Early cholecystectomy (<72h) has better outcomes than delayed; even up to 10 days is safe', nodeId: 'gb-surgery-timing' },
];

export const GALLBLADDER_MODULE_LABELS: string[] = [
  'Initial Assessment',
  'Imaging',
  'Acute Cholecystitis',
  'Acute Cholangitis',
  'Choledocholithiasis',
  'Antibiotics',
  'Surgical Timing',
  'Disposition',
];

export const GALLBLADDER_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'gb-start',
    type: 'question',
    module: 1,
    title: 'Biliary Pathology Assessment',
    body: '[Gallbladder Overview](#/info/gb-overview)\n\n**Key Differentials:**\n• **Biliary colic:** Transient cystic duct obstruction, pain <6h, no fever\n• **Acute cholecystitis:** Persistent obstruction + inflammation, pain >6h, fever\n• **Cholangitis:** CBD obstruction + infection (Charcot\'s triad)\n• **Choledocholithiasis:** CBD stone ± symptoms\n\n**Initial Assessment:**\n1. History: pain duration, location, fever, jaundice\n2. Physical exam: Murphy\'s sign\n3. Labs: CBC, CMP, LFTs, lipase\n\n**What is the primary concern?**',
    citation: [1, 2],
    options: [
      {
        label: 'RUQ Pain — Need Workup',
        next: 'gb-exam',
      },
      {
        label: 'Known Cholecystitis — Grade Severity',
        next: 'gb-cholecystitis-grade',
      },
      {
        label: 'Suspected Cholangitis (Fever + Jaundice)',
        next: 'gb-cholangitis-assess',
      },
    ],
    summary: 'Biliary colic <6h, no fever; cholecystitis >6h + fever; cholangitis = fever + jaundice + RUQ pain',
  },

  {
    id: 'gb-exam',
    type: 'info',
    module: 1,
    title: 'Physical Exam & Lab Patterns',
    body: '[Murphy\'s Sign](#/info/gb-murphy)\n\n**Murphy\'s Sign:**\n• Technique: Hand on RUQ below costal margin, patient inspires\n• Positive: Inspiratory arrest when hand contacts gallbladder\n• Sensitivity: 75-86%\n• **Specificity: 79-96%** (excellent for ruling IN)\n• **Negative Predictive Value: 90.5%**\n\n**Charcot\'s Triad (Cholangitis):**\n• Fever + Jaundice + RUQ pain\n• Present in only 50-70% of cholangitis cases\n• Specificity: 95.9% (if all three present)\n\n**Reynolds\' Pentad (Severe Cholangitis):**\n• Charcot\'s triad + Hypotension + Altered mental status\n• Only 4-8% of cholangitis cases\n• Indicates septic shock — emergent drainage needed\n\n**Lab Patterns:**\n\n| Condition | WBC | LFTs | Bilirubin | Lipase |\n|-----------|-----|------|-----------|--------|\n| Biliary colic | Normal | Normal | Normal | Normal |\n| Cholecystitis | ↑ | Normal | Normal | Normal |\n| Cholangitis | ↑ | ↑ ALP | ↑↑ | Normal |\n| Choledocholithiasis | ± | ↑ ALP | ↑ | Normal |\n| Gallstone pancreatitis | ↑ | ↑ | ↑ | ↑↑↑ |',
    citation: [1, 2, 3],
    next: 'gb-imaging-choice',
    summary: 'Murphy\'s sign 79-96% specific; Charcot\'s triad 95.9% specific for cholangitis; check LFT pattern',
  },

  // =====================================================================
  // MODULE 2: IMAGING
  // =====================================================================

  {
    id: 'gb-imaging-choice',
    type: 'question',
    module: 2,
    title: 'Imaging Selection',
    body: '[POCUS Gallbladder](#/info/gb-pocus)\n\n**RUQ Ultrasound (First-Line):**\n• Gallstones: Sensitivity >86%, Specificity >88%\n• Overall for cholecystitis: Sens 94%, Spec 84%\n\n**POCUS Findings for Cholecystitis:**\n• Gallstones (echogenic + shadowing)\n• Wall thickening >5mm (90% specific)\n• Pericholecystic fluid\n• Sonographic Murphy\'s sign\n\n**When to Get Additional Imaging:**\n\n**CT:** If complications suspected (emphysematous, gangrenous, perforation)\n\n**MRCP:** CBD stones suspected, need to confirm before ERCP\n• Sensitivity 85-100%, Specificity 90%\n\n**HIDA:** Equivocal US, need to confirm cystic duct obstruction\n• 99% specific if gallbladder doesn\'t fill\n\n**What do the imaging findings show?**',
    citation: [4, 5],
    options: [
      {
        label: 'Gallstones + Positive Sonographic Murphy\'s',
        next: 'gb-cholecystitis-grade',
      },
      {
        label: 'Gallstones Only (No Inflammation Signs)',
        next: 'gb-biliary-colic',
      },
      {
        label: 'Dilated CBD (>6mm)',
        next: 'gb-choledocholithiasis',
      },
      {
        label: 'Complications (Gas, Perforation, Abscess)',
        next: 'gb-cholecystitis-severe',
      },
    ],
    summary: 'US first-line; POCUS: stones + wall >5mm + sono-Murphy = cholecystitis; MRCP if CBD stone suspected',
  },

  {
    id: 'gb-biliary-colic',
    type: 'result',
    module: 2,
    title: 'Biliary Colic',
    body: '**Diagnosis:** Transient cystic duct obstruction without inflammation\n\n**Clinical Features:**\n• RUQ/epigastric pain <6 hours duration\n• Pain may radiate to back or right shoulder\n• Often triggered by fatty meal\n• No fever, normal WBC\n• Murphy\'s sign may be positive but no peritoneal signs\n\n**Labs:** Normal LFTs, WBC, lipase\n\n**Management:**\n\n**Pain Control:**\n• Ketorolac 15-30mg IV/IM (NSAIDs reduce recurrence)\n• Opioids PRN (morphine, hydromorphone)\n\n**Antiemetics:**\n• Ondansetron 4mg IV\n\n**Disposition:**\n• Discharge with surgical referral\n• Elective cholecystectomy recommended\n• Low-fat diet until surgery\n• Return precautions: fever, worsening pain, jaundice\n\n**Natural History:**\n• 50-70% will have recurrent symptoms\n• 1-3% per year progress to cholecystitis',
    citation: [1, 6],
    recommendation: 'Pain control (ketorolac preferred). Discharge with surgical referral for elective cholecystectomy.',
    confidence: 'recommended',
    summary: 'Biliary colic: pain <6h, no fever, normal labs; ketorolac for pain; discharge with surgical referral',
  },

  // =====================================================================
  // MODULE 3: ACUTE CHOLECYSTITIS
  // =====================================================================

  {
    id: 'gb-cholecystitis-grade',
    type: 'question',
    module: 3,
    title: 'Tokyo Guidelines — Cholecystitis Severity',
    body: '[Tokyo Guidelines 2018](#/info/gb-tokyo)\n\n**Grade I (Mild):**\n• Acute cholecystitis without organ dysfunction\n• No severe local inflammation\n• <5% complication rate\n\n**Grade II (Moderate) — ANY of:**\n• WBC >18,000\n• Palpable RUQ mass\n• Symptom duration >72 hours\n• Marked local inflammation:\n  - Gangrenous changes\n  - Pericholecystic abscess\n  - Hepatic abscess\n  - Biliary peritonitis\n  - Emphysematous cholecystitis\n\n**Grade III (Severe) — Organ Dysfunction:**\n• Cardiovascular: vasopressor requirement\n• Neurological: altered mental status\n• Respiratory: PaO2/FiO2 <300\n• Renal: Cr >2.0 or oliguria\n• Hepatic: INR >1.5\n• Hematologic: Platelets <100,000\n\n**What grade?**',
    citation: [2, 7],
    options: [
      {
        label: 'Grade I — Mild',
        next: 'gb-cholecystitis-mild',
      },
      {
        label: 'Grade II — Moderate',
        next: 'gb-cholecystitis-moderate',
      },
      {
        label: 'Grade III — Severe (Organ Dysfunction)',
        next: 'gb-cholecystitis-severe',
      },
    ],
    summary: 'Tokyo grading: I = uncomplicated; II = local complications or WBC >18K or >72h; III = organ dysfunction',
  },

  {
    id: 'gb-cholecystitis-mild',
    type: 'result',
    module: 3,
    title: 'Grade I Cholecystitis — Mild',
    body: '**Management:**\n\n**Antibiotics (Monotherapy):**\n• Piperacillin-tazobactam 4.5g IV q6-8h, OR\n• Ampicillin-sulbactam 3g IV q6h, OR\n• Cefoxitin 2g IV q6h\n\n**Duration:** 3-7 days (can shorten if early cholecystectomy)\n\n**Pain Management:**\n• Ketorolac 15-30mg IV\n• Opioids PRN\n\n**NPO + IV fluids**\n\n**Surgery:**\n• **Early laparoscopic cholecystectomy within 72 hours**\n• Better outcomes than delayed surgery\n• Same-day surgery safe if available\n\n**If Not Surgical Candidate:**\n• Conservative management with antibiotics\n• Percutaneous cholecystostomy if fails antibiotics\n• Interval cholecystectomy 6-8 weeks',
    citation: [2, 7, 8],
    recommendation: 'Antibiotics (pip-tazo or amp-sulb) + early cholecystectomy within 72h. Pain control with ketorolac.',
    confidence: 'recommended',
    summary: 'Grade I: antibiotics + early lap chole within 72h; pip-tazo or amp-sulb; 3-7 days antibiotics',
  },

  {
    id: 'gb-cholecystitis-moderate',
    type: 'result',
    module: 3,
    title: 'Grade II Cholecystitis — Moderate',
    body: '**Management:**\n\n**Antibiotics (Broader Spectrum):**\n• Cefoxitin 2g IV q6h, OR\n• Ceftriaxone 1-2g IV q12h + metronidazole 500mg IV q6-8h, OR\n• Piperacillin-tazobactam 4.5g IV q6-8h\n\n**Duration:** 7-10 days\n\n**Surgery:**\n• **Early cholecystectomy still preferred within 72h if feasible**\n• May require experienced surgeon due to inflammation\n• Subtotal cholecystectomy option if anatomy obscured\n\n**If High Surgical Risk:**\n• Percutaneous cholecystostomy + antibiotics\n• Interval cholecystectomy 6-8 weeks after drainage\n\n**Monitoring:**\n• Close observation for progression to Grade III\n• Repeat imaging if clinical deterioration\n• Consider CT if gangrenous/emphysematous suspected',
    citation: [2, 7, 8],
    recommendation: 'Broader antibiotics + early chole if feasible. Percutaneous drainage if high-risk. Monitor for progression.',
    confidence: 'recommended',
    summary: 'Grade II: broader antibiotics + early chole if feasible; perc drainage if high-risk; 7-10 days antibiotics',
  },

  {
    id: 'gb-cholecystitis-severe',
    type: 'result',
    module: 3,
    title: 'Grade III Cholecystitis — Severe',
    body: '**⚠️ ORGAN DYSFUNCTION PRESENT — ICU LEVEL CARE**\n\n**Resuscitation:**\n• IV fluids, vasopressors if needed\n• Respiratory support\n• Correct coagulopathy\n\n**Antibiotics (Broad-Spectrum):**\n• Meropenem 1g IV q8h OR imipenem 500mg IV q6h, OR\n• Ceftazidime 2g IV q8h + metronidazole, OR\n• Piperacillin-tazobactam 4.5g IV q6h + consider aminoglycoside\n\n**Duration:** 7-14 days\n\n**Source Control:**\n• **Percutaneous cholecystostomy (PTC)** — first-line for unstable patients\n• Allows stabilization before definitive surgery\n• Interval cholecystectomy after recovery\n\n**Surgery:**\n• Delay until organ dysfunction resolved\n• Emergency surgery only if perforation with peritonitis\n\n**Complications to Assess:**\n• Gangrenous cholecystitis (CT: irregular wall, no enhancement)\n• Emphysematous (gas in wall)\n• Perforation (free fluid, abscess)\n• Mirizzi syndrome (stone compressing CBD)',
    citation: [2, 7, 8],
    recommendation: 'ICU + resuscitation + carbapenems. Percutaneous drainage first-line. Delay surgery until stable.',
    confidence: 'definitive',
    summary: 'Grade III: ICU, broad antibiotics (carbapenems), percutaneous drainage, delay surgery until stable',
  },

  // =====================================================================
  // MODULE 4: ACUTE CHOLANGITIS
  // =====================================================================

  {
    id: 'gb-cholangitis-assess',
    type: 'info',
    module: 4,
    title: 'Cholangitis Assessment',
    body: '[Cholangitis Diagnosis](#/info/gb-cholangitis)\n\n**Tokyo Guidelines 2018 — Diagnostic Criteria:**\n\n**A. Systemic Inflammation:**\n• Fever (>38°C) and/or rigors\n• Elevated WBC (<4K or >10K) or CRP\n\n**B. Cholestasis:**\n• Jaundice (total bili >2)\n• Abnormal LFTs (ALP/GGT elevated)\n\n**C. Imaging:**\n• Biliary dilatation (CBD >6mm, or >10mm post-cholecystectomy)\n• Evidence of etiology (stone, stricture, stent occlusion)\n\n**Diagnosis:**\n• **Definite:** A + B + C all present\n• **Probable:** A + B, or A + C\n\n**Common Causes:**\n• Choledocholithiasis (most common)\n• Stricture (benign or malignant)\n• Stent occlusion\n• Post-ERCP',
    citation: [2, 9],
    next: 'gb-cholangitis-severity',
    summary: 'Cholangitis diagnosis: systemic inflammation + cholestasis + imaging; definite if all 3 present',
  },

  {
    id: 'gb-cholangitis-severity',
    type: 'question',
    module: 4,
    title: 'Cholangitis Severity Grading',
    body: '**Tokyo Guidelines 2018 — Cholangitis Severity:**\n\n**Grade I (Mild):**\n• Responds to antibiotics\n• No organ dysfunction\n• Does not meet Grade II/III criteria\n\n**Grade II (Moderate) — ≥2 of:**\n• WBC >12,000 or <4,000\n• Temperature ≥39°C\n• Age ≥75 years\n• Total bilirubin ≥5 mg/dL\n• Albumin <0.7× lower limit of normal\n\n**Grade III (Severe) — ANY organ dysfunction:**\n• Cardiovascular: hypotension requiring vasopressor\n• Neurological: altered mental status\n• Respiratory: PaO2/FiO2 <300\n• Renal: Cr >2.0 or oliguria\n• Hepatic: INR >1.5\n• Hematologic: Platelets <100,000\n\n**What grade?**',
    citation: [2, 9],
    options: [
      {
        label: 'Grade I — Mild (Responds to Antibiotics)',
        next: 'gb-cholangitis-mild',
      },
      {
        label: 'Grade II — Moderate (≥2 Criteria)',
        next: 'gb-cholangitis-moderate',
      },
      {
        label: 'Grade III — Severe (Organ Dysfunction)',
        next: 'gb-cholangitis-severe',
      },
    ],
    summary: 'Cholangitis: I = responds to abx; II = ≥2 criteria (WBC, fever, age, bili, albumin); III = organ dysfunction',
  },

  {
    id: 'gb-cholangitis-mild',
    type: 'result',
    module: 4,
    title: 'Grade I Cholangitis — Mild',
    body: '**Management:**\n\n**Antibiotics:**\n• Ceftriaxone 1-2g IV q12h + metronidazole 500mg IV q6-8h, OR\n• Ampicillin-sulbactam 3g IV q6h, OR\n• Ciprofloxacin 400mg IV q12h + metronidazole (if beta-lactam allergy)\n\n**Duration:** 5-7 days after source control\n\n**Biliary Drainage:**\n• ERCP for stone extraction if choledocholithiasis confirmed\n• Can be performed electively (within 24-48h) for Grade I\n\n**Monitoring:**\n• Clinical response to antibiotics\n• Repeat LFTs at 24-48h\n• If not improving → upgrade to Grade II management\n\n**After ERCP:**\n• Cholecystectomy if gallstones present (same admission or within 2 weeks)\n• Reduces recurrent biliary events',
    citation: [2, 9],
    recommendation: 'Antibiotics + elective ERCP within 24-48h. Cholecystectomy if gallstones. 5-7 days antibiotics.',
    confidence: 'recommended',
    summary: 'Grade I cholangitis: antibiotics + elective ERCP; cholecystectomy if stones; 5-7 days total',
  },

  {
    id: 'gb-cholangitis-moderate',
    type: 'result',
    module: 4,
    title: 'Grade II Cholangitis — Moderate',
    body: '**⚠️ REQUIRES URGENT DRAINAGE WITHIN 24 HOURS**\n\n**Antibiotics (Broader Spectrum):**\n• Ceftazidime 2g IV q8h + metronidazole 500mg IV q6-8h, OR\n• Piperacillin-tazobactam 4.5g IV q6-8h, OR\n• Cefepime 2g IV q12h + metronidazole\n\n**Duration:** 7-10 days\n\n**Urgent Biliary Drainage (within 24h):**\n• **ERCP preferred** — stone extraction + sphincterotomy\n• If ERCP fails → percutaneous transhepatic drainage (PTD)\n• If PTD not available → surgical drainage\n\n**Evidence:**\n• Drainage <24h: 1.7% mortality\n• Drainage >24h or no drainage: 3.4% mortality\n\n**Monitoring:**\n• Close observation for progression to shock\n• ICU if concerning trajectory\n• Blood cultures (positive in 40-60%)',
    citation: [2, 9, 10],
    recommendation: 'Broad antibiotics + ERCP within 24 hours. Mortality doubles if drainage delayed. 7-10 days antibiotics.',
    confidence: 'definitive',
    summary: 'Grade II: broad antibiotics + ERCP WITHIN 24h; mortality 1.7% with timely drainage vs 3.4% delayed',
  },

  {
    id: 'gb-cholangitis-severe',
    type: 'result',
    module: 4,
    title: 'Grade III Cholangitis — Severe',
    body: '**⚠️ SEPTIC SHOCK — IMMEDIATE INTERVENTION REQUIRED**\n\n**Resuscitation:**\n• Large-bore IV access, aggressive fluid resuscitation\n• Vasopressors (norepinephrine) if hypotensive\n• ICU admission\n\n**Antibiotics (Broadest Spectrum):**\n• Meropenem 1g IV q8h + vancomycin 15-20mg/kg IV, OR\n• Carbapenem ± aminoglycoside (tobramycin 5-7mg/kg q24h)\n\n**Duration:** 10-14 days\n\n**EMERGENT Biliary Drainage:**\n• **ERCP within 2-4 hours if possible**\n• If ERCP unavailable/fails → PTD immediately\n• Goal: decompress biliary tree to control sepsis\n\n**Delay drainage = death**\n\n**Reynolds\' Pentad Features:**\n• Charcot\'s triad + shock + AMS indicates suppurative disease\n• Mortality approaches 50% without emergent drainage\n\n**Post-Drainage:**\n• Continue ICU support\n• Cholecystectomy after recovery if gallstones present',
    citation: [2, 9, 10],
    recommendation: 'ICU + resuscitation + carbapenems + vanc. EMERGENT ERCP within 2-4h. Mortality 50% without drainage.',
    confidence: 'definitive',
    summary: 'Grade III: ICU, sepsis bundle, carbapenems + vanc, EMERGENT ERCP within 2-4h; 50% mortality if delayed',
  },

  // =====================================================================
  // MODULE 5: CHOLEDOCHOLITHIASIS
  // =====================================================================

  {
    id: 'gb-choledocholithiasis',
    type: 'question',
    module: 5,
    title: 'Choledocholithiasis Assessment',
    body: '[CBD Stone Probability](#/info/gb-cbd)\n\n**Probability Assessment:**\n\n**High Probability (>50%) — ERCP directly:**\n• CBD stone visible on US/CT\n• Clinical cholangitis\n• Bilirubin >4 + dilated CBD (>6mm)\n\n**Intermediate Probability (10-50%) — Get MRCP/EUS:**\n• Dilated CBD (>6mm) without visible stone\n• Bilirubin 1.8-4\n• Abnormal LFTs (elevated ALP, GGT)\n• Age >55\n• Gallstone pancreatitis\n\n**Low Probability (<10%) — Proceed to cholecystectomy:**\n• Normal CBD diameter\n• Normal bilirubin\n• Normal LFTs\n\n**What is the probability?**',
    citation: [11, 12],
    options: [
      {
        label: 'High Probability — Proceed to ERCP',
        next: 'gb-ercp',
      },
      {
        label: 'Intermediate — Get MRCP',
        next: 'gb-mrcp',
      },
      {
        label: 'Low Probability — Proceed to Chole',
        next: 'gb-surgery-timing',
      },
    ],
    summary: 'CBD stone probability: high (visible stone, cholangitis) → ERCP; intermediate → MRCP; low → surgery',
  },

  {
    id: 'gb-mrcp',
    type: 'question',
    module: 5,
    title: 'MRCP Results',
    body: '**MRCP (Magnetic Resonance Cholangiopancreatography):**\n\n**Performance:**\n• Sensitivity: 85-100%\n• Specificity: 90%\n• NPV: Excellent (rules out CBD stone)\n\n**Best for:**\n• Intermediate probability patients\n• Confirms/excludes stone before ERCP\n• Avoids unnecessary ERCP (and its complications)\n\n**Alternatives if MRCP unavailable:**\n• EUS (endoscopic ultrasound) — similar accuracy\n• Intraoperative cholangiogram during cholecystectomy\n\n**MRCP Result?**',
    citation: [5, 11],
    options: [
      {
        label: 'CBD Stone Confirmed',
        next: 'gb-ercp',
      },
      {
        label: 'No CBD Stone',
        next: 'gb-surgery-timing',
      },
    ],
    summary: 'MRCP: 85-100% sens, 90% spec for CBD stones; if positive → ERCP; if negative → proceed to chole',
  },

  {
    id: 'gb-ercp',
    type: 'result',
    module: 5,
    title: 'ERCP for Choledocholithiasis',
    body: '[ERCP Procedure](#/info/gb-ercp)\n\n**Indications:**\n• Confirmed CBD stone\n• Clinical cholangitis requiring drainage\n• High probability choledocholithiasis\n\n**Procedure:**\n• Sphincterotomy + balloon/basket extraction\n• >95% stone clearance rate\n\n**Timing:**\n• Cholangitis Grade II-III: within 24h (or emergent)\n• Non-emergent: within 48-72h of diagnosis\n\n**Complications (5-10%):**\n• Post-ERCP pancreatitis (3-5%) — rectal indomethacin reduces risk\n• Bleeding (1-2%)\n• Perforation (0.5-1%)\n• Cholangitis (if incomplete drainage)\n\n**Post-ERCP:**\n• Cholecystectomy if gallbladder stones present\n• Same admission or within 2 weeks\n• Reduces recurrent biliary events (17% → 3%)\n\n**If ERCP Fails:**\n• Percutaneous transhepatic drainage\n• Surgical common bile duct exploration',
    citation: [10, 11, 12],
    recommendation: 'ERCP for CBD stone extraction. >95% success. Cholecystectomy same admission or within 2 weeks.',
    confidence: 'recommended',
    summary: 'ERCP: sphincterotomy + extraction, >95% success; cholecystectomy after to prevent recurrence',
  },

  // =====================================================================
  // MODULE 6: ANTIBIOTICS
  // =====================================================================

  {
    id: 'gb-antibiotics',
    type: 'info',
    module: 6,
    title: 'Antibiotic Selection Summary',
    body: '[Antibiotic Dosing](#/info/gb-abx)\n\n**Cholecystitis:**\n\n| Grade | First-Line | Alternative | Duration |\n|-------|-----------|-------------|----------|\n| I | Pip-tazo 4.5g q6-8h | Amp-sulb 3g q6h | 3-7 days |\n| II | Cefoxitin 2g q6h | CTX + metronidazole | 7-10 days |\n| III | Meropenem 1g q8h | Pip-tazo + aminoglycoside | 7-14 days |\n\n**Cholangitis:**\n\n| Grade | First-Line | Alternative | Duration |\n|-------|-----------|-------------|----------|\n| I | CTX 1-2g q12h + metro | Amp-sulb 3g q6h | 5-7 days |\n| II | Pip-tazo 4.5g q6-8h | Ceftazidime + metro | 7-10 days |\n| III | Meropenem + vanc | Carbapenem + aminoglycoside | 10-14 days |\n\n**Key Organisms:**\n• E. coli (most common)\n• Klebsiella\n• Enterococcus\n• Anaerobes (Bacteroides)\n\n**De-escalation:** Narrow based on cultures when available.',
    citation: [2, 8],
    next: 'gb-surgery-timing',
    summary: 'Antibiotics by severity; cover gram-negatives + anaerobes; carbapenems for severe; de-escalate on cultures',
  },

  // =====================================================================
  // MODULE 7: SURGICAL TIMING
  // =====================================================================

  {
    id: 'gb-surgery-timing',
    type: 'question',
    module: 7,
    title: 'Cholecystectomy Timing',
    body: '[Surgical Timing Evidence](#/info/gb-timing)\n\n**Early Cholecystectomy Evidence (WSES 2020):**\n\n**Within 72 hours ("Golden 72"):**\n• Shorter total hospital stay\n• Lower complication rate\n• No increase in surgical difficulty\n• Cost-effective\n\n**Within 24 hours:**\n• Even better outcomes in some studies\n• Same-admission surgery safe if available\n\n**Up to 10 days:**\n• Still safe and feasible\n• No increased operative difficulty vs early\n• Better than delayed (>2 weeks)\n\n**Delayed (>2 weeks) — AVOID if possible:**\n• Higher morbidity (25-30% vs 15-20%)\n• Longer total hospital stay\n• Higher costs\n• Recurrent biliary events\n\n**When is surgery planned?**',
    citation: [7, 8],
    options: [
      {
        label: 'Early (<72h) — Preferred',
        next: 'gb-disposition-surgery',
      },
      {
        label: 'Delayed (6-8 weeks) — High-Risk Patient',
        next: 'gb-disposition-delayed',
      },
      {
        label: 'Not Surgical Candidate',
        next: 'gb-disposition-nonsurgical',
      },
    ],
    summary: 'Early chole (<72h) preferred; even up to 10 days safe; delayed >2 weeks has worse outcomes',
  },

  // =====================================================================
  // MODULE 8: DISPOSITION
  // =====================================================================

  {
    id: 'gb-disposition-surgery',
    type: 'result',
    module: 8,
    title: 'Disposition — Early Surgery',
    body: '**Admission for Early Cholecystectomy:**\n\n**Pre-Op:**\n• NPO, IV fluids\n• Antibiotics (continue until surgery)\n• Surgical consult\n• Anesthesia clearance\n\n**Surgery:**\n• Laparoscopic cholecystectomy preferred\n• Subtotal cholecystectomy if anatomy unclear (equally safe)\n• Intraoperative cholangiogram if CBD stone concern\n\n**Post-Op:**\n• Advance diet as tolerated\n• Pain control\n• Antibiotics: can stop after surgery if uncomplicated\n• Discharge typically POD 0-1\n\n**Follow-up:**\n• Surgeon follow-up 1-2 weeks\n• Return: fever, increasing pain, jaundice, wound issues\n\n**Complications to Monitor:**\n• Bile leak (0.5-1%)\n• Bile duct injury (0.3-0.5%)\n• Retained CBD stone (if IOC not done)',
    citation: [7, 8],
    recommendation: 'Admit for early laparoscopic cholecystectomy (<72h). Stop antibiotics post-op if uncomplicated.',
    confidence: 'recommended',
    summary: 'Early lap chole: NPO, antibiotics until OR, typically discharge POD 0-1; follow-up 1-2 weeks',
  },

  {
    id: 'gb-disposition-delayed',
    type: 'result',
    module: 8,
    title: 'Disposition — Delayed Surgery',
    body: '**For high-risk patients requiring stabilization:**\n\n**Indications for Delayed Approach:**\n• Grade III cholecystitis (stabilize first)\n• Severe comorbidities (ASA IV)\n• Anticoagulation requiring reversal/bridging\n• Acute MI or unstable cardiac disease\n• Pregnancy (prefer 2nd trimester)\n\n**Bridge to Surgery:**\n• Percutaneous cholecystostomy if needed\n• Complete antibiotic course\n• Optimize comorbidities\n\n**Interval Cholecystectomy:**\n• 6-8 weeks after acute episode\n• After drain removed (if placed)\n• After cardiac clearance (if needed)\n\n**Monitoring:**\n• Repeat imaging if symptoms recur\n• Early surgery if recurrent symptoms despite drainage\n\n**Discharge Instructions:**\n• Low-fat diet\n• Return: fever, RUQ pain, jaundice\n• Follow-up with surgeon 1-2 weeks',
    citation: [7, 8],
    recommendation: 'Percutaneous drainage if needed → stabilize → interval cholecystectomy 6-8 weeks.',
    confidence: 'recommended',
    summary: 'Delayed: perc drain if needed, antibiotics, optimize, interval chole 6-8 weeks; low-fat diet',
  },

  {
    id: 'gb-disposition-nonsurgical',
    type: 'result',
    module: 8,
    title: 'Non-Surgical Management',
    body: '**For patients who are NOT surgical candidates:**\n\n**Indications:**\n• Very high surgical risk (ASA V)\n• End-stage disease with limited life expectancy\n• Patient declines surgery\n\n**Management:**\n• Complete antibiotic course (7-14 days)\n• Percutaneous cholecystostomy for source control\n• Tube management and eventual removal\n\n**Long-term Options:**\n• Chronic cholecystostomy tube\n• Medical dissolution therapy (ursodiol) — limited efficacy\n• Cholecystectomy if patient becomes surgical candidate\n\n**Recurrence Risk:**\n• 30-50% recurrent symptoms without cholecystectomy\n• Monitor for complications\n\n**Discharge Requirements:**\n• Afebrile 24-48h\n• Tolerating oral intake\n• Pain controlled\n• Home health if drain in place\n• Close follow-up',
    citation: [2, 7],
    recommendation: 'Antibiotics + percutaneous drainage. Long-term tube or monitor. 30-50% recurrence without surgery.',
    confidence: 'consider',
    summary: 'Non-surgical: antibiotics + perc drain, chronic tube option, 30-50% recurrence; close follow-up',
  },

];

// =====================================================================
// CITATIONS
// =====================================================================

export const GALLBLADDER_CITATIONS: Citation[] = [
  { num: 1, text: 'Gallaher JR, Charles A. Acute Cholecystitis: A Review. JAMA. 2022;327(10):965-975.' },
  { num: 2, text: 'Yokoe M, et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholecystitis. J Hepatobiliary Pancreat Sci. 2018;25(1):41-54.' },
  { num: 3, text: 'Eskelinen M, Lipponen P. Usefulness of history-taking in non-specific abdominal pain. Ann Chir Gynaecol. 1994;83(1):39-44.' },
  { num: 4, text: 'Bree RL. Further observations on the usefulness of the sonographic Murphy sign. J Clin Ultrasound. 1995;23(9):537-544.' },
  { num: 5, text: 'Defined GD, et al. Magnetic resonance cholangiopancreatography accuracy for choledocholithiasis. World J Gastroenterol. 2012;18(30):3973-3980.' },
  { num: 6, text: 'Abraham S, et al. Surgical and nonsurgical management of gallstones. Am Fam Physician. 2014;89(10):795-802.' },
  { num: 7, text: 'Ansaloni L, et al. 2016 WSES guidelines on acute calculous cholecystitis. World J Emerg Surg. 2016;11:25.' },
  { num: 8, text: 'Pisano M, et al. 2020 World Society of Emergency Surgery updated guidelines for the diagnosis and treatment of acute calculus cholecystitis. World J Emerg Surg. 2020;15(1):61.' },
  { num: 9, text: 'Kiriyama S, et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholangitis. J Hepatobiliary Pancreat Sci. 2018;25(1):17-30.' },
  { num: 10, text: 'Miura F, et al. Tokyo Guidelines 2018: initial management of acute biliary infection. J Hepatobiliary Pancreat Sci. 2018;25(1):31-40.' },
  { num: 11, text: 'ASGE Standards of Practice Committee. The role of endoscopy in the evaluation of suspected choledocholithiasis. Gastrointest Endosc. 2010;71(1):1-9.' },
  { num: 12, text: 'Williams EJ, et al. Guidelines on the management of common bile duct stones. Gut. 2008;57(7):1004-1021.' },
];
