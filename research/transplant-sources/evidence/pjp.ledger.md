# Pneumocystis pneumonia (PJP/PCP) in adult solid organ recipients: evidence ledger

Built ledger-first from the saved documents only. The transplant-specific infectious-disease chapter on Pneumocystis (AST IDCOP 2019, e13587) and the ECIL PJP guideline were NOT obtainable (ACQUISITION-2026-11-21.md). Nothing below comes from outside knowledge. Compiled 2026-11-21.

## How to read the rows

- One claim per row, 25 words or fewer, with a verbatim QUOTE (line-break hyphens, ligatures, Unicode hyphens and the text-layer artifacts "PaO 2" and "NA T" normalised; "..." marks an omission). The claim keeps the source verb.
- **SOURCE keys:** KDIGO = KDIGO kidney transplant recipient guideline, Am J Transplant 2009 (PDF page = printed S-page + 13). ISHLT-H = ISHLT heart recipient guideline, J Heart Lung Transplant 2023 (PDF page = printed e-page). AASLD-NG = AASLD/AST adult liver transplantation guideline, non-graft complications, 2025 (HTML; locator = Question/section). AST-PNA = AST IDCOP pneumonia in SOT 2019 (PMC7162188; HTML; locator = section). ISHLT-L07 = Stewart 2007 lung rejection nomenclature. ZHONG = Zhong 2018 ED review (REVIEW). Labels = FDA SPL in dailymed/ (indication and Pneumocystis statements only; no treatment doses are copied).
- **GRADE** as printed. KDIGO Level 1/2, A to D. ISHLT Class and Level of Evidence. AASLD (Strong/Weak, Level n). AST-PNA (strong/weak, quality). "label" = FDA label. "rationale" = narrative, ungraded.
- **TAG:** NODE | OVERLAY | TEAM | DOSE. **IS** = the row names reducing, holding, stopping or changing an immunosuppressant (index at the end).
- Boxes and tables (KDIGO 14.2 box p S60, Table 17 p S61, ISHLT e22 table, ISHLT e91 table) were read from rendered page images. HTML and label sources were read from text.
- Population: adults unless stated. IDSA-style general documents are not used here; the labels are general-population documents and are tagged so.

## 1. KDIGO 2009 (kidney)

**J1** | TAG: NODE, TEAM | TIER: GUIDELINE | IS: yes
- CLAIM: KDIGO recommends high-dose IV TMP-SMX, corticosteroids and reduced immunosuppression for PCP diagnosed by lavage or lung biopsy.
- QUOTE: "We recommend that KTRs with PCP diagnosed by bronchial alveolar lavage and/or lung biopsy be treated with high-dose intravenous trimethoprim-sulfamethoxazole, corticosteroids, and a reduction in immunosuppressive medication."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: rec 14.2.3, PDF 73 (S60) | GRADE: 1C | POPULATION: kidney; adult and paediatric; transplant
- NOTE: The diagnostic condition is part of the recommendation. Who reduces immunosuppression is not stated.

**J2** | TAG: NODE | TIER: GUIDELINE
- CLAIM: KDIGO recommends corticosteroids for moderate to severe PCP, defined as PaO2 below 70 mm Hg on room air or alveolar gradient above 35 mm Hg.
- QUOTE: "We recommend treatment with corticosteroids for KTRs with moderate to severe PCP (as defined by PaO2 <70 mm Hg in room air or an alveolar gradient of >35 mm Hg)."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: rec 14.2.4, PDF 73 (S60) | GRADE: 1C | POPULATION: kidney; transplant
- NOTE: 14.2.3 names corticosteroids without a threshold; 14.2.4 sets the threshold. The guideline does not reconcile the two. No steroid dose is given. The rationale says corticosteroids are for "significant hypoxemia".

**J3** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO's rationale: steroid use is based on data from HIV-infected adults.
- QUOTE: "Based upon data from HIV-infected adults, the use of corticosteroids has been uniformly recommended for all patients experiencing moderate to severe PCP."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 Rationale, PDF 73 (S60) | GRADE: rationale, ungraded | POPULATION: kidney; evidence base is HIV

**J4** | TAG: NODE | TIER: GUIDELINE
- CLAIM: KDIGO: no imaging pattern is specific for PCP, so diagnosis must be confirmed by lung biopsy or bronchoalveolar lavage.
- QUOTE: "Because no specific diagnostic pattern exists on any given imaging test, it is imperative that the diagnosis of PCP be confirmed by lung biopsy or bronchoalveolar lavage."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 Background, PDF 73 (S60) | GRADE: background, ungraded | POPULATION: kidney; transplant

**J5** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO: definitive diagnosis is organisms shown in lung tissue or lower respiratory tract secretions.
- QUOTE: "A definitive diagnosis of PCP is made by demonstration of organisms in lung tissue or lower respiratory tract secretions."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 Background, PDF 73 (S60) | GRADE: background, ungraded | POPULATION: kidney; transplant

**J6** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO: symptoms of PCP most typically begin 6 to 8 weeks after immunosuppressive therapy is started.
- QUOTE: "The most typical time of onset of symptoms of PCP is 6-8 weeks following initiation of immunosuppressive therapy."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 PCP prophylaxis text, PDF 73 (S60) | GRADE: rationale, ungraded | POPULATION: kidney; transplant

**J7** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO: IV pentamidine should be considered in proven TMP-SMX allergy; usual treatment duration is 2 to 3 weeks.
- QUOTE: "The usual duration of treatment is 2-3 weeks. The use of intravenous pentamidine isethionate should be considered in patients with proven trimethoprim-sulfamethoxazole allergy."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 PCP treatment, PDF 73 (S60) | GRADE: rationale, ungraded | POPULATION: kidney; transplant

**J8** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO: treatment strategies other than IV TMP-SMX should be restricted to mild PCP only.
- QUOTE: "Other treatment strategies should be restricted to patients with mild PCP only."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 PCP treatment, PDF 73 (S60) | GRADE: rationale, ungraded | POPULATION: kidney; transplant

