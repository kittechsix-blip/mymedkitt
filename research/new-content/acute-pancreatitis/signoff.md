# Acute Pancreatitis — Ranson sign-off (DRAFT, not deployed)

Status: DRAFT for Andy and Dr. Kitlowski. Nothing here is deployed. Companion to `patch.md`.
Primary sources were re-opened on 2026-10-27 through PubMed records (PMID 4834279, 941075, 7051819). Full texts were not retrieved.

## Verified primary sources

| Paper | Retrieved | What it supports |
|---|---|---|
| Ranson 1976, Surg Gynecol Obstet 143(2):209-19, PMID 941075 | Abstract (PubMed, via Alexandria) | Non-gallstone admission and 48-hour cutoffs (all 11 signs). Operators listed under Conflicts C8 and C2. |
| Ranson 1974, Surg Gynecol Obstet 139(1):69-81, PMID 4834279 | PubMed record only; **no abstract** | Nothing verified. Band table (C1) not retrieved. |
| Ranson 1982, Am J Gastroenterol 77(9):633-8, PMID 7051819 | PubMed record only; **no abstract** | Nothing verified. Gallstone cutoffs (C2, C3, C8) attributed here by secondary summaries only. |

## Conflicts (both sources)

- **C1 Band cutoffs and mortality.** Band split 0-2 / 3-4 / 5-6 / 7 or more comes from a reference summary citing Ranson 1974. The 1974 table was not retrieved (no PubMed abstract). Earlier mortality figures (about 2%, 15%, 40%, and near 100% for the top band) are **not carried** in any app text. Status: open.
- **C2 AST cutoff and units.**
  - Non-gallstone, primary 1976 abstract: AST **>250 Sigma-Frankel units per 100 mL**.
  - Draft text: **>250 IU/L** (unconverted).
  - Gallstone, one reference: >250, recorded as IU/100 mL. Other teaching: a lower value.
  - Action taken: non-gallstone text now shows the abstract's units and says IU/L was not converted. No conversion was made. Status: open.
- **C3 Gallstone base deficit.** One reference gives >4 mEq/L. Other teaching gives >5 mEq/L. Both are shown. Neither is chosen. Status: open.
- **C6 Severe threshold (Ranson ≥3).** Two sources now disagree on sourcing:
  - Node text says "commonly taught as severe, unsourced". This is kept pending sign-off.
  - Primary 1976 abstract: in 200 prospectively followed patients, 24 of 38 with three or more early positive signs were seriously ill or died, against 1 of 162 with fewer than three. The abstract does not define "serious illness" in the text retrieved.
  - So the threshold has a primary association, but not a severity band. Andy decides the wording.
  - Parent-tree critical action (`acute-pancreatitis.ts`, "BISAP score ≥3 or Ranson ≥3 = severe pancreatitis (ICU candidate)") is **pre-existing text and was not edited**. Status: open.
- **C8 BUN operator.**
  - Non-gallstone, primary 1976 abstract: BUN increase **over 5 mg%**, i.e. >5 mg/dL.
  - Earlier draft: ≥5 mg/dL, with one summary writing >5.
  - Action taken: non-gallstone text and calculator now use **>5 mg/dL**. The abstract supports this. Andy to confirm against the full text.
  - Gallstone BUN >2 mg/dL: unconfirmed. Status: open for gallstone.
- **C9 Points-0 switches.** `calculator.ts` must treat the gallstone and 48-hour switches as adding nothing. The other session owns `calculator.ts`; not touched here. Status: integrator.
- **C10 Etiology unknown.** No sourced rule says which set to score. Status: workflow decision for Andy.

## Open questions

