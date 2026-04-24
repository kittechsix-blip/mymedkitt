import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

// ─────────────────────────────────────────────────────────────────────────────
// Amaurosis Fugax / Transient Monocular Vision Loss
// Evidence: AAO PPP 2024, AHA/ASA TIA Guidelines, EyeWiki, StatPearls
// ─────────────────────────────────────────────────────────────────────────────

export const AMAUROSIS_FUGAX_MODULE_LABELS: string[] = [
  'Recognition',
  'GCA Screen',
  'Stroke Workup',
  'Etiology',
  'Treatment',
  'Disposition',
];

export const AMAUROSIS_FUGAX_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'TMVL = retinal TIA equivalent — stroke risk 5-10% at 1 year, highest in first 7 days', nodeId: 'af-start' },
  { text: 'Check ESR/CRP in ALL patients ≥50 — GCA can cause permanent bilateral blindness', nodeId: 'af-gca-screen' },
  { text: 'If CRAO (persistent vision loss) <4.5 hours, consider IV tPA per stroke protocol', nodeId: 'af-crao-check' },
  { text: 'Carotid imaging mandatory — CEA indicated for symptomatic stenosis ≥50%', nodeId: 'af-carotid' },
  { text: 'Start DAPT (aspirin + clopidogrel) within 24h for high-risk TIA/minor stroke', nodeId: 'af-antiplatelet' },
  { text: 'MRI-DWI preferred — 20-30% of TMVL patients have silent acute infarcts', nodeId: 'af-mri' },
];

export const AMAUROSIS_FUGAX_CITATIONS: Citation[] = [
  { num: 1, text: 'American Academy of Ophthalmology. Retinal and Ophthalmic Artery Occlusions Preferred Practice Pattern 2024-2025.' },
  { num: 2, text: 'Biousse V, et al. Management of acute retinal ischemia: Follow the guidelines! Ophthalmology. 2018;125(10):1597-1607.' },
  { num: 3, text: 'Johnston SC, et al. Validation and refinement of scores to predict very early stroke risk after TIA. Lancet. 2007;369(9558):283-292.' },
  { num: 4, text: 'Pan Y, et al. CHANCE Trial: Clopidogrel with Aspirin in Acute Minor Stroke or TIA. NEJM. 2013;369:11-19.' },
  { num: 5, text: 'Johnston SC, et al. POINT Trial: Clopidogrel and Aspirin for Acute Ischemic Stroke and High-Risk TIA. NEJM. 2018;379:215-225.' },
  { num: 6, text: 'AHA/ASA Scientific Statement on Acute Retinal Ischemia. Stroke. 2021;52:e364-e381.' },
  { num: 7, text: 'ACR/VF Guideline for Management of Giant Cell Arteritis and Takayasu Arteritis. Arthritis Rheumatol. 2021;73(8):1349-1365.' },
  { num: 8, text: 'Hunder GG, et al. ACR criteria for classification of giant cell arteritis. Arthritis Rheum. 1990;33:1122-1128.' },
  { num: 9, text: 'NASCET Collaborators. Beneficial effect of carotid endarterectomy in symptomatic patients with high-grade stenosis. NEJM. 1991;325:445-453.' },
  { num: 10, text: 'Shahjouei S, et al. Thrombolysis for central retinal artery occlusion: An individual participant meta-analysis. Int J Stroke. 2024;19(2):176-186.' },
  { num: 11, text: 'StatPearls. Amaurosis Fugax. Updated January 2025. NCBI Bookshelf.' },
  { num: 12, text: 'Foroozan R, et al. Transient Monocular Visual Loss: How Does Age Impact Diagnosis? Ophthalmol Ther. 2024;13:1235-1251.' },
];

