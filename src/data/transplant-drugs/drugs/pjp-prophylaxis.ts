import type { Cited, DrugClass, DrugEffectOverride, OncDrug, OncSource } from '../../onc-drugs/types.js';
import type { TxGroup } from '../types.js';

// PJP prophylaxis drugs for the Transplant Drugs Side-effects consult: sulfamethoxazole-trimethoprim, atovaquone, dapsone, pentamidine.
// Every line is paraphrased from the drug's own FDA label (DailyMed SPL XML saved in research/transplant-sources/dailymed/) and cites that label.
// Nothing from outside the labels. No doses. No label indication names an organ (Bactrim names renal transplant recipients only in an interaction); no card is filed under an organ (cancers: []).
// Line format: a short head, a colon, one hazard; 200 characters at most. Interaction lines live in the `interactions` array (heads per research/transplant-sources/cards/TAXONOMY.md in that order; plain drug-named lines last).
// Sources, classes and the group registration are defined here, so no shared file is edited.
const c = (v: string, ...cite: string[]): Cited => ({ v, cite });

// ------------------------------------------------------------------ sources
const dm = (setid: string): string => `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${setid}`;
export const SOURCES: Record<string, OncSource> = {
  'pi-bactrim': { key: 'pi-bactrim', kind: 'fda-pi', text: 'BACTRIM (sulfamethoxazole and trimethoprim) tablets, Sun Pharmaceutical Industries, Inc. Prescribing information, DailyMed set ID f59d0c04-9c66-4d53-a0e1-cb55570deb62, SPL effective 2024-12-30.', url: dm('f59d0c04-9c66-4d53-a0e1-cb55570deb62'), revised: 'Rev. 08, December 2024' },
  'pi-mepron': { key: 'pi-mepron', kind: 'fda-pi', text: 'MEPRON (atovaquone oral suspension), GlaxoSmithKline LLC. Prescribing information, DailyMed set ID b426b6bf-f07e-4580-97ae-dfca1ddf5b8f, SPL effective 2026-03-20.', url: dm('b426b6bf-f07e-4580-97ae-dfca1ddf5b8f'), revised: '3/2026' },
  'pi-dapsone': { key: 'pi-dapsone', kind: 'fda-pi', text: 'Dapsone tablets USP (made by Taro Pharmaceutical Industries, distributed by Taro Pharmaceuticals U.S.A., Inc.; DailyMed labeler Sun Pharmaceutical Industries, Inc.). Prescribing information, DailyMed set ID cb312185-b9f1-4fa4-9481-bcf5d9bb3edf, SPL effective 2026-03-17.', url: dm('cb312185-b9f1-4fa4-9481-bcf5d9bb3edf'), revised: 'December 2018' },
  'pi-pentam': { key: 'pi-pentam', kind: 'fda-pi', text: 'PENTAM 300 (pentamidine isethionate for injection), Fresenius Kabi USA, LLC. Prescribing information, DailyMed set ID cc2b635e-4840-4dc3-a177-5484371680e8, SPL effective 2022-09-13.', url: dm('cc2b635e-4840-4dc3-a177-5484371680e8'), revised: 'May 2022' },
  'pi-nebupent': { key: 'pi-nebupent', kind: 'fda-pi', text: 'NEBUPENT (pentamidine isethionate) for inhalation solution, Fresenius Kabi USA, LLC. Prescribing information, DailyMed set ID e2ad9d3c-b6c3-4f70-87e0-722a8ff94ccb, SPL effective 2024-10-15.', url: dm('e2ad9d3c-b6c3-4f70-87e0-722a8ff94ccb'), revised: 'October 2016' },
};

const B = 'pi-bactrim';
const M = 'pi-mepron';
const D = 'pi-dapsone';
const PE = 'pi-pentam';
const NB = 'pi-nebupent';

