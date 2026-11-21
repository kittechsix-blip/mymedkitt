# Transplant card taxonomy

Owner-approved tier table and structural choices: `research/transplant-sources/DECISIONS.md` ("Tier table and structural questions: APPROVED", "Q16: settled", "Fable review 2 of 4").
Source of truth in code: `src/data/transplant-drugs/toxicities.ts` and `complaints.ts`. This file is generated from them plus the target nodes' own summaries (run 2026-11-20).
Rules for card authors: a card effect row may use ONLY an id in the two tables below marked ALLOWED. Tier 1 = lethality 1 (can kill within hours), tier 2 = lethality 2, tier 3 = lethality 3.
A hazard with no category here is a plain line in `alsoOnLabel` (head, colon, one hazard, 200 characters or fewer, cited). Boxed hazards still lead each card regardless of tier.
A row whose page is a "[NOT WRITTEN]" placeholder is allowed to exist but the gate "no row without a live page summary" stays red until that page is written.

## Transplant categories (transplant-owned, `tx-` ids)

| id | title | tier | page target (tree / node) | target node summary | complaints | status |
|---|---|---|---|---|---|---|
| `tx-serious-infection` | Serious infection | 1 | (none: page not written) | (none) | fever, dyspnea-cough, confusion-neuro, fatigue-hypotension, diarrhea-abdominal-pain, headache-vision | PLAIN LINE ONLY: the page is not written, so no row; effects render as plain lines (owner decision 2026-11-21) |
| `tx-neurotoxicity` | Neurotoxicity | 1 | transplant-patient-ed / tpe-cni-brain | Tacrolimus labels, neurotoxicity: consider dosage reduction or discontinuation; heart recipients, PRES: gradual blood pressure reduction, CNI reduction or withdrawal, alternate immunosuppressant or CNI (call the transplant team first). | confusion-neuro, headache-vision, numbness-tingling, tremor | ALLOWED (transplant-owned) |
| `tx-hyperkalemia` | Hyperkalemia | 1 | potassium / k-hyper-ecg | First response: check ECG — features confirm diagnosis; normal ECG with severe lab = consider pseudohyperkalemia | weakness, fainting-palpitations | ALLOWED (transplant-owned) |
| `tx-infusion-anaphylaxis` | Anaphylaxis, infusion reaction or cytokine release | 1 | anaphylaxis / anaph-start | Epinephrine is the ONLY first-line treatment — NO absolute contraindications; risk of NOT giving always exceeds risk of giving | dyspnea-cough, rash-skin, fatigue-hypotension, chest-pain | ALLOWED (transplant-owned) |
| `tx-cytopenia` | Low blood counts | 1 | transplant-patient-ed / tpe-cytopenia | **[NOT WRITTEN placeholder or no summary]** | fever, bleeding-bruising, fatigue-hypotension | ALLOWED (transplant-owned) |
| `tx-gi-bleed` | Gastrointestinal bleeding | 1 | gi-bleed-hub / gib-start | Look, count, feel — then commit. Shock index >1 = ongoing loss. Rectal exam now. | diarrhea-abdominal-pain, fatigue-hypotension, bleeding-bruising | ALLOWED (transplant-owned) |
| `tx-angioedema` | Angioedema | 1 | angioedema / angio-start | ~110K ED visits/year, 44% HAE initially misdiagnosed - first run structured airway risk before classification | dyspnea-cough, rash-skin | ALLOWED (transplant-owned) |
| `tx-kidney-graft-thrombosis` | Kidney graft thrombosis | 1 | transplant-patient-ed / tpe-kidney-vascular | **[NOT WRITTEN placeholder or no summary]** | less-urine, diarrhea-abdominal-pain | ALLOWED (transplant-owned) |
| `tx-hepatic-artery-thrombosis` | Hepatic artery thrombosis | 1 | transplant-patient-ed / tpe-liver-vascular | Liver recipients (AASLD/AST 2025): hepatic artery or portal vein stenosis or thrombosis: timely management, particularly urgent for the hepatic artery (Strong, 4); CT angiography if suspected or Doppler inconclusive. | (none: the page is about vascular complications, not a presenting complaint) | ALLOWED (transplant-owned) |
| `tx-meningococcal-infection` | Meningococcal infection | 1 | meningitis / mening-start | Untreated = 100% mortality — abx within 1 HOUR | fever, headache-vision, confusion-neuro, rash-skin | ALLOWED (transplant-owned) |
| `tx-methemoglobinemia` | Methemoglobinemia | 1 | methemoglobinemia / methb-g6pd | MB CONTRAINDICATED G6PD — oxidant causing hemolysis | dyspnea-cough, confusion-neuro, fatigue-hypotension | ALLOWED (transplant-owned) |
| `tx-shock` | Hypotension and shock | 1 | hypotension-workup / hypotension-start | MAP <65 or SBP <90; shock index >1 = unstable; each hour at MAP <65 = 5% mortality increase | fatigue-hypotension, fainting-palpitations, confusion-neuro | ALLOWED (transplant-owned) |
| `tx-qt-prolongation` | QT prolongation | 1 | torsades-de-pointes / tdp-risk-factors | Risk is multiplicative — drug + electrolyte + structural heart is classic scenario | fainting-palpitations, chest-pain, fatigue-hypotension | ALLOWED (transplant-owned) |
| `tx-adrenal-insufficiency` | Adrenal insufficiency | 1 | adrenal-insufficiency / ai-start | Adrenal crisis = hemodynamic deterioration resolving with IV hydrocortisone; 50% present as first diagnosis | fatigue-hypotension, vomiting-polyuria, diarrhea-abdominal-pain, weakness | ALLOWED (transplant-owned) |
| `tx-cni-nephrotoxicity` | Kidney injury from the drug | 2 | transplant-patient-ed / tpe-cni-toxicity | Tacrolimus labels: for neurotoxicity, or raised creatinine with a trough above range, consider dosage reduction (call the transplant team first). Not in the sources used: one toxic level. | less-urine | ALLOWED (transplant-owned) |
| `tx-tma` | Thrombotic microangiopathy | 2 | transplant-patient-ed / tpe-cni-tma | Tacrolimus labels: with signs and symptoms of TMA, consider tacrolimus a risk factor. Cyclosporine labels: management of this thrombocytopenia and microangiopathic hemolytic anemia syndrome is unclear. | bleeding-bruising, fatigue-hypotension, less-urine, confusion-neuro, fever | ALLOWED (transplant-owned) |
| `tx-hemolysis` | Hemolysis | 2 | hemolytic-anemia / hemolytic-anemia-start | LDH high + haptoglobin low = hemolysis; then smear and DAT | fatigue-hypotension, jaundice-lfts, less-urine | ALLOWED (transplant-owned) |
| `tx-hypoglycemia` | Hypoglycemia | 2 | hypoglycemia / hypoglycemia-start | Treat immediately when symptomatic or unsafe to swallow, then determine cause and recurrence risk. | confusion-neuro, tremor, fainting-palpitations, weakness | ALLOWED (transplant-owned) |
| `tx-hyponatremia` | Hyponatremia | 2 | sodium / na-hypo-symptoms | Symptom severity determines urgency — seizures/coma need emergent 3% saline; incidental finding needs slow workup | confusion-neuro, headache-vision, weakness, vomiting-polyuria | ALLOWED (transplant-owned) |
| `tx-ttp-hus` | TTP or HUS | 2 | ttp / ttp-start | MAHA + thrombocytopenia = suspect TTP — >90% mortality without treatment, <10% with prompt TPE | bleeding-bruising, confusion-neuro, less-urine, fever | ALLOWED (transplant-owned) |
| `tx-malignancy` | Lymphoma and other malignancy | 3 | (none: page not written) | (none) | rash-skin, fever, diarrhea-abdominal-pain | PLAIN LINE ONLY: the page is not written, so no row; effects render as plain lines (owner decision 2026-11-21) |
| `tx-nodat` | New-onset diabetes after transplant | 3 | diabetes-management / dm-new-dx | New Diabetes Diagnosis — review key clinical information before proceeding | vomiting-polyuria, confusion-neuro | ALLOWED (transplant-owned) |
| `tx-hypertension` | Hypertension | 3 | transplant-patient-ed / tpe-cni-hypertension | Prograf label: blood pressure can be controlled with any of the common antihypertensive agents, with careful consideration before agents associated with hyperkalemia. Tacrolimus labels: calcium-channel blockers can raise levels. | headache-vision, chest-pain, confusion-neuro | ALLOWED (transplant-owned) |

