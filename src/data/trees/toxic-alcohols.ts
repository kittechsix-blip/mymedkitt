// MedKitt — Toxic Alcohols
// Methanol, ethylene glycol, isopropyl alcohol, propylene glycol: recognition, osmolar gap,
// fomepizole/ethanol therapy, dialysis indications, cofactor therapy, and disposition.
// 8 modules: Recognition → Identification → Workup → Antidote → Dialysis → Cofactors → Monitoring → Disposition
// 42 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const TOXIC_ALCOHOLS_NODES: DecisionNode[] = [
  // ═══════════════════════════════════════════════════════════════
  // MODULE 1: Recognition & Initial Assessment
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tox-alc-start',
    type: 'question',
    module: 1,
    title: 'Toxic Alcohols — Initial Assessment',
    body: '[Toxic Alcohol Summary](#/info/tox-alc-summary) — quick reference.\n\n**The toxic alcohols are:**\n• **Methanol** — windshield washer fluid, paint thinner, moonshine\n• **Ethylene glycol** — antifreeze (sweet taste), brake fluid\n• **Isopropyl alcohol** — rubbing alcohol, hand sanitizer\n• **Propylene glycol** — IV drug diluent (lorazepam, phenytoin, esmolol)\n\n**Key clinical concept:**\nThe parent compounds cause intoxication. The **metabolites** cause organ damage [1][2].\n• Methanol → **formic acid** → retinal/optic nerve toxicity, blindness\n• Ethylene glycol → **glycolic/oxalic acid** → renal failure, Ca-oxalate crystals\n• Isopropyl alcohol → **acetone** → minimal end-organ toxicity\n\n**Treatment goals:** Block alcohol dehydrogenase to prevent toxic metabolite formation.\n\nWhat is the patient\'s current clinical status?',
    citation: [1, 2],
    calculatorLinks: [{ id: 'tox-alc-osmolar', label: 'Osmolar Gap Calculator' }],
    options: [
      { label: 'Suspected ingestion — asymptomatic', description: 'History of ingestion, no symptoms yet', next: 'tox-alc-identify' },
      { label: 'Inebriated with unknown ingestion', description: 'CNS depression, unclear what was ingested', next: 'tox-alc-identify' },
      { label: 'Anion gap metabolic acidosis', description: 'Known or suspected toxic alcohol with acidosis', next: 'tox-alc-severe', urgency: 'urgent' },
      { label: 'Vision changes or seizures', description: 'Likely methanol toxicity — emergent treatment', next: 'tox-alc-methanol-severe', urgency: 'critical' },
      { label: 'Renal failure + acidosis', description: 'Likely ethylene glycol — emergent treatment', next: 'tox-alc-eg-severe', urgency: 'critical' },
    ],
    summary: 'Parent compounds cause intoxication; metabolites cause organ damage — methanol→blindness, EG→renal failure',
    safetyLevel: 'warning',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 2: Identification — Which Toxic Alcohol?
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tox-alc-identify',
    type: 'question',
    module: 2,
    title: 'Identify the Toxic Alcohol',
    body: '**Clinical clues to identify the toxic alcohol:**\n\n| Feature | Methanol | Ethylene Glycol | Isopropanol |\n|---------|----------|-----------------|-------------|\n| **Classic source** | Windshield washer | Antifreeze | Rubbing alcohol |\n| **Key finding** | Visual symptoms | Renal failure | Ketosis w/o acidosis |\n| **Anion gap** | YES (severe) | YES (severe) | NO |\n| **Osmolar gap** | Elevated early | Elevated early | Elevated |\n| **Timeline** | Biphasic (12-24h) | Biphasic (12-48h) | Rapid (<6h) |\n\n**The osmolar gap helps early, anion gap helps late** [1][2]:\n• **Early (0-6h):** Parent compound present → ↑ osmolar gap, normal anion gap\n• **Late (12+h):** Metabolites accumulate → ↓ osmolar gap, ↑ anion gap\n\nWhat clinical pattern do you see?',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'tox-alc-osmolar', label: 'Osmolar Gap' },
      { id: 'tox-alc-which', label: 'Which Alcohol?' },
    ],
    options: [
      { label: 'Visual symptoms (blurred, snowstorm, photophobia)', description: 'Strongly suggests METHANOL', next: 'tox-alc-methanol', urgency: 'critical' },
      { label: 'Renal failure + hypocalcemia + crystaluria', description: 'Strongly suggests ETHYLENE GLYCOL', next: 'tox-alc-eg', urgency: 'critical' },
      { label: 'Ketosis WITHOUT acidosis (fruity breath)', description: 'Suggests ISOPROPANOL', next: 'tox-alc-isopropanol' },
      { label: 'ICU patient on IV drips + lactic acidosis', description: 'Consider PROPYLENE GLYCOL', next: 'tox-alc-propylene' },
      { label: 'Unknown — just elevated osmolar gap', description: 'Empiric treatment while identifying', next: 'tox-alc-empiric' },
    ],
    summary: 'Visual symptoms→methanol; renal failure→EG; ketosis without acidosis→isopropanol; ICU drips+lactic→propylene glycol',
  },

  // METHANOL pathway
  {
    id: 'tox-alc-methanol',
    type: 'info',
    module: 2,
    title: 'Methanol Toxicity',
    body: '**Methanol** → formaldehyde → **formic acid** (toxic metabolite) [1][3]\n\n**Sources:** Windshield washer fluid (30-50%), paint thinner, moonshine, industrial solvents\n\n**Classic presentation:**\n• **Visual symptoms** — blurred vision, "snowstorm" appearance, photophobia, blindness\n• Headache, dizziness, abdominal pain\n• **Biphasic course:** Early CNS depression, then delayed severe acidosis (12-24h)\n\n**Examination findings:**\n• Optic disc hyperemia (early) → optic nerve atrophy (late)\n• Kussmaul respirations\n• Mydriasis with sluggish pupils\n\n**Labs:**\n• Severe anion gap metabolic acidosis (pH often <7.0 in severe cases)\n• Osmolar gap elevated early, decreases as methanol metabolized\n• Serum methanol level if available\n\n**Lethal dose:** As little as 30 mL can cause blindness; 100-250 mL often fatal [3].',
    citation: [1, 3],
    calculatorLinks: [{ id: 'tox-alc-lethal', label: 'Lethal Dose Guide' }],
    next: 'tox-alc-workup',
    summary: 'Methanol→formic acid→retinal toxicity; visual symptoms pathognomonic; as little as 30mL can cause blindness',
    safetyLevel: 'critical',
  },
  {
    id: 'tox-alc-methanol-severe',
    type: 'info',
    module: 2,
    title: 'Severe Methanol Toxicity — Emergent Treatment',
    body: '**CRITICAL: Vision changes indicate formic acid accumulation — irreversible damage occurring NOW**\n\n**Immediate actions (do all simultaneously):**\n1. **[Fomepizole](#/drug/fomepizole/methanol)** 15 mg/kg IV loading dose — blocks alcohol dehydrogenase [1][4]\n2. **Nephrology consult for urgent hemodialysis** — removes methanol AND formic acid [1][4]\n3. **[Folic acid](#/drug/folic-acid/methanol)** 50 mg IV Q4-6H — enhances formic acid metabolism [1][3]\n4. **Sodium bicarbonate** if pH <7.3 — maintain pH >7.3 to reduce formate toxicity\n\n**Dialysis indications for methanol [EXTRIP]:**\n• Methanol >70 mg/dL (or >50 mg/dL with severe acidosis)\n• Vision changes\n• Coma or seizures\n• Severe metabolic acidosis despite treatment\n• Renal dysfunction\n\n**Goal:** Stop metabolite production and remove formic acid before permanent blindness.',
    citation: [1, 3, 4],
    calculatorLinks: [{ id: 'tox-alc-fomepizole', label: 'Fomepizole Dosing' }],
    next: 'tox-alc-fomepizole',
    summary: 'Vision changes = formic acid damage NOW; fomepizole + urgent HD + folic acid; dialysis if methanol >50-70 mg/dL or vision symptoms',
    safetyLevel: 'critical',
  },

  // ETHYLENE GLYCOL pathway
  {
    id: 'tox-alc-eg',
    type: 'info',
    module: 2,
    title: 'Ethylene Glycol Toxicity',
    body: '**Ethylene glycol** → glycolaldehyde → **glycolic acid** → glyoxylic acid → **oxalic acid** [1][2]\n\n**Sources:** Antifreeze (95-100%, sweet taste), brake fluid, industrial coolants\n\n**Classic three-phase presentation:**\n\n**Phase 1 (0.5-12h) — CNS:**\n• Resembles ethanol intoxication\n• Ataxia, nausea, vomiting\n• May appear "drunk" without alcohol on breath\n\n**Phase 2 (4-12h) — Cardiopulmonary:**\n• Tachycardia, hypertension\n• Pulmonary edema, chest pain\n• Heart failure\n\n**Phase 3 (12-48h) — Renal:**\n• Severe anion gap metabolic acidosis\n• Acute kidney injury (flank pain, oliguria)\n• **Hypocalcemia** (oxalate binds calcium)\n• **Calcium-oxalate crystals** on urinalysis (monohydrate=needle, dihydrate=envelope)\n\n**Lethal dose:** 1-1.5 mL/kg (~100 mL in adults) [2].',
    citation: [1, 2],
    calculatorLinks: [{ id: 'tox-alc-lethal', label: 'Lethal Dose Guide' }],
    next: 'tox-alc-workup',
    summary: 'EG→glycolic/oxalic acid; three phases: CNS→cardiopulmonary→renal failure; hypocalcemia + Ca-oxalate crystals pathognomonic',
    safetyLevel: 'critical',
  },
  {
    id: 'tox-alc-eg-severe',
    type: 'info',
    module: 2,
    title: 'Severe Ethylene Glycol Toxicity — Emergent Treatment',
    body: '**CRITICAL: Renal failure indicates oxalic acid precipitation — ongoing nephrotoxicity**\n\n**Immediate actions (do all simultaneously):**\n1. **[Fomepizole](#/drug/fomepizole/eg)** 15 mg/kg IV loading dose — blocks alcohol dehydrogenase [1][4]\n2. **Nephrology consult for urgent hemodialysis** — removes EG AND glycolic acid [1][4]\n3. **[Thiamine](#/drug/thiamine/eg)** 100 mg IV Q6H + **[Pyridoxine](#/drug/pyridoxine/eg)** 100 mg IV Q6H — shunt glyoxylic acid away from oxalate [1][2]\n4. **Check ionized calcium** — replace if symptomatic hypocalcemia\n\n**Dialysis indications for ethylene glycol [EXTRIP]:**\n• EG level >310 mg/dL (even with fomepizole)\n• Severe metabolic acidosis\n• Renal dysfunction\n• End-organ damage\n\n**Note:** Without renal dysfunction and minimal acidosis, fomepizole alone may suffice.',
    citation: [1, 2, 4],
    calculatorLinks: [{ id: 'tox-alc-fomepizole', label: 'Fomepizole Dosing' }],
    next: 'tox-alc-fomepizole',
    summary: 'Renal failure = oxalate precipitation; fomepizole + HD + thiamine/pyridoxine; check/replace calcium; HD if EG >310 or AKI',
    safetyLevel: 'critical',
  },

  // ISOPROPANOL pathway
  {
    id: 'tox-alc-isopropanol',
    type: 'info',
    module: 2,
    title: 'Isopropyl Alcohol Toxicity',
    body: '**Isopropyl alcohol** → **acetone** (not highly toxic) [1][5]\n\n**Sources:** Rubbing alcohol (70%), hand sanitizer, nail polish remover\n\n**Key differentiator:** **Ketosis WITHOUT acidosis** [1][5]\n• Acetone produces ketonemia/ketonuria\n• But acetone is NOT an acid — no metabolic acidosis\n• If acidosis present, look for another cause (co-ingestion, lactate from shock)\n\n**Clinical presentation:**\n• 2-3× more potent CNS depressant than ethanol\n• Rapid onset (30-60 min), peak within hours\n• Hemorrhagic gastritis (nausea, vomiting, hematemesis)\n• Hypotension, tachycardia\n• Fruity breath (acetone)\n\n**Labs:**\n• Elevated osmolar gap\n• Ketones positive (serum and urine)\n• **Normal anion gap** (unless shock)\n• Falsely elevated creatinine on some assays\n\n**Rarely lethal** — supportive care usually sufficient [5].',
    citation: [1, 5],
    next: 'tox-alc-isopropanol-tx',
    summary: 'Isopropanol→acetone (not toxic); KETOSIS WITHOUT ACIDOSIS; GI symptoms, CNS depression; rarely lethal, supportive care',
  },
  {
    id: 'tox-alc-isopropanol-tx',
    type: 'info',
    module: 2,
    title: 'Isopropanol Treatment',
    body: '**Isopropanol is the "benign" toxic alcohol** — no toxic metabolites [1][5]\n\n**Treatment is supportive:**\n• IV fluids for hypotension\n• Antiemetics for GI symptoms\n• Glucose monitoring\n• Airway protection if severe CNS depression\n\n**Fomepizole is NOT indicated** [1][5]\n• Acetone is not toxic — no benefit to blocking ADH\n• Would just prolong isopropanol half-life\n\n**Dialysis rarely indicated:**\n• Consider only if: persistent hypotension, lactic acidosis, serum level >500 mg/dL\n• Most patients recover with supportive care alone\n\n**Observation:**\n• Minimum 4-6 hours if asymptomatic\n• Admit if altered mental status, hypotension, or significant ingestion (>200 mL)\n\n**Lethal dose:** 2-4 mL/kg (240 mL in adults) — but survival documented with >1L ingestion [5].',
    citation: [1, 5],
    next: 'tox-alc-dispo',
    summary: 'Isopropanol: supportive care only; fomepizole NOT indicated (acetone not toxic); dialysis rarely needed',
  },

  // PROPYLENE GLYCOL pathway
  {
    id: 'tox-alc-propylene',
    type: 'info',
    module: 2,
    title: 'Propylene Glycol Toxicity',
    body: '**Propylene glycol** → **lactic acid** (via alcohol dehydrogenase) [6]\n\n**Sources:** IV drug diluent — lorazepam, diazepam, phenytoin, esmolol, nitroglycerin\n\n**Risk factors for accumulation:**\n• High-dose continuous IV infusions (especially lorazepam >1 mg/kg/day)\n• Renal dysfunction\n• Children <4 years (immature metabolism)\n• Hepatic dysfunction\n• Disulfiram or metronidazole use (inhibit ADH)\n\n**Clinical presentation:**\n• Often mimics sepsis — fever, tachycardia, hypotension\n• Anion gap metabolic acidosis (lactic acidosis)\n• Elevated osmolar gap\n• AKI, CNS depression\n• Hemolysis (rare)\n\n**Diagnosis:**\n• **Osmolar gap >10 mOsm/kg** + lactic acidosis + IV drip use\n• Propylene glycol levels available at some labs (>18 mg/dL concerning)\n\n**Key:** This is iatrogenic — suspect in ICU patients on high-dose benzodiazepine drips.',
    citation: [6],
    next: 'tox-alc-propylene-tx',
    summary: 'Propylene glycol: iatrogenic from IV drips (lorazepam); causes lactic acidosis, mimics sepsis; check osmolar gap in ICU patients',
  },
  {
    id: 'tox-alc-propylene-tx',
    type: 'info',
    module: 2,
    title: 'Propylene Glycol Treatment',
    body: '**Treatment for propylene glycol toxicity:**\n\n**1. Stop the offending agent**\n• Discontinue lorazepam/diazepam drip\n• Switch to non-propylene glycol alternatives:\n  - Midazolam (no propylene glycol)\n  - Dexmedetomidine\n  - Propofol\n\n**2. Supportive care**\n• IV fluids for hypotension\n• Bicarbonate for severe acidosis if needed\n\n**3. Fomepizole consideration**\n• May block conversion to lactate [6]\n• Limited evidence, but reasonable in severe toxicity\n• Dose: 15 mg/kg load, then 10 mg/kg Q12H\n\n**4. Hemodialysis**\n• Effective for removing propylene glycol\n• Consider if severe acidosis and clinical deterioration\n\n**Prognosis:** Usually resolves within 24-48 hours after stopping the offending drug.',
    citation: [6],
    next: 'tox-alc-dispo',
    summary: 'Stop the drip (switch to midazolam); supportive care; fomepizole reasonable; dialysis for severe cases',
  },

  // EMPIRIC TREATMENT
  {
    id: 'tox-alc-empiric',
    type: 'info',
    module: 2,
    title: 'Empiric Treatment — Unknown Toxic Alcohol',
    body: '**When you suspect toxic alcohol but can\'t identify which:**\n\n**Start fomepizole empirically if [1][4]:**\n• History of toxic alcohol ingestion\n• Osmolar gap >10 mOsm/kg without explanation\n• Anion gap metabolic acidosis without clear cause\n• Altered mental status + metabolic derangement\n\n**Simultaneous workup:**\n• Send serum methanol and ethylene glycol levels (if available)\n• Check lactate, ketones, glucose\n• Urinalysis for calcium-oxalate crystals (envelope or needle shapes)\n• Visual acuity testing if alert\n• ABG/VBG with electrolytes\n\n**Clinical differentiation:**\n• Visual symptoms → METHANOL (treat as methanol)\n• Renal failure + hypocalcemia + crystals → ETHYLENE GLYCOL\n• Ketones + normal anion gap → ISOPROPANOL (stop fomepizole)\n\n**The cost of fomepizole is high (~$1500/dose), but the cost of blindness or renal failure is higher.**',
    citation: [1, 4],
    calculatorLinks: [{ id: 'tox-alc-fomepizole', label: 'Fomepizole Dosing' }],
    next: 'tox-alc-workup',
    summary: 'Start fomepizole empirically for osmolar gap >10 + acidosis — differentiate later based on clinical findings and levels',
    safetyLevel: 'warning',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 3: Diagnostic Workup
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tox-alc-workup',
    type: 'info',
    module: 3,
    title: 'Diagnostic Workup',
    body: '**Order these labs immediately:**\n\n**Gap calculations:**\n• **Osmolar gap** = Measured osmolality - Calculated osmolality\n• Calculated = 2[Na] + glucose/18 + BUN/2.8 + EtOH/4.6\n• Normal <10 mOsm/kg; >10 suggests exogenous osmoles [1][2]\n• **Anion gap** = Na - (Cl + HCO3); normal 8-12\n\n**Specific labs:**\n• Serum methanol and ethylene glycol levels (if available)\n• Serum ethanol level (co-ingestion common, also therapeutic)\n• ABG or VBG\n• BMP (check HCO3, creatinine, calcium)\n• Lactate\n• Serum ketones\n• Serum osmolality (measured)\n• Urinalysis (look for Ca-oxalate crystals)\n\n**Clinical tests:**\n• Visual acuity + fundoscopic exam (optic disc for methanol)\n• ECG (QTc for hypocalcemia in EG)\n\n**Important:** The **inverse relationship** between osmolar and anion gap helps with timing [1]:\n• Early: ↑ osmolar gap, ↓ anion gap (parent compound)\n• Late: ↓ osmolar gap, ↑ anion gap (metabolites)',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'tox-alc-osmolar', label: 'Osmolar Gap' },
      { id: 'anion-gap', label: 'Anion Gap' },
    ],
    next: 'tox-alc-severe',
    summary: 'Osmolar gap early (parent), anion gap late (metabolites) — get levels, VBG, BMP, lactate, ketones, UA for crystals',
  },
  {
    id: 'tox-alc-severe',
    type: 'question',
    module: 3,
    title: 'Severity Assessment',
    body: '**Assess severity to guide treatment intensity:**\n\n**Severe toxicity (any of):**\n• pH <7.3\n• Anion gap >20\n• Visual symptoms (methanol)\n• Renal failure (ethylene glycol)\n• Altered mental status\n• Hemodynamic instability\n\n**Moderate toxicity:**\n• Osmolar gap >10 without significant acidosis\n• Normal vision and renal function\n• Alert mental status\n\n**Treatment thresholds [AACT guidelines]:**\n• Methanol ≥20 mg/dL — treat [1][3]\n• Ethylene glycol ≥20-25 mg/dL — treat [1][2]\n\nWhat is the patient\'s severity?',
    citation: [1, 2, 3],
    calculatorLinks: [{ id: 'tox-alc-lethal', label: 'Lethal Doses' }],
    options: [
      { label: 'Severe — acidosis, vision/renal, AMS', description: 'pH <7.3, end-organ damage, or unstable', next: 'tox-alc-fomepizole', urgency: 'critical' },
      { label: 'Moderate — elevated osmolar gap, stable', description: 'Osmolar gap >10 but no severe features', next: 'tox-alc-fomepizole', urgency: 'urgent' },
      { label: 'Isopropanol confirmed', description: 'Ketosis without acidosis', next: 'tox-alc-isopropanol-tx' },
    ],
    summary: 'Severe = pH <7.3, visual symptoms, renal failure, AMS; treat methanol ≥20 mg/dL, EG ≥20-25 mg/dL',
    safetyLevel: 'warning',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 4: Antidote Therapy (Fomepizole / Ethanol)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tox-alc-fomepizole',
    type: 'info',
    module: 4,
    title: 'Fomepizole — First-Line Antidote',
    body: '**[Fomepizole (Antizol)](#/drug/fomepizole/toxic alcohol)** — competitive inhibitor of alcohol dehydrogenase [1][4]\n\n**Mechanism:** 8000× higher affinity for ADH than ethanol → prevents conversion of methanol/EG to toxic metabolites.\n\n**Indications:**\n• Documented methanol or EG ingestion\n• Osmolar gap >10 with metabolic acidosis\n• Suspected toxic alcohol pending confirmation\n\n**Standard Dosing:**\n• **Loading dose:** 15 mg/kg IV over 30 minutes\n• **Maintenance:** 10 mg/kg IV Q12H × 4 doses\n• Then 15 mg/kg IV Q12H thereafter (auto-induction)\n\n**Continue until:**\n• Toxic alcohol level undetectable or <20 mg/dL AND\n• Patient asymptomatic with normal pH [1][4]\n\n**No dose adjustment** needed for renal or hepatic dysfunction.\n\n**Side effects:** Headache, nausea, dizziness, transient LFT/WBC elevation — generally well tolerated.',
    citation: [1, 4],
    calculatorLinks: [{ id: 'tox-alc-fomepizole', label: 'Fomepizole Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Fomepizole',
        dose: '15 mg/kg loading dose',
        route: 'IV over 30 min',
        frequency: '10 mg/kg Q12H × 4 doses, then 15 mg/kg Q12H',
        duration: 'Until toxic alcohol <20 mg/dL and pH normal',
        notes: '8000× affinity for ADH vs ethanol. No renal/hepatic adjustment.',
      },
      monitoring: 'Toxic alcohol levels Q12H until undetectable. pH/bicarbonate Q4-6H.',
    },
    next: 'tox-alc-fome-dialysis',
    summary: 'Fomepizole 15 mg/kg load, 10 mg/kg Q12H × 4, then 15 mg/kg Q12H — blocks ADH with 8000× affinity vs ethanol',
    safetyLevel: 'warning',
  },
  {
    id: 'tox-alc-fome-dialysis',
    type: 'info',
    module: 4,
    title: 'Fomepizole During Hemodialysis',
    body: '**Fomepizole is dialyzed** — dosing changes during HD [1][4]:\n\n**During hemodialysis:**\n• Give doses **Q4H** instead of Q12H (fomepizole induces its own metabolism)\n• If last dose was >6 hours ago, give supplemental dose at HD start\n\n**Alternative continuous infusion during HD:**\n• 1-1.5 mg/kg/hr continuous IV infusion during dialysis\n• European protocol, simpler than intermittent dosing\n\n**After dialysis ends:**\n• If <1 hour since last dose → next dose in 12 hours\n• If 1-3 hours since last dose → next dose in 12 hours\n• If >3 hours since last dose → give dose immediately\n\n**Hemodialysis dramatically shortens half-lives:**\n• Methanol: 71 hours → 2.5 hours with HD\n• Ethylene glycol: 16 hours → 2.7 hours with HD\n\nThese agents are highly dialyzable — HD removes both parent compound AND toxic metabolites.',
    citation: [1, 4],
    calculatorLinks: [{ id: 'tox-alc-fomepizole', label: 'Fomepizole Calculator' }],
    next: 'tox-alc-ethanol',
    summary: 'During HD: fomepizole Q4H (auto-induces metabolism) or 1-1.5 mg/kg/hr infusion; HD cuts methanol half-life 71h→2.5h',
  },
  {
    id: 'tox-alc-ethanol',
    type: 'info',
    module: 4,
    title: 'Ethanol — Alternative Antidote',
    body: '**IV or oral ethanol** — competitive substrate for alcohol dehydrogenase [1][4]\n\n**Use when fomepizole unavailable or delayed.**\n\n**Target serum ethanol:** 100-150 mg/dL [1]\n\n**Dosing (IV preferred):**\n• **Loading:** 0.8 g/kg ethanol (dilute 10% ethanol in D5W)\n• **Maintenance:** 66-130 mg/kg/hr (higher in chronic drinkers)\n• Titrate to ethanol level 100-150 mg/dL\n\n**Oral dosing (emergency backup):**\n• 80-proof liquor (40% ethanol)\n• Loading: ~2 mL/kg orally (3-4 standard drinks for 70 kg adult)\n• Maintain with ~0.3 mL/kg/hr\n\n**Problems with ethanol:**\n• Difficult to titrate — levels vary widely\n• CNS depression, hypoglycemia\n• Aspiration risk if altered\n• Higher medication error rate (19% vs 7% with fomepizole)\n• Higher adverse events (57% vs 12% with fomepizole) [4]\n\n**If patient is already drunk:** Target that level — it\'s already providing ADH inhibition.',
    citation: [1, 4],
    treatment: {
      firstLine: {
        drug: 'Ethanol',
        dose: '0.8 g/kg loading',
        route: 'IV (10% ethanol in D5W) or PO (80-proof liquor)',
        frequency: '66-130 mg/kg/hr infusion',
        duration: 'Target ethanol 100-150 mg/dL',
        notes: 'Alternative when fomepizole unavailable. Difficult to titrate. Higher error/adverse event rate.',
      },
      monitoring: 'Ethanol level Q1H initially, then Q2-4H once stable. Glucose Q2H.',
    },
    next: 'tox-alc-dialysis',
    summary: 'Ethanol alternative if fomepizole unavailable — 0.8 g/kg load, target 100-150 mg/dL; harder to manage, more adverse events',
    safetyLevel: 'warning',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 5: Hemodialysis
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tox-alc-dialysis',
    type: 'question',
    module: 5,
    title: 'Hemodialysis Indications',
    body: '**EXTRIP guidelines for hemodialysis [1][4]:**\n\n**METHANOL — Dialysis recommended if:**\n• Methanol >70 mg/dL (or >50 mg/dL with severe acidosis)\n• Vision changes\n• Coma or seizures\n• Renal dysfunction\n• Severe metabolic acidosis despite treatment\n\n**ETHYLENE GLYCOL — Dialysis recommended if:**\n• EG >310 mg/dL (even with fomepizole)\n• Severe metabolic acidosis\n• Renal dysfunction\n• End-organ damage\n\n**ISOPROPANOL:**\n• Generally NOT indicated (acetone not toxic)\n• Consider only if: persistent hypotension, serum level >500 mg/dL\n\n**Dialysis modality:**\n• Intermittent HD preferred (more efficient)\n• CRRT acceptable if hemodynamically unstable\n• Use high-flux, large surface area dialyzer\n\nDoes the patient meet dialysis criteria?',
    citation: [1, 4],
    calculatorLinks: [{ id: 'tox-alc-dialysis-criteria', label: 'Dialysis Criteria' }],
    options: [
      { label: 'Yes — meets dialysis criteria', description: 'Consult nephrology urgently', next: 'tox-alc-dialysis-info', urgency: 'critical' },
      { label: 'No — fomepizole alone may suffice', description: 'Continue fomepizole, close monitoring', next: 'tox-alc-cofactors' },
      { label: 'Borderline — unsure', description: 'Consult toxicology and/or nephrology', next: 'tox-alc-dialysis-info', urgency: 'urgent' },
    ],
    summary: 'HD for methanol >50-70 mg/dL or vision/coma; EG >310 or renal failure; isopropanol rarely needs HD',
    safetyLevel: 'warning',
  },
  {
    id: 'tox-alc-dialysis-info',
    type: 'info',
    module: 5,
    title: 'Hemodialysis Protocol',
    body: '**Dialysis setup:**\n• High-flux dialyzer with surface area >2.1 m²\n• Blood flow 300-400 mL/min\n• Dialysate flow 500-800 mL/min\n• Bicarbonate dialysate for acidosis\n\n**Duration:**\n• Continue until toxic alcohol level undetectable\n• Minimum 4-6 hours typically needed\n• Methanol especially requires prolonged HD (formate removal)\n\n**Monitoring during HD:**\n• Toxic alcohol level Q2-4H during dialysis\n• pH/bicarbonate Q2-4H\n• Adjust fomepizole dosing (see previous node)\n\n**Endpoints:**\n• Toxic alcohol undetectable or <10 mg/dL\n• pH normalized\n• Symptoms resolving\n\n**Post-dialysis rebound:**\n• May see level increase 4-6 hours after HD (redistribution)\n• Check level 2-4 hours post-HD\n• May need additional HD session',
    citation: [1, 4],
    next: 'tox-alc-cofactors',
    summary: 'High-flux HD 4-6+ hours until level undetectable; watch for post-HD rebound; check level 2-4h after completion',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 6: Cofactor Therapy
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tox-alc-cofactors',
    type: 'info',
    module: 6,
    title: 'Cofactor Therapy',
    body: '**Cofactors enhance metabolism of toxic metabolites:**\n\n**METHANOL:**\n• **[Folic acid](#/drug/folic-acid/methanol)** 50 mg IV Q4-6H (max 50 mg/dose)\n• OR **[Folinic acid (leucovorin)](#/drug/leucovorin/methanol)** 1-2 mg/kg IV Q4-6H (max 50 mg/dose)\n• **Mechanism:** Enhances formate → CO₂ + H₂O conversion via tetrahydrofolate pathway [1][3]\n• Continue until methanol <20 mg/dL\n\n**ETHYLENE GLYCOL:**\n• **[Thiamine](#/drug/thiamine/eg)** 100 mg IV Q6H\n• **[Pyridoxine (B6)](#/drug/pyridoxine/eg)** 100 mg IV Q6H\n• **Mechanism:** Shunt glyoxylic acid away from oxalic acid toward glycine and alpha-hydroxy-beta-ketoadipate [1][2]\n• Reduces nephrotoxicity from calcium-oxalate precipitation\n\n**ALCOHOLIC PATIENTS (risk of Wernicke):**\n• High-dose thiamine: 200-500 mg IV Q8H × 72+ hours\n• Give BEFORE glucose (risk of precipitating Wernicke)',
    citation: [1, 2, 3],
    treatment: {
      firstLine: {
        drug: 'Folic Acid (methanol)',
        dose: '50 mg',
        route: 'IV',
        frequency: 'Q4-6H',
        duration: 'Until methanol <20 mg/dL',
        notes: 'Enhances formate metabolism. Use for methanol specifically.',
      },
      alternative: {
        drug: 'Thiamine + Pyridoxine (EG)',
        dose: '100 mg each',
        route: 'IV',
        frequency: 'Q6H',
        duration: 'Until EG cleared',
        notes: 'Shunts glyoxylic acid away from oxalate formation.',
      },
      monitoring: 'Toxic alcohol levels. Renal function for EG.',
    },
    next: 'tox-alc-bicarb',
    summary: 'Methanol: folic acid 50mg IV Q4-6H; EG: thiamine 100mg + pyridoxine 100mg IV Q6H; alcoholics: high-dose thiamine 200-500mg Q8H',
  },
  {
    id: 'tox-alc-bicarb',
    type: 'info',
    module: 6,
    title: 'Sodium Bicarbonate Therapy',
    body: '**Sodium bicarbonate** for severe metabolic acidosis [1]:\n\n**Indications:**\n• pH <7.3 (especially <7.1)\n• Severe symptomatic acidosis\n• Bridging therapy while awaiting dialysis\n\n**Rationale:**\n• **Formic acid** (methanol metabolite) is more toxic in acidic environment\n• Alkalinization increases proportion of ionized formate (less CNS penetration)\n• May be neuroprotective in methanol toxicity [1][3]\n\n**Dosing:**\n• 1-2 mEq/kg IV bolus for pH <7.1\n• Infusion: 150 mEq NaHCO₃ in 1L D5W at maintenance rate\n• Target pH >7.3 (some suggest >7.45 for methanol)\n\n**Monitoring:**\n• ABG/VBG Q2-4H\n• Serum sodium (avoid >155)\n• Serum potassium (bicarbonate shifts K+ intracellularly)\n\n**Caution:** Bicarbonate alone does not treat the underlying toxicity — it\'s supportive.',
    citation: [1, 3],
    next: 'tox-alc-monitoring',
    summary: 'Bicarbonate for pH <7.3; target pH >7.3-7.45; alkalinization reduces formic acid CNS penetration in methanol',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 7: Monitoring & Response
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tox-alc-monitoring',
    type: 'info',
    module: 7,
    title: 'Ongoing Monitoring',
    body: '**Monitoring during treatment:**\n\n**Labs:**\n• Toxic alcohol levels Q4-6H (Q2H during dialysis)\n• ABG/VBG Q4-6H (Q2H if severely acidotic)\n• BMP Q4-6H (creatinine for EG, bicarbonate)\n• Ionized calcium Q6H (if EG)\n• Osmolality Q6H (track osmolar gap closure)\n\n**Clinical monitoring:**\n• Visual acuity Q4-6H if methanol\n• Fundoscopic exam Q12H if methanol\n• Urine output (AKI marker in EG)\n• Mental status\n• Hemodynamics\n\n**Treatment endpoints:**\n• Toxic alcohol level undetectable or <20 mg/dL\n• Normal pH (>7.35)\n• No end-organ symptoms\n• Closing osmolar and anion gaps\n\n**When to stop fomepizole:**\n• Above criteria met AND\n• Patient asymptomatic for 12-24 hours',
    citation: [1, 4],
    next: 'tox-alc-response',
    summary: 'Levels Q4-6H, VBG Q4-6H, visual acuity Q4-6H for methanol; endpoints: level <20, pH normal, no symptoms',
  },
  {
    id: 'tox-alc-response',
    type: 'question',
    module: 7,
    title: 'Treatment Response',
    body: '**Assess response to treatment:**\n\n**Good response:**\n• pH improving or normalized\n• Toxic alcohol level decreasing\n• No new or worsening symptoms\n• Osmolar gap closing\n\n**Poor response / Complications:**\n• Persistent or worsening acidosis\n• New vision changes (methanol)\n• Developing renal failure (EG)\n• Hemodynamic instability\n\nHow is the patient responding?',
    citation: [1, 4],
    options: [
      { label: 'Good response — improving', description: 'Continue current therapy', next: 'tox-alc-dispo' },
      { label: 'Poor response — worsening', description: 'Escalate therapy or consult toxicology', next: 'tox-alc-escalate', urgency: 'critical' },
      { label: 'Methanol — new vision changes', description: 'Urgent ophthalmology + maximize therapy', next: 'tox-alc-vision', urgency: 'critical' },
    ],
    summary: 'Good response: pH improving, levels decreasing; poor response: persistent acidosis, new vision/renal symptoms',
  },
  {
    id: 'tox-alc-vision',
    type: 'info',
    module: 7,
    title: 'Vision Changes — Emergent Ophthalmology',
    body: '**New or worsening vision changes indicate active formate toxicity to retina/optic nerve**\n\n**Immediate actions:**\n1. **Urgent ophthalmology consult** — document visual acuity, fundoscopic exam\n2. **Maximize dialysis** — if not already on HD, start immediately\n3. **Confirm fomepizole dosing** adequate (Q4H during HD)\n4. **Push pH >7.45** with bicarbonate — reduces formate toxicity\n5. **Maximize folic acid** — ensure receiving 50 mg Q4-6H\n\n**Findings on fundoscopy:**\n• **Early:** Optic disc hyperemia, blurred disc margins\n• **Late:** Optic disc pallor, atrophy (irreversible)\n\n**Prognosis:**\n• Visual recovery possible if treatment initiated before irreversible damage\n• Poor prognostic signs: pH <7.0, GCS <8, formate level >2.3 mmol/L [3]\n\n**Document baseline and serial visual acuity** — medicolegal importance.',
    citation: [3],
    next: 'tox-alc-dispo',
    summary: 'Vision changes = active retinal toxicity; urgent ophthalmology, maximize HD, push pH >7.45, max folic acid',
    safetyLevel: 'critical',
  },
  {
    id: 'tox-alc-escalate',
    type: 'info',
    module: 7,
    title: 'Escalation for Poor Response',
    body: '**If patient not responding to standard therapy:**\n\n**Check the basics:**\n• Is fomepizole dosing adequate? (Q12H normally, Q4H during HD)\n• Is dialysis effective? (check clearance, blood flow)\n• Any co-ingestions? (check ethanol, aspirin, acetaminophen)\n\n**Escalation options:**\n1. **Continuous renal replacement therapy (CRRT)** if hemodynamically unstable\n2. **Prolonged dialysis** — some patients need 12+ hours\n3. **ICU admission** if not already\n4. **Toxicology consultation** if not already involved\n\n**Consult toxicology (Poison Control: 1-800-222-1222):**\n• Regional poison center available 24/7\n• Can guide complex cases\n• May have access to drug levels not available locally\n\n**Poor prognostic factors:**\n• Presentation >24h after ingestion\n• pH <7.0 on arrival\n• Coma or seizures\n• Very high formate level (methanol)',
    citation: [1, 4],
    next: 'tox-alc-dispo',
    summary: 'Check fomepizole dosing and dialysis adequacy; consider CRRT if unstable; call Poison Control 1-800-222-1222',
    safetyLevel: 'warning',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 8: Disposition
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tox-alc-dispo',
    type: 'question',
    module: 8,
    title: 'Disposition',
    body: '**Psychiatric evaluation is MANDATORY** for all intentional ingestions after medical clearance.\n\n**Key considerations:**\n• **Methanol and EG:** Always admit — even asymptomatic patients can deteriorate (biphasic toxicity)\n• **Isopropanol:** May observe and discharge if asymptomatic 6+ hours, mild ingestion\n• **Propylene glycol:** ICU admission typically (iatrogenic, already critical)\n\nWhat is the patient\'s disposition?',
    citation: [1],
    options: [
      { label: 'ICU admission', description: 'Any dialysis, acidosis, end-organ damage, or instability', next: 'tox-alc-icu', urgency: 'critical' },
      { label: 'Monitored bed', description: 'Stable but requires ongoing observation/fomepizole', next: 'tox-alc-monitored' },
      { label: 'Discharge candidate', description: 'Isopropanol only, asymptomatic 6+ hours', next: 'tox-alc-discharge' },
    ],
    summary: 'Always admit methanol/EG (biphasic); isopropanol may observe 6h; psych eval mandatory for intentional',
    safetyLevel: 'warning',
  },
  {
    id: 'tox-alc-icu',
    type: 'result',
    module: 8,
    title: 'ICU Admission',
    body: '**ICU admission criteria:**\n• Any hemodialysis requirement\n• Severe metabolic acidosis (pH <7.25)\n• Altered mental status\n• Hemodynamic instability\n• Visual symptoms (methanol)\n• Renal failure (ethylene glycol)\n• On fomepizole infusion\n\n**ICU monitoring:**\n• Continuous telemetry\n• Arterial line if hemodynamically unstable\n• Serial toxic alcohol levels Q4-6H\n• ABG/VBG Q4-6H until normalized\n• Visual acuity checks Q4-6H (methanol)\n• Strict I/Os\n\n**Continue until:**\n• Toxic alcohol undetectable\n• pH normalized >24 hours\n• No residual end-organ dysfunction\n• Psych cleared (if intentional)\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'ICU admission with continuous monitoring. Continue fomepizole ± dialysis until toxic alcohol undetectable and pH normal.',
    confidence: 'definitive',
    citation: [1],
  },
  {
    id: 'tox-alc-monitored',
    type: 'result',
    module: 8,
    title: 'Monitored Bed — Observation',
    body: '**Monitored bed criteria:**\n• Stable hemodynamics\n• Mild/moderate acidosis (pH >7.25)\n• On fomepizole but no dialysis needed\n• Improving trend\n\n**Monitoring protocol:**\n• Continuous telemetry\n• Vitals Q2H\n• Toxic alcohol levels Q6H\n• ABG/VBG Q6H\n• Visual acuity Q6H (if methanol)\n• BMP Q12H\n\n**Escalate to ICU if:**\n• Worsening acidosis\n• New visual symptoms\n• Developing renal failure\n• Hemodynamic instability\n\n**Duration:**\n• Minimum 24-48 hours\n• Until toxic alcohol undetectable and clinically stable\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'Monitored bed with telemetry. Serial labs. Escalate to ICU if any deterioration.',
    confidence: 'recommended',
    citation: [1],
  },
  {
    id: 'tox-alc-discharge',
    type: 'result',
    module: 8,
    title: 'Discharge Criteria (Isopropanol Only)',
    body: '**Safe for discharge ONLY if ALL criteria met:**\n\n**Applies to ISOPROPANOL only** — never discharge methanol or EG [1][5]\n\n• Confirmed isopropanol (not methanol/EG)\n• Asymptomatic for ≥6 hours\n• Normal vital signs\n• Normal mental status (back to baseline)\n• Normal anion gap (ketosis ok, acidosis not)\n• Tolerating PO\n• Safe social situation\n• Psychiatric clearance (if intentional ingestion)\n\n**Before discharge:**\n• Document lethal means counseling\n• Counsel on securing household chemicals\n• Ensure psychiatric follow-up arranged (intentional)\n• Return precautions for altered mental status, respiratory difficulty\n\n**NEVER discharge methanol or ethylene glycol from ED** — biphasic toxicity means they can look fine then deteriorate.\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'Discharge with psychiatric clearance after 6+ hours asymptomatic observation. Isopropanol ONLY — never discharge methanol/EG.',
    confidence: 'consider',
    citation: [1, 5],
  },
];

