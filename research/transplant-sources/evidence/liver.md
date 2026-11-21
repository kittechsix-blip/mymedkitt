# Adult liver transplant recipient: evidence pack

Sources of record (both AASLD/AST practice guidelines on adult liver transplantation, saved as HTML):
- **G** = Te H et al. *Diagnosis and management of graft-related complications.* Liver Transpl 2026;32(3):444-490 (online 2025-08-22; approved by AASLD Governing Board 2025-07-22). File `AASLD_AST_LT_graft_related_complications_2024_LVT0715.html`.
- **N** = Sharma P et al. *Diagnosis and post-transplant management of non-graft-related complications.* Liver Transpl 2026;32(8):1157-1193 (online 2025-12-17). File `AASLD_AST_LT_nongraft_complications_2025_LVT0785.html`.
Adults only. Nothing below comes from outside these two documents.

## How to read the locators (for the verifier)

- Both files are LWW web pages: **no page numbers** exist in the saved HTML. Locator = document (G or N) + section heading as printed + `[P#]`, where `[P#]` is the Nth paragraph/list item in document order from the top of the saved page (title, site chrome and abstract included; extraction script in the session scratchpad). A plain text search for the quote in the HTML finds every item; `[P#]` is a convenience only. Whole-article journal pages: G 444-490, N 1157-1193; per-section journal pages could not be derived.
- **Grade format.** Each guideline statement prints `(Strong|Weak, Level n)`; Level = Oxford evidence level (1 best, 5 weakest). Statements with no grade (background prose, tables) are marked **ungraded**. Grading rule [G P34]: "Recommendations were graded as strong when supporting evidence was robust and consistent to allow the adoption of the recommendations by clinicians as standard of care."
- **Tables were rendered to images** (headless Chrome screenshot of each `<table>`) and read from the images: **G Table 2** (vascular complications), **G Table 4** (immunosuppressive agents, dosing, troughs, interactions), **G Table 6** (Banff rejection types and proposed treatment), **N Table 2** (vaccinations), **N Table 3** (cancer screening). Marked "(read from image)". Not read: G Tables 1, 3, 5, 7-10 (surgical, trial summaries, biomarkers, case series, recurrent-disease criteria), N Tables 1, 4, 5 (bone, renal trial summaries, future research); figures (G Fig 1-4, N Fig 1-7, including the infection timeline figure N Fig 2 and the rejection algorithm G Fig 3) were not read as images, only their captions.
- Quotes are verbatim, under 40 words; ellipses mark omissions.

---

## 1. Acute cellular (T-cell-mediated) rejection and antibody-mediated rejection

**1.1 TCMR frequency and timing** (G, GRAFT REJECTION [P144]; ungraded)
> "Acute TCMR occurs in 10%–30% of liver transplant recipients, usually within the first 3 months of LT."
Late TCMR: "Late TCMR is defined as occurring 6 months after LT, although others have defined it to occur 3–12 months after LT." (same paragraph)

**1.2 Presentation and lab pattern of TCMR: not described.** The graft guideline defines TCMR by biopsy features only (Table 6, read from image): "Diffuse lymphohistiocytic or polymorphous infiltrate in the portal or perivenular areas", "Bile duct inflammation and damage", "Subendothelial inflammation or endotheliitis of veins" (G Table 6, read from image). No symptom list or liver-test pattern for TCMR is given.

**1.3 Diagnosis: biopsy is the reference; blood markers alone cannot diagnose or exclude** (G, GRAFT REJECTION, Question 16 [P152]; Strong, Level 4)
> "peripheral blood biomarkers alone should not be used to diagnose or exclude T-cell–mediated rejection and other forms of allograft injury."
Supporting: "liver biopsy has been the gold standard for the diagnosis of post-liver transplant graft dysfunction" (G, Maintenance immunosuppression and graft monitoring [P131]; Strong, Level 4). "there are no well-established normal ranges for them in the post-LT setting" (liver chemistry tests; G [P154]; ungraded).

**1.4 Treatment, mild TCMR** (G [P140]; Strong, Level 3)
> "the initial approach for mild early and mild late T-cell–mediated rejection should consist of augmentation of existing immunosuppression, including a change from cyclosporine to tacrolimus if applicable."
Mild = "rejection activity index <4" (G [P144]; also Table 6 read from image: "Mild (RAI <4)", "Moderate or severe (RAI ≥4)").

**1.5 Treatment, moderate or severe TCMR** (G [P141]; Strong, Level 3)
> "moderate or severe early or late T-cell–mediated rejection ... should be treated with high-dose intravenous corticosteroids and consideration of addition of another class of immunosuppression"
Dose (stated as example, ungraded; G [P144]): "high-dose corticosteroids (eg, methylprednisolone 500–1000 mg IV daily for 1–3 d)", taper "varies among transplant centers (eg, prednisone 40-80 mg daily, decreased by 10–20 mg decrements until tapered off)". Table 6 (read from image): "High-dose methylprednisolone (500–1000 mg IV) followed by steroid taper". Same paragraph: "Infection prophylaxis should be administered concurrently with high-dose corticosteroids." Response: "Approximately 60%–90% of recipients with acute TCMR respond to high-dose corticosteroids".

**1.6 Refractory TCMR** (G [P142]; Strong, Level 4)
> "A second course of corticosteroids or lymphocyte-depleting therapy should be considered for adult liver transplant recipients with refractory T-cell–mediated rejection"
Also (G [P144]): "In cases with suboptimal response, repeat liver biopsy may be necessary to exclude other developing etiologies of graft dysfunction" and "Patient adherence to immunosuppression should be reinforced."

**1.7 Plasma cell-rich rejection (PCR)** (G [P143]; Strong, Level 4)
> "plasma cell-rich rejection should be treated with corticosteroids and existing immunosuppression should be augmented, followed by consideration of an antimetabolite and/or low-dose maintenance corticosteroid (eg, prednisone 5–10 mg daily)."
Frequency and timing (G [P149]; ungraded): "reported in 3%–5% of recipients transplanted for indications other than AIH"; "PCR occurred later than TCMR at a median of 56 months versus 15 months". Evaluation: "evaluation for DSA and C4d staining should be considered to detect a possible co-existent AMR component."

**1.8 Acute AMR: suspicion** (G, Question 18 [P167]; Strong, Level 3)
> "acute antibody-mediated rejection should be suspected in a recipient with unexplained graft dysfunction, thrombocytopenia, and hypocomplementemia. Donor-specific antibody testing and liver biopsy should be obtained with C4d staining"

