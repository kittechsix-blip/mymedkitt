# CMV in the adult solid-organ transplant recipient: evidence pack

Source of record: Kotton CN et al. *The Fourth International Consensus Guidelines on the Management of Cytomegalovirus in Solid Organ Transplantation.* Transplantation 2025;109(7):1066-1110 (The Transplantation Society). Saved file: `TTS_CMV_4th_consensus_2025_PMC12180710.html`.
Comparison only: 3rd edition, Transplantation 2018;102(6):900-931, saved as `TTS_CMV_3rd_consensus_2018_WayneState_copy.pdf` (PDF page numbers given as "3rd PDF p.N").

## How to read the locators (important for the verifier)

- **The 2025 guideline is saved as a PMC HTML page, not a PDF.** It has no page numbers. Locator = section heading as printed + `[P#]`, where `[P#]` is the Nth paragraph/list item after the "Abstract" heading, counting in document order (extraction script kept in the session scratchpad; a plain text search of the quote in the HTML finds every item, so `[P#]` is a convenience only). Journal page range for the whole article is 1066-1110; per-section journal pages could not be derived from the HTML.
- The saved 2025 HTML has an **empty Abstract** (no text), and the Table S1 GRADE key and Table S2 are supplementary (SDC) and not saved.
- **Grade format.** The guideline prints grades as `(strength, quality)`, e.g. "(strong, moderate)". Its own sentence in the Introduction [P2] states the two terms in reverse ("strength of recommendation (eg, high, moderate...) and quality of evidence (eg, strong, weak)"); the order used in every statement is strength first, quality second. "(expert opinion)" is used where no grade is given. Statements with no grade in the source are marked **ungraded**.
- **Tables.** HTML tables were rendered to images (headless Chrome screenshot of each `<table>`) and read from the images: **Table 1, Table 2, Table 3, Table 5.** Table 4 (published preemptive thresholds), Tables 6-10 and the figures were not used. **Figure 5 (resistance flowchart) body was not read** (image not saved); only its text footnotes, which are in the HTML, are quoted. Table 11-13 are pediatric and not used.
- Adults only. Pediatric sections were ignored.

---

## 1. Definitions

**1.1 CMV infection** (Introduction [P4]; no grade, definitional; quoting TAVIF consensus definitions, ref 11)
> "evidence of CMV replication regardless of symptoms (differs from latent CMV); “defined as virus isolation or detection of viral proteins (antigens) or nucleic acid in any body fluid or tissue specimen.”"

**1.2 CMV disease** (Introduction [P5]; no grade)
> "consists of “end-organ disease” and “CMV syndrome” and requires evidence of CMV infection with attributable symptoms."

**1.3 Syndrome vs tissue-invasive: NOT further defined in 2025.** The 2025 Introduction names "CMV syndrome" and "end-organ disease" but gives no symptom list for either. Table 1 ("CMV-related definitions", read from image) contains only: Antigenemia, Viremia, DNAemia, CMV-specific IgG, Surveillance, Monitoring. Table 1 definitions used by the guideline:
- DNAemia: "Measuring CMV DNA by QNAT (whole blood and plasma)" (Table 1, read from image)
- CMV-specific IgG: "Marker of previous exposure (positive serology does not define “active infection”)" (Table 1, read from image)
- Viremia: "Culture-based detection of infectious CMV" (Table 1, read from image)
- Antigenemia: "Measuring CMV-specific antigen in peripheral blood leukocytes (eg, pp65 assay)" (Table 1, read from image)
- Surveillance: "Patient at risk, but no evidence of an event or biomarker"; Monitoring: "Patient has event or biomarker positive" (Table 1, read from image)

**1.4 Terminology rule** (Introduction [P6])
> "the term DNAemia is used instead of viremia to reflect the detection of CMV DNA in blood or plasma (whether actively replicating virus or not)."

**1.5 Scope.** "The document does not address CMV management after hematopoietic stem cell transplantation." (Introduction [P6])

**1.6 Proven tissue-invasive disease** (Diagnostics for Tissue-invasive Disease [P24]; no grade)
> "Identification of cytopathic changes characteristic of CMV and the detection of CMV antigens by immunohistochemistry define proven CMV organ disease."

(For comparison, 2018 defined syndrome; see Section 10.)

## 2. Who is at risk and when

**2.1 Serostatus risk categories** (Diagnostics, Pretransplant CMV Laboratory Testing [P9]; no grade)
> "The risk levels are high (D+/R–), intermediate (D+/R+ or D–/R+), and low (D–/R–)."