export const TOXIC_ALCOHOLS_NODE_COUNT = TOXIC_ALCOHOLS_NODES.length;

export const TOXIC_ALCOHOLS_MODULE_LABELS = [
  'Recognition & Initial Assessment',
  'Identification — Which Toxic Alcohol?',
  'Diagnostic Workup',
  'Antidote Therapy',
  'Hemodialysis',
  'Cofactor Therapy',
  'Monitoring & Response',
  'Disposition',
];

export const TOXIC_ALCOHOLS_CRITICAL_ACTIONS = [
  { text: 'Calculate osmolar gap: Measured - (2[Na] + glucose/18 + BUN/2.8 + EtOH/4.6); >10 suggests toxic alcohol', nodeId: 'tox-alc-workup' },
  { text: 'Fomepizole 15 mg/kg IV load for methanol or EG — blocks alcohol dehydrogenase', nodeId: 'tox-alc-fomepizole' },
  { text: 'Fomepizole Q4H during hemodialysis (auto-induces metabolism)', nodeId: 'tox-alc-fome-dialysis' },
  { text: 'Dialysis for methanol >50-70 mg/dL, vision changes, or severe acidosis', nodeId: 'tox-alc-dialysis' },
  { text: 'Dialysis for ethylene glycol >310 mg/dL or renal failure', nodeId: 'tox-alc-dialysis' },
  { text: 'Folic acid 50 mg IV Q4-6H for methanol (enhances formate metabolism)', nodeId: 'tox-alc-cofactors' },
  { text: 'Thiamine 100 mg + Pyridoxine 100 mg IV Q6H for ethylene glycol (reduces oxalate)', nodeId: 'tox-alc-cofactors' },
  { text: 'Isopropanol: supportive care only — fomepizole NOT indicated (acetone not toxic)', nodeId: 'tox-alc-isopropanol-tx' },
  { text: 'Bicarbonate for pH <7.3; push pH >7.45 for methanol (reduces formate toxicity)', nodeId: 'tox-alc-bicarb' },
  { text: 'Visual symptoms = active formate toxicity — urgent ophthalmology + maximize dialysis', nodeId: 'tox-alc-vision' },
  { text: 'NEVER discharge methanol or EG — biphasic toxicity, can deteriorate after looking well', nodeId: 'tox-alc-discharge' },
];

