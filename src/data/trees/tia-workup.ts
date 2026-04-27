// MedKitt - TIA Workup
// Comprehensive ED evaluation of transient ischemic attack
// Presentation & Mimics -> Risk Stratification -> ED Workup -> Etiology -> Treatment -> Disposition
// Sources: AHA/ASA 2021, AHA 2023 Scientific Statement, ACEP 2016, CHANCE/POINT Trials
// 45 nodes total

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const TIA_WORKUP_CRITICAL_ACTIONS = [
  { text: 'Fingerstick glucose immediately (rule out hypoglycemia mimic)', nodeId: 'tia-workup-intro' },
  { text: '12-lead ECG ASAP (detect atrial fibrillation in ~7%)', nodeId: 'tia-workup-intro' },
  { text: 'MRI with DWI when feasible (distinguish TIA from minor stroke)', nodeId: 'tia-brain-imaging' },
  { text: 'CTA head/neck to identify large vessel stenosis/dissection', nodeId: 'tia-vascular-imaging' },
  { text: 'Load DAPT if non-cardioembolic (ASA 162-325 mg + clopidogrel 300-600 mg)', nodeId: 'tia-dapt-treatment' },
  { text: 'Start high-intensity statin immediately (atorvastatin 80 mg)', nodeId: 'tia-statin-treatment' },
  { text: 'Symptomatic carotid stenosis ≥50% requires CEA/CAS within 2 weeks', nodeId: 'tia-large-artery' },
  { text: 'Atrial fibrillation requires anticoagulation (NOT DAPT)', nodeId: 'tia-cardioembolic' },
  { text: 'DAPT x 21 days then transition to aspirin monotherapy', nodeId: 'tia-dapt-treatment' },
  { text: 'Do NOT delay treatment - 90-day stroke risk up to 17.8%, 50% in first 2 days', nodeId: 'tia-start' },
];

