# Azoles report (fluconazole, voriconazole, posaconazole, isavuconazonium) - file src/data/transplant-drugs/drugs/azoles.ts

Labels (XML in research/transplant-sources/dailymed/): diflucan_f694c617 (setid f694c617-3383-416c-91b6-b94fda371204, SPL 2026-04-02, "Revised: 3/2025"); vfend_ce3ef5cf (ce3ef5cf-3087-4d92-9d94-9eb8287228db, SPL 2026-02-26, "Revised: 1/2026"); noxafil_b073b082 (b073b082-7b57-4423-8c06-4fd4263d6f84, SPL 2026-02-13, "Revised: 1/2026"); cresemba_8f7f73b8 (8f7f73b8-586a-4df0-935f-fecd4696c16c, SPL 2025-04-25, "Revised: 12/2023"). MANIFEST revised dates for vfend/noxafil/cresemba (2/2026, 2/2026, 4/2025) do not match the text in the XML; I used the XML text. No label has a boxed warning (searched XML).

Cards (rows / boxed / also-on-label: interaction + other / longest line / longest badge / mechanism):
- fluconazole 4 / 0 / 20 + 10 / 199 / no timing / 104
- voriconazole 5 / 0 / 23 + 8 / 200 / no timing / 111
- posaconazole 3 / 0 / 17 + 8 / 200 / no timing / 92
- isavuconazonium 1 / 0 / 10 + 8 / 199 / no timing / 106. Class mechanism 110.
tsc --noEmit clean. Interaction lines are one contiguous block, in the ordered heads the coordinator set.

## Immunosuppressant interactions: azole label vs IS labels (disagreements marked **)
| | azole label says | IS label says |
|---|---|---|
| FLC-cyclosporine | levels rise significantly (AUC +92%, 8 renal pts); monitor, may reduce CsA | Neoral/Gengraf/Sandimmune list fluconazole as raising |
| FLC-tacrolimus | up to 5x oral, none IV; decrease oral dose by level | ** Prograf/Envarsus: "mild or moderate" inhibitor (monitor, reduce if needed); Astagraf lists clotrimazole only (not fluconazole) |
| FLC-sirolimus | rises; may be used with adjustment | sirolimus label lists fluconazole as raising (no action) |
| FLC-everolimus | not named | Zortress names only ketoconazole |
| VRC-cyclosporine | AUC ~1.7x; reduce, monitor | listed as raising (no figure) |
| VRC-tacrolimus | AUC ~3x; reduce, monitor | Prograf/Astagraf/Envarsus: strong inhibitor, same action (agree) |
| VRC-sirolimus | CONTRAINDICATED (Cmax 7x, AUC 11x) | ** sirolimus label: "avoid" / "not recommended", not contraindicated |
| VRC-everolimus | not recommended (not studied) | ** Zortress names no voriconazole; says avoid strong CYP3A inhibitors, ketoconazole only |
| POS-cyclosporine | trough rises; monitor, reduce | ** cyclosporine labels do not name posaconazole |
| POS-tacrolimus | AUC +358%; reduce, monitor | Prograf quotes 4.5-fold (agree) |
| POS-sirolimus | CONTRAINDICATED (~9-fold) | ** sirolimus label does not name posaconazole |
| POS-everolimus | not named | not named by Zortress |
| ISA-cyclosporine | rises, "use with caution", monitor | ** cyclosporine labels do not name isavuconazole |
| ISA-tacrolimus | ~2x; use with caution | ** Envarsus: mild/moderate; Prograf/Astagraf do not name it |
| ISA-sirolimus | ~2x; use with caution (not contraindicated) | ** sirolimus label does not name isavuconazole |
| ISA-everolimus | not named | not named |
Between azole labels: sirolimus is contraindicated (VRC, POS), "caution" (ISA), "may be used with adjustment" (FLC). Prograf calls fluconazole mild/moderate while the fluconazole label gives "up to 5 times". Fluconazole contraindicates QT-prolonging CYP3A4 drugs by class (erythromycin, pimozide, quinidine named) but its precautions say erythromycin "should be avoided"; voriconazole/posaconazole name pimozide + quinidine (VRC adds ivabradine). Statins: contraindicated (POS: atorva/lova/simva), monitor (FLC, VRC, ISA atorvastatin). Voriconazole fluconazole-pair: both say avoid.