export const TOXIC_ALCOHOLS_CITATIONS: Citation[] = [
  { num: 1, text: 'Kraut JA, Kurtz I. Toxic alcohol ingestions: clinical features, diagnosis, and management. Clin J Am Soc Nephrol. 2008;3(1):208-225.' },
  { num: 2, text: 'Barceloux DG, Krenzelok EP, Olson K, Watson W. American Academy of Clinical Toxicology practice guidelines on the treatment of ethylene glycol poisoning. J Toxicol Clin Toxicol. 1999;37(5):537-560.' },
  { num: 3, text: 'Barceloux DG, Bond GR, Krenzelok EP, et al. American Academy of Clinical Toxicology practice guidelines on the treatment of methanol poisoning. J Toxicol Clin Toxicol. 2002;40(4):415-446.' },
  { num: 4, text: 'Brent J, McMartin K, Phillips S, et al. Fomepizole for the treatment of ethylene glycol poisoning. N Engl J Med. 1999;340(11):832-838.' },
  { num: 5, text: 'Slaughter RJ, Mason RW, Beasley DM, et al. Isopropanol poisoning. Clin Toxicol. 2014;52(5):470-478.' },
  { num: 6, text: 'Zar T, Graeber C, Perazella MA. Recognition, treatment, and prevention of propylene glycol toxicity. Semin Dial. 2007;20(3):217-219.' },
];
