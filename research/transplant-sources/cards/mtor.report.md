# mTOR group report (Maintenance), final fix round: sirolimus, everolimus-zortress

File: src/data/transplant-drugs/drugs/mtor.ts (exports DRUGS, CLASSES [tx-mtor], SOURCES). tsc --noEmit clean. Builder script (throwaway, outside src/): errors [], rows resolve in order. Not registered, no oncology edit made.

## Verifier findings
1 DONE (sirolimus "Conversion from a CNI:" line: maintenance kidney recipients, baseline GFR under 40 mL/min, death at 2 years 15.5% vs 3.4%). 2 DONE (Adds kidney risk: label action quoted, plus beyond-4-months line). 3 DONE (simvastatin/lovastatin removed from the block; trial statement and rhabdomyolysis monitoring, both "with cyclosporine", in Hyperlipidemia). 4 DONE (Zortress pneumonitis: highlights sentence). 5 DONE (plain "Other interacting medicines:" line, section 17 wording). 6 DONE (BK/PML reduction statements with graft-risk clause on both infection rows). 7 DONE (SPL "NDA AUTHORIZED GENERIC" stated in source text; card labelAge note; Rapamune kept as searchable brand). 8 DONE (verapamil: 1.5-fold S(-) verapamil in 25 healthy volunteers). 9 DONE (maintenance kidney recipients 6-120 months). 10 DONE (comparator: cyclosporine, MMF, steroids, IL-2 antagonist; I dropped "no renal benefit seen" for length). 11 DONE (Zortress liver tacrolimus-elimination statement, "not recommended"; angioedema action "monitor for symptoms and treat promptly" on the row). 12 DONE (no "states no action"; tacrolimus split to its own plain line). 13 PARTLY (see counts). 14 leave: un-categorised boxed hazards first, then label order.

## Measurements (zero lines over 200, every line headed and cited)
- sirolimus: rows tx-serious-infection*(rank1), tx-malignancy*(2), tx-angioedema, tx-tma, tx-nodat; no timings; interactions 22 = Avoid together 3 (2 cross-ref + live vaccines), Raises level 9, Lowers level 3, Adds kidney risk 3, Raises the other drug 2, Falls when it stops 1, plain ACE-inhibitor line last; non-interaction lines 13 (first three: Non-infectious pneumonitis, Wound healing and fluid, Hyperlipidemia); boxed items 7; longest line 198; mechanism 117.
- everolimus-zortress: rows tx-serious-infection*(1), tx-malignancy*(2), tx-kidney-graft-thrombosis*(3, badge "Mostly within the first 30 days after transplant", 48 chars), tx-angioedema, tx-tma, tx-nodat; interactions 17 = Raises level 6, Lowers level 3, Adds kidney risk 2, Raises the other drug 2, Avoid together 1, plain 3 (ACE inhibitors, Tacrolimus, Other interacting medicines) last; non-interaction lines 14 (first three: Hepatic artery thrombosis, Non-infectious pneumonitis, Wound healing and fluid); boxed items 6; longest 199; mechanism 115. Class mechanism 97.
- Every effect category is on the TAXONOMY.md usable list (tx-serious-infection, tx-malignancy, tx-kidney-graft-thrombosis, tx-angioedema, tx-tma, tx-nodat). tx-cytopenia not used: neither label warns of low counts as a hazard (anemia/leukopenia are only listed trial reactions; pancytopenia/neutropenia postmarketing on sirolimus).
- Counts above 12: sirolimus 13, Zortress 14. Each remaining line is a warned event, overdose, a contraindication or an owner-required low-yield line; pneumonitis and fluid/wound moved INTO the plain lines (their categories are not allowed), which is what pushed the counts up. Cuts available if you want 12: sirolimus drop "Delayed graft function" (5.8 warned) and Zortress drop "Trial deaths in liver recipients" and "Levels" (5.x monitoring). Owner decision.

## Cross-reference lines (first in sirolimus interactions), with the quotes behind them
1. "Avoid together: voriconazole; the Vfend label says sirolimus is contraindicated (sirolimus AUC 11-fold in healthy men); this label says avoid strong CYP3A4/P-gp inhibitors such as voriconazole". Vfend section 4: "Concomitant use of VFEND is contraindicated with drugs that are highly dependent on CYP3A4 for metabolism ... Sirolimus"; table: sirolimus "Significantly Increased | Contraindicated"; 12.3: voriconazole "increased the Cmax and AUC of sirolimus (2 mg single dose) an average of 7-fold ... and 11-fold, respectively, in healthy male subjects". Sirolimus 7.2: "Avoid concomitant use ... strong inhibitors (e.g., ketoconazole, voriconazole, ...)".
2. "Avoid together: posaconazole; the Noxafil label says it is contraindicated with sirolimus, raising sirolimus about 9-fold; this sirolimus label does not name posaconazole". Noxafil 4.2: "Noxafil is contraindicated with sirolimus. Concomitant administration ... increases the sirolimus blood concentrations by approximately 9-fold and can result in sirolimus toxicity". Sirolimus label: 0 hits for posaconazole (also none in Zortress). Cited with source keys pi-vfend-sirolimus-xref / pi-noxafil-sirolimus-xref (same labels as azoles.ts pi-vfend / pi-noxafil, separate keys so no source key repeats across group files; the integrator may switch them to the azoles keys and delete mine).

