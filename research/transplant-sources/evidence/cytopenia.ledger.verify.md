# Verification of cytopenia.ledger.md (independent, read-only; 2026-11-20)

Method: every source (SPL XML, KDIGO/ISHLT PDFs, CMV/AASLD/Zhong HTML, tree .ts files) was converted to text and each of the 153 quotes was searched in its source (whitespace, hyphenation, ligature and case normalised); every row's claim was then compared with its quote and surrounding passage; KDIGO p.110 (22.1-22.4), ISHLT p.72, p.29 and p.57 were checked on rendered page images. All 153 quotes were found in their source; all claims and quotes are within the word limits.

## Counts
- Rows checked: 153 (120 tagged SUMMARY-CANDIDATE/NODE/TEAM, 17 OVERLAY-only, 16 APP; C78 is OVERLAY+APP). Correct: 124. Defective: 29.
- By class: BROADER 9 (C3, C80, C81, C118-C123); WRONG TAG 9 (C38, C98, C100, C102, C131, C133, C134, C136, C137); QUOTE INEXACT 6 (C101, C111, C112, C114, C115, C150); FIRMER 3 (C78, C109, C113); WRONG GRADE 1 (C130; plus grade wording on C118-C120); UNSUPPORTED 1 (C126). WRONG PRODUCT / WRONG POPULATION / WRONG NUMBER OR UNIT: 0 outright (C102 is a population problem handled as WRONG TAG).
- Tag counts in the ledger footer (APP 16, NODE 88, OVERLAY 50, SUMMARY-CANDIDATE 5, TEAM 35) are correct.

