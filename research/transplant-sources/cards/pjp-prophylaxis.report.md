# PJP prophylaxis group report, fix round (file: src/data/transplant-drugs/drugs/pjp-prophylaxis.ts)

Labels (research/transplant-sources/dailymed/): bactrim_f59d0c04, mepron_b426b6bf, dapsone-sun_cb312185, pentam_cc2b635e, nebupent_e2ad9d3c. Metadata (setid, labeler, SPL date, revised text) is as verified in pjp-prophylaxis.verify.md. Corrections to my first report: Bactrim DOES name transplant ("renal transplant recipients" with cyclosporine; "lung transplantation" as an outcome); the dapsone label DOES mention Pneumocystis (the 78-patient HIV study). No label INDICATION names an organ, so `cancers` stays [].

## Verifier findings
1 DONE dapsone overdose is one line with the label's qualifier and G6PD caveat. 2 DONE three trimethoprim lines (1.5-fold study; 78 HIV patients with acute Pneumocystis pneumonia, +40% and +48%; 8 HIV volunteers, no significant interaction). 3 DONE confusion/hallucinations now its own line at 1.7% (n=424); the under-1% line says "confusion" only. 4 DONE "Injection compatibility:" plain line in alsoOnLabel, not an interaction. 5 DONE rows added (see below). 6 DONE anaphylaxis row; embryofetal, folate, porphyria/hypothyroidism, methemoglobinemia, creatinine assay, pancreatitis/rhabdomyolysis/TTP/aseptic meningitis/convulsions/metabolic acidosis lines. Held (not carded): AIDS-population rash/fever/leukopenia statement, elderly "most frequent severe reactions", methotrexate-assay interference. 7 DONE hyperkalemia row restores the PJP-dose and underlying-disorder qualifiers and attributes stopping to the label. 8 DONE split into folate line and porphyria line. 9 DONE TCA plain line last; zidovudine now "Adds marrow risk:". 10 DONE indinavir plain line; mechanism plain. 11 DONE neuropathy "in non-leprosy patients"; folate-antagonist and other-hemolytic-agent plain lines last in interactions. 12 DONE pyrimethamine has no figure ("as malaria prophylaxis"); class mechanism no longer says treat and prevent "in immunosuppressed". 13 DONE inhaled postmarketing line, injection tests line, leukopenia/thrombocytopenia/liver-test lines (one figure each, n=424), inhaled statements first. 14 nothing material.
DISAGREE (one): pentamidine hypotension timing. Label: "sudden, severe hypotension after a single dose ... whether given IV or IM". "After a single dose" has no digit or time unit, so no timing is used.

