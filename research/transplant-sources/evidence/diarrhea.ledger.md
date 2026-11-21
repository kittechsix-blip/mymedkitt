# Diarrhea in adult solid organ recipients: evidence ledger

Built ledger-first from the saved documents only. The transplant-specific AST IDCOP chapter on diarrhea (e13550) and the intestinal parasites chapter were NOT obtainable (ACQUISITION-2026-11-21.md). The two real guidelines saved on diarrhea (IDSA 2017 infectious diarrhea; IDSA/SHEA C. difficile 2017 and the 2021 update) are GENERAL-POPULATION documents. Transplant-specific content comes only from KDIGO 2009, ISHLT 2023 heart, the CMV consensus 2025, FDA labels, and reviews. Compiled 2026-11-21.

## How to read the rows

- One claim per row, 25 words or fewer; verbatim QUOTE (line-break hyphens, ligatures, Unicode hyphens normalised; "..." marks an omission); the claim keeps the source verb.
- **SOURCE keys:** KDIGO = KDIGO kidney transplant recipient guideline 2009 (PDF page = printed S-page + 13). ISHLT-H = ISHLT heart guideline 2023 (PDF page = printed e-page). CMV25 = Fourth International Consensus Guidelines on CMV in SOT, Transplantation 2025 (PMC12180710; HTML; locator = section). IDSA-D = Shane et al., IDSA 2017 infectious diarrhea guideline, Clin Infect Dis 2017 (PMC5850553; GENERAL population; locator = recommendation number). IDSA-CD17 = McDonald et al., IDSA/SHEA C. difficile guideline 2017 (PMC6018983; GENERAL; HTML). IDSA-CD21 = IDSA/SHEA 2021 focused update, recommendations on the IDSA site (ABRIDGED; GENERAL, adults). AASLD-G = AASLD/AST adult liver transplantation graft-related complications 2024 (HTML; table). ZHONG = Zhong 2018 ED review (REVIEW; SOT and HCT together). IATDMCT = Brunet et al., Therapeutic Drug Monitoring of Tacrolimus-Personalized Therapy: Second Consensus Report, Ther Drug Monit 2019 (consensus report; HTML; locator = section). CUREUS = Loucif et al., infectious diarrhea in kidney transplant recipients, Cureus 2025 (PMC12076263; single-centre retrospective cohort, hospitalised; carried in the REVIEW tier, framing only). Labels = FDA SPL in dailymed/.
- **GRADE** as printed. IDSA 2017 diarrhea: (strong/weak, evidence quality). IDSA/SHEA 2017: "strong/weak recommendation, quality of evidence". IDSA/SHEA 2021: conditional/strong with certainty. CMV25: (strong/weak, high/moderate/low). KDIGO "not graded" or rationale. ISHLT Class/Level. "label" = FDA label.
- **TAG:** NODE | OVERLAY | TEAM | DOSE. **IS** = names reducing, holding, stopping or changing an immunosuppressant (index at the end).
- Tables read from page images: KDIGO Table 2 (p S15), ISHLT e91 table. HTML and label sources were read from text. The IDSA/SHEA tables (HTML) were read from text.
- **General-population rule:** IDSA rows are tagged POPULATION=general. Never word them as if written for transplant recipients. What each says about immunocompromised hosts is recorded below.

## 1. KDIGO 2009 (kidney)

**D1** | TAG: NODE | TIER: GUIDELINE | IS: no
- CLAIM: KDIGO: diarrhea, nausea and vomiting may be caused or worsened by MMF and tacrolimus; monitoring drug levels may help reduce them.
- QUOTE: "Diarrhea, nausea and vomiting may be caused or exacerbated by MMF and tacrolimus. Monitoring MPA, AUC and tacrolimus C0 levels may help to reduce these complications."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 3 Rationale, PDF 28 (S15) | GRADE: rationale, ungraded | POPULATION: kidney; transplant
- NOTE: Ungraded narrative.

**D2** | TAG: NODE | TIER: GUIDELINE
- CLAIM: KDIGO: rule out treatable causes other than the immunosuppressant first; about half of patients in one study were cured by treating an infection.
- QUOTE: "it is important to rule out treatable, underlying causes other than the immunosuppressive medication. In a recent study, about half of the patients were cured by treatment of an infection"
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 3 Rationale, PDF 28 (S15) | GRADE: rationale, ungraded | POPULATION: kidney; transplant

**D3** | TAG: TEAM | TIER: GUIDELINE | IS: yes
- CLAIM: KDIGO: only after ruling out other causes should reducing MMF or changing MMF to azathioprine be considered.
- QUOTE: "Only after ruling out other underlying causes should reducing the MMF, or changing MMF to azathioprine, be considered."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 3 Rationale, PDF 28 (S15) | GRADE: rationale, ungraded | POPULATION: kidney; transplant
- NOTE: "Call the transplant team first" is a handoff added by the page, not a KDIGO statement.

**D4** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO Table 2 rates diarrhea, nausea and vomiting as moderate to severe with MMF and mild to moderate with tacrolimus.
- QUOTE: "Diarrhea, nausea/vomiting"
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Table 2, PDF 28 (S15) | GRADE: table, ungraded | POPULATION: kidney; transplant
- NOTE: Read from the page image: row arrows are double (moderate-severe) under MMF and single (mild-moderate) under Tac; none under steroids, CsA, mTORi or AZA. Key: one arrow "mild-moderate adverse effect", two arrows "moderate-severe".

**D5** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO rationale: MMF trials showed no significant difference in GI events such as diarrhea; there might be evidence that higher doses cause more.
- QUOTE: "There were no significant differences in patient survival, graft function, malignancy, NODAT, infection rates or gastrointestinal adverse events such as diarrhea, although there might be evidence that higher doses of MMF cause more diarrhea than lower doses of MMF."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 2 rationale, PDF 25 (S12) | GRADE: rationale, ungraded | POPULATION: kidney; transplant

**D6** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: KDIGO: EBV disease can present as nonspecific febrile illness, gastroenteritis or hepatitis, which may be attributable to CMV or other pathogens.
- QUOTE: "Epstein-Barr virus disease can present with varied manifestations, including nonspecific febrile illness, gastroenteritis, hepatitis and other manifestations that may be attributable to CMV or other pathogens."
- SOURCE: KDIGO | YEAR: 2009 | LOCATOR: Ch 13 EBV disease diagnosis, PDF 62 (S49) | GRADE: rationale, ungraded | POPULATION: kidney; transplant

## 2. ISHLT 2023 heart