## Defective rows, ranked by how early the page shows them
| Row | Class | Source (locator) | Fix: corrected claim (<=25 words) |
|---|---|---|---|
| C118 (SUMMARY, TEAM) | BROADER + grade wording | CMV 2025, Treatment consensus statements; the whole sentence sits in the CMV-DISEASE TREATMENT list ("During the treatment phase..." precedes it); cmv.md itself titles it "7.1 Leukopenia on treatment" | "CMV consensus 2025, treatment of CMV disease: with leukopenia, attempts should be made to continue valganciclovir or ganciclovir." Grade: "(strong, moderate)" is printed once, after sentence 3, so word as "statement graded strong, moderate". Not about prophylaxis. |
| C120 (SUMMARY, TEAM) | BROADER + grade wording | same statement | "CMV consensus 2025, treating CMV disease: reducing valganciclovir or ganciclovir dose for leukopenia alone is not recommended." Same grade wording. A prophylaxis patient is not covered. |
| C119 (TEAM) | BROADER + WRONG GRADE | same | "CMV consensus 2025, CMV-disease treatment: options in leukopenia include G-CSF and/or adjusting other myelosuppressive drugs." Sentence 2 is permissive ("Options include"); do not show "strong" against it, only "part of a statement graded strong, moderate". |
| C102 (SUMMARY, NODE) | WRONG TAG (population) | KDIGO p.111 (S98): "In the nontransplant population with iatrogenic neutropenia..." (ref 740) | Keep claim as is; drop SUMMARY-CANDIDATE (it is about non-transplant patients); NODE only as framing, labelled non-transplant. Quote prints "lL" for µL (text layer): print "µL". |
| C133, C134, C136, C137 | WRONG TAG | Zhong 2018, Initial Management in the ED (narrative review) | A number (ANC 500/1,000; 38.3/38.0 C; within one hour) or a regimen (cefepime, meropenem, piperacillin-tazobactam) from a review is not allowed on the page. Remove NODE; keep as background only. C133 and C134 are IDSA 2010 cancer-guideline definitions (ref 44) relayed by the review; the regimen sentence itself carries no citation. |
| C38 | WRONG TAG | Valcyte 5.1 "hematopoietic growth factors may be considered" | Remove TEAM: a growth factor is not a change to an immunosuppressant or antiviral. NODE only. |
| C98 | WRONG TAG | KDIGO 22.1, Not Graded (confirmed on page image) | Remove TEAM (a monitoring instruction, not a drug change). Also note 22.1 is a schedule (daily to discharge, 2-3x/week wk 2-4, weekly mo 2-3, monthly mo 4-12, then annually); the row quotes only the last bullet. |
| C100 | WRONG TAG | KDIGO 22.3, Not Graded (confirmed) | Remove TEAM: "include treatment of underlying causes" does not name a drug change. |
| C3 | BROADER | CellCept 6.1: "...receiving CELLCEPT 3 g daily" (the quote cuts it off) | "CellCept label: with 3 g daily in trials, severe neutropenia (ANC below 0.5 x 10^3/µL) occurred in up to 2% kidney, 2.8% heart, 3.6% liver." |
| C78 | FIRMER | Actemra 5.4: "It is not recommended to initiate ... ANC less than 2000" | Claim and per-drug table say "do not start"; label says "not recommended to initiate". Corrected: "Actemra label (RA, GCA, SSc-ILD): not recommended to start when ANC is below 2000/mm3; no transplant indication." |
| C80, C81 | BROADER | Actemra 2.11 table: after hold, resume is at a stated reduced dose (RA IV 4 mg/kg then increase; GCA IV 6 mg/kg) | Quote stops before it; "resume" is not in the quote. Corrected: "Actemra 2.11 (RA, SSc-ILD, GCA): hold at ANC 500-1000 [platelets 50,000-100,000]; restart per the label's stated dose once above 1000 [100,000]; discontinue below 500 [50,000]." |
| C121, C122, C123 | BROADER | CMV 2025 Management narrative P189 / statement P204, all in CMV-disease treatment | Add "in CMV-disease treatment" to each claim prefix. C123 grade (weak, very low) is correctly attached. |
| C126 | UNSUPPORTED (study type) | CMV 2025 letermovir paragraph cites refs 122, 123; 122 is the randomised kidney trial, 123 a real-world study | Drop "observational studies" from the locator; claim: "...G-CSF use and mycophenolate modification fell after a switch to letermovir (refs 122, 123)." Ungraded. |
| C130 | WRONG GRADE (column) | ISHLT 2023 p.72 image: the text and Class I/C sit in the "2010 Prior Guideline Recommendation" column; 2023 column reads "Continuing approval without change" | "ISHLT heart (2010 recommendation, continued 2023): in non-lymphoid solid tumours, continue immunosuppression unless specific reasons, e.g. reduce marrow-suppressive agents for leucopenia." Also malignancy context: drop TEAM. |
| C131 | WRONG TAG | ISHLT p.29, Topic 7 heart-transplant surgery coagulopathy | Perioperative cardiac surgery, not drug cytopenia: remove NODE. |
| C109 | FIRMER | KDIGO p.73: "Potential alternative agents include..." | "KDIGO 2009 kidney: drug-induced neutropenia from TMP-SMX is an indication for alternative PJP prophylaxis; potential agents include dapsone, pentamidine, atovaquone, clindamycin plus pyrimethamine." |
| C113 | FIRMER | KDIGO p.112 | "...one case report suggested CSFs may have been associated with worsening graft function" (not "worse graft function"). |
| C101, C111, C112, C114, C115 | QUOTE INEXACT | KDIGO text-layer artefacts ("lL", "re-moving", "par-vovirus", "inade-quate", "ab-solute", "T reatment") | Quotes are verbatim to the text layer, not to the printed page. Clean to the printed words before display. |
| C150 | QUOTE INEXACT (locator) | quote is in hemolytic-anemia-start (option description); claim names node hemolytic-anemia-g6pd, whose body lists dapsone with different words | Cite the start node or quote the g6pd body line. Both nodes have summary and citation. |
| C95 (conditional) | needs companion | Neoral/Sandimmune adverse-reaction table lists leukopenia (2% kidney, 6% heart, <1% Sandimmune kidney; 19% azathioprine arm) | Verbatim and same strength, but show with the label's leukopenia table or the overlay reads as "no low counts". |

## Grades
- CMV: one "(strong, moderate)" printed after the third sentence only. Word C118/C119/C120 as "from a three-sentence statement graded strong, moderate"; never a separate grade on C119. C123 (weak, very low) correct. C121, C122 narrative: ungraded.
- KDIGO 22.1-22.3 "Not Graded": CONFIRMED on the rendered page (also 22.4 is 1C, unrelated). All other KDIGO rows are rationale: correct as "ungraded".
- AASLD C127/C128 "Strong, Level 2" correct. ISHLT C130 see above.

