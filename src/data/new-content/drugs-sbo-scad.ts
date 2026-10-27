// MedKitt - drug entries for Bowel Obstruction (adhesive SBO) and SCAD / coronary vasospasm.
// Sources read 2026-10-27. Doses come from the FDA labels on DailyMed, the 2023 AHA/ACC chronic coronary
// disease guideline (Table 17), and the Cochrane SBO review. Where two sources disagree, both are shown
// in the regimen text. Source conflicts are also logged in
// research/new-content/scad-vasospasm/signoff.md and research/new-content/bowel-obstruction-volvulus/signoff.md.
// drug-store.ts registers DRUGS_SBO_SCAD in ALL_DRUGS and merges ADDITIONS_SBO_SCAD into the target drug entries.

import type { DrugDose, DrugEntry } from '../drug-store.js';

// ---------------------------------------------------------------------------
// NEW ENTRIES
// ---------------------------------------------------------------------------

const DIATRIZOATE: DrugEntry = {
  id: 'diatrizoate',
  name: 'Gastrografin (diatrizoate meglumine / diatrizoate sodium)',
  genericName: 'Diatrizoate meglumine and diatrizoate sodium',
  drugClass: 'Water-soluble iodinated oral contrast',
  route: 'PO / NG (label: oral or rectal only)',
  indications: [
    'Adhesive SBO: water-soluble contrast to predict non-operative resolution (OFF-LABEL)',
    'Radiographic exam of GI tract segments (label)',
  ],
  dosing: [
    {
      indication: 'GI radiography (label, adult oral dose)',
      regimen:
        'Label adult oral dose: 30-90 mL (11-33 g iodine), depending on the nature of the examination and the size of the patient. Oral or rectal use only. Not for parenteral use. Discard unused portion.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to Gastrografin or any component (label)',
    'Suspected strangulation, peritonitis, or perforation (SBO tree safety text; not a label item)',
    'Esophagotracheal fistula: avoid use (label warning)',
  ],
  cautions: [
    'ASPIRATION (label WARNINGS): aspiration can cause pulmonary edema, pneumonitis, or death. If given by NG, verify tube position in the stomach before administration (label). Empty stomach and no use in a patient who keeps vomiting are practice points, not label text; source not verified.',
    'Anaphylactic reactions, including fatal cases (label). Medical personnel and resuscitation equipment must be available.',
    'Hypovolemia, hypotension, and shock from the hypertonic osmotic load (label). Correct electrolytes before use. An open IV line may be advisable in pediatric and severely debilitated patients (label).',
    'Hyperthyroidism, multinodular goiter: use with caution (label). The label reports thyroid storm after an intravascular iodinated agent and says a similar situation could follow oral iodides.',
    'Iodine interferes with thyroid function tests for 6 months to 1 year (label).',
    'Precipitate can mimic ulceration on film (label).',
  ],
  monitoring:
    'Serial abdominal exams. Abdominal film at 4-6 h and at 24 h. Watch volume status, BP, and electrolytes with large volumes or prolonged NG use. No contrast in the colon at 24 h: go to the surgical decision per the SBO tree.',
  notes:
    'Off-label for SBO; the label covers GI radiography only. Cochrane (Abbas 2007): colon contrast at 24 h predicted resolution with pooled sensitivity 0.97 and specificity 0.96. ' +
    'Gastrografin does not itself resolve SBO. It reduced hospital stay in patients managed without surgery. Recurrence is not changed. '+
    'Label pediatric doses (moved out of the dosing field): under 5 y 30 mL; 5-10 y 60 mL. '+
    'Off-label trial regimen (Cochrane CD004651 full text via PMC6465054): 100 mL orally or via NG, NG clamped 60 minutes; NG route is off-label per the label.',
  citations: [
    'GASTROGRAFIN (diatrizoate meglumine and diatrizoate sodium solution) oral solution. Prescribing information. DailyMed setid 8c2340e4-2b42-45dc-8fac-9960e8172547; Rev. August 2019; DailyMed page "Updated October 4, 2021" (read 2026-10-27). Only the DailyMed version was read.',
    'Abbas S, Bissett IP, Parry BR. Oral water soluble contrast for the management of adhesive small bowel obstruction. Cochrane Database Syst Rev. 2007;(3):CD004651. doi:10.1002/14651858.CD004651.pub3. Full text read via PMC6465054.',
  ],
};

const AMLODIPINE: DrugEntry = {
  id: 'amlodipine',
  name: 'Amlodipine (Norvasc)',
  genericName: 'Amlodipine besylate',
  drugClass: 'Dihydropyridine calcium channel blocker',
  route: 'PO',
  indications: [
    'Vasospastic angina (Prinzmetal / variant)',
    'Chronic stable angina',
    'Angiographically documented CAD (without HF or EF <40%)',
    'Hypertension',
  ],
  dosing: [
    {
      indication: 'Vasospastic angina (Prinzmetal / variant)',
      regimen: 'Name only: dose per cardiology.',
    },
  ],
  contraindications: ['Known sensitivity to amlodipine (label)'],
  cautions: [
    'Hypotension, additive with nitrates and other vasodilators',
    'Peripheral edema (common)',
    'Hepatic insufficiency, elderly, small or fragile patients: dose per cardiology.',
  ],
  monitoring: 'BP and heart rate at each dose change. Reassess anginal symptoms and ECG response.',
  notes:
    'FDA label lists vasospastic angina as an indication. The 2023 AHA/ACC Table 17 vasospastic pathway names verapamil first and isosorbide mononitrate second, and does not name amlodipine for vasospasm (it appears for microvascular angina). Sources conflict on the vasospasm pathway; logged in research/new-content/scad-vasospasm/signoff.md. Not linked from the SCAD tree yet.',
  citations: [
    'NORVASC (amlodipine besylate) tablets. Prescribing information. Revised 1/2019. DailyMed setid abd6a2ca-40c2-485c-bc53-db1c652505ed (indications and dosing sections read).',
    'Virani SS, Newby LK, Arnold SV, et al. 2023 AHA/ACC/ACCP/ASPC/NLA/PCNA Guideline for the Management of Patients With Chronic Coronary Disease. Circulation. 2023;148(9):e9-e119. doi:10.1161/CIR.0000000000001168 (Table 17 used for the conflict).',
  ],
};

const ISOSORBIDE_MONONITRATE: DrugEntry = {
  id: 'isosorbide-mononitrate',
  name: 'Isosorbide Mononitrate (IR tablets)',
  genericName: 'Isosorbide mononitrate',
  drugClass: 'Long-acting organic nitrate',
  route: 'PO',
  indications: [
    'Vasospastic angina (second-line add-on to calcium channel blocker)',
    'Angina prevention, coronary artery disease',
  ],
  dosing: [
    {
      indication: 'Vasospastic angina (second-line add-on to calcium channel blocker)',
      regimen: 'Name only: second-line add-on to a calcium channel blocker for vasospastic angina. Dose per cardiology.',
    },
  ],
  contraindications: [
    'PDE-5 inhibitors (sildenafil, tadalafil, vardenafil, avanafil): do not use. Severe hypotension, syncope, or ischemia (label).',
    'Riociguat (sGC stimulator): do not use. Hypotension (label).',
  ],
  cautions: [
    'Hypotension and syncope',
    'Headache (common)',
    'Tolerance with continuous dosing.',
  ],
  monitoring: 'BP and symptoms after each dose change. Confirm the PDE-5 washout before first dose.',
  notes:
    'Added for the SCAD / vasospasm long-acting nitrate step. The SCAD tree currently links isosorbide-dinitrate/angina, which is the stable-angina prophylaxis entry and not a vasospasm entry. Logged in research/new-content/scad-vasospasm/signoff.md.',
  citations: [
    'Isosorbide mononitrate tablets, USP. Prescribing information. DailyMed setid ae8f74f0-e600-4452-8557-958b603e2709; label revision 10/2022 (dosing and contraindications read).',
    'Virani SS, Newby LK, Arnold SV, et al. 2023 AHA/ACC/ACCP/ASPC/NLA/PCNA Guideline for the Management of Patients With Chronic Coronary Disease. Circulation. 2023;148(9):e9-e119. doi:10.1161/CIR.0000000000001168. Table 17 text read via the AHA 2023 guideline slide set; journal table not reached this pass.',
  ],
};

export const DRUGS_SBO_SCAD: DrugEntry[] = [DIATRIZOATE, AMLODIPINE, ISOSORBIDE_MONONITRATE];

// ---------------------------------------------------------------------------
// ADDITIONS: indication rows to merge into EXISTING drug-store entries.
// Each row's indication text carries the hint used by consult links.
// ---------------------------------------------------------------------------

export const ADDITIONS_SBO_SCAD: { drugId: string; dosing: DrugDose[]; indications?: string[] }[] = [
  {
    drugId: 'diltiazem',
    indications: ['Vasospastic angina (coronary artery spasm), oral'],
    dosing: [
      {
        indication: 'Vasospastic angina (coronary artery spasm), oral IR tablets',
        regimen: 'Named as a calcium channel blocker option for vasospastic angina. Dose per cardiology. The 2023 AHA/ACC Table 17 does not name diltiazem.',
      },
    ],
  },
  {
    drugId: 'verapamil',
    indications: ['Vasospastic (Prinzmetal) angina, oral IR'],
    dosing: [
      {
        indication: 'Vasospastic (Prinzmetal) angina, oral IR tablets',
        regimen: 'Named as a calcium channel blocker option for vasospastic (Prinzmetal) angina. Dose per cardiology.',
      },
    ],
  },
  {
    drugId: 'nitroglycerin',
    indications: ['Vasospasm acute chest pain (SL)'],
    dosing: [
      {
        indication: 'Vasospasm acute chest pain (SL)',
        regimen:
          'SL: 1 tablet under the tongue or in the buccal pouch at onset. May repeat every 5 min. Max 3 tablets within 15 min. ' +
          'If pain persists after 3 tablets: seek emergency care (label). ' +
          'Label indication is angina due to CAD; vasospasm use follows 2023 AHA/ACC Table 17 baseline (SL nitroglycerin as needed). ' +
          'Contraindicated with PDE-5 inhibitors (avanafil, sildenafil, tadalafil, vardenafil) and sGC stimulators (label). Confirm no PDE-5 use before giving.',
      },
    ],
  },
];
