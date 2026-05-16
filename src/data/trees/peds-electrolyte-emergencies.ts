// MedKitt - Pediatric Electrolyte Emergencies
// EB Medicine Pediatric Electrolyte Emergencies 2023 + AAP 2018 hyponatremic dehydration guideline
// + PALS 2020 + Moritz/Ayus + Adrogue/Madias
// 5 modules: Triage -> Identify Disturbance -> Branch Pathways (Na/K/Ca/Glucose) -> Treatment -> Disposition

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PEDS_ELECTROLYTE_CRITICAL_ACTIONS = [
  { text: 'Check accucheck on every altered or seizing child', nodeId: 'pee-triage' },
  { text: 'Symptomatic hyponatremia (seizure/AMS) → 3% saline 3-5 mL/kg bolus (max 100 mL)', nodeId: 'pee-hypo-na-symptomatic' },
  { text: 'Limit Na correction to ≤8-10 mEq/L per 24h (ODS risk)', nodeId: 'pee-hypo-na-correction-rule' },
  { text: 'Limit hypernatremia correction to ≤10-12 mEq/L per 24h (cerebral edema risk)', nodeId: 'pee-hyper-na' },
  { text: 'Hyperkalemia with ECG changes → calcium gluconate 60 mg/kg IV first', nodeId: 'pee-hyper-k-treatment' },
  { text: 'Hypokalemia: peripheral IV max 0.5 mEq/kg/hr; check Mg', nodeId: 'pee-hypo-k-treatment' },
  { text: 'Symptomatic hypocalcemia (tetany/seizure) → calcium gluconate 50-100 mg/kg IV slow', nodeId: 'pee-hypo-ca' },
  { text: 'Hypoglycemia: D10 2-5 mL/kg in infants, D25 2 mL/kg in older kids', nodeId: 'pee-hypoglycemia' },
  { text: 'Use balanced crystalloid (LR/Plasmalyte) over 0.9% NS to avoid hyperchloremic acidosis', nodeId: 'pee-fluid-choice' },
];

