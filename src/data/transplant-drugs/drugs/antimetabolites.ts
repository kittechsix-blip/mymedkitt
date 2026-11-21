import type { Cited, DrugClass, DrugEffectOverride, OncDrug, OncSource } from '../../onc-drugs/types.js';
import type { TxGroup } from '../types.js';

// Antimetabolite maintenance immunosuppressants for the Transplant Drugs Side-effects consult: mycophenolate mofetil (CellCept),
// mycophenolic acid delayed-release (Myfortic) and azathioprine (Imuran). Every line is paraphrased from the drug's own FDA label
// (DailyMed SPL XML saved in research/transplant-sources/dailymed/) and cites that label. Nothing from outside the labels. No doses.
// Line format: a short head, a colon, one hazard; 200 characters at most. A timing's text before its first top-level comma is the card badge (48 characters at most).
// alsoOnLabel (12 lines or fewer): what changes care today; warned events with no row; overdose; contraindications; the rest.
// interactions: one drug or class per line, heads in TAXONOMY.md order; a statement fitting no head is a plain drug-named line, last.
const c = (v: string, ...cite: string[]): Cited => ({ v, cite });

const C = 'pi-cellcept';
const M = 'pi-myfortic';
const I = 'pi-imuran';
const ALL = [C, M, I];

const dm = (setid: string): string => `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${setid}`;

export const SOURCES: Record<string, OncSource> = {
  [C]: { key: C, kind: 'fda-pi', text: 'CELLCEPT (mycophenolate mofetil) capsules, tablets, oral suspension and intravenous, Genentech, Inc. Prescribing information, DailyMed set ID 37241e87-4af4-4dc3-a1aa-ea6f20d8dc40, SPL effective 2026-08-05.', url: dm('37241e87-4af4-4dc3-a1aa-ea6f20d8dc40'), revised: '7/2026' },
  [M]: { key: M, kind: 'fda-pi', text: 'MYFORTIC (mycophenolic acid) delayed-release tablets, Novartis Pharmaceuticals Corporation. Prescribing information, DailyMed set ID eed26501-890d-4ff6-88e7-6dbea4726e53, SPL effective 2026-07-29.', url: dm('eed26501-890d-4ff6-88e7-6dbea4726e53'), revised: '07/2026' },
  [I]: { key: I, kind: 'fda-pi', text: 'IMURAN (azathioprine) 50-mg scored tablets, Legacy Pharma Inc. SEZC. Prescribing information, DailyMed set ID 4d62b6e4-a9d4-4818-e063-6394a90aa208, SPL effective 2026-03-19. The label text carries a "Revised" line dated later than this effective date, so no revision date is shown.', url: dm('4d62b6e4-a9d4-4818-e063-6394a90aa208') },
};

// Class effects only where all three labels support them (infection and malignancy are warned in every one). Box flags and ranks are per drug.
export const CLASSES: DrugClass[] = [
  {
    id: 'tx-antimetabolite', name: 'Antimetabolites (mycophenolate, azathioprine)',
    mechanism: c('Immunosuppressant used to prevent rejection of a transplanted organ.', ...ALL),
    effects: [
      { tox: 'tx-serious-infection', cite: ALL },
      { tox: 'tx-malignancy', cite: ALL },
      { tox: 'tx-cytopenia', cite: ALL },
    ],
  },
];

const PANC = (k: string, v: string, pm: boolean): DrugEffectOverride => ({
  tox: 'drug-pancreatitis', cite: [k], ask: [], ...(pm ? { basis: 'postmarketing' as const } : {}), quirk: c(v, k),
});