export const AMAUROSIS_FUGAX_NODES: DecisionNode[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 1: Recognition
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'af-start',
    type: 'info',
    module: 1,
    title: 'Transient Monocular Vision Loss (TMVL)',
    body: '**Amaurosis fugax = "Eye TIA"**\n\n**Classic presentation:**\n• **Painless** monocular vision loss\n• "Curtain" or "shade" descending over visual field\n• Duration seconds to minutes (usually <15 min)\n• Complete spontaneous recovery\n\n**This is a stroke equivalent:**\n• 5-10% stroke risk at 1 year\n• Highest risk in first **7 days**\n• 20-30% have silent infarcts on MRI-DWI\n\n**This consult covers:**\n• Module 1: Recognition\n• Module 2: GCA Screen\n• Module 3: Stroke Workup\n• Module 4: Etiology\n• Module 5: Treatment\n• Module 6: Disposition',
    citation: [1, 6, 11],
    next: 'af-vision-status',
    summary: 'TMVL = eye TIA. 5-10% stroke risk at 1 year. Highest risk first 7 days.',
    skippable: true,
  },
  {
    id: 'af-vision-status',
    type: 'question',
    module: 1,
    title: 'Vision Status',
    body: '**Assess current vision status:**\n\nIs vision loss **still present** or has it **resolved**?\n\n**Persistent vision loss (>1 hour) = possible CRAO (eye stroke)**\n• Central Retinal Artery Occlusion\n• Time-critical treatment consideration\n• May qualify for IV tPA if <4.5 hours',
    citation: [1, 10],
    options: [
      { label: 'Vision Loss PERSISTENT (>1 hour)', next: 'af-crao-check', description: 'Possible CRAO — eye stroke', urgency: 'critical' },
      { label: 'Vision RESOLVED (transient)', next: 'af-verify-monocular', description: 'Classic amaurosis fugax' },
    ],
    summary: 'Persistent vision loss = CRAO (eye stroke). Resolved = amaurosis fugax.',
  },
  {
    id: 'af-crao-check',
    type: 'info',
    module: 1,
    title: '⚠️ Possible CRAO — Eye Stroke',
    body: '**Central Retinal Artery Occlusion (CRAO)**\n\nIf vision loss **persistent >1 hour**, this may be CRAO (completed "eye stroke").\n\n**Classic Fundoscopic Findings:**\n• Pale, edematous retina\n• **Cherry-red spot** at macula\n• Box-car segmentation of retinal vessels\n• Retinal whitening\n\n**Time-Critical Treatment:**\n| Time Window | Action |\n|-------------|--------|\n| **<4.5 hours** | Consider **IV tPA** per stroke protocol |\n| **<24 hours** | Emergent ophthalmology + stroke consult |\n| **>24 hours** | Workup still needed, but no acute reperfusion |\n\n**Activate stroke code if <4.5 hours from symptom onset.**',
    citation: [1, 6, 10],
    next: 'af-gca-screen',
    summary: 'CRAO = eye stroke. <4.5h: consider IV tPA. Always consult ophthalmology and stroke.',
    safetyLevel: 'critical',
  },
  {
    id: 'af-verify-monocular',
    type: 'question',
    module: 1,
    title: 'Confirm Monocular vs Binocular',
    body: '**Critical distinction:**\n\n| Feature | Monocular (Eye) | Binocular (Brain) |\n|---------|-----------------|-------------------|\n| Cover test | Resolves when affected eye covered | Persists with either eye covered |\n| Anatomy | Retina, optic nerve, ophthalmic artery | Chiasm, optic tract, occipital cortex |\n| Implies | Carotid/ophthalmic artery disease | Vertebrobasilar or posterior circulation |\n\n**Ask:** "When you covered one eye at a time, which eye couldn\'t see?"\n\nIf patient is unsure: **Assume monocular** and proceed with full workup.',
    citation: [11, 12],
    options: [
      { label: 'Monocular (one eye)', next: 'af-gca-screen', description: 'Carotid/ophthalmic artery territory' },
      { label: 'Binocular / Hemianopia', next: 'af-binocular', description: 'Posterior circulation' },
      { label: 'Uncertain', next: 'af-gca-screen', description: 'Proceed with full workup' },
    ],
    summary: 'Monocular = carotid territory. Binocular = posterior circulation. If uncertain, assume monocular.',
  },
  {
    id: 'af-binocular',
    type: 'info',
    module: 1,
    title: 'Binocular = Posterior Circulation',
    body: '**Binocular transient vision loss suggests:**\n\n• Vertebrobasilar TIA\n• Posterior circulation stroke\n• Occipital cortex ischemia\n\n**Key features:**\n• Homonymous hemianopia (same side of vision in both eyes)\n• May have associated symptoms: vertigo, diplopia, ataxia, dysarthria\n\n**Workup:**\n• MRI brain with DWI\n• MRA/CTA head AND neck (including vertebral arteries)\n• Echocardiogram\n• Telemetry for AF\n\n**Proceed with stroke TIA workup — this is NOT amaurosis fugax.**',
    citation: [6, 11],
    next: 'af-gca-screen',
    summary: 'Binocular TVL = posterior circulation. Full stroke workup needed.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 2: GCA Screen
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'af-gca-screen',
    type: 'question',
    module: 2,
    title: '🚨 Giant Cell Arteritis Screen',
    body: '**MANDATORY in ALL patients ≥50 years old**\n\nGCA can cause **permanent bilateral blindness** within hours if untreated.\n\n**GCA Red Flags:**\n| Finding | Significance |\n|---------|-------------|\n| New headache | Classic, especially temporal |\n| Jaw claudication | Highly specific (LR+ 4.2) |\n| Scalp tenderness | Pain brushing hair |\n| Temporal artery abnormality | Tender, thickened, reduced pulse |\n| Constitutional symptoms | Fever, weight loss, fatigue |\n| Polymyalgia rheumatica | Proximal muscle pain/stiffness |\n\n**Order STAT:** ESR + CRP',
    citation: [7, 8],
    options: [
      { label: 'Yes — GCA Possible (≥50 or red flags)', next: 'af-gca-labs', description: 'Order ESR/CRP STAT', urgency: 'urgent' },
      { label: 'No — Age <50, No Red Flags', next: 'af-stroke-workup', description: 'Low GCA risk, proceed to TIA workup' },
    ],
    summary: 'Screen ALL patients ≥50 for GCA. Order ESR + CRP STAT.',
  },
  {
    id: 'af-gca-labs',
    type: 'question',
    module: 2,
    title: 'GCA Laboratory Evaluation',
    body: '**Order STAT:**\n• **ESR** (Westergren method)\n• **CRP**\n• **CBC** (look for thrombocytosis)\n\n**Interpretation:**\n\n| ESR/CRP | Action |\n|---------|--------|\n| ESR ≥50 mm/hr OR CRP ≥10 mg/L | **High suspicion — start steroids** |\n| Both elevated | Specificity 97% for GCA |\n| Both normal | NPV ~96%, but does NOT rule out GCA if clinical suspicion high |\n\n**~4% of GCA patients have normal ESR AND CRP**',
    citation: [7, 8],
    options: [
      { label: 'Yes — Elevated Markers', next: 'af-gca-treat', description: 'ESR ≥50 or CRP ≥10', urgency: 'critical' },
      { label: 'No — Normal Markers', next: 'af-gca-normal-labs', description: 'Assess clinical suspicion' },
    ],
    summary: 'ESR ≥50 or CRP ≥10 = start steroids. 4% of GCA have normal labs.',
  },
  {
    id: 'af-gca-treat',
    type: 'info',
    module: 2,
    title: '🔴 Start GCA Treatment Immediately',
    body: '**Do NOT wait for biopsy — treat empirically!**\n\n**Vision-Threatening GCA (TMVL, diplopia, vision loss):**\n\n| Severity | Treatment |\n|----------|----------|\n| **High-dose IV** | Methylprednisolone **1g IV daily x 3 days** |\n| **Alternative** | Prednisone 1 mg/kg/day (max 80mg) if IV unavailable |\n\n**After IV pulse:**\n• Transition to oral prednisone 1 mg/kg/day\n• Arrange temporal artery biopsy within 2 weeks\n• Rheumatology consult\n\n**Temporal Artery Biopsy:**\n• Can be performed up to 2 weeks after starting steroids\n• Need ≥1.5 cm specimen\n• False-negative rate ~10-15% (skip lesions)\n\n**Admit for IV steroids and close monitoring.**',
    citation: [7, 8],
    next: 'af-stroke-workup',
    summary: 'Start methylpred 1g IV x3 days. Biopsy within 2 weeks. Do NOT wait for biopsy.',
    safetyLevel: 'critical',
  },
  {
    id: 'af-gca-normal-labs',
    type: 'question',
    module: 2,
    title: 'Normal Labs — Clinical Decision',
    body: '**ESR and CRP are normal, but...**\n\n~4% of biopsy-proven GCA patients have normal inflammatory markers.\n\n**High Clinical Suspicion Features:**\n• Classic temporal headache\n• Jaw claudication (highly specific)\n• Temporal artery abnormality on exam\n• PMR symptoms\n• Visual symptoms in BOTH eyes\n\n**Decision:**\n\n| Clinical Picture | Action |\n|-----------------|--------|\n| High suspicion | Start steroids anyway, pursue biopsy |\n| Low suspicion | Proceed with stroke TIA workup |',
    citation: [7],
    options: [
      { label: 'Yes — High Clinical Suspicion', next: 'af-gca-treat', description: 'Start steroids despite normal labs' },
      { label: 'No — Low Suspicion', next: 'af-stroke-workup', description: 'Proceed with TIA workup' },
    ],
    summary: '4% of GCA have normal ESR/CRP. If high clinical suspicion, treat anyway.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 3: Stroke Workup
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'af-stroke-workup',
    type: 'info',
    module: 3,
    title: 'Stroke/TIA Workup',
    body: '**TMVL = Retinal TIA — requires full stroke workup**\n\n**Essential Studies:**\n\n| Study | Rationale |\n|-------|-----------||\n| **MRI Brain with DWI** | 20-30% have silent infarcts; preferred over CT |\n| **MRA or CTA Head/Neck** | Carotid + intracranial vessel imaging |\n| **Carotid Doppler** | If CTA/MRA not available |\n| **ECG** | Screen for atrial fibrillation |\n| **Echocardiogram** | Cardiac source of emboli |\n| **Telemetry** | Detect paroxysmal AF |\n| **Labs** | CBC, BMP, glucose, lipid panel, HbA1c, coags |\n\n**Calculate ABCD² Score** to risk-stratify (see toolbar).\n\n**Time is critical — imaging within 24 hours per AHA/ASA guidelines.**',
    citation: [3, 6],
    next: 'af-carotid',
    summary: 'MRI-DWI preferred (20-30% have silent infarcts). CTA/MRA head and neck. ECG, echo, telemetry.',
  },
  {
    id: 'af-carotid',
    type: 'question',
    module: 4,
    title: 'Carotid Artery Evaluation',
    body: '**Carotid stenosis is the most common cause of TMVL**\n\n**Imaging Findings:**\n\n| Stenosis | Significance |\n|----------|-------------|\n| **<50%** | Medical management |\n| **50-69%** | CEA beneficial if symptomatic (NNT ~22) |\n| **70-99%** | CEA strongly indicated if symptomatic (NNT ~6) |\n| **100%** | Occluded — no intervention, medical management |\n\n**Symptomatic = ipsilateral TIA/stroke within 6 months**\n\n**Timing of CEA:**\n• Best outcomes if performed **within 2 weeks** of event\n• After 48 hours but before 14 days from symptom onset\n• Must be neurologically stable',
    citation: [9],
    options: [
      { label: '≥70% Stenosis', next: 'af-cea-indicated', description: 'CEA strongly indicated', urgency: 'urgent' },
      { label: '50-69% Stenosis', next: 'af-cea-consider', description: 'CEA may be beneficial' },
      { label: '<50% or Imaging Pending', next: 'af-other-etiologies', description: 'Consider other causes' },
    ],
    summary: 'Carotid stenosis most common cause. ≥70% stenosis = CEA indicated (NNT ~6).',
  },
  {
    id: 'af-cea-indicated',
    type: 'info',
    module: 4,
    title: '✅ CEA Strongly Indicated',
    body: '**Symptomatic carotid stenosis ≥70%**\n\n**Carotid Endarterectomy (CEA):**\n• NNT ~6 to prevent stroke\n• Should be performed within **2 weeks** of event\n• Requires center with <3% perioperative complication rate\n\n**Urgent Vascular Surgery Consult**\n\n**CEA vs CAS (Carotid Artery Stenting):**\n• CEA is first-line for most patients\n• CAS may be considered if:\n  - High surgical risk\n  - Radiation-induced stenosis\n  - Prior CEA with restenosis\n  - Lesion above C2\n\n**While awaiting CEA:**\n• Start antiplatelet therapy\n• High-intensity statin\n• Blood pressure control\n• Smoking cessation',
    citation: [9],
    next: 'af-antiplatelet',
    summary: 'CEA within 2 weeks. NNT ~6. Start antiplatelets + statin while awaiting surgery.',
  },
  {
    id: 'af-cea-consider',
    type: 'info',
    module: 4,
    title: 'Consider CEA (50-69% Stenosis)',
    body: '**Symptomatic carotid stenosis 50-69%**\n\n**CEA may be beneficial:**\n• NNT ~22 to prevent stroke (less benefit than ≥70%)\n• Consider patient factors:\n  - Age (benefit greater in older patients)\n  - Sex (men benefit more than women)\n  - Comorbidities\n  - Center\'s surgical complication rate\n\n**Discuss with Vascular Surgery**\n\n**If NOT pursuing CEA:**\n• Aggressive medical management\n• DAPT (aspirin + clopidogrel x 21 days)\n• High-intensity statin\n• Risk factor modification',
    citation: [9],
    next: 'af-antiplatelet',
    summary: 'CEA may benefit (NNT ~22). Discuss with vascular surgery. Aggressive medical management.',
  },
  {
    id: 'af-other-etiologies',
    type: 'info',
    module: 4,
    title: 'Other Etiologies of TMVL',
    body: '**If carotid stenosis <50%, consider other causes:**\n\n**Cardioembolic:**\n• Atrial fibrillation\n• Patent foramen ovale\n• Valvular disease\n• LV thrombus\n• Recent MI\n\n**Other Vascular:**\n• Carotid dissection (trauma, neck manipulation)\n• Ophthalmic artery stenosis\n• Hyperviscosity syndromes\n\n**Non-Ischemic TMVL:**\n| Cause | Features |\n|-------|----------|\n| **Ocular migraine** | Positive symptoms (scintillations), headache follows |\n| **Papilledema** | Bilateral, seconds duration, positional |\n| **Angle-closure glaucoma** | Pain, halos, red eye |\n| **Dry eye** | Very brief, clears with blinking |\n| **Uhthoff phenomenon** | MS patient, triggered by heat/exercise |\n\nEcho and telemetry essential for cardiac source workup.',
    citation: [11, 12],
    next: 'af-antiplatelet',
    summary: 'Consider: AF, PFO, valve disease, dissection, migraine. Complete cardiac workup.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 5: Treatment
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'af-antiplatelet',
    type: 'question',
    module: 5,
    title: 'Antiplatelet Therapy',
    body: '**DAPT for High-Risk TIA / Minor Stroke**\n\nBased on CHANCE and POINT trials:\n\n**Indications for DAPT:**\n• ABCD² score ≥4 (high-risk TIA)\n• Minor ischemic stroke (NIHSS ≤3)\n• Non-cardioembolic\n\n**DAPT Protocol:**\n\n| Day | Aspirin | Clopidogrel |\n|-----|---------|-------------|\n| Day 1 | 325 mg load | 300-600 mg load |\n| Days 2-21 | 81 mg daily | 75 mg daily |\n| Day 22+ | 81 mg daily | STOP |\n\n**Duration:** 21 days of DAPT, then aspirin monotherapy\n\n**Start within 24 hours** (ideally within 12 hours)',
    citation: [4, 5],
    options: [
      { label: 'DAPT Started (non-cardioembolic)', next: 'af-secondary-prevention', description: 'Aspirin + clopidogrel x 21 days' },
      { label: 'Cardioembolic — Need Anticoagulation', next: 'af-anticoag', description: 'AF or cardiac source' },
    ],
    summary: 'DAPT x 21 days for high-risk TIA (ABCD² ≥4). Load aspirin + clopidogrel Day 1.',
  },
  {
    id: 'af-anticoag',
    type: 'info',
    module: 5,
    title: 'Anticoagulation for Cardioembolic Source',
    body: '**If atrial fibrillation or other cardioembolic source identified:**\n\n**For Atrial Fibrillation:**\n\n| Timing | Recommendation |\n|--------|----------------|\n| TIA (no infarct) | Start DOAC immediately |\n| Small infarct | Start DOAC in 1-3 days |\n| Moderate infarct | Start DOAC in 6-7 days |\n| Large infarct | Start DOAC in 12-14 days |\n\n**DOAC Options:**\n• Apixaban 5 mg BID (preferred)\n• Rivaroxaban 20 mg daily\n• Dabigatran 150 mg BID\n• Edoxaban 60 mg daily\n\n**Do NOT combine DOAC with DAPT** unless specific indication (e.g., recent stent).\n\nHold antiplatelet when starting anticoagulation.',
    citation: [6],
    next: 'af-secondary-prevention',
    summary: 'AF: start DOAC (timing depends on infarct size). Do not combine DOAC + DAPT.',
  },
  {
    id: 'af-secondary-prevention',
    type: 'info',
    module: 5,
    title: 'Secondary Prevention',
    body: '**Risk Factor Modification**\n\n| Target | Goal |\n|--------|------|\n| **Blood Pressure** | <130/80 mmHg |\n| **LDL Cholesterol** | <70 mg/dL (high-intensity statin) |\n| **HbA1c** | <7% |\n| **Smoking** | Complete cessation |\n\n**High-Intensity Statin:**\n• Atorvastatin 40-80 mg daily\n• Rosuvastatin 20-40 mg daily\n• Start regardless of baseline LDL\n\n**Lifestyle:**\n• Mediterranean diet\n• Regular exercise\n• Limit alcohol\n• Weight management\n\n**Patient Education:**\n• Recognize stroke symptoms (FAST)\n• Call 911 immediately if symptoms recur\n• Medication adherence critical',
    citation: [6],
    next: 'af-disposition',
    summary: 'High-intensity statin. BP <130/80. LDL <70. Smoking cessation. Patient education.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 6: Disposition
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'af-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition Decision',
    body: '**AHA/ASA Recommendations:**\n\n**Admit if:**\n• ABCD² score ≥3 AND presenting within 72 hours\n• Unable to complete workup within 24 hours as outpatient\n• High-grade carotid stenosis requiring CEA\n• Atrial fibrillation requiring anticoagulation initiation\n• Persistent symptoms or fluctuating deficits\n• Unable to ensure medication compliance\n• GCA requiring IV steroids\n\n**May discharge with expedited outpatient workup if:**\n• ABCD² score 0-2\n• Workup can be completed within 24-48 hours\n• Reliable follow-up assured\n• Medications started in ED\n\nCalculate ABCD² score (see toolbar).',
    citation: [3, 6],
    options: [
      { label: 'Admit — High Risk', next: 'af-admit', description: 'ABCD² ≥3 or unable to complete workup' },
      { label: 'Discharge — Low Risk', next: 'af-discharge', description: 'ABCD² 0-2 with expedited follow-up' },
    ],
    summary: 'Admit if ABCD² ≥3 or unable to complete workup in 24h. Low risk may discharge with follow-up.',
  },
  {
    id: 'af-admit',
    type: 'info',
    module: 6,
    title: 'Admission Orders',
    body: '**Inpatient Management:**\n\n**Monitoring:**\n• Telemetry x 24-48 hours minimum\n• Neuro checks q4h\n• BP monitoring (goal <130/80)\n\n**Studies (if not completed in ED):**\n• MRI brain with DWI\n• MRA/CTA head and neck\n• Echocardiogram (TTE, consider TEE if high suspicion)\n• Extended cardiac monitoring if AF not found\n\n**Consultations:**\n• Neurology\n• Vascular surgery if high-grade stenosis\n• Ophthalmology if persistent visual symptoms\n• Cardiology if AF or cardiac source\n\n**Medications:**\n• DAPT (if non-cardioembolic)\n• High-intensity statin\n• Continue home BP meds (hold if hypotensive)',
    citation: [6],
    next: undefined,
    summary: 'Telemetry, MRI-DWI, CTA/MRA, echo. Consult neuro, vascular surgery PRN, ophthalmology PRN.',
  },
  {
    id: 'af-discharge',
    type: 'info',
    module: 6,
    title: 'Discharge with Expedited Follow-up',
    body: '**Low-Risk Discharge Criteria:**\n• ABCD² score 0-2\n• Complete workup can be done within 24-48 hours\n• Patient reliable with good social support\n• Medications started in ED\n\n**Prescriptions:**\n• Aspirin 325 mg x1, then 81 mg daily\n• Clopidogrel 300 mg x1, then 75 mg daily x 21 days (if ABCD² ≥4)\n• High-intensity statin (atorvastatin 80 mg or rosuvastatin 20 mg)\n\n**Expedited Outpatient Workup:**\n• Carotid Doppler: within 24-48 hours\n• MRI brain: within 24-48 hours\n• Echocardiogram: within 1 week\n• Extended cardiac monitoring (Zio patch or Holter)\n\n**Follow-up:**\n• Stroke clinic or neurology: within 1 week\n• PCP: within 1-2 weeks\n• Ophthalmology: if any persistent visual symptoms\n\n**Return Precautions:**\n🚨 Return immediately if:\n• Vision loss recurs\n• Weakness, numbness, facial droop\n• Speech difficulty\n• Severe headache\n• Any new neurological symptoms',
    citation: [3, 6],
    next: undefined,
    summary: 'Carotid imaging within 24-48h. MRI within 24-48h. Neuro follow-up within 1 week. Clear return precautions.',
  },
];
