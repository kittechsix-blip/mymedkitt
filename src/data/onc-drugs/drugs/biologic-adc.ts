import type { OncDrug, DrugClass, OncSource, Cancer, Cited } from '../types.js';

// Antibody-drug conjugates and related toxin fusion proteins, from the DailyMed labels (SPL) read 2026-11-18.
// Every statement is taken from the label named in its citation. Dosing lives on management pages, not here.
const c = (v: string, ...cite: string[]): Cited => ({ v, cite });

// ---------------------------------------------------------------- ado-trastuzumab emtansine
const kadcyla: OncDrug = {
  id: 'ado-trastuzumab-emtansine', generic: 'ado-trastuzumab emtansine', editorAliases: ['T-DM1'], brands: ['Kadcyla'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-her2'], label: 'pi-ado-trastuzumab-emtansine', tier: 'full',
  mechanism: c('HER2-targeted antibody-drug conjugate: after binding HER2 and internalization, releases the microtubule inhibitor DM1 inside the cell, disrupting microtubule networks and causing cell cycle arrest and apoptotic cell death.', 'pi-ado-trastuzumab-emtansine'),
  cancers: ['breast-her2-positive-metastatic-prior-trastuzumab-taxane', 'breast-her2-positive-early-residual-disease'],
  boxedWarning: [
    c('Hepatotoxicity: serious hepatotoxicity reported, including liver failure and death; monitor transaminases and bilirubin before treatment and before each dose; reduce dose or discontinue as appropriate for increased transaminases or total bilirubin', 'pi-ado-trastuzumab-emtansine'),
    c('Cardiac toxicity: may reduce left ventricular ejection fraction; evaluate left ventricular function before and during treatment; withhold for a clinically significant decrease in left ventricular function', 'pi-ado-trastuzumab-emtansine'),
    c('Embryo-fetal toxicity: exposure during pregnancy can result in embryo-fetal harm; advise patients of the risk and the need for effective contraception', 'pi-ado-trastuzumab-emtansine'),
  ],
  alsoOnLabel: [
    c('Do not substitute: the label states not to substitute trastuzumab for or with Kadcyla', 'pi-ado-trastuzumab-emtansine'),
    c('Prior trastuzumab infusion reaction: not studied, and not recommended, in patients whose trastuzumab was permanently discontinued for infusion-related reactions or hypersensitivity', 'pi-ado-trastuzumab-emtansine'),
    c('Nodular regenerative hyperplasia: 5 of 1624 patients (one fatal); consider with portal hypertension signs and normal transaminases; permanently discontinue on diagnosis', 'pi-ado-trastuzumab-emtansine'),
    c('Overdose: no known antidote; at about two times the recommended dose, grade 2 thrombocytopenia (resolved in 4 days) and one death, causality not established', 'pi-ado-trastuzumab-emtansine'),
    c('Strong CYP3A4 inhibitors: avoid (ketoconazole, itraconazole, clarithromycin, ritonavir, voriconazole and others); DM1 exposure rises; if unavoidable, monitor closely', 'pi-ado-trastuzumab-emtansine'),
    c('Anticoagulants and antiplatelets: bleeding occurred on these agents; use caution and monitor closely, also patients with platelets below 100,000/mm3', 'pi-ado-trastuzumab-emtansine'),
  ],
  effects: [
    {
      tox: 'drug-hepatotoxicity', rank: 1, boxed: true, cite: ['pi-ado-trastuzumab-emtansine'],
      quirk: c('Serious hepatotoxicity including 3 fatal cases in 1624 trial patients, with severe drug-induced liver injury and hepatic encephalopathy; usually asymptomatic transient transaminase rises. Label says permanently discontinue for transaminases above 3 times the upper limit of normal with concomitant total bilirubin above 2 times the upper limit of normal.', 'pi-ado-trastuzumab-emtansine'),
    },
    {
      tox: 'drug-cardiotoxicity', rank: 2, boxed: true, cite: ['pi-ado-trastuzumab-emtansine'],
      quirk: c('Left ventricular dysfunction in 1.8% (metastatic trial) and 0.4% (adjuvant trial) of patients; serious heart failure cases, none fatal; LVEF below 40% observed. Label says to withhold and repeat LVEF within about 3 weeks when LVEF falls below the label thresholds for the setting, and permanently discontinue if not improved or further declined.', 'pi-ado-trastuzumab-emtansine'),
    },
    {
      tox: 'drug-lung-toxicity', cite: ['pi-ado-trastuzumab-emtansine'],
      quirk: c('Permanently discontinue for ILD or pneumonitis (radiation pneumonitis: grade 3 or higher, or grade 2 not responding). ILD including pneumonitis, some leading to ARDS or death: 0.8% to 1.2%; radiation pneumonitis 1.8%.', 'pi-ado-trastuzumab-emtansine'),
    },
    {
      tox: 'drug-hemorrhage', cite: ['pi-ado-trastuzumab-emtansine'],
      quirk: c('Central nervous system, respiratory and gastrointestinal hemorrhage, some fatal; any-grade hemorrhage 32% (metastatic trial) and 29% (adjuvant trial), grade 3 or higher 1.8% and 0.4%, including one fatal intracranial hemorrhage. Some patients were on anticoagulant or antiplatelet therapy or had thrombocytopenia; others had no known added risk factor.', 'pi-ado-trastuzumab-emtansine'),
    },
    {
      tox: 'chemo-myelosuppression',
      timing: c('Platelet nadir by day 8 in trials, grade 3 or higher thrombocytopenia in 15% (EMILIA, metastatic) and 6% (KATHERINE, adjuvant), and in 45% and 19% of Asian patients; most patients had grade 1 or 2 events that generally improved to grade 0 or 1 by the next scheduled dose', 'pi-ado-trastuzumab-emtansine'),
      quirk: c('Thrombocytopenia in 494 of 1624 patients (145 grade 3 or higher); higher incidence and severity in Asian patients. Label says do not give Kadcyla for platelets below 50,000/mm3 until recovery to 75,000/mm3 or above; not studied with platelets below 100,000/mm3 at start.', 'pi-ado-trastuzumab-emtansine'),
    },
    {
      tox: 'chemo-hypersensitivity', cite: ['pi-ado-trastuzumab-emtansine'],
      quirk: c('Interrupt for a severe reaction, permanently discontinue for a life-threatening one; observe closely, especially at the first infusion; keep treatment and emergency equipment ready. Infusion reactions 1.4% to 1.6% (flushing, chills, dyspnea, hypotension, bronchospasm); one serious anaphylactic-like reaction.', 'pi-ado-trastuzumab-emtansine'),
    },
    {
      tox: 'drug-neuropathy', cite: ['pi-ado-trastuzumab-emtansine'],
      quirk: c('Peripheral neuropathy, mainly grade 1 and sensory: 435 of 1624 patients, 26 grade 3 or higher. Label says temporarily discontinue for grade 3 or 4 until resolution to grade 2 or lower.', 'pi-ado-trastuzumab-emtansine'),
    },
    {
      tox: 'chemo-extravasation', cite: ['pi-ado-trastuzumab-emtansine'],
      quirk: c('Reactions secondary to extravasation seen in trials, mostly within 24 hours of infusion and usually mild (erythema, tenderness, skin irritation, pain, swelling). Label says specific treatment for extravasation is unknown; monitor the infusion site for subcutaneous infiltration. Postmarketing: skin/tissue necrosis after extravasation.', 'pi-ado-trastuzumab-emtansine'),
    },
    {
      tox: 'chemo-tumor-lysis', cite: ['pi-ado-trastuzumab-emtansine'], basis: 'postmarketing',
      quirk: c('Postmarketing: tumor lysis syndrome listed among spontaneous post-approval reports.', 'pi-ado-trastuzumab-emtansine'),
    },
  ],
};

// ---------------------------------------------------------------- fam-trastuzumab deruxtecan
const enhertu: OncDrug = {
  id: 'fam-trastuzumab-deruxtecan', generic: 'fam-trastuzumab deruxtecan-nxki', editorAliases: ['T-DXd'], brands: ['Enhertu'], aliases: ['fam-trastuzumab deruxtecan-nxki'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-her2'], label: 'pi-fam-trastuzumab-deruxtecan', tier: 'full',
  mechanism: c('HER2-directed antibody-drug conjugate: after binding HER2, internalization and linker cleavage, releases the membrane-permeable topoisomerase I inhibitor DXd, which causes DNA damage and apoptotic cell death.', 'pi-fam-trastuzumab-deruxtecan'),
  cancers: ['breast-her2-positive-early', 'breast-her2-positive-metastatic', 'breast-her2-low-ultralow-metastatic', 'nsclc-her2-mutant', 'gastric-her2-positive', 'solid-her2-ihc3plus'],
  boxedWarning: [
    c('Interstitial lung disease: ILD and pneumonitis, including severe, life-threatening and fatal cases; investigate cough, dyspnea, fever and new or worsening respiratory symptoms promptly; permanently discontinue in all patients with grade 2 or higher ILD/pneumonitis', 'pi-fam-trastuzumab-deruxtecan'),
    c('Embryo-fetal toxicity: exposure during pregnancy can cause embryo-fetal harm; advise patients of the risk and the need for effective contraception', 'pi-fam-trastuzumab-deruxtecan'),
  ],
  alsoOnLabel: [
    c('Do not substitute: the label states not to substitute Enhertu for or with trastuzumab or ado-trastuzumab emtansine', 'pi-fam-trastuzumab-deruxtecan'),
    c('Radiation pneumonitis: with adjuvant radiotherapy after neoadjuvant therapy it occurred in 31% of Enhertu patients in DESTINY-Breast05, all grade 1 (27%) or grade 2 (4.9%)', 'pi-fam-trastuzumab-deruxtecan'),
    c('Infusion-related reactions: listed at 0.5% to 4.7% across the trial narratives, including hypersensitivity', 'pi-fam-trastuzumab-deruxtecan'),
    c('Myocarditis: serious in over 1% of 101 patients (DESTINY-Lung02) (6.1)', 'pi-fam-trastuzumab-deruxtecan'),
    c('Intestinal obstruction: serious in over 1% of 234 patients with HER2-positive breast cancer (pooled analysis) (6.1)', 'pi-fam-trastuzumab-deruxtecan'),
    c('Other fatal reactions in trials: pulmonary embolism, one fatal case with pertuzumab (DESTINY-Breast09)', 'pi-fam-trastuzumab-deruxtecan'),
  ],
  effects: [
    {
      tox: 'drug-lung-toxicity', rank: 1, boxed: true,
      timing: c('Monotherapy: ILD median onset 5.5 months, range 0.9 to 31.5 months; 8.0 months with pertuzumab, 2.7 months after the THP sequence, 2.8 months in gastric cancer', 'pi-fam-trastuzumab-deruxtecan'),
      quirk: c('Withhold for grade 1 and consider steroids; for grade 2 or greater start systemic steroids (at least 14 days, taper over 4 weeks) and permanently discontinue. ILD 12% on monotherapy (0.9% fatal), 12% with pertuzumab, 4.4% after THP, 10% in gastric cancer; higher grade 1-2 rate in moderate renal impairment.', 'pi-fam-trastuzumab-deruxtecan'),
    },
    {
      tox: 'chemo-myelosuppression',
      timing: c('Monotherapy: low neutrophils median 22 days, range 2 to 939 days; 22 days with pertuzumab, 42 days after the THP sequence, 16 days in gastric cancer', 'pi-fam-trastuzumab-deruxtecan'),
      quirk: c('Severe neutropenia including febrile neutropenia. Decreased neutrophil count in 65% of monotherapy patients (19% grade 3 or 4); febrile neutropenia in 1% on monotherapy, 2.6% with pertuzumab, 4.8% in gastric cancer. Label says monitor blood counts before treatment and before each dose; dose interruption or reduction may be needed.', 'pi-fam-trastuzumab-deruxtecan'),
    },
    {
      tox: 'drug-cardiotoxicity', cite: ['pi-fam-trastuzumab-deruxtecan'],
      quirk: c('Left ventricular dysfunction in 4.6% of monotherapy patients (0.6% grade 3 or 4); LVEF decrease in 11% with pertuzumab. Label says permanently discontinue for LVEF below 40% or an absolute decrease from baseline above 20% (confirmed), or for symptomatic congestive heart failure; not studied with a history of clinically significant cardiac disease or LVEF below 50%.', 'pi-fam-trastuzumab-deruxtecan'),
    },
  ],
};

// ---------------------------------------------------------------- sacituzumab govitecan
const trodelvy: OncDrug = {
  id: 'sacituzumab-govitecan', generic: 'sacituzumab govitecan-hziy', brands: ['Trodelvy'], aliases: ['sacituzumab govitecan-hziy'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-trop2'], label: 'pi-sacituzumab-govitecan', tier: 'full',
  mechanism: c('Trop-2-directed antibody-drug conjugate: after binding Trop-2 and internalization, releases SN-38 by linker hydrolysis; SN-38 is a topoisomerase I inhibitor that prevents re-ligation of single-strand breaks, causing DNA damage, apoptosis and cell death.', 'pi-sacituzumab-govitecan'),
  cancers: ['tnbc', 'breast-hr-positive-her2-negative-metastatic'],
  boxedWarning: [
    c('Neutropenia: severe, life-threatening or fatal; withhold for absolute neutrophil count below 1500/mm3 or neutropenic fever; primary G-CSF prophylaxis recommended for all patients at increased risk of febrile neutropenia; start anti-infective treatment for febrile neutropenia without delay', 'pi-sacituzumab-govitecan'),
    c('Severe diarrhea: monitor, give fluid and electrolytes; at onset evaluate for infectious causes and, if negative, promptly start loperamide; if severe, withhold until resolved to grade 1 or lower and reduce subsequent doses', 'pi-sacituzumab-govitecan'),
  ],
  alsoOnLabel: [
    c('Do not substitute: the label states not to substitute Trodelvy for, or use it with, other drugs containing irinotecan or its active metabolite SN-38', 'pi-sacituzumab-govitecan'),
    c('Reduced UGT1A1 activity: *28 homozygous patients have more neutropenia, febrile neutropenia and anemia; withhold or discontinue for early-onset or unusually severe reactions', 'pi-sacituzumab-govitecan'),
    c('Nausea and vomiting: emetogenic, severe nausea and vomiting possible (grade 3-4 nausea 3%, vomiting 2%); withhold for grade 3 nausea or grade 3-4 vomiting', 'pi-sacituzumab-govitecan'),
    c('Interstitial lung disease: accounted for 1.1% of the 3.6% permanent discontinuations for adverse reactions in the ASCENT-03 study', 'pi-sacituzumab-govitecan'),
    c('Overdose: planned doses about 1.8 times the maximum recommended dose in a clinical trial produced a higher incidence of severe neutropenia', 'pi-sacituzumab-govitecan'),
    c('UGT1A1 inhibitors and inducers: the label says to avoid both with Trodelvy; SN-38 is a UGT1A1 substrate, so inhibitors may increase adverse reactions and inducers may reduce SN-38 exposure', 'pi-sacituzumab-govitecan'),
    c('Contraindicated: a severe hypersensitivity reaction to Trodelvy', 'pi-sacituzumab-govitecan'),
    c('Other fatal reactions in trials: pulmonary embolism, 1 of 221 (with pembrolizumab, first-line TNBC) and 1 of 268 (HR-positive breast cancer)', 'pi-sacituzumab-govitecan'),
  ],
  effects: [
    {
      tox: 'chemo-myelosuppression', rank: 1, boxed: true,
      timing: c('Median time to first neutropenia is 19 days, range 1 to 1022 days; 9 days if UGT1A1*28 homozygous, 21 days if wild-type', 'pi-sacituzumab-govitecan'),
      quirk: c('Withhold for ANC below 1500/mm3 on day 1, below 1000/mm3 on day 8, or neutropenic fever; G-CSF for treatment and primary prophylaxis in patients at increased risk. Neutropenia 64% (grade 3-4 48%), febrile 6%, neutropenic colitis 1.4%; grade 3-4 neutropenia 57% if UGT1A1*28 homozygous versus 41% wild-type.', 'pi-sacituzumab-govitecan'),
    },
    {
      tox: 'drug-diarrhea-colitis', rank: 2, boxed: true, cite: ['pi-sacituzumab-govitecan'],
      quirk: c('Evaluate for infection at onset; if negative start loperamide with fluid and electrolytes; withhold for grade 3-4 until grade 1 or lower. Atropine premedication for a cholinergic response. Diarrhea 62% (grade 3-4 10%); one intestinal perforation; dehydration with acute kidney injury in 0.6%.', 'pi-sacituzumab-govitecan'),
    },
    {
      tox: 'chemo-hypersensitivity', cite: ['pi-sacituzumab-govitecan'],
      quirk: c('Premedicate; monitor during and at least 30 minutes after infusion; keep anaphylaxis medications and equipment ready; permanently discontinue for grade 4 reactions. Hypersensitivity 28% (13% within 24 hours), grade 3-4 1.5%, anaphylaxis below 0.1%; cardiac arrest, hypotension, angioedema reported.', 'pi-sacituzumab-govitecan'),
    },
  ],
};

// ---------------------------------------------------------------- datopotamab deruxtecan
const datroway: OncDrug = {
  id: 'datopotamab-deruxtecan', generic: 'datopotamab deruxtecan-dlnk', brands: ['Datroway'], aliases: ['datopotamab deruxtecan-dlnk'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-trop2'], label: 'pi-datopotamab-deruxtecan', tier: 'full',
  mechanism: c('Trop-2-directed antibody-drug conjugate: after binding Trop-2 and internalization, linker cleavage releases DXd, a membrane-permeable topoisomerase I inhibitor that causes DNA damage and apoptotic cell death.', 'pi-datopotamab-deruxtecan'),
  cancers: ['nsclc-egfr-mutated', 'tnbc', 'breast-hr-positive-her2-negative-metastatic'],
  alsoOnLabel: [
    c('Stomatitis: 63% (8% grade 3); steroid mouthwash and ice chips during infusion; withhold, reduce or permanently discontinue by severity', 'pi-datopotamab-deruxtecan'),
    c('Infusion-related reactions: listed, including anaphylactic reaction, in under 10% of patients in the triple-negative breast cancer study', 'pi-datopotamab-deruxtecan'),
  ],
  effects: [
    {
      tox: 'drug-lung-toxicity',
      timing: c('Median ILD onset is 1.4 months in NSCLC, range 0.2 to 9 months; 5.3 months in breast cancer, range 1.1 to 19.3 months', 'pi-datopotamab-deruxtecan'),
      quirk: c('Withhold for suspected ILD; permanently discontinue if grade 2 or greater is confirmed; steroids for symptomatic ILD (at least 14 days, then taper). NSCLC: 7%, fatal in 1.7%; breast cancer: 3.0%, fatal in 0.2%. Systemic steroids were needed in 79% and 64%.', 'pi-datopotamab-deruxtecan'),
    },
    {
      tox: 'drug-ocular-toxicity',
      timing: c('Median onset of eye reactions is 2.3 months, range 0.03 to 30 months', 'pi-datopotamab-deruxtecan'),
      quirk: c('Use preservative-free lubricant drops at least four times daily; avoid contact lenses; refer promptly for any new or worsening eye symptom; withhold, reduce or discontinue by severity. Ocular reactions 38% (dry eye 18%, keratitis 16%); grade 3 in 3.1%, grade 4 in 0.3%.', 'pi-datopotamab-deruxtecan'),
    },
  ],
};

// ---------------------------------------------------------------- enfortumab vedotin
const padcev: OncDrug = {
  id: 'enfortumab-vedotin', generic: 'enfortumab vedotin-ejfv', brands: ['Padcev'], aliases: ['enfortumab vedotin-ejfv'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-vedotin'], label: 'pi-enfortumab-vedotin', tier: 'full',
  mechanism: c('Nectin-4-directed antibody-drug conjugate: after binding Nectin-4 and internalization, proteolytic cleavage releases MMAE, a microtubule-disrupting agent that induces cell cycle arrest and apoptosis.', 'pi-enfortumab-vedotin'),
  cancers: ['mibc', 'urothelial-locally-advanced-metastatic'],
  boxedWarning: [
    c('Serious skin reactions: severe and fatal cutaneous reactions including Stevens-Johnson syndrome (SJS) and toxic epidermal necrolysis (TEN), mainly in the first cycle but possible later; immediately withhold for suspected SJS, TEN or severe skin reactions and consider specialized care; permanently discontinue for confirmed SJS or TEN, or grade 4 or recurrent grade 3 skin reactions', 'pi-enfortumab-vedotin'),
  ],
  alsoOnLabel: [
    c('With pembrolizumab: myasthenia gravis, fatal in 0.6% to 0.8% in the studies; myositis 2.5% in the urothelial study', 'pi-enfortumab-vedotin'),
    c('With pembrolizumab: serious acute kidney injury in 5% to 7%; hematuria and urinary retention also serious', 'pi-enfortumab-vedotin'),
    c('Dual P-gp/CYP3A4 inhibitors: dual P-gp and strong CYP3A4 inhibitors may increase unconjugated MMAE exposure and the incidence or severity of toxicities; monitor closely for signs of toxicity', 'pi-enfortumab-vedotin'),
    c('Other fatal reactions in trials: intracranial hemorrhage and myocardial infarction, each 1.1% of adjuvant-phase patients given pembrolizumab (EV-303)', 'pi-enfortumab-vedotin'),
  ],
  effects: [
    {
      tox: 'drug-severe-skin', rank: 1, boxed: true,
      timing: c('Single agent: severe skin median 0.6 months, range 0.1 to 8 months; 0.6 months with pembrolizumab in muscle-invasive bladder cancer (range 0.1 to 24), 1.7 months with pembrolizumab in locally advanced or metastatic urothelial cancer', 'pi-enfortumab-vedotin'),
      quirk: c('Withhold and refer for suspected SJS, TEN or grade 3; permanently discontinue for confirmed SJS or TEN, grade 4 or recurrent grade 3; topical steroids and antihistamines may help. Skin reactions 58% single agent (grade 3-4 14%), 65% to 70% with pembrolizumab; fatal TEN and fatal bullous dermatitis reported with pembrolizumab. Postmarketing: epidermal necrosis, SJS, TEN.', 'pi-enfortumab-vedotin'),
    },
    {
      tox: 'drug-hyperglycemia', rank: 2,
      timing: c('Single agent: hyperglycemia median 0.5 months, range 0 to 20 months', 'pi-enfortumab-vedotin'),
      quirk: c('Monitor glucose closely if diabetes or hyperglycemia risk; withhold if glucose is above 250 mg/dL. Hyperglycemia and ketoacidosis, including fatal events, with or without prior diabetes; single agent 17% (grade 3-4 7%); higher with higher BMI or A1C; 5% needed insulin.', 'pi-enfortumab-vedotin'),
    },
    {
      tox: 'drug-lung-toxicity',
      timing: c('Single agent: pneumonitis/ILD median 2.9 months, range 0.6 to 6 months; with pembrolizumab 3.2 months in muscle-invasive disease and 4 months in metastatic disease', 'pi-enfortumab-vedotin'),
      quirk: c('Monitor for hypoxia, cough, dyspnea; exclude other causes; withhold for grade 2 and consider dose reduction; permanently discontinue for grade 3 or 4. Severe or fatal pneumonitis/ILD: 3% single agent, 7% to 10% with pembrolizumab (two fatal events in the metastatic study).', 'pi-enfortumab-vedotin'),
    },
    {
      tox: 'drug-neuropathy',
      timing: c('Single agent: grade 2+ neuropathy median 4.9 mo, range 0.1 to 20 months; 4.9 months with pembrolizumab in muscle-invasive disease, 6 months with pembrolizumab in metastatic disease', 'pi-enfortumab-vedotin'),
      quirk: c('Peripheral neuropathy in 53% of single-agent patients (sensory 38%, muscular weakness 8%, motor 7%), grade 3-4 in 5%, with or without pre-existing neuropathy; most had residual neuropathy at last evaluation. Label says consider dose interruption or reduction and permanently discontinue for grade 3 or higher.', 'pi-enfortumab-vedotin'),
    },
    {
      tox: 'drug-ocular-toxicity',
      timing: c('Single agent: eye symptoms median 1.7 months, range 0 to 30.6 months', 'pi-enfortumab-vedotin'),
      quirk: c('Monitor for eye symptoms; consider artificial tears, an eye exam if symptoms occur or persist, topical steroids after exam, and dose interruption or reduction for symptomatic disorders. Ocular disorders 40% of examined single-agent patients, mostly corneal; dry eye 30%, blurred vision 10%.', 'pi-enfortumab-vedotin'),
    },
    {
      tox: 'chemo-extravasation', cite: ['pi-enfortumab-vedotin'],
      quirk: c('Ensure good venous access; if extravasation occurs stop the infusion and monitor. Skin and soft tissue reactions in 1% (0.3% grade 3-4), possibly delayed with worsening for 2 to 7 days; secondary cellulitis, bullae or exfoliation in 0.3%.', 'pi-enfortumab-vedotin'),
    },
  ],
};

// ---------------------------------------------------------------- brentuximab vedotin
const adcetris: OncDrug = {
  id: 'brentuximab-vedotin', generic: 'brentuximab vedotin', brands: ['Adcetris'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-vedotin'], label: 'pi-brentuximab-vedotin', tier: 'full',
  mechanism: c('CD30-directed antibody-drug conjugate: after binding CD30-expressing cells and internalization, MMAE is released by proteolytic cleavage, disrupting the microtubule network and inducing cell cycle arrest and apoptotic death.', 'pi-brentuximab-vedotin'),
  cancers: ['chl', 'salcl', 'ptcl-cd30', 'pcalcl-mf', 'lbcl-relapsed-refractory'],
  boxedWarning: [
    c('Progressive multifocal leukoencephalopathy: JC virus infection resulting in PML and death can occur', 'pi-brentuximab-vedotin'),
  ],
  alsoOnLabel: [
    c('Hepatic impairment: grade 3 or higher reactions and deaths were more frequent with moderate (Child-Pugh B) or severe (Child-Pugh C) hepatic impairment; the label says to avoid use', 'pi-brentuximab-vedotin'),
    c('Severe renal impairment: grade 3 or higher reactions and deaths were more frequent (creatinine clearance below 30 mL/min); the label says to avoid use', 'pi-brentuximab-vedotin'),
    c('Overdose: no known antidote; monitor closely for adverse reactions, particularly neutropenia, and give supportive treatment', 'pi-brentuximab-vedotin'),
    c('Bleomycin: contraindicated with concomitant bleomycin because of pulmonary toxicity (interstitial infiltration and/or inflammation)', 'pi-brentuximab-vedotin'),
    c('Strong CYP3A4 inhibitors: ketoconazole, a potent CYP3A4 inhibitor, increased MMAE exposure and may increase adverse reactions; monitor closely when Adcetris is given with strong CYP3A4 inhibitors', 'pi-brentuximab-vedotin'),
  ],
  effects: [
    {
      tox: 'serious-infection', rank: 1, boxed: true,
      timing: c('Some PML cases begin within 3 months, counted from initial exposure; onset otherwise varies and fatal cases are reported', 'pi-brentuximab-vedotin'),
      quirk: c('Some PML cases began within 3 months; consider PML for any new neurologic sign, hold dosing if suspected, discontinue if confirmed; fatal cases reported. Serious and opportunistic infections (pneumonia, bacteremia, sepsis or septic shock) also reported, some fatal; monitor for bacterial, fungal or viral infection.', 'pi-brentuximab-vedotin'),
    },
    {
      tox: 'chemo-myelosuppression', cite: ['pi-brentuximab-vedotin'],
      quirk: c('Primary G-CSF prophylaxis from cycle 1 in the combination settings the label lists; monitor counts before each dose; consider delay, reduction or discontinuation for grade 3 or 4 neutropenia. Fatal and serious febrile neutropenia; prolonged severe neutropenia and grade 3-4 thrombocytopenia or anemia.', 'pi-brentuximab-vedotin'),
    },
    {
      tox: 'chemo-hypersensitivity', cite: ['pi-brentuximab-vedotin'],
      quirk: c('Infusion-related reactions, including anaphylaxis. Label says that if anaphylaxis occurs, immediately and permanently discontinue and give appropriate medical therapy; for an infusion-related reaction, interrupt the infusion and manage appropriately; premedicate patients with a prior infusion-related reaction (may include acetaminophen, an antihistamine and a corticosteroid).', 'pi-brentuximab-vedotin'),
    },
    {
      tox: 'drug-neuropathy',
      timing: c('Monotherapy neuropathy median onset 3 months, range 0 to 12 months; 2 months with chemotherapy combinations', 'pi-brentuximab-vedotin'),
      quirk: c('Peripheral neuropathy, predominantly sensory with some motor cases, cumulative: any grade in 62% on monotherapy (14% had no improvement at last evaluation) and 67% with AVD. Label says new or worsening neuropathy may require a delay, dose change or discontinuation.', 'pi-brentuximab-vedotin'),
    },
    {
      tox: 'drug-hepatotoxicity', cite: ['pi-brentuximab-vedotin'],
      quirk: c('Monitor liver enzymes and bilirubin; new, worsening or recurrent hepatotoxicity may need delay, dose change or discontinuation. Fatal and serious hepatocellular injury, after the first dose or rechallenge; higher risk with pre-existing liver disease or elevated baseline enzymes.', 'pi-brentuximab-vedotin'),
    },
    {
      tox: 'drug-lung-toxicity', cite: ['pi-brentuximab-vedotin'],
      quirk: c('Fatal and serious noninfectious pulmonary toxicity including pneumonitis, interstitial lung disease and ARDS. Label says for new or worsening pulmonary symptoms (cough, dyspnea) to hold dosing during evaluation and until symptomatic improvement. Contraindicated with bleomycin.', 'pi-brentuximab-vedotin'),
    },
    {
      tox: 'drug-severe-skin', cite: ['pi-brentuximab-vedotin'],
      quirk: c('Fatal and serious cases of SJS and TEN. Label says that if SJS or TEN occurs, discontinue and give appropriate medical therapy.', 'pi-brentuximab-vedotin'),
    },
    {
      tox: 'drug-pancreatitis', cite: ['pi-brentuximab-vedotin'],
      quirk: c('Fatal and serious acute pancreatitis reported.', 'pi-brentuximab-vedotin'),
    },
    {
      tox: 'drug-gi-perforation', cite: ['pi-brentuximab-vedotin'],
      quirk: c('Fatal and serious GI complications: perforation, hemorrhage, erosion, ulcer, intestinal obstruction, enterocolitis, neutropenic colitis and ileus; lymphoma with pre-existing GI involvement may increase perforation risk. Label says for new or worsening GI symptoms, including severe abdominal pain, perform a prompt diagnostic evaluation and treat appropriately.', 'pi-brentuximab-vedotin'),
    },
    {
      tox: 'drug-hyperglycemia', rank: 2,
      timing: c('Monotherapy: hyperglycemia median 1 month, range 0 to 10 months', 'pi-brentuximab-vedotin'),
      quirk: c('Serious hyperglycemia: new-onset, exacerbation of pre-existing diabetes, and ketoacidosis, including fatal outcomes; any grade in 8% on monotherapy (grade 3 or 4 in 6%), more often with high body mass index or diabetes. Label says monitor serum glucose and give anti-hyperglycemic medications as clinically indicated.', 'pi-brentuximab-vedotin'),
    },
    {
      tox: 'chemo-tumor-lysis', cite: ['pi-brentuximab-vedotin'],
      quirk: c('Patients with rapidly proliferating tumor and high tumor burden may be at increased risk; monitor closely and take appropriate measures.', 'pi-brentuximab-vedotin'),
    },
  ],
};

// ---------------------------------------------------------------- polatuzumab vedotin
const polivy: OncDrug = {
  id: 'polatuzumab-vedotin', generic: 'polatuzumab vedotin-piiq', brands: ['Polivy'], aliases: ['polatuzumab vedotin-piiq'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-vedotin'], label: 'pi-polatuzumab-vedotin', tier: 'full',
  mechanism: c('CD79b-directed antibody-drug conjugate: after binding CD79b on B cells and internalization, lysosomal proteases cleave the linker and release MMAE, which binds microtubules and kills dividing cells by inhibiting cell division and inducing apoptosis.', 'pi-polatuzumab-vedotin'),
  cancers: ['dlbcl-nos-hgbl-untreated', 'dlbcl-nos-relapsed-refractory'],
  alsoOnLabel: [
    c('Strong CYP3A inhibitors: may increase unconjugated MMAE exposure and Polivy toxicities; monitor for signs of toxicity', 'pi-polatuzumab-vedotin'),
    c('Strong CYP3A inducers: may decrease unconjugated MMAE exposure', 'pi-polatuzumab-vedotin'),
  ],
  effects: [
    {
      tox: 'chemo-hypersensitivity',
      timing: c('Infusion reactions occur as late as 24 hours, after the dose', 'pi-polatuzumab-vedotin'),
      quirk: c('Give antihistamine and antipyretic first; monitor closely; if a reaction occurs interrupt and manage. Infusion reactions 13% (with R-CHP) and 7% (other study) despite premedication, including severe cases and delayed reactions up to 24 hours.', 'pi-polatuzumab-vedotin'),
    },
    {
      tox: 'chemo-myelosuppression', cite: ['pi-polatuzumab-vedotin'],
      quirk: c('Monitor counts; give prophylactic G-CSF with R-CHP and consider it with bendamustine and rituximab; delay, reduce or discontinue by severity. With R-CHP grade 3-4 neutropenia 39%, febrile neutropenia 15%; with bendamustine and rituximab, grade 3 or higher neutropenia 42%, thrombocytopenia 40%.', 'pi-polatuzumab-vedotin'),
    },
    {
      tox: 'serious-infection', cite: ['pi-polatuzumab-vedotin'],
      quirk: c('Monitor closely; give Pneumocystis and herpesvirus prophylaxis. Fatal or serious infections including opportunistic ones: infection deaths 1.1% (with R-CHP) and 2.9% (other study). PML in 0.6%: hold Polivy and chemotherapy if suspected; permanently discontinue if confirmed.', 'pi-polatuzumab-vedotin'),
    },
    {
      tox: 'drug-neuropathy',
      timing: c('With R-CHP: neuropathy median onset 2.3 months, 2.1 months in Study GO29365', 'pi-polatuzumab-vedotin'),
      quirk: c('Peripheral neuropathy, including severe cases, cumulative, possible as early as the first cycle; may exacerbate pre-existing neuropathy; mostly sensory but motor and sensorimotor also occur; new or worsening in 53% with R-CHP and 40% in the other study. Label says it may require delay, dose reduction or discontinuation.', 'pi-polatuzumab-vedotin'),
    },
    {
      tox: 'drug-hepatotoxicity', cite: ['pi-polatuzumab-vedotin'],
      quirk: c('Serious hepatotoxicity consistent with hepatocellular injury (transaminase and/or bilirubin elevations); pre-existing liver disease, elevated baseline enzymes and concomitant medications may raise the risk; monitor liver enzymes and bilirubin.', 'pi-polatuzumab-vedotin'),
    },
    {
      tox: 'chemo-tumor-lysis', cite: ['pi-polatuzumab-vedotin'],
      quirk: c('Patients with high tumor burden and rapidly proliferative tumor may be at increased risk; label says monitor closely and take appropriate measures, including tumor lysis syndrome prophylaxis.', 'pi-polatuzumab-vedotin'),
    },
    {
      tox: 'chemo-extravasation', cite: ['pi-polatuzumab-vedotin'],
      quirk: c('Tissue damage after infusion site extravasation, including severe events, reported in studies and postmarketing; signs appear within hours to weeks (burning, tingling, pain, swelling, redness) and can progress to blistering, necrosis, ulceration and cellulitis. Label says if extravasation occurs, stop the infusion and manage medically.', 'pi-polatuzumab-vedotin'),
    },
  ],
};

// ---------------------------------------------------------------- tisotumab vedotin
const tivdak: OncDrug = {
  id: 'tisotumab-vedotin', generic: 'tisotumab vedotin-tftv', brands: ['Tivdak'], aliases: ['tisotumab vedotin-tftv'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-vedotin'], label: 'pi-tisotumab-vedotin', tier: 'full',
  mechanism: c('Tissue factor-directed antibody-drug conjugate: after binding tissue factor on cancer cells and internalization, proteolytic cleavage releases MMAE, which disrupts the microtubule network of actively dividing cells, causing cell cycle arrest and apoptotic cell death.', 'pi-tisotumab-vedotin'),
  cancers: ['cervical-recurrent-metastatic'],
  boxedWarning: [
    c('Ocular toxicity: severe ocular toxicities with changes in vision, including severe vision loss, and corneal ulceration; ophthalmic exam (symptoms, visual acuity, slit lamp of the anterior segment) before starting, before each of the first nine cycles and as clinically indicated; required premedication and eye care before, during and after infusion; withhold until improvement, then resume, reduce the dose or permanently discontinue by severity', 'pi-tisotumab-vedotin'),
  ],
  alsoOnLabel: [
    c('Bowel obstruction and ileus: serious ileus 6%, small intestinal obstruction 2.4%; intestinal obstruction 4.4% in innovaTV 301', 'pi-tisotumab-vedotin'),
    c('Venous thromboembolism: venous thrombosis 3% and pulmonary embolism 3% of 101 patients (innovaTV 204) (6.1)', 'pi-tisotumab-vedotin'),
    c('Strong CYP3A4 inhibitors: may increase unconjugated MMAE exposure and the risk of adverse reactions; monitor closely for adverse reactions', 'pi-tisotumab-vedotin'),
    c('Other fatal reactions in trials: acute kidney injury 0.4% (innovaTV 301)', 'pi-tisotumab-vedotin'),
  ],
  effects: [
    {
      tox: 'drug-ocular-toxicity', rank: 1, boxed: true,
      timing: c('Median onset of first eye reaction is 1.2 months, range 0 to 17.1 months', 'pi-tisotumab-vedotin'),
      quirk: c('Refer promptly for any new or worsening eye sign; withhold, reduce or permanently discontinue by severity. Ocular reactions 55% (conjunctivitis 32%, dry eye 24%, keratopathy 17%); grade 3 in 3.3%, ulcerative keratitis in 1.2% (one perforation needing corneal transplant); delayed reactions over 30 days after the last dose in 3.2%.', 'pi-tisotumab-vedotin'),
    },
    {
      tox: 'drug-hemorrhage',
      timing: c('Median hemorrhage onset is 0.3 months, range 0 to 10.4 months', 'pi-tisotumab-vedotin'),
      quirk: c('Hemorrhage in 51% (epistaxis 33%), grade 3 in 4%. Label says permanently discontinue for pulmonary or CNS hemorrhage; for grade 2 or higher bleeding elsewhere, withhold until bleeding has resolved, hemoglobin is stable and no bleeding diathesis or anatomical or pathologic condition raises the risk of recurrence, then resume or permanently discontinue.', 'pi-tisotumab-vedotin'),
    },
    {
      tox: 'drug-neuropathy', rank: 2,
      timing: c('Median neuropathy onset is 2.4 months, range 0 to 11.3 months', 'pi-tisotumab-vedotin'),
      quirk: c('Peripheral neuropathy in 39% (grade 3 in 6%): sensory 23%, sensorimotor 3.3%, motor 2.4%, muscular weakness 2.8%. Label says withhold, then dose reduce or permanently discontinue by severity. One patient with another tumor type given the recommended dose developed Guillain-Barre syndrome.', 'pi-tisotumab-vedotin'),
    },
    {
      tox: 'drug-lung-toxicity', cite: ['pi-tisotumab-vedotin'],
      quirk: c('Withhold for persistent or recurrent grade 2 and consider dose reduction; permanently discontinue for grade 3 or 4; exclude other causes. Severe, life-threatening or fatal pneumonitis (vedotin class): 0.9% in cervical cancer trials, one fatal.', 'pi-tisotumab-vedotin'),
    },
    {
      tox: 'drug-severe-skin', cite: ['pi-tisotumab-vedotin'],
      quirk: c('Withhold until the cause is known and consult a specialist early; permanently discontinue for confirmed grade 3 or 4 reactions including SJS. Severe reactions 1.6% (grade 3 or higher 0.5%, one fatal), including fatal or life-threatening SJS; signs: target lesions, blistering, mouth sores, fever.', 'pi-tisotumab-vedotin'),
    },
  ],
};

// ---------------------------------------------------------------- inotuzumab ozogamicin
const besponsa: OncDrug = {
  id: 'inotuzumab-ozogamicin', generic: 'inotuzumab ozogamicin', brands: ['Besponsa'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-calicheamicin'], label: 'pi-inotuzumab-ozogamicin', tier: 'full',
  mechanism: c('CD22-directed antibody-drug conjugate: after binding CD22-expressing tumor cells and internalization, N-acetyl-gamma-calicheamicin dimethylhydrazide is released and induces double-strand DNA breaks, cell cycle arrest and apoptotic cell death.', 'pi-inotuzumab-ozogamicin'),
  cancers: ['b-all-cd22-relapsed-refractory'],
  boxedWarning: [
    c('Hepatotoxicity and VOD: hepatotoxicity including fatal and life-threatening hepatic veno-occlusive disease (VOD, also called sinusoidal obstruction syndrome); risk greater after stem cell transplant (HSCT), with conditioning regimens containing 2 alkylating agents and last total bilirubin at or above the upper limit of normal before HSCT; other risk factors are ongoing or prior liver disease, prior HSCT, increased age, later salvage lines and more Besponsa cycles; liver test elevations may require interruption, dose reduction or permanent discontinuation; permanently discontinue if VOD occurs; treat severe VOD according to standard medical practice', 'pi-inotuzumab-ozogamicin'),
    c('Post-transplant mortality: higher non-relapse mortality after HSCT in patients receiving Besponsa, resulting in a higher Day 100 post-HSCT mortality rate', 'pi-inotuzumab-ozogamicin'),
  ],
  alsoOnLabel: [
    c('Post-transplant mortality: non-relapse mortality 39% versus 23% on chemotherapy among transplanted adults; VOD and infections most common causes', 'pi-inotuzumab-ozogamicin'),
    c('QT-prolonging drugs: raise QTc risk; discontinue or use alternatives; if unavoidable, ECGs and electrolytes before, after starting such a drug and periodically', 'pi-inotuzumab-ozogamicin'),
  ],
  effects: [
    {
      tox: 'drug-hepatotoxicity', rank: 1, boxed: true,
      timing: c('Adults: median HSCT-to-VOD time 15 days, range 3 to 57 days; VOD also occurred up to 56 days after the final dose without a transplant', 'pi-inotuzumab-ozogamicin'),
      quirk: c('Monitor for VOD (rising bilirubin, painful hepatomegaly, rapid weight gain, ascites); liver tests before and after each dose; permanently discontinue if VOD occurs. VOD 14% in adults (23% after HSCT) and 15% in children, sometimes fatal; HSCT conditioning with 2 alkylating agents raises risk.', 'pi-inotuzumab-ozogamicin'),
    },
    {
      tox: 'chemo-myelosuppression', cite: ['pi-inotuzumab-ozogamicin'],
      quirk: c('Monitor counts before each dose; give prophylactic anti-infectives as appropriate; reduce, withhold or discontinue by severity. Adults: thrombocytopenia 51%, neutropenia 49%, febrile neutropenia 26%; platelet recovery later than 45 days after the last dose in 9%.', 'pi-inotuzumab-ozogamicin'),
    },
    {
      tox: 'serious-infection', cite: ['pi-inotuzumab-ozogamicin'],
      quirk: c('Infections, some life-threatening or fatal, in 48% of adults; fatal infections (pneumonia, neutropenic sepsis, sepsis, septic shock, pseudomonal sepsis) in 5%; bacterial, viral and fungal.', 'pi-inotuzumab-ozogamicin'),
    },
    {
      tox: 'drug-hemorrhage', cite: ['pi-inotuzumab-ozogamicin'],
      quirk: c('Hemorrhage in 33% of adults, grade 3 or 4 in 5%, including one fatal intra-abdominal hemorrhage; epistaxis most common (15%).', 'pi-inotuzumab-ozogamicin'),
    },
    {
      tox: 'chemo-hypersensitivity', cite: ['pi-inotuzumab-ozogamicin'],
      quirk: c('Premedicate with a corticosteroid, antipyretic and antihistamine; monitor during and at least 1 hour after infusion; interrupt and manage; permanently discontinue for severe or life-threatening reactions. Reactions (all grade 2) in 2% of adults and 8% of children, generally in cycle 1 soon after infusion.', 'pi-inotuzumab-ozogamicin'),
    },
    {
      tox: 'drug-qt-prolongation', cite: ['pi-inotuzumab-ozogamicin'],
      quirk: c('QTcF increase of 60 msec or more from baseline in 3% of adults; in children, increase above 60 msec in 14% and QTcF above 500 msec in 6%. Label says use caution with a history of or predisposition to QTc prolongation, QT-prolonging drugs or electrolyte disturbances; obtain ECGs and electrolytes before treatment, after starting any QT-prolonging drug, and periodically.', 'pi-inotuzumab-ozogamicin'),
    },
  ],
};

// ---------------------------------------------------------------- gemtuzumab ozogamicin
const mylotarg: OncDrug = {
  id: 'gemtuzumab-ozogamicin', generic: 'gemtuzumab ozogamicin', brands: ['Mylotarg'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-calicheamicin'], label: 'pi-gemtuzumab-ozogamicin', tier: 'full',
  mechanism: c('CD33-directed antibody-drug conjugate: after binding CD33-expressing tumor cells and internalization, N-acetyl gamma calicheamicin dimethyl hydrazide is released and induces double-strand DNA breaks, cell cycle arrest and apoptotic cell death.', 'pi-gemtuzumab-ozogamicin'),
  cancers: ['aml-cd33-newly-diagnosed', 'aml-cd33-relapsed-refractory'],
  boxedWarning: [
    c('Hepatotoxicity: including severe or fatal hepatic veno-occlusive disease (VOD, also called sinusoidal obstruction syndrome), reported with Mylotarg as a single agent and as part of combination chemotherapy; monitor frequently for signs and symptoms of VOD after treatment', 'pi-gemtuzumab-ozogamicin'),
  ],
  alsoOnLabel: [
    c('QT prolongation: seen with other calicheamicin drugs; with QT risk factors or QT-prolonging drugs, ECGs and electrolytes before and as needed', 'pi-gemtuzumab-ozogamicin'),
    c('Postmarketing: hemorrhagic cystitis listed among post-approval reports', 'pi-gemtuzumab-ozogamicin'),
    c('Contraindicated: history of hypersensitivity to the active substance, any component or any excipient; reactions have included anaphylaxis', 'pi-gemtuzumab-ozogamicin'),
    c('Other fatal reactions in trials: ALFA-0701, 8 of 131 on Mylotarg (VOD 3, hemorrhage-related 4, suspected cardiac cause 1)', 'pi-gemtuzumab-ozogamicin'),
  ],
  effects: [
    {
      tox: 'drug-hepatotoxicity', rank: 1, boxed: true,
      timing: c('ALFA-0701: median dose-to-VOD time 9 days, range 2 to 298 days; 5 of 6 ALFA-0701 events within 28 days of a dose', 'pi-gemtuzumab-ozogamicin'),
      quirk: c('Monitor frequently for VOD (rising ALT, AST, bilirubin, painful hepatomegaly, rapid weight gain, ascites); bilirubin alone can miss it. On VOD discontinue and treat per standard practice. VOD 5% in adults and 5% in children, some fatal; risk higher with moderate or severe hepatic impairment, treatment after HSCT, or HSCT after Mylotarg.', 'pi-gemtuzumab-ozogamicin'),
    },
    {
      tox: 'chemo-hypersensitivity',
      timing: c('Reactions can occur within 24 hours of infusion, including during the infusion', 'pi-gemtuzumab-ozogamicin'),
      quirk: c('Premedicate; monitor vital signs; interrupt immediately for dyspnea, bronchospasm or hypotension; monitor during and at least 1 hour after infusion; discontinue for anaphylaxis. Life-threatening or fatal reactions during or within 24 hours (fever, chills, hypotension, tachycardia, hypoxia, respiratory failure).', 'pi-gemtuzumab-ozogamicin'),
    },
    {
      tox: 'drug-hemorrhage', cite: ['pi-gemtuzumab-ozogamicin'],
      quirk: c('Check counts before each dose and frequently after; delay or permanently discontinue for severe bleeding or persistent thrombocytopenia, with supportive care. Fatal or life-threatening hemorrhage from prolonged thrombocytopenia: bleeding 90% with chemotherapy (grade 3-4 21%), fatal 3%.', 'pi-gemtuzumab-ozogamicin'),
    },
    {
      tox: 'chemo-myelosuppression', cite: ['pi-gemtuzumab-ozogamicin'],
      quirk: c('Myelosuppressive: all patients in ALFA-0701 developed severe neutropenia, thrombocytopenia and anemia; thrombocytopenia with platelets below 50 Gi/L lasting more than 42 days in the induction phase in 19%.', 'pi-gemtuzumab-ozogamicin'),
    },
    {
      tox: 'drug-diarrhea-colitis', cite: ['pi-gemtuzumab-ozogamicin'], basis: 'postmarketing',
      quirk: c('Postmarketing: neutropenic colitis, including fatal events.', 'pi-gemtuzumab-ozogamicin'),
    },
    {
      tox: 'serious-infection', cite: ['pi-gemtuzumab-ozogamicin'],
      quirk: c('Fatal infection 3% in children given Mylotarg with chemotherapy (AAML0531); septic shock stopped treatment in 2% (ALFA-0701); infection 42% and grade 3 sepsis 32% with Mylotarg alone. Postmarketing: fungal lung infections including Pneumocystis jirovecii pneumonia, and bacterial infections including Stenotrophomonas.', 'pi-gemtuzumab-ozogamicin'),
    },
    {
      tox: 'drug-lung-toxicity', cite: ['pi-gemtuzumab-ozogamicin'], basis: 'postmarketing',
      quirk: c('Postmarketing: interstitial pneumonia.', 'pi-gemtuzumab-ozogamicin'),
    },
  ],
};

// ---------------------------------------------------------------- mirvetuximab soravtansine
const elahere: OncDrug = {
  id: 'mirvetuximab-soravtansine', generic: 'mirvetuximab soravtansine-gynx', brands: ['Elahere'], aliases: ['mirvetuximab soravtansine-gynx'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-fra'], label: 'pi-mirvetuximab-soravtansine', tier: 'full',
  mechanism: c('Folate receptor alpha-directed antibody-drug conjugate: after binding folate receptor alpha and internalization, proteolytic cleavage releases DM4, a microtubule inhibitor that disrupts the microtubule network, causing cell cycle arrest and apoptotic cell death.', 'pi-mirvetuximab-soravtansine'),
  cancers: ['ovarian-fra-positive-platinum-resistant'],
  boxedWarning: [
    c('Ocular toxicity: severe ocular toxicities including visual impairment, keratopathy, dry eye, photophobia, eye pain and uveitis; ophthalmic exam (visual acuity, slit lamp) before starting, every other cycle for the first 8 cycles and as clinically indicated; prophylactic artificial tears and ophthalmic topical steroids; withhold for ocular toxicity until improvement and resume at the same or a reduced dose; discontinue for grade 4 ocular toxicity', 'pi-mirvetuximab-soravtansine'),
  ],
  alsoOnLabel: [
    c('Intestinal obstruction: serious in 5% to 8% across two studies, fatal in both; ascites serious in 4% in one', 'pi-mirvetuximab-soravtansine'),
    c('Infusion reactions: infusion-related reactions or hypersensitivity listed in 8% and 9% of patients in the two registration studies, Studies 0416 and 0417', 'pi-mirvetuximab-soravtansine'),
    c('Pleural effusion: serious in 3% of ELAHERE-treated patients (Studies 0416 and 0417) (6.1)', 'pi-mirvetuximab-soravtansine'),
    c('Strong CYP3A4 inhibitors: may increase unconjugated DM4 exposure and the risk of adverse reactions; monitor closely', 'pi-mirvetuximab-soravtansine'),
  ],
  effects: [
    {
      tox: 'drug-ocular-toxicity', rank: 1, boxed: true,
      timing: c('Median onset of first eye reaction is 5.1 weeks, range 0.1 to 68.6 weeks', 'pi-mirvetuximab-soravtansine'),
      quirk: c('Artificial tears and topical steroid drops; avoid contact lenses; refer promptly for new or worsening eye symptoms; withhold, reduce or discontinue by severity. Ocular reactions 59% (blurred vision 48%, keratopathy 36%, dry eye 27%, cataract 16%); grade 3 in 11%, grade 4 in 0.3%.', 'pi-mirvetuximab-soravtansine'),
    },
    {
      tox: 'drug-lung-toxicity', cite: ['pi-mirvetuximab-soravtansine'],
      quirk: c('Withhold for persistent or recurrent grade 2 and consider dose reduction; permanently discontinue for grade 3 or 4; exclude infection and tumor first. Pneumonitis 10% (grade 3 in 1%); two deaths from respiratory failure. Asymptomatic patients may continue with close monitoring.', 'pi-mirvetuximab-soravtansine'),
    },
    {
      tox: 'drug-neuropathy',
      timing: c('Median neuropathy onset is 5.9 weeks, range 0.1 to 126.7 weeks', 'pi-mirvetuximab-soravtansine'),
      quirk: c('Peripheral neuropathy in 36% (grade 3 in 3%); 23% had complete resolution at last follow-up. Label says withhold, dose reduce or permanently discontinue by severity.', 'pi-mirvetuximab-soravtansine'),
    },
  ],
};

// ---------------------------------------------------------------- loncastuximab tesirine
const zynlonta: OncDrug = {
  id: 'loncastuximab-tesirine', generic: 'loncastuximab tesirine-lpyl', brands: ['Zynlonta'], aliases: ['loncastuximab tesirine-lpyl'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-cd19'], label: 'pi-loncastuximab-tesirine', tier: 'full',
  mechanism: c('CD19-directed antibody-drug conjugate: after binding CD19 and internalization, proteolytic cleavage releases SG3199, a pyrrolobenzodiazepine dimer alkylating agent that binds the DNA minor groove and forms highly cytotoxic DNA interstrand crosslinks, inducing cell death.', 'pi-loncastuximab-tesirine'),
  cancers: ['lbcl-relapsed-refractory'],
  alsoOnLabel: [
    c('Cutaneous reactions: grade 3 in 4% (photosensitivity, rash, erythema); withhold for grade 3; avoid sun exposure, including through glass', 'pi-loncastuximab-tesirine'),
    c('Postmarketing: telangiectasia (including cutaneous collagenous vasculopathy), blister and vesicular rash listed among post-approval reports', 'pi-loncastuximab-tesirine'),
    c('Hepatic impairment: the label says to avoid in moderate or severe hepatic impairment', 'pi-loncastuximab-tesirine'),
    c('Pericarditis: among inflammatory-related conditions in 3% of 145 patients (LOTIS-2) (6.1)', 'pi-loncastuximab-tesirine'),
  ],
  effects: [
    {
      tox: 'drug-fluid-retention', cite: ['pi-loncastuximab-tesirine'],
      quirk: c('Consider imaging for new dyspnea, chest pain or abdominal swelling; manage and withhold or discontinue by severity. Grade 3 edema 3%, pleural effusion 3%, grade 3-4 pericardial effusion 1%; rare cardiac tamponade.', 'pi-loncastuximab-tesirine'),
    },
    {
      tox: 'drug-capillary-leak', cite: ['pi-loncastuximab-tesirine'],
      quirk: c('Capillary leak syndrome of grade 3 or higher in 0.6%. Label says evaluate and manage appropriately in patients with worsening effusion or edema and signs such as weight gain, severe hypotension, hypoalbuminemia or hemoconcentration (elevated hemoglobin or hematocrit).', 'pi-loncastuximab-tesirine'),
    },
    {
      tox: 'chemo-myelosuppression', cite: ['pi-loncastuximab-tesirine'],
      quirk: c('Serious or severe myelosuppression: grade 3 or 4 neutropenia 32% (grade 4 21%), thrombocytopenia 20%, anemia 12%; febrile neutropenia 3%. Label says cytopenias may require interruption, dose reduction or discontinuation, and consider prophylactic G-CSF.', 'pi-loncastuximab-tesirine'),
    },
    {
      tox: 'serious-infection', cite: ['pi-loncastuximab-tesirine'],
      quirk: c('Fatal and serious infections including opportunistic infections: grade 3 or higher in 10%, fatal in 2%; sepsis and pneumonia most frequent. Label says withhold for grade 3 or 4 infection until resolved.', 'pi-loncastuximab-tesirine'),
    },
    {
      tox: 'drug-hepatotoxicity', cite: ['pi-loncastuximab-tesirine'],
      quirk: c('Cholestatic and hepatocellular liver injury, including severe, life-threatening and fatal drug-induced liver injury. Label says for suspected drug-induced liver injury or a grade 3 or higher ALT or AST increase, withhold until grade 1 or lower, and discontinue once drug-induced liver injury is confirmed.', 'pi-loncastuximab-tesirine'),
    },
  ],
};

// ---------------------------------------------------------------- telisotuzumab vedotin
const emrelis: OncDrug = {
  id: 'telisotuzumab-vedotin', generic: 'telisotuzumab vedotin-tllv', brands: ['Emrelis'], aliases: ['telisotuzumab vedotin-tllv'], brandSource: 'fda-drugsfda', classIds: ['bio-adc-vedotin'], label: 'pi-telisotuzumab-vedotin', tier: 'full',
  mechanism: c('c-Met-directed antibody-drug conjugate: after binding c-Met-expressing cells, internalization and intracellular cleavage release MMAE, which disrupts the microtubule network of actively dividing cells, inducing cell cycle arrest and apoptotic cell death.', 'pi-telisotuzumab-vedotin'),
  cancers: ['nsclc-nonsquamous-cmet-high'],
  alsoOnLabel: [
    c('Strong CYP3A inhibitors: may increase unconjugated MMAE exposure and the risk of adverse reactions; monitor for adverse reactions', 'pi-telisotuzumab-vedotin'),
    c('Other fatal reactions in trials: myocardial infarction and noninfectious endocarditis, 1 of 168 patients each', 'pi-telisotuzumab-vedotin'),
  ],
  effects: [
    {
      tox: 'drug-lung-toxicity',
      timing: c('Median ILD/pneumonitis onset is 48 days, range 23 to 85 days', 'pi-telisotuzumab-vedotin'),
      quirk: c('Severe, life-threatening or fatal ILD/pneumonitis in 10% (grade 3 in 3%, grade 4 in 0.6%), with 3 fatal cases; led to permanent discontinuation in 7%. Label says advise patients to report cough, dyspnea, fever or new or worsening respiratory symptoms immediately, monitor for signs and symptoms, and withhold or permanently discontinue by severity.', 'pi-telisotuzumab-vedotin'),
    },
    {
      tox: 'drug-neuropathy',
      timing: c('Median neuropathy onset is 105 days, range 1 to 472 days', 'pi-telisotuzumab-vedotin'),
      quirk: c('Peripheral neuropathy in 51% (grade 3 in 11%): sensory 45%, motor 9%; led to permanent discontinuation in 13%. Label says withhold, reduce the dose or permanently discontinue by severity.', 'pi-telisotuzumab-vedotin'),
    },
    {
      tox: 'drug-ocular-toxicity',
      timing: c('Median onset of eye disorders is 47 days, range 1 to 319 days', 'pi-telisotuzumab-vedotin'),
      quirk: c('Ocular surface disorders in 25%: blurred vision 15%, keratitis 11%, dry eye 5%; grade 3 in 1.2%. Label says to withhold and refer to an eye care professional for an ophthalmic exam and treatment for grade 2 or higher ocular toxicity, and withhold or permanently discontinue by severity.', 'pi-telisotuzumab-vedotin'),
    },
    {
      tox: 'chemo-hypersensitivity',
      timing: c('Median onset of infusion reactions is 28 days, range 1 to 43 days', 'pi-telisotuzumab-vedotin'),
      quirk: c('Infusion-related reactions in 3% (grade 3 in 1.2%, grade 4 in 0.6%); signs include dyspnea, flushing, chills, nausea, chest discomfort and hypotension. Label says monitor during the infusion, withhold, slow the infusion rate or permanently discontinue by severity, and give premedications before later infusions in patients who had a reaction.', 'pi-telisotuzumab-vedotin'),
    },
  ],
};

// ---------------------------------------------------------------- tagraxofusp
const elzonris: OncDrug = {
  id: 'tagraxofusp', generic: 'tagraxofusp-erzs', brands: ['Elzonris'], aliases: ['tagraxofusp-erzs'], brandSource: 'fda-drugsfda', classIds: ['bio-cd123-cytotoxin'], label: 'pi-tagraxofusp', tier: 'full',
  mechanism: c('CD123-directed cytotoxin: a fusion protein of recombinant human interleukin-3 and truncated diphtheria toxin that inhibits protein synthesis and causes cell death in CD123-expressing cells.', 'pi-tagraxofusp'),
  cancers: ['bpdcn'],
  boxedWarning: [
    c('Capillary leak syndrome: may be life-threatening or fatal; monitor for signs and symptoms and take the recommended actions', 'pi-tagraxofusp'),
  ],
  alsoOnLabel: [
    c('Drug interaction studies: none conducted', 'pi-tagraxofusp'),
  ],
  effects: [
    {
      tox: 'drug-capillary-leak', rank: 1, boxed: true,
      timing: c('Median time to CLS onset is 4 days, range -1 to 46 days; all but 5 patients had it in cycle 1', 'pi-tagraxofusp'),
      quirk: c('Albumin at least 3.2 g/dL and adequate cardiac function to start; check albumin before each dose and watch weight gain, edema, hypotension. Interrupt dosing for albumin below 3.5 g/dL or a fall of 0.5 g/dL or more, weight up 1.5 kg or more in a day, edema or hypotension, until resolved; label names intravenous albumin and methylprednisolone. CLS 53%, fatal in 3%.', 'pi-tagraxofusp'),
    },
    {
      tox: 'chemo-hypersensitivity', cite: ['pi-tagraxofusp'],
      quirk: c('Severe hypersensitivity reactions in 43%, grade 3 or higher in 7%; rash, pruritus and stomatitis in 5% or more. Label says monitor during treatment, and interrupt the infusion and provide supportive care if a reaction occurs.', 'pi-tagraxofusp'),
    },
    {
      tox: 'drug-hepatotoxicity', cite: ['pi-tagraxofusp'],
      quirk: c('Liver enzyme elevations: ALT 79%, AST 76%; grade 3 ALT 26%, grade 3 AST 30%, grade 4 AST 3%; mostly in cycle 1 and reversible after dose interruption. Label says monitor ALT and AST before each infusion and temporarily withhold if transaminases rise above 5 times the upper limit of normal, resuming on normalization or resolution.', 'pi-tagraxofusp'),
    },
    {
      tox: 'chemo-tumor-lysis', cite: ['pi-tagraxofusp'],
      quirk: c('Tumor lysis syndrome listed among clinically relevant adverse reactions in under 10% of patients.', 'pi-tagraxofusp'),
    },
  ],
};

// ---------------------------------------------------------------- denileukin diftitox
const lymphir: OncDrug = {
  id: 'denileukin-diftitox', generic: 'denileukin diftitox-cxdl', brands: ['Lymphir', 'Ontak'], aliases: ['denileukin diftitox-cxdl'], brandSource: 'fda-drugsfda', classIds: ['bio-il2r-cytotoxin'], label: 'pi-denileukin-diftitox', tier: 'full',
  mechanism: c('IL-2 receptor-directed cytotoxin: a fusion protein that directs diphtheria toxin to cells expressing the IL-2 receptor; after uptake the toxin fragment is cleaved and inhibits protein synthesis, causing cell death.', 'pi-denileukin-diftitox'),
  cancers: ['ctcl-relapsed-refractory-stage-i-iii'],
  boxedWarning: [
    c('Capillary leak syndrome: including life-threatening or fatal reactions; monitor for signs and symptoms; withhold until CLS resolves, or permanently discontinue based on severity', 'pi-denileukin-diftitox'),
  ],
  alsoOnLabel: [
    c('Postmarketing: thyroid conditions (hyperthyroidism, thyroiditis, thyrotoxicosis, hypothyroidism) listed among post-approval reports', 'pi-denileukin-diftitox'),
  ],
  effects: [
    {
      tox: 'drug-capillary-leak', rank: 1, boxed: true,
      timing: c('Median time to CLS onset is 6.5 days, range 1 to 77 days; 81% of events in the first 2 cycles', 'pi-denileukin-diftitox'),
      quirk: c('Assess weight gain, edema, dyspnea and hypotension; check albumin before each cycle. Withhold, reduce or permanently discontinue by severity; resume when CLS resolves and albumin is at least 3 g/dL. CLS in 27% (8% grade 3), one fatal; 22% recurred; pleural and pericardial effusion also occurred.', 'pi-denileukin-diftitox'),
    },
    {
      tox: 'chemo-hypersensitivity', cite: ['pi-denileukin-diftitox'],
      quirk: c('Premedicate for the first three cycles and monitor frequently; after a grade 2 or higher reaction give systemic steroid premedication for at least 3 cycles; interrupt or discontinue by severity. Serious infusion reactions 69% (grade 3 in 3.4%), mostly in cycles 1 and 2.', 'pi-denileukin-diftitox'),
    },
    {
      tox: 'drug-hepatotoxicity',
      timing: c('Grade 3 ALT or AST rise median onset is 8 days, range 1 to 15 days', 'pi-denileukin-diftitox'),
      quirk: c('Elevated ALT in 70% (grade 3 in 22%) and AST in 64% (grade 3 in 9%); total bilirubin elevated in 5%; grade 3 elevations resolved, median 15 days. Label says monitor liver enzymes and bilirubin at baseline and as clinically indicated, and withhold, reduce the dose or permanently discontinue by severity.', 'pi-denileukin-diftitox'),
    },
    {
      tox: 'drug-ocular-toxicity', cite: ['pi-denileukin-diftitox'],
      quirk: c('Serious visual impairment including changes in visual acuity and color vision: 9% (grade 1 in 8%, grade 2 in 1%), most often blurred vision; 67% resolved. Label says do a baseline ophthalmic exam, refer for ophthalmologic evaluation of symptoms, and withhold until resolved or permanently discontinue by severity.', 'pi-denileukin-diftitox'),
    },
  ],
};

// ================================================================ exports
export const DRUGS: OncDrug[] = [
  kadcyla, enhertu, trodelvy, datroway, padcev, adcetris, polivy, tivdak, besponsa, mylotarg, elahere, zynlonta, emrelis, elzonris, lymphir,
];


const dm = (setid: string) => `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${setid}`;
const pi = (key: string, text: string, setid: string, revised: string): OncSource => ({ key, kind: 'fda-pi', text: `${text} Prescribing information, DailyMed set ID ${setid}, SPL effective ${revised}.`, url: dm(setid), revised });

export const SOURCES: Record<string, OncSource> = {
  'pi-ado-trastuzumab-emtansine': pi('pi-ado-trastuzumab-emtansine', 'KADCYLA (ado-trastuzumab emtansine) for injection (Genentech, Inc.).', '23f3c1f4-0fc8-4804-a9e3-04cf25dd302e', '2026-04-01'),
  'pi-fam-trastuzumab-deruxtecan': pi('pi-fam-trastuzumab-deruxtecan', 'ENHERTU (fam-trastuzumab deruxtecan-nxki) for injection (Daiichi Sankyo Inc.).', '7e67e73e-ddf4-4e4d-8b50-09d7514910b6', '2026-05-15'),
  'pi-sacituzumab-govitecan': pi('pi-sacituzumab-govitecan', 'TRODELVY (sacituzumab govitecan-hziy) for injection (Gilead Sciences, Inc.).', '57a597d2-03f0-472e-b148-016d7169169d', '2026-06-24'),
  'pi-datopotamab-deruxtecan': pi('pi-datopotamab-deruxtecan', 'DATROWAY (datopotamab deruxtecan-dlnk) for injection (Daiichi Sankyo Inc.).', '2950227c-6230-4ca4-a135-46e44d9424a0', '2026-05-27'),
  'pi-enfortumab-vedotin': pi('pi-enfortumab-vedotin', 'PADCEV (enfortumab vedotin-ejfv) for injection (Seagen Inc.).', 'b5631d3e-4604-4363-8f20-11dfc5a4a8ed', '2026-08-04'),
  'pi-brentuximab-vedotin': pi('pi-brentuximab-vedotin', 'ADCETRIS (brentuximab vedotin) for injection (Seagen Inc.).', '3904f8dd-1aef-3490-e48f-bd55f32ed67f', '2025-11-11'),
  'pi-polatuzumab-vedotin': pi('pi-polatuzumab-vedotin', 'POLIVY (polatuzumab vedotin-piiq) for injection (Genentech, Inc.).', '20a16ab2-f338-4abb-9dcd-254bd949a2bc', '2026-08-24'),
  'pi-tisotumab-vedotin': pi('pi-tisotumab-vedotin', 'TIVDAK (tisotumab vedotin-tftv) for injection (Seagen Inc.).', 'c9fe3f32-4219-466e-acb9-3f609b4f4df1', '2026-10-16'),
  'pi-inotuzumab-ozogamicin': pi('pi-inotuzumab-ozogamicin', 'BESPONSA (inotuzumab ozogamicin) for injection (Wyeth Pharmaceuticals LLC, a subsidiary of Pfizer Inc.).', 'cc7014b1-c775-411d-b374-8113248b4077', '2026-02-06'),
  'pi-gemtuzumab-ozogamicin': pi('pi-gemtuzumab-ozogamicin', 'MYLOTARG (gemtuzumab ozogamicin) for injection (Wyeth Pharmaceuticals LLC, a subsidiary of Pfizer Inc.).', '32fd2bb2-1cfa-4250-feb8-d7956c794e05', '2025-12-19'),
  'pi-mirvetuximab-soravtansine': pi('pi-mirvetuximab-soravtansine', 'ELAHERE (mirvetuximab soravtansine-gynx) injection (ImmunoGen, Inc.).', '00c424b5-6ccd-48ab-9e88-1986451120e2', '2025-07-14'),
  'pi-loncastuximab-tesirine': pi('pi-loncastuximab-tesirine', 'ZYNLONTA (loncastuximab tesirine-lpyl) for injection (ADC Therapeutics America, Inc.).', 'af54af12-3edf-4301-8bc5-0446bc813c1d', '2026-11-11'),
  'pi-telisotuzumab-vedotin': pi('pi-telisotuzumab-vedotin', 'EMRELIS (telisotuzumab vedotin-tllv) for injection (AbbVie Inc.).', 'bc04f980-3957-4e35-ab81-8ec2ffe87215', '2025-05-25'),
  'pi-tagraxofusp': pi('pi-tagraxofusp', 'ELZONRIS (tagraxofusp-erzs) injection (Stemline Therapeutics, Inc.).', '80eb1080-fe20-4af0-b2a5-a67999923fa8', '2024-12-09'),
  'pi-denileukin-diftitox': pi('pi-denileukin-diftitox', 'LYMPHIR (denileukin diftitox-cxdl) for injection (Citius Pharmaceuticals, Inc.).', 'ac3613d7-4304-40e7-a3f5-adb8a8adca5d', '2025-01-23'),
};

export const CANCERS: Cancer[] = [
  { id: 'breast-her2-positive-metastatic-prior-trastuzumab-taxane', type: 'breast', name: 'HER2-positive metastatic breast cancer after trastuzumab and a taxane' },
  { id: 'breast-her2-positive-early-residual-disease', type: 'breast', name: 'HER2-positive early breast cancer with residual invasive disease after neoadjuvant therapy (adjuvant)' },
  { id: 'breast-her2-positive-early', type: 'breast', name: 'HER2-positive early breast cancer' },
  { id: 'breast-her2-positive-metastatic', type: 'breast', name: 'HER2-positive unresectable or metastatic breast cancer' },
  { id: 'breast-her2-low-ultralow-metastatic', type: 'breast', name: 'HER2-low or HER2-ultralow unresectable or metastatic breast cancer' },
  { id: 'breast-hr-positive-her2-negative-metastatic', type: 'breast', name: 'HR-positive, HER2-negative unresectable, locally advanced or metastatic breast cancer' },
  { id: 'nsclc-her2-mutant', type: 'lung-nsclc', name: 'HER2 (ERBB2)-mutant unresectable or metastatic non-small cell lung cancer' },
  { id: 'nsclc-egfr-mutated', type: 'lung-nsclc', name: 'EGFR-mutated locally advanced or metastatic non-small cell lung cancer' },
  { id: 'nsclc-nonsquamous-cmet-high', type: 'lung-nsclc', name: 'Non-squamous non-small cell lung cancer with high c-Met protein overexpression' },
  { id: 'gastric-her2-positive', type: 'gastric-esophageal', name: 'HER2-positive locally advanced or metastatic gastric or gastroesophageal junction adenocarcinoma' },
  { id: 'solid-her2-ihc3plus', type: 'tissue-agnostic', name: 'HER2-positive (IHC 3+) unresectable or metastatic solid tumors' },
  { id: 'urothelial-locally-advanced-metastatic', type: 'bladder', name: 'Locally advanced or metastatic urothelial cancer' },
  { id: 'salcl', type: 'nhl', name: 'Systemic anaplastic large cell lymphoma', aliases: ['sALCL'] },
  { id: 'ptcl-cd30', type: 'nhl', name: 'CD30-expressing peripheral T-cell lymphomas' },
  { id: 'pcalcl-mf', type: 'ctcl', name: 'Primary cutaneous anaplastic large cell lymphoma or CD30-expressing mycosis fungoides', aliases: ['pcALCL'] },
  { id: 'lbcl-relapsed-refractory', type: 'nhl', name: 'Relapsed or refractory large B-cell lymphoma', aliases: ['LBCL'] },
  { id: 'dlbcl-nos-hgbl-untreated', type: 'nhl', name: 'Previously untreated DLBCL, NOS or high-grade B-cell lymphoma (IPI score 2 or greater)' },
  { id: 'dlbcl-nos-relapsed-refractory', type: 'nhl', name: 'Relapsed or refractory DLBCL, NOS after at least two prior therapies' },
  { id: 'cervical-recurrent-metastatic', type: 'cervical', name: 'Recurrent or metastatic cervical cancer with progression on or after chemotherapy' },
  { id: 'b-all-cd22-relapsed-refractory', type: 'all', name: 'Relapsed or refractory CD22-positive B-cell precursor acute lymphoblastic leukemia' },
  { id: 'aml-cd33-newly-diagnosed', type: 'aml', name: 'Newly-diagnosed CD33-positive acute myeloid leukemia' },
  { id: 'aml-cd33-relapsed-refractory', type: 'aml', name: 'Relapsed or refractory CD33-positive acute myeloid leukemia' },
  { id: 'ovarian-fra-positive-platinum-resistant', type: 'ovarian', name: 'Folate receptor-alpha positive, platinum-resistant epithelial ovarian, fallopian tube or primary peritoneal cancer' },
  { id: 'bpdcn', name: 'Blastic plasmacytoid dendritic cell neoplasm', aliases: ['BPDCN'] },
  { id: 'ctcl-relapsed-refractory-stage-i-iii', type: 'ctcl', name: 'Relapsed or refractory Stage I-III cutaneous T-cell lymphoma', aliases: ['CTCL'] },
];

export const CLASSES: DrugClass[] = [
  {
    id: 'bio-adc-her2', name: 'HER2-directed antibody-drug conjugate',
    mechanism: c('A HER2-directed antibody linked to a cytotoxic drug: after binding HER2 and internalization, the cytotoxic payload is released inside the cell (DM1 for Kadcyla, DXd for Enhertu).', 'pi-ado-trastuzumab-emtansine', 'pi-fam-trastuzumab-deruxtecan'),
    effects: [
      { tox: 'drug-lung-toxicity', cite: ['pi-ado-trastuzumab-emtansine', 'pi-fam-trastuzumab-deruxtecan'] },
      { tox: 'drug-cardiotoxicity', cite: ['pi-ado-trastuzumab-emtansine', 'pi-fam-trastuzumab-deruxtecan'] },
    ],
  },
  {
    id: 'bio-adc-trop2', name: 'Trop-2-directed antibody-drug conjugate',
    mechanism: c('A Trop-2-directed antibody linked to a topoisomerase I inhibitor: after binding Trop-2 and internalization, the payload is released (SN-38 for Trodelvy, DXd for Datroway), causing DNA damage and cell death.', 'pi-sacituzumab-govitecan', 'pi-datopotamab-deruxtecan'),
    effects: [],
  },
  {
    id: 'bio-adc-vedotin', name: 'Vedotin antibody-drug conjugate (MMAE payload)',
    mechanism: c('An antibody linked to MMAE, a microtubule-disrupting agent: after binding its target (CD30, Nectin-4, CD79b, tissue factor or c-Met) and internalization, MMAE is released and disrupts the microtubule network of dividing cells.', 'pi-brentuximab-vedotin', 'pi-enfortumab-vedotin', 'pi-polatuzumab-vedotin', 'pi-tisotumab-vedotin', 'pi-telisotuzumab-vedotin'),
    effects: [
      { tox: 'drug-neuropathy', cite: ['pi-brentuximab-vedotin', 'pi-enfortumab-vedotin', 'pi-polatuzumab-vedotin', 'pi-tisotumab-vedotin', 'pi-telisotuzumab-vedotin'] },
    ],
  },
  {
    id: 'bio-adc-calicheamicin', name: 'Calicheamicin antibody-drug conjugate',
    mechanism: c('An antibody (anti-CD22 or anti-CD33) linked to a calicheamicin derivative: after binding the target and internalization, the derivative is released and induces double-strand DNA breaks, cell cycle arrest and apoptotic cell death.', 'pi-inotuzumab-ozogamicin', 'pi-gemtuzumab-ozogamicin'),
    effects: [
      { tox: 'drug-hepatotoxicity', cite: ['pi-inotuzumab-ozogamicin', 'pi-gemtuzumab-ozogamicin'], note: c('Both labels carry a boxed warning for hepatotoxicity including veno-occlusive disease.', 'pi-inotuzumab-ozogamicin', 'pi-gemtuzumab-ozogamicin') },
      { tox: 'drug-hemorrhage', cite: ['pi-inotuzumab-ozogamicin', 'pi-gemtuzumab-ozogamicin'] },
      { tox: 'chemo-hypersensitivity', cite: ['pi-inotuzumab-ozogamicin', 'pi-gemtuzumab-ozogamicin'] },
    ],
  },
  {
    id: 'bio-adc-cd19', name: 'CD19-directed antibody-drug conjugate (pyrrolobenzodiazepine dimer)',
    mechanism: c('Binds CD19 and is internalized; proteolytic cleavage releases SG3199, a pyrrolobenzodiazepine dimer alkylating agent that forms DNA interstrand crosslinks and induces cell death.', 'pi-loncastuximab-tesirine'),
    effects: [],
  },
  {
    id: 'bio-adc-fra', name: 'Folate receptor alpha-directed antibody-drug conjugate (DM4 payload)',
    mechanism: c('Binds folate receptor alpha and is internalized; proteolytic cleavage releases DM4, a microtubule inhibitor that disrupts the microtubule network, causing cell cycle arrest and apoptotic cell death.', 'pi-mirvetuximab-soravtansine'),
    effects: [],
  },
  {
    id: 'bio-cd123-cytotoxin', name: 'CD123-directed cytotoxin',
    mechanism: c('A fusion protein of recombinant human interleukin-3 and truncated diphtheria toxin that inhibits protein synthesis and causes cell death in CD123-expressing cells.', 'pi-tagraxofusp'),
    effects: [],
  },
  {
    id: 'bio-il2r-cytotoxin', name: 'IL-2 receptor-directed cytotoxin',
    mechanism: c('A fusion protein that directs diphtheria toxin to cells expressing the IL-2 receptor; after uptake the toxin fragment inhibits protein synthesis, resulting in cell death.', 'pi-denileukin-diftitox'),
    effects: [],
  },
];
