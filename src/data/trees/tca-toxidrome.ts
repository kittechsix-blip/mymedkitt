// MedKitt — TCA Overdose
// Tricyclic antidepressant toxicity: recognition, ECG interpretation, sodium bicarbonate protocol,
// seizure management, hemodynamic support, and disposition.
// 6 modules: Recognition → ECG → Bicarbonate → Seizures → Hemodynamics → Disposition
// 32 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const TCA_TOXIDROME_NODES: DecisionNode[] = [
  // ═══════════════════════════════════════════════════════════════
  // MODULE 1: Recognition & Initial Stabilization
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tca-start',
    type: 'question',
    module: 1,
    title: 'TCA Overdose — Initial Assessment',
    body: '[TCA Overdose Steps Summary](#/info/tca-steps-summary) — quick reference.\n\nTricyclic antidepressants remain a leading cause of death from prescription drug overdose. **Narrow therapeutic index** — lethal dose is only 3-5× the therapeutic dose [1][3].\n\n**Multiple mechanisms of toxicity:**\n• **Sodium channel blockade** → QRS widening → ventricular arrhythmias (most dangerous)\n• Anticholinergic effects → tachycardia, mydriasis, AMS\n• Alpha-1 blockade → hypotension\n• GABA-A antagonism → seizures\n• K+ channel blockade → QT prolongation\n\n⚠️ **Toxicity can progress from alert to cardiac arrest within 1 hour** [1][16].\n\nCommon TCAs: amitriptyline, nortriptyline, imipramine, desipramine, doxepin, clomipramine.\n\n[Agents That Block Sodium Channels](#/info/tca-na-blockers) — comprehensive list.\n\nWhat is the patient\'s current clinical status?',
    citation: [1, 3, 16],
    options: [
      { label: 'Mild — anticholinergic features', description: 'Alert, tachycardic, mydriasis, dry skin. No seizures, no hemodynamic instability.', next: 'tca-mild' },
      { label: 'Moderate — altered mental status', description: 'Drowsy to obtunded, tachycardia, but no seizures or wide QRS.', next: 'tca-critical' },
      { label: 'Severe / Critical', description: 'Seizure, wide QRS, arrhythmia, hypotension, or coma.', next: 'tca-critical', urgency: 'critical' },
    ],
  },
  {
    id: 'tca-mild',
    type: 'info',
    module: 1,
    title: 'Anticholinergic Toxidrome',
    body: '**"Blind as a bat, dry as a bone, hot as a hare, red as a beet, mad as a hatter, full as a flask"** [3][13]\n\n• **Tachycardia** (most common cardiac finding)\n• Mydriasis (dilated pupils)\n• Dry skin and mucous membranes\n• Urinary retention, decreased bowel sounds\n• Hyperthermia\n• Agitation → delirium → coma\n\n**Sinus tachycardia** is the most common ECG finding and may be the only abnormality in mild toxicity [1].\n\n⚠️ Do NOT be reassured by mild symptoms — rapid deterioration is possible. Proceed to ECG assessment immediately.',
    citation: [3, 13],
    next: 'tca-decon',
  },
  {
    id: 'tca-critical',
    type: 'info',
    module: 1,
    title: 'Immediate Resuscitation',
    body: '**Initiate immediately:**\n• Continuous cardiac monitoring\n• Two large-bore IVs\n• **12-lead ECG STAT** — most important test [1][3]\n• BMP, blood gas (pH), lactate, glucose\n• Acetaminophen and salicylate levels (coingestion screening)\n• Urine drug screen (false positives common: diphenhydramine, cyclobenzaprine, carbamazepine) [3]\n\n⚠️ **TCA levels are NOT useful** for acute management — do not correlate with toxicity [3][16].\n\nIf QRS already widened: give [Sodium Bicarbonate](#/drug/sodium-bicarbonate/tca overdose) 1-2 mEq/kg IV push immediately while continuing assessment [4][16].\n\n**If airway compromise or GCS ≤12** → intubate (see intubation considerations below).',
    citation: [1, 3, 4, 16],
    next: 'tca-decon',
  },
  {
    id: 'tca-decon',
    type: 'question',
    module: 1,
    title: 'GI Decontamination',
    body: '[Activated Charcoal](#/drug/activated-charcoal/tca decontamination) — 1 g/kg PO (max 50g) [4][18]\n\nAnticholinergic effects **delay gastric emptying** → charcoal may be beneficial even beyond the typical 1-2 hour window [3][16].\n\n⚠️ **Do NOT induce emesis** — risk of rapid deterioration [4].\n\nIs the airway protected?',
    citation: [3, 4, 16, 18],
    options: [
      { label: 'Airway protected + ≤2h since ingestion', description: 'Give activated charcoal 1 g/kg (max 50g)', next: 'tca-ecg' },
      { label: 'Airway protected + >2h', description: 'Consider charcoal — anticholinergic effects delay gastric emptying', next: 'tca-ecg' },
      { label: 'Airway NOT protected', description: 'Intubate first or skip charcoal', next: 'tca-intubation' },
    ],
  },
  {
    id: 'tca-intubation',
    type: 'info',
    module: 1,
    title: 'Intubation Considerations',
    body: '**Indications:** GCS ≤12, seizures, hypoventilation with respiratory acidosis [16].\n\n⚠️ **CRITICAL: Avoid hypoventilation post-intubation** — respiratory acidosis worsens TCA toxicity by increasing free (unbound) drug, creating a vicious spiral [16][17].\n\n**Before intubation:**\n• Give [Sodium Bicarbonate](#/drug/sodium-bicarbonate/tca overdose) if QRS wide — allow minutes for CO₂ to blow off\n• Start vasopressor if hypotensive\n\n**Post-intubation:**\n• **Immediately hyperventilate** — target ETCO₂ ~25-30 mmHg while bicarb takes effect [16][17]\n• Sedate with [Propofol](#/drug/propofol/tca refractory seizure) (hemodynamically stable) or benzodiazepine (unstable) — both provide seizure prophylaxis\n• Consider [Activated Charcoal](#/drug/activated-charcoal/tca decontamination) 1 g/kg via NG once airway secured [16]\n\nIntubation should be done by the most experienced operator available.',
    citation: [16, 17],
    next: 'tca-ecg',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 2: ECG Interpretation & Risk Stratification
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tca-ecg',
    type: 'question',
    module: 2,
    title: 'ECG Assessment',
    body: '**The 12-lead ECG is the single most important test** [1][3].\n\n[ECG Findings in TCA Toxicity](#/info/tca-ecg-findings) — detailed reference.\n\n**Critical ECG markers:**\n• **QRS >100 ms** → increased seizure risk [1]\n• **QRS >160 ms** → increased risk of ventricular arrhythmias [1]\n• **R wave >3 mm in aVR** → sensitive marker of Na channel blockade [2]\n• R/S ratio >0.7 in aVR\n• Rightward axis of terminal 40 ms QRS\n• QT prolongation (K+ channel blockade)\n\nRepeat ECG every 15-30 minutes in the first 2 hours [3].\n\nWhat is the QRS duration?',
    citation: [1, 2, 3],
    calculatorLinks: [{ id: 'qrs-risk', label: 'QRS Risk Stratifier' }],
    options: [
      { label: 'QRS < 100 ms', description: 'Normal QRS — low risk. Monitor with serial ECGs.', next: 'tca-ecg-low' },
      { label: 'QRS 100–160 ms', description: 'Sodium channel blockade — bicarbonate indicated.', next: 'tca-bicarb', urgency: 'urgent' },
      { label: 'QRS > 160 ms', description: 'High risk of VT/VF — aggressive treatment immediately.', next: 'tca-bicarb-aggressive', urgency: 'critical' },
    ],
  },
  {
    id: 'tca-ecg-low',
    type: 'info',
    module: 2,
    title: 'Normal QRS — Monitor Closely',
    body: 'QRS < 100 ms suggests low risk, but **do not be reassured** — toxicity can develop rapidly [1].\n\n**Still check:**\n• **R wave in aVR >3 mm** — may be positive even with normal QRS. Liebelt 1995 found aVR may be more sensitive than QRS for predicting seizures and arrhythmias [2].\n• R/S ratio >0.7 in aVR\n• Brugada-like pattern (coved ST elevation V1-V3)\n\n**Monitoring plan:**\n• Serial ECGs q15-30 min for first 2 hours [3]\n• Then q2h for minimum 6 total hours of observation\n• Continuous telemetry throughout\n\nIf QRS widens at any point → proceed immediately to bicarbonate protocol.',
    citation: [1, 2, 3],
    next: 'tca-disposition',
  },
  {
    id: 'tca-avr',
    type: 'info',
    module: 2,
    title: 'R Wave in aVR',
    body: '**R wave amplitude >3 mm in lead aVR** is a sensitive marker of sodium channel blockade [2].\n\n• R/S ratio >0.7 in aVR\n• **Terminal 40 ms rightward axis deviation** — the sodium channel blockade preferentially affects the right bundle, causing rightward shift of the terminal QRS vector\n• May be positive even when QRS <100 ms\n\nLiebelt et al (1995): In TCA overdose, aVR findings had **sensitivity 81%** for predicting seizures and arrhythmias — comparable to QRS >100 ms [2].\n\n**Brugada-like pattern:**\n• Coved ST elevation in V1-V3 with RBBB pattern\n• Important NOT to confuse with true Brugada syndrome\n• Pattern resolves with treatment [3]',
    citation: [2, 3],
    next: 'tca-bicarb',
  },
  {
    id: 'tca-ecg-monitor',
    type: 'info',
    module: 2,
    title: 'Serial ECG Monitoring',
    body: '**ECG monitoring protocol:**\n• Serial 12-lead ECGs every 15-30 min for first 2 hours [3]\n• Continuous telemetry — minimum 6 hours after last ECG abnormality resolves [5]\n• QRS can widen rapidly — any change mandates reassessment\n\n**QT prolongation:**\n• Present due to K+ channel blockade\n• Less prognostically significant than QRS widening\n• Torsades de pointes is uncommon as long as the patient remains tachycardic [17]\n\n**When to recheck:**\n• After each bicarbonate bolus\n• After any clinical change (seizure, hypotension, arrhythmia)\n• Before any disposition decision',
    citation: [3, 5, 17],
    next: 'tca-bicarb',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 3: Sodium Bicarbonate Protocol
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tca-bicarb',
    type: 'info',
    module: 3,
    title: 'Sodium Bicarbonate — Cornerstone of Treatment',
    body: '[NaHCO₃ Protocol](#/info/tca-bicarb-protocol) — detailed reference.\n\n**Indications for bicarbonate** [4][16]:\n• QRS >100 ms\n• Ventricular arrhythmias\n• Hypotension refractory to fluids\n• Seizures (adjunct)\n\n**Bolus:** [Sodium Bicarbonate](#/drug/sodium-bicarbonate/tca overdose) 1-2 mEq/kg IV push. Repeat every 3-5 minutes until QRS narrows [4][16].\n\n**Mechanism (dual action)** [16]:\n1. **Sodium loading** — high sodium content competes for cardiac sodium channels\n2. **Alkalosis** — increases protein binding of TCA (less free/toxic drug)\n\n⚠️ Severe cases may require massive doses — one case report used 2650 mEq total [8].\n\nIf QRS doesn\'t respond despite 100-200 mEq, question the diagnosis — but do not give up prematurely [16].',
    citation: [4, 8, 16],
    calculatorLinks: [{ id: 'bicarb-dose', label: 'NaHCO₃ Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Sodium Bicarbonate 8.4%',
        dose: '1-2 mEq/kg',
        route: 'IV push',
        frequency: 'Repeat q3-5 min until QRS narrows',
        duration: 'Until QRS <100 ms',
        notes: 'Max single bolus ~150 mEq. 1 amp = 50 mEq. Target pH 7.50-7.55.',
      },
      monitoring: 'Serial ECG q15-30 min. ABG/VBG q30-60 min. Monitor Na (keep ≤155), K+ (replete aggressively), iCa.',
    },
    next: 'tca-bicarb-goals',
  },
  {
    id: 'tca-bicarb-aggressive',
    type: 'info',
    module: 3,
    title: 'QRS >160 ms — Aggressive Bicarbonate',
    body: '⚠️ **QRS >160 ms = high risk of ventricular arrhythmias** [1].\n\n**Immediate actions:**\n• [Sodium Bicarbonate](#/drug/sodium-bicarbonate/tca overdose) 1-2 mEq/kg IV push — repeat q3-5 min until QRS narrows [4]\n• If intubated: **hyperventilate** simultaneously (fastest way to alkalinize) [16]\n• Consider early [Lidocaine](#/drug/lidocaine/tca arrhythmia) 1-1.5 mg/kg IV if QRS not responding [6][16]\n• Prepare for cardiovascular collapse — have vasopressors ready\n\nSevere cases may require massive doses. Case report: patient received 2650 mEq (53 amps) of sodium bicarbonate and survived [8].\n\n⚠️ Monitor sodium closely — avoid Na >155 mEq/L [12][18].',
    citation: [1, 4, 6, 8, 12, 16, 18],
    calculatorLinks: [{ id: 'bicarb-dose', label: 'NaHCO₃ Dose Calculator' }],
    treatment: {
      firstLine: {
        drug: 'Sodium Bicarbonate 8.4%',
        dose: '1-2 mEq/kg',
        route: 'IV push',
        frequency: 'Repeat q3-5 min until QRS narrows',
        duration: 'Until QRS <100 ms or pH 7.55',
        notes: 'No ceiling dose. Case reports: up to 2650 mEq (53 amps) successfully used.',
      },
      alternative: {
        drug: 'Lidocaine',
        dose: '1-1.5 mg/kg',
        route: 'IV push',
        frequency: 'Once, then 1-4 mg/min infusion if effective',
        duration: 'Until QRS normalizes',
        notes: 'Add if bicarb not working. Paradoxically improves Na channel function in TCA.',
      },
      monitoring: 'Continuous ECG. ABG q30 min. Na ≤155 mEq/L. K+ (replete). Hyperventilate to ETCO2 25-30 if intubated.',
    },
    next: 'tca-bicarb-goals',
  },
  {
    id: 'tca-bicarb-goals',
    type: 'info',
    module: 3,
    title: 'Treatment Goals & Monitoring',
    body: '**Target goals** [16][18]:\n• **QRS < 100 ms** (if possible — may not be achievable if severely prolonged)\n• **Serum pH 7.50–7.55** — achieve via bicarb + hyperventilation if intubated [16]\n• **Serum Na ≤ 155 mEq/L** — bicarb amps are extremely hypertonic (1000 mOsm/L) [12]\n\n**Monitor closely** [16]:\n• ABG/VBG q30-60 min to guide therapy\n• Serum K+ — alkalosis causes acute **hypokalemia** (K+ shifts intracellularly). Replete simultaneously [19]\n• Ionized calcium — drops with alkalosis\n• Serial ECGs q15-30 min\n\n⚠️ **Excessive alkalinization (pH >7.55) may increase arrhythmia or seizure risk** [13].\n⚠️ **Paradoxical CNS acidosis** — CO₂ crosses the BBB faster than HCO₃⁻, potentially worsening central effects acutely [16].',
    citation: [12, 13, 16, 18, 19],
    next: 'tca-bicarb-infusion',
  },
  {
    id: 'tca-bicarb-infusion',
    type: 'info',
    module: 3,
    title: 'Bicarbonate Infusion',
    body: '**After initial boluses narrow QRS:**\n\nMaintenance infusion: 150 mEq (3 amps) in 1L D5W at 150-250 mL/hr [4][16].\n\n**Isotonic bicarbonate** is inferior to hypertonic boluses for acute QRS widening — it lacks the sodium-loading effect on cardiac channels. Use it for maintenance only [16].\n\n**Duration:**\n• Continue until QRS normalizes AND remains <100 ms for ≥6 hours\n• Wean slowly while monitoring ECG — QRS widening may recur\n• TCA half-life is 24-36 hours — toxicity can be prolonged [3]\n\n**Central line preferred** for large-volume 8.4% NaHCO₃ (1000 mOsm/L) — extremely hypertonic [16].',
    citation: [3, 4, 16],
    treatment: {
      firstLine: {
        drug: 'Sodium Bicarbonate infusion',
        dose: '150 mEq (3 amps) in 1L D5W',
        route: 'IV infusion',
        frequency: '150-250 mL/hr',
        duration: 'Until QRS <100 ms for ≥6 hours',
        notes: 'Isotonic bicarb for maintenance only. Use boluses for acute QRS widening.',
      },
      monitoring: 'Serial ECG q2h. ABG q4-6h. Wean slowly. Watch for rebound QRS widening (TCA t1/2 = 24-36h).',
    },
    next: 'tca-bicarb-refractory',
  },
  {
    id: 'tca-bicarb-refractory',
    type: 'question',
    module: 3,
    title: 'Bicarbonate-Refractory QRS Widening',
    body: 'QRS not narrowing despite adequate bicarbonate dosing?\n\n**Three additional strategies** [12][16][18]:\n\n1. **[Hypertonic saline](#/drug/hypertonic-saline/TCA) 3%** — additional sodium loading if Na <155 mEq/L [18]\n2. **Hyperventilation** — if intubated, fastest way to achieve alkalosis. Target ETCO₂ ~25-30 mmHg [16]\n3. **[Lidocaine](#/drug/lidocaine/TCA antiarrhythmic)** — Class IB antiarrhythmic that competes for sodium channel binding sites. Paradoxically IMPROVES sodium channel function in the context of TCA blockade [6][16]\n\n⚠️ If QRS doesn\'t respond despite all measures, consider whether the diagnosis is correct [16].\n\nWhich pathway next?',
    citation: [6, 12, 16, 18],
    options: [
      { label: 'Seizure present or imminent', description: 'Active seizure activity', next: 'tca-seizure', urgency: 'critical' },
      { label: 'Hypotension present', description: 'SBP <90 or MAP <65', next: 'tca-hypotension', urgency: 'urgent' },
      { label: 'Stable — continue monitoring', description: 'QRS improving, hemodynamically stable', next: 'tca-seizure' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 4: Seizure Management
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tca-seizure',
    type: 'question',
    module: 4,
    title: 'Seizure Assessment',
    body: '**Seizures occur in 10-20% of significant TCA ingestions** — usually brief but may be refractory [3].\n\n🛑 **Seizures are EXTREMELY dangerous in TCA overdose** — they cause lactic acidosis, which increases free (unbound) TCA → worsens cardiac toxicity in a **lethal positive feedback loop** [3][16][18].\n\n[Seizure Management Guide](#/info/tca-seizure-guide) — detailed reference.\n\nIs the patient actively seizing?',
    citation: [3, 16, 18],
    options: [
      { label: 'Yes — active seizure', description: 'Treat immediately with benzodiazepines + bicarbonate', next: 'tca-seizure-bzd', urgency: 'critical' },
      { label: 'No seizure activity', description: 'Continue to hemodynamic assessment', next: 'tca-hypotension' },
    ],
  },
  {
    id: 'tca-seizure-bzd',
    type: 'info',
    module: 4,
    title: 'First-Line: Benzodiazepines',
    body: '**First-line — choose one:**\n• [Lorazepam](#/drug/lorazepam/tca seizure) 0.1 mg/kg IV (max 4 mg) — repeat q5 min [4][18]\n• [Midazolam](#/drug/midazolam/tca seizure) 0.2 mg/kg IM (max 10 mg) — when IV access unavailable [4]\n• [Diazepam](#/drug/diazepam/tca seizure) 0.15-0.2 mg/kg IV (max 10 mg) — alternative [18]\n\n**Simultaneously give [Sodium Bicarbonate](#/drug/sodium-bicarbonate/tca overdose)** — alkalinize to prevent TCA crossing the BBB and to counteract seizure-induced acidosis [16][18].\n\nTCAs cause seizures via **GABA-A receptor antagonism** → benzodiazepines (GABA-A agonists) are especially effective in this context [16].',
    citation: [4, 16, 18],
    treatment: {
      firstLine: {
        drug: 'Lorazepam',
        dose: '0.1 mg/kg (max 4 mg)',
        route: 'IV',
        frequency: 'Repeat q5 min PRN',
        duration: 'Until seizure controlled',
        notes: 'GABA-A agonist directly counters TCA mechanism. Give bicarb simultaneously.',
      },
      alternative: {
        drug: 'Midazolam',
        dose: '0.2 mg/kg (max 10 mg)',
        route: 'IM',
        frequency: 'Once, may repeat',
        duration: 'Until seizure controlled',
        notes: 'Use when IV access unavailable.',
      },
      monitoring: 'Continuous ECG. Respiratory status. Give bicarb to counter seizure-induced acidosis.',
    },
    next: 'tca-seizure-refractory-q',
  },
  {
    id: 'tca-seizure-refractory-q',
    type: 'question',
    module: 4,
    title: 'Seizure Response',
    body: 'Did benzodiazepines terminate the seizure?',
    options: [
      { label: 'Yes — seizure controlled', description: 'Continue to hemodynamic assessment', next: 'tca-hypotension' },
      { label: 'No — refractory to BZD', description: 'Escalate to second-line agents', next: 'tca-seizure-refractory', urgency: 'critical' },
    ],
  },
  {
    id: 'tca-seizure-refractory',
    type: 'info',
    module: 4,
    title: 'Refractory Seizures',
    body: '**Second-line options:**\n• [Propofol](#/drug/propofol/tca refractory seizure) — 1-2 mg/kg bolus, then 30-200 mcg/kg/min. Requires intubation. Caution: may worsen hypotension [16].\n• [Phenobarbital](#/drug/phenobarbital/tca refractory seizure) — 15-20 mg/kg IV at ≤50 mg/min. Acts on GABA-A differently than BZDs — effective when BZDs fail [16].\n\n**Maintenance antiepileptic:**\n• [Levetiracetam](#/drug/levetiracetam/tca seizure maintenance) — preferred for recurrent seizures. No sodium channel effects, no drug interactions [16].\n\n🚫 **Do NOT use phenytoin/fosphenytoin** — also blocks sodium channels and may precipitate cardiac arrest [3][4][6][16][18].\n\n**Neuromuscular blockade** may be needed to terminate motor activity, but does NOT stop electrical seizures — requires continuous EEG monitoring [16].\n\nFor ongoing seizure management: [Status Epilepticus Protocol](#/tree/status-epilepticus)',
    citation: [3, 4, 6, 16, 18],
    treatment: {
      firstLine: {
        drug: 'Propofol',
        dose: '1-2 mg/kg bolus, then 30-200 mcg/kg/min',
        route: 'IV',
        frequency: 'Continuous infusion',
        duration: 'Until seizure controlled',
        notes: 'Requires intubation. Caution: may worsen hypotension.',
      },
      alternative: {
        drug: 'Phenobarbital',
        dose: '15-20 mg/kg',
        route: 'IV at ≤50 mg/min',
        frequency: 'Once',
        duration: 'Until seizure controlled',
        notes: 'Acts on GABA-A at different site than BZDs. Effective when BZDs fail.',
      },
      monitoring: 'Continuous EEG if paralyzed. BP closely (propofol). Respiratory status. Serum phenobarbital level.',
    },
    next: 'tca-hypotension',
  },
  {
    id: 'tca-seizure-avoid',
    type: 'info',
    module: 4,
    title: 'Contraindicated Antiepileptics',
    body: '🚫 **Do NOT use these agents in TCA overdose:**\n\n• **Phenytoin / Fosphenytoin** — blocks sodium channels (Class IB), may worsen cardiac toxicity and precipitate arrhythmias [3][4][6]\n• **Carbamazepine** — sodium channel blocker\n• **Lamotrigine** — sodium channel blocker\n• **Lacosamide** — enhances slow inactivation of sodium channels\n\n**Safe antiepileptics in TCA overdose:**\n• Benzodiazepines (GABA-A agonists — directly counter TCA mechanism)\n• [Phenobarbital](#/drug/phenobarbital/TCA seizure) (GABA-A — different binding site than BZDs)\n• [Propofol](#/drug/propofol/TCA seizure) (GABA-A + NMDA)\n• [Levetiracetam](#/drug/levetiracetam/TCA seizure) (SV2A — no sodium channel activity)\n• [Valproate](#/drug/valproate/TCA seizure) (multiple mechanisms but minimal sodium channel effect)',
    citation: [3, 4, 6],
    next: 'tca-hypotension',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 5: Hemodynamic Management
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tca-hypotension',
    type: 'question',
    module: 5,
    title: 'Hemodynamic Assessment',
    body: '⚠️ **Refractory hypotension may be the most common cause of death** in TCA overdose [16].\n\n**Three mechanisms of hypotension** [16]:\n1. **Alpha-1 receptor blockade** → peripheral vasodilation\n2. **Sodium channel blockade** → impaired myocardial contractility\n3. **Arrhythmias** → reduced cardiac output\n\nIs the patient hypotensive (SBP <90 or MAP <65)?',
    citation: [16],
    options: [
      { label: 'Yes — hypotensive', description: 'Initiate fluid resuscitation and vasopressors', next: 'tca-fluids', urgency: 'urgent' },
      { label: 'No — hemodynamically stable', description: 'Proceed to disposition', next: 'tca-disposition' },
      { label: 'Wide-complex tachycardia', description: 'Ventricular arrhythmia management', next: 'tca-vtach', urgency: 'critical' },
    ],
  },
  {
    id: 'tca-fluids',
    type: 'info',
    module: 5,
    title: 'Volume Resuscitation',
    body: '**Initial fluid bolus:**\n• NS or LR 1-2L IV bolus [3]\n• If isotonic bicarbonate available (150 mEq in 1L D5W), use as the fluid — accomplishes two goals simultaneously [16]\n• **Avoid NS in large volumes** — may promote acidosis. Balanced crystalloid (LR, Plasmalyte) or isotonic bicarb preferred [16].\n\n⚠️ **Patients are often refractory to fluids alone** — most are not hypovolemic [16]. Do not delay vasopressors while waiting for fluid response.\n\n**Give [Sodium Bicarbonate](#/drug/sodium-bicarbonate/tca overdose) bolus** if not already given — indicated for hypotension not due to hypovolemia [16].',
    citation: [3, 16],
    next: 'tca-vasopressors',
  },
  {
    id: 'tca-vasopressors',
    type: 'question',
    module: 5,
    title: 'Vasopressor Selection',
    body: '**Choose vasopressor based on heart rate** [16][17]:\n\n• **[Norepinephrine](#/drug/norepinephrine/tca hypotension)** — first-line. Alpha agonism directly counters TCA alpha-receptor blockade [3][16].\n• **[Epinephrine](#/drug/epinephrine/tca vasopressor)** — if bradycardic or NE-refractory. Combined alpha + beta agonism [16].\n• **Phenylephrine** — if markedly tachycardic (pure alpha, no beta stimulation) [16].\n• **[Vasopressin](#/drug/vasopressin/TCA)** — for refractory cases. Bypasses the alpha-adrenergic receptor entirely [16].\n\n🚫 **Avoid pure beta-agonists** (dobutamine, low-dose dopamine) — may worsen tachycardia without adequate vasoconstriction [3].\n\nWhat is the clinical trajectory?',
    citation: [3, 16, 17],
    treatment: {
      firstLine: {
        drug: 'Norepinephrine',
        dose: '0.1-0.5 mcg/kg/min, titrate to MAP ≥65',
        route: 'IV infusion (central line preferred)',
        frequency: 'Continuous',
        duration: 'Until hemodynamically stable',
        notes: 'First-line. Alpha agonism directly counters TCA alpha-blockade.',
      },
      alternative: {
        drug: 'Epinephrine',
        dose: '0.1-0.5 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until hemodynamically stable',
        notes: 'If bradycardic or NE-refractory. Combined alpha + beta agonism.',
      },
      monitoring: 'Continuous BP (arterial line). MAP target ≥65. Urine output. Lactate clearance.',
    },
    options: [
      { label: 'Responding to pressors', description: 'Hemodynamics improving', next: 'tca-disposition' },
      { label: 'Wide-complex tachycardia', description: 'Arrhythmia management needed', next: 'tca-vtach', urgency: 'critical' },
      { label: 'Refractory hypotension', description: 'Not responding to fluids + pressors + bicarb', next: 'tca-lipid', urgency: 'critical' },
    ],
  },
  {
    id: 'tca-vtach',
    type: 'info',
    module: 5,
    title: 'Wide-Complex Tachycardia Management',
    body: '⚠️ **Wide-complex tachycardia in TCA often represents sinus tachycardia with a widened QRS** from delayed conduction — NOT true ventricular tachycardia [16].\n\n**Treatment:**\n1. **[Sodium Bicarbonate](#/drug/sodium-bicarbonate/tca overdose)** — first-line for ALL wide-complex rhythms in TCA [3][16]\n2. **[Lidocaine](#/drug/lidocaine/tca arrhythmia)** — 1-1.5 mg/kg IV push, then 1-4 mg/min infusion. Class IB antiarrhythmic that **competes for sodium channel binding** — paradoxically improves channel function [6][16]\n3. **[Magnesium Sulfate](#/drug/magnesium-sulfate/tca arrhythmia)** — 2g IV for torsades de pointes or polymorphic VT [7]\n4. **Cardioversion** if unstable — may fail initially because it doesn\'t address the underlying toxicological cause. Give bicarb and try again [16].\n\n🚫 **AVOID:** amiodarone (further QTc prolongation), procainamide, flecainide, and ALL Class IA/IC agents — worsen sodium channel blockade [3][16][17].',
    citation: [3, 6, 7, 16, 17],
    treatment: {
      firstLine: {
        drug: 'Lidocaine',
        dose: '1-1.5 mg/kg IV push, then 1-4 mg/min infusion',
        route: 'IV',
        frequency: 'Bolus then continuous',
        duration: 'Until arrhythmia controlled',
        notes: 'Class IB. Paradoxically improves Na channel function. Use with bicarb.',
      },
      alternative: {
        drug: 'Magnesium Sulfate',
        dose: '2g',
        route: 'IV over 2-5 min',
        frequency: 'Once, may repeat',
        duration: 'PRN',
        notes: 'For torsades de pointes or polymorphic VT. AVOID amiodarone, procainamide, Class IA/IC.',
      },
      monitoring: 'Continuous ECG. QRS width. Give bicarb first/simultaneously. Cardiovert if unstable.',
    },
    next: 'tca-lipid',
  },
  {
    id: 'tca-lipid',
    type: 'info',
    module: 5,
    title: 'Lipid Emulsion Therapy',
    body: '[Lipid Emulsion 20%](#/drug/lipid-emulsion/tca cardiac arrest) — **rescue therapy for cardiac arrest or refractory toxicity** [14][16].\n\n**Dosing:**\n• 1.5 mL/kg IV bolus over 1 minute\n• Then 0.25 mL/kg/min infusion × 30-60 min\n• May repeat bolus ×2 at 5 min intervals if no ROSC [3]\n\n**Evidence:**\n• No high-quality human evidence [11][16]\n• Animal models show mixed results — one study showed ILE superior to bicarb in guinea pigs [14], another showed equivalent efficacy in swine [11]\n• More rational for **lipophilic agents** (TCAs, local anesthetics) [16]\n\n⚠️ Should be reserved for life-threatening toxicity unresponsive to other treatments. Ideally in conjunction with toxicology consultation [16].\n\n**Side effects:** Hypertriglyceridemia, pancreatitis, lipemia interfering with lab assays.',
    citation: [3, 11, 14, 16],
    treatment: {
      firstLine: {
        drug: 'Lipid Emulsion 20% (Intralipid)',
        dose: '1.5 mL/kg bolus, then 0.25 mL/kg/min infusion',
        route: 'IV',
        frequency: 'Bolus over 1 min, may repeat bolus x2 at 5 min intervals',
        duration: '30-60 min infusion',
        notes: 'Rescue therapy for cardiac arrest or refractory toxicity. Reserve for life-threatening cases.',
      },
      monitoring: 'ROSC. Hemodynamics. Triglycerides (lipemia may interfere with labs). Consult toxicology.',
    },
    next: 'tca-ecmo',
  },
  {
    id: 'tca-ecmo',
    type: 'info',
    module: 5,
    title: 'ECMO — Final Rescue',
    body: '**VA-ECMO** is the last resort for refractory TCA cardiac arrest or hemodynamic collapse [9][16][18].\n\n**Key principle:** TCA toxicity is **potentially REVERSIBLE** — aggressive bridge therapy can lead to full neurologic recovery [9][10].\n\n• Contact cardiac surgery/ECMO team EARLY if clinical trajectory suggests need\n• Case reports document full recovery after prolonged resuscitation with ECMO support [9]\n• Bridge therapy while TCA is metabolized and eliminated (half-life 24-36h)\n\n**When to consider:**\n• Cardiac arrest refractory to bicarb + lidocaine + lipid emulsion\n• Refractory shock despite maximum vasopressor support\n• Young patient with reversible cause',
    citation: [9, 10, 16, 18],
    next: 'tca-disposition',
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 6: Disposition
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tca-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '[Disposition Criteria](#/info/tca-disposition-criteria) — detailed reference.\n\n**Psychiatric evaluation is MANDATORY** for all intentional ingestions after medical clearance [3][5].\n\nWhat is the patient\'s current clinical status?',
    citation: [3, 5],
    options: [
      { label: 'ICU admission', description: 'QRS widening, arrhythmias, seizures, hypotension, AMS, bicarb infusion', next: 'tca-icu', urgency: 'critical' },
      { label: 'Monitored bed', description: 'Asymptomatic, normal ECG, observation needed', next: 'tca-monitor' },
      { label: 'Discharge candidate', description: 'Asymptomatic ×6h, QRS <100ms, normal mental status', next: 'tca-discharge' },
    ],
  },
  {
    id: 'tca-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU admission criteria** [3][5]:\n• QRS widening (current or resolved within last 6h)\n• Ventricular arrhythmias\n• Seizures\n• Hypotension requiring vasopressors\n• Altered mental status\n• Requiring bicarbonate infusion\n\n**In the ICU:**\n• Continuous telemetry — minimum **6 hours after last ECG abnormality resolves** [3][5]\n• Serial ABGs and electrolytes to guide bicarbonate therapy\n• Late deterioration possible — TCA has long half-life (24-36h) and anticholinergic effects delay absorption [3]\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'ICU admission with continuous cardiac monitoring, bicarbonate infusion, and serial ECGs until QRS normalizes for ≥6 hours.',
    confidence: 'definitive',
    citation: [3, 5],
  },
  {
    id: 'tca-monitor',
    type: 'result',
    module: 6,
    title: 'Monitored Bed — Observation',
    body: '**Monitored bed criteria:**\n• Asymptomatic or mildly symptomatic\n• Normal ECG (QRS <100 ms) at presentation\n• Reported ingestion requiring observation\n\n**Monitoring protocol:**\n• Serial ECGs q2h for minimum 6 hours [3][5]\n• Continuous telemetry\n• If ANY QRS widening develops → escalate to bicarbonate protocol immediately\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'Telemetry observation with serial ECGs q2h for minimum 6 hours. Escalate to ICU if any QRS widening or clinical deterioration.',
    confidence: 'recommended',
    citation: [3, 5],
  },
  {
    id: 'tca-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge Criteria',
    body: '**Safe for discharge ONLY if ALL criteria met** [3][5]:\n• Asymptomatic for ≥6 hours\n• QRS persistently <100 ms on serial ECGs\n• Normal mental status\n• Normal hemodynamics\n• **Psychiatric clearance obtained** (MANDATORY for intentional ingestions)\n\n**Before discharge:**\n• Document lethal means counseling\n• Counsel family/caregivers to remove access to TCAs\n• Consider safer antidepressant alternatives (SSRIs, SNRIs)\n• Ensure psychiatric follow-up arranged\n\n**Poison Control:** 1-800-222-1222',
    recommendation: 'Discharge with psychiatric clearance after 6+ hours of observation with normal ECGs and mental status.',
    confidence: 'recommended',
    citation: [3, 5],
  },
];

export const TCA_TOXIDROME_NODE_COUNT = TCA_TOXIDROME_NODES.length;

export const TCA_TOXIDROME_MODULE_LABELS = [
  'Recognition & Stabilization',
  'ECG & Risk Stratification',
  'Sodium Bicarbonate Protocol',
  'Seizure Management',
  'Hemodynamic Management',
  'Disposition',
];

export const TCA_TOXIDROME_CRITICAL_ACTIONS = [
  { text: 'Sodium bicarbonate 1-2 mEq/kg IV bolus (50-100 mEq) for QRS >100 ms or arrhythmia', nodeId: 'tca-bicarb' },
  { text: 'Target serum pH 7.50-7.55 with continuous bicarbonate infusion', nodeId: 'tca-bicarb-infusion' },
  { text: 'Intubate for airway protection - avoid propofol (worsens hypotension), use etomidate/ketamine', nodeId: 'tca-intubate' },
  { text: 'Lipid emulsion 20%: 1.5 mL/kg bolus if refractory arrhythmias or cardiac arrest', nodeId: 'tca-lipid' },
  { text: 'Norepinephrine for hypotension (avoid phenylephrine - unopposed alpha worsens outcomes)', nodeId: 'tca-pressors' },
  { text: 'Avoid class IA/IC antiarrhythmics (procainamide, flecainide - worsen sodium channel blockade)', nodeId: 'tca-bicarb' },
  { text: 'Benzodiazepines for seizures (lorazepam 0.1 mg/kg IV)', nodeId: 'tca-seizure' },
];

export const TCA_TOXIDROME_CITATIONS: Citation[] = [
  { num: 1, text: 'Boehnert MT, Lovejoy FH Jr. Value of the QRS duration versus the serum drug level in predicting seizures and ventricular arrhythmias after an acute overdose of tricyclic antidepressants. N Engl J Med. 1985;313(8):474-479.' },
  { num: 2, text: 'Liebelt EL, Francis PD, Woolf AD. ECG lead aVR versus QRS interval in predicting seizures and arrhythmias in acute tricyclic antidepressant toxicity. Ann Emerg Med. 1995;26(2):195-201.' },
  { num: 3, text: 'Kerr GW, McGuffie AC, Wilkie S. Tricyclic antidepressant overdose: a review. Emerg Med J. 2001;18(4):236-241.' },
  { num: 4, text: 'Woolf AD, Erdman AR, Nelson LS, et al. Tricyclic antidepressant poisoning: an evidence-based consensus guideline for out-of-hospital management. Clin Toxicol. 2007;45(3):203-233.' },
  { num: 5, text: 'Body R, Bartram T, Azam F, Mackway-Jones K. Guidelines in Emergency Medicine Network (GEMNet): guideline for the management of tricyclic antidepressant overdose. Emerg Med J. 2011;28(4):347-368.' },
  { num: 6, text: 'Foianini A, Joseph Wiegand T, Benowitz N. What is the role of lidocaine or phenytoin in tricyclic antidepressant-induced cardiotoxicity? Clin Toxicol. 2010;48(4):325-330.' },
  { num: 7, text: 'Emamhadi M, Mostafazadeh B, Hassanijirdehi M. Tricyclic antidepressant poisoning treated by magnesium sulfate: a randomized, clinical trial. Drug Chem Toxicol. 2012;35(3):300-303.' },
  { num: 8, text: 'Amiri H, Zamani N, Hassanian-Moghaddam H, Shadnia S. Cardiotoxicity of tricyclic antidepressant treated by 2650 mEq sodium bicarbonate: a case report. JRSM Cardiovasc Dis. 2016;5:2048004016682178.' },
  { num: 9, text: 'Giwa A, Oey E. The return of an old nemesis: Survival after severe tricyclic antidepressant toxicity, a case report. Toxicol Rep. 2018;5:357-362.' },
  { num: 10, text: 'Goldstein JN, Dudzinski DM, Erickson TB, Linder G. Case 12-2018: A 30-Year-Old Woman with Cardiac Arrest. N Engl J Med. 2018;378(16):1538-1549.' },
  { num: 11, text: 'Varney SM, Bebarta VS, Vargas TE, Boudreau S, Castaneda M. Intravenous lipid emulsion therapy does not improve hypotension compared to sodium bicarbonate for tricyclic antidepressant toxicity: a randomized, controlled pilot study in a swine model. Acad Emerg Med. 2014;21(11):1212-1219.' },
  { num: 12, text: 'Isoardi KZ, Chiew AL. Too much of a good thing: Bicarbonate toxicity following treatment of sodium channel blocker overdose. Emerg Med Australas. 2022;34(4):e13995.' },
  { num: 13, text: 'Murray BP, Carpenter J. Medical Toxicology. Oxford University Press. 2024.' },
  { num: 14, text: 'Harvey M, Cave G. Intralipid outperforms sodium bicarbonate in a rabbit model of clomipramine toxicity. Ann Emerg Med. 2007;49(2):178-185.' },
  { num: 15, text: 'Mohan S, Backus T, Furlano E, Howland MA, Smith SW, Su MK. A case of massive diphenhydramine and naproxen overdose. J Emerg Med. 2021;61(3):259-264.' },
  { num: 16, text: 'Farkas J. Sodium Channel Blocker Toxicity (including tricyclic antidepressants). Internet Book of Critical Care (IBCC). 2025.' },
  { num: 17, text: 'Weingart S. EMCrit 98 — Cyclic (Tricyclic) Antidepressant Overdose. EMCrit Blog. 2013.' },
  { num: 18, text: 'Long N. TCA Toxicity. Life in the Fast Lane (LITFL). 2022.' },
  { num: 19, text: 'Swaminathan A. REBEL Core Cast 109.0 — Na Channel Blocker Poisoning. REBEL EM. 2023.' },
  { num: 20, text: 'Lemyze M, Masse J, Queva C, Huchette D. Cardiac effect of sodium bicarbonate in sodium-channel blocker poisoning. Intensive Care Med. 2016;42(4):588-590.' },
];
