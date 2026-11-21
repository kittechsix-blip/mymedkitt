// "Induction and rejection" group, part 2: three cards for drugs whose FDA labels do not mention transplantation (immune globulin intravenous,
// eculizumab, tocilizumab) plus membership rows for three cards that live in the oncology consult (rituximab, alemtuzumab, bortezomib).
// Every line is paraphrased from the drug's own FDA label (DailyMed SPL XML saved in research/transplant-sources/dailymed/) and cites that label.
// Nothing from outside the labels, no doses or infusion rates, and NO statement of what the drug is used for in transplant: that comes only from a guideline and is an
// editor note the integrator places from research/transplant-sources/cards/rejection-offlabel.report.md.
// Line format: a short head, a colon, one hazard; 200 characters at most. Interaction lines live in `interactions`, each starting with one agreed head, plain drug-named lines last.
// IMMUNE GLOBULIN is ONE product-neutral card (Privigen, Gammagard Liquid, Gamunex-C): a line citing all three labels says only what all three labels say;
// a statement found in one or two labels names its brand and comes after the shared lines.
const c = (v, ...cite) => ({ v, cite });
const PV = 'pi-privigen';
const GG = 'pi-gammagard-liquid';
const GX = 'pi-gamunex-c';
const SO = 'pi-soliris';
const AC = 'pi-actemra';
const IG = [PV, GG, GX];
const dm = (setid) => `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${setid}`;
export const SOURCES = {
    'pi-privigen': { key: 'pi-privigen', kind: 'fda-pi', text: 'PRIVIGEN (immune globulin intravenous [human], 10% liquid), CSL Behring LLC. Prescribing information, DailyMed set ID 7e5649da-75be-4a42-8eeb-4aeba562c401, SPL effective 2026-05-04.', url: dm('7e5649da-75be-4a42-8eeb-4aeba562c401') },
    'pi-gammagard-liquid': { key: 'pi-gammagard-liquid', kind: 'fda-pi', text: 'GAMMAGARD LIQUID (immune globulin infusion [human], 10% solution), Takeda Pharmaceuticals U.S.A., Inc. Prescribing information, DailyMed set ID 9d42adca-0dd7-4df7-864d-5a7feee52130, SPL effective 2025-12-10.', url: dm('9d42adca-0dd7-4df7-864d-5a7feee52130'), revised: '9/2024' },
    'pi-gamunex-c': { key: 'pi-gamunex-c', kind: 'fda-pi', text: 'GAMUNEX-C (immune globulin injection [human], 10% caprylate/chromatography purified), Grifols Therapeutics LLC. Prescribing information, DailyMed set ID ade6b84a-e95b-0a49-3296-f56208fdf35b, SPL effective 2026-11-01.', url: dm('ade6b84a-e95b-0a49-3296-f56208fdf35b'), revised: '5/2026' },
    'pi-soliris': { key: 'pi-soliris', kind: 'fda-pi', text: 'SOLIRIS (eculizumab) injection, Alexion Pharmaceuticals, Inc. Prescribing information, DailyMed set ID ebcd67fa-b4d1-4a22-b33d-ee8bf6b9c722, SPL effective 2026-07-08.', url: dm('ebcd67fa-b4d1-4a22-b33d-ee8bf6b9c722'), revised: 'Medication Guide 02/2025' },
    'pi-actemra': { key: 'pi-actemra', kind: 'fda-pi', text: 'ACTEMRA (tocilizumab) injection, Genentech, Inc. Prescribing information, DailyMed set ID 2e5365ff-cb2a-4b16-b2c7-e35c6bf2de13, SPL effective 2025-12-16.', url: dm('2e5365ff-cb2a-4b16-b2c7-e35c6bf2de13'), revised: 'Medication Guide 08/2025' },
};
// Classes. The three new classes carry NO class-level effects: each card is the only member, so its rows are written on the card.
// The three browse classes for shared oncology cards carry no effects either (the card's hazards come from its oncology classes); their mechanism is worded from that drug's own label.
export const CLASSES = [
    { id: 'tx-immune-globulin', name: 'Immune globulin (intravenous)', mechanism: c('Supplies opsonizing and neutralizing IgG antibodies against bacteria and viruses; the mechanism is not fully elucidated.', ...IG), effects: [] },
    { id: 'tx-c5-inhibitor', name: 'Complement C5 inhibitor', mechanism: c('Binds complement protein C5 and blocks its cleavage, preventing the terminal complement complex C5b-9.', SO), effects: [] },
    { id: 'tx-il6-antagonist', name: 'Interleukin-6 receptor antagonist', mechanism: c('Binds soluble and membrane-bound IL-6 receptors and inhibits IL-6-mediated signaling.', AC), effects: [] },
    { id: 'tx-anti-cd20', name: 'Anti-CD20 antibody', mechanism: c('Binds CD20 on pre-B and mature B lymphocytes and mediates B-cell lysis.', 'pi-rituximab'), effects: [] },
    { id: 'tx-anti-cd52', name: 'Anti-CD52 antibody', mechanism: c('A CD52-directed cytolytic antibody that binds CD52 on B and T lymphocytes.', 'pi-alemtuzumab'), effects: [] },
    { id: 'tx-proteasome-inhibitor', name: 'Proteasome inhibitor', mechanism: c('A reversible inhibitor of the chymotrypsin-like activity of the 26S proteasome.', 'pi-bortezomib'), effects: [] },
];
// ------------------------------------------------------------------ immune globulin intravenous (Privigen, Gammagard Liquid, Gamunex-C)
const immuneGlobulin = {
    id: 'immune-globulin-iv', generic: 'Immune globulin intravenous (human)', brands: ['Privigen', 'Gammagard Liquid', 'Gamunex-C'], aliases: ['IGIV', 'immune globulin intravenous'], editorAliases: ['IVIG'],
    unpinnedNames: ['IVIG'], // the Pharmacy drug store already has an IVIG entry: still searchable, never pinned
    classIds: ['tx-immune-globulin'], cancers: [], label: PV, tier: 'short',
    mechanism: c('Supplies opsonizing and neutralizing IgG antibodies against bacteria and viruses; the mechanism is not fully elucidated.', ...IG),
    // boxed: only what all three boxes say
    boxedWarning: [
        c('Thrombosis: may occur with IG products even without known risk factors; risks: advanced age, immobilization, hypercoagulability, prior thrombosis, estrogens, catheters, hyperviscosity, heart risk', ...IG),
        c('Kidney failure: renal dysfunction, acute renal failure, osmotic nephrosis, death in predisposed patients (renal insufficiency, diabetes, over 65, hypovolemia, sepsis, paraproteinemia, nephrotoxins)', ...IG),
        c('Sucrose: renal dysfunction and failure are more common with IGIV products that contain sucrose; none of these three products contains sucrose', ...IG),
        c('Minimum dose and rate: for patients at risk of thrombosis, the labels say to give the minimum dose and infusion rate practicable', ...IG),
        c('Hydration: the labels say to ensure adequate hydration before administration', ...IG),
        c('Monitoring: the labels say to monitor for signs and symptoms of thrombosis and to assess blood viscosity in patients at risk for hyperviscosity', ...IG),
    ],
    alsoOnLabel: [
        c('Thrombosis: limb pain or swelling, dyspnea, chest pain, rapid pulse or one-sided weakness; viscosity risk: cryoglobulins, high triglycerides, monoclonal gammopathy; consider baseline viscosity', ...IG),
        c('Kidney failure: decreased urine output, sudden weight gain, edema or dyspnea; the labels say to assess renal function before the first infusion and to consider discontinuing if it deteriorates', ...IG),
        c('Boxed renal instruction: Privigen says minimum dose and infusion rate; Gamunex-C minimum concentration and infusion rate; the Gammagard Liquid box omits it (5.2 has minimum-rate advice)', ...IG),
        c('Aseptic meningitis: severe headache, neck stiffness, drowsiness, fever, usually starting within hours to 2 days; CSF pleocytosis, cultures negative; the labels say to rule out other meningitis', ...IG),
        c('Aseptic meningitis risk: Gammagard Liquid says more frequent in females; Privigen and Gamunex-C say more frequent with high doses or rapid infusion', ...IG),
        c('TRALI: noncardiogenic pulmonary edema, severe respiratory distress, hypoxemia, fever, normal left ventricular function, usually within 1 to 6 hours; oxygen with adequate ventilation may manage it', ...IG),
        c('Hyperproteinemia: increased viscosity and hyponatremia may occur; low sodium may be pseudo (low calculated osmolality or raised osmolar gap); cutting free water can worsen viscosity and clotting', ...IG),
        c('Contraindications: prior anaphylactic or severe systemic reaction to human immune globulin; IgA deficiency with anti-IgA antibodies and prior hypersensitivity; Privigen only: hyperprolinemia', ...IG),
        c('Overdose: may lead to fluid overload and hyperviscosity; elderly and renal-impairment patients are at risk, and Gammagard Liquid and Gamunex-C add cardiac impairment', ...IG),
        c('Hemoglobin checks: Privigen and Gamunex-C say before infusion, within about 36 hours and again at 7 to 10 days; Gammagard Liquid says before and at 36 to 96 hours, in higher-risk patients', ...IG),
        c('Privigen only: hemolysis has caused severe renal dysfunction or failure and disseminated intravascular coagulation', PV),
        c('Hypertension: Privigen warns of hypertensive urgency during or soon after infusion, more often with prior hypertension; Gamunex-C lists it in a CIDP trial (8.8% of 113 vs 3.2% of 95 on placebo)', PV, GX),
        c('Test interference: passively transferred antibodies can confuse serology; Gammagard Liquid only: false-positive beta-D-glucan fungal assays, possibly for weeks', ...IG),
        c('Volume overload: Privigen says to weigh the high-dose regimen in patients at risk of overload; Gamunex-C says not to use it where fluid volume is a concern; Gammagard Liquid has no such warning', PV, GG, GX),
        c('Infectious agents: made from human blood, so it may carry viruses and the variant CJD agent; the labels say to report a suspected transmitted infection to the manufacturer', ...IG),
        c('Gamunex-C only: do not give subcutaneously in ITP because of hematoma risk; this card covers intravenous use', GX),
    ],
    interactions: [
        c('Avoid together: mixing with other IGIV products; Gammagard Liquid says do not mix with other products, Privigen and Gamunex-C add other intravenous medications', ...IG),
        c('Avoid together: Gamunex-C and heparin through one lumen; flush a heparin lock with dextrose 5% in water or saline, not heparin', GX),
        c('Immune globulin: passive antibodies may interfere with the response to live virus vaccines (measles, mumps, rubella, varicella); the labels say to tell the immunizing physician', ...IG),
    ],
    effects: [
        {
            tox: 'tx-hemolysis', cite: IG,
            quirk: c('Hemolysis: positive DAT, delayed or acute intravascular hemolysis; higher risk with high doses and non-O blood group; consider testing in higher-risk patients; cross-match if transfusion is needed', ...IG),
        },
        {
            tox: 'tx-infusion-anaphylaxis', cite: IG,
            quirk: c('Hypersensitivity: severe reactions, including anaphylaxis, with higher risk if anti-IgA antibodies are present; the labels say to discontinue the infusion immediately and treat', ...IG),
        },
    ],
};
// ------------------------------------------------------------------ eculizumab (Soliris)
const eculizumab = {
    id: 'eculizumab', generic: 'Eculizumab', brands: ['Soliris'],
    classIds: ['tx-c5-inhibitor'], cancers: [], label: SO, tier: 'short',
    mechanism: c('Binds complement protein C5 and blocks its cleavage, preventing the terminal complement complex C5b-9.', SO),
    boxedWarning: [
        c('Meningococcal infection: life-threatening and fatal infections occur with complement inhibitors and can become rapidly fatal if not recognized and treated early', SO),
        c('Vaccination: the label says to complete or update meningococcal vaccines (serogroups A, C, W, Y and B) at least 2 weeks before the first dose, unless delaying therapy is riskier', SO),
        c('Vaccinated patients: remain at increased risk of invasive meningococcal disease even if antibodies develop; the label says to monitor for early signs and evaluate immediately if infection is suspected', SO),
        c('REMS: because of this risk Soliris is available only through the restricted ULTOMIRIS and SOLIRIS REMS program', SO),
    ],
    alsoOnLabel: [
        c('Meningococcal signs, fever: fever; fever and a rash; fever with high heart rate; the label says to seek immediate medical attention if these occur', SO),
        c('Meningococcal signs, headache: headache with nausea or vomiting; headache and a fever; headache with a stiff neck or stiff back', SO),
        c('Meningococcal signs, other: confusion; muscle aches with flu-like symptoms; eyes sensitive to light', SO),
        c('Patient Safety Card: patients carry it during treatment and for 3 months after the last dose; the label says the increased meningococcal risk persists for several weeks after stopping', SO),
        c('After stopping: the label says to monitor at least 8 weeks for hemolysis in PNH and at least 12 weeks for TMA complications in aHUS', SO),
        c('TMA signs in aHUS: mental status change, seizures, angina, dyspnea or thrombosis', SO),
        c('TMA labs in aHUS: two, or repeats of one, of platelets down 25% or more from baseline or peak, creatinine or LDH up 25% or more from baseline or nadir', SO),
        c('TMA after stopping: the label says to consider reinstituting Soliris, plasma therapy, or organ-specific supportive measures if TMA complications occur in aHUS', SO),
        c('Meningococcal treatment: the label says to consider interrupting Soliris in patients treated for serious meningococcal infection, weighing the risk of interrupting for the disease treated', SO),
        c('Urgent start: if not up to date on vaccines, the label says to give antibacterial prophylaxis and vaccinate as soon as possible; best prophylaxis regimens have not been studied', SO),
        c('Anticoagulation: the effect of withdrawing anticoagulants during treatment is not established; the label says treatment with Soliris should not alter anticoagulant management', SO),
        c('Contraindication: initiation is contraindicated in patients with unresolved serious Neisseria meningitidis infection', SO),
        c('Serious events in aHUS studies: infections 24%, hypertension 5%, chronic renal failure 5% and renal impairment 5% of 78 adult and adolescent patients', SO),
        c('Liver injury: cholestatic or mixed pattern, reported after approval in patients with aHUS, within 3 to 27 days of starting treatment', SO),
    ],
    interactions: [
        c('Lowers level: plasma exchange, plasmapheresis or fresh frozen plasma infusion can reduce serum eculizumab; the label says a supplemental dose is required', SO),
        c('Lowers level: IVIg in patients with gMG can reduce serum eculizumab; the label says a supplemental dose is required', SO),
        c('Lowers level: neonatal Fc receptor blockers may lower exposure and reduce effectiveness; the label says to monitor closely for reduced effectiveness', SO),
    ],
    effects: [
        {
            tox: 'tx-meningococcal-infection', rank: 1, boxed: true, cite: [SO],
            quirk: c('Meningococcal infection: sepsis or meningitis in any serogroup; signs include fever, fever with rash or fast pulse, and confusion; the label says to evaluate immediately if suspected.', SO),
        },
        {
            tox: 'tx-serious-infection', cite: [SO],
            quirk: c('Other infections: pneumococcus, Haemophilus influenzae, disseminated gonococcal infection, and Aspergillus in immunocompromised or neutropenic patients; risk persists after vaccination.', SO),
        },
        {
            tox: 'tx-infusion-anaphylaxis', cite: [SO],
            quirk: c('Infusion reaction: anaphylaxis or other hypersensitivity; the label says to interrupt the infusion and give supportive measures if cardiovascular instability or respiratory compromise occurs.', SO),
        },
    ],
};
// ------------------------------------------------------------------ tocilizumab (Actemra)
const tocilizumab = {
    id: 'tocilizumab', generic: 'Tocilizumab', brands: ['Actemra'], unpinnedNames: ['Tocilizumab'],
    classIds: ['tx-il6-antagonist'], cancers: [], label: AC, tier: 'short',
    mechanism: c('Binds soluble and membrane-bound IL-6 receptors and inhibits IL-6-mediated signaling.', AC),
    boxedWarning: [
        c('Serious infections: may lead to hospitalization or death; most patients were also taking methotrexate or corticosteroids; the label says to interrupt Actemra until the infection is controlled', AC),
        c('Tuberculosis: active TB may be pulmonary or extrapulmonary; the label says to test for latent TB before use and during therapy, except in COVID-19, and to treat latent infection before use', AC),
        c('Invasive fungal infections: candidiasis, aspergillosis and pneumocystis; patients may present with disseminated rather than localized disease', AC),
        c('Other infections: bacterial, viral and other infections due to opportunistic pathogens', AC),
        c('Chronic or recurrent infection: the label says to weigh risks and benefits carefully before starting in these patients', AC),
        c('Monitoring: the label says to monitor all patients closely for infection signs during and after treatment, including TB in those who tested negative for latent TB beforehand', AC),
    ],
    alsoOnLabel: [
        c('Masked infection: signs and symptoms of acute inflammation may be lessened by suppression of acute phase reactants; in rheumatoid arthritis patients CRP fell to within normal range as early as week 2', AC),
        c('Active infection: the label says not to administer Actemra to patients with an active infection, including localized infections', AC),
        c('Liver disease: treatment is not recommended with active hepatic disease or hepatic impairment; patients with positive HBV or HCV serology were not studied', AC),
        c('Count thresholds: for RA, GCA and SSc-ILD the dosage-modification table says hold at ANC 500 to 1000 or platelets 50,000 to 100,000 per mm3, and discontinue below ANC 500 or platelets 50,000', AC),
        c('Viral reactivation: herpes zoster exacerbation was seen in trials; no hepatitis B reactivation was seen, but patients who screened positive for hepatitis were excluded', AC),
        c('Liver tests: some serious liver injury cases had only mildly elevated transaminases, with signs or symptoms of liver dysfunction', AC),
        c('Demyelinating disorders: multiple sclerosis and CIDP were rarely reported in rheumatoid arthritis studies; the label says to use caution in preexisting or recent-onset demyelinating disease', AC),
        c('Overdose: limited data; the label says to monitor for adverse reactions and treat them symptomatically; dose-limiting neutropenia occurred at the highest single dose in healthy volunteers', AC),
        c('Contraindication: known hypersensitivity to Actemra', AC),
        c('Lipids: total cholesterol, triglycerides, LDL and HDL cholesterol rose; the label says to assess lipids about 4 to 8 weeks after starting', AC),
        c('Malignancy: the effect on malignancy is not known, but malignancies were seen in studies and immunosuppressants may raise the risk', AC),
        c('Reported after approval: hypofibrinogenemia; serious cutaneous reactions including DRESS in patients with autoinflammatory conditions', AC),
    ],
    interactions: [
        c('Lowers the other drug: narrow-index CYP450 substrates such as warfarin, cyclosporine, theophylline; the label says to monitor effect or levels on starting or stopping, and the effect may last weeks', AC),
        c('Lowers the other drug: CYP3A4 substrates where lower effect is unwanted, such as oral contraceptives, lovastatin or atorvastatin; the label says to use caution', AC),
        c('Avoid together: biologic DMARDs such as TNF antagonists, IL-1R antagonists, anti-CD20 antibodies and co-stimulation modulators; not studied, with possible added immunosuppression and infection', AC),
        c('Avoid together: live vaccines; the label says to avoid their concurrent use', AC),
    ],
    effects: [
        {
            tox: 'tx-serious-infection', rank: 1, boxed: true, cite: [AC],
            quirk: c('Serious infection: bacterial, TB, invasive fungal and other opportunistic infections, which can present disseminated rather than localized; the label says to hold for serious infection or sepsis.', AC),
        },
        {
            tox: 'drug-gi-perforation', cite: [AC],
            quirk: c('GI perforation: mostly from diverticulitis, mostly in patients also taking NSAIDs, corticosteroids or methotrexate; the label says to promptly evaluate fever, new abdominal symptoms or bowel change.', AC),
        },
        {
            tox: 'tx-infusion-anaphylaxis', cite: [AC],
            quirk: c('Anaphylaxis: fatal events reported with IV use, as early as the first infusion and despite premedication; the label says to discontinue immediately, treat promptly and monitor until resolved.', AC),
        },
        {
            tox: 'tx-cytopenia', cite: [AC],
            quirk: c('Low counts: neutropenia and thrombocytopenia; not recommended to start in RA, GCA or SSc-ILD below ANC 2000 or platelets 100,000 per mm3; infections were uncommonly reported, with no serious bleeding.', AC),
        },
        {
            tox: 'drug-hepatotoxicity', cite: [AC],
            quirk: c('Liver injury: some cases ended in liver transplant or death, months to years after starting; the label says to check liver tests promptly for fatigue, anorexia, upper right pain, dark urine, jaundice.', AC),
        },
        {
            tox: 'drug-pancreatitis', basis: 'postmarketing', cite: [AC], ask: [],
            quirk: c('Pancreatitis: reported after approval.', AC),
        },
        {
            tox: 'drug-severe-skin', basis: 'postmarketing', cite: [AC], ask: [],
            quirk: c('Severe skin reaction: Stevens-Johnson syndrome reported after approval.', AC),
        },
    ],
};
export const DRUGS = [immuneGlobulin, eculizumab, tocilizumab];
// Cards that live in the oncology consult (src/data/onc-drugs/drugs/): shown here, never copied. No transplant organ is named in any of their labels.
export const MEMBERS = [
    { drug: 'rituximab', classIds: ['tx-anti-cd20'], organs: [] },
    { drug: 'alemtuzumab', classIds: ['tx-anti-cd52'], organs: [] },
    { drug: 'bortezomib', classIds: ['tx-proteasome-inhibitor'], organs: [] },
];
