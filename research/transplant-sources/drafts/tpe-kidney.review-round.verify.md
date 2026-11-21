# Verification: tpe-kidney (7 nodes, 5 overlays) after the review round

Read-only meaning check. Sources used: KDIGO 2009 PDF (text layer for all 383 quotes; page images 22, 34, 36, 43, 87 viewed), Prograf / Astagraf XL / Envarsus XR SPL XML, src/data/trees (adult-uti, hiv and the seven linked consults), sibling draft node files. No source or draft file was edited.

VERDICT: READY AFTER LISTED FIXES. Findings 1 and 2 are mandatory (patient-safety wording); 3-10 should be fixed before release.

## 1. Ranked findings

| # | Location | Text | Class | Source | Fix |
|---|---|---|---|---|---|
| 1 | CA6, CA7, infection summary | CA6 "recommend intravenous trimethoprim-sulfamethoxazole, corticosteroids, reduced immunosuppression (1C) (call the transplant team first)"; CA7 and summary "Systemic HSV: recommend intravenous acyclovir (1B) and reduced immunosuppression (1D) (call the transplant team first)" | PARENTHETICAL PLACEMENT (see section 3) | K166 PDF 73; K141 PDF 63; K183 PDF 65 "hospitalization and treatment with intravenous acyclovir is warranted" | Attach the parenthetical to the immunosuppression clause only (wordings in section 3) |
| 2 | CA2 | "Exclude dehydration, obstruction and high CNI levels, then biopsy a persistent unexplained creatinine rise (KDIGO 2009, kidney recipients: recommend, 1C)." | RATIONALE WORDED AS RECOMMENDATION; WRONG GRADE (the one trailing "recommend, 1C" covers the exclusion clause, which is rationale) | 9.1 (1C) is the box at the top of PDF 43 (S30): "We recommend kidney allograft biopsy when there is a persistent, unexplained increase in serum creatinine." The exclusion is later rationale text: "Causes of acute, reversible declines in GFR should be ruled out, including dehydration, urinary obstruction or acute CNI toxicity (by demonstrating high blood levels), before a biopsy is performed." The guideline order is recommendation first, rationale after; the page reverses it | "KDIGO 2009, kidney recipients: for a persistent unexplained creatinine rise, recommend biopsy (1C); first rule out dehydration, obstruction, acute CNI toxicity (rationale)." (22 words) |
| 3 | Hub summary | "persistent unexplained creatinine rise: exclude dehydration, obstruction, high CNI levels (rationale); recommend biopsy (1C). Extra immunosuppression may harm if not rejection (rationale)." | UNCLEAR (last sentence); order reversed; imperative "exclude" on a rationale | K4 PDF 34 (S21), second rationale bullet, image checked: "Treatment of decreased kidney allograft function that is not caused by acute rejection with additional immunosuppressive medication may be harmful." Grade attribution in the summary is clear (each clause carries its own marker) | "KDIGO 2009, kidney recipients: persistent unexplained creatinine rise: recommend biopsy (1C); first rule out dehydration, obstruction, high CNI levels (rationale). Extra immunosuppression for non-rejection causes may be harmful (rationale)." (29 words) |
| 4 | Vascular summary and body bullet 5 | "Hard-to-control hypertension with unexplained dysfunction: consider vascular screening (rationale)" | WRONG SCOPE (narrower: makes dysfunction a condition) | K88 PDF 86 (S73): "When hypertension is difficult to control, especially when it is associated with otherwise unexplained kidney allograft dysfunction, screening for allograft vascular compromise, within or proximal to the allograft artery, should be considered." | "Hard-to-control hypertension, especially with unexplained dysfunction: consider vascular screening (rationale)". Fix K88 claim the same way. Full summary within 30: "...suggest allograft ultrasound for dysfunction (2C); it can show arterial occlusion, venous thrombosis, obstruction (rationale). Hard-to-control hypertension, especially with unexplained dysfunction: consider vascular screening (rationale)." (29) |
| 5 | Rejection summary | "suggest antibodies for steroid-unresponsive or recurrent cellular rejection (2C)" | BROADER ("antibodies" loses "lymphocyte-depleting" or OKT3; the page also lists anti-CD20 and immunoglobulin for antibody-mediated rejection, so the bare word is ambiguous) | 6.3.2 PDF 34 image: "We suggest using lymphocyte-depleting antibodies or OKT3 for acute cellular rejections that do not respond to corticosteroids, and for recurrent acute cellular rejections. (2C)" Biopsy clause: 6.1 (1C) exact; "unless it substantially delays treatment" present | Say "lymphocyte-depleting antibodies". That makes 31 words; cut one (for example "kidney recipients" to "recipients" in the lead) |
| 6 | Chronic summary and overlay K269 bullet | "blood pressure below 130 systolic and 80 diastolic in adults (2C)"; "suggest diabetes screening after starting or increasing a CNI, mTOR inhibitor or corticosteroid (2D)" | UNCLEAR (no units); FIRMER (drops "substantially") | 16.1.2 PDF 84: "<130 mm Hg systolic and <80 mm Hg diastolic if >=18 years of age (2C)". 15.1.2 PDF 79: "after starting, or substantially increasing the dose, of CNIs, mTORi, or corticosteroids. (2D)" | "below 130/80 mm Hg in adults"; "after starting or substantially increasing" (K279 ledger claim also dropped "dose") |
| 7 | Drugs node, Not-in line | "Not in KDIGO 2009: cautions for macrolides, azoles, aminoglycosides or vancomycin." | FALSE for "azoles" (the page's own Nearest and overlay K239/K240 cite ketoconazole, fluconazole, clotrimazole) | PDF 29, 75: ketoconazole and diltiazem inhibit CNI metabolism; "there are drug-drug interactions between fluconazole and CNIs". Text search: no erythromycin, clarithromycin, macrolide, aminoglycoside, vancomycin anywhere | Drop "azoles" ("macrolides, aminoglycosides or vancomycin"), or say "other azoles" |
| 8 | Infection node, App content (Adult UTI) | "the Adult UTI consult's pyelonephritis default is outpatient treatment if tolerating oral intake, not septic, not pregnant, with reliable follow-up" | INACCURATE BY OMISSION | adult-uti.ts: disposition summary says "Outpatient if tolerating PO, no sepsis, not pregnant, reliable follow-up"; the outpatient node says "ALL required" and adds "No significant comorbidities" and "Home support"; the inpatient node lists "Significant comorbidity (diabetes, immunocompromised)" as an admission criterion. Page states both positions and does not tell the clinician to withhold or change the consult (OK) | Add "and no significant comorbidity (the consult lists immunocompromised under admit)" so the line matches the tree |
| 9 | Chronic overlay K332; K343; K257; drugs/nodes K328 | K332 "in febrile neutropenia ... colony-stimulating factors plus antibiotics benefit if pneumonia, fungal infection, hypotension, sepsis syndrome or multisystem failure"; K343 "...it may need parathyroidectomy"; K257 "statin interactions must be monitored"; K328 "reduced doses under 1 week if eGFR above 10" | K332 BROADER (population: the sentence follows the ASCO cancer-literature review, not a recipient trial); K343 QUOTE INEXACT; K257 CLAIM IMPRECISE; K328 LOST SAFETY QUALIFIER | K332 PDF 112; K343 PDF 108 (parathyroidectomy is the next sentence); K257 PDF 87 "although there are drug-drug interactions that must be monitored in KTRs, the use of ... statins is generally safe and effective ... if appropriate dose modification is made for patients treated with CNIs"; K328 PDF 116 "reduced doses for <1 week in patients with eGFR >10 mL/min/1.73 m2 not requiring dialysis" | K332: "cancer-literature guidance cited by KDIGO: ...". K343: extend quote to the parathyroidectomy sentence. K257: "drug-drug interactions must be monitored in recipients; statins are generally safe and effective ... if dose modified for patients on CNIs". K328: add "not requiring dialysis" |
| 10 | Infection summary, CA5, dispo summary, CA6 | "suggest hospitalization and intravenous antibiotics (2C)"; "suggest hospitalization (2C)"; CA6 drops "high-dose"; CA6 gives corticosteroids with no moderate-to-severe condition | LOST SAFETY QUALIFIER ("initial"); LOST QUALIFIER ("high-dose"); PAIRING (K166 without K167 inside the critical action; node body pairs them correctly) | 14.1.2 PDF 72: "we suggest initial hospitalization and treatment with intravenous antibiotics. (2C)". 14.2.3 and 14.2.4 PDF 73 | "suggest initial hospitalization and intravenous antibiotics (2C)"; keep "high-dose" in CA6 (the 23-word wording in section 3 does); optional: CA6 stays as K166 text, the K167 pairing is in the node body |
| 11 | Overlay subtitles and headings | "KDIGO 2009 rows: ..." (all 5 overlay subtitles carry "rows"); headings "Treatment names (no doses)", "Named immunosuppressants and monitoring (no doses)", "Subclinical and borderline rejection (shown together)", "Pneumocystis pneumonia (both corticosteroid statements shown)", "Vaccines (live vaccines shown with the contraindicated table)", "Rifampin and rifabutin (rifabutin shown beside the tacrolimus label)", "Ketoconazole and calcium-channel blockers (shown beside the tacrolimus labels)", "Toxicity table and related rows", "Other drug rows" | BUILD NOTES in bedside text | n/a | Remove "rows" and the parentheticals; plain headings |
| 12 | Parenthetical misapplied or missing | Over-applied: K315 colchicine in drugs overlay and K326 (no immunosuppressant action), K226; inconsistent: K315 has it in the overlay but not in the node; K10/K11 differ between node and overlay. Missing where an immunosuppressant reduction is named: K285 "consider modifying immunosuppression" (chronic overlay), K238 "cut calcineurin inhibitor dose" (drugs overlay) | Compose rule not met | n/a | Remove from K315/K326/K226; add to K285 and K238 |
| 13 | Graded bullets with the verb dropped | K12 antibody-mediated options (node and overlay) "(2C)" with no "suggest"; K78 hyperoxaluria (2C); K142; K145; K149; K213; K344 | Verb lost (weaker, not firmer) | 6.4, 10.x, 13.4.2.1, 13.4.4.1, 13.4.7, 3.x, 21.1 | Restore "suggest" or "recommend" per grade |
| 14 | Rationale worded as imperative | Infection body "allograft pyelonephritis: hospitalize and give intravenous antibiotics ... (rationale)"; dispo and overlay "reduce or withdraw immunosuppression if possible ... (rationale)"; overlay "rule out ..." | Marked "(rationale)" but imperative | K158 PDF 72 "should be hospitalized and be treated"; K183 PDF 65 "should be reduced or withdrawn" | "should be hospitalized and treated ... (rationale)" |
| 15 | Word counts | rejection 30 and vascular 30 (whitespace count) but 31 and 32 if hyphenated words are split; drugs, chronic 30/30 | Limit risk | n/a | Trim 2 words in each if hyphenated words count |
| 16 | Small cite and wording slips | K5 sentence ends on PDF 35 (ledger PDF 34); K42 spans 40-41; K72 drops "at least"; K21 drops "successful" ("after successful treatment"); K259 metformin creatinine 1.5/1.4 mg/dL is a 2009 table (label rule is now eGFR based) | Low | n/a | Ledger/page tidy |
| 17 | Infection body | "...(1C) [1] The two Pneumocystis statements are not reconciled." | Unmarked editor sentence run into the K167 bullet | USE RULES (verification note, not KDIGO text) | Separate bullet: "KDIGO 2009 does not reconcile 14.2.3 and 14.2.4" |
| 18 | Not-in lines | "Not in KDIGO 2009: which antibiotic" (no scope); vascular Nearest (erythrocytosis risk factors, K87) is unrelated to treatment of obstruction or renal artery stenosis | Low | n/a | "which antibiotic for allograft pyelonephritis"; use K89 as the vascular Nearest |
| 19 | Label bullets | "Tacrolimus labels: ... increase the Prograf dose" cites [2,3,4] | Low: Astagraf XL and Envarsus XR say their own product | Astagraf: "Increase ASTAGRAF XL dose"; Envarsus: "Increase ENVARSUS XR dose" | "increase the tacrolimus dose (Prograf label)" |

## 2. Ledger rows: 16 edited and 5 new

Quote string-checked against the PDF text layer, then grade and page checked; images viewed for K16, K25, K257 (PDF 34, 36, 87) and K379 (PDF 22).

| Row | Result | Note |
|---|---|---|
| K16 | OK | PDF 34 S21, exact |
| K25 | OK | PDF 36 S23, "treatments" present |
| K65 | OK | PDF 45, claim cut to the quote |
| K88 | OK quote and page; claim NARROWER | drops "especially" (finding 4) |
| K109 | OK | PDF 57; stays in the must-not-appear-alone list and is not used |
| K144 | OK | PDF 63, 1C treatment, 2D reduction, verb "recommend" |
| K148 | OK | PDF 64 |
| K152 | OK | PDF 64 (text layer joins "lifethreatening") |
| K249 | OK | PDF 74, 1C |
| K257 | OK quote and page; claim IMPRECISE | finding 9 |
| K260 | OK | PDF 82 footnote c |
| K324 | OK | PDF 116; claim correctly cut to the cited reviews |
| K332 | quote OK; BROADER (population) | finding 9 |
| K341 | OK | PDF 113 |
| K343 | QUOTE INEXACT | parathyroidectomy half is not in the quote (finding 9) |
| K373 | OK | PDF 121 |
| K379 | OK | Table 1 image, PDF 22 S9; "including" list true, arrows vary by study (row note says so) |
| K380 | OK | PDF 44 S31 |
| K381 | OK | PDF 51 S38 |
| K382 | OK | PDF 52 S39, Table 11 (education and medical intervention) |
| K383 | OK | PDF 52 S39, Table 11 |

Result: 19 OK, 1 QUOTE INEXACT (K343), 1 BROADER (K332); of the OK rows K88 (narrower claim) and K257 (imprecise claim) need a one-line claim edit. No WRONG GRADE.

## 3. Parenthetical placement (CA6, CA7, infection summary)

How each reads now:
- CA6: "recommend intravenous trimethoprim-sulfamethoxazole, corticosteroids, reduced immunosuppression (1C) (call the transplant team first)". One list, one grade, one parenthetical at the very end. A reader can take it to cover the whole sentence, so the antimicrobial and steroids appear to wait for the transplant team. Highest risk.
- CA7: "recommend intravenous acyclovir (1B) and reduced immunosuppression (1D) (call the transplant team first)". The grade (1D) sits next to the reduction, so most readers attach the parenthetical to it, but nothing rules out reading it as covering the acyclovir. Systemic HSV is called life-threatening and "hospitalization and treatment with intravenous acyclovir is warranted" (K183), so a delay is the wrong thing to imply.
- Infection summary: same HSV sentence, same reading as CA7, and it also follows the pyelonephritis sentence.
- The same end-of-sentence placement appears in node body bullets (K166, dispo K183) and could be tidied the same way.

Proposed wordings (parenthetical sits directly after the immunosuppression clause; word counts by whitespace):
- CA6 (23 words): "KDIGO 2009, kidney recipients: biopsy- or lavage-proven Pneumocystis pneumonia: recommend high-dose intravenous trimethoprim-sulfamethoxazole, corticosteroids, plus reduced immunosuppression (call the transplant team first) (1C)."
- CA7 (19): "KDIGO 2009, kidney recipients: systemic HSV: recommend intravenous acyclovir (1B), plus reduced immunosuppression (call the transplant team first) (1D)."
- Infection summary (28): "KDIGO 2009, kidney recipients: allograft pyelonephritis: suggest initial hospitalization and intravenous antibiotics (2C). Systemic HSV: recommend intravenous acyclovir (1B), plus reduced immunosuppression (call the transplant team first) (1D)."
No new editor claim is added; the parenthetical text is unchanged.

## 4. Summaries (7) and critical actions (10)

Word counts (whitespace; hyphenated terms count as one): summaries 26, 30, 30, 27, 30, 30, 25; bodies 126, 146, 168, 170, 164, 145, 110; dispo recommendation 36; critical actions 13, 20, 14, 16, 12, 24, 19, 12, 13, 17. No summary has quotation marks. All within limits (see finding 15 for the hyphen risk).

| Item | Text (short) | Rows | Class |
|---|---|---|---|
| S hub | "persistent unexplained creatinine rise: exclude ... (rationale); recommend biopsy (1C). Extra immunosuppression may harm if not rejection (rationale)." | K56, K57, K49, K4 | UNCLEAR; grade attribution is clear (own markers); guideline order is recommendation first (finding 3) |
| S vascular | ultrasound (2C) ...; hypertension statement | K38, K84, K88 | WRONG SCOPE (hypertension clause, finding 4); ultrasound clause FAITHFUL |
| S rejection | biopsy before treating (1C) unless it substantially delays treatment; antibodies (2C) | K2, K11 | biopsy clause FAITHFUL; antibody clause BROADER (finding 5) |
| S infection | pyelonephritis (2C); systemic HSV (1B, 1D) | K155, K141 | LOST SAFETY QUALIFIER ("initial"); parenthetical placement (findings 1, 10); HSV grades FAITHFUL |
| S drugs | allopurinol 1B; NSAIDs 2D; rifampin 1C | K316, K317, K249 | FAITHFUL (allopurinol and rifampin exact; NSAID clause omits "and COX-2 inhibitors", narrower) |
| S chronic | BP 2C; diabetes screening 2D | K269, K279 | UNCLEAR (no units); FIRMER ("substantially" lost) (finding 6) |
| S dispo | pyelonephritis hospitalization 2C; HSV warranted (rationale); biopsy 2D | K155, K183, K50 | HSV clause FAITHFUL (K183 PDF 65, rationale); post-treatment biopsy FAITHFUL (9.2, 2D, PDF 43); "initial" lost |
| CA1 | Editor note, shared | EN1 | OK (exact, first) |
| CA2 | Exclude ..., then biopsy (recommend, 1C) | K56, K57, K49 | RATIONALE WORDED AS RECOMMENDATION; WRONG GRADE (finding 2) |
| CA3 | allograft ultrasound (2C) | K38 | FAITHFUL |
| CA4 | biopsy before treating, unless substantially delays (1C) | K2 | FAITHFUL |
| CA5 | pyelonephritis hospitalization and IV antibiotics (2C) | K155 | LOST SAFETY QUALIFIER ("initial") |
| CA6 | Pneumocystis (1C) | K166 | LOST QUALIFIER ("high-dose"); K167 not beside it; parenthetical (finding 1) |
| CA7 | systemic HSV (1B, 1D) | K141 | FAITHFUL; parenthetical (finding 1) |
| CA8 | avoid allopurinol with azathioprine (1B) | K316 | FAITHFUL (exact, PDF 115) |
| CA9 | avoid NSAIDs and COX-2 inhibitors whenever possible (2D) | K317 | FAITHFUL (exact, PDF 115) |
| CA10 | monitor CNI and mTOR inhibitor blood levels with rifampin (1C) | K249 | FAITHFUL (exact, PDF 74) |

Specific checks asked for:
- Hub and CA2: the guideline gives the graded recommendation (9.1, 1C) first and the exclusion as later rationale. The summary keeps a marker on each clause; CA2 does not.
- "Extra immunosuppression may harm if not rejection": source text is in finding 3 (PDF 34 S21).
- Allopurinol (1B, "recommend avoiding allopurinol in patients receiving azathioprine"), NSAID (2D, "suggest avoiding NSAIDs and COX-2 inhibitors whenever possible") and rifampin (1C, "recommend monitoring CNI and mTORi blood levels in patients receiving rifampin") grades and verbs are exact in CA8-CA10.
- Blood pressure target: 2C, adults (>=18 years), <130 mm Hg systolic and <80 mm Hg diastolic; the page drops units.
- Disposition summary: HSV hospitalization is rationale text (K183), marked "(rationale)" with no grade: correct. Post-treatment biopsy: 9.2, "We suggest ... biopsy when serum creatinine has not returned to baseline after treatment of acute rejection (2D)": correct.

## 5. Node bodies and overlays

All 7 node bodies and every overlay line were read against ledger claims, quotes and PDF text. Every body and overlay line (823 text lines checked mechanically) maps to a compose.md entry; the only non-matching strings are titles, option labels and headings. About 330 overlay sentences were compared with their rows, including every sentence with a dose, threshold, grade or drug-plus-action. Grades checked against PDF text for every row with a numeric grade: all match (the only automatic misses were text-layer formatting: K30, K32, K35, K36, K146, K188, K203, K220, K224, K279, K345, all read and confirmed). Mismatches found are findings 3-19 above. Doses: only K328 (0.6 mg/day), K180 (some experts) and K292 (aspirin) appear as dose rows; "high-dose" (K166, K76), the 3 label statements, and thresholds from KDIGO tables (K83, K259, K283, K289, K290) are guideline statements. No file names, line numbers or "searched" notes in bodies; build notes only in headings and subtitles (finding 11).

## 6. USE RULES

- K250 appears once, in the drugs overlay, followed directly by the Tacrolimus labels statement; K238 once, in the drugs overlay, followed by the strong-inhibitor and calcium-channel-blocker label statements. Verified against the XML: Prograf, Astagraf XL, Envarsus XR 7.2 "Strong CYP3A Inducers ... rifampin, rifabutin ... May decrease tacrolimus whole blood trough concentrations and increase the risk of rejection. Increase [product] dose and monitor"; strong inhibitors list ketoconazole, "A rapid, sharp rise in tacrolimus levels may occur early, despite an immediate reduction of tacrolimus dose", "Reduce PROGRAF dose ... Early and frequent monitoring ... within 1-3 days"; Prograf mild/moderate inhibitors "calcium channel blockers (e.g., verapamil, diltiazem, nifedipine, nicardipine) ... Monitor tacrolimus whole blood trough concentrations and reduce PROGRAF dose if needed". All three match the page (finding 19 on product naming).
- K104-K106, K109, K111-K114, K116, K117, K120, K196: not used anywhere (text search of nodes and overlays; the only BK and CMV text is K5, K21, K25, K67, K129, K336, not on the list, and the infection node links to tpe-bk and tpe-cmv).
- Pairings: K91 with K98, adjacent in the vaccines section (OK). K14 with K17 and K18 in one section (OK). K166 with K167 in the infection node body and overlay (OK; absent only inside CA6). K180 keeps "some experts" and "(rationale)", K150 keeps 2D (OK). K144 keeps 1C and 2D (OK).
- Related guidance: BK nephropathy statements in the rejection node and overlay (K5, K21, K25, K67) do not conflict with the 2024 BK consensus, but carry no BK link; optional link to tpe-bk.

## 7. App content lines

- Adult UTI: see finding 8. The page states the KDIGO hospitalization statement (2C) and the consult's outpatient default side by side and does not tell the reader to withhold or change the consult. src files untouched by the draft.
- HIV: "the HIV consult carries a Pneumocystis treatment dose." True: hiv.ts critical action "PJP treatment: TMP-SMX 15-20 mg/kg/day + prednisone" and the pulmonary OI node. The line gives no number and does not tell the reader to withhold anything. It does not say the dose is for HIV.

## 8. Mechanics

- Hub options: infection (critical), vascular (critical), rejection (urgent), drugs (urgent), chronic, disposition. Danger order defensible. Every leaf's next is tpe-kidney-dispo; dispo is a result node with no next. 7 nodes reachable.
- Ids and links: five info ids exist and match the five #/info links; consult links resolve (sepsis-start, k-start, hd-start, hypertensive-emergency-adult-start, uti-pyelonephritis, pna-start, ai-start). Sibling draft nodes exist: tpe-bk, tpe-cmv, tpe-cytopenia (first node of tpe-cytopenia.nodes.ts), tpe-cni-drugs. Citation numbers 1-6 present on the node and overlay citation lists.
- Editor notes: exactly four, all verbatim: "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant." (hub body, critical action 1); "Editor note: disposition is decided with the treating transplant team." (last line of dispo body, end of recommendation). None in overlays. Finding 17 is an unmarked editor sentence, not an "Editor note:".
- Hub body states the 2009 date once ("This guideline dates from 2009."). Every "Not in KDIGO 2009:" line is followed by "Nearest:" and a "Related consults:" line (one defect, finding 7; weak Nearest, finding 18).
- Counts: findings 19 (2 mandatory, 8 should-fix, 9 minor); edited and new rows 21 (19 OK, 1 inexact, 1 broader); 17 summary and critical-action items checked (8 faithful, of which CA7 needs the parenthetical moved; 9 with a defect).
