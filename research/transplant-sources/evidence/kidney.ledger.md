# Kidney transplant recipient: rejection and graft emergencies. KDIGO 2009 evidence ledger

Source of record: Kidney Disease: Improving Global Outcomes (KDIGO) Transplant Work Group. *KDIGO Clinical Practice Guideline for the Care of Kidney Transplant Recipients.* Am J Transplant 2009;9 (Suppl 3):S1-S155. Saved file: `KDIGO_transplant_recipient_2009_guideline.pdf` (168 PDF pages). **Everything here is a statement of what this 2009 guideline says.** The guideline's own disclaimer (PDF 7, printed Siii): "based upon the best information available as of March 2009". Nothing in this ledger comes from outside knowledge; a statement the source does not make is not a row.

## How to read the rows

- **Locators.** PDF page = page number in the saved PDF (1-168). Printed page = the journal page printed on that page ("S" plus number; the front matter uses roman numerals). The offset is constant for the guideline body: printed S(n) = PDF page n + 13 (checked at PDF 14 = S1, 19 = S6, 124 = S111).
- **SOURCE-MODE.** `image` = the recommendation box or table was read from a rendered page image (the PDF page was rendered with the macOS PDFKit renderer and looked at; the text layer was used only to find pages and to test that every quote matches the PDF text). `text` = rationale or background paragraph read from the PDF text layer (the page was not viewed as an image). Quotes were mechanically checked against the PDF text layer after normalising ligatures, hyphen line breaks and symbols; "..." marks an omission inside a quote, and symbols the layer renders as letters (for example the greater-than-or-equal sign) were transcribed from the image as ">=" or "<=".
- **GRADE.** Strength is Level 1 ("We recommend") or Level 2 ("We suggest"); quality is A to D; "Not Graded" is printed where it is. The grade printed on the page is recorded only on the statement it grades. Rows with `rationale, ungraded`, `background, ungraded` or `table, ungraded` come from text or tables that carry no grade. Where one box prints several grades for several parts of one recommendation, they are listed in the order of the parts. Key (PDF 12, printed Sviii): Level 1 'We recommend'; Level 2 'We suggest'; "A: High quality of evidence ... D: Very low quality of evidence."
- **USE tags.** SUMMARY-CANDIDATE (could lead a node), NODE, OVERLAY (detail opened on demand), TEAM (what the transplant team does; the ED physician needs to know it is coming, not to do it). **DOSE** is written in the claim and note where a dose of a non-immunosuppressant is stated.
- **Scope.** KDIGO covers kidney recipients, adults and children together. Rows are written for adult recipients; paediatric-only recommendations are not included. "Immunosuppressant doses" were deliberately left out; where the source gives one next to a statement the note says so. Table 17 (PCP prophylaxis agents and doses), Table 14 (BK dosing) and the Table 21 dose-adjustment column are not copied as rows.
- **BK virus, CMV, CNI levels.** Covered by newer material in `evidence/bk.md` (2024), `evidence/cmv.md` (2025) and `evidence/cni-levels.md`. The BK and CMV rows here record only what KDIGO 2009 says; where it differs from the newer text, see the DIFFERS section. Do not use KDIGO BK or CMV rows as current practice.

## 1. Acute rejection (24 rows)

**K1** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: acute rejection is suspected when serum creatinine rises after other causes of graft dysfunction are excluded.
- QUOTE: "An acute rejection is clinically suspected in patients experiencing an increase in serum creatinine, after the exclusion of other causes of graft dysfunction (generally with biopsy)."
- REF: Ch 6 Background | GRADE: rationale, ungraded | PAGE: PDF 34, printed S21 | SOURCE-MODE: image
- NOTE: No creatinine threshold is given in this passage.

**K2** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: recommend biopsy before treating acute rejection, unless the biopsy will substantially delay treatment.
- QUOTE: "We recommend biopsy before treating acute rejection, unless the biopsy will substantially delay treatment."
- REF: 6.1 | GRADE: 1C | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K3** | USE: NODE | image
- CLAIM: KDIGO 2009: several causes of decreased kidney function can only be told apart from acute rejection by biopsy.
- QUOTE: "Several causes of decreased kidney function can only be distinguished from acute rejection by biopsy."
- REF: Ch 6 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K4** | USE: NODE | image
- CLAIM: KDIGO 2009: extra immunosuppression for graft dysfunction that is not acute rejection may be harmful.
- QUOTE: "Treatment of decreased kidney allograft function that is not caused by acute rejection with additional immunosuppressive medication may be harmful."
- REF: Ch 6 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K5** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: BK nephropathy would generally be treated differently from acute rejection, for example with less immunosuppression.
- QUOTE: "BK polyomavirus (BKV) nephropathy would generally be treated differently than acute ... rejection, for example with a reduction in immunosuppressive medication."
- REF: Ch 6 Rationale | GRADE: rationale, ungraded | PAGE: PDF 34-35, printed S21-S22 | SOURCE-MODE: image
- NOTE: Quote crosses the page break; BK itself is covered by the 2024 consensus (evidence/bk.md).

**K6** | USE: NODE | image
- CLAIM: KDIGO 2009: untreated acute rejection inevitably ends in graft destruction; treating episodes is strongly recommended unless treatment is expected to be life-threatening or severely harmful.
- QUOTE: "untreated acute rejection inevitably results in graft destruction. Therefore, it is strongly recommended that acute rejection episodes be treated, unless the treatment is expected to be life-threatening or to cause harm severe enough to preclude treatment."
- REF: Ch 6 Background | GRADE: rationale, ungraded | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K7** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: acute rejection means falling kidney function plus established diagnostic features on kidney biopsy.
- QUOTE: "Acute rejection is characterized by a decline in kidney function accompanied by well-established diagnostic features on kidney allograft biopsy."
- REF: Ch 6 Background | GRADE: rationale, ungraded | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K8** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: acute cellular rejection is T-cell mediated and responds to corticosteroids.
- QUOTE: "Acute cellular rejections are acute T-cell-mediated rejections and respond to treatment with corticosteroids."
- REF: Ch 6 Background | GRADE: rationale, ungraded | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K9** | USE: TEAM | image
- CLAIM: KDIGO 2009: recommend corticosteroids for the initial treatment of acute cellular rejection.
- QUOTE: "We recommend corticosteroids for the initial treatment of acute cellular rejection."
- REF: 6.3 | GRADE: 1D | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K10** | USE: TEAM | image
- CLAIM: KDIGO 2009: for acute cellular rejection, suggest adding or restoring maintenance prednisone in patients not on steroids.
- QUOTE: "We suggest adding or restoring maintenance prednisone in patients not on steroids who have a rejection episode."
- REF: 6.3.1 | GRADE: 2D | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K11** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest lymphocyte-depleting antibodies or OKT3 for cellular rejection not responding to corticosteroids, and for recurrent cellular rejection.
- QUOTE: "We suggest using lymphocyte-depleting antibodies or OKT3 for acute cellular rejections that do not respond to corticosteroids, and for recurrent acute cellular rejections."
- REF: 6.3.2 | GRADE: 2C | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K12** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest treating antibody-mediated rejection with plasma exchange, intravenous immunoglobulin, anti-CD20 antibody or lymphocyte-depleting antibody, with or without corticosteroids.
- QUOTE: "We suggest treating antibody-mediated acute rejection with one or more of the following alternatives, with or without corticosteroids (2C): plasma exchange; intravenous immunoglobulin; anti-CD20 antibody; lymphocyte-depleting antibody."
- REF: 6.4 | GRADE: 2C | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K13** | USE: TEAM | image
- CLAIM: KDIGO 2009: after a rejection episode, suggest adding mycophenolate, or switching azathioprine to mycophenolate.
- QUOTE: "For patients who have a rejection episode, we suggest adding mycophenolate if the patient is not receiving mycophenolate or azathioprine, or switching azathioprine to mycophenolate."
- REF: 6.5 | GRADE: 2D | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K14** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest treating subclinical and borderline acute rejection.
- QUOTE: "We suggest treating subclinical and borderline acute rejection."
- REF: 6.2 | GRADE: 2D | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K15** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: subclinical rejection is rejection changes on screening or protocol biopsy without clinical symptoms or signs.
- QUOTE: "Subclinical acute rejection is defined by the presence of histological changes specific for acute rejection on screening or protocol biopsy, in the absence of clinical symptoms or signs."
- REF: Ch 6 Background | GRADE: rationale, ungraded | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K16** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: borderline rejection means changes only suspicious for acute rejection on the Banff schema.
- QUOTE: "Borderline acute rejection is defined by histopathological changes that are only 'suspicious for acute rejection' according to the Banff classification schema"
- REF: Ch 6 Background | GRADE: rationale, ungraded | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K17** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: whether to treat borderline acute rejection is controversial.
- QUOTE: "Whether or not to treat borderline acute rejection is controversial."
- REF: Ch 6 Rationale | GRADE: rationale, ungraded | PAGE: PDF 35, printed S22 | SOURCE-MODE: image
- NOTE: Sits beside rec 6.2 (suggest treating, 2D).

**K18** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: one larger trial found protocol biopsies and treatment of subclinical rejection not beneficial in patients on tacrolimus, MMF and corticosteroids.
- QUOTE: "in a larger (N = 218) multicenter RCT in patients on tacrolimus, MMF and corticosteroids, protocol biopsies and treatment of subclinical acute rejection were not beneficial"
- REF: Ch 6 Rationale | GRADE: rationale, ungraded | PAGE: PDF 35, printed S22 | SOURCE-MODE: image
- NOTE: Rationale text, not the graded rec 6.2; see Inconsistencies.

**K19** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: antibody-mediated rejection is defined by donor-specific anti-HLA antibody, C4d staining of peritubular capillaries and compatible histology.
- QUOTE: "staining of peritubular capillaries with C4d (fourth complement fraction); ... the presence of a circulating, anti-HLA, donor-specific antibody"
- REF: Ch 6 Background (criteria list i-iii) | GRADE: rationale, ungraded | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K20** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: optimal treatment protocol for acute antibody-mediated (humoral) rejection remains to be determined; no adequately powered trials compare options.
- QUOTE: "However, the optimal protocol to treat acute humoral rejection remains to be determined."
- REF: Ch 6 Rationale | GRADE: rationale, ungraded | PAGE: PDF 35, printed S22 | SOURCE-MODE: image

**K21** | USE: TEAM | image
- CLAIM: KDIGO 2009: if function does not return to baseline, or declines again after successful treatment, consider repeat biopsy for rejection, BK nephropathy and other causes.
- QUOTE: "a biopsy should be considered to rule out additional rejection, BKV nephropathy and other causes of graft dysfunction."
- REF: Ch 6 Rationale | GRADE: rationale, ungraded | PAGE: PDF 35, printed S22 | SOURCE-MODE: image

**K22** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: acute rejection episode is unresponsive when graft function does not return to baseline after the last treatment dose.
- QUOTE: "A rejection episode is said to be unresponsive to treatment when graft function does not return to baseline after the last dose of treatment."
- REF: Ch 6 Background | GRADE: rationale, ungraded | PAGE: PDF 34, printed S21 | SOURCE-MODE: image

**K23** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: risk of acute rejection is highest in the first 3 months after transplant.
- QUOTE: "Since the risk for acute rejection is highest in the first 3 months after transplantation"
- REF: Ch 2 Background (see also the Immunosuppression section) | GRADE: background, ungraded | PAGE: PDF 23, printed S10 | SOURCE-MODE: image
- NOTE: Only statement on timing of rejection after transplant found; no onset window for antibody-mediated rejection is given.

**K379** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: Table 1 lists acute rejection risk factors studied, including recipient age, donor age, US black ethnicity, HLA mismatches and delayed graft function.
- QUOTE: "Table 1: Risk of acute rejection in multivariate analyses ... Younger recipient age ... Older donor age ... Recipient ethnicity US ... black (vs. white) ... HLA mismatches ... DGF (vs. none)"
- REF: Table 1 | GRADE: table, ungraded | PAGE: PDF 22, printed S9 | SOURCE-MODE: image
- NOTE: Study results in multivariate analyses, not a recommendation; arrows show direction and size of association in each study, some studies show no significant association.

## 2. Kidney allograft dysfunction work-up (61 rows)

**K24** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: recommend kidney allograft biopsy for all patients with declining function of unclear cause, to find reversible causes.
- QUOTE: "We recommend kidney allograft biopsy for all patients with declining kidney function of unclear cause, to detect potentially reversible causes."
- REF: 7.1 | GRADE: 1C | PAGE: PDF 36, printed S23 | SOURCE-MODE: image

**K25** | USE: NODE | image
- CLAIM: KDIGO 2009: some causes of chronic allograft injury may be reversible; patients with acute rejection, BK nephropathy or recurrent disease may respond to treatment.
- QUOTE: "Some causes of CAI may be reversible. Patients found to have acute rejection, BKV nephropathy or recurrent kidney disease, for example, may respond to appropriate treatments."
- REF: Ch 7 Rationale | GRADE: rationale, ungraded | PAGE: PDF 36, printed S23 | SOURCE-MODE: image

**K26** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: chronic allograft injury is a diagnosis of exclusion, with progressive loss of graft function not due to recurrent disease or other recognized causes.
- QUOTE: "CAI is a diagnosis of exclusion characterized by the progressive reduction in graft function not due to recurrence of disease or other recognized causes."
- REF: Ch 7 Background | GRADE: background, ungraded | PAGE: PDF 36, printed S23 | SOURCE-MODE: image

**K27** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: causes of chronic allograft injury include hypertension, CNI toxicity and chronic antibody-mediated rejection, among others.
- QUOTE: "Causes of CAI include hypertension, CNI toxicity, chronic antibody-mediated rejection and others."
- REF: Ch 7 Background | GRADE: background, ungraded | PAGE: PDF 36, printed S23 | SOURCE-MODE: image

**K28** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: histologically, chronic allograft injury is defined by interstitial fibrosis and tubular atrophy.
- QUOTE: "Histologically, CAI is defined by IF/TA"
- REF: Ch 7 Background | GRADE: background, ungraded | PAGE: PDF 36, printed S23 | SOURCE-MODE: image

**K29** | USE: TEAM | image
- CLAIM: KDIGO 2009: for chronic allograft injury with histological CNI toxicity, suggest reducing, withdrawing or replacing the CNI.
- QUOTE: "For patients with CAI and histological evidence of CNI toxicity, we suggest reducing, withdrawing, or replacing the CNI."
- REF: 7.2 | GRADE: 2C | PAGE: PDF 36, printed S23 | SOURCE-MODE: image

**K30** | USE: TEAM | image
- CLAIM: KDIGO 2009: chronic allograft injury with eGFR above 40 and low proteinuria: suggest replacing the CNI with an mTOR inhibitor.
- QUOTE: "For patients with CAI, eGFR >40 mL/min/1.73 m2, and urine total protein excretion <500 mg/g creatinine (or equivalent proteinuria by other measures), we suggest replacing the CNI with a mTORi."
- REF: 7.2.1 | GRADE: 2D | PAGE: PDF 36, printed S23 | SOURCE-MODE: image

**K31** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: among recipients who return to dialysis or need retransplant, chronic allograft injury is the most common cause.
- QUOTE: "Overall, death causes up to 50% of graft failures. However, of those who return to dialysis or require retransplantation, the most common cause is CAI"
- REF: Ch 7 Background | GRADE: background, ungraded | PAGE: PDF 36, printed S23 | SOURCE-MODE: image
- NOTE: Statement is that death causes up to 50% of graft failures; CAI is the most common cause of those returning to dialysis or needing retransplantation.

**K32** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest measuring urine volume every 1-2 hours for at least 24 hours after transplant, then daily until graft function is stable.
- QUOTE: "We suggest measuring urine volume (2C): every 1-2 hours for at least 24 hours after transplantation (2D); daily until graft function is stable. (2D)"
- REF: 8.1 | GRADE: 2C overall; 2D each interval | PAGE: PDF 40, printed S27 | SOURCE-MODE: image

**K33** | USE: NODE | image
- CLAIM: KDIGO 2009: urine output that is inappropriately low or high suggests possible graft dysfunction.
- QUOTE: "Urine output that is inappropriately low, or inappropriately high, is an indication of possible graft dysfunction."
- REF: Ch 8 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 40, printed S27 | SOURCE-MODE: image

**K34** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest measuring urine protein once in month one, every 3 months in year one, then annually.
- QUOTE: "We suggest measuring urine protein excretion, (2C) at least: once in the first month to determine a baseline (2D); every 3 months during the first year (2D); annually, thereafter. (2D)"
- REF: 8.2 | GRADE: 2C overall; 2D each interval | PAGE: PDF 40, printed S27 | SOURCE-MODE: image

**K35** | USE: TEAM | image
- CLAIM: KDIGO 2009: recommend serum creatinine at least daily for 7 days or until discharge, then 2-3 times weekly in weeks 2-4.
- QUOTE: "We recommend measuring serum creatinine, (1B) at least: daily for 7 days or until hospital discharge, whichever occurs sooner (2C); two to three times per week for weeks 2-4 (2C);"
- REF: 8.3 | GRADE: 1B overall; 2C each interval | PAGE: PDF 40, printed S27 | SOURCE-MODE: image

**K36** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: recommend serum creatinine also weekly months 2-3, every 2 weeks months 4-6, monthly months 7-12, then every 2-3 months.
- QUOTE: "weekly for months 2 and 3 (2C); every 2 weeks for months 4-6 (2C); monthly for months 7-12 (2C); every 2-3 months, thereafter. (2C)"
- REF: 8.3 | GRADE: 1B overall; 2C each interval | PAGE: PDF 40, printed S27 | SOURCE-MODE: image

**K37** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest estimating GFR whenever serum creatinine is measured, using a formula validated for adults.
- QUOTE: "We suggest estimating GFR whenever serum creatinine is measured, (2D) using: one of several formulas validated for adults (2C);"
- REF: 8.3.1 | GRADE: 2D | PAGE: PDF 40, printed S27 | SOURCE-MODE: image

**K38** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: suggest kidney allograft ultrasound as part of assessing graft dysfunction.
- QUOTE: "We suggest including a kidney allograft ultrasound examination as part of the assessment of kidney allograft dysfunction."
- REF: 8.4 | GRADE: 2C | PAGE: PDF 40, printed S27 | SOURCE-MODE: image

**K39** | USE: NODE | image
- CLAIM: KDIGO 2009: ultrasound is relatively inexpensive and reasonably accurate for diagnosing treatable causes of graft dysfunction.
- QUOTE: "Ultrasound is relatively inexpensive and reasonably accurate for diagnosing treatable causes of kidney allograft dysfunction."
- REF: Ch 8 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 40, printed S27 | SOURCE-MODE: image

**K40** | USE: NODE | image
- CLAIM: KDIGO 2009: serum creatinine and urine protein are readily available and useful for detecting acute and chronic graft dysfunction.
- QUOTE: "Serum creatinine and urine protein measurements are readily available and are useful for detecting acute and chronic allograft dysfunction."
- REF: Ch 8 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 40, printed S27 | SOURCE-MODE: image

**K41** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: causes needing rapid treatment: acute rejection, obstruction, urine leak, vascular compromise, some recurrent diseases such as FSGS.
- QUOTE: "Causes of kidney allograft dysfunction that require rapid intervention for treatment to be effective include acute rejection, obstruction, urine leak, vascular compromise and some recurrent diseases, for example focal segmental glomerulosclerosis (FSGS)."
- REF: Ch 8 Rationale (Serum creatinine) | GRADE: rationale, ungraded | PAGE: PDF 40, printed S27 | SOURCE-MODE: image

**K42** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: those rapid-treatment causes are more common in the first days to weeks after transplant than in later months to years.
- QUOTE: "These causes are more common in the first few days to weeks after kidney ... transplantation than in subsequent months to years."
- REF: Ch 8 Rationale (Serum creatinine) | GRADE: rationale, ungraded | PAGE: PDF 40-41, printed S27-S28 | SOURCE-MODE: image
- NOTE: Sentence is the first line of the left column on PDF 41 (S28); the sentence before it begins on PDF 40.

**K43** | USE: NODE | image
- CLAIM: KDIGO 2009: a gradual creatinine rise after year one may be rejection but is more often chronic allograft injury, recurrent disease or new kidney disease.
- QUOTE: "A gradual increase in serum creatinine after the first year may be due to acute rejection, but more often is caused by CAI, recurrence of the original kidney disease, or de novo kidney disease."
- REF: Ch 8 Rationale | GRADE: rationale, ungraded | PAGE: PDF 41, printed S28 | SOURCE-MODE: image

**K44** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: serum creatinine is less reliable for detecting chronic changes over months to years.
- QUOTE: "Unfortunately, serum creatinine is less reliable for detecting chronic changes (over months to years) in kidney function."
- REF: Ch 8 Rationale | GRADE: rationale, ungraded | PAGE: PDF 41, printed S28 | SOURCE-MODE: image

**K45** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: proteinuria causes after transplant include acute rejection, thrombotic microangiopathy, chronic allograft injury and transplant glomerulopathy.
- QUOTE: "Allograft rejection and drug toxicity Acute rejection Thrombotic microangiopathy CAI Transplant glomerulopathy"
- REF: Table 5 | GRADE: table, ungraded | PAGE: PDF 41, printed S28 | SOURCE-MODE: image
- NOTE: Table 5 also lists persistent native-kidney disease and de novo or recurrent glomerular diseases (e.g. IgA, membranous, FSGS, vasculitis, lupus, diabetic nephropathy, TTP, HUS).

**K46** | USE: NODE | image
- CLAIM: KDIGO 2009: proteinuria is an early and sensitive marker of kidney damage, and many causes are potentially reversible.
- QUOTE: "Proteinuria is an early and sensitive marker of kidney damage in CKD (121). Many causes of proteinuria are potentially reversible with appropriate treatment"
- REF: Ch 8 Rationale (Urine protein excretion) | GRADE: rationale, ungraded | PAGE: PDF 40, printed S27 | SOURCE-MODE: image

**K47** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: measuring GFR with inulin, iohexol or similar markers is most accurate but not recommended for routine care.
- QUOTE: "the Work Group did not recommend their use in routine clinical practice due to cost, low patient acceptance, and lack of availability outside of academic medical centers."
- REF: Ch 8 Rationale | GRADE: rationale, ungraded | PAGE: PDF 41, printed S28 | SOURCE-MODE: image

**K48** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: the routine screening table says to screen for BKV by plasma NAT, and for EBV in patients with no EBV antibody at transplant.
- QUOTE: "Screen for BKV using plasma NAT ... Screen for EBV using plasma NAT in patients with no antibody to EBV at transplant."
- REF: Table 4 footnotes g and h | GRADE: table, ungraded | PAGE: PDF 41, printed S28 | SOURCE-MODE: image
- NOTE: The BKV and EBV table cells are drawn with dotted fills across columns; only the footnotes are quoted. For BK schedule use the 2024 consensus.

**K49** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: recommend allograft biopsy for a persistent, unexplained increase in serum creatinine.
- QUOTE: "We recommend kidney allograft biopsy when there is a persistent, unexplained increase in serum creatinine."
- REF: 9.1 | GRADE: 1C | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K50** | USE: NODE | image
- CLAIM: KDIGO 2009: suggest biopsy when creatinine has not returned to baseline after treatment of acute rejection.
- QUOTE: "We suggest kidney allograft biopsy when serum creatinine has not returned to baseline after treatment of acute rejection."
- REF: 9.2 | GRADE: 2D | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K51** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest biopsy every 7-10 days during delayed graft function.
- QUOTE: "We suggest kidney allograft biopsy every 7-10 days during delayed function."
- REF: 9.3 | GRADE: 2C | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K52** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest biopsy if expected kidney function is not achieved within the first 1-2 months after transplantation.
- QUOTE: "We suggest kidney allograft biopsy if expected kidney function is not achieved within the first 1-2 months after transplantation."
- REF: 9.4 | GRADE: 2D | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K53** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: suggest biopsy for new-onset proteinuria, or unexplained proteinuria of 3.0 g/g creatinine or 3.0 g per 24 hours or more.
- QUOTE: "We suggest kidney allograft biopsy when there is: new onset of proteinuria (2C); unexplained proteinuria >=3.0 g/g creatinine or >=3.0 g per 24 hours. (2C)"
- REF: 9.5 | GRADE: 2C | PAGE: PDF 43, printed S30 | SOURCE-MODE: image
- NOTE: Printed with the greater-than-or-equal symbol.

