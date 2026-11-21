# Antimetabolites card group report (CellCept, Myfortic, Imuran)

File: src/data/transplant-drugs/drugs/antimetabolites.ts (exports DRUGS, CLASSES, SOURCES). Labels saved in research/transplant-sources/dailymed/: cellcept_37241e87.xml, myfortic_eed26501.xml, imuran_4d62b6e4.xml (Legacy Pharma; chosen), imuran-sebela_606101a0.xml (Sebela, older SPL 2025-11-08, label text "Revised 07/2024"; read, same content apart from typography; not cited).

| Card | setid | SPL effective | Label "Revised" | Organs | Boxed (label order) | Rows | Longest line | Badge |
|---|---|---|---|---|---|---|---|---|
| mycophenolate-mofetil | 37241e87-4af4-4dc3-a1aa-ea6f20d8dc40 | 2026-08-05 | 7/2026 (Medication Guide line) | kidney, heart, liver | embryofetal toxicity (first trimester loss, malformations); lymphoma/malignancy; serious infections | 3 (malignancy r1, infection r2, pancreatitis pm) | 200 | none |
| mycophenolic-acid | eed26501-890d-4ff6-88e7-6dbea4726e53 | 2026-07-29 | 07/2026 | kidney | embryofetal toxicity; malignancies; serious infections; (admin) who prescribes | 3 | 197 | none |
| azathioprine | 4d62b6e4-a9d4-4818-e063-6394a90aa208 | 2026-03-19 | "Revised 09/2026" (text is later than SPL date) | kidney (RA is also indicated; not an organ) | malignancy (post-transplant lymphoma; HSTCL in IBD); also names mutagenic potential and hematologic toxicities | 4 | 200 | 45 chars |

Non-interaction also-on-label lines: MMF 11, MPA 12, AZA 10. Interaction lines: MMF 8, MPA 10, AZA 7. Mechanisms 111/107/109 chars; class mechanism 68.

