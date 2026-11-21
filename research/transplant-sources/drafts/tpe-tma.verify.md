# Verification: tpe-tma (Thrombotic microangiopathy on a calcineurin inhibitor)

Checked directly against: six DailyMed SPL XML labels, ISHLT 2023 e64 (rendered image), AASLD/AST 2024 graft complications Q18 and text search, IATDMCT 2019 text search, repo trees. Not checked against evidence packs or review papers.

VERDICT: READY AFTER LISTED FIXES. All quotations are verbatim and correctly attributed to product. The main risk the brief names is real in one place: the label's "resolution has occurred ... plasmapheresis" sentence is quoted in the links node without its own qualifier, directly under an app line that says "Stop the drug".

## 1. Findings, ranked

| # | Where | Sentence | Class | Source / locator | Fix |
|---|---|---|---|---|---|
| 1 | tpe-tma-links body, bullet 3 | "cyclosporine, resolution 'has occurred after reduction or discontinuation of cyclosporine and 1) administration of streptokinase and heparin or 2) plasmapheresis'" | DESCRIPTION PRESENTED AS ADVICE + FIRMER THAN SOURCE (qualifier cut): names streptokinase, heparin and plasmapheresis, sits directly under "Stop the drug" and "open TTP"; drops the rest of the sentence | Neoral/Gengraf (Sandimmune: "of Sandimmune") Warnings, Thrombotic Microangiopathy: "Though resolution has occurred after reduction or discontinuation of cyclosporine and 1) administration of streptokinase and heparin or 2) plasmapheresis, this appears to depend upon early detection with Indium 111 labeled platelet scans" | Delete the bullet (tpe-tma-labels and the overlay carry the full sentence), or quote the complete sentence including "this appears to depend upon early detection with Indium 111 labeled platelet scans". |
| 2 | tpe-tma-links body bullet 2 and node summary | App: "Drug-induced TMA: quinine, clopidogrel or ticlopidine, gemcitabine, calcineurin inhibitors. Stop the drug." and summary "...says 'Stop the drug'; tacrolimus labels say 'consider tacrolimus as a risk factor'" | DESCRIPTION/CONFLICT (not a source claim): a quoted instruction to stop a calcineurin inhibitor on a page whose only instruction is to call the transplant team; the summary pairs it with the softer label so the page appears to adjudicate. Text is exact; context missing. | hemolytic-anemia.ts line 70 (node hemolytic-anemia-tma), also line 41 ("Stop the suspect drug"). Searched: the consult's only transplant-related words are these two calcineurin-inhibitor mentions; ledger records no transplant guidance. | Append to the App-content bullet: "This is the general Hemolytic Anemia consult; it has no transplant-specific text (searched) and no source read here addresses stopping a calcineurin inhibitor for TMA." Both statements are checked absences. Alternatively drop the quote from the summary. |
| 3 | tpe-tma summary (entry; drug card) | Cyclosporine labels: "Neither the pathogenesis nor the management of this syndrome is clear." | SUPPORTED but context-stripped: "this syndrome" has no antecedent alone; label's antecedent is "a syndrome of thrombocytopenia and microangiopathic hemolytic anemia which may result in graft failure" ("Occasionally patients have developed") | Same heading | "Cyclosporine labels, of a syndrome of thrombocytopenia and microangiopathic hemolytic anemia: 'Neither the pathogenesis nor the management of this syndrome is clear.'" Applies to CA2 and the recommendation as well. |
| 4 | tpe-tma-links body bullet 4 | App: PLASMIC row "Stem cell/solid organ transplant | No transplant history | 1" | UNSUPPORTED implication: presented without saying no source read says how the row applies to a recipient (ledger says so; page does not) | ttp.ts line 91 (node ttp-plasmic) exact | Add "(general consult; no source read here says how this row applies to a recipient)", or drop. |
| 5 | tpe-tma-labels summary | "resolution has occurred after reduction or discontinuation plus other treatments" | SUPPORTED, minor: label gives alternatives, 1) streptokinase and heparin OR 2) plasmapheresis; "plus other treatments" is fair; qualifier "this appears to depend upon early detection" is kept in the same summary. | | none |
| 6 | overlay, Liver guideline section | AASLD/AST Q18 AMR statement, "(Strong, Level 3)" | SUPPORTED (grade printed after the two sentences, correct); scope-risk: "unexplained graft dysfunction, thrombocytopenia, and hypocomplementemia" can be read as a TMA recognition rule although the guideline never mentions TMA (0 hits for TMA/thrombotic/microangio in 0715 and 0785). Labelled as AMR on the page. Liver recipients only. | LVT0715 Question 18, Guideline statements | Keep only if the heading says "liver recipients, antibody-mediated rejection, not TMA"; my view: delete, it adds a recognition-looking sentence with no TMA link. |
| 7 | overlay, tacrolimus 17.9 | counselling symptom list "fever, petequiae or bruises, fatigue, confusion, jaundice, oliguria" | SUPPORTED; labelled counselling. Could be read as a diagnostic symptom list. | Prograf 17.9, Astagraf XL 17.9, Envarsus XR 17.9 | Keep; heading already says patient counselling. |
| 8 | links Editor note | "TTP for the microangiopathy work-up, Thrombocytopenia for low platelets, Hemolytic anemia for hemolysis" | EDITOR NOTE: navigational; PASS | | |

No WRONG PRODUCT, WRONG GRADE or WRONG POPULATION found. Entry summary read alone: both label sentences are exact; "No source read here gives a treatment protocol" is true; the only fault is finding 3.

