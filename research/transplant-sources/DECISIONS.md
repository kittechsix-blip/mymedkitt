# Transplant consults: running decision list

Working record for the consolidated decision list Andy asked for at the end of the build.
Branch `feature/transplant-consults`, worktree `~/Developer/mymedkitt-transplant`. Nothing committed.

## Settled by Andy (grill, 2026-11-20)

- Two consults: "Transplant Patient in the ED" (approach tree, flagship, first) and "Transplant Drugs Side-effects" (cards). Shared management pages live in the approach tree.
- Adult solid-organ recipients only (kidney, liver, heart, lung, pancreas; short note for intestine). Stem-cell transplant and paediatrics not covered: one line each on the start page; candidates for later.
- Spine: three anchor questions (organ, time since transplant, drugs and recent changes) then emergent, acute by complaint, chronic recognition, rules for every patient and disposition.
- Engine generalised in place (one shared card store, per-consult config). Oncology must stay unchanged (data hash + 836 rendered routes + search scorecards).
- Both filed under Nephrology / Rheumatology / Endocrinology; approach tree also listed under EM.
- Page set: CNI toxicity and levels, interaction check, PRES, TMA, infection by time since transplant, CMV, PJP, BK, PTLD, organ pages (kidney, liver, heart, lung, pancreas), diarrhea. Link out for neutropenic fever, adrenal crisis, hyperkalemia, cryptococcal meningitis, liver failure, sepsis.
- Drugs: core immunosuppressants (full cards), standard prophylaxis (full cards), off-label rejection drugs (short cards). Cyclophosphamide and methotrexate out unless a guideline names a transplant use.
- Source rule: actionable statements from guidelines, labels or primary studies read in the build; reviews for framing only; no source, no statement (or a marked editor note).
- Doses only for treatments the ED starts; team-owned treatments named without doses; no dosing entries for oral immunosuppressants.
- No RAPID strip; a Stop page for each consult; one home-built infection timeline; no third-party images; no new calculators unless a guideline requires one.
- Build order with one stop for Andy's read of the first slice; four Fable reviews (plan done; first class end to end; management pages; final read).
- Q13: Zortress gets its own transplant card (label = unit). One oncology edit allowed: remove the Zortress search-only brand from the Afinitor card. That must be the only oncology difference.
- Q14: three visible evidence tiers in the approach tree: guideline, review (framing, never a number), editor notes Andy approves.
- "Approve all" (applied narrowly): editor notes shown verbatim at that point (CMV, liver, BK, lung, heart high-stakes note); plain words for consensus strength with scores in an overlay; post-transplant diabetes recognition entry in the chronic tier instead of linking to the general new-diabetes page; boxed hazards with no category lead each card; "calcineurin inhibitors" as the class name; neurotoxicity in the second danger tier; trim the toxicity page; approach tree may cite peer-reviewed reviews.
- Approved explicitly: the six editor notes on the two calcineurin inhibitor pages (product and centre contact; time of last dose and of draw on the request; ask team or transplant pharmacist before adding or stopping a drug; give creatinine trend, level and last-dose time together; poison centre or toxicologist plus transplant team for overdose; tell the team which blood-pressure drug and any level).

## The shared sentence (approved; now identical on every page)

"Editor note: call the transplant team before changing, holding or stopping any immunosuppressant."
Once in each page's entry node and once in its critical actions. Trailing clauses were removed after verifiers found three of them unsupported. Nearest source statements: tacrolimus Medication Guides (do not stop or change the dose without talking to the healthcare provider); ISHLT 2023 intercurrent-surgery section (immunosuppression should not be modified without discussion with the HT team, I C); AASLD/AST elective-surgery paragraph; liver guideline on withdrawal.

## Open: forks between numbers (pages show both; Andy must pick or leave both)

