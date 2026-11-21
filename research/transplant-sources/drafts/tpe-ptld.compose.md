# tpe-ptld compose map

Every sentence on the page, with the ledger row id(s) in `evidence/ptld.ledger.md` it restates. `FIXED editor note` = an approved text from scripts/fixtures/transplant-approved-editor-notes.json. `navigation only` = a link or consult list with no clinical statement. `NOT IN n` = item n of the ledger's NOT IN THE SOURCES READ list. Sources differ lines map to the rows on both sides.

## Summaries

- **tpe-ptld**: In a patient on belatacept, the label says consider PTLD with new or worsening neurological, cognitive or behavioral signs. AASLD/AST 2025, liver: presentation is often nonspecific.  → P40, P30
- **tpe-ptld-signs**: On belatacept, label says consider PTLD with new or worsening neurological, cognitive or behavioral signs. ISHLT 2023, heart: CNS PTLD is listed among causes of seizure or mental status change.  → P40, P61
- **tpe-ptld-diagnosis**: KDIGO 2009, kidney (rationale): it is imperative that suspected PTLD lesions be biopsied; EBV load alone is sensitive but not specific; with a compatible illness a high load is both.  → P9, P5, P59
- **tpe-ptld-team**: KDIGO 2009, kidney (1C): reduction or cessation of immunosuppression for EBV disease including PTLD (call the transplant team first). ISHLT 2023, heart: PTLD plan at the centre (Class I, C).  → P1, P21
- **tpe-ptld-dispo**: Not in the guidelines read: a PTLD admission rule or ED test list. ISHLT 2023, heart (Class I, C): initial PTLD evaluation and plan at the transplant centre.  → NOT IN 4, P21

## Critical actions

1. (tpe-ptld) Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.  → FIXED editor note
2. (tpe-ptld-signs) In a patient on belatacept, the label says consider PTLD with new or worsening neurological, cognitive or behavioral signs or symptoms.  → P40
3. (tpe-ptld-diagnosis) KDIGO 2009, kidney: it is imperative that suspected PTLD lesions be biopsied and read by an experienced pathologist (rationale, ungraded).  → P9
4. (tpe-ptld-team) ISHLT 2023, heart (Class I, C): initial PTLD evaluation and plan should be done at the transplant centre by physicians familiar with transplant malignancies.  → P21
5. (tpe-ptld-team) KDIGO 2009, kidney (1C): reduction or cessation of immunosuppression is recommended for EBV disease including PTLD (call the transplant team first).  → P1

## Node tpe-ptld (body)

- Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.  → FIXED editor note
- • Not in the guidelines read: an ED red-flag list for PTLD, when to image, or which tests to send. Nearest sourced fact: AASLD/AST 2025, liver: presentation is often nonspecific, with vague symptoms such as fevers, night sweats or weight loss; imaging may show bulky lymphadenopathy; diagnosis is by biopsy. [3]  → NOT IN 1, NOT IN 2, NOT IN 3, P30
- • KDIGO 2009, kidney: EBV disease can present as a nonspecific febrile illness, gastroenteritis or hepatitis, which may look like CMV or other infection (rationale, ungraded). [1]  → P8
- • Review (emergency medicine, 2018; narrative review, framing only): EBV may present initially with fever, malaise, fatigue, weight loss and lymphadenopathy. [6]  → P45
- • App content: the Lymphadenopathy consult is a general chief-complaint hub for swollen nodes.  → navigation only
- • Related consults: [Lymphadenopathy](#/tree/lymphadenopathy-hub/node/lad-start), swollen nodes; [Oncological Emergencies](#/tree/oncological-emergencies/node/onc-start), cancer emergencies; [Brain symptoms](#/tree/transplant-patient-ed/node/tpe-cni-brain), neurotoxicity; [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care; [CMV](#/tree/transplant-patient-ed/node/tpe-cmv), CMV page.  → navigation only
- • More: [PTLD statements and source differences](#/info/tpe-ptld-detail).  → navigation only
- (option) New neurological, cognitive or behavioral signs: Belatacept label; ISHLT heart  → navigation only
- (option) Fever, night sweats, weight loss, nodes or a mass: Tissue diagnosis and EBV load  → navigation only
- (option) PTLD or EBV disease already known: Immunosuppression and the transplant team  → navigation only
- (option) Not in the sources; disposition: Admission, tests, imaging  → navigation only

## Node tpe-ptld-signs (body)

- • Belatacept (Nulojix) label, in a patient on belatacept: consider PTLD in patients reporting new or worsening neurological, cognitive or behavioral signs or symptoms; the label says PTLD with belatacept predominantly involves the central nervous system. [4]  → P40
- • ISHLT 2023, heart: tumor including central nervous system PTLD is listed among causes of seizure or mental status change; no management is given (ungraded). [2]  → P61
- • AASLD/AST 2025, liver: PTLD occurs in about 2% of adult liver recipients, most often in the first 3 years but sometimes many years later; recipients who are EBV negative at transplant are at the highest risk. [3]  → P29, P31
- • AST IDCOP 2019, all organs: PTLD may present in the lung or chest with nodules or mediastinal adenopathy, especially in lung and heart-lung recipients, and can mimic pneumonia on imaging (ungraded). [10]  → P36, P37
- • Review (Semin Nephrol 2024; kidney-focused; framing only): PTLD within the intestine can cause diarrhea and vomiting. [7]  → P47
- • Not in the guidelines read: a central nervous system approach for the ED. Nearest sourced facts are the first two lines above.  → NOT IN 7
- • Related consults: [Brain symptoms](#/tree/transplant-patient-ed/node/tpe-cni-brain), neurotoxicity; [Diarrhea](#/tree/transplant-patient-ed/node/tpe-diarrhea), diarrhea page.  → navigation only

## Node tpe-ptld-diagnosis (body)

- • KDIGO 2009, kidney: it is imperative that suspected PTLD lesions be biopsied and read by a pathologist experienced with PTLD; EBV-negative lesions may behave differently, and nodules may be fungal (rationale, ungraded). [1]  → P9, P7
- • KDIGO 2009, kidney (rationale): EBV load alone is sensitive but not specific; a compatible illness with a high load is a sensitive and specific approach to diagnosis, yet many patients have asymptomatic elevations; in a patient with an asymptomatic elevation and another infection, tissue may be the only way to confirm or exclude EBV disease. [1]  → P5, P6, P59, P60
- • Review (Semin Nephrol 2024; framing only): the peripheral EBV load is not useful for EBV-negative PTLD. [7]  → P71
- • AASLD/AST 2025, liver (Weak, Level 3): screening for PTLD with serial EBV PCR is not supported. [3]  → P28
- • Not in the guidelines read: which tests to send from the ED, or when to image. Nearest sourced fact: AASLD/AST 2025, liver: imaging may show bulky lymphadenopathy, with confirmation by biopsy. Review (Semin Nephrol 2024): imaging can identify which lesions are amenable to biopsy. [3,7]  → NOT IN 2, NOT IN 3, P30, P67
- • Related consults: [Lymphadenopathy](#/tree/lymphadenopathy-hub/node/lad-start), swollen nodes.  → navigation only

## Node tpe-ptld-team (body)

- • KDIGO 2009, kidney (1C): reduction or cessation of immunosuppression is recommended for EBV disease including PTLD (call the transplant team first). [1]  → P1
- • KDIGO 2009, kidney (2D): reducing immunosuppression is suggested for EBV-seronegative patients with an increasing EBV load (call the transplant team first). [1]  → P2
- • ISHLT 2023, heart (Class I, C): initial PTLD evaluation and plan should be done at the transplant centre by physicians familiar with transplant-associated malignancies. [2]  → P21
- • Sources differ: response to reducing immunosuppression alone. KDIGO 2009, kidney: as many as two thirds respond, less likely after 1 year or with lymphoma, though it may still be considered then with reduced expectations (rationale). A 2021 review (framing only): the response rate from reduction alone is low. None is chosen (call the transplant team first). [1,8]  → P11, P12, P57, P52
- • Not in the guidelines read: how to adjust immunosuppression in the ED for suspected PTLD. Nearest sourced fact: KDIGO 2009 (chapter on post-transplant cancer) rationale: the decision to reduce or withdraw must balance quality of life with and without a functioning transplant if rejection follows (call the transplant team first). [1]  → NOT IN 5, P58
- • Related consults: [Oncological Emergencies](#/tree/oncological-emergencies/node/onc-start), cancer emergencies.  → navigation only

## Node tpe-ptld-dispo (body)

- • Not in the guidelines read: when to admit for suspected PTLD, an ED test list, or an imaging rule.  → NOT IN 2, NOT IN 3, NOT IN 4
- • Nearest sourced fact: ISHLT 2023, heart (Class I, C): initial PTLD evaluation and plan should be done at the transplant centre by physicians familiar with transplant-associated malignancies. [2]  → P21
- • Review (Semin Nephrol 2024; framing only): collaboration between specialists is essential when weighing PTLD timing, immunosuppression, graft function and histology. [7]  → P68
- • Review (emergency medicine, 2018; framing only): discusses admission of transplant patients with serious infection; it is not about PTLD and sets no rule here. [6]  → P64, NOT IN 4
- • Related consults: [Oncological Emergencies](#/tree/oncological-emergencies/node/onc-start), cancer emergencies; [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care.  → navigation only
- Editor note: disposition is decided with the treating transplant team.  → FIXED editor note
- (recommendation) **Possible PTLD: an admission rule, ED tests and imaging are not in the guidelines read.** ISHLT 2023, heart (Class I, C): initial PTLD evaluation and plan at the transplant centre. Editor note: disposition is decided with the treating transplant team.  → NOT IN 4, P21, FIXED editor note

## Overlay tpe-ptld-detail

### KDIGO 2009, kidney: EBV disease and PTLD

- • KDIGO 2009, kidney (1C): reduction or cessation of immunosuppression is recommended for EBV disease including PTLD (call the transplant team first). [1]  → P1
- • KDIGO 2009, kidney (2D): reducing immunosuppression is suggested for EBV-seronegative patients with an increasing EBV load (call the transplant team first). [1]  → P2
- • KDIGO 2009, kidney (2C): monitoring by EBV NAT is suggested for donor-positive, recipient-negative recipients; the box prints 2D for each timing item. [1]  → P3
- • KDIGO 2009, kidney (rationale): EBV disease and PTLD are 10 to 50 times more likely in EBV-seronegative than in seropositive recipients. [1]  → P4
- • KDIGO 2009, kidney (rationale): reducing immunosuppression is an effective treatment for many patients with EBV disease and PTLD (call the transplant team first); as many as two thirds of EBV-associated PTLD respond to reduction or withdrawal, less likely after 1 year or with EBV-associated lymphoma. [1]  → P14, P11, P12
- • KDIGO 2009, kidney (rationale): because some late-presenting lymphomas have responded, reduction may still be considered, though expectations of efficacy will be reduced (call the transplant team first). [1]  → P57
- • KDIGO 2009, kidney (rationale): evidence is lacking for preemptive acyclovir or ganciclovir for a rising EBV load without reduction of immunosuppression (call the transplant team first). [1]  → P15
- • KDIGO 2009, kidney (rationale): immunosuppression is a major risk factor for EBV disease including PTLD; observational studies show mortality from EBV-associated PTLD over 50% (2009 figure). [1]  → P20, P10
- • KDIGO 2009, kidney (2C): consideration should be given to reducing immunosuppression for recipients with cancer (call the transplant team first); the factors are stage, whether immunosuppression worsens the cancer, therapies available and interference with chemotherapy (Not Graded). [1]  → P16
- • KDIGO 2009, kidney (rationale): reducing immunosuppression is the standard established treatment for PTLD and has controlled or eliminated tumors in some recipients; the decision must balance quality of life with and without a functioning transplant (call the transplant team first). [1]  → P17, P58
- • KDIGO 2009, kidney (rationale): a graft biopsy is generally warranted for unexplained graft dysfunction, since PTLD infiltration is one treatable cause. [1]  → P19
- • KDIGO 2009, kidney: non-Hodgkin lymphoma sits in the highest incidence-ratio row (above 5) of Table 29; cancers associated with viral infections, such as EBV-associated lymphomas, are especially affected (table, ungraded). [1]  → P18

### ISHLT 2023, heart

- • ISHLT 2023, heart (Class I, C): initial PTLD evaluation and plan at the transplant centre by physicians familiar with transplant-associated malignancies. [2]  → P21
- • ISHLT 2023, heart (adults Class IIa, Level B): rituximab monotherapy is reasonable for CD20-positive PTLD that is not responsive to a reduction in immunosuppression (call the transplant team first). [2]  → P22
- • ISHLT 2023, heart (Class I, C): there is no evidence to support reducing immunosuppression for solid tumors unrelated to the lymphoid system; maintenance immunosuppression should be continued unless there are specific reasons to reduce certain drugs, such as bone-marrow suppressive agents for leucopenia (call the transplant team first). [2]  → P23
- • ISHLT 2023, heart (Class IIa, Level C): evidence is insufficient to support antiviral prophylaxis for PTLD prevention in EBV-mismatched (D+/R-) recipients; pre-emptive EBV viral load monitoring should be considered. [2]  → P24
- • ISHLT 2023, heart (Class IIb, Level C; population not stated, adult and paediatric items share the table): converting to an mTOR inhibitor with reduction or discontinuation of the calcineurin inhibitor should be considered for malignancy or PTLD, to decrease recurrences (call the transplant team first). [2]  → P27
- • ISHLT 2023, heart: in adults lymphoma is uncommon; skin cancer is the most common malignancy (ungraded). Malignancy prevention includes minimization of immunosuppression as clinically tolerated (ungraded) (call the transplant team first). The 2010 Class IIa, C minimization recommendation is marked removed in 2023 and referred to Topic 1. [2]  → P25, P26, P70

### AASLD/AST 2025, liver

- • AASLD/AST 2025, liver (Weak, Level 3): screening for PTLD with serial EBV PCR is not supported. [3]  → P28
- • AASLD/AST 2025, liver: PTLD in about 2% of adult liver recipients, mostly in the first 3 years; presentation nonspecific; imaging may show bulky lymphadenopathy; diagnosis by biopsy; survival over 50% at 10 years; older age and monomorphic type are negative prognostic factors (ungraded). [3]  → P29, P30, P33
- • AASLD/AST 2025, liver: EBV-negative recipients at transplant are at the highest risk; a markedly elevated EBV load can identify those at increased risk, but the role of EBV screening is not well established (ungraded). [3]  → P31
- • AASLD/AST 2025, liver: once PTLD is diagnosed, management involves a reduction in immunosuppression (call the transplant team first); monomorphic PTLD is treated with chemotherapy like other lymphomas (ungraded). [3]  → P32, P34

### Lung, chest and pathology

- • AST IDCOP 2019 (all organs): PTLD may present with lung or chest involvement; pulmonary PTLD can mimic pneumonia on imaging; lung biopsy is recommended for a focal nodule not otherwise diagnosed, because of malignancy including PTLD or invasive fungal infection (weak, low). [10]  → P36, P37, P38
- • ISHLT 2007 lung pathology consensus: PTLD is in the differential of perivascular and interstitial infiltrates on lung biopsy and can range from pneumonitis to tumor nodules (ungraded). [11]  → P39

### Labels

- • Belatacept (Nulojix) label, in a patient on belatacept: consider PTLD with new or worsening neurological, cognitive or behavioral signs or symptoms; do not use in EBV-seronegative recipients or those with unknown EBV status; higher than recommended doses of belatacept or concomitant immunosuppressants are not recommended. [4]  → P40, P41, P69
- • Prograf label: PTLD has been reported, mostly EBV-related, greatest in EBV-seronegative people; monitor EBV serology during treatment. CellCept label: lymphoma risk appears related to the intensity and duration of immunosuppression rather than any specific agent. [5,9]  → P42, P43

### Reviews (framing only)

- • Review (emergency medicine, 2018): EBV may present initially with fever, malaise, fatigue, weight loss and lymphadenopathy. [6]  → P45
- • Review (Semin Nephrol 2024; kidney-focused; framing only): features can include fever, night chills, weight loss or unexplained anemia; intestinal PTLD causes diarrhea and vomiting; CNS masses may cause symptoms by location; a tissue diagnosis is still the gold standard, though in inaccessible sites such as the brain a presumptive diagnosis uses clinical, laboratory and imaging features. [7]  → P46, P47, P66, P67, P50
- • Review (Semin Nephrol 2024): EBV peak load and rate of rise have areas under the curve of 0.6 to 0.7, not diagnostic in an individual; response to reduction alone ranges 43 to 63% in retrospective studies. [7]  → P49
- • Review (Curr Opin Infect Dis 2021; framing only): the response rate from reduction of immunosuppression alone is low (call the transplant team first); biopsy of an involved site is the gold standard. [8]  → P52, P53

### Where the sources differ (none is chosen)

- • Response to reducing immunosuppression alone: KDIGO 2009 says as many as two thirds respond; the 2021 review says the response rate from reduction alone is low; the 2024 review gives 43 to 63% in retrospective studies (call the transplant team first). [1,7,8]  → P11, P52
- • EBV load and antivirals: KDIGO 2009 (2C) suggests monitoring in D+/R- kidney recipients; ISHLT 2023 heart says evidence is insufficient to support antiviral prophylaxis and pre-emptive monitoring should be considered (IIa, C); AASLD/AST 2025 liver says serial EBV PCR screening is not supported (Weak, Level 3). KDIGO also says the load is sensitive but not specific, and that a compatible syndrome with a high load is sensitive and specific. [1,2,3]  → P3, P24, P28, P5, P59
- • Mortality: KDIGO 2009 gives over 50% (observational); AASLD/AST 2025 gives survival over 50% at 10 years. Not reconciled. [1,3]  → P10, P33

### Not in the guidelines read, with the nearest sourced facts

- • An ED red-flag list, when to image, which ED tests to send: nearest are the recognition and tissue statements above (AASLD/AST 2025; KDIGO 2009).  → NOT IN 1, NOT IN 2, NOT IN 3
- • When to admit for PTLD: nearest is the transplant-centre statement (ISHLT 2023, heart); a review (emergency medicine, 2018) discusses admission for serious infection, not PTLD.  → NOT IN 4
- • How to adjust immunosuppression in the ED: nearest are the KDIGO and AASLD/AST statements that reduction is the established treatment once PTLD is diagnosed (call the transplant team first).  → NOT IN 5
- • PTLD in lung, pancreas and intestinal recipients: no guideline saved; lung pathology only. Central nervous system presentations: belatacept label and ISHLT heart list only. Regimens beyond reduction and rituximab and prognosis: not for the ED.  → NOT IN 6, NOT IN 7, NOT IN 8

