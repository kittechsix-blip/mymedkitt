// MedKitt - Dexmedetomidine (Precedex) Drug Protocol
// Indications -> Loading & Bolus -> Maintenance & Titration -> Adverse Events & Hemodynamic Management -> Special Populations & Wean
// 5 modules, 24 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const DEXMEDETOMIDINE_CRITICAL_ACTIONS = [
  { text: 'Skip the loading dose in non-airway patients (30% hypotension rate)', nodeId: 'dex-loading' },
  { text: 'Maintenance: 0.2-0.7 mcg/kg/hr IV, titrate q15-30min to RASS -1 to -2', nodeId: 'dex-maintenance' },
  { text: 'Bradycardia <50 + symptomatic: hold dose, atropine 0.5 mg IV', nodeId: 'dex-bradycardia' },
  { text: 'Hypotension: optimize volume + push-dose pressor BEFORE reducing dex rate', nodeId: 'dex-hypotension' },
  { text: 'NOT monotherapy for alcohol withdrawal - must add benzos for seizure prophylaxis', nodeId: 'dex-etoh-withdrawal' },
  { text: 'Taper by 50% q12h after >24h use to prevent rebound HTN/agitation/tachycardia', nodeId: 'dex-wean' },
  { text: 'No reversal agent exists - stop infusion (t1/2 = 2h) and provide supportive care', nodeId: 'dex-reversal' },
];

