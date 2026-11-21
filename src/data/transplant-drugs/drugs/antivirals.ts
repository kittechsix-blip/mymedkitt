import type { Cited, DrugClass, DrugEffectOverride, OncDrug, OncSource } from '../../onc-drugs/types.js';
import type { TxGroup } from '../types.js';

// Antiviral prophylaxis drugs for the Transplant Drugs Side-effects consult (class section "Prophylaxis"): valganciclovir, ganciclovir IV,
// letermovir, acyclovir (oral label plus IV label) and valacyclovir. Every line is paraphrased from the drug's own FDA label (DailyMed SPL XML saved in
// research/transplant-sources/dailymed/) and cites that label. Nothing from outside the labels. No doses.
// Line format: a short head, a colon, one hazard; 200 characters at most. No timing badge: the one timing sentence (Par, neutropenia usually in the first or second week) covers
// neutropenia only, not the whole cytopenia row.
// alsoOnLabel (non-interaction, 12 or fewer): what changes care first; then overdose; then contraindication and the rest. interactions: one head per line, TAXONOMY.md order; plain drug-named lines last.
const c = (v: string, ...cite: string[]): Cited => ({ v, cite });

const VGC = 'pi-valcyte';
const GCV = 'pi-ganciclovir-par';
const LTV = 'pi-prevymis';
const ACV = 'pi-acyclovir-oral';
const ACVIV = 'pi-acyclovir-iv';
const VAC = 'pi-valtrex';

// ------------------------------------------------------------------ sources (read in full from the saved SPL XML, 2026-11-20)
const dm = (setid: string): string => `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${setid}`;
export const SOURCES: Record<string, OncSource> = {
  [VGC]: { key: VGC, kind: 'fda-pi', text: 'VALCYTE (valganciclovir) tablets and for oral solution, H2-Pharma, LLC. Prescribing information, DailyMed set ID 4c517a39-2ded-4c5a-8d56-276853414b31, SPL effective 2025-12-08. The indication names "kidney, heart, and kidney-pancreas transplant patients"; the label does not name pancreas alone.', url: dm('4c517a39-2ded-4c5a-8d56-276853414b31'), revised: '04/2023' },
  [GCV]: { key: GCV, kind: 'fda-pi', text: 'Ganciclovir for Injection, USP (lyophilized, 500 mg vial), Par Health USA, LLC. Prescribing information, DailyMed set ID 87afd103-6e64-444f-971d-0e732e9ae995, SPL effective 2026-09-25.', url: dm('87afd103-6e64-444f-971d-0e732e9ae995'), revised: '09/2026' },
  [LTV]: { key: LTV, kind: 'fda-pi', text: 'PREVYMIS (letermovir) tablets, injection and oral pellets, Merck Sharp & Dohme LLC. Prescribing information, DailyMed set ID 1b49df80-be4f-47e0-a0b7-123f3e69395b, SPL effective 2026-01-14.', url: dm('1b49df80-be4f-47e0-a0b7-123f3e69395b'), revised: '08/2024' },
  [ACV]: { key: ACV, kind: 'fda-pi', text: 'Acyclovir capsules and tablets, USP (oral), Chartwell RX, LLC. Prescribing information, DailyMed set ID 8cd22728-34b4-4e55-8339-580138fe46d8, SPL effective 2026-11-10.', url: dm('8cd22728-34b4-4e55-8339-580138fe46d8'), revised: '06/2022' },
  [ACVIV]: { key: ACVIV, kind: 'fda-pi', text: 'Acyclovir Sodium Injection (intravenous), Eugia US LLC. Prescribing information, DailyMed set ID ae921e4e-b8ae-4a45-acc1-32e5e719812b, SPL effective 2023-07-05.', url: dm('ae921e4e-b8ae-4a45-acc1-32e5e719812b'), revised: 'March 2023' },
  [VAC]: { key: VAC, kind: 'fda-pi', text: 'VALTREX (valacyclovir hydrochloride) caplets, GlaxoSmithKline LLC. Prescribing information, DailyMed set ID f8e0d8f8-cb73-4206-a484-88f5c4fbd719, SPL effective 2025-11-12.', url: dm('f8e0d8f8-cb73-4206-a484-88f5c4fbd719'), revised: 'November 2025' },
};

