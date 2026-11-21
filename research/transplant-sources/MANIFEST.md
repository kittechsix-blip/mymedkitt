# Source manifest: ED care of adult solid-organ transplant recipients

Compiled 2026-11-20. Scope: adult kidney, liver, heart, lung, pancreas. This file lists documents and access status only. No clinical content is summarised here.

## Method and status rules

- **OPEN-SAVED** = I downloaded the full text (or the page carrying the full body) and confirmed the body loaded (PDF text extracted with pypdf, or HTML with hundreds of body paragraphs). File is in this directory.
- **OPEN-ONLINE** = body loaded but not saved here (none this run; everything open was saved).
- **PAYWALLED/BLOCKED** = I could not load the body. Reasons: Cloudflare challenge to automated fetch (Wiley, Elsevier/ScienceDirect, JHLT site), abstract-only page, or not attempted because no free route was found. A "BLOCKED" Wiley/Elsevier item may or may not be open access in a normal browser; I did not verify that.
- Citations were checked against Crossref (title, journal, volume, pages, year). "et al." = first author shown only.
- Local file names are relative to `/Users/kittechsix/Developer/mymedkitt-transplant/research/transplant-sources/`.
- Caution: the "Revised" date shown on a DailyMed page can differ from the SPL effective date (see section 20).

---

## 1. Kidney transplant recipient care (KDIGO, AST)

| Record | Detail |
|---|---|
| KDIGO Clinical Practice Guideline for the Care of Kidney Transplant Recipients | Am J Transplant 2009;9(Suppl 3):S1-S155. DOI 10.1111/j.1600-6143.2009.02834.x. Year 2009. First author per Crossref: Eckardt. |
| Full text | https://kdigo.org/wp-content/uploads/2017/02/KDIGO-2009-Transplant-Recipient-Guideline-English.pdf |
| Status | **OPEN-SAVED**: `KDIGO_transplant_recipient_2009_guideline.pdf` (168 PDF pages; first page text read: AJT Vol 9 Suppl 3, Nov 2009). |
| Superseded? | No KDIGO update of the 2009 recipient guideline found. The KDIGO site (kdigo.org/guidelines) returned HTTP 406 to my fetch, so I could not read its current-guideline list. A web search found no public-review draft for a recipient update; unconfirmed. Related newer KDIGO document (candidates, not recipients): KDIGO 2020 candidate guideline, Transplantation 2020 (PMID 32301874), not fetched. |
| Relevant | Chapters on immunosuppression (induction, maintenance, CNI/mTOR monitoring), rejection monitoring and treatment, infection prophylaxis, CMV, BK, PTLD/malignancy, CV risk. Use the PDF table of contents; I did not map page numbers. |
| AST | No separate AST kidney-recipient guideline found. AST IDCOP documents (sections 2 to 7, 15) cover the infection topics. |

## 2. Infection in SOT, timeline of infection (AST IDCOP series, key reviews)

Latest AST IDCOP edition found: the **4th edition series, Clin Transplant 2019;33(9)** (all DOIs below, e135xx to e136xx). A new series appears to have started in Am J Transplant: AST IDCOP vaccination/safe-living guideline, Am J Transplant 2026, DOI 10.1016/j.ajt.2026.07.033 (listed in Europe PMC; not opened). I found no 2025-2026 AST IDCOP replacement for the CMV, PJP, BK, PTLD, fungal or diarrhea chapters. Whether a 5th-edition series is under way for those is unclear.

| Record | Detail |
|---|---|
| Fishman JA. Infection in Solid-Organ Transplant Recipients. | N Engl J Med 2007;357(25):2601-2614. DOI 10.1056/NEJMra064928. Defines the classic timeline (first month, months 1-6, after 6 months). Status: **BLOCKED** (not loaded; NEJM). |
| Fishman JA. Infection in Organ Transplantation. | Am J Transplant 2017;17(4):856-879. DOI 10.1111/ajt.14208. Updated review including timeline. Status: **BLOCKED** (not loaded; Wiley Cloudflare). This is the newer of the two Fishman reviews. |
| Dulek DE, Mueller NJ, et al. Pneumonia in SOT: AST IDCOP. | Clin Transplant 2019;33(9):e13545. DOI 10.1111/ctr.13545. **OPEN-SAVED** via PMC author manuscript: `ASTIDCOP_pneumonia_2019_PMC7162188.html` (105 paragraphs, 1 table). Source URL https://pmc.ncbi.nlm.nih.gov/articles/PMC7162188/ |
| Avery RK et al. Strategies for safe living following SOT: AST IDCOP. | Clin Transplant 2019;33(9):e13519. DOI 10.1111/ctr.13519. **BLOCKED** (Wiley). |
| Wolfe CR et al. Donor-derived infections: AST IDCOP. | Clin Transplant 2019;33(9):e13547. DOI 10.1111/ctr.13547. **BLOCKED**. |
| Abbo LM et al. Surgical site infections: AST IDCOP. | Clin Transplant 2019;33(9):e13589. DOI 10.1111/ctr.13589. **BLOCKED**. |
| Shoham S et al. Emerging fungal infections in SOT: AST IDCOP. | Clin Transplant 2019;33(9):e13525. DOI 10.1111/ctr.13525. **BLOCKED**. |
| Note | I did not find a Clin Transplant 2019 "Introduction/timeline" chapter DOI. The 2013 (3rd edition) series is superseded by 2019 but not retrieved. |

Wiley access: https://onlinelibrary.wiley.com/doi/full/10.1111/<ctr suffix> returned a Cloudflare "Just a moment" page (HTTP 403) to curl. Playwright was in use by another session, so I could not retry in a browser.

## 3. CMV in SOT

