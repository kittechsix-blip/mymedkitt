// MedKitt — Beta-Blocker Overdose
// Beta-blocker toxicity: recognition, agent identification, glucagon, high-dose insulin euglycemia,
// vasopressor therapy, lipid emulsion, rescue therapies, and disposition.
// 7 modules: Recognition → Stabilization → HIET → Vasopressors → Lipid Emulsion → Rescue → Disposition
// 28 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const BETA_BLOCKER_OD_NODES: DecisionNode[] = [
  // ═══════════════════════════════════════════════════════════════
  // MODULE 1: Recognition & Agent Identification
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'bb-start',
    type: 'question',
    module: 1,
    title: 'Beta-Blocker Overdose — Initial Assessment',
    body: '[Beta-Blocker OD Steps Summary](#/info/bb-steps-summary) — quick reference.\n\nBeta-blocker toxicity causes **bradycardia, hypotension, and hypoglycemia** (the classic triad). Hypoglycemia is especially common in children [1][2].\n\n**Agent characteristics matter:**\n• **Lipophilic** (propranolol, metoprolol, carvedilol) — cross BBB → CNS depression, seizures\n• **Hydrophilic** (atenolol, nadolol) — less CNS effects, dialyzable\n• **Propranolol** — sodium channel blockade → QRS widening (treat like TCA with sodium bicarb)\n• **Sotalol** — QT prolongation, Torsades risk (Class III antiarrhythmic effect)\n• **Carvedilol** — alpha blockade → more profound hypotension\n\n[Agent-Specific Guide](#/info/bb-agent-guide) — propranolol, sotalol, carvedilol highlighted.\n\nWhat is the patient\'s current clinical status?',
    images: [{ src: 'images/beta-blocker-od/first-degree-avblock.jpg', alt: '12-lead ECG showing first-degree AV block with prolonged PR interval >300ms characteristic of beta-blocker toxicity', caption: 'Beta-blocker toxicity ECG — first-degree AV block (PR >300 ms). Progressive findings: PR prolongation → sinus bradycardia → junctional escape → QRS widening (propranolol adds Na⁺ channel blockade → treat like TCA). (CC BY-SA 4.0, James Heilman MD)' }],
    citation: [1, 2],
    calculatorLinks: [{ id: 'bb-agent-guide', label: 'Agent-Specific Guide' }],
    options: [
      { label: 'Mild — asymptomatic or mild bradycardia', description: 'Alert, HR 50-60, BP normal. No CNS depression.', next: 'bb-mild' },
      { label: 'Moderate — symptomatic bradycardia/hypotension', description: 'HR <50 or SBP <90, but no seizures or cardiac arrest.', next: 'bb-stabilize' },
      { label: 'Severe / Critical', description: 'Seizure, cardiac arrest, profound shock, or QRS widening.', next: 'bb-stabilize', urgency: 'critical' },
    ],

    summary: 'Classic triad: bradycardia + hypotension + hypoglycemia — propranolol causes QRS widening, sotalol causes QT prolongation',
    safetyLevel: 'warning',
  },
  {
    id: 'bb-mild',
    type: 'info',
    module: 1,
    title: 'Mild Toxicity — Monitoring',
    body: '**Mild beta-blocker toxicity:**\n• Sinus bradycardia (HR 50-60)\n• Normal blood pressure\n• Alert mental status\n• No hypoglycemia\n\n**Still requires close monitoring:**\n• Continuous cardiac monitoring\n• IV access\n• Baseline ECG — check for QRS widening (propranolol) or QT prolongation (sotalol)\n• Fingerstick glucose q1-2h (especially children)\n• Serial vitals q15-30 min\n\n**Extended-release formulations** can cause delayed and prolonged toxicity — observe for 24-48 hours [1][3].\n\nProceed to initial stabilization measures.',
    citation: [1, 3],
    next: 'bb-stabilize',

    summary: 'Mild toxicity still needs continuous monitoring — extended-release formulations cause delayed toxicity for 24-48h',
  },
  {
    id: 'bb-agent-specific',
    type: 'info',
    module: 1,
    title: 'Agent-Specific Considerations',
    body: '**PROPRANOLOL** — The Dangerous One:\n• Most lipophilic — crosses BBB easily\n• **Sodium channel blockade** → QRS widening (like TCA)\n• Seizures common\n• **Treat QRS >100ms with [Sodium Bicarbonate](#/drug/sodium-bicarbonate/propranolol) 1-2 mEq/kg** [1][2]\n\n**SOTALOL** — The Arrhythmogenic One:\n• Class III antiarrhythmic effect (K+ channel blockade)\n• **QT prolongation** → Torsades de pointes risk\n• Monitor QTc closely\n• Have [Magnesium Sulfate](#/drug/magnesium-sulfate/sotalol) 2g IV ready [1]\n• May require overdrive pacing for Torsades\n\n**CARVEDILOL** — The Hypotensive One:\n• Combined alpha + beta blockade\n• More profound hypotension due to alpha-1 blockade\n• May need higher vasopressor doses [1]\n\n**ATENOLOL/NADOLOL** — Hydrophilic:\n• Less CNS effects\n• Small volume of distribution\n• **Dialyzable** — consider hemodialysis in severe cases [1][3]',
    citation: [1, 2, 3],
    calculatorLinks: [{ id: 'bb-agent-guide', label: 'Agent-Specific Guide' }],
    next: 'bb-stabilize',

    summary: 'Propranolol: QRS widening → NaHCO3; Sotalol: QT/Torsades → Mg + pacing; Carvedilol: alpha block → worse hypotension',
    safetyLevel: 'critical',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 2: Initial Stabilization
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'bb-stabilize',
    type: 'info',
    module: 2,
    title: 'Initial Stabilization',
    body: '**Initiate immediately:**\n• ABCs — airway management if CNS depression\n• Two large-bore IVs\n• Continuous cardiac monitoring\n• 12-lead ECG — look for QRS widening (propranolol) or QT prolongation (sotalol)\n• Fingerstick glucose — treat hypoglycemia (D50 if needed)\n• BMP, lactate, blood gas\n\n**GI Decontamination:**\n• [Activated Charcoal](#/drug/activated-charcoal/beta blocker) 1 g/kg (max 50g) if ingestion within 1-2 hours and airway protected [1]\n• Consider whole bowel irrigation for sustained-release formulations [1]\n\n**First-line intervention:**\n• [Atropine](#/drug/atropine/beta blocker bradycardia) 0.5-1mg IV — usually ineffective but try first [1][2]\n• Expect minimal response — beta-blockers work downstream of muscarinic receptors',
    citation: [1, 2],
    next: 'bb-atropine',

    summary: 'ABCs, cardiac monitoring, ECG for QRS/QT, glucose, charcoal if <2h — atropine first but usually ineffective',
  },
  {
    id: 'bb-atropine',
    type: 'question',
    module: 2,
    title: 'Atropine Response',
    body: '**[Atropine](#/drug/atropine/beta blocker bradycardia)** 0.5-1mg IV\n• May repeat q3-5 min to max 3mg total\n• **Usually ineffective** in beta-blocker toxicity because it acts on muscarinic receptors, NOT beta receptors [1][2]\n• Worth trying as first step — occasionally helps\n\nDid atropine improve heart rate and blood pressure?',
    citation: [1, 2],
    options: [
      { label: 'Yes — improved', description: 'Monitor closely, may need additional therapy', next: 'bb-glucagon' },
      { label: 'No response — still bradycardic/hypotensive', description: 'Escalate to glucagon and calcium', next: 'bb-glucagon', urgency: 'urgent' },
      { label: 'Cardiac arrest or pulseless', description: 'ACLS with modifications', next: 'bb-arrest', urgency: 'critical' },
    ],

    summary: 'Atropine 0.5-1mg IV — usually ineffective (acts on muscarinic, not beta receptors); escalate to glucagon + calcium',
  },
  {
    id: 'bb-glucagon',
    type: 'info',
    module: 2,
    title: 'Glucagon — First-Line Therapy',
    body: '**[Glucagon](#/drug/glucagon/beta blocker overdose)** bypasses the blocked beta receptor and activates adenylate cyclase directly → increases cAMP → positive inotropic and chronotropic effects [1][2][4].\n\n**Dosing:**\n• **Bolus:** 3-5 mg IV over 1-2 minutes\n• May repeat bolus up to **10 mg total** if no response [1][2]\n• **Infusion:** 2-10 mg/hr once response achieved [1][4]\n\n**Practical tips:**\n• Onset: 1-3 minutes\n• Duration: ~15 minutes (hence need for infusion)\n• **Nausea/vomiting common** — pretreat with [Ondansetron](#/drug/ondansetron/nausea) if patient is alert\n• Reconstitute with supplied diluent or sterile water\n• Large doses may deplete hospital supply — call pharmacy early\n\n**Calcium** should be given simultaneously for additional inotropic support.',
    citation: [1, 2, 4],
    calculatorLinks: [{ id: 'bb-glucagon', label: 'Glucagon Dosing' }],
    treatment: {
      firstLine: {
        drug: 'Glucagon',
        dose: '3-5 mg IV bolus',
        route: 'IV over 1-2 min',
        frequency: 'May repeat up to 10 mg total',
        duration: 'Then 2-10 mg/hr infusion',
        notes: 'Bypasses beta receptor. Causes nausea — pretreat with antiemetic.',
      },
      monitoring: 'HR, BP q5 min during boluses. Glucose (can cause hyperglycemia). Vomiting precautions.',
    },
    next: 'bb-calcium',

    summary: 'Glucagon 3-5mg IV bolus (up to 10mg) then 2-10mg/hr infusion — bypasses blocked beta receptor via adenylate cyclase',
    safetyLevel: 'warning',
  },
  {
    id: 'bb-calcium',
    type: 'info',
    module: 2,
    title: 'Calcium — Inotropic Support',
    body: '**Calcium** improves myocardial contractility by increasing intracellular calcium availability [1][4].\n\n**Dosing (choose one):**\n• **[Calcium Gluconate](#/drug/calcium-gluconate/beta blocker)** 3g (30 mL of 10%) IV over 10-20 min\n• **[Calcium Chloride](#/drug/calcium-chloride/beta blocker)** 1g (10 mL of 10%) IV over 10-20 min — 3x more elemental Ca²⁺ but caustic (central line preferred)\n\n**May repeat** q10-20 min as needed [4].\n\n**Infusion:** 0.6-1.5 mEq Ca²⁺/kg/hr (gluconate or chloride) once response achieved.\n\n**Monitoring:**\n• Ionized calcium — target 2x normal (~2.0-2.5 mmol/L)\n• Watch for hypercalcemia symptoms (confusion, arrhythmias)\n• Check magnesium (often depleted)',
    citation: [1, 4],
    treatment: {
      firstLine: {
        drug: 'Calcium Gluconate 10%',
        dose: '3g (30 mL)',
        route: 'IV over 10-20 min',
        frequency: 'Repeat q10-20 min PRN',
        duration: 'Then infusion 0.6-1.5 mEq/kg/hr',
        notes: 'Safer peripherally. Target iCa 2x normal.',
      },
      alternative: {
        drug: 'Calcium Chloride 10%',
        dose: '1g (10 mL)',
        route: 'IV over 10-20 min (central line preferred)',
        frequency: 'Repeat q10-20 min PRN',
        duration: 'Then infusion',
        notes: '3x more elemental Ca. Caustic — central line preferred.',
      },
      monitoring: 'Ionized calcium. ECG for hypercalcemia (short QT). Magnesium level.',
    },
    next: 'bb-pacing',

    summary: 'Ca gluconate 3g or CaCl 1g IV — improves contractility; target iCa 2x normal, give simultaneously with glucagon',
  },
  {
    id: 'bb-pacing',
    type: 'question',
    module: 2,
    title: 'Pacing Consideration',
    body: '**External (transcutaneous) pacing** may be needed if bradycardia is refractory to atropine, glucagon, and calcium [1][2].\n\n**Key points:**\n• May not achieve electrical capture in severe toxicity — myocardium is "poisoned"\n• Even with capture, mechanical response may be poor\n• Bridge to other therapies, NOT definitive treatment\n• Consider transvenous pacing if transcutaneous capture difficult\n\n**Hemodynamic status after initial interventions?**',
    citation: [1, 2],
    options: [
      { label: 'Still hypotensive despite glucagon/calcium', description: 'Escalate to high-dose insulin', next: 'bb-hiet', urgency: 'urgent' },
      { label: 'Improved — HR and BP responding', description: 'Continue current therapy, close monitoring', next: 'bb-monitor' },
      { label: 'Cardiac arrest', description: 'ACLS with modifications', next: 'bb-arrest', urgency: 'critical' },
    ],

    summary: 'Pacing may not capture in severe toxicity — bridge to other therapies, assess for HIET escalation or arrest',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 3: High-Dose Insulin Euglycemia Therapy (HIET)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'bb-hiet',
    type: 'info',
    module: 3,
    title: 'High-Dose Insulin Euglycemia Therapy (HIET)',
    body: '**HIET** is a cornerstone of beta-blocker and calcium channel blocker toxicity management [1][4].\n\n**Mechanism:**\n• In toxic/shock states, the heart switches from fatty acid to glucose metabolism\n• High-dose insulin enhances cardiac glucose uptake → **positive inotropy**\n• Also improves vascular resistance via NO-mediated effects [4]\n\n**This is NOT DKA dosing — doses are much higher!**\n\n**Evidence:**\n• Multiple case series show hemodynamic improvement [1][4]\n• AACT Position Statement recommends HIET for CCB/BB toxicity [4]\n• Onset of hemodynamic effect: **15-60 minutes** (be patient) [4]',
    citation: [1, 4],
    calculatorLinks: [{ id: 'bb-hiet', label: 'HIET Protocol' }],
    next: 'bb-hiet-dosing',

    summary: 'HIET cornerstone of BB/CCB toxicity — enhances cardiac glucose uptake → positive inotropy; onset 15-60min, be patient',
    skippable: true,
  },
  {
    id: 'bb-hiet-dosing',
    type: 'info',
    module: 3,
    title: 'HIET Dosing Protocol',
    body: '**[Regular Insulin](#/drug/insulin-regular/beta blocker hiet) Protocol:**\n\n**Bolus:** 1 unit/kg IV push\n\n**Infusion:** Start at 1 unit/kg/hr\n• Titrate up to **10 units/kg/hr** based on hemodynamic response [1][4]\n• Some cases have used even higher doses\n\n**MUST co-administer:**\n\n1. **Dextrose:**\n   • D25 or D50 bolus to achieve glucose 150-250 mg/dL\n   • D10 or D25 infusion to maintain euglycemia\n   • May need 25-50g dextrose/hr [4]\n\n2. **Potassium:**\n   • Target K+ 3.5-4.5 mEq/L\n   • Insulin drives K+ intracellularly\n   • Replace aggressively (10-40 mEq/hr may be needed) [4]',
    citation: [1, 4],
    calculatorLinks: [{ id: 'bb-hiet', label: 'HIET Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Regular Insulin',
        dose: '1 unit/kg bolus, then 1-10 units/kg/hr',
        route: 'IV',
        frequency: 'Continuous infusion',
        duration: 'Until hemodynamically stable',
        notes: 'MUCH higher than DKA dosing. Onset 15-60 min. Be patient.',
      },
      monitoring: 'Glucose q15-30 min initially, then q1h. K+ q1h. Target glucose 150-250, K+ 3.5-4.5.',
    },
    next: 'bb-hiet-monitoring',

    summary: 'Insulin 1 unit/kg bolus → 1-10 units/kg/hr; MUST co-administer D10/D25 + aggressive K+ repletion (10-40 mEq/hr)',
    safetyLevel: 'critical',
  },
  {
    id: 'bb-hiet-monitoring',
    type: 'info',
    module: 3,
    title: 'HIET Monitoring',
    body: '**Monitoring during HIET:**\n\n**Glucose:**\n• Check q15-30 min initially, then q1h once stable\n• Target: 150-250 mg/dL\n• Hypoglycemia is the main risk — have D50 at bedside\n\n**Potassium:**\n• Check q1h\n• Target: 3.5-4.5 mEq/L\n• Aggressive repletion often needed (10-40 mEq/hr IV)\n\n**Hemodynamics:**\n• Expect improvement in 15-60 minutes [4]\n• Can take longer — be patient before declaring failure\n• Arterial line recommended for continuous BP monitoring\n\n**Lactate:**\n• Trend lactate clearance as marker of perfusion\n\n**Duration:**\n• Continue until patient hemodynamically stable for 12-24 hours\n• Wean gradually (halve rate q2-4h while monitoring)',
    citation: [4],
    next: 'bb-hiet-response',

    summary: 'Glucose q15-30min (target 150-250), K+ q1h (target 3.5-4.5) — hypoglycemia is main risk, D50 at bedside',
    safetyLevel: 'warning',
  },
  {
    id: 'bb-hiet-response',
    type: 'question',
    module: 3,
    title: 'HIET Response Assessment',
    body: '**HIET can be used with vasopressors** — they are complementary, not mutually exclusive [1][4].\n\nAssess hemodynamic response after 30-60 minutes of HIET.',
    citation: [1, 4],
    options: [
      { label: 'Improving', description: 'BP and perfusion improving', next: 'bb-monitor' },
      { label: 'Still hypotensive', description: 'Add or escalate vasopressors', next: 'bb-pressors', urgency: 'urgent' },
      { label: 'Refractory shock', description: 'Consider lipid emulsion and rescue therapies', next: 'bb-lipid', urgency: 'critical' },
    ],

    summary: 'Assess HIET response at 30-60min — complementary with vasopressors, escalate to lipid emulsion if refractory',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 4: Vasopressor Therapy
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'bb-pressors',
    type: 'info',
    module: 4,
    title: 'Vasopressor Therapy',
    body: '**Vasopressors** are often needed as bridge therapy while waiting for HIET onset or as adjunct [1][2].\n\n**Key concept:** Beta receptors are blocked → standard doses may be insufficient. **HIGH DOSES** often required [1][2].\n\n**First-line: [Norepinephrine](#/drug/norepinephrine/beta blocker shock)**\n• Alpha > beta effects\n• Start at 0.1 mcg/kg/min, titrate to MAP ≥65\n• May need **0.5-3 mcg/kg/min** — much higher than sepsis dosing [1][2]\n\n**If cardiogenic component: [Epinephrine](#/drug/epinephrine/beta blocker shock)**\n• Combined alpha + beta agonism\n• Start 0.1 mcg/kg/min, titrate to effect\n• Beta effects partially overcome receptor blockade at high doses',
    citation: [1, 2],
    calculatorLinks: [{ id: 'bb-pressors', label: 'High-Dose Pressor Guide' }],
    treatment: {
      firstLine: {
        drug: 'Norepinephrine',
        dose: '0.1-3 mcg/kg/min',
        route: 'IV infusion (central line)',
        frequency: 'Continuous',
        duration: 'Until hemodynamically stable',
        notes: 'Higher doses than sepsis. Titrate to MAP ≥65.',
      },
      alternative: {
        drug: 'Epinephrine',
        dose: '0.1-1 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until hemodynamically stable',
        notes: 'Add for cardiogenic component. Combined alpha + beta effects.',
      },
      monitoring: 'Arterial line for continuous BP. Urine output. Lactate clearance. End-organ perfusion.',
    },
    next: 'bb-pressors-adjunct',

    summary: 'HIGH-DOSE norepi 0.1-3 mcg/kg/min needed — standard doses insufficient when beta receptors blocked; add epi for cardiogenic',
    safetyLevel: 'warning',
  },
  {
    id: 'bb-pressors-adjunct',
    type: 'info',
    module: 4,
    title: 'Adjunct Vasopressors',
    body: '**[Vasopressin](#/drug/vasopressin/beta blocker shock)**\n• 0.04 units/min (fixed dose)\n• Bypasses adrenergic receptors entirely — V1 receptor agonist\n• Add to norepinephrine for refractory hypotension [1][2]\n\n**Dopamine:**\n• Less effective — beta-2 effects blocked\n• Not recommended as first-line [1]\n\n**Dobutamine:**\n• Pure beta agonist — ineffective when beta receptors are blocked\n• Avoid [1]\n\n**Phenylephrine:**\n• Pure alpha agonist\n• May worsen bradycardia by reflex\n• Use only if severe tachycardia present\n\n**Key principle:** Multiple vasopressors often needed simultaneously. This is a toxicological emergency — don\'t be afraid to escalate rapidly.',
    citation: [1, 2],
    next: 'bb-pressors-response',

    summary: 'Vasopressin 0.04 units/min bypasses adrenergic receptors — AVOID dobutamine (beta blocked) and dopamine (less effective)',
  },
  {
    id: 'bb-pressors-response',
    type: 'question',
    module: 4,
    title: 'Vasopressor Response',
    body: 'Assess hemodynamic response to vasopressor therapy.',
    options: [
      { label: 'Responding — MAP ≥65', description: 'Continue current therapy', next: 'bb-monitor' },
      { label: 'Refractory shock', description: 'Escalate to lipid emulsion therapy', next: 'bb-lipid', urgency: 'critical' },
    ],

    summary: 'Assess vasopressor response — MAP ≥65 continue, refractory escalate to lipid emulsion therapy',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 5: Lipid Emulsion Therapy
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'bb-lipid',
    type: 'info',
    module: 5,
    title: 'Lipid Emulsion Therapy (ILE/Intralipid)',
    body: '**[Intralipid 20%](#/drug/lipid-emulsion/beta blocker)** — rescue therapy for refractory toxicity, especially with **lipophilic agents** (propranolol, metoprolol, carvedilol) [1][5].\n\n**Proposed mechanisms:**\n• **Lipid sink** — sequesters lipophilic drug away from target tissues\n• Improved cardiac metabolism via fatty acid supply\n• Direct positive inotropic effect [5]\n\n**Best evidence:** Lipophilic beta-blockers (propranolol) and local anesthetic toxicity. Less evidence for hydrophilic agents (atenolol) [1][5].\n\n**When to use:**\n• Cardiac arrest\n• Refractory shock despite glucagon + calcium + HIET + vasopressors\n• Life-threatening toxicity from lipophilic agent',
    citation: [1, 5],
    calculatorLinks: [{ id: 'bb-intralipid', label: 'Intralipid Dosing' }],
    next: 'bb-lipid-dosing',

    summary: 'Intralipid 20% rescue for refractory toxicity — lipid sink for propranolol/metoprolol/carvedilol; less evidence for hydrophilic agents',
  },
  {
    id: 'bb-lipid-dosing',
    type: 'info',
    module: 5,
    title: 'Lipid Emulsion Dosing',
    body: '**[Intralipid 20%](#/drug/lipid-emulsion/beta blocker) Protocol:**\n\n**Bolus:** 1.5 mL/kg IV over 1 minute\n• May repeat bolus x2 if needed (q5 min) [1][5]\n\n**Infusion:** 0.25-0.5 mL/kg/min for 30-60 min\n\n**Maximum dose:** 10-12 mL/kg over the first hour [5]\n\n**Practical tips:**\n• Use 20% lipid emulsion (Intralipid, Liposyn)\n• Standard bag is 500 mL\n• For 70kg adult: bolus ~105 mL, infusion ~1L+ over first hour\n• Can give through peripheral or central line\n\n**Side effects:**\n• Lipemia — interferes with lab assays\n• Pancreatitis (rare)\n• Fat embolism (theoretical)',
    citation: [1, 5],
    calculatorLinks: [{ id: 'bb-intralipid', label: 'Intralipid Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Intralipid 20%',
        dose: '1.5 mL/kg bolus over 1 min',
        route: 'IV',
        frequency: 'May repeat bolus x2 q5 min',
        duration: 'Then 0.25-0.5 mL/kg/min x30-60 min',
        notes: 'Max 10-12 mL/kg in first hour. Best for lipophilic agents.',
      },
      monitoring: 'Hemodynamics. Lipemia (interferes with labs). Triglycerides.',
    },
    next: 'bb-rescue',

    summary: 'Intralipid 1.5 mL/kg bolus (repeat x2), then 0.25-0.5 mL/kg/min x30-60min — max 10-12 mL/kg first hour',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 6: Rescue Therapies
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'bb-rescue',
    type: 'question',
    module: 6,
    title: 'Rescue Therapies',
    body: '**Additional rescue options** based on agent and clinical scenario [1][2][3].\n\nWhich clinical scenario applies?',
    citation: [1, 2, 3],
    options: [
      { label: 'Propranolol with QRS widening', description: 'Sodium channel blockade — treat like TCA', next: 'bb-propranolol', urgency: 'critical' },
      { label: 'Sotalol with QT prolongation/Torsades', description: 'Magnesium and pacing', next: 'bb-sotalol', urgency: 'critical' },
      { label: 'Refractory shock — ECMO candidate', description: 'Consider VA-ECMO', next: 'bb-ecmo', urgency: 'critical' },
      { label: 'Atenolol/Nadolol — dialysis candidate', description: 'Hydrophilic agent, small Vd', next: 'bb-dialysis' },
      { label: 'Refractory vasoplegia', description: 'Methylene blue consideration', next: 'bb-methylene' },
      { label: 'Stable — proceed to disposition', description: 'No rescue therapies needed', next: 'bb-disposition' },
    ],

    summary: 'Route to agent-specific rescue: propranolol QRS→NaHCO3, sotalol QT→Mg, ECMO, dialysis, or methylene blue for vasoplegia',
  },
  {
    id: 'bb-propranolol',
    type: 'info',
    module: 6,
    title: 'Propranolol — Sodium Channel Blockade',
    body: '**Propranolol** has unique sodium channel blocking properties (like TCAs) [1][2].\n\n**If QRS > 100 ms:**\n• **[Sodium Bicarbonate](#/drug/sodium-bicarbonate/propranolol)** 1-2 mEq/kg IV push\n• Repeat q3-5 min until QRS narrows\n• Target pH 7.50-7.55\n• Same protocol as TCA toxicity\n\n**Seizure management:**\n• Propranolol is highly lipophilic — seizures common\n• **[Lorazepam](#/drug/lorazepam/seizure)** 0.1 mg/kg IV (max 4 mg) first-line\n• Avoid phenytoin (sodium channel blocker)\n\nSee [TCA Toxidrome Tree](#/tree/tca-toxidrome) for detailed sodium bicarbonate protocol.',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Sodium Bicarbonate 8.4%',
        dose: '1-2 mEq/kg',
        route: 'IV push',
        frequency: 'Repeat q3-5 min until QRS narrows',
        duration: 'Until QRS <100 ms',
        notes: 'Same as TCA protocol. Target pH 7.50-7.55.',
      },
      monitoring: 'Serial ECGs q15 min. ABG. Na (keep <155). K+ (replete).',
    },
    next: 'bb-disposition',

    summary: 'Propranolol QRS >100ms: NaHCO3 1-2 mEq/kg IV push → target pH 7.50-7.55; avoid phenytoin for seizures',
    safetyLevel: 'critical',
  },
  {
    id: 'bb-sotalol',
    type: 'info',
    module: 6,
    title: 'Sotalol — QT Prolongation & Torsades',
    body: '**Sotalol** has Class III antiarrhythmic effects (K+ channel blockade) [1].\n\n**Unique risks:**\n• QT prolongation\n• Torsades de pointes\n• Delayed arrhythmias (may occur hours after ingestion)\n\n**Management:**\n• **[Magnesium Sulfate](#/drug/magnesium-sulfate/sotalol)** 2g IV over 2-5 min — give prophylactically if QTc prolonged\n• For Torsades: Mag 2g IV push + **overdrive pacing** (set rate 100-120 bpm to suppress)\n• Isoproterenol infusion to increase heart rate if pacing unavailable\n• **Avoid amiodarone** — further QT prolongation\n\n**Monitoring:**\n• Extended observation (24-48h) — delayed arrhythmias possible\n• Continuous telemetry essential',
    citation: [1],
    treatment: {
      firstLine: {
        drug: 'Magnesium Sulfate',
        dose: '2g',
        route: 'IV over 2-5 min',
        frequency: 'Repeat PRN, then 1-2g/hr infusion',
        duration: 'Until QTc normalizes',
        notes: 'Give prophylactically if QTc prolonged. Overdrive pace for Torsades.',
      },
      monitoring: 'Continuous telemetry. QTc on serial ECGs. Mg level.',
    },
    next: 'bb-disposition',

    summary: 'Sotalol: Mg 2g IV prophylactically if QTc prolonged + overdrive pacing for Torsades — AVOID amiodarone (further QT prolongation)',
    safetyLevel: 'critical',
  },
  {
    id: 'bb-dialysis',
    type: 'info',
    module: 6,
    title: 'Hemodialysis — Hydrophilic Agents',
    body: '**Hemodialysis** is effective for hydrophilic beta-blockers with small volumes of distribution [1][3]:\n\n**Dialyzable agents:**\n• **Atenolol** — most dialyzable, Vd 1 L/kg\n• **Nadolol** — small Vd, renally cleared\n• **Sotalol** — dialyzable (but prolonged monitoring still needed for arrhythmias)\n• **Acebutolol** — partially dialyzable\n\n**NOT dialyzable (lipophilic, large Vd):**\n• Propranolol\n• Metoprolol\n• Carvedilol\n• Labetalol\n\n**Indications for dialysis [3]:**\n• Severe toxicity from dialyzable agent\n• Refractory to standard therapy\n• Renal failure limiting drug clearance',
    citation: [1, 3],
    next: 'bb-disposition',

    summary: 'Atenolol/nadolol are dialyzable (small Vd, hydrophilic) — propranolol/metoprolol/carvedilol are NOT dialyzable',
  },
  {
    id: 'bb-methylene',
    type: 'info',
    module: 6,
    title: 'Methylene Blue — Refractory Vasoplegia',
    body: '**[Methylene Blue](#/drug/methylene-blue/vasoplegia)** — experimental but used in refractory vasodilatory shock [2].\n\n**Mechanism:**\n• Inhibits nitric oxide synthase and guanylate cyclase\n• Counteracts pathological vasodilation\n• Improves vascular tone independent of adrenergic receptors\n\n**Dosing:**\n• 1-2 mg/kg IV over 15-30 min\n• May repeat or start infusion 0.5-1 mg/kg/hr\n\n**Cautions:**\n• Contraindicated with serotonergic drugs (serotonin syndrome risk)\n• G6PD deficiency — can cause hemolysis\n• Interferes with pulse oximetry (falsely low SpO2)\n\n**Evidence:** Case reports only in BB/CCB toxicity. Consider when everything else has failed.',
    citation: [2],
    treatment: {
      firstLine: {
        drug: 'Methylene Blue',
        dose: '1-2 mg/kg',
        route: 'IV over 15-30 min',
        frequency: 'May repeat or infusion 0.5-1 mg/kg/hr',
        duration: 'Until vasoplegia resolves',
        notes: 'Experimental. Avoid if on serotonergics or G6PD deficient.',
      },
      monitoring: 'BP. SpO2 may read falsely low. Hemolysis if G6PD deficient.',
    },
    next: 'bb-disposition',

    summary: 'Methylene blue 1-2 mg/kg IV for refractory vasoplegia — contraindicated with serotonergics (serotonin syndrome) and G6PD',
    safetyLevel: 'warning',
  },
  {
    id: 'bb-ecmo',
    type: 'info',
    module: 6,
    title: 'VA-ECMO — Rescue for Refractory Shock',
    body: '**VA-ECMO** is the last resort for refractory cardiogenic shock or cardiac arrest [1][2].\n\n**Key principle:** Beta-blocker toxicity is **potentially REVERSIBLE** — aggressive bridge therapy can lead to full neurologic recovery.\n\n**When to consider:**\n• Cardiac arrest refractory to all pharmacological therapies\n• Refractory shock despite maximum support (glucagon + calcium + HIET + high-dose pressors + lipid)\n• Young patient with reversible cause\n\n**Actions:**\n• Contact cardiac surgery/ECMO team EARLY if trajectory suggests need\n• Continue full resuscitation while arranging\n• Bridge therapy until drug metabolized/eliminated\n\n**Prognosis:** Case reports document full recovery after prolonged ECMO support for BB/CCB toxicity.',
    citation: [1, 2],
    next: 'bb-disposition',

    summary: 'VA-ECMO last resort — BB toxicity is REVERSIBLE, aggressive bridge therapy can lead to full neurologic recovery',
  },
  {
    id: 'bb-arrest',
    type: 'info',
    module: 6,
    title: 'Cardiac Arrest — Modified ACLS',
    body: '**Cardiac arrest from beta-blocker toxicity requires modified ACLS [1][2]:**\n\n**During CPR give ALL of these:**\n• **[Epinephrine](#/drug/epinephrine/cardiac arrest)** — high-dose (standard 1mg may be inadequate when beta-blocked)\n• **[Glucagon](#/drug/glucagon/beta blocker arrest)** 5-10mg IV bolus\n• **[Calcium Chloride](#/drug/calcium-chloride/beta blocker arrest)** 1-3g IV\n• **[Intralipid 20%](#/drug/lipid-emulsion/beta blocker arrest)** 1.5 mL/kg bolus, may repeat\n\n**Prolonged resuscitation:**\n• Toxicological arrests are potentially reversible\n• Continue CPR longer than typical (30-60+ min reasonable)\n• Consider ECMO if available and appropriate candidate\n\n**If ROSC:**\n• Start HIET immediately\n• Continue glucagon infusion\n• Vasopressor infusions\n• ICU with continuous monitoring',
    citation: [1, 2],
    next: 'bb-disposition',

    summary: 'Cardiac arrest: give ALL — high-dose epi, glucagon 5-10mg, CaCl 1-3g, Intralipid; CPR 30-60+ min, consider ECMO',
    safetyLevel: 'critical',
  },
  {
    id: 'bb-monitor',
    type: 'info',
    module: 6,
    title: 'Ongoing Monitoring',
    body: '**Monitoring during treatment:**\n\n• Continuous cardiac telemetry\n• Arterial line for continuous BP if on vasopressors\n• Fingerstick glucose q1h (HIET) or q2h (without HIET)\n• BMP q4-6h (K+, glucose, renal function)\n• Lactate q4-6h to assess perfusion\n• Serial ECGs for propranolol (QRS) or sotalol (QT)\n\n**Wean therapies gradually:**\n• Glucagon infusion: halve rate q2h while monitoring\n• HIET: halve rate q2-4h, may need dextrose for 12-24h after stopping\n• Vasopressors: wean by 10-20% q30-60 min\n\n**Watch for rebound:**\n• Extended-release formulations: toxicity may recur\n• Continue monitoring 24-48h for sustained-release ingestions',
    citation: [1, 3],
    next: 'bb-disposition',

    summary: 'Wean therapies gradually — extended-release toxicity may recur, continue monitoring 24-48h for sustained-release',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 7: Disposition
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'bb-disposition',
    type: 'question',
    module: 7,
    title: 'Disposition',
    body: '**Psychiatric evaluation is MANDATORY** for all intentional ingestions after medical clearance [1].\n\n**Extended-release formulations** require prolonged observation (24-48h) due to delayed absorption and prolonged effects [1][3].\n\nWhat is the patient\'s current clinical status?',
    citation: [1, 3],
    options: [
      { label: 'ICU admission', description: 'Any hemodynamic instability, arrhythmias, or requiring infusions', next: 'bb-icu', urgency: 'critical' },
      { label: 'Monitored bed', description: 'Stable but requires observation', next: 'bb-monitored' },
      { label: 'Discharge candidate', description: 'Asymptomatic, immediate-release, 6+ hours observation', next: 'bb-discharge' },
    ],

    summary: 'Psych eval MANDATORY for intentional ingestion — extended-release requires 24-48h observation due to delayed effects',
    safetyLevel: 'warning',
  },
  {
    id: 'bb-icu',
    type: 'result',
    module: 7,
    title: 'ICU Admission',
    body: '**ICU admission criteria:**\n• Any hemodynamic instability (bradycardia, hypotension)\n• Required glucagon, calcium, HIET, or vasopressors\n• Cardiac arrhythmias\n• QRS widening (propranolol) or QT prolongation (sotalol)\n• Altered mental status or seizures\n• Hypoglycemia requiring treatment\n\n**In the ICU:**\n• Continuous telemetry\n• Serial ECGs q4-6h\n• Monitor glucose and K+ frequently if on HIET\n• Extended-release: observe minimum 24-48 hours [1][3]\n• Sotalol: watch for delayed arrhythmias\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'ICU admission with continuous cardiac monitoring. Continue glucagon/HIET/pressors as needed. Observe 24-48h for extended-release ingestions.',
    confidence: 'definitive',
    citation: [1, 3],
  },
  {
    id: 'bb-monitored',
    type: 'result',
    module: 7,
    title: 'Monitored Bed — Observation',
    body: '**Monitored bed criteria:**\n• Asymptomatic or mildly symptomatic\n• Normal or near-normal vital signs\n• Normal ECG\n• Immediate-release formulation\n\n**Monitoring protocol:**\n• Continuous telemetry\n• Vitals q1h x4, then q2h\n• Fingerstick glucose q2-4h\n• Serial ECGs if concerning agent (propranolol, sotalol)\n• Minimum 6h observation for immediate-release [1]\n• Minimum 24h for extended-release [1][3]\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'Telemetry observation. Minimum 6h for immediate-release, 24h for extended-release. Escalate to ICU if any deterioration.',
    confidence: 'recommended',
    citation: [1, 3],
  },
  {
    id: 'bb-discharge',
    type: 'result',
    module: 7,
    title: 'Discharge Criteria',
    body: '**Safe for discharge ONLY if ALL criteria met [1]:**\n• Asymptomatic for ≥6 hours\n• Normal vital signs throughout observation\n• Normal ECG\n• Normal glucose\n• **Immediate-release formulation only** — extended-release requires longer observation\n• **Psychiatric clearance obtained** (MANDATORY for intentional ingestions)\n\n**Before discharge:**\n• Document lethal means counseling\n• Counsel family/caregivers to secure medications\n• Ensure psychiatric follow-up arranged\n• Return precautions for bradycardia, dizziness, syncope\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'Discharge with psychiatric clearance after 6+ hours of asymptomatic observation (immediate-release only).',
    confidence: 'recommended',
    citation: [1],
  },
];