// ------------------------------------------------------------------ classes (one per drug; the four share no mechanism, so no class-level effects)
export const CLASSES: DrugClass[] = [
  { id: 'tx-pjp-smx-tmp', name: 'Sulfonamide-trimethoprim combination', mechanism: c('Antibacterial combination; also treats documented PJP and prevents it in immunosuppressed patients at risk.', B), effects: [] },
  { id: 'tx-pjp-atovaquone', name: 'Quinone antimicrobial', mechanism: c('Quinone antimicrobial indicated to prevent PJP in patients who cannot tolerate TMP-SMX.', M), effects: [] },
  { id: 'tx-pjp-dapsone', name: 'Sulfone', mechanism: c('Sulfone antibacterial; the label indicates it for dermatitis herpetiformis and leprosy.', D), effects: [] },
  { id: 'tx-pjp-pentamidine', name: 'Aromatic diamidine', mechanism: c('Aromatic diamidine active against Pneumocystis; injection treats PCP, inhalation prevents PJP.', PE, NB), effects: [] },
];

// ------------------------------------------------------------------ sulfamethoxazole-trimethoprim (Bactrim)
const smxTmp: OncDrug = {
  id: 'sulfamethoxazole-trimethoprim', generic: 'Sulfamethoxazole-trimethoprim', brands: ['Bactrim', 'Bactrim DS'], aliases: ['sulfamethoxazole and trimethoprim'],
  editorAliases: ['TMP-SMX', 'SMX-TMP', 'TMP/SMX', 'SMX/TMP', 'co-trimoxazole'],
  classIds: ['tx-pjp-smx-tmp'], cancers: [], label: B, tier: 'full',
  pin: false, pharmacyDrugId: 'tmp-smx',
  mechanism: c('Blocks two consecutive steps in the bacterial synthesis of nucleic acids and proteins.', B),
  alsoOnLabel: [
    c('Respiratory failure: cough, dyspnea and infiltrates may be hypersensitivity; severe reactions within days to a week of starting needed ventilation or ECMO, or ended in lung transplantation or death', B),
    c('HLH: life-threatening immune activation (fever, hepatosplenomegaly, rash, cytopenias, high ferritin); the label says discontinue immediately if suspected', B),
    c('Kidney injury: renal failure, interstitial nephritis, oliguria and crystalluria listed; the label says keep fluid intake and urine output adequate and stop for renal insufficiency', B),
    c('Embryofetal toxicity: some epidemiologic studies suggest pregnancy exposure may raise the risk of neural tube, cardiovascular, urinary tract and oral cleft defects and club foot', B),
    c('Folate deficiency: hematologic changes may occur in elderly patients or with pre-existing folic acid deficiency or kidney failure; they are reversible by folinic acid', B),
    c('Avoid use: impaired renal or hepatic function; possible folate deficiency (the elderly, chronic alcoholics, anticonvulsant therapy, malabsorption, malnutrition); severe allergies or bronchial asthma', B),
    c('Porphyria and hypothyroidism: sulfonamides can precipitate porphyria crisis and hypothyroidism; the label says avoid use in porphyria or thyroid dysfunction', B),
    c('Lab assays: the Jaffe creatinine method can read about 10% high in the normal range; trimethoprim can interfere with a CBPA methotrexate assay, but not a radioimmunoassay', B),
    c('C. difficile: diarrhea after antibiotics may be CDAD, reported over two months after the last dose; the label says unneeded antibiotics may need stopping', B),
    c('Overdose: nausea, vomiting, dizziness, headache, drowsiness, late dyscrasias; hemodialysis only moderately effective; leucovorin for bone marrow depression from chronic high doses', B),
    c('Contraindications: sulfonamide or trimethoprim hypersensitivity, their past immune thrombocytopenia, folate-deficiency anemia, marked liver damage, unmonitorable severe renal disease, under 2 months', B),
    c('AIDS patients: may not tolerate or respond as non-AIDS patients; with PJP treatment rash, fever, leukopenia and raised transaminases increase; the label says reevaluate benefit-risk if they occur', B),
    c('Elderly: there may be an increased risk of severe reactions; the most frequently reported are severe skin reactions, generalized bone marrow suppression, a fall in platelets and hyperkalemia', B),
    c('Also listed: QT prolongation with ventricular tachycardia and torsades, methemoglobinemia, pancreatitis, rhabdomyolysis, TTP, aseptic meningitis, convulsions, metabolic acidosis', B),
  ],
  interactions: [
    c('Adds marrow risk: zidovudine; additive myelotoxicity is possible; the label says monitor for hematologic toxicity', B),
    c('Adds potassium risk: drugs known to induce hyperkalemia, with ACE inhibitors as the label’s example; the label says close monitoring of serum potassium is warranted', B),
    c('Raises the other drug: warfarin; prothrombin time may be prolonged; the label says monitor prothrombin time and INR', B),
    c('Raises the other drug: phenytoin; its hepatic metabolism may be inhibited; the label says monitor serum phenytoin levels and watch for excessive effect', B),
    c('Raises the other drug: digoxin; levels can rise, especially in elderly patients; the label says monitor serum digoxin levels', B),
    c('Raises the other drug: procainamide and its NAPA metabolite, with further QTc prolongation; the label says closely monitor clinical and ECG signs of toxicity, or the level if available', B),
    c('Raises the other drug: oral hypoglycemics (pioglitazone, repaglinide, rosiglitazone, glipizide, glyburide, metformin); effect is potentiated; the label says monitor blood glucose more often', B),
    c('Avoid together: dofetilide; the label says concurrent use is contraindicated; trimethoprim raises dofetilide levels with serious ventricular arrhythmias including torsades de pointes', B),
    c('Avoid together: cyclosporine in renal transplant recipients: marked but reversible nephrotoxicity reported', B),
    c('Avoid together: methotrexate; sulfonamides can displace it from plasma protein and compete for its renal transport, raising free methotrexate', B),
    c('Avoid together: indomethacin; sulfamethoxazole blood levels may rise', B),
    c('Avoid together: ACE inhibitors; three cases of hyperkalemia in elderly patients reported in the literature', B),
    c('Avoid together: diuretics, primarily thiazides; thrombocytopenia with purpura was more frequent in elderly patients', B),
    c('Avoid together: pyrimethamine at higher weekly prophylaxis doses for malaria; megaloblastic anemia occasionally reported', B),
    c('Avoid together: amantadine; one case of toxic delirium reported, and cases with memantine and metformin, other OCT2 substrates', B),
    c('Avoid together: leucovorin during treatment of PJP; treatment failure and excess mortality in HIV-positive patients in a randomized trial', B),
    c('Avoid together: substrates of CYP2C8, CYP2C9 or OCT2; trimethoprim inhibits CYP2C8 and OCT2 and sulfamethoxazole inhibits CYP2C9', B),
    c('Tricyclic antidepressants: efficacy can decrease; the label says monitor therapeutic response and adjust the dose', B),
  ],
  effects: [
    {
      tox: 'drug-severe-skin', rank: 1, cite: [B], ask: [],
      quirk: c('Severe skin reactions: SJS, TEN, DRESS, AGEP and AFND reported; a rash may precede worse reactions; the label says stop at the first rash or sign of a serious reaction.', B),
    },
    {
      tox: 'drug-hepatotoxicity', rank: 2, cite: [B], ask: [],
      quirk: c('Liver injury: fulminant hepatic necrosis, hepatitis and cholestatic jaundice reported; jaundice can be an early sign; the label says stop at the first sign of a serious reaction.', B),
    },
    {
      tox: 'tx-cytopenia', rank: 3, cite: [B], ask: [],
      quirk: c('Blood dyscrasias: agranulocytosis, aplastic anemia and others, some fatal; severe thrombocytopenia may be immune-mediated; the label says stop if any formed blood element falls.', B),
    },
    {
      tox: 'tx-infusion-anaphylaxis', cite: [B], ask: [],
      quirk: c('Anaphylaxis: fatalities and serious reactions including anaphylaxis have occurred; the label says stop at the first rash or sign of a serious reaction.', B),
    },
    {
      tox: 'tx-shock', cite: [B], ask: [],
      timing: c('Minutes to hours after re-challenge, in patients with recent (days to weeks) exposure to sulfamethoxazole and trimethoprim products.', B),
      quirk: c('Circulatory shock: fever, severe hypotension and confusion on re-challenge, needing IV fluid resuscitation and vasopressors.', B),
    },
    {
      tox: 'tx-hyperkalemia', cite: [B],
      quirk: c('Hyperkalemia: PJP-dose trimethoprim raises potassium reversibly in a substantial number; recommended doses can with potassium disorders or renal insufficiency; label recommends stopping to lower it.', B),
    },
    {
      tox: 'tx-hemolysis', cite: [B], ask: [],
      quirk: c('Hemolysis: may occur in G6PD-deficient individuals and is frequently dose-related.', B),
    },
    {
      tox: 'tx-hypoglycemia', cite: [B], ask: [],
      timing: c('Non-diabetic cases: usually after a few days, on therapy; the label calls them rare.', B),
      quirk: c('Hypoglycemia: seen rarely in non-diabetic patients; kidney dysfunction, liver disease, malnutrition or high doses add risk.', B),
    },
    {
      tox: 'tx-hyponatremia', cite: [B], ask: [],
      quirk: c('Hyponatremia: severe and symptomatic cases can occur, particularly when treating PJP; the label says symptomatic patients need evaluation and correction to prevent life-threatening complications.', B),
    },
  ],
};

