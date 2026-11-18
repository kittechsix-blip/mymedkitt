import type { Cancer, Cited, DrugClass, OncDrug, OncSource } from '../types.js';

// Antimetabolite cytotoxics: antifolates, pyrimidine and purine analogs, hypomethylating agents, hydroxyurea.
// Every statement is paraphrased from the FDA label text recorded in the cytotoxic labels research file (DailyMed SPL, read 2026-11-18)
// and carries that label as its citation. Where two labels were recorded for one drug (methotrexate, azacitidine, decitabine) there is ONE card
// and statements name the label they come from. No figure comes from a flattened table row.
const q = (v: string, ...cite: string[]): Cited => ({ v, cite });

const dm = (setid: string) => `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${setid}`;
const pi = (key: string, text: string, setid: string): OncSource => ({ key, kind: 'fda-pi', text, url: dm(setid) });

export const SOURCES: Record<string, OncSource> = {
  'pi-methotrexate': pi('pi-methotrexate', 'Methotrexate Injection (Accord Healthcare, Inc.). Prescribing information, DailyMed set ID dd035a9f-cd40-4314-b9d8-2294b8a924e2, SPL effective 2026-09-04.', 'dd035a9f-cd40-4314-b9d8-2294b8a924e2'),
  'pi-methotrexate-trexall': pi('pi-methotrexate-trexall', "TREXALL (methotrexate tablets) (Teva Women's Health LLC). Prescribing information, DailyMed set ID e942f8db-510f-44d6-acb5-b822196f5e8c, SPL effective 2026-06-17.", 'e942f8db-510f-44d6-acb5-b822196f5e8c'),
  'pi-pemetrexed': pi('pi-pemetrexed', 'ALIMTA (pemetrexed for injection) (Eli Lilly and Company). Prescribing information, DailyMed set ID f5a860f3-37ec-429c-ae04-9c88d7c55c08, SPL effective 2023-05-19.', 'f5a860f3-37ec-429c-ae04-9c88d7c55c08'),
  'pi-pralatrexate': pi('pi-pralatrexate', 'FOLOTYN (pralatrexate) (Acrotech Biopharma Inc). Prescribing information, DailyMed set ID 9f3d9c4d-9386-4451-b712-0fbdc5478d8f, SPL effective 2026-09-16.', '9f3d9c4d-9386-4451-b712-0fbdc5478d8f'),
  'pi-gemcitabine': pi('pi-gemcitabine', 'Gemcitabine Injection (Hospira, Inc.). Prescribing information, DailyMed set ID e18ed1cb-7dd0-4001-bfda-17d1f4587fb8, SPL effective 2026-04-27.', 'e18ed1cb-7dd0-4001-bfda-17d1f4587fb8'),
  'pi-cytarabine': pi('pi-cytarabine', 'Cytarabine Injection (Hospira, Inc.). Prescribing information, DailyMed set ID e3a8c0e9-19ed-49b7-8464-11e8806f47fd, SPL effective 2026-10-19.', 'e3a8c0e9-19ed-49b7-8464-11e8806f47fd'),
  'pi-fludarabine': pi('pi-fludarabine', 'Fludarabine Phosphate Injection (Sagent Pharmaceuticals). Prescribing information, DailyMed set ID 20e5acf0-90b7-45c8-be78-91eaf77c9ac0, SPL effective 2021-07-22.', '20e5acf0-90b7-45c8-be78-91eaf77c9ac0'),
  'pi-cladribine': pi('pi-cladribine', 'Cladribine Injection (Fresenius Kabi USA, LLC). Prescribing information, DailyMed set ID a2592a9b-bca6-4a5a-89c2-855a0634d5fe, SPL effective 2024-10-10.', 'a2592a9b-bca6-4a5a-89c2-855a0634d5fe'),
  'pi-clofarabine': pi('pi-clofarabine', "Clofarabine Injection (Dr.Reddy's Laboratories Inc). Prescribing information, DailyMed set ID 0da6764d-5fac-7e0f-ea3e-a5aee55a8b2d, SPL effective 2024-02-27.", '0da6764d-5fac-7e0f-ea3e-a5aee55a8b2d'),
  'pi-nelarabine': pi('pi-nelarabine', 'ARRANON (nelarabine) (Sandoz Inc). Prescribing information, DailyMed set ID 0f9051de-5c4d-4c0f-8c19-e15214498cca, SPL effective 2025-03-31.', '0f9051de-5c4d-4c0f-8c19-e15214498cca'),
  'pi-azacitidine': pi('pi-azacitidine', 'VIDAZA (azacitidine for injection) (Celgene Corporation). Prescribing information, DailyMed set ID 3495a71a-cc04-4776-851f-f185956f32af, SPL effective 2024-01-29.', '3495a71a-cc04-4776-851f-f185956f32af'),
  'pi-azacitidine-onureg': pi('pi-azacitidine-onureg', 'ONUREG (azacitidine tablets) (Celgene Corporation). Prescribing information, DailyMed set ID 0e95e33f-8aba-4f19-b332-2416580d358b, SPL effective 2026-06-12.', '0e95e33f-8aba-4f19-b332-2416580d358b'),
  'pi-decitabine': pi('pi-decitabine', 'Decitabine for Injection (Hikma Pharmaceuticals USA Inc.). Prescribing information, DailyMed set ID 8c5d6067-16a1-43ab-9e52-a33c600a5c44, SPL effective 2024-12-26.', '8c5d6067-16a1-43ab-9e52-a33c600a5c44'),
  'pi-decitabine-inqovi': pi('pi-decitabine-inqovi', 'INQOVI (decitabine and cedazuridine tablets) (Taiho Pharmaceutical Co., Ltd.). Prescribing information, DailyMed set ID 91a0f80b-f865-4d06-a40d-4d148d99ee71, SPL effective 2026-05-25.', '91a0f80b-f865-4d06-a40d-4d148d99ee71'),
  'pi-mercaptopurine': pi('pi-mercaptopurine', 'Mercaptopurine Tablets (Florida Pharmaceutical Products, LLC). Prescribing information, DailyMed set ID e7309808-5ae8-4a55-90e3-3992ace0da62, SPL effective 2026-01-30.', 'e7309808-5ae8-4a55-90e3-3992ace0da62'),
  'pi-thioguanine': pi('pi-thioguanine', 'TABLOID (thioguanine) (Waylis Therapeutics LLC). Prescribing information, DailyMed set ID 44b0c461-47fb-4106-ba11-6ed85530235c, SPL effective 2025-01-08.', '44b0c461-47fb-4106-ba11-6ed85530235c'),
  'pi-hydroxyurea': pi('pi-hydroxyurea', 'HYDREA (hydroxyurea capsules) (H2-Pharma LLC). Prescribing information, DailyMed set ID 6053c775-68de-45e4-9af9-33b18fd0e140, SPL effective 2026-01-26.', '6053c775-68de-45e4-9af9-33b18fd0e140'),
};

