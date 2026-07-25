// myMedKitt - Sedation Options
// Side-by-side ED sedative comparison: onset, duration, adverse effects, contraindications, and use cases.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const SEDATION_OPTIONS_MODULE_LABELS = [
  'Visual Comparison',
  'Procedure Strategy',
  'Agitation Strategy',
  'ICU / Withdrawal Strategy',
  'Special Populations',
  'Drug Pearls',
];

export const SEDATION_OPTIONS_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Choose sedative by target: anxiolysis, analgesia, dissociation, deep hypnosis, cooperative sedation, or withdrawal control', nodeId: 'sedopt-goal' },
  { text: 'Deep sedation requires airway rescue setup, monitor, suction, oxygen, BVM, and capnography when available', nodeId: 'sedopt-procedure' },
  { text: 'Benzodiazepines and opioids have synergistic respiratory depression, especially in older, COPD, OSA, intoxicated, or frail patients', nodeId: 'sedopt-benzo-opioid' },
  { text: 'Ketamine is fastest for immediate dangerous agitation, but prepare for hypersalivation, laryngospasm, emesis, and post-dose airway reassessment', nodeId: 'sedopt-ketamine' },
  { text: 'Propofol is fast and clean but has no analgesia and can cause apnea and hypotension within seconds', nodeId: 'sedopt-propofol' },
  { text: 'Etomidate has short hemodynamic-neutral hypnosis but no analgesia, frequent myoclonus, and adrenal suppression signal', nodeId: 'sedopt-etomidate' },
  { text: 'QT risk: do not delay lifesaving control, but avoid repeated butyrophenones when QTc >500 ms or major torsades risks are present', nodeId: 'sedopt-qt' },
  { text: 'ICU ventilator sedation generally favors propofol or dexmedetomidine over benzodiazepine infusions when feasible', nodeId: 'sedopt-icu' },
  { text: 'Withdrawal physiology needs benzodiazepine or phenobarbital effect; dexmedetomidine is adjunct only and does not prevent seizures', nodeId: 'sedopt-withdrawal' },
];

export const SEDATION_OPTIONS_CITATIONS: Citation[] = [
  {
    num: 1,
    text: 'Farkas J. Analgesia and sedation for the critically ill patient. EMCrit Internet Book of Critical Care. Accessed 2026-06-07.',
  },
  {
    num: 2,
    text: 'Godwin SA, Burton JH, Gerardo CJ, et al. Clinical policy: procedural sedation and analgesia in the emergency department. Ann Emerg Med. 2014;63(2):247-258.e18.',
  },
  {
    num: 3,
    text: 'American College of Emergency Physicians Clinical Policies Subcommittee on Severe Agitation. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Out-of-Hospital or ED Patients Presenting With Severe Agitation. Ann Emerg Med. 2024;83(1):e1-e30. doi:10.1016/j.annemergmed.2023.09.010.',
  },
  {
    num: 4,
    text: 'Wilson MP, Pepper D, Currier GW, Holloman GH Jr, Feifel D. The psychopharmacology of agitation: Project BETA consensus statement. West J Emerg Med. 2012;13(1):26-34.',
  },
  {
    num: 5,
    text: 'Devlin JW, Skrobik Y, Gelinas C, et al. PADIS Guidelines for adult ICU pain, agitation/sedation, delirium, immobility, and sleep disruption. Crit Care Med. 2018;46(9):e825-e873.',
  },
  {
    num: 6,
    text: 'Merck Manual Professional Edition. How To Do Procedural Sedation and Analgesia. Accessed 2026-06-07.',
  },
  {
    num: 7,
    text: 'StatPearls. Procedural Sedation. NCBI Bookshelf. Accessed 2026-06-07.',
  },
  {
    num: 8,
    text: 'University of Illinois Chicago Drug Information Group. What is the risk of QT prolongation with droperidol? 2021.',
  },
  {
    num: 9,
    text: 'StatPearls. Dexmedetomidine. NCBI Bookshelf. Accessed 2026-06-07.',
  },
  {
    num: 10,
    text: 'Punia K, Scott W, Manuja K, et al. SAEM GRACE: Phenobarbital for alcohol withdrawal management in the emergency department: a systematic review of direct evidence. Acad Emerg Med. 2024;31(5):481-492. doi:10.1111/acem.14788.',
  },
  {
    num: 11,
    text: 'Green SM, Roback MG, Kennedy RM, Krauss B. Clinical practice guideline for emergency department ketamine dissociative sedation. Ann Emerg Med. 2011;57(5):449-461.',
  },
  {
    num: 12,
    text: 'UpToDate. Procedural sedation in adults: pharmacologic agents; Management of acute agitation in adults. Accessed 2026-06-07.',
  },
  {
    num: 13,
    text: 'American Heart Association. Adult and Pediatric Special Circumstances of Resuscitation: sympathomimetic poisoning. CPR and ECC Guidelines. Accessed 2026-06-07.',
  },
  {
    num: 14,
    text: 'American College of Emergency Physicians. Sub-Dissociative Dose Ketamine for Analgesia. ACEP policy statement (joint with ENA and SEMPA) and accompanying Policy Resource and Education Paper; protocolized IV analgesic range 0.1-0.3 mg/kg. Ann Emerg Med. 2018. doi:10.1016/j.annemergmed.2018.01.026. Accessed 2026-07-25.',
  },
  {
    num: 15,
    text: 'DailyMed. INAPSINE (droperidol) injection prescribing information, including boxed warning for QT prolongation and torsades de pointes and the 2.5 mg maximum recommended initial adult dose. US National Library of Medicine. Accessed 2026-07-25.',
  },
];

