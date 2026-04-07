// MedKitt - Viral Myositis (including Benign Acute Childhood Myositis)
// Age-based assessment of viral myositis vs rhabdomyolysis with risk stratification and treatment.
// 5 modules: Initial Assessment -> Clinical Presentation -> Workup -> Risk Stratification -> Treatment & Disposition
// 22 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const VIRAL_MYOSITIS_CRITICAL_ACTIONS = [
  { text: 'CK >10,000 OR myoglobinuria = rhabdomyolysis risk, admit for IV fluids', nodeId: 'vm-rhabdo' },
  { text: 'Goal UOP 200-300 mL/hr (adults) or 2-3 mL/kg/hr (peds) to prevent AKI', nodeId: 'vm-rhabdo-treatment' },
  { text: 'DO NOT use diuretics for rhabdomyolysis - worsens hemoconcentration and VTE risk', nodeId: 'vm-rhabdo-treatment' },
  { text: 'Oseltamivir within 48h if influenza confirmed (most common viral cause)', nodeId: 'vm-influenza' },
  { text: 'Pediatric BACM rarely causes AKI even with massive CK elevation - less aggressive than adults', nodeId: 'vm-peds-high' },
  { text: 'AVOID NSAIDs in viral myositis - risk of worsening renal function', nodeId: 'vm-pain-antiemetics' },
  { text: 'Exclude Guillain-Barre (ascending weakness, areflexia) before diagnosing benign myositis', nodeId: 'vm-peds-exclude' },
  { text: 'Influenza B more commonly associated with BACM than Influenza A', nodeId: 'vm-influenza' },
];