**J9** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO recommends daily TMP-SMX prophylaxis for all kidney recipients for 3 to 6 months after transplant.
- QUOTE: "We recommend that all KTRs receive PCP prophylaxis with daily trimethoprim-sulfamethoxazole for 3-6 months after transplantation."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: rec 14.2.1, PDF 73 (S60) | GRADE: 1B | POPULATION: kidney; transplant
- NOTE: Duration differs from newer heart and liver documents; see SOURCES DIFFER.

**J10** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO suggests daily TMP-SMX prophylaxis for at least 6 weeks during and after treatment for acute rejection.
- QUOTE: "We suggest that all KTRs receive PCP prophylaxis with daily trimethoprim-sulfamethoxazole for at least 6 weeks during and after treatment for acute rejection."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: rec 14.2.2, PDF 73 (S60) | GRADE: 2C | POPULATION: kidney; transplant

**J11** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO: allergy or drug-induced neutropenia from TMP-SMX are indications for alternative prophylaxis (dapsone, aerosolized pentamidine, atovaquone, clindamycin plus pyrimethamine).
- QUOTE: "Indications for the use of alternative preventive agents include the development of allergic reactions and/or drug-induced neutropenia from trimethoprim-sulfamethoxazole."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 PCP prophylaxis, PDF 73 (S60) | GRADE: rationale, ungraded | POPULATION: kidney; transplant

**J12** | TAG: OVERLAY, DOSE | TIER: GUIDELINE
- CLAIM: KDIGO Table 17 (adults): TMP-SMX single-strength (80 mg trimethoprim) or double-strength (160 mg trimethoprim) tablet, daily or three times a week; prophylaxis dose only.
- QUOTE: "Single-strength pill (80 mg as trimethoprim) or double-strength pill (160 mg as trimethoprim) daily or three times per week"
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Table 17, PDF 74 (S61) | GRADE: table, ungraded | POPULATION: kidney; adult; transplant
- NOTE: Read from the page image. Footnote b: TMP-SMX "is first-line therapy. All other agents should be considered second-line therapy." Prophylaxis dose only, not a treatment dose.

**J13** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO Table 17: screen for G6PD deficiency before using dapsone.
- QUOTE: "Must screen for glucose 6-phosphate dehydrogenase deficiency prior to using dapsone"
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Table 17 footnote c, PDF 74 (S61) | GRADE: table, ungraded | POPULATION: kidney; transplant

**J14** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO: kidney recipients given ciprofloxacin for UTI prophylaxis developed Pneumocystis pneumonia.
- QUOTE: "patients treated with this regimen were at risk for, and developed Pneumocystis jirovecii pneumonia (PCP)"
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 UTI rationale, PDF 72 (S59) | GRADE: rationale, ungraded | POPULATION: kidney; transplant

## 2. ISHLT 2023 heart

**J15** | TAG: NODE | TIER: GUIDELINE
- CLAIM: ISHLT: TMP-SMX is the preferred agent for Pneumocystis prophylaxis in heart recipients.
- QUOTE: "The preferred agent for prophylaxis against Pneumocystis jiroveci is trimethoprim-sulfamethoxazole."
- SOURCE: ISHLT-H | YEAR: 2023 | LOCATOR: Topic 4 early postoperative table, PDF 22 (e22) | GRADE: Class I, Level of Evidence A | POPULATION: heart; adult and paediatric; transplant

**J16** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: ISHLT: for those intolerant of TMP-SMX, alternatives include dapsone, atovaquone, clindamycin, pyrimethamine and inhaled pentamidine.
- QUOTE: "intolerant of trimethoprim-sulfamethoxazole include, dapsone, atovaquone, clindamycin, pyrimethamine, and inhaled pentamidine"
- SOURCE: ISHLT-H | YEAR: 2023 | LOCATOR: Topic 4 table, PDF 22 (e22) | GRADE: Class I, Level of Evidence B | POPULATION: heart; transplant

**J17** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: ISHLT: Pneumocystis prophylaxis is recommended for at least 6 to 12 months after heart transplant.
- QUOTE: "Prophylaxis against Pneumocystis jiroveci is recommended for at least 6-12 months following heart transplant."
- SOURCE: ISHLT-H | YEAR: 2023 | LOCATOR: Topic 4 table, PDF 22 (e22) | GRADE: Class I, Level of Evidence B | POPULATION: heart; population not stated in the row
- NOTE: Population not stated in the row (adult and paediatric heart). The 2010 table row said "minimum of 3 months up to a maximum of 24 months" (Class IIb, C) and the 2023 table row replaces it, but the 2023 paediatric text (J58) still prints 3 to 24 months.

**J18** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: ISHLT: PJP risk is highest in the first 6 months, and prolonged high-dose corticosteroids may add risk.
- QUOTE: "The risk of Pneumocystis jiroveci (PJP) infection is highest within the first 6 months of transplant, but certain risk factors, including prolonged use of high-dose corticosteroids (CS), may augment the risk of PJP."
- SOURCE: ISHLT-H | YEAR: 2023 | LOCATOR: Perioperative infection prophylaxis text, PDF 16 (e16) | GRADE: background, ungraded | POPULATION: heart; transplant

**J19** | TAG: OVERLAY | TIER: PAEDIATRIC
- CLAIM: ISHLT (paediatric text): most PJP in paediatric heart recipients occurs in the first 2 years after transplant.
- QUOTE: "Most cases of PJP among pediatric heart transplant recipients occur within the first 2 years of transplant."
- SOURCE: ISHLT-H | YEAR: 2023 | LOCATOR: pediatric prophylaxis text, PDF 16 (e16) | GRADE: background, ungraded | POPULATION: heart; paediatric; transplant

