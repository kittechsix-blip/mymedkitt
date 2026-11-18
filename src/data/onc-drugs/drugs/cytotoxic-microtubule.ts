import type { Cancer, Cited, DrugClass, OncDrug, OncSource } from '../types.js';

// Microtubule-targeting cytotoxic drugs: taxanes, vinca alkaloids, eribulin, ixabepilone.
// Every statement is paraphrased from the FDA label named in its cite key (DailyMed SPL text read 2026-11-18). Nothing is added from outside the labels.
const c = (v: string, ...cite: string[]): Cited => ({ v, cite });

const PTX = 'pi-paclitaxel';
const NAB = 'pi-paclitaxel-protein-bound';
const DOC = 'pi-docetaxel';
const CAB = 'pi-cabazitaxel';
const VCR = 'pi-vincristine';
const VBL = 'pi-vinblastine';
const VNR = 'pi-vinorelbine';
const ERI = 'pi-eribulin';
const IXA = 'pi-ixabepilone';

export const SOURCES: Record<string, OncSource> = {
  [PTX]: { key: PTX, kind: 'fda-pi', text: 'Paclitaxel Injection, USP (Hospira, Inc.), intravenous. Prescribing information, DailyMed set ID ea28753a-8631-460a-bfdc-b101eb8ac84a, SPL effective 2026-07-02.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=ea28753a-8631-460a-bfdc-b101eb8ac84a' },
  [NAB]: { key: NAB, kind: 'fda-pi', text: 'ABRAXANE (paclitaxel protein-bound particles for injectable suspension, albumin-bound) (Abraxis BioScience, LLC), intravenous. Prescribing information, DailyMed set ID 24d10449-2936-4cd3-b7db-a7683db721e4, SPL effective 2022-10-31.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=24d10449-2936-4cd3-b7db-a7683db721e4' },
  [DOC]: { key: DOC, kind: 'fda-pi', text: 'Docetaxel Injection (Hospira, Inc.), intravenous. Prescribing information, DailyMed set ID 6b9999bb-869e-4d25-838c-23c3ab280044, SPL effective 2025-01-31.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=6b9999bb-869e-4d25-838c-23c3ab280044' },
  [CAB]: { key: CAB, kind: 'fda-pi', text: 'JEVTANA (cabazitaxel) injection (Sanofi-Aventis U.S. LLC), intravenous. Prescribing information, DailyMed set ID de3d9c26-572b-4ea4-9b2d-dd58a2b3e8fa, SPL effective 2025-10-07.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=de3d9c26-572b-4ea4-9b2d-dd58a2b3e8fa' },
  [VCR]: { key: VCR, kind: 'fda-pi', text: 'Vincristine Sulfate Injection, USP (Hospira, Inc.), intravenous. Prescribing information, DailyMed set ID b22e4c8e-dbe1-4d4b-a026-e1812974071c, SPL effective 2026-02-17.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=b22e4c8e-dbe1-4d4b-a026-e1812974071c' },
  [VBL]: { key: VBL, kind: 'fda-pi', text: 'Vinblastine Sulfate Injection (Fresenius Kabi USA, LLC), intravenous. Prescribing information, DailyMed set ID f073b58e-56d6-4c8d-a2ce-b37719402d77, SPL effective 2025-04-15.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f073b58e-56d6-4c8d-a2ce-b37719402d77' },
  [VNR]: { key: VNR, kind: 'fda-pi', text: 'Vinorelbine Injection, USP (Sagent Pharmaceuticals), intravenous. Prescribing information, DailyMed set ID 10a70995-e04d-4044-b1dc-c9aa27460397, SPL effective 2024-08-16.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=10a70995-e04d-4044-b1dc-c9aa27460397' },
  [ERI]: { key: ERI, kind: 'fda-pi', text: 'HALAVEN (eribulin mesylate) injection (Eisai Inc.), intravenous. Prescribing information, DailyMed set ID 31ce4750-ded5-4a0b-95e9-f229fa6bc822, SPL effective 2025-11-07.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=31ce4750-ded5-4a0b-95e9-f229fa6bc822' },
  [IXA]: { key: IXA, kind: 'fda-pi', text: 'IXEMPRA (ixabepilone) kit (R-Pharm US Operating, LLC), intravenous. Prescribing information, DailyMed set ID 241f0b1e-8b95-470d-876f-bf1804daaf18, SPL effective 2025-12-04.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=241f0b1e-8b95-470d-876f-bf1804daaf18' },
};

