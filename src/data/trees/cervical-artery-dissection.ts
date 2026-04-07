// MedKitt — Cervical Artery Dissection (Strangulation Focus)
// High-risk: Non-fatal strangulation screening, delayed presentation, stroke prevention
// 6 modules: Recognition → Strangulation Assessment → Imaging → Treatment → Complications → Disposition
// ~24 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const CERVICAL_ARTERY_DISSECTION_CRITICAL_ACTIONS = [
  { text: 'Ask directly: "Has anyone ever choked you or put hands around your neck?" - 50% have no visible injury', nodeId: 'cad-strangulation' },
  { text: 'Loss of consciousness during strangulation = high-risk for arterial injury - immediate CTA needed', nodeId: 'cad-red-flags' },
  { text: 'CTA head and neck is gold standard for cervical artery dissection screening', nodeId: 'cad-imaging' },
  { text: 'tPA NOT contraindicated in dissection-related stroke - standard criteria apply', nodeId: 'cad-stroke-treatment' },
  { text: 'CADISS trial: antiplatelet (aspirin) equivalent to anticoagulation - prefer antiplatelet (lower bleeding risk)', nodeId: 'cad-treatment' },
  { text: 'Strangulation is leading predictor of future homicide in IPV - safety assessment mandatory', nodeId: 'cad-safety' },
  { text: 'Symptoms may be delayed 24-72 hours after strangulation - close follow-up critical', nodeId: 'cad-strangulation' },
  { text: 'Most dissections heal spontaneously with medical therapy alone - endovascular rarely needed acutely', nodeId: 'cad-endovascular' },
];

