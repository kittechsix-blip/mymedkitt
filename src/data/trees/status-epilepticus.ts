// MedKitt — Status Epilepticus Management
// Recognition & stabilization → BZD first-line → 2nd-line ASM → Refractory/SRSE → Special populations → Differential/NCSE.
// 6 modules: Recognition → BZD → Urgent Control → Refractory → Special Populations → Differential
// 26 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const STATUS_EPILEPTICUS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & STABILIZATION
  // =====================================================================

  {
    id: 'se-start',
    type: 'info',
    module: 1,
    title: 'Status Epilepticus',
    body: '[SE Steps Summary](#/info/se-summary) — time-critical escalating treatment pathway.\n\n**Status epilepticus (SE)** is defined as a seizure lasting >5 minutes or recurrent seizures without recovery between episodes.\n\nSE that persists despite first-line and second-line treatments often necessitates intubation and anesthetic infusions. Underrecognition and delays in treatment increase morbidity and mortality.\n\n**Key principle:** Benzodiazepines become less effective the longer SE persists — GABAA receptors are internalized from the cell surface during prolonged seizure activity. Early, adequate-dose treatment is critical.\n\n**Up to 30% morbidity and mortality** in adults. Etiology drives ~80% of SE-related mortality.',
    citation: [1, 2, 3],
    next: 'se-is-this-se',
  },

  {
    id: 'se-is-this-se',
    type: 'question',
    module: 1,
    title: 'Is This Status Epilepticus?',
    body: '**Convulsive SE:** Generalized tonic-clonic activity >5 min, or recurrent seizures without recovery of consciousness between episodes.\n\n**Subtle / late SE:** After prolonged generalized seizure, motor activity may diminish — look for subtle signs: facial twitching, nystagmus, eye deviation.\n\n**Key history:** Duration of seizure activity, witnessed motor features, prior seizure history, current medications, recent drug/alcohol use, trauma, pregnancy status.\n\nPhysical exam: lateral tongue lacerations suggest seizure over syncope. Check for meningeal signs, focal neurologic deficits, signs of trauma.',
    citation: [1, 2],
    options: [
      {
        label: 'Yes — Active seizure >5 min or recurrent',
        description: 'Convulsive SE confirmed or highly suspected',
        next: 'se-abcs',
        urgency: 'critical',
      },
      {
        label: 'Altered consciousness, not convulsing',
        description: 'Possible NCSE — subtle signs, postictal, or unexplained AMS',
        next: 'se-ncse',
        urgency: 'urgent',
      },
      {
        label: 'Likely not SE — consider differential',
        description: 'Syncope, PNES, movement disorder, or other mimic',
        next: 'se-differential',
      },
    ],
  },

  {
    id: 'se-abcs',
    type: 'info',
    module: 1,
    title: 'ABCs & Initial Stabilization',
    body: '**Airway:** Position in left lateral decubitus if actively seizing. Suction available. Nasopharyngeal airway if needed — do NOT use bite block or oral airway (risk of obstruction and provider injury). Do NOT attempt intubation during active tonic-clonic seizure unless airway compromise.\n\n**Breathing:** High-flow O2 via non-rebreather. Monitor SpO2 continuously. Respiratory failure can occur from seizure itself or from benzodiazepines.\n\n**Circulation:** Cardiac monitor, IV access × 2. Vital signs including temperature.\n\n**Protect from injury** — pad side rails, remove hazards. Do NOT restrain.\n\n**Start the clock** — time from seizure onset drives treatment decisions.',
    citation: [1, 2],
    next: 'se-glucose-labs',
  },

  {
    id: 'se-glucose-labs',
    type: 'info',
    module: 1,
    title: 'Glucose & Diagnostic Workup',
    body: '**Fingerstick glucose STAT** — hypoglycemia is a common, easily reversible seizure trigger.\n• If glucose <60 mg/dL: D50W 25 g IV (adults) or D10W 2-5 mL/kg (peds)\n\n[SE Diagnostic Workup](#/info/se-labs) — complete lab panel and imaging guide.\n\n**Priority labs:** BMP (Na, Ca, Mg, Phos), CBC, lactate, VBG, urine drug screen, serum tox, ASM levels (if on therapy), troponin, CK, pregnancy test.\n\n**Imaging:** CT head non-contrast after stabilization — evaluate for structural cause. MRI when stable.\n\n**EEG:** Order early if available — 48% of patients with altered consciousness post-SE have ongoing NCSE on EEG.\n\n**Lumbar puncture:** If signs of meningitis, fever with no clear source, or immunocompromised.',
    citation: [1, 3, 4],
    next: 'se-iv-access',
  },

  {
    id: 'se-iv-access',
    type: 'question',
    module: 1,
    title: 'IV Access Available?',
    body: 'Route of administration determines first-line benzodiazepine choice.\n\n**IV access preferred** but should NOT delay treatment. If IV is not immediately available, give IM midazolam — the RAMPART trial showed IM midazolam is non-inferior to IV lorazepam and faster to administer.\n\nUnderdosing of benzodiazepines leads to poor response and increased likelihood of refractory SE.',
    citation: [1, 5],
    options: [
      {
        label: 'Yes — IV established',
        description: 'IV lorazepam is preferred first-line',
        next: 'se-iv-bzd',
        urgency: 'critical',
      },
      {
        label: 'No — IM/IN/PR route',
        description: 'IM midazolam is first-line when no IV access',
        next: 'se-no-iv-bzd',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: PHASE 1 — BENZODIAZEPINES
  // =====================================================================

  {
    id: 'se-iv-bzd',
    type: 'info',
    module: 2,
    title: 'IV Lorazepam (First-Line)',
    body: '[Lorazepam](#/drug/lorazepam/status epilepticus) 0.1 mg/kg IV (max 4 mg/dose), push over 2 min.\n\n**May repeat once** in 5-10 minutes if seizure persists. Total max: 8 mg.\n\n**Alternative if lorazepam unavailable:**\n• [Diazepam](#/drug/diazepam/status epilepticus iv) 0.15-0.2 mg/kg IV (max 10 mg), repeat once\n\nLorazepam is preferred over diazepam — higher seizure termination rate (65% vs 56%) and longer duration of action.\n\n**Monitor for respiratory depression** — have bag-valve mask and suction at bedside. Patients who received multiple BZD doses from EMS are at higher risk.',
    citation: [1, 2, 5],
    treatment: {
      firstLine: {
        drug: 'Lorazepam',
        dose: '0.1 mg/kg IV (max 4 mg/dose)',
        route: 'IV push',
        frequency: 'May repeat once in 5-10 min',
        duration: 'Total max 8 mg',
        notes: 'Push over 2 min. Monitor for respiratory depression.',
      },
      alternative: {
        drug: 'Diazepam',
        dose: '0.15-0.2 mg/kg IV (max 10 mg)',
        route: 'IV',
        frequency: 'Repeat once if needed',
        duration: 'Single dose or repeat x1',
        notes: 'Use if lorazepam unavailable. Lower seizure termination rate (56% vs 65%).',
      },
      monitoring: 'Continuous pulse oximetry, respiratory monitoring. Have BVM and suction at bedside.',
    },
    next: 'se-bzd-response',
  },

  {
    id: 'se-no-iv-bzd',
    type: 'info',
    module: 2,
    title: 'IM Midazolam (No IV Access)',
    body: '[Midazolam](#/drug/midazolam/status epilepticus im) 0.2 mg/kg IM (max 10 mg) into deltoid or vastus lateralis.\n\n**RAMPART trial:** IM midazolam terminated seizures in 73% vs 63% for IV lorazepam (p<.001). Faster time to treatment offset the slightly slower IM onset.\n\n**Weight-based dosing:**\n• ≥40 kg: 10 mg IM\n• 13-40 kg: 5 mg IM\n\n**Alternative routes:**\n• Intranasal midazolam: 0.2 mg/kg via mucosal atomizer (less effective than IM per Guterman et al)\n• [Diazepam](#/drug/diazepam/status epilepticus rectal) 0.2-0.5 mg/kg PR (max 20 mg) — no longer recommended as first-line\n\n**Continue attempting IV access** — will be needed for 2nd-line agents if BZD fails.',
    citation: [1, 5],
    treatment: {
      firstLine: {
        drug: 'Midazolam',
        dose: '0.2 mg/kg IM (max 10 mg)',
        route: 'IM (deltoid or vastus lateralis)',
        frequency: 'Single dose',
        duration: 'Once',
        notes: 'Weight-based: >=40 kg give 10 mg, 13-40 kg give 5 mg. RAMPART showed 73% seizure termination.',
      },
      alternative: {
        drug: 'Diazepam',
        dose: '0.2-0.5 mg/kg PR (max 20 mg)',
        route: 'PR',
        frequency: 'Single dose',
        duration: 'Once',
        notes: 'No longer recommended as first-line. Use if midazolam unavailable.',
      },
      monitoring: 'Continue attempting IV access. Monitor respiratory status.',
    },
    next: 'se-bzd-response',
  },

  {
    id: 'se-bzd-response',
    type: 'question',
    module: 2,
    title: 'Seizure Response to Benzodiazepine?',
    body: 'Assess **5 minutes** after BZD administration. Up to 2 doses of first-line BZD may be given.\n\nIf second dose given, reassess after 5 additional minutes.\n\n**Seizure terminated** = cessation of all motor activity AND progressive improvement in consciousness. Subtle motor signs (facial twitching, nystagmus) may indicate ongoing SE.',
    citation: [1, 2],
    options: [
      {
        label: 'Seizure terminated',
        description: 'Motor activity stopped, consciousness improving',
        next: 'se-bzd-success',
      },
      {
        label: 'Still seizing after adequate BZD',
        description: 'Benzodiazepine-refractory — proceed to 2nd line',
        next: 'se-special-pop',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'se-bzd-success',
    type: 'result',
    module: 2,
    title: 'Seizure Terminated After Benzodiazepine',
    body: 'Seizure terminated with first-line benzodiazepine therapy.\n\n**Post-seizure management:**\n• Monitor for recurrence — recurrence risk is significant\n• Complete diagnostic workup (labs, imaging, EEG if available)\n• Determine etiology — drives 80% of outcome\n• Consider ASM loading for seizure prophylaxis if first unprovoked seizure with high recurrence risk, known epilepsy with subtherapeutic levels, or structural lesion identified\n• [Levetiracetam](#/drug/levetiracetam/status epilepticus) 20-60 mg/kg IV (max 4500 mg) is preferred for ASM loading\n\n**If patient does not return to baseline within 30-60 min**, consider ongoing NCSE — obtain urgent EEG.',
    recommendation: 'Seizure terminated with BZD. Monitor for recurrence, complete etiology workup. Load maintenance ASM if indicated. If no return to baseline within 30-60 min, obtain EEG to rule out NCSE.',
    confidence: 'recommended',
    citation: [1, 2, 4],
  },

  // =====================================================================
  // MODULE 3: PHASE 2 — URGENT CONTROL THERAPY
  // =====================================================================

  {
    id: 'se-special-pop',
    type: 'question',
    module: 3,
    title: 'Special Population?',
    body: 'Before selecting 2nd-line antiseizure medication, identify if the patient belongs to a special population that changes management.\n\nIf none apply, proceed directly to standard 2nd-line ASM selection.',
    citation: [1],
    options: [
      {
        label: 'Pregnant / suspected eclampsia',
        description: 'Magnesium sulfate first; avoid teratogenic agents',
        next: 'se-pregnancy',
        urgency: 'critical',
      },
      {
        label: 'Known/suspected toxic ingestion',
        description: 'INH → pyridoxine; phenytoin often ineffective',
        next: 'se-substance',
        urgency: 'critical',
      },
      {
        label: 'Pediatric considerations',
        description: 'Same agents, weight-based dosing, consider pyridoxine-dependent epilepsy',
        next: 'se-peds',
        urgency: 'urgent',
      },
      {
        label: 'Standard adult — no special population',
        description: 'Proceed to 2nd-line ASM selection',
        next: 'se-2nd-line-choice',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'se-2nd-line-choice',
    type: 'question',
    module: 3,
    title: 'Second-Line ASM Selection',
    body: 'BZD-refractory convulsive SE. Administer within **5-10 minutes** of BZD failure.\n\n**ESETT trial (2019):** Levetiracetam, fosphenytoin, and valproate had **equivalent efficacy** (~47% seizure cessation at 60 min). No significant difference in adverse events between the three agents.\n\nChoice should be tailored to patient\'s comorbidities and contraindications.\n\n[2nd-Line ASM Comparison](#/info/se-asm-comparison) — side-by-side efficacy, contraindications, and side effects.',
    citation: [1, 2, 6],
    options: [
      {
        label: 'Levetiracetam (Keppra)',
        description: 'Fewest drug interactions. Safe in hepatic/renal disease. Safe in pregnancy.',
        next: 'se-levetiracetam',
      },
      {
        label: 'Valproate (Depacon)',
        description: 'Avoid in pregnancy, liver disease, mitochondrial disorders, thrombocytopenia',
        next: 'se-valproate',
      },
      {
        label: 'Fosphenytoin (Cerebyx)',
        description: 'Avoid if drug/alcohol-induced SE. Cardiac monitoring required.',
        next: 'se-fosphenytoin',
      },
      {
        label: 'Phenobarbital',
        description: 'If above unavailable. Higher sedation and respiratory depression risk.',
        next: 'se-phenobarbital',
      },
    ],
  },

  {
    id: 'se-levetiracetam',
    type: 'info',
    module: 3,
    title: 'Levetiracetam (Keppra)',
    body: '[Levetiracetam](#/drug/levetiracetam/status epilepticus) 60 mg/kg IV (max 4500 mg) over 10-15 min.\n\n**ESETT:** 47% seizure termination at 60 min (equivalent to fosphenytoin and valproate).\n\n**Advantages:**\n• No cardiac effects — no telemetry requirement during infusion\n• No hepatic metabolism — no drug interactions\n• Safe in renal impairment (dose adjust if CrCl <50)\n• Safe in pregnancy (Category C, low teratogenicity — preferred 2nd line in pregnant patients)\n• Minimal drug-drug interactions\n\n**Side effects:** Psychiatric symptoms (irritability, agitation), drowsiness. Use with caution in patients with mood disorders.',
    citation: [1, 6, 7],
    treatment: {
      firstLine: {
        drug: 'Levetiracetam (Keppra)',
        dose: '60 mg/kg IV (max 4500 mg)',
        route: 'IV infusion',
        frequency: 'Single loading dose',
        duration: 'Infuse over 10-15 min',
        notes: 'No cardiac monitoring required. Safe in pregnancy. Dose adjust if CrCl <50.',
      },
      monitoring: 'No telemetry required during infusion. Monitor for psychiatric symptoms. Renal function for maintenance dosing.',
    },
    next: 'se-2nd-line-response',
  },

  {
    id: 'se-valproate',
    type: 'info',
    module: 3,
    title: 'Valproate Sodium (Depacon)',
    body: '[Valproate](#/drug/valproate/status epilepticus) 40 mg/kg IV (max 3000 mg) over 10 min.\n\n**ESETT:** 46% seizure termination at 60 min.\n\n**Contraindicated in:**\n• Pregnancy (teratogenic — neural tube defects, Category X)\n• Hepatic disease / liver failure\n• Mitochondrial disorders (Alpers syndrome — fatal hepatotoxicity)\n• Known or suspected urea cycle disorders\n• Pancreatitis\n\n**Cautions:**\n• Thrombocytopenia / coagulopathy — check platelets\n• May cause hyperammonemia — check ammonia if altered mental status persists after seizure cessation\n• Well-tolerated even with larger doses and faster rates of infusion',
    citation: [1, 6, 7],
    treatment: {
      firstLine: {
        drug: 'Valproate Sodium (Depacon)',
        dose: '40 mg/kg IV (max 3000 mg)',
        route: 'IV infusion',
        frequency: 'Single loading dose',
        duration: 'Infuse over 10 min',
        notes: 'Contraindicated in pregnancy (Category X), hepatic disease, mitochondrial disorders, urea cycle disorders.',
      },
      monitoring: 'Check platelets before administration. Monitor ammonia if AMS persists post-seizure. LFTs.',
    },
    next: 'se-2nd-line-response',
  },

  {
    id: 'se-fosphenytoin',
    type: 'info',
    module: 3,
    title: 'Fosphenytoin (Cerebyx)',
    body: '[Fosphenytoin](#/drug/fosphenytoin/status epilepticus) 20 mg PE/kg IV (max 1500 mg PE) at max rate 150 mg PE/min.\n\n**ESETT:** 45% seizure termination at 60 min.\n\n**Requires cardiac monitoring** during and for 20 min after infusion — risk of:\n• Hypotension\n• Cardiac arrhythmia (bradycardia, QT prolongation)\n• AV block\n\n**INEFFECTIVE** for drug/alcohol-induced seizures — phenytoin\'s selective action on voltage-gated sodium channels is insufficient for diffuse CNS toxicity.\n\n**Contraindicated in:**\n• Sinus bradycardia, SA/AV block, Adams-Stokes syndrome\n• Decompensated heart failure\n\n**Note:** Fosphenytoin (water-soluble prodrug) is preferred over phenytoin — no risk of purple glove syndrome, can be given IM. Dosed in **PE (phenytoin equivalents)**.',
    citation: [1, 6, 7],
    treatment: {
      firstLine: {
        drug: 'Fosphenytoin (Cerebyx)',
        dose: '20 mg PE/kg IV (max 1500 mg PE)',
        route: 'IV infusion',
        frequency: 'Single loading dose',
        duration: 'Max rate 150 mg PE/min',
        notes: 'Dosed in PE (phenytoin equivalents). Ineffective for drug/alcohol-induced seizures. Contraindicated in bradycardia, heart block, decompensated HF.',
      },
      monitoring: 'Continuous cardiac monitoring during infusion and for 20 min after. Monitor for hypotension, bradycardia, QT prolongation.',
    },
    next: 'se-2nd-line-response',
  },

  {
    id: 'se-2nd-line-response',
    type: 'question',
    module: 3,
    title: '2nd-Line ASM Response?',
    body: 'Assess **20 minutes** after start of infusion.\n\nIf seizure persists or recurs, this is now **refractory status epilepticus (RSE)**.\n\n~30-40% of patients fail 2nd-line therapy. As SE duration increases, GABAA receptor internalization progresses and benzodiazepine/ASM resistance increases.\n\nIf the first 2nd-line agent fails, guidelines recommend either:\n• Adding another 2nd-line ASM, OR\n• Proceeding directly to anesthetic infusions',
    citation: [1, 2],
    options: [
      {
        label: 'Seizure terminated',
        description: 'Clinical and EEG seizure cessation',
        next: 'se-2nd-success',
      },
      {
        label: 'Still seizing — refractory SE',
        description: 'Failed BZD + 2nd-line ASM — escalate to anesthetic agents',
        next: 'se-rse-prep',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 4: REFRACTORY & SUPER-REFRACTORY SE
  // =====================================================================

  {
    id: 'se-phenobarbital',
    type: 'info',
    module: 4,
    title: 'Phenobarbital',
    body: '[Phenobarbital](#/drug/phenobarbital/status epilepticus) 15-20 mg/kg IV at max rate 50-100 mg/min. Max single dose: 2000 mg.\n\n**Use when ESETT agents (levetiracetam, valproate, fosphenytoin) are unavailable** or contraindicated.\n\n**Significant risks:**\n• Respiratory depression — may precipitate need for intubation\n• Hypotension\n• Excessive sedation\n\n**Have intubation supplies ready** before administration.\n\n**Also first-line for:**\n• Neonatal seizures\n• Benzodiazepine-resistant alcohol withdrawal seizures\n\nWhen benzodiazepines are completely unavailable, [phenobarbital](#/drug/phenobarbital/status epilepticus) IV 15-20 mg/kg may be used as first-line emergent therapy.',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Phenobarbital',
        dose: '15-20 mg/kg IV (max 2000 mg)',
        route: 'IV infusion',
        frequency: 'Single loading dose',
        duration: 'Max rate 50-100 mg/min',
        notes: 'Use when ESETT agents unavailable. Also first-line for neonatal seizures and BZD-resistant alcohol withdrawal.',
      },
      monitoring: 'Have intubation supplies ready. Monitor respiratory status, BP. High risk of respiratory depression and hypotension.',
    },
    next: 'se-2nd-line-response',
  },

  {
    id: 'se-2nd-success',
    type: 'result',
    module: 4,
    title: 'Seizure Terminated After 2nd-Line ASM',
    body: 'Seizure terminated with 2nd-line antiseizure medication.\n\n**Critical: Monitor for NCSE** — ESETT data showed 48% of patients with altered consciousness post-SE had ongoing nonconvulsive seizures on EEG.\n\n**Post-seizure management:**\n• Continuous EEG monitoring recommended — minimum 24h\n• Continue maintenance dosing of the ASM that terminated seizure\n• Complete etiology workup (labs, imaging, LP if indicated)\n• Consider adding a second ASM for prophylaxis if high recurrence risk\n• ICU admission for close monitoring',
    recommendation: 'Seizure terminated with 2nd-line ASM. Admit to ICU. Continuous EEG monitoring × 24-48h recommended. Continue maintenance ASM. Complete etiology workup.',
    confidence: 'recommended',
    citation: [1, 2, 4],
  },

  {
    id: 'se-rse-prep',
    type: 'info',
    module: 4,
    title: 'Refractory SE — Intubation & Preparation',
    body: '**Refractory SE (RSE)** = failure of first-line BZD AND adequate second-line ASM.\n\nOccurs in ~30-40% of SE presentations.\n\n**Immediate actions:**\n• Secure airway with rapid sequence intubation\n• Avoid prolonged paralysis — use short-acting agent (succinylcholine preferred over rocuronium) to allow clinical seizure assessment\n• Arterial line for continuous BP monitoring\n• Central venous access for vasopressors if needed\n• **Continuous EEG monitoring — MANDATORY** (cannot assess seizure activity in paralyzed/sedated patient)\n\n[RSE Management Principles](#/info/se-rse-principles) — intubation considerations, EEG targets, weaning protocol.\n\n**Consider adding another 2nd-line ASM** (e.g., [Lacosamide](#/drug/lacosamide/status epilepticus) 200-400 mg IV) as adjunct before or concurrent with anesthetic infusion.',
    citation: [1, 2, 8],
    treatment: {
      firstLine: {
        drug: 'Lacosamide (adjunct)',
        dose: '200-400 mg IV',
        route: 'IV',
        frequency: 'Single dose',
        duration: 'As adjunct to anesthetic infusion',
        notes: 'Consider adding as adjunct before or concurrent with anesthetic infusion.',
      },
      monitoring: 'Continuous EEG monitoring mandatory. Arterial line for BP. Central venous access for vasopressors.',
    },
    next: 'se-rse-infusion',
  },

  {
    id: 'se-rse-infusion',
    type: 'question',
    module: 4,
    title: 'RSE — Continuous Infusion Selection',
    body: '**Goal:** EEG seizure suppression or burst suppression for 24-48 hours before weaning attempt.\n\nNo large RCTs demonstrate clear superiority between agents. Choice based on clinical factors.\n\nAll agents require mechanical ventilation and ICU-level care.\n\n[Continuous Infusion Comparison](#/info/se-infusion-comparison) — dosing, hemodynamic effects, and unique risks for each agent.',
    citation: [1, 8],
    options: [
      {
        label: 'Midazolam infusion',
        description: 'Load 0.2 mg/kg, infuse 0.05-2 mg/kg/hr. Lowest hemodynamic impact, easier to wean.',
        next: 'se-rse-monitoring',
      },
      {
        label: 'Propofol infusion',
        description: 'Load 1-2 mg/kg, infuse 30-200 mcg/kg/min. Watch for propofol infusion syndrome (PRIS).',
        next: 'se-rse-monitoring',
      },
      {
        label: 'Pentobarbital infusion',
        description: 'Load 5-15 mg/kg, infuse 0.5-5 mg/kg/hr. Deepest suppression, most hemodynamic compromise.',
        next: 'se-rse-monitoring',
      },
      {
        label: 'Ketamine infusion',
        description: 'Load 0.5-3 mg/kg, infuse 0.1-5 mg/kg/hr. NMDA antagonist — different mechanism, may avoid intubation.',
        next: 'se-rse-monitoring',
      },
    ],
  },

  {
    id: 'se-rse-monitoring',
    type: 'info',
    module: 4,
    title: 'RSE/SRSE Monitoring & Weaning',
    body: '**Continuous EEG targets:**\n• Burst suppression (3-10 sec bursts, <50% suppression ratio)\n• OR complete seizure suppression (depending on clinical scenario)\n\n**Maintenance:** 24-48 hours of seizure suppression before first wean attempt.\n\n**Weaning protocol:**\n• Reduce infusion by 25% every 4-6 hours with continuous EEG\n• If seizures recur on wean → restart at effective dose, extend 24h, retry\n\n**Super-refractory SE (SRSE):** SE persists or recurs despite 24 hours of anesthetic therapy.\n\n**SRSE options:**\n• Switch to different anesthetic agent\n• [Lacosamide](#/drug/lacosamide/status epilepticus) as adjunct\n• Immunotherapy if autoimmune etiology suspected (IVIG, steroids, plasmapheresis)\n• Therapeutic hypothermia (32-35°C)\n• Ketogenic diet\n• Neurology and neurointensive care consultation essential\n\n**NORSE (new-onset refractory SE):** No prior seizure history, no identifiable cause. ~50% remain cryptogenic. Consider autoimmune/paraneoplastic encephalitis panel.',
    citation: [1, 2, 8],
    treatment: {
      firstLine: {
        drug: 'Midazolam infusion',
        dose: 'Load 0.2 mg/kg, then 0.05-2 mg/kg/hr',
        route: 'IV continuous infusion',
        frequency: 'Continuous',
        duration: '24-48 hr of burst suppression before wean',
        notes: 'Lowest hemodynamic impact, easier to wean. Wean by 25% every 4-6 hours.',
      },
      alternative: {
        drug: 'Propofol infusion',
        dose: 'Load 1-2 mg/kg, then 30-200 mcg/kg/min',
        route: 'IV continuous infusion',
        frequency: 'Continuous',
        duration: '24-48 hr then wean',
        notes: 'Watch for propofol infusion syndrome (PRIS). Max 5 mg/kg/hr, max 48 hours at high dose.',
      },
      monitoring: 'Continuous EEG mandatory. Target burst suppression or seizure suppression. Wean 25% every 4-6 hr. If seizures recur, restart effective dose and extend 24h.',
    },
    next: 'se-disposition',
  },

  {
    id: 'se-disposition',
    type: 'result',
    module: 4,
    title: 'Disposition & Ongoing Management',
    body: '**All SE patients require ICU admission.**\n\n**Monitoring:**\n• Continuous EEG monitoring × minimum 24-48h\n• Detect NCSE, guide treatment, monitor for recurrence\n\n**Workup to complete:**\n• MRI brain (when stable) — superior to CT for structural causes\n• LP if infectious or autoimmune etiology suspected\n• Autoimmune encephalitis panel if no clear etiology (NMDA-receptor Ab, LGI1, CASPR2)\n• ASM levels (therapeutic drug monitoring)\n\n**Maintenance ASM:**\n• Continue the agent(s) that terminated SE\n• [Levetiracetam](#/drug/levetiracetam/status epilepticus) is most commonly used for maintenance\n\n**Goals of care:** Discuss with family early if RSE/SRSE — prognosis depends primarily on underlying etiology.\n\n**Neurology consultation** for all SE patients.',
    recommendation: 'Admit to ICU. Continuous EEG × 24-48h. Complete etiology workup (MRI, LP if indicated, autoimmune panel if cryptogenic). Continue maintenance ASM. Neurology consultation.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  // =====================================================================
  // MODULE 5: SPECIAL POPULATIONS
  // =====================================================================

  {
    id: 'se-pregnancy',
    type: 'info',
    module: 5,
    title: 'Pregnancy / Eclampsia',
    body: '**First question: Is this eclampsia or epilepsy?**\n\n**Eclampsia** if: hypertension, proteinuria, edema, >20 weeks gestation, or new-onset seizure in pregnancy without prior seizure history.\n\n**Eclampsia treatment:**\n• [Magnesium Sulfate](#/drug/magnesium-sulfate/eclampsia) 4-6 g IV over 15-20 min, then 1-2 g/hr infusion\n• If seizures persist despite magnesium → benzodiazepines (lorazepam)\n• **OB consultation STAT** — consider emergent delivery\n• Fetal monitoring\n\n**Epilepsy in pregnancy (breakthrough SE):**\n• Standard BZD first-line\n• For 2nd-line: **prefer [Levetiracetam](#/drug/levetiracetam/status epilepticus)** — 89% of neurologists chose it as first-line after BZD in pregnancy\n• **AVOID [Valproate](#/drug/valproate/status epilepticus)** — teratogenic (neural tube defects), Category X\n• Fosphenytoin acceptable if needed (teratogenic risk mainly with chronic exposure, less concern for acute SE)\n• Refractory SE: midazolam or propofol infusion + consider early delivery\n\n**All pregnant patients with new seizure** should receive empiric magnesium while further workup obtained.',
    citation: [1, 9, 10],
    treatment: {
      firstLine: {
        drug: 'Magnesium Sulfate',
        dose: '4-6 g IV load, then 1-2 g/hr infusion',
        route: 'IV',
        frequency: 'Load then continuous infusion',
        duration: 'Until seizures controlled and delivery',
        notes: 'First-line for eclampsia. Give empirically to all pregnant patients with new seizure.',
      },
      alternative: {
        drug: 'Levetiracetam',
        dose: '60 mg/kg IV (max 4500 mg)',
        route: 'IV',
        frequency: 'Single loading dose',
        duration: 'Over 10-15 min',
        notes: 'Preferred 2nd-line ASM in pregnancy. AVOID valproate (Category X).',
      },
      monitoring: 'Fetal monitoring. OB consultation STAT. Consider emergent delivery. Monitor Mg levels (therapeutic 4-7 mEq/L), reflexes, respiratory status.',
    },
    next: 'se-2nd-line-choice',
  },

  {
    id: 'se-substance',
    type: 'info',
    module: 5,
    title: 'Substance-Induced SE',
    body: '**9% of SE cases are substance-induced.**\n\n**Isoniazid (INH) toxicity:**\n• [Pyridoxine (Vitamin B6)](#/drug/pyridoxine/inh toxicity) is the specific antidote\n• Dose: gram-for-gram to amount ingested, OR 5 g IV empiric if amount unknown\n• INH depletes pyridoxine → GABA synthesis fails → refractory seizures\n• Standard ASMs are ineffective without pyridoxine\n\n**Alcohol withdrawal:**\n• Benzodiazepines are first-line (high-dose may be needed)\n• [Phenobarbital](#/drug/phenobarbital/status epilepticus) is effective adjunct\n• Fosphenytoin/phenytoin INEFFECTIVE for alcohol withdrawal seizures\n\n**Sympathomimetic toxicity** (cocaine, methamphetamine, MDMA):\n• BZDs first-line\n• Avoid phenytoin\n\n**General principle:** Phenytoin/fosphenytoin is often **ineffective** for drug-induced seizures — phenytoin\'s selective action on voltage-gated sodium channels cannot overcome diffuse CNS toxicity from other drug mechanisms.\n\n**Treat the underlying toxidrome** alongside seizure management.',
    citation: [1, 11],
    treatment: {
      firstLine: {
        drug: 'Pyridoxine (Vitamin B6)',
        dose: 'Gram-for-gram to INH ingested, or 5 g IV empiric',
        route: 'IV',
        frequency: 'Single dose',
        duration: 'Immediate',
        notes: 'Specific antidote for INH toxicity. Standard ASMs ineffective without pyridoxine.',
      },
      alternative: {
        drug: 'Phenobarbital',
        dose: '15-20 mg/kg IV',
        route: 'IV',
        frequency: 'Single loading dose',
        duration: 'Max rate 50-100 mg/min',
        notes: 'Effective adjunct for alcohol withdrawal seizures. Phenytoin/fosphenytoin ineffective for drug-induced SE.',
      },
      monitoring: 'Treat underlying toxidrome. Avoid phenytoin in drug/alcohol-induced SE. High-dose BZD may be needed.',
    },
    next: 'se-2nd-line-choice',
  },

  {
    id: 'se-peds',
    type: 'info',
    module: 5,
    title: 'Pediatric Considerations',
    body: '**Same treatment algorithm as adults** — BZD first-line, then 2nd-line ASM, then anesthetic infusions.\n\n**BZD dosing (weight-based):**\n• IV [Lorazepam](#/drug/lorazepam/status epilepticus): 0.1 mg/kg (max 4 mg), repeat × 1\n• IM [Midazolam](#/drug/midazolam/status epilepticus): 13-40 kg → 5 mg; ≥40 kg → 10 mg (0.2 mg/kg, max 10 mg)\n• Rectal [Diazepam](#/drug/diazepam/status epilepticus): 0.2-0.5 mg/kg (max 20 mg)\n\n**2nd-line ASM:** Same agents and weight-based dosing as adults (per ESETT, which included pediatric patients).\n• EcLiPSE and ConSEPT trials confirmed levetiracetam and phenytoin are equivalent in pediatric convulsive SE\n\n**Pediatric-specific considerations:**\n• **Pyridoxine-dependent epilepsy** (age <2 yr): Give [Pyridoxine](#/drug/pyridoxine/pyridoxine dependent epilepsy) 100 mg IV if SE is refractory and no clear etiology — especially neonates with refractory seizures\n• **Febrile SE:** Most common etiology in children — workup directed at fever source\n• **Inborn errors of metabolism:** Consider in neonates/infants with unexplained SE\n• **Phenobarbital** remains first-line for neonatal seizures\n\n**Weight estimation:** <1 yr: (months × 0.5) + 3.5 kg | 1-10 yr: (years × 2) + 10 kg | >10 yr: (years × 2) + 20 kg',
    citation: [1, 2, 6],
    treatment: {
      firstLine: {
        drug: 'Lorazepam (pediatric)',
        dose: '0.1 mg/kg IV (max 4 mg)',
        route: 'IV',
        frequency: 'May repeat once',
        duration: 'Push over 2 min',
        notes: 'Same algorithm as adults. Weight-based dosing.',
      },
      alternative: {
        drug: 'Midazolam (pediatric)',
        dose: '0.2 mg/kg IM (max 10 mg); 13-40 kg: 5 mg, >=40 kg: 10 mg',
        route: 'IM',
        frequency: 'Single dose',
        duration: 'Immediate',
        notes: 'Use when no IV access. Rectal diazepam 0.2-0.5 mg/kg (max 20 mg) also acceptable.',
      },
      pcnAllergy: {
        drug: 'Pyridoxine (neonates/infants)',
        dose: '100 mg IV',
        route: 'IV',
        frequency: 'Single dose',
        duration: 'Immediate',
        notes: 'Consider in refractory SE age <2 yr with no clear etiology. Rule out pyridoxine-dependent epilepsy.',
      },
      monitoring: 'Weight estimation formulas provided. Febrile SE most common in children. Phenobarbital first-line for neonatal seizures.',
    },
    next: 'se-2nd-line-choice',
  },

  // =====================================================================
  // MODULE 6: DIFFERENTIAL & NCSE
  // =====================================================================

  {
    id: 'se-ncse',
    type: 'info',
    module: 6,
    title: 'Nonconvulsive Status Epilepticus (NCSE)',
    body: 'NCSE accounts for up to **48% of patients with altered consciousness post-SE** (ESETT data).\n\n**Suspect NCSE if:**\n• Unexplained altered mental status after convulsive SE\n• Subtle motor signs: eye deviation, nystagmus, lip smacking, eyelid fluttering, myoclonus\n• Failure to return to baseline after initial seizure treatment\n• Acutely ill ICU patients (especially on neurotoxic medications: cephalosporins, methotrexate, baclofen, lithium, opioids)\n\n**Diagnosis:** Requires **EEG** — cannot diagnose clinically.\n\n[NCSE Diagnostic Criteria](#/info/se-ncse-criteria) — Salzburg criteria and BZD trial protocol.\n\n**BZD trial (diagnostic + therapeutic):**\n• Administer [lorazepam](#/drug/lorazepam/status epilepticus) 1-2 mg IV while monitoring EEG\n• Clinical AND EEG improvement → confirms NCSE diagnosis\n\n**Treatment:** Same escalating algorithm as convulsive SE (BZD → 2nd-line → anesthetic infusions), but **urgency of aggressive treatment is debated** — weigh risks of anesthetic agents and intubation against ongoing nonconvulsive seizure activity.\n\nNCSE generally has lower mortality than convulsive SE, but delay in diagnosis worsens outcomes.',
    citation: [1, 2, 4],
    treatment: {
      firstLine: {
        drug: 'Lorazepam (BZD trial)',
        dose: '1-2 mg IV',
        route: 'IV',
        frequency: 'Single dose during EEG',
        duration: 'Diagnostic trial',
        notes: 'BZD trial is both diagnostic and therapeutic. Clinical AND EEG improvement confirms NCSE.',
      },
      monitoring: 'EEG required for diagnosis. Clinical + EEG improvement confirms NCSE. Weigh risks of aggressive treatment against ongoing nonconvulsive activity.',
    },
    next: 'se-iv-access',
  },

  {
    id: 'se-differential',
    type: 'result',
    module: 6,
    title: 'Not SE — Differential Diagnosis',
    body: '**Common SE mimics:**\n\n• **Psychogenic nonepileptic seizures (PNES):** Most common mimic. Features suggesting PNES: side-to-side head movements, pelvic thrusting, forced eye closure (seizures: eyes open), emotional outbursts, asynchronous limb movements, waxing/waning pattern, absence of postictal confusion. Video EEG is definitive.\n\n• **Syncope with myoclonus:** Brief jerking movements after loss of consciousness — self-limited, resolves when horizontal. Lasts seconds (not minutes).\n\n• **Movement disorders:** Dystonic reactions (from dopamine-blocking medications), oculogyric crisis (20-30 min, no loss of consciousness), tremor, myoclonus.\n\n• **Metabolic encephalopathy:** Uremia, hyperammonemia, hepatic encephalopathy, myxedema coma.\n\n• **Drug toxicity / intoxication:** Alcohol, delirium tremens, serotonin syndrome.\n\n• **Locked-in syndrome:** Anterior pontine infarction — appears unresponsive but conscious. Test with vertical eye movements.\n\n• **Decerebrate/decorticate posturing:** From structural brain injury — not rhythmic.\n\n**Key differentiators:**\n• Lateral tongue laceration suggests seizure over syncope\n• Lactate >2.45 mmol/L: 88% sensitivity, 87% specificity for GTC seizure vs syncope/PNES\n• Prolactin elevated 10-20 min post-seizure: 53% sensitivity, 93% specificity for convulsive SE\n\n**If uncertain, treat as SE** until effectively ruled out — delayed treatment worsens outcomes.',
    recommendation: 'Consider alternative diagnosis. If uncertain, treat as SE until proven otherwise. PNES is the most common mimic — video EEG is definitive. Do not administer antiseizure medications for confirmed PNES.',
    confidence: 'consider',
    citation: [1, 3],
  },

];

export const STATUS_EPILEPTICUS_NODE_COUNT = STATUS_EPILEPTICUS_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const STATUS_EPILEPTICUS_MODULE_LABELS = [
  'Recognition & Stabilization',
  'Phase 1: Benzodiazepines',
  'Phase 2: Urgent Control',
  'Refractory SE',
  'Special Populations',
  'Differential & NCSE',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const STATUS_EPILEPTICUS_CRITICAL_ACTIONS = [
  { text: 'Lorazepam 0.1 mg/kg IV (max 4 mg) or midazolam 0.2 mg/kg IM (max 10 mg) within 5 minutes', nodeId: 'se-iv-bzd' },
  { text: 'Repeat benzodiazepine once in 5-10 minutes if seizure persists', nodeId: 'se-bzd-response' },
  { text: 'Second-line ASM within 10 minutes: levetiracetam 60 mg/kg IV (max 4500 mg)', nodeId: 'se-levetiracetam' },
  { text: 'Check fingerstick glucose STAT - treat if <60 mg/dL with D50W 25 g IV', nodeId: 'se-glucose-labs' },
  { text: 'Intubate for refractory SE - use short-acting paralytic (avoid prolonged paralysis)', nodeId: 'se-rse-prep' },
  { text: 'Continuous EEG monitoring MANDATORY for refractory SE (cannot assess seizures in paralyzed patient)', nodeId: 'se-rse-prep' },
  { text: 'Midazolam infusion 0.2 mg/kg load, then 0.05-2 mg/kg/hr for refractory SE', nodeId: 'se-rse-infusion' },
  { text: 'Magnesium sulfate 4-6 g IV for eclampsia before other ASMs', nodeId: 'se-pregnancy' },
  { text: 'Pyridoxine 5 g IV empiric if INH toxicity suspected', nodeId: 'se-substance' },
];

export const STATUS_EPILEPTICUS_CITATIONS: Citation[] = [
  { num: 1, text: 'Betjemann JP, Bhatt J, Engel A. Status Epilepticus. Emergency Medicine Practice (EB Medicine). 2025;27(9):1-28.' },
  { num: 2, text: 'Brophy GM, Bell R, Claassen J, et al. Guidelines for the Evaluation and Management of Status Epilepticus. Neurocrit Care. 2012;17(1):3-23.' },
  { num: 3, text: 'Glauser T, Shinnar S, Gloss D, et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults. Epilepsy Curr. 2016;16(1):48-61.' },
  { num: 4, text: 'Kapur J, Elm J, Chamberlain JM, et al. Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus (ESETT). N Engl J Med. 2019;381(22):2103-2113.' },
  { num: 5, text: 'Silbergleit R, Durkalski V, Lowenstein D, et al. Intramuscular versus Intravenous Therapy for Prehospital Status Epilepticus (RAMPART). N Engl J Med. 2012;366(7):591-600.' },
  { num: 6, text: 'Dalziel SR, et al. Levetiracetam versus Phenytoin for Second-Line Treatment of Convulsive Status Epilepticus in Children (EcLiPSE/ConSEPT). Lancet. 2019;393(10186):2125-2134.' },
  { num: 7, text: 'Yasiry Z, Shorvon SD. The Relative Effectiveness of Five Antiepileptic Drugs in Treatment of Benzodiazepine-Resistant Convulsive Status Epilepticus: A Meta-Analysis. Epilepsia. 2014;55(9):1349-1361.' },
  { num: 8, text: 'Claassen J, Hirsch LJ, Emerson RG, Mayer SA. Treatment of Refractory Status Epilepticus with Pentobarbital, Propofol, or Midazolam: A Systematic Review. Epilepsia. 2002;43(2):146-153.' },
  { num: 9, text: 'Swor DE, et al. Management of Status Epilepticus in Pregnancy: A Survey of Neurologists and Neurointensivists. Neurocrit Care. 2024.' },
  { num: 10, text: 'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.' },
  { num: 11, text: 'Trinka E, Cock H, Hesdorffer D, et al. A Definition and Classification of Status Epilepticus — Report of the ILAE Task Force on Classification of Status Epilepticus. Epilepsia. 2015;56(10):1515-1523.' },
];
