// MedKitt — Hemodialysis Emergencies
// ED management of ESRD complications using AEIOU framework
// 5 modules: Triage → Electrolytes → Access → Fluid/Infection → Special Situations
// Based on KDOQI Guidelines and nephrology literature

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';

interface Citation {
  num: number;
  text: string;
}

export const HD_EMERGENCIES_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Use AEIOU framework to triage HD emergencies', nodeId: 'hd-start' },
  { text: 'Check potassium immediately and get EKG if elevated', nodeId: 'hd-hyperkalemia' },
  { text: 'Give calcium gluconate 1-2g IV for severe hyperkalemia with EKG changes', nodeId: 'hd-hyperkalemia' },
  { text: 'Arrange emergent dialysis for refractory hyperkalemia, pulmonary edema, or uremic emergency', nodeId: 'hd-emergent-dialysis' },
  { text: 'Preserve vascular access at all costs (avoid blood draws, BP cuffs on access arm)', nodeId: 'hd-access' },
  { text: 'Give antibiotics early for suspected catheter-related sepsis', nodeId: 'hd-infection' },
  { text: 'Call nephrology early for all HD-related emergencies', nodeId: 'hd-start' },
];

export const HD_EMERGENCIES_NODES: DecisionNode[] = [
  // ===================================================================
  // MODULE 1: Initial Triage — AEIOU Framework
  // ===================================================================
  {
    id: 'hd-start',
    type: 'info',
    module: 1,
    title: 'Hemodialysis Emergencies',
    body: '[HD Emergency Summary](#/info/hd-summary) — AEIOU framework for ESRD complications.\n\n**AEIOU Mnemonic:**\n• **A**ccess complications (bleeding, clotted, infected)\n• **E**lectrolyte emergencies (hyperkalemia, hypocalcemia)\n• **I**nfection (catheter sepsis, endocarditis)\n• **O**verload (pulmonary edema, HTN emergency)\n• **U**remia (encephalopathy, pericarditis, bleeding)\n\n**Key principles:**\n• Many interventions work differently in ESRD\n• Diuretics often ineffective (no urine output)\n• Emergent dialysis is definitive treatment for many conditions\n• Call nephrology early\n• Preserve vascular access at all costs',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'hd-emergency-triage', label: 'HD Emergency Triage' },
      { id: 'hd-hyperkalemia', label: 'Hyperkalemia Protocol' },
    ],
    next: 'hd-triage-question',
  },
  {
    id: 'hd-triage-question',
    type: 'question',
    module: 1,
    title: 'Primary Complaint Category',
    body: '**What is the primary presenting complaint?**\n\n**Quick assessment:**\n• When was last dialysis? (missed sessions = higher risk)\n• What type of access? (fistula, graft, catheter)\n• Any fever? (infection until proven otherwise)\n• Breathing difficulty? (overload vs infection)\n\n**Remember:** HD patients may present atypically.\n• MI without chest pain\n• Infection without fever\n• Sepsis with hypothermia',
    citation: [1],
    options: [
      { label: 'Access problem', description: 'Bleeding, clotted, or swelling', next: 'hd-access-main' },
      { label: 'Cardiac/Electrolyte concern', description: 'Weakness, arrhythmia, palpitations', next: 'hd-electrolyte-main' },
      { label: 'Suspected infection', description: 'Fever, access site changes', next: 'hd-infection-main' },
      { label: 'Volume overload / Dyspnea', description: 'SOB, edema, HTN', next: 'hd-overload-main' },
      { label: 'Uremic symptoms', description: 'AMS, bleeding, pericarditis', next: 'hd-uremia-main' },
    ],
  },

  // ===================================================================
  // MODULE 2: Electrolyte Emergencies
  // ===================================================================
  {
    id: 'hd-electrolyte-main',
    type: 'info',
    module: 2,
    title: 'Electrolyte Emergency',
    body: '**Hyperkalemia is the most common life-threatening emergency.**\n\n**Immediate actions:**\n1. **12-lead ECG** — Look for:\n   • Peaked T waves (earliest)\n   • PR prolongation\n   • QRS widening\n   • Loss of P waves\n   • Sine wave (pre-arrest)\n\n2. **STAT potassium level**\n\n3. **Continuous cardiac monitoring**\n\n**⚠️ ECG changes may precede lab result** — treat empirically if high suspicion!\n\n**Other electrolyte issues:**\n• Hypocalcemia (tetany, seizures)\n• Hypomagnesemia (arrhythmias)\n• Hyperphosphatemia (usually chronic)',
    citation: [2, 3],
    calculatorLinks: [
      { id: 'hd-hyperkalemia', label: 'Hyperkalemia Protocol' },
    ],
    next: 'hd-hyperkalemia-ecg',
  },
  {
    id: 'hd-hyperkalemia-ecg',
    type: 'question',
    module: 2,
    title: 'Hyperkalemia — ECG Assessment',
    body: '**Assess ECG for potassium toxicity:**\n\n**Progressive ECG changes:**\n1. Peaked T waves (K+ >5.5)\n2. PR prolongation (K+ >6.5)\n3. Loss of P waves (K+ >7.0)\n4. QRS widening (K+ >7.5)\n5. Sine wave → VF/Asystole (K+ >8.0)\n\n**⚠️ ECG may be normal with high K+**\n**⚠️ Severe changes may occur at lower K+ levels**\n\nAre ECG changes present?',
    citation: [3],
    options: [
      { label: 'Yes — ECG changes present', description: 'Emergent treatment needed', next: 'hd-hyperkalemia-severe' },
      { label: 'No — ECG normal, K+ 5.5-6.5', description: 'Moderate hyperkalemia', next: 'hd-hyperkalemia-moderate' },
      { label: 'No — ECG normal, K+ <5.5', description: 'Mild hyperkalemia', next: 'hd-hyperkalemia-mild' },
    ],
  },
  {
    id: 'hd-hyperkalemia-severe',
    type: 'info',
    module: 2,
    title: 'Severe Hyperkalemia Protocol',
    body: '**🚨 SEVERE HYPERKALEMIA — ECG changes present**\n\n**1. CARDIAC MEMBRANE STABILIZATION (Immediate):**\n• **Calcium gluconate 1-2 g IV** over 2-3 min\n• Onset: 1-3 minutes\n• Duration: 30-60 minutes\n• May repeat if ECG changes persist\n• Alternative: Calcium chloride 500-1000 mg (central line preferred)\n\n**2. SHIFT K+ INTRACELLULARLY:**\n• **Insulin 10 units regular IV + D50 25g**\n  — Onset: 15-30 min, duration 4-6 hr\n  — Monitor glucose q1h\n• **Albuterol 10-20 mg nebulized** (additive effect)\n  — Onset: 30 min, duration 2 hr\n\n**3. EMERGENT DIALYSIS:**\n• **Call nephrology STAT**\n• Only definitive treatment in ESRD\n• Removes 25-50 mEq K+/hour\n\n**⚠️ NOT emergent therapy:**\n• Kayexalate — hours to work, GI complications\n• Patiromer/SZC — not for acute use',
    citation: [3, 4],
    calculatorLinks: [
      { id: 'hd-hyperkalemia', label: 'Hyperkalemia Protocol' },
    ],
    next: 'hd-electrolyte-disposition',
  },
  {
    id: 'hd-hyperkalemia-moderate',
    type: 'info',
    module: 2,
    title: 'Moderate Hyperkalemia',
    body: '**K+ 5.5-6.5, no ECG changes:**\n\n**Management:**\n\n**1. Continuous cardiac monitoring**\n\n**2. Shift therapy:**\n• Insulin 10 units IV + D50 25g\n• Albuterol 10-20 mg nebulized (additive)\n\n**3. Contact nephrology:**\n• Arrange urgent dialysis\n• May need same-day HD\n\n**Consider calcium gluconate if:**\n• K+ trending up\n• Recent missed dialysis\n• High-risk patient\n\n**Repeat K+ in 1-2 hours**\n\n**Do NOT delay dialysis** — shift therapy is temporary',
    citation: [3, 4],
    next: 'hd-electrolyte-disposition',
  },
  {
    id: 'hd-hyperkalemia-mild',
    type: 'info',
    module: 2,
    title: 'Mild Hyperkalemia',
    body: '**K+ <5.5, no symptoms, normal ECG:**\n\n**Management:**\n• Continuous cardiac monitoring\n• Repeat K+ in 2-4 hours\n• Diet review with patient\n• Schedule urgent dialysis if trending up\n• Contact nephrology for HD timing\n\n**Patient education:**\n• High-K foods to avoid (bananas, oranges, tomatoes, potatoes)\n• Importance of dialysis adherence\n• Salt substitutes often contain KCl\n\n**Disposition:**\n• May discharge if stable, HD scheduled within 24h\n• Ensure reliable follow-up\n• Clear return precautions',
    citation: [3],
    next: 'hd-electrolyte-disposition',
  },
  {
    id: 'hd-electrolyte-disposition',
    type: 'info',
    module: 2,
    title: 'Electrolyte Emergency Disposition',
    body: '**Disposition based on severity:**\n\n**ADMIT:**\n• Any ECG changes\n• K+ >6.5 mEq/L\n• Symptomatic (weakness, palpitations)\n• Multiple missed HD sessions\n• Unable to arrange urgent outpatient HD\n• Refractory to initial treatment\n\n**May discharge if:**\n• K+ <6.0, no symptoms, normal ECG\n• Dialysis scheduled within 24 hours\n• Reliable patient with good HD adherence history\n• Clear return precautions understood\n\n**Always document:**\n• Dialysis schedule arranged\n• Nephrology contacted\n• Patient education provided',
    citation: [2, 3],
    next: undefined,
  },

  // ===================================================================
  // MODULE 3: Access Complications
  // ===================================================================
  {
    id: 'hd-access-main',
    type: 'question',
    module: 3,
    title: 'Access Complication Type',
    body: '**Access is the patient\'s lifeline — preserve if possible.**\n\n**Access types:**\n• **AVF (arteriovenous fistula)** — preferred, lowest complication rate\n• **AVG (arteriovenous graft)** — synthetic conduit\n• **Tunneled catheter (Permacath)** — highest infection risk\n• **Non-tunneled catheter** — temporary only\n\nWhat type of access complication?',
    citation: [5],
    options: [
      { label: 'Bleeding from access', description: 'Post-dialysis or spontaneous', next: 'hd-access-bleeding' },
      { label: 'Thrombosed access', description: 'No thrill/bruit, unable to use', next: 'hd-access-clotted' },
      { label: 'Access site infection', description: 'Redness, warmth, drainage', next: 'hd-infection-main' },
      { label: 'Arm swelling or steal syndrome', description: 'Ischemic symptoms, edema', next: 'hd-access-steal' },
    ],
  },
  {
    id: 'hd-access-bleeding',
    type: 'info',
    module: 3,
    title: 'Access Site Bleeding',
    body: '**Bleeding from HD access:**\n\n**Immediate management:**\n• **Direct pressure 15-20 minutes**\n• Use two fingers, steady pressure\n• Elevate extremity\n• **Do NOT tourniquet proximal to fistula** (thrombosis risk)\n• Avoid excessive compression (also causes thrombosis)\n\n**If hemodynamically unstable:**\n• Large bore IV in contralateral arm\n• Crossmatch blood\n• Fluid resuscitation\n• Vascular surgery STAT\n\n**After bleeding controlled:**\n• Observe 30-60 minutes\n• Review anticoagulation status\n• Check for aneurysm formation\n• Contact HD unit for follow-up\n\n**If rebleeding:**\n• Prolonged pressure\n• Suturing rarely helpful (may damage access)\n• Vascular surgery consultation',
    citation: [5, 6],
    calculatorLinks: [
      { id: 'hd-access-emergency', label: 'Access Emergency Guide' },
    ],
    next: 'hd-access-disposition',
  },
  {
    id: 'hd-access-clotted',
    type: 'info',
    module: 3,
    title: 'Thrombosed Access',
    body: '**Thrombosed fistula/graft — TIME SENSITIVE**\n\n**Assessment:**\n• No thrill or bruit = likely thrombosed\n• Document when access last worked\n• Assess for backup access options\n\n**Best outcomes within 24-48 hours of thrombosis**\n\n**Management options:**\n\n**AVF/AVG:**\n• Vascular surgery or IR consultation\n• Thrombectomy vs thrombolysis\n• May need temporary catheter for HD\n\n**Catheter:**\n• tPA lock (2 mg per lumen × 30-120 min)\n• Consult nephrology for protocol\n• May need catheter exchange over wire\n\n**Urgent needs:**\n• Arrange alternative HD access\n• Temporary catheter placement if needed\n• Contact nephrology for HD scheduling',
    citation: [5, 6],
    calculatorLinks: [
      { id: 'hd-access-emergency', label: 'Access Emergency Guide' },
    ],
    next: 'hd-access-disposition',
  },
  {
    id: 'hd-access-steal',
    type: 'info',
    module: 3,
    title: 'Steal Syndrome',
    body: '**Dialysis-Associated Steal Syndrome (DASS):**\n\n**Signs:**\n• Pale, cool hand distal to access\n• Pain, paresthesias, weakness\n• Symptoms worse DURING dialysis\n• Diminished pulses distally\n• May progress to tissue loss\n\n**Severity grading:**\n\n**Mild:** Cool hand, no rest pain\n→ Monitor, conservative management\n\n**Moderate:** Rest pain present\n→ Urgent vascular surgery referral\n\n**Severe:** Tissue loss, ulceration\n→ Emergent vascular surgery\n\n**Central venous stenosis:**\n• Unilateral arm/facial swelling\n• Collateral veins on chest\n• Usually history of prior catheter\n• IR consultation for venoplasty',
    citation: [5, 6],
    next: 'hd-access-disposition',
  },
  {
    id: 'hd-access-disposition',
    type: 'info',
    module: 3,
    title: 'Access Emergency Disposition',
    body: '**Disposition for access complications:**\n\n**ADMIT:**\n• Hemodynamic instability from bleeding\n• Unable to control bleeding\n• Severe steal syndrome (tissue loss)\n• Need for emergent temp catheter and HD\n• Access infection (see infection pathway)\n\n**Urgent outpatient management:**\n• Clotted access (if HD can wait 24-48h)\n• Mild steal syndrome\n• Stable post-bleeding\n\n**Key contacts:**\n• Vascular surgery (clotted access, steal)\n• Interventional radiology (thrombectomy, venoplasty)\n• Nephrology (HD scheduling, temp access)\n• HD unit (routine follow-up)\n\n**Document:**\n• Access type and location\n• Current patency (thrill/bruit present?)\n• Alternative access options',
    citation: [5],
    next: undefined,
  },

  // ===================================================================
  // MODULE 4: Infection & Volume Overload
  // ===================================================================
  {
    id: 'hd-infection-main',
    type: 'info',
    module: 4,
    title: 'HD-Related Infection',
    body: '**Catheter-related bloodstream infection (CRBSI):**\n\n**Risk hierarchy:**\n• Non-tunneled catheter > Tunneled catheter > AVG > AVF\n\n**Assessment:**\n• Blood cultures × 2 (peripheral + through catheter)\n• Exit site exam (erythema, purulence)\n• Tunnel exam (track erythema)\n• Signs of metastatic infection\n\n**Empiric antibiotics (IDSA guidelines):**\n• **Vancomycin 25 mg/kg** (dose after HD)\n  — Covers MRSA, coag-negative staph\n• **PLUS gram-negative coverage:**\n  — Cefepime 2g IV, OR\n  — Gentamicin (nephrology dosing)\n\n**⚠️ Most antibiotics dosed AFTER dialysis**\n\n**Remove catheter if:**\n• Septic shock\n• Tunnel infection\n• Persistent bacteremia >72h on antibiotics\n• Metastatic infection (endocarditis, osteo)\n• S. aureus or fungemia',
    citation: [7, 8],
    next: 'hd-infection-endocarditis',
  },
  {
    id: 'hd-infection-endocarditis',
    type: 'info',
    module: 4,
    title: 'Endocarditis Workup',
    body: '**Consider endocarditis in HD patients with bacteremia:**\n\n**High-risk features:**\n• S. aureus bacteremia (up to 25% have IE)\n• Prolonged bacteremia\n• New murmur\n• Embolic phenomena\n• Persistent fevers on antibiotics\n\n**Workup:**\n• TTE (initial screening)\n• TEE (if TTE negative and high suspicion)\n• Repeat blood cultures to document clearance\n\n**Duration of antibiotics:**\n• Uncomplicated CRBSI: 2-3 weeks\n• S. aureus without IE: 4 weeks\n• Endocarditis: 6 weeks\n\n**Disposition:**\n• Admit all suspected CRBSI\n• Contact nephrology for HD without catheter (temp access)\n• ID consultation recommended for S. aureus',
    citation: [7, 8],
    next: undefined,
  },
  {
    id: 'hd-overload-main',
    type: 'info',
    module: 4,
    title: 'Volume Overload / Pulmonary Edema',
    body: '**Volume overload in ESRD:**\n\n**⚠️ Diuretics often ineffective (no UOP)**\n\n**EMERGENT DIALYSIS is definitive treatment**\n\n**Temporizing measures:**\n\n**Oxygenation:**\n• High-flow O₂\n• NIPPV (BiPAP preferred)\n• Intubation if failing\n\n**Reduce preload:**\n• Nitrates (NTG 400 mcg SL → drip 50-200 mcg/min)\n• Positioning (upright)\n\n**Diuretics?**\n• Generally ineffective in ESRD\n• High-dose furosemide (160-200 mg IV) MAY work if residual function\n• Do not delay dialysis waiting for diuretics\n\n**HTN emergency with overload:**\n• Nitroprusside or nicardipine drip\n• Target 20-25% MAP reduction in first hour\n• Avoid fluid boluses',
    citation: [9, 10],
    next: 'hd-overload-disposition',
  },
  {
    id: 'hd-overload-disposition',
    type: 'info',
    module: 4,
    title: 'Overload Disposition',
    body: '**Volume overload disposition:**\n\n**Emergent dialysis indications:**\n• Severe pulmonary edema (hypoxic)\n• HTN emergency with encephalopathy\n• Refractory to medical management\n\n**Admit for dialysis:**\n• Moderate pulmonary edema\n• Significant O₂ requirement\n• Unable to arrange same-day outpatient HD\n• Missed multiple HD sessions\n\n**May discharge if:**\n• Mild symptoms resolving\n• Room air saturation\n• HD scheduled within 24 hours\n• Reliable patient\n\n**Education:**\n• Fluid and sodium restriction\n• Daily weights\n• HD adherence\n• When to return (SOB, can\'t lie flat)',
    citation: [9, 10],
    next: undefined,
  },

  // ===================================================================
  // MODULE 5: Uremic Emergencies & Special Situations
  // ===================================================================
  {
    id: 'hd-uremia-main',
    type: 'question',
    module: 5,
    title: 'Uremic Emergency Type',
    body: '**Uremic manifestations:**\n\n**Neurologic:**\n• Encephalopathy (AMS, asterixis, myoclonus)\n• Seizures\n• Peripheral neuropathy\n\n**Cardiovascular:**\n• Uremic pericarditis\n• Accelerated atherosclerosis\n\n**Hematologic:**\n• Platelet dysfunction → bleeding\n• Anemia of chronic disease\n\n**GI:**\n• Uremic gastritis\n• GI bleeding\n\nWhat is the primary uremic manifestation?',
    citation: [11],
    options: [
      { label: 'Encephalopathy / AMS', description: 'Confusion, asterixis, seizures', next: 'hd-uremic-encephalopathy' },
      { label: 'Pericarditis', description: 'Chest pain, friction rub', next: 'hd-uremic-pericarditis' },
      { label: 'Uremic bleeding', description: 'GI bleed, prolonged bleeding', next: 'hd-uremic-bleeding' },
    ],
  },
  {
    id: 'hd-uremic-encephalopathy',
    type: 'info',
    module: 5,
    title: 'Uremic Encephalopathy',
    body: '**Uremic Encephalopathy:**\n\n**Presentation:**\n• Confusion, disorientation\n• Asterixis (metabolic flap)\n• Myoclonus\n• Seizures\n• Progresses to coma\n\n**Differential (rule out):**\n• Hypoglycemia\n• Electrolyte abnormalities\n• Sepsis\n• Stroke\n• Drug toxicity\n\n**Management:**\n• **EMERGENT DIALYSIS** is definitive\n• Treat seizures if present:\n  — [Lorazepam](#/drug/lorazepam/seizure) 0.1 mg/kg IV\n  — [Levetiracetam](#/drug/levetiracetam/seizure) 20-40 mg/kg IV\n\n**⚠️ Dialysis Disequilibrium Syndrome (DDS):**\n• Risk: first HD, high BUN, pediatric, elderly\n• Prevent: slow, gentle initial dialysis\n• Target BUN reduction <40% first session',
    citation: [11, 12],
    calculatorLinks: [
      { id: 'hd-dds-prevention', label: 'DDS Prevention' },
    ],
    next: 'hd-uremia-disposition',
  },
  {
    id: 'hd-uremic-pericarditis',
    type: 'info',
    module: 5,
    title: 'Uremic Pericarditis',
    body: '**Uremic Pericarditis — DO NOT ANTICOAGULATE**\n\n**Presentation:**\n• Pleuritic chest pain (worse supine, better sitting)\n• Pericardial friction rub (pathognomonic)\n• ECG: diffuse ST elevation, PR depression\n• May progress to tamponade\n\n**⚠️ Critical distinction:**\n• Uremic pericarditis → hemorrhagic effusion risk\n• **Do NOT anticoagulate**\n• **Dialyze WITHOUT heparin**\n\n**Assessment:**\n• Echocardiogram (effusion size, tamponade?)\n• Hemodynamics (pulsus paradoxus?)\n\n**Management:**\n• Emergent dialysis (WITHOUT heparin)\n• Daily or intensive dialysis initially\n• NSAIDs contraindicated in ESRD\n• Colchicine may be used cautiously\n\n**If tamponade:**\n• Emergent pericardiocentesis\n• Surgical drainage if recurrent',
    citation: [11, 13],
    next: 'hd-uremia-disposition',
  },
  {
    id: 'hd-uremic-bleeding',
    type: 'info',
    module: 5,
    title: 'Uremic Bleeding',
    body: '**Uremic Platelet Dysfunction:**\n\n**Mechanism:**\n• Uremic toxins impair platelet function\n• Normal platelet count, prolonged bleeding time\n\n**Presentation:**\n• Prolonged bleeding from venipuncture\n• GI bleeding\n• Epistaxis\n• Ecchymoses\n\n**Management:**\n\n**Acute treatment:**\n• **DDAVP 0.3 mcg/kg IV** over 20-30 min\n  — Onset: 1 hour, duration 4-8 hours\n  — Releases vWF from endothelium\n  — Tachyphylaxis with repeated doses\n\n**For prolonged effect:**\n• Conjugated estrogens 0.6 mg/kg/day IV × 5 days\n  — Onset: 6 hours, duration 2 weeks\n\n**Emergent dialysis** if severe bleeding\n\n**Transfuse:**\n• pRBCs as needed\n• Platelets less helpful (will become dysfunctional)\n• Cryoprecipitate (contains vWF)',
    citation: [11, 14],
    next: 'hd-uremia-disposition',
  },
  {
    id: 'hd-uremia-disposition',
    type: 'info',
    module: 5,
    title: 'Uremic Emergency Disposition',
    body: '**Disposition for uremic emergencies:**\n\n**ADMIT ALL uremic emergencies:**\n• Uremic encephalopathy → ICU\n• Uremic pericarditis → Telemetry/ICU\n• Significant uremic bleeding → Depends on severity\n\n**Dialysis requirements:**\n• Emergent for encephalopathy\n• Daily/intensive for pericarditis\n• WITHOUT heparin for pericarditis\n• Slow/gentle for first HD or DDS risk\n\n**Consultations:**\n• Nephrology (always)\n• Cardiology (pericarditis, tamponade)\n• GI (GI bleeding)\n• Neurology (seizures)\n\n**Patient requiring new HD initiation:**\n• Higher DDS risk\n• Start with short (2 hr), gentle dialysis\n• Daily sessions until stabilized',
    citation: [11, 12],
    calculatorLinks: [
      { id: 'hd-dds-prevention', label: 'DDS Prevention' },
    ],
    next: undefined,
  },
];