// ------------------------------------------------------------------ mycophenolate mofetil (CellCept)
const mmf: OncDrug = {
  id: 'mycophenolate-mofetil', generic: 'Mycophenolate mofetil', brands: ['CellCept'], aliases: ['mycophenolate'], editorAliases: ['MMF', 'MPA'],
  unpinnedNames: ['mycophenolate', 'MPA'],
  classIds: ['tx-antimetabolite'], cancers: ['kidney', 'heart', 'liver'], label: C, tier: 'full',
  mechanism: c('Becomes mycophenolic acid, which blocks guanosine nucleotide synthesis and so slows T- and B-lymphocyte growth.', C),
  boxedWarning: [
    c('Embryofetal toxicity: use in pregnancy raises the risk of first trimester pregnancy loss and congenital malformations; avoid if safer options exist; counsel females of reproductive potential', C),
    c('Malignancies: raises the risk of lymphoma and other malignancies, particularly of the skin', C),
    c('Serious infections: raises susceptibility to bacterial, viral, fungal and protozoal infections, including opportunistic ones and hepatitis B or C reactivation; may lead to hospitalization and death', C),
  ],
  effects: [
    {
      tox: 'tx-malignancy', rank: 1, boxed: true, cite: [C],
      quirk: c('Malignancy: lymphoma and other cancers, particularly of the skin; PTLD is mostly EBV-related and greatest in EBV-seronegative patients, including many young children; limit sun and UV exposure.', C),
    },
    {
      tox: 'tx-serious-infection', rank: 2, boxed: true, cite: [C],
      quirk: c('Serious infection: bacterial, fungal, protozoal and viral, including BK virus nephropathy, PML, CMV and hepatitis B or C reactivation; label: consider dose reduction or stopping, weighing graft risk.', C),
    },
    {
      tox: 'tx-cytopenia', cite: [C],
      timing: c('Most often 31 to 180 days after transplant, for neutropenia in kidney, heart and liver transplant patients', C),
      quirk: c('Neutropenia: label says interrupt or reduce dosing, test and manage if ANC falls below 1.3 x 10^3/µL; patients should report infection, unexpected bruising or bleeding at once.', C),
    },
    {
      tox: 'tx-gi-bleed', cite: [C], ask: [],
      quirk: c('GI bleeding: bleeding requiring hospitalization, hematemesis, melena and hemorrhagic gastritis or colitis were common in trials; be aware, particularly with existing gastrointestinal disease.', C),
    },
    {
      tox: 'drug-gi-perforation', cite: [C], ask: [],
      quirk: c('GI perforation: ulceration and perforation were observed in clinical trials; be aware, particularly with existing gastrointestinal disease.', C),
    },
    {
      tox: 'tx-infusion-anaphylaxis', cite: [C], ask: [],
      quirk: c('Anaphylaxis: reported after approval, usually within hours to the next day of starting; label says discontinue, treat and monitor until symptoms resolve.', C),
    },
    {
      tox: 'tx-angioedema', cite: [C], ask: [],
      quirk: c('Angioedema: reported after approval, usually within hours to the next day of starting; label says discontinue, treat and monitor until symptoms resolve.', C),
    },
    PANC(C, 'Pancreatitis: reported after approval.', true),
  ],
  alsoOnLabel: [
    c('Pregnancy: females of reproductive potential should be tested before starting and 8 to 10 days later; if positive consider alternatives; Medication Guide: do not stop, call your doctor right away', C),
    c('Not interchangeable: CellCept oral forms are not used interchangeably with mycophenolic acid delayed-release tablets without physician supervision; absorption rates are not equivalent', C),
    c('Acute inflammatory syndrome: fever, arthralgias, arthritis, muscle pain, high CRP or ESR without infection, within weeks to months of starting treatment or a dose increase', C),
    c('AIS action: label says discontinue treatment and consider other treatment alternatives based on the risk and benefit for the patient', C),
    c('Pure red cell aplasia: reported with CellCept plus other immunosuppressants; in some cases reversible with dose reduction or stopping, but reduced immunosuppression may risk the graft', C),
    c('Other infections: tuberculosis, atypical mycobacterial infection, meningitis and infectious endocarditis reported after approval', C),
    c('Intravenous use: never as a bolus or rapid injection; rapid infusion raises the risk of local reactions such as phlebitis and thrombosis', C),
    c('Overdose: leukopenia, neutropenia and abdominal pain, diarrhea, nausea, vomiting; hemodialysis usually does not remove MPA or MPAG, but bile acid sequestrants such as cholestyramine can remove MPA', C),
    c('Contraindications: history of hypersensitivity, including anaphylaxis, to mycophenolate mofetil, mycophenolic acid or any component; the intravenous form also to Polysorbate 80', C),
    c('HGPRT deficiency: avoid in Lesch-Nyhan and Kelley-Seegmiller syndromes; may worsen uric acid overproduction with gout, kidney stones and renal failure', C),
    c('Live vaccines: avoid during treatment (for example intranasal influenza, MMR, oral polio, BCG, yellow fever, varicella); vaccinations may be less effective', C),
    c('Donation: no blood donation during treatment and for at least 6 weeks after stopping; men no semen donation during treatment and for 90 days after', C),
    c('Lung disease: bronchiectasis, interstitial lung disease and fatal pulmonary fibrosis reported rarely after approval; consider for dyspnea to respiratory failure in post-transplant patients', C),
  ],
  interactions: [
    c('Raises level: isavuconazole inhibits glucuronidation and raises MPA exposure, which may raise the risk of CellCept adverse reactions; label says monitor efficacy and adverse reactions', C),
    c('Lowers level: proton pump inhibitors (lansoprazole, pantoprazole) lower MPA and may reduce efficacy; label says monitor for alterations in efficacy', C),
    c('Lowers level: antacids with magnesium or aluminum hydroxide lower MPA and may reduce efficacy; label says give them at least 2 hours after CellCept', C),
    c('Lowers level: rifampin interferes with enterohepatic recirculation and lowers MPA; label says monitor for alterations in efficacy or CellCept adverse reactions', C),
    c('Lowers level: cyclosporine A lowers MPA; in kidney transplant patients MPA exposure was about 30 to 50% greater without it; label: consider this when MMF is used without cyclosporine; monitor', C),
    c('Lowers level: norfloxacin plus metronidazole together lowered MPA AUC by 33% after one MMF dose in 11 healthy volunteers; the label gives no action', C),
    c('Lowers level: bile acid sequestrants (cholestyramine) interfere with enterohepatic recirculation and lower MPA; label says monitor efficacy and CellCept adverse reactions', C),
    c('Lowers level: calcium free phosphate binders (sevelamer) lower MPA and may reduce efficacy; label says give them at least 2 hours after CellCept', C),
    c('Lowers level: trimethoprim/sulfamethoxazole may lower MPA by interfering with enterohepatic recirculation; label says monitor for alterations in efficacy or adverse reactions', C),
    c('Lowers level: fluoroquinolone antimicrobials may lower MPA by interfering with enterohepatic recirculation; label says monitor for alterations in efficacy or adverse reactions', C),
    c('Lowers level: penicillin antimicrobials may lower MPA by interfering with enterohepatic recirculation; label says monitor for alterations in efficacy or adverse reactions', C),
    c('Lowers level: cephalosporin antimicrobials may lower MPA by interfering with enterohepatic recirculation; label says monitor for alterations in efficacy or adverse reactions', C),
    c('Lowers level: aminoglycoside antimicrobials may lower MPA by interfering with enterohepatic recirculation; label says monitor for alterations in efficacy or adverse reactions', C),
    c('Lowers level: telmisartan induces glucuronidation and lowers MPA; label says monitor for alterations in efficacy or CellCept adverse reactions', C),
    c('Raises the other drug: acyclovir may rise as MPAG competes for tubular secretion; label says monitor for drug-related adverse reactions in patients with renal impairment', C),
    c('Raises the other drug: valacyclovir may rise as MPAG competes for tubular secretion; label says monitor for drug-related adverse reactions in patients with renal impairment', C),
    c('Raises the other drug: ganciclovir may rise as MPAG competes for tubular secretion; label says monitor for drug-related adverse reactions in patients with renal impairment', C),
    c('Raises the other drug: valganciclovir may rise as MPAG competes for tubular secretion; label says monitor for drug-related adverse reactions in patients with renal impairment', C),
    c('Raises the other drug: probenecid may rise as MPAG competes for tubular secretion; label says monitor for drug-related adverse reactions in patients with renal impairment', C),
    c('Lowers the other drug: combination oral contraceptives, as levonorgestrel exposure falls, may lose effectiveness; label says use additional barrier contraceptive methods', C),
  ],
};