**1.9 Acute AMR: how often, context** (G, Acute Antibody-mediated Rejection [P174]; ungraded)
> "Acute AMR can occur in ABO-incompatible grafts but is rare in ABO-compatible LT recipients"
> "AMR should be considered in recipients with graft dysfunction in the setting of high sensitization who develop otherwise unexplained thrombocytopenia, low-complement levels, and circulating immune complexes."
Table 6 acute AMR "other findings" (read from image): "Elevated donor-specific antibody titers", "Unexplained graft dysfunction", "Thrombocytopenia", "Hypocomplementemia". Biopsy: "Staining of portal vein and capillaries and sinusoidal endothelial cells for C4d is most specific for acute AMR." [P174]

**1.10 Acute AMR: treatment** (G [P168]; Strong, Level 3)
> "Initial treatment of acute antibody-mediated rejection ... should include high-dose corticosteroids, augmentation of existing immunosuppression with or without the addition of an immunosuppressant from a different class."
Refractory (G [P169]; Weak, Level 4): "intravenous immunoglobulin and plasma exchange with or without anti-CD20 agents may be considered for acute antibody-mediated rejection refractory to initial therapy." Efficacy caveat (G [P175]; ungraded): "Plasma exchange and intravenous immunoglobulin, with or without rituximab, bortezomib, and/or eculizumab, have been used ... but data are lacking on their efficacy and safety." No IVIG, plasma exchange or rituximab doses are stated.

**1.11 Chronic AMR and chronic ductopenic rejection (CDR)**
- Chronic AMR frequency (G [P178]; ungraded): "occurs in <10% of LT recipients and typically is associated with de novo DSA to HLA class II, especially DQ."
- Diagnosis "is challenging; workup should include donor-specific antibodies and typical findings on liver biopsy" (G [P170]; Strong, Level 4).
- Treatment (G [P171]; Strong, Level 5): "augmentation of existing immunosuppression, with or without the addition of a second class of immunosuppressant, should be considered as initial therapy". Anti-CD20, proteasome inhibitor, plasma exchange, IVIG: "insufficient data" (G [P172]; Strong, Level 4).
- CDR: "treated early (when there is <50% bile duct loss or ductopenia on liver biopsy) with augmentation of existing immunosuppression" (G [P160]; Strong, Level 4); cyclosporine patients "should be switched to tacrolimus" (G [P161]; Strong, Level 3).
- Retransplant: "retransplantation should be considered for acute or chronic antibody-mediated rejection that results in graft failure" (G [P173]; Strong, Level 5); also for progressive CDR (G [P163]; Strong, Level 3).

**1.12 When to test for DSA** (G [P182]; Strong, Level 3)
> "donor-specific antibodies should be assessed in the setting of severe or steroid-resistant rejection, plasma cell-rich rejection, antibody-mediated rejection, or allograft dysfunction of unknown etiology."

**1.13 Who treats.** The guideline does not name a specialty for rejection treatment in the emergency sense. Biopsy interpretation needs "close collaboration between clinician and pathologist" (G [P144]). Table 6 columns titled "Proposed treatment" (read from image). See Section 8 for transplant-centre statements.

## 2. Vascular complications

**2.1 Table 2 (read from image), "Vascular complications after liver transplantation"** (G, Technical graft complications; ungraded table; columns incidence / presentation / diagnosis / treatment):
- Hepatic artery thrombosis (HAT): incidence "2%–10%"; presentation "Elevated liver enzymes, graft dysfunction, and bile leak"; diagnosis "Doppler ultrasound, CTA, MRA, and angiography"; treatment "Early: Surgical thrombectomy and revascularization with anticoagulation, and re-LT. Late: IR thrombolysis, possible stenting and/or anticoagulation, and re-LT"; sequelae "Biliary complications (bile leak, biliary stricture, ischemic cholangiopathy) and graft loss requiring re-LT".
- Hepatic artery stenosis: "2%–9%"; presentation "Elevated liver enzymes"; diagnosis same imaging list; treatment "Early: surgical revision with anticoagulation. Late: anticoagulation, percutaneous transluminal angioplasty, and stenting".
- Portal vein (PV) thrombosis: "1%–2.6%"; presentation "Elevated liver enzymes, prolonged prothrombin time, graft dysfunction, and ascites"; diagnosis "Doppler ultrasound, CTV, and MRV"; treatment "Early: thrombectomy with surgical revision and anticoagulation. Late: anticoagulation, percutaneous thrombolysis, stent, and TIPS"; sequelae "Portal hypertension (ascites, varices) and graft dysfunction".
- PV stenosis: "2%–3%"; presentation "Ascites and elevated liver tests"; treatment "Percutaneous transluminal angioplasty and stenting with anticoagulation".
- Hepatic venous or inferior vena cava outflow obstruction: "<5%"; presentation "Ascites, hepatomegaly, renal dysfunction, portal hypertension, lower extremity edema, and graft dysfunction"; diagnosis "Doppler ultrasound, CTV, and MRV"; treatment "Angioplasty, stenting with anticoagulation, and surgical revision"; sequelae "Graft dysfunction and hepatic congestion".

**2.2 Timing** (G, Technical graft complications [P72]; ungraded)
> "Most cases of hepatic artery thrombosis (HAT) are detected within 5 days after LT, while PVT and hepatic venous outflow obstruction are usually diagnosed later."
Surveillance: "Most centers obtain at least 1 Doppler ultrasound within the first 5 days after LT, although practice varies widely from center to center, and the optimal schedule remains to be established."

**2.3 Imaging test and role** (G [P72]; ungraded). Diagnosis "is based on radiologic imaging such as Doppler ultrasound, CT, magnetic resonance (MR) angiography or venography, or catheter angiography." Doppler is "a screening tool to assess liver graft vasculature in the immediate postoperative period". Next test: "Contrast-enhanced CT angiography or venography provides more detail when vascular abnormality is suspected or when Doppler ultrasound findings are inconclusive. MRI can be used as an alternative test when there is a contraindication to a contrast-enhanced CT scan."

**2.4 Urgency and management** (G Question 5 [P70]; Strong, Level 4)
> "hepatic artery or portal vein stenosis or thrombosis should be managed in a timely fashion to prevent graft loss, which is particularly urgent in the setting of hepatic artery involvement."
Same statement: "Surgical or percutaneous endovascular intervention and anticoagulation should be considered for cases detected in the immediate postoperative period, while percutaneous endovascular interventions and/or anticoagulation should be considered for diagnoses made later."
Retransplant (G [P71]; Strong, Level 2): "timely retransplantation should be considered when vascular complications result in severe allograft injury or allograft failure."