**D7** | TAG: NODE, TEAM | TIER: GUIDELINE
- CLAIM: ISHLT 2023 (Class I, C): transplant centre should educate local clinicians to inform it of nausea, vomiting or diarrhea (item 15) and abdominal pain.
- QUOTE: "The transplant center should collaborate with local health professionals and educate them to inform the transplant center in the case of the following events: (1) hospitalization for any reason; ... (14) abdominal pain; (15) nausea, vomiting or diarrhea"
- SOURCE: ISHLT-H | YEAR: 2023 | LOCATOR: Topic 1 follow-up table, PDF 91 (e91) | GRADE: Class I, Level of Evidence C | POPULATION: heart; adult and paediatric; transplant
- NOTE: One list of 18 items, which also includes "(2) change in medication, including the addition of any antibiotic". An instruction to the transplant centre about educating local clinicians, not an ED order. Read from the page image.

**D8** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: ISHLT: more diarrhea, triglycerides, acne, rash and infection were seen in sirolimus-based, CNI-free regimens with higher sirolimus targets.
- QUOTE: "Higher incidences of adverse effects including increased triglycerides, acne, rash, diarrhea, and infection were observed in patients receiving SRL based CNI-free suppression"
- SOURCE: ISHLT-H | YEAR: 2023 | LOCATOR: mTOR inhibitor text, adult, PDF 39 (e39) | GRADE: background, ungraded | POPULATION: heart; adult; transplant

## 3. AASLD/AST 2024 liver (table)

**D9** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: AASLD/AST graft-related table lists gastrointestinal effects for everolimus (and azathioprine, corticosteroids) among adverse effects.
- QUOTE: "Gastrointestinal, leukopenia, hyperlipidemia, proteinuria, peripheral edema, wound healing complications"
- SOURCE: AASLD-G | YEAR: 2024 | LOCATOR: immunosuppressant table, everolimus row | GRADE: table, ungraded | POPULATION: liver; adult; transplant
- NOTE: The same table lists "Cytopenias, gastrointestinal infections, and teratogenicity" for mycophenolate. It names GI effects, not diarrhea, and gives no management.

## 4. CMV consensus 2025

**D10** | TAG: NODE | TIER: GUIDELINE
- CLAIM: CMV consensus: plasma CMV PCR is sensitive for GI disease in D+/R- patients but less so in R+, sometimes with low or undetectable DNAemia.
- QUOTE: "Plasma CMV-QNAT has a high sensitivity for diagnosing gastrointestinal disease in CMV (D+/R–) patients, but sensitivity can decrease in (R+) patients ... sometimes with low or undetectable CMV DNAemia."
- SOURCE: CMV25 | YEAR: 2025 | LOCATOR: Diagnostics for tissue-invasive disease | GRADE: narrative, ungraded | POPULATION: all SOT; adult; transplant

**D11** | TAG: NODE | TIER: GUIDELINE
- CLAIM: CMV consensus recommends histology with immunohistochemistry to diagnose tissue-invasive CMV disease.
- QUOTE: "We recommend histology coupled with immunohistochemistry for the diagnosis of tissue-invasive disease (strong, moderate)."
- SOURCE: CMV25 | YEAR: 2025 | LOCATOR: Diagnostics for tissue-invasive disease | GRADE: strong, moderate | POPULATION: all SOT; transplant

**D12** | TAG: NODE | TIER: GUIDELINE
- CLAIM: CMV consensus does not recommend CMV PCR on urine, stool or oral secretions for diagnosing CMV disease.
- QUOTE: "We do not recommend CMV-QNAT on urine, stool, or oral secretions for surveillance or diagnosis of CMV disease (strong, low)."
- SOURCE: CMV25 | YEAR: 2025 | LOCATOR: Diagnostics for tissue-invasive disease | GRADE: strong, low | POPULATION: all SOT; transplant

**D13** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: CMV consensus 2025: IV ganciclovir is preferred for life-threatening or sight-threatening CMV disease when optimal drug exposure is essential.
- QUOTE: "Intravenous ganciclovir is preferred as the initial treatment of life-threatening or sight-threatening CMV disease when optimal drug exposure is essential. Furthermore, there are limited PK data to confirm adequate valganciclovir bioavailability in patients with severe gastrointestinal CMV disease."
- SOURCE: CMV25 | YEAR: 2025 | LOCATOR: Treatment section | GRADE: narrative, ungraded | POPULATION: all SOT; transplant
- NOTE: Not a graded statement. The quote's second sentence: limited PK data confirm adequate valganciclovir bioavailability in severe gastrointestinal CMV disease.

## 5. IDSA 2017 infectious diarrhea (GENERAL population)

**D14** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA (general population): all people of any age with acute diarrhea should be evaluated for dehydration.
- QUOTE: "People of all ages with acute diarrhea should be evaluated for dehydration, which increases the risk of life-threatening illness and death, especially among the young and older adults"
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: rec 5 | GRADE: strong, high | POPULATION: general
- NOTE: Not written for transplant recipients.

**D15** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA (general): test stool, including for C. difficile, when diarrhea comes with fever, bloody or mucoid stools, severe cramping or tenderness, or sepsis signs.
- QUOTE: "Stool testing should be performed for Salmonella, Shigella, Campylobacter, Yersinia, C. difficile, and STEC in people with diarrhea accompanied by fever, bloody or mucoid stools, severe abdominal cramping or tenderness, or signs of sepsis"
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: rec 8 | GRADE: strong, moderate | POPULATION: general

**D16** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA (general): blood cultures should be obtained from people who are immunocompromised, among others.
- QUOTE: "Blood cultures should be obtained from infants <3 months of age, people of any age with signs of septicemia or when enteric fever is suspected, people with systemic manifestations of infection, people who are immunocompromised"
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: rec 9 | GRADE: strong, moderate | POPULATION: general; names immunocompromised people

**D17** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA (general): a broad differential, with stool culture, viral studies and parasite examination, is recommended in immunocompromised people with diarrhea.
- QUOTE: "A broad differential diagnosis is recommended in immunocompromised people with diarrhea, especially those with moderate and severe primary or secondary immune deficiencies, for evaluation of stool specimens by culture, viral studies, and examination for parasites"
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: rec 12 | GRADE: strong, moderate | POPULATION: general; names immunocompromised people
- NOTE: The rest of rec 12 concerns AIDS (Cryptosporidium, Cyclospora, microsporidia, MAC, CMV). Transplant recipients are not named in the recommendation.

**D18** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA (general): empiric antibacterial treatment should be considered for immunocompromised people with severe illness and bloody diarrhea.
- QUOTE: "Empiric antibacterial treatment should be considered in immunocompromised people with severe illness and bloody diarrhea"
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: rec 32 | GRADE: strong, low | POPULATION: general; names immunocompromised people

