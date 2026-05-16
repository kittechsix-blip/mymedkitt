// MedKitt - Pediatric Hypertensive Emergency
// AAP 2017 + AHA 2017 scientific statement
// 5 modules: Recognition -> Workup -> Differential -> Treatment -> Disposition

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PEDS_HTN_EMERG_CRITICAL_ACTIONS = [
  { text: 'Confirm BP with manual cuff (correct size: bladder width ≥40% arm circumference)', nodeId: 'phe-confirm-bp' },
  { text: 'Screen for end-organ damage: neuro exam, fundoscopy, urinalysis, BMP, ECG', nodeId: 'phe-end-organ-eval' },
  { text: 'Head imaging if AMS, seizure, focal deficit, severe headache', nodeId: 'phe-end-organ-eval' },
  { text: 'Urgency (asymptomatic): oral agent, reduce BP gradually over 24-48h', nodeId: 'phe-tx-urgency' },
  { text: 'Emergency (end-organ damage): IV agent, reduce ≤25% MAP in first 8h', nodeId: 'phe-tx-emergency' },
  { text: 'Avoid rapid BP reduction (cerebral edema, watershed stroke risk)', nodeId: 'phe-bp-reduction-rule' },
  { text: 'Screen for secondary causes (renal, endocrine, cardiac, drug-induced)', nodeId: 'phe-secondary-causes' },
  { text: 'PICU admission for IV antihypertensive therapy', nodeId: 'phe-disposition' },
];