## Registered by the integrator (none made by me)
- drugs/index.ts: import * as azoles; 'azoles.ts': azoles
- index.ts TX_CONSULT.classSections: 'tx-azole': 'Prophylaxis'
- CLASSES/SOURCES come from the file. pharmacyDrugId used: fluconazole -> 'fluconazole', voriconazole -> 'voriconazole' (pin:false). Posaconazole and isavuconazonium: no Pharmacy entry (searched drug-store.ts).
- Editor abbreviations proposed: FLC; vori, VCZ; posa; isavu. Label aliases: isavuconazole.
- Organs: cancers left empty for all four. No indication names a transplant organ; posaconazole prophylaxis names "HSCT recipients with GVHD or hematologic malignancies with prolonged neutropenia" (HSCT is not in TX_ORGANS). Voriconazole, Cresemba and fluconazole indications: treatment (fluconazole prophylaxis: bone marrow transplant with chemo/radiation).

## Existing categories used
drug-hepatotoxicity (class level, all four labels warn; page = hepatitis consult), drug-qt-prolongation (FLC, VRC, POS; torsades page; not isavuconazonium: QT-shortening), drug-severe-skin (FLC, VRC; SJS/TEN page), drug-adrenal-insufficiency (FLC, VRC, POS; adrenal insufficiency page), drug-pancreatitis (VRC). Not used: drug-ocular-toxicity, drug-cns-toxicity (page titles "...on targeted and biologic drugs", oncology class lists), infusion-reaction (page is the checkpoint-inhibitor reaction).

## PROPOSED new categories (lines waiting)
1. drug-visual-disturbance "Drug-related visual disturbance", tier 3, complaints headache-vision; page: new blurred vision, color change, photophobia, optic neuritis on a drug, link to Monocular Vision Loss Hub (voriconazole visual line).
2. tx-azole-photosensitivity "Photosensitivity and skin cancer" tier 3, complaints rash-skin (voriconazole photosensitivity line).
3. tx-infusion-anaphylaxis "Infusion reaction or anaphylaxis from an infusion", tier 2, complaints fever, dyspnea-cough, fatigue-hypotension (VRC, ISA infusion lines; ISA anaphylaxis).
4. Surfacing the level interaction: NOT an adverse-effect row; make it the card's first lines (the interaction block) linking to page node tpe-cni-interactions, because it changes care today (check level, expect dose change, sirolimus contraindicated). A category would add a click with no new page content; the existing page already covers it.

## Label content held for the overlay / left off rows
- Dose fractions the labels state for immunosuppressants (VRC cyclosporine one-half, tacrolimus one-third; POS tacrolimus one-third, cyclosporine three-fourths, up to 29% cyclosporine reductions); omitted per rule.
- Row figures left off: VRC AST >3x ULN 20.3% vs 8.1% (fluconazole) and 17.7% pooled transaminase; FLC transaminase >8x ULN ~1%; POS ALT >3x ULN 3-11%; ISA transaminase >3x ULN 4.4%, >10x 1.2%; VRC visual ~21%, hallucinations 2.4% (in Also lines). No timing statement describes a whole hazard, so no badges. VRC ERG changes "early" and "normal 14 days after dosing" is not an onset statement. FLC "4 to 5 days after discontinuation" is in Also as an interaction fact, not a badge.
- Interactions that fit none of the four heads and were NOT written: fluconazole-losartan (blocks activation; monitor BP), isavuconazole-bupropion (bupropion exposure falls), isavuconazole-lopinavir/ritonavir (their exposure falls). Also not written: FLC-hydrochlorothiazide cimetidine/antacid, FLC-cyclophosphamide, vitamin A, oral contraceptives for FLC; VRC-omeprazole dose halving (a fraction).
- Label statements about QT in healthy volunteers (VRC <10 msec; POS mean QTc -5 msec) held; Cresemba QTc -13.1 / -24.6 msec held.

## "Not in the label" claims (sections searched)
Boxed warnings: none (XML search). Fluoride/periostitis: voriconazole only (5.12, 6.2); not in FLC, POS, ISA (full text search). Photosensitivity/skin cancer: voriconazole only; none in POS or FLC (grep). Everolimus: named only in Vfend 7 table; absent from FLC, POS, ISA. Posaconazole skin reactions: none found. Adrenal: FLC (precautions, prednisone), VRC (5.8), POS (trial list <5%), ISA none. Cresemba SJS statement refers to other azoles.

## Temptations the label does not support
Calling fluconazole a "strong" tacrolimus inhibitor; calling isavuconazole sirolimus use contraindicated; "monitor INR" numbers; Cresemba being safe in QT; adding transplant organs to cancers; any hepatic-timing badge; saying posaconazole raises everolimus.

## Other
Fluconazole and voriconazole Pharmacy ids exist; consider pinAlso for brand names if the collision gate allows. Non-interaction Also lines: FLC 10, VRC 8, POS 8, ISA 8 (all warned events kept; none dropped).

