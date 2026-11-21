# Calcineurin-inhibitor levels, interactions, toxicity, overdose: evidence pack (adult solid-organ transplant)

Sources of record, all read in full for the sections cited:
- **C** = Brunet M et al. *Therapeutic Drug Monitoring of Tacrolimus-Personalized Therapy: Second Consensus Report* (IATDMCT). Ther Drug Monit 2019;41(3):261-307. Saved file: `IATDMCT_tacrolimus_2nd_consensus_2019_ftd0640.html`.
- Labels (saved DailyMed SPL XML in `dailymed/`): **Prograf PI** (`prograf_7f667de1.xml`, SPL effective 2023-08-25, v30; capsules, injection, granules); **Astagraf XL PI** (`astagraf_550a5cd4.xml`); **Envarsus XR PI** (`envarsus_de2315b0.xml`); **Neoral** (`neoral_94461af3.xml`); **Gengraf** (`gengraf_e896cbfe.xml`); **Sandimmune** (`sandimmune_5e5926a7.xml`).

## How to read the locators (important for the verifier)

- **Consensus (C) is a saved Ovid HTML page, not a PDF. No page numbers.** Locator = section heading as printed + `[P#]`, where P# is the Nth paragraph in document order from the top of the saved page (stdlib HTML-to-text extraction; the page-top author/affiliation lines are counted, so numbers start near 61 at the Abstract). A plain text search of the quote in the HTML finds every item; P# is a convenience. The Executive Summary at the top of the article repeats later body sections, so some statements appear twice (both locators given where useful).
- **Grades** in C are printed `(A I)`, `(B II)`, `(C1 II)`, `(C2)` = (strength of recommendation, quality of evidence). Key read from the Table 1 **image** (saved page links it as an image, downloaded and read): strength A "Good evidence", B "Moderate evidence", C1 "Regardless of poor evidence, recommendation for", C2 "Poor evidence to support a recommendation"; quality I = RCT, II = cohort/case-control/nonrandomised, III = expert opinion. Statements with no grade are marked **ungraded**.
- **C Table 2 (drug interactions) is an image only in the saved HTML. Read from the rendered image** (single tall PNG), item 3.C-1 below.
- **Labels** have no pages. Locator = label section number as printed in the SPL (Prograf, Astagraf, Envarsus use PLR numbering, e.g. "Prograf PI 5.6"). **Neoral, Gengraf and Sandimmune are old-format labels with no section numbers**; locator = printed section heading, then sub-heading, then `P#` (Nth paragraph/list item within that heading in the saved XML). Label tables (Prograf Table 1, 7.2 table, etc.) are structured XML tables in the SPL, **read from the XML cells, not from rendered images** (no rendering of SPL was possible here); they are marked "XML table".
- Adults only. Pediatric, bone-marrow and non-transplant indications ignored. Everolimus/sirolimus not in scope.
- Nothing below is from outside knowledge. Where a source is silent it is listed under "Not stated".

---

# PART A. CONSENSUS REPORT (IATDMCT 2019, tacrolimus only)

## A1. How a level is drawn and read

**A1.1 C0 is the pre-dose sample** (PK Monitoring, Evidence-Based PK Monitoring [P149]; ungraded)
> "C0 (ie, concentration in samples drawn immediately before dose)"

**A1.2 C0 is what most centres use; AUC is considered the best exposure metric** (same [P149]; also Exec Summary, Drug Exposure [P66]; ungraded)
> "C0 is much easier to obtain and used in most transplant centers for routine TDM."
> "The AUC can be regarded as the exposure metrics best associated with tacrolimus clinical effects"

**A1.3 C0 is only a proxy if timing is right** ([P149]; ungraded)
> "C0 can only be a correct proxy of the overall exposure if blood sampling is perfectly timed."

**A1.4 C0 and AUC correlate poorly** ([P149], [P66]; ungraded)
> "patients with identical C0 may have very different between-dose AUC."

**A1.5 When AUC is suggested** ([P149]; ungraded)
> "especially in the early period after transplantation ... and when clinically indicated (eg, to investigate suspected tacrolimus adverse effects or to guide immunosuppression minimization)"

**A1.6 Conditions that change the AUC/C0 relationship** ([P149]; ungraded)
> "decreased intestinal motility or decreased absorption (eg, diabetes mellitus, ileus, cystic fibrosis, bariatric surgery, gastrectomy, and colectomy)"

**A1.7 Matrix: whole blood; EDTA anticoagulant** (Chromatographic Methods, Sample Preparation [P200]; ungraded)
> "Tacrolimus is extensively distributed into RBCs, and so, it is measured in whole blood. Ethylenediaminetetraacetic acid (EDTA) is the preferred anticoagulant."

**A1.8 Whole-blood:plasma ratio varies** (PK of Tacrolimus [P130]; ungraded)
> "Blood: plasma tacrolimus concentration ratios range from 13 to 114 (mean = 15) and are dependent on hematocrit, plasma protein, and tacrolimus concentration."

**A1.9 Assay types and distribution** (Analytical Methods [P83]; ungraded)
> "Analysis of tacrolimus in whole blood is performed either by immunoassays or by liquid chromatography–tandem mass spectrometry (LC-MS/MS)"

**A1.10 Method inconsistency; spread between methods** ([P224]; ungraded)
> "the ratio between the maximum and minimum averages of the concentrations determined by different methods when analyzing the same samples was about 1.3-fold."

**A1.11 Immunoassay vs LC-MS/MS, stated figures** (Immunoassays)
- EMIT: [P212] "significant overestimation of tacrolimus concentrations in patient samples as compared to LC-MS/MS, reaching up to 30%–36%". Same para: "not reliable for monitoring tacrolimus concentrations below about 3.0–5.0 ng/mL".
- CMIA (the assay named as FDA-approved for US labs): [P218] "cross-reactivity yielding 94% with 31-O-desmethyl tacrolimus (M-II), and 45% with 15-O-desmethyl tacrolimus (M-III)"; [P219] "Saint-Marcoux et al noted 4.4 ± 0.2% bias versus LC-MS/MS in pooled clinical samples".
- ACMIA: [P215] "A mean positive bias of 1.78 ± 1.51 ng/mL versus LC-MS/MS was found in patient samples by Tempestilli et al". The same study "suggested the risk of inappropriately low tacrolimus dosage in low-albumin patients".
- Overall [P234]: "the analytical performance of currently available methods still varies broadly which needs critical consideration when implementing or changing TDM services for tacrolimus."

**A1.12 Method-specific accuracy requirement** ([P231]; ungraded)
> "an adequate application of a 4- to 5-ng/mL-wide target concentration range would require analytical imprecision and bias of ≤6% each."

**A1.13 Sample stability** (Sample Stability [P193]; ungraded)
> "Stability of the measured tacrolimus concentration was proven for samples stored up to 14 days at 22°C or 4°C, as well as at least 1 month at −20°C and 1 year at −70°C."

**A1.14 Turnaround target for LC-MS/MS** ([P210]; ungraded)
> "LC-MS/MS assays should be designed to meet a turnaround time of approximately 3 hours for in-house tacrolimus samples."

**A1.15 Once-daily vs twice-daily formulations: variability** (Exec Summary, Drug Exposure [P67]; ungraded)
> "To date, none of the different tacrolimus formulations (immediate release, prolonged, or extended release) has been clearly reported to decrease PK variability of the drug when compared with the other."

**A1.16 Position on converting between formulations / generics** (Galenic Formulations and Generics [P148]; ungraded)
> "Conversions from innovator drug to generic or from one generic to another generic version need to be performed under careful monitoring of drug exposure and only after adequate instructions to the patient."
> "it is important to limit the number of conversions from one formulation to another as much as possible."
The report states no conversion ratio between immediate-release and once-daily tacrolimus. For Envarsus only: [P145] "Envarsus presents higher bioavailability and as a consequence needs to be administered in comparably lower doses ... (correction factor of 0.7)." (See disagreement D5.)

**A1.17 Once-daily C0 targets** : the report gives AUC0-24 ranges corresponding to C0 bands for once-daily (Advagraf) [P157] but states no separate once-daily C0 target ranges.

**A1.18 A "random" (non-trough) level**: **not stated** (see Not stated).

## A2. Target ranges as stated (C0 = trough, whole blood), with the report's caveats

**A2.1 No single range** (Recommended Tacrolimus Target Concentration Ranges, kidney [P154]; ungraded)
> "it is not possible to recommend a single target tacrolimus concentration range."
> "the tacrolimus target exposure has been defined empirically and depends on the perceived risk of acute rejection, the time after transplantation, and the comedication used."

