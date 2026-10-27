# SCAD and Coronary Vasospasm — sign-off (DRAFT, not deployed)

Status: DRAFT for Andy's sign-off, then Dr. Kitlowski's clinical audit. Nothing is wired, deployed, or pushed to Supabase.

## Files in this pass
- `src/data/trees/scad-vasospasm.ts` — 21 nodes; citations #1-#12; critical actions updated. Node ids unchanged.
- `src/data/new-content/scad-vasospasm-info.ts` — Do-NOT page and Steps page. No longer imports the tree; citations inlined (#1-#12, same text as the tree). Keep the two lists in sync.
- `src/data/new-content/scad-vasospasm-toolbar.ts` — not changed (all targets checked; see Verification).
- This file.
- Not touched: `src/components/calculator.ts`, `src/data/toolbar-configs.ts`, `docs/`, `sw.js`, `src/data/info-pages.ts` (existing SCAD row and MINOCA beta-blocker line are cited here as conflicts only).

## Changes from the earlier draft (source-check pass, 2026-10-27)
- **Info module no longer imports the tree.** Citations inlined. The tree now loads only when the consult loads.
- **Fibrinolysis wording** changed from "not advised" to "contraindicated (ESC-ACCA 2018)". The AHA 2018 statement does not discuss fibrinolysis at all; the draft had attributed the concern to it. Source-wording change, see C3.
- **Anticoagulation** rewritten to what AHA 2018 says (consider stopping heparin or anticoagulation started at presentation with no other indication). The earlier "acute peri-procedural only; chronic only for LV thrombus or thromboembolism" was not in AHA 2018; the examples are kept as an open question.
- **IV glycoprotein IIb/IIIa** wording changed from "avoid" to AHA 2018 wording ("no data; cautious approach").
- **DAPT** now shows three sourced positions (ESC e-journal, AHA 2018, existing app row) instead of one "usual" line. See C2.
- **Beta-blocker evidence** now carries the verified numbers: 327 patients, median follow-up 3.1 years, recurrence 10.4%, beta-blocker HR 0.36 (p=0.004), hypertension HR 2.46 (p=0.011). Removed the unsourced "the authors await validation" line and the "prospective" design label (design not verified). See C4.
- **PDE-5 windows** changed from "labelled window" to sildenafil/vardenafil 24 h and tadalafil 48 h (ACC/AHA-cited review). The FDA label text retrieved gives no time window. See C8.
- **Vasospasm drugs**: the 2023 AHA/ACC table (Tables 16-17) is now used as the primary source for the CCB-first and nitrate-second sequence. Diltiazem and amlodipine are no longer presented as primary-text drugs. Ergonovine and acetylcholine for provocation are confirmed. No doses added. See C5 and C6.
- **PCI**: removed the claims "second-generation DES", "confirm true-lumen wire position" (kept as expert opinion, flagged), and "PCI not first-line for non-obstructive vasospasm" (not in the text checked). CABG indications now match AHA 2018's list.
- **Monitoring duration**: AHA 2018 supports 3 to 5 days of in-hospital monitoring. Final duration still Andy's call.
- **MINOCA**: replaced "prevalence pending" with the Pasupathy 2015 abstract numbers (spasm inducible 27%, thrombophilia 14%).
- **Removed** the Do-NOT item "Do NOT treat takotsubo with catecholamines by default" (no primary source found; the rule remains as an unsourced discussion point on the mimics node). See U-list.
- **Removed** several unsourced follow-up claims (listed below).

## Conflicts (both sources; NOT resolved in the app text)

**C1. Heparin and antiplatelet before angiography (suspected SCAD vs ACS).**
- ESC e-journal summary (secondary summary of ESC guidance): initial treatment "is similar to standard ACS patients" with DAPT, heparin, and beta-blockers. Source: escardio.org ejournal volume 14, SCAD page.
- AHA 2018 (Hayes, Circulation 2018;137:e523): early heparin may reduce thrombus but carries theoretical risk of bleeding into the intramural hematoma and extension of dissection. If systemic anticoagulation is started at presentation with no other indication, consider stopping it once SCAD is diagnosed. Glycoprotein IIb/IIIa inhibitors: no data; cautious approach.
- App stabilise node: "treat as ACS until proven otherwise", with antiplatelet and anticoagulant decisions waiting for the mechanism.
- Decision needed: what the clinician does before angiography (suspected ACS, SCAD not yet excluded).

**C2. DAPT after conservatively managed SCAD and after stenting.**
- ESC e-journal summary: DAPT with aspirin and clopidogrel is "generally accepted"; no data on ticagrelor or prasugrel.
- AHA 2018: clear evidence for DAPT in conservatively managed SCAD is lacking; many practitioners avoid it because of bleeding; some experts recommend DAPT for at least 1 year (plus lifelong aspirin); others use 1-3 months then aspirin; most experts recommend aspirin for at least 1 year, often indefinitely; choose individually. After PCI: standard guideline-based antiplatelet therapy.
- Existing app SCAD row (`src/data/info-pages.ts` line ~647): "DAPT controversial. Most heal spontaneously. Avoid anticoagulation. PCI may worsen dissection." Not re-verified in this pass.
- Decision needed: the default antiplatelet plan for conservative SCAD, and duration.

**C3. Fibrinolysis wording.**
- Earlier draft: "not advised; source wording pending verification".
- ESC-ACCA 2018 (journal page excerpt): "Thrombolysis is therefore contraindicated for the acute management of SCAD." Full text not re-opened.
- AHA 2018: no discussion of fibrinolysis found in the full text.
- Applied: "contraindicated (ESC-ACCA 2018)". Decision needed: confirm this wording and whether "contraindicated" is the app's language.

**C4. Beta-blocker in SCAD.**
- ESC e-journal summary: "Beta-blockers are recommended in all patients ... reduce long-term recurrence."
- AHA 2018: beta-blockers should be considered for LV dysfunction, arrhythmia, and hypertension; some experts use them routinely (extrapolated from MI and aortic dissection); others use them selectively for concern about exacerbating vasospasm or symptomatic hypotension. The 327-patient Vancouver series (HR 0.36) is cited as strengthening routine use.
- Existing app MINOCA etiology page (`info-pages.ts` line ~659): "Beta-blockers worsen coronary spasm." This is a separate question (spasm), but the app says both things.
- Evidence is observational (one series). Decision needed: the SCAD directive, and whether the MINOCA line is correct for spasm.

**C5. Drug names and the nitrate link.**
- 2023 AHA/ACC table (Table 17, vasospastic angina): first line CCB (example verapamil 40 mg BID uptitrated); second line add long-acting nitrate (example isosorbide mononitrate 10 mg BID); third line change nitrate to nicorandil (unavailable in US).
- Draft named diltiazem, verapamil, and amlodipine as CCB examples. Diltiazem is the most widely used CCB in practice (secondary review); amlodipine appears in the 2023 table only for microvascular angina, not vasospasm. Diltiazem has no app drug entry for vasospasm.
- Draft linked isosorbide dinitrate (app entry is for stable-angina prophylaxis); the guideline example is mononitrate.
- Decision needed: which CCB and long-acting nitrate names the consult uses, and whether to add drug-store entries.

**C6. Doses.**
- The 2023 table includes doses (verapamil 40 mg BID uptitrated; isosorbide mononitrate 10 mg BID; nicorandil 5 mg BID).
- The app text gives no numeric dose for vasospasm drugs (this draft's rule). Adding a dose is a clinical change and needs explicit sign-off.
- Decision needed: whether any of these doses go in the app, and where.

**C7. Non-selective beta-blocker caution.**
- 2023 AHA/ACC Table 16: "Calcium channel blockers (not beta blockers) suppress episodes" (a diagnostic criterion).
- AHA 2018 (Hayes): concern about exacerbating vasospasm (SCAD context).
- No primary text found that explicitly says "avoid non-selective beta-blockers." The mechanism (unopposed alpha) is from secondary sources. JCS 2023 primary text not retrieved.
- Labetalol and carvedilol: not settled.
- Decision needed: keep the caution as expert opinion, or delete the directive.

**C8. PDE-5 inhibitor and nitrate window.**
- Draft cited the sildenafil label for a "labelled washout window". The retrieved label text contraindicates nitric oxide donors but gives no time window.
- ACC/AHA-cited review (Circulation 2011, reference 9): nitrates 24 h after sildenafil or vardenafil; 48 h after tadalafil (tadalafil interacts with sublingual nitroglycerin at 24 h, not 48 h).
- Applied: 24 h sildenafil/vardenafil, 48 h tadalafil, citing reference 9 for the windows and reference 10 for the contraindication. Decision needed: confirm the windows and pin the label version.

**C9. Monitored admission duration and ED discharge.**
- AHA 2018: 3-5 days of in-hospital monitoring is justified within a conservative strategy (early 5-10% hazard of dissection extension or new SCAD in the first days).
- Draft: "duration pending sign-off". "Do not discharge from the ED without cardiology review" is expert opinion, not from a source.
- Decision needed: duration in the app, and whether the ED-discharge rule stays.

**C10. Takotsubo management.**
- Draft (stop page): "Do NOT treat takotsubo with catecholamines by default". No primary source located in this pass.
- Removed from the stop page. The mimics node keeps "discuss with cardiology before inotropes" flagged as unsourced.
- Decision needed: restore as a Do-NOT item with a source, or keep it out.

## Open questions

1. **2024 ESC SCAD consensus** (named in the task): not located in searches. A search for an Australian Heart Foundation page states there are currently no evidence-based consensus guidelines for SCAD management. Andy or Dr. K to supply the citation, or drop it. The tree does not cite it.
2. **JCS 2023 primary text** (`journal-of-cardiology.com`, PubMed 37597878): the journal page returned only a stub; PubMed was not reachable. Recommendation classes and beta-blocker wording not confirmed. Reference 12 is a placeholder for the provocation agents and first-line CCB.
3. **ESC-ACCA 2018 full text**: only the journal-page excerpt for thrombolysis was retrieved. Heparin and antiplatelet wording in the ESC paper not confirmed.
4. **Saw 2017 design**: the draft called it a "prospective cohort". AHA 2018 calls it a "series". Design not verified. Author list abbreviated in the citation; confirm from PubMed.
5. **Pasupathy 2015**: numbers from the abstract (27% spasm, 14% thrombophilia). Full text not read.
6. **Ong 2014** (ACh provocation, 921 patients) and **Ghadri 2018** (Takotsubo consensus): not re-verified.
7. **Beltrame 2017**: criteria cross-checked against the 2023 table, not re-read.
8. **Intracoronary imaging before stenting, and the "true-lumen wire" rule**: AHA 2018 supports intracoronary imaging to confirm IMH or multiple lumens. The wire-position rule before stenting was not found in the text checked. Expert opinion until Andy rules.
9. **Stent technique**: AHA 2018 says no comparative data show one technique is superior and describes long DES covering both IMH edges as one approach. "Second-generation DES" removed (not found).
10. **Stimulant counselling and recreational drug use**: AHA 2018 and the 2023 table list recreational drug use as a risk factor (2023 Table 18). Counselling steps are expert opinion.
11. **Vasospasm follow-up intervals**: not sourced; left blank.
12. **Testing not available or not done**: empiric treatment per local protocol. Andy to rule.
13. **Hayes 2018 PCI and CABG details**: the CABG list (left main or proximal dissection, technical failure, PCI complication, refractory ischemia) is from the AHA text; confirm the wording at sign-off.
14. **Sildenafil and tadalafil label versions**: pin at sign-off.
15. **Existing `info-pages.ts` rows**: SCAD row (line ~647) and MINOCA beta-blocker line (line ~659) disagree with this consult (C2, C4). Not edited in this pass; the integrator should decide when registering.

## Unsourced statements (kept or removed in this pass)

**Removed (not supported by the sources checked):**
- "Recurrent chest pain: invasive angiography only with hard evidence of ischemia or necrosis" [2].
- "Genetic disorders, peripartum SCAD, and extracoronary FMD predicted long-term MACE" [2].
- "Avoid extreme or isometric exertion" [2].
- "Use second-generation drug-eluting stents" [2].
- "Only a minority of SCAD is linked to pregnancy" [2] (replaced by AHA 2018: most pregnancy-associated SCAD occurs in the first 4 weeks after delivery).
- "Consider SCAD at autopsy for unexplained sudden cardiac death" [2] (not re-verified; removed).
- "PCI is not first-line for vasospasm with non-obstructive disease" [3] (not in the text checked).
- "Pregnancy after SCAD is high risk pending more research" [2].
- "Statins only for conventional indications" [2] (replaced by the 327-cohort finding from the AHA text).
- "The authors await validation" (ESC interpretation of beta-blocker data).
- "Healing ... not quantified" (replaced by AHA 2018: 70-97%, observational).
- Stop-page item "Do NOT treat takotsubo with catecholamines by default" (see C10).

**Kept, flagged as expert opinion or not re-verified:**
- "Do NOT discharge conservatively managed SCAD from the ED without cardiology review" (expert opinion).
- "Before any stent, confirm ... wire position" (expert opinion; see Open question 8).
- Takotsubo: "discuss with cardiology before catecholamines or inotropes" (unsourced).
- Myocarditis and pericarditis: "cardiology and imaging decide the next step" (unsourced).
- Takotsubo consensus statement (ref 7, not re-verified).
- Stimulant history and counselling (expert opinion; risk factor from the 2023 table).
- Discharge criteria and return precautions (expert opinion).
- "Do NOT confuse ergonovine with methylergonovine" (drug knowledge; not separately sourced).
- Caution with non-selective beta-blockers (C7).
- Empiric CCB treatment when testing is unavailable (Andy to rule).
- Wellens and aortic dissection cross-links (existing consult links; not re-verified here).

## Verification done (2026-10-27)
- Primary and secondary sources reopened where the environment allowed:
  - AHA 2018 SCAD statement (full text returned; therapy, beta-blocker, conservative, and PCI sections read).
  - 2023 AHA/ACC chronic coronary disease guideline (Section 6.1.2 and Tables 16-18 read).
  - Saw 2017 JACC (PubMed and JACC abstract excerpts for HR and p-values).
  - Pasupathy 2015 (abstract excerpt).
  - ESC-ACCA 2018 (journal page excerpt for thrombolysis only).
  - Sildenafil label and the ACC/AHA-cited PDE-5 review (excerpt for windows).
  - JCS 2023 (journal page returned only a stub; search excerpts used for provocation agents and first-line CCB).
- Tree check (node script on the source file): 21 node ids; no duplicate ids; every `next`, `nodeId`, and `#/node/` link resolves to a node in the file; citation numbers 1-12 defined and used, no gaps, same numbering in tree and info modules.
- Cross-consult links (`#/tree/chest-pain-hub`, `wellens-syndrome`, `peripartum-cardiomyopathy`, `stemi`, `nstemi`) and `#/info/nstemi-minoca` are present in the app (`categories.ts` and `info-pages.ts`).
- Drug link ids (`alteplase/stemi`, `aspirin/acs`, `clopidogrel/acs`, `nitroglycerin/acs`, `isosorbide-dinitrate/angina`) were NOT verified against the drug store in this pass. The drug-store lookup was only partly searched. Integrator to confirm before wiring.
- TypeScript: `bunx tsc --noEmit --skipLibCheck --noUnusedLocals false` exits 0 with no output in the current working tree.
- Toolbar file: targets (`scad-vasospasm-steps` info page; `scad-vasospasm-route`, `-spasm-recognition`, `-scad-stratify`, `-disposition` nodes) confirmed present. No edit needed.
- Not run: no deploy, commit, push, Supabase script, index builder, or tsc emit.

## Sign-off checklist

**Andy**
- [x] C1: RULED by Andy 2026-10-27: treat as ACS before angiography, stop systemic anticoagulation once SCAD is confirmed, no fibrinolysis (applied to stabilise node + critical action 2)
- [x] C2: RULED by Andy 2026-10-27: aspirin default; DAPT shown as the cardiology option; no durations as orders (applied to scad-antithrombotic node; ACS loading links removed)
- [ ] C3: confirm fibrinolysis wording ("contraindicated", ESC-ACCA 2018)
- [x] C4: RULED by Andy 2026-10-27: suggest a beta-blocker, no HR number, selection with cardiology (applied)
- [ ] C4: decide whether the existing MINOCA line ("beta-blockers worsen spasm") stays
- [ ] C5: choose the CCB and long-acting nitrate names (verapamil / isosorbide mononitrate / diltiazem / amlodipine) and the linked drug entries
- [ ] C6: decide whether any doses are added (2023 table doses are listed above; none in the app)
- [ ] C7: decide whether the non-selective beta-blocker caution stays as expert opinion
- [ ] C8: confirm the 24 h / 48 h PDE-5 windows and pin the label version
- [ ] C9: set the monitored admission duration (AHA 2018: 3-5 days) and the ED-discharge rule
- [ ] C10: decide whether the takotsubo catecholamine item returns with a source
- [ ] Open question 1: supply or drop the 2024 ESC SCAD consensus citation
- [ ] Unsourced list: keep or delete each flagged expert-opinion item

**Dr. Kitlowski (clinical audit)**
- [ ] Verify JCS 2023 vasospastic recommendation classes (reference 12) from the primary text
- [ ] Verify ESC-ACCA 2018 antiplatelet and heparin wording (reference 2) from the full text
- [ ] Confirm Saw 2017 design and author list (reference 4)
- [ ] Verify Ong 2014 (reference 8) and Ghadri 2018 (reference 7)
- [ ] Verify the 2023 table doses if any are added (C6)
- [ ] Review the stent and intracoronary-imaging wording (open question 8)

**Integrator (after approval only)**
- [ ] Register `INFO_PAGES_SCADV` in `info-pages.ts` (stop and steps ids)
- [ ] Register `SCADV_NODES` and `SCADV_CITATIONS` in the tree index
- [ ] Register `TOOLBAR_SCADV` as `TOOLBAR_CONFIGS['scad-vasospasm']` in `toolbar-configs.ts` (not done in this pass)
- [ ] Confirm drug-link ids against the drug store (see Verification)
- [ ] Confirm reachability: every node reachable from `scad-vasospasm-start` or a toolbar jump
- [ ] Keep the citation list in the tree and in the info module in sync

## Drug entries (drugs-sbo-scad pass, 2026-10-27)

Module: `src/data/new-content/drugs-sbo-scad.ts` (new entries diatrizoate, amlodipine, isosorbide-mononitrate; additive rows for diltiazem, verapamil, nitroglycerin). Nothing merged, wired, or pushed.

**Drug-link hints checked:** `aspirin/acs`, `clopidogrel/acs`, `nitroglycerin/acs`, `isosorbide-dinitrate/angina` resolve to existing rows. No heparin link exists in the tree. `alteplase/stemi` resolves (the tree says do not apply).

**C5a. Calcium channel blocker for vasospasm (label vs guideline).**
- Verapamil: label (DailyMed ebc9a09a) lists vasospastic (Prinzmetal) angina; 80-120 mg PO TID, 40 mg TID if increased response. 2023 AHA/ACC Table 17: "verapamil 40 mg BID uptitrated" (first line). Dose conflict. Andy to rule.
- Diltiazem: oral Cardizem label (DailyMed f3e7ecef) indicates coronary artery spasm; start 30 mg QID, 180-360 mg/day. Table 17 names no diltiazem example. No conflict in the source text; the choice of drug is Andy's.
- Amlodipine: Norvasc label (DailyMed abd6a2ca, Revised 1/2019) lists vasospastic angina; 5-10 mg daily. Table 17 does NOT name amlodipine for vasospasm (microvascular only). Source conflict. Andy to rule whether amlodipine stays in the consult.

**C5b. Long-acting nitrate dose (label vs guideline).**
- Isosorbide mononitrate: Table 17 example 10 mg BID. Label (DailyMed ae8f74f0, rev 10/2022) recommended regimen 20 mg BID, 7 h apart. Conflict. Andy to rule.
- Isosorbide dinitrate link in the tree (`isosorbide-dinitrate/angina`) points at the stable-angina row, not vasospasm. Integrator should repoint to `isosorbide-mononitrate` once the entry is registered, or Andy keeps ISDN.

**C5c. Nitroglycerin.** Vasospasm acute-pain row uses the Nitrostat label (DailyMed cc481829): 1 SL tablet, repeat q5 min, max 3 in 15 min. The label indication is angina due to CAD. Vasospasm use follows Table 17 baseline. PDE-5 contraindication from label; window timing (C8) not in label.

**C6 (doses).** The 2023 table doses (verapamil 40 mg BID, ISMN 10 mg BID) are now in the drug entries as conflicts, not as the recommended dose. Andy must choose before any dose is shown as the default.

**Provocation agents (no drug entries).** Acetylcholine and ergonovine are cath-lab provocation agents. Tree text should name "provocation testing" without a drug link. Do not link to `methylergonovine` (a different drug).

**Aspirin and clopidogrel links.** `aspirin/acs` opens the ACS / STEMI loading row (162-325 mg), and `clopidogrel/acs` opens the ACS / NSTEMI 300/600 mg loading rows. Both conflict with C2 (SCAD antiplatelet is undecided). Flag before wiring; the links may show loading doses in a SCAD context.

**Verification gaps.**
- Cardizem and Calan/verapamil label revision dates were not captured on read. Dr. Kitlowski to confirm.
- Table 17 was read from the AHA 2023 slide set (professional.heart.org), not the journal table.
- Verapamil entry uses the generic verapamil IR label (setid ebc9a09a), not the Calan brand label.

## Dr. Kitlowski clinical audit (2026-10-27)

**Verdict: REVISE (not safe to deploy yet).** Nothing was auto-fixed. Every finding below is FLAGGED for Andy because each touches a directive, a number a clinician acts on, a source conflict, or a citation the gate does not allow me to apply.

### Auto-fixes applied
- None. The consult text was already conservative (no numeric vasospasm doses; conflicts stated as conflicts). No sourced number needed correcting in the files, and the only wording issues found (below) change clinical meaning or the duration, so they go to Andy.

### Citation gate (guideline-versions.md)
- `~/Desktop/claude-brain/wikis/emergency-medicine/guideline-versions.md` lists SSC, 2025 ACC/AHA ACS, and 2022 ACC chest-pain ECDP only. It has no row for: AHA 2018 SCAD statement (ref 1), ESC-ACCA 2018 (ref 2), 2023 AHA/ACC chronic coronary disease (ref 3), Saw 2017 (ref 4), Pasupathy 2015 (ref 5), Beltrame 2017 (ref 6), Ghadri 2018 (ref 7), Ong 2014 (ref 8), the PDE-5 review (ref 9), the sildenafil label (ref 10), the ESC e-journal page (ref 11), or JCS 2023 (ref 12).
- Gate result: all 12 references are FLAGGED. None was added to the table (rows need a DOI fetched this run). Refs 7, 8, 9, 12 have no author/DOI verification; ref 9 has no author list and the text itself says "authors to confirm"; ref 12 is a PubMed ID only.
- Ref 2 full text and ref 4 author list remain unverified (see open questions 3 and 4).

### Flagged for Andy (clinical directive or number; no change made)
1. **F1 - Pre-angiography heparin and antiplatelet (C1).** Node `scad-vasospasm-stabilise` and critical action 2 defer this to a conflict. The app shows no default. Patient-safety item: needs Andy's rule before deploy.
2. **F2 - Conservative-SCAD DAPT (C2).** `scad-vasospasm-scad-antithrombotic` shows three positions. The drug links `[aspirin](#/drug/aspirin/acs)` and `[clopidogrel](#/drug/clopidogrel/acs)` open ACS loading rows (aspirin 162-325 mg; clopidogrel 300/600 mg). Those are ACS loading doses shown inside a SCAD node whose plan is unsettled. Recommend Andy either removes the links here or approves a SCAD-specific hint. Not changed.
3. **F3 - Beta-blocker SCAD directive (C4, C7).** `scad-vasospasm-scad-beta` is labelled pending, which is correct. Two issues: (a) the body states "HR 0.36" from one observational series as the headline number; (b) the info-page Do-NOT item "Do NOT assume non-selective beta-blockers are safe" is expert opinion, and labetalol and carvedilol status is open. Andy to rule keep or delete.
4. **F4 - Wrong nitrate drug link (C5).** `scad-vasospasm-spasm-treat` links `[isosorbide dinitrate](#/drug/isosorbide-dinitrate/angina)`. The entry's indication is stable-angina prophylaxis. The guideline example is isosorbide mononitrate. The mononitrate entry exists only in `src/data/new-content/drugs-sbo-scad.ts` (not registered). Andy to choose; the link should not stay on ISDN for vasospasm by default.
5. **F5 - CCB agent and dose conflict (C5a, C6).** Verapamil label (80-120 mg TID for vasospastic angina) vs 2023 AHA/ACC Table 17 (40 mg BID, uptitrated). ISMN label (20 mg BID, 7 h apart) vs Table 17 (10 mg BID). Amlodipine has label support (5-10 mg daily) but is not in the guideline for vasospasm. Diltiazem label (30 mg QID start; 180-360 mg/day) has no guideline conflict. Andy to choose agents and whether any dose is shown. The consult currently shows no dose, which is safe as drafted. Do not add a dose without a ruling.
6. **F6 - Spasm threshold (">90%" vs "90% or more").** `scad-vasospasm-spasm-recognition` and `scad-vasospasm-spasm-provocation` both say ">90%". Secondary snippets of the COVADIS / Beltrame criteria give ">90%" in one place. I could not open the primary abstract (PubMed 26245334 returned a scrape failure this run). This is a diagnostic cut-off, so it is flagged, not changed. Verify against the Beltrame 2017 text before sign-off.
7. **F7 - PDE-5 windows (C8).** 24 h (sildenafil, vardenafil) and 48 h (tadalafil) come from the ACC/AHA-cited review (ref 9), which has no confirmed author list. The window is a safety number. The sildenafil label (ref 10) gives no window. Andy to confirm the windows and pin the label version before the nitrate steps go live.
8. **F8 - Admission duration and ED discharge (C9).** Critical action 5 states "3 to 5 days ... is justified (AHA 2018)" as settled, while the admit node and the conservative node say "final duration pending". The critical action and the node disagree. Recommend Andy picks the wording. The ED-discharge rule is expert opinion.
9. **F9 - Unsourced pregnancy and contraception detail.** `scad-vasospasm-followup` lists specific contraception options and says tubal ligation is "after DAPT is stopped." I did not confirm this against the AHA 2018 text. Flagged as unverified.
10. **F10 - Takotsubo and myocarditis text (C10).** Mimics node: "discuss with cardiology before catecholamines or inotropes" is unsourced. Ref 7 is unverified. Andy to keep or source.

### Drug entries (SCAD links)
- Links that resolve in `src/data/drug-store.ts`: `alteplase/stemi`, `aspirin/acs`, `clopidogrel/acs`, `nitroglycerin/acs`, `isosorbide-dinitrate/angina` (hints match existing `indications`).
- Not yet wired: the new drug entries live only in `src/data/new-content/drugs-sbo-scad.ts`. Entries for amlodipine and isosorbide-mononitrate are not registered in `drug-store.ts`, and the diltiazem and verapamil additions are not merged. Any link to them would be dead until the integrator registers them. This blocks deploy.
- Diatrizoate entry (SBO) is outside this consult and was not audited here.
- The consult does not link heparin (no heparin entry needed for the link set).
- Each drug-entry dose above is recorded with its label source and the guideline conflict. None was resolved.

### Structural and reachability
- No em dashes found in the tree, info, or toolbar files.
- No andexanet reference in scope.
- Reachability and link checks were recorded as passing in the 2026-10-27 pass above; not re-run in this audit.
- Toolbar `TOOLBAR_SCADV` is not registered in `toolbar-configs.ts` (integrator item).

### Remains for Andy before deploy
- F1 through F10 above, plus the open signoff checklist items C1-C10 and open questions 1-15.
- Citation gate: add verified rows to guideline-versions.md (with DOIs fetched) for refs 1, 2, 3, or accept the FLAG per the gate rule.
- Integrator: register drug entries and the toolbar; re-run the link and reachability check after registration.

### Dr. Kitlowski signoff
Verdict: REVISE. The SCAD content is well sourced for the parts that are settled, and the draft correctly declines to pick numbers it cannot verify. It is not safe to deploy yet. The antithrombotic defaults (F1, F2), the ACS aspirin and clopidogrel loading links inside a SCAD node (F2), the wrong nitrate link (F4), and the unresolved CCB and nitrate doses (F5) are all decisions Andy has to make. Two references (ref 9 and ref 12) cannot be cited as verified. The drug entries are not registered, so the links would fail. Once Andy rules on F1-F10 and the integrator registers the entries, I will re-audit the changed nodes.

## Fixed after Dr. K audit (2026-10-27, mechanical only)
- Amlodipine (`src/data/new-content/drugs-sbo-scad.ts`): the 2.5 mg start is now attributed to the label hypertension section (dosing 2.1). The angina section gives only "5-10 mg, with the lower dose suggested in the elderly and in patients with hepatic insufficiency". Label checked on DailyMed setid abd6a2ca, 2026-10-27.
- `src/data/trees/scad-vasospasm.ts`: draft, sign-off and "Andy to rule" wording removed from node text, options and summaries. The beta-blocker node now reads as evidence with no directive. Conflicts are still shown. No number changed.

## Applied recommendations (2026-10-27)

Source: `research/new-content/RECOMMENDATIONS.md`, SCAD rows 4-12. Files changed: `src/data/trees/scad-vasospasm.ts`, `src/data/new-content/scad-vasospasm-info.ts` (citation lists kept identical). No deploy, commit, or push.

- **Row 4 (nitrate link): applied.** Spasm treatment node now links `[isosorbide mononitrate](#/drug/isosorbide-mononitrate/vasospastic-angina)`. The hint matches the indication string in `drugs-sbo-scad.ts` ("Vasospastic angina (second-line add-on to calcium channel blocker)"). The link stays dead until the drugs agent registers the entry in `drug-store.ts`. The ISDN link is removed from this consult.
- **Row 5 (CCB and ISMN doses): applied.** Diltiazem, amlodipine, and verapamil are named with no doses, and ISMN is named with "dose per cardiology." Source: 2023 AHA/ACC Table 17 (ref 3), the verapamil example text is kept as the table's named example.
- **Row 6 (spasm threshold): applied-with-change, number removed (unverified).** Beltrame 2017 full text could not be opened. The journal page returned HTTP 429 and the search excerpt only reproduces the ">90%" wording through a guideline table. Per the rule, the number is removed. Both spasm definitions now read "marked focal constriction" (ref 6). The fallback "about 90%" was also not confirmed, so it is not used.
- **Row 7 (PDE-5 windows): applied-with-change.** The 24 h sildenafil/vardenafil window is removed: the sildenafil (Viagra) label (labeling.pfizer.com, set 652) says nitrates are contraindicated and that the safe interval is unknown, so no 24 h figure is supported. Tadalafil keeps a 48 h figure from the Cialis label (Lilly medical information page and label excerpt): nitrates contraindicated, allowed only in a life-threatening situation, at least 48 h after the last dose. ACC/AHA CCD 2023 was not used for the window. The ACC/AHA-cited 2011 review (old ref 9) is replaced by the Cialis label (new ref 7). Label versions still need pinning at sign-off.
- **Row 8 (monitoring duration): applied.** All "3 to 5 days" numbers removed (critical action 5, conservative node, monitored-admission node and recommendation, admission summary, Do-NOT admission item). Wording is "monitored admission; duration with cardiology." The earlier contradiction between the critical action and the node is also resolved.
- **Row 9 (contraception): applied.** The option list (vasectomy, tubal ligation, LNG-IUD) is deleted. The line now reads "discuss future-pregnancy risk with cardiology and OB." The general avoid-pregnancy and exogenous-hormone sentence is kept, as the row did not ask for its removal.
- **Row 10 (takotsubo and myocarditis): applied.** Kept as labelled "(expert opinion)" with no numbers and no citation. The takotsubo consensus citation (old ref 7) is removed.
- **Row 11 (citations): applied within the consult.** Final list is 1-6 unchanged (draft tags stripped from the text), plus 7 = Cialis label, 8 = sildenafil label, 9 = ESC e-journal summary (old 9, 10, 11 renumbered). Old refs 7, 8 (Ong 2014 ACh study) and 12 (JCS 2023) are removed from the text and lists. Their claims are carried by ref 3 or dropped. The guideline-versions.md rows for refs 1-3 are NOT done here (other agent owns that file).
- **Row 12 (toolbar registration): already applied, no edit.** `TOOLBAR_SCADV` is imported and registered as `'scad-vasospasm': TOOLBAR_SCADV` in `src/data/toolbar-configs.ts` (present in HEAD). The toolbar's targets exist.

Verification after edits: citation numbers used are 1-9 and all defined. `bunx tsc --noEmit --skipLibCheck --noUnusedLocals false` exits 0.

Still open (not in the rows): "not sourced here" status notes in the recurrence, anticoagulation, and admission nodes; the DAPT, beta-blocker, and PCI decisions in the C-list above; Dr. K's F-items.

## Applied recommendations (2026-10-27), drugs pass
Source: `src/data/new-content/drugs-sbo-scad.ts`.
- Row 5 drug doses: **applied**. Diltiazem, amlodipine, verapamil and isosorbide mononitrate now name the drug with "dose per cardiology" and no dose. Doses were removed because the label and the 2023 AHA/ACC Table 17 do not agree for these drugs (verapamil 40 mg BID in the table versus 80-120 mg TID in the label; diltiazem and amlodipine not named as vasospasm doses in the table). ISMN's asymmetric 7 h schedule line also removed.
- Row 4 nitrate link: **not in drugs scope**. The tree link is a consult-tree change; the ISMN entry is registered (`isosorbide-mononitrate`), so the tree can be repointed by the tree owner.
- Rows 6-12: not in drugs scope (citation and tree changes).
- Nitroglycerin SL addition untouched.

## Dr. Kitlowski RE-AUDIT (2026-10-27, after Andy's rulings and applied recommendations)

**Verdict: REVISE.** Not safe to deploy. One wiring defect blocks any load, and several items remain open for Andy.

### Primary sources opened this run
- ESC-ACCA 2018 (Adlam, Eur Heart J 39:3353, doi 10.1093/eurheartj/ehy080), journal full text via WebFetch: "Thrombolysis is therefore contraindicated for the acute management of SCAD." CONFIRMED. The paper does not mention heparin. It says "most authors advocate acute dual antiplatelet therapy (usually with aspirin and clopidogrel)" and that anticoagulation "should probably be limited to acute administration during revascularization procedures". It describes beta-blocker treatment with a reduced risk of recurrence as a non-randomized finding.
- Sildenafil (Viagra) US PI, labeling.pfizer.com set 652, Section 4.1: nitrates contraindicated; "After patients have taken VIAGRA, it is unknown when nitrates, if necessary, can be safely administered." CONFIRMED for the "interval unknown" statement. No 24 h window is stated.
- Tadalafil (Cialis) PI: PDF was unreadable in WebFetch; DailyMed search returned no result. The 48 h interval is NOT confirmed. Per the sourcing rule the number was removed (see edits below).
- Firecrawl credits exhausted this run; WebFetch used instead.
- Not re-opened: Beltrame 2017 (spasm threshold; the number was already removed per Row 6), Table 17 (2023 AHA/ACC), ISMN and verapamil labels (no change this run).

### Edits made in this re-audit (consult files only)
1. `src/data/trees/scad-vasospasm.ts`, node `scad-vasospasm-stabilise`: the ESC attribution changed from the ESC secondary summary to ESC-ACCA 2018 primary wording ("most authors advocate acute dual antiplatelet therapy, usually aspirin and clopidogrel") [2]. The pre-angiography ACS directive is unchanged (Andy ruling C1).
2. `scad-vasospasm.ts`, node `scad-vasospasm-scad-beta`: "The ESC summary recommends them in all patients" now carries the attribution to the secondary summary [9]. ESC-ACCA 2018 [2] is added and describes the recurrence finding as non-randomized. The directive "suggest a beta-blocker" is unchanged (Andy ruling C4). Node citation array changed from [4,1,9] to [4,1,2,9].
3. `scad-vasospasm.ts`, node `scad-vasospasm-spasm-treat`, and the same text in `scad-vasospasm-info.ts` (Do-NOT admission/discharge item): the tadalafil "at least 48 hours after the last dose" number is REMOVED because it could not be confirmed. Text now reads "The tadalafil label contraindicates nitrates. The post-dose interval is not confirmed in this review; do not give a nitrate without a documented PDE-5 washout set by pharmacy or cardiology." This is a safety-window change. Andy must confirm the window from the label before a number is reinstated.
4. Ref 7 (both files): the "48 hours" text is removed; now "Nitrates contraindicated. Time interval after the last dose not confirmed." The two citation lists remain identical.
Typecheck: `bunx tsc --noEmit --skipLibCheck --noUnusedLocals false` printed no errors.

### Blocking (not auto-fixed; shared files, integrator or Andy)
- **B1. Entry node id mismatch (blocks load).** `src/services/tree-service.ts` (scad-vasospasm loader) and `src/data/categories.ts` (line ~2104) both set `entryNodeId: 'scadv-start'`. The tree's start node is `scad-vasospasm-start`. Starting the consult would target a node that does not exist. Fix: change both to `'scad-vasospasm-start'`. Not edited here because these are shared registration files.
- **B2. Cross-file gate.** The fallback tree-service nodeCount/citation wiring cannot be verified until B1 is fixed and the consult is run.

### Open flags for Andy (not changed; directive or sourcing decisions)
- **F-A. Stop anticoagulation wording.** The critical action and stabilise node say "stop systemic anticoagulation ... once SCAD is confirmed." AHA 2018 says "consider stopping." Andy ruled C1 as "stop", so the ruling is kept, but the cited source is weaker. Andy to confirm the stronger wording is intended.
- **F-B. Pregnancy and hormone line (followup node and Do-NOT item).** "Patients with SCAD are generally advised to avoid both pregnancy and exogenous hormones" is cited to [1] and has not been confirmed in the AHA 2018 text. Row 9 asked only for the contraception option list to be deleted. Andy to keep or source it.
- **F-C. Cardiac rehab and statin lines (followup node).** "discussed in AHA 2018, with individualized exercise thresholds" and "no association with recurrence was found" are cited to [1] and not re-verified in this pass. Source or label as expert opinion.
- **F-D. DAPT attribution (antithrombotic node).** "described as generally accepted in the ESC summary [9]" remains a secondary-summary attribution. The ESC-ACCA primary [2] says "most authors advocate acute DAPT". Andy to decide whether to switch attribution.
- **F-E. Tadalafil PDE-5 window.** See edit 3. The window needs a label read before the nitrate steps go live.
- **F-F. Citation gate.** guideline-versions.md still has no rows for refs 1-9. Under the gate, all remain FLAGGED until DOIs are fetched and rows are added by the table owner.
- **F-G. Spasm threshold.** Row 6 removed the ">90%" number. Beltrame 2017 was not re-opened (no primary text retrieved). Diagnostic criterion remains "marked focal constriction" until Andy or a re-read decides.
- **F-H. Empiric treatment with no testing (spasm-provocation option).** Unsourced; flagged for local protocol.
- **F-I. Drug links.** `#/drug/isosorbide-mononitrate/vasospastic-angina` resolves to a registered entry (confirmed in drugs-sbo-scad.ts and the drug-store merge loop). The `aspirin/acs`, `clopidogrel/acs`, and `nitroglycerin/acs` links open ACS loading rows inside a SCAD node. Andy's ruling on antiplatelets covers the node text; the links still show ACS loading doses. Andy to confirm or remove them.

### Checks passed this re-audit
- No em dashes in the tree, info, toolbar, or drugs-sbo-scad files.
- Node ids (21) match categories.ts nodeCount (21). All internal `#/node/` links resolve to existing ids.
- Citation numbers 1-9 are defined in both lists and used in the tree. The two lists are identical.
- Toolbar targets (`scad-vasospasm-steps`, `-route`, `-spasm-recognition`, `-scad-stratify`, `-disposition`) exist. Toolbar is registered in toolbar-configs.ts.
- INFO_PAGES_SCADV is spread into info-pages.ts; stop and steps pages present.
- Andexanet and anticoag-reversal were not in scope and were not touched.

### Dr. Kitlowski signoff (re-audit)
REVISE. Fibrinolysis contraindication and the "suggest beta-blocker" directive are now sourced to the primary text as far as the sources allow. Blocker B1 (entry node id) must be fixed before any deploy. F-A through F-I need Andy's decision or a source read before APPROVE.

## Patch 2026-10-27 (alteplase link)

- `scad-vasospasm.ts` antithrombotic node: the `[alteplase](#/drug/alteplase/stemi)` link is replaced with plain text ("alteplase or other fibrinolytics"), with a note that STEMI lytic dosing is deliberately not linked. No fibrinolytic dosing opens inside SCAD. No other alteplase or STEMI-lytic link exists in the SCAD tree or info page.
