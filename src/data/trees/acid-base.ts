// MedKitt — Acid-Base Disorders (Traditional & Stewart Approaches)
// Initial Assessment → Primary Disorder → Metabolic Acidosis Workup → Met Alkalosis & Mixed → Stewart Approach → Treatment & Disposition
// 6 modules: Initial Assessment → Primary Disorder Identification → Metabolic Acidosis Workup → Metabolic Alkalosis & Mixed → Stewart Approach → Treatment & Disposition
// 34 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const ACID_BASE_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'ab-start',
    type: 'question',
    module: 1,
    title: 'Acid-Base Assessment',
    body: '[Acid-Base Steps Summary](#/info/ab-summary) — stepwise approach to both Traditional and Stewart methods.\n\n**Order labs:** ABG or VBG, BMP (Na, Cl, HCO3, BUN, Cr, Glucose), lactate, albumin, beta-hydroxybutyrate, serum osmolality.\n\n[ABG vs VBG Evidence](#/info/ab-abg-vbg) — VBG is sufficient for most ED acid-base assessments.\n\nChoose your diagnostic approach:',
    images: [{ src: 'images/acid-base/davenport-diagram.jpg', alt: 'Davenport diagram plotting pH vs bicarbonate showing zones for metabolic acidosis, metabolic alkalosis, respiratory acidosis, and respiratory alkalosis', caption: 'Davenport diagram — pH vs HCO₃⁻ framework for ABG interpretation, compensation limits, and identifying mixed disorders. (Public domain)' }],
    citation: [4, 9, 11],
    calculatorLinks: [
      { id: 'anion-gap', label: 'Anion Gap' },
      { id: 'delta-gap', label: 'Delta Gap' },
      { id: 'winters-formula', label: "Winter's Formula" },
      { id: 'osmolar-gap', label: 'Osmolar Gap' },
      { id: 'stewart-sig', label: 'Stewart SID/SIG' },
    ],
    options: [
      {
        label: 'Traditional Approach (Boston / AG / Delta Gap)',
        description: 'Stepwise: pH → pCO2 → AG → Delta Gap → Winter\'s Formula',
        next: 'ab-trad-ph',
      },
      {
        label: 'Stewart Approach (SID / SIG)',
        description: 'Quantitative: pH → CO2 → SID → Lactate → SIG → Osmolar Gap',
        next: 'ab-stew-assess',
      },
    ],

    summary: 'Order ABG/VBG + BMP + lactate + albumin, then choose Traditional or Stewart diagnostic pathway',
  },

  {
    id: 'ab-trad-ph',
    type: 'question',
    module: 1,
    title: 'pH Assessment',
    body: 'What is the measured pH?\n\n[6 Rules for Expected Compensation](#/info/ab-compensation) — predict expected responses to primary disturbances.',
    citation: [4],
    options: [
      {
        label: 'pH < 7.35 (Acidemia)',
        next: 'ab-acid-co2',
      },
      {
        label: 'pH > 7.45 (Alkalemia)',
        next: 'ab-alk-co2',
      },
      {
        label: 'pH 7.35-7.45 (Normal)',
        description: 'Possible compensated or mixed disorder',
        next: 'ab-normal-ph',
      },
    ],

    summary: 'Classify pH as acidemia, alkalemia, or normal — normal pH does not exclude mixed disorders',
  },

  // =====================================================================
  // MODULE 2: PRIMARY DISORDER IDENTIFICATION
  // =====================================================================

  {
    id: 'ab-acid-co2',
    type: 'question',
    module: 2,
    title: 'Acidemia — pCO2 Assessment',
    body: 'Acidemia confirmed. Evaluate the pCO2 to determine the primary disturbance.\n\n**Primary respiratory acidosis:** pCO2 is elevated (the lungs are the problem).\n**Primary metabolic acidosis:** pCO2 is low or normal (kidneys/buffers are the problem, lungs are compensating).',
    citation: [6],
    options: [
      {
        label: 'pCO2 > 45 mmHg (Respiratory Acidosis)',
        next: 'ab-resp-acid',
        urgency: 'urgent',
      },
      {
        label: 'pCO2 < 35 mmHg (Metabolic Acidosis with compensation)',
        next: 'ab-met-acid',
      },
      {
        label: 'pCO2 35-45 mmHg (Metabolic Acidosis, minimal compensation)',
        description: 'Early or mixed — proceed to metabolic workup',
        next: 'ab-met-acid',
      },
    ],

    summary: 'Determine if acidemia is respiratory (high pCO2) or metabolic (low/normal pCO2) in origin',
  },

  {
    id: 'ab-resp-acid',
    type: 'question',
    module: 2,
    title: 'Respiratory Acidosis — Acute vs Chronic',
    body: 'pCO2 is elevated. The lungs are not adequately eliminating CO2.\n\n**Acute vs Chronic:** Renal compensation begins in hours but takes 3-5 days for full effect. Use the compensation rules to determine if HCO3 response is appropriate.\n\n[6 Rules for Expected Compensation](#/info/ab-compensation)',
    citation: [4, 6, 9],
    options: [
      {
        label: 'Acute (< 48 hours)',
        next: 'ab-resp-acid-acute',
      },
      {
        label: 'Chronic (> 48 hours)',
        next: 'ab-resp-acid-chronic',
      },
    ],

    summary: 'Distinguish acute vs chronic respiratory acidosis using renal compensation rules (3-5 days for full effect)',
  },

  {
    id: 'ab-resp-acid-acute',
    type: 'result',
    module: 2,
    title: 'Acute Respiratory Acidosis',
    body: 'Use [Rule 1](#/info/ab-compensation) to calculate expected HCO3.\n\nIf HCO3 is higher than expected → concurrent metabolic alkalosis.\nIf HCO3 is lower than expected → concurrent metabolic acidosis.\n\nSee [Differential Diagnosis](#/info/ab-differential) for common causes.\n\n**Risk Pitfall:** Intubating a patient with compensatory hyperventilation for metabolic acidosis (e.g., DKA) can cause precipitous pH drop if minute ventilation is not matched post-intubation. [5]',
    recommendation: 'Treat the underlying cause. Support ventilation. If intubation required, match the patient\'s pre-intubation minute ventilation. Avoid O2 > 92% in COPD (oxygen-induced hypercapnia).',
    confidence: 'recommended',
    citation: [5, 18],
  },

  {
    id: 'ab-resp-acid-chronic',
    type: 'result',
    module: 2,
    title: 'Chronic Respiratory Acidosis',
    body: 'Use [Rule 2](#/info/ab-compensation) to calculate expected HCO3. Full renal compensation may return pH near-normal despite significantly elevated pCO2.\n\nSee [Differential Diagnosis](#/info/ab-differential) for common causes.\n\n**Risk Pitfall:** A pCO2 of 70 with appropriate renal compensation (HCO3 ~35, pH ~7.32) is NOT an intubation indication. Base decision on mental status, work of breathing, and clinical trajectory. pH ≤ 7.25 in COPD exacerbation → consider ICU. In-hospital mortality for these patients may reach 25%. [18]',
    recommendation: 'Optimize bronchodilators and treat the acute exacerbation trigger. Consider NIV (BiPAP) before intubation. GOLD guidelines: admit for acute respiratory failure, severe symptoms, mental status changes, or failure of initial ED management.',
    confidence: 'recommended',
    citation: [5, 18],
  },

  {
    id: 'ab-alk-co2',
    type: 'question',
    module: 2,
    title: 'Alkalemia — pCO2 Assessment',
    body: 'Alkalemia confirmed (pH > 7.45). Evaluate pCO2.\n\n**Primary respiratory alkalosis:** pCO2 decreased (hyperventilation).\n**Primary metabolic alkalosis:** pCO2 normal or elevated (ventilatory compensation is limited).',
    citation: [6],
    options: [
      {
        label: 'pCO2 < 35 mmHg (Respiratory Alkalosis)',
        next: 'ab-resp-alk',
      },
      {
        label: 'pCO2 > 45 mmHg (Metabolic Alkalosis with compensation)',
        next: 'ab-met-alk',
      },
      {
        label: 'pCO2 35-45 mmHg (Metabolic Alkalosis)',
        next: 'ab-met-alk',
      },
    ],

    summary: 'Determine if alkalemia is respiratory (low pCO2) or metabolic (normal/high pCO2) in origin',
  },

  {
    id: 'ab-resp-alk',
    type: 'result',
    module: 2,
    title: 'Respiratory Alkalosis',
    body: 'Use [Rules 3 & 4](#/info/ab-compensation) to assess acute vs chronic compensation. See [Differential Diagnosis](#/info/ab-differential) for common causes.\n\n**Risk Pitfall:** Do NOT dismiss hyperventilation as a "panic attack" without ruling out PE, sepsis, and salicylate toxicity. Alkalemia may cause decreased coronary and cerebral perfusion via vasoconstriction, potentially causing ischemia and seizure. [4]',
    recommendation: 'Treat the underlying cause. Consider PE workup (D-dimer, CTPA). Check salicylate level if unexplained. In severe alkalemia: avoid aggressive correction — rebound acidosis is dangerous.',
    confidence: 'recommended',
    citation: [4, 6],
  },

  // =====================================================================
  // MODULE 3: METABOLIC ACIDOSIS WORKUP
  // =====================================================================

  {
    id: 'ab-met-acid',
    type: 'info',
    module: 3,
    title: 'Calculate Anion Gap',
    body: '**Anion Gap = Na - (Cl + HCO3)**\n\nNormal AG: 8-12 mEq/L. Values as low as 6 ± 3 may be seen with modern analyzers. [7]\n\n**Albumin-corrected AG** (Figge correction for hypoalbuminemia): [8]\nCorrected AG = AG + 2.5 × (4.2 - measured albumin in g/dL)\n\nCritically ill, malnourished, and perioperative patients often have low albumin, which falsely narrows the AG and can mask an anion gap acidosis.\n\n[Differential Diagnosis](#/info/ab-differential)',
    calculatorLinks: [{ id: 'anion-gap', label: 'Anion Gap Calculator' }],
    citation: [7, 8],
    next: 'ab-ag-result',

    summary: 'Calculate AG (Na-Cl-HCO3), correct for albumin — low albumin falsely narrows AG and masks HAGMA',
    skippable: true,
  },

  {
    id: 'ab-ag-result',
    type: 'question',
    module: 3,
    title: 'Anion Gap Result',
    body: 'Interpret the anion gap (use albumin-corrected AG if albumin is low).',
    options: [
      {
        label: 'AG > 12 (Elevated — Anion Gap Acidosis)',
        next: 'ab-hagma',
        urgency: 'urgent',
      },
      {
        label: 'AG 8-12 (Normal — Non-AG Acidosis)',
        next: 'ab-nagma',
      },
    ],

    summary: 'Classify metabolic acidosis as anion gap (>12) or non-anion gap (8-12) to guide differential',
  },

  {
    id: 'ab-hagma',
    type: 'info',
    module: 3,
    title: 'High Anion Gap Metabolic Acidosis',
    body: '[Differential Diagnosis](#/info/ab-differential) — MUDPILES mnemonic and full etiologies.\n\n**Check:** Lactate, beta-hydroxybutyrate (BHB), toxicology screen.\n\n[Lactate & Ketone Pathophysiology](#/info/ab-lactate-ketones)\n\nProceed to Delta Gap to assess for mixed metabolic disorders.',
    calculatorLinks: [{ id: 'osmolar-gap', label: 'Osmolar Gap Calculator' }],
    citation: [5, 7, 16],
    next: 'ab-delta',

    summary: 'HAGMA confirmed — check lactate, BHB, tox screen, then proceed to Delta Gap for mixed disorders',
    skippable: true,
  },

  {
    id: 'ab-delta',
    type: 'question',
    module: 3,
    title: 'Delta Gap (Delta-Delta Ratio)',
    body: '**Delta Ratio = ΔAG / ΔHCO3 = (AG - 12) / (24 - HCO3)**\n\nIn a pure anion gap acidosis, every unmeasured anion that widens the gap should proportionally consume one bicarbonate. If this ratio is not 1:1, a second metabolic process is occurring.',
    calculatorLinks: [{ id: 'delta-gap', label: 'Delta Gap Calculator' }],
    citation: [7],
    options: [
      {
        label: 'Delta < 1 (Concurrent non-AG acidosis)',
        description: 'Bicarbonate fell MORE than the AG rose',
        next: 'ab-delta-low',
      },
      {
        label: 'Delta 1-2 (Pure AG acidosis)',
        description: 'AG rise proportional to HCO3 drop',
        next: 'ab-winters',
      },
      {
        label: 'Delta > 2 (Concurrent metabolic alkalosis)',
        description: 'AG rose MORE than HCO3 fell',
        next: 'ab-delta-high',
      },
    ],

    summary: 'Delta ratio (ΔAG/ΔHCO3) detects hidden second metabolic process — <1 concurrent NAGMA, >2 concurrent alkalosis',
  },

  {
    id: 'ab-delta-low',
    type: 'result',
    module: 3,
    title: 'Mixed: AG + Non-AG Acidosis',
    body: 'Delta ratio < 1 (or < 0.4 for significant hyperchloremic component).\n\nBicarbonate has fallen MORE than the anion gap has risen, indicating a concurrent non-anion gap (hyperchloremic) acidosis alongside the AG acidosis.\n\n**Common scenarios:**\n• DKA with saline resuscitation (iatrogenic hyperchloremia)\n• Uremia + diarrhea\n• Renal tubular acidosis + lactic acidosis\n\n**Evaluate:** Urine anion gap (UNa + UK - UCl). Negative = GI loss (appropriate renal response). Positive = renal tubular acidosis.',
    recommendation: 'Treat each process. Consider balanced crystalloids (LR, PlasmaLyte) instead of NS for further resuscitation to avoid worsening hyperchloremia.',
    confidence: 'recommended',
    citation: [7, 13],
  },

  {
    id: 'ab-delta-high',
    type: 'result',
    module: 3,
    title: 'Mixed: AG Acidosis + Metabolic Alkalosis',
    body: 'Delta ratio > 2.\n\nThe anion gap has risen MORE than bicarbonate has fallen, suggesting a baseline elevated HCO3 (metabolic alkalosis) that is partially offsetting the acidosis.\n\n**Common scenarios:**\n• DKA + vomiting (metabolic alkalosis from HCl loss)\n• Sepsis + NG suction\n• Lactic acidosis + diuretic use\n• Any AG acidosis in a patient with chronic respiratory acidosis (elevated baseline HCO3 from renal compensation)',
    recommendation: 'Identify and treat both processes. The metabolic alkalosis may mask the severity of the underlying AG acidosis.',
    confidence: 'recommended',
    citation: [7],
  },

  {
    id: 'ab-winters',
    type: 'info',
    module: 3,
    title: 'Winter\'s Formula — Respiratory Compensation',
    body: 'Apply [Winter\'s Formula (Rule 5)](#/info/ab-compensation) to calculate the expected pCO2.\n\nCompare the patient\'s measured pCO2 to this expected range to detect concurrent respiratory disturbances.',
    calculatorLinks: [{ id: 'winters-formula', label: 'Winter\'s Formula Calculator' }],
    citation: [6],
    next: 'ab-winters-result',

    summary: 'Apply Winter\'s Formula to predict expected pCO2 — detects concurrent respiratory disturbances',
    skippable: true,
  },

  {
    id: 'ab-winters-result',
    type: 'question',
    module: 3,
    title: 'Compensation Assessment',
    body: 'Compare the patient\'s actual pCO2 to the Winter\'s formula predicted range.',
    options: [
      {
        label: 'Actual pCO2 within expected range (Appropriately compensated)',
        description: 'Pure metabolic acidosis with adequate respiratory compensation',
        next: 'ab-treatment',
      },
      {
        label: 'Actual pCO2 HIGHER than expected (Concurrent respiratory acidosis)',
        description: 'The patient is not hyperventilating enough — or has a second respiratory problem',
        next: 'ab-mixed-result',
        urgency: 'urgent',
      },
      {
        label: 'Actual pCO2 LOWER than expected (Concurrent respiratory alkalosis)',
        description: 'The patient is hyperventilating more than expected',
        next: 'ab-mixed-resp-alk',
      },
    ],

    summary: 'Compare actual pCO2 to Winter\'s prediction — higher means concurrent respiratory acidosis, lower means respiratory alkalosis',
  },

  {
    id: 'ab-mixed-result',
    type: 'result',
    module: 3,
    title: 'Mixed: Metabolic + Respiratory Acidosis',
    body: 'The measured pCO2 exceeds the predicted range from Winter\'s formula.\n\n**Both metabolic AND respiratory processes are contributing to acidemia.** This is a particularly dangerous combination — the pH drops further than either process alone would cause.\n\n**Common scenarios:**\n• COPD exacerbation + sepsis\n• Sedation/opioid use + DKA\n• Neuromuscular disease + renal failure\n• Post-arrest (metabolic acidosis + hypoventilation)',
    recommendation: 'Address both processes urgently. Maximize ventilatory support. Treat the metabolic cause. Consider sodium bicarbonate if pH ≤ 7.20 with AKI (BICAR-ICU criteria).',
    confidence: 'recommended',
    citation: [4, 12, 17],
  },

  {
    id: 'ab-nagma',
    type: 'result',
    module: 3,
    title: 'Non-Anion Gap (Hyperchloremic) Acidosis',
    body: '**AG is normal (8-12).** Acidosis is due to bicarbonate loss or impaired acid excretion without accumulation of unmeasured anions.\n\n**Calculate Urine Anion Gap** = UNa + UK - UCl\n\n**Negative urine AG** (< 0): GI bicarbonate loss (diarrhea most common).\n**Positive urine AG** (> 0): Renal tubular acidosis — differentiate by urine pH.\n\n[Differential Diagnosis](#/info/ab-differential) — full RTA types and NAGMA causes.\n[Fluid Selection Guide](#/info/ab-fluids-guide) — NS-induced hyperchloremic acidosis.',
    recommendation: 'Treat the underlying cause. For diarrheal losses: isotonic bicarbonate replacement. For RTA: oral bicarbonate supplementation (Type I/II) or fludrocortisone (Type IV). Switch from NS to balanced crystalloid if iatrogenic.',
    confidence: 'recommended',
    citation: [4, 7, 13],
  },

  // =====================================================================
  // MODULE 4: METABOLIC ALKALOSIS & MIXED
  // =====================================================================

  {
    id: 'ab-met-alk',
    type: 'question',
    module: 4,
    title: 'Metabolic Alkalosis — Urine Chloride',
    body: 'Metabolic alkalosis: elevated pH with elevated HCO3. Use [Rule 6](#/info/ab-compensation) to check pCO2 compensation.\n\n**Urine chloride** differentiates the two major categories:',
    citation: [4, 6],
    options: [
      {
        label: 'UCl < 20 mEq/L (Chloride-Responsive)',
        description: 'Volume-depleted — will respond to saline',
        next: 'ab-met-alk-resp',
      },
      {
        label: 'UCl > 20 mEq/L (Chloride-Resistant)',
        description: 'Not volume-depleted — will NOT respond to saline',
        next: 'ab-met-alk-resist',
      },
    ],

    summary: 'Urine chloride differentiates chloride-responsive (<20, give NS) from chloride-resistant (>20, won\'t respond to saline)',
  },

  {
    id: 'ab-met-alk-resp',
    type: 'result',
    module: 4,
    title: 'Chloride-Responsive Metabolic Alkalosis',
    body: 'Urine Cl < 20 mEq/L. The kidneys are avidly retaining chloride, indicating volume depletion.\n\nSee [Differential Diagnosis](#/info/ab-differential) for common causes (vomiting, diuretics, post-hypercapnia).',
    recommendation: 'Volume resuscitate with NS (replenishes chloride). Replace potassium (hypokalemia perpetuates alkalosis by increasing renal H+ secretion). Stop offending diuretic if applicable. This is the most common type of metabolic alkalosis in the ED.',
    confidence: 'recommended',
    citation: [4],
  },

  {
    id: 'ab-met-alk-resist',
    type: 'result',
    module: 4,
    title: 'Chloride-Resistant Metabolic Alkalosis',
    body: 'Urine Cl > 20 mEq/L. Volume repletion with saline will NOT correct this alkalosis.\n\nSee [Differential Diagnosis](#/info/ab-differential) for common causes (hyperaldosteronism, Cushing, Bartter/Gitelman, severe hypokalemia).',
    recommendation: 'Treat the underlying cause. Aggressive potassium repletion. Consider acetazolamide 250-500 mg IV to promote bicarbonate excretion. Spironolactone for hyperaldosteronism. For refractory cases: dilute HCl infusion (0.1N) via central line — specialist guidance required.',
    confidence: 'recommended',
    citation: [4],
  },

  {
    id: 'ab-normal-ph',
    type: 'result',
    module: 4,
    title: 'Normal pH — Possible Mixed Disorder',
    body: '**A normal pH does NOT exclude acid-base disturbance.**\n\nOpposing processes can cancel each other:\n• AG acidosis + metabolic alkalosis → near-normal pH\n• Respiratory acidosis + metabolic alkalosis → near-normal pH\n• Chronic compensated respiratory acidosis\n\n**Always check:**\n• Anion gap (even with normal pH — elevated AG reveals hidden acidosis)\n• Base excess (abnormal BE with normal pH = compensated or mixed)\n• Lactate (elevated lactate with normal pH = ominous, suggests compensatory reserve is being consumed)\n\nIf AG is elevated → proceed to [Delta Gap analysis](#/node/ab-delta).',
    recommendation: 'Calculate the AG and assess base excess. An elevated AG with normal pH is a classic mixed disturbance (e.g., DKA + vomiting). Do not be falsely reassured by a normal pH — the underlying processes may be severe.',
    confidence: 'recommended',
    citation: [4, 7, 9],
  },

  {
    id: 'ab-mixed-resp-alk',
    type: 'result',
    module: 4,
    title: 'Mixed: Metabolic Acidosis + Respiratory Alkalosis',
    body: 'The measured pCO2 is LOWER than Winter\'s formula predicted range. The patient is hyperventilating beyond what metabolic compensation requires.\n\n**Classic pattern of salicylate toxicity:** direct central respiratory stimulation causes respiratory alkalosis PLUS metabolic acidosis from uncoupled oxidative phosphorylation. [2]\n\n**Other common scenarios:**\n• Early sepsis (hyperventilation + lactic acidosis)\n• Hepatic failure + renal failure\n• Pregnancy + concurrent metabolic acidosis',
    recommendation: 'Check salicylate level. Consider PE workup. Evaluate for sepsis. This mixed pattern often indicates a serious underlying process.',
    confidence: 'recommended',
    citation: [2, 4],
  },

  // =====================================================================
  // MODULE 5: STEWART APPROACH
  // =====================================================================

  {
    id: 'ab-stew-assess',
    type: 'info',
    module: 5,
    title: 'Stewart: Initial Assessment',
    body: '**Step 1: Note the pH** — acidosis (< 7.35) or alkalosis (> 7.45).\n**Step 2: Check pCO2** — respiratory component uses the same rules as the traditional approach.\n\n[Stewart Approach Explained](#/info/ab-stewart-explained) — SID concept, Gamblegram, weak acids, and clinical examples.\n\n**Reference values:**\n• Na: 140 mEq/L | Cl: 105 mEq/L | SID (Na-Cl): 35 mEq/L\n• Albumin: 4.2 g/dL | Lactate: 1 mmol/L | Base Excess: 0',
    citation: [10, 11],
    next: 'ab-stew-sid',

    summary: 'Stewart Step 1-2: note pH and pCO2, then proceed to SID calculation using Na-Cl difference',
    skippable: true,
  },

  {
    id: 'ab-stew-sid',
    type: 'question',
    module: 5,
    title: 'Strong Ion Difference (Na − Cl)',
    body: '**SID = Na − Cl** (simplified). Normal ~35 mEq/L.\n\nThe Na-Cl difference is the predominant determinant of metabolic acid-base status. A reduced SID suggests acidosis (strong anions "squeeze out" bicarbonate). An increased SID suggests alkalosis. [11]\n\n**Na-Cl base-excess effect = (Na − Cl) − 35**\nFor every 1 mEq/L change in the Na-Cl difference, the base excess changes by 1 mEq/L.',
    calculatorLinks: [{ id: 'stewart-sig', label: 'Stewart SID/SIG Calculator' }],
    citation: [10, 11],
    options: [
      {
        label: 'Na-Cl < 35 (Low SID — Acidosis)',
        next: 'ab-stew-sid-low',
      },
      {
        label: 'Na-Cl 35-38 (Normal SID)',
        next: 'ab-stew-lactate',
      },
      {
        label: 'Na-Cl > 38 (High SID — Alkalosis)',
        next: 'ab-stew-sid-high',
      },
    ],

    summary: 'SID (Na-Cl) normal ~35 — low SID = acidosis from Cl excess or Na deficit, high SID = alkalosis',
  },

  {
    id: 'ab-stew-sid-low',
    type: 'info',
    module: 5,
    title: 'Low SID — Metabolic Acidosis',
    body: 'Na-Cl effect = (Na − Cl) − 35 mEq/L → **negative** = acidosis contribution.\n\nIn hyponatremic patients, a normal chloride concentration (relative hyperchloremia) will result in a decreased SID and metabolic acidosis. [11]\n\n**Common causes:** Fluid administration (NS, D5W, ½NS all have SID 0), RTA, diarrhea.\n\n[Fluid Selection Guide](#/info/ab-fluids-guide) — how NS causes acidosis.\n[Differential Diagnosis](#/info/ab-differential) — RTA types and NAGMA causes.',
    citation: [11, 13],
    next: 'ab-stew-lactate',

    summary: 'Low SID acidosis — from NS resuscitation, RTA, or diarrhea; consider balanced crystalloids',
    skippable: true,
  },

  {
    id: 'ab-stew-sid-high',
    type: 'info',
    module: 5,
    title: 'High SID — Metabolic Alkalosis',
    body: 'Na-Cl effect = (Na − Cl) − 35 mEq/L → **positive** = alkalosis contribution.\n\nHypernatremic patients will have an increased SID and metabolic alkalosis even with a chloride in the reference range. [11]\n\n**Common causes of high SID alkalosis:**\n• NG suction (chloride-rich gastric losses)\n• Diuretics (chloride wasting)\n• Hyperaldosteronism\n• Volume depletion / contraction alkalosis\n• Post-hypercapnia',
    citation: [11],
    next: 'ab-stew-lactate',

    summary: 'High SID alkalosis — from chloride-rich GI losses, diuretics, hyperaldosteronism, or contraction',
    skippable: true,
  },

  {
    id: 'ab-stew-lactate',
    type: 'question',
    module: 5,
    title: 'Lactate Assessment',
    body: '**Lactate effect = 1 − measured lactate** (mEq/L)\n\nNormal lactate ≈ 1 mmol/L → effect ≈ 0. As lactate rises, the effect becomes more negative (acidosis).\n\n[Lactate & Ketone Pathophysiology](#/info/ab-lactate-ketones) — mechanisms, Type A vs B, mortality data.',
    citation: [5, 11],
    options: [
      {
        label: 'Lactate ≤ 2 mmol/L (Normal)',
        next: 'ab-stew-sig',
      },
      {
        label: 'Lactate 2-4 mmol/L (Elevated)',
        description: 'Moderate hyperlactatemia — consider sepsis, shock, meds, liver failure',
        next: 'ab-stew-sig',
      },
      {
        label: 'Lactate > 4 mmol/L (Critical)',
        description: 'If infected: initiate sepsis bundle. Consider shock, dead gut, hepatic failure',
        next: 'ab-stew-sig',
        urgency: 'critical',
      },
    ],

    summary: 'Lactate effect = 1-measured lactate; >4 is critical — consider sepsis, shock, mesenteric ischemia',
    safetyLevel: 'warning',
  },

  {
    id: 'ab-stew-sig',
    type: 'question',
    module: 5,
    title: 'Strong Ion Gap (Unmeasured Anions)',
    body: '**SIG = Base Deficit + (SID − 38) + 2.5 × (4.2 − Albumin g/dL) − Lactate**\n\nAlternative (Story simplified): **Other Ions = BE − (Na-Cl−35) − (1−Lactate) − 2.5×(4.2−Albumin)**\n\nIf no base excess/deficit is available: use (24.2 − HCO3) as a substitute for base deficit.\n\n**SIG > 2** indicates clinically important **unmeasured anions** are present beyond what Na-Cl, lactate, and albumin can explain. [11]\n\nSee [Stewart Approach Explained](#/info/ab-stewart-explained) for the albumin weak acid effect.',
    calculatorLinks: [{ id: 'stewart-sig', label: 'Stewart SID/SIG Calculator' }],
    citation: [10, 11],
    options: [
      {
        label: 'SIG ≤ 2 (No significant unmeasured anions)',
        description: 'Disturbance explained by Na-Cl, lactate, and albumin',
        next: 'ab-treatment',
      },
      {
        label: 'SIG > 2 (Unmeasured anions present)',
        description: 'Additional acids beyond measured ions',
        next: 'ab-stew-sig-high',
        urgency: 'urgent',
      },
      {
        label: 'SIG negative',
        description: 'Unmeasured cations or lab artifact',
        next: 'ab-stew-sig-neg',
      },
    ],

    summary: 'SIG >2 = unmeasured anions (ketones, uremia, toxic alcohols) beyond Na-Cl, lactate, and albumin',
  },

  {
    id: 'ab-stew-sig-high',
    type: 'info',
    module: 5,
    title: 'Elevated SIG — Unmeasured Anions',
    body: '**SIG > 2** indicates unmeasured anions contributing to acidosis.\n\n**Causes:**\n• **Uremia** (phosphate, sulfate, hippurate)\n• **Diabetic ketoacidosis** (BHB can be subtracted directly from SIG to quantify the ketone contribution)\n• **Alcoholic ketoacidosis** (starvation + depleted glycogen + hormonal cascade → ketogenesis)\n• **Toxic alcohols:** methanol, ethylene glycol, propylene glycol → check osmolar gap\n• **Salicylates**\n• **D-lactic acidosis** (short gut / blind loop — normal L-lactate assay)\n\nIf the source of the elevated SIG is unclear → **check osmolar gap.**',
    calculatorLinks: [{ id: 'osmolar-gap', label: 'Osmolar Gap Calculator' }],
    citation: [7, 10, 11, 16],
    next: 'ab-stew-osm',

    summary: 'Elevated SIG causes: uremia, DKA, AKA, toxic alcohols, salicylates — check osmolar gap if unclear',
    skippable: true,
  },

  {
    id: 'ab-stew-osm',
    type: 'result',
    module: 5,
    title: 'Osmolar Gap Assessment',
    body: '**Osmolar Gap = Measured Osm − Calculated Osm**\n\nCalculated Osm = 2×Na + Glucose/18 + BUN/2.8 + EtOH/3.7\n\n(Include EtOH term only if ethanol level is available — unmeasured ethanol falsely elevates the gap.)\n\n**Interpretation:**\n• **Gap ≤ 10:** Normal. Unmeasured anions are endogenous (uremia, ketoacids).\n• **Gap 10-50:** Elevated. Consider methanol, ethylene glycol, propylene glycol (lorazepam/diazepam/phenytoin infusions), isopropanol, mannitol, lithium.\n• **Gap > 50:** Almost certainly toxic alcohol ingestion.',
    recommendation: 'For suspected toxic alcohol: [Fomepizole](#/drug/fomepizole/toxic alcohol) 15 mg/kg IV loading dose. Consult toxicology and nephrology. Dialysis indicated for methanol/ethylene glycol with end-organ damage, severe acidosis, or renal failure.',
    confidence: 'recommended',
    calculatorLinks: [{ id: 'osmolar-gap', label: 'Osmolar Gap Calculator' }],
    citation: [7],
  },

  // =====================================================================
  // MODULE 6: TREATMENT & DISPOSITION
  // =====================================================================

  {
    id: 'ab-treatment',
    type: 'info',
    module: 6,
    title: 'Treatment Considerations',
    body: '**Sodium Bicarbonate:**\n[Sodium Bicarbonate](#/drug/sodium-bicarbonate/metabolic acidosis) — indications, dosing, and evidence.\n\n**Indications for bicarbonate:** [12][17]\n• pH ≤ 7.20 with moderate-to-severe AKI (BICAR-ICU: NNT 6 for 28-day mortality)\n• TCA overdose (sodium channel blockade)\n• Salicylate toxicity (urinary alkalinization)\n• Life-threatening hyperkalemia\n• Bicarbonate-losing conditions (severe diarrhea, RTA)\n\n**Note:** BICAR-ICU enrolled pH ≤ 7.20 + AKIN 2-3. The pH < 6.9 threshold is ADA guidance for DKA specifically.\n\n**NOT recommended:** [3][17]\n• Routine cardiac arrest or CPR\n• Routine DKA (unless pH < 6.9 per ADA)\n• Routine lactic acidosis (no hemodynamic benefit proven)\n\n[Fluid Selection Guide](#/info/ab-fluids-guide) — NS vs balanced crystalloids.',
    calculatorLinks: [
      { id: 'anion-gap', label: 'Anion Gap' },
      { id: 'stewart-sig', label: 'Stewart SID/SIG' },
    ],
    citation: [1, 2, 3, 12, 13, 17],
    next: 'ab-disposition',

    summary: 'Bicarb for pH≤7.20 with AKI (BICAR-ICU), TCA OD, salicylate tox, severe hyperK — NOT routine in DKA or lactic acidosis',
    safetyLevel: 'warning',
  },

  {
    id: 'ab-disposition',
    type: 'result',
    module: 6,
    title: 'Disposition',
    calculatorLinks: [
      { id: 'anion-gap', label: 'Anion Gap' },
      { id: 'winters-formula', label: "Winter's Formula" },
    ],
    body: '**ICU Admission:** [18]\n• pH ≤ 7.25 (in-hospital mortality up to 25%)\n• Lactate > 4 mmol/L with hemodynamic instability or failure to clear with fluids\n• Toxic alcohol ingestion\n• Refractory acidosis requiring continuous bicarbonate infusion\n• Altered mental status, need for advanced ventilatory support, hemodynamic instability\n\n**Floor Admission:**\n• Correctable cause identified, responding to treatment\n• DKA or AKA on insulin/dextrose protocol\n• Needs ongoing monitoring (serial labs, ABGs)\n• Chronic process with acute exacerbation\n\n**Discharge Considerations:**\n• Chronic compensated disorder at baseline\n• Resolved transient cause (e.g., mild AKA responsive to fluids/dextrose/thiamine within 3-4 hours)\n• Reliable follow-up, appropriate health literacy\n• Mild DKA with appropriate outpatient resources (per recent ADA guidelines) [1]',
    recommendation: 'Emergency clinicians should have a low threshold for hospitalization in patients with acid-base disturbances associated with severe respiratory disease, ketoacidosis, sepsis, poisonings, or any acute condition not likely reversible within 3-4 hours of ED management.',
    confidence: 'recommended',
    citation: [1, 5, 18],
  },

  {
    id: 'ab-stew-sig-neg',
    type: 'result',
    module: 5,
    title: 'Negative SIG — Unmeasured Cations',
    body: 'A negative SIG indicates unmeasured cations or laboratory artifact.\n\n**Causes:**\n• Hypercalcemia (unmeasured divalent cation)\n• Hypermagnesemia\n• Hyperkalemia (if K+ not included in SID calculation)\n• Immunoglobulins — multiple myeloma and plasma cell dyscrasias (paraproteins exist as cations at normal pH) [7]\n• Bromide intoxication (bromide displaces chloride in lab assays, falsely elevating measured Cl)\n• Lithium overdose\n• Nitrate interference\n\nConsider laboratory artifact if clinically implausible.',
    recommendation: 'Evaluate for myeloma (SPEP, free light chains) if unexplained. Check ionized calcium and magnesium. Consider bromide level if clinical suspicion.',
    confidence: 'recommended',
    citation: [7],
  },

];