**2.5 Early versus late HAT** (G [P75]; ungraded)
> "When early HAT leads to progressive liver failure, urgent re-LT is needed to avoid a high mortality risk."
> "If HAT is identified within 7 days of LT, patients are prioritized as status 1 on the transplant waitlist."
Late: "Late-onset HAT can be addressed with percutaneous interventions and/or anticoagulation alone, but if it occurs gradually, adequate collateralization may develop that allows the graft to survive without intervention." Even then "ischemic cholangiopathy that may require re-LT in the future may still develop in this setting."

**2.6 Drug link.** "SRL has a black box warning for hepatic artery thrombosis, but a meta-analysis showed no increased risk with use of EVL" (G, Question 11 [P118]; ungraded). Table 4 lists "HAT (sirolimus)" under side effects (read from image).

## 3. Biliary complications

**3.1 Frequency** (G, Question 6 [P79]; ungraded): "Biliary strictures following LT occur in up to 15% of DDLT recipients and 40% of LDLT recipients". Anastomotic strictures "are typically single, short-segment strictures located at the site of the biliary anastomosis"; non-anastomotic strictures "can be multiple ... often due to perioperative ischemic insults to the peri-biliary vasculature from long cold or warm preservation time or hepatic artery insufficiency or thrombosis."

**3.2 Presentation** (G [P80]; ungraded)
> "The presentation of post-LT biliary strictures ranges from asymptomatic elevation of liver chemistry tests to overt biliary obstruction with jaundice and/or cholangitis."

**3.3 Imaging** (G [P77]; Strong, Level 2)
> "MRCP should be used as the first-line diagnostic tool for anastomotic and non-anastomotic biliary strictures in adult liver transplant recipients."
Direct to ERCP (G [P78]; Weak, Level 5): "In adult liver transplant recipients in whom there is a high clinical suspicion for biliary pathology or for the need of endoscopic intervention, an ERCP can be pursued, without a preceding MRCP or following a negative MRCP." MRCP performance (G [P80]): "94%–96% sensitivity and a 94%–95% specificity", also identifies "bilomas or intraductal biliary casts".

**3.4 Management of strictures** (G Question 7)
- [P82] Strong, Level 2: "Endoscopic characterization, balloon dilation, and stenting should be performed as first-line management of anastomotic biliary strictures ... who have a choledochocholedochostomy (duct-to-duct anastomosis) or choledochoduodenostomy."
- [P84] Strong, Level 3: "Percutaneous transhepatic biliary drains should be reserved for ... biliary strictures that have failed endoscopic management."
- [P85] Strong, Level 3: for Roux-en-Y choledochojejunostomy "Either endoscopic stents or percutaneous transhepatic biliary drains should be placed ... depending on the center's expertise."
- [P87] Strong, Level 4: non-anastomotic strictures: "Initial management ... should be via endoscopic retrograde cholangiography and stenting, if the locations are amenable".
- [P89] Strong, Level 4: "In adult liver transplant recipients with irreversible symptomatic biliary disease or progressive ischemic cholangiopathy, retransplantation should be considered."
- Percutaneous drainage may suit "patients ... who are critically ill with hemodynamic instability" (G [P90]; ungraded).

**3.5 Complications of persistent strictures** (G [P91]; ungraded): "can lead to complications such as cholangitis, hepatic abscesses, and graft dysfunction". DCD grafts carry higher ischemic cholangiopathy risk; extra waitlist priority for "persistent cholestasis with serum bilirubin >2 mg/dL, recurrent cholangitis with associated bacteremia, or non-anastomotic biliary strictures unresponsive to treatment."

**3.6 Bile leak.** Mentioned only as: a presentation of HAT ("Elevated liver enzymes, graft dysfunction, and bile leak", Table 2, read from image); a long-term sequela of hepatic artery thrombosis/stenosis (Table 2, read from image); and a living-donor figure: "11.4% for biliary leaks and 20.6% of biliary strictures in LDLT recipients" with risk factors "multiple bile duct anastomosis ..., Roux-en-Y hepaticojejunostomy ..., and a history of major abdominal surgery" (G, Living donor liver transplantation [P40]; ungraded). **No timing, work-up or management of bile leak is stated.** Cholangitis work-up (cultures, antibiotics) also not stated.

## 4. Infection in the liver recipient (N, "Infectious complications"; G has no infection section)

**4.1 Timeline** (N, Infectious complications [P100]; ungraded)
> "Nosocomial infections and donor-derived infections (DDI) typically occur during the first month of LT; opportunistic infections like cytomegalovirus, Pneumocystis jiroveci pneumonia (PJP), and tuberculosis occur from 1 to 12 months post-LT; and community-acquired infections usually occur after 6 months post-LT"
Also [P100]: "Infection is a leading cause of death in LT recipients." and "Respiratory viral infections, including COVID-19, influenza, and respiratory syncytial virus (RSV), are more severe in LT recipients." (Figure 2 timeline not read.)

**4.2 Early infection burden** (N [P102]; ungraded): "bacterial, including multidrug-resistant infections (25%) and fungal infections (40%), are common with high mortality rates ranging from 25% to 67%." Risk factors include "pre-LT infections", "mechanical ventilation or prolonged intensive care unit stay", "renal insufficiency including renal replacement therapy", "re-operation or hepatic artery complications".

**4.3 Fungal prophylaxis** (N Question 8 [P98]; Strong, Level 2)
> "Liver transplant recipients with two or more risk factors (renal replacement therapy ..., needing re-operation including anastomotic leakage or repeat laparotomies, re-transplant, receiving transfusion of ≥40 units of cellular products or having had a choledochojejunostomy) should receive prophylaxis with fluconazole for 2–4 weeks"

**4.4 PJP** (N [P97]; Strong, Level 2): "prophylaxis of Pneumocystis jiroveci pneumonia should be continued for 6 months post-transplant with trimethoprim-sulfamethoxazole or atovaquone".

**4.5 Latent TB** (N [P96]; Strong, Level 1): "isoniazid 300 mg once a day plus pyridoxine (vitamin B6) 50 mg once a day should be instituted within 6 months post-transplant once graft function is stable."