**D19** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: IDSA (general): empiric antimicrobials are not recommended for most acute watery diarrhea, but an exception may be made for immunocompromised or ill-appearing people.
- QUOTE: "In most people with acute watery diarrhea and without recent international travel, empiric antimicrobial therapy is not recommended (strong, low). An exception may be made in people who are immunocompromised or young infants who are ill-appearing."
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: rec 36 | GRADE: strong, low (exception ungraded) | POPULATION: general; names immunocompromised people

**D20** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA (general): reduced-osmolarity oral rehydration solution is first-line for mild to moderate dehydration from acute diarrhea of any cause.
- QUOTE: "Reduced osmolarity oral rehydration solution (ORS) is recommended as the first-line therapy of mild to moderate dehydration in infants, children, and adults with acute diarrhea from any cause"
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: rec 39 | GRADE: strong, moderate | POPULATION: general

**D21** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA (general): give isotonic IV fluids for severe dehydration, shock or altered mental status with failure of ORS, or ileus.
- QUOTE: "Isotonic intravenous fluids such as lactated Ringer’s and normal saline solution should be administered when there is severe dehydration, shock, or altered mental status and failure of ORS therapy (strong, high) or ileus (strong, moderate)."
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: rec 41 | GRADE: strong, high (ileus: strong, moderate) | POPULATION: general

**D22** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA (general): loperamide may be given to immunocompetent adults with watery diarrhea but should be avoided with fever or suspected toxic megacolon.
- QUOTE: "Loperamide may be given to immunocompetent adults with acute watery diarrhea (weak, moderate), but should be avoided at any age in suspected or proven cases where toxic megacolon may result in inflammatory diarrhea or diarrhea with fever (strong, low)."
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: rec 47 | GRADE: weak, moderate (avoid with megacolon, inflammatory diarrhea or fever: strong, low) | POPULATION: general; says "immunocompetent"
- NOTE: The guideline does not say whether loperamide is acceptable in transplant recipients.

**D23** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: IDSA (general): probiotics may be offered to immunocompetent adults; bacteraemia or fungaemia from probiotic organisms has occurred in critically ill or immunocompromised people.
- QUOTE: "case reports of bacteremia or fungemia with molecularly matched isolates to the probiotic organism have occurred in critically ill or immunocompromised people"
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: rec 49 rationale | GRADE: rationale, ungraded (rec 49: weak, moderate, "immunocompetent adults and children") | POPULATION: general; names immunocompromised people

**D24** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: IDSA (general): immunocompromised people are more likely to have severe or prolonged illness, with a broad range of causes.
- QUOTE: "Immunocompromised people are more likely to experience severe or prolonged illness."
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: Immunocompromised hosts section | GRADE: background, ungraded | POPULATION: general; names immunocompromised people

**D25** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: IDSA (general): chronic and severe norovirus infection has been reported in patients immunosuppressed after organ transplantation.
- QUOTE: "Chronic and severe norovirus infection has been reported in patients receiving immunosuppression following organ transplantation"
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: Immunocompromised hosts / norovirus background | GRADE: background, ungraded | POPULATION: general; names organ transplantation

## 6. IDSA/SHEA C. difficile 2017 and 2021 update (GENERAL, adults)

**D26** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA/SHEA: solid organ transplant recipients have about 5-fold the C. difficile rate of general medicine patients (prevalence 7.4%).
- QUOTE: "Other patient populations at increased risk include solid organ transplant recipients: With an overall prevalence of 7.4%, rates in this population are 5-fold greater than among general medicine patients"
- SOURCE: IDSA-CD17 | YEAR: 2017 | LOCATOR: Epidemiology background (risk populations) | GRADE: background, ungraded | POPULATION: general guideline; names solid organ transplant recipients
- NOTE: Same paragraph: severe disease prevalence 5.3% and recurrence risk about 20% in SOT.

**D27** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA/SHEA 2017: patients with unexplained new-onset 3 or more unformed stools in 24 hours are the preferred population for C. difficile testing (weak, very low).
- QUOTE: "Patients with unexplained and new-onset ≥3 unformed stools in 24 hours are the preferred target population for testing for CDI (weak recommendation, very low quality of evidence)."
- SOURCE: IDSA-CD17 | YEAR: 2017 | LOCATOR: Diagnosis, question VI | GRADE: weak recommendation, very low quality of evidence | POPULATION: general; adults

**D28** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: IDSA/SHEA: do not repeat C. difficile testing within 7 days in the same diarrhea episode or test stool from asymptomatic patients.
- QUOTE: "Do not perform repeat testing (within 7 days) during the same episode of diarrhea and do not test stool from asymptomatic patients, except for epidemiological studies"
- SOURCE: IDSA-CD17 | YEAR: 2017 | LOCATOR: Diagnosis, question IX | GRADE: strong recommendation, moderate quality of evidence | POPULATION: general

**D29** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA/SHEA 2017: discontinue the inciting antibiotic as soon as possible, as this may influence recurrence risk.
- QUOTE: "Discontinue therapy with the inciting antibiotic agent(s) as soon as possible, as this may influence the risk of CDI recurrence"
- SOURCE: IDSA-CD17 | YEAR: 2017 | LOCATOR: Treatment, question XXVIII | GRADE: strong recommendation, moderate quality of evidence | POPULATION: general; adults

**D56** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA/SHEA 2017: start CDI antibiotic therapy empirically if a substantial delay in lab confirmation is expected, or for fulminant CDI.
- QUOTE: "Antibiotic therapy for CDI should be started empirically for situations where a substantial delay in laboratory confirmation is expected, or for fulminant CDI"
- SOURCE: IDSA-CD17 | YEAR: 2017 | LOCATOR: Treatment, question XXVIII | GRADE: weak recommendation, low quality of evidence | POPULATION: general; adults

**D30** | TAG: OVERLAY, DOSE | TIER: GUIDELINE
- CLAIM: IDSA/SHEA 2017, general adults: vancomycin 125 mg by mouth four times daily or fidaxomicin 200 mg twice daily, 10 days, over metronidazole (strong, high).
- QUOTE: "Either vancomycin or fidaxomicin is recommended over metronidazole for an initial episode of CDI. The dosage is vancomycin 125 mg orally 4 times per day or fidaxomicin 200 mg twice daily for 10 days"
- SOURCE: IDSA-CD17 | YEAR: 2017 | LOCATOR: Treatment, question XXIX | GRADE: strong recommendation, high quality of evidence | POPULATION: general; adults
- NOTE: First-line choice partly superseded by the 2021 update (D31). The 2017 table also lists metronidazole 500 mg three times a day for 10 days (Weak/High) only if vancomycin and fidaxomicin are unavailable, for non-severe CDI.