// ------------------------------------------------------------------ classes (class effects only where every member label says them)
export const CLASSES: DrugClass[] = [
  {
    id: 'tx-cmv-nucleoside', name: 'Ganciclovir and valganciclovir',
    mechanism: c('Ganciclovir, a 2’-deoxyguanosine analogue, inhibits human CMV replication; valganciclovir is converted to ganciclovir.', VGC, GCV),
    effects: [
      { tox: 'tx-cytopenia', rank: 1, boxed: true, cite: [VGC, GCV] },
    ],
  },
  {
    id: 'tx-hsv-nucleoside', name: 'Acyclovir and valacyclovir',
    mechanism: c('Nucleoside analogue active against herpes simplex and varicella-zoster viruses; valacyclovir is converted to acyclovir.', ACV, VAC),
    effects: [
      { tox: 'tx-ttp-hus', cite: [ACV, VAC] },
    ],
  },
  {
    id: 'tx-cmv-terminase', name: 'CMV terminase inhibitor',
    mechanism: c('Inhibits the CMV DNA terminase complex, which is required for viral DNA processing and packaging.', LTV),
    effects: [],
  },
];

// ------------------------------------------------------------------ valganciclovir
const MYELO_VGC: DrugEffectOverride = {
  tox: 'tx-cytopenia', boxed: true, rank: 1, cite: [VGC], ask: [],
  quirk: c('Cytopenias: severe leukopenia, neutropenia, anemia, thrombocytopenia, pancytopenia, bone marrow failure; can occur at any time and worsen with continued dosing; caution with myelosuppressive drugs.', VGC),
};
const MYELO_GCV: DrugEffectOverride = {
  tox: 'tx-cytopenia', boxed: true, rank: 1, cite: [GCV], ask: [],
  quirk: c('Cytopenias: granulocytopenia, anemia, thrombocytopenia, pancytopenia; can occur at any time; use caution with preexisting cytopenias, myelosuppressive drugs or irradiation.', GCV),
};