// Cancer names follow the label indication titles. Existing ids (nsclc, ovarian, hnscc, mesothelioma) are reused from cancers.ts and not redeclared.
export const CANCERS: Cancer[] = [
  { id: 'all', type: 'all', name: 'Acute lymphoblastic leukemia', aliases: ['ALL'] },
  { id: 'meningeal-leukemia', name: 'Meningeal leukemia' },
  { id: 'non-hodgkin-lymphoma', type: 'nhl', name: 'Non-Hodgkin lymphoma', aliases: ['NHL'] },
  { id: 'osteosarcoma', type: 'sarcoma', name: 'Osteosarcoma' },
  { id: 'breast', type: 'breast', name: 'Breast cancer' },
  { id: 'gtn', type: 'gtn', name: 'Gestational trophoblastic neoplasia', aliases: ['GTN'] },
  { id: 'ptcl', type: 'nhl', name: 'Peripheral T-cell lymphoma', aliases: ['PTCL'] },
  { id: 'pancreatic-cancer', type: 'pancreatic', name: 'Pancreatic cancer' },
  { id: 'anll', name: 'Acute non-lymphocytic leukemia' },
  { id: 'cml-blast', type: 'cml', name: 'Blast phase of chronic myelocytic leukemia' },
  { id: 'cml-resistant', type: 'cml', name: 'Resistant chronic myeloid leukemia' },
  { id: 'cll', type: 'cll', name: 'Chronic lymphocytic leukemia', aliases: ['CLL'] },
  { id: 'hairy-cell', type: 'hairy-cell', name: 'Hairy cell leukemia' },
  { id: 't-all', type: 'all', name: 'T-cell acute lymphoblastic leukemia', aliases: ['T-ALL'] },
  { id: 't-lbl', name: 'T-cell lymphoblastic lymphoma', aliases: ['T-LBL'] },
  { id: 'mds', type: 'mds', name: 'Myelodysplastic syndromes', aliases: ['MDS'] },
  { id: 'cmml', name: 'Chronic myelomonocytic leukemia', aliases: ['CMML'] },
  { id: 'jmml', name: 'Juvenile myelomonocytic leukemia', aliases: ['JMML'] },
  { id: 'aml', type: 'aml', name: 'Acute myeloid leukemia', aliases: ['AML'] },
];

export const CLASSES: DrugClass[] = [
  {
    id: 'cyto-antifolate', name: 'Antifolate',
    mechanism: q('Folate analogs that block folate-dependent enzymes needed for DNA synthesis, repair and cell replication.', 'pi-methotrexate', 'pi-pemetrexed', 'pi-pralatrexate'),
    effects: [
      { tox: 'chemo-myelosuppression', cite: ['pi-methotrexate', 'pi-methotrexate-trexall', 'pi-pemetrexed', 'pi-pralatrexate'] },
      { tox: 'chemo-severe-skin', cite: ['pi-methotrexate', 'pi-methotrexate-trexall', 'pi-pemetrexed', 'pi-pralatrexate'] },
    ],
  },
  {
    id: 'cyto-pyrimidine-analog', name: 'Pyrimidine analog',
    mechanism: q('Nucleoside analogs that kill cells undergoing DNA synthesis (S-phase).', 'pi-gemcitabine', 'pi-cytarabine'),
    effects: [
      { tox: 'chemo-myelosuppression', cite: ['pi-gemcitabine', 'pi-cytarabine'] },
    ],
  },
  {
    id: 'cyto-purine-analog', name: 'Purine analog',
    mechanism: q('Purine analogs that are activated inside cells and interfere with DNA synthesis, leading to cell death.', 'pi-fludarabine', 'pi-cladribine', 'pi-clofarabine', 'pi-nelarabine', 'pi-mercaptopurine', 'pi-thioguanine'),
    effects: [
      { tox: 'chemo-myelosuppression', cite: ['pi-fludarabine', 'pi-cladribine', 'pi-clofarabine', 'pi-nelarabine', 'pi-mercaptopurine', 'pi-thioguanine'] },
    ],
  },
  {
    id: 'cyto-hypomethylating-agent', name: 'Hypomethylating agent',
    mechanism: q('Nucleoside analogs that cause hypomethylation of DNA through DNA methyltransferase inhibition, and are cytotoxic to abnormal cells.', 'pi-azacitidine', 'pi-decitabine'),
    effects: [
      { tox: 'chemo-myelosuppression', cite: ['pi-azacitidine', 'pi-azacitidine-onureg', 'pi-decitabine', 'pi-decitabine-inqovi'] },
    ],
  },
  {
    // The hydroxyurea label describes the drug as "an antimetabolite" (section 1).
    id: 'cyto-antimetabolite-hydroxyurea', name: 'Antimetabolite (hydroxyurea)',
    mechanism: q('Thought to inhibit DNA synthesis by inhibiting ribonucleotide reductase; the label states the precise mechanism cannot yet be described.', 'pi-hydroxyurea'),
    effects: [
      { tox: 'chemo-myelosuppression', cite: ['pi-hydroxyurea'] },
      { tox: 'chemo-pulmonary-toxicity', cite: ['pi-hydroxyurea'] },
    ],
  },
];