**K54** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: delayed graft function means function low enough to need dialysis in the first week, or no improvement from pretransplant function.
- QUOTE: "DGF is graft function low enough to require dialysis in the first week after kidney transplantation, or lack of improvement in pretransplant kidney function."
- REF: Ch 9 Background | GRADE: background, ungraded | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K55** | USE: NODE | image
- CLAIM: KDIGO 2009: new-onset proteinuria may indicate treatable causes of graft dysfunction, including acute rejection and thrombotic microangiopathy.
- QUOTE: "New-onset proteinuria (defined in Table 6) may indicate treatable causes of graft dysfunction, including acute rejection and thrombotic microangiopathy."
- REF: Ch 9 Background | GRADE: background, ungraded | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K56** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: a creatinine rise not explained by dehydration, obstruction, high CNI levels or other apparent causes most likely reflects an intragraft process.
- QUOTE: "Increased serum creatinine that is not explained by dehydration, urinary obstruction, high CNI levels or other apparent causes is most likely due to an intragraft parenchymal process"
- REF: Ch 9 Rationale | GRADE: rationale, ungraded | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K57** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: dehydration, urinary obstruction and acute CNI toxicity (by showing high blood levels) should be ruled out before biopsy.
- QUOTE: "Causes of acute, reversible declines in GFR should be ruled out, including dehydration, urinary obstruction or acute CNI toxicity (by demonstrating high blood levels), before a biopsy is performed."
- REF: Ch 9 Rationale (Biopsies for an increase in serum creatinine) | GRADE: rationale, ungraded | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K58** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: only a persistent creatinine rise outside normal variability counts; studies often use a 25-50% rise over baseline.
- QUOTE: "only a persistent increase that is outside this normal, but poorly defined, range is clinically relevant. A 25-50% increase over baseline is often arbitrarily used in studies."
- REF: Ch 9 Rationale | GRADE: rationale, ungraded | PAGE: PDF 43, printed S30 | SOURCE-MODE: image
- NOTE: The only numeric creatinine-rise figures in the guideline (with the next row and Table 7). Not a recommendation threshold.

**K59** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: one study suggested a persistent 30% creatinine rise was an excellent predictor of later graft failure.
- QUOTE: "At least one study suggested that a persistent 30% rise in serum creatinine was an excellent predictor of subsequent graft failure"
- REF: Ch 9 Rationale | GRADE: rationale, ungraded | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K60** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: its acute kidney injury table defines an abrupt creatinine rise as 0.3 mg/dL or more, or 50% or more, within 48 hours.
- QUOTE: "An abrupt (within 48 h) reduction in kidney function currently defined as an absolute increase in serum creatinine of >=0.3 mg/dL ... a percentage increase in serum creatinine of >=50% (1.5-fold from baseline)"
- REF: Table 7 (Acute Kidney Injury Network criteria, adapted) | GRADE: table, ungraded | PAGE: PDF 44, printed S31 | SOURCE-MODE: image
- NOTE: Printed with the greater-than-or-equal symbol; table criteria are for acute kidney injury in general, not specific to rejection. Quote is 51 words in full; trimmed in the checked file.

**K61** | USE: NODE | image
- CLAIM: KDIGO 2009: in delayed graft function, a change in serum creatinine is not useful for ruling out acute rejection; protocol biopsies are needed.
- QUOTE: "In patients with DGF, change in serum creatinine is not useful for ruling out acute rejection, and protocol biopsies are needed to rule out acute rejection."
- REF: Ch 9 Rationale | GRADE: rationale, ungraded | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K62** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: acute rejection during delayed graft function is more frequent than without delayed graft function.
- QUOTE: "the incidence of acute rejection during DGF is higher than in patients without DGF"
- REF: Ch 9 Rationale (Biopsies for DGF) | GRADE: rationale, ungraded | PAGE: PDF 44, printed S31 | SOURCE-MODE: image

**K63** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: a biopsy may no longer be needed when delayed graft function is resolving, for example urine output rising rapidly or creatinine falling.
- QUOTE: "A biopsy may no longer be needed when there are signs that DGF is resolving, for example when urine output is increasing rapidly or serum creatinine is declining."
- REF: Ch 9 Rationale (Biopsies for DGF) | GRADE: rationale, ungraded | PAGE: PDF 44, printed S31 | SOURCE-MODE: image

**K64** | USE: TEAM | image
- CLAIM: KDIGO 2009: patients should be assessed for suitability for biopsy; biopsies may be hazardous with a bleeding diathesis, large fluid collections or infection.
- QUOTE: "Patients should always be assessed for their suitability for biopsy before undertaking the procedure. Biopsies may be hazardous in those with a bleeding diathesis, or in the presence of large fluid collections or infection."
- REF: Ch 9 Rationale | GRADE: rationale, ungraded | PAGE: PDF 44, printed S31 | SOURCE-MODE: image

**K65** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: reported risk of major protocol-biopsy complications (bleeding, hematuria with ureteric obstruction, peritonitis, graft loss) is approximately 1%.
- QUOTE: "The reported risk of major complications from protocol biopsy, including substantial bleeding, macroscopic hematuria with ureteric obstruction, peritonitis or graft loss, is approximately 1%"
- REF: Ch 9 Rationale | GRADE: rationale, ungraded | PAGE: PDF 45, printed S32 | SOURCE-MODE: image
- NOTE: Second half of the claim (4 hours) comes from: "all of the complications became evident in the first 4 h after the biopsy"; claim kept to the 1% figure in the quote.

**K66** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: different rejection types need different treatment; cellular rejection is usually treated with steroid pulses, antibody-mediated rejection may need added specific treatments.
- QUOTE: "acute cellular rejection is usually treated with steroid pulses, but acute antibody-mediated rejection may prompt the use of specific treatments in addition to steroids."
- REF: Ch 9 Rationale | GRADE: rationale, ungraded | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K67** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: failure of function to return to baseline could mean a new process such as acute tubular necrosis, drug toxicity or BK nephropathy.
- QUOTE: "a failure of function to return to baseline could be due to a new pathological process, such as coexistent acute tubular necrosis, drug toxicity or BKV nephropathy"
- REF: Ch 9 Rationale | GRADE: rationale, ungraded | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K68** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: biopsy findings can include infiltration with posttransplant lymphoproliferative disease among treatable causes of graft dysfunction.
- QUOTE: "including rejection, infections like BKV nephropathy, recurrent or de novo kidney disease or infiltration with posttransplant lymphoproliferative disease (PTLD)."
- REF: Ch 9 Rationale | GRADE: rationale, ungraded | PAGE: PDF 43, printed S30 | SOURCE-MODE: image

**K69** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: acute rejection, chronic allograft injury and CNI toxicity can occur without a measurable decline in kidney function.
- QUOTE: "Acute rejection, CAI and CNI toxicity can occur in the absence of a measurable decline in kidney function."
- REF: Ch 9 Rationale (Protocol biopsies) | GRADE: rationale, ungraded | PAGE: PDF 44, printed S31 | SOURCE-MODE: image

**K70** | USE: NODE | image
- CLAIM: KDIGO 2009: recurrent kidney disease may present as raised creatinine (reduced GFR), new or increased proteinuria, and/or hematuria.
- QUOTE: "Recurrence may present as increased serum creatinine (reduced GFR), new-onset or increased proteinuria and/or hematuria."
- REF: Ch 10 Rationale | GRADE: rationale, ungraded | PAGE: PDF 46, printed S33 | SOURCE-MODE: image

**K71** | USE: NODE | image
- CLAIM: KDIGO 2009: focal segmental glomerulosclerosis, hemolytic-uremic syndrome and oxalosis may recur in the first days to weeks after transplantation.
- QUOTE: "FSGS, HUS and oxalosis may recur in the first few days to weeks after transplantation, whereas the timing is variable in the others"
- REF: Ch 10 Rationale | GRADE: rationale, ungraded | PAGE: PDF 46, printed S33 | SOURCE-MODE: image

**K72** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest screening for proteinuria in primary FSGS at least daily for 1 week, weekly for 4 weeks, every 3 months in year one.
- QUOTE: "We suggest screening KTRs with primary kidney disease caused by FSGS for proteinuria (2C) at least: daily for 1 week (2D); weekly for 4 weeks (2D); every 3 months, for the first year (2D); every year, thereafter. (2D)"
- REF: 10.1 | GRADE: 2C overall; 2D each interval | PAGE: PDF 46, printed S33 | SOURCE-MODE: image

**K73** | USE: NODE | image
- CLAIM: KDIGO 2009: during graft dysfunction in recipients with primary hemolytic-uremic syndrome, suggest screening for thrombotic microangiopathy (platelets, smear, haptoglobin, LDH).
- QUOTE: "During episodes of graft dysfunction in patients with primary HUS, we suggest screening for thrombotic microangiopathy (e.g. with platelet count, peripheral smear for blood cell morphology, plasma haptoglobin, and serum lactate dehydrogenase)."
- REF: 10.3 | GRADE: 2D | PAGE: PDF 46, printed S33 | SOURCE-MODE: image

**K74** | USE: TEAM | image
- CLAIM: KDIGO 2009: when screening suggests possible treatable recurrent disease, suggest obtaining an allograft biopsy.
- QUOTE: "When screening suggests possible treatable recurrent disease, we suggest obtaining an allograft biopsy."
- REF: 10.4 | GRADE: 2C | PAGE: PDF 46, printed S33 | SOURCE-MODE: image

**K75** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest plasma exchange for primary FSGS recurrence if biopsy shows minimal change disease or FSGS.
- QUOTE: "We suggest plasma exchange if a biopsy shows minimal change disease or FSGS in those with primary FSGS as their primary kidney disease."
- REF: 10.5.1 | GRADE: 2D | PAGE: PDF 46, printed S33 | SOURCE-MODE: image

**K76** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest high-dose corticosteroids and cyclophosphamide for recurrent ANCA vasculitis or anti-GBM disease.
- QUOTE: "We suggest high-dose corticosteroids and cyclophosphamide in patients with recurrent ANCA-associated vasculitis or anti-GBM disease."
- REF: 10.5.2 | GRADE: 2D | PAGE: PDF 46, printed S33 | SOURCE-MODE: image

**K77** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest an ACE inhibitor or ARB for recurrent glomerulonephritis with proteinuria.
- QUOTE: "We suggest using an ACE-I or an ARB for patients with recurrent glomerulonephritis and proteinuria."
- REF: 10.5.3 | GRADE: 2C | PAGE: PDF 46, printed S33 | SOURCE-MODE: image

**K78** | USE: TEAM | image
- CLAIM: KDIGO 2009: for primary hyperoxaluria, suggest measures including pyridoxine, high-calcium low-oxalate diet, alkalinizing citrate, orthophosphate, magnesium oxide and intensive hemodialysis.
- QUOTE: "For KTRs with primary hyperoxaluria, we suggest appropriate measures to prevent oxalate deposition until plasma and urine oxalate levels are normal (2C), including: pyridoxine (2C); high calcium and low oxalate diet (2C); ... intensive hemodialysis to remove oxalate. (2C)"
- REF: 10.5.4 | GRADE: 2C | PAGE: PDF 46, printed S33 | SOURCE-MODE: image

**K79** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: idiopathic FSGS recurs in 20-50% of recipients, up to 80% if it recurred in a prior transplant.
- QUOTE: "Idiopathic FSGS recurs in 20-50% of KTRs (up to 80% if it has recurred in a prior kidney transplant)"
- REF: Ch 10 Rationale (Idiopathic FSGS) | GRADE: rationale, ungraded | PAGE: PDF 47, printed S34 | SOURCE-MODE: image
- NOTE: The 4-week figure is in the same section: "About 80% of cases recur in the first 4 weeks (193)."

**K80** | USE: NODE | image
- CLAIM: KDIGO 2009: recurrent FSGS presents with proteinuria, which is usually heavy.
- QUOTE: "Recurrent disease presents with proteinuria, which is usually heavy."
- REF: Ch 10 Rationale (Idiopathic FSGS) | GRADE: rationale, ungraded | PAGE: PDF 47, printed S34 | SOURCE-MODE: image

**K81** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: proteinuria or reduced GFR usually gives the first reason to suspect recurrent kidney disease.
- QUOTE: "In a majority of instances, proteinuria and/or reduced GFR provide the initial basis for suspecting disease recurrence."
- REF: Ch 10 Rationale | GRADE: rationale, ungraded | PAGE: PDF 47, printed S34 | SOURCE-MODE: image

**K82** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: for hemolytic-uremic syndrome the screening table lists proteinuria and platelet count, then platelet count, smear and LDH during graft dysfunction.
- QUOTE: "HUS ... Proteinuria, platelet count ... During episodes of graft ... dysfunction ... Platelet count, peripheral ... blood smear, LDH ... Plasmapheresis"
- REF: Table 8 (HUS row quoted) | GRADE: table, ungraded | PAGE: PDF 47, printed S34 | SOURCE-MODE: image

**K83** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: proteinuria definitions: 24-hour total protein 300 mg/day or more, spot protein-to-creatinine 200 mg/g or more, or dipstick 30 mg/dL or more in adults.
- QUOTE: "Total protein 24-h excretion <300 mg/day (adults) NA >=300 mg/day (adults)"
- REF: Table 6 | GRADE: table, ungraded | PAGE: PDF 42, printed S29 | SOURCE-MODE: image
- NOTE: Table also gives spot protein-to-creatinine 200 mg/g or more and dipstick 30 mg/dL or more as clinical proteinuria in adults; the quote checked is the 24-hour row. Printed with the greater-than-or-equal symbol.

**K380** | USE: NODE | text
- CLAIM: KDIGO 2009: during delayed graft function treated with dialysis, kidney function cannot be the indication for biopsy to diagnose superimposed acute rejection.
- QUOTE: "Kidney function cannot be used as an indication for biopsy to diagnose superimposed acute rejection while the patients are already being treated with dialysis due to DGF"
- REF: Ch 9 Rationale (Biopsies for DGF) | GRADE: rationale, ungraded | PAGE: PDF 44, printed S31 | SOURCE-MODE: text
- NOTE: Same paragraph: periodic biopsies during delayed graft function are prudent (see the graded suggestion 9.3, 2C).

## 3. Obstruction, vascular and surgical complications (6 rows)

**What KDIGO covers here and what it does not.** KDIGO 2009 has no section on ureteric obstruction, urine leak, lymphocele, renal artery stenosis or graft thrombosis. These terms appear only in lists: the causes of graft dysfunction that need rapid intervention (K41, section 2), the conditions ultrasound can diagnose (below), and one paragraph on vascular imaging for hard-to-control hypertension (below). The guideline says nothing about how to treat any of them, and the word "lymphocele" does not appear (text search of PDF pages 14-124).

**K84** | USE: SUMMARY-CANDIDATE | text
- CLAIM: KDIGO 2009: ultrasound can diagnose arterial occlusion, venous thrombosis, urinary obstruction, urine leak, perinephric hematoma and post-biopsy arteriovenous fistula.
- QUOTE: "Many of the most common causes of allograft dysfunction, other than rejection, can be diagnosed by ultrasound. These include arterial occlusion, venous thrombosis, urinary obstruction, a urine leak (large fluid collection), compressing perinephric hematoma and arteriovenous fistula ..."
- REF: Ch 8 Rationale (Kidney allograft ultrasound examination) | GRADE: rationale, ungraded | PAGE: PDF 42, printed S29 | SOURCE-MODE: text
- NOTE: This is the guideline's only list of obstruction and vascular causes. It gives no management for any of them.

**K85** | USE: NODE | text
- CLAIM: KDIGO 2009: mild to moderate calyceal distension can be normal in a kidney allograft, so a baseline ultrasound may help later comparison.
- QUOTE: "In the kidney allograft, mild to moderate calyceal distension can be normal, so a baseline ultrasound examination when kidney function is normal may be useful to compare to subsequent ultrasound examinations for allograft dysfunction."
- REF: Ch 8 Rationale (ultrasound) | GRADE: rationale, ungraded | PAGE: PDF 42, printed S29 | SOURCE-MODE: text

**K86** | USE: OVERLAY | text
- CLAIM: KDIGO 2009: ANCA vasculitis relapse in the allograft can affect function through acute arteritis, ureteral stenosis and obstructive uropathy.
- QUOTE: "graft function can also be affected by acute arteritis, ureteral stenosis and obstructive uropathy due to granulomatous vasculitis."
- REF: Ch 10 Rationale (ANCA vasculitis) | GRADE: rationale, ungraded | PAGE: PDF 49, printed S36 | SOURCE-MODE: text

**K87** | USE: OVERLAY | text
- CLAIM: KDIGO 2009: risk factors reported for erythrocytosis include renal artery stenosis and hydronephrosis.
- QUOTE: "Identified clinical risk factors that have been reported include male gender, polycystic kidney disease, smoking, immunosuppression, reduced kidney function, absence of rejection, renal artery stenosis, hydronephrosis, hypercalcemia"
- REF: Ch 22 Rationale (Erythrocytosis) | GRADE: rationale, ungraded | PAGE: PDF 113, printed S100 | SOURCE-MODE: text
- NOTE: Only mention of renal artery stenosis or hydronephrosis in the guideline; not a vascular-complication section.

**K88** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: when hypertension is hard to control, especially with unexplained graft dysfunction, consider screening for vascular compromise (within or proximal to the allograft artery).
- QUOTE: "When hypertension is difficult to control, especially when it is associated with otherwise unexplained kidney allograft dysfunction, screening for allograft vascular compromise, within or proximal to the allograft artery, should be considered."
- REF: Ch 16.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 86, printed S73 | SOURCE-MODE: image
- NOTE: Closest the guideline comes to renal artery stenosis. No management is given.

**K89** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: screening for allograft vascular compromise usually needs an angiogram, CT angiography or magnetic resonance imaging of the allograft vasculature.
- QUOTE: "This usually requires imaging of the allograft vasculature using either an angiogram, computerized tomographic angiography or magnetic resonance imaging."
- REF: Ch 16.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 86, printed S73 | SOURCE-MODE: image
- NOTE: The guideline says nothing about contrast safety in recipients.

## 4. Infection (111 rows)

**K90** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: recommend all recipients get approved inactivated vaccines on general-population schedules, except hepatitis B vaccination, which has its own statement.
- QUOTE: "We recommend giving all KTRs approved, inactivated vaccines, according to recommended schedules for the general population, except for HBV vaccination."
- REF: 12.1 | GRADE: 1D | PAGE: PDF 54, printed S41 | SOURCE-MODE: image

**K91** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: suggest avoiding live vaccines in kidney recipients.
- QUOTE: "We suggest avoiding live vaccines in KTRs."
- REF: 12.2 | GRADE: 2C | PAGE: PDF 54, printed S41 | SOURCE-MODE: image

**K92** | USE: NODE | image
- CLAIM: KDIGO 2009: suggest avoiding vaccinations except influenza in the first 6 months after kidney transplantation.
- QUOTE: "We suggest avoiding vaccinations, except influenza vaccination, in the first 6 months following kidney transplantation."
- REF: 12.3 | GRADE: 2C | PAGE: PDF 54, printed S41 | SOURCE-MODE: image

**K93** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest resuming immunizations once patients are on minimal maintenance doses of immunosuppressants.
- QUOTE: "We suggest resuming immunizations once patients are receiving minimal maintenance doses of immunosuppressive medications."
- REF: 12.3.1 | GRADE: 2C | PAGE: PDF 54, printed S41 | SOURCE-MODE: image

**K94** | USE: NODE | image
- CLAIM: KDIGO 2009: recommend yearly influenza vaccine, from 1 month after transplant, before the season, regardless of immunosuppression level.
- QUOTE: "We recommend giving all KTRs, who are at least 1-month post-transplant, influenza vaccination prior to the onset of the annual influenza season, regardless of status of immunosuppression."
- REF: 12.3.2 | GRADE: 1C | PAGE: PDF 54, printed S41 | SOURCE-MODE: image

**K95** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest rabies, tick-borne encephalitis, inactivated Japanese B encephalitis, meningococcus, pneumococcus and inactivated typhoid vaccines for recipients at increased risk.
- QUOTE: "We suggest giving the following vaccines to KTRs who, due to age, direct exposure, residence or travel to endemic areas, or other epidemiological risk factors are at increased risk for the specific diseases:"
- REF: 12.4 | GRADE: 2D | PAGE: PDF 54, printed S41 | SOURCE-MODE: image
- NOTE: Printed list (each 2D): rabies; tick-borne meningoencephalitis; Japanese B encephalitis (inactivated); Meningococcus; Pneumococcus; Salmonella typhi (inactivated).

**K96** | USE: NODE | image
- CLAIM: KDIGO 2009: serious infection can result from live vaccines in immunocompromised patients, including kidney recipients.
- QUOTE: "Serious infection can result from live vaccines in immunocompromised patients, including KTRs."
- REF: Ch 12 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 54, printed S41 | SOURCE-MODE: image

**K97** | USE: NODE | image
- CLAIM: KDIGO 2009: without adequate safety data, assume the harm of live vaccines outweighs their benefits in kidney recipients.
- QUOTE: "In the absence of adequate safety data to the contrary, it should be assumed that the harm of live vaccines outweigh their benefits in KTRs."
- REF: Ch 12 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 54, printed S41 | SOURCE-MODE: image

**K98** | USE: NODE | image
- CLAIM: KDIGO 2009: contraindicated-vaccine table lists varicella zoster, BCG, smallpox, intranasal influenza, oral typhoid, measles, mumps, rubella, oral polio, live Japanese B and yellow fever.
- QUOTE: "Varicella zoster BCG Smallpox Intranasal influenza Live oral typhoid Ty21a and other newer vaccines Measles (except during an outbreak) Mumps Rubella Oral polio Live Japanese B encephalitis vaccine Yellow fever"
- REF: Table 13 (Contraindicated vaccinations after transplantation) | GRADE: table, ungraded | PAGE: PDF 55, printed S42 | SOURCE-MODE: image
- NOTE: The table says "contraindicated", while rec 12.2 is a graded suggestion (2C) to avoid live vaccines; see Inconsistencies.

**K99** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: recommended vaccines table lists diphtheria-pertussis-tetanus, Haemophilus influenzae B, hepatitis A, hepatitis B, pneumococcal, inactivated polio, influenza, meningococcus and typhoid Vi.
- QUOTE: "Diphtheria-pertussis-tetanus Haemophilus influenza B Hepatitis A ... Hepatitis B Pneumovax Inactivated polio Influenza types A and B (administer annually) Meningococcus: administer if recipient is in high risk"
- REF: Table 12 (Recommended vaccines after kidney transplantation) | GRADE: table, ungraded | PAGE: PDF 55, printed S42 | SOURCE-MODE: image

**K100** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: inactivated vaccines are safe on available evidence, and there is no evidence that vaccination increases rejection risk.
- QUOTE: "available evidence suggests that inactivated vaccines are safe. There is no evidence that vaccinations lead to an increased risk of rejection."
- REF: Ch 12 Rationale | GRADE: rationale, ungraded | PAGE: PDF 55, printed S42 | SOURCE-MODE: image

**K101** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest hepatitis B vaccination, ideally before transplant, with surface antibody titers 6-12 weeks after the series.
- QUOTE: "We suggest HBV vaccination (ideally prior to transplantation) and HBsAb titers 6-12 weeks after completing the vaccination series."
- REF: 12.1.1 | GRADE: 2D | PAGE: PDF 54, printed S41 | SOURCE-MODE: image