**D31** | TAG: NODE | TIER: ABRIDGED
- CLAIM: IDSA/SHEA 2021: for an initial CDI episode, fidaxomicin is suggested over a standard course of vancomycin.
- QUOTE: "For patients with an initial CDI episode, we suggest using fidaxomicin rather than a standard course of vancomycin (conditional recommendation, moderate certainty of evidence)."
- SOURCE: IDSA-CD21 | YEAR: 2021 | LOCATOR: Recommendation I (abridged) | GRADE: conditional recommendation, moderate certainty of evidence | POPULATION: general; adults
- NOTE: Comment on the page: "implementation depends upon available resources. Vancomycin remains an acceptable alternative."

**D32** | TAG: OVERLAY | TIER: ABRIDGED
- CLAIM: IDSA/SHEA 2021 text: recurrence risk factors may include compromised immunity.
- QUOTE: "Risk factors for recurrence may include age of 65 years or older, compromised immunity, severe CDI, and ribotype 027/078/244 infections"
- SOURCE: IDSA-CD21 | YEAR: 2021 | LOCATOR: rationale, recommendation I | GRADE: rationale, ungraded | POPULATION: general; adults

**D33** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA/SHEA 2017 (expert opinion): severe CDI is WBC >=15000 cells/mL (as printed) or creatinine >1.5 mg/dL; fulminant is hypotension or shock, ileus, megacolon.
- QUOTE: "Leukocytosis with a white blood cell count of ≥15000 cells/mL or a serum creatinine level >1.5 mg/dL"
- SOURCE: IDSA-CD17 | YEAR: 2017 | LOCATOR: Table 1 (severe row); fulminant row "Hypotension or shock, ileus, megacolon" | GRADE: expert opinion (table footnote b) | POPULATION: general; adults
- NOTE: Non-severe is WBC <=15000 cells/mL and creatinine <1.5 mg/dL (printed). Footnote b: "The criteria proposed for defining severe or fulminant Clostridium difficile infection (CDI) are based on expert opinion."

**D34** | TAG: OVERLAY, DOSE | TIER: GUIDELINE
- CLAIM: IDSA/SHEA 2017, fulminant CDI: vancomycin 500 mg four times daily by mouth; rectal if ileus; IV metronidazole 500 mg every 8 hours, particularly if ileus.
- QUOTE: "For fulminant CDI*, vancomycin administered orally is the regimen of choice (strong recommendation, moderate quality of evidence). If ileus is present, vancomycin can also be administered per rectum (weak recommendation, low quality of evidence). ... VAN, 500 mg 4 times per day by mouth or by nasogastric tube. If ileus, consider adding rectal instillation of VAN. Intravenously administered metronidazole (500 mg every 8 hours) should be administered together with oral or rectal VAN, particularly if ileus is present."
- SOURCE: IDSA-CD17 | YEAR: 2017 | LOCATOR: question XXX and Table 1 (fulminant row) | GRADE: oral vancomycin Strong/Moderate; rectal vancomycin Weak/Low; IV metronidazole Strong/Moderate | POPULATION: general; adults
- NOTE: Text and table read from HTML. The 2021 update has no fulminant statement.

## 7. FDA labels

**D35** | TAG: NODE | TIER: LABEL
- CLAIM: CellCept label: diarrhea is among the most common adverse reactions (20% or more) in trials.
- QUOTE: "The most common adverse reactions in clinical trials (20 % or greater) include diarrhea, leukopenia, infection, vomiting"
- SOURCE: CellCept label (cellcept_37241e87.xml) | YEAR: current SPL | LOCATOR: Highlights / 6.1 | GRADE: label | POPULATION: kidney, heart, liver; transplant

**D36** | TAG: NODE | TIER: LABEL
- CLAIM: CellCept label: endoscopy in mycophenolate-related diarrhea showed isolated cases of intestinal villous atrophy.
- QUOTE: "Endoscopic investigation of patients with CELLCEPT-related diarrhea revealed isolated cases of intestinal villous atrophy"
- SOURCE: CellCept label | YEAR: current SPL | LOCATOR: 6.1 gastrointestinal disorders | GRADE: label | POPULATION: kidney, heart, liver; transplant

**D37** | TAG: NODE | TIER: LABEL
- CLAIM: CellCept label: GI bleeding requiring hospitalization, ulceration and perforation were seen in trials.
- QUOTE: "Gastrointestinal bleeding requiring hospitalization, ulceration and perforations were observed in clinical trials."
- SOURCE: CellCept label | YEAR: current SPL | LOCATOR: 5.5 | GRADE: label | POPULATION: kidney, heart, liver; transplant

**D38** | TAG: OVERLAY, TEAM | TIER: LABEL
- CLAIM: CellCept patient information: call the doctor right away for sudden or severe or persistent stomach pain, or diarrhea.
- QUOTE: "Call your doctor right away if you have sudden or severe stomach-area pain or stomach-area pain that does not go away, or if you have diarrhea."
- SOURCE: CellCept label (patient information) | YEAR: current SPL | LOCATOR: Medication guide | GRADE: label | POPULATION: transplant patients

**D39** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Myfortic label: diarrhea is among adverse reactions in 20% or more of patients.
- QUOTE: "The most common adverse reactions (≥ 20%) associated with the administration of Myfortic were anemia, leukopenia, constipation, nausea, diarrhea, vomiting, dyspepsia"
- SOURCE: Myfortic label (myfortic_eed26501.xml) | YEAR: current SPL | LOCATOR: 6.1 | GRADE: label | POPULATION: kidney; transplant

**D40** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Prograf label: diarrhea is among the most common adverse reactions (30% or more) in kidney transplant patients.
- QUOTE: "The most common adverse reactions (≥ 30%) observed in PROGRAF-treated kidney transplant patients are: infection, tremor, hypertension, abnormal renal function, constipation, diarrhea"
- SOURCE: Prograf label (prograf_7f667de1.xml) | YEAR: current SPL | LOCATOR: 6.1 | GRADE: label | POPULATION: kidney; transplant

**D41** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Envarsus XR label lists diarrhea with nausea and vomiting among adverse reactions of tacrolimus overdose.
- QUOTE: "gastrointestinal disturbances (nausea, vomiting, and diarrhea)"
- SOURCE: Envarsus label (envarsus_de2315b0.xml) | YEAR: current SPL | LOCATOR: 10 Overdosage | GRADE: label | POPULATION: kidney; transplant
- NOTE: Same list: tremor, headache, confusional state, encephalopathy, increased BUN and creatinine. The label does NOT say diarrhea raises or lowers tacrolimus levels (see NOT IN). Astagraf XL has the same overdose list.