// ------------------------------------------------------------------ mycophenolic acid delayed-release (Myfortic)
const mpa: OncDrug = {
  id: 'mycophenolic-acid', generic: 'Mycophenolic acid (delayed-release)', brands: ['Myfortic'], aliases: ['mycophenolate sodium', 'mycophenolate'], editorAliases: ['MPA', 'MPS'],
  unpinnedNames: ['mycophenolate', 'MPA'],
  classIds: ['tx-antimetabolite'], cancers: ['kidney'], label: M, tier: 'full',
  mechanism: c('Blocks purine synthesis that T and B lymphocytes need to multiply; it slows lymphocyte growth.', M),
  boxedWarning: [
    c('Embryofetal toxicity: use in pregnancy raises the risks of pregnancy loss and congenital malformations; avoid if safer options exist; counsel females of reproductive potential', M),
    c('Malignancies: raises the risk of lymphoma and other malignancies, particularly of the skin, due to immunosuppression', M),
    c('Serious infections: raises susceptibility to bacterial, viral, fungal and protozoal infections, including opportunistic infections', M),
    c('Who prescribes: only physicians experienced in immunosuppressive therapy and organ transplant management should prescribe Myfortic', M),
  ],
  effects: [
    {
      tox: 'tx-malignancy', rank: 1, boxed: true, cite: [M],
      quirk: c('Malignancy: lymphoma and other cancers, particularly of the skin; PTLD is mostly EBV-related and greatest in EBV-seronegative patients, including many young children; limit sun and UV exposure.', M),
    },
    {
      tox: 'tx-serious-infection', rank: 2, boxed: true, cite: [M],
      quirk: c('Serious infection: bacterial, viral, fungal, protozoal, including BK virus nephropathy, PML, CMV, hepatitis B or C reactivation; label: consider reducing immunosuppression, weighing graft risk.', M),
    },
    {
      tox: 'tx-cytopenia', cite: [M],
      quirk: c('Blood dyscrasias: neutropenia or anemia; label says interrupt or reduce dosing, test and manage if ANC falls below 1.3 x 10^3/mcL or anemia develops.', M),
    },
    {
      tox: 'tx-gi-bleed', cite: [M], ask: [],
      quirk: c('GI bleeding: bleeding requiring hospitalization, gastric and duodenal ulcers reported; label: administer with caution in active serious digestive system disease.', M),
    },
    {
      tox: 'drug-gi-perforation', cite: [M], ask: [],
      quirk: c('GI perforation: intestinal perforations reported; label: administer with caution in active serious digestive system disease.', M),
    },
    {
      tox: 'tx-infusion-anaphylaxis', cite: [M], ask: [],
      quirk: c('Anaphylaxis: reported after approval, usually within hours to the next day of starting; label says discontinue, treat and monitor until signs and symptoms resolve.', M),
    },
    {
      tox: 'tx-angioedema', cite: [M], ask: [],
      quirk: c('Angioedema: reported after approval, usually within hours to the next day of starting; label says discontinue, treat and monitor until signs and symptoms resolve.', M),
    },
  ],
  alsoOnLabel: [
    c('Pregnancy: females of reproductive potential should be tested before starting and 8 to 10 days later; if positive consider alternatives; Medication Guide: do not stop, call your doctor right away', M),
    c('Not interchangeable: Myfortic delayed-release tablets and MMF tablets or capsules are not used interchangeably without physician supervision because absorption rates differ', M),
    c('Acute inflammatory syndrome: fever, arthralgias, arthritis, muscle pain, high CRP or ESR without infection, within weeks to months of starting treatment or a dose increase', M),
    c('AIS action: label says discontinue treatment and consider other treatment alternatives based on the risk and benefit for the patient', M),
    c('Pure red cell aplasia: seen with MPA derivatives plus other immunosuppressants; may reverse with dose reduction or stopping, but reduced immunosuppression may risk the graft; change under supervision', M),
    c('Other infections: meningitis, infectious endocarditis, tuberculosis and atypical mycobacterial infection listed among life-threatening infections with MPA exposure', M),
    c('Overdose: may oversuppress the immune system, with infection, sepsis, neutropenia or anemia; dialysis is not expected to remove clinically significant MPA (98% protein bound); supportive care', M),
    c('Overdose removal: activated charcoal or bile sequestrants such as cholestyramine may reduce MPA exposure by interfering with enterohepatic circulation', M),
    c('Contraindications: history of hypersensitivity, including anaphylaxis, to mycophenolate sodium, mycophenolic acid, mycophenolate mofetil or any excipient', M),
    c('HGPRT deficiency: avoid in Lesch-Nyhan and Kelley-Seegmiller syndromes; may worsen uric acid overproduction with gout, kidney stones and renal failure', M),
    c('Live vaccines: avoid during treatment; vaccinations may be less effective', M),
    c('Donation: no blood donation during treatment and for at least 6 weeks after stopping; men no semen donation during treatment and for 90 days after', M),
    c('Pancreatitis: listed among reactions with exposure to MPA as the sodium salt or mofetil ester', M),
  ],
  interactions: [
    c('Lowers level: cyclosporine inhibits enterohepatic recirculation and may lower MPA; levels may also change on switching to or from cyclosporine', M),
    c('Lowers level: magnesium and aluminum hydroxide antacids lowered MPA; label recommends not giving them at the same time as Myfortic', M),
    c('Lowers level: sevelamer and other calcium-free phosphate binders may lower MPA (MMF study); label says they should not be given at the same time as Myfortic', M),
    c('Lowers level: ciprofloxacin may lower MPA by altering gut flora; clinical relevance unclear; label says no dose adjustment of Myfortic is needed', M),
    c('Lowers level: amoxicillin plus clavulanic acid may lower MPA by altering gut flora; clinical relevance unclear; label says no dose adjustment of Myfortic is needed', M),
    c('Raises the other drug: acyclovir and MPAG may rise by competing for tubular secretion, more so in renal impairment; may be taken with Myfortic; label says monitor blood cell counts', M),
    c('Raises the other drug: valacyclovir and MPAG may rise by competing for tubular secretion, more so in renal impairment; may be taken with Myfortic; label says monitor blood cell counts', M),
    c('Raises the other drug: ganciclovir and MPAG may rise by competing for tubular secretion, more so in renal impairment; may be taken with Myfortic; label says monitor blood cell counts', M),
    c('Raises the other drug: valganciclovir and MPAG may rise by competing for tubular secretion, more so in renal impairment; may be taken with Myfortic; label says monitor blood cell counts', M),
    c('Lowers the other drug: hormonal contraceptives (pill, patch, ring, injection, implant) could theoretically lose effectiveness; label says additional barrier methods must be used', M),
    c('Avoid together: cholestyramine and other bile acid sequestrants may reduce efficacy; label says do not give them with Myfortic', M),
    c('Avoid together: oral activated charcoal may reduce efficacy; label says do not give it with Myfortic', M),
    c('Avoid together: azathioprine; both inhibit purine metabolism and the label recommends Myfortic not be given with it', M),
    c('Avoid together: mycophenolate mofetil; both inhibit purine metabolism and the label recommends Myfortic not be given with it', M),
    c('Avoid together: norfloxacin plus metronidazole may lower MPA; label says Myfortic is not recommended with the combination, and no effect was seen when each was given separately', M),
    c('Avoid together: rifampin may lower MPA; label says Myfortic is not recommended with it unless the benefit outweighs the risk', M),
  ],
};

