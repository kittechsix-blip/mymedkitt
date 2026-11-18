import type { Cancer, Cited, DrugClass, OncDrug, OncSource } from '../types.js';

// Platinum agents and topoisomerase inhibitors, from the DailyMed labels (SPL) read 2026-11-18.
// Every statement is taken from the label named in its citation. Dosing lives on management pages, not here.
const c = (v: string, ...cite: string[]): Cited => ({ v, cite });
const dm = (setid: string) => `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${setid}`;

export const SOURCES: Record<string, OncSource> = {
  'pi-cisplatin': { key: 'pi-cisplatin', kind: 'fda-pi', text: 'Cisplatin injection (Accord Healthcare Inc.). Prescribing information, DailyMed set ID b2b029f5-0d7e-4e7f-accc-b722aec34c68, SPL effective 2024-12-03.', url: dm('b2b029f5-0d7e-4e7f-accc-b722aec34c68'), revised: '2024-12-03' },
  'pi-carboplatin': { key: 'pi-carboplatin', kind: 'fda-pi', text: 'Carboplatin injection (Teyro Labs Private Limited). Prescribing information, DailyMed set ID f64a0cbe-7fe3-407e-8933-21c30e1a1ebc, SPL effective 2025-01-08.', url: dm('f64a0cbe-7fe3-407e-8933-21c30e1a1ebc'), revised: '2025-01-08' },
  'pi-oxaliplatin': { key: 'pi-oxaliplatin', kind: 'fda-pi', text: 'Oxaliplatin injection (Hospira, Inc.). Prescribing information, DailyMed set ID e51a62ba-d163-4c57-835c-8c86cf097e40, SPL effective 2026-08-07.', url: dm('e51a62ba-d163-4c57-835c-8c86cf097e40'), revised: '2026-08-07' },
  'pi-irinotecan': { key: 'pi-irinotecan', kind: 'fda-pi', text: 'CAMPTOSAR (irinotecan hydrochloride) injection (Pharmacia & Upjohn Company LLC). Prescribing information, DailyMed set ID e518dfc6-7e93-4fee-a66c-51e1ab71c056, SPL effective 2026-05-12.', url: dm('e518dfc6-7e93-4fee-a66c-51e1ab71c056'), revised: '2026-05-12' },
  'pi-irinotecan-liposome': { key: 'pi-irinotecan-liposome', kind: 'fda-pi', text: 'ONIVYDE (irinotecan liposome injection) (Ipsen Biopharmaceuticals, Inc.). Prescribing information, DailyMed set ID c8b58efa-1820-48a4-b70d-62918fc4abfc, SPL effective 2025-03-03.', url: dm('c8b58efa-1820-48a4-b70d-62918fc4abfc'), revised: '2025-03-03' },
  'pi-topotecan': { key: 'pi-topotecan', kind: 'fda-pi', text: 'HYCAMTIN (topotecan) for injection (Novartis Pharmaceuticals Corporation). Prescribing information, DailyMed set ID eeee060c-a9ec-423e-a374-8484009f8524, SPL effective 2022-07-07.', url: dm('eeee060c-a9ec-423e-a374-8484009f8524'), revised: '2022-07-07' },
  'pi-topotecan-capsules': { key: 'pi-topotecan-capsules', kind: 'fda-pi', text: 'HYCAMTIN (topotecan) capsules (Sandoz Inc). Prescribing information, DailyMed set ID b23b46f5-c276-47f5-8bbd-940680b3f579, SPL effective 2023-09-18.', url: dm('b23b46f5-c276-47f5-8bbd-940680b3f579'), revised: '2023-09-18' },
  'pi-etoposide': { key: 'pi-etoposide', kind: 'fda-pi', text: 'Etoposide injection USP (Accord Healthcare Inc.). Prescribing information, DailyMed set ID 4f850eb2-3542-43a0-90e8-bb37fa05cf15, SPL effective 2026-11-09.', url: dm('4f850eb2-3542-43a0-90e8-bb37fa05cf15'), revised: '2026-11-09' },
  'pi-etopophos': { key: 'pi-etopophos', kind: 'fda-pi', text: 'ETOPOPHOS (etoposide phosphate) for injection (H2-Pharma, LLC). Prescribing information, DailyMed set ID 7499fc35-fae8-44ad-bbab-9a1a589bf3ee, SPL effective 2026-07-31.', url: dm('7499fc35-fae8-44ad-bbab-9a1a589bf3ee'), revised: '2026-07-31' },
};

export const CANCERS: Cancer[] = [
  { id: 'testicular', type: 'testicular-germ-cell', name: 'Testicular cancer' },
  { id: 'colon-stage3-adjuvant', type: 'colorectal', name: 'Stage III colon cancer (adjuvant treatment)' },
  { id: 'crc-advanced', type: 'colorectal', name: 'Advanced colorectal cancer' },
  { id: 'crc-metastatic', type: 'colorectal', name: 'Metastatic carcinoma of the colon or rectum' },
  { id: 'pancreatic-metastatic', type: 'pancreatic', name: 'Metastatic pancreatic adenocarcinoma' },
];

