// MedKitt — Digoxin Toxicity
// Recognition of acute vs chronic toxicity, ECG findings, risk stratification,
// treatment options, DigiFab indications and dosing, and disposition.
// 6 modules: Recognition → ECG Findings → Risk Stratification → Treatment → DigiFab → Disposition
// 28 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const DIGOXIN_TOXICITY_NODES: DecisionNode[] = [
  // ═══════════════════════════════════════════════════════════════
  // MODULE 1: Recognition
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'dig-start',
    type: 'question',
    module: 1,
    title: 'Digoxin Toxicity — Initial Assessment',
    body: '[Digoxin Toxicity Steps Summary](#/info/dig-steps-summary) — quick reference.\n\nDigoxin has a **narrow therapeutic index** — toxicity can occur at therapeutic levels, especially in chronic use with predisposing factors [1][2].\n\n**Classic presentation triad:**\n• **GI:** Nausea, vomiting, anorexia (often earliest symptoms)\n• **Visual:** Yellow-green halos (xanthopsia), blurred vision, photophobia\n• **CNS:** Confusion, fatigue, weakness, delirium\n\n**Mechanism of toxicity:**\n• Inhibits Na+/K+-ATPase → increased intracellular Ca²⁺ → enhanced automaticity\n• Increased vagal tone → AV nodal blockade\n• Result: **any arrhythmia can occur** — "dig can do anything" [2]\n\nDistinguish between acute and chronic toxicity — they have different presentations, prognoses, and treatment approaches.',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'digifab-calculator', label: 'DigiFab Dosing Calculator' },
      { id: 'dig-acute-chronic', label: 'Acute vs Chronic Comparison' },
    ],
    options: [
      { label: 'Acute Ingestion', description: 'Intentional OD, suicidal, accidental — known ingestion within 24h', next: 'dig-acute' },
      { label: 'Chronic Toxicity', description: 'Elderly, renal failure, drug interactions — insidious onset', next: 'dig-chronic' },
      { label: 'Unknown / Mixed', description: 'Unclear history or acute-on-chronic', next: 'dig-unknown' },
    ],
  },
  {
    id: 'dig-acute',
    type: 'info',
    module: 1,
    title: 'Acute Digoxin Toxicity',
    body: '**Acute ingestion** — intentional overdose, suicidal, or accidental (pediatric) [2][4].\n\n[Acute vs Chronic Comparison](#/info/dig-acute-chronic)\n\n**Characteristics:**\n• **High digoxin level** (often >10 ng/mL in significant ingestions)\n• **Normal or LOW potassium** initially — Na+/K+-ATPase still functional extracardially\n• **Minimal symptoms initially** — may feel fine despite lethal levels\n• **Hyperkalemia = DANGER** — indicates Na+/K+-ATPase poisoning, poor prognosis [3][4]\n\n**Key point:** Acute patients may appear deceptively well before sudden cardiovascular collapse.\n\n**Peak effect:** 6-12 hours post-ingestion (longer with sustained-release formulations).\n\n**Volume of distribution:** Large (5-7 L/kg) — hemodialysis is NOT effective [2].',
    citation: [2, 3, 4],
    next: 'dig-ecg',
  },
  {
    id: 'dig-chronic',
    type: 'info',
    module: 1,
    title: 'Chronic Digoxin Toxicity',
    body: '**Chronic toxicity** — insidious onset in patients on maintenance therapy [2][4].\n\n[Acute vs Chronic Comparison](#/info/dig-acute-chronic)\n\n**Risk factors:**\n• **Renal insufficiency** (primary route of elimination)\n• **Advanced age** (decreased renal function, decreased Vd)\n• **Hypokalemia** (sensitizes myocardium to digoxin)\n• **Hypomagnesemia**\n• **Hypercalcemia**\n• **Hypothyroidism** (decreased clearance)\n• **Drug interactions** — amiodarone, verapamil, quinidine, macrolides, azole antifungals [4]\n\n**Characteristics:**\n• **Lower digoxin levels** — toxicity can occur at "therapeutic" levels (1-2 ng/mL)\n• **More symptomatic** — classic GI/visual/CNS findings\n• **Hyperkalemia is common** and indicates worse prognosis\n• **Worse overall prognosis** than acute — underlying comorbidities, end-organ sensitization [3][4]\n\n[Common Drug Interactions](#/info/dig-drug-interactions)',
    citation: [2, 3, 4],
    calculatorLinks: [
      { id: 'dig-drug-interactions', label: 'Drug Interactions Reference' },
    ],
    next: 'dig-ecg',
  },
  {
    id: 'dig-unknown',
    type: 'info',
    module: 1,
    title: 'Unknown or Mixed Presentation',
    body: '**When history is unclear:**\n\nTreat as **chronic toxicity** if:\n• Patient is on maintenance digoxin therapy\n• Elderly with renal insufficiency\n• Any predisposing factors present\n\nTreat as **acute toxicity** if:\n• Evidence of intentional ingestion\n• Pediatric accidental ingestion\n• Very high digoxin level (>10 ng/mL) in previously non-digitalized patient\n\n**General approach:**\n• Labs: digoxin level, K+, Mg²⁺, Ca²⁺, BMP, BNP\n• 12-lead ECG immediately\n• Continuous cardiac monitoring\n• If any concern for significant toxicity → prepare DigiFab\n\nWhen in doubt, **err on the side of treatment** — digoxin toxicity is highly reversible with DigiFab.',
    citation: [2, 4],
    next: 'dig-ecg',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 2: ECG Findings
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'dig-ecg',
    type: 'question',
    module: 2,
    title: 'ECG Assessment',
    body: '**ECG is critical** — but remember: **"dig can do anything"** [1][2].\n\n[ECG Findings Reference](#/info/dig-ecg)\n\n**Digoxin EFFECT (therapeutic) vs TOXICITY:**\n• **Effect:** "Scooped" ST depression (Salvador Dali mustache), shortened QT — NOT toxicity\n• **Toxicity:** Arrhythmias — bradycardias AND tachycardias\n\n**Classic arrhythmias of toxicity:**\n• **PAT with block** — paroxysmal atrial tachycardia with AV block (PATHOGNOMONIC) [1][2]\n• **Bidirectional VT** — alternating QRS axis (also seen in aconitine poisoning)\n• **Accelerated junctional rhythm** — regularized AF with narrow QRS\n• **Sinus bradycardia, junctional bradycardia**\n• **AV blocks** — 1st, 2nd (Mobitz I or II), 3rd degree\n• **Ventricular ectopy** — PVCs, bigeminy, trigeminy\n\n⚠️ **Regularization of atrial fibrillation** in a digitalized patient suggests toxicity (junctional takeover).',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'dig-ecg', label: 'ECG Findings Reference' },
      { id: 'dig-arrhythmia', label: 'Arrhythmia Management Guide' },
    ],
    options: [
      { label: 'No significant arrhythmia', description: 'Sinus rhythm, possible digoxin effect only', next: 'dig-risk-strat' },
      { label: 'Bradyarrhythmia present', description: 'Sinus brady, AV block, junctional rhythm', next: 'dig-brady', urgency: 'urgent' },
      { label: 'Tachyarrhythmia present', description: 'PAT with block, bidirectional VT, accelerated junctional', next: 'dig-tachy', urgency: 'critical' },
    ],
  },
  {
    id: 'dig-brady',
    type: 'info',
    module: 2,
    title: 'Bradyarrhythmias in Digoxin Toxicity',
    body: '**Bradyarrhythmias** — result from enhanced vagal tone and AV nodal suppression [2].\n\n[Arrhythmia Management Guide](#/info/dig-arrhythmia)\n\n**Common bradyarrhythmias:**\n• Sinus bradycardia\n• Junctional bradycardia\n• 1st degree AV block (prolonged PR)\n• 2nd degree AV block — Mobitz I (Wenckebach) or Mobitz II\n• 3rd degree (complete) AV block\n\n**Initial management:**\n• **[Atropine](#/drug/atropine/bradycardia)** 0.5-1 mg IV — temporizing measure, may not work in severe toxicity [2]\n• **Prepare DigiFab** — definitive treatment if hemodynamically significant\n• **Avoid transcutaneous pacing initially** — can precipitate VF in sensitized myocardium\n\n⚠️ **Pacing:** If temporary pacing is needed, use the **lowest capture threshold possible**. Transvenous is preferred over transcutaneous. Some experts recommend avoiding pacing entirely until DigiFab administered [2].',
    citation: [2],
    treatment: {
      firstLine: {
        drug: 'Atropine',
        dose: '0.5-1 mg',
        route: 'IV',
        frequency: 'May repeat q3-5 min (max 3 mg)',
        duration: 'Until DigiFab takes effect',
        notes: 'Temporizing measure. May be ineffective in severe toxicity. Prepare DigiFab.',
      },
      monitoring: 'Continuous ECG. Prepare for pacing if atropine fails. Have DigiFab ready.',
    },
    next: 'dig-risk-strat',
  },
  {
    id: 'dig-tachy',
    type: 'info',
    module: 2,
    title: 'Tachyarrhythmias in Digoxin Toxicity',
    body: '**Tachyarrhythmias** — result from enhanced automaticity due to intracellular calcium overload [2].\n\n[Arrhythmia Management Guide](#/info/dig-arrhythmia)\n\n**Classic tachyarrhythmias:**\n• **PAT with block** — pathognomonic. Atrial rate 150-250 with variable AV block.\n• **Bidirectional VT** — alternating RBBB/LBBB morphology. Highly specific.\n• **Accelerated junctional rhythm** — "regularized" AF in a dig patient\n• **Ventricular ectopy** — frequent PVCs, bigeminy, VT\n\n**Acute management:**\n• **[Magnesium Sulfate](#/drug/magnesium-sulfate/digoxin arrhythmia)** 2g IV over 2-5 min — first-line for ventricular arrhythmias [2]\n• **[Lidocaine](#/drug/lidocaine/digoxin arrhythmia)** 1-1.5 mg/kg IV — Class IB, does not worsen AV conduction [2]\n• **Phenytoin** 15-20 mg/kg IV — historically used, suppresses automaticity while preserving AV conduction. Less commonly used now [1]\n• **DigiFab** — definitive treatment for life-threatening arrhythmias\n\n🚫 **AVOID cardioversion if possible** — can precipitate refractory VF. If absolutely necessary (unstable VT/VF), use **lowest effective energy** and have DigiFab ready [2].',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Magnesium Sulfate',
        dose: '2g',
        route: 'IV over 2-5 min',
        frequency: 'Once, may repeat',
        duration: 'Until arrhythmia controlled or DigiFab given',
        notes: 'First-line for ventricular arrhythmias in digoxin toxicity. Safe and effective.',
      },
      alternative: {
        drug: 'Lidocaine',
        dose: '1-1.5 mg/kg IV push, then 1-4 mg/min infusion',
        route: 'IV',
        frequency: 'Bolus then infusion',
        duration: 'Until DigiFab takes effect',
        notes: 'Class IB. Does not worsen AV conduction. Use with or after magnesium.',
      },
      monitoring: 'Continuous ECG. Avoid cardioversion if possible. Prepare DigiFab.',
    },
    next: 'dig-risk-strat',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 3: Risk Stratification
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'dig-risk-strat',
    type: 'question',
    module: 3,
    title: 'Risk Stratification',
    body: '**Key prognostic factors:**\n\n**Potassium level:**\n• **Hyperkalemia (K+ >5.5)** = poor prognosis in both acute and chronic [3][4]\n• In acute: indicates severe Na+/K+-ATPase poisoning\n• In chronic: marker of end-organ toxicity\n• Hypokalemia sensitizes to digoxin — correct cautiously\n\n**Digoxin level interpretation:**\n• **>2 ng/mL** — concerning in chronic therapy\n• **>10 ng/mL** — severe acute ingestion\n• **Chronic toxicity can occur at "therapeutic" levels** (1-2 ng/mL) with predisposing factors\n• Draw level ≥6 hours post-ingestion for accuracy (redistribution phase) [4]\n\n**Renal function:**\n• Digoxin is 70% renally cleared\n• Elevated creatinine predicts prolonged toxicity and need for DigiFab\n\nWhat is the potassium level?',
    citation: [3, 4],
    options: [
      { label: 'K+ < 5.0 mEq/L', description: 'Normal or low potassium', next: 'dig-treatment' },
      { label: 'K+ 5.0-5.5 mEq/L', description: 'Mildly elevated — monitor closely', next: 'dig-treatment', urgency: 'urgent' },
      { label: 'K+ > 5.5 mEq/L', description: 'Significant hyperkalemia — DigiFab indicated', next: 'dig-hyperkalemia', urgency: 'critical' },
    ],
  },
  {
    id: 'dig-hyperkalemia',
    type: 'info',
    module: 3,
    title: 'Hyperkalemia in Digoxin Toxicity',
    body: '⚠️ **Hyperkalemia (K+ >5.5) in digoxin toxicity is a CRITICAL finding** [3][4].\n\nIn acute toxicity: Indicates severe Na+/K+-ATPase inhibition — potassium cannot enter cells.\n\nPre-DigiFab mortality with K+ >5.5 was >50%. DigiFab has dramatically improved survival [3].\n\n**Management:**\n\n**DO give:**\n• **DigiFab** — definitive treatment, rapidly lowers K+ by restoring pump function\n• **Sodium bicarbonate** — shifts K+ intracellularly\n• **Insulin/glucose** — shifts K+ intracellularly\n• **Albuterol nebulizer** — shifts K+ intracellularly\n\n🚫 **AVOID or use CAUTIOUSLY:**\n• **Calcium** — traditionally avoided due to "stone heart" theory (cardiac tetany). This is largely debunked in recent literature, but most toxicologists still recommend caution. If life-threatening hyperkalemia with cardiac instability, low-dose CaCl₂ may be reasonable [4].\n\n**Bottom line:** Give DigiFab promptly — it treats both the digoxin toxicity AND the hyperkalemia.',
    citation: [3, 4],
    next: 'dig-fab',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 4: Treatment
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'dig-treatment',
    type: 'question',
    module: 4,
    title: 'Treatment Overview',
    body: '**General treatment approach:**\n\n**1. GI Decontamination:**\n• [Activated Charcoal](#/drug/activated-charcoal/digoxin) 1 g/kg (max 50g) if within 1-2 hours [2]\n• Digoxin has enterohepatic circulation — multidose charcoal may be beneficial in severe cases\n\n**2. Correct electrolyte abnormalities:**\n• **Hypokalemia** — correct CAUTIOUSLY. Do not overshoot to normokalemia — risk of rebound hyperkalemia as digoxin redistributes [2]\n• **Hypomagnesemia** — correct aggressively (Mg²⁺ helps stabilize myocardium)\n\n**3. Arrhythmia management:**\n• Atropine for symptomatic bradycardia\n• Magnesium + lidocaine for ventricular arrhythmias\n• Phenytoin (historical, less used)\n• Avoid cardioversion if possible\n\n**4. DigiFab** — definitive treatment for severe toxicity\n\nIs DigiFab indicated?',
    citation: [2],
    options: [
      { label: 'Mild toxicity — supportive care', description: 'Minor symptoms, no significant arrhythmia, K+ normal', next: 'dig-supportive' },
      { label: 'DigiFab indicated', description: 'Life-threatening arrhythmia, K+ >5.5, hemodynamic instability, or high level', next: 'dig-fab', urgency: 'critical' },
    ],
  },
  {
    id: 'dig-supportive',
    type: 'info',
    module: 4,
    title: 'Supportive Care — Mild Toxicity',
    body: '**For mild digoxin toxicity:**\n\n**GI decontamination:**\n• [Activated Charcoal](#/drug/activated-charcoal/digoxin) 1 g/kg (max 50g) if within 1-2 hours of ingestion [2]\n\n**Electrolyte management:**\n• **Correct hypokalemia cautiously** — target low-normal range (3.5-4.0 mEq/L). Overcorrection can cause hyperkalemia as digoxin redistributes [2]\n• **Correct hypomagnesemia** — Mg²⁺ 2g IV, helps stabilize myocardium\n• Monitor calcium — hypercalcemia potentiates digoxin toxicity\n\n**Hold digoxin** and other AV nodal blocking agents.\n\n**Monitoring:**\n• Continuous telemetry\n• Serial digoxin levels (note: levels are meaningless post-DigiFab)\n• Serial K+, Mg²⁺, renal function\n• Repeat ECG with any clinical change\n\n**Poison Control:** 1-800-222-1222',
    citation: [2],
    treatment: {
      firstLine: {
        drug: 'Activated Charcoal',
        dose: '1 g/kg (max 50g)',
        route: 'PO',
        frequency: 'Once (consider multidose for severe ingestions)',
        duration: 'Within 1-2 hours of ingestion',
        notes: 'Enterohepatic circulation makes multidose potentially beneficial in severe cases.',
      },
      monitoring: 'Continuous telemetry. Serial K+, Mg2+, digoxin level. Repeat ECG with changes.',
    },
    next: 'dig-dispo',
  },
  {
    id: 'dig-avoid',
    type: 'info',
    module: 4,
    title: 'Treatments to Avoid',
    body: '🚫 **Avoid or use with extreme caution:**\n\n**Cardioversion:**\n• Can precipitate **refractory ventricular fibrillation** in digitalis-toxic heart [2]\n• If absolutely necessary (hemodynamically unstable VT/VF), use **lowest effective energy**\n• Have DigiFab ready before attempting\n\n**Calcium:**\n• Traditional teaching: avoid due to "stone heart" phenomenon (cardiac tetany from combined digoxin + Ca²⁺ effects)\n• Recent evidence suggests this is overstated — calcium is probably safe in small doses [4]\n• Most toxicologists still recommend **avoiding calcium unless life-threatening hyperkalemia with cardiac arrest**\n• If given: use low dose, give slowly, have DigiFab ready\n\n**Temporary pacing:**\n• Can trigger VF in sensitized myocardium\n• If needed: transvenous preferred, use lowest capture threshold\n• Ideally defer until after DigiFab\n\n**Beta-blockers and calcium channel blockers:**\n• Worsen bradycardia and AV block — hold these medications',
    citation: [2, 4],
    next: 'dig-fab',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 5: DigiFab (Digoxin Immune Fab)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'dig-fab',
    type: 'info',
    module: 5,
    title: 'DigiFab — Indications',
    body: '[DigiFab Dosing Calculator](#/calc/digifab-calculator)\n\n**Indications for DigiFab (Digoxin Immune Fab):** [2][3]\n\n**Life-threatening criteria:**\n• Life-threatening arrhythmia (VT, VF, high-grade AV block, symptomatic bradycardia unresponsive to atropine)\n• Hemodynamic instability (hypotension, shock)\n• **K+ >5.5 mEq/L** (in setting of digoxin toxicity)\n\n**Level-based criteria:**\n• Acute ingestion: digoxin level **>10 ng/mL** [3]\n• Chronic toxicity: digoxin level **>6 ng/mL** with symptoms [3]\n\n**Clinical gestalt:**\n• Significant ingestion with cardiac symptoms\n• Progressive toxicity despite supportive care\n• Known massive ingestion (even before symptoms develop)\n\n**Onset of action:** 30-60 minutes. Clinical improvement may take up to 4 hours [3].\n\n**Half-life:** 15-20 hours (Fab fragments are renally cleared).',
    citation: [2, 3],
    calculatorLinks: [
      { id: 'digifab-calculator', label: 'DigiFab Dosing Calculator' },
    ],
    next: 'dig-fab-dosing',
  },
  {
    id: 'dig-fab-dosing',
    type: 'question',
    module: 5,
    title: 'DigiFab Dosing',
    body: '**[Digoxin Immune Fab](#/drug/digifab/digoxin toxicity)** (DigiFab, Digibind)\n\n**Dosing depends on known information:**\n\n**1. If AMOUNT INGESTED is known (acute):**\nVials = (mg ingested x 0.8) / 0.5\n• The 0.8 accounts for ~80% bioavailability\n• Each vial binds ~0.5 mg digoxin\n\n**2. If SERUM LEVEL is known:**\nVials = (level ng/mL x weight kg) / 100\n\n**3. EMPIRIC dosing (most common in practice):**\n• **Acute poisoning:** 10-20 vials\n• **Chronic toxicity:** 3-6 vials\n• For chronic toxicity, start low and repeat as needed [3]\n\nSelect dosing method:',
    citation: [3],
    calculatorLinks: [
      { id: 'digifab-calculator', label: 'DigiFab Dosing Calculator' },
    ],
    options: [
      { label: 'Known amount ingested', description: 'Calculate: vials = (mg x 0.8) / 0.5', next: 'dig-fab-amount' },
      { label: 'Known serum level', description: 'Calculate: vials = (level x weight) / 100', next: 'dig-fab-level' },
      { label: 'Empiric dosing', description: 'Acute: 10-20 vials | Chronic: 3-6 vials', next: 'dig-fab-empiric' },
    ],
  },
  {
    id: 'dig-fab-amount',
    type: 'info',
    module: 5,
    title: 'DigiFab Dosing — Known Ingestion',
    body: '**Formula: Vials = (mg ingested x 0.8) / 0.5** [3]\n\n**Example:**\nPatient ingested forty 0.25 mg tablets = 10 mg total\nVials = (10 x 0.8) / 0.5 = 16 vials\n\n**Administration:**\n• Reconstitute each vial with 4 mL sterile water\n• Dilute in 100-250 mL NS\n• Infuse IV over 30 minutes\n• In cardiac arrest: may give as IV push [3]\n\n**Post-DigiFab:**\n• Response in 30-60 minutes (may take up to 4 hours)\n• May need repeat dosing — reassess at 1-2 hours\n• **Digoxin levels are MEANINGLESS post-Fab** — assay measures bound + free digoxin [3]\n\nRound up in severe toxicity. Better to over-treat than under-treat.',
    citation: [3],
    treatment: {
      firstLine: {
        drug: 'Digoxin Immune Fab (DigiFab)',
        dose: 'Vials = (mg ingested x 0.8) / 0.5',
        route: 'IV infusion over 30 min (IV push if arrest)',
        frequency: 'Once, may repeat at 1-2 hours if no response',
        duration: 'Single dose, redose PRN',
        notes: 'Onset 30-60 min. Round up in severe toxicity. Levels meaningless post-Fab.',
      },
      monitoring: 'Clinical response (arrhythmia resolution, K+ normalization). Do NOT follow digoxin levels.',
    },
    next: 'dig-fab-post',
  },
  {
    id: 'dig-fab-level',
    type: 'info',
    module: 5,
    title: 'DigiFab Dosing — Known Serum Level',
    body: '**Formula: Vials = (level ng/mL x weight kg) / 100** [3]\n\n**Example:**\n70 kg patient with level of 8 ng/mL\nVials = (8 x 70) / 100 = 5.6 → **6 vials**\n\n**Important notes:**\n• Level must be at steady state (≥6 hours post-ingestion) for accuracy\n• In acute ingestion, level may still be rising — use clinical judgment\n• In chronic toxicity, lower levels may cause significant toxicity\n\n**Administration:**\n• Reconstitute each vial with 4 mL sterile water\n• Dilute in 100-250 mL NS\n• Infuse IV over 30 minutes\n• In cardiac arrest: may give as IV push [3]\n\nRound up in severe toxicity.',
    citation: [3],
    treatment: {
      firstLine: {
        drug: 'Digoxin Immune Fab (DigiFab)',
        dose: 'Vials = (level ng/mL x weight kg) / 100',
        route: 'IV infusion over 30 min (IV push if arrest)',
        frequency: 'Once, may repeat at 1-2 hours if no response',
        duration: 'Single dose, redose PRN',
        notes: 'Level must be at steady state (≥6h post-ingestion). Round up in severe cases.',
      },
      monitoring: 'Clinical response. K+ normalization. Arrhythmia resolution. Do NOT follow dig levels.',
    },
    next: 'dig-fab-post',
  },
  {
    id: 'dig-fab-empiric',
    type: 'info',
    module: 5,
    title: 'DigiFab Dosing — Empiric',
    body: '**Empiric dosing when amount and level unknown:** [3]\n\n**Acute poisoning:**\n• **10-20 vials** initially\n• Use higher end (20 vials) for cardiac arrest or massive ingestion\n\n**Chronic toxicity:**\n• **3-6 vials** initially\n• Start low — chronic patients often need less\n• Redose in 1-2 hours if inadequate response\n\n**Rationale for lower chronic dosing:**\n• Smaller total body load in chronic toxicity\n• Risk of rapid reversal causing acute heart failure exacerbation or AF with rapid ventricular response (if dig was being used for rate control) [3]\n\n**Administration:**\n• Reconstitute each vial with 4 mL sterile water\n• Dilute in 100-250 mL NS\n• Infuse IV over 30 minutes\n• In cardiac arrest: may give as IV push',
    citation: [3],
    treatment: {
      firstLine: {
        drug: 'Digoxin Immune Fab (DigiFab)',
        dose: 'Acute: 10-20 vials | Chronic: 3-6 vials',
        route: 'IV infusion over 30 min (IV push if arrest)',
        frequency: 'Once, may repeat at 1-2 hours',
        duration: 'Until clinical response',
        notes: 'Start low in chronic. Redose if inadequate response at 1-2 hours.',
      },
      monitoring: 'Clinical response. K+ normalization. Watch for rapid reversal in chronic (may unmask underlying arrhythmia).',
    },
    next: 'dig-fab-post',
  },
  {
    id: 'dig-fab-post',
    type: 'info',
    module: 5,
    title: 'Post-DigiFab Management',
    body: '**After DigiFab administration:**\n\n**Response timeline:**\n• Initial response: 30-60 minutes\n• Full effect: may take up to 4 hours\n• Duration: 15-20 hour half-life (renal elimination) [3]\n\n**Repeat dosing:**\n• May repeat in 1-2 hours if inadequate clinical response\n• Consider if: persistent arrhythmia, persistent hyperkalemia, recurrent symptoms\n\n**Digoxin levels post-Fab:**\n• **MEANINGLESS** — standard assays measure TOTAL digoxin (bound + free)\n• Levels will appear falsely elevated for days\n• Follow clinical response, not levels [3]\n\n**Rebinding toxicity:**\n• Rare — can occur if Fab is renally cleared faster than digoxin redistributes\n• More common with massive ingestions\n• May need additional Fab doses\n\n**Allergic reactions:**\n• Rare (<1%), can occur in patients with sheep protein allergy or prior Fab exposure\n• Have epinephrine available',
    citation: [3],
    next: 'dig-dispo',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 6: Disposition
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'dig-dispo',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**Disposition depends on severity:**\n\n**All patients need:**\n• Continuous cardiac monitoring\n• Serial potassium and renal function\n• ECG with any clinical change\n\n**Dialysis is NOT effective** — digoxin has a large volume of distribution (5-7 L/kg). Hemodialysis does not significantly remove digoxin. Fab fragments are renally cleared but not enhanced by dialysis [2].\n\n**Psychiatric evaluation** is mandatory for all intentional ingestions.\n\nWhat is the disposition?',
    citation: [2],
    options: [
      { label: 'ICU admission', description: 'Any significant arrhythmia, DigiFab given, hemodynamic compromise, K+ >5.5', next: 'dig-icu', urgency: 'critical' },
      { label: 'Telemetry / Step-down', description: 'Mild symptoms, stable, normal K+, no significant arrhythmia', next: 'dig-tele' },
    ],
  },
  {
    id: 'dig-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU admission criteria:**\n• Any life-threatening arrhythmia (current or resolved)\n• DigiFab administered\n• Hemodynamic instability\n• K+ >5.5 mEq/L\n• High digoxin level (>10 acute, >6 chronic with symptoms)\n• Altered mental status\n• Requiring vasopressor support or pacing\n\n**ICU monitoring:**\n• Continuous telemetry — minimum 24 hours after last arrhythmia\n• Serial K+, Mg²⁺, BMP q6h initially\n• Serial ECGs with any clinical change\n• Watch for DigiFab rebinding toxicity in massive ingestions\n\n**Do NOT monitor digoxin levels post-Fab** — they are meaningless.\n\n**Restarting digoxin:**\n• Wait minimum 7 days after DigiFab (until Fab fragments cleared)\n• Consider alternative rate control if possible\n• Address precipitating factors first\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'ICU admission with continuous cardiac monitoring for minimum 24 hours. Serial electrolytes. Watch for rebinding toxicity in massive ingestions.',
    confidence: 'definitive',
    citation: [2, 3],
  },
  {
    id: 'dig-tele',
    type: 'result',
    module: 6,
    title: 'Telemetry / Monitored Bed',
    body: '**Telemetry admission criteria:**\n• Mild symptoms (GI, visual changes) without significant arrhythmia\n• Stable vital signs\n• Normal or near-normal potassium\n• Elevated level but no end-organ toxicity\n\n**Monitoring:**\n• Continuous telemetry — minimum 12-24 hours\n• Serial K+, Mg²⁺, BMP q6-12h\n• Repeat ECG q6h and with any clinical change\n• Hold digoxin and other AV nodal blocking agents\n\n**Escalation triggers → transfer to ICU:**\n• Any new arrhythmia\n• Rising potassium\n• Hemodynamic instability\n• Worsening symptoms\n\n**Discharge criteria:**\n• Asymptomatic ≥12-24 hours\n• Normal ECG\n• Normal or stable electrolytes\n• Digoxin level trending down (if not given DigiFab)\n• Identified and addressed precipitating cause\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'Telemetry admission with continuous monitoring for 12-24 hours. Serial electrolytes. Hold digoxin. Escalate to ICU for any arrhythmia or hemodynamic change.',
    confidence: 'recommended',
    citation: [2],
  },
];

export const DIGOXIN_TOXICITY_NODE_COUNT = DIGOXIN_TOXICITY_NODES.length;

export const DIGOXIN_TOXICITY_MODULE_LABELS = [
  'Recognition',
  'ECG Findings',
  'Risk Stratification',
  'Treatment',
  'DigiFab (Digoxin Immune Fab)',
  'Disposition',
];

export const DIGOXIN_TOXICITY_CITATIONS: Citation[] = [
  { num: 1, text: 'Hauptman PJ, et al. Digitalis. Circulation. 1999;99(9):1265-1270. PMID 10069797' },
  { num: 2, text: 'Hack JB. Digoxin. In: Goldfrank\'s Toxicologic Emergencies, 11th ed. McGraw-Hill. 2019.' },
  { num: 3, text: 'Lapostolle F, et al. Digoxin-specific Fab fragments as single first-line therapy in digitalis poisoning. Crit Care Med. 2008;36(11):3014-3018. PMID 18824903' },
  { num: 4, text: 'Chan BS, et al. Digoxin Poisoning. Clin Toxicol. 2022;60(5):533-548. PMID 35285386' },
];