// ------------------------------------------------------------------ azathioprine (Imuran)
const aza: OncDrug = {
  id: 'azathioprine', generic: 'Azathioprine', brands: ['Imuran'], aliases: ['azathioprine'], editorAliases: ['AZA'],
  classIds: ['tx-antimetabolite'], cancers: ['kidney'], label: I, tier: 'full',
  mechanism: c('Suppresses cell-mediated immunity; converted to 6-mercaptopurine; the label calls the mechanism somewhat obscure.', I),
  // The one hazard with no category (mutagenic potential) goes first; the rest follow the label's box order (malignancy, post-transplant lymphoma, HSTCL in IBD, hematologic toxicities).
  boxedWarning: [
    c('Mutagenic potential: the box tells physicians to be very familiar with the mutagenic potential to both men and women', I),
    c('Malignancy: chronic immunosuppression with Imuran, a purine antimetabolite, increases the risk of malignancy; reports include post-transplant lymphoma', I),
    c('Hepatosplenic T-cell lymphoma: reported in patients with inflammatory bowel disease', I),
    c('Hematologic toxicities: the box tells physicians to be very familiar with possible hematologic toxicities', I),
  ],
  effects: [
    {
      tox: 'tx-malignancy', rank: 1, boxed: true, cite: [I],
      quirk: c('Malignancy: post-transplant lymphoma and other malignancies, particularly of the skin; label says keep immunosuppression at the lowest effective level and limit sun and UV exposure.', I),
    },
    {
      tox: 'tx-cytopenia', rank: 2, boxed: true, cite: [I],
      quirk: c('Low blood counts: severe leukopenia, thrombocytopenia, anemia, pancytopenia or marrow suppression; dose-related, may occur late; label: prompt dose reduction or temporary withdrawal may be necessary.', I),
    },
    {
      tox: 'tx-serious-infection', cite: [I],
      quirk: c('Serious infection: bacterial, viral, fungal, protozoal and opportunistic, including reactivation of latent infection; PML reported; for PML consider reducing immunosuppression, weighing graft risk.', I),
    },
    {
      tox: 'drug-hepatotoxicity', cite: [I], ask: [],
      timing: c('Most often within 6 months of transplantation, for hepatotoxicity following transplantation on Imuran', I),
      quirk: c('Liver injury: raised alkaline phosphatase, bilirubin or transaminases, mainly in allograft recipients; generally reversible after interrupting Imuran; periodic liver tests are indicated.', I),
    },
  ],
  alsoOnLabel: [
    c('GI hypersensitivity: severe nausea and vomiting, with diarrhea, rash, fever, myalgias, raised liver enzymes or hypotension; reversible on stopping; recurs within hours of one rechallenge dose', I),
    c('TPMT or NUDT15 deficiency: severe, life-threatening myelotoxicity at usual doses; deaths with absent TPMT; label says consider alternative therapy if homozygous, reduced dosage if heterozygous', I),
    c('Veno-occlusive disease: rare, life-threatening hepatic VOD described in transplant patients on chronic azathioprine; label says permanently withdraw Imuran if clinically suspected', I),
    c('Count trigger: prompt reduction or temporary withdrawal may be necessary with a rapid fall in or persistently low leukocyte count, or other evidence of bone marrow depression', I),
    c('Counts in rejection: hematologic toxicities may be more severe in renal transplant patients whose homograft is undergoing rejection', I),
    c('DRESS: reported; label says consider the diagnosis in a patient with new-onset drug-induced Sweet syndrome and hypersensitivity', I),
    c('Sweet syndrome: acute febrile neutrophilic dermatosis reported; label says consider reducing or discontinuing Imuran in drug-induced Sweet syndrome', I),
    c('Pregnancy: can cause fetal harm (category D); label says avoid during pregnancy whenever possible and weigh risk against benefit', I),
    c('Overdose: very large doses may cause marrow hypoplasia, bleeding, infection and death; about 45% is removed during an 8-hour hemodialysis', I),
    c('Contraindications: hypersensitivity to Imuran; for rheumatoid arthritis, pregnancy; prior alkylating agents (cyclophosphamide, chlorambucil, melphalan) may give a prohibitive malignancy risk', I),
    c('Pancreatitis: vomiting with abdominal pain may occur rarely with a hypersensitivity pancreatitis', I),
    c('Other low-frequency effects: skin rashes, alopecia, fever, arthralgias, diarrhea, steatorrhea and reversible interstitial pneumonitis', I),
    c('Nursing: use is not recommended; azathioprine or its metabolites pass into breast milk at low levels', I),
  ],
  interactions: [
    c('Raises level: allopurinol may raise azathioprine or 6-MP, leading to toxicity; label says reduce the Imuran dose; consider further reduction or alternatives if TPMT is low or absent', I),
    c('Adds marrow risk: co-trimoxazole and other drugs affecting leukocyte production may lead to exaggerated leukopenia, especially in renal transplant recipients', I),
    c('Adds marrow risk: ACE inhibitors used to control hypertension have been reported to induce anemia and severe leukopenia', I),
    c('Adds marrow risk: ribavirin for hepatitis C has been reported to induce severe pancytopenia and may increase azathioprine myelotoxicity; label says monitor blood counts including platelets', I),
    c('Lowers the other drug: warfarin; Imuran may inhibit its anticoagulant effect', I),
    c('Avoid together: febuxostat, also a xanthine oxidase inhibitor; label says concomitant use with Imuran is not recommended', I),
    c('Aminosalicylates (sulphasalazine, mesalazine, olsalazine): in vitro evidence they inhibit the TPMT enzyme; label says concomitant use with Imuran should be done with caution', I),
  ],
};

export const DRUGS: OncDrug[] = [mmf, mpa, aza];

const group: TxGroup = { DRUGS, CLASSES, SOURCES };
export default group;