// ------------------------------------------------------------------ atovaquone (Mepron)
const atovaquone: OncDrug = {
  id: 'atovaquone', generic: 'Atovaquone oral suspension', brands: ['Mepron'], aliases: ['atovaquone'],
  classIds: ['tx-pjp-atovaquone'], cancers: [], label: M, tier: 'full',
  mechanism: c('A quinone antimicrobial; how it acts against P. jirovecii is not fully known.', M),
  alsoOnLabel: [
    c('Limited absorption: levels stay low without food and may limit response; the label says consider other agents with difficulty eating or GI disorders that limit absorption', M),
    c('Hypersensitivity: angioedema, bronchospasm, throat tightness and urticaria reported after approval', M),
    c('Overdose: methemoglobinemia occurred in one patient who also took dapsone; rash reported; no known antidote, and not known whether it is dialyzable', M),
    c('Reported after approval: methemoglobinemia (the label also describes the one overdose case with dapsone), thrombocytopenia, pancreatitis, acute renal impairment, vortex keratopathy', M),
    c('Breakthrough PCP: two subjects who developed PCP on atovaquone prophylaxis had cytochrome b mutations; the clinical significance is unknown', M),
    c('Low levels: in an HIV/AIDS PCP treatment trial of tablets, subjects with lower day 4 atovaquone concentrations were more likely to die', M),
    c('Limits of use: PCP treatment studied only in mild-to-moderate disease; severe PCP and efficacy after TMP-SMX failure not studied', M),
    c('Contraindications: history of hypersensitivity reactions to atovaquone or any component', M),
  ],
  interactions: [
    c('Lowers level: rifampin is known to reduce atovaquone concentrations; the label says concomitant use is not recommended', M),
    c('Lowers level: rifabutin is known to reduce atovaquone concentrations; the label says concomitant use is not recommended', M),
    c('Lowers level: tetracycline reduces atovaquone concentrations; the label says use caution and monitor for loss of efficacy', M),
    c('Lowers level: metoclopramide may reduce atovaquone bioavailability; the label says use it only if other antiemetics are not available', M),
    c('Indinavir: atovaquone lowers its trough concentration; the label says use caution and monitor for loss of indinavir efficacy', M),
  ],
  effects: [
    {
      tox: 'drug-severe-skin', rank: 1, cite: [M], ask: [],
      quirk: c('Severe skin reactions: SJS, DRESS and erythema multiforme reported, can be fatal; the label says discontinue immediately, and patients who developed them must not receive it again.', M),
    },
    {
      tox: 'drug-hepatotoxicity', rank: 2, cite: [M], ask: [],
      quirk: c('Liver injury: cholestatic hepatitis, raised liver enzymes and fatal liver failure reported; the label says to monitor closely when treating severe hepatic impairment.', M),
    },
  ],
};