## Borrowed oncology categories (ids from src/data/onc-drugs/toxicities.ts; do not edit oncology data)

| id | title | tier (oncology lethality) | page target | target node summary | complaints | status |
|---|---|---|---|---|---|---|
| `drug-qt-prolongation` | QT prolongation | 2 | torsades-de-pointes / tdp-risk-factors | Risk is multiplicative — drug + electrolyte + structural heart is classic scenario | fatigue-hypotension, chest-pain, fainting-palpitations | ALLOWED: general consult, no oncology framing. Use `tx-qt-prolongation` (tier 1). |
| `drug-adrenal-insufficiency` | Drug-induced adrenal insufficiency | 2 | adrenal-insufficiency / ai-start | Adrenal crisis = hemodynamic deterioration resolving with IV hydrocortisone; 50% present as first diagnosis | fatigue-hypotension, vomiting-polyuria, diarrhea-abdominal-pain | ALLOWED: general consult, no oncology framing. Use `tx-adrenal-insufficiency` (tier 1). |
| `drug-gi-perforation` | Gastrointestinal perforation | 1 | abdominal-pain-hub / ap-perf-entry | Peritonitis + sepsis or free air = perforation pathway; soft abdomen = unlikely. | diarrhea-abdominal-pain, fever, fatigue-hypotension | ALLOWED: general consult, no oncology framing. |
| `drug-hepatotoxicity` | Liver toxicity | 2 | hepatitis / hepatitis-start | R-factor classifies pattern: >5 hepatocellular, 2–5 mixed, <2 cholestatic. Screen ALF up front. | jaundice-lfts, diarrhea-abdominal-pain, bleeding-bruising | ALLOWED: general consult, no oncology framing. |
| `drug-pancreatitis` | Drug-induced pancreatitis | 2 | acute-pancreatitis / ap-start | Diagnose with 2 of 3: epigastric pain, lipase >3x ULN, imaging — most cases mild and self-limiting | diarrhea-abdominal-pain, vomiting-polyuria | ALLOWED: general consult, no oncology framing. |
| `drug-severe-skin` | Drug-induced severe skin reactions | 2 | sjs-ten / sjs-ten-start | Drug-induced emergency — the rash that hurts; stop the culprit drug now | rash-skin, fever | ALLOWED: general consult, no oncology framing. |
| `rhabdomyolysis` | Rhabdomyolysis | 2 | rhabdomyolysis / rhabdo-start | Skeletal muscle breakdown releasing myoglobin, CK, K, phosphate — CK >1000 diagnostic, AKI in 15-55%, classic triad present in <10% | weakness | ALLOWED: general consult, no oncology framing. |
| `drug-lung-toxicity` | Lung toxicity or pneumonitis | 1 | onc-drug-side-effects / odse-tox-route-lung-toxicity | Label instruction on the drug card where given; related consults (differential, overlap, supportive care): Shortness of Breath Hub, Cyanosis / Hypoxaemia Hub, Oxygen Delivery Systems, ARDS, Pneumonia and others | dyspnea-cough, fever, chest-pain | **NOT ALLOWED**: oncology routing page inside onc-drug-side-effects; text says "oncologist" and lists oncology drug classes. |
| `drug-fluid-retention` | Fluid retention and effusions | 2 | onc-drug-side-effects / odse-tox-route-fluid-retention | Label instruction on the drug card where given; related consults (differential, overlap, supportive care): Malignant pericardial effusion and tamponade, CHF Exacerbation | dyspnea-cough, chest-pain, fatigue-hypotension, limb-swelling | **NOT ALLOWED**: oncology routing page inside onc-drug-side-effects; text says "oncologist" and lists oncology drug classes. |
| `drug-thromboembolism` | Thromboembolism and ischemic events | 1 | onc-drug-side-effects / odse-tox-route-thromboembolism | Label instruction on the drug card where given; related consults (differential, overlap, supportive care): PE Treatment, Deep Vein Thrombosis, Chest Pain Hub, Acute Ischemic Stroke, Acute Limb Ischemia & PAD and others | chest-pain, dyspnea-cough, confusion-neuro, weakness, limb-swelling | **NOT ALLOWED**: oncology routing page inside onc-drug-side-effects; text says "oncologist" and lists oncology drug classes. |
| `drug-nephrotoxicity` | Kidney toxicity | 2 | onc-drug-side-effects / odse-tox-route-nephrotoxicity | Label instruction on the drug card where given; related consults (differential, overlap, supportive care): Potassium Disorders, Magnesium Disorders, Tumor lysis syndrome, Rhabdomyolysis, Thrombotic Thrombocytopenic Purpura (TTP) | vomiting-polyuria | **NOT ALLOWED**: oncology routing page inside onc-drug-side-effects; text says "oncologist" and lists oncology drug classes. |
| `drug-hypertension` | Hypertension | 2 | hypertensive-emergency-adult / hypertensive-emergency-adult-start | Emergency means severe BP plus acute organ injury. Severe BP alone is urgency. Exceptions change the agent. | headache-vision, chest-pain, confusion-neuro | ALLOWED: general consult, no oncology framing. |
| `chemo-hypersensitivity` | Hypersensitivity and infusion reactions | 1 | onc-drug-side-effects / odse-tox-chemo-hypersensitivity | Stop the infusion; anaphylaxis: epinephrine per the Anaphylaxis consult (no dose in these sources); oxaliplatin label: permanently discontinue; oxaliplatin throat dysesthesia has no stridor or wheeze | dyspnea-cough, rash-skin, fatigue-hypotension, chest-pain, infusion-reaction-during | **NOT ALLOWED**: oncology routing page inside onc-drug-side-effects; text says "oncologist" and lists oncology drug classes. |
| `chemo-myelosuppression` | Myelosuppression and neutropenic fever | 1 | oncological-emergencies / onc-fn-recognize | FN = ANC <500 + Temp ≥38.3°C single OR ≥38.0°C × 1hr; antibiotics within 60 min, mortality drops 70% → <10% | fever, bleeding-bruising | **NOT ALLOWED**: oncology routing page (oncological-emergencies; febrile neutropenia in a chemotherapy patient). |

