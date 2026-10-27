// MedKitt - Hypertension / pheochromocytoma drug content
// drug-store.ts registers DRUGS_HTN_PHEO in ALL_DRUGS.
// ADDITIONS_HTN_PHEO: additive dosing rows that drug-store.ts merges into existing drug entries by drugId.
// Every dose below was read from the FDA label (DailyMed) or a guideline table (see citations).
// Source conflicts are shown in the regimen text, not resolved here.

import type { DrugEntry, DrugDose } from '../drug-store.js';

const PHENOXYBENZAMINE: DrugEntry = {
  id: 'phenoxybenzamine',
  name: 'Phenoxybenzamine (Dibenzyline)',
  genericName: 'Phenoxybenzamine hydrochloride',
  drugClass: 'Irreversible non-selective alpha-adrenergic blocker',
  route: 'PO',
  indications: ['Pheochromocytoma preoperative alpha blockade', 'Pheochromocytoma hypertension and sweating (label)'],
  dosing: [
    {
      indication: 'Pheochromocytoma preoperative alpha blockade',
      regimen: 'Start 10 mg PO BID. Increase every other day as BP allows. Label: initially 10 mg BID, then usually 20-40 mg 2-3 times/day to optimal BP control. Endocrine Society (Lenders 2014, as cited): final dose 1 mg/kg/day. SOURCE CONFLICT, both shown, no pick: the label Carcinogenesis section (generic phenoxybenzamine capsules, DailyMed) calls 20 mg BID the maximum recommended human dosage, and the label titration range (20-40 mg 2-3 times/day) and the 1 mg/kg/day guideline figure do not reconcile. Preop goal per Endocrine Society: seated BP <130/80, standing SBP >90. Give with high-sodium diet and fluids. Label: daily-dose effects are cumulative for nearly a week, so this is a pre-op plan, not an ED drug.',
      weightCalc: { dosePerKg: 1, unit: 'mg', dailyDivided: 2, label: 'Endocrine Society final dose (1 mg/kg/day, divided BID). No maxDose set: label maximum 20 mg BID conflicts; see regimen text' },
    },
  ],
  contraindications: [
    'Conditions where a fall in blood pressure may be undesirable',
    'Hypersensitivity to phenoxybenzamine or any component',
  ],
  cautions: [
    'Alpha blockade leaves beta receptors unopposed: exaggerated hypotension and tachycardia with drugs that stimulate both alpha and beta (including epinephrine). Start a beta-blocker only after adequate alpha blockade.',
    'Epinephrine reversal: epinephrine causes further BP drop. For severe hypotension, label cites IV norepinephrine (levarterenol).',
    'Postural hypotension, tachycardia, nasal congestion, miosis, inhibition of ejaculation, GI irritation, drowsiness, fatigue',
    'Use with caution in marked cerebral or coronary arteriosclerosis or renal damage. May worsen symptoms of respiratory infection.',
    'Long-term use not recommended (carcinogenicity signal in animals and case reports in humans).',
  ],
  monitoring: 'Seated and standing BP and HR daily during titration. Target per Endocrine Society: seated BP <130/80, standing SBP >90; HR 60-70 seated, 70-80 standing. Watch for orthostasis, volume depletion, and tachycardia.',
  notes: 'Oral preoperative agent for pheochromocytoma. Not an acute ED drug. For an acute pheo hypertensive crisis, give IV phentolamine first (see phentolamine entry); beta-blockade only after alpha blockade. Label status: the Dibenzyline brand set on DailyMed shows a marketing end date of 02/29/2024; generic phenoxybenzamine capsules are the listed product. Confirm local stock.',
  citations: [
    'Dibenzyline (phenoxybenzamine hydrochloride capsules, USP) Prescribing Information. FDA application 008708, supplement 25 (WellSpring Pharmaceutical, rev. 03/08). accessdata.fda.gov/drugsatfda_docs/label/2008/008708s025lbl.pdf. Read 2026-10-27; dosing and contraindication wording checked against this text.',
    'Dibenzyline (phenoxybenzamine hydrochloride capsules, USP) Prescribing Information. Advanz Pharma (US) Corp. Rev. 11/23. DailyMed setid 8852dd44-098c-4d99-88e0-a092a8e08e11. Accessed 2026-10-27.',
    'Phenoxybenzamine hydrochloride capsule (generic) Prescribing Information. DailyMed setid 0be6a394-cd10-42fc-97cf-ad53d81d8d93. Label revised 7/2026 per DailyMed page. Accessed 2026-10-27.',
    'Lenders JW, Duh QY, Eisenhofer G, et al. Pheochromocytoma and paraganglioma: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2014;99(6):1915-1942.',
  ],
};