// ------------------------------------------------------------------ dapsone
const dapsone: OncDrug = {
  id: 'dapsone', generic: 'Dapsone', brands: [], aliases: ['dapsone', 'DDS'],
  classIds: ['tx-pjp-dapsone'], cancers: [], label: D, tier: 'full',
  mechanism: c('Action in dermatitis herpetiformis not established; kills and inhibits M. leprae in mice (label).', D),
  alsoOnLabel: [
    c('Peripheral neuropathy: unusual in non-leprosy patients, motor loss predominates; the label says dapsone should be withdrawn if muscle weakness appears', D),
    c('Overdose: methylene blue given slowly IV is the treatment of choice for methemoglobin-induced depression, convulsions or severe cyanosis in normal and methemoglobin reductase deficient patients', D),
    c('Methylene blue: reduction depends on G6PD; the label says it should not be given to fully expressed G6PD deficient patients', D),
    c('Severe anemia: the label says to treat it before starting and monitor hemoglobin', D),
    c('Overdose onset: nausea, vomiting and hyperexcitability from minutes to 24 hours after ingestion; severe anoxia can cause retinal and optic nerve damage', D),
    c('Contraindications: hypersensitivity to dapsone and/or its derivatives', D),
    c('Indications: the label names dermatitis herpetiformis and leprosy, and does not name PJP prophylaxis', D),
    c('Other adverse reactions: pancreatitis, pulmonary eosinophilia, nephrotic syndrome, renal papillary necrosis, drug-induced lupus, mononucleosis-like syndrome, psychosis, tachycardia', D),
  ],
  interactions: [
    c('Raises level: trimethoprim; the label reports each drug raises the other about 1.5 times in patients given both in one study', D),
    c('Raises level: trimethoprim; in 78 HIV-infected patients with acute Pneumocystis pneumonia, dapsone levels rose 40% and trimethoprim levels 48%', D),
    c('Raises level: trimethoprim; a crossover study in eight asymptomatic HIV-positive volunteers found no significant interaction', D),
    c('Lowers level: rifampin lowers dapsone 7 to 10-fold by accelerating clearance; in leprosy this has not required a change in dosage', D),
    c('Folate antagonists: may increase hematologic reactions; the label says monitor more often; agranulocytosis occurred in months two and three on weekly pyrimethamine', D),
    c('Other hemolytic agents: nitrite, nitrofurantoin, primaquine and other 8-aminoantimalarials, aniline, naphthalene and sulfanilamide have hemolyzed G6PD or methemoglobin reductase deficient patients', D),
  ],
  effects: [
    {
      tox: 'tx-cytopenia', rank: 1, cite: [D], ask: [],
      quirk: c('Blood dyscrasias: deaths reported from agranulocytosis, aplastic anemia and others; the label says dapsone should be discontinued if leucocytes, platelets or hemopoiesis fall significantly.', D),
    },
    {
      tox: 'tx-hemolysis', rank: 2, cite: [D], ask: [],
      quirk: c('Hemolysis: dose-related, the most common adverse effect, with or without G6PD deficiency; larger in G6PD or methemoglobin reductase deficiency or hemoglobin M.', D),
    },
    {
      tox: 'tx-methemoglobinemia', rank: 3, cite: [D], ask: [],
      quirk: c('Methemoglobinemia: methemoglobin rises with hemolysis and may be poorly tolerated in severe cardiopulmonary disease; in overdose it can cause depression, convulsions or severe cyanosis.', D),
    },
    {
      tox: 'drug-severe-skin', rank: 4, cite: [D], ask: [],
      quirk: c('Severe skin reactions: bullous and exfoliative dermatitis, TEN and erythema multiforme named; the label says sulfone therapy must be promptly discontinued if new or toxic reactions occur.', D),
    },
    {
      tox: 'drug-hepatotoxicity', rank: 5, cite: [D], ask: [],
      quirk: c('Liver injury: toxic hepatitis and cholestatic jaundice reported early in therapy; the label says to discontinue dapsone until the source of abnormal liver tests is established.', D),
    },
  ],
};