export const CLASSES: DrugClass[] = [
  {
    id: 'cyto-platinum', name: 'Platinum agent',
    mechanism: c('Forms DNA cross-links; the cisplatin and oxaliplatin labels add that this interferes with DNA replication and transcription.', 'pi-cisplatin', 'pi-carboplatin', 'pi-oxaliplatin'),
    effects: [
      { tox: 'chemo-myelosuppression', cite: ['pi-cisplatin', 'pi-carboplatin', 'pi-oxaliplatin'] },
      { tox: 'chemo-hypersensitivity', cite: ['pi-cisplatin', 'pi-carboplatin', 'pi-oxaliplatin'], note: c('Carboplatin and oxaliplatin labels state reactions can occur within minutes of administration; the cisplatin label states this for patients with prior cisplatin exposure.', 'pi-cisplatin', 'pi-carboplatin', 'pi-oxaliplatin') },
    ],
  },
  {
    id: 'cyto-topoisomerase-1-inhibitor', name: 'Topoisomerase I inhibitor',
    mechanism: c('Binds the topoisomerase I-DNA complex and prevents re-ligation of single-strand DNA breaks, causing double-strand DNA damage and cell death.', 'pi-irinotecan', 'pi-irinotecan-liposome', 'pi-topotecan', 'pi-topotecan-capsules'),
    effects: [
      { tox: 'chemo-myelosuppression', cite: ['pi-irinotecan', 'pi-irinotecan-liposome', 'pi-topotecan', 'pi-topotecan-capsules'] },
      { tox: 'chemo-pulmonary-toxicity', cite: ['pi-irinotecan', 'pi-irinotecan-liposome', 'pi-topotecan', 'pi-topotecan-capsules'], note: c('Labels describe interstitial lung disease (or interstitial pulmonary disease-like events), including fatalities.', 'pi-irinotecan', 'pi-irinotecan-liposome', 'pi-topotecan', 'pi-topotecan-capsules') },
    ],
  },
  {
    id: 'cyto-topoisomerase-2-inhibitor', name: 'Topoisomerase II inhibitor',
    mechanism: c('Induces DNA strand breaks through an interaction with DNA topoisomerase II or formation of free radicals.', 'pi-etoposide', 'pi-etopophos'),
    effects: [
      { tox: 'chemo-myelosuppression', cite: ['pi-etoposide', 'pi-etopophos'] },
      { tox: 'chemo-hypersensitivity', cite: ['pi-etoposide', 'pi-etopophos'] },
    ],
  },
];