**D42** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Sirolimus label: diarrhea is among the most common adverse reactions (30% or more) in renal transplant prophylaxis.
- QUOTE: "Most common adverse reactions (incidence ≥30%) are peripheral edema, hypertriglyceridemia, hypertension, hypercholesterolemia, creatinine increased, abdominal pain, diarrhea"
- SOURCE: Sirolimus label (sirolimus_5908cd1a.xml) | YEAR: current SPL | LOCATOR: Highlights / 6.1 | GRADE: label | POPULATION: kidney; transplant

**D43** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Zortress (everolimus) label: diarrhea is the first listed common adverse reaction in liver transplantation (incidence over 10%).
- QUOTE: "Liver Transplantation (incidence greater than 10%) : diarrhea, headache, peripheral edema, hypertension"
- SOURCE: Zortress label (zortress_e082a024.xml) | YEAR: current SPL | LOCATOR: Highlights / 6.1 | GRADE: label | POPULATION: liver, kidney; transplant

**D44** | TAG: NODE | TIER: LABEL
- CLAIM: Bactrim label: C. difficile-associated diarrhea has been reported with nearly all antibacterials including TMP-SMX, from mild to fatal colitis.
- QUOTE: "Clostridioides difficile associated diarrhea (CDAD) has been reported with use of nearly all antibacterial agents, including BACTRIM, and may range in severity from mild diarrhea to fatal colitis."
- SOURCE: Bactrim label (bactrim_f59d0c04.xml) | YEAR: current SPL | LOCATOR: Warnings | GRADE: label | POPULATION: general

**D45** | TAG: NODE | TIER: LABEL
- CLAIM: Bactrim label: consider C. difficile in all patients with diarrhea after antibiotic use; it can occur over two months later.
- QUOTE: "CDAD must be considered in all patients who present with diarrhea following antibiotic use. Careful medical history is necessary since CDAD has been reported to occur over two months after the administration of antibacterial agents."
- SOURCE: Bactrim label | YEAR: current SPL | LOCATOR: Warnings | GRADE: label | POPULATION: general

**D46** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Bactrim label indications include treatment of traveler's diarrhea due to susceptible enterotoxigenic E. coli.
- QUOTE: "For the treatment of traveler's diarrhea due to susceptible strains of enterotoxigenic E. coli ."
- SOURCE: Bactrim label | YEAR: current SPL | LOCATOR: Indications and Usage | GRADE: label | POPULATION: general; adults

**D47** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Mepron (atovaquone) label: diarrhea is among the most frequent adverse reactions requiring discontinuation in PCP prevention trials.
- QUOTE: "PCP Prevention: The most frequent adverse reactions (≥25% that required discontinuation) were diarrhea, rash, headache, nausea, and fever."
- SOURCE: Mepron label (mepron_b426b6bf.xml) | YEAR: current SPL | LOCATOR: Highlights / 6.1 | GRADE: label | POPULATION: HIV-infected trial subjects; not transplant

## 8. Reviews

**D48** | TAG: NODE | TIER: REVIEW
- CLAIM: ED review: subtle symptoms such as mild cough or scant diarrhea can mask serious infection in transplant patients.
- QUOTE: "Subtle symptoms such as a mild cough or scant diarrhea can mask a serious underlying infection."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Presentation | GRADE: ungraded | POPULATION: SOT and HCT; adult; transplant

**D49** | TAG: NODE | TIER: REVIEW
- CLAIM: ED review: in diarrhea with recent antibiotic exposure, stool testing for C. difficile should be pursued.
- QUOTE: "In patients presenting with diarrhea and a recent history of antibiotic exposure, stool testing for C. difficile infection should be pursued."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Diagnostic evaluation | GRADE: ungraded | POPULATION: SOT and HCT; transplant

**D50** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: ED review: in neutropenic patients with fever, abdominal pain and diarrhea, CT of abdomen and pelvis is advised to look for typhlitis.
- QUOTE: "In neutropenic patients with fever, abdominal pain, and diarrhea, a CT of the abdomen and pelvis should be performed to evaluate for neutropenic enterocolitis, also known as typhlitis."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Diagnostic evaluation | GRADE: ungraded | POPULATION: neutropenic SOT and HCT patients; transplant
- NOTE: Neutropenia-specific; the review's neutropenia content is mostly HCT.

**D51** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: Cureus cohort: in hospitalised kidney recipients with infectious diarrhea, most common pathogens were C. difficile (26.3%), CMV (12.3%), EPEC (8.6%), norovirus (4.8%).
- QUOTE: "The most prevalent pathogens identified among kidney transplant recipients were Clostridioides difficile (26.3%), cytomegalovirus (CMV, 12.3%), enteropathogenic Escherichia coli (EPEC, 8.6%), and norovirus (4.8%)."
- SOURCE: CUREUS | YEAR: 2025 | LOCATOR: Abstract, results | GRADE: ungraded | POPULATION: kidney; adult; hospitalised; single-centre, Germany
- NOTE: Single-centre retrospective cohort (not a guideline or review); framing only. Pathogen found in 276 of 436 recipients. Retrospective; PCR panel limited to C. difficile toxin genes, CMV, EPEC and norovirus, so parasites were mostly not tested for.

**D52** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: Cureus cohort: CMV diarrhea appeared at a median of 13.5 months after transplant, around the end of standard antiviral prophylaxis.
- QUOTE: "CMV infections occurred at a median of 13.5 months post-transplantation, coinciding with the end of standard antiviral prophylaxis."
- SOURCE: CUREUS | YEAR: 2025 | LOCATOR: Results | GRADE: ungraded | POPULATION: kidney; adult; single-centre
- NOTE: The authors contrast this with earlier reports of peaks at 30 to 90 days.

**D53** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: Cureus cohort authors, discussion: multiplex stool PCR is recommended as a standard diagnostic tool in immunocompromised patients.
- QUOTE: "Multiplex PCR proved effective in identifying causative pathogens and is recommended as a standard diagnostic tool in immunocompromised patients"
- SOURCE: CUREUS | YEAR: 2025 | LOCATOR: Discussion | GRADE: ungraded | POPULATION: immunocompromised; discussion citing prior work
- NOTE: Cohort authors' discussion statement citing a prior study; carries an instruction verb (recommended); not used as an instruction on the page.

**D54** | TAG: OVERLAY | TIER: REVIEW | IS: yes
- CLAIM: Cureus cohort authors, discussion: careful adjustment of immunosuppression, particularly mycophenolate, should be considered because persistent diarrhea is linked to graft dysfunction.
- QUOTE: "Given that persistent diarrhea is associated with an increased risk of graft dysfunction, careful adjustment of immunosuppressive regimens, particularly involving agents such as mycophenolate mofetil, should be considered"
- SOURCE: CUREUS | YEAR: 2025 | LOCATOR: Discussion | GRADE: ungraded | POPULATION: kidney; adult; single-centre cohort, discussion citing prior work
- NOTE: Cohort authors' discussion statement ("should be considered"); not used as an instruction on the page.

