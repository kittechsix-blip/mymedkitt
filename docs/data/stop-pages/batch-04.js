export const STOP_PAGES_04 = {
    'salicylate-stop': {
        id: 'salicylate-stop',
        title: 'Salicylate Toxicity — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT intubate without immediate HD',
                body: 'Intubating a salicylate patient is extremely dangerous and frequently causes cardiac arrest. Eliminating compensatory hyperventilation crashes pH precipitously, driving more salicylate into the CNS. If intubation is unavoidable, emergent hemodialysis must happen simultaneously. [See airway warning](#/node/sal-airway-warning).',
            },
            {
                heading: '🛑 Do NOT use normal saline for fluids or drip carrier',
                body: 'Normal saline is acidifying (SID = 0) and worsens salicylate toxicity by shifting more drug into tissues. Use D5W as the bicarbonate infusion carrier and LR or Plasmalyte for resuscitation. [See alkalinization start](#/node/sal-alkalinize-start).',
            },
            {
                heading: '🛑 Do NOT give acetazolamide',
                body: 'Acetazolamide lowers serum pH AND displaces salicylate from albumin, dramatically increasing free (toxic) levels. It is absolutely contraindicated even though it theoretically alkalinizes urine. [See bicarb bolus](#/node/sal-bicarb-bolus).',
            },
            {
                heading: '🛑 Do NOT rely on serum glucose for AMS',
                body: 'Salicylate uncouples oxidative phosphorylation in CNS mitochondria, causing neuroglycopenia with NORMAL serum glucose. Give D50W empirically for any altered mental status regardless of fingerstick result. [See dextrose node](#/node/sal-dextrose).',
            },
            {
                heading: '🛑 Do NOT apply the Done nomogram to chronic toxicity',
                body: 'The Done nomogram is only valid for single acute ingestions. Chronic toxicity is more lethal at the same serum levels and is frequently misdiagnosed as sepsis, CHF, or delirium. A level of 40 mg/dL in a chronic patient can be as dangerous as >100 mg/dL acutely. [See chronic pathway](#/node/sal-chronic).',
            },
            {
                heading: '🛑 Do NOT skip repleting potassium before alkalinizing',
                body: 'Hypokalemia prevents urinary alkalinization — the kidney will reabsorb bicarbonate and exchange K+ instead of H+. Correct potassium to ≥4 mEq/L before expecting urine pH to rise. [See K+ critical node](#/node/sal-k-critical).',
            },
            {
                heading: '🛑 Do NOT discharge enteric-coated ingestions at 6 hours',
                body: 'Enteric-coated and extended-release formulations have delayed and unpredictable absorption — peak may come 12–24 hours after ingestion. Minimum 12-hour observation with serial levels is required. [See mild observe node](#/node/sal-mild-observe).',
            },
            {
                heading: '🛑 Do NOT delay nephrology consult in severe cases',
                body: 'For ingestions >500 mg/kg, altered mental status, pulmonary edema, or clinical deterioration, call nephrology early — do not wait for labs to worsen. Intubation without hemodialysis has very high mortality. [See HD indications](#/node/sal-hd-indications).',
            },
            {
                heading: '🛑 Do NOT stop monitoring after levels start falling',
                body: 'Salicylate levels can rebound after initial decline, especially with chronic toxicity or enteric-coated formulations. Continue serial levels for 2–4 hours after stopping alkalinization to confirm sustained decline. [See monitor node](#/node/sal-monitor).',
            },
        ],
        citations: [],
    },
    'sepsis-stop': {
        id: 'sepsis-stop',
        title: 'Sepsis — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT delay antibiotics waiting for cultures',
                body: 'Each hour of delay in antibiotic administration increases mortality. Draw blood cultures rapidly, but do not hold antibiotics if cultures are not immediately obtainable. [See empiric antibiotics node](#/node/sepsis-abx-empiric).',
            },
            {
                heading: '🛑 Do NOT use daptomycin for MRSA pneumonia',
                body: 'Daptomycin is inactivated by pulmonary surfactant and cannot treat pneumonia. Use vancomycin or linezolid for MRSA pneumonia. Daptomycin is reserved for bacteremia and endocarditis. [See MRSA node](#/node/sepsis-mrsa).',
            },
            {
                heading: '🛑 Do NOT continue aggressive fluids after initial resuscitation',
                body: 'After the initial 30 mL/kg bolus, restrict further crystalloid. The CLASSIC trial demonstrated that a restrictive strategy is safe; excess fluids are associated with organ dysfunction. Use dynamic measures like passive leg raise — fluid responsiveness does not mean the patient needs more fluid. [See fluid assessment](#/node/sepsis-fluid-assess).',
            },
            {
                heading: '🛑 Do NOT use dopamine as first-line vasopressor',
                body: 'Norepinephrine is the first-line vasopressor for septic shock. Dopamine is associated with more arrhythmias and higher mortality compared to norepinephrine in the SOAP II trial. [See vasopressor initiation](#/node/sepsis-vp-init).',
            },
            {
                heading: '🛑 Do NOT intubate without hemodynamic optimization',
                body: 'Peri-intubation cardiovascular collapse is common in sepsis. Push-dose phenylephrine or start a norepinephrine infusion before laryngoscopy. Optimize MAP before proceeding. [See airway node](#/node/sepsis-airway).',
            },
            {
                heading: '🛑 Do NOT skip source control',
                body: 'Undrained infectious foci will not respond to antibiotics alone. Abscesses, obstructed ducts, infected hardware, and necrotizing infections require procedural intervention within 6–12 hours when feasible. [See source control node](#/node/sepsis-source-ctrl).',
            },
            {
                heading: '🛑 Do NOT stop steroids abruptly when vasopressors are weaned',
                body: 'Hydrocortisone should be tapered over 2–3 days after vasopressors are discontinued — not stopped abruptly. Abrupt discontinuation can cause hemodynamic instability. [See steroids node](#/node/sepsis-steroids).',
            },
            {
                heading: '🛑 Do NOT miss sepsis mimics',
                body: 'Adrenal crisis, thyroid storm, toxic shock, and cardiogenic shock can all present identically to sepsis. Failure to recognize mimics leads to inappropriate treatment and worse outcomes. [See mimics node](#/node/sepsis-mimics-node).',
            },
        ],
        citations: [],
    },
    'dka-stop': {
        id: 'dka-stop',
        title: 'DKA — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT start insulin before repleting potassium',
                body: 'Insulin drives potassium intracellularly. If serum K+ is <3.5 mEq/L, starting insulin can precipitate life-threatening hypokalemia and arrhythmias. Replace potassium first and recheck before starting insulin. [See potassium check node](#/node/dka-potassium-check).',
            },
            {
                heading: '🛑 Do NOT drop glucose below 200–250 mg/dL without adding dextrose',
                body: 'Once glucose reaches 200–250 mg/dL, add D5W or D10W to IV fluids rather than stopping insulin. The goal is to close the anion gap, not normalize glucose — premature insulin discontinuation causes ketoacidosis to persist. [See glucose threshold](#/node/dka-glucose-threshold).',
            },
            {
                heading: '🛑 Do NOT give bicarbonate routinely',
                body: 'Bicarbonate administration in DKA is not beneficial and may worsen intracellular acidosis and cerebral edema. It is reserved for severe acidosis (pH <6.9) with hemodynamic instability. Insulin and fluids are the treatment. [See DKA severity assess](#/node/dka-severity-assess).',
            },
            {
                heading: '🛑 Do NOT intubate a DKA patient without careful planning',
                body: 'Like salicylate toxicity, DKA patients have compensatory hyperventilation that is critical for survival. Post-intubation hypoventilation can precipitously worsen acidosis. Match pre-intubation minute ventilation and target pH, not pCO2. [See intubation node](#/node/dka-intubation).',
            },
            {
                heading: '🛑 Do NOT miss euglycemic DKA',
                body: 'Patients on SGLT-2 inhibitors (empagliflozin, canagliflozin, dapagliflozin) can present with DKA with glucose <250 mg/dL. A normal glucose does not exclude DKA — check beta-hydroxybutyrate and blood gas. [See euglycemic DKA node](#/node/dka-euglycemic).',
            },
            {
                heading: '🛑 Do NOT use NS as the sole resuscitation fluid',
                body: 'Large-volume normal saline causes hyperchloremic non-anion gap metabolic acidosis, which complicates interpretation of DKA resolution. Transition to balanced crystalloid (LR, Plasmalyte) once hemodynamically stable, per the DROP protocol. [See NS protocol](#/node/dka-ns-protocol).',
            },
            {
                heading: '🛑 Do NOT discharge without addressing the precipitant',
                body: 'DKA is a symptom, not a diagnosis. Infection, missed insulin doses, new T1DM, and ischemia are common causes. Treat the precipitant or the patient will return. [See precipitant screen](#/node/dka-precipitant-screen).',
            },
            {
                heading: '🛑 Do NOT stop insulin when the gap closes if acidosis persists',
                body: 'DKA resolution requires ALL three: pH >7.3, HCO3 ≥15 mEq/L, AND anion gap closed. Do not stop insulin infusion based on glucose alone — assess all stopping criteria before transitioning to subcutaneous insulin. [See stopping criteria](#/node/dka-stopping-criteria).',
            },
        ],
        citations: [],
    },
    'meningitis-stop': {
        id: 'meningitis-stop',
        title: 'Meningitis/Encephalitis — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT delay antibiotics to wait for LP or CT',
                body: 'If bacterial meningitis is suspected, administer antibiotics, steroids, and blood cultures immediately — before LP and before CT. Every minute of delay increases mortality and morbidity. [See empiric timing node](#/node/mening-empiric-timing).',
            },
            {
                heading: '🛑 Do NOT skip dexamethasone in bacterial meningitis',
                body: 'Dexamethasone 0.15 mg/kg IV should be given with or just before the first antibiotic dose. It reduces mortality and neurological sequelae (especially deafness) in pneumococcal meningitis. It has no benefit if given after antibiotics. [See steroids node](#/node/mening-steroids).',
            },
            {
                heading: '🛑 Do NOT mistake AFB-positive/NAA-negative as definite TB',
                body: 'A positive AFB smear with a negative NAA most likely represents non-tuberculous mycobacteria (NTM), not TB. Do not start full RIPE therapy based on smear alone — repeat NAA and await culture. [See AFB/NAA node](#/node/mening-blood-tests).',
            },
            {
                heading: '🛑 Do NOT use routine LP positioning in increased ICP',
                body: 'Focal neurological deficits, papilledema, immunocompromise, or altered consciousness mandate CT before LP to rule out a mass lesion. LP in the presence of uncal herniation can be fatal. [See CT decision node](#/node/mening-ct-decision).',
            },
            {
                heading: '🛑 Do NOT miss HSV encephalitis',
                body: 'HSV encephalitis presents with fever, headache, and encephalopathy — but frequently with focal temporal lobe signs (personality change, aphasia, seizures). It is treatable and fatal if missed. Start acyclovir empirically whenever encephalitis is in the differential. [See encephalitis pathway](#/node/mening-encephalitis-pathway).',
            },
            {
                heading: '🛑 Do NOT discharge altered patients with normal CSF before culture results',
                body: 'Normal CSF opening pressure and cell count do not exclude early bacterial meningitis. Partially treated bacterial meningitis can have near-normal CSF. If clinical suspicion is high, admit and treat empirically pending culture results. [See equivocal node](#/node/mening-equivocal).',
            },
            {
                heading: '🛑 Do NOT treat cryptococcal meningitis with fluconazole alone',
                body: 'Cryptococcal meningitis requires induction therapy with amphotericin B plus flucytosine — fluconazole monotherapy is only for consolidation and maintenance. Using fluconazole alone for induction increases mortality. [See fungal management](#/node/mening-fungal-mgmt).',
            },
            {
                heading: '🛑 Do NOT forget contact/droplet precautions for meningococcal disease',
                body: 'N. meningitidis is transmitted via respiratory droplets. Isolate the patient immediately and initiate post-exposure prophylaxis for close contacts (ciprofloxacin or rifampin). Failure to do this can cause secondary cases. [See disposition node](#/node/mening-dispo).',
            },
        ],
        citations: [],
    },
    'opioid-withdrawal-stop': {
        id: 'opioid-withdrawal-stop',
        title: 'Opioid Withdrawal — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT start buprenorphine too early',
                body: 'Giving buprenorphine before sufficient withdrawal (COWS <8–12) precipitates severe acute withdrawal in fentanyl-dependent patients. Fentanyl is highly lipophilic with slow tissue clearance — wait for COWS ≥8 (or ≥13 for fentanyl users) or use microdosing protocol. [See buprenorphine wait node](#/node/ow-bup-wait).',
            },
            {
                heading: '🛑 Do NOT give full methadone maintenance dose to an unfamiliar patient',
                body: 'If a patient reports missing a clinic dose, give only 20 mg. Do not assume or accept the patient\'s reported home dose without clinic confirmation — full-dose methadone in an opioid-naive or underreported patient can cause fatal respiratory depression. [See methadone node](#/node/ow-methadone).',
            },
            {
                heading: '🛑 Do NOT miss concurrent alcohol or sedative-hypnotic withdrawal',
                body: 'Opioid withdrawal never causes seizures or life-threatening hyperthermia — if these occur, the patient has concurrent alcohol or benzodiazepine withdrawal, which is immediately lethal and requires urgent treatment. Treat the more dangerous condition first. [See DDx ethanol node](#/node/ow-ddx-etoh).',
            },
            {
                heading: '🛑 Do NOT discharge without a naloxone kit and overdose counseling',
                body: 'Tolerance drops rapidly during withdrawal. Patients who return to using after abstinence frequently use their prior dose — which is now supra-lethal. Prescribe naloxone and explicitly counsel on overdose risk at the time of discharge. [See discharge node](#/node/ow-discharge).',
            },
            {
                heading: '🛑 Do NOT ignore QT prolongation risk with methadone',
                body: 'Methadone causes dose-dependent QTc prolongation. Obtain an ECG before doses >40 mg or when combining with other QT-prolonging agents (ondansetron, antipsychotics, fluoroquinolones). Check electrolytes — hypokalemia and hypomagnesemia potentiate the effect. [See workup node](#/node/ow-workup).',
            },
            {
                heading: '🛑 Do NOT withhold MOUD for fear of "enabling" addiction',
                body: 'Medication for opioid use disorder (buprenorphine, methadone) saves lives. ED-initiated MOUD significantly improves treatment engagement and reduces mortality. 5.5% of patients surviving an opioid overdose die within 1 year — this is a critical intervention window. [See agonist choice node](#/node/ow-agonist-choice).',
            },
            {
                heading: '🛑 Do NOT admit naltrexone depot-precipitated withdrawal to the floor',
                body: 'Precipitated withdrawal from IM naltrexone (Vivitrol) can last days with severe hemodynamic instability. These patients require ICU-level monitoring and aggressive non-opioid management — buprenorphine has limited efficacy against long-acting naltrexone receptor blockade. [See precipitated naltrexone node](#/node/ow-precip-naltrexone).',
            },
        ],
        citations: [],
    },
    'alcohol-withdrawal-stop': {
        id: 'alcohol-withdrawal-stop',
        title: 'Alcohol Withdrawal — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT give phenobarbital to a patient with hepatic encephalopathy',
                body: 'Alcohol withdrawal and hepatic encephalopathy are opposite pathologies — withdrawal is GABA-deficient (hyperexcitable), while encephalopathy has excess GABA (obtunded). Giving phenobarbital or benzodiazepines to an encephalopathic patient risks prolonged coma. [See hepatic encephalopathy warning](#/node/aw-he-warning).',
            },
            {
                heading: '🛑 Do NOT use phenytoin for alcohol withdrawal seizures',
                body: 'Phenytoin does not treat alcohol withdrawal seizures — it blocks sodium channels but has no effect on GABA receptor dysfunction. Phenobarbital is the superior agent because it simultaneously treats the seizure AND the underlying withdrawal. [See seizure node](#/node/aw-seizure).',
            },
            {
                heading: '🛑 Do NOT add benzodiazepines on top of a large phenobarbital load',
                body: 'Phenobarbital and benzodiazepines are synergistic CNS depressants. After a loading dose of phenobarbital (15–20 mg/kg), adding benzodiazepines significantly increases the risk of respiratory depression and intubation. [See phenobarbital response node](#/node/aw-pb-success).',
            },
            {
                heading: '🛑 Do NOT escalate GABAergic medications indefinitely for NARD',
                body: 'If a patient fails to respond to >20 mg/kg cumulative phenobarbital, consider non-alcohol-related delirium (NARD). Continuing to escalate GABAergic medications for NARD causes a vicious cycle of oversedation → coma. Stop, reassess, and consider haloperidol or dexmedetomidine. [See NARD node](#/node/aw-nard).',
            },
            {
                heading: '🛑 Do NOT give glucose before thiamine',
                body: 'Thiamine is an essential cofactor for glucose metabolism. Giving IV glucose before thiamine to a thiamine-depleted alcoholic can precipitate or worsen Wernicke encephalopathy. Always give thiamine before or simultaneously with any glucose-containing solutions. [See controlled/disposition node](#/node/aw-controlled).',
            },
            {
                heading: '🛑 Do NOT discharge a patient after a first withdrawal seizure without observation',
                body: 'Up to one-third of patients with a withdrawal seizure will progress to delirium tremens if untreated. A single seizure is not a low-risk event — admit for observation, load with phenobarbital, and monitor closely for 24 hours. [See post-seizure node](#/node/aw-post-seizure).',
            },
            {
                heading: '🛑 Do NOT forget magnesium and electrolytes',
                body: 'Alcoholics are commonly severely depleted of magnesium, potassium, and phosphate. Hypomagnesemia lowers the seizure threshold and worsens autonomic instability. Aggressive electrolyte repletion is as important as GABAergic therapy. [See floor disposition node](#/node/aw-floor).',
            },
            {
                heading: '🛑 Do NOT stop phenobarbital abruptly at discharge',
                body: 'Phenobarbital has a 3–4 day half-life and provides auto-taper protection against seizure recurrence. If additional doses are needed after the initial load, plan a formal taper — abrupt discontinuation after prolonged use risks rebound seizures. [See alcohol withdrawal disposition](#/node/aw-disposition).',
            },
        ],
        citations: [],
    },
    'tuberculosis-stop': {
        id: 'tuberculosis-stop',
        title: 'Tuberculosis — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT delay airborne isolation for a coughing patient with TB risk',
                body: 'A patient with active cough and epidemiologic risk factors (immigration, incarceration, HIV, known exposure) must be placed in a negative-pressure room with N95 precautions immediately — before any workup is complete. Delay exposes staff and other patients. [See isolation node](#/node/tb-isolation).',
            },
            {
                heading: '🛑 Do NOT treat based on CXR findings alone',
                body: 'Classic upper-lobe cavitary changes are suggestive but not diagnostic of TB. Many conditions mimic the appearance. Microbiologic confirmation is mandatory. Immunocompromised patients frequently have atypical or even normal chest X-rays. [See CXR node](#/node/tb-cxr).',
            },
            {
                heading: '🛑 Do NOT add a single drug to a failing regimen',
                body: 'If cultures remain positive at 4 months, adding one drug to an existing regimen is the fastest way to create additional resistance. Perform expanded susceptibility testing and consult a TB specialist before modifying the regimen. [See positive 2-month node](#/node/tb-positive-2mo).',
            },
            {
                heading: '🛑 Do NOT use rifampin for latent TB in HIV patients on protease inhibitors',
                body: 'Rifampin is a potent CYP3A4 inducer that dramatically reduces levels of most HIV protease inhibitors and some NNRTIs. Use isoniazid 9H or consult HIV/ID for an appropriate regimen. [See latent regimen node](#/node/tb-latent-regimen).',
            },
            {
                heading: '🛑 Do NOT start RIPE therapy without baseline LFTs',
                body: 'Isoniazid, rifampin, and pyrazinamide are all hepatotoxic. Baseline liver function tests are mandatory before starting treatment — many patients have underlying liver disease (hepatitis, alcohol use, HIV) that requires monitoring or regimen modification. [See confirmed TB node](#/node/tb-confirmed).',
            },
            {
                heading: '🛑 Do NOT ignore a positive NAA in a patient at risk',
                body: 'A positive NAA test in an at-risk patient with no prior TB treatment is considered sufficient for presumptive diagnosis. Do not wait for culture results (which take 2–6 weeks) to start treatment if the clinical picture is consistent. [See AFB/NAA result](#/node/tb-afb-naa-result).',
            },
            {
                heading: '🛑 Do NOT skip pyridoxine with isoniazid',
                body: 'Isoniazid causes peripheral neuropathy by depleting pyridoxine (vitamin B6). All patients on INH-containing regimens should receive pyridoxine 25–50 mg daily, especially those with diabetes, malnutrition, HIV, or alcohol use disorder. [See RIPE therapy node](#/node/tb-ripe).',
            },
            {
                heading: '🛑 Do NOT forget to report active TB to public health',
                body: 'TB is a reportable disease in all US states. Public health notification is legally required and clinically essential — it triggers contact investigation, directly observed therapy coordination, and outbreak management. [See confirmed TB node](#/node/tb-confirmed).',
            },
        ],
        citations: [],
    },
    'hemophilia-stop': {
        id: 'hemophilia-stop',
        title: 'Hemophilia — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT delay factor replacement to wait for imaging in head trauma',
                body: 'In a patient with hemophilia and head trauma, give factor to 100% IMMEDIATELY — before CT. Factor within 6 hours reduces ICH risk and mortality. 44% of hemophilia patients with ICH have no abnormalities on physical exam, and minor trauma can be the cause. [See ICH node](#/node/hemo-ich).',
            },
            {
                heading: '🛑 Do NOT perform arthrocentesis on a hemarthrotic joint',
                body: 'Joint aspiration in a patient with hemophilia is not recommended and can worsen bleeding or introduce infection. Treat with factor replacement, immobilization, and ice. [See hemarthrosis node](#/node/hemo-hemarthrosis).',
            },
            {
                heading: '🛑 Do NOT give antifibrinolytics with hematuria',
                body: 'Aminocaproic acid and tranexamic acid are absolutely contraindicated when hematuria is present. They can cause clot formation in the renal collecting system, leading to obstructive uropathy and renal failure. Always check a urinalysis first. [See hematuria node](#/node/hemo-hematuria).',
            },
            {
                heading: '🛑 Do NOT exceed 200 units/kg/day of FEIBA',
                body: 'FEIBA (activated prothrombin complex concentrate) used in patients with inhibitors carries significant thrombotic risk. The maximum daily dose is 200 units/kg. Exceeding this increases the risk of DIC, arterial thrombosis, and PE. [See high inhibitor node](#/node/hemo-high-inhibitor).',
            },
            {
                heading: '🛑 Do NOT use desmopressin for hemophilia B',
                body: 'DDAVP raises factor VIII levels by releasing von Willebrand factor from endothelial stores — it has virtually no effect on factor IX. Using desmopressin for hemophilia B instead of factor IX concentrate provides no hemostatic benefit. [See mild hemophilia A node](#/node/hemo-mild-a).',
            },
            {
                heading: '🛑 Do NOT use the low-concentration DDAVP nasal spray',
                body: 'The nasal spray used for diabetes insipidus and enuresis is 10 mcg/spray — far too low for hemophilia. Use the HIGH-CONCENTRATION spray (Stimate, 150 mcg/spray). Using the wrong concentration provides inadequate factor VIII release. [See mild hemophilia A node](#/node/hemo-mild-a).',
            },
            {
                heading: '🛑 Do NOT give NSAIDs for pain in hemophilia',
                body: 'NSAIDs inhibit platelet function and further impair hemostasis in patients who already have a clotting factor deficiency. Use acetaminophen for analgesia. COX-2 inhibitors are acceptable if NSAIDs are truly necessary. [See hemarthrosis node](#/node/hemo-hemarthrosis).',
            },
            {
                heading: '🛑 Do NOT discharge without hematology contact established',
                body: 'Safe discharge after a bleeding event requires a clear hematologist contact — not just a follow-up appointment. Families need direct access to expert guidance for evolving or recurrent bleeding between ED visits. [See discharge node](#/node/hemo-discharge).',
            },
        ],
        citations: [],
    },
    'anticoag-reversal-stop': {
        id: 'anticoag-reversal-stop',
        title: 'Anticoagulant Reversal — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT give PCC or FFP for warfarin without also giving Vitamin K',
                body: 'PCC and FFP provide immediate clotting factors but wear off in 6–8 hours. Without Vitamin K, the INR will rebound. For emergent warfarin reversal, always administer both a factor source AND Vitamin K simultaneously. [See warfarin critical node](#/node/acr-warfarin-critical).',
            },
            {
                heading: '🛑 Do NOT give Vitamin K subcutaneously or intramuscularly',
                body: 'Subcutaneous Vitamin K has erratic, unpredictable absorption. IM injection risks hematoma in anticoagulated patients. Use the IV route for emergent reversal to ensure reliable effect within 6–12 hours. [See pitfalls node](#/node/acr-pitfalls).',
            },
            {
                heading: '🛑 Do NOT attempt to push INR below 1.7 with FFP alone',
                body: 'FFP contains clotting factors at normal plasma concentration — it is incapable of achieving INR <1.7 regardless of volume given. Attempting this causes dangerous volume overload and TRALI. Use 4-factor PCC for rapid reversal. [See pitfalls node](#/node/acr-pitfalls).',
            },
            {
                heading: '🛑 Do NOT assume a normal INR means a DOAC patient is safe',
                body: 'Direct oral anticoagulants (apixaban, rivaroxaban, dabigatran) do not reliably affect standard coagulation tests. A normal PT/INR in a patient on a DOAC does not exclude significant anticoagulation — drug-specific assays or empiric reversal may be needed. [See DOAC supratherapeutic node](#/node/acr-doac-supra).',
            },
            {
                heading: '🛑 Do NOT over-reverse anticoagulation in patients with mechanical heart valves',
                body: 'Mechanical mitral valves carry extremely high thrombotic risk. Aggressive reversal and prolonged anticoagulation interruption can result in valve thrombosis and stroke. Minimize interruption time and involve cardiology. [See monitoring node](#/node/acr-monitoring).',
            },
            {
                heading: '🛑 Do NOT use platelet transfusion as first-line for antiplatelet reversal',
                body: 'The PATCH trial showed platelet transfusion for antiplatelet-associated ICH is harmful — not beneficial. DDAVP is the first-line agent for antiplatelet reversal by restoring platelet function. [See antiplatelet node](#/node/acr-antiplatelet).',
            },
            {
                heading: '🛑 Do NOT forget that renal failure silently supratherapeutifies DOACs',
                body: 'Dabigatran is 80% renally cleared — in a patient with acute kidney injury or new renal failure, the drug half-life doubles. Rising creatinine in a DOAC patient = rising drug levels with no INR to alert you. [See DOAC supratherapeutic node](#/node/acr-doac-supra).',
            },
            {
                heading: '🛑 Do NOT forget to restart anticoagulation after bleeding is controlled',
                body: 'The indication for anticoagulation does not disappear after a bleeding event. Failure to restart appropriate anticoagulation after the bleeding is controlled carries its own mortality risk (stroke, PE, valve thrombosis). Involve the appropriate specialty for timing. [See resume node](#/node/acr-resume).',
            },
        ],
        citations: [],
    },
    'combative-patient-stop': {
        id: 'combative-patient-stop',
        title: 'Combative Patient — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT place a patient in prone restraint',
                body: 'Prone restraint (face-down) causes positional asphyxia and has resulted in deaths. Always place restrained patients supine with head of bed elevated. Never hogtie, stack mattresses, or apply pressure to the chest or back. [See restraint application](#/node/comb-restraint-apply).',
            },
            {
                heading: '🛑 Do NOT combine IM olanzapine with parenteral benzodiazepines',
                body: 'IM olanzapine combined with IV or IM benzodiazepines causes synergistic respiratory depression and excess sedation. Wait at least 60 minutes between these agents. For patients who may need both, use IV lorazepam separately from IM olanzapine. [See mild psychiatric node](#/node/comb-mild-psych).',
            },
            {
                heading: '🛑 Do NOT use antipsychotics alone for alcohol or sedative withdrawal',
                body: 'Antipsychotics do not treat GABA receptor dysfunction and lower the seizure threshold. For alcohol or benzodiazepine withdrawal, benzodiazepines (or phenobarbital) are mandatory. Antipsychotics as monotherapy are dangerous in this setting. [See severe withdrawal node](#/node/comb-severe-withdrawal).',
            },
            {
                heading: '🛑 Do NOT give antipsychotics for anticholinergic delirium',
                body: 'Antipsychotics have anticholinergic properties and will worsen anticholinergic toxidrome. Use benzodiazepines for sedation and consider physostigmine for reversal. Check QRS before physostigmine — it is contraindicated if QRS >120 ms (TCA co-ingestion). [See anticholinergic node](#/node/comb-mild-anticholinergic).',
            },
            {
                heading: '🛑 Do NOT leave a restrained patient unmonitored',
                body: 'Physical restraints require continuous monitoring for respiratory status, circulation to restrained limbs, and positioning. A restrained patient who becomes quiet may be hypoxic, not calm. Vital signs, pulse oximetry, and visual checks are mandatory. [See restraint monitoring](#/node/comb-restraint-monitoring).',
            },
            {
                heading: '🛑 Do NOT miss an organic cause for agitation',
                body: 'Hypoglycemia, hypoxia, intracranial hemorrhage, sepsis, and thyroid storm can all present as agitation. If a patient fails to respond to appropriate sedation, consider undiscovered medical causes before escalating chemical restraint. [See evaluation workup](#/node/comb-eval-workup).',
            },
            {
                heading: '🛑 Do NOT half-dose all agents in elderly patients without checking context',
                body: 'While elderly patients generally require lower doses, avoid benzodiazepines specifically (paradoxical agitation, fall risk, respiratory depression). Haloperidol at 0.5–2 mg IM is preferred. All antipsychotics carry an FDA black box warning for increased mortality in elderly patients with dementia-related psychosis. [See elderly node](#/node/comb-elderly).',
            },
        ],
        citations: [],
    },
    'chf-exacerbation-stop': {
        id: 'chf-exacerbation-stop',
        title: 'CHF Exacerbation — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT give morphine for dyspnea in ADHF',
                body: 'The MIMO trial was stopped early due to harm — morphine in acute decompensated heart failure is associated with increased rates of cardiac arrest, mechanical ventilation, and ICU admission. Use nitroglycerin and BiPAP instead. [See SCAPE avoidance node](#/node/chf-scape-avoid).',
            },
            {
                heading: '🛑 Do NOT give beta-blockers in SCAPE',
                body: 'Severely ill hypertensive acute pulmonary edema (SCAPE) patients are in a catecholamine-driven state with severely compromised pump function. Beta-blockers worsen cardiac output and are absolutely contraindicated in acute decompensation. [See SCAPE avoidance node](#/node/chf-scape-avoid).',
            },
            {
                heading: '🛑 Do NOT give diuretics to a cold/dry (cardiogenic shock) patient',
                body: 'The cold-dry hemodynamic profile indicates poor perfusion WITHOUT congestion — the patient is effectively hypovolemic from low cardiac output. Diuretics will worsen perfusion. Use cautious fluids and inotropes. [See cold-dry node](#/node/chf-cold-dry).',
            },
            {
                heading: '🛑 Do NOT intubate a SCAPE patient prematurely',
                body: 'SCAPE patients often respond dramatically to high-dose nitroglycerin and BiPAP within minutes. Intubation should be a last resort — the peri-intubation period is extremely high risk for cardiovascular collapse in these patients. Buy time with BiPAP first. [See SCAPE treatment](#/node/chf-scape-treatment).',
            },
            {
                heading: '🛑 Do NOT give daptomycin for concurrent MRSA pneumonia',
                body: 'If a CHF patient has concurrent MRSA pneumonia, daptomycin is inactivated by pulmonary surfactant and will not treat the pulmonary infection. Use vancomycin or linezolid for MRSA pneumonia specifically.',
            },
            {
                heading: '🛑 Do NOT continue aggressive diuresis in worsening AKI',
                body: 'Cardiorenal syndrome requires careful balance — aggressive diuresis can worsen renal perfusion. In stage 2–3 AKI, stop or hold diuretics if anuric, optimize hemodynamics, and consider ultrafiltration if refractory. [See renal assessment](#/node/chf-renal-assessment).',
            },
            {
                heading: '🛑 Do NOT use milrinone in patients with active ischemia',
                body: 'Milrinone increases myocardial oxygen demand and has been associated with increased mortality in patients with ischemic cardiomyopathy in the OPTIME-CHF trial. Dobutamine is preferred for inotropic support in most acute settings. [See milrinone node](#/node/chf-milrinone).',
            },
            {
                heading: '🛑 Do NOT discharge without cardiology follow-up within 7 days',
                body: '30-day readmission rate in ADHF is 20–25%. Early follow-up (within 7 days) and optimization of guideline-directed medical therapy (GDMT) are essential to prevent readmission. Confirm the appointment before discharge. [See disposition node](#/node/chf-disposition).',
            },
        ],
        citations: [],
    },
    'migraine-stop': {
        id: 'migraine-stop',
        title: 'Migraine — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT give opioids for migraine',
                body: 'Opioids are Level A against for migraine — hydromorphone is no more effective than prochlorperazine in RCTs and dramatically increases the risk of medication overuse headache (rebound). Opioids worsen long-term outcomes. Dopamine-blocking antiemetics are far more effective. [See rescue options](#/node/migraine-rescue).',
            },
            {
                heading: '🛑 Do NOT give triptans to patients with hemiplegic or basilar migraine',
                body: 'Triptans are absolutely contraindicated in hemiplegic migraine and basilar-type migraine due to risk of ischemic stroke. Use non-vasoactive therapies (IV ketorolac, prochlorperazine, nerve blocks) instead. [See triptan rescue node](#/node/migraine-triptan-rescue).',
            },
            {
                heading: '🛑 Do NOT miss thunderclap headache',
                body: 'Sudden-onset, maximum-intensity "worst headache of my life" is subarachnoid hemorrhage until proven otherwise. CT head is the first step; if negative within 6 hours, LP for xanthochromia. Do not diagnose migraine without ruling out SAH. [See red flags node](#/node/migraine-red-flags).',
            },
            {
                heading: '🛑 Do NOT give valproate to a pregnant patient',
                body: 'Valproate is teratogenic (neural tube defects, fetal valproate syndrome) and is contraindicated in pregnancy. For IV rescue in a pregnant migraineur, use magnesium sulfate, metoclopramide, or diphenhydramine. [See valproate node](#/node/migraine-valproate).',
            },
            {
                heading: '🛑 Do NOT skip dexamethasone at discharge',
                body: 'Dexamethasone 10 mg IV before discharge reduces 48–72 hour migraine recurrence with an NNT of 9. It is one of the most evidence-supported discharge interventions for migraine and is frequently omitted. [See disposition node](#/node/migraine-disposition).',
            },
            {
                heading: '🛑 Do NOT treat with triptans for age >50 first-ever headache without workup',
                body: 'A new headache in a patient >50 years old requires evaluation to exclude giant cell arteritis (ESR, CRP), intracranial mass, and cerebrovascular disease before assuming primary migraine. [See secondary workup node](#/node/migraine-secondary-workup).',
            },
            {
                heading: '🛑 Do NOT give triptans within 14 days of MAO inhibitors',
                body: 'Concurrent use of triptans with MAO inhibitors risks serotonin syndrome, a potentially life-threatening drug interaction. Verify medication history before prescribing triptans. [See mild treatment node](#/node/migraine-mild-treatment).',
            },
        ],
        citations: [],
    },
    'snake-envenomation-stop': {
        id: 'snake-envenomation-stop',
        title: 'Snake Envenomation — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT apply ice, tourniquet, or incise and suction',
                body: 'These traditional first-aid measures are harmful. Ice causes tissue ischemia, tourniquets concentrate venom and cause compartment syndrome, and incision/suction does not remove significant venom and causes additional tissue damage. Remove jewelry, immobilize, and transport. [See assessment node](#/node/snake-pit-viper-assess).',
            },
            {
                heading: '🛑 Do NOT give NSAIDs for pain in snake envenomation',
                body: 'Pit viper venom commonly causes coagulopathy. NSAIDs impair platelet function and worsen bleeding risk. Use acetaminophen and opioids for analgesia. Avoid any antiplatelet or anticoagulant medications. [See assessment node](#/node/snake-pit-viper-assess).',
            },
            {
                heading: '🛑 Do NOT wait for coral snake symptoms before treating',
                body: 'Coral snake neurotoxins are presynaptic — once neurotoxicity (respiratory paralysis) is established, it may be irreversible and cannot be reversed by antivenom. Treat all confirmed coral snake bites with antivenom prophylactically and admit to ICU for minimum 24 hours. [See coral snake start](#/node/snake-coral-start).',
            },
            {
                heading: '🛑 Do NOT dose antivenom by weight in children',
                body: 'Antivenom dosing is based on the amount of venom injected — not the patient\'s weight. Pediatric patients receive the same antivenom dose as adults. Smaller body mass means more severe effects per dose of venom, not less antivenom needed. [See pediatrics node](#/node/snake-peds).',
            },
            {
                heading: '🛑 Do NOT withhold antivenom in pregnancy',
                body: 'Untreated envenomation poses far greater risk to the fetus (coagulopathy, placental abruption) than antivenom. Do not withhold antivenom — maternal health takes priority and standard dosing applies. Obtain OB consultation and continuous fetal monitoring. [See pregnancy node](#/node/snake-pregnancy).',
            },
            {
                heading: '🛑 Do NOT shake antivenom vials during reconstitution',
                body: 'CroFab must be reconstituted by gentle manual inversion (1–2/second continuously) for up to 7 minutes. Shaking causes foaming and protein denaturation, rendering the antivenom ineffective. [See CroFab dosing node](#/node/snake-crofab).',
            },
            {
                heading: '🛑 Do NOT delay intubation for head or neck bites',
                body: 'Oropharyngeal and facial envenomation can cause rapid progressive edema, making later intubation impossible. Prepare for a difficult airway and intubate early at the first sign of airway compromise — waiting for stridor or respiratory distress is too late. [See airway node](#/node/snake-airway).',
            },
            {
                heading: '🛑 Do NOT discharge after antivenom without recurrence monitoring',
                body: 'Late coagulopathy (recurrence phenomenon) peaks on days 2–7 after CroFab, which has a shorter half-life than venom components. All patients who received antivenom for rattlesnake bites need follow-up labs on days 2–3 and 5–7 after discharge. [See recurrence counseling node](#/node/snake-recurrence-counseling).',
            },
        ],
        citations: [],
    },
    'aacg-stop': {
        id: 'aacg-stop',
        title: 'Acute Angle Closure Glaucoma — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT give pilocarpine when IOP is still very high',
                body: 'The iris sphincter muscle is ischemic when IOP is extremely elevated (>40–50 mmHg). Pilocarpine will not work and wastes critical time. First lower IOP with aqueous suppressants and osmotic agents — give pilocarpine only after IOP has dropped to <40 mmHg. [See pilocarpine node](#/node/aacg-pilocarpine).',
            },
            {
                heading: '🛑 Do NOT give anticholinergics, antihistamines, or sympathomimetics',
                body: 'These agents cause mydriasis, which worsens angle closure by pushing the iris further into the trabecular meshwork. Common culprits include diphenhydramine, promethazine, atropine, pseudoephedrine, and nebulized ipratropium. Review all medications. [See medications list node](#/node/aacg-meds-list).',
            },
            {
                heading: '🛑 Do NOT forget to treat the fellow eye with pilocarpine',
                body: 'The fellow (unaffected) eye has a 40–80% risk of developing AACG within 5–10 years. Give prophylactic pilocarpine 2% one drop to the fellow eye. Ophthalmology will eventually recommend laser iridotomy for both eyes. [See bilateral node](#/node/aacg-bilateral).',
            },
            {
                heading: '🛑 Do NOT give mannitol in heart failure or severe renal failure',
                body: 'Mannitol expands intravascular volume before its osmotic effect draws fluid out of the eye. In patients with heart failure or severely impaired renal function, this volume expansion can cause acute decompensation. Use oral glycerol or isosorbide as alternatives. [See osmotic therapy node](#/node/aacg-osmotic).',
            },
            {
                heading: '🛑 Do NOT diagnose migraine or tension headache without measuring IOP',
                body: 'AACG classically presents with severe headache, nausea and vomiting, and blurred vision — an extremely common migraine mimicry. A tonometry reading takes 30 seconds and can distinguish these entities. IOP >21 mmHg mandates ophthalmology consultation. [See differential node](#/node/aacg-differential).',
            },
            {
                heading: '🛑 Do NOT discharge without confirmed ophthalmology follow-up',
                body: 'Even if IOP is controlled in the ED, AACG is a surgical disease — patients require laser iridotomy to prevent recurrence. Discharge without confirmed next-day ophthalmology follow-up is unsafe. [See discharge node](#/node/aacg-dispo-discharge).',
            },
            {
                heading: '🛑 Do NOT omit acetazolamide in sulfa allergy without confirming true cross-reactivity',
                body: 'Cross-reactivity between acetazolamide (a sulfonamide carbonic anhydrase inhibitor) and sulfa antibiotics is rare. A "sulfa allergy" from TMP-SMX typically does not predict acetazolamide reactions. In life-threatening AACG, the benefit usually outweighs the risk — but document your clinical reasoning. [See reduce production node](#/node/aacg-reduce-production).',
            },
        ],
        citations: [],
    },
    'chemical-burn-stop': {
        id: 'chemical-burn-stop',
        title: 'Chemical Burn (Ocular) — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT delay irrigation for any reason',
                body: 'Irrigation must begin immediately — before visual acuity, before history, before slit lamp exam, before pH testing, before ophthalmology consult. Every second of delay allows continued chemical penetration. This is the single most important intervention. [See immediate node](#/node/chemburn-immediate).',
            },
            {
                heading: '🛑 Do NOT skip fornix sweep for alkali (cement/lime) exposures',
                body: 'Particulate alkali (cement, lime, plaster) continues releasing hydroxide ions until physically removed. Irrigation alone is insufficient — double-evert the upper lid and sweep the fornices with a moist cotton swab. Particles migrate during irrigation, so recheck every 15–30 minutes. [See fornix sweep node](#/node/chemburn-sweep).',
            },
            {
                heading: '🛑 Do NOT check pH immediately after stopping irrigation',
                body: 'A reservoir effect can cause pH to rebound after stopping irrigation. Always wait 5–10 minutes after stopping flow, then recheck pH. If pH rises on recheck, resume irrigation — chemical is still present. Only a stable pH on two readings confirms adequate decontamination. [See pH decision node](#/node/chemburn-ph-decision).',
            },
            {
                heading: '🛑 Do NOT continue steroids beyond day 10–14',
                body: 'Steroids are beneficial in the first 10 days (reduce inflammation, limit scarring) but inhibit collagen synthesis after day 10–14, dramatically increasing the risk of corneal perforation. Begin rapid taper by day 10 and switch to medroxyprogesterone if continued anti-inflammatory therapy is needed. [See steroid caution node](#/node/chemburn-steroid-caution).',
            },
            {
                heading: '🛑 Do NOT irrigate a patient with suspected globe rupture',
                body: 'Globe rupture from chemical injury is rare but can occur with high-pressure exposures. If the globe is suspected to be ruptured (extremely soft eye, uveal prolapse, irregular pupil), apply a rigid eye shield and consult ophthalmology immediately without irrigation. [See immediate node](#/node/chemburn-immediate).',
            },
            {
                heading: '🛑 Do NOT discharge a Grade III–IV injury from the ED',
                body: 'Severe chemical burns (significant limbal ischemia, opacified cornea) require inpatient ophthalmology management with hourly medications, daily monitoring, and possible surgical intervention. These patients cannot safely manage a q1h medication regimen at home. [See severe treatment node](#/node/chemburn-treatment-severe).',
            },
            {
                heading: '🛑 Do NOT assess pH by touching the pH strip to the cornea',
                body: 'Place the litmus paper in the inferior fornix, not on the corneal surface. Corneal contact can cause additional epithelial damage, especially when the surface is already compromised. Use narrow-range pH paper (5.0–8.0) for accurate readings. [See pH check node](#/node/chemburn-ph-check).',
            },
            {
                heading: '🛑 Do NOT miss systemic toxicity from large-area skin exposure',
                body: 'Chemical burns confined to the eye are treated locally, but large-area skin exposures (hydrofluoric acid, phenol, strong acids) can cause systemic absorption with metabolic acidosis, hypocalcemia (HF acid), dysrhythmias, and hemodynamic collapse. Assess for systemic toxicity in all large-surface exposures. [See classification node](#/node/chemburn-classification).',
            },
        ],
        citations: [],
    },
};