export const ACID_BASE_NODE_COUNT = ACID_BASE_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const ACID_BASE_MODULE_LABELS = [
  'Initial Assessment',
  'Primary Disorder Identification',
  'Metabolic Acidosis Workup',
  'Metabolic Alkalosis & Mixed',
  'Stewart Approach',
  'Treatment & Disposition',
];

// -------------------------------------------------------------------
// -------------------------------------------------------------------
// Critical Actions
// -------------------------------------------------------------------

export const ACID_BASE_CRITICAL_ACTIONS = [
  { text: 'Stepwise approach: pH → PCO2 compensation → Anion gap → Delta-delta → Osmolar gap', nodeId: 'ab-traditional' },
  { text: 'Anion gap = Na - (Cl + HCO3), normal 8-12. Elevated AG >12 = GOLDMARK mnemonic', nodeId: 'ab-ag' },
  { text: 'Delta-delta ratio = ΔAG / ΔHCO3. Ratio <1 = non-AG acidosis, 1-2 = pure AG acidosis, >2 = concurrent metabolic alkalosis', nodeId: 'ab-delta-delta' },
  { text: 'Winter formula for respiratory compensation: Expected PCO2 = 1.5(HCO3) + 8 ± 2', nodeId: 'ab-primary' },
  { text: 'Osmolar gap >10 suggests toxic alcohol (methanol, ethylene glycol, isopropanol)', nodeId: 'ab-osmolar-gap' },
  { text: 'Urine anion gap for non-AG metabolic acidosis: UAG = (Na + K) - Cl. Positive = RTA, Negative = GI losses', nodeId: 'ab-uag' },
  { text: 'Stewart approach: SID, A- tot (weak acids), PCO2. SID <40 = acidosis, >40 = alkalosis', nodeId: 'ab-stewart' },
  { text: 'Treat underlying cause, NOT the pH (bicarbonate indicated if pH ≤7.20 + AKI per BICAR-ICU, or pH <6.9 in DKA)', nodeId: 'ab-treatment' },
  { text: 'VBG sufficient for most ED acid-base assessment (pH 0.04 lower than ABG)', nodeId: 'ab-start' },
  { text: 'Mixed disorders common: check for compensation, delta-delta, and clinical picture', nodeId: 'ab-mixed' },
];