**J20** | TAG: NODE, TEAM | TIER: GUIDELINE
- CLAIM: ISHLT 2023 (Class I, C): transplant centre should educate local clinicians to inform it of added antimicrobials (2) and respiratory infection (10).
- QUOTE: "The transplant center should collaborate with local health professionals and educate them to inform the transplant center in the case of the following events: (1) hospitalization for any reason; (2) change in medication, including the addition of any antibiotic, anti-fungal, or anti- viral therapy for confirmed or presumed infection ... (10) pneumonia or any respiratory infection"
- SOURCE: ISHLT-H | YEAR: 2023 | LOCATOR: Topic 1 follow-up table, PDF 91 (e91) | GRADE: Class I, Level of Evidence C | POPULATION: heart; adult and paediatric; transplant
- NOTE: One list of 18 items; it also names fever, increased shortness of breath and hospitalization. It is an instruction to the transplant centre about educating local clinicians, not an ED order. Read from the page image.

## 3. AASLD/AST 2025 liver

**J21** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: AASLD/AST: liver recipients should continue PJP prophylaxis for 6 months with TMP-SMX or atovaquone.
- QUOTE: "In liver transplant recipients, prophylaxis of Pneumocystis jiroveci pneumonia should be continued for 6 months post-transplant with trimethoprim-sulfamethoxazole or atovaquone (Strong, Level 2)."
- SOURCE: AASLD-NG | YEAR: 2025 | LOCATOR: Question 8 statements | GRADE: Strong, Level 2 | POPULATION: liver; adult; transplant

**J22** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: AASLD/AST: opportunistic infections including PJP typically occur 1 to 12 months after liver transplant.
- QUOTE: "opportunistic infections like cytomegalovirus, Pneumocystis jiroveci pneumonia (PJP), and tuberculosis occur from 1 to 12 months post-LT"
- SOURCE: AASLD-NG | YEAR: 2025 | LOCATOR: Question 8 rationale (Figure 2) | GRADE: rationale, ungraded | POPULATION: liver; adult; transplant

## 4. AST IDCOP pneumonia chapter 2019 (all organs)

**J23** | TAG: NODE | TIER: GUIDELINE
- CLAIM: AST IDCOP: diffuse bilateral infiltrates suggest CMV, respiratory viruses, Mycoplasma, Legionella and Pneumocystis.
- QUOTE: "Diffuse, bilateral infiltrates suggest a range of etiologies including CMV, respiratory viruses, Mycoplasma, Legionella, and Pneumocystis jirovecii (PJP)."
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 3 Differential diagnosis | GRADE: ungraded | POPULATION: all SOT; adult and paediatric; transplant

**J24** | TAG: NODE | TIER: GUIDELINE
- CLAIM: AST IDCOP: a ground-glass or mixed ground-glass and micronodular infiltrate raises concern for PJP and CMV.
- QUOTE: "Ground glass or mixed ground glass/micronodular infiltrate raises concern for PJP and CMV."
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 3 | GRADE: ungraded | POPULATION: all SOT; transplant

**J25** | TAG: NODE | TIER: GUIDELINE
- CLAIM: AST IDCOP recommends a chest X-ray for all transplant patients with suspected pneumonia.
- QUOTE: "A chest X-ray should be performed in all SOT patients with suspected pneumonia (strong, moderate)."
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 4, initial evaluation | GRADE: strong, moderate | POPULATION: all SOT; adult and paediatric; transplant

**J26** | TAG: NODE | TIER: GUIDELINE
- CLAIM: AST IDCOP recommends chest CT in the initial evaluation of pneumonia when acuity or net immunosuppression is high.
- QUOTE: "Performance of a chest CT scan in the initial evaluation for pneumonia is recommended in settings of high acuity or high net state of immunosuppression (weak, low)."
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 4, initial evaluation | GRADE: weak, low | POPULATION: all SOT; transplant

**J27** | TAG: NODE | TIER: GUIDELINE
- CLAIM: AST IDCOP recommends against current pneumonia severity scores in transplant recipients.
- QUOTE: "We recommend against using current pneumonia severity scores in SOT recipients with pneumonia (strong, very low)."
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 4 | GRADE: strong, very low | POPULATION: all SOT; transplant

**J28** | TAG: NODE | TIER: GUIDELINE
- CLAIM: AST IDCOP does not recommend the 1,3-beta-D-glucan test in transplant recipients for now.
- QUOTE: "Given the paucity of data evaluating utility of 1,3β-d-glucan, we do not recommend the use of this test currently in SOT recipients (strong, very low)"
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 4, fungal biomarkers | GRADE: strong, very low | POPULATION: all SOT; transplant
- NOTE: Chapter text also says blood galactomannan and 1,3-beta-D-glucan "have poor performance characteristics in SOT recipients as compared with HSCT recipients". Not specific to Pneumocystis.

**J29** | TAG: TEAM | TIER: GUIDELINE
- CLAIM: AST IDCOP: lavage fluid testing should include PJP stains or nucleic-acid testing, especially if the patient is off TMP-SMX prophylaxis.
- QUOTE: "Diagnostic testing including PJP-directed stains or nucleic acid-based testing for PJP from BAL fluid (strong, high), in particular in patients either no longer receiving prophylaxis or on non-TMP-SMX prophylaxis"
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 4, BAL fluid evaluation | GRADE: strong, high | POPULATION: all SOT; transplant

**J30** | TAG: TEAM | TIER: GUIDELINE
- CLAIM: AST IDCOP recommends BAL for infiltrates that fail to improve on empiric antibacterial therapy with no diagnosis from non-invasive tests.
- QUOTE: "We recommend the performance of BAL in the setting of diffuse or focal pulmonary infiltrate in patients with failure to improve on empiric antibacterial therapy in whom diagnosis has not been reached by non-invasive testing (strong, moderate)."
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 4 | GRADE: strong, moderate | POPULATION: all SOT; transplant

**J31** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: AST IDCOP: physicians should have a low threshold for procedural evaluation when the patient is not improving, highly immunocompromised, or the diagnosis is uncertain.
- QUOTE: "Physicians caring for an SOT recipient with pneumonia should have a low threshold for procedural evaluation especially in settings in which patients are not improving, are highly immunocompromised, or the diagnosis remains uncertain (strong, moderate)."
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 4 | GRADE: strong, moderate | POPULATION: all SOT; transplant

