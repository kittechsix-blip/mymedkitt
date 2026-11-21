import type { Cited, DrugEffectOverride, OncDrug } from '../../onc-drugs/types.js';

// Calcineurin inhibitors for the Transplant Drugs Side-effects consult. Every line is paraphrased from the drug's own FDA label
// (DailyMed SPL XML saved in research/transplant-sources/dailymed/) and cites that label. Nothing from outside the labels. No doses.
// Line format: a short head, a colon, one hazard; 200 characters at most. A timing's text before its first top-level comma is the card badge (48 characters at most).
// Sources, the class and the toxicities live in ../sources.ts, ../classes.ts and ../toxicities.ts.
// alsoOnLabel order (interactions live in `interactions`): what changes care today; warned events with no row; overdose; interactions an ED could trigger; contraindications; the rest.
const c = (v: string, ...cite: string[]): Cited => ({ v, cite });

// ------------------------------------------------------------------ tacrolimus
const P = 'pi-prograf';
const A = 'pi-astagraf';
const E = 'pi-envarsus';
const DIFLUCAN = 'pi-diflucan'; // source defined in azoles.ts (same label)

const TAC_MECH = (k: string): Cited => c('Blocks calcineurin (via FKBP-12), which inhibits T-cell activation and cytokines such as interleukin-2.', k);

const INFECTION_TAC = (k: string): DrugEffectOverride => ({
  tox: 'tx-serious-infection', cite: [k],
  quirk: c('Serious infection: bacterial, viral, fungal, protozoal and opportunistic, can be fatal; BK nephropathy, PML and CMV named; label says monitor and balance immunosuppression against infection.', k),
});
const NEURO_TAC = (k: string): DrugEffectOverride => ({
  tox: 'tx-neurotoxicity', cite: [k],
  quirk: c('Neurotoxicity: PRES, delirium, seizure and coma are most severe; tremor, paresthesias, headache also occur; label says consider dose reduction or stopping, as symptoms may track high levels.', k),
});
const NEPHRO_TAC = (k: string): DrugEffectOverride => ({
  tox: 'tx-cni-nephrotoxicity', cite: [k],
  quirk: c('Kidney injury: acute or chronic; acute impairment is usually reversible; label says consider dose reduction or temporary interruption if creatinine and levels are high; CYP3A inhibitors add risk.', k),
});
const TMA_TAC = (k: string, name: string): DrugEffectOverride => ({
  tox: 'tx-tma', cite: [k],
  quirk: c(`Thrombotic microangiopathy: HUS and TTP reported; risks include severe infection, GVHD, HLA mismatch and calcineurin or mTOR inhibitors; consider ${name} a risk factor.`, k),
});
const QT_TAC = (k: string): DrugEffectOverride => ({
  tox: 'drug-qt-prolongation', cite: [k], ask: [],
  quirk: c('QT prolongation: may cause torsades de pointes; avoid in congenital long QT; consider ECGs and electrolyte checks with heart failure, bradyarrhythmia, QT-prolonging drugs or low K, Ca or Mg.', k),
});
const SKIN_PM = (k: string): DrugEffectOverride => ({
  tox: 'drug-severe-skin', basis: 'postmarketing', cite: [k], ask: [],
  quirk: c('Severe skin reactions: Stevens-Johnson syndrome and toxic epidermal necrolysis reported after approval.', k),
});
const PANC_PM = (k: string, what: string): DrugEffectOverride => ({
  tox: 'drug-pancreatitis', basis: 'postmarketing', cite: [k], ask: [],
  quirk: c(`Pancreatitis: ${what} reported after approval.`, k),
});
const RHABDO_PM = (k: string): DrugEffectOverride => ({
  tox: 'rhabdomyolysis', basis: 'postmarketing', cite: [k], ask: [],
  quirk: c('Rhabdomyolysis: reported after approval.', k),
});
const NODAT_PLAIN = (k: string): DrugEffectOverride => ({
  tox: 'tx-nodat', cite: [k],
  quirk: c('New-onset diabetes: caused in kidney transplant patients; may be reversible; African-American and Hispanic kidney recipients are at higher risk.', k),
});
const HTN_XR = (k: string, name: string): DrugEffectOverride => ({
  tox: 'tx-hypertension', cite: [k],
  quirk: c(`Hypertension: common and may need treatment; some antihypertensives raise potassium, and calcium-channel blockers can raise tacrolimus levels and require ${name} dose reduction.`, k),
});