export const PEDS_HTN_EMERG_NODES: DecisionNode[] = [
  // ===================================================================
  // MODULE 1: Recognition & Definitions
  // ===================================================================
  {
    id: 'phe-start',
    type: 'info',
    module: 1,
    title: 'Pediatric Hypertensive Emergency Overview',
    body: 'See [Steps Summary](#/info/phe-steps-summary) for the rapid-action checklist.\n\n**Definitions (AAP 2017):** [1]\n- **Normal BP:** SBP/DBP <90th %ile for age/sex/height\n- **Elevated BP (formerly pre-HTN):** 90th to <95th %ile, or 120/80 to <95th %ile in adolescents ≥13y\n- **Stage 1 HTN:** 95th %ile to <95th %ile + 12 mmHg, or 130/80 to 139/89 (≥13y)\n- **Stage 2 HTN:** ≥95th %ile + 12 mmHg, or ≥140/90 (≥13y)\n\n**Urgency vs Emergency:** [2,3]\n- **Hypertensive urgency:** severe HTN (typically stage 2 + significant elevation) with **NO** end-organ damage\n- **Hypertensive emergency:** severe HTN **WITH** acute end-organ damage (encephalopathy, seizure, retinopathy, AKI, LV failure)\n\n**ED red-flag thresholds:** [2]\n- BP >99th %ile + 5 mmHg, OR\n- Adolescent: SBP >180 or DBP >120, OR\n- Any BP elevation with symptoms (HA, vomiting, vision change, seizure, AMS)\n\n**Why severe HTN matters in kids:**\n- Adults autoregulate over a wider range — kids decompensate faster\n- Most pediatric severe HTN is **secondary** (renal, cardiac, endocrine) [1,4]\n- Rapid lowering risks watershed infarcts and posterior reversible encephalopathy (PRES) [3]',
    citation: [1, 2, 3, 4],
    calculatorLinks: [
      { id: 'map-calculator', label: 'MAP Calculator' },
    ],
    next: 'phe-confirm-bp',
    summary: 'Urgency = severe BP without end-organ damage; emergency = severe BP WITH damage; most peds severe HTN is secondary; reduce slowly.',
  },
  {
    id: 'phe-steps-summary',
    type: 'info',
    module: 1,
    title: 'Steps Summary',
    body: '**Rapid action checklist for severe pediatric HTN:** [1,2,3]\n\n1. **Confirm BP** — correct cuff size, manual recheck both arms\n2. **Symptoms?** — HA, vomiting, vision change, AMS, seizure, focal deficit, dyspnea\n3. **End-organ workup** — neuro exam, fundoscopy, UA, BMP, ECG; head imaging if neuro symptoms\n4. **Classify:**\n   - Urgency (asymptomatic, no end-organ damage) → oral agent\n   - Emergency (end-organ damage) → IV agent, ICU\n5. **BP reduction rule** — ≤25% of planned drop in first 8h, then normalize over 24-48h\n6. **Screen secondary causes** — renal, cardiac, endocrine, drug-induced\n7. **Disposition** — PICU for emergencies; floor or close outpatient for urgencies after stabilization',
    citation: [1, 2, 3],
    next: 'phe-confirm-bp',
    skippable: true,
  },
  {
    id: 'phe-confirm-bp',
    type: 'info',
    module: 1,
    title: 'Confirm the Blood Pressure',
    body: '**Most "abnormal" pediatric BPs in the ED are measurement errors.** Always confirm before treating. [1,5]\n\n**Cuff size (the #1 source of error):** [1]\n- Bladder width: 40% of mid-arm circumference\n- Bladder length: 80-100% of arm circumference\n- **Cuff too small → falsely HIGH reading**\n- **Cuff too large → falsely low reading**\n\n**Technique:** [1]\n- Patient seated 3-5 min, feet flat, arm at heart level\n- Manual auscultation preferred (oscillometric devices over-read by 5-10 mmHg)\n- Repeat in BOTH arms — coarctation if SBP arm-arm difference >20 mmHg\n- Compare to right arm and a leg if coarctation suspected (leg should be ≥arm)\n\n**Reference tables:**\n- AAP 2017 tables stratify by age, sex, and **height percentile** — height matters [1]\n- Quick estimate: 90th %ile SBP ≈ 100 + 2×(age in years) for kids <13y\n\n**When NOT to delay treatment for confirmation:** [3]\n- Any end-organ damage signs (seizure, AMS, focal neuro, pulmonary edema)\n- These get treated empirically; confirm via art line in ICU',
    citation: [1, 3, 5],
    next: 'phe-symptom-screen',
    summary: 'Wrong cuff = wrong BP; bladder width 40% of arm circumference; manual auscultation preferred; check both arms and a leg for coarctation.',
    safetyLevel: 'warning',
  },
  {
    id: 'phe-symptom-screen',
    type: 'question',
    module: 1,
    title: 'End-Organ Symptoms?',
    body: 'After BP confirmed in severe range, screen for symptoms of end-organ involvement: [2,3]',
    citation: [2, 3],
    options: [
      {
        label: 'Symptomatic — end-organ damage suspected',
        description: 'HA, vomiting, vision change, AMS, seizure, focal deficit, dyspnea, chest pain',
        next: 'phe-end-organ-eval',
        urgency: 'critical',
      },
      {
        label: 'Asymptomatic — severe BP only',
        description: 'No neuro, cardiac, renal, or visual symptoms',
        next: 'phe-end-organ-eval',
        urgency: 'urgent',
      },
    ],
  },

  // ===================================================================
  // MODULE 2: Workup
  // ===================================================================
  {
    id: 'phe-end-organ-eval',
    type: 'info',
    module: 2,
    title: 'End-Organ Damage Workup',
    body: '**Every child with severe HTN needs an end-organ damage screen.** [2,3]\n\n**Neuro:**\n- Mental status, focal deficits, papilledema\n- **Fundoscopy** — flame hemorrhages, exudates, papilledema (hypertensive retinopathy)\n- **Head CT (non-contrast)** if AMS, seizure, focal deficit, severe HA\n- **MRI** preferred for [PRES](#/info/phe-pres) (parieto-occipital edema)\n\n**Cardiac:**\n- **ECG** — LVH (deep S V1 + tall R V5/V6), strain pattern\n- Listen for gallop, murmur (coarctation: harsh systolic ejection at LSB, radiates to back), pulmonary edema\n- Echo if signs of LV failure or coarctation suspected\n\n**Renal:**\n- **Urinalysis** — hematuria, proteinuria, casts (glomerulonephritis)\n- **BMP** — Cr (AKI), K+ (low K in renovascular HTN, primary hyperaldo)\n- Renal U/S with Doppler if renovascular HTN suspected\n\n**Labs to send:** [2]\n- CBC, BMP, urinalysis, urine drug screen, ECG\n- TSH if signs of thyroid disease\n- Plasma renin/aldosterone, metanephrines — usually outpatient workup\n\n**The presence of ANY end-organ damage upgrades to hypertensive emergency.**',
    citation: [2, 3],
    next: 'phe-classify',
    summary: 'Screen neuro (fundoscopy, head imaging if symptoms), cardiac (ECG for LVH), renal (UA, BMP); ANY end-organ damage = emergency.',
  },
  {
    id: 'phe-pres',
    type: 'info',
    module: 2,
    title: 'PRES (Posterior Reversible Encephalopathy)',
    body: '**PRES is the most common neurologic presentation of pediatric hypertensive emergency.** [3,6]\n\n**Clinical features:**\n- Headache, AMS, visual disturbance (cortical blindness), seizure\n- Often bilateral and posterior (parieto-occipital)\n- BP is usually severely elevated but PRES can occur at lower BPs if rapidly rising\n\n**Imaging:**\n- MRI: bilateral parieto-occipital vasogenic edema (T2/FLAIR hyperintensity)\n- CT may show hypodensities posteriorly\n- DWI typically negative (distinguishes from stroke)\n\n**Management:**\n- Reduce BP — gradual lowering reverses the syndrome\n- Treat seizures (levetiracetam, lorazepam)\n- Most cases reversible within days-weeks\n\n**Why ≤25% reduction matters:**\n- Cerebral autoregulation is reset upward in chronic HTN\n- Dropping BP too fast → cerebral hypoperfusion → watershed infarcts\n- PRES kids are especially vulnerable',
    citation: [3, 6],
    next: 'phe-classify',
    skippable: true,
  },
  {
    id: 'phe-classify',
    type: 'question',
    module: 2,
    title: 'Classify: Urgency vs Emergency',
    body: 'Based on workup, classify this presentation: [2,3]',
    citation: [2, 3],
    options: [
      {
        label: 'Hypertensive Emergency',
        description: 'Severe HTN + acute end-organ damage (encephalopathy, seizure, AKI, LV failure, retinopathy)',
        next: 'phe-tx-emergency',
        urgency: 'critical',
      },
      {
        label: 'Hypertensive Urgency',
        description: 'Severe HTN, no end-organ damage, may have mild symptoms (HA only)',
        next: 'phe-tx-urgency',
        urgency: 'urgent',
      },
    ],
  },

  // ===================================================================
  // MODULE 3: Differential & Secondary Causes
  // ===================================================================
  {
    id: 'phe-secondary-causes',
    type: 'info',
    module: 3,
    title: 'Secondary Causes — Most Peds HTN Is Secondary',
    body: '**Unlike adults, the majority of severe pediatric HTN is SECONDARY.** Always screen. [1,4]\n\n**Renal (most common, 60-80% of severe peds HTN):** [4]\n- **Renal artery stenosis** (fibromuscular dysplasia, post-transplant)\n- **Acute glomerulonephritis** (post-strep, IgA, lupus) — hematuria, edema, low C3\n- **Chronic kidney disease, reflux nephropathy**\n- **Polycystic kidney disease**\n- **Hemolytic uremic syndrome** (see [STEC/HUS](#/tree/peds-stec-hus))\n\n**Cardiovascular:**\n- **Coarctation of the aorta** — upper extremity HTN + diminished femoral pulses + arm-leg BP gradient\n- Always check 4-extremity BPs in any child with severe HTN\n\n**Endocrine (uncommon but high-yield):**\n- **Pheochromocytoma** — paroxysmal HTN, sweating, palpitations, headache, weight loss\n- **Hyperthyroidism** — tachycardia, tremor\n- **Cushing syndrome** — moon facies, striae, weight gain\n- **Primary hyperaldosteronism** — hypokalemia, metabolic alkalosis\n- **Congenital adrenal hyperplasia**\n\n**Drug/Toxin-induced:**\n- Sympathomimetics (cocaine, methamphetamine, MDMA, decongestants)\n- Stimulant ADHD medications\n- Steroids, NSAIDs, oral contraceptives\n- Caffeine/energy drink overuse\n- Withdrawal (clonidine, beta-blocker)\n\n**Other:**\n- Obstructive sleep apnea (especially with obesity)\n- Increased ICP (cushing triad)\n- Pain, anxiety, "white coat" — diagnosis of exclusion',
    citation: [1, 4],
    next: 'phe-bp-reduction-rule',
    summary: 'Renal causes most common (60-80%); always check 4-extremity BPs for coarctation; screen for stimulants and endocrine causes.',
  },
  {
    id: 'phe-bp-reduction-rule',
    type: 'info',
    module: 3,
    title: 'The 25% Rule for BP Reduction',
    body: '**The single most important treatment principle in pediatric hypertensive emergency.** [3,6]\n\n**Rule:**\n- Reduce **≤25% of planned BP drop** in the FIRST 8 hours\n- Reduce next 25% over hours 8-16\n- Achieve target BP over 24-48 hours total\n\n**Why slow:**\n- Chronic HTN resets cerebral autoregulation to a higher range\n- Rapid normalization → cerebral hypoperfusion → watershed infarction, blindness, PRES\n- Pediatric brains are especially vulnerable\n\n**Target BP:**\n- Reduce to <95th %ile for age/sex/height (not "normal" BP) [1]\n- Avoid dropping below 90th %ile in the acute phase\n\n**Example (12-year-old with BP 200/130, planned target 130/85):**\n- Planned MAP drop: ~153 → ~100 = 53 mmHg\n- First 8h: drop ≤25% = ~13 mmHg → target MAP ~140\n- Next 8-16h: another ~13 mmHg → MAP ~127\n- 24-48h: gradual to target MAP ~100\n\n**Operationally:**\n- IV titratable drips ([nicardipine](#/drug/nicardipine), [labetalol](#/drug/labetalol), [clevidipine](#/drug/clevidipine)) allow precise control\n- Avoid boluses of long-acting agents (hydralazine, sublingual nifedipine) — unpredictable drops\n- **Never use sublingual nifedipine** — banned in adults, dangerous in kids',
    citation: [1, 3, 6],
    next: 'phe-classify',
    summary: '≤25% drop in first 8h, next 25% over hours 8-16, target over 24-48h; avoid rapid drops (watershed infarct, PRES); NEVER use SL nifedipine.',
    safetyLevel: 'critical',
  },

  // ===================================================================
  // MODULE 4: Treatment
  // ===================================================================
  {
    id: 'phe-tx-emergency',
    type: 'info',
    module: 4,
    title: 'Treatment: Hypertensive Emergency (IV)',
    body: '**End-organ damage present → IV titratable therapy in PICU.** [2,3,6]\n\n**First-line (titratable infusions):**\n\n| Drug | Dose | Notes |\n|------|------|-------|\n| [Nicardipine](#/drug/nicardipine/peds-htn-emergency) | 0.5-3 mcg/kg/min IV infusion (start 0.5, titrate by 0.5 q5min) | Arterial-selective; preferred first-line; no rebound; safe with most renal/cardiac comorbidities |\n| [Labetalol](#/drug/labetalol/peds-htn-emergency) | Bolus 0.2-1 mg/kg IV (max 40 mg/dose) → infusion 0.25-3 mg/kg/h | Combined α/β; avoid in asthma, HF, AV block, cocaine |\n| [Clevidipine](#/drug/clevidipine/peds-htn-emergency) | 0.5-3.5 mcg/kg/min IV | Ultra-short t½; rapid titration; off-label in peds but used in PICU |\n\n**Adjuncts:**\n\n| Drug | Dose | Notes |\n|------|------|-------|\n| [Hydralazine](#/drug/hydralazine/peds-htn-emergency) | 0.1-0.2 mg/kg IV (max 20 mg) q4-6h | Bolus only; reflex tachycardia; unpredictable response; use as bridge |\n| [Esmolol](#/drug/esmolol) | 100-500 mcg/kg load → 25-200 mcg/kg/min | Useful with tachycardia, coarctation, post-cardiac surgery |\n| [Nitroprusside](#/drug/nitroprusside) | 0.5-8 mcg/kg/min | **Last line**; cyanide toxicity risk >24h or in renal failure; avoid if elevated ICP (raises ICP) |\n\n**Drugs to AVOID:** [3]\n- Sublingual nifedipine — unpredictable, dangerous\n- ACE inhibitors acutely — risk of profound drop especially in renovascular HTN\n- Furosemide as primary therapy — only if volume overload\n\n**Setup:**\n- 2 IVs, arterial line for continuous BP monitoring\n- Cardiac monitor, q5min BP until drip stable\n- Foley to track UOP\n- Bedside glucose if AMS',
    citation: [2, 3, 6],
    next: 'phe-tx-monitoring',
    summary: 'IV nicardipine first-line; labetalol if no contraindications; nitroprusside last-line (cyanide, raises ICP); never SL nifedipine.',
    safetyLevel: 'critical',
  },
  {
    id: 'phe-tx-urgency',
    type: 'info',
    module: 4,
    title: 'Treatment: Hypertensive Urgency (Oral)',
    body: '**Asymptomatic severe HTN without end-organ damage → oral agent, gradual reduction.** [1,2,6]\n\n**Goal:** Reduce BP by ≤25% in 8 hours, then gradually normalize over 24-48 hours. Same 25% rule applies even though risk lower.\n\n**Oral options:**\n\n| Drug | Dose | Onset |\n|------|------|-------|\n| Isradipine | 0.05-0.1 mg/kg/dose PO q6-8h | 1-2h |\n| [Amlodipine](#/drug/amlodipine) | 0.1-0.3 mg/kg/day PO (max 10 mg/day) | Slow (peak days) |\n| [Labetalol](#/drug/labetalol/peds-htn-urgency-oral) | 1-3 mg/kg/day PO divided BID-TID | 1-2h |\n| Clonidine | 0.05-0.1 mg PO q1h until BP controlled (max 0.8 mg total) | 30-60 min |\n| Captopril | 0.1-0.5 mg/kg/dose PO q8h (max 6 mg/kg/day) | 30 min |\n\n**Caution with captopril:** [1]\n- Avoid until renovascular HTN ruled out (bilateral RAS → AKI)\n- First-dose hypotension common — start LOW\n- Avoid in volume-depleted patient\n\n**Workflow:**\n- Pick one agent based on suspected etiology\n- Recheck BP at 1-2h, 4h, 8h\n- If BP drops appropriately, transition to scheduled oral therapy\n- Consult pediatric nephrology or cardiology before discharge\n- Outpatient follow-up within 1 week\n\n**If oral therapy fails or symptoms develop → switch to IV and admit.**',
    citation: [1, 2, 6],
    next: 'phe-tx-monitoring',
    summary: 'Oral isradipine, amlodipine, or labetalol; reduce gradually; recheck at 1-2h; consult nephrology/cardiology; follow up within 1 week.',
  },
  {
    id: 'phe-tx-monitoring',
    type: 'info',
    module: 4,
    title: 'Monitoring During Treatment',
    body: '**Watch for over-shoot and under-shoot during BP reduction.** [3,6]\n\n**Signs of TOO RAPID reduction (back off the drip):**\n- New confusion, somnolence\n- Pallor, diaphoresis\n- New focal neuro deficit\n- Decreased UOP\n- Reflex tachycardia (especially with hydralazine, nifedipine)\n\n**Signs of INADEQUATE reduction (escalate):**\n- Persistent severe HTN at 1-2h\n- Worsening symptoms\n- New end-organ damage signs\n\n**Monitoring schedule:**\n- Continuous arterial line BP if on drip\n- Cardiac monitor for arrhythmia (beta-blockers, electrolyte shifts)\n- Hourly neuro checks if PRES or encephalopathy\n- Repeat ECG if drip changed\n- Strict I/O — UOP <0.5 mL/kg/h suggests over-shoot or worsening AKI\n- Repeat BMP at 6-12h (Cr, K+, glucose)\n\n**Transition to oral:**\n- Once BP stable for 6-12h on a steady drip rate\n- Start oral agent with overlap (drip overlap 4-6h until oral peak)\n- Wean drip slowly\n\n**Workup continuation:**\n- Once stable, complete secondary cause workup ([see differential](#/node/phe-secondary-causes))\n- Renal U/S with Doppler, echo, plasma renin/aldosterone, urine metanephrines/catecholamines\n- Consult pediatric nephrology and cardiology',
    citation: [3, 6],
    next: 'phe-disposition',
    summary: 'Watch for over-shoot (AMS, oliguria) and under-shoot (persistent symptoms); art line BP if on drip; transition to oral with 4-6h overlap.',
  },

  // ===================================================================
  // MODULE 5: Disposition
  // ===================================================================
  {
    id: 'phe-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Determine appropriate disposition based on severity and response: [2,3]',
    citation: [2, 3],
    options: [
      {
        label: 'PICU admission',
        description: 'Hypertensive emergency, IV drip required, end-organ damage, neuro symptoms',
        next: 'phe-picu',
        urgency: 'critical',
      },
      {
        label: 'Inpatient floor / step-down',
        description: 'Urgency requiring close monitoring, transitioning from IV to oral, awaiting workup',
        next: 'phe-floor',
      },
      {
        label: 'Discharge with rapid follow-up',
        description: 'Asymptomatic urgency, controlled on single oral agent, reliable family, close f/u',
        next: 'phe-discharge',
      },
    ],
  },
  {
    id: 'phe-picu',
    type: 'result',
    module: 5,
    title: 'PICU Admission',
    body: '**PICU criteria:** [2,3]\n- Hypertensive emergency (any end-organ damage)\n- IV antihypertensive infusion required\n- Encephalopathy, seizure, or PRES\n- AKI requiring close monitoring or dialysis\n- LV failure / pulmonary edema\n- Possible coarctation or pheochromocytoma\n\n**PICU management:**\n- Arterial line for continuous BP\n- IV antihypertensive drip (nicardipine, labetalol, clevidipine)\n- Hourly neuro checks\n- Strict I/O, daily weights\n- Telemetry\n- Consult: pediatric nephrology, cardiology, possibly neurology\n\n**Workup completion:**\n- Renal U/S with Doppler (renovascular HTN, anatomic abnormalities)\n- Echocardiogram (LVH, coarctation, LV function)\n- Plasma renin/aldosterone (renovascular, primary hyperaldo)\n- Plasma free metanephrines or 24-h urine fractionated metanephrines (pheochromocytoma)\n- TSH, urine cortisol/dexamethasone suppression (Cushing)\n- Drug screen if not yet done\n\n**Transition plan:**\n- Wean to oral agents over 24-48h once BP stable\n- Establish maintenance oral regimen\n- Discharge with nephrology/cardiology follow-up within 1 week',
    recommendation: 'Admit to PICU with arterial line, IV antihypertensive infusion, hourly neuro checks, and pediatric nephrology consult.',
    confidence: 'definitive',
    citation: [2, 3],
  },
  {
    id: 'phe-floor',
    type: 'result',
    module: 5,
    title: 'Floor / Step-Down Admission',
    body: '**Floor criteria:** [2,6]\n- Hypertensive urgency requiring monitored oral therapy\n- Stable on oral regimen after ED initiation\n- Transitioning down from IV therapy\n- Awaiting completion of secondary cause workup\n- No active end-organ damage\n\n**Floor management:**\n- Telemetry\n- BP q1h × 4h, then q2-4h\n- Scheduled oral antihypertensive\n- Renal/cardiac labs daily\n- Pediatric nephrology consult\n\n**Escalation criteria → PICU:**\n- BP escalates despite oral therapy\n- New end-organ symptoms\n- New AKI or worsening Cr\n\n**Discharge planning:**\n- Stable BP <95th %ile for 24h on oral regimen\n- Family education on home BP monitoring\n- Nephrology/cardiology follow-up within 1 week\n- Return precautions for symptoms or BP recurrence',
    recommendation: 'Admit to floor with telemetry, oral antihypertensive therapy, and pediatric nephrology consultation.',
    confidence: 'recommended',
    citation: [2, 6],
  },
  {
    id: 'phe-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge with Rapid Follow-up',
    body: '**Discharge criteria (rare in ED for severe HTN — most need admission):** [1,6]\n- Asymptomatic, no end-organ damage\n- BP responsive to single oral agent in ED with sustained reduction\n- Reliable family with transportation and home BP cuff\n- Confirmed outpatient follow-up within 1 week\n- No suspected secondary cause requiring urgent workup\n- Already known to nephrology/cardiology with chronic HTN\n\n**Discharge meds:**\n- Continue effective ED oral agent (amlodipine, isradipine, labetalol)\n- Provide written dosing schedule\n\n**Return precautions:**\n- Severe HA, vomiting, vision change, confusion, seizure, focal weakness, chest pain, dyspnea\n- Any BP at home >99th %ile + 5\n\n**Follow-up:**\n- Pediatric nephrology or cardiology within 1 week\n- PCP within 48-72h for BP recheck\n- Outpatient workup: renal U/S w/ Doppler, echo, labs (renin/aldo, metanephrines)\n\n**Counseling:**\n- Lifestyle: DASH diet, weight management if obese, sodium <2.3g/day, 60 min activity/day, sleep hygiene\n- Limit caffeine, energy drinks\n- Screen for stimulant misuse if adolescent',
    recommendation: 'Discharge only if asymptomatic, BP controlled on oral agent, reliable family, and follow-up within 1 week. Most severe peds HTN warrants admission.',
    confidence: 'consider',
    citation: [1, 6],
  },
];