**J32** | TAG: NODE | TIER: GUIDELINE
- CLAIM: AST IDCOP: most empiric pneumonia regimens will not optimally treat Nocardia or Pneumocystis.
- QUOTE: "Most empiric regimens will not optimally treat Nocardia spp or Pneumocystis jirovecii."
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 5 Empiric initial treatment | GRADE: ungraded | POPULATION: all SOT; transplant

**J33** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: AST IDCOP: go to second-tier evaluation if no improvement in 24 to 48 hours of empiric therapy or deterioration, and no diagnosis after first tier.
- QUOTE: "Clinicians should progress to the second tier of evaluation (Figure 1) if, despite empiric therapy, the clinical situation does not improve in the first 24 to 48 hours or deteriorates and no diagnosis was made following the first tier of diagnostic evaluation"
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 4 | GRADE: ungraded | POPULATION: all SOT; transplant

**J34** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: AST IDCOP: for outpatient pneumonia care, inpatient management should be favoured if close monitoring is not feasible or doubts remain.
- QUOTE: "If this is not feasible or if any doubts prevail, inpatient management should be favored."
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 5 | GRADE: ungraded | POPULATION: all SOT; transplant
- NOTE: "this" is close monitoring including repeated clinical evaluation, which the chapter calls "a prerequisite for any outpatient approach". Pneumonia in general, not PJP.

**J35** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: ISHLT 2007 lung pathology: Pneumocystis can exactly mimic acute rejection on biopsy but can also give atypical reactions.
- QUOTE: "Although pneumocystis can exactly mimic acute rejection with perivascular and interstitial infiltrates, it can also manifest atypical histologic reactions"
- SOURCE: ISHLT-L07 | YEAR: 2007 | LOCATOR: Differential diagnosis of perivascular and interstitial infiltrates, PDF 12 (p 1239) | GRADE: ungraded | POPULATION: lung; transplant; histology consensus

## 5. Zhong 2018 ED review

**J36** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: ED review: most recipients receive PJP prophylaxis such as TMP-SMX, dapsone or inhaled pentamidine.
- QUOTE: "Most patients receive antimicrobial prophylaxis against Pneumocystis jirovecii pneumonia (PJP) (e.g., trimethoprim/sulfamethoxazole, dapsone, or inhaled pentamidine)"
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Timeline of infection, early period | GRADE: ungraded | POPULATION: SOT and HCT together; adult; transplant

**J37** | TAG: NODE | TIER: REVIEW
- CLAIM: ED review: emergency physicians should have a low threshold for chest CT in pulmonary complaints with increased risk of opportunistic infection.
- QUOTE: "In patients with pulmonary complaints and increased risk for invasive pulmonary aspergillosis or other OIs, emergency physicians should have a low threshold for obtaining a CT of the chest."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Diagnostic evaluation | GRADE: ungraded | POPULATION: SOT and HCT; transplant

**J38** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: ED review lists PJP among opportunistic fungal infections of the intermediate period after transplant.
- QUOTE: "Opportunistic fungal infections during the intermediate period include Pneumocystis jiroveci pneumonia (PJP), Nocardia, Cryptococcus, Aspergillus, mucormycosis, Candida, and endemic fungi."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Timeline, intermediate period | GRADE: ungraded | POPULATION: SOT and HCT; transplant

**J39** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: ED review: in lung recipients pneumonia of the graft may occur without much cough, because of denervation and blunted cough reflex.
- QUOTE: "patients with pneumonia of their transplanted lungs may not develop a significant cough."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Presentation | GRADE: ungraded | POPULATION: lung recipients; transplant

## 6. FDA labels (indication and Pneumocystis statements only)

**J40** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Bactrim label: indicated for treatment of documented P. jirovecii pneumonia and prophylaxis in immunosuppressed people at increased risk.
- QUOTE: "For the treatment of documented Pneumocystis jirovecii pneumonia and for prophylaxis against P. jirovecii pneumonia in individuals who are immunosuppressed and considered to be at an increased risk of developing P. jirovecii pneumonia."
- SOURCE: Bactrim label (bactrim_f59d0c04.xml) | YEAR: current SPL | LOCATOR: Indications and Usage | GRADE: label | POPULATION: general (immunosuppressed); not transplant-specific

**J41** | TAG: NODE | TIER: LABEL
- CLAIM: Bactrim label: high-dose trimethoprim, as used for PJP, raises serum potassium in many patients; reversible.
- QUOTE: "High dosage of trimethoprim, as used in patients with P. jirovecii pneumonia, induces a progressive but reversible increase of serum potassium concentrations in a substantial number of patients."
- SOURCE: Bactrim label | YEAR: current SPL | LOCATOR: Warnings, electrolyte abnormalities | GRADE: label | POPULATION: general
- NOTE: Same paragraph: hyperkalemia risk with "renal insufficiency, or if drugs known to induce hyperkalemia are given concomitantly. Close monitoring of serum potassium is warranted in these patients."

**J42** | TAG: NODE | TIER: LABEL
- CLAIM: Bactrim label: severe symptomatic hyponatremia can occur, particularly when treating P. jirovecii pneumonia.
- QUOTE: "Severe and symptomatic hyponatremia can occur in patients receiving BACTRIM, particularly for the treatment of P. jirovecii pneumonia."
- SOURCE: Bactrim label | YEAR: current SPL | LOCATOR: Warnings, electrolyte abnormalities | GRADE: label | POPULATION: general

**J43** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Mepron (atovaquone) label: indicated for prevention of PCP, and acute oral treatment of mild-to-moderate PCP, in people who cannot tolerate TMP-SMX.
- QUOTE: "MEPRON oral suspension is indicated for the prevention of Pneumocystis jirovecii pneumonia (PCP) in adults and adolescents (aged 13 years and older) who cannot tolerate trimethoprim-sulfamethoxazole (TMP-SMX). ... MEPRON oral suspension is indicated for the acute oral treatment of mild-to-moderate PCP in adults and adolescents (aged 13 years and older) who cannot tolerate TMP-SMX."
- SOURCE: Mepron label (mepron_b426b6bf.xml) | YEAR: current SPL | LOCATOR: 1.1 and 1.2 | GRADE: label | POPULATION: general (adults and adolescents 13 and over)

