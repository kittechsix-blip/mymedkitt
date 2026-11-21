// mTOR inhibitors for the Transplant Drugs Side-effects consult: sirolimus (generic sirolimus label) and everolimus for transplant (Zortress label).
// Every line is paraphrased from the drug's own FDA label (DailyMed SPL XML saved in research/transplant-sources/dailymed/) and cites that label.
// The oncology everolimus card (Afinitor label) is a separate card; nothing here comes from it. No doses.
// Line format: a short head, a colon, one hazard; 200 characters at most. A timing's text before its first top-level comma is the card badge (48 characters at most).
// Interactions live in `interactions` (heads and order per research/transplant-sources/cards/TAXONOMY.md); alsoOnLabel holds the non-interaction lines (12 or fewer where the warned events allow).
const c = (v, ...cite) => ({ v, cite });
const SRL = 'pi-sirolimus';
const EVR = 'pi-zortress';
const VRC = 'pi-vfend-sirolimus-xref';
const POS = 'pi-noxafil-sirolimus-xref';
export const SOURCES = {
    [SRL]: {
        key: SRL, kind: 'fda-pi',
        text: 'SIROLIMUS tablets (sugar-coated), Mylan Pharmaceuticals Inc. Prescribing information, DailyMed set ID 5908cd1a-fc5a-462f-99ed-1d8983e253c9, SPL effective 2026-03-26; SPL marketing category "NDA AUTHORIZED GENERIC". This is the authorised-generic sirolimus tablets label, not the Rapamune label: its tablets are imprinted "RAPAMUNE", its packages read "GREENSTONE BRAND sirolimus", and it names Wyeth Pharmaceutical Division of Wyeth Holdings LLC as a manufacturer. No Rapamune-branded label is on DailyMed.',
        url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=5908cd1a-fc5a-462f-99ed-1d8983e253c9', revised: 'Nov 2024',
    },
    [EVR]: {
        key: EVR, kind: 'fda-pi',
        text: 'ZORTRESS (everolimus) tablets, Novartis Pharmaceuticals Corporation. Prescribing information (transplant indications), DailyMed set ID e082a024-7850-400b-a5c2-2a140612562a, SPL effective 2026-09-16.',
        url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e082a024-7850-400b-a5c2-2a140612562a', revised: 'February 2024',
    },
    // Cross-reference sources (Vfend: quoted on the sirolimus and Zortress cards; Noxafil: sirolimus card only; each as the OTHER drug's label). Same labels as azoles.ts; separate keys so no source key repeats across group files.
    [VRC]: {
        key: VRC, kind: 'fda-pi',
        text: 'VFEND (voriconazole) for injection, tablets and for oral suspension, Pfizer Laboratories Div Pfizer Inc. Prescribing information, DailyMed set ID ce3ef5cf-3087-4d92-9d94-9eb8287228db, SPL effective 2026-02-26. Quoted only for what it says about sirolimus and everolimus.',
        url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=ce3ef5cf-3087-4d92-9d94-9eb8287228db', revised: '1/2026',
    },
    [POS]: {
        key: POS, kind: 'fda-pi',
        text: 'NOXAFIL (posaconazole) injection, delayed-release tablets, oral suspension and PowderMix for delayed-release oral suspension, Merck Sharp & Dohme LLC. Prescribing information, DailyMed set ID b073b082-7b57-4423-8c06-4fd4263d6f84, SPL effective 2026-02-13. Quoted only for what it says about sirolimus.',
        url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=b073b082-7b57-4423-8c06-4fd4263d6f84', revised: '1/2026',
    },
};
// Class effects only where BOTH labels support them: infection, malignancy (both boxed), angioedema, TMA with a calcineurin inhibitor. Pneumonitis, fluid accumulation, wound healing, proteinuria and hyperlipidemia have no usable category: plain lines.
const BOTH = [SRL, EVR];
export const CLASSES = [
    {
        id: 'tx-mtor', name: 'mTOR inhibitors (transplant)',
        mechanism: c('Binds FKBP-12; the complex inhibits mTOR, which blocks T-lymphocyte activation and proliferation.', ...BOTH),
        effects: [
            { tox: 'tx-serious-infection', rank: 1, boxed: true, cite: BOTH },
            { tox: 'tx-malignancy', rank: 2, boxed: true, cite: BOTH },
            { tox: 'tx-angioedema', cite: BOTH },
            { tox: 'tx-tma', cite: BOTH },
        ],
    },
];
// ------------------------------------------------------------------ sirolimus
const sirolimus = {
    id: 'sirolimus', generic: 'Sirolimus', brands: ['Rapamune'], brandSource: 'fda-drugsfda', aliases: ['rapamycin'], editorAliases: ['SRL', 'rapa'],
    labelAge: 'Label last revised 2024; current availability not confirmed.', // the authorised-generic statement stays in the SRL source entry text
    classIds: ['tx-mtor'], cancers: ['kidney'], label: SRL, tier: 'full',
    mechanism: c('Blocks T-cell activation and proliferation by binding FKBP-12 and inhibiting mTOR; also inhibits antibody production.', SRL),
    boxedWarning: [
        c('Liver transplant: in a de novo liver study, sirolimus with tacrolimus was linked to excess mortality and graft loss; many patients had infection at or near death', SRL),
        c('Hepatic artery thrombosis: more cases with sirolimus plus cyclosporine or tacrolimus in de novo liver transplant studies; most within 30 days and most led to graft loss or death', SRL),
        c('Bronchial anastomotic dehiscence: cases, most fatal, in de novo lung transplant patients given sirolimus as part of the regimen', SRL),
        c('Serious infection: immunosuppression may increase susceptibility to infection', SRL),
        c('Lymphoma and malignancy: immunosuppression may lead to lymphoma and other malignancies', SRL),
        c('Liver or lung transplant: safety and efficacy of sirolimus are not established, and use is not recommended', SRL),
        c('Prescribers: only physicians experienced in immunosuppressive therapy and kidney transplant management should use it, in facilities with adequate laboratory and supportive resources', SRL),
    ],
    alsoOnLabel: [
        c('Non-infectious pneumonitis: interstitial lung disease (pneumonitis, BOOP, fibrosis) with no infectious cause, some fatal; some resolved on stopping or lowering sirolimus; risk may rise with troughs', SRL),
        c('Wound healing and fluid: delayed healing, lymphocele, wound dehiscence; edema, lymphedema, pleural and pericardial effusion, ascites; tamponade needing intervention reported in children and adults', SRL),
        c('Hyperlipidemia: raised cholesterol and triglycerides; with statins, CPK rises, myalgia and rhabdomyolysis occurred; the label says monitor lipids and watch for rhabdomyolysis on a statin or fibrate', SRL),
        c('Kidney function: monitor urine protein periodically; nephrotic-range proteinuria 9.2% vs 3.7% after CNI conversion in maintenance kidney recipients; may delay renal recovery in delayed graft function', SRL),
        c('Conversion from a CNI: maintenance kidney recipients with baseline GFR under 40 mL/min; at 2 years pneumonia 25.9% vs 13.8% and death 15.5% vs 3.4% on sirolimus vs continued CNI; not established', SRL),
        c('Tuberculosis in conversion: overall in the kidney conversion study, 2.0% of patients converted to sirolimus vs 0.4% on continued CNI', SRL),
        c('Liver conversion: stable liver recipients 6-144 months after transplant, converted from a CNI-based regimen, had more deaths, 3.8% vs 1.4% (not statistically significant)', SRL),
        c('Hypersensitivity: anaphylactic or anaphylactoid reactions, exfoliative dermatitis and hypersensitivity vasculitis; contraindicated with hypersensitivity to sirolimus', SRL),
        c('Levels: trough monitoring is recommended for all patients; chromatographic and immunoassay results are not interchangeable, so know the laboratory’s assay', SRL),
        c('Pneumocystis and CMV prophylaxis: the label says Pneumocystis prophylaxis should be given for 1 year after transplant and CMV prophylaxis for 3 months, particularly with higher CMV risk', SRL),
        c('Overdose: experience is limited and effects match the listed adverse reactions; the label says give general supportive measures; sirolimus is not expected to be dialyzable to any significant extent', SRL),
        c('De novo use without cyclosporine: not established; kidney recipients on sirolimus, mycophenolate, steroids and an IL-2 antagonist had more acute rejection and more deaths than on cyclosporine', SRL),
        c('Pregnancy and fertility: can cause fetal harm; avoid pregnancy and use highly effective contraception for 12 weeks after stopping; azoospermia or oligospermia may occur, mostly reversible', SRL),
        c('Postmarketing: hepatotoxicity including fatal hepatic necrosis with high sirolimus troughs, PRES, pancytopenia, neutropenia, pulmonary hemorrhage, alveolar proteinosis and C. difficile enterocolitis', SRL),
    ],
    interactions: [
        c('Avoid together: voriconazole; the Vfend label says sirolimus is contraindicated (sirolimus AUC 11-fold in healthy men); this label says avoid strong CYP3A4/P-gp inhibitors such as voriconazole', VRC, SRL),
        c('Avoid together: posaconazole; the Noxafil (posaconazole) label says it is contraindicated with sirolimus, raising sirolimus about 9-fold; this sirolimus label does not name posaconazole', POS, SRL),
        c('Raises level: diltiazem and verapamil; the label says monitor sirolimus concentrations, and a dose adjustment may be necessary; nicardipine is listed with the drugs to use with caution', SRL),
        c('Raises level: fluconazole and clotrimazole; the label says exercise caution, and the sirolimus and/or other drug dosage may need adjusting', SRL),
        c('Raises level: metoclopramide, cisapride and cimetidine; the label says exercise caution, and the sirolimus and/or other drug dosage may need adjusting', SRL),
        c('Raises level: protease inhibitors (ritonavir, indinavir, boceprevir, telaprevir); the label says exercise caution, and the dosage may need adjusting', SRL),
        c('Raises level: bromocriptine, danazol, letermovir and troleandomycin; the label says exercise caution, and the dosage may need adjusting', SRL),
        c('Raises level: cyclosporine oral solution or capsules (MODIFIED); the label says take sirolimus 4 hours after them; taken together, sirolimus AUC rose 148% (tablets) vs 33% at 4 hours', SRL),
        c('Raises level: cannabidiol; the label says closely monitor for higher sirolimus levels and toxicity and consider reducing the sirolimus dose', SRL),
        c('Lowers level: carbamazepine, phenobarbital and phenytoin; the label says exercise caution, and the sirolimus and/or other drug dosage may need adjusting', SRL),
        c('Lowers level: rifapentine and St. John’s Wort; the label says exercise caution, and the dosage may need adjusting', SRL),
        c('Adds kidney risk: long-term cyclosporine with sirolimus; the label says consider adjusting the regimen, including stopping sirolimus and/or cyclosporine, if creatinine is raised or rising', SRL),
        c('Adds kidney risk: cyclosporine beyond 4 months after transplant in low- to moderate-risk patients; the label says continue only when the benefits outweigh the risks', SRL),
        c('Adds kidney risk: aminoglycosides and amphotericin B are known to harm renal function; the label says use caution with them', SRL),
        c('Raises the other drug: cyclosporine; sirolimus 4 hours after it lowered cyclosporine clearance, so lower cyclosporine doses were needed to hold target levels in renal transplant patients', SRL),
        c('Raises the other drug: verapamil; sirolimus raised the active S(-) verapamil Cmax and AUC 1.5-fold in 25 healthy volunteers; the label says the sirolimus and/or verapamil dosage may need adjusting', SRL),
        c('Falls when it stops: cyclosporine; sirolimus concentrations may decrease when cyclosporine is discontinued unless the sirolimus dose is increased', SRL),
        c('Avoid together: strong CYP3A4/P-gp inhibitors clarithromycin, erythromycin, telithromycin, ketoconazole, voriconazole, itraconazole raise sirolimus; the label says avoid them and consider alternatives', SRL),
        c('Avoid together: rifampin and rifabutin, strong inducers that lower sirolimus (rifampin cut AUC about 82%); the label says avoid them and consider alternatives with less enzyme induction', SRL),
        c('Avoid together: grapefruit juice, which raises sirolimus by inhibiting CYP3A4 metabolism; the label says it must not be taken with sirolimus', SRL),
        c('Avoid together: live vaccines (measles, mumps, rubella, oral polio, BCG, yellow fever, varicella, TY21a typhoid); the label says they should be avoided; vaccination may be less effective', SRL),
        c('ACE inhibitors: may increase the risk of angioedema with sirolimus; elevated sirolimus levels may also potentiate angioedema', SRL),
    ],
    effects: [
        {
            tox: 'tx-serious-infection', cite: [SRL],
            quirk: c('Serious infection: opportunistic infection including tuberculosis, fatal infection and sepsis; for BK nephropathy or PML the label says consider reducing immunosuppression, weighing graft risk.', SRL),
        },
        {
            tox: 'tx-malignancy', cite: [SRL],
            quirk: c('Lymphoma and malignancy: lymphoma and other malignancies, particularly of the skin; the label says to limit sun and UV exposure with protective clothing and sunscreen.', SRL),
        },
        {
            tox: 'tx-hepatic-artery-thrombosis', rank: 3, boxed: true, cite: [SRL],
            quirk: c('Hepatic artery thrombosis: more cases with sirolimus plus cyclosporine or tacrolimus in de novo liver transplant studies; most within 30 days and most led to graft loss or death', SRL),
        },
        {
            tox: 'tx-angioedema', cite: [SRL],
            quirk: c('Angioedema: associated with sirolimus; ACE inhibitors and elevated sirolimus levels may raise the risk; in some cases it resolved on stopping or lowering sirolimus.', SRL),
        },
        {
            tox: 'tx-tma', cite: [SRL],
            quirk: c('Thrombotic microangiopathy: using sirolimus with a calcineurin inhibitor may raise the risk of calcineurin-inhibitor HUS, TTP or TMA.', SRL),
        },
        {
            tox: 'tx-nodat', cite: [SRL],
            quirk: c('New-onset diabetes: diabetes mellitus is listed among trial reactions and was higher after conversion from tacrolimus to sirolimus 3 to 5 months after kidney transplant.', SRL),
        },
    ],
};
// ------------------------------------------------------------------ everolimus for transplant (Zortress label only)
const everolimusZortress = {
    id: 'everolimus-zortress', generic: 'Everolimus (transplant)', brands: ['Zortress'], aliases: ['everolimus'], editorAliases: ['EVR'],
    unpinnedNames: ['everolimus', 'EVR'],
    classIds: ['tx-mtor'], cancers: ['kidney', 'liver'], label: EVR, tier: 'full',
    mechanism: c('Blocks T- and B-cell activation and proliferation by binding FKBP-12 and inhibiting mTOR; no effect on calcineurin.', EVR),
    boxedWarning: [
        c('Nephrotoxicity: standard doses of cyclosporine with Zortress raise nephrotoxicity; the label says use reduced cyclosporine doses and monitor cyclosporine and everolimus troughs', EVR),
        c('Heart transplant: more mortality, often with serious infection, in the first 3 months in a trial of de novo heart transplant patients; use in heart transplantation is not recommended', EVR),
        c('Serious infection: immunosuppression may increase susceptibility to infection', EVR),
        c('Lymphoma and malignancy: immunosuppression may lead to malignancies such as lymphoma and skin cancer', EVR),
        c('Kidney graft thrombosis: more kidney arterial and venous thrombosis, resulting in graft loss, mostly within the first 30 days after transplant', EVR),
        c('Prescribers: only physicians experienced in immunosuppressive therapy and transplant management should prescribe it, in facilities with adequate laboratory and supportive resources', EVR),
    ],
    alsoOnLabel: [
        c('Non-infectious pneumonitis: consider it if pneumonia symptoms resist antibiotics and other causes are excluded; fatal cases have occurred', EVR),
        c('Pneumonitis management: the label says manage by dose reduction or discontinuation until symptoms resolve; consider corticosteroids', EVR),
        c('Wound healing and fluid: delayed healing, dehiscence, infection, hernia, lymphocele, seroma; edema, pericardial and pleural effusions, ascites; wound reactions 35% vs 26% in the kidney trial', EVR),
        c('Hyperlipidemia: cholesterol and triglycerides rise, more with higher troughs; with cyclosporine, kidney trials strongly discouraged simvastatin and lovastatin', EVR),
        c('Statins and fibrates: with cyclosporine, the label says patients on an HMG-CoA reductase inhibitor and/or fibrate should be monitored for rhabdomyolysis and other adverse effects', EVR),
        c('Proteinuria: increased, and the risk rises with higher everolimus trough levels; the label says monitor patients for it', EVR),
        c('Kidney function: monitor it; the label says consider switching immunosuppression if it does not improve after dose adjustment or seems drug-related; caution with other drugs impairing renal function', EVR),
        c('Contraindication: hypersensitivity to everolimus, sirolimus or any excipient; people with galactose intolerance, Lapp lactase deficiency or glucose-galactose malabsorption should not take Zortress', EVR),
        c('Pneumocystis and CMV prophylaxis: the label recommends antimicrobial prophylaxis for Pneumocystis pneumonia and for CMV in transplant recipients', EVR),
        c('Calcineurin-inhibitor elimination: acute rejection risk rose in limited data; Zortress with tacrolimus elimination in liver recipients was stopped early for rejection and is not recommended', EVR),
        c('Overdose: experience is very limited; the label says give general supportive measures; everolimus is not considered dialyzable to any relevant degree', EVR),
        c('Pregnancy and fertility: may cause fetal harm and lactating women are advised not to breastfeed; male infertility (azoospermia or oligospermia) may occur and amenorrhea occurred in women', EVR),
        c('Postmarketing: erythroderma, leukocytoclastic vasculitis and pulmonary alveolar proteinosis after approval of Zortress with cyclosporine', EVR),
        c('Trial deaths in liver recipients: 13 on Zortress with reduced tacrolimus vs 7 on standard tacrolimus in the first 12 months, mostly from liver-related problems, infections and sepsis', EVR),
    ],
    interactions: [
        c('Avoid together: voriconazole; the Vfend label says use with everolimus is not recommended (not studied, exposure likely increased); this label does not name it but says avoid strong CYP3A inhibitors', VRC, EVR),
        c('Raises level: erythromycin, a moderate CYP3A inhibitor (everolimus AUC 4.4-fold in healthy subjects); the label says monitor concentrations and reduce the dose as necessary', EVR),
        c('Raises level: verapamil, a moderate CYP3A inhibitor (everolimus AUC 3.5-fold in healthy subjects); the label says monitor concentrations and reduce the dose as necessary', EVR),
        c('Raises level: cyclosporine (everolimus AUC up 168% in healthy subjects); the label says Zortress dosage might need adjusting if the cyclosporine dose is changed', EVR),
        c('Raises level: cannabidiol; the label says closely monitor for higher everolimus levels and toxicity, and consider reducing the Zortress dose', EVR),
        c('Lowers level: moderate CYP3A inducers; the label says monitor everolimus concentrations and increase the dose as necessary', EVR),
        c('Adds kidney risk: standard-dose cyclosporine with Zortress raises nephrotoxicity and lowers GFR in kidney recipients; the label says use reduced cyclosporine doses and monitor both troughs', EVR),
        c('Adds kidney risk: standard-dose tacrolimus with Zortress was not studied in liver recipients; the label says use reduced tacrolimus doses to minimize the potential risk of nephrotoxicity', EVR),
        c('Raises the other drug: midazolam; everolimus raised midazolam Cmax 25% and AUC 30% in 25 healthy men given a single oral dose with steady-state everolimus', EVR),
        c('Raises the other drug: depot octreotide; everolimus raised octreotide Cmin by about 50%', EVR),
        c('Avoid together: strong CYP3A inhibitors raise everolimus (ketoconazole AUC 15-fold in healthy subjects); the label says avoid them, and closely monitor everolimus troughs if use is unavoidable', EVR),
        c('Avoid together: strong CYP3A inducers lower everolimus (rifampin cut AUC 63%); the label says avoid them, and closely monitor troughs if use is unavoidable', EVR),
        c('Avoid together: grapefruit and grapefruit juice, which inhibit CYP3A and raise everolimus; the label says they should be avoided with Zortress and cyclosporine or tacrolimus', EVR),
        c('Avoid together: live vaccines (intranasal influenza, measles, mumps, rubella, oral polio, BCG, yellow fever, varicella, TY21a typhoid); the label says they should be avoided', EVR),
        c('ACE inhibitors: may increase the risk of angioedema with Zortress', EVR),
        c('Cyclosporine dose changes: everolimus concentrations may decrease when cyclosporine doses are reduced, unless the Zortress dose is increased; the label says Zortress dosage might need adjusting', EVR),
        c('Tacrolimus: little to no pharmacokinetic interaction on everolimus; the label says Zortress dose adjustment is not necessary when it is used with tacrolimus', EVR),
        c('Anti-epileptics and anti-infectives: patient counselling lists antifungals, antibiotics, antivirals, carbamazepine, phenytoin, barbiturates, St. John’s Wort, rifampin as able to change levels', EVR),
    ],
    effects: [
        {
            tox: 'tx-serious-infection', cite: [EVR],
            quirk: c('Serious infection: bacterial, viral, fungal and protozoal infections incl. opportunistic, some fatal; for BK nephropathy or PML the label says consider reducing immunosuppression, weighing the graft.', EVR),
        },
        {
            tox: 'tx-malignancy', cite: [EVR],
            quirk: c('Lymphoma and malignancy: lymphomas and other malignancies, particularly of the skin; risk appears tied to the intensity and duration of immunosuppression; limit sun and UV exposure.', EVR),
        },
        {
            tox: 'tx-kidney-graft-thrombosis', rank: 3, boxed: true, cite: [EVR],
            timing: c('Mostly within the first 30 days after transplant, in the boxed statement on kidney graft thrombosis', EVR),
            quirk: c('Kidney graft thrombosis: increased kidney arterial and venous thrombosis, resulting in graft loss; renal artery and vein thromboses caused some graft losses in the kidney trial.', EVR),
        },
        {
            tox: 'tx-hepatic-artery-thrombosis', cite: [EVR],
            quirk: c('Hepatic artery thrombosis: more with mTOR inhibitors; mostly within the first 30 days after liver transplant, most led to graft loss or death; the label says not to give Zortress before day 30', EVR),
        },
        {
            tox: 'tx-angioedema', cite: [EVR],
            quirk: c('Angioedema: associated with Zortress; ACE inhibitors may increase the risk; the label says monitor for symptoms and treat promptly.', EVR),
        },
        {
            tox: 'tx-tma', cite: [EVR],
            quirk: c('Thrombotic microangiopathy: using Zortress with cyclosporine may raise the risk of TMA, TTP or HUS; the label says to monitor hematologic parameters.', EVR),
        },
        {
            tox: 'tx-nodat', cite: [EVR],
            quirk: c('New-onset diabetes: Zortress raises the risk of diabetes after transplant; the label says to monitor blood glucose closely.', EVR),
        },
    ],
};
export const DRUGS = [sirolimus, everolimusZortress];