export const CANCERS: Cancer[] = [
  { id: 'breast', type: 'breast', name: 'Breast cancer' },
  { id: 'kaposi-aids', type: 'kaposi', name: 'AIDS-related Kaposi sarcoma' },
  { id: 'kaposi', type: 'kaposi', name: 'Kaposi sarcoma' },
  { id: 'pancreatic-adenocarcinoma', type: 'pancreatic', name: 'Metastatic adenocarcinoma of the pancreas' },
  { id: 'prostate-mcrpc', type: 'prostate', name: 'Metastatic castration-resistant prostate cancer' },
  { id: 'liposarcoma-unresectable-metastatic', type: 'sarcoma', name: 'Unresectable or metastatic liposarcoma' },
  { id: 'acute-leukemia', name: 'Acute leukemia' },
  { id: 'hodgkin-lymphoma', type: 'hodgkin', name: 'Hodgkin lymphoma' },
  { id: 'non-hodgkin-lymphoma', type: 'nhl', name: 'Non-Hodgkin lymphoma' },
  { id: 'rhabdomyosarcoma', type: 'sarcoma', name: 'Rhabdomyosarcoma' },
  { id: 'neuroblastoma', type: 'neuroblastoma', name: 'Neuroblastoma' },
  { id: 'wilms-tumor', type: 'wilms', name: 'Wilms tumor' },
  { id: 'lymphocytic-lymphoma', name: 'Lymphocytic lymphoma' },
  { id: 'histiocytic-lymphoma', name: 'Histiocytic lymphoma' },
  { id: 'mycosis-fungoides', type: 'ctcl', name: 'Mycosis fungoides (advanced disease)' },
  { id: 'testis-carcinoma', type: 'testicular-germ-cell', name: 'Advanced carcinoma of the testis' },
  { id: 'letterer-siwe', type: 'histiocytic', name: 'Letterer-Siwe disease (histiocytosis X)' },
  { id: 'choriocarcinoma', name: 'Choriocarcinoma resistant to other chemotherapy' },
];

export const CLASSES: DrugClass[] = [
  {
    id: 'cyto-taxane',
    name: 'Taxane',
    mechanism: c('Stabilizes microtubules by promoting their assembly from tubulin and preventing disassembly, which blocks cell division.', PTX, DOC, CAB, NAB),
    effects: [
      { tox: 'chemo-myelosuppression', cite: [PTX, NAB, DOC, CAB] },
      { tox: 'chemo-hypersensitivity', cite: [PTX, NAB, DOC, CAB] },
    ],
  },
  {
    id: 'cyto-vinca-alkaloid',
    name: 'Vinca alkaloid',
    mechanism: c('Inhibits microtubule formation in the mitotic spindle, arresting dividing cells at metaphase.', VCR, VBL, VNR),
    effects: [
      { tox: 'chemo-extravasation', cite: [VCR, VBL, VNR] },
      { tox: 'chemo-neuropathy-ileus', cite: [VCR, VBL, VNR] },
      { tox: 'chemo-pulmonary-toxicity', cite: [VCR, VBL, VNR] },
    ],
  },
  {
    id: 'cyto-microtubule-dynamics-inhibitor',
    name: 'Microtubule dynamics inhibitor (synthetic analogue of halichondrin B)',
    mechanism: c('Inhibits the growth phase of microtubules and sequesters tubulin into nonproductive aggregates, blocking mitosis and leading to cell death.', ERI),
    effects: [],
  },
  {
    id: 'cyto-epothilone',
    name: 'Microtubule inhibitor (epothilone class)',
    mechanism: c('Binds beta-tubulin on microtubules and suppresses microtubule dynamics, blocking cells in mitosis and leading to cell death.', IXA),
    effects: [],
  },
];

