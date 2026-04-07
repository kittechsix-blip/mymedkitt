// MedKitt — Sepsis Management
// Recognition → Resuscitation Bundle → Hemodynamic Management → Advanced Therapies → Monitoring → Disposition
// 6 modules: Recognition & Initial Assessment → Resuscitation Bundle → Hemodynamic Management → Advanced Therapies → Monitoring & De-escalation → Disposition
// 31 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const SEPSIS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'sepsis-start',
    type: 'question',
    module: 1,
    title: 'Sepsis — Initial Assessment',
    body: '[Sepsis Steps Summary](#/info/sepsis-summary)\n\n**Sepsis-3 Definition:** Life-threatening organ dysfunction caused by a dysregulated host response to infection. Clinically identified as suspected infection with **SOFA score increase ≥2**. [1]\n\n**Septic Shock:** Vasopressor requirement to maintain MAP ≥65 mmHg AND lactate >2 mmol/L despite adequate fluid resuscitation. Mortality ≥40%. [1][3]\n\n**Key Principle:** Early recognition → aggressive resuscitation → source control → antibiotics within 1 hour. [2][20]\n\n[CMS SEP-1 Bundle Requirements](#/info/sepsis-sep1-bundle)\n\nAssess hemodynamic status:',
    citation: [1, 2, 3, 20],
    calculatorLinks: [
      { id: 'qsofa', label: 'qSOFA Score' },
      { id: 'map-calculator', label: 'MAP Calculator' },
    ],
    options: [
      {
        label: 'Hemodynamically Stable',
        description: 'MAP ≥65 mmHg, no vasopressor need, adequate perfusion',
        next: 'sepsis-eval',
      },
      {
        label: 'Hypotensive / Shock',
        description: 'MAP <65, fluid-refractory, or lactate >4 mmol/L',
        next: 'sepsis-eval',
        urgency: 'urgent',
      },
      {
        label: 'Peri-Arrest / Crashing',
        description: 'Imminent cardiovascular collapse, severe acidemia',
        next: 'sepsis-airway',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'sepsis-eval',
    type: 'info',
    module: 1,
    title: 'Source Evaluation',
    body: '**Systematic source identification** — the most valuable method for source detection is a focused history and physical examination. [24][25]\n\n**Common sources of sepsis:** [23]\n• **Pneumonia** (~50%) — respiratory symptoms, CXR, lung POCUS\n• **Urosepsis** (~20%) — dysuria, flank pain, UA, urine culture\n• **Intra-abdominal** (~20%) — cholangitis, C. diff, appendicitis, perforation\n• **Skin/soft tissue** — cellulitis, necrotizing fasciitis, surgical site infection\n• **Endovascular** — line infection, endocarditis\n\n**Do not anchor on minor findings** (e.g., mild UTI or subtle infiltrate) without broader evaluation. Occult abdominal sepsis is common in elderly and diabetic patients. [24]\n\n[Sepsis Mimics & DDx](#/info/sepsis-mimics)',
    citation: [23, 24, 25],
    next: 'sepsis-labs',
  },

  {
    id: 'sepsis-labs',
    type: 'info',
    module: 1,
    title: 'Lab Workup & Cultures',
    body: '**Obtain within 45 minutes** (do NOT delay fluids or antibiotics): [2][24]\n\n**Routine labs:**\n• CBC with differential, BMP, LFTs, coagulation studies (INR, PTT)\n• **Serum lactate** — elevated >2 mmol/L indicates severity [2]\n• **Procalcitonin** — useful for guiding antibiotic de-escalation, NOT for initial diagnosis (pooled sensitivity only 77%) [24]\n• ABG/VBG — assess acid-base status\n\n**Microbiology (BEFORE antibiotics when possible):**\n• **2 sets blood cultures from 2 separate peripheral sites** [2]\n• Do NOT draw through indwelling lines (high false positive rate) [24]\n• Urinalysis and urine culture\n• Sputum gram stain and culture if intubated\n• Culture any suspected source (CSF, ascites, wound, joint)\n\n**Imaging:**\n• Chest radiograph\n• ECG\n• CT abdomen/pelvis if no definite source identified [23]\n• POCUS: cardiac function, IVC, lung, RUQ',
    citation: [2, 23, 24],
    next: 'sepsis-source-id',
  },

  {
    id: 'sepsis-source-id',
    type: 'question',
    module: 1,
    title: 'Suspected Source of Infection',
    body: '**Identify the most likely source** based on history, exam, and initial workup to guide empiric antibiotic selection.\n\n[Empiric Antibiotic Selection Table](#/info/sepsis-abx-table)',
    citation: [2, 24],
    options: [
      {
        label: 'Pulmonary (Pneumonia)',
        description: 'Cough, dyspnea, infiltrate on CXR',
        next: 'sepsis-abx-empiric',
      },
      {
        label: 'Urinary',
        description: 'Dysuria, flank pain, abnormal UA',
        next: 'sepsis-abx-empiric',
      },
      {
        label: 'Intra-Abdominal',
        description: 'Cholangitis, C. diff, perforation, appendicitis',
        next: 'sepsis-abx-empiric',
      },
      {
        label: 'Skin / Soft Tissue / Endovascular / Unknown',
        description: 'Cellulitis, necrotizing fasciitis, line infection, or no clear source',
        next: 'sepsis-abx-empiric',
      },
    ],
  },

  {
    id: 'sepsis-severity',
    type: 'question',
    module: 1,
    title: 'Classify Severity',
    body: '**Sepsis:** Suspected infection + organ dysfunction (SOFA ≥2 increase from baseline) [1]\n• Acute kidney injury, altered mentation, hypotension, tachypnea, coagulopathy, elevated lactate\n\n**Septic Shock:** Sepsis + vasopressor requirement to maintain MAP ≥65 mmHg + lactate >2 mmol/L despite adequate fluid resuscitation [1][3]\n• Mortality: sepsis ≥10%, septic shock ≥40%\n\n**CMS SEP-1 differs:** Defines septic shock as SBP <90 not responsive to fluids OR lactate ≥4 mmol/L regardless of hypotension [24]',
    citation: [1, 3, 24],
    options: [
      {
        label: 'Sepsis Without Shock',
        description: 'Infection + organ dysfunction, MAP maintained without vasopressors',
        next: 'sepsis-monitor',
      },
      {
        label: 'Septic Shock',
        description: 'Vasopressor-dependent or lactate >2 despite fluids',
        next: 'sepsis-vp-init',
        urgency: 'urgent',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: RESUSCITATION BUNDLE
  // =====================================================================

  {
    id: 'sepsis-airway',
    type: 'info',
    module: 2,
    title: 'Airway & Breathing Stabilization',
    body: '**Supplemental O₂** for all patients with hypoxia. Target SpO₂ 90-96%. [24]\n\n**Intubation indications:**\n• Airway protection (encephalopathy, depressed consciousness)\n• Refractory hypoxemia despite high-flow O₂\n• Respiratory failure / increased work of breathing\n• Facilitating procedures (source control)\n\n**Peri-intubation risks in sepsis:**\n• Hemodynamic collapse is common — **optimize MAP before intubation**\n• Push-dose [Phenylephrine](#/drug/phenylephrine/sepsis push dose) 100-200 mcg IV or start [Norepinephrine](#/drug/norepinephrine/septic shock) infusion first\n• Avoid prolonged apnea — use RSI with preoxygenation\n• Consider ketamine for induction (hemodynamically stable)\n\n**Note:** Pulse oximetry may overestimate SpO₂ in patients with darker skin pigmentation. [24]',
    citation: [24],
    treatment: {
      firstLine: {
        drug: 'Phenylephrine',
        dose: '100-200 mcg',
        route: 'IV push',
        frequency: 'q2-5 min PRN',
        duration: 'bridge to infusion',
        notes: 'Push-dose for peri-intubation hypotension',
      },
      alternative: {
        drug: 'Norepinephrine',
        dose: '0.05 mcg/kg/min',
        route: 'IV',
        frequency: 'continuous',
        duration: 'titrate to MAP ≥65',
        notes: 'Start infusion before intubation if time permits',
      },
      monitoring: 'MAP target ≥65 mmHg before and during intubation. Have push-dose pressors drawn and ready.',
    },
    next: 'sepsis-fluids',
  },

  {
    id: 'sepsis-fluids',
    type: 'info',
    module: 2,
    title: 'IV Fluid Resuscitation',
    body: '**30 mL/kg IV crystalloid** — start within 1 hour, complete within 3 hours [2][24]\n\n**Fluid choice:** Balanced crystalloid preferred (Lactated Ringer\'s) [24]\n• SMART trial: lower composite of death, new RRT, and persistent renal dysfunction vs 0.9% NaCl [24]\n• **Avoid HES** — 6S trial: increased mortality (51 vs 43%) and RRT (22 vs 16%) [10]\n• **No benefit to albumin** vs crystalloid (SAFE trial) [24]\n\n**Administration:** Boluses of 500 mL, reassess between each [24]\n• Stop if pulmonary edema develops or no further response\n\n**Special populations:**\n• **Obesity (BMI >30):** Use ideal body weight for calculation [24]\n• **Heart failure / ESRD:** Smaller initial bolus acceptable — CMS allows <30 mL/kg if documented [24]\n• **Pneumonia with mild hypotension:** Fluid-conservative approach + early vasopressors may be better [23]\n\n**After initial resuscitation:** Restrict further fluids — most IV crystalloid extravasates (~95% leaves vasculature). [23]\n\n[Fluid Resuscitation Guide](#/info/sepsis-fluid-guide)',
    citation: [2, 8, 9, 10, 23, 24],
    treatment: {
      firstLine: {
        drug: 'Lactated Ringer\'s',
        dose: '30 mL/kg',
        route: 'IV',
        frequency: '500 mL boluses',
        duration: 'within 3 hours',
        notes: 'Balanced crystalloid preferred per SMART trial',
      },
      alternative: {
        drug: '0.9% NaCl',
        dose: '30 mL/kg',
        route: 'IV',
        frequency: '500 mL boluses',
        duration: 'within 3 hours',
        notes: 'Use if LR unavailable. Avoid HES (increased mortality).',
      },
      monitoring: 'Reassess between boluses. Stop if pulmonary edema develops. Use IBW for obese patients.',
    },
    next: 'sepsis-abx-empiric',
  },

  {
    id: 'sepsis-abx-empiric',
    type: 'question',
    module: 2,
    title: 'Empiric Antibiotic Selection',
    body: '**Administer within 1 hour** of sepsis recognition. Each hour of delay increases mortality. [2][20]\n\n**Beta-lactam FIRST** when also giving vancomycin (improved survival). [24]\n\n**Beta-lactam backbone** (choose one): [23][24]\n• [Piperacillin-Tazobactam](#/drug/piperacillin-tazobactam/sepsis empiric) 4.5g IV q6h (extended infusion 4h) — broadest anaerobic coverage\n• [Cefepime](#/drug/cefepime/sepsis empiric) 2g IV q8h — antipseudomonal, less anaerobic coverage\n• [Meropenem](#/drug/meropenem/sepsis empiric) 1g IV q8h — reserve for MDR risk or severe PCN allergy\n\n**Add atypical coverage for CAP:**\n• [Doxycycline](#/drug/doxycycline/CAP atypical) 100 mg IV q12h (preferred) OR [Azithromycin](#/drug/azithromycin/CAP atypical) 500 mg IV [23]\n\n**C. difficile:** Oral vancomycin 125 mg QID +/- IV [Metronidazole](#/drug/metronidazole/C. difficile) 500 mg q8h [23]\n\n[Empiric Antibiotic Selection Table](#/info/sepsis-abx-table)\n\nDoes the patient need **MRSA coverage**?',
    citation: [2, 20, 23, 24],
    options: [
      {
        label: 'Yes — MRSA Risk Factors Present',
        description: 'Soft tissue infection, line infection, HD, IVDU, recent hospitalization, MRSA history',
        next: 'sepsis-mrsa',
      },
      {
        label: 'No — Low MRSA Risk',
        description: 'Community-acquired, no risk factors, no purulence',
        next: 'sepsis-source-ctrl',
      },
    ],
  },

  {
    id: 'sepsis-mrsa',
    type: 'info',
    module: 2,
    title: 'MRSA Coverage',
    body: '**MRSA risk factors:** [24]\n• Soft tissue infection (especially abscesses)\n• Central line infection / hemodialysis\n• Recent hospitalization or long-term care\n• IV drug use\n• Known MRSA colonization\n• Nosocomial / surgical site infection\n\n**First-line:** [Vancomycin](#/drug/vancomycin/sepsis MRSA) 25-30 mg/kg IV loading dose, then 15-20 mg/kg q8-12h [24]\n• Administer AFTER beta-lactam (beta-lactam first improves survival) [24]\n\n**Alternatives if vancomycin contraindicated:**\n• [Linezolid](#/drug/linezolid/MRSA sepsis) 600 mg IV q12h — covers MRSA pneumonia (unlike daptomycin)\n• [Daptomycin](#/drug/daptomycin/MRSA bacteremia) 6-10 mg/kg IV q24h — for bacteremia/endocarditis, **NOT for pneumonia** (inactivated by pulmonary surfactant) [24]\n\n**De-escalate:** Discontinue vancomycin if no MRSA cultured within 48 hours [24]',
    citation: [24],
    treatment: {
      firstLine: {
        drug: 'Vancomycin',
        dose: '25-30 mg/kg load, then 15-20 mg/kg',
        route: 'IV',
        frequency: 'q8-12h',
        duration: 'D/C if no MRSA at 48h',
        notes: 'Give AFTER beta-lactam',
      },
      alternative: {
        drug: 'Linezolid',
        dose: '600 mg',
        route: 'IV',
        frequency: 'q12h',
        duration: 'per culture',
        notes: 'For MRSA pneumonia if vancomycin contraindicated',
      },
      monitoring: 'Vancomycin trough 15-20 mcg/mL. D/C if no MRSA cultured within 48h.',
    },
    next: 'sepsis-source-ctrl',
  },

  {
    id: 'sepsis-source-ctrl',
    type: 'info',
    module: 2,
    title: 'Source Control',
    body: '**Source control within 6-12 hours** when feasible — undrained foci may not respond to antibiotics alone. [2][24]\n\n**Interventions by source:**\n• **Intravascular catheter infection:** Remove catheter after establishing alternative access\n• **Abscess:** Percutaneous or surgical drainage (including thoracic empyema, joint)\n• **Ascending cholangitis:** ERCP or percutaneous decompression\n• **Nephrolithiasis with obstruction:** Percutaneous nephrostomy or ureteral stent\n• **Bowel perforation/obstruction:** Surgical repair\n• **Necrotizing fasciitis:** Emergent surgical debridement\n• **Fulminant C. diff:** Colectomy\n• **Infected hardware:** Removal when feasible\n\n**Timing:** As soon as possible, but balance risk of intervention vs. patient stability [24]\n\n[Source Control Guide](#/info/sepsis-source-control)',
    citation: [2, 24],
    next: 'sepsis-reassess',
  },

  {
    id: 'sepsis-reassess',
    type: 'question',
    module: 2,
    title: '1-3 Hour Reassessment',
    body: '**After initial fluid bolus and antibiotics, reassess:**\n\n• **MAP:** Target ≥65 mmHg\n• **Perfusion:** Capillary refill time <3 seconds, skin color, mentation\n• **Urine output:** Target ≥0.5 mL/kg/hr\n• **Lactate:** Repeat if initial >2 mmol/L — trending toward normalization?\n\n**Fluid responsive?** Assess with dynamic measures: passive leg raise, IVC variability, pulse pressure variation [24]\n\nIs the patient responding to initial resuscitation?',
    citation: [2, 24],
    options: [
      {
        label: 'Responding — Improving',
        description: 'MAP ≥65, perfusion improving, lactate trending down',
        next: 'sepsis-severity',
      },
      {
        label: 'Not Responding — Persistent Hypoperfusion',
        description: 'MAP <65 despite fluids, rising lactate, poor perfusion',
        next: 'sepsis-vp-init',
        urgency: 'urgent',
      },
    ],
  },

  // =====================================================================
  // MODULE 3: HEMODYNAMIC MANAGEMENT
  // =====================================================================

  {
    id: 'sepsis-vp-init',
    type: 'info',
    module: 3,
    title: 'Vasopressor Initiation — Norepinephrine',
    body: '**[Norepinephrine](#/drug/norepinephrine/septic shock)** is the **first-line vasopressor** for septic shock. [2][11][24]\n\n**Dosing:** Start 0.05 mcg/kg/min (4-6 mcg/min), titrate by 0.02-0.05 mcg/kg/min to MAP ≥65 mmHg [24]\n\n**Mechanism:** Predominantly alpha-1 agonist (vasoconstriction) with some beta-1 (supports cardiac function). Reduces endothelial permeability. [23]\n\n**Can start peripherally** for <6 hours while obtaining central access (SSC 2021). [2][24]\n\n**Why NOT dopamine?** SOAP-II trial (n=1679): dopamine associated with **increased arrhythmias and mortality** vs norepinephrine. [11]\n\n**MAP target:** ≥65 mmHg initially. [2]\n• 65-Trial: MAP goal >60 mmHg safe in elderly patients [18]\n• SEPSISPAM: MAP 80-85 improved renal outcomes in chronic HTN but increased AF [19]\n\n**Diastolic BP <40 mmHg** strongly suggests vasoplegia — start vasopressor immediately. [23]\n\n[Vasopressor Comparison](#/info/sepsis-vp-comparison)',
    citation: [2, 11, 18, 19, 23, 24],
    treatment: {
      firstLine: {
        drug: 'Norepinephrine',
        dose: '0.05 mcg/kg/min',
        route: 'IV',
        frequency: 'continuous',
        duration: 'titrate to MAP ≥65',
        notes: 'Start 4-6 mcg/min, titrate by 0.02-0.05 mcg/kg/min',
      },
      alternative: {
        drug: 'Epinephrine',
        dose: '0.01-0.5 mcg/kg/min',
        route: 'IV',
        frequency: 'continuous',
        duration: 'titrate to MAP ≥65',
        notes: 'Alternative first-line for bradycardia or cardiac dysfunction',
      },
      monitoring: 'MAP target ≥65 mmHg. Can start peripherally for <6 hours while obtaining central access.',
    },
    next: 'sepsis-vp-second',
  },

  {
    id: 'sepsis-vp-second',
    type: 'question',
    module: 3,
    title: 'Second-Line Vasopressor Selection',
    body: '**If norepinephrine alone is insufficient**, add a second agent: [2][24]\n\n**[Vasopressin](#/drug/vasopressin/septic shock)** 0.03-0.04 units/min (fixed dose, non-titratable)\n• Reduces NE requirement, **lower AF risk** (RR 0.77) [24]\n• VASST + VANISH trials: no mortality benefit but NE-sparing [12][13]\n• Best as early second agent — add before escalating NE to high doses [23]\n\n**[Epinephrine](#/drug/epinephrine/septic shock infusion)** 0.01-0.5 mcg/kg/min\n• Alternative first-line for bradycardia or cardiac dysfunction [23]\n• CAT trial: outcomes similar to norepinephrine [23]\n• **Increases lactate** — rising lactate on epi is expected and often a positive prognostic sign [23]\n\nWhat is the clinical scenario?',
    citation: [2, 12, 13, 23, 24],
    treatment: {
      firstLine: {
        drug: 'Vasopressin',
        dose: '0.03-0.04 units/min',
        route: 'IV',
        frequency: 'continuous (fixed)',
        duration: 'non-titratable',
        notes: 'Add early before escalating NE to high doses. Reduces AF risk.',
      },
      alternative: {
        drug: 'Epinephrine',
        dose: '0.01-0.5 mcg/kg/min',
        route: 'IV',
        frequency: 'continuous',
        duration: 'titrate to MAP ≥65',
        notes: 'Preferred for bradycardia or cardiac dysfunction. Increases lactate (expected).',
      },
      monitoring: 'MAP target ≥65 mmHg. Vasopressin is NE-sparing but no mortality benefit (VASST, VANISH).',
    },
    options: [
      {
        label: 'Vasodilatory Shock — Add Vasopressin',
        description: 'Wide pulse pressure, warm extremities, low DBP, adequate HR',
        next: 'sepsis-map-target',
      },
      {
        label: 'Low Cardiac Output / Bradycardia',
        description: 'Narrow pulse pressure, cool extremities, HR inappropriately low',
        next: 'sepsis-inotrope',
      },
      {
        label: 'Refractory to Multiple Agents',
        description: 'On high-dose NE +/- vasopressin, still hypotensive',
        next: 'sepsis-refractory',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'sepsis-map-target',
    type: 'info',
    module: 3,
    title: 'MAP Targets & Personalization',
    body: '**Default MAP target:** ≥65 mmHg (SSC 2021) [2]\n\n**Personalized targets:** [23]\n• **Chronic hypertension:** Consider MAP 80-85 mmHg (SEPSISPAM: improved renal outcomes but more AF) [19]\n• **Younger / previously normotensive:** MAP 60-65 may be sufficient (65-Trial) [18]\n• **Elevated CVP or IAP:** Higher MAP may be needed to maintain organ perfusion gradient [23]\n\n**Capillary Refill Time (CRT)** — emerging perfusion target: [16][17]\n• Normal CRT <3 seconds suggests adequate perfusion\n• ANDROMEDA-SHOCK: CRT-guided resuscitation ≥ lactate-guided (improved SOFA at 72h) [16]\n• ANDROMEDA-SHOCK-2: CRT protocol reduced duration of vital organ support by 5% vs usual care [17]\n\n**Vasopressor reduction challenge** (IBCC approach): [23]\n• If on dual vasopressors (NE + vasopressin), consider down-titrating to assess for excessive vasoconstriction\n• Target MAP 60-70 for 1 hour → reassess perfusion\n• Systolic HF patients may benefit from reduced afterload',
    citation: [2, 16, 17, 18, 19, 23],
    next: 'sepsis-fluid-assess',
  },

  {
    id: 'sepsis-fluid-assess',
    type: 'info',
    module: 3,
    title: 'Fluid Responsiveness Assessment',
    body: '**After initial resuscitation, RESTRICT further fluids** — ongoing crystalloid is often harmful. [9][23]\n\n**CLASSIC trial:** Restrictive fluid strategy safe, trend toward less intubation [9]\n• CLASSIC criteria for additional fluid: lactate >4, MAP <50 despite vasopressors, mottling beyond kneecap, UOP <0.1 mL/kg/hr for 2h, or ongoing overt losses [23]\n\n**Dynamic measures** (preferred over static CVP): [24]\n• Passive leg raise with stroke volume measurement (most accurate and broadly available)\n• Respirophasic IVC variation (requires passive ventilation, sinus rhythm)\n• Pulse pressure variation\n• Lung POCUS for B-lines (fluid overload)\n\n**Key concept:** Fluid responsiveness is **NORMAL** — it does not necessarily mean the patient needs fluid. **Absence** of fluid responsiveness is pathological and suggests volume overload. [23]\n\n**Track net fluid balance** — avoid >4-5L net positive in absence of marked hypovolemia. [23]\n\n**Fluid selection if more needed:** LR preferred. If bicarb indicated (pH <7.2, renal failure), use isotonic bicarbonate (150 mEq NaHCO₃ in 1L D5W). [23]',
    citation: [9, 23, 24],
    next: 'sepsis-inotrope',
  },

  {
    id: 'sepsis-inotrope',
    type: 'info',
    module: 3,
    title: 'Inotrope Consideration',
    body: '**Consider inotropes for septic cardiomyopathy or low cardiac output despite adequate vasopressors.** [24]\n\n**POCUS assessment:** Reduced LVEF, global hypokinesis, elevated E/e\'. [23]\n\n**Clues suggesting need for inotropy:** [23]\n• Pulse pressure <40 mmHg (suggests low stroke volume)\n• Cool extremities despite adequate MAP\n• Heart rate inappropriately low (<80 bpm) for shock\n• Inappropriately normal lactate (suggests low endogenous epinephrine)\n\n**[Dobutamine](#/drug/dobutamine/septic shock inotrope)** 2-5 mcg/kg/min, titrate to max 20 mcg/kg/min [24]\n• First-choice inotrope\n• Beta-1 agonist — increases contractility\n• May cause hypotension (reflex vasodilation) — up-titrate NE if BP drops [23]\n\n**Epinephrine challenge** (alternative): [23]\n• Start 4-5 mcg/min, down-titrate NE if BP rises\n• Preferred when BP is low or lactate is low (<4 mM)\n• Avoid if lactate >5 mM (worsens acidosis)\n\n**Do NOT use inotropes to increase cardiac index to supranormal levels.** [24]\n\n[Septic Cardiomyopathy](#/info/sepsis-cardiomyopathy)',
    citation: [23, 24],
    treatment: {
      firstLine: {
        drug: 'Dobutamine',
        dose: '2-5 mcg/kg/min',
        route: 'IV',
        frequency: 'continuous',
        duration: 'titrate to max 20 mcg/kg/min',
        notes: 'First-choice inotrope. May cause hypotension; up-titrate NE if BP drops.',
      },
      alternative: {
        drug: 'Epinephrine',
        dose: '4-5 mcg/min',
        route: 'IV',
        frequency: 'continuous',
        duration: 'titrate, down-titrate NE if BP rises',
        notes: 'Preferred when BP is low or lactate <4 mM. Avoid if lactate >5 mM.',
      },
      monitoring: 'Do NOT use inotropes to increase cardiac index to supranormal levels. POCUS to assess response.',
    },
    next: 'sepsis-refractory',
  },

  {
    id: 'sepsis-refractory',
    type: 'question',
    module: 3,
    title: 'Refractory Shock',
    body: '**If shock persists despite fluids + norepinephrine + vasopressin +/- inotrope:** [23]\n\n**Reassess for:**\n• Missed or inadequately treated source of infection\n• Incorrect diagnosis (sepsis mimics — adrenal crisis, thyroid storm, PE, hemorrhage)\n• Inadequate antibiotic coverage\n• Undrained abscess or infected hardware\n• Pneumothorax from central line placement\n• Septic cardiomyopathy\n\n**[Methylene Blue](#/drug/methylene-blue/refractory septic shock)** — salvage vasopressor [21][23]\n• 1-2 mg/kg IV bolus, then 0.5 mg/kg/h infusion\n• Ibarra-Estrada 2023 RCT: shorter time to vasopressor discontinuation, more vasopressor-free days [21]\n• Inhibits NO synthase → restores vascular tone\n• Consider when on multiple vasopressors + glucocorticoids [23]\n\n**Corticosteroids** if not yet started → [24]\n\nIs the patient on stress-dose steroids?',
    citation: [21, 23, 24],
    treatment: {
      firstLine: {
        drug: 'Methylene Blue',
        dose: '1-2 mg/kg bolus, then 0.5 mg/kg/h',
        route: 'IV',
        frequency: 'bolus then continuous',
        duration: 'until vasopressor weaned',
        notes: 'Salvage vasopressor. Inhibits NO synthase to restore vascular tone.',
      },
      monitoring: 'Consider when on multiple vasopressors + glucocorticoids. Ibarra-Estrada 2023: shorter time to vasopressor discontinuation.',
    },
    options: [
      {
        label: 'No — Start Corticosteroids',
        next: 'sepsis-steroids',
        urgency: 'urgent',
      },
      {
        label: 'Already on Steroids — Other Interventions',
        description: 'Consider methylene blue, ECMO, reassess diagnosis',
        next: 'sepsis-mimics-node',
      },
    ],
  },

  // =====================================================================
  // MODULE 4: ADVANCED THERAPIES
  // =====================================================================

  {
    id: 'sepsis-steroids',
    type: 'info',
    module: 4,
    title: 'Corticosteroid Therapy',
    body: '**For patients on vasopressors for septic shock:** [2][14][15]\n\n**[Hydrocortisone](#/drug/hydrocortisone/septic shock)** 50 mg IV q6h OR 200 mg/day continuous infusion [2]\n\n**Evidence:**\n• **ADRENAL trial** (n=3658): Steroids reduce time on vasopressors, ICU LOS, and duration of intubation. No increase in superinfection. [14]\n• **APROCCHSS trial** (n=1241): Hydrocortisone + [Fludrocortisone](#/drug/fludrocortisone/septic shock) 50 mcg PO daily × 7 days reduced 90-day mortality (43% vs 49.1%) [15]\n• Meta-analyses confirm: shorter shock duration, earlier vasopressor weaning. Mortality benefit debated but possible if started early in sickest patients. [14][15]\n\n**Risks:**\n• Hyperglycemia (monitor and treat)\n• Steroid myopathy risk in paralyzed patients\n• No increased superinfection risk (debunked by ADRENAL) [14]\n\n**Timing:** Consider early initiation — antibiotics can trigger Jarisch-Herxheimer reaction; front-loaded steroids may blunt this. [23]\n\n**Taper:** When vasopressors discontinued, taper over 2-3 days (do not stop abruptly).',
    citation: [2, 14, 15, 23],
    treatment: {
      firstLine: {
        drug: 'Hydrocortisone',
        dose: '50 mg',
        route: 'IV',
        frequency: 'q6h',
        duration: 'until off vasopressors, then taper',
        notes: 'OR 200 mg/day continuous infusion',
      },
      alternative: {
        drug: 'Fludrocortisone',
        dose: '50 mcg',
        route: 'PO',
        frequency: 'daily',
        duration: '7 days',
        notes: 'Add to hydrocortisone per APROCCHSS protocol',
      },
      monitoring: 'Monitor glucose. Taper over 2-3 days when vasopressors discontinued.',
    },
    next: 'sepsis-cardiomyop',
  },

  {
    id: 'sepsis-cardiomyop',
    type: 'info',
    module: 4,
    title: 'Septic Cardiomyopathy',
    body: '**Occurs in up to 50% of septic shock patients.** [23]\n\n**Features:**\n• Acute, biventricular myocardial dysfunction\n• **Reversible** within 7-10 days\n• Systemic vasodilation may mask low EF (pseudo-normal LVEF)\n• Low cardiac output with vasopressor-refractory shock\n\n**Diagnosis:** [23]\n• POCUS: LVEF <45%, reduced GLS (<-17%), MAPSE reduction\n• Lateral e\' <8 cm/s strongly predicts mortality\n• Lateral E/e\' >13 cm/s suggests elevated LVEDP\n• Troponin: usually mildly elevated\n• RV dysfunction: TAPSE <16 mm, RV/LV >0.6\n\n**Management:** [23]\n• Avoid excessive vasoconstrictors (NE + vasopressin without inotropy is suboptimal)\n• Inotrope: [Dobutamine](#/drug/dobutamine/septic shock inotrope) or epinephrine\n• Stress-dose steroids (cytokines worsen cardiomyopathy)\n• Treat fever, agitation, shivering (reduce O₂ demand)\n• Thiamine if deficiency possible\n• Fluid removal if congested\n• Consider ECMO for pure cardiogenic failure phenotype\n\n[Septic Cardiomyopathy Details](#/info/sepsis-cardiomyopathy)',
    citation: [23],
    next: 'sepsis-transfusion',
  },

  {
    id: 'sepsis-transfusion',
    type: 'info',
    module: 4,
    title: 'Blood Transfusion Thresholds',
    body: '**Restrictive transfusion strategy:** Transfuse for **Hgb ≤7 g/dL** [2][22][24]\n\n**Evidence:** [22][24]\n• **TRISS trial** (n=998): No difference in 28-day mortality between restrictive (Hgb ≤7) vs liberal (Hgb ≤9) strategies in septic shock\n• Restrictive strategy resulted in 50% fewer transfusions with no increase in ischemic events [22]\n\n**Exceptions (consider higher threshold):**\n• Active hemorrhagic shock\n• Acute myocardial ischemia\n• Severe hypoxemia not improving with O₂\n\n**Do NOT transfuse to supranormal hematocrit** — the original EGDT protocol targeted Hct >30, but subsequent trials (ProCESS, ARISE, ProMISE) showed no benefit. [4][5][6][7]',
    citation: [2, 4, 5, 6, 7, 22, 24],
    next: 'sepsis-mimics-node',
  },

  {
    id: 'sepsis-mimics-node',
    type: 'info',
    module: 4,
    title: 'Sepsis Mimics',
    body: '**If the patient is not responding to treatment, reconsider the diagnosis.** Suspect a mimic if: no clear infectious source, procalcitonin unexpectedly low, or atypical course. [23]\n\n**Infectious mimics:**\n• Endocarditis causing valve failure (check echo)\n• Tick-borne illness (anaplasmosis, babesiosis)\n• Invasive candidiasis / aspergillosis (beta-D-glucan, galactomannan)\n• PJP pneumonia (diffuse infiltrates, immunosuppression)\n\n**Endocrine mimics:**\n• [Adrenal crisis](#/tree/adrenal-insufficiency) — vasopressor-refractory, eosinophilia, recent steroid d/c\n• [Thyroid storm](#/tree/thyroid) — tremors, thyromegaly, tachycardia, encephalopathy\n• DKA — hyperglycemia, anion gap (may coexist with sepsis)\n\n**GI mimics:**\n• Mesenteric ischemia — AF, pain out of proportion\n• Pancreatitis, fulminant hepatic failure, decompensated cirrhosis\n\n**Toxicological:** Salicylate intoxication, beta-blocker/CCB overdose, carbon monoxide\n\n**Other:** Anaphylaxis, HLH (ferritin, cytopenias), DRESS/AGEP\n\n[Sepsis Mimics & DDx](#/info/sepsis-mimics)',
    citation: [23],
    next: 'sepsis-special',
  },

  {
    id: 'sepsis-special',
    type: 'info',
    module: 4,
    title: 'Special Populations',
    body: '**Pregnancy:** [24]\n• Same resuscitation principles apply\n• Physiologic changes (lower BP, higher HR, lower platelets) make recognition harder\n• Higher risk for pneumonia and genitourinary infections\n• Left lateral decubitus positioning after 20 weeks\n• Fetal monitoring when feasible\n\n**Elderly / Frail:** [24]\n• Higher mortality, impaired immune/cardiovascular response\n• 65-Trial: MAP target >60 mmHg safe and may reduce vasopressor exposure [18]\n\n**Cirrhosis:** [23]\n• Baseline hypotension, thrombocytopenia, impaired lactate clearance\n• Higher MAP targets may improve hepatorenal physiology\n• Do not dismiss abnormalities as "baseline"\n\n**End-Stage Renal Disease:** [24]\n• Bacteremia common from intravascular devices\n• **Same initial fluid boluses recommended** despite dialysis status\n• Frequent fluid shifts may limit physiologic response\n\n**Immunosuppressed:**\n• Broader empiric coverage (consider fungal, PJP, atypical organisms)\n• Lower threshold for CT imaging and invasive diagnostics',
    citation: [18, 23, 24],
    next: 'sepsis-monitor',
  },

  // =====================================================================
  // MODULE 5: MONITORING & DE-ESCALATION
  // =====================================================================

  {
    id: 'sepsis-monitor',
    type: 'info',
    module: 5,
    title: 'Resuscitation Endpoints',
    body: '**Clinical targets (follow continuously):** [2][24]\n• **MAP ≥65 mmHg** (individualize within 60-70 range)\n• **Urine output ≥0.5 mL/kg/hr** — good UOP is reassuring; low UOP is nonspecific (may be ATN)\n• **Capillary refill time <3 seconds** (ANDROMEDA-SHOCK-2: improved composite outcome) [17]\n• **Perfusion index >1.4-2%** from pulse oximetry (emerging target) [23]\n• **Mentation** improving\n• **Heart rate** — mild tachycardia is appropriate; excessive tachycardia (>140) is harmful\n\n**Laboratory (q6h until improving):** [24]\n• **Serum lactate** — trend toward normalization. Stop checking once clearly falling. [23]\n• Routine labs: platelets, creatinine, LFTs, coagulation\n• Follow-up cultures\n\n**Hemodynamic monitoring:** [24]\n• Dynamic fluid responsiveness preferred over static CVP\n• Arterial line: NOT always necessary (2025 RCT: similar outcomes without arterial catheter) [24]\n• PAC: NOT recommended routinely [24]\n\n**Key insight:** Lactate is NOT an indicator of perfusion or anaerobic metabolism — it is primarily an index of endogenous epinephrine production. Use perfusion targets (CRT, skin, UOP) over lactate targets. [23]',
    citation: [2, 17, 23, 24],
    next: 'sepsis-respond',
  },

  {
    id: 'sepsis-respond',
    type: 'question',
    module: 5,
    title: 'Treatment Response Assessment',
    body: '**Most patients respond within 6-24 hours.** Resolution may take days to weeks. [24]\n\n**Signs of improvement:**\n• MAP stable on stable or decreasing vasopressors\n• Lactate declining\n• Urine output adequate\n• Mentation improving\n• CRT normalizing (<3 seconds)\n\n**Signs of failure:**\n• Escalating vasopressor requirements\n• Rising lactate (reassess diagnosis, source control, antibiotic adequacy)\n• New organ dysfunction\n• Worsening acidosis',
    citation: [24],
    options: [
      {
        label: 'Improving — Begin De-escalation',
        description: 'Stable or improving hemodynamics, declining lactate',
        next: 'sepsis-deesc-abx',
      },
      {
        label: 'Not Improving — Reassess',
        description: 'Worsening or static despite treatment',
        next: 'sepsis-refractory',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'sepsis-deesc-abx',
    type: 'info',
    module: 5,
    title: 'Antibiotic De-escalation',
    body: '**Assess daily for de-escalation opportunity.** [24]\n\n**Narrowing (48-72 hours):** [24]\n• When culture and susceptibility results return, narrow to pathogen-directed therapy\n• If no MRSA cultured within 48h → discontinue vancomycin\n• If no pathogen identified (~50% of cases) → use clinical judgment + fixed course of broad-spectrum (3-5 days)\n\n**Duration:** Typically **5-7 days** [24]\n• Longer for: S. aureus bacteremia, endocarditis, osteomyelitis, deep fungal infection, undrained abscess, resistant pathogens, neutropenia\n• Shorter may be appropriate: pyelonephritis with rapid source control, peritonitis with rapid resolution\n\n**Procalcitonin for de-escalation:** [24]\n• Best evidence for guiding discontinuation in **pneumonia and respiratory infections**\n• Meta-analyses: ~1 day shorter antibiotic duration, no mortality benefit or harm\n• NOT recommended for initial diagnosis (sensitivity too low at 77%)\n\n**Extended infusion for beta-lactams** is recommended for maintenance dosing. [23]',
    citation: [23, 24],
    next: 'sepsis-deesc-fluid',
  },

  {
    id: 'sepsis-deesc-fluid',
    type: 'info',
    module: 5,
    title: 'Fluid & Vasopressor Weaning',
    body: '**Once hemodynamic targets met (usually hours to 1-2 days):** [24]\n\n**Fluid de-escalation:**\n• Reduce rate or stop IV fluids\n• Consider diuretics if fluid overloaded\n• Monitor for cardiogenic and noncardiogenic pulmonary edema (ARDS)\n• Restrictive approach decreases duration of mechanical ventilation and ICU stay [24]\n\n**Vasopressor weaning:** [23]\n• Down-titrate as tolerated — target lowest effective dose\n• If on vasopressin + norepinephrine: wean norepinephrine first (vasopressin has more consistent receptor effects at low doses)\n• Vasopressor reduction challenge: target MAP 60-70 for 1 hour → if perfusion stable, continue lower target\n\n**Steroid taper:** When vasopressors discontinued, taper hydrocortisone over 2-3 days. Do not stop abruptly.\n\n**Key insight:** ICU patients receive ~1.5L/day from infusions and antibiotics alone. Adding enteral nutrition brings this to >2-3L/day. Additional crystalloid boluses are rarely needed after initial resuscitation. [23]',
    citation: [23, 24],
    next: 'sepsis-dispo-icu',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'sepsis-dispo-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission Criteria',
    body: '**ICU admission indicated for:** [24]\n• Vasopressor requirement\n• Mechanical ventilation\n• Multiple organ dysfunction\n• Lactate ≥4 mmol/L despite resuscitation\n• Escalating hemodynamic instability\n• Need for continuous renal replacement therapy\n• Anticipated source control requiring close monitoring\n\n**Risk factors for progression to shock** (consider ICU consultation): [24]\n• Intermittent hypotension\n• Lactate 2-4 mmol/L with incomplete clearance\n• Multiple organ involvement\n• Immunocompromised host',
    recommendation: 'Admit to ICU for vasopressor-dependent septic shock, mechanical ventilation, or multiorgan dysfunction. Low threshold for ICU consultation when risk factors for deterioration are present.',
    confidence: 'definitive',
    citation: [24],
  },

  {
    id: 'sepsis-dispo-floor',
    type: 'result',
    module: 6,
    title: 'Floor Admission',
    body: '**Floor admission appropriate when:**\n• Sepsis without shock\n• Responding to initial fluid resuscitation\n• No vasopressor requirement\n• Source identified and controlled (or being addressed)\n• Stable on oral or IV antibiotics\n• Lactate trending toward normal\n• Adequate mentation and organ function\n\n**Continue monitoring:**\n• Vital signs q4-6h\n• Daily labs (CBC, BMP, lactate if indicated)\n• Antibiotic de-escalation at 48-72h\n• Procalcitonin trending for pneumonia\n• Low threshold for ICU transfer if deterioration',
    recommendation: 'Admit to monitored floor bed for sepsis without shock that is responding to initial resuscitation. Continue antibiotics, monitor closely, and plan for de-escalation.',
    confidence: 'recommended',
    citation: [2, 24],
  },

  {
    id: 'sepsis-dispo-obs',
    type: 'result',
    module: 6,
    title: 'Observation / ED Observation',
    body: '**ED observation may be appropriate for:**\n• Low-risk sepsis (e.g., young, no comorbidities, single organ involvement)\n• Rapid response to 1-2L IV fluids\n• Lactate normalizing (<2 mmol/L on repeat)\n• Source identified and treatable (e.g., uncomplicated pyelonephritis)\n• Reliable follow-up within 24-48 hours\n• Normal mentation\n• No vasopressor requirement at any point\n\n**Ensure before discharge:**\n• Source identified\n• Appropriate oral antibiotic prescribed\n• Return precautions reviewed\n• Close follow-up arranged',
    recommendation: 'Consider ED observation for low-risk sepsis with rapid response to resuscitation, normalizing lactate, and reliable follow-up.',
    confidence: 'recommended',
    citation: [2],
  },

  {
    id: 'sepsis-post-care',
    type: 'info',
    module: 6,
    title: 'Post-Sepsis Care (PICS)',
    body: '**Post-Intensive Care Syndrome (PICS):** Increasingly recognized health burden after sepsis. Significant overlap with "long COVID." [24]\n\n**Domains affected:**\n• **Physical:** Weakness, fatigue, reduced functional capacity\n• **Cognitive:** Memory impairment, difficulty concentrating, executive dysfunction\n• **Psychological:** Depression, anxiety, PTSD\n\n**Incidence:** Up to 50% of ICU sepsis survivors experience long-term impairment.\n\n**ED relevance:**\n• Sepsis is a leading cause of 30-day hospital readmissions [24]\n• Readmission costs exceed those for MI, CHF, COPD, and pneumonia [24]\n\n**Before discharge, address:**\n• Medication reconciliation (stop empiric antibiotics, restart home meds)\n• Rehabilitation referral if prolonged ICU stay\n• Follow-up clinic appointment (PCP + relevant specialists)\n• Patient education about post-sepsis symptoms\n• Goals of care discussion if appropriate',
    citation: [24],
  },
];

// =====================================================================
// MODULE LABELS
// =====================================================================

export const SEPSIS_MODULE_LABELS = [
  'Recognition & Initial Assessment',
  'Resuscitation Bundle',
  'Hemodynamic Management',
  'Advanced Therapies',
  'Monitoring & De-escalation',
  'Disposition',
];

export const SEPSIS_NODE_COUNT = 31;

// =====================================================================
// CITATIONS
// =====================================================================

export const SEPSIS_CRITICAL_ACTIONS = [
  { text: 'Antibiotics within 1 hour of recognition - each hour delay increases mortality', nodeId: 'sepsis-abx-empiric' },
  { text: '30 mL/kg IV crystalloid (LR preferred) within 3 hours - give 500 mL boluses, reassess', nodeId: 'sepsis-fluids' },
  { text: 'Give beta-lactam FIRST when also giving vancomycin (improved survival)', nodeId: 'sepsis-abx-empiric' },
  { text: 'Norepinephrine is first-line vasopressor - start 0.05 mcg/kg/min, target MAP ≥65', nodeId: 'sepsis-vp-init' },
  { text: 'Add vasopressin 0.03-0.04 units/min EARLY before escalating NE to high doses', nodeId: 'sepsis-vp-second' },
  { text: 'Hydrocortisone 50 mg IV q6h for vasopressor-dependent shock - reduces shock duration', nodeId: 'sepsis-steroids' },
  { text: 'Source control within 6-12 hours - undrained foci will not respond to antibiotics alone', nodeId: 'sepsis-source-ctrl' },
  { text: 'RESTRICT fluids after initial 30 mL/kg - most crystalloid extravasates (95% leaves vasculature)', nodeId: 'sepsis-fluid-assess' },
  { text: 'Transfuse only if Hgb ≤7 g/dL - restrictive strategy safe in septic shock (TRISS trial)', nodeId: 'sepsis-transfusion' },
  { text: 'Discontinue vancomycin if no MRSA cultured within 48 hours', nodeId: 'sepsis-mrsa' },
];

export const SEPSIS_CITATIONS: Citation[] = [
  {
    num: 1,
    text: 'Singer M, Deutschman CS, Seymour CW, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.',
  },
  {
    num: 2,
    text: 'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
  },
  {
    num: 3,
    text: 'Meyer NJ, Prescott HC. Sepsis and Septic Shock. N Engl J Med. 2024;391(22):2133-2146.',
  },
  {
    num: 4,
    text: 'Rivers E, Nguyen B, Havstad S, et al. Early Goal-Directed Therapy in the Treatment of Severe Sepsis and Septic Shock. N Engl J Med. 2001;345(19):1368-1377.',
  },
  {
    num: 5,
    text: 'ProCESS Investigators, Yealy DM, Kellum JA, et al. A Randomized Trial of Protocol-Based Care for Early Septic Shock. N Engl J Med. 2014;370(18):1683-1693.',
  },
  {
    num: 6,
    text: 'ARISE Investigators, Peake SL, et al. Goal-Directed Resuscitation for Patients with Early Septic Shock. N Engl J Med. 2014;371(16):1496-1506.',
  },
  {
    num: 7,
    text: 'Mouncey PR, Osborn TM, Power GS, et al. Trial of Early, Goal-Directed Resuscitation for Septic Shock (ProMISe). N Engl J Med. 2015;372(14):1301-1311.',
  },
  {
    num: 8,
    text: 'National Heart, Lung, and Blood Institute, Shapiro NI, et al. Early Restrictive or Liberal Fluid Management for Sepsis-Induced Hypotension (CLOVERS). N Engl J Med. 2023;388(6):499-510.',
  },
  {
    num: 9,
    text: 'Meyhoff TS, Hjortrup PB, Wetterslev J, et al. Restriction of Intravenous Fluid in ICU Patients with Septic Shock (CLASSIC). N Engl J Med. 2022;386(26):2459-2470.',
  },
  {
    num: 10,
    text: 'Perner A, Haase N, Guttormsen AB, et al. Hydroxyethyl Starch 130/0.42 versus Ringer\'s Acetate in Severe Sepsis (6S Trial). N Engl J Med. 2012;367(2):124-134.',
  },
  {
    num: 11,
    text: 'De Backer D, Biston P, Devriendt J, et al. Comparison of Dopamine and Norepinephrine in the Treatment of Shock (SOAP-II). N Engl J Med. 2010;362(9):779-789.',
  },
  {
    num: 12,
    text: 'Russell JA, Walley KR, Singer J, et al. Vasopressin versus Norepinephrine Infusion in Patients with Septic Shock (VASST). N Engl J Med. 2008;358(9):877-887.',
  },
  {
    num: 13,
    text: 'Gordon AC, Mason AJ, Thirunavukkarasu N, et al. Effect of Early Vasopressin vs Norepinephrine on Kidney Failure in Patients with Septic Shock (VANISH). JAMA. 2016;316(5):509-518.',
  },
  {
    num: 14,
    text: 'Venkatesh B, Finfer S, Cohen J, et al. Adjunctive Glucocorticoid Therapy in Patients with Septic Shock (ADRENAL). N Engl J Med. 2018;378(9):797-808.',
  },
  {
    num: 15,
    text: 'Annane D, Renault A, Brun-Buisson C, et al. Hydrocortisone plus Fludrocortisone for Adults with Septic Shock (APROCCHSS). N Engl J Med. 2018;378(9):809-818.',
  },
  {
    num: 16,
    text: 'Hernandez G, Ospina-Tascon GA, Damiani LP, et al. Effect of a Resuscitation Strategy Targeting Peripheral Perfusion Status vs Serum Lactate Levels on 28-Day Mortality (ANDROMEDA-SHOCK). JAMA. 2019;321(7):654-664.',
  },
  {
    num: 17,
    text: 'ANDROMEDA-SHOCK-2 Investigators, Hernandez G, et al. Personalized Hemodynamic Resuscitation Targeting Capillary Refill Time in Early Septic Shock. JAMA. 2025;334:1988.',
  },
  {
    num: 18,
    text: 'Lamontagne F, Richards-Belle A, Thomas K, et al. Effect of Reduced Exposure to Vasopressors on 90-Day Mortality in Older Critically Ill Patients with Vasodilatory Hypotension (65-Trial). JAMA. 2020;323(10):938-949.',
  },
  {
    num: 19,
    text: 'Asfar P, Meziani F, Hamel JF, et al. High versus Low Blood-Pressure Target in Patients with Septic Shock (SEPSISPAM). N Engl J Med. 2014;370(17):1583-1593.',
  },
  {
    num: 20,
    text: 'Kumar A, Roberts D, Wood KE, et al. Duration of Hypotension before Initiation of Effective Antimicrobial Therapy Is the Critical Determinant of Survival in Human Septic Shock. Crit Care Med. 2006;34(6):1589-1596.',
  },
  {
    num: 21,
    text: 'Ibarra-Estrada MA, Kattan E, Aguilera-Gonzalez P, et al. Early Adjunctive Methylene Blue in Patients with Septic Shock: A Randomized Controlled Trial. Crit Care. 2023;27(1):110.',
  },
  {
    num: 22,
    text: 'Holst LB, Haase N, Wetterslev J, et al. Lower versus Higher Hemoglobin Threshold for Transfusion in Septic Shock (TRISS). N Engl J Med. 2014;371(15):1381-1391.',
  },
  {
    num: 23,
    text: 'Farkas J. Septic Shock. Internet Book of Critical Care (IBCC). EMCrit. Nov 2025.',
  },
  {
    num: 24,
    text: 'Schmidt GA, Mandel J, Bell TD. Evaluation and Management of Suspected Sepsis and Septic Shock in Adults. UpToDate. Jan 2026.',
  },
  {
    num: 25,
    text: 'Hwang EHW, Hwang CW, Augustin B, Guirgis FW, Black LP. Updates and Controversies in the Early Management of Sepsis and Septic Shock. Emergency Medicine Practice (EB Medicine). Aug 2025.',
  },
];