**K102** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest annual hepatitis B surface antibody titers, and revaccination if the titer falls below 10 mIU/mL.
- QUOTE: "We suggest annual HBsAb titers. (2D) 12.1.1.2: We suggest revaccination if the antibody titer falls below 10 mIU/mL."
- REF: 12.1.1.1 and 12.1.1.2 | GRADE: 2D | PAGE: PDF 54, printed S41 | SOURCE-MODE: image

**K103** | USE: TEAM | image
- CLAIM: KDIGO 2009: consult an infectious disease specialist, travel clinic or public health official on whether specific cases warrant travel-type vaccines.
- QUOTE: "Consult an infectious disease specialist, a travel clinic or public health official for guidance on whether specific cases warrant these vaccinations."
- REF: 12.4.1 | GRADE: Not Graded | PAGE: PDF 54, printed S41 | SOURCE-MODE: image

**K104** | USE: TEAM | image
- CLAIM: KDIGO 2009 BK: suggest quantitative plasma NAT screening monthly for the first 3-6 months, then every 3 months to the end of year one.
- QUOTE: "We suggest screening all KTRs for BKV with quantitative plasma NAT (2C) at least: monthly for the first 3-6 months after transplantation (2D); then every 3 months until the end of the first post-transplant year (2D);"
- REF: 13.1.1 | GRADE: 2C overall; 2D each interval | PAGE: PDF 57, printed S44 | SOURCE-MODE: image
- NOTE: Differs from the 2024 BK consensus schedule (monthly to month 9, then every 3 months to 2 years); see DIFFERS.

**K105** | USE: NODE | image
- CLAIM: KDIGO 2009 BK: also screen whenever there is an unexplained rise in serum creatinine, and after treatment for acute rejection.
- QUOTE: "whenever there is an unexplained rise in serum creatinine (2D); and after treatment for acute rejection. (2D)"
- REF: 13.1.1 (third and fourth bullets) | GRADE: 2D | PAGE: PDF 57, printed S44 | SOURCE-MODE: image

**K106** | USE: TEAM | image
- CLAIM: KDIGO 2009 BK: suggest reducing immunosuppression when plasma BK NAT is persistently greater than 10 000 copies/mL.
- QUOTE: "We suggest reducing immunosuppressive medications when BKV plasma NAT is persistently greater than 10 000 copies/mL (107 copies/L)."
- REF: 13.1.2 | GRADE: 2D | PAGE: PDF 57, printed S44 | SOURCE-MODE: image
- NOTE: The printed "107" is 10 to the power 7 copies/L. Differs from the 2024 BK consensus thresholds; see DIFFERS.

**K107** | USE: NODE | image
- CLAIM: KDIGO 2009 BK: histologic BK nephropathy may be present without a raised serum creatinine.
- QUOTE: "Histologic evidence of BKV nephropathy may be present in the absence of elevated serum creatinine."
- REF: Ch 13.1 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 57, printed S44 | SOURCE-MODE: image

**K108** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 BK: reducing maintenance immunosuppression is the best treatment for BK nephropathy.
- QUOTE: "Reduction in maintenance immunosuppressive medication is the best treatment for BKV nephropathy."
- REF: Ch 13.1 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 57, printed S44 | SOURCE-MODE: image
- NOTE: The 2024 BK consensus says there are no effective antivirals (evidence/bk.md item 5.1); consistent in direction.

**K109** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 BK: 95% of BK nephropathy occurs in the first 2 years after kidney transplantation.
- QUOTE: "Ninety-five percent of BKV nephropathy occurs in the first 2 years after kidney transplantation."
- REF: Ch 13.1 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 57, printed S44 | SOURCE-MODE: image

**K110** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 BK: suggest nucleic acid testing be done on plasma, not urine.
- QUOTE: "it is suggested that NAT be performed on plasma, and not the urine of KTRs."
- REF: Ch 13.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 57, printed S44 | SOURCE-MODE: image

**K111** | USE: TEAM | image
- CLAIM: KDIGO 2009 CMV: recommend chemoprophylaxis with oral ganciclovir or valganciclovir for at least 3 months after transplant, except when donor and recipient are both CMV-negative.
- QUOTE: "We recommend that KTRs (except when donor and recipient both have negative CMV serologies) receive chemoprophylaxis for CMV infection with oral ganciclovir or valganciclovir for at least 3 months after transplantation,"
- REF: 13.2.1 | GRADE: 1B | PAGE: PDF 59, printed S46 | SOURCE-MODE: image

**K112** | USE: TEAM | image
- CLAIM: KDIGO 2009 CMV: recommend chemoprophylaxis for 6 weeks after treatment with a T-cell-depleting antibody.
- QUOTE: "and for 6 weeks after treatment with a T-cell-depleting antibody."
- REF: 13.2.1 | GRADE: 1C | PAGE: PDF 59, printed S46 | SOURCE-MODE: image

**K113** | USE: TEAM | image
- CLAIM: KDIGO 2009 CMV: in CMV disease, suggest weekly CMV monitoring by NAT or pp65 antigenemia.
- QUOTE: "In patients with CMV disease, we suggest weekly monitoring of CMV by NAT or pp65 antigenemia."
- REF: 13.2.2 | GRADE: 2D | PAGE: PDF 59, printed S46 | SOURCE-MODE: image

**K114** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009 CMV: recommend intravenous ganciclovir for all patients with serious CMV disease, including most tissue-invasive disease.
- QUOTE: "We recommend that all patients with serious (including most patients with tissue invasive) CMV disease be treated with intravenous ganciclovir."
- REF: 13.2.3.1 | GRADE: 1D | PAGE: PDF 59, printed S46 | SOURCE-MODE: image
- NOTE: Names a drug but gives no dose.

**K115** | USE: TEAM | image
- CLAIM: KDIGO 2009 CMV: for adult CMV disease that is not serious, recommend intravenous ganciclovir or oral valganciclovir.
- QUOTE: "We recommend that CMV disease in adult KTRs that is not serious (e.g. episodes that are associated with mild clinical symptoms) be treated with either intravenous ganciclovir or oral valganciclovir."
- REF: 13.2.3.2 | GRADE: 1D | PAGE: PDF 59, printed S46 | SOURCE-MODE: image

**K116** | USE: TEAM | image
- CLAIM: KDIGO 2009 CMV: suggest continuing therapy until CMV is no longer detectable by plasma NAT or pp65 antigenemia.
- QUOTE: "We suggest continuing therapy until CMV is no longer detectable by plasma NAT or pp65 antigenemia."
- REF: 13.2.3.4 | GRADE: 2D | PAGE: PDF 59, printed S46 | SOURCE-MODE: image

**K117** | USE: TEAM | image
- CLAIM: KDIGO 2009 CMV: suggest reducing immunosuppression in life-threatening CMV disease, and CMV disease persisting despite treatment, until it has resolved.
- QUOTE: "We suggest reducing immunosuppressive medication in life-threatening CMV disease, and CMV disease that persists in the face of treatment, until CMV disease has resolved."
- REF: 13.2.4 | GRADE: 2D | PAGE: PDF 59, printed S46 | SOURCE-MODE: image

**K118** | USE: NODE | image
- CLAIM: KDIGO 2009 CMV: suggest monitoring graft function closely during CMV disease.
- QUOTE: "We suggest monitoring graft function closely during CMV disease."
- REF: 13.2.4.1 | GRADE: 2D | PAGE: PDF 59, printed S46 | SOURCE-MODE: image

**K119** | USE: NODE | image
- CLAIM: KDIGO 2009 CMV: disease may be a febrile syndrome (fever, leukopenia, atypical lymphocytosis) or tissue-invasive (hepatitis, pneumonitis, enteritis).
- QUOTE: "CMV disease may manifest as a nonspecific febrile syndrome (e.g. fever, leukopenia and atypical lymphocytosis) or tissue-invasive infections (e.g. hepatitis, pneumonitis and enteritis)."
- REF: Ch 13.2 Background | GRADE: background, ungraded | PAGE: PDF 59, printed S46 | SOURCE-MODE: image

**K120** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009 CMV: patients with severe or life-threatening disease should be hospitalized and treated with intravenous ganciclovir.
- QUOTE: "patients with more severe disease, including those with life-threatening disease should be hospitalized and treated with intravenous ganciclovir."
- REF: Ch 13.2 Rationale (CMV treatment) | GRADE: rationale, ungraded | PAGE: PDF 61, printed S48 | SOURCE-MODE: image

**K121** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 CMV: most experts would use oral therapy for adult recipients with mild CMV disease; no consensus on tissue-invasive disease.
- QUOTE: "most experts would be willing to use oral therapy to treat adult KTRs with mild CMV disease. A consensus does not exist as to which patients with tissue-invasive disease might be candidates for oral therapy."
- REF: Ch 13.2 Rationale (CMV treatment) | GRADE: rationale, ungraded | PAGE: PDF 61, printed S48 | SOURCE-MODE: image

**K122** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 CMV: concern exists about oral valganciclovir where absorption of the drug is in question.
- QUOTE: "concern also exists with regards to the use of oral valganciclovir in patients in whom there are questions regarding adequate absorption of this medication."
- REF: Ch 13.2 Rationale (CMV treatment) | GRADE: rationale, ungraded | PAGE: PDF 61, printed S48 | SOURCE-MODE: image

**K123** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 CMV: acyclovir or famciclovir is not recommended for CMV prophylaxis; oral ganciclovir should be avoided with high-level CMV viremia.
- QUOTE: "The use of oral ganciclovir should be avoided for patients with high-level CMV viremia (305). The use of acyclovir or famciclovir is not recommended, given the absence of data supporting the efficacy of these agents."
- REF: Ch 13.2 Rationale | GRADE: rationale, ungraded | PAGE: PDF 61, printed S48 | SOURCE-MODE: image

**K124** | USE: NODE | image
- CLAIM: KDIGO 2009 CMV: reducing immunosuppression for CMV disease places patients at some risk of rejection, and CMV infection has itself been associated with rejection.
- QUOTE: "The reduction of immunosuppression used as part of the treatment of CMV disease places patients at some risk for the development of rejection. The presence of CMV infection and disease has been associated with the development of rejection"
- REF: Ch 13.2 Rationale | GRADE: rationale, ungraded | PAGE: PDF 61, printed S48 | SOURCE-MODE: image

**K125** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 CMV: serology should be repeated for CMV-seronegative patients who need antibody therapy for rejection, to decide their current risk status.
- QUOTE: "It is also suggested that CMV serologies be repeated for patients CMV-seronegative prior to transplant, who require antibody therapy as treatment for rejection to decide their current risk status."
- REF: Ch 13.2 Rationale | GRADE: rationale, ungraded | PAGE: PDF 61, printed S48 | SOURCE-MODE: image

**K126** | USE: TEAM | image
- CLAIM: KDIGO 2009 EBV: in donor-positive, recipient-negative recipients, suggest EBV testing in week one, then at least monthly for 3-6 months.
- QUOTE: "We suggest monitoring high-risk (donor EBV seropositive/recipient seronegative) KTRs for EBV by NAT (2C): once in the first week after transplantation (2D); then at least monthly for the first 3-6 months after transplantation (2D);"
- REF: 13.3.1 | GRADE: 2C overall; 2D each interval | PAGE: PDF 61, printed S48 | SOURCE-MODE: image
- NOTE: Remaining intervals: every 3 months until the end of the first post-transplant year; additionally after treatment for acute rejection (each 2D).

**K127** | USE: TEAM | image
- CLAIM: KDIGO 2009 EBV: suggest reducing immunosuppression in EBV-seronegative patients with an increasing EBV load.
- QUOTE: "We suggest that EBV-seronegative patients with an increasing EBV load have immunosuppressive medication reduced."
- REF: 13.3.2 | GRADE: 2D | PAGE: PDF 61, printed S48 | SOURCE-MODE: image

**K128** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009 EBV: recommend reduction or cessation of immunosuppression in patients with EBV disease, including PTLD.
- QUOTE: "We recommend that patients with EBV disease, including PTLD, have a reduction or cessation of immunosuppressive medication."
- REF: 13.3.3 | GRADE: 1C | PAGE: PDF 61, printed S48 | SOURCE-MODE: image

**K129** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009 EBV: EBV disease can present as nonspecific febrile illness, gastroenteritis or hepatitis, which may be attributable to CMV or other pathogens.
- QUOTE: "Epstein-Barr virus disease can present with varied manifestations, including nonspecific febrile illness, gastroenteritis, hepatitis and other manifestations that may be attributable to CMV or other pathogens."
- REF: Ch 13.3 Rationale (EBV disease diagnosis) | GRADE: rationale, ungraded | PAGE: PDF 62, printed S49 | SOURCE-MODE: image

**K130** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 EBV: a compatible clinical syndrome together with a high EBV load is a sensitive and specific approach to diagnosing EBV disease.
- QUOTE: "the combination of the presence of a compatible clinical syndrome in association with a high EBV load provides a sensitive and specific approach to the diagnosis of EBV disease"
- REF: Ch 13.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 62, printed S49 | SOURCE-MODE: image
- NOTE: The guideline adds that many patients may have asymptomatic elevations of EBV load (PDF 62-63).

**K131** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009 EBV: suspected PTLD lesions must be biopsied and read by a pathologist experienced in PTLD.
- QUOTE: "it is imperative that suspected PTLD lesions be biopsied and undergo histolopathologic evaluation by a pathologist experienced with the diagnosis of PTLD"
- REF: Ch 13.3 Rationale (EBV-associated PTLD) | GRADE: rationale, ungraded | PAGE: PDF 63, printed S50 | SOURCE-MODE: image

**K132** | USE: NODE | image
- CLAIM: KDIGO 2009 EBV: lesions that look like PTLD may be other pathogens, for example pulmonary nodules from fungal infection.
- QUOTE: "lesions with a characteristic clinical appearance on physical examination or imaging studies may be due to alternative pathogens (e.g. pulmonary nodules attributable to fungal pathogens)."
- REF: Ch 13.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 63, printed S50 | SOURCE-MODE: image

**K133** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 EBV: mortality from EBV-associated PTLD is over 50% in observational studies.
- QUOTE: "Observational studies have also shown that mortality from EBV-associated PTLD is over 50% (325,326)."
- REF: Ch 13.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 63, printed S50 | SOURCE-MODE: image

**K134** | USE: TEAM | image
- CLAIM: KDIGO 2009 EBV: as many as two thirds of EBV-associated PTLD patients respond to reduced or withdrawn immunosuppression.
- QUOTE: "As many as two thirds of patients presenting with EBV-associated PTLD will respond to reduction or withdrawal of immunosuppressive medication"
- REF: Ch 13.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 63, printed S50 | SOURCE-MODE: image
- NOTE: Same paragraph: less likely when presenting more than 1 year after transplantation, or with EBV-associated lymphoma.

**K135** | USE: TEAM | image
- CLAIM: KDIGO 2009 EBV: infectious disease specialists, oncologists and transplant physicians working as a team will likely maximize outcomes for EBV disease and PTLD.
- QUOTE: "involvement of infectious diseases specialists, oncologists and transplant physicians in a team approach will likely maximize therapeutic outcomes."
- REF: Ch 13.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 63, printed S50 | SOURCE-MODE: image

**K136** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 EBV: EBV-seronegative recipients have a 10- to 50-fold increased risk of EBV disease, including PTLD, compared with seropositive recipients.
- QUOTE: "There is a 10- to 50-fold increased risk for EBV disease (including PTLD) in EBV-seronegative compared to EBV-seropositive KTRs."
- REF: Ch 13.3 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 62, printed S49 | SOURCE-MODE: image

**K137** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 EBV: primary EBV infection in seronegative recipients occurs most often in the first 3-6 months after transplant.
- QUOTE: "Primary EBV infection in EBV-seronegative organ transplant recipients occurs most frequently in the first 3-6 months following organ transplantation"
- REF: Ch 13.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 62, printed S49 | SOURCE-MODE: image

**K138** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 EBV: evidence is lacking for preemptive acyclovir or ganciclovir for a raised EBV load without reducing immunosuppression.
- QUOTE: "evidence is lacking for the efficacy of preemptive antiviral therapy (e.g. acyclovir, ganciclovir) in response to an elevated or rising EBV load in the absence of reduction of immunosuppression."
- REF: Ch 13.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 62, printed S49 | SOURCE-MODE: image

**K139** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 EBV: PTLD categories are early lesions, polymorphic, monomorphic (B-cell and T-cell lymphomas) and other rare types.
- QUOTE: "1: Early lesions ... 2: PTLD-polymorphic ... 3: PTLD-monomorphic (classify according to lymphoma classification) ... 4: Other types (rare)"
- REF: Table 15 (Categories of PTLD) | GRADE: table, ungraded | PAGE: PDF 63, printed S50 | SOURCE-MODE: image

**K140** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009 HSV: recommend treating superficial HSV 1 or 2 infection with an oral antiviral (acyclovir, valacyclovir or famciclovir) until all lesions resolve.
- QUOTE: "We recommend that KTRs who develop a superficial HSV 1, 2 infection be treated (1B) with an appropriate oral antiviral agent (e.g. acyclovir, valacyclovir, or famciclovir) until all lesions have resolved. (1D)"
- REF: 13.4.1 | GRADE: 1B treatment; 1D duration | PAGE: PDF 63, printed S50 | SOURCE-MODE: image

**K141** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009 HSV: systemic HSV 1 or 2 infection: recommend intravenous acyclovir (1B); also reduced immunosuppression (1D).
- QUOTE: "We recommend that KTRs with systemic HSV 1, 2 infection be treated (1B) with intravenous acyclovir and a reduction in immunosuppressive medication. (1D)"
- REF: 13.4.2 | GRADE: 1B treatment; 1D reduction | PAGE: PDF 63, printed S50 | SOURCE-MODE: image

**K142** | USE: TEAM | image
- CLAIM: KDIGO 2009 HSV: recommend intravenous acyclovir until clinical response (1B), then an oral agent to complete 14-21 days in total (2D).
- QUOTE: "We recommend that intravenous acyclovir continue until the patient has a clinical response, (1B) then switch to an appropriate oral antiviral agent (e.g. acyclovir, valacyclovir, or famciclovir) to complete a total treatment duration of 14-21 days. (2D)"
- REF: 13.4.2.1 | GRADE: 1B IV until response; 2D total duration | PAGE: PDF 63, printed S50 | SOURCE-MODE: image

**K143** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 HSV: suggest a prophylactic antiviral for recipients with frequent HSV 1 or 2 recurrences.
- QUOTE: "We suggest using a prophylactic antiviral agent for KTRs experiencing frequent recurrences of HSV 1,2 infection."
- REF: 13.4.3 | GRADE: 2D | PAGE: PDF 63, printed S50 | SOURCE-MODE: image

**K144** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009 VZV: primary varicella: recommend intravenous or oral acyclovir or valacyclovir (1C); also temporary reduction in immunosuppression (2D).
- QUOTE: "We recommend that primary VZV infection (chicken pox) in KTRs be treated (1C) with either intravenous or oral acyclovir or valacyclovir; and a temporary reduction in amount of immunosuppressive medication. (2D)"
- REF: 13.4.4 | GRADE: 1C treatment; 2D reduction | PAGE: PDF 63, printed S50 | SOURCE-MODE: image

**K145** | USE: TEAM | image
- CLAIM: KDIGO 2009 VZV: recommend continuing treatment of primary varicella at least until all lesions have scabbed.
- QUOTE: "We recommend that treatment be continued at least until all lesions have scabbed."
- REF: 13.4.4.1 | GRADE: 1D | PAGE: PDF 64, printed S51 | SOURCE-MODE: image

**K146** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009 VZV: recommend oral acyclovir or valacyclovir for uncomplicated herpes zoster, at least until all lesions have scabbed.
- QUOTE: "We recommend that uncomplicated herpes zoster (shingles) be treated (1B) with oral acyclovir or valacyclovir (1B), at least until all lesions have scabbed. (1D)"
- REF: 13.4.5 | GRADE: 1B treatment; 1B agent; 1D duration | PAGE: PDF 64, printed S51 | SOURCE-MODE: image

**K147** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009 VZV: disseminated or invasive herpes zoster: recommend intravenous acyclovir (1B); also temporary reduction in immunosuppression (1C).
- QUOTE: "We recommend that disseminated or invasive herpes zoster be treated (1B) with intravenous acyclovir and a temporary reduction in the amount of immunosuppressive medication (1C), at least until all lesions have scabbed. (1D)"
- REF: 13.4.6 | GRADE: 1B treatment; 1C reduction; 1D duration | PAGE: PDF 64, printed S51 | SOURCE-MODE: image

**K148** | USE: NODE | image
- CLAIM: KDIGO 2009 VZV: uncomplicated herpes zoster means cutaneous zoster limited to no more than three dermatomes.
- QUOTE: "Uncomplicated herpes zoster (shingles) is defined as the presence of cutaneous zoster limited to no more than three dermatomes."
- REF: Ch 13.4 Background | GRADE: background, ungraded | PAGE: PDF 64, printed S51 | SOURCE-MODE: image
- NOTE: Disseminated or invasive zoster is defined in the same Background as cutaneous zoster in more than three dermatomes and/or evidence of organ system involvement.

**K149** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009 VZV: after exposure, recommend varicella zoster immunoglobulin or intravenous immunoglobulin within 96 hours for varicella-susceptible patients.
- QUOTE: "varicella zoster immunoglobulin (or intravenous immunoglobulin) within 96 hours of exposure (1D);"
- REF: 13.4.7 (first bullet) | GRADE: 1D | PAGE: PDF 64, printed S51 | SOURCE-MODE: image
- NOTE: 13.4.7 itself: recommend prevention of primary varicella be instituted in varicella-susceptible patients after exposure (1D).

**K150** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 VZV: if immunoglobulin is unavailable or over 96 hours have passed, suggest a 7-day oral acyclovir course starting 7-10 days after exposure.
- QUOTE: "if immunoglobulin is not available or more than 96 h have passed, a 7-day course of oral acyclovir begun 7-10 days after varicella exposure. (2D)"
- REF: 13.4.7 (second bullet) | GRADE: 2D | PAGE: PDF 64, printed S51 | SOURCE-MODE: image

**K151** | USE: NODE | image
- CLAIM: KDIGO 2009 VZV: significant varicella exposure is face-to-face contact with chickenpox; for zoster it requires direct contact with a lesion.
- QUOTE: "a significant exposure to varicella is defined by face-to-face contact with someone with chickenpox, while a significant exposure to someone with zoster requires direct contact with a lesion."
- REF: Ch 13.4 Background | GRADE: background, ungraded | PAGE: PDF 64, printed S51 | SOURCE-MODE: image

**K152** | USE: NODE | image
- CLAIM: KDIGO 2009 HSV: systemic HSV infection is a potentially life-threatening complication in immunosuppressed recipients.
- QUOTE: "Systemic HSV infections represent a potentially life-threatening complication to immunosuppressed KTRs."
- REF: Ch 13.4 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 64, printed S51 | SOURCE-MODE: image

**K153** | USE: NODE | image
- CLAIM: KDIGO 2009 VZV: primary varicella and herpes zoster are potentially life-threatening to recipients.
- QUOTE: "Primary VZV infection is potentially life-threatening to KTRs."
- REF: Ch 13.4 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 64, printed S51 | SOURCE-MODE: image

**K154** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest all recipients get daily trimethoprim-sulfamethoxazole to prevent urinary infection for at least 6 months after transplant.
- QUOTE: "We suggest that all KTRs receive UTI prophylaxis with daily trimethoprim-sulfamethoxazole for at least 6 months after transplantation."
- REF: 14.1.1 | GRADE: 2B | PAGE: PDF 72, printed S59 | SOURCE-MODE: image

**K155** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: for allograft pyelonephritis, suggest initial hospitalization and treatment with intravenous antibiotics.
- QUOTE: "For allograft pyelonephritis, we suggest initial hospitalization and treatment with intravenous antibiotics."
- REF: 14.1.2 | GRADE: 2C | PAGE: PDF 72, printed S59 | SOURCE-MODE: image

