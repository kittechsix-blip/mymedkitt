// Three biologics with no current cancer label on DailyMed: ofatumumab (Arzerra), necitumumab (Portrazza), moxetumomab pasudotox-tdfk (Lumoxiti).
// Each card is built from the most recent approved prescribing information PDF held in FDA's own label repository (Drugs@FDA, accessdata.fda.gov),
// read in full. These are OLD labels (2015, 2016, 2020), not current ones; each source text below states the revision date. Every statement is
// paraphrased from that label and cites it; nothing is added from outside. The text before the first comma of a timing is the short badge the card shows.
const c = (v, ...cite) => ({ v, cite });
// ---------------------------------------------------------------- ofatumumab (Arzerra)
const ofatumumab = {
    id: 'ofatumumab', generic: 'ofatumumab', brands: ['Arzerra'], brandSource: 'fda-drugsfda', classIds: ['bio-anti-cd20'], label: 'pi-ofatumumab', tier: 'full',
    labelAge: 'Label last revised 2016; current availability not confirmed.',
    mechanism: c('Binds both the small and large extracellular loops of the CD20 molecule on normal B lymphocytes (pre-B to mature) and on B-cell CLL cells; the Fc domain mediates immune effector functions that cause B-cell lysis in vitro, and the label says possible mechanisms of lysis include complement-dependent cytotoxicity and antibody-dependent cell-mediated cytotoxicity.', 'pi-ofatumumab'),
    cancers: ['cll-ofatumumab-untreated-chlorambucil', 'cll-ofatumumab-relapsed-fc', 'cll-ofatumumab-extended-treatment', 'cll-ofatumumab-refractory-fludarabine-alemtuzumab'],
    boxedWarning: [
        c('HBV reactivation: can occur with CD20-directed cytolytic antibodies including this drug, in some cases resulting in fulminant hepatitis, hepatic failure and death', 'pi-ofatumumab'),
        c('PML: progressive multifocal leukoencephalopathy resulting in death can occur with CD20-directed cytolytic antibodies including this drug', 'pi-ofatumumab'),
    ],
    alsoOnLabel: [
        c('Wrong route: never as an intravenous push or bolus or a subcutaneous injection; dilute and give as an intravenous infusion by pump (2.1, 2.5)', 'pi-ofatumumab'),
        c('Postmarketing cardiac arrest: listed as an infusion-related cardiac event in post-approval reports (6.3)', 'pi-ofatumumab'),
        c('Co-infusion: do not mix with, or infuse with, other medicinal products; flush the line with 0.9% sodium chloride before and after each dose (2.5)', 'pi-ofatumumab'),
        c('Live vaccines: do not give to patients who have recently received the drug; their safety during or after treatment has not been studied (5.7)', 'pi-ofatumumab'),
    ],
    effects: [
        {
            // One row covers both boxed hazards (HBV reactivation, PML): both file under serious-infection.
            tox: 'serious-infection', rank: 1, boxed: true,
            timing: c('HBV reactivation seen 12+ months post-therapy, the label says reported for at least 12 months after completion of therapy', 'pi-ofatumumab'),
            quirk: c('Boxed HBV reactivation (fulminant hepatitis, hepatic failure, death) and PML (death). Screen all patients with HBsAg and anti-HBc before starting; if HBV reactivates, immediately stop the drug and any chemotherapy and treat. With any new neurological sign, consider PML: stop and evaluate with neurology. Fatal infections 12% in refractory CLL.', 'pi-ofatumumab'),
        },
        {
            tox: 'chemo-hypersensitivity',
            timing: c('Reactions more often at infusions 1 and 2, the label says infusion reactions occur more often with the first 2 infusions', 'pi-ofatumumab'),
            quirk: c('Interrupt the infusion for a reaction of any severity; for anaphylaxis stop permanently and treat. Serious, including fatal: bronchospasm, hypotension, cardiac ischemia, angioedema. 67% with chlorambucil (10% grade 3 or higher); can occur despite premedication.', 'pi-ofatumumab'),
        },
        {
            tox: 'chemo-tumor-lysis',
            cite: ['pi-ofatumumab'],
            quirk: c('Higher risk with high tumor burden or lymphocytes over 25 x 10^9/L. Treat with aggressive intravenous hydration and anti-hyperuricemics, correct electrolytes and monitor renal function; consider prophylaxis 12 to 24 hours before the infusion.', 'pi-ofatumumab'),
        },
        {
            tox: 'chemo-myelosuppression',
            timing: c('Late-onset neutropenia begins 42+ days post-dose, defined as onset at least 42 days after the last treatment dose', 'pi-ofatumumab'),
            quirk: c('Monitor blood counts during and after therapy, more often with grade 3 or 4 cytopenias. Fatal neutropenic sepsis with chlorambucil; late-onset neutropenia 6% versus 1% with chlorambucil alone; grade 3 or higher neutropenia 51% with fludarabine and cyclophosphamide.', 'pi-ofatumumab'),
        },
        {
            tox: 'drug-severe-skin',
            basis: 'postmarketing',
            cite: ['pi-ofatumumab'],
            quirk: c('Postmarketing: Stevens-Johnson syndrome is listed among post-approval mucocutaneous reports; frequency cannot be reliably estimated.', 'pi-ofatumumab'),
        },
    ],
};
// ---------------------------------------------------------------- necitumumab (Portrazza)
const necitumumab = {
    id: 'necitumumab', generic: 'necitumumab', brands: ['Portrazza'], brandSource: 'fda-drugsfda', classIds: ['bio-anti-egfr-antibody'], label: 'pi-necitumumab', tier: 'full',
    labelAge: 'Label last revised 2015; current availability not confirmed.',
    mechanism: c('Recombinant human IgG1 monoclonal antibody that binds the human epidermal growth factor receptor (EGFR) and blocks the binding of EGFR to its ligands; in vitro, binding induces EGFR internalization and degradation and antibody-dependent cellular cytotoxicity in EGFR-expressing cells.', 'pi-necitumumab'),
    cancers: ['nsclc-squamous-metastatic-first-line-gem-cis'],
    boxedWarning: [
        c('Cardiopulmonary arrest: cardiopulmonary arrest and/or sudden death occurred in 3.0% of patients given the drug with gemcitabine and cisplatin; closely monitor serum magnesium, potassium and calcium with aggressive replacement when warranted during and after administration', 'pi-necitumumab'),
        c('Hypomagnesemia: occurred in 83% of patients given the drug with gemcitabine and cisplatin and was severe in 20%; monitor for hypomagnesemia, hypocalcemia and hypokalemia before each dose and for at least 8 weeks after completion; withhold for Grade 3 or 4 electrolyte abnormalities and replete electrolytes as medically appropriate', 'pi-necitumumab'),
    ],
    alsoOnLabel: [
        c('Co-infusion: do not co-infuse with other electrolytes or medication; dilute only in 0.9% sodium chloride, not dextrose, and use a separate line (2.4, 2.5)', 'pi-necitumumab'),
        c('Skin toxicity: acneiform rash and related reactions in 79%, severe in 8%, usually in 2 weeks; withhold for Grade 3, stop for Grade 4 or Grade 3 induration or fibrosis (5.4)', 'pi-necitumumab'),
        c('Non-squamous NSCLC: not indicated; with pemetrexed and cisplatin, fatal toxicities 16% versus 10% and cardiopulmonary arrest or sudden death 3.3% versus 1.3% (5.6)', 'pi-necitumumab'),
        c('Overdose: limited human experience; Grade 3 headache, vomiting and nausea in 2 of 9 patients at 1000 mg every other week; there is no known antidote (10)', 'pi-necitumumab'),
    ],
    effects: [
        {
            tox: 'drug-cardiopulmonary-arrest', rank: 1, boxed: true,
            cite: ['pi-necitumumab'],
            quirk: c('Closely monitor serum magnesium, potassium and calcium before each infusion and for at least 8 weeks after the last dose, with aggressive replacement when warranted. 15 of 538 (3%) versus 3 of 541 (0.6%) with gemcitabine and cisplatin alone; 12 of the 15 died within 30 days of the last dose.', 'pi-necitumumab'),
        },
        {
            tox: 'drug-electrolyte', rank: 2, boxed: true,
            timing: c('Median hypomagnesemia onset 6 weeks after start, the 25th percentile was 4 weeks and the 75th percentile 9 weeks', 'pi-necitumumab'),
            quirk: c('Monitor magnesium, calcium and potassium before each infusion and for at least 8 weeks after; replete; withhold for Grade 3 or 4, resuming once Grade 2 or lower. Hypomagnesemia 83% versus 70% without the drug, severe in 20% versus 7%.', 'pi-necitumumab'),
        },
        {
            tox: 'drug-thromboembolism',
            cite: ['pi-necitumumab'],
            quirk: c('Discontinue for serious or life-threatening venous or arterial events; some were fatal. Venous 9% versus 5% (pulmonary embolism 5%); arterial 5% versus 4% (stroke 2%, myocardial infarction 1%); about 3-fold higher risk with a prior history.', 'pi-necitumumab'),
        },
        {
            tox: 'chemo-hypersensitivity',
            timing: c('Unpremedicated: most IRRs after dose 1 or 2, the label says most followed the first or second administration', 'pi-necitumumab'),
            quirk: c('Monitor during and after each infusion; permanently discontinue for Grade 3 or 4 or serious reactions. Reduce the rate by 50% for Grade 1; stop for Grade 2 until Grade 1 or lower. 1.5% of patients (Grade 3 in 0.4%).', 'pi-necitumumab'),
        },
        { tox: 'drug-severe-skin', drop: true },
        { tox: 'drug-lung-toxicity', drop: true },
    ],
};
// ---------------------------------------------------------------- moxetumomab pasudotox-tdfk (Lumoxiti)
const moxetumomab = {
    id: 'moxetumomab-pasudotox', generic: 'moxetumomab pasudotox-tdfk', brands: ['Lumoxiti'], classIds: ['bio-cd22-cytotoxin'], label: 'pi-moxetumomab-pasudotox-tdfk', tier: 'full',
    labelAge: 'Label last revised 2020; current availability not confirmed.',
    cancers: ['hairy-cell-relapsed-refractory'],
    boxedWarning: [
        c('Capillary leak syndrome: including life-threatening cases; monitor weight and blood pressure, and check labs including albumin if CLS is suspected; delay dosing or discontinue as recommended', 'pi-moxetumomab-pasudotox-tdfk'),
        c('Hemolytic uremic syndrome: including life-threatening cases; monitor hemoglobin, platelet count and serum creatinine and ensure adequate hydration; discontinue in patients with HUS', 'pi-moxetumomab-pasudotox-tdfk'),
    ],
    alsoOnLabel: [
        c('Wrong route: intravenous infusion only; reconstitute with Sterile Water for Injection only; do not mix or infuse with other medicinal products (2.4)', 'pi-moxetumomab-pasudotox-tdfk'),
        c('Prior TMA or HUS: avoid the drug in patients with a history of severe thrombotic microangiopathy or HUS (5.2)', 'pi-moxetumomab-pasudotox-tdfk'),
        c('Severe renal impairment: not recommended with creatinine clearance of 29 mL/min or less (1, 5.3)', 'pi-moxetumomab-pasudotox-tdfk'),
        c('Fluid retention: 63% in the main trial (pleural effusion 6%, pericardial effusion 1.3%); 29% of those affected needed diuretics (6.1)', 'pi-moxetumomab-pasudotox-tdfk'),
        c('Grade 3 or 4 reactions: most common were hypertension, febrile neutropenia and HUS, each in at least 5% of patients (6.1)', 'pi-moxetumomab-pasudotox-tdfk'),
    ],
    effects: [
        {
            tox: 'drug-capillary-leak', rank: 1, boxed: true,
            timing: c('Most CLS within first 8 days of a cycle, range 1 to 19 days; cases also reported on other days', 'pi-moxetumomab-pasudotox-tdfk'),
            quirk: c('Weigh and check blood pressure before each infusion. Withhold for Grade 2; permanently discontinue for Grade 3 or higher; give corticosteroids, supportive care, hospitalize as needed. Weight up 2.5 kg or 5%, hypotension, edema, dyspnea. 34% of patients; fatal if treatment delayed.', 'pi-moxetumomab-pasudotox-tdfk'),
        },
        {
            tox: 'drug-tma', rank: 2, boxed: true,
            timing: c('Most HUS within first 9 days of a cycle, range 1 to 16 days; cases also reported on other days', 'pi-moxetumomab-pasudotox-tdfk'),
            quirk: c('Discontinue in patients with HUS; give fluids, supportive care, hospitalize as needed. Suspect with hemolytic anemia, falling platelets, rising creatinine or LDH and schistocytes. 7% of patients; may need dialysis if treatment delayed.', 'pi-moxetumomab-pasudotox-tdfk'),
        },
        {
            tox: 'drug-nephrotoxicity',
            cite: ['pi-moxetumomab-pasudotox-tdfk'],
            quirk: c('Monitor renal function before each infusion; delay dosing for Grade 3 or higher creatinine rise. 26% of patients (acute kidney injury 2.3%); higher risk with HUS, age 65 or older, or baseline renal impairment.', 'pi-moxetumomab-pasudotox-tdfk'),
        },
        {
            tox: 'chemo-hypersensitivity',
            cite: ['pi-moxetumomab-pasudotox-tdfk'],
            quirk: c('Premedicate before every infusion; for a severe reaction interrupt, treat, and give a corticosteroid before resuming. 50% of patients (Grade 3 in 3.8%), any cycle.', 'pi-moxetumomab-pasudotox-tdfk'),
        },
        {
            tox: 'drug-electrolyte',
            cite: ['pi-moxetumomab-pasudotox-tdfk'],
            quirk: c('Monitor electrolytes before each dose and on Day 8. 57% of patients (hypocalcemia 25%), often with CLS, HUS, fluid retention or renal toxicity.', 'pi-moxetumomab-pasudotox-tdfk'),
        },
    ],
};
export const DRUGS = [ofatumumab, necitumumab, moxetumomab];
// bio-anti-cd20 and bio-anti-egfr-antibody are declared in biologic-monoclonal.ts and are not redeclared here.
export const CLASSES = [
    {
        id: 'bio-cd22-cytotoxin', name: 'CD22-directed cytotoxin',
        mechanism: c('Binds CD22 on the surface of B cells and is internalized; this results in ADP-ribosylation of elongation factor 2, inhibition of protein synthesis and apoptotic cell death.', 'pi-moxetumomab-pasudotox-tdfk'),
        effects: [],
    },
];
const fda = (key, text, url, revised) => ({ key, kind: 'fda-pi', text, url, revised });
export const SOURCES = {
    'pi-ofatumumab': fda('pi-ofatumumab', 'ARZERRA (ofatumumab) injection, for intravenous use (Novartis Pharmaceuticals Corporation). Prescribing information, label revised 08/2016 (BLA 125326, supplement 063, FDA action 2016-08-30), obtained from the FDA label repository (Drugs@FDA) because no current Arzerra cancer label is on DailyMed. This is the most recent Arzerra label FDA holds and is about ten years old; the printed footer says it may not be the latest approved by FDA.', 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2016/125326s063lbl.pdf', '2016-08'),
    'pi-necitumumab': fda('pi-necitumumab', 'PORTRAZZA (necitumumab) injection, for intravenous use (Eli Lilly and Company). Prescribing information, label revised 11/2015 (BLA 125547, original approval 2015-11-24), obtained from the FDA label repository (Drugs@FDA) because no current Portrazza label is on DailyMed. This is the only Portrazza label FDA holds and is about eleven years old; the printed footer says it may not be the latest approved by FDA.', 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/125547s000lbl.pdf', '2015-11'),
    'pi-moxetumomab-pasudotox-tdfk': fda('pi-moxetumomab-pasudotox-tdfk', 'LUMOXITI (moxetumomab pasudotox-tdfk) for injection, for intravenous use (Innate Pharma Inc.). Prescribing information, label revised 8/2020 (BLA 761104, supplement 003, FDA action 2020-08-20), obtained from the FDA label repository (Drugs@FDA) because no current Lumoxiti label is on DailyMed. This is the most recent Lumoxiti label FDA holds and is about six years old; the printed footer says it may not be the latest approved by FDA.', 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/761104s003lbl.pdf', '2020-08'),
};
export const CANCERS = [
    { id: 'cll-ofatumumab-untreated-chlorambucil', type: 'cll', name: 'Previously untreated chronic lymphocytic leukemia, in combination with chlorambucil, when fludarabine-based therapy is considered inappropriate' },
    { id: 'cll-ofatumumab-relapsed-fc', type: 'cll', name: 'Relapsed chronic lymphocytic leukemia, in combination with fludarabine and cyclophosphamide' },
    { id: 'cll-ofatumumab-extended-treatment', type: 'cll', name: 'Chronic lymphocytic leukemia, extended treatment in patients in complete or partial response after at least two lines of therapy for recurrent or progressive disease' },
    { id: 'cll-ofatumumab-refractory-fludarabine-alemtuzumab', type: 'cll', name: 'Chronic lymphocytic leukemia refractory to fludarabine and alemtuzumab' },
    { id: 'nsclc-squamous-metastatic-first-line-gem-cis', type: 'lung-nsclc', name: 'Metastatic squamous non-small cell lung cancer, first-line, in combination with gemcitabine and cisplatin' },
    { id: 'hairy-cell-relapsed-refractory', type: 'hairy-cell', name: 'Relapsed or refractory hairy cell leukemia' },
];