export const CERVICAL_ARTERY_DISSECTION_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'cad-start',
    type: 'info',
    module: 1,
    title: 'Cervical Artery Dissection',
    body: '**Carotid or vertebral artery dissection** — intimal tear with intramural hematoma causing stenosis/occlusion or pseudoaneurysm.\n\n**Key Context: Strangulation**\n> Non-fatal strangulation is a MAJOR risk factor for cervical artery dissection.\n> Up to 50% of intimate partner violence victims experience strangulation.\n> Symptoms may be delayed 24-72 hours or more.\n\n**Mechanism:** Compression and hyperextension of neck → shearing forces on arteries → intimal tear.\n\n**Mortality:** Strangulation can be fatal with as little as 10 seconds of pressure. [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'nihss-calculator', label: 'NIH Stroke Scale' },
      { id: 'strangulation-danger', label: 'Strangulation Danger Score' },
      { id: 'neck-injury-signs', label: 'Neck Injury Assessment' },
      { id: 'ipv-safety-plan', label: 'IPV Safety Planning' },
    ],
    next: 'cad-mechanism',
  },

  {
    id: 'cad-mechanism',
    type: 'question',
    module: 1,
    title: 'Mechanism of Injury',
    body: '**Common Mechanisms:**\n\n| Mechanism | Notes |\n|-----------|-------|\n| **Strangulation/Choking** | Intimate partner violence, assault |\n| **Trauma** | MVA, sports injury, chiropractic manipulation |\n| **Spontaneous** | Connective tissue disorders, hypertension |\n| **Minor trauma** | Coughing, vomiting, yoga, roller coasters |\n\n**Strangulation Statistics:**\n• Leading predictor of future homicide in IPV\n• Victims often minimize or deny\n• May present days later with stroke [1][2][3]',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Strangulation / Non-fatal asphyxiation',
        next: 'cad-strangulation',
        urgency: 'urgent',
      },
      {
        label: 'Trauma (MVA, assault, sports)',
        next: 'cad-trauma',
      },
      {
        label: 'Spontaneous / Minor trauma',
        next: 'cad-spontaneous',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: STRANGULATION ASSESSMENT
  // =====================================================================

  {
    id: 'cad-strangulation',
    type: 'info',
    module: 2,
    title: 'Non-Fatal Strangulation',
    body: '**Strangulation Assessment is CRITICAL**\n\n**Ask directly:** "Has anyone ever choked you or put hands around your neck?"\n\n**Physical Exam Findings:**\n• May be minimal or absent (50% have no visible injury)\n• Petechiae (face, conjunctivae, behind ears)\n• Ligature marks\n• Neck erythema, abrasions, contusions\n• Hoarseness, voice changes\n• Difficulty swallowing\n• Neck pain\n\n**Neurologic Symptoms (concerning for dissection):**\n• Headache (especially unilateral)\n• Neck pain\n• Horner syndrome (ptosis, miosis, anhidrosis)\n• Stroke symptoms (weakness, speech changes)\n• Vision changes [1][2][3]',
    citation: [1, 2, 3],
    next: 'cad-red-flags',
  },

  {
    id: 'cad-red-flags',
    type: 'question',
    module: 2,
    title: 'Red Flags for Arterial Injury',
    body: '**HIGH-RISK features after strangulation:**\n\n**Immediate imaging needed:**\n• Loss of consciousness during event\n• Incontinence during event\n• Voice changes/hoarseness\n• Difficulty swallowing\n• Neck pain or tenderness\n• Neurologic symptoms\n• Visible neck injury\n• Petechiae (face, eyes)\n\n**Low-risk (still requires documentation and safety planning):**\n• No LOC\n• No neurologic symptoms\n• No visible injury\n• Normal voice\n• No dysphagia [1][2][3]',
    citation: [1, 2, 3],
    options: [
      {
        label: 'High-risk features present',
        next: 'cad-imaging',
        urgency: 'urgent',
      },
      {
        label: 'Low-risk — no red flags',
        next: 'cad-low-risk',
      },
      {
        label: 'Stroke symptoms present',
        next: 'cad-stroke',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'cad-stroke',
    type: 'info',
    module: 2,
    title: 'Stroke from Dissection',
    body: '**Dissection-related stroke is an emergency:**\n\n**Presentation:**\n• Unilateral headache → neurologic symptoms\n• May be hours to days after injury\n• Young patient with stroke = think dissection\n\n**Immediate Actions:**\n1. Activate stroke protocol\n2. CT head (rule out hemorrhage)\n3. CTA head/neck (dissection + occlusion)\n4. Consider thrombolysis if within window\n5. Neurology consultation emergent\n\n**NIHSS assessment** — document baseline [1][4][5]',
    citation: [1, 4, 5],
    next: 'cad-imaging',
  },

  {
    id: 'cad-trauma',
    type: 'info',
    module: 2,
    title: 'Traumatic Dissection',
    body: '**Trauma-related Dissection:**\n\n**Mechanisms:**\n• Hyperextension/rotation injuries\n• Direct blow to neck\n• Seatbelt injuries\n• Sports (martial arts, football)\n\n**Memphis Criteria for CTA screening:**\n• Cervical spine fracture\n• Neurologic deficit not explained by imaging\n• Horner syndrome\n• LeFort II/III fracture\n• Skull base fracture involving carotid canal\n• DAI with GCS <6\n\n**Consider imaging liberally** in neck trauma. [1][4]',
    citation: [1, 4],
    next: 'cad-imaging',
  },

  {
    id: 'cad-spontaneous',
    type: 'info',
    module: 2,
    title: 'Spontaneous Dissection',
    body: '**Spontaneous Dissection:**\n\n**Risk Factors:**\n• Connective tissue disorders (Ehlers-Danlos, Marfan)\n• Fibromuscular dysplasia\n• Hypertension\n• Recent infection\n• Migraine\n\n**Classic Presentation:**\n• Sudden severe unilateral headache/neck pain\n• Ipsilateral Horner syndrome\n• ± Stroke symptoms\n\n**Minor Trauma Triggers:**\n• Chiropractic manipulation\n• Vigorous coughing/sneezing\n• Yoga positions\n• Roller coasters\n• Hair salon sinks (hyperextension) [1][4]',
    citation: [1, 4],
    next: 'cad-imaging',
  },

  {
    id: 'cad-low-risk',
    type: 'info',
    module: 2,
    title: 'Low-Risk Strangulation',
    body: '**Even "low-risk" strangulation requires:**\n\n1. **Documentation:**\n   • Detailed history of event\n   • Photograph any visible injuries\n   • Document negative findings too\n\n2. **Safety Assessment:**\n   • IPV screening\n   • Safety planning\n   • Social work consultation\n   • Domestic violence resources\n\n3. **Return Precautions:**\n   • Headache, vision changes, weakness\n   • Voice changes, difficulty swallowing\n   • Any neurologic symptoms\n   • Return immediately if any concerns\n\n**Consider delayed imaging** if any symptoms develop. [2][3]',
    citation: [2, 3],
    next: 'cad-safety',
  },

  // =====================================================================
  // MODULE 3: IMAGING
  // =====================================================================

  {
    id: 'cad-imaging',
    type: 'info',
    module: 3,
    title: 'Imaging for Cervical Artery Dissection',
    body: '**CTA Head and Neck — Gold standard for screening**\n\n**Imaging Findings:**\n\n| Finding | Description |\n|---------|--------------|\n| Intimal flap | Linear filling defect |\n| Intramural hematoma | Crescent sign |\n| Stenosis | Narrowing of lumen |\n| Occlusion | Complete blockage |\n| Pseudoaneurysm | Focal dilation |\n| String sign | Tapered stenosis |\n\n**MRA/MRI:**\n• Alternative if CTA contraindicated\n• T1 fat-sat shows intramural hematoma\n• May miss subtle dissection\n\n**Digital Subtraction Angiography:**\n• Gold standard but invasive\n• Reserved for equivocal cases [1][4][5]',
    citation: [1, 4, 5],
    next: 'cad-imaging-result',
  },

  {
    id: 'cad-imaging-result',
    type: 'question',
    module: 3,
    title: 'Imaging Results',
    body: '**Interpret CTA findings:**\n\n**Positive for Dissection:**\n• Any of the findings listed (intimal flap, hematoma, stenosis, etc.)\n• Requires anticoagulation or antiplatelet therapy\n• Neurology/neurosurgery consultation\n\n**Negative Imaging:**\n• Does not rule out delayed presentation\n• Close follow-up if clinical suspicion\n• Consider MRA if CTA negative but high suspicion\n\n**Incidental Findings:**\n• Soft tissue injury\n• Thyroid/laryngeal injury [1][4]',
    citation: [1, 4],
    options: [
      {
        label: 'Dissection confirmed',
        next: 'cad-treatment',
        urgency: 'urgent',
      },
      {
        label: 'Imaging negative',
        next: 'cad-negative',
      },
      {
        label: 'Stroke with dissection',
        next: 'cad-stroke-treatment',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'cad-negative',
    type: 'info',
    module: 3,
    title: 'Negative Imaging',
    body: '**CTA Negative — Next Steps:**\n\n**If high clinical suspicion:**\n• Consider MRA (more sensitive for intramural hematoma)\n• Repeat imaging in 24-48h if symptoms persist\n• Observation with serial exams\n\n**If low clinical suspicion:**\n• Close follow-up\n• Strict return precautions\n• Primary care follow-up within 1 week\n\n**Documentation:**\n• Clinical decision-making\n• Return precautions given\n• Safety planning if strangulation [1][4]',
    citation: [1, 4],
    next: 'cad-safety',
  },

  // =====================================================================
  // MODULE 4: TREATMENT
  // =====================================================================

  {
    id: 'cad-treatment',
    type: 'info',
    module: 4,
    title: 'Treatment of Cervical Artery Dissection',
    body: '**Antithrombotic Therapy:**\n\n**Goal:** Prevent stroke from thromboembolism\n\n**Options (equivalent efficacy):**\n\n**Antiplatelet:**\n• [Aspirin](#/drug/aspirin/stroke) 81-325 mg daily\n• Or dual antiplatelet (aspirin + clopidogrel) x 21 days, then aspirin alone\n\n**Anticoagulation:**\n• [Heparin](#/drug/heparin/dissection) → [Warfarin](#/drug/warfarin/dissection) (INR 2-3)\n• Duration: 3-6 months\n\n**CADISS Trial:** No difference between antiplatelet and anticoagulation.\n\n**Most centers:** Antiplatelet therapy preferred (lower bleeding risk). [1][4][5][6]',
    citation: [1, 4, 5, 6],
    treatment: {
      firstLine: {
        drug: 'Aspirin',
        dose: '81-325 mg',
        route: 'PO',
        frequency: 'Daily',
        duration: '3-6 months',
        notes: 'Antiplatelet therapy is first-line',
      },
      alternative: {
        drug: 'Heparin → Warfarin',
        dose: 'Therapeutic',
        route: 'IV → PO',
        frequency: 'Continuous → Daily',
        duration: '3-6 months',
        notes: 'Alternative if high-risk features or contraindication to antiplatelet',
      },
      monitoring: 'Repeat vascular imaging at 3-6 months',
    },
    next: 'cad-endovascular',
  },

  {
    id: 'cad-endovascular',
    type: 'info',
    module: 4,
    title: 'Endovascular and Surgical Options',
    body: '**Endovascular Therapy:**\n\n**Stenting:**\n• Rarely needed acutely\n• Consider for:\n  - Symptomatic pseudoaneurysm\n  - Recurrent TIA despite antithrombotic therapy\n  - Expanding dissection\n\n**Surgical Repair:**\n• Very rarely indicated\n• Consider for failed endovascular therapy\n• Pseudoaneurysm with mass effect\n\n**Most dissections heal spontaneously** with medical therapy alone. [1][4][6]',
    citation: [1, 4, 6],
    next: 'cad-stroke-treatment',
  },

  {
    id: 'cad-stroke-treatment',
    type: 'info',
    module: 4,
    title: 'Stroke from Dissection',
    body: '**Acute Stroke Management:**\n\n**Thrombolysis (tPA):**\n• NOT contraindicated in dissection-related stroke\n• Standard criteria apply\n• 4.5-hour window\n\n**Thrombectomy:**\n• For large vessel occlusion\n• Up to 24 hours in selected patients\n• May be technically challenging at dissection site\n\n**Post-Acute:**\n• Antithrombotic therapy (antiplatelet or anticoagulation)\n• Blood pressure management\n• Rehab services\n\n**Avoid hypotension** — may worsen ischemia in setting of stenosis. [1][4][5]',
    citation: [1, 4, 5],
    next: 'cad-complications',
  },

  // =====================================================================
  // MODULE 5: COMPLICATIONS
  // =====================================================================

  {
    id: 'cad-complications',
    type: 'info',
    module: 5,
    title: 'Complications and Prognosis',
    body: '**Complications of Cervical Artery Dissection:**\n\n| Complication | Incidence |\n|--------------|----------|\n| Stroke | 10-25% |\n| Permanent neurologic deficit | ~10% |\n| Recurrent dissection | 2% at 1 year |\n| Death | <5% |\n\n**Prognosis:**\n• Most dissections heal within 3-6 months\n• ~85% have good functional outcome\n• Recurrence risk low but present\n\n**Follow-up Imaging:**\n• Repeat CTA/MRA at 3-6 months\n• Assess for recanalization vs. persistence\n• Guide duration of antithrombotic therapy [1][4]',
    citation: [1, 4],
    next: 'cad-safety',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'cad-safety',
    type: 'info',
    module: 6,
    title: 'Safety Assessment — Strangulation/IPV',
    body: '**Intimate Partner Violence Safety Assessment:**\n\n**Screen ALL strangulation patients:**\n• "Are you safe at home?"\n• "Is the person who did this going to be there when you leave?"\n• "Do you have a safe place to go?"\n\n**Resources:**\n• Social work consultation\n• Domestic violence advocate\n• National DV Hotline: 1-800-799-7233\n• Safety planning\n\n**Documentation for legal purposes:**\n• Detailed mechanism\n• Exam findings (photograph if possible)\n• Patient quotes in their words\n• Time since assault\n\n**Strangulation is a strong predictor of future homicide.** [2][3]',
    citation: [2, 3],
    next: 'cad-disposition',
  },

  {
    id: 'cad-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**Disposition depends on findings:**\n\n| Scenario | Disposition |\n|----------|-------------|\n| Confirmed dissection | Admission |\n| Stroke from dissection | Stroke unit/ICU |\n| High-risk strangulation, imaging pending | Admit for observation |\n| Low-risk, negative imaging | Discharge with precautions |\n\n**Before discharge:**\n• Safety assessment complete\n• Resources provided\n• Follow-up arranged\n• Return precautions [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Admit — Dissection or stroke',
        next: 'cad-admit',
        urgency: 'urgent',
      },
      {
        label: 'Observation — High-risk, awaiting imaging',
        next: 'cad-observe',
      },
      {
        label: 'Discharge — Low-risk, safe disposition',
        next: 'cad-discharge',
      },
    ],
  },

  {
    id: 'cad-admit',
    type: 'result',
    module: 6,
    title: 'Admission',
    body: '**Admission for Cervical Artery Dissection:**\n\n**Stroke Unit/Neuro ICU if:**\n• Active stroke\n• Fluctuating neurologic exam\n• High-grade stenosis/occlusion\n\n**Telemetry/Neuro Floor if:**\n• Stable dissection without stroke\n• Monitoring for symptom progression\n\n**Consultations:**\n• Neurology (mandatory)\n• Neurosurgery/Neurointerventional (if intervention considered)\n• Social work (if strangulation/IPV)\n\n**Initiate antithrombotic therapy** per neurology recommendation. [1][4]',
    recommendation: 'Admit for monitoring and antithrombotic therapy. Neurology consultation required.',
    confidence: 'definitive',
    citation: [1, 4],
  },

  {
    id: 'cad-observe',
    type: 'result',
    module: 6,
    title: 'Observation',
    body: '**Observation for High-Risk Strangulation:**\n\n• Serial neurologic exams (q2h)\n• Await imaging results\n• Voice/swallowing assessment\n• Social work evaluation\n• Safety planning\n\n**If imaging positive:** Admit for treatment\n**If imaging negative and symptoms resolve:** May discharge with close follow-up\n\n**Strict return precautions:**\n• Any neurologic symptoms\n• Worsening voice changes\n• Difficulty swallowing\n• Headache [1][2]',
    recommendation: 'Observation with serial neurologic exams. Social work evaluation for safety planning.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'cad-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge',
    body: '**Discharge Criteria:**\n\n• Negative imaging (or low clinical suspicion, imaging not indicated)\n• Stable neurologic exam\n• No voice changes or dysphagia\n• Safe discharge environment\n• Resources provided if IPV\n\n**Discharge Instructions:**\n• Return immediately for headache, weakness, vision changes, speech changes\n• Follow-up with PCP within 1 week\n• If IPV: DV resources, safety plan, hotline number\n\n**Documentation:**\n• Clinical decision-making\n• Mechanism of injury\n• Exam findings\n• Safety assessment [1][2]',
    recommendation: 'Discharge with strict return precautions. Safety planning if IPV-related.',
    confidence: 'recommended',
    citation: [1, 2],
  },

];

export const CERVICAL_ARTERY_DISSECTION_MODULE_LABELS = [
  'Recognition',
  'Strangulation Assessment',
  'Imaging',
  'Treatment',
  'Complications',
  'Disposition',
];

export const CERVICAL_ARTERY_DISSECTION_CITATIONS: Citation[] = [
  { num: 1, text: 'UpToDate - Cervical artery dissection: Clinical features, diagnosis, and management. 2024.' },
  { num: 2, text: 'Zilkens RR et al. Non-fatal strangulation in sexual assault. Forensic Sci Med Pathol. 2016;12(4):381-388.' },
  { num: 3, text: 'Training Institute on Strangulation Prevention. https://www.strangulationtraininginstitute.com/' },
  { num: 4, text: 'EMCrit - Cervical Artery Dissection. Farkas J. https://emcrit.org/ibcc/dissection/' },
  { num: 5, text: 'CADISS Trial Investigators. Antiplatelet treatment compared with anticoagulation treatment for cervical artery dissection. Lancet Neurol. 2015;14(4):361-367.' },
  { num: 6, text: 'EB Medicine - Stroke and TIA in the Emergency Department. Emergency Medicine Practice. 2023.' },
];