**K156** | USE: NODE | image
- CLAIM: KDIGO 2009: allograft pyelonephritis may bring bacteremia, metastatic spread, impaired graft function and even death.
- QUOTE: "Kidney allograft pyelonephritis may be associated with bacteremia, metastatic spread, impaired graft function and even death."
- REF: Ch 14.1 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 72, printed S59 | SOURCE-MODE: image

**K157** | USE: NODE | image
- CLAIM: KDIGO 2009: allograft pyelonephritis is usually accompanied by signs of systemic inflammation and a positive urine or blood culture.
- QUOTE: "Kidney allograft pyelonephritis is an infection of the kidney allograft that is usually accompanied by characteristic signs and symptoms of systemic inflammation and a positive urine and/or blood culture."
- REF: Ch 14.1 Background | GRADE: background, ungraded | PAGE: PDF 72, printed S59 | SOURCE-MODE: image

**K158** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: allograft pyelonephritis: patients should be hospitalized and treated with intravenous antibiotics for at least the initial course, particularly in the first 4-6 months.
- QUOTE: "KTRs with clinical and laboratory evidence suggestive of kidney allograft pyelonephritis should be hospitalized and be treated with intravenous antibiotics for at least the initial course of therapy. This is particularly true in early infections (first 4-6 months ..."
- REF: Ch 14.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 72, printed S59 | SOURCE-MODE: image
- NOTE: Quote is 44 words in the guideline; shortened in the checked file.

**K159** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: in the absence of a kidney abscess, 14 days of treatment for allograft pyelonephritis is anticipated to be adequate; no randomized trials exist.
- QUOTE: "it is anticipated, in the absence of a kidney abscess, that 14 days should be adequate."
- REF: Ch 14.1 Rationale (continued on S60) | GRADE: rationale, ungraded | PAGE: PDF 73, printed S60 | SOURCE-MODE: image
- NOTE: Text says RCT evidence for optimal duration "is not available".

**K160** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: patients with relapsing urinary infection should be considered for a more prolonged therapeutic course.
- QUOTE: "patients experiencing relapsing infection should be considered for a more prolonged therapeutic course."
- REF: Ch 14.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 72, printed S59 | SOURCE-MODE: image

**K161** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: prophylactic trimethoprim-sulfamethoxazole is preferred over ciprofloxacin in the first 6 months because recipients on a ciprofloxacin regimen developed Pneumocystis pneumonia.
- QUOTE: "patients treated with this regimen were at risk for, and developed Pneumocystis jirovecii pneumonia (PCP) (see Recommendation 14.2) (404). Accordingly, the use of trimethoprim-sulfamethoxazole is preferred over ciprofloxacin"
- REF: Ch 14.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 72, printed S59 | SOURCE-MODE: image

**K162** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: nitrofurantoin is the alternative UTI prophylaxis agent for patients allergic to trimethoprim-sulfamethoxazole.
- QUOTE: "For patients who are allergic to trimethoprim-sulfamethoxazole, the recommended alternative agent would be nitrofurantoin."
- REF: Ch 14.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 72, printed S59 | SOURCE-MODE: image

**K163** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: late urinary infections tend to be benign, without bacteremia, metastatic foci or effect on long-term graft function.
- QUOTE: "Evidence suggests that late UTIs tend to be benign, without associated bacteremia, metastatic foci or effect on long-term graft function"
- REF: Ch 14.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 72, printed S59 | SOURCE-MODE: image
- NOTE: Applies to late infections; recommendation 14.1.2 and the early-infection statement are the pyelonephritis guidance.

**K164** | USE: TEAM | image
- CLAIM: KDIGO 2009: recommend all recipients get daily trimethoprim-sulfamethoxazole prophylaxis against Pneumocystis for 3-6 months after transplant.
- QUOTE: "We recommend that all KTRs receive PCP prophylaxis with daily trimethoprim-sulfamethoxazole for 3-6 months after transplantation."
- REF: 14.2.1 | GRADE: 1B | PAGE: PDF 73, printed S60 | SOURCE-MODE: image

**K165** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest the same prophylaxis for at least 6 weeks during and after treatment for acute rejection.
- QUOTE: "We suggest that all KTRs receive PCP prophylaxis with daily trimethoprim-sulfamethoxazole for at least 6 weeks during and after treatment for acute rejection."
- REF: 14.2.2 | GRADE: 2C | PAGE: PDF 73, printed S60 | SOURCE-MODE: image

**K166** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: Pneumocystis pneumonia diagnosed by lavage or lung biopsy: recommend high-dose intravenous trimethoprim-sulfamethoxazole, corticosteroids (1C); also reduced immunosuppression (1C).
- QUOTE: "We recommend that KTRs with PCP diagnosed by bronchial alveolar lavage and/or lung biopsy be treated with high-dose intravenous trimethoprim-sulfamethoxazole, corticosteroids, and a reduction in immunosuppressive medication."
- REF: 14.2.3 | GRADE: 1C | PAGE: PDF 73, printed S60 | SOURCE-MODE: image
- NOTE: No dose is given.

**K167** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: recommend corticosteroids for moderate to severe Pneumocystis pneumonia (PaO2 under 70 mm Hg on room air, or gradient over 35 mm Hg).
- QUOTE: "We recommend treatment with corticosteroids for KTRs with moderate to severe PCP (as defined by PaO2 <70 mm Hg in room air or an alveolar gradient of >35 mm Hg)."
- REF: 14.2.4 | GRADE: 1C | PAGE: PDF 73, printed S60 | SOURCE-MODE: image
- NOTE: Printed with less-than and greater-than symbols.

**K168** | USE: NODE | image
- CLAIM: KDIGO 2009: the diagnosis of Pneumocystis pneumonia should be confirmed by lung biopsy or bronchoalveolar lavage because no imaging pattern is specific.
- QUOTE: "Because no specific diagnostic pattern exists on any given imaging test, it is imperative that the diagnosis of PCP be confirmed by lung biopsy or bronchoalveolar lavage."
- REF: Ch 14.2 Background | GRADE: background, ungraded | PAGE: PDF 73, printed S60 | SOURCE-MODE: image

**K169** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: Pneumocystis pneumonia typically starts 6-8 weeks after immunosuppression begins.
- QUOTE: "The most typical time of onset of symptoms of PCP is 6-8 weeks following initiation of immunosuppressive therapy."
- REF: Ch 14.2 Rationale | GRADE: rationale, ungraded | PAGE: PDF 73, printed S60 | SOURCE-MODE: image

**K170** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: usual treatment duration for Pneumocystis pneumonia is 2-3 weeks; consider intravenous pentamidine isethionate for proven trimethoprim-sulfamethoxazole allergy.
- QUOTE: "The usual duration of treatment is 2-3 weeks. The use of intravenous pentamidine isethionate should be considered in patients with proven trimethoprim-sulfamethoxazole allergy."
- REF: Ch 14.2 Rationale (PCP treatment) | GRADE: rationale, ungraded | PAGE: PDF 73, printed S60 | SOURCE-MODE: image

**K171** | USE: NODE | image
- CLAIM: KDIGO 2009: Pneumocystis pneumonia is life-threatening in recipients.
- QUOTE: "Infection with P. jirovecii is life-threatening in KTRs."
- REF: Ch 14.2 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 73, printed S60 | SOURCE-MODE: image

**K172** | USE: NODE | image
- CLAIM: KDIGO 2009: alternative Pneumocystis prophylaxis agents are for patients with allergic reactions or drug-induced neutropenia from trimethoprim-sulfamethoxazole.
- QUOTE: "Indications for the use of alternative preventive agents include the development of allergic reactions and/or drug-induced neutropenia from trimethoprim-sulfamethoxazole."
- REF: Ch 14.2 Rationale | GRADE: rationale, ungraded | PAGE: PDF 73, printed S60 | SOURCE-MODE: image

**K173** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: dapsone requires screening for glucose-6-phosphate dehydrogenase deficiency first, because of methemoglobinemia risk.
- QUOTE: "Must screen for glucose 6-phosphate dehydrogenase deficiency prior to using dapsone, as this is a risk factor for development of methemoglobinemia associated with use of dapsone."
- REF: Table 17 footnote c | GRADE: table, ungraded | PAGE: PDF 74, printed S61 | SOURCE-MODE: image
- NOTE: Table 17 gives prophylaxis doses; not copied (not started by an emergency physician per the brief).

**K174** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest tuberculosis prophylaxis and treatment regimens be the same in recipients as in the local general population needing therapy.
- QUOTE: "We suggest that TB prophylaxis and treatment regimens be the same in KTRs as would be used in the local, general population who require therapy."
- REF: 14.3.1 | GRADE: 2D | PAGE: PDF 74, printed S61 | SOURCE-MODE: image

**K175** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: tuberculosis in recipients: incidence 50- to 100-fold the general population and mortality about 10-fold higher than in immunocompetent patients.
- QUOTE: "This represents a marked (50- to 100-fold) increase in the frequency of TB compared to the general population. In addition, there is also a marked increase in severity of disease in KTRs with mortality rates 10-fold higher"
- REF: Ch 14.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 74, printed S61 | SOURCE-MODE: image

**K176** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: the most frequent source of tuberculosis in recipients is reactivation of quiescent foci.
- QUOTE: "The most frequent source of TB infections in KTRs is reactivation of quiescent foci of Mycobacterium tuberculosis that persist after initial asymptomatic infection"
- REF: Ch 14.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 74, printed S61 | SOURCE-MODE: image

**K177** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: dialysis and transplant patients frequently have false-negative skin tests, and interferon-gamma release assays have limitations in this group.
- QUOTE: "It is also possible that dialysis and transplant patients frequently have false-negative PPD skin tests."
- REF: Ch 14.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 75, printed S62 | SOURCE-MODE: image
- NOTE: IGRAs: "limitations for detecting latent TB infection which preclude their routine use at present."

**K178** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest oral and esophageal Candida prophylaxis for 1-3 months after transplant and 1 month after antilymphocyte antibody.
- QUOTE: "We suggest oral and esophageal Candida prophylaxis with oral clotrimazole lozenges, nystatin, or fluconazole for 1-3 months after transplantation, and for 1 month after treatment with an antilymphocyte antibody."
- REF: 14.4.1 | GRADE: 2C | PAGE: PDF 75, printed S62 | SOURCE-MODE: image

**K179** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: oral clotrimazole troches or nystatin give effective Candida prophylaxis without systemic absorption.
- QUOTE: "The use of oral clotrimazole troches or nystatin provides effective prophylaxis without systemic absorption and hence without concerns for side effects."
- REF: Ch 14.4 Rationale | GRADE: rationale, ungraded | PAGE: PDF 75, printed S62 | SOURCE-MODE: image

**K180** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: some experts recommend a 7-day oral acyclovir course from day 7-10 after exposure; the guideline's weight-based dose does not say adults or children.
- QUOTE: "some experts recommend prophylaxis with a 7-day course of oral acyclovir (80 mg/kg/day administered in four divided doses with a maximum of 800 mg per dose) beginning on day 7-10 after varicella exposure"
- REF: Ch 13.4 Rationale (Prevention of primary VZV) | GRADE: rationale, ungraded | PAGE: PDF 65, printed S52 | SOURCE-MODE: image
- NOTE: DOSE row. "Some experts"; varicella vaccine is not recommended after exposure.

**K181** | USE: NODE | image
- CLAIM: KDIGO 2009: varicella vaccine is not recommended as postexposure prophylaxis in recipients.
- QUOTE: "The use of varicella vaccine is not recommended as a postexposure prophylactic strategy in KTRs."
- REF: Ch 13.4 Rationale | GRADE: rationale, ungraded | PAGE: PDF 65, printed S52 | SOURCE-MODE: image

**K182** | USE: TEAM | image
- CLAIM: KDIGO 2009: for disseminated zoster, keep the reduced immunosuppression a minimum of 3-5 days and until clinical improvement, if no rejection.
- QUOTE: "an effort should be made to maintain the reduced level of immunosuppression for a minimum of 3-5 days and until there is evidence of clinical improvement."
- REF: Ch 13.4 Rationale | GRADE: rationale, ungraded | PAGE: PDF 65, printed S52 | SOURCE-MODE: image

**K183** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: for systemic HSV, hospitalization and intravenous acyclovir are warranted; immunosuppression should be reduced or withdrawn if possible until infection resolves.
- QUOTE: "Because systemic HSV is life-threatening, hospitalization and treatment with intravenous acyclovir is warranted (333). If possible, immunosuppressive medications should be reduced or withdrawn until the infection has resolved."
- REF: Ch 13.4 Rationale | GRADE: rationale, ungraded | PAGE: PDF 65, printed S52 | SOURCE-MODE: image

**K184** | USE: TEAM | image
- CLAIM: KDIGO 2009 HCV: suggest treating hepatitis C only when benefits clearly outweigh the risk of allograft rejection from interferon-based therapy.
- QUOTE: "We suggest that HCV-infected KTRs be treated only when the benefits of treatment clearly outweigh the risk of allograft rejection due to interferon-based therapy"
- REF: 13.5.1 | GRADE: 2D | PAGE: PDF 65, printed S52 | SOURCE-MODE: image

**K185** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 HCV: suggest all conventional current induction and maintenance regimens can be used in hepatitis C-infected patients.
- QUOTE: "We suggest that all conventional current induction and maintenance immunosuppressive regimens can be used in HCV-infected patients."
- REF: 13.5.3 | GRADE: 2D | PAGE: PDF 65, printed S52 | SOURCE-MODE: image

**K186** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 HCV: with new proteinuria (ratio above 1, or above 1 g per 24 hours), perform allograft biopsy with immunofluorescence and electron microscopy.
- QUOTE: "For patients who develop new-onset proteinuria (either urine protein/creatinine ratio >1 or 24-hour urine protein >1 g on two or more occasions), perform an allograft biopsy with immunofluorescence and electron microscopy."
- REF: 13.5.5.1 | GRADE: Not Graded | PAGE: PDF 66, printed S53 | SOURCE-MODE: image
- NOTE: Printed with greater-than symbols; based on KDIGO Hepatitis C Recommendation 4.4.4.

**K187** | USE: TEAM | image
- CLAIM: KDIGO 2009 HCV: measure ALT monthly for the first 6 months and every 3-6 months thereafter, with imaging annually for cirrhosis and hepatocellular carcinoma.
- QUOTE: "Measure ALT in HCV-infected patients monthly for the first 6 months and every 3-6 months, thereafter. Perform imaging annually to look for cirrhosis and hepatocellular carcinoma."
- REF: 13.5.4 | GRADE: Not Graded | PAGE: PDF 66, printed S53 | SOURCE-MODE: image

**K188** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 HCV: suggest patients with HCV-associated glomerulopathy not receive interferon.
- QUOTE: "We suggest that patients with HCV-associated glomerulopathy not receive interferon."
- REF: 13.5.6 | GRADE: 2D | PAGE: PDF 66, printed S53 | SOURCE-MODE: image

**K189** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 HCV: interferon after kidney transplant can be deleterious to the allograft and should generally be avoided unless worsening hepatic injury.
- QUOTE: "the administration of interferon after kidney transplantation can be deleterious to the allograft and should generally be avoided in KTRs, unless there is indication of worsening hepatic injury."
- REF: Ch 13.5 Rationale | GRADE: rationale, ungraded | PAGE: PDF 66, printed S53 | SOURCE-MODE: image

**K190** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 HBV: suggest any available induction and maintenance immunosuppressant can be used in hepatitis B-infected recipients.
- QUOTE: "We suggest that any currently available induction and maintenance immunosuppressive medication can be used in HBV-infected KTRs."
- REF: 13.6.1 | GRADE: 2D | PAGE: PDF 66, printed S53 | SOURCE-MODE: image

**K191** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 HBV: suggest interferon should generally be avoided in hepatitis B-infected recipients.
- QUOTE: "We suggest that interferon treatment should generally be avoided in HBV-infected KTRs."
- REF: 13.6.2 | GRADE: 2C | PAGE: PDF 67, printed S54 | SOURCE-MODE: image

**K192** | USE: TEAM | image
- CLAIM: KDIGO 2009 HBV: suggest all HBsAg-positive recipients receive prophylaxis with tenofovir, entecavir or lamivudine.
- QUOTE: "We suggest that all HBsAg-positive KTRs receive prophylaxis with tenofovir, entecavir, or lamivudine."
- REF: 13.6.3 | GRADE: 2B | PAGE: PDF 67, printed S54 | SOURCE-MODE: image

**K193** | USE: TEAM | image
- CLAIM: KDIGO 2009 HBV: with hepatitis B antiviral therapy, measure HBV DNA and ALT every 3 months to monitor efficacy and detect resistance.
- QUOTE: "During therapy with antivirals, measure HBV DNA and ALT levels every 3 months to monitor efficacy and to detect drug resistance."
- REF: 13.6.3.2 | GRADE: Not Graded | PAGE: PDF 67, printed S54 | SOURCE-MODE: image

**K194** | USE: NODE | image
- CLAIM: KDIGO 2009 HBV: ALT is lower in recipients and unreliable alone as a marker of liver disease activity.
- QUOTE: "ALT activity is lower in KTRs than in the general population, and is unreliable as a marker of liver disease activity by itself."
- REF: Ch 13.6 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 67, printed S54 | SOURCE-MODE: image

**K195** | USE: NODE | image
- CLAIM: KDIGO 2009 HBV: HBV infection in recipients is at risk of exacerbation, progressive liver disease and hepatocellular carcinoma after transplant.
- QUOTE: "Hepatitis B virus infected patients are at risk of exacerbation of the infection, progressive liver disease and development of hepatocellular carcinoma after kidney transplantation."
- REF: Ch 13.6 Rationale | GRADE: rationale, ungraded | PAGE: PDF 67, printed S54 | SOURCE-MODE: image

**K196** | USE: OVERLAY | text
- CLAIM: KDIGO 2009 BK: plasma BK load above 10 000 copies/mL has a high positive predictive value for BK nephropathy.
- QUOTE: "BKV plasma NAT >10 000 copies/mL (10 7 copies/L) has a high positive predictive value for BKV nephropathy."
- REF: Ch 13.1 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 57, printed S44 | SOURCE-MODE: text
- NOTE: Printed 10 to the power 7 copies/L. For BK use the 2024 consensus; see DIFFERS.

**K197** | USE: OVERLAY | text
- CLAIM: KDIGO 2009 BK: where nucleic acid testing is unavailable, urine decoy cells are an acceptable but nonspecific screening alternative.
- QUOTE: "When NAT is not available, microscopic evaluation of urine for the presence of decoy cells is an acceptable, albeit nonspecific, alternative screening method"
- REF: Ch 13.1 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 57, printed S44 | SOURCE-MODE: text

**K198** | USE: OVERLAY | text
- CLAIM: KDIGO 2009 CMV: CMV disease needs signs or symptoms attributable to CMV plus CMV in plasma by nucleic acid testing or pp65 antigenemia.
- QUOTE: "Cytomegalovirus disease is defined by the presence of clinical signs and symptoms attributable to CMV infection, and the presence of CMV in plasma by NAT or pp65 antigenemia."
- REF: Ch 13.2 Background | GRADE: background, ungraded | PAGE: PDF 59, printed S46 | SOURCE-MODE: text
- NOTE: Guideline adds: tissue-invasive disease needs CMV in tissue by histology, NAT or culture.

**K199** | USE: NODE | image
- CLAIM: KDIGO 2009 HSV: continue intravenous acyclovir until fever, hypoxia and signs or symptoms of hepatitis have resolved, then complete treatment orally.
- QUOTE: "Intravenous acyclovir should be continued until there is demonstrative evidence of clinical improvement as measured by resolution of fever, hypoxia and signs or symptoms of hepatitis."
- REF: Ch 13.4 Rationale (Systemic HSV infection) | GRADE: rationale, ungraded | PAGE: PDF 65, printed S52 | SOURCE-MODE: image

**K200** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 VZV: little evidence confirms outpatient oral acyclovir is safe or effective for primary varicella; careful patient selection and close follow-up are needed.
- QUOTE: "there is little evidence to confirm the safety and efficacy of this approach. Careful selection of patients with assurance of close clinical follow-up is necessary if oral acyclovir is to be used in these patients."
- REF: Ch 13.4 Rationale (Primary VZV) | GRADE: rationale, ungraded | PAGE: PDF 65, printed S52 | SOURCE-MODE: image
- NOTE: Sits beside rec 13.4.4 (IV or oral acyclovir for primary varicella, 1C); see Inconsistencies.

## 5. Immunosuppression (51 rows)

**K201** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: recommend starting a combination of immunosuppressive medications before or at the time of transplantation.
- QUOTE: "We recommend starting a combination of immunosuppressive medications before, or at the time of, kidney transplantation."
- REF: 1.1 | GRADE: 1A | PAGE: PDF 19, printed S6 | SOURCE-MODE: image

**K202** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: recommend biologic induction therapy as part of the initial regimen.
- QUOTE: "We recommend including induction therapy with a biologic agent as part of the initial immunosuppressive regimen in KTRs."
- REF: 1.2 | GRADE: 1A | PAGE: PDF 19, printed S6 | SOURCE-MODE: image

**K203** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: recommend an interleukin-2 receptor antagonist as first-line induction.
- QUOTE: "We recommend that an IL2-RA be the first-line induction therapy."
- REF: 1.2.1 | GRADE: 1B | PAGE: PDF 19, printed S6 | SOURCE-MODE: image

**K204** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest a lymphocyte-depleting agent rather than an interleukin-2 receptor antagonist for recipients at high immunologic risk.
- QUOTE: "We suggest using a lymphocyte-depleting agent, rather than an IL2-RA, for KTRs at high immunologic risk."
- REF: 1.2.2 | GRADE: 2B | PAGE: PDF 19, printed S6 | SOURCE-MODE: image

**K205** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: lymphocyte-depleting agents named are antithymocyte globulin, antilymphocyte globulin and monomurab-CD3; IL2-RAs named are basiliximab and daclizumab.
- QUOTE: "Available lymphocyte-depleting agents include antithymocyte globulin (ATG), antilymphocyte globulin (ALG) and monomurab-CD3. Basiliximab and daclizumab, the two IL2-RAs"
- REF: Ch 1 Background | GRADE: background, ungraded | PAGE: PDF 19, printed S6 | SOURCE-MODE: image
- NOTE: The guideline prints "monomurab-CD3" (sic).

**K206** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: compared with IL2-RA, lymphocyte-depleting agents reduce acute rejection but increase infections and malignancies.
- QUOTE: "lymphocyte-depleting agents reduce acute rejection, but increase the risk of infections and malignancies."
- REF: Ch 1 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 19, printed S6 | SOURCE-MODE: image

**K207** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: recommend maintenance of a CNI plus an antiproliferative agent, with or without corticosteroids.
- QUOTE: "We recommend using a combination of immunosuppressive medications as maintenance therapy including a CNI and an antiproliferative agent, with or without corticosteroids."
- REF: 2.1 | GRADE: 1B | PAGE: PDF 23, printed S10 | SOURCE-MODE: image

**K208** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest tacrolimus as the first-line calcineurin inhibitor.
- QUOTE: "We suggest that tacrolimus be the first-line CNI used."
- REF: 2.2 | GRADE: 2A | PAGE: PDF 23, printed S10 | SOURCE-MODE: image

**K209** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest tacrolimus or cyclosporine be started before or at transplantation, not delayed until graft function starts.
- QUOTE: "We suggest that tacrolimus or CsA be started before or at the time of transplantation, rather than delayed until the onset of graft function."
- REF: 2.2.1 | GRADE: 2D tacrolimus; 2B CsA | PAGE: PDF 23, printed S10 | SOURCE-MODE: image

**K210** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest mycophenolate as the first-line antiproliferative agent.
- QUOTE: "We suggest that mycophenolate be the first-line antiproliferative agent."
- REF: 2.3 | GRADE: 2B | PAGE: PDF 23, printed S10 | SOURCE-MODE: image