export const DRUGS: OncDrug[] = [
  // ---------------------------------------------------------------- methotrexate (injection label + Trexall tablet label)
  {
    id: 'methotrexate', generic: 'methotrexate', editorAliases: ['MTX'], brands: ['Trexall', 'Jylamvo', 'Xatmep'], formerBrands: ['Abitrexate', 'Folex', 'Folex PFS', 'Mexate', 'Mexate-AQ', 'Mexate-AQ Preserved'], searchOnlyBrands: ['Rasuvo', 'Otrexup', 'Otrexup PFS', 'Reditrex'], brandSource: 'fda-drugsfda', classIds: ['cyto-antifolate'], label: 'pi-methotrexate', tier: 'full', unpinnedNames: ['methotrexate'],
    cancers: ['all', 'meningeal-leukemia', 'non-hodgkin-lymphoma', 'osteosarcoma', 'breast', 'hnscc', 'gtn', 'mycosis-fungoides'],
    alsoOnLabel: [
      q('Benzyl alcohol toxicity: severe CNS toxicity or metabolic acidosis; use preservative-free product for neonates, low-birth-weight infants and intrathecal use (injection label, boxed)', 'pi-methotrexate'),
      q('Intrathecal use: acute chemical arachnoiditis (headache, back pain, nuchal rigidity, fever) and subacute myelopathy; avoid benzyl alcohol-containing product intrathecally (injection label)', 'pi-methotrexate'),
      q('Thromboembolism: postmarketing arterial, cerebral, deep vein and retinal vein thrombosis and pulmonary embolus; sudden death also reported (injection label)', 'pi-methotrexate'),
      q('Pericarditis: pericarditis and pericardial effusion reported postmarketing (injection label)', 'pi-methotrexate'),
      q('Live vaccines: disseminated infections reported; not recommended during treatment (both labels)', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      q('Intrathecal overdose: headache, nausea and vomiting, seizure and acute toxic encephalopathy; cerebellar herniation reported (injection label)', 'pi-methotrexate'),
      q('Dialysis in overdose: neither hemodialysis nor peritoneal dialysis has been shown to improve elimination, though acute intermittent high-flux hemodialysis has cleared methotrexate (both labels)', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      q('Overdose supportive care: hydration and urinary alkalinization may be needed to prevent precipitation in the renal tubules (injection label); the tablet label says give them with overdose treatment', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      q('Third-space fluid: pleural effusions and ascites (the tablet label names them) prolong elimination and raise toxicity; the injection label says to evacuate significant collections before dosing', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      q('Aspirin and other NSAIDs: unexpectedly severe and fatal GI toxicity with methotrexate, primarily at high dose (injection label)', 'pi-methotrexate'),
      q('Raise methotrexate exposure: penicillin or sulfonamide antibiotics, proton pump inhibitors and probenecid (injection label)', 'pi-methotrexate'),
      q('Protein-bound drugs: raise methotrexate exposure, such as oral anticoagulants, phenytoin, salicylates, sulfonamides, sulfonylureas and tetracyclines (injection label)', 'pi-methotrexate'),
      q('Nitrous oxide anesthesia: avoid; it potentiates methotrexate\'s effect on folate pathways and raises the risk of severe reactions (both labels)', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      q('Theophylline: methotrexate raises theophylline plasma concentrations (injection label)', 'pi-methotrexate'),
      q('Folic acid or its derivatives: may decrease methotrexate effectiveness in neoplastic disease (both labels)', 'pi-methotrexate', 'pi-methotrexate-trexall'),
    ],
    boxedWarning: [
      q('Medication error: tablets taken daily when a weekly regimen was prescribed have resulted in death (tablet label)', 'pi-methotrexate-trexall'),
      q('Serious adverse reactions: including death; monitor bone marrow, GI tract, liver, lungs, skin and kidneys (both labels); the injection label also names infections and the nervous system', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      q('Hypersensitivity reactions: including anaphylaxis; contraindicated after a prior severe reaction (both labels)', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      q('Benzyl alcohol toxicity: formulations can cause severe CNS toxicity or metabolic acidosis; preservative-free product only for neonates, low-birth-weight infants and intrathecal use; do not use benzyl alcohol-containing product for high-dose regimens unless immediate treatment is required and preservative-free product is unavailable (injection label)', 'pi-methotrexate'),
      q('Embryo-fetal toxicity: including fetal death; contraindicated in pregnancy for non-neoplastic diseases (both labels)', 'pi-methotrexate', 'pi-methotrexate-trexall'),
    ],
    effects: [
      { tox: 'chemo-myelosuppression', rank: 2, boxed: true, cite: ['pi-methotrexate', 'pi-methotrexate-trexall'] },
      {
        tox: 'chemo-severe-skin', rank: 6, boxed: true, cite: ['pi-methotrexate', 'pi-methotrexate-trexall'],
        quirk: q('Both labels: severe, including fatal, reactions such as toxic epidermal necrolysis, Stevens-Johnson syndrome, exfoliative dermatitis, skin necrosis and erythema multiforme.', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      },
      {
        tox: 'serious-infection', rank: 8, boxed: true, cite: ['pi-methotrexate'],
        quirk: q('Injection label (boxed): monitor for infections; life-threatening or fatal bacterial, fungal or viral infections, including Pneumocystis pneumonia, hepatitis B reactivation, tuberculosis, zoster and cytomegalovirus.', 'pi-methotrexate'),
      },
      {
        tox: 'methotrexate-toxicity', rank: 1, cite: ['pi-methotrexate', 'pi-methotrexate-trexall'],
        quirk: q('Leucovorin or levoleucovorin as soon as possible after overdosage, guided by serum methotrexate levels (both labels). Glucarpidase for plasma methotrexate above 1 micromole per liter with delayed clearance from renal impairment (both labels); no leucovorin within 2 hours before or after glucarpidase (injection label).', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      },
      {
        tox: 'chemo-nephrotoxicity', rank: 7, boxed: true, cite: ['pi-methotrexate', 'pi-methotrexate-trexall'],
        quirk: q('Both labels: renal toxicity including irreversible acute renal failure; impaired renal function with delayed clearance is the setting named for glucarpidase', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      },
      {
        tox: 'chemo-hypersensitivity', rank: 10, boxed: true, cite: ['pi-methotrexate', 'pi-methotrexate-trexall'],
        quirk: q('Both labels: anaphylaxis or other serious hypersensitivity can occur; stop immediately if it does. Contraindicated with a history of severe hypersensitivity to methotrexate.', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      },
      {
        tox: 'chemo-hepatotoxicity', rank: 4, boxed: true,
        timing: q('Psoriasis: generally after 1.5 g cumulative, hepatotoxicity risk rises with total cumulative dose', 'pi-methotrexate', 'pi-methotrexate-trexall'),
        quirk: q('Both labels: severe, potentially irreversible hepatotoxicity including fibrosis, cirrhosis and fatal liver failure; in psoriasis, fibrosis or cirrhosis may occur without symptoms or abnormal liver tests.', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      },
      {
        tox: 'chemo-pulmonary-toxicity', rank: 5, boxed: true, cite: ['pi-methotrexate', 'pi-methotrexate-trexall'],
        quirk: q('Both labels: acute or chronic interstitial pneumonitis, including irreversible and fatal cases. Injection label: can occur at all dose levels.', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      },
      {
        tox: 'chemo-cns-toxicity', rank: 9, boxed: true, cite: ['pi-methotrexate', 'pi-methotrexate-trexall'],
        quirk: q('Both labels: severe acute and chronic neurotoxicity, progressive, irreversible and fatal; leukoencephalopathy risk is higher after prior cranial radiation. Injection label: seizures in pediatric patients; stroke-like syndrome with high-dose methotrexate (confusion, hemiparesis, transient blindness, seizures, coma).', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      },
      {
        tox: 'chemo-diarrhea-enterocolitis', rank: 3, boxed: true, cite: ['pi-methotrexate', 'pi-methotrexate-trexall'],
        quirk: q('Diarrhea, vomiting, stomatitis, hemorrhagic enteritis and fatal intestinal perforation (both labels); peptic ulcer disease or ulcerative colitis raises the risk (injection label).', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      },
      {
        tox: 'chemo-tumor-lysis', cite: ['pi-methotrexate', 'pi-methotrexate-trexall'],
        quirk: q('Both labels: can induce tumor lysis syndrome in patients with rapidly growing tumors.', 'pi-methotrexate', 'pi-methotrexate-trexall'),
      },
    ],
  },
  // ---------------------------------------------------------------- pemetrexed
  {
    id: 'pemetrexed', generic: 'pemetrexed disodium', aliases: ['pemetrexed'], brands: ['Alimta', 'Axtle', 'Pemfexy'], brandSource: 'fda-drugsfda', classIds: ['cyto-antifolate'], label: 'pi-pemetrexed', tier: 'full',
    cancers: ['nsclc', 'mesothelioma'],
    alsoOnLabel: [
      q('Radiation recall: can occur weeks to years after prior radiation, with inflammation or blistering in the old radiation field', 'pi-pemetrexed'),
      q('Postmarketing reactions: immune-mediated hemolytic anemia, colitis and pancreatitis have been reported', 'pi-pemetrexed'),
      q('Overdose: no drugs are approved for treatment; it is not known whether pemetrexed is dialyzable', 'pi-pemetrexed'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression', cite: ['pi-pemetrexed'],
        quirk: q('Severe myelosuppression, with transfusion need and neutropenic infection; the risk is higher without folic acid and vitamin B12 supplementation. Overdose: no drugs are approved for treatment; based on animal studies, leucovorin may mitigate the toxicities.', 'pi-pemetrexed'),
      },
      {
        tox: 'chemo-nephrotoxicity', cite: ['pi-pemetrexed'],
        quirk: q('Severe, sometimes fatal renal toxicity: renal failure 2.1% to 2.2% with cisplatin, 0.4% to 0.6% as a single agent. With creatinine clearance 45-79 mL/min avoid ibuprofen for 2 days before, the day of and 2 days after pemetrexed (it raises exposure).', 'pi-pemetrexed'),
      },
      {
        tox: 'chemo-pulmonary-toxicity', cite: ['pi-pemetrexed'],
        quirk: q('Serious interstitial pneumonitis, including fatal cases; withhold for acute onset of new or progressive unexplained dyspnea, cough or fever pending evaluation.', 'pi-pemetrexed'),
      },
      {
        tox: 'chemo-severe-skin', cite: ['pi-pemetrexed'],
        quirk: q('Serious and sometimes fatal bullous, blistering and exfoliative skin toxicity, including cases suggestive of Stevens-Johnson syndrome or toxic epidermal necrolysis.', 'pi-pemetrexed'),
      },
    ],
  },
  // ---------------------------------------------------------------- pralatrexate
  {
    id: 'pralatrexate', generic: 'pralatrexate', brands: ['Folotyn'], brandSource: 'fda-drugsfda', classIds: ['cyto-antifolate'], label: 'pi-pralatrexate', tier: 'full',
    cancers: ['ptcl'],
    alsoOnLabel: [
      q('End-stage renal disease on dialysis: serious reactions including mucositis and toxic epidermal necrolysis occurred; the label says avoid in end-stage renal disease', 'pi-pralatrexate'),
      q('Mucositis: can occur; vitamin B12 and folic acid reduce the risk', 'pi-pralatrexate'),
      q('Overdose: no specific treatment information; supportive measures, and the label says consider prompt leucovorin', 'pi-pralatrexate'),
      q('Probenecid and NSAIDs: avoid; probenecid raised pralatrexate plasma concentrations and may increase adverse reactions', 'pi-pralatrexate'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression', cite: ['pi-pralatrexate'],
        quirk: q('Thrombocytopenia, neutropenia and anemia; vitamin B12 and folic acid are used to reduce the risk.', 'pi-pralatrexate'),
      },
      {
        tox: 'chemo-severe-skin', cite: ['pi-pralatrexate'],
        quirk: q('Severe dermatologic reactions that may result in death: 2.1% of 663 patients, including skin exfoliation, ulceration and toxic epidermal necrolysis.', 'pi-pralatrexate'),
      },
      {
        tox: 'chemo-tumor-lysis', cite: ['pi-pralatrexate'],
        quirk: q('Monitor patients at increased risk and treat promptly.', 'pi-pralatrexate'),
      },
      { tox: 'chemo-hepatotoxicity', cite: ['pi-pralatrexate'] },
    ],
  },
  // ---------------------------------------------------------------- gemcitabine
  {
    id: 'gemcitabine', generic: 'gemcitabine', brands: ['Avgemsi'], formerBrands: ['Gemzar', 'Infugem'], brandSource: 'fda-drugsfda', classIds: ['cyto-pyrimidine-analog'], label: 'pi-gemcitabine', tier: 'full',
    cancers: ['ovarian', 'breast', 'nsclc', 'pancreatic-cancer'],
    alsoOnLabel: [
      q('Cardiac events: postmarketing reports of congestive heart failure, myocardial infarction and arrhythmias, including supraventricular arrhythmias', 'pi-gemcitabine'),
      q('Vasculitis and gangrene: peripheral vasculitis and gangrene reported postmarketing', 'pi-gemcitabine'),
      q('Hepatic veno-occlusive disease: reported postmarketing, with hepatic failure', 'pi-gemcitabine'),
      q('Overdose: no known antidote; a single dose as high as 5700 mg/m2 caused myelosuppression, paresthesias and severe rash', 'pi-gemcitabine'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression', cite: ['pi-gemcitabine'],
        quirk: q('Single agent: grade 3-4 neutropenia, anemia and thrombocytopenia in 25%, 8% and 5% of 979 patients; risk rises with other cytotoxic drugs. Infusion longer than 60 minutes or dosing more often than weekly increased hypotension, flu-like symptoms, myelosuppression and asthenia.', 'pi-gemcitabine'),
      },
      {
        tox: 'chemo-tma', cite: ['pi-gemcitabine'],
        quirk: q('Hemolytic uremic syndrome, including fatalities from renal failure or the need for dialysis: 0.25% of 2429 patients.', 'pi-gemcitabine'),
      },
      {
        tox: 'chemo-capillary-leak', cite: ['pi-gemcitabine'],
        quirk: q('Capillary leak syndrome with severe consequences, as a single agent or in combination; the label says permanently discontinue if it develops.', 'pi-gemcitabine'),
      },
      {
        tox: 'chemo-pulmonary-toxicity',
        timing: q('Onset up to 2 weeks after the last dose, pulmonary symptoms', 'pi-gemcitabine'),
        quirk: q('Interstitial pneumonitis, pulmonary fibrosis, pulmonary edema and ARDS; some cases lead to fatal respiratory failure despite stopping therapy.', 'pi-gemcitabine'),
      },
      {
        tox: 'chemo-cns-toxicity', cite: ['pi-gemcitabine'],
        quirk: q('Posterior reversible encephalopathy syndrome can present with headache, seizure, lethargy, hypertension, confusion, blindness and other visual and neurologic disturbances.', 'pi-gemcitabine'),
      },
      {
        tox: 'chemo-severe-skin', cite: ['pi-gemcitabine'],
        quirk: q('Severe cutaneous adverse reactions including SJS, TEN, DRESS and AGEP, which can be life-threatening or fatal.', 'pi-gemcitabine'),
      },
      { tox: 'chemo-hepatotoxicity', cite: ['pi-gemcitabine'], quirk: q('Drug-induced liver injury including liver failure and death, alone or with other potentially hepatotoxic drugs.', 'pi-gemcitabine') },
      { tox: 'chemo-hypersensitivity', cite: ['pi-gemcitabine'], quirk: q('Contraindicated in known hypersensitivity; reactions include anaphylaxis.', 'pi-gemcitabine') },
    ],
  },
  // ---------------------------------------------------------------- cytarabine
  {
    id: 'cytarabine', generic: 'cytarabine', editorAliases: ['ara-C', 'AraC'], brands: [], formerBrands: ['Cytosar-U', 'Depocyt'], brandSource: 'fda-drugsfda', classIds: ['cyto-pyrimidine-analog'], label: 'pi-cytarabine', tier: 'full',
    cancers: ['anll', 'all', 'cml-blast', 'meningeal-leukemia'],
    alsoOnLabel: [
      q('Ara-C syndrome: fever, myalgia, bone pain, rash, conjunctivitis and malaise, sometimes chest pain, 6-12 hours after a dose; the label says corticosteroids help treat or prevent it', 'pi-cytarabine'),
      q('Ocular toxicity: reversible corneal toxicity and hemorrhagic conjunctivitis after experimental high-dose schedules; prophylaxis with a local corticosteroid eye drop may prevent or diminish it', 'pi-cytarabine'),
      q('Severe desquamating rash: severe skin rash leading to desquamation, reported rarely after experimental high-dose therapy', 'pi-cytarabine'),
      q('Infections: viral, bacterial, fungal, parasitic or saprophytic infections in any location can be severe and at times fatal', 'pi-cytarabine'),
      q('Necrotizing leukoencephalopathy: 5 children also given intrathecal methotrexate, hydrocortisone and CNS radiation', 'pi-cytarabine'),
      q('Blindness: 2 patients given systemic chemotherapy, prophylactic CNS radiation and intrathecal cytarabine', 'pi-cytarabine'),
      q('Digoxin: reversible falls in steady-state digoxin levels with some combination chemotherapy regimens (beta-acetyldigoxin); the label says plasma digoxin monitoring may be indicated', 'pi-cytarabine'),
      q('Gentamicin: in vitro antagonism against K. pneumoniae; a lack of prompt response may need re-evaluation of antibacterial therapy', 'pi-cytarabine'),
      q('Flucytosine: possible inhibition of its efficacy in one patient', 'pi-cytarabine'),
    ],
    boxedWarning: [
      q('Bone marrow suppression: the main toxic effect; leukopenia, thrombocytopenia and anemia', 'pi-cytarabine'),
      q('Less serious toxicity: nausea, vomiting, diarrhea, abdominal pain, oral ulceration and hepatic dysfunction', 'pi-cytarabine'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression', rank: 1, boxed: true,
        timing: q('White cell nadirs days 7-9 and 15-24, platelets lowest days 12-15 (biphasic fall)', 'pi-cytarabine'),
        quirk: q('Complications of marrow suppression, possibly fatal: infection from granulocytopenia and hemorrhage from thrombocytopenia. Nadirs described after 5-day constant infusions or acute injections of 50 mg/m2 to 600 mg/m2 (adverse reactions section); counts then rise above baseline over the following 10 days.', 'pi-cytarabine'),
      },
      {
        tox: 'chemo-cns-toxicity', cite: ['pi-cytarabine'],
        quirk: q('After experimental high-dose schedules: severe, at times fatal cerebral and cerebellar dysfunction (personality change, somnolence, coma), usually reversible. Overdose: no antidote; 4.5 g/m2 over 1 hour every 12 hours for 12 doses increased irreversible CNS toxicity and death. Delayed ascending paralysis, fatal in 1 of 2 children, at conventional doses.', 'pi-cytarabine'),
      },
      {
        tox: 'chemo-pulmonary-toxicity', cite: ['pi-cytarabine'],
        quirk: q('After experimental high-dose therapy: pulmonary edema; a syndrome of sudden respiratory distress progressing rapidly to pulmonary edema with marked cardiomegaly in 16 of 72 patients at one institution, which can be fatal.', 'pi-cytarabine'),
      },
      {
        tox: 'chemo-cardiotoxicity', cite: ['pi-cytarabine'],
        quirk: q('Cardiomyopathy with subsequent death after experimental high-dose cytarabine with cyclophosphamide for bone marrow transplant preparation.', 'pi-cytarabine'),
      },
      {
        tox: 'chemo-diarrhea-enterocolitis', rank: 3, boxed: true, cite: ['pi-cytarabine'],
        quirk: q('After experimental high-dose schedules: severe gastrointestinal ulceration including pneumatosis cystoides intestinalis leading to peritonitis, bowel necrosis and necrotizing colitis.', 'pi-cytarabine'),
      },
      {
        tox: 'chemo-hepatotoxicity', rank: 2, boxed: true, cite: ['pi-cytarabine'],
        quirk: q('After experimental high-dose schedules: liver damage with increased hyperbilirubinemia, and liver abscess with sepsis.', 'pi-cytarabine'),
      },
      {
        tox: 'chemo-hypersensitivity', cite: ['pi-cytarabine'],
        quirk: q('One case of anaphylaxis with acute cardiopulmonary arrest requiring resuscitation, immediately after intravenous administration.', 'pi-cytarabine'),
      },
    ],
  },
  // ---------------------------------------------------------------- fludarabine
  {
    id: 'fludarabine', generic: 'fludarabine phosphate', aliases: ['fludarabine'], brands: [], formerBrands: ['Fludara', 'Oforta'], brandSource: 'fda-drugsfda', classIds: ['cyto-purine-analog'], label: 'pi-fludarabine', tier: 'full',
    cancers: ['cll'],
    alsoOnLabel: [
      q('Autoimmune hemolysis: life-threatening, sometimes fatal hemolytic anemia, ITP, Evans syndrome, acquired hemophilia; monitor closely for hemolysis (boxed)', 'pi-fludarabine'),
      q('Transfusion: graft-versus-host disease has been seen after non-irradiated blood, with fatal outcome reported; patients on or after fludarabine who need blood should receive irradiated blood only', 'pi-fludarabine'),
      q('Pulmonary toxicity: postmarketing ARDS, pulmonary hemorrhage, fibrosis and respiratory failure; some improved on corticosteroids once infection was excluded', 'pi-fludarabine'),
      q('Cerebral hemorrhage: additional reports, frequency not known', 'pi-fludarabine'),
      q('Heart failure and arrhythmia: reported; edema is frequent, and one patient developed a pericardial effusion possibly related to treatment', 'pi-fludarabine'),
      q('Hemorrhagic cystitis: reported in fludarabine-treated patients', 'pi-fludarabine'),
      q('Renal impairment: give cautiously; creatinine clearance 30 to 79 mL/min needs dose reduction and close monitoring, and the label says do not give with creatinine clearance below 30 mL/min', 'pi-fludarabine'),
      q('Live vaccines: avoid during and after treatment', 'pi-fludarabine'),
    ],
    boxedWarning: [
      q('Severe CNS toxicity: blindness, coma and death at high doses (36% at about four times the recommended dose); coma, seizures, agitation and confusion also reported at doses near the recommended dose', 'pi-fludarabine'),
      q('Autoimmune hemolysis: hemolytic anemia, ITP, Evans syndrome and acquired hemophilia, life-threatening and sometimes fatal', 'pi-fludarabine'),
      q('Bone marrow suppression: severe', 'pi-fludarabine'),
      q('Pulmonary toxicity: fatal with pentostatin; the combination is not recommended', 'pi-fludarabine'),
    ],
    effects: [
      {
        tox: 'chemo-cns-toxicity', rank: 1, boxed: true,
        timing: q('High-dose: onset 21-60 days after last dose, a delayed syndrome at about four times the recommended dose', 'pi-fludarabine'),
        quirk: q('Post-marketing neurotoxicity has been reported earlier or later than in clinical trials (range 7 to 225 days). Dose-dependent: delayed blindness, coma and death in 13 of 36 patients (36%) at about four times the recommended dose; irreversible CNS toxicity with high doses. No known specific antidote.', 'pi-fludarabine'),
      },
      {
        tox: 'chemo-myelosuppression', rank: 2, boxed: true,
        timing: q('Median granulocyte nadir day 13 (range 3-25), platelet nadir day 16 (range 2-32 days) in a phase I solid-tumor study', 'pi-fludarabine'),
        quirk: q('Severe anemia, thrombocytopenia and neutropenia; cumulative myelosuppression may occur; significant cytopenia has lasted from about 2 months to about 1 year.', 'pi-fludarabine'),
      },
      {
        tox: 'chemo-pulmonary-toxicity', rank: 3, boxed: true, cite: ['pi-fludarabine'],
        quirk: q('Unacceptably high incidence of fatal pulmonary toxicity in combination with pentostatin in refractory CLL; combination not recommended.', 'pi-fludarabine'),
      },
      {
        tox: 'chemo-tumor-lysis', cite: ['pi-fludarabine'],
        quirk: q('Reported in CLL patients with large tumor burdens; a response can occur as early as the first week of treatment.', 'pi-fludarabine'),
      },
    ],
  },
  // ---------------------------------------------------------------- cladribine
  {
    id: 'cladribine', generic: 'cladribine', aliases: ["2-chloro-2'-deoxy-beta-D-adenosine"], brands: [], formerBrands: ['Leustatin'], brandSource: 'fda-drugsfda', classIds: ['cyto-purine-analog'], label: 'pi-cladribine', tier: 'full',
    cancers: ['hairy-cell'],
    alsoOnLabel: [
      q('Infections: serious infections (for example septicemia and pneumonia) in 6% of patients in month 1, including fatal infections such as sepsis', 'pi-cladribine'),
      q('Tumor lysis syndrome: rare cases in patients with other hematologic malignancies and high tumor burden', 'pi-cladribine'),
      q('Live attenuated vaccines: not recommended, because of infection risk with immunosuppression', 'pi-cladribine'),
      q('Overdose: irreversible neurologic toxicity, acute nephrotoxicity and severe marrow suppression; no known specific antidote, and it is not known whether dialysis or hemofiltration removes the drug', 'pi-cladribine'),
      q('Immunosuppressive or nephrotoxic drugs: use caution with other immunosuppressive, myelosuppressive or nephrotoxic drugs given before, after or with cladribine', 'pi-cladribine'),
    ],
    boxedWarning: [
      q('Neurotoxicity: serious, including irreversible paraparesis and quadraparesis, with continuous infusion at high doses (four to nine times the recommended dose); rarely severe at standard dosing', 'pi-cladribine'),
      q('Nephrotoxicity: acute, at high doses (four to nine times the recommended dose), especially with other nephrotoxic agents', 'pi-cladribine'),
      q('Bone marrow suppression: should be anticipated; usually reversible and dose dependent', 'pi-cladribine'),
    ],
    effects: [
      {
        tox: 'chemo-cns-toxicity', rank: 1, boxed: true, cite: ['pi-cladribine'],
        quirk: q('Dose relationship: irreversible paraparesis and quadraparesis after high-dose continuous infusion; delayed-onset neurotoxicity in a phase I transplant-conditioning study at four to nine times the recommended dose. No known specific antidote for overdose.', 'pi-cladribine'),
      },
      {
        tox: 'chemo-neuropathy-ileus', cite: ['pi-cladribine'],
        quirk: q('Axonal peripheral polyneuropathy in a dose-escalation study at the highest dose levels (about four times the recommended dose).', 'pi-cladribine'),
      },
      {
        tox: 'chemo-nephrotoxicity', rank: 2, boxed: true,
        timing: q('Onset 7 to 13 days after starting high doses, 6 of 31 patients in a phase I study', 'pi-cladribine'),
        quirk: q('Acidosis, anuria and elevated creatinine; 5 of the 6 needed dialysis, and several were also on other nephrotoxic medications.', 'pi-cladribine'),
      },
      {
        tox: 'chemo-myelosuppression', rank: 3, boxed: true,
        timing: q('Platelets normal by day 12 (mean), ANC by week 5 and hemoglobin by week 8, effects most notable in the first month', 'pi-cladribine'),
        quirk: q('Neutropenia, anemia and thrombocytopenia, especially at high doses; month 1 transfusions: red cells 44%, platelets 14%. Fever in about two-thirds (131 of 196) in month 1; 47% of all patients had fever with neutropenia (ANC 1,000 or less), 32% with ANC 500 or less.', 'pi-cladribine'),
      },
    ],
  },
  // ---------------------------------------------------------------- clofarabine
  {
    id: 'clofarabine', generic: 'clofarabine', brands: [], formerBrands: ['Clolar'], brandSource: 'fda-drugsfda', classIds: ['cyto-purine-analog'], label: 'pi-clofarabine', tier: 'full',
    cancers: ['all'],
    alsoOnLabel: [
      q('Hemorrhage: serious and fatal, including cerebral, gastrointestinal and pulmonary; most cases were associated with thrombocytopenia', 'pi-clofarabine'),
      q('Infections: severe and fatal sepsis and opportunistic infections; 83% of patients had at least one infection after treatment', 'pi-clofarabine'),
      q('Hyponatremia: reported postmarketing', 'pi-clofarabine'),
      q('Overdose: no known overdoses; 70 mg/m2/day for 5 days in 2 pediatric patients caused Grade 4 hyperbilirubinemia, vomiting and rash', 'pi-clofarabine'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression', cite: ['pi-clofarabine'],
        quirk: q('May be severe and prolonged; febrile neutropenia in 55% and non-febrile neutropenia in a further 10% of pediatric patients.', 'pi-clofarabine'),
      },
      {
        tox: 'chemo-capillary-leak', cite: ['pi-clofarabine'],
        quirk: q('Cytokine release syndrome (tachypnea, tachycardia, hypotension, pulmonary edema) that may progress to SIRS with capillary leak and organ impairment, which may be fatal; SIRS 2% and capillary leak 4% in trials.', 'pi-clofarabine'),
      },
      {
        tox: 'chemo-tumor-lysis', cite: ['pi-clofarabine'],
        quirk: q('From breakdown products of peripheral leukemia cell death.', 'pi-clofarabine'),
      },
      {
        tox: 'chemo-hepatotoxicity',
        timing: q('AST/ALT elevations typically within 10 days, back to Grade 2 or less within 15 days', 'pi-clofarabine'),
        quirk: q('Severe and fatal hepatotoxicity including hepatitis and hepatic failure; veno-occlusive disease is more likely after prior stem cell transplant with a clofarabine, etoposide and cyclophosphamide combination.', 'pi-clofarabine'),
      },
      {
        tox: 'chemo-nephrotoxicity', cite: ['pi-clofarabine'],
        quirk: q('Acute renal failure: Grade 3 or 4 elevated creatinine in 8%; hematuria in 13%.', 'pi-clofarabine'),
      },
      {
        tox: 'chemo-diarrhea-enterocolitis',
        timing: q('More frequent within 30 days of treatment, fatal and serious enterocolitis', 'pi-clofarabine'),
        quirk: q('Includes neutropenic colitis, cecitis and C. difficile colitis; more often with combination chemotherapy.', 'pi-clofarabine'),
      },
      {
        tox: 'chemo-severe-skin', cite: ['pi-clofarabine'],
        quirk: q('Serious and fatal SJS and TEN reported.', 'pi-clofarabine'),
      },
    ],
  },
  // ---------------------------------------------------------------- nelarabine
  {
    id: 'nelarabine', generic: 'nelarabine', brands: ['Arranon'], brandSource: 'fda-drugsfda', classIds: ['cyto-purine-analog'], label: 'pi-nelarabine', tier: 'full',
    cancers: ['t-all', 't-lbl'],
    alsoOnLabel: [
      q('Incomplete recovery: full recovery from the boxed neurologic reactions has not always occurred after stopping nelarabine', 'pi-nelarabine'),
      q('Somnolence: may last several days after treatment; the label says avoid driving and hazardous activities until it resolves', 'pi-nelarabine'),
      q('Rhabdomyolysis: postmarketing reports, with raised blood creatine phosphokinase', 'pi-nelarabine'),
      q('Fatal opportunistic infections: postmarketing reports', 'pi-nelarabine'),
      q('Live vaccines: avoid in immunocompromised patients', 'pi-nelarabine'),
      q('Overdose: no known antidote; severe neurotoxicity (possibly paralysis, coma), myelosuppression and death are anticipated', 'pi-nelarabine'),
      q('Pentostatin and ADA inhibitors: combination of nelarabine with adenosine deaminase inhibitors such as pentostatin is not recommended', 'pi-nelarabine'),
    ],
    boxedWarning: [
      q('Severe neurologic reactions: altered mental state including severe somnolence, and convulsions', 'pi-nelarabine'),
      q('Peripheral neuropathy: from numbness and paresthesias to motor weakness and paralysis; demyelination and ascending neuropathy resembling Guillain-Barre syndrome', 'pi-nelarabine'),
      q('Incomplete recovery: full recovery has not always occurred after stopping the drug', 'pi-nelarabine'),
    ],
    effects: [
      {
        tox: 'chemo-cns-toxicity', rank: 1, boxed: true,
        timing: q('Median onset day 5 in adults (range 1-166 days), day 8 in pediatric patients (range 1-269 days), counted from the first infusion', 'pi-nelarabine'),
        quirk: q('Monitor during and for at least 24 hours after treatment; the label says discontinue for Grade 2 or greater. Nervous system reactions: 76% of adults (Grade 3+ 19%), 42% of pediatric patients (15%). Severe forms: coma, status epilepticus, demyelination. Higher risk after intrathecal chemotherapy or craniospinal irradiation.', 'pi-nelarabine'),
      },
      {
        tox: 'chemo-neuropathy-ileus', rank: 2, boxed: true, cite: ['pi-nelarabine'],
        quirk: q('Neuropathy (sensory and motor) and ascending neuropathy similar to Guillain-Barre syndrome; at 2200 mg/m2 on Days 1, 3 and 5, 2 patients developed Grade 3 ascending sensory neuropathy with MRI findings of cervical spine demyelination.', 'pi-nelarabine'),
      },
      {
        tox: 'chemo-tumor-lysis', cite: ['pi-nelarabine'],
        quirk: q('The label names intravenous hydration and consideration of allopurinol in patients at risk of hyperuricemia.', 'pi-nelarabine'),
      },
    ],
  },
  // ---------------------------------------------------------------- azacitidine (Vidaza injection label + Onureg tablet label)
  {
    id: 'azacitidine', generic: 'azacitidine', brands: ['Vidaza', 'Onureg'], brandSource: 'fda-drugsfda', classIds: ['cyto-hypomethylating-agent'], label: 'pi-azacitidine', tier: 'full',
    cancers: ['mds', 'cmml', 'jmml', 'aml'],
    alsoOnLabel: [
      q('Do not substitute: Vidaza and Onureg have different recommended doses and schedules; using one at the other\'s dose may result in a fatal adverse reaction (both labels)', 'pi-azacitidine', 'pi-azacitidine-onureg'),
      q('Necrotizing fasciitis: postmarketing reports, including fatal cases (both labels)', 'pi-azacitidine', 'pi-azacitidine-onureg'),
      q('Sweet\'s syndrome: acute febrile neutrophilic dermatosis reported postmarketing (both labels)', 'pi-azacitidine', 'pi-azacitidine-onureg'),
      q('Differentiation syndrome: reported postmarketing with intravenous or subcutaneous azacitidine (both labels)', 'pi-azacitidine', 'pi-azacitidine-onureg'),
      q('Interstitial lung disease: reported postmarketing (both labels)', 'pi-azacitidine', 'pi-azacitidine-onureg'),
      q('Pericarditis and pericardial effusion: reported postmarketing (Vidaza label)', 'pi-azacitidine'),
      q('Hypersensitivity reaction: reported postmarketing with intravenous or subcutaneous azacitidine (Onureg label)', 'pi-azacitidine-onureg'),
      q('Onureg: label warns of increased early mortality in patients with MDS (trial of 216 patients with transfusion-dependent anemia and thrombocytopenia)', 'pi-azacitidine-onureg'),
      q('Overdose (Vidaza): one case of about 290 mg/m2 gave diarrhea, nausea and vomiting; no known specific antidote', 'pi-azacitidine'),
      q('Contraindications: hypersensitivity to azacitidine or mannitol (Vidaza); severe hypersensitivity to azacitidine or its components (Onureg)', 'pi-azacitidine', 'pi-azacitidine-onureg'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression', cite: ['pi-azacitidine', 'pi-azacitidine-onureg'],
        quirk: q('Vidaza: anemia, neutropenia and thrombocytopenia in adults with MDS and children with JMML. Onureg: new or worsening Grade 3 or 4 neutropenia in 49% and thrombocytopenia in 22%; febrile neutropenia 12%; sepsis 6%, including 1 fatal case.', 'pi-azacitidine', 'pi-azacitidine-onureg'),
      },
      {
        tox: 'chemo-tumor-lysis', cite: ['pi-azacitidine'],
        quirk: q('Vidaza: fatal or serious tumor lysis syndrome, including in MDS; may occur despite concomitant allopurinol.', 'pi-azacitidine'),
      },
      {
        tox: 'chemo-hepatotoxicity', cite: ['pi-azacitidine'],
        quirk: q('Vidaza: potentially hepatotoxic in severe pre-existing hepatic impairment; progressive hepatic coma and death reported in patients with extensive tumor burden from metastatic disease, especially baseline albumin below 30 g/L. Contraindicated in advanced malignant hepatic tumors.', 'pi-azacitidine'),
      },
      {
        tox: 'chemo-nephrotoxicity', cite: ['pi-azacitidine'],
        quirk: q('Vidaza: renal toxicity from elevated creatinine to renal failure and death with intravenous azacitidine plus other chemotherapy for non-MDS conditions; renal tubular acidosis (serum bicarbonate below 20 mEq/L with alkaline urine and potassium below 3 mEq/L) in 5 patients with CML given azacitidine and etoposide.', 'pi-azacitidine'),
      },
    ],
  },
  // ---------------------------------------------------------------- decitabine (decitabine injection label + Inqovi tablet label)
  {
    id: 'decitabine', generic: 'decitabine', brands: ['Inqovi'], formerBrands: ['Dacogen'], brandSource: 'fda-drugsfda', classIds: ['cyto-hypomethylating-agent'], label: 'pi-decitabine', tier: 'full',
    cancers: ['mds', 'cmml', 'aml'],
    alsoOnLabel: [
      q('Infections (Inqovi label): fatal and serious infectious complications; with monotherapy pneumonia 21% and sepsis 14%, fatal pneumonia, sepsis and septic shock 1% each', 'pi-decitabine-inqovi'),
      q('Differentiation syndrome: reported postmarketing (both labels; the Inqovi label attributes the reports to intravenous decitabine)', 'pi-decitabine', 'pi-decitabine-inqovi'),
      q('Sweet\'s syndrome: acute febrile neutrophilic dermatosis reported postmarketing (injection label)', 'pi-decitabine'),
      q('Interstitial lung disease: reported postmarketing (both labels)', 'pi-decitabine', 'pi-decitabine-inqovi'),
      q('Cardiomyopathy: reported postmarketing with intravenous decitabine (Inqovi label)', 'pi-decitabine-inqovi'),
      q('Overdose (injection label): no known antidote; higher doses increase myelosuppression, including prolonged neutropenia and thrombocytopenia', 'pi-decitabine'),
      q('Cytidine deaminase substrates: avoid coadministration with Inqovi; cedazuridine inhibits the enzyme and may increase exposure and toxicity of drugs it metabolizes (Inqovi label)', 'pi-decitabine-inqovi'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression', cite: ['pi-decitabine', 'pi-decitabine-inqovi'],
        quirk: q('Fatal and serious myelosuppression. Decitabine injection: neutropenia 90% (Grade 3-4 87%), thrombocytopenia 89% (85%), anemia 82%, Grade 3-4 febrile neutropenia 23%. Inqovi (MDS or CMML): thrombocytopenia 82% (76%), neutropenia 73% (71%), anemia 71% (55%), febrile neutropenia 33%.', 'pi-decitabine', 'pi-decitabine-inqovi'),
      },
    ],
  },
  // ---------------------------------------------------------------- mercaptopurine
  {
    id: 'mercaptopurine', generic: 'mercaptopurine', editorAliases: ['6-MP'], brands: ['Purinethol', 'Purixan'], brandSource: 'fda-drugsfda', classIds: ['cyto-purine-analog'], label: 'pi-mercaptopurine', tier: 'full',
    cancers: ['all'],
    alsoOnLabel: [
      q('Macrophage activation syndrome: (hemophagocytic lymphohistiocytosis) life-threatening, described in autoimmune conditions, especially inflammatory bowel disease (an unapproved use)', 'pi-mercaptopurine'),
      q('Live virus vaccines: infection risk; response to all vaccines may be diminished', 'pi-mercaptopurine'),
      q('Overdose: immediate anorexia, nausea, vomiting and diarrhea, or delayed myelosuppression, liver dysfunction and gastroenteritis; dialysis cannot be expected to clear the drug', 'pi-mercaptopurine'),
      q('Allopurinol: inhibits first-pass metabolism of mercaptopurine and raises the risk of myelosuppression, nausea and vomiting', 'pi-mercaptopurine'),
      q('Trimethoprim-sulfamethoxazole: enhanced myelosuppression noted in some patients', 'pi-mercaptopurine'),
      q('Aminosalicylates (mesalamine, olsalazine, sulfasalazine): may inhibit TPMT and raise the risk of myelosuppression', 'pi-mercaptopurine'),
      q('Warfarin: anticoagulant effectiveness may decrease; monitor INR', 'pi-mercaptopurine'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression', cite: ['pi-mercaptopurine'],
        quirk: q('The most consistent dose-related reaction: anemia, leukopenia, thrombocytopenia or any combination.', 'pi-mercaptopurine'),
      },
      {
        tox: 'chemo-hepatotoxicity',
        timing: q('Jaundice usually at 1 to 2 months, reported from 1 week to 8 years after starting', 'pi-mercaptopurine'),
        quirk: q('Hepatotoxic; deaths attributed to hepatic necrosis have been reported.', 'pi-mercaptopurine'),
      },
    ],
  },
  // ---------------------------------------------------------------- thioguanine
  {
    id: 'thioguanine', generic: 'thioguanine', editorAliases: ['6-TG'], brands: ['Tabloid'], brandSource: 'fda-drugsfda', classIds: ['cyto-purine-analog'], label: 'pi-thioguanine', tier: 'full',
    cancers: ['anll'],
    alsoOnLabel: [
      q('Intestinal necrosis and perforation: reported in patients given multiple-drug chemotherapy including thioguanine', 'pi-thioguanine'),
      q('Overdose: nausea, vomiting, malaise, hypotension and diaphoresis, or delayed myelosuppression and azotemia; no known antagonist; hemodialysis of marginal use', 'pi-thioguanine'),
      q('Severe hematologic toxicity: may need platelet transfusion for bleeding, and granulocyte transfusion and antibiotics if sepsis is documented', 'pi-thioguanine'),
      q('Aminosalicylate derivatives (olsalazine, mesalazine, sulphasalazine): inhibit TPMT in vitro; give with caution to patients on thioguanine', 'pi-thioguanine'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression', cite: ['pi-thioguanine'],
        quirk: q('The most consistent dose-related toxicity; may have a delayed effect. Inherited TPMT deficiency can cause unusually sensitive, rapid, life-threatening marrow suppression.', 'pi-thioguanine'),
      },
      {
        tox: 'chemo-hepatotoxicity', cite: ['pi-thioguanine'],
        quirk: q('Hepatic veno-occlusive disease (hyperbilirubinemia, tender hepatomegaly, fluid retention, ascites) or portal hypertension (splenomegaly, thrombocytopenia, varices); common in children on maintenance, especially males. Early sign: thrombocytopenia out of proportion to neutropenia. Not for long-term continuous use.', 'pi-thioguanine'),
      },
    ],
  },
  // ---------------------------------------------------------------- hydroxyurea
  {
    id: 'hydroxyurea', generic: 'hydroxyurea', brands: ['Hydrea'], brandSource: 'fda-drugsfda', classIds: ['cyto-antimetabolite-hydroxyurea'], label: 'pi-hydroxyurea', tier: 'full', unpinnedNames: ['hydroxyurea'],
    cancers: ['cml-resistant', 'hnscc'],
    alsoOnLabel: [
      q('Glucose monitors: certain continuous glucose monitors may read falsely high, risking hypoglycemia if relied on to dose insulin; consult the CGM prescriber about alternatives', 'pi-hydroxyurea'),
      q('Laboratory interference: uric acid, urea and lactic acid assays may read falsely high', 'pi-hydroxyurea'),
      q('Fatal hepatic failure: reported with antiretrovirals in HIV patients, most often hydroxyurea plus didanosine and stavudine; the label says avoid this combination', 'pi-hydroxyurea'),
      q('Peripheral neuropathy: severe in some cases, with antiretrovirals including didanosine, with or without stavudine', 'pi-hydroxyurea'),
      q('Drug-induced fever: above 39 C (102 F) requiring hospitalization, postmarketing; usually within 6 weeks, resolved on stopping, recurred within 24 hours on re-administration', 'pi-hydroxyurea'),
      q('Hemolytic anemia: reported in myeloproliferative disease; with acute jaundice or hematuria and persistent or worsening anemia, test for hemolysis', 'pi-hydroxyurea'),
      q('Tumor lysis syndrome: reported postmarketing', 'pi-hydroxyurea'),
      q('Live vaccines: avoid; may potentiate virus replication and cause severe infection', 'pi-hydroxyurea'),
      q('Overdose: acute mucocutaneous toxicity at several times the therapeutic dose, with soreness, violet erythema, palm and sole edema then scaling, hyperpigmentation and stomatitis', 'pi-hydroxyurea'),
      q('Didanosine with or without stavudine: fatal and nonfatal pancreatitis in HIV patients; the label says permanently discontinue hydroxyurea if pancreatitis signs develop', 'pi-hydroxyurea'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression', cite: ['pi-hydroxyurea'],
        quirk: q('Severe myelosuppression; do not start if bone marrow function is markedly depressed.', 'pi-hydroxyurea'),
      },
      {
        tox: 'chemo-pulmonary-toxicity', cite: ['pi-hydroxyurea'],
        quirk: q('Interstitial lung disease including pulmonary fibrosis, lung infiltration, pneumonitis and alveolitis, including fatal cases, reported in myeloproliferative neoplasm patients; for fever, cough or dyspnea investigate and treat promptly; the label says discontinue and manage with corticosteroids.', 'pi-hydroxyurea'),
      },
      {
        tox: 'chemo-severe-skin', cite: ['pi-hydroxyurea'],
        quirk: q('Cutaneous vasculitic toxicities including vasculitic ulcerations and gangrene in myeloproliferative disease; most often in patients with a history of, or currently receiving, interferon.', 'pi-hydroxyurea'),
      },
    ],
  },
];