## 2. Product-by-product (TMA)

| | TMA |
|---|---|
| Prograf 5.16 | "Cases of thrombotic microangiopathy (TMA), including HUS and TTP, have been reported in patients treated with PROGRAF. TMA may have a multifactorial etiology. Risk factors ... include, for example, severe infections, GVHD, HLA mismatch, the use of calcineurin inhibitors and mTOR inhibitors ... either alone or combined." Action: "In patients with signs and symptoms of TMA, consider tacrolimus as a risk factor. Concurrent use of tacrolimus and mTOR inhibitors may contribute to the risk of TMA." No resolution or management statement. 5.10: "The use of sirolimus with PROGRAF may increase the risk of thrombotic microangiopathy." Highlights: "May occur, especially in patients with infections and certain concomitant medications." 17.9 counselling. |
| Astagraf XL 5.14 | Identical paragraph; no sirolimus section (only 5.14 sentence + 17.9) |
| Envarsus XR 5.14 | Identical but "consider ENVARSUS XR as a risk factor" / "of ENVARSUS XR and mTOR inhibitors"; cross-refs print 5.13 |
| Neoral, Gengraf, Sandimmune | Warnings: "Occasionally patients have developed a syndrome of thrombocytopenia and microangiopathic hemolytic anemia which may result in graft failure ... Neither the pathogenesis nor the management of this syndrome is clear. Though resolution has occurred after ... this appears to depend upon early detection with Indium 111 labeled platelet scans." No risk-factor list. Adverse Reactions: glomerular capillary thrombosis "resembled" HUS (Sandimmune present tense). |
Attribution on the page is right: "Prograf only" for 5.10 is correct (Astagraf XL and Envarsus XR print no such section); Envarsus wording noted in the entry body; cyclosporine statements attributed to cyclosporine labels only; Sandimmune product-name variant noted in overlay. ISHLT TMA sentence labelled heart, ungraded.

## 3. ISHLT (TMA-relevant)

e64 narrative (image read): "Headache, tremor, seizure, thrombotic microangiopathies (TMA), and posterior reversible encephalopathy syndrome (PRES) occur following heart transplantation and have been associated with CNI therapy and hypertension.[474,475] Some of these symptoms may improve with lowering of CNI dose." Ungraded, no recommendation. TMA appears only here in the body (pypdf: pages 64 and the reference list p.129). Node bullet quotes the first sentence with "heart recipients, ungraded"; the overlay quotes the second and notes it does not say which symptoms improve. Fair.

## 4. App content (confirmed)

- hemolytic-anemia.ts line 70, node hemolytic-anemia-tma: "**Drug-induced TMA:** quinine, clopidogrel or ticlopidine, gemcitabine, calcineurin inhibitors. Stop the drug." OK. Line 41, node hemolytic-anemia-danger: "...calcineurin inhibitors (drug-induced TMA) ... Stop the suspect drug." OK.
- ttp.ts line 91, node ttp-plasmic: table row "| **S**tem cell/solid organ transplant | No transplant history | 1 |" OK.
- Link targets: tree ttp, thrombocytopenia, hemolytic-anemia (node hemolytic-anemia-tma) exist; tpe-cni-toxicity (src 513), tpe-pres (placeholder at 687, replaced by sibling page), tpe-cni-hypertension exist; info id tpe-tma-detail in drafts. src placeholder tpe-tma (line 694, "[NOT WRITTEN]") is replaced.

## 5. Overlap

Already in src: tpe-cni-detail overlay row 154 carries tacrolimus TMA label sentences, risk factors, "consider tacrolimus as a risk factor", cyclosporine syndrome, "Neither ...", resolution sentence (paraphrased WITH the "appears to depend upon early detection" qualifier), and the heart narrative; tpe-cni-toxicity body line 519 names TMA with the "consider ... risk factor" quote; heart chronic node line 150 says CNI acute toxicities include "sometimes thrombotic microangiopathy".
New here: Prograf 5.10 sirolimus; Highlights wording; 17.9 counselling; glomerular capillary thrombosis (cyclosporine Adverse Reactions); the AMR statement; app-consult links (Hemolytic Anemia "Stop the drug", PLASMIC row, TTP, Thrombocytopenia); dedicated drug-card landing and disposition node.
Disagreement: the links node (finding 1) drops the qualifier the existing overlay row keeps. Otherwise identical wording.
Stand-alone view: thin but defensible as the TMA landing for two drug cards; the clinical content is almost entirely a re-statement. Its real value is the app cross-links, which carry the findings above.

## 6. Statement of what the sources do not provide

"No source read here gives a treatment protocol for transplant-associated TMA." True: labels describe "has occurred" only; ISHLT one narrative sentence; AASLD 0715/0785 and IATDMCT have no TMA, thrombotic or microangio text (searched raw HTML). Appears in entry body, entry summary and the result recommendation (3 places, as intended). Not in the labels node (fine).

## 7. Mechanics

Words: tpe-tma body 107, summary 37; tpe-tma-labels body 123, summary 35; tpe-tma-links body 116, summary 24, recommendation 47. Action/answer in first two lines: yes (entry bullet 1). Critical actions ~22, 13, 14 words (limit 25); CAs 1 and 2 are label sentences, not actions (author's design; says so honestly). "Editor note: call the transplant team ..." exactly once in the entry body and once as CA3 (file count 2). Final node body and recommendation end "Editor note: disposition is decided with the treating transplant team." outside bold, nothing after. No "dreaded". No doses; no plasma-exchange advice in any node except the quoted label sentence (finding 1).