**K211** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: antiproliferative agents mean azathioprine or mycophenolate (mycophenolate mofetil or enteric-coated mycophenolate sodium).
- QUOTE: "antiproliferative agents refer specifically to azathioprine or mycophenolate (either MMF or enteric-coated mycophenolate sodium [EC-MPS])."
- REF: Ch 2 Background | GRADE: background, ungraded | PAGE: PDF 23, printed S10 | SOURCE-MODE: image

**K212** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: in low-risk patients given induction, corticosteroids could be stopped during the first week after transplant.
- QUOTE: "in patients who are at low immunological risk and who receive induction therapy, corticosteroids could be discontinued during the first week after transplantation."
- REF: 2.4 | GRADE: 2B | PAGE: PDF 23, printed S10 | SOURCE-MODE: image

**K213** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: recommend that if an mTOR inhibitor is used, it is not started until graft function is established and surgical wounds have healed.
- QUOTE: "We recommend that if mTORi are used, they should not be started until graft function is established and surgical wounds are healed."
- REF: 2.5 | GRADE: 1B | PAGE: PDF 23, printed S10 | SOURCE-MODE: image

**K214** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: acute rejection risk is highest in the first 3 months, so higher doses are used then and reduced later.
- QUOTE: "Since the risk for acute rejection is highest in the first 3 months after transplantation, higher doses are used during this period, and then reduced thereafter in stable patients"
- REF: Ch 2 Background | GRADE: background, ungraded | PAGE: PDF 23, printed S10 | SOURCE-MODE: image

**K215** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest the lowest planned maintenance doses by 2-4 months after transplantation if there has been no acute rejection.
- QUOTE: "We suggest using the lowest planned doses of maintenance immunosuppressive medications by 2-4 months after transplantation, if there has been no acute rejection."
- REF: 3.1 | GRADE: 2C | PAGE: PDF 27, printed S14 | SOURCE-MODE: image

**K216** | USE: NODE | image
- CLAIM: KDIGO 2009: suggest CNIs be continued rather than withdrawn.
- QUOTE: "We suggest that CNIs be continued rather than withdrawn."
- REF: 3.2 (first of two items numbered 3.2) | GRADE: 2B | PAGE: PDF 27, printed S14 | SOURCE-MODE: image

**K217** | USE: NODE | image
- CLAIM: KDIGO 2009: if prednisone is used beyond week one, suggest it be continued rather than withdrawn.
- QUOTE: "If prednisone is being used beyond the first week after transplantation, we suggest prednisone be continued rather than withdrawn."
- REF: 3.2 (second item numbered 3.2) | GRADE: 2C | PAGE: PDF 27, printed S14 | SOURCE-MODE: image

**K218** | USE: NODE | image
- CLAIM: KDIGO 2009: trials show CNI withdrawal leads to more acute rejection without changing graft survival.
- QUOTE: "RCTs show that CNI withdrawal leads to increased acute rejection, without altering graft survival."
- REF: Ch 3 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 27, printed S14 | SOURCE-MODE: image

**K219** | USE: NODE | image
- CLAIM: KDIGO 2009: trials show steroid withdrawal more than 3 months after transplant increases acute rejection risk.
- QUOTE: "RCTs show that steroid withdrawal more than 3 months after transplantation increases the risk of acute rejection."
- REF: Ch 3 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 27, printed S14 | SOURCE-MODE: image

**K220** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: recommend measuring CNI blood levels; suggest at least whenever medication or patient status changes that may affect levels.
- QUOTE: "We recommend measuring CNI blood levels (1B), and suggest measuring at least: ... whenever there is a change in medication or patient status that may affect blood levels (2C);"
- REF: 5.1 (third bullet 2C) | GRADE: 1B levels; 2C for this timing | PAGE: PDF 32, printed S19 | SOURCE-MODE: image

**K221** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: suggest measuring CNI levels at least whenever kidney function declines in a way that may indicate nephrotoxicity or rejection.
- QUOTE: "whenever there is a decline in kidney function that may indicate nephrotoxicity or rejection. (2C)"
- REF: 5.1 (bullet) | GRADE: 2C | PAGE: PDF 32, printed S19 | SOURCE-MODE: image

**K222** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest CNI levels at least every other day after surgery until target levels are reached.
- QUOTE: "every other day during the immediate postoperative period until target levels are reached (2C);"
- REF: 5.1 (bullet) | GRADE: 2C | PAGE: PDF 32, printed S19 | SOURCE-MODE: image

**K223** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest monitoring cyclosporine with 12-hour trough (C0), 2-hour post-dose (C2) or abbreviated AUC.
- QUOTE: "We suggest monitoring CsA using 12-h trough (C0), 2-h post-dose (C2) or abbreviated AUC."
- REF: 5.1.1 | GRADE: 2D | PAGE: PDF 32, printed S19 | SOURCE-MODE: image

**K224** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest monitoring tacrolimus using the 12-hour trough (C0).
- QUOTE: "We suggest monitoring tacrolimus using 12-h trough (C0)."
- REF: 5.1.2 | GRADE: 2C | PAGE: PDF 32, printed S19 | SOURCE-MODE: image

**K225** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest monitoring mycophenolate levels (5.2, 2D) and mTOR inhibitor levels (5.3, 2C).
- QUOTE: "We suggest monitoring MMF levels. (2D) 5.3: We suggest monitoring mTORi levels."
- REF: 5.2 and 5.3 | GRADE: 5.2 2D; 5.3 2C | PAGE: PDF 32, printed S19 | SOURCE-MODE: image

**K226** | USE: NODE | image
- CLAIM: KDIGO 2009: CNI levels change with other drugs acting on CYP3A4 or P-glycoprotein, diet and intestinal motility.
- QUOTE: "Common factors that might change CsA blood levels are the use of other drugs affecting cytochrome P450 3A4 (CYP3A4) and/or P-glycoprotein, diet and intestinal motility."
- REF: Ch 5 Rationale (CsA monitoring) | GRADE: rationale, ungraded | PAGE: PDF 32, printed S19 | SOURCE-MODE: image
- NOTE: Text names CsA specifically.

**K227** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: no data say whether monitoring levels in stable patients beyond the first few weeks is beneficial.
- QUOTE: "There are no data to suggest whether monitoring blood levels in stable patients beyond the first few weeks after transplantation is beneficial."
- REF: Ch 5 Rationale | GRADE: rationale, ungraded | PAGE: PDF 32, printed S19 | SOURCE-MODE: image

**K228** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: mTOR inhibitor half-lives exceed 48 hours; only trough (C0) monitoring is likely useful. No clinical method monitors corticosteroid levels.
- QUOTE: "The half-lives of mTORi are greater than 48 h, making anything but monitoring of C0 unlikely to be useful. There are no clinical methods for monitoring corticosteroid blood levels."
- REF: Ch 5 Background | GRADE: background, ungraded | PAGE: PDF 32, printed S19 | SOURCE-MODE: image

**K229** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: lower early target levels may be prudent when an induction antibody is used.
- QUOTE: "it may be prudent to use lower early posttransplant target blood levels when an induction antibody is used."
- REF: Ch 5 Rationale | GRADE: rationale, ungraded | PAGE: PDF 32, printed S19 | SOURCE-MODE: image

**K230** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: toxicity profile table marks tacrolimus and cyclosporine with decreased GFR, and tacrolimus with new-onset diabetes (moderate-severe).
- QUOTE: "New-onset diabetes mellitus ... Tac ... Decreased GFR ... CsA ... Tac"
- REF: Table 2 (arrows: tacrolimus NODAT double arrow = moderate-severe; GFR single arrow = mild-moderate for CsA and Tac) | GRADE: table, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image
- NOTE: Row text: NODAT steroids up, CsA up, Tac double-up, mTORi up. Decreased GFR CsA up, Tac up. Arrows: single = mild-moderate; double = moderate-severe.

**K231** | USE: TEAM | image
- CLAIM: KDIGO 2009: consider giving all recipients and family members education, prevention and treatment measures to minimize nonadherence to immunosuppressants.
- QUOTE: "Consider providing all KTRs and family members with education, prevention, and treatment measures to minimize nonadherence to immunosuppressive medications."
- REF: 11.1 | GRADE: Not Graded | PAGE: PDF 51, printed S38 | SOURCE-MODE: image

**K232** | USE: TEAM | image
- CLAIM: KDIGO 2009: consider more screening for nonadherence in recipients at increased risk of nonadherence.
- QUOTE: "Consider providing KTRs at increased risk for nonadherence with increased levels of screening for nonadherence."
- REF: 11.2 | GRADE: Not Graded | PAGE: PDF 51, printed S38 | SOURCE-MODE: image

**K233** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: nonadherence is associated with a high risk of acute rejection and allograft loss.
- QUOTE: "Nonadherence is associated with a high risk of acute rejection and allograft loss."
- REF: Ch 11 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 51, printed S38 | SOURCE-MODE: image

**K234** | USE: NODE | image
- CLAIM: KDIGO 2009: nonadherence is common in the first months after transplant and increases with duration of follow-up.
- QUOTE: "Nonadherence is common in the first months after kidney transplantation and increases by duration of follow-up."
- REF: Ch 11 Rationale | GRADE: rationale, ungraded | PAGE: PDF 51, printed S38 | SOURCE-MODE: image

**K235** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: transition from pediatric to adult nephrology care may be a time when nonadherence is particularly common.
- QUOTE: "The transition from pediatric to adult nephrology care may be a time when nonadherence is particularly common."
- REF: Ch 11 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 51, printed S38 | SOURCE-MODE: image

**K236** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: graft loss was sevenfold more likely in nonadherent than adherent individuals in one study cited.
- QUOTE: "Graft loss is sevenfold more likely in nonadherent compared to adherent individuals (264)."
- REF: Ch 11 Rationale | GRADE: rationale, ungraded | PAGE: PDF 51, printed S38 | SOURCE-MODE: image

**K237** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: no perfect adherence measure exists; use more than one approach; indirect measures include serum drug levels, pill counts and refill records.
- QUOTE: "Indirect measures include serum drug levels, biological markers, electronic monitoring, pill count and refill/prescription records. Since there is no perfect measure of adherence, consideration should be given to use more than one approach"
- REF: Ch 11 Rationale | GRADE: rationale, ungraded | PAGE: PDF 51, printed S38 | SOURCE-MODE: image

**K238** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: nondihydropyridine calcium-channel blockers or ketoconazole may be used to cut calcineurin inhibitor dose and cost.
- QUOTE: "using ketoconazole to minimize CNI dose (2D); using a nondihydropyridine CCB to minimize CNI dose (2C);"
- REF: 4.1.1 (bullets) | GRADE: 2D ketoconazole; 2C calcium-channel blocker | PAGE: PDF 29, printed S16 | SOURCE-MODE: image
- NOTE: Cost-reduction strategy; each bullet is graded where printed. See DIFFERS for the tacrolimus label.

**K239** | USE: SUMMARY-CANDIDATE | text
- CLAIM: KDIGO 2009: ketoconazole and diltiazem inhibit the enzyme system that metabolizes CNIs and mTOR inhibitors and raise their blood levels.
- QUOTE: "ketoconazole and the nondihydropyridine calcium-channel blocker (CCB) diltiazem are known inhibitors of this enzyme system and increase blood levels of these immunosuppressive drugs."
- REF: Ch 4 Rationale | GRADE: rationale, ungraded | PAGE: PDF 30, printed S17 | SOURCE-MODE: text

**K240** | USE: SUMMARY-CANDIDATE | text
- CLAIM: KDIGO 2009: if ketoconazole is stopped abruptly, immunosuppressant levels may drop precipitously and cause acute rejection.
- QUOTE: "if patients discontinue ketoconazole abruptly, the levels of immunosuppressive drugs may drop precipitously and result in acute rejection."
- REF: Ch 4 Rationale | GRADE: rationale, ungraded | PAGE: PDF 31, printed S18 | SOURCE-MODE: text

**K241** | USE: OVERLAY | text
- CLAIM: KDIGO 2009: 2-hour cyclosporine (C2) monitoring is not suitable for patients on ketoconazole or diltiazem; use trough concentrations.
- QUOTE: "The use of 2-h CsA concentration (C 2) monitoring for adjusting drug dose is not suitable for patients receiving ketoconazole or diltiazem."
- REF: Ch 4 Rationale | GRADE: rationale, ungraded | PAGE: PDF 31, printed S18 | SOURCE-MODE: text

**K242** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: patient and clinician should be made aware of any change in an immunosuppressive drug, including a switch to a generic.
- QUOTE: "It is important that the patient, and the clinician responsible for the patient's care, be made aware of any change in a prescribed immunosuppressive drug, including a change to a generic drug."
- REF: 4.3 | GRADE: Not Graded | PAGE: PDF 29, printed S16 | SOURCE-MODE: image

**K243** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: after switching to a generic drug monitored by blood levels, obtain levels and adjust the dose until a stable target is reached.
- QUOTE: "After switching to a generic medication that is monitored using blood levels, obtain levels and adjust the dose as often as necessary until a stable therapeutic target is achieved."
- REF: 4.4 | GRADE: Not Graded | PAGE: PDF 29, printed S16 | SOURCE-MODE: image

**K244** | USE: SUMMARY-CANDIDATE | text
- CLAIM: KDIGO 2009: tacrolimus target levels should reflect the whole regimen and rejection risk, higher early after transplant and lower later.
- QUOTE: "Target levels for tacrolimus should reflect the patient's overall immunosuppressive drug regimen and risk for rejection, with higher targets early after transplantation, and lower targets later."
- REF: Ch 5 Rationale (Tacrolimus monitoring) | GRADE: rationale, ungraded | PAGE: PDF 33, printed S20 | SOURCE-MODE: text
- NOTE: No numeric target range is given for tacrolimus in this document; see NOT IN KDIGO.

**K245** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: cyclosporine absorption varies most in the first 4 hours after a dose and in the first few weeks after transplant.
- QUOTE: "Variability in absorption is greatest during the first 4 h after dosing, and during the first few weeks after transplantation."
- REF: Ch 5 Background | GRADE: background, ungraded | PAGE: PDF 32, printed S19 | SOURCE-MODE: image

**K246** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: reduction in immunosuppression is a logical response to an adverse drug effect if benefits outweigh the risk of acute rejection.
- QUOTE: "drug withdrawal or substitution is a logical course of action if the benefits (reducing symptoms) appear to outweigh the harm (acute rejection)."
- REF: Ch 3 Rationale (Individual tailoring) | GRADE: rationale, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image
- NOTE: This is the guideline's only general statement on changing a drug for toxicity. It names no decision-maker.

**K247** | USE: TEAM | image
- CLAIM: KDIGO 2009: hypertension may be caused by corticosteroids, cyclosporine and less so tacrolimus; if not controlled, reducing steroid or CNI may help.
- QUOTE: "Hypertension may be caused or exacerbated by corticosteroids, CsA and, to a lesser extent, tacrolimus. In patients, who are not normotensive after transplantation, despite adequate antihypertensive treatment, reduction or withdrawal of steroid or CNI may be beneficial."
- REF: Ch 3 Rationale (Table 2 discussion) | GRADE: rationale, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image

**K248** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: dyslipidemia may be caused or worsened by corticosteroids, cyclosporine and especially mTOR inhibitors.
- QUOTE: "Dyslipidemia may be caused or exacerbated by corticosteroids, CsA and especially by mTORi."
- REF: Ch 3 Rationale (Table 2 discussion) | GRADE: rationale, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image

**K381** | USE: NODE | image
- CLAIM: KDIGO 2009: nonadherence may occur early or late after transplantation.
- QUOTE: "Nonadherence may occur early and/or late after transplantation."
- REF: Ch 11 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 51, printed S38 | SOURCE-MODE: image

**K382** | USE: NODE | image
- CLAIM: KDIGO 2009: patients are taught that chronic rejection is insidious in onset, hard to diagnose in its early stages and often not reversible once established.
- QUOTE: "Teach patients that chronic rejection is insidious in onset, hard to diagnose in its early stages and often not reversible once established."
- REF: Table 11 (education and medical intervention) | GRADE: table, ungraded | PAGE: PDF 52, printed S39 | SOURCE-MODE: image

**K383** | USE: NODE | image
- CLAIM: KDIGO 2009: patients are told to keep taking immunosuppressive agents even if the transplanted organ is functioning well.
- QUOTE: "Ensure the patients understand that they need to continue taking immunosuppressive agents even if the transplanted organ is functioning well."
- REF: Table 11 (education and medical intervention) | GRADE: table, ungraded | PAGE: PDF 52, printed S39 | SOURCE-MODE: image

## 6. Drug interactions and cautions (19 rows)

**K249** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: recommend monitoring CNI and mTOR inhibitor blood levels in patients receiving rifampin (1C).
- QUOTE: "We recommend monitoring CNI and mTORi blood levels in patients receiving rifampin."
- REF: 14.3.2 | GRADE: 1C | PAGE: PDF 74, printed S61 | SOURCE-MODE: image

**K250** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: consider substituting rifabutin for rifampin to minimize interactions with CNIs and mTOR inhibitors.
- QUOTE: "Consider substituting rifabutin for rifampin to minimize interactions with CNIs and mTORi."
- REF: 14.3.2.1 | GRADE: Not Graded | PAGE: PDF 74, printed S61 | SOURCE-MODE: image

**K251** | USE: NODE | image
- CLAIM: KDIGO 2009: rifampin strongly induces enzymes that metabolize CNIs and mTOR inhibitors, so adequate levels may be hard to keep.
- QUOTE: "rifampin is a strong inducer of the microsomal enzymes that metabolize CNIs and mTORi, and it may be difficult to maintain adequate levels of these immunosuppressive drugs to prevent rejection."
- REF: Ch 14.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 75, printed S62 | SOURCE-MODE: image

**K252** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: rifampin has required CNI doses to be increased two- to threefold.
- QUOTE: "The use of rifampin has required doses of CNIs to be increased two- to threefold"
- REF: Ch 14.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 75, printed S62 | SOURCE-MODE: image
- NOTE: Describes reported experience; not a dosing instruction.

**K253** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: rifabutin is less strong a CYP3A4 inducer than rifampin, but there is little published experience in kidney recipients.
- QUOTE: "rifabutin is not as strong an inducer of CYP3A4 as rifampin. However, there is little published experience with rifabutin in KTRs."
- REF: Ch 14.3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 75, printed S62 | SOURCE-MODE: image

**K254** | USE: NODE | image
- CLAIM: KDIGO 2009: the guideline notes interactions between fluconazole and CNIs, and a report of a possible clotrimazole-tacrolimus interaction.
- QUOTE: "a recent report suggested a potential drug-drug interaction between clotrimazole and tacrolimus (428). It is important to note that there are drug-drug interactions between fluconazole and CNIs."
- REF: Ch 14.4 Rationale | GRADE: rationale, ungraded | PAGE: PDF 75, printed S62 | SOURCE-MODE: image

**K255** | USE: NODE | image
- CLAIM: KDIGO 2009: nondihydropyridine calcium-channel blockers raise CNI levels (listed as an advantage and a disadvantage).
- QUOTE: "Calcium-channel blockers ... Increased CNI levels (allowing a reduction in dose and cost) ... Increased CNI levels ... Nondihydropyridine calcium blockers."
- REF: Table 24 (footnote b) | GRADE: table, ungraded | PAGE: PDF 86, printed S73 | SOURCE-MODE: image

**K256** | USE: NODE | image
- CLAIM: KDIGO 2009: monitor closely for adverse effects and drug-drug interactions when treating hypertension; any class of antihypertensive may be used.
- QUOTE: "use any class of antihypertensive agent; monitor closely for adverse effects and drug-drug interactions;"
- REF: 16.1.3 | GRADE: Not Graded | PAGE: PDF 84, printed S71 | SOURCE-MODE: image

**K257** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: drug-drug interactions must be monitored in recipients; statins are generally safe and effective if the dose is modified for CNI-treated patients.
- QUOTE: "there are drug-drug interactions that must be monitored in KTRs, the use of ... ('statins') is generally safe and effective in lowering LDL-C, if appropriate dose modification is made for patients treated with CNIs."
- REF: Ch 16.2 Rationale | GRADE: rationale, ungraded | PAGE: PDF 87, printed S74 | SOURCE-MODE: image

**K258** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: diabetes drug table lists sulfonylureas as raising cyclosporine levels and repaglinide levels as raised by cyclosporine.
- QUOTE: "Chlorpropamide ... Glipizide ... Glimepiride ... CsA levels ... Repaglinide levels with CsA"
- REF: Table 21 (drug-drug interactions column) | GRADE: table, ungraded | PAGE: PDF 82, printed S69 | SOURCE-MODE: image
- NOTE: Column heading "Drug-drug interactions"; sulfonylureas acetohexamide, chlorpropamide, tolazamide, tolbutamide, glipizide, gliclazide, glyburide, glimepiride each show up-arrow CsA levels.

**K259** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: diabetes drug table says metformin is contraindicated if serum creatinine is at least 1.5 mg/dL in men or 1.4 mg/dL in women.
- QUOTE: "Metformin Contraindicated if Scr ... (1.5 mg/dL) men, ... (1.4 mg/dL) women"
- REF: Table 21 | GRADE: table, ungraded | PAGE: PDF 82, printed S69 | SOURCE-MODE: image
- NOTE: Printed with the symbol for greater-than-or-equal; table row for "Biguanides".

**K260** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: the diabetes drug table says thiazolidinediones may cause fluid retention.
- QUOTE: "Thiazolidinediones may cause fluid retention."
- REF: Table 21 footnote c | GRADE: table, ungraded | PAGE: PDF 82, printed S69 | SOURCE-MODE: image

**K261** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: toxicity table: mTOR inhibitors cause delayed wound healing and proteinuria; mycophenolate and tacrolimus cause diarrhea, nausea and vomiting.
- QUOTE: "Delayed wound healing ... Diarrhea, nausea/vomiting ... Proteinuria"
- REF: Table 2 | GRADE: table, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image

**K262** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: it is important to rule out treatable causes of diarrhea, nausea or vomiting other than the immunosuppressive drug.
- QUOTE: "it is important to rule out treatable, underlying causes other than the immunosuppressive medication. In a recent study, about half of the patients were cured by treatment of an infection (58)."
- REF: Ch 3 Rationale (Table 2 discussion) | GRADE: rationale, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image

**K263** | USE: TEAM | image
- CLAIM: KDIGO 2009: only after other causes are ruled out should reducing mycophenolate, or changing it to azathioprine, be considered.
- QUOTE: "Only after ruling out other underlying causes should reducing the MMF, or changing MMF to azathioprine, be considered."
- REF: Ch 3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image

**K264** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: consider avoiding an mTOR inhibitor in a patient with persistent urinary protein excretion above 500-1000 mg/day.
- QUOTE: "Consider avoiding an mTORi in a patient with persistent urinary protein excretion of more than 500-1000 mg/day."
- REF: Ch 3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image

**K265** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: patients with significant dyslipidemia before or after transplant should probably avoid mTOR inhibitors.
- QUOTE: "Patients with significant dyslipidemia before or after transplantation should probably avoid mTORi."
- REF: Ch 3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image

**K266** | USE: TEAM | image
- CLAIM: KDIGO 2009: delayed wound healing on an mTOR inhibitor may improve by switching the mTOR inhibitor to a CNI.
- QUOTE: "Patients who have delayed wound healing on an mTORi may benefit from switching the mTORi to a CNI."
- REF: Ch 3 Rationale | GRADE: rationale, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image

**K267** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: mycophenolate and tacrolimus may cause diarrhea, nausea and vomiting; checking MPA and tacrolimus levels may help reduce these.
- QUOTE: "Diarrhea, nausea and vomiting may be caused or exacerbated by MMF and tacrolimus. Monitoring MPA, AUC and tacrolimus ... levels may help to reduce these complications."
- REF: Ch 3 Rationale (Table 2 discussion) | GRADE: rationale, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image

## 7. Cardiovascular and metabolic (27 rows)