**J44** | TAG: NODE | TIER: LABEL
- CLAIM: Mepron label: treatment of more severe PCP has not been studied.
- QUOTE: "Treatment of more severe episodes of PCP with MEPRON has not been studied."
- SOURCE: Mepron label | YEAR: current SPL | LOCATOR: 1.3 Limitations of Use | GRADE: label | POPULATION: general
- NOTE: Label: severe PCP is an alveolar-arterial gradient above 45 mm Hg ("(A-a)DO2 >45 mm Hg ... has not been studied"); mild-to-moderate is 45 mm Hg or less. KDIGO's "moderate to severe" starts at a gradient above 35 mm Hg (J2): overlapping, not equal, thresholds. Same paragraph: efficacy in people failing TMP-SMX "has also not been studied".

**J45** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Pentam label: IV pentamidine is indicated for treatment of Pneumocystis pneumonia.
- QUOTE: "Pentam 300 (pentamidine isethionate for injection) is indicated for the treatment of pneumonia due to Pneumocystis carinii."
- SOURCE: Pentam label (pentam_cc2b635e.xml) | YEAR: current SPL | LOCATOR: Indications and Usage | GRADE: label | POPULATION: general

**J46** | TAG: NODE | TIER: LABEL
- CLAIM: Pentam label: fatalities from severe hypotension, hypoglycaemia, pancreatitis and arrhythmias have been reported with IM or IV use.
- QUOTE: "Fatalities due to severe hypotension, hypoglycemia, acute pancreatitis and cardiac arrhythmias have been reported in patients treated with pentamidine isethionate, both by the IM and IV routes."
- SOURCE: Pentam label | YEAR: current SPL | LOCATOR: Warnings | GRADE: label | POPULATION: general

**J47** | TAG: OVERLAY | TIER: LABEL
- CLAIM: NebuPent label: inhaled pentamidine is indicated for prevention of PJP in high-risk HIV-infected patients.
- QUOTE: "NebuPent is indicated for the prevention of Pneumocystis jiroveci pneumonia (PJP) in high-risk, HIV-infected patients"
- SOURCE: NebuPent label (nebupent_e2ad9d3c.xml) | YEAR: current SPL | LOCATOR: Indications and Usage | GRADE: label | POPULATION: HIV-infected; not transplant
- NOTE: Transplant use is outside the label indication; KDIGO (J11) and ISHLT (J16) list inhaled pentamidine.

**J48** | TAG: NODE | TIER: LABEL
- CLAIM: NebuPent (inhaled pentamidine) label: use may alter the clinical and radiographic features of PJP and could cause an atypical presentation.
- QUOTE: "The use of NebuPent may alter the clinical and radiographic features of PJP and could result in an atypical presentation, including but not limited to mild disease or focal infection."
- SOURCE: NebuPent label | YEAR: current SPL | LOCATOR: Indications and Usage / Warnings | GRADE: label | POPULATION: HIV-infected; not transplant

**J49** | TAG: OVERLAY | TIER: LABEL
- CLAIM: NebuPent label: the prevention dose is insufficient to treat acute PJP.
- QUOTE: "The recommended dose of NebuPent for the prevention of PJP is insufficient to treat acute PJP."
- SOURCE: NebuPent label | YEAR: current SPL | LOCATOR: Indications and Usage | GRADE: label | POPULATION: HIV-infected; not transplant

**J50** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Dapsone (Sun) label lists dermatitis herpetiformis and leprosy as its indications; no Pneumocystis indication appears.
- QUOTE: "Dermatitis herpetiformis: (D.H.) Leprosy: All forms of leprosy except for cases of proven Dapsone resistance."
- SOURCE: Dapsone label (dapsone-sun_cb312185.xml) | YEAR: current SPL | LOCATOR: Indications and Usage | GRADE: label | POPULATION: general
- NOTE: Pneumocystis appears in this label only in a drug-interaction paragraph (J51). Dapsone prophylaxis is therefore guideline-supported (J11, J16) but off-label per this label.

**J51** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Dapsone label: one study in PCP patients found dapsone and trimethoprim levels both rose when given together.
- QUOTE: "demonstrated that the serum levels of Dapsone were increased by 40% and trimethoprim levels were increased by 48% when the drugs were administered concurrently."
- SOURCE: Dapsone label | YEAR: current SPL | LOCATOR: Precautions, drug interactions | GRADE: label | POPULATION: HIV-infected (AIDS) patients with PCP
- NOTE: The label's other study "demonstrated that there was not a significant drug interaction between Dapsone and trimethoprim". See SOURCES DIFFER.

## 7. Added after verification

**J52** | TAG: OVERLAY, DOSE | TIER: GUIDELINE
- CLAIM: KDIGO Table 17 (adults), second-line: inhaled pentamidine 300 mg every 3 to 4 weeks; dapsone 100 mg/day or 50 mg twice daily; atovaquone 1500 mg/day.
- QUOTE: "300 mg inhaled every 3-4 weeks ... 100 mg/day as a single dose or 50 mg twice a day ... 1500 mg/day"
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Table 17, PDF 74 (S61) | GRADE: table, ungraded | POPULATION: kidney; adult; transplant
- NOTE: Prophylaxis doses only. Table read from the page image; footnote b calls TMP-SMX first-line and all others second-line.

**J53** | TAG: TEAM | TIER: GUIDELINE | IS: yes
- CLAIM: KDIGO rationale: high-dose IV TMP-SMX and reduction of immunosuppression are the treatments of choice for PCP.
- QUOTE: "Treatment of PCP with high-dose, intravenous trimethoprim-sulfamethoxazole and reduction of immunosuppressive medications are the treatments of choice for PCP."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 Rationale, PDF 73 (S60) | GRADE: rationale, ungraded | POPULATION: kidney; transplant

