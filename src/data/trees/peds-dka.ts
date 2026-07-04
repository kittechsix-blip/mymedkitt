// MedKitt - Pediatric DKA with Cerebral Edema Protocol
// ISPAD 2022 Consensus Guidelines (Glaser, Pediatr Diabetes 2022;23(7):835-56)
// + PECARN FLUID Trial (Kuppermann, NEJM 2018;378:2275-2287) — fluid rate/Na content do NOT cause cerebral edema
// + Muir/Glaser bedside diagnostic criteria for cerebral edema (Diabetes Care 2004;27(7):1541-6)
// + EB Medicine Pediatric Emergency Medicine Practice (Pediatric DKA, current edition)
// 6 modules: Recognition -> Fluid Resuscitation -> Insulin -> Cerebral Edema -> Resolution -> Mimics

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PEDS_DKA_CRITICAL_ACTIONS = [
  { text: 'Diagnose: glucose >200 + venous pH <7.30 OR HCO3 <18 + ketonemia/ketonuria (ISPAD)', nodeId: 'peds-dka-recognize' },
  { text: 'Severity: Mild pH 7.20-7.29 / Moderate 7.10-7.19 / Severe <7.10', nodeId: 'peds-dka-severity' },
  { text: 'Bolus only if hemodynamically unstable: 10 mL/kg 0.9% NS over 20-30 min, reassess', nodeId: 'peds-dka-fluids' },
  { text: 'Maintenance + deficit over 24-48h; per PECARN, fluid rate and Na content do NOT change neurologic outcome', nodeId: 'peds-dka-deficit' },
  { text: 'START INSULIN AFTER 1 hour of fluids — 0.05-0.1 U/kg/hr IV infusion, NO bolus', nodeId: 'peds-dka-insulin' },
  { text: 'Add dextrose (D5/D10) when glucose <250-300; do NOT stop insulin until anion gap closes', nodeId: 'peds-dka-dextrose' },
  { text: 'Muir criteria: 1 diagnostic OR 2 major OR 1 major + 2 minor = cerebral edema — treat immediately', nodeId: 'peds-dka-ce-recognize' },
  { text: 'Cerebral edema: HOB 30°, MANNITOL 0.5-1 g/kg over 10-15 min OR 3% NaCl 5-10 mL/kg over 30 min; intubate if GCS <8', nodeId: 'peds-dka-ce-treat' },
  { text: 'Resolution: pH >7.30, HCO3 ≥18, anion gap <12, tolerating PO; overlap SC long-acting 30-60 min before stopping IV', nodeId: 'peds-dka-resolution' },
];

