# Stop pages: source map

Two drafts: `transplant-patient-ed-stop.info.ts` (A, ids from `src/data/trees/transplant-patient-ed.ts`) and `transplant-drug-side-effects-stop.info.ts` (B, card lines in `src/data/transplant-drugs/drugs/*.ts`). Each item restates one existing sentence; wording strength is copied.

## A. Transplant Patient in the ED (10 items)

| # | Heading | Source sentence (node) | Strength | Why "Do NOT" is not firmer |
|---|---|---|---|---|
| 1 | change, hold or stop an immunosuppressant before calling the transplant team | Approved note verbatim "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant."; ISHLT "Immunosuppression should not be discontinued or modified without discussion with the HT team." (tpe-heart-drugs, I C) | approved editor note; "should not" (I C) | Same words as the note; the call is not a treatment delay: body also quotes the approved cytopenia note "give the Sepsis consult's empiric antibiotics without delay" (tpe-cytopenia-fever) |
| 2 | count on atropine for relative symptomatic bradycardia in a heart recipient | "will not respond to atropine"; "Isoproterenol infusion and pacing are the usual modes of management" (tpe-heart-brady, anaesthesia section, I C); approved note on pacing pads | "will not respond" (I C), a firm statement, not a "may" | Heading says "count on" (does not give a drug-free rule); no dose; flagged for owner because the source is a prediction, not a prohibition |
| 3 | use potassium-sparing diuretics in a recipient on cyclosporine | Neoral, Gengraf, Sandimmune: "potassium-sparing diuretics should not be used" (tpe-cni-htn-agents, tpe-cni-drugs) | label "should not be used" | Scope cyclosporine only; body says Prograf wording is "careful consideration" |
| 4 | use tacrolimus and cyclosporine together | Prograf label: not used simultaneously with cyclosporine; one "should be discontinued at least 24 hours before initiating the other" (tpe-cni-drugs) | label "not used simultaneously" | Only restates label; "(call the transplant team first)" kept off the page body as stop advice, no dose |
| 5 | use nifedipine with cyclosporine when gingival hyperplasia develops | Cyclosporine labels: nifedipine "should be avoided in patients in whom gingival hyperplasia develops" (tpe-cni-htn-agents) | label "should be avoided" | Scope is gingival hyperplasia only; body repeats "No label says to avoid nicardipine, verapamil or diltiazem" so calcium-channel blockers are not generalised |
| 6 | give allopurinol to a kidney recipient taking azathioprine | KDIGO 2009 "recommend avoiding allopurinol in patients receiving azathioprine (1B)" (tpe-kidney-drugs summary; critical action); Imuran label "with allopurinol the Imuran dose should be reduced" (tpe-cytopenia-differ) | recommend avoid, 1B | Guideline wording is "avoid"; Imuran label's own softer wording is stated in the body as the page words it |
| 7 | treat CMV disease with oral ganciclovir, acyclovir or valacyclovir | "not recommended for treatment (strong, moderate)" (tpe-cmv-safety) | "not recommended", strong, moderate | Treatment only; no prophylaxis claim |
| 8 | diagnose CMV by culture or serology | culture of blood, urine, stool, oral secretions "Not recommended (strong, high)"; QNAT on those specimens (strong, low); "Serology has no role" (tpe-cmv-workup, tpe-cmv) | not recommended, strong; "no role" | Diagnosis only. The fact that blood DNA can be low in gut disease is quoted as a fact, not a prohibition |
| 9 | use cidofovir or leflunomide to treat BK, or fluoroquinolones or statins to prevent or treat BK | "Not recommended as treatment for BK: cidofovir, leflunomide (strong, B); fluoroquinolones, statins, to prevent or treat BK (strong, A). Their use for other indications is not addressed." (tpe-bk-team) | not recommended, strong A/B | Body keeps "does not address their use for other indications", so it does not read as stop a statin |
| 10 | rely on blood biomarkers alone to diagnose or exclude rejection in a liver recipient | "peripheral blood biomarkers alone should not be used to diagnose or exclude T-cell-mediated rejection ..." (tpe-liver) | "should not be used", Strong, Level 4 | Scope liver, "alone" kept |

## B. Transplant Drugs Side-effects (10 items; card links `#/node/tdse-drug-<drug id>`)