**J54** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO UTI rationale: prophylactic TMP-SMX for 6 to 12 months after kidney transplant is warranted; preferred over ciprofloxacin at least the first 6 months.
- QUOTE: "prophylactic trimethoprim-sulfamethoxazole for 6-12 months following kidney transplantation is warranted ... the use of trimethoprim-sulfamethoxazole is preferred over ciprofloxacin at least during the first 6 months after transplantation."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 UTI rationale, PDF 72 (S59) | GRADE: rationale, ungraded | POPULATION: kidney; transplant

**J55** | TAG: OVERLAY, DOSE | TIER: GUIDELINE
- CLAIM: KDIGO: TMP-SMX prophylaxis worked equally given daily or three times per week.
- QUOTE: "There was no difference in efficacy for PCP when trimethoprim-sulfamethoxazole was given daily or three times per week"
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 PCP prophylaxis, PDF 73 (S60) | GRADE: rationale, ungraded | POPULATION: kidney; transplant

**J56** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO: most experts continue PCP prophylaxis at least 6 months, perhaps 1 year; some recommend longer or indefinite use.
- QUOTE: "most experts agree that it should be continued for at least 6 months (and perhaps as long as 1 year) following transplantation (406). Because most KTRs will remain on immunosuppression for the rest of their lives, some experts recommend a more prolonged and perhaps even indefinite use of PCP prophylaxis."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 PCP prophylaxis, PDF 73 (S60) | GRADE: rationale, ungraded | POPULATION: kidney; transplant

**J57** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO: RCTs in HIV patients showed benefit of corticosteroids started within the first 72 hours of PCP, including avoiding intubation.
- QUOTE: "RCTs have demonstrated that the use of corticosteroids in the first 72 hours of PCP in HIV patients resulted in improved outcome, including morbidity, mortality and avoidance of intubation"
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 14 PCP treatment, PDF 73 (S60) | GRADE: rationale, ungraded | POPULATION: kidney guideline; trial evidence in HIV

**J58** | TAG: OVERLAY | TIER: PAEDIATRIC
- CLAIM: ISHLT 2023 (paediatric text): Pneumocystis prophylaxis for a minimum of 3 months up to 24 months after heart transplant.
- QUOTE: "Prophylaxis for Pneumocystis jiroveci should be instituted for a minimum 3 months up to 24 months after HT."
- SOURCE: ISHLT-H | YEAR: 2023 | LOCATOR: pediatric perioperative prophylaxis text, PDF 16 (e16) | GRADE: background, ungraded | POPULATION: heart; paediatric; transplant

**J59** | TAG: NODE | TIER: GUIDELINE
- CLAIM: AST IDCOP: prophylaxis has markedly cut PJP in recipients, but late-onset and outbreak-associated infections remain a problem.
- QUOTE: "Though prophylaxis strategies have markedly decreased the occurrence of PJP in SOT recipients, late-onset 44 and outbreak-associated 45, 46 infections remain a problem."
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 3 Differential diagnosis | GRADE: ungraded | POPULATION: all SOT; transplant

**J60** | TAG: NODE | TIER: GUIDELINE
- CLAIM: AST IDCOP: for the slower-onset pathogens it lists, empiric therapy usually follows testing, but may be needed with high acuity or no procedure.
- QUOTE: "Clinicians caring for SOT recipients with subacute or chronic illness presentations which include pneumonia should consider pathogens such as Nocardia, tuberculosis, non-tuberculous mycobacteria, endemic fungi, and invasive molds. These pathogens require bronchoalveolar fluid or tissue testing for diagnosis and their treatment entails prolonged courses of antimicrobial regimens. Empiric therapy is usually not instituted prior to diagnostic testing or procedure. However, in unique situations of high acuity or inability to perform diagnostic procedures, empiric therapy for these pathogens may be needed."
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 5 Empiric initial treatment | GRADE: ungraded | POPULATION: all SOT; transplant
- NOTE: The pathogens named are Nocardia, tuberculosis, non-tuberculous mycobacteria, endemic fungi and invasive molds; Pneumocystis is not named in this passage. The passage is the chapter's nearest statement on empiric therapy and testing; it is not a PJP statement.

**J61** | TAG: OVERLAY | TIER: GUIDELINE | IS: yes
- CLAIM: AST IDCOP: mTOR inhibitor pneumonitis usually resolves when the mTOR inhibitor is stopped and may co-exist with PJP or respiratory viruses.
- QUOTE: "mTOR inhibitor-induced pneumonitis is an infrequent though potentially severe medication side effect that generally resolves with discontinuation of mTOR inhibitor therapy and may co-exist with infectious etiologies including PJP or community-acquired respiratory viruses."
- SOURCE: AST-PNA | YEAR: 2019 | LOCATOR: section 3 Differential diagnosis | GRADE: ungraded | POPULATION: all SOT; transplant

**J62** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: ED review: up to 40% of infections in transplant patients present without fever.
- QUOTE: "Up to 40% of infections in this population will present without a fever."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Presentation | GRADE: ungraded | POPULATION: SOT and HCT; infection; transplant

**J63** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: ED review: critically ill transplant patients should be admitted; for stable patients dispositions are best made with infectious disease and transplant specialists.
- QUOTE: "Critically-ill SOT and HCT patients should be admitted to the hospital for further resuscitation, antibiotic therapy, and diagnostic evaluation. The decision to admit a clinically stable patient can be more nuanced, and patient dispositions are best made in consultation with specialists in infectious diseases, transplantation medicine, and/or hematology/oncology as appropriate."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Disposition | GRADE: ungraded | POPULATION: SOT and HCT; infection generally; transplant
- NOTE: Review, framing only. The same section says pneumonia scores CURB-65 and PSI do not account for immunosuppression or transplantation.

**J64** | TAG: OVERLAY | TIER: REVIEW | IS: yes
- CLAIM: ED review: emergency physicians should have a lower threshold to admit transplant patients with serious infection for inpatient evaluation and management including adjustment of immunosuppression.
- QUOTE: "Therefore, emergency physicians should have a lower threshold to admit these patients for more specialized inpatient evaluation (e.g., bronchoscopy, fluid aspiration, tissue biopsy) and management, including adjustment of immunosuppression."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Conclusion | GRADE: ungraded | POPULATION: SOT and HCT; serious infection; transplant