const valganciclovir: OncDrug = {
  id: 'valganciclovir', generic: 'Valganciclovir', brands: ['Valcyte'], aliases: ['valganciclovir'], editorAliases: ['VGC', 'VGCV'],
  pin: false, pinAlso: ['Valcyte', 'VGC', 'VGCV'], pharmacyDrugId: 'valganciclovir',
  classIds: ['tx-cmv-nucleoside'], cancers: ['kidney', 'heart', 'pancreas'], label: VGC, tier: 'full',
  mechanism: c('Prodrug of ganciclovir, a 2’-deoxyguanosine analogue that inhibits the CMV DNA polymerase pUL54.', VGC),
  boxedWarning: [
    c('Hematologic toxicity: severe leukopenia, neutropenia, anemia, thrombocytopenia, pancytopenia and bone marrow failure including aplastic anemia reported in patients treated with Valcyte', VGC),
    c('Impairment of fertility: Valcyte may cause temporary or permanent inhibition of spermatogenesis in males and suppression of fertility in females, based on animal data and limited human data', VGC),
    c('Fetal toxicity: based on animal data, Valcyte has the potential to cause birth defects in humans', VGC),
    c('Mutagenesis and carcinogenesis: based on animal data, Valcyte has the potential to cause cancers in humans', VGC),
  ],
  alsoOnLabel: [
    c('Not for use below: Valcyte should be avoided if neutrophils are under 500/µL, platelets under 25,000/µL or hemoglobin under 8 g/dL; growth factors may be considered', VGC),
    c('Acute renal failure: may occur in elderly patients, with nephrotoxic drugs and without adequate hydration; the label says adequate hydration should be maintained for all patients', VGC),
    c('Renal impairment: dose reduction is recommended; adults on hemodialysis (CrCl under 10 mL/min) should not use Valcyte tablets, and the label points to ganciclovir for them', VGC),
    c('Blood counts: check frequently, especially in renal impairment; more monitoring after a switch from oral ganciclovir; counts usually begin to recover within 3 to 7 days of stopping', VGC),
    c('Liver transplant: not an indicated organ; in the 372-patient trial, tissue-invasive CMV disease was significantly higher on Valcyte than on oral ganciclovir in liver recipients', VGC),
    c('Pregnancy: females of reproductive potential: test before starting, contraception during and at least 30 days after; males: condoms during and at least 90 days after; breastfeeding is not recommended', VGC),
    c('Neuropsychiatric effects: seizure, confusional state, agitation, psychotic disorder and hallucinations are listed among trial adverse reactions in under 5% of CMV retinitis or transplant patients', VGC),
    c('Overdose effects: some fatal; myelosuppression including pancytopenia, hepatitis, acute kidney injury, abdominal pain, diarrhea, vomiting, generalized tremor and seizure', VGC),
    c('Overdose treatment: overdose could raise renal toxicity; ganciclovir is dialyzable, so dialysis may help; the label says to maintain hydration and consider hematopoietic growth factors', VGC),
    c('Contraindications: clinically significant hypersensitivity (e.g., anaphylaxis) to valganciclovir, ganciclovir or any component of the formulation', VGC),
    c('Other listed events: febrile neutropenia, pancreatitis, sepsis, arrhythmia, deafness, macular edema and potentially life-threatening bleeding with thrombocytopenia in under 5% of trial patients', VGC),
    c('Trial deaths: mortality at six months was 3.7% (9/244) on Valcyte vs 1.6% (2/126) on oral ganciclovir in the heart, liver, kidney, kidney-pancreas trial', VGC),
  ],
  interactions: [
    c('Raises level: probenecid raises ganciclovir; the label says the Valcyte dose may need to be reduced and to monitor for evidence of ganciclovir toxicity', VGC),
    c('Raises level: other renally excreted drugs; in impaired renal function both ganciclovir and the co-drug may rise; the label says to monitor closely for toxicity of both', VGC),
    c('Adds kidney risk: cyclosporine or amphotericin B; the label says to monitor renal function because serum creatinine may rise', VGC),
    c('Adds marrow and kidney risk: mycophenolate mofetil; levels unchanged with normal renal function; the label says to monitor for hematological and renal toxicity because of increased risk', VGC),
    c('Adds marrow or kidney risk: for example tacrolimus, trimethoprim-sulfamethoxazole, pentamidine, dapsone; the label says consider together only if benefits are judged to outweigh risks', VGC),
    c('Adds marrow or kidney risk: for example flucytosine, zidovudine, hydroxyurea, adriamycin, doxorubicin, vinblastine, vincristine; consider together only if benefits are judged to outweigh risks', VGC),
    c('Raises the other drug: didanosine rises with ganciclovir; the label says to monitor closely for didanosine toxicity such as pancreatitis', VGC),
    c('Avoid together: imipenem-cilastatin; not recommended because generalized seizures have been reported in patients who received ganciclovir and imipenem-cilastatin', VGC),
  ],
  effects: [MYELO_VGC],
};