export const PEDS_HTN_EMERG_NODE_COUNT = PEDS_HTN_EMERG_NODES.length;

export const PEDS_HTN_EMERG_MODULE_LABELS = [
  'Recognition',
  'Workup',
  'Differential',
  'Treatment',
  'Disposition',
];

export const PEDS_HTN_EMERG_CITATIONS: Citation[] = [
  { num: 1, text: 'Flynn JT, Kaelber DC, Baker-Smith CM, et al. Clinical Practice Guideline for Screening and Management of High Blood Pressure in Children and Adolescents. Pediatrics. 2017;140(3):e20171904. doi:10.1542/peds.2017-1904' },
  { num: 2, text: 'Lurbe E, Agabiti-Rosei E, Cruickshank JK, et al. 2016 European Society of Hypertension guidelines for the management of high blood pressure in children and adolescents. J Hypertens. 2016;34(10):1887-1920.' },
  { num: 3, text: 'Brierley J, Marks SD. Treating the causes of paediatric hypertension using non-invasive physiological parameters. Med Hypotheses. 2010;75(5):439-441. + Chandar J, Zilleruelo G. Hypertensive crisis in children. Pediatr Nephrol. 2012;27(5):741-751.' },
  { num: 4, text: 'Wyszynska T, Cichocka E, Wieteska-Klimczak A, et al. A single pediatric center experience with 1025 children with hypertension. Acta Paediatr. 1992;81(3):244-246. + Flynn JT, Tullus K. Severe hypertension in children and adolescents: pathophysiology and treatment. Pediatr Nephrol. 2009;24(6):1101-1112.' },
  { num: 5, text: 'EMRA. Pediatric Hypertension: Approach in the Emergency Department. EMRA Cardiology Committee. 2023.' },
  { num: 6, text: 'Singh D, Akingbola O, Yosypiv I, El-Dahr S. Emergency management of hypertension in children. Int J Nephrol. 2012;2012:420247. + Stein DR, Ferguson MA. Evaluation and treatment of hypertensive crises in children. Integr Blood Press Control. 2016;9:49-58.' },
];
