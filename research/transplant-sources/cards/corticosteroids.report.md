# SHORTENING PASS (latest): list items merged; prednisone 24 non-interaction lines, methylprednisolone 38; no term dropped, longest 199/200.

# LATEST (re-verification D1-D5): DONE. Prednisone anaphylaxis is a plain list line (row and class effect removed; class effects now adrenal, infection, GI perforation); methylprednisolone anaphylaxis row text says the warning is Solu-Medrol's. Blood pressure/fluid, potassium and heart failure are separate lines; order moved (tumor lysis, systemic sclerosis, overdose, epidural before contraindications; carbohydrate tolerance after cerebral malaria); added enhanced effect, caution list, optic neuritis (methylprednisolone) and heart failure/alkalosis/skin tests (prednisone); Medrol named on facial erythema and liver-enzyme detail; contraindication lines split; prednisone Skin and Neurologic split. Prednisone rows: adrenal, infection, GI perforation; 26 non-interaction lines. Methylprednisolone rows: adrenal, infection, anaphylaxis, GI perforation, liver; 42 non-interaction lines. Longest line 200. tsc clean.

# CORRECTION (latest): prednisone cap relaxed
Restored on the prednisone card, each as its own line from the prednisone label: Amebiasis; Cerebral malaria; Cataracts and glaucoma; Ocular herpes simplex; Kaposi's sarcoma; Enhanced effect (hypothyroidism, cirrhosis); Cautions (renal insufficiency, hypertension, osteoporosis, myasthenia gravis); Calcium (excretion). Bare list items grouped last: Musculoskeletal; Skin and neurologic; Other listed (incl. increased intraocular pressure). Prednisone non-interaction lines now 22 (was 12); longest line 199; methylprednisolone unchanged (34, longest 200). tsc clean. The "left without a line" paragraph below is void.

# Corticosteroids card report: FINAL FIX ROUND (supersedes the sections below where they differ)