**A2.2 Kidney, low immunological risk** (Exec Summary, In Kidney Transplant Recipients [P69]; repeated [P175])
> "tacrolimus may be targeted to a C0 of 4–12 ng/mL (and preferably to C0 >7 ng/mL) when prescribed in combination with IL-2 receptor (IL-2R) blocker induction therapy, mycophenolate, and glucocorticoids (A I)"
Same para, with everolimus: "a C0 of 4–7 (month 0–2) and 2–4 (>month 2) ng/mL when combined with everolimus and glucocorticoids and induction therapy ... (B II)".

**A2.3 Kidney, higher risk** [P70]
> "Tacrolimus C0 targets may be higher in adult patients at higher immunological risks (B II)."
No number given for higher risk in the executive summary.

**A2.4 Kidney, AUC floor and C0-band AUCs** [P72] "A minimal AUC0–12h threshold of 150 ng·h/mL may be proposed for the twice-daily formulation in adults (B II)." Body [P157] gives AUC0-12h bands for twice-daily: "75–140 ng·h/mL for 3–7 ng/mL; 100–190 ng·h/mL for 5–10 ng/mL; 140–210 ng·h/mL for 8–12 ng/mL; and 180–270 ng·h/mL for 10–15 ng/mL"; once-daily AUC0-24 bands "150–275 ... for C0 3–7 ng/mL; 180–350 ... 5–10; 260–400 ... 8–12; 310–475 ... 10–15".

**A2.5 Kidney evidence caveat** [P153]
> "the studies which investigated the relationship between tacrolimus exposure and the risk of AR and toxicity were often retrospective and/or included limited numbers of patients"
and [P151]: "a pooled analysis of 3 other randomized, controlled clinical trials found no relationship between tacrolimus C0 and BPAR."

**A2.6 SYMPHONY and TRANSFORM context** [P154] "75% of the low-immunological risk patients in the tacrolimus arm ... had a tacrolimus C0 between 4 and 11 ng/mL in the first month ... between 4 and 10 ng/mL later on, and between 4 and 9 ng/mL between 6 and 12 months." [P155] everolimus + low tacrolimus "target C0 of 4–7 ng/mL (months 0–2), 2–5 ng/mL (months 3–6), and 2–4 ng/mL thereafter"; comparator standard exposure "8–12, 6–10 and 5–8 ng/mL, respectively". Ungraded (trial description).

**A2.7 Liver, adult** (Exec Summary, In Liver Transplant Recipients [P74]-[P76]; repeated [P180]-[P182])
> "6–10 ng/mL during the first 4 weeks after transplantation and 5–8 ng/mL thereafter (A I)" (with mycophenolate or everolimus and corticosteroids)
> "10–15 ng/mL during the first 3 months after transplantation and 5–10 ng/mL afterward) (C1 II)" (monotherapy or induction only)
> "10–15 ng/mL may also be aimed for in patients on a corticosteroid-free regimen (even beyond the fourth month after surgery) (C1 II)" (para states "A tacrolimus C0 of 10–15 ng/mL")

**A2.8 Liver caveats** (PK Monitoring in Liver Transplantation [P158]; ungraded)
> "C0 >10 ng/mL seem to offer little additional advantage in terms of reduced allograft rejection but result in a higher rate of renal dysfunction."
> "C0 <5 ng/mL should be avoided, mainly during the first month"
> "In general, however, C0 value >15 ng/mL should be avoided."
> "Waiting 6 weeks before targeting 5–8 ng/mL in combination with mycophenolic acid may be considered as an alternative because the evidence in favor of the target change at 4 weeks is weak."
> "Liver function usually becomes stable 3 weeks after transplantation."

**A2.9 Heart and lung: old ranges and the stated problem** (PK Monitoring in Thoracic Transplantation [P161]; ungraded)
> "15–20 ng/mL for the first 2 months, 10–15 ng/mL from months 3–6, and 8–10 ng/mL after 6 months following heart transplantation; and 10–25 ng/mL for the first 2 weeks, 10–20 ng/mL for the next 6–10 weeks, and 10–15 ng/mL thereafter in lung transplantation."
> "These C0 targets were never formally revised."
Grade item (Exec Summary, In Heart and Lung Transplantation [P78]; repeated [P184]):
> "The C0 ranges recommended almost 20 years ago must be revised (and probably lowered), as they encompassed values between 15 and 20 ng/mL in the first weeks after transplantation, whereas recent studies have shown that the risk of acute kidney injury within the first 2 weeks after transplantation was significantly increased for C0 >15 ng/mL (B II)."
The report does not give new heart or lung target numbers. Caveat [P161]: "as these targets have not been associated with any type of assay for blood concentration measurement, they should be interpreted ... with caution".

**A2.10 Pancreas**: not covered by the report's organ sections (see Not stated).

**A2.11 Is there a universal toxic threshold?** The report states no toxic threshold. It states "not possible to recommend a single target" (A2.1) and gives organ-specific cautions: C0 >15 ng/mL and acute kidney injury in heart and lung (A2.9) and C0 >15 ng/mL "should be avoided" in liver (A2.8). It adds [P153] "Tacrolimus exposure has been more consistently associated with the incidence of adverse events" (kidney section). No level is stated above which toxicity is expected in all patients.

**A2.12 Within-patient variability** (Exec Summary on Within-Patient Variability [P192]; B II): "Within-patient variability of tacrolimus concentrations has emerged as a potential tool to predict adverse events during follow-up of kidney, liver, and heart transplant recipients but has not entered routine monitoring yet (B II)."

## A3. What raises or lowers levels (consensus)

**A3.1 Table 2 "Drug Interactions With Tacrolimus" (read from rendered IMAGE).** Two columns "Drug" / "Clinical Effect (Risk)". Three groups as printed; no doses or actions in the table:
- *"Additive or synergistic nephrotoxicity"*: aminoglycosides, amphotericin B, cisplatin, cyclosporine, ibuprofen, kanamycin.
- *"Reduce tacrolimus concentrations (transplant rejection)"*: antacids, carbamazepine, dexamethasone, HIV antivirals, modafinil, phenobarbital, phenytoin, pioglitazone, rifabutin, rifampin, troglitazone.
- *"Increase tacrolimus concentrations (toxicity)"*: bromocriptine, chloramphenicol, cimetidine, cisapride, clarithromycin, clotrimazole, cyclosporine, danazol, diltiazem, Elbasvir, erythromycin, esomeprazole, ethinylestradiol, fluconazole, grazoprevir, itraconazole, ketoconazole, omeprazole, methylprednisolone, metoclopramide, mibefradil, nefazodone, nicardipine, HIV protease inhibitors, theophylline, troleandomycin, verapamil, voriconazole.
(Row-to-group assignment read from vertical position in the image; the effect text is printed once per group. Ambiguity 3.)

**A3.2 Triazole antifungals: act before the level** (Drug-Drug and Drug-Food Interactions [P136]; ungraded)
> "At initiation of therapy with these drugs, an immediate tacrolimus dose reduction is recommended, as maintaining the tacrolimus dose and waiting for a tacrolimus concentration after a couple of days are likely to cause significant toxicity."
No dose fraction is given (the labels give one-third for voriconazole/posaconazole; see D3).

**A3.3 Inducers** [P142]
> "drugs that are known inducers of CYP3A include rifampin, antiepileptic drugs, some HIV antivirals, and importantly also the glucocorticoids ... lead to a decrease of tacrolimus concentration that if passing unnoticed may fall below the recommended therapeutic range, which would put a patient at risk for graft rejection."

**A3.4 Steroid taper raises tacrolimus and can mimic rejection** [P142]
> "a rise in serum creatinine as a result of increasing tacrolimus concentrations may be misinterpreted as a rejection after corticosteroid tapering."
and [P135] "Reduction in the dose of corticosteroids ... contributes to a decrease in tacrolimus clearance".

**A3.5 Diarrhea** (PK of Tacrolimus [P134]; ungraded)
> "Temporary elevation of tacrolimus trough concentrations (about 2-fold and more) has been observed in patients with diarrhea."
Reason given: "intestinal Pgp activity is impaired in patients with persistent diarrhea, leading to increased bioavailability."

**A3.6 Food and grapefruit** [P143]
> "The consumption of solid food when taking oral doses of tacrolimus can decrease both the rate and extent of drug absorption from the gastrointestinal tract."
> "the drug label recommends taking tacrolimus on an empty stomach, or at least 1 hour before or 2–3 hours after a meal."
> "Food–drug interactions with tacrolimus include grapefruit and grapefruit juice."
St John's wort: "has been shown to decrease tacrolimus exposure in renal transplant recipients." [P144] "the use of herbal medications should be avoided."

