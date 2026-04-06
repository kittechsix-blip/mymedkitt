// MedKitt - Peripartum Cardiomyopathy (PPCM)
// ED Recognition → Stabilization → Medications → Anticoagulation → Delivery → Disposition
// 28 nodes total

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const PERIPARTUM_CARDIOMYOPATHY_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & DIAGNOSIS
  // =====================================================================

  {
    id: 'ppcm-start',
    type: 'info',
    module: 1,
    title: 'Peripartum Cardiomyopathy',
    body: '[PPCM Quick Reference](#/info/ppcm-summary)\n\n**Definition:** Heart failure secondary to LV systolic dysfunction (EF <45%) developing towards the end of pregnancy or in the months following delivery, where no other cause of HF is found. [1][2]\n\n**Timing:**\n- Classic: Last month of pregnancy to 5 months postpartum\n- ~80% present within first month postpartum\n- Can present earlier in pregnancy (rare) or up to 6 months postpartum\n\n**Incidence:** 1 in 1,000-4,000 live births in US (higher in certain populations)\n\n**Why it matters:**\n- Mortality 6-10% in US, up to 28% in some regions\n- Easily missed because symptoms mimic normal pregnancy\n- HIGH recovery potential with aggressive treatment (50-70% recover EF)',
    citation: [1, 2, 3],
    next: 'ppcm-risk-factors',
  },

  {
    id: 'ppcm-risk-factors',
    type: 'info',
    module: 1,
    title: 'Risk Factors',
    body: '**Established risk factors:**\n- African American race (1 in 1,421 vs 1 in 9,861 in Hispanics)\n- Age >=30 years\n- Multiparity\n- Multiple gestation (twins/triplets)\n- Preeclampsia/eclampsia (OR 3.28)\n- Gestational hypertension\n- Obesity\n- Diabetes\n\n**Additional associations:**\n- Prolonged tocolytic use\n- Anemia\n- Family history of cardiomyopathy\n- Prior PPCM (recurrence risk 30-50%)\n\n**African American women have:** [2][5]\n- Higher incidence\n- More severe presentation\n- Lower recovery rates\n- Twice as long to recover when recovery occurs',
    citation: [2, 5, 8],
    next: 'ppcm-presentation',
  },

  {
    id: 'ppcm-presentation',
    type: 'question',
    module: 1,
    title: 'Clinical Presentation',
    body: '**Classic HF symptoms (easily attributed to "normal pregnancy"):**\n- Dyspnea on exertion / orthopnea / PND\n- Fatigue\n- Peripheral edema\n- Cough (especially nocturnal)\n- Palpitations\n\n**Red flags suggesting PPCM over normal pregnancy:**\n- New onset dyspnea at rest\n- PND (paroxysmal nocturnal dyspnea)\n- Unable to lie flat\n- New or worsening edema\n- Persistent tachycardia (>100 bpm at rest)\n- JVD, S3 gallop, pulmonary crackles\n- Hypoxemia\n\n**KEY PEARL:** If a pregnant/postpartum woman says "something is wrong with my breathing," believe her. High index of suspicion required. [1][2][3]',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Symptoms concerning for PPCM',
        description: 'Orthopnea, PND, worsening dyspnea, tachycardia',
        next: 'ppcm-workup',
        urgency: 'urgent',
      },
      {
        label: 'Hemodynamically unstable',
        description: 'Hypotension, cardiogenic shock, respiratory failure',
        next: 'ppcm-unstable',
        urgency: 'critical',
      },
      {
        label: 'Mild dyspnea, likely normal pregnancy',
        description: 'Exertional only, no orthopnea/PND, stable vitals',
        next: 'ppcm-watchful',
      },
    ],
  },

  {
    id: 'ppcm-watchful',
    type: 'info',
    module: 1,
    title: 'Low Suspicion - Monitor Closely',
    body: 'If symptoms are mild and more consistent with normal pregnancy:\n\n**Consider outpatient workup:**\n- Schedule outpatient echo within 1-2 weeks\n- Consider BNP/NT-proBNP (normal values unchanged in pregnancy; marked elevation suggests pathology)\n\n**Clear return precautions:**\n- Orthopnea (cannot lie flat)\n- Paroxysmal nocturnal dyspnea\n- Worsening dyspnea at rest\n- New or worsening edema\n- Palpitations or syncope\n\n**PPCM is a diagnosis you cannot afford to miss.** When in doubt, get the echo. [1][2]',
    citation: [1, 2],
    next: 'ppcm-disposition',
  },

  {
    id: 'ppcm-workup',
    type: 'info',
    module: 1,
    title: 'Diagnostic Workup',
    body: '**Essential:**\n\n1. **Echocardiogram** - DIAGNOSTIC\n   - LVEF <45% (often <35% at presentation)\n   - May show LV dilation (LVEDD >2.7 cm/m2)\n   - RV dysfunction, functional MR/TR\n   - Look for LV thrombus\n\n2. **BNP/NT-proBNP**\n   - Markedly elevated in PPCM\n   - Normal pregnancy: minimally elevated\n   - BNP >1860 pg/mL predicts persistent LV dysfunction\n\n3. **Troponin**\n   - Often mildly elevated\n   - High troponin T (>0.4 ng/mL) predicts worse outcomes\n\n**Additional studies:**\n- ECG: sinus tachycardia, nonspecific ST-T changes, low voltage\n- CXR: cardiomegaly, pulmonary edema\n- CBC, BMP, LFTs (end-organ function)\n\n**ECG findings (nonspecific):** Sinus tachycardia (most common), left axis deviation, Q waves (mimicking MI), prolonged QRS [1][2][8]',
    citation: [1, 2, 8],
    next: 'ppcm-severity',
  },

  // =====================================================================
  // MODULE 2: STABILIZATION
  // =====================================================================

  {
    id: 'ppcm-severity',
    type: 'question',
    module: 2,
    title: 'Assess Severity',
    body: '**Severity stratification based on LVEF and hemodynamics:**\n\n**Mild-Moderate (LVEF 35-45%):**\n- Ambulatory symptoms\n- Hemodynamically stable\n- No respiratory distress at rest\n\n**Severe (LVEF <35%):**\n- Symptoms at rest\n- Tachycardia, hypotension\n- Hypoxemia\n- High-risk for LV thrombus\n\n**Critical/Cardiogenic Shock:**\n- SBP <90 mmHg or requiring vasopressors\n- Signs of end-organ hypoperfusion\n- Acute pulmonary edema\n- LVEF often <25%\n\n[PPCM Prognosis](#/info/ppcm-prognosis) [1][2][6]',
    citation: [1, 2, 6],
    options: [
      {
        label: 'Mild-Moderate (LVEF 35-45%, stable)',
        description: 'Ambulatory symptoms, hemodynamically stable',
        next: 'ppcm-stable-management',
      },
      {
        label: 'Severe (LVEF <35%, symptomatic)',
        description: 'Symptoms at rest, tachycardia, hypoxemia',
        next: 'ppcm-severe-management',
        urgency: 'urgent',
      },
      {
        label: 'Cardiogenic shock / respiratory failure',
        description: 'SBP <90, end-organ hypoperfusion, acute pulmonary edema',
        next: 'ppcm-unstable',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'ppcm-unstable',
    type: 'info',
    module: 2,
    title: 'Cardiogenic Shock - Critical PPCM',
    body: '**Immediate actions:**\n\n1. **Airway/Breathing:**\n   - High-flow O2, NIPPV if tolerating\n   - Early intubation if failing (ketamine preferred for induction)\n   - Avoid hypotension during intubation\n\n2. **Circulation:**\n   - 2 large-bore IVs\n   - Arterial line for continuous BP monitoring\n   - Central line for vasopressors\n\n3. **Positioning:**\n   - If pregnant: left lateral tilt to prevent IVC compression\n   - Elevate head of bed if pulmonary edema\n\n4. **Call for help:**\n   - Cardiology STAT\n   - OB/MFM STAT (if pregnant)\n   - ICU team\n   - Consider transfer to ECMO-capable center\n\n**Target:** MAP >65 mmHg, adequate end-organ perfusion [1][2][3]',
    citation: [1, 2, 3],
    next: 'ppcm-shock-meds',
  },

  {
    id: 'ppcm-shock-meds',
    type: 'info',
    module: 2,
    title: 'Inotropes & Vasopressors',
    body: '**For cardiogenic shock:**\n\n**First-line inotrope:**\n- [Dobutamine](#/drug/dobutamine/HF) 2.5-20 mcg/kg/min IV infusion\n- Increases contractility and cardiac output\n- May cause hypotension (beta-2 vasodilation)\n\n**If hypotensive (MAP <65):**\n- [Norepinephrine](#/drug/norepinephrine/shock) 0.1-0.5 mcg/kg/min\n- Preferred over dopamine (fewer arrhythmias)\n- Add to dobutamine if needed\n\n**Alternative:**\n- [Milrinone](#/drug/milrinone/HF) 0.375-0.75 mcg/kg/min\n- PDE inhibitor - more vasodilation\n- May worsen hypotension\n\n**Mechanical support indications:**\n- Failing medical therapy\n- INTERMACS 1-2 (critical cardiogenic shock)\n- Bridge to recovery or transplant decision [1][2][9]',
    citation: [1, 2, 9],
    calculatorLinks: [
      { id: 'dobutamine-calc', label: 'Dobutamine Calculator' },
      { id: 'norepi-calc', label: 'Norepinephrine Calculator' },
    ],
    next: 'ppcm-mechanical-support',
    treatment: {
      firstLine: {
        drug: 'Dobutamine',
        dose: '2.5-20 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until hemodynamically stable',
        notes: 'Start at 2.5 mcg/kg/min, titrate to effect. May cause hypotension.',
      },
      alternatives: {
        drug: 'Norepinephrine',
        dose: '0.1-0.5 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until hemodynamically stable',
        notes: 'Add if MAP <65 despite dobutamine.',
      },
      monitoring: 'Arterial line, continuous telemetry, UOP, lactate, end-organ function.',
    },
  },

  {
    id: 'ppcm-mechanical-support',
    type: 'info',
    module: 2,
    title: 'Mechanical Circulatory Support',
    body: '**Indications:** Refractory cardiogenic shock despite inotropes/vasopressors\n\n**Options (escalating support):**\n\n1. **IABP (Intra-Aortic Balloon Pump)**\n   - Bridge to recovery or LVAD\n   - Less invasive, widely available\n   - Afterload reduction + coronary perfusion\n\n2. **VA-ECMO**\n   - For severe biventricular failure\n   - Bridge to recovery or decision\n   - PPCM patients often young, good ECMO candidates\n   - ELSO Registry: acceptable outcomes in PPCM\n\n3. **LVAD (Left Ventricular Assist Device)**\n   - Bridge to recovery (many PPCM patients recover)\n   - Bridge to transplant if no recovery\n\n**KEY PEARL:** PPCM has HIGH recovery potential. Do not give up early. Younger patients, no coronary disease, potentially reversible pathology. [1][2][3]',
    citation: [1, 2, 3],
    next: 'ppcm-delivery-check',
  },

  {
    id: 'ppcm-delivery-check',
    type: 'question',
    module: 2,
    title: 'Pregnancy Status',
    body: 'Is the patient still pregnant or postpartum?\n\nThis affects medication selection (ACE inhibitors contraindicated in pregnancy) and may require urgent delivery considerations.',
    options: [
      {
        label: 'Still pregnant',
        description: 'Antepartum presentation',
        next: 'ppcm-delivery-considerations',
        urgency: 'urgent',
      },
      {
        label: 'Postpartum',
        description: 'Already delivered',
        next: 'ppcm-diuretics',
      },
    ],
  },

  {
    id: 'ppcm-stable-management',
    type: 'info',
    module: 2,
    title: 'Stable PPCM - Initial Management',
    body: '**Goals of acute ED management:**\n1. Reduce preload (diuresis)\n2. Reduce afterload (vasodilators)\n3. Maintain cardiac output\n4. Prevent thromboembolism\n\n**Immediate measures:**\n- Oxygen to maintain SpO2 >94%\n- IV access\n- Cardiac monitoring\n- Foley catheter (monitor UOP)\n- Strict I/O\n\n**Fluid restriction:** 1.5-2 L/day\n\n**Salt restriction:** <2 g sodium/day\n\n**Position:** Semi-upright (head elevated); if pregnant, left lateral tilt [1][2][8]',
    citation: [1, 2, 8],
    next: 'ppcm-diuretics',
  },

  {
    id: 'ppcm-severe-management',
    type: 'info',
    module: 2,
    title: 'Severe PPCM - Aggressive Management',
    body: '**LVEF <35% with symptoms at rest requires aggressive treatment:**\n\n**Immediate:**\n- Oxygen, cardiac monitoring, IV access\n- Urgent echo if not done\n- Cardiology consult STAT\n\n**Treatment priorities:**\n1. IV diuretics for decongestion\n2. Afterload reduction (carefully if hypotensive)\n3. Consider IV vasodilators if SBP >110\n4. Low threshold for ICU admission\n\n**High-risk features requiring ICU:**\n- EF <25%\n- RV dysfunction\n- Significant hypotension (SBP <100)\n- Respiratory distress\n- End-organ dysfunction\n\n**Start thinking about anticoagulation** - LV thrombus risk is high [1][2][6]',
    citation: [1, 2, 6],
    next: 'ppcm-diuretics',
  },

  // =====================================================================
  // MODULE 3: MEDICATION MANAGEMENT
  // =====================================================================

  {
    id: 'ppcm-diuretics',
    type: 'info',
    module: 3,
    title: 'Diuretics',
    body: '**Loop diuretics - cornerstone of decongestive therapy:**\n\n[Furosemide](#/drug/furosemide/HF) (Lasix)\n- **Initial dose:** 20-40 mg IV bolus\n- **Titrate** based on urine output (target 0.5-1 mL/kg/hr)\n- May need higher doses (80-200 mg) in severe congestion\n- Continuous infusion: 5-20 mg/hr if boluses ineffective\n\n**Pregnancy considerations:**\n- Generally safe in pregnancy\n- May reduce placental perfusion - use lowest effective dose\n- Monitor electrolytes (K+, Mg2+)\n\n**Goal:** Euvolemia without over-diuresis\n- Dry weight = no JVD, no crackles, no peripheral edema\n- Avoid hypotension/renal hypoperfusion [1][2][8][9]',
    citation: [1, 2, 8, 9],
    next: 'ppcm-vasodilators',
    treatment: {
      firstLine: {
        drug: 'Furosemide',
        dose: '20-40 mg',
        route: 'IV bolus',
        frequency: 'Every 6-8 hours or continuous infusion 5-20 mg/hr',
        duration: 'Until euvolemic',
        notes: 'Titrate to UOP 0.5-1 mL/kg/hr. May need higher doses in severe congestion.',
      },
      monitoring: 'UOP, daily weights, BMP (K+, Mg2+, Cr), clinical volume status.',
    },
  },

  {
    id: 'ppcm-vasodilators',
    type: 'question',
    module: 3,
    title: 'Vasodilator Selection',
    body: '**Key question: Is the patient still pregnant?**\n\n**ACE inhibitors/ARBs:**\n- CONTRAINDICATED in pregnancy (teratogenic)\n- FIRST-LINE postpartum\n- Cornerstone of long-term HFrEF therapy\n\n**Pregnancy-safe afterload reduction:**\n- Hydralazine + Nitrates\n\n**Postpartum:**\n- Switch to ACE inhibitor/ARB immediately after delivery\n- Safe during breastfeeding: enalapril, captopril, benazepril [1][2][8][9]',
    citation: [1, 2, 8, 9],
    options: [
      {
        label: 'Still pregnant',
        description: 'Use hydralazine + nitrates (ACEi/ARB contraindicated)',
        next: 'ppcm-hydralazine-nitrates',
      },
      {
        label: 'Postpartum (delivered)',
        description: 'Start ACE inhibitor/ARB',
        next: 'ppcm-acei',
      },
    ],
  },

  {
    id: 'ppcm-hydralazine-nitrates',
    type: 'info',
    module: 3,
    title: 'Hydralazine + Nitrates (Pregnancy-Safe)',
    body: '**Hydralazine:**\n- [Hydralazine](#/drug/hydralazine/HTN) 25-50 mg PO TID-QID\n- Alternative: 10-20 mg IV every 4-6 hours (acute)\n- Direct arterial vasodilator (afterload reduction)\n\n**Isosorbide dinitrate:**\n- [Isosorbide dinitrate](#/drug/isosorbide-dinitrate/HF) 20-40 mg PO TID\n- Venodilator (preload reduction)\n\n**IV Nitroglycerin (acute decompensation):**\n- [Nitroglycerin](#/drug/nitroglycerin/ACS) 10-20 mcg/min, titrate up to 200 mcg/min\n- Use if SBP >110 mmHg\n- Excellent for acute pulmonary edema\n\n**AVOID nitroprusside** - cyanide toxicity concern in pregnancy\n\n**Switch to ACE inhibitor/ARB immediately postpartum.** [1][2][8][9]',
    citation: [1, 2, 8, 9],
    next: 'ppcm-beta-blockers',
    treatment: {
      firstLine: {
        drug: 'Hydralazine + Isosorbide dinitrate',
        dose: 'Hydralazine 25-50 mg + ISDN 20-40 mg',
        route: 'PO',
        frequency: 'TID',
        duration: 'Until delivery, then switch to ACEi/ARB',
        notes: 'Hydralazine 10-20 mg IV q4-6h for acute use. Avoid if SBP <100.',
      },
      alternatives: {
        drug: 'Nitroglycerin',
        dose: '10-200 mcg/min',
        route: 'IV infusion',
        frequency: 'Continuous titration',
        duration: 'Until stabilized or delivery',
        notes: 'For acute pulmonary edema if SBP >110 mmHg.',
      },
      monitoring: 'BP, symptom response, fetal heart tones.',
    },
  },

  {
    id: 'ppcm-acei',
    type: 'info',
    module: 3,
    title: 'ACE Inhibitors (Postpartum)',
    body: '**First-line postpartum - start immediately after delivery:**\n\n[Lisinopril](#/drug/lisinopril/HF) 2.5-5 mg daily, titrate to 20-40 mg daily\nOR\n[Enalapril](#/drug/enalapril/HF) 2.5 mg BID, titrate to 10-20 mg BID\n\n**Safe for breastfeeding:** Enalapril, captopril, benazepril (minimal breast milk transfer)\n\n**If ACE-intolerant (cough):**\n- ARB: [Losartan](#/drug/losartan/HF) 25-50 mg daily (titrate to 100 mg)\n\n**ARNI (Sacubitril/Valsartan):**\n- May consider if persistently low EF on max ACE/ARB\n- AVOID during pregnancy and breastfeeding\n\n**MRA (Spironolactone/Eplerenone):**\n- AVOID during pregnancy\n- Can use postpartum if not breastfeeding\n- [Spironolactone](#/drug/spironolactone/HF) 12.5-25 mg daily [1][2][8][9]',
    citation: [1, 2, 8, 9],
    next: 'ppcm-beta-blockers',
    treatment: {
      firstLine: {
        drug: 'Lisinopril or Enalapril',
        dose: 'Lisinopril 2.5-5 mg daily OR Enalapril 2.5 mg BID',
        route: 'PO',
        frequency: 'Daily (lisinopril) or BID (enalapril)',
        duration: 'Long-term, titrate to target dose',
        notes: 'Start low, titrate every 1-2 weeks. Enalapril preferred if breastfeeding.',
      },
      monitoring: 'K+, Cr, BP. Recheck BMP in 1-2 weeks after starting/uptitrating.',
    },
  },

  {
    id: 'ppcm-beta-blockers',
    type: 'info',
    module: 3,
    title: 'Beta-Blockers',
    body: '**Start once patient is euvolemic and hemodynamically stable:**\n\n**Pregnancy:**\n- [Metoprolol tartrate](#/drug/metoprolol/HF) 12.5-25 mg BID, titrate to 100 mg BID\n- Beta-1 selective preferred\n- AVOID atenolol (IUGR risk)\n\n**Postpartum:**\n- [Carvedilol](#/drug/carvedilol/HF) 3.125 mg BID, titrate to 25 mg BID\n- Superior LV recovery vs metoprolol in some studies\n- Note: excreted in breast milk\n\n**Titration:**\n- Start low, go slow\n- Double dose every 2-4 weeks as tolerated\n- Target resting HR 60-70 bpm\n\n**CONTRAINDICATIONS:**\n- Cardiogenic shock\n- Decompensated HF requiring IV inotropes\n- Severe bradycardia\n- Severe bronchospasm [1][2][8][9]',
    citation: [1, 2, 8, 9],
    next: 'ppcm-bromocriptine',
    treatment: {
      firstLine: {
        drug: 'Metoprolol tartrate (pregnancy) or Carvedilol (postpartum)',
        dose: 'Metoprolol 12.5-25 mg BID OR Carvedilol 3.125 mg BID',
        route: 'PO',
        frequency: 'BID',
        duration: 'Long-term, titrate every 2-4 weeks',
        notes: 'Start only when euvolemic and stable. Target HR 60-70 bpm.',
      },
      monitoring: 'HR, BP, symptoms. Do not start if hypotensive or actively decompensating.',
    },
  },

  {
    id: 'ppcm-bromocriptine',
    type: 'info',
    module: 3,
    title: 'Bromocriptine - Disease-Specific Therapy',
    body: '**Mechanism:** Blocks prolactin release, prevents formation of toxic 16-kDa prolactin fragment that damages cardiomyocytes\n\n**ESC Guideline: Class IIb recommendation** (may be considered)\n\n**Dosing (ESC BOARD regimen):**\n\n**Uncomplicated PPCM (EF 35-45%):**\n- [Bromocriptine](#/drug/bromocriptine/PPCM) 2.5 mg PO daily x 7 days\n\n**Severe PPCM (EF <25% or cardiogenic shock):**\n- Bromocriptine 2.5 mg PO BID x 2 weeks\n- Then 2.5 mg PO daily x 6 weeks\n\n**CRITICAL:** Must use with anticoagulation (increased MI/stroke risk)\n- LMWH at minimum prophylactic dose while on bromocriptine\n\n**Contraindications:**\n- Desire to breastfeed (suppresses lactation)\n- History of thromboembolism without anticoagulation\n\n**Evidence:** EORP PPCM Registry: 22% vs 33% reached primary endpoint (p=0.044). Fewer patients with severe LV dysfunction at 6 months. [1][4]',
    citation: [1, 4],
    next: 'ppcm-anticoag',
    treatment: {
      firstLine: {
        drug: 'Bromocriptine',
        dose: '2.5 mg PO daily (uncomplicated) OR 2.5 mg BID (severe)',
        route: 'PO',
        frequency: 'Daily or BID depending on severity',
        duration: '7 days (uncomplicated) or 2 weeks BID then 6 weeks daily (severe)',
        notes: 'MUST combine with anticoagulation. Suppresses lactation.',
      },
      monitoring: 'LV function on echo, thromboembolism signs, BP.',
    },
  },

  // =====================================================================
  // MODULE 4: ANTICOAGULATION
  // =====================================================================

  {
    id: 'ppcm-anticoag',
    type: 'question',
    module: 4,
    title: 'Anticoagulation Assessment',
    body: '**PPCM carries HIGH thromboembolic risk:**\n- LV dysfunction + pregnancy hypercoagulability\n- LV thrombus incidence ~17% (higher than DCM)\n- Stasis from dilated, poorly contracting LV\n\n**AHA recommends anticoagulation if EF <30%**\n**ESC recommends anticoagulation if EF <35%**\n\n**Absolute indications for therapeutic anticoagulation:**\n- LV thrombus visualized on echo\n- Prior systemic embolism\n- Atrial fibrillation\n\n**Consider prophylactic anticoagulation:**\n- EF <35% (especially if <30%)\n- On bromocriptine\n- Additional VTE risk factors [1][2][7]',
    citation: [1, 2, 7],
    options: [
      {
        label: 'LV thrombus, AF, or prior embolism',
        description: 'Therapeutic anticoagulation required',
        next: 'ppcm-therapeutic-anticoag',
        urgency: 'urgent',
      },
      {
        label: 'EF <30-35% or on bromocriptine',
        description: 'Prophylactic anticoagulation recommended',
        next: 'ppcm-prophylactic-anticoag',
      },
      {
        label: 'EF >=35%, no thrombus, no AF',
        description: 'Routine anticoagulation not required',
        next: 'ppcm-no-anticoag',
      },
    ],
  },

  {
    id: 'ppcm-therapeutic-anticoag',
    type: 'info',
    module: 4,
    title: 'Therapeutic Anticoagulation',
    body: '**Indications:**\n- LV thrombus on echo\n- Atrial fibrillation\n- Prior systemic embolism\n\n**Pregnancy:**\n- [Enoxaparin](#/drug/enoxaparin/VTE) 1 mg/kg SQ every 12 hours\n- Monitor anti-Xa levels (target 0.6-1.0 IU/mL, 4h post-dose)\n- Dose adjustments needed as pregnancy progresses\n\n**Near delivery:**\n- Switch to UFH 24-36 hours before planned delivery\n- Allows reversal with protamine if needed\n- Hold LMWH 24 hours before epidural/spinal\n\n**Postpartum:**\n- Warfarin (INR 2-3) - safe for breastfeeding\n- Or continue LMWH\n- Duration: minimum 3 months or until thrombus resolved + EF improved\n\n**Critical:** Do NOT use warfarin during pregnancy (teratogenic) [1][2][7]',
    citation: [1, 2, 7],
    next: 'ppcm-delivery-considerations',
    treatment: {
      firstLine: {
        drug: 'Enoxaparin (pregnancy) or Warfarin (postpartum)',
        dose: 'Enoxaparin 1 mg/kg q12h OR Warfarin INR 2-3',
        route: 'SQ (enoxaparin) or PO (warfarin)',
        frequency: 'Q12h (enoxaparin) or daily (warfarin)',
        duration: 'Minimum 3 months or until thrombus resolved',
        notes: 'Target anti-Xa 0.6-1.0 IU/mL for enoxaparin. Warfarin safe for breastfeeding.',
      },
      monitoring: 'Anti-Xa (enoxaparin), INR (warfarin), bleeding signs, repeat echo for thrombus.',
    },
  },

  {
    id: 'ppcm-prophylactic-anticoag',
    type: 'info',
    module: 4,
    title: 'Prophylactic Anticoagulation',
    body: '**Pregnancy:**\n- [Enoxaparin](#/drug/enoxaparin/prophylaxis) 40 mg SQ daily (prophylactic dose)\n- OR weight-based: 0.5 mg/kg SQ daily\n- UFH if delivery imminent (shorter half-life)\n\n**Postpartum:**\n- Continue LMWH until EF recovers\n- Can transition to warfarin (safe for breastfeeding)\n- DOACs: limited data in breastfeeding, generally avoid\n\n**Duration:**\n- Until EF >=35-40% on repeat echo\n- Minimum 8 weeks postpartum (highest risk period)\n\n**On bromocriptine:**\n- At minimum prophylactic LMWH required\n- Some experts recommend intermediate dosing [1][2][7]',
    citation: [1, 2, 7],
    next: 'ppcm-delivery-considerations',
    treatment: {
      firstLine: {
        drug: 'Enoxaparin',
        dose: '40 mg SQ daily or 0.5 mg/kg SQ daily',
        route: 'SQ',
        frequency: 'Daily',
        duration: 'Until EF >=35-40% or minimum 8 weeks postpartum',
        notes: 'Required if on bromocriptine. Switch to warfarin postpartum if desired.',
      },
      monitoring: 'Bleeding signs, repeat echo for EF recovery.',
    },
  },

  {
    id: 'ppcm-no-anticoag',
    type: 'info',
    module: 4,
    title: 'No Anticoagulation Indicated',
    body: '**If EF >=35%, no thrombus, no AF:**\n- Routine anticoagulation not required\n- VTE prophylaxis per standard obstetric guidelines\n\n**Continue close monitoring:**\n- Repeat echo at 2-4 weeks\n- Watch for deterioration\n\n**Re-assess anticoagulation if:**\n- EF declines <35%\n- New AF\n- New symptoms suggesting embolism\n- Starting bromocriptine [1][2][7]',
    citation: [1, 2, 7],
    next: 'ppcm-delivery-considerations',
  },

  // =====================================================================
  // MODULE 5: DELIVERY CONSIDERATIONS
  // =====================================================================

  {
    id: 'ppcm-delivery-considerations',
    type: 'question',
    module: 5,
    title: 'Delivery Considerations',
    body: '**If patient is still pregnant, coordinate with OB/MFM and cardiology.**\n\n**Timing of delivery:**\n- Hemodynamically stable: attempt to stabilize mother, optimize gestational age\n- Hemodynamically unstable: urgent/emergent delivery after maternal stabilization\n- Inotrope-dependent or mechanical support: urgent delivery indicated\n\n**Mode of delivery:**\n- **Vaginal delivery preferred** if hemodynamically stable\n- C-section for obstetric indications only\n- C-section higher risk: hemorrhage, infection, thromboembolism\n\n**Anesthesia:**\n- Epidural analgesia preferred for vaginal delivery (reduces catecholamine surge)\n- Neuraxial for C-section (epidural > single-shot spinal due to slower onset)\n- General anesthesia: avoid if possible (hemodynamic swings) [1][2][3]',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Hemodynamically stable - plan delivery',
        description: 'Vaginal delivery preferred, early epidural',
        next: 'ppcm-vaginal-delivery',
      },
      {
        label: 'Hemodynamically unstable - urgent delivery',
        description: 'C-section likely necessary',
        next: 'ppcm-urgent-delivery',
        urgency: 'critical',
      },
      {
        label: 'Already postpartum',
        description: 'Focus on HF management',
        next: 'ppcm-postpartum-management',
      },
    ],
  },

  {
    id: 'ppcm-vaginal-delivery',
    type: 'info',
    module: 5,
    title: 'Vaginal Delivery Recommendations',
    body: '**Preferred for hemodynamically stable patients:**\n\n**Labor management:**\n- Early epidural (reduces pain/catecholamine surge)\n- Continuous cardiac monitoring\n- Arterial line if severe LV dysfunction\n- Central line if on vasopressors\n\n**Second stage:**\n- Shorten with assisted vaginal delivery (vacuum/forceps)\n- Avoid prolonged Valsalva (decreases preload)\n- Consider passive descent\n\n**Fluid management:**\n- Avoid over-hydration (auto-transfusion after delivery adds ~500 mL)\n- Post-delivery diuresis may be needed\n\n**Anticoagulation:**\n- Hold LMWH 24 hours before epidural placement\n- Can restart 12-24 hours after delivery/epidural removal\n\n**Multidisciplinary team at delivery:** OB, MFM, Cardiology, Anesthesia, Neonatology [1][2][3]',
    citation: [1, 2, 3],
    next: 'ppcm-postpartum-management',
  },

  {
    id: 'ppcm-urgent-delivery',
    type: 'info',
    module: 5,
    title: 'Urgent Delivery - Hemodynamically Unstable',
    body: '**Maternal stabilization takes priority, but delivery may be necessary for both maternal and fetal benefit.**\n\n**Indications for urgent delivery:**\n- Requiring inotropes/vasopressors\n- Mechanical circulatory support needed\n- Maternal decompensation despite maximal therapy\n- Fetal distress\n\n**Considerations:**\n- C-section usually necessary (cannot tolerate labor)\n- General anesthesia may be required (hemodynamic instability)\n- Have blood products ready\n- ECMO standby if available\n\n**Perimortem C-section:**\n- If cardiac arrest: deliver within 4-5 minutes\n- May improve maternal resuscitation (relieves aortocaval compression)\n- Improves neonatal outcomes if >24 weeks\n\n**Post-delivery:** Expect hemodynamic shifts - be prepared for fluid bolus or increased pressors [1][2][3]',
    citation: [1, 2, 3],
    next: 'ppcm-postpartum-management',
  },

  {
    id: 'ppcm-postpartum-management',
    type: 'info',
    module: 5,
    title: 'Postpartum Management',
    body: '**Immediate postpartum period (highest risk for decompensation):**\n- Auto-transfusion of ~500 mL blood volume after delivery\n- May precipitate pulmonary edema\n- Close monitoring x 24-48 hours minimum\n\n**Medication transition:**\n- Start ACE inhibitor/ARB immediately\n- Continue/optimize beta-blocker\n- Continue diuretics as needed\n- Continue anticoagulation until EF improves\n\n**Breastfeeding:**\n- Generally safe with most HF medications\n- AVOID if on bromocriptine (suppresses lactation anyway)\n- Safe: metoprolol, enalapril, captopril, furosemide, digoxin, warfarin\n\n**Future pregnancy counseling:**\n- HIGH risk if EF has not fully recovered (<50%)\n- If EF recovered: still 30-50% recurrence risk\n- Contraception counseling essential\n- ESC mWHO Class IV if persistent EF <50% [1][2][3][6]',
    citation: [1, 2, 3, 6],
    next: 'ppcm-disposition',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION & PROGNOSIS
  // =====================================================================

  {
    id: 'ppcm-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition Assessment',
    body: '**Recovery rates:**\n- ~50-70% recover LV function (EF >50%) by 6 months\n- Most recovery occurs within first 2-3 months\n- IPAC Study: 71% recovered EF >50% at 12 months\n\n**Predictors of WORSE prognosis:**\n- LVEF <30% at presentation\n- LV dilation (LVEDD >60 mm)\n- African American race\n- BNP >1860 pg/mL\n- High troponin (>0.4 ng/mL)\n- QRS >120 ms\n- RV dysfunction\n\n**Predictors of BETTER prognosis:**\n- Higher initial LVEF (35-45%)\n- Postpartum diagnosis (vs antepartum)\n- Caucasian/Hispanic ethnicity\n- Early treatment initiation [1][2][5][6]',
    citation: [1, 2, 5, 6],
    calculatorLinks: [
      { id: 'ppcm-prognosis', label: 'Prognosis Factors' },
    ],
    options: [
      {
        label: 'Cardiogenic shock / ICU-level care needed',
        description: 'Inotropes, mechanical support, respiratory failure',
        next: 'ppcm-dispo-icu',
        urgency: 'critical',
      },
      {
        label: 'Severe but stable (EF <35%)',
        description: 'Symptomatic at rest but not in shock',
        next: 'ppcm-dispo-telemetry',
        urgency: 'urgent',
      },
      {
        label: 'Mild-moderate (EF 35-45%, stable)',
        description: 'Ambulatory symptoms, hemodynamically stable',
        next: 'ppcm-dispo-admit',
      },
    ],
  },

  {
    id: 'ppcm-dispo-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU admission criteria:**\n- Cardiogenic shock\n- Requiring inotropes/vasopressors\n- Mechanical circulatory support (IABP, ECMO, Impella)\n- Respiratory failure / intubated\n- Unstable arrhythmias\n- Acute decompensation with end-organ dysfunction\n\n**ICU management:**\n- Continuous hemodynamic monitoring\n- Optimize GDMT as tolerated\n- Cardiology + OB/MFM co-management\n- Early discussion re: advanced therapies (LVAD, transplant)\n- Daily echo to assess recovery\n\n**Prognosis discussion:**\n- PPCM has recovery potential - do not withdraw support prematurely\n- Young patients, no CAD, potentially reversible pathology\n- ECMO/LVAD as bridge to recovery often successful [1][2][3]',
    recommendation: 'ICU admission for hemodynamic monitoring and advanced therapies. High recovery potential - aggressive support warranted.',
    confidence: 'definitive',
    citation: [1, 2, 3],
  },

  {
    id: 'ppcm-dispo-telemetry',
    type: 'result',
    module: 6,
    title: 'Telemetry/Stepdown Admission',
    body: '**Admission to telemetry/stepdown for:**\n- LVEF <35% but hemodynamically stable\n- Symptomatic at rest requiring IV diuretics\n- New diagnosis requiring medication initiation\n- Need for close monitoring during GDMT uptitration\n\n**Inpatient goals:**\n- Achieve euvolemia\n- Initiate/uptitrate GDMT (ACEi/ARB, beta-blocker)\n- Start anticoagulation if indicated\n- Consider bromocriptine\n- Cardiology consult mandatory\n\n**Discharge criteria:**\n- Euvolemic (no orthopnea, minimal edema)\n- Stable on oral medications\n- Ambulatory without significant dyspnea\n- Close outpatient follow-up arranged [1][2][6]',
    recommendation: 'Admit to telemetry for HF management and GDMT optimization. Cardiology consult mandatory. Arrange close outpatient follow-up.',
    confidence: 'definitive',
    citation: [1, 2, 6],
  },

  {
    id: 'ppcm-dispo-admit',
    type: 'result',
    module: 6,
    title: 'Admission - General Floor',
    body: '**Admission criteria (general floor acceptable):**\n- New diagnosis PPCM with LVEF 35-45%\n- Symptomatic HF requiring IV diuretics\n- Hemodynamically stable\n- Need for medication optimization\n\n**Inpatient goals:**\n- Achieve euvolemia\n- Initiate/uptitrate GDMT\n- Echo to assess LV function, thrombus\n- Start anticoagulation if indicated\n- Cardiology consult\n\n**Discharge criteria:**\n- Euvolemic (no orthopnea, minimal edema)\n- Stable on oral medications\n- Ambulatory without significant dyspnea\n- Electrolytes stable\n- Close outpatient follow-up arranged\n\n**Outpatient follow-up:**\n- Cardiology within 1-2 weeks\n- Repeat echo at 4-6 weeks\n- OB/MFM if still pregnant or for postpartum care [1][2][3][6]',
    recommendation: 'Admit for HF management, medication optimization, and monitoring. Arrange close cardiology and OB follow-up.',
    confidence: 'definitive',
    citation: [1, 2, 3, 6],
  },

];