export const DRUGS_HTN_PHEO: DrugEntry[] = [PHENOXYBENZAMINE];

export const ADDITIONS_HTN_PHEO: { drugId: string; dosing: DrugDose[]; indications?: string[] }[] = [
  {
    drugId: 'clevidipine',
    dosing: [
      {
        indication: 'Hypertensive emergency (titratable IV, oral not feasible)',
        regimen: 'Start 1-2 mg/h IV. Double the rate every 90 seconds until BP nears goal, then increase by less than double every 5-10 minutes. Usual maintenance 4-6 mg/h. Severe hypertension may need up to 32 mg/h (limited experience; most patients max 16 mg/h). Lipid limit: no more than 1000 mL, or an average of 21 mg/h, per 24 h. Use the same start rate in hepatic or renal impairment. Sources agree (label; 2017 ACC/AHA Table 19).',
      },
    ],
  },
  {
    drugId: 'nicardipine',
    dosing: [
      {
        indication: 'Hypertensive emergency (titratable IV infusion)',
        regimen: 'Start 5 mg/h IV (premixed 0.1 or 0.2 mg/mL, no further dilution). Increase by 2.5 mg/h every 5 min (rapid titration) to every 15 min (gradual), max 15 mg/h. If unacceptable hypotension or tachycardia: stop the infusion; when stable, restart at 3-5 mg/h. Titrate slowly in heart failure or hepatic or renal impairment. Contraindicated in advanced aortic stenosis. Sources agree (Cardene IV label; 2017 ACC/AHA Table 19).',
      },
    ],
  },
  {
    drugId: 'labetalol',
    dosing: [
      {
        indication: 'Hypertensive emergency (IV bolus or infusion)',
        regimen: 'Label: 0.25 mg/kg IV (max 20 mg) over 2 min. Repeat 20-80 mg IV every 10 min until BP at goal. Or infusion at 2 mg/min, titrated. Label: safety of total dose above 300 mg is not established. SOURCE CONFLICT: 2017 ACC/AHA Table 19 gives 0.3-1.0 mg/kg IV (max 20 mg) every 10 min, or infusion 0.4-1.0 mg/kg/h up to 3 mg/kg/h, cumulative up to 300 mg. Both shown; the calc uses the label value. Contraindicated: bronchial asthma, overt heart failure, second- or third-degree heart block, cardiogenic shock, severe bradycardia. Label warns of paradoxical BP rise in pheochromocytoma.',
        weightCalc: { dosePerKg: 0.25, unit: 'mg', maxDose: 20, label: 'Label IV bolus (ACC/AHA range 0.3-1.0 mg/kg, max 20 mg)' },
      },
    ],
  },
  {
    drugId: 'esmolol',
    dosing: [
      {
        indication: 'Hypertensive emergency (aortic dissection, heart-rate control; off-label for ED use)',
        regimen: 'Label indication is perioperative tachycardia and hypertension. Loading dose 500 mcg/kg IV over 1 min, then 50 mcg/kg/min infusion. Titrate in 50 mcg/kg/min steps to a max of 300 mcg/kg/min for hypertension. SOURCE CONFLICT: 2017 ACC/AHA Table 19 gives a loading dose of 500-1000 mcg/kg over 1 min, then 50 mcg/kg/min, max 200 mcg/kg/min. The Brevibloc label (DailyMed setid 9a3e69ab-3ffe-33af-e053-2a95a90a6524) caps the maintenance rate at 200 mcg/kg/min for tachycardia and 300 mcg/kg/min for hypertension (higher maintenance rates of 250-300 may be required). Both shown. Contraindicated with concurrent beta-blocker therapy, bradycardia, or decompensated heart failure.',
        weightCalc: { dosePerKg: 500, unit: 'mcg', label: 'Label loading bolus (ACC/AHA 500-1000 mcg/kg)' },
      },
    ],
    indications: ['Hypertensive emergency (aortic dissection, heart-rate control; off-label for ED use)'],
  },
];