export const BETA_BLOCKER_OD_NODE_COUNT = BETA_BLOCKER_OD_NODES.length;

export const BETA_BLOCKER_OD_MODULE_LABELS = [
  'Recognition & Agent Identification',
  'Initial Stabilization',
  'High-Dose Insulin (HIET)',
  'Vasopressor Therapy',
  'Lipid Emulsion Therapy',
  'Rescue Therapies',
  'Disposition',
];

export const BETA_BLOCKER_OD_CRITICAL_ACTIONS = [
  { text: 'Glucagon 3-10 mg IV bolus, then 2-10 mg/hr infusion (bypasses blocked beta receptor)', nodeId: 'bb-glucagon' },
  { text: 'Calcium chloride 1g IV or calcium gluconate 3g IV for inotropic support', nodeId: 'bb-calcium' },
  { text: 'High-dose insulin euglycemia therapy (HIET): 1 unit/kg bolus, then 1-10 units/kg/hr infusion', nodeId: 'bb-hiet-dosing' },
  { text: 'Co-administer dextrose (D10/D25 infusion) and monitor glucose q15-30 min during HIET', nodeId: 'bb-hiet-monitoring' },
  { text: 'Aggressive potassium repletion during HIET (target K+ 3.5-4.5, may need 10-40 mEq/hr)', nodeId: 'bb-hiet-monitoring' },
  { text: 'High-dose vasopressors often required (norepinephrine 0.5-3 mcg/kg/min, epinephrine)', nodeId: 'bb-pressors' },
  { text: 'Intralipid 20%: 1.5 mL/kg bolus for refractory shock from lipophilic agents (propranolol, carvedilol)', nodeId: 'bb-lipid' },
  { text: 'Sodium bicarbonate 1-2 mEq/kg IV for propranolol with QRS >100ms (treat like TCA)', nodeId: 'bb-propranolol' },
  { text: 'Magnesium 2g IV for sotalol-induced QT prolongation/Torsades + overdrive pacing', nodeId: 'bb-sotalol' },
  { text: 'Consider hemodialysis for atenolol/nadolol (hydrophilic, dialyzable)', nodeId: 'bb-dialysis' },
];

export const BETA_BLOCKER_OD_CITATIONS: Citation[] = [
  { num: 1, text: 'Graudins A, Lee HM, Druda D. Calcium Channel Blocker and Beta-Blocker Toxicity. Emerg Med Clin North Am. 2022;40(3):531-546.' },
  { num: 2, text: 'Levine M, Hoffman RS, Lavergne V, et al. Systematic review of the effect of intravenous lipid emulsion therapy for non-local anesthetic toxicity. Clin Toxicol. 2016;54(3):194-221.' },
  { num: 3, text: 'Love JN, Howell JM, Litovitz TL, Klein-Schwartz W. Acute beta blocker overdose: factors associated with the development of cardiovascular morbidity. J Toxicol Clin Toxicol. 2000;38(3):275-281.' },
  { num: 4, text: 'St-Onge M, Anseeuw K, Cantrell FL, et al. Experts Consensus Recommendations for the Management of Calcium Channel Blocker Poisoning in Adults. Crit Care Med. 2017;45(3):e306-e315.' },
  { num: 5, text: 'Cave G, Harvey M. Intravenous lipid emulsion as antidote beyond local anesthetic toxicity: a systematic review. Acad Emerg Med. 2009;16(9):815-824.' },
];