| # | Heading | Card line (card id) | Strength | Why "Do NOT" is not firmer |
|---|---|---|---|---|
| 1 | sirolimus with voriconazole | "the Vfend label says sirolimus is contraindicated" (voriconazole, sirolimus) | contraindicated | label word |
| 2 | sirolimus with posaconazole | "the Noxafil label says it is contraindicated with sirolimus" (posaconazole, sirolimus) | contraindicated | label word; body notes sirolimus label does not name it |
| 3 | grapefruit with tacrolimus, cyclosporine, sirolimus, everolimus | tacrolimus "(avoid)"; cyclosporine "the label says to avoid it"; sirolimus "must not be taken with sirolimus"; Zortress "should be avoided" | avoid / must not | each label's own word quoted |
| 4 | potassium-sparing diuretics on cyclosporine | cyclosporine-modified / non-modified: "potassium-sparing diuretics should not be used" | should not be used | cyclosporine only; Prograf "consider carefully" stated |
| 5 | live vaccines on these immunosuppressants | tacrolimus, cyclosporine, belatacept, ATG rabbit "avoid"; sirolimus, Zortress "should be avoided"; MMF, MPA "avoid during treatment"; methylprednisolone "contraindicated on immunosuppressive doses"; Atgam "do not give" | avoid to contraindicated | each drug's own word listed in the body |
| 6 | methylene blue in fully expressed G6PD deficiency | dapsone: "the label says it should not be given to fully expressed G6PD deficient patients" | should not be given | narrow group; body also quotes that it is treatment of choice in other patients, so it does not delay treatment generally |
| 7 | Solu-Medrol intrathecally | methylprednisolone: "Solu-Medrol contraindications: intrathecal administration" | contraindication | label word |
| 8 | voriconazole with rifampin, rifabutin, carbamazepine, long-acting barbiturates, St John's wort | voriconazole card lines: "contraindicated" each | contraindicated | for carbamazepine and barbiturates the body keeps "not studied, but likely" |
| 9 | posaconazole with atorvastatin, lovastatin, simvastatin | posaconazole: "contraindicated, because raised levels can cause rhabdomyolysis" | contraindicated | label word |
| 10 | TMP-SMX with dofetilide | sulfamethoxazole-trimethoprim: "the label says concurrent use is contraindicated" | contraindicated | label word |

## Rejected candidates

- Standard-dose adenosine in a heart recipient: page says "may result in prolonged asystole" and the doses (1.5 mg vs 3 mg) are "unresolved" (tpe-heart-tachy). Not firm; sources differ.
- Excluding gut CMV disease on a negative blood PCR: page only says blood DNA "can be low or undetectable"; a statement of fact, not a prohibition. Used as a fact sentence inside A item 8.
- Reducing the valganciclovir or ganciclovir dose for leukopenia, or using them at low counts: labels and consensus differ (tpe-cytopenia-differ, "this page chooses neither").
- Tacrolimus target ranges, calcium-channel blockers in general: "Sources differ" (tpe-cni-htn-agents); no label says to avoid them.
- Potassium-sparing diuretics with Prograf/Astagraf/Envarsus: "careful consideration" / "may increase the risk".
- Extra immunosuppression when the cause is not rejection (tpe-kidney summary): "may be harmful (rationale)", a "may".
- Kidney creatinine rise treated as rejection without steps: "recommend biopsy before treating ... unless it substantially delays treatment (1C)" is a positive recommendation with an exception; turning it into "Do NOT" risks reading as delaying treatment (rule 4).
- Phenytoin, phenobarbital, carbamazepine, valproic acid in heart recipients (tpe-cni-seizure): ungraded narrative "should be avoided" for ongoing therapy only; could read as barring a drug in an active seizure; dropped.
- Solu-Medrol epidural: card says "not approved for this use", weaker than a prohibition.
- Fluoroquinolone/statin as BK treatment alone: included only in joined form with its "other indications not addressed" clause.
- Allopurinol on the Imuran card: card says only "reduce the Imuran dose"; so it is in A (KDIGO 1B), not B.
- Reducing CNI for seizures/PRES, adenosine, CYP3A inhibitor dose changes: these are "should / consider / reduce" actions, not prohibitions.
- Strong CYP3A inhibitors "avoid" and other long contraindication lists on the cards (pimozide, quinidine, ergots, etc.): valid but lower bedside priority; not selected.