export const HD_EMERGENCIES_CITATIONS: Citation[] = [
  { num: 1, text: 'Daugirdas JT, et al. Handbook of Dialysis. 5th ed. Lippincott Williams & Wilkins; 2015.' },
  { num: 2, text: 'KDOQI Clinical Practice Guidelines for Hemodialysis Adequacy. Am J Kidney Dis. 2015;66(5):884-930.' },
  { num: 3, text: 'Clase CM, et al. Potassium homeostasis and management of dyskalemia in kidney diseases. Kidney Int. 2020;97(1):42-61.' },
  { num: 4, text: 'Palmer BF. Managing hyperkalemia caused by inhibitors of the renin-angiotensin-aldosterone system. N Engl J Med. 2004;351(6):585-592.' },
  { num: 5, text: 'KDOQI Clinical Practice Guidelines for Vascular Access. Am J Kidney Dis. 2019;75(4 Suppl 2):S1-S164.' },
  { num: 6, text: 'Lok CE, et al. KDOQI Clinical Practice Guideline for Vascular Access: 2019 Update. Am J Kidney Dis. 2020;75(4 Suppl 2):S1-S164.' },
  { num: 7, text: 'Mermel LA, et al. IDSA Guidelines for Intravascular Catheter-Related Infection. Clin Infect Dis. 2009;49(1):1-45.' },
  { num: 8, text: 'Vanholder R, et al. Diagnosis, prevention and treatment of haemodialysis catheter-related bloodstream infections. Nephrol Dial Transplant. 2010;25(6):1761-1773.' },
  { num: 9, text: 'Kalantar-Zadeh K, et al. Fluid retention is associated with cardiovascular mortality in chronic kidney disease. Circulation. 2009;119(5):671-679.' },
  { num: 10, text: 'Jhund PS, et al. Diuretic strategies in patients with acute decompensated heart failure. N Engl J Med. 2011;364(9):797-805.' },
  { num: 11, text: 'Meyer TW, Hostetter TH. Uremia. N Engl J Med. 2007;357(13):1316-1325.' },
  { num: 12, text: 'Patel N, et al. Dialysis disequilibrium syndrome: a narrative review. Semin Dial. 2008;21(4):493-498.' },
  { num: 13, text: 'Alpert MA, Ravenscraft MD. Pericardial involvement in end-stage renal disease. Am J Med Sci. 2003;325(4):228-236.' },
  { num: 14, text: 'Hedges SJ, et al. Evidence-based treatment recommendations for uremic bleeding. Nat Clin Pract Nephrol. 2007;3(3):138-153.' },
];

export const HD_EMERGENCIES_NODE_COUNT = HD_EMERGENCIES_NODES.length;
export const HD_EMERGENCIES_MODULE_LABELS = ['AEIOU Triage', 'Electrolytes', 'Access', 'Infection/Overload', 'Uremia'];