const OVERDOSE_TREAT = (k: string): Cited => c('Overdose treatment: tacrolimus is not expected to be dialyzable; oral charcoal has been used but evidence is too thin to recommend it; give supportive care.', k);
const PRCA_TAC = (k: string, name: string): Cited => c(`Pure red cell aplasia: reported; all patients had risk factors such as parvovirus B19 infection, underlying disease or concomitant drugs; consider stopping ${name} if diagnosed`, k);

const tacrolimus: OncDrug = {
  id: 'tacrolimus', generic: 'Tacrolimus (immediate-release)', brands: ['Prograf'], aliases: ['tacrolimus'], editorAliases: ['tac', 'FK506'],
  unpinnedNames: ['tac'],
  classIds: ['tx-cni'], cancers: ['kidney', 'liver', 'heart', 'lung'], label: P, tier: 'full',
  mechanism: TAC_MECH(P),
  boxedWarning: [
    c('Serious infections: Prograf or other immunosuppressants raise the risk of serious infection, which may lead to hospitalization or death', P),
    c('Malignancies: Prograf or other immunosuppressants raise the risk of malignancy, which may lead to hospitalization or death', P),
  ],
  alsoOnLabel: [
    c('Injection anaphylaxis: 0.6% with the castor-oil vehicle; observe 30 minutes after starting, stop the infusion if it occurs, and keep epinephrine and oxygen at the bedside', P),
    c('Not interchangeable: Prograf is not substitutable for extended-release tacrolimus; mix-ups caused under- or overexposure, graft rejection or other serious reactions', P),
    c('Overdose: up to 30 times the intended dose reported, almost all asymptomatic with full recovery; tremor, abnormal renal function, hypertension and edema followed in some', P),
    OVERDOSE_TREAT(P),
    c('Levels: trough monitoring is recommended for all patients; immunoassays can read higher than HPLC/MS/MS, and levels vary most in the first week after transplant', P),
    PRCA_TAC(P, 'Prograf'),
    c('Myocardial hypertrophy: reported in infants, children and adults, mostly with high trough levels; reversible in most cases after dose reduction or stopping', P),
    c('Contraindications: hypersensitivity to tacrolimus; the injection also to its castor-oil vehicle HCO-60 (dyspnea, rash, pruritus and ARDS reported)', P),
    c('Trial deaths at 12 months: Study 2 (kidney, with MMF) 9 (4.2%) on Prograf vs 5 (2.4%) on cyclosporine', P),
  ],
  interactions: [
    // cross-reference: quotation attributed to the Diflucan label (the other drug's label), as in mtor.ts
    c('Raises level: fluconazole; the Diflucan label says it "may increase the serum concentrations of orally administered tacrolimus up to 5 times"; no significant change with intravenous tacrolimus', DIFLUCAN, P),
    c('Raises level: clarithromycin, voriconazole, posaconazole, itraconazole, ketoconazole, ritonavir; a rapid, sharp rise can follow a dose cut; reduce the dose and check levels within 1-3 days', P),
    c('Raises level: erythromycin, fluconazole, verapamil, diltiazem, nifedipine, nicardipine, amiodarone, cimetidine, omeprazole; monitor levels and reduce the dose if needed', P),
    c('Raises level: grapefruit (avoid), metoclopramide, magnesium or aluminum antacids, clotrimazole, lansoprazole, danazol, ethinyl estradiol; monitor levels and reduce the dose if needed', P),
    c('Raises level: letermovir, nefazodone, nelfinavir, telaprevir, boceprevir, troleandomycin, chloramphenicol, Schisandra extracts; reduce the dose and check levels within 1-3 days', P),
    c('Raises level: cannabidiol; closely monitor levels and signs of toxicity, and consider reducing the dose', P),
    c('Lowers level: rifampin, rifabutin, phenytoin, carbamazepine, phenobarbital, St John\u2019s wort; raises rejection risk; increase the dose and monitor levels', P),
    c('Lowers level: prednisone, methylprednisolone, caspofungin; monitor levels and adjust the dose if needed', P),
    c('Adds kidney risk: aminoglycosides, ganciclovir, amphotericin B, cisplatin, nucleotide reverse transcriptase inhibitors, protease inhibitors; monitor renal function and levels, adjust both doses', P),
    c('Adds potassium risk: potassium-sparing diuretics, ACE inhibitors, angiotensin receptor blockers; the label says to consider carefully before use', P),
    c('Raises the other drug: mycophenolic acid exposure is higher with tacrolimus than with cyclosporine; monitor and reduce the mycophenolic acid dose as needed', P),
    c('Avoid together: cyclosporine; stop one at least 24 hours before starting the other', P),
    c('Avoid together: sirolimus; excess mortality, graft loss and hepatic artery thrombosis in de novo liver studies, and more renal, wound and diabetes problems in heart', P),
    c('Avoid together: the injection mixed or co-infused with solutions of pH 9 or greater, such as ganciclovir or acyclovir', P),
    c('Avoid together: live vaccines; inactivated vaccines may be less immunogenic', P),
  ],
  effects: [
    INFECTION_TAC(P),
    {
      tox: 'tx-malignancy', cite: [P],
      quirk: c('Malignancy: lymphoma and other cancers, particularly of the skin; PTLD is mostly EBV-related and greatest in EBV-seronegative patients, including many young children.', P),
    },
    NEURO_TAC(P),
    NEPHRO_TAC(P),
    {
      tox: 'tx-hyperkalemia', cite: [P],
      quirk: c('Hyperkalemia: reported with Prograf; the label says to weigh potassium-sparing diuretics, ACE inhibitors and ARBs carefully before adding them.', P),
    },
    {
      tox: 'tx-hypertension', cite: [P],
      quirk: c('Hypertension: common and may need treatment; calcium-channel blockers can raise tacrolimus levels and therefore require dosage reduction, and potassium-raising antihypertensives need care.', P),
    },
    TMA_TAC(P, 'tacrolimus'),
    {
      tox: 'tx-nodat', cite: [P],
      quirk: c('New-onset diabetes: shown in kidney, liver, heart and lung trials; monitor glucose closely; higher risk in African-American and Hispanic kidney recipients; median onset 68 days (kidney, azathioprine).', P),
    },
    QT_TAC(P),
    SKIN_PM(P),
    PANC_PM(P, 'hemorrhagic and necrotizing pancreatitis'),
  ],
};

