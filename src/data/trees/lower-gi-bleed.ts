// MedKitt — Lower GI Bleed
// Initial Assessment → Risk Stratification → Resuscitation → Imaging → Intervention → Disposition
// 6 modules: Initial Assessment → Risk Stratification → Resuscitation → Imaging Decision → Intervention → Disposition
// 18 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const LOWER_GI_BLEED_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'lgib-start',
    type: 'question',
    module: 1,
    title: 'Lower GI Bleed — Initial Assessment',
    body: '[LGIB Steps Summary](#/info/lgib-steps)\n\n**Lower GI bleeding** originates distal to the ligament of Treitz. Presents as hematochezia (bright red blood per rectum), maroon stool, or melena (if slow transit).\n\n**First priority:** Assess hemodynamic status.\n\n• HR, BP, orthostatic vitals\n• Shock Index (HR/SBP) — >1.0 suggests significant bleeding\n• Mental status, skin perfusion\n• Signs of hypovolemic shock\n\n**CRITICAL:** Up to 15% of apparent LGIB is actually brisk UGIB. Consider NGT aspirate or EGD if hemodynamically unstable with unclear source.',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'shock-index', label: 'Shock Index' },
      { id: 'oakland-score', label: 'Oakland Score' },
    ],
    options: [
      {
        label: 'Hemodynamically Unstable',
        description: 'SBP <90, HR >100, shock index >1, altered mental status',
        next: 'lgib-unstable',
        urgency: 'critical',
      },
      {
        label: 'Hemodynamically Stable',
        description: 'Normal vitals, no signs of shock',
        next: 'lgib-stable-risk',
      },
    ],

    summary: 'Assess hemodynamics first; shock index >1 = significant bleed; 15% of apparent LGIB is brisk UGIB',
    safetyLevel: 'critical',
  },

  {
    id: 'lgib-unstable',
    type: 'info',
    module: 1,
    title: 'Hemodynamically Unstable LGIB',
    body: '**Immediate priorities:**\n\n**1. Large-bore IV access** — two 18G or larger\n\n**2. Type and crossmatch** — anticipate transfusion\n\n**3. Activate massive transfusion protocol** if:\n• Shock Index >1.0 with ongoing bleeding\n• Estimated blood loss >30% blood volume\n• Lactate >4 mmol/L\n\n**4. Rule out UGIB** — NGT aspirate or early EGD if:\n• Hematemesis or coffee-ground emesis\n• BUN/Cr ratio >30\n• Hemodynamically unstable with unclear source\n\n**5. Resuscitate** → proceed to resuscitation module',
    citation: [1, 3],
    next: 'lgib-resuscitation',

    summary: 'Large-bore IV, type & cross, consider MTP if shock index >1; rule out UGIB with NGT if unstable',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 2: RISK STRATIFICATION
  // =====================================================================

  {
    id: 'lgib-stable-risk',
    type: 'info',
    module: 2,
    title: 'Risk Stratification — Oakland Score',
    body: '[Oakland Score Calculator](#/calculator/oakland-score)\n\n**Oakland Score** predicts safe discharge in LGIB. Components:\n• Age (0-2 pts)\n• Sex (0-1 pts)\n• Previous LGIB admission (0-1 pts)\n• DRE findings (0-2 pts)\n• Heart rate (0-3 pts)\n• Systolic BP (0-5 pts)\n• Hemoglobin (0-22 pts)\n\n**Interpretation:**\n• **Score ≤8:** 95% probability of safe discharge — consider outpatient management\n• **Score >8:** Recommend admission for monitoring/intervention\n\n**Additional high-risk features:**\n• Anticoagulation use ([warfarin](#/drug/warfarin/reversal), DOACs)\n• Active malignancy\n• Cirrhosis with coagulopathy\n• Recent procedure (colonoscopy, polypectomy)',
    citation: [2, 4],
    calculatorLinks: [
      { id: 'oakland-score', label: 'Oakland Score' },
    ],
    next: 'lgib-oakland-result',

    summary: 'Oakland Score ≤8 = 95% safe discharge probability; >8 = admit for monitoring/intervention',
  },

  {
    id: 'lgib-oakland-result',
    type: 'question',
    module: 2,
    title: 'Oakland Score Result',
    body: 'What is the patient\'s Oakland Score?',
    citation: [2, 4],
    options: [
      {
        label: 'Score ≤8 — Low Risk',
        description: '95% safe discharge probability',
        next: 'lgib-low-risk',
      },
      {
        label: 'Score 9-16 — Intermediate Risk',
        description: 'Consider admission, individualize',
        next: 'lgib-intermediate',
      },
      {
        label: 'Score >16 — High Risk',
        description: 'Admit for monitoring and intervention',
        next: 'lgib-high-risk',
        urgency: 'urgent',
      },
    ],

    summary: '≤8 = low risk (outpatient); 9-16 = intermediate (individualize); >16 = high risk (admit)',
  },

  {
    id: 'lgib-low-risk',
    type: 'info',
    module: 2,
    title: 'Low-Risk LGIB (Oakland ≤8)',
    body: '**Safe for outpatient management** in most cases.\n\n**Criteria for discharge:**\n• Hemodynamically stable throughout observation\n• No significant drop in hemoglobin\n• Bleeding has stopped or minimal\n• Able to tolerate oral intake\n• Reliable follow-up available\n• No high-risk features (anticoagulation, malignancy, cirrhosis)\n\n**Discharge plan:**\n• GI follow-up for outpatient colonoscopy within 7-14 days\n• Clear liquid diet → advance as tolerated\n• Hold anticoagulation per GI guidance\n• Return precautions: recurrent bleeding, lightheadedness, syncope, hematemesis',
    citation: [2, 4],
    next: 'lgib-disposition',

    summary: 'Oakland ≤8 = outpatient colonoscopy within 7-14 days; ensure stable, no high-risk features',
  },

  {
    id: 'lgib-intermediate',
    type: 'question',
    module: 2,
    title: 'Intermediate-Risk LGIB',
    body: '**Oakland Score 9-16** — individualize disposition.\n\n**Factors favoring admission:**\n• Ongoing bleeding\n• Anticoagulation use\n• Comorbidities (cardiac, renal, hepatic)\n• Poor social support or unreliable follow-up\n• Anemia requiring transfusion\n\n**Factors favoring observation/discharge:**\n• Bleeding stopped\n• Hemoglobin stable\n• Young, otherwise healthy\n• Excellent follow-up',
    citation: [2],
    options: [
      {
        label: 'Admit for Monitoring',
        description: 'High-risk features present or clinical concern',
        next: 'lgib-high-risk',
      },
      {
        label: 'Discharge with Close Follow-up',
        description: 'Low-risk features, bleeding stopped, reliable f/u',
        next: 'lgib-disposition',
      },
    ],

    summary: 'Individualize Oakland 9-16: admit if ongoing bleeding, anticoagulation, comorbidities; discharge if stable + f/u',
  },

  {
    id: 'lgib-high-risk',
    type: 'info',
    module: 2,
    title: 'High-Risk LGIB',
    body: '**Oakland Score >16 or high-risk features** — admit for monitoring and intervention.\n\n**Management:**\n• NPO for potential colonoscopy/intervention\n• Continuous telemetry monitoring\n• Serial hemoglobin q6-8h\n• Type and screen (crossmatch if anticipated transfusion)\n• GI consultation for colonoscopy timing\n\n**Assess for anticoagulation reversal** if applicable:\n• [Warfarin](#/drug/warfarin/reversal): Vitamin K + 4-factor PCC\n• [Dabigatran](#/drug/idarucizumab/reversal): Idarucizumab\n• Xa inhibitors: Consider [andexanet alfa](#/drug/andexanet/reversal) or 4F-PCC',
    citation: [1, 2, 5],
    next: 'lgib-resuscitation',

    summary: 'Oakland >16: NPO, telemetry, serial Hgb, GI consult; reverse anticoagulation if present',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 3: RESUSCITATION
  // =====================================================================

  {
    id: 'lgib-resuscitation',
    type: 'info',
    module: 3,
    title: 'Resuscitation & Transfusion',
    body: '[Transfusion Thresholds](#/info/transfusion-thresholds)\n\n**IV Fluid Resuscitation:**\n• Balanced crystalloid (LR preferred over NS)\n• Avoid over-resuscitation — may worsen bleeding\n• Target MAP ≥65 mmHg\n\n**Transfusion Thresholds:**\n• **Hgb <7 g/dL** — transfuse in stable patients\n• **Hgb <8 g/dL** — transfuse if cardiovascular disease or symptomatic\n• **Active hemorrhage** — transfuse regardless of Hgb\n\n**Massive Transfusion Protocol:**\n• Activate if shock index >1.0 + ongoing bleeding\n• Target 1:1:1 ratio (pRBC:FFP:platelets)\n• Give TXA 1g IV if <3h from bleed onset (extrapolated from trauma data)\n\n**Coagulopathy Correction:**\n• Platelets if <50k with active bleeding\n• FFP if INR >1.5\n• Fibrinogen replacement if <150 mg/dL',
    citation: [1, 3, 5],
    treatment: {
      firstLine: {
        drug: 'Packed Red Blood Cells',
        dose: '1-2 units',
        route: 'IV',
        frequency: 'As needed',
        duration: 'Until Hgb target reached',
        notes: 'Threshold: <7 g/dL stable, <8 g/dL cardiac disease, any Hgb if active hemorrhage',
      },
      alternative: {
        drug: 'Tranexamic Acid (TXA)',
        dose: '1 g',
        route: 'IV',
        frequency: 'Once, then 1 g over 8 hours if ongoing',
        duration: 'Single dose or infusion',
        notes: 'Consider if <3h from bleed onset; limited data in LGIB',
      },
      monitoring: 'Serial Hgb q4-6h during active bleeding; coagulation studies; hemodynamics',
    },
    next: 'lgib-imaging',

    summary: 'Transfuse Hgb <7 (stable) or <8 (cardiac); MTP if shock + ongoing bleeding; TXA if <3h from onset',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 4: IMAGING DECISION
  // =====================================================================

  {
    id: 'lgib-imaging',
    type: 'question',
    module: 4,
    title: 'Imaging & Localization',
    body: '**Goal:** Identify bleeding source to guide intervention.\n\n**Imaging options based on hemodynamic status:**\n\n**CTA (CT Angiography):**\n• First-line for hemodynamically significant bleeding\n• Detects bleeding rates ≥0.3-0.5 mL/min\n• Can localize for embolization or surgery\n\n**Colonoscopy:**\n• First-line for stable patients\n• Diagnostic AND therapeutic\n• Timing: within 24h for most; urgent if ongoing bleeding\n\n**Nuclear Medicine (Tagged RBC Scan):**\n• Detects slower bleeding (0.1-0.4 mL/min)\n• Less specific for localization\n• Useful if intermittent bleeding',
    citation: [1, 6],
    options: [
      {
        label: 'CTA First',
        description: 'Hemodynamically significant or unstable',
        next: 'lgib-cta',
        urgency: 'urgent',
      },
      {
        label: 'Colonoscopy First',
        description: 'Stable patient, diagnostic + therapeutic intent',
        next: 'lgib-colonoscopy',
      },
      {
        label: 'Nuclear Medicine Scan',
        description: 'Intermittent bleeding, stable patient',
        next: 'lgib-nuclear',
      },
    ],

    summary: 'CTA for unstable/significant; colonoscopy for stable (diagnostic + therapeutic); nuclear for intermittent',
  },

  {
    id: 'lgib-cta',
    type: 'info',
    module: 4,
    title: 'CT Angiography',
    body: '**CTA abdomen/pelvis with arterial and venous phases.**\n\n**Sensitivity:** 85-90% for active bleeding ≥0.3-0.5 mL/min\n\n**Findings indicating active bleeding:**\n• Contrast extravasation into bowel lumen\n• "Spot sign" — focus of high attenuation\n\n**If CTA positive:**\n• Localization guides IR embolization or surgical planning\n• Proceed to angiography with embolization if IR available\n\n**If CTA negative:**\n• Bleeding may have stopped or be too slow\n• Proceed to colonoscopy when stable\n• Consider nuclear medicine scan if intermittent',
    citation: [6],
    next: 'lgib-intervention',

    summary: 'CTA detects ≥0.3-0.5 mL/min; positive → IR embolization; negative → colonoscopy or nuclear scan',
  },

  {
    id: 'lgib-colonoscopy',
    type: 'info',
    module: 4,
    title: 'Colonoscopy',
    body: '**Timing:**\n• **Within 24 hours** for most admissions — improves diagnostic yield\n• **Urgent (<12h)** if ongoing bleeding, hemodynamic instability\n• **Elective** for low-risk outpatients\n\n**Bowel prep:**\n• Rapid prep (4-6L PEG over 3-4h) improves visualization\n• May skip prep for urgent colonoscopy if significant blood\n\n**Therapeutic interventions:**\n• Hemostatic clips\n• Epinephrine injection\n• Thermal coagulation (APC, bipolar)\n• Band ligation for hemorrhoids\n\n**Common findings:**\n• Diverticulosis (30-65%)\n• Hemorrhoids (5-20%)\n• Angiodysplasia (3-15%)\n• Post-polypectomy bleeding\n• Colorectal neoplasm',
    citation: [1, 6],
    next: 'lgib-intervention',

    summary: 'Colonoscopy within 24h (urgent <12h if unstable); therapeutic options include clips, injection, coagulation',
  },

  {
    id: 'lgib-nuclear',
    type: 'info',
    module: 4,
    title: 'Nuclear Medicine Scan',
    body: '**Tagged RBC Scintigraphy:**\n• Detects bleeding rates as low as 0.1-0.4 mL/min\n• More sensitive than CTA for slow/intermittent bleeding\n• Can be imaged up to 24h after injection\n\n**Limitations:**\n• Less anatomically precise than CTA\n• May localize to region but not exact site\n• Requires 2-phase imaging (immediate + delayed)\n\n**If positive:**\n• Guides subsequent CTA or angiography for embolization\n• Guides surgical planning if intervention needed\n\n**If negative:**\n• Bleeding has stopped — proceed to elective colonoscopy\n• Consider capsule endoscopy for obscure bleeding',
    citation: [6],
    next: 'lgib-intervention',

    summary: 'Tagged RBC scan detects 0.1-0.4 mL/min; useful for intermittent bleeding; guides angiography if positive',
  },

  // =====================================================================
  // MODULE 5: INTERVENTION
  // =====================================================================

  {
    id: 'lgib-intervention',
    type: 'question',
    module: 5,
    title: 'Intervention Decision',
    body: '**Based on imaging and clinical status, select intervention pathway:**\n\n**IR Embolization:**\n• Source identified on CTA/angiography\n• Ongoing bleeding despite resuscitation\n• Hemodynamically unstable for colonoscopy\n\n**Colonoscopic Therapy:**\n• Source identified or suspected\n• Hemodynamically stable\n• Amenable to endoscopic treatment\n\n**Surgical Consultation:**\n• Failed endoscopic/IR therapy\n• Hemodynamic instability despite resuscitation\n• Massive bleeding requiring emergent intervention\n• Known surgical pathology (perforation, ischemia)',
    citation: [1, 6],
    options: [
      {
        label: 'IR Embolization',
        description: 'CTA-positive, ongoing bleeding, unstable for colonoscopy',
        next: 'lgib-embolization',
        urgency: 'urgent',
      },
      {
        label: 'Colonoscopic Therapy',
        description: 'Stable, endoscopically treatable source',
        next: 'lgib-endoscopic-tx',
      },
      {
        label: 'Surgical Consultation',
        description: 'Failed other therapies or surgical indication',
        next: 'lgib-surgery',
        urgency: 'critical',
      },
      {
        label: 'Observation Only',
        description: 'Bleeding stopped, no intervention needed',
        next: 'lgib-disposition',
      },
    ],

    summary: 'IR embolization if CTA+/unstable; colonoscopy if stable; surgery if failed other therapies or emergent indication',
  },

  {
    id: 'lgib-embolization',
    type: 'info',
    module: 5,
    title: 'IR Embolization',
    body: '**Angiography with selective embolization.**\n\n**Technique:**\n• Selective catheterization of mesenteric vessels\n• Provocative angiography if no active bleeding seen\n• Embolization with microcoils, particles, or gelfoam\n\n**Success rate:** 70-90% for acute control\n\n**Complications:**\n• Bowel ischemia (5-10%)\n• Access site hematoma\n• Rebleeding (15-25%)\n\n**Post-embolization care:**\n• Monitor for abdominal pain, fever (ischemia signs)\n• Serial lactate and abdominal exams\n• Surgery consultation if signs of bowel necrosis',
    citation: [6],
    next: 'lgib-disposition',

    summary: 'IR embolization 70-90% success; 5-10% bowel ischemia risk; monitor for ischemia signs post-procedure',
    safetyLevel: 'warning',
  },

  {
    id: 'lgib-endoscopic-tx',
    type: 'info',
    module: 5,
    title: 'Colonoscopic Therapy',
    body: '**Endoscopic hemostasis options:**\n\n**Hemostatic clips:**\n• First-line for most vascular lesions\n• Diverticular bleeding, post-polypectomy\n\n**Injection therapy:**\n• Epinephrine 1:10,000 dilution\n• Temporary hemostasis — combine with clips or thermal\n\n**Thermal coagulation:**\n• Argon plasma coagulation (APC) for angiodysplasia\n• Bipolar coagulation for point bleeding\n\n**Band ligation:**\n• Internal hemorrhoids\n• Rectal varices\n\n**Post-procedure:**\n• Observe for rebleeding (24-48h)\n• Advance diet as tolerated\n• Address anticoagulation with GI guidance',
    citation: [1, 6],
    next: 'lgib-disposition',

    summary: 'Clips for vascular lesions; epi injection + thermal for combined therapy; APC for angiodysplasia; bands for hemorrhoids',
  },

  {
    id: 'lgib-surgery',
    type: 'info',
    module: 5,
    title: 'Surgical Intervention',
    body: '**Indications for surgery:**\n• Hemodynamic instability despite resuscitation\n• Massive transfusion requirement (>6 units in 24h)\n• Failed endoscopic and IR therapy\n• Perforation or bowel ischemia\n• Known surgical pathology (cancer, diverticulitis with perforation)\n\n**Surgical options:**\n• Segmental colectomy if source localized\n• Subtotal colectomy if source not localized (higher morbidity)\n\n**Pre-operative:**\n• Optimize coagulation\n• Cross-match adequate blood products\n• Localize source if possible (reduces need for subtotal colectomy)',
    citation: [1, 6],
    next: 'lgib-disposition',

    summary: 'Surgery if failed other therapies, massive transfusion, or surgical pathology; localize source to avoid subtotal colectomy',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'lgib-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: 'Final disposition based on clinical course and intervention.',
    citation: [1, 2],
    options: [
      {
        label: 'ICU Admission',
        description: 'Ongoing bleeding, hemodynamic instability, massive transfusion',
        next: 'lgib-dispo-icu',
        urgency: 'critical',
      },
      {
        label: 'Floor Admission',
        description: 'Stable but requires monitoring, intervention, or serial Hgb',
        next: 'lgib-dispo-floor',
      },
      {
        label: 'Discharge',
        description: 'Low-risk, bleeding stopped, reliable follow-up',
        next: 'lgib-dispo-discharge',
      },
    ],

    summary: 'ICU if unstable/ongoing bleed; floor if stable but needs monitoring; discharge if low-risk with f/u',
  },

  {
    id: 'lgib-dispo-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU criteria:**\n• Hemodynamic instability requiring vasopressors\n• Massive transfusion protocol activated\n• Ongoing active bleeding\n• Post-intervention monitoring (embolization, surgery)\n\n**ICU orders:**\n• Continuous telemetry\n• Serial Hgb q4-6h\n• Serial lactate\n• Type and crossmatch 4+ units\n• NPO\n• GI and/or surgical consultation\n• Consider IR on standby',
    recommendation: 'Admit to ICU. Continue resuscitation. Serial hemoglobin monitoring. GI/Surgery/IR consultation as needed.',
    citation: [1],
  },

  {
    id: 'lgib-dispo-floor',
    type: 'result',
    module: 6,
    title: 'Floor Admission',
    body: '**Floor admission criteria:**\n• Hemodynamically stable\n• Oakland Score >8 or high-risk features\n• Requires monitoring or intervention\n• Anemia requiring transfusion but stable\n\n**Floor orders:**\n• Telemetry monitoring\n• Serial Hgb q6-8h × 24h\n• Type and screen\n• NPO until colonoscopy\n• GI consultation for colonoscopy timing\n• Hold anticoagulation per GI guidance',
    recommendation: 'Admit to floor. GI consultation for colonoscopy within 24 hours. Serial hemoglobin monitoring. Address anticoagulation.',
    citation: [1, 2],
  },

  {
    id: 'lgib-dispo-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge',
    body: '**Discharge criteria:**\n• Oakland Score ≤8\n• Hemodynamically stable\n• Bleeding stopped\n• No high-risk features\n• Reliable follow-up available\n\n**Discharge plan:**\n• GI follow-up for outpatient colonoscopy within 7-14 days\n• Clear liquid diet × 24h → advance as tolerated\n• Hold anticoagulation per GI guidance (if applicable)\n• Iron supplementation if anemic\n\n**Return precautions:**\n• Recurrent bright red blood per rectum\n• Lightheadedness or syncope\n• Hematemesis or melena\n• Abdominal pain',
    recommendation: 'Discharge with GI follow-up for outpatient colonoscopy in 7-14 days. Provide return precautions.',
    citation: [2, 4],
  },

];

export const LOWER_GI_BLEED_MODULE_LABELS = [
  'Initial Assessment',
  'Risk Stratification',
  'Resuscitation',
  'Imaging Decision',
  'Intervention',
  'Disposition',
];

export const LOWER_GI_BLEED_CRITICAL_ACTIONS = [
  { text: 'Rule out UGIB in unstable patients — up to 15% of apparent LGIB is brisk upper GI source', nodeId: 'lgib-start' },
  { text: 'Oakland Score ≤8 = 95% safe discharge probability', nodeId: 'lgib-stable-risk' },
  { text: 'Transfuse at Hgb <7 (stable) or <8 (cardiac disease)', nodeId: 'lgib-resuscitation' },
  { text: 'CTA first if hemodynamically significant; colonoscopy within 24h for stable patients', nodeId: 'lgib-imaging' },
  { text: 'Reverse anticoagulation: Vitamin K + PCC for warfarin; idarucizumab for dabigatran', nodeId: 'lgib-high-risk' },
];

export const LOWER_GI_BLEED_CITATIONS: Citation[] = [
  { num: 1, text: 'Strate LL, Gralnek IM. ACG Clinical Guideline: Management of Patients With Acute Lower Gastrointestinal Bleeding. Am J Gastroenterol. 2016;111(4):459-474.' },
  { num: 2, text: 'Oakland K, Chadwick G, East JE, et al. Diagnosis and Management of Acute Lower Gastrointestinal Bleeding: Guidelines from the British Society of Gastroenterology. Gut. 2019;68(5):776-789.' },
  { num: 3, text: 'Villanueva C, Colomo A, Bosch A, et al. Transfusion Strategies for Acute Upper Gastrointestinal Bleeding. N Engl J Med. 2013;368(1):11-21.' },
  { num: 4, text: 'Oakland K, Jairath V, Uberoi R, et al. Derivation and Validation of a Novel Risk Score for Safe Discharge After Acute Lower Gastrointestinal Bleeding: A Multicentre Cohort Study. Lancet Gastroenterol Hepatol. 2017;2(9):635-643.' },
  { num: 5, text: 'Frontera JA, Lewin JJ, Rabinstein AA, et al. Guideline for Reversal of Antithrombotics in Intracranial Hemorrhage. Neurocrit Care. 2016;24(1):6-46.' },
  { num: 6, text: 'Defined MC, Defined AN. EB Medicine Emergency Department Evaluation and Management of Lower Gastrointestinal Bleeding. 2024.' },
];