export const PEDS_ELECTROLYTE_NODES: DecisionNode[] = [
  // ===================================================================
  // MODULE 1: Triage & Initial Assessment
  // ===================================================================
  {
    id: 'pee-start',
    type: 'info',
    module: 1,
    title: 'Pediatric Electrolyte Emergencies Overview',
    body: 'See [Steps Summary](#/info/pee-steps-summary) for the rapid-action checklist.\n\n**Why kids are different:** [1,2,3]\n- Higher total body water (75% in neonates vs 60% in adults) → larger fluid shifts with disturbance\n- Lower renal concentrating ability in infants → faster dehydration and electrolyte derangement\n- Cerebral autoregulation immature → faster brain edema with rapid Na shifts\n- Smaller margin of error in dosing — mg/kg matters\n\n**Most common ED presentations:** [1,3]\n- **Hyponatremia:** gastroenteritis given hypotonic fluids, water intoxication in infants, SIADH\n- **Hypernatremia:** dehydration from gastroenteritis, breastfeeding failure neonates, diabetes insipidus\n- **Hyperkalemia:** AKI, hemolysis (spurious vs real), CAH in neonates, drug-induced\n- **Hypokalemia:** vomiting/diarrhea, DKA refeeding, diuretics\n- **Hypocalcemia:** vit D deficiency, hypoparathyroidism, citrate from blood, rhabdo\n- **Hypoglycemia:** sepsis, fasting infants, accidental insulin/sulfonylurea, inborn errors\n\n**Red flags requiring immediate action:** [2,4]\n- Seizure, AMS, lethargy → check glucose AND Na immediately\n- Wide QRS, peaked T → check K immediately\n- Tetany, carpopedal spasm → check Ca and Mg\n- Severe dehydration with shock → balanced crystalloid bolus + electrolyte panel',
    citation: [1, 2, 3, 4],
    next: 'pee-triage',
    summary: 'Peds = larger fluid shifts, immature cerebral autoregulation, smaller margin of error; check accucheck + BMP on every altered/seizing child.',
  },
  {
    id: 'pee-steps-summary',
    type: 'info',
    module: 1,
    title: 'Steps Summary',
    body: '**Rapid action checklist for suspected pediatric electrolyte emergency:** [1,2,3,4]\n\n1. **ABCs + glucose** — accucheck on every altered, seizing, or critically ill child\n2. **BMP + iCal + Mg + VBG** — single-stick "electrolyte panel" early\n3. **Identify the disturbance** — match clinical syndrome to lab\n4. **Symptomatic vs asymptomatic** — drives speed of correction\n5. **Pick the right fluid:**\n   - Balanced crystalloid (LR, Plasmalyte) preferred for resuscitation [5]\n   - 3% saline 3-5 mL/kg for symptomatic hyponatremia\n   - D10 2-5 mL/kg for hypoglycemia infants; D25 2 mL/kg older\n6. **Respect correction limits:**\n   - Na: ≤8-10 mEq/L per 24h (both directions)\n   - K: peripheral IV ≤0.5 mEq/kg/hr without central\n7. **Find the cause** — gastroenteritis, AKI, CAH, ingestion, endocrine\n8. **Disposition** — ICU for symptomatic disturbances, drips, or refractory cases',
    citation: [1, 2, 3, 4],
    next: 'pee-triage',
    skippable: true,
  },
  {
    id: 'pee-triage',
    type: 'info',
    module: 1,
    title: 'Triage & Bedside Assessment',
    body: '**Immediate bedside actions for any suspected electrolyte emergency:** [1,4]\n\n**Vitals + glucose + IV access:**\n- HR, BP (correct cuff size), RR, SpO2, temp\n- **Accucheck FIRST** in any altered or seizing child — hypoglycemia mimics everything\n- Two IVs if unstable; consider IO if access difficult\n\n**Focused exam:**\n- **Hydration:** mucous membranes, cap refill, tears, fontanelle, skin turgor, UOP\n- **Neuro:** mental status, tone, reflexes, seizure activity, focal signs\n- **Cardiac:** rate/rhythm, perfusion, gallop, edema\n- **Tetany signs:** Chvostek (facial twitch with tap), Trousseau (carpopedal spasm with BP cuff)\n\n**Labs to send (single stick):** [1,3]\n- **BMP** (Na, K, Cl, HCO3, BUN, Cr, glucose)\n- **iCal + Mg + Phos**\n- **VBG** with lactate (rapid pH and K)\n- **CBC** (hemolysis vs leukocytosis)\n- **Urinalysis** (specific gravity, ketones, glucose)\n- Consider: ammonia, cortisol if shock + hypoglycemia (adrenal crisis), TSH, drug screen, lipase\n\n**Empiric resuscitation for shock:** [5]\n- Balanced crystalloid (LR, Plasmalyte-A) 10-20 mL/kg bolus, reassess\n- **Avoid 0.9% NS in large volumes** — causes hyperchloremic metabolic acidosis, worsens AKI risk',
    citation: [1, 3, 4, 5],
    next: 'pee-fluid-choice',
    summary: 'Accucheck first; BMP + iCal + Mg + VBG single-stick; balanced crystalloid (LR/Plasmalyte) preferred over 0.9% NS for resuscitation.',
    safetyLevel: 'warning',
  },
  {
    id: 'pee-fluid-choice',
    type: 'info',
    module: 1,
    title: 'Fluid Choice — Balanced > 0.9% NS',
    body: '**Default to balanced crystalloid for pediatric resuscitation.** [5,6]\n\n**Why NOT 0.9% NS (in large volumes):** [5]\n- Cl 154 mEq/L (supraphysiologic) → hyperchloremic metabolic acidosis\n- Worsens AKI risk in critically ill kids\n- Strong ion difference of zero → acidifying\n- Older "isotonic" myth — sodium content sometimes drives iatrogenic hypernatremia\n\n**Balanced options:** [5,6]\n- **Lactated Ringer (LR):** Na 130, K 4, Ca 3, Cl 109, lactate 28 — closest to plasma\n- **Plasmalyte-A:** Na 140, K 5, Mg 3, Cl 98, gluconate 23, acetate 27\n- **Normosol-R:** similar to Plasmalyte\n\n**When 0.9% NS IS appropriate:** [3]\n- Hyponatremic patient where you want to RAISE Na\n- Hypochloremic metabolic alkalosis (pyloric stenosis)\n- TBI with cerebral edema (osmolar therapy)\n- Hyperkalemia (avoid LR\'s small K load — though clinically usually inconsequential)\n\n**Maintenance fluids:** [7]\n- AAP 2018: **isotonic IVF for maintenance** (D5LR, D5 0.9% NS, or D5 Plasmalyte)\n- Do NOT use 0.45% NS or 0.2% NS for maintenance — causes iatrogenic hyponatremia\n- Holliday-Segar (4-2-1 rule) for rate; consider 2/3 maintenance in SIADH/CHF',
    citation: [3, 5, 6, 7],
    next: 'pee-identify',
    summary: 'Balanced crystalloid (LR/Plasmalyte) for resuscitation; isotonic IVF for maintenance per AAP 2018; avoid 0.45% NS maintenance (iatrogenic hyponatremia).',
  },

  // ===================================================================
  // MODULE 2: Identify the Disturbance
  // ===================================================================
  {
    id: 'pee-identify',
    type: 'question',
    module: 2,
    title: 'Identify the Disturbance',
    body: 'Based on labs and clinical picture, select the dominant electrolyte emergency: [1,2,3]\n\n*Multiple disturbances often coexist (e.g., DKA with K and Na changes). Treat the most life-threatening first — usually hyperkalemia with ECG changes or symptomatic hyponatremia.*',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Hyponatremia (Na <135)',
        description: 'AMS, seizure, vomiting; gastroenteritis with hypotonic fluids, SIADH, water intoxication, adrenal crisis',
        next: 'pee-hypo-na',
        urgency: 'critical',
      },
      {
        label: 'Hypernatremia (Na >150)',
        description: 'Severe dehydration, irritability, doughy skin; gastroenteritis, DI, salt poisoning, breastfeeding failure',
        next: 'pee-hyper-na',
        urgency: 'urgent',
      },
      {
        label: 'Hyperkalemia (K >6.0)',
        description: 'Peaked T, wide QRS, weakness, arrhythmia; AKI, hemolysis, CAH, drugs',
        next: 'pee-hyper-k',
        urgency: 'critical',
      },
      {
        label: 'Hypokalemia (K <3.0)',
        description: 'U waves, prolonged QT, weakness; vomiting, diarrhea, DKA, diuretics',
        next: 'pee-hypo-k',
        urgency: 'urgent',
      },
      {
        label: 'Hypocalcemia (iCa <1.0 / Ca <8.0)',
        description: 'Tetany, Chvostek/Trousseau, seizure, prolonged QT; vit D deficiency, hypoparathyroidism, citrate, rhabdo',
        next: 'pee-hypo-ca',
        urgency: 'urgent',
      },
      {
        label: 'Hypercalcemia (Ca >12)',
        description: 'Polyuria, dehydration, AMS; hyperparathyroidism, malignancy, vit D toxicity, immobilization',
        next: 'pee-hyper-ca',
      },
      {
        label: 'Hypoglycemia (<60 older / <40 neonate)',
        description: 'Jitteriness, lethargy, seizure, coma; sepsis, fasting, insulin/sulfonylurea, inborn errors',
        next: 'pee-hypoglycemia',
        urgency: 'critical',
      },
    ],
  },

  // ===================================================================
  // MODULE 3: Branch Pathways — Hyponatremia
  // ===================================================================
  {
    id: 'pee-hypo-na',
    type: 'info',
    module: 3,
    title: 'Hyponatremia — Workup & Severity',
    body: '**Hyponatremia (Na <135) is the most common pediatric electrolyte abnormality.** [1,3,8]\n\n**Severity:** [3,8]\n- **Mild:** Na 130-134\n- **Moderate:** Na 125-129\n- **Severe:** Na <125 (high risk of cerebral edema, seizure, herniation)\n\n**Symptomatic vs asymptomatic determines speed of correction, not the number alone.** [8,9]\n- **Symptomatic:** seizure, AMS, vomiting, lethargy, herniation signs (Cushing triad, posturing)\n- **Asymptomatic:** found incidentally, mild headache only\n\n**Common pediatric causes:** [1,3,8]\n- **Hypotonic fluid replacement** during gastroenteritis (most common iatrogenic cause)\n- **Acute water intoxication** in infants (diluted formula, water for "constipation")\n- **SIADH** — pneumonia, meningitis, post-op, head injury, certain meds\n- **Adrenal insufficiency** (CAH in neonates) — hyperK + hypoNa + hypoglycemia + shock\n- **Renal salt wasting** — CKD, tubulopathies\n- **Pseudohyponatremia** — severe hypertriglyceridemia, hyperproteinemia (rare in kids)\n\n**Workup:** [3,8]\n- Urine osmolality, urine Na (volume status discrimination)\n- Serum osmolality (rule out pseudohyponatremia / hyperglycemic hyponatremia)\n- Cortisol, TSH if no clear cause\n- 17-OHP if neonate with shock + hyperK + hyponatremia (CAH)\n\n**Correction calculation:** Use the [Corrected Sodium Calculator](#/calculator/corrected-na) for hyperglycemic hyponatremia screening. Replacement formula: Na deficit = 0.6 × wt × [target Na − current Na]. The number guides planning, NOT speed.',
    citation: [1, 3, 8, 9],
    calculatorLinks: [
      { id: 'corrected-na', label: 'Corrected Sodium Calculator' },
    ],
    next: 'pee-hypo-na-symptomatic',
    summary: 'Severity by number; symptomatic vs asymptomatic drives speed; most common cause is hypotonic fluid during gastroenteritis; check cortisol if no cause.',
  },
  {
    id: 'pee-hypo-na-symptomatic',
    type: 'info',
    module: 3,
    title: 'Symptomatic Hyponatremia — 3% Saline',
    body: '**Severe symptomatic hyponatremia (seizure, AMS, herniation signs) → 3% saline IMMEDIATELY.** [8,9,10]\n\n**Dose:**\n- **3% NaCl: 3-5 mL/kg IV over 10-15 min** (max 100 mL per bolus)\n- May repeat ×2 if seizure persists or symptoms unchanged\n- Goal of bolus: raise Na by **4-6 mEq/L acutely** — enough to reverse herniation, not enough to cause ODS\n\n**Why 3% saline (not 0.9% NS):**\n- 0.9% NS is hypertonic relative to plasma in severe hyponatremia, but the Na rise is unpredictable and too slow for symptomatic patients\n- 3% saline gives a controlled, rapid bump\n\n**Access:**\n- 3% saline can be given peripherally for boluses; central line preferred for sustained infusions\n- Document and monitor IV site (extravasation risk)\n\n**Adjuncts:**\n- Treat seizure with benzodiazepine if active\n- Secure airway if obtunded\n- Once symptoms resolve, transition to slower correction (see [Correction Rule](#/node/pee-hypo-na-correction-rule))\n\n**Check Na 1-2 hours after bolus** to gauge response.',
    citation: [8, 9, 10],
    next: 'pee-hypo-na-correction-rule',
    summary: '3% NaCl 3-5 mL/kg over 10-15 min (max 100 mL); raise Na ~4-6 mEq/L acutely to reverse herniation; recheck Na at 1-2h.',
    safetyLevel: 'critical',
  },
  {
    id: 'pee-hypo-na-correction-rule',
    type: 'info',
    module: 3,
    title: 'The 8-10 Rule — Avoiding ODS',
    body: '**Osmotic demyelination syndrome (ODS) is irreversible and devastating.** Respect the correction limit. [8,9,11]\n\n**Rule:**\n- Correct Na by **≤8-10 mEq/L per 24 hours**\n- For chronic hyponatremia (>48h or unknown duration) → even slower, **≤6-8 mEq/L per 24h**\n- Acute hyponatremia (<48h, clearly known) — can correct faster but still cap at 10-12 mEq/L per 24h\n\n**Why slow:**\n- Brain cells adapt to chronic hyponatremia by extruding solutes\n- Rapid correction → osmotic shrinkage of brain → demyelination of pons (central pontine myelinolysis)\n- Children may be more resilient than adults but the rule still applies\n\n**If you over-shoot (Na rising too fast):** [11]\n- STOP hypertonic\n- Give D5W 3 mL/kg IV bolus to "relower" Na\n- Consider DDAVP 1-2 mcg IV (clamps free water excretion)\n- Recheck Na q1-2h\n\n**Maintenance after acute correction:**\n- Once symptoms resolved and Na rising, switch to 0.9% NS or balanced crystalloid at maintenance\n- Treat the underlying cause (stop offending fluid, restrict water, replace cortisol, etc.)\n\n**SIADH-specific:**\n- Fluid restriction (50-66% maintenance)\n- Hypertonic saline + furosemide if symptomatic\n- Tolvaptan rarely used in peds (off-label)',
    citation: [8, 9, 11],
    next: 'pee-hyper-na',
    summary: '≤8-10 mEq/L per 24h (or ≤6-8 if chronic); over-shoot rescue = D5W 3 mL/kg + DDAVP; ODS is irreversible.',
    safetyLevel: 'critical',
  },

  // ===================================================================
  // MODULE 3: Branch Pathways — Hypernatremia
  // ===================================================================
  {
    id: 'pee-hyper-na',
    type: 'info',
    module: 3,
    title: 'Hypernatremia — Slow Rehydration Over 48-72h',
    body: '**Hypernatremia (Na >150) — the danger is cerebral edema from rapid correction.** [3,12]\n\n**Severity:** [12]\n- Mild: 146-150\n- Moderate: 151-160\n- Severe: >160 (high risk of seizure, ICH, venous sinus thrombosis)\n\n**Common pediatric causes:** [1,3,12]\n- **Hypertonic dehydration from gastroenteritis** (most common — water loss > Na loss)\n- **Breastfeeding failure neonates** (insufficient intake, weight loss >10%)\n- **Diabetes insipidus** (central or nephrogenic) — large dilute urine output\n- **Salt poisoning** (accidental or NAT — concentrated formula, soy sauce ingestion)\n- **Inadequate water access** (developmentally delayed, neglected)\n\n**Workup:** [3,12]\n- Weight loss, hydration assessment\n- Urine osmolality + urine Na (DI: U-osm low despite hyperNa; salt poisoning: U-Na high)\n- BUN:Cr ratio (volume status)\n- If DI suspected: water deprivation test (inpatient), DDAVP trial\n\n**Treatment:** [3,12]\n\n**Initial resuscitation if shock:**\n- 20 mL/kg balanced crystalloid (LR or Plasmalyte) over 20-30 min\n- Repeat if perfusion still poor\n- Even in hypernatremia, restoring perfusion is the first priority\n\n**Rehydration phase:**\n- Calculate **free water deficit:** FWD (L) = 0.6 × wt (kg) × ([current Na / 140] − 1)\n- Use the [Free Water Deficit Calculator](#/calculator/fwd) to plan\n- Replace deficit + maintenance over **48-72 hours** (NOT 24h)\n- Use D5 0.45% NS or D5 0.225% NS depending on Na level — choose tonicity to lower Na ≤10-12 mEq/L per 24h\n- Recheck Na q4-6h\n\n**Correction rule:**\n- **≤10-12 mEq/L per 24h** (≤0.5 mEq/L per hour)\n- Cerebral edema, seizures, herniation if dropped faster\n- If Na drops too fast → switch to more isotonic fluid, recalculate\n\n**Diabetes insipidus specific:**\n- Central DI: DDAVP IN/IV; restrict free water as DDAVP takes effect\n- Nephrogenic DI: thiazide + low-solute diet; treat underlying cause',
    citation: [1, 3, 12],
    calculatorLinks: [
      { id: 'fwd', label: 'Free Water Deficit Calculator' },
    ],
    next: 'pee-hyper-k',
    summary: 'Free water deficit replaced over 48-72h (not 24h); cap correction at 10-12 mEq/L per 24h; resuscitate shock with balanced crystalloid first.',
    safetyLevel: 'critical',
  },

  // ===================================================================
  // MODULE 3: Branch Pathways — Hyperkalemia
  // ===================================================================
  {
    id: 'pee-hyper-k',
    type: 'info',
    module: 3,
    title: 'Hyperkalemia — Confirm + ECG First',
    body: '**Hyperkalemia (K >6.0) — the ECG drives urgency more than the number.** [1,13,14]\n\n**Severity by number AND ECG:** [13]\n- **Mild:** K 5.5-6.0, normal ECG\n- **Moderate:** K 6.1-7.0, peaked T waves\n- **Severe:** K >7.0 OR any wide QRS, sine wave, arrhythmia, arrest\n\n**ECG progression:** [13,14]\n1. Peaked, narrow T waves\n2. PR prolongation, P wave flattening\n3. QRS widening\n4. Sine wave (T merges with QRS)\n5. Asystole / VF / PEA\n\n**Confirm before treating (if stable):**\n- **Spurious causes** — hemolysis from poor draw (very common in peds), prolonged tourniquet, fist clenching, thrombocytosis, leukocytosis\n- Send a **STAT recheck via different site**, or a VBG/iSTAT K — VBG K is the fastest TRUE potassium\n- **Never delay treatment** if ECG changes — treat empirically while recheck is pending\n\n**Common pediatric causes:** [1,13]\n- **AKI** (HUS, sepsis, dehydration)\n- **Hemolysis** (intravascular: G6PD, transfusion reaction)\n- **CAH (21-hydroxylase deficiency)** in neonate — hyperK + hyponatremia + hypoglycemia + shock\n- **Rhabdo, tumor lysis, crush injury**\n- **Drugs:** spironolactone, ACE-I, succinylcholine in burn/denervation, β-blocker overdose\n- **Pseudohyperkalemia** — leukemia with very high WBC, severe thrombocytosis',
    citation: [1, 13, 14],
    next: 'pee-hyper-k-treatment',
    summary: 'ECG drives urgency more than number; peaked T → wide QRS → sine wave → arrest; always rule out hemolysis (poor draw) but never delay treatment if ECG abnormal.',
    safetyLevel: 'critical',
  },
  {
    id: 'pee-hyper-k-treatment',
    type: 'info',
    module: 3,
    title: 'Hyperkalemia Treatment Cocktail',
    body: '**Treat in this order (ECG changes = treat empirically, in parallel):** [13,14,15]\n\n**1. STABILIZE THE MEMBRANE (FIRST, if any ECG change):**\n- **[Calcium gluconate 10%](#/drug/calcium-gluconate) 60 mg/kg IV** (= 0.6 mL/kg of 10%) over 5-10 min\n  - Max single dose 3 g (30 mL of 10%)\n  - Onset 1-3 min, duration 30-60 min — REDOSE if ECG still abnormal\n- **Calcium chloride 10%** 20 mg/kg IV (= 0.2 mL/kg) — 3× the elemental Ca of gluconate; central line preferred (extravasation = tissue necrosis)\n- Does NOT lower K, only protects myocardium\n\n**2. SHIFT K INTRACELLULARLY:**\n- **Insulin 0.1 U/kg IV (max 10 U) + D25W 0.5 g/kg IV** (= 2 mL/kg of D25)\n  - Use D10 in infants/neonates (D25 is hyperosmolar; vein damage)\n  - Onset 10-20 min, duration 4-6 hours\n  - Check glucose at 30 min, 1h, 2h, 4h — late hypoglycemia common\n- **Albuterol nebulized:** [13]\n  - <25 kg: 2.5 mg neb\n  - ≥25 kg: 5-10 mg neb (can use 4× standard dose)\n  - Onset 30 min, duration 2-4h; works synergistically with insulin\n- **Sodium bicarbonate 1-2 mEq/kg IV** — only if metabolic acidosis is the driver; effect modest in non-acidotic\n\n**3. REMOVE K FROM BODY (slower):**\n- **Loop diuretic** (furosemide 1 mg/kg IV) — if making urine\n- **Kayexalate 1 g/kg PO/PR** — **controversial in peds**, especially neonates (necrotizing enterocolitis risk, contraindicated in <1 mo)\n- **Patiromer / sodium zirconium** — newer K binders, less peds data\n- **Dialysis** for: refractory, AKI, oligo/anuric, severe acidosis, sustained K >7 despite treatment\n\n**Address the cause:**\n- Stop K-sparing drugs, K supplements\n- Treat dehydration, AKI\n- CAH workup if neonate (17-OHP, cortisol, ACTH) — hydrocortisone 25 mg IV if suspected\n\n**Disposition:**\n- Any treated hyperK + ECG changes → admit, telemetry\n- Severe hyperK or AKI → PICU\n- Asymptomatic mild hyperK with reversible cause → ED observation, recheck',
    citation: [13, 14, 15],
    next: 'pee-hypo-k',
    summary: 'Calcium gluconate 60 mg/kg first if ECG changes; insulin 0.1 U/kg + D25 0.5 g/kg shifts K; albuterol synergistic; dialysis if refractory; kayexalate controversial in peds.',
    safetyLevel: 'critical',
  },

  // ===================================================================
  // MODULE 3: Branch Pathways — Hypokalemia
  // ===================================================================
  {
    id: 'pee-hypo-k',
    type: 'info',
    module: 3,
    title: 'Hypokalemia — Identify Cause + Replace',
    body: '**Hypokalemia (K <3.0) — replace, but slowly via peripheral IV.** [1,16]\n\n**Severity:** [16]\n- Mild: K 3.0-3.4\n- Moderate: K 2.5-2.9\n- Severe: K <2.5 (arrhythmia risk)\n\n**ECG findings:** [14,16]\n- U waves (after T wave)\n- T wave flattening or inversion\n- Prolonged QT (proarrhythmic)\n- PVCs, torsades, atrial arrhythmias\n\n**Common pediatric causes:** [1,16]\n- **GI losses:** vomiting (pyloric stenosis classic), diarrhea, NG suction\n- **Renal losses:** diuretics, RTA, Bartter/Gitelman syndromes\n- **Intracellular shift:** DKA insulin therapy, refeeding, alkalosis, β-agonists\n- **Magnesium deficiency** (frequently coexisting — replace BOTH)\n- **Mineralocorticoid excess:** Cushing, primary hyperaldo, licorice abuse\n\n**Always check Mg** — hypoMg causes refractory hypoK via renal K wasting. [16]\n\n**Workup:**\n- BMP, Mg, Phos\n- VBG (alkalosis vs acidosis)\n- Urine K and Cl (if loss site unclear)\n- ECG',
    citation: [1, 14, 16],
    next: 'pee-hypo-k-treatment',
    summary: 'U waves, prolonged QT, arrhythmias; always check Mg (refractory hypoK without Mg replacement); causes: GI losses, diuretics, DKA refeeding, alkalosis.',
  },
  {
    id: 'pee-hypo-k-treatment',
    type: 'info',
    module: 3,
    title: 'Hypokalemia Replacement',
    body: '**Oral preferred when possible. IV peripheral has strict rate limits.** [16,17]\n\n**Oral KCl (preferred for mild-moderate, asymptomatic):**\n- 1-2 mEq/kg/day divided BID-TID\n- Onset hours; safer than IV; no rate limit concerns\n- Hold if signs of obstruction, ileus, oliguria\n\n**IV potassium chloride:** [16,17]\n- **Peripheral max:** 0.5 mEq/kg/hr (max 10 mEq/hr) — burns the vein at higher concentrations\n- **Central line:** up to 1 mEq/kg/hr (max 20 mEq/hr) — requires continuous cardiac monitoring\n- **Concentration:** ≤40 mEq/L peripheral, ≤80 mEq/L central\n- **Dose:** 0.5-1 mEq/kg IV over 1-2 hours, recheck K at end\n\n**Critical safety rules:** [17]\n- **NEVER IV push potassium** — fatal arrhythmia\n- Continuous ECG monitoring during IV replacement, especially central or rate >0.5 mEq/kg/hr\n- Recheck K every 1-2h during active replacement\n- See the [Potassium Infusion Protocol](#/tree/potassium-infusion) for full details\n\n**Replace magnesium FIRST or concurrently:** [16]\n- MgSO4 25-50 mg/kg IV over 1-2h (max 2 g) if low Mg\n- Hypomagnesemia causes refractory hypokalemia — K will keep dropping until Mg is replaced\n\n**Treat the cause:**\n- Stop offending diuretics (or use K-sparing alternative)\n- Replace volume (saline if dehydrated)\n- DKA: K replacement starts when K <5.5 once insulin running\n\n**Watch for over-correction:**\n- Most kids over-corrected acutely will normalize as they re-equilibrate\n- Stop replacement at K ~4.0',
    citation: [16, 17],
    next: 'pee-hypo-ca',
    summary: 'Oral preferred; IV peripheral max 0.5 mEq/kg/hr; NEVER IV push; replace Mg concurrently; recheck K q1-2h.',
    safetyLevel: 'critical',
  },

  // ===================================================================
  // MODULE 3: Branch Pathways — Calcium
  // ===================================================================
  {
    id: 'pee-hypo-ca',
    type: 'info',
    module: 3,
    title: 'Hypocalcemia — Tetany & QT Prolongation',
    body: '**Hypocalcemia (iCa <1.0 mmol/L or total Ca <8.0 mg/dL) — replace if symptomatic or severe.** [1,18]\n\n**Always check IONIZED calcium** — total Ca is unreliable with low albumin or acid-base shifts. Use the [Corrected Calcium Calculator](#/calculator/corrected-calcium) only as a screening adjunct. [18]\n\n**Symptoms:**\n- **Tetany:** carpopedal spasm, perioral numbness, paresthesias\n- **Chvostek sign:** facial twitch with tap over facial nerve (CN VII)\n- **Trousseau sign:** carpal spasm with BP cuff inflated above SBP for 3 min\n- **Severe:** laryngospasm, seizure, prolonged QT, decreased contractility\n\n**Common pediatric causes:** [1,18]\n- **Vitamin D deficiency** (most common globally — exclusive breastfeeding without supplementation, dark skin, latitude)\n- **Hypoparathyroidism** (post-thyroidectomy, autoimmune, DiGeorge in neonates)\n- **Citrate toxicity from massive transfusion** (citrate binds Ca)\n- **Pancreatitis, sepsis, rhabdomyolysis** (Ca sequestered)\n- **Hyperphosphatemia** (tumor lysis, CKD)\n- **Hypomagnesemia** (impairs PTH release)\n\n**Treatment:** [18]\n\n**Symptomatic (tetany, seizure, QT prolongation):**\n- **Calcium gluconate 10%: 50-100 mg/kg IV over 5-10 min** (= 0.5-1 mL/kg of 10%)\n  - Max single dose 2 g\n  - Continuous cardiac monitoring (bradycardia/asystole if pushed too fast)\n  - Gluconate preferred peripherally; chloride only via central (3× elemental Ca but extravasation = tissue necrosis)\n- Recheck iCal at 15-30 min; redose if persistent symptoms\n- Continuous infusion: 0.5-1.5 mg/kg/hr (elemental Ca) if recurrent\n\n**Asymptomatic mild:**\n- Oral calcium carbonate/citrate 30-75 mg/kg/day elemental Ca divided\n- Vitamin D replacement (ergocalciferol or cholecalciferol)\n\n**Always check and replace Mg:**\n- Hypomagnesemia causes refractory hypocalcemia via impaired PTH release\n- MgSO4 25-50 mg/kg IV over 1-2 hours\n\n**Cardiac safety:**\n- Hold IV calcium if on digoxin (precipitates digitalis toxicity)\n- ECG monitoring during infusion',
    citation: [1, 18],
    calculatorLinks: [
      { id: 'corrected-calcium', label: 'Corrected Calcium Calculator' },
    ],
    next: 'pee-hyper-ca',
    summary: 'Use ionized Ca; symptomatic → calcium gluconate 50-100 mg/kg IV over 5-10 min; replace Mg concurrently; hold IV Ca if on digoxin.',
    safetyLevel: 'critical',
  },
  {
    id: 'pee-hyper-ca',
    type: 'info',
    module: 3,
    title: 'Hypercalcemia — Hydrate First',
    body: '**Hypercalcemia (Ca >12) — uncommon in kids; usually points to a serious underlying cause.** [1,18,19]\n\n**Severity:** [19]\n- Mild: 10.5-12 mg/dL\n- Moderate: 12-14 mg/dL\n- **Severe / crisis:** >14 mg/dL or symptomatic (AMS, arrhythmia)\n\n**Symptoms — "stones, bones, groans, psychiatric overtones":**\n- Polyuria, polydipsia, dehydration\n- Anorexia, nausea, vomiting, constipation\n- AMS, lethargy, weakness, hyporeflexia\n- Short QT, bradycardia\n- Renal stones, nephrocalcinosis (chronic)\n\n**Common pediatric causes:** [1,18,19]\n- **Malignancy** — leukemia/lymphoma with PTHrP secretion, bone metastases\n- **Vitamin D toxicity** — accidental high-dose supplements\n- **Hyperparathyroidism** — MEN syndromes, primary\n- **Williams syndrome** (infantile hypercalcemia)\n- **Immobilization** in adolescents with high bone turnover (e.g., post-spinal injury)\n- **Granulomatous disease** (sarcoid, TB) — 1-alpha-hydroxylase activity\n\n**Treatment:** [19]\n\n**1. Aggressive isotonic hydration (foundation):**\n- 0.9% NS 20 mL/kg bolus, then 2-3× maintenance\n- Goal UOP >2 mL/kg/hr\n- Avoid LR (contains calcium)\n\n**2. Forced calciuresis:**\n- Furosemide 1 mg/kg IV q6h **AFTER** patient is volume-replete\n- Loop diuretic before adequate hydration → worsens dehydration and Ca\n\n**3. Reduce bone resorption:**\n- **Calcitonin** 4 IU/kg SC/IM q12h — onset hours, tachyphylaxis in 2-3 days\n- **Bisphosphonates** (pamidronate 0.5-1 mg/kg IV, zoledronate) — for malignancy; onset 1-2 days; consult heme/onc\n- **Glucocorticoids** — for vit D toxicity, granulomatous, hematologic malignancy\n\n**4. Dialysis:**\n- For severe (>18 mg/dL), AKI, CHF\n\n**5. Treat underlying cause:**\n- Stop vit D, calcium supplements\n- Onc workup if malignancy suspected\n- Parathyroidectomy if primary hyperparathyroidism',
    citation: [1, 18, 19],
    next: 'pee-hypoglycemia',
    summary: 'Hydrate first (0.9% NS 2-3× maintenance), then furosemide; calcitonin for acute; bisphosphonates for malignancy; dialysis if severe/AKI.',
  },

  // ===================================================================
  // MODULE 3: Branch Pathways — Hypoglycemia
  // ===================================================================
  {
    id: 'pee-hypoglycemia',
    type: 'info',
    module: 3,
    title: 'Hypoglycemia — Age-Specific Dextrose',
    body: '**Hypoglycemia is reversible brain injury. Treat in minutes, not hours.** [4,20]\n\n**Thresholds:** [4,20]\n- **Neonate:** <40 mg/dL (some references use <45-50)\n- **Infant/child:** <60 mg/dL\n- **Symptomatic at any level → treat**\n\n**Symptoms by age:** [4,20]\n- **Neonate/infant:** jitteriness, lethargy, poor feeding, hypotonia, apnea, hypothermia, seizure\n- **Older child:** sweating, tremor, hunger, irritability, confusion, seizure, coma\n\n**Treatment — "Rule of 50s":** dextrose % × mL/kg = 50 [4,20]\n\n| Age | Dextrose | Dose |\n|-----|----------|------|\n| **Neonate** | D10W | **2-5 mL/kg IV** (max 25 mL initial) |\n| **Infant (1-12 mo)** | D10W | **2-5 mL/kg IV** |\n| **Child (>1 yr)** | D25W | **2 mL/kg IV** (max 50 mL) |\n| **Adolescent** | D50W | **1 mL/kg IV** (max 50 mL) |\n\n**Why age-specific concentration:**\n- D25 and D50 are hyperosmolar — cause vein damage and IVH in neonates\n- Neonates need D10 (safer for fragile vasculature, prevents rebound hypoglycemia)\n\n**No IV access:**\n- **Glucagon 0.5 mg IM if <25 kg, 1 mg IM if ≥25 kg**\n- Works only if glycogen stores present (fails in starvation, alcohol, sulfonylurea)\n- Onset 5-15 min\n\n**Maintenance after bolus:**\n- Start D10 IVF at maintenance + 50% (or GIR 6-8 mg/kg/min initially)\n- Recheck glucose q15-30 min until stable >70, then q1-2h\n\n**Find and treat the cause:** [4,20]\n- **Sepsis** (most common in unwell child) — full sepsis workup\n- **Fasting / decreased intake** (infants vulnerable; check feeding history)\n- **Insulin/sulfonylurea ingestion** (accidental or Munchausen) — admit, prolonged monitoring (sulfonylureas → octreotide)\n- **Adrenal insufficiency** (cortisol low, ACTH high in primary; bronze skin if Addison) — give hydrocortisone 25 mg IV stress dose\n- **Inborn errors of metabolism** (especially recurrent or family history) — send "critical sample" before D-glucose (insulin, C-peptide, cortisol, GH, lactate, NH3, urine ketones/organic acids)\n- **Alcohol or salicylate ingestion**\n- **Hypoadrenalism / hypopituitarism**\n\n**Critical sample (BEFORE giving dextrose if hypopituitarism/IEM suspected):**\n- Plasma glucose, insulin, C-peptide, β-hydroxybutyrate, cortisol, GH, ACTH, lactate, ammonia, free fatty acids\n- Urine: ketones, reducing substances, organic acids\n- Saves you from a missed metabolic diagnosis',
    citation: [4, 20],
    next: 'pee-disposition',
    summary: 'Rule of 50s: D10 2-5 mL/kg neonate, D25 2 mL/kg child, D50 1 mL/kg adolescent; glucagon if no IV; send critical sample if IEM/hypopit suspected.',
    safetyLevel: 'critical',
  },

  // ===================================================================
  // MODULE 4 / 5: Disposition
  // ===================================================================
  {
    id: 'pee-disposition',
    type: 'question',
    module: 4,
    title: 'Disposition',
    body: 'Determine appropriate disposition based on severity, response to treatment, and underlying cause: [1,2,3]',
    citation: [1, 2, 3],
    options: [
      {
        label: 'PICU admission',
        description: 'Symptomatic severe disturbance, hypertonic drip, refractory hyperK, dialysis-eligible, AMS or seizure',
        next: 'pee-picu',
        urgency: 'critical',
      },
      {
        label: 'Inpatient floor / step-down',
        description: 'Stable after ED treatment, requires telemetry or serial labs, ongoing IV replacement',
        next: 'pee-floor',
      },
      {
        label: 'ED observation / discharge',
        description: 'Mild asymptomatic, reversible cause (gastroenteritis fluid-corrected), normalized labs, reliable family',
        next: 'pee-discharge',
      },
    ],
  },
  {
    id: 'pee-picu',
    type: 'result',
    module: 4,
    title: 'PICU Admission',
    body: '**PICU criteria:** [1,2,4]\n- Any symptomatic severe disturbance (seizure, AMS, herniation signs, arrhythmia)\n- Hypertonic saline infusion required for ongoing correction\n- Hyperkalemia with ECG changes after initial treatment\n- AKI requiring dialysis\n- Adrenal crisis / suspected CAH in neonate\n- Persistent hypoglycemia needing high-GIR drip (>10 mg/kg/min)\n- Refractory or recurrent seizures\n\n**PICU management:**\n- Continuous cardiac monitoring; arterial line if on drips\n- Hourly neuro checks if Na disturbance or AMS\n- Serial labs q2-4h until stable, then q6h\n- Strict I/O, daily weights\n- Pediatric endocrine, nephrology, or genetics consult as indicated\n- Identify and treat underlying cause (gastroenteritis, sepsis, AKI, CAH, IEM, ingestion)\n\n**Transition plan:**\n- Wean drips once labs stable for 12-24h\n- Transition to oral replacement or maintenance fluids\n- Outpatient follow-up with relevant subspecialty',
    recommendation: 'Admit to PICU with continuous cardiac monitoring, hourly neuro checks, serial labs q2-4h, and subspecialty consult per cause.',
    confidence: 'definitive',
    citation: [1, 2, 4],
  },
  {
    id: 'pee-floor',
    type: 'result',
    module: 4,
    title: 'Floor / Step-Down Admission',
    body: '**Floor criteria:** [1,3,16]\n- Mild-moderate disturbance, asymptomatic or symptoms resolved after ED treatment\n- Stable on oral or low-rate IV electrolyte replacement\n- Telemetry indicated (post-hyperK, post-hypoK, QT prolongation)\n- Awaiting workup for underlying cause (endocrine, renal, GI)\n- Recurrent hypoglycemia in young child needing observation through feeds\n\n**Floor management:**\n- Telemetry if K/Ca abnormality with prior ECG changes\n- Serial labs q6-8h\n- Scheduled oral or IV replacement\n- Pediatric subspecialty consult as appropriate\n- Hydration and nutrition support\n\n**Escalation criteria → PICU:**\n- Worsening symptoms or labs\n- New arrhythmia or AMS\n- Inadequate response to replacement\n\n**Discharge planning:**\n- Stable labs for 24h without IV replacement\n- Tolerating PO and adequate UOP\n- Identified cause with treatment plan in place',
    recommendation: 'Admit to floor with telemetry (if K/Ca abnormality), serial labs q6-8h, and subspecialty consult per cause.',
    confidence: 'recommended',
    citation: [1, 3, 16],
  },
  {
    id: 'pee-discharge',
    type: 'result',
    module: 4,
    title: 'ED Observation / Discharge',
    body: '**Discharge criteria (highly selected):** [1,3,16]\n- Mild, asymptomatic, single disturbance with clear reversible cause (e.g., mild hyponatremia from gastroenteritis corrected with ORT in ED)\n- Labs normalized or trending appropriately\n- Tolerating PO; adequate hydration\n- Reliable family with transportation and ability to return\n- Confirmed PCP follow-up within 24-48h\n- No drug toxicity or NAT concern\n\n**ED observation (≤6-12h):**\n- For borderline cases: mild hypoNa post-fluids, mild hypoK post-replacement, mild hypoglycemia after one feed cycle\n- Repeat BMP before discharge\n- Document tolerating PO, normal vital signs, and reassuring exam\n\n**Discharge instructions:**\n- Continue oral electrolyte replacement as appropriate (oral KCl, oral Ca, ORT solutions)\n- Specific return precautions: AMS, seizure, vomiting, lethargy, poor feeding, decreased UOP, weakness\n- Avoid hypotonic fluids (plain water, dilute juices) in infants; use age-appropriate ORS\n- Follow-up labs at PCP within 24-48h\n- Educate caregivers about correct formula mixing (never dilute) and not giving plain water to infants <6 mo\n\n**Cases that should NOT be discharged:**\n- Any neonate with electrolyte abnormality without clear benign cause\n- Any disturbance with unclear etiology\n- Any prior seizure or AMS in this episode\n- Inability to keep follow-up',
    recommendation: 'Discharge only for mild, asymptomatic, reversible cases with reliable family and confirmed follow-up. Most pediatric electrolyte emergencies warrant admission.',
    confidence: 'consider',
    citation: [1, 3, 16],
  },
];