## Hazards that stayed plain lines (no usable category)
Non-infectious pneumonitis, fluid accumulation, wound healing, hepatic artery thrombosis (also boxed on sirolimus; Zortress W&P 5.5; timing in the text), proteinuria, hyperlipidemia, hypersensitivity, bronchial anastomotic dehiscence and liver mortality/graft loss (sirolimus boxed only), Zortress nephrotoxicity with cyclosporine and heart mortality (boxed only; kidney injury could ride on tx-cni-nephrotoxicity if its page gains a sentence).

## Oncology edit (integrator, not made)
src/data/onc-drugs/drugs/targeted-vegf-multikinase.ts line 546: delete `searchOnlyBrands: ['Zortress'],` from the everolimus (Afinitor) card.

## Registration
drugs/index.ts: `import * as mtor from './mtor.js';` and `'mtor.ts': mtor,`; index.ts classSections: `'tx-mtor': 'Maintenance'`.
Earlier-round material (Zortress vs Afinitor differences, proposed categories, held-for-overlay figures) is unchanged except that tx-angioedema and tx-kidney-graft-thrombosis now exist; the rest of the proposals are superseded by TAXONOMY.md.

## Interaction block as written

### sirolimus
- Avoid together: voriconazole; the Vfend label says sirolimus is contraindicated (sirolimus AUC 11-fold in healthy men); this label says avoid strong CYP3A4/P-gp inhibitors such as voriconazole
- Avoid together: posaconazole; the Noxafil (posaconazole) label says it is contraindicated with sirolimus, raising sirolimus about 9-fold; this sirolimus label does not name posaconazole
- Raises level: strong CYP3A4/P-gp inhibitors clarithromycin, erythromycin, telithromycin, ketoconazole, voriconazole, itraconazole; the label says avoid them and consider alternatives
- Raises level: diltiazem and verapamil; the label says monitor sirolimus concentrations, and a dose adjustment may be necessary; nicardipine is listed with the drugs to use with caution
- Raises level: fluconazole and clotrimazole; the label says exercise caution, and the sirolimus and/or other drug dosage may need adjusting
- Raises level: metoclopramide, cisapride and cimetidine; the label says exercise caution, and the sirolimus and/or other drug dosage may need adjusting
- Raises level: protease inhibitors (ritonavir, indinavir, boceprevir, telaprevir); the label says exercise caution, and the dosage may need adjusting
- Raises level: bromocriptine, danazol, letermovir and troleandomycin; the label says exercise caution, and the dosage may need adjusting
- Raises level: cyclosporine oral solution or capsules (MODIFIED); the label says take sirolimus 4 hours after them; taken together, sirolimus AUC rose 148% (tablets) vs 33% at 4 hours
- Raises level: cannabidiol; the label says closely monitor for higher sirolimus levels and toxicity and consider reducing the sirolimus dose
- Raises level: grapefruit juice inhibits CYP3A4 metabolism of sirolimus; the label says it must not be taken with sirolimus
- Lowers level: strong inducers rifampin and rifabutin (rifampin cut sirolimus AUC about 82%); the label says avoid them and consider alternatives with less enzyme induction
- Lowers level: carbamazepine, phenobarbital and phenytoin; the label says exercise caution, and the sirolimus and/or other drug dosage may need adjusting
- Lowers level: rifapentine and St. John’s Wort; the label says exercise caution, and the dosage may need adjusting
- Adds kidney risk: long-term cyclosporine with sirolimus; the label says consider adjusting the regimen, including stopping sirolimus and/or cyclosporine, if creatinine is raised or rising
- Adds kidney risk: cyclosporine beyond 4 months after transplant in low- to moderate-risk patients; the label says continue only when the benefits outweigh the risks
- Adds kidney risk: aminoglycosides and amphotericin B are known to harm renal function; the label says use caution with them
- Raises the other drug: cyclosporine; sirolimus 4 hours after it lowered cyclosporine clearance, so lower cyclosporine doses were needed to hold target levels in renal transplant patients
- Raises the other drug: verapamil; sirolimus raised the active S(-) verapamil Cmax and AUC 1.5-fold in 25 healthy volunteers; the label says the sirolimus and/or verapamil dosage may need adjusting
- Falls when it stops: cyclosporine; sirolimus concentrations may decrease when cyclosporine is discontinued unless the sirolimus dose is increased
- Avoid together: live vaccines (measles, mumps, rubella, oral polio, BCG, yellow fever, varicella, TY21a typhoid); the label says they should be avoided; vaccination may be less effective
- ACE inhibitors: may increase the risk of angioedema with sirolimus; elevated sirolimus levels may also potentiate angioedema