const tacrolimusAstagraf: OncDrug = {
  id: 'tacrolimus-xr-astagraf', generic: 'Tacrolimus extended-release capsules', brands: ['Astagraf XL'], aliases: ['tacrolimus'], editorAliases: ['tac', 'FK506'],
  unpinnedNames: ['tacrolimus', 'tac', 'FK506'],
  classIds: ['tx-cni'], cancers: ['kidney'], label: A, tier: 'full',
  mechanism: TAC_MECH(A),
  boxedWarning: [
    c('Female liver transplant mortality: in a 471-patient liver trial, 12-month mortality was 18% of 76 women on Astagraf XL vs 8% of 64 on immediate-release tacrolimus; not approved for liver transplant', A),
    c('Serious infections: Astagraf XL or other immunosuppressants raise the risk of serious infection, which may lead to hospitalization or death', A),
    c('Malignancies: Astagraf XL or other immunosuppressants raise the risk of malignancy, which may lead to hospitalization or death', A),
  ],
  alsoOnLabel: [
    c('Not interchangeable: Astagraf XL is not substitutable for extended-release tablets, immediate-release capsules or oral suspension; mix-ups caused graft rejection or other serious reactions', A),
    c('Missed dose: may be taken up to 14 hours late; after that wait for the next morning dose; do not double', A),
    c('Overdose: reported effects include tremor, confusion, encephalopathy, lethargy, vomiting, diarrhea, raised creatinine, hypertension and edema; one fatal case of pneumopathy with CMV infection', A),
    OVERDOSE_TREAT(A),
    c('Levels: trough monitoring is recommended for all patients, at least twice in week 1 and after interacting-drug, cannabidiol, kidney or liver changes; immunoassays can read higher than HPLC/MS/MS', A),
    PRCA_TAC(A, 'Astagraf XL'),
    c('Contraindications: known hypersensitivity to tacrolimus', A),
    c('Trial deaths at 12 months: Study 1 (mostly U.S.) 3 (1.4%) on Astagraf XL vs 9 (4.2%) on immediate-release; Study 2 (non-U.S.) 10 (3%) vs 8 (2.4%)', A),
  ],
  interactions: [
    // cross-reference: quotation attributed to the Diflucan label (the other drug's label), as in mtor.ts
    c('Raises level: fluconazole; the Diflucan label says it "may increase the serum concentrations of orally administered tacrolimus up to 5 times"; no significant change with intravenous tacrolimus', DIFLUCAN, A),
    c('Raises level: clarithromycin, voriconazole, posaconazole, itraconazole, ketoconazole, ritonavir; a rapid, sharp rise can follow a dose cut; reduce the dose and check levels within 1-3 days', A),
    c('Raises level: verapamil, diltiazem, nifedipine, nicardipine, amiodarone, cimetidine, omeprazole, lansoprazole; monitor levels and reduce the dose if needed', A),
    c('Raises level: grapefruit (avoid), metoclopramide, magnesium or aluminum antacids, clotrimazole, danazol, ethinyl estradiol; monitor levels and reduce the dose if needed', A),
    c('Raises level: letermovir, nefazodone, nelfinavir, telaprevir, boceprevir, troleandomycin, chloramphenicol, Schisandra extracts; reduce the dose and check levels within 1-3 days', A),
    c('Raises level: alcohol may speed tacrolimus release and raise the risk of neurotoxicity and QT prolongation; the label says to avoid alcoholic beverages', A),
    c('Raises level: cannabidiol; closely monitor levels and signs of toxicity, and consider reducing the dose', A),
    c('Lowers level: rifampin, rifabutin, phenytoin, carbamazepine, phenobarbital, St John\u2019s wort; raises rejection risk; increase the dose and monitor levels', A),
    c('Lowers level: prednisone, methylprednisolone, caspofungin; monitor levels and adjust the dose if needed', A),
    c('Adds kidney risk: aminoglycosides, ganciclovir, amphotericin B, cisplatin, nucleotide reverse transcriptase inhibitors, protease inhibitors; monitor renal function and levels, adjust both doses', A),
    c('Adds potassium risk: potassium-sparing diuretics, ACE inhibitors, angiotensin receptor blockers may increase the risk of hyperkalemia', A),
    c('Raises the other drug: mycophenolic acid exposure is higher with tacrolimus than with cyclosporine; monitor and reduce the mycophenolic acid dose as needed', A),
    c('Avoid together: live vaccines; inactivated vaccines may be less immunogenic', A),
  ],
  effects: [
    INFECTION_TAC(A),
    {
      tox: 'tx-malignancy', cite: [A],
      quirk: c('Malignancy: lymphoma and other cancers, particularly of the skin; PTLD with EBV is reported and risk is greatest in EBV-seronegative patients, including many young children.', A),
    },
    NEURO_TAC(A),
    NEPHRO_TAC(A),
    {
      tox: 'tx-hyperkalemia', cite: [A],
      quirk: c('Hyperkalemia: mild to severe, may need treatment; above 6.4 mEq/L in 3.7% of Astagraf XL kidney recipients in Study 1; potassium-sparing diuretics, ACE inhibitors and ARBs add risk.', A),
    },
    HTN_XR(A, 'Astagraf XL'),
    TMA_TAC(A, 'tacrolimus'),
    NODAT_PLAIN(A),
    QT_TAC(A),
    SKIN_PM(A),
    PANC_PM(A, 'pancreatitis'),
    RHABDO_PM(A),
  ],
};