// ------------------------------------------------------------------ ganciclovir IV (Par labeler; Fresenius Kabi label checked for the boxed warning, indications, contraindication, W&P 5.1-5.2, 6.2, 7 and overdosage: same text)
const ganciclovir: OncDrug = {
  id: 'ganciclovir', generic: 'Ganciclovir (intravenous)', brands: [], aliases: ['ganciclovir'], editorAliases: ['GCV'],
  pin: false, pinAlso: ['GCV'], pharmacyDrugId: 'ganciclovir',
  classIds: ['tx-cmv-nucleoside'], cancers: [], label: GCV, tier: 'full',
  mechanism: c('A 2’-deoxyguanosine analogue; its triphosphate inhibits the CMV DNA polymerase pUL54.', GCV),
  boxedWarning: [
    c('Hematologic toxicity: granulocytopenia, anemia, thrombocytopenia and pancytopenia reported in patients treated with ganciclovir', GCV),
    c('Impairment of fertility: ganciclovir may cause temporary or permanent inhibition of spermatogenesis in males and suppression of fertility in females, based on animal data and limited human data', GCV),
    c('Fetal toxicity: based on animal data, ganciclovir has the potential to cause birth defects in humans', GCV),
    c('Mutagenesis and carcinogenesis: based on animal data, ganciclovir has the potential to cause cancers in humans', GCV),
  ],
  alsoOnLabel: [
    c('Not for use below: ganciclovir is not recommended if neutrophils are under 500 cells/µL, hemoglobin under 8 g/dL or platelets under 25,000 cells/µL', GCV),
    c('No bolus: do not give by rapid or bolus intravenous injection, which may increase toxicity from excessive plasma levels; give by intravenous infusion over one hour', GCV),
    c('Intravenous only: do not give the reconstituted solution intramuscularly or subcutaneously because it may cause severe tissue irritation due to high pH', GCV),
    c('Hydration: administration of ganciclovir should be accompanied by adequate hydration', GCV),
    c('Blood counts: check counts frequently, especially in renal impairment; neutropenia usually occurs in the first or second week; counts usually begin to recover within 3 to 7 days of stopping', GCV),
    c('Renal impairment: use with caution; half-life and levels rise with reduced renal clearance, and the label recommends dosage adjustments; monitoring renal function is essential in the elderly', GCV),
    c('Hemodialysis: plasma levels fall about 50% in a 4-hour session; the label says to give ganciclovir shortly after the session', GCV),
    c('Pregnancy: females of reproductive potential: test first, contraception during and at least 30 days after; males: barrier contraception during and at least 90 days after; breastfeeding not recommended', GCV),
    c('Neurologic effects: seizure, confusional state, agitation, psychotic disorder, tremor and somnolence are listed among trial adverse reactions in CMV retinitis and transplant patients', GCV),
    c('Overdose effects: some fatal; myelosuppression including pancytopenia and bone marrow failure, hepatitis, acute kidney injury, abdominal pain, diarrhea, vomiting and seizure', GCV),
    c('Overdose treatment: ganciclovir is dialyzable, so dialysis may help; the label says to maintain hydration and consider hematopoietic growth factors in patients with cytopenias', GCV),
    c('Contraindications: clinically significant hypersensitivity (e.g., anaphylaxis) to ganciclovir, valganciclovir or any component of the formulation', GCV),
  ],
  interactions: [
    c('Raises level: probenecid raises ganciclovir; the label says the ganciclovir dose may need to be reduced and to monitor for evidence of ganciclovir toxicity', GCV),
    c('Raises level: drugs excreted by the same pathway as ganciclovir; in impaired renal function ganciclovir and the co-drug may both rise; the label says to monitor closely for toxicity of both', GCV),
    c('Adds kidney risk: cyclosporine or amphotericin B; serum creatinine rose in elderly patients and transplant recipients on them; the label says to monitor renal function', GCV),
    c('Adds marrow and kidney risk: mycophenolate mofetil; levels unchanged with normal renal function; the label says to monitor for hematological and renal toxicity because of increased risk', GCV),
    c('Adds marrow or kidney risk: for example tacrolimus, trimethoprim-sulfamethoxazole, pentamidine, dapsone; the label says consider together only if benefits are judged to outweigh risks', GCV),
    c('Adds marrow or kidney risk: for example flucytosine, zidovudine, hydroxyurea, doxorubicin, vinblastine, vincristine; the label says consider together only if benefits are judged to outweigh risks', GCV),
    c('Raises the other drug: didanosine rises with ganciclovir; the label says to monitor closely for didanosine toxicity such as pancreatitis', GCV),
    c('Avoid together: imipenem-cilastatin; not recommended because generalized seizures have been reported in patients who received ganciclovir and imipenem-cilastatin', GCV),
  ],
  effects: [
    MYELO_GCV,
    {
      tox: 'tx-qt-prolongation', basis: 'postmarketing', cite: [GCV], ask: [],
      quirk: c('Torsade de pointes: cardiac arrest, conduction disorder, torsade de pointes and ventricular tachycardia are listed in post-approval reports.', GCV),
    },
    {
      tox: 'tx-ttp-hus', basis: 'postmarketing', cite: [GCV], ask: [],
      quirk: c('Hemolytic uremic syndrome: reported after approval.', GCV),
    },
    {
      tox: 'drug-severe-skin', basis: 'postmarketing', cite: [GCV], ask: [],
      quirk: c('Severe skin reactions: Stevens-Johnson syndrome and exfoliative dermatitis reported after approval.', GCV),
    },
    {
      tox: 'rhabdomyolysis', basis: 'postmarketing', cite: [GCV], ask: [],
      quirk: c('Rhabdomyolysis: reported after approval.', GCV),
    },
  ],
};