### everolimus-zortress
- Raises level: strong CYP3A inhibitors (ketoconazole raised everolimus AUC 15-fold in healthy subjects); the label says avoid them, and closely monitor everolimus troughs if use is unavoidable
- Raises level: erythromycin, a moderate CYP3A inhibitor (everolimus AUC 4.4-fold in healthy subjects); the label says monitor concentrations and reduce the dose as necessary
- Raises level: verapamil, a moderate CYP3A inhibitor (everolimus AUC 3.5-fold in healthy subjects); the label says monitor concentrations and reduce the dose as necessary
- Raises level: cyclosporine (everolimus AUC up 168% in healthy subjects); the label says Zortress dosage might need adjusting if the cyclosporine dose is changed
- Raises level: cannabidiol; the label says closely monitor for higher everolimus levels and toxicity, and consider reducing the Zortress dose
- Raises level: grapefruit and grapefruit juice inhibit CYP3A; the label says they should be avoided with Zortress and cyclosporine or tacrolimus
- Lowers level: strong CYP3A inducers (rifampin cut everolimus AUC 63%); the label says avoid them, and closely monitor troughs if use is unavoidable
- Lowers level: moderate CYP3A inducers; the label says monitor everolimus concentrations and increase the dose as necessary
- Lowers level: reducing the cyclosporine dose; everolimus concentrations may decrease if cyclosporine exposure is reduced, unless the Zortress dose is increased
- Adds kidney risk: standard-dose cyclosporine with Zortress raises nephrotoxicity and lowers GFR in kidney recipients; the label says use reduced cyclosporine doses and monitor both troughs
- Adds kidney risk: standard-dose tacrolimus with Zortress was not studied in liver recipients; the label says use reduced tacrolimus doses to minimize the potential risk of nephrotoxicity
- Raises the other drug: midazolam; everolimus raised midazolam Cmax 25% and AUC 30% in 25 healthy men given a single oral dose with steady-state everolimus
- Raises the other drug: depot octreotide; everolimus raised octreotide Cmin by about 50%
- Avoid together: live vaccines (intranasal influenza, measles, mumps, rubella, oral polio, BCG, yellow fever, varicella, TY21a typhoid); the label says they should be avoided
- ACE inhibitors: may increase the risk of angioedema with Zortress
- Tacrolimus: little to no pharmacokinetic interaction on everolimus; the label says Zortress dose adjustment is not necessary when it is used with tacrolimus
- Other interacting medicines: patient counselling lists antifungals, antibiotics, antivirals, carbamazepine, phenytoin, barbiturates, St. John’s Wort and rifampin as able to change Zortress levels

## Last corrections (re-verification round)
Sirolimus: Conversion line widened (GFR <40: pneumonia 25.9% vs 13.8%, death 15.5% vs 3.4%, TB 2.0% vs 0.4%, not established) plus a "Liver conversion:" line (3.8% vs 1.4%); "Delayed graft function" merged into "Kidney function:" with proteinuria; de novo line restored "not established". Avoid together now carries every label avoid statement on both cards (strong inhibitors, strong inducers, grapefruit; live vaccines). Zortress: pneumonitis cue restored, hyperlipidemia says cholesterol and triglycerides rise, "Levels" removed (no fitting line for the assay sentence), cyclosporine dose reduction is a plain "Cyclosporine dose changes:" line, timing credits the boxed statement only. Final counts: sirolimus 13 non-interaction + 22 interactions; Zortress 13 + 17.

## Final changes (owner-approved)
Zortress first interaction line: "Avoid together: voriconazole; the Vfend label says use with everolimus is not recommended (not studied, exposure likely increased); this label does not name it but says avoid strong CYP3A inhibitors" (cites Vfend xref + Zortress). Vfend table row: "Everolimus (CYP3A4 Inhibition) | Not Studied In Vivo or In Vitro, but Drug Plasma Exposure Likely to be Increased | Concomitant administration of voriconazole and everolimus is not recommended." Noxafil: no statement about everolimus (0 hits). Hepatic artery thrombosis is now a row (tx-hepatic-artery-thrombosis) on both cards: sirolimus boxed, rank 3 (boxed item stays in boxedWarning); Zortress not boxed (its box names kidney graft thrombosis, not HAT; 5.5 only), unranked; the Zortress plain line was removed. Counts: sirolimus 13 + 22; Zortress 12 + 18.

## Final confirmation fixes
Conversion split into "Conversion from a CNI:" (stratum, comparator continued CNI) and "Tuberculosis in conversion:" (overall in the study). Zortress pneumonitis split into cue + "fatal cases have occurred" and "Pneumonitis management:"; hyperlipidemia split into the lipid line (with "more with higher troughs") and "Statins and fibrates:" (with cyclosporine qualifier). Vfend source text and file comment now cover sirolimus and everolimus. Counts: sirolimus 14 + 22, Zortress 14 + 18. Item 5: no change; the source entry text is shown in the card's "References (n)" list (onc-drug-consult.ts line 111: source text, "Revised <x>", then url).