// ------------------------------------------------------------------ pentamidine (NebuPent inhalation + Pentam 300 injection)
// Inhaled-product statements (what a prophylaxis patient is on) come first, then injection-only statements, each attributed to its product.
const pentamidine: OncDrug = {
  id: 'pentamidine', generic: 'Pentamidine isethionate', brands: ['NebuPent', 'Pentam 300'], aliases: ['pentamidine', 'pentam'],
  classIds: ['tx-pjp-pentamidine'], cancers: [], label: NB, tier: 'full',
  mechanism: c('Inhibits DNA, RNA, phospholipid and protein synthesis; the mode of action is not fully understood.', NB, PE),
  alsoOnLabel: [
    c('Inhaled breakthrough PJP: possible on NebuPent; the label says to evaluate dyspnea, fever or cough for PJP and other pathogens; may be atypical', NB),
    c('Extrapulmonary pneumocystosis: reported infrequently with NebuPent, mostly after prior PJP; the label says it should be considered with unexplained signs and symptoms', NB),
    c('Inhaled bronchospasm: cough and bronchospasm with NebuPent, especially with smoking or asthma; the label says an inhaled bronchodilator before each dose may minimize recurrence', NB),
    c('Inhaled systemic effects: accumulation unknown; the label says watch for parenteral-type reactions including hypotension, hypoglycemia, hyperglycemia, hypocalcemia, hyperkalemia, VT', NB),
    c('Inhaled, after approval: anaphylaxis, colitis, diabetes, SIADH, esophagitis, raised BUN and creatinine, dyspnea, hematochezia and melena reported with NebuPent', NB),
    c('Arrhythmia: cardiac arrhythmias have caused deaths with Pentam; torsades de pointes reported after approval with Pentam and NebuPent; Pentam tests include ECGs before, during and after', PE, NB),
    c('Injection kidney injury: increased creatinine, impaired renal function, azotemia and failure are common with parenteral pentamidine', PE),
    c('Injection extravasation: ulceration, tissue necrosis or sloughing, sometimes needing debridement and grafting; no local treatment is known, so the label says treat symptomatically', PE),
    c('Injection tests: before, during and after therapy the label lists BUN and creatinine, glucose, blood and platelet counts, liver tests, calcium and ECGs', PE),
    c('Injection trial figures: leukopenia 10.4%, thrombocytopenia 2.6%, raised liver tests 8.7%, confusion or hallucinations 1.7%, among 424 patients, regardless of relation to pentamidine', PE),
    c('Also listed: with Pentam, each under 1% with no causal link established: SJS, hyperkalemia, hypocalcemia, hepatitis, bronchospasm, seizures and confusion', PE),
    c('Contraindications: Pentam, hypersensitivity to pentamidine; NebuPent, past anaphylaxis to inhaled or parenteral pentamidine', PE, NB),
    c('Overdose: not reported with NebuPent; a 17-month-old given a large IV dose of Pentam had renal and hepatic impairment, hypotension and arrest; charcoal hemoperfusion lowered the level; later died', PE, NB),
  ],
  interactions: [
    c('Adds kidney risk: other nephrotoxic drugs such as aminoglycosides, amphotericin B, cisplatin, foscarnet or vancomycin; effects may be additive; to be closely monitored and avoided, if possible', PE, NB),
  ],
  effects: [
    {
      tox: 'tx-shock', cite: [PE], ask: [],
      quirk: c('Injection hypotension: severe hypotension has caused deaths; it can follow a single IM or IV dose, likelier with rapid IV; the label says keep the patient lying down and monitor blood pressure.', PE),
    },
    {
      tox: 'tx-hypoglycemia', cite: [PE], ask: [],
      quirk: c('Injection hypoglycemia: deaths reported; linked to pancreatic islet cell necrosis with high insulin; the label says monitor blood glucose daily during therapy and several times after.', PE),
    },
    {
      tox: 'drug-pancreatitis', cite: [PE, NB], ask: [],
      quirk: c('Pancreatitis: deaths with the injection and cases with inhaled use; the NebuPent label says to discontinue it if signs or symptoms develop.', PE, NB),
    },
  ],
};

export const DRUGS: OncDrug[] = [smxTmp, atovaquone, dapsone, pentamidine];

// Type check only: the module satisfies TxGroup.
export const _group: TxGroup = { DRUGS, CLASSES, SOURCES };
void (null as unknown as DrugEffectOverride);