## Per-card measurements (self-check; every effect id is ALLOWED in TAXONOMY.md; zero lines over 200; tsc --noEmit clean)
- TMP-SMX: rows 10 (drug-severe-skin, drug-hepatotoxicity, tx-cytopenia, tx-infusion-anaphylaxis, tx-shock [timing], tx-hyperkalemia, tx-qt-prolongation, tx-hemolysis, tx-hypoglycemia [timing], tx-hyponatremia; none postmarketing, no ranks). Interactions 18: Adds marrow risk 1, Adds potassium risk 1, Raises the other drug 5, Avoid together 10, plain 1 (tricyclics). Rest 12; first three: Respiratory failure / HLH / Kidney injury. Longest 198, mechanism 86.
- Atovaquone: rows 4 (skin #1, liver #2, tx-methemoglobinemia, drug-pancreatitis postmarketing). Interactions 5: Lowers level 4, plain 1 (indinavir). Rest 8; longest 180; mechanism 77. Methemoglobinemia is NOT flagged postmarketing because it also appears in Overdosage; skin and liver are ranked above it.
- Dapsone: rows 5 ranked in label order (tx-cytopenia, tx-hemolysis, tx-methemoglobinemia, severe skin, liver); list-only pancreatitis is demoted into the "Other adverse reactions" line. Interactions 6: Raises level 3, Lowers level 1, plain 2 (folate antagonists, other hemolytic agents). Rest 7; first three: Peripheral neuropathy / Overdose / Severe anemia. Longest 199; mechanism 97.
- Pentamidine: rows 4 (tx-shock injection, tx-qt-prolongation postmarketing torsades only, tx-hypoglycemia injection, drug-pancreatitis both). Interactions 1 (Avoid together). Rest 18 (over 12: every warned event kept plus the requested figure lines; first three are inhaled: breakthrough PJP / bronchospasm / systemic effects; injection statements follow; each attributed to Pentam or NebuPent). Longest 195; mechanism 98.

## Avoid together lines, TMP-SMX (verbatim)
- Avoid together: dofetilide; the label says concurrent use is contraindicated; trimethoprim raises dofetilide levels with serious ventricular arrhythmias including torsades de pointes
- Avoid together: cyclosporine in renal transplant recipients: marked but reversible nephrotoxicity reported
- Avoid together: methotrexate; sulfonamides can displace it from plasma protein and compete for its renal transport, raising free methotrexate
- Avoid together: indomethacin; sulfamethoxazole blood levels may rise
- Avoid together: ACE inhibitors; three cases of hyperkalemia in elderly patients reported in the literature
- Avoid together: diuretics, primarily thiazides; thrombocytopenia with purpura was more frequent in elderly patients
- Avoid together: pyrimethamine as malaria prophylaxis; megaloblastic anemia occasionally reported
- Avoid together: amantadine; one case of toxic delirium reported, and cases with memantine and metformin, other OCT2 substrates
- Avoid together: leucovorin during treatment of PJP; treatment failure and excess mortality in HIV-positive patients in a randomized trial
- Avoid together: substrates of CYP2C8, CYP2C9 or OCT2; trimethoprim inhibits CYP2C8 and OCT2 and sulfamethoxazole inhibits CYP2C9

## Dapsone overdose line (verbatim)
Overdose: methylene blue is treatment of choice for methemoglobin depression, convulsions or cyanosis in normal and methemoglobin reductase deficient patients; not for fully expressed G6PD deficiency
(The label's wording is "Methemoglobin induced depression, convulsions or severe cyanosis requires prompt treatment ... methylene blue ... is the treatment of choice"; I dropped "severe" and "the" only to fit 200 characters.)

## Timings used
- TMP-SMX shock: "Minutes to hours after re-challenge, in patients with recent (days to weeks) exposure to sulfamethoxazole and trimethoprim products." Label: "within minutes to hours of re-challenge ... in patients with history of recent (days to weeks) exposure".
- TMP-SMX hypoglycemia: "Usually after a few days of therapy, in the rare cases seen in non-diabetic patients." Label: "seen rarely, usually occurring after a few days of therapy" (non-diabetic).
- Left off (not the row's whole hazard): respiratory failure (plain line), thrombocytopenia resolution within a week, CDAD over two months, dapsone hepatitis "early in therapy", pentamidine hyperglycemia/diabetes "several months after therapy", pentamidine hypotension (no digit or unit).

## Hazards that stayed plain lines (no usable category)
TMP-SMX respiratory failure, HLH, kidney injury, embryofetal toxicity, folate, porphyria/hypothyroidism, C. difficile, methemoglobinemia (list-only), pancreatitis (list-only); atovaquone hypersensitivity/bronchospasm, thrombocytopenia, renal impairment; dapsone neuropathy, anemia; pentamidine inhaled bronchospasm, injection kidney injury, extravasation, arrhythmia, leukopenia, thrombocytopenia, liver tests, anaphylaxis (NebuPent, kept in contraindications and postmarketing lines).

## Held for the overlay (exact label sentences)
Bactrim: "General principles of treatment include the institution of gastric lavage or emesis, forcing oral fluids ..." and "Acidification of the urine will increase renal elimination of trimethoprim." Dapsone: "For non-emergencies, if treating is needed, methylene blue may be given orally in doses of 3 to 5 mg/kg every 4 to 6 hours" (dose) and the FDA Dermatology Advisory Committee blood-count schedule. NebuPent: "DO NOT MIX THE NEBUPENT SOLUTION WITH ANY OTHER DRUGS. DO NOT USE THE RESPIRGARD II NEBULIZER TO ADMINISTER A BRONCHODILATOR."

## Registration lines for the integrator
- drugs/index.ts: `import * as pjpProphylaxis from './pjp-prophylaxis.js';` and `'pjp-prophylaxis.ts': pjpProphylaxis,`
- index.ts classSections: `'tx-pjp-smx-tmp': 'Prophylaxis', 'tx-pjp-atovaquone': 'Prophylaxis', 'tx-pjp-dapsone': 'Prophylaxis', 'tx-pjp-pentamidine': 'Prophylaxis'`
- Sources and classes are exported from the group file. TMP-SMX: pin false, pharmacyDrugId 'tmp-smx'. Run the pin-collision gate for "atovaquone" (atovaquone-proguanil exists in Pharmacy).
- Page note for the owner: tx-methemoglobinemia targets methb-g6pd (verifier: the methb-start caption gives a methylene blue dose with no G6PD caveat); tx-cytopenia page tpe-cytopenia is not written yet.
- Editor abbreviations proposed (TMP-SMX only): TMP-SMX, SMX-TMP, TMP/SMX, SMX/TMP, co-trimoxazole; dapsone alias DDS is label-printed.

## Last-corrections round (re-verification D1-D7)
D1 done (dapsone overdose = two lines: "Overdose: methylene blue given slowly IV is the treatment of choice for methemoglobin-induced depression, convulsions or severe cyanosis in normal and methemoglobin reductase deficient patients" and "Methylene blue: reduction depends on G6PD; the label says it should not be given to fully expressed G6PD deficient patients"). D3 done (timing first clause "Non-diabetic cases: usually after a few days"). D4 done. D5 done (ranks 1-3; pyrimethamine "at higher weekly prophylaxis doses for malaria"). D6 done (atovaquone rows: skin, liver only; methemoglobinemia and pancreatitis in one "Reported after approval" line; hypersensitivity before overdose). D7 done (Adds kidney risk with the label's "closely monitored and avoided, if possible"; torsades folded into injection arrhythmia; 12 lines). TMP-SMX held statements (AIDS, elderly, lab assays) added. D2 is the engine's. Final: TMP-SMX 9 rows/13 rest (all warned events kept; one over 12); atovaquone 2 rows/8; dapsone 5 rows/8; pentamidine 3 rows/12.
