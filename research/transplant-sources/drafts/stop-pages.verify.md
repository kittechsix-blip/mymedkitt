# Stop pages verification (read-only check, 2026-11-21)

Primary sources opened: DailyMed XML (Prograf, Astagraf, Envarsus, Neoral, Gengraf, Sandimmune, Zortress, sirolimus, Vfend, Noxafil, Solu-Medrol, Medrol, dapsone, Bactrim, CellCept, Myfortic, Nulojix, Thymoglobulin, Atgam), KDIGO 2009 PDF p.115-116, ISHLT 2023 PDF p.96, TTS CMV 2025, TTS BK 2024, AASLD/AST graft-complications Q16.

## A. transplant-patient-ed-stop
| # | Class | Fix |
|---|---|---|
| A1 | BROADER (ISHLT sentence is heart recipients, intercurrent-surgery section; heading generalised and not verbatim editor note) | Scope heading "...in a heart recipient (ISHLT 2023, I C)"; keep both approved notes verbatim in body |
| A2 | FIRMER THAN SOURCE (source: "will not respond to atropine", a prediction; ISHLT p.96) | Drop, or heading as fact: "Atropine will not treat a relative, symptomatic bradycardia in a heart recipient" |
| A3 | FAITHFUL (Neoral/Gengraf/Sandimmune "should not be used"; Prograf differs, stated) | none |
| A4 | FAITHFUL (Prograf 2.1 "should not be used simultaneously with cyclosporine") | none |
| A5 | Heading FAITHFUL (3 cyclosporine labels "should be avoided in patients in whom gingival hyperplasia develops"); body BROADER | Say "none of the six tacrolimus and cyclosporine labels read says to avoid nicardipine, verapamil or diltiazem" (they list them as level-raising) |
| A6 | SOURCES DIFFER | Drop (see ruling) |
| A7 | FAITHFUL (CMV 2025: "Oral ganciclovir, acyclovir, or valacyclovir are not recommended for the treatment of CMV disease (strong, moderate)") | none |
| A8 | BROADER (culture "not recommended" is for blood, urine, stool, oral secretions only; guideline: tissue biopsy culture/QNAT "may augment sensitivity"; serology "no role in diagnosis of active CMV replication") | Heading: "Do NOT use viral culture of blood, urine, stool or oral secretions to diagnose CMV; serology has no role in diagnosing active CMV" |
| A9 | FAITHFUL; scope slightly lost (all four statements are "in kidney transplant recipients") | Add "kidney recipients" to heading; keep "other indications not addressed" |
| A10 | BROADER risk (Q16 is peripheral blood biomarkers compared with biopsy; reads as "normal liver tests") | Heading: "Do NOT use peripheral blood biomarkers developed as a noninvasive alternative to biopsy, alone, to diagnose or exclude rejection in an adult liver recipient" |

A6 ruling: breaks rule 3. tpe-cytopenia-differ lists it under "Where the sources differ"; KDIGO 1B "recommend avoiding" but its own text says "extreme caution, or not at all; if used together reduce azathioprine by at least 50%"; Imuran label says reduce the dose. Cannot be restated as a non-prohibition on a Do NOT page: drop.
A2 ruling: prediction/descriptive fact, not avoid/should-not wording; "Do NOT count on" is invented. Drop or fact-form heading above.

## B. transplant-drug-side-effects-stop
| # | Class | Fix |
|---|---|---|
| B1 | FAITHFUL (Vfend contraindications list sirolimus; sirolimus label "Avoid ... voriconazole") | "11-fold" is AUC (Cmax 7-fold): say AUC |
| B2 | FAITHFUL (Noxafil 4.2 "contraindicated with sirolimus", ~9-fold; sirolimus label does not name posaconazole, confirmed) | none |
| B3 | BROADER + WRONG ATTRIBUTION: everolimus label is "avoided with concomitant use of Zortress and cyclosporine or tacrolimus"; "(avoid)" and "the label says to avoid it" are card paraphrases shown in quotes (Neoral/Gengraf/Sandimmune: "should be avoided"; Prograf: "should not eat grapefruit"; Astagraf/Envarsus "avoid"; sirolimus "must not be taken") ; refs [7] wrong, Zortress is [6] | Heading "...or everolimus (Zortress, with cyclosporine or tacrolimus)"; unquote paraphrases; fix refs |
| B4 | FAITHFUL (same as A3) | none |
| B5 | FIRMER THAN SOURCE (Thymoglobulin: "not recommended for patients who have recently received", not "avoid") + WRONG ATTRIBUTION (CellCept/Myfortic/Nulojix/Thymoglobulin cited as one unnamed ref [7]; Solu-Medrol [10] and Zortress [6] not in refs) | Move Thymoglobulin to its own clause with "not recommended after recent treatment"; cite each label by set ID |
| B6 | BROADER + COULD WITHHOLD NEEDED TREATMENT (label scope is dapsone overdose methaemoglobinaemia; "reduction depends on G6PD and should not be given to fully expressed G6PD deficient patients") | Heading: "...methylene blue for dapsone-induced methaemoglobinaemia in a patient with fully expressed G6PD deficiency"; keep "treatment of choice in normal and methemoglobin reductase deficient patients" |
| B7 | FAITHFUL (Solu-Medrol contraindicated "for intrathecal administration") | none |
| B8 | FAITHFUL list (Vfend contraindicated: carbamazepine, long-acting barbiturates, rifabutin, rifampin, St John's Wort); COULD WITHHOLD (anticonvulsant, rifampin) | Say it is a contraindication of the combination, label names no alternative; add approved note verbatim "Editor note: before adding or stopping any drug, ask the transplant team or a transplant pharmacist whether it changes the immunosuppressant level." |
| B9 | FAITHFUL (Noxafil: atorvastatin, lovastatin, simvastatin contraindicated, rhabdomyolysis); COULD WITHHOLD statin | same wording fix as B8 |
| B10 | FAITHFUL (Bactrim: concomitant dofetilide contraindicated) | same wording fix as B8 |

## Links
Drug card route: virtualNodeId = prefix + kind + "-" + slug, so `tdse-drug-<id>` is the right form; all 13 ids exist in drugs/*.ts. Real route `/tree/transplant-drug-side-effects/node/tdse-drug-<id>` (app.ts DRUG_CONSULT_VIRTUAL_ID). A bare `#/node/tdse-drug-x` from an info overlay dispatches `medkitt-jump-node`; only onc-drug-consult.ts's capture listener turns it into a route, and only while `.onc-body` is in the DOM (overlay opened over a tdse page). Elsewhere the consult-flow listener gets it and it fails silently. The oncology Stop page only links real odse-tox nodes, so it is no precedent. Use `#/tree/transplant-drug-side-effects/node/tdse-drug-<id>` (info-page 'tree' link, sets hash) for all card links. Toolbar config for tdse is `[]`: no Stop button exists yet. All 12 tpe-* targets on page A exist.

## Verdicts
Page A: READY AFTER LISTED FIXES (drop A6; fix A1, A2, A5, A8, A9, A10). Page B: READY AFTER LISTED FIXES (B3, B5, B6, B8-B10, card link form, refs).