**4.6 CMV** (N Question 10)
- Prevention [P117] Strong, Level 1: "pre-emptive monitoring with weekly cytomegalovirus polymerase chain reaction testing for 100 days"; if not reliable [P118] Strong, Level 1: "valganciclovir 900 mg once a day (or renally adjusted) for 3 months (Cytomegalovirus Donor±/Recipient+) or 6 months (Cytomegalovirus Donor +/Recipient−)".
- Presentation [P127] ungraded: "asymptomatic viremia, CMV syndrome (fatigue, myalgias, fevers, neutropenia, and viremia), or CMV end-organ disease"; "CMV infection typically occurs within 1–2 months of stopping prophylaxis, and within the first 3 months after LT or rejection treatment"; "CMV end-organ disease most commonly affects the gastrointestinal tract, including the liver; it is unique as viremia may be below the limit of detection".
- Treatment [P122] Strong, Level 1: "oral valganciclovir is the preferred treatment ... (900 mg twice daily or renally adjusted) except when the viral load is ≥100,000 IU/mL, impaired gastrointestinal absorption, or presence of severe infection, especially pneumonia, in which case intravenous ganciclovir is recommended".
- Refractory [P123] Strong, Level 1: "maribavir 400 mg twice daily is the preferred therapy for refractory or resistant cytomegalovirus with low viral load (≤20,000 IU); intravenous foscarnet should be used for ... high viral load (>20,000–50,000 IU/mL), severe disease". "Management of refractory or resistant CMV should be directed by a transplant infectious diseases specialist." [P127]
- HSV/VZV [P121] Strong, Level 2: in CMV D-/R- or pre-emptive monitoring, "oral acyclovir, valacyclovir, or famciclovir should be used to prevent herpes simplex virus and varicella zoster virus for at least 3 months after liver transplant". (The dedicated TTS CMV guideline is covered in `cmv.md`.)

**4.7 Influenza and respiratory viruses** (N [P103], [P108], [P109]; ungraded)
> "Influenza infection has been associated with a higher rate of pulmonary and extrapulmonary complications, development of rejection with graft dysfunction, prolonged shedding of influenza virus, and increased drug resistance."
> "For those with exposure, rapid initiation of empiric treatment is preferred"
Treatment: "Any approved neuraminidase inhibitor (oral oseltamivir, intravenous peramivir, or inhaled zanamivir) can be used for influenza treatment with dosing based on renal function"; benefit best within 48 h but "therapy may be effective in hospitalized patients and immunocompromised patients beyond this time." Baloxavir "is not routinely recommended for immunocompromised patients because of the risk of resistance emergence". RSV: "As there are no approved therapies for RSV, supportive measures are recommended."

**4.8 Donor-derived infection** (N Question 9; [P111]-[P115])
- [P115] ungraded: a donor-derived infection "should be suspected in all early post-LT infections, particularly if it involves an unusual pathogen or the recipient has an atypical post-LT course, including unexplained fever, unexplained hepatitis, or unexplained alteration of mental status."
- [P112] Strong, Level 5: suspicion "must be reported by the Organ Procurement Organization and/or transplant center within 24 hours to the Organ Procurement and Transplant Network Patient Safety Portal".
- [P113] Strong, Level 3: "The transplant team should secure residual blood samples from donor and recipient(s) and retain all relevant cultures".

**4.9 Food, water, pets** (N [P42], [P43], [P99]): avoid "untreated water from lakes and rivers" (Strong, Level 3); avoid "unpasteurized milk products, and raw or undercooked eggs and meats" (Strong, Level 3); "avoid exposure to high-risk pets, which include rodents, reptiles, and birds" (Strong, Level 5).

**4.10 Not covered in these documents:** fever work-up, empiric antibiotic choice, specific organisms beyond CMV/HSV/VZV/PJP/TB/Candida/influenza/RSV/COVID, C. difficile, sepsis management. Zoster vaccine covered in 8.4.

## 5. Recurrent disease, late graft dysfunction, abnormal liver tests

**5.1 No stepwise approach to an abnormal liver test in a recipient is stated.** The nearest statements:
- Biopsy is the reference (1.3). "Peripheral blood biomarkers alone should not be used to diagnose or exclude" TCMR (G [P152]).
- DSA testing for "allograft dysfunction of unknown etiology" (G [P182]; Strong, Level 3).
- Repeat biopsy "to exclude other developing etiologies of graft dysfunction" if rejection treatment fails (G [P144]).
- Chronic AMR work-up must exclude "Other liver diseases that may cause a similar pattern of liver injury" (G [P170]).
- Vascular and biliary causes present as "Elevated liver enzymes" (Table 2, read from image) and "asymptomatic elevation of liver chemistry tests" (G [P80]); see Sections 2-3.
- Early graft dysfunction: Olthoff EAD definition (G Early allograft dysfunction [P65], ungraded): "peak AST/ALT higher than 2000 U/L within the first 7 days, serum bilirubin of ≥10 mg/dL, or INR ≥1.6 on postoperative day 7"; prognosis scores "should be used to predict the outcome following early allograft dysfunction" (G [P63]; Strong, Level 2; L-GrAFT or EASE).

**5.2 Routine surveillance biopsy not recommended** (G [P131]; Strong, Level 4): "protocol liver biopsy is not recommended in the routine management of stable adult liver transplant recipients." Transient elastography: "routine use ... cannot be recommended" (G [P132]; Weak, Level 3).

**5.3 Recurrent viral hepatitis (G, Recurrent disease)**
- HBV: "first-line nucleos(t)ide analogue should be administered to prevent recurrent hepatitis B infection post-liver transplant" (G [P193]; Strong, Level 3). For HBsAg-negative recipients of anti-HBc-positive grafts: "entecavir, tenofovir disoproxil, or tenofovir alafenamide should be administered indefinitely" (G [P190]; Strong, Level 3).
- HCV (viremic graft): direct-acting antiviral "for a duration of 12 weeks without ribavirin" (G [P205]; Strong, Level 3); "assessment and monitoring for potential direct-acting antiviral therapy interactions with calcineurin inhibitors and other medications should be performed during and after treatment" (G [P207]; Strong, Level 3).

**5.4 Recurrent autoimmune and cholestatic disease** (G [P219]; ungraded): "Recurrent AIH, primary biliary cholangitis (PBC), and primary sclerosing cholangitis (PSC) can lead to graft loss and mortality." Recurrent PBC "requires histological confirmation" and "may be underestimated in long-term LT survivors who have mild ALP elevations but no liver biopsy" (G [P224]). Presentation symptoms of recurrent disease are not given in text (Table 9 not read).

**5.5 Recurrent steatotic disease and alcohol** (G): "Due to the contribution of calcineurin inhibitors to the risk of de novo diabetes and metabolic syndrome, lowering calcineurin inhibitor exposure may be considered" in MASH recipients (G [P233]; Weak, Level 5). "MASLD recurred in 59%, 57%, and 82% ... at 1, 3, and 5 years" (G [P234]; ungraded). Alcohol: "Liver transplant recipients should avoid alcohol intake irrespective of the etiology of liver disease" (N [P52]; Strong, Level 4); post-LT alcohol "has been implicated in graft rejection" (N [P57]). Annual "depression screening and assessment of alcohol use" (N [P54]; Strong, Level 3). Biomarkers named in G [P248]: "serum PEth and urine ethylglucoride".