Other oncology category ids are not reviewed for transplant use: treat them as NOT ALLOWED until listed above.

## Categories that do NOT exist ("no usable page"): the hazard is a plain line

- (`tx-hepatic-artery-thrombosis` now exists, see the table: its page tpe-liver-vascular has a summary and a citation. It becomes a row on the sirolimus and Zortress cards by owner decision 2026-11-21; those plain lines move to rows when the mTOR author's edit is integrated.)
- `tx-steroid-hyperglycemia` (tier 3, approved): `hyperglycemia-ed` has 38 nodes and none has a `summary` (all have citations). Plain line.
- Plain lines by owner decision (never categories): pure red cell aplasia; acute inflammatory syndrome; DRESS; wound healing; proteinuria; hyperlipidemia; steroid psychiatric effects; aseptic meningitis; TRALI; bronchial dehiscence (box only).
- Not yet approved as categories (do not use): embryofetal toxicity, serum sickness, visual disturbance, liver injury, pancreatitis, pneumonitis, severe skin reactions, thromboembolism for transplant rows until a transplant-side page or an ALLOWED general consult is chosen. (Borrowed `drug-hepatotoxicity`, `drug-pancreatitis`, `drug-severe-skin` are ALLOWED as written above; pneumonitis and thromboembolism have only NOT ALLOWED oncology routing pages, so they are plain lines.)

## Interaction heads now in force (every `interactions` line starts with exactly one of these)

- `Raises level:`
- `Lowers level:`
- `Adds kidney risk:`
- `Adds marrow risk:`
- `Adds marrow and kidney risk:`
- `Adds marrow or kidney risk:`
- `Adds potassium risk:`
- `Raises the other drug:`
- `Lowers the other drug:`
- `Falls when it stops:`
- `Avoid together:`

Lines no head fits stay plain "Drug: text" lines inside the `interactions` array (a line whose first word is Raises, Lowers, Adds, Falls or Avoid must use an exact head from this list). Non-interaction `alsoOnLabel` has 12 lines or fewer per card (methylprednisolone excepted by owner decision).
Cross-reference lines between sibling labels are quotations attributed to the other FDA label. Timing badges may use a stated time unit (minutes, hours, days, weeks, months, years) without a digit.