## Filing, abbreviations, categories
- Class tx-antimetabolite (in file CLASSES): only infection and malignancy, which all three labels warn. Box flags/ranks are per drug (Imuran's box has no infection hazard). Per-drug mechanisms (label wording differs).
- Editor abbreviations proposed: MMF (CellCept), MPA and MPS (Myfortic), AZA (Imuran). MPA is also the label's name for the active metabolite of CellCept; owner decides whether it pins to Myfortic. "mycophenolate" is an alias on both with unpinnedNames on CellCept.
- Existing categories used: tx-serious-infection and tx-malignancy (all three); drug-pancreatitis (page is drug-induced pancreatitis; CellCept postmarketing basis because "pancreatitis" appears only in 6.2 (full-label grep); Myfortic and Imuran not flagged: Myfortic lists it in 6.1 additional reactions, Imuran in Adverse Reactions/Gastrointestinal); drug-hepatotoxicity (Imuran liver injury; page hepatitis-start). Rejected: the odse-tox-route-* pages (about targeted/biologic oncology drugs), chemo-myelosuppression (febrile neutropenia in cancer), drug-severe-skin (SJS/TEN, not DRESS/Sweet).
## PROPOSED categories (lines wait in alsoOnLabel)
1. tx-cytopenia "Low blood counts": page about neutropenia, anemia, thrombocytopenia, marrow suppression, TPMT/NUDT15 on a transplant immunosuppressant; tier 2 (1 if the page leads with neutropenic fever); complaints fever, fatigue-hypotension, bleeding-bruising. Waiting: MMF neutropenia, MPA blood dyscrasias, AZA low blood counts and TPMT/NUDT15, AZA boxed hematologic.
2. tx-embryofetal "Pregnancy loss and birth defects": positive pregnancy test or exposure on mycophenolate; tier 3; no existing complaint (new complaint "possible pregnancy" needed). Waiting: boxed embryofetal items (MMF, MPA); AZA pregnancy line.
3. tx-gi-bleeding-perforation "GI bleeding, ulcer and perforation": tier 1; complaints diarrhea-abdominal-pain, fatigue-hypotension, bleeding-bruising. Waiting: MMF and MPA GI lines.
4. tx-pure-red-cell-aplasia (or fold into tx-cytopenia); tier 3; fatigue-hypotension. Waiting: MMF, MPA PRCA lines.
5. tx-acute-inflammatory-syndrome: tier 3; fever, weakness. Waiting: MMF, MPA AIS lines.
6. drug-dress (DRESS and Sweet syndrome): tier 2; rash-skin, fever. Waiting: AZA line.
7. tx-hypersensitivity (angioedema/anaphylaxis, GI hypersensitivity): tier 1-2; rash-skin, dyspnea-cough. Waiting: MMF, MPA hypersensitivity; AZA GI hypersensitivity.
8. Hepatic veno-occlusive disease (AZA, rare): own line only; no category proposed.

## Registration lines for the integrator
- drugs/index.ts: `import * as antimetabolites from './antimetabolites.js';` and `'antimetabolites.ts': antimetabolites,` in TX_GROUPS.
- index.ts TX_CONSULT.classSections: add `'tx-antimetabolite': 'Maintenance'`.
- The group also exports a default object (unused).

## Disagreements between labels
- Boxed infection: boxed in CellCept and Myfortic, NOT in Imuran (Imuran warns it in Warnings only). Malignancy boxed in all three. Handled with per-drug boxed/rank overrides on class effects.
- Embryofetal: CellCept box says "first trimester pregnancy loss"; Myfortic box says "pregnancy loss" (first trimester in W&P). Quoted per label. Imuran: Pregnancy Category D in Warnings, not boxed.
- Myfortic is kidney-only (adults, and pediatric 5+ y and 6+ months post-transplant); CellCept kidney, heart, liver; Imuran renal plus RA.
- Interaction advice differs: Myfortic says do not give with cholestyramine/charcoal, sevelamer, azathioprine, norfloxacin+metronidazole, rifampin (unless benefit outweighs); CellCept says monitor/separate by 2 hours. Not unified.

## Deviations from the six interaction heads (owner/integrator decision)
Used extra heads where none of the six fits and the label states a myelotoxicity or caution, not a level: "Adds marrow risk:" (AZA: co-trimoxazole, ACE inhibitors, ribavirin); "Use with caution:" (AZA: aminosalicylates, label says only caution and in vitro TPMT inhibition); "Lowers the other drug:" (CellCept/Myfortic contraceptives, AZA warfarin anticoagulant effect). If only the six may be used, move these to non-interaction lines.

## Interaction block as written
See the file (contiguous at the end of each alsoOnLabel; MMF 8, MPA 10, AZA 7 lines). Order: Raises level, Lowers level, [Use with caution], [Adds marrow risk], Raises the other drug, [Lowers the other drug], Avoid together.

## Figures and timing left off rows (rules 3, 4)
- MMF/MPA/AZA row lines carry no figures. Incidence figures left out: CellCept PTLD 0.4% to 1%, non-melanoma skin 1.6% to 4.2%, other malignancy 0.7% to 2.1%, CMV viremia 13.5%, fatal infection about 2% (kidney, heart) and 5% (liver), severe neutropenia up to 2%, 2.8%, 3.6% (3 g daily); Myfortic lymphoma 1% de novo and 1% conversion, CMV disease 5% vs 4%; Imuran lymphoma 0.5%, other neoplasia 2.8%, infections 20% (renal) vs under 1% (RA), leukopenia over 50% vs 28%; RA lymphoproliferative 1.8 vs 0.8 per 1000 patient-years.
- Timing not used: CellCept/MPA neutropenia "most frequently 31 to 180 days post-transplant" (row waits on category); AIS "weeks to months" (no figure); AIS "improves 24 to 48 hours after stopping" (dropped from the line for length); Imuran GI hypersensitivity "first several weeks"; hypersensitivity "within hours to next day"; Imuran hepatotoxicity "within 6 months" IS used as the row badge ("Most often within 6 months of transplantation").
- Trial death tallies: none in these labels as one-line deaths; fatal infection percentages above.

## Label content held for the overlay
- CellCept pregnancy registry figures: malformations in 23 to 27% of live births, first trimester loss 45 to 49% (8.1). Myfortic same figures.
- CellCept/Myfortic ANC thresholds (ANC below 1.3 x 10^3) are used on the neutropenia lines as the label's action trigger; Myfortic overdose text uses ANC below 1.5 x 10^3/mcL for interrupting (not on the card).
- CellCept 6.2 postmarketing items not carded: venous thrombosis with IV use, colitis, bone marrow failure, hypogammaglobulinemia, meningitis, endocarditis, tuberculosis, atypical mycobacterial infection, lymphocele. Myfortic: agranulocytosis, osteomyelitis, lymphopenia, peritonitis, Kaposi's sarcoma, pulmonary edema, wheezing, dry mouth, gastritis, anorexia, alopecia. Nonmelanoma skin carcinoma "12% conversion" in Myfortic 6.1 reads as printed (possible label typo).
- Imuran: renal homograft survival statement (35% to 55% 5-year patient survival), CBC monitoring schedule, dosage and TPMT genotype percentages. No forced-emesis or lavage content in any of the three labels.

## "Not in the label" claims (full-text searches of all sections, boxed to references)
- CellCept: pancreatitis only in 6.2 (hence postmarketing flag). Imuran: no anaphylaxis wording, no pancreatitis outside Adverse Reactions/Gastrointestinal, no hyperkalemia, diabetes, QT or seizure text. Myfortic: pancreatitis only in 6.1 additional reactions, not in 6.2; no QT. None of the three labels mentions hyperkalemia as a warning (Myfortic and CellCept list it only in trial tables below the warning level and it is not carded). Imuran label has no stated avoid-together interaction except febuxostat; no Pharmacy/dose figures on cards.

## Tempted to write that the label does not support
- "Aminosalicylates raise azathioprine toxicity" (label says only in vitro TPMT inhibition and caution); "MMF causes neutropenic fever" (not stated); that Imuran box lists infection; that Imuran carries a transplant-specific HSTCL warning (box says IBD); a mechanism for azathioprine beyond "somewhat obscure"; who decides on stopping (rule 8).


# FINAL FIX ROUND (2026-11-20)
Verifier findings: 1 DONE (tx-cytopenia rows on all three; Imuran boxed rank 2), 2 DONE (graft-risk clause on MMF, MPA, AZA infection rows), 3 DONE, 4 DONE (AIS: "discontinue and consider alternatives"; whole-sentence quote dropped for length, wording preserved), 5 DONE, 6 DONE (pregnancy-on-treatment line, donation line), 7 DONE, 8 DONE ("could theoretically"), 9 DONE (interactions in own array), 10 DONE (comment fixed; HSTCL line now box text only), 11 DONE (MMF/MPA "Other infections" lines), 12 DONE, 13 DONE (DRESS and Sweet split), 14 DONE, 15 DONE ("may"), 16 DONE, 17 DONE (top three: pregnancy, not interchangeable, IV use / AIS), 18 DONE (plain mechanisms), 19 DONE (badge only on CellCept neutropenia row).
Also: GI bleeding rows tx-gi-bleed, perforation rows drug-gi-perforation, anaphylaxis tx-infusion-anaphylaxis, angioedema tx-angioedema (MMF and MPA); no postmarketing flag on those. Imuran source shows no revision date. MPA is an unpinned editor alias on both cards; MPS on Myfortic; AZA on Imuran.
Anaphylaxis/angioedema "within hours to the next day" has no digit, and shortTiming in src/data/onc-drugs/index.ts still requires one, so no badge was added.
Plain lines (no category): embryofetal toxicity (boxed list only), pure red cell aplasia, acute inflammatory syndrome, DRESS, Sweet syndrome, TPMT/NUDT15, GI hypersensitivity, hepatic VOD, pregnancy, mutagenic potential, HSTCL (boxed list), aminosalicylates (interaction, last).
Registration lines unchanged.

# RE-VERIFICATION FIXES (defects 1-7 and finding 18): all DONE
AIS lines now "label says discontinue and consider alternatives based on risk and benefit" (the "weeks to months" onset clause was dropped for length); Imuran cytopenia row carries the leukocyte trigger and a separate "Counts in rejection" line carries the rejecting-homograft statement; Myfortic and Imuran pancreatitis are plain lines (Myfortic's PRCA-supervision line was merged into the PRCA line, "change under supervision", to stay at 12); pregnancy lines name "females of reproductive potential"; CellCept gains the cyclosporine (30 to 50% greater MPA exposure without it, kidney transplant patients) and norfloxacin plus metronidazole (33%, 11 healthy volunteers, label gives no action) lines; Myfortic tubular-secretion lines say "more so in renal impairment"; first-three orders fixed; mechanisms "it slows lymphocyte growth" and "converted to 6-mercaptopurine".