- Adenosine in a heart recipient: ISHLT 1.5 mg (early postoperative care, IIb C) vs 3 mg (arrhythmia narrative, example); existing drug entry and `svt` node say 3 mg; `svt` critical action says 6 mg then 12 mg.
- CMV: IV vs oral cut-off (consensus: severity words, no number; liver guideline: 100,000 IU/mL or more, graded; 50,000 to 100,000 "many centers"); foscarnet marker (50,000 or more, expert opinion, hedged, vs above 20,000 to 50,000); resistance suspicion 4 weeks vs "usually more than 6"; stopping rule and secondary prophylaxis differ between the two guidelines; superseded 2018 symptom list allowed or not.
- Tacrolimus targets: labels vs consensus vs liver Table 4 vs heart e41; liver trial figure with unit typo.
- Label vs consensus: antacids; methylprednisolone; letermovir strength (differs between tacrolimus labels); fluconazole (labels mild/moderate vs consensus table); Envarsus conversion 80% vs 0.7; sample stability 7 vs 14 days; food timing.
- Calcium-channel blockers: labels and consensus (raise levels; nicardipine named) vs liver guideline (amlodipine/felodipine minimal interaction, Strong, Level 5).
- ACE inhibitors/ARBs: liver guideline recommendation vs label potassium cautions.
- BK: viruria-to-DNAemia interval two ways; IVIG abstract vs Table 7; confirmation interval three ways; Table 6 two strategies with different CNI targets (numbers not shown).
- Aspergillosis prophylaxis in lung recipients: IDSA 2016 (3 to 4 months) vs IDSA 2026 (no recommendation either way).
- ISHLT internal: amiodarone "minimal interaction" vs Table 5; fever threshold wording; PJP prophylaxis duration 2010 vs 2023; seizure statement (reduce CNI) vs surgery-section instruction not to modify immunosuppression.

## Open: editorial choices to confirm