# FIX ROUND (supersedes the earlier sections where they differ)
Verifier findings: 1 DONE (voriconazole cyclosporine/tacrolimus and posaconazole tacrolimus/cyclosporine "on stopping" lines are now "Falls when it stops:", quoting the label; posaconazole wording is the label's "monitor ... at discontinuation and modify the dose accordingly", it does not say increase). 2 DONE (everolimus lines dropped on FLC/POS/ISA; kept on VRC "not recommended"). 3 DONE (POS order cyclosporine, tacrolimus, sirolimus). 4 DONE (ISA cyclosporine, tacrolimus, sirolimus, mycophenolate). 5 DONE (rifabutin and efavirenz both directions under Avoid together). 6 DONE (oral vs IV fluconazole and oral midazolam). 7 DONE (amiodarone is a plain last line in alsoOnLabel, not in interactions; the label says caution, not avoid). 8 DONE (carbamazepine, barbiturates "not studied, but likely"). 9 DONE (posaconazole overdose number removed). 10 DONE (lemborexant, tyrosine kinase inhibitors under Avoid together). 11 DONE (VRC embryo-fetal, lactose, breastfeeding, driving, optic neuritis/papilledema; ISA embryo-fetal with 28 days contraception, breastfeeding; POS pregnancy, breastfeeding; POS pancreatitis/HUS/TTP/renal failure/PE/adrenal as one trial-list plain line). 12 DONE (DRESS and AGEP on the fluconazole skin line). 13 DONE (one drug or class per line). Held lines (losartan, bupropion, lopinavir/ritonavir): DONE as "Lowers the other drug:". Missing drugs added: fluconazole tolvaptan, vinca alkaloids, tofacitinib, ibrutinib, ivacaftor, lurasidone, cyclophosphamide, vitamin A; voriconazole sufentanil, methotrexate (in the photosensitivity line), oral contraceptives both ways, tretinoin and the rest. DISAGREE: none. Not written (low ED yield): fluconazole cimetidine (-13% fluconazole) and oral contraceptives, hydrochlorothiazide kept.

Categories: tx-qt-prolongation (FLC, VRC, POS), tx-adrenal-insufficiency (FLC, VRC; POS only a plain trial-list line), tx-infusion-anaphylaxis (VRC infusion reactions; ISA infusion reactions and anaphylaxis), drug-hepatotoxicity (class), drug-severe-skin (FLC, VRC), drug-pancreatitis (VRC). All in TAXONOMY usable list. Visual disturbance and photosensitivity/skin cancer: plain lines, first two on the voriconazole card.

Measurements (rows / interaction lines by head in order / non-interaction lines / longest / mech):
- fluconazole: 4 rows; Raises other 26 (cyclosporine, tacrolimus, sirolimus first), Falls when it stops 1 (prednisone), Avoid together 7, Lowers other 1, Lowers level 1, Raises level 1; 12 other (first: Inhibition persists, Anaphylaxis, Seizures and dizziness); 199; 104
- voriconazole: 6 rows; Raises other 24, Falls 2, Avoid 16, Lowers level 3, Raises level 1; 11 other (first: Visual, Photosensitivity, Embryo-fetal); 200; 111
- posaconazole: 2 rows; Raises other 10, Falls 2, Avoid 10, Lowers level 2; 11 other (first: Electrolytes, Pseudoaldosteronism, Formulations); 200; 92
- isavuconazonium: 2 rows; Raises other 7, Avoid 3, Lowers other 2, Raises level 1; 8 other (first: QT shortening, Severe skin reactions, Embryo-fetal); 199; 106
No "mg" or "/kg" anywhere in the file; tsc clean. Note the interaction block order of heads inside each card: immunosuppressant Raises lines, Falls when it stops, Avoid together, other Raises, Lowers the other drug, Lowers level, Raises level.
Registration unchanged: 'azoles.ts': azoles in drugs/index.ts; 'tx-azole': 'Prophylaxis' in TX_CONSULT.classSections.

# D1-D9 round
All DONE, no DISAGREE. Posaconazole stop lines are plain "Cyclosporine/Tacrolimus, on stopping posaconazole" after the sirolimus line; fluconazole prednisone keeps "Falls when it stops"; amiodarone, cyclophosphamide, vitamin A and a general CYP line are plain lines last in fluconazole interactions; generic CYP3A lines added for posaconazole and isavuconazonium; voriconazole split to one drug per line, HIV protease inhibitor and NNRTI rows added, corticosteroid line plain, efavirenz action corrected; voriconazole Also order Visual, Photosensitivity, Kidney, Hallucinations, Embryo-fetal. Interaction counts (Raises other / Falls / Avoid / Lowers other / Lowers level / Raises level / plain): FLC 26/1/7/1/1/1/4; VRC 25/2/22/0/4/3/1; POS 10/0/11/0/2/0/3; ISA 7/0/3/2/0/1/1. Non-interaction lines 11/11/11/8; longest 200.