export const PEDS_ELECTROLYTE_NODE_COUNT = PEDS_ELECTROLYTE_NODES.length;

export const PEDS_ELECTROLYTE_MODULE_LABELS = [
  'Triage',
  'Identify',
  'Branch Pathways',
  'Disposition',
];

export const PEDS_ELECTROLYTE_CITATIONS: Citation[] = [
  { num: 1, text: 'Somers MJ, Traum AZ. Pediatric Electrolyte Emergencies. Emergency Medicine Practice (EB Medicine). 2023. + Greenbaum LA. Pathophysiology of Body Fluids and Fluid Therapy. In: Kliegman RM, Nelson Textbook of Pediatrics. 21st ed. Elsevier; 2020.' },
  { num: 2, text: 'American Heart Association. Pediatric Advanced Life Support (PALS) Provider Manual. 2020 Update.' },
  { num: 3, text: 'Hoorn EJ, Zietse R. Diagnosis and Treatment of Hyponatremia: Compilation of the Guidelines. J Am Soc Nephrol. 2017;28(5):1340-1349.' },
  { num: 4, text: 'Thompson-Branch A, Havranek T. Neonatal Hypoglycemia. Pediatr Rev. 2017;38(4):147-157. + Thornton PS, et al. Recommendations from the Pediatric Endocrine Society for Evaluation and Management of Persistent Hypoglycemia in Neonates, Infants, and Children. J Pediatr. 2015;167(2):238-245.' },
  { num: 5, text: 'Semler MW, Self WH, Wanderer JP, et al. Balanced Crystalloids versus Saline in Critically Ill Adults (SMART trial). N Engl J Med. 2018;378(9):829-839. + Weiss SL, et al. Surviving Sepsis Campaign International Guidelines for the Management of Septic Shock and Sepsis-Associated Organ Dysfunction in Children. Pediatr Crit Care Med. 2020;21(2):e52-e106.' },
  { num: 6, text: 'Emrath ET, Fortenberry JD, Travers C, et al. Resuscitation with Balanced Fluids is Associated with Improved Survival in Pediatric Severe Sepsis. Crit Care Med. 2017;45(7):1177-1183.' },
  { num: 7, text: 'Feld LG, Neuspiel DR, Foster BA, et al. Clinical Practice Guideline: Maintenance Intravenous Fluids in Children. Pediatrics. 2018;142(6):e20183083.' },
  { num: 8, text: 'Moritz ML, Ayus JC. Maintenance Intravenous Fluids in Acutely Ill Patients. N Engl J Med. 2015;373(14):1350-1360. + Moritz ML, Ayus JC. New aspects in the pathogenesis, prevention, and treatment of hyponatremic encephalopathy in children. Pediatr Nephrol. 2010;25(7):1225-1238.' },
  { num: 9, text: 'Verbalis JG, Goldsmith SR, Greenberg A, et al. Diagnosis, Evaluation, and Treatment of Hyponatremia: Expert Panel Recommendations. Am J Med. 2013;126(10 Suppl 1):S1-S42.' },
  { num: 10, text: 'Adrogue HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342(21):1581-1589.' },
  { num: 11, text: 'Sterns RH. Disorders of Plasma Sodium — Causes, Consequences, and Correction. N Engl J Med. 2015;372(1):55-65.' },
  { num: 12, text: 'Adrogue HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342(20):1493-1499. + Greenbaum LA. Electrolyte and Acid-Base Disorders. In: Kliegman RM, Nelson Textbook of Pediatrics. 21st ed.' },
  { num: 13, text: 'Lehnhardt A, Kemper MJ. Pathogenesis, diagnosis and management of hyperkalemia. Pediatr Nephrol. 2011;26(3):377-384.' },
  { num: 14, text: 'Diercks DB, Shumaik GM, Harrigan RA, et al. Electrocardiographic manifestations: electrolyte abnormalities. J Emerg Med. 2004;27(2):153-160.' },
  { num: 15, text: 'Lindner G, Burdmann EA, Clase CM, et al. Acute hyperkalemia in the emergency department: a summary from a Kidney Disease: Improving Global Outcomes conference. Eur J Emerg Med. 2020;27(5):329-337.' },
  { num: 16, text: 'Daly K, Farrington E. Hypokalemia and hyperkalemia in infants and children: pathophysiology and treatment. J Pediatr Health Care. 2013;27(6):486-496.' },
  { num: 17, text: 'Cohn JN, Kowey PR, Whelton PK, Prisant LM. New guidelines for potassium replacement in clinical practice. Arch Intern Med. 2000;160(16):2429-2436.' },
  { num: 18, text: 'Cooper MS, Gittoes NJ. Diagnosis and management of hypocalcaemia. BMJ. 2008;336(7656):1298-1302. + Lietman SA, Germain-Lee EL, Levine MA. Hypercalcemia in children and adolescents. Curr Opin Pediatr. 2010;22(4):508-515.' },
  { num: 19, text: 'Davies JH, Shaw NJ. Investigation and management of hypercalcaemia in children. Arch Dis Child. 2012;97(6):533-538.' },
  { num: 20, text: 'Adamkin DH, Committee on Fetus and Newborn. Postnatal Glucose Homeostasis in Late-Preterm and Term Infants. Pediatrics. 2011;127(3):575-579. + Pediatric Endocrine Society. Recommendations for Evaluation and Management of Persistent Hypoglycemia. 2015.' },
];
