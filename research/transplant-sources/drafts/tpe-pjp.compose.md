# tpe-pjp compose map

Every sentence on the page, with the ledger row id(s) in `evidence/pjp.ledger.md` it restates. `FIXED editor note` = an approved text from scripts/fixtures/transplant-approved-editor-notes.json. `navigation only` = a link or consult list with no clinical statement. `NOT IN n` = item n of the ledger's NOT IN THE SOURCES READ list. Sources differ lines map to the rows on both sides.

## Summaries

- **tpe-pjp**: AST IDCOP 2019: most empiric pneumonia regimens will not optimally treat Pneumocystis. Not in the guidelines read: treatment before diagnosis. KDIGO 2009 (kidney, 1C): PCP diagnosed by lavage or biopsy.  → J32, NOT IN 1, J1
- **tpe-pjp-test**: AST IDCOP 2019, all organs: chest X-ray for all suspected pneumonia (strong, moderate); chest CT when acuity or immunosuppression is high (weak, low); lavage testing should include PJP (strong, high).  → J25, J26, J29
- **tpe-pjp-treat**: KDIGO 2009, kidney (1C), PCP diagnosed by lavage or biopsy: high-dose IV TMP-SMX with corticosteroids; also reduced immunosuppression (call the transplant team first). Steroid threshold is a separate 1C statement.  → J1, J2
- **tpe-pjp-prophylaxis**: Sources differ by organ on prophylaxis duration: see body. AST IDCOP 2019: lavage PJP testing (strong, high), in particular if off prophylaxis or on non-TMP-SMX prophylaxis.  → J9, J17, J29
- **tpe-pjp-dispo**: Not in the guidelines read: PJP-specific admission criteria or doses. AST IDCOP 2019, pneumonia: for outpatient care, inpatient management is favored if monitoring is not feasible or doubts prevail.  → NOT IN 4, NOT IN 5, J34

## Critical actions

1. (tpe-pjp) Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.  → FIXED editor note
2. (tpe-pjp-test) AST IDCOP 2019, all organs: chest X-ray for all with suspected pneumonia (strong, moderate); chest CT if acuity or immunosuppression is high (weak, low).  → J25, J26
3. (tpe-pjp-test) AST IDCOP 2019, all organs: include PJP stains or nucleic-acid testing in lavage fluid testing (strong, high), especially off prophylaxis or on non-TMP-SMX prophylaxis.  → J29
4. (tpe-pjp-treat) KDIGO 2009, kidney (1C), PCP diagnosed by lavage or biopsy: high-dose IV TMP-SMX with corticosteroids; also reduced immunosuppression (call the transplant team first).  → J1
5. (tpe-pjp-treat) KDIGO 2009, kidney (1C): corticosteroids for moderate to severe PCP, PaO2 <70 mm Hg in room air or alveolar gradient >35 mm Hg.  → J2
6. (tpe-pjp-treat) Bactrim label: high-dose trimethoprim raises serum potassium in many patients; close monitoring is warranted with renal insufficiency or hyperkalemia-inducing drugs; evaluate hyponatremia in symptomatic patients.  → J41, J42
7. (tpe-pjp-treat) Sources differ: KDIGO 2009, kidney (1C): high-dose IV TMP-SMX for diagnosed PCP; Bactrim label interaction table: cyclosporine, avoid concurrent use (call the transplant team first).  → J1, J69

## Node tpe-pjp (body)

- Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.  → FIXED editor note
- • Not in the guidelines read: whether to start Pneumocystis treatment before a diagnosis. KDIGO 2009, kidney, addresses PCP already diagnosed by lavage or biopsy and does not address starting earlier. [1]  → NOT IN 1, J1
- • Nearest sourced fact: AST IDCOP 2019: most empiric pneumonia regimens will not optimally treat Nocardia or Pneumocystis; late-onset and outbreak-associated PJP remain a problem despite prophylaxis (ungraded). [4]  → J32, J59
- • AST IDCOP 2019, same chapter: for the slower-onset pathogens it lists (Nocardia, tuberculosis, non-tuberculous mycobacteria, endemic fungi, invasive molds), empiric therapy is usually not instituted before testing, but may be needed with high acuity or inability to perform procedures; Pneumocystis is not named in that passage. [4]  → J60
- • App content: the HIV consult's pulmonary opportunistic infection node gives Pneumocystis treatment for patients with HIV.  → navigation only
- • Related consults: [Pneumonia](#/tree/pneumonia/node/pna-start), pneumonia care; [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care; [HIV pulmonary infections](#/tree/hiv/node/hiv-pulm-oi), Pneumocystis in HIV; [Kidney recipient infections](#/tree/transplant-patient-ed/node/tpe-kidney-infection), kidney page.  → navigation only
- • More: [Pneumocystis statements and source differences](#/info/tpe-pjp-detail).  → navigation only
- (option) Low oxygen or worsening breathing: Steroid threshold, treatment scope, TMP-SMX label cautions  → navigation only
- (option) Cough, fever or infiltrate: tests and imaging: Chest X-ray, CT, lavage testing  → navigation only
- (option) Which prophylaxis, and for how long: Agents; sources differ on duration  → navigation only
- (option) Not in the sources; disposition: Admission, oxygen, dose  → navigation only

## Node tpe-pjp-test (body)

- • AST IDCOP 2019, all organs: a chest X-ray should be performed in all transplant patients with suspected pneumonia (strong, moderate); chest CT in the initial evaluation is recommended when acuity or net immunosuppression is high (weak, low). [4]  → J25, J26
- • KDIGO 2009, kidney: no specific imaging pattern exists for PCP, so it is imperative that the diagnosis be confirmed by lung biopsy or bronchoalveolar lavage (background, ungraded). [1]  → J4
- • AST IDCOP 2019: lavage fluid testing should include PJP-directed stains or nucleic-acid testing (strong, high), especially off prophylaxis or on non-TMP-SMX prophylaxis; lavage is recommended when infiltrates fail to improve on empiric antibacterial therapy and non-invasive testing gives no diagnosis (strong, moderate). [4]  → J29, J30
- • Sources differ: KDIGO 2009, kidney: confirming by lavage or biopsy is imperative; AST IDCOP 2019: a tiered approach, with lavage if not improving. None is chosen. [1,4]  → J4, J30, J31, J33
- • Not in the guidelines read: which ED tests raise or lower suspicion for PJP. Nearest sourced fact: AST IDCOP 2019 does not recommend 1,3-beta-D-glucan testing in transplant recipients for now (strong, very low). [4]  → NOT IN 2, J28
- • Related consults: [Pneumonia](#/tree/pneumonia/node/pna-start), pneumonia care.  → navigation only

## Node tpe-pjp-treat (body)

- • KDIGO 2009, kidney (1C), PCP diagnosed by lavage or biopsy: high-dose intravenous TMP-SMX and corticosteroids are recommended; also reduction in immunosuppression (call the transplant team first). [1]  → J1
- • KDIGO 2009, kidney (1C), a separate recommendation: corticosteroids for moderate to severe PCP, PaO2 <70 mm Hg in room air or alveolar gradient >35 mm Hg. [1]  → J2
- • Bactrim label: high-dose trimethoprim, as used for PJP, raises serum potassium in many patients; close monitoring of serum potassium is warranted with renal insufficiency, potassium disorders or hyperkalemia-inducing drugs; evaluate hyponatremia in symptomatic patients. [5]  → J41, J42
- • Sources differ: KDIGO 2009, kidney (1C): high-dose intravenous TMP-SMX is recommended for diagnosed PCP. Bactrim label interaction table: cyclosporine, avoid concurrent use; marked but reversible nephrotoxicity reported in renal transplant recipients (call the transplant team first). [1,5]  → J1, J69
- Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.  → FIXED editor note
- • Not in the guidelines read: treatment dose in recipients, steroid dose, or oxygen and ICU criteria.  → NOT IN 5, NOT IN 6, NOT IN 8
- • Related consults: [Potassium](#/tree/potassium/node/k-start); [Sodium](#/tree/sodium/node/na-start); [Potassium, magnesium and QT](#/tree/transplant-patient-ed/node/tpe-cni-lytes).  → navigation only

## Node tpe-pjp-prophylaxis (body)

- • ISHLT 2023, heart: TMP-SMX is the preferred prophylaxis (Class I, A); alternatives for those intolerant include dapsone, atovaquone, clindamycin, pyrimethamine and inhaled pentamidine (Class I, B). [2]  → J15, J16
- • KDIGO 2009, kidney: TMP-SMX is first-line; alternatives for allergy or drug-induced neutropenia include dapsone, aerosolized pentamidine, atovaquone, and clindamycin with pyrimethamine; screen for G6PD deficiency before dapsone. [1]  → J11, J13, J12
- • Sources differ, duration by source: KDIGO 2009, kidney: 3 to 6 months (1B), 6 to 12 months in its UTI rationale, and most experts at least 6 months, perhaps 1 year (rationale). ISHLT 2023, heart: at least 6 to 12 months (Class I, B). AASLD/AST 2025, liver: 6 months with TMP-SMX or atovaquone (Strong, Level 2). Sirolimus label, renal transplant: 1 year. None is chosen. [1,2,3,8]  → J9, J54, J56, J17, J21, J65
- • Nulojix and Zortress labels: Pneumocystis prophylaxis is recommended after transplantation or in transplant recipients; no duration is given. [9,10]  → J66, J67
- • Not in the guidelines read: whether this patient should still be on prophylaxis now, or any duration for lung, pancreas or intestinal recipients. Nearest sourced fact: the organ-specific durations above.  → NOT IN 11, NOT IN 12
- • Related consults: [Kidney recipient infections](#/tree/transplant-patient-ed/node/tpe-kidney-infection), kidney page.  → navigation only

## Node tpe-pjp-dispo (body)

- • Not in the guidelines read: a PJP-specific admission rule, oxygen or ICU criteria, a steroid dose, or the TMP-SMX treatment dose in recipients.  → NOT IN 4, NOT IN 5, NOT IN 6, NOT IN 8
- • AST IDCOP 2019, pneumonia (ungraded): for outpatient care, close monitoring with repeated clinical evaluation is a prerequisite; if this is not feasible or doubts prevail, inpatient management should be favored. Severity scores are not recommended in recipients (strong, very low). [4]  → J34, J27
- • ISHLT 2023, heart (Class I, C): the transplant centre should educate local clinicians to inform it of added antibiotic, antifungal or antiviral therapy and of pneumonia or any respiratory infection. [2]  → J20
- • Review (emergency medicine, 2018; framing only): discusses admission of transplant patients with serious infection and notes pneumonia scores do not account for transplantation; it sets no rule here. [7]  → J63, J64
- • Related consults: [Pneumonia](#/tree/pneumonia/node/pna-start), pneumonia care; [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care.  → navigation only
- Editor note: disposition is decided with the treating transplant team.  → FIXED editor note
- (recommendation) **Possible Pneumocystis pneumonia: PJP-specific admission criteria, oxygen or ICU criteria and treatment doses are not in the guidelines read.** AST IDCOP 2019, pneumonia: for outpatient care, inpatient management is favored if monitoring is not feasible or doubts prevail. Editor note: disposition is decided with the treating transplant team.  → NOT IN 4, NOT IN 5, J34, FIXED editor note

## Overlay tpe-pjp-detail

### KDIGO 2009, kidney

- • KDIGO 2009, kidney (1C): for PCP diagnosed by bronchial alveolar lavage and/or lung biopsy, high-dose intravenous TMP-SMX, corticosteroids and a reduction in immunosuppressive medication are recommended (call the transplant team first). [1]  → J1
- • KDIGO 2009, kidney (1C): corticosteroids for moderate to severe PCP, PaO2 <70 mm Hg in room air or alveolar gradient >35 mm Hg; the rationale says the evidence base is HIV-infected adults, with RCTs showing benefit when started in the first 72 hours. [1]  → J2, J3, J57
- • KDIGO 2009, kidney (rationale): high-dose IV TMP-SMX and reduction of immunosuppressive medications are the treatments of choice (call the transplant team first); usual duration 2 to 3 weeks; IV pentamidine should be considered in proven TMP-SMX allergy; other strategies only for mild PCP. [1]  → J53, J7, J8
- • KDIGO 2009, kidney (background): a definitive diagnosis is organisms in lung tissue or lower respiratory secretions; no imaging pattern is specific, so confirming by biopsy or lavage is imperative. Symptoms most typically begin 6 to 8 weeks after starting immunosuppression. [1]  → J4, J5, J6
- • KDIGO 2009, kidney (1B): TMP-SMX prophylaxis daily for 3 to 6 months after transplantation; (2C): at least 6 weeks during and after treatment for acute rejection. [1]  → J9, J10
- • KDIGO 2009, kidney (rationale): daily and three-times-weekly TMP-SMX prophylaxis worked equally; adult tablet strengths in Table 17: single-strength (80 mg trimethoprim) or double-strength (160 mg trimethoprim), daily or three times a week (prophylaxis dose only). [1]  → J55, J12
- • KDIGO 2009, kidney: second-line prophylaxis doses in adults (Table 17, prophylaxis only): inhaled pentamidine 300 mg every 3 to 4 weeks; dapsone 100 mg/day or 50 mg twice a day; atovaquone 1500 mg/day; screen for G6PD deficiency before dapsone. [1]  → J52, J13
- • KDIGO 2009, kidney (rationale): ciprofloxacin UTI prophylaxis was linked to PCP; TMP-SMX is preferred over ciprofloxacin at least during the first 6 months; 6 to 12 months of TMP-SMX is warranted; some experts recommend prolonged or indefinite prophylaxis. [1]  → J14, J54, J56

### ISHLT 2023, heart

- • ISHLT 2023, heart: TMP-SMX is the preferred prophylaxis (Class I, A); alternatives include dapsone, atovaquone, clindamycin, pyrimethamine and inhaled pentamidine (Class I, B); prophylaxis for at least 6 to 12 months (Class I, B, population not stated in the row). [2]  → J15, J16, J17
- • ISHLT 2023, heart (text): PJP risk is highest in the first 6 months and prolonged high-dose corticosteroids may add risk. Paediatric text on the same page prints a minimum of 3 months up to 24 months for children. [2]  → J18
- • ISHLT 2023, heart (Class I, C): the transplant centre should educate local clinicians to inform it of added antimicrobial therapy and of pneumonia or any respiratory infection. [2]  → J20

### AASLD/AST 2025, liver

- • AASLD/AST 2025, liver (Strong, Level 2): Pneumocystis prophylaxis should continue for 6 months with TMP-SMX or atovaquone; opportunistic infections including PJP typically occur 1 to 12 months after transplant (ungraded). [3]  → J21, J22

### AST IDCOP 2019, pneumonia (all organs)

- • Chest X-ray for all suspected pneumonia (strong, moderate); chest CT when acuity or net immunosuppression is high (weak, low); severity scores not recommended (strong, very low); 1,3-beta-D-glucan not recommended for now (strong, very low). Diffuse bilateral infiltrates suggest CMV, respiratory viruses, Mycoplasma, Legionella and Pneumocystis; ground-glass or mixed ground-glass and micronodular infiltrate raises concern for PJP and CMV (ungraded). [4]  → J25, J26, J27, J28, J23, J24
- • Lavage fluid testing should include PJP-directed stains or nucleic-acid testing (strong, high), especially off prophylaxis or on non-TMP-SMX prophylaxis; lavage is recommended when infiltrates fail to improve and non-invasive testing gives no diagnosis (strong, moderate); a low threshold for procedures when not improving, highly immunocompromised or diagnosis uncertain (strong, moderate). [4]  → J29, J30, J31
- • Second-tier evaluation if no improvement in 24 to 48 hours of empiric therapy or deterioration, and no diagnosis after the first tier (ungraded). Most empiric regimens will not optimally treat Nocardia or Pneumocystis. [4]  → J33, J32
- • For the slower-onset pathogens listed (Nocardia, tuberculosis, non-tuberculous mycobacteria, endemic fungi, invasive molds), empiric therapy is usually not instituted before testing, but may be needed with high acuity or inability to perform procedures; Pneumocystis is not named in that passage. [4]  → J60
- • Late-onset and outbreak-associated PJP remain a problem; mTOR inhibitor pneumonitis generally resolves on discontinuation of the mTOR inhibitor and may co-exist with PJP (ungraded) (call the transplant team first). Close monitoring is a prerequisite for any outpatient approach; if not feasible or doubts prevail, inpatient management should be favored. [4]  → J59, J61, J34

### Labels

- • Bactrim label: indicated for documented Pneumocystis pneumonia and for prophylaxis in immunosuppressed people at increased risk (general, not transplant-specific); high-dose trimethoprim as used for PJP raises serum potassium, with close monitoring warranted in renal insufficiency, potassium disorders or hyperkalemia-inducing drugs; evaluation for hyponatremia is necessary in symptomatic patients; interaction table, cyclosporine: avoid concurrent use, marked but reversible nephrotoxicity reported in renal transplant recipients (call the transplant team first). [5]  → J40, J41, J42, J69
- • Mepron (atovaquone) label (general, adults and adolescents 13 and over): prevention of PCP, and treatment of mild-to-moderate PCP, in people who cannot tolerate TMP-SMX; treatment of severe PCP (gradient above 45 mm Hg) not studied. [6]  → J43, J44
- • Pentam label: IV pentamidine is indicated for treatment of Pneumocystis pneumonia; fatalities from severe hypotension, hypoglycemia, pancreatitis and arrhythmias have been reported. NebuPent label (HIV-infected patients only): inhaled pentamidine prevents PJP; use may alter the clinical and radiographic features; the prevention dose is insufficient to treat acute PJP. [11,12]  → J45, J46, J47, J48, J49
- • Dapsone (Sun) label: indications are dermatitis herpetiformis and leprosy; no Pneumocystis indication appears. One study found dapsone and trimethoprim levels both rose when given together; another found no significant interaction. [13]  → J50, J51
- • Sirolimus label, renal transplant: antimicrobial prophylaxis for Pneumocystis pneumonia should be administered for 1 year following transplantation. Nulojix and Zortress labels: prophylaxis recommended, no duration. [8,9,10]  → J65, J66, J67

### Pathology and reviews (framing only)

- • ISHLT 2007 lung pathology consensus: Pneumocystis can exactly mimic acute rejection on biopsy but can also give atypical reactions (ungraded). [14]  → J35
- • Review (emergency medicine, 2018): most recipients receive PJP prophylaxis; PJP is an opportunistic infection of the intermediate period; lung recipients with pneumonia may not cough much; up to 40% of infections present without fever. [7]  → J36, J38, J39, J62

### Where the sources differ (none is chosen)

- • Prophylaxis duration, by source: KDIGO 2009, kidney: 3 to 6 months (1B); 6 to 12 months (UTI rationale); most experts at least 6 months, perhaps 1 year; some indefinite. ISHLT 2023, heart table: at least 6 to 12 months (Class I, B); its paediatric text 3 to 24 months. AASLD/AST 2025, liver: 6 months (Strong, Level 2). Sirolimus label, renal transplant: 1 year. Nulojix and Zortress labels: recommended, no duration. Lung, pancreas, intestine: none saved. [1,2,3,8,9,10]  → J9, J54, J56, J17, J58, J21, J65, J66, J67
- • Atovaquone: AASLD/AST 2025 pairs it with TMP-SMX; KDIGO 2009 and ISHLT 2023 list it among alternatives; KDIGO Table 17 calls TMP-SMX first-line and all others second-line; the Mepron label covers prevention and mild-to-moderate treatment only. [1,2,3,6]  → J11, J16, J21, J43, J44
- • Steroid thresholds: KDIGO sets moderate to severe at PaO2 <70 mm Hg in room air or alveolar gradient >35 mm Hg; the Mepron label calls a gradient above 45 mm Hg severe disease not studied with atovaquone. The thresholds overlap but are not equal. [1,6]  → J2, J44
- • Speed of invasive diagnosis: KDIGO says it is imperative that PCP be confirmed by biopsy or lavage; AST IDCOP 2019 describes a tiered approach, with lavage if not improving, and for its listed slower-onset pathogens empiric therapy usually follows testing, with exceptions for high acuity. [1,4]  → J4, J30, J31, J33, J60

### Not in the guidelines read, with the nearest sourced facts

- • Empiric treatment before a diagnosis: nearest are the KDIGO treatment recommendation (scoped to diagnosed PCP) and the AST IDCOP passage on empiric therapy and testing; most empiric pneumonia regimens will not optimally treat Pneumocystis.  → NOT IN 1
- • ED tests that raise or lower suspicion for PJP, and the imaging pattern: nearest are the AST IDCOP chest X-ray, CT and lavage statements.  → NOT IN 2, NOT IN 3
- • When to admit, oxygen and ICU criteria: nearest are the AST IDCOP outpatient-monitoring statement and KDIGO's gradient threshold; a review (emergency medicine, 2018) discusses admission of transplant patients with serious infection and sets no rule here.  → NOT IN 4, NOT IN 5
- • Steroid dose and the TMP-SMX treatment dose in recipients: not given. Adjusting maintenance immunosuppression: nearest is KDIGO's reduction statement and the ISHLT centre-notification statement (call the transplant team first).  → NOT IN 6, NOT IN 7, NOT IN 8
- • Monitoring on treatment-dose TMP-SMX: KDIGO has none; the Bactrim label gives potassium, sodium and cyclosporine statements.  → NOT IN 9
- • PJP despite prophylaxis, whether prophylaxis should still be on, and lung, pancreas or intestinal recipients: nearest are the AST IDCOP late-onset statement and the organ-specific durations above.  → NOT IN 10, NOT IN 11, NOT IN 12