const tacrolimusEnvarsus: OncDrug = {
  id: 'tacrolimus-xr-envarsus', generic: 'Tacrolimus extended-release tablets', brands: ['Envarsus XR'], aliases: ['tacrolimus'], editorAliases: ['tac', 'FK506'],
  unpinnedNames: ['tacrolimus', 'tac', 'FK506'],
  classIds: ['tx-cni'], cancers: ['kidney'], label: E, tier: 'full',
  mechanism: TAC_MECH(E),
  boxedWarning: [
    c('Serious infections: Envarsus XR or other immunosuppressants raise the risk of serious infection, which may lead to hospitalization or death', E),
    c('Malignancies: Envarsus XR or other immunosuppressants raise the risk of malignancy, which may lead to hospitalization or death', E),
  ],
  alsoOnLabel: [
    c('Not interchangeable: Envarsus XR is not substitutable for extended-release capsules, capsules or oral suspension; mix-ups caused graft rejection or other serious reactions', E),
    c('Missed dose: take it within 15 hours of the missed time; after that wait for the next scheduled dose; do not double', E),
    c('Overdose: reported effects include tremor, confusion, encephalopathy, lethargy, vomiting, diarrhea, raised creatinine, hypertension and edema', E),
    OVERDOSE_TREAT(E),
    c('Levels: trough monitoring is recommended for all patients, at least twice in week 1 and after interacting-drug, cannabidiol, kidney or liver changes; immunoassays can read higher than HPLC/MS/MS', E),
    PRCA_TAC(E, 'Envarsus XR'),
    c('Contraindications: known hypersensitivity to tacrolimus or any ingredient of Envarsus XR', E),
    c('Study 3 conversion: in 162 stable kidney recipients, stopping for adverse reactions 7.4% vs 1.2% on capsules; most common reason on Envarsus XR was cardiac arrest (2 events)', E),
    c('Overdose death: one fatal case of pneumopathy with CMV infection was attributed to overdose of tacrolimus extended-release capsules', E),
    c('Trial deaths at 12 months: Study 1 8 (3.0%) on Envarsus XR vs 8 (2.9%) on capsules; Study 3 2 (1.2%) vs 1 (0.6%); none in Study 2', E),
  ],
  interactions: [
    // cross-reference: quotation attributed to the Diflucan label (the other drug's label), as in mtor.ts
    c('Raises level: fluconazole; the Diflucan label says it "may increase the serum concentrations of orally administered tacrolimus up to 5 times"; no significant change with intravenous tacrolimus', DIFLUCAN, E),
    c('Raises level: clarithromycin, voriconazole, posaconazole, itraconazole, ketoconazole, ritonavir, cobicistat; a rapid, sharp rise can follow a dose cut; reduce the dose, check levels within 1-3 days', E),
    c('Raises level: erythromycin, fluconazole, isavuconazole, clotrimazole, verapamil, diltiazem, nifedipine, nicardipine, amiodarone, cimetidine, omeprazole; monitor levels and reduce the dose if needed', E),
    c('Raises level: grapefruit (avoid), letermovir, imatinib, nilotinib, metoclopramide, antacids, lansoprazole, danazol, ethinyl estradiol; monitor levels and reduce the dose if needed', E),
    c('Raises level: nefazodone, nelfinavir, telaprevir, boceprevir, troleandomycin, chloramphenicol, Schisandra extracts; reduce the dose and check levels within 1-3 days', E),
    c('Raises level: cannabidiol; closely monitor levels and signs of toxicity, and consider reducing the dose', E),
    c('Lowers level: rifampin, rifabutin, phenytoin, carbamazepine, phenobarbital, St John\u2019s wort; raises rejection risk; increase the dose and monitor levels', E),
    c('Lowers level: prednisone, methylprednisolone, caspofungin; monitor levels and adjust the dose if needed', E),
    c('Adds kidney risk: aminoglycosides, ganciclovir, amphotericin B, cisplatin, nucleotide reverse transcriptase inhibitors, protease inhibitors; monitor renal function and levels, adjust both doses', E),
    c('Adds potassium risk: potassium-sparing diuretics, ACE inhibitors, angiotensin receptor blockers may increase the risk of hyperkalemia', E),
    c('Raises the other drug: mycophenolic acid exposure is higher with Envarsus XR than with cyclosporine; monitor and reduce the mycophenolic acid dose as needed', E),
    c('Avoid together: alcoholic beverages; alcohol may modify the rate of tacrolimus release', E),
    c('Avoid together: live vaccines; inactivated vaccines may be less immunogenic', E),
  ],
  effects: [
    INFECTION_TAC(E),
    {
      tox: 'tx-malignancy', cite: [E],
      quirk: c('Malignancy: lymphoma and other cancers, particularly of the skin; PTLD with EBV is reported and risk is greatest in EBV-seronegative patients.', E),
    },
    NEURO_TAC(E),
    NEPHRO_TAC(E),
    {
      tox: 'tx-hyperkalemia', cite: [E],
      quirk: c('Hyperkalemia: mild to severe, may need treatment; potassium-sparing diuretics, ACE inhibitors and ARBs add risk.', E),
    },
    HTN_XR(E, 'Envarsus XR'),
    TMA_TAC(E, 'Envarsus XR'),
    NODAT_PLAIN(E),
    QT_TAC(E),
    SKIN_PM(E),
    PANC_PM(E, 'hemorrhagic and necrotizing pancreatitis'),
    RHABDO_PM(E),
  ],
};