**A3.7 HIV and HCV antivirals** [P140], [P141]: HIV agents "inhibit and induce, respectively, the CYP3A enzymes and the P-gp transporter"; HCV direct-acting antivirals "can also produce drug interactions with tacrolimus. Considerable modifications of tacrolimus dose have been recommended".

**A3.8 Genotype** (PG, Executive Summary and Practical Recommendations [P95]; A I)
> "Patients expressing CYP3A5 require approximately 50% higher tacrolimus dose to reach the target therapeutic range compared with nonexpressors (A I)."
Body [P265] says genotype-based adjustment "with a doubling of the tacrolimus starting dose in patients who are CYP3A5 expressors". [P96] "there is currently no convincing clinical evidence that a PG-based approach to tacrolimus dosing improves clinical outcomes after SOT." (Ambiguity 2.)

**A3.9 Other factors**: [P132] "CYP3A5 genotype, weight, hematocrit, and postoperative day were identified to affect tacrolimus clearance." [P133] "In pregnancy ... 39% increase in the total tacrolimus clearance". [P135] African American patients: "Variability of tacrolimus exposure ... attributed to ethnic differences in CYP3A5 and P-gp."

**A3.10 Hepatic impairment as a cause of high levels**: **not stated in the report** (no section). See Not stated.

## A4. Toxicity as described by the consensus
The report does not describe nephrotoxicity, neurotoxicity, PRES, hyperkalemia, hypomagnesemia, hypertension, QT, diabetes, TMA or PRCA as clinical entities. Statements that bear on toxicity are those in A2.8, A2.9, A2.12, A3.4 and:

**A4.1** (Introduction [P115]; ungraded) The goal of ranges is to limit adverse events: "there is a range of adverse events that affect the quality of life and life expectancy of transplant patients who need life-long immunosuppression."
**A4.2** (Exec Summary [P64]) "The goal of these changes was to minimize the adverse effects, mainly nephrotoxicity, and improve its effectiveness."
**A4.3** (Within-patient variability, Liver [P189]) Early variability "was associated with ... complications such as nephrotoxicity, cardiotoxicity, and neurological adverse events". Ungraded.

## A5-A6. Overdose, supratherapeutic level, missed dose, vomiting
**Not stated** in the consensus report (searched for overdose, dialysis, vomit, missed, supratherapeutic).

---

# PART B. LABELS

## B1. Levels: how drawn, read, target ranges

### B1.1 Prograf PI (immediate release)
**B1.1.1 TDM recommended, whole-blood trough** (Prograf PI 2.6 P1, P3; XML text)
> "Monitoring of tacrolimus blood concentrations in conjunction with other laboratory and clinical parameters is considered an essential aid to patient management for the evaluation of rejection, toxicity, dose adjustments, and compliance."
> "monitoring of whole blood trough concentrations is recommended to assist in the clinical evaluation of toxicity and efficacy failure."

**B1.1.2 Monitoring is not a replacement; most variable in week 1** (2.6 P2)
> "Blood concentration monitoring is not a replacement for renal and liver function monitoring and tissue biopsies."
> "tacrolimus whole blood concentrations were most variable during the first week post-transplantation."
Frequency drivers: "hepatic or renal dysfunction, the addition or discontinuation of potentially interacting drugs and the post-transplant time."

**B1.1.3 Assay and matrix** (2.6 P4)
> "Immunoassays may react with metabolites as well as parent compound. Therefore, assay results obtained with immunoassays may have a positive bias relative to results of HPLC/MS."
> "Whole blood is the matrix of choice and specimens should be collected into tubes containing ethylene diamine tetraacetic acid (EDTA) anticoagulant. Heparin anticoagulation is not recommended"
Storage: "assayed within 7 days"; deep freeze at -20 C if longer.

**B1.1.4 Ranges apply to oral dosing only** (2.2 P10)
> "The whole blood trough concentration range described in Table 1 pertains to oral administration of PROGRAF only; ... the observed concentrations will not represent comparable exposures to those estimated by the trough concentrations observed in patients on oral therapy."

**B1.1.5 Whole blood vs plasma** (Prograf PI 12.3 P2): "whole blood concentrations rather than plasma concentrations serve as the more appropriate sampling compartment". Ratio (12.3 P15) "averaged 35 (range 12 to 67)", depends on "hematocrit, temperature at the time of plasma separation, drug concentration, and plasma protein concentration."

**B1.1.6 Prograf Table 1, whole-blood trough ranges (XML table, 2.2 P3)**: with azathioprine, kidney: "Month 1-3: 7-20 ng/mL Month 4-12: 5-15 ng/mL"; kidney with MMF/IL-2 receptor antagonist: "Month 1-12: 4-11 ng/mL" (footnote: second smaller trial observed "6-16 ng/mL during month 1-3 and 5-12 ng/mL during month 4-12"); liver with corticosteroids only: "Month 1-12: 5-20 ng/mL"; heart with azathioprine or MMF: "Month 1-3: 10-20 ng/mL Month ≥ 4: 5-15 ng/mL"; lung with azathioprine or MMF: "Month 1-3: 10-15 ng/mL Month 4-12: 8-12 ng/mL". No pancreas row.
Instruction: "Perform therapeutic drug monitoring (TDM) to ensure that patients are within the ranges listed in Table 1." Titration (2.2 P4): "Dosage should be titrated based on clinical assessments of rejection and tolerability. PROGRAF dosages lower than the recommended initial dosage may be sufficient as maintenance therapy."

**B1.1.7 Food** (Prograf PI 2.1 P7): "may be taken with or without food. However, since the presence of food affects the bioavailability of PROGRAF, if taken with food, it should be taken consistently the same way each time". 12.3: high-fat meal "mean AUC and Cmax were decreased 37% and 77%".

### B1.2 Astagraf XL PI (extended-release capsules, kidney only)
**B1.2.1 Ranges (XML table, Astagraf PI 2.2 P1)**: adult with basiliximab, MMF, steroids: "Month 1: 7-15 ng/mL • Months 2-6: 5-15 ng/mL • > 6 Months: 5-10 ng/mL"; adult with MMF and steroids without basiliximab: "Month 1: 10-15 ng/mL • Months 2-6: 5-15 ng/mL • > 6 Months: 5-10 ng/mL". (Pediatric rows ignored.)
**B1.2.2 TDM schedule** (2.4 P1): "Measure tacrolimus whole blood trough concentrations at least two times on separate days during the first week after initiation of dosing and after a change in dosage, after a change in co-administration of CYP3A4 inducers and/or inhibitors or cannabidiol, or after a change in renal or hepatic function." and "time to achieve tacrolimus steady state is approximately 7 days".
**B1.2.3 Assay** (2.4 P2): "whole blood tacrolimus trough concentrations obtained with immunoassays may be numerically higher than concentrations obtained with an assay using HPLC/MS/MS."
**B1.2.4 Dosing time and food** (2.1 P4): "taken consistently every morning at the same time ... on an empty stomach at least 1 hour before a meal, or at least 2 hours after a meal".
**B1.2.5 Not interchangeable** (2.1 P2; 5.4 P1): "not interchangeable or substitutable for tacrolimus extended-release tablets, tacrolimus immediate-release capsules or tacrolimus for oral suspension. Under or overexposure to tacrolimus may result in graft rejection or other serious adverse reactions. Changes between tacrolimus immediate-release and extended-release dosage forms must occur under physician supervision". 5.4: medication errors "led to serious adverse reactions, including graft rejection".

### B1.3 Envarsus XR PI (extended-release tablets, kidney)
**B1.3.1 Ranges (XML table, Envarsus PI 2.2)**: "During Month 1: 6 to 11 ng/mL"; "> Month 1: 4 to 11 ng/mL".
**B1.3.2 Conversion from immediate release** (2.3 P1): "administer ENVARSUS XR once daily at a dose that is 80% of the total daily dose of the tacrolimus immediate-release product. Monitor tacrolimus whole blood trough concentrations and titrate ENVARSUS XR dosage to achieve whole blood trough concentration ranges of 4 to 11 ng/mL." (This is the only label with a stated conversion ratio.)
**B1.3.3 TDM and assay** (2.5 P1-P2): same two-times-in-week-1 and steady-state ~7 days wording as Astagraf; immunoassay "may be numerically higher" than HPLC/MS/MS.
**B1.3.4 Dosing and food** (2.1 P2): "on an empty stomach consistently at the same time of the day, preferably in the morning ... at least 1 hour before a meal or at least 2 hours after a meal". 12.3 P7: high-fat breakfast "reduced the systemic exposure (AUC) to tacrolimus by approximately 55%". 12.3 P9: evening dosing "15% lower AUC0-inf and a 20% lower C24, as compared to morning dosing".
**B1.3.5 Not interchangeable** (2.1 P1; 5.3): "not interchangeable or substitutable with tacrolimus extended-release capsules, tacrolimus capsules, and tacrolimus for oral suspension."