export const TIA_WORKUP_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: PRESENTATION & MIMICS
  // =====================================================================

  {
    id: 'tia-start',
    type: 'info',
    module: 1,
    title: 'TIA Workup: Overview',
    body: '**Transient Ischemic Attack (TIA)** is an acute neurovascular syndrome with transient focal neurologic dysfunction attributable to a specific vascular territory, with rapid resolution and **no evidence of infarction on DWI-MRI**.\n\n**Critical points:**\n- Resolved symptoms + Positive DWI = **Ischemic Stroke** (not TIA)\n- Resolved symptoms + Negative DWI = **True TIA**\n- 90-day stroke risk up to 17.8%, with ~50% in first 2 days\n- Up to 60% of TIA clinic referrals are mimics\n\n**This consult covers:**\n1. Presentation and TIA mimics\n2. Risk stratification (ABCD2, Canadian TIA Score)\n3. ED workup (labs, imaging, cardiac)\n4. Etiology (TOAST classification)\n5. Treatment (DAPT, statin, BP)\n6. Disposition (admit vs discharge criteria)\n\n**Goal:** Rapid risk-stratified evaluation to prevent early stroke. [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'tia-abcd2', label: 'ABCD2 Score' },
      { id: 'tia-canadian-score', label: 'Canadian TIA Score' },
    ],
    next: 'tia-definition',

    summary: 'Resolved focal neuro + negative DWI = true TIA; 90-day stroke risk up to 17.8%, 50% in first 2 days',
  },

  {
    id: 'tia-definition',
    type: 'info',
    module: 1,
    title: 'TIA Definition: Tissue vs Time',
    body: '**Modern Tissue-Based Definition (AHA 2009, reaffirmed 2023):**\n- Acute focal neurologic dysfunction\n- Symptoms attributable to a single vascular territory\n- Rapid resolution\n- **No infarction on diffusion-weighted MRI (DWI)**\n\n**Time-Based (Legacy):**\n- Symptoms resolve within 24 hours\n- Limitation: ~30-50% of "TIAs" by time criteria have infarct on MRI\n\n**Clinical Reality:**\n- Most true TIAs last <1 hour (often <15 minutes)\n- Duration >1 hour significantly increases likelihood of DWI positivity\n- If MRI unavailable, reasonable to diagnose TIA clinically with negative CT and symptom resolution <24h\n\n**Epidemiology:**\n- Incidence: 240,000-500,000/year in US\n- 2-day stroke risk: 4-8%\n- 7-day stroke risk: 5-12%\n- 90-day stroke risk: up to 17.8% [1][2]',
    images: [{ src: 'images/tia-workup/dwi-acute-infarct.png', alt: 'Axial brain DWI (left) showing bright signal and ADC map (right) showing dark match indicating acute ischemic infarction', caption: 'DWI MRI: restricted diffusion in acute ischemic stroke — the same sequence distinguishing DWI-positive TIA from true TIA (no infarct). ~30-50% of "TIAs" by time criteria are DWI-positive. (CC BY 4.0)' }],
    citation: [1, 2],
    next: 'tia-classic-presentation',

    summary: 'Tissue-based definition: no infarct on DWI MRI — 30-50% of time-based "TIAs" are actually strokes',
    skippable: true,
  },

  {
    id: 'tia-classic-presentation',
    type: 'info',
    module: 1,
    title: 'Classic TIA Presentation',
    body: '**Red Flags FOR TIA (Against Mimics):**\n\n**Symptom Quality:**\n- **Sudden onset** (maximal at onset, "like a switch")\n- **Negative symptoms** (weakness, numbness, vision loss)\n- **Definite focal deficits** in single vascular territory\n\n**Typical TIA Symptoms:**\n- Unilateral motor weakness\n- Unilateral sensory loss\n- Speech disturbance (aphasia, dysarthria)\n- Monocular vision loss (amaurosis fugax)\n- Hemianopia\n- Ataxia, vertigo with other posterior circulation signs\n\n**Timing:**\n- Duration <1 hour (most <15 minutes)\n- Complete resolution by time of evaluation\n\n**Risk Factors:**\n- Hypertension\n- Diabetes\n- Atrial fibrillation\n- Prior stroke/TIA\n- Carotid stenosis\n- Coronary artery disease [1][3]',
    citation: [1, 3],
    next: 'tia-vascular-territories',

    summary: 'Sudden onset, negative symptoms, focal deficit in single vascular territory, duration <1h, risk factors',
    skippable: true,
  },

  {
    id: 'tia-vascular-territories',
    type: 'info',
    module: 1,
    title: 'Vascular Territory Patterns',
    body: '**Anterior Circulation (Carotid):**\n\n**MCA Territory:**\n- Contralateral face/arm > leg weakness\n- Contralateral sensory loss\n- Aphasia (dominant hemisphere)\n- Neglect (non-dominant hemisphere)\n\n**ACA Territory:**\n- Contralateral leg > arm weakness\n- Personality changes, abulia\n\n**Ophthalmic Artery:**\n- Amaurosis fugax (monocular vision loss)\n- "Curtain coming down" description\n\n**Posterior Circulation (Vertebrobasilar):**\n- Diplopia, dysarthria, dysphagia\n- Crossed deficits (ipsilateral face + contralateral body)\n- Ataxia, vertigo with other brainstem signs\n- Bilateral visual loss\n\n**Key Point:** Symptoms must fit a single vascular territory. Non-anatomic symptoms suggest mimic. [1]',
    citation: [1],
    next: 'tia-mimics',

    summary: 'MCA (face/arm > leg), ACA (leg > arm), ophthalmic (amaurosis), posterior (crossed deficits, diplopia)',
    skippable: true,
  },

  {
    id: 'tia-mimics',
    type: 'info',
    module: 1,
    title: 'TIA Mimics (Up to 60% of Referrals)',
    body: '**Common Mimics:**\n\n| Mimic | Key Differentiating Features |\n|-------|------------------------------|\n| **Migraine with aura** | Gradual spread (5-20 min), positive phenomena (scintillations, tingling), headache follows |\n| **Seizure/Todd\'s** | Convulsive activity, tongue bite, postictal confusion, gradual recovery |\n| **Hypoglycemia** | Rapidly correctable, autonomic symptoms, altered consciousness |\n| **Syncope** | Loss of consciousness, diffuse (not focal), prodrome, rapid recovery |\n| **Vestibular** | Isolated vertigo, positional, Dix-Hallpike positive, no other neuro signs |\n| **TGA** | Isolated memory dysfunction, repetitive questioning, no motor deficits |\n| **Anxiety/panic** | Bilateral symptoms, hyperventilation, prolonged duration |\n\n**Red Flags AGAINST TIA:**\n- Gradual onset or spread\n- Positive phenomena (tingling, scintillations)\n- Loss of consciousness\n- Bilateral symptoms\n- Headache preceding symptoms\n- Non-anatomic distribution [1][3]',
    citation: [1, 3],
    next: 'tia-mimic-question',

    summary: 'Up to 60% of TIA referrals are mimics — migraine, seizure, hypoglycemia, syncope, vestibular, TGA',
  },

  {
    id: 'tia-mimic-question',
    type: 'question',
    module: 1,
    title: 'Clinical Presentation Assessment',
    body: '**Assess the presentation:**\n\nDoes the history suggest true TIA or a potential mimic?\n\n**Favors TIA:**\n- Sudden onset, maximal immediately\n- Negative symptoms (weakness, numbness, vision loss)\n- Single vascular territory\n- Duration <1 hour\n- Vascular risk factors present\n\n**Favors Mimic:**\n- Gradual onset or spread\n- Positive phenomena\n- Non-anatomic distribution\n- Loss of consciousness\n- Preceding headache\n\nWhat is your clinical assessment?',
    citation: [1, 3],
    options: [
      { label: 'Likely TIA', description: 'Typical presentation, proceed with workup', next: 'tia-risk-strat-intro' },
      { label: 'Possible TIA, uncertain', description: 'Atypical features, still warrants workup', next: 'tia-risk-strat-intro' },
      { label: 'Likely mimic', description: 'Features more consistent with mimic', next: 'tia-mimic-workup' },
    ],

    summary: 'Sudden onset + negative symptoms + single territory favors TIA; gradual/positive phenomena favors mimic',
  },

  {
    id: 'tia-mimic-workup',
    type: 'info',
    module: 1,
    title: 'When TIA Mimic Suspected',
    body: '**Even if mimic suspected, consider:**\n\n**Still perform basic TIA workup if:**\n- Any vascular risk factors present\n- Cannot definitively confirm mimic diagnosis\n- First episode (no prior similar events)\n- Patient/family concerned about stroke\n\n**Minimum evaluation:**\n- Fingerstick glucose\n- ECG (rule out afib)\n- Basic neuro exam\n- CT head if any red flags\n\n**Specific mimic workups:**\n- **Migraine:** History, triggers, prior similar events\n- **Seizure:** Witnesses, tongue bite, postictal state, EEG\n- **Hypoglycemia:** Glucose, response to correction\n- **Vestibular:** HINTS exam, Dix-Hallpike\n- **Syncope:** Orthostatics, ECG, cardiac workup\n\n**When in doubt, treat as TIA.** The consequences of missing a TIA far outweigh over-evaluation. [1][2]',
    citation: [1, 2],
    next: 'tia-risk-strat-intro',

    summary: 'Even if mimic suspected, perform basic workup if any risk factors — consequences of missing TIA outweigh over-evaluation',
  },

  // =====================================================================
  // MODULE 2: RISK STRATIFICATION
  // =====================================================================

  {
    id: 'tia-risk-strat-intro',
    type: 'info',
    module: 2,
    title: 'Risk Stratification Overview',
    body: '**Goal:** Identify patients at highest risk for early stroke.\n\n**Available Tools:**\n\n1. **ABCD2 Score** (Classic but limited)\n   - Simple 7-point scale\n   - ACEP 2016: Do NOT use alone to identify safe discharges\n   - Poor sensitivity for low-risk, poor specificity for high-risk\n\n2. **Canadian TIA Score** (Preferred, validated 2021)\n   - 13 variables including imaging findings\n   - Superior discrimination (AUC 0.70 vs 0.60)\n   - Better risk stratification across all categories\n\n3. **High-Risk Features** (Absolute indications)\n   - Override any score\n   - Mandate admission or urgent intervention\n\n**Best Practice:** Use Canadian TIA Score when possible, but always identify high-risk features regardless of score. [2][4]',
    citation: [2, 4],
    calculatorLinks: [
      { id: 'tia-abcd2', label: 'ABCD2 Calculator' },
      { id: 'tia-canadian-score', label: 'Canadian TIA Score' },
    ],
    next: 'tia-abcd2-score',

    summary: 'Canadian TIA Score preferred (AUC 0.70 vs 0.60), but always identify high-risk features regardless of score',
  },

  {
    id: 'tia-abcd2-score',
    type: 'info',
    module: 2,
    title: 'ABCD2 Score',
    body: '**Components:**\n\n| Variable | Criteria | Points |\n|----------|----------|--------|\n| **A**ge | >=60 years | 1 |\n| **B**lood Pressure | SBP >=140 or DBP >=90 | 1 |\n| **C**linical Features | Unilateral weakness | 2 |\n| | Speech disturbance (no weakness) | 1 |\n| **D**uration | >=60 minutes | 2 |\n| | 10-59 minutes | 1 |\n| **D**iabetes | Present | 1 |\n\n**Total: 0-7 points**\n\n**Risk Stratification:**\n\n| Score | Risk | 2-Day Stroke | 7-Day Stroke |\n|-------|------|--------------|---------------|\n| 0-3 | Low | ~1% | ~1.2% |\n| 4-5 | Moderate | ~4% | ~5.9% |\n| 6-7 | High | ~8% | ~11.7% |\n\n**ACEP 2016 Level B:** Do NOT rely on ABCD2 alone to identify patients safe for discharge. Does not account for mechanism (large vessel, cardioembolic). [2][4]',
    citation: [2, 4],
    calculatorLinks: [
      { id: 'tia-abcd2', label: 'ABCD2 Calculator' },
    ],
    next: 'tia-canadian-score',

    summary: 'ABCD2 0-7: do NOT rely alone for safe discharge (ACEP Level B) — does not account for mechanism',
    skippable: true,
  },

  {
    id: 'tia-canadian-score',
    type: 'info',
    module: 2,
    title: 'Canadian TIA Score (Preferred)',
    body: '**13 Variables - Superior to ABCD2**\n\n**Clinical (9):**\n| Variable | Points |\n|----------|--------|\n| First TIA ever | +2.3 |\n| Duration >=10 min | +2.0 |\n| History of carotid stenosis | +2.0 |\n| On antiplatelet therapy | +1.5 |\n| Gait disturbance | +1.3 |\n| Unilateral weakness | +1.2 |\n| History of vertigo | -0.9 |\n| DBP >=110 mmHg | +0.6 |\n| Dysarthria or aphasia | +0.8 |\n\n**Investigation (4):**\n| Variable | Points |\n|----------|--------|\n| Afib on ECG | +1.2 |\n| Infarction on CT | +1.5 |\n| Platelets >=400 | +1.5 |\n| Glucose >=270 mg/dL | +1.0 |\n\n**7-Day Risk:**\n| Category | Score | Risk |\n|----------|-------|------|\n| Minimal | <-1 | <0.5% |\n| Low | -1 to 3 | 0.5-2.5% |\n| Medium | 4-7 | 2.3% |\n| High | 8-13 | 5.9% |\n| Critical | >13 | >10% |\n\n**Validation:** AUC 0.70 vs ABCD2 0.60 (p<0.001) in 7,607 patients. [4]',
    citation: [4],
    calculatorLinks: [
      { id: 'tia-canadian-score', label: 'Canadian TIA Calculator' },
    ],
    next: 'tia-high-risk-features',

    summary: '13-variable score with investigation findings — superior to ABCD2, 5 risk tiers from minimal to critical',
    skippable: true,
  },

  {
    id: 'tia-high-risk-features',
    type: 'info',
    module: 2,
    title: 'High-Risk Features (Override Scores)',
    body: '**Admit regardless of risk score if ANY present:**\n\n1. **Crescendo TIA**\n   - >1 TIA within 7 days\n   - Indicates unstable plaque or ongoing embolization\n\n2. **Large Vessel Stenosis >=50%**\n   - Carotid or intracranial\n   - May need urgent intervention\n\n3. **Atrial Fibrillation**\n   - New or known, requires anticoagulation\n   - Cannot safely start DOAC without observation\n\n4. **Acute Infarct on Imaging**\n   - DWI positive = stroke, not TIA\n   - Higher risk even if symptoms resolved\n\n5. **Known Hypercoagulable State**\n   - May need specialized anticoagulation\n\n6. **Cardioembolic Source**\n   - LV thrombus, valvular disease\n\n7. **Fluctuating/Stuttering Symptoms**\n   - Ongoing ischemia concern\n\n8. **Cannot Complete Outpatient Workup <48-72h**\n   - No rapid TIA clinic access [1][2]',
    citation: [1, 2],
    next: 'tia-risk-question',

    summary: 'Admit regardless of score: crescendo TIA, stenosis >=50%, afib, DWI+, hypercoagulable, fluctuating symptoms',
    safetyLevel: 'warning',
  },

  {
    id: 'tia-risk-question',
    type: 'question',
    module: 2,
    title: 'Risk Assessment',
    body: '**Based on your assessment:**\n\n- Review ABCD2 and/or Canadian TIA Score\n- Check for high-risk features\n- Consider ability to complete outpatient workup\n\nWhat is the patient\'s risk category?',
    citation: [1, 2, 4],
    options: [
      { label: 'High-risk features present', description: 'Admission indicated', next: 'tia-workup-intro', urgency: 'critical' },
      { label: 'Moderate-high risk score (no high-risk features)', description: 'Consider observation or admission', next: 'tia-workup-intro', urgency: 'urgent' },
      { label: 'Low risk (score AND features)', description: 'May be discharge candidate with rapid follow-up', next: 'tia-workup-intro' },
    ],

    summary: 'Combine risk score + high-risk features + outpatient workup access for disposition decision',
  },

  // =====================================================================
  // MODULE 3: ED WORKUP
  // =====================================================================

  {
    id: 'tia-workup-intro',
    type: 'info',
    module: 3,
    title: 'ED Workup Overview',
    body: '**Immediate Assessment (STAT):**\n- Fingerstick glucose (rule out hypoglycemia mimic)\n- Vital signs including BP in both arms\n- Focused neuro exam (document any deficits)\n- 12-lead ECG (detect afib - found in ~7%)\n\n**The workup serves dual purposes:**\n1. Identify treatable etiology\n2. Risk stratify for disposition\n\n**Required Elements:**\n- Laboratory studies\n- Brain imaging (CT, ideally MRI)\n- Vascular imaging (CTA)\n- Cardiac evaluation (ECG, consider echo)\n\n**ACEP 2016 Recommendations:**\n- Level B: Obtain MRI with DWI when feasible\n- Level B: Obtain cervical vascular imaging (CTA, MRA, or US) [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'tia-workup-checklist', label: 'Workup Checklist' },
    ],
    next: 'tia-labs',

    summary: 'STAT glucose + ECG, then labs, brain imaging (CT/MRI), vascular imaging (CTA), cardiac eval',
  },

  {
    id: 'tia-labs',
    type: 'info',
    module: 3,
    title: 'Laboratory Studies',
    body: '**Required Labs:**\n\n| Test | Rationale |\n|------|-----------|\n| **Fingerstick glucose** | Hypoglycemia mimic |\n| **CBC** | Anemia, thrombocytosis, polycythemia |\n| **BMP/CMP** | Electrolytes, renal function (for contrast) |\n| **PT/INR, PTT** | Baseline before anticoagulation |\n| **Lipid panel** | Guides statin therapy |\n| **HbA1c** | Undiagnosed diabetes |\n\n**Consider:**\n| Test | When |\n|------|------|\n| **Troponin** | Cardiac symptoms, concern for MI |\n| **TSH** | Afib detected |\n| **Hypercoagulable panel** | Young patient, no risk factors, cryptogenic |\n\n**Key Finding for Canadian TIA Score:**\n- Glucose >=270 mg/dL = +1.0 points\n- Platelets >=400 = +1.5 points [1][2]',
    citation: [1, 2],
    next: 'tia-brain-imaging',

    summary: 'Glucose, CBC, BMP, coags, lipids, HbA1c — glucose >=270 and platelets >=400 affect Canadian TIA score',
    skippable: true,
  },

  {
    id: 'tia-brain-imaging',
    type: 'info',
    module: 3,
    title: 'Brain Imaging',
    body: '**Non-Contrast CT Head:**\n- **Role:** Rule out hemorrhage, mass, large established stroke\n- **Limitation:** Low sensitivity for acute ischemic infarct (~16-30%)\n- **Obtain:** Immediately in ED\n\n**MRI with DWI (Preferred):**\n- **Role:** Distinguish true TIA (negative) from minor stroke (positive)\n- **Sensitivity:** ~80-90% for acute infarct in first 24h\n- **Critical Finding:** ~30-50% of clinical "TIAs" have infarct = stroke\n- **Timing:** Ideally within 24 hours of symptom onset\n\n**If DWI Positive:**\n- Patient has had a stroke, not TIA\n- Higher recurrent stroke risk\n- Same treatment approach but changes risk stratification\n\n**AHA 2023:** "When MRI cannot be obtained acutely, it remains reasonable to make a clinical diagnosis of TIA based on negative NCCT and symptom resolution within 24 hours." [1][2]',
    citation: [1, 2],
    next: 'tia-vascular-imaging',

    summary: 'MRI DWI preferred — 30-50% of clinical TIAs have infarct; CT alone has only 16-30% sensitivity',
  },

  {
    id: 'tia-vascular-imaging',
    type: 'info',
    module: 3,
    title: 'Vascular Imaging',
    body: '**CTA Head and Neck (Preferred in ED):**\n- Identifies large vessel stenosis, occlusion, dissection\n- ~50% of TIA patients have abnormal cerebrovascular imaging\n- Fast, widely available, high accuracy\n\n**Critical Findings:**\n- Carotid stenosis >=50% (may need urgent intervention)\n- Intracranial stenosis\n- Arterial dissection\n\n**Alternatives:**\n\n| Modality | Pros | Cons |\n|----------|------|------|\n| **Carotid Doppler US** | No contrast, bedside | Limited intracranial view |\n| **MRA** | No radiation, good accuracy | May overestimate stenosis |\n| **Conventional angiography** | Gold standard | Invasive, reserved for discordant results |\n\n**Stenosis Grading (NASCET):**\n- <50%: Medical management\n- 50-69%: Consider CEA/CAS\n- >=70%: CEA/CAS recommended [1][2]',
    citation: [1, 2],
    next: 'tia-cardiac-workup',

    summary: 'CTA head/neck to identify stenosis >=50%, dissection — 50% of TIA patients have abnormal vascular imaging',
  },

  {
    id: 'tia-cardiac-workup',
    type: 'info',
    module: 3,
    title: 'Cardiac Evaluation',
    body: '**ECG (Required):**\n- Detect atrial fibrillation/flutter (~7% of TIA/stroke)\n- Evidence of prior MI, LVH\n- Obtain ASAP, ideally before disposition\n\n**Echocardiography:**\n\n| Type | When | Detects |\n|------|------|---------||\n| **TTE** | All patients eventually | LV thrombus, valvular disease, wall motion abnormalities |\n| **TEE** | Suspected cardioembolic, young patient, no clear etiology | PFO, LA appendage thrombus, aortic arch atheroma |\n| **Bubble study** | Cryptogenic in younger patient | Right-to-left shunt (PFO) |\n\n**Can defer echo to outpatient if:**\n- Low-risk features\n- Rapid follow-up available\n- No afib on ECG\n\n**Extended Cardiac Monitoring:**\n- 24-48h Holter if high clinical suspicion\n- Extended monitoring (14-30 days) if cryptogenic\n- AF detected in additional 5-15% vs ED ECG alone [1][2]',
    citation: [1, 2],
    next: 'tia-workup-complete-question',

    summary: 'ECG detects afib in ~7%; extended monitoring finds 5-15% more; TTE/TEE for cardioembolic source',
  },

  {
    id: 'tia-workup-complete-question',
    type: 'question',
    module: 3,
    title: 'Workup Status',
    body: '**Based on completed workup, what did you find?**\n\nReview:\n- CT/MRI findings\n- CTA results (stenosis?)\n- ECG (afib?)\n- Labs (glucose, platelets)\n\nWhat are the key findings?',
    citation: [1, 2],
    options: [
      { label: 'Significant stenosis (>=50%) identified', description: 'May need urgent intervention', next: 'tia-large-artery', urgency: 'critical' },
      { label: 'Atrial fibrillation detected', description: 'Cardioembolic source', next: 'tia-cardioembolic', urgency: 'urgent' },
      { label: 'Infarct on imaging (DWI positive)', description: 'This is a stroke, not TIA', next: 'tia-dwi-positive', urgency: 'urgent' },
      { label: 'Workup negative/non-specific', description: 'Consider other etiologies', next: 'tia-etiology-intro' },
    ],

    summary: 'Route by key finding: significant stenosis, afib, DWI+ infarct, or negative workup',
  },

  // =====================================================================
  // MODULE 4: ETIOLOGY
  // =====================================================================

  {
    id: 'tia-etiology-intro',
    type: 'info',
    module: 4,
    title: 'TIA Etiology (TOAST Classification)',
    body: '**Understanding etiology guides treatment:**\n\n| Category | Prevalence | Key Features |\n|----------|------------|---------------|\n| **Large artery atherosclerosis** | 15-25% | Carotid/intracranial stenosis >=50% |\n| **Cardioembolism** | 20-30% | Afib, LV thrombus, valve disease |\n| **Small vessel (lacunar)** | 20-25% | HTN/DM, subcortical location |\n| **Other determined** | 5% | Dissection, hypercoagulable, vasculitis |\n| **Cryptogenic** | 25-40% | No clear etiology after workup |\n\n**Treatment implications:**\n- Large artery: Consider revascularization\n- Cardioembolic: Anticoagulation, not DAPT\n- Small vessel/cryptogenic: DAPT pathway\n- Other: Treat specific cause\n\n**Cryptogenic workup:**\n- Extended cardiac monitoring\n- TEE with bubble study\n- Hypercoagulable panel if young [1][5]',
    citation: [1, 5],
    next: 'tia-etiology-question',

    summary: 'TOAST classification guides treatment — large artery, cardioembolic, small vessel, other, cryptogenic (25-40%)',
    skippable: true,
  },

  {
    id: 'tia-etiology-question',
    type: 'question',
    module: 4,
    title: 'Identified Etiology',
    body: '**Based on workup, what is the suspected etiology?**\n\nSelect the most likely mechanism:',
    citation: [1, 5],
    options: [
      { label: 'Large artery atherosclerosis', description: 'Carotid or intracranial stenosis', next: 'tia-large-artery' },
      { label: 'Cardioembolic (Afib)', description: 'Atrial fibrillation identified', next: 'tia-cardioembolic' },
      { label: 'Cardioembolic (other source)', description: 'PFO, LV thrombus, valve', next: 'tia-cardioembolic-other' },
      { label: 'Small vessel/lacunar', description: 'HTN/DM, subcortical pattern', next: 'tia-small-vessel' },
      { label: 'Dissection suspected', description: 'Neck pain, trauma, young patient', next: 'tia-dissection' },
      { label: 'Cryptogenic/unknown', description: 'No clear etiology identified', next: 'tia-cryptogenic' },
    ],

    summary: 'Select most likely mechanism to determine treatment pathway',
  },

  {
    id: 'tia-large-artery',
    type: 'info',
    module: 4,
    title: 'Large Artery Atherosclerosis',
    body: '**Carotid Stenosis Management:**\n\n| Stenosis | Management |\n|----------|------------|\n| <50% | Medical management only |\n| 50-69% | Consider CEA/CAS, medical reasonable |\n| >=70% | CEA/CAS recommended if life expectancy >5 years |\n\n**Timing is Critical:**\n- **Within 2 weeks** of TIA for symptomatic stenosis >=50%\n- **CEA preferred over CAS** if within 7 days (lower stroke risk)\n- NNT = 3 if CEA within 2 weeks\n- NNT = 6 if delayed 2-4 weeks\n\n**CEA vs CAS:**\n| | CEA | CAS |\n|---|-----|-----|\n| **Preferred if** | Within 2 weeks, age >70 | High surgical risk, radiation, prior CEA |\n| **Early stroke risk** | 1.4% if within 2 weeks | 8.3% if within first week |\n\n**Intracranial Stenosis:**\n- Medical management preferred (SAMMPRIS trial)\n- Consider intervention only if refractory [1][5]',
    citation: [1, 5],
    next: 'tia-treatment-intro',

    summary: 'Symptomatic stenosis >=50% needs CEA/CAS within 2 weeks — NNT=3 if done within 2 weeks',
  },

  {
    id: 'tia-cardioembolic',
    type: 'info',
    module: 4,
    title: 'Cardioembolic: Atrial Fibrillation',
    body: '**Afib is the most common cardioembolic source.**\n\n**Requires anticoagulation, NOT DAPT:**\n\n| Agent | Dose | Notes |\n|-------|------|-------|\n| [Apixaban](#/drug/apixaban/atrial fibrillation) (preferred) | 5 mg BID | Lowest bleeding risk |\n| [Rivaroxaban](#/drug/rivaroxaban/atrial fibrillation) | 20 mg daily with food | Once daily |\n| [Dabigatran](#/drug/dabigatran/pe dvt) | 150 mg BID | Reversible with idarucizumab |\n| [Warfarin](#/drug/warfarin/atrial fibrillation) | INR 2-3 | If DOAC contraindicated, mechanical valve |\n\n**Dose reductions (apixaban):**\n>=2 of: age >=80, weight <=60 kg, Cr >=1.5 -> 2.5 mg BID\n\n**Timing of Anticoagulation Start:**\n- TIA (no infarct): Can start immediately\n- Minor stroke: 1-3 days\n- Moderate stroke: 3-6 days\n- Large stroke: 12-14 days\n\n**"1-2-3-4 Day Rule"** for DOACs after stroke based on infarct size. [1][5]',
    citation: [1, 5],
    next: 'tia-disposition-intro',

    summary: 'Afib requires anticoagulation NOT DAPT — apixaban preferred, start immediately for TIA without infarct',
    safetyLevel: 'warning',
  },

  {
    id: 'tia-cardioembolic-other',
    type: 'info',
    module: 4,
    title: 'Cardioembolic: Other Sources',
    body: '**Patent Foramen Ovale (PFO):**\n\n**When to evaluate:**\n- Cryptogenic stroke/TIA\n- Age <60 years (primary guideline recommendation)\n- Consider in older patients with high-risk PFO features\n\n**High-risk PFO features:**\n- Atrial septal aneurysm\n- Large shunt (>20 microbubbles)\n- Hypermobile septum\n\n**PFO Closure Evidence (REDUCE, CLOSE, DEFENSE-PFO):**\n- HR 0.41 for stroke recurrence vs medical therapy\n- ARR 3.4% at 5 years\n- Greatest benefit in patients <60 with high-risk features\n\n**Other Cardioembolic Sources:**\n- LV thrombus (recent MI, cardiomyopathy) - anticoagulation\n- Mechanical valve - warfarin\n- Infective endocarditis - treat infection, avoid anticoagulation\n- Atrial myxoma - surgical excision [1][5]',
    citation: [1, 5],
    next: 'tia-treatment-intro',

    summary: 'PFO closure reduces stroke recurrence HR 0.41 in patients <60 with high-risk features',
    skippable: true,
  },

  {
    id: 'tia-small-vessel',
    type: 'info',
    module: 4,
    title: 'Small Vessel Disease (Lacunar)',
    body: '**Typical features:**\n- HTN, diabetes as primary risk factors\n- Subcortical or brainstem location on imaging\n- Typical lacunar syndromes:\n  - Pure motor hemiparesis\n  - Pure sensory stroke\n  - Ataxic hemiparesis\n  - Dysarthria-clumsy hand\n  - Sensorimotor stroke\n\n**Treatment:**\n- DAPT pathway (same as large artery without significant stenosis)\n- Aggressive risk factor control:\n  - BP target <130/80\n  - HbA1c target <7%\n  - High-intensity statin\n\n**No benefit from revascularization**\n\n**Prognosis:**\n- Generally lower early recurrence risk than large artery\n- Cumulative white matter disease increases dementia risk [1][5]',
    citation: [1, 5],
    next: 'tia-treatment-intro',

    summary: 'HTN/DM subcortical pattern — DAPT pathway, aggressive BP <130/80 and HbA1c <7%, no revascularization',
    skippable: true,
  },

  {
    id: 'tia-dissection',
    type: 'info',
    module: 4,
    title: 'Cervical Artery Dissection',
    body: '**When to Suspect:**\n- Younger patient (<55)\n- Recent trauma or neck manipulation\n- Neck pain or headache\n- Horner\'s syndrome (carotid dissection)\n- CN deficits (vertebral dissection)\n\n**Imaging:**\n- CTA or MRA neck with fat-saturated sequences\n- Look for intramural hematoma, string sign, pseudoaneurysm\n\n**Treatment:**\n- Antiplatelet vs anticoagulation\n- CADISS trial: No difference between ASA and anticoagulation\n- Most centers use antiplatelet therapy\n- Duration: 3-6 months then reassess\n\n**Contraindications to anticoagulation:**\n- Large infarct\n- Intracranial extension\n- Pseudoaneurysm (relative)\n\n**Follow-up imaging** at 3-6 months to assess healing. [1][5]',
    citation: [1, 5],
    next: 'tia-treatment-intro',

    summary: 'Young patient, neck pain, Horner syndrome — antiplatelet preferred per CADISS trial, 3-6 months',
  },

  {
    id: 'tia-cryptogenic',
    type: 'info',
    module: 4,
    title: 'Cryptogenic TIA',
    body: '**No clear etiology after routine workup (25-40%)**\n\n**Extended Workup:**\n\n1. **Prolonged cardiac monitoring**\n   - 14-30 day event monitor\n   - Implantable loop recorder (highest yield)\n   - Detects occult afib in 5-15% additional patients\n\n2. **TEE with bubble study**\n   - PFO evaluation\n   - LA appendage thrombus\n   - Aortic arch atheroma\n\n3. **Hypercoagulable workup** (if indicated)\n   - Factor V Leiden\n   - Prothrombin G20210A\n   - Protein C/S, Antithrombin III\n   - Antiphospholipid antibodies\n\n**Indications for hypercoagulable workup:**\n- Age <55 without traditional risk factors\n- History of VTE or recurrent pregnancy loss\n- Family history of thrombosis\n\n**Treatment:** DAPT pathway while awaiting extended workup. [1][5]',
    citation: [1, 5],
    next: 'tia-treatment-intro',

    summary: '25-40% cryptogenic — extended cardiac monitoring, TEE with bubble study, hypercoagulable panel if indicated',
    skippable: true,
  },

  {
    id: 'tia-dwi-positive',
    type: 'info',
    module: 4,
    title: 'DWI Positive: This is a Stroke',
    body: '**If DWI shows acute infarct, this is an ischemic stroke, not TIA.**\n\n**Implications:**\n- Higher recurrent stroke risk than true TIA\n- Same acute treatment approach\n- May influence anticoagulation timing if cardioembolic\n\n**For Minor Stroke (NIHSS 0-3):**\n- DAPT pathway still appropriate\n- Same CHANCE/POINT protocols apply\n- 21 days of DAPT then aspirin monotherapy\n\n**Differences from TIA:**\n- Document as "minor ischemic stroke" not TIA\n- May warrant longer observation\n- If cardioembolic: delay anticoagulation per 1-2-3-4 rule\n\n**Continue with treatment pathway below.** [1][5]',
    citation: [1, 5],
    next: 'tia-treatment-intro',

    summary: 'DWI positive = ischemic stroke not TIA — higher recurrence risk, same acute treatment, document as stroke',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 5: TREATMENT
  // =====================================================================

  {
    id: 'tia-treatment-intro',
    type: 'info',
    module: 5,
    title: 'Treatment Overview',
    body: '**Acute treatment goals:**\n1. Prevent early stroke (DAPT if non-cardioembolic)\n2. Initiate secondary prevention (statin, BP)\n3. Arrange appropriate disposition\n\n**Treatment depends on etiology:**\n\n| Etiology | Treatment |\n|----------|----------|\n| Non-cardioembolic | DAPT (POINT/CHANCE) |\n| Cardioembolic (Afib) | Anticoagulation |\n| Large vessel stenosis | DAPT + revascularization eval |\n| Dissection | Antiplatelet (or anticoagulation) |\n\n**Universal treatments:**\n- High-intensity statin\n- Blood pressure management\n- Risk factor modification [1][6]',
    citation: [1, 6],
    calculatorLinks: [
      { id: 'tia-dapt-protocol', label: 'DAPT Protocol Calculator' },
    ],
    next: 'tia-dapt-treatment',

    summary: 'Non-cardioembolic = DAPT, cardioembolic = anticoagulation; all get statin + BP management',
  },

  {
    id: 'tia-dapt-treatment',
    type: 'info',
    module: 5,
    title: 'DAPT: POINT/CHANCE Protocol',
    body: '**Indication:** High-risk TIA (ABCD2 >=4) or minor stroke (NIHSS <=3), non-cardioembolic.\n\n**Based on CHANCE and POINT Trials:**\n\n**LOADING:**\n- Aspirin 162-325 mg (if not already on)\n- Clopidogrel 300-600 mg loading dose\n\n**MAINTENANCE:**\n- Aspirin 81 mg daily\n- Clopidogrel 75 mg daily\n\n**DURATION:**\n- 21 days of DAPT (optimal per pooled analysis)\n- Then transition to aspirin monotherapy\n\n**TIMING:**\n- Ideally within 12-24 hours of symptom onset\n- May consider up to 7 days after onset\n\n**Who NOT to give DAPT:**\n- Cardioembolic TIA (needs anticoagulation)\n- Moderate-severe stroke (NIHSS >3)\n- High bleeding risk\n- Already on anticoagulation [6][7]',
    citation: [6, 7],
    treatment: {
      firstLine: {
        drug: 'Clopidogrel',
        dose: '300-600 mg loading, then 75 mg daily',
        route: 'PO',
        frequency: 'Daily after load',
        duration: '21 days',
        notes: 'Give with aspirin 81 mg daily. Load both if not already on aspirin.',
      },
      alternative: {
        drug: 'Aspirin',
        dose: '162-325 mg loading, then 81 mg daily',
        route: 'PO',
        frequency: 'Daily',
        duration: 'Long-term after 21 days of DAPT',
        notes: 'Continue aspirin monotherapy indefinitely after DAPT period.',
      },
      monitoring: 'Monitor for bleeding. Reassess at 21 days for transition to aspirin monotherapy.',
    },
    calculatorLinks: [
      { id: 'tia-dapt-protocol', label: 'DAPT Dosing Calculator' },
    ],
    next: 'tia-statin-treatment',

    summary: 'ASA 162-325mg + clopidogrel 300-600mg load, then 81mg + 75mg daily x 21 days, then ASA monotherapy',
  },

  {
    id: 'tia-statin-treatment',
    type: 'info',
    module: 5,
    title: 'High-Intensity Statin',
    body: '**Based on SPARCL Trial:**\n- Atorvastatin 80 mg reduced stroke recurrence by 16%\n- Reduced fatal stroke by 43%\n\n**Protocol:**\n\n**PREFERRED:**\n- Atorvastatin 40-80 mg daily\n- OR Rosuvastatin 20-40 mg daily\n\n**TARGET:**\n- LDL <70 mg/dL (some guidelines <55 mg/dL for very high risk)\n- OR >=50% reduction from baseline\n\n**TIMING:**\n- Start immediately in ED if not contraindicated\n- Do NOT wait for lipid panel results\n\n**Contraindications:**\n- Active liver disease\n- Known intolerance\n- Pregnancy\n\n**Consider adding ezetimibe** if LDL not at goal on high-intensity statin. [1][6]',
    citation: [1, 6],
    treatment: {
      firstLine: {
        drug: 'Atorvastatin',
        dose: '80 mg',
        route: 'PO',
        frequency: 'Daily',
        duration: 'Long-term',
        notes: 'Start immediately. Target LDL <70 mg/dL.',
      },
      monitoring: 'LFTs at baseline if risk factors. Recheck lipid panel at 4-12 weeks.',
    },
    next: 'tia-bp-treatment',

    summary: 'Atorvastatin 80mg daily — start immediately, do NOT wait for lipid panel, reduces stroke recurrence 16%',
  },

  {
    id: 'tia-bp-treatment',
    type: 'info',
    module: 5,
    title: 'Blood Pressure Management',
    body: '**Acute Phase (First 24-48 hours):**\n\n**Permissive hypertension** - Do not aggressively lower unless:\n- SBP >220 mmHg or DBP >120 mmHg\n- Hypertensive emergency with end-organ damage\n- Receiving thrombolytics (target <185/110)\n\n**For TIA:** Less concern for penumbra, so can treat elevated BP more aggressively than stroke.\n\n**Long-Term Target:**\n- <130/80 mmHg (AHA/ASA 2021)\n- Initiate/resume antihypertensives before discharge\n\n**Preferred agents:**\n- ACE inhibitor or ARB\n- Thiazide diuretic\n- Combination often needed\n\n**Glucose Management:**\n- Target 140-180 mg/dL acutely\n- Avoid hypoglycemia\n- HbA1c target <7% long-term [1][6]',
    citation: [1, 6],
    next: 'tia-treatment-summary',

    summary: 'Permissive HTN acutely (unless >220/120), long-term target <130/80, avoid hypoglycemia',
  },

  {
    id: 'tia-treatment-summary',
    type: 'info',
    module: 5,
    title: 'Treatment Summary by Etiology',
    body: '**Non-Cardioembolic (Large artery, small vessel, cryptogenic):**\n- DAPT x 21 days then aspirin monotherapy\n- High-intensity statin\n- BP management (<130/80)\n- Revascularization if symptomatic stenosis >=50%\n\n**Cardioembolic (Afib):**\n- Anticoagulation (DOAC preferred)\n- No DAPT (increased bleeding without benefit)\n- Rate/rhythm control\n- High-intensity statin, BP management\n\n**Dissection:**\n- Antiplatelet (aspirin) for 3-6 months\n- Some centers use anticoagulation\n- Follow-up imaging at 3-6 months\n\n**All patients:**\n- Smoking cessation\n- Weight management\n- Exercise counseling\n- Diabetes control [1][6]',
    citation: [1, 6],
    next: 'tia-disposition-intro',

    summary: 'Non-cardioembolic = DAPT x 21d; afib = DOAC; dissection = antiplatelet 3-6mo; all get statin + BP control',
    skippable: true,
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'tia-disposition-intro',
    type: 'info',
    module: 6,
    title: 'Disposition Overview',
    body: '**Disposition Options:**\n\n1. **Admit** - For high-risk features or incomplete workup\n\n2. **ED Observation (23-hour)** - Moderate risk, can complete workup\n\n3. **Discharge with rapid follow-up** - Low risk with complete workup\n\n**Key Questions:**\n- Are high-risk features present?\n- Is workup complete (or can it be completed rapidly)?\n- Is rapid TIA clinic available (<48 hours)?\n- Can patient recognize warning signs and return?\n\n**EXPRESS Trial Lesson:**\n- Rapid assessment (<1 day) vs delayed (3 days)\n- 80% reduction in 90-day stroke risk (2.1% vs 10.3%)\n- Speed matters more than setting [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'tia-disposition', label: 'Disposition Calculator' },
    ],
    next: 'tia-admission-criteria',

    summary: 'EXPRESS trial: rapid assessment (<1 day) = 80% reduction in 90-day stroke risk — speed matters more than setting',
  },

  {
    id: 'tia-admission-criteria',
    type: 'info',
    module: 6,
    title: 'Admission Criteria',
    body: '**Admit if ANY of the following:**\n\n**High-risk features:**\n- Crescendo TIA (>1 in 7 days)\n- Atrial fibrillation requiring anticoagulation initiation\n- Symptomatic carotid stenosis >=50%\n- Acute infarct on DWI\n- Known hypercoagulable state\n- Cardioembolic source identified\n\n**Clinical instability:**\n- Fluctuating or recurrent symptoms\n- Hypertensive emergency\n- Medical comorbidities requiring inpatient management\n- New onset afib with RVR\n\n**Workup/follow-up barriers:**\n- Cannot complete outpatient workup within 48-72 hours\n- No rapid TIA clinic access\n- Patient unable to return promptly\n- ABCD2 2-7 AND workup cannot be completed within 7 days [1][2]',
    citation: [1, 2],
    next: 'tia-observation-criteria',

    summary: 'Admit for crescendo TIA, afib, stenosis >=50%, DWI+, fluctuating symptoms, or no rapid follow-up',
  },

  {
    id: 'tia-observation-criteria',
    type: 'info',
    module: 6,
    title: 'ED Observation Unit Criteria',
    body: '**Consider 23-hour observation if:**\n\n- Moderate risk (ABCD2 3-5 or Canadian TIA medium risk)\n- All imaging/workup can be completed in observation period\n- Neurology consultation available\n- No high-risk features\n\n**Observation Unit Protocol:**\n\n| Action | Timing |\n|--------|---------|\n| CTA head/neck | Complete |\n| MRI brain with DWI | If available |\n| Continuous telemetry | Ongoing |\n| Echo (TTE) | During obs |\n| Neurology consultation | During obs |\n| Initiate secondary prevention | Immediately |\n\n**Goals during observation:**\n- Complete vascular imaging\n- 24-hour cardiac monitoring\n- Initiate DAPT/anticoagulation per etiology\n- Arrange close outpatient follow-up [1][2]',
    citation: [1, 2],
    next: 'tia-discharge-criteria',

    summary: '23-hour obs for moderate risk — complete CTA, MRI, telemetry, echo, neurology consult during stay',
    skippable: true,
  },

  {
    id: 'tia-discharge-criteria',
    type: 'info',
    module: 6,
    title: 'Discharge Criteria',
    body: '**May discharge from ED if ALL of the following:**\n\n1. **Low-risk score**\n   - ABCD2 0-2 AND Canadian TIA minimal/low risk\n\n2. **No high-risk features on history/exam**\n\n3. **Imaging complete and reassuring:**\n   - CT head negative for hemorrhage/mass\n   - CTA shows no significant stenosis (<50%)\n\n4. **ECG shows no atrial fibrillation**\n\n5. **Reliable rapid outpatient follow-up within 24-48 hours**\n\n6. **Patient can recognize warning signs and return immediately**\n\n7. **Secondary prevention initiated:**\n   - DAPT loaded (ASA + clopidogrel)\n   - Statin started\n\n**Document:**\n- Risk stratification performed\n- Workup completed\n- Follow-up arranged\n- Discharge instructions given [1][2]',
    citation: [1, 2],
    next: 'tia-rapid-clinic',

    summary: 'Discharge if: low-risk score + no high-risk features + CTA <50% + no afib + DAPT loaded + follow-up <48h',
  },

  {
    id: 'tia-rapid-clinic',
    type: 'info',
    module: 6,
    title: 'Rapid TIA Clinic Requirements',
    body: '**For Safe Outpatient Management:**\n\n**TIMING:** Seen within 24-48 hours (ideally <24 hours)\n\n**WORKUP COMPLETED:**\n- MRI brain with DWI\n- Vascular imaging (if not done in ED)\n- Echocardiogram (TTE, consider TEE if indicated)\n- Extended cardiac monitoring if no AF on ECG\n- Hypercoagulable workup if indicated\n\n**TREATMENT INITIATED:**\n- DAPT or anticoagulation (per etiology)\n- High-intensity statin\n- BP management plan\n- Risk factor modification\n\n**FOLLOW-UP ARRANGED:**\n- Neurology follow-up\n- Vascular surgery if significant stenosis\n- Cardiology if cardiac source\n- PCP for risk factor management\n\n**If rapid TIA clinic NOT available within 48h, admit or observe.** [1][2]',
    citation: [1, 2],
    next: 'tia-return-precautions',

    summary: 'TIA clinic within 24-48h — if unavailable, admit or observe; complete MRI, vascular imaging, echo, cardiac monitoring',
  },

  {
    id: 'tia-return-precautions',
    type: 'info',
    module: 6,
    title: 'Return Precautions',
    body: '**Instruct patient to return IMMEDIATELY if:**\n\n**New or worsening symptoms:**\n- Weakness or numbness (especially one-sided)\n- Speech difficulty\n- Vision changes\n- Severe headache\n- Dizziness or loss of balance\n- Confusion\n\n**Stroke warning signs (BE FAST):**\n- **B**alance - sudden dizziness, loss of coordination\n- **E**yes - sudden vision changes\n- **F**ace - facial droop\n- **A**rms - arm weakness\n- **S**peech - slurred speech, difficulty speaking\n- **T**ime - call 911 immediately\n\n**Other concerns:**\n- Symptoms return or worsen\n- Bleeding on antiplatelet therapy\n- Unable to take medications\n- Missed follow-up appointment\n\n**Provide written instructions** with stroke warning signs. [1][2]',
    citation: [1, 2],
    next: 'tia-neuro-consult',

    summary: 'BE FAST stroke warning signs — return immediately for any new weakness, speech, vision, or balance changes',
  },

  {
    id: 'tia-neuro-consult',
    type: 'info',
    module: 6,
    title: 'When to Consult Neurology',
    body: '**Consult in ED:**\n- Uncertain diagnosis (TIA vs mimic)\n- Fluctuating or recurrent symptoms\n- Significant large vessel stenosis\n- Consideration for thrombolysis (if symptoms ongoing)\n- Any admission consideration\n- Complex etiology or treatment decisions\n\n**Arrange Outpatient Follow-up:**\n- All TIA patients should see neurology\n- Ideally within 48 hours, maximum 1 week\n- Sooner if any concerning features\n\n**Stroke Center Transfer Criteria:**\n- Symptomatic carotid stenosis requiring urgent intervention\n- Consideration for endovascular intervention\n- Need for TEE or advanced workup not available\n- Neurology expertise not available locally\n- Complex etiology requiring subspecialty evaluation [1][2]',
    citation: [1, 2],
    next: 'tia-disposition-question',

    summary: 'Consult neurology in ED for uncertain diagnosis, fluctuating symptoms, stenosis, or admission consideration',
    skippable: true,
  },

  {
    id: 'tia-disposition-question',
    type: 'question',
    module: 6,
    title: 'Disposition Decision',
    body: '**Based on risk stratification and workup, select disposition:**\n\nConsider:\n- Risk score (ABCD2, Canadian TIA)\n- High-risk features\n- Workup completion status\n- Follow-up availability',
    citation: [1, 2],
    options: [
      { label: 'Admit to hospital', description: 'High-risk features, incomplete workup, or no rapid follow-up', next: 'tia-admit-orders', urgency: 'critical' },
      { label: 'ED observation (23-hour)', description: 'Moderate risk, can complete workup during obs', next: 'tia-obs-orders', urgency: 'urgent' },
      { label: 'Discharge with rapid TIA clinic', description: 'Low risk, workup complete, follow-up <48h', next: 'tia-discharge-orders' },
    ],

    summary: 'Final disposition based on risk stratification, workup completion, and follow-up availability',
  },

  {
    id: 'tia-admit-orders',
    type: 'result',
    module: 6,
    title: 'Admission Orders',
    body: '**Admit to stroke/neurology service:**\n\n**Monitoring:**\n- Telemetry (continuous cardiac monitoring)\n- Neuro checks q4h\n- Stroke/TIA pathway\n\n**Workup to complete:**\n- MRI brain with DWI if not done\n- CTA head/neck if not done\n- TTE (consider TEE if indicated)\n- Extended cardiac monitoring\n\n**Treatment:**\n- DAPT: ASA 81 mg + Clopidogrel 75 mg daily (if loaded)\n- High-intensity statin (atorvastatin 80 mg)\n- BP management per protocol\n- DVT prophylaxis (unless on anticoagulation)\n\n**Consultations:**\n- Neurology\n- Vascular surgery if stenosis >=50%\n- Cardiology if afib or cardiac source\n\n**Discharge criteria:**\n- Workup complete\n- Treatment optimized\n- Follow-up arranged',
    recommendation: 'Admit for TIA workup and monitoring. Initiate secondary prevention. Complete vascular and cardiac evaluation. Arrange appropriate specialty follow-up.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'tia-obs-orders',
    type: 'result',
    module: 6,
    title: 'Observation Unit Orders',
    body: '**23-Hour Observation Protocol:**\n\n**Monitoring:**\n- Continuous telemetry\n- Neuro checks q4h\n- Call MD for any new symptoms\n\n**Complete during observation:**\n- CTA head/neck (if not done)\n- MRI brain with DWI (if available)\n- TTE\n- Labs: CBC, BMP, coags, lipid panel, HbA1c\n\n**Treatment initiated:**\n- DAPT loaded: ASA 325 mg + Clopidogrel 300-600 mg\n- Maintenance: ASA 81 mg + Clopidogrel 75 mg daily\n- Atorvastatin 80 mg daily\n\n**Consultations:**\n- Neurology consultation during observation\n- Vascular surgery if significant stenosis identified\n\n**Discharge from obs if:**\n- 24h telemetry no afib\n- Imaging reassuring\n- Treatment initiated\n- Rapid TIA clinic follow-up arranged (<48h)',
    recommendation: 'Place in ED observation unit. Complete TIA workup and initiate secondary prevention. Discharge with rapid follow-up if workup reassuring.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'tia-discharge-orders',
    type: 'result',
    module: 6,
    title: 'Discharge Orders',
    body: '**Discharge with Rapid TIA Clinic Follow-up:**\n\n**Prescriptions:**\n- Aspirin 81 mg daily (load 325 mg now if not done)\n- Clopidogrel 75 mg daily x 21 days (load 300-600 mg now)\n- Atorvastatin 80 mg daily\n- Continue or adjust home BP medications\n\n**Follow-up:**\n- Rapid TIA clinic within 24-48 hours\n- Neurology appointment\n- PCP within 1 week\n\n**Instructions given:**\n- BE FAST stroke warning signs\n- Return immediately if any new symptoms\n- Continue all medications as prescribed\n- No driving until cleared by neurology\n- Medication compliance critical\n\n**Documentation:**\n- Risk stratification performed (include ABCD2/Canadian score)\n- Workup completed with results\n- Low-risk criteria met\n- Patient verbalized understanding of return precautions\n\n**After 21 days:** Stop clopidogrel, continue aspirin alone.',
    recommendation: 'Discharge with DAPT loaded, high-intensity statin, and rapid TIA clinic follow-up within 48 hours. Patient educated on stroke warning signs and return precautions.',
    confidence: 'recommended',
    citation: [1, 2],
  },

];