// ------------------------------------------------------------------ cyclosporine (the three labels carry the same interaction, warning and adverse-reaction text)
const N = 'pi-neoral';
const G = 'pi-gengraf';
const S = 'pi-sandimmune';

// One contiguous block per card, heads in this order: Raises level, Lowers level, Adds kidney risk, Adds potassium risk, Raises the other drug, Avoid together.
// Most-given drugs first, rarities last. `renal` is the action each label gives for a kidney-toxic combination.
const CSA_INTERACTIONS = (renal: string, ...k: string[]): Cited[] => [
  c('Raises level: clarithromycin, erythromycin, azithromycin, quinupristin/dalfopristin, fluconazole, itraconazole, ketoconazole, voriconazole', ...k),
  c('Raises level: diltiazem, nicardipine, verapamil, methylprednisolone, amiodarone, metoclopramide, allopurinol, oral contraceptives', ...k),
  c('Raises level: grapefruit juice (the label says to avoid it), HIV protease inhibitors (indinavir, nelfinavir, ritonavir, saquinavir; no formal study), boceprevir, telaprevir', ...k),
  c('Raises level: bromocriptine, colchicine, danazol, imatinib, nefazodone', ...k),
  c('Lowers level: rifampin, phenytoin, phenobarbital, carbamazepine, oxcarbazepine, nafcillin; St John’s wort led to rejection and graft loss', ...k),
  c('Lowers level: rifabutin (interaction unstudied; use care), bosentan, octreotide, sulfinpyrazone, terbinafine, ticlopidine, orlistat (decreases absorption)', ...k),
  c('Lowers level: mycophenolic acid exposure falls 20% to 50% with cyclosporine; monitor for lost efficacy of mycophenolate', ...k),
  c('Adds kidney risk: NSAIDs, especially when dehydrated; naproxen and sulindac add to renal function decline; monitor creatinine', ...k),
  c(`Adds kidney risk: gentamicin, tobramycin, vancomycin, ciprofloxacin, trimethoprim-sulfamethoxazole; monitor creatinine; ${renal}`, ...k),
  c(`Adds kidney risk: amphotericin B, ketoconazole, melphalan; monitor creatinine; ${renal}`, ...k),
  c('Adds kidney risk: cimetidine, ranitidine, tacrolimus, methotrexate, colchicine, bezafibrate, fenofibrate, azapropazon', ...k),
  c('Adds kidney risk: full-dose sirolimus raises serum creatinine; often reversible with a cyclosporine cut', ...k),
  c('Adds potassium risk: potassium-sparing diuretics should not be used; caution with ACE inhibitors, angiotensin receptor blockers, potassium-containing drugs and a potassium-rich diet', ...k),
  c('Raises the other drug: digoxin; severe digitalis toxicity seen within days of starting cyclosporine; monitor digoxin levels', ...k),
  c('Raises the other drug: colchicine; myopathy and neuropathy reported, especially with renal dysfunction; the label recommends a lower colchicine dose', ...k),
  c('Raises the other drug: statins (lovastatin, simvastatin, atorvastatin, pravastatin, rarely fluvastatin); myotoxicity including rhabdomyolysis; reduce the statin dose per its label', ...k),
  c('Raises the other drug: statin therapy to be temporarily withheld or stopped with myopathy signs or risk factors for severe renal injury, including renal failure, secondary to rhabdomyolysis', ...k),
  c('Raises the other drug: diclofenac levels roughly double; its dose should be at the low end of the range', ...k),
  c('Raises the other drug: repaglinide levels rise and hypoglycemia risk increases; monitor blood glucose', ...k),
  c('Raises the other drug: sirolimus levels rise; give sirolimus 4 hours after cyclosporine', ...k),
  c('Raises the other drug: ambrisentan levels roughly double; do not titrate it to the maximum daily dose', ...k),
  c('Raises the other drug: prednisolone and etoposide, among others, have reduced clearance; see each drug’s own label', ...k),
  c('Raises the other drug: high doses may raise exposure to the anthracyclines doxorubicin, mitoxantrone and daunorubicin in cancer patients', ...k),
  c('Raises the other drug: methotrexate in rheumatoid arthritis (20 patients) rose about 30% and its metabolite fell about 80%; clinical significance unknown', ...k),
  c('Avoid together: bosentan and dabigatran; aliskiren is not recommended', ...k),
  c('Avoid together: nifedipine in patients who develop gingival hyperplasia, which is frequent with the combination', ...k),
  c('Avoid together: live vaccines; vaccination may be less effective', ...k),
];