**K268** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: recommend measuring blood pressure at each clinic visit.
- QUOTE: "We recommend measuring blood pressure at each clinic visit."
- REF: 16.1.1 | GRADE: 1C | PAGE: PDF 84, printed S71 | SOURCE-MODE: image

**K269** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: suggest keeping blood pressure below 130 mm Hg systolic and 80 mm Hg diastolic in adults.
- QUOTE: "We suggest maintaining blood pressure at <130 mm Hg systolic and <80 mm Hg diastolic if >=18 years of age"
- REF: 16.1.2 | GRADE: 2C | PAGE: PDF 84, printed S71 | SOURCE-MODE: image
- NOTE: Printed with the symbol for greater-than-or-equal before 18 years.

**K270** | USE: NODE | image
- CLAIM: KDIGO 2009: with urine protein 1 g/day or more in adults, consider an ACE inhibitor or ARB as first-line therapy.
- QUOTE: "when urine protein excretion >=1 g/day for >=18 years old and >=600 mg/m2/24 h for <18 years old, consider an ACE-I or an ARB as first-line therapy."
- REF: 16.1.3 | GRADE: Not Graded | PAGE: PDF 84, printed S71 | SOURCE-MODE: image

**K271** | USE: NODE | image
- CLAIM: KDIGO 2009: in general, no antihypertensive agent is contraindicated in kidney transplant recipients.
- QUOTE: "In general, no antihypertensive agent is contraindicated in KTRs."
- REF: Ch 16.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 85, printed S72 | SOURCE-MODE: image

**K272** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: insufficient evidence to prefer any antihypertensive class for long-term therapy.
- QUOTE: "there is insufficient evidence to recommend any class of antihypertensive agents as preferred for long-term therapy for reducing CVD or improving long-term graft survival."
- REF: Ch 16.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 85, printed S72 | SOURCE-MODE: image

**K273** | USE: NODE | image
- CLAIM: KDIGO 2009: causes of posttransplant hypertension include CNI use, corticosteroids, kidney allograft dysfunction and allograft vascular compromise.
- QUOTE: "Causes of posttransplant hypertension include CNI use, corticosteroids, kidney allograft dysfunction, allograft vascular compromise"
- REF: Ch 16.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 85, printed S72 | SOURCE-MODE: image

**K274** | USE: NODE | image
- CLAIM: KDIGO 2009: ACE inhibitors and ARBs may be associated with higher risk of hyperkalemia and anemia in recipients.
- QUOTE: "ACE-Is and ARBs may be associated with an increased risk of hyperkalemia and anemia in KTRs"
- REF: Ch 16.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 86, printed S73 | SOURCE-MODE: image

**K275** | USE: NODE | image
- CLAIM: KDIGO 2009: antihypertensive table lists hyperkalemia as a disadvantage of ACE inhibitors, aldosterone antagonists and beta-blockers.
- QUOTE: "Aldosterone antagonists ... Hyperkalemia ... Beta-blockers ... Hyperkalemia ... Angiotensin-converting enzyme inhibitor ... Hyperkalemia ... Anemia"
- REF: Table 24 | GRADE: table, ungraded | PAGE: PDF 86, printed S73 | SOURCE-MODE: image

**K276** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: antihypertensive table lists thiazides with hypomagnesemia, hyperuricemia, hyponatremia, dyslipidemias and glucose intolerance.
- QUOTE: "Thiazide diuretics ... Hypomagnesemia ... Hyperuricemia ... Hyponatremia ... Dyslipidemias ... Glucose intolerance"
- REF: Table 24 | GRADE: table, ungraded | PAGE: PDF 86, printed S73 | SOURCE-MODE: image

**K277** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: diuretics may be effective, since hypertension in CNI-treated recipients may be sodium dependent.
- QUOTE: "Diuretics may be effective in treating hypertension in KTRs, since hypertension in CNI-treated KTRs may be sodium dependent"
- REF: Ch 16.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 86, printed S73 | SOURCE-MODE: image

**K278** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: new-onset diabetes after transplant: recommend screening all nondiabetic recipients at least weekly for 4 weeks, every 3 months for a year, then annually.
- QUOTE: "We recommend screening all nondiabetic KTRs with fasting plasma glucose, oral glucose tolerance testing, and/or HbA1c (1C) at least: weekly for 4 weeks (2D); every 3 months for 1 year (2D); and annually, thereafter. (2D)"
- REF: 15.1.1 | GRADE: 1C overall; 2D each interval | PAGE: PDF 79, printed S66 | SOURCE-MODE: image

**K279** | USE: NODE | image
- CLAIM: KDIGO 2009: suggest screening for diabetes after starting, or substantially increasing the dose of, a CNI, mTOR inhibitor or corticosteroid.
- QUOTE: "We suggest screening for NODAT with fasting glucose, oral glucose tolerance testing, and/or HbA1c after starting, or substantially increasing the dose, of CNIs, mTORi, or corticosteroids."
- REF: 15.1.2 | GRADE: 2D | PAGE: PDF 79, printed S66 | SOURCE-MODE: image

**K280** | USE: NODE | image
- CLAIM: KDIGO 2009: treating acute rejection with high-dose corticosteroids should prompt screening for new-onset diabetes.
- QUOTE: "Treating acute rejection with high-dose corticosteroids, for example, should prompt screening for NODAT."
- REF: Ch 15.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 79, printed S66 | SOURCE-MODE: image

**K281** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: new-onset diabetes in the first year after transplant is found in 10-30% of adults on cyclosporine or tacrolimus plus corticosteroids.
- QUOTE: "cumulative incidence of NODAT by the end of the first year has generally been found to be 10-30% in adults receiving CsA or tacrolimus plus corticosteroids"
- REF: Ch 15.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 79, printed S66 | SOURCE-MODE: image

**K282** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: new-onset diabetes incidence is highest in the first 3 months after transplant.
- QUOTE: "the incidence of NODAT is highest in the first 3 months after transplantation."
- REF: Ch 15.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 79, printed S66 | SOURCE-MODE: image

**K283** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: diabetes criteria: fasting glucose 126 mg/dL or more; symptoms plus casual glucose 200 mg/dL or more; or 2-hour OGTT 200 mg/dL or more.
- QUOTE: "Fasting plasma glucose >=126 mg/dL (7.0 mmol/L) ... Symptoms of hyperglycemia and a casual plasma glucose >=200 mg/dL (11.1 mmol/L)"
- REF: Table 19 | GRADE: table, ungraded | PAGE: PDF 79, printed S66 | SOURCE-MODE: image
- NOTE: Printed with the greater-than-or-equal symbol. Footnote: absent unequivocal hyperglycemia, confirm on a different day.

**K284** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: untreated diabetes may increase metabolic complications including hyperkalemia and even ketoacidosis; frequency after transplant is unknown.
- QUOTE: "Untreated diabetes may increase the risk of metabolic complications, including hyperkalemia, and even ketoacidosis. However, there is no evidence from observational studies to suggest how frequently these complications occur after NODAT."
- REF: Ch 15.2 Background | GRADE: background, ungraded | PAGE: PDF 81, printed S68 | SOURCE-MODE: image

**K285** | USE: TEAM | image
- CLAIM: KDIGO 2009: if diabetes develops, consider modifying immunosuppression, after weighing rejection risk and other adverse effects.
- QUOTE: "If NODAT develops, consider modifying the immunosuppressive drug regimen to reverse or ameliorate diabetes, after weighing the risk of rejection and other potential adverse effects."
- REF: 15.2.1 | GRADE: Not Graded | PAGE: PDF 81, printed S68 | SOURCE-MODE: image

**K286** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: consider targeting HbA1c 7.0-7.5% and avoid targeting 6.0% or lower, especially if hypoglycemic reactions are common.
- QUOTE: "Consider targeting HbA1c 7.0-7.5%, and avoid targeting HbA1c <=6.0%, especially if hypoglycemic reactions are common."
- REF: 15.2.2 | GRADE: Not Graded | PAGE: PDF 81, printed S68 | SOURCE-MODE: image
- NOTE: Printed with a less-than-or-equal symbol.

**K287** | USE: TEAM | image
- CLAIM: KDIGO 2009: steroid reduction or withdrawal may help impaired glucose tolerance; tacrolimus to cyclosporine microemulsion switch may be considered.
- QUOTE: "In patients with impaired glucose tolerance or NODAT, steroid reduction or withdrawal may be beneficial. If this is not sufficient, a switch from tacrolimus to CsA-ME may be considered."
- REF: Ch 3 Rationale (Table 2 discussion) | GRADE: rationale, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image

**K288** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: complete lipid profile 2-3 months after transplant, after treatment changes, and at least annually.
- QUOTE: "Measure a complete lipid profile in all adult (>=18 years old) and adolescent (puberty to 18 years old) KTRs ... 2-3 months after transplantation; ... at least annually, thereafter."
- REF: 16.2.1 | GRADE: Not Graded | PAGE: PDF 86-87, printed S73-S74 | SOURCE-MODE: image
- NOTE: Statement begins at the bottom of PDF 86 and ends at the top of PDF 87.

**K289** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: adults with fasting triglycerides 500 mg/dL or more not correctable by treating a cause: lifestyle changes plus a triglyceride-lowering agent.
- QUOTE: "For KTRs with fasting triglycerides >=500 mg/dL (>=5.65 mmol/L) that cannot be corrected by removing an underlying cause, treat with: Adults: therapeutic lifestyle changes and a triglyceride-lowering agent"
- REF: 16.2.2.1 | GRADE: Not Graded (based on KDOQI) | PAGE: PDF 87, printed S74 | SOURCE-MODE: image

**K290** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: adults with LDL cholesterol 100 mg/dL or more: treat to reduce LDL below 100 mg/dL.
- QUOTE: "Adults: If LDL-C >=100 mg/dL (>=2.59 mmol/L), treat to reduce LDL-C to <100 mg/dL (<2.59 mmol/L)"
- REF: 16.2.2.2 | GRADE: Not Graded (based on KDOQI) | PAGE: PDF 87, printed S74 | SOURCE-MODE: image

**K291** | USE: NODE | image
- CLAIM: KDIGO 2009: consider managing cardiovascular disease at least as intensively in recipients as in the general population.
- QUOTE: "Consider managing CVD at least as intensively in KTRs as in the general population, with appropriate diagnostic tests and treatments."
- REF: 17.1 | GRADE: Not Graded | PAGE: PDF 93, printed S80 | SOURCE-MODE: image

**K292** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 DOSE: suggest aspirin 65-100 mg/day for all patients with atherosclerotic cardiovascular disease, unless contraindicated.
- QUOTE: "We suggest using aspirin (65-100 mg/day) in all patients with atherosclerotic CVD, unless there are contraindications."
- REF: 17.2 | GRADE: 2B | PAGE: PDF 93, printed S80 | SOURCE-MODE: image
- NOTE: DOSE row (aspirin, not an immunosuppressant); about long-term prevention, not an emergency treatment.

**K293** | USE: NODE | image
- CLAIM: KDIGO 2009: the guideline considers management of cardiovascular disease complications beyond its scope.
- QUOTE: "The Work Group chose to deal with the prevention of CVD after kidney transplantation, and considered the management of CVD complications to be beyond the scope of this guideline."
- REF: Ch 17 Background | GRADE: background, ungraded | PAGE: PDF 93, printed S80 | SOURCE-MODE: image

**K294** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: the leading cause of death in recipients is cardiovascular disease, so CVD-reducing treatments are likely cost-effective for them too.
- QUOTE: "the leading cause of death in KTRs is CVD, making it likely that treatments that reduce the risk of CVD in the general population will also be cost-effective in KTRs."
- REF: Ch 16.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 84, printed S71 | SOURCE-MODE: image

## 8. Blood and bone (55 rows)

**K295** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: anemia means hemoglobin under 13.5 g/dL in adult men or under 12.0 g/dL in adult women.
- QUOTE: "Anemia is defined as a hemoglobin <13.5 g/dL (135 g/L) in adult males, <12.0 g/dL (120 g/L) in adult females"
- REF: Ch 22 Background | GRADE: background, ungraded | PAGE: PDF 110, printed S97 | SOURCE-MODE: image

**K296** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: neutropenia is a neutrophil count under 1500 per microliter; thrombocytopenia is platelets under 150,000 per microliter.
- QUOTE: "Neutropenia is defined as a neutrophil count <1500/ ... Thrombocytopenia is defined as platelet count <150 000/"
- REF: Ch 22 Background | GRADE: background, ungraded | PAGE: PDF 110, printed S97 | SOURCE-MODE: image
- NOTE: Printed with a Greek mu and superscripts; the platelet SI figure as printed is 1.5 x 10^11/L.

**K297** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: erythrocytosis is defined as hemoglobin above 17 g/dL or hematocrit above 51%.
- QUOTE: "The Work Group has chosen to define erythrocytosis as hemoglobin >17 g/dL or a ... >51%."
- REF: Ch 22 Background | GRADE: background, ungraded | PAGE: PDF 110, printed S97 | SOURCE-MODE: image

**K298** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: perform blood count at least daily for 7 days or until discharge, 2-3 times weekly weeks 2-4, weekly months 2-3, monthly months 4-12.
- QUOTE: "Perform a complete blood count at least (Not Graded): daily for 7 days, or until hospital discharge, whichever is earlier; two to three times per week for weeks 2-4; weekly for months 2-3; monthly for months 4-12;"
- REF: 22.1 | GRADE: Not Graded | PAGE: PDF 110, printed S97 | SOURCE-MODE: image

**K299** | USE: NODE | image
- CLAIM: KDIGO 2009: repeat the blood count after any change in medication that may cause neutropenia, anemia or thrombocytopenia.
- QUOTE: "then at least annually, and after any change in medication that may cause neutropenia, anemia or thrombocytopenia."
- REF: 22.1 | GRADE: Not Graded | PAGE: PDF 110, printed S97 | SOURCE-MODE: image

**K300** | USE: NODE | image
- CLAIM: KDIGO 2009: assess and treat anemia by removing underlying causes and using standard measures for chronic kidney disease.
- QUOTE: "Assess and treat anemia by removing underlying causes whenever possible and using standard measures applicable to CKD."
- REF: 22.2 | GRADE: Not Graded | PAGE: PDF 110, printed S97 | SOURCE-MODE: image

**K301** | USE: NODE | image
- CLAIM: KDIGO 2009: treat neutropenia and thrombocytopenia by treating underlying causes whenever possible.
- QUOTE: "For treatment of neutropenia and thrombocytopenia, include treatment of underlying causes whenever possible."
- REF: 22.3 | GRADE: Not Graded | PAGE: PDF 110, printed S97 | SOURCE-MODE: image

**K302** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: recommend ACE inhibitors or ARBs for initial treatment of erythrocytosis.
- QUOTE: "We recommend using ACE-Is or ARBs for initial treatment of erythrocytosis."
- REF: 22.4 | GRADE: 1C | PAGE: PDF 110, printed S97 | SOURCE-MODE: image

**K303** | USE: NODE | image
- CLAIM: KDIGO 2009: anemia after the immediate posttransplant period may come from infections, rejection, immunosuppressants, ACE inhibitors or ARBs, hemolysis and less often cancer.
- QUOTE: "infections, rejection, immunosuppressive medications, other medications such as ACE-Is and ARBs (Table 31), hemolysis, and-less often-cancer, may cause or contribute to anemia."
- REF: Ch 22 Rationale (Anemia) | GRADE: rationale, ungraded | PAGE: PDF 110, printed S97 | SOURCE-MODE: image

**K304** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: anemia in the immediate posttransplant period is likely from pretransplant anemia and operative blood loss.
- QUOTE: "Anemia in the immediate posttransplant period is likely to be caused by pretransplant anemia and operative blood loss."
- REF: Ch 22 Rationale (Anemia) | GRADE: rationale, ungraded | PAGE: PDF 110, printed S97 | SOURCE-MODE: image

**K305** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: iron deficiency is common in recipients with anemia.
- QUOTE: "Treatment should be directed at the underlying cause. Iron deficiency is common."
- REF: Ch 22 Rationale (Anemia) | GRADE: rationale, ungraded | PAGE: PDF 110, printed S97 | SOURCE-MODE: image

**K306** | USE: NODE | image
- CLAIM: KDIGO 2009: medications commonly causing anemia include azathioprine, MPA, sirolimus, leflunomide, ACE inhibitors and ARBs.
- QUOTE: "Anemia Azathioprine ... MPA ... Sirolimus ... Leflunomide ... ACE-I ... ARB"
- REF: Table 31 (Commonly) | GRADE: table, ungraded | PAGE: PDF 111, printed S98 | SOURCE-MODE: image

**K307** | USE: NODE | image
- CLAIM: KDIGO 2009: medications commonly causing neutropenia include azathioprine, MPA, sirolimus, leflunomide, lymphocyte-depleting antibodies, valganciclovir and trimethoprim-sulfamethoxazole.
- QUOTE: "Neutropenia Azathioprine ... MPA ... Sirolimus ... Leflunomide ... Lymphocyte-depleting antibodies ... Valganciclovir ... Trimethoprim-sulfamethoxazole"
- REF: Table 31 (Commonly) | GRADE: table, ungraded | PAGE: PDF 111, printed S98 | SOURCE-MODE: image

**K308** | USE: NODE | image
- CLAIM: KDIGO 2009: medications commonly causing thrombocytopenia include sirolimus, MPA, azathioprine and lymphocyte-depleting antibodies; uncommonly valganciclovir, clopidogrel, heparin.
- QUOTE: "Thrombocytopenia Sirolimus ... MPA ... Azathioprine ... Lymphocyte-depleting antibodies ... Valganciclovir ... Ticlopidine/clopidogrel ... Heparin"
- REF: Table 31 | GRADE: table, ungraded | PAGE: PDF 111, printed S98 | SOURCE-MODE: image

**K309** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: uncommon causes of neutropenia listed include rituximab, ACE inhibitors, ticlopidine/clopidogrel and other antimicrobials.
- QUOTE: "Rituximab ... ACE-I ... Ticlopidine/clopidogrel ... Other antimicrobials"
- REF: Table 31 (Uncommonly) | GRADE: table, ungraded | PAGE: PDF 111, printed S98 | SOURCE-MODE: image

**K310** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: infection is the second most common cause of death after cardiovascular disease in recipients.
- QUOTE: "Infection is the second most common cause of death, after CVD, in KTRs"
- REF: Ch 22 Rationale (Neutropenia) | GRADE: rationale, ungraded | PAGE: PDF 111, printed S98 | SOURCE-MODE: image

**K311** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: in nontransplant patients with neutrophils under 500 per microliter, serious infection risk is increased.
- QUOTE: "In the nontransplant population with iatrogenic neutropenia (absolute neutrophil count <500/ ... patients are at increased risk for serious infection"
- REF: Ch 22 Rationale (Neutropenia) | GRADE: rationale, ungraded | PAGE: PDF 111, printed S98 | SOURCE-MODE: image
- NOTE: Evidence is from nontransplant patients, not recipients.

**K312** | USE: NODE | image
- CLAIM: KDIGO 2009: kidney dysfunction may delay clearance of medications that suppress leukocyte production, possibly contributing to neutropenia.
- QUOTE: "A possible major contributor to neutropenia in KTRs is that kidney dysfunction may delay clearance of medications that can suppress leukocyte production by the bone marrow."
- REF: Ch 22 Rationale (Neutropenia) | GRADE: rationale, ungraded | PAGE: PDF 111, printed S98 | SOURCE-MODE: image

**K313** | USE: TEAM | image
- CLAIM: KDIGO 2009: for anemia or low white cells on mycophenolate or azathioprine, first suggested actions are checking MPA exposure (AUC) and probably reducing the dose.
- QUOTE: "Monitoring of the mycophenolic acid (MPA) area under the concentration-time curve (AUC), and probably reduction of the dose of MMF or azathioprine, are the first suggested actions in case of anemia or leucopenia."
- REF: Ch 3 Rationale (Table 2 discussion) | GRADE: rationale, ungraded | PAGE: PDF 28, printed S15 | SOURCE-MODE: image

**K314** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest treating hyperuricemia when complications such as gout, tophi or uric acid stones occur.
- QUOTE: "We suggest treating hyperuricemia in KTRs when there are complications, such as gout, tophi, or uric acid stones."
- REF: 23.1 | GRADE: 2D | PAGE: PDF 115, printed S102 | SOURCE-MODE: image

**K315** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: suggest colchicine for acute gout, with dose reduction for reduced kidney function and concomitant CNI use.
- QUOTE: "We suggest colchicine for treating acute gout, with appropriate dose reduction for reduced kidney function and concomitant CNI use."
- REF: 23.1.1 | GRADE: 2D | PAGE: PDF 115, printed S102 | SOURCE-MODE: image
- NOTE: No dose is stated here.

**K316** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: recommend avoiding allopurinol in patients receiving azathioprine.
- QUOTE: "We recommend avoiding allopurinol in patients receiving azathioprine."
- REF: 23.1.2 | GRADE: 1B | PAGE: PDF 115, printed S102 | SOURCE-MODE: image

**K317** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: suggest avoiding NSAIDs and COX-2 inhibitors whenever possible.
- QUOTE: "We suggest avoiding NSAIDs and COX-2 inhibitors whenever possible."
- REF: 23.1.3 | GRADE: 2D | PAGE: PDF 115, printed S102 | SOURCE-MODE: image

**K318** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: hyperuricemia means uric acid above 6.0 mg/dL in women and above 7.0 mg/dL in men.
- QUOTE: "the Work Group chose to define hyperuricemia as >0.36 mmol/L (6.0 mg/dL) in women and >0.42 mmol/L (7.0 mg/dL) in men."
- REF: Ch 23 Background | GRADE: background, ungraded | PAGE: PDF 115, printed S102 | SOURCE-MODE: image

**K319** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: hyperuricemia is very common in recipients; gout cumulative incidence was 7.6% at 3 years in one Medicare analysis.
- QUOTE: "the cumulative incidence of gout was 7.6% at 3 years after transplantation"
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 115, printed S102 | SOURCE-MODE: image

**K320** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: hyperuricemia rates are higher with CNIs, especially cyclosporine, than with azathioprine; other risk factors include diuretics, older age and hypertension.
- QUOTE: "Several studies have shown rates to be higher with CNIs, and especially CsA, when compared to azathioprine"
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 115, printed S102 | SOURCE-MODE: image

**K321** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: acute kidney injury from very high uric acid levels has been reported.
- QUOTE: "Acute kidney injury from very high uric acid levels has been reported"
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 115, printed S102 | SOURCE-MODE: image
- NOTE: Cited as a report (ref 820), no management stated.

**K322** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: allopurinol with azathioprine can cause profound, life-threatening pancytopenia; use with extreme caution or not at all.
- QUOTE: "allopurinol and azathioprine used together can result in profound, life-threatening pancytopenia (627,753), and thus this combination should be used with extreme caution, or not at all."
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 116, printed S103 | SOURCE-MODE: image
- NOTE: The same paragraph gives an azathioprine dose reduction if the two are combined; omitted under the no-immunosuppressant-dose rule. Mycophenolate does not interact with allopurinol (next row).

**K323** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: mycophenolate does not interact with allopurinol and can replace azathioprine if an antiproliferative is needed.
- QUOTE: "Mycophenolate does not interact with allopurinol and can be used in place of azathioprine if an antiproliferative agent is necessary for immunosuppression"
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 116, printed S103 | SOURCE-MODE: image

**K324** | USE: NODE | image
- CLAIM: KDIGO 2009: the evidence reviews it cites recommend oral colchicine and/or NSAIDs as first-line agents for gout (rationale, ungraded).
- QUOTE: "oral colchicines and/or nonsteroidal anti-inflammatory agents are recommended as first-line agents for gout (824)."
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 116, printed S103 | SOURCE-MODE: image
- NOTE: Quote is the cited review's first-line statement; the guideline's own suggestion is 23.1.3 (avoid NSAIDs and COX-2 inhibitors, 2D).