// ------------------------------------------------------------------ letermovir (no boxed warning, no Pharmacy entry)
const letermovir: OncDrug = {
  id: 'letermovir', generic: 'Letermovir', brands: ['Prevymis'], aliases: ['letermovir'], editorAliases: [],
  classIds: ['tx-cmv-terminase'], cancers: ['kidney'], label: LTV, tier: 'full',
  mechanism: c('Inhibits the CMV DNA terminase complex (pUL51, pUL56, pUL89), needed for viral DNA processing and packaging.', LTV),
  alsoOnLabel: [
    c('IV vehicle: hydroxypropyl betadex can accumulate in renal impairment; with CLcr under 50 mL/min on the injection, monitor serum creatinine closely; animal studies show ototoxicity potential', LTV),
    c('No bolus: do not give the injection as an intravenous bolus; it is for patients unable to take oral therapy, switching to oral as soon as able, and if possible not beyond 4 weeks', LTV),
    c('IV incompatible (1): the injection is physically incompatible with amiodarone, amphotericin B (liposomal), aztreonam, cefepime, ciprofloxacin, cyclosporine, diltiazem and filgrastim', LTV),
    c('IV incompatible (2): the injection is physically incompatible with gentamicin, levofloxacin, linezolid, lorazepam, midazolam, mycophenolate mofetil, ondansetron and palonosetron', LTV),
    c('Severe liver impairment: not recommended in Child-Pugh Class C; letermovir exposure (AUC) was about 3.8-fold higher in adults with it', LTV),
    c('Overdose: no specific antidote; monitor for adverse reactions and give symptomatic treatment; it is unknown whether dialysis removes Prevymis', LTV),
    c('Cardiac events: 13% on Prevymis vs 6% on placebo in the 565-patient adult allogeneic HSCT trial through week 14; tachycardia 4% vs 2%, atrial fibrillation 3% vs 1%', LTV),
    c('End-stage renal disease: safety is unknown in adults with CLcr under 10 mL/min, including those on dialysis', LTV),
    c('Kidney transplant trial (D+/R-): neutrophils under 1000/µL in 5% of 292 on Prevymis vs 18% of 297 on valganciclovir; stopped for adverse events 4% vs 14%', LTV),
    c('Common adverse events: nausea, diarrhea, vomiting, peripheral edema, cough, headache, fatigue and abdominal pain in the adult allogeneic HSCT trial', LTV),
  ],
  interactions: [
    c('Raises level: cyclosporine raises letermovir; the label says to decrease the Prevymis dosage in adult and pediatric patients 12 years of age and older', LTV),
    c('Raises level: inhibitors of OATP1B1/3 transporters may raise letermovir concentrations', LTV),
    c('Lowers level: nafcillin; not recommended, potential loss of Prevymis efficacy', LTV),
    c('Lowers level: carbamazepine, phenobarbital, phenytoin; not recommended, potential loss of Prevymis efficacy', LTV),
    c('Lowers level: rifabutin, rifampin; not recommended, potential loss of Prevymis efficacy', LTV),
    c('Lowers level: efavirenz, etravirine, nevirapine; not recommended, potential loss of Prevymis efficacy', LTV),
    c('Lowers level: thioridazine; not recommended, potential loss of Prevymis efficacy', LTV),
    c('Lowers level: bosentan; not recommended, potential loss of Prevymis efficacy', LTV),
    c('Lowers level: modafinil; not recommended, potential loss of Prevymis efficacy', LTV),
    c('Lowers level: St. John’s wort; not recommended, potential loss of Prevymis efficacy', LTV),
    c('Raises the other drug: tacrolimus; the label says to monitor tacrolimus whole blood concentrations often during and after Prevymis and adjust the tacrolimus dose', LTV),
    c('Raises the other drug: cyclosporine; the label says to monitor cyclosporine whole blood concentrations often during and after Prevymis and adjust the cyclosporine dose', LTV),
    c('Raises the other drug: sirolimus; monitor sirolimus whole blood concentrations often during and after Prevymis and adjust; with cyclosporine too, refer to the sirolimus prescribing information', LTV),
    c('Raises the other drug: atorvastatin; the label caps the atorvastatin dosage and says to monitor closely for myopathy and rhabdomyolysis; atorvastatin is not recommended with cyclosporine', LTV),
    c('Raises the other drug: fluvastatin, lovastatin, pravastatin, rosuvastatin; a dosage reduction may be necessary; monitor for myopathy and rhabdomyolysis; with cyclosporine, see the statin label', LTV),
    c('Raises the other drug: lovastatin with cyclosporine; the label says use of lovastatin is not recommended', LTV),
    c('Raises the other drug: pitavastatin, simvastatin; co-administration is not recommended', LTV),
    c('Raises the other drug: amiodarone; the label says to monitor closely for amiodarone adverse events and to monitor amiodarone concentrations often', LTV),
    c('Raises the other drug: glyburide, repaglinide, rosiglitazone; monitor glucose often; with cyclosporine, repaglinide is not recommended', LTV),
    c('Raises the other drug: CYP3A substrates (alfentanil, fentanyl, midazolam, quinidine); refer to their labels for dosing with a moderate CYP3A inhibitor; with cyclosporine, like a strong inhibitor', LTV),
    c('Raises the other drug: OATP1B1/3 substrates; clinically relevant increases in their plasma concentrations may occur', LTV),
    c('Lowers the other drug: voriconazole; if both are needed, the label says to monitor closely for reduced voriconazole effectiveness', LTV),
    c('Lowers the other drug: warfarin; the label says to monitor the INR often', LTV),
    c('Lowers the other drug: phenytoin; letermovir also falls; the label says not recommended', LTV),
    c('Lowers the other drug: omeprazole, pantoprazole; the label says clinical monitoring and dose adjustment may be needed', LTV),
    c('Falls when it stops: cyclosporine; if discontinued after starting Prevymis, the next Prevymis dose should be increased; if started after Prevymis, decreased', LTV),
    c('Avoid together: pimozide; contraindicated, letermovir raises pimozide with QT prolongation and torsades de pointes', LTV),
    c('Avoid together: ergot alkaloids (ergotamine, dihydroergotamine); contraindicated, letermovir raises them with risk of ergotism', LTV),
    c('Avoid together: pitavastatin or simvastatin with cyclosporine; contraindicated, myopathy or rhabdomyolysis risk', LTV),
    c('Cyclosporine, interrupted: if cyclosporine dosing is interrupted because of high cyclosporine levels, no Prevymis dose adjustment is needed', LTV),
    c('Prevymis: with cyclosporine the size of CYP3A and OATP1B1/3 interactions may differ; the label says to see the cyclosporine prescribing information', LTV),
    c('Prevymis: if doses of co-administered drugs are adjusted because of Prevymis, the label says to readjust them after Prevymis is completed', LTV),
    c('Prevymis: no clinically significant interaction in adult studies with acyclovir, digoxin, mycophenolate mofetil, fluconazole, itraconazole, posaconazole, ethinyl estradiol, levonorgestrel', LTV),
  ],
  effects: [],
};