**5.6 Nonadherence as a cause of dysfunction.** "Suboptimal immunosuppression and non-adherence increase the risk of developing de novo DSA" (G [P188]). Screening statement (N [P50]; Strong, Level 3): "Liver transplant recipients with medical nonadherence (missed appointments, missed laboratory testing, subtherapeutic immunosuppression levels) should be screened for substance use disorder, anxiety, and depression"; also food, transport insecurity and social support (N [P51]; Strong, Level 4).

## 6. Immunosuppression

**6.1 Table 4 (G, read from image), "Immunosuppressive agents, dosing, common side effects, and drug interactions".** Footnote (G [P112]): "Dosing and target trough levels vary at the discretion of the transplant professional."
- Tacrolimus: "0.1–0.15 mg/kg/d PO twice daily"; trough "7–10 ng/mL for first month; 4–8 ng/mL for months 2–12; 4 ng/mL 12 mo onward".
- Cyclosporine: "2 mg/kg/d PO twice daily, adjusted to trough levels"; trough "250–300 ng/mL for first 3 mo; 100–250 ng/mL month 3 onward".
- Everolimus: "1 mg PO bid after month 1"; trough "3–8 ng/mL". Sirolimus (off-label): "2 mg PO daily after month 1"; "4–10 ng/mL".
- Mycophenolate mofetil/mycophenolic acid (off-label): "1000–3000 mg PO/360-720 mg PO in divided doses, administered twice daily". Azathioprine "3–5 mg/kg/d PO daily". Prednisone "PO, progressive taper"; Solumedrol "500 mg–1 g IV bolus, with progressive taper". Basiliximab "20 mg IV given at POD 0 and 4".
- Side effects as printed: CNIs "Nephrotoxicity, electrolyte disorders, neurotoxicity, diabetes (more with TAC), hypertension, anemia, gingival hyperplasia (CSA), and hirsutism (CSA)"; antimetabolites (MMF) "Cytopenias, gastrointestinal infections, and teratogenicity"; azathioprine "Cytopenias, gastrointestinal, hepatic, hypersensitivity, infections, and malignancy"; mTOR inhibitors "Gastrointestinal, leukopenia, hyperlipidemia, proteinuria, peripheral edema, wound healing complications, aphthous stomatitis, interstitial pneumonitis, and HAT (sirolimus)"; corticosteroids "Diabetes, gastrointestinal, hypertension, obesity, osteopenia, and opportunistic infections".
- Interactions as printed: CNIs "Increased drug levels with grapefruit juice or co-administration with CYP3A inhibitors: macrolide antibiotics, azole antifungal agents, calcium channel blockers, direct antiviral therapy (with CSA - sofosbuvir, glecaprevir, and voxilaprevir), protease inhibitors, antimalarial agents, benzodiazepines (diazepam and alprazolam), serotonin uptake inhibitors, allopurinol, amiodarone, danazol, proton pump inhibitors, nirmatrelvir–ritonavir. Decreased drug level with CYP34A inducers: antimycobacterial agents, anticonvulsants, and the St. John's wort." (printed as "CYP34A" in the image). mTOR inhibitors: same list "with CSA or CYP3A4 inhibitors", decreased with "anticonvulsants and the St. John's wort". MMF: "Decreased systemic exposure with co-administration of antacids or proton pump inhibitors, drugs that interfere with enterohepatic recirculation, or calcium-free phosphate binders". Solumedrol: "Increased levels with nirmatrelvir/ritonavir". Azathioprine: may "inhibit the anticoagulant effect of warfarin".

**6.2 Regimen statements** (G Questions 8-12)
- [P107] Strong, Level 3: "tacrolimus monotherapy should be considered as maintenance immunosuppression in patients at low risk for rejection (eg, non-immune–mediated liver disease)".
- [P108] Strong, Level 3: "Combination therapy with tacrolimus and an antimetabolite or a mammalian target of rapamycin inhibitor should be considered ... who require reduced exposure to tacrolimus due to adverse effects (eg, renal dysfunction)."
- [P109] Strong, Level 3: once-daily extended-release tacrolimus "should be used similarly to twice-daily immediate-release formulations".
- [P104] Strong, Level 2: "steroid-free immunosuppression cannot be routinely recommended due to higher rates of acute rejection, steroid-resistant rejection, and decreased glomerular filtration rate".
- [P94] Strong, Level 2: "anti-thymocyte globulin should not be used as induction immunosuppressive therapy"; [P93] Weak, Level 2: basiliximab "can be used to delay the start of calcineurin inhibitors to improve renal recovery".
- [P117] Weak, Level 3: mTOR inhibitor "may be considered ... transplanted for hepatocellular carcinoma within the Milan criteria".
- [P127] Strong, Level 2: "conversion from calcineurin inhibitors to or addition of mammalian target of rapamycin inhibitor-based immunosuppression should be considered to prevent progression of kidney disease and is best implemented in the early (~3 mo) post-transplant period."

**6.3 Toxicity statements (text)**
- Renal/metabolic (G [P110]; ungraded): "TAC is associated with long-term complications, including renal dysfunction, increased risk of malignancy and DM." MMF "gastrointestinal disturbance, leukopenia, thrombocytopenia, anemia, and teratogenicity".
- mTOR (G [P118]; ungraded): "bone marrow suppression, hypertriglyceridemia, delayed wound healing, pulmonary toxicity, proteinuria, dermatologic toxicity, and edema."
- CNI metabolic pattern (N [P155]; ungraded): "CNI have been associated with dyslipidemia, DM, HTN, and chronic kidney disease (CKD) with HTN and dyslipidemia are more commonly observed with cyclosporine while hyperglycemia is more typical with tacrolimus."
- Belatacept: "use of belatacept for renal protection is not recommended due to an increased risk of mortality" (N [P205]; Strong, Level 1). Mycophenolate monotherapy "not recommended to prevent kidney disease progression because of a strong association with acute cellular rejection" (N [P206]; Strong, Level 2).
- Neurotoxicity: appears only as the word "neurotoxicity" in Table 4 (read from image); no symptoms, levels or management are given in either document (see Not stated).

