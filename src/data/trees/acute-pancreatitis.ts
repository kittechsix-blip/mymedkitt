// MedKitt — Acute Pancreatitis Management
// Diagnosis → Severity → Resuscitation → Complications → Intervention → Disposition
// 6 modules: Diagnosis & Severity → Resuscitation → Etiology & Workup → Complications → Intervention → Disposition
// ~35 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const ACUTE_PANCREATITIS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: DIAGNOSIS & SEVERITY ASSESSMENT
  // =====================================================================

  {
    id: 'ap-start',
    type: 'info',
    module: 1,
    title: 'Acute Pancreatitis',
    body: '[Acute Pancreatitis Steps Summary](#/info/ap-summary) — diagnosis, severity, resuscitation, complications.\n\n**Diagnosis requires 2 of 3 criteria:** [1][2]\n• Characteristic abdominal pain (epigastric, radiating to back, sudden onset)\n• Serum lipase (or amylase) >3× upper limit of normal\n• Imaging evidence on CT, MRI, or ultrasound\n\n**Key Principles:**\n• Most cases are mild and self-limiting\n• Early severity stratification guides disposition\n• Avoid excessive fluid resuscitation (recent evidence)\n• Delayed intervention for necrotizing pancreatitis\n• Same-admission cholecystectomy for gallstone pancreatitis',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'bisap', label: 'BISAP Score' },
      { id: 'atlanta-severity', label: 'Atlanta Classification' },
    ],
    next: 'ap-severity',
  },

  {
    id: 'ap-severity',
    type: 'question',
    module: 1,
    title: 'Severity Assessment',
    body: '**Revised Atlanta Classification (2012):** [3]\n\nAssess for organ failure using Modified Marshall Score:\n• **Respiratory:** PaO₂/FiO₂ ratio\n• **Renal:** Creatinine\n• **Cardiovascular:** SBP (fluid-responsive vs vasopressor-dependent)\n\n**BISAP Score** (within 24h of admission): [4]\n• BUN >25 mg/dL\n• Impaired mental status (GCS <15)\n• SIRS (≥2 criteria)\n• Age >60 years\n• Pleural effusion\n\n**BISAP ≥3:** 12-30% mortality risk',
    citation: [3, 4],
    calculatorLinks: [
      { id: 'bisap', label: 'BISAP Score' },
      { id: 'modified-marshall', label: 'Modified Marshall Score' },
    ],
    options: [
      {
        label: 'Mild — No Organ Failure',
        description: 'No organ failure, no local/systemic complications',
        next: 'ap-mild-resus',
      },
      {
        label: 'Moderately Severe',
        description: 'Transient organ failure (<48h) OR local complications',
        next: 'ap-moderate-resus',
        urgency: 'urgent',
      },
      {
        label: 'Severe — Persistent Organ Failure',
        description: 'Organ failure >48 hours; mortality ~17-30%',
        next: 'ap-severe-resus',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: RESUSCITATION
  // =====================================================================

  {
    id: 'ap-mild-resus',
    type: 'info',
    module: 2,
    title: 'Mild AP — Initial Management',
    body: '**Fluid Resuscitation:** [5][6]\n• **Lactated Ringer\'s preferred** over NS (reduced inflammation)\n• Moderate approach: 3-4 L in first 24 hours\n• Initial bolus: 10 mL/kg over 2 hours if hypovolemic\n• Maintenance: ~1.5 mL/kg/hr\n• Avoid net positive >3-4 L (overresuscitation harmful)\n\n**Monitoring Goals:**\n• Urine output >0.5 mL/kg/hr\n• Decreasing BUN\n• Improving hematocrit (Hct >44% is poor prognostic sign)\n\n**Pain Control:**\n• Opioids are safe and effective\n• No evidence that morphine worsens AP\n\n**Nutrition:**\n• Early oral feeding within 24-48h as tolerated\n• Start with low-fat solid diet (no stepwise progression needed)\n• No need to wait for pain resolution or normalized enzymes',
    citation: [5, 6],
    calculatorLinks: [
      { id: 'ap-fluid-rate', label: 'Fluid Rate Calculator' },
    ],
    next: 'ap-etiology',
  },

  {
    id: 'ap-moderate-resus',
    type: 'info',
    module: 2,
    title: 'Moderate AP — Resuscitation',
    body: '**Aggressive Monitoring Required:** [5][7]\n\n**Fluids:**\n• LR preferred; avoid NS (hyperchloremic acidosis)\n• Goal-directed: titrate to UOP, BUN, Hct\n• Consider early norepinephrine if fluid-refractory hypotension\n• Avoid excessive crystalloid (increases abdominal compartment pressure)\n\n**Nutrition:**\n• **Enteral nutrition** prevents infectious complications [8]\n• Nasogastric route equivalent to nasojejunal (easier)\n• Start within 24-48 hours if no ileus\n• Avoid TPN unless enteral not tolerated\n\n**ICU Consideration:**\n• Monitor for progression to severe disease\n• Serial abdominal exams\n• Trending lactate, BUN, inflammatory markers',
    citation: [5, 7, 8],
    next: 'ap-etiology',
  },

  {
    id: 'ap-severe-resus',
    type: 'info',
    module: 2,
    title: 'Severe AP — Critical Care',
    body: '**ICU Admission Required** [7][9]\n\n**Hemodynamic Support:**\n• Goal MAP ≥65 mmHg\n• Early norepinephrine if fluid-refractory\n• Avoid excessive crystalloid (worsens outcomes)\n• Consider POCUS for fluid responsiveness\n\n**Respiratory Support:**\n• High flow nasal cannula or BiPAP for hypoxemia\n• Low threshold for intubation if declining\n• Lung-protective ventilation if ARDS develops\n\n**Abdominal Compartment Syndrome:**\n• Measure bladder pressure if tense abdomen\n• >20 mmHg with organ dysfunction = ACS\n• May require decompressive laparotomy\n\n**Enteral Nutrition:**\n• Critical in severe AP — reduces infection\n• NG tube feeding is acceptable\n• Start within 48 hours if possible',
    citation: [7, 9],
    calculatorLinks: [
      { id: 'map-calculator', label: 'MAP Calculator' },
    ],
    next: 'ap-etiology',
  },

  // =====================================================================
  // MODULE 3: ETIOLOGY & WORKUP
  // =====================================================================

  {
    id: 'ap-etiology',
    type: 'question',
    module: 3,
    title: 'Etiology Workup',
    body: '**Most Common Causes:** [1][2]\n• Gallstones (40-70%)\n• Alcohol (25-35%)\n• Hypertriglyceridemia (TG >1,000 mg/dL)\n• Post-ERCP\n• Drugs, trauma, autoimmune\n\n**All Patients Need:**\n• **RUQ ultrasound** — evaluate for gallstones/CBD dilation\n• **Serum triglycerides** — etiology if >1,000 mg/dL\n• **LFTs** — ALT >3× ULN highly suggestive of biliary etiology\n\n**Age >40 with Unknown Etiology:**\n• Consider pancreatic tumor (EUS or MRCP)',
    citation: [1, 2],
    options: [
      {
        label: 'Gallstone Pancreatitis',
        description: 'Stones on US, elevated LFTs, CBD dilation',
        next: 'ap-gallstone',
      },
      {
        label: 'Alcoholic Pancreatitis',
        description: 'History of heavy alcohol use',
        next: 'ap-alcohol',
      },
      {
        label: 'Hypertriglyceridemic',
        description: 'TG >1,000 mg/dL',
        next: 'ap-htg',
      },
      {
        label: 'Other / Idiopathic',
        description: 'Post-ERCP, drug-induced, trauma, autoimmune',
        next: 'ap-other-etiology',
      },
    ],
  },

  {
    id: 'ap-gallstone',
    type: 'info',
    module: 3,
    title: 'Gallstone Pancreatitis',
    body: '**Key Decision: Cholangitis Present?** [10][11]\n\n**Signs of Cholangitis (Charcot\'s Triad):**\n• Fever\n• Jaundice\n• RUQ pain\n\n**If Cholangitis Present:**\n• **Urgent ERCP within 24 hours**\n• Antibiotics: Piperacillin-tazobactam or ampicillin-sulbactam\n• Do not delay for severity of pancreatitis\n\n**If NO Cholangitis:**\n• No routine ERCP\n• MRCP or EUS if CBD stone suspected but not confirmed\n• Avoid diagnostic ERCP (unnecessary risk)\n\n**Cholecystectomy Timing:** [12]\n• **Mild AP:** Same admission, before discharge\n• **Moderate/Severe AP:** Delay 3-6 weeks until inflammation resolved\n• Same-admission CCY reduces readmission for recurrent biliary events',
    citation: [10, 11, 12],
    next: 'ap-complications-q',
  },

  {
    id: 'ap-alcohol',
    type: 'info',
    module: 3,
    title: 'Alcoholic Pancreatitis',
    body: '**Management Considerations:** [1]\n\n**Acute Phase:**\n• Same resuscitation principles as other etiologies\n• Watch for alcohol withdrawal syndrome\n• Thiamine 100mg IV before glucose-containing fluids\n• Consider CIWA protocol\n\n**Alcohol Withdrawal Risk:**\n• Onset 6-24 hours after last drink\n• Peak risk 24-72 hours\n• Benzodiazepines for prophylaxis/treatment\n\n**Long-term:**\n• Alcohol cessation counseling critical\n• Recurrent episodes → chronic pancreatitis\n• Consider GI follow-up for chronic pancreatitis evaluation',
    citation: [1],
    calculatorLinks: [
      { id: 'ciwa-ar', label: 'CIWA-Ar Score' },
    ],
    next: 'ap-complications-q',
  },

  {
    id: 'ap-htg',
    type: 'info',
    module: 3,
    title: 'Hypertriglyceridemic Pancreatitis',
    body: '**Definition:** TG >1,000 mg/dL as the etiology [13]\n\n**Acute Management:**\n• **Insulin infusion:** Activates lipoprotein lipase\n  - Regular insulin 0.1-0.3 units/kg/hr\n  - Dextrose to prevent hypoglycemia\n  - Continue until TG <500 mg/dL\n\n• **Apheresis/Plasmapheresis:**\n  - Consider if TG >2,000 mg/dL\n  - Or if not responding to insulin\n  - Rapidly reduces TG by 50-80%\n\n**NPO Critical:**\n• Dietary fat worsens hypertriglyceridemia\n• Delay feeding until TG controlled\n\n**Outpatient:**\n• Fibrates (fenofibrate, gemfibrozil)\n• Omega-3 fatty acids\n• Strict low-fat diet\n• Diabetes control if applicable',
    citation: [13],
    next: 'ap-complications-q',
  },

  {
    id: 'ap-other-etiology',
    type: 'info',
    module: 3,
    title: 'Other Etiologies',
    body: '**Post-ERCP Pancreatitis:** [14]\n• Most common complication of ERCP (3-5%)\n• Usually mild, self-limiting\n• NSAIDs and pancreatic duct stents reduce risk\n\n**Drug-Induced:**\n• Azathioprine, 6-MP, valproic acid, ACE inhibitors\n• GLP-1 agonists (controversial)\n• Discontinue offending agent\n\n**Autoimmune Pancreatitis:** [15]\n• Type 1: IgG4-related disease, older males\n• Type 2: Associated with IBD\n• Elevated IgG4, pancreatic enlargement on imaging\n• Responds dramatically to steroids\n\n**Trauma:**\n• Blunt abdominal trauma → pancreatic duct injury\n• MRCP to evaluate duct integrity\n\n**Idiopathic:**\n• 10-25% remain without identified cause\n• Consider EUS for occult microlithiasis\n• Genetic testing in recurrent cases',
    citation: [14, 15],
    next: 'ap-complications-q',
  },

  // =====================================================================
  // MODULE 4: COMPLICATIONS
  // =====================================================================

  {
    id: 'ap-complications-q',
    type: 'question',
    module: 4,
    title: 'Complications Assessment',
    body: '**Local Complications:** [3][16]\n\n**Early (<4 weeks):**\n• Acute peripancreatic fluid collection (APFC)\n• Acute necrotic collection (ANC)\n\n**Late (>4 weeks):**\n• Pseudocyst (walled-off fluid)\n• Walled-off necrosis (WON)\n\n**When to Image:**\n• No improvement at 48-72 hours\n• Clinical deterioration\n• Suspected infected necrosis\n• Do NOT routinely image early in mild AP',
    citation: [3, 16],
    calculatorLinks: [
      { id: 'mctsi', label: 'Modified CT Severity Index' },
    ],
    options: [
      {
        label: 'No Complications',
        description: 'Improving clinically, no imaging concerns',
        next: 'ap-dispo-mild',
      },
      {
        label: 'Fluid Collection / Pseudocyst',
        description: 'Peripancreatic fluid without necrosis',
        next: 'ap-pseudocyst',
      },
      {
        label: 'Necrotizing Pancreatitis',
        description: 'Pancreatic/peripancreatic necrosis on imaging',
        next: 'ap-necrosis',
      },
      {
        label: 'Suspected Infected Necrosis',
        description: 'Gas on CT, clinical deterioration, fever, rising WBC/PCT',
        next: 'ap-infected-necrosis',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'ap-pseudocyst',
    type: 'info',
    module: 4,
    title: 'Pseudocyst Management',
    body: '**Definition:** Encapsulated fluid collection with well-defined wall, NO solid debris, develops >4 weeks after onset [3]\n\n**Observation (Most Cases):**\n• Asymptomatic pseudocysts: serial imaging\n• Most acute fluid collections resolve spontaneously\n• Size alone is NOT an indication for drainage\n\n**Intervention Indications:** [17]\n• Symptomatic (pain, early satiety, nausea)\n• Gastric outlet obstruction\n• Biliary obstruction\n• Infected pseudocyst\n• Expanding despite conservative management\n\n**Drainage Options:**\n• **Endoscopic (EUS-guided):** Preferred approach\n• **Percutaneous:** For poor surgical candidates or difficult access\n• **Surgical:** Rarely needed, cystgastrostomy if other approaches fail',
    citation: [3, 17],
    next: 'ap-dispo-complicated',
  },

  {
    id: 'ap-necrosis',
    type: 'info',
    module: 4,
    title: 'Necrotizing Pancreatitis',
    body: '**Definition:** Necrosis of pancreatic parenchyma and/or peripancreatic tissue [3]\n\n**Sterile Necrosis — Conservative Management:** [18][19]\n• NO prophylactic antibiotics (ACG/AGA)\n• Supportive care: fluids, nutrition, pain control\n• Most sterile necrosis resolves without intervention\n• Allow walled-off necrosis (WON) to mature (>4 weeks)\n\n**When to Suspect Infection:**\n• Clinical deterioration after initial improvement\n• New/persistent fever, rising WBC\n• **Gas bubbles in necrosis on CT** (diagnostic)\n• **Procalcitonin >3.5 ng/mL** (suggestive)\n\n**DO NOT perform routine FNA** to diagnose infected necrosis — clinical + imaging sufficient [2]\n\n**Key Principle:** DELAY intervention if patient is stable. Walled-off necrosis (>4 weeks) is safer to drain/debride.',
    citation: [3, 18, 19],
    next: 'ap-necrosis-decision',
  },

  {
    id: 'ap-necrosis-decision',
    type: 'question',
    module: 4,
    title: 'Necrotizing Pancreatitis — Management',
    body: '**Is there evidence of infected necrosis?**\n\n• Gas on CT imaging\n• Procalcitonin >3.5 ng/mL\n• Clinical sepsis syndrome\n• Failure to improve with supportive care',
    citation: [18, 19],
    options: [
      {
        label: 'Sterile Necrosis — Stable',
        description: 'No infection signs, improving or stable',
        next: 'ap-sterile-necrosis-mgmt',
      },
      {
        label: 'Infected Necrosis',
        description: 'Gas on CT, sepsis, or clinical deterioration',
        next: 'ap-infected-necrosis',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'ap-sterile-necrosis-mgmt',
    type: 'info',
    module: 4,
    title: 'Sterile Necrosis — Conservative',
    body: '**Continue Supportive Care:** [18]\n\n• Aggressive enteral nutrition\n• Pain management\n• Serial imaging (CT in 7-10 days or with clinical change)\n• NO prophylactic antibiotics\n\n**Indications for Intervention in Sterile Necrosis:**\n• Gastric outlet or biliary obstruction\n• Persistent symptoms >8 weeks despite conservative therapy\n• Disconnected pancreatic duct syndrome\n\n**Timing:**\n• Delay intervention until WON matures (>4 weeks, ideally 6+ weeks)\n• Mature WON is safer to drain and debride\n\n**Prognosis:**\n• Most sterile necrosis resolves with conservative management\n• ~30% will develop infected necrosis (usually weeks 2-4)',
    citation: [18],
    next: 'ap-dispo-complicated',
  },

  // =====================================================================
  // MODULE 5: INTERVENTION — INFECTED NECROSIS
  // =====================================================================

  {
    id: 'ap-infected-necrosis',
    type: 'info',
    module: 5,
    title: 'Infected Necrosis — Overview',
    body: '**Infected Pancreatic Necrosis is a Life-Threatening Emergency** [18][19][20]\n\n**Diagnosis:**\n• Gas on CT (pathognomonic)\n• Clinical: fever, sepsis, rising WBC/PCT, failure to improve\n• FNA NOT routinely recommended\n\n**Initial Management:**\n• **Antibiotics with pancreatic penetration:**\n  - Piperacillin-tazobactam (first-line)\n  - Carbapenems (meropenem, imipenem)\n  - Fluoroquinolone + metronidazole\n• Prolonged course: 2-4 weeks minimum\n• May avoid intervention in stable patients\n\n**Key Principle: DELAY IS BENEFICIAL** [20]\n• Antibiotics alone may resolve infection (some cases)\n• Allow necrosis to wall off before intervention\n• Early surgery = higher mortality\n• Ideal timing: >4 weeks from onset',
    citation: [18, 19, 20],
    next: 'ap-step-up',
  },

  {
    id: 'ap-step-up',
    type: 'info',
    module: 5,
    title: 'Step-Up Approach',
    body: '**Step-Up Approach (PANTER Trial)** — Superior to open necrosectomy [20][21]\n\n**STEP 1: DELAY + ANTIBIOTICS**\n• If patient stable: antibiotics alone, delay intervention\n• Goal: allow WON to mature (>4 weeks)\n• 35% of patients improve without drainage\n\n**STEP 2: PERCUTANEOUS/ENDOSCOPIC DRAINAGE**\n• Percutaneous catheter drainage (PCD)\n• OR endoscopic transluminal drainage (ETD)\n• 35% resolve with drainage alone\n\n**STEP 3: MINIMALLY INVASIVE NECROSECTOMY**\n• Video-assisted retroperitoneal debridement (VARD)\n• Endoscopic necrosectomy (direct endoscopic approach)\n• Sinus tract endoscopy through PCD tract\n\n**STEP 4: OPEN NECROSECTOMY**\n• Last resort when minimally invasive fails\n• Higher morbidity, longer recovery\n• Delay to >4-6 weeks if possible',
    citation: [20, 21],
    calculatorLinks: [
      { id: 'infected-necrosis-step', label: 'Step-Up Decision Aid' },
    ],
    next: 'ap-intervention-decision',
  },

  {
    id: 'ap-intervention-decision',
    type: 'question',
    module: 5,
    title: 'Intervention Decision',
    body: '**Assess current clinical status and response to antibiotics:**\n\n**Continue Antibiotics Alone If:**\n• Clinically improving\n• Inflammatory markers trending down\n• No expanding collections\n\n**Proceed to Drainage If:**\n• Clinical deterioration despite antibiotics\n• Enlarging collections\n• Persistent sepsis >72 hours on antibiotics\n• Gas persisting/increasing on imaging',
    citation: [20, 21],
    options: [
      {
        label: 'Improving on Antibiotics',
        description: 'Continue conservative management',
        next: 'ap-abx-continue',
      },
      {
        label: 'Stable but Not Improving',
        description: 'Consider drainage, timing based on WON maturity',
        next: 'ap-drainage-timing',
      },
      {
        label: 'Deteriorating / Septic',
        description: 'Urgent drainage required',
        next: 'ap-urgent-drainage',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'ap-abx-continue',
    type: 'info',
    module: 5,
    title: 'Continuing Antibiotics',
    body: '**Antibiotic Management:** [19]\n\n**Duration:**\n• Minimum 2-4 weeks\n• Continue until clinical resolution\n• Serial imaging to monitor collections\n\n**If Improving:**\n• Continue current regimen\n• May transition to oral with good bioavailability\n  - Ciprofloxacin + metronidazole\n  - Amoxicillin-clavulanate\n\n**Monitoring:**\n• Daily clinical assessment\n• Trending WBC, procalcitonin, CRP\n• Repeat CT if clinical change\n\n**No Antifungal Prophylaxis** unless documented fungal infection',
    citation: [19],
    next: 'ap-dispo-complicated',
  },

  {
    id: 'ap-drainage-timing',
    type: 'info',
    module: 5,
    title: 'Drainage Timing',
    body: '**Optimal Timing: >4 Weeks from Symptom Onset** [20][21]\n\n**Why Delay?**\n• Necrosis becomes walled-off (organized collection)\n• Easier to drain/debride\n• Lower complication rate\n• Better demarcation of viable tissue\n\n**Drainage Options:**\n\n**Percutaneous Catheter Drainage (PCD):**\n• IR-placed drain into collection\n• May need upsizing or additional drains\n• Success: ~35% resolve with drainage alone\n\n**Endoscopic Transluminal Drainage (ETD):**\n• EUS-guided transgastric or transduodenal approach\n• Lumen-apposing metal stent (LAMS) or plastic stents\n• Preferred if collection abuts stomach/duodenum\n• TENSION trial: fewer fistulas vs surgical approach\n\n**Consult GI and IR** for multidisciplinary planning',
    citation: [20, 21],
    next: 'ap-dispo-complicated',
  },

  {
    id: 'ap-urgent-drainage',
    type: 'info',
    module: 5,
    title: 'Urgent Drainage',
    body: '**Indications for Urgent Intervention:** [20][21]\n\n• Hemodynamic instability despite resuscitation\n• Multiorgan failure worsening\n• Abdominal compartment syndrome\n• Massive hemorrhage from pseudoaneurysm\n\n**Approach:**\n• **PCD preferred** even urgently (less morbid than surgery)\n• May need multiple drains\n• IR on standby for bleeding (angioembolization)\n\n**If PCD Not Feasible or Fails:**\n• Video-assisted retroperitoneal debridement (VARD)\n• Open necrosectomy (last resort)\n\n**Bleeding Complications:**\n• Pseudoaneurysm (splenic, gastroduodenal arteries)\n• CT angiography to identify\n• Angioembolization preferred over surgery\n\n**Surgical Consultation Essential** for all infected necrosis cases',
    citation: [20, 21],
    next: 'ap-dispo-complicated',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'ap-dispo-mild',
    type: 'info',
    module: 6,
    title: 'Disposition — Mild AP',
    body: '**Discharge Criteria:** [1][2]\n• Pain controlled with oral medications\n• Tolerating oral diet\n• Hemodynamically stable\n• Trending labs improving\n\n**Before Discharge:**\n• Confirm etiology\n• **Gallstone AP:** Schedule cholecystectomy (same admission or within 2 weeks)\n• **Alcohol AP:** Cessation counseling, withdrawal precautions\n• **HTG:** Lipid clinic referral, fibrate prescription\n\n**Follow-up:**\n• PCP within 1-2 weeks\n• GI referral if recurrent or uncertain etiology\n• Return precautions: worsening pain, fever, vomiting',
    citation: [1, 2],
    next: 'ap-complete',
  },

  {
    id: 'ap-dispo-complicated',
    type: 'info',
    module: 6,
    title: 'Disposition — Complicated AP',
    body: '**ICU Admission Criteria:**\n• Persistent organ failure (severe AP)\n• Infected necrosis requiring intervention\n• Hemodynamic instability\n• Respiratory failure\n\n**Step-Down/Floor:**\n• Moderate AP with transient organ failure resolved\n• Stable necrotizing pancreatitis on antibiotics\n• Pseudocyst not requiring urgent intervention\n\n**Multidisciplinary Team:**\n• GI (endoscopic drainage, nutrition)\n• IR (percutaneous drainage, embolization)\n• Surgery (necrosectomy if needed)\n• Nutrition (enteral feeding optimization)\n\n**Long-term Considerations:**\n• Exocrine insufficiency (enzyme supplementation)\n• Endocrine insufficiency (diabetes)\n• Chronic pancreatitis if recurrent episodes',
    citation: [1, 3],
    next: 'ap-complete',
  },

  {
    id: 'ap-complete',
    type: 'result',
    module: 6,
    title: 'Acute Pancreatitis — Complete',
    body: '**Summary:**\n• Diagnosed with 2 of 3 criteria (pain, lipase >3×, imaging)\n• Severity by Atlanta Classification guides management\n• Moderate fluid resuscitation (LR, ~3-4L/24h)\n• Early enteral nutrition\n• No prophylactic antibiotics\n• Gallstone → same-admission cholecystectomy (if mild)\n• Infected necrosis → step-up approach (delay + antibiotics → drain → debride)\n\n**Key Resources:**\n• [BISAP Score](#/calculator/bisap)\n• [Atlanta Classification](#/calculator/atlanta-severity)\n• [Modified CTSI](#/calculator/mctsi)\n• [Fluid Rate Calculator](#/calculator/ap-fluid-rate)',
    recommendation: 'Management pathway complete. Ensure appropriate disposition and follow-up.',
  },

];

export const ACUTE_PANCREATITIS_MODULE_LABELS = [
  'Diagnosis & Severity',
  'Resuscitation',
  'Etiology & Workup',
  'Complications',
  'Intervention',
  'Disposition',
];

export const ACUTE_PANCREATITIS_CRITICAL_ACTIONS = [
  { text: 'Diagnosis requires 2 of 3: characteristic pain, lipase >3x ULN, imaging findings', nodeId: 'ap-start' },
  { text: 'BISAP score ≥3 or Ranson ≥3 = severe pancreatitis (ICU candidate)', nodeId: 'ap-bisap' },
  { text: 'MODERATE fluid resuscitation: LR 5-10 mL/kg/hr (NOT aggressive 20 mL/kg - increases mortality)', nodeId: 'ap-fluids-moderate' },
  { text: 'Goal-directed resuscitation: reassess q6h, target UOP 0.5-1 mL/kg/hr, HR <120, MAP 65-85', nodeId: 'ap-fluids-moderate' },
  { text: 'Early feeding within 24h if tolerated (oral > enteral > parenteral)', nodeId: 'ap-nutrition' },
  { text: 'Antibiotics only for infected necrosis or cholangitis (NOT prophylactic)', nodeId: 'ap-antibiotics' },
  { text: 'ERCP within 24h for acute cholangitis with gallstone pancreatitis (NOT routine)', nodeId: 'ap-ercp-urgent' },
  { text: 'Cholecystectomy same admission for gallstone pancreatitis if mild (NOT delayed)', nodeId: 'ap-cholecystectomy' },
  { text: 'Avoid early CT (<72h) unless uncertain diagnosis - CECT after 72h for necrosis assessment', nodeId: 'ap-imaging-timing' },
  { text: 'ICU for SIRS ≥2 criteria, organ failure, or BISAP ≥3', nodeId: 'ap-icu-admit' },
];

export const ACUTE_PANCREATITIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Tenner S, et al. American College of Gastroenterology Guideline: Management of Acute Pancreatitis. Am J Gastroenterol. 2024;119(3):419-437.' },
  { num: 2, text: 'Crockett SD, et al. American Gastroenterological Association Institute Guideline on Initial Management of Acute Pancreatitis. Gastroenterology. 2018;154(4):1096-1101.' },
  { num: 3, text: 'Banks PA, et al. Classification of acute pancreatitis—2012: revision of the Atlanta classification and definitions by international consensus. Gut. 2013;62(1):102-111.' },
  { num: 4, text: 'Wu BU, et al. The early prediction of mortality in acute pancreatitis: a large population-based study. Gut. 2008;57(12):1698-1703.' },
  { num: 5, text: 'de-Madaria E, et al. Aggressive or Moderate Fluid Resuscitation in Acute Pancreatitis. N Engl J Med. 2022;387(11):989-1000.' },
  { num: 6, text: 'Working Group IAP/APA Acute Pancreatitis Guidelines. IAP/APA evidence-based guidelines for the management of acute pancreatitis. Pancreatology. 2013;13(4 Suppl 2):e1-15.' },
  { num: 7, text: 'Mounzer R, et al. Comparison of existing clinical scoring systems to predict persistent organ failure in patients with acute pancreatitis. Gastroenterology. 2012;142(7):1476-1482.' },
  { num: 8, text: 'Petrov MS, et al. Enteral nutrition and the risk of mortality and infectious complications in patients with severe acute pancreatitis: a meta-analysis of randomized trials. Arch Surg. 2008;143(11):1111-1117.' },
  { num: 9, text: 'Malbrain ML, et al. Results from the International Conference of Experts on Intra-abdominal Hypertension and Abdominal Compartment Syndrome. Intensive Care Med. 2006;32(11):1722-1732.' },
  { num: 10, text: 'van Santvoort HC, et al. Early versus conservative management of acute biliary pancreatitis. N Engl J Med. 2007;357(2):96-106.' },
  { num: 11, text: 'Tse F, Yuan Y. Early routine endoscopic retrograde cholangiopancreatography strategy versus early conservative management strategy in acute gallstone pancreatitis. Cochrane Database Syst Rev. 2012;5:CD009779.' },
  { num: 12, text: 'da Costa DW, et al. Same-admission versus interval cholecystectomy for mild gallstone pancreatitis (PONCHO): a multicentre randomised controlled trial. Lancet. 2015;386(10000):1261-1268.' },
  { num: 13, text: 'Scherer J, et al. Issues in hypertriglyceridemic pancreatitis: an update. J Clin Gastroenterol. 2014;48(3):195-203.' },
  { num: 14, text: 'Elmunzer BJ, et al. A randomized trial of rectal indomethacin to prevent post-ERCP pancreatitis. N Engl J Med. 2012;366(15):1414-1422.' },
  { num: 15, text: 'Shimosegawa T, et al. International consensus diagnostic criteria for autoimmune pancreatitis: guidelines of the International Association of Pancreatology. Pancreas. 2011;40(3):352-358.' },
  { num: 16, text: 'Thoeni RF. The revised Atlanta classification of acute pancreatitis: its importance for the radiologist and its effect on treatment. Radiology. 2012;262(3):751-764.' },
  { num: 17, text: 'Varadarajulu S, et al. Equal efficacy of endoscopic and surgical cystogastrostomy for pancreatic pseudocyst drainage in a randomized trial. Gastroenterology. 2013;145(3):583-590.' },
  { num: 18, text: 'van Santvoort HC, et al. A step-up approach or open necrosectomy for necrotizing pancreatitis. N Engl J Med. 2010;362(16):1491-1502.' },
  { num: 19, text: 'Wittau M, et al. Systematic review and meta-analysis of antibiotic prophylaxis in severe acute pancreatitis. Scand J Gastroenterol. 2011;46(3):261-270.' },
  { num: 20, text: 'Hollemans RA, et al. Superiority of Step-up Approach vs Open Necrosectomy in Long-term Follow-up of Patients With Necrotizing Pancreatitis. Gastroenterology. 2019;156(4):1016-1026.' },
  { num: 21, text: 'van Brunschot S, et al. Endoscopic or surgical step-up approach for infected necrotising pancreatitis: a multicentre randomised trial (TENSION). Lancet. 2018;391(10115):51-58.' },
];
