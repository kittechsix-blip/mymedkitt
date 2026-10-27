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
