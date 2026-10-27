# Acute Pancreatitis — Ranson severity patch (DRAFT, not deployed)

Status: DRAFT for Andy's sign-off. Not deployed. The tree file carries additive Ranson wiring only (import, `...RANSON_NODES`, `...RANSON_CITATIONS`, one `calculatorLinks` entry, one body paragraph after the BISAP ≥3 line). The BISAP block is unchanged from HEAD. Sign-off items are in `signoff.md`.

## Files
- `src/data/new-content/acute-pancreatitis-ranson-nodes.ts` — exports `RANSON_NODES` (10 nodes, module 1) and `RANSON_CITATIONS` (#22-24).
- `src/components/ranson.ts` — exports `RANSON_CALCULATOR` (id `ranson`), pure `scoreRanson()`, `ransonBand()`.
- this file.

## Changes from the earlier draft (corrections)
- Citations moved from 20-26 to **22-26**. The earlier numbers collided with the parent tree's #20 and #21 (Hollemans; van Brunschot).
- Calculator maximum fixed: **11** (non-gallstone) or **10** (gallstone). The earlier draft displayed "/ 8".
- Calculator could never show INCOMPLETE. Added a `48-hour labs entered` switch; the final score exists only when it is ON.
- 48-hour branching: the total routes to bands 0-2, 3-4, 5-6, 7-8, and a separate **9+ "no sourced band"** result.
- Removed an unsourced claim that Ranson is "less accurate than BISAP or APACHE II".
- Removed the Glasgow-Imrie placeholder citation. Glasgow-Imrie is not included because it is unsourced.
- Pure scoring lives in `ranson.ts`. Edge test run (see Verification).
- Result nodes do not chain via `next`.

## Changes in the fix pass (this revision)
- **Escalation directives removed.** Result nodes 3-4, 5-6, 7-8 and 9+ no longer say "treat as severe", "escalate", or "ICU-level review". They state the band, point to Atlanta organ-failure status, and say the escalation threshold is pending sign-off (C6). Severe and disposition links remain as reference pointers only.
- **Mortality figures removed** from nodes, result bodies, the calculator band text and the threshold note (C1). Figures are in open questions below. No mortality percentage is presented as a cited value.
- **9-11 totals** now route to their own result node (`acute-pancreatitis-ranson-result-unsourced`) and calculator band `unsourced-high` (label "9+"). The 7-8 option no longer covers totals of 9 or more.
- **Gallstone set labelled PROVISIONAL.** Node and calculator show the caveat for AST (C2), base deficit (C3) and BUN operator (C8) whenever the gallstone switch is ON. Both base-deficit values are shown; neither is chosen.
- **BUN operator** shown with both forms for non-gallstone (≥5 per the draft, >5 per another summary), and gallstone >2 flagged as unconfirmed (C8).
- **Unknown etiology** no longer says "record both sets". The text states that no sourced rule picks a set and that the calculator scores one set per run (C10).
- **Draft annotations stripped** from node bodies, citation text and calculator strings. Verification notes live in this file only.
- **Switch toggles** (gallstone, 48-hour entered) keep points 0 and are documented as a switch exception in `ranson.ts` (C9).

## Changes in the pass-3 revision (2026-10-27)
- **BISAP block restored.** The Ranson link line had been placed between the BISAP heading and its criteria. The BISAP criteria are back to their HEAD text. The Ranson paragraph now sits after the "BISAP ≥3" line.
- **Bands:** one top band, **7 or more** (`very-high` in code). The "9+ no sourced band" node and the "do not assign a severity band" text are removed. Band split 0-2 / 3-4 / 5-6 / ≥7 still comes from a reference summary (C1).
- **Mortality percentages:** none carried. The 1974 band table was not retrievable (PubMed record 4834279 has no abstract). Figures are in the open questions.
- **Citations:** Wu 2008 is cited as parent #4 and Banks 2013 as parent #3. The duplicate entries #25 and #26 are deleted. The Ranson set is #22-24.
- **Non-gallstone cutoffs now primary-verified** against the 1976 abstract (PMID 941075, Surg Gynecol Obstet 143(2):209-19). The abstract lists the 11 signs. Operators: age >55, glucose >200, WBC >16,000, LDH >350, AST >250 (Sigma-Frankel units per 100 mL), Hct fall >10 points, calcium <8, base deficit >4, BUN increase **>5**, sequestered fluid >6 L, PaO₂ <60. The BUN draft operator (≥5) is changed to >5 (C8 resolved for non-gallstone; see signoff.md).
- **Gallstone cutoffs:** the 1976 abstract contains no gallstone-specific numbers. The gallstone set is attributed to the 1982 review (PMID 7051819). That record has no PubMed abstract, so the set stays provisional (C2, C3, C8 gallstone).
- **1976 lavage paper kept, justified:** it is the primary source for the non-gallstone cutoffs (#23). It is not a lavage-efficacy claim.

## Integration steps (for the integrator; nothing here was run)
1. Merge `RANSON_NODES` into `ACUTE_PANCREATITIS_NODES` (module 1, label "Diagnosis & Severity"). Node ids `acute-pancreatitis-ranson-*`.
2. Merge `RANSON_CITATIONS` into the tree `CITATIONS`. #25 duplicates parent #4 (Wu 2008) and #26 duplicates parent #3 (Banks 2013); remap if preferred.
3. Reachability: add to `ap-severity` either a `calculatorLinks` entry `{ id: 'ranson', label: 'Ranson Criteria' }` or a body line `Ranson (48 h): [Ranson Criteria](#/node/acute-pancreatitis-ranson-start)`. Verify no orphans.
4. Register `RANSON_CALCULATOR` in `src/components/calculator.ts` under `'ranson'`. Add an import like the `us-iv` one. Confirm the points-0 switch handling (C9) first.
5. Toolbar button `{ action: 'calculator', target: 'ranson' }` on `ap-severity` only after registry edits are approved.
6. Critical actions: optional, not required. The existing "BISAP score ≥3 or Ranson ≥3 = severe" line stays as-is pending C6.
7. Do NOT change existing `ap-*` text in this patch.

## Fact sheet (facts used; strength; verification)

### A. Ranson admission cutoffs (1 point each)
1. Non-gallstone: age >55 y; WBC >16,000/mm³; glucose >200 mg/dL; LDH >350 IU/L; AST >250 IU/L. Ranson JH et al., Surg Gynecol Obstet 1974;139:69-81 (PMID 4834279). Observational. Secondary-verified via reference summary; primary full text not retrieved.
2. Gallstone: age >70 y; WBC >18,000/mm³; glucose >220 mg/dL; LDH >400 IU/L; AST cutoff and units unresolved (C2). Ranson 1976 (PMID 941075); Ranson 1982. Secondary-verified only.

### B. Ranson 48-hour items
3. Non-gallstone (6): hematocrit fall >10%; BUN rise ≥1.8 mmol/L (≥5 mg/dL) after hydration (operator C8); serum calcium <2.0 mmol/L (<8 mg/dL); PaO₂ <60 mmHg; base deficit >4 mEq/L; sequestered fluid >6 L. Secondary-verified.
4. Gallstone (5; no PaO₂ item): hematocrit fall >10%; BUN rise >2 mg/dL (unconfirmed, C8); calcium <8 mg/dL; base deficit (C3); sequestered fluid >4 L. Secondary-verified.
5. The score is incomplete until 48 h. Strength: expert consensus (standard reading of the rule set).

### C. Ranson band cutoffs (reference summary; NOT primary-verified)
6. Band splits 0-2 / 3-4 / 5-6 / 7-8 come from a reference summary citing Ranson 1974 (C1). Mortality figures for these bands are NOT carried in the app text.
7. "Ranson ≥3 = likely severe" is a commonly taught threshold. Reference summary only; shown only as an unsourced teaching point (C6).

### D. BISAP (comparator, first 24 h)
8. Five items within 24 h: BUN >25 mg/dL; impaired mental status; SIRS ≥2; age >60; pleural effusion. Wu BU et al., Gut 2008;57:1698-1703 (PMID 18519429). Observational. Secondary-verified.
9. Validation AUC 0.82 (95% CI 0.79-0.84) vs APACHE II 0.83 (0.80-0.85). Same source. Not cited in the node text.

### E. Revised Atlanta 2012
10. Severe = persistent organ failure >48 h; moderately severe = transient organ failure and/or local or systemic complications; organ failure by Modified Marshall score. Banks PA et al., Gut 2013;62:102-111. Expert consensus. The app already cites it (#3). Wording paraphrased; re-verify the exact text before sign-off.

### F. Comparisons
11. Papachristou GI et al., Am J Gastroenterol 2010;105:435-441: compares BISAP, Ranson, APACHE-II, CTSI. Only the abstract header was confirmed; AUC values NOT retrieved. No AUC claims in the nodes.
12. 2019 meta-analysis (secondary summary; not primary-verified). Context only; not cited.

## Conflicts (for Andy; not resolved here)
- **C1 Mortality and band cutoffs:** band splits come from a reference summary; primary Ranson 1974 table not retrieved. Mortality figures removed from app text. 9+ totals have no sourced band.
- **C2 Gallstone AST cutoff and units:** one source gives >250 (recorded as IU/100 mL there); other teaching uses a lower value. Gallstone set is provisional.
- **C3 Gallstone base deficit:** one reference gives >4 mEq/L; other teaching gives >5 mEq/L. Both shown in the node and calculator; neither chosen. Gallstone set is provisional.
- **C4 BISAP mortality:** existing info page `ACUTE_PANCREATITIS_SUMMARY` (`src/data/info-pages.ts`, id `ap-summary`) says "BISAP ≥3 within 24h = 12-30% mortality". A reference summary gives >15% for 3-5 points. Neither is sourced here. Not edited.
- **C5 Severe mortality:** `ap-severity` says "~17-30%"; the info page says "12-30%". Neither sourced here.
- **C6 Severe threshold:** Ranson 3 as "severe" is not primary-sourced. It is now shown only as an unsourced teaching point, and result nodes no longer direct escalation from it. Andy decides whether the threshold text stays, and whether the existing parent-tree critical action keeps it.
- **C7 Fluids (out of scope, noticed):** `ap-moderate-resus` says LR 5-10 mL/kg/h and the summary says ~3-4 L/24h, while the info page gives 250-500 mL/h. Needs a separate resuscitation review.
- **C8 BUN rise operator and value:** non-gallstone is written ≥5 mg/dL in the draft and >5 mg/dL in another summary. Gallstone >2 mg/dL is unconfirmed. Both shown; the draft does not pick one silently. Confirm against Ranson 1974 and 1976 primary text.
- **C9 Switch toggles with points 0:** the gallstone and 48-hour-entered switches are toggles with points 0, which is outside the points-≥1 rule for toggles. Documented as a switch exception in `ranson.ts`. Integrator must confirm `calculator.ts` treats a points-0 toggle as adding nothing. Alternative: model as a select with options; not done here.
- **C10 Unknown etiology:** the draft previously told the clinician to score both sets. The calculator has one etiology switch and scores one set per run. Which set to use is a workflow decision for Andy; no source cited.

## Open questions (not sourced; left out of the app)
- Primary Ranson 1974 table: mortality by score, and whether bands apply to both etiology sets. The 0-2 / 3-4 / 5-6 / 7-8 mortality figures (formerly about 2%, 15%, 40%, and "near 100%" for 7-8) are NOT carried until verified.
- Primary 1976 and 1982 papers: exact gallstone AST, base deficit and BUN-rise cutoffs and units (C2, C3, C8).
- Totals of 9-11 (non-gallstone maximum 11, gallstone maximum 10): no sourced band.
- Papachristou 2010 AUC table.
- ACG 2024 (Tenner S et al., Am J Gastroenterol 2024;119:419-437) text on severity scoring; not retrieved.
- Glasgow-Imrie cutoffs and primary citation; omitted.
- Whether a revised Ranson (AST removed, modified hematocrit item, cutoff 3.5) should be added; needs the primary paper.
- Etiology-unknown workflow: which set to score, or whether to score both (C10). Clinical workflow rule for Andy.
- Whether the 3-4 escalation threshold stays in any node (C6).

## Gaps
- Primary PDFs for the 1974 / 1976 / 1982 Ranson papers (PMC blocked; PubMed abstract text not loaded).
- Full text of Papachristou 2010 and Wu 2008.
- Atlanta 2012 wording (re-verify).
- Tool limits in the original run: Firecrawl rate-limited; web search summaries partial.

## Verification done
- Original run: pure scoring checked by an edge test (8 cases), run with node strip-types on `src/components/ranson.ts`.
- Fix pass (read-only, scratch script outside the repo; no tsc, no build, no deploy, no Supabase, no git):
  - Band edges: 0-2 low, 3-4 moderate, 5-6 high, 7-8 very-high, 9-11 unsourced-high.
  - Maximums: gallstone 10, non-gallstone 11 (PaO₂ excluded for gallstone).
  - Nodes load: 11 nodes, citations 22-26 present, every `next`/option target and `#/node/` link resolves to a node in the file or to an existing parent id (`ap-severe-resus`, `ap-complications-q`, `ap-dispo-complicated`). No draft-note strings left in node bodies or recommendations.
  - Gallstone calculator result shows the provisional note.

## Sign-off checklist
- [ ] Andy confirms gallstone AST and base deficit cutoffs (C2, C3) and BUN operator (C8)
- [ ] Mortality bands replaced or confirmed from primary (C1)
- [ ] BISAP and severe-mortality ranges reconciled with the info page (C4, C5)
- [ ] Severe threshold decision (C6), including whether Ranson-3 wording stays in any node
- [ ] Citation text for #22-24 verified against primary papers
- [ ] Etiology-unknown workflow confirmed (C10)
- [ ] Points-0 switch handling confirmed for calculator.ts (C9)
- [ ] Glasgow-Imrie: include only with a source
- [ ] Integrator wires nodes, citations, calculator, reachability link, and toolbar (after approval)