**6.4 Do not stop or change immunosuppression** 
- "Complete immunosuppression withdrawal is not routinely recommended, given the lack of reliable predictors of withdrawal success" (G [P136]; Strong, Level 4); "should not be undertaken except in a closely monitored, highly selected group of LT recipients" (G [P138]; ungraded).
- Peri-surgery (N [P219]; ungraded): "It is not recommended to hold CNI for the surgery or after the surgery." and "consider holding mTORi (everolimus or sirolimus) ~4–6 weeks before elective surgery". "a transplant professional should be involved in the management of immunosuppression before and after elective surgery" (N [P218]; Strong, Level 5).
- CKD (N [P204], [P207]; Strong, Level 1 and 3): "calcineurin inhibitors should be minimized but not eliminated within the first year" and "minimized but not stopped beyond 1 year post-transplant".
- Supplements/food (N [P40]-[P41]): "should not use herbal and dietary supplements without discussing with their transplant providers" (Strong, Level 4); "avoid foods known to interact with immunosuppressive therapy, particularly grapefruit" (Strong, Level 3). Foods that may raise CNI levels: "grapefruit, pomegranate, clementines, and black licorice"; "St. John's Wort may reduce CNI levels" (N [P45]).
- No statement says an ED clinician should not give, hold or adjust a specific dose in an emergency (see Not stated).

**6.5 Levels and pregnancy.** CNIs may be used; "trough levels should be monitored along with liver tests to guide dosing" (N [P91]; Strong, Level 4). Mycophenolic acid "contraindicated in pregnancy" (N [P90]; Strong, Level 1).

## 7. Long-term (chronic) complications (N)

**7.1 Kidney** 
- Surveillance (N [P188]; Strong, Level 4): "serial serum creatinine-based estimated glomerular filtration rate should be performed every 6–12 months in the early and moderate (stages 1–3) and 1–3 months in advanced chronic kidney disease (stages 4–5)".
- Burden (N [P189]; ungraded): "the risk of incident advanced (stages 4–5) CKD is highest among LT recipients" compared with heart and lung recipients; "Acute kidney injury (AKI), common in the early postoperative period, is strongly associated with post-LT CKD."
- Recognition (N [P192]; ungraded): "Increased proteinuria (spot protein-to-creatinine ratio >0.3) may be absent even in the presence of advanced CKD because of the antiproteinuric effect of CNIs." Cystatin C: "if cystatin C is available, then eGFR should be estimated from the combination of creatinine and cystatin C."
- Referral (N [P195]; Strong, Level 5): "referral to nephrology should be considered at stage 4 disease". CNI dose reduction in first-year CKD "typically in combination with an adjunctive non-nephrotoxic immunosuppressive agent (mycophenolate or everolimus)" (N [P203]; Strong, Level 1).

**7.2 Diabetes, hypertension, lipids, obesity** 
- Screening (N [P148]; Strong, Level 5): "annual screening for hypertension, obesity, diabetes, and hyperlipidemia should be performed".
- Early steroid withdrawal [P149] (Strong, Level 1); poor glycemic control: "conversion from tacrolimus to cyclosporine may be considered" [P150] (Weak, Level 3); uncontrolled hypertension: "conversion from cyclosporine to tacrolimus may be considered" [P151] (Weak, Level 3).
- Diabetes drugs [P158]-[P159] (Strong, Level 5): metformin first line without other CV risk; "glucagon-like peptide-1 receptor agonists, and/or sodium-glucose cotransporter-2 inhibitors should be considered as first-line therapy for those at high-risk for atherosclerotic cardiovascular disease, heart failure, stroke, or chronic kidney disease". N [P160] (ungraded): "Insulin-based therapies ... should be practiced as in a non-transplant setting." N [P160]: "In patients without these conditions, metformin is used as first-line therapy, but not sulfonylureas."
- Hypertension (N [P164]; ungraded): defined "systolic blood pressure ≥140 mm Hg and/or diastolic blood pressure ≥90 mm Hg"; "The goal of antihypertensive pharmacotherapy is to lower BP to ≤130/80 mm Hg." Agents: RAS inhibitor with CVD or CKD "unless contraindicated due to difficult-to-control hyperkalemia" (N [P162]; Strong, Level 5); otherwise "amlodipine or felodipine" (N [P163]; Strong, Level 5), because of "minimal interaction with CNI" [P164].
- Lipids (N [P166]-[P167]; Strong, Level 5): "hydrophilic statins are recommended as first-line therapy"; hypertriglyceridemia despite statin: "omega-3 with or without fibrates".
- Metabolic syndrome burden [P153]: "overall MetS prevalence exceeding 50%"; "HTN has the highest incidence post-LT, followed by DM." Obesity "exceeding 40%" [P44].

**7.3 Cardiovascular disease** 
- Pre-LT CVD "is an independent predictor of post-LT cardiovascular events, a leading cause of post-LT morbidity and mortality" (N [P181]; ungraded).
- Statements: cardiac-focused assessment each visit [P178] (Strong, Level 5); aspirin or statin "guided by the same cardiovascular risk stratification approach used in the general population" [P184] (Strong, Level 5); recurrent events: "minimization of calcineurin inhibitors with introduction of mammalian target of rapamycin inhibitors (eg, everolimus) may be considered" [P185] (Weak, Level 3). Tobacco cessation [P131] (Strong, Level 1).

**7.4 Bone** (N Question 4; Table 1 not read). [P59] Strong, Level 2: "bone density scan once they are on stable immunosuppression, typically after 6 months of transplant". Burden [P66] (ungraded): "incidence of post-LT osteopenia, osteoporosis, and fractures was 35%, 12%, and 20%, respectively, with vertebral fracture incidence at 11% and hip fracture at 0.9%." Treatment thresholds [P64] (Strong, Level 1): osteopenia with "history of fragility fractures of the hip or spine", T-score "−2.5 or lower", or FRAX "≥20%" major / "≥3%" hip; agents "alendronate, denosumab, risedronate, and zoledronate". Calcium ">1200 mg per day" [P61]; vitamin D3 "1000–2000 IU daily" if 25(OH)D <30 ng/mL [P63] (Strong, Level 3).

**7.5 De novo malignancy, skin cancer** 
- Burden (N [P139]; ungraded): "LT recipients demonstrate a 2.45-fold overall increase in cancer risk"; "By far, the greatest absolute risk increase of any cancer is with non-melanoma skin cancer". Largest relative risk non-Hodgkin lymphoma [P139].
- Skin (N [P130]; Strong, Level 2): "should undergo yearly clinical skin exams for skin cancer screening". Table 3 (read from image): skin, all patients: "Annual full-body skin exam (more frequent surveillance in those with skin cancer)", "ACS recommends: monthly skin self-exams", "Limiting exposure to ultraviolet rays".
- General screening (N [P129]; Strong, Level 1): "age-appropriate cancer screening according to the United States Preventive Services Task Force or other organizations". Table 3 (read from image) also lists colorectal (colonoscopy every 5 y, preferred over stool tests), cervical/anal if HPV+, breast age ≥40, prostate, lung low-dose CT in qualifying smokers, oropharyngeal ENT referral. Colonoscopy over stool tests: "Given the limited sensitivity of stool-based testing for advanced adenoma in solid organ transplant recipients, colonoscopy is preferred" (N [P141]).
- Head and neck: referral within the first year for tobacco, alcohol-associated liver disease or HPV history (N [P133]; Weak, Level 3).