## Per-drug table
- Numbers and units match the labels: CellCept ANC 1.3 and 0.5 x10^3/µL; Myfortic 1.3 (5.6) and 1.5 x10^3/mcL (overdosage, different verb: "should be interrupted or reduced" vs "may be appropriate to interrupt or discontinue"); Valcyte "avoided" and ganciclovir "not recommended" at ANC 500/µL, platelets 25,000/µL, Hgb 8 g/dL; Thymoglobulin WBC 2,000-3,000 / platelets 50,000-75,000 half dose, below 2,000 / 50,000 consider stopping; Atgam, dapsone, Bactrim correct.
- Fix: Actemra "do not start" -> "not recommended to start"; add platelets below 100,000 "not recommended to initiate" and monitor platelets 4-8 weeks (5.4), and the COVID-19 thresholds are a different population (ANC <1000, platelets <50,000).
- Table cells with no supporting row: Myfortic CBC schedule (5.6: weekly month 1, twice monthly months 2-3, monthly through year 1); Imuran CBC schedule (Warnings: Cytopenias); Zortress neutropenia/thrombocytopenia and sirolimus leukopenia (label lists only); Thymoglobulin "leukopenia".
- Add Thymoglobulin 6.1: leukopenia 63% vs 15% (basiliximab), thrombocytopenia 16% vs 5% (WBC <3000; platelets <75,000), a big omission for an ED reader. Add Atgam 6.1: thrombocytopenia 21.6%, leukopenia 17.9% (most common reactions >10%).