**D55** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: Cureus cohort authors, discussion: telling infectious from drug-induced toxic diarrhea remains a common diagnostic challenge in transplant medicine.
- QUOTE: "differentiating infectious from drug-induced toxic diarrhea, which remains a common diagnostic challenge in transplant medicine"
- SOURCE: CUREUS | YEAR: 2025 | LOCATOR: Introduction | GRADE: ungraded | POPULATION: kidney; transplant

## 9. Added after verification

**D57** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IATDMCT 2019 consensus: temporary elevation of tacrolimus trough concentrations (about 2-fold and more) has been observed in patients with diarrhea.
- QUOTE: "Temporary elevation of tacrolimus trough concentrations (about 2-fold and more) has been observed in patients with diarrhea."
- SOURCE: IATDMCT | YEAR: 2019 | LOCATOR: PK of tacrolimus, pharmacokinetic variability text | GRADE: consensus statement, ungraded | POPULATION: tacrolimus-treated transplant patients; adult and paediatric (consensus)
- NOTE: Next sentence: "This may be because intestinal Pgp activity is impaired in patients with persistent diarrhea, leading to increased bioavailability." (proposed mechanism, "may be"). No instruction to hold, reduce or measure is given in this statement. Tier GUIDELINE (consensus). The IATDMCT everolimus 2024 consensus has no diarrhea text.

**D58** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: ED review: critically ill transplant patients should be admitted; for stable patients, dispositions are best made with infectious disease and transplant specialists.
- QUOTE: "Critically-ill SOT and HCT patients should be admitted to the hospital for further resuscitation, antibiotic therapy, and diagnostic evaluation. The decision to admit a clinically stable patient can be more nuanced, and patient dispositions are best made in consultation with specialists in infectious diseases, transplantation medicine, and/or hematology/oncology as appropriate."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Disposition | GRADE: ungraded | POPULATION: SOT and HCT; infection generally; transplant

**D59** | TAG: OVERLAY | TIER: REVIEW | IS: yes
- CLAIM: ED review: emergency physicians should have a lower threshold to admit transplant patients with serious infection, including for adjustment of immunosuppression.
- QUOTE: "Therefore, emergency physicians should have a lower threshold to admit these patients for more specialized inpatient evaluation (e.g., bronchoscopy, fluid aspiration, tissue biopsy) and management, including adjustment of immunosuppression."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Conclusion | GRADE: ungraded | POPULATION: SOT and HCT; serious infection; transplant

**D60** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: ED review: C. difficile infection affects up to 30% of solid organ transplant patients, often with severe disease.
- QUOTE: "C. difficile infection affects up to 30% of SOT patients, often with severe disease."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Timeline, early period | GRADE: ungraded | POPULATION: SOT; transplant
- NOTE: Differs from the 7.4% in D26; see SOURCES DIFFER.

**D61** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: ED review: up to 40% of infections in transplant patients present without fever.
- QUOTE: "Up to 40% of infections in this population will present without a fever."
- SOURCE: ZHONG | YEAR: 2018 | LOCATOR: Presentation | GRADE: ungraded | POPULATION: SOT and HCT; infection; transplant

**D62** | TAG: OVERLAY | TIER: ABRIDGED
- CLAIM: IDSA/SHEA 2021, general adults: for recurrent CDI, fidaxomicin (standard or extended-pulsed) is suggested over a standard vancomycin course.
- QUOTE: "In patients with recurrent CDI episodes, we suggest fidaxomicin (standard or extended-pulsed regimen) rather than a standard course of vancomycin (conditional recommendation, low certainty evidence)."
- SOURCE: IDSA-CD21 | YEAR: 2021 | LOCATOR: Recommendation II (abridged) | GRADE: conditional recommendation, low certainty evidence | POPULATION: general; adults
- NOTE: Comment on the page: tapered and pulsed vancomycin or a standard vancomycin course are acceptable alternatives for a first recurrence.

**D63** | TAG: OVERLAY | TIER: ABRIDGED
- CLAIM: IDSA/SHEA 2021, general adults: bezlotoxumab is suggested with standard antibiotics for a recurrence within the last 6 months.
- QUOTE: "For patients with a recurrent CDI episode within the last 6 months, we suggest using bezlotoxumab as a co-intervention along with SOC antibiotics rather than SOC antibiotics alone (conditional recommendation, very low certainty of evidence)."
- SOURCE: IDSA-CD21 | YEAR: 2021 | LOCATOR: Recommendation III (abridged) | GRADE: conditional recommendation, very low certainty of evidence | POPULATION: general; adults
- NOTE: Comment: patients with risk factors such as "immunocompromised host [per history or use of immunosuppressive therapy]" "may particularly benefit"; the FDA warns about use in congestive heart failure.

**D64** | TAG: NODE | TIER: GUIDELINE
- CLAIM: IDSA/SHEA 2017: if surgery is needed for severely ill CDI patients, perform subtotal colectomy with rectal preservation.
- QUOTE: "If surgical management is necessary for severely ill patients, perform subtotal colectomy with preservation of the rectum (strong recommendation, moderate quality of evidence)."
- SOURCE: IDSA-CD17 | YEAR: 2017 | LOCATOR: question XXX, statement 2 | GRADE: strong recommendation, moderate quality of evidence | POPULATION: general; adults

**D65** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: IDSA/SHEA 2017: C. difficile risk among solid organ recipients is highest in multiple-organ, then lung, liver, intestine, kidney, pancreas; severe disease 5.3%, recurrence about 20%.
- QUOTE: "Risks are highest in multiple solid organ transplants, followed by lung, liver, intestine, kidney, and pancreas with an overall prevalence of severe disease of 5.3% and risk of recurrence approximately 20%"
- SOURCE: IDSA-CD17 | YEAR: 2017 | LOCATOR: Epidemiology background (risk populations) | GRADE: background, ungraded | POPULATION: general guideline; names solid organ transplant recipients

**D66** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: IDSA 2017, general population: negative stool studies for infectious pathogens increase suspicion for noninfectious conditions such as inflammatory bowel disease.
- QUOTE: "Conversely, negative stool studies for infectious pathogens increase suspicion for noninfectious conditions such as inflammatory bowel disease (IBD)."
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: Diagnostics background | GRADE: background, ungraded | POPULATION: general