// ------------------------------------------------------------------ acyclovir (oral Chartwell label anchors the card; IV Eugia label supplies the IV statements and is cited on them)
const acyclovir: OncDrug = {
  id: 'acyclovir', generic: 'Acyclovir (oral and IV labels)', brands: [], aliases: ['acyclovir'], editorAliases: ['ACV'],
  pin: false, pinAlso: ['ACV'], pharmacyDrugId: 'acyclovir',
  classIds: ['tx-hsv-nucleoside'], cancers: [], label: ACV, tier: 'full',
  mechanism: c('Nucleoside analogue; viral thymidine kinase converts it to a triphosphate that stops herpes viral DNA replication.', ACV),
  alsoOnLabel: [
    c('IV neurotoxicity: about 1% of patients had lethargy, obtundation, tremors, confusion, hallucinations, agitation, seizures or coma', ACVIV),
    c('IV neurotoxicity caution: use with caution with underlying neurologic abnormalities, serious renal, hepatic or electrolyte abnormalities, or significant hypoxia', ACVIV),
    c('Oral label neurotoxicity: confusion, hallucinations, seizure, coma and encephalopathy listed from post-approval use; may be marked in older adults or with renal impairment', ACV),
    c('IV kidney injury: crystals precipitate in renal tubules above 2.5 mg/mL solubility or after bolus injection, causing acute renal failure; pre-existing renal disease and dehydration make it more likely', ACVIV),
    c('Renal failure: in some cases fatal, observed with acyclovir therapy (oral and IV labels); the label says IV acyclovir must be accompanied by adequate hydration', ACV, ACVIV),
    c('IV trial renal data: transient creatinine or BUN rises in 5% to 10% of patients in intravenous acyclovir trials, higher usually after rapid (under 10 minutes) infusion', ACVIV),
    c('Older adults, oral label: more likely to have renal or CNS adverse events and reduced renal function; somnolence, hallucinations, confusion and coma were reported more often', ACV),
    c('Older adults, IV label: differences in CNS adverse event severity between elderly and younger patients; the label says it may be useful to monitor renal function', ACVIV),
    c('IV administration: for intravenous infusion only over at least 1 hour to reduce renal tubular damage; rapid or bolus, intramuscular and subcutaneous injection must be avoided', ACVIV),
    c('Extravasation: severe local inflammatory reactions, including tissue necrosis, have occurred after infusion of acyclovir into extravascular tissues (post-approval)', ACVIV),
    c('Overdose: up to 20 g ingested; agitation, coma, seizures, lethargy; after bolus injection or high doses, or unmonitored fluid and electrolytes, raised BUN and creatinine and renal failure', ACV, ACVIV),
    c('Overdose treatment: in acute renal failure and anuria the patient may benefit from hemodialysis until renal function is restored', ACV, ACVIV),
    c('Hemodialysis: plasma concentrations fall about 60% over a 6-hour session; the label says to give an additional dose after each dialysis', ACV, ACVIV),
    c('Contraindications: hypersensitivity to acyclovir or valacyclovir', ACV, ACVIV),
    c('Other post-approval events: anemia, leukopenia, thrombocytopenia, DIC, hemolysis, leukocytoclastic vasculitis, hepatitis, jaundice, anaphylaxis, angioedema, hypotension', ACV, ACVIV),
  ],
  interactions: [
    c('Raises level: probenecid raised acyclovir half-life and AUC and reduced urinary excretion and renal clearance (oral label: with intravenous acyclovir)', ACV, ACVIV),
    c('Adds kidney risk: potentially nephrotoxic drugs may raise the risk of renal dysfunction and of reversible CNS symptoms seen with intravenous acyclovir; maintain adequate hydration', ACV),
    c('Adds kidney risk: concomitant other nephrotoxic drugs make further renal impairment with intravenous acyclovir more likely', ACVIV),
  ],
  effects: [
    {
      tox: 'tx-ttp-hus', cite: [ACV, ACVIV], ask: [],
      quirk: c('TTP/HUS: has resulted in death in immunocompromised patients receiving acyclovir therapy.', ACV, ACVIV),
    },
    {
      tox: 'drug-severe-skin', basis: 'postmarketing', cite: [ACV], ask: [],
      quirk: c('Severe skin reactions: Stevens-Johnson syndrome, toxic epidermal necrolysis and erythema multiforme are listed from post-approval use.', ACV, ACVIV),
    },
  ],
};