**7.6 PTLD** (N Question 12 [P145]; Weak, Level 3): "the screening for post-transplant lymphoproliferative disorder with serial Epstein–Barr virus polymerase chain reaction is not supported." Recognition [P146] (ungraded): "PTLD occurs in approximately 2% of adult LT recipients, most commonly in the first 3 years of LT, although patients may present many years later. Clinical presentation is often nonspecific, with no or vague symptoms such as fevers, night sweats, or weight loss. Imaging may show bulky lymphadenopathy, with a confirmatory diagnosis subsequently made by biopsy." (quote shortened; verbatim in source). Highest risk: "Patients who are EBV negative at the time of LT". Management: "involves a reduction in immunosuppression"; monomorphic PTLD "chemotherapy like other lymphomas."

## 8. Emergency or urgent presentation, transplant-centre contact, pregnancy, vaccination, travel

**8.1 Emergency presentation, ED, "when to call or transfer": not addressed.** Neither document has a section on ED presentations or a statement telling a non-transplant clinician when to contact or transfer to the transplant centre. Closest statements: "timely" management of vascular complications, "particularly urgent in the setting of hepatic artery involvement" (G [P70]); "urgent re-LT" for HAT with progressive liver failure (G [P75]); DDI "must be reported ... within 24 hours" (N [P112]); transplant infectious disease specialist should direct refractory CMV (N [P127]); "transplant professional" involvement in peri-surgical immunosuppression (N [P218]); supplements "discussing with their transplant providers" (N [P40]).

**8.2 Pregnancy** (N Reproductive health [P84]-[P92]). [P85] Strong, Level 3: "pregnancy should be delayed for at least one year after transplant and until graft function has been stable for at least six months". [P86] Strong, Level 5: "a multidisciplinary approach is advised for pregnancy care involving transplant providers and maternal-fetal medicine specialists". [P90] Strong, Level 1: "Mycophenolic acid products are contraindicated in pregnancy ... discontinued at least 6 weeks before conception for women and 90 days for men". [P91] Strong, Level 4: CNIs may be used. [P92] Strong, Level 4: "Azathioprine and corticosteroids are acceptable". [P94] ungraded: "mTORi use is not recommended due to limited safety and outcomes data in pregnancy". [P88] ungraded: "Pregnant LT recipients are at higher risk for gestational diabetes, and hypertensive disorders, including preeclampsia, occur more frequently." Rejection in pregnancy "ranging from 4% to 7.7%" [P93].

**8.3 Vaccination** (N Question 5)
- [P73] Strong, Level 1: "Liver transplant recipients should not receive live virus vaccines".
- [P72] Strong, Level 1: follow ACIP guidance for immunocompromised adults and discuss with providers.
- [P74] Strong, Level 4: household contacts "should avoid vaccinia/smallpox and polio vaccine but may receive other live attenuated vaccines when no inactivated alternatives are available ... while exercising diligent handwashing for 2 weeks".
- Timing [P76] (ungraded): "deferring vaccinations for 3–6 months after LT or after the treatment of acute allograft rejection due to a reduced response to the vaccine".
- Table 2 (read from image): influenza "One dose seasonally" inactivated; caution "the live virus vaccine is administered as a nasal spray and should be avoided"; varicella/zoster: "all adult liver transplant recipients aged ≥19 y receive 2 doses of VZVr" and "the live vaccine is also injectable and should be avoided"; COVID-19 booster "at least once every 6 mo"; Tdap then Td/Tdap every 10 y; RSV vaccine "Considers use in adults age ≥50 y, single dose"; rabies "Not routinely recommended. Post-exposure vaccination recommended (5-dose regimen days 0, 3, 7, 14, and 28) with immunoglobulin day 0"; hepatitis A and B, HPV, pneumococcal, meningococcal schedules also tabulated.
- Influenza: "vaccination of all close contacts is recommended" and "Live attenuated influenza vaccines are not recommended for transplant patients or their close contacts" (N [P103]; ungraded). COVID-19: "Monoclonal antibodies are effective at reducing the risk of COVID-19 infection ... although availability is determined by activity against circulating variants" [P103].

**8.4 Travel** (N [P75]; Strong, Level 4): "should consult with a travel medicine specialist before traveling to regions with higher rates of infection and be advised on vaccine-preventable illnesses and antimicrobial prophylaxis based on destination-associated infection risks." Examples: "yellow fever or hepatitis A" (N [P82]).

**8.5 Elective surgery** (N [P217]; Strong, Level 5): "elective surgery should occur at least 3 months after transplant when the patients have stable allograft function".

**8.6 Exercise, diet (minor).** Sodium "<2300 mg/day" (N [P39]; Strong, Level 5); aerobic activity 150-300 min/week (N [P47]; Strong, Level 2).

---

## Not stated (ED-relevant questions these documents do not answer)

1. No ED-oriented section: nothing on triage, red-flag symptoms, or when a non-transplant clinician should phone or transfer to the transplant centre (only isolated "urgent"/"timely" phrases, Section 8.1).
2. Clinical presentation of acute cellular rejection (symptoms, liver-test pattern) is not described; the lab pattern for rejection is not given (AMR is described only as graft dysfunction, thrombocytopenia, hypocomplementemia).
3. No defined threshold for what elevation of AST/ALT/bilirubin/ALP prompts urgent action, and no stepwise approach to abnormal liver tests in a recipient; post-LT "normal ranges" not established [G P154].
4. Bile leak: timing, work-up and treatment not stated (Section 3.6). Cholangitis: no work-up, cultures or antibiotic statement.
5. Hepatic artery thrombosis presentation beyond "elevated liver enzymes, graft dysfunction, and bile leak"; no statement about the time window within which imaging must be done in a symptomatic patient; no statement on Doppler sensitivity.
6. Anticoagulation agent, dose or duration for vascular thrombosis; thrombolysis agents.
7. Doses of IVIG, plasma exchange, rituximab, bortezomib, eculizumab for AMR (not given); steroid taper only as "eg" ranges.
8. Neurotoxicity of CNIs (PRES, seizure, tremor), hyperkalaemia, hypomagnesaemia, tacrolimus toxicity thresholds or management: not stated beyond the words "neurotoxicity" and "electrolyte disorders" in Table 4.
9. How to handle a missed dose, vomiting, NPO status, or conversion of oral to IV immunosuppression in an acutely ill recipient; whether to hold or continue immunosuppression during sepsis. Only peri-elective-surgery advice exists (6.4).
10. Interaction guidance for specific emergency-use drugs beyond the Table 4 lists (e.g. nothing on NSAIDs, contrast, aminoglycosides, antibiotic choice besides macrolides/azoles listed as raising levels).
11. Fever work-up, empiric antibiotic or antifungal choices, sepsis, C. difficile, UTI, COVID-19 treatment, zoster treatment: not stated. Only prophylaxis, CMV, influenza and DDI are covered.
12. Stress-dose steroids or adrenal insufficiency in chronic steroid users: not stated.
13. PTLD acute work-up; skin-cancer features; no ED-relevant red flags beyond "fevers, night sweats, or weight loss" and "bulky lymphadenopathy".
14. Specific ED guidance for hepatic encephalopathy, ascites/SBP, variceal bleeding in the recipient (portal hypertension appears only as a sequela in Table 2).
15. Imaging contrast cautions in CKD recipients, and CKD stage at which to avoid nephrotoxins in the ED.
16. Haemodynamic or critical-care management, transfusion thresholds, and anything specific to simultaneous liver-kidney recipients beyond CKD surveillance.