- Ranson 1974 primary table: mortality by score, and whether bands apply to both etiology sets. Needed before any mortality figure is shown.
- Full text of Ranson 1976 and 1982: gallstone AST, base deficit and BUN cutoffs and units (C2, C3, C8).
- Whether the 1976 "serious illness" definition should be quoted anywhere (C6).
- Whether the top band should be split again (7-8, 9-11) after full-text review. The current design uses one band, 7 or more, per the task.
- Papachristou 2010 AUC table, and ACG 2024 severity text (not retrieved).
- Glasgow-Imrie: omitted (no source).
- Whether a revised Ranson (AST removed, cutoff 3.5) should be added (needs primary).

## Unsourced statements (in node or calculator text)

- "after IV hydration" qualifier on the BUN item. Not in the 1976 abstract. From secondary summaries.
- Gallstone sequestered fluid >4 L. Secondary only (1982 not abstract-verified).
- Gallstone hematocrit, calcium and BUN items. Secondary only.
- "Ranson 3 or higher is commonly taught as severe." Teaching point (see C6).
- "Ranson does not direct therapy" and the "Persistent organ failure >48 h = severe" line. These restate the Atlanta 2012 definition from the parent citation #3 and were not re-verified here.
- Atlanta 2012 wording in the result nodes. Paraphrase, re-verify exact text.
- Calculator description "Score the five admission items on arrival…" and the 48-hour item order. Workflow text, not sourced.

## Sign-off checklist

For Andy:
- [ ] Non-gallstone set (age >55, glucose >200, WBC >16,000, LDH >350, AST >250 Sigma-Frankel, Hct fall >10, calcium <8, base deficit >4, BUN >5, sequestered fluid >6 L, PaO₂ <60) matches the 1976 abstract. Full text reviewed or accepted from abstract.
- [ ] C2: AST units. Decide whether non-gallstone AST stays as "AST >250" with the Sigma-Frankel note, or is converted with a sourced factor.
- [ ] C3: gallstone base deficit (>4 or >5). Choose or keep both shown.
- [ ] C8: gallstone BUN operator and value. Non-gallstone changed to >5 (confirm).
- [ ] C1: band cutoffs 0-2 / 3-4 / 5-6 / 7 or more. Accept as provisional, or hold until Ranson 1974 full text.
- [ ] C1: mortality figures. Keep them out, or supply primary-sourced figures.
- [ ] C6: Ranson ≥3 wording in the start node, the 3-4 node and the total node. Decide whether the 1976 association is cited.
- [ ] C6: parent-tree critical action "Ranson ≥3 = severe (ICU candidate)". Decide whether to keep, edit or remove. Not edited.
- [ ] C10: etiology-unknown workflow.
- [ ] Gallstone set: keep as provisional, or hide until C2, C3 and C8 are resolved.

For Dr. Kitlowski:
- [ ] Citations #22-24 match the PubMed records (titles, journal, volume, pages, PMIDs 4834279, 941075, 7051819).
- [ ] Parent citations #3 (Banks 2013) and #4 (Wu 2008) cover the BISAP and Atlanta statements the Ranson nodes now cite.
- [ ] Result-node recommendations contain no escalation directive beyond the pending C6 wording.
- [ ] Calculator banding matches the node bands (0-2, 3-4, 5-6, 7 or more) and the max totals (11 non-gallstone, 10 gallstone).
- [ ] Integrator: `calculator.ts` registers `ranson` and treats the two points-0 switches as adding nothing (C9) before any calculator link is shown.

---

## Dr. Kitlowski audit (2026-10-27), Ranson additions only

Verdict: **REVISE. Not safe to deploy yet.** Two items need Andy's decision before any deploy: F1 (calculator scores unentered items as "no") and F2 (parent critical action contradicts the Ranson nodes). Nothing in the Ranson text was changed by this audit.

Scope: `acute-pancreatitis-ranson-nodes.ts`, `components/ranson.ts`, the Ranson wiring in `trees/acute-pancreatitis.ts` (import, `...RANSON_NODES`, `...RANSON_CITATIONS`, `ap-severity` calculatorLinks and body line), toolbar entry `ranson` on `acute-pancreatitis`. Pre-existing ap-* text was not audited.