const CSA_COMMON = (...k: string[]): { rejTox: Cited; pml: Cited; urate: Cited; mag: Cited; principal: Cited; neonate: Cited } => ({
  rejTox: c('Kidney graft, toxicity vs rejection: the label gives a comparison table; criteria that reliably differentiate the two have not been found', ...k),
  pml: c('PML: sometimes fatal; presents with hemiparesis, apathy, confusion, cognitive deficits and ataxia; consider neurology and, in transplant, lowering total immunosuppression, which risks the graft', ...k),
  urate: c('Hyperuricemia: significant hyperuricemia seen occasionally in individual patients, in the same warning as hyperkalemia', ...k),
  mag: c('Low magnesium: reported in some, not all, patients with convulsions; hypertension, high-dose methylprednisolone and low cholesterol are also linked to the neurologic effects', ...k),
  principal: c('Transplant principal adverse reactions: renal dysfunction, tremor, hirsutism, hypertension and gum hyperplasia', ...k),
  neonate: c('Premature neonates: serious intoxication reported after accidental parenteral overdose', ...k),
});

const TMA_CSA = (k: string[]): DrugEffectOverride => ({
  tox: 'tx-tma', cite: k,
  quirk: c('Thrombotic microangiopathy: thrombocytopenia with microangiopathic hemolytic anemia may result in graft failure, even without rejection; neither the pathogenesis nor the management is clear.', ...k),
});
const NEURO_CSA = (k: string[]): DrugEffectOverride => ({
  tox: 'tx-neurotoxicity', cite: k,
  quirk: c('Neurotoxicity: convulsions, notably with high-dose methylprednisolone; PRES with impaired consciousness and visual loss; changes mostly reversible on stopping cyclosporine.', ...k),
});
const HYPERK_CSA = (k: string[]): DrugEffectOverride => ({
  tox: 'tx-hyperkalemia', cite: k,
  quirk: c('Hyperkalemia: significant, sometimes with hyperchloremic metabolic acidosis, seen occasionally in individual patients; potassium-sparing diuretics should not be used.', ...k),
});
const LIVER_CSA = (k: string[], who: string): DrugEffectOverride => ({
  tox: 'drug-hepatotoxicity', cite: k, ask: [],
  quirk: c(`Liver injury: ${who}; cholestasis, jaundice, hepatitis and liver failure, some fatal, mainly in transplant patients; enzyme rises usually fall with dose reduction.`, ...k),
});