- Lung consensus labels: "reached consensus" / "barely reached consensus" (within 0.25 of the document's 2.5 bar; editor's label) / "did not reach consensus"; "votes widely spread" marker at SD 1.7 or more (editor's).
- Card boxed order: uncategorised boxed hazards first (departs from strict label order). Tacrolimus box split infection then malignancy (sentence order) though the box title says malignancies first.
- Cyclosporine-modified: boxed hypertension and nephrotoxicity rows headed "(psoriasis box)".
- Complaint mappings and lethality tiers for the seven transplant toxicities (author proposals); new complaints `tremor`, `less-urine`.
- Editor abbreviations: FK506, CsA, CyA pin; "tac" cannot pin (collides with `unilateral-facial-pain-hub` synonym for trigeminal autonomic cephalalgia; Home returns SVT). Brief requires abbreviations to land: Andy to decide whether to change that synonym.
- Shared drug names (e.g. rituximab) pin to the oncology card; transplant copy reached inside the consult.
- Pharmacy-colliding cards (prednisone, methylprednisolone, fluconazole, voriconazole, acyclovir, TMP-SMX): Home opens Pharmacy first.
- Borrowed oncology toxicity rows on shared cards open oncology routing pages (accepted for v1 by reviewer).
- Hyperkalemia row -> `potassium`/`k-hyper-ecg` (fits). Post-transplant diabetes row -> `diabetes-management`/`dm-new-dx` (weak fit) until the chronic-tier entry exists.
- Cyclosporine overdose line keeps the label's observed 10 g exposure.
- rejTox card line paraphrases the label caveat to fit 200 characters ("Cr", ">200").
- CMV "record weight, creatinine and blood count at first dose" note sits in the dosing overlay.
- Source choices: no Rapamune or Cytovene brand label on DailyMed (generics listed); IVIG brand (Privigen) arbitrary; Gengraf has no "Revised" text (effective date only).
- Pages with no primary guideline: PRES, transplant TMA, pancreas. Cyclosporine has no current monitoring consensus.
- Approach tree is not a `-hub` file; Andy approved reviews as a tier. Confirm it need not meet the stricter hub citation rule.
- New clinical dosing entries for review: IV ganciclovir and valganciclovir (bands verified from Table 5 image and gated by test). Gaps: which body weight for mg/kg; no max dose; no contraindication/caution lists yet (add from labels).

## Editor notes approved by Andy as written (the nine below, shown verbatim to him before approval)

CMV first-dose note; heart (reach the centre and medicines; pacing pads early; ask team or transplant pharmacist before adding or stopping a drug); liver (name suspected vascular compromise at the first call); lung (time of last dose next to the level; arrange bronchoscopy and biopsy with the team); BK (raise BK with the team; tell the team the test was sent and which laboratory ran it). Then approved ("approve the remaining editor notes"): the five shown to him at that point — liver overlay note that Table 4 is not a complete interaction list; BK urinary-symptoms link note; CMV handover note (organ, transplant date, CMV status, when prophylaxis ended), CMV specimen-type note, CMV pre-discharge checks note. Any editor note written AFTER this point (e.g. in the PRES/TMA fold, the approach tree, later pages) is not covered and must be shown to him.

## Q15: settled — fold both

PRES and TMA folded into the toxicity page (neurotoxicity row -> `tpe-cni-brain`, possibly split with `tpe-cni-seizure`; TMA -> one node `tpe-cni-tma`). Promote back to pages if the review papers bring real guidance. Also being fixed: late-encephalopathy sentence mis-graded "Class I, C" in the toxicity and heart overlays (2023 column carries no grade).

## Editor notes (original list, for reference)

- Heart: "ask the patient how to reach the transplant centre and which medicines they take"; "apply pacing pads early when a recipient is symptomatic with a slow rate"; "before adding or stopping any drug, ask the transplant team or a transplant pharmacist whether it changes immunosuppressant levels".
- CMV first-dose note (HIGH STAKES): "the guideline does not say whether to start an antiviral in the ED before a result is back; agree this with the transplant team before the first dose." (shown once earlier in a longer form)
- Liver: "name suspected vascular compromise to the transplant team at the first call"; overlay note that Table 4 is not a complete interaction list.
- Lung: "write down the time of the last immunosuppressant dose next to the level. The sources give no timing rule."; "arrange bronchoscopy and biopsy with the transplant team; the documents do not say who performs them."
- BK (reworded after trim): "in a kidney transplant recipient with new graft dysfunction, raise BK with the transplant team"; "tell the transplant team the test was sent and which laboratory ran it"; urinary-symptoms link note.

## Conflicts and gaps found in existing content (nothing edited)

- `onc-drug-side-effects`: citation numbers unstable between loads on 47 drug cards (async numbering race); "Transplant conditioning" cancer-type page renders Not found; earlier open items (CRS wording, `hypotension-workup` entry) unchanged.
- `svt`: critical action adenosine 6 mg then 12 mg; adenosine node says 3 mg for a transplanted heart.
- `bradycardic-arrest`: isoproterenol 2 to 10 mcg/min for denervated hearts (line 152) has no ISHLT source.
- `afib-rvr`: diltiazem with no note on immunosuppressant levels.
- `cardiogenic-shock`, `sepsis`: ketamine for induction vs ISHLT Table 14 caution in heart recipients in extremis.
- `ventricular-tachycardia`, `wide-complex-tachycardia`: no transplant text (guideline asks biopsy and angiography after sustained VT).
- `hypertensive-emergency-adult`: nicardipine as common titratable choice (line 169); no transplant text.
- `status-epilepticus`: phenytoin, phenobarbital with no transplant text (tacrolimus label: strong inducers; ISHLT: avoid in heart recipients).
- `potassium` and drug store: fludrocortisone for tacrolimus hyperkalemia unsupported by any source read here.
- `torsades-de-pointes`: tacrolimus not listed among QT-prolonging drugs.
- `ecmo`: "not a transplant candidate" absolute and "severe immunosuppression" relative VV contraindication; no branch for existing recipients.
- `sepsis`, `pneumonia`: MRSA/Pseudomonas/fungal cover via risk-factor lists that do not name transplant; `sepsis` azithromycin, `gi-bleed-hub` pantoprazole (liver Table 4: macrolides, PPIs raise CNI levels); `gallbladder` cholangitis timing and tobramycin not written for recipients.
- `adult-uti`: fluoroquinolones for complicated UTI with renal transplant always complicated; BK guideline's fluoroquinolone statement is about BK only (no direct conflict).
- `diabetes-management`/`dm-new-dx`: no drug-induced or post-transplant diabetes.
- `hiv`: PJP treatment dose present; drug store TMP-SMX lacks a PJP treatment indication (compare when PJP page is written).
- `nonspecific-unwell-elderly-hub`: no Stop page. `chest-pain-hub`: nodeCount 16 in categories vs 29.
- No consult exists for PRES, AKI, hepatic encephalopathy, ascites/SBP, standalone cholangitis.
- Stale instructions: tree-builder skill points at the dead fork; project CLAUDE.md says register in `src/data/trees/index.ts`.

## Waiting on Andy

- PDFs into `research/transplant-sources/supplied/`: Fishman AJT 2017; Fishman NEJM 2007; AST IDCOP 2019 chapters (CMV 13512, PJP 13587, diarrhea 13550, PTLD 13652, Cryptococcus 13543, Aspergillus 13544, Candida 13623, BK 13528); IDSA/SHEA 2021 C. difficile update; Fugate 2015 and Hinchey 1996 (PRES); EASL 2024; Woodcock 2020; IDSA 2010 cryptococcal; four ED reviews.
- Read of the local preview.
- Commit, push, deploy, Supabase: only on explicit word.

## Fable review 2 of 4 (first class end to end): APPROVE WITH CHANGES

Remaining classes were started at Andy's instruction before this review returned; the eight card authors were sent the card-rule changes mid-flight.

MUST before scaling (being applied to the model class; rules sent to authors where they concern cards):
1. Call-the-team sentence not visible where needed (cards deep-link past entry nodes; summaries show "consider reduction or discontinuation" alone). Proposed: "(transplant team decides)" inside any summary or critical action naming a change to an immunosuppressant; shared note first in critical actions. NEEDS ANDY (new wording; verifiers previously struck ownership claims as unsourced).
2. Cards carry prescriber actions with no team note. Proposed: one consult-level line under every transplant card's identity block carrying the approved sentence (engine: one optional config string; oncology unaffected).
3. Nicardipine framing invites withholding treatment. Remove "no source says which is right"; state the label's action (monitor trough, reduce if needed) and that no label read says to avoid it; lead the blood-pressure page with the Prograf sentence.
4. Historical label treatments read as instructions on cyclosporine cards (streptokinase/heparin for TMA; forced emesis/lavage; assay-era toxicity-vs-rejection numbers). Move to overlay. Remove the hemolytic-anemia "Stop the drug." quote from the bedside node (keep in this file).
5. Two timing badges mislead read alone (cyclosporine "mild nephrotoxicity: 2-3 months"; Prograf diabetes median 68 days). Rule: a badge covers the row's whole hazard or there is no badge.
6. "Also on the label" unusable at 42-46 lines. Engine change: optional `interactions` list on a drug rendered as its own collapsed section with six fixed heads; remaining list 12 lines or fewer, ED-relevant first.
7. Build provenance in bedside text (file names, line numbers, "(searched)", "No source read here"). App content lines name the consult only, one per node; evidence stays in the ledger; silence wording "Not in the labels or guidelines used:".
8. Nodes that end on silence leave nothing to do (blood-pressure disposition; seizure; non-trough level; PRES). Rule: silence line, nearest sourced fact, the consult to run, who decides. Needs owner-approved editor notes.

SHOULD: toxicity page as a hub ordered by danger with leaves going to disposition, interaction nodes merged, IV products to overlay (9-10 nodes); summaries 30 words or fewer, no quotation marks; critical actions that are actions (one is 26 words: gate red); row targets (hepatotoxicity -> hepatitis-start is wrong first page for a liver recipient; no row without a live page summary); mechanism 120 characters, plain words; row lines with at most one figure.

OWNER DECISIONS raised by the review:
- Q-R1 Seizing recipient: approve an editor note to run Status Epilepticus first-line unchanged and state which second-line agents the heart guideline's avoid-list names and does not name?
- Q-R2 Hypertensive emergency or PRES on a calcineurin inhibitor: approve "use Hypertensive Emergency (Adult) unchanged; tell the team the agent; the level is rechecked later"?
- Q-R3 Keep infection and malignancy boxed rows as rows 1 and 2 on every immunosuppressant card, or compact them so drug-specific rows show first?
- Q-R4 Tier table: hyperkalemia, torsades, seizure/PRES tier 1 for ED purposes? One signed tier and complaint-mapping table for all classes.
- Q-R5 Sibling products: should the Prograf card show that extended-release labels add rows (e.g. rhabdomyolysis), or each card strictly its own label?
- Q-R6 May obsolete label treatments live only in overlays?
- Q-R7 What should infection and PTLD rows show until their pages exist?
- Cyclosporine-modified "(psoriasis box)" rows: reviewer recommends keep the boxed flag, drop the rank promotion and the tag.
- Complaint mapping gaps: infection lacks diarrhea/abdominal pain and headache; malignancy only rash; kidney injury mapped to a hyperglycaemia complaint; TMA lacks confusion and fever; no seizure complaint.
- Label-only gaps flagged (no content supplied): few timings; no NSAID line on tacrolimus cards while cyclosporine has one; diarrhea raising tacrolimus levels only in overlay; rhabdomyolysis on XR cards but not Prograf; no rejection/under-immunosuppression row; box heads lead with administrative items.

Process change for the fan-out (reviewer): ledger first, verify ledger rows once, assemble nodes only from verified rows, one meaning check on summaries and critical actions; hard scripted budgets before any verifier runs; verifiers fix by narrowing or deleting, never by appending.

## Q16: settled

Any summary or critical action that names reducing, holding, stopping, withdrawing or substituting an immunosuppressant carries the parenthetical "(call the transplant team first)" in the same sentence. Every transplant card shows, under its header, the approved sentence "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant." (consult-level config line; oncology unaffected). The shared note goes first in each page's critical actions.

## Valganciclovir / ganciclovir dosing entries: settled

Keep the 2025 CMV consensus guideline's treatment dosing (kidney-function bands) in the drug-store entries and show both sources. Each line states which source it rests on. Beside the guideline's lines show, from the label: haemodialysis statement (Valcyte tablets should not be used in adults on haemodialysis; no dose recommendation can be given; adults should use tablets, not oral solution) next to the guideline's 200 mg three times a week oral-solution band; the blood-count thresholds below which the labels say the drug should be avoided / is not recommended (ANC under 500, platelets under 25,000, haemoglobin under 8) next to the guideline's "do not reduce the dose for leukopenia alone"; the boxed warning and the hypersensitivity contraindication. State that the label indication is prevention and that treatment dosing is the guideline's; note the bands equal the labels' retinitis-induction columns. To be applied in the integration round; the dose-band test must keep passing.

## Card-fan-out findings to settle with the tier table (collected from eight groups)

- Interaction heads: add "Adds marrow risk:" (and combined "Adds marrow and kidney risk:" / "Adds marrow or kidney risk:" as the ganciclovir labels word it), "Lowers the other drug:", and "Falls when it stops:" (azole discontinuation; safety fix). Lines no head fits stay as plain drug-named lines beside the block.
- Organ-less cards (labels name no transplant organ): prednisone, methylprednisolone, all PJP prophylaxis drugs, acyclovir, valacyclovir, ganciclovir, the azoles, IVIG, eculizumab, tocilizumab and the three shared oncology cards. Proposal: list under an "All organs (label names none)" group.
- Sibling/cross-label lines: sirolimus card "avoid" voriconazole and silent on posaconazole vs azole labels "contraindicated"; tacrolimus cards "monitor, reduce if needed" for fluconazole vs Diflucan "up to 5 times" oral. Proposal: attributed cross-reference lines quoting the other label.
- Methylprednisolone: about 30 hazards across Medrol and Solu-Medrol; cannot meet the 12-line cap. Options: relax the cap for it, or split oral and IV cards.
- Timing rule: allow a stated time unit without a digit ("minutes to hours after re-challenge").
- Existing-consult notes: `methemoglobinemia` start node gives methylene blue with no G6PD caveat and its G6PD node says "contraindicated" (dapsone label: "fully expressed" deficiency) — link dapsone row to the G6PD node; `torsades-de-pointes` names fluconazole but not voriconazole or posaconazole; page node tpe-cni-interactions is tacrolimus-only and calls fluconazole mild or moderate.
- Sources: IV acyclovir SPL downloaded empty (card is oral-label only; get a usable IV label); Imuran label prints "Revised 09/2026" (after its SPL date); Myfortic label prints skin carcinoma "12% conversion" (probable error; not carried); no Rapamune-branded SPL on DailyMed (Mylan sirolimus tablets marked RAPAMUNE).
- CORRECTION (orchestrator error): KDIGO 2009 was never missing. It has been saved since the first source run (KDIGO_transplant_recipient_2009_guideline.pdf, 168 pages; manifest OPEN-SAVED). Andy was wrongly asked to supply it. The kidney page is not blocked on it. KDIGO quotations in the off-label report were verified verbatim against the PDF.

## Q17: settled (Option B, both)

Approved as fixed text (verbatim only):
- Seizure node: "Editor note: run the Status Epilepticus consult's first-line treatment unchanged; before a second-line agent, check it against the list above and call the transplant team."
- Neurotoxicity/PRES node and hypertension disposition node: "Editor note: use the Hypertensive Emergency (Adult) consult unchanged; tell the transplant team which agent was started; the drug level is rechecked afterwards."
These are Andy's clinical instructions (no source says "unchanged"); the sourced facts stay beside them. NOT approved: the level-node note about non-trough levels and vomited doses.

Approved editor notes are now a fixed list used character for character; any other "Editor note:" line on a page is a defect. Navigation lines read "Related consults:" and make no clinical statement.

## Still to put to Andy with the tier table (my recommendations, not yet approved)

- IVIG card limited to what Privigen, Gammagard Liquid and Gamunex-C labels share (not Privigen-only).
- Keep tocilizumab and alemtuzumab cards, each with an editor note quoting exactly what the guidelines say (tocilizumab: ISHLT IIb C rescue, insufficient data for routine use; alemtuzumab: no recommendation; KDIGO: small studies fail to show benefit outweighing harm as induction).
- Transplant-use editor notes for IVIG, rituximab, eculizumab, bortezomib as verified (carry the liver guideline's "insufficient data in chronic AMR" sentence; fix the two inexact quotes; rituximab wording from e59/e26).
- Cross-reference lines between sibling labels (sirolimus vs voriconazole/posaconazole; tacrolimus vs fluconazole).
- Label vs guideline: Actemra says avoid with biologic DMARDs; ISHLT lists tocilizumab beside belatacept and anti-CD20 as rescue.
- Oncology pages borrowed by transplant rows (lung toxicity, fluid retention, thromboembolism, nephrotoxicity) close with "treating oncologist".

## Tier table and structural questions: APPROVED ("approve all") — structural choices, no number forks

Tier 1 (can kill within hours): serious infection; anaphylaxis/infusion reaction/cytokine release (-> anaphylaxis consult); low blood counts (-> new short page opening with fever plus low neutrophils); neurotoxicity/PRES/seizure (moved up); hyperkalemia (moved up; -> potassium); QT/torsades (moved up; -> torsades-de-pointes); adrenal insufficiency (-> adrenal-insufficiency); GI bleeding and perforation (-> gi-bleed-hub, abdominal pain perforation node); angioedema (-> angioedema); graft thrombosis (-> liver vascular node; kidney page); meningococcal infection (-> meningitis); methemoglobinemia (-> methemoglobinemia, G6PD node); shock/hypotension (-> hypotension-workup).
Tier 2: kidney injury from the drug; TMA; haemolysis (-> hemolytic-anemia); hypoglycemia (-> hypoglycemia); hyponatremia (-> sodium); liver injury; pancreatitis; pneumonitis; severe skin reactions; thromboembolism.
Tier 3: malignancy/PTLD; post-transplant diabetes and steroid hyperglycemia (-> hyperglycemia-ed); hypertension; embryofetal toxicity; serum sickness; visual disturbance.
Plain lines, not categories: pure red cell aplasia; acute inflammatory syndrome; DRESS; wound healing; proteinuria; hyperlipidemia; steroid psychiatric effects; aseptic meningitis; TRALI; bronchial dehiscence (box only).
Boxed hazards still lead each card regardless of tier.

Structural (all approved as recommended):
1. Organ-less cards listed under "All organs (label names none)".
2. Interaction heads add "Adds marrow risk", "Lowers the other drug", "Falls when it stops"; unfitting lines stay plain, drug-named, beside the block.
3. Cross-reference lines between sibling labels, each a quotation attributed to the other FDA label.
4. Methylprednisolone: 12-line cap relaxed for this card; one card, not split.
5. Timing badges may use a stated time unit without a digit.
6. IVIG: one card limited to what the three brands' labels share; brand-specific statements attributed in "Also on the label".
7. Keep tocilizumab and alemtuzumab cards, each with an editor note quoting exactly what the guidelines say.
8. Transplant-use editor notes for IVIG, rituximab, eculizumab, bortezomib as verified (guideline, grade, scope).
9. Infection and malignancy boxed rows stay rows 1 and 2; Andy to look at a real card in preview before any compaction.
10. Transplant rows do not link to oncology pages that close with "treating oncologist"; link to a transplant page or a general consult, else the hazard stays a plain line.

## Approved editor notes, verbatim (owner, 2026-11-21)

The owner approved the full list below on 2026-11-21, including "Editor note: record weight, creatinine and a blood count at the first dose." These are FIXED text: never trimmed, reworded or added to without the owner. The enforcing copy is `scripts/fixtures/transplant-approved-editor-notes.json` (the page test fails on any "Editor note:" sentence not in it; an approved note used whole as a critical action is exempt from the 25-word limit, nothing else is). 25 notes:

1. Editor note: apply pacing pads early when a recipient is symptomatic with a slow rate.
2. Editor note: arrange bronchoscopy and biopsy with the transplant team.
3. Editor note: ask the patient how to reach the transplant centre and which medicines they take.
4. Editor note: ask which calcineurin inhibitor product the patient takes and how to reach the transplant centre.
5. Editor note: before adding or stopping any drug, ask the transplant team or a transplant pharmacist whether it changes the immunosuppressant level.
6. Editor note: before discharge on oral therapy, check the patient can swallow and keep down tablets, that the repeat CMV DNA, blood count and creatinine are booked, and that the patient knows whom to call.
7. Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.
8. Editor note: disposition is decided with the treating transplant team.
9. Editor note: give the Sepsis consult's empiric antibiotics without delay; the febrile neutropenia pathway's risk score is written for cancer patients; call the transplant team.
10. Editor note: in a kidney transplant recipient with new graft dysfunction, raise BK with the transplant team.
11. Editor note: involve a poison centre or a medical toxicologist and the transplant team.
12. Editor note: name suspected vascular compromise to the transplant team at the first call.
13. Editor note: record weight, creatinine and a blood count at the first dose.
14. Editor note: run the Status Epilepticus consult's first-line treatment unchanged; before a second-line agent, check it against the list on this page; tell the transplant team which agent was given.
15. Editor note: send the CMV QNAT from the ED and tell the transplant team which specimen type (plasma or whole blood) was sent, because the guideline asks that monitoring use the same specimen type and assay.
16. Editor note: tell the transplant team the creatinine trend, the drug level and the time of the last dose together.
17. Editor note: tell the transplant team the organ, transplant date, donor and recipient CMV status, and when prophylaxis ended or rejection was treated.
18. Editor note: tell the transplant team the test was sent and which laboratory ran it.
19. Editor note: tell the transplant team which blood pressure drug is being given or planned, and any calcineurin inhibitor level drawn.
20. Editor note: the guideline does not say whether to start an antiviral in the ED before a result is back; agree this with the transplant team before the first dose.
21. Editor note: the interaction list above is the guideline's Table 4 (calcineurin inhibitor rows) and is not a complete list of interacting drugs; tell the transplant team about any drug started or stopped in the ED.
22. Editor note: urinary symptoms or an abnormal urinalysis in a transplant recipient still need their own assessment: [Adult UTI](#/tree/adult-uti).
23. Editor note: use the Hypertensive Emergency (Adult) consult unchanged; tell the transplant team which agent was started; the drug level is rechecked afterwards.
24. Editor note: write down the time of the last immunosuppressant dose next to the level.
25. Editor note: write the time of the last dose and the time of the blood draw on the lab request.

### Settled 2026-11-21 (owner)

- The fever-with-low-neutrophils note is approved (the Sepsis consult's empiric antibiotics without delay; the febrile neutropenia risk score is written for cancer patients; call the transplant team).
- The seizure note is reworded as in the list above (run Status Epilepticus first-line unchanged; check a second-line agent against the list on this page; tell the transplant team which agent was given).
- "(call the transplant team first)" applies to starting rejection treatment on all organs.
- The vascular note ("name suspected vascular compromise to the transplant team at the first call.") is reused on the kidney page.
- Lung consensus-strength qualifiers live in node bodies only (not in summaries or critical actions).
- The voriconazole cross-reference on the Zortress card is approved.
- Hepatic artery thrombosis becomes a row on the sirolimus and Zortress cards (category `tx-hepatic-artery-thrombosis`, tier 1, page tpe-liver-vascular).
- Serious infection on the rituximab and alemtuzumab cards links to the transplant infection page once that page is written; until then it stays a plain boxed line.
- STILL OPEN (shown as "sources differ"): forks between numbers: adenosine, tacrolimus targets, G-CSF.