export const SEDATION_OPTIONS_NODES: DecisionNode[] = [
  {
    id: 'sedopt-start',
    type: 'info',
    module: 1,
    title: 'Sedation Options',
    body: `Use this as a pharmacy-side comparison of ED sedatives.

Open first:
- [Visual Sedative Comparison](#/info/sedation-options-slide)
- [Use-Case Selector](#/info/sedation-options-use-cases)
- [Do NOT / Pitfalls](#/info/sedation-options-stop)

Core rule: choose the drug by the clinical target, not by habit. Analgesia, anxiolysis, amnesia, dissociation, deep hypnosis, cooperative sedation, withdrawal control, and chemical control are different goals.`,
    citation: [1, 2, 3, 5, 6, 7],
    next: 'sedopt-goal',
    summary: 'Side-by-side sedative comparison for ED procedures, agitation, ICU sedation, withdrawal, frailty, acidosis, and QT risk.',
    safetyLevel: 'warning',
  },
  {
    id: 'sedopt-goal',
    type: 'question',
    module: 1,
    title: 'What Is the Sedation Goal?',
    body: 'Pick the clinical target first. The fastest drug is not always the safest drug.',
    options: [
      {
        label: 'Short painful procedure',
        description: 'Reduction, cardioversion, I&D, wound care, imaging requiring immobility',
        next: 'sedopt-procedure',
        urgency: 'urgent',
      },
      {
        label: 'Dangerous agitation or aggression',
        description: 'Immediate threat, stimulant physiology, psychiatric agitation, delirium, restraint struggle',
        next: 'sedopt-agitation',
        urgency: 'critical',
      },
      {
        label: 'Post-intubation or ICU sedation',
        description: 'Ventilator synchrony, analgesia-first sedation, deep vs light RASS target',
        next: 'sedopt-icu',
        urgency: 'urgent',
      },
      {
        label: 'Withdrawal or seizure-risk sedation',
        description: 'Alcohol withdrawal, benzodiazepine withdrawal, refractory seizure/status pathway',
        next: 'sedopt-withdrawal',
        urgency: 'critical',
      },
      {
        label: 'Fragile physiology',
        description: 'Older/frail, severe acidosis, shock, QT risk, OSA/COPD, pregnancy, pediatric',
        next: 'sedopt-special',
        urgency: 'critical',
      },
      {
        label: 'Drug-by-drug comparison',
        description: 'Open focused pharmacology pearls',
        next: 'sedopt-drug-menu',
      },
    ],
    citation: [1, 2, 3, 5, 6, 7],
    summary: 'Choose by target: procedure, agitation, ICU, withdrawal, fragile physiology, or drug comparison.',
  },
  {
    id: 'sedopt-procedure',
    type: 'question',
    module: 2,
    title: 'Procedural Sedation Strategy',
    body: `Before medication:
- Dedicated monitor, not the procedure operator.
- Suction, oxygen, BVM, airway adjuncts, and rescue meds ready.
- Continuous SpO2, BP cycling, ECG for deeper sedation or risk, and capnography when available.
- Painful procedures need analgesia unless using dissociative ketamine.

Choose the procedure profile.`,
    citation: [2, 6, 7],
    options: [
      {
        label: 'Brief deep sedation, fast off',
        description: 'Cardioversion, joint reduction, short painful procedure in monitored patient',
        next: 'sedopt-propofol',
        urgency: 'urgent',
      },
      {
        label: 'Dissociation and analgesia',
        description: 'Painful procedure, pediatric, asthma/bronchospasm, or need preserved respiratory tone',
        next: 'sedopt-ketamine',
        urgency: 'urgent',
      },
      {
        label: 'Hemodynamic-neutral brief hypnosis',
        description: 'Short painful procedure where hypotension from propofol is a concern',
        next: 'sedopt-etomidate',
        urgency: 'urgent',
      },
      {
        label: 'Anxiolysis plus analgesia only',
        description: 'Lower-depth sedation, laceration, imaging anxiety, small procedure',
        next: 'sedopt-benzo-opioid',
      },
      {
        label: 'Nitrous oxide option',
        description: 'Short procedure, cooperative patient, fast recovery, no closed gas space risk',
        next: 'sedopt-nitrous',
      },
    ],
    summary: 'Procedural sedation starts with rescue setup, then agent choice by pain, depth, hemodynamics, and airway risk.',
    safetyLevel: 'critical',
  },
  {
    id: 'sedopt-propofol',
    type: 'result',
    module: 2,
    title: 'Propofol',
    body: `Fast hypnotic. No analgesia.

Onset/duration:
- IV onset: 15-60 sec.
- Clinical duration: 3-10 min after bolus.

Best use:
- Brief deep procedural sedation.
- Cardioversion or reduction when airway-ready team is present.
- Post-intubation deep sedation when BP tolerates it.
- Status epilepticus ICU infusion after airway control.

Major risks:
- Apnea and airway obstruction can occur quickly.
- Dose-dependent hypotension and vasodilation.
- Pain on injection.
- Hypertriglyceridemia and propofol infusion syndrome with high-dose/prolonged infusion.

Avoid/caution:
- Shock, severe hypovolemia, tenuous preload, severe RV failure, elderly/frail without major dose reduction.
- No analgesia: pair with analgesic when procedure is painful.`,
    recommendation: 'Use propofol when rapid titratable hypnosis and rapid recovery are the priority and airway/BP rescue are ready.',
    treatment: {
      firstLine: {
        drug: 'Propofol',
        dose: '0.5-1 mg/kg IV, then 0.25-0.5 mg/kg q2-3 min to effect',
        route: 'IV',
        frequency: 'Titrate carefully',
        duration: 'Procedure only',
        notes: 'Use lower initial dose in older/frail, shock, or co-sedated patients. No analgesia.',
        confidence: 'critical',
      },
      monitoring: 'Continuous SpO2, ETCO2 when available, BP, ECG, airway-ready team, suction, BVM.',
    },
    confidence: 'recommended',
    citation: [1, 2, 6, 7],
    next: 'sedopt-side-effects',
    summary: 'Propofol: onset seconds, duration 3-10 min, clean fast off, no analgesia, apnea/hypotension are the big risks.',
    safetyLevel: 'critical',
  },
  {
    id: 'sedopt-ketamine',
    type: 'result',
    module: 2,
    title: 'Ketamine',
    body: `Dissociative sedative with analgesia and amnesia.

Onset/duration:
- IV onset: 30-60 sec.
- IM onset: 3-5 min.
- IV duration: 10-20 min.
- IM duration: 15-30 min, recovery longer.

Best use:
- Painful procedure where dissociation is desired.
- Immediate dangerous agitation when prolonged struggle is more dangerous.
- Asthma/bronchospasm or need to avoid hypotension.
- Analgesic adjunct at subdissociative dosing.

Major risks:
- Hypersalivation, vomiting, emergence, tachycardia, hypertension.
- Rare laryngospasm.
- Airway intervention risk rises in intoxication, acidosis, repeated sedatives, and severe agitation.

Avoid/caution:
- Severe uncontrolled hypertension, aortic dissection, active myocardial ischemia, severe pulmonary hypertension/RV strain, psychosis where emergence is unacceptable.
- Catecholamine-depleted shock can still crash after ketamine.`,
    recommendation: 'Use ketamine for dissociation, analgesia, severe agitation, or bronchospasm, but reassess airway and physiology after control.',
    treatment: {
      firstLine: {
        drug: 'Ketamine',
        dose: '1-2 mg/kg IV or 4-5 mg/kg IM',
        route: 'IV/IM',
        frequency: 'Single dissociative dose, reassess',
        duration: 'Procedure or immediate control',
        notes: 'Subdissociative analgesia: 0.1-0.3 mg/kg IV or infusion per protocol.',
        confidence: 'critical',
      },
      monitoring: 'Airway-ready monitoring, suction, emesis plan, SpO2, ETCO2 when available, BP/HR, post-dose reassessment.',
    },
    confidence: 'recommended',
    citation: [2, 3, 6, 7, 11, 12, 14],
    next: 'sedopt-side-effects',
    summary: 'Ketamine: dissociation plus analgesia, IV onset <1 min, IM 3-5 min, watch saliva/emesis/laryngospasm and post-dose airway risk.',
    safetyLevel: 'critical',
  },
  {
    id: 'sedopt-etomidate',
    type: 'result',
    module: 2,
    title: 'Etomidate',
    body: `Short hypnotic. No analgesia.

Onset/duration:
- IV onset: 30-60 sec.
- Clinical duration: 3-10 min.

Best use:
- RSI induction when hemodynamic neutrality is useful.
- Very brief procedures when propofol hypotension is a major concern.
- Cardioversion or reduction when analgesia is handled separately.

Major risks:
- Myoclonus is common and can interfere with reductions or imaging.
- Nausea/vomiting.
- Adrenal suppression signal after a single dose, clinical importance varies by context.
- No analgesia.

Avoid/caution:
- Septic shock or adrenal insufficiency when alternatives are reasonable.
- Procedures requiring immobility where myoclonus would be a problem.
- Repeated dosing or infusion is not routine ED sedation.`,
    recommendation: 'Use etomidate when a very short hypnotic with less immediate BP depression is useful, but plan analgesia and myoclonus management.',
    treatment: {
      firstLine: {
        drug: 'Etomidate',
        dose: '0.1-0.2 mg/kg IV for procedural sedation; 0.3 mg/kg IV for RSI induction',
        route: 'IV',
        frequency: 'Single dose, reassess',
        duration: 'Brief procedure or induction',
        notes: 'No analgesia. Myoclonus common. Avoid repeated dosing when possible.',
        confidence: 'standard',
      },
      monitoring: 'Airway-ready monitoring, BP/ECG/SpO2, emesis plan, analgesic plan.',
    },
    confidence: 'recommended',
    citation: [2, 6, 7],
    next: 'sedopt-side-effects',
    summary: 'Etomidate: fast brief hypnosis, less BP effect than propofol, no analgesia, myoclonus and adrenal suppression signal.',
    safetyLevel: 'warning',
  },
  {
    id: 'sedopt-benzo-opioid',
    type: 'info',
    module: 2,
    title: 'Benzodiazepine / Opioid Strategy',
    body: `Midazolam provides anxiolysis, amnesia, and sedation. Fentanyl provides analgesia. Together they can cause synergistic respiratory depression.

Midazolam:
- IV onset: 1-5 min; IM 5-15 min; IN 5-10 min.
- Duration: usually 30-60 min IV, longer in older/frail, hepatic disease, or repeated dosing.
- No analgesia.

Lorazepam:
- Slower onset and longer duration.
- Best for withdrawal and seizures, not quick procedure turnover.

Diazepam:
- IV onset is faster than lorazepam, but long active metabolites make it a poor routine procedural sedative.
- Useful in selected withdrawal or seizure pathways.

Fentanyl:
- IV onset 1-2 min, duration 30-60 min.
- Analgesia, no amnesia.

Use:
- Anxiety-dominant procedure.
- Painful procedure that does not require deep sedation.
- Seizure, withdrawal, stimulant toxidrome, or sympathomimetic agitation.

Avoid/caution:
- Older/frail, OSA/COPD, intoxication, hypotension, co-ingestions, recent opioids, pregnancy near delivery.
- Wait and reassess ventilation before redosing.`,
    citation: [2, 6, 7, 12],
    next: 'sedopt-side-effects',
    summary: 'Benzos provide anxiolysis/amnesia but no analgesia; opioids provide analgesia but no amnesia; together they depress ventilation.',
    safetyLevel: 'critical',
  },
  {
    id: 'sedopt-nitrous',
    type: 'info',
    module: 2,
    title: 'Nitrous Oxide',
    body: `Rapid inhaled anxiolysis with mild analgesia.

Onset/duration:
- Onset: 2-5 min.
- Offset: usually 3-5 min after stopping and oxygen washout.

Best use:
- Short pediatric or adult procedure.
- Laceration repair, IV start, abscess setup, minor orthopedic manipulation.
- Patient needs to leave quickly and can cooperate with mask.

Major risks:
- Nausea/vomiting, dizziness, dysphoria, diffusion into closed gas spaces.

Avoid/caution:
- Pneumothorax, bowel obstruction, middle ear surgery/air, intracranial air, decompression sickness, first trimester pregnancy, severe B12 deficiency, recent bleomycin, inability to cooperate with mask.
- Not enough for major painful procedures alone.`,
    citation: [6, 7],
    next: 'sedopt-side-effects',
    summary: 'Nitrous: onset 2-5 min, offset 3-5 min, great for brief cooperative procedures, avoid closed gas spaces.',
  },
  {
    id: 'sedopt-agitation',
    type: 'question',
    module: 3,
    title: 'Agitation / Aggression Strategy',
    body: `First decide whether the patient is an immediate danger or whether evaluation can happen first.

Do not let the label drive the drug. Match the physiology:
- Immediate threat: fastest reliable control.
- Stimulant/hyperthermia/withdrawal/seizure: benzodiazepine physiology.
- Psychosis/undifferentiated severe agitation: antipsychotic plus benzodiazepine often works faster than either alone.
- Frail, Parkinson/Lewy body, QT risk: avoid reflex butyrophenone stacking.`,
    citation: [3, 4, 8, 13],
    options: [
      {
        label: 'Immediate violent threat',
        description: 'Rapid reliable control needed to stop danger or physiology collapse',
        next: 'sedopt-ketamine',
        urgency: 'critical',
      },
      {
        label: 'Stimulant, withdrawal, seizure, hyperthermia',
        description: 'Benzodiazepine-first physiology',
        next: 'sedopt-benzo-opioid',
        urgency: 'critical',
      },
      {
        label: 'Undifferentiated severe agitation',
        description: 'Droperidol plus midazolam or atypical antipsychotic plus midazolam',
        next: 'sedopt-droperidol',
        urgency: 'urgent',
      },
      {
        label: 'Primary psychosis but not crashing',
        description: 'Antipsychotic-focused pathway',
        next: 'sedopt-antipsychotics',
      },
      {
        label: 'QT, Parkinson/Lewy, elderly, or respiratory-risk patient',
        description: 'Special population branch',
        next: 'sedopt-special',
        urgency: 'urgent',
      },
    ],
    summary: 'Agitation sedation depends on immediate danger and physiology, not just psychiatric diagnosis.',
    safetyLevel: 'critical',
  },
  {
    id: 'sedopt-droperidol',
    type: 'result',
    module: 3,
    title: 'Droperidol',
    body: `Butyrophenone antipsychotic and antiemetic.

Onset/duration:
- IV onset: 3-10 min.
- IM onset: 5-15 min.
- Duration: often 2-4 h, sometimes longer.

Best use:
- Undifferentiated severe agitation.
- Nausea, migraine, cannabinoid hyperemesis per local practice.
- Combination with midazolam for faster agitation control when QT/stimulant hyperthermia are not dominant.

Major risks:
- QT prolongation in susceptible patients.
- EPS/akathisia/dystonia, hypotension, oversedation when combined.

Avoid/caution:
- QTc >500 ms, congenital long QT, torsades history, severe hypoK/hypoMg, high-risk QT polypharmacy.
- Parkinson disease, Lewy body dementia.
- Antipsychotic-only therapy for stimulant-associated life-threatening hyperthermia.`,
    recommendation: 'Droperidol is a strong ED agitation option, but check QT risk when practical and avoid repeated dosing in high-risk QT patients.',
    treatment: {
      firstLine: {
        drug: 'Droperidol',
        dose: '5-10 mg IM/IV for severe agitation; lower for nausea/headache',
        route: 'IM/IV',
        frequency: 'Once, reassess in 10-15 min',
        duration: 'Single dose with reassessment',
        notes: 'Often paired with midazolam 2-5 mg for severe agitation. Use lower doses in older/frail. Regulatory note: droperidol carries an FDA boxed warning for QT prolongation and torsades, and the labeled maximum initial adult dose is 2.5 mg; agitation dosing above that is off-label use supported by the cited ACEP severe-agitation policy and Project BETA consensus.',
        confidence: 'caution',
      },
      monitoring: 'ECG when safe in high-risk QT patients, electrolytes, sedation depth, airway/respiratory monitoring when combined.',
    },
    confidence: 'recommended',
    citation: [3, 4, 8, 15],
    next: 'sedopt-qt',
    summary: 'Droperidol: fast ED agitation drug, 2-4 h duration, QT/EPS cautions, often paired with midazolam.',
    safetyLevel: 'warning',
  },
  {
    id: 'sedopt-antipsychotics',
    type: 'info',
    module: 3,
    title: 'Haloperidol / Olanzapine',
    body: `Haloperidol:
- IM onset: 15-30 min; IV onset faster but QT/EPS monitoring matters.
- Duration: 4-8 h or longer.
- Best for psychosis, delirium agitation when slower onset acceptable, and when respiratory depression from benzos is undesirable.
- Major risks: QT prolongation, EPS, dystonia, akathisia, NMS, Parkinson/Lewy worsening.

Olanzapine:
- IM onset: 15-30 min; PO/ODT often 30-60 min.
- Duration: often 12-24 h.
- Best for primary psychosis/agitation when longer calming is desired.
- Major risks: sedation, orthostasis, anticholinergic effects, metabolic history, black-box dementia warning.
- Do not give IM olanzapine close to parenteral benzodiazepines because of respiratory/cardiopulmonary risk.

Use lower doses in older/frail patients. Avoid dopamine-blocking antipsychotics in Parkinson disease and Lewy body dementia when possible.`,
    citation: [3, 4, 8, 12],
    next: 'sedopt-side-effects',
    summary: 'Haloperidol is slower but familiar; olanzapine lasts longer; both need QT/EPS/frailty/Parkinson caution.',
    safetyLevel: 'warning',
  },
  {
    id: 'sedopt-icu',
    type: 'question',
    module: 4,
    title: 'ICU / Post-Intubation Sedation',
    body: `PADIS-style approach:
- Treat pain first.
- Target light sedation when feasible.
- Use RASS or another scale.
- Propofol or dexmedetomidine are generally preferred over benzodiazepine infusions for mechanically ventilated adults when feasible.

Pick the ICU target.`,
    citation: [1, 5],
    calculatorLinks: [{ id: 'rass', label: 'RASS' }],
    options: [
      {
        label: 'Deep sedation or seizure suppression',
        description: 'Ventilator dyssynchrony, paralysis, status epilepticus, severe agitation after intubation',
        next: 'sedopt-propofol',
        urgency: 'critical',
      },
      {
        label: 'Light cooperative sedation',
        description: 'Extubation pathway, non-intubated cooperative patient, avoid respiratory depression',
        next: 'sedopt-dex',
        urgency: 'urgent',
      },
      {
        label: 'Analgesia plus bronchodilation or less hypotension',
        description: 'Asthma, pain, opioid-sparing, propofol hypotension concern',
        next: 'sedopt-ketamine',
        urgency: 'urgent',
      },
      {
        label: 'Withdrawal or refractory seizure physiology',
        description: 'Alcohol/benzo withdrawal, status pathway adjunct',
        next: 'sedopt-phenobarb',
        urgency: 'critical',
      },
    ],
    summary: 'ICU sedation should be analgesia-first, RASS-targeted, and usually propofol/dex over benzodiazepine infusions when feasible.',
    safetyLevel: 'warning',
  },
  {
    id: 'sedopt-dex',
    type: 'result',
    module: 4,
    title: 'Dexmedetomidine',
    body: `Alpha-2 agonist. Cooperative sedation without meaningful respiratory depression.

Onset/duration:
- No-load onset: 15-30 min.
- Loading onset: 5-10 min, but loading can cause bradycardia/hypotension.
- Context-sensitive offset: often 30-120 min after stopping.

Best use:
- Light ICU sedation, extubation bridge, NIV tolerance, awake airway cooperation, anxious but cooperative patient.
- Delirium-prone ventilated patient where light sedation is the goal.

Major risks:
- Bradycardia and hypotension.
- Transient hypertension with loading dose.
- Too slow for crashing agitation or immediate procedural needs.

Avoid/caution:
- Severe bradycardia, high-grade AV block, active shock/hypotension, severe LV/RV failure without close monitoring.
- Not monotherapy for alcohol withdrawal or seizures.`,
    recommendation: 'Use dexmedetomidine for cooperative light sedation when respiratory drive preservation is important and brady/hypotension risk is acceptable.',
    treatment: {
      firstLine: {
        drug: 'Dexmedetomidine',
        dose: '0.2-0.7 mcg/kg/hr IV, titrate q15-30 min',
        route: 'IV infusion',
        frequency: 'Continuous infusion',
        duration: 'As clinically needed',
        notes: 'Skip loading dose in most ED/ICU patients. Consider deep consult for details.',
        confidence: 'standard',
      },
      alternative: {
        drug: 'Dexmedetomidine loading dose',
        dose: '0.5-1 mcg/kg over 10 min',
        route: 'IV',
        frequency: 'Rare selected use',
        duration: '10 min load',
        notes: 'Avoid in labile, hypotensive, bradycardic, or frail patients.',
        confidence: 'caution',
      },
      monitoring: 'Continuous ECG, BP, SpO2. Watch bradycardia, hypotension, and delayed onset.',
    },
    confidence: 'recommended',
    citation: [1, 5, 9],
    next: 'sedopt-side-effects',
    summary: 'Dex: cooperative light sedation with preserved respirations, slow onset, brady/hypotension are limiting.',
    safetyLevel: 'warning',
  },
  {
    id: 'sedopt-withdrawal',
    type: 'question',
    module: 4,
    title: 'Withdrawal / Seizure-Risk Sedation',
    body: `Withdrawal sedation is physiology treatment, not just calming.

Alcohol and benzodiazepine withdrawal need GABAergic therapy that prevents seizures and delirium tremens. Dexmedetomidine may control tachycardia/agitation but does not treat seizure risk.`,
    citation: [1, 10, 12],
    options: [
      {
        label: 'Alcohol or benzodiazepine withdrawal',
        description: 'Benzodiazepine or phenobarbital strategy',
        next: 'sedopt-phenobarb',
        urgency: 'critical',
      },
      {
        label: 'Active seizure or status epilepticus pathway',
        description: 'Benzodiazepines first, then antiseizure/status pathway',
        next: 'sedopt-benzo-opioid',
        urgency: 'critical',
      },
      {
        label: 'Autonomic agitation despite GABA therapy',
        description: 'Dex adjunct, not monotherapy',
        next: 'sedopt-dex',
        urgency: 'urgent',
      },
    ],
    summary: 'Withdrawal requires seizure-preventing GABAergic treatment; dex is adjunct only.',
    safetyLevel: 'critical',
  },
  {
    id: 'sedopt-phenobarb',
    type: 'result',
    module: 4,
    title: 'Phenobarbital',
    body: `Long-acting barbiturate with GABAergic and anti-glutamate effects.

Onset/duration:
- IV onset: about 5-30 min depending on rate and endpoint.
- IM onset: slower and less titratable.
- Clinical duration: many hours; half-life about 3-4 days.

Best use:
- Alcohol withdrawal, especially escalating benzodiazepine needs or protocolized phenobarbital pathway.
- Refractory withdrawal adjunct or alternative per local protocol.
- Antiseizure/status pathway in selected contexts.

Major risks:
- Long duration and stacking.
- Respiratory depression, hypotension, coma, especially with benzodiazepines, opioids, alcohol, or hepatic dysfunction.
- No rapid reversal.

Avoid/caution:
- Severe respiratory insufficiency, unstable airway, severe hepatic impairment, porphyria, heavy co-sedative load.
- Do not combine casually with large benzodiazepine loads without airway/ICU plan.`,
    recommendation: 'Use phenobarbital for withdrawal physiology when a protocol and monitoring plan exist; respect the long tail and co-sedative stacking.',
    treatment: {
      firstLine: {
        drug: 'Phenobarbital',
        dose: '130-260 mg IV increments or 10-15 mg/kg load per local protocol',
        route: 'IV preferred',
        frequency: 'Titrate to endpoint',
        duration: 'Long acting',
        notes: 'Avoid casual stacking with large benzodiazepine/opioid exposure.',
        confidence: 'caution',
      },
      monitoring: 'Frequent sedation score, respiratory status, BP, airway plan, cumulative dose tracking.',
    },
    confidence: 'recommended',
    citation: [1, 10, 12],
    next: 'sedopt-side-effects',
    summary: 'Phenobarbital: good withdrawal physiology drug, IV onset minutes, very long tail, respiratory depression with co-sedatives.',
    safetyLevel: 'critical',
  },
  {
    id: 'sedopt-special',
    type: 'question',
    module: 5,
    title: 'Special Population / High-Risk Physiology',
    body: 'Pick the constraint that should dominate drug choice.',
    options: [
      {
        label: 'Older or frail',
        next: 'sedopt-older',
        urgency: 'urgent',
      },
      {
        label: 'Severe acidosis or shock',
        next: 'sedopt-acidosis',
        urgency: 'critical',
      },
      {
        label: 'QT risk',
        next: 'sedopt-qt',
        urgency: 'urgent',
      },
      {
        label: 'OSA, COPD, intoxication, or hypoventilation risk',
        next: 'sedopt-respiratory',
        urgency: 'critical',
      },
      {
        label: 'Pediatric or pregnancy context',
        next: 'sedopt-peds-pregnancy',
        urgency: 'urgent',
      },
    ],
    citation: [2, 3, 5, 6, 7, 8, 12],
    summary: 'Special populations change the drug choice more than the procedure sometimes.',
    safetyLevel: 'warning',
  },
  {
    id: 'sedopt-older',
    type: 'info',
    module: 5,
    title: 'Older / Frail Patient',
    body: `Principles:
- Start 25-50% lower for most sedatives.
- Redose slowly after observed effect, not by clock alone.
- Avoid benzodiazepines for routine delirium when possible.
- Avoid dopamine-blocking antipsychotics in Parkinson disease and Lewy body dementia.
- Avoid stacking opioids, benzodiazepines, phenobarbital, alcohol, and sleep meds.
- Consider etomidate or carefully reduced ketamine/propofol for brief procedures depending on BP, airway, and procedure.

Drug nudges:
- Propofol: small aliquots, high apnea/hypotension risk.
- Midazolam: lower dose, longer effect than expected.
- Ketamine: lower dose may suffice; emergence/HTN can matter.
- Droperidol/haloperidol: lower dose and QT/EPS vigilance.
- Dexmedetomidine: brady/hypotension and slow onset.`,
    citation: [2, 3, 5, 6, 7, 12],
    next: 'sedopt-side-effects',
    summary: 'Older/frail patients need lower starts, slower redosing, less stacking, and more respiratory/QT/delirium caution.',
    safetyLevel: 'critical',
  },
  {
    id: 'sedopt-acidosis',
    type: 'info',
    module: 5,
    title: 'Severe Acidosis / Shock',
    body: `The danger is not just the sedative. It is loss of compensatory ventilation and collapse after apnea, paralysis, or hypotension.

Principles:
- Preoxygenate and resuscitate before sedation when feasible.
- Avoid post-intubation hypoventilation in metabolic acidosis; match minute ventilation immediately.
- Reduce induction/sedative doses in shock.
- Propofol can abruptly drop BP and stop breathing.
- Benzodiazepines can accumulate and depress ventilation.
- Ketamine may preserve BP in many patients, but catecholamine-depleted shock can still collapse.
- Etomidate is hemodynamically attractive but has adrenal suppression signal and no analgesia.
- Phenobarbital/benzodiazepine stacking can convert agitation into respiratory failure.

For pH <7.1 or shock: sedation choice should be paired with airway, ventilator, vasopressor, and bicarbonate/hyperkalemia plans when indicated.`,
    citation: [1, 2, 5, 6, 7, 12],
    next: 'sedopt-side-effects',
    summary: 'Severe acidosis needs ventilation planning, reduced dosing, and immediate post-airway minute ventilation matching.',
    safetyLevel: 'critical',
  },
  {
    id: 'sedopt-qt',
    type: 'info',
    module: 5,
    title: 'QT / ECG Risk',
    body: `Do not delay lifesaving chemical control for ECG when the patient is an immediate threat.

Get ECG first when practical if:
- Known long QT syndrome.
- QTc >500 ms.
- Torsades history.
- Multiple QT-prolonging medications.
- Severe hypokalemia, hypomagnesemia, hypocalcemia.
- Syncope, chest pain, stimulant toxicity, renal failure, older/frail, repeated antipsychotic doses.

Drug implications:
- Droperidol/haloperidol: avoid or minimize repeated dosing when QTc >500 ms or major torsades risk.
- Olanzapine: less QT focus than butyrophenones but still caution with frailty and co-sedatives.
- Benzodiazepines and ketamine are generally QT-neutral alternatives for immediate control when clinically appropriate.
- Correct K/Mg/Ca and monitor after control.`,
    citation: [3, 4, 8, 12],
    next: 'sedopt-side-effects',
    summary: 'QT risk should guide antipsychotic choice when practical, but immediate danger still gets controlled first.',
    safetyLevel: 'warning',
  },
  {
    id: 'sedopt-respiratory',
    type: 'info',
    module: 5,
    title: 'OSA / COPD / Hypoventilation / Intoxication',
    body: `High-risk pattern:
- OSA, obesity hypoventilation, COPD, neuromuscular weakness, intoxication, opioid exposure, alcohol, sedative co-ingestion, pregnancy, older/frail.

Principles:
- Use the lowest effective depth.
- Avoid rapid stacking.
- Use ETCO2 when available.
- Prefer agents that preserve ventilation when they fit the goal: ketamine for dissociation, dexmedetomidine for cooperative light sedation, nitrous for brief cooperative procedures.
- Propofol and benzo/opioid combinations can convert partial obstruction into apnea.
- Have BVM and airway adjuncts at bedside before medication.

If the procedure truly requires deep sedation, treat this as an airway-rescue case from the start.`,
    citation: [2, 6, 7, 12],
    next: 'sedopt-side-effects',
    summary: 'Respiratory-risk patients need capnography, lower dose, less stacking, and airway rescue before the first dose.',
    safetyLevel: 'critical',
  },
  {
    id: 'sedopt-peds-pregnancy',
    type: 'info',
    module: 5,
    title: 'Pediatric / Pregnancy Notes',
    body: `Pediatrics:
- Ketamine is a common ED dissociative agent with strong pediatric experience.
- Nitrous is useful for brief cooperative procedures.
- Intranasal midazolam can help anxiolysis but has no analgesia.
- Dose by weight and monitor with the same airway rescue discipline.

Pregnancy:
- Maternal oxygenation and perfusion are fetal resuscitation.
- Avoid unnecessary deep sedation.
- Anticipate aspiration risk and left uterine displacement in later pregnancy.
- Nitrous is generally avoided in first trimester and when occupational exposure controls are poor.
- Use the drug required for maternal emergency care when benefits outweigh risks.

Local anesthesia, regional blocks, distraction, and analgesia-first plans often reduce sedative burden.`,
    citation: [2, 6, 7, 12],
    next: 'sedopt-side-effects',
    summary: 'Peds and pregnancy need weight/airway discipline, aspiration planning, and the lowest depth that safely accomplishes the goal.',
    safetyLevel: 'warning',
  },
  {
    id: 'sedopt-drug-menu',
    type: 'question',
    module: 6,
    title: 'Drug-by-Drug Pearls',
    body: 'Open the focused drug family.',
    options: [
      { label: 'Propofol', next: 'sedopt-propofol' },
      { label: 'Ketamine', next: 'sedopt-ketamine' },
      { label: 'Etomidate', next: 'sedopt-etomidate' },
      { label: 'Midazolam / lorazepam / fentanyl', next: 'sedopt-benzo-opioid' },
      { label: 'Droperidol', next: 'sedopt-droperidol' },
      { label: 'Haloperidol / olanzapine', next: 'sedopt-antipsychotics' },
      { label: 'Dexmedetomidine', next: 'sedopt-dex' },
      { label: 'Phenobarbital', next: 'sedopt-phenobarb' },
      { label: 'Nitrous oxide', next: 'sedopt-nitrous' },
    ],
    citation: [1, 2, 3, 5, 6, 7],
    summary: 'Jump directly to a sedative family.',
  },
  {
    id: 'sedopt-side-effects',
    type: 'result',
    module: 6,
    title: 'Side-Effect Pattern Recognition',
    body: `Pattern map:
- Apnea/obstruction: propofol, benzo/opioid stacking, intoxication, OSA/COPD.
- Hypotension: propofol, dex loading, high sedative burden, shock physiology.
- Hypertension/tachycardia: ketamine, stimulant physiology, pain under-treatment.
- Bradycardia: dexmedetomidine, high vagal tone, beta-blockers, conduction disease.
- QT/EPS: droperidol, haloperidol, other dopamine blockers.
- Myoclonus: etomidate.
- Vomiting/saliva/laryngospasm: ketamine.
- Long tail/stacking: lorazepam, diazepam, phenobarbital, olanzapine, repeated benzodiazepines.

Recovery rule: do not discharge or leave unmonitored until airway, ventilation, perfusion, mentation, pain/nausea, and sedation trajectory are safe.`,
    recommendation: 'Recognize the adverse-effect pattern early and rescue the physiology, not just the number on the monitor.',
    confidence: 'recommended',
    citation: [1, 2, 3, 5, 6, 7, 8, 10, 11],
    summary: 'Know each drug signature: apnea, hypotension, QT/EPS, bradycardia, myoclonus, saliva/emesis, and long-tail stacking.',
    safetyLevel: 'warning',
  },
];

export const SEDATION_OPTIONS_NODE_COUNT = SEDATION_OPTIONS_NODES.length;