**D67** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: IDSA 2017, general population: blood cultures may be considered in febrile immunocompromised people, a softer rationale than rec 9.
- QUOTE: "Blood cultures may be considered in immunocompromised people who are febrile or from whom bacterial pathogens are detected by stool testing."
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: rec 9 rationale (Blood cultures) | GRADE: rationale, ungraded (rec 9: strong, moderate) | POPULATION: general; names immunocompromised people
- NOTE: D16 and D67 differ in strength; see SOURCES DIFFER.

**D68** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: IDSA 2017, general population: bloody stools are not an expected manifestation of C. difficile infection.
- QUOTE: "Bloody stools are not an expected manifestation of infection with C. difficile."
- SOURCE: IDSA-D | YEAR: 2017 | LOCATOR: rec 8 | GRADE: text within rec 8 (strong, moderate) | POPULATION: general

**D69** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: CMV consensus: culture may have greater sensitivity than histopathology for gastrointestinal CMV disease, though culture is no longer widely available.
- QUOTE: "Nonetheless, culture may have greater sensitivity than histopathology in diagnosing gastrointestinal disease."
- SOURCE: CMV25 | YEAR: 2025 | LOCATOR: Diagnostics for tissue-invasive disease | GRADE: narrative, ungraded | POPULATION: all SOT; transplant

**D70** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: CMV consensus: longer courses of CMV treatment may be needed in some tissue-invasive gastrointestinal diseases.
- QUOTE: "Longer courses of treatment may be needed in some tissue-invasive gastrointestinal diseases, pneumonitis in lung transplant recipients, and central nervous system or retinal disease."
- SOURCE: CMV25 | YEAR: 2025 | LOCATOR: Treatment duration | GRADE: narrative, ungraded | POPULATION: all SOT; transplant

**D71** | TAG: OVERLAY | TIER: GUIDELINE
- CLAIM: AASLD/AST 2025: in liver recipients, IV ganciclovir is recommended instead of oral valganciclovir when gastrointestinal absorption is impaired or infection is severe.
- QUOTE: "In liver transplant recipients, oral valganciclovir is the preferred treatment of cytomegalovirus infection (900 mg twice daily or renally adjusted) except when the viral load is ≥100,000 IU/mL, impaired gastrointestinal absorption, or presence of severe infection, especially pneumonia, in which case intravenous ganciclovir is recommended (Strong, Level 1)."
- SOURCE: AASLD-NG | YEAR: 2025 | LOCATOR: Question 8 (infectious complications), CMV statement | GRADE: Strong, Level 1 | POPULATION: liver; adult; transplant
- NOTE: Contains a dose (valganciclovir 900 mg twice daily); not for the page.

**D72** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Myfortic label: administer with caution in active serious digestive system disease; GI bleeding, perforation and ulcers have been reported.
- QUOTE: "Gastrointestinal bleeding (requiring hospitalization), intestinal perforations, gastric ulcers, and duodenal ulcers have been reported in patients treated with Myfortic. Myfortic should be administered with caution in patients with active serious digestive system disease."
- SOURCE: Myfortic label (myfortic_eed26501.xml) | YEAR: current SPL | LOCATOR: 5.7 | GRADE: label | POPULATION: kidney; transplant

**D73** | TAG: OVERLAY | TIER: LABEL
- CLAIM: Astagraf XL label: diarrhea is first among the most common adverse reactions (30% or more) in kidney transplant Study 1.
- QUOTE: "The most common (≥ 30%) adverse reactions observed with ASTAGRAF XL in Study 1 were: diarrhea, constipation, nausea, peripheral edema, tremor, and anemia."
- SOURCE: Astagraf label (astagraf_550a5cd4.xml) | YEAR: current SPL | LOCATOR: 6.1 | GRADE: label | POPULATION: kidney; adult; transplant

**D74** | TAG: OVERLAY | TIER: REVIEW
- CLAIM: Cureus cohort: C. difficile infections occurred at a median of 15.5 months after kidney transplant.
- QUOTE: "Clostridioides difficile infections also occurred significantly earlier, with a median of 15.5 months post-transplantation"
- SOURCE: CUREUS | YEAR: 2025 | LOCATOR: Results | GRADE: ungraded | POPULATION: kidney; adult; single-centre

## Row index: statements naming reducing, holding, stopping or changing an immunosuppressant

D3 (reduce MMF or change MMF to azathioprine, only after other causes are excluded; KDIGO, ungraded); D54 (careful adjustment of immunosuppression, particularly mycophenolate; Cureus single-centre cohort discussion, ungraded); D59 (ED review: lower threshold to admit, including for adjustment of immunosuppression). D1 recommends monitoring MPA and tacrolimus levels, not changing doses. D57 states tacrolimus troughs have risen with diarrhea; it names no hold or reduction. No saved source says to hold or reduce tacrolimus during diarrhea.

## SOURCES DIFFER

- **First-line CDI treatment, 2017 versus 2021 (general adults).** IDSA/SHEA 2017 (D30): vancomycin or fidaxomicin over metronidazole (strong, high). IDSA/SHEA 2021 (D31, ABRIDGED): fidaxomicin suggested over a standard vancomycin course for an initial episode (conditional, moderate), vancomycin acceptable; recurrence: fidaxomicin suggested (D62, conditional, low), bezlotoxumab suggested for a recurrence within 6 months (D63, conditional, very low). The 2021 update says nothing on severe or fulminant episodes (D34 stands alone).
- **C. difficile frequency in solid organ recipients.** IDSA/SHEA 2017 (D26): prevalence 7.4%, 5-fold general medicine patients; severe disease 5.3%, recurrence about 20% (D65). Zhong 2018 review (D60): "up to 30% of SOT patients, often with severe disease". Different measures and populations; do not state one number.
- **Blood cultures in immunocompromised people with diarrhea.** IDSA 2017 rec 9 (D16): blood cultures "should be obtained" from people who are immunocompromised (strong, moderate); the rationale (D67): "may be considered in immunocompromised people who are febrile". General-population guideline; the two statements differ in strength.
- **Empiric antimicrobials in an immunocompromised person.** IDSA 2017 (D18, D19): consider for severe bloody diarrhea (strong, low); exception for ill-appearing watery diarrhea. IDSA/SHEA 2017 (D56): empiric CDI therapy only if a substantial lab delay is expected or disease is fulminant (weak, low). Different syndromes; no source says which to use first in a transplant recipient.
- **Whether to reduce MMF.** KDIGO 2009 (D3): only after other causes are excluded. The Cureus 2025 single-centre cohort authors (D54, discussion section, not a guideline): careful adjustment should be considered given graft dysfunction with persistent diarrhea. Not in conflict; the cohort statement is weaker and later and is not carried on the page.
- **CMV in the gut.** CMV consensus 2025: plasma PCR can be low or undetectable in R+ patients (D10); histology with immunohistochemistry recommended (D11, strong, moderate); culture may be more sensitive than histopathology but is no longer widely available (D69); no stool PCR (D12). KDIGO 2009 does not address gut CMV.
- **Loperamide.** IDSA 2017 (D22) permits it only for immunocompetent adults with watery diarrhea. No transplant source speaks to it.