export const DRUGS: OncDrug[] = [
  {
    id: 'paclitaxel', generic: 'paclitaxel', brands: [], formerBrands: ['Taxol'], brandSource: 'fda-drugsfda', classIds: ['cyto-taxane'], label: PTX, tier: 'full',
    cancers: ['ovarian', 'breast', 'nsclc', 'kaposi-aids'],
    boxedWarning: [
      c('Anaphylaxis and hypersensitivity: severe reactions in 2%-4% of patients, fatal reactions despite premedication; pretreat with corticosteroids, diphenhydramine and H2 antagonists; do not rechallenge after a severe reaction', PTX),
      c('Myelosuppression: primarily neutropenia, may be severe and lead to infection; do not give if baseline neutrophils are under 1,500 cells/mm3 (solid tumors) or under 1,000 cells/mm3 (AIDS-related Kaposi sarcoma)', PTX),
    ],
    effects: [
      { tox: 'chemo-hypersensitivity', boxed: true, rank: 1, cite: [PTX], quirk: c('Label: dyspnea with hypotension needing treatment, angioedema and generalized urticaria in 2%-4% of patients; contraindicated with a history of hypersensitivity to paclitaxel or to drugs formulated in polyoxyl 35 castor oil. Premedication named in the label: corticosteroid (such as dexamethasone), diphenhydramine and an H2 antagonist.', PTX) },
      { tox: 'chemo-myelosuppression', boxed: true, rank: 2, timing: c('Neutrophil nadir at median day 11, dose-dependent and dose-limiting', PTX), quirk: c('Label: do not retreat until neutrophils recover above 1,500 cells/mm3 (above 1,000 cells/mm3 in Kaposi sarcoma) and platelets above 100,000 cells/mm3.', PTX) },
      { tox: 'qt-prolongation', cite: [PTX], quirk: c('Label: severe conduction abnormalities in under 1% of patients, some needing pacemaker placement; give appropriate therapy and use continuous cardiac monitoring during later infusions.', PTX) },
      { tox: 'chemo-diarrhea-enterocolitis', cite: [PTX], quirk: c('Label (adverse reactions): neutropenic enterocolitis (typhlitis) observed with paclitaxel alone and in combination, despite G-CSF; intestinal obstruction, intestinal perforation, ischemic colitis and dehydration also reported.', PTX) },
      { tox: 'chemo-cardiotoxicity', cite: [PTX], quirk: c('Label: significant cardiovascular events in about 1% of patients (syncope, rhythm abnormalities including ventricular tachycardia and complete AV block needing a pacemaker, hypertension, venous thrombosis); 12-13% in non-small cell lung cancer patients given paclitaxel with cisplatin. Myocardial infarction and heart failure also reported.', PTX) },
      { tox: 'chemo-severe-skin', cite: [PTX], quirk: c('Label: Stevens-Johnson syndrome and toxic epidermal necrolysis have been reported.', PTX) },
      { tox: 'chemo-extravasation', cite: [PTX], quirk: c('Label: injection site reactions including extravasation were usually mild (erythema, tenderness, discoloration, swelling); phlebitis, cellulitis, induration, skin exfoliation, necrosis and fibrosis have been reported, and skin reactions can recur at an earlier extravasation site. The label states no specific treatment is known.', PTX) },
    ],
    alsoOnLabel: [
      c('Thromboembolism: pulmonary embolism and venous thrombosis reported', PTX),
      c('Hepatic failure: hepatic necrosis and hepatic encephalopathy leading to death reported', PTX),
      c('Seizures: grand mal seizures, syncope, ataxia and neuroencephalopathy reported (under 1%)', PTX),
      c('Lung injury: interstitial pneumonia and lung fibrosis reported', PTX),
      c('Pancreatitis: reported', PTX),
      c('Overdose: no known antidote; expected complications are bone marrow suppression, peripheral neurotoxicity and mucositis', PTX),
      c('Overdose in children: may cause acute ethanol toxicity', PTX),
      c('CYP2C8/CYP3A4 interactions: caution with known substrates, inhibitors (for example ketoconazole, clarithromycin, itraconazole, gemfibrozil) or inducers (for example rifampin) of these enzymes', PTX),
      c('Cisplatin sequence: myelosuppression was more profound when paclitaxel was given after cisplatin than before it (paclitaxel clearance fell about 33%)', PTX),
      c('Alcohol content: the product contains dehydrated alcohol (396 mg/mL), so CNS and other alcohol effects should be considered', PTX),
    ],
  },
  {
    id: 'paclitaxel-protein-bound', generic: 'paclitaxel protein-bound particles (albumin-bound)', editorAliases: ['nab-paclitaxel'], brands: ['Abraxane'], brandSource: 'fda-drugsfda', classIds: ['cyto-taxane'], label: NAB, tier: 'full',
    cancers: ['breast', 'nsclc', 'pancreatic-adenocarcinoma'],
    boxedWarning: [
      c('Severe myelosuppression: neutropenia may be severe and result in infection or sepsis; do not give if baseline neutrophils are under 1,500 cells/mm3; frequent blood counts', NAB),
    ],
    effects: [
      { tox: 'chemo-myelosuppression', boxed: true, rank: 1, cite: [NAB], quirk: c('Label: grade 3-4 neutropenia in 34% of metastatic breast cancer, 47% of non-small cell lung cancer and 38% of pancreatic cancer patients.', NAB) },
      { tox: 'chemo-neuropathy-ileus', cite: [NAB], quirk: c('Label: sensory neuropathy is dose- and schedule-dependent; withhold for grade 3 or worse.', NAB) },
      { tox: 'chemo-pulmonary-toxicity', cite: [NAB], quirk: c('Label: pneumonitis, some fatal, in 4% of patients given with gemcitabine. Postmarketing: interstitial pneumonia and pulmonary embolism also reported.', NAB) },
      { tox: 'chemo-cardiotoxicity', basis: 'postmarketing', cite: [NAB], quirk: c('Label (postmarketing): congestive heart failure, left ventricular dysfunction and atrioventricular block, mostly in patients previously exposed to cardiotoxic drugs such as anthracyclines or with underlying cardiac history.', NAB) },
      { tox: 'chemo-hypersensitivity', cite: [NAB], quirk: c('Label: severe, sometimes fatal reactions including anaphylaxis; do not rechallenge. Cross-hypersensitivity with other taxanes: monitor closely at the start if a prior taxane reaction. Consider premedication after a prior ABRAXANE reaction; limiting the infusion to 30 minutes may reduce infusion reactions.', NAB) },
    ],
    alsoOnLabel: [
      c('Do not substitute: ABRAXANE must not be substituted for or with other paclitaxel formulations, which have different dosing and administration', NAB),
      c('Fever: if a patient becomes febrile regardless of ANC, start broad-spectrum antibiotics', NAB),
      c('Sepsis: 5% with gemcitabine, with or without neutropenia; biliary obstruction or a biliary stent raised the risk of severe or fatal sepsis', NAB),
      c('Paralytic ileus: postmarketing autonomic neuropathy resulting in paralytic ileus; cranial nerve palsies and vocal cord paresis also reported', NAB),
      c('Vision loss: reduced visual acuity from cystoid macular edema reported', NAB),
      c('Hepatic impairment: paclitaxel exposure and toxicity can be higher; monitor closely for severe myelosuppression', NAB),
      c('Overdose: no known antidote; expected complications are bone marrow suppression, sensory neurotoxicity and mucositis', NAB),
      c('CYP2C8/CYP3A4 interactions: caution with medicines that inhibit or induce either enzyme', NAB),
    ],
  },
  {
    id: 'docetaxel', generic: 'docetaxel', brands: ['Beizray', 'Docivyx', 'Taxotere'], formerBrands: ['Docefrez'], brandSource: 'fda-drugsfda', classIds: ['cyto-taxane'], label: DOC, tier: 'full',
    cancers: ['breast', 'nsclc', 'prostate-mcrpc', 'gastric', 'hnscc'],
    boxedWarning: [
      c('Toxic deaths: treatment-related mortality rises with abnormal liver function, higher doses, and prior platinum-treated non-small cell lung cancer given single-agent 100 mg/m2', DOC),
      c('Hypersensitivity: severe reactions despite dexamethasone premedication; stop the infusion immediately and treat; contraindicated with prior severe reaction to docetaxel or polysorbate 80 drugs', DOC),
      c('Neutropenia: may be severe and lead to infection; do not give if neutrophils are under 1500 cells/mm3; frequent blood counts', DOC),
      c('Fluid retention: severe in 6.5% (6/92) despite dexamethasone; poorly tolerated edema, pleural effusion needing urgent drainage, dyspnea at rest, cardiac tamponade, or pronounced ascites', DOC),
      c('Hepatic impairment: avoid if bilirubin is above ULN, or AST/ALT above 1.5 x ULN with alkaline phosphatase above 2.5 x ULN (higher risk of severe neutropenia, infection, severe thrombocytopenia, severe stomatitis, severe skin toxicity, toxic death); check liver tests before each cycle', DOC),
    ],
    effects: [
      { tox: 'chemo-myelosuppression', boxed: true, rank: 2, cite: [DOC], quirk: c('Label: neutropenia under 2000/mm3 in virtually all patients; grade 4 in 85% at 100 mg/m2; febrile neutropenia about 12% at 100 mg/m2. Prophylactic G-CSF may be used (gastric regimen: febrile neutropenia or infection 12% with G-CSF vs 28% without).', DOC) },
      { tox: 'chemo-hypersensitivity', boxed: true, rank: 1, cite: [DOC], quirk: c('Label: watch closely during the first and second infusions; reactions may begin within minutes. Severe reactions (rash/erythema, hypotension, bronchospasm, fatal anaphylaxis) occurred despite 3 days of corticosteroid. Prior paclitaxel hypersensitivity may bring severe or fatal reactions: monitor closely at initiation.', DOC) },
      { tox: 'chemo-diarrhea-enterocolitis', cite: [DOC], quirk: c('Label: enterocolitis and neutropenic colitis (typhlitis) occurred despite G-CSF; may develop at any time and could lead to death as early as the first day of symptoms. Postmarketing: ischemic colitis, GI hemorrhage, GI perforation, intestinal obstruction and ileus also reported.', DOC) },
      { tox: 'chemo-neuropathy-ileus', cite: [DOC], quirk: c('Label: severe neurosensory symptoms in 5.5% (53/965) and severe peripheral motor neuropathy in 4.4% (42/965) of metastatic breast cancer patients; neurotoxicity reversed spontaneously at a median of 9 weeks where follow-up was available.', DOC) },
      { tox: 'drug-fluid-retention', boxed: true, rank: 3, cite: [DOC], quirk: c('Label: premedicate with oral corticosteroid to reduce incidence and severity; severe fluid retention (poorly tolerated edema, pleural effusion needing urgent drainage, dyspnea at rest, cardiac tamponade, pronounced ascites) in 6.5% of 92 breast cancer patients despite premedication; moderate in 27.2%; median cumulative dose to onset 819 mg/m2.', DOC) },
      { tox: 'chemo-severe-skin', cite: [DOC], quirk: c('Label: Stevens-Johnson syndrome, toxic epidermal necrolysis and acute generalized exanthematous pustulosis have been reported; the label says to consider permanent discontinuation.', DOC) },
      { tox: 'chemo-tumor-lysis', cite: [DOC], quirk: c('Label: monitor patients at risk (renal impairment, hyperuricemia, bulky tumor).', DOC) },
    ],
    alsoOnLabel: [
      c('Ventricular arrhythmia: postmarketing; ventricular tachycardia may be fatal with regimens including doxorubicin, 5-fluorouracil and/or cyclophosphamide', DOC),
      c('Thromboembolism and ischemia: postmarketing atrial fibrillation, deep vein thrombosis, pulmonary embolism, myocardial infarction and syncope', DOC),
      c('Lung injury: postmarketing acute pulmonary edema, ARDS, interstitial lung disease and pulmonary fibrosis, which may be fatal', DOC),
      c('Coagulopathy: postmarketing disseminated intravascular coagulation, often with sepsis or multiorgan failure; bleeding episodes', DOC),
      c('Seizures: postmarketing confusion, seizures or transient loss of consciousness, sometimes during the infusion', DOC),
      c('Hepatitis: postmarketing, sometimes fatal, mainly in patients with pre-existing liver disorders', DOC),
      c('Renal failure: postmarketing renal insufficiency, mostly with concomitant nephrotoxic drugs', DOC),
      c('Skin: localized erythema of the extremities with edema, followed by desquamation', DOC),
      c('Eyes: cystoid macular edema reported; patients with impaired vision need prompt ophthalmologic examination', DOC),
      c('Alcohol content: intoxication has been reported; a 100 mg/m2 dose of this product delivers 2.0 g/m2 of ethanol and may affect the CNS; other docetaxel products may contain a different amount', DOC),
      c('Overdose: no known antidote; keep in a specialized unit; give therapeutic G-CSF as soon as possible; expected complications are bone marrow suppression, peripheral neurotoxicity and mucositis', DOC),
      c('CYP3A4 inhibitors: ketoconazole raised docetaxel exposure 2.2-fold and ritonavir may raise it; avoid drugs that inhibit CYP3A4', DOC),
    ],
  },
  {
    id: 'cabazitaxel', generic: 'cabazitaxel', brands: ['Jevtana', 'Jevtana Kit'], brandSource: 'fda-drugsfda', classIds: ['cyto-taxane'], label: CAB, tier: 'full',
    cancers: ['prostate-mcrpc'],
    boxedWarning: [
      c('Neutropenia: neutropenic deaths reported; contraindicated if neutrophils are 1,500/mm3 or lower; frequent blood counts; G-CSF primary prophylaxis is recommended in high-risk patients and should be considered in all patients receiving 25 mg/m2', CAB),
      c('Severe hypersensitivity: generalized rash/erythema, hypotension, bronchospasm; stop the infusion immediately and treat; premedication required; contraindicated with prior severe reaction to cabazitaxel or polysorbate 80 drugs', CAB),
    ],
    effects: [
      { tox: 'chemo-myelosuppression', boxed: true, rank: 1, cite: [CAB], quirk: c('Label: patients aged 65 or older had more neutropenia and febrile neutropenia (grade 3-4 neutropenia 87% vs 74%; febrile 8% vs 6%). G-CSF primary prophylaxis is recommended in high-risk patients.', CAB) },
      { tox: 'chemo-hypersensitivity', boxed: true, rank: 2, cite: [CAB], quirk: c('Label: reactions may occur within a few minutes of starting the infusion; have equipment and treatment for hypotension and bronchospasm available. Premedication named: antihistamine, corticosteroid and H2 antagonist.', CAB) },
      { tox: 'chemo-diarrhea-enterocolitis', cite: [CAB], quirk: c('Label: GI hemorrhage, perforation, ileus, enterocolitis and neutropenic enterocolitis, some fatal; intestinal obstruction postmarketing. Evaluate promptly abdominal pain or tenderness, fever, persistent constipation or diarrhea (with or without neutropenia). Diarrhea deaths with electrolyte imbalance; diarrhea 41% after prior radiation vs 27%.', CAB) },
      { tox: 'chemo-nephrotoxicity', cite: [CAB], quirk: c('Label: renal failure in 4% (four fatal cases), most with sepsis, dehydration or obstructive uropathy.', CAB) },
      { tox: 'chemo-pulmonary-toxicity', cite: [CAB], quirk: c('Label: interstitial pneumonia/pneumonitis, interstitial lung disease and ARDS, which may be fatal; higher risk with underlying lung disease.', CAB) },
    ],
    alsoOnLabel: [
      c('GI toxicity risk factors: neutropenia, age, steroid use, NSAIDs, antiplatelet therapy, anticoagulants, prior pelvic radiotherapy, adhesions, ulceration and GI bleeding', CAB),
      c('Urinary injury: cystitis, radiation cystitis or hematuria needing hospitalization after prior pelvic radiation; radiation recall hemorrhagic cystitis postmarketing', CAB),
      c('Older patients: patients 65 or over had more deaths from causes other than progression within 30 days of the last dose (6% vs 2% in TROPIC)', CAB),
      c('Overdose: has resulted from improper preparation and led to fatal outcome; no known antidote; give therapeutic G-CSF as soon as possible', CAB),
      c('Strong CYP3A inhibitors: avoid coadministration (for example ketoconazole, itraconazole, clarithromycin, ritonavir, voriconazole), which may raise cabazitaxel levels', CAB),
      c('Severe hepatic impairment: contraindicated (total bilirubin above 3 x ULN)', CAB),
    ],
  },
  {
    id: 'vincristine', generic: 'vincristine sulfate', brands: [], formerBrands: ['Marqibo Kit', 'Oncovin', 'Vincasar PFS', 'Vincrex'], brandSource: 'fda-drugsfda', aliases: ['leurocristine', 'LCR', 'VCR'], classIds: ['cyto-vinca-alkaloid'], label: VCR, tier: 'full',
    cancers: ['acute-leukemia', 'hodgkin-lymphoma', 'non-hodgkin-lymphoma', 'rhabdomyosarcoma', 'neuroblastoma', 'wilms-tumor'],
    boxedWarning: [
      c('Wrong route: for intravenous use only, fatal if given by other routes; intrathecal administration usually results in death', VCR),
      c('Extravasation: causes considerable irritation; stop the injection immediately and give the remaining dose in another vein; hyaluronidase injection and moderate heat to the area are thought to minimize discomfort and cellulitis', VCR),
    ],
    effects: [
      { tox: 'vinca-wrong-route', boxed: true, rank: 1, cite: [VCR], quirk: c('Label: fatal if given other than intravenously; intrathecal injection usually results in death; ascending paralysis followed even immediate spinal fluid removal and flushing. The label describes spinal fluid removal and irrigation.', VCR) },
      { tox: 'chemo-extravasation', boxed: true, rank: 2, cite: [VCR], quirk: c('Label agent: local hyaluronidase injection plus application of moderate heat to the area of leakage, to disperse the drug. The label gives no compress temperature, only "moderate heat".', VCR) },
      { tox: 'chemo-neuropathy-ileus', cite: [VCR], quirk: c('Label: sensory loss and paresthesia first, then neuritic pain, then motor loss (foot drop, ataxia, paralysis); cranial nerve palsy including life-threatening bilateral vocal cord paralysis. Paralytic ileus can mimic a surgical abdomen, especially in young children; constipation may show colicky pain with an empty rectum.', VCR) },
      { tox: 'chemo-hyponatremia-siadh', cite: [VCR], quirk: c('Label: rare syndrome of inappropriate antidiuretic hormone secretion, with high urinary sodium and hyponatremia; improves with fluid deprivation.', VCR) },
      { tox: 'chemo-cns-toxicity', cite: [VCR], quirk: c('Label: convulsions, often with hypertension, in a few patients; convulsions followed by coma in several children.', VCR) },
      { tox: 'chemo-pulmonary-toxicity', cite: [VCR], quirk: c('Label: acute shortness of breath and severe bronchospasm after vinca alkaloids, most often with mitomycin-C; onset from minutes to several hours after the vinca dose and up to 2 weeks after mitomycin; do not readminister. ARDS also reported.', VCR) },
      { tox: 'chemo-hepatotoxicity', cite: [VCR], quirk: c('Label: hepatic veno-occlusive disease, particularly in children on combination regimens; some fatal, some survivors needed liver transplant.', VCR) },
      { tox: 'chemo-hypersensitivity', cite: [VCR], quirk: c('Label: rare allergic-type reactions including anaphylaxis, rash and edema.', VCR) },
    ],
    alsoOnLabel: [
      c('Ear damage: vestibular and auditory eighth-nerve damage (deafness, nystagmus, vertigo, dizziness), more concern with platinum drugs; transient cortical blindness and optic atrophy reported', VCR),
      c('Cardiovascular: hypertension and hypotension; coronary artery disease and myocardial infarction after mediastinal radiation with vincristine-containing combinations (causality not established)', VCR),
      c('Urinary retention and pain: bladder atony with polyuria and dysuria; jaw, pharyngeal, parotid, bone and back pain may be severe', VCR),
      c('Uric acid nephropathy: acute, reported; live vaccines are not recommended during treatment', VCR),
      c('Overdose amounts: adults can have severe symptoms at single doses of 3 mg/m2 or more, children under 13 at 3 to 4 mg/m2; deaths occurred in children under 13 at 10 times the recommended dose', VCR),
      c('Overdose supportive care: fluid restriction for SIADH (perhaps a loop and distal tubule diuretic), anticonvulsants, enemas for ileus, cardiac monitoring, daily counts; dialysis not likely to help', VCR),
      c('Folinic acid: may help in overdose (isolated case reports), no replacement for supportive care; if swallowed, evacuate the stomach, then give activated charcoal and a cathartic', VCR),
      c("CYP3A and P-gp drugs: itraconazole or fluconazole worsen neuromuscular effects; avoid strong CYP3A inhibitors and inducers (St. John's Wort) and P-gp drugs; monitor moderate inhibitors", VCR),
      c('Phenytoin: blood levels may fall and seizure activity increase when given with vincristine-containing chemotherapy', VCR),
      c('Charcot-Marie-Tooth syndrome: contraindicated in the demyelinating form', VCR),
    ],
  },
  {
    id: 'vinblastine', generic: 'vinblastine sulfate', brands: [], formerBrands: ['Velban'], brandSource: 'fda-drugsfda', aliases: ['vincaleukoblastine', 'VLB'], classIds: ['cyto-vinca-alkaloid'], label: VBL, tier: 'full',
    cancers: ['hodgkin-lymphoma', 'lymphocytic-lymphoma', 'histiocytic-lymphoma', 'mycosis-fungoides', 'testis-carcinoma', 'kaposi', 'letterer-siwe', 'choriocarcinoma', 'breast'],
    boxedWarning: [
      c('Wrong route: for intravenous use only, fatal if given by other routes; intrathecal administration usually results in death', VBL),
      c('Extravasation: causes considerable irritation; stop the injection immediately and give the remaining dose in another vein; hyaluronidase injection and moderate heat to the area are thought to minimize discomfort and cellulitis', VBL),
    ],
    effects: [
      { tox: 'vinca-wrong-route', boxed: true, rank: 1, cite: [VBL], quirk: c('Label: fatal if given other than intravenously; needs immediate neurosurgery to prevent ascending paralysis and death; rare survivors had devastating sequelae. No published vinblastine survival; the label takes its spinal fluid removal and irrigation steps from vincristine cases.', VBL) },
      { tox: 'chemo-extravasation', boxed: true, rank: 2, cite: [VBL], quirk: c('Label agent: local hyaluronidase injection plus application of moderate heat to the area of leakage, to disperse the drug. The label gives no compress temperature, only "moderate heat". Extravasation may lead to cellulitis and phlebitis, and sloughing if the amount is great.', VBL) },
      { tox: 'chemo-myelosuppression', timing: c('Leukocyte nadir 5-10 days after a dose, recovery in 7-14 days', VBL), quirk: c('Label: leukopenia is the most common and dose-limiting reaction and can reach dangerously low levels at higher doses; watch for infection if white count falls below 2,000/mm3.', VBL) },
      { tox: 'chemo-neuropathy-ileus', cite: [VBL], quirk: c('Label: neurologic toxicity can be disabling; reactions include paresthesias, loss of deep tendon reflexes, peripheral neuritis and ileus.', VBL) },
      { tox: 'chemo-cns-toxicity', cite: [VBL], quirk: c('Label: small daily amounts given for long periods are not advised: when several times the weekly dose was given as seven daily installments, convulsions, severe permanent central nervous system damage and death occurred.', VBL) },
      { tox: 'chemo-pulmonary-toxicity', cite: [VBL], quirk: c('Label: acute shortness of breath and severe bronchospasm after vinca alkaloids, most often with mitomycin-C; onset from minutes to several hours after the vinca dose and up to 2 weeks after mitomycin; do not readminister.', VBL) },
    ],
    alsoOnLabel: [
      c('GI and mouth: hemorrhagic enterocolitis, bleeding from an old peptic ulcer and rectal bleeding; stomatitis not common or permanent but can be disabling', VBL),
      c('Ear damage: rare vestibular and auditory eighth-nerve damage (deafness, dizziness, nystagmus, vertigo), more concern with platinum drugs', VBL),
      c('Cardiovascular: myocardial infarction, angina, ischemic ECG changes reported very rarely; with bleomycin and cisplatin also unexpected infarction, stroke, Raynaud; care in ischemic heart disease', VBL),
      c('Overdose: no specific antidote; myelosuppression is the major effect and may be life-threatening', VBL),
      c('Overdose supportive care: fluid restriction for SIADH (also seen above recommended doses), anticonvulsant, prevent ileus, cardiac monitoring, daily counts; dialysis or cholestyramine effect unknown', VBL),
      c('Swallowed vinblastine: give activated charcoal with a cathartic', VBL),
      c('CYP3A inhibitors: enhanced toxicity reported with erythromycin; concurrent inhibitors may bring earlier onset or worse side effects', VBL),
      c('Phenytoin: blood levels may fall and seizure activity increase when given with vinblastine-containing chemotherapy', VBL),
      c('Granulocytopenia or infection: contraindicated with significant granulocytopenia (unless disease-caused) or bacterial infection; counts fell sharply with marrow tumor infiltration: avoid further use', VBL),
    ],
  },
  {
    id: 'vinorelbine', generic: 'vinorelbine', brands: [], formerBrands: ['Navelbine'], brandSource: 'fda-drugsfda', classIds: ['cyto-vinca-alkaloid'], label: VNR, tier: 'full',
    cancers: ['nsclc'],
    boxedWarning: [
      c('Myelosuppression: severe, resulting in serious infection, septic shock, hospitalization and death', VNR),
    ],
    effects: [
      { tox: 'chemo-myelosuppression', boxed: true, rank: 1, timing: c('Nadir 7-10 days after dosing, recovery usually in the following 7-14 days', VNR), quirk: c('Label: neutropenia is the dose-limiting toxicity; grade 3-4 neutropenia in 53% at 30 mg/m2 per week; hospitalization for pyrexia or sepsis in 8%; death from sepsis in 1%.', VNR) },
      { tox: 'chemo-extravasation', cite: [VNR], quirk: c('Label: extravasation can cause severe irritation, local tissue necrosis and thrombophlebitis; stop the infusion at once and begin recommended management. The label names no specific antidote or compress.', VNR) },
      { tox: 'chemo-neuropathy-ileus', cite: [VNR], quirk: c('Label: severe and fatal paralytic ileus, constipation, intestinal obstruction, necrosis and perforation; sensory and motor neuropathies including severe.', VNR) },
      { tox: 'chemo-pulmonary-toxicity', timing: c('Mean onset 1 week after dose, range 3-8 days', VNR), quirk: c('Label: severe acute bronchospasm, interstitial pneumonitis and ARDS, with fatalities.', VNR) },
      { tox: 'chemo-hepatotoxicity', cite: [VNR], quirk: c('Label: drug-induced liver injury with raised AST and bilirubin.', VNR) },
    ],
    alsoOnLabel: [
      c('Route: must be given only intravenously', VNR),
      c('Bowel regimen: a prophylactic regimen (fiber, hydration, stool softeners) is advised against constipation, obstruction and ileus', VNR),
      c('Anaphylaxis: postmarketing anaphylactic reaction and angioedema', VNR),
      c('Thromboembolism: postmarketing pulmonary embolism and deep vein thrombosis', VNR),
      c('Lung events: postmarketing pneumonia and pulmonary edema', VNR),
      c('Pancreatitis: postmarketing', VNR),
      c('Hyponatremia: postmarketing electrolyte imbalance including hyponatremia', VNR),
      c('Ear damage: postmarketing vestibular disorder and hearing impairment', VNR),
      c('Overdose: up to 10 times the recommended dose caused paralytic ileus, stomatitis, esophagitis, marrow aplasia, sepsis and paresis; fatalities; no known antidote', VNR),
      c('Overdose care: supportive measures with transfusions, growth factors and antibiotics', VNR),
      c('CYP3A inhibitors: caution; concurrent use may bring earlier onset or worse adverse reactions', VNR),
    ],
  },
  {
    id: 'eribulin', generic: 'eribulin mesylate', brands: ['Halaven'], brandSource: 'fda-drugsfda', classIds: ['cyto-microtubule-dynamics-inhibitor'], label: ERI, tier: 'full',
    cancers: ['breast', 'liposarcoma-unresectable-metastatic'],
    effects: [
      { tox: 'chemo-myelosuppression', cite: [ERI], quirk: c('Label: severe neutropenia (under 500/mm3) lasting more than 1 week in 12% of breast cancer patients (62/503); febrile neutropenia in 5% with two deaths (0.4%); fatal neutropenic sepsis in 0.9% in the liposarcoma/leiomyosarcoma study; postmarketing reports also list sepsis and neutropenic sepsis.', ERI) },
      { tox: 'chemo-neuropathy-ileus', cite: [ERI], quirk: c('Label: grade 3 peripheral neuropathy in 8% and grade 4 in 0.4% of breast cancer patients; the most common reason for discontinuation (5%); neuropathy lasting over a year in 5%.', ERI) },
      { tox: 'qt-prolongation', timing: c('QT change seen on day 8 but not day 1, in an uncontrolled study of 26 patients', ERI), quirk: c('Label: ECG monitoring recommended with heart failure, bradyarrhythmias, QT-prolonging drugs (including class Ia and III antiarrhythmics) and electrolyte abnormalities; correct low potassium or magnesium first; avoid in congenital long QT syndrome.', ERI) },
      { tox: 'chemo-severe-skin', basis: 'postmarketing', cite: [ERI], quirk: c('Label (postmarketing): Stevens-Johnson syndrome and toxic epidermal necrolysis reported.', ERI) },
      { tox: 'chemo-pulmonary-toxicity', basis: 'postmarketing', cite: [ERI], quirk: c('Label (postmarketing): interstitial lung disease reported.', ERI) },
      { tox: 'chemo-hepatotoxicity', basis: 'postmarketing', cite: [ERI], quirk: c('Label (postmarketing): hepatotoxicity reported.', ERI) },
    ],
    alsoOnLabel: [
      c('Pancreatitis: postmarketing', ERI),
      c('Pneumonia: postmarketing', ERI),
      c('Hypersensitivity: postmarketing drug hypersensitivity', ERI),
      c('Overdose: reported at about 4 times the recommended dose, with grade 3 neutropenia lasting 7 days and a grade 3 hypersensitivity reaction lasting 1 day; no known antidote', ERI),
      c('No expected interactions: none expected with CYP3A4 inhibitors, CYP3A4 inducers or P-gp inhibitors (no meaningful exposure change with ketoconazole or rifampin)', ERI),
    ],
  },
  {
    id: 'ixabepilone', generic: 'ixabepilone', brands: ['Ixempra', 'Ixempra Kit'], brandSource: 'fda-drugsfda', classIds: ['cyto-epothilone'], label: IXA, tier: 'full',
    cancers: ['breast'],
    boxedWarning: [
      c('Toxicity in hepatic impairment: with capecitabine, contraindicated if AST or ALT is above 2.5 x ULN or bilirubin above 1 x ULN (increased risk of toxicity and neutropenia-related death)', IXA),
    ],
    effects: [
      { tox: 'chemo-myelosuppression', boxed: true, rank: 1, cite: [IXA], quirk: c('Label: severe, life-threatening or fatal myelosuppression, dose-dependent; grade 4 neutropenia in 36% with capecitabine and 23% as single agent; neutropenia-related death in 1.9% of 414 patients with normal or mildly impaired liver function on the combination, and 29% (5 of 17) with AST/ALT above 2.5 x ULN or bilirubin above 1.5 x ULN.', IXA) },
      { tox: 'chemo-neuropathy-ileus', cite: [IXA], quirk: c('Label: sensory and motor peripheral neuropathy with the combination and as a single agent.', IXA) },
      { tox: 'chemo-hypersensitivity', cite: [IXA], quirk: c('Label: severe reactions including anaphylaxis in 9 of 1323 patients (1%); contraindicated with a history of severe hypersensitivity to Cremophor EL (polyoxyethylated castor oil) agents. H1 and H2 antagonist premedication is named about 1 hour before infusion; after a reaction, a corticosteroid is added in later cycles.', IXA) },
      { tox: 'chemo-cardiotoxicity', cite: [IXA], quirk: c('Label: myocardial ischemia and ventricular dysfunction in 1.9% with capecitabine and 0.3% as a single agent; supraventricular arrhythmias in 0.5% on the combination.', IXA) },
    ],
    alsoOnLabel: [
      c('Alcohol content: a 40 mg/m2 dose delivers about 8.4 g/m2 of ethanol, which may affect the CNS and the ability to drive or use machines right after infusion', IXA),
      c('Overdose: up to 100 mg/m2 (about 2.5 times the recommended dose) caused peripheral neuropathy, fatigue, myalgia and GI symptoms; no known antidote; monitor and give supportive treatment', IXA),
      c('Strong CYP3A4 inhibitors: avoid; moderate or weak inhibitors may raise the incidence and severity of adverse reactions, so monitor', IXA),
      c('Strong CYP3A4 inducers: avoid', IXA),
      c('Low blood counts: contraindicated with neutrophils under 1500 cells/mm3 or platelets under 100,000 cells/mm3', IXA),
    ],
  },
];