**J65** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Sirolimus label: PCP prophylaxis should be given for 1 year after transplantation.
- QUOTE: "Cases of Pneumocystis carinii pneumonia have been reported in transplant patients not receiving antimicrobial prophylaxis. Therefore, antimicrobial prophylaxis for Pneumocystis carinii pneumonia should be administered for 1 year following transplantation."
- SOURCE: Sirolimus label (sirolimus_5908cd1a.xml) | YEAR: current SPL | LOCATOR: 5.14 Antimicrobial Prophylaxis | GRADE: label | POPULATION: renal transplant; sirolimus users

**J66** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Nulojix label: Pneumocystis prophylaxis is recommended after transplantation; no duration is given.
- QUOTE: "Prophylaxis for Pneumocystis jiroveci is recommended after transplantation."
- SOURCE: Nulojix label (nulojix_c16ac648.xml) | YEAR: current SPL | LOCATOR: 5.5 Other Serious Infections | GRADE: label | POPULATION: kidney; adult; belatacept-treated

**J67** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Zortress label: Pneumocystis and CMV prophylaxis are recommended in transplant recipients; no duration is given.
- QUOTE: "Antimicrobial prophylaxis for Pneumocystis jiroveci (carinii) pneumonia and prophylaxis for cytomegalovirus (CMV) is recommended in transplant recipients."
- SOURCE: Zortress label (zortress_e082a024.xml) | YEAR: current SPL | LOCATOR: Warnings, serious infections | GRADE: label | POPULATION: kidney, liver; everolimus-treated

**J68** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Afinitor (oncology label): consider PJP in the differential of mTOR inhibitor pneumonitis; give PJP prophylaxis when corticosteroids or other immunosuppressants are needed.
- QUOTE: "Consider opportunistic infections, such as pneumocystis jiroveci pneumonia (PJP) in the differential diagnosis."
- SOURCE: Afinitor label (afinitor_2150f73a.xml) | YEAR: current SPL | LOCATOR: Warnings, non-infectious pneumonitis | GRADE: label | POPULATION: oncology (everolimus); not transplant
- NOTE: The same section reads "Administer prophylaxis for PJP when concomitant use of corticosteroids or other immunosuppressive agents are required."

**J69** | TAG: NODE | TIER: LABEL
- CLAIM: Bactrim label, cyclosporine: avoid concurrent use; marked but reversible nephrotoxicity has been reported with coadministration in renal transplant recipients.
- QUOTE: "Avoid concurrent use ... There have been reports of marked but reversible nephrotoxicity with coadministration of BACTRIM and cyclosporine in renal transplant recipients."
- SOURCE: Bactrim label | YEAR: current SPL | LOCATOR: Drug interactions table | GRADE: label | POPULATION: renal transplant recipients on cyclosporine; label general

## Row index: statements naming reducing, holding, stopping or changing an immunosuppressant

J1 (reduction in immunosuppressive medication as part of PCP treatment, 1C); J53 (KDIGO rationale: reduction of immunosuppressive medications is a treatment of choice); J61 (mTOR inhibitor pneumonitis resolves on discontinuation; may co-exist with PJP); J64 (ED review: adjustment of immunosuppression with admission). J2, J3, J57 concern adding corticosteroids as PCP treatment (a drug added, not a change to the maintenance regimen). J18 names prolonged high-dose corticosteroids as a risk factor. No other saved source says how to adjust maintenance immunosuppression in PJP.

## SOURCES DIFFER

- **Duration of Pneumocystis prophylaxis, by source (organ-specific; none replaces another):**
  - KDIGO 2009, kidney: 3 to 6 months after transplantation (rec 14.2.1, 1B, J9); at least 6 weeks during and after treatment for acute rejection (14.2.2, 2C, J10); UTI rationale: TMP-SMX for 6 to 12 months is warranted (J54); PCP rationale: most experts at least 6 months and perhaps 1 year, some indefinite (J56).
  - ISHLT 2023, heart, table row, population not stated: at least 6 to 12 months (Class I, B, J17). ISHLT 2023 paediatric text: minimum 3 months up to 24 months (J58). The 2010 table row said 3 to 24 months (IIb, C).
  - AASLD/AST 2025, liver: 6 months with TMP-SMX or atovaquone (Strong, Level 2, J21).
  - Sirolimus label, renal: 1 year after transplantation (J65). Nulojix and Zortress labels: prophylaxis recommended, no duration (J66, J67).
  - Lung, pancreas, intestine: no duration in any saved source.
- **Atovaquone tier.** AASLD (J21) pairs atovaquone with TMP-SMX; KDIGO (J11) and ISHLT (J16) list it among alternatives; KDIGO Table 17 footnote b calls TMP-SMX first-line and all others second-line. Mepron label (J43, J44): prevention, and mild-to-moderate treatment only, in TMP-SMX intolerance.
- **Steroid thresholds.** KDIGO 14.2.3 (J1) names corticosteroids for PCP diagnosed by lavage or biopsy; 14.2.4 (J2) sets moderate to severe as PaO2 <70 mm Hg in room air or alveolar gradient >35 mm Hg (both 1C). The Mepron label calls a gradient >45 mm Hg severe disease not studied with atovaquone (J44). The thresholds overlap but are not equal.
- **How soon to get an invasive diagnosis.** KDIGO (J4): "imperative" that PCP be confirmed by biopsy or lavage. AST IDCOP pneumonia (J30, J31, J33): tiered approach, lavage if not improving or highly immunocompromised; for its listed slower-onset pathogens empiric therapy is usually not instituted before testing, with exceptions for high acuity (J60). Zhong (review, J37): low threshold for chest CT.
- **Dapsone with trimethoprim.** The dapsone label (J51) gives one study with levels up about 40 and 48 percent and another with no significant interaction.

## NOT IN THE SOURCES READ

