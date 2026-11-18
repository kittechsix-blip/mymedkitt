import type { Cancer, Cited, DrugClass, OncDrug, OncSource } from '../types.js';

// Targeted therapies for lung cancer and melanoma (EGFR, ALK/ROS1, TRK, MET, RET, KRAS G12C, BRAF and MEK inhibitors),
// from the DailyMed labels (SPL) read 2026-11-18. Every statement is taken from the label named in its citation.
// Dosing lives on management pages, not here.
const c = (v: string, ...cite: string[]): Cited => ({ v, cite });
const dm = (setid: string) => `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${setid}`;

const OSI = 'pi-osimertinib';
const GEF = 'pi-gefitinib';
const AFA = 'pi-afatinib';
const DAC = 'pi-dacomitinib';
const LAZ = 'pi-lazertinib';
const ALE = 'pi-alectinib';
const BRI = 'pi-brigatinib';
const LOR = 'pi-lorlatinib';
const CRI = 'pi-crizotinib';
const CER = 'pi-ceritinib';
const ENT = 'pi-entrectinib';
const REP = 'pi-repotrectinib';
const LAR = 'pi-larotrectinib';
const CAP = 'pi-capmatinib';
const TEP = 'pi-tepotinib';
const SEL = 'pi-selpercatinib';
const PRA = 'pi-pralsetinib';
const SOT = 'pi-sotorasib';
const ADA = 'pi-adagrasib';
const DAB = 'pi-dabrafenib';
const TRA = 'pi-trametinib';
const VEM = 'pi-vemurafenib';
const COB = 'pi-cobimetinib';
const ENC = 'pi-encorafenib';
const BIN = 'pi-binimetinib';

export const SOURCES: Record<string, OncSource> = {
  'pi-osimertinib': { key: 'pi-osimertinib', kind: 'fda-pi', text: 'TAGRISSO (osimertinib) tablets (AstraZeneca Pharmaceuticals LP). Prescribing information, DailyMed set ID 5e81b4a7-b971-45e1-9c31-29cea8c87ce7, SPL effective 2026-09-14.', url: dm('5e81b4a7-b971-45e1-9c31-29cea8c87ce7'), revised: '2026-09-14' },
  'pi-gefitinib': { key: 'pi-gefitinib', kind: 'fda-pi', text: 'IRESSA (gefitinib) tablets (AstraZeneca Pharmaceuticals LP). Prescribing information, DailyMed set ID 827d60e8-7e07-41b7-c28b-49ef1c4a5a41, SPL effective 2023-02-28.', url: dm('827d60e8-7e07-41b7-c28b-49ef1c4a5a41'), revised: '2023-02-28' },
  'pi-afatinib': { key: 'pi-afatinib', kind: 'fda-pi', text: 'GILOTRIF (afatinib) tablets (Boehringer Ingelheim Pharmaceuticals, Inc.). Prescribing information, DailyMed set ID fd638e5e-8032-e7ca-0179-95e96ab5d387, SPL effective 2025-11-13.', url: dm('fd638e5e-8032-e7ca-0179-95e96ab5d387'), revised: '2025-11-13' },
  'pi-dacomitinib': { key: 'pi-dacomitinib', kind: 'fda-pi', text: 'VIZIMPRO (dacomitinib) tablets (Pfizer Laboratories Div Pfizer Inc). Prescribing information, DailyMed set ID 4ab27d2f-e385-4e9c-b324-fa69c10b855a, SPL effective 2026-06-23.', url: dm('4ab27d2f-e385-4e9c-b324-fa69c10b855a'), revised: '2026-06-23' },
  'pi-lazertinib': { key: 'pi-lazertinib', kind: 'fda-pi', text: 'LAZCLUZE (lazertinib) tablets (Janssen Biotech, Inc.). Prescribing information, DailyMed set ID c417f9ee-2027-4ed5-92ad-3c19266de16c, SPL effective 2026-05-05.', url: dm('c417f9ee-2027-4ed5-92ad-3c19266de16c'), revised: '2026-05-05' },
  'pi-alectinib': { key: 'pi-alectinib', kind: 'fda-pi', text: 'ALECENSA (alectinib hydrochloride) capsules (Genentech, Inc.). Prescribing information, DailyMed set ID 42c49deb-713b-427a-9670-08af08adcffb, SPL effective 2026-08-21.', url: dm('42c49deb-713b-427a-9670-08af08adcffb'), revised: '2026-08-21' },
  'pi-brigatinib': { key: 'pi-brigatinib', kind: 'fda-pi', text: 'ALUNBRIG (brigatinib) tablets (Takeda Pharmaceuticals America, Inc.). Prescribing information, DailyMed set ID 0fe9ff20-d402-41f3-bc1e-7002ea7007db, SPL effective 2026-01-12.', url: dm('0fe9ff20-d402-41f3-bc1e-7002ea7007db'), revised: '2026-01-12' },
  'pi-lorlatinib': { key: 'pi-lorlatinib', kind: 'fda-pi', text: 'LORBRENA (lorlatinib) tablets (Pfizer Laboratories Div Pfizer Inc). Prescribing information, DailyMed set ID 2b34d62d-e02a-4af3-bc0d-1571dd4ee76d, SPL effective 2026-06-26.', url: dm('2b34d62d-e02a-4af3-bc0d-1571dd4ee76d'), revised: '2026-06-26' },
  'pi-crizotinib': { key: 'pi-crizotinib', kind: 'fda-pi', text: 'XALKORI (crizotinib) capsules and oral pellets (Pfizer Laboratories Div Pfizer Inc). Prescribing information, DailyMed set ID 2a51b0de-47d6-455e-a94c-d2c737b04ff7, SPL effective 2026-10-29.', url: dm('2a51b0de-47d6-455e-a94c-d2c737b04ff7'), revised: '2026-10-29' },
  'pi-ceritinib': { key: 'pi-ceritinib', kind: 'fda-pi', text: 'ZYKADIA (ceritinib) capsules and tablets (Novartis Pharmaceuticals Corporation). Prescribing information, DailyMed set ID fff5d805-4ffd-4e8e-8e63-6f129697563e, SPL effective 2026-10-28.', url: dm('fff5d805-4ffd-4e8e-8e63-6f129697563e'), revised: '2026-10-28' },
  'pi-entrectinib': { key: 'pi-entrectinib', kind: 'fda-pi', text: 'ROZLYTREK (entrectinib) capsules and oral pellets (Genentech, Inc.). Prescribing information, DailyMed set ID c7c71b0c-2549-4495-86b6-c2807fa54908, SPL effective 2026-10-08.', url: dm('c7c71b0c-2549-4495-86b6-c2807fa54908'), revised: '2026-10-08' },
  'pi-repotrectinib': { key: 'pi-repotrectinib', kind: 'fda-pi', text: 'AUGTYRO (repotrectinib) capsules (E.R. Squibb & Sons, L.L.C.). Prescribing information, DailyMed set ID fb526827-40ba-4462-94cf-179ae3b0cb8a, SPL effective 2024-06-13.', url: dm('fb526827-40ba-4462-94cf-179ae3b0cb8a'), revised: '2024-06-13' },
  'pi-larotrectinib': { key: 'pi-larotrectinib', kind: 'fda-pi', text: 'VITRAKVI (larotrectinib) capsules and oral solution (Bayer HealthCare Pharmaceuticals Inc.). Prescribing information, DailyMed set ID 0c8ca614-58b2-4aa4-83d3-0387a8f782fd, SPL effective 2026-05-22.', url: dm('0c8ca614-58b2-4aa4-83d3-0387a8f782fd'), revised: '2026-05-22' },
  'pi-capmatinib': { key: 'pi-capmatinib', kind: 'fda-pi', text: 'TABRECTA (capmatinib) tablets (Novartis Pharmaceuticals Corporation). Prescribing information, DailyMed set ID 455892c3-d144-4ba8-9ab4-79cabff9876d, SPL effective 2026-10-26.', url: dm('455892c3-d144-4ba8-9ab4-79cabff9876d'), revised: '2026-10-26' },
  'pi-tepotinib': { key: 'pi-tepotinib', kind: 'fda-pi', text: 'TEPMETKO (tepotinib hydrochloride) tablets (EMD Serono, Inc.). Prescribing information, DailyMed set ID 80a0f1b9-071a-47f5-9e67-32d638a669dc, SPL effective 2025-04-17.', url: dm('80a0f1b9-071a-47f5-9e67-32d638a669dc'), revised: '2025-04-17' },
  'pi-selpercatinib': { key: 'pi-selpercatinib', kind: 'fda-pi', text: 'RETEVMO (selpercatinib) capsules and tablets (Eli Lilly and Company). Prescribing information, DailyMed set ID 7fa848ba-a59c-4144-9f52-64d090f4d828, SPL effective 2026-09-11.', url: dm('7fa848ba-a59c-4144-9f52-64d090f4d828'), revised: '2026-09-11' },
  'pi-pralsetinib': { key: 'pi-pralsetinib', kind: 'fda-pi', text: 'GAVRETO (pralsetinib) capsules (Rigel Pharmaceuticals, Inc.). Prescribing information, DailyMed set ID 16edd46e-28b8-f06d-e063-6394a90ae31b, SPL effective 2025-12-30.', url: dm('16edd46e-28b8-f06d-e063-6394a90ae31b'), revised: '2025-12-30' },
  'pi-sotorasib': { key: 'pi-sotorasib', kind: 'fda-pi', text: 'LUMAKRAS (sotorasib) tablets (Amgen, Inc). Prescribing information, DailyMed set ID c80a362c-7ac3-4894-a076-0691e68ef8c1, SPL effective 2026-11-03.', url: dm('c80a362c-7ac3-4894-a076-0691e68ef8c1'), revised: '2026-11-03' },
  'pi-adagrasib': { key: 'pi-adagrasib', kind: 'fda-pi', text: 'KRAZATI (adagrasib) tablets (Mirati Therapeutics, Inc). Prescribing information, DailyMed set ID 0b8bf078-34c2-4f45-9012-38a8ac082b01, SPL effective 2026-08-31.', url: dm('0b8bf078-34c2-4f45-9012-38a8ac082b01'), revised: '2026-08-31' },
  'pi-dabrafenib': { key: 'pi-dabrafenib', kind: 'fda-pi', text: 'TAFINLAR (dabrafenib) capsules and tablets for oral suspension (Novartis Pharmaceuticals Corporation). Prescribing information, DailyMed set ID fee1e6b1-e1a5-4254-9f2e-a70e0f8dbdea, SPL effective 2026-05-20.', url: dm('fee1e6b1-e1a5-4254-9f2e-a70e0f8dbdea'), revised: '2026-05-20' },
  'pi-trametinib': { key: 'pi-trametinib', kind: 'fda-pi', text: 'MEKINIST (trametinib) tablets and for oral solution (Novartis Pharmaceuticals Corporation). Prescribing information, DailyMed set ID 0002ad27-779d-42ab-83b5-bc65453412a1, SPL effective 2026-05-07.', url: dm('0002ad27-779d-42ab-83b5-bc65453412a1'), revised: '2026-05-07' },
  'pi-vemurafenib': { key: 'pi-vemurafenib', kind: 'fda-pi', text: 'ZELBORAF (vemurafenib) tablets (Genentech, Inc.). Prescribing information, DailyMed set ID 38eea320-7e0c-485a-bc30-98c3c45e2763, SPL effective 2026-08-28.', url: dm('38eea320-7e0c-485a-bc30-98c3c45e2763'), revised: '2026-08-28' },
  'pi-cobimetinib': { key: 'pi-cobimetinib', kind: 'fda-pi', text: 'COTELLIC (cobimetinib) tablets (Genentech, Inc.). Prescribing information, DailyMed set ID c387579e-cee0-4334-bd1e-73f93ac1bde6, SPL effective 2026-07-29.', url: dm('c387579e-cee0-4334-bd1e-73f93ac1bde6'), revised: '2026-07-29' },
  'pi-encorafenib': { key: 'pi-encorafenib', kind: 'fda-pi', text: 'BRAFTOVI (encorafenib) capsules (Array BioPharma Inc.). Prescribing information, DailyMed set ID 235dfc38-0f0b-4037-b501-7a9f4294740c, SPL effective 2026-02-26.', url: dm('235dfc38-0f0b-4037-b501-7a9f4294740c'), revised: '2026-02-26' },
  'pi-binimetinib': { key: 'pi-binimetinib', kind: 'fda-pi', text: 'MEKTOVI (binimetinib) tablets (Array BioPharma Inc.). Prescribing information, DailyMed set ID 6c3408ac-d401-4925-8a03-26591afbc240, SPL effective 2025-03-20.', url: dm('6c3408ac-d401-4925-8a03-26591afbc240'), revised: '2025-03-20' },
};

