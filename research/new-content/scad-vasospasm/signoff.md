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
- [ ] C1: decide the pre-angiography antithrombotic rule when SCAD is not yet excluded
- [ ] C2: decide the default antiplatelet plan and duration after conservative SCAD and after stenting
- [ ] C3: confirm fibrinolysis wording ("contraindicated", ESC-ACCA 2018)
- [ ] C4: decide the SCAD beta-blocker directive (observational HR 0.36 vs AHA "selective" language vs ESC "recommended in all")
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