### B1.4 Cyclosporine labels (no current TDM consensus exists; labels only)
**There is no IATDMCT cyclosporine consensus in the saved set (MANIFEST section 12); nothing below comes from a consensus.**
**B1.4.1 Neoral, Blood Concentration Monitoring in Transplant Patients P1**
> "While no fixed relationship has been established, blood concentration monitoring may assist in the clinical evaluation of rejection and toxicity, dose adjustments, and the assessment of compliance."
**B1.4.2 Neoral, same section P2**: assays "Current assay results are also not interchangeable"; "there is a consensus that parent-compound-specific assays correlate best with clinical events. Of these, HPLC is the standard reference"; "Most clinicians base their monitoring on trough cyclosporine concentrations." Same text in Gengraf.
**B1.4.3 Neoral/Gengraf give no numeric target range** in the saved XML (Dosage and Administration states only "pre-defined cyclosporine blood concentration"). Neoral, Newly Transplanted Patients P1: "If cyclosporine trough blood concentrations are used, the target range is the same for Neoral as for Sandimmune. Using the same trough concentration target range for Neoral as for Sandimmune results in greater cyclosporine exposure when Neoral is administered".
**B1.4.4 Sandimmune, Blood Cyclosporine Concentration Monitoring P1** (the only numbers in the six labels for cyclosporine): "in one series of 375 consecutive cadaveric renal transplant recipients, dosage was adjusted to achieve specific whole blood 24-hour trough concentrations of 100 to 200 ng/mL as determined by high-pressure liquid chromatography (HPLC)."
**B1.4.5 Sandimmune, same section P2**: "If plasma specimens are employed, concentrations will vary with the temperature at the time of separation from whole blood. Plasma concentrations may range from 1/2 to 1/5 of whole blood concentrations." "Blood concentration monitoring is not a replacement for renal function monitoring or tissue biopsies."
**B1.4.6 Nephrotoxicity vs rejection table carries trough numbers** (Neoral and Gengraf, Warnings, Kidney Liver and Heart Transplant, Nephrotoxicity P5, XML table; Sandimmune Warnings, Nephrotoxicity P7): nephrotoxicity "CyA serum trough level > 200 ng/mL"; rejection "CyA serum trough level < 150 ng/mL". The label states these are parameters "significantly associated" with one or the other, not criteria: "specific diagnostic criteria which reliably differentiate renal graft rejection from drug toxicity have not been found". Not a target range.
**B1.4.7 Neoral/Gengraf vs Sandimmune exposure** (Neoral Boxed WARNING P3): "For a given trough concentration, cyclosporine exposure will be greater with Neoral than with Sandimmune." "Neoral and Sandimmune are not bioequivalent and cannot be used interchangeably without physician supervision."
**B1.4.8 Conversion Sandimmune to Neoral** (Neoral, Conversion from Sandimmune to Neoral P1-P2): "1:1 dose conversion", then adjust "to attain the pre-conversion cyclosporine blood trough concentration"; trough "monitored every 4 to 7 days after conversion"; creatinine and blood pressure "every two weeks during the first two months". Neoral to Sandimmune (Warnings, All Patients P4): "conversion from Neoral to Sandimmune using a 1:1 ratio (mg/kg/day) may result in lower cyclosporine blood concentrations." Gengraf has the same conversion text with Gengraf named.
**B1.4.9 Trough timing for cyclosporine**: Neoral Pharmacokinetics Absorption table footnote 3: "Trough concentration was measured just prior to the morning Neoral dose, approximately 12 hours after the previous dose." (PK study footnote, not an instruction.)
**B1.4.10 Food** (Neoral, Absorption P2): high-fat meal "decreased the AUC by 13% and Cmax by 33%". Dosing (D&A P3): "administered on a consistent schedule with regard to time of day and relation to meals." Grapefruit: "Grapefruit and grapefruit juice affect metabolism, increasing blood concentration of cyclosporine, thus should be avoided."

## B2. Interactions (labels)

### B2.1 Tacrolimus labels, drug-interaction table (XML table: Prograf PI 7.2, Astagraf PI 7.2, Envarsus PI 7.2). Wording as printed; sections cross-referenced
| Class | Effect | Recommendation |
|---|---|---|
| Grapefruit/juice | "May increase tacrolimus whole blood trough concentrations and increase the risk of serious adverse reactions (e.g., neurotoxicity, QT prolongation)" | "Avoid grapefruit or grapefruit juice." (all three) |
| Alcohol (Astagraf, Envarsus only) | Astagraf: "May increase the rate of tacrolimus release and increase the risk of serious adverse reactions"; Envarsus: "May modify the rate of tacrolimus release." | "Avoid alcoholic beverages." |
| Strong CYP3A inducers: antimycobacterials (rifampin, rifabutin), anticonvulsants (phenytoin, carbamazepine, phenobarbital), St John's wort | "May decrease tacrolimus whole blood trough concentrations and increase the risk of rejection" | "Increase PROGRAF dose and monitor tacrolimus whole blood trough concentrations" (Astagraf/Envarsus name their own product) |
| Strong CYP3A inhibitors: protease inhibitors (nelfinavir, telaprevir, boceprevir, ritonavir), azole antifungals (voriconazole, posaconazole, itraconazole, ketoconazole), antibiotics (clarithromycin, troleandomycin, chloramphenicol), nefazodone, letermovir (Prograf, Astagraf), Schisandra sphenanthera; Envarsus adds "ritonavir containing products" and cobicistat | "A rapid, sharp rise in tacrolimus levels may occur early, despite an immediate reduction of tacrolimus dose" | "Reduce PROGRAF dose (for voriconazole and posaconazole, give one-third of the original dose) and adjust dose based on tacrolimus whole blood trough concentrations ... Early and frequent monitoring of tacrolimus whole blood trough levels should start within 1-3 days" |
| Mild/moderate CYP3A inhibitors (Prograf): clotrimazole; antibiotics (erythromycin, fluconazole); calcium channel blockers (verapamil, diltiazem, nifedipine, nicardipine); amiodarone, danazol, ethinyl estradiol, cimetidine, lansoprazole, omeprazole | increase levels, "increase the risk of serious adverse reactions" | "Monitor tacrolimus whole blood trough concentrations and reduce PROGRAF dose if needed" |
| "Other drugs": magnesium and aluminum hydroxide antacids; metoclopramide | "May increase tacrolimus whole blood trough concentrations" | "Monitor ... and reduce ... dose if needed" |
| Mild/moderate CYP3A inducers: methylprednisolone, prednisone; caspofungin | "May decrease tacrolimus whole blood trough concentrations." | "Monitor ... and adjust ... dose if needed" |
Also (all three, 7.2, after table): hepatitis C direct-acting antivirals: "The pharmacokinetics of tacrolimus may be impacted by changes in liver function during DAA therapy ... Close monitoring and potential dose adjustment ... is warranted". Cannabidiol (Prograf 7.3/5.17; Astagraf 7.3/5.15; Envarsus 7.3/5.13): "closely monitor for an increase in tacrolimus blood levels and for adverse reactions suggestive of tacrolimus toxicity. A dose reduction ... should be considered as needed".
Boxed/W&P statement on strong inhibitors/inducers (Prograf PI 5.11; Astagraf PI 5.10; Envarsus PI 5.9): inhibitors "higher whole blood trough concentrations and greater risk of serious adverse reactions (e.g., neurotoxicity, QT prolongation)"; inducers "lower whole blood trough concentrations and greater risk of rejection". Prograf 5.11 lists clarithromycin: "A rapid, sharp rise in tacrolimus levels has been reported after co-administration with a strong CYP3A4 inhibitor, clarithromycin, despite an initial reduction of tacrolimus dose."
Nephrotoxic co-drugs (Prograf PI 5.5 P3): "aminoglycosides, ganciclovir, amphotericin B, cisplatin, nucleotide reverse transcriptase inhibitors, protease inhibitors"; action "monitor renal function and tacrolimus blood concentrations, and adjust doses of both".
Calcium-channel blockers and BP (Prograf 5.8): "may increase tacrolimus blood concentrations and therefore require dosage reduction of PROGRAF".
Other tacrolimus interaction statements: not used with cyclosporine (Prograf 2.1 P10): "PROGRAF or cyclosporine should be discontinued at least 24 hours before initiating the other." Sirolimus (Prograf 5.10): "not recommended for use with sirolimus".