// Citations (evidence base)
// -------------------------------------------------------------------

export const ACID_BASE_CITATIONS: Citation[] = [
  { num: 1, text: 'Kitabchi AE, Umpierrez GE, Miles JM, et al. Hyperglycemic crises in adult patients with diabetes. Diabetes Care. 2009;32(7):1335-1343.' },
  { num: 2, text: 'American College of Medical Toxicology. Guidance document: management priorities in salicylate toxicity. J Med Toxicol. 2015;11(1):149-152.' },
  { num: 3, text: 'Soar J, Nolan JP, Bottiger BW, et al. European Resuscitation Council guidelines for resuscitation 2015: section 3. Adult advanced life support. Resuscitation. 2015;95:100-147.' },
  { num: 4, text: 'Hamm LL, Nakhoul N, Hering-Smith KS. Acid-base homeostasis. Clin J Am Soc Nephrol. 2015;10(12):2232-2242.' },
  { num: 5, text: 'Gunnerson KJ, Saul M, He S, et al. Lactate versus non-lactate metabolic acidosis: a retrospective outcome evaluation of critically ill patients. Crit Care. 2006;10(1):R22.' },
  { num: 6, text: 'Schwartz WB, Relman AS. A critique of the parameters used in the evaluation of acid-base disorders. NEJM. 1963;268:1382-1388.' },
  { num: 7, text: 'Emmett M, Narins RG. Clinical use of the anion gap. Medicine. 1977;56(1):38-54.' },
  { num: 8, text: 'Figge J, Jabor A, Kazda A, et al. Anion gap and hypoalbuminemia. Crit Care Med. 1998;26(11):1807-1810.' },
  { num: 9, text: 'Berend K. Diagnostic use of base excess in acid-base disorders. NEJM. 2018;378(15):1419-1428.' },
  { num: 10, text: 'Stewart PA. Independent and dependent variables of acid-base control. Respir Physiol. 1978;33(1):9-26.' },
  { num: 11, text: 'Story DA. Stewart acid-base: a simplified bedside approach. Anesth Analg. 2016;123(2):511-515.' },
  { num: 12, text: 'Jaber S, Paugam C, Futier E, et al. Sodium bicarbonate therapy for patients with severe metabolic acidaemia in the intensive care unit (BICAR-ICU). Lancet. 2018;392(10141):31-40.' },
  { num: 13, text: 'Semler MW, Self WH, Wanderer JP, et al. Balanced crystalloids versus saline in critically ill adults (SMART). NEJM. 2018;378(9):829-839.' },
  { num: 14, text: 'Gokel Y, Paydas S, Koseoglu Z, et al. Comparison of blood gas and acid-base measurements in arterial and venous blood samples. Am J Nephrol. 2000;20(4):319-323.' },
  { num: 15, text: 'McKeever TM, Hearson G, Housley G, et al. Using venous blood gas analysis in the assessment of COPD exacerbations. Thorax. 2016;71(3):210-215.' },
  { num: 16, text: 'Kamel KS, Halperin ML. Acid-base problems in diabetic ketoacidosis. NEJM. 2015;372(6):546-554.' },
  { num: 17, text: 'Forsythe SM, Schmidt GA. Sodium bicarbonate for the treatment of lactic acidosis. Chest. 2000;117(1):260-267.' },
  { num: 18, text: 'Ai-Ping C, Lee KH, Lim TK. In-hospital and 5-year mortality of patients treated in the ICU for acute exacerbation of COPD. Chest. 2005;128(2):518-524.' },
];