// =====================================================================
// MODULE LABELS
// =====================================================================

export const PERIPARTUM_CARDIOMYOPATHY_MODULE_LABELS = [
  'Recognition & Diagnosis',
  'Stabilization',
  'Medication Management',
  'Anticoagulation',
  'Delivery Considerations',
  'Disposition & Prognosis',
];

export const PERIPARTUM_CARDIOMYOPATHY_NODE_COUNT = 28;

// =====================================================================
// CITATIONS
// =====================================================================

export const PERIPARTUM_CARDIOMYOPATHY_CITATIONS: Citation[] = [
  {
    num: 1,
    text: 'Bauersachs J, et al. Pathophysiology, diagnosis and management of peripartum cardiomyopathy: a position statement from the Heart Failure Association of the ESC. Eur J Heart Fail. 2019;21(7):827-843.',
  },
  {
    num: 2,
    text: 'Davis MB, et al. Peripartum Cardiomyopathy: JACC State-of-the-Art Review. J Am Coll Cardiol. 2020;75(2):207-221.',
  },
  {
    num: 3,
    text: 'Arany Z, Elkayam U. Peripartum Cardiomyopathy. Circulation. 2016;133(14):1397-1409.',
  },
  {
    num: 4,
    text: 'Hilfiker-Kleiner D, et al. Bromocriptine for the treatment of peripartum cardiomyopathy: a multicentre randomized study. Eur Heart J. 2017;38(35):2671-2679.',
  },
  {
    num: 5,
    text: 'Sliwa K, et al. Clinical characteristics of patients from the worldwide registry on peripartum cardiomyopathy (PPCM). Eur J Heart Fail. 2017;19(9):1131-1141.',
  },
  {
    num: 6,
    text: 'McNamara DM, et al. Clinical Outcomes for Peripartum Cardiomyopathy in North America: Results of the IPAC Study. J Am Coll Cardiol. 2015;66(8):905-914.',
  },
  {
    num: 7,
    text: 'Kido K, Guglin M. Anticoagulation Therapy in Specific Cardiomyopathies: Isolated Left Ventricular Noncompaction and Peripartum Cardiomyopathy. J Cardiovasc Pharmacol Ther. 2019;24(1):31-36.',
  },
  {
    num: 8,
    text: 'StatPearls. Peripartum Cardiomyopathy. NCBI Bookshelf. Updated 2024.',
  },
  {
    num: 9,
    text: 'Medscape. Peripartum (Postpartum) Cardiomyopathy Treatment & Management. 2024.',
  },
];