### Primary sources re-opened (PubMed efetch, 2026-10-27)
- PMID 941075 (Ranson 1976, Surg Gynecol Obstet 143(2):209-19): abstract lists the 11 signs. Matches the node and calculator for age >55, glucose >200, WBC >16,000, LDH >350, Hct fall >10 points, calcium <8, base deficit >4, BUN increase >5, sequestered fluid >6 L, PaO2 <60. AST is written as **>250 Sigma Frankel units per 100 mL**. The app shows ">250" beside IU/L (see F3). Association for the early-sign count: 24 of 38 with three or more signs were seriously ill or died, against 1 of 162 with fewer than three. "Serious illness" is not defined in the abstract.
- PMID 4834279 (Ranson 1974) and PMID 7051819 (Ranson 1982): PubMed records only, no abstract. Band cutoffs and every gallstone number remain unverified.
- PMID 18519429 (Wu 2008, parent #4): BISAP items BUN >25 mg/dl, impaired mental status, SIRS, age >60, pleural effusion, within 24 h. Matches the node.
- PMID 23100216 (Banks 2013, parent #3): severe = persistent organ failure >48 h. Matches ranson-result-low. Moderately severe also includes exacerbation of co-morbid disease (not in the parent ap-severity text; out of scope).
- Citation text #22-24 (titles, journal, volume, pages, PMIDs) matches the PubMed records.

### Auto-fixes applied
None. No clinical or citation text was changed. Every candidate fix either changes a number a clinician scores against or changes the directive text, so each goes to Andy under the two-source rule.

### Flagged for Andy
- **F1 (REVISE, patient safety, structural).** The calculator cannot tell "not yet entered" from "no." With the 48-hour switch ON, unkeyed items score zero. Run on the calculator as written: 1 admission item with the switch ON and no 48-hour items gives "0-2, 1 / 11". Five admission items with 2 of 5 48-hour items keyed gives "7 or more, 7 / 11". Nothing on the result warns that items were skipped, although the node says a missing value makes the score incomplete. Fix needs a design choice: explicit yes / no / not done per item, or no total until every item is answered.
- **F2 (REVISE, directive conflict).** Parent critical action in `acute-pancreatitis.ts` (`ACUTE_PANCREATITIS_CRITICAL_ACTIONS`, nodeId `ap-severity`): "BISAP score ≥3 or Ranson ≥3 = severe pancreatitis (ICU candidate)". The new Ranson nodes say the ≥3 threshold is unsourced and "do not act on it as an instruction." Both are on the same severity screen. Andy decides which text stays. The 1976 abstract supports an association for three or more signs (F-note above) but does not establish a severity band. Not edited (pre-existing clinical directive).
- **F3 (C2, AST units and threshold).** 1976 abstract uses Sigma Frankel units per 100 mL. Current text shows ">250" next to IU/L with no conversion. Gallstone AST: one reference gives >250 (recorded as IU/100 mL), other teaching gives a lower value. Andy decides the unit and the number.
- **F4 (C3, gallstone base deficit).** Calculator label reads "Base deficit >4 mEq/L (48 h)" for both modes. The gallstone value is >4 in one reference and >5 in another. The label should not read as the gallstone value until decided.
- **F5 (C8, BUN operator).** 1976 abstract: "increase over 5 mg%", so >5 is primary-supported and the current text matches it. Secondary summaries say ≥5. Gallstone BUN >2 mg/dL is unconfirmed but is an active item in the gallstone node and calculator. Andy confirms.
- **F6 (C1, band cutoffs 0-2 / 3-4 / 5-6 / ≥7).** Come from a reference summary of Ranson 1974, which has no retrievable abstract. Result nodes cite [22] and [24] for these bands. That attribution is unverified. Andy decides whether to keep the bands as provisional or cite a verified source.
- **F7 (citation gate, gallstone set).** Gallstone admission and 48-hour cutoffs (ranson-admit-gs, ranson-48h) are cited to [24] (Ranson 1982). That record has no abstract, so those numbers are not verified against the cited paper. Keep provisional, or hide the gallstone branch, until the full text is read.
- **F8 (clinician-facing draft tags).** Node bodies and calculator strings carry internal tags ("patch C1", "C6", "C8", "pending clinician sign-off", "unsourced"). These must be rewritten once F1-F7 are decided, not shipped as-is.
- **F9 (C10, etiology unknown).** No sourced rule says which set to score. The calculator scores one set per run. Andy decides the workflow wording.
- **F10 ("Ranson does not direct therapy").** Stated in ranson-start with [3] attached. Banks 2013 does not say this. Unsourced statement; reword or drop.

### Drug-store entries
The Ranson additions and the pre-existing `acute-pancreatitis` consult have no drug-store links (no `#/drug` references and no drug link fields). No drug entries were added or are needed for this consult. Pre-existing text names antibiotics, morphine, insulin and lactated Ringer without drug-store links. That text is out of scope for this audit.

### Verified as matching
- Non-gallstone admission cutoffs (age, WBC, glucose, LDH, AST value) and the 48-hour non-gallstone items, against PMID 941075.
- Calculator max totals: 11 non-gallstone (5+6), 10 gallstone (5+5, no PaO2). Bands 0-2, 3-4, 5-6, 7+ in code match the nodes.
- Edge test run: `scoreRanson` / `computeResult` checked with the cases in F1. Admission-only output shows INCOMPLETE. The 11/11 and 10/10 totals are correct.
- Calculator registered (`calculator.ts`, key `ranson`) and toolbar entry present, both in HEAD. The point-0 switches (C9) are handled as documented.
- Filtered `tsc --noEmit --skipLibCheck --noUnusedLocals false` shows no errors in the Ranson or acute-pancreatitis files.

### Path to APPROVE
1. Andy decides F1 (calculator design) and F2 (severity directive). Both are required before deploy.
2. Andy decides F3 to F6 and F9. Keep the gallstone set hidden, or labelled provisional, until F3, F4, F5 and F7 are resolved.
3. Re-audit after the rewrite, with F8 tags removed.

## Fixed after Dr. K audit (2026-10-27, mechanical only)
- Removed draft and sign-off tags (patch C1/C2/C3/C6/C8, "pending sign-off", "unsourced") from clinician-facing text in `src/data/new-content/acute-pancreatitis-ranson-nodes.ts` and the Ranson calculator descriptions in `src/components/ranson.ts`. Caveats are kept as plain clinical wording. No number was changed.
- Header comments in both files no longer say DRAFT. Tags remain only in this file.


### Ruling 4 (Andy, 2026-10-27)
F2 RULED: existing critical action reworded to 'BISAP >=3 = high risk, ICU candidate. Ranson >=3 flags severe disease (needs 48 h of data); it does not decide ICU on its own.' (acute-pancreatitis.ts, FINAL critical action; only existing-text change in this build, per Andy).


### Ruling 5 (Andy, 2026-10-27)
F1 RULED: Ranson calculator now takes a count of 48-hour items resulted; final score only when all are resulted, otherwise INCOMPLETE with the count shown (an unmeasured item no longer counts as No). 18/18 calculator tests pass.

## Applied recommendations (2026-10-27)

Rows 3-10 of `research/new-content/RECOMMENDATIONS.md` (Ranson). Files changed: `src/data/new-content/acute-pancreatitis-ranson-nodes.ts`, `src/components/ranson.ts`. Tree wiring and the test file were not changed (no row required it). Sources read this session: PubMed 941075 (Ranson 1976, abstract read); PubMed 4834279 (Ranson 1974, record only, no abstract); PubMed 7051819 (Ranson 1982, record only, no abstract). Gallstone numbers were checked only against secondary calculator pages in search snippets, not against the primary text.

- Row 3, AST units: **applied.** Non-gallstone shows ">250 Sigma-Frankel units/100 mL (1976 abstract; convert per lab)". Gallstone uses the same unit wording. No IU/L conversion. Source: 941075 abstract ("over 250 Sigma Frankel units per cent").
- Row 4, gallstone base deficit: **applied.** Both values shown (>4 in one reference, >5 in another); the gallstone 48-hour block is labelled provisional. Non-gallstone >4 matches 941075. Gallstone values: not primary-verified (7051819 has no abstract).
- Row 5, BUN operator: **applied.** Non-gallstone ">5 mg/dL" matches 941075 ("increase over 5 mg%"). Gallstone ">2 mg/dL" kept and labelled provisional. Not primary-verified.
- Row 6, band cutoffs: **applied-with-change.** [22] and [24] removed from all band nodes and band citation arrays (now [3] only, for the Atlanta statements). Bands are called "commonly used bands, not a sourced cutoff set". Calculator banding text updated to match. Source for the removed attribution: 4834279 has no abstract, so the attribution could not be confirmed.
- Row 7, gallstone cutoffs citing [24]: **applied (keep, provisional).** Gallstone mode is kept and labelled provisional in the variant node, the gallstone admission node, the gallstone 48-hour block and the calculator switch text. Caveat for Andy: the primary 1982 review (7051819) has no retrievable abstract, so the gallstone AST, WBC, glucose, LDH, age, base-deficit and BUN values remain unconfirmed against the primary text. Per the rule "if you cannot confirm a number, remove it", these were NOT removed because row 7 explicitly directs keeping gallstone mode. Andy should decide whether to hide the gallstone branch.
- Row 8, draft tags in text: **already applied.** Grep of both files finds no draft, TODO, DRAFT or patch tags.
- Row 9, unknown etiology: **applied.** Rule now reads: use the gallstone set only when a biliary cause is confirmed; otherwise the non-gallstone set, including unknown etiology. Option labels and the calculator switch text updated to match.
- Row 10, unsourced [3]: **applied.** [3] removed from "Ranson does not direct therapy" in the start node.

Rows not applied: none removed. No row was left unapplied.

Verification: `node --experimental-strip-types --test scripts/new-calculators.test.mjs` passes all five Ranson tests. Filtered `bunx tsc --noEmit --skipLibCheck --noUnusedLocals false` shows no errors in Ranson or acute-pancreatitis files. Citations 22-24 are still referenced from the start, admission and 48-hour nodes, so each [n] remains used and defined.

## Dr. Kitlowski re-audit after rulings and applied recommendations (2026-10-27), Ranson additions only

Verdict: **REVISE. Not safe to deploy yet.** Remaining flags below need Andy's decision. One wording fix was applied (auto-fix class, citation attribution); no number changed.

### Primary sources re-opened this run (PubMed efetch)
- PMID 941075 (Ranson 1976): abstract re-read. Non-gallstone set matches the node and calculator: age >55, glucose >200, WBC >16,000, LDH >350, AST >250 Sigma Frankel units per cent; 48 h: Hct fall >10 points, calcium <8, base deficit >4 mEq/L, BUN increase >5 mg%, sequestered fluid >6 L, PaO2 <60. Early-sign association: 24 of 38 with three or more signs seriously ill or died, 1 of 162 with fewer than three. "Serious illness" is not defined in the abstract. The 1976 cohort was mixed etiology (207 alcoholic, 51 biliary, 42 other), so it does not source a gallstone set.
- PMID 4834279 (Ranson 1974) and PMID 7051819 (Ranson 1982): PubMed records only, no abstract. Band cutoffs and every gallstone number remain unverified against primary text.
- PMID 23100216 (Banks 2013, parent #3): re-read. Persistent organ failure is organ failure >48 h. Matches ranson-result-low and ranson-start.
- Web search for the 1982 gallstone cutoffs returned only secondary pages that disagree with each other (parameter counts, gallstone thresholds). No primary text was reachable. Firecrawl credits were exhausted, so no further scrape was possible.

### Auto-fix applied (this run)
- `src/data/new-content/acute-pancreatitis-ranson-nodes.ts`, gallstone admission node (`acute-pancreatitis-ranson-admit-gs`): the AST bullet attributed Sigma-Frankel units to the gallstone set by pointing at the 1976 abstract. The 1976 units belong to the non-gallstone set. Wording changed to "units not verified for this set". Number unchanged (>250).

### Still open (flags for Andy, patient-safety tier)
- **R1 Band cutoffs 0-2 / 3-4 / 5-6 / 7 or more.** Clinician-facing numbers with no primary source. Labels in the result nodes ("commonly taught as severe" for 3-4, "top band" for 7+) and the calculator BAND_TEXT depend on them. The rule for unverifiable numbers is removal. Andy decides: keep as labelled provisional (current state) or remove the banding and show totals only. Blocks APPROVE.
- **R2 Gallstone set provisional numbers.** Admission (age >70, WBC >18,000, glucose >220, LDH >400, AST >250), 48-hour (BUN >2, base deficit >4 vs >5, sequestered fluid >4 L) rest on 7051819, which has no abstract. Row 7 kept gallstone mode per Andy's approval, which overrides the remove-if-unconfirmed default for this set only. Andy decides whether to hide the gallstone branch until full text is read. Blocks APPROVE.
- **R3 Critical action vs node wording.** Parent critical action (`ACUTE_PANCREATITIS_CRITICAL_ACTIONS`, `ap-severity`) reads "Ranson ≥3 flags severe disease" (Andy's ruling text). The start and 3-4 nodes say the same threshold is "commonly taught as severe, not a sourced cutoff". The 1976 association supports "associated with serious illness or death", not a severity band. Not edited (Andy's ruling). Andy confirms he wants this exact wording or a version closer to the 1976 association. Does not by itself block if Andy confirms.
- **R4 AST units (non-gallstone).** Node shows ">250 Sigma-Frankel units/100 mL (convert per lab)". Primary-supported. Clinician-facing IU/L conversion is intentionally absent. Residual risk: lab AST reported in IU/L will be compared against a Sigma-Frankel number. Andy confirms the convert-per-lab wording is acceptable. Non-blocking.
- **R5 Etiology switch.** Rule is now "gallstone set only when biliary cause confirmed; otherwise non-gallstone". Matches the Ranson 1976 cohort split. Not sourced to a rule, which is workflow, Andy's call. Non-blocking.

### Drug-store
No drug-store entries are linked from the Ranson nodes or the acute-pancreatitis consult. `research/new-content/drug-store-changes.md` has no acute-pancreatitis rows. Nothing to re-audit.

### Verified as matching
- Calculator bands 0-2 / 3-4 / 5-6 / 7+ match the node bands. Max totals 11 non-gallstone, 10 gallstone.
- Calculator registration `ranson` (calculator.ts) and toolbar `ranson` present. Calculator final score requires all 48-hour items resulted (Andy ruling F1).
- Node ids referenced from Ranson nodes exist: `acute-pancreatitis-ranson-start`, `ap-complications-q`, `ap-severe-resus`, `ap-dispo-complicated`. Citation numbers 3, 4, 22, 23, 24 are all defined (RANSON_CITATIONS plus parent).

### Path to APPROVE
1. Andy decides R1 (keep bands provisional, or remove banding).
2. Andy decides R2 (gallstone branch: keep provisional or hide).
3. Andy confirms R3 wording.
Then re-audit once more. R4 and R5 do not block.

Firecrawl credit notice (verbatim from the tool): https://firecrawl.dev/pricing