## Ambiguities / internal inconsistencies

1. **File name vs date.** The graft file is named "2024" but the journal gives online 2025-08-22 and volume year 2026; MANIFEST already notes it. Content cites a refresher search of 2024-09-12 [G P33].
2. **Evidence-level wording.** Grades are "Level" (Oxford) not GRADE quality; a "Strong" recommendation can carry Level 5 (e.g. N [P148], [P162]-[P163], [P166]) so "Strong" here does not imply high-quality evidence.
3. **Late TCMR definition.** "occurring 6 months after LT, although others have defined it to occur 3–12 months" [G P144]; Table 6 (read from image) uses ">6 mo".
4. **TCMR response rate wording.** [G P144] says "60%–90%" respond to high-dose corticosteroids yet "response rates may be lower for late TCMR" with no figure.
5. **Chronic AMR initial treatment.** [G P171] "augmentation of existing immunosuppression" (Strong, Level 5); [G P179] says "increasing plasma tacrolimus levels with or without the addition of a second class" (ungraded prose); Table 6 adds "including a change from cyclosporine to tacrolimus". These are consistent in direction but differ in specificity.
6. **CDR and steroids.** Table 6 and [G P165] say "Steroids or anti-thymocyte globulin" are not effective, while [G P160] recommends "augmentation of existing immunosuppression" without defining it.
7. **Sirolimus HAT warning.** [G P118] and Table 4 (read from image) state a boxed warning for HAT with sirolimus; [G P124] reports a meta-analysis "no increased HAT incidence in the mTOR inhibitor group"; N [P212] ties the boxed warning to a trial in the very early postoperative period combined with tacrolimus. Sirolimus is labeled "off-label use" in Table 4.
8. **Everolimus timing.** Table 4 "1 mg PO bid after month 1" vs [G P129] "within 4 weeks after LT" benefit and N [P213] regimen "commencing at the fourth week after LT" (consistent roughly; not identical wording).
9. **CKD surveillance interval.** [N P188] (Strong, Level 4): every 6-12 months for stages 1-3; [N P192] quoting KDIGO: annually for stages 1-2 and every 6 months for stages 3a-3b. Not identical. Nephrology referral: "stage 4 disease" [N P195] vs "eGFR <30 mL/min" and "earlier (stage 3)" with significant urine findings [N P192].
10. **Proteinuria and CNIs.** [N P192] states proteinuria may be absent in advanced CKD, whereas Table 4 lists proteinuria as an mTORi side effect; not contradictory but easy to misread.
11. **Tacrolimus targets.** Table 4 "7–10 ng/mL for first month; 4–8 ng/mL for months 2–12; 4 ng/mL 12 mo onward" vs a trial in N [P211] with "trough levels 8–12 ng/dL" (units "ng/dL" as printed, apparently a typographical error for ng/mL). Table 4 footnote says targets "vary at the discretion of the transplant professional".
12. **Cyclosporine/tacrolimus conversion directions.** Opposite switches are suggested for different problems: tacrolimus to cyclosporine for poor glycaemic control [N P150]; cyclosporine to tacrolimus for hypertension [N P151], rejection [G P140] and lower CKD risk "(tacrolimus compared with cyclosporine reduced the risk of stages 4–5 CKD by 66%)" [N P191]; yet a recurrent PBC concern about tacrolimus [G P224]. Overall direction depends on the problem.
13. **CMV preventive duration.** N [P118] "3 months (D±/R+) or 6 months (D+/R−)" and [P125] "3 months, and 6 months for those who receive lymphocyte-depleting therapies" are not identical. Treatment: oral valganciclovir 900 mg twice daily with IV ganciclovir for "viral load ≥100,000 IU/mL" [P122] vs "Many centers favor intravenous therapy ... above 50,000–100,000 IU/mL" [P127]. N [P123] writes the refractory threshold "≤20,000 IU" and ">20,000–50,000 IU/mL" (units for the first value omitted).
14. **Letermovir statement** [N P119] ("can be substituted ... in the absence of herpes simplex and varicella zoster virus seropositivity") reads as a condition on serostatus, while [P120] requires acyclovir-class cover if seropositive; the pair is consistent but the first wording is garbled.
15. **Antifungal prophylaxis.** Risk list in [N P98] differs slightly from [N P102] (adds MELD ≥30, LDLT, Candida colonization in multiple sites as risk factors but not as part of the prophylaxis rule).
16. **Colonoscopy.** [N P134] "every 5 years" ("may consider") vs Table 3 (read from image) "Per the general population, but may consider colonoscopy every 5 y" for age ≥45; [N P135] IBD+PSC annual colonoscopy is Strong, Level 2 while Table 3 (read from image) lists IBD without PSC annual too.
17. **Pregnancy interval.** [N P85] "at least one year ... and until graft function has been stable for at least six months"; background cites best outcomes "typically within 12–24 months" and worse results "<2 years" [P87].
18. **Tables not read.** G Tables 1, 3, 5, 7-10 and N Tables 1, 4, 5 and all figures (including the infection timeline and rejection algorithm) were not read as images; anything shown only there is not captured. The Table 8 case series (AMR treatment) and Table 9 (recurrent AIH/PBC/PSC criteria) in particular may hold doses and diagnostic criteria.
19. **Paragraph indices.** `[P#]` counts run from the top of each saved page (site chrome included), so numbers are larger than the guideline's own question numbers; use text search of the quote.