export const DEXMEDETOMIDINE_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INDICATIONS & PATIENT SELECTION
  // =====================================================================

  {
    id: 'dex-start',
    type: 'question',
    module: 1,
    title: 'Dexmedetomidine (Precedex) - Indications',
    body: '**Dexmedetomidine Summary**\n\n**Class:** Selective central α2-adrenergic agonist (8x more selective for α2 vs α1 than clonidine).\n\n**Mechanism:** Reduces presynaptic norepinephrine release in the locus coeruleus → sedation, anxiolysis, and analgesia WITHOUT respiratory depression. [1][2]\n\n**Key advantages over propofol/midazolam:** [1][3]\n- No respiratory depression — safe in non-intubated patients\n- Patient remains arousable and cooperative (RASS 0 to -3)\n- Some intrinsic analgesic effect (reduces opioid requirement ~30%)\n- Reduces delirium incidence vs benzodiazepines (PADIS 2018, SPICE III 2019)\n\n**Key disadvantages:** [1][2]\n- HYPOTENSION (30%) and BRADYCARDIA (14%) are the dose-limiting toxicities\n- Slow onset (~15 min) — NOT a first-line agent for crashing/agitated patients\n- No reversal agent (atipamezole is veterinary-only)\n- Expensive compared to propofol/midazolam\n\nWhat is the clinical scenario?',
    citation: [1, 2, 3],
    options: [
      {
        label: 'ICU sedation post-intubation',
        description: 'Light sedation (RASS 0 to -2) in mechanically ventilated patient',
        next: 'dex-icu-sedation',
      },
      {
        label: 'Alcohol/benzo withdrawal adjunct',
        description: 'CIWA >15 despite benzos, autonomic hyperactivity',
        next: 'dex-etoh-withdrawal',
        urgency: 'urgent',
      },
      {
        label: 'Procedural sedation (cooperative adult)',
        description: 'Awake fiberoptic, MRI, mild procedure in fragile patient',
        next: 'dex-procedural',
      },
      {
        label: 'Pediatric procedural sedation',
        description: 'Off-label IN or IV for cooperative cooperative procedures',
        next: 'dex-pediatric',
      },
      {
        label: 'Ventilator wean / pre-extubation',
        description: 'Transition from propofol while preserving respiratory drive',
        next: 'dex-vent-wean',
      },
    ],

    summary: 'Selective α2 agonist — sedation without respiratory depression but watch for HOTN (30%) and brady (14%)',
    safetyLevel: 'warning',
  },

  {
    id: 'dex-icu-sedation',
    type: 'info',
    module: 1,
    title: 'ICU Sedation - Mechanically Ventilated',
    body: '**Evidence:** [3][4]\n- **MIDEX/PRODEX (Jakob 2012, JAMA):** Dexmedetomidine non-inferior to midazolam and propofol for light sedation, with shorter time to extubation and reduced delirium.\n- **SPICE III (Shehabi 2019, NEJM):** Early dexmedetomidine vs usual care showed NO mortality difference but reduced delirium and faster extubation in select subgroups.\n- **PADIS 2018 (SCCM):** Suggests dexmedetomidine OR propofol over benzodiazepines for ventilated adults.\n\n**Best ICU indication:** [1][3]\n- Target RASS 0 to -2 (light sedation, arousable)\n- Cardiac surgery patients (preserves hemodynamics in low-output states)\n- Delirium-prone patients (elderly, history of delirium)\n- Anticipated extubation within 24h\n\n**Avoid as primary sedative in:** [1]\n- Crashing/agitated patient needing rapid deep sedation (use propofol first)\n- Profound shock requiring high-dose vasopressors\n- Severe bradycardia or AV block at baseline\n\n**Dosing approach:** Skip loading, start maintenance 0.2 mcg/kg/hr, titrate slowly.',
    citation: [1, 3, 4],
    next: 'dex-loading',

    summary: 'PADIS 2018 + SPICE III: dex over benzos for ventilated adults, target RASS 0 to -2, reduces delirium and extubation time',
    skippable: true,
  },

  {
    id: 'dex-etoh-withdrawal',
    type: 'info',
    module: 1,
    title: 'Alcohol Withdrawal - ADJUNCT Only',
    body: '**CRITICAL: Dexmedetomidine is NEVER monotherapy for alcohol withdrawal.** [5][6]\n\n**Why:** Dex suppresses sympathetic outflow (tremor, tachycardia, hypertension) but does NOT prevent withdrawal seizures or delirium tremens. Benzos remain first-line for seizure prophylaxis. [5]\n\n**Evidence:**\n- **DahLIA trial (Reade 2018, JAMA):** Dexmedetomidine reduced agitation and ICU LOS in severe alcohol withdrawal, but all patients received concurrent benzos.\n- Multiple cohorts show dex reduces benzo requirements ~50% but does NOT replace them.\n\n**When to add dex to benzo regimen:** [5][6]\n- CIWA-Ar >15 despite escalating benzo doses\n- Persistent tachycardia/HTN/diaphoresis on adequate benzos\n- Need to avoid further benzo-induced respiratory depression\n- Benzo-refractory agitation\n\n**Dosing for alcohol withdrawal:** [5]\n- Start 0.2 mcg/kg/hr, titrate to RASS -1 to 0\n- Continue concurrent benzo per CIWA protocol\n- Do NOT load (worsens hypotension in volume-depleted patients)\n\n**Watch for:** Profound bradycardia in volume-depleted alcoholic patients. Resuscitate first.',
    citation: [5, 6],
    next: 'dex-loading',

    summary: 'ADJUNCT ONLY for EtOH withdrawal — never replaces benzos, reduces benzo req ~50%, start 0.2 mcg/kg/hr',
    safetyLevel: 'critical',
  },

  {
    id: 'dex-procedural',
    type: 'info',
    module: 1,
    title: 'Procedural Sedation - Cooperative Adult',
    body: '**Best procedural indications:** [7][8]\n- **Awake fiberoptic intubation** (gold standard — preserves airway reflexes and respiratory drive)\n- MRI in claustrophobic/anxious adults\n- Sedation for non-painful procedures in hemodynamically fragile patients\n- Bridge sedation in agitated patient awaiting CT/MRI clearance for definitive sedation\n\n**Why dex for these:** [7]\n- Patient remains arousable and cooperative\n- No respiratory depression (huge for awake fiberoptic)\n- Reduces opioid requirement during the procedure\n\n**LIMITATIONS for ED procedural sedation:** [7][8]\n- Slow onset (10-15 min loading + 15-30 min maintenance titration)\n- NOT appropriate for painful procedures alone (limited analgesia — add opioids)\n- NOT first-line for short procedures (laceration, abscess I&D, joint reduction) — ketamine/propofol faster\n- Cumulative hypotension/bradycardia with each redose\n\n**Procedural dosing:**\n- Loading dose: 1 mcg/kg IV over 10 minutes\n- Maintenance: 0.2-0.7 mcg/kg/hr titrated to effect\n- Pre-treat with 250-500 mL crystalloid to mitigate hypotension',
    citation: [7, 8],
    next: 'dex-loading',

    summary: 'Awake fiberoptic = gold standard indication; SLOW for short ED procedures, NOT good analgesia alone',
    skippable: true,
  },

  {
    id: 'dex-pediatric',
    type: 'info',
    module: 1,
    title: 'Pediatric Procedural Sedation',
    body: '**FDA-approved adult only — pediatric use is OFF-LABEL** but widely supported by evidence. [9][10]\n\n**Intranasal (IN) dexmedetomidine:** [9]\n- **Dose:** 2-4 mcg/kg IN (divide between nostrils)\n- **Onset:** 15-25 minutes\n- **Duration:** 60-90 minutes\n- **Best indications:** MRI, CT, echo, EEG, non-painful procedures\n- **Evidence:** Mason et al, Pediatric Anesthesia 2011 — 92% success rate for MRI sedation\n- **Bioavailability:** 65-85% (vs ~5% PO)\n\n**IV pediatric dosing:** [10]\n- Loading: 0.5-1 mcg/kg over 10 min\n- Maintenance: 0.2-0.7 mcg/kg/hr\n- Bradycardia and hypotension more common than adults at equivalent weight-based doses\n\n**Buccal/sublingual:**\n- Dose 1-2 mcg/kg, onset 30 min — useful when IN tolerance poor\n\n**Pediatric advantages:** [9][10]\n- No respiratory depression — major safety advantage for non-intubated kids\n- Easier than IM ketamine (no needle for IN route)\n- Less paradoxical agitation than midazolam\n- Reduces emergence delirium when combined with anesthesia\n\n**Pediatric red flags:**\n- Congenital heart disease with depressed contractility\n- Active beta-blocker therapy\n- Age <1 month (limited data, hemodynamic vulnerability)',
    citation: [9, 10],
    next: 'dex-loading',

    summary: 'IN 2-4 mcg/kg for kids = MRI/CT gold standard, 92% success, no resp depression — avoid in CHD with low CO',
    skippable: true,
    treatment: {
      firstLine: {
        drug: 'Dexmedetomidine (pediatric)',
        dose: 'IN 2-4 mcg/kg, divided between nostrils',
        route: 'Intranasal',
        frequency: 'Single dose',
        duration: '60-90 min sedation',
        notes: 'IV alternative: 0.5-1 mcg/kg load + 0.2-0.7 mcg/kg/hr maintenance',
        confidence: 'standard',
      },
      monitoring: 'Continuous SpO2, BP, HR. Watch for bradycardia (more common in peds).',
    },
  },

  {
    id: 'dex-vent-wean',
    type: 'info',
    module: 1,
    title: 'Ventilator Wean / Pre-Extubation',
    body: '**Excellent indication for dex.** [3][11]\n\n**Why dex during wean:**\n- Preserves respiratory drive (no resp depression)\n- Allows light sedation while patient breathes spontaneously on PSV/CPAP\n- Reduces delirium during the wean period\n- Faster extubation vs midazolam (MIDEX trial)\n\n**Transition protocol from propofol or midazolam:** [3][11]\n1. Start dex at 0.4 mcg/kg/hr (no load)\n2. Wait 30 minutes for steady-state effect\n3. Reduce primary sedative by 25-50%\n4. Titrate dex up by 0.1-0.2 mcg/kg/hr q15-30min until target RASS\n5. Discontinue primary sedative when dex at therapeutic rate\n6. Continue dex through extubation and 4-6h after\n\n**Post-extubation:** [3]\n- Continuing dex 4-6h post-extubation reduces re-intubation in select patients\n- Allows patient to remain calm, oriented, cooperative\n- Particularly useful in cardiac surgery, head trauma, anxious patients\n\n**Wean dex itself:**\n- After patient stable post-extubation: reduce by 0.1 mcg/kg/hr q2h\n- Stop when patient calm without sedation\n- See Module 5 for full wean protocol',
    citation: [3, 11],
    next: 'dex-loading',

    summary: 'Bridge from propofol/midazolam to extubation — preserves resp drive, continue 4-6h post-extub in fragile patients',
    skippable: true,
  },

  // =====================================================================
  // MODULE 2: LOADING DOSE & BOLUS STRATEGY
  // =====================================================================

  {
    id: 'dex-loading',
    type: 'question',
    module: 2,
    title: 'Loading Dose - To Load or Not to Load',
    body: '**FDA label says load. ED reality often says skip.** [1][2][12]\n\n**FDA-labeled loading dose:**\n- **1 mcg/kg IV over 10 minutes**\n- Reaches steady-state plasma concentration in ~15 minutes\n- Theoretical rationale: faster sedation onset\n\n**The problem with loading:** [1][12]\n- **30% incidence of hypotension** during the load (vs 15% with maintenance-only)\n- **14% bradycardia**, can be severe (HR <40)\n- **Paradoxical hypertension** during the load (α1 activation at high concentrations) — particularly worrying in older patients with vascular disease\n- The "fast onset" benefit is usually irrelevant in the ED setting\n\n**When IS loading appropriate:** [7][12]\n- **Awake fiberoptic intubation** — need rapid onset to prevent gag/cough during airway manipulation\n- **Procedural sedation** where 15-20 min of onset matters (MRI cooperation in 5 min vs 30 min)\n- Hemodynamically robust patient with anticipated short procedure\n\n**When to SKIP loading (most ED uses):** [1][12]\n- ICU sedation (no rush — start maintenance)\n- Alcohol withdrawal adjunct (volume-depleted patient)\n- Any patient with baseline hypotension, bradycardia, or significant cardiac disease\n- Elderly (>65) — slower titration always wins\n\nWhat is your clinical scenario?',
    citation: [1, 2, 7, 12],
    options: [
      {
        label: 'Awake fiberoptic intubation - LOAD',
        description: 'Need rapid onset for airway manipulation',
        next: 'dex-load-yes',
      },
      {
        label: 'ICU/alcohol withdrawal - SKIP LOAD',
        description: 'Start maintenance only - avoid hemodynamic hit',
        next: 'dex-maintenance',
      },
      {
        label: 'Procedural sedation - REDUCED LOAD',
        description: 'Half the standard load (0.5 mcg/kg) over 10 min',
        next: 'dex-load-reduced',
      },
    ],

    summary: 'FDA says load 1 mcg/kg over 10min — ED reality: skip for ICU/EtOH, half-load for procedures, full only for awake fiberoptic',
    safetyLevel: 'warning',
  },

  {
    id: 'dex-load-yes',
    type: 'info',
    module: 2,
    title: 'Full Loading Dose Protocol',
    body: '**Standard loading dose:** [1][2]\n\n**1 mcg/kg IV over 10 minutes**\n\n**Preparation:**\n- Dexmedetomidine stock: 100 mcg/mL (200 mcg/2 mL vial)\n- Standard dilution: 200 mcg in 50 mL NS = **4 mcg/mL**\n- For 70 kg patient: 70 mcg load = 17.5 mL of 4 mcg/mL over 10 min (105 mL/hr pump rate)\n\n**During the load (continuous monitoring):**\n- BP cycle q1-2 minutes\n- Continuous cardiac monitor\n- Continuous SpO2\n- Have atropine 0.5 mg + IV fluids at bedside\n\n**Stop the load and re-evaluate if:**\n- HR drops below 50 (or 20% below baseline)\n- SBP drops below 90 (or 30% below baseline)\n- MAP drops below 65\n- Paradoxical HTN with SBP >180 or MAP >120 (slow the rate)\n\n**Pre-load fluid bolus:** [12]\n- Give 500 mL crystalloid prior to loading dose\n- Reduces hypotension incidence by ~50% in fluid-responsive patients\n- POCUS-guided if uncertain volume status\n\n**Onset:**\n- Sedative effect: 5-10 minutes after start of load\n- Peak effect: 15-20 minutes (5-10 min post-load completion)',
    citation: [1, 2, 12],
    next: 'dex-maintenance',

    summary: 'Full load = 1 mcg/kg over 10 min, pre-treat with 500mL crystalloid, monitor BP q1-2min, atropine ready',
    safetyLevel: 'warning',
    treatment: {
      firstLine: {
        drug: 'Dexmedetomidine (loading)',
        dose: '1 mcg/kg IV over 10 minutes',
        route: 'IV infusion',
        frequency: 'Single dose',
        duration: '10 minutes',
        notes: 'Standard dilution 4 mcg/mL. Pre-treat with 500mL crystalloid.',
        confidence: 'caution',
      },
      monitoring: 'Continuous BP q1-2min, cardiac monitor, SpO2. Atropine 0.5mg + IV fluids at bedside. STOP if HR<50, SBP<90, or MAP<65.',
    },
  },

  {
    id: 'dex-load-reduced',
    type: 'info',
    module: 2,
    title: 'Reduced Loading Dose (0.5 mcg/kg)',
    body: '**For procedural sedation in fragile patients or elderly.** [7][12]\n\n**Dose:** 0.5 mcg/kg IV over 10 minutes\n\n**Rationale:**\n- Half the hypotension risk of full load\n- Still achieves clinically useful 10-15 min onset\n- Particularly useful in elderly (>65), small adults, mild cardiac disease\n\n**Preparation (70 kg patient):**\n- 35 mcg load = 8.75 mL of 4 mcg/mL over 10 min (52.5 mL/hr pump rate)\n\n**Monitoring during load:**\n- Same vigilance as full load (BP q1-2 min, cardiac monitor)\n- Lower threshold to stop and switch to maintenance-only\n\n**After reduced load:**\n- Start maintenance 0.2-0.4 mcg/kg/hr\n- Titrate slowly q15-30 minutes\n- May need slightly longer procedural window than full-load protocol\n\n**Alternative: NO load + early maintenance:**\n- Skip load entirely\n- Start maintenance at 0.7 mcg/kg/hr\n- Reduce to 0.4-0.5 mcg/kg/hr once at target\n- Trades 10 min of additional onset time for avoided hemodynamic hit',
    citation: [7, 12],
    next: 'dex-maintenance',

    summary: 'Reduced load 0.5 mcg/kg = half HOTN risk, still 10-15 min onset — best for elderly/fragile procedural patients',
  },

  // =====================================================================
  // MODULE 3: MAINTENANCE INFUSION & TITRATION
  // =====================================================================

  {
    id: 'dex-maintenance',
    type: 'info',
    module: 3,
    title: 'Maintenance Infusion - Starting Rate',
    body: '**Standard maintenance dose:** [1][2]\n\n**0.2-0.7 mcg/kg/hr IV continuous infusion**\n\n**Starting rate by scenario:** [1][3][5]\n- **Light ICU sedation (RASS 0 to -1):** Start 0.2 mcg/kg/hr\n- **Standard ICU sedation (RASS -1 to -2):** Start 0.4 mcg/kg/hr\n- **Deep sedation needs (RASS -2 to -3):** Start 0.4 mcg/kg/hr (max effect at 0.7-1.5)\n- **Alcohol withdrawal:** Start 0.2 mcg/kg/hr\n- **Pediatric:** Start 0.2-0.3 mcg/kg/hr\n\n**Pharmacokinetics:** [1][2]\n- **Onset (no load):** 15-30 minutes to therapeutic effect\n- **Steady state:** 60-90 minutes without load, 15-20 minutes with load\n- **Elimination half-life:** 2-3 hours\n- **Hepatic metabolism (CYP450 + glucuronidation)** — reduce dose 50% in severe hepatic impairment\n\n**Standard concentration:** 4 mcg/mL (200 mcg in 50 mL NS)\n- For 70 kg patient at 0.4 mcg/kg/hr: 28 mcg/hr = **7 mL/hr** pump rate\n\n**Off-label upper range:**\n- Up to 1.5 mcg/kg/hr in tolerant patients (chronic ICU, alcohol withdrawal)\n- Higher rates linearly increase hypotension/bradycardia risk\n- If patient needs >1.5 mcg/kg/hr to maintain target RASS, ADD adjunct sedation rather than push dex higher',
    citation: [1, 2, 3, 5],
    next: 'dex-titration',

    summary: 'Start 0.2-0.4 mcg/kg/hr (no load), titrate q15-30min, max practical 1.5 mcg/kg/hr — add adjunct rather than push higher',
    treatment: {
      firstLine: {
        drug: 'Dexmedetomidine (maintenance)',
        dose: '0.2-0.7 mcg/kg/hr IV continuous',
        route: 'IV continuous infusion',
        frequency: 'Continuous',
        duration: '24h FDA label; real-world up to 7d safe',
        notes: 'Standard concentration 4 mcg/mL. Onset 15-30 min without load. T1/2 = 2-3h.',
        confidence: 'standard',
      },
      monitoring: 'Continuous BP and cardiac monitor. RASS q1h. Reduce dose 50% in severe hepatic impairment.',
    },
  },

  {
    id: 'dex-titration',
    type: 'info',
    module: 3,
    title: 'Titration Strategy',
    body: '**Titrate by 0.1-0.2 mcg/kg/hr every 15-30 minutes.** [1][2]\n\n**Titration rules:**\n1. **Assess RASS q1h** (more frequently during active titration)\n2. **Increase by 0.1 mcg/kg/hr** if RASS above target by 1\n3. **Increase by 0.2 mcg/kg/hr** if RASS above target by 2+\n4. **Decrease by 0.1-0.2 mcg/kg/hr** if RASS below target (over-sedated)\n5. **Wait 15-30 min** between adjustments — earlier changes do not reflect steady state\n\n**Target RASS by scenario:**\n- **Light ICU sedation:** 0 to -1\n- **Standard ICU sedation:** -1 to -2\n- **Pre-extubation wean:** 0 to -1\n- **Procedural sedation:** -1 to -2\n- **Alcohol withdrawal:** 0 to -1 (or per CIWA target)\n\n**When titration is failing:** [1][13]\n- If at 1.5 mcg/kg/hr and patient still agitated → ADD adjunct (propofol, low-dose midazolam, scheduled fentanyl)\n- Do NOT push dex above 1.5 mcg/kg/hr — diminishing return, increasing toxicity\n- Consider tachyphylaxis after 5-7 days of continuous use — may require dose escalation or sedation rotation\n\n**Sedation rotation strategy:** [13]\n- Day 1-3: Dex monotherapy at therapeutic rate\n- Day 4+: Tachyphylaxis emerges, consider adding propofol or rotating to propofol entirely\n- Returns to dex sensitivity after 24-48h drug holiday\n\n**Compatibility (Y-site):** Compatible with most ICU drugs. INCOMPATIBLE with: amphotericin B, diazepam, phenytoin.',
    citation: [1, 2, 13],
    next: 'dex-duration',

    summary: 'Titrate 0.1-0.2 mcg/kg/hr q15-30min — cap at 1.5 mcg/kg/hr, then add adjunct; tachyphylaxis after 5-7d',
  },

  {
    id: 'dex-duration',
    type: 'info',
    module: 3,
    title: 'Duration of Therapy',
    body: '**FDA label:** Approved for sedation up to 24 hours. [1]\n\n**Real-world practice:** Routinely used 5-7 days, with growing evidence supporting longer durations. [3][13]\n\n**Evidence for extended duration:** [3][13]\n- **MIDEX (2012):** Used dex up to 14 days, no safety signal\n- **SPICE III (2019):** Early dex for up to 28 days in ventilated patients, no increase in mortality\n- **Pediatric series:** Up to 14 days with appropriate wean\n\n**Considerations for extended use:** [13]\n- **Tachyphylaxis** emerges after 5-7 days — dose may need to escalate or rotate\n- **Withdrawal syndrome** after >24h continuous use — see Module 5 wean protocol\n- **Cumulative bradycardia risk** — daily check of HR baseline trend\n- **Cost** — significantly more expensive than propofol for extended use\n\n**When to consider transitioning OFF dex (back to propofol/midazolam):** [13]\n- Need for deep sedation (RASS -3 to -4)\n- Dose escalation to >1.5 mcg/kg/hr without effect\n- Cumulative bradycardia (HR <55 sustained)\n- Cost considerations >7 days\n- Patient stable, transitioning to standard ICU sedation protocol\n\n**Do NOT abruptly stop after >24h use** — see wean protocol Module 5.',
    citation: [1, 3, 13],
    next: 'dex-hypotension',

    summary: 'FDA <24h but routine 5-7d safe — tachyphylaxis emerges day 5-7, requires wean after >24h use',
    skippable: true,
  },

  // =====================================================================
  // MODULE 4: ADVERSE EVENTS & HEMODYNAMIC MANAGEMENT
  // =====================================================================

  {
    id: 'dex-hypotension',
    type: 'info',
    module: 4,
    title: 'Hypotension Management (30% incidence)',
    body: '**Hypotension is the MOST COMMON adverse event with dex.** [1][2][12]\n\n**Pathophysiology:** Central sympatholysis (decreased norepinephrine release) → vasodilation and reduced cardiac output. Worsened by volume depletion.\n\n**Definition + thresholds:**\n- **Mild:** SBP 90-100 OR MAP 60-65 — observe, optimize volume\n- **Moderate:** SBP 80-89 OR MAP 55-59 — fluid bolus, reduce dex rate\n- **Severe:** SBP <80 OR MAP <55 — fluids + push-dose pressor + hold dex\n\n**Management algorithm (in order):** [1][12]\n\n**Step 1: Optimize volume FIRST**\n- 500-1000 mL crystalloid bolus if fluid-responsive (POCUS, passive leg raise)\n- Most dex hypotension is volume-responsive\n- Do NOT reduce dex first if patient is dry — fix the volume, then assess\n\n**Step 2: Push-dose pressor if volume optimized but MAP still <65**\n- [Push-dose epinephrine](#/tree/push-dose-pressors): 10-20 mcg IV q1-5 min\n- Or push-dose phenylephrine: 100-200 mcg IV q3-5 min\n- Bridges to fluid response or rate reduction\n\n**Step 3: Reduce dex rate ONLY after volume + pressor inadequate**\n- Reduce by 0.1-0.2 mcg/kg/hr\n- Continue if RASS within target despite reduction\n- If patient still agitated AND hypotensive: switch to propofol (lower cumulative HOTN profile in volume-depleted)\n\n**When to STOP dex:**\n- Persistent MAP <55 despite fluids + push-dose pressor\n- Need for continuous norepinephrine infusion to maintain MAP\n- Profound bradycardia + hypotension (HR <50, SBP <85)\n\n**Prevention:**\n- 500 mL crystalloid pre-load before starting dex (especially with loading dose)\n- Skip the loading dose in volume-depleted patients\n- Start at lower rate (0.2 mcg/kg/hr) in elderly or cardiac patients',
    citation: [1, 2, 12],
    calculatorLinks: [
      { id: 'map-calculator', label: 'MAP Calc' },
    ],
    next: 'dex-bradycardia',

    summary: '30% HOTN — volume FIRST (most responds), then push-dose pressor, reduce dex LAST. STOP if needs NE drip',
    safetyLevel: 'critical',
    treatment: {
      firstLine: {
        drug: 'Crystalloid bolus + push-dose epinephrine',
        dose: '500-1000 mL NS/LR; epi 10-20 mcg IV q1-5 min PRN',
        route: 'IV',
        frequency: 'PRN',
        duration: 'Until MAP >65',
        notes: 'Volume first, pressor second, reduce dex rate LAST.',
      },
      monitoring: 'Cycle BP q2-3 min during active hypotension. POCUS for volume status if uncertain.',
    },
  },

  {
    id: 'dex-bradycardia',
    type: 'info',
    module: 4,
    title: 'Bradycardia Management (14% incidence)',
    body: '**Bradycardia is the second most common adverse event.** [1][2][14]\n\n**Pathophysiology:** Reduced sympathetic outflow + increased baroreceptor reflex sensitivity → slower HR. Can be profound (HR <40) in vagally-toned patients (athletes, beta-blocked patients).\n\n**Definition + thresholds:**\n- **Mild (asymptomatic):** HR 50-59 OR HR drop 10-20% from baseline\n- **Moderate (asymptomatic):** HR 40-49 OR HR drop 20-30% from baseline\n- **Severe or symptomatic:** HR <40 OR symptomatic (hypotension, syncope, dizziness)\n\n**Management algorithm:** [1][2][14]\n\n**Mild bradycardia (HR 50-59, asymptomatic):**\n- Continue current rate, monitor\n- No intervention needed if MAP >65 and patient asymptomatic\n\n**Moderate bradycardia (HR 40-49, asymptomatic):**\n- Reduce dex rate by 0.1 mcg/kg/hr\n- Recheck HR + BP at 15 min\n- If HR not improving: hold dex, transition to propofol if sedation still needed\n\n**Severe or symptomatic bradycardia (HR <40 OR symptomatic):**\n- **HOLD dex immediately**\n- **Atropine 0.5 mg IV** push (may repeat to total 3 mg)\n- If atropine fails: glycopyrrolate 0.2 mg IV (longer-acting, less tachycardia)\n- If persistent: transcutaneous pacing, epinephrine infusion\n- Look for contributing causes: hypoxia, beta-blocker effect, MI, electrolytes\n\n**Special situations:** [14]\n- **Patient on beta-blockers:** Dex bradycardia is additive — reduce dex starting dose by 25-50%, monitor closely\n- **Cardiac surgery patient:** Bradycardia common postop, may need temporary pacing\n- **Pediatric:** Lower threshold to hold (age-based bradycardia definitions)\n- **Recurrent bradycardia despite hold + atropine:** Glycopyrrolate scheduled q6h while on dex, OR switch to propofol\n\n**Do NOT use phenylephrine for dex-induced bradycardia** — pure alpha agonism can paradoxically worsen bradycardia via baroreceptor reflex.',
    citation: [1, 2, 14],
    next: 'dex-htn',

    summary: 'HR <40 or symptomatic = HOLD dex + atropine 0.5mg IV, glycopyrrolate if recurrent — NOT phenylephrine (worsens via baroreflex)',
    safetyLevel: 'critical',
    treatment: {
      firstLine: {
        drug: 'Atropine',
        dose: '0.5 mg IV push, may repeat to total 3 mg',
        route: 'IV',
        frequency: 'PRN bradycardia',
        duration: 'Until HR >50 and symptoms resolve',
        notes: 'Hold dex first, then atropine. Glycopyrrolate 0.2 mg IV if recurrent.',
        confidence: 'standard',
      },
      monitoring: 'Continuous cardiac monitor. Look for contributing causes (hypoxia, MI, electrolytes, BB).',
    },
  },

  {
    id: 'dex-htn',
    type: 'info',
    module: 4,
    title: 'Paradoxical Hypertension During Load',
    body: '**Paradoxical hypertension occurs in ~10% of patients receiving loading dose.** [1][12]\n\n**Pathophysiology:** At high plasma concentrations (during loading), dex activates peripheral α1 receptors before central α2 sympatholysis predominates. Net effect = transient vasoconstriction.\n\n**Clinical features:**\n- SBP elevation 20-40 mmHg above baseline\n- Occurs during or immediately after loading dose\n- Self-limited — resolves within 15-30 min of load completion\n- More common in: older patients with baseline HTN, vascular disease, baseline SBP >150\n\n**Management:** [1][12]\n\n**Mild (SBP <180, MAP <120):**\n- Continue load at slower rate (extend to 20 min instead of 10)\n- Monitor closely — usually resolves spontaneously\n- No specific antihypertensive needed\n\n**Severe (SBP >180 OR MAP >120):**\n- STOP the load\n- Resume as maintenance-only at 0.2-0.4 mcg/kg/hr\n- Pressure usually self-resolves within 30 min\n- Avoid IV antihypertensives — can precipitate severe hypotension as the α2 effect kicks in\n\n**Critical context:**\n- This is NOT a contraindication to continuing dex\n- Maintenance dosing alone (no further bolus) typically avoids recurrence\n- Document the event and starting dose modifications\n\n**Prevention:**\n- Skip the load in patients with: baseline SBP >160, known severe vascular disease, age >75\n- Use reduced load (0.5 mcg/kg) over slower duration (20 min) in moderate-risk patients\n- Some institutional protocols extend ALL loading doses to 20 min to reduce paradoxical HTN incidence',
    citation: [1, 12],
    next: 'dex-bradycardia',

    summary: 'Paradoxical HTN 10% during load (α1 at high concentrations) — slow load to 20min, or stop and resume as maintenance only',
    skippable: true,
  },

  // =====================================================================
  // MODULE 5: SPECIAL POPULATIONS & WEAN
  // =====================================================================

  {
    id: 'dex-comparison',
    type: 'info',
    module: 5,
    title: 'Dex vs Other Sedatives - Comparison',
    body: '**Choosing between sedatives:** [1][3][15]\n\n| Agent | Onset | Resp Depression | Hemodynamics | Delirium Risk | Cost |\n|-------|-------|-----------------|--------------|----------------|------|\n| **Dexmedetomidine** | 15-30 min | None | HOTN/brady | LOW | $$$$ |\n| **Propofol** | 30 sec | YES (severe) | HOTN | MEDIUM | $ |\n| **Midazolam** | 2-5 min | YES (severe) | Mild HOTN | HIGH | $ |\n| **Ketamine** | 30 sec | None (low dose) | HTN/tachy | LOW | $$ |\n\n**Best agent by scenario:** [1][3][15]\n\n**Crashing/agitated patient needing rapid deep sedation:**\n- 1st: Propofol (fastest onset, deepest sedation)\n- 2nd: Midazolam (if hemodynamically fragile and resp depression OK)\n- NOT dex (too slow)\n\n**ICU sedation, anticipated extubation <24h:**\n- 1st: Dexmedetomidine (delirium reduction, easier wean)\n- 2nd: Propofol (cheaper, faster titration)\n- 3rd: Midazolam (only if dex/propofol contraindicated)\n\n**Awake fiberoptic intubation:**\n- 1st: Dexmedetomidine (preserves resp drive, arousable)\n- 2nd: Ketamine (alternative, preserves airway reflexes)\n\n**Alcohol withdrawal:**\n- 1st: Benzos (lorazepam/diazepam) for seizure prophylaxis\n- 2nd: ADD dex if CIWA >15 despite benzos\n- NOT propofol/ketamine alone (no seizure prophylaxis)\n\n**Pediatric MRI/CT sedation:**\n- 1st: IN dexmedetomidine (no IV, no resp depression)\n- 2nd: IV midazolam + IV ketamine combo\n\n**Cardiac surgery post-op:**\n- 1st: Dexmedetomidine (preserves hemodynamics in low-output states, reduces delirium)\n- 2nd: Propofol (faster wean if extubating soon)',
    citation: [1, 3, 15],
    next: 'dex-wean',

    summary: 'Dex slow (15-30 min) but no resp depression + low delirium — propofol/midazolam for crashing patients, dex for ICU light sedation',
    skippable: true,
  },

  {
    id: 'dex-wean',
    type: 'info',
    module: 5,
    title: 'Wean Protocol (after >24h continuous use)',
    body: '**Abrupt discontinuation after >24h of dex causes withdrawal syndrome.** [13][16]\n\n**Withdrawal syndrome features:** [13][16]\n- Rebound hypertension (sometimes severe)\n- Rebound tachycardia\n- Agitation, anxiety, restlessness\n- Diaphoresis\n- Insomnia\n- Onset: 6-24h after abrupt stop\n- Duration: 24-72h\n- Mechanism: Sympathetic rebound from chronic α2 receptor down-regulation\n\n**Risk factors for severe withdrawal:** [13]\n- Duration >7 days\n- Maximum rate >1.0 mcg/kg/hr\n- Baseline HTN\n- Concurrent opioid wean\n\n**Wean protocol (after >24h use):** [13][16]\n\n**Step 1: Decrease rate by 50% q12h until off**\nExample: 0.6 mcg/kg/hr → 0.3 mcg/kg/hr (12h) → 0.15 mcg/kg/hr (12h) → off\n\n**Step 2: For prolonged use (>7 days), slower wean:**\n- Decrease by 25% q12h\n- Total wean time 3-5 days\n\n**Step 3: Bridge with oral clonidine for severe cases:**\n- Clonidine 0.1-0.2 mg PO q8h while weaning dex\n- Tapers slowly over 5-7 days after dex stopped\n- Particularly useful in chronic ICU patients\n\n**Step 4: Monitor for breakthrough withdrawal:**\n- HR/BP q1h during active wean\n- If rebound HTN >180/110 or HR >120: pause wean, return to prior rate\n- Restart wean at slower pace 24h later\n\n**Patients who can be stopped abruptly:**\n- Duration <24h\n- Use confined to single procedural sedation\n- Use as bridge to extubation (continuing pre-extubation 4-6h then stopping is fine)\n\n**Common error:** Stopping dex abruptly at extubation after 5+ days of continuous use → rebound HTN crisis. Wean BEFORE extubation in these cases.',
    citation: [13, 16],
    next: 'dex-reversal',

    summary: 'After >24h: 50% q12h wean, after >7d: 25% q12h — bridge with PO clonidine, NEVER abrupt stop after extended use',
    safetyLevel: 'warning',
    treatment: {
      firstLine: {
        drug: 'Dexmedetomidine wean',
        dose: 'Decrease 50% q12h (or 25% q12h if >7 days use)',
        route: 'IV taper',
        frequency: 'q12h titration',
        duration: '24-72h taper for standard use; 3-5d for extended',
        notes: 'Add PO clonidine 0.1-0.2 mg q8h for severe/prolonged cases.',
        confidence: 'standard',
      },
      monitoring: 'HR/BP q1h during wean. If rebound HTN >180/110 or HR >120: pause, return to prior rate, restart slower in 24h.',
    },
  },

  {
    id: 'dex-reversal',
    type: 'result',
    module: 5,
    title: 'Dexmedetomidine - Summary & "Reversal"',
    body: '**There is NO clinically available reversal agent for dexmedetomidine.** [1][2]\n\n**Atipamezole** is a selective α2 antagonist that reverses dex effects rapidly, but it is **veterinary-only** in the US. Limited human data. Not available for clinical use.\n\n**If patient is over-sedated or hemodynamically unstable:**\n1. **STOP the infusion** — elimination half-life is 2-3 hours, effects resolve within 4-6 hours\n2. **Support hemodynamics:**\n   - Fluids for hypotension\n   - Atropine 0.5 mg IV for bradycardia (may repeat)\n   - Push-dose epinephrine for severe hypotension\n3. **Support airway/breathing:**\n   - Dex does NOT cause respiratory depression\n   - If patient is apneic/obtunded: look for OTHER causes (concurrent opioids, propofol, primary CNS event)\n4. **Time-based recovery:** Patient should be more arousable within 2-4 hours of stopping\n\n**Key Takeaways:**\n\n**Dosing:**\n- Skip load in most ED scenarios (30% HOTN risk)\n- Start maintenance 0.2-0.4 mcg/kg/hr\n- Titrate by 0.1-0.2 mcg/kg/hr q15-30 min\n- Cap at 1.5 mcg/kg/hr — add adjunct rather than push higher\n\n**Adverse events:**\n- HOTN (30%): volume FIRST, push-dose pressor, reduce dex LAST\n- Brady (14%): hold + atropine 0.5 mg IV, glycopyrrolate if recurrent\n- Paradoxical HTN (10% during load): slow the load or skip it\n\n**Wean:**\n- After >24h: 50% q12h\n- After >7d: 25% q12h\n- Bridge with PO clonidine if severe\n\n**Best uses:** ICU light sedation, awake fiberoptic, EtOH withdrawal adjunct, pediatric MRI sedation, ventilator wean.\n\n**Avoid:** Crashing/agitated patient needing rapid deep sedation (too slow), severe shock on multiple pressors, severe bradycardia or AV block at baseline.',
    recommendation: 'Dexmedetomidine is a uniquely useful α2 agonist for light sedation without respiratory depression. The dose-limiting toxicities (hypotension 30%, bradycardia 14%) are predictable and manageable with the right setup: volume optimization, atropine + push-dose pressors at bedside, and slow titration. Skip the loading dose in most ED scenarios. Always wean after >24h use to prevent rebound HTN crisis.',
    confidence: 'definitive',
    citation: [1, 2, 13],

    summary: 'No reversal — stop infusion, t1/2 = 2-3h, support hemodynamics with fluids + atropine + push-dose pressors',
  },

];