Verifier findings (corticosteroids.verify.md): 1 DONE (Solu-Medrol sepsis line, as worded by the label, SM-named); 2 DONE (cow's-milk line plus contraindication clause); 3 DONE (anaphylaxis is now a row, tx-infusion-anaphylaxis, on both cards); 4 DONE (LV free-wall rupture line); 5 DONE (prednisone cyclosporin is a plain line saying the label's only interaction text concerns methylprednisolone; kept, not dropped); 6 DONE (isoniazid and aspirin clearance under "Lowers the other drug:"; aspirin caution also plain); 7 DONE (Strongyloides in the label's words); 8 DONE (every Solu-Medrol-only line names Solu-Medrol; Medrol/Solu-Medrol pairs merged: cyclosporin, vaccines, ketoconazole, troleandomycin); 9 DONE (synthetics-less-likely qualifier restored); 10 DONE for methylprednisolone (TB, HBV, Strongyloides, amebiasis, cerebral malaria, pressure, potassium, eyes, ocular herpes, tendon, bone, muscle, skin, neurologic split); prednisone merged to stay at 12 (see below); 11 DONE (hydrocortisone clause is its own plain line naming hydrocortisone); 12 DONE (GI row carries the caution list); 13 DONE (head "Carbohydrate tolerance:" on both cards); 14 DONE (optic neuritis left held; ITP and intrathecal in Solu-Medrol contraindications line; antidiabetics own plain line); 15 partial (prednisone: no room under the cap). No DISAGREE.
TAXONOMY conflict: TAXONOMY.md says plain interaction lines sit in alsoOnLabel; your message says LAST in `interactions`. I followed your message (plain lines last in `interactions`).

Rows (both cards): tx-adrenal-insufficiency (rank 1), tx-serious-infection, tx-infusion-anaphylaxis, drug-gi-perforation; methylprednisolone also drug-hepatotoxicity (Solu-Medrol only). All ids ALLOWED in TAXONOMY.md (checked by script). Pancreatitis is a plain late line, not a row. Hyperglycaemia and psychiatric are plain lines. No timing badges. Class effects (all three labels): adrenal, infection, anaphylaxis, GI perforation.
Measures: prednisone rows 4, interactions 1 headed (Avoid together) + 2 plain (Cyclosporin, Aspirin), non-interaction lines 12, longest 199, mechanism 101. methylprednisolone rows 5, interactions 13 headed (Raises level 4, Lowers level 3, Adds potassium risk 2, Raises the other drug 1, Lowers the other drug 2, Avoid together 1) + 7 plain (Vaccines routine, Oral anticoagulants, Aspirin and NSAIDs, Antidiabetics, Anticholinesterases, Aminoglutethimide, Amphotericin B and hydrocortisone), non-interaction lines 34 (owner exception), longest 200, mechanism 101. Zero lines over 200; every Solu-Medrol-only line names Solu-Medrol; tsc clean.
Prednisone warned events left without a line to stay at 12: amebiasis, cerebral malaria, eyes (cataract, glaucoma, eye pressure, ocular herpes), Kaposi's sarcoma, skin, neurologic list, hypothyroid/cirrhosis effect, calcium excretion, cautions in myasthenia gravis, renal insufficiency and osteoporosis. Tell me if you want any back.
Adrenal rows. prednisone: "Adrenal insufficiency: drug-induced secondary insufficiency may persist for months after stopping; the label says hormone therapy should be reinstituted in any stress during that period." methylprednisolone: "Adrenal insufficiency: insufficiency after withdrawal may persist for months; the label says hormone therapy should be reinstituted in any stress then; Solu-Medrol: HPA suppression is reversible."
First three alsoOnLabel (both cards): "Stress dosing: in a patient on corticosteroids under unusual stress, the label says increased dosage of rapidly acting corticosteroids is indicated before, during and after the stress"; "Stopping: ... withdrawing gradually, not abruptly ... salt and/or a mineralocorticoid because mineralocorticoid secretion may be impaired" (prednisone wording; the methylprednisolone line says Medrol adds the salt sentence); "Varicella and measles: serious or fatal in non-immune patients; ...".
Added warnings (label quotes, Solu-Medrol):
- Sepsis: "A study has failed to establish the efficacy of methylprednisolone sodium succinate in the treatment of sepsis syndrome and septic shock. The study also suggests that treatment of these conditions with methylprednisolone sodium succinate may increase the risk of mortality in certain patients (i.e., patients with elevated serum creatinine levels or patients who develop secondary infections after methylprednisolone sodium succinate)." Card: "Solu-Medrol and sepsis: a study failed to establish efficacy in sepsis and septic shock and suggests it may raise mortality in certain patients (elevated creatinine, or secondary infections after it)".
- Cow's milk: "The SOLU-MEDROL 40 mg presentation includes lactose monohydrate produced from cow's milk. This presentation is therefore contraindicated in patients with a known or suspected hypersensitivity to cow's milk ..." and (Warnings) "In patients receiving the 40 mg presentation ... where these symptoms worsen or any new allergic symptoms occur, consideration should be given to the potential for hypersensitivity reactions to cow's milk ingredients ... Alternative treatments, including the use of corticosteroid formulations that do not contain ingredients produced from cow's milk, should be considered". Card: "one presentation has lactose from cow's milk" (strength not stated).
- LV rupture: "Literature reports suggest an apparent association between the use of corticosteroids and left ventricular free wall rupture after a recent myocardial infarction; therefore, therapy with corticosteroids should be used with great caution in these patients." 
- Anaphylaxis: Solu-Medrol "Rare instances of anaphylactoid reactions have occurred in patients receiving corticosteroid therapy"; Medrol/Hikma: "Urticaria and other allergic, anaphylactic or hypersensitivity reactions" (row on both cards).
Registration lines: drugs/index.ts needs `import * as corticosteroids from './corticosteroids.js';` and `'corticosteroids.ts': corticosteroids,` in TX_GROUPS. Class tx-corticosteroid and the three sources are in the file. Pharmacy ids unchanged (prednisone, methylprednisolone). Organs empty.

----- earlier report (partly superseded) -----
# Corticosteroids card report (prednisone, methylprednisolone)

Author file: src/data/transplant-drugs/drugs/corticosteroids.ts (exports DRUGS, CLASSES, SOURCES). Labels saved in research/transplant-sources/dailymed/: hikma_3115aef0.xml, medrol_39d5270b.xml, solumedrol_7271310c.xml. All three read in full from the SPL XML.

## Labels
| Card | Label | Labeler | setid | SPL effective | Label "Revised" text | Names transplant or rejection? |
|---|---|---|---|---|---|---|
| prednisone | PredniSONE tablets, solution, Intensol (generic, no brand label exists) | Hikma Pharmaceuticals USA Inc. (labeler recorded in MANIFEST.md section 20) | 3115aef0-fd50-4ec8-a064-3effb695f3f2 | 2025-04-22 | Revised February 2024 | No |
| methylprednisolone (anchor) | Medrol tablets | Pharmacia & Upjohn (Pfizer) | 39d5270b-d957-4821-93d6-501b7b9f02d4 | 2025-11-14 | Revised November 2025 | No |
| methylprednisolone (second) | Solu-Medrol sterile powder | Pharmacia & Upjohn (Pfizer) | 7271310c-7764-4812-aa30-a5e90987c7a9 | 2026-06-25 | Revised November 2025 | No |

Searched all three full texts (indications, contraindications, warnings, precautions, adverse reactions, interactions, overdosage, clinical pharmacology, dosage) for transplant, rejection, graft, organ: no label names transplant or rejection. Indications are endocrine, rheumatic, collagen, dermatologic, allergic, ophthalmic, respiratory, hematologic, neoplastic, edematous, GI, nervous system and miscellaneous conditions. Any statement of transplant use is not ours to write; none is written. Organs (`cancers`) are EMPTY on both cards: the consult's "browse by organ" cannot list them; the owner must decide how they are listed.

## Card measures (from the loaded file)
- prednisone: 4 effect rows, 14 "Also on the label" lines (2 interaction-block lines, 1 unheaded interaction line, 11 other), longest line 199, no timing badges, mechanism 101.
- methylprednisolone: 5 effect rows, 37 lines (14 interaction-block lines, 4 unheaded interaction lines, 19 other), longest 199, no timing badges, mechanism 101. Class mechanism 101.
- Zero lines over 200, zero badges, every line has a head of 1-5 words and a cite. tsc --noEmit --skipLibCheck --noUnusedLocals false: clean.
- Non-interaction count is over 12 on both: prednisone 11 (within limit); methylprednisolone 19. Every one of the 19 is a warned event or a label-listed hazard; the lowest-yield, cut first: "Other listed", "Eyes and bones", "Tumor lysis syndrome", "Systemic sclerosis", "Solu-Medrol epidural use", "Medrol salt". I kept them because each is a warning in the label.

## Where the labels disagree (and how filed)
- Vaccines: prednisone label only says no smallpox vaccine and no other immunization on corticosteroids (neurologic complications, no antibody response); Medrol and Solu-Medrol say live or live attenuated vaccines are contraindicated on immunosuppressive doses, inactivated may be given (response diminished in Medrol; unpredictable in Solu-Medrol). Filed per label.
- Prednisone has no interactions section. Its only interaction text names methylprednisolone with cyclosporin; filed under "Raises the other drug" with the sentence that the label names methylprednisolone, not prednisone. It names no CYP3A inducer or inhibitor. Not written for prednisone.
- Medrol alone: salt and/or mineralocorticoid with hormone therapy; ketoconazole and troleandomycin; phenobarbital, phenytoin, rifampin; aspirin clearance. Solu-Medrol alone: CYP3A4 inducers and inhibitors, macrolides, estrogens, cholestyramine, isoniazid, amphotericin B and diuretics, digitalis, anticholinesterases, aminoglutethimide, antidiabetics, toxic hepatitis, epidural events, traumatic brain injury, rapid IV arrhythmia, acute myopathy, intestinal perforation, peritoneal signs minimal, overdosage. Each is named as that product's in the line text and cites only that label.
- Medrol and Solu-Medrol both: infection, adrenal, GI perforation, pancreatitis, psychiatric, varicella and measles, tuberculosis, hepatitis B, Strongyloides, amebiasis, cerebral malaria, scleroderma renal crisis, tumor lysis, cyclosporin.

## Pharmacy ids (pharmacyDrugId, pin:false)
prednisone -> `prednisone` (drug-store.ts line 5761). methylprednisolone -> `methylprednisolone` (line 4417; the separate entry `methylprednisolone-iv-asthma` also exists and was not used).

## Existing categories used and why the page fits
- tx-serious-infection (tpe-infection-timeline): all three labels warn of infection with any pathogen, mask signs.
- drug-adrenal-insufficiency (adrenal-insufficiency / ai-start): the page is the adrenal insufficiency consult; the label hazard is adrenal suppression and insufficiency after withdrawal.
- drug-gi-perforation (abdominal-pain-hub / ap-perf-entry): labels list peptic ulcer with perforation (Solu-Medrol: intestinal perforation).
- drug-pancreatitis (acute-pancreatitis / ap-start): all three list pancreatitis (bare list item, no further detail).
- drug-hepatotoxicity (hepatitis / hepatitis-start): Solu-Medrol toxic hepatitis only (card methylprednisolone, cites Solu-Medrol only).
- tx-nodat NOT used: its page (diabetes-management / dm-new-dx) is "New Diabetes Diagnosis", T1 vs T2 classification; the labels do not name transplant and speak of decreased carbohydrate tolerance and increased insulin needs in known diabetics. Does not fit.
- drug-hyperglycemia NOT used: its page (odse-tox-route-hyperglycemia) is a static list of oncology drug classes and says it covers only "the cards that carry it"; steroid cards are not on it.

## PROPOSED new categories (lines waiting on them are in "Also on the label")
1. tx-steroid-hyperglycemia, "Hyperglycemia from steroids", page: existing Hyperglycemia ED treatment tree (hyperglycemia-ed / hg-start) with a crisis screen; lethality tier 2; complaints vomiting-polyuria, fatigue-hypotension, confusion-neuro. Waiting: the "Hyperglycemia:" line on both cards.
2. tx-steroid-psychiatric, "Psychiatric effects", page about acute psychiatric change (euphoria, insomnia, mood swings, depression, psychosis) in a patient on a corticosteroid and what to rule out; tier 2; complaints confusion-neuro. No such page exists in the oncology or transplant sets. Waiting: the "Psychiatric effects:" line on both cards.
3. Optional: a varicella and measles exposure page, tier 2, complaints fever, rash-skin; waiting: "Varicella and measles:" line.

## Registration lines for the integrator
- src/data/transplant-drugs/drugs/index.ts: `import * as corticosteroids from './corticosteroids.js';` and `'corticosteroids.ts': corticosteroids,` in TX_GROUPS.
- Class `tx-corticosteroid` ("Corticosteroids") is defined in the file's CLASSES; the "Maintenance" section assignment is the integrator's (the file has no section field).
- Sources pi-prednisone-hikma, pi-medrol, pi-solumedrol are in the file's SOURCES.

## Interaction block as written (heads fixed; "Adds kidney risk:" has no line, no label names a kidney interaction)
## prednisone
- Raises the other drug: cyclosporin: the label names methylprednisolone, not prednisone; mutual inhibition of metabolism makes adverse events of either drug more apt; convulsions reported [pi-prednisone-hikma]
- Avoid together: smallpox vaccine; other immunization should not be undertaken on corticosteroids, especially high dose, for risk of neurological complications and no antibody response [pi-prednisone-hikma]
## methylprednisolone
- Raises level: ketoconazole and troleandomycin may inhibit methylprednisolone metabolism and lower its clearance; the label says the dose should be titrated to avoid steroid toxicity [pi-medrol]
- Raises level: Solu-Medrol label: CYP3A4 inhibitors (ketoconazole, erythromycin, troleandomycin) and macrolides may raise corticosteroid levels; ketoconazole cut metabolism of some by up to 60% [pi-solumedrol]
- Raises level: estrogens, including oral contraceptives, may decrease hepatic metabolism of certain corticosteroids and increase their effect [pi-solumedrol]
- Lowers level: phenobarbital, phenytoin and rifampin may increase methylprednisolone clearance; the label says its dose may need to be raised to get the desired response [pi-medrol]
- Lowers level: Solu-Medrol label: CYP3A4 inducers (barbiturates, phenytoin, carbamazepine, rifampin) may enhance corticosteroid metabolism, so the corticosteroid dosage needs to be increased [pi-solumedrol]
- Lowers level: cholestyramine may increase the clearance of corticosteroids [pi-solumedrol]
- Lowers level: corticosteroids may decrease serum isoniazid concentrations [pi-solumedrol]
- Lowers level: methylprednisolone may increase clearance of chronic high-dose aspirin, lowering salicylate levels, or raise salicylate toxicity risk when methylprednisolone is withdrawn [pi-medrol]
- Adds potassium risk: low potassium with amphotericin B or diuretics (potassium-depleting agents); observe closely for hypokalemia; amphotericin B with hydrocortisone preceded heart failure [pi-solumedrol]
- Adds potassium risk: low potassium raises the risk of arrhythmias in patients on digitalis glycosides [pi-solumedrol]
- Raises the other drug: cyclosporin: mutual inhibition of metabolism, so adverse events of either drug may be more apt; convulsions reported with methylprednisolone and cyclosporin [pi-medrol]
- Raises the other drug: cyclosporine: increased activity of both drugs may occur; convulsions have been reported with this concurrent use [pi-solumedrol]
- Avoid together: live or live attenuated vaccines are contraindicated on immunosuppressive doses; killed or inactivated vaccines may be given, but the response may be diminished [pi-medrol]
- Avoid together: live or live attenuated vaccines are contraindicated on immunosuppressive doses; inactivated vaccines may be given, response unpredictable; defer routine vaccines if possible [pi-solumedrol]

### Interaction statements that fit none of the six heads (written as unheaded lines after the block; integrator to place)
- Oral anticoagulants (Medrol: variable effect; Solu-Medrol: warfarin response usually inhibited; both: monitor coagulation indices).
- Aspirin and NSAIDs (both: aspirin cautiously in hypoprothrombinemia; Solu-Medrol: NSAIDs raise GI side-effect risk). Prednisone card: "Aspirin:" line, same statement.
- Anticholinesterases (Solu-Medrol: severe weakness in myasthenia gravis; withdraw at least 24 hours before starting if possible).
- Aminoglutethimide (Solu-Medrol: may lose corticosteroid-induced adrenal suppression).
- Antidiabetics (Solu-Medrol: dosage adjustment may be required) is folded into the hyperglycemia line. Skin tests (suppressed reactions) folded into "Other listed".

## Held for the overlay (historical, dose-bound or not hazard-describing; exact label sentences)
- Solu-Medrol: "A study has failed to establish the efficacy of methylprednisolone sodium succinate in the treatment of sepsis syndrome and septic shock. The study also suggests that treatment of these conditions with methylprednisolone sodium succinate may increase the risk of mortality in certain patients (i.e., patients with elevated serum creatinine levels or patients who develop secondary infections after methylprednisolone sodium succinate)."
- Solu-Medrol: "The use of oral corticosteroids is not recommended in the treatment of optic neuritis and may lead to an increase in the risk of new episodes."
- Solu-Medrol: "There are reports of cardiac arrhythmias and/or cardiac arrest following the rapid administration of large intravenous doses of SOLU-MEDROL (greater than 0.5 gram administered over a period of less than 10 minutes)." (hazard filed on the card without the dose figure)
- All three: "Other corticoids, including methylprednisolone, hydrocortisone, prednisone, and prednisolone, are considered to be short acting (producing adrenocortical suppression for 1¼ to 1½ days following a single dose)" (alternate day therapy text).
- Solu-Medrol: "Following the initial emergency period, consideration should be given to employing a longer acting injectable preparation or an oral preparation."
- Solu-Medrol: "For chronic overdosage in the face of severe disease requiring continuous steroid therapy, the dosage of the corticosteroid may be reduced only temporarily, or alternate day treatment may be introduced."

## Left off a row under rules 3 and 4
- Timing: no badge anywhere. Adrenal: the only figure is "1¼ to 1½ days after a single dose" (alternate-day text, not the whole hazard); "persist for months" has no figure. Solu-Medrol hepatitis "several weeks or longer" has no figure and covers pulsed high dose only.
- Row amplifiers left off: infection rows keep "risk rises with dose" only; adrenal rows omit the stress-dosing instruction (own first line); the Solu-Medrol 1 gram/day pulse dose is omitted from the liver row; the intestinal-perforation IBD amplifier ("particularly in patients with inflammatory bowel disease") is not on the GI row.

## "Not in the label" claims (sections searched)
- No transplant, rejection or graft wording: all sections of all three labels (grep plus full read).
- No CYP3A inducer or inhibitor text in prednisone: no interactions section; precautions, warnings, adverse reactions, dosage read.
- No overdosage section in prednisone or Medrol.
- Medrol: no mention of hyperglycemia by name (listed only as decreased carbohydrate tolerance, latent diabetes, increased insulin needs); no kidney-toxicity interaction in any label.
- No boxed warning in any of the three labels, so no boxed rows.
- No "postmarketing" flag used: no label says the pancreatitis or other listed reactions come only from after approval (tumor lysis syndrome is stated as postmarketing and sits in "Also on the label" with "reported after approval").

## Tempted but not written
- Any stress-dose or taper schedule, hydrocortisone equivalence or prednisone-equivalent conversion (Solu-Medrol has an equivalence table; no conversions written).
- That prednisone is a CYP3A4 substrate affected by azoles or inducers, that steroids raise or lower tacrolimus or cyclosporine levels from the CNI side, adrenal crisis presentation, steroid-induced hyperglycemia timing, and use for rejection or maintenance: none is in these labels.
- Pregnancy, nursing, growth and pediatric text (adult scope), benzyl alcohol and neonatal gasping syndrome, intra-articular and injection-site atrophy, left ventricular rupture after myocardial infarction, osteoporosis in postmenopausal women, geriatric use, thyroid clearance changes, hypothyroid and cirrhosis enhanced effect (in "Other listed" for prednisone; Medrol has the same sentence and it is not filed on the methylprednisolone card).