export const TIA_WORKUP_NODE_COUNT = TIA_WORKUP_NODES.length;

export const TIA_WORKUP_MODULE_LABELS = [
  'Presentation & Mimics',
  'Risk Stratification',
  'ED Workup',
  'Etiology',
  'Treatment',
  'Disposition',
];

export const TIA_WORKUP_CITATIONS: Citation[] = [
  { num: 1, text: 'AHA/ASA 2021 Guideline for the Prevention of Stroke in Patients With Stroke and Transient Ischemic Attack. Stroke. 2021;52:e364-e467. PMID: 34024117' },
  { num: 2, text: 'AHA 2023 Scientific Statement: Diagnosis, Workup, Risk Reduction of Transient Ischemic Attack in the Emergency Department Setting. Stroke. 2023;54:e109-e121. PMID: 36602831' },
  { num: 3, text: 'ACEP Clinical Policy 2016: Critical Issues in the Evaluation of Adult Patients With Suspected Transient Ischemic Attack in the Emergency Department. Ann Emerg Med. 2016;68:354-370. PMID: 27568419' },
  { num: 4, text: 'Perry JJ, et al. Prospective validation of Canadian TIA Score and comparison with ABCD2 and ABCD2i for subsequent stroke risk after TIA. BMJ. 2021;372:n49. PMID: 33504525' },
  { num: 5, text: 'Adams HP Jr, et al. Classification of subtype of acute ischemic stroke (TOAST). Stroke. 1993;24(1):35-41. PMID: 7678184' },
  { num: 6, text: 'SPARCL Investigators. High-Dose Atorvastatin after Stroke or Transient Ischemic Attack. N Engl J Med. 2006;355:549-559. PMID: 16899775' },
  { num: 7, text: 'Johnston SC, et al. Clopidogrel and Aspirin in Acute Ischemic Stroke and High-Risk TIA (POINT Trial). N Engl J Med. 2018;379:215-225. PMID: 29766750' },
  { num: 8, text: 'Wang Y, et al. Clopidogrel with Aspirin in Acute Minor Stroke or Transient Ischemic Attack (CHANCE Trial). N Engl J Med. 2013;369:11-19. PMID: 23803136' },
  { num: 9, text: 'Rothwell PM, et al. Effect of urgent treatment of transient ischaemic attack and minor stroke on early recurrent stroke (EXPRESS study). Lancet. 2007;370:1432-1442. PMID: 17928046' },
];