**2.2 Organ-specific risk level and prevention approach.** Table 3, "Recommended approaches for CMV prevention in different organs for adult solid organ transplant recipients" (Prevention). **Read from image.** Risk level column as printed:
- Kidney: D+/R– High; R+ Intermediate
- Liver: D+/R– High; R+ Intermediate
- Pancreas: D+/R– High; R+ Intermediate
- Islet: D+/R– **Intermediate**; R+ Intermediate
- Heart: D+/R– High; R+ Intermediate
- Lung: D+/R– High; R+ Intermediate
- Intestinal, composite tissue: D+/R– High; **R+ High**
- All organs, D–/R–: Low
Table 3 footnote [P68]: "VGCV is approved by the EMA but not the FDA in liver transplants." (guideline's statement; not checked against the FDA label)

**2.3 Late-onset disease: who** (Prevention, Optimal Duration of Prophylaxis [P66]; no grade)
> "late-onset CMV is associated with D+/R– serostatus, shorter courses of prophylaxis, higher levels of immunosuppression, and allograft rejection."

**2.4 Late-onset disease: numbers** (Valganciclovir and Ganciclovir [P62]; no grade)
> "In the PV16000 study, where 3 mo of prophylaxis was used, 18% had late-onset CMV disease by 12 mo (~30% when including investigator-treated disease)."
Lung: "late-onset CMV disease rates of almost 50% in D+/R– lung transplants that receive 6 mo of prophylaxis and 42% in those that receive it for 9 mo." (Optimal Duration of Prophylaxis, [P70])

**2.5 Period after prophylaxis ends** (Surveillance After Prophylaxis [P80]; surveillance statement graded "weak, low" at [P123])
> "surveillance after prophylaxis may be considered in patients at increased risk for postprophylaxis CMV disease (D+/R–, R+ with induction therapy, recent augmentation of immunosuppression, lung transplantation, and others deemed at high risk)."
Table 2 (read from image): "Late CMV (infection/disease)" is "Common" with VGCV prophylaxis and with LET prophylaxis, "Rare" with preemptive therapy.

**2.6 After rejection treatment / lymphocyte-depleting therapy** (Prevention During Augmented Immunosuppression [P88]; no grade)
> "an increase in rates of CMV infection or CMV tissue-invasive disease in patients receiving therapy for acute rejection treated with the above modalities."
("the above modalities" = lymphocyte-depleting antibodies, second signal inhibitors such as belatacept, desensitization/ABO-incompatible protocols incl. rituximab, bortezomib, eculizumab, plasmapheresis.)
Recommendation [P133] (weak, moderate): "treatment of rejection with lymphocyte-depleting antibodies in at-risk recipients should result in reinitiation of prophylaxis or preemptive therapy for 4–12 wk"; high-dose steroids or apheresis "may be considered (weak, very low)".

**2.7 Recurrence after treatment** (Secondary Antiviral Prophylaxis and Recurrent Infection [P84]; no grade)
> "Recurrent DNAemia upon completion of treatment and/or preemptive therapy occurs, particularly in high-risk transplant patients"
Preemptive therapy: "Second episodes of replication are observed in about 30%–75% of those treated for CMV DNAemia" ([P75]).

**2.8 Risk of resistance** (Antiviral Drug Resistance, Risk Factors [P222]; no grade)
> "The risk of drug resistance rises with prolonged antiviral drug exposure and ongoing active viral replication facilitated by lack of prior host CMV immunity (D+/R– serostatus)"

## 3. Presentation

**The 2025 guideline gives almost no clinical-presentation text.** It does not list symptoms of CMV syndrome, GI disease, hepatitis, or pneumonitis. What it does say:

**3.1 GI disease and blood viral load** (Diagnostics for Tissue-invasive Disease [P25]; no grade)
> "Plasma CMV-QNAT has a high sensitivity for diagnosing gastrointestinal disease in CMV (D+/R–) patients, but sensitivity can decrease in (R+) patients, sometimes with low or undetectable CMV DNAemia."

**3.2 Pneumonitis, lung recipients** ([P26]; no grade)
> "Low or undetectable CMV DNAemia can also be seen (rarely) in lung transplant recipients with CMV pneumonia."

**3.3 Retinitis** ([P28]; no grade)
> "The clinical diagnosis of CMV retinitis is based on ophthalmologic examination"
> "CMV DNAemia is rarely useful as a predictor of CMV retinitis, although it may be positive before and at the time of diagnosis."
> "The differential diagnosis includes necrotizing retinitis caused by herpes simplex virus, varicella-zoster virus, or Toxoplasma."

**3.4 CNS disease** ([P27]; no grade)
> "Central nervous system disease in SOT recipients is extremely rare."

**3.5 Hepatitis:** not mentioned as a CMV manifestation in the adult text (see Section 8).

**3.6 Presentation on prophylaxis.** Only statements on frequency, not clinical picture:
- "Breakthrough infection is uncommon during letermovir primary prophylaxis, similar to valganciclovir" (Letermovir [P65]; no grade).
- Valganciclovir under-dosing: "a greater severity of CMV disease in those that develop breakthrough on low-doses and numerically more ganciclovir resistance." (Lower-dose Valganciclovir Prophylaxis [P89]; refers to D+/R– studies.)
- Resistance during prophylaxis is low: "typically in the 0%–3% range" (Resistance, Risk Factors [P223]).

## 4. Diagnosis

**4.1 Test of choice** (Diagnostics, Consensus Statements [P34]; **strong, high**)
> "We recommend using CMV-QNAT calibrated to the WHO standard for diagnosis, surveillance to guide preemptive antiviral treatment, and therapeutic monitoring"

**4.2 Plasma or whole blood** ([P38]; **strong, high**)
> "We recommend either plasma or whole blood specimens for CMV DNA testing, taking into account the differences in CMV DNAemia values, viral kinetics, and assay performance characteristics"
Narrative ([P14]): "Many experts favored the use of plasma over whole blood, although most felt that either specimen type was valid." Also "whole blood generally detecting CMV earlier and in higher quantities per unit volume compared with plasma."

**4.3 Do not switch specimen/assay** ([P39]; **strong, high**): "Specimen type should not be changed when monitoring patients". ([P40]; strong, high): "individual patients are consistently monitored with the same assay."

**4.4 Units** ([P36]; **strong, high**)
> "Results should be reported as log10 values; both log10 and integer values may be reported together if helpful"
Significant change ([P41]; **strong, low**): "only changes in CMV DNAemia exceeding 0.5 log10 IU/mL (3-fold) or 0.7 log10 IU/mL (5-fold) for initial values <3 log10 IU/mL (1000 IU/mL)".

**4.5 Thresholds** ([P42]; **strong, moderate**)
> "universal thresholds for therapy or treatment endpoints have not been established and currently published thresholds remain assay specific. Accordingly, we recommend that centers establish their own thresholds"
Narrative ([P20], expert-poll, no grade): a majority of experts started treatment at "2–3.2 log10 IU/mL (100–1500 IU/mL) in plasma for D+/R– patients" and "2.7 to 3.6 log10 IU/mL (500–4000 IU/mL) in plasma for R+ patients". These are practice reports, not recommendations.

**4.6 Antigenemia** ([P37]; **strong, high**): "if not available, antigenemia may be considered as an alternative".

**4.7 Serology** ([P23]; no grade): "Testing for CMV-specific antibodies has no role in the diagnosis of active CMV replication and disease posttransplantation."

**4.8 Tests not recommended** ([P44]; **strong, high**): "We do not recommend viral culture of blood, urine, stool, or oral secretions for the diagnosis of CMV infection or disease". ([P45]; **strong, low**): "We do not recommend CMV-QNAT on urine, stool, or oral secretions for surveillance or diagnosis of CMV disease".

**4.9 Tissue-invasive disease: histology** ([P46]; **strong, moderate**)
> "We recommend histology coupled with immunohistochemistry for the diagnosis of tissue-invasive disease."
Same item: "CMV-QNAT and viral culture of tissue biopsies may augment the sensitivity for invasive disease." (no grade on this sentence)
Opening statement ([P24]): "The definitive diagnosis of CMV organ pathology relies on virus detection in tissue."

**4.10 Limitation of blood viral load in tissue-invasive disease:** quotes in 3.1, 3.2, 3.3 above ([P25], [P26], [P28]). Also GI: "A plasma threshold of 4 log10 IU/mL (4063 IU/mL)... showed a positive predictive value of 68% for gastrointestinal disease in one study" ([P25], single-study, assay-specific). In patients with detectable DNAemia, "positive CMV-QNAT from tissue may originate from blood in cases where histopathology shows no evidence of viral infection" ([P25]).
Treatment-duration statement ([P191]): "CMV DNAemia may not accurately reflect the clinical disease status in all situations, and clinical signs should also be considered when determining treatment length."

**4.11 BAL in lung recipients** ([P26]; no grade): "CMV-QNAT in BAL fluid specimens may improve the specificity for the diagnosis of possible, probable, and proven CMV pneumonia in lung and non–lung transplant recipients." "Further work is needed to standardize QNAT in BAL fluid samples and optimize thresholds".

**4.12 CSF** ([P27]; no grade): "the presence of CMV DNA in the CSF likely represents CMV disease necessitating treatment (assuming CSF is not contaminated by blood)."

**4.13 Retinitis confirmation** ([P28]): "A positive CMV-QNAT in vitreous fluid, biopsy, or vitrectomy specimen may be helpful in confirming the diagnosis of CMV retinitis."

## 5. Treatment

**5.1 First-line drugs and doses, normal kidney function** (CMV Treatment, Consensus Statements [P195]; **strong, moderate**)
> "oral valganciclovir (900 mg every 12 h) or intravenous ganciclovir (5 mg/kg every 12 h) are recommended as first-line treatment in adults with normal kidney function"
Applies to "initial and recurrent episodes of CMV disease" (same sentence).

**5.2 Mild-to-moderate** ([P196]; **strong, moderate**): "Oral valganciclovir is recommended in patients with mild to moderate CMV disease who can tolerate and adhere to oral medication".

**5.3 Severe / life-threatening** ([P197]; **strong, low**): "Intravenous ganciclovir is recommended in life-threatening and severe diseases". The guideline does not define "severe" or "mild to moderate".

**5.4 When IV is preferred** (Initial Treatment [P185]; no grade)
> "Intravenous ganciclovir is preferred as the initial treatment of life-threatening or sight-threatening CMV disease when optimal drug exposure is essential."
> "there are limited PK data to confirm adequate valganciclovir bioavailability in patients with severe gastrointestinal CMV disease."
Valganciclovir preferred when feasible: "which may reduce or prevent hospital stays and minimize the infectious and vascular access complications associated with intravenous therapy." ([P185]).
Step-down ([P198]; **strong, moderate**): "After clinical improvement, intravenous ganciclovir may be transitioned to valganciclovir in patients who are able to tolerate oral therapy".
Preemptive/asymptomatic ([P122]; strong, high for starting VGCV): "Intravenous ganciclovir is a less preferred option unless concerns about absorption exist."

**5.5 Not recommended for treatment** ([P199]; **strong, moderate**): "Oral ganciclovir, acyclovir, or valacyclovir are not recommended for the treatment of CMV disease". Letermovir ([P200]; **ungraded**): "There is insufficient evidence to support the use of letermovir monotherapy for the treatment of CMV infection."; ([P186]): "Letermovir is not recommended for treatment due to its low barrier to developing resistance."

**5.6 Renal dose adjustment statement** ([P207]; **strong, low**)
> "Antiviral dosage reductions are only recommended during the treatment phase to adjust for worsening kidney function, as suboptimal dosing may be associated with increased risk of clinical failure and/or antiviral resistance"
Monitoring method ([P206]; **strong, moderate**): "frequent monitoring of kidney function (nonnormalized GFR, such as Cockcroft-Gault formula ie, mL/min) is recommended to guide valganciclovir or ganciclovir dosage adjustments".
Caution ([P194]): "even small variations in creatinine levels, for example, due to dehydration or other confounding causes, may result in large changes in dosing unrelated to the true drug elimination."

**5.7 Renal dosing table.** Table 5, "Dosage recommendations for ganciclovir and valganciclovir and valacyclovir for adult patients with impaired kidney function (using the Cockcroft-Gault formula)" (Prevention). **Read from image.** Treatment-dose column (CrCl mL/min):
- IV ganciclovir: ≥70: 5.0 mg/kg q12h; 50-69: 2.5 mg/kg q12h; 25-49: 2.5 mg/kg q24h; 10-24: 1.25 mg/kg q24h; <10: 1.25 mg/kg 3x/wk after hemodialysis.
- Oral valganciclovir: ≥60: 900 mg q12h; 40-59: 450 mg q12h; 25-39: 450 mg q24h; 10-24: 450 mg q48h; <10: 200 mg 3x/wk after hemodialysis (footnote a).
- Footnote a [P91]: "Oral solution must be used in this instance (as valganciclovir tablets cannot be split)."
- Maintenance/prevention column (not treatment): IV GCV 5.0 q24h / 2.5 q24h / 1.25 q24h / 0.625 q24h / 0.625 3x/wk post-HD; VGCV 900 q24h / 450 q24h / 450 q48h / 450 twice weekly / 100 mg 3x/wk post-HD.
- Valacyclovir (high dose) has only a prevention column, no treatment dose ("–").
Table 5 values are identical to the 2018 edition's Table 7 (3rd PDF p.14, which I also read from text), except the 2018 wording "once daily/every 2 d".

**5.8 Duration / stopping rule** ([P211]; **strong, moderate**)
> "Antiviral treatment should be continued for a minimum of 2 wk, until clinical resolution of disease and decrease in CMV DNAemia below the institutional, laboratory-specific, threshold"
Same item: "This may be below the LLOQ on a single sample with a highly sensitive assay (LLOQ <200 IU/mL) or on 2 consecutive weekly samples with less sensitive assays".
Longer courses ([P191]; no grade): "Longer courses of treatment may be needed in some tissue-invasive gastrointestinal diseases, pneumonitis in lung transplant recipients, and central nervous system or retinal disease."
Caution ([P191]): "Very prolonged treatment courses are associated with increased resistance rates"; "Reduction in antiviral dosing in the setting of persistent CMV DNAemia at day 21 is associated with a significant risk of ganciclovir resistance by day 49."

**5.9 Do not switch early** ([P201]; **strong, moderate**): "Changing antiviral agents is not recommended for clinically improving patients with unchanged or rising CMV DNAemia in the first 2 wk of therapy". Same item: "CMV DNAemia commonly rises during the first week of therapy."

**5.10 Monitoring.** Viral load ([P205]; **strong, high**): "During the treatment phase, weekly CMV DNAemia testing is recommended, using an assay calibrated to the WHO standard, to monitor response". Blood counts ([P189]; no grade): "complete blood counts should also be monitored at regular intervals to assess for hematologic toxicity (eg, leukopenia)." Monitoring after stopping ([P191]; "may be considered", no grade): "Continued weekly monitoring of CMV DNAemia for 1–3 mo may be considered for patients with higher risk of recurrence."

**5.11 Reducing immunosuppression** ([P204]; **weak, very low**)
> "In patients without concomitant rejection, reduction of immunosuppression is suggested in the following settings: severe CMV disease, inadequate clinical response, high viral loads, and cytopenia"
Also ([P190]): "double (versus triple) immunosuppressive therapy and lower blood concentrations of CNIs were significantly associated with “eradication” of CMV DNAemia at 21 d." (VICTOR).
No guidance on how much or which agent to reduce was found in the adult text.

**5.12 Second-line when intolerant of VGCV/GCV** ([P210]; **strong, low**)
> "maribavir or foscarnet are recommended second-line treatments (strong, low). The choice of drug should be considered on the basis of viral load, risk of nephrotoxicity, and severity of CMV disease."
(Quotes in this file omit the superscript reference numerals that appear in the HTML; wording is otherwise verbatim, machine-checked against the extracted text.)
([P186]) "Foscarnet may be preferred in clinically unwell patients with high-level CMV DNAemia, although drug-induced nephrotoxicity risk and tolerance must be considered".
**No maribavir or foscarnet dose appears in the guideline.** (FDA-label dosing would have to come from the label.)

**5.13 Suspect resistance / refractory CMV**
- When to suspect ([P202]; **strong, moderate**): "Drug resistance should be suspected in patients with a prior cumulative antiviral drug exposure that exceeds 4 wk and clinical treatment failure despite at least 2 wk of appropriately dosed antiviral treatment". Resistance section ([P225]): "after receiving appropriately dosed antiviral therapy for at least 2 continuous weeks, with a cumulative antiviral exposure of 4 wk or more."
- Not predictive early ([P225]): "Persistent viral loads in the first 2 wk of treatment, or an increase in DNAemia at week 1, are not predictive of drug resistance."
- Genotype ([P255]; **strong, high**): "We recommend that a CMV genotypic assay be used to diagnose drug resistance after extended antiviral drug exposure (minimum 4 wk) and suboptimal (treatment-refractory) viral load response after a minimum of 2 wk of optimally dosed antiviral treatment". Specimen ([P256]; **strong, high**): "resistance genotyping should be done on specimens with viral loads of >3 log10 IU/mL (1000 IU/mL)". Genes ([P227]): "Genotypic testing should routinely include both UL97 (codons 335–665) and UL54 (codons 290–1000)." UL56 for letermovir. End-organ site ([P226]): "Resistance mutations may localize at sites of CMV end-organ disease (eg, eye, CSF, graft) and require a tissue-specific specimen for detection."
- Optimize host and dose ([P258]; **strong, low**): "We recommend optimization of immunosuppression and drug dosing as feasible in the setting of resistant and refractory CMV infection".
- Maribavir ([P260]; **strong, high**): "We recommend maribavir as the principal alternative therapy in cases of resistance to either ganciclovir or foscarnet". Limits ([P251]): "Clinical trials excluded patients with CMV retinitis or central nervous system disease, for which the efficacy of the highly protein-bound maribavir is unknown." Figure 5 footnote [5] ([P250]): "Avoid MBV for CNS disease or retinitis." Antagonism ([P250], fn 9): "The MBV-GCV combination is antagonistic; do not use it." Also ([P251]): maribavir "has no activity against herpes simplex and varicella-zoster viruses, for which separate prophylaxis may be needed."
- Foscarnet ([P261]; **weak, low**): "We suggest foscarnet as initial therapy in clinically unwell cases with high viral loads and suspected or proven ganciclovir resistance." High-load marker ([P262]; **expert opinion**): "viral loads of ≥4.7 log10 IU/mL (50 000 IU/mL) on plasma may be useful for clinical decision-making (eg, choosing foscarnet)". Figure 5 footnote [4]: "Avoid FOS if there is renal dysfunction or metabolic intolerance."
- High-dose GCV/VGCV only appears in Figure 5 footnote [6] ([P250]): "GCV dose 5 mg/kg bid IV, optionally 10 mg/kg bid (high dose), or VGCV dose 900 mg bid, optionally 1800 mg bid (high adult dose; adjusted for renal function)." Flowchart text footnote only; not a graded statement.
- Letermovir for resistant disease ([P254]): "Letermovir does not have controlled trial data supporting its use as a treatment for active infection, including refractory or resistant CMV infection."
- Refractory is not failure ([P245]): "These data discourage the premature withdrawal of first-line therapy in those tolerating valganciclovir or ganciclovir."
- Refractory definition ([P14]): "Probable refractory CMV infection is considered if CMV DNAemia levels remain unchanged or increase after at least 2 wk of appropriate therapy."

**5.14 Adjuncts: IVIG / CMVIG** ([P203]; **weak, low**)
> "Adjunctive IVIG or CMVIG for antiviral treatment of CMV disease is not routinely recommended but may be considered for patients with severe disease, resistant/refractory CMV disease, antiviral drug intolerance, and/or if IgG levels are <400 mg/dL, especially in thoracic organ recipients"
Evidence ([P187]): "Systematic reviews of the use of CMVIG in SOT did not show better effect than ordinary pooled IVIG."
No dose of IVIG or CMVIG is given.

**5.15 Secondary prophylaxis** ([P212]; **weak, low**): "We do not recommend the routine use of secondary prophylaxis after treatment of CMV disease or infection". ([P213]; **weak, low**) suggested in high-risk situations such as high immunosuppression, low ALC, low CMV-CMI, repeated recurrences, inability to monitor; "The typical duration for secondary prophylaxis is 8–12 wk." (Treatment section [P192] says "1–3 mo"; see ambiguities.)

**5.16 Therapeutic drug monitoring** ([P208]; **weak, low**): "Systematic TDM for ganciclovir is not generally recommended". May be considered in dialysis, unstable/low kidney function, cystic fibrosis, suspected poor GI absorption.

## 6. Prophylaxis vs preemptive therapy; reading "on valganciclovir" / "just stopped valganciclovir"

**6.1 Strategy** (Prevention [P56]; no grade): "Universal prophylaxis and preemptive therapy are the main approaches for prevention (Table 2). An additional strategy that combines both of these approaches is “surveillance after prophylaxis” (sometimes called a “hybrid” approach)." Recommendation ([P95]; **strong, high**): "We recommend a CMV prevention strategy with prophylaxis OR surveillance with preemptive therapy for all at-risk transplant recipients".

**6.2 Prophylaxis definition** ([P61]): "Universal prophylaxis provides antiviral medication to all patients or a subset of “at-risk” patients, starting within 10 d after transplant. ... Prophylaxis is given for a finite period, typically 3–12 mo."; "Valganciclovir is currently the most commonly used drug for prophylaxis." ([P62]).

**6.3 Duration by organ** (Table 3, read from image; text [P105]-[P119]). Adults, recommended column:
- Kidney D+/R–: 6 mo (V)GCV or 6 mo LET or preemptive therapy; R+: 3 mo VGCV or preemptive. Liver D+/R–: 3–6 mo VGCV or preemptive; R+: 3 mo. Pancreas D+/R–: 3–6 mo VGCV; R+: 3 mo VGCV or preemptive. Islet D+/R–: 3 mo VGCV; R+: 3 mo. Heart D+/R–: 3–6 mo (V)GCV; R+: 3 mo (V)GCV or preemptive. Lung D+/R–: 12 mo (V)GCV; R+: 6–12 mo (V)GCV. Intestinal/composite tissue D+/R–: minimum 6 mo (V)GCV; R+: 3–6 mo (V)GCV.
- Text grades: kidney D+/R– 6 mo "(strong, high)" [P105]; liver/heart/pancreas D+/R– "3 mo (strong, moderate) to 6 mo (strong, low)" [P106]; lung D+/R– 12 mo "(strong, moderate)" [P108]; R+ routine kidney 3 mo "(strong, high)", liver/heart/pancreas "(strong, moderate)" [P117]; R+ lung "6–12 mo of prophylaxis is recommended (strong, moderate)" [P119].
- Table 3 footnote ([P68]): "When a range is given, the duration of prophylaxis may depend on the degree of immunosuppression, including the use of lymphocyte-depleting antibodies for induction."

**6.4 Monitoring while on prophylaxis** ([P97]; **strong, moderate**): "We do not recommend routine CMV DNAemia monitoring while on appropriate dosing of prophylaxis". Exceptions ([P61]): "low absorption states, compliance, variable/decreased renal function, augmented immunosuppression" where "clinicians may choose to monitor for breakthrough DNAemia."

**6.5 "Just stopped" prophylaxis** ([P80]; surveillance weak, low [P123]): "surveillance after prophylaxis is likely most beneficial if monitoring is done weekly for 8–12 wk after the end of prophylaxis; less frequent may not capture early infection." ([P123]): "Monitoring every 2 or 4 wk may be insufficient for optimal preemptive interventions."

**6.6 Low-dose valganciclovir** ([P129]; **weak, low**): "We do not recommend the routine use of low-dose valganciclovir for CMV prophylaxis". Text ([P89]): "The use of low-dose valganciclovir prophylaxis is not recommended; dosing should be according to renal function (Table 5)." Also ([P89]): "breakthrough infections on prophylaxis are more likely to occur in recipients of estimated glomerular filtration rate (eGFR)-adjusted prophylaxis doses below the manufacturer’s recommendations."

**6.7 Letermovir's role** (Letermovir [P64]-[P65]; Recommendations [P99], [P103])
- [P64] no grade: "Letermovir inhibits the viral terminase enzyme complex by binding to UL56 protein, does not share cross-resistance with ganciclovir, and has both an oral and intravenous formulation." Evidence base: "Letermovir given for 200 d was found to be noninferior to valganciclovir in a multicenter trial of CMV prevention in kidney D+/R– transplant recipients".
- [P99] (**strong, high**): "either valganciclovir, ganciclovir, or letermovir be used for primary prophylaxis in D+/R– kidney transplant recipients".
- [P103] (**weak, low**): where prophylaxis is used and there is intolerance to valganciclovir or ganciclovir, "we suggest switching to preemptive therapy or to letermovir prophylaxis" (D+/R– and R+ lung, heart, liver, kidney).
- Heart/lung: "emerging data ... limited to small case series, and risk of breakthrough infection and late-onset CMV disease is less clear." [P64]
- [P65]: "because letermovir is not effective against other herpesviruses, acyclovir prophylaxis should be used where such prevention is indicated."; "A 50% dose reduction of letermovir is required during concomitant use of cyclosporine and letermovir may lead to altered tacrolimus levels, so close monitoring is needed."
- Not for treatment: see 5.5.

**6.8 HSV/VZV cover** ([P124]; **strong, high**): "In CMV D–/R– or when using letermovir as prophylaxis, or when using a preemptive strategy, antiviral prophylaxis against other herpes infections (varicella and herpes simplex) with acyclovir, famciclovir, or valacyclovir should be considered".

**6.9 D–/R–** ([P83]; no grade): "there is minimal risk of CMV infection, and routine prevention of CMV is not recommended, provided that leukodepleted or CMV-seronegative blood products are used." ([P125]; **strong, moderate**) leukoreduced or CMV-seronegative blood products recommended.

**6.10 Augmented immunosuppression, prophylaxis preferred** ([P101]; **weak, moderate**): "We suggest prophylaxis may be preferred in D+/R– liver and kidney transplant patients at greater risk of CMV, such as those receiving higher immunosuppression exposure with lymphocyte-depleting antibodies, second signal inhibitors, desensitization protocols, treatment of steroid-resistant acute cellular rejection, treatment of antibody-mediated rejection, and those with HIV".

**6.11 mTOR inhibitors** ([P94]; no grade): "the incidence of CMV infection/disease is lower among patients receiving immunosuppressive regimens containing mTOR inhibitors in kidney and heart transplant recipients." Switch after first episode ([P132]; **weak, moderate**) in low immunological-risk R+ kidney recipients.

**6.12 Table 2 comparison** (read from image): "Safety": VGCV "Myelosuppression", LET "Drug interactions", preemptive "Less drug toxicity". "Prevention of other herpes viruses": VGCV "Prevents HSV, VZV"; LET "Does not prevent"; preemptive "Does not prevent".

## 7. Drug toxicity relevant to the ED

**7.1 Leukopenia on treatment** ([P209]; **strong, moderate**)
> "In the setting of leukopenia, attempts should be made to continue the use of valganciclovir or ganciclovir. Options include consideration of interventions such as the use of granulocyte colony-stimulating factor and/or adjusting other myelosuppressive therapies. We do not recommend reducing the dose of valganciclovir or ganciclovir based on leukopenia alone"
Narrative ([P189]): "Instead of reducing antiviral doses, discontinuation of other myelosuppressive therapies should be tried. The use of colony-stimulating factors has been shown to be safe and could be considered."

**7.2 Drug levels and leukopenia** ([P62]; no grade): "high concentrations of ganciclovir are associated with higher grades of leukopenia." Prolonged prophylaxis: "Long courses of prophylaxis with valganciclovir are associated with higher rates of leukopenia and greater cost." ([P66])

**7.3 No numeric neutropenia threshold** (ANC value for stopping, holding or adding G-CSF) is given in the adult text.

**7.4 Foscarnet** ([P186]): "drug-induced nephrotoxicity risk and tolerance must be considered when introducing foscarnet." ([P261]): "A higher genetic barrier to drug resistance offsets a higher incidence of limiting toxicity".

**7.5 Letermovir** interaction statements: see 6.7 ([P65]). Valacyclovir: "poor tolerability due to neuropsychiatric side effects" ([P63]); valacyclovir is a prevention alternative only in kidney, not a treatment drug.

**7.6 Renal elimination** ([P193]): "kidney clearance is the main route of ganciclovir elimination."

## 8. Disposition, admission, outpatient treatment

The adult text gives only this, and it is a preference for the oral route, not an admission rule:
> "valganciclovir is preferred when feasible due to its oral formulation, which may reduce or prevent hospital stays" (Initial Treatment [P185]; no grade)
Mild-to-moderate disease treated with oral valganciclovir in patients "who can tolerate and adhere to oral medication" ([P196], strong, moderate). IV ganciclovir is recommended in "life-threatening and severe diseases" ([P197], strong, low) and preferred for "sight-threatening" disease ([P185]). Preemptive therapy "can be difficult to coordinate" ([P75]).
No statement on who to admit, observation, ED discharge, follow-up interval, or transplant-center contact was found.

---

## Not stated in this guideline (do not invent)

1. Admission or discharge criteria, or which patients may be treated as outpatients. Only the oral-vs-IV preference in Section 8.
2. A definition of "mild to moderate" vs "severe" vs "life-threatening" CMV disease.
3. Symptom or sign lists for CMV syndrome, GI disease (colitis, esophagitis), hepatitis, pneumonitis or retinitis; typical lab or imaging findings; the 2025 text does not define CMV syndrome at all.
4. Any viral-load number at which to treat that applies to all patients (explicitly none); any viral-load value that distinguishes infection from disease.
5. Empiric treatment before a result returns, or when to start treatment in the ED on clinical suspicion.
6. Which tests to send from the ED; turnaround; whether a negative blood viral load excludes tissue-invasive disease (only that it can be low or undetectable in GI and lung disease).
7. Doses of maribavir, foscarnet, cidofovir, letermovir for treatment, IVIG or CMVIG; the first-line dose only in normal kidney function and per Table 5 renal bands (any eGFR/dialysis dosing beyond Table 5 is not stated).
8. A specific neutropenia (ANC) or platelet threshold for acting on valganciclovir/ganciclovir toxicity.
9. How much or which immunosuppressant to reduce, or what to do if rejection coexists (the recommendation is conditioned on "without concomitant rejection").
10. Management of a patient with symptoms who is currently on prophylaxis (only that breakthrough is uncommon and that under-dosing is a risk).
11. Whether a patient presenting after prophylaxis ended should be tested at a given interval beyond "weekly for 8–12 wk".
12. Other drug interactions (e.g., ganciclovir with mycophenolate) beyond "adjusting other myelosuppressive therapies"; CMV in a patient with CNI toxicity concerns.
13. Fever work-up or differential diagnosis of fever in the transplant recipient (retinitis differential only).
14. Letermovir dose.

## Changes from the 2018 edition (3rd), limited to items above

(2018 quotes are from the Wayne State PDF text copy; "3rd PDF p.N" is the PDF page.)

1. **Definition of syndrome.** 2018 (3rd PDF p.2) defined it: "CMV disease can be further categorized as a viral syndrome (ie, fever, malaise, leukopenia, and/or thrombocytopenia), or as tissue invasive (“end organ”) disease." The 2025 text drops this symptom list and says only "end-organ disease" and "CMV syndrome" (Introduction [P5]).
2. **Resistance suspicion.** 2018 (3rd PDF p.16): "prior cumulative (val)ganciclovir exposure that exceeds 6 weeks ... or development of CMV DNAemia during prophylaxis". 2025 [P202]: "exceeds 4 wk" and the "DNAemia during prophylaxis" clause is not in the statement.
3. **Adjunctive immunoglobulin.** 2018 (3rd PDF p.16): "Adjunctive immunoglobulin therapy is not routinely recommended (strong, low)." 2025 [P203]: "not routinely recommended but may be considered for patients with severe disease, resistant/refractory CMV disease, antiviral drug intolerance, and/or if IgG levels are <400 mg/dL ... (weak, low)."
4. **Leukopenia.** 2018 (3rd PDF p.16): "changing (val)ganciclovir to another agent is not recommended before the addition of granulocyte colony stimulating factor and/or discontinuation of other myelosuppressive therapies (strong, low)". 2025 [P209]: continue the drug; "We do not recommend reducing the dose ... based on leukopenia alone (strong, moderate)".
5. **Second-line drugs.** 2018 (3rd PDF p.16): "foscarnet (FOS) is the recommended second-line agent (strong, very low)". 2025 [P210]: "maribavir or foscarnet are recommended second-line treatments (strong, low)"; maribavir as principal alternative in resistance [P260] (strong, high); letermovir explicitly not for treatment [P186], [P200].
6. **Sight-threatening disease.** 2018 (3rd PDF p.15) preferred IV ganciclovir for "life-threatening CMV disease"; 2025 [P185] adds "or sight-threatening".
7. **Kidney function wording.** 2018 "frequent monitoring of renal function"; 2025 [P206] specifies "nonnormalized GFR, such as Cockcroft-Gault formula ie, mL/min", and 2025 [P194] adds a discussion on CKD-EPI vs Cockcroft-Gault. Dosing table content unchanged.
8. **Treatment-stopping wording.** 2018: eradication "(LLOQ < 200 IU/mL) on 1 or 2 consecutive weekly samples"; 2025 [P211]: "institutional, laboratory-specific, threshold" with the LLOQ <200 single-sample or 2 consecutive weekly samples with less sensitive assays.
9. **Monitoring specimen during treatment.** 2018 (3rd PDF p.16): "weekly plasma CMV DNA testing"; 2025 [P205]: "weekly CMV DNAemia testing" (plasma or whole blood; single specimen type).
10. **Preemptive monitoring duration.** 2018 (3rd PDF p.14): "at least once weekly for 3 to 4 months"; 2025 [P120]: "12–16 wk".
11. **Routine monitoring on prophylaxis.** 2018 (3rd PDF p.14) "strong, moderate"; 2025 [P97] "strong, moderate" (unchanged).
12. **Letermovir prophylaxis.** New in 2025 for kidney D+/R– (Table 3 and [P99]); not in 2018 Table 6 (3rd PDF p.13).
13. **R+ lung prophylaxis.** 2018 Table 6: "Minimum 6 months"; 2025 Table 3 and [P119]: 6–12 mo.
14. **Low-dose valganciclovir.** Both editions recommend against routine use (2025 [P129] weak, low; 2018 text "We do not recommend the routine use of low-dose VGCV" at 3rd PDF p.15).
15. **Refractory/resistant disease.** 2018 had a management algorithm graded "strong, low / moderate, low / weak, low" (3rd PDF p.20); 2025 has explicit graded statements [P255]-[P262] and an FDA-approved maribavir discussion ([P246]).
16. **Table 3 (2025) vs Table 6 (2018) islet, pancreas:** same text for islet and pancreas D+/R– durations. Dosing Table 5 (2025) equals Table 7 (2018).

(Items unchanged between editions and verified: first-line VGCV 900 mg q12h / IV GCV 5 mg/kg q12h "(strong, moderate)"; oral VGCV for mild-moderate, IV GCV for life-threatening/severe "(strong, low)"; oral GCV/acyclovir/valacyclovir not for treatment; immunosuppression reduction "(weak, very low)"; minimum 2 wk treatment; do not change agent in first 2 wk if improving; dose reduction only for worsening renal function "(strong, low)"; secondary prophylaxis not routine "(weak, low)".)

---

## Ambiguities or internal inconsistencies in the 2025 text

1. **Cumulative-exposure threshold for resistance.** [P202]/[P225]/[P255] use "4 wk", yet [P225] also says "ganciclovir resistance usually takes >6 wk of cumulative exposure" and Figure 5 footnote 2 says "GCV resistance is rare with drug exposure of <6 wk."
2. **Refractory definition.** [P221] first sentence: "plasma viral load that persists or increases by ≥1 log10" (garbled), while Figure 5 footnote 1 and the maribavir trial definition use "≤1 log10 decrease"/"failure to achieve >1-log10 decrease"; [P14] says "unchanged or increase".
3. **Secondary prophylaxis duration.** [P192] "1–3 mo" vs [P128]/[P213] "8–12 wk".
4. **Maribavir recommendation scope.** [P210] puts maribavir as second line for intolerance (strong, low); [P260] as principal alternative for resistance (strong, high); [P246] says FDA approval is for "treatment-refractory CMV infection"; [P186] cites cost and availability. Uncertainty about intolerance vs resistance indication for a patient not yet genotyped.
5. **GRADE terminology** reversed in Introduction [P2] (see top).
6. **Letermovir statement [P200]** is ungraded, though adjacent ones carry grades.
7. **Plasma vs whole blood:** [P14] says most favor plasma and that persistent plasma DNAemia better predicts ongoing infection; [P38] grades either as "strong, high".
8. **Table 3 islet** D+/R– is "Intermediate" risk while other D+/R– organs are "High".
9. **Table 3 liver:** footnote says VGCV is "approved by the EMA but not the FDA in liver transplants" yet VGCV is the recommended agent; FDA-label status is not verified here.
10. **Figure 5 not read**, so any dose or algorithm shown only in the flowchart body is not captured.