## SOURCES DIFFER
1. Valcyte/ganciclovir vs CMV: both quotes verbatim; same decision, but add that the CMV statement is for CMV-disease TREATMENT, so it does not address prophylaxis (where the labels' counts apply).
2. Myfortic 1.3 vs 1.5: verbatim, same label; also note the verb differs (interrupt/reduce vs interrupt/discontinue).
3. Allopurinol: verbatim; real conflict. Note KDIGO's sentence carries ref (616), the ASCO CSF review, so it is thinly sourced rationale.
4. G-CSF: verbatim; one-sided. Add C114 and C115 (KDIGO also says febrile neutropenia benefits from CSFs, from oncology evidence) so it does not read as "KDIGO says harm".
5. TMP-SMX: verbatim but not quite the same decision (Imuran: additive leukopenia with azathioprine; KDIGO: TMP-SMX alone). Say so.
6. What to adjust first: verbatim; ISHLT (C130) is a malignancy statement from a 2010 column, so it is a stretch. CMV statement is treatment-only.
Missed entries: (a) persistent neutropenia on valganciclovir PROPHYLAXIS: Valcyte "avoid at ANC <500", AASLD 2025 "letermovir can be substituted" (liver, Strong, Level 2), CMV 2025 consensus covers only treatment; (b) CBC schedule: KDIGO 22.1 (daily to discharge, 2-3x/week, weekly, monthly, Not Graded) vs CellCept/Myfortic/Imuran labels (weekly month 1, twice monthly 2-3, monthly) vs Dapsone; (c) cyclosporine label "does not cause bone marrow suppression" vs its own leukopenia table, and KDIGO "CNIs not generally associated with leucopenia" vs Prograf trial anemia 47%, leukopenia 13-17%, thrombocytopenia 24%.

## NOT IN (each claimed absence tested across all saved text, incl. extracted lung/CsA/pancreas PDFs and SRTR texts)
All six holds: no source gives empirics for a neutropenic transplant patient except Zhong; MASCC has zero hits; no admission rule for neutropenia; no ED G-CSF instruction; no transfusion threshold for transplant (only KDIGO anaemia definitions); no hold/restart duration; no ranking of which drug to stop. Present but not in the ledger's list: (1) Zhong's CT for typhlitis in neutropenic patients with fever, abdominal pain and diarrhoea, and fungal cultures in neutropenic patients; (2) CMV 2025: CMVIG for prolonged neutropenia on ganciclovir, with letermovir an alternative; (3) IDSA aspergillosis 2016 has a section on CSFs and granulocyte transfusion for invasive aspergillosis (the ledger already notes it); (4) Afinitor (oncology everolimus) label has febrile-neutropenia dose rules (different product from Zortress; do not import).

## Zhong 2018
File saved and readable (65 KB text, PMC author manuscript, Emerg Med Clin North Am 2018;36(4):811-822; manifest section 18 item 1, OPEN-SAVED). Narrative review of infectious disease in SOT and HCT patients in the ED; no systematic methods, no grades. The antibiotic sentence ("anti-pseudomonal agent, e.g. cefepime, meropenem, or piperacillin-tazobactam") has no citation of its own; the neutropenic-fever definition and later MRSA/resistant-organism lines cite ref 44 (Freifeld IDSA 2010, cancer); "within one hour" cites ref 46 (sepsis guidance). It never mentions mycophenolate, leukopenia or G-CSF. Quotes C133-C138 are verbatim. Rule breach: C133, C134, C136, C137 are NODE-tagged numbers or a regimen.

## APP rows (all quotes found in the tree files; all nodes have summary and citation)
- C139 tpe-cytopenia stub confirmed (id line 703; toxicities.ts line 20). C140-C145: onc-fn-recognize/mascc/low-risk/high-risk/occult exist, summary and citation present; references 3 IDSA 2010, 4 NCCN cancer infections, 5 MASCC cancer index; body never says transplant or chemotherapy; MASCC item "Solid tumor or no prior fungal infection"; "Oncologist agrees with outpatient management"; antifungal trigger "High-risk hematologic malignancy"; cefepime/pip-tazo/meropenem within 60 minutes. Description accurate. (onc-fn-occult recommendation string matches exactly.)
- C146-C149: thrombocytopenia nodes accurate. Add: thrombo-drug says "Stop suspected nonessential culprit" which does not fit an immunosuppressant; thrombo-transfusion gives <10k/<20k/<50k/<100k targets, general adult.
- C150 locator issue (above); C151 PLASMIC "No transplant history" correct; C152 sepsis-special immunosuppressed line exact (node is `skippable: true`); C153 bt-prbc "Transfuse if Hgb <7 g/dL" exact.

## Omissions an ED physician needs (stated in sources, absent from ledger)
1. Myfortic 7.9 / CellCept: MMF with acyclovir/ganciclovir may raise MPAG and the co-drug; Myfortic says "monitor blood cell counts". Myfortic 7.2: not recommended with azathioprine.
2. Ganciclovir injection label's MMF interaction (hematological toxicity risk; monitor): only Valcyte's is in the ledger.
3. Prevymis (letermovir) label: discontinuation for neutropenia 1% vs 2% and leukopenia 1% vs 5% against valganciclovir (kidney trial).
4. Pentamidine labels: caution in leukopenia, thrombocytopenia, anemia (leukopenia 10.4% in trials); relevant because KDIGO names pentamidine as the PJP alternative.
5. Imuran warning: immunosuppression raises bacterial, viral, fungal, opportunistic infection risk; CellCept fatal infection/sepsis about 2% kidney/heart, 5% liver; Imuran "leukopenia does not correlate with effect; do not raise dose to lower WBC". Dapsone: loss of 1-2 g Hgb and methemoglobin in almost all patients; dapsone label has no PJP indication (dermatitis herpetiformis, leprosy).
6. Valtrex: TTP/HUS at 8 g/day in renal transplant patients; KDIGO definitions of anemia (Hgb <13.5/12.0 g/dL) and thrombocytopenia (<150,000/µL); KDIGO mTORi leukopenia RR 2.02 and valganciclovir vs ganciclovir leukopenia 8.2% vs 3.2%; PRCA is covered.
7. Tacrolimus/cyclosporine trial hematology (Prograf anemia 47%, thrombocytopenia 24%, leukopenia 13-17%).

## Verdict: READY AFTER LISTED FIXES
Fix first: the CMV treatment scope and grade wording (C118-C120), the Zhong NODE tags (C133, C134, C136, C137), C102 as SUMMARY, the TEAM mis-tags (C38, C98, C100), Actemra wording (C78, C80, C81), the C130 grade column, and add the omitted rows (Thymoglobulin 6.1, Myfortic CBC schedule, Imuran CBC schedule, KDIGO 22.1 schedule). No row had a wrong number, unit or product.