export const VIRAL_MYOSITIS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'vm-start',
    type: 'question',
    module: 1,
    title: 'Viral Myositis Assessment',
    body: '**Viral Myositis** is an acute inflammatory condition of skeletal muscle following viral infection. In children, it typically presents as Benign Acute Childhood Myositis (BACM) with excellent prognosis. In adults, it may progress to rhabdomyolysis with potential for acute kidney injury.\n\n**Common causative viruses:**\n\u2022 Influenza A and B (most common)\n\u2022 Parainfluenza, RSV\n\u2022 Enteroviruses, Coxsackie\n\u2022 EBV, CMV, Adenovirus\n\u2022 COVID-19\n\nSelect the patient age group:',
    citation: [1, 2],
    options: [
      {
        label: 'Pediatric (2-14 years)',
        description: 'Classic BACM presentation',
        next: 'vm-peds-presentation',
      },
      {
        label: 'Adult (>14 years)',
        description: 'Higher rhabdomyolysis risk',
        next: 'vm-adult-presentation',
      },
      {
        label: 'Toxic / Ill-Appearing',
        description: 'Any age with systemic illness',
        next: 'vm-toxic',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'vm-toxic',
    type: 'result',
    module: 1,
    title: 'Toxic / Ill-Appearing Patient',
    body: 'Patient appears systemically ill, suggesting severe viral myositis with potential rhabdomyolysis or alternative diagnosis.\n\n**IMMEDIATE ACTIONS:**\n\u2022 IV access, cardiac monitor\n\u2022 Aggressive IV fluid resuscitation (NS at 10-20 mL/kg bolus)\n\u2022 Labs: CBC, CMP, CK, UA, myoglobin, lactate\n\u2022 ECG (hyperkalemia screening)\n\n**RED FLAGS for Alternative Diagnoses:**\n\u2022 Focal neurologic deficits (consider GBS, transverse myelitis)\n\u2022 Ascending paralysis (GBS)\n\u2022 Ptosis, bulbar symptoms (myasthenia gravis)\n\u2022 Diffuse rash (dermatomyositis, toxic shock)\n\u2022 Proximal > distal weakness (inflammatory myopathy)',
    recommendation: 'Admit for IV fluid resuscitation and close monitoring. Consider ICU if hemodynamic instability, severe hyperkalemia, or respiratory compromise. Consult nephrology early if AKI present.',
    confidence: 'definitive',
    citation: [3, 4],
    treatment: {
      firstLine: {
        drug: 'Normal Saline',
        dose: '10-20 mL/kg bolus, then 200-300 mL/hr',
        route: 'IV',
        frequency: 'continuous',
        duration: 'Until urine output 200-300 mL/hr',
        notes: 'Goal: dilute myoglobin, maintain renal perfusion',
      },
      monitoring: 'UOP goal 200-300 mL/hr. Monitor K+ q4-6h. Serial CK until downtrending. Renal function daily.',
    },
  },

  // =====================================================================
  // MODULE 2: CLINICAL PRESENTATION
  // =====================================================================

  {
    id: 'vm-peds-presentation',
    type: 'info',
    module: 2,
    title: 'BACM Clinical Presentation',
    body: '**Benign Acute Childhood Myositis (BACM):**\n\nTypical presentation:\n\u2022 **Age:** Peak 5-9 years (range 2-14)\n\u2022 **Sex:** Male predominance (3:1)\n\u2022 **Timing:** 1-7 days after viral prodrome (often influenza)\n\n**Classic Symptoms:**\n\u2022 Sudden-onset bilateral calf pain (90%)\n\u2022 Refusal to walk or "duck waddle" gait\n\u2022 Calf tenderness to palpation\n\u2022 May have resolving URI symptoms\n\n**Key Features:**\n\u2022 Usually afebrile at presentation\n\u2022 Normal neurologic exam\n\u2022 Symmetric involvement\n\u2022 Self-limited (resolves in 3-5 days)',
    citation: [1, 5],
    next: 'vm-peds-exclude',
  },

  {
    id: 'vm-peds-exclude',
    type: 'question',
    module: 2,
    title: 'Exclude Serious Conditions',
    body: 'Before diagnosing BACM, exclude conditions requiring emergent management.\n\n**RED FLAGS:**\n\u2022 Asymmetric leg pain/swelling (DVT, osteomyelitis, septic arthritis)\n\u2022 Focal tenderness over bone (fracture, osteomyelitis)\n\u2022 Joint effusion/erythema (septic arthritis)\n\u2022 Abdominal pain + leg pain (psoas abscess, appendicitis)\n\u2022 Ascending weakness (Guillain-Barre syndrome)\n\u2022 Petechiae/purpura (meningococcemia, HSP)\n\u2022 Tea-colored urine (myoglobinuria)\n\u2022 History of recent trauma or extreme exertion\n\nAre any red flags present?',
    citation: [1, 6],
    options: [
      {
        label: 'Yes - Red flags present',
        description: 'Requires broader workup',
        next: 'vm-expanded-workup',
        urgency: 'urgent',
      },
      {
        label: 'No - Classic BACM presentation',
        description: 'Bilateral calf pain, post-viral, well-appearing',
        next: 'vm-peds-labs',
      },
    ],
  },

  {
    id: 'vm-adult-presentation',
    type: 'info',
    module: 2,
    title: 'Adult Viral Myositis',
    body: '**Adult Viral Myositis:**\n\nUnlike pediatric BACM, adults have higher risk of rhabdomyolysis and AKI.\n\n**Common Presentation:**\n\u2022 Diffuse myalgias (not limited to calves)\n\u2022 Proximal weakness (thighs, shoulders)\n\u2022 Muscle tenderness\n\u2022 May have ongoing fever/constitutional symptoms\n\n**Associated Features:**\n\u2022 Dark urine (myoglobinuria) - concerning sign\n\u2022 Decreased urine output\n\u2022 Fatigue, malaise\n\n**Risk Factors for Severe Course:**\n\u2022 Older age\n\u2022 Pre-existing renal disease\n\u2022 Dehydration\n\u2022 Concurrent medications (statins, fibrates)\n\u2022 Immunocompromised state',
    citation: [3, 7],
    next: 'vm-adult-assess',
  },

  {
    id: 'vm-adult-assess',
    type: 'question',
    module: 2,
    title: 'Adult Myositis Assessment',
    body: 'Assess for features suggesting progression to rhabdomyolysis.\n\n**Concerning Features:**\n\u2022 Tea-colored or dark urine\n\u2022 Decreased urine output\n\u2022 Severe muscle pain/weakness\n\u2022 Inability to ambulate\n\u2022 Fever persisting >5 days\n\u2022 Concurrent statin/fibrate use\n\nSelect the clinical picture:',
    citation: [4, 7],
    options: [
      {
        label: 'Mild Myalgias Only',
        description: 'Ambulatory, normal urine, tolerating PO',
        next: 'vm-adult-mild-workup',
      },
      {
        label: 'Moderate Symptoms',
        description: 'Significant pain, some weakness, no dark urine',
        next: 'vm-adult-labs',
      },
      {
        label: 'Concerning Features Present',
        description: 'Dark urine, decreased UOP, severe weakness',
        next: 'vm-adult-labs',
        urgency: 'urgent',
      },
    ],
  },

  // =====================================================================
  // MODULE 3: WORKUP
  // =====================================================================

  {
    id: 'vm-peds-labs',
    type: 'info',
    module: 3,
    title: 'BACM Laboratory Workup',
    body: '**Minimal Workup for Classic BACM:**\n\u2022 **CK (Creatine Kinase):** Elevated, typically 1,000-10,000 U/L\n\u2022 **UA:** Check for myoglobin (blood + on dipstick, no RBCs on micro)\n\u2022 **BMP (optional):** If clinical concern for renal involvement\n\n**Expected Findings in BACM:**\n\u2022 CK elevated (median 1,750 U/L, can reach >100,000)\n\u2022 Normal creatinine (renal function preserved)\n\u2022 Mild transaminitis (AST > ALT, from muscle)\n\u2022 Possible mild leukopenia/thrombocytopenia (viral)\n\n**Important Note:**\n\u2022 CK level does NOT correlate with severity in BACM [5]\n\u2022 Even massive CK elevation rarely causes AKI in children\n\u2022 CK peaks at 2-3 days, normalizes by 7-14 days',
    citation: [1, 5, 8],
    next: 'vm-peds-ck-result',
  },

  {
    id: 'vm-peds-ck-result',
    type: 'question',
    module: 3,
    title: 'BACM CK Results',
    body: 'Review CK level and urinalysis results.\n\n**CK Interpretation:**\n\u2022 <1,000 U/L: Mild elevation, consistent with BACM\n\u2022 1,000-5,000 U/L: Typical BACM range\n\u2022 5,000-10,000 U/L: Higher end, still usually benign\n\u2022 >10,000 U/L: Evaluate more closely but still often benign\n\n**UA for Myoglobinuria:**\n\u2022 Dipstick positive for blood + <5 RBCs on microscopy = myoglobinuria\n\u2022 Indicates significant muscle breakdown\n\nSelect the findings:',
    citation: [5, 8],
    options: [
      {
        label: 'CK <5,000, UA negative',
        description: 'Low risk - typical BACM',
        next: 'vm-peds-low-risk',
      },
      {
        label: 'CK 5,000-10,000, UA negative',
        description: 'Moderate elevation, no myoglobinuria',
        next: 'vm-peds-moderate',
      },
      {
        label: 'CK >5,000 + Myoglobinuria OR CK >10,000',
        description: 'Higher risk - needs monitoring',
        next: 'vm-peds-high',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'vm-adult-mild-workup',
    type: 'info',
    module: 3,
    title: 'Mild Adult Myositis Workup',
    body: '**Outpatient Workup for Mild Symptoms:**\n\n**Basic Labs:**\n\u2022 CK (Creatine Kinase)\n\u2022 BMP (creatinine, potassium)\n\u2022 UA (check for myoglobin)\n\n**If Normal Renal Function + CK <5,000:**\n\u2022 Supportive care at home\n\u2022 PO hydration (2-3L/day)\n\u2022 [Acetaminophen](#/drug/acetaminophen/pain) or [Ibuprofen](#/drug/ibuprofen/viral myositis) for pain\n\u2022 Avoid strenuous activity\n\u2022 Return if dark urine, decreased UOP, or worsening symptoms\n\n**Consider viral testing:**\n\u2022 Influenza (if suggestive history, for oseltamivir consideration)\n\u2022 COVID-19',
    citation: [4, 7],
    next: 'vm-adult-mild-result',
  },

  {
    id: 'vm-adult-mild-result',
    type: 'question',
    module: 3,
    title: 'Adult Mild Myositis Results',
    body: 'Review laboratory findings.\n\n**Reassuring findings:**\n\u2022 CK <5,000 U/L\n\u2022 Normal creatinine\n\u2022 No myoglobinuria\n\u2022 Normal potassium\n\nSelect result pattern:',
    citation: [4],
    options: [
      {
        label: 'All reassuring (CK <5,000, normal renal)',
        description: 'Low risk for rhabdomyolysis',
        next: 'vm-adult-low-risk',
      },
      {
        label: 'CK 5,000-10,000 OR mild renal impairment',
        description: 'Borderline - needs observation',
        next: 'vm-adult-moderate',
      },
      {
        label: 'CK >10,000 OR myoglobinuria OR elevated Cr',
        description: 'Rhabdomyolysis risk - admit',
        next: 'vm-rhabdo',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'vm-adult-labs',
    type: 'info',
    module: 3,
    title: 'Adult Myositis Lab Panel',
    body: '**Complete Workup for Moderate-Severe Symptoms:**\n\n**Standard Labs:**\n\u2022 CBC with differential\n\u2022 CMP (renal function, electrolytes, LFTs)\n\u2022 CK (Creatine Kinase)\n\u2022 UA with microscopy\n\u2022 Serum myoglobin (if available)\n\u2022 Lactate (if ill-appearing)\n\n**Consider:**\n\u2022 ECG (if K+ concerns)\n\u2022 Influenza/COVID testing\n\u2022 TSH (hypothyroid myopathy)\n\u2022 ANA, aldolase (if subacute course, consider inflammatory myopathy)\n\n**CK Thresholds:**\n\u2022 CK >5,000 U/L + dehydration/acidosis: high AKI risk\n\u2022 CK >10,000 U/L: significant rhabdomyolysis\n\u2022 CK >100,000 U/L: severe, high AKI risk regardless of hydration',
    citation: [4, 7, 9],
    next: 'vm-adult-lab-results',
  },

  {
    id: 'vm-adult-lab-results',
    type: 'question',
    module: 3,
    title: 'Adult Lab Results',
    body: 'Interpret lab findings to risk stratify.\n\n**High Risk for AKI:**\n\u2022 CK >10,000 U/L\n\u2022 Myoglobinuria present\n\u2022 Elevated creatinine\n\u2022 Hyperkalemia (K+ >5.5)\n\u2022 Metabolic acidosis\n\nSelect the risk category:',
    citation: [4, 9],
    options: [
      {
        label: 'CK <5,000, normal renal, no myoglobinuria',
        description: 'Low risk',
        next: 'vm-adult-low-risk',
      },
      {
        label: 'CK 5,000-10,000, normal-mildly elevated Cr',
        description: 'Moderate risk',
        next: 'vm-adult-moderate',
      },
      {
        label: 'CK >10,000 OR AKI OR hyperkalemia',
        description: 'Rhabdomyolysis - requires IV fluids',
        next: 'vm-rhabdo',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'vm-expanded-workup',
    type: 'info',
    module: 3,
    title: 'Expanded Workup for Red Flags',
    body: '**When red flags are present, expand workup:**\n\n**Labs:**\n\u2022 CBC, CMP, CK, UA\n\u2022 ESR, CRP (inflammatory markers)\n\u2022 Blood culture (if febrile)\n\u2022 Procalcitonin (if sepsis concern)\n\n**Imaging as indicated:**\n\u2022 X-ray of affected limb (fracture, osteomyelitis)\n\u2022 Ultrasound (DVT, abscess, joint effusion)\n\u2022 MRI (if osteomyelitis, pyomyositis concern)\n\n**Additional Testing:**\n\u2022 LP (if GBS or meningitis concern)\n\u2022 Nerve conduction studies (GBS)\n\n**Disposition depends on findings:**\n\u2022 If alternative diagnosis confirmed: treat accordingly\n\u2022 If BACM confirmed after workup: manage per risk stratification',
    citation: [1, 6],
    next: 'vm-peds-labs',
  },

  // =====================================================================
  // MODULE 4: RISK STRATIFICATION
  // =====================================================================

  {
    id: 'vm-peds-low-risk',
    type: 'result',
    module: 4,
    title: 'BACM - Low Risk',
    body: '**Benign Acute Childhood Myositis - Low Risk**\n\nCK <5,000 U/L with no myoglobinuria indicates excellent prognosis.\n\n**Management:**\n\u2022 Oral hydration encouraged (2-3x normal intake)\n\u2022 [Ibuprofen](#/drug/ibuprofen/viral myositis) 10 mg/kg PO q6-8h PRN for pain (max 400 mg/dose)\n\u2022 OR [Acetaminophen](#/drug/acetaminophen/pain) 15 mg/kg PO q4-6h PRN\n\u2022 Rest with gradual return to activity\n\n**Expected Course:**\n\u2022 Symptoms resolve in 3-5 days\n\u2022 CK normalizes in 7-14 days\n\u2022 Recurrence rate ~10%\n\n**Return Precautions:**\n\u2022 Dark/tea-colored urine\n\u2022 Decreased urine output\n\u2022 Worsening pain or inability to walk\n\u2022 New weakness or numbness',
    recommendation: 'Discharge home with supportive care. No routine CK recheck needed. Follow-up PRN or if symptoms worsen.',
    confidence: 'definitive',
    citation: [1, 5, 8],
    treatment: {
      firstLine: {
        drug: 'Ibuprofen',
        dose: '10 mg/kg',
        route: 'PO',
        frequency: 'q6-8h PRN',
        duration: '3-5 days as needed',
        notes: 'Max 400 mg/dose. Encourage oral hydration.',
      },
      alternative: {
        drug: 'Acetaminophen',
        dose: '15 mg/kg',
        route: 'PO',
        frequency: 'q4-6h PRN',
        duration: '3-5 days as needed',
        notes: 'Max 1g/dose or 4g/day',
      },
      monitoring: 'Clinical follow-up only. Return if dark urine, decreased UOP, or worsening symptoms.',
    },
  },

  {
    id: 'vm-peds-moderate',
    type: 'result',
    module: 4,
    title: 'BACM - Moderate CK Elevation',
    body: '**BACM with CK 5,000-10,000 U/L**\n\nWhile still likely benign, higher CK warrants closer monitoring.\n\n**Management Options:**\n\n**Option A - ED Observation (Preferred if concerns):**\n\u2022 IV NS 10-20 mL/kg bolus, then maintenance + deficit\n\u2022 Repeat CK, BMP in 4-6 hours\n\u2022 If CK trending down and normal renal function: discharge\n\n**Option B - Discharge with Close Follow-up:**\n\u2022 Aggressive PO hydration\n\u2022 [Ibuprofen](#/drug/ibuprofen/viral myositis) for pain\n\u2022 Recheck CK and creatinine in 24-48 hours\n\u2022 Return immediately if dark urine or decreased UOP\n\n**Admission Criteria:**\n\u2022 Unable to tolerate PO\n\u2022 Rising CK on recheck\n\u2022 Any renal impairment\n\u2022 Unreliable follow-up',
    recommendation: 'Consider ED observation with IV hydration and CK recheck. If stable, may discharge with next-day CK recheck and strict return precautions.',
    confidence: 'recommended',
    citation: [5, 8],
    treatment: {
      firstLine: {
        drug: 'Normal Saline',
        dose: '20 mL/kg bolus, then 1.5x maintenance',
        route: 'IV',
        frequency: 'continuous',
        duration: '4-6 hours observation',
        notes: 'Recheck CK before discharge',
      },
      monitoring: 'CK and BMP recheck in 4-6 hours or 24-48 hours if discharged.',
    },
  },

  {
    id: 'vm-peds-high',
    type: 'result',
    module: 4,
    title: 'BACM - High CK or Myoglobinuria',
    body: '**BACM with CK >10,000 U/L or Myoglobinuria**\n\nRisk of rhabdomyolysis complications requires admission.\n\n**Management:**\n\n**IV Fluid Resuscitation:**\n\u2022 NS 20 mL/kg bolus\n\u2022 Then 1.5-2x maintenance rate\n\u2022 Goal: UOP 2-3 mL/kg/hr\n\n**Monitoring:**\n\u2022 Strict I/Os\n\u2022 Foley catheter if needed for accurate UOP\n\u2022 Serial CK q6-12h until downtrending\n\u2022 BMP q8-12h (monitor K+, creatinine)\n\n**Consults:**\n\u2022 Nephrology if creatinine rising\n\u2022 Pediatric hospitalist\n\n**Note:** Despite high CK, pediatric patients rarely develop AKI from viral myositis. Rhabdomyolysis occurred in only 1% of BACM patients in large studies. [8]',
    recommendation: 'Admit for IV fluid hydration and monitoring. Goal UOP 2-3 mL/kg/hr. Serial CK until downtrending. Most children do well even with very high CK.',
    confidence: 'definitive',
    citation: [5, 8, 10],
    treatment: {
      firstLine: {
        drug: 'Normal Saline',
        dose: '20 mL/kg bolus, then 1.5-2x maintenance',
        route: 'IV',
        frequency: 'continuous',
        duration: 'Until CK downtrending and UOP adequate',
        notes: 'Goal UOP 2-3 mL/kg/hr',
      },
      monitoring: 'Strict I/Os. CK q6-12h. BMP q8-12h. Foley if needed.',
    },
  },

  {
    id: 'vm-adult-low-risk',
    type: 'result',
    module: 4,
    title: 'Adult Myositis - Low Risk',
    body: '**Adult Viral Myositis - Low Risk**\n\nCK <5,000 U/L with normal renal function.\n\n**Outpatient Management:**\n\u2022 Aggressive oral hydration (2-3 L/day)\n\u2022 [Acetaminophen](#/drug/acetaminophen/pain) 650-1000 mg PO q6h PRN\n\u2022 OR [Ibuprofen](#/drug/ibuprofen/viral myositis) 400-600 mg PO q6-8h PRN\n\u2022 Avoid strenuous activity until symptoms resolve\n\u2022 Hold statins/fibrates temporarily (if applicable)\n\n**If Influenza Confirmed:**\n\u2022 Consider [Oseltamivir](#/drug/oseltamivir/influenza) 75 mg PO BID x 5 days if <48h from symptom onset\n\n**Return Precautions:**\n\u2022 Dark or tea-colored urine\n\u2022 Decreased urine output\n\u2022 Worsening weakness or pain\n\u2022 Fever >5 days\n\u2022 Inability to stay hydrated',
    recommendation: 'Discharge with supportive care and hydration. Consider oseltamivir if confirmed influenza <48h from onset. Follow-up with PCP in 3-5 days or sooner if worsening.',
    confidence: 'definitive',
    citation: [4, 7],
    treatment: {
      firstLine: {
        drug: 'Acetaminophen',
        dose: '650-1000 mg',
        route: 'PO',
        frequency: 'q6h PRN',
        duration: 'as needed',
        notes: 'Max 4g/day',
      },
      alternative: {
        drug: 'Ibuprofen',
        dose: '400-600 mg',
        route: 'PO',
        frequency: 'q6-8h PRN',
        duration: 'as needed',
        notes: 'Take with food. Avoid if renal concerns.',
      },
      monitoring: 'Clinical follow-up in 3-5 days. Return immediately if dark urine or decreased UOP.',
    },
  },

  {
    id: 'vm-adult-moderate',
    type: 'result',
    module: 4,
    title: 'Adult Myositis - Moderate Risk',
    body: '**Adult Viral Myositis - Moderate Risk**\n\nCK 5,000-10,000 U/L or mild creatinine elevation.\n\n**ED Observation Recommended:**\n\u2022 IV NS 1-2 L bolus\n\u2022 Then 150-200 mL/hr maintenance\n\u2022 Goal UOP >100 mL/hr (2 mL/kg/hr)\n\u2022 Recheck CK, BMP in 4-6 hours\n\n**Discharge if:**\n\u2022 CK stable or downtrending\n\u2022 Creatinine stable or improving\n\u2022 Tolerating PO\n\u2022 UOP adequate\n\n**Admit if:**\n\u2022 Rising CK\n\u2022 Rising creatinine\n\u2022 Unable to tolerate PO\n\u2022 Electrolyte abnormalities (hyperkalemia)\n\u2022 Social concerns (lives alone, no transportation)',
    recommendation: 'ED observation with IV fluids. If improving after 4-6 hours, may discharge with 24-hour CK recheck. If any concerning trends, admit.',
    confidence: 'recommended',
    citation: [4, 9],
    treatment: {
      firstLine: {
        drug: 'Normal Saline',
        dose: '1-2 L bolus, then 150-200 mL/hr',
        route: 'IV',
        frequency: 'continuous',
        duration: 'Until CK stable and adequate UOP',
        notes: 'Goal UOP 100-200 mL/hr',
      },
      monitoring: 'UOP hourly. CK and BMP recheck in 4-6 hours. ECG if K+ elevated.',
    },
  },

  // =====================================================================
  // MODULE 5: TREATMENT & DISPOSITION (Rhabdomyolysis)
  // =====================================================================

  {
    id: 'vm-rhabdo',
    type: 'info',
    module: 5,
    title: 'Rhabdomyolysis Management',
    body: '**Rhabdomyolysis from Viral Myositis**\n\nCK >10,000 U/L OR evidence of AKI OR myoglobinuria requires aggressive management.\n\n**Pathophysiology:**\n\u2022 Muscle cell necrosis releases myoglobin\n\u2022 Myoglobin precipitates in renal tubules\n\u2022 Direct tubular toxicity\n\u2022 Renal vasoconstriction\n\u2022 AKI can occur rapidly\n\n**Complications:**\n\u2022 AKI (21% incidence in rhabdomyolysis)\n\u2022 Hyperkalemia (life-threatening)\n\u2022 Hypocalcemia (early)\n\u2022 Hypercalcemia (recovery phase)\n\u2022 DIC (severe cases)\n\u2022 Compartment syndrome (rare in viral)',
    citation: [4, 9, 10],
    next: 'vm-rhabdo-treatment',
  },

  {
    id: 'vm-rhabdo-treatment',
    type: 'result',
    module: 5,
    title: 'Rhabdomyolysis Treatment Protocol',
    body: '**IV Fluid Resuscitation:**\n\u2022 NS 1-2 L bolus (adults) or 20 mL/kg (peds)\n\u2022 Then 200-300 mL/hr (or 3-5 mL/kg/hr peds)\n\u2022 Goal UOP: 200-300 mL/hr (adults) or 2-3 mL/kg/hr (peds)\n\u2022 May require 10-12 L in first 24 hours\n\n**Electrolyte Management:**\n\u2022 **Hyperkalemia:** Treat if K+ >6.0 or ECG changes\n  - Calcium gluconate for cardiac membrane stabilization\n  - Insulin + dextrose, albuterol\n  - Avoid calcium chloride if possible (can worsen rhabdo)\n\u2022 **Hypocalcemia:** Do NOT treat unless symptomatic (will correct with recovery)\n\n**Bicarbonate:**\n\u2022 Controversial - no proven benefit\n\u2022 Consider if pH <7.1 or severe acidosis\n\n**Diuretics:**\n\u2022 Generally avoid (can worsen hypovolemia)\n\u2022 Mannitol only with nephrology guidance\n\n**Dialysis Indications:**\n\u2022 Refractory hyperkalemia\n\u2022 Severe acidosis\n\u2022 Fluid overload\n\u2022 Uremia symptoms',
    recommendation: 'Admit to ICU or step-down. Aggressive IV fluid resuscitation targeting UOP 200-300 mL/hr. Serial CK, BMP, and UOP monitoring. Early nephrology consult if AKI progressing.',
    confidence: 'definitive',
    citation: [4, 9, 10],
    treatment: {
      firstLine: {
        drug: 'Normal Saline',
        dose: '1-2 L bolus, then 200-300 mL/hr',
        route: 'IV',
        frequency: 'continuous',
        duration: 'Until CK <5,000 and downtrending',
        notes: 'May need 10-12 L in first 24 hours. Foley catheter required.',
      },
      monitoring: 'UOP hourly. CK q6h. BMP q4-6h. ECG if K+ elevated. Daily renal function.',
    },
  },

  {
    id: 'vm-influenza',
    type: 'info',
    module: 5,
    title: 'Influenza-Associated Myositis',
    body: '**Influenza-Associated Myositis Considerations:**\n\n**Antiviral Therapy:**\n\u2022 [Oseltamivir](#/drug/oseltamivir/influenza) if <48h from symptom onset\n\u2022 May still provide benefit after 48h in severe cases\n\u2022 Dosing: 75 mg PO BID x 5 days (adults)\n\u2022 Pediatric: weight-based dosing\n\n**2024-2025 Season Data:** [2]\n\u2022 BACM incidence 32.7% in hospitalized influenza cases\n\u2022 Influenza B more commonly associated than A\n\u2022 Median CK 2,637 U/L (range 189-129,390)\n\u2022 All had preserved renal function\n\u2022 No ICU admissions or deaths\n\n**Prevention:**\n\u2022 Annual influenza vaccination may reduce BACM incidence\n\u2022 Quadrivalent vaccine preferred',
    citation: [2, 7],
    next: 'vm-peds-low-risk',
  },

  {
    id: 'vm-ddx',
    type: 'info',
    module: 2,
    title: 'Differential Diagnosis',
    body: '**Conditions Mimicking Viral Myositis:**\n\n**Infectious:**\n\u2022 Pyomyositis (focal, often unilateral)\n\u2022 Necrotizing fasciitis (rapid progression, systemic toxicity)\n\u2022 Trichinosis (eosinophilia, periorbital edema)\n\u2022 Lyme disease (may have rash, arthritis)\n\n**Inflammatory:**\n\u2022 Dermatomyositis (rash, proximal weakness, chronic)\n\u2022 Polymyositis (insidious onset, proximal weakness)\n\u2022 Vasculitis\n\n**Neurologic:**\n\u2022 Guillain-Barre syndrome (ascending weakness, areflexia)\n\u2022 Transverse myelitis (sensory level)\n\u2022 Myasthenia gravis (fatigable weakness, ptosis)\n\n**Other:**\n\u2022 Compartment syndrome (tense compartment, pain with passive stretch)\n\u2022 DVT (unilateral swelling, Homan sign)\n\u2022 Drug-induced myopathy (statins, fibrates, colchicine)',
    citation: [3, 6],
    next: 'vm-start',
  },

];

export const VIRAL_MYOSITIS_NODE_COUNT = VIRAL_MYOSITIS_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const VIRAL_MYOSITIS_MODULE_LABELS = [
  'Initial Assessment',
  'Clinical Presentation',
  'Workup',
  'Risk Stratification',
  'Treatment & Disposition',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const VIRAL_MYOSITIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Rosenberg T, Heitner S, Scolnik D, et al. Management and outcome of benign acute childhood myositis in pediatric emergency department. Ital J Pediatr. 2021;47:54. PMID: 33685498' },
  { num: 2, text: 'Karapiperis D, et al. Influenza-Associated Benign Acute Childhood Myositis During the 2024-2025 Season: A Retrospective Multicenter Study. Children. 2025;12(10):1333.' },
  { num: 3, text: 'Crum-Cianflone NF. Bacterial, fungal, parasitic, and viral myositis. Clin Microbiol Rev. 2008;21(3):473-494. PMID: 18625683' },
  { num: 4, text: 'Bosch X, Poch E, Grau JM. Rhabdomyolysis and acute kidney injury. N Engl J Med. 2009;361(1):62-72. PMID: 19571284' },
  { num: 5, text: 'Mackay MT, Kornberg AJ, Shield LK, Dennett X. Benign acute childhood myositis: laboratory and clinical features. Neurology. 1999;53(9):2127-2131. PMID: 10599793' },
  { num: 6, text: 'Agyeman P, Duppenthaler A, Heininger U, Aebi C. Influenza-associated myositis in children. Infection. 2004;32(4):199-203. PMID: 15293074' },
  { num: 7, text: 'Fadila MF, Wool KJ. Rhabdomyolysis secondary to influenza a infection: a case report and review of the literature. N Am J Med Sci. 2015;7(3):122-124. PMID: 25839007' },
  { num: 8, text: 'Magee CC, Parkash V, Bhave G, et al. Benign acute childhood myositis: a retrospective cohort study from a large tertiary care children\'s hospital. Front Pediatr. 2025;13:1653651.' },
  { num: 9, text: 'Chavez LO, Leon M, Einav S, Varon J. Beyond muscle destruction: a systematic review of rhabdomyolysis for clinical practice. Crit Care. 2016;20:135. PMID: 27301374' },
  { num: 10, text: 'Bagley WH, Yang H, Shah KH. Rhabdomyolysis. Intern Emerg Med. 2007;2(3):210-218. PMID: 17909702' },
];