### B2.2 Cyclosporine labels (Neoral, Precautions, Drug Interactions; Gengraf and Sandimmune equivalent; the three lists are the same apart from layout)
**B2.2.1 Increase cyclosporine concentrations** (Neoral, Drug Interactions A.1, XML table, P6): calcium channel blockers diltiazem, nicardipine, verapamil; antifungals fluconazole, itraconazole, ketoconazole, voriconazole; antibiotics azithromycin, clarithromycin, erythromycin, quinupristin/dalfopristin; glucocorticoid methylprednisolone; others allopurinol, amiodarone, bromocriptine, colchicine, danazol, imatinib, metoclopramide, nefazodone, oral contraceptives. HIV protease inhibitors (indinavir, nelfinavir, ritonavir, saquinavir) "could potentially increase the concentrations of cyclosporine, however no formal studies of the interaction are available." Boceprevir (P15) "approximately 2.7-fold and 2-fold" AUC/Cmax; telaprevir (P17) "approximately 4.5-fold and 1.3-fold".
**B2.2.2 Decrease cyclosporine concentrations** (A.2, XML table, P11): nafcillin, rifampin; carbamazepine, oxcarbazepine, phenobarbital, phenytoin; bosentan, octreotide, orlistat, sulfinpyrazone, terbinafine, ticlopidine; St. John's Wort. St John's wort (P19): "marked reduction in the blood concentrations of cyclosporine, resulting in subtherapeutic levels, rejection of transplanted organs, and graft loss." Bosentan (P13): "Coadministration of cyclosporine with bosentan should be avoided." Rifabutin (P21): "Care should be exercised". Orlistat (P5): "Compounds that decrease cyclosporine absorption, such as orlistat, should be avoided."
**B2.2.3 Action stated** (Neoral P5): "Appropriate Neoral dosage adjustment to achieve the desired cyclosporine concentrations is essential when drugs that significantly alter cyclosporine concentrations are used concomitantly".
**B2.2.4 Additive nephrotoxicity** (Neoral P3-P4, XML table): ciprofloxacin, gentamicin, tobramycin, trimethoprim with sulfamethoxazole, vancomycin; melphalan; amphotericin B, ketoconazole; azapropazon, colchicine, diclofenac, naproxen, sulindac; cimetidine, ranitidine; tacrolimus; fibric acid derivatives, methotrexate. Action (Neoral P4): "close monitoring of renal function (in particular serum creatinine) should be performed. If a significant impairment of renal function occurs, the dosage of the coadministered drug should be reduced or an alternative treatment considered." NSAIDs (P2): "particularly in the setting of dehydration, may potentiate renal dysfunction".
**B2.2.5 Hyperkalemia co-drugs** (Neoral P45): "Cyclosporine should not be used with potassium-sparing diuretics because hyperkalemia can occur."
**B2.2.6 Cyclosporine raises other drugs** (Neoral P23-P24, P27, P29, P31): CYP3A4/P-gp inhibitor; may reduce clearance of "digoxin, colchicine, prednisolone, HMG-CoA reductase inhibitors (statins), aliskiren, bosentan, dabigatran, repaglinide, NSAIDs, sirolimus, etoposide"; digoxin "Severe digitalis toxicity has been seen within days of starting cyclosporine"; statins myotoxicity including rhabdomyolysis.
**B2.2.7 Diarrhea, hepatic, genotype for cyclosporine**: hepatic (Neoral D&A, Hepatic Impairment P10): "The clearance of cyclosporine may be significantly reduced in severe liver disease patients ... Dose reduction may be necessary". Diarrhea and genotype: not stated in cyclosporine labels (diarrhea appears only in adverse-event tables).

### B2.3 Tacrolimus labels: hepatic impairment, diarrhea, genotype
**B2.3.1 Hepatic impairment** (Prograf PI 2.5 P1): "patients with severe hepatic impairment (Child-Pugh ≥ 10) may require lower doses of PROGRAF. Close monitoring of blood concentrations is warranted." 2.5 P2: liver-transplant recipients with post-transplant hepatic impairment have "increased risk of developing renal insufficiency related to high whole blood concentrations of tacrolimus". Astagraf PI 8.7 and Envarsus PI 8.7: "With greater tacrolimus whole blood trough concentrations in patients with severe hepatic impairment, there is a greater risk of adverse reactions and dosage reduction is recommended. For patients with moderate hepatic impairment, monitor tacrolimus whole blood trough concentrations. For patients with mild hepatic impairment, no dosage adjustments are needed."
**B2.3.2 Diarrhea**: no label statement that diarrhea changes tacrolimus levels (diarrhea appears only as an adverse reaction, e.g. Prograf PI 6.1; liver trial P14 "Diarrhea was sometimes associated with other gastrointestinal complaints such as nausea and vomiting").
**B2.3.3 Genotype**: CYP3A4 and CYP3A5 named as metabolisers (Prograf PI 12.3 P18); Envarsus PI 12.3 P23 "Approximately 80% of the African American patients were carriers of the active, wild type CYP3A5*1 allele." No label gives a genotype-based dose. Race: "African-American patients may need to be titrated to higher dosages to attain comparable trough concentrations" (Prograf PI 8.8 P1; Astagraf PI 2.3 P1; Envarsus PI 8.8 P1).
**B2.3.4 Cystic fibrosis (lung)** (Prograf PI 2.2 P6): "cystic fibrosis patients may have a reduced bioavailability of orally administered tacrolimus resulting in the need for higher doses".

## B3. Toxicity as the labels describe it, with recognition and action

### B3.1 Boxed warnings, verbatim in summary, in printed order
- **Prograf PI**: title "WARNING: MALIGNANCIES AND SERIOUS INFECTIONS". One statement: "Increased risk for developing serious infections and malignancies with PROGRAF or other immunosuppressants that may lead to hospitalization or death." (5.1, 5.2). (The saved SPL carries this single statement; no further bullets.)
- **Astagraf XL PI**: "WARNING: MALIGNANCIES AND SERIOUS INFECTIONS IN TRANSPLANT PATIENTS; AND INCREASED MORTALITY IN FEMALE LIVER TRANSPLANT PATIENTS". (1) "Increased risk for developing serious infections and malignancies with ASTAGRAF XL or other immunosuppressants that may lead to hospitalization or death." (2) "Increased mortality in female liver transplant patients with ASTAGRAF XL. ASTAGRAF XL is not approved for use in liver transplantation."
- **Envarsus XR PI**: "WARNING: MALIGNANCIES AND SERIOUS INFECTIONS": "Increased risk for developing serious infections and malignancies with ENVARSUS XR or other immunosuppressants that may lead to hospitalization or death".
- **Neoral** (BOXED WARNING; P1-P3 for transplant; a second boxed block is for psoriasis): (P1) only experienced physicians prescribe, managed in facilities with "adequate laboratory and supportive medical resources"; (P2) "may increase the susceptibility to infection and the development of neoplasia"; (P3) "Neoral and Sandimmune are not bioequivalent and cannot be used interchangeably without physician supervision"; "Cyclosporine blood concentrations should be monitored in transplant and rheumatoid arthritis patients taking Neoral to avoid toxicity due to high concentrations. Dose adjustments should be made in transplant patients to minimize possible organ rejection due to low concentrations." **Gengraf**: same three paragraphs with Gengraf named; same psoriasis block not shown in the transplant section (a separate unclassified section precedes DESCRIPTION).
- **Sandimmune** "WARNING: RECOMMENDATIONS FOR USE, USE WITH CORTICOSTERIODS, RISKS WITH INAPPROPRIATE SWITCHING, and MONITORING CYCLOSPORINE BLOOD LEVELS": (1) Recommendations for Use; (2) Use with Corticosteroids: "should be administered with adrenal corticosteroids but not with other immunosuppressive agents"; (3) Risks with Inappropriate Switching: "Do not switch between Sandimmune capsules, 25 mg to Neoral capsules, MODIFIED, 25 mg ... on a mg-to-mg basis"; (4) Monitoring Cyclosporine Blood Levels: "The absorption of cyclosporine during chronic administration of Sandimmune capsules was found to be erratic."

