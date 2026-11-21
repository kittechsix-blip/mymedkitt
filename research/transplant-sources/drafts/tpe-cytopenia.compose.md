# tpe-cytopenia compose map

Every sentence on the page, with the ledger row id(s) in `evidence/cytopenia.ledger.md` it restates. Sentences that are overlay or node text built from a row's CLAIM carry that row's scope prefix. `FIXED editor note` = one of the two approved texts. `navigation only` = a link or consult list with no clinical statement. `NOT IN n` = item n of the ledger's "NOT IN THE LABELS OR GUIDELINES USED" list; `SOURCES DIFFER n` likewise.

## Summaries

- **tpe-cytopenia**: Fever with low neutrophils: first option; editor note points to the Sepsis consult. Review (emergency medicine, 2018): neutropenic fever in a transplant recipient is a time-sensitive emergency.  → C135, FIXED editor note (owner-approved)
- **tpe-cytopenia-fever**: Fever with low neutrophils: Sepsis consult's empiric antibiotics without delay (editor note). Review (emergency medicine, 2018): time-sensitive emergency. Not in the labels or guidelines used: a transplant-specific regimen.  → FIXED editor note (owner-approved), C135, NOT IN 1
- **tpe-cytopenia-drug**: CellCept label: interrupt or reduce at ANC below 1.3 x 10^3/µL (call the transplant team first). Valcyte label and the CMV consensus differ at low counts: see Sources differ.  → C1, C34, C118, C120
- **tpe-cytopenia-differ**: Valganciclovir or ganciclovir: labels say avoid or not recommended at ANC below 500/µL; CMV consensus 2025, treating CMV disease: attempt to continue (strong, moderate) (call the transplant team first).  → C34, C46, C118
- **tpe-cytopenia-dispo**: Not in the labels or guidelines used: an admission rule or transfusion thresholds. Atgam label: if thrombocytopenia occurs, consider platelet transfusions; no number is given.  → NOT IN 3, 6, C76

## Critical actions

1. (tpe-cytopenia) Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.  → FIXED editor note
2. (tpe-cytopenia-fever) Editor note: give the Sepsis consult's empiric antibiotics without delay; the febrile neutropenia pathway's risk score is written for cancer patients; call the transplant team.  → FIXED editor note (owner-approved)
3. (tpe-cytopenia-drug) CellCept label: if ANC is below 1.3 x 10^3/µL, interrupt or reduce the dose (call the transplant team first).  → C1
4. (tpe-cytopenia-drug) Myfortic label: if ANC is below 1.3 x 10^3/mcL or anemia occurs, interrupt or reduce the dose (call the transplant team first).  → C12
5. (tpe-cytopenia-differ) CMV consensus 2025, CMV-disease treatment (strong, moderate): attempt to continue valganciclovir or ganciclovir; dose reduction for leukopenia alone not recommended (call the transplant team first).  → C118, C120
6. (tpe-cytopenia-differ) Sources differ: Valcyte label: should be avoided if ANC is below 500/µL, platelets below 25,000/µL or hemoglobin below 8 g/dL (call the transplant team first).  → C34
7. (tpe-cytopenia-differ) Sources differ: ganciclovir label: not recommended if ANC is below 500/µL, hemoglobin below 8 g/dL or platelets below 25,000/µL (call the transplant team first).  → C46
8. (tpe-cytopenia-drug) Bactrim label (any use): discontinue if a significant electrolyte abnormality, renal insufficiency or reduction in the count of any formed blood element is noted.  → C55

## Node tpe-cytopenia (body)

- Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.  → FIXED editor note
- Review (emergency medicine, 2018; solid organ and stem cell transplant patients; a narrative review, not a guideline): sepsis and neutropenic fever are life-threatening emergencies; both are time-sensitive diagnoses. [1]  → C135
- Not in the labels or guidelines used: how the cancer febrile-neutropenia pathway, including its risk score, applies to a transplant recipient with drug-induced neutropenia.  → NOT IN 2 (no label or guideline); C140, C142
- App content: the febrile neutropenia pathway's risk score and references are written for cancer patients, and its low-risk branch requires an oncologist's agreement.  → C140, C142, C143
- Related consults: [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care; [Febrile neutropenia (Oncological Emergencies)](#/tree/oncological-emergencies/node/onc-fn-recognize), cancer pathway; [Thrombocytopenia](#/tree/thrombocytopenia/node/thrombocytopenia-start), low platelets; [Hemolytic anemia](#/tree/hemolytic-anemia/node/hemolytic-anemia-start), red-cell destruction; [Blood transfusions](#/tree/blood-transfusions/node/bt-start), blood products.  → navigation only (no clinical statement)
- Which drug is the likely cause: [Labels by drug](#/info/tpe-cytopenia-by-drug) gives the counts each label names, its threshold, action and timing.  → navigation only; content of the overlay is mapped below

## Node tpe-cytopenia-fever (body)

- Editor note: give the Sepsis consult's empiric antibiotics without delay; the febrile neutropenia pathway's risk score is written for cancer patients; call the transplant team.  → FIXED editor note (owner-approved)
- Review (emergency medicine, 2018; solid organ and stem cell transplant patients; a narrative review, not a guideline): sepsis and neutropenic fever are life-threatening emergencies; both are time-sensitive diagnoses. [1]  → C135
- Not in the labels or guidelines used: a transplant-specific regimen, or how the cancer febrile-neutropenia pathway, including its risk score, applies to a transplant recipient with drug-induced neutropenia.  → NOT IN 1, 2
- KDIGO 2009, non-transplant population: with drug-induced neutropenia (ANC below 500/µL), patients are at increased risk for serious infection (ungraded). [18]  → C102
- App content: the febrile neutropenia pathway's risk score and references are written for cancer patients, and its low-risk branch requires an oncologist's agreement.  → C140, C142, C143
- Related consults: [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care; [Febrile neutropenia (Oncological Emergencies)](#/tree/oncological-emergencies/node/onc-fn-recognize), cancer pathway.  → navigation only (no clinical statement)

## Node tpe-cytopenia-drug (body)

- CellCept label (ANC below 1.3 x 10^3/µL) and Myfortic label (ANC below 1.3 x 10^3/mcL or anemia): interrupt or reduce the dose (call the transplant team first). [2,3]  → C1, C12
- Valcyte label: should be avoided if ANC is below 500/µL, platelets below 25,000/µL or hemoglobin below 8 g/dL; ganciclovir label: not recommended at those counts (call the transplant team first). [5,6]  → C34, C46
- Imuran label, prompt dose reduction or temporary withdrawal may be necessary if leukocytes fall rapidly or stay low; Atgam label, consider discontinuing if thrombocytopenia or neutropenia is severe and unremitting (call the transplant team first). [4,10]  → C20, C75
- Bactrim label: discontinue if a significant electrolyte abnormality, renal insufficiency or reduction in the count of any formed blood element is noted; dapsone label: if leucocytes, platelets or hemopoiesis fall significantly, discontinue. [7,8]  → C55, C63
- Prograf label: if pure red cell aplasia is diagnosed, consider discontinuing (call the transplant team first). [14] Sirolimus and Zortress labels give no count threshold or count-based action; Zortress says monitor hematologic parameters. [12,13]  → C90, C84, C85, C175, C87 (no threshold or count-based action stated in the labels)
- Thymoglobulin, Actemra, timing, more: [Labels by drug](#/info/tpe-cytopenia-by-drug).  → navigation only (Thymoglobulin: C70-C72, C170; Actemra: C78-C81 are in the overlay)

## Node tpe-cytopenia-differ (body)

- Valcyte label: should be avoided at ANC below 500/µL; ganciclovir label: not recommended at that count (call the transplant team first). [5,6]  → C34, C46
- CMV consensus 2025, treatment of CMV disease (statement graded strong, moderate): with leukopenia, attempts should be made to continue valganciclovir or ganciclovir; reducing the dose for leukopenia alone is not recommended (call the transplant team first). [19]  → C118, C120
- Valganciclovir prophylaxis, AASLD/AST 2025, liver (Strong, Level 2): without HSV and VZV seropositivity, letermovir can replace valganciclovir if neutropenia is persistent (call the transplant team first). [20]  → C127
- G-CSF: CMV consensus 2025, CMV-disease treatment (ungraded): CSFs could be considered. [19] KDIGO 2009, kidney (ungraded): one case report suggested CSFs may have been associated with worsening graft function. [18] KDIGO, citing an oncology review (ungraded): febrile neutropenia benefits from CSFs plus antibiotics with pneumonia, fungal infection, hypotension, sepsis or organ failure. [18]  → C121, C113, C114
- Imuran label: with allopurinol the Imuran dose should be reduced; KDIGO 2009, kidney (1B): avoiding allopurinol in patients receiving azathioprine is recommended (call the transplant team first). [4,18]  → C28, C180
- More: [Guideline statements and source differences](#/info/tpe-cytopenia-detail).  → navigation only

## Node tpe-cytopenia-dispo (body)

- Not in the labels or guidelines used: an admission rule for neutropenia, red cell or platelet transfusion thresholds for a transplant recipient, or an ED rule for G-CSF.  → NOT IN 3, 4, 6
- Atgam label: if thrombocytopenia occurs, consider platelet transfusions to keep platelets at clinically acceptable levels; no number is given. [10]  → C76
- KDIGO 2009, kidney (Not Graded): do a blood count after any change in medication that may cause neutropenia, anemia or thrombocytopenia; for neutropenia and thrombocytopenia, include treatment of underlying causes whenever possible. [18]  → C98, C100
- App content: the Thrombocytopenia consult's drug node says to stop a suspected nonessential culprit.  → C169
- Related consults: [Blood transfusions](#/tree/blood-transfusions/node/bt-start), blood products; [Thrombocytopenia](#/tree/thrombocytopenia/node/thrombocytopenia-start), low platelets.  → navigation only
- Editor note: disposition is decided with the treating transplant team.  → FIXED editor note
- recommendation: **Low blood counts on a transplant drug: an admission rule and transfusion thresholds are not in the labels or guidelines used.** Editor note: disposition is decided with the treating transplant team.  → C135/C138 framing; NOT IN 3, 6; FIXED editor note

## Overlay tpe-cytopenia-by-drug

### Mycophenolate mofetil (CellCept)
- CellCept label: if neutropenia develops (ANC below 1.3 x 10^3/µL), interrupt or reduce the dose, run diagnostic tests and manage appropriately (call the transplant team first). [2]  → C1
- CellCept label: neutropenia has been seen most often 31 to 180 days after transplant (kidney, heart, liver rejection prevention). [2]  → C4
- CellCept label: consider blood counts weekly for month 1, twice monthly for months 2 and 3, then monthly through the first year. [2]  → C8
- CellCept label: neutropenia may be related to CellCept itself, other medicines, viral infections, or a combination. [2]  → C5
- CellCept label: immunosuppressants raise the risk of bacterial, fungal, protozoal and new or reactivated viral infections; these may lead to hospitalizations and death. [2]  → C164
- CellCept label: cytopenias (leukopenia, anemia, thrombocytopenia, pancytopenia) are a known risk and may lead or contribute to infections and hemorrhages. [2]  → C6
- CellCept label: pure red cell aplasia was reported with CellCept plus other immunosuppressants; in some cases it reversed with dose reduction or stopping (call the transplant team first). [2]  → C9
- CellCept label: in transplant patients, reduced immunosuppression may place the graft at risk (said about pure red cell aplasia) (call the transplant team first). [2]  → C10
- CellCept label: MPAG may compete with drugs cleared by renal tubular secretion (acyclovir, ganciclovir), possibly raising their concentrations or adverse reactions. [2]  → C158
- CellCept label: patients should report infection, unexpected bruising, bleeding or any other sign of bone marrow depression immediately. [2]  → C7
- CellCept label: bone marrow failure has been reported after approval, in combination with other immunosuppressants. [2]  → C11
### Mycophenolic acid (Myfortic)
- Myfortic label: if neutropenia (ANC below 1.3 x 10^3/mcL) or anemia occurs, interrupt or reduce the dose, run tests and manage accordingly (call the transplant team first). [3]  → C12
- Myfortic label: blood count should be performed weekly in month 1, twice monthly in months 2 and 3, then monthly through the first year. [3]  → C166
- Myfortic label (overdosage section): for neutropenia with ANC below 1.5 x 10^3/mcL, or anemia, it may be appropriate to interrupt or discontinue Myfortic (call the transplant team first). [3]  → C16
- Myfortic label: neutropenia may be related to Myfortic itself, other medicines, viral infections, or some combination. [3]  → C14
- Myfortic label: in transplant recipients, changes to Myfortic should only be made under appropriate supervision, to minimize rejection risk (call the transplant team first). [3]  → C13
- Myfortic label: pure red cell aplasia was reported with mycophenolic acid plus other immunosuppressants; some cases reversed with dose reduction or stopping (call the transplant team first). [3]  → C15
- Myfortic label: agranulocytosis was reported after approval. [3]  → C17
- Myfortic label: acyclovir, valacyclovir, ganciclovir or valganciclovir may be taken with Myfortic; during treatment, physicians should monitor blood cell counts. [3]  → C154
- Myfortic label: mycophenolate with acyclovir or ganciclovir may increase plasma concentrations of MPAG and of the antiviral. [3]  → C155
- Myfortic label: it is recommended that Myfortic not be given together with azathioprine or MMF (call the transplant team first). [3]  → C156
### Azathioprine (Imuran)
- Imuran label: severe leukopenia, thrombocytopenia, anemia (including macrocytic) and pancytopenia may occur; severe bone marrow suppression may also occur. [4]  → C18
- Imuran label: hematologic toxicities are dose-related and may be more severe in renal transplant patients whose graft is undergoing rejection. [4]  → C19
- Imuran label (no number given): prompt dose reduction or temporary withdrawal may be necessary if leukocytes fall rapidly or stay low, or marrow depression shows (call the transplant team first). [4]  → C20
- Imuran label: delayed hematologic suppression may occur. [4]  → C21
- Imuran label: leukopenia and thrombocytopenia are dose-dependent and may occur late; dose reduction or temporary withdrawal may reverse them (call the transplant team first). [4]  → C22
- Imuran label: early discontinuation may be considered when abnormal blood counts do not respond to dose reduction (call the transplant team first). [4]  → C23
- Imuran label: patients with TPMT or NUDT15 deficiency may be at increased risk of severe, life-threatening myelotoxicity at conventional doses. [4]  → C24
- Imuran label: death associated with pancytopenia has been reported in patients with absent TPMT activity on azathioprine. [4]  → C25
- Imuran label: in severe myelosuppression, consider testing for TPMT and NUDT15 deficiency. [4]  → C26
- Imuran label: TPMT/NUDT15 testing cannot replace blood-count monitoring; red-cell TPMT activity results are not accurate after recent transfusion. [4]  → C27
- Imuran label: blood counts are suggested weekly in month 1, twice monthly in months 2 and 3, then monthly or more often if therapy changes. [4]  → C165
- Imuran label: with allopurinol, Imuran dose should be reduced; with febuxostat the combination is not recommended (call the transplant team first). [4]  → C28
- Imuran label: co-trimoxazole may lead to exaggerated leukopenia, especially in renal transplant recipients. [4]  → C29
- Imuran label: ACE inhibitors given with azathioprine have been reported to induce anemia and severe leukopenia. [4]  → C30
- Imuran label: ribavirin with azathioprine has been reported to induce severe pancytopenia and may raise the risk of azathioprine myelotoxicity. [4]  → C31
- Imuran label: aminosalicylates (sulphasalazine, mesalazine, olsalazine) inhibit TPMT in vitro; use with Imuran with caution. [4]  → C32
- Imuran label: patients on immunosuppressants, including Imuran, are at increased risk of bacterial, viral, fungal, protozoal and opportunistic infections, which may be fatal. [4]  → C162
- Imuran label: infection may occur as a secondary manifestation of bone marrow suppression or leukopenia. [4]  → C163
### Valganciclovir (Valcyte)
- Valcyte label (boxed warning): severe leukopenia, neutropenia, anemia, thrombocytopenia, pancytopenia and bone marrow failure including aplastic anemia have been reported. [5]  → C33
- Valcyte label: Valcyte should be avoided if ANC is below 500/µL, platelets below 25,000/µL, or hemoglobin below 8 g/dL (call the transplant team first). [5]  → C34
- Sources differ: CMV consensus 2025, treating CMV disease; see [Where the sources differ](#/info/tpe-cytopenia-detail).  → SOURCES DIFFER 1, C118, C120
- Valcyte label: use with caution in patients with pre-existing cytopenias and in those receiving myelosuppressive drugs or irradiation. [5]  → C35
- Valcyte label: cytopenia may occur at any time during treatment and may worsen with continued dosing. [5]  → C36
- Valcyte label: cell counts usually begin to recover within 3 to 7 days after the drug is stopped. [5]  → C37
- Valcyte label: in severe leukopenia, neutropenia, anemia or thrombocytopenia, hematopoietic growth factors may be considered. [5]  → C38
- Valcyte label: check counts with differential and platelets frequently, especially with renal impairment or neutrophils below 1000/µL at the start. [5]  → C39
- Valcyte label: with mycophenolate mofetil, the risk of hematological and renal toxicity may be increased; monitor for ganciclovir and MMF toxicity. [5]  → C40
- Valcyte label: lists dapsone, pentamidine, tacrolimus and trimethoprim/sulfamethoxazole among drugs associated with myelosuppression or nephrotoxicity. [5]  → C41
- Valcyte label: such drugs should be used with valganciclovir only if the potential benefits are judged to outweigh the risks (call the transplant team first). [5]  → C42
- Valcyte label: febrile neutropenia, pancytopenia and bone marrow failure (including aplastic anemia) were reported in trials in under 5% of patients. [5]  → C43
- Valcyte label: patients should be told dose modification or discontinuation of dosing may be required; counts and platelets monitored frequently (call the transplant team first). [5]  → C44
### Ganciclovir injection
- Ganciclovir label (boxed warning): granulocytopenia, anemia, thrombocytopenia and pancytopenia have been reported. [6]  → C45
- Ganciclovir label: not recommended if ANC is below 500/µL, hemoglobin below 8 g/dL, or platelets below 25,000/µL (call the transplant team first). [6]  → C46
- Sources differ: CMV consensus 2025, treating CMV disease; see [Where the sources differ](#/info/tpe-cytopenia-detail).  → SOURCES DIFFER 1, C118, C120
- Ganciclovir label: neutropenia usually occurs in the first or second week of treatment but may occur at any time. [6]  → C47
- Ganciclovir label: cell counts usually begin to recover within 3 to 7 days of stopping the drug. [6]  → C48
- Ganciclovir label: colony-stimulating factors increased neutrophil and white cell counts in patients treated for CMV retinitis. [6]  → C49
- Ganciclovir label (overdosage section): use of hematopoietic growth factors should be considered in patients with cytopenias. [6]  → C50
- Ganciclovir label: ganciclovir should also be used with caution in pre-existing cytopenias and with myelosuppressive drugs or irradiation. [6]  → C51
- Ganciclovir label: other drugs associated with myelosuppression or nephrotoxicity should be used with ganciclovir only if benefits are judged to outweigh risks. [6]  → C52
- Ganciclovir label: blood counts with differential and platelets should be done frequently, especially if ANC was below 1000/µL at the start of treatment. [6]  → C53
- Ganciclovir label: with mycophenolate mofetil, the risk of hematological and renal toxicity may be increased; monitor for ganciclovir and MMF toxicity. [6]  → C157
### Trimethoprim-sulfamethoxazole (Bactrim)
- Bactrim label: fatalities and serious reactions including agranulocytosis, aplastic anemia and other blood dyscrasias have occurred with sulfamethoxazole-trimethoprim products. [7]  → C54
- Bactrim label: discontinue if a significant electrolyte abnormality, renal insufficiency or reduction in the count of any formed blood element is noted. [7]  → C55
- Bactrim label: thrombocytopenia may be immune-mediated; fatal or life-threatening cases reported; it usually resolves within a week of stopping. [7]  → C56
- Bactrim label: if hemophagocytic lymphohistiocytosis is suspected, discontinue Bactrim immediately; cytopenias are among its signs. [7]  → C57
- Bactrim label contraindications include a history of drug-induced immune thrombocytopenia with trimethoprim or sulfonamides, and documented megaloblastic anemia due to folate deficiency. [7]  → C58
- Bactrim label (overdosage section): high-dose or prolonged use may cause bone marrow depression (thrombocytopenia, leukopenia, megaloblastic anemia); leucovorin is given until hematopoiesis is normal. [7]  → C59
- Bactrim label: hematological changes of folic acid deficiency may occur in elderly patients or with pre-existing folate deficiency or kidney failure; folinic acid reverses them. [7]  → C60
- Bactrim label: elderly patients on certain diuretics, mainly thiazides, have had more thrombocytopenia with purpura. [7]  → C61
### Dapsone
- Dapsone label: deaths have been reported from agranulocytosis, aplastic anemia and other blood dyscrasias; counts should be done frequently. [8]  → C62
- Dapsone label: if leucocytes, platelets or hemopoiesis fall significantly, dapsone should be discontinued and the patient followed intensively. [8]  → C63
- Dapsone label: counts should be done weekly for the first month, monthly for six months, then twice a year, when feasible. [8]  → C64
- Dapsone label: folic acid antagonists may increase hematologic reactions; if co-administered with dapsone, monitor the patient more frequently. [8]  → C65
- Dapsone label: patients on weekly pyrimethamine and dapsone developed agranulocytosis during the second and third month of therapy. [8]  → C66
- Dapsone label: dose-related hemolysis is the most common adverse effect, seen with or without G6PD deficiency; G6PD-deficient patients respond more. [8]  → C67
- Dapsone label: hemolysis may be exaggerated in G6PD or methemoglobin reductase deficiency, or hemoglobin M; give with caution to these patients. [8]  → C68
- Dapsone label: almost all patients lose 1 to 2 g of hemoglobin, with a shortened red cell life span and a rise in methemoglobin. [8]  → C178
- Dapsone label: severe anemia should be treated before starting; hemolysis and methemoglobin may be poorly tolerated in severe cardiopulmonary disease. [8]  → C69
### Pentamidine (Pentam)
- Pentam label: use pentamidine with caution in patients with leukopenia, thrombocytopenia or anemia. [22]  → C160
- Pentam label: complete blood count and platelet count should be done before, during and after therapy. [22]  → C161
### Anti-thymocyte globulin, rabbit (Thymoglobulin)
- Thymoglobulin label: anemia, neutropenia and thrombocytopenia have occurred; monitor blood counts and adjust the dose to reverse cytopenias (call the transplant team first). [9]  → C70
- Thymoglobulin label: halve the dose if WBC is 2,000 to 3,000/mm3 or platelets 50,000 to 75,000/mm3 (call the transplant team first). [9]  → C71
- Thymoglobulin label: consider stopping if WBC falls below 2,000/mm3 or platelets below 50,000/mm3 (call the transplant team first). [9]  → C72
- Thymoglobulin label, kidney transplant prophylaxis trial versus basiliximab: leukopenia (WBC <3000/mm3) 63% versus 15%; thrombocytopenia (platelets <75,000/mm3) 16% versus 5%. [9]  → C170
- Thymoglobulin label: thrombotic microangiopathy has occurred in kidney transplant patients, particularly when given with calcineurin inhibitors. [9]  → C73
- Thymoglobulin label: febrile neutropenia and hemolytic anemia were reported after approval. [9]  → C74
### Anti-thymocyte globulin, equine (Atgam)
- Atgam label: thrombocytopenia and neutropenia have been reported; consider discontinuing Atgam if severe and unremitting (call the transplant team first). [10]  → C75
- Atgam label: if thrombocytopenia occurs, consider platelet transfusions to keep platelets at clinically acceptable levels (no number given). [10]  → C76
- Atgam label, 476 patients (renal allograft rejection and aplastic anemia pooled): thrombocytopenia 21.6%, leukopenia 17.9%; both among reactions in over 10%. [10]  → C171
- Atgam label: neutropenia, granulocytopenia, pancytopenia, anemia and hemolytic anemia were reported after approval. [10]  → C77
### Tocilizumab (Actemra; label scope RA, GCA, SSc-ILD, no transplant indication)
- Actemra label (RA, GCA, SSc-ILD): not recommended to start when ANC is below 2000/mm3; no transplant indication (call the transplant team first). [11]  → C78
- Actemra label (RA, GCA, SSc-ILD): in patients who develop ANC below 500/mm3, treatment is not recommended (call the transplant team first). [11]  → C79
- Actemra 2.11 (RA, SSc-ILD, GCA): hold at ANC 500 to 1000/mm3; restart at the label's stated dose once above 1000; discontinue below 500 (call the transplant team first). [11]  → C80
- Actemra 2.11 (RA, SSc-ILD, GCA): hold at platelets 50,000 to 100,000/mm3; restart at the label's stated dose once above 100,000; discontinue below 50,000 (call the transplant team first). [11]  → C81
- Actemra label (RA, GCA, SSc-ILD): not recommended to start with platelets below 100,000/mm3; if platelets fall below 50,000/mm3, treatment is not recommended (call the transplant team first). [11]  → C172
- Actemra label: neutrophils should be monitored 4 to 8 weeks after starting and every 3 months after that. [11]  → C82
- Actemra label: platelets should be monitored 4 to 8 weeks after start of therapy and every 3 months thereafter. [11]  → C173
- Actemra label, COVID-19 patients (different population): recommended that Actemra not be initiated with ANC below 1000/mm3 or platelets below 50,000/mm3 (call the transplant team first). [11]  → C174
- Actemra label: infections have been uncommonly reported with treatment-related neutropenia in long-term extension studies and postmarketing experience. [11]  → C83
### Sirolimus and everolimus (Zortress)
- Sirolimus label: anemia and thrombocytopenia were among the most common (30% or more) adverse reactions in kidney transplant rejection prophylaxis. [12]  → C84
- Sirolimus label: pancytopenia and neutropenia were reported after approval. [12]  → C85
- Sirolimus label: leukopenia and TTP/HUS are listed among adverse reactions reported less frequently (3% to under 20%) in renal transplant trials. [12]  → C176
- Sirolimus label: with a calcineurin inhibitor, risk of calcineurin inhibitor-induced HUS/TTP/thrombotic microangiopathy may increase. [12]  → C86
- Zortress label: with cyclosporine, risk of TMA/TTP/HUS may increase; monitor hematologic parameters. [13]  → C87
- Zortress label: anemia was a common reaction in kidney transplant (20% or more); leukopenia in liver transplant (over 10%). [13]  → C88
- Zortress label: in the liver trial, pancytopenia was among the reasons for stopping study drug in the Zortress group. [13]  → C89
- Zortress label, less common reactions (1% to under 10%): blood and lymphatic reactions include anemia, neutropenia, pancytopenia and thrombocytopenia. [13]  → C175
### Tacrolimus (Prograf, Astagraf XL, Envarsus XR)
- Prograf label: pure red cell aplasia was reported, always with risk factors (parvovirus B19, underlying disease, certain other drugs); if diagnosed, consider discontinuing Prograf (call the transplant team first). [14,15,16]  → C90
- Prograf label: TMA (HUS/TTP) has been reported; in patients with signs of TMA, consider tacrolimus as a risk factor. [14]  → C93
- Prograf label: agranulocytosis, neutropenia, febrile neutropenia, pancytopenia, hemolytic anemia and pure red cell aplasia were reported after approval. [14]  → C94
### Cyclosporine (Neoral, Gengraf, Sandimmune)
- Cyclosporine labels (Neoral; same wording in Gengraf and Sandimmune): cyclosporine does not cause bone marrow suppression in animals or man. [17]  → C95
- Neoral label: its transplant adverse-reaction table lists leukopenia under Hematopoietic. [17]  → C177
- Neoral label: some patients develop thrombocytopenia with microangiopathic hemolytic anemia, which may result in graft failure. [17]  → C96
- Neoral label: neither the cause nor the management of that syndrome is clear; resolution has followed reducing or stopping cyclosporine plus other treatment (call the transplant team first). [17]  → C97
### Letermovir (Prevymis), comparator valganciclovir
- Prevymis label, kidney transplant trial P002 to week 28: stopped for neutropenia in 1% on Prevymis versus 2% on valganciclovir; leukopenia 1% versus 5%. [21]  → C159

## Overlay tpe-cytopenia-detail

### CMV consensus 2025 (Transplantation Society), treatment of CMV disease
- CMV consensus 2025, treatment of CMV disease: with leukopenia, attempts should be made to continue valganciclovir or ganciclovir (statement graded strong, moderate). [19]  → C118
- CMV consensus 2025, treatment of CMV disease: options in leukopenia include G-CSF and/or adjusting other myelosuppressive drugs (part of a statement graded strong, moderate) (call the transplant team first). [19]  → C119
- CMV consensus 2025, treating CMV disease: reducing the valganciclovir or ganciclovir dose for leukopenia alone is not recommended (statement graded strong, moderate) (call the transplant team first). [19]  → C120
- CMV consensus 2025, CMV-disease treatment: instead of reducing antiviral doses, try stopping other myelosuppressive drugs; CSFs could be considered (ungraded narrative) (call the transplant team first). [19]  → C121
- CMV consensus 2025, CMV-disease treatment: monitor blood counts at regular intervals for hematologic toxicity such as leukopenia (ungraded narrative). [19]  → C122
- CMV consensus 2025, CMV-disease treatment, without concomitant rejection: reducing immunosuppression is suggested in severe disease, poor response, high viral load, cytopenia (weak, very low) (call the transplant team first). [19]  → C123
### CMV consensus 2025, other statements
- CMV consensus 2025: high ganciclovir concentrations are associated with higher grades of leukopenia (ungraded). [19]  → C124
- CMV consensus 2025: long courses of valganciclovir prophylaxis are associated with higher rates of leukopenia and greater cost (ungraded). [19]  → C125
- CMV consensus 2025: in kidney, liver, pancreas recipients with valganciclovir cytopenias during primary prophylaxis, G-CSF use and mycophenolate modification fell after a switch to letermovir (ungraded). [19]  → C126
### AASLD/AST 2025, liver
- AASLD/AST 2025, liver: without HSV and VZV seropositivity, letermovir can replace valganciclovir if neutropenia from valganciclovir prophylaxis is persistent (Strong, Level 2) (call the transplant team first). [20]  → C127
- AASLD/AST 2025, liver: recipients on letermovir for persistent neutropenia should receive prophylaxis with acyclovir, valacyclovir or famciclovir if seropositive for HSV or VZV (Strong, Level 2). [20]  → C128
### KDIGO 2009, kidney: blood counts
- KDIGO 2009, kidney: do a blood count after any change in medication that may cause neutropenia, anemia or thrombocytopenia (Not Graded). [18]  → C98
- KDIGO 2009, kidney: blood count at least daily for 7 days or until discharge, then 2 to 3 times weekly, weeks 2 to 4 (Not Graded). [18]  → C167
- KDIGO 2009, kidney: blood count at least weekly in months 2 to 3, monthly in months 4 to 12, then at least annually (Not Graded). [18]  → C168
- KDIGO 2009, kidney: assess and treat anemia by removing underlying causes whenever possible and using standard CKD measures (Not Graded). [18]  → C99
- KDIGO 2009, kidney: for neutropenia and thrombocytopenia, include treatment of underlying causes whenever possible (Not Graded). [18]  → C100
- KDIGO 2009, kidney: neutropenia is defined as a neutrophil count below 1500/µL (1.5 x 10^9/L) (ungraded). [18]  → C101
- KDIGO 2009, non-transplant population: with drug-induced neutropenia (ANC below 500/µL), patients are at increased risk for serious infection (ungraded). [18]  → C102
### KDIGO 2009, kidney: causes and what to do (rationale, ungraded)
- KDIGO 2009, kidney: kidney dysfunction may delay clearance of medicines that suppress white cell production in the marrow (ungraded). [18]  → C103
- KDIGO 2009, kidney: calcineurin inhibitors are not generally associated with leukopenia; antiproliferative agents are an important cause (ungraded). [18]  → C104
- KDIGO 2009, kidney: lymphocyte-depleting antibodies were associated with more leukopenia than basiliximab (33% vs 14.6% in one trial) (ungraded). [18]  → C105
- KDIGO 2009, kidney: combined antiviral plus antiproliferative therapy may increase the incidence of leukopenia (ungraded). [18]  → C106
- KDIGO 2009, kidney: mTOR inhibitors are associated with much higher relative risk of thrombocytopenia than calcineurin inhibitors (RR 7.0) (ungraded). [18]  → C107
- KDIGO 2009, kidney: the risk of neutropenia from trimethoprim-sulfamethoxazole in kidney recipients is unclear; agranulocytosis case reports exist (ungraded). [18]  → C108
- KDIGO 2009, kidney: drug-induced neutropenia from TMP-SMX is an indication for alternative PJP prophylaxis; potential agents include dapsone, aerosolized pentamidine, atovaquone, clindamycin plus pyrimethamine (ungraded). [18]  → C109
- KDIGO 2009, kidney: with anemia or leukopenia, first suggested actions are monitoring the MPA AUC and probably reducing the MMF or azathioprine dose (ungraded) (call the transplant team first). [18]  → C110
- KDIGO 2009, kidney: treatment of thrombocytopenia includes removing the offending drugs or treating other underlying causes (ungraded). [18]  → C111
- KDIGO 2009, kidney: parvovirus B19 hematologic abnormalities have been treated with intravenous immunoglobulin in case series (ungraded). [18]  → C112
### KDIGO 2009, kidney: colony-stimulating factors (rationale, ungraded)
- KDIGO 2009, kidney: case reports describe CSFs for neutropenia; potential for harm; one case report suggested CSFs may have been associated with worsening graft function (ungraded). [18]  → C113
- KDIGO 2009, citing ASCO oncology review: febrile neutropenia (ANC below 500/µL) benefits from CSFs plus antibiotics with pneumonia, fungal infection, hypotension, sepsis or organ failure (ungraded). [18]  → C114
- KDIGO 2009, kidney: there are inadequate data on benefit of CSFs in afebrile neutropenic patients (ANC below 1000/µL) (ungraded). [18]  → C115
- KDIGO 2009, kidney: guidance on CSF use in kidney recipients will come mostly from local practice and oncology guidelines; trials are unlikely (ungraded). [18]  → C116
### ISHLT 2023 heart and AASLD/AST 2024 liver
- ISHLT heart (2010 recommendation, continued 2023): in non-lymphoid solid tumors, continue immunosuppression unless specific reasons, e.g., reduce marrow-suppressive agents for leucopenia (Class I, Level of Evidence C, printed in the 2010 column) (call the transplant team first). [23]  → C130
- ISHLT 2023, heart: alemtuzumab lists leukopenia and thrombocytopenia; bortezomib lists thrombocytopenia and neutropenia as major adverse effects (desensitization/AMR therapies) (ungraded). [23]  → C132
- AASLD/AST 2024, liver table: mycophenolate and azathioprine list cytopenias as side effects; mTOR inhibitors list leukopenia (ungraded). [24]  → C129
### Where the sources differ (none is chosen)
- Valganciclovir or ganciclovir with low counts. Valcyte label: should be avoided if ANC is below 500/µL, platelets below 25,000/µL, or hemoglobin below 8 g/dL; ganciclovir label: not recommended at those counts (call the transplant team first). [5,6] CMV consensus 2025, treatment of CMV disease (statement graded strong, moderate): with leukopenia, attempts should be made to continue valganciclovir or ganciclovir; reducing the dose for leukopenia alone is not recommended (call the transplant team first). [19] The consensus statement is about treating CMV disease.  → C34, C46, C118, C120, SOURCES DIFFER 1
- Persistent neutropenia on valganciclovir prophylaxis. Valcyte label: should be avoided if ANC is below 500/µL (call the transplant team first). [5] AASLD/AST 2025, liver (Strong, Level 2): without HSV and VZV seropositivity, letermovir can replace valganciclovir if neutropenia from valganciclovir prophylaxis is persistent (call the transplant team first). [20] The 2025 CMV consensus leukopenia statement covers treatment of CMV disease only.  → C34, C127, SOURCES DIFFER 7
- Myfortic label: section 5.6 gives ANC below 1.3 x 10^3/mcL or anemia with the verb interrupt or reduce; its overdosage section gives ANC below 1.5 x 10^3/mcL or anemia with the words it may be appropriate to interrupt or discontinue (call the transplant team first). [3] CellCept label gives 1.3 x 10^3/µL. [2]  → C12, C16, C1, SOURCES DIFFER 2
- Allopurinol with azathioprine. Imuran label: with allopurinol the Imuran dose should be reduced; with febuxostat the combination is not recommended (call the transplant team first). [4] KDIGO 2009, kidney (graded 1B): avoiding allopurinol in patients receiving azathioprine is recommended (call the transplant team first). [18] KDIGO rationale (ungraded): allopurinol with azathioprine can cause profound, life-threatening pancytopenia; use together with extreme caution, or not at all (call the transplant team first). [18]  → C28, C180, C181, SOURCES DIFFER 3
- G-CSF. KDIGO 2009 (ungraded): case reports describe CSFs for neutropenia; potential for harm; one case report suggested CSFs may have been associated with worsening graft function; guidance on CSF use in kidney recipients will come mostly from local practice and oncology guidelines; trials are unlikely. [18] KDIGO, citing an oncology review (ungraded): febrile neutropenia (ANC below 500/µL) benefits from CSFs plus antibiotics with pneumonia, fungal infection, hypotension, sepsis or organ failure. [18] CMV consensus 2025, CMV-disease treatment (ungraded): CSFs could be considered. [19] Valcyte label: hematopoietic growth factors may be considered. [5]  → C113, C116, C114, C121, C38, SOURCES DIFFER 4
- Trimethoprim-sulfamethoxazole. Imuran label: co-trimoxazole may lead to exaggerated leukopenia, especially in renal transplant recipients. [4] KDIGO 2009, kidney (ungraded): the risk of neutropenia from TMP-SMX in kidney recipients is unclear; agranulocytosis case reports exist. [18]  → C29, C108, SOURCES DIFFER 5
- What to adjust first. KDIGO 2009, kidney (ungraded): with anemia or leukopenia, first suggested actions are monitoring the MPA AUC and probably reducing the MMF or azathioprine dose (call the transplant team first). [18] CMV consensus 2025, CMV-disease treatment: instead of reducing antiviral doses, try stopping other myelosuppressive drugs (call the transplant team first). [19] No source here ranks which drug to reduce first.  → C110, C121, SOURCES DIFFER 6
- Blood-count schedule. KDIGO 2009, kidney (Not Graded): blood count at least daily for 7 days or until hospital discharge, two to three times per week in weeks 2 to 4, weekly in months 2 to 3, monthly in months 4 to 12, then at least annually. [18] CellCept label: consider blood counts weekly in month 1, twice monthly in months 2 and 3, then monthly through the first year. [2] Myfortic label: blood count should be performed on the same schedule. [3] Imuran label: blood counts are suggested weekly in month 1, twice monthly in months 2 and 3, then monthly or more often if therapy changes. [4] Dapsone label: counts weekly for the first month, monthly for six months, then twice a year, when feasible. [8]  → C167, C168, C8, C166, C165, C64, SOURCES DIFFER 8
- Cyclosporine and low counts. Cyclosporine labels: it does not cause bone marrow suppression; the Neoral transplant adverse-reaction table nevertheless lists leukopenia. [17] KDIGO 2009, kidney (ungraded): calcineurin inhibitors are not generally associated with leukopenia. [18]  → C95, C177, C104, SOURCES DIFFER 9
### Not in the labels or guidelines used, with the nearest sourced facts
- Empiric antibiotics for a febrile neutropenic transplant recipient with drug-induced neutropenia; whether the cancer febrile-neutropenia pathway or its risk score applies.  → NOT IN 1, 2
- An admission rule for neutropenia; red cell or platelet transfusion thresholds for a transplant recipient; an ED rule for G-CSF (who, when, at what count).  → NOT IN 3, 4, 6
- A numeric count in the 2025 CMV consensus for acting on valganciclovir or ganciclovir toxicity.  → NOT IN 5
- How long to hold or when to restart mycophenolate or azathioprine after neutropenia, and which of several myelosuppressive drugs to stop first.  → NOT IN 7, 8
- A hemoglobin threshold, an anemia work-up or a pure-red-cell-aplasia work-up for an ED patient beyond the labels and guideline statements above.  → NOT IN 9
- Atgam label: if thrombocytopenia occurs, consider platelet transfusions to keep platelets at clinically acceptable levels (no number given). [10]  → C76
- KDIGO 2009, kidney: for neutropenia and thrombocytopenia, include treatment of underlying causes whenever possible (Not Graded). [18]  → C100
- KDIGO 2009, kidney: assess and treat anemia by removing underlying causes whenever possible and using standard CKD measures (Not Graded). [18]  → C99
- Related consults: [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care; [Febrile neutropenia (Oncological Emergencies)](#/tree/oncological-emergencies/node/onc-fn-recognize), cancer pathway; [Thrombocytopenia](#/tree/thrombocytopenia/node/thrombocytopenia-start), low platelets; [Hemolytic anemia](#/tree/hemolytic-anemia/node/hemolytic-anemia-start), red-cell destruction; [Blood transfusions](#/tree/blood-transfusions/node/bt-start), blood products.  → navigation only