export const CANCERS: Cancer[] = [
  { id: 'egfr-nsclc', type: 'lung-nsclc', name: 'EGFR mutation-positive non-small cell lung cancer' },
  { id: 'egfr-nsclc-amivantamab', type: 'lung-nsclc', name: 'EGFR exon 19 deletion or exon 21 L858R mutation-positive locally advanced or metastatic non-small cell lung cancer (first-line, with amivantamab)' },
  { id: 'nsclc-squamous', type: 'lung-nsclc', name: 'Metastatic squamous non-small cell lung cancer progressing after platinum-based chemotherapy' },
  { id: 'alk-nsclc', type: 'lung-nsclc', name: 'ALK-positive non-small cell lung cancer' },
  { id: 'alk-ros1-nsclc', type: 'lung-nsclc', name: 'ALK- or ROS1-positive metastatic non-small cell lung cancer' },
  { id: 'ros1-nsclc', type: 'lung-nsclc', name: 'ROS1-positive non-small cell lung cancer' },
  { id: 'alk-alcl', type: 'nhl', name: 'Relapsed or refractory systemic ALK-positive anaplastic large cell lymphoma' },
  { id: 'alk-imt', name: 'Unresectable, recurrent or refractory ALK-positive inflammatory myofibroblastic tumor' },
  { id: 'ntrk-solid', type: 'tissue-agnostic', name: 'NTRK gene fusion-positive solid tumors' },
  { id: 'met-ex14-nsclc', type: 'lung-nsclc', name: 'Metastatic non-small cell lung cancer with MET exon 14 skipping' },
  { id: 'ret-nsclc', type: 'lung-nsclc', name: 'RET fusion-positive non-small cell lung cancer' },
  { id: 'ret-mtc', type: 'thyroid', name: 'RET-mutant medullary thyroid cancer' },
  { id: 'ret-thyroid', type: 'thyroid', name: 'RET fusion-positive thyroid cancer (radioactive iodine-refractory)' },
  { id: 'ret-solid', type: 'tissue-agnostic', name: 'RET fusion-positive solid tumors' },
  { id: 'kras-g12c-nsclc', type: 'lung-nsclc', name: 'KRAS G12C-mutated locally advanced or metastatic non-small cell lung cancer' },
  { id: 'kras-g12c-crc', type: 'colorectal', name: 'KRAS G12C-mutated metastatic colorectal cancer (with panitumumab)' },
  { id: 'braf-melanoma', type: 'melanoma', name: 'BRAF V600E or V600K mutation-positive unresectable or metastatic melanoma' },
  { id: 'braf-melanoma-v600e', type: 'melanoma', name: 'BRAF V600E mutation-positive unresectable or metastatic melanoma' },
  { id: 'braf-melanoma-adjuvant', type: 'melanoma', name: 'BRAF V600E or V600K mutation-positive melanoma (adjuvant treatment after complete resection)' },
  { id: 'braf-nsclc', type: 'lung-nsclc', name: 'BRAF V600E mutation-positive metastatic non-small cell lung cancer' },
  { id: 'braf-atc', type: 'thyroid', name: 'BRAF V600E mutation-positive locally advanced or metastatic anaplastic thyroid cancer' },
  { id: 'braf-solid', type: 'tissue-agnostic', name: 'BRAF V600E mutation-positive unresectable or metastatic solid tumors' },
  { id: 'braf-lgg', type: 'brain', name: 'BRAF V600E mutation-positive low-grade glioma (pediatric)' },
  { id: 'mcrc-braf-v600e', type: 'colorectal', name: 'BRAF V600E mutation-positive metastatic colorectal cancer' },
  { id: 'erdheim-chester-braf', type: 'histiocytic', name: 'Erdheim-Chester disease with BRAF V600 mutation' },
  { id: 'histiocytic-neoplasms', type: 'histiocytic', name: 'Histiocytic neoplasms' },
];

export const CLASSES: DrugClass[] = [
  {
    id: 'tgt-egfr-tki', name: 'EGFR tyrosine kinase inhibitor',
    mechanism: c('Inhibits the kinase activity of the epidermal growth factor receptor (EGFR), including the exon 19 deletion and exon 21 L858R activating mutations.', OSI, GEF, AFA, DAC, LAZ),
    effects: [
      { tox: 'drug-lung-toxicity', cite: [OSI, GEF, AFA, DAC, LAZ], note: c('Each label describes interstitial lung disease/pneumonitis; the lazertinib label describes it with amivantamab.', OSI, GEF, AFA, DAC, LAZ) },
    ],
  },
  {
    id: 'tgt-alk-ros1-tki', name: 'ALK or ROS1 kinase inhibitor',
    mechanism: c('Inhibits the ALK and/or ROS1 receptor tyrosine kinases; each label names ALK, ROS1 or both, and several list further kinases.', ALE, BRI, LOR, CRI, CER, ENT, REP),
    effects: [],
  },
  {
    id: 'tgt-trk-inhibitor', name: 'TRK inhibitor',
    mechanism: c('Inhibits the tropomyosin receptor kinases TRKA, TRKB and TRKC.', LAR, ENT, REP),
    effects: [
      { tox: 'drug-cns-toxicity', cite: [LAR, ENT, REP], note: c('Each label has a warning for central nervous system effects (cognitive, mood, dizziness and sleep effects).', LAR, ENT, REP) },
      { tox: 'drug-hepatotoxicity', cite: [LAR, ENT, REP] },
    ],
  },
  {
    id: 'tgt-met-inhibitor', name: 'MET kinase inhibitor',
    mechanism: c('Inhibits the MET kinase, including the mutant variant produced by MET exon 14 skipping.', CAP, TEP),
    effects: [
      { tox: 'drug-lung-toxicity', cite: [CAP, TEP] },
      { tox: 'drug-hepatotoxicity', cite: [CAP, TEP] },
    ],
  },
  {
    id: 'tgt-ret-inhibitor', name: 'RET kinase inhibitor',
    mechanism: c('Inhibits wild-type RET and oncogenic RET fusions and mutations.', SEL, PRA),
    effects: [
      { tox: 'drug-lung-toxicity', cite: [SEL, PRA] },
      { tox: 'drug-hypertension', cite: [SEL, PRA] },
      { tox: 'drug-hepatotoxicity', cite: [SEL, PRA] },
      { tox: 'drug-hemorrhage', cite: [SEL, PRA] },
      { tox: 'chemo-tumor-lysis', cite: [SEL, PRA] },
    ],
  },
  {
    id: 'tgt-kras-g12c-inhibitor', name: 'KRAS G12C inhibitor',
    mechanism: c('Irreversibly inhibits the mutant KRAS G12C protein, locking it in an inactive state so that downstream signaling is prevented.', SOT, ADA),
    effects: [
      { tox: 'drug-hepatotoxicity', cite: [SOT, ADA] },
      { tox: 'drug-lung-toxicity', cite: [SOT, ADA] },
    ],
  },
  {
    id: 'tgt-braf-inhibitor', name: 'BRAF kinase inhibitor',
    mechanism: c('Inhibits mutated forms of the BRAF kinase, including BRAF V600E.', DAB, VEM, ENC),
    effects: [
      { tox: 'drug-ocular-toxicity', cite: [DAB, VEM, ENC], note: c('Each label has a warning for uveitis (the vemurafenib label also names blurry vision and photophobia).', DAB, VEM, ENC) },
    ],
  },
  {
    id: 'tgt-mek-inhibitor', name: 'MEK inhibitor',
    mechanism: c('Reversibly inhibits mitogen-activated extracellular signal-regulated kinase 1 (MEK1) and MEK2, upstream regulators of the ERK pathway.', TRA, COB, BIN),
    effects: [
      { tox: 'drug-hemorrhage', cite: [TRA, COB, BIN] },
      { tox: 'drug-cardiotoxicity', cite: [TRA, COB, BIN], note: c('Each label has a warning for cardiomyopathy (decline in left ventricular ejection fraction).', TRA, COB, BIN) },
      { tox: 'drug-ocular-toxicity', cite: [TRA, COB, BIN], note: c('Each label has a warning for retinal toxicity (retinal vein occlusion and retinal pigment epithelial detachment, or serous retinopathy).', TRA, COB, BIN) },
    ],
  },
];