### B3.2 Nephrotoxicity
- Tacrolimus (Prograf PI 5.5 P1-P2; same words Astagraf PI 5.6, Envarsus PI 5.5): "can cause acute or chronic nephrotoxicity in transplant patients due to its vasoconstrictive effect on renal vasculature, toxic tubulopathy and tubular-interstitial effects." Recognition: "Acute renal impairment associated with tacrolimus toxicity can result in high serum creatinine, hyperkalemia, decreased secretion of urea and hyperuricemia, and is usually reversible." Action: "In patients with elevated serum creatinine and tacrolimus whole blood trough concentrations greater than the recommended range, consider dosage reduction or temporary interruption of tacrolimus administration."
- Cyclosporine (Neoral, Warnings, Kidney Liver Heart Transplant, Nephrotoxicity P2): "It is not unusual for serum creatinine and BUN levels to be elevated during cyclosporine therapy. These elevations in renal transplant patients do not necessarily indicate rejection, and each patient must be fully evaluated before dosage adjustment is initiated." P4: overt nephrotoxicity "characterized by a rapidly rising BUN and creatinine. Since these events are similar to renal rejection episodes, care must be taken to differentiate between them. This form of nephrotoxicity is usually responsive to cyclosporine dosage reduction." P5: "up to 20% of patients may have simultaneous nephrotoxicity and rejection." P6: "From 5% to 15% of transplant recipients who have received cyclosporine will fail to show a reduction in rising serum creatinine despite a decrease or discontinuation of cyclosporine therapy." P3 (historic Sandimmune): nephrotoxicity "25% of cases of renal transplantation, 38% ... cardiac ..., and 37% ... liver". Warnings, All Patients P3: creatinine elevations "are likely to become more pronounced without dose reduction or discontinuation." Same in Gengraf and Sandimmune (Warnings, Nephrotoxicity).
- Nephrotoxicity vs rejection table (Neoral Nephrotoxicity P5, XML table): nephrotoxicity "Often > 6 weeks postop", "Gradual rise in Cr (< 0.15 mg/dL/day)", "BUN/Cr ≥ 20", "Responds to decreased cyclosporine"; rejection "Often < 4 weeks postop", "Fever > 37.5°C", "Rapid rise in Cr (> 0.3 mg/dL/day)", "Responds to increased steroids or antilymphocyte globulin". The label says no criteria reliably differentiate (B1.4.6).

### B3.3 Neurotoxicity (PRES, seizures, tremor)
- Tacrolimus (Prograf PI 5.6; Astagraf PI 5.7; Envarsus PI 5.6): "The most severe neurotoxicities include posterior reversible encephalopathy syndrome (PRES), delirium, seizure and coma; others include tremors, paresthesias, headache, mental status changes, and changes in motor and sensory functions." Recognition link: "As symptoms may be associated with tacrolimus whole blood trough concentrations at or above the recommended range". Action: "monitor for neurologic symptoms and consider dosage reduction or discontinuation".
- Cyclosporine (Neoral, Warnings, Neurotoxicity P27-P28; Gengraf, Sandimmune equivalent): "convulsions in adult and pediatric patients ... particularly in combination with high dose methylprednisolone." PRES "Manifestations include impaired consciousness, convulsions, visual disturbances (including blindness), loss of motor function, movement disorders and psychiatric disturbances." Predisposing: "hypertension, hypomagnesemia, hypocholesterolemia, high-dose corticosteroids, high cyclosporine blood concentrations, and graft-versus-host disease". Action: "The changes in most cases have been reversible upon discontinuation of cyclosporine, and in some cases improvement was noted after reduction of dose." "patients receiving liver transplant are more susceptible to encephalopathy than those receiving kidney transplant." Optic disc edema "with possible visual impairment, secondary to benign intracranial hypertension". Tremor is "the principal adverse reactions" list (Neoral, Adverse Reactions, Kidney Liver Heart P1): "renal dysfunction, tremor, hirsutism, hypertension, and gum hyperplasia."

### B3.4 Hyperkalemia
- Prograf PI 5.7: "Hyperkalemia has been reported with PROGRAF use. Serum potassium levels should be monitored." Astagraf PI 5.8 / Envarsus PI 5.7: "Mild to severe hyperkalemia, which may require treatment, has been reported with tacrolimus". Risk agents: "potassium-sparing diuretics, ACE inhibitors, angiotensin receptor blockers".
- Cyclosporine (Neoral, Warnings, Hyperkalemia P14): "Significant hyperkalemia (sometimes associated with hyperchloremic metabolic acidosis) and hyperuricemia have been seen occasionally in individual patients." Neoral Precautions, Hypertension P2: "since cyclosporine may cause hyperkalemia, potassium-sparing diuretics should not be used."

### B3.5 Hypomagnesemia
- Tacrolimus labels: listed as an adverse reaction (Prograf PI 6.1: kidney "hypomagnesemia" among reactions ≥30%; liver ≥40% list includes "hypomagnesemia"); in QT section (Prograf PI 5.12; Astagraf 5.11; Envarsus 5.10): electrolyte disturbances "hypokalemia, hypocalcemia, or hypomagnesemia" ... "consider obtaining electrocardiograms and monitoring electrolytes (magnesium, potassium, calcium) periodically". No replacement dose or level stated.
- Cyclosporine (Neoral, Adverse Reactions, Hypomagnesemia P6-P7): "Hypomagnesemia has been reported in some, but not all, patients exhibiting convulsions while on cyclosporine therapy." Multiple factors (hypertension, high dose methylprednisolone, hypocholesterolemia, "nephrotoxicity associated with high plasma concentrations of cyclosporine") "appear to be related to the neurological manifestations".

### B3.6 Hypertension
- Prograf PI 5.8: "Hypertension is a common adverse effect of PROGRAF therapy and may require antihypertensive therapy." Avoid hyperkalemia-associated agents (potassium-sparing diuretics, ACE inhibitors, ARBs); "Calcium-channel blocking agents may increase tacrolimus blood concentrations and therefore require dosage reduction of PROGRAF." Astagraf 5.9 and Envarsus 5.8 equivalent.
- Neoral, Precautions, General, Hypertension P2: "Hypertension is a common side effect of cyclosporine therapy which may persist"; "antihypertensive therapy may be required"; "calcium antagonists ... can interfere with cyclosporine metabolism". Adverse Reactions P3: "Hypertension, which is usually mild to moderate, may occur in approximately 50% of patients following renal transplantation and in most cardiac transplant patients." (The 25-50% dose-reduction instructions in the same label are for rheumatoid arthritis and psoriasis, not transplant.)

### B3.7 QT prolongation
- Prograf PI 5.12 P1-P2 (Astagraf 5.11, Envarsus 5.10): "may prolong the QT/QTc interval and may cause Torsades de pointes. Avoid PROGRAF in patients with congenital long QT syndrome." Consider ECGs and electrolytes in congestive heart failure, bradyarrhythmias, "certain antiarrhythmic medications", electrolyte disturbances. With other CYP3A4 substrates/inhibitors that prolong QT: "a reduction in PROGRAF dose, frequent monitoring of tacrolimus whole blood concentrations, and monitoring for QT prolongation is recommended." Amiodarone "reported to result in increased tacrolimus whole blood concentrations with or without concurrent QT prolongation".
- Cyclosporine labels: no QT statement found in Neoral, Gengraf or Sandimmune.

### B3.8 Hyperglycemia / new-onset diabetes
- Prograf PI 5.4: "PROGRAF was shown to cause new onset diabetes mellitus in clinical trials of kidney, liver, heart, or lung transplantation. New onset diabetes after transplantation may be reversible in some patients. African-American and Hispanic kidney transplant patients are at an increased risk. Blood glucose concentrations should be monitored closely". Astagraf 5.5 / Envarsus 5.4: "Monitor blood glucose concentrations and treat appropriately".
- Neoral: "hyperglycemia" appears only in a list of reactions in "2% or less" of patients (Adverse Reactions, Clinical Studies P12); no warning section.

### B3.9 Thrombotic microangiopathy
- Prograf PI 5.16 (Astagraf 5.14; Envarsus 5.14): "Cases of thrombotic microangiopathy (TMA), including hemolytic uremic syndrome (HUS) and thrombotic thrombocytopenic purpura (TTP), have been reported". Action: "In patients with signs and symptoms of TMA, consider tacrolimus as a risk factor. Concurrent use of tacrolimus and mTOR inhibitors may contribute to the risk of TMA." Patient leaflet (Prograf Patient Information): "fever and bruising under the skin that may appear as red dots, with or without unexplained tiredness, confusion, yellowing of the skin or eyes, decreased urination".
- Neoral, Warnings, Thrombotic Microangiopathy P12: "a syndrome of thrombocytopenia and microangiopathic hemolytic anemia which may result in graft failure. The vasculopathy can occur in the absence of rejection". "Neither the pathogenesis nor the management of this syndrome is clear. Though resolution has occurred after reduction or discontinuation of cyclosporine and 1) administration of streptokinase and heparin or 2) plasmapheresis, this appears to depend upon early detection". Same in Gengraf and Sandimmune.