## NOT IN THE SOURCES READ

1. **Which empirical antimicrobial to start in the ED before a diagnosis, in a transplant recipient.** Not in the guidelines read for diarrhea. Nearest: D18, D19 (IDSA 2017, general), D56 (empiric CDI therapy only if delay or fulminant; IDSA/SHEA 2017, general), D31 and D30 (CDI drug choice; general adults). A review (emergency medicine, 2018) gives empiric broad-spectrum cover for sepsis, not for diarrhea; not used.
2. **Whether to check a tacrolimus level, and whether to hold or reduce any dose, during diarrhea.** Not in the guidelines read. The IATDMCT 2019 consensus states that tacrolimus trough concentrations about 2-fold and more have been observed in patients with diarrhea (D57), with a proposed mechanism; it gives no instruction to hold, reduce or measure. The tacrolimus, Envarsus, Astagraf, sirolimus and everolimus labels list diarrhea only as an adverse reaction (D40, D41, D42, D43, D73). Nearest: D57, D1 (KDIGO: monitoring MPA AUC and tacrolimus C0 levels may help reduce diarrhea), D3.
3. **Which tests to send and in what order.** Only general statements. Nearest: D15, D17, D27, D49 (review), D12, D11, D66, D68.
4. **When to image (abdominal CT).** Not in the guidelines read for transplant recipients. Nearest: D50 (review, neutropenic patients only); D64 (surgery for severe CDI).
5. **When to admit.** Not in the guidelines read; a review (emergency medicine, 2018) says critically ill transplant patients should be admitted, dispositions for stable patients are best made with infectious disease and transplant specialists, and there should be a lower threshold to admit serious infection, including for adjustment of immunosuppression (D58, D59). Nearest guideline facts: D7, D14, D21, D33.
6. **How to adjust immunosuppression in the ED.** Not in the guidelines read. Nearest: D3 (KDIGO), D54 and D59 (reviews), D7 (heart: inform the transplant centre).
7. **Fluids and electrolytes in a recipient with a renal graft or nephrotoxic drugs.** General IDSA only (D20, D21).
8. **Antimotility and probiotic use in recipients.** IDSA confines both to immunocompetent people (D22, D23). No transplant statement.
9. **CMV colitis versus drug diarrhea versus other infection: pre-test clues and timing.** Nearest: D10, D13, D52, D74 (single-centre medians), D51.
10. **Parasites, Cryptosporidium, norovirus and microsporidia in recipients.** Parasite chapter not obtainable. Nearest: D17, D25.
11. **Steroid route when a recipient has diarrhea or vomiting.** The saved general-population glucocorticoid-induced adrenal insufficiency review (ESE 2024) addresses oral malabsorption; it is not a transplant source and was not used.
12. **Diarrhea in liver, lung, pancreas and intestinal recipients.** Only D9 (AASLD table, "gastrointestinal"), D71 (liver CMV drug route), D65 (C. difficile risk by organ; general guideline). EASL 2024, the ISHLT lung documents and AASLD non-graft 2025 (apart from D71) have no diarrhea text.
13. **Documents searched with no diarrhea guidance:** EASL 2024, ISHLT lung documents, BK consensus 2024.

## USE RULES

- Every IDSA/SHEA row (D14 to D34, D56, D62 to D68) is a general-population or general-adult document. Name it "IDSA 2017, general population" or "IDSA/SHEA, general adults" with its year. Never word as written for transplant recipients. Rows that name immunocompromised people (D16 to D19, D23 to D25, D63, D67) say only what is printed; D17's AIDS detail is not about transplant.
- D22 must keep "immunocompetent adults"; D23 must keep "immunocompetent" and the bacteraemia warning together.
- D16 must never appear without D67 (the rationale says "may be considered").
- D1, D2 and D3 must show together. D3 is a kidney rationale statement, ungraded; the "call the transplant team first" is a handoff added by the page.
- D3 (2009 guideline rationale) and D54 (2025 single-centre cohort discussion) must not be merged; D53 and D54 carry instruction verbs and are never carried as instructions.
- D30 and D34 (2017 doses) must keep the frequencies and the 2017 year; D30 must not appear without D31 (2021); D34 has no 2021 counterpart. D33 must keep "cells/mL (as printed)" and "expert opinion".
- D26 must not appear without D60 or D65 (both frequency figures are stated in SOURCES DIFFER).
- D10 must not appear without D12 and D11.
- D57 may be stated as: the IATDMCT 2019 consensus reports tacrolimus troughs about 2-fold and more above baseline have been observed in patients with diarrhea, with a proposed mechanism ("may be"). It must not be turned into an instruction to hold, reduce or increase a dose, or into "diarrhea always raises levels". D41 (overdose adverse reactions list) must not be worded as "diarrhea means tacrolimus toxicity".
- D35 to D47, D72, D73 are label statements, not management; D47 is HIV-trial based; D46 is a general-adult indication.
- D51 to D53 and D74 are one single-centre cohort and a discussion sentence; D50 is neutropenia-specific; Zhong rows (D48 to D50, D58 to D61) are framing only.

## SUFFICIENCY

A useful, honest ED page can be composed from GUIDELINE and LABEL rows, about causes, recognition, the calcineurin-inhibitor level and handoff, not a treatment algorithm for transplant recipients. It could say: diarrhea in a recipient is often infectious (C. difficile, CMV, norovirus) or drug-related (mycophenolate, tacrolimus, mTOR inhibitors) and the two are hard to tell apart (D1, D51, D55); a consensus report notes tacrolimus troughs about 2-fold and more above baseline have been observed with diarrhea (D57); KDIGO says exclude treatable infection first and only then consider reducing or switching MMF, a transplant-team call (D2, D3, D7); recipients have about five times the C. difficile rate in IDSA/SHEA 2017 (D26); general-adult IDSA/SHEA guidance on testing and treatment (D27, D31, D56); evaluate dehydration and rehydrate (IDSA 2017, general: D14, D20, D21); CMV gut disease can have a low blood level (D10, D11, D12). It would be unable to say what to start empirically in a transplant recipient, whether to check a level or hold a dose, when to image or admit, whether loperamide or probiotics are safe, or how to work up parasites. Those gaps come from the missing AST diarrhea chapter and the absence of any ED or transplant-specific diarrhea guidance.