// ------------------------------------------------------------------ valacyclovir
const valacyclovir: OncDrug = {
  id: 'valacyclovir', generic: 'Valacyclovir', brands: ['Valtrex'], aliases: ['valacyclovir'], editorAliases: ['VACV'],
  pin: false, pinAlso: ['Valtrex', 'VACV'], pharmacyDrugId: 'valacyclovir',
  classIds: ['tx-hsv-nucleoside'], cancers: [], label: VAC, tier: 'full',
  mechanism: c('Deoxynucleoside analogue DNA polymerase inhibitor; rapidly converted to acyclovir, active against HSV and VZV.', VAC),
  alsoOnLabel: [
    c('CNS effects: agitation, hallucinations, confusion, delirium, seizures, encephalopathy, with or without reduced renal function; elderly more likely; the label says to discontinue Valtrex if they occur', VAC),
    c('Acute renal failure: elderly, renal disease on higher-than-recommended doses, nephrotoxic drugs, poor hydration; caution in the elderly, dosage reduction in renal impairment, keep hydrated', VAC),
    c('Tubular precipitation: acyclovir can precipitate in renal tubules above its 2.5 mg/mL solubility; the label says adequate hydration should be maintained for all patients', VAC),
    c('Limits of use: efficacy and safety not established in immunocompromised patients except genital herpes suppression in HIV-1-infected adults with CD4+ count of 100 cells/mm3 or more', VAC),
    c('Overdose: in acute renal failure and anuria the patient may benefit from hemodialysis until renal function is restored', VAC),
    c('Hemodialysis: about one-third of acyclovir is removed in a 4-hour session; the label says to give the recommended dose after hemodialysis', VAC),
    c('Renal impairment: dosage reduction is recommended', VAC),
    c('Contraindications: clinically significant hypersensitivity (e.g., anaphylaxis, severe cutaneous reactions) to valacyclovir, acyclovir or any component, or prior severe cutaneous reaction to either', VAC),
    c('Other post-approval events: anaphylaxis, angioedema, thrombocytopenia, aplastic anemia, leukocytoclastic vasculitis, hepatitis, hypertension, tachycardia, mania and visual abnormalities', VAC),
  ],
  interactions: [
    c('Adds kidney risk: other nephrotoxic drugs; the label says caution should be exercised when giving Valtrex with potentially nephrotoxic drugs', VAC),
  ],
  effects: [
    {
      tox: 'tx-ttp-hus', cite: [VAC], ask: [],
      quirk: c('TTP/HUS: sometimes fatal in advanced HIV-1 disease and in allogeneic bone marrow and renal transplant recipients in clinical trials; stop Valtrex immediately if signs, symptoms and labs fit TTP/HUS.', VAC),
    },
    {
      tox: 'drug-severe-skin', cite: [VAC], ask: [],
      quirk: c('Severe skin reactions: AGEP, DRESS, Stevens-Johnson syndrome, toxic epidermal necrolysis; discontinue Valtrex immediately for a painful rash with mucosal involvement or a progressive severe rash.', VAC),
    },
  ],
};

export const DRUGS: OncDrug[] = [valganciclovir, ganciclovir, letermovir, acyclovir, valacyclovir];

// type guard: this module satisfies TxGroup
const _group: TxGroup = { DRUGS, CLASSES, SOURCES };
void _group;