const cyclosporineModified: OncDrug = (() => {
  const k = [N, G];
  const L = CSA_COMMON(...k);
  return {
    id: 'cyclosporine-modified', generic: 'Cyclosporine, modified', brands: ['Neoral', 'Gengraf'], aliases: ['cyclosporine', 'cyclosporin A'], editorAliases: ['CsA', 'CyA'],
    classIds: ['tx-cni'], cancers: ['kidney', 'liver', 'heart'], label: N, tier: 'full',
    mechanism: c('Inhibits lymphocytes, mainly T-helper cells, and lymphokine production, including interleukin-2.', ...k),
    boxedWarning: [
      c('Serious infections: a systemic immunosuppressant that may increase susceptibility to infection; more immunosuppression in transplant patients raises that risk', ...k),
      c('Neoplasia: possible development of lymphoma and other neoplasms with more immunosuppression in transplant patients', ...k),
      c('Skin cancer in psoriasis: patients previously treated with PUVA, and less so methotrexate, other immunosuppressants, UVB, coal tar or radiation, are at higher risk', ...k),
      c('Hypertension (psoriasis box): recommended doses can cause systemic hypertension; the risk rises with dose and duration of therapy', ...k),
      c('Nephrotoxicity (psoriasis box): recommended doses can cause kidney injury, including structural damage; the risk rises with dose and duration; monitor renal function', ...k),
      c('Not interchangeable with Sandimmune: exposure is greater at a given trough; switch only under physician supervision, with particular care converting from exceptionally high Sandimmune doses', ...k),
      c('Blood level monitoring: monitor levels to avoid toxicity from high concentrations and, in transplant, rejection from low ones; compare published levels only with knowledge of the assay methods', ...k),
    ],
    alsoOnLabel: [
      L.pml,
      L.rejTox,
      c('Overdose: oral overdoses up to 10 g were tolerated with minor effects (vomiting, drowsiness, headache, tachycardia); a few had moderately severe, reversible renal impairment', N, G),
      c('Laboratory checks: renal and liver tests repeatedly, plus lipids, magnesium and potassium; cyclosporine blood levels routinely in transplant patients', ...k),
      L.urate, L.mag,
      c('Overdose treatment: not dialyzable to any great extent nor cleared well by charcoal hemoperfusion; give supportive care', N, G),
      c('Contraindications: hypersensitivity to cyclosporine or any ingredient; in rheumatoid arthritis or psoriasis, abnormal renal function, uncontrolled hypertension or malignancy', ...k),
      L.principal,
      c('Migraine: listed in trials (2% or less of transplant patients) and reported after approval; some patients could not continue cyclosporine', ...k),
      c('Leg pain: isolated cases reported after approval, also described as Calcineurin-Inhibitor Induced Pain Syndrome', ...k),
      L.neonate,
    ],
    interactions: [
      ...CSA_INTERACTIONS('reduce the other drug or consider an alternative', ...k),
    ],
    effects: [
      {
        tox: 'tx-serious-infection', cite: k,
        quirk: c('Serious infection: bacterial, viral, fungal and protozoal infections, including opportunistic and fatal ones; polyoma virus infections include PML and BK nephropathy with graft loss.', ...k),
      },
      {
        tox: 'tx-malignancy', cite: k,
        quirk: c('Malignancy: lymphomas and other cancers, particularly of the skin; risk tracks intensity and duration of immunosuppression; some are fatal; avoid excess ultraviolet light.', ...k),
      },
      {
        tox: 'tx-hypertension', rank: 3, boxed: true, cite: k,
        quirk: c('Hypertension (psoriasis box): historical Sandimmune table: 26% randomized kidney, 13% all kidney, 53% heart, 27% liver; text says about 50% after kidney transplant; avoid potassium-sparing diuretics.', ...k),
      },
      {
        tox: 'tx-cni-nephrotoxicity', rank: 4, boxed: true, cite: k,
        quirk: c('Kidney injury (psoriasis box): historical Sandimmune experience 25% of kidney, 38% heart, 37% liver recipients; a creatinine rise can mimic rejection, and up to 20% have both.', ...k),
      },
      NEURO_CSA(k),
      TMA_CSA(k),
      HYPERK_CSA(k),
      LIVER_CSA(k, 'the risk increases with increasing doses'),
    ],
  };
})();