## Link targets

All A targets exist as tree nodes in `transplant-patient-ed.ts`. All B card targets exist as `tdse-drug-<id>` (ids checked against the drug files and the search index): voriconazole, sirolimus, posaconazole, tacrolimus, cyclosporine-modified, cyclosporine-non-modified, everolimus-zortress, methylprednisolone, mycophenolate-mofetil, belatacept, antithymocyte-globulin-equine, dapsone, sulfamethoxazole-trimethoprim. B item 4 also uses `#/tree/transplant-patient-ed/node/tpe-cni-htn-agents`.

## Revision after the independent check (stop-pages.verify.md)

Page A now has 10 items. Dropped: atropine (a prediction, "will not respond"), allopurinol with azathioprine (listed under "Where the sources differ"; KDIGO own text says "extreme caution"). Both moved to the rejected list. Changed: A1 body scoped to "Heart recipients, intercurrent-surgery section"; A5 body "none of the six tacrolimus and cyclosporine labels read says to avoid nicardipine, verapamil or diltiazem; they list them as raising levels"; A8 heading names the specimens, body keeps each statement's wording and grade; A9 heading says kidney recipients; A10 heading names Question 16 biomarkers as a noninvasive alternative to biopsy, alone, adult liver recipient.

Added to A:
- Do NOT change antivirals in the first 2 weeks of CMV treatment if the patient is clinically improving. Source (tpe-cmv-safety): "Changing antivirals is not recommended in the first 2 weeks if clinically improving, even with unchanged or rising DNA (strong, moderate)". Strength: not recommended, strong, moderate. Scoped to CMV disease treatment; no antiviral choice or dose stated; not the low-count question.
- Do NOT let a liver recipient use herbal or dietary supplements without discussing them with the transplant team. Source (tpe-liver-disposition): "Recipients should not use herbal and dietary supplements without discussing them with their transplant providers (Strong, Level 4)". Strength: should not, Strong, Level 4.

Page B changes: B1 states Cmax about 7-fold and AUC about 11-fold; B3 each label's own verb (Prograf/Astagraf/Envarsus avoid; Neoral/Gengraf/Sandimmune should be avoided; sirolimus must not be taken; Zortress avoided with concomitant Zortress and cyclosporine or tacrolimus), references fixed; B5 Thymoglobulin "not recommended for patients who have recently received", every label cited separately (refs 4-16); B6 heading names dapsone-induced methemoglobinemia, treatment-of-choice statement kept; B8-B10 say the label contraindicates the combination, not a reason to stop the other drug without advice, and quote the approved note verbatim; all card links use `#/tree/transplant-drug-side-effects/node/tdse-drug-<id>`.

Rejected candidates now also include: atropine in heart recipients, allopurinol with azathioprine, tacrolimus medication-guide "do not stop or change your dose" (patient text, duplicates A1).

## Final edits
- Page A: herbal and dietary supplements item dropped (patient-directed advice, not an ED clinician pitfall); the page now has 9 items. Its source (tpe-liver-disposition, "Recipients should not use herbal and dietary supplements ... (Strong, Level 4)") joins the rejected list.
- Page B citations 1-18 are copied from the SOURCES entry each card line cites: text, label revision date (where the entry has one) and the DailyMed url built from its set id. Entries: Vfend (azoles V), sirolimus (mtor SRL), Noxafil (azoles P), Prograf, Astagraf XL, Envarsus XR, Neoral, Gengraf, Sandimmune (sources.ts), Zortress (mtor EVR), CellCept, Myfortic (antimetabolites), Nulojix, Thymoglobulin, Atgam (biologics-induction), Solu-Medrol (corticosteroids SM; the card's vaccine line also cites Medrol), dapsone, Bactrim (pjp-prophylaxis). Astagraf, Gengraf, Nulojix, Thymoglobulin and Atgam entries carry no revision date, so none is given.

## Forks settled 2026-11-21
Page A gains a tenth item, "Do NOT give febuxostat to a patient on azathioprine": Uloric label (contraindicated) and Imuran label (not recommended), link `#/node/tpe-cytopenia-differ`, citations 10 and 11. Page A is at the 10-item limit.