// =====================================================================
// MODULE LABELS
// =====================================================================

export const DEXMEDETOMIDINE_MODULE_LABELS = [
  'Indications & Patient Selection',
  'Loading Dose & Bolus Strategy',
  'Maintenance Infusion & Titration',
  'Adverse Events & Hemodynamics',
  'Special Populations & Wean',
];

export const DEXMEDETOMIDINE_NODE_COUNT = 18;

// =====================================================================
// CITATIONS
// =====================================================================

export const DEXMEDETOMIDINE_CITATIONS: Citation[] = [
  {
    num: 1,
    text: 'Hospira/Pfizer. Precedex (dexmedetomidine HCl) Prescribing Information. Updated 2024.',
  },
  {
    num: 2,
    text: 'Weerink MAS, Struys MMRF, Hannivoort LN, et al. Clinical Pharmacokinetics and Pharmacodynamics of Dexmedetomidine. Clin Pharmacokinet. 2017;56(8):893-913.',
  },
  {
    num: 3,
    text: 'Devlin JW, Skrobik Y, Gélinas C, et al. Clinical Practice Guidelines for the Prevention and Management of Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the ICU (PADIS 2018). Crit Care Med. 2018;46(9):e825-e873. SCCM 2025 update in press.',
  },
  {
    num: 4,
    text: 'Jakob SM, Ruokonen E, Grounds RM, et al. Dexmedetomidine vs Midazolam or Propofol for Sedation During Prolonged Mechanical Ventilation: Two Randomized Controlled Trials (MIDEX/PRODEX). JAMA. 2012;307(11):1151-1160.',
  },
  {
    num: 5,
    text: 'Reade MC, Eastwood GM, Bellomo R, et al. Effect of Dexmedetomidine Added to Standard Care on Ventilator-Free Time in Patients With Agitated Delirium: The DahLIA Randomized Clinical Trial. JAMA. 2016;315(14):1460-1468.',
  },
  {
    num: 6,
    text: 'Mueller SW, Preslaski CR, Kiser TH, et al. A Randomized, Double-Blind, Placebo-Controlled Dose Range Study of Dexmedetomidine as Adjunctive Therapy for Alcohol Withdrawal. Crit Care Med. 2014;42(5):1131-1139.',
  },
  {
    num: 7,
    text: 'Weingart S. EMCrit Podcast — Dexmedetomidine for Awake Fiberoptic Intubation. EMCrit. Updated 2023.',
  },
  {
    num: 8,
    text: 'Tobias JD. Dexmedetomidine for Sedation Outside the Operating Room. Curr Opin Anaesthesiol. 2020;33(4):559-565.',
  },
  {
    num: 9,
    text: 'Mason KP, Lubisch NB, Robinson F, Roskos R. Intranasal Dexmedetomidine for Pediatric Magnetic Resonance Imaging Sedation. Pediatr Anesth. 2011;21(12):1234-1241.',
  },
  {
    num: 10,
    text: 'Plambech MZ, Afshari A. Dexmedetomidine in the Pediatric Population: A Review. Minerva Anestesiol. 2015;81(3):320-332.',
  },
  {
    num: 11,
    text: 'Shehabi Y, Howe BD, Bellomo R, et al. Early Sedation with Dexmedetomidine in Critically Ill Patients (SPICE III). N Engl J Med. 2019;380(26):2506-2517.',
  },
  {
    num: 12,
    text: 'Ice CJ, Personett HA, Frazee EN, et al. Risk Factors for Dexmedetomidine-Associated Hemodynamic Instability in Critically Ill Patients. Ann Pharmacother. 2016;50(8):624-630.',
  },
  {
    num: 13,
    text: 'Farkas J. PulmCrit — Dexmedetomidine Withdrawal and Tachyphylaxis. EMCrit. 2022.',
  },
  {
    num: 14,
    text: 'Gerresheim G, Schwemmer U. Dexmedetomidin. Anaesthesist. 2013;62(8):661-674. (Bradycardia management review)',
  },
  {
    num: 15,
    text: 'Riker RR, Shehabi Y, Bokesch PM, et al. Dexmedetomidine vs Midazolam for Sedation of Critically Ill Patients: A Randomized Trial (SEDCOM). JAMA. 2009;301(5):489-499.',
  },
  {
    num: 16,
    text: 'Bouajram RH, Bhatt K, Croci R, et al. Incidence of Dexmedetomidine Withdrawal in Adult Critically Ill Patients: A Pilot Study. Crit Care Explor. 2019;1(8):e0035.',
  },
];