export const PEDS_DKA_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & DIAGNOSTIC CRITERIA
  // =====================================================================

  {
    id: 'peds-dka-start',
    type: 'info',
    module: 1,
    title: 'Pediatric DKA with Cerebral Edema Protocol',
    body: 'See [Steps Summary](#/info/peds-dka-steps) for the rapid-action checklist.\n\n**Why peds DKA is different from adult DKA:** [1,2,3]\n- **Cerebral edema** is the #1 cause of DKA mortality in children (0.5-0.9% of episodes, 20-25% mortality, 10-25% permanent neuro deficit)\n- Children compensate then crash — the "looking better" child who then deteriorates 4-12h into treatment is the classic cerebral edema phenotype\n- Insulin is started AFTER fluids, not concurrently (UK national study: insulin within first hour associated with higher CE risk)\n- The **PECARN FLUID trial** (Kuppermann NEJM 2018, n=1389) overturned old dogma: neither **fluid rate** (fast vs slow) nor **NaCl content** (0.45 vs 0.9%) changed neurologic outcomes [2]\n\n**This consult covers:** [1,3]\n1. ISPAD diagnostic criteria + severity stratification\n2. Fluid resuscitation (PECARN-updated, no bolus dogma)\n3. Insulin therapy timing and dosing\n4. **Cerebral edema recognition (Muir criteria) and emergent treatment**\n5. Resolution criteria and SC insulin transition\n6. [Mimics, complications, and pitfalls](#/info/peds-dka-mimics)\n\n**High-risk for cerebral edema** (consider PICU-level monitoring from the start): [1,5]\n- Age <5 years\n- New-onset diabetes (~30-40% of peds DKA)\n- pH <7.10, pCO2 <21 mmHg, BUN >20 mg/dL\n- Long duration of symptoms before presentation\n- Depressed level of consciousness on arrival',
    citation: [1, 2, 3, 5],
    calculatorLinks: [
      { id: 'peds-dka-fluid-calc', label: 'DKA Fluid Calculator' },
      { id: 'muir-cerebral-edema', label: 'Muir CE Criteria' },
      { id: 'peds-dose', label: 'Peds Dose Calculator' },
      { id: 'corrected-na', label: 'Corrected Na' },
    ],
    next: 'peds-dka-recognize',
    summary: 'Peds DKA differs from adult: cerebral edema is the #1 killer; insulin starts AFTER 1h of fluids; PECARN showed fluid rate/Na content do not drive CE.',
    skippable: true,
  },

  {
    id: 'peds-dka-steps',
    type: 'info',
    module: 1,
    title: 'Steps Summary',
    body: '**Rapid-action checklist for suspected pediatric DKA:** [1,2,3]\n\n1. **Diagnose (ISPAD):** glucose >200 mg/dL + venous pH <7.30 OR HCO3 <18 + ketonemia/ketonuria\n2. **Severity:** Mild pH 7.20-7.29 / Moderate 7.10-7.19 / Severe <7.10\n3. **Labs:** VBG, BMP, glucose, β-hydroxybutyrate, UA, Mg/Phos/iCa, CBC, lactate; HbA1c if new-onset\n4. **Fluids (PECARN-updated):**\n   - Only **10 mL/kg 0.9% NS bolus over 20-30 min IF hemodynamically unstable**, then reassess\n   - Maintenance + deficit (5-10%) over **24-48h** using [DKA Fluid Calculator](#/calculator/peds-dka-fluid-calc)\n   - 0.9% NS vs 0.45% NS — PECARN showed equivalent neuro outcomes; ISPAD favors 0.9% NS first 4-6h\n5. **Potassium:** add 20-40 mEq/L KCl once K <5.5 AND urine output established; hold insulin if K <3.3\n6. **Insulin — start at HOUR 1, not zero:**\n   - **0.05-0.1 U/kg/hr IV infusion** (NO bolus)\n   - Target glucose drop 50-75 mg/dL/hr (faster = CE risk)\n   - Add D5/D10 when glucose <250-300 mg/dL — do NOT stop insulin until AG closes\n7. **Watch for cerebral edema (most often 4-12h in):** apply [Muir Criteria](#/calculator/muir-cerebral-edema)\n   - 1 diagnostic OR 2 major OR 1 major + 2 minor = CE diagnosis\n   - Treat IMMEDIATELY (do not wait for imaging): HOB 30°, **[mannitol](#/drug/mannitol/cerebral-edema) 0.5-1 g/kg over 10-15 min** OR **[3% NaCl](#/drug/hypertonic-saline/cerebral-edema) 5-10 mL/kg over 30 min**, intubate if GCS <8, then head CT and PICU\n8. **Resolution:** pH >7.30, HCO3 ≥18, anion gap <12, tolerating PO → overlap SC long-acting 30-60 min before stopping IV insulin\n9. **Disposition:** PICU for severe DKA, age <5, AMS, refractory, or any cerebral edema',
    citation: [1, 2, 3],
    next: 'peds-dka-recognize',
    skippable: true,
  },

  {
    id: 'peds-dka-recognize',
    type: 'info',
    module: 1,
    title: 'Recognition & Diagnostic Criteria (ISPAD 2022)',
    body: '**ISPAD 2022 biochemical criteria** (all three required): [1]\n- **Hyperglycemia** — blood glucose >200 mg/dL (11.1 mmol/L)\n- **Venous pH <7.30 OR serum HCO3 <18 mEq/L**\n- **Ketonemia (β-hydroxybutyrate ≥3 mmol/L) OR moderate-to-large urine ketones**\n\n**Common precipitants:** [1,3]\n- **New-onset type 1 diabetes** — ~30-40% of peds DKA episodes (especially <5yo, lower socioeconomic status)\n- **Missed insulin** — adolescents, pump disconnection, intentional omission\n- **Infection** — viral URI, gastroenteritis, UTI; check temp, exam carefully\n- **Pump failure** — kinked cannula, occluded set, dead battery, infusion site infiltrate\n- **Surgical/medical stress** — appendicitis presenting as DKA is a classic trap\n\n**Initial labs (single stick if possible):** [1,3]\n- **VBG** with lactate (pH, pCO2, HCO3)\n- **BMP** — Na (calculate [corrected Na](#/calculator/corrected-na) for hyperglycemia), K, Cl, BUN, Cr, glucose\n- **β-hydroxybutyrate** if available (most accurate ketone measure) OR urine ketones\n- **Mg, Phos, iCa** (depletion common, repletion needed)\n- **CBC** (leukocytosis common in DKA itself, but consider infection)\n- **UA** (ketones, glucose, signs of UTI)\n- **HbA1c** if new-onset diagnosis suspected\n- **Beta-hCG** in adolescent females\n- Consider: lipase if abdominal pain, blood/urine cultures if febrile, CXR/ECG only if indicated',
    citation: [1, 3],
    next: 'peds-dka-severity',
    summary: 'ISPAD: glucose >200 + pH <7.30 OR HCO3 <18 + ketones; new-onset is ~30-40%; always check corrected Na, β-OHB, Mg/Phos.',
    safetyLevel: 'warning',
  },

  {
    id: 'peds-dka-severity',
    type: 'question',
    module: 1,
    title: 'Severity Stratification',
    body: 'Per ISPAD 2022, severity is based on the venous pH on initial blood gas. Severity drives disposition and intensity of monitoring (not necessarily different fluids/insulin rates). [1]\n\nApply **clinical gestalt** over biochemistry alone — a child with pH 7.15 who is mentating well + perfusing well behaves differently than the same pH with AMS and shock.',
    citation: [1],
    options: [
      {
        label: 'Severe (pH <7.10) OR any AMS / shock / high-risk',
        description: 'Includes age <5, pCO2 <21, BUN >20, new-onset with long symptoms — PICU-level monitoring; cerebral edema risk elevated',
        next: 'peds-dka-fluids',
        urgency: 'critical',
      },
      {
        label: 'Moderate (pH 7.10-7.19)',
        description: 'Floor/intermediate care with q1-2h vitals, hourly glucose, q2-4h electrolytes; PICU if any deterioration',
        next: 'peds-dka-fluids',
        urgency: 'urgent',
      },
      {
        label: 'Mild (pH 7.20-7.29) — and tolerating PO?',
        description: 'Consider SC insulin protocol (NEJM 2023 SQuID trial in adolescents) if no AMS, mild dehydration, tolerating PO; otherwise standard pathway',
        next: 'peds-dka-fluids',
        urgency: 'routine',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: FLUID RESUSCITATION (PECARN-UPDATED)
  // =====================================================================

  {
    id: 'peds-dka-fluids',
    type: 'info',
    module: 2,
    title: 'Fluid Resuscitation — PECARN-Updated',
    body: '**The PECARN FLUID trial (Kuppermann NEJM 2018, n=1389) showed that neither fluid rate (fast vs slow) nor NaCl content (0.45% vs 0.9%) significantly changed neurologic outcomes.** This overturned decades of slow-rehydration dogma. [2]\n\n**Initial bolus — only if hemodynamically unstable:** [1,2]\n- **10 mL/kg 0.9% NS over 20-30 minutes**, then reassess\n- Can repeat once if still hypotensive/poor perfusion; further boluses → escalate to PICU + consider sepsis/cardiogenic shock\n- **Avoid reflexive 20 mL/kg boluses** in stable kids — fluid overload is real and shifts effective tonicity\n- ISPAD 2022 favors 20 mL/kg as initial bolus only in shock; BSPED uses 10 mL/kg even in shock\n\n**Replacement strategy:** [1,2]\n- **Maintenance + estimated deficit over 24-48 hours**\n- Use the [DKA Fluid Calculator](#/calculator/peds-dka-fluid-calc) for weight-based deficit + maintenance + drip rate\n- **Typical deficit:** 5-7% in moderate DKA, 7-10% in severe DKA (don\'t use clinical exam alone — kids look more dehydrated than they are in DKA)\n- **Fluid choice (first 4-6h):** 0.9% NS preferred per ISPAD; switch to 0.45% NS + 20-40 mEq/L KCl after K replete and corrected Na trending up\n- **Add KCl 20-40 mEq/L** once K <5.5 AND urine output established\n- **Hold insulin** if initial K <3.3 mEq/L — give K alone first',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'peds-dka-fluid-calc', label: 'DKA Fluid Calculator' },
      { id: 'corrected-na', label: 'Corrected Na' },
    ],
    next: 'peds-dka-deficit',
    summary: 'PECARN: fluid rate and Na content do NOT change neuro outcomes; bolus only if unstable (10 mL/kg); deficit + maintenance over 24-48h.',
    safetyLevel: 'critical',
  },

  {
    id: 'peds-dka-deficit',
    type: 'info',
    module: 2,
    title: 'Deficit Calculation & Drip Rate',
    body: '**Use the [DKA Fluid Calculator](#/calculator/peds-dka-fluid-calc)** for the full computation. Manual reference: [1,2]\n\n**Step 1 — Maintenance (Holliday-Segar 4-2-1):**\n- 4 mL/kg/hr for first 10 kg\n- 2 mL/kg/hr for next 10 kg\n- 1 mL/kg/hr for each kg >20 kg\n- Example (30 kg child): 4×10 + 2×10 + 1×10 = 70 mL/hr maintenance\n\n**Step 2 — Deficit:**\n- Mild DKA: 5%\n- Moderate: 7%\n- Severe: 10%\n- Deficit volume (mL) = weight (kg) × % × 10\n- Example (30 kg, 7% deficit): 30 × 7 × 10 = 2100 mL\n\n**Step 3 — Drip rate:**\n- Total = maintenance + deficit, **delivered over 24-48 hours**\n- Subtract any initial boluses already given\n- PECARN slow arm = 48h evenly; fast arm = half deficit in 12h + remainder 24h. **Both were equivalent for neuro outcomes** — pick based on local protocol and severity\n- Example (30 kg, 7% deficit, 24h): (70 × 24 + 2100) / 24 = ~158 mL/hr after subtracting boluses\n\n**Step 4 — Monitor:**\n- Strict I/O every hour\n- Reassess corrected Na (should rise as glucose falls)\n- If corrected Na **fails to rise** or **falls** as glucose drops → red flag for cerebral edema risk\n- Re-evaluate fluid plan if urine output >5 mL/kg/hr (over-replacing) or <1 mL/kg/hr (under-replacing)',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'peds-dka-fluid-calc', label: 'DKA Fluid Calculator' },
    ],
    next: 'peds-dka-potassium',
    summary: 'Maintenance (Holliday-Segar) + deficit (5/7/10%) over 24-48h; monitor corrected Na trend — failure to rise is a CE warning.',
  },

  {
    id: 'peds-dka-potassium',
    type: 'info',
    module: 2,
    title: 'Potassium Management',
    body: '**Total body K is depleted in every DKA patient** despite normal/high serum K at presentation. Insulin + acidosis correction will drive K intracellular fast. [1,3]\n\n**Initial K and what to do:** [1]\n| Serum K | Action |\n|---------|--------|\n| **<3.3** | **HOLD INSULIN** — give 0.5-1 mEq/kg KCl IV (max 40 mEq/hr) over 1h, recheck before starting insulin |\n| **3.3-5.5** | Add **20-40 mEq/L KCl** to fluids once **urine output established** |\n| **>5.5** | No K replacement yet; recheck in 1-2h; start insulin |\n\n**Practical fluid composition (most kids):** [1]\n- Half as KCl + half as K-phosphate (covers phosphate depletion too)\n- 20 mEq/L of each = 40 mEq/L total K\n- Avoid >0.5 mEq/kg/hr peripheral K — burns and arrhythmia risk\n\n**Monitor K every 2 hours** during active insulin infusion. Replace **aggressively as glucose falls** — falling K + insulin running = arrhythmia risk.\n\n**Phosphate:** [1]\n- ISPAD 2022 recommends routine phosphate repletion in severe DKA if available\n- Treat severe hypoPO4 (<1 mg/dL) — may need to pause insulin until corrected\n- Don\'t over-replace — hypocalcemia from PO4 binding is a real complication',
    citation: [1, 3],
    next: 'peds-dka-insulin',
    summary: 'K<3.3 = HOLD insulin + give K first; K 3.3-5.5 = 20-40 mEq/L in fluids w/ UOP; check q2h; phosphate repletion if available in severe DKA.',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 3: INSULIN THERAPY
  // =====================================================================

  {
    id: 'peds-dka-insulin',
    type: 'info',
    module: 3,
    title: 'Insulin Therapy — Start AFTER 1 Hour of Fluids',
    body: '**Key change from adult DKA:** Start insulin AT or AFTER 1 hour of fluid resuscitation, NOT concurrently. UK national study showed greater cerebral edema risk when insulin given in the first hour. ISPAD 2022 reinforces this. [1,3]\n\n**Insulin protocol:** [1,3]\n- **[Insulin regular](#/drug/insulin-regular/dka-pediatric) 0.05-0.1 U/kg/hr IV continuous infusion**\n- **NO IV bolus** (cerebral edema concern, no efficacy benefit in peds)\n- Start with **0.05 U/kg/hr** in children <5yo or severe DKA with HHS overlap (lower CE risk)\n- Start with **0.1 U/kg/hr** in most other pediatric DKA\n\n**Target glucose drop:** [1]\n- **50-75 mg/dL/hr** is ideal\n- **>100 mg/dL/hr is too fast** → cerebral edema risk; reduce insulin\n- **<50 mg/dL/hr** → check insulin tubing, line, glucose accuracy; may need to increase\n\n**When glucose drops to ~250-300 mg/dL:** see [Add Dextrose](#/node/peds-dka-dextrose) — do NOT stop insulin until anion gap closes.\n\n**Monitoring during insulin infusion:** [1]\n- **Hourly glucose** by point-of-care\n- **Q2h electrolytes** (K, Na, HCO3, anion gap)\n- **Q1-2h neuro exam** (mental status, headache, vomiting, vitals trend)\n- **Continuous cardiac monitoring** while K is repleting\n- **Strict I/O hourly**',
    citation: [1, 3],
    next: 'peds-dka-dextrose',
    summary: 'Insulin starts AFTER 1h fluids — 0.05-0.1 U/kg/hr IV, NO bolus; target glucose drop 50-75 mg/dL/hr; faster = CE risk.',
    safetyLevel: 'critical',
  },

  {
    id: 'peds-dka-dextrose',
    type: 'info',
    module: 3,
    title: 'Adding Dextrose — Two-Bag System',
    body: '**Once glucose reaches 250-300 mg/dL, add dextrose. Do NOT stop insulin** — the anion gap, not the glucose, drives when you stop insulin. [1,3]\n\n**Two-bag system (preferred in most peds protocols):** [1,3]\n- **Bag A:** 0.45% NS + 20-40 mEq/L KCl (or per K plan), NO dextrose\n- **Bag B:** 0.45% NS + 20-40 mEq/L KCl + D10 (or D5)\n- Both run through same IV at the same total rate; vary the ratio to deliver D2.5 → D10 effective concentration as needed\n\n**Dextrose targets:** [1]\n| Glucose | Action |\n|---------|--------|\n| >300 | All Bag A (no dextrose) |\n| 250-300 | Start dextrose (D5 effective) |\n| 200-250 | Increase to D7.5 |\n| 150-200 | Increase to D10 |\n| <150 | Hold off-target — increase dextrose further OR slow insulin to 0.05 U/kg/hr (not below) |\n\n**Why not stop insulin:** [1]\n- The acidosis is from ketones, not glucose\n- Stopping insulin → ketogenesis restarts → anion gap reopens\n- Goal: keep insulin running until pH >7.30, HCO3 ≥18, **anion gap <12**, then transition\n\n**[Insulin regular](#/drug/insulin-regular/dka-pediatric) dosing reference card.**',
    citation: [1, 3],
    next: 'peds-dka-ce-recognize',
    summary: 'Add dextrose when glucose 250-300; two-bag system; do NOT stop insulin until anion gap closes — it\'s the ketones, not the glucose.',
  },

  // =====================================================================
  // MODULE 4: CEREBRAL EDEMA RECOGNITION & TREATMENT (CRITICAL)
  // =====================================================================

  {
    id: 'peds-dka-ce-recognize',
    type: 'info',
    module: 4,
    title: 'Cerebral Edema Recognition (Muir Criteria)',
    body: '**Cerebral edema is the #1 killer in pediatric DKA.** Mortality 20-25%, permanent neuro deficit in 10-25% of survivors. Most cases occur **4-12 hours into treatment** — the child who is "looking better" then suddenly deteriorates. [4,5]\n\n**Muir/Glaser bedside criteria (Diabetes Care 2004) — 92% sens, 96% spec:** [4]\n\n**DIAGNOSTIC (any 1 = diagnose):**\n- Abnormal motor or verbal response to pain\n- Decorticate or decerebrate posturing\n- Cranial nerve palsy (esp III, IV, VI)\n- Abnormal neurogenic respiratory pattern (grunting, tachypnea, Cheyne-Stokes, apneusis)\n\n**MAJOR (any 2 = diagnose):**\n- Altered mentation / fluctuating LOC\n- **Sustained HR deceleration >20 bpm** (not from improved volume or sleep)\n- Age-inappropriate incontinence\n\n**MINOR (1 major + 2 minor = diagnose):**\n- Vomiting (recurrence after initial improvement)\n- Headache\n- Lethargy / difficult to arouse\n- Diastolic BP >90 mmHg\n- Age <5 years\n\n**Use the [Muir CE Criteria Calculator](#/calculator/muir-cerebral-edema) at the bedside.**\n\n**Clinical context:** [4,5]\n- The diagnosis is **clinical** — ~40% of initial head CTs in CE are NORMAL\n- GCS alone is NOT sensitive enough — Muir criteria detect CE earlier\n- A child whose mentation **worsens** during treatment has CE until proven otherwise\n- **Risk factors:** age <5, new-onset, pH <7.10, pCO2 <21, BUN >20, bicarbonate administration, rapid Na decline, slow corrected-Na rise during treatment\n- **Bicarbonate increases CE risk and is not recommended** except for life-threatening hyperkalemia or pH <6.9 with myocardial dysfunction',
    citation: [4, 5],
    calculatorLinks: [
      { id: 'muir-cerebral-edema', label: 'Muir CE Criteria' },
    ],
    next: 'peds-dka-ce-decide',
    summary: 'CE = #1 killer; 4-12h into tx; Muir criteria 92/96 sens/spec; clinical dx (~40% initial CT normal); risk factors: <5yo, new-onset, severe acidosis, bicarb use.',
    safetyLevel: 'critical',
  },

  {
    id: 'peds-dka-ce-decide',
    type: 'question',
    module: 4,
    title: 'Cerebral Edema — Treat Now?',
    body: 'Use the [Muir CE Criteria](#/calculator/muir-cerebral-edema). If criteria met, treat IMMEDIATELY without waiting for imaging — overtreatment risk is much lower than delayed treatment risk. [4,5]',
    citation: [4, 5],
    options: [
      {
        label: 'YES — Muir criteria met OR strong clinical suspicion',
        description: 'Diagnostic criterion present, OR 2 major, OR 1 major + 2 minor, OR sudden neuro decline regardless of score → emergent treatment',
        next: 'peds-dka-ce-treat',
        urgency: 'critical',
      },
      {
        label: 'NO — criteria not met, continue current protocol',
        description: 'Continue insulin + fluids, q1-2h neuro checks, lower threshold to retreat if any minor criteria emerge',
        next: 'peds-dka-resolution',
        urgency: 'routine',
      },
    ],
  },

  {
    id: 'peds-dka-ce-treat',
    type: 'result',
    module: 4,
    title: 'Cerebral Edema — Emergent Treatment',
    body: '**Act in this order. Do NOT wait for imaging — most initial CTs are normal in CE.** [1,4,5]\n\n**1. Airway and head positioning (within seconds):**\n- **Elevate head of bed to 30°** (or reverse Trendelenburg)\n- Avoid neck flexion / jugular compression\n- **Intubate if GCS <8 or rapidly declining** — RSI with hyperventilation to pCO2 30-35 transiently OK as bridge\n- Avoid hypoxia, hypotension, hypercapnia, hyperthermia (all worsen ICP)\n\n**2. Osmotic therapy (first-line, choose ONE):** [1,4]\n- **[Mannitol](#/drug/mannitol/cerebral-edema) 0.5-1 g/kg IV over 10-15 minutes** — fastest onset, requires intact volume status, in-line filter (crystallizes)\n- **[3% NaCl (hypertonic saline)](#/drug/hypertonic-saline/cerebral-edema) 5-10 mL/kg IV over 30 minutes** — preferred when hypotensive/hypovolemic (mannitol diuresis can worsen perfusion)\n- Can repeat osmotic dose in 30 min if no response\n\n**3. Reduce IV fluid rate by 1/3** while continuing insulin (don\'t turn off insulin — ketosis is still active)\n\n**4. After stabilization:**\n- Head **CT without contrast** to rule out hemorrhage, infarct, herniation\n- **PICU transfer** mandatory\n- Neurosurgery consult for any midline shift, hemorrhage, or fixed dilated pupil\n- Continuous neuro monitoring, ICP monitoring case-by-case\n\n**5. Don\'t do these (worsen CE):** [1,5]\n- **Bicarbonate** — increases paradoxical CSF acidosis and CE risk\n- **Rapid free water shifts** — keep corrected Na rising slowly\n- **Aggressive boluses** unless overt shock\n- **Stopping insulin completely** — ketogenesis worsens',
    recommendation: 'HOB 30°, intubate if GCS <8. Mannitol 0.5-1 g/kg over 10-15 min OR 3% NaCl 5-10 mL/kg over 30 min. Reduce fluid rate 1/3. Head CT after stabilization. PICU + neurosurgery consult.',
    confidence: 'definitive',
    citation: [1, 4, 5],
  },

  // =====================================================================
  // MODULE 5: RESOLUTION & TRANSITION
  // =====================================================================

  {
    id: 'peds-dka-resolution',
    type: 'info',
    module: 5,
    title: 'Resolution Criteria & SC Insulin Transition',
    body: '**Resolution criteria (ALL required) per ISPAD 2022:** [1,3]\n- **pH >7.30**\n- **Serum HCO3 ≥18 mEq/L**\n- **Anion gap <12 mEq/L** — the most important marker; pH/HCO3 can normalize from hyperchloremia while ketosis persists\n- **Tolerating PO** without nausea/vomiting\n- Clinically improved, eating, ambulating (age-appropriate)\n\n**Transition to SC insulin (overlap is critical):** [1,3]\n- Give the **first SC long-acting dose** ([insulin glargine](#/drug/insulin-regular/dka-pediatric) or detemir) **30-60 minutes BEFORE stopping the IV infusion**\n- For new-onset: typical glargine starting dose 0.25-0.5 U/kg/day SC daily\n- Established patients: resume home long-acting at usual dose\n- Add rapid-acting SC ([insulin lispro/aspart](#/drug/insulin-regular/dka-pediatric)) with first meal\n- **Stopping IV insulin without SC overlap → DKA recurs within hours**\n\n**Discharge bundle (for established T1D in mild DKA who didn\'t admit):** [1,3]\n- Endocrine follow-up within 1-2 weeks\n- Glucagon emergency kit prescription verified\n- Sick day rules reviewed (more frequent BG checks, ketone checks, when to call)\n- CGM/pump troubleshooting if relevant\n- Diabetes educator referral if any gaps in self-management\n\n**For new-onset diabetes:**\n- Admit for diabetes education + endocrine team\n- HbA1c, thyroid antibodies, celiac panel as outpatient workup\n- Family education before discharge: glucagon, insulin, BG monitoring, ketone testing, sick day rules',
    citation: [1, 3],
    next: 'peds-dka-disposition',
    summary: 'Resolution: pH >7.30 + HCO3 ≥18 + AG <12 + tolerating PO; give first SC long-acting 30-60 min BEFORE stopping IV insulin or DKA recurs.',
  },

  {
    id: 'peds-dka-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Disposition is driven by severity, monitoring needs, social factors, and whether new-onset vs established T1D. [1,3]',
    citation: [1, 3],
    options: [
      {
        label: 'PICU',
        description: 'Severe DKA (pH <7.10), age <5, AMS, any cerebral edema, refractory acidosis, hemodynamic instability, intubated',
        next: 'peds-dka-picu',
        urgency: 'critical',
      },
      {
        label: 'Pediatric floor / step-down',
        description: 'Moderate DKA improving on protocol, no AMS, no CE concern, off bolus, stable on continuous infusion',
        next: 'peds-dka-floor',
        urgency: 'urgent',
      },
      {
        label: 'Discharge (mild DKA, established T1D, SC protocol)',
        description: 'pH 7.20-7.29, tolerating PO, anion gap closed in ED, established patient with reliable follow-up — increasingly used in adolescents (SQuID II trial)',
        next: 'peds-dka-discharge',
        urgency: 'routine',
      },
    ],
  },

  {
    id: 'peds-dka-picu',
    type: 'result',
    module: 5,
    title: 'PICU Admission',
    body: '**PICU criteria:** [1,3]\n- pH <7.10 (severe DKA)\n- Age <5 with moderate-severe DKA\n- Any cerebral edema (current or recent)\n- AMS / GCS <14\n- Hemodynamic instability or refractory acidosis\n- Intubated or NIV\n- Comorbid sepsis, AKI, or other organ dysfunction\n\n**PICU orders:** [1,3]\n- Continuous cardiac + SpO2 + ETCO2 monitoring\n- Hourly glucose POC, q2h BMP/VBG, q4h Mg/Phos/iCa\n- Hourly strict I/O\n- Hourly neuro checks with Muir criteria documented\n- Continuous [insulin regular](#/drug/insulin-regular/dka-pediatric) infusion per protocol; two-bag dextrose system\n- Bedside [mannitol](#/drug/mannitol/cerebral-edema) and [3% NaCl](#/drug/hypertonic-saline/cerebral-edema) drawn up and ready\n- Endocrine + neuro consults\n- Diabetes educator engaged once stable',
    recommendation: 'PICU admit. Hourly glucose + neuro checks (Muir). q2h BMP/VBG. Two-bag dextrose system. Mannitol/3% NaCl drawn at bedside. Endocrine + neuro on board.',
    confidence: 'definitive',
    citation: [1, 3],
  },

  {
    id: 'peds-dka-floor',
    type: 'result',
    module: 5,
    title: 'Pediatric Floor Admission',
    body: '**Floor admission criteria:** [1,3]\n- Mild-to-moderate DKA, pH ≥7.10\n- Mentation intact, no Muir criteria\n- Stable hemodynamics\n- On standard insulin infusion with smooth glucose decline\n- No new-onset complications\n\n**Floor orders:** [1,3]\n- q1-2h vital signs and neuro checks (Muir documented)\n- Hourly POC glucose\n- q2-4h BMP/VBG until AG closing, then q4-6h\n- Strict I/O\n- Continue [insulin regular](#/drug/insulin-regular/dka-pediatric) infusion + two-bag dextrose system\n- Endocrine consult + diabetes educator if new-onset or care gap\n- **Escalation criteria → PICU:** any Muir criterion, GCS drop, sustained HR drop >20, recurrence of vomiting, headache + minor criteria',
    recommendation: 'Pediatric floor admit. q1-2h vitals + neuro (Muir). Hourly glucose. q2-4h BMP. Endocrine + diabetes educator. Clear PICU escalation triggers.',
    confidence: 'recommended',
    citation: [1, 3],
  },

  {
    id: 'peds-dka-discharge',
    type: 'result',
    module: 5,
    title: 'ED Discharge (Mild DKA Protocol)',
    body: '**Emerging evidence (SQuID II trial 2023; ISPAD acknowledges):** Carefully selected mild DKA in adolescents with established T1D can be managed with SC insulin protocols and discharged from the ED. [1,6]\n\n**Eligibility (ALL required):** [1,6]\n- Established T1D (NOT new-onset)\n- pH 7.20-7.29, mild DKA only\n- Mentation fully intact, no Muir criteria\n- Tolerating PO without vomiting\n- Anion gap closed (<12) in ED before discharge\n- Glucose <250 on serial checks\n- Reliable caregiver, transportation, phone\n- Endocrine follow-up arranged within 24-48h\n- No infection, pump failure unresolved, or social red flags\n\n**SC insulin protocol (institutional dependent):** [6]\n- [Insulin lispro or aspart](#/drug/insulin-regular/dka-pediatric) 0.1-0.15 U/kg SC q1-2h until AG closes and glucose stable\n- Resume home long-acting at usual dose if it has been >12h since last dose\n- PO fluids encouraged once nausea resolves\n\n**Discharge instructions:**\n- Resume home insulin regimen with sick-day adjustments\n- Check BG q2-4h next 24h + ketones q4h if BG >250\n- Return for vomiting, AMS, headache, recurrent ketosis, or inability to keep down fluids\n- Endocrine appointment confirmed before walking out',
    recommendation: 'Mild DKA, established T1D, AG closed in ED, mentation intact, tolerating PO, reliable follow-up → discharge with SC protocol + endocrine f/u in 24-48h.',
    confidence: 'consider',
    citation: [1, 6],
  },

  // =====================================================================
  // MODULE 6: MIMICS & COMPLICATIONS
  // =====================================================================

  {
    id: 'peds-dka-mimics',
    type: 'info',
    module: 6,
    title: 'Mimics & Common Complications',
    body: '**Not every acidotic peds patient is DKA — and DKA has signature iatrogenic pitfalls.** [1,3,7]\n\n**Mimics to consider:** [3,7]\n- **Hyperglycemic Hyperosmolar State (HHS):** Glucose >600, minimal/no ketosis, profound dehydration, calculated osmolality >320. Rare in peds (more in adolescents with T2D, obesity). Use lower insulin (0.05 U/kg/hr), more cautious fluid (~3 mL/kg/hr), watch for rhabdo and DIC.\n- **Mixed DKA/HHS:** Glucose >600 + significant ketosis. Treat as DKA but with HHS-style fluid/insulin caution.\n- **Alcoholic ketoacidosis (AKA):** Older adolescents, eating disorder, malnutrition; glucose often normal/low; treat with dextrose + thiamine + fluids.\n- **Salicylate toxicity:** Tachypnea, tinnitus, mixed respiratory alkalosis + metabolic acidosis; check level.\n- **Sepsis with appendicitis:** New-onset DKA can present with abdominal pain — but persistent RLQ pain after fluids/insulin should prompt imaging for appendicitis (classic miss).\n- **Inborn errors of metabolism:** Infants with profound acidosis, hyperammonemia, family history; consult metabolics.\n- **Toxic ingestion:** Metformin (in older sib\'s med cabinet), methanol/ethylene glycol — check osmolar gap if anion gap is unexplained.\n\n**Common iatrogenic complications:** [1,3,7]\n- **Cerebral edema** — covered in Module 4\n- **Hypokalemia** — most common; check K q2h, replace aggressively\n- **Hypoglycemia** — usually from delayed dextrose addition or stopping insulin abruptly; treat with D10 2-5 mL/kg + restart insulin lower rate, NOT stop\n- **Hypophosphatemia** — replete if severe; can cause rhabdo, hemolysis\n- **Hyperchloremic metabolic acidosis** — from 0.9% NS; normal anion gap; usually self-resolves; not the same as ongoing ketoacidosis\n- **Recurrent DKA same admission** — almost always from stopping IV insulin without SC overlap OR resuming usual diet/insulin too early\n- **Aspiration pneumonia** — vomiting + AMS; consider NG decompression in severe DKA with persistent vomiting\n- **Venous thrombosis** — femoral central lines in severe DKA have high DVT rates; use peripheral access when possible',
    citation: [1, 3, 7],
    next: 'peds-dka-pearls',
    summary: 'Mimics: HHS, AKA, salicylate tox, appendicitis, inborn errors, ingestion. Complications: CE, hypoK, hypoglycemia (don\'t stop insulin), hyperchloremic acidosis, recurrence from missed SC overlap.',
    skippable: true,
  },

  {
    id: 'peds-dka-pearls',
    type: 'info',
    module: 6,
    title: 'Pearls & Pitfalls',
    body: '**High-yield teaching points:** [1,2,3,4,5]\n\n1. **Insulin starts at HOUR 1, not zero.** UK national data, ISPAD reinforces. The "old way" of starting insulin and fluids simultaneously is associated with higher CE risk.\n\n2. **PECARN means stop arguing about fluid rate/Na content.** Neither matters for neurologic outcomes. Give adequate volume to perfuse, don\'t over-bolus, don\'t under-resuscitate from fear.\n\n3. **The "improving" child who deteriorates 4-12h in has cerebral edema until proven otherwise.** Apply [Muir criteria](#/calculator/muir-cerebral-edema) at every neuro check.\n\n4. **Bicarbonate is almost never indicated.** It worsens CE risk and provides no clinical benefit except life-threatening hyperkalemia or pH <6.9 with cardiac dysfunction.\n\n5. **Don\'t stop the insulin when glucose drops — add dextrose.** The acidosis is from ketones; only the closed anion gap means you can transition off the drip.\n\n6. **Always check corrected sodium.** A "normal" measured Na in DKA is actually low; failure of corrected Na to rise as glucose falls is a CE warning sign.\n\n7. **New-onset accounts for ~30-40% of peds DKA.** These kids and families need diabetes education, glucagon kit, sick day rules, and close endocrine follow-up before discharge.\n\n8. **Bedside [mannitol](#/drug/mannitol/cerebral-edema) and [3% NaCl](#/drug/hypertonic-saline/cerebral-edema) should be drawn up at induction in any severe peds DKA** — when CE happens, you cannot afford the 10-minute pharmacy delay.\n\n9. **Appendicitis can present as DKA.** Persistent abdominal pain or RLQ tenderness after metabolic correction → image.\n\n10. **DKA recurs same admission if you stop IV insulin before giving SC long-acting.** Overlap 30-60 minutes is non-negotiable.',
    citation: [1, 2, 3, 4, 5],
    summary: 'Pearls: insulin at hour 1, PECARN settles fluid debate, bicarb almost never, dextrose (not stopping insulin) for low glucose, draw mannitol/3% NaCl up early, overlap SC before stopping IV.',
    skippable: true,
  },
];