export const DRUGS: OncDrug[] = [
  {
    id: 'osimertinib', generic: 'osimertinib', brands: ['Tagrisso'], brandSource: 'fda-drugsfda', classIds: ['tgt-egfr-tki'], label: 'pi-osimertinib', tier: 'full',
    cancers: ['egfr-nsclc'],
    effects: [
      {
        tox: 'drug-lung-toxicity', cite: ['pi-osimertinib'],
        quirk: c('Withhold and promptly investigate worsening respiratory symptoms; permanently discontinue if ILD is confirmed (after recent chemoradiation: grade 1 may continue, grade 2 or higher permanently discontinue). Severe and fatal: 4% of 1813 on monotherapy (0.4% fatal); 3.3% with pemetrexed and platinum; 56% after chemoradiation (LAURA), one fatal.', OSI),
      },
      {
        tox: 'drug-qt-prolongation', cite: ['pi-osimertinib'],
        quirk: c('Periodic ECG and electrolytes with congenital long QTc, heart failure, electrolyte abnormalities or QTc-prolonging drugs; permanently discontinue if QTc prolongation comes with signs of life-threatening arrhythmia. QTc over 500 msec in 1.1% of 1813 patients (1.8% with chemotherapy); no QTc-related arrhythmias reported.', OSI),
      },
      {
        tox: 'drug-cardiotoxicity', cite: ['pi-osimertinib'],
        quirk: c('Cardiomyopathy (cardiac failure, congestive heart failure, pulmonary edema, decreased ejection fraction) in 3.8% of 1813 patients, 0.1% fatal; 9% with pemetrexed and platinum chemotherapy, 1.1% fatal. Label: assess LVEF if cardiac signs or symptoms develop; permanently discontinue for symptomatic congestive heart failure.', OSI),
      },
      {
        tox: 'drug-severe-skin', cite: ['pi-osimertinib'],
        quirk: c('Reported postmarketing: erythema multiforme major, Stevens-Johnson syndrome and toxic epidermal necrolysis reported. Label: withhold if suspected, permanently discontinue if confirmed.', OSI),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-osimertinib'],
        quirk: c('Keratitis in 0.6% of 1813 patients. Label: promptly refer signs and symptoms (eye inflammation, lacrimation, light sensitivity, blurred vision, eye pain, red eye) to an ophthalmologist.', OSI),
      },
      {
        tox: 'chemo-myelosuppression', cite: ['pi-osimertinib'],
        quirk: c('Aplastic anemia in 0.06% of 1813 patients and postmarketing; some cases fatal. Label: warn patients of new or persistent fevers, bruising, bleeding, pallor; withhold and obtain hematology consultation if suspected; permanently discontinue if confirmed.', OSI),
      },
      {
        tox: 'rhabdomyolysis', cite: ['pi-osimertinib'],
        quirk: c('Rhabdomyolysis reported in the postmarketing setting (listed with myalgia or myositis with creatine phosphokinase elevation).', OSI),
      },
    ],
    alsoOnLabel: [
      c('Pulmonary embolism: serious reaction in 1.8% in FLAURA and 2.2% with pemetrexed and platinum chemotherapy in FLAURA2, where it was fatal in 1.1% (section 6.1)', OSI),
      c('Cutaneous vasculitis: postmarketing cases; withhold if suspected, evaluate for systemic involvement, consider permanent discontinuation if no other cause', OSI),
      c('Myalgia or myositis: myalgia in 4.8% of 1813 patients; monitor CPK with unexplained muscle pain or tenderness and withhold', OSI),
      c('Eosinophilic pneumonia: listed in postmarketing reports', OSI),
      c('Strong CYP3A inducers: avoid; label says to increase the osimertinib dose if use is unavoidable (no change for moderate or weak inducers)', OSI),
      c('QTc-prolonging drugs: effect unknown; avoid those with known torsades risk when feasible, otherwise periodic ECG monitoring', OSI),
      c('BCRP or P-gp substrates: osimertinib raises their exposure; label says monitor for their adverse reactions', OSI),
    ],
  },
  {
    id: 'gefitinib', generic: 'gefitinib', brands: ['Iressa'], brandSource: 'fda-drugsfda', classIds: ['tgt-egfr-tki'], label: 'pi-gefitinib', tier: 'full',
    cancers: ['egfr-nsclc'],
    effects: [
      {
        tox: 'drug-lung-toxicity', cite: ['pi-gefitinib'],
        quirk: c('ILD or ILD-like reactions (lung infiltration, pneumonitis, acute respiratory distress syndrome, pulmonary fibrosis) in 1.3% of 2462 patients; 0.7% were grade 3 or higher and 3 cases were fatal. Label: withhold and promptly investigate worsening dyspnea, cough or fever; permanently discontinue if ILD is confirmed.', GEF),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-gefitinib'],
        quirk: c('Increased ALT in 11.4% of patients, AST 7.9%, bilirubin 2.7%; grade 3 or higher in 5.1% (ALT), 3.0% (AST) and 0.7% (bilirubin). Fatal hepatotoxicity 0.04%. Label: withhold for worsening liver function; discontinue for severe hepatic impairment.', GEF),
      },
      {
        tox: 'drug-gi-perforation', cite: ['pi-gefitinib'],
        quirk: c('Three patients (0.1%) of 2462. Label: permanently discontinue if gastrointestinal perforation develops.', GEF),
      },
      {
        tox: 'drug-diarrhea-colitis', cite: ['pi-gefitinib'],
        quirk: c('Grade 3 or 4 diarrhea in 3% of 2462 patients. Label: withhold for severe or persistent (up to 14 days) diarrhea.', GEF),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-gefitinib'],
        quirk: c('Keratitis 0.1%, corneal erosion and aberrant eyelash growth 0.2%, conjunctivitis, blepharitis and dry eye 6.7%; grade 3 ocular disorders 0.1%. Label: interrupt or discontinue for severe or worsening ocular disorders.', GEF),
      },
      {
        tox: 'drug-severe-skin', cite: ['pi-gefitinib'],
        quirk: c('Bullous conditions including toxic epidermal necrolysis, Stevens-Johnson syndrome and erythema multiforme have been reported; erythema multiforme and dermatitis bullous in two patients (0.08%) across NSCLC trials. Label: interrupt or discontinue for severe bullous, blistering or exfoliating conditions.', GEF),
      },
    ],
    alsoOnLabel: [
      c('Hemorrhage: including epistaxis and hematuria in 4.3% across NSCLC trials (6.1)', GEF),
      c('Angioedema: allergic reactions including angioedema and urticaria in 1.1% across NSCLC trials (6.1)', GEF),
      c('Pancreatitis: 0.1% in the adverse reactions list across NSCLC trials', GEF),
      c('Postmarketing: cystitis, hemorrhagic cystitis and cutaneous vasculitis', GEF),
      c('Overdose: weekly 1500 to 3500 mg in 23 patients gave mostly mild to moderate events; interrupt, give supportive care, observe until stable; no specific treatment', GEF),
      c('Warfarin: INR elevations and/or hemorrhage reported in some patients; label says to monitor prothrombin time or INR regularly', GEF),
      c('Strong CYP3A4 inducers: label gives rifampicin, phenytoin or tricyclic antidepressant as examples; they lower gefitinib levels and the label directs a dose increase while on the inducer', GEF),
      c('Strong CYP3A4 inhibitors: label gives ketoconazole and itraconazole as examples; they raise gefitinib levels and the label says to monitor adverse reactions', GEF),
      c('Gastric pH drugs: PPIs, H2-receptor antagonists and antacids may lower gefitinib levels; avoid PPIs if possible, otherwise separate dosing times as the label gives', GEF),
      c('Other fatal reactions in trials: respiratory failure 0.9%, pneumonia 0.8%, pulmonary embolism 0.5% of IRESSA-treated patients', GEF),
    ],
  },
  {
    id: 'afatinib', generic: 'afatinib', brands: ['Gilotrif'], brandSource: 'fda-drugsfda', classIds: ['tgt-egfr-tki'], label: 'pi-afatinib', tier: 'full',
    cancers: ['egfr-nsclc', 'nsclc-squamous'],
    effects: [
      {
        tox: 'drug-diarrhea-colitis', cite: ['pi-afatinib'],
        timing: c('LUX-Lung 3: grade 3 diarrhea in first 6 weeks, 15% of 229 patients had grade 3 diarrhea', AFA),
        quirk: c('Withhold for grade 2 diarrhea over 48 hours or grade 3 or higher until grade 1; give an anti-diarrheal (loperamide) at onset. Can cause dehydration and renal impairment (6% to 7%); some fatal. Grade 3 to 4 in 16% of 4257 patients; any grade 96% (LUX-Lung 3) and 75% (LUX-Lung 8).', AFA),
      },
      {
        tox: 'drug-severe-skin', cite: ['pi-afatinib'],
        quirk: c('Discontinue for life-threatening bullous, blistering or exfoliating lesions and if TEN or SJS is suspected; withhold for grade 3 or prolonged grade 2 reactions. Grade 3 bullous lesions in 0.2% of 4257 patients; postmarketing TEN and SJS cases. Rash, erythema, acneiform 90% (LUX-Lung 3) and 70% (LUX-Lung 8).', AFA),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-afatinib'],
        quirk: c('Withhold during evaluation of suspected ILD; discontinue if confirmed. ILD or ILD-like reactions in 1.6% of 4257 patients, 0.4% fatal (2.3% in Asian patients, 1.0% in Whites); grade 3 or higher 1.3% (LUX-Lung 3, death 1%) and 0.9% (LUX-Lung 8, death 0.8%).', AFA),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-afatinib'],
        quirk: c('Liver test abnormalities in 9.7% of 4257 patients, 0.2% fatal; grade 3 to 4 in 3.5% (LUX-Lung 3) and 0.2% (LUX-Lung 8). Label: withhold for worsening liver function; discontinue for severe hepatic impairment.', AFA),
      },
      {
        tox: 'drug-gi-perforation', cite: ['pi-afatinib'],
        quirk: c('Perforation, including fatal cases, in 0.2% of 3213 patients across 17 randomized trials. Label lists higher risk with concomitant corticosteroids, NSAIDs or anti-angiogenic agents, increasing age, history of gastrointestinal ulceration, diverticular disease or bowel metastases. Permanently discontinue if it develops.', AFA),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-afatinib'],
        quirk: c('Keratitis (eye inflammation, lacrimation, light sensitivity, blurred vision, eye pain, red eye) in 0.7% of 4257 patients, grade 3 in 0.05%; 2.2% in LUX-Lung 3. Label: withhold during evaluation; interrupt or discontinue if ulcerative keratitis is confirmed; contact lens use is a risk factor.', AFA),
      },
      {
        tox: 'drug-pancreatitis', basis: 'postmarketing', cite: ['pi-afatinib'],
        quirk: c('Postmarketing: pancreatitis listed in post-approval reports.', AFA),
      },
    ],
    alsoOnLabel: [
      c('Overdose: two healthy adolescents each ingested 360 mg (as part of mixed-drug ingestions) with nausea, vomiting, asthenia, dizziness, headache, abdominal pain and elevated amylase; both recovered', AFA),
      c('P-gp inhibitors: ritonavir, cyclosporine A, ketoconazole, itraconazole, erythromycin, verapamil, quinidine, tacrolimus, amiodarone and others raise afatinib exposure; label reduces the dose', AFA),
      c('P-gp inducers: label names rifampicin, carbamazepine, phenytoin, phenobarbital and St. John’s wort (not limited to these); they can lower afatinib exposure and the label directs a daily dose increase', AFA),
      c('Other fatal reactions in trials: acute renal failure in 1 of 392 patients (LUX-Lung 8)', AFA),
    ],
  },
  {
    id: 'dacomitinib', generic: 'dacomitinib', brands: ['Vizimpro'], brandSource: 'fda-drugsfda', classIds: ['tgt-egfr-tki'], label: 'pi-dacomitinib', tier: 'full',
    cancers: ['egfr-nsclc'],
    effects: [
      {
        tox: 'drug-lung-toxicity', cite: ['pi-dacomitinib'],
        quirk: c('Severe and fatal ILD/pneumonitis in 0.5% of 394 patients, 0.3% of cases fatal. Label: withhold and promptly investigate worsening dyspnea, cough or fever; permanently discontinue if confirmed.', DAC),
      },
      {
        tox: 'drug-diarrhea-colitis', cite: ['pi-dacomitinib'],
        quirk: c('Severe and fatal diarrhea: any grade 86% of 394 patients, grade 3 or 4 in 11%, 0.3% fatal. Label: withhold for grade 2 or greater until grade 1 or less; promptly start anti-diarrheal treatment (loperamide or diphenoxylate hydrochloride with atropine sulfate named).', DAC),
      },
      {
        tox: 'drug-severe-skin', cite: ['pi-dacomitinib'],
        quirk: c('Withhold for persistent grade 2 or any grade 3 or 4 dermatologic reaction until grade 1 or less; oral antibiotics for grade 2 or more severe. Exfoliative skin reactions in 7% of 394 patients (grade 3 or 4 in 1.8%).', DAC),
      },
    ],
    alsoOnLabel: [
      c('Keratitis: 1.8% in the list of reactions under 10% in ARCHER 1050', DAC),
      c('Rash: 78% of 394 patients (grade 3 or 4 in 21%); withhold for persistent grade 2 or any grade 3 or 4; moisturizers and sun protection from the start', DAC),
      c('Proton pump inhibitors: lower dacomitinib levels; avoid; antacids or an H2-receptor antagonist are alternatives (dacomitinib 6 hours before or 10 hours after the H2 antagonist)', DAC),
      c('CYP2D6 substrates: dacomitinib raises their concentrations; label says avoid where minimal increases may lead to serious or life-threatening toxicities', DAC),
    ],
  },
  {
    id: 'lazertinib', generic: 'lazertinib', brands: ['Lazcluze'], brandSource: 'fda-drugsfda', classIds: ['tgt-egfr-tki'], label: 'pi-lazertinib', tier: 'full',
    cancers: ['egfr-nsclc-amivantamab'],
    effects: [
      {
        tox: 'drug-thromboembolism', cite: ['pi-lazertinib'],
        timing: c('With amivantamab: VTE median onset 84 days, range 6 to 777; most events in the first four months', LAZ),
        quirk: c('Give prophylactic anticoagulation for the first four months; vitamin K antagonists are not recommended; withhold both drugs by severity. With amivantamab, serious and fatal DVT and PE in 36% (MARIPOSA; grade 3 10%, grade 4 0.5%), 1.2% on anticoagulation; two fatal (0.5%).', LAZ),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-lazertinib'],
        quirk: c('With amivantamab, ILD/pneumonitis in 3.1% in MARIPOSA (grade 3 1.0%, grade 4 0.2%), one fatal case (0.2%); 2.9% permanently discontinued both drugs. Label: immediately withhold both for suspected ILD/pneumonitis; permanently discontinue if confirmed.', LAZ),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-lazertinib'],
        quirk: c('With amivantamab, severe hepatotoxicity (increased ALT and AST): 49% of patients by adverse reaction data, grade 3 in 9.3% and grade 4 in 0.5%. Label: liver function tests (ALT, AST, total bilirubin) before starting and as clinically indicated; withhold, reduce the dose or permanently discontinue both drugs based on severity.', LAZ),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-lazertinib'],
        quirk: c('With amivantamab, ocular toxicity including keratitis in 16%, grade 3 or 4 in 0.7%. Label: promptly refer new or worsening eye symptoms to an ophthalmologist.', LAZ),
      },
    ],
    alsoOnLabel: [
      c('Severe rash: with amivantamab rash in 86% (grade 3 in 26%), median onset 14 days; withhold, reduce or permanently discontinue both drugs by severity', LAZ),
      c('Rash referral: refer severe, atypical or non-improving (2 weeks) rash promptly to a dermatologist', LAZ),
      c('CYP3A4 inducers: strong and moderate inducers lower lazertinib levels; avoid and consider an alternative with no CYP3A4 induction', LAZ),
      c('Vitamin K antagonists: label says their use is not recommended with the anticoagulant prophylaxis for venous thromboembolism', LAZ),
      c('CYP3A4 and BCRP substrates: lazertinib raises their levels; monitor for adverse reactions where small changes may cause serious reactions', LAZ),
      c('Combination use: the label indicates lazertinib only in combination with amivantamab, and its warnings describe the combination', LAZ),
      c('Other fatal reactions in trials: myocardial infarction in 3 and cerebral infarction in 2 of 421 patients given lazertinib with amivantamab', LAZ),
    ],
  },
  {
    id: 'alectinib', generic: 'alectinib hydrochloride', brands: ['Alecensa'], brandSource: 'fda-drugsfda', aliases: ['alectinib'], classIds: ['tgt-alk-ros1-tki'], label: 'pi-alectinib', tier: 'full',
    cancers: ['alk-nsclc'],
    effects: [
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-alectinib'],
        timing: c('Transaminase rises: 72% in first 3 months, label cites 72% of 136 patients; check LFTs every 2 weeks over that period then monthly', ALE),
        quirk: c('Withhold and resume at a reduced dose or permanently discontinue by severity. Severe hepatotoxicity including drug-induced liver injury: 41% pooled (grade 3 or higher 8%), 61% in ALINA. ALT or AST 3 times ULN with bilirubin 2 times ULN in under 1%.', ALE),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-alectinib'],
        timing: c('Grade 3+ ILD: median onset 2.1 months, range 0.6 to 3.6 months', ALE),
        quirk: c('ILD/pneumonitis in 1.3% of the pooled population (grade 3 0.4%); 0.9% discontinued for it. Label: promptly investigate worsening respiratory symptoms; immediately withhold if diagnosed and permanently discontinue if no other cause is identified.', ALE),
      },
      {
        tox: 'drug-nephrotoxicity', cite: ['pi-alectinib'],
        timing: c('Grade 3+ renal impairment at median 3.7 months, range 0.5 to 31.8 months', ALE),
        quirk: c('Renal impairment, including fatal cases: 12% of the pooled population, grade 3 or higher 1.7% (0.4% fatal). Label: permanently discontinue for grade 4; withhold for grade 3 until recovery to 1.5 times ULN or less, then resume at a reduced dose.', ALE),
      },
      {
        tox: 'drug-arrhythmia', cite: ['pi-alectinib'],
        quirk: c('Monitor heart rate and blood pressure; for symptomatic bradycardia withhold until asymptomatic or heart rate 60 or more and review bradycardia-causing and antihypertensive drugs; permanently discontinue for life-threatening bradycardia with no contributing drug, or recurrence. Bradycardia 11%; 20% of 521 had heart rate under 50.', ALE),
      },
      {
        tox: 'drug-pancreatitis', cite: ['pi-alectinib'],
        quirk: c('With triglycerides 500 mg/dL or higher withhold and monitor for pancreatitis, lipase and amylase; withhold until full recovery from pancreatitis. Hypertriglyceridemia 57% of 98 patients (grade 3 7%); severe cases with life-threatening pancreatitis reported postmarketing.', ALE),
      },
    ],
    alsoOnLabel: [
      c('Pulmonary embolism: serious reaction in 1.2% in patients previously treated with crizotinib, and fatal in 0.4% (section 6.1)', ALE),
      c('Acute myocardial infarction: serious in 1.6% of 128 patients in the adjuvant ALINA trial (6.1)', ALE),
      c('Myalgia and CPK elevation: myalgia 31%, CPK elevation 56% (grade 3 or higher 6%); report muscle pain, tenderness or weakness; withhold by CPK severity', ALE),
      c('Hemolytic anemia: first reported postmarketing, including cases with a negative direct antiglobulin test; 3.1% in ALINA; label says withhold and test if suspected', ALE),
      c('Overdose: no experience with overdose; no specific antidote; alectinib and its major active metabolite M4 are over 99% protein bound, so hemodialysis is likely ineffective', ALE),
      c('Bradycardia-causing drugs: for symptomatic bradycardia evaluate bradycardia-causing and antihypertensive drugs; resume at a reduced dose if one is the cause', ALE),
      c('Other fatal reactions in trials: hemorrhage in 2 and intestinal perforation in 1 of 253 patients previously treated with crizotinib', ALE),
    ],
  },
  {
    id: 'brigatinib', generic: 'brigatinib', brands: ['Alunbrig'], brandSource: 'fda-drugsfda', classIds: ['tgt-alk-ros1-tki'], label: 'pi-brigatinib', tier: 'full',
    cancers: ['alk-nsclc'],
    effects: [
      {
        tox: 'drug-lung-toxicity', cite: ['pi-brigatinib'],
        timing: c('Early events: within 9 days (median 2 days), possible ILD/pneumonitis in 6.4% of ALTA patients; ALTA 1L: within 8 days of starting in 2.9%', BRI),
        quirk: c('Monitor for respiratory symptoms, especially the first week; withhold for any new or worsening symptoms and evaluate for ILD or other causes; grade 1 or 2: reduce dose or discontinue; permanently discontinue grade 3 or 4 or recurrence. Severe, fatal: ALTA 1L 5.1% (2.9% within 8 days); ALTA 3.7% to 9.1%.', BRI),
      },
      {
        tox: 'drug-hypertension', cite: ['pi-brigatinib'],
        quirk: c('ALTA 1L: 32%, grade 3 in 13%. ALTA: 11% (90 mg group) and 21% (90 to 180 mg group); grade 3 in 5.9% overall. Label: withhold for grade 3 despite optimal antihypertensive therapy; consider permanent discontinuation for grade 4 or recurrent grade 3; use caution with antihypertensive agents that cause bradycardia.', BRI),
      },
      {
        tox: 'drug-arrhythmia', cite: ['pi-brigatinib'],
        quirk: c('Monitor heart rate and blood pressure, more often with bradycardia-causing drugs; for symptomatic bradycardia withhold and review those drugs; discontinue for life-threatening bradycardia with no contributing drug. Heart rate under 50 bpm in 8.1% (ALTA 1L; grade 3 0.7%) and 5.7% to 7.6% (ALTA).', BRI),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-brigatinib'],
        quirk: c('Withhold and obtain ophthalmologic evaluation for new or worsening visual symptoms of grade 2 or greater; permanently discontinue for grade 4. Visual disturbance in 7.4% (ALTA 1L) and 7.3% to 10% (ALTA); grade 3 macular edema and cataract in one patient each.', BRI),
      },
      {
        tox: 'drug-hyperglycemia', cite: ['pi-brigatinib'],
        quirk: c('New or worsening hyperglycemia in 56% in ALTA 1L (grade 3 in 7.5%) and 43% in ALTA (grade 3 in 3.7%); 2 of 20 patients with diabetes or glucose intolerance at baseline needed insulin. Label: if control cannot be achieved with optimal medical management, withhold until controlled and consider dose reduction or permanent discontinuation.', BRI),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-brigatinib'],
        quirk: c('Monitor AST, ALT and bilirubin, especially in the first 3 months; withhold for grade 3 or 4 elevation with bilirubin up to 2 times ULN; permanently discontinue for grade 2 to 4 with bilirubin over 2 times ULN without cholestasis or hemolysis. ALTA 1L: AST 72%, ALT 52%.', BRI),
      },
    ],
    alsoOnLabel: [
      c('Pulmonary embolism: serious reaction in 2.2% in ALTA 1L; listed among fatal reactions in ALTA (one patient) (section 6.1)', BRI),
      c('CPK elevation: 81% in ALTA 1L (grade 3 or 4 in 24%); report muscle pain or weakness; withhold for grade 3 or 4 with grade 2 or higher muscle pain or weakness', BRI),
      c('Pancreatic enzyme elevation: lipase 59% (grade 3 or 4 in 17%) and amylase 52% (grade 3 or 4 in 6.8%) in ALTA 1L; label says withhold for grade 3 or 4', BRI),
      c('Photosensitivity: 3.7% in ALTA 1L (grade 3 to 4 0.7%); label says limit sun exposure during and for at least 5 days after treatment', BRI),
      c('CYP3A inhibitors: strong or moderate inhibitors raise brigatinib levels; label says avoid coadministration and modify the dose if unavoidable', BRI),
      c('CYP3A inducers: strong or moderate inducers lower brigatinib levels and may decrease efficacy; label says avoid, and modify the dose if a moderate inducer cannot be avoided', BRI),
      c('Antihypertensive agents that cause bradycardia: label says use caution', BRI),
      c('Other fatal reactions in trials: cerebrovascular accident in 1 of 136 patients (ALTA 1L)', BRI),
    ],
  },
  {
    id: 'lorlatinib', generic: 'lorlatinib', brands: ['Lorbrena'], brandSource: 'fda-drugsfda', classIds: ['tgt-alk-ros1-tki'], label: 'pi-lorlatinib', tier: 'full',
    cancers: ['alk-nsclc'],
    effects: [
      {
        tox: 'drug-cns-toxicity', cite: ['pi-lorlatinib'],
        timing: c('Median time to first CNS effect was 1.4 months, range 1 day to 3.4 years', LOR),
        quirk: c('Withhold, then resume at the same or reduced dose or permanently discontinue by severity. Seizures, psychotic effects, cognitive, mood (including suicidal ideation), speech, mental status and sleep changes: any CNS effect 52% of 476 patients; cognitive 28%, mood 21%, seizures 1.9%.', LOR),
      },
      {
        tox: 'drug-arrhythmia', cite: ['pi-lorlatinib'],
        quirk: c('PR interval prolongation and atrioventricular block: AV block in 1.9% of 476 patients with baseline ECG, grade 3 in 0.2% with pacemaker placement. Label: ECG before starting and periodically; withhold and resume at a reduced dose, or at the same dose after pacemaker placement; permanently discontinue for recurrence in patients without a pacemaker.', LOR),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-lorlatinib'],
        quirk: c('Severe or life-threatening ILD/pneumonitis in 1.9% of 476 patients, grade 3 or 4 in 0.6%. Label: promptly investigate worsening respiratory symptoms; immediately withhold if suspected; permanently discontinue for treatment-related ILD/pneumonitis of any severity.', LOR),
      },
      {
        tox: 'drug-hypertension', cite: ['pi-lorlatinib'],
        timing: c('Median onset of hypertension was 6.4 months, range 1 day to 2.8 years', LOR),
        quirk: c('Hypertension in 13% of 476 patients, grade 3 or 4 in 6%. Label: control blood pressure before starting; monitor after 2 weeks and at least monthly; withhold and resume at a reduced dose or permanently discontinue based on severity.', LOR),
      },
      {
        tox: 'drug-hyperglycemia', cite: ['pi-lorlatinib'],
        timing: c('Median onset of hyperglycemia was 4.8 months, range 1 day to 2.9 years', LOR),
        quirk: c('Hyperglycemia in 9% of patients, grade 3 or 4 in 3.2%. Label: assess fasting glucose before starting and periodically; withhold and resume at a reduced dose or permanently discontinue based on severity.', LOR),
      },
    ],
    alsoOnLabel: [
      c('Strong CYP3A inducers: contraindicated (serious hepatotoxicity: grade 3 or 4 ALT/AST in 83% of healthy subjects given rifampin); stop the inducer 3 half-lives before lorlatinib', LOR),
      c('Hyperlipidemia: grade 3 or 4 cholesterol 18% and triglycerides 19% of 476 patients (median onset 15 days); monitor lipids at baseline, 1 and 2 months, then periodically', LOR),
      c('Moderate CYP3A inducers: label says avoid concomitant use; if unavoidable, increase the lorlatinib dose', LOR),
      c('Strong CYP3A inhibitors: label says avoid concomitant use; if unavoidable, reduce the lorlatinib dose', LOR),
      c('Fluconazole: label says avoid concomitant use; if unavoidable, reduce the lorlatinib dose', LOR),
      c('CYP3A and P-gp substrates: lorlatinib is a moderate inducer of both and lowers their levels; avoid where small changes may cause therapeutic failure', LOR),
      c('Other fatal reactions in trials: myocardial infarction 2, peripheral artery occlusion 1 and embolism 1 of 295; pulmonary embolism 1 and cardiac failure 1 of 149 (CROWN)', LOR),
    ],
  },
  {
    id: 'crizotinib', generic: 'crizotinib', brands: ['Xalkori'], brandSource: 'fda-drugsfda', classIds: ['tgt-alk-ros1-tki'], label: 'pi-crizotinib', tier: 'full',
    cancers: ['alk-ros1-nsclc', 'alk-alcl', 'alk-imt'],
    effects: [
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-crizotinib'],
        timing: c('Transaminases generally rose in first 2 months, monitor every 2 weeks over that period then monthly', CRI),
        quirk: c('Monitor liver tests every 2 weeks for 2 months, then monthly; withhold, reduce or permanently discontinue as recommended. Fatal drug-induced hepatotoxicity 0.1% of 1719 NSCLC patients; ALT over 5 times ULN 11%, AST 6%; ALT or AST 3 times with bilirubin 2 times ULN under 1%.', CRI),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-crizotinib'],
        timing: c('ILD generally occurred within 3 months, counted from starting crizotinib', CRI),
        quirk: c('Severe, life-threatening or fatal ILD/pneumonitis: 2.9% of 1719 NSCLC patients, grade 3 or 4 in 1%, fatal in 0.5%. Label: monitor for pulmonary symptoms, exclude other causes, and permanently discontinue for drug-related ILD/pneumonitis.', CRI),
      },
      {
        tox: 'drug-qt-prolongation', cite: ['pi-crizotinib'],
        quirk: c('Avoid in congenital long QT syndrome; monitor ECGs and electrolytes with heart failure, bradyarrhythmias, electrolyte abnormalities or QT-prolonging drugs; withhold, reduce or discontinue as recommended. QTcF 500 ms or more in 2.1% of 1616 NSCLC patients; rise 60 ms or more in 5%.', CRI),
      },
      {
        tox: 'drug-arrhythmia', cite: ['pi-crizotinib'],
        quirk: c('Avoid other bradycardia-causing drugs (beta-blockers, non-dihydropyridine calcium channel blockers, clonidine, digoxin) where possible; monitor heart rate and blood pressure; withhold, reduce or discontinue as recommended. Bradycardia of any kind 13% of 1719 NSCLC patients; grade 3 syncope 2.4%.', CRI),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-crizotinib'],
        timing: c('Vision disorders generally began in week 1', CRI),
        quirk: c('Assess visual symptoms monthly; permanently discontinue for grade 3 or 4 ocular disorders or severe visual loss (under 20/200) unless another cause is found. Grade 4 visual field defect with visual loss in 0.2% of 1719 NSCLC patients; vision disorders of any kind 63% (95% grade 1).', CRI),
      },
      {
        tox: 'drug-diarrhea-colitis', cite: ['pi-crizotinib'],
        quirk: c('Give antiemetics and antidiarrheals; withhold for grade 3 nausea lasting 3 days or grade 3 or 4 diarrhea or vomiting despite maximum therapy. Pediatric and young adult ALCL or pediatric IMT: gastrointestinal toxicity 100% in ALCL (grade 3 27%); in IMT vomiting 93%, nausea 86%, diarrhea 64%.', CRI),
      },
    ],
    alsoOnLabel: [
      c('Pulmonary embolism: serious reaction in 2.9% in Study 1 and 3.5% in Study 2, and listed among the fatal reactions in Study 2 (section 6.1)', CRI),
      c('Acute kidney injury: acute renal injury in 8% of 26 pediatric and young adult patients with ALCL (6.1)', CRI),
      c('Cytopenias in ALCL: grade 4 neutropenia 62%, lymphopenia 35% and thrombocytopenia 19% in the pediatric and young adult ALCL study; febrile neutropenia 3.8%', CRI),
      c('Postmarketing: increased blood creatine phosphokinase', CRI),
      c('QT-prolonging drugs: label says avoid concomitant use', CRI),
      c('Bradycardia-causing drugs: label says avoid concomitant use (beta-blockers, non-dihydropyridine calcium channel blockers, clonidine and digoxin named)', CRI),
      c('Strong CYP3A inhibitors: raise crizotinib levels; label says avoid, reduce the dosage if unavoidable, avoid grapefruit or grapefruit juice, and use caution with moderate CYP3A inhibitors', CRI),
      c('Strong CYP3A inducers: lower crizotinib levels and may decrease efficacy; label says avoid', CRI),
      c('CYP3A substrates: crizotinib raises their levels; avoid where small changes may cause serious reactions, else decrease the substrate dosage', CRI),
      c('Other fatal reactions in trials: diabetic ketoacidosis in 1 patient (PROFILE 1014)', CRI),
    ],
  },
  {
    id: 'ceritinib', generic: 'ceritinib', brands: ['Zykadia'], brandSource: 'fda-drugsfda', classIds: ['tgt-alk-ros1-tki'], label: 'pi-ceritinib', tier: 'full',
    cancers: ['alk-nsclc'],
    effects: [
      { tox: 'drug-fluid-retention', cite: ['pi-ceritinib'],
        quirk: c('Label: in ASCEND-4 (189 patients on ZYKADIA) serious pleural effusion in 4% and serious pericardial effusion in 2%, and pericarditis (pericardial effusion and pericarditis) in 4.2% of patients, grade 3 or 4 in 1.6% (Table 3); in ASCEND-1 (255 patients) one patient died of cardiac tamponade.', CER) },
      {
        tox: 'drug-diarrhea-colitis', cite: ['pi-ceritinib'],
        quirk: c('Manage with antidiarrheals, antiemetics or fluids; withhold if severe or intolerable and unresponsive, resume at a reduced dose. At 750 mg fasted, diarrhea, nausea, vomiting or abdominal pain in 95% of 925 patients (grade 3 or 4 in 14%); 79% of 108 at 450 mg with food.', CER),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-ceritinib'],
        quirk: c('Monitor liver tests monthly; withhold and resume at a reduced dose, or permanently discontinue, by severity. ALT over 5 times ULN in 28% and AST in 16% of 925 patients; ALT over 3 times with bilirubin over 2 times ULN in 0.3%.', CER),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-ceritinib'],
        quirk: c('Severe, life-threatening or fatal ILD/pneumonitis: 2.4% of 925 patients, grade 3 or 4 in 1.3%, fatal in 0.2%. Label: monitor for pulmonary symptoms; exclude other causes; permanently discontinue for treatment-related ILD/pneumonitis.', CER),
      },
      {
        tox: 'drug-qt-prolongation', cite: ['pi-ceritinib'],
        quirk: c('Avoid in congenital long QT syndrome when possible; periodic ECG and electrolytes with heart failure, bradyarrhythmias, electrolyte abnormalities or QTc-prolonging drugs. Concentration-dependent; torsades de pointes or sudden death possible; rise over 60 msec in 6% of 919; QTc over 500 msec about 1.3% at 750 mg fasted.', CER),
      },
      {
        tox: 'drug-hyperglycemia', cite: ['pi-ceritinib'],
        quirk: c('Grade 3 or 4 hyperglycemia in 13% of 925 patients. Label: monitor fasting glucose before starting and periodically; withhold with resumption at a reduced dose, or permanently discontinue, based on severity.', CER),
      },
      {
        tox: 'drug-arrhythmia', cite: ['pi-ceritinib'],
        quirk: c('Bradycardia: heart rate under 50 bpm as a new finding in 1.1% of 925 patients; reported as an adverse reaction in 1%. Label: avoid use with other products known to cause bradycardia (beta-blockers, non-dihydropyridine calcium channel blockers, clonidine, digoxin named) to the extent possible; monitor heart rate and blood pressure.', CER),
      },
      {
        tox: 'drug-pancreatitis', cite: ['pi-ceritinib'],
        quirk: c('Pancreatitis, including one fatality, in under 1% of patients; grade 3 or 4 amylase elevation 7% and lipase 14%. Label: monitor lipase and amylase before starting and periodically; withhold with resumption at a reduced dose based on laboratory severity.', CER),
      },
    ],
    alsoOnLabel: [
      c('Convulsion: serious in 2% or more of 255 patients (ASCEND-1) (6.1)', CER),
      c('Warfarin (CYP2C9 substrate): ceritinib raised warfarin exposure; check INR more often if unavoidable; avoid CYP2C9 substrates where small changes may be toxic', CER),
      c('CYP3A substrates: ceritinib raised midazolam exposure; avoid sensitive CYP3A substrates, consider reducing the substrate dose if unavoidable', CER),
      c('QTc-prolonging products: label says avoid coadministration when possible', CER),
      c('Bradycardia-causing products: label says avoid coadministration when possible', CER),
      c('Strong CYP3A inhibitors: ketoconazole raised ceritinib exposure; label says avoid, reduce the dose if unavoidable, and do not consume grapefruit or grapefruit juice', CER),
      c('Strong CYP3A inducers: rifampin lowered ceritinib exposure and may decrease efficacy; label says avoid', CER),
      c('Other fatal reactions in trials: myocardial infarction in 1 (ASCEND-4) and gastric hemorrhage in 1 (ASCEND-1)', CER),
    ],
  },
  {
    id: 'entrectinib', generic: 'entrectinib', brands: ['Rozlytrek'], brandSource: 'fda-drugsfda', classIds: ['tgt-alk-ros1-tki', 'tgt-trk-inhibitor'], label: 'pi-entrectinib', tier: 'full',
    cancers: ['ros1-nsclc', 'ntrk-solid'],
    effects: [
      {
        tox: 'drug-cardiotoxicity', cite: ['pi-entrectinib'],
        timing: c('Among CHF cases: median onset 2 months, range 11 days to 12 months in the 12 patients with heart failure', ENT),
        quirk: c('Assess LVEF before starting; for new or worsening heart failure withhold, treat and reassess LVEF; resume at a reduced dose or permanently discontinue. Heart failure in 3.4% of 355 patients (grade 3 2.3%); myocarditis without heart failure 0.3%. Baseline cardiac function was not assessed in the trials.', ENT),
      },
      {
        tox: 'drug-qt-prolongation', cite: ['pi-entrectinib'],
        quirk: c('Assess QTc and electrolytes before starting and periodically; withhold for QRS or QTc prolongation, then resume at the same or reduced dose or discontinue. QTc rise over 60 ms in 3.1% and QTc over 500 ms in 0.6% of 355 patients; monitor long QT, bradyarrhythmias, severe heart failure.', ENT),
      },
      {
        tox: 'drug-arrhythmia', cite: ['pi-entrectinib'],
        quirk: c('Monitor patients at risk of QRS prolongation (Brugada syndrome, bradyarrhythmias, severe heart failure, QRS-prolonging drugs); withhold, then resume or permanently discontinue by severity. Brugada pattern, Brugada syndrome and ventricular tachycardia reported postmarketing.', ENT),
      },
      {
        tox: 'drug-cns-toxicity', cite: ['pi-entrectinib'],
        timing: c('77% of cognitive cases began within 3 months, 74 of the 96 patients with cognitive impairment; mood disorders median onset 1 month, range 1 day to 9 months', ENT),
        quirk: c('Advise not to drive or operate hazardous machinery with CNS reactions; withhold, then resume at the same or reduced dose or permanently discontinue by severity. Among 355 patients: cognitive impairment 27% (grade 3 4.5%), mood 10% (one suicide), dizziness 38%, sleep 14%.', ENT),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-entrectinib'],
        timing: c('Median onset of raised AST or ALT was 2 weeks, AST range 1 day to 29.5 months and ALT 1 day to 9.2 months', ENT),
        quirk: c('Increased AST 42% and ALT 36% of 355 patients; grade 3 to 4 in 2.5% (AST) and 2.8% (ALT), possibly underestimated. Label: liver tests every 2 weeks in the first month, then monthly; withhold or permanently discontinue based on severity.', ENT),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-entrectinib'],
        quirk: c('Withhold for new visual changes or changes interfering with daily activities until improved; ophthalmological evaluation as appropriate. Vision changes in 21% of 355 patients (grade 3 0.8%): blurred vision, photophobia, diplopia, cataract, vitreous floaters.', ENT),
      },
    ],
    alsoOnLabel: [
      c('Pulmonary embolism: serious reaction in 2.3% of 355 patients and grade 3 or 4 in 3.4% (section 6.1)', ENT),
      c('Pleural effusion: serious in 3.4% of 355 patients (6.1)', ENT),
      c('Hydrocephalus: serious in 5% of pediatric patients (6.1)', ENT),
      c('Skeletal fractures: 5% of adults and 25% of pediatric patients, some without trauma in children; evaluate promptly for pain, change in mobility or deformity', ENT),
      c('Hyperuricemia: 9% of 355 (grade 4 1.7%); label notes one grade 4 patient died of tumor lysis syndrome but does not link the two; check uric acid, urate-lowering drug, withhold for symptoms', ENT),
      c('Moderate and strong CYP3A inhibitors: raise entrectinib levels; label says avoid coadministration (reduce the dose if unavoidable in patients 2 years and older) and avoid grapefruit products', ENT),
      c('Moderate and strong CYP3A inducers: lower entrectinib levels and may reduce efficacy; label says avoid coadministration', ENT),
      c('QRS- or QTc-prolonging products: label says avoid coadministration', ENT),
      c('Other fatal reactions in trials: dyspnea, pneumonia, sepsis, completed suicide, large intestine perforation, tumor lysis syndrome (0.3% to 0.6% each)', ENT),
    ],
  },
  {
    id: 'repotrectinib', generic: 'repotrectinib', brands: ['Augtyro'], brandSource: 'fda-drugsfda', classIds: ['tgt-alk-ros1-tki', 'tgt-trk-inhibitor'], label: 'pi-repotrectinib', tier: 'full',
    cancers: ['ros1-nsclc', 'ntrk-solid'],
    effects: [
      {
        tox: 'drug-cns-toxicity', cite: ['pi-repotrectinib'],
        timing: c('Median onset of dizziness was 7 days, ataxia 15 days and cognitive disorders 37 days', REP),
        quirk: c('Advise not to drive or use machines with CNS reactions; withhold, then resume at the same or reduced dose or permanently discontinue by severity. In 77% of 426 patients (grade 3 or 4 4.5%): dizziness incl. vertigo 65%, ataxia 28%, cognitive impairment 25%, sleep 18%, mood 6% (grade 4 mania 0.2%).', REP),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-repotrectinib'],
        timing: c('Median onset of ILD/pneumonitis was 45 days, range 19 days to 0.9 years', REP),
        quirk: c('ILD/pneumonitis in 3.1% of 426 patients (pneumonitis 2.8%, ILD 0.2%), grade 3 in 1.2%; 1.1% permanently discontinued. Label: immediately withhold if suspected; permanently discontinue if confirmed.', REP),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-repotrectinib'],
        timing: c('Median onset of raised ALT or AST was 15 days, range 1 day to 1.9 years', REP),
        quirk: c('Increased ALT 38% and AST 41% of 426 patients; grade 3 or 4 in 3.3% (ALT) and 2.9% (AST). Label: liver tests every 2 weeks in the first month, then monthly; withhold then resume at the same or reduced dose, or permanently discontinue, based on severity.', REP),
      },
    ],
    alsoOnLabel: [
      c('Pleural effusion: serious in 2.8% of 426 patients (6.1)', REP),
      c('Myalgia with CPK elevation: myalgia 13% (grade 3 0.7%), median onset 19 days, concurrent CPK increase in 3.7%; label says monitor CPK and withhold based on severity', REP),
      c('Hyperuricemia: 5% (grade 3 or 4 0.7%); label says to monitor uric acid and start urate-lowering medication as clinically indicated', REP),
      c('Skeletal fractures: 2.3% of 426 adult patients, median time to fracture 71 days; label says to evaluate promptly for pain, change in mobility or deformity', REP),
      c('CYP3A inhibitors: strong or moderate inhibitors may raise repotrectinib exposure; label says avoid, and discontinue the inhibitor for 3 to 5 elimination half-lives before starting', REP),
      c('P-gp inhibitors: may raise repotrectinib exposure; label says avoid concomitant use', REP),
      c('CYP3A inducers: strong or moderate inducers may decrease repotrectinib levels and efficacy; label says avoid', REP),
      c('CYP3A4 substrates: repotrectinib is a CYP3A4 inducer and lowers their levels; avoid unless the substrate labeling says otherwise, else increase the substrate dose', REP),
      c('Hormonal contraceptives: repotrectinib can reduce their effectiveness; label says avoid concomitant use and use a nonhormonal method', REP),
      c('Other fatal reactions in trials: 3.5% of 426 patients, including pneumonia, cardiac arrest, sudden cardiac death, cardiac failure, respiratory failure and DIC', REP),
    ],
  },
  {
    id: 'larotrectinib', generic: 'larotrectinib', brands: ['Vitrakvi'], brandSource: 'fda-drugsfda', classIds: ['tgt-trk-inhibitor'], label: 'pi-larotrectinib', tier: 'full',
    cancers: ['ntrk-solid'],
    effects: [
      {
        tox: 'drug-cns-toxicity', cite: ['pi-larotrectinib'],
        timing: c('Median onset of cognitive effects was 6 months, range 2 days to 56 months; mood disorders median 3.3 months', LAR),
        quirk: c('Advise not to drive or operate hazardous machinery with neurologic reactions; withhold or permanently discontinue by severity, and modify the dose when resumed. CNS reactions in 40.3% of 444 patients (grade 3 to 4 3.8%): cognitive 11%, mood 14%, dizziness 22%, sleep 12%.', LAR),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-larotrectinib'],
        timing: c('Median onset of raised AST or ALT was 1.9 months, AST range 4 days to 3.8 years and ALT 1 day to 4.9 years', LAR),
        quirk: c('Liver tests before starting, every 2 weeks for 2 months, then monthly; withhold, reduce or permanently discontinue by severity. Drug-induced liver injury; AST 62% and ALT 61% of 444 patients (grade 3 to 4 7% and 8%); grade 2 or higher with bilirubin 2 times ULN reported, incl. postmarketing.', LAR),
      },
    ],
    alsoOnLabel: [
      c('Skeletal fractures: 7% of 444 patients (adults 6%, pediatric 10%); evaluate promptly for pain, change in mobility or deformity', LAR),
      c('CYP3A4 inhibitors: avoid strong inhibitors including grapefruit juice; monitor more often with moderate inhibitors', LAR),
      c('CYP3A4 inducers: strong or moderate inducers may lower larotrectinib levels and efficacy; label says avoid strong inducers including St. John’s wort', LAR),
      c('Sensitive CYP3A4 substrates: larotrectinib may raise their levels; label says avoid coadministration, or monitor for increased adverse reactions if unavoidable', LAR),
    ],
  },
  {
    id: 'capmatinib', generic: 'capmatinib', brands: ['Tabrecta'], brandSource: 'fda-drugsfda', classIds: ['tgt-met-inhibitor'], label: 'pi-capmatinib', tier: 'full',
    cancers: ['met-ex14-nsclc'],
    effects: [
      {
        tox: 'drug-lung-toxicity', cite: ['pi-capmatinib'],
        timing: c('Median onset of grade 3+ ILD was 1.8 months, range 0.2 months to 1.7 years', CAP),
        quirk: c('ILD/pneumonitis, which can be fatal: 4.8% in GEOMETRY mono-1, grade 3 in 1.9%, one death (0.3%); 2.4% discontinued. Label: monitor for new or worsening pulmonary symptoms (dyspnea, cough, fever); immediately withhold if suspected; permanently discontinue if no other cause is identified.', CAP),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-capmatinib'],
        timing: c('Median grade 3+ ALT/AST rise onset: 1.8 months, range 0.5 to 46.4 months', CAP),
        quirk: c('Increased ALT/AST in 15% in GEOMETRY mono-1, grade 3 or 4 in 7%; 0.8% discontinued. Label: liver tests before starting, every 2 weeks for the first 3 months, then monthly or as indicated; withhold, reduce the dose or permanently discontinue based on severity.', CAP),
      },
      {
        tox: 'drug-pancreatitis', cite: ['pi-capmatinib'],
        timing: c('Grade 3+ amylase/lipase rise at median 2 months, range 0.03 to 31.1 months', CAP),
        quirk: c('Increased amylase/lipase in 14% in GEOMETRY mono-1 (grade 3 in 7%, grade 4 in 1.9%); one patient (0.3%) had grade 3 pancreatitis and capmatinib was permanently discontinued. Label: monitor amylase and lipase at baseline and regularly; temporarily withhold, reduce the dose or permanently discontinue based on severity.', CAP),
      },
      {
        tox: 'chemo-hypersensitivity', cite: ['pi-capmatinib'],
        quirk: c('Serious hypersensitivity reactions occurred in clinical trials other than GEOMETRY mono-1; signs and symptoms included pyrexia, chills, pruritus, rash, decreased blood pressure, nausea and vomiting. Label: temporarily withhold or permanently discontinue based on severity.', CAP),
      },
    ],
    alsoOnLabel: [
      c('Acute kidney injury: including renal failure, in under 10% of 373 patients (GEOMETRY mono-1) (6.1)', CAP),
      c('Pleural effusion: serious in 4.3% of 373 patients (GEOMETRY mono-1) (6.1)', CAP),
      c('Strong CYP3A inhibitors: raise capmatinib exposure and may increase adverse reactions; label says to monitor closely during coadministration', CAP),
      c('Strong and moderate CYP3A inducers: lower capmatinib exposure and may decrease anti-tumor activity; label says avoid coadministration', CAP),
      c('CYP1A2, P-gp, BCRP, MATE substrates: capmatinib raises their exposure; if unavoidable and small changes may be serious, decrease the substrate dosage', CAP),
    ],
  },
  {
    id: 'tepotinib', generic: 'tepotinib hydrochloride', brands: ['Tepmetko'], brandSource: 'fda-drugsfda', aliases: ['tepotinib'], classIds: ['tgt-met-inhibitor'], label: 'pi-tepotinib', tier: 'full',
    cancers: ['met-ex14-nsclc'],
    effects: [
      {
        tox: 'drug-lung-toxicity', cite: ['pi-tepotinib'],
        quirk: c('ILD/pneumonitis, which can be fatal, in 2% of patients; one patient had a grade 3 or higher event that resulted in death; 1% discontinued. Label: monitor for new or worsening pulmonary symptoms (dyspnea, cough, fever); immediately withhold if suspected; permanently discontinue if no other cause is identified.', TEP),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-tepotinib'],
        timing: c('Median grade 3+ ALT/AST rise onset: 47 days, range 1 to 262 days', TEP),
        quirk: c('Increased ALT/AST in 18% of patients, grade 3 or 4 in 4.7%; fatal hepatic failure in one patient (0.2%); 0.8% discontinued. Label: liver tests before starting, every 2 weeks for the first 3 months, then monthly or as indicated; withhold, reduce the dose or permanently discontinue based on severity.', TEP),
      },
    ],
    alsoOnLabel: [
      c('Pulmonary embolism: serious reaction in 2.2% (section 6.1)', TEP),
      c('Pancreatic toxicity: amylase or lipase rise in 13% (grade 3 5%, grade 4 1.2%); monitor; withhold, reduce or permanently discontinue by severity', TEP),
      c('Pleural effusion and edema: serious in 6% and 5%; edema led to discontinuation in 8%; one fatal dyspnea from fluid overload (0.3%)', TEP),
      c('P-gp substrates: tepotinib raises their levels; avoid where small changes may cause serious or life-threatening toxicity, else reduce the substrate dosage', TEP),
    ],
  },
  {
    id: 'selpercatinib', generic: 'selpercatinib', brands: ['Retevmo'], brandSource: 'fda-drugsfda', classIds: ['tgt-ret-inhibitor'], label: 'pi-selpercatinib', tier: 'full',
    cancers: ['ret-nsclc', 'ret-mtc', 'ret-thyroid', 'ret-solid'],
    effects: [
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-selpercatinib'],
        timing: c('Median first onset of raised AST was 5 weeks, ALT 4.9 weeks; AST range 4.9 days to 6 years', SEL),
        quirk: c('Serious hepatic adverse reactions in 4.6% of patients; increased AST 62% (grade 3 or 4 in 11%) and increased ALT 58% (grade 3 or 4 in 13%). Label: monitor ALT and AST before starting, every 2 weeks for the first 3 months, then monthly; withhold, reduce the dose or permanently discontinue based on severity.', SEL),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-selpercatinib'],
        quirk: c('Severe, life-threatening and fatal ILD/pneumonitis: 3% of patients, 0.3% grade 3 or 4, 0.2% fatal. Label: withhold and promptly investigate acute or worsening respiratory symptoms (dyspnea, cough, fever); withhold, reduce the dose or permanently discontinue based on severity of confirmed ILD.', SEL),
      },
      {
        tox: 'drug-hypertension', cite: ['pi-selpercatinib'],
        quirk: c('Hypertension in 43% of patients, grade 3 in 20% and grade 4 in one patient (0.1%); usually managed with antihypertensive medications. Label: do not start in patients with uncontrolled hypertension; optimize blood pressure first; monitor after 1 week and at least monthly; withhold, reduce the dose or permanently discontinue based on severity.', SEL),
      },
      {
        tox: 'drug-qt-prolongation', cite: ['pi-selpercatinib'],
        quirk: c('Assess QT, electrolytes and TSH at baseline and periodically; correct hypokalemia, hypomagnesemia and hypocalcemia; monitor more with strong or moderate CYP3A inhibitors or QTc-prolonging drugs; withhold, reduce or permanently discontinue by severity. QTcF over 500 ms in 8%; rise 60 ms or more in 22%.', SEL),
      },
      {
        tox: 'drug-hemorrhage', cite: ['pi-selpercatinib'],
        quirk: c('Serious, including fatal, hemorrhagic events: grade 3 or higher in 4.3% of patients, with 4 fatal events (0.5%): cerebral hemorrhage (2), tracheostomy site hemorrhage and hemoptysis (1 each). Label: permanently discontinue for severe or life-threatening hemorrhage.', SEL),
      },
      {
        tox: 'chemo-hypersensitivity', cite: ['pi-selpercatinib'],
        timing: c('Median onset of hypersensitivity was 1.9 weeks, range 5 days to 6.5 years', SEL),
        quirk: c('Withhold and begin corticosteroids; on resolution resume at a reduced dose and step the dose back up weekly, continuing steroids until the prior dose is reached; permanently discontinue for recurrence. Hypersensitivity in 6% (grade 3 2%): fever, rash, arthralgia or myalgia with low platelets or transaminitis.', SEL),
      },
      {
        tox: 'drug-severe-skin', cite: ['pi-selpercatinib'],
        quirk: c('Stevens-Johnson syndrome observed in the postmarketing setting, listed under the hypersensitivity warning. Label: discontinue in patients with Stevens-Johnson syndrome.', SEL),
      },
      {
        tox: 'chemo-tumor-lysis', cite: ['pi-selpercatinib'],
        quirk: c('Tumor lysis syndrome in 0.9% of patients with medullary thyroid carcinoma and 0.3% with non-small cell lung cancer. At risk: rapidly growing tumors, high tumor burden, renal dysfunction or dehydration. Label: monitor closely, consider prophylaxis including hydration, and treat as clinically indicated.', SEL),
      },
    ],
    alsoOnLabel: [
      c('Chylothorax: listed in under 3% of 857 patients (LIBRETTO-001) (6.1)', SEL),
      c('Impaired wound healing: label says withhold for at least 7 days before elective surgery and do not give for at least 2 weeks after major surgery and until adequate wound healing', SEL),
      c('Hypothyroidism: 15% of patients, all grade 1 or 2', SEL),
      c('Acid-reducing agents: PPIs, H2 antagonists and antacids lower selpercatinib levels; avoid, else take with food (PPI) or change timing (H2 antagonist, antacid)', SEL),
      c('CYP3A inhibitors: strong or moderate inhibitors raise selpercatinib levels, including QTc prolongation risk; label says avoid, or reduce the dosage and monitor the QT interval with ECGs more often', SEL),
      c('CYP3A inducers: strong or moderate inducers lower selpercatinib levels and anti-tumor activity; label says avoid coadministration', SEL),
      c('QT-prolonging drugs: label says monitor the QT interval with ECGs more frequently with concomitant medications known to prolong the QT interval', SEL),
      c('CYP2C8, CYP3A, P-gp, BCRP substrates: selpercatinib raises their levels; avoid where small changes may increase adverse reactions', SEL),
      c('Other fatal reactions in trials: myocardial infarction in 2 of 158 patients with NSCLC (LIBRETTO-431)', SEL),
    ],
  },
  {
    id: 'pralsetinib', generic: 'pralsetinib', brands: ['Gavreto'], brandSource: 'fda-drugsfda', classIds: ['tgt-ret-inhibitor'], label: 'pi-pralsetinib', tier: 'full',
    cancers: ['ret-nsclc', 'ret-thyroid'],
    boxedWarning: [
      c('Serious infections: bacterial, fungal, viral and opportunistic infections can lead to hospitalization or death; withhold, reduce or permanently discontinue by severity', PRA),
    ],
    effects: [
      {
        tox: 'serious-infection', rank: 1, boxed: true, cite: ['pi-pralsetinib'],
        quirk: c('Monitor for infection and treat; withhold, reduce or permanently discontinue by severity. In AcceleRET-Lung infections in 72% on pralsetinib (grade 4 3.7%, fatal 7%) vs 52% on chemotherapy/immunotherapy; opportunistic infections 20% vs 6% (pneumocystis, fungal, legionella, CMV, herpes simplex).', PRA),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-pralsetinib'],
        quirk: c('Severe, life-threatening and fatal ILD/pneumonitis: pneumonitis in 12% of patients, 3.3% grade 3 to 4, 0.2% fatal. Label: withhold and promptly investigate acute or worsening respiratory symptoms; withhold, reduce the dose or permanently discontinue based on severity of confirmed ILD.', PRA),
      },
      {
        tox: 'drug-hypertension', cite: ['pi-pralsetinib'],
        quirk: c('Hypertension in 35% of patients, grade 3 in 18%. Label: do not start in patients with uncontrolled hypertension; monitor blood pressure after 1 week and at least monthly; withhold, reduce the dose or permanently discontinue based on severity.', PRA),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-pralsetinib'],
        timing: c('Median first onset of raised AST was 15 days, ALT 24 days; AST range 5 days to 2.5 years', PRA),
        quirk: c('Serious hepatic adverse reactions in 1.5% of patients; increased AST 49% (grade 3 or 4 in 7%) and ALT 37% (grade 3 or 4 in 4.8%). Label: monitor AST and ALT before starting, every 2 weeks for the first 3 months, then monthly; withhold, reduce the dose or permanently discontinue based on severity.', PRA),
      },
      {
        tox: 'drug-hemorrhage', cite: ['pi-pralsetinib'],
        quirk: c('Serious, including fatal, hemorrhagic events: grade 3 or higher in 4.1% of patients, including one patient with a fatal hemorrhagic event.', PRA),
      },
      {
        tox: 'chemo-tumor-lysis', cite: ['pi-pralsetinib'],
        quirk: c('Cases reported in patients with medullary thyroid carcinoma. At risk: rapidly growing tumors, high tumor burden, renal dysfunction or dehydration. Label: monitor closely, consider prophylaxis including hydration, and treat as clinically indicated.', PRA),
      },
    ],
    alsoOnLabel: [
      c('Pulmonary embolism: serious in 2% or more of 281 patients with NSCLC (ARROW) (6.1)', PRA),
      c('Seizure: serious in 2% or more of 281 patients with NSCLC (ARROW) (6.1)', PRA),
      c('Impaired wound healing: label says withhold for at least 5 days before elective surgery and do not give for at least 2 weeks after major surgery and until adequate wound healing', PRA),
      c('CYP3A and/or P-gp inhibitors: strong or moderate inhibitors raise pralsetinib exposure; label says avoid, and reduce the dose if unavoidable', PRA),
      c('CYP3A inducers: strong or moderate inducers lower pralsetinib exposure and may decrease efficacy; label says avoid, and increase the dose if unavoidable', PRA),
    ],
  },
  {
    id: 'sotorasib', generic: 'sotorasib', brands: ['Lumakras'], brandSource: 'fda-drugsfda', classIds: ['tgt-kras-g12c-inhibitor'], label: 'pi-sotorasib', tier: 'full',
    cancers: ['kras-g12c-nsclc', 'kras-g12c-crc'],
    effects: [
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-sotorasib'],
        timing: c('NSCLC: ALT/AST rise median onset 6.3 weeks, range 0.4 to 42 weeks; 10 weeks with panitumumab in colorectal cancer', SOT),
        quirk: c('Liver tests before starting, every 3 weeks for 3 months, then monthly; withhold, reduce or permanently discontinue by severity; consider systemic corticosteroids. NSCLC single agent: hepatotoxicity 27% (grade 3 or higher 16%), drug-induced liver injury 1.6%; 40% when started within 3 months of immunotherapy.', SOT),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-sotorasib'],
        timing: c('NSCLC: ILD/pneumonitis median onset 8.6 weeks, range 2.1 to 36.7 weeks on single agent', SOT),
        quirk: c('ILD/pneumonitis that can be fatal: 2.2% of NSCLC patients on single agent, 1.1% grade 3 or higher, one fatal case; 1.3% permanently discontinued. Label: monitor for new or worsening pulmonary symptoms; immediately withhold if suspected; permanently discontinue if no other cause is identified.', SOT),
      },
    ],
    alsoOnLabel: [
      c('Intestinal obstruction: serious in 4.3% of colorectal cancer patients given sotorasib with panitumumab (CodeBreaK 300) (6.1)', SOT),
      c('Acid-reducing agents: PPIs, H2 antagonists and antacids lower sotorasib levels; avoid, else give 4 hours before or 10 hours after a local antacid', SOT),
      c('Strong CYP3A4 inducers: lower sotorasib concentrations and may reduce efficacy; label says avoid coadministration', SOT),
      c('CYP3A4 substrates: sotorasib lowers their levels; avoid sensitive substrates, else increase the substrate dosage', SOT),
      c('P-gp and BCRP substrates: sotorasib raises their levels; avoid P-gp substrates where small changes may be toxic; monitor and decrease BCRP substrate dosage', SOT),
    ],
  },
  {
    id: 'adagrasib', generic: 'adagrasib', brands: ['Krazati'], brandSource: 'fda-drugsfda', classIds: ['tgt-kras-g12c-inhibitor'], label: 'pi-adagrasib', tier: 'full',
    cancers: ['kras-g12c-nsclc'],
    effects: [
      { tox: 'drug-hemorrhage', cite: ['pi-adagrasib'],
        quirk: c('Label: pulmonary hemorrhage was a serious reaction in 2.6% and fatal in 0.9% of 116 patients with KRAS G12C-mutated NSCLC (KRYSTAL-1).', ADA) },
      { tox: 'drug-nephrotoxicity', cite: ['pi-adagrasib'],
        quirk: c('Label: renal impairment (acute kidney injury and increased blood creatinine) in 36% of 116 NSCLC patients, grade 3 or 4 in 6%, and a serious reaction in 8% (KRYSTAL-1); it led to dose interruption and dose reduction in at least 2%. In the pooled safety population of 366 patients it occurred in 33%.', ADA) },
      {
        tox: 'drug-diarrhea-colitis', cite: ['pi-adagrasib'],
        quirk: c('Manage with antidiarrheals, antiemetics or fluids; withhold, reduce or permanently discontinue by severity. In 366 patients: GI bleeding 3.8%, obstruction 1.6%, colitis 0.5%, ileus 0.5%; nausea, diarrhea or vomiting 89% (grade 3 9%).', ADA),
      },
      {
        tox: 'drug-qt-prolongation', cite: ['pi-adagrasib'],
        quirk: c('Avoid other QTc-prolonging products, congenital long QT and concurrent QTc prolongation; monitor ECGs and potassium and magnesium; withhold if QTc over 500 msec or rise over 60 msec. Torsades de pointes or sudden death possible; average QTc 501 msec or more in 6% of 366; rise over 60 msec in 11%.', ADA),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-adagrasib'],
        timing: c('Median first onset of raised ALT/AST was 3 weeks, range 0.1 to 48 weeks', ADA),
        quirk: c('Hepatotoxicity that may lead to drug-induced liver injury and hepatitis: increased ALT/AST in 32% (grade 3 5%, grade 4 0.5%); overall hepatotoxicity 37% (grade 3 or 4 7%); drug-induced liver injury 0.3%. Label: liver tests before starting and monthly for 3 months; reduce the dose, withhold or permanently discontinue based on severity.', ADA),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-adagrasib'],
        timing: c('Median onset of ILD/pneumonitis was 12 weeks, range 5 to 31 weeks', ADA),
        quirk: c('ILD/pneumonitis that can be fatal: 4.1% of patients, 1.4% grade 3 or 4, one fatal case. Label: withhold if suspected; permanently discontinue if no other cause is identified.', ADA),
      },
    ],
    alsoOnLabel: [
      c('Pulmonary embolism: serious reaction in 2.6% of NSCLC patients and fatal in 0.9% (section 6.1)', ADA),
      c('QTc-prolonging products: avoid; if unavoidable monitor ECG and electrolytes and withhold for QTc over 500 msec or rise over 60 msec', ADA),
      c('Strong CYP3A4 inducers: lower adagrasib exposure and may reduce effectiveness; label says avoid', ADA),
      c('Strong CYP3A4 inhibitors: label says avoid until adagrasib has reached steady state (after approximately 8 days); before that they raise adagrasib concentrations and the risk of adverse reactions', ADA),
      c('CYP3A substrates: adagrasib raises their exposure; avoid sensitive substrates unless their labeling says otherwise', ADA),
      c('CYP2C9, CYP2D6, P-gp substrates: adagrasib raises their exposure; avoid where small changes may cause serious reactions', ADA),
      c('Other fatal reactions in trials: 11% in NSCLC, due to pneumonia, respiratory failure, sudden death, cardiac failure, stroke, pulmonary embolism, pulmonary hemorrhage', ADA),
    ],
  },
  {
    id: 'dabrafenib', generic: 'dabrafenib', brands: ['Tafinlar'], brandSource: 'fda-drugsfda', classIds: ['tgt-braf-inhibitor'], label: 'pi-dabrafenib', tier: 'full',
    cancers: ['braf-melanoma', 'braf-melanoma-adjuvant', 'braf-nsclc', 'braf-atc', 'braf-solid', 'braf-lgg'],
    effects: [
      {
        tox: 'drug-hemorrhage', cite: ['pi-dabrafenib'],
        quirk: c('With trametinib: withhold for grade 3; permanently discontinue for grade 4 or grade 3 not improving. Major hemorrhage; fatal cases. Adults: any 17%, GI 3%, intracranial 0.6%, fatal 0.5% (cerebral, brainstem); pediatric 25%, serious 3.6%.', DAB),
      },
      {
        tox: 'drug-cardiotoxicity', cite: ['pi-dabrafenib'],
        quirk: c('With trametinib: assess LVEF before starting, at 1 month, then every 2 to 3 months; withhold for symptomatic cardiomyopathy or LVEF fall over 20% below the lower limit of normal. Cardiomyopathy in 6% of adults and 9% of pediatric patients; resolved in 45 of 50 adults.', DAB),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-dabrafenib'],
        quirk: c('Monitor for vision change, photophobia, eye pain; iritis: ocular therapy, no dose change; withhold for severe uveitis or uveitis not responding to ocular therapy; permanently discontinue for grade 2 or greater uveitis over 6 weeks. Uveitis 1% monotherapy, 2% with trametinib; panuveitis postmarketing.', DAB),
      },
      {
        tox: 'drug-severe-skin', cite: ['pi-dabrafenib'],
        quirk: c('Severe cutaneous adverse reactions including Stevens-Johnson syndrome and DRESS, which can be life-threatening or fatal, reported (also listed postmarketing) with dabrafenib plus trametinib. Label: permanently discontinue for these reactions; for other skin toxicity withhold if intolerable or severe and discontinue if not improved within 3 weeks.', DAB),
      },
      {
        tox: 'hlh-mas', cite: ['pi-dabrafenib'],
        quirk: c('Hemophagocytic lymphohistiocytosis observed in the postmarketing setting with dabrafenib plus trametinib. Label: interrupt treatment if suspected; discontinue and manage HLH if confirmed.', DAB),
      },
      {
        tox: 'drug-hyperglycemia', cite: ['pi-dabrafenib'],
        quirk: c('Of patients with a history of diabetes, 14% (monotherapy) and 15% (with trametinib) needed more intensive hypoglycemic therapy; grade 3 and 4 hyperglycemia in 3% (monotherapy) and 2% (with trametinib). Label: monitor serum glucose at start and as appropriate in patients with preexisting diabetes or hyperglycemia.', DAB),
      },
    ],
    alsoOnLabel: [
      c('Serious febrile reactions: fever 30% on monotherapy (6% serious or complicated) and 58% with trametinib (5% serious or complicated)', DAB),
      c('Febrile complications: with trametinib hypotension 4%, dehydration 3%, syncope 2%, renal failure 1%; monitor creatinine after severe pyrexia', DAB),
      c('Pyrexia withholding: withhold at 100.4 F or higher (both drugs in combination); evaluate for infection; restart once recovered for 24 hours', DAB),
      c('Pyrexia corticosteroids: for later pyrexia not settling in 3 days or with complications and no active infection, corticosteroids for at least 5 days', DAB),
      c('Hemolytic anemia in G6PD deficiency: dabrafenib contains a sulfonamide moiety; label says to monitor patients with G6PD deficiency for signs of hemolytic anemia', DAB),
      c('Other listed reactions: pancreatitis, colitis, GI perforation, AV and bundle branch block (under 10%), rhabdomyolysis (under 1%); complete AV block postmarketing', DAB),
      c('Overdose: no information on overdosage; dabrafenib is highly protein bound, so hemodialysis is likely ineffective', DAB),
      c('Dexamethasone and hormonal contraceptives: dabrafenib can lower their levels with loss of efficacy; substitute or monitor for loss of efficacy', DAB),
      c('Warfarin and midazolam: dabrafenib decreased exposures of midazolam, S-warfarin and R-warfarin; label says to monitor INR more frequently when starting or stopping dabrafenib in patients on warfarin', DAB),
      c('Strong CYP3A4 or CYP2C8 inhibitors: may raise dabrafenib concentrations; label recommends substitution, and close monitoring for adverse reactions if unavoidable', DAB),
    ],
  },
  {
    id: 'trametinib', generic: 'trametinib dimethyl sulfoxide', brands: ['Mekinist'], brandSource: 'fda-drugsfda', aliases: ['trametinib'], classIds: ['tgt-mek-inhibitor'], label: 'pi-trametinib', tier: 'full',
    cancers: ['braf-melanoma', 'braf-melanoma-adjuvant', 'braf-nsclc', 'braf-atc', 'braf-solid', 'braf-lgg'],
    effects: [
      {
        tox: 'drug-hemorrhage', cite: ['pi-trametinib'],
        quirk: c('With dabrafenib: withhold for grade 3; permanently discontinue for grade 4 or grade 3 not improving. Major hemorrhage; fatal cases. Adults: any 17%, GI 3%, intracranial 0.6%, fatal 0.5% (cerebral, brainstem); pediatric 25%, serious 3.6%.', TRA),
      },
      {
        tox: 'drug-thromboembolism', cite: ['pi-trametinib'],
        quirk: c('With dabrafenib, deep vein thrombosis and pulmonary embolism in 2% of adults. Label: advise patients to seek care at once for shortness of breath, chest pain, or arm or leg swelling; permanently discontinue for life-threatening pulmonary embolism; withhold for uncomplicated DVT and PE for up to 3 weeks.', TRA),
      },
      {
        tox: 'drug-cardiotoxicity', cite: ['pi-trametinib'],
        quirk: c('Assess LVEF before starting, at 1 month, then every 2 to 3 months; withhold up to 4 weeks for asymptomatic LVEF fall; permanently discontinue for symptomatic cardiomyopathy, fall over 20% below the lower limit of normal, or no recovery in 4 weeks. With dabrafenib 6% of adults, 9% of pediatric; includes cardiac failure.', TRA),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-trametinib'],
        quirk: c('Urgent (within 24 hours) eye evaluation for vision loss or visual disturbance; permanently discontinue for retinal vein occlusion; withhold for retinal pigment epithelial detachment. Retinal vein occlusion 0.6% on monotherapy (none with dabrafenib); detachment 5% of 131 adults on the combination.', TRA),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-trametinib'],
        quirk: c('ILD or pneumonitis in 2% on monotherapy and 1% with dabrafenib. Label: withhold for new or progressive pulmonary symptoms and findings (cough, dyspnea, hypoxia, pleural effusion, infiltrates) pending investigation; permanently discontinue for treatment-related ILD or pneumonitis.', TRA),
      },
      {
        tox: 'drug-gi-perforation', cite: ['pi-trametinib'],
        quirk: c('Colitis and gastrointestinal perforation, including fatal outcomes, reported: each under 1% of adults on monotherapy or with dabrafenib. Label: monitor closely.', TRA),
      },
      {
        tox: 'drug-severe-skin', cite: ['pi-trametinib'],
        quirk: c('Severe cutaneous adverse reactions including Stevens-Johnson syndrome and DRESS, which can be life-threatening or fatal, reported (also listed postmarketing) with trametinib plus dabrafenib. Label: permanently discontinue for these reactions.', TRA),
      },
      {
        tox: 'hlh-mas', cite: ['pi-trametinib'],
        quirk: c('Hemophagocytic lymphohistiocytosis observed in the postmarketing setting with trametinib plus dabrafenib. Label: interrupt treatment if suspected; discontinue and manage HLH if confirmed.', TRA),
      },
      {
        tox: 'drug-hyperglycemia', cite: ['pi-trametinib'],
        quirk: c('With dabrafenib, 15% of patients with a history of diabetes needed more intensive hypoglycemic therapy; grade 3 and 4 hyperglycemia in 2%.', TRA),
      },
    ],
    alsoOnLabel: [
      c('Serious febrile reactions: with dabrafenib fever 58% of adults, serious or complicated 5% (hypotension 4%, dehydration 3%, renal failure 1%)', TRA),
      c('Pyrexia management: withhold at 100.4 F or higher, evaluate for infection, monitor creatinine; corticosteroids for recurrent or complicated pyrexia without infection', TRA),
      c('Other listed reactions in trials: bradycardia, atrioventricular block and bundle branch block (under 10%), rhabdomyolysis; postmarketing complete atrioventricular block, also observed on monotherapy', TRA),
      c('Overdose: highest doses tested 4 mg daily and 10 mg on 2 days then 3 mg; 2 of 7 had retinal pigment epithelial detachment; hemodialysis likely ineffective', TRA),
      c('Combination use: the label says to review the dabrafenib prescribing information for risks and interactions that apply to combination use', TRA),
    ],
  },
  {
    id: 'vemurafenib', generic: 'vemurafenib', brands: ['Zelboraf'], brandSource: 'fda-drugsfda', classIds: ['tgt-braf-inhibitor'], label: 'pi-vemurafenib', tier: 'full',
    cancers: ['braf-melanoma-v600e', 'erdheim-chester-braf'],
    effects: [
      {
        tox: 'chemo-hypersensitivity', cite: ['pi-vemurafenib'],
        quirk: c('Anaphylaxis and other serious hypersensitivity reactions can occur during treatment and upon re-initiation; severe reactions included generalized rash and erythema, hypotension and DRESS syndrome. Label: permanently discontinue for a severe hypersensitivity reaction.', VEM),
      },
      {
        tox: 'drug-severe-skin', cite: ['pi-vemurafenib'],
        quirk: c('Severe dermatologic reactions, including Stevens-Johnson syndrome and toxic epidermal necrolysis, can occur; DRESS syndrome is also listed from postmarketing reports. Label: permanently discontinue for a severe dermatologic reaction.', VEM),
      },
      {
        tox: 'drug-qt-prolongation', cite: ['pi-vemurafenib'],
        quirk: c('Do not start with uncorrectable electrolyte abnormalities, QTc over 500 ms, long QT syndrome or QT-prolonging drugs; ECG and electrolytes at 15 days, monthly for 3 months, then every 3 months; withhold for QTc over 500 ms; permanently discontinue if it stays over 500 ms and rises over 60 ms. Concentration-dependent; torsades de pointes possible.', VEM),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-vemurafenib'],
        quirk: c('Liver injury leading to functional hepatic impairment, including coagulopathy or other organ dysfunction, can occur. Label: monitor transaminases, alkaline phosphatase and bilirubin before starting and monthly; manage abnormalities with dose reduction, interruption or discontinuation.', VEM),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-vemurafenib'],
        quirk: c('Uveitis, blurry vision and photophobia can occur; uveitis including iritis in 2.1% (7/336) of vemurafenib patients in Trial 1 versus none on dacarbazine; retinal vein occlusion is listed under 10%. Label: steroid and mydriatic ophthalmic drops may be required; monitor for signs and symptoms of uveitis.', VEM),
      },
      {
        tox: 'drug-nephrotoxicity', cite: ['pi-vemurafenib'],
        quirk: c('Renal failure, including acute interstitial nephritis and acute tubular necrosis, can occur; grade 3 to 4 creatinine elevations in 1.2% in Trial 1 (grade 1 to 2 in 26%); 9.1% (2/22) grade 3 in the Erdheim-Chester disease trial. Label: measure serum creatinine before starting and periodically.', VEM),
      },
      {
        tox: 'drug-pancreatitis', basis: 'postmarketing', cite: ['pi-vemurafenib'],
        quirk: c('Postmarketing: pancreatitis listed in post-approval reports.', VEM),
      },
    ],
    alsoOnLabel: [
      c('Atrial fibrillation: listed in under 10% of melanoma patients (6.1)', VEM),
      c('Facial nerve palsy: VIIth nerve paralysis listed in under 10% of melanoma patients (6.1)', VEM),
      c('Radiation recall: sensitization and recall, sometimes severe or fatal with visceral involvement, with radiation before, during or after; monitor closely', VEM),
      c('Postmarketing: progression of pre-existing chronic myelomonocytic leukemia with NRAS mutation, and sarcoidosis', VEM),
      c('Neutropenia: listed in postmarketing reports', VEM),
      c('Overdose: no information on overdosage', VEM),
      c('Strong CYP3A4 inducers: phenytoin, carbamazepine, rifampin lower vemurafenib levels; avoid and replace; increase the dose if unavoidable', VEM),
      c('Strong CYP3A4 inhibitors: raise vemurafenib levels and may increase toxicity; label says avoid, and consider dose reduction if unavoidable', VEM),
      c('QT-prolonging medicinal products: label says do not start vemurafenib in patients taking them', VEM),
      c('Digoxin and other P-gp substrates: vemurafenib raised digoxin exposure 1.8-fold; label says avoid P-gp substrates with narrow therapeutic indices, or consider dose reduction if unavoidable', VEM),
      c('CYP1A2 substrates: vemurafenib raised tizanidine exposure 4.7-fold; avoid narrow-window CYP1A2 drugs, else monitor closely', VEM),
      c('Ipilimumab: concurrent use not established; grade 3 transaminase and bilirubin rises in most patients in a dose-finding trial', VEM),
    ],
  },
  {
    id: 'cobimetinib', generic: 'cobimetinib', brands: ['Cotellic'], brandSource: 'fda-drugsfda', classIds: ['tgt-mek-inhibitor'], label: 'pi-cobimetinib', tier: 'full',
    cancers: ['braf-melanoma', 'histiocytic-neoplasms'],
    effects: [
      {
        tox: 'drug-hemorrhage', cite: ['pi-cobimetinib'],
        quirk: c('Withhold for grade 3 (resume at a lower dose if improved within 4 weeks); discontinue for grade 4 or grade 3 not improving. Major hemorrhage; with vemurafenib vs vemurafenib alone: all grades 13% vs 7%; grade 3 to 4 1.2% vs 0.8%; cerebral 0.8% vs none; GI 3.6% vs 1.2%.', COB),
      },
      {
        tox: 'drug-cardiotoxicity', cite: ['pi-cobimetinib'],
        timing: c('With vemurafenib: LVEF fall median 4 months, range 23 days to 13 months in Trial 1; median 29 days in the histiocytic neoplasm study', COB),
        quirk: c('Evaluate LVEF before starting, at 1 month, then every 3 months; manage by interruption, reduction or discontinuation. Grade 2 or 3 LVEF decrease in 26% with vemurafenib vs 19% on vemurafenib alone; 14% of those permanently discontinued. Safety not established with baseline LVEF under 50%.', COB),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-cobimetinib'],
        timing: c('Retinopathy onset 2 days to 9 months on combo, with vemurafenib; examine eyes at regular intervals and with any new visual disturbance', COB),
        quirk: c('Serous retinopathy (fluid under retinal layers) in 26% with vemurafenib, mostly chorioretinopathy (13%) or retinal detachment (12%); one patient in each arm developed retinal vein occlusion. Label: interrupt for serous retinopathy until visual symptoms improve; manage by interruption, dose reduction or discontinuation.', COB),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-cobimetinib'],
        quirk: c('Monitor liver tests before starting and monthly; manage grade 3 and 4 abnormalities with interruption, reduction or discontinuation. With vemurafenib vs vemurafenib alone, grade 3 or 4: ALT 11% vs 5%, AST 8% vs 2.1%; ALT over 3 times with bilirubin over 2 times ULN in one patient.', COB),
      },
      {
        tox: 'rhabdomyolysis', cite: ['pi-cobimetinib'],
        timing: c('With vemurafenib: grade 3-4 CPK median 16 days, range 12 days to 11 months', COB),
        quirk: c('Baseline and periodic CPK and creatinine; evaluate raised CPK for rhabdomyolysis or other causes; interruption or discontinuation may be needed. Grade 3 or 4 CPK rise 14% with vemurafenib vs 0.5% alone; CPK over 10 times baseline with creatinine 1.5 times baseline 3.6% vs 0.4%.', COB),
      },
    ],
    alsoOnLabel: [
      c('Respiratory failure: 8% of 26 patients with histiocytic neoplasms (Trial 2) (6.1)', COB),
      c('Severe rash: grade 3 to 4 in 16% with vemurafenib, hospitalization 3.2%; median onset 11 days; interrupt, reduce or discontinue', COB),
      c('Pneumonitis: listed among reactions under 10% in Trial 1', COB),
      c('Overdose: no information on overdosage', COB),
      c('Strong CYP3A inhibitors: itraconazole raised cobimetinib exposure 6.7-fold; avoid strong and moderate inhibitors', COB),
      c('Moderate CYP3A inhibitors: if short-term (14 days or less) use such as erythromycin or ciprofloxacin is unavoidable, reduce the cobimetinib dose', COB),
      c('CYP3A inducers: strong or moderate inducers (carbamazepine, efavirenz, phenytoin, rifampin, St. John\u2019s Wort) may cut exposure over 80%; avoid', COB),
      c('Combination use: label says to review the vemurafenib prescribing information for its serious risks', COB),
    ],
  },
  {
    id: 'encorafenib', generic: 'encorafenib', brands: ['Braftovi'], brandSource: 'fda-drugsfda', classIds: ['tgt-braf-inhibitor'], label: 'pi-encorafenib', tier: 'full',
    cancers: ['braf-melanoma', 'mcrc-braf-v600e', 'braf-nsclc'],
    effects: [
      {
        tox: 'drug-cardiotoxicity', cite: ['pi-encorafenib'],
        timing: c('Combo: median LV dysfunction onset 3.6 months, range 0 to 21 months, with binimetinib in COLUMBUS', ENC),
        quirk: c('Assess ejection fraction before starting, at 1 month, then every 2 to 3 months; withhold, reduce or permanently discontinue by severity. With binimetinib: 7% in COLUMBUS (grade 3 1.6%), 11% in PHAROS; resolved in 87% and 82%. Safety not established with baseline ejection fraction under 50%.', ENC),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-encorafenib'],
        quirk: c('With binimetinib, grade 3 or 4 increases in COLUMBUS: ALT 6%, AST 2.6%, alkaline phosphatase 0.5%; in PHAROS: AST 10%, ALT 9%, alkaline phosphatase 3.2%. Label: liver tests before starting and monthly; withhold, reduce the dose or permanently discontinue based on severity.', ENC),
      },
      {
        tox: 'drug-hemorrhage', cite: ['pi-encorafenib'],
        quirk: c('Withhold, reduce or permanently discontinue by severity. With binimetinib: 19% (grade 3 or higher 3.2%) in COLUMBUS, fatal intracranial hemorrhage with brain metastases 1.6%; PHAROS 12% (fatal 1%); with cetuximab fatal GI hemorrhage 0.5%; BREAKWATER 34%.', ENC),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-encorafenib'],
        quirk: c('Assess visual symptoms at each visit; ophthalmologic evaluation at regular intervals and for new or worsening disturbances; withhold, reduce or permanently discontinue by severity. Uveitis with binimetinib 4% (COLUMBUS) and 1% (PHAROS).', ENC),
      },
      {
        tox: 'drug-qt-prolongation', cite: ['pi-encorafenib'],
        quirk: c('Monitor long QT, bradyarrhythmias, severe heart failure or QT-prolonging drugs; correct hypokalemia and hypomagnesemia; withhold, reduce or permanently discontinue for QTc over 500 ms. Dose-dependent; QTcF over 500 ms in 0.5% to 4% across trials.', ENC),
      },
    ],
    alsoOnLabel: [
      c('Facial paresis: under 10% of 192 patients given encorafenib with binimetinib (COLUMBUS) (6.1)', ENC),
      c('Pancreatitis: under 10% of 192 patients given encorafenib with binimetinib (COLUMBUS) (6.1)', ENC),
      c('Single-agent use: grade 3 or 4 skin reactions 21% vs 2% with binimetinib; reduce encorafenib dose if binimetinib stops', ENC),
      c('Overdose: encorafenib is 86% bound to plasma proteins, so hemodialysis is likely ineffective', ENC),
      c('QT/QTc-prolonging drugs: label says avoid coadministration', ENC),
      c('Strong or moderate CYP3A4 inhibitors: including grapefruit juice, they raise encorafenib levels and adverse reactions; label says avoid, and reduce the dose if unavoidable', ENC),
      c('Strong CYP3A4 inducers: may decrease encorafenib levels and efficacy; label says avoid', ENC),
      c('CYP3A4 substrates and contraceptives: encorafenib is a strong CYP3A4 inducer and can lower their levels; avoid where reduced efficacy matters', ENC),
      c('OATP1B1, OATP1B3 and BCRP substrates: encorafenib can raise their concentrations; label says monitor closely and consider adjusting the substrate dose', ENC),
      c('Other fatal reactions in trials: myocardial infarction 1 of 98 (PHAROS); with cetuximab and mFOLFOX6 obstruction 0.9%, perforation 0.4%; with FOLFIRI perforation 1.4%', ENC),
    ],
  },
  {
    id: 'binimetinib', generic: 'binimetinib', brands: ['Mektovi'], brandSource: 'fda-drugsfda', classIds: ['tgt-mek-inhibitor'], label: 'pi-binimetinib', tier: 'full',
    cancers: ['braf-melanoma', 'braf-nsclc'],
    effects: [
      {
        tox: 'drug-cardiotoxicity', cite: ['pi-binimetinib'],
        timing: c('Combo: median LV dysfunction onset 3.6 months, range 0 to 21 months, with encorafenib in COLUMBUS', BIN),
        quirk: c('Assess ejection fraction before starting, at 1 month, then every 2 to 3 months; withhold, reduce or permanently discontinue by severity. With encorafenib: 7% in COLUMBUS (grade 3 1.6%), 11% in PHAROS; resolved in 87% and 82%. Safety not established with baseline ejection fraction under 50%.', BIN),
      },
      {
        tox: 'drug-thromboembolism', cite: ['pi-binimetinib'],
        quirk: c('Venous thromboembolism with encorafenib: 6% in COLUMBUS, including pulmonary embolism in 3.1%; 7% in PHAROS, including pulmonary embolism in 1%. Label: withhold, reduce the dose or permanently discontinue based on severity.', BIN),
      },
      {
        tox: 'drug-ocular-toxicity', cite: ['pi-binimetinib'],
        timing: c('Combo: retinopathy median onset 1.2 months, range 0 to 17.5 months, with encorafenib in COLUMBUS', BIN),
        quirk: c('Eye evaluation within 24 hours for acute vision loss; permanently discontinue for retinal vein occlusion; assess visual symptoms each visit. With encorafenib: serous retinopathy 20% (retinal detachment 8%) in COLUMBUS; uveitis 4%; retinal vein occlusion 1 of 690 patients.', BIN),
      },
      {
        tox: 'drug-lung-toxicity', cite: ['pi-binimetinib'],
        quirk: c('ILD, including pneumonitis, with encorafenib: 2 of 690 melanoma patients (0.3%); one patient in PHAROS developed pneumonitis. Label: assess new or progressive unexplained pulmonary symptoms or findings for possible ILD; withhold, reduce the dose or permanently discontinue based on severity.', BIN),
      },
      {
        tox: 'drug-hepatotoxicity', cite: ['pi-binimetinib'],
        quirk: c('With encorafenib, grade 3 or 4 increases in COLUMBUS: ALT 6%, AST 2.6%, alkaline phosphatase 0.5%, no grade 3 or 4 bilirubin; in PHAROS: AST 10%, ALT 9%, alkaline phosphatase 3.2%. Label: liver tests before starting and monthly; withhold, reduce the dose or permanently discontinue based on severity.', BIN),
      },
      {
        tox: 'rhabdomyolysis', cite: ['pi-binimetinib'],
        quirk: c('Monitor CPK and creatinine before starting and periodically; withhold, reduce or permanently discontinue by severity. With encorafenib: CPK rise 58% (COLUMBUS) and 41% (PHAROS); rhabdomyolysis in 1 of 690 melanoma patients (0.1%).', BIN),
      },
      {
        tox: 'drug-hemorrhage', cite: ['pi-binimetinib'],
        quirk: c('With encorafenib: hemorrhage 19% in COLUMBUS (grade 3 or greater 3.2%, mostly gastrointestinal; fatal intracranial hemorrhage with new or progressive brain metastases 1.6%); PHAROS 12% with fatal intracranial hemorrhage 1% and grade 3 or 4 4.1%. Label: withhold, reduce the dose or permanently discontinue based on severity.', BIN),
      },
    ],
    alsoOnLabel: [
      c('Colitis: under 10% of 192 patients given binimetinib with encorafenib (COLUMBUS) (6.1)', BIN),
      c('Pancreatitis: under 10% of 98 patients with NSCLC given binimetinib with encorafenib (PHAROS) (6.1)', BIN),
      c('Facial paresis: under 10% of 98 patients with NSCLC given binimetinib with encorafenib (PHAROS) (6.1)', BIN),
      c('Overdose: binimetinib is 97% bound to plasma proteins, so hemodialysis is likely ineffective', BIN),
      c('Drug interactions: the label states no clinically important drug interactions have been observed with binimetinib', BIN),
      c('Combination use: label says to refer to the encorafenib prescribing information for additional risk information', BIN),
      c('Other fatal reactions in trials: myocardial infarction in 1 of 98 patients with NSCLC given binimetinib with encorafenib (PHAROS)', BIN),
    ],
  },
];