### B3.10 Pure red cell aplasia
- Prograf PI 5.15: "Cases of pure red cell aplasia (PRCA) have been reported in patients treated with tacrolimus." All had risk factors "such as parvovirus B19 infection, underlying disease, or concomitant medications associated with PRCA." Action: "If PRCA is diagnosed, discontinuation of PROGRAF should be considered." Astagraf 5.13 / Envarsus 5.12: "consider discontinuation".
- Cyclosporine labels: no PRCA statement found.

### B3.11 Other toxicity statements recorded because they bear on ED decisions
- Anaphylaxis with injection (Prograf PI 5.9): "Anaphylactic reactions have occurred with injectables containing castor oil derivatives, including PROGRAF, in a small percentage of patients (0.6%)." Sandimmune injection: "approximately 1 in 1000" (Warnings, Anaphylactic Reactions P32).
- Myocardial hypertrophy (Prograf PI 5.13): "particularly those with high tacrolimus trough concentrations ... appears reversible in most cases following dose reduction or discontinuance". Not in Astagraf or Envarsus W&P.
- Polyoma (Neoral, Warnings, Polyoma Virus Infections P23, P25; Gengraf, Sandimmune): "polyoma virus-associated nephropathy (PVAN), especially due to BK virus infection ... PVAN is associated with serious outcomes, including deteriorating renal function and renal graft loss" and "Consideration should be given to reducing the total immunosuppression in transplant patients who develop PML or PVAN. However, reduced immunosuppression may place the graft at risk."
- Hepatotoxicity (cyclosporine): Neoral Warnings P16-P17 "Cases of hepatotoxicity and liver injury, including cholestasis, jaundice, hepatitis, and liver failure"; "The chemistry elevations usually decreased with a reduction in dosage."
- Live vaccines avoided (all six labels).

## B4. Overdose sections
**B4.1 Prograf PI 10** (P1): "Acute overdosages of up to 30 times the intended dose have been reported. Almost all cases have been asymptomatic and all patients recovered with no sequelae." Reported effects "tremors, abnormal renal function, hypertension, and peripheral edema; in one case of acute overdosage, transient urticaria and lethargy". Dialysis: "it is anticipated that tacrolimus is not dialyzable to any significant extent; there is no experience with charcoal hemoperfusion." Charcoal: "The oral use of activated charcoal has been reported in treating acute overdoses, but experience has not been sufficient to warrant recommending its use." Management: "General supportive measures and treatment of specific symptoms should be followed in all cases of overdosage."
**B4.2 Astagraf XL PI 10 and Envarsus XR PI 10** (P1-P9; identical): "Postmarketing cases of overdose with tacrolimus have been reported" with "nervous system disorders (tremor, headache, confusional state, balance disorders, encephalopathy, lethargy and somnolence)"; "gastrointestinal disturbances (nausea, vomiting, and diarrhea)"; "abnormal renal function (increased blood urea nitrogen and elevated serum creatinine)"; urticaria; hypertension; peripheral edema; infections (one fatal case of "bilateral pneumopathy and CMV infection" attributed to extended-release overdose). Dialysis, charcoal and supportive care: same sentences as Prograf PI 10.
**B4.3 Neoral and Gengraf, OVERDOSAGE P1**: "There is a minimal experience with cyclosporine overdosage. Forced emesis and gastric lavage can be of value up to 2 hours after administration". "Transient hepatotoxicity and nephrotoxicity may occur which should resolve following drug withdrawal." "Oral doses of cyclosporine up to 10 g (about 150 mg/kg) have been tolerated with relatively minor clinical consequences, such as vomiting, drowsiness, headache, tachycardia and, in a few patients, moderately severe, reversible impairment of renal function." "Cyclosporine is not dialyzable to any great extent, nor is it cleared well by charcoal hemoperfusion." Management "General supportive measures and symptomatic treatment".
**B4.4 Sandimmune OVERDOSAGE P1, P3**: "Because of the slow absorption of cyclosporine, forced emesis and gastric lavage would be of value up to 2 hours after administration." Effects "vomiting, drowsiness, headache, tachycardia, and in a few patients, moderately severe, reversible impairment of renal function". Not dialyzable "to any great extent, nor is it cleared well by charcoal hemoperfusion." Adds: "If a cyclosporine overdose occurs, consider contacting the Poison Help line (1-800-222-1222) or a medical toxicologist". (Neoral and Gengraf do not include the Poison Help line sentence.)

## B5. Supratherapeutic level, missed dose, vomiting after a dose
**B5.1 Supratherapeutic level with creatinine rise**: tacrolimus labels (B3.2): "consider dosage reduction or temporary interruption". Symptoms (neurotoxicity): "consider dosage reduction or discontinuation" (B3.3). Cyclosporine: dose reduction responsive nephrotoxicity (B3.2); no numeric level at which to act.
**B5.2 Missed dose**: Astagraf XL PI 2.1 P5: "If a dose is missed, the dose may be taken up to 14 hours after the scheduled time (i.e., for a missed 8:00 AM dose, a dose may be taken by 10:00 PM). Beyond the 14-hour time frame, the patient should wait until the usual scheduled time the following morning to take the next regular daily dose. Instruct the patient not to double the next dose." Envarsus XR PI 2.1 P4: "take it as soon as possible within 15 hours after missing the dose. Beyond the 15-hour time frame, instruct the patient to wait until the usual scheduled time to take the next regular daily dose. ... not to double the next dose." Prograf PI, Neoral, Gengraf, Sandimmune: no missed-dose instruction.
**B5.3 Vomiting after a dose**: no label addresses it (searched all six).
**B5.4 Over-reduction caution**: Prograf PI 2.1 P2: "Under- or overexposure to tacrolimus may result in graft rejection or other serious adverse reactions."
**B5.5 IV to oral and IV levels** (Prograf PI 2.2 P8): oral first dose "8-12 hours after discontinuing the intravenous infusion"; IV concentrations not comparable (B1.1.4).

---

# PART C. WHERE SOURCES DISAGREE