const cyclosporineNonModified: OncDrug = (() => {
  const k = [S];
  const L = CSA_COMMON(...k);
  return {
    id: 'cyclosporine-non-modified', generic: 'Cyclosporine, non-modified', brands: ['Sandimmune'], aliases: ['cyclosporine', 'cyclosporin A'], editorAliases: ['CsA', 'CyA'],
    unpinnedNames: ['cyclosporine', 'cyclosporin A', 'CsA', 'CyA'],
    classIds: ['tx-cni'], cancers: ['kidney', 'liver', 'heart'], label: S, tier: 'full',
    mechanism: c('Exact mechanism not known; appears to inhibit T-helper cells and lymphokine (interleukin-2) production.', S),
    boxedWarning: [
      c('Serious infections: increased susceptibility to infection may result from immunosuppression', S),
      c('Lymphoma: possible development of lymphoma may result from immunosuppression', S),
      c('Erratic absorption: capsule absorption is erratic; monitor levels at repeated intervals to avoid toxicity from high levels and rejection from low absorption, especially in liver transplants', S),
      c('Give with corticosteroids only: administer with adrenal corticosteroids but not with other immunosuppressive agents', S),
      c('No mg-to-mg switching with Neoral: Sandimmune and Neoral are not interchangeable; a wrong switch can raise exposure and adverse reactions, or lower exposure and efficacy', S),
      c('Assay comparison: compare published concentrations with a patient’s only with detailed knowledge of the assay methods', S),
    ],
    alsoOnLabel: [
      c('Injection anaphylaxis: about 1 in 1000 with the castor-oil vehicle; flushing, noncardiogenic pulmonary edema, wheeze, blood pressure changes; one patient died', S),
      c('Injection precautions: observe at least 30 minutes after starting, stop if anaphylaxis occurs, keep epinephrine and oxygen at the bedside; the capsules lack the vehicle', S),
      c('Overdose: oral overdoses up to 10 g were associated with minor effects (vomiting, drowsiness, headache, tachycardia); a few had moderately severe, reversible renal impairment', S),
      L.pml,
      L.rejTox,
      c('Laboratory checks: renal and liver function repeatedly by BUN, serum creatinine, bilirubin and liver enzymes', S),
      c('Malabsorption: patients may have difficulty reaching therapeutic levels with the capsules', S),
      L.urate, L.mag,
      c('Overdose treatment: not dialyzable to any great extent nor cleared well by charcoal hemoperfusion; give supportive care or consider Poison Help', S),
      c('Contraindications: hypersensitivity to cyclosporine; the injection also with a history of hypersensitivity to its castor-oil vehicle (Cremophor EL)', S),
      L.principal,
    ],
    interactions: [
      ...CSA_INTERACTIONS('consider reducing cyclosporine and/or the other drug, or an alternative', ...k),
    ],
    effects: [
      {
        tox: 'tx-serious-infection', cite: k,
        quirk: c('Serious infection: bacterial, viral, fungal and protozoal infections, including opportunistic and fatal ones; polyoma virus infections include PML and BK nephropathy with graft loss.', S),
      },
      {
        tox: 'tx-malignancy', cite: k,
        quirk: c('Malignancy: lymphomas and other cancers, particularly of the skin; risk tracks intensity and duration of immunosuppression; some are fatal.', S),
      },
      NEURO_CSA(k),
      {
        tox: 'tx-cni-nephrotoxicity', cite: k,
        quirk: c('Kidney injury: often responds to dose reduction; a creatinine rise can mimic rejection and up to 20% have both; the label says evaluate each patient fully before adjusting the dose.', S),
      },
      TMA_CSA(k),
      HYPERK_CSA(k),
      {
        tox: 'tx-hypertension', cite: k,
        quirk: c('Hypertension: common, usually mild to moderate, incidence decreases over time; antihypertensive therapy may be required; potassium-sparing diuretics should not be used.', S),
      },
      LIVER_CSA(k, 'at high dosages'),
    ],
  };
})();

export const DRUGS: OncDrug[] = [tacrolimus, tacrolimusAstagraf, tacrolimusEnvarsus, cyclosporineModified, cyclosporineNonModified];