**K325** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: NSAIDs and COX-2 inhibitors can significantly reduce kidney function and cause acute kidney injury.
- QUOTE: "Nonsteroidal anti-inflammatory agents and cyclo-oxygenase-2 inhibitors can be associated with significant reductions in kidney function and acute kidney injury"
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 116, printed S103 | SOURCE-MODE: image

**K326** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: colchicine levels may be raised in reduced kidney function and with cyclosporine, and presumably tacrolimus.
- QUOTE: "Cochicine levels may be increased in patients with reduced kidney function and in patients treated with CsA (and presumably tacrolimus)."
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 116, printed S103 | SOURCE-MODE: image
- NOTE: Guideline spells "Cochicine" (sic).

**K327** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: life-threatening colchicine toxicity was described with colchicine 1 mg/day for only 5-8 days in reduced kidney function.
- QUOTE: "Life-threatening colchicine toxicity has been described in patients with reduced kidney function receiving colchicine 1 mg/day for only 5-8 days"
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 116, printed S103 | SOURCE-MODE: image
- NOTE: DOSE row: a reported event, not a dosing instruction.

**K328** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 DOSE: in patients with eGFR under 60, avoid prolonged colchicine and avoid doses above 0.6 mg/day.
- QUOTE: "prolonged use of colchicine should be avoided in patients with eGFR <60 ... In patients with eGFR <60 ... avoid doses higher than 0.6 mg/day."
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 116, printed S103 | SOURCE-MODE: image
- NOTE: DOSE row. Rationale text, not a graded recommendation; printed with less-than and greater-than symbols; quote is 49 words in the guideline and the first 40 are checked.

**K329** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: intraarticular or short-term systemic steroids have been used for gout if colchicine and NSAIDs are contraindicated or not tolerated.
- QUOTE: "Intraarticular or short-term systemic steroids have also been used if the above therapies are contraindicated or not tolerated (824)."
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 116, printed S103 | SOURCE-MODE: image

**K330** | USE: NODE | image
- CLAIM: KDIGO 2009: uric acid may be normal during an acute gouty attack.
- QUOTE: "Measuring uric acid levels is indicated in patients with suspected gout; however, during an acute gouty attack, levels may be normal (804)."
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 116, printed S103 | SOURCE-MODE: image

**K331** | USE: NODE | image
- CLAIM: KDIGO 2009: the guideline says treatment of gout itself is beyond its scope.
- QUOTE: "Treatment of gout is beyond the scope of these guidelines."
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 116, printed S103 | SOURCE-MODE: image

**K332** | USE: TEAM | text
- CLAIM: KDIGO 2009: citing cancer-literature guidelines, febrile neutropenia benefits from colony-stimulating factors plus antibiotics if pneumonia, fungal infection, hypotension, sepsis syndrome or multisystem failure.
- QUOTE: "guidelines in the cancer literature ... CSFs (616). ... patients with febrile neutropenia (absolute neutrophil count <500/ ... benefit from CSFs along with antibiotics if there is pneumonia, fungal infection, hypotension, sepsis syndrome or multisystem organ failure."
- REF: Ch 22 Rationale (Neutropenia) | GRADE: rationale, ungraded | PAGE: PDF 112, printed S99 | SOURCE-MODE: text
- NOTE: The sentence summarises oncology-literature evidence the guideline cites (ASCO); it is not a kidney-transplant trial and no recommendation number is attached. Printed ANC symbol is a Greek mu rendered as "L" in the extracted text. Guideline also says CSFs may have been associated with worsening graft function in one case report.

**K333** | USE: OVERLAY | text
- CLAIM: KDIGO 2009: colony-stimulating factors have a potential for harm; one case report suggested worsening graft function.
- QUOTE: "One case report suggested that CSFs may have been associated with worsening graft function (758)."
- REF: Ch 22 Rationale (Neutropenia) | GRADE: rationale, ungraded | PAGE: PDF 112, printed S99 | SOURCE-MODE: text

**K334** | USE: SUMMARY-CANDIDATE | text
- CLAIM: KDIGO 2009: thrombotic microangiopathy can cause kidney dysfunction, hemolytic anemia and thrombocytopenia in recipients.
- QUOTE: "relatively uncommon conditions, such as recurrent or de novo thrombotic microangiopathy, that can cause kidney dysfunction, hemolytic anemia and thrombocytopenia"
- REF: Ch 22 Rationale (Thrombocytopenia) | GRADE: rationale, ungraded | PAGE: PDF 112, printed S99 | SOURCE-MODE: text

**K335** | USE: NODE | text
- CLAIM: KDIGO 2009: thrombocytopenia is also seen with thrombotic microangiopathy linked to CNIs and, rarely, clopidogrel and valacyclovir.
- QUOTE: "Thrombocytopenia is also observed in patients with thrombotic microangiopathy associated with CNIs and, rarely, other medications such as clopidogrel and valacyclovir"
- REF: Ch 22 Rationale (Thrombocytopenia) | GRADE: rationale, ungraded | PAGE: PDF 112, printed S99 | SOURCE-MODE: text

**K336** | USE: NODE | text
- CLAIM: KDIGO 2009: other causes of low white cells and platelets include severe sepsis, viral infection (CMV, parvovirus B19) and other medications.
- QUOTE: "Other causes of leucopenia and thrombocytopenia include severe sepsis, viral infection (CMV, parvovirus B19) and other medications"
- REF: Ch 22 Rationale (Thrombocytopenia) | GRADE: rationale, ungraded | PAGE: PDF 112, printed S99 | SOURCE-MODE: text

**K337** | USE: NODE | text
- CLAIM: KDIGO 2009: patients with low platelet counts are at increased risk of bleeding; treatment is removing offending drugs or treating other causes.
- QUOTE: "Patients with low platelet counts are at increased risk of bleeding. Treatment of thrombocytopenia includes removing the offending drugs or treating other underlying causes."
- REF: Ch 22 Rationale (Thrombocytopenia) | GRADE: rationale, ungraded | PAGE: PDF 112, printed S99 | SOURCE-MODE: text

**K338** | USE: TEAM | text
- CLAIM: KDIGO 2009: parvovirus B19-associated blood abnormalities have been treated with intravenous immunoglobulin in case series.
- QUOTE: "case series have shown that parvovirus B19 associated hematologic abnormalities can be treated with intravenous immunoglobulin (751)."
- REF: Ch 22 Rationale (Thrombocytopenia) | GRADE: rationale, ungraded | PAGE: PDF 112, printed S99 | SOURCE-MODE: text

**K339** | USE: NODE | text
- CLAIM: KDIGO 2009: the combination of allopurinol and azathioprine should be avoided to prevent neutropenia.
- QUOTE: "The combination of allopurinol and azathioprine should be avoided to prevent neutropenia (616)."
- REF: Ch 22 Rationale (Neutropenia) | GRADE: rationale, ungraded | PAGE: PDF 112, printed S99 | SOURCE-MODE: text

**K340** | USE: SUMMARY-CANDIDATE | text
- CLAIM: KDIGO 2009: erythrocytosis in recipients can be symptomless, or cause fatigue, headaches, plethora, dyspnea or blurred vision.
- QUOTE: "In KTRs, erythrocytosis can be asymptomatic, or patients may complain of fatigue, headaches, plethora, dyspnea or blurred vision"
- REF: Ch 22 Rationale (Erythrocytosis) | GRADE: rationale, ungraded | PAGE: PDF 113, printed S100 | SOURCE-MODE: text

**K341** | USE: NODE | text
- CLAIM: KDIGO 2009: the more serious consequences of erythrocytosis include increased risk of venous and arterial thrombosis.
- QUOTE: "The more serious consequences include increased risk of venous and arterial thrombosis"
- REF: Ch 22 Rationale (Erythrocytosis) | GRADE: rationale, ungraded | PAGE: PDF 113, printed S100 | SOURCE-MODE: text
- NOTE: Same section: in a large registry analysis of recipients, erythrocytosis was not a risk factor for stroke.

**K342** | USE: OVERLAY | text
- CLAIM: KDIGO 2009: erythrocytosis occurs in 8-22% of reports, usually within 2 years but can occur later.
- QUOTE: "The incidence of erythrocytosis varies from 8% to 22% among reports identified from earlier clinical practice guideline publications"
- REF: Ch 22 Rationale (Erythrocytosis) | GRADE: rationale, ungraded | PAGE: PDF 113, printed S100 | SOURCE-MODE: text

**K343** | USE: OVERLAY | text
- CLAIM: KDIGO 2009: hypercalcemia after transplant is common, usually from persisting hyperparathyroidism; it may need parathyroidectomy.
- QUOTE: "Hypercalcemia following kidney transplantation is common and is usually due to hyperparathyroidism that persists from the preceding period of CKD. In 30-50% of KTRs, abnormal PTH secretion persists, causing hypercalcemia that may require parathyroidectomy"
- REF: Ch 21 Rationale | GRADE: rationale, ungraded | PAGE: PDF 108, printed S95 | SOURCE-MODE: text
- NOTE: Same section: in 30-50% of recipients abnormal PTH secretion persists, causing hypercalcemia that may require parathyroidectomy.

**K344** | USE: TEAM | image
- CLAIM: KDIGO 2009: recommend measuring serum calcium and phosphorus at least weekly until stable in the immediate post-transplant period.
- QUOTE: "In patients in the immediate post-kidney transplant period, we recommend measuring serum calcium and phosphorus at least weekly, until stable."
- REF: 21.1 | GRADE: 1B | PAGE: PDF 106, printed S93 | SOURCE-MODE: image

**K345** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest not routinely testing bone mineral density in CKD stages 4-5T, because it does not predict fracture risk or bone disease type.
- QUOTE: "In patients with CKD stages 4-5T, we suggest that BMD testing not be performed routinely, because BMD does not predict fracture risk as it does in the general population"
- REF: 21.7 | GRADE: 2B | PAGE: PDF 106, printed S93 | SOURCE-MODE: image

**K346** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: consider a bone biopsy to guide treatment, specifically before bisphosphonates, because adynamic bone disease is common.
- QUOTE: "It is reasonable to consider a bone biopsy to guide treatment, specifically before the use of bisphosphonates due to the high incidence of adynamic bone disease."
- REF: 21.6.2 | GRADE: Not Graded | PAGE: PDF 106, printed S93 | SOURCE-MODE: image

**K347** | USE: NODE | text
- CLAIM: KDIGO 2009: the risk of fractures after kidney transplantation is high.
- QUOTE: "The risk of fractures following kidney transplantation is high."
- REF: Ch 21 Rationale bullet | GRADE: rationale, ungraded | PAGE: PDF 107, printed S94 | SOURCE-MODE: text

**K348** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest vitamin D deficiency and insufficiency be corrected using general-population strategies.
- QUOTE: "we suggest that vitamin D deficiency and insufficiency be corrected using treatment strategies recommended for the general population."
- REF: 21.4 | GRADE: 2C | PAGE: PDF 106, printed S93 | SOURCE-MODE: image

**K384** | USE: OVERLAY | image
- CLAIM: KDIGO 2009 DOSE: colchicine can be used at reduced doses for under 1 week in patients with eGFR above 10 who do not require dialysis.
- QUOTE: "colchicine can be used at reduced doses for <1 week in patients with eGFR >10 ... not requiring dialysis."
- REF: Ch 23 Rationale | GRADE: rationale, ungraded | PAGE: PDF 116, printed S103 | SOURCE-MODE: image
- NOTE: Printed with less-than and greater-than symbols; no dose number is given for the reduced dose.

## 9. Cancer (15 rows)

**K349** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: recommend telling recipients, especially fair-skinned or sun-exposed ones, that their skin and lip cancer risk is very high.
- QUOTE: "We recommend that KTRs, especially those who have fair skin, live in high sun-exposure climates, ... or have a history of skin cancer, be told that their risk of skin and lip cancer is very high."
- REF: 18.1 | GRADE: 1C | PAGE: PDF 97, printed S84 | SOURCE-MODE: image
- NOTE: Quote is 55 words in the guideline; the first 40 are quoted.

**K350** | USE: NODE | image
- CLAIM: KDIGO 2009: suggest adult recipients do skin and lip self-examinations and report new lesions to a health-care provider.
- QUOTE: "We suggest that adult KTRs perform skin and lip self-examinations and report new lesions to a health-care provider."
- REF: 18.3 | GRADE: 2D | PAGE: PDF 97, printed S84 | SOURCE-MODE: image

**K351** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest annual skin and lip examination by a qualified professional, except possibly for recipients with dark skin pigmentation.
- QUOTE: "we suggest that a qualified health professional, with experience in diagnosing skin cancer, perform annual skin and lip examination on KTRs, except possibly for KTRs with dark skin pigmentation."
- REF: 18.4 | GRADE: 2D | PAGE: PDF 97, printed S84 | SOURCE-MODE: image

**K352** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: skin cancers include basal cell carcinoma, squamous cell carcinoma and malignant melanoma.
- QUOTE: "Skin cancers include basal cell carcinoma, squamous cell carcinoma and malignant melanomas."
- REF: Ch 18 Background | GRADE: background, ungraded | PAGE: PDF 97, printed S84 | SOURCE-MODE: image
- NOTE: Higher incidence is in the Rationale text: "Skin cancers occur with a much higher incidence in KTRs compared to the general population."

**K353** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: screen for cervical, breast and colon cancer in women, and prostate and colon cancer in men, per local general-population guidelines.
- QUOTE: "Screen for the following cancers as per local guidelines for the general population (Not Graded): Women: cervical, breast and colon cancer; Men: prostate and colon cancer."
- REF: 19.2 | GRADE: Not Graded | PAGE: PDF 99, printed S86 | SOURCE-MODE: image

**K354** | USE: TEAM | image
- CLAIM: KDIGO 2009: suggest consideration be given to reducing immunosuppressive medications for recipients with cancer.
- QUOTE: "We suggest consideration be given to reducing immunosuppressive medications for KTRs with cancer."
- REF: 20.1 | GRADE: 2C | PAGE: PDF 102, printed S89 | SOURCE-MODE: image

**K355** | USE: TEAM | image
- CLAIM: KDIGO 2009: factors to weigh include cancer stage, whether the cancer is likely worsened by immunosuppression, available cancer therapies, and interference with standard chemotherapy.
- QUOTE: "the stage of cancer at diagnosis; whether the cancer is likely to be exacerbated by immunosuppression; the therapies available for the cancer; whether immunosuppressive medications interfere with ability to administer the standard chemotherapy."
- REF: 20.1.1 | GRADE: Not Graded | PAGE: PDF 102, printed S89 | SOURCE-MODE: image

**K356** | USE: TEAM | image
- CLAIM: KDIGO 2009: for Kaposi sarcoma, suggest an mTOR inhibitor along with a reduction in overall immunosuppression.
- QUOTE: "For patients with Kaposi sarcoma, we suggest using mTORi along with a reduction in overall immunosuppression."
- REF: 20.2 | GRADE: 2C | PAGE: PDF 102, printed S89 | SOURCE-MODE: image

**K357** | USE: TEAM | image
- CLAIM: KDIGO 2009: standard established treatment for PTLD and Kaposi sarcoma includes reducing immunosuppression, sufficient to control or eliminate tumors in some recipients.
- QUOTE: "The standard established treatment for PTLD and Kaposi's sarcoma includes reducing immunosuppression, and this has proven to be sufficient to control or eliminate tumors in some KTRs"
- REF: Ch 20 Rationale | GRADE: rationale, ungraded | PAGE: PDF 102, printed S89 | SOURCE-MODE: image

**K358** | USE: TEAM | image
- CLAIM: KDIGO 2009: deciding to reduce or withdraw immunosuppression must balance quality of life with and without a functioning transplant.
- QUOTE: "The decision to reduce or withdraw immunosuppressive medication must also balance quality of life with and without a functioning transplant, if cessation of medication results in graft rejection."
- REF: Ch 20 Rationale | GRADE: rationale, ungraded | PAGE: PDF 102, printed S89 | SOURCE-MODE: image

**K359** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: no randomized trials test reducing or withdrawing immunosuppression in recipients with cancer.
- QUOTE: "there have been no RCTs testing the effects of reducing or withdrawing immunosuppressive medications in posttransplant cancer"
- REF: Ch 20 Rationale | GRADE: rationale, ungraded | PAGE: PDF 102, printed S89 | SOURCE-MODE: image

**K360** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: cancers with a high standardized incidence ratio, for example 3.0 or more, are likely caused or exacerbated by immunosuppression.
- QUOTE: "In KTRs, non-renal cell cancers that have a high SIR (e.g. >=3.0) are likely caused or exacerbated by immunosuppressive medication."
- REF: Ch 20 Rationale | GRADE: rationale, ungraded | PAGE: PDF 102, printed S89 | SOURCE-MODE: image
- NOTE: Printed with the greater-than-or-equal symbol.

**K361** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: it is more likely that the total amount of immunosuppression raises cancer risk than the type of agent.
- QUOTE: "It is more likely that the total amount of immunosuppressive medication increases the risk for cancer, rather than the type of immunosuppressive medication per se."
- REF: Ch 20 Rationale | GRADE: rationale, ungraded | PAGE: PDF 102, printed S89 | SOURCE-MODE: image

**K362** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: observational data suggest an association between PTLD and biological anti-T-cell agents.
- QUOTE: "Observational data have suggested that there is an association between PTLD and the use of biological anti-T-cell agents"
- REF: Ch 20 Rationale | GRADE: rationale, ungraded | PAGE: PDF 102, printed S89 | SOURCE-MODE: image

**K363** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: recommend recipients minimize life-long sun exposure and use ultraviolet-blocking agents.
- QUOTE: "We recommend that KTRs minimize life-long sun exposure and use appropriate ultraviolet light blocking agents."
- REF: 18.2 | GRADE: 1D | PAGE: PDF 97, printed S84 | SOURCE-MODE: image

## 10. Pregnancy and contraception (15 rows)

**K364** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: include discussion of sexual activity and counseling on contraception and safe sex in follow-up of adult recipients.
- QUOTE: "Include discussion of sexual activity and counseling about contraception and safe sex practices in follow-up of adult KTRs."
- REF: 25.1.2 | GRADE: Not Graded | PAGE: PDF 119, printed S106 | SOURCE-MODE: image

**K365** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: recommend mycophenolate mofetil and enteric-coated mycophenolate sodium be stopped or replaced with azathioprine before pregnancy is attempted.
- QUOTE: "We recommend that MMF and EC-MPS be discontinued or replaced with azathioprine before pregnancy is attempted."
- REF: 25.2.2 | GRADE: 1A | PAGE: PDF 120, printed S107 | SOURCE-MODE: image
- NOTE: Rationale text gives a 6-week window after stopping mycophenolate before attempting pregnancy; see Inconsistencies for the "during pregnancy" wording.

**K366** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest mTOR inhibitors be stopped or replaced before pregnancy is attempted.
- QUOTE: "We suggest that mTORi be discontinued or replaced before pregnancy is attempted."
- REF: 25.2.3 | GRADE: 2D | PAGE: PDF 120, printed S107 | SOURCE-MODE: image

**K367** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: suggest waiting at least 1 year after transplant before pregnancy, and trying only when kidney function is stable with under 1 g/day proteinuria.
- QUOTE: "We suggest waiting for at least 1 year after transplantation before becoming pregnant, and only attempting pregnancy when kidney function is stable with <1 g/day proteinuria."
- REF: 25.2.1 | GRADE: 2C | PAGE: PDF 120, printed S107 | SOURCE-MODE: image

**K368** | USE: SUMMARY-CANDIDATE | image
- CLAIM: KDIGO 2009: refer pregnant recipients to an obstetrician with expertise in high-risk pregnancies.
- QUOTE: "Refer pregnant patients to an obstetrician with expertise in managing high-risk pregnancies."
- REF: 25.2.6 | GRADE: Not Graded | PAGE: PDF 120, printed S107 | SOURCE-MODE: image

**K369** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: counsel female recipients of child-bearing potential and partners about fertility and pregnancy as soon as possible after transplant.
- QUOTE: "Counsel female KTRs with child-bearing potential and their partners about fertility and pregnancy as soon as possible after transplantation."
- REF: 25.2.4 | GRADE: Not Graded | PAGE: PDF 120, printed S107 | SOURCE-MODE: image

**K370** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: counsel pregnant recipients and partners about the risks and benefits of breastfeeding.
- QUOTE: "Counsel pregnant KTRs and their partners about the risks and benefits of breastfeeding."
- REF: 25.2.5 | GRADE: Not Graded | PAGE: PDF 120, printed S107 | SOURCE-MODE: image

**K371** | USE: NODE | image
- CLAIM: KDIGO 2009: mycophenolate has been reported to cause severe structural malformations, including cleft lip and palate, microtia and absent external auditory canals.
- QUOTE: "Mycophenolate has been reported to cause severe structural malformations. A characteristic phenotype associated with in utero exposure to MMF is emerging that includes cleft lip and palate, microtia, and absence of external auditory canals"
- REF: Ch 25.2 Rationale | GRADE: rationale, ungraded | PAGE: PDF 121, printed S108 | SOURCE-MODE: image

**K372** | USE: NODE | image
- CLAIM: KDIGO 2009: mycophenolate should generally be changed to azathioprine during pregnancy, as endorsed by the European Best Practice Guidelines.
- QUOTE: "Thus, MMF should generally be changed to azathioprine during pregnancy, a practice endorsed by the European Best Practice Guidelines (886)."
- REF: Ch 25.2 Rationale | GRADE: rationale, ungraded | PAGE: PDF 121, printed S108 | SOURCE-MODE: image

**K373** | USE: NODE | image
- CLAIM: KDIGO 2009: in the absence of adequate safety data, it is prudent to avoid mTOR inhibitors in pregnancy.
- QUOTE: "in the absence of adequate safety data, it is prudent to avoid mTORi in pregnancy."
- REF: Ch 25.2 Rationale | GRADE: rationale, ungraded | PAGE: PDF 121, printed S108 | SOURCE-MODE: image
- NOTE: Same section: azathioprine, despite FDA category D, "has been used safely over the years in pregnant transplant recipients".

**K374** | USE: NODE | image
- CLAIM: KDIGO 2009: in the absence of data, a drug should be presumed unsafe in pregnancy and patients treated accordingly.
- QUOTE: "In the absence of data, a drug should be presumed to be unsafe, and patients should be treated accordingly."
- REF: Ch 25.2 Background | GRADE: background, ungraded | PAGE: PDF 120, printed S107 | SOURCE-MODE: image

**K375** | USE: NODE | image
- CLAIM: KDIGO 2009: pregnancy in recipients carries higher risks to mother and child; reports suggest high rates of hypertension and preeclampsia.
- QUOTE: "Some reports suggest that there is a high incidence of hypertension (873) and preeclampsia in pregnant KTRs (881)."
- REF: Ch 25.2 Rationale | GRADE: rationale, ungraded | PAGE: PDF 120, printed S107 | SOURCE-MODE: image

**K376** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: breastfeeding is not contraindicated for recipients per a transplant society consensus; cyclosporine is excreted into milk and not recommended.
- QUOTE: "concluded that breastfeeding for KTRs is not contraindicated (879)."
- REF: Ch 25.2 Rationale | GRADE: rationale, ungraded | PAGE: PDF 121, printed S108 | SOURCE-MODE: image
- NOTE: Same paragraph: "CsA is excreted into breast milk and is not recommended in breastfeeding mothers"; no data for mycophenolate or sirolimus.

**K377** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: sexually active recipients not in long-term monogamous relationships should use latex condoms to reduce infection exposure.
- QUOTE: "Sexually active patients who are not in long-term monogamous relationships should use latex condoms during sexual contact to reduce their risk for exposure to CMV, HSV, HIV, HPV, HBV, HCV and other sexually transmitted infections."
- REF: Ch 25.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 119, printed S106 | SOURCE-MODE: image

**K378** | USE: OVERLAY | image
- CLAIM: KDIGO 2009: concerns about intrauterine devices include infection and possibly lower effectiveness in recipients; whether current devices are safer is unknown.
- QUOTE: "Concerns regarding intrauterine devices have included the potential for infection, as well as that they may be less effective in transplant recipients (869)."
- REF: Ch 25.1 Rationale | GRADE: rationale, ungraded | PAGE: PDF 120, printed S107 | SOURCE-MODE: image

