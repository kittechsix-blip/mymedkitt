// MedKitt — Salicylate (Aspirin) Toxicity
// Recognition → Resuscitation & Airway → GI Decontamination → Alkalinization → Hemodialysis → Monitoring & Disposition
// 6 modules: Recognition & Risk Assessment → Resuscitation & Airway → GI Decontamination → Alkalinization Protocol → Hemodialysis → Monitoring & Disposition
// 32 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const SALICYLATE_MODULE_LABELS = [
  'Recognition & Risk Assessment',
  'Resuscitation & Airway',
  'GI Decontamination',
  'Alkalinization Protocol',
  'Hemodialysis',
  'Monitoring & Disposition',
];

export const SALICYLATE_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & RISK ASSESSMENT
  // =====================================================================

  {
    id: 'sal-start',
    type: 'question',
    module: 1,
    title: 'Salicylate Toxicity — Initial Assessment',
    body: '[Salicylate Toxicity Steps Summary](#/info/sal-steps-summary) — quick-reference pathway.\n\n**Order labs:** Salicylate level, ABG/VBG, BMP (Na, Cl, HCO3, K, Cr, glucose), lactate, acetaminophen level (common co-ingestant).\n\n**Clinical suspicion triggers:** Unexplained tachypnea/hyperpnea, tinnitus, altered mental status, unexplained anion gap metabolic acidosis, mixed respiratory alkalosis + metabolic acidosis.\n\n[Level Interpretation & Monitoring](#/info/sal-level-interpretation)\n\nWhat type of salicylate exposure?',
    citation: [1, 2, 3, 4],
    calculatorLinks: [
      { id: 'sal-tox-guide', label: 'Sal Tox Guide' },
      { id: 'anion-gap', label: 'Anion Gap' },
      { id: 'winters-formula', label: "Winter's Formula" },
    ],
    options: [
      {
        label: 'Acute Intentional/Accidental Ingestion',
        next: 'sal-acute-dose',
      },
      {
        label: 'Chronic Toxicity Suspected',
        next: 'sal-chronic',
      },
      {
        label: 'Unknown Timing or Co-Ingestion',
        next: 'sal-unknown',
      },
    ],
  },

  {
    id: 'sal-acute-dose',
    type: 'question',
    module: 1,
    title: 'Acute Ingestion — Dose Estimation',
    body: 'Estimate the ingested dose (mg/kg) from history. If uncertain, assume worst case.\n\n**Oil of wintergreen warning:** 1 mL of methyl salicylate = ~1,400 mg aspirin. A single teaspoon (~5 mL) = ~7,000 mg — potentially lethal in a child. [1][3]\n\n**Enteric-coated tablets:** Peak absorption may be delayed 12-24 hours. Extended observation required.\n\nEstimated dose:',
    citation: [1, 3, 9],
    options: [
      {
        label: '< 150 mg/kg (minimal risk)',
        next: 'sal-mild-observe',
      },
      {
        label: '150-300 mg/kg (moderate)',
        next: 'sal-moderate-risk',
      },
      {
        label: '> 300 mg/kg or Unknown Large Ingestion',
        next: 'sal-severe-risk',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'sal-chronic',
    type: 'info',
    module: 1,
    title: 'Chronic Salicylate Toxicity',
    body: '**Chronic toxicity is underrecognized and more lethal than acute toxicity at the same serum levels.** [2][4]\n\nCommonly elderly patients on chronic aspirin or salicylate-containing products (Pepto-Bismol, topical products, combination cold medicines). Often misdiagnosed as sepsis, CHF exacerbation, dementia, or delirium.\n\n[Chronic Toxicity Recognition](#/info/sal-chronic-recognition)\n\n**Key point:** The Done nomogram does NOT apply to chronic toxicity. A level of 40 mg/dL in chronic toxicity can be as dangerous as >100 mg/dL in acute overdose.',
    citation: [2, 4, 13],
    next: 'sal-chronic-assess',
  },

  {
    id: 'sal-chronic-assess',
    type: 'question',
    module: 1,
    title: 'Chronic Toxicity — Severity Assessment',
    body: 'Clinical status is more important than serum level in chronic toxicity.\n\nAssess for signs of severe toxicity:',
    citation: [2, 13],
    options: [
      {
        label: 'Mild (tinnitus, nausea, no altered mental status)',
        next: 'sal-alkalinize-start',
      },
      {
        label: 'Moderate-Severe (AMS, acidemia, pulmonary edema, tachypnea)',
        next: 'sal-resus-assess',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'sal-mild-observe',
    type: 'info',
    module: 1,
    title: 'Low-Risk Acute Ingestion (< 150 mg/kg)',
    body: 'Minimal symptoms expected at this dose. [1]\n\n• Observe minimum **6 hours** (children and adults)\n• Repeat salicylate level at **2 and 4 hours**\n• **Enteric-coated tablets:** Observe minimum **12 hours** (delayed absorption)\n• If levels declining and patient remains asymptomatic → observation pathway\n• If levels rising → reassess risk category',
    citation: [1, 3],
    next: 'sal-monitor',
  },

  {
    id: 'sal-moderate-risk',
    type: 'info',
    module: 1,
    title: 'Moderate Risk (150-300 mg/kg)',
    body: 'Expect symptomatic toxicity: tachypnea, tinnitus, nausea/vomiting. [1]\n\n• Start alkalinization early\n• GI decontamination if within window\n• Check acetaminophen level (common co-ingestant in intentional OD)\n• Serial salicylate levels q2h\n• Volume resuscitate — **NEVER with normal saline** (acidifying). Use D5W or LR.',
    citation: [1, 2, 3],
    next: 'sal-resus-assess',
  },

  {
    id: 'sal-severe-risk',
    type: 'info',
    module: 1,
    title: 'Severe/Massive Ingestion (> 300 mg/kg)',
    body: '**Life-threatening ingestion.** > 500 mg/kg is potentially lethal. [1][3]\n\n• **EARLY nephrology consult** for hemodialysis — do not wait for clinical deterioration\n• Anticipate rapid deterioration: metabolic acidosis, altered mental status, seizures\n• Start alkalinization immediately\n• Activated charcoal if within window and airway protected\n• Volume resuscitate with D5W or LR — **NEVER normal saline**',
    citation: [1, 2, 3],
    next: 'sal-resus-assess',
  },

  {
    id: 'sal-unknown',
    type: 'info',
    module: 1,
    title: 'Unknown Timing — Worst-Case Approach',
    body: 'Treat as moderate-severe until proven otherwise. [2]\n\n• Serial salicylate levels q2h — determine if rising (acute with delayed absorption) or plateauing (chronic)\n• If level rising: may indicate enteric-coated, bezoar, or recent large ingestion\n• If level elevated with acidemia out of proportion: consider chronic toxicity\n• Start alkalinization if symptomatic or level > 30 mg/dL',
    citation: [1, 2],
    next: 'sal-resus-assess',
  },

  // =====================================================================
  // MODULE 2: RESUSCITATION & AIRWAY
  // =====================================================================

  {
    id: 'sal-resus-assess',
    type: 'question',
    module: 2,
    title: 'Resuscitation Assessment',
    body: '**Volume resuscitate** — patients are often 4-6L depleted (diaphoresis, tachypnea, vomiting, diarrhea). [2]\n• Use **isotonic bicarbonate** (if pH < 7.5) or **LR/Plasmalyte** (if at target pH). **NEVER normal saline.** [2]\n• Check fingerstick glucose — give [Dextrose](#/drug/dextrose/neuroglycopenia) D50W empirically for any AMS, even with normal serum glucose (neuroglycopenia). [2][4]\n\nAssess for immediate threats:',
    citation: [1, 2, 3, 4],
    options: [
      {
        label: 'Seizures or Declining GCS',
        next: 'sal-seizure',
        urgency: 'critical',
      },
      {
        label: 'Pulmonary Edema / Respiratory Failure',
        next: 'sal-pulm-edema',
        urgency: 'urgent',
      },
      {
        label: 'Hemodynamically Stable — Proceed to Decontamination',
        next: 'sal-decon-assess',
      },
    ],
  },

  {
    id: 'sal-seizure',
    type: 'info',
    module: 2,
    title: 'Seizures / Severe Altered Mental Status',
    body: '**Benzodiazepines first-line for seizures:**\n• [Lorazepam](#/drug/lorazepam/status epilepticus) 0.1 mg/kg IV (max 4 mg)\n• [Midazolam](#/drug/midazolam/status epilepticus) 0.2 mg/kg IM (max 10 mg) if no IV access\n\n**Empiric dextrose:** [Dextrose](#/drug/dextrose/neuroglycopenia) D50W 50 mL IV — even with NORMAL serum glucose. Salicylate uncouples oxidative phosphorylation, causing massive CNS glucose consumption (**neuroglycopenia**). CSF glucose drops before serum glucose. [2][4]\n\n**Seizures in salicylate toxicity = severe poisoning.** This patient almost certainly needs hemodialysis.',
    citation: [1, 2, 3, 4],
    next: 'sal-airway-warning',
  },

  {
    id: 'sal-airway-warning',
    type: 'question',
    module: 2,
    title: 'THE DANGEROUS AIRWAY',
    body: '**CRITICAL WARNING: Intubation in salicylate toxicity is EXTREMELY DANGEROUS and frequently causes cardiac arrest.** [2][3][4]\n\n[The Dangerous Airway — Death Spiral](#/info/sal-death-spiral)\n\nThe patient\'s compensatory hyperventilation (often RR 30-40) is the ONLY thing maintaining their pH. If you eliminate this compensation during intubation, pH crashes precipitously → more non-ionized salicylate crosses the BBB → brainstem depression → cardiac arrest.\n\n**HFNC may help** blow off CO2 and reduce work of breathing without the risks of intubation. Discontinue as serum bicarbonate rises to avoid excessive alkalemia. [2]\n\nCan intubation be avoided?',
    citation: [2, 3, 4],
    options: [
      {
        label: 'Must Intubate (refractory seizures, apnea, active vomiting with aspiration risk)',
        next: 'sal-intubation',
        urgency: 'critical',
      },
      {
        label: 'Can Avoid Intubation — Proceed to Decontamination',
        next: 'sal-decon-assess',
      },
    ],
  },

  {
    id: 'sal-intubation',
    type: 'result',
    module: 2,
    title: 'Intubation Protocol — Call for EMERGENT Hemodialysis',
    body: '**If intubation is unavoidable:** [2][3][4]\n\n• **Pre-intubation:** Bolus [Sodium Bicarbonate](#/drug/sodium-bicarbonate/salicylate toxicity) 1-2 mEq/kg IV. Give >5-10 minutes before paralysis to allow CO2 blow-off from infused bicarb.\n• **Intubation:** Most experienced operator. Rapid sequence. Consider ketamine (maintains respiratory drive longest).\n• **Post-intubation ventilator settings:** TV 8 mL/kg, **RR 30-35** (match pre-intubation minute ventilation). Target **pH, NOT pCO2.** ABG within 10 minutes.\n• Continue NaHCO3 boluses. Switch to spontaneous mode ASAP.\n\n**This patient REQUIRES EMERGENT HEMODIALYSIS.** A patient who needs intubation for salicylate toxicity almost certainly needs HD too. Intubation without HD has very high mortality.',
    recommendation: 'EMERGENT: Call nephrology STAT for hemodialysis. Continue NaHCO3 infusion. Vent settings: TV 8 mL/kg, RR 30-35, target pH not pCO2. ABG q15min initially.',
    citation: [2, 3, 4],
  },

  {
    id: 'sal-pulm-edema',
    type: 'info',
    module: 2,
    title: 'Non-Cardiogenic Pulmonary Edema',
    body: 'Occurs in severe toxicity from direct capillary leak injury. NOT volume overload. [1][2][3]\n\n• BiPAP/CPAP may temporize — avoid intubation if possible\n• Volume-restrict (despite general hypovolemia)\n• **This is an indication for EMERGENT hemodialysis** [5]\n• If progressing to respiratory failure requiring intubation, see airway warning',
    citation: [1, 2, 3, 5],
    next: 'sal-airway-warning',
  },

  // =====================================================================
  // MODULE 3: GI DECONTAMINATION
  // =====================================================================

  {
    id: 'sal-decon-assess',
    type: 'question',
    module: 3,
    title: 'GI Decontamination',
    body: 'Activated charcoal effectively adsorbs salicylate. Salicylate\'s delayed gastric emptying may extend the window of efficacy. [1][3][7]\n\nDo NOT induce emesis. Gastric lavage is rarely indicated.\n\nTime since ingestion and formulation:',
    citation: [1, 3, 7],
    options: [
      {
        label: 'Within 1-2 Hours, Alert Patient',
        next: 'sal-charcoal',
      },
      {
        label: 'Enteric-Coated, Massive Ingestion, or Bezoar Suspected',
        next: 'sal-mdac',
      },
      {
        label: '> 2 Hours, Contraindicated, or Chronic Exposure',
        next: 'sal-alkalinize-start',
      },
    ],
  },

  {
    id: 'sal-charcoal',
    type: 'info',
    module: 3,
    title: 'Single-Dose Activated Charcoal',
    body: '[Activated Charcoal](#/drug/activated-charcoal/salicylate) 1 g/kg PO (max 50g). [7]\n\nMost effective within 1 hour, but consider up to **2-4 hours** for salicylates (delayed gastric emptying in overdose, bezoar formation). [1]\n\n**Contraindications:** Unprotected airway, bowel obstruction/perforation, caustic co-ingestion.\n\nA second dose of charcoal may be given 4 hours later if salicylate levels continue to rise. [1]',
    citation: [1, 3, 7],
    next: 'sal-alkalinize-start',
  },

  {
    id: 'sal-mdac',
    type: 'info',
    module: 3,
    title: 'Multi-Dose Charcoal / Whole Bowel Irrigation',
    body: 'For enteric-coated formulations or massive ingestions with suspected bezoar: [1][3]\n\n**Multi-dose activated charcoal (MDAC):** [Activated Charcoal](#/drug/activated-charcoal/salicylate) 25g q2-4h for 3-4 additional doses. Monitor for obstipation.\n\n**Whole bowel irrigation (WBI):** PEG-electrolyte solution (GoLYTELY) via NG at 1.5-2 L/hr (adults). Consider for confirmed bezoar on imaging or persistently rising levels despite charcoal. May require intubation for airway protection (use extreme caution — see airway warning).',
    citation: [1, 3],
    next: 'sal-alkalinize-start',
  },

  // =====================================================================
  // MODULE 4: ALKALINIZATION PROTOCOL
  // =====================================================================

  {
    id: 'sal-alkalinize-start',
    type: 'question',
    module: 4,
    title: 'Alkalinization — Cornerstone of Treatment',
    body: '**Urinary alkalinization is the CORNERSTONE of salicylate management.** [1][2][3][4]\n\n[Alkalinization Protocol Detail](#/info/sal-alkalinize-protocol)\n\n**Mechanism:** Alkaline urine ionizes salicylic acid → trapped in renal tubules → cannot be reabsorbed. Urine pH 8.0 increases renal clearance **10-fold** vs pH 6.0. [2][6]\n\n**Even if the patient is already alkalemic** from respiratory alkalosis (pH up to 7.55), bicarbonate is still beneficial — the goal is **urinary** alkalinization, not serum. [2]\n\n[Acid-Base Patterns in Salicylate Toxicity](#/info/sal-acid-base)\n\nIs alkalinization indicated?',
    citation: [1, 2, 3, 4, 6],
    calculatorLinks: [
      { id: 'anion-gap', label: 'Anion Gap' },
      { id: 'winters-formula', label: "Winter's Formula" },
    ],
    options: [
      {
        label: 'Salicylate Level ≥ 30 mg/dL or Symptomatic',
        next: 'sal-bicarb-bolus',
      },
      {
        label: 'Level < 30 mg/dL and Asymptomatic',
        next: 'sal-monitor',
      },
    ],
  },

  {
    id: 'sal-bicarb-bolus',
    type: 'info',
    module: 4,
    title: 'NaHCO3 — Bolus + Infusion',
    body: '[Sodium Bicarbonate](#/drug/sodium-bicarbonate/salicylate toxicity)\n\n**Bolus:** 1-2 mEq/kg IV (typically 2-3 amps of 8.4% NaHCO3). [2][3]\n\n**Infusion:** 150 mEq (3 amps 8.4%) in 1L **D5W** at 150-200 mL/hr. [2]\n• D5W carrier provides CNS glucose support\n• **NEVER use normal saline** as carrier — acidifying (SID = 0) [2]\n\n**Targets:** [2]\n• Serum pH: 7.45-7.55 (check q2h)\n• Urine pH: 7.5-8.0 (check hourly via Foley)\n• Do NOT exceed serum pH > 7.60\n\n**CONTRAINDICATED:** Acetazolamide — lowers serum pH AND displaces salicylate from albumin, increasing free (toxic) levels. [2][13]',
    citation: [2, 3, 6, 13],
    next: 'sal-k-critical',
  },

  {
    id: 'sal-k-critical',
    type: 'info',
    module: 4,
    title: 'CRITICAL — Potassium Repletion',
    body: '**Hypokalemia BLOCKS urinary alkalinization. You CANNOT achieve alkaline urine without adequate K+.** [1][2][3]\n\nWhen K+ is low, the distal tubule reabsorbs K+ and excretes H+ instead — producing **acidic urine** despite systemic alkalosis. No amount of bicarbonate will overcome this.\n\n[KCl IV](#/drug/potassium-chloride-iv/severe) 20-40 mEq/hr IV (with cardiac monitoring for rates > 20 mEq/hr). [2]\n\n**Add 20-40 mEq KCl per liter** of bicarbonate infusion. [2]\n\n**Target K+ ≥ 4.0-4.5 mEq/L.** [2]\n\nBicarbonate infusion tends to drop K+ further — preemptive repletion is essential.',
    citation: [1, 2, 3],
    next: 'sal-dextrose',
  },

  {
    id: 'sal-dextrose',
    type: 'info',
    module: 4,
    title: 'Dextrose for Neuroglycopenia',
    body: '[Dextrose](#/drug/dextrose/neuroglycopenia) **D50W 50 mL IV** for any AMS or declining mental status — even with **NORMAL serum glucose.** [2][4]\n\nSalicylate uncouples oxidative phosphorylation in CNS mitochondria → massive local glucose consumption → CSF glucose drops critically low while serum glucose remains normal. This **neuroglycopenia** causes altered mental status and seizures that may respond to dextrose. [4]\n\n• Add D5W to all maintenance IV fluids (bicarb infusion already uses D5W carrier)\n• Check fingerstick glucose q1h\n• Target moderate hyperglycemia (~150-200 mg/dL) in severe toxicity [2]',
    citation: [2, 4],
    next: 'sal-alkalinize-monitor',
  },

  {
    id: 'sal-alkalinize-monitor',
    type: 'question',
    module: 4,
    title: 'Alkalinization Monitoring',
    body: '**Monitor q1-2h:** ABG/VBG, BMP (K+, HCO3, glucose), salicylate level, urine pH. [1][2][3]\n\n[Level Interpretation & Monitoring](#/info/sal-level-interpretation)\n\n**Warning signs during monitoring:**\n• Declining tachypnea (losing compensation — death spiral risk)\n• Persistent acidic urine despite bicarb (check K+)\n• Rising salicylate levels (ongoing absorption, bezoar)\n• Worsening mental status (tissue redistribution)\n\nAssess response:',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'sal-tox-guide', label: 'Sal Tox Guide' },
      { id: 'anion-gap', label: 'Anion Gap' },
    ],
    options: [
      {
        label: 'Urine pH Achieving 7.5-8.0 + Clinically Improving',
        next: 'sal-alkalinize-success',
      },
      {
        label: 'Urine pH Not Responding Despite Bicarb',
        next: 'sal-alkalinize-trouble',
      },
      {
        label: 'Clinical Deterioration (acidemia, AMS worsening)',
        next: 'sal-hd-indications',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'sal-alkalinize-success',
    type: 'info',
    module: 4,
    title: 'Alkalinization Working — Continue',
    body: 'Continue infusion until: [1][2]\n\n• Salicylate level **< 30 mg/dL** AND trending down on serial levels\n• Patient clinically improving (resolving tachypnea, normal mental status)\n• Acid-base normalizing\n\n**Do NOT stop based on a single level** — redistribution from tissue stores can cause rebound. [2]\n\nTaper bicarb slowly — sudden discontinuation can cause rebound acidosis. Continue K+ repletion throughout.',
    citation: [1, 2],
    next: 'sal-monitor',
  },

  {
    id: 'sal-alkalinize-trouble',
    type: 'info',
    module: 4,
    title: 'Alkalinization Not Working',
    body: 'If urine pH remains < 7.0 despite adequate bicarbonate infusion: [1][2][3]\n\n**#1 — Check K+.** Hypokalemia is the most common cause of alkalinization failure. Replete aggressively.\n\n**#2 — Assess renal function.** AKI prevents renal excretion of both acid and salicylate.\n\n**#3 — Volume status.** Hypovolemia → increased renal bicarbonate reabsorption.\n\n**Alkalinization failure is itself an indication for hemodialysis.** [2][5]\n\n**Absolutely CONTRAINDICATED:** Acetazolamide to directly alkalinize urine — lowers serum pH AND displaces salicylate from protein binding. [2][13]',
    citation: [1, 2, 3, 5, 13],
    next: 'sal-hd-indications',
  },

  // =====================================================================
  // MODULE 5: HEMODIALYSIS
  // =====================================================================

  {
    id: 'sal-hd-indications',
    type: 'question',
    module: 5,
    title: 'Hemodialysis Indications (EXTRIP)',
    body: '**Hemodialysis is extremely effective for salicylate toxicity** — removes salicylate AND corrects acidosis simultaneously. [2][5]\n\n[EXTRIP Hemodialysis Indications](#/info/sal-extrip-hd)\n\n**Consult nephrology early.** HD takes time to arrange (access, setup). Patients who need emergent HD often deteriorate faster than logistics allow. [2]\n\n**EXTRIP Strongly Recommended HD for:** [5]\n• Salicylate level > 100 mg/dL (acute) or > 80 mg/dL (chronic/elderly)\n• pH < 7.20 despite resuscitation\n• Altered mental status or seizures\n• Non-cardiogenic pulmonary edema\n• Renal failure limiting clearance\n• Clinical deterioration despite treatment\n• Alkalinization failure\n\nDoes the patient meet HD criteria?',
    citation: [2, 5, 12],
    calculatorLinks: [
      { id: 'sal-tox-guide', label: 'Sal Tox Guide' },
    ],
    options: [
      {
        label: 'Meets HD Criteria — Initiate HD',
        next: 'sal-hd-protocol',
        urgency: 'critical',
      },
      {
        label: 'Borderline — Early Nephrology Consult',
        next: 'sal-hd-consult',
      },
      {
        label: 'Does Not Meet HD Criteria — Continue Alkalinization',
        next: 'sal-alkalinize-start',
      },
    ],
  },

  {
    id: 'sal-hd-protocol',
    type: 'info',
    module: 5,
    title: 'Hemodialysis Protocol',
    body: '**Standard intermittent HD preferred** over CRRT — much higher clearance rate. Even in hypotension (since fluid isn\'t being removed, HD doesn\'t worsen hemodynamics). [2][5]\n\n• Continue [Sodium Bicarbonate](#/drug/sodium-bicarbonate/salicylate toxicity) infusion **DURING and AFTER** HD\n• HD removes salicylate from blood but tissue stores redistribute after HD\n• Typical duration: 4-6 hours\n• Continue K+ repletion\n• Continue glucose monitoring and D5W infusion',
    citation: [2, 5],
    next: 'sal-hd-rebound',
  },

  {
    id: 'sal-hd-rebound',
    type: 'info',
    module: 5,
    title: 'Post-HD Rebound Monitoring',
    body: '**Rebound is expected.** Salicylate redistributes from tissue stores to blood after HD. [2][5]\n\n• Recheck salicylate level **2 hours post-HD**\n• If level rebounds > 30 mg/dL or symptoms recur → **repeat HD**\n• Continue alkalinization between and after HD sessions\n• Some patients with massive ingestions need **2-3 HD sessions**\n• Follow salicylate levels and clinical status after each session',
    citation: [2, 5],
    next: 'sal-monitor',
  },

  {
    id: 'sal-hd-consult',
    type: 'info',
    module: 5,
    title: 'Early Nephrology Consult',
    body: '**Consult nephrology EARLY — before the patient meets strict indications.** [2]\n\nHD takes time to arrange:\n• Vascular access (dialysis catheter placement)\n• Dialysis nursing and equipment setup\n• May take 1-2+ hours from consult to running\n\nIt is better to have nephrology at bedside and cancel if not needed than to need emergent HD without access.\n\nContinue alkalinization while awaiting HD decision.',
    citation: [2],
    next: 'sal-alkalinize-start',
  },

  // =====================================================================
  // MODULE 6: MONITORING & DISPOSITION
  // =====================================================================

  {
    id: 'sal-monitor',
    type: 'question',
    module: 6,
    title: 'Monitoring & Lab Cycling',
    body: '**Serial lab monitoring:** [1][2][3]\n• Salicylate level q2h until peaked and declining x2, then q4h\n• ABG/VBG q2-4h (acid-base status)\n• BMP q4h (K+, HCO3, glucose, creatinine)\n• Urine pH hourly during alkalinization\n• Fingerstick glucose q1h if AMS or on dextrose\n• Creatine kinase if rhabdomyolysis suspected [1]\n\n[Level Interpretation & Monitoring](#/info/sal-level-interpretation)\n\n**When to stop alkalinization:** [2]\n• Two consecutive levels showing decline\n• Salicylate level < 30 mg/dL\n• Asymptomatic with normal respiratory rate\n• After stopping: follow labs for 2-4 additional hours (rebound risk, especially chronic) [2]\n\nCurrent trajectory:',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Levels Declining + Clinically Improving',
        next: 'sal-dispo',
      },
      {
        label: 'Levels Rising or Plateauing',
        next: 'sal-alkalinize-start',
      },
      {
        label: 'New Clinical Deterioration',
        next: 'sal-hd-indications',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'sal-dispo',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: 'All symptomatic patients require admission. [1]\n\nIntentional ingestion requires **psychiatric evaluation** when medically cleared.\n\nChronic toxicity: lower threshold for ICU admission (higher mortality, more insidious course). [2]\n\nClinical course:',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Required HD, Intubation, or Ongoing Alkalinization',
        next: 'sal-dispo-icu',
      },
      {
        label: 'Symptomatic, Level > 30 mg/dL, Improving',
        next: 'sal-dispo-admit',
      },
      {
        label: 'Asymptomatic, Level < 25 mg/dL, Declining x2',
        next: 'sal-dispo-obs',
      },
    ],
  },

  {
    id: 'sal-dispo-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU admission for:** [1][2]\n• Any patient who received hemodialysis\n• Required intubation\n• Seizures\n• Pulmonary edema\n• Persistent acidemia (pH < 7.30)\n• Ongoing alkalinization infusion\n• Altered mental status\n\nContinue serial labs q2-4h. Watch for rebound after HD.\n\n**Psychiatric evaluation** when medically stable if intentional ingestion.\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'ICU admission. Continue serial salicylate levels, ABG, BMP. Watch for post-HD rebound. Psychiatric evaluation when medically cleared for intentional ingestions.',
    citation: [1, 2, 3],
  },

  {
    id: 'sal-dispo-admit',
    type: 'result',
    module: 6,
    title: 'Floor / Monitored Bed Admission',
    body: 'Symptomatic with improving trajectory. [1][2]\n\n• Continue serial salicylate levels q4h\n• May need continued alkalinization — transfer to ICU if worsening\n• Transition to [KCl PO](#/drug/potassium-chloride-oral/mild) for ongoing K+ repletion\n• Continue D5W-based IV fluids\n\n**Psychiatric evaluation** if intentional ingestion.\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'Admit to monitored bed. Serial salicylate levels q4h. Continue alkalinization if needed. Psychiatric evaluation for intentional ingestions.',
    citation: [1, 2],
  },

  {
    id: 'sal-dispo-obs',
    type: 'result',
    module: 6,
    title: 'Observation / Discharge Criteria',
    body: 'Low-risk ingestion with two consecutive declining levels below 25 mg/dL and asymptomatic. [1][3]\n\n**Minimum observation periods:**\n• Standard tablets: 6 hours\n• **Enteric-coated tablets: 12 hours minimum** (delayed absorption)\n• Accidental pediatric ingestion < 150 mg/kg: 6 hours with serial levels [1]\n\n**Discharge criteria:**\n• Asymptomatic\n• Two consecutive declining levels in therapeutic range (< 25 mg/dL)\n• Normal acid-base status\n• Tolerating PO\n\n**Return precautions:** Tinnitus, rapid breathing, confusion, persistent nausea/vomiting.\n\n**Psychiatric evaluation** mandatory for intentional ingestions before discharge.\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'Discharge if asymptomatic with two declining levels < 25 mg/dL and normal acid-base. Psychiatric evaluation mandatory for intentional ingestions. Return for tinnitus, rapid breathing, confusion.',
    citation: [1, 3],
  },

];

export const SALICYLATE_CITATIONS: Citation[] = [
  { num: 1, text: 'Long N. Salicylate Toxicity. Life in the Fast Lane (LITFL). 2020. https://litfl.com/salicylate-toxicity/' },
  { num: 2, text: 'Farkas J. Salicylate Intoxication. Internet Book of Critical Care (IBCC). EMCrit. 2025. https://emcrit.org/ibcc/salicylate/' },
  { num: 3, text: 'Salicylate Toxicity. WikEM. 2026. https://wikem.org/wiki/Salicylate_toxicity' },
  { num: 4, text: 'Swaminathan A, Berger M. Salicylate Toxicity. REBEL EM. 2018. https://rebelem.com/salicylate-toxicity/' },
  { num: 5, text: 'Juurlink DN, et al. Extracorporeal Treatment for Salicylate Poisoning: Systematic Review and Recommendations from the EXTRIP Workgroup. Ann Emerg Med. 2015;66(2):165-181.' },
  { num: 6, text: 'Proudfoot AT, et al. Position Paper on Urine Alkalinization. J Toxicol Clin Toxicol. 2004;42(1):1-26.' },
  { num: 7, text: 'Chyka PA, et al. Position Paper: Single-Dose Activated Charcoal. Clin Toxicol. 2005;43(2):61-87.' },
  { num: 8, text: 'Hill JB. Salicylate Intoxication. N Engl J Med. 1973;288(21):1110-1113.' },
  { num: 9, text: 'Temple AR. Acute and Chronic Effects of Aspirin Toxicity and Their Treatment. Arch Intern Med. 1981;141(3):364-369.' },
  { num: 10, text: 'Gabow PA, et al. Acid-Base Disturbances in Salicylate Intoxication in Adults. Arch Intern Med. 1978;138(10):1481-1484.' },
  { num: 11, text: 'Murray BP, Carpenter J. Medical Toxicology. Oxford University Press. 2024.' },
  { num: 12, text: 'Fertel BS, et al. The Underutilization of Hemodialysis in Patients with Salicylate Poisoning. Kidney Int. 2009;75(12):1349-1353.' },
  { num: 13, text: 'Palmer BF, Clegg DJ. Salicylate Toxicity. N Engl J Med. 2020;382(26):2544-2555.' },
  { num: 14, text: 'Done AK. Salicylate Intoxication: Significance of Measurements of Salicylate in Blood in Cases of Acute Ingestion. Pediatrics. 1960;26:800-807.' },
];