export const PEDS_DKA_NODE_COUNT = PEDS_DKA_NODES.length;

export const PEDS_DKA_MODULE_LABELS = [
  'Recognition & Diagnosis',
  'Fluid Resuscitation (PECARN)',
  'Insulin Therapy',
  'Cerebral Edema',
  'Resolution & Disposition',
  'Mimics & Pearls',
];

export const PEDS_DKA_CITATIONS: Citation[] = [
  { num: 1, text: 'Glaser N, Fritsch M, Priyambada L, et al. ISPAD Clinical Practice Consensus Guidelines 2022: Diabetic ketoacidosis and hyperglycemic hyperosmolar state. Pediatr Diabetes. 2022;23(7):835-856. doi:10.1111/pedi.13406' },
  { num: 2, text: 'Kuppermann N, Ghetti S, Schunk JE, et al. Clinical Trial of Fluid Infusion Rates for Pediatric Diabetic Ketoacidosis (PECARN FLUID Trial). N Engl J Med. 2018;378(24):2275-2287. doi:10.1056/NEJMoa1716816' },
  { num: 3, text: 'EB Medicine. Pediatric Diabetic Ketoacidosis: Evidence-Based Management in the Emergency Department. Pediatric Emergency Medicine Practice. Current edition. https://www.ebmedicine.net/topics/endocrine/pediatric-dka' },
  { num: 4, text: 'Muir AB, Quisling RG, Yang MC, Rosenbloom AL. Cerebral edema in childhood diabetic ketoacidosis: natural history, radiographic findings, and early identification. Diabetes Care. 2004;27(7):1541-1546. doi:10.2337/diacare.27.7.1541' },
  { num: 5, text: 'Glaser N, Barnett P, McCaslin I, et al. Risk factors for cerebral edema in children with diabetic ketoacidosis. NEJM. 2001;344(4):264-269. doi:10.1056/NEJM200101253440404' },
  { num: 6, text: 'Rewers A, Kuppermann N, Stoner MJ, et al. Subcutaneous Insulin Protocol for Mild Pediatric DKA in the ED (SQuID II). N Engl J Med Evidence / Pediatrics. 2023 (acknowledged in ISPAD 2022 as emerging pathway).' },
  { num: 7, text: 'Wolfsdorf JI, Allgrove J, Craig ME, et al. A position statement of the International Society for Pediatric and Adolescent Diabetes. Pediatr Diabetes 2014;15(Suppl 20):154-179. (Foundational ISPAD framework still cited by 2022 update.)' },
];