| Record | Detail |
|---|---|
| **Kotton CN et al. The Fourth International Consensus Guidelines on the Management of Cytomegalovirus in Solid Organ Transplantation.** | Transplantation 2025;109(7):1066-1110. DOI 10.1097/TP.0000000000005374. Transplantation Society International CMV Consensus Group. CC BY 4.0 per Crossref. Full text https://pmc.ncbi.nlm.nih.gov/articles/PMC12180710/ . **OPEN-SAVED**: `TTS_CMV_4th_consensus_2025_PMC12180710.html` (438 paragraphs, 13 tables). **Current edition.** |
| Kotton CN et al. The Third International Consensus Guidelines on the Management of CMV in SOT. | Transplantation 2018;102(6):900-931. DOI 10.1097/TP.0000000000002191. **SUPERSEDED by the 4th edition.** **OPEN-SAVED** (3 copies): `TTS_CMV_3rd_consensus_2018_WayneState_copy.pdf` (32 pp, pypdf text extracted; copy hosted at https://infectiousdiseases.med.wayne.edu/pdfs/cmvsolid2018.pdf, Wolters Kluwer 2018 copyright, third-party host), `TTS_CMV_3rd_consensus_2018_ovid_fulltext.html` (from https://doi.org/10.1097/TP.0000000000002191, body loaded without login). |
| Razonable RR, Humar A. CMV in SOT recipients: AST IDCOP. | Clin Transplant 2019;33(9):e13512. DOI 10.1111/ctr.13512. **BLOCKED** (Wiley). AST-side document; the 2025 TTS document is newer. |
| Relevant (TTS 4th) | Tables/sections on risk stratification, prophylaxis vs pre-emptive strategy, letermovir, treatment, resistance, diagnostics. I counted 13 tables in the saved HTML; not individually indexed. |

## 4. Pneumocystis in SOT

| Record | Detail |
|---|---|
| Fishman JA, Gans H, et al. Pneumocystis jiroveci in SOT: AST IDCOP. | Clin Transplant 2019;33(9):e13587. DOI 10.1111/ctr.13587. **BLOCKED** (Wiley). No newer AST PJP document found. Also see Dulek pneumonia chapter (section 2, OPEN) which covers pneumonia in general. |

## 5. BK polyomavirus in kidney transplant

| Record | Detail |
|---|---|
| **Kotton CN et al. The Second International Consensus Guidelines on the Management of BK Polyomavirus in Kidney Transplantation.** | Transplantation 2024;108(9):1834-1866. DOI 10.1097/TP.0000000000004976. CC BY 4.0 per Crossref. https://pmc.ncbi.nlm.nih.gov/articles/PMC11335089/ . **OPEN-SAVED**: `TTS_BK_2nd_consensus_2024_PMC11335089.html` (167 paragraphs, 10 tables). **Current.** A "Comments on" letter (DOI 10.1097/TP.0000000000005087, PMC11335075) exists; not saved. |
| Hirsch HH, et al. BK polyomavirus in SOT: AST IDCOP. | Clin Transplant 2019;33(9):e13528. DOI 10.1111/ctr.13528. **BLOCKED** (Wiley). Older than the 2024 consensus. |

## 6. PTLD and EBV

| Record | Detail |
|---|---|
| Allen UD, et al. PTLD, EBV infection and disease in SOT: AST IDCOP. | Clin Transplant 2019;33(9):e13652. DOI 10.1111/ctr.13652. **BLOCKED** (Wiley). |
| Current consensus | No adult SOT consensus newer than 2019 found. Found: IPTA Nashville consensus on PTLD after SOT in children, Pediatr Transplant 2024, DOI 10.1111/petr.14471 (pediatric, out of scope, not opened). British Society for Haematology adult SOT frontline PTLD guideline exists (found only via search snippet; not opened, no DOI captured). |

## 7. Fungal infections (Candida, Aspergillus, Cryptococcus)

| Record | Detail |
|---|---|
| Aslam S, et al. Candida in SOT: AST IDCOP | Clin Transplant 2019;33(9):e13623. DOI 10.1111/ctr.13623. **BLOCKED** (Wiley). |
| Husain S, et al. Invasive aspergillosis in SOT: AST IDCOP | Clin Transplant 2019;33(9):e13544. DOI 10.1111/ctr.13544. **BLOCKED** (Wiley). |
| Baddley JW, et al. Cryptococcosis in SOT: AST IDCOP | Clin Transplant 2019;33(9):e13543. DOI 10.1111/ctr.13543. **BLOCKED** (Wiley). |
| **IDSA 2026 Clinical Practice Guideline on the Prevention of Invasive Aspergillosis in Adult Solid Organ Transplant Recipients** (Schuster MG, Morrissey CO, et al.) | Published 2026-06-26, last updated 2026-07-06 per the page. DOI not captured. https://www.idsociety.org/practice-guideline/2026-idsa-clinical-practice-guidelines-on-prevention-of-invasive-aspergillosis-in-adult-solid-organ-transplant-recipients/ . **OPEN-SAVED** (page with full text, ~117k characters, organ-specific sections including liver, kidney, pancreas, lung): `IDSA_2026_aspergillosis_prevention_adult_SOT_page.html`. Narrow update (prevention only). |
| Patterson TF et al. Practice Guidelines for Diagnosis and Management of Aspergillosis: 2016 Update (IDSA) | Clin Infect Dis 2016;63(4):e1-e60. DOI 10.1093/cid/ciw326. https://www.idsociety.org/practice-guideline/aspergillosis/ . **OPEN-SAVED**: `IDSA_aspergillosis_2016_page.html` (full body on page). Still the current IDSA diagnosis/treatment document as far as I found; the 2026 prevention guideline is a partial update. |
| Pappas PG et al. Clinical Practice Guideline for the Management of Candidiasis: 2016 Update (IDSA) | Clin Infect Dis 2016;62(4):e1-e50 (online 2015-12-16). DOI 10.1093/cid/civ933. https://www.idsociety.org/practice-guideline/candidiasis/ . **OPEN-SAVED**: `IDSA_candidiasis_2016_page.html`. No newer IDSA candidiasis guideline found (not exhaustively searched). |
| Perfect JR et al. Clinical Practice Guidelines for Management of Cryptococcal Disease: 2010 Update (IDSA) | Clin Infect Dis 2010;50(3):291-322. DOI 10.1086/649858. IDSA page labelled ARCHIVED, carries abstract only (about 7k characters of text; no body). **BLOCKED**: full text not obtained (a third-party Adelaide-hosted PDF link returned HTML, not a PDF). |

## 8. Heart transplant recipient care (ISHLT)

| Record | Detail |
|---|---|
| **Velleca A, Shullo MA, et al. The ISHLT guidelines for the care of heart transplant recipients.** | J Heart Lung Transplant 2023;42(5):e1-e141. DOI 10.1016/j.healun.2022.10.015 (online 2022-12-20). Replaces the 2010 ISHLT guidelines. Hosted by ISHLT: https://www.ishlt.org/education-and-publications/standards-guidelines-detail/ishlt-guidelines-for-the-care-of-heart-transplant-recipients . **OPEN-SAVED**: `ISHLT_heart_recipient_care_2023_guideline.pdf` (141 pp, text extracted). The JHLT journal site returned a Cloudflare block; the ISHLT-hosted PDF is the route. |
| Relevant | Sections on peri-operative care, immunosuppression and rejection (ACR, AMR), long-term management including cardiac allograft vasculopathy, prevention/prophylaxis. Not page-mapped. |
| Newer related | ISHLT consensus on graft dysfunction in the first 72 h after heart transplantation: a 10-year update (2026). ISHLT page: https://www.ishlt.org/education-and-publications/standards-guidelines-detail/summary-of-the-ishlt-consensus-conference-on-graft-dysfunction-within-the-first-72-hours-after-heart-transplantation--a-10-year-update , PDF https://www.ishlt.org/docs/default-source/standards-guidelines/2026_consensusdocument_ishlt_graftdysfunctionafterhtx.pdf?sfvrsn=cc3e6cad_1 . Link found, PDF not downloaded (primary graft dysfunction, peri-operative; low ED relevance). |

## 9. Lung transplant: acute rejection and CLAD (ISHLT)

All **OPEN-SAVED** from ISHLT-hosted PDFs (text extracted):

| Record | File |
|---|---|
| Juvet S et al. **ISHLT Consensus Statement on Acute Lung Allograft Dysfunction (ALAD)**: Definition, Etiology, Diagnostic and Therapeutic Approaches, and Research Priorities. J Heart Lung Transplant 2026;45(7):e173-e195. DOI 10.1016/j.healun.2026.02.1677. | `ISHLT_ALAD_consensus_2026.pdf` (23 pp). Newest document on acute dysfunction. |
| Gottlieb J et al. **Baseline Lung Allograft Dysfunction** (BLAD): Definition, Timing, Implications for Outcomes; ISHLT Consensus Document. JHLT 2026;45(10):e197-e220. DOI 10.1016/j.healun.2026.05.034. | `ISHLT_BLAD_consensus_2026.pdf` (24 pp) |
| Calabrese F, Levine DJ, et al. **ISHLT Scientific Statement on pulmonary AMR and proposed GAP definition** (2026). DOI not captured. | `ISHLT_pulmonary_AMR_GAP_definition_2026.pdf` (18 pp). Newer than the 2016 AMR report. |
| Verleden GM, Glanville AR, et al. **CLAD: Definition, diagnostic criteria, and approaches to treatment**, consensus report of the ISHLT Pulmonary Council. JHLT 2019;38(5):493-503. DOI 10.1016/j.healun.2019.03.009. | `ISHLT_CLAD_consensus_2019_Verleden.pdf` (11 pp). Companion: Glanville AR et al., restrictive allograft syndrome, JHLT 2019;38(5):483-492, DOI 10.1016/j.healun.2019.03.008 (not downloaded). |
| Levine DJ et al. Antibody-mediated rejection of the lung: ISHLT consensus report. JHLT 2016;35(4):397-406. | `ISHLT_lung_AMR_consensus_2016_Levine.pdf` (10 pp). Older; see 2026 GAP statement. |
| Stewart S et al. Revision of the 1996 working formulation for the standardization of nomenclature in the diagnosis of lung rejection. JHLT 2007;26(12):1229-1242. | `ISHLT_lung_rejection_nomenclature_2007_Stewart.pdf` (14 pp). Histologic grading (A/B/C/D) still the cited standard as far as I found; no update located. |

Superseding note: ALAD 2026 is a new consensus concept covering acute dysfunction, which the 2007 rejection nomenclature does not replace. How ISHLT intends ALAD, the 2007 grading, and CLAD to fit together was not read in detail.

## 10. Liver transplant recipient long-term management, rejection, vascular and biliary complications

| Record | Detail |
|---|---|
| **Te H et al. AASLD AST Practice Guideline on adult liver transplantation: Diagnosis and management of graft-related complications.** | Liver Transpl 2026;32(3):444-490 (online 2025-08-22). DOI 10.1097/LVT.0000000000000715. https://doi.org/10.1097/LVT.0000000000000715 (resolves to journals.lww.com fulltext). **OPEN-SAVED**: `AASLD_AST_LT_graft_related_complications_2024_LVT0715.html` (about 234k characters; abstract states it covers vascular and biliary complications, graft rejection, immunosuppression, recurrent disease). File name says 2024; Crossref gives online 2025. |
| **Sharma P et al. AASLD AST Practice Guideline on adult liver transplantation: Diagnosis and post-transplant management of non-graft-related complications.** | Liver Transpl 2026;32(8):1157-1193 (online 2025-12-17). DOI 10.1097/LVT.0000000000000785. **OPEN-SAVED**: `AASLD_AST_LT_nongraft_complications_2025_LVT0785.html` (about 188k characters; metabolic, renal, CV, malignancy, bone, etc.). |
| Dove LM, et al. AASLD AST Practice Guideline on adult liver transplantation: Candidate evaluation. | Hepatology 2026;83(6):1609-1645 (online 2025-12-17). DOI 10.1097/HEP.0000000000001644. **OPEN-SAVED**: `AASLD_AST_LT_candidate_evaluation_2025_HEP1644.html`. Low ED relevance. |
| Lucey MR, et al. (first author per memory; Crossref title confirmed) Long-term management of the successful adult liver transplant: 2012 practice guideline (AASLD/AST). | Liver Transpl 2013;19:3-26. DOI 10.1002/lt.23566. LWW page is abstract only (1.4k characters). **BLOCKED**. Likely superseded by the two 2025 guidelines above (the AASLD liver-transplantation page still lists it alongside them); I did not read any statement saying it is withdrawn. |
| Samuel D, et al. EASL Clinical Practice Guidelines on liver transplantation. | J Hepatol 2024;81(6):1040-1086. DOI 10.1016/j.jhep.2024.07.032. **BLOCKED** (Elsevier/journal site Cloudflare; EASL page 404). Not loaded. |

## 11. Pancreas transplant complications

- **No society clinical practice guideline or consensus specific to pancreas transplant recipient complications was found.** Searched: AST, IPITA, ASTS, EASL, KDIGO via web search and Europe PMC; not exhaustive.
- Closest items:
  - AST pancreas and islet chapter (annotated reference list, not a guideline): "2. Pancreas and islet cell transplantation" (2025), 37 pp. Sections include rejection, graft failure/retransplantation, exocrine drainage, and anastomosis leak, thrombosis or bleed (2.10) and complications (2.11). https://www.myast.org/uploads/files/general/Ch.-2-Pancreas-and-Islet-Cell-Transplant-2025.pdf . **OPEN-SAVED**: `AST_Primer_Ch2_Pancreas_Islet_2025.pdf`. The page text I read is a list of cited papers with one-line descriptions, not recommendations. Parent document title not captured.
  - OPTN/SRTR 2024 ADR Pancreas chapter (data, not a guideline): saved text file (see section 19).
  - A "First World Consensus Conference on Pancreas Transplantation" (110 recommendations) and a 2021 AJT expert recommendation document on pancreas immunosuppression were mentioned in search snippets only; not located or opened.

## 12. CNI therapeutic drug monitoring and toxicity; FDA labels

| Record | Detail |
|---|---|
| **Brunet M et al. Therapeutic Drug Monitoring of Tacrolimus-Personalized Therapy: Second Consensus Report (IATDMCT).** | Ther Drug Monit 2019;41(3):261-307. DOI 10.1097/FTD.0000000000000640. Body loaded at https://www.ovid.com/jnls/drug-monitoring/fulltext/10.1097/ftd.0000000000000640... (via doi.org). **OPEN-SAVED**: `IATDMCT_tacrolimus_2nd_consensus_2019_ftd0640.html` (about 314k characters). Tacrolimus only. |
| Masuda S et al. Everolimus Personalized Therapy: Second Consensus Report (IATDMCT). | Ther Drug Monit 2025;47(1):4-31 (online 2024-09-25). DOI 10.1097/FTD.0000000000001250. Supersedes the 2016 consensus (Ther Drug Monit 2016, DOI 10.1097/FTD.0000000000000260, not fetched). **OPEN-SAVED**: `IATDMCT_everolimus_2nd_consensus_2024_ftd1250.html`. |
| Cyclosporine | **No IATDMCT cyclosporine consensus found.** Older consensus items found: Nashan B et al. Use of Neoral C2 monitoring: a European consensus, Transpl Int 2005;18(7):768-778, DOI 10.1111/j.1432-2277.2005.00151.x. **OPEN-SAVED**: `CsA_C2_European_consensus_2005_Nashan_TransplInt.pdf` (11 pp; from frontierspartnerships.org). Levy G et al. Cyclosporine monitoring based on C2 sampling (CONCERT), Transplantation 2002;73(6):840-841, DOI 10.1097/00007890-200203270-00003, not loaded. Both predate current practice; treat as historical. |
| Sirolimus, mycophenolate TDM | Not searched beyond the above. |
| FDA labels (tacrolimus, cyclosporine) | See section 20 for DailyMed setid URLs: Prograf, Astagraf XL, Envarsus XR, Neoral, Gengraf, Sandimmune. Their XML is saved in `dailymed/`. |

## 13. PRES

- **No guideline or formal consensus on PRES in transplant recipients found.** Only reviews and case series.
- Key primary reviews (not opened except where marked): Hinchey J et al., A reversible posterior leukoencephalopathy syndrome, N Engl J Med 1996;334(8):494-500, DOI 10.1056/NEJM199602223340803 (**BLOCKED**, not loaded). Fugate JE, Rabinstein AA, Posterior reversible encephalopathy syndrome: clinical and radiological manifestations, pathophysiology, and outstanding questions, Lancet Neurol 2015;14(9):914-925, DOI 10.1016/S1474-4422(15)00111-8 (**BLOCKED**, not loaded; Elsevier).
- Transplant-specific, **OPEN-SAVED**: Song T et al., Calcineurin Inhibitors Associated PRES in Solid Organ Transplantation: Report of 2 Cases and Literature Review, Medicine (Baltimore) 2016;95:e3173, DOI 10.1097/MD.0000000000003173 (CC BY-NC-ND 4.0). `PRES_CNI_in_SOT_review_PMC4998758.html`. Case report plus literature review, not a guideline.

## 14. Transplant-associated / drug-induced TMA in solid-organ recipients

- **No SOT-specific consensus or guideline found.** The consensus definitions I found (ASTCT TA-TMA, Transplant Cell Ther 2023, DOI 10.1016/j.jtct.2023.08.015) concern stem-cell transplant, out of scope.
- Best primary sources, **OPEN-SAVED**:
  - Abbas F et al. Thrombotic microangiopathy after renal transplantation: Current insights in de novo and recurrent disease. World J Transplant 2018;8(5):122. DOI 10.5500/wjt.v8.i5.122. `TMA_after_renal_transplantation_review_PMC6134269.html` (134 paragraphs, 6 tables). Review.
  - Hsiung C-Y, et al. Incidence and graft survival in kidney transplant recipients with de novo TMA: systematic review and meta-analysis. Transpl Int 2024;37:12168. DOI 10.3389/ti.2024.12168. `TMA_denovo_kidney_meta_analysis_2024_PMC10844394.html`.
- Not opened: a 2026 Clin Kidney J review (PMID 41822056) and a KDIGO Controversies conference report on complement-mediated TMA (not searched).

## 15. Diarrhea in SOT; C. difficile

| Record | Detail |
|---|---|
| Angarone M, et al. Diagnosis and management of diarrhea in SOT recipients: AST IDCOP | Clin Transplant 2019;33(9):e13550. DOI 10.1111/ctr.13550. **BLOCKED** (Wiley). |
| McDonald LC et al. Clinical Practice Guidelines for C. difficile Infection in Adults and Children: 2017 Update (IDSA/SHEA) | Clin Infect Dis 2018;66(7):e1-e48. DOI 10.1093/cid/cix1085. https://www.idsociety.org/practice-guideline/clostridium-difficile/ . **OPEN-SAVED**: `IDSA_cdiff_page.html` (full body on page, 17 mentions of "transplant"). The IDSA page says CURRENT but the 2021 focused update below modifies treatment recommendations. |
| Johnson S et al. IDSA/SHEA 2021 Focused Update on C. difficile in adults | Clin Infect Dis 2021;73(5):e1029-e1044, DOI 10.1093/cid/ciab549 (online 2021-06-14); short version CID 2021;73(5):755-757, DOI 10.1093/cid/ciab718. **BLOCKED** (OUP not loaded; no free copy found). **Newer than the 2017 text for fidaxomicin/bezlotoxumab recommendations.** Two guidelines both needed. |

## 16. Interactions with CNI and mTOR inhibitors

- FDA labels (section 7 DRUG INTERACTIONS; confirmed present as a coded section or titled "7 DRUG INTERACTIONS" in the saved SPL XML for Prograf, Astagraf XL, Envarsus XR, Neoral, Gengraf, Sandimmune, sirolimus, Zortress): see section 20. **OPEN-SAVED** in `dailymed/*.xml`.
- No consensus document specific to CNI/mTOR interactions found; the IATDMCT tacrolimus (2019) and everolimus (2024) reports (section 12) contain interaction content (not mapped).

## 17. Peri-operative / stress-dose steroids and adrenal insufficiency

| Record | Detail |
|---|---|
| **Beuschlein F et al. ESE and Endocrine Society Joint Clinical Guideline: Diagnosis and Therapy of Glucocorticoid-induced Adrenal Insufficiency.** | J Clin Endocrinol Metab 2024;109(7):1657-1683 (online 2024-05-10). DOI 10.1210/clinem/dgae250 (also Eur J Endocrinol, DOI 10.1093/ejendo/lvae029). CC BY-NC 4.0 per search; Crossref lists a 4.0 license. https://pmc.ncbi.nlm.nih.gov/articles/PMC11180513/ . **OPEN-SAVED**: `Endocrine_ESE_glucocorticoid_induced_AI_2024_PMC11180513.html` (318 paragraphs, 9 tables). Current. |
| Woodcock T et al. Guidelines for the management of glucocorticoids during the peri-operative period for patients with adrenal insufficiency (Association of Anaesthetists, Royal College of Physicians, Society for Endocrinology UK). | Anaesthesia 2020 (published online 2020-02-03; volume/pages not verified). DOI 10.1111/anae.14963. **BLOCKED** (Wiley; not loaded). Population is primary/secondary AI, partly overlapping. |
| NICE NG243 (Aug 2024) | Primary AI stress management; seen only as a search result, not opened. |

## 18. EM-specific reviews of the transplant recipient in the ED (framing only)

| # | Record | Access |
|---|---|---|
| 1 | Zhong D, et al. Approach to Transplant Infectious Diseases in the Emergency Department. Emerg Med Clin North Am 2018;36(4):811. DOI 10.1016/j.emc.2018.06.010. | **OPEN-SAVED** (PMC author manuscript): `EM_review_Zhong2018_transplant_ID_in_ED_PMC6237280.html` (76 paragraphs). https://pmc.ncbi.nlm.nih.gov/articles/PMC6237280/ |
| 2 | Evaluation of the Renal Transplant Recipient in the Emergency Department. Emerg Med Clin North Am 2019. DOI 10.1016/j.emc.2019.07.008 (PMID 31563202). | **BLOCKED** (Elsevier redirect; not loaded). |
| 3 | Care of the renal transplant recipient in the emergency department. Ann Emerg Med 2004. DOI 10.1016/j.annemergmed.2004.05.019 (PMID 15459617). | **BLOCKED** (not loaded). |
| 4 | Emergency department presentation of heart transplant recipients with acute heart failure. Heart Fail Clin 2009. DOI 10.1016/j.hfc.2008.08.011 (PMID 19026393). | **BLOCKED** (not loaded). |
| 5 | Evaluation of orthotopic liver transplant recipients presenting to the emergency department. Ann Emerg Med 1998 (PMID 9546022). No DOI. | **BLOCKED** (not loaded). Old. |

Also seen (not opened): WestJEM descriptive analysis of 1251 SOT ED visits (original research, not a review); EB Medicine pediatric transplant topic (paywalled). Authors/page ranges for items 2-5 not verified.

## 19. Named maintenance/induction regimens ("triple therapy")

**Citable source: OPTN/SRTR 2024 Annual Data Report**, chapters Kidney, Liver, Heart, Lung, Pancreas. Latest edition found (the 2023 ADR is also available; 2024 is newer). Landing page https://srtr.hrsa.gov/adr/2024/ ; chapter pages https://srtr.hrsa.gov/adr/2024/Kidney/ etc. Citation form to verify: "OPTN/SRTR 2024 Annual Data Report: <Organ>", Am J Transplant (the 2023 kidney chapter is AJT 2025;25(2S1):S22-S137 per PubMed 39947805; the 2024 journal citation was not looked up).

**OPEN-SAVED** as stripped text (page images removed): `SRTR_2024_ADR_Kidney_text.txt`, `..._Liver_text.txt`, `..._Heart_text.txt`, `..._Lung_text.txt`, `..._Pancreas_text.txt`.

Statements I read in the saved text (verbatim fragments; decimals were split by my sentence matcher, so percentages are cut off in places and must be re-read in the file):
- Kidney: "Most patients received tacrolimus and mycophenolate-based regimens during the initial transplant hospitalization period, with use of triple therapy including steroids ..." and "The most common immunosuppression regimens prescribed during the initial transplant hospitalization period were tacrolimus, a mycophenolate agent, and steroids".
- Liver: "For maintenance immunosuppression, the most common reported combination was a regimen of tacrolimus, a mycophenolate agent, and steroids".
- Heart: "By far, most adult heart transplant recipients are discharged on triple immunosuppressive therapy with tacrolimus, a mycophenolate agent, and a steroid"; "overall use of induction therapy remained around 50% in 2024".
- Lung: "Maintenance immunosuppression continued to be dominated by triple-drug therapy, with tacrolimus, mycophenolate, and steroids".
- Pancreas: chapter discusses induction (non-use) and tacrolimus plus MMF regimens in 2024.

Guideline sources for named regimens: KDIGO 2009 (section 1) and ISHLT 2023 heart guideline (section 8) and AASLD/AST 2025 graft-related guideline (section 10) discuss regimens; I did not extract their wording.

## 20. DailyMed SPL labels (setid URLs)

Method: DailyMed REST API (`/dailymed/services/v2/spls.json`) to find setids; each URL `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=<setid>` was requested and returned HTTP 200. "Page revised" is the `Revised:` line on the loaded page ("-" if the page showed none that my parser found). "SPL effective" is the effectiveTime in the SPL XML (YYYYMMDD). The two dates often differ; I report both rather than choose. "Boxed warning" = the page contained a boxed-warning section (`id="boxedwarning"`). DailyMed database snapshot: 2026-11-19. Labels change; re-check before citing.

| Drug / group | Brand or product chosen | setid URL | Page revised | SPL effective | Boxed warning |
|---|---|---|---|---|---|
| tacrolimus IR | Prograf (capsule/inj/granules) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=7f667de1-9dfa-4bd6-8ba0-15ee2d78873b | 8/2023 | 2023-08-25 | yes |
| tacrolimus XL | Astagraf XL | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e | 8/2023 | 2026-01-14 | yes |
| tacrolimus XR tab | Envarsus XR | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=de2315b0-6344-43ac-9aea-3e3b68d828e7 | 4/2024 | 2025-02-26 | yes |
| cyclosporine modified | Neoral | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=94461af3-11f1-4670-95d4-2965b9538ae3 | September 2023 | 2026-08-10 | yes |
| cyclosporine modified | Gengraf | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e896cbfe-4745-4088-82a3-8dc10b75c41f | - | 2024-08-21 | yes |
| cyclosporine non-modified | Sandimmune | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=5e5926a7-1de0-4b54-a5c0-286b6200ff82 | March 2026 | 2026-07-10 | yes |
| mycophenolate mofetil | CellCept | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=37241e87-4af4-4dc3-a1aa-ea6f20d8dc40 | 7/2026 | 2026-08-05 | yes |
| mycophenolic acid | Myfortic | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=eed26501-890d-4ff6-88e7-6dbea4726e53 | 7/2026 | 2026-07-29 | yes |
| azathioprine | Imuran (Legacy Pharma) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=4d62b6e4-a9d4-4818-e063-6394a90aa208 | - | 2026-03-19 | yes |
| azathioprine | Imuran (Sebela) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=606101a0-6244-7eff-e053-2a91aa0acadd | - | 2025-11-08 | yes |
| sirolimus | sirolimus tab (Mylan, sugar-coated; Rapamune brand not found) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=5908cd1a-fc5a-462f-99ed-1d8983e253c9 | 11/2024 | 2026-03-26 | yes |
| sirolimus | sirolimus tab film-coated (Glenmark) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=57fb4d90-3ccb-4a69-af1e-53be83f7a504 | 7/2025 | 2026-01-28 | yes |
| everolimus | Zortress | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e082a024-7850-400b-a5c2-2a140612562a | 9/2026 | 2026-09-16 | yes |
| belatacept | Nulojix | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=c16ac648-d5d2-9f7d-8637-e2328572754e | 7/2021 | 2021-07-28 | yes |
| prednisone | prednisone tab/solution (Hikma) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=3115aef0-fd50-4ec8-a064-3effb695f3f2 | - | 2025-04-22 | no |
| methylprednisolone oral | Medrol | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=39d5270b-d957-4821-93d6-501b7b9f02d4 | - | 2025-11-14 | no |
| methylprednisolone IV | Solu-Medrol (Pharmacia & Upjohn) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=7271310c-7764-4812-aa30-a5e90987c7a9 | - | 2026-06-25 | no |
| basiliximab | Simulect | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=1af01887-b69d-444b-91ed-ebfe12784440 | August 2020 | 2026-10-26 | yes |
| ATG rabbit | Thymoglobulin | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=bbd8ab99-552e-4b81-aca4-6b0c7af8b9ae | 6/2026 | 2026-06-24 | no |
| ATG equine | Atgam | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=bd545ba1-2366-4df1-bd67-10dfd7632b54 | 9/2023 | 2024-06-18 | yes |
| valganciclovir | Valcyte | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=4c517a39-2ded-4c5a-8d56-276853414b31 | 12/2025 | 2025-12-08 | yes |
| ganciclovir IV | ganciclovir (Fresenius Kabi, lyophilized) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=35addab5-09db-4f8a-9c69-6fbce33ecc37 | 9/2022 | 2026-01-09 | yes |
| ganciclovir IV | ganciclovir (Par, lyophilized) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=87afd103-6e64-444f-971d-0e732e9ae995 | 9/2026 | 2026-09-25 | yes |
| letermovir | Prevymis | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=1b49df80-be4f-47e0-a0b7-123f3e69395b | 1/2026 | 2026-01-14 | no |
| SMX-TMP | Bactrim/Bactrim DS (Sun) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f59d0c04-9c66-4d53-a0e1-cb55570deb62 | - | 2024-12-30 | no |
| atovaquone | Mepron | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=b426b6bf-f07e-4580-97ae-dfca1ddf5b8f | 3/2026 | 2026-03-20 | no |
| dapsone | dapsone tab (Sun; generic) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=cb312185-b9f1-4fa4-9481-bcf5d9bb3edf | December 2018 | 2026-03-17 | no |
| pentamidine IV | Pentam 300 | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=cc2b635e-4840-4dc3-a177-5484371680e8 | May 2022 | 2022-09-13 | no |
| pentamidine inh | NebuPent | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e2ad9d3c-b6c3-4f70-87e0-722a8ff94ccb | October 2016 | 2024-10-15 | no |
| fluconazole | Diflucan | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f694c617-3383-416c-91b6-b94fda371204 | 3/2025 | 2026-04-02 | no |
| voriconazole | Vfend | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=ce3ef5cf-3087-4d92-9d94-9eb8287228db | 2/2026 | 2026-02-26 | no |
| posaconazole | Noxafil | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=b073b082-7b57-4423-8c06-4fd4263d6f84 | 2/2026 | 2026-02-13 | no |
| isavuconazonium | Cresemba | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=8f7f73b8-586a-4df0-935f-fecd4696c16c | 4/2025 | 2025-04-25 | no |
| acyclovir oral | acyclovir cap/tab (Chartwell; generic) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=8cd22728-34b4-4e55-8339-580138fe46d8 | 06/2022 | 2026-11-10 | no |
| acyclovir IV | acyclovir inj (Zydus; generic) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=383b930b-6e9c-4ac9-a078-baac6276f340 | - | 2026-10-26 | no |
| valacyclovir | Valtrex (GSK) | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f8e0d8f8-cb73-4206-a484-88f5c4fbd719 | 11/2025 | 2025-11-12 | no |
| IVIG | Privigen | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=7e5649da-75be-4a42-8eeb-4aeba562c401 | 5/2025 | 2026-05-04 | yes |
| IVIG | Gammagard Liquid | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=9d42adca-0dd7-4df7-864d-5a7feee52130 | 9/2024 | 2025-12-10 | yes |
| IVIG | Gamunex-C | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=ade6b84a-e95b-0a49-3296-f56208fdf35b | 5/2026 | 2026-11-01 | yes |
| eculizumab | Soliris | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=ebcd67fa-b4d1-4a22-b33d-ee8bf6b9c722 | 6/2026 | 2026-07-08 | yes |
| tocilizumab | Actemra | https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=2e5365ff-cb2a-4b16-b2c7-e35c6bf2de13 | 12/2025 | 2025-12-16 | yes |

Notes on section 20:
- Several requested drugs have many generic labels. Where no widely used brand label exists on DailyMed I picked one named generic and said so: prednisone (Hikma), dapsone (Sun), acyclovir oral (Chartwell) and IV (Zydus), ganciclovir IV (two lyophilized generics listed: Fresenius Kabi and Par; Cytovene brand not found), sirolimus (see next). Pick a different labeler if the owner prefers.
- **Rapamune brand label was not found** in DailyMed by drug-name search (0 hits for "rapamune"). Listed instead: Mylan sirolimus sugar-coated tablet and Glenmark sirolimus film-coated tablet. Whether either is the Pfizer/Wyeth authorised generic was not checked.
- Azathioprine: two Imuran labels listed (Legacy Pharma, newer SPL; Sebela). Which is the current brand holder is unclear.
- Mycophenolate: CellCept label covers tablet, capsule, suspension, IV. Mycophenolic acid: Myfortic only (generic delayed-release labels not listed).
- Tacrolimus: Prograf label covers capsule, injection and granules (one setid); Astagraf XL and Envarsus XR are separate setids. Prograf page revised 8/2023 but DailyMed published date 2025-03-21 (SPL version 30); the dates disagree, which is why both columns are shown.
- Cyclosporine: Neoral and Gengraf are the modified formulations; Sandimmune is non-modified (also injection).
- Immune globulin IV: Privigen is listed as the chosen brand; I have no usage data to say it is "most used". Gammagard Liquid and Gamunex-C setids are also listed.
- Eculizumab: Soliris (reference product); biosimilars Bkemv (setid 002f9748-b0e8-4b6e-a38b-56930a839491) and Epysqli (1fa1aa80-1c59-44d4-9841-b6c52882651b) exist. Tocilizumab: Actemra (reference); several biosimilars exist.
- Pentamidine: IV (Pentam 300) and inhaled (NebuPent) both listed.
- Methylprednisolone: oral (Medrol) and IV (Solu-Medrol) listed. Prednisone setid 3115aef0 label covers tablets and solution.
- Thymoglobulin: no boxed warning displayed on the current page (page revised 6/2026). Do not assume older labels match.
- Saved SPL XML (CNI/mTOR labels, for interaction section 7): `dailymed/prograf_7f667de1.xml`, `astagraf_550a5cd4.xml`, `envarsus_de2315b0.xml`, `neoral_94461af3.xml`, `gengraf_e896cbfe.xml`, `sandimmune_5e5926a7.xml`, `sirolimus_5908cd1a.xml`, `zortress_e082a024.xml`.

---

## Final lists

### (a) OPEN and saved locally (28 documents or document sets; 7 further index/stub/XML files noted below)

Path prefix: `/Users/kittechsix/Developer/mymedkitt-transplant/research/transplant-sources/`

1. `KDIGO_transplant_recipient_2009_guideline.pdf`
2. `TTS_CMV_4th_consensus_2025_PMC12180710.html`
3. `TTS_CMV_3rd_consensus_2018_WayneState_copy.pdf` and `TTS_CMV_3rd_consensus_2018_ovid_fulltext.html` (same paper, superseded)
4. `TTS_BK_2nd_consensus_2024_PMC11335089.html`
5. `ASTIDCOP_pneumonia_2019_PMC7162188.html`
6. `ISHLT_heart_recipient_care_2023_guideline.pdf`
7. `ISHLT_ALAD_consensus_2026.pdf`
8. `ISHLT_BLAD_consensus_2026.pdf`
9. `ISHLT_pulmonary_AMR_GAP_definition_2026.pdf`
10. `ISHLT_CLAD_consensus_2019_Verleden.pdf`
11. `ISHLT_lung_AMR_consensus_2016_Levine.pdf`
12. `ISHLT_lung_rejection_nomenclature_2007_Stewart.pdf`
13. `AASLD_AST_LT_graft_related_complications_2024_LVT0715.html`
14. `AASLD_AST_LT_nongraft_complications_2025_LVT0785.html`
15. `AASLD_AST_LT_candidate_evaluation_2025_HEP1644.html`
16. `IDSA_2026_aspergillosis_prevention_adult_SOT_page.html`
17. `IDSA_aspergillosis_2016_page.html`
18. `IDSA_candidiasis_2016_page.html`
19. `IDSA_cdiff_page.html` (2017 guideline)
20. `IATDMCT_tacrolimus_2nd_consensus_2019_ftd0640.html`
21. `IATDMCT_everolimus_2nd_consensus_2024_ftd1250.html`
22. `CsA_C2_European_consensus_2005_Nashan_TransplInt.pdf`
23. `Endocrine_ESE_glucocorticoid_induced_AI_2024_PMC11180513.html`
24. `PRES_CNI_in_SOT_review_PMC4998758.html`
25. `TMA_after_renal_transplantation_review_PMC6134269.html`
26. `TMA_denovo_kidney_meta_analysis_2024_PMC10844394.html`
27. `EM_review_Zhong2018_transplant_ID_in_ED_PMC6237280.html`
28. `AST_Primer_Ch2_Pancreas_Islet_2025.pdf` (annotated reference list, not a guideline) and `SRTR_2024_ADR_{Kidney,Liver,Heart,Lung,Pancreas}_text.txt` (stripped text of the OPTN/SRTR 2024 chapters)

Other files in the directory: `dailymed/*.xml` (8 SPL files), `ISHLT_standards_guidelines_index.html`, `AASLD_practice_guidelines_index.html` (index pages, used for discovery), `IDSA_cryptococcal_2010_page.html` (abstract-only stub; do NOT treat as open full text).

### (b) OPEN online but not saved

None. Everything I opened was saved. One link found but not fetched: ISHLT 2026 heart graft-dysfunction-within-72-h consensus PDF, https://www.ishlt.org/docs/default-source/standards-guidelines/2026_consensusdocument_ishlt_graftdysfunctionafterhtx.pdf?sfvrsn=cc3e6cad_1 (page loaded HTTP 200; PDF body not loaded, so not counted as OPEN).

### (c) PAYWALLED / BLOCKED: documents the owner would need to supply as PDFs (most important first)

1. AST IDCOP, Pneumocystis jiroveci in SOT. Clin Transplant 2019;33(9):e13587. DOI 10.1111/ctr.13587
2. AST IDCOP, Cytomegalovirus in SOT. Clin Transplant 2019;33(9):e13512. DOI 10.1111/ctr.13512
3. AST IDCOP, Diagnosis and management of diarrhea in SOT recipients. e13550. DOI 10.1111/ctr.13550
4. AST IDCOP, PTLD, EBV infection and disease in SOT. e13652. DOI 10.1111/ctr.13652
5. AST IDCOP, BK polyomavirus in SOT. e13528. DOI 10.1111/ctr.13528
6. AST IDCOP, Invasive aspergillosis in SOT. e13544. DOI 10.1111/ctr.13544
7. AST IDCOP, Candida infections in SOT. e13623. DOI 10.1111/ctr.13623
8. AST IDCOP, Cryptococcosis in SOT. e13543. DOI 10.1111/ctr.13543
9. Fishman JA. Infection in Organ Transplantation. Am J Transplant 2017;17(4):856-879. DOI 10.1111/ajt.14208 (timeline)
10. Fishman JA. Infection in Solid-Organ Transplant Recipients. N Engl J Med 2007;357:2601-2614. DOI 10.1056/NEJMra064928 (classic timeline)
11. IDSA/SHEA 2021 Focused Update, C. difficile in adults. Clin Infect Dis 2021;73(5):e1029-e1044. DOI 10.1093/cid/ciab549
12. EASL Clinical Practice Guidelines on liver transplantation. J Hepatol 2024;81(6):1040-1086. DOI 10.1016/j.jhep.2024.07.032
13. AST IDCOP, Emerging fungal infections in SOT. e13525. DOI 10.1111/ctr.13525
14. IDSA 2010 Cryptococcal Disease guideline (full text). Clin Infect Dis 2010;50:291-322. DOI 10.1086/649858
15. Woodcock T et al. Peri-operative glucocorticoids in adrenal insufficiency. Anaesthesia 2020. DOI 10.1111/anae.14963
16. Fugate JE, Rabinstein AA. PRES review. Lancet Neurol 2015;14:914-925. DOI 10.1016/S1474-4422(15)00111-8
17. Hinchey J et al. Reversible posterior leukoencephalopathy syndrome. N Engl J Med 1996;334:494-500. DOI 10.1056/NEJM199602223340803
18. EM reviews: Evaluation of the Renal Transplant Recipient in the ED, Emerg Med Clin North Am 2019, DOI 10.1016/j.emc.2019.07.008; Care of the renal transplant recipient in the ED, Ann Emerg Med 2004, DOI 10.1016/j.annemergmed.2004.05.019; heart transplant ED review, Heart Fail Clin 2009, DOI 10.1016/j.hfc.2008.08.011
19. Lower priority: AST IDCOP Donor-derived infections (e13547), Safe living (e13519), Surgical site infections (e13589); AASLD/AST 2012 long-term management guideline (Liver Transpl 2013, DOI 10.1002/lt.23566, probably superseded); AST IDCOP vaccination guideline, Am J Transplant 2026, DOI 10.1016/j.ajt.2026.07.033 (not opened, may be open access).

Note: the JHLT 2023 heart guideline and the 2026 ALAD/BLAD documents are NOT on this list because the ISHLT-hosted PDFs are saved.

### Not found / needs a decision
- Primary guideline for pancreas transplant complications: none found.
- Guideline for PRES in transplant: none found. For SOT TMA: none found.
- IATDMCT cyclosporine consensus: none found.
