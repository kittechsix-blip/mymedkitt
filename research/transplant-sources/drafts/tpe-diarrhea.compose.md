# tpe-diarrhea compose map

Every sentence on the page, with the ledger row id(s) in `evidence/diarrhea.ledger.md` it restates. `FIXED editor note` = an approved text from scripts/fixtures/transplant-approved-editor-notes.json. `navigation only` = a link or consult list with no clinical statement. `NOT IN n` = item n of the ledger's NOT IN THE SOURCES READ list. Sources differ lines map to the rows on both sides.

## Summaries

- **tpe-diarrhea**: IATDMCT 2019: temporary elevation of tacrolimus troughs (about 2-fold and more) has been observed in diarrhea. Not in the guidelines read: empirical antibiotics before diagnosis in transplant recipients.  → D57, NOT IN 1
- **tpe-diarrhea-severe**: IDSA 2017, general population: evaluate dehydration (strong, high). IDSA/SHEA 2017, general adults, fulminant C. difficile: oral vancomycin is the regimen of choice (strong, moderate).  → D14, D34
- **tpe-diarrhea-cni**: IATDMCT 2019: temporary elevation of tacrolimus troughs (about 2-fold and more) has been observed with diarrhea. Not in the guidelines read: dose changes (call the transplant team first).  → D57, NOT IN 2
- **tpe-diarrhea-cause**: KDIGO 2009, kidney: rule out treatable causes other than the immunosuppressant first, then consider reducing or switching mycophenolate (call the transplant team first).  → D2, D3
- **tpe-diarrhea-dispo**: Not in the guidelines read for transplant recipients: admission or imaging rules, antimotility or probiotic safety, parasites. IDSA 2017, general population: loperamide may be given to immunocompetent adults (weak, moderate).  → NOT IN 5, D22, D17

## Critical actions

1. (tpe-diarrhea) Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.  → FIXED editor note
2. (tpe-diarrhea-severe) IDSA 2017, general population: evaluate all people with acute diarrhea for dehydration (strong, high).  → D14
3. (tpe-diarrhea-severe) IDSA/SHEA 2017, general adults, fulminant: oral vancomycin is the regimen of choice (strong, moderate); subtotal colectomy with rectal preservation if surgery is necessary (strong, moderate).  → D34, D64
4. (tpe-diarrhea-cni) IATDMCT 2019 consensus: note that temporary elevation of tacrolimus trough concentrations (about 2-fold and more) has been observed in patients with diarrhea.  → D57
5. (tpe-diarrhea-cause) KDIGO 2009, kidney: rule out treatable causes other than the immunosuppressant first, then consider reducing or switching mycophenolate (call the transplant team first).  → D2, D3
6. (tpe-diarrhea-dispo) ISHLT 2023, heart (Class I, C): the transplant centre should educate local clinicians to inform it of nausea, vomiting or diarrhea.  → D7

## Node tpe-diarrhea (body)

- Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.  → FIXED editor note
- • IATDMCT 2019 consensus: temporary elevation of tacrolimus trough concentrations (about 2-fold and more) has been observed in patients with diarrhea. Level page: [Reading a level](#/tree/transplant-patient-ed/node/tpe-cni-level). [1]  → D57
- • Not in the guidelines read: an empirical antimicrobial before a diagnosis in transplant recipients. Nearest sourced facts, general population: IDSA 2017: empiric antibacterial treatment should be considered in immunocompromised people with severe illness and bloody diarrhea (strong, low); IDSA/SHEA 2017: empiric C. difficile therapy if a substantial delay in confirmation is expected, or for fulminant disease (weak, low). [3,4]  → NOT IN 1, D18, D56
- • KDIGO 2009, kidney: mycophenolate and tacrolimus may cause or worsen diarrhea; rule out treatable, underlying causes other than the immunosuppressive medication first (rationale, ungraded). [2]  → D1, D2
- • App content: the Acute Diarrhea consult's Immunocompromised Patient node lists additional pathogens, and its C. difficile treatment node gives IDSA/SHEA 2021-based regimens.  → navigation only
- • Related consults: [Acute Diarrhea](#/tree/diarrhea/node/diarrhea-start), diarrhea care; [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care; [Potassium](#/tree/potassium/node/k-start), potassium; [CMV](#/tree/transplant-patient-ed/node/tpe-cmv), CMV page; [Low blood counts](#/tree/transplant-patient-ed/node/tpe-cytopenia), cytopenia page.  → navigation only
- • More: [Diarrhea statements and source differences](#/info/tpe-diarrhea-detail).  → navigation only
- (option) Shock, severe dehydration, ileus or megacolon: IDSA, general population; severe C. difficile  → navigation only
- (option) Taking tacrolimus: Trough concentrations have risen with diarrhea  → navigation only
- (option) Infection or drug: finding the cause: CMV, C. difficile, mycophenolate  → navigation only
- (option) Not in the sources; disposition: Admission, imaging, empiric antibiotic  → navigation only

## Node tpe-diarrhea-severe (body)

- • IDSA 2017, general population: evaluate all people with acute diarrhea for dehydration (strong, high); isotonic IV fluids for severe dehydration, shock or altered mental status with failure of oral rehydration (strong, high), or for ileus (strong, moderate). [3]  → D14, D21
- • IDSA/SHEA 2017, general adults (expert opinion): severe C. difficile is white count 15000 cells/mL or more (as printed) or creatinine above 1.5 mg/dL; fulminant is hypotension or shock, ileus or megacolon. [4]  → D33
- • IDSA/SHEA 2017, general adults, fulminant C. difficile: oral vancomycin is the regimen of choice (strong, moderate); rectal vancomycin if ileus (weak, low); IV metronidazole together with it, particularly if ileus (strong, moderate). Doses: detail page. [4]  → D34
- • IDSA/SHEA 2017, general adults: if surgery is necessary, perform subtotal colectomy with preservation of the rectum (strong, moderate). The 2021 update does not address fulminant disease. [4,5]  → D64, D34
- • Sources differ: C. difficile frequency in solid organ recipients. IDSA/SHEA 2017: prevalence 7.4%, 5-fold general medicine patients. A 2018 review (emergency medicine): up to 30%. Neither is chosen. [4,11]  → D26, D60

## Node tpe-diarrhea-cni (body)

- • IATDMCT 2019 consensus: temporary elevation of tacrolimus trough concentrations (about 2-fold and more) has been observed in patients with diarrhea; this may be because intestinal P-glycoprotein activity is impaired in persistent diarrhea, leading to increased bioavailability. [1]  → D57
- • Not in the guidelines read: whether to check a tacrolimus level, or hold or reduce a dose, during diarrhea (call the transplant team first). The Prograf, Envarsus XR, Astagraf XL and sirolimus labels list diarrhea as an adverse reaction; the Envarsus XR label lists diarrhea among overdose reactions. [14,8,16,17]  → NOT IN 2, D40, D41, D42, D73
- • KDIGO 2009, kidney: monitoring MPA AUC and tacrolimus C0 levels may help with the diarrhea, nausea and vomiting that mycophenolate and tacrolimus may cause or worsen (rationale, ungraded). [2]  → D1
- • Related consults: [Reading a level](#/tree/transplant-patient-ed/node/tpe-cni-level), levels; [Potassium, magnesium and QT](#/tree/transplant-patient-ed/node/tpe-cni-lytes), electrolytes; [Before you give a drug](#/tree/transplant-patient-ed/node/tpe-cni-drugs), interactions.  → navigation only

## Node tpe-diarrhea-cause (body)

- • KDIGO 2009, kidney (rationale, ungraded): rule out treatable causes other than the immunosuppressant first; only then consider reducing mycophenolate or changing it to azathioprine (call the transplant team first). [2]  → D2, D3
- • IDSA 2017, general population: test stool, including for C. difficile, with fever, bloody or mucoid stools, severe cramping or tenderness, or sepsis signs (strong, moderate); broad stool differential in immunocompromised people (strong, moderate). [3]  → D15, D17
- • IDSA/SHEA 2017, general adults: patients with unexplained new-onset 3 or more unformed stools in 24 hours are the preferred population for C. difficile testing (weak, very low); discontinue the inciting antibiotic as soon as possible (strong, moderate). [4]  → D27, D29
- • CMV consensus 2025: plasma PCR sensitivity for gut disease can fall in R+ patients, sometimes low or undetectable (ungraded); histology with immunohistochemistry is recommended (strong, moderate); no stool CMV PCR (strong, low). [6]  → D10, D11, D12
- • Bactrim label: C. difficile diarrhea has followed nearly all antibacterials, including TMP-SMX. [9]  → D44, D45
- • Sources differ, IDSA 2017, general population: blood cultures should be obtained from immunocompromised people (strong, moderate); the rationale says may be considered if febrile. [3]  → D16, D67
- • Related consults: [CMV](#/tree/transplant-patient-ed/node/tpe-cmv), CMV page.  → navigation only

## Node tpe-diarrhea-dispo (body)

- • Not in the guidelines read for transplant recipients: an admission rule, an imaging rule, antimotility or probiotic safety, or a parasite work-up.  → NOT IN 4, NOT IN 5, NOT IN 8, NOT IN 10
- • ISHLT 2023, heart (Class I, C): the transplant centre should educate local clinicians to inform it of nausea, vomiting or diarrhea. [7]  → D7
- • IDSA 2017, general population: loperamide may be given to immunocompetent adults with acute watery diarrhea (weak, moderate), avoided at any age if toxic megacolon may result in inflammatory diarrhea or fever (strong, low); probiotics may be offered to immunocompetent adults and children (weak, moderate); in immunocompromised people, a broad differential including examination for parasites is recommended (strong, moderate). [3]  → D22, D23, D17
- • Review (emergency medicine, 2018; framing only): discusses admission of transplant patients with serious infection; it sets no rule here. [11]  → D58, D59
- • Related consults: [Acute Diarrhea](#/tree/diarrhea/node/diarrhea-start), diarrhea care; [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care.  → navigation only
- Editor note: disposition is decided with the treating transplant team.  → FIXED editor note
- (recommendation) **Diarrhea in a transplant recipient: admission and imaging rules, antimotility or probiotic safety and parasite work-up are not in the guidelines read for transplant recipients.** IDSA 2017, general population: loperamide may be given to immunocompetent adults (weak, moderate). Editor note: disposition is decided with the treating transplant team.  → NOT IN 5, D22, D17, FIXED editor note

## Overlay tpe-diarrhea-detail

### Tacrolimus level and calcineurin inhibitors

- • IATDMCT 2019 consensus: temporary elevation of tacrolimus trough concentrations (about 2-fold and more) has been observed in patients with diarrhea; the proposed mechanism is impaired intestinal P-glycoprotein activity in persistent diarrhea, leading to increased bioavailability. The consensus gives no instruction to hold, reduce or measure. [1]  → D57
- • KDIGO 2009, kidney (rationale): diarrhea, nausea and vomiting may be caused or worsened by MMF and tacrolimus; Table 2 rates them moderate to severe with MMF and mild to moderate with tacrolimus; MMF trials showed no significant difference in GI events such as diarrhea, though there might be evidence that higher doses cause more. [2]  → D1, D4, D5
- • KDIGO 2009, kidney (rationale): rule out treatable, underlying causes other than the immunosuppressive medication first (in one study about half were cured by treating an infection); only then consider reducing mycophenolate or changing it to azathioprine (call the transplant team first). [2]  → D2, D3
- • ISHLT 2023, heart: more diarrhea was seen in sirolimus-based, calcineurin inhibitor-free regimens with higher sirolimus targets (ungraded). [7] AASLD/AST 2024, liver, immunosuppressant table: gastrointestinal effects are listed for everolimus. [19]  → D8, D9

### Labels

- • CellCept: diarrhea is among the most common adverse reactions (20% or more); endoscopy in mycophenolate-related diarrhea showed isolated intestinal villous atrophy; GI bleeding, ulceration and perforation were seen; patient information says call the doctor right away for diarrhea or severe or persistent stomach pain. Myfortic: diarrhea among reactions in 20% or more; administer with caution in active serious digestive system disease. [10,15]  → D35, D36, D37, D38, D39, D72
- • Prograf (kidney, 30% or more), Astagraf XL (Study 1, 30% or more), sirolimus (renal, 30% or more) and Zortress (liver, over 10%) list diarrhea among common adverse reactions; Envarsus XR lists diarrhea among overdose reactions. [8,14,16,17,18]  → D40, D73, D42, D43, D41
- • Bactrim label: C. difficile diarrhea reported with nearly all antibacterials including TMP-SMX, from mild diarrhea to fatal colitis, even over two months after use; indicated for traveler's diarrhea due to susceptible enterotoxigenic E. coli (general adults). Mepron label (HIV trial subjects): diarrhea among the most frequent reactions requiring discontinuation in PCP prevention. [9]  → D44, D45, D46, D47

### IDSA 2017 infectious diarrhea (general population)

- • Evaluate all people with acute diarrhea for dehydration (strong, high); reduced-osmolarity oral rehydration solution is first-line for mild to moderate dehydration (strong, moderate); isotonic IV fluids for severe dehydration, shock or altered mental status with failure of ORS (strong, high), or ileus (strong, moderate). [3]  → D14, D20, D21
- • Stool testing for Salmonella, Shigella, Campylobacter, Yersinia, C. difficile and STEC with fever, bloody or mucoid stools, severe cramping or tenderness, or signs of sepsis (strong, moderate); bloody stools are not an expected manifestation of C. difficile; negative stool studies increase suspicion for noninfectious conditions such as inflammatory bowel disease (ungraded). [3]  → D15, D68, D66
- • A broad differential with stool culture, viral studies and parasite examination in immunocompromised people (strong, moderate; the AIDS detail is not about transplant); empiric antibacterial treatment considered in immunocompromised people with severe illness and bloody diarrhea (strong, low); for acute watery diarrhea an exception to no empiric antimicrobials may be made in immunocompromised or ill-appearing people. [3]  → D17, D18, D19
- • Blood cultures: rec 9 lists immunocompromised people (strong, moderate); the rationale says blood cultures may be considered in febrile immunocompromised people. Immunocompromised people are more likely to have severe or prolonged illness; chronic severe norovirus has been reported after organ transplantation. [3]  → D16, D67, D24, D25
- • Loperamide may be given to immunocompetent adults with acute watery diarrhea (weak, moderate) but avoided at any age if toxic megacolon may result in inflammatory diarrhea or fever (strong, low); probiotics for immunocompetent adults and children (weak, moderate), with bacteremia or fungemia reported in critically ill or immunocompromised people. [3]  → D22, D23

### IDSA/SHEA C. difficile 2017 and 2021 (general adults)

- • IDSA/SHEA 2017: solid organ recipients have 5-fold the rate of general medicine patients (prevalence 7.4%); risk is highest in multiple-organ, then lung, liver, intestine, kidney, pancreas; severe disease 5.3%, recurrence about 20% (ungraded). [4]  → D26, D65
- • IDSA/SHEA 2017: unexplained new-onset 3 or more unformed stools in 24 hours is the preferred testing population (weak, very low); no repeat testing within 7 days or in asymptomatic patients (strong, moderate); discontinue the inciting antibiotic as soon as possible (strong, moderate); start therapy empirically if a substantial delay in confirmation is expected or in fulminant disease (weak, low). [4]  → D27, D28, D29, D56
- • IDSA/SHEA 2017, initial episode: vancomycin 125 mg by mouth four times daily or fidaxomicin 200 mg twice daily for 10 days over metronidazole (strong, high); metronidazole 500 mg three times daily for 10 days only if neither is available, non-severe (weak, high). [4]  → D30
- • IDSA/SHEA 2017 (expert opinion): severe is white count 15000 cells/mL or more (as printed) or creatinine above 1.5 mg/dL (non-severe: 15000 cells/mL or less and creatinine below 1.5). Fulminant is hypotension or shock, ileus or megacolon. [4]  → D33
- • IDSA/SHEA 2017, fulminant: oral vancomycin 500 mg four times daily by mouth or nasogastric tube is the regimen of choice (strong, moderate); rectal vancomycin if ileus (weak, low); IV metronidazole 500 mg every 8 hours together with it, particularly if ileus (strong, moderate); subtotal colectomy with rectal preservation if surgery is necessary (strong, moderate). [4]  → D34, D64
- • IDSA/SHEA 2021 update, abridged: fidaxomicin suggested over a standard vancomycin course for an initial episode (conditional, moderate); for recurrence, fidaxomicin suggested (conditional, low); bezlotoxumab suggested for a recurrence within 6 months (conditional, very low). The update says nothing on severe or fulminant episodes; compromised immunity is named as a recurrence risk factor. [5]  → D31, D62, D63, D32

### CMV consensus 2025 and liver guideline

- • CMV consensus 2025: plasma CMV PCR is sensitive for GI disease in D+/R- patients but can be lower in R+ patients, sometimes low or undetectable; histology with immunohistochemistry is recommended (strong, moderate); no stool or urine PCR (strong, low); culture may be more sensitive than histopathology but is no longer widely available; longer courses may be needed in some tissue-invasive GI disease. [6]  → D10, D11, D12, D69, D70
- • CMV consensus 2025: IV ganciclovir is preferred for life-threatening or sight-threatening CMV disease when optimal drug exposure is essential; valganciclovir bioavailability in severe GI CMV disease lacks PK data (ungraded). AASLD/AST 2025, liver (Strong, Level 1): IV ganciclovir when gastrointestinal absorption is impaired or infection is severe. [6,13]  → D13, D71

### ISHLT 2023, heart

- • ISHLT 2023, heart (Class I, C): the transplant centre should educate local clinicians to inform it of nausea, vomiting or diarrhea (item 15) and abdominal pain; the same list includes added antimicrobial therapy and hospitalization. [7]  → D7

### Reviews (framing only)

- • Review (emergency medicine, 2018): scant diarrhea can mask serious infection; C. difficile affects up to 30% of recipients; stool testing for C. difficile after recent antibiotics; CT for neutropenic patients with fever, abdominal pain and diarrhea; up to 40% of infections present without fever. [11]  → D48, D60, D49, D50, D61
- • Cureus 2025 single-centre cohort (hospitalised kidney recipients, Germany; framing only): most common pathogens C. difficile 26.3%, CMV 12.3%, EPEC 8.6%, norovirus 4.8%; CMV median 13.5 months and C. difficile 15.5 months after transplant; the authors discuss multiplex PCR and adjustment of immunosuppression, which is not carried here as an instruction (call the transplant team first). [12]  → D51, D52, D74, D53, D54, D55

### Where the sources differ (none is chosen)

- • First-line C. difficile treatment: IDSA/SHEA 2017: vancomycin or fidaxomicin over metronidazole (strong, high); IDSA/SHEA 2021: fidaxomicin suggested over a standard vancomycin course (conditional, moderate), vancomycin acceptable. [4,5]  → D30, D31
- • C. difficile frequency in recipients: 7.4% prevalence, 5-fold general medicine (IDSA/SHEA 2017) versus up to 30% (2018 review). [4,11]  → D26, D60
- • Blood cultures in immunocompromised people with diarrhea: recommendation (strong, moderate) versus rationale (may be considered); general-population guideline. [3]  → D16, D67
- • Empiric treatment: IDSA 2017, general population (consider for severe bloody diarrhea in immunocompromised people; exception for ill-appearing watery diarrhea) versus IDSA/SHEA 2017, general adults (C. difficile therapy empirically only with lab delay or fulminant disease). Different syndromes; none is chosen for transplant recipients. [3,4]  → D18, D19, D56

### Not in the guidelines read, with the nearest sourced facts

- • An empirical antimicrobial before diagnosis in transplant recipients: nearest are the general-population IDSA 2017 and IDSA/SHEA 2017 statements above.  → NOT IN 1
- • Whether to check a tacrolimus level, or hold or reduce a dose: not stated; nearest are the IATDMCT consensus statement and the KDIGO monitoring sentence (call the transplant team first).  → NOT IN 2
- • Test order, imaging, admission, immunosuppression adjustment in the ED: nearest are the general IDSA testing statements, a review's CT statement for neutropenic patients, and the ISHLT centre-notification statement; a review (emergency medicine, 2018) discusses admission of transplant patients with serious infection and sets no rule here (call the transplant team first).  → NOT IN 3, NOT IN 4, NOT IN 5, NOT IN 6
- • For transplant recipients: fluids with a renal graft, antimotility and probiotic safety, CMV versus drug diarrhea clues, parasites and norovirus, other organs. The general-population IDSA 2017 statements above (loperamide may be given to immunocompetent adults; a broad differential including parasite examination in immunocompromised people) and the single-centre cohort are the nearest.  → NOT IN 7, NOT IN 8, NOT IN 9, NOT IN 10, NOT IN 12

