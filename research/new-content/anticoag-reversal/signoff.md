# anticoag-reversal: andexanet update — SIGN-OFF (HELD, nothing applied)

**Status:** draft only. `src/data/trees/anticoag-reversal.ts` is NOT edited. `src/components/andexanet-regimen.ts` and `src/data/new-content/anticoag-reversal-andexanet-nodes.ts` exist as unwired drafts (not imported anywhere); `patch.md` holds the proposed edits.

## STOP item for Andy (patient-safety tier)
The research found that andexanet alfa US sales ended **12/22/2025** (FDA-reported; verify against the FDA notice and the manufacturer letter). The LIVE app still presents andexanet as an active option: consult node `acr-xa-critical` and CRITICAL_ACTIONS, the drug-store andexanet entry, `info-pages.ts`, and the existing calculator text (calculator.ts ~line 34658, "First-line: andexanet alfa ... ANNEXA-I 2024 supports andexanet").
Decision needed: rewrite those live recommendations (PCC as the available option; andexanet noted as withdrawn), or keep as is. This changes a live recommendation clinicians act on, so it is yours (and Dr. Kitlowski's), not an auto-fix.

## Open items
- ANNEXA-I intracranial hemorrhage results and thrombotic-event rates: confirm figures from the primary paper (Connolly, NEJM 2024) before any text uses them.
- Regimen calculator (low vs high dose by agent / dose / timing) drafted from ANNEXA-4 and the label; every number must be re-checked against the FDA label before wiring. Not registered in calculator.ts.
- Existing DOAC reversal doses unchanged; any conflict with primary sources is listed in patch.md.

## Checklist
- [ ] Andy: decide on the andexanet withdrawal rewrite (live content)
- [ ] Andy: approve or discard the regimen calculator and ANDEXANET_NODES drafts
- [ ] Dr. Kitlowski: audit after any wiring

## Withdrawn update 2026-10-27

**Status:** Andexanet alfa (Andexxa) is no longer marketed in the US. The live app now says so. Outside the US it is described as "where available" only. Existing PCC and other dosing is unchanged.

**Verification source (opened 2026-10-27):**
- TCTMD, "Andexanet Alfa Pulled From US Market," dated 2025-12-22: https://www.tctmd.com/news/andexanet-alfa-pulled-us-market (quotes the FDA safety communication dated 2025-12-19: risks outweigh benefits; AstraZeneca requested voluntary withdrawal of the BLA for commercial reasons; US commercial sales end "after today," 2025-12-22; AstraZeneca spokesperson: decision "contained to the US," Andexxa "available to patients around the world").
- AABB news, "AstraZeneca Withdraws Factor Xa Reversal Agent From U.S. Market," dated 2025-12-23: https://www.aabb.org/news-resources/news/article/2025/12/23/astrazeneca-withdraws-factor-xa-reversal-agent-from-u.s.-market (FDA action 2025-12-18; US sales end 2025-12-22).
- Not opened directly: the FDA safety communication page itself and the DailyMed label status. Both are still to be checked against the FDA notice before final sign-off.

**Edits (old -> new), src/ only:**
1. `src/data/trees/anticoag-reversal.ts` `acr-xa-critical` body: PCC option now "first-line in the US, where andexanet alfa is no longer marketed [21]" (was "default first-line at most US centers"). Andexanet option header now "NO LONGER MARKETED IN THE US (US sales ended 12/22/2025 [21]). Where available outside the US: ..." (was "specific Xa antidote, AHA/ASA Class I for ICH if available"). Practical bullet: "in the US, use 4-factor PCC; andexanet is not available here. Where available outside the US, reserve it for ICH with no acute thrombotic contraindication" (was "most US centers default to PCC; reserve andexanet for ICH with andexanet on formulary..."). Andexanet dose lines, ANNEXA-I bullets, and monitoring unchanged.
2. Same file, `acr-xa-critical` `citation`: [1,3,4,5,6,17] -> [1,3,4,5,6,17,21]. PCC firstLine notes: "Default first-line at most US centers..." -> "First-line in the US: andexanet alfa is no longer marketed in the US (US sales ended 12/22/2025). PCC will NOT change anti-Xa level." Alternative drug label -> "Andexanet alfa (Andexxa) — NOT marketed in the US"; dose gets "(historical reference only)"; notes -> "US sales ended 12/22/2025. Where available outside the US only..."
3. Same file, `ANTICOAG_REVERSAL_CRITICAL_ACTIONS`: "Apixaban/rivaroxaban: 4-factor PCC 50 units/kg or andexanet alfa 400-800 mg IV" -> "Apixaban/rivaroxaban: 4-factor PCC 50 units/kg (andexanet alfa no longer marketed in the US)".
4. Same file, citations: added `{ num: 21 }` (FDA safety communication / withdrawal, sourced to the two URLs above). Appended at the end of the array.
5. `src/data/drug-store.ts` `ANDEXANET_ALFA`: name -> "Andexanet Alfa (Andexxa) — No longer marketed in the US". cautions: new first line "No longer marketed in the US (sales ended 12/22/2025) — confirm availability locally. The dosing below is kept for historical reference only. Where available outside the US, use as labeled." Citations: added the FDA/withdrawal source line first. Label dosing and ANNEXA refs kept.
6. Same file, ANDEXANET ICH dosing text: "where it is on formulary" -> "where it was available (historical; not marketed in the US since 12/22/2025)".
7. Same file, PCC entry notes: "andexanet preferred for apixaban/rivaroxaban; ... PCC is alternative" -> "andexanet alfa is no longer marketed in the US, so 4-factor PCC is the US option for apixaban/rivaroxaban".
8. Same file, PCC entry (~11855): "Less effective than andexanet for Xa inhibitors but reasonable alternative." -> "Andexanet alfa is no longer marketed in the US, so this is a reasonable US alternative for Xa inhibitors."
9. `src/data/trees/ich.ts` `ich-xa-rev` (Xa inhibitor reversal): option description "andexanet alfa or PCC" -> "4-factor PCC (andexanet alfa no longer marketed in the US)". Body Option 1 -> "first-line in the US"; Option 2 header -> "NO LONGER MARKETED IN THE US (US sales ended 12/22/2025)"; "Where available outside the US" (was "Note: recently withdrawn... availability varies"); "Not an option for US patients — use 4-factor PCC". alternative drug -> "Andexanet alfa (Andexxa) — NOT marketed in the US"; notes -> US sales ended / where available outside US only. Summary -> "4-factor PCC 50 IU/kg for Xa inhibitor reversal — andexanet alfa is no longer marketed in the US". Existing citation 21 (FDA/withdrawal) reused. Its prior body text already described the 22 Dec 2025 cessation, unchanged.
10. `src/data/trees/coagulation-cascade.ts`: match-table row "Apixaban / rivaroxaban / edoxaban | Andexanet alfa or 4F-PCC" -> "4F-PCC (andexanet alfa no longer marketed in the US)". Summary (defect-match) "FXa-DOAC→andexanet/PCC" -> "FXa-DOAC→4F-PCC (andexanet no longer marketed in US)". DOAC selector body: added "4-factor PCC is the US option" bullet; andexanet bullet prefixed "NOT marketed in the US (sales ended 12/22/2025); where available outside the US only". DOAC node summary "FXa-DOAC→andexanet 400/800mg bolus (ANNEXA-I) or 4F-PCC 50 u/kg" -> "FXa-DOAC→4F-PCC 50 u/kg (andexanet no longer marketed in US)". Critical action "FXa-DOAC reversal: andexanet (ANNEXA-I) or 4F-PCC 50 u/kg" -> "FXa-DOAC reversal: 4F-PCC 50 u/kg (andexanet no longer marketed in the US)".
11. `src/data/trees/massive-hemoptysis.ts`: Xa-inhibitor body "[Andexanet alfa] (if available) / OR [4-Factor PCC] 50 units/kg" -> "[4-Factor PCC] 50 units/kg [1] (first-line in the US) / Andexanet alfa is no longer marketed in the US (where available outside the US only)". Recommendation "use andexanet alfa or 4F-PCC" -> "use 4F-PCC (andexanet alfa is no longer marketed in the US)". Notes "if andexanet unavailable" -> "(andexanet alfa no longer marketed in the US)".
12. `src/data/trees/hemoptysis-hub.ts`: body bullet "DOAC → andexanet (Xa inhibitors) or idarucizumab" -> "DOAC → 4-factor PCC (Xa inhibitors; andexanet alfa is no longer marketed in the US) or idarucizumab". Andexanet paragraph: "Reserve it for..." -> "Where it is still available outside the US, reserve it for...". Recommendation "Reverse (PCC/vitamin K, andexanet/idarucizumab, ...)" -> "Reverse (PCC/vitamin K, idarucizumab, ...)".
13. `src/data/trees/anorectal-bleeding-hub.ts`: Apixaban/rivaroxaban bullet -> "4-factor PCC (andexanet alfa is no longer marketed in the US; where available outside the US only)". Recommendation "andexanet/PCC (Xa)" -> "4-factor PCC (Xa)". CRITICAL action "andexanet alfa or 4F-PCC (apixaban/rivaroxaban)" -> "4F-PCC (apixaban/rivaroxaban; andexanet alfa no longer marketed in the US)".
14. `src/data/trees/gi-bleed-hub.ts`: Apixaban/rivaroxaban bullet "andexanet alfa OR 4-factor PCC 50 U/kg (off-label...)" -> "4-factor PCC 50 U/kg (andexanet alfa is no longer marketed in the US; off-label...)".
15. `src/data/info-pages.ts`: ICH overview "Xa inhibitor → 4-Factor PCC 50 IU/kg or andexanet alfa" -> "4-Factor PCC 50 IU/kg". Coag cheat-sheet "FXa-DOAC — andexanet (ANNEXA-I) or 4F-PCC 50 u/kg" -> "4F-PCC 50 u/kg (andexanet alfa is no longer marketed in the US)". Xa-inhibitor link "Andexanet alfa or 4F-PCC per local protocol" -> "4F-PCC per local protocol (andexanet alfa is no longer marketed in the US)". Orbital-trauma list "(PCC, vit K, andexanet alfa, idarucizumab)" -> "(PCC, vit K, idarucizumab; andexanet alfa is no longer marketed in the US)". Reversal-summary "andexanet alfa or 4F-PCC for FXa inhibitors (ANNEXA-4)" -> "4F-PCC for VKA and for FXa inhibitors (andexanet alfa is no longer marketed in the US)". Agent-specific page "andexanet/PCC for factor-Xa inhibitors" -> "4-factor PCC for factor-Xa inhibitors (andexanet alfa is no longer marketed in the US)". Info-page citation 5 (ANNEXA-4) kept.
16. `src/data/stop-pages/batch-02.ts`: "use andexanet alfa or 4-factor PCC" -> "use 4-factor PCC (andexanet alfa is no longer marketed in the US)".
17. `src/data/stop-pages/batch-08.ts`: "andexanet alfa or 4F-PCC. Vitamin K alone" -> "4F-PCC (andexanet alfa is no longer marketed in the US). Vitamin K alone".
18. `src/components/calculator.ts` (text lines only; the 'us-iv' lines untouched): row label "Andexanet OR 4F-PCC for Xa inhibitor" -> "4F-PCC for Xa inhibitor (andexanet no longer marketed in US)". Mortality text "First-line: andexanet alfa ... ANNEXA-I 2024 supports andexanet for ICH." -> "First-line in the US: 4F-PCC 50 U/kg. Andexanet alfa is no longer marketed in the US (sales ended 12/22/2025); where available outside the US, dose by drug + timing. ANNEXA-I 2024 showed better hemostasis with more thrombotic events." Specific-antidote row -> "(idarucizumab; andexanet alfa not marketed in the US)". thresholdNote: "Andexanet shortens..." -> "Where andexanet is available outside the US it shortens..."; "4F-PCC is a reasonable alternative when antidote unavailable." -> "4F-PCC is the US option for Xa inhibitors." Calculator citation (ANNEXA-I) kept.

**Not changed (on purpose):** `src/data/trees/ich.ts` citation 21 text (already existed); `src/components/drug-store.ts` line 32 (code comment only); ANNEXA-I/ANNEXA-4 citations kept; drafts in `research/new-content/anticoag-reversal/drafts` untouched; `supabase-hotfix-update.sql` and other agents' edits (cocaine/beta-blocker, ecmo.ts, stemi.ts) untouched; no docs/ edits; nothing committed, pushed, or deployed.

**Gates (2026-10-27):** `bunx tsc --noEmit --skipLibCheck --noUnusedLocals false` exit 0. `node scripts/lint-citation-refs.mjs --gate`: no new dangling refs. `node scripts/lint-critical-actions.mjs --strict`: PASS (363 trees).

## Andexanet audit fixes 2026-10-27

**Sources actually opened:**
- FDA Safety Communication page: https://www.fda.gov/safety/medical-product-safety-information/update-safety-andexxa-astrazeneca-fda-safety-communication — communication dated 12/18/2025; "the FDA considers the risks of the product to outweigh its benefits"; "will end U.S. commercial sales today, December 22, 2025".
- ANNEXA-I abstract (Connolly SJ et al., NEJM 2024;390:1745-1756; PMID 38749032), read via PubMed efetch: thrombotic events 27/263 (10.3%) vs 15/267 (5.6%); ischemic stroke 17 (6.5%) vs 4 (1.5%); "no appreciable differences ... in death within 30 days" (no death percentages in the abstract).

**Could NOT open (403 / unavailable):** Greenberg SM et al. Stroke 2022 (AHA guideline, DOI 10.1161/STR.0000000000000407; PMID 35579034, no PMC copy); Tomaselli GF et al. 2020 ACC ECDP (JACC; DOI in our citation list did not resolve to it); Kcentra US label and dosing guide (CSL PDF unreadable; Drugs.com 403); the NEJM full text.

**Edits (old -> new):**
1. `src/data/trees/anticoag-reversal.ts` `acr-xa-critical` body, PCC option: "first-line in the US, where andexanet alfa is no longer marketed [21]" -> "first-line in the US (off-label for DOACs), where andexanet alfa is no longer marketed [21]".
2. Same node, non-CNS line: "Non-CNS: 25 units/kg (max 2,500) or fixed 2,000 units (simplest, best evidence) [5]" -> "Non-CNS: dose per local PCC protocol (no non-CNS unit/kg figure verified against an opened source)". CNS 50 units/kg (max 5,000) kept; NOT verified against an opened source (see open items).
3. Same node, andexanet option: "Where available outside the US: specific Xa antidote, AHA/ASA Class I for ICH [1]" -> "Where available outside the US: specific Xa antidote [1]" (class statement removed; could not open the guideline).
4. Same node, andexanet dose bullets (low 400 mg + 4 mg/min; high 800 mg + 8 mg/min) -> "Not available in the US. Outside-US dosing per local product label." (body bullet also replaced, not only the treatment field).
5. Same node, ANNEXA-I bullet: "no mortality benefit (30-day death 27.8% vs 25.5%)" -> "no appreciable difference in 30-day death". Thrombotic 10.3% vs 5.6% and ischemic stroke 6.5% vs 1.5% VERIFIED, unchanged. 27.8% / 25.5% could not be verified, removed.
6. `treatment.firstLine` (acr-xa-critical): dose "CNS bleeding: 50 units/kg (max 5,000 units) | Non-CNS: 25 units/kg (max 2,500) or fixed 2,000 units" -> "CNS bleeding: 50 units/kg (max 5,000 units) | Non-CNS: dose per local PCC protocol"; notes add "(off-label for DOACs)".
7. `treatment.alternative.dose`: andexanet 400/800 mg strings -> "Not available in the US. Outside-US dosing per local product label."; notes: "AHA/ASA Class I for ICH if available" removed.
8. `ANTICOAG_REVERSAL_CRITICAL_ACTIONS`: "Apixaban/rivaroxaban: 4-factor PCC 50 units/kg (andexanet ...)" -> "Apixaban/rivaroxaban: 4-factor PCC (off-label for DOACs) - CNS bleed 50 units/kg; non-CNS dose per local PCC protocol (andexanet alfa no longer marketed in the US)".
9. Citation 21 (anticoag-reversal.ts): now leads with the FDA safety communication URL above (Dec 18, 2025; risks outweigh benefits; US sales ended Dec 22, 2025); TCTMD and AABB kept as secondary.
10. `acr-xa-critical` alternative-fallback PCC fondaparinux line (`acr-lmwh-reversal`, PCC alternative): "25-50 units/kg" -> "Dose per local PCC protocol" (fondaparinux is a factor Xa inhibitor; same no-verified-number rule).
11. `src/data/trees/massive-hemoptysis.ts` DOAC node: "[4-Factor PCC] 50 units/kg [1] (first-line in the US)" -> "dose per local PCC protocol [1] (first-line in the US; off-label for DOACs)"; treatment dose "50 units/kg IV" -> "Dose per local PCC protocol"; notes add "off-label for DOACs".
12. `src/data/trees/hemoptysis-hub.ts` ~line 140: "andexanet roughly doubles thrombotic events" -> "ANNEXA-I (andexanet no longer marketed in the US): thrombotic events roughly doubled."
13. `src/data/trees/ich.ts` `ich-xa-rev` Option 1 header: added "(off-label for DOACs)". 50 IU/kg dose kept (intracranial scope; see open items). Paragraph "Basis for the andexanet availability note": removed figures I could not verify (ANNEXA-4 82% hemostasis; ANNEXA-I MI 4.2% vs 1.5%; FDA briefing 30-day thrombosis 14.6% vs 6.9%, thrombosis death 2.5% vs 0.9%); kept ANNEXA-I 10.3% vs 5.6% and 6.5% vs 1.5%; FDA sentence rewritten to cite the Dec 18, 2025 safety communication.
14. `src/data/drug-store.ts` `ANDEXANET_ALFA` ICH regimen: "AHA/ASA 2022 gave a Class 1 recommendation ... (historical; ...)" -> "Historical reference only (not marketed in the US since 12/22/2025)." ANNEXA-I bullets: removed hemostatic 67.0% vs 53.1% and anti-FXa 94.5% vs 26.9% (not verified); "No significant difference in 30-day mortality or disability" -> "No appreciable difference in 30-day death". Andexanet dose strings in this entry kept, marked historical.
15. `src/data/drug-store.ts` PCC entry "Massive hemoptysis / DOAC reversal (off-label)": "50 units/kg IV (max 5,000)" -> "Dose per local PCC protocol (off-label for DOACs)"; weightCalc (50 units/kg) removed so the calculator does not compute a number.
16. `src/components/calculator.ts` ~34658 (4-6 bin): "First-line in the US: 4F-PCC 50 U/kg." -> "First-line in the US (off-label for DOACs): 4F-PCC, dose per local PCC protocol." Only that mortality text was edited; the 'us-iv' lines were not touched.
17. `src/data/info-pages.ts` ~9888 (Xa inhibitor reversal): "Non-CNS → 25 u/kg or fixed 2,000 u" -> "Non-CNS → dose per local PCC protocol"; CNS 50 u/kg kept.
18. `src/data/info-pages.ts` ~13878 (reversible treatments): "FXa-DOAC — 4F-PCC 50 u/kg" -> "4F-PCC per local PCC protocol (off-label for DOACs; ...)".
19. `src/data/trees/coagulation-cascade.ts` ~298 summary and ~459 critical action: "FXa-DOAC→4F-PCC 50 u/kg" / "FXa-DOAC reversal: 4F-PCC 50 u/kg" -> "4F-PCC per local PCC protocol (off-label for DOACs; andexanet ... no longer marketed ...)".

**Not changed (on purpose):** dabigatran/idarucizumab and warfarin lines (incl. anticoag-reversal dabigatran PCC alternative "50 units/kg", and warfarin INR-tier PCC doses). Hemoptysis warfarin table.

**Gates (2026-10-27):** `bunx tsc --noEmit --skipLibCheck --noUnusedLocals false` exit 0. `node scripts/lint-citation-refs.mjs --gate`: no new dangling refs. `node scripts/lint-critical-actions.mjs --strict`: PASS (363 trees). `bun run test`: 19 pass, 0 fail.

**Open items / could not verify (need Andy or Dr. K):**
- CNS/intracranial 50 units/kg (max 5,000) is still printed in acr-xa-critical, ich.ts, drug-store ICH entry (8405), calculator. I could not open the ACC ECDP, ASH or Kcentra source, so this number is not traced to an opened source. Strictly it should be treated as unverified.
- `src/components/calculator.ts` PCC_DOSING_CALCULATOR Xa branch (~7197 "50 units/kg" and ~7204 "fixed 2,000 units / 25 u/kg") NOT edited: it is a calculator output, outside the listed edit set. It still disagrees with the non-CNS placeholder. Needs a decision.
- `src/data/trees/anticoag-reversal.ts` dabigatran PCC alternative "50 units/kg (max 5,000)" left (dabigatran lines excluded from scope).
- drug-store ANDEXANET ANNEXA-I "$25,000-50,000 vs ~$5,000" cost text and the ich.ts ANNEXA-4 / FDA briefing citation text not re-verified.
- AHA 2022 (Greenberg) class and level for FXa ICH reversal: NOT verified; statement removed everywhere in this pass.


### Verified by Andy 2026-10-28
Intracranial / life-threatening bleeding with factor Xa inhibitor: 4F-PCC 50 units/kg: dose verified by Andy (source not opened by agents). Non-CNS dose remains 'per local PCC protocol' (no verified value supplied).

### Verified by Andy 2026-10-28: PCC doses (agent edit log)

Owner instruction (Andy): (A) warfarin 4F-PCC fixed 1000 IU (PROPER-3) plus institutional protocol; (B) DOAC / factor Xa inhibitor bleeding (off-label 4F-PCC) 25-50 units/kg bolus. Doses taken as verified by Andy; agents did not open primary sources for the dose.

**Citation status**
- NEJM 2026 "Antidotes for Anticoagulation Reversal" (DOI 10.1056/NEJMra2506021): DOI taken from search-result link. Search summary reported authors Rocca B, ten Cate H; N Engl J Med 2026;394(22):2235-2254. NOT confirmed against the NEJM page (fetch unavailable, Firecrawl credits exhausted). Clinician-facing text uses the verbatim form "N Engl J Med 2026. Antidotes for Anticoagulation Reversal. doi:10.1056/NEJMra2506021". (metadata not confirmed by agent; dose verified by Andy)
- PROPER-3: primary publication NOT located by agent. Clinician-facing citation is the trial name and design only (fixed 1,000 IU vs variable-dose 4F-PCC for VKA-related bleeding; intracranial hemorrhage excluded). Search surfaced a 2024 Crit Care Med systematic review/meta-analysis reporting PROPER-3 as similar outcomes in non-ICH patients; not added as a citation. (metadata not confirmed by agent; dose verified by Andy)

**Edits (old -> new)**
1. `src/data/trees/anticoag-reversal.ts` DOAC node body: "Non-CNS: dose per local PCC protocol (no non-CNS ... verified)" -> "Non-CNS and all DOAC bleeds: 4F-PCC (off-label for DOACs): 25-50 units/kg IV bolus; use the higher end for life-threatening or intracranial bleeding (50 units/kg), maximum and repeat dosing per institutional protocol. [22]". CNS line "50 units/kg (max 5,000)" kept. Citation array +22.
2. Same file, DOAC node firstLine.dose: "CNS ...50 units/kg | Non-CNS: dose per local PCC protocol" -> exact DOAC text above. Citation array +22.
3. Same file, fondaparinux alternative (LMWH node) dose: "Dose per local PCC protocol" -> exact DOAC text above (fondaparinux is off-label for this use).
4. Same file, CRITICAL_ACTIONS apixaban/rivaroxaban entry: non-CNS placeholder -> exact DOAC text.
5. Same file, warfarin node body/firstLine.dose: INR-tiered list kept under "Institutional weight-based protocol (INR-tiered)"; added first-listed "Warfarin reversal: 4F-PCC fixed dose 1000 IU (PROPER-3) or per institutional protocol" [23]; note that PROPER-3 excluded intracranial bleeding and that ICH uses INR-tiered dosing. Citation array +23. Vitamin K 10 mg IV unchanged.
6. Same file, CRITICAL_ACTIONS warfarin entry: "4-factor PCC 25-50 units/kg (based on INR)" -> "4-factor PCC fixed 1000 IU (PROPER-3; not for intracranial bleeding) or institutional weight-based protocol (INR-tiered)".
7. Same file, citations 22 (NEJM 2026) and 23 (PROPER-3) added.
8. `src/data/trees/massive-hemoptysis.ts` DOAC body and alternative dose: "dose per local PCC protocol" -> exact DOAC text; citation [1] -> [1,7] (local refs 7 NEJM 2026 and 8 PROPER-3 appended to its list).
9. Same file, warfarin table row and firstLine.dose: "25-50 units/kg" -> fixed 1000 IU (PROPER-3) or INR-tiered 25-50 units/kg; citation [1] -> [1,8]; notes keep INR-tiered list and add PROPER-3 ICH exclusion.
10. `src/components/calculator.ts` PCC_DOSING_CALCULATOR, Xa non-CNS branch: "DOSE PER LOCAL PCC PROTOCOL" -> exact DOAC text + computed "25 units/kg x W kg = low units (low end)" and "50 units/kg x W kg = high units (high end)"; result value prints "low-high units" with no cap. CNS 50 units/kg branch and its 5,000 cap unchanged. Two citation strings added.
11. `src/components/calculator.ts` warfarin branch: description now labels the INR-tiered dose and adds "Fixed-dose option: 1000 IU (PROPER-3) or per institutional protocol" plus "PROPER-3 excluded intracranial bleeding; for ICH use the INR-tiered dose above." Vitamin K 10 mg IV line kept. Two citation strings added to the calculator's citation list.
12. `src/components/calculator.ts` coag-doac-reversal result bin (4-6): "dose per local PCC protocol" -> exact DOAC text. Citation string added.
13. `src/data/drug-store.ts` KCENTRA: new first dosing row "Warfarin reversal, fixed dose (PROPER-3) or per institutional protocol": 1000 IU; existing INR-tiered rows kept. DOAC/hemoptysis row: "Dose per local PCC protocol" -> exact DOAC text; weightCalc restored as array [25 units "Low end", 50 units "High end"], no maxDose. Citations added.
14. `src/data/info-pages.ts` warfarin summary (PCC dose line), DOAC summary (Dose line), warfarin body (simultaneously line), coag-steps reversible-treatments line: placeholders replaced; fixed-dose option added beside INR-tiered dosing.
15. `src/data/trees/coagulation-cascade.ts` summary (FXa-DOAC), critical action (FXa-DOAC and warfarin), vitamin-K defect summary: placeholders replaced with the DOAC text or the fixed-dose option.

**Deliberately NOT changed (flag for Andy)**
- ICH warfarin node (`src/data/trees/ich.ts` ~line 90-95), drug-store PCC_4FACTOR ICH warfarin row, and ICH critical action: INR-tiered 25-50 IU/kg kept with NO fixed 1000 IU option. PROPER-3 excluded intracranial hemorrhage, so fixed 1000 IU is not supported for ICH. Andy to decide whether ICH should carry the fixed-dose option.
- Other warfarin PCC unit/kg lines not in the edit set: `src/data/trees/massive-transfusion.ts` (~476, MTP anticoagulated, 25-50 units/kg), `src/data/trees/blood-transfusions.ts` (~441 summary), `src/data/trees/dic.ts` (~327, ~338 DIC VKA reversal), `src/data/trees/ich.ts` Xa ICH 50 IU/kg (CNS branch, kept per instruction).
- Observational context (not used for dosing): a single-center comparison reported fixed 1000 IU reached target INR less often than weight-based dosing in non-CNS INR <=6 bleeds (57.5% vs 86.4%). Andy may want this weighed before the fixed-dose option is used as first line.
- No PCC calculator test added: `calculator.ts` imports DOM/router modules and cannot load under `node --test`. Manual check: weight 80 kg non-CNS Xa -> "2,000-4,000 units".