export const DRUGS: OncDrug[] = [
  {
    id: 'cisplatin', generic: 'cisplatin', editorAliases: ['CDDP'], brands: ['Axycis'], formerBrands: ['Platinol', 'Platinol-AQ'], brandSource: 'fda-drugsfda', classIds: ['cyto-platinum'], label: 'pi-cisplatin', tier: 'full',
    cancers: ['testicular', 'ovarian', 'bladder'],
    boxedWarning: [
      c('Nephrotoxicity: severe, including acute renal failure; dose-related and cumulative', 'pi-cisplatin'),
      c('Myelosuppression: severe, with fatalities due to infections', 'pi-cisplatin'),
      c('Peripheral neuropathy: dose-related, worse with repeated courses', 'pi-cisplatin'),
      c('Nausea and vomiting: severe', 'pi-cisplatin'),
    ],
    alsoOnLabel: [
      c('Nausea and vomiting: boxed warning; severe, use highly effective antiemetic premedication', 'pi-cisplatin'),
      c('Nausea and vomiting: highly emetogenic; may begin within 1 to 4 hours and last up to 72 hours, maximal intensity 48 to 72 hours after administration, and can persist up to 1 week', 'pi-cisplatin'),
      c('Ototoxicity: cumulative and may be severe; tinnitus and high-frequency hearing loss, during or after treatment, unilateral or bilateral', 'pi-cisplatin'),
      c('Ototoxicity in children: more severe, particularly under 5 years of age; added risk with cranial irradiation, other ototoxic drugs and renal impairment', 'pi-cisplatin'),
      c('Ocular toxicity: optic neuritis, papilledema and cortical blindness reported at standard doses; blurred vision and altered color perception reported at higher doses and frequencies', 'pi-cisplatin'),
      c('Delayed nausea and vomiting: can begin or persist 24 hours or more after chemotherapy, including after complete emetic control on the day of treatment', 'pi-cisplatin'),
      c('Thromboembolism: venous and arterial events, myocardial infarction and stroke listed from trials or postmarketing', 'pi-cisplatin'),
      c('Cardiac events: cardiac failure, ventricular dysfunction and pericardial effusion listed from trials or postmarketing', 'pi-cisplatin'),
      c('Tumor lysis syndrome: listed from clinical trials or postmarketing surveillance', 'pi-cisplatin'),
      c('Gastrointestinal perforation and pancreatitis: listed from clinical trials or postmarketing surveillance', 'pi-cisplatin'),
      c('Pulmonary events: pneumonitis/interstitial lung disease and pulmonary embolism listed from clinical trials or postmarketing surveillance', 'pi-cisplatin'),
      c('Overdose: acute overdosage may cause renal failure, hepatic failure, hearing loss, ocular toxicity, myelosuppression, nausea and vomiting, neuritis, and death', 'pi-cisplatin'),
      c('Overdose: hemodialysis is not effective because of cisplatin protein binding', 'pi-cisplatin'),
      c('Overdose: management is supportive, with renal protection by intravenous hydration with or without an osmotic diuretic; plasmapheresis has been used but the optimal regimen is not established', 'pi-cisplatin'),
      c('Overdose: label directs to the National Poison Control Center, 1-800-222-1222', 'pi-cisplatin'),
      c('Nephrotoxic and ototoxic drugs: the label lists both under drug interactions', 'pi-cisplatin'),
    ],
    effects: [
      {
        tox: 'chemo-tma',
        cite: ['pi-cisplatin'],
        quirk: c('Hemolytic uremic syndrome, thrombotic thrombocytopenic purpura and Coombs-positive hemolytic anemia are listed among adverse reactions identified from clinical trials or postmarketing surveillance.', 'pi-cisplatin'),
      },
      {
        tox: 'chemo-cns-toxicity',
        cite: ['pi-cisplatin'],
        quirk: c('Listed from clinical trials or postmarketing surveillance: encephalopathy, seizures, leukoencephalopathy, reversible posterior leukoencephalopathy syndrome, dorsal column myelopathy, Lhermitte sign, tetany with hypocalcemia and hypomagnesemia.', 'pi-cisplatin'),
      },
      {
        tox: 'chemo-hyponatremia-siadh',
        cite: ['pi-cisplatin'],
        quirk: c('Listed from clinical trials or postmarketing surveillance among electrolyte abnormalities: SIADH, hyponatremia, hypomagnesemia (often requiring magnesium supplementation), hypocalcemia, hypokalemia and hypophosphatemia.', 'pi-cisplatin'),
      },
      {
        tox: 'chemo-nephrotoxicity',
        rank: 1, boxed: true,
        timing: c('Typically begins in week 2 after a dose, more prolonged and severe with repeated courses', 'pi-cisplatin'),
        quirk: c('Boxed warning: ensure adequate hydration; monitor renal function and electrolytes, including magnesium (consider magnesium supplementation). Higher risk with renal impairment, older age, other nephrotoxic drugs or poor hydration.', 'pi-cisplatin'),
      },
      {
        tox: 'chemo-neuropathy-ileus',
        rank: 3, boxed: true,
        timing: c('After one dose or 3 to 8 weeks after last dose, label reports symptoms after a single dose and delayed onset 3 to 8 weeks after the last dose; may progress after stopping and may be irreversible', 'pi-cisplatin'),
        quirk: c('Dose-related; becomes more severe with repeated courses.', 'pi-cisplatin'),
      },
      {
        tox: 'chemo-myelosuppression',
        rank: 2, boxed: true,
        quirk: c('Occurs in 25% to 30% of patients; fever and infection reported with neutropenia. Boxed warning: severe, with fatalities due to infections.', 'pi-cisplatin'),
      },
      {
        tox: 'chemo-hypersensitivity',
        quirk: c('Severe reactions including anaphylaxis and death; manifestations included facial edema, wheezing, tachycardia and hypotension. Occurred within minutes of administration in patients with prior cisplatin exposure. Contraindicated with severe hypersensitivity to cisplatin.', 'pi-cisplatin'),
      },
      {
        tox: 'chemo-extravasation',
        quirk: c('Local soft tissue toxicity after extravasation. Solutions above 0.5 mg/mL may cause tissue cellulitis, fibrosis, necrosis, pain, edema and erythema; label says to monitor the infusion site closely.', 'pi-cisplatin'),
      },
    ],
  },
  {
    id: 'carboplatin', generic: 'carboplatin', brands: ['Kyxata'], formerBrands: ['Paraplatin'], brandSource: 'fda-drugsfda', classIds: ['cyto-platinum'], label: 'pi-carboplatin', tier: 'full',
    cancers: ['ovarian'],
    boxedWarning: [
      c('Anaphylactic-like reactions: can occur within minutes of administration', 'pi-carboplatin'),
      c('Bone marrow suppression: dose related and may be severe, with infection and/or bleeding', 'pi-carboplatin'),
      c('Anemia: may be cumulative and may require transfusion support', 'pi-carboplatin'),
      c('Vomiting: frequent drug-related side effect', 'pi-carboplatin'),
    ],
    alsoOnLabel: [
      c('Vomiting: boxed warning; frequent, more severe after prior emetogenic therapy; antiemetic premedication reduces it', 'pi-carboplatin'),
      c('Vision loss: complete for light and colors has been reported at doses above those recommended; vision appears to recover totally or to a significant extent within weeks of stopping', 'pi-carboplatin'),
      c('Hearing loss: clinically significant in children when given above recommended doses with other ototoxic agents', 'pi-carboplatin'),
      c('Electrolyte changes: low serum sodium, potassium, calcium and magnesium reported in about 20% to 29% of patients, rarely associated with symptoms', 'pi-carboplatin'),
      c('Overdose: no known antidote; anticipated complications are secondary to bone marrow suppression and/or hepatic toxicity', 'pi-carboplatin'),
      c('Aminoglycosides: concomitant use has increased renal and/or audiologic toxicity', 'pi-carboplatin'),
      c('Nephrotoxic compounds: label states their renal effects may be potentiated by carboplatin', 'pi-carboplatin'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression',
        rank: 2, boxed: true,
        timing: c('Median nadir day 21 on single agent, dose-dependent and dose-limiting', 'pi-carboplatin'),
        quirk: c('Leukopenia, neutropenia and thrombocytopenia are dose-dependent and dose-limiting; anemia is cumulative and transfusion may be needed. More marrow suppression after prior therapy (especially cisplatin-containing regimens) and with impaired kidney function. Contraindicated with severe bone marrow depression or significant bleeding.', 'pi-carboplatin'),
      },
      {
        tox: 'chemo-hypersensitivity',
        rank: 1, boxed: true,
        quirk: c('Boxed warning names epinephrine, corticosteroids and antihistamines as employed to alleviate symptoms. Risk of allergic reactions including anaphylaxis is increased after previous platinum therapy. Contraindicated with a history of severe allergic reactions to cisplatin or other platinum compounds.', 'pi-carboplatin'),
      },
      {
        tox: 'chemo-extravasation',
        cite: ['pi-carboplatin'],
        quirk: c('Injection site reactions (redness, swelling, pain) and necrosis associated with extravasation have been reported postmarketing.', 'pi-carboplatin'),
      },
      {
        tox: 'chemo-neuropathy-ileus',
        cite: ['pi-carboplatin'],
        quirk: c('Peripheral neurotoxicity is infrequent; incidence is increased in patients older than 65 years and in patients previously treated with cisplatin.', 'pi-carboplatin'),
      },
    ],
  },
  {
    id: 'oxaliplatin', generic: 'oxaliplatin', brands: [], formerBrands: ['Eloxatin'], brandSource: 'fda-drugsfda', classIds: ['cyto-platinum'], label: 'pi-oxaliplatin', tier: 'full',
    cancers: ['colon-stage3-adjuvant', 'crc-advanced'],
    boxedWarning: [
      c('Hypersensitivity and anaphylaxis: serious and fatal reactions within minutes of administration and during any cycle', 'pi-oxaliplatin'),
    ],
    effects: [
      {
        tox: 'chemo-tma',
        basis: 'postmarketing',
        cite: ['pi-oxaliplatin'],
        quirk: c('Postmarketing: hemolytic uremic syndrome, immuno-allergic hemolytic anemia and immuno-allergic thrombocytopenia.', 'pi-oxaliplatin'),
      },
      {
        tox: 'chemo-hepatotoxicity',
        basis: 'postmarketing',
        cite: ['pi-oxaliplatin'],
        quirk: c('Postmarketing: sinusoidal obstruction syndrome and perisinusoidal fibrosis, which rarely may progress.', 'pi-oxaliplatin'),
      },
      {
        tox: 'chemo-nephrotoxicity',
        basis: 'postmarketing',
        cite: ['pi-oxaliplatin'],
        quirk: c('Postmarketing: acute renal failure, acute tubular necrosis and acute interstitial nephritis.', 'pi-oxaliplatin'),
      },
      {
        tox: 'chemo-diarrhea-enterocolitis',
        basis: 'postmarketing',
        cite: ['pi-oxaliplatin'],
        quirk: c('Postmarketing: severe diarrhea and vomiting resulting in hypokalemia, colitis (including Clostridium difficile diarrhea), metabolic acidosis, ileus and intestinal obstruction.', 'pi-oxaliplatin'),
      },
      {
        tox: 'chemo-hypersensitivity',
        rank: 1, boxed: true,
        quirk: c('Boxed warning: immediately and permanently discontinue for hypersensitivity reactions and treat. Grade 3 to 4 reactions including anaphylaxis occurred in 2% to 3% of colon cancer patients. Contraindicated with prior hypersensitivity to oxaliplatin or other platinum drugs. Postmarketing reports list angioedema, anaphylactic shock and laryngospasm.', 'pi-oxaliplatin'),
      },
      {
        tox: 'chemo-neuropathy-ileus',
        timing: c('Acute onset within hours or 2 days of dose, resolves within 14 days', 'pi-oxaliplatin'),
        quirk: c('Cold triggers or worsens acute symptoms; label says avoid topical ice. Acute pharyngolaryngeal dysesthesia in 1% to 2% (grade 3 to 4) of previously untreated advanced colorectal cancer patients; paresthesia and dysesthesia of hands, feet, perioral area, throat.', 'pi-oxaliplatin'),
      },
      {
        tox: 'chemo-myelosuppression',
        quirk: c('Grade 3 or 4 neutropenia in 41% to 44% of colorectal cancer patients given oxaliplatin with fluorouracil/leucovorin; sepsis, neutropenic sepsis and septic shock, including fatal outcomes, occurred.', 'pi-oxaliplatin'),
      },
      {
        tox: 'qt-prolongation',
        quirk: c('QT prolongation and ventricular arrhythmias, including fatal torsade de pointes. Avoid in congenital long QT syndrome and avoid coadministration with medicinal products known to prolong the QT interval; label advises correcting electrolyte abnormalities.', 'pi-oxaliplatin'),
      },
      {
        tox: 'chemo-pulmonary-toxicity',
        quirk: c('Pulmonary fibrosis in less than 1% of patients, which may be fatal. Withhold for unexplained respiratory symptoms until interstitial lung disease or pulmonary fibrosis is excluded.', 'pi-oxaliplatin'),
      },
      {
        tox: 'chemo-cns-toxicity',
        quirk: c('Posterior reversible encephalopathy syndrome in less than 0.1% of patients: headache, altered mental functioning, seizures, abnormal vision from blurriness to blindness, with or without hypertension. Convulsion is also listed postmarketing.', 'pi-oxaliplatin'),
      },
    ],
    alsoOnLabel: [
      c('Rhabdomyolysis: including fatal cases; label says to permanently discontinue for any signs or symptoms', 'pi-oxaliplatin'),
      c('Hemorrhage: more frequent on the oxaliplatin combination arm than fluorouracil/leucovorin alone (gastrointestinal bleeding, hematuria, epistaxis)', 'pi-oxaliplatin'),
      c('Immune-mediated thrombocytopenia: rapid onset and greater risk of bleeding observed; label says to consider discontinuing', 'pi-oxaliplatin'),
      c('Bradyarrhythmia: listed postmarketing', 'pi-oxaliplatin'),
      c('Dysphagia or dyspnea: subjective sensations without laryngospasm or bronchospasm (no stridor or wheezing) in previously treated colorectal patients', 'pi-oxaliplatin'),
      c('Delayed neuropathy: persists beyond 14 days; can occur without prior acute neuropathy', 'pi-oxaliplatin'),
      c('Vision: decreased visual acuity, visual field disturbance, optic neuritis and transient vision loss (reversible after discontinuation) listed postmarketing', 'pi-oxaliplatin'),
      c('Pancreatitis: listed postmarketing', 'pi-oxaliplatin'),
      c('Overdose: up to 825 mg given once; grade 4 thrombocytopenia, laryngospasm, intestinal obstruction, respiratory failure, severe bradycardia and death reported; supportive care', 'pi-oxaliplatin'),
      c('Anticoagulants: prolonged prothrombin time and INR, occasionally with hemorrhage, reported with fluorouracil/leucovorin; label says to monitor more often', 'pi-oxaliplatin'),
      c('QT-prolonging drugs: label says to avoid coadministration with medicinal products known to prolong the QT interval', 'pi-oxaliplatin'),
      c('Nephrotoxic drugs: platinum clearance may fall with coadministration; label says to avoid coadministration with medicinal products known to cause nephrotoxicity', 'pi-oxaliplatin'),
    ],
  },
  {
    id: 'irinotecan', generic: 'irinotecan hydrochloride', editorAliases: ['CPT-11'], brands: ['Camptosar'], brandSource: 'fda-drugsfda', aliases: ['irinotecan'], classIds: ['cyto-topoisomerase-1-inhibitor'], label: 'pi-irinotecan', tier: 'full',
    cancers: ['crc-metastatic'],
    boxedWarning: [
      c('Diarrhea: early and late forms; early diarrhea may bring cholinergic symptoms (atropine), late diarrhea can be life threatening (loperamide)', 'pi-irinotecan'),
      c('Myelosuppression: severe myelosuppression may occur', 'pi-irinotecan'),
    ],
    alsoOnLabel: [
      c('Bowel obstruction: do not treat until resolved', 'pi-irinotecan'),
      c('Regimen: outside a clinical study, do not combine with a 5-FU/LV regimen given for 4 to 5 consecutive days every 4 weeks (increased toxicity, including toxic deaths)', 'pi-irinotecan'),
      c('Performance status 2: higher rates of hospitalization, neutropenic fever, thromboembolism and early death than performance status 0 or 1', 'pi-irinotecan'),
      c('Myocardial ischemia and thromboembolism: myocardial ischemic events and thromboembolic events observed (postmarketing)', 'pi-irinotecan'),
      c('Hyponatremia: mostly with diarrhea and vomiting (postmarketing)', 'pi-irinotecan'),
      c('Pancreatitis: symptomatic pancreatitis reported (postmarketing)', 'pi-irinotecan'),
      c('Overdose: severe neutropenia and severe diarrhea were most significant; no known antidote; maximum supportive care to prevent dehydration from diarrhea and treat infection', 'pi-irinotecan'),
      c('Loperamide: not recommended beyond 48 consecutive hours at the label doses (paralytic ileus risk)', 'pi-irinotecan'),
      c('Diuretics and laxatives: label says to avoid in patients with diarrhea', 'pi-irinotecan'),
      c('Neuromuscular blockers: anticholinesterase activity may prolong suxamethonium and antagonize non-depolarizing blockade (postmarketing)', 'pi-irinotecan'),
      c('CYP3A4 and UGT1A1 inhibitors: ketoconazole, clarithromycin, itraconazole, ritonavir, voriconazole and others raise exposure; label says avoid unless no alternative', 'pi-irinotecan'),
      c("CYP3A4 inducers: phenytoin, phenobarbital, carbamazepine and St. John's wort substantially reduce exposure; label says not to give strong inducers (for example rifampin, rifabutin) unless there are no alternatives", 'pi-irinotecan'),
      c('Contraindicated: known hypersensitivity to the drug or its excipients', 'pi-irinotecan'),
    ],
    effects: [
      {
        tox: 'irinotecan-cholinergic',
        rank: 2, boxed: true,
        cite: ['pi-irinotecan'],
        quirk: c('Label says to consider atropine for cholinergic symptoms unless contraindicated. Early diarrhea occurs during or shortly after infusion; symptoms: rhinitis, salivation, miosis, lacrimation, diaphoresis, flushing, cramping; bradycardia may occur.', 'pi-irinotecan'),
      },
      {
        tox: 'chemo-diarrhea-enterocolitis',
        rank: 1, boxed: true,
        timing: c('Late diarrhea: median day 5 on 3-week dosing, day 11 on weekly dosing', 'pi-irinotecan'),
        quirk: c('Label says to monitor and replace fluid and electrolytes, start loperamide at the first loose stool, and use antibiotics for ileus, fever or severe neutropenia. Grade 3 to 4 late diarrhea in 23% to 31% on weekly dosing; may lead to dehydration, sepsis, megacolon or perforation.', 'pi-irinotecan'),
      },
      {
        tox: 'chemo-myelosuppression',
        rank: 3, boxed: true,
        quirk: c('Label says to hold for neutropenic fever. Deaths from sepsis after severe neutropenia reported. Higher risk with UGT1A1 *28/*28, *6/*6 or *6/*28 genotypes and prior pelvic or abdominal irradiation (grade 3 to 4 neutropenia 48% vs 24% on weekly dosing).', 'pi-irinotecan'),
      },
      {
        tox: 'chemo-hypersensitivity',
        cite: ['pi-irinotecan'],
        quirk: c('Severe anaphylactic or anaphylactoid reactions observed; discontinue if anaphylactic reaction occurs. Contraindicated with known hypersensitivity to the drug or its excipients.', 'pi-irinotecan'),
      },
      {
        tox: 'chemo-nephrotoxicity',
        cite: ['pi-irinotecan'],
        quirk: c('Renal impairment and acute renal failure, usually in patients who became volume depleted from severe vomiting and/or diarrhea.', 'pi-irinotecan'),
      },
      {
        tox: 'chemo-pulmonary-toxicity',
        quirk: c('Interstitial pulmonary disease-like events, including fatalities. Risk factors: pre-existing lung disease, pneumotoxic drugs, radiation therapy, colony stimulating factors.', 'pi-irinotecan'),
      },
      {
        tox: 'chemo-extravasation',
        cite: ['pi-irinotecan'],
        quirk: c('Label says to avoid extravasation and monitor the site for inflammation; if it occurs, flushing the site with sterile water and applications of ice are recommended.', 'pi-irinotecan'),
      },
    ],
  },
  {
    id: 'irinotecan-liposome', generic: 'irinotecan liposome injection', brands: ['Onivyde'], brandSource: 'fda-drugsfda', classIds: ['cyto-topoisomerase-1-inhibitor'], label: 'pi-irinotecan-liposome', tier: 'full',
    cancers: ['pancreatic-metastatic'],
    boxedWarning: [
      c('Neutropenia: severe and life-threatening, including fatal neutropenic sepsis and fatal neutropenic fever', 'pi-irinotecan-liposome'),
      c('Diarrhea: severe and life-threatening; do not give with bowel obstruction', 'pi-irinotecan-liposome'),
    ],
    alsoOnLabel: [
      c('Overdose: no treatment interventions are known to be effective', 'pi-irinotecan-liposome'),
      c("CYP3A4 inducers: avoid strong inducers (for example rifampin, phenytoin, carbamazepine, rifabutin, rifapentine, phenobarbital, St. John's wort) if possible; with non-liposomal irinotecan they substantially reduced exposure", 'pi-irinotecan-liposome'),
      c('CYP3A4 and UGT1A1 inhibitors: avoid strong inhibitors if possible; ketoconazole raised exposure to irinotecan and SN-38 with non-liposomal irinotecan', 'pi-irinotecan-liposome'),
      c('Contraindicated: severe hypersensitivity or anaphylaxis to Onivyde or irinotecan HCl', 'pi-irinotecan-liposome'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression',
        rank: 1, boxed: true,
        quirk: c('Label says to withhold for neutrophils below 1500/mm^3 or neutropenic fever. Grade 3 to 4 neutropenia 20% to 26% across trials; fatal neutropenic sepsis reported. UGT1A1*28 homozygotes are at increased risk.', 'pi-irinotecan-liposome'),
      },
      {
        tox: 'chemo-diarrhea-enterocolitis',
        rank: 2, boxed: true,
        timing: c('Early within 24 hours or late after 24 hours, severe or life-threatening', 'pi-irinotecan-liposome'),
        quirk: c('Withhold for diarrhea of grade 2 to 4 severity. Grade 3 and 4 diarrhea in 20% (NAPOLI 3) and 13% (NAPOLI-1). Label names loperamide for late onset diarrhea of any severity; for diarrhea not improving within 48 hours, local guidelines may add diphenoxylate hydrochloride plus atropine sulfate or octreotide.', 'pi-irinotecan-liposome'),
      },
      {
        tox: 'irinotecan-cholinergic',
        rank: 3, boxed: true,
        cite: ['pi-irinotecan-liposome'],
        quirk: c('Early onset diarrhea (within 24 hours) sometimes occurs with other symptoms of cholinergic reaction: rhinitis, increased salivation, flushing, bradycardia, miosis, lacrimation, diaphoresis, intestinal hyperperistalsis with abdominal cramping. Boxed warning names atropine, if not contraindicated, for early diarrhea of any severity.', 'pi-irinotecan-liposome'),
      },
      {
        tox: 'chemo-pulmonary-toxicity',
        quirk: c('Severe and fatal interstitial lung disease, including pneumonitis; postmarketing cases reported.', 'pi-irinotecan-liposome'),
      },
      {
        tox: 'chemo-hypersensitivity',
        cite: ['pi-irinotecan-liposome'],
        quirk: c('Severe reactions including anaphylactic reactions (angioedema also listed postmarketing): permanently discontinue. Contraindicated after severe hypersensitivity or anaphylaxis to Onivyde or irinotecan HCl.', 'pi-irinotecan-liposome'),
      },
    ],
  },
  {
    id: 'topotecan', generic: 'topotecan', brands: ['Hycamtin'], brandSource: 'fda-drugsfda', classIds: ['cyto-topoisomerase-1-inhibitor'], label: 'pi-topotecan', tier: 'full',
    cancers: ['ovarian', 'sclc', 'cervical'],
    boxedWarning: [
      c('Myelosuppression: severe; first cycle only if baseline neutrophils at least 1,500/mm^3 and platelets at least 100,000/mm^3 (injection and capsule labels)', 'pi-topotecan', 'pi-topotecan-capsules'),
    ],
    alsoOnLabel: [
      c('Severe bleeding: reported with thrombocytopenia (postmarketing, injection label)', 'pi-topotecan'),
      c('Hypersensitivity: allergic manifestations, anaphylactoid reactions and angioedema (postmarketing)', 'pi-topotecan', 'pi-topotecan-capsules'),
      c('Overdose: primary complication is myelosuppression; monitor closely and give supportive care', 'pi-topotecan', 'pi-topotecan-capsules'),
      c('Overdose in injection label: up to 10-fold of the recommended dose reported, with elevated hepatic enzymes, mucositis, gastrointestinal toxicity and skin toxicity', 'pi-topotecan'),
      c('Overdose in capsule label: up to 5-fold of the prescribed dose reported, with mucositis', 'pi-topotecan-capsules'),
      c('P-glycoprotein or BCRP inhibitors: increase topotecan exposure and may raise the risk of adverse reactions; label says to avoid concomitant use with the capsules', 'pi-topotecan-capsules'),
      c('Contraindicated: history of severe hypersensitivity to topotecan (reactions have included anaphylactoid reactions)', 'pi-topotecan', 'pi-topotecan-capsules'),
    ],
    effects: [
      {
        tox: 'chemo-myelosuppression',
        rank: 1, boxed: true,
        timing: c('Capsule median nadir day 15, neutrophils and platelets', 'pi-topotecan-capsules'),
        quirk: c('Injection: grade 4 neutropenia 78% (median 7 days), febrile neutropenia 5%, sepsis 4% (fatal 1%), grade 4 thrombocytopenia 27%. Capsules: grade 4 neutropenia 32%, febrile neutropenia 4%, septic death 1%.', 'pi-topotecan', 'pi-topotecan-capsules'),
      },
      {
        tox: 'chemo-diarrhea-enterocolitis',
        timing: c('Capsule diarrhea median onset day 9, grade 2 to 4', 'pi-topotecan-capsules'),
        quirk: c('Fatal typhlitis (neutropenic enterocolitis) can occur; consider it with fever, neutropenia and abdominal pain. Capsules: severe diarrhea requiring hospitalization, 22% (grade 3 in 4%); can occur with neutropenia. Postmarketing: GI perforation.', 'pi-topotecan', 'pi-topotecan-capsules'),
      },
      {
        tox: 'chemo-pulmonary-toxicity',
        quirk: c('Interstitial lung disease, including fatalities. Risk factors: history of ILD, pulmonary fibrosis, lung cancer, thoracic radiation, pneumotoxic drugs or colony stimulating factors.', 'pi-topotecan', 'pi-topotecan-capsules'),
      },
      {
        tox: 'chemo-extravasation',
        cite: ['pi-topotecan'],
        quirk: c('Injection label: extravasation, including severe cases, can occur; if signs or symptoms occur, stop administration immediately and institute recommended management procedures.', 'pi-topotecan'),
      },
    ],
  },
  {
    id: 'etoposide', generic: 'etoposide', brands: ['Etopophos', 'Avopef', 'Etopophos Preservative Free', 'Vepesid'], formerBrands: ['Toposar'], brandSource: 'fda-drugsfda', aliases: ['etoposide phosphate', 'VP-16'], classIds: ['cyto-topoisomerase-2-inhibitor'], label: 'pi-etoposide', tier: 'full',
    cancers: ['testicular', 'sclc'],
    boxedWarning: [
      c('Myelosuppression: severe, with resulting infection or bleeding (etoposide injection label; Etopophos has no boxed warning)', 'pi-etoposide'),
    ],
    alsoOnLabel: [
      c('Wrong route: do not give Etopophos by bolus intravenous injection', 'pi-etopophos'),
      c('Rapid injection: hypotension in 1% to 2% of patients; etoposide injection should be given only by slow infusion (usually over 30 to 60 minutes); it usually responds to stopping the infusion and fluids', 'pi-etoposide'),
      c('High-dose renal failure: reversible acute renal failure with high-dose Etopophos plus total body irradiation; contains dextran 40 (postmarketing)', 'pi-etopophos'),
      c('Seizure: infrequently reported with etoposide injection, occasionally with allergic reactions', 'pi-etoposide'),
      c('Vision: transient cortical blindness and optic neuritis infrequently reported with etoposide injection', 'pi-etoposide'),
      c('Hepatic toxicity and metabolic acidosis: reported with etoposide injection, generally at higher than recommended doses', 'pi-etoposide'),
      c('Overdose: no proven antidote for etoposide injection; no antidote established for Etopophos', 'pi-etoposide', 'pi-etopophos'),
      c('Overdose in Etopophos label: animal studies suggest overdosage may result in neurotoxicity', 'pi-etopophos'),
      c('Warfarin: Etopophos co-administration can elevate INR; label says to measure INR frequently', 'pi-etopophos'),
      c('Contraindicated: previous hypersensitivity to etoposide or a component (injection); prior severe hypersensitivity to etoposide products (Etopophos)', 'pi-etoposide', 'pi-etopophos'),
    ],
    effects: [
      {
        tox: 'chemo-severe-skin',
        cite: ['pi-etoposide'],
        quirk: c('Etoposide injection label: Stevens-Johnson syndrome and toxic epidermal necrolysis have been infrequently reported.', 'pi-etoposide'),
      },
      {
        tox: 'chemo-pulmonary-toxicity',
        cite: ['pi-etoposide'],
        quirk: c('Etoposide injection label: interstitial pneumonitis/pulmonary fibrosis infrequently reported.', 'pi-etoposide'),
      },
      {
        tox: 'chemo-myelosuppression',
        rank: 1, boxed: true,
        timing: c('Granulocyte nadir 7 to 14 days after dosing, platelet nadir 9 to 16 days, recovery usually complete by day 20 (etoposide injection label)', 'pi-etoposide'),
        cite: ['pi-etoposide', 'pi-etopophos'],
        quirk: c('Injection label: myelosuppression can be fatal; withhold if platelets fall below 50,000/mm^3 or neutrophils below 500/mm^3. Etopophos label: fatal infections (including Pneumocystis jirovecii pneumonia) and bleeding.', 'pi-etoposide', 'pi-etopophos'),
      },
      {
        tox: 'chemo-hypersensitivity',
        cite: ['pi-etoposide', 'pi-etopophos'],
        quirk: c('Stop the infusion at once; label names pressor agents, corticosteroids, antihistamines or volume expanders. Injection: anaphylactic-like reactions, can be fatal; higher rates in children at high infusion concentrations. Etopophos: rash, urticaria, anaphylaxis. Contraindicated after prior hypersensitivity (any, injection; severe, Etopophos).', 'pi-etoposide', 'pi-etopophos'),
      },
      {
        tox: 'chemo-extravasation',
        cite: ['pi-etopophos', 'pi-etoposide'],
        quirk: c('Etopophos label: extravasation may result in swelling, pain, cellulitis and necrosis, including skin necrosis. Etoposide injection label: extravasation with swelling reported postmarketing; rarely associated with necrosis and venous induration.', 'pi-etopophos', 'pi-etoposide'),
      },
    ],
  },
];