**D1 Letermovir.** Prograf PI 7.2 and Astagraf PI 7.2 list it under *strong* CYP3A inhibitors (reduce dose; voriconazole/posaconazole one-third rule applies only to those two). Envarsus PI 7.2 lists letermovir under *mild or moderate* inhibitors ("Monitor ... reduce ... if needed").
**D2 Mild/moderate inhibitor lists differ.** Prograf 7.2: calcium channel blockers (verapamil, diltiazem, nifedipine, nicardipine) and "antibiotics (e.g., erythromycin, fluconazole)", clotrimazole. Astagraf 7.2: the verapamil... group is labelled "antibiotics (e.g., verapamil, diltiazem, nifedipine, nicardipine)" and erythromycin/fluconazole are absent. Envarsus 7.2 adds isavuconazole, imatinib, nilotinib, letermovir and "azole antifungals (e.g., clotrimazole, fluconazole, isavuconazole)"; adds cobicistat and "ritonavir containing products" to strong inhibitors, which Prograf and Astagraf do not.
**D3 Azole dose action: label vs consensus.** Labels (Prograf, Astagraf, Envarsus 7.2): voriconazole and posaconazole "give one-third of the original dose". Consensus A3.2: "immediate tacrolimus dose reduction is recommended" with no fraction.
**D4 Antacids.** Prograf/Astagraf/Envarsus 7.2: magnesium and aluminum hydroxide antacids "May increase tacrolimus whole blood trough concentrations". Consensus Table 2 (image): "antacids" listed under "Reduce tacrolimus concentrations".
**D5 Methylprednisolone.** Labels 7.2: methylprednisolone, prednisone are mild/moderate CYP3A *inducers* ("May decrease"). Consensus Table 2: methylprednisolone is in the "Increase tacrolimus concentrations" group while dexamethasone is in "Reduce", and consensus text [P142] calls glucocorticoids inducers. Neoral: methylprednisolone listed among drugs that *increase cyclosporine*.
**D6 Envarsus conversion.** Envarsus PI 2.3: 80% of the total daily immediate-release dose. Consensus [P145]: "correction factor of 0.7" (also describes tablet strengths 0.75, 1, 4 mg; Envarsus label strengths not checked).
**D7 Food timing.** Consensus [P143]: label recommends "1 hour before or 2–3 hours after a meal". Astagraf PI 2.1 P4 and Envarsus PI 2.1 P2: "at least 1 hour before a meal, or at least 2 hours after a meal". Prograf PI 2.1 P7: with or without food, consistently.
**D8 Sample stability.** Prograf PI 2.6 P4: assay within 7 days at room temperature or refrigerated. Consensus [P193]: stable up to 14 days at 22 C or 4 C.
**D9 Target ranges, label vs consensus.** Kidney: Prograf 4-11 (MMF/IL-2RA) and 7-20 then 5-15 (azathioprine); Astagraf 7-15/5-15/5-10; Envarsus 6-11 then 4-11; consensus 4-12, "preferably C0 >7" (A I), or 4-7 then 2-4 with everolimus (B II). Liver: Prograf 5-20 (corticosteroids only); consensus 6-10 then 5-8 (A I) with mycophenolate/everolimus, higher for monotherapy. Heart: Prograf 10-20 months 1-3 then 5-15; consensus says old ranges (15-20 early) "must be revised (and probably lowered)" because of AKI with C0 >15. Lung: Prograf 10-15 then 8-12; consensus historic 10-25 then 10-20 then 10-15 (not formally revised). The label heart/lung ranges therefore overlap the range the consensus says should be revised.
**D9a Single threshold.** All three tacrolimus labels give per-organ trough ranges and the Prograf label says "The relative risks of toxicity and efficacy failure are related to tacrolimus whole blood trough concentrations" (2.6 P3). Consensus [P154]: "not possible to recommend a single target tacrolimus concentration range." Not a contradiction of the numbers, but of the idea that one range applies.
**D10 Alcohol.** Astagraf 7.2: "May increase the rate of tacrolimus release". Envarsus 7.2: "May modify the rate of tacrolimus release." Prograf: no alcohol entry.
**D11 Missed dose window.** Astagraf 14 hours; Envarsus 15 hours; others none.
**D12 Boxed warning content.** Astagraf adds increased mortality in female liver transplant patients; Prograf and Envarsus do not. Sandimmune boxed text requires corticosteroids "but not with other immunosuppressive agents"; Neoral and Gengraf boxed text says "may be administered with other immunosuppressive agents".
**D13 Hepatic impairment.** Prograf PI 2.5 (severe, Child-Pugh ≥10) "may require lower doses. Close monitoring of blood concentrations is warranted"; Astagraf/Envarsus 8.7: "dosage reduction is recommended" for severe, monitoring for moderate, none for mild. Child-Pugh printed "≥ 10" in 2.5/2.3/2.4 and "> 10" in the 8.7 / 12.3 text of the same labels.
**D14 Hyperkalemia wording.** Prograf 5.7 "Serum potassium levels should be monitored"; Astagraf 5.8 and Envarsus 5.7 "Mild to severe hyperkalemia, which may require treatment".
**D15 Cyclosporine labels with each other.** Severe unremitting rejection: Neoral/Gengraf (Warnings, Nephrotoxicity P9) "it may be preferable to switch to alternative immunosuppressive therapy rather than increase the Neoral dose to excessive blood concentrations"; Sandimmune (Warnings, Nephrotoxicity P10) "it is preferable to allow the kidney transplant to be rejected and removed rather than increase the Sandimmune dosage to a very high level". Persistent high BUN/creatinine: only Sandimmune says "consideration should be given to switching to other immunosuppressive therapy". Gastric emptying in overdose: Neoral/Gengraf "can be of value up to 2 hours"; Sandimmune "would be of value up to 2 hours" and adds the Poison Help line. Neoral has no section-numbered format; Gengraf adds a Special Excipients (alcohol) section that Neoral lacks.
**D16 CYP3A5 genotype effect size inside the consensus.** [P95] "approximately 50% higher" (A I) vs [P265] "doubling of the tacrolimus starting dose" for expressors.
**D17 Consensus vs labels on EDTA/heparin.** Consensus: EDTA "preferred anticoagulant"; Prograf label additionally states heparin "not recommended". Consistent, not a disagreement; Astagraf and Envarsus labels say nothing about anticoagulant.

---

## Not stated (do not invent)

1. A "random" (non-trough) tacrolimus or cyclosporine level: what it means, how to interpret it, or whether to act on it. Not in the consensus or any label. The consensus says only that C0 is a proxy "if blood sampling is perfectly timed".
2. A numeric hour interval for "trough" for immediate-release tacrolimus (consensus: "immediately before dose"; Prograf PI gives dosing "every 12 hours" but not the draw time).
3. How long after a dose a level drawn in the ED is still interpretable; how to interpret a level drawn mid-interval or after the morning dose.
4. Any tacrolimus level above which toxicity occurs, or above which to act in an ED. Only: C0 >15 ng/mL and acute kidney injury in early heart and lung transplants (consensus, B II); C0 >10 ng/mL gives little added benefit and more renal dysfunction in liver transplants; C0 >15 "should be avoided" in liver.
5. Target ranges for pancreas, intestinal and combined-organ recipients; new heart or lung ranges (consensus says to revise but gives none); a higher-risk kidney number; separate C0 targets for once-daily formulations in the consensus.
6. A cyclosporine consensus; numeric cyclosporine target ranges in Neoral or Gengraf; cyclosporine C2 monitoring in these labels (C2 appears only in the older 2005 paper saved elsewhere, not read).
7. Whether to dose-adjust or hold tacrolimus or cyclosporine for a given level, rise in creatinine or neurologic symptom beyond "consider dosage reduction or temporary interruption / discontinuation"; any actual dose amounts for ED use.
8. Vomiting after a dose; missed-dose guidance for Prograf, cyclosporine labels, and for twice-daily dosing in the consensus.
9. Diarrhea in any label as a cause of high levels (only the consensus, [P134]); hepatic impairment in the consensus; genotype in the labels (beyond Envarsus's CYP3A5*1 sentence).
10. Hyperkalemia thresholds, magnesium replacement targets, QTc cut-offs, blood-pressure targets, glucose thresholds in any label or the consensus.
11. Treatment of tacrolimus or cyclosporine neurotoxicity or PRES (benzodiazepines, antiepileptics, imaging): none. Treatment of TMA: only the cyclosporine label's historical streptokinase/heparin/plasmapheresis note (B3.9).
12. Whether intravenous tacrolimus or cyclosporine is needed when a patient cannot take oral doses, and the IV-to-oral conversion ratio for tacrolimus (Prograf PI 2.2 gives IV starting doses and the 8-12 hour oral hand-off only; cyclosporine IV is "1/3 the oral dosage" in the Sandimmune label only).
13. Consensus: any description of nephrotoxicity, neurotoxicity, hyperkalemia, hypomagnesemia, hypertension, QT, diabetes, TMA, PRCA as clinical entities; overdose; dialysis.

## Ambiguities or internal inconsistencies

1. **Consensus P-numbers.** Counted from the page top; the Executive Summary and the body repeat statements with different P-numbers (e.g. kidney target [P69] and [P175]). Either locator is valid.
2. **CYP3A5 effect**: "approximately 50% higher" [P95] vs "doubling" [P265] (D16).
3. **Consensus Table 2 (image):** the "effect" column is printed once per group at the first row of each group; membership of each drug in a group is inferred from vertical position. Methylprednisolone and metoclopramide appear in the lower ("Increase") group; the text says glucocorticoids induce. HIV antivirals are listed under "Reduce" and "HIV protease inhibitors" under "Increase".
4. **Consensus whole blood:plasma ratio:** "range from 13 to 114 (mean = 15)" [P130] while Prograf label 12.3 says "averaged 35 (range 12 to 67)"; the report cites a different study.
5. **Consensus half-life range** "between 4 and 41 hours" [P131] vs Prograf "30 times the intended dose" overdose data: no stated half-life in the label sections read; not used for any action.
6. **Prograf label table footnote:** "In a second smaller trial ... observed tacrolimus concentrations were 6-16 ng/mL during month 1-3 and 5-12 ng/mL during month 4-12" appears inside the MMF/IL-2RA row text of the XML; read as a footnote to that row.
7. **Astagraf mild/moderate inhibitor label** "antibiotics (e.g., verapamil, diltiazem, nifedipine, nicardipine)" is printed so; verapamil and the others are not antibiotics. Recorded as printed (D2).
8. **Prograf boxed warning in SPL:** the saved XML contains one statement only; the full printed boxed warning could include more text than the SPL highlights-style statement. Not checked against a rendered label.
9. **Neoral target statement "same trough range as Sandimmune"** combined with "exposure will be greater with Neoral" is a labelled contradiction in practical use: no number is given for either in the Neoral text.
10. **Sandimmune 100-200 ng/mL** is one renal series (HPLC, "24-hour trough" on a once-daily regimen), described in the label as "No fixed relationships"; not a general target.
11. **Heart/lung label ranges vs consensus**: the Prograf ranges are labelled "Whole Blood Trough Concentration Range" for the initial dosing regimen; the consensus calls similar historic ranges unrevised. Not resolved by either source.
12. **Child-Pugh ≥10 vs >10** within the same label (D13).
13. **The consensus Table 1 grading key** was read from the image; the A/B/C1/C2 definitions are the key's, which concern "specific target concentrations" and "BM monitoring" rather than generic recommendations.
