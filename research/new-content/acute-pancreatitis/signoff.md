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