1. **Empirical therapy for suspected PJP before a diagnosis.** Not in the guidelines read. Nearest sourced facts: J1 and J53 (KDIGO treatment recommendation, scoped to PCP diagnosed by lavage or biopsy), J60 (AST pneumonia chapter: empiric therapy usually not instituted before testing for its listed slower-onset pathogens, but may be needed with high acuity or inability to perform procedures; Pneumocystis is not named there), J32 (most empiric pneumonia regimens will not optimally treat Pneumocystis).
2. **Which ED tests suggest PJP (LDH, exertional desaturation, induced sputum).** Not stated. Nearest: J28 (1,3-beta-D-glucan not recommended in SOT), J29 (lavage stain or nucleic-acid testing), J5.
3. **Imaging pattern and when to image.** Nearest: J23, J24, J25, J26, J4; review J37.
4. **When to admit.** Not in the guidelines read for PJP. A review (emergency medicine, 2018) says critically ill transplant patients should be admitted, stable patients' dispositions are best made with infectious disease and transplant specialists, and there should be a lower threshold to admit serious infection, including for adjustment of immunosuppression (J63, J64). Nearest guideline facts: J34, J2, J20, J27.
5. **Oxygen, ventilation and ICU criteria.** Not covered. Nearest: J2, J57 (steroid trial evidence includes avoidance of intubation, in HIV).
6. **Corticosteroid dose and drug.** Not given in any saved guideline. Timing evidence: J57 (first 72 hours, HIV trials). Nearest: J2, J3.
7. **How to adjust maintenance immunosuppression in PJP (which drug, how much, who decides).** Nearest: J1, J53 (reduction is part of treatment), J20 (transplant centre educates local clinicians to inform it).
8. **TMP-SMX treatment dose in recipients.** KDIGO says "high-dose intravenous" with no number (J1). The Bactrim label has a general-population treatment regimen that was not copied.
9. **Monitoring on treatment-dose TMP-SMX in recipients.** KDIGO has no TMP-SMX monitoring text. Sourced: J41, J42 (Bactrim label potassium and sodium), J69 (Bactrim label: avoid concurrent cyclosporine; marked but reversible nephrotoxicity reported in renal transplant recipients), J11 (TMP-SMX neutropenia as a reason to switch prophylaxis).
10. **PJP despite prophylaxis.** Partly addressed: J59 (late-onset and outbreak-associated infections remain a problem), J29 (testing especially if off or on non-TMP-SMX prophylaxis), J18 (high-dose steroids add risk), J48 (NebuPent label, HIV), J6.
11. **Whether the patient should still be on prophylaxis now.** Organ and era specific; see SOURCES DIFFER.
12. **Lung, pancreas, intestinal and multi-organ recipients.** No guideline saved (lung: pathology only, J35). Nearest: J39 (review).
13. **Documents searched with no PJP content:** EASL 2024 liver transplantation guideline, AASLD/AST graft-related 2024, ISHLT lung CLAD/AMR/ALAD/BLAD/GAP, CMV consensus 2025, BK consensus 2024. No negative-test ("does not exclude") statement for PJP was found in any saved source.

## USE RULES

- J1 must not appear without J2, J4 and the 1C grade, and must keep "diagnosed by bronchial alveolar lavage and/or lung biopsy" as the guideline's own scope; it must not be written as "wait for proof". It is a kidney recommendation (2009). J1 must also state that the steroid threshold is in a separate 1C recommendation (J2).
- J2 must keep both thresholds with units and "moderate to severe"; J3 and J57 show the evidence base (HIV).
- J9, J17, J21, J54, J56, J58, J65 (durations) must never be merged or ranked; name organ, source and grade. KDIGO is older and organ-specific; no newer kidney guideline is saved.
- J40 to J51, J68, J69 are general-population, HIV or oncology FDA documents unless the row says transplant. J47 to J49 (NebuPent) are HIV-only. Never word as written for transplant recipients; J69 names renal transplant recipients because the label does.
- J43 must show J44 whenever atovaquone treatment is mentioned.
- J41 must show its monitoring sentence; J42 only with J41; J69 only with the cyclosporine qualifier "avoid concurrent use".
- J12 and J52, J55 are prophylaxis doses from 2009; never as treatment doses.
- J20 is shown as an instruction to the transplant centre about educating local clinicians, not a diagnostic criterion or ED order.
- J60 must keep its list of pathogens and must not be worded as a Pneumocystis statement.
- Zhong rows (J36 to J39, J62 to J64) are review framing only.

## SUFFICIENCY

A useful, honest ED page can be composed from GUIDELINE and LABEL rows, mostly about recognition, a diagnostic ladder and handoff, not an order set. It could say: PJP is a life-threatening opportunistic pneumonia, most typical 6 to 8 weeks after starting immunosuppression and highest in the first 6 months, but late-onset and outbreak cases occur and prolonged high-dose steroids add risk (J6, J18, J59); recipients are usually on TMP-SMX, with dapsone, atovaquone or inhaled pentamidine as alternatives, so ask which and whether it was stopped (J15, J16, J36); imaging is nonspecific (J4, J23, J24), a chest X-ray is recommended for all and CT when acuity or immunosuppression is high (J25, J26); diagnosis needs lavage stains or nucleic-acid testing, and most empiric pneumonia regimens do not cover it (J29, J32); once diagnosed, a kidney guideline recommends high-dose IV TMP-SMX, steroids for moderate to severe disease (PaO2 <70 mm Hg in room air or alveolar gradient >35 mm Hg) and reduced immunosuppression, the latter a transplant-team call (J1, J2, J53, J20); TMP-SMX label cautions on potassium, sodium and cyclosporine (J41, J42, J69). It would be unable to say what to start before a diagnosis, what dose or steroid regimen to use, when to admit or call ICU, how to adjust immunosuppression, which ED tests raise or lower suspicion, how PJP looks on prophylaxis or in lung, pancreas or intestinal recipients. Those gaps trace to the unobtainable AST PJP chapter and the absence of any ED guideline.