## NOT IN KDIGO 2009

Each item was searched in the text layer of PDF pages 14-124 (abstract through Chapter 27; the Appendix and reference list, PDF 125-168, were not searched), with ligatures normalised. A term found only in an unrelated context is stated.

**N1. Red-flag symptoms and when to come to the emergency department.** No section. Searches for "red flag", "warning sign", "emergency department", "triage", "call the", "contact the", "notify": 0 hits. "Emergency" occurs once, as "emergence of antibacterial resistance" (PDF 72). The only symptom lists are for named diseases (CMV, EBV, erythrocytosis, pyelonephritis, systemic HSV).

**N2. When to call or transfer to the transplant centre.** No statement. "Transplant center" occurs only for centre-to-centre variation in biopsy policy (PDF 48), and social-work counselling (PDF 124); "transplant physicians" only in a team approach to EBV disease and PTLD (PDF 63). "Transfer" hits are unrelated to patient transfer. Referral statements exist only for hepatology (PDF 66), obstetrics (PDF 120), and for vaccines to an infectious disease or travel specialist (PDF 54).

**N3. Empirical antibiotics for sepsis or fever.** No statement. "Sepsis" occurs only in the pyelonephritis rationale (PDF 72) and as a cause of low white cells and platelets (PDF 112). "Empiric" occurs only for 'empirical approach' to drug monitoring (PDF 32-33) and 'used empirically' for dose tapering (PDF 27). "Vancomycin", "aminoglycoside", "gentamicin", "macrolide", "azithromycin", "clarithromycin": 0 hits. Fever is not addressed as a presentation except CMV/EBV syndromes (PDF 59, 62) and as an acyclovir response marker (PDF 65). Intravenous antibiotics are named only for allograft pyelonephritis (K155).

**N4. Contrast agents and imaging safety.** No statement on iodinated or gadolinium contrast. "Contrast media", "iodinated", "gadolinium": 0 hits. CT angiography and MRI are named once as ways to image allograft vasculature for hard-to-control hypertension (PDF 86); "contrast" elsewhere is the phrase "in contrast".

**N5. Admission or discharge criteria.** No criteria. "Admission": 0 hits ("admit" once, about tobacco use, PDF 89). Hospitalisation is stated only for allograft pyelonephritis (PDF 72-73), severe or life-threatening CMV (PDF 61), systemic HSV (PDF 65), and in the smoking-screening paragraph during the transplant admission (PDF 89).

**N6. Management of ureteric obstruction, urine leak, lymphocele, renal artery stenosis or graft thrombosis.** No management. "Lymphocele": 0 hits. "Ureter": 2 hits, both incidental (biopsy complication, ANCA vasculitis). "Renal artery stenosis" and "hydronephrosis": 1 hit each, as erythrocytosis risk factors (PDF 113). "Thrombosis" appears in the ultrasound list (PDF 42), aspirin rationale (PDF 93) and erythrocytosis (PDF 113).

**N7. Numeric target blood levels for tacrolimus, cyclosporine, sirolimus or everolimus, and a toxic level.** No recommended range. The only text is that targets are higher early and lower later (PDF 33). Numbers appear only inside trial descriptions (for example 'C0 3-7 ng/mL' in the Symphony study, PDF 24) and the BK Table 14 (PDF 58). "Toxic level", "supratherapeutic", "overdose": 0 hits. See evidence/cni-levels.md.

**N8. Neurotoxicity, PRES and seizures in recipients.** No statement. "Seizure", "convulsion", "encephalopathy", "posterior reversible", "neurotoxicity": 0 hits (the searched string "pres" matched only 'presence' and 'pressure'). See evidence/cni-levels.md and the tpe-cni-toxicity draft.

**N9. Hyperkalemia treatment; potassium-raising drugs including trimethoprim-sulfamethoxazole.** No treatment statement. Hyperkalemia appears as a listed adverse effect of ACE inhibitors, aldosterone antagonists and beta-blockers (PDF 86) and as a complication of untreated diabetes (PDF 81). No text links trimethoprim-sulfamethoxazole with potassium or creatinine.

**N10. Stress-dose steroids or adrenal insufficiency.** "Adrenal", "stress dose", "hydrocortisone": 0 hits.

**N11. Fluid resuscitation, hypotension and shock.** No statement on resuscitation. "Hypotension" occurs once, in the colony-stimulating-factor sentence (PDF 112). "Dehydration" occurs as a cause to exclude before biopsy (PDF 43).

**N12. Antimicrobial cautions for drugs an ED gives (macrolides, azoles other than ketoconazole, fluoroquinolones, aminoglycosides, vancomycin, linezolid).** Not covered, with these exceptions: rifampin and rifabutin (PDF 74-75), ketoconazole and diltiazem (PDF 30-31), fluconazole and clotrimazole (PDF 75), ciprofloxacin only as UTI prophylaxis that was linked to Pneumocystis pneumonia (PDF 72), and the statement that trimethoprim-sulfamethoxazole may cause neutropenia (PDF 111-112). "Clarithromycin", "erythromycin", "voriconazole", "linezolid": 0 hits.

**N13. Influenza and respiratory-virus treatment; other opportunistic infections (Aspergillus, Cryptococcus, Nocardia, Listeria, Clostridioides difficile).** Influenza is covered only as vaccination (PDF 54-56). "Oseltamivir", "aspergill", "cryptococc", "nocardia", "listeria", "clostridi", "difficile": 0 hits. No COVID or SARS statements (a 2009 document).

**N14. Anticoagulation and antiplatelet management in an acute event.** Only low-dose aspirin for atherosclerotic disease (PDF 93, 81) and clopidogrel as an aspirin alternative in a rationale paragraph (PDF 93). "Warfarin", "anticoagulation": 0 hits. "Transfusion": 0 hits.

**N15. Who decides to hold, reduce or stop immunosuppression.** No statement. Reduction is recommended or suggested for BK, CMV, HSV, VZV, EBV, PTLD, Pneumocystis pneumonia, cancer and new-onset diabetes, but the guideline never names who decides. The EBV rationale says a team of infectious disease specialists, oncologists and transplant physicians will likely maximise outcomes (PDF 63), and a non-graded statement says to inform the patient and the responsible clinician of any immunosuppressant change (PDF 29).

**N16. Evaluation of acute rejection symptoms, signs or timing beyond a creatinine rise.** Acute rejection is 'suspected' with a creatinine rise after other causes are excluded (PDF 34). No symptom list, no creatinine threshold for suspicion, no time window for antibody-mediated rejection. Numeric creatinine-rise figures exist only as a persistent 25-50% rise 'often arbitrarily used in studies', a 30% rise in one study (PDF 43), and the AKI criteria table (PDF 44).

**N17. Nonadherence as an emergency presentation.** Nonadherence is covered as prevention, detection and screening (PDF 51-53). No statement on managing a missed-dose presentation.

## DIFFERS FROM NEWER SOURCES ALREADY USED

Rows where KDIGO 2009 says something different from the 2024 BK consensus (`evidence/bk.md`), the 2025 CMV consensus (`evidence/cmv.md`) or the drug labels as recorded in `evidence/cni-levels.md`. Both statements are quoted; this ledger does not choose. The other-source quotes are copied from the sibling evidence files and were string-checked against them.

**X1. BK screening schedule and window.**
- KDIGO 2009 (K104, 13.1.1, grade 2C overall; 2D each interval, PDF 57): "We suggest screening all KTRs for BKV with quantitative plasma NAT (2C) at least: monthly for the first 3-6 months after transplantation (2D); then every 3 months until the end of the first post-transplant year (2D);"
- Other source (evidence/bk.md item 2.4 (2024 BK consensus, Table 5, strong, B)): "screening kidney transplant recipients for plasma BKPyV loads monthly until mo 9, then every 3 mo until 2 y posttransplantation"
- Not resolved here.

**X2. BK action threshold.**
- KDIGO 2009 (K106, 13.1.2, grade 2D, PDF 57): "We suggest reducing immunosuppressive medications when BKV plasma NAT is persistently greater than 10 000 copies/mL (107 copies/L)."
- Other source (evidence/bk.md item 5.2 (2024 BK consensus, Table 7, strong, B)): "We recommend reducing immunosuppression based on 1 measurement BKPyV-DNAemia >10 000 copies/mL (or equivalent)"
- Not resolved here.

**X3. BK: when it occurs after transplant.**
- KDIGO 2009 (K109, Ch 13.1 Rationale bullet, grade rationale, ungraded, PDF 57): "Ninety-five percent of BKV nephropathy occurs in the first 2 years after kidney transplantation."
- Other source (evidence/bk.md item 2.2 (2024 BK consensus, ungraded)): "Subsequently, BKPyV-DNAemia and biopsy-proven BKPyV-nephropathy are seen in another 10% to 20% for the next 24 mo and another 1% to 10% for the next 3 to 5 y."
- Not resolved here.

**X4. CMV prophylaxis agent and duration.**
- KDIGO 2009 (K111, 13.2.1, grade 1B, PDF 59): "We recommend that KTRs (except when donor and recipient both have negative CMV serologies) receive chemoprophylaxis for CMV infection with oral ganciclovir or valganciclovir for at least 3 months after transplantation,"
- Other source (evidence/cmv.md item 6.7 (2025 CMV consensus, strong, high)): "either valganciclovir, ganciclovir, or letermovir be used for primary prophylaxis in D+/R– kidney transplant recipients"
- Not resolved here.

**X5. CMV after lymphocyte-depleting antibody.**
- KDIGO 2009 (K112, 13.2.1, grade 1C, PDF 59): "and for 6 weeks after treatment with a T-cell-depleting antibody."
- Other source (evidence/cmv.md item 2.6 (2025 CMV consensus, weak, moderate)): "treatment of rejection with lymphocyte-depleting antibodies in at-risk recipients should result in reinitiation of prophylaxis or preemptive therapy for 4–12 wk"
- Not resolved here.

**X6. CMV monitoring during disease.**
- KDIGO 2009 (K113, 13.2.2, grade 2D, PDF 59): "In patients with CMV disease, we suggest weekly monitoring of CMV by NAT or pp65 antigenemia."
- Other source (evidence/cmv.md item 5.10 (2025 CMV consensus, strong, high)): "During the treatment phase, weekly CMV DNAemia testing is recommended, using an assay calibrated to the WHO standard, to monitor response"
- Not resolved here.

**X7. CMV treatment stopping rule.**
- KDIGO 2009 (K116, 13.2.3.4, grade 2D, PDF 59): "We suggest continuing therapy until CMV is no longer detectable by plasma NAT or pp65 antigenemia."
- Other source (evidence/cmv.md item 5.8 (2025 CMV consensus, strong, moderate)): "Antiviral treatment should be continued for a minimum of 2 wk, until clinical resolution of disease and decrease in CMV DNAemia below the institutional, laboratory-specific, threshold"
- Not resolved here.

**X8. CMV: route and hospital stay.**
- KDIGO 2009 (K120, Ch 13.2 Rationale (CMV treatment), grade rationale, ungraded, PDF 61): "patients with more severe disease, including those with life-threatening disease should be hospitalized and treated with intravenous ganciclovir."
- Other source (evidence/cmv.md item 5.3 and [P185] (2025 CMV consensus, no grade)): "valganciclovir is preferred when feasible due to its oral formulation, which may reduce or prevent hospital stays"
- Not resolved here.

**X9. CMV: when to reduce immunosuppression.**
- KDIGO 2009 (K117, 13.2.4, grade 2D, PDF 59): "We suggest reducing immunosuppressive medication in life-threatening CMV disease, and CMV disease that persists in the face of treatment, until CMV disease has resolved."
- Other source (evidence/cmv.md item 5.11 (2025 CMV consensus, weak, very low)): "In patients without concomitant rejection, reduction of immunosuppression is suggested in the following settings: severe CMV disease, inadequate clinical response, high viral loads, and cytopenia"
- Not resolved here.

**X10. Ketoconazole to cut calcineurin inhibitor dose.**
- KDIGO 2009 (K238, 4.1.1 (bullets), grade 2D ketoconazole; 2C calcium-channel blocker, PDF 29): "using ketoconazole to minimize CNI dose (2D); using a nondihydropyridine CCB to minimize CNI dose (2C);"
- Other source (evidence/cni-levels.md, tacrolimus label interactions table (strong CYP3A inhibitors incl. ketoconazole; Prograf, Astagraf, Envarsus)): "A rapid, sharp rise in tacrolimus levels may occur early, despite an immediate reduction of tacrolimus dose"
- Not resolved here.

**X11. Rifabutin as a substitute for rifampin.**
- KDIGO 2009 (K250, 14.3.2.1, grade Not Graded, PDF 74): "Consider substituting rifabutin for rifampin to minimize interactions with CNIs and mTORi."
- Other source (evidence/cni-levels.md, tacrolimus label interactions table (strong CYP3A inducers)): "Strong CYP3A inducers: antimycobacterials (rifampin, rifabutin)"
- Not resolved here.

**X12. Nondihydropyridine calcium-channel blockers to cut calcineurin inhibitor dose.**
- KDIGO 2009 (K238, 4.1.1 (bullets), grade 2D ketoconazole; 2C calcium-channel blocker, PDF 29): "using ketoconazole to minimize CNI dose (2D); using a nondihydropyridine CCB to minimize CNI dose (2C);"
- Other source (evidence/cni-levels.md, Prograf label (mild/moderate CYP3A inhibitors)): "Mild/moderate CYP3A inhibitors (Prograf): clotrimazole; antibiotics (erythromycin, fluconazole); calcium channel blockers (verapamil, diltiazem, nifedipine, nicardipine)"
- Not resolved here.

## DATED

Every row above is from a document that states it was based on information available as of March 2009 (PDF 7, printed Siii). The rows below are ones a reader should be told come from 2009 because named agents, tests, thresholds or categories may have moved on since. Only the date is stated here; this ledger does not say what changed.

- **Acute rejection treatment names (including OKT3, anti-CD20, lymphocyte-depleting antibodies) and induction agents (daclizumab, OKT3):** K1, K6, K7, K8, K9, K10, K11, K12, K13, K14, K15, K16, K19, K22, K202, K203, K204, K205.
- **Maintenance regimen and monitoring rows (tacrolimus, cyclosporine C2, mycophenolate, mTOR inhibitors, steroid withdrawal):** K207, K208, K209, K210, K212, K213, K215, K216, K217, K218, K219, K220, K221, K222, K223, K224, K225, K226, K227, K228, K229, K238, K244, K245, K246, K247, K248.
- **BK virus rows:** K104, K105, K106, K107, K108, K109, K110, K196, K197.
- **CMV rows:** K111, K112, K113, K114, K115, K116, K117, K118, K119, K120, K121, K122, K123, K124, K125, K198.
- **Hepatitis C and B rows (interferon-based therapy; named antivirals):** K184, K185, K186, K187, K188, K189, K190, K191, K192, K193, K194, K195.
- **Vaccination rows (Tables 12 and 13, schedules):** K90, K91, K92, K93, K94, K95, K96, K97, K98, K99, K100, K101, K102, K103.
- **Pneumocystis, UTI, tuberculosis and Candida prophylaxis and treatment rows:** K154, K155, K156, K157, K158, K159, K160, K161, K162, K163, K164, K165, K166, K167, K168, K169, K170, K171, K172, K173, K174, K175, K176, K177, K178, K179, K249, K250, K251, K252, K253, K254.
- **HSV, VZV and EBV/PTLD rows:** K126, K127, K128, K129, K130, K131, K132, K133, K134, K135, K136, K137, K138, K139, K140, K141, K142, K143, K144, K145, K146, K147, K148, K149, K150, K151, K152, K153, K180, K181, K182, K183, K199, K200.
- **Diabetes rows including the drug table (Table 21) and HbA1c targets:** K258, K259, K260, K278, K279, K280, K281, K282, K283, K284, K285, K286, K287.
- **Blood pressure and lipid targets, aspirin, antihypertensive class table:** K88, K89, K255, K256, K257, K268, K269, K270, K271, K272, K273, K274, K275, K276, K277, K288, K289, K290, K291, K292, K294.
- **Anemia, neutropenia and thrombocytopenia drug table (Table 31), colony-stimulating factors, erythrocytosis:** K87, K295, K296, K297, K298, K299, K300, K301, K302, K303, K304, K305, K306, K307, K308, K309, K310, K311, K312, K332, K333, K334, K335, K336, K337, K338, K339, K340, K341, K342.
- **Bone disease rows (CKD-MBD recommendations deferred to a separate 2009 guideline):** K343, K344, K345, K346, K347, K348.
- **Gout, colchicine, NSAID and allopurinol rows:** K314, K315, K316, K317, K318, K319, K320, K321, K322, K323, K324, K325, K326, K327, K328, K329, K330, K331, K384.
- **Pregnancy and contraception rows (FDA pregnancy categories are discussed in the rationale):** K364, K365, K366, K367, K368, K369, K370, K371, K372, K373, K374, K375, K376, K377, K378.
- **Drug interaction rows (rifampin, ketoconazole, diltiazem, fluconazole, statins, sulfonylureas):** K249, K250, K251, K252, K253, K254, K255, K256, K257, K258, K259, K260, K261, K262, K263, K264, K265, K266, K267.

Rows not listed above: K2, K3, K4, K5, K17, K18, K20, K21, K23, K379, K24, K25, K26, K27, K28, K29, K30, K31, K32, K33, K34, K35, K36, K37, K38, K39, K40, K41, K42, K43, K44, K45, K46, K47, K48, K49, K50, K51, K52, K53, K54, K55, K56, K57, K58, K59, K60, K61, K62, K63, K64, K65, K66, K67, K68, K69, K70, K71, K72, K73, K74, K75, K76, K77, K78, K79, K80, K81, K82, K83, K380, K84, K85, K86, K201, K206, K211, K214, K230, K231, K232, K233, K234, K235, K236, K237, K239, K240, K241, K242, K243, K381, K382, K383, K293, K313, K349, K350, K351, K352, K353, K354, K355, K356, K357, K358, K359, K360, K361, K362, K363. They are also from 2009.

## INTERNAL INCONSISTENCIES AND ODDITIES IN THE GUIDELINE (found while reading)

**I1. Live vaccines: a graded suggestion and a table that says 'contraindicated'.** Rec 12.2 (K91) is Level 2: "We suggest avoiding live vaccines in KTRs" (2C), while Table 13 (PDF 55, printed S42) is titled "Contraindicated vaccinations after transplantation" and lists measles "(except during an outbreak)".

**I2. Treating subclinical and borderline rejection.** Rec 6.2 suggests treating subclinical and borderline acute rejection (2D). The rationale (PDF 35) states 'Whether or not to treat borderline acute rejection is controversial', describes a larger RCT in which protocol biopsies and treatment of subclinical rejection 'were not beneficial', and the research recommendations ask whether treating borderline rejection improves outcomes.

**I3. Two recommendations numbered 3.2.** Chapter 3 prints "3.2: We suggest that CNIs be continued rather than withdrawn (2B)" and "3.2: If prednisone is being used beyond the first week ... continued rather than withdrawn (2C)" (PDF 27).

**I4. Mycophenolate before versus during pregnancy.** Rec 25.2.2 (1A) says discontinue or replace mycophenolate 'before pregnancy is attempted'; the rationale (PDF 121) says it 'should generally be changed to azathioprine during pregnancy' and also cites a 6-week window after stopping before pregnancy is attempted.

**I5. Names of the anti-CD3 agent.** Chapter 1 text says "monomurab-CD3" (PDF 19); Chapter 6 footnote says "OKT3, muromonab" (PDF 34).

**I6. Primary varicella: oral or intravenous.** Rec 13.4.4 allows "either intravenous or oral acyclovir or valacyclovir" (1C); the rationale bullet says "Treatment with intravenous acyclovir is safe and effective" and the text says there is little evidence on the safety and efficacy of outpatient oral acyclovir (PDF 64-65).

**I7. Pneumocystis and UTI prophylaxis use the same drug for different durations.** Rec 14.2.1 (1B) trimethoprim-sulfamethoxazole for 3-6 months; rec 14.1.1 (2B) the same drug for at least 6 months; the UTI rationale says prophylaxis for 6-12 months is warranted (PDF 72-73). Not contradictory, but a reader merging them needs both.

**I8. Different protein thresholds for allograft biopsy.** Rec 9.5 (2C) suggests biopsy for unexplained proteinuria of 3.0 g/g creatinine or 3.0 g per 24 hours or more; rec 13.5.5.1 (not graded, hepatitis C) says new-onset proteinuria above 1 g per 24 hours or a protein/creatinine ratio above 1 on two or more occasions should lead to biopsy (PDF 43, 66). The guideline does not reconcile them.

**I9. Acute rejection definitions overlap with 'subclinical'.** Acute rejection is defined as a decline in function plus biopsy features (PDF 34); subclinical rejection is the same biopsy features without symptoms or signs. Rec 6.1 (biopsy before treating) therefore applies to both, but the guideline does not say so.

## USE RULES FOR COMPOSITION (from the verification report)

**Rows that must not appear alone.** These KDIGO 2009 rows are contradicted or superseded by the newer sources named in DIFFERS (K104, K105, K106, K109, K111, K112, K113, K114, K116, K117, K120 for BK or CMV; K196 follows the BK block), or conflict with the drug labels (K250, rifabutin; K238, ketoconazole and calcium-channel blockers). A page may show them only beside the newer source's statement, with the 2009 scope tag kept: K250, K238, K104, K105, K106, K109, K111, K112, K113, K114, K116, K117, K120, K196.

**Required pairings.** (1) K91 (12.2, suggest avoiding live vaccines, 2C) shows with K98 (Table 13, titled contraindicated). (2) K14 (6.2, suggest treating subclinical and borderline rejection, 2D) shows with K17 (treating borderline rejection is controversial) and K18 (a larger trial found protocol biopsy and treatment of subclinical rejection not beneficial). (3) K166 (14.2.3, corticosteroids named without a severity condition, 1C) shows with K167 (14.2.4, corticosteroids for moderate to severe disease, 1C); the guideline does not reconcile them. (4) K180 and K150 keep "some experts" (K180, ungraded rationale) and grade 2D (K150) wherever they appear. (5) K144 keeps the split grade: 1C for treatment, 2D for the temporary reduction of immunosuppression.

**Revision 2 changes.** Claim edits: K144, K324, K249, K88, K257. Quote or claim fixes for K65, K109, K148, K152, K260, K341, K373 (claims cut to the quoted span) and K25 (quote extended; the printed word is "treatments"). K16, K25 and K257 were re-checked against the page images (PDF 34, 36, 87). K332 retagged TEAM; K343 retagged OVERLAY. New rows K379-K383 (Table 1 risk factors, creatinine not a biopsy indication during delayed graft function on dialysis, nonadherence early and late, chronic rejection insidious in onset, keep taking immunosuppressants when the graft works). Existing row ids did not change.

**Revision 3 changes (independent check).** Claim or quote edits: K88 (especially), K332 (cancer-literature guidance cited), K343 (quote covers parathyroidectomy), K257 (drug-drug interactions must be monitored), K328 (not on dialysis), K155 (initial), K183 and K158 (should be, not imperatives), K279 (substantially increasing the dose), K269 (mm Hg), K142, K145, K149, K213, K344, K36, K298, K12, K78 (verbs restored), K72 (at least), K21 (successful). K259 (metformin creatinine thresholds) is a 2009 table; current practice may differ. Row ids did not change.

**Revision 4 changes.** K328 split into two statements: K328 (avoid prolonged colchicine and doses above 0.6 mg/day if eGFR is under 60) and new K384 (reduced doses under 1 week if eGFR is above 10 and no dialysis is needed). K180 no longer carries the acyclovir mg/kg figure: the guideline gives it as 'some experts' without saying adults or children, so the figure is not used on the page. K259 (metformin creatinine thresholds) is a 2009 table value.

