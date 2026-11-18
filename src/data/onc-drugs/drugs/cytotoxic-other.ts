import type { Cancer, Cited, DrugClass, OncDrug, OncSource } from '../types.js';

// Cytotoxic and related agents (antitumor antibiotics, asparaginases, arsenic trioxide, tretinoin), from the DailyMed labels read 2026-11-18.
// Every statement below comes from the label named in its citation. Per-kilogram doses are not entered; dosing lives on management pages.
const c = (v: string, ...cite: string[]): Cited => ({ v, cite });

const BLEO = 'pi-bleomycin';
const MITO = 'pi-mitomycin';
const DACT = 'pi-dactinomycin';
const PEG = 'pi-pegaspargase';
const CAL = 'pi-calaspargase-pegol';
const ERW = 'pi-asparaginase-erwinia-recombinant';
const ARS = 'pi-arsenic-trioxide';
const TRET = 'pi-tretinoin';

export const SOURCES: Record<string, OncSource> = {
  [BLEO]: { key: BLEO, kind: 'fda-pi', text: 'Bleomycin for Injection, USP (Hospira, Inc.). Prescribing information, DailyMed set ID 905e0984-2ce3-481c-b1a0-0ef0a616479a, SPL effective 2022-08-25.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=905e0984-2ce3-481c-b1a0-0ef0a616479a' },
  [MITO]: { key: MITO, kind: 'fda-pi', text: 'Mitomycin for Injection (Accord Healthcare, Inc.). Prescribing information, DailyMed set ID ff676355-313d-4575-8f2f-e4a1e9527477, SPL effective 2025-04-22.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=ff676355-313d-4575-8f2f-e4a1e9527477' },
  [DACT]: { key: DACT, kind: 'fda-pi', text: 'Dactinomycin for injection (Eugia US LLC). Prescribing information, DailyMed set ID 5da55538-2602-4704-a9da-603c9f7ff7dc, SPL effective 2024-06-18.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=5da55538-2602-4704-a9da-603c9f7ff7dc' },
  [PEG]: { key: PEG, kind: 'fda-pi', text: 'ONCASPAR (pegaspargase) (Servier Pharmaceuticals LLC). Prescribing information, DailyMed set ID ac7b6a6f-6ddb-48c6-8088-d8a8e3fea6ce, SPL effective 2024-10-07.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=ac7b6a6f-6ddb-48c6-8088-d8a8e3fea6ce' },
  [CAL]: { key: CAL, kind: 'fda-pi', text: 'ASPARLAS (calaspargase pegol-mknl) (Servier Pharmaceuticals LLC). Prescribing information, DailyMed set ID 6585bd0d-bd78-4341-9e87-0f7664821f05, SPL effective 2024-10-08.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=6585bd0d-bd78-4341-9e87-0f7664821f05' },
  [ERW]: { key: ERW, kind: 'fda-pi', text: 'RYLAZE (asparaginase erwinia chrysanthemi (recombinant)-rywn) (Jazz Pharmaceuticals, Inc.). Prescribing information, DailyMed set ID 857e53aa-1098-4dad-b654-0276cdd43e03, SPL effective 2025-07-01.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=857e53aa-1098-4dad-b654-0276cdd43e03' },
  [ARS]: { key: ARS, kind: 'fda-pi', text: 'TRISENOX (arsenic trioxide) (Cephalon, LLC). Prescribing information, DailyMed set ID 101fc347-d0ad-4aee-8b06-9feb187fd741, SPL effective 2022-06-30.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=101fc347-d0ad-4aee-8b06-9feb187fd741' },
  [TRET]: { key: TRET, kind: 'fda-pi', text: 'Tretinoin capsules (Par Health USA, LLC). Prescribing information, DailyMed set ID 9c4ae9d9-c2a0-4995-a27a-e3f0f0284db9, SPL effective 2026-08-20.', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=9c4ae9d9-c2a0-4995-a27a-e3f0f0284db9' },
};

export const CANCERS: Cancer[] = [
  { id: 'scc-hn-penis-cervix-vulva', name: 'Squamous cell carcinoma of the head and neck, penis, cervix and vulva' },
  { id: 'hodgkin-lymphoma', type: 'hodgkin', name: 'Hodgkin lymphoma' },
  { id: 'non-hodgkin-lymphoma', type: 'nhl', name: 'Non-Hodgkin lymphoma' },
  { id: 'testicular-carcinoma', type: 'testicular-germ-cell', name: 'Testicular carcinoma (embryonal cell, choriocarcinoma, teratocarcinoma)' },
  { id: 'malignant-pleural-effusion', name: 'Malignant pleural effusion' },
  { id: 'disseminated-stomach-adenocarcinoma', type: 'gastric-esophageal', name: 'Disseminated adenocarcinoma of the stomach' },
  { id: 'disseminated-pancreas-adenocarcinoma', type: 'pancreatic', name: 'Disseminated adenocarcinoma of the pancreas' },
  { id: 'wilms-tumor', type: 'wilms', name: 'Wilms tumor' },
  { id: 'rhabdomyosarcoma', type: 'sarcoma', name: 'Rhabdomyosarcoma' },
  { id: 'ewing-sarcoma', type: 'sarcoma', name: 'Ewing sarcoma' },
  { id: 'nonseminomatous-testicular', type: 'testicular-germ-cell', name: 'Metastatic nonseminomatous testicular cancer' },
  { id: 'gtn', type: 'gtn', name: 'Gestational trophoblastic neoplasia', aliases: ['GTN'] },
  { id: 'solid-malignancies-regional-perfusion', name: 'Locally recurrent or locoregional solid malignancies (regional perfusion)' },
  { id: 'all', type: 'all', name: 'Acute lymphoblastic leukemia', aliases: ['ALL'] },
  { id: 'lbl', name: 'Lymphoblastic lymphoma', aliases: ['LBL'] },
  { id: 'apl', type: 'apl', name: 'Acute promyelocytic leukemia', aliases: ['APL'] },
];

export const CLASSES: DrugClass[] = [
  {
    id: 'cyto-antitumor-antibiotic', name: 'Antitumor antibiotic',
    mechanism: c('Cytotoxic antibiotics produced by Streptomyces species that act on DNA: bleomycin and mitomycin inhibit DNA synthesis, and dactinomycin binds DNA and inhibits RNA synthesis.', BLEO, MITO, DACT),
    effects: [],
  },
  {
    id: 'cyto-asparaginase', name: 'Asparaginase (asparagine-specific enzyme)',
    mechanism: c('An enzyme that converts the amino acid L-asparagine into aspartic acid and ammonia; leukemic cells with low asparagine synthetase depend on outside asparagine, so depleting plasma asparagine kills them.', PEG, CAL, ERW),
    effects: [
      { tox: 'chemo-hypersensitivity', cite: [PEG, CAL, ERW] },
      { tox: 'chemo-pancreatitis', cite: [PEG, CAL, ERW] },
      { tox: 'chemo-thrombosis-bleeding', cite: [PEG, CAL, ERW] },
      { tox: 'chemo-hepatotoxicity', cite: [PEG, CAL, ERW] },
    ],
  },
  {
    id: 'cyto-arsenical', name: 'Arsenic trioxide',
    mechanism: c('Mechanism not completely understood: in NB4 promyelocytic leukemia cells in vitro it causes changes and DNA fragmentation typical of apoptosis, and it damages or degrades the PML-RAR-alpha fusion protein.', ARS),
    effects: [],
  },
  {
    id: 'cyto-retinoid', name: 'Retinoid',
    mechanism: c('Induces cytodifferentiation and decreases proliferation of acute promyelocytic leukemia cells; the exact mechanism in this leukemia is unknown.', TRET),
    effects: [],
  },
];

export const DRUGS: OncDrug[] = [
  {
    id: 'bleomycin', generic: 'bleomycin', brands: [], formerBrands: ['Blenoxane'], brandSource: 'fda-drugsfda', classIds: ['cyto-antitumor-antibiotic'], label: BLEO, tier: 'full',
    cancers: ['scc-hn-penis-cervix-vulva', 'hodgkin-lymphoma', 'non-hodgkin-lymphoma', 'testicular-carcinoma', 'malignant-pleural-effusion'],
    boxedWarning: [
      c('Pulmonary fibrosis: the most severe toxicity; usually pneumonitis that can progress to fibrosis, more often in elderly patients and above 400 units total dose, but seen in young patients and at low doses', BLEO),
      c('Severe idiosyncratic reaction: hypotension, mental confusion, fever, chills and wheezing in about 1% of lymphoma patients', BLEO),
    ],
    effects: [
      {
        tox: 'chemo-pulmonary-toxicity', rank: 1, boxed: true,
        timing: c('Higher risk above 400 units; also at low doses, and seen in young patients; more often in elderly patients', BLEO),
        quirk: c('Label: about 10% of treated patients, about 1% progress to fatal fibrosis; unpredictable. Earliest symptom dyspnea, earliest sign fine rales. Oxygen in surgery carries added risk; label suggests FIO2 near room air (25%) in surgery and afterward, with colloid over crystalloid.', BLEO),
      },
      {
        tox: 'chemo-hypersensitivity', rank: 2, boxed: true,
        timing: c('Usually after the 1st or 2nd dose', BLEO),
        quirk: c('Label: idiosyncratic reaction similar to anaphylaxis, in about 1% of lymphoma patients; it may be immediate or delayed for several hours. Bleomycin is contraindicated after a hypersensitive or idiosyncratic reaction to it.', BLEO),
      },
      { tox: 'chemo-nephrotoxicity', cite: [BLEO], quirk: c('Label: renal toxicity, beginning as worsening renal function tests, may occur at any time after starting therapy; use with extreme caution in significant renal impairment.', BLEO) },
      { tox: 'chemo-hepatotoxicity', cite: [BLEO], quirk: c('Label: hepatic toxicity, beginning as worsening liver function tests, may occur at any time after starting therapy.', BLEO) },
    ],
    alsoOnLabel: [
      c('Pleurodesis death: death has been reported with bleomycin pleurodesis in seriously ill patients; hypotension possibly needing symptomatic treatment has also been reported', BLEO),
      c('Chest pain: sudden onset of an acute chest pain syndrome suggestive of pleuropericarditis has been reported during infusions', BLEO),
      c('Vascular toxicity: with combination antineoplastic therapy, myocardial infarction, cerebrovascular accident, thrombotic microangiopathy (HUS) or cerebral arteritis have been reported', BLEO),
      c('Raynaud\'s phenomenon: reported with bleomycin plus vinblastine with or without cisplatin and in a few cases with bleomycin alone; the label says the cause is unknown', BLEO),
      c('Idiosyncratic reaction treatment: symptomatic, including volume expansion, pressors, antihistamines and corticosteroids; may be immediate or delayed hours', BLEO),
      c('G-CSF and other cytokines: some published reports suggest higher pulmonary toxicity risk with combined use, but randomized studies to date have not shown increased pulmonary complications with G-CSF', BLEO),
      c('Prior idiosyncratic reaction: contraindicated in patients who have had a hypersensitive or idiosyncratic reaction to bleomycin', BLEO),
      c('Compromised pulmonary function: use with extreme caution', BLEO),
      c('Renal impairment: use with extreme caution in significant impairment; with creatinine clearance below 50 mL/min treat with caution and monitor renal function, as lower doses may be required', BLEO),
    ],
  },
  {
    id: 'mitomycin', generic: 'mitomycin', brands: [], formerBrands: ['Mitozytrex', 'Mutamycin'], brandSource: 'fda-drugsfda', aliases: ['mitomycin-C'], classIds: ['cyto-antitumor-antibiotic'], label: MITO, tier: 'full',
    cancers: ['disseminated-stomach-adenocarcinoma', 'disseminated-pancreas-adenocarcinoma'],
    boxedWarning: [
      c('Hemolytic uremic syndrome: microangiopathic hemolytic anemia, thrombocytopenia and irreversible renal failure; most cases at doses of 60 mg or more; blood product transfusion may worsen it', MITO),
      c('Bone marrow suppression: thrombocytopenia and leukopenia, the most common and severe toxicity; may contribute to overwhelming infection', MITO),
    ],
    effects: [
      {
        tox: 'chemo-tma', rank: 1, boxed: true,
        timing: c('Most cases at doses of 60 mg or more', MITO),
        quirk: c('Label: can occur at any time on therapy, alone or in combination; 52% mortality. Complications include pulmonary edema (65%) and neurologic abnormalities (16%); transfusion may worsen it. The label is inconsistent on 60 mg: boxed warning says 60 mg or more, warnings text says total doses exceeding 60 mg (72 of 83 patients).', MITO),
      },
      {
        tox: 'chemo-myelosuppression', rank: 2, boxed: true,
        timing: c('Anytime within 8 weeks of starting, average 4 weeks, recovery within 10 weeks of stopping', MITO),
        quirk: c('Label: withhold for platelets below 100,000/mm3 or WBC below 4,000/mm3; check counts for at least 8 weeks after therapy. Marrow toxicity in 64.4% (605 of 937), cumulative; about 25% of episodes did not recover; deaths from septicemia reported.', MITO),
      },
      {
        tox: 'chemo-extravasation',
        cite: [MITO],
        quirk: c('Label: give IV only. Extravasation causes necrosis and sloughing, with or without stinging or burning and even with adequate blood return. Delayed ulceration at or distant from the site, weeks to months later, can occur without visible extravasation; skin grafting was needed in some cases.', MITO),
      },
      {
        tox: 'chemo-pulmonary-toxicity',
        cite: [MITO],
        quirk: c('Label: mitomycin pulmonary toxicity occurs infrequently but can be severe and may be life-threatening; dyspnea with a nonproductive cough and radiographic pulmonary infiltrates may indicate it. If other causes are excluded, mitomycin is discontinued. Steroids have been used as treatment, but their therapeutic value has not been determined.', MITO),
      },
      { tox: 'chemo-nephrotoxicity', cite: [MITO], quirk: c('Label: observe for evidence of renal toxicity; do not give to patients with serum creatinine above 1.7 mg percent.', MITO) },
      { tox: 'chemo-cardiotoxicity', cite: [MITO], quirk: c('Label: congestive heart failure, often treated effectively with diuretics and cardiac glycosides, has rarely been reported; almost all affected patients had received prior doxorubicin.', MITO) },
    ],
    alsoOnLabel: [
      c('Intravesical use: bladder fibrosis or contraction with intravesical administration (not an approved route), rarely requiring cystectomy', MITO),
      c('Perioperative oxygen: ARDS cases at FIO2 above 50% with mitomycin plus chemotherapy; use only enough oxygen for adequate saturation; avoid overhydration', MITO),
      c('Injection-site cellulitis: has been reported and is occasionally severe', MITO),
      c('Stomatitis: occurs frequently', MITO),
      c('Vinca alkaloid reaction: acute dyspnea and bronchospasm minutes to hours after a vinca alkaloid in mitomycin-exposed patients; bronchodilators, steroids, oxygen gave relief', MITO),
      c('Bleeding disorders: contraindicated with thrombocytopenia, coagulation disorder or increased bleeding tendency from other causes', MITO),
      c('Prior hypersensitivity: contraindicated after a prior hypersensitive or idiosyncratic reaction to mitomycin', MITO),
    ],
  },
  {
    id: 'dactinomycin', generic: 'dactinomycin', brands: [], formerBrands: ['Cosmegen'], brandSource: 'fda-drugsfda', classIds: ['cyto-antitumor-antibiotic'], label: DACT, tier: 'full',
    cancers: ['wilms-tumor', 'rhabdomyosarcoma', 'ewing-sarcoma', 'nonseminomatous-testicular', 'gtn', 'solid-malignancies-regional-perfusion'],
    effects: [
      {
        tox: 'chemo-extravasation',
        cite: [DACT],
        quirk: c('Label: stop at burning, stinging or other sign of infiltration and restart in another vein; apply ice 15 minutes 4 times a day for 3 days; consult plastic surgery if needed. Injury includes blistering, ulceration and persistent pain needing wide excision and skin grafting.', DACT),
      },
      {
        tox: 'chemo-myelosuppression',
        timing: c('Neutrophil nadir generally 14 to 21 days', DACT),
        quirk: c('Label: severe and fatal myelosuppression, which may include neutropenia, thrombocytopenia and anemia.', DACT),
      },
      {
        tox: 'chemo-hepatotoxicity',
        cite: [DACT],
        quirk: c('Label: severe and fatal hepatic VOD can occur, more in age under 4 years or with radiotherapy; watch for rising AST, ALT and bilirubin, hepatomegaly, weight gain, ascites. Postmarketing: hepatitis, hepatic failure with deaths.', DACT),
      },
      { tox: 'chemo-severe-skin', cite: [DACT], quirk: c('Label: Stevens-Johnson syndrome and toxic epidermal necrolysis can occur; the label directs permanent discontinuation after a severe mucocutaneous reaction.', DACT) },
      { tox: 'chemo-nephrotoxicity', cite: [DACT], quirk: c('Label: abnormalities of renal function can occur; creatinine and electrolytes are monitored frequently.', DACT) },
      { tox: 'chemo-tumor-lysis', basis: 'postmarketing', cite: [DACT], quirk: c('Label: tumor lysis syndrome is listed among adverse reactions identified postmarketing.', DACT) },
      { tox: 'chemo-pulmonary-toxicity', basis: 'postmarketing', cite: [DACT], quirk: c('Label: pneumonitis and pneumothorax are listed among adverse reactions identified postmarketing.', DACT) },
    ],
    alsoOnLabel: [
      c('Disseminated intravascular coagulation: reported postmarketing', DACT),
      c('Fatal sepsis: infections including sepsis with fatal outcome reported postmarketing', DACT),
      c('Hypocalcemia: reported postmarketing', DACT),
      c('Radiation recall: can occur in previously irradiated fields in patients who receive dactinomycin after prior radiation therapy', DACT),
      c('Live viral vaccines: safety has not been studied and live virus vaccination is not recommended before or during treatment', DACT),
      c('Radiation: more GI toxicity, myelosuppression and skin or mucosal erythema; risk highest within 2 months of prior radiation, distant fields too', DACT),
    ],
  },
  {
    id: 'pegaspargase', generic: 'pegaspargase', brands: ['Oncaspar'], brandSource: 'fda-drugsfda', classIds: ['cyto-asparaginase'], label: PEG, tier: 'full',
    cancers: ['all'],
    effects: [
      {
        tox: 'chemo-hypersensitivity', cite: [PEG],
        quirk: c('Label: anaphylaxis and serious hypersensitivity can occur, with higher risk if prior hypersensitivity to E. coli derived L-asparaginase. Observe 1 hour after dosing where resuscitation equipment and anaphylaxis treatment (epinephrine, oxygen, intravenous steroids, antihistamines) are available.', PEG),
      },
      { tox: 'chemo-pancreatitis', cite: [PEG], quirk: c('Label: hemorrhagic or necrotizing pancreatitis with fatal outcomes has been reported.', PEG) },
      {
        tox: 'chemo-thrombosis-bleeding', cite: [PEG],
        quirk: c('Label: serious thrombotic events including sagittal sinus thrombosis can occur; discontinue in serious thrombosis. Hemorrhage: increased PT, increased PTT and hypofibrinogenemia can occur; patients with signs of hemorrhage are evaluated with PT, PTT and fibrinogen.', PEG),
      },
      {
        tox: 'chemo-hepatotoxicity', cite: [PEG],
        quirk: c('Label: severe, life-threatening and potentially fatal hepatic veno-occlusive disease observed with standard chemotherapy, including during induction. Bilirubin and transaminases are checked before each dose and at least weekly through 6 weeks after the last dose.', PEG),
      },
    ],
    alsoOnLabel: [
      c('CNS hemorrhage: hemorrhage including central nervous system hemorrhage, and superior sagittal sinus thrombosis, reported postmarketing', PEG),
      c('Glucose intolerance: can occur and in some cases is irreversible; the label says to monitor serum glucose', PEG),
      c('Hyperammonemia: reported postmarketing', PEG),
      c('Overdose: no specific antidote; monitor closely, give symptomatic and supportive treatment (3 patients had mild liver enzyme rise or rash)', PEG),
      c('Glucocorticoids: may increase glucocorticoid-induced toxicities, including osteonecrosis, through a potential increase in dexamethasone exposure', PEG),
      c('Pancreatitis history: contraindicated with a history of pancreatitis, including pancreatitis related to prior L-asparaginase therapy', PEG),
      c('Prior thrombosis or hemorrhage: contraindicated after serious thrombosis or serious hemorrhagic events with prior L-asparaginase therapy', PEG),
      c('Prior hypersensitivity: contraindicated after serious hypersensitivity reactions, including anaphylaxis, to Oncaspar or any of its excipients', PEG),
      c('Severe hepatic impairment: contraindicated', PEG),
    ],
  },
  {
    id: 'calaspargase-pegol', generic: 'calaspargase pegol', brands: ['Asparlas'], brandSource: 'fda-drugsfda', aliases: ['calaspargase pegol-mknl'], classIds: ['cyto-asparaginase'], label: CAL, tier: 'full',
    cancers: ['all'],
    effects: [
      {
        tox: 'chemo-hypersensitivity', cite: [CAL],
        quirk: c('Label: grade 3 and 4 hypersensitivity reactions, including anaphylaxis, in clinical trials with an incidence between 7 and 21%. Given in a clinical setting with resuscitation equipment and agents to treat anaphylaxis (for example epinephrine, oxygen, intravenous steroids, antihistamines).', CAL),
      },
      { tox: 'chemo-pancreatitis', cite: [CAL], quirk: c('Label: pancreatitis in clinical trials with an incidence between 12 and 16%; hemorrhagic or necrotizing pancreatitis reported with other asparaginases.', CAL) },
      {
        tox: 'chemo-thrombosis-bleeding', cite: [CAL],
        quirk: c('Label: serious thrombotic events including sagittal sinus thrombosis, incidence 9 to 12% in clinical trials; discontinue in serious thrombosis. Hemorrhage with increased PT, increased PTT and hypofibrinogenemia has been reported; patients with signs of hemorrhage are evaluated with PT, PTT and fibrinogen.', CAL),
      },
      {
        tox: 'chemo-hepatotoxicity', cite: [CAL],
        quirk: c('Label: severe, life-threatening and potentially fatal hepatic veno-occlusive disease observed with standard chemotherapy, including during induction. Bilirubin and transaminases are checked before each dose and at least weekly through 6 weeks after the last dose.', CAL),
      },
    ],
    alsoOnLabel: [
      c('Other asparaginase reactions: angioedema, lip or eye swelling, hypotension, bronchospasm, dyspnea, rash; discontinue for serious hypersensitivity', CAL),
      c('Pancreatitis history: contraindicated with a history of serious pancreatitis during previous L-asparaginase therapy', CAL),
      c('Prior thrombosis or hemorrhage: contraindicated after serious thrombosis or serious hemorrhagic events during previous L-asparaginase therapy', CAL),
      c('Prior hypersensitivity: contraindicated after serious hypersensitivity reactions, including anaphylaxis, to pegylated L-asparaginase therapy', CAL),
      c('Severe hepatic impairment: contraindicated', CAL),
    ],
  },
  {
    id: 'asparaginase-erwinia-recombinant', generic: 'asparaginase erwinia chrysanthemi (recombinant)-rywn', brands: ['Rylaze'], brandSource: 'fda-drugsfda', aliases: ['crisantaspase'], classIds: ['cyto-asparaginase'], label: ERW, tier: 'full',
    cancers: ['all', 'lbl'],
    effects: [
      {
        tox: 'chemo-hypersensitivity', cite: [ERW],
        quirk: c('Label: hypersensitivity in 29% (severe 6%), anaphylaxis 2% after intramuscular dosing; rash most common (19%). Give where resuscitation equipment and anaphylaxis treatment (epinephrine, oxygen, intravenous steroids, antihistamines) are available. For patients hypersensitive to E. coli-derived asparaginase.', ERW),
      },
      { tox: 'chemo-pancreatitis', cite: [ERW], quirk: c('Label: pancreatitis, including elevated amylase or lipase, in 20% of patients and severe in 8%; symptomatic pancreatitis in 7%, severe in 6%.', ERW) },
      {
        tox: 'chemo-thrombosis-bleeding', cite: [ERW],
        quirk: c('Label: serious thrombotic events, including sagittal sinus thrombosis and pulmonary embolism, in 1% of patients; discontinue for a thrombotic event and give appropriate antithrombotic therapy. Bleeding in 25% of patients, severe in 2%; most common were bruising (12%) and nose bleed (9%).', ERW),
      },
      {
        tox: 'chemo-hepatotoxicity', cite: [ERW],
        quirk: c('Label: elevated bilirubin and/or transaminases in 75% of patients, grade 3 or higher in 26%; bilirubin and transaminases are checked before each cycle and at least weekly through four weeks after the last dose.', ERW),
      },
    ],
    alsoOnLabel: [
      c('Wrong route: the intravenous route is not approved, and hypersensitivity reactions were higher in patients given Rylaze intravenously', ERW),
      c('Prior hypersensitivity: contraindicated after serious hypersensitivity reactions, including anaphylaxis, to Erwinia asparaginase', ERW),
      c('Pancreatitis history: contraindicated with a history of serious pancreatitis during previous asparaginase therapy', ERW),
      c('Prior thrombosis or hemorrhage: contraindicated after serious thrombosis or serious hemorrhagic events during previous asparaginase therapy', ERW),
      c('Severe hepatic impairment: contraindicated', ERW),
    ],
  },
  {
    id: 'arsenic-trioxide', generic: 'arsenic trioxide', editorAliases: ['ATO'], brands: ['Trisenox'], brandSource: 'fda-drugsfda', classIds: ['cyto-arsenical'], label: ARS, tier: 'full',
    cancers: ['apl'],
    boxedWarning: [
      c('Differentiation syndrome: life-threatening or fatal; fever, dyspnea, hypoxia, respiratory distress, pulmonary infiltrates, effusions, weight gain, edema, hypotension, renal insufficiency, hepatopathy; with or without leukocytosis', ARS),
      c('Cardiac conduction abnormalities: QTc prolongation, complete AV block and torsade de pointes, which can be fatal; do not give with ventricular arrhythmia or prolonged QTc', ARS),
      c("Encephalopathy including Wernicke's: a neurologic emergency; if suspected, interrupt arsenic trioxide and give parenteral thiamine", ARS),
    ],
    effects: [
      {
        tox: 'differentiation-syndrome', rank: 1, boxed: true,
        timing: c('Onset day 1 to second month of induction, label range: as early as day 1 to as late as the second month', ARS),
        quirk: c('Label: 16-23% of patients treated for APL in clinical trials; occurs with and without leukocytosis. If suspected, withhold arsenic trioxide and start dexamethasone with hemodynamic monitoring until signs and symptoms resolve. With tretinoin, the label recommends prednisone prophylaxis during induction.', ARS),
      },
      {
        tox: 'qt-prolongation', rank: 2, boxed: true,
        timing: c('QTc seen 1 to 5 weeks after infusion start, usually resolved by 8 weeks after infusion', ARS),
        quirk: c('Label: keep potassium above 4 mEq/L and magnesium above 1.8 mg/dL. QTc above 500 msec in 40% (relapsed or refractory APL, monotherapy); above 450 msec men or 460 msec women in 11% (with tretinoin, newly diagnosed low-risk). Torsade risk rises with QT-prolonging drugs, prior torsade, heart failure, potassium-wasting diuretics.', ARS),
      },
      {
        tox: 'chemo-cns-toxicity', rank: 3, boxed: true, cite: [ARS],
        quirk: c('Label: if Wernicke\'s is suspected, interrupt arsenic trioxide and give parenteral thiamine. Watch for confusion, reduced consciousness, seizures, ataxia, visual symptoms. Postmarketing: seizures, paresis, neuropathy, PRES.', ARS),
      },
      {
        tox: 'chemo-hepatotoxicity', cite: [ARS],
        quirk: c('Label: 44% of newly diagnosed low-risk APL patients on arsenic trioxide with tretinoin had elevated AST, alkaline phosphatase and/or bilirubin, resolving with temporary discontinuation.', ARS),
      },
      { tox: 'chemo-severe-skin', basis: 'postmarketing', cite: [ARS], quirk: c('Label: toxic epidermal necrolysis is listed among adverse reactions identified postmarketing.', ARS) },
      { tox: 'chemo-cardiotoxicity', basis: 'postmarketing', cite: [ARS], quirk: c('Label: postmarketing reports include congestive heart failure, ventricular extrasystoles and ventricular tachycardia with QT prolongation, and atrioventricular block.', ARS) },
    ],
    alsoOnLabel: [
      c('Rhabdomyolysis: reported postmarketing', ARS),
      c('Pancytopenia: pancytopenia and bone marrow necrosis reported postmarketing', ARS),
      c('Overdose: convulsions, muscle weakness and confusion; stop arsenic trioxide and consider chelation', ARS),
      c('Overdose chelation: the label names dimercaprol followed by penicillamine as the conventional protocol for acute arsenic intoxication', ARS),
      c('QT-prolonging drugs: concomitant use may increase the risk of serious QT/QTc prolongation; the label says to discontinue or replace them, and to monitor ECGs more often if use cannot be avoided', ARS),
      c('Electrolyte-wasting drugs: such as diuretics or amphotericin B; avoid, since electrolyte abnormalities raise the risk of serious QT/QTc prolongation; monitor electrolytes more often if unavoidable', ARS),
      c('Hepatotoxic drugs: may raise serious hepatotoxicity risk, especially with tretinoin; discontinue or replace them, or monitor liver tests more often', ARS),
      c('Arsenic hypersensitivity: contraindicated', ARS),
    ],
  },
  {
    id: 'tretinoin', generic: 'tretinoin', editorAliases: ['ATRA'], pinAlso: ['ATRA'], brands: [], formerBrands: ['Vesanoid'], brandSource: 'fda-drugsfda', aliases: ['all-trans retinoic acid'], classIds: ['cyto-retinoid'], label: TRET, tier: 'full', pin: false,
    cancers: ['apl'],
    boxedWarning: [
      c('Differentiation syndrome: life-threatening or fatal, in about 26% of APL patients; at first signs start high-dose corticosteroids and hemodynamic monitoring; consider withholding tretinoin for moderate and severe syndrome', TRET),
      c('Embryo-fetal toxicity: embryo-fetal loss and malformations; negative pregnancy test before starting; contraception during treatment and for 1 month after the last dose in females (1 week in males with female partners)', TRET),
    ],
    effects: [
      {
        tox: 'differentiation-syndrome', rank: 1, boxed: true,
        timing: c('Generally in month 1 of treatment, as early as following the first dose', TRET),
        quirk: c('Label: at first signs, dexamethasone with hemodynamic monitoring until signs resolve. About 26% of APL patients; fever, dyspnea, respiratory distress, pulmonary infiltrates, effusions, hypotension, organ failure. Some needed intubation; several died of multi-organ failure.', TRET),
      },
      {
        tox: 'chemo-hepatotoxicity', cite: [TRET],
        quirk: c('Label: elevated liver function tests in 50% to 60% of patients during treatment; most resolved without interruption or after completion of treatment.', TRET),
      },
    ],
    alsoOnLabel: [
      c('Thromboembolic events: venous and arterial events including stroke, myocardial infarction and renal infarct, which may occur during the first month of treatment', TRET),
      c('Intracranial hypertension: reported with retinoids, especially in children; early signs are papilledema, headache, nausea, vomiting and visual disturbances', TRET),
      c('Leukocytosis: rapidly evolving and can be life-threatening, in about 40% of APL patients; baseline WBC above 5 x 10^9/L raises the risk', TRET),
      c('Pancreatitis: reported postmarketing', TRET),
      c('Hypercalcemia: reported postmarketing', TRET),
      c('Sweet\'s syndrome: reported postmarketing, with myositis and vasculitis predominantly involving the skin', TRET),
      c('Overdose: reversible signs of hypervitaminosis A (headache, nausea, vomiting, mucocutaneous symptoms); no specific treatment, and the label says to treat the patient in a special hematological unit', TRET),
      c('Anti-fibrinolytic agents: fatal thrombotic complications have been reported with concomitant use; the label says to avoid the combination', TRET),
      c('Tetracyclines and similar agents: other agents that can cause intracranial hypertension may increase the risk; the label says to avoid them', TRET),
      c('Vitamin A: concomitant use may cause vitamin A related adverse reactions; the label says to avoid it', TRET),
      c('CYP3A inhibitors: strong inhibitors raise tretinoin levels and adverse reactions, avoid if possible; monitor more often with moderate inhibitors', TRET),
      c('Strong CYP3A inducers: may lower tretinoin levels and efficacy; avoid if possible', TRET),
      c('Retinoid hypersensitivity: contraindicated with known hypersensitivity to tretinoin, its components or other retinoids (reactions included rash, pruritus, face edema and dyspnea)', TRET),
    ],
  },
];
