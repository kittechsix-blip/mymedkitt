// MedKitt — Info Page Data (Hardcoded Fallback)
// Static info page definitions used as tier-3 fallback when Supabase and IndexedDB are unavailable.
// Rendering logic lives in components/info-page.ts.
// -------------------------------------------------------------------
// DOAC for PE
// -------------------------------------------------------------------
const DOAC_PE_PAGE = {
    id: 'doac-pe',
    title: 'Oral Anticoagulation for PE',
    subtitle: 'Direct Oral Anticoagulants (DOACs)',
    sections: [
        {
            body: 'Direct oral anticoagulants (DOACs)\u2014specifically apixaban, rivaroxaban, edoxaban, and dabigatran\u2014are the preferred oral anticoagulants for low-risk pulmonary embolism due to their noninferior efficacy compared to warfarin, lower major bleeding risk, and simplified administration without need for monitoring. [1\u20134]',
        },
        {
            heading: 'Advantages Over Warfarin',
            body: 'Meta-analyses demonstrate that DOACs are associated with a 39% relative reduction in major bleeding compared to vitamin K antagonists while maintaining similar efficacy for preventing recurrent VTE. [3]\n\nIn low-risk PE patients specifically, DOACs showed absolute differences in symptomatic VTE recurrence ranging from \u22120.4% to 0.3% compared to conventional therapy, with reduced bleeding risk (absolute risk difference \u22120.6%). [2]',
        },
        {
            heading: 'Dosing Regimens',
            body: '',
            drugTable: [
                {
                    drug: 'Apixaban',
                    regimen: '10 mg twice daily \u00D7 7 days, then 5 mg twice daily \u00D7 3\u20136 months. Extended therapy: 5 mg or 2.5 mg twice daily. [4]',
                },
                {
                    drug: 'Rivaroxaban',
                    regimen: '15 mg twice daily \u00D7 21 days, then 20 mg once daily \u00D7 3\u20136 months. Extended therapy: 20 mg or 10 mg once daily. [4]',
                },
                {
                    drug: 'Edoxaban',
                    regimen: 'Requires 5\u201310 days parenteral anticoagulation (LMWH) first, then 60 mg once daily (30 mg if CrCl 15\u201350 mL/min, weight <60 kg, or on P-glycoprotein inhibitors). [4]',
                },
                {
                    drug: 'Dabigatran',
                    regimen: 'Requires 5\u201310 days parenteral anticoagulation first, then 150 mg twice daily. [4]',
                },
            ],
        },
        {
            heading: 'Clinical Considerations',
            body: 'Apixaban and rivaroxaban offer the advantage of single-drug oral therapy without requiring initial heparin, making them particularly convenient for outpatient management of low-risk PE. [3][5]\n\nThe choice among DOACs is guided by pharmacologic properties, patient characteristics (particularly renal function), concomitant medications, and patient preference for once versus twice-daily dosing. [3\u20134]',
        },
    ],
    citations: [
        { num: 1, text: 'Tritschler T, Kraaijpoel N, Le Gal G, Wells PS. Venous Thromboembolism: Advances in Diagnosis and Treatment. JAMA. 2018.' },
        { num: 2, text: 'Freund Y, Cohen-Aubart F, Bloom B. Acute Pulmonary Embolism: A Review. JAMA. 2022.' },
        { num: 3, text: 'Di Nisio M, van Es N, B\u00FCller HR. Deep Vein Thrombosis and Pulmonary Embolism. Lancet. 2016.' },
        { num: 4, text: 'Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022.' },
        { num: 5, text: 'Renner E, Barnes GD. Antithrombotic Management of Venous Thromboembolism: JACC Focus Seminar. J Am Coll Cardiol. 2020.' },
    ],
};
// -------------------------------------------------------------------
// Priapism Return Precautions
// -------------------------------------------------------------------
const PRIAPISM_RETURN_PRECAUTIONS = {
    id: 'priapism-return-precautions',
    title: 'Return Precautions',
    subtitle: 'Patient Discharge Instructions \u2014 Priapism',
    shareable: true,
    sections: [
        {
            body: 'You were treated today for priapism (a prolonged erection). Please return to the emergency department immediately if you experience any of the following:',
        },
        {
            heading: 'Return Immediately If:',
            body: '\u2022 Your erection returns and lasts more than 4 hours\n\u2022 You develop severe pain in your penis\n\u2022 You notice increasing swelling, redness, or warmth of the penis\n\u2022 You develop fever (temperature over 100.4\u00B0F or 38\u00B0C)\n\u2022 You have difficulty urinating or cannot urinate\n\u2022 You notice any discharge from the penis',
        },
        {
            heading: 'Important Information',
            body: '\u2022 Even after successful treatment, priapism can recur. This is especially true if you have sickle cell disease or take certain medications.\n\u2022 Time is critical \u2014 if an erection lasts more than 4 hours, seek emergency care right away. Delays in treatment can lead to permanent erectile dysfunction.\n\u2022 Continue taking any medications prescribed by your doctor as directed.\n\u2022 Follow up with urology as instructed.',
        },
        {
            heading: 'Questions?',
            body: 'If you have concerns about your recovery or symptoms that are not emergencies, contact your primary care doctor or the urology clinic during business hours.',
        },
    ],
    citations: [
        { num: 1, text: 'Bivalacqua TJ, Allen BK, Brock G, et al. Acute Ischemic Priapism: An AUA/SMSNA Guideline. J Urol. 2021;206(5):1114-1121.' },
        { num: 2, text: 'Salonia A, Eardley I, Giuliano F, et al. European Association of Urology Guidelines on Priapism. Eur Urol. 2014;65(2):480-9.' },
    ],
};
// -------------------------------------------------------------------
// Synchronized Cardioversion for A-Fib
// -------------------------------------------------------------------
const CARDIOVERSION_AFIB_PAGE = {
    id: 'cardioversion-afib',
    title: 'Synchronized Cardioversion',
    subtitle: 'Procedure for Atrial Fibrillation / Flutter',
    sections: [
        {
            body: 'Synchronized cardioversion is the definitive treatment for hemodynamically unstable A-Fib/Flutter and for WPW with atrial fibrillation. Success depends on energy selection, pad placement, synchronization, and pre/post-treatment with antiarrhythmics.',
        },
        {
            heading: '1. Preparation',
            body: '\u2022 Confirm synchronization is enabled on the defibrillator\n\u2022 Apply pads: anterior/lateral placement preferred (EPIC trial found superior to anterior/posterior) [1]\n\u2022 Hyperinflation may impair conduction \u2014 cardiovert at end-expiration if possible\n\u2022 If ventilated and cardioversion failing, briefly disconnect to promote chest deflation (if oxygenation allows)',
        },
        {
            heading: '2. Sedation (Non-Intubated Patients)',
            body: '\u2022 Midazolam 3\u20135 mg IV bolus, then 2 mg IV q2min PRN to adequate sedation\n\u2022 Target: eyes closed, no response to gentle stimuli, sluggish response to loud commands\n\u2022 Alternative: MidaKet for patients resistant to midazolam\n\u2022 Flumazenil 0.5\u20131 mg IV available for reversal if adverse effects (hypoxemia, excessive somnolence, laryngospasm)',
        },
        {
            heading: '3. Energy & Synchronization',
            body: '\u2022 Use 200J biphasic (maximal energy available) [2]\n\u2022 Rationale: No evidence that a single high-energy shock is more dangerous than low-energy. Higher initial energy reduces need for repeat cardioversion \u2014 critical in non-intubated patients where sedation may wear off.\n\u2022 Ensure shock delivery is synchronized to the QRS complex\n\u2022 If initial attempt unsuccessful, escalate energy and reconfirm pad contact',
        },
        {
            heading: '4. Post-Cardioversion',
            body: '\u2022 Amiodarone 150 mg IV over 10 min, then 1 mg/min infusion to maintain sinus rhythm\n\u2022 IV Magnesium Sulfate 2\u20134 g to augment cardioversion success\n\u2022 Continue amiodarone until critical illness significantly improved \u2014 stopping early risks reversion to A-Fib (42% reversion rate in one study) [3]\n\u2022 Monitor for post-cardioversion bradycardia (especially if baseline HR was <100)',
        },
        {
            heading: 'Special Considerations',
            body: '\u2022 WPW + A-Fib: Cardioversion is first-line. Do NOT use AV nodal blockers (beta-blockers, CCBs, digoxin, IV amiodarone) [1][2]\n\u2022 Critically ill patients: Standalone DC cardioversion often fails \u2014 patients frequently revert to A-Fib. Pre/post-treatment with amiodarone + magnesium improves sustained conversion [3]\n\u2022 Anticoagulation: If AF duration >48 hours and not anticoagulated, consider TEE to exclude atrial thrombus before elective cardioversion',
        },
    ],
    citations: [
        { num: 1, text: 'Wigginton JG, et al. Part 9: Adult Advanced Life Support: 2025 AHA Guidelines for CPR and ECC. Circulation. 2025;152(16_suppl_2):S538-S577.' },
        { num: 2, text: 'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 AHA Guidelines for CPR and ECC. Circulation. 2020;142(16_suppl_2):S366-S468.' },
        { num: 3, text: 'Bosch NA, Cimini J, Walkey AJ. Atrial Fibrillation in the ICU. Chest. 2018;154(6):1424-1434.' },
    ],
};
// -------------------------------------------------------------------
// A-Fib RVR Discharge Instructions
// -------------------------------------------------------------------
const AFIB_DISCHARGE_PAGE = {
    id: 'afib-discharge',
    title: 'Discharge Instructions',
    shareable: true,
    subtitle: 'Atrial Fibrillation with Rapid Ventricular Response',
    sections: [
        {
            heading: 'Return to the ED Immediately If You Experience',
            body: '**Serious Warning Signs:**\n\u2022 Chest pain or pressure\n\u2022 Severe shortness of breath or difficulty breathing\n\u2022 Fainting or loss of consciousness\n\u2022 Severe dizziness or lightheadedness\n\u2022 Confusion or difficulty speaking\n\u2022 Weakness or numbness on one side of your body (signs of stroke)\n\u2022 Heart rate that feels extremely fast or irregular and does not improve with rest\n\u2022 Coughing up blood\n\u2022 Severe bleeding (especially if you are taking blood thinners)\n\n**Other Concerning Symptoms:**\n\u2022 Palpitations (racing or fluttering heartbeat) that are much worse than usual or do not go away\n\u2022 Swelling in your legs, ankles, or abdomen that is new or worsening\n\u2022 Persistent nausea or vomiting\n\u2022 Inability to take your prescribed medications',
        },
        {
            heading: 'What to Do at Home',
            body: '**Take Your Medications:**\n\u2022 Take all medications exactly as prescribed, including rate control medications (beta-blockers or calcium channel blockers), blood thinners (anticoagulants) if prescribed, and any other heart medications\n\u2022 Do not stop or change your medications without talking to your doctor first\n\u2022 Set reminders to help you remember to take your medications on time\n\n**Monitor Your Symptoms:**\n\u2022 Check your pulse regularly as instructed by your doctor\n\u2022 Rest and stay calm if you feel your heart racing\n\u2022 Keep a log of any symptoms you experience, including when they occur and how long they last\n\n**Lifestyle Modifications:**\n\u2022 Limit or avoid alcohol \u2014 it can trigger atrial fibrillation episodes\n\u2022 Avoid caffeine if it worsens your symptoms\n\u2022 Get adequate sleep and manage stress\n\u2022 Maintain a healthy weight\n\u2022 Stay hydrated but follow any fluid restrictions your doctor has given you',
        },
        {
            heading: 'Follow-Up Care',
            body: '**Appointments:**\n\u2022 Schedule follow-up with your primary care doctor or cardiologist within 1\u20132 weeks (or as directed)\n\u2022 Keep all scheduled appointments, even if you are feeling better\n\u2022 Bring a list of your current medications and any questions\n\n**Blood Work:**\n\u2022 If you are taking blood thinners, you may need regular blood tests to monitor their effectiveness\n\u2022 Follow your doctor\u2019s instructions about when to have these tests done\n\n**Questions to Ask Your Doctor:**\n\u2022 What is my target heart rate?\n\u2022 How often should I check my pulse?\n\u2022 What activities are safe for me?\n\u2022 Do I need to make any changes to my diet?\n\u2022 When can I return to work or normal activities?',
        },
        {
            heading: 'Important Reminders',
            body: '\u2022 Atrial fibrillation increases your risk of stroke \u2014 this is why blood thinners may be prescribed\n\u2022 Even if you feel better, continue taking all medications as prescribed\n\u2022 Call your doctor\u2019s office if you have questions or concerns that are not emergencies\n\u2022 Wear a medical alert bracelet if you are taking blood thinners',
        },
    ],
    citations: [
        { num: 1, text: 'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation. J Am Coll Cardiol. 2024;83(1):109-279.' },
    ],
};
// -------------------------------------------------------------------
// PEP Patient Information Sheet
// -------------------------------------------------------------------
const PEP_PATIENT_INFO = {
    id: 'pep-patient-info',
    title: 'PEP: What You Need to Know',
    subtitle: 'Patient Information \u2014 Post-Exposure Prophylaxis for HIV',
    sections: [
        {
            heading: 'What Is PEP?',
            body: 'PEP stands for post-exposure prophylaxis. It is a 28-day course of HIV medications taken after a possible exposure to HIV. PEP can prevent HIV infection if started within 72 hours of exposure. The sooner you start, the better it works.',
        },
        {
            heading: 'How Likely Is HIV Transmission?',
            body: 'The risk of getting HIV from a single exposure varies by type:\n\n\u2022 Receptive anal intercourse: ~1.4% per exposure (highest sexual risk)\n\u2022 Receptive vaginal intercourse: ~0.08% per exposure\n\u2022 Insertive anal or vaginal intercourse: ~0.04\u20130.11% per exposure\n\u2022 Needlestick injury: ~0.23% per exposure\n\u2022 Mucous membrane splash: ~0.09% per exposure\n\u2022 Sharing injection drug needles: ~0.63% per exposure\n\nRisk is higher if the source person has a high viral load (not on treatment) and lower if the source person is on HIV treatment with an undetectable viral load.',
        },
        {
            heading: 'How Well Does PEP Work?',
            body: 'PEP is highly effective when taken correctly:\n\n\u2022 Reduces HIV risk by approximately 80% or more\n\u2022 Most effective when started within hours of exposure \u2014 ideally within 2 hours\n\u2022 Must be taken every day for the full 28 days to work\n\u2022 Missing doses or stopping early significantly reduces effectiveness\n\u2022 PEP does not protect against other sexually transmitted infections',
        },
        {
            heading: 'Common Side Effects',
            body: 'Most people tolerate PEP well. Side effects are usually mild and improve over the first 1\u20132 weeks:\n\n\u2022 Nausea (most common \u2014 take with food to help)\n\u2022 Fatigue or tiredness\n\u2022 Headache\n\u2022 Diarrhea or stomach discomfort\n\u2022 Difficulty sleeping\n\n**When to call your doctor:**\n\u2022 Severe nausea or vomiting that prevents you from taking the medication\n\u2022 Yellowing of skin or eyes\n\u2022 Dark-colored urine\n\u2022 Rash\n\u2022 Any severe or worsening symptoms',
        },
        {
            heading: 'Important Reminders',
            body: '\u2022 Take your medication at the same time every day\n\u2022 Complete all 28 days \u2014 do not stop early even if you feel fine\n\u2022 You will need follow-up HIV testing at 4\u20136 weeks and 3 months\n\u2022 Visit your doctor at 2 weeks to check for side effects and blood work\n\u2022 Use condoms and safe practices during and after PEP until your final HIV test is negative\n\u2022 If you have ongoing risk for HIV, ask your doctor about PrEP (pre-exposure prophylaxis) \u2014 a daily medication to prevent HIV before exposure',
        },
    ],
    shareable: true,
    citations: [
        { num: 1, text: 'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV \u2014 CDC Recommendations, 2025. MMWR. 2025;74(1):1-56.' },
        { num: 2, text: 'Kofman AD, et al. 2025 US PHS Guidelines for Management of Occupational Exposures to HIV. Infect Control Hosp Epidemiol. 2025;46(9):863-873.' },
    ],
};
// -------------------------------------------------------------------
// Hepatitis B Serology Interpretation
// -------------------------------------------------------------------
const HBV_SEROLOGY_PAGE = {
    id: 'hbv-serology',
    title: 'Hepatitis B Serology',
    subtitle: 'Interpretation & Post-Exposure Management',
    sections: [
        {
            heading: 'The Three Markers',
            body: '**HBsAg (Surface Antigen)** — present on the virus surface. Positive = active infection (acute or chronic).\n\n**HBsAb (Surface Antibody)** — also called anti-HBs. Positive = immunity (from vaccination or resolved infection).\n\n**HBcAb (Core Antibody)** — also called anti-HBc. Positive = prior or current infection (does not develop from vaccination).',
        },
        {
            heading: 'Interpretation',
            body: '',
            drugTable: [
                {
                    drug: 'Susceptible (not immune)',
                    regimen: 'HBsAg (−), HBsAb (−), HBcAb (−) — never infected, not vaccinated. Needs vaccination.',
                },
                {
                    drug: 'Immune (vaccination)',
                    regimen: 'HBsAg (−), HBsAb (+), HBcAb (−) — successfully vaccinated. No action needed.',
                },
                {
                    drug: 'Immune (natural infection)',
                    regimen: 'HBsAg (−), HBsAb (+), HBcAb (+) — prior infection, now resolved with immunity. No action needed.',
                },
                {
                    drug: 'Acute infection',
                    regimen: 'HBsAg (+), HBsAb (−), HBcAb (+), IgM core Ab (+) — actively infected, early stage. Refer for monitoring; most adults clear spontaneously.',
                },
                {
                    drug: 'Chronic infection',
                    regimen: 'HBsAg (+), HBsAb (−), HBcAb (+), IgM core Ab (−) — persistent infection >6 months. Refer hepatology for treatment evaluation.',
                },
                {
                    drug: 'Isolated core Ab+',
                    regimen: 'HBsAg (−), HBsAb (−), HBcAb (+) — possible resolved infection with waned antibody, false positive, or occult infection. Check HBV DNA if clinical concern.',
                },
            ],
        },
        {
            heading: 'Post-Exposure Actions',
            body: '**If exposed patient is susceptible (all markers negative):**\n\u2022 Source HBV-positive or unknown: give HBIG (0.06 mL/kg IM) + start HBV vaccine series\n\u2022 Source HBV-negative: start HBV vaccine series (no HBIG needed)\n\u2022 HBIG is most effective within 24 hours; give within 7 days of exposure\n\n**If exposed patient was previously vaccinated (HBsAb+):**\n\u2022 HBsAb \u226510 mIU/mL: protected, no treatment needed\n\u2022 HBsAb <10 mIU/mL (non-responder): give HBIG + vaccine booster\n\n**If exposed patient has chronic HBV (HBsAg+):**\n\u2022 HBIG and vaccine will not help — refer hepatology\n\u2022 Ensure patient is connected to HBV care',
        },
        {
            heading: 'HBV Vaccine Series',
            body: '\u2022 Standard: 0, 1, and 6 months (3-dose series)\n\u2022 Accelerated: Heplisav-B (HepB-CpG) — 2 doses, 1 month apart\n\u2022 Check HBsAb 1\u20132 months after final dose to confirm response (\u226510 mIU/mL)',
        },
    ],
    citations: [
        { num: 1, text: 'Schillie S, et al. Prevention of Hepatitis B Virus Infection in the United States: Recommendations of the ACIP. MMWR. 2018;67(1):1-31.' },
        { num: 2, text: 'Terrault NA, et al. Update on Prevention, Diagnosis, and Treatment of Chronic Hepatitis B: AASLD 2018 Hepatitis B Guidance. Hepatology. 2018;67(4):1560-1599.' },
        { num: 3, text: 'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV — CDC Recommendations, 2025. MMWR. 2025;74(1):1-56.' },
    ],
};
// -------------------------------------------------------------------
// Thrombolysis Contraindications (Stroke)
// -------------------------------------------------------------------
const STROKE_CONTRAINDICATIONS_PAGE = {
    id: 'stroke-contraindications',
    title: 'Thrombolysis Contraindications',
    subtitle: 'IV Thrombolysis Eligibility \u2014 Acute Ischemic Stroke',
    sections: [
        {
            heading: 'Absolute Contraindications',
            body: '\u2022 Active internal bleeding (excluding menses)\n\u2022 History of hemorrhagic stroke or stroke of unknown origin\n\u2022 Ischemic stroke within 3 months\n\u2022 Significant head trauma or intracranial/spinal surgery within 3 months\n\u2022 Intracranial neoplasm, AVM, or aneurysm\n\u2022 Known bleeding diathesis (platelets <100,000, INR >1.7, aPTT >40s, PT >15s)\n\u2022 Current anticoagulant use with INR >1.7 or PT >15s\n\u2022 Low-molecular-weight heparin at therapeutic dose within 24 hours\n\u2022 Direct thrombin inhibitor or factor Xa inhibitor within 48 hours (unless lab testing shows normal levels)\n\u2022 Blood glucose <50 mg/dL',
        },
        {
            heading: 'Relative Contraindications',
            body: '**Time-Based:**\n\u2022 Rapidly improving or minor symptoms (but disabling deficits still warrant treatment)\n\u2022 Pregnancy (weigh risk-benefit; not an absolute contraindication)\n\u2022 Seizure at stroke onset (if residual deficits are due to stroke, not postictal)\n\u2022 Major surgery or serious trauma within 14 days\n\n**Lab/Medication-Based:**\n\u2022 Arterial puncture at non-compressible site within 7 days\n\u2022 Lumbar puncture within 7 days\n\u2022 GI or urinary tract hemorrhage within 21 days\n\u2022 Myocardial infarction within 3 months\n\n**Imaging-Based:**\n\u2022 Large hypodensity on NCCT (>1/3 MCA territory) \u2014 suggests extensive infarction, higher hemorrhagic conversion risk\n\u2022 Intracranial hemorrhage on baseline imaging',
        },
        {
            heading: 'Blood Pressure Requirements',
            body: '**Before thrombolysis:** BP must be <185/110 mmHg\n\u2022 [Labetalol](#/drug/labetalol) 10\u201320 mg IV bolus (first-line)\n\u2022 [Nicardipine](#/drug/nicardipine) 5 mg/hr IV infusion (if labetalol insufficient)\n\u2022 [Clevidipine](#/drug/clevidipine) 1\u20132 mg/hr IV (alternative)\n\nIf BP cannot be reduced to <185/110: **do NOT give thrombolysis**\n\n**After thrombolysis:** Maintain BP <180/105 \u00D7 24 hours\n\u2022 Same agents as above; neuro checks every 15 min',
        },
        {
            heading: 'Extended Window Considerations (4.5\u20139h)',
            body: 'Patients in the 4.5\u20139 hour window may still be eligible for IVT if:\n\u2022 Perfusion imaging shows salvageable tissue (DWI-FLAIR mismatch on MRI, or CT perfusion with favorable penumbra)\n\u2022 No additional contraindications beyond standard list\n\u2022 Based on EXTEND trial evidence [3]',
        },
    ],
    citations: [
        { num: 1, text: 'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.' },
        { num: 2, text: 'Mendelson SJ, Prabhakaran S. Diagnosis and Management of TIA and Acute Ischemic Stroke: A Review. JAMA. 2021;325(11):1088-1098.' },
        { num: 3, text: 'Ma H, et al. Thrombolysis Guided by Perfusion Imaging up to 9 Hours after Onset of Stroke (EXTEND). N Engl J Med. 2019;380(19):1795-1803.' },
    ],
};
// -------------------------------------------------------------------
// Stroke Imaging: CT vs MRI
// -------------------------------------------------------------------
const STROKE_IMAGING_PAGE = {
    id: 'stroke-imaging',
    title: 'Stroke Imaging: CT vs MRI',
    subtitle: 'When to Use Each Modality',
    sections: [
        {
            body: 'Even when MRI is available, **CT stroke protocol is preferred when speed is critical** \u2014 particularly for suspected large vessel occlusion (LVO) where every minute of delay to endovascular therapy (EVT) worsens outcomes. [1][2]\n\nThe ACR Appropriateness Criteria state that "the rapidity of diagnosis afforded by CTA is a strongly relevant clinical consideration" and that MRI "may delay EVT...which detracts from the usefulness of this study due to the potential harm of delayed treatment." [2]',
        },
        {
            heading: 'When to Choose CT Over MRI (Even if MRI is Available)',
            body: '**Suspected LVO / thrombectomy candidate**\n\u2022 CTA is faster; delays to EVT worsen outcomes [1]\n\n**Severe/disabling deficits within 4.5 hours**\n\u2022 NCCT sufficient to exclude hemorrhage and initiate thrombolysis; DWI not necessary [2]\n\n**Unstable or agitated patient**\n\u2022 CT faster, less motion artifact, no sedation needed [2]\n\n**MRI contraindications** (pacemaker, cochlear implant, metallic foreign body, severe claustrophobia)\n\u2022 CT is safe alternative [1][2]\n\n**Collateral assessment needed**\n\u2022 Multiphase CTA provides collateral status for thrombectomy selection [3]\n\n**Perfusion imaging in extended window (6\u201324h)**\n\u2022 CT perfusion is faster than MRI perfusion in most settings [1][4]',
        },
        {
            heading: 'When MRI is Preferred Over CT',
            body: '**Wake-up stroke / unknown onset**\n\u2022 DWI-FLAIR mismatch determines thrombolysis eligibility [1]\n\n**TIA or minor stroke with resolved symptoms**\n\u2022 DWI detects infarct in ~40% of TIAs (CT only ~4%) [2][3]\n\n**Posterior fossa stroke**\n\u2022 CT limited by bone artifact; MRI superior [4]\n\n**Stroke mimics suspected**\n\u2022 MRI better differentiates ischemia from mimics [4]\n\n**Renal insufficiency or contrast allergy**\n\u2022 Time-of-flight MRA avoids iodinated contrast [1][5]\n\n**Small/lacunar infarcts**\n\u2022 DWI more sensitive for small lesions [4]\n\n**Large infarct assessment for EVT eligibility**\n\u2022 DWI may be needed to determine core volume [1]',
        },
        {
            heading: 'Key Performance Differences',
            body: '**Hemorrhage detection**\n\u2022 CT: High sensitivity/specificity\n\u2022 MRI: Equivalent with GRE/SWI [1]\n\n**Acute infarct detection (\u22643h)**\n\u2022 CT: 47\u201353% sensitive\n\u2022 MRI (DWI): 88% sensitive [2]\n\n**LVO detection (CTA vs MRA)**\n\u2022 CTA: 92\u2013100% sensitive\n\u2022 MRA: Slightly inferior, especially distally [2][3]\n\n**Acquisition time**\n\u2022 CT (NCCT + CTA + CTP): ~5\u201310 min\n\u2022 MRI: ~20\u201330 min [4]\n\n**Perfusion imaging**\n\u2022 CT: Validated thresholds; faster\n\u2022 MRI: Equivalent accuracy; slower [4][5]',
        },
        {
            heading: 'Bottom Line',
            body: 'In the hyperacute setting with disabling deficits and suspected LVO, **CT-based protocols (NCCT + CTA \u00B1 CTP) should be the default** due to speed, even when MRI is available. [1][2]\n\nReserve MRI for wake-up strokes, TIA workup, posterior circulation strokes, stroke mimics, or when contrast is contraindicated. [2][6]',
        },
    ],
    citations: [
        { num: 1, text: 'Powers WJ. Acute Ischemic Stroke. N Engl J Med. 2020;383(3):252-260.' },
        { num: 2, text: 'Pannell JS, Corey AS, Shih RY, et al. ACR Appropriateness Criteria\u00AE Cerebrovascular Diseases\u2014Stroke and Stroke-Related Conditions. J Am Coll Radiol. 2024;21(6S):S21-S64.' },
        { num: 3, text: 'Mendelson SJ, Prabhakaran S. Diagnosis and Management of TIA and Acute Ischemic Stroke: A Review. JAMA. 2021;325(11):1088-1098.' },
        { num: 4, text: 'Patel P, Yavagal D, Khandelwal P. Hyperacute Management of Ischemic Strokes: JACC Focus Seminar. J Am Coll Cardiol. 2020;75(15):1844-1856.' },
        { num: 5, text: 'Amin HP, Madsen TE, Bravata DM, et al. Diagnosis, Workup, Risk Reduction of TIA in the ED: AHA Scientific Statement. Stroke. 2023;54(3):e109-e121.' },
        { num: 6, text: 'Zerna C, Thomalla G, Campbell BCV, et al. Current Practice and Future Directions in the Diagnosis and Acute Treatment of Ischaemic Stroke. Lancet. 2018;392(10154):1247-1256.' },
        { num: 7, text: 'Wintermark M, Sanelli PC, Albers GW, et al. Imaging Recommendations for Acute Stroke and TIA Patients: ASNR/ACR/SNIS Joint Statement. AJNR Am J Neuroradiol. 2013;34(11):E117-27.' },
    ],
};
// -------------------------------------------------------------------
// Stroke Consent: Patient Info (Shareable)
// -------------------------------------------------------------------
const STROKE_CONSENT_PAGE = {
    id: 'stroke-consent',
    title: 'Thrombolysis: What You Need to Know',
    subtitle: 'Patient Information \u2014 Clot-Dissolving Treatment for Stroke',
    shareable: true,
    sections: [
        {
            heading: 'Your Chances of Recovery',
            body: '',
            pictographs: [
                {
                    title: 'WITHOUT Treatment (out of 100 people like you)',
                    groups: [
                        { count: 26, color: '#66BB6A', label: '~26 people recover with little or no disability' },
                        { count: 44, color: '#FFCA28', label: '~44 people have moderate disability' },
                        { count: 30, color: '#EF5350', label: '~30 people have severe disability or die' },
                    ],
                },
                {
                    title: 'WITH Tenecteplase Treatment (out of 100 people like you)',
                    groups: [
                        { count: 73, color: '#66BB6A', label: '~73 people recover with little or no disability' },
                        { count: 8, color: '#FFCA28', label: '~8 people have moderate disability' },
                        { count: 17, color: '#EF5350', label: '~19 people have severe disability or die' },
                        { count: 2, color: '#EF5350', label: '~2 people have brain bleeding (included in totals above)', symbol: '\u26A0\uFE0F' },
                    ],
                },
            ],
        },
        {
            heading: 'What Is Happening?',
            body: 'You are having a stroke. A blood clot is blocking blood flow to part of your brain. Without treatment, the affected brain tissue will be permanently damaged.',
        },
        {
            heading: 'What Is the Treatment?',
            body: 'We are recommending a clot-dissolving medication (called a thrombolytic) given through your IV. This medication works by breaking up the blood clot that is blocking blood flow to your brain.\n\nThe sooner this medication is given, the better the chance of recovery. Every minute of delay means more brain tissue at risk.',
        },
        {
            heading: 'What Are the Benefits?',
            body: 'Clinical trials show that patients who receive this treatment are significantly more likely to recover with little or no disability:\n\n\u2022 Without treatment: about 26% of patients achieve a good outcome\n\u2022 With treatment: about 39% of patients achieve a good outcome\n\u2022 The earlier the treatment, the greater the benefit\n\u2022 For every 100 patients treated, approximately 13 additional patients recover well',
        },
        {
            heading: 'What Are the Risks?',
            body: 'The main risk is bleeding:\n\n\u2022 Symptomatic bleeding into the brain occurs in approximately 2\u20137% of patients\n\u2022 This can sometimes be life-threatening\n\u2022 Your medical team will monitor you very closely for the first 24 hours\n\u2022 Minor bleeding (gums, IV site) is more common and usually manageable\n\nOther possible side effects:\n\u2022 Allergic reaction (rare)\n\u2022 Swelling of the tongue or lips (angioedema \u2014 rare, more common if taking ACE inhibitors)',
        },
        {
            heading: 'What Happens If We Don\u2019t Treat?',
            body: 'Without clot-dissolving medication, the blocked area of your brain will continue to lose blood flow. This can lead to:\n\n\u2022 Permanent weakness or paralysis\n\u2022 Difficulty speaking or understanding speech\n\u2022 Vision loss\n\u2022 Disability requiring long-term care\n\u2022 In severe cases, death',
        },
        {
            heading: 'Emergency Consent',
            body: 'Because time is critical in stroke treatment, emergency consent may be obtained if the patient is unable to communicate and no family member is immediately available. This is standard practice supported by medical guidelines \u2014 the benefit of rapid treatment outweighs the delay of waiting for formal consent.',
        },
    ],
    citations: [
        { num: 1, text: 'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.' },
        { num: 2, text: 'Wardlaw JM, et al. Thrombolysis for Acute Ischaemic Stroke. Cochrane Database Syst Rev. 2014.' },
    ],
};
// -------------------------------------------------------------------
// P2Y12 Inhibitor Selection (NSTEMI)
// -------------------------------------------------------------------
const NSTEMI_ANTIPLATELET_PAGE = {
    id: 'nstemi-antiplatelet-cx',
    title: 'P2Y12 Inhibitor Selection',
    subtitle: 'Choosing Between Ticagrelor, Prasugrel, and Clopidogrel',
    sections: [
        {
            body: 'All three P2Y12 inhibitors reduce ischemic events when combined with aspirin after ACS/PCI. Selection depends on bleeding risk, ischemic risk, concomitant medications, and specific patient characteristics.',
        },
        {
            heading: 'Ticagrelor (Preferred First-Line)',
            body: '\u2022 PLATO trial: 16% relative reduction in CV death/MI/stroke vs clopidogrel (NNT 54)\n\u2022 Reversible P2Y12 inhibition \u2014 offset in ~3-5 days\n\u2022 Not dependent on CYP2C19 metabolism\n\u2022 **KEY:** Aspirin must be \u2264100 mg/day (higher doses reduce ticagrelor efficacy)\n\u2022 Side effects: dyspnea (~14%, usually mild), bradycardia\n\u2022 Twice-daily dosing may reduce adherence\n\u2022 Loading: 180 mg \u2192 Maintenance: 90 mg BID \u00D7 12 months',
        },
        {
            heading: 'Prasugrel (High Ischemic Risk)',
            body: '\u2022 TRITON-TIMI 38: 19% relative reduction in CV death/MI/stroke vs clopidogrel (NNT 46)\n\u2022 More potent and less variable platelet inhibition\n\u2022 **ABSOLUTE CONTRAINDICATION: Prior stroke or TIA** (net clinical harm)\n\u2022 Generally avoid if age \u226575 (no net benefit) or weight <60 kg (consider 5mg maintenance)\n\u2022 Irreversible \u2014 offset ~7 days (longest of the three)\n\u2022 Best for: diabetic patients, prior stent thrombosis on clopidogrel\n\u2022 Loading: 60 mg at PCI \u2192 Maintenance: 10 mg daily \u00D7 12 months',
        },
        {
            heading: 'Clopidogrel (High Bleeding Risk / OAC)',
            body: '\u2022 Least potent P2Y12 inhibitor but lowest bleeding risk\n\u2022 **Preferred for triple therapy** (OAC + DAPT)\n\u2022 Prodrug requiring CYP2C19 activation \u2014 ~30% of population are poor metabolizers with reduced efficacy\n\u2022 Avoid concurrent omeprazole/esomeprazole (CYP2C19 inhibition) \u2014 use pantoprazole\n\u2022 Loading: 300-600 mg \u2192 Maintenance: 75 mg daily \u00D7 12 months',
        },
        {
            heading: 'Decision Matrix',
            body: '',
            drugTable: [
                { drug: 'Standard ACS (no OAC needed)', regimen: 'Ticagrelor 90mg BID \u2014 first-line per PLATO trial. Aspirin \u2264100mg.' },
                { drug: 'High ischemic risk (diabetes, stent thrombosis)', regimen: 'Prasugrel 10mg daily \u2014 if NO prior stroke/TIA, age <75, weight \u226560kg.' },
                { drug: 'On oral anticoagulation (AF, VTE)', regimen: 'Clopidogrel 75mg daily \u2014 lowest bleeding in triple/dual therapy.' },
                { drug: 'CYP2C19 poor metabolizer', regimen: 'Ticagrelor or prasugrel \u2014 NOT clopidogrel (reduced efficacy).' },
                { drug: 'CABG likely/planned', regimen: 'Consider deferring P2Y12 until anatomy known. If loaded: hold per drug-specific timing.' },
            ],
        },
    ],
    citations: [
        { num: 1, text: 'Wallentin L, et al. Ticagrelor versus Clopidogrel in Patients with Acute Coronary Syndromes (PLATO). N Engl J Med. 2009;361(11):1045-1057.' },
        { num: 2, text: 'Wiviott SD, et al. Prasugrel versus Clopidogrel in Patients with Acute Coronary Syndromes (TRITON-TIMI 38). N Engl J Med. 2007;357(20):2001-2015.' },
        { num: 3, text: 'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e189-e228.' },
    ],
};
// -------------------------------------------------------------------
// Conservative Management (NSTEMI)
// -------------------------------------------------------------------
const NSTEMI_CONSERVATIVE_PAGE = {
    id: 'nstemi-conservative',
    title: 'Conservative Management',
    subtitle: 'Ischemia-Guided Strategy for Low-Risk NSTEMI',
    sections: [
        {
            body: 'A conservative (ischemia-guided) strategy is appropriate for low-risk NSTEMI patients (TIMI 0-2) without high-risk features. Catheterization is reserved for those who develop recurrent ischemia or have positive stress testing.',
        },
        {
            heading: 'Who Qualifies?',
            body: '\u2022 TIMI score 0-2\n\u2022 No hemodynamic instability\n\u2022 No refractory angina\n\u2022 No sustained arrhythmias\n\u2022 No heart failure signs\n\u2022 Low-risk troponin trajectory (trending down)',
        },
        {
            heading: 'Medical Therapy',
            body: '**Anticoagulation:** Fondaparinux 2.5 mg SC daily preferred (lowest bleeding \u2014 OASIS-5 trial)\n**Antiplatelet:** Aspirin 81 mg + clopidogrel 75 mg (or ticagrelor 90 mg BID)\n**Anti-ischemic:** Metoprolol \u2014 target HR <70. Nitroglycerin PRN.\n**Statin:** Atorvastatin 80 mg immediately\n**ACE inhibitor:** Within 24h if no contraindications',
        },
        {
            heading: 'Stress Testing Before Discharge',
            body: '**Options (in order of preference):**\n\u2022 Exercise treadmill test (if can exercise and ECG interpretable)\n\u2022 Stress echocardiography\n\u2022 Pharmacologic stress MRI/nuclear\n\n**Timing:** Before discharge or within 72 hours\n**If positive:** Upgrade to invasive strategy (catheterization)\n**If negative:** Discharge with medical therapy and close follow-up',
        },
        {
            heading: 'Upgrade to Invasive Strategy If:',
            body: '\u2022 Positive stress test\n\u2022 Recurrent angina at rest or with minimal exertion\n\u2022 New/worsening heart failure\n\u2022 New sustained arrhythmia\n\u2022 Hemodynamic instability\n\u2022 Rising troponin trajectory',
        },
    ],
    citations: [
        { num: 1, text: 'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e189-e228.' },
        { num: 2, text: 'Yusuf S, et al. Comparison of Fondaparinux and Enoxaparin in Acute Coronary Syndromes (OASIS-5). N Engl J Med. 2006;354(14):1464-1476.' },
    ],
};
// -------------------------------------------------------------------
// Bedside Echo in ACS (NSTEMI)
// -------------------------------------------------------------------
const NSTEMI_POCUS_PAGE = {
    id: 'nstemi-pocus',
    title: 'Bedside Echo in ACS',
    subtitle: 'POCUS Assessment for NSTEMI',
    sections: [
        {
            body: 'Bedside echocardiography (POCUS) in ACS provides rapid assessment of ventricular function, wall motion abnormalities, and mechanical complications. Can be performed in <5 minutes and guides immediate management decisions.',
        },
        {
            heading: 'What to Look For',
            body: '**Regional Wall Motion Abnormalities (RWMA):**\n\u2022 Hypokinesis (reduced movement)\n\u2022 Akinesis (absent movement)\n\u2022 Dyskinesis (paradoxical movement)\n\u2022 Distribution suggests culprit vessel territory\n\n**Global LV Function:**\n\u2022 Visual EF estimate (normal >55%, reduced <40%)\n\u2022 E-point septal separation (EPSS) \u2014 >10mm suggests EF <40%\n\n**RV Assessment:**\n\u2022 RV dilation (RV:LV ratio >0.6 suggests RV involvement)\n\u2022 RV free wall motion \u2014 McConnell sign (RV free wall akinesis with apical sparing) = acute RV strain\n\u2022 TAPSE <16mm = RV dysfunction',
        },
        {
            heading: 'Mechanical Complications (Emergent)',
            body: '\u2022 **Free wall rupture:** pericardial effusion + tamponade physiology\n\u2022 **VSD:** new color flow across interventricular septum; step-up in O\u2082 saturation PA vs RA\n\u2022 **Papillary muscle rupture:** severe acute MR with flail leaflet\n\u2022 **LV aneurysm:** thin, akinetic wall segment (late complication)\n\nAll mechanical complications require emergent surgical consultation.',
        },
        {
            heading: 'Views to Obtain',
            body: '\u2022 **Parasternal long axis (PLAX):** Global LV function, MR, pericardial effusion, EPSS\n\u2022 **Parasternal short axis (PSAX):** Segmental wall motion (sweep base to apex)\n\u2022 **Apical 4-chamber (A4C):** Comparative RV/LV size, TAPSE, regional WMA\n\u2022 **Subxiphoid:** Pericardial effusion, RV size\n\u2022 **IVC:** Volume status (collapsibility guides fluid management)\n\nFor detailed echo technique, see [Basic Echo Views](#/tree/echo-views)',
        },
    ],
    citations: [
        { num: 1, text: 'Collet JP, et al. 2020 ESC Guidelines for Management of ACS without Persistent ST-Elevation. Eur Heart J. 2021;42(14):1289-1367.' },
        { num: 2, text: 'Via G, et al. International Evidence-Based Recommendations for Focused Cardiac Ultrasound. J Am Soc Echocardiogr. 2014;27(7):683.e1-683.e33.' },
    ],
};
// -------------------------------------------------------------------
// EPSS Measurement Quick Reference
// -------------------------------------------------------------------
const EPSS_MEASUREMENT_PAGE = {
    id: 'epss-measurement',
    title: 'EPSS Measurement',
    subtitle: 'E-Point Septal Separation for LV Function',
    sections: [
        {
            body: '**EPSS (E-Point Septal Separation)** is a rapid, quantitative method for assessing left ventricular systolic function at the bedside. An EPSS >7 mm suggests reduced ejection fraction.',
        },
        {
            heading: 'How to Measure',
            body: '1. **Obtain PLAX view** — Parasternal long axis at 3rd-4th ICS\n2. **Activate M-mode** — Place cursor through mitral valve leaflet tips\n3. **Identify E-point** — The peak of the anterior mitral leaflet during early diastole\n4. **Measure** — Distance from E-point to the interventricular septum',
        },
        {
            heading: 'Interpretation',
            body: '• **EPSS < 7 mm** — Normal systolic function likely\n• **EPSS 7–10 mm** — Grey zone (add B-lines/IVC assessment)\n• **EPSS > 10 mm** — Reduced EF likely (LVEF ≤30%)\n\n**100% sensitivity** for detecting LVEF ≤30% when EPSS >7 mm. Specificity is moderate (52%).',
        },
        {
            heading: 'Limitations',
            body: '**EPSS may be inaccurate in:**\n• Aortic regurgitation\n• Mitral stenosis\n• Hypertrophic cardiomyopathy\n• Non-sinus rhythms (A-Fib)\n\n**Pediatric thresholds:** 6.0 mm for children, 4.9 mm for ages 0–3 years.',
        },
        {
            heading: 'Full Consult',
            body: 'For a complete step-by-step guide with images, see the [Echo-EPSS Consult](#/consult/echo-epss).',
        },
    ],
    citations: [
        { num: 1, text: 'McKaigney CJ, et al. E-Point Septal Separation: A Bedside Tool for Emergency Physician Assessment of LVEF. Am J Emerg Med. 2014;32(6):493-7.' },
        { num: 2, text: 'Prats MI, Bahner DP. Application of Focused Cardiac Ultrasound in Emergency Medicine. ACEP. 2020.' },
    ],
};
// -------------------------------------------------------------------
// MINOCA Workup & Management
// -------------------------------------------------------------------
const NSTEMI_MINOCA_PAGE = {
    id: 'nstemi-minoca',
    title: 'MINOCA Workup & Management',
    subtitle: 'Myocardial Infarction with Non-Obstructive Coronary Arteries',
    sections: [
        {
            body: 'MINOCA is defined as acute MI (troponin criteria) with non-obstructive coronary arteries (\u226450% stenosis) on angiography. Accounts for 5-10% of all MI presentations. Requires systematic evaluation to determine etiology and guide therapy \u2014 standard ACS regimens may be harmful.',
        },
        {
            heading: 'Etiologies',
            body: '',
            drugTable: [
                { drug: 'Coronary spasm (most common)', regimen: 'Treat with CCBs (diltiazem/amlodipine) and nitrates. AVOID beta-blockers (may worsen spasm). Provocative testing (acetylcholine challenge) in cath lab may confirm.' },
                { drug: 'Plaque disruption/erosion', regimen: 'Standard ACS therapy appropriate (DAPT + statin). OCT/IVUS may identify plaque features not seen on angiography.' },
                { drug: 'Spontaneous coronary artery dissection (SCAD)', regimen: 'Conservative management preferred. AVOID anticoagulation (may extend dissection). DAPT controversial. Most heal spontaneously. PCI may worsen dissection.' },
                { drug: 'Takotsubo (stress cardiomyopathy)', regimen: 'Supportive care. AVOID catecholamines/inotropes. Beta-blocker if no cardiogenic shock. EF typically recovers in 1-4 weeks. Screen for QT prolongation.' },
                { drug: 'Myocarditis', regimen: 'Treat underlying cause. NSAIDs may worsen myocarditis. Anticoagulation if severe LV dysfunction. Cardiac MRI diagnostic (late gadolinium enhancement pattern).' },
                { drug: 'Coronary thromboembolism', regimen: 'Evaluate for: AF, PFO, endocarditis, hypercoagulable state. Anticoagulation if embolic source identified.' },
            ],
        },
        {
            heading: 'Mandatory Workup',
            body: '**Cardiac MRI (within 7 days):**\n\u2022 Distinguishes ischemic vs non-ischemic patterns\n\u2022 T2 mapping: identifies edema (acute injury)\n\u2022 Late gadolinium enhancement: scar pattern\n  \u2014 Subendocardial: ischemic (plaque, spasm, embolism)\n  \u2014 Subepicardial/mid-wall: myocarditis\n  \u2014 Absent with edema: Takotsubo\n\n**Additional testing as indicated:**\n\u2022 OCT/IVUS during index cath (plaque erosion, dissection)\n\u2022 Provocative testing (acetylcholine challenge for spasm)\n\u2022 Hypercoagulability panel if embolic etiology suspected\n\u2022 Screening for pheochromocytoma if Takotsubo',
        },
        {
            heading: 'Key Principle',
            body: '**Do not reflexively apply standard ACS therapy.** Each MINOCA etiology has specific management \u2014 some standard ACS medications can cause harm:\n\n\u2022 Beta-blockers worsen coronary spasm\n\u2022 Anticoagulation extends SCAD dissection\n\u2022 Catecholamines worsen Takotsubo\n\u2022 NSAIDs worsen myocarditis\n\nDetermine etiology FIRST, then tailor therapy accordingly.',
        },
    ],
    citations: [
        { num: 1, text: 'Tamis-Holland JE, et al. Contemporary Diagnosis and Management of Patients with MI in the Absence of Obstructive CAD: AHA Scientific Statement. Circulation. 2019;139(18):e891-e908.' },
        { num: 2, text: 'Collet JP, et al. 2020 ESC Guidelines for Management of ACS without Persistent ST-Elevation. Eur Heart J. 2021;42(14):1289-1367.' },
        { num: 3, text: 'Hayes SN, et al. Spontaneous Coronary Artery Dissection: AHA Scientific Statement. Circulation. 2018;137(19):e523-e557.' },
    ],
};
// -------------------------------------------------------------------
// Troponin Sensitivity (NSTEMI)
// -------------------------------------------------------------------
const NSTEMI_TROPONIN_SENSITIVITY_PAGE = {
    id: 'nstemi-troponin-sensitivity',
    title: 'Interpreting Troponin Sensitivity',
    subtitle: 'Time-Dependent Diagnostic Accuracy of Troponin Assays',
    sections: [
        {
            body: 'Troponin sensitivity for detecting acute coronary syndrome is **highly time-dependent**. Early presenters (within 2\u20134 hours of symptom onset) have significantly lower sensitivity compared to later presenters. High-sensitivity troponin (hs-cTn) assays substantially improve early detection compared to conventional assays.',
        },
        {
            heading: 'Timing of Troponin Release',
            body: 'Troponin is released from the myocardium **as early as 2\u20134 hours after symptom onset** in acute MI. [1] However, depending on the assay, values may not become abnormal for up to 12 hours. [1] Diagnostic accuracy increases progressively with time from symptom onset. [2]\n\n**Sensitive troponin assays** maintain excellent diagnostic accuracy (AUC 0.90\u20130.94) even within 2 hours of symptom onset, while standard assays show markedly inferior performance (AUC ~0.71) at these early time points. [3]',
        },
        {
            heading: 'High-Sensitivity Troponin Advantages',
            body: 'hs-cTn assays have **superior sensitivity** compared to conventional assays, particularly in early presenters. [4][5] The time from chest pain onset to detectable troponin concentration is shorter with hs-cTn, enabling more rapid rule-in or rule-out. [4][6]\n\nApproximately **one-third of NSTEMI patients take longer than 3 hours** from symptom onset to exceed common rule-out thresholds (5 ng/L). [7]',
        },
        {
            heading: 'Serial Testing Recommendations',
            body: '**Fourth Universal Definition of MI [8]:**\n\u2022 Conventional assays: sample at 0h, repeat at 3\u20136 hours\n\u2022 hs-cTn assays: sample at 0h, repeat at 1\u20132 hours\n\n**Single-measurement rule-out (select patients):**\n\u2022 In early presenters (\u22642h from onset), a single hs-cTn below the limit of detection (2 ng/L) achieves 99.4% sensitivity and 99.7% NPV [9]\n\u2022 This strategy should NOT be used in very early presenters (<2h) or high-risk patients\n\u2022 hs-cTn sensitivity remains consistently high across subgroups including early presenters [10]',
        },
        {
            heading: 'Clinical Pearl',
            body: '**A single negative troponin does not rule out ACS in early presenters.** Serial troponin measurements are essential, especially when symptom onset is <3 hours before presentation. hs-cTn assays narrow the diagnostic window but do not eliminate it.',
        },
    ],
    citations: [
        { num: 1, text: 'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e139-e228.' },
        { num: 2, text: 'Guangquan L, et al. Time From Symptom Onset Influences hs-TnT Diagnostic Accuracy for AMI. Clin Chem Lab Med. 2016;54(1):133-42.' },
        { num: 3, text: 'Reichlin T, et al. Early Diagnosis of MI with Sensitive Cardiac Troponin Assays. N Engl J Med. 2009;361(9):858-67.' },
        { num: 4, text: 'Rao SV, et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for Management of ACS. J Am Coll Cardiol. 2025;S0735-1097(24)10424-X.' },
        { num: 5, text: 'Bergmark BA, et al. Acute Coronary Syndromes. Lancet. 2022;399(10332):1347-1358.' },
        { num: 6, text: 'Gulati M, et al. 2021 AHA/ACC Guideline for Evaluation and Diagnosis of Chest Pain. J Am Coll Cardiol. 2021;78(22):e187-e285.' },
        { num: 7, text: 'Pickering JW, et al. Early Kinetic Profiles of Troponin I and T by hs Assays in MI. Clin Chim Acta. 2020;505:15-25.' },
        { num: 8, text: 'Thygesen K, et al. Fourth Universal Definition of Myocardial Infarction (2018). J Am Coll Cardiol. 2018;72(18):2231-2264.' },
        { num: 9, text: 'Lowry MTH, et al. Troponin in Early Presenters to Rule Out MI. Eur Heart J. 2023;44(30):2846-2858.' },
        { num: 10, text: 'Carlton E, et al. Evaluation of hs-cTnI Levels in Suspected ACS. JAMA Cardiol. 2016;1(4):405-12.' },
    ],
};
// -------------------------------------------------------------------
// Hyperkalemia ECG Findings
// -------------------------------------------------------------------
const K_HYPER_ECG_PAGE = {
    id: 'k-hyper-ecg-info',
    title: 'Hyperkalemia ECG Findings',
    subtitle: 'ECG Progression by Potassium Level',
    sections: [
        {
            heading: 'Early Changes (K+ 5.5-6.5 mEq/L)',
            body: '**Peaked T-waves** — narrow-based, symmetric, tall. Most sensitive early finding but not specific. Best seen in precordial leads V2-V4.\n\nFlattened P-waves.\n\nST-segment depression.',
        },
        {
            heading: 'Moderate Changes (K+ 6.5-7.5 mEq/L)',
            body: 'PR interval prolongation → first-degree AV block.\n\nFurther P-wave flattening or complete loss of P-waves.\n\nContinued T-wave peaking.',
        },
        {
            heading: 'Severe Changes (K+ 7.0-8.0 mEq/L)',
            body: '**QRS widening** (> 120 ms) — intraventricular conduction delay.\n\nLoss of P-waves.\n\nBradycardia from prolonged PR and QRS.\n\nBundle branch block patterns.\n\nJunctional or escape rhythms.\n\nSecond- or third-degree AV block.',
        },
        {
            heading: 'Life-Threatening (K+ > 8.0 mEq/L)',
            body: '**Sine wave pattern** — merged wide QRS complexes with peaked T-waves. Pathognomonic.\n\nVentricular fibrillation.\n\nAsystole or pulseless electrical activity.\n\nComplete heart block.',
        },
        {
            heading: 'Most Dangerous ECG Findings',
            body: 'The following findings are associated with serious adverse events (VF, cardiac arrest, death within 6 hours):\n\n• **Bradycardia** — RR 12.3\n• **Junctional rhythm** — RR 7.5\n• **Prolonged QRS** — RR 4.7\n\nFrequency in severe hyperkalemia (K+ ≥ 6.5):\n• Peaked T-waves: 35.7%\n• Prolonged PR: 12.1%\n• Bradycardia: 12.0%\n• Widened QRS: 7.8%\n• Escape rhythm: 7.1%\n• High-degree AV block: 3.5%\n• Ventricular arrhythmias: 0.7%',
        },
        {
            heading: 'Clinical Pearls',
            body: 'ECG changes typically do not manifest until K+ exceeds 6.5 mEq/L. [1]\n\nECG changes have **low sensitivity** for detecting hyperkalemia and do not correlate reliably with specific K+ levels. [2]\n\nThe **rate of potassium rise** is often more important than the absolute level — patients with lower baseline K+ who experience rapid increases are at higher risk. [3]\n\nChronic hyperkalemia (e.g., dialysis patients) is better tolerated — these patients may have elevated K+ with fewer ECG manifestations. [1]\n\n**Never rule out dangerous hyperkalemia based on a normal ECG.** Sensitivity for peaked T-waves is only ~34%. [3]',
        },
    ],
    citations: [
        { num: 1, text: 'Sandau KE, et al. Update to Practice Standards for ECG Monitoring in Hospital Settings. Circulation. 2017;136(19):e273-e344.' },
        { num: 2, text: 'Kim MJ, et al. Potassium Disorders: Hypokalemia and Hyperkalemia. Am Fam Physician. 2023;107(1):59-70.' },
        { num: 3, text: 'Nakayama T, et al. Baseline Potassium Levels and Their Association With ECG Abnormalities in Hyperkalaemia. Nephrology. 2025;30(7):e70100.' },
        { num: 4, text: 'Durfey N, et al. Severe Hyperkalemia: Can the ECG Risk Stratify? West J Emerg Med. 2017;18(5):963-971.' },
    ],
};
// -------------------------------------------------------------------
// Hypokalemia ECG Findings
// -------------------------------------------------------------------
const K_HYPO_ECG_PAGE = {
    id: 'k-hypo-ecg-info',
    title: 'Hypokalemia ECG Findings',
    subtitle: 'ECG Changes and Arrhythmia Risk',
    sections: [
        {
            heading: 'Classic ECG Findings',
            body: 'The earliest change is **decreased T-wave amplitude**, progressing as potassium declines.\n\n• **T-wave flattening/inversion** (27% of patients) — most common finding\n• **ST-segment depression** (16%) — upsloping morphology\n• **QTc prolongation** (14%) — often actually QTU prolongation with T-U wave fusion\n• **Prominent U waves** (> 1 mm amplitude) — most specific finding\n• U waves larger than T-waves in same lead (U:T ratio > 1)\n\nBest seen in leads V2 and V3.\n\nECG changes are present in only about **40% of hypokalemic patients**. [1]',
        },
        {
            heading: 'Quantitative ECG Effects',
            body: 'For each 1 mmol/L decrease in potassium within the low range (2.0-4.1): [4]\n\n• QTc prolongation: **+12.8 ms**\n• T-wave amplitude reduction: **-43.1 μV**\n• PR interval prolongation: **+4.6 ms**\n• P-wave duration prolongation: **+2.7 ms**',
        },
        {
            heading: 'Arrhythmia Risk',
            body: 'QTc prolongation increases risk of **Torsades de Pointes**.\n\n**AVOID QT-prolonging drugs** in hypokalemia:\n• Amiodarone, sotalol\n• Fluoroquinolones\n• Ondansetron\n• Haloperidol, droperidol\n• Methadone\n\nOther arrhythmias:\n• First- or second-degree AV block\n• Atrial fibrillation\n• PVCs\n• Ventricular tachycardia\n• Ventricular fibrillation and cardiac arrest\n\n**Digitalis toxicity** is potentiated by hypokalemia — monitor carefully in patients on digoxin.',
        },
        {
            heading: 'Severe Hypokalemia (K+ < 2.5 mEq/L)',
            body: 'Characteristic findings include:\n\n• **Prominent U waves** with T-U fusion\n• ST-segment depression\n• T-wave flattening or inversion\n• Apparent QT prolongation (often QTU interval)\n• Widened QRS in severe cases\n\nLife-threatening arrhythmias may occur: VT, Torsades de Pointes, VF, cardiac arrest. [2] [3]',
        },
        {
            heading: 'Clinical Pearls',
            body: 'ECG changes do NOT reliably correlate with specific K+ levels. [2]\n\nThe **rapidity of decline** is more predictive of ECG changes than the absolute level. [2]\n\nConsider hypokalemia in any patient with **new-onset AF or VT**.\n\nU waves are a classic teaching point but present in only ~20% of hypokalemic patients — QTc prolongation is the most clinically significant finding.\n\nAlways obtain ECG when hypokalemia is identified to determine treatment urgency. [2]',
        },
    ],
    citations: [
        { num: 1, text: 'Kildegaard H, et al. Prevalence and Prognostic Value of ECG Abnormalities in Hypokalemia. J Intern Med. 2024;295(4):544-556.' },
        { num: 2, text: 'Kim MJ, et al. Potassium Disorders: Hypokalemia and Hyperkalemia. Am Fam Physician. 2023;107(1):59-70.' },
        { num: 3, text: 'Sandau KE, et al. Update to Practice Standards for ECG Monitoring in Hospital Settings. Circulation. 2017;136(19):e273-e344.' },
        { num: 4, text: 'Krogager ML, et al. Relationship Between Serum K+ and ECG Characteristics in 163,547 Individuals. J Electrocardiol. 2019;57:104-111.' },
    ],
};
// -------------------------------------------------------------------
// Croup Return Precautions
// -------------------------------------------------------------------
const CROUP_RETURN_PRECAUTIONS = {
    id: 'croup-return-precautions',
    title: 'When to Return to the Emergency Department',
    subtitle: 'Patient Discharge Instructions — Croup',
    shareable: true,
    sections: [
        {
            body: 'Your child has been diagnosed with **croup**, a viral infection that causes swelling in the airway. Most children improve within 2 days with treatment, but it\'s important to watch for warning signs that your child needs to return for medical care.',
        },
        {
            heading: 'Call 911 or Return to the Emergency Department Immediately If Your Child Has',
            body: '**Breathing Problems:**\n• Difficulty breathing that is getting worse\n• Struggling to breathe (chest pulling in deeply between or below the ribs with each breath)\n• Fast breathing or working very hard to breathe\n• Noisy breathing when resting (stridor) that doesn\'t improve or gets worse\n• Pauses in breathing or stops breathing briefly\n\n**Serious Warning Signs:**\n• Blue or gray color around the lips, mouth, or fingernails\n• Extreme drowsiness or difficulty waking up\n• Confusion or unusual behavior\n• Drooling or difficulty swallowing\n• Unable to drink fluids or refusing all liquids',
        },
        {
            heading: 'Return to Your Doctor or Emergency Department If Your Child Has',
            body: '• Symptoms that don\'t improve after taking the prescribed steroid medicine\n• Barking cough that lasts more than 3 days\n• Fever above 103°F (39.4°C) or fever that lasts more than 3 days\n• Symptoms that improve and then suddenly get worse\n• Trouble sleeping due to breathing problems',
        },
        {
            heading: 'What to Expect at Home',
            body: '• Symptoms are often **worse at night** and may improve during the day\n• The barking cough typically lasts 1-2 days but can continue for up to 5-7 days\n• Your child may sound worse than they actually are — the barking cough can be scary but doesn\'t always mean severe illness\n• Keep your child calm, as crying and agitation can make breathing more difficult',
        },
        {
            heading: 'Home Care Tips',
            body: '• Give the steroid medicine exactly as prescribed\n• Keep your child comfortable and calm\n• Offer plenty of fluids to prevent dehydration\n• Use acetaminophen or ibuprofen for fever or discomfort (follow dosing instructions)\n• Keep your child\'s head elevated during sleep if comfortable',
        },
        {
            heading: 'When Symptoms Usually Improve',
            body: 'Most children start feeling better within 2-3 hours after receiving steroid medication. The cough should gradually improve over the next 2 days. If your child is not improving as expected, contact your doctor.\n\n**Trust your instincts.** If you are worried about your child\'s breathing or overall condition, seek medical attention right away. It\'s always better to be checked and reassured than to wait too long.',
        },
    ],
    citations: [
        { num: 1, text: 'Bjornson CL, Johnson DW. Croup. Lancet. 2008;371(9609):329-39.' },
        { num: 2, text: 'Cherry JD. Croup. N Engl J Med. 2008;358(4):384-91.' },
        { num: 3, text: 'Zoorob R, Sidani M, Murray J. Croup: An Overview. Am Fam Physician. 2011;83(9):1067-73.' },
        { num: 4, text: 'Aregbesola A, et al. Glucocorticoids for Croup in Children. Cochrane Database Syst Rev. 2023;1:CD001955.' },
    ],
};
// -------------------------------------------------------------------
// Pediatric UTI Definition & Urinalysis
// -------------------------------------------------------------------
const UTI_DEFINITION_PAGE = {
    id: 'uti-definition-info',
    title: 'UTI Definition & Urinalysis',
    subtitle: 'DCMC Diagnostic Criteria',
    sections: [
        {
            heading: 'UTI Definition',
            body: 'The presence of pyuria and/or bacteriuria on urinalysis AND a positive urine culture.\n\n\u2022 Pyuria: \u22655 WBCs/hpf in centrifuged specimen (DCMC uses centrifuged specimens) or \u226510 WBCs/hpf in counting chamber\n\u2022 Urine culture positive: \u226550,000 CFU/mL by catheterization or suprapubic aspiration\n\u2022 Clean catch: \u2265100,000 CFU/mL optimal, 50,000-100,000 acceptable with decreased sensitivity/specificity',
        },
        {
            heading: 'Positive UA Definition',
            body: 'The presence of Leukocyte Esterase OR Nitrites OR microscopic analysis positive for leukocytes or bacteria is suggestive of active UTI.\n\nWhen more than one finding is present simultaneously, sensitivity and specificity increase significantly.\n\n\u2022 Urine dipstick alone cannot report WBC count and bacterial presence \u2014 use with caution\n\u2022 If bag specimen UA is positive, obtain catheterized specimen for culture to avoid contamination',
        },
        {
            heading: 'Complicated UTI',
            body: 'Defined as UTI with any of the following:\n\u2022 Functional or anatomic abnormality of the urinary tract\n\u2022 Indwelling urinary catheter\n\u2022 Recent urinary tract instrumentation\n\u2022 Recent antibiotic use\n\u2022 Immunosuppression',
        },
        {
            heading: 'Neonatal UTI Definition',
            body: 'For infants <48 weeks PMA and >7 days of life:\n\n\u2022 UTI defined as >50,000 CFU/mL in catheter obtained specimen\n\u2022 Exclusions: History of Candida infection (consult ID), concomitant bacteremia or meningitis\n\u2022 ESBL: Bacteria with particular resistance to penicillins \u2014 requires expanded antibiotic coverage',
        },
    ],
    citations: [
        { num: 1, text: 'Dell Children\'s EBOC. First Febrile UTI Clinical Pathway. May 2017.' },
        { num: 2, text: 'Dell Children\'s EBOC. UTI Management Pathway (Neonatal). September 2024.' },
        { num: 3, text: 'Roberts KB. UTI: clinical practice guideline for febrile infants 2 to 24 months. Pediatrics. 2011;128(3):595-610.' },
    ],
};
// -------------------------------------------------------------------
// HSV Workup Criteria (Peds Fever)
// -------------------------------------------------------------------
const PF_HSV_CRITERIA_PAGE = {
    id: 'pf-hsv-criteria',
    title: 'HSV Workup Criteria',
    subtitle: 'When to add Acyclovir and order HSV testing',
    sections: [
        {
            heading: 'Clinical Features Suggesting HSV',
            body: '\u2022 Skin vesicles (mouth, scalp, trunk) \u2014 most specific finding\n\u2022 Seizures (especially focal)\n\u2022 Lethargy or irritability out of proportion to fever\n\u2022 Hepatosplenomegaly\n\u2022 Temperature instability (hypothermia or hyperthermia)\n\u2022 Apnea or respiratory distress\n\u2022 Poor feeding\n\u2022 Bulging fontanelle',
        },
        {
            heading: 'Laboratory Red Flags',
            body: '\u2022 Thrombocytopenia\n\u2022 Transaminitis (elevated AST/ALT)\n\u2022 Coagulopathy (elevated PT/INR)\n\u2022 CSF pleocytosis (especially lymphocytic)\n\u2022 Elevated CSF protein',
        },
        {
            heading: 'Risk Factors',
            body: '\u2022 Maternal history of genital HSV (especially primary outbreak near delivery)\n\u2022 Vaginal delivery with active lesions\n\u2022 Prolonged rupture of membranes\n\u2022 Fetal scalp electrode use\n\u2022 Age <21 days (highest risk period)',
        },
        {
            heading: 'HSV Testing to Order',
            body: '\u2022 HSV PCR \u2014 blood (plasma)\n\u2022 HSV PCR \u2014 CSF\n\u2022 Surface cultures: conjunctiva, throat, nasopharynx, rectum\n\u2022 Vesicle fluid: viral culture and/or PCR (if lesions present)\n\u2022 AST, ALT (hepatic involvement screen)',
        },
        {
            heading: 'Treatment',
            body: '\u2022 [Acyclovir](#/drug/acyclovir) 20 mg/kg IV q8h\n\u2022 Duration: minimum 5 doses or until HSV PCR results negative\n\u2022 If PCR not resulted after 5 doses \u2192 contact Infectious Disease\n\u2022 Ensure adequate hydration (crystalline nephropathy risk)',
        },
    ],
    citations: [
        { num: 1, text: 'Pantell RH, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.' },
        { num: 3, text: 'Kimberlin DW, et al. Guidance on Management of Asymptomatic Neonates Born to Women With Active Genital Herpes Lesions. Pediatrics. 2013;131(2):e572-e549.' },
    ],
};
// -------------------------------------------------------------------
// Ceftriaxone Contraindications in Neonates (Peds Fever)
// -------------------------------------------------------------------
const PF_CEFTRIAXONE_CI_PAGE = {
    id: 'pf-ceftriaxone-ci',
    title: 'Ceftriaxone Contraindications (<28 Days)',
    subtitle: 'Use Cefepime as alternative when contraindicated',
    sections: [
        {
            heading: 'Absolute Contraindications',
            body: '\u2022 Gestational age <37 weeks (any postnatal age)\n\u2022 Postnatal age <7 days (any gestational age)\n\u2022 Receiving calcium-containing IV products (risk of fatal Ceftriaxone-calcium precipitates in lungs/kidneys)\n\u2022 Known cephalosporin anaphylaxis',
        },
        {
            heading: 'Relative Contraindications (Use with Caution)',
            body: '\u2022 Total bilirubin >10 mg/dL\n\u2022 Risk factors for hyperbilirubinemia:\n  \u2022 ABO incompatibility\n  \u2022 G6PD deficiency\n  \u2022 Significant bruising/cephalohematoma\n  \u2022 East Asian ethnicity\n  \u2022 Exclusive breastfeeding with weight loss >10%\n\u2022 Ceftriaxone displaces bilirubin from albumin \u2192 increased free bilirubin \u2192 kernicterus risk',
        },
        {
            heading: 'Alternative Agent',
            body: '\u2022 [Cefepime](#/drug/cefepime) \u2014 4th-generation cephalosporin\n\u2022 Dosing 0-28 days: 50 mg/kg IV q12h\n\u2022 Dosing >28 days: 50 mg/kg IV q8h\n\u2022 Broader gram-negative spectrum than Ceftriaxone\n\u2022 No calcium interaction, no significant bilirubin displacement',
        },
    ],
    citations: [
        { num: 1, text: 'Pantell RH, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.' },
    ],
};
// -------------------------------------------------------------------
// Antimicrobial Dosing Reference (Peds Fever)
// -------------------------------------------------------------------
const PF_ABX_DOSING_PAGE = {
    id: 'pf-abx-dosing',
    title: 'Antimicrobial Dosing Reference',
    subtitle: 'Age-based dosing for febrile infant workup',
    sections: [
        {
            heading: 'Empiric Sepsis Coverage (0-7 Days)',
            body: '\u2022 [Ampicillin](#/drug/ampicillin) 50 mg/kg IV q8h + [Gentamicin](#/drug/gentamicin) 4 mg/kg IV q24h\n\u2022 Covers: GBS, Listeria, E. coli, Enterococcus\n\u2022 Duration: 48h rule-out period (d/c if cultures negative + well-appearing)',
        },
        {
            heading: 'Empiric Sepsis Coverage (8-21 Days)',
            body: '\u2022 [Ceftriaxone](#/drug/ceftriaxone) 50 mg/kg IV q24h (or [Cefepime](#/drug/cefepime) if [CI](#/info/pf-ceftriaxone-ci))\n\u2022 Duration: 48h rule-out period',
        },
        {
            heading: 'Empiric Sepsis Coverage (22-28 Days)',
            body: '\u2022 [Ceftriaxone](#/drug/ceftriaxone) 50 mg/kg IV q24h (or [Cefepime](#/drug/cefepime) if [CI](#/info/pf-ceftriaxone-ci))\n\u2022 Duration: 24-36h rule-out period',
        },
        {
            heading: 'Meningitis Dosing (0-7 Days)',
            body: '\u2022 [Ampicillin](#/drug/ampicillin) 100 mg/kg IV q8h + [Cefepime](#/drug/cefepime) 50 mg/kg IV q12h\n\u2022 D/C [Gentamicin](#/drug/gentamicin) when switching to meningitic dosing\n\u2022 Consider adding [Acyclovir](#/drug/acyclovir) 20 mg/kg IV q8h',
        },
        {
            heading: 'Meningitis Dosing (8-28 Days)',
            body: '\u2022 [Ceftriaxone](#/drug/ceftriaxone) 50 mg/kg IV q12h + [Ampicillin](#/drug/ampicillin) 75 mg/kg IV q6h\n\u2022 Consider adding [Acyclovir](#/drug/acyclovir) 20 mg/kg IV q8h',
        },
        {
            heading: 'Meningitis Dosing (29-60 Days)',
            body: '\u2022 [Ceftriaxone](#/drug/ceftriaxone) 50 mg/kg IV q12h + [Vancomycin](#/drug/vancomycin) 15 mg/kg IV q6h\n\u2022 Consider adding [Acyclovir](#/drug/acyclovir) 20 mg/kg IV q8h',
        },
        {
            heading: 'UTI Treatment',
            body: '\u2022 [Cefazolin](#/drug/cefazolin) 17 mg/kg IV q8h (without bacteremia)\n\u2022 [Cefazolin](#/drug/cefazolin) 33 mg/kg IV q8h (with bacteremia)\n\u2022 Step-down: [Cephalexin](#/drug/cephalexin) 17 mg/kg PO TID\n\u2022 Low-risk 29-60d UTI: [Cephalexin](#/drug/cephalexin) 17 mg/kg PO TID (oral from start)\n\u2022 Total treatment: 10 days (IV + PO combined)',
        },
        {
            heading: 'Drug Level Monitoring',
            body: '\u2022 [Gentamicin](#/drug/gentamicin): trough before 3rd dose if >2 doses anticipated (goal <1 mcg/mL)\n\u2022 [Vancomycin](#/drug/vancomycin): trough before 4th dose (goal 15-20 mcg/mL for meningitis)\n\u2022 If extended antibiotic course anticipated, monitor renal function (BMP)',
        },
    ],
    citations: [
        { num: 1, text: 'Pantell RH, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.' },
        { num: 9, text: 'Dell Children\u2019s EBOC. Febrile Infant 0-60 Days Clinical Pathway. 2024.' },
    ],
};
// -------------------------------------------------------------------
// UTI Risk Factors & Screening (Peds Fever)
// -------------------------------------------------------------------
const PF_UTI_RISK_PAGE = {
    id: 'pf-uti-risk',
    title: 'UTI Risk Factors & Screening',
    subtitle: 'Age-specific screening criteria',
    sections: [
        {
            heading: 'Infants 0-2 Months',
            body: '\u2022 All febrile infants 0-2 months should have UA obtained\n\u2022 If UA positive \u2192 send catheterized urine culture\n\u2022 Bag specimens: acceptable for screening UA only, NEVER for culture',
        },
        {
            heading: 'Infants 2-6 Months (Female, Not Toilet-Trained)',
            body: 'UTI probability increases with number of risk factors:\n\n\u2022 Non-Black race\n\u2022 Temperature \u226539\u00b0C (102.2\u00b0F)\n\u2022 Fever \u22652 days\n\u2022 No other source identified\n\u2022 Age <12 months\n\n\u22652 risk factors \u2192 screen with UA',
        },
        {
            heading: 'Infants 2-6 Months (Male)',
            body: '\u2022 Uncircumcised \u2192 always screen with UA\n\u2022 Circumcised \u2192 screen if \u22653 of the female risk factors present\n\u2022 UTI prevalence in circumcised males is ~0.2% vs ~2% in uncircumcised',
        },
        {
            heading: 'Common Uropathogens',
            body: '**Gram-negative (most common):**\n\u2022 E. coli (80-90% of pediatric UTIs)\n\u2022 Klebsiella\n\u2022 Proteus (more common in males)\n\u2022 Enterobacter\n\u2022 Pseudomonas (consider if recent instrumentation)\n\n**Gram-positive:**\n\u2022 Enterococcus\n\u2022 Group B Streptococcus (neonates)\n\u2022 Staphylococcus saprophyticus (rare in infants)\n\n**Non-pathogens (likely contaminant):**\n\u2022 Lactobacillus\n\u2022 Coagulase-negative Staphylococcus\n\u2022 Corynebacterium',
        },
    ],
    citations: [
        { num: 1, text: 'Pantell RH, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.' },
        { num: 8, text: 'Roberts KB, et al. Urinary Tract Infection: Clinical Practice Guideline for the Diagnosis and Management of the Initial UTI in Febrile Infants and Children 2 to 24 Months. Pediatrics. 2011;128(3):595-610.' },
    ],
};
// -------------------------------------------------------------------
// UA Interpretation (Peds Fever)
// -------------------------------------------------------------------
const PF_UA_INTERPRET_PAGE = {
    id: 'pf-ua-interpret',
    title: 'UA Interpretation',
    subtitle: 'Positive UA criteria and culture thresholds',
    sections: [
        {
            heading: 'Positive UA Definition',
            body: '**ANY of the following:**\n\u2022 Leukocyte esterase (LE): trace or greater\n\u2022 Nitrites: positive (very specific but low sensitivity in infants)\n\u2022 WBC: >5/hpf (centrifuged) or >10/hpf (uncentrifuged)\n\u2022 Bacteria on Gram stain\n\nNote: In neonates <30 days, LE and nitrites have lower sensitivity. A negative UA does not rule out UTI in this age group if clinical suspicion is high.',
        },
        {
            heading: 'Culture Thresholds',
            body: '\u2022 Catheterized specimen: \u226550,000 CFU/mL (single organism) = positive\n\u2022 Suprapubic aspirate: any growth = positive\n\u2022 Bag specimen: NEVER use for culture (high false-positive rate, 85% contamination)\n\u2022 Mixed flora or multiple organisms \u2192 likely contamination \u2192 repeat if clinically indicated',
        },
        {
            heading: 'Enhanced UA (if available)',
            body: '\u2022 Cell count with differential (automated)\n\u2022 WBC >20 cells/\u00b5L suggests UTI\n\u2022 Bacteria >50,000/mL on flow cytometry\n\u2022 More sensitive than standard dipstick in young infants',
        },
        {
            heading: 'Clinical Correlation',
            body: '\u2022 Positive UA + positive culture = confirmed UTI \u2192 treat\n\u2022 Positive UA + negative culture = possible early/partially treated UTI or contamination\n\u2022 Negative UA + positive culture = possible UTI (especially neonates) \u2192 treat\n\u2022 Negative UA + negative culture = UTI excluded',
        },
    ],
    citations: [
        { num: 1, text: 'Pantell RH, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.' },
        { num: 8, text: 'Roberts KB, et al. Urinary Tract Infection: Clinical Practice Guideline for the Diagnosis and Management of the Initial UTI in Febrile Infants and Children 2 to 24 Months. Pediatrics. 2011;128(3):595-610.' },
    ],
};
// -------------------------------------------------------------------
// Discharge Criteria & Return Precautions (Peds Fever)
// -------------------------------------------------------------------
const PF_DISCHARGE_PAGE = {
    id: 'pf-discharge',
    title: 'Discharge Criteria & Return Precautions',
    subtitle: 'Checklist before ED discharge',
    shareable: true,
    sections: [
        {
            heading: 'ED Discharge Criteria (ALL must be met)',
            body: '\u2022 Well-appearing on exam\n\u2022 Tolerating oral liquids\n\u2022 Reliable caregiver with transportation\n\u2022 PCP or ED follow-up within 24 hours confirmed\n\u2022 Caregiver comfortable with home observation\n\u2022 Good social support (telephone access, reasonable proximity to ED)\n\u2022 Return precaution education completed and understood',
        },
        {
            heading: 'Return Precautions for Caregivers',
            body: 'Bring your baby back to the emergency department immediately if:\n\n\u2022 Temperature rises above 100.4\u00b0F (38\u00b0C) again\n\u2022 Baby becomes difficult to wake or unusually sleepy\n\u2022 Baby stops eating or drinking, or has fewer than 3 wet diapers in 24 hours\n\u2022 Baby develops a rash, especially blisters or purple spots\n\u2022 Baby has trouble breathing (fast breathing, grunting, ribs showing)\n\u2022 Baby is crying inconsolably and cannot be comforted\n\u2022 Baby seems limp, floppy, or weaker than usual\n\u2022 You are worried for any reason \u2014 trust your instincts',
        },
        {
            heading: 'Follow-Up Instructions',
            body: '\u2022 PCP or ED follow-up in 24 hours for repeat assessment\n\u2022 If blood cultures were sent: results typically available at 24-48h. If positive, you will be called to return.\n\u2022 If on antibiotics: complete the full course as prescribed\n\u2022 Monitor temperature at home: rectal thermometer is most accurate for infants',
        },
    ],
    citations: [
        { num: 1, text: 'Pantell RH, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.' },
        { num: 9, text: 'Dell Children\u2019s EBOC. Febrile Infant 0-60 Days Clinical Pathway. 2024.' },
    ],
};
// -------------------------------------------------------------------
// Bronchiolitis — NOT Recommended Interventions
// -------------------------------------------------------------------
const BRONCH_NOT_RECOMMENDED = {
    id: 'bronch-not-recommended',
    title: 'NOT Recommended Interventions',
    subtitle: 'Evidence-Based Exclusions — Bronchiolitis',
    sections: [
        {
            heading: 'Labs & Diagnostics — NOT Recommended',
            body: 'The following are **NOT recommended** in routine bronchiolitis:\n\n\u2022 **Chest X-ray** — Does not change management. Leads to inappropriate antibiotic use [1][2]\n\u2022 **Viral testing** — Does not change management in uncomplicated bronchiolitis [1]\n\u2022 **CBC / Blood culture** — Not recommended in well-appearing infants >90 days of age [1]',
        },
        {
            heading: 'Treatments — NOT Recommended',
            body: '\u2022 **Albuterol / bronchodilators** — No benefit in bronchiolitis. Not the same mechanism as asthma [5]\n\u2022 **Epinephrine (racemic)** — Not recommended for routine use\n\u2022 **Systemic or inhaled corticosteroids** — No benefit. Do not reduce admission rates or LOS [1]\n\u2022 **Antibiotics** — Bronchiolitis is viral. Antibiotics do not help unless secondary bacterial infection confirmed [7]\n\u2022 **Hypertonic saline (3%)** — Mixed evidence, not recommended in the ED setting [6]\n\u2022 **Chest physiotherapy** — No benefit. May worsen respiratory distress [8]\n\u2022 **Deep suction beyond nasopharynx** — Harmful. Use gentle superficial nasal suction only [1]',
        },
    ],
    citations: [
        { num: 1, text: 'Ralston SL, et al. Clinical Practice Guideline: The Diagnosis, Management, and Prevention of Bronchiolitis. Pediatrics. 2014;134(5):e1474-e1502.' },
        { num: 2, text: 'Christakis DA, et al. Variation in Inpatient Diagnostic Testing and Management of Bronchiolitis. Pediatrics. 2005;115(4):878-84.' },
        { num: 5, text: 'Gadomski AM, Scribani MB. Bronchodilators for Bronchiolitis. Cochrane Database Syst Rev. 2014;(6):CD001266.' },
        { num: 6, text: 'Zhang L, et al. Nebulized Hypertonic Saline for Acute Bronchiolitis. Cochrane Database Syst Rev. 2017;(12):CD006458.' },
        { num: 7, text: 'Spurling GK, et al. Antibiotics for Bronchiolitis in Children. Cochrane Database Syst Rev. 2011;(6):CD005189.' },
        { num: 8, text: 'Perrotta C, et al. Chest Physiotherapy for Acute Bronchiolitis. Cochrane Database Syst Rev. 2012;(2):CD004873.' },
    ],
};
// -------------------------------------------------------------------
// Bronchiolitis — HFNC Protocol Reference
// -------------------------------------------------------------------
const BRONCH_HFNC_PROTOCOL = {
    id: 'bronch-hfnc-protocol',
    title: 'HFNC Protocol Reference',
    subtitle: 'Weight-Based Flow Rates & Monitoring',
    sections: [
        {
            heading: 'Starting Flow Rates',
            body: '\u2022 **<7 kg:** 4 LPM\n\u2022 **7\u20139 kg:** 6 LPM\n\u2022 **>9 kg:** 6 LPM\n\nStart FiO\u2082 at 21%, titrate to maintain SpO\u2082 \u226590% awake or \u226588% asleep.',
        },
        {
            heading: 'Maximum Flow Rates',
            body: '\u2022 **\u22647 kg:** 2 LPM/kg (e.g., 5 kg = 10 LPM, 7 kg = 14 LPM)\n\u2022 **>7 kg:** 14 LPM\n\nEscalate by 2 LPM at a time. Monitor for signs of excess flow.',
        },
        {
            heading: 'Monitoring',
            body: '\u2022 **Initiation:** Q15 min assessment \u2014 BAS score, RR, pulse ox, WOB\n\u2022 **Maintenance:** Continuous pulse ox. Suction PRN. BAS Q4h or per PEWS.\n\u2022 Document HR, RR, pulse ox.',
        },
        {
            heading: 'Contraindications',
            body: '\u2022 Nasal obstruction\n\u2022 Ingestion/toxins\n\u2022 Life-threatening hypoxia, apnea, or hemodynamic instability\n\u2022 Trauma (maxillofacial, suspected base of skull fracture, chest)\n\u2022 Pneumothorax\n\u2022 Foreign body aspiration',
        },
        {
            heading: 'Proceed with Caution',
            body: '\u2022 Decreased level of consciousness\n\u2022 Congenital heart disease\n\u2022 Asthma\n\u2022 Chronic lung disease',
        },
        {
            heading: 'Critical Care Consult Triggers',
            body: '\u2022 Any patient worsening after 60 minutes on HFNC\n\u2022 Severe respiratory distress on HFNC\n\u2022 FiO\u2082 >50%\n\u2022 Flow rates above recommended parameters\n\u2022 Apnea\n\u2022 **NICU consideration:** <44 weeks corrected gestational age, prematurity <32 weeks and <44 weeks post-menstrual age',
        },
    ],
    citations: [
        { num: 1, text: 'Dell Children\'s Medical Center EBOC. Bronchiolitis Clinical Pathway. Rev Oct 2019.' },
        { num: 2, text: 'Dell Children\'s Medical Center EBOC. HFNC Initiation, Maintenance, and Weaning Pathway. Rev Nov 2021.' },
        { num: 3, text: 'New South Wales Ministry of Health. Humidified High Flow Nasal Cannula Oxygen Guideline for Metropolitan Pediatric Wards and EDs. 2016.' },
    ],
};
// -------------------------------------------------------------------
// Bronchiolitis — HFNC Weaning & Holiday Protocol
// -------------------------------------------------------------------
const BRONCH_HFNC_WEANING = {
    id: 'bronch-hfnc-weaning',
    title: 'HFNC Weaning & Holiday Protocol',
    subtitle: 'Stepwise De-escalation',
    sections: [
        {
            heading: 'Prerequisites for Weaning',
            body: '\u2022 Stable on current HFNC settings for **\u22654 hours**\n\u2022 BAS consistently <9\n\u2022 Adequate oral intake or stable on NG/IV fluids',
        },
        {
            heading: 'Weaning Steps',
            body: '\u2022 O\u2082 wean first \u2014 decrease FiO\u2082 to maintain SpO\u2082 goals\n\u2022 Flow wean by physician order \u2014 generally not until stabilized 8\u201312 hours\n\u2022 Decrease flow by **2 LPM every 4 hours**\n\u2022 Change to nasal cannula when on 2 LPM for 4 hours\n\u2022 If BAS \u22659 after decrease, return to previous flow rate',
        },
        {
            heading: 'Holiday Protocol — Eligibility Criteria',
            body: '**All must be met:**\n\u2022 FiO\u2082 <40%\n\u2022 SpO\u2082 >90% awake and >88% asleep\n\u2022 HR within normal limits while calm\n\u2022 BAS <9\n\n**Exclusions:**\n\u2022 Born <32 weeks gestation\n\u2022 Cardiac disease requiring home medications\n\u2022 Chronic lung disease or on home oxygen\n\u2022 Significant neuromuscular disease',
        },
        {
            heading: 'Holiday Protocol — Procedure',
            body: '**Start Holiday BID:**\n\u2022 FiO\u2082 >21%: change to 2 LPM at 100%\n\u2022 FiO\u2082 at 21%: take off HFNC, keep on room air\n\u2022 Monitor in room minimum 5 minutes \u2014 if immediate deterioration, return to previous settings\n\n**Reassess within 30\u201360 minutes:**',
        },
        {
            heading: 'Holiday Outcomes',
            body: '**PASS:** HR, RR, WOB acceptable AND SpO\u2082 >90% \u2192 Wean NC 1 LPM or stay on room air\n\n**PASS TO LFNC:** HR, RR, WOB acceptable BUT SpO\u2082 <90% awake / 88% asleep \u2192 Titrate nasal cannula up to 2 LPM\n\n**NO PASS (Clinical Decompensation):** Severe WOB, HR increase >20 bpm, RR increase by 10 \u2192 Return to previous HFNC settings',
        },
    ],
    citations: [
        { num: 1, text: 'Dell Children\'s Medical Center EBOC. HFNC Initiation, Maintenance, and Weaning Pathway. Rev Nov 2021.' },
    ],
};
// -------------------------------------------------------------------
// Bronchiolitis — HFNC Feeding Guidelines
// -------------------------------------------------------------------
const BRONCH_FEEDING = {
    id: 'bronch-feeding',
    title: 'HFNC Feeding Guidelines',
    subtitle: 'Nutrition Management During Respiratory Support',
    sections: [
        {
            heading: 'Initial Assessment',
            body: 'Upon initiation of HFNC, the child should remain **NPO for approximately 1 hour** to assess clinical response. The attending physician will then determine the appropriate method of nutrition.',
        },
        {
            heading: 'Hydration Options',
            body: 'If hydration status is of concern:\n\u2022 **Nasogastric tube (NGT)** \u2014 recommend initial trial of Pedialyte before EBM or formula\n\u2022 **IV fluids (IVF)**\n\u2022 **NGT + IVF**\n\u2022 **Nasojejunal tube (NJT)**',
        },
        {
            heading: 'Feeding by BAS Score',
            body: '\u2022 **Mild (BAS 0\u20133):** May resume PO feeds. First feed observed by staff.\n\u2022 **Moderate to Severe (BAS 4\u201312):** Consider NG feeds.',
        },
        {
            heading: 'When to Make NPO',
            body: 'If PO feeds have been started, make NPO and consider alternatives if:\n\u2022 Choking/gasping and/or increased WOB during or acutely after PO feeding\n\u2022 Respiratory rate consistently >60 beyond 15 minutes\n\u2022 Child is titrated to maximum HFNC flow rate for weight\n\nAt any time, the physician may make the child NPO and hydrate by other means.',
        },
    ],
    citations: [
        { num: 1, text: 'Dell Children\'s Medical Center EBOC. Bronchiolitis Clinical Pathway. Rev Oct 2019.' },
    ],
};
// -------------------------------------------------------------------
// Bronchiolitis — Hospital Admission Criteria
// -------------------------------------------------------------------
const BRONCH_ADMISSION_CRITERIA = {
    id: 'bronch-admission-criteria',
    title: 'Hospital Admission Criteria',
    subtitle: 'Level of Care Assignment',
    sections: [
        {
            heading: 'Acute Care Unit',
            body: '\u2022 Routine bronchiolitis management\n\u2022 FiO\u2082 <50% to maintain SaO\u2082 \u226590% awake or \u226588% asleep\n\u2022 Continuation of care when transferred from higher acuity unit\n\u2022 HFNC at standard flow rates',
        },
        {
            heading: 'Acute Care Unit with High Acuity Status',
            body: '\u2022 Significant cardiac or pulmonary comorbidities\n\u2022 Moderate to severe symptoms (see BAS scoring)\n\u2022 Worsening clinical status despite increasing flow rates\n\u2022 Comorbidities requiring discussion between provider and charge RN',
        },
        {
            heading: 'PICU',
            body: '\u2022 Any patient with worsening clinical status after **60 minutes** of HFNC\n\u2022 Requiring positive pressure ventilation\n\u2022 Witnessed episode of apnea\n\u2022 Flow rates above maximum recommended levels\n\u2022 Severe dehydration or shock',
        },
        {
            heading: 'NICU Consideration',
            body: '\u2022 Patients not meeting acute care or high acuity criteria and currently <44 weeks corrected gestational age\n\u2022 Prematurity \u226432 weeks gestation and currently <44 weeks post-menstrual age',
        },
    ],
    citations: [
        { num: 1, text: 'Dell Children\'s Medical Center EBOC. Bronchiolitis Clinical Pathway. Rev Oct 2019.' },
    ],
};
// -------------------------------------------------------------------
// Bronchiolitis — Parent Info (English)
// -------------------------------------------------------------------
const BRONCH_PARENT_EN = {
    id: 'bronch-parent-en',
    title: 'Bronchiolitis: What You Need to Know',
    subtitle: 'Parent/Caregiver Information',
    shareable: true,
    sections: [
        {
            heading: 'What Is Bronchiolitis?',
            body: 'Bronchiolitis is an infection of the small airway tubes (bronchioles) in the lungs. The airways become swollen and fill with mucus, causing a stuffy nose, coughing, wheezing, or difficulty breathing.\n\nIt is caused by a virus \u2014 the same viruses that cause common colds. It mostly affects children under 2 years old because they have smaller airways. It usually goes away on its own in 2 to 3 weeks.',
        },
        {
            heading: 'Symptoms',
            body: '\u2022 Breathing harder or faster\n\u2022 Runny or stuffy nose\n\u2022 Wheezing\n\u2022 Fever\n\u2022 Cough that may get worse',
        },
        {
            heading: 'What Can I Do at Home?',
            body: '1. **Watch your child\u2019s breathing.** Always call your doctor if you are not comfortable caring for your child at home.\n\n2. **Fluids are important.** Offer small amounts often. Ask your doctor about Pedialyte if your child is not drinking milk or formula well.\n\n3. **Suction the nose** to help your child breathe, eat, and sleep better. Use saline drops (2\u20133 drops in each nostril) before suctioning with a bulb syringe.',
        },
        {
            heading: 'Signs of Dehydration',
            body: 'Watch for:\n\u2022 No tears when crying\n\u2022 Fewer wet diapers\n\u2022 Dark-colored urine\n\u2022 Dry mouth, tongue, or lips',
        },
        {
            heading: 'Do NOT Use These Treatments',
            body: '1. **No cough or cold medicines** \u2014 they do not work for bronchiolitis and are not safe for young children.\n2. **No antibiotics** \u2014 they do not kill viruses.\n3. **No breathing treatments** (such as albuterol) \u2014 they do not help bronchiolitis.',
        },
        {
            heading: 'When to Call Your Doctor',
            body: '\u2022 Having a harder time breathing\n\u2022 Not eating or drinking as usual\n\u2022 Sleepy, drowsy, or less active\n\u2022 Crying or restless and cannot be calmed\n\u2022 Fever of 100.4\u00b0F (38.0\u00b0C) or higher',
        },
        {
            heading: 'Call 911 or Go to the ER If Your Child:',
            body: '\u2022 Has pale skin or a blue color around nails or lips\n\u2022 Is breathing fast and shallow\n\u2022 Is struggling for each breath\n\u2022 The space between ribs sinks in with each breath\n\u2022 Is making a grunting sound when breathing\n\u2022 Has a limp or floppy body\n\u2022 Is sleepy all the time, even after a nap',
        },
        {
            heading: 'Stop the Spread',
            body: 'Wash your hands:\n\u2022 After caring for your child\n\u2022 Before cooking or eating\n\u2022 After blowing your nose, coughing, or sneezing\n\n**No smoking around your child.** Cigarette smoke irritates infected airways and makes it harder to breathe.',
        },
    ],
    citations: [
        { num: 1, text: 'Children\'s Hospital Association of Texas. Bronchiolitis Patient Education Brochure.' },
    ],
};
// -------------------------------------------------------------------
// Bronchiolitis — Parent Info (Spanish)
// -------------------------------------------------------------------
const BRONCH_PARENT_ES = {
    id: 'bronch-parent-es',
    title: 'Bronquiolitis: Lo Que Necesita Saber',
    subtitle: 'Informaci\u00f3n para Padres y Cuidadores',
    shareable: true,
    sections: [
        {
            heading: '\u00bfQu\u00e9 es la bronquiolitis?',
            body: 'La bronquiolitis es una infecci\u00f3n de las peque\u00f1as v\u00edas respiratorias (bronquiolos) en los pulmones. Las v\u00edas respiratorias se inflaman y se llenan de mucosidad, causando tos, sibilancia o dificultad para respirar.\n\nEs causada por un virus \u2014 los mismos virus que causan los resfriados comunes. Afecta principalmente a ni\u00f1os menores de 2 a\u00f1os. Generalmente desaparece por s\u00ed misma en 2 a 3 semanas.',
        },
        {
            heading: 'S\u00edntomas',
            body: '\u2022 Respiraci\u00f3n m\u00e1s r\u00e1pida o dif\u00edcil\n\u2022 Secreci\u00f3n o congesti\u00f3n nasal\n\u2022 Sibilancia o silbido\n\u2022 Fiebre\n\u2022 Tos que podr\u00eda empeorar',
        },
        {
            heading: '\u00bfQu\u00e9 puedo hacer en casa?',
            body: '1. **Observe la respiraci\u00f3n de su hijo/a.** Siempre llame a su m\u00e9dico si no se siente c\u00f3modo cuidando a su hijo/a en casa.\n\n2. **Los l\u00edquidos son importantes.** Ofrezca peque\u00f1as cantidades con frecuencia. Pregunte a su m\u00e9dico sobre Pedialyte si su hijo/a no est\u00e1 tomando bien la leche o f\u00f3rmula.\n\n3. **Limpie la nariz** para ayudar a su hijo/a a respirar, comer y dormir mejor. Use gotas de soluci\u00f3n salina (2\u20133 gotas en cada fosa nasal) antes de succionar con la pera de succi\u00f3n.',
        },
        {
            heading: 'Se\u00f1ales de Deshidrataci\u00f3n',
            body: 'Preste atenci\u00f3n a:\n\u2022 Ausencia de l\u00e1grimas al llorar\n\u2022 Menos pa\u00f1ales mojados\n\u2022 Orina de color oscuro\n\u2022 Boca, lengua o labios secos',
        },
        {
            heading: 'Tratamientos que NO Debe Usar',
            body: '1. **No use medicamentos para la tos o el resfriado** \u2014 no funcionan contra la bronquiolitis y no son seguros para ni\u00f1os peque\u00f1os.\n2. **No use antibi\u00f3ticos** \u2014 no matan los virus.\n3. **No use tratamientos respiratorios** (como albuterol) \u2014 no ayudan con la bronquiolitis.',
        },
        {
            heading: 'Cu\u00e1ndo Llamar a su M\u00e9dico',
            body: '\u2022 Tiene mucha dificultad para respirar\n\u2022 No come ni bebe como lo hace normalmente\n\u2022 Est\u00e1 adormitado, mareado o menos activo\n\u2022 Llora o est\u00e1 inquieto y no puede calmarlo\n\u2022 Tiene fiebre de 100.4\u00b0F (38.0\u00b0C) o m\u00e1s',
        },
        {
            heading: 'Llame al 911 o Vaya a Urgencias Si Su Hijo/a:',
            body: '\u2022 Se ve p\u00e1lido o tiene un color azul en las u\u00f1as o alrededor de los labios\n\u2022 Su respiraci\u00f3n es r\u00e1pida o superficial\n\u2022 Se esfuerza en cada respiraci\u00f3n\n\u2022 Tiene un espacio entre las costillas que se hunde con cada respiraci\u00f3n\n\u2022 Hace un sonido como gru\u00f1ido cuando respira\n\u2022 Tiene el cuerpo d\u00e9bil o fl\u00e1cido\n\u2022 Est\u00e1 somnoliento todo el tiempo, incluso despu\u00e9s de una siesta',
        },
        {
            heading: 'Detenga el Contagio',
            body: 'L\u00e1vese las manos:\n\u2022 Despu\u00e9s de atender a su hijo/a\n\u2022 Antes de comer\n\u2022 Despu\u00e9s de sonarse, toser o estornudar\n\n**No fume cerca del ni\u00f1o/a.** El humo de cigarro es muy irritante para las v\u00edas respiratorias infectadas.',
        },
    ],
    citations: [
        { num: 1, text: 'Children\u2019s Hospital Association of Texas. Folleto de Educaci\u00f3n al Paciente sobre Bronquiolitis.' },
    ],
};
// -------------------------------------------------------------------
// Precipitous Delivery — Delivery Steps Summary
// -------------------------------------------------------------------
const PRECIP_DELIVERY_SUMMARY = {
    id: 'precip-delivery-summary',
    title: 'Delivery Steps Summary',
    subtitle: 'Quick-reference checklist for ED precipitous delivery',
    sections: [
        {
            heading: 'Preparation',
            body: '• [Page OB and Pediatrics STAT — assign team roles](#/node/precip-callhelp)\n• [Gather delivery equipment and position patient](#/node/precip-equipment)\n• [Confirm vertex presentation with bedside U/S if time permits](#/node/precip-equipment)',
        },
        {
            heading: 'Stage 2 — Delivering the Baby',
            body: '• [Coach pushing: deep breath → bear down 10 sec × 3 per contraction](#/node/precip-coaching)\n• [Support perineum, control occiput — slow, controlled head delivery](#/node/precip-head)\n• [Sweep finger around neck — check for nuchal cord](#/node/precip-nuchal)\n• [If tight cord → double clamp and cut](#/node/precip-nuchal-cut)\n• [Deliver shoulders: gentle downward then upward traction](#/node/precip-shoulders)\n• [If turtle sign → Shoulder Dystocia emergency](#/tree/shoulder-dystocia)',
        },
        {
            heading: 'Cord & Baby',
            body: '• [Clamp cord in two places, cut between — delayed clamping 30–60 sec if vigorous](#/node/precip-cord)\n• [Place baby skin-to-skin, dry and stimulate, APGAR at 1 and 5 min](#/node/precip-baby)\n• [If not breathing or HR <100 → initiate NRP](#/node/precip-baby)',
        },
        {
            heading: 'Stage 3 — Placenta & Postpartum',
            body: '• [Gentle cord traction + counter-pressure on fundus — never force](#/node/precip-placenta)\n• [Inspect placenta for completeness — save for pathology](#/node/precip-placenta-exam)\n• [Start Oxytocin 20 units in 1L NS at 250 mL/hr — bimanual massage](#/node/precip-oxytocin)\n• [Assess lacerations: repair 1st/2nd degree, defer 3rd/4th to OB](#/node/precip-lacerations)\n• [Monitor mom × 1 hour: uterine tone, bleeding, vitals q15 min](#/node/precip-complete)',
        },
    ],
    citations: [
        { num: 1, text: 'Pope KS, Tibbles CD. Precipitous Delivery. In: Walls RM, ed. Rosen\'s Emergency Medicine. 9th ed. Elsevier; 2018.' },
        { num: 2, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation (NRP). 8th ed. AAP; 2021.' },
    ],
};
// -------------------------------------------------------------------
// Shoulder Dystocia — Steps Summary
// -------------------------------------------------------------------
const SD_SUMMARY = {
    id: 'sd-summary',
    title: 'Shoulder Dystocia Steps Summary',
    subtitle: 'Quick-reference escalation checklist — know the maneuvers before you need them',
    sections: [
        {
            heading: '1. Recognize',
            body: '• [Turtle sign — fetal head retracts against perineum after delivery](#/node/sd-start)\n• [Failure to deliver body with standard traction and pushing](#/node/sd-start)',
        },
        {
            heading: '2. Initial Response',
            body: '• [Announce "shoulder dystocia" — call OB, Peds/NICU, Anesthesia](#/node/sd-initial)\n• [Start the clock — designate timekeeper (call out every 30 sec)](#/node/sd-initial)\n• [You have ~4–5 minutes before hypoxic injury risk](#/node/sd-initial)',
        },
        {
            heading: '3. First-Line (resolves 50–60%)',
            body: '• [McRoberts maneuver — sharply flex legs onto abdomen](#/node/sd-mcroberts)\n• [Suprapubic pressure — fist above pubic bone, push shoulder to oblique](#/node/sd-mcroberts)',
        },
        {
            heading: '4. Second-Line (if first-line fails)',
            body: '• [Wood\'s screw — rotate posterior shoulder 180° in corkscrew fashion](#/node/sd-rotational)\n• [Rubin\'s — push posterior shoulder to flex across chest](#/node/sd-rotational)\n• [Posterior arm delivery — sweep arm across fetal chest](#/node/sd-posterior-arm)',
        },
        {
            heading: '5. Last Resort',
            body: '• [Zavanelli — push head back in, emergency C-section](#/node/sd-last-resort)\n• [All-fours (Gaskin) — mother on hands and knees](#/node/sd-last-resort)\n• [Deliberate clavicle fracture / Symphysiotomy / Abdominal rescue](#/node/sd-last-resort)',
        },
        {
            heading: 'Post-Delivery',
            body: '• [Neonatal assessment — Apgar, check for brachial plexus palsy and fractures](#/node/sd-resolved)\n• [Maternal assessment — lacerations, hemorrhage](#/node/sd-resolved)\n• [Document all maneuvers, timing, and personnel](#/node/sd-resolved)',
        },
    ],
    citations: [
        { num: 1, text: 'ACOG Practice Bulletin No. 40: Shoulder Dystocia. 2002 (Reaffirmed 2015).' },
        { num: 2, text: 'Gherman RB, et al. The McRoberts\' maneuver for shoulder dystocia. Am J Obstet Gynecol. 1997.' },
    ],
};
// -------------------------------------------------------------------
// A-Fib RVR — Steps Summary
// -------------------------------------------------------------------
const AFIB_SUMMARY = {
    id: 'afib-summary',
    title: 'A-Fib RVR Management Steps',
    subtitle: 'Quick-reference for rate control, cardioversion, and anticoagulation',
    sections: [
        {
            heading: '1. Initial Assessment',
            body: '• [Confirm A-Fib RVR on 12-lead ECG — identify precipitants](#/node/afib-start)\n• [Assess hemodynamic stability](#/node/afib-stability)',
        },
        {
            heading: '2. Unstable — Cardiovert',
            body: '• [Screen for WPW — if yes, AV nodal blockers are CONTRAINDICATED](#/node/afib-unstable-wpw)\n• [Synchronized cardioversion 200J biphasic + sedation](#/node/afib-cardioversion-protocol)',
        },
        {
            heading: '3. Stable — Rate Control',
            body: '• [Beta-blocker (Metoprolol) or CCB (Diltiazem) — do NOT combine](#/node/afib-stable-drugs)\n• [CCB contraindicated if EF ≤40% or decompensated HF](#/node/afib-stable-drugs)\n• [IV Magnesium as adjunct — blocks slow Ca channels at AV node](#/node/afib-stable-drugs)',
        },
        {
            heading: '4. Refractory — Escalate',
            body: '• [Add IV Magnesium, Digoxin, or switch to Amiodarone](#/node/afib-refractory)\n• [Consider rhythm control if rate control fails](#/node/afib-rhythm-control)',
        },
        {
            heading: '5. Anticoagulation',
            body: '• [NOAF — generally do NOT anticoagulate (will revert)](#/node/afib-noaf-anticoag)\n• [Known/Chronic AF — CHA₂DS₂-VASc score guides anticoagulation](#/node/afib-cha2ds2vasc)',
        },
        {
            heading: '6. Disposition',
            body: '• [Continue agent that achieved rate control — target HR <100–110](#/node/afib-disposition)\n• [Cardiology follow-up for new-onset AF or refractory symptoms](#/node/afib-disposition)',
        },
    ],
    citations: [
        { num: 1, text: 'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for Atrial Fibrillation. J Am Coll Cardiol. 2024.' },
    ],
};
// -------------------------------------------------------------------
// PE Treatment — Steps Summary
// -------------------------------------------------------------------
const PE_SUMMARY = {
    id: 'pe-summary',
    title: 'PE Treatment Steps Summary',
    subtitle: 'Risk stratification and management by hemodynamic status',
    sections: [
        {
            heading: '1. Risk Stratify',
            body: '• [Assess hemodynamic stability (SBP <90 = high risk)](#/node/pe-hemodynamics)\n• [Evaluate RV function on echo or CTPA](#/node/pe-rv)\n• [Check troponin for myocardial injury](#/node/pe-troponin-rv-pos)\n• [PESI/sPESI for clinical severity](#/node/pe-severity)',
        },
        {
            heading: '2. High Risk (Unstable)',
            body: '• [Start IV heparin (bolus 80 u/kg then 18 u/kg/hr)](#/node/pe-high-heparin)\n• [Screen for thrombolytic contraindications](#/node/pe-high-lytic-check)\n• [Alteplase 100 mg over 2 hours — stop heparin during infusion](#/node/pe-high-lytic-protocol)\n• [If thrombolysis fails → mechanical thrombectomy, CDT, or ECMO](#/node/pe-high-respond-no)',
        },
        {
            heading: '3. Intermediate-High Risk',
            body: '• [IV heparin + evaluate reperfusion strategy](#/node/pe-int-high-strategy)\n• [CDT/EKOS for moderate clot, CDT + mechanical for severe/proximal](#/node/pe-int-high-strategy)\n• [Monitor on systemic heparin trial if stable](#/node/pe-int-high-heparin)',
        },
        {
            heading: '4. Intermediate-Low Risk',
            body: '• [Start anticoagulation — UFH or LMWH (enoxaparin)](#/node/pe-int-low-treat)\n• [Monitor for clinical worsening — escalate if needed](#/node/pe-int-low-treat)',
        },
        {
            heading: '5. Low Risk',
            body: '• [Anticoagulate — UFH, LMWH, or oral DOAC](#/node/pe-low-treat)\n• [Consider outpatient management if all discharge criteria met](#/node/pe-low-treat)',
        },
    ],
    citations: [
        { num: 1, text: 'Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020.' },
    ],
};
// -------------------------------------------------------------------
// Hyperkalemia — Steps Summary
// -------------------------------------------------------------------
const K_SUMMARY = {
    id: 'k-summary',
    title: 'Potassium Disorders Steps Summary',
    subtitle: 'Stepwise management of hyperkalemia and hypokalemia',
    sections: [
        {
            heading: '1. Initial Assessment',
            body: '• [Check K+ level — classify as hyperK, hypoK, or borderline](#/node/k-start)\n• [Rule out pseudohyperkalemia if result is unexpected](#/node/k-pseudo)\n• [Get ECG immediately for any hyperkalemia](#/node/k-hyper-ecg)',
        },
        {
            heading: '2. Severe HyperK — Temporize (all simultaneously)',
            body: '• [IV Calcium (Gluconate 3g or Chloride 1g) — membrane stabilization](#/node/k-hyper-calcium)\n• [Regular Insulin 5 units IV + Dextrose — intracellular K+ shift](#/node/k-hyper-insulin)\n• [Terbutaline 0.5 mg SQ or Albuterol 10–20 mg neb — K+ shift](#/node/k-hyper-beta2)',
        },
        {
            heading: '3. Volume Resuscitate',
            body: '• [Bicarb <22 → isotonic bicarbonate as resuscitative fluid](#/node/k-hyper-bicarb)\n• [Bicarb ≥22 → LR or Plasmalyte. Do NOT use normal saline](#/node/k-hyper-step2)',
        },
        {
            heading: '4. Kaliuresis + Elimination',
            body: '• [Furosemide ± thiazide ± acetazolamide ± fludrocortisone ("nephron bomb")](#/node/k-hyper-step3)\n• [Lokelma (SZC) 10g PO q8h — mild adjunct, do not rely on alone](#/node/k-hyper-step4)\n• [Dialysis if anuric or all other measures fail](#/node/k-hyper-step5)',
        },
        {
            heading: '5. Hypokalemia',
            body: '• [Severe (K+ ≤2.5) → KCl 5–10 mEq IV over 15–30 min with cardiac monitoring](#/node/k-hypo-severe)\n• [Mild-Moderate → KCl 20–40 mEq PO](#/node/k-hypo-mild)\n• [Always check and correct magnesium — hypoMg makes K+ repletion refractory](#/node/k-hypo-severe)',
        },
    ],
    citations: [
        { num: 1, text: 'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024.' },
    ],
};
// -------------------------------------------------------------------
// Acute Ischemic Stroke — Steps Summary
// -------------------------------------------------------------------
const STROKE_SUMMARY = {
    id: 'stroke-summary',
    title: 'Ischemic Stroke Steps Summary',
    subtitle: 'Time-critical reperfusion pathway — every minute counts',
    sections: [
        {
            heading: '1. Immediate Actions',
            body: '• [Fingerstick glucose (only required pre-tPA lab)](#/node/stroke-start)\n• [NIHSS score — disabling if ≥6](#/node/stroke-deficit)\n• [Establish last known well time](#/node/stroke-timing)\n• [CT head non-contrast to rule out hemorrhage](#/node/stroke-start)',
        },
        {
            heading: '2. Standard IVT Window (0–4.5h)',
            body: '• [Review thrombolysis contraindications — BP must be <185/110](#/node/stroke-ivt-check)\n• [Tenecteplase 0.25 mg/kg IV bolus (preferred) or Alteplase 0.9 mg/kg](#/node/stroke-ivt-treat)\n• [Post-tPA: BP <180/105 × 24h, neuro checks q15min, no antithrombotics × 24h](#/node/stroke-ivt-treat)',
        },
        {
            heading: '3. Extended Window + EVT',
            body: '• [4.5–9h → perfusion imaging for IVT eligibility (EXTEND criteria)](#/node/stroke-extended-ivt)\n• [LVO on CTA → activate neurointerventional team for EVT](#/node/stroke-evt-eligible)\n• [EVT window up to 24h with LVO + favorable perfusion (DAWN/DEFUSE-3)](#/node/stroke-evt-window)',
        },
        {
            heading: '4. Minor Stroke (NIHSS 0–5)',
            body: '• [ABCD2 ≥4 or infarct → DAPT: Aspirin 325 + Clopidogrel 300 load](#/node/stroke-dapt)\n• [Low risk → single antiplatelet (Aspirin)](#/node/stroke-single-antiplatelet)',
        },
        {
            heading: '5. Secondary Prevention',
            body: '• [AF detected → DOAC (Apixaban or Rivaroxaban), do NOT bridge with heparin](#/node/stroke-afib)\n• [Carotid stenosis 70–99% → CEA within 2 weeks](#/node/stroke-atherosclerotic)\n• [High-intensity statin for all, BP target <130/80](#/node/stroke-other-prevention)',
        },
    ],
    citations: [
        { num: 1, text: 'Powers WJ, et al. 2019 Guidelines for Early Management of Acute Ischemic Stroke. Stroke. 2019.' },
    ],
};
// -------------------------------------------------------------------
// Pneumothorax POCUS — Steps Summary
// -------------------------------------------------------------------
const PTX_SUMMARY = {
    id: 'ptx-summary',
    title: 'Pneumothorax POCUS Steps Summary',
    subtitle: 'Sequential sonographic signs for bedside pneumothorax diagnosis',
    sections: [
        {
            heading: 'Setup',
            body: '• [High-frequency linear probe, longitudinal, anterior chest 3rd–4th ICS MCL](#/node/pneumothorax-start)\n• [Patient supine — free air rises anteriorly](#/node/pneumothorax-start)',
        },
        {
            heading: 'Step 1: Lung Sliding',
            body: '• [Lung sliding PRESENT → pneumothorax excluded at this location](#/node/ptx-lung-sliding)\n• [Lung sliding ABSENT → proceed to B-line assessment](#/node/ptx-lung-sliding)',
        },
        {
            heading: 'Step 2: B-Lines',
            body: '• [B-lines present (even without sliding) → NOT pneumothorax](#/node/ptx-blines-check)\n• [No B-lines + no sliding (A-lines only) → high suspicion for PTX](#/node/ptx-a-profile)',
        },
        {
            heading: 'Step 3: Lung Point',
            body: '• [Scan laterally — find transition zone where sliding resumes](#/node/ptx-lung-point)\n• [Lung point found → PNEUMOTHORAX CONFIRMED (100% specific, pathognomonic)](#/node/ptx-confirmed)\n• [Location estimates size: anterior=small, lateral=moderate, posterior=large](#/node/ptx-confirmed)',
        },
        {
            heading: 'Step 4: M-Mode',
            body: '• [Barcode/stratosphere sign → highly suggestive (no lung movement)](#/node/ptx-mmode)\n• [Seashore sign → normal lung movement, reassess findings](#/node/ptx-reassess)',
        },
    ],
    citations: [
        { num: 1, text: 'Lichtenstein DA, et al. Ultrasound Diagnosis of Occult Pneumothorax. Crit Care Med. 2005.' },
    ],
};
// -------------------------------------------------------------------
// Page Registry
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// Neonatal Resuscitation (NRP) — Steps Summary
// -------------------------------------------------------------------
const NRP_SUMMARY = {
    id: 'nrp-summary',
    title: 'NRP Steps Summary',
    subtitle: 'Quick-reference checklist for neonatal resuscitation',
    sections: [
        {
            heading: '1. Preparation',
            body: '• [Assign team roles — leader, airway, compressor, meds, recorder](#/node/nrp-preparation)\n• [Monitoring setup: SpO2 right wrist (preductal), temp over liver](#/node/nrp-preparation)\n• [Equipment: radiant warmer ON, T-piece, pulse ox, suction, intubation kit, UVC kit](#/node/nrp-preparation)\n• [Cord management plan: DCC 30-60s vigorous, ICM ≥35wk non-vigorous](#/node/nrp-cord-mgmt)',
        },
        {
            heading: '2. Initial Evaluation',
            body: '• [Three questions: Term? Breathing/Crying? Good Tone?](#/node/nrp-initial-eval)\n• [Yes to ALL → routine care (skin-to-skin, DCC, warmth)](#/node/nrp-routine)\n• [No to ANY → proceed to initial steps](#/node/nrp-initial-steps)',
        },
        {
            heading: '3. Initial Steps — Golden 30 Seconds',
            body: '• [Warm (radiant heater, NO blankets), Dry, Position (sniffing), Stimulate (flick feet, rub back)](#/node/nrp-initial-steps)\n• [Clear airway PRN — mouth then nose, avoid vigorous suctioning](#/node/nrp-initial-steps)\n• [Meconium: do NOT delay PPV for suctioning (2025)](#/node/nrp-meconium)\n• [30-sec reassessment: breathing + HR ≥100 → post-resus care](#/node/nrp-golden30-eval)',
        },
        {
            heading: '4. PPV (HR <100 or apnea)',
            body: '• [T-piece preferred, C-E grip, PIP 20-25, rate 40-60/min, 21% FiO2 ≥35wk](#/node/nrp-ppv)\n• [SpO2 targets: 1\u2019=60-65%, 5\u2019=80-85%, 10\u2019=85-95%](#/node/nrp-spo2-targets)\n• [If not improving → MR SOPA corrective steps](#/node/nrp-corrective)\n• [Advanced airway: ETT or LMA ≥34wk >2kg](#/node/nrp-advanced-airway)\n• [Neonatal numbers: ETT, blade, UVC, epi, glucose, fluids](#/node/nrp-ett-sizing)',
        },
        {
            heading: '5. CPR (HR <60 despite effective PPV)',
            body: '• [MUST intubate first — 2-thumb encircling, 3:1 ratio, 120 events/min](#/node/nrp-cpr)\n• [100% FiO2, establish UVC/IO access](#/node/nrp-cpr)\n• [Reassess every 60 seconds](#/node/nrp-cpr-eval)',
        },
        {
            heading: '6. Medications (HR <60 after CPR)',
            body: '• [Epinephrine IV/IO: 0.01-0.03 mg/kg of 1:10,000 q3-5min](#/node/nrp-epinephrine)\n• [UVC procedure: 2 arteries, 1 vein — insert 2 cm](#/node/nrp-uvc)\n• [Volume: NS 10 mL/kg, pRBCs 10 mL/kg, D10W 2 mL/kg](#/node/nrp-volume)\n• [No response after 20 min → consider discontinuation](#/node/nrp-discontinuation)',
        },
        {
            heading: '7. Post-Resuscitation',
            body: '• [APGAR at 1, 5, 10 min — normothermia 36.5-37.5°C](#/node/nrp-postresus)\n• [Glucose monitoring, NICU transfer, therapeutic hypothermia criteria](#/node/nrp-postresus)\n• [Family communication and team debrief](#/node/nrp-postresus)',
        },
    ],
    citations: [
        { num: 1, text: 'AHA/AAP. 2025 Guidelines for Neonatal Resuscitation. Circulation. 2025;152(Suppl 1):S399-S445.' },
        { num: 2, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation (NRP). 8th ed. AAP; 2021.' },
    ],
};
// -------------------------------------------------------------------
// Distal Radius — Steps Summary
// -------------------------------------------------------------------
const DR_SUMMARY = {
    id: 'dr-summary',
    title: 'Distal Radius Reduction Steps Summary',
    subtitle: 'Quick-reference TRAMP checklist — review before reduction',
    sections: [
        {
            heading: '1. Assessment',
            body: '• ["Obtain & Maintain" — Is position acceptable? Will it shift?](#/node/dr-start)\n• [Evaluate AP + lateral films — radial height, inclination, volar tilt](#/node/dr-assess)\n• [Open / grossly unstable → surgical consult](#/node/dr-surgical)\n• [Pediatric remodeling — plane of motion only, rotation does NOT remodel](#/node/dr-peds)',
        },
        {
            heading: '2. Analgesia',
            body: '• [Hematoma block (preferred) — 5–10 mL 1% lidocaine into fracture, fastest discharge](#/node/dr-hema-block)\n• [Procedural sedation — ketamine/propofol, requires NPO + monitoring team](#/node/dr-proc-sed)\n• [Regional — Bier block or US-guided nerve blocks, superior but longer setup](#/node/dr-regional)',
        },
        {
            heading: '3. T — Traction',
            body: '• [Apply longitudinal traction — waterski position, lean back, steady pull](#/node/dr-traction)\n• [Make circles to free fragment — recreate length before reducing](#/node/dr-traction)\n• [Finger traps for sustained traction — frees hands for splinting](#/node/dr-traction)',
        },
        {
            heading: '4. R — Reduction',
            body: '• [Exaggerate the deformity FIRST — unlocks dorsal periosteal hinge](#/node/dr-reduce)\n• [Push distal fragment palmar (volar) with thumbs](#/node/dr-reduce)\n• [Ulnar deviate to restore radial inclination](#/node/dr-reduce)',
        },
        {
            heading: '5. A — Apply',
            body: '• [Plaster NOT fiberglass — fiberglass sets too fast to mold](#/node/dr-apply)\n• [10 layers, 6-inch, measure on uninjured side, cut thumb hole](#/node/dr-apply)\n• [MINIMAL padding at fracture (2 layers Webril) — padding defeats mold](#/node/dr-apply)',
        },
        {
            heading: '6. M — Mold',
            body: '• [Flat hands (thenar eminences) — NEVER fingertips](#/node/dr-mold)\n• [Oval cross-section, 3-point pressure: dorsal at fracture, volar proximal + distal](#/node/dr-mold)\n• [Do NOT squeeze. Do NOT move hands while plaster sets](#/node/dr-mold)',
        },
        {
            heading: '7. P — Position',
            body: '• [10° flexion + ulnar deviation — counteracts dorsal displacement](#/node/dr-position)\n• [Elbow, MCPs, and thumb must remain FREE](#/node/dr-position)',
        },
        {
            heading: '8. Post-Reduction',
            body: '• [X-ray: 2nd metacarpal line parallel to radius, cast index <0.80](#/node/dr-post-xray)\n• ["Straight cast = crooked bone" — round cast = inadequate mold](#/node/dr-post-xray)\n• [If inadequate: remove cast, top up analgesia, re-attempt full TRAMP](#/node/dr-re-attempt)\n• [If 2 attempts fail → ortho consult](#/node/dr-re-attempt)',
        },
    ],
    citations: [
        { num: 1, text: 'Sayal A. Fracture Reduction Demonstration. Emergency Medicine Cases. YouTube.' },
        { num: 2, text: 'AO Surgery Reference. Distal Radius — Splinting and Positioning. AO Foundation.' },
    ],
};
// -------------------------------------------------------------------
// Distal Radius — Hematoma Block Evidence
// -------------------------------------------------------------------
const DR_HEMA_EVIDENCE = {
    id: 'dr-hema-evidence',
    title: 'Hematoma Block — Evidence & Technique',
    subtitle: 'Comprehensive efficacy data, comparative studies, and technique variations',
    sections: [
        {
            heading: 'Technique',
            body: '**Standard approach:** Identify fracture site on dorsal wrist. Prep with chlorhexidine. Insert 20-gauge needle at dorsal fracture line. Aspirate — dark blood confirms placement in fracture hematoma. Inject 5–10 mL of 1% plain lidocaine. Wait 5–10 minutes for full effect. [3][6]\n\n**Ultrasound guidance:** Real-time visualization of needle entering fracture gap improves accuracy, reduces pain during injection, and may improve block success. Particularly valuable in pediatric patients and those with difficult anatomy. [5][7][8]\n\n**Combined fractures:** For radius + ulna, a second injection into the ulnar fracture hematoma is required for complete analgesia. [6]',
        },
        {
            heading: 'Dosing & Safety',
            body: '**Max dose:** [Lidocaine](#/drug/lidocaine/hematoma block) 4.5 mg/kg without epinephrine (1% lidocaine = 10 mg/mL).\n\n**Critical safety point:** The fracture hematoma is contiguous with the medullary canal — lidocaine is absorbed directly into marrow vasculature. Systemic absorption is rapid, similar to intraosseous (IO) administration. Respect weight-based dosing limits strictly. [3][5]\n\n**Signs of toxicity:** Perioral numbness, metallic taste, tinnitus → seizures → cardiac arrest. Have lipid emulsion available for LAST (local anesthetic systemic toxicity).',
        },
        {
            heading: 'Efficacy vs Procedural Sedation',
            body: '**ED length of stay:** Hematoma block patients discharge in a mean of 1.5 hours vs 4.6 hours for procedural sedation — a 3-hour time savings. [4]\n\n**ENP-led reductions:** Emergency nurse practitioners using hematoma blocks achieved 87.2% successful first-attempt reduction rate, comparable to physician-led sedation results. Mean pain scores were acceptable (VAS 3.2 during reduction). [4]\n\n**No NPO requirement:** Hematoma block does not require fasting assessment, dedicated monitoring nurse, or capnography — reducing resource utilization significantly. [3][4]\n\n**Wilderness/austere settings:** Hematoma block is the preferred analgesia technique for fracture reduction in resource-limited environments where sedation monitoring is unavailable. [3]',
        },
        {
            heading: 'Efficacy vs Regional Anesthesia',
            body: '**Bier\'s block comparison:** Oakley et al. (2023) found hematoma block and Bier\'s block provided equivalent reduction quality and patient satisfaction for distal radius fractures, with hematoma block requiring fewer resources and shorter setup. [10]\n\n**US-guided nerve blocks:** Christensen et al. (2025) found US-guided nerve blocks achieved 94% first-attempt reduction success vs 74% for hematoma block, with lower pain scores during reduction. However, nerve blocks required ultrasound proficiency and additional setup time. [12]\n\n**Axillary block comparison:** Rook et al. (2025) demonstrated superior analgesia with US-guided axillary nerve block vs hematoma block, but at the cost of longer preparation and higher technical skill requirements. [13]\n\n**Cochrane review:** Handoll et al. (2002) found insufficient evidence to definitively recommend one anesthesia technique over another for distal radius reduction. Choice should be based on clinician skill, available resources, and patient factors. [9]\n\n**Regional vs hematoma meta-analysis:** Guirguis et al. (2025) concluded regional anesthesia provided superior analgesia but hematoma block remained appropriate first-line for straightforward reductions given its simplicity and speed. [11]',
        },
        {
            heading: 'Advantages',
            body: '• **Speed:** Can be performed in <5 minutes, full effect in 5–10 min\n• **Simplicity:** No specialized equipment beyond needle and syringe (US optional)\n• **No fasting required:** Can proceed immediately on arrival\n• **No monitoring team:** Single provider can perform block and reduction\n• **Cost-effective:** Minimal supplies, shorter ED stay\n• **Pediatric safe:** Well-studied in adolescents, US guidance helpful for precision [5][6]\n• **Difficult airway patients:** Avoids sedation risks entirely [5]',
        },
        {
            heading: 'Limitations',
            body: '• **Incomplete analgesia:** Some patients report moderate pain during reduction (VAS 3–5) — less complete than sedation or regional blocks\n• **Marrow absorption risk:** Rapid systemic uptake requires strict weight-based dosing\n• **Single-site only:** Each fracture site requires a separate injection\n• **No muscle relaxation:** Unlike sedation, does not relax forearm musculature — may make reduction technically harder in muscular patients\n• **Lower first-attempt success:** 74% vs 94% compared to US-guided nerve blocks in one RCT [12]\n• **Not suitable for:** Open fractures, severely comminuted fractures requiring prolonged manipulation, or patients requiring general anesthesia for other reasons',
        },
    ],
    citations: [
        { num: 3, text: 'Fink PB, et al. WMS CPG for Acute Pain in Austere Environments: 2024 Update. Wilderness Environ Med. 2024;35(2):198-218.' },
        { num: 4, text: 'Hagness C, et al. Haematoma Blocks in Closed Reduction of DRF by ENPs. Injury. 2025;56(8):112526.' },
        { num: 5, text: 'Gawel RJ, Chen AE. US-Guided Hematoma Block in Adolescent With Difficult Airway. Pediatr Emerg Care. 2025;41(2):143-145.' },
        { num: 6, text: 'Singh A, Khalil P. POCUS-Guided Hematoma Block for Forearm Fracture. Pediatr Emerg Care. 2021;37(10):533-535.' },
        { num: 7, text: 'Fathi M, et al. US-Guided Hematoma Block in DRF Reduction: RCT. Emerg Med J. 2015;32(6):474-7.' },
        { num: 8, text: 'Gottlieb M, Cosby K. US-Guided Hematoma Block for Distal Radial/Ulnar Fractures. J Emerg Med. 2015;48(3):310-2.' },
        { num: 9, text: 'Handoll HH, et al. Anaesthesia for Treating DRF in Adults. Cochrane Database Syst Rev. 2002;(3):CD003320.' },
        { num: 10, text: 'Oakley B, et al. Bier\'s Block vs Haematoma Block for DRF. Ann R Coll Surg Engl. 2023;105(5):434-440.' },
        { num: 11, text: 'Guirguis J, et al. Regional Anaesthesia vs Haematoma Block in DRF. Injury. 2025;56(12):112815.' },
        { num: 12, text: 'Christensen AB, et al. US-Guided Nerve Blocks Improve Closed Reduction of Colles\' Fractures: RCT. Acta Anaesthesiol Scand. 2025;69(6):e70063.' },
        { num: 13, text: 'Rook B, et al. US-guided Axillary Nerve Block vs Hematoma Block: RCT. Am J Emerg Med. 2025;100:175-181.' },
    ],
};
// -------------------------------------------------------------------
// Splinting — General Principles
// -------------------------------------------------------------------
const SPLINT_PRINCIPLES = {
    id: 'splint-principles',
    title: 'General Splinting Principles',
    subtitle: 'Materials, padding, technique, and neurovascular checks',
    sections: [
        {
            heading: 'Materials',
            body: '**Plaster** — moldable, sets in 3–5 min, exothermic reaction. Better for fractures requiring 3-point molding. Standard: 8–12 layers depending on site.\n\n**Fiberglass** — lighter, stronger, water-resistant, sets faster. Better for stable fractures where molding is not critical. More expensive.\n\n**Stockinette** — cotton tube applied directly to skin. Protects from plaster irritation. Fold over edges for a clean finish.\n\n**Webril (cast padding)** — soft cotton roll. Provides cushioning between skin and plaster. Standard: 2–4 layers.\n\n**Elastic bandage (ACE wrap)** — secures the splint. Wrap distally to proximally. Should be snug but not tight.',
        },
        {
            heading: 'Padding',
            body: '• **2–4 layers Webril** over the entire splinted area\n• **Extra padding** over bony prominences (malleoli, olecranon, styloids, calcaneus)\n• **Minimal padding** directly over the fracture site when molding is needed — excessive padding defeats the mold\n• Cotton between fingers for gutter splints to prevent maceration',
        },
        {
            heading: 'Application Technique',
            body: '1. Dip plaster in **lukewarm water** (not hot — the exothermic reaction adds additional heat and can burn)\n2. Squeeze out excess water gently — do not wring\n3. Smooth layers together on a flat surface to remove air pockets\n4. Apply to the limb and **mold with flat palms** (thenar eminences)\n5. **Never use fingertips** — creates pressure points → skin necrosis\n6. Hold the mold until plaster sets (3–5 minutes) — do NOT move hands during setting\n7. Secure with elastic bandage — snug, not constricting',
        },
        {
            heading: 'Positioning',
            body: '**Position of function** (unless otherwise specified):\n• **Wrist:** 15–20° extension\n• **MCP joints:** 70–90° flexion (for gutter splints — prevents collateral ligament contracture)\n• **IP joints:** slight flexion (10–20°)\n• **Elbow:** 90° flexion\n• **Ankle:** 90° dorsiflexion (neutral — prevents equinus contracture)\n• **Thumb:** abducted, slightly opposed ("holding a can")',
        },
        {
            heading: 'Neurovascular Checks',
            body: '**Before AND after splinting — document both.**\n\n• **Sensation:** Light touch in each nerve distribution (median, ulnar, radial for upper; deep peroneal, superficial peroneal, tibial, sural for lower)\n• **Motor:** Thumb opposition (median), finger abduction (ulnar), wrist/finger extension (radial), toe dorsiflexion (deep peroneal), toe plantarflexion (tibial)\n• **Vascular:** Capillary refill <2 seconds, pulses palpable (radial/ulnar for upper; dorsalis pedis/posterior tibial for lower)\n• **Color and temperature:** Compare to uninjured side',
        },
        {
            heading: 'A+P Institution Preference',
            body: '**Our institution prefers A+P (anterior + posterior) splints over sugar tong for forearm fractures.**\n\n• Two separate plaster slabs (one dorsal, one volar) rather than one continuous slab wrapping around the elbow\n• Provides equivalent AP stability without restricting elbow motion\n• Less bulky, better patient comfort, easier to adjust\n• Use sugar tong only when rotational control (pronation/supination) is specifically required',
        },
        {
            heading: 'Discharge Instructions',
            body: '• **Elevate** above the level of the heart — reduces swelling\n• **Ice** 20 minutes on / 20 minutes off (over padding, not directly on skin)\n• **Finger/toe exercises** — wiggle frequently to prevent stiffness and monitor for compartment syndrome\n• **Loosen elastic bandage** if swelling increases — mark the outer edge so patient knows where to unwind\n\n**Return immediately for:**\n• Increasing pain not relieved by elevation and medication\n• Numbness, tingling, or inability to move fingers/toes\n• Fingers/toes turning blue, white, or cold\n• Splint feels too tight, causes pressure pain\n• These are **compartment syndrome warning signs** — a surgical emergency',
        },
    ],
    citations: [
        { num: 1, text: 'Cheng J, et al. "The Splinter Series." ALiEM. https://www.aliem.com/splinter-series/' },
        { num: 3, text: 'Boyd AS, et al. Splints and Casts: Indications and Methods. Am Fam Physician. 2009;80(5):491-9.' },
        { num: 6, text: 'Eiff MP, Hatch RL. Fracture Management for Primary Care. 3rd ed. Elsevier; 2018.' },
    ],
};
// -------------------------------------------------------------------
// Splinting — Quick Reference Table
// -------------------------------------------------------------------
const SPLINT_SUMMARY = {
    id: 'splint-summary',
    title: 'Splinting Quick Reference',
    subtitle: 'All fractures → splint types at a glance with technique links',
    sections: [
        {
            heading: 'Humerus',
            body: '• Proximal humerus → [Sling / Cuff & Collar](#/node/splint-sling)\n• Humeral shaft → [Coaptation Splint](#/node/splint-coaptation) (→ functional brace at 1–2 wk)\n• Supracondylar → [Long Arm Posterior](#/node/splint-long-arm-post) or [Double Sugar Tong](#/node/splint-double-sugar-tong)',
        },
        {
            heading: 'Forearm',
            body: '• Olecranon / coronoid → [Long Arm Posterior](#/node/splint-long-arm-post)\n• Radius/ulna proximal or midshaft → [Long Arm Posterior](#/node/splint-long-arm-post) or [Double Sugar Tong](#/node/splint-double-sugar-tong)\n• Radius distal, isolated → [Thumb Spica](#/node/splint-thumb-spica) or [Volar](#/node/splint-volar)\n• Radius/ulna distal, complex → [Sugar Tong](#/node/splint-sugar-tong) (**A+P preferred**)\n• Ulna styloid → [Sugar Tong](#/node/splint-sugar-tong) (**A+P preferred**)',
        },
        {
            heading: 'Wrist & Hand',
            body: '• Scaphoid / trapezium / lunate fracture → [Thumb Spica](#/node/splint-thumb-spica)\n• Lunate dislocation → [Sugar Tong](#/node/splint-sugar-tong) (**A+P preferred**)\n• Triquetrum / pisiform / trapezoid / capitate / hamate → [Volar](#/node/splint-volar)\n• UCL injury / thumb MCP dislocation / De Quervain → [Thumb Spica](#/node/splint-thumb-spica)\n• 1st metacarpal → [Thumb Spica](#/node/splint-thumb-spica)\n• 2nd / 3rd metacarpal → [Radial Gutter](#/node/splint-radial-gutter) or [Volar](#/node/splint-volar)\n• 4th / 5th metacarpal (boxer) → [Ulnar Gutter](#/node/splint-ulnar-gutter)\n• 1st phalanx → [Thumb Spica](#/node/splint-thumb-spica)\n• 2nd / 3rd prox/mid phalanx → [Radial Gutter](#/node/splint-radial-gutter) or buddy taping\n• 4th / 5th prox/mid phalanx → [Ulnar Gutter](#/node/splint-ulnar-gutter) or buddy taping\n• Distal phalanx → Aluminum U-shaped (stack) splint',
        },
        {
            heading: 'Lower Extremity',
            body: '• Distal tibia / distal fibula → [Posterior Short Leg](#/node/splint-post-short-leg) (± [Stirrup](#/node/splint-stirrup))\n• Ankle sprain grade 2/3 → [Stirrup](#/node/splint-stirrup)\n• Talus / calcaneus / navicular / cuboid / cuneiform → [Posterior Short Leg](#/node/splint-post-short-leg)\n• Metatarsal → [Posterior Short Leg](#/node/splint-post-short-leg)\n• Lisfranc → [Posterior Short Leg](#/node/splint-post-short-leg) (non-weight bearing)',
        },
        {
            heading: 'Key Positions',
            body: '• **Wrist:** 15–20° extension\n• **MCP (gutter splints):** 70–90° flexion\n• **Elbow:** 90° flexion\n• **Ankle:** 90° dorsiflexion (neutral)\n• **Thumb:** abducted, slightly opposed',
        },
    ],
    citations: [
        { num: 3, text: 'Boyd AS, et al. Splints and Casts: Indications and Methods. Am Fam Physician. 2009;80(5):491-9.' },
        { num: 6, text: 'Eiff MP, Hatch RL. Fracture Management for Primary Care. 3rd ed. Elsevier; 2018.' },
    ],
};
// ===================================================================
// Sodium Disorders
// ===================================================================
// -------------------------------------------------------------------
// Sodium Disorders — Steps Summary
// -------------------------------------------------------------------
const NA_SUMMARY = {
    id: 'na-summary',
    title: 'Sodium Disorders Steps Summary',
    subtitle: 'Stepwise management of hyponatremia and hypernatremia',
    sections: [
        {
            heading: '1. Initial Assessment',
            body: '• [Classify as hyponatremia or hypernatremia](#/node/na-start)\n• [Assess symptom severity for hyponatremia](#/node/na-hypo-symptoms)\n• [Order initial labs: serum osm, urine osm, urine Na](#/node/na-hypo-initial)',
        },
        {
            heading: '2. Emergency HypoNa (Severe Symptoms)',
            body: '• [3% Hypertonic Saline 100-150 mL bolus x3 — target 4-6 mEq/L rise](#/node/na-hypo-emergency)\n• [Correction limits: max 10 mEq/L in 24h (8 for high-risk)](#/node/na-hypo-correction-limits)\n• [DDAVP clamp-bolus protocol for controlled correction](#/node/na-hypo-ddavp-protocol)',
        },
        {
            heading: '3. HypoNa Etiology',
            body: '• [Serum Osm >275 → non-hypotonic (check glucose, lipids)](#/node/na-non-hypotonic)\n• [Urine Osm <100 → water excess (potomania, polydipsia)](#/node/na-hypo-water-excess)\n• [Urine Na <30 → volume assessment (hypo- vs hypervolemic)](#/node/na-hypo-low-una)\n• [Urine Na >30 → SIAD, diuretics, or adrenal insufficiency](#/node/na-hypo-high-una)',
        },
        {
            heading: '4. SIAD & Specific Causes',
            body: '• [SIAD → fluid restriction → oral urea → salt tabs + loop](#/node/na-siad-treatment)\n• [Diuretic-induced → hold thiazide, DDAVP clamp if Na <120](#/node/na-hypo-diuretic)\n• [Hypovolemic → NS resuscitation, watch for autocorrection](#/node/na-hypo-hypovolemic)',
        },
        {
            heading: '5. Hypernatremia',
            body: '• [Volume depleted → Free Water Deficit calculator → enteral or D5W replacement](#/node/na-hyper-fwd)\n• [Polyuria → DI workup (central vs nephrogenic)](#/node/na-hyper-di)\n• [Central DI → DDAVP + free water](#/node/na-hyper-central-di)\n• [Volume overloaded → natriuretic diuresis + free water](#/node/na-hyper-overload)',
        },
    ],
    citations: [
        { num: 1, text: 'Adrogué HJ et al. Diagnosis and Management of Hyponatremia. JAMA. 2022;328(3):280-291.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — DDAVP Clamp Protocol
// -------------------------------------------------------------------
const NA_DDAVP_CLAMP = {
    id: 'na-ddavp-clamp',
    title: 'DDAVP Clamp-Bolus Protocol',
    subtitle: 'Controlled sodium correction in hyponatremia',
    sections: [
        {
            heading: 'Concept',
            body: 'The DDAVP clamp separates the **water problem** from the **sodium problem**. DDAVP blocks renal free water excretion via V2 receptors, preventing dangerous autocorrection. Then 3% NaCl boluses raise Na at a predictable, controlled rate.\n\nThis is especially critical in patients at HIGH risk of overcorrection: alcoholics, malnourished, hypokalemia, thiazide-induced, beer potomania.',
        },
        {
            heading: 'Initiation',
            body: '**Step 1:** Give **Desmopressin (DDAVP) 2 mcg IV** as first dose.\n**Step 2:** Start DDAVP 2 mcg IV **q6-8h** (scheduled, not PRN).\n**Step 3:** Give **Thiamine 100 mg IV** empirically (ODS prophylaxis).\n**Step 4:** Check serum Na **q2h** from initiation.\n\n**Do NOT wait for labs before starting DDAVP** in high-risk patients — start the clamp immediately.',
        },
        {
            heading: 'Bolus Correction',
            body: '**While DDAVP clamp is active:**\n• Give **3% NaCl 100 mL IV bolus** to raise Na.\n• Each 100 mL bolus raises Na **~2 mEq/L** in a 70 kg adult.\n• Check Na **2 hours after each bolus**.\n• Target correction: **4-6 mEq/L** in the first 6 hours for severe symptoms.\n• Max: **8 mEq/L in 24h** for high-risk, **10 mEq/L** for standard risk.\n\n**If Na rises too fast:** Hold 3% boluses. DDAVP will prevent further rise. If already overcorrected → Overcorrection Rescue Protocol.',
        },
        {
            heading: 'Monitoring',
            body: '**During active DDAVP clamp:**\n• Serum Na q2h\n• Urine output and volume\n• Urine osmolality (should be concentrated if DDAVP working)\n• Neurological status\n• Serum K+ (correct hypokalemia — ODS risk factor)',
        },
        {
            heading: 'Discontinuation',
            body: '**Stop DDAVP clamp when:**\n• Na >125 mEq/L AND stable\n• Underlying cause has been addressed\n• Patient tolerating oral intake\n\n**After stopping DDAVP:**\n• Continue Na monitoring q4-6h for 24-48h\n• Watch for rebound — free water excretion may resume rapidly\n• If Na rises >2 mEq/L in first 4h after stopping → consider restarting DDAVP',
        },
    ],
    citations: [
        { num: 1, text: 'Adrogué HJ et al. Diagnosis and Management of Hyponatremia. JAMA. 2022;328(3):280-291.' },
        { num: 2, text: 'Sterns RH. Disorders of Plasma Sodium. NEJM. 2015;372(1):55-65.' },
        { num: 3, text: 'Verbalis JG et al. Hyponatremia: Expert Panel Recommendations. Am J Med. 2013;126(10S1):S1-42.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — SIAD Causes & Diagnosis
// -------------------------------------------------------------------
const NA_SIAD_CAUSES = {
    id: 'na-siad-causes',
    title: 'SIAD Causes & Diagnosis',
    subtitle: 'Syndrome of Inappropriate Antidiuresis',
    sections: [
        {
            heading: 'Diagnostic Criteria (ALL must be present)',
            body: '• Serum osmolality **<275 mOsm/kg**\n• Urine osmolality **>100 mOsm/kg** (usually >300)\n• Urine sodium **>30 mEq/L** (on normal salt intake)\n• **Euvolemic** on clinical exam\n• Normal thyroid and adrenal function\n• No recent diuretic use',
        },
        {
            heading: 'Medication Causes (Most Common)',
            body: '• **SSRIs/SNRIs** — most common drug cause, especially in elderly\n• **Carbamazepine / Oxcarbazepine** — potent ADH stimulators\n• **NSAIDs** — reduce renal free water clearance\n• **Opioids** — stimulate ADH release\n• **Cyclophosphamide** — direct ADH-like effect\n• **Desmopressin** — iatrogenic when given for other indications\n• **Ecstasy (MDMA)** — stimulates ADH + excessive water intake',
        },
        {
            heading: 'Malignancy',
            body: '• **Small cell lung cancer** — most classic association (ectopic ADH production)\n• Head and neck cancers\n• Lymphoma\n• GI malignancies\n• GU malignancies',
        },
        {
            heading: 'Neurologic',
            body: '• Stroke, subarachnoid hemorrhage, TBI\n• Meningitis, encephalitis\n• Brain tumors\n• Multiple sclerosis\n• Guillain-Barré syndrome',
        },
        {
            heading: 'Pulmonary',
            body: '• Pneumonia (any cause)\n• Tuberculosis\n• Positive pressure ventilation\n• Asthma exacerbation\n• COPD exacerbation',
        },
        {
            heading: 'Key Pitfalls',
            body: '• SIAD is a **diagnosis of exclusion** — rule out hypothyroidism and adrenal insufficiency first\n• Many "euvolemic" patients are actually mildly volume depleted — trial of NS can help distinguish\n• Urine Na may be low in SIAD if patient is on severe salt restriction\n• The term "SIAD" is preferred over "SIADH" because not all cases involve elevated ADH [6]',
        },
    ],
    citations: [
        { num: 1, text: 'Adrogué HJ, Madias NE. Syndrome of Inappropriate Antidiuresis. NEJM. 2023;389(16):1499-1509.' },
        { num: 6, text: 'Ellison DH, Berl T. The syndrome of inappropriate antidiuresis. NEJM. 2007;356(20):2064-72.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — Hypernatremia Causes
// -------------------------------------------------------------------
const NA_HYPER_CAUSES = {
    id: 'na-hyper-causes',
    title: 'Hypernatremia Causes',
    subtitle: 'Differential diagnosis by mechanism',
    sections: [
        {
            heading: 'Inadequate Water Intake (Most Common)',
            body: '• **Elderly with impaired thirst** — by far the most common ER presentation\n• Altered mental status / intubated patients\n• Restricted access to water (nursing homes, ICU)\n• Infants dependent on caregivers',
        },
        {
            heading: 'Sodium / Potassium Administration',
            body: '• Hypertonic saline infusions\n• Sodium bicarbonate boluses\n• Excessive TPN sodium content\n• Oral sodium ingestion (soy sauce, salt tablets)',
        },
        {
            heading: 'Renal Water Loss — Diabetes Insipidus',
            body: '• **Central DI** — deficient ADH production (post-neurosurgery, TBI, tumors, idiopathic)\n• **Nephrogenic DI** — renal resistance to ADH (lithium, hypercalcemia, hypokalemia, post-obstructive)',
        },
        {
            heading: 'Renal Water Loss — Diuresis',
            body: '• Osmotic diuresis (hyperglycemia, mannitol, urea)\n• Loop diuretics (produce hypotonic urine)\n• Post-obstructive diuresis',
        },
        {
            heading: 'GI Water Loss',
            body: '• Diarrhea (especially osmotic — lactulose, sorbitol)\n• Vomiting with inadequate replacement\n• Nasogastric suction\n• Enterocutaneous fistulas',
        },
        {
            heading: 'Insensible Losses',
            body: '• Burns\n• Fever (each degree above 37°C increases free water loss ~100 mL/day)\n• Mechanical ventilation with dry gas\n• Exercise / environmental heat exposure',
        },
        {
            heading: 'Key Clinical Points',
            body: '• Hypernatremia is **always hyperosmolar** — no pseudohypernatremia exists\n• In hospitalized patients, hypernatremia is usually **iatrogenic** (inadequate free water provision)\n• Community-acquired hypernatremia is usually chronic and associated with **higher mortality** than hospital-acquired\n• Mortality ranges from 40-60% in severe cases — often a marker of severe underlying illness',
        },
    ],
    citations: [
        { num: 1, text: 'Adrogué HJ, Madias NE. Hypernatremia. NEJM. 2000;342(20):1493-1499.' },
        { num: 2, text: 'Lindner G et al. Hypernatremia in Critically Ill. J Crit Care. 2013;28(2):216.e11-20.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — Overcorrection Rescue Protocol
// -------------------------------------------------------------------
const NA_OVERCORRECTION = {
    id: 'na-overcorrection',
    title: 'Overcorrection Rescue Protocol',
    subtitle: 'Emergency re-lowering of serum sodium',
    sections: [
        {
            heading: 'When to Activate',
            body: '**Activate rescue if:**\n• Na rises **>10 mEq/L in 24 hours** (standard risk)\n• Na rises **>8 mEq/L in 24 hours** (high-risk patients)\n• Na correction rate exceeds **1 mEq/L per hour** sustained\n\n**High-risk patients:** Alcoholics, malnourished, hypokalemia, thiazide-induced, beer potomania, Na <105 mEq/L.',
        },
        {
            heading: 'Rescue Protocol',
            body: '**Step 1:** **Desmopressin (DDAVP) 2 mcg IV stat** — blocks free water excretion immediately.\n\n**Step 2:** **D5W 3 mL/kg/hr IV** — provides free water to re-lower Na back to safe trajectory.\n\n**Step 3:** Check Na **q1-2h** until correction rate is back within limits.\n\n**Step 4:** Once Na back on safe trajectory, transition to DDAVP clamp protocol for controlled correction.',
        },
        {
            heading: 'Target',
            body: 'Re-lower Na to bring the **24-hour correction** back to within 8-10 mEq/L from baseline.\n\nExample: If baseline Na was 112 mEq/L and rose to 126 mEq/L in 12 hours (+14 mEq/L), give DDAVP + D5W to re-lower Na toward ~120-122 mEq/L.',
        },
        {
            heading: 'Prevention (Better Than Rescue)',
            body: '• **Proactive DDAVP clamp** in all high-risk patients — do not wait for overcorrection to occur\n• **Thiamine 100 mg IV** empirically — reduces ODS susceptibility\n• **Correct hypokalemia** — K+ correction raises Na (1 mEq K+ repleted = ~1 mEq Na rise)\n• **Avoid NS boluses** in patients with reversible ADH excess — can trigger rapid autocorrection\n• **Monitor Na q2h** during active treatment',
        },
    ],
    citations: [
        { num: 1, text: 'Sterns RH. Disorders of Plasma Sodium. NEJM. 2015;372(1):55-65.' },
        { num: 2, text: 'Ayus JC et al. Correction Rates in Severe Hyponatremia Meta-Analysis. JAMA Intern Med. 2025;185(1):38-51.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — ODS Risk Factors
// -------------------------------------------------------------------
const NA_ODS_RISK = {
    id: 'na-ods-risk',
    title: 'ODS Risk Factors',
    subtitle: 'Osmotic Demyelination Syndrome',
    sections: [
        {
            heading: 'What is ODS?',
            body: 'Osmotic demyelination syndrome (formerly "central pontine myelinolysis") is a devastating neurologic injury caused by **overly rapid correction of chronic hyponatremia**. Brain cells that adapted to hypo-osmolality cannot readapt fast enough, leading to myelin destruction.\n\n**Onset is delayed 2-6 days** after overcorrection — clinicians may falsely believe the patient is improving when the damage is already done.',
        },
        {
            heading: 'High-Risk Populations',
            body: '• **Alcoholism** — most common risk factor\n• **Malnutrition** — depleted organic osmolytes\n• **Hypokalemia** — K+ correction raises Na (double hit)\n• **Thiamine deficiency** — overlaps with alcohol/malnutrition\n• **Liver disease / cirrhosis**\n• **Na <105 mEq/L** — severely adapted brain\n• **Chronic hyponatremia (>48h)** — brain has fully adapted\n• **Thiazide-induced** — high autocorrection risk when drug stopped',
        },
        {
            heading: 'Clinical Presentation',
            body: '**Biphasic course:**\n1. Initial improvement with Na correction (hours to days)\n2. **Delayed deterioration (2-6 days):**\n• Dysarthria, dysphagia\n• Paraparesis or quadriparesis\n• "Locked-in" syndrome (worst case)\n• Behavioral changes, confusion\n• Seizures\n\n**MRI findings:** T2 hyperintensity in central pons ("trident sign") — may not appear for 1-2 weeks.',
        },
        {
            heading: 'Prevention',
            body: '• **Proactive DDAVP clamp** for all high-risk patients\n• **Thiamine 100 mg IV** empirically\n• **Correct hypokalemia** alongside Na (but account for K+ effect on Na)\n• **Max correction:** 8 mEq/L in 24h for high-risk, 10 mEq/L for standard\n• **Avoid NS boluses** in reversible causes — triggers autocorrection\n• If overcorrection occurs → **immediate DDAVP + D5W rescue**\n• **Do NOT give vaptans** — unpredictable, uncontrolled aquaresis',
        },
    ],
    citations: [
        { num: 1, text: 'Sterns RH. Disorders of Plasma Sodium. NEJM. 2015;372(1):55-65.' },
        { num: 2, text: 'Spasovski G et al. Clinical Practice Guideline on Hyponatraemia. Eur J Endocrinol. 2014;170(3):G1-G47.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — Hyponatremia Lab Interpretation
// -------------------------------------------------------------------
const NA_LAB_INTERPRETATION = {
    id: 'na-lab-interpretation',
    title: 'Hyponatremia Lab Interpretation',
    subtitle: 'Stepwise diagnostic algorithm',
    sections: [
        {
            heading: 'Step 1: Serum Osmolality',
            body: '**Osm >275 mOsm/kg → Non-hypotonic hyponatremia**\n• [Check glucose → Corrected Na Calculator](#/calculator/corrected-na) — add 1.6 mEq/L to Na for every 100 mg/dL glucose above 100 (factor 2.4 if glucose >400)\n• Check lipids, total protein — pseudohyponatremia (artifact of indirect ISE method)\n• Check for mannitol, glycine, sorbitol infusions\n\n**Osm <275 mOsm/kg → True hypotonic hyponatremia** → proceed to Step 2',
        },
        {
            heading: 'Step 2: Urine Osmolality',
            body: '**Urine Osm <100 mOsm/kg → Dilute urine (ADH appropriately suppressed)**\n• Primary polydipsia (>15-20 L/day intake)\n• Beer potomania (low solute intake, high free water)\n• "Tea-and-toast" diet in elderly\n• Marathon runners / dilutional\n\n**HIGH overcorrection risk** — once water intake normalizes, kidneys excrete massive free water volumes. **Proactive DDAVP clamp** recommended.\n\n**Urine Osm >100 mOsm/kg → Concentrated urine (ADH active)** → proceed to Step 3',
        },
        {
            heading: 'Step 3: Urine Sodium',
            body: '**Urine Na <30 mEq/L → Avid Na retention**\n• **Hypovolemic:** GI losses (vomiting, diarrhea), third-spacing, poor intake\n• **Hypervolemic:** Heart failure, cirrhosis, nephrotic syndrome (effective arterial volume depletion)\n• Distinguish by clinical volume assessment\n\n**Urine Na >30 mEq/L → Na wasting or euvolemia**\n• **SIAD** (most common euvolemic cause)\n• **Diuretic-induced** (thiazides >> loops)\n• **Adrenal insufficiency** (cortisol/ACTH deficiency)\n• **Cerebral salt wasting** (rare, post-neurosurgery)\n• **Hypothyroidism** (rare cause, usually requires severe TSH elevation)',
        },
        {
            heading: 'Grey Zones',
            body: '• **Urine Osm 100-300:** Overlap zone — could be partial ADH suppression or partial concentration\n• **Urine Na 20-40:** Borderline — may reflect mixed etiology or recent volume status changes\n• **Diuretics confound all urine values** — urine Na and Osm are uninterpretable while on diuretics\n• **Fractional excretion of urate (FEua)** can help distinguish SIAD (>12%) from volume depletion (<12%) when urine values are ambiguous',
        },
    ],
    citations: [
        { num: 1, text: 'Adrogué HJ et al. Diagnosis and Management of Hyponatremia. JAMA. 2022;328(3):280-291.' },
        { num: 2, text: 'Hoorn EJ, Zietse R. Diagnosis and Treatment of Hyponatremia: Guidelines. JASN. 2017;28(5):1340-1349.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — Non-Hypotonic Hyponatremia
// -------------------------------------------------------------------
const NA_NON_HYPOTONIC_INFO = {
    id: 'na-non-hypotonic-info',
    title: 'Non-Hypotonic Hyponatremia',
    subtitle: 'Translocational and pseudohyponatremia',
    sections: [
        {
            heading: 'Translocational Hyponatremia',
            body: '**Effective osmoles draw water out of cells, diluting plasma Na.**\n\n• **Hyperglycemia (most common):** For every 100 mg/dL glucose above 100, Na is artifactually lowered by ~1.6 mEq/L. Corrected Na = measured Na + 1.6 × [(glucose - 100) / 100]. Some experts use factor of 2.4 for glucose >400.\n• **Mannitol infusion:** Osmotic drag effect similar to hyperglycemia.\n• **Glycine / Sorbitol:** TURP syndrome, hysteroscopy irrigation — can cause severe dilutional hyponatremia.\n\n**Treatment:** Correct the underlying osmole. Na normalizes as glucose falls / mannitol is cleared.',
        },
        {
            heading: 'Pseudohyponatremia',
            body: '**Lab artifact from indirect ion-selective electrode (ISE) analyzers.**\n\nHigh concentrations of lipids or paraproteins expand the non-aqueous plasma fraction, causing the analyzer to underestimate Na concentration in the aqueous phase.\n\n• **Severe hypertriglyceridemia** (TG >1500 mg/dL)\n• **Paraproteinemia** (multiple myeloma, Waldenström)\n• **Extreme hypercholesterolemia**\n\n**Diagnosis:** Serum osmolality is **normal** (measured directly). Or use direct ISE method (blood gas analyzer, POC chemistry) — gives true Na.\n\n**Treatment:** None needed for the Na itself. Treat the underlying condition.',
        },
        {
            heading: 'How to Distinguish',
            body: '• **Serum osmolality >275 mOsm/kg** rules out true hypotonic hyponatremia\n• **POC (point-of-care) Na** uses direct ISE and gives the true value — compare with lab Na\n• If POC Na is normal but lab Na is low → **pseudohyponatremia**\n• If calculated Osm is normal but measured Osm is high → **osmol gap** (unmeasured osmoles like mannitol, ethylene glycol)',
        },
    ],
    citations: [
        { num: 1, text: 'Seay NW et al. Body Tonicity Disorders Core Curriculum. AJKD. 2020;75(2):272-286.' },
        { num: 2, text: 'Miller NE et al. Sodium Disorders: Hyponatremia and Hypernatremia. AFP. 2023;108(5):476-486.' },
    ],
};
const RABIES_SUMMARY = {
    id: 'rabies-summary',
    title: 'Rabies Steps Summary',
    subtitle: 'Quick-reference for clinical rabies workup and post-exposure prophylaxis',
    sections: [
        {
            heading: 'Clinical Rabies Workup',
            body: '• [Recognize clinical forms: furious (80%), paralytic (20%), atypical](#/node/rabies-form)\n• [Prodromal clue: pain/paresthesia at prior bite site](#/node/rabies-clinical)\n• [Collect 4 specimens: saliva, nuchal biopsy, CSF, serum](#/node/rabies-dx-workup)\n• [Contact CDC/public health — testing not available at most labs](#/node/rabies-dx-workup)\n• [Management: palliative (most) vs aggressive/ICU (select)](#/node/rabies-mgmt)',
        },
        {
            heading: 'Post-Exposure Prophylaxis',
            body: '• [Classify WHO exposure category: I (intact skin), II (minor), III (severe/bite)](#/node/rabies-contact)\n• [Bat exposure — lower threshold: sleeping, child, intoxicated = exposure](#/node/rabies-bat)\n• [Dog/cat/ferret — 10-day observation if healthy and available](#/node/rabies-observe)\n• [Raccoon, skunk, fox, coyote — high risk, immediate PEP](#/node/rabies-wildlife-cat3)\n• [Rodents/rabbits — generally NOT indicated](#/node/rabies-rodent)',
        },
        {
            heading: 'Wound Management',
            body: '• [Wash wound with soap and water ≥15 minutes](#/node/rabies-wound)\n• [Irrigate with povidone-iodine if available](#/node/rabies-wound)\n• [Delay suturing — if needed, infiltrate RIG first](#/node/rabies-wound)',
        },
        {
            heading: 'PEP Protocol',
            body: '• [Unvaccinated: RIG 20 IU/kg (infiltrate wound) + vaccine days 0, 3, 7, 14](#/node/rabies-full-pep)\n• [Previously vaccinated: vaccine days 0 and 3 only, no RIG](#/node/rabies-prevax-regimen)\n• [Immunocompromised: 5-dose series (add day 28) + serology + RIG even if prev. vaccinated](#/node/rabies-immunocomp-pep)',
        },
        {
            heading: 'Follow-Up',
            body: '• [Schedule remaining vaccine doses — do NOT restart if delayed](#/node/rabies-followup)\n• [Monitor observation animal (dogs/cats/ferrets)](#/node/rabies-followup)\n• [Deltoid only (adults) — NEVER gluteal](#/node/rabies-schedule)\n• [Report to animal control / public health](#/node/rabies-followup)',
        },
    ],
    citations: [
        { num: 1, text: 'Manning SE, et al. Human Rabies Prevention — ACIP, 2008. MMWR Recomm Rep. 2008;57(RR-3):1-28.' },
        { num: 2, text: 'Rupprecht CE, et al. Reduced 4-Dose PEP Schedule — ACIP, 2010. MMWR Recomm Rep. 2010;59(RR-2):1-9.' },
    ],
};
const RABIES_ANIMAL_RISK = {
    id: 'rabies-animal-risk',
    title: 'Rabies Risk by Animal Type',
    subtitle: 'Species-specific guidance for PEP decision-making',
    sections: [
        {
            heading: 'HIGH RISK — Reservoir Species',
            body: '**Bats** — #1 cause of human rabies in US. Bites can be invisible. PEP for any direct contact unless bite/scratch definitively excluded. [1]\n\n**Raccoons** — Most commonly reported rabid wild animal in eastern US. [1]\n\n**Skunks** — Second most common rabid wild animal. [1]\n\n**Foxes** — Regional risk varies; high in Arctic and some southern states. [1]\n\n**Coyotes** — Increasing rabies cases in recent years. [1]',
        },
        {
            heading: 'MODERATE RISK — Domestic Animals',
            body: '**Dogs** — Leading cause of human rabies globally, uncommon in US due to vaccination. 10-day observation if healthy domestic dog. Stray/feral dogs in rabies-endemic areas = higher risk. [2]\n\n**Cats** — Most commonly reported rabid domestic animal in US (more than dogs). 10-day observation if healthy. [1]\n\n**Ferrets** — Can be observed 10 days. Uncommon rabies vector. [2]',
        },
        {
            heading: 'LOW RISK — PEP Rarely Indicated',
            body: '**Small rodents** — Mice, rats, squirrels, hamsters, gerbils, guinea pigs, chipmunks. Almost never found rabid. PEP not routinely recommended. [2]\n\n**Rabbits/hares** — Very low risk. Consult public health for unusual circumstances. [2]\n\n**Exception: Woodchucks (groundhogs)** — Higher rabies risk than other rodents. Consult public health. [1]',
        },
        {
            heading: 'SPECIAL SITUATIONS',
            body: '**Livestock** (cattle, horses, sheep, goats) — Consider individually. Consult public health/veterinarian. Reported rabid livestock cases occur annually. [3]\n\n**Non-human primates** — Consult public health and infectious disease.\n\n**Unknown/escaped animal** — Treat as if rabid unless species is known low-risk. Consult public health.',
        },
    ],
    citations: [
        { num: 1, text: 'Pieracci EG, et al. Vital Signs: Human Rabies Deaths and Exposures. MMWR. 2019;68(23):524-528.' },
        { num: 2, text: 'Manning SE, et al. Human Rabies Prevention — ACIP, 2008. MMWR Recomm Rep. 2008;57(RR-3):1-28.' },
        { num: 3, text: 'NASPHV Compendium of Animal Rabies Prevention, 2016. JAVMA. 2016;248(5):505-517.' },
    ],
};
const RABIES_DDX = {
    id: 'rabies-ddx',
    title: 'Rabies Differential Diagnosis',
    subtitle: 'Distinguishing clinical rabies from mimics',
    sections: [
        {
            heading: 'Furious Rabies Differentials',
            body: '**HSV Encephalitis** — Fever (80%), temporal lobe involvement on MRI, CSF pleocytosis (10-200 cells). Lacks hydrophobia/aerophobia. No fluctuating consciousness with lucid intervals. [1]\n\n**Tetanus** — Continuous muscle rigidity between spasms (absent in rabies). Normal consciousness until late. No hydrophobia/aerophobia. Shorter incubation (3-21 days). Identifiable wound often present. [2]\n\n**Autoimmune Encephalitis (anti-NMDAR)** — Prominent psychiatric symptoms (psychosis, behavioral changes). Seizures in 85% (vs 20% in infectious encephalitis). Lower CSF pleocytosis (median 6 cells). Responds to immunotherapy. Epileptiform EEG discharges. [3]\n\n**Arboviruses** (West Nile, Japanese encephalitis) — Consider based on geography, season, travel. Fever and headache more prominent than in rabies. [1]',
        },
        {
            heading: 'Paralytic Rabies Differentials',
            body: '**Guillain-Barré Syndrome (GBS)** — The most important differential. Key distinguishing features:\n• Consciousness: preserved throughout in GBS vs preserved until preterminal in paralytic rabies\n• Sensory: distal paresthesias (GBS) vs pain at bite site (rabies)\n• CSF: albuminocytologic dissociation in GBS vs minimal pleocytosis in rabies\n• Progression: 12 hours to 28 days in GBS vs more rapid with fever/dysautonomia in rabies [4][5]\n\n**Botulism** — Descending (not ascending) flaccid paralysis. Consider when paralysis begins cranially. [2]',
        },
        {
            heading: 'Key Diagnostic Clues for Rabies',
            body: '**Pathognomonic features:**\n• Hydrophobia and aerophobia (furious form)\n• Pain/paresthesia/pruritus at a prior bite site\n• Fluctuating consciousness with lucid intervals\n\n**CSF:** Typically minimal or no pleocytosis — this **distinguishes rabies from most viral encephalitides** which typically show moderate pleocytosis. [3]\n\n**Epidemiologic clues:**\n• Animal exposure (especially bats, dogs, wild carnivores)\n• Travel to rabies-endemic areas\n• Lack of post-exposure prophylaxis\n\n**Important:** Rabies diagnosis in the US is **almost always missed at the first clinical encounter**. Up to 30% of patients may not recall animal exposure.',
        },
    ],
    citations: [
        { num: 1, text: 'Tyler KL. Acute Viral Encephalitis. N Engl J Med. 2018;379(6):557-566.' },
        { num: 2, text: 'Sudarshan R, et al. Tetanus: Recognition and Management. Lancet Infect Dis. 2025;25(11):e645-e657.' },
        { num: 3, text: 'Venkatesan A, et al. Acute Encephalitis in Immunocompetent Adults. Lancet. 2019;393(10172):702-716.' },
        { num: 4, text: 'Yuki N, Hartung HP. Guillain-Barré Syndrome. N Engl J Med. 2012;366(24):2294-304.' },
        { num: 5, text: 'Gadre G, et al. Rabies Viral Encephalitis: Clinical Determinants in Diagnosis. J Neurol Neurosurg Psychiatry. 2010;81(7):812-20.' },
    ],
};
const RABIES_DX_GUIDE = {
    id: 'rabies-dx-guide',
    title: 'Rabies Diagnostic Specimens & Interpretation',
    subtitle: '4-specimen protocol for antemortem diagnosis',
    sections: [
        {
            heading: 'Specimen Collection',
            body: '**No single test is sufficient.** Collect all 4 specimen types for maximum sensitivity (100% combined).\n\n**1. Saliva** — Sterile, preservative-free tube. Transport at room temperature within 24 hours.\n• Test: RT-PCR (nucleic acid amplification) + viral isolation\n• Sensitivity: ~70% single sample; **≥3 serial samples increases to >98%** [1][2]\n• Intermittent viral shedding — may cease after seroconversion\n\n**2. Nuchal Skin Biopsy** — Full-thickness from nape of neck with hair follicles (~4mm diameter, 20mm³). Sterile container, room temperature, 24 hours.\n• Test: Direct fluorescent antibody (DFA) + immunohistochemistry\n• Sensitivity: **Nearly 100% with adequate tissue** — most reliable single specimen [3]\n\n**3. CSF** — Sterile, preservative-free tube. Room temperature, 24 hours.\n• Test: Anti-rabies antibody (neutralizing + binding)\n• In unvaccinated patients, **CSF antibodies are diagnostic** [1]\n• Sensitivity approaches **100% after 12 days of illness** [4]\n\n**4. Serum** — Clot or serum separator tube (SST). Room temperature, 2 hours.\n• Test: Anti-rabies antibody (neutralizing + binding)',
        },
        {
            heading: 'Timing Strategy',
            body: '**Early illness (first week):** Viral detection methods have higher yield\n→ Prioritize saliva RT-PCR + nuchal skin biopsy\n\n**Later illness (>7-12 days):** Antibody detection becomes more reliable\n→ CSF and serum antibody testing have higher yield\n\n**Median time from symptom onset to first positive sample: 8 days** [2]\n**Median time to death: 16 days** [2]',
        },
        {
            heading: 'Interpretation & Caveats',
            body: '**Diagnostic:** Finding rabies virus antigen or nucleic acid in ANY antemortem sample. In unvaccinated patients, rabies-neutralizing antibodies in CSF confirm diagnosis. [1]\n\n**Sequential sampling is essential** if initial testing is negative but suspicion remains high.\n\n**Important caveats:**\n• **Prior IVIG** can be a passive source of donor-derived rabies antibodies → false-positive serology [5]\n• **Paralytic rabies** has lower sensitivity across all specimen types vs furious rabies [3]\n• **Dog rabies variants** may produce minimal antibody responses compared to bat variants [3]',
        },
        {
            heading: 'Ancillary Studies',
            body: '**CSF analysis:** Typically minimal or no pleocytosis (distinguishes from other viral encephalitides). Mild lymphocytic pleocytosis can occur. [6]\n\n**MRI:** Nonspecific. May show T2 hyperintensity in brainstem, hippocampi, basal ganglia, hypothalamus, spinal cord. Possible enhancement of nerve roots and brachial plexus on bitten limb side. [3]\n\n**Postmortem:** Brain histopathology shows Negri bodies (pathognomonic intracytoplasmic inclusions), mononuclear infiltration, perivascular cuffing. [1]',
        },
        {
            heading: 'Coordination with Public Health',
            body: '**Rabies testing is NOT available at most hospital labs.** You MUST:\n• Contact local public health laboratory or CDC immediately\n• CDC serves as the national rabies reference laboratory\n• Obtain approval and complete requisite paperwork before submitting samples [5]\n• **Rabies is a nationally notifiable disease** — report to state/local health department',
        },
    ],
    citations: [
        { num: 1, text: 'Miller JM, et al. Guide to Utilization of the Microbiology Laboratory for Diagnosis of Infectious Diseases: 2024 Update (IDSA/ASM). Clin Infect Dis. 2024;ciae104.' },
        { num: 2, text: 'Swedberg C, et al. Maximizing Human Rabies Case Detection: Diagnostic Sensitivity From 35 Years of U.S. Data. Clin Infect Dis. 2025;ciaf666.' },
        { num: 3, text: 'Hemachudha T, et al. Human Rabies: Neuropathogenesis, Diagnosis, and Management. Lancet Neurol. 2013;12(5):498-513.' },
        { num: 4, text: 'Damodar T, et al. Utility of Rabies Neutralizing Antibody Detection in CSF and Serum. PLoS Negl Trop Dis. 2019;13(1):e0007128.' },
        { num: 5, text: 'CDC Yellow Book: Rabies. Ryan Wallace, Brett Petersen, David Shlim.' },
        { num: 6, text: 'Venkatesan A, et al. Acute Encephalitis in Immunocompetent Adults. Lancet. 2019;393(10172):702-716.' },
    ],
};
const RABIES_PATIENT_INFO = {
    id: 'rabies-patient-info',
    title: 'Rabies PEP — Patient Information',
    subtitle: 'What you need to know about your rabies prevention treatment',
    shareable: true,
    sections: [
        {
            heading: 'What is Rabies PEP?',
            body: 'Post-exposure prophylaxis (PEP) is a series of shots that prevent rabies infection after an animal exposure. Rabies is nearly 100% fatal once symptoms appear, but PEP is nearly 100% effective when given correctly.',
        },
        {
            heading: 'Your Vaccination Schedule',
            body: 'You will receive shots on specific days. Your doctor will tell you which schedule applies to you:\n\n**Standard schedule:** Day 0 (today), Day 3, Day 7, Day 14\n**Extended schedule (if immune system is weakened):** Day 0, Day 3, Day 7, Day 14, Day 28\n**If previously vaccinated:** Day 0 and Day 3 only\n\n**Do NOT miss your scheduled doses.** If you miss a dose, get it as soon as possible — the series does NOT need to be restarted.',
        },
        {
            heading: 'What to Expect',
            body: '**Common side effects (not dangerous):**\n• Pain, redness, or swelling at injection site\n• Headache\n• Nausea or dizziness\n• Muscle aches\n\n**Seek medical attention if you develop:**\n• Difficulty breathing or swallowing\n• Hives or widespread rash\n• Swelling of face, lips, or throat\n• Fever > 103°F (39.4°C)',
        },
        {
            heading: 'Wound Care Instructions',
            body: '• Keep the wound clean and dry\n• Watch for signs of infection: increasing redness, warmth, pus, red streaks, fever\n• You can take acetaminophen (Tylenol) or ibuprofen (Advil/Motrin) for pain\n• Avoid strenuous activity with the injected arm/leg for 24 hours\n• Return to the emergency department if your wound shows signs of infection',
        },
        {
            heading: 'Important Reminders',
            body: '• Bring this information to each follow-up visit\n• Vaccines can be given at your primary care doctor, urgent care, local health department, or emergency department\n• If you were told an animal is being observed for 10 days, contact your local animal control for updates\n• Call your doctor or return to the ED if the animal becomes sick or dies during the observation period',
        },
    ],
    citations: [
        { num: 1, text: 'CDC. Rabies Post-Exposure Prophylaxis. Available at: cdc.gov/rabies.' },
    ],
};
// -------------------------------------------------------------------
// Burns Info Pages
// -------------------------------------------------------------------
const BURNS_SUMMARY = {
    id: 'burns-summary',
    title: 'Burns — Steps Summary',
    subtitle: 'Quick Reference',
    sections: [
        {
            body: 'Quick-reference checklist for initial burns management. Tap any step to jump directly to that section of the consult.',
        },
        {
            heading: '1. Scene & Primary Survey',
            body: '• [Stop the burning process — remove clothing, irrigate](#/node/burn-primary-survey)\n• [Identify burn mechanism (thermal, chemical, electrical, radiation)](#/node/burn-type)\n• [ABCDE primary survey — burns are trauma patients first](#/node/burn-primary-survey)\n• [Screen for inhalation injury (enclosed space, facial burns, soot, stridor)](#/node/burn-inhalation-screen)',
        },
        {
            heading: '2. Airway & Toxicology',
            body: '• [Assess for hard signs of inhalation injury — intubate early if in doubt](#/node/burn-airway-assess)\n• [CO poisoning — co-oximetry on ALL enclosed-space fire patients](#/node/burn-co-assess)\n• [Cyanide — clinical diagnosis, do not wait for levels](#/node/burn-cyanide)',
        },
        {
            heading: '3. Burn Assessment',
            body: '• [Classify burn depth (epidermal → full thickness)](#/node/burn-depth)\n• [Calculate TBSA — Rule of 9\'s (adult) or Lund-Browder (peds)](#/node/burn-tbsa-age)\n• Only count partial thickness and full thickness in TBSA',
        },
        {
            heading: '4. Fluid Resuscitation',
            body: '• [Select protocol: Rule of 10\'s, Parkland, or Dell-Seton](#/node/burn-fluids-moderate)\n• Calculate from TIME OF BURN, not arrival\n• [Monitor UOP: 0.5 mL/kg/hr (adult), 1 mL/kg/hr (peds)](#/node/burn-fluids-monitoring)\n• [Pediatric: add maintenance D5½NS to resuscitation volume](#/node/burn-fluids-peds)',
        },
        {
            heading: '5. Wound Care',
            body: '• [Cool with running water 20 min (within 3 hours of injury)](#/node/burn-wound-care)\n• [Select dressings by depth — avoid SSD on superficial burns](#/node/burn-dressings)\n• [Multimodal pain management (morphine, ketamine, fentanyl IN for peds)](#/node/burn-pain)',
        },
        {
            heading: '6. Escharotomy',
            body: '• [Assess for circumferential deep partial/full thickness burns](#/node/burn-eschar-screen)\n• [Extremity: medial/lateral mid-axial incisions](#/node/burn-eschar-technique)\n• [Chest: bilateral anterior axillary lines — "clamshell" pattern](#/node/burn-eschar-chest)',
        },
        {
            heading: '7. Disposition',
            body: '• [Apply ABA burn center transfer criteria (10 indications)](#/node/burn-transfer)\n• [Disposition: transfer / admit / discharge](#/node/burn-disposition)',
        },
    ],
    citations: [
        { num: 1, text: 'Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.' },
        { num: 2, text: 'Hewett Brumberg EK et al. AHA and ARC Guidelines for First Aid. Circulation. 2024;150(24):e519-e579.' },
    ],
};
const BURNS_DEPTH_GUIDE = {
    id: 'burns-depth-guide',
    title: 'Burn Depth Classification',
    subtitle: 'Five-Tier Assessment Guide',
    sections: [
        {
            body: '**Speed of capillary refill** is the most useful bedside exam for burn depth. Optimal assessment at **3-5 days** post-burn (after Zone of Stasis resolves). Mixed depths are common — classify by deepest component. Reassess within 48 hours.',
        },
        {
            heading: 'Epidermal (Superficial / 1st Degree)',
            body: '**Appearance:** Red, dry, no blisters\n**Sensation:** Painful\n**Cap refill:** Brisk blanching\n**Healing:** 5-7 days, no scarring\n**Treatment:** Moisturizer, cool compresses, OTC analgesics\n**TBSA:** NOT counted in TBSA calculation\n**Example:** Sunburn',
        },
        {
            heading: 'Superficial Dermal (Superficial Partial / 2nd Degree)',
            body: '**Appearance:** Pink/red, moist, **blisters present**\n**Sensation:** Very painful (intact nerve endings)\n**Cap refill:** Brisk\n**Healing:** 10-14 days, minimal scarring\n**Treatment:** Nonadherent dressing + bacitracin — **avoid SSD** (delays healing)\n**TBSA:** Counted',
        },
        {
            heading: 'Mid Dermal (Deep Partial / 2nd Degree)',
            body: '**Appearance:** Dark pink/red, moist or dry\n**Sensation:** Reduced (partial nerve damage)\n**Cap refill:** Sluggish\n**Healing:** 14-21 days, moderate scarring\n**Treatment:** Silver dressings (Mepilex Ag, Aquacel Ag) or SSD. May need grafting.\n**TBSA:** Counted',
        },
        {
            heading: 'Deep Dermal',
            body: '**Appearance:** Mottled red and white, dry\n**Sensation:** Minimal pain (significant nerve destruction)\n**Cap refill:** None\n**Healing:** >21 days, significant scarring, contracture risk\n**Treatment:** Requires excision and skin grafting\n**TBSA:** Counted',
        },
        {
            heading: 'Full Thickness (3rd Degree)',
            body: '**Appearance:** White, brown, or black; waxy or leathery\n**Sensation:** Painless (complete nerve destruction)\n**Cap refill:** None\n**Healing:** Cannot heal by re-epithelialization — always needs grafting\n**Treatment:** Excision and grafting. Escharotomy if circumferential.\n**TBSA:** Counted',
        },
        {
            heading: 'Assessment Tips',
            body: '• **Capillary refill** is the single best predictor of depth\n• Initial assessment often underestimates depth — **reassess at 48h**\n• Zone of Stasis tissue may convert to deeper injury over 24-72h\n• Scald burns in children are often deeper than they appear initially\n• Laser Doppler imaging (if available) is most accurate for indeterminate depth [1]',
        },
    ],
    citations: [
        { num: 1, text: 'Greenhalgh DG. Management of Burns. NEJM. 2019;380(24):2349-2359.' },
        { num: 2, text: 'Singer AJ, Dagum AB. Current Management of Acute Cutaneous Wounds. NEJM. 2008;359(10):1037-46.' },
        { num: 3, text: 'Cuttle L et al. Management of Non-Severe Burn Wounds in Children. Lancet Child Adolesc Health. 2022;6(4):269-278.' },
    ],
};
const BURNS_PREHOSPITAL = {
    id: 'burns-prehospital',
    title: 'Prehospital Burn Considerations',
    subtitle: 'Scene to ED',
    sections: [
        {
            body: 'Key prehospital priorities for burn patients arriving to the emergency department.',
        },
        {
            heading: 'Stop the Burning Process',
            body: '• Remove all clothing, jewelry, and constrictive items (rings EARLY — edema makes later removal difficult)\n• **Thermal:** Remove from heat source. Cool with running water 15-25\u00b0C for 20 min (most effective within 3 hours of injury) [1]\n• **Chemical:** Copious water irrigation (exceptions: elemental metals — brush off first)\n• **Electrical:** Ensure power source disconnected before contact\n• **Do NOT use ice** — causes vasoconstriction and deepens injury',
        },
        {
            heading: 'Initial Cooling',
            body: '• **Running tap water** (15-25\u00b0C) for **20 minutes** — single most impactful prehospital intervention [1]\n• Effective up to 3 hours post-burn (still beneficial, diminishing returns)\n• Cool the burn, NOT the patient — limit cooling to <20% TBSA at a time to prevent hypothermia\n• No ice, no butter, no toothpaste, no home remedies',
        },
        {
            heading: 'Airway Considerations',
            body: '• Assess for inhalation injury BEFORE transport: facial burns, soot, singed hair, hoarse voice, stridor\n• Airway edema peaks at 12-24 hours — a patent airway now may occlude later\n• If concern for airway compromise, intubate BEFORE transport if possible\n• Humidified 100% O\u2082 via NRB for all enclosed-space fires',
        },
        {
            heading: 'IV Access & Fluids',
            body: '• Establish large-bore IV access en route (through burned skin if necessary)\n• IO access if IV not achievable\n• For burns >20% TBSA: start LR at Rule of 10\'s rate (%TBSA \u00d7 10 mL/hr)\n• Do NOT delay transport for IV access',
        },
        {
            heading: 'Hypothermia Prevention',
            body: '• Burns patients lose thermoregulation rapidly\n• Dry sterile sheets (not wet)\n• Warm ambulance environment\n• Limit wound cooling to 20 min — then cover\n• **No wet dressings during transport**',
        },
        {
            heading: 'Transport Decision',
            body: '• Burn center if available within 60-90 min and meets ABA criteria\n• Nearest trauma center if hemodynamically unstable or major associated injuries\n• Any ED if airway compromised — secure first, transfer later\n• Contact receiving facility early with TBSA estimate and mechanism',
        },
    ],
    citations: [
        { num: 1, text: 'Hewett Brumberg EK et al. AHA and ARC Guidelines for First Aid. Circulation. 2024;150(24):e519-e579.' },
        { num: 2, text: 'Bitter CC et al. WMS Clinical Practice Guideline on Care of Burns in the Wilderness. Wilderness Environ Med. 2025;36(4):549-558.' },
    ],
};
const BURNS_DSMC_PROTOCOL = {
    id: 'burns-dsmc-protocol',
    title: 'Dell-Seton (DSMC-UT) Burn Protocol',
    subtitle: 'Institutional Resuscitation Protocol',
    sections: [
        {
            body: 'The Dell-Seton Medical Center (DSMC-UT) burn resuscitation protocol uses a two-tier system based on TBSA to minimize crystalloid overload ("fluid creep") by introducing early fresh frozen plasma (FFP). All calculations begin from **time of burn**, not time of arrival.',
        },
        {
            heading: 'Tier 1: TBSA 20-39%',
            body: '**1.** Administer **1 unit of FFP** upon arrival\n**2.** Initial fluid: **Lactated Ringer\'s** at Rule of 10\'s rate (%TBSA \u00d7 10 = mL/hr)\n**3.** Titrate LR **up or down by 20%** every hour based on UOP goal\n**4.** **UOP goal:** 0.5 cc/kg/hr (adults), 1 cc/kg/hr (peds)\n**5.** At cumulative volume of **15 cc \u00d7 %TBSA \u00d7 kg** \u2192 **switch ALL fluid to FFP**\n**6.** At cumulative volume of **20 cc \u00d7 %TBSA \u00d7 kg** \u2192 **do NOT increase hourly rate further** regardless of UOP\n**7.** Check **bladder pressure** (abdominal compartment syndrome screening)\n**8.** Place a **trialysis catheter** (IJ or subclavian preferred)\n**9.** Consult **nephrology for CRRT** — once started, decrease FFP to **125 cc/hr** regardless of UOP',
        },
        {
            heading: 'Tier 2: TBSA \u226540%',
            body: '**1.** Initial fluid: **FFP ONLY** at Rule of 10\'s rate (NO crystalloid)\n**2.** Titrate FFP **up or down by 20%** every hour based on UOP goal\n**3.** Place a **triple lumen dialysis catheter (trialysis)**\n**4.** At cumulative volume of **20 cc \u00d7 %TBSA \u00d7 kg** \u2192 **do NOT increase hourly rate further**\n**5.** Consult **nephrology** — once CRRT started, decrease FFP to **125 cc/hr** regardless of UOP',
        },
        {
            heading: 'Rationale',
            body: '• Excessive crystalloid \u2192 third-spacing \u2192 airway edema, abdominal compartment syndrome, extremity compartment syndrome\n• FFP provides oncotic pressure, maintaining intravascular volume with less total fluid\n• The 15cc and 20cc thresholds are cumulative volume triggers, not hourly rates\n• CRRT manages fluid overload while continuing resuscitation',
        },
        {
            heading: 'Monitoring',
            body: '• **Foley catheter** — UOP hourly (primary endpoint)\n• **Bladder pressure** — q4-6h or if abdominal distension (>25 mmHg = ACS)\n• **Labs** q4-6h: BMP, lactate, Hgb, glucose, coags\n• **Hourly I/O** documentation with cumulative totals\n• **Reassess** airway, extremity perfusion, abdominal exam each nursing shift',
        },
    ],
    citations: [
        { num: 1, text: 'Aydelotte JD. Dell-Seton (DSMC-UT) Institutional Burn Resuscitation Protocol. Dr. Jayson D. Aydelotte MD FACS, Burn Medical Director, The University of Texas at Austin Dell Medical School.' },
        { num: 2, text: 'Rizzo JA et al. Higher Initial Formula for Resuscitation After Severe Burn Injury Means Higher 24-Hour Volumes. J Burn Care Res. 2023;44(5):1017-1022.' },
    ],
};
const BURNS_ESCHAROTOMY = {
    id: 'burns-escharotomy',
    title: 'Escharotomy Technique',
    subtitle: 'Decompression of Circumferential Burns',
    sections: [
        {
            body: 'Escharotomy is a **bedside ED procedure** — do not delay for OR. Circumferential deep partial or full thickness burns create a tourniquet effect as interstitial edema increases during fluid resuscitation. The inelastic eschar restricts expansion, compressing underlying vessels, nerves, and (in chest burns) ventilation.',
        },
        {
            heading: 'Indications',
            body: '**6 P\'s of Compartment Syndrome:**\n• **Pain** — out of proportion, or paradoxically absent in full-thickness\n• **Pressure** — tense, woody compartment\n• **Paresthesias** — early neurologic compromise\n• **Paralysis** — late, ominous\n• **Pulselessness** — very late, pre-amputation\n• **Pallor/Poikilothermia**\n\n**Objective measures:**\n• Doppler: absent or diminished pulses\n• Compartment pressure >30 mmHg\n• Capillary refill >3 seconds\n• Undetectable SpO\u2082 on digit\n\n**Do NOT wait for all 6 P\'s** — pulselessness and paralysis indicate ischemia is already well-established.',
        },
        {
            heading: 'Extremity Technique',
            body: '• **Medial and lateral mid-axial lines** — incise through full thickness of eschar to subcutaneous fat\n• Adequate depth: tissue **gapes open** and subcutaneous fat is visible\n• Eschar in full-thickness areas is **insensate** — no anesthesia needed (may need for margins)\n• Use **electrocautery** (preferred — hemostasis) or **scalpel**\n\n**Upper extremity:** Axilla to wrist along medial and lateral mid-axial lines. If hand involved, extend to thenar and hypothenar eminences.\n\n**Lower extremity:** Groin to ankle along medial and lateral lines. If foot involved, extend along dorsum.\n\n**Digits:** Mid-lateral incisions along non-pinch surfaces. Preserve Grayson\'s and Cleland\'s ligaments where possible. [1]',
        },
        {
            heading: 'Chest/Trunk Technique',
            body: '• **Indication:** Circumferential trunk burns restricting ventilation — rising peak airway pressures, decreasing tidal volumes\n• **Incision pattern:** Bilateral anterior axillary lines from clavicle to costal margin\n• **Connect** superiorly across clavicles and inferiorly across costal margin = **"clamshell" or "H" pattern**\n• May extend to **iliac crests** if abdominal compartment syndrome concern\n• Expect **immediate improvement** in tidal volumes\n• If no improvement \u2192 consider fasciotomy or decompressive laparotomy',
        },
        {
            heading: 'Post-Procedure',
            body: '• **Doppler pulse check** immediately after and q1h\n• Control bleeding with electrocautery, hemostats, or direct pressure\n• Apply topical antimicrobial to exposed tissue\n• **Elevate** burned extremities above heart level\n• If perfusion does not improve \u2192 **escalate to fasciotomy** (requires OR)\n• Reassess neurovascular status q1h for first 6 hours',
        },
        {
            heading: 'Fasciotomy Indications',
            body: '• Persistent vascular compromise **after adequate escharotomy**\n• **Electrical burns** (deep tissue injury exceeds surface appearance)\n• Compartment pressure >30 mmHg post-escharotomy\n• **Requires OR and surgical consultation** — not a bedside procedure\n• 4-compartment fasciotomy of the leg is most common',
        },
    ],
    citations: [
        { num: 1, text: 'James AJ et al. Anatomy of Grayson\'s and Cleland\'s Ligaments: Basis of Digit Escharotomy. Ann Plast Surg. 2025;95(1):51-53.' },
        { num: 2, text: 'Butts CC et al. Surgical Escharotomy and Decompressive Therapies in Burns. J Burn Care Res. 2020;41(2):263-269.' },
        { num: 3, text: 'de Barros MEPM et al. Revisiting Escharotomy in Patients With Burns in Extremities. J Burn Care Res. 2017;38(4):e691-e698.' },
        { num: 4, text: 'Pegg SP. Escharotomy in Burns. Ann Acad Med Singapore. 1992;21(5):682-4.' },
    ],
};
const BURNS_DRESSING_GUIDE = {
    id: 'burns-dressing-guide',
    title: 'Burn Dressing Selection',
    subtitle: 'Dressings by Burn Depth',
    sections: [
        {
            body: 'Select dressings based on burn depth. General principle: provide moist wound healing environment, prevent infection, minimize pain with dressing changes.',
        },
        {
            heading: 'Epidermal (Superficial)',
            body: '• **Moisturizer** (aloe vera, petroleum-based)\n• Nonadherent dressing only if friction area\n• No antimicrobials needed\n• OTC analgesics sufficient',
        },
        {
            heading: 'Superficial Partial Thickness',
            body: '• **Nonadherent** (Adaptic, Xeroform) + [Bacitracin](#/drug/bacitracin/burns) + gauze wrap\n• **Do NOT use silver sulfadiazine** — delays epithelialization by 1-2 days [1]\n• Alternative: hydrogel dressings (Burnaid, Intrasite) for pain relief\n• Change dressings daily or BID\n• Modern silver dressings (Mepilex Ag, Aquacel Ag) if available — less painful changes',
        },
        {
            heading: 'Deep Partial / Full Thickness',
            body: '• **Silver dressings** preferred: Mepilex Ag, Aquacel Ag (can stay in place 3-7 days)\n• [Silver Sulfadiazine](#/drug/silver-sulfadiazine/burns) 1% cream BID — acceptable alternative\n• Mafenide acetate (Sulfamylon) — better eschar penetration, but painful on application\n• Surgical consultation for grafting planning',
        },
        {
            heading: 'Special Areas',
            body: '**Face:** Bacitracin only — NO dressings (impair assessment, uncomfortable). Clean gently BID.\n\n**Hands:** Xeroform or nonadherent + loose gauze. Individual finger wrapping. **Elevate.** Early ROM exercises — splint in functional position (wrist extended, MCPs flexed, IPs extended).\n\n**Ears:** Bacitracin only. **No pressure** (pillow, headband) — risk of chondritis. Watch for auricular chondritis.\n\n**Perineum/Genitalia:** Bacitracin. Foley for urethral meatus burns. Frequent dressing changes.\n\n**Circumferential:** Do NOT apply tight circumferential dressings — risk of tourniquet effect with edema.',
        },
        {
            heading: 'General Principles',
            body: '• **Tetanus** prophylaxis: Tdap if >5 years or unknown status\n• **No prophylactic systemic antibiotics** — increases resistance without benefit\n• **Debridement:** Remove loose/devitalized tissue gently. Leave intact blisters that are small, <24h old, and not impeding ROM. Debride ruptured blisters.\n• **No home remedies:** butter, toothpaste, egg whites — all worsen outcome\n• **Pain management** before dressing changes — see [Burn Pain Management](#/node/burn-pain)',
        },
    ],
    citations: [
        { num: 1, text: 'Wasiak J et al. Dressings for Superficial and Partial Thickness Burns. Cochrane. 2013;(3):CD002106.' },
        { num: 2, text: 'Singer AJ, Dagum AB. Current Management of Acute Cutaneous Wounds. NEJM. 2008;359(10):1037-46.' },
        { num: 3, text: 'Cuttle L et al. Management of Non-Severe Burn Wounds in Children. Lancet Child Adolesc Health. 2022;6(4):269-278.' },
    ],
};
const BURNS_CO_CYANIDE = {
    id: 'burns-co-cyanide',
    title: 'CO & Cyanide Toxicity',
    subtitle: 'Inhalation Injury Toxicology Reference',
    sections: [
        {
            body: 'Carbon monoxide and cyanide poisoning frequently coexist in enclosed-space fire victims. CO binds hemoglobin (forming carboxyhemoglobin), reducing oxygen delivery. Cyanide inhibits cytochrome oxidase, blocking cellular oxygen utilization. The combined effect is devastating — cells can neither receive nor use oxygen.',
        },
        {
            heading: 'COHb Level Interpretation',
            body: '• **<5%:** Normal (nonsmokers)\n• **<10%:** Normal for smokers\n• **5-15%:** Headache, nausea, dizziness\n• **15-25%:** Confusion, visual changes, tachycardia\n• **25-40%:** Severe confusion, syncope, tachypnea\n• **40-60%:** Coma, seizures, cardiovascular collapse\n• **>60%:** Usually fatal\n\n**CRITICAL:** Pulse oximetry reads **falsely normal** — it cannot distinguish COHb from OxyHb. Order **ABG with co-oximetry** on ALL enclosed-space fire patients.',
        },
        {
            heading: 'CO Half-Life by O\u2082 Delivery',
            body: '• **Room air (21% O\u2082):** ~320 minutes (5.3 hours)\n• **100% O\u2082 NRB:** ~75 minutes (1.25 hours)\n• **Hyperbaric O\u2082 (2-3 ATA):** ~23 minutes\n\nContinue 100% O\u2082 until COHb <5% and asymptomatic.',
        },
        {
            heading: 'Hyperbaric Oxygen (HBO) Indications',
            body: '• COHb >25%\n• Loss of consciousness (even if transient)\n• Neurologic deficits (confusion, ataxia, seizure)\n• Cardiac ischemia (ECG changes, troponin elevation)\n• Pregnancy with COHb >15%\n• Persistent symptoms despite 100% O\u2082\n• Refractory metabolic acidosis\n\nContact nearest HBO facility early — benefit diminishes >6h post-exposure.',
        },
        {
            heading: 'Cyanide — Clinical Diagnosis',
            body: '**There is no rapid confirmatory test. This is a CLINICAL diagnosis.**\n\n**Suspect cyanide when:**\n• Enclosed-space fire (synthetic materials produce HCN)\n• Persistent metabolic acidosis despite adequate O\u2082 therapy\n• Lactate **>8-10 mmol/L** (strong predictor)\n• AMS out of proportion to COHb level\n• Cardiovascular collapse\n• PaO\u2082 and SpO\u2082 may be **NORMAL** (cells can\'t use O\u2082)\n\n**Do NOT wait for cyanide levels** — results take hours and patient may die waiting.',
        },
        {
            heading: 'Cyanide Treatment',
            body: '**First-line:** [Hydroxocobalamin (Cyanokit)](#/drug/hydroxocobalamin/cyanide) 5g IV over 15 min\n• Repeat 5g \u00d71 if persistent instability\n• Pediatric: 70 mg/kg (max 5g)\n• Turns skin/urine RED 2-3 days\n• **Draw all labs BEFORE giving** — interferes with colorimetric assays\n\n**Alternative:** Sodium thiosulfate 12.5g IV (slower onset)\n\n**AVOID:** Sodium nitrite if concurrent CO poisoning — creates methemoglobin, further reducing O\u2082 carrying capacity',
        },
        {
            heading: 'Delayed Neuropsychiatric Syndrome',
            body: '• Occurs in **15-40%** of significant CO poisoning cases\n• Onset: **2-40 days** after exposure\n• Symptoms: cognitive deficits, personality changes, memory impairment, parkinsonism, incontinence\n• HBO may reduce incidence (controversial)\n• Warn patients and arrange neuropsych follow-up at discharge',
        },
    ],
    citations: [
        { num: 1, text: 'Weaver LK. Carbon Monoxide Poisoning. NEJM. 2009;360(12):1217-25.' },
        { num: 2, text: 'Cho DH et al. Practical Recommendations for Cardiac Injury in CO Poisoning. JACC Heart Fail. 2024;12(8):1343-1352.' },
        { num: 3, text: 'Lavonas EJ et al. AHA Focused Update on Management of Patients with Cardiac Arrest or Life-Threatening Toxicity Due to Poisoning. Circulation. 2023;148(16):e149-e184.' },
        { num: 4, text: 'Baud FJ et al. Elevated Blood Cyanide Concentrations in Victims of Smoke Inhalation. NEJM. 1991;325(25):1761-6.' },
    ],
};
const BURNS_CHEMICAL_DETAIL = {
    id: 'burns-chemical-detail',
    title: 'Chemical Burns — Agent-Specific',
    subtitle: 'Decontamination & Antidote Reference',
    sections: [
        {
            body: 'Chemical burns represent 3-10% of all burns but up to 30% of burn deaths. The agent determines decontamination strategy and specific antidotes. **Universal first step:** copious water irrigation \u226520-30 min (with exceptions noted below).',
        },
        {
            heading: 'Acid Burns',
            body: '**Mechanism:** Coagulation necrosis — protein denaturation creates eschar that limits penetration depth\n**Common agents:** Sulfuric acid (battery), hydrochloric acid (muriatic/pool), nitric acid\n**Treatment:**\n• Copious water irrigation 20-30 min\n• Do NOT neutralize (exothermic reaction worsens injury)\n• Check skin pH with litmus paper until 7.0-7.5\n• Remove all contaminated clothing/jewelry\n\n**Special acids:**\n• **Phenol:** Wipe with PEG (polyethylene glycol) or glycerol FIRST, then water irrigation. Water alone may spread phenol.\n• **Chromic acid:** Irrigation + topical 10% ascorbic acid. Monitor for systemic chromium toxicity (renal failure).',
        },
        {
            heading: 'Alkali Burns',
            body: '**Mechanism:** Liquefaction necrosis — saponifies fats, NO self-limiting eschar \u2192 penetrates deeply. **More dangerous than acids.**\n**Common agents:** NaOH (lye/drain cleaner), KOH, cement, ammonia, bleach\n**Treatment:**\n• **Prolonged irrigation 30-60+ minutes** — alkali penetrates much deeper\n• Cement: **brush dry powder off first**, then irrigate\n• Check pH q15 min during irrigation\n• Do NOT neutralize with acid\n\n**Eye exposure:** Emergency — continuous Morgan lens irrigation until pH neutral. Immediate ophthalmology consult.',
        },
        {
            heading: 'Hydrofluoric (HF) Acid',
            body: '**Uniquely dangerous.** Fluoride ion penetrates tissue and binds Ca\u00b2\u207a and Mg\u00b2\u207a \u2192 progressive deep necrosis, **severe pain out of proportion to appearance**, and **life-threatening hypocalcemia** (burns >2% TBSA or >50% concentration can be fatal).\n\n**Treatment ladder:**\n1. Water irrigation \u00d7 20 min\n2. [Calcium Gluconate 2.5% Gel](#/drug/calcium-gluconate-gel/hf burn) — apply and massage continuously. Pain relief = successful fluoride binding.\n3. If pain persists: [Calcium Gluconate](#/drug/calcium-gluconate/hf burn) SQ 5% solution, 0.5 mL/cm\u00b2\n4. Digital/refractory: Intra-arterial CaGluc via radial catheter (10 mL 10% CaGluc in 40 mL NS over 4h)\n5. Systemic hypocalcemia: IV calcium gluconate or calcium chloride\n\n**Monitor:** Serial iCa, Mg, K, ECG (QT prolongation \u2192 VF). Admit ALL HF burns >1% TBSA.',
        },
        {
            heading: 'Elemental Metals',
            body: '**Na, K, Li:** React violently with water \u2192 H\u2082 gas + alkali burn\n• **Cover with mineral oil** to prevent air/water contact\n• Remove all metal fragments with forceps\n• Irrigate with water ONLY after all metal is removed\n\n**White phosphorus:** Ignites spontaneously in air\n• Keep **submerged in water** at all times\n• CuSO\u2084 1% solution turns particles black (aids identification — use sparingly as copper is toxic)\n• Remove all visible particles under water\n\n**Magnesium:** Burns extremely hot (>2000\u00b0C)\n• Cover with **sand or dry chemical extinguisher**\n• Do NOT use water until fire is extinguished\n• X-ray if penetrating injury suspected',
        },
        {
            heading: 'Unknown Agent',
            body: '• Default to **copious water irrigation** (safe for vast majority of agents)\n• Contact **Poison Control: 1-800-222-1222**\n• Full PPE for all responders (gloves, gown, eye protection, N95 minimum)\n• If powder: **brush off first**, then irrigate\n• Continue irrigation 20+ min, check pH until neutral\n• Collect/photograph agent container for identification',
        },
        {
            heading: 'Key Principles',
            body: '• Chemical burns often **appear superficial initially** and progress over 24-72 hours — serial reassessment is mandatory\n• **Lower threshold** for burn center transfer with chemical burns\n• Watch for **systemic toxicity** specific to the agent (especially HF, chromic acid, phenol)\n• **Diphoterine** (amphoteric chelating solution) is emerging as a universal chemical burn decontaminant — available in some EDs',
        },
    ],
    citations: [
        { num: 1, text: 'Henretig FM et al. Hazardous Chemical Emergencies and Poisonings. NEJM. 2019;380(17):1638-1655.' },
        { num: 2, text: 'Akelma H et al. Rare Chemical Burns: Review of the Literature. Int Wound J. 2019;16(6):1330-1338.' },
    ],
};
// -------------------------------------------------------------------
// ICH Info Pages
// -------------------------------------------------------------------
const ICH_SUMMARY = {
    id: 'ich-summary',
    title: 'ICH Steps Summary',
    subtitle: 'Time-critical hemorrhage management pathway',
    sections: [
        {
            heading: '1. Initial Assessment',
            body: '• [Non-contrast CT head \u2014 confirm ICH, estimate volume (ABC/2)](#/node/ich-start)\n• [Labs: CBC, BMP, INR/PTT/fibrinogen, anti-Xa level if on DOAC](#/node/ich-labs)\n• [CTA for nearly all patients (mandatory if lobar <70y or deep <45y)](#/node/ich-labs)',
        },
        {
            heading: '2. Coagulation Optimization',
            body: '• [Identify anticoagulant \u2014 do NOT wait for labs before reversing](#/node/ich-anticoag)\n• [Warfarin \u2192 4-Factor PCC + Vitamin K 10 mg IV](#/node/ich-warfarin-rev)\n• [Dabigatran \u2192 Idarucizumab 5 g IV](#/node/ich-dabi-rev)\n• [Xa inhibitor \u2192 4-Factor PCC 50 IU/kg or andexanet alfa](#/node/ich-xa-rev)\n• [Heparin/LMWH \u2192 Protamine sulfate](#/node/ich-heparin-rev)',
        },
        {
            heading: '3. Blood Pressure Control',
            body: '• [Treat pain/anxiety FIRST](#/node/ich-bp)\n• [SBP 150\u2013220 \u2192 target 130\u2013150 mmHg](#/node/ich-bp)\n• [SBP >220 \u2192 target 140\u2013180 mmHg](#/node/ich-bp)\n• [Avoid SBP <130 and drops >70 mmHg in first hour](#/node/ich-bp)',
        },
        {
            heading: '4. Surgical Considerations',
            body: '• [Supratentorial: limited evidence for early evacuation \u2014 consult neurosurgery](#/node/ich-supra-surg)\n• [Cerebellar >15 mL with brainstem compression \u2192 IMMEDIATE surgical evacuation](#/node/ich-cerebellar-surg)\n• [IVH with hydrocephalus \u2192 EVD placement](#/node/ich-ivh-evd)',
        },
        {
            heading: '5. ICU Management',
            body: '• [Seizure prophylaxis NOT recommended \u2014 treat if witnessed/EEG-confirmed](#/node/ich-seizures)\n• [ICP management, sodium monitoring, fever treatment](#/node/ich-icp-fever)\n• [DVT prophylaxis: IPC immediately, chemical ppx after 24\u201348h if stable](#/node/ich-dvt)',
        },
        {
            heading: '6. Disposition',
            body: '• [ICU admission for all ICH patients](#/node/ich-disposition)\n• [Serial CT at 6h and 24h](#/node/ich-disposition)\n• [Early goals-of-care discussion](#/node/ich-disposition)',
        },
    ],
    citations: [
        { num: 1, text: 'Greenberg SM, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage. Stroke. 2022;53(7):e282-e361.' },
        { num: 2, text: 'Steiner T, et al. ESO/EANS guideline on stroke due to spontaneous intracerebral haemorrhage. Eur Stroke J. 2025;10(4):1007-1086.' },
    ],
};
const ICH_CT_MARKERS = {
    id: 'ich-ct-markers',
    title: 'CT Markers of Hemorrhage Expansion',
    subtitle: 'Non-contrast CT and CTA signs predicting hematoma growth',
    sections: [
        {
            heading: 'Non-contrast CT Signs',
            body: '**Swirl sign** \u2014 Areas of varying density within the hematoma. Fresh unclotted blood is hypodense relative to clotted blood. Indicates active hemorrhage.\n\n**Black hole sign** \u2014 Relatively dark area within the hematoma not connected to adjacent brain tissue. Predicts hematoma growth (32% sensitivity, 94% specificity).\n\n**Blend sign** \u2014 Hematoma contains both hyperdense and hypodense regions.\n\n**Fluid-fluid level** \u2014 Highly specific for coagulopathy or anticoagulant use. If present and no anticoagulant identified, search aggressively for occult coagulopathy.\n\n**Island sign** \u2014 \u22653 small hemorrhages separated from the main hematoma.\n\n**Isodense/hypodense blood** \u2014 On initial CT, may indicate coagulopathy (clotting retarded by anticoagulant effect).',
        },
        {
            heading: 'CT Angiography: Spot Sign',
            body: '**Spot sign** \u2014 Leakage of contrast into the hematoma. 51% sensitivity, 85% specificity for predicting expansion. Must NOT be in anatomic continuity with adjacent blood vessels.\n\nThe spot sign is a key indicator for early hematoma expansion risk and may influence aggressiveness of BP management and reversal strategy.',
        },
        {
            heading: 'Edema',
            body: 'Edema takes several hours to develop \u2014 usually not seen on initial CT.\n\n**Unusually extensive or irregular edema** raises suspicion for:\n• Cerebral venous thrombosis (CVT) with secondary hemorrhage\n• Ischemic stroke with hemorrhagic transformation\n• Tumor with intratumoral hemorrhage\n\nPerihematomal edema peaks at ~5\u20136 days. This is cytotoxic edema \u2014 does NOT respond to steroids.',
        },
    ],
    citations: [
        { num: 1, text: 'Boulouis G, et al. Noncontrast CT Markers of Intracerebral Hemorrhage Expansion. Stroke. 2017;48(4):1120-1125.' },
        { num: 2, text: 'Menon BK. Neuroimaging in Acute Stroke. Continuum (Minneap Minn). 2020;26(2):287-309.' },
    ],
};
const ICH_CAUSES = {
    id: 'ich-causes',
    title: 'Causes of ICH',
    subtitle: 'Etiologic classification of spontaneous intracerebral hemorrhage',
    sections: [
        {
            heading: 'Small Vessel Disease (\u201cPrimary ICH\u201d) \u2014 ~80%',
            body: '**Hypertensive ICH** \u2014 most common cause. Same arterial lipohyalinization that causes lacunar strokes.\n\u2022 Basal ganglia / external capsule (60\u201365%)\n\u2022 Thalamus (15\u201320%)\n\u2022 Pons or deep cerebellar nuclei (10%)\n\n**Cerebral amyloid angiopathy (CAA)** \u2014 ~15% of all spontaneous ICH. Most common cause of lobar hemorrhage in normotensive elderly patients. Beta-amyloid deposition in cortical and leptomeningeal vessels. Associated with Alzheimer disease. [See CAA details](#/info/ich-caa)',
        },
        {
            heading: 'Macrovascular Etiologies',
            body: 'Most common cause of ICH in young adults. Often require surgical or endovascular intervention.\n\n\u2022 **Aneurysmal rupture** \u2014 usually has subarachnoid component; frontal (ACA/AComm) or temporal (MCA) location\n\u2022 **Arteriovenous malformation (AVM)** \u2014 key in young patients\n\u2022 **Cerebral venous thrombosis (CVT)** \u2014 consider if younger patient, hypercoagulable state, bilateral hemorrhages, or excess edema\n\u2022 **Cavernous malformation** \u2014 popcorn-like appearance on T2 MRI\n\u2022 **Dural arteriovenous fistula (dAVF)**\n\u2022 **Mycotic aneurysm** \u2014 endocarditis/bacteremia\n\u2022 **Moyamoya disease**',
        },
        {
            heading: 'Other Etiologies',
            body: '\u2022 **Malignancy** \u2014 primary brain tumor or hemorrhagic metastasis\n\u2022 **Ischemic stroke with hemorrhagic conversion**\n\u2022 **RCVS** (reversible cerebral vasospasm syndrome)\n\u2022 **Coagulopathy** \u2014 warfarin, DOACs, liver disease, DIC\n\u2022 **Sympathomimetic drug use** \u2014 cocaine, amphetamines\n\u2022 **Vasculitis** \u2014 PAN, lupus, ANCA vasculitis, drug-induced',
        },
    ],
    citations: [
        { num: 1, text: 'Nobleza COS. Intracerebral Hemorrhage. Continuum (Minneap Minn). 2021;27(5):1246-1277.' },
        { num: 2, text: 'McGurgan IJ, et al. Acute intracerebral haemorrhage: diagnosis and management. Pract Neurol. 2021;21(2):128-136.' },
    ],
};
const ICH_CAA = {
    id: 'ich-caa',
    title: 'Cerebral Amyloid Angiopathy (CAA)',
    subtitle: 'Beta-amyloid vasculopathy causing lobar ICH in the elderly',
    sections: [
        {
            heading: 'Overview',
            body: 'Cerebrovascular disorder caused by beta-amyloid deposition in small-to-medium cortical and leptomeningeal arteries. Prevalence ~5% in people >65 years. Accounts for ~15% of all spontaneous ICH. Associated with Alzheimer disease.\n\nMost common cause of **lobar hemorrhage in normotensive elderly** patients. However, half of lobar ICH in the elderly is NOT due to CAA.',
        },
        {
            heading: 'Imaging Features',
            body: '\u2022 **Location:** Lobar hemorrhage (occipital and parietal lobes most common)\n\u2022 **Finger-like projections** extending from the hemorrhage\n\u2022 Extension may involve subarachnoid, subdural, or intraventricular spaces\n\u2022 **MRI GRE/SWI:** Multiple microhemorrhages at grey-white junction and/or convexity, with hemosiderosis\n\n**Clinical hint:** Elderly patient + cognitive decline + lobar hemorrhage + small amount of cortical subarachnoid hemorrhage = likely amyloid angiopathy.',
        },
        {
            heading: 'Prognosis & Implications',
            body: 'Short-term prognosis is often favorable, but **high recurrence risk (~7.5%/year)** and progressive cognitive decline.\n\n**Critical:** Patients diagnosed with CAA should generally **NOT be restarted on anticoagulation** due to very high risk of recurrent hemorrhage. This is a key management decision that differs from non-CAA ICH.\n\nAntiplatelet monotherapy may be considered with careful risk-benefit analysis.',
        },
        {
            heading: 'Inflammatory CAA (CAA-ri)',
            body: 'Rare variant where perivascular beta-amyloid triggers inflammation. Mean onset in 70s.\n\n**Presentation:** Acute/subacute headache, reduced consciousness, behavioral change, focal neurologic signs, seizures.\n\n**MRI:** Vasogenic edema in subcortical white matter with mass effect + underlying CAA features (microhemorrhages).\n\n**Treatment:** May respond to steroids followed by cyclophosphamide.',
        },
    ],
    citations: [
        { num: 1, text: 'Schrag M, Kirshner H. Management of Intracerebral Hemorrhage: JACC Focus Seminar. J Am Coll Cardiol. 2020;75(15):1819-1831.' },
        { num: 2, text: 'Nobleza COS. Intracerebral Hemorrhage. Continuum (Minneap Minn). 2021;27(5):1246-1277.' },
    ],
};
const ICH_PROGNOSTICATION = {
    id: 'ich-prognostication',
    title: 'ICH Prognostication',
    subtitle: 'ICH Score and FUNC Score for risk stratification',
    sections: [
        {
            heading: 'Overall Prognosis',
            body: '30-day mortality: ~40%\n1-year survival: ~50%\n5-year survival: ~30%\nFunctional independence at 1 year: ~20%\n\n**Predictors of poor outcome:**\n\u2022 Hematoma volume >60 mL\n\u2022 GCS <8\n\u2022 Deep or infratentorial location\n\u2022 Intraventricular extension\n\u2022 Increasing age',
        },
        {
            heading: 'ICH Score (30-Day Mortality)',
            body: '**Components (0\u20136 points):**\n\u2022 GCS 3\u20134: +2 pts | GCS 5\u201312: +1 pt | GCS 13\u201315: 0 pts\n\u2022 Hematoma volume \u226530 mL: +1 pt\n\u2022 Intraventricular hemorrhage: +1 pt\n\u2022 Infratentorial origin: +1 pt\n\u2022 Age \u226580: +1 pt\n\n**Mortality by score:**\n\u2022 ICH 0: ~0%\n\u2022 ICH 1: ~13%\n\u2022 ICH 2: ~26%\n\u2022 ICH 3: ~72%\n\u2022 ICH 4: ~97%\n\u2022 ICH 5\u20136: ~100%',
        },
        {
            heading: 'ICH Score Limitations',
            body: '\u2022 Transient impairment (sedation, hypercapnia) may inflate the score\n\u2022 Hydrocephalus may cause reversible consciousness impairment \u2014 treatable with EVD\n\u2022 No distinction between tiny vs massive IVH\n\u2022 No distinction between pontine (poor) vs cerebellar (treatable) infratentorial bleeds\n\u2022 No distinction between age 18 and 79\n\u2022 Does not account for pre-existing functional status/frailty\n\n**Caution:** These scores should NOT be used to justify withdrawal of care. Self-fulfilling prophecy bias is a known limitation \u2014 aggressive early treatment may improve outcomes beyond what the scores predict.',
        },
        {
            heading: 'FUNC Score (90-Day Functional Independence)',
            body: '**Components (0\u201311 points):**\n\u2022 ICH volume: <30 mL (+4) | 30\u201359 mL (+2) | \u226560 mL (0)\n\u2022 Age: <70 (+2) | 70\u201379 (+1) | \u226580 (0)\n\u2022 Location: Lobar (+2) | Deep (+1) | Infratentorial (0)\n\u2022 GCS: \u22659 (+2) | <9 (0)\n\u2022 Pre-ICH cognitive impairment: No (+1) | Yes (0)\n\n**Probability of functional independence at 90 days:**\n\u2022 FUNC 0\u20134: 0\u20132%\n\u2022 FUNC 5\u20137: 6\u201329%\n\u2022 FUNC 8: 42%\n\u2022 FUNC 9\u201310: 55\u201366%\n\u2022 FUNC 11: 80%',
        },
    ],
    citations: [
        { num: 1, text: 'Hemphill JC 3rd, et al. The ICH Score: A Simple, Reliable Grading Scale for Intracerebral Hemorrhage. Stroke. 2001;32(4):891-897.' },
        { num: 2, text: 'Rost NS, et al. Prediction of Functional Outcome in Patients With Primary Intracerebral Hemorrhage: The FUNC Score. Stroke. 2008;39(8):2304-2309.' },
    ],
};
// -------------------------------------------------------------------
// AUB — Coagulopathy Screening Tool
// -------------------------------------------------------------------
const AUB_COAG_SCREEN = {
    id: 'aub-coag-screen',
    title: 'Coagulopathy Screening Tool',
    subtitle: 'ACOG screening for underlying bleeding disorders in AUB',
    sections: [
        {
            heading: 'Positive Screen Criteria (ACOG)',
            body: 'A positive screening result comprises:\n\n\u2022 **Heavy menstrual bleeding since menarche**\n\nPLUS one of the following:\n\u2022 Postpartum hemorrhage\n\u2022 Surgery-related bleeding\n\u2022 Bleeding associated with dental work\n\nOR two or more of the following:\n\u2022 Bruising 1\u20132 times per month\n\u2022 Epistaxis 1\u20132 times per month\n\u2022 Frequent gum bleeding\n\u2022 Family history of bleeding symptoms',
        },
        {
            heading: 'If Screening is Positive',
            body: '\u2022 Order: **von Willebrand factor antigen**, **ristocetin cofactor activity**, **Factor VIII**\n\u2022 Consult hematology for interpretation\n\u2022 Up to 13% of women with heavy menstrual bleeding have von Willebrand disease\n\u2022 Up to 20% may have some underlying coagulation disorder\n\u2022 Also consider: other coagulation factor deficiencies, platelet function disorders, hemophilia carriers',
        },
        {
            heading: 'Other Lab Considerations',
            body: '\u2022 Systemic diseases (leukemia, liver failure) can impair coagulation\n\u2022 Medications (anticoagulants, chemotherapy) should be reviewed\n\u2022 Adolescents with heavy menses since menarche presenting with acute AUB should undergo vWD testing regardless of screening result',
        },
    ],
    citations: [
        { num: 1, text: 'ACOG Committee Opinion No. 557. Management of Acute AUB in Nonpregnant Reproductive-Aged Women. Obstet Gynecol. 2013;121(4):891-896.' },
        { num: 2, text: 'Kouides PA, et al. Hemostasis and menstruation. Fertil Steril. 2005;84(5):1345-1351.' },
    ],
};
// -------------------------------------------------------------------
// AUB — PALM-COEIN Classification
// -------------------------------------------------------------------
const AUB_PALM_COEIN = {
    id: 'aub-palm-coein',
    title: 'PALM-COEIN Classification',
    subtitle: 'FIGO classification system for causes of AUB',
    sections: [
        {
            heading: 'PALM — Structural Causes',
            body: '**Polyp (AUB-P)**\nEndometrial or endocervical growths. Often asymptomatic but can cause intermenstrual or heavy bleeding. Diagnosed by US or hysteroscopy. Treatment: polypectomy.\n\n**Adenomyosis (AUB-A)**\nEndometrial tissue within the myometrium. Causes heavy, painful periods with diffuse uterine enlargement. Diagnosed by MRI or US. Treatment: medical or hysterectomy.\n\n**Leiomyoma (AUB-L)**\nBenign smooth muscle tumors. Submucosal fibroids (AUB-L\u209bM) most likely to cause AUB. Size and location guide management. Treatment: medical, myomectomy, UAE, or hysterectomy.\n\n**Malignancy & Hyperplasia (AUB-M)**\nEndometrial hyperplasia or carcinoma. Diagnosed by endometrial biopsy. Risk factors: age, obesity, unopposed estrogen, PCOS, tamoxifen, Lynch syndrome. Requires GYN oncology referral.',
        },
        {
            heading: 'COEIN — Non-Structural Causes',
            body: '**Coagulopathy (AUB-C)**\nInherited or acquired bleeding disorders. vWD most common (up to 13% of HMB). Screen with structured tool.\n\n**Ovulatory Dysfunction (AUB-O)**\nMost common cause of dysfunctional uterine bleeding (~80%). Anovulatory cycles lead to unopposed estrogen \u2192 endometrial proliferation \u2192 irregular shedding. Common in: PCOS, obesity, perimenarchal, perimenopausal, stress, weight changes.\n\n**Endometrial (AUB-E)**\nPrimary endometrial disorder with normal ovulatory cycles. Defects in local hemostasis, inflammation, or angiogenesis.\n\n**Iatrogenic (AUB-I)**\nMedication-related: anticoagulants, hormonal therapy, IUD, chemotherapy, steroids.\n\n**Not Yet Classified (AUB-N)**\nRare or poorly understood etiologies (e.g., AV malformations, myometrial hypertrophy).',
        },
    ],
    citations: [
        { num: 1, text: 'Munro MG, et al. FIGO classification system (PALM-COEIN) for causes of AUB. Int J Gynaecol Obstet. 2011;113(1):3-13.' },
        { num: 2, text: 'ACOG Committee Opinion No. 557. Management of Acute AUB. Obstet Gynecol. 2013;121(4):891-896.' },
    ],
};
// -------------------------------------------------------------------
// AUB — Endometrial Cancer Risk Factors
// -------------------------------------------------------------------
const AUB_ENDO_CANCER_RISK = {
    id: 'aub-endo-cancer-risk',
    title: 'Endometrial Cancer Risk Factors',
    subtitle: 'Who needs endometrial biopsy?',
    sections: [
        {
            heading: 'Risk Factors & Relative Risk',
            body: '\u2022 **Increasing age** \u2014 1.4% prevalence in women 50\u201370\n\u2022 **Unopposed estrogen therapy** \u2014 RR 2\u201310\n\u2022 **Tamoxifen therapy** \u2014 RR 2\n\u2022 **Early menarche** \u2014 increased risk\n\u2022 **Late menopause (after age 55)** \u2014 RR 2\n\u2022 **Nulliparity** \u2014 RR 2\n\u2022 **PCOS (chronic anovulation)** \u2014 RR 3\n\u2022 **Obesity** \u2014 RR 2\u20134\n\u2022 **Diabetes mellitus** \u2014 RR 2\n\u2022 **Lynch syndrome (HNPCC)** \u2014 22\u201350% lifetime risk\n\u2022 **Cowden syndrome** \u2014 13\u201319% lifetime risk\n\u2022 **Family history** of endometrial, ovarian, breast, or colon cancer',
        },
        {
            heading: 'Biopsy Indications (ACOG)',
            body: '\u2022 **Age \u226545** with AUB \u2014 first-line test\n\u2022 **Age <45** with any of:\n  \u2014 Obesity or PCOS (unopposed estrogen exposure)\n  \u2014 Chronic anovulation\n  \u2014 Failed medical management of AUB\n  \u2014 Persistent AUB\n\u2022 Postmenopausal bleeding (always evaluate)\n\n**Obese patients** are at particularly high risk \u2014 adipose tissue converts androgens to estrogen via aromatase, creating chronic unopposed estrogen stimulation of the endometrium.',
        },
    ],
    citations: [
        { num: 1, text: 'Smith RA, et al. ACS guidelines for early detection of cancer. CA Cancer J Clin. 2001;51:38.' },
        { num: 2, text: 'ACOG Practice Bulletin No. 128. Diagnosis of AUB in reproductive-aged women. Obstet Gynecol. 2012;120:197-206.' },
    ],
};
// -------------------------------------------------------------------
// AUB — Treatment Regimens Table
// -------------------------------------------------------------------
const AUB_TREATMENT_TABLE = {
    id: 'aub-treatment-table',
    title: 'AUB Treatment Regimens',
    subtitle: 'Medical management comparison — dosing, efficacy, and contraindications',
    sections: [
        {
            heading: 'IV Conjugated Equine Estrogen (Premarin)',
            body: '**Dose:** 25 mg IV q4\u20136h for up to 24h\n**Efficacy:** 72% stop bleeding within 8h\n**Key CI:** Active VTE, breast cancer, hepatic disease\n**Notes:** Only FDA-approved treatment for acute AUB. Must follow with progestin (MPA 10 mg PO \u00d7 10d). Premedicate with antiemetic.',
        },
        {
            heading: 'Combined Oral Contraceptives (OCPs)',
            body: '**Dose:** Monophasic OCP with 35 mcg ethinyl estradiol, 1 tab TID \u00d7 7 days\n**Efficacy:** 88% stop bleeding (median 3 days)\n**Key CI:** Smoking + age >35, HTN, VTE history, migraine with aura, breast cancer\n**Notes:** Preferred for ovulatory dysfunction AUB. Provides cycle regulation. Can transition to daily OCP for maintenance.',
        },
        {
            heading: 'Medroxyprogesterone Acetate (MPA)',
            body: '**Dose:** 20 mg PO TID \u00d7 7 days\n**Efficacy:** 76% stop bleeding (median 3 days)\n**Key CI:** Active VTE, breast cancer, hepatic disease\n**Notes:** Preferred when estrogen contraindicated. Good for obese/PCOS patients. Alternative progestins (norethindrone acetate) may also be effective.',
        },
        {
            heading: 'Tranexamic Acid (TXA)',
            body: '**Dose:** [Tranexamic Acid](#/drug/tranexamic-acid/aub) 1.3 g PO TID \u00d7 5 days OR 10 mg/kg IV (max 600 mg) q8h\n**Efficacy:** Reduces menstrual blood loss 30\u201355%\n**Key CI:** Active thrombosis, impaired color vision\n**Notes:** Antifibrinolytic \u2014 can use alone or as adjunct. Does not affect fertility. Caution with concurrent OCPs (additive thrombotic risk).',
        },
        {
            heading: 'Intrauterine Tamponade (Procedural)',
            body: '**Method:** 26F Foley catheter inflated with 30 mL saline in uterine cavity. Bakri balloon (up to 300 mL) for enlarged uterus. Alternative: gauze packing with thrombin.\n**When:** GYN unavailable and medical therapy insufficient\n**Notes:** Temporizing measure while arranging definitive care. Consult GYN STAT.',
        },
    ],
    citations: [
        { num: 1, text: 'ACOG Committee Opinion No. 557. Management of Acute AUB. Obstet Gynecol. 2013;121(4):891-896.' },
        { num: 2, text: 'DeVore GR, et al. IV Premarin for DUB. Obstet Gynecol. 1982;59(3):285-291.' },
        { num: 3, text: 'Munro MG, et al. Oral MPA and OCPs for acute uterine bleeding: RCT. Obstet Gynecol. 2006;108:924-929.' },
    ],
};
// -------------------------------------------------------------------
// AUB — Surgical Management Options
// -------------------------------------------------------------------
const AUB_SURGICAL = {
    id: 'aub-surgical',
    title: 'Surgical Management Options',
    subtitle: 'When medical therapy fails or is contraindicated',
    sections: [
        {
            heading: 'Indications for Surgery',
            body: '\u2022 Clinically unstable despite medical management\n\u2022 Failed medical therapy\n\u2022 Contraindications to all medical therapies\n\u2022 Suspected structural pathology requiring tissue diagnosis\n\u2022 Known malignancy',
        },
        {
            heading: 'D&C with Hysteroscopy',
            body: '**Diagnostic + therapeutic.** Preferred if intrauterine pathology suspected (polyp, submucosal fibroid). D&C alone (without hysteroscopy) is inadequate for evaluation and provides only temporary reduction \u2014 subsequent cycles are not improved. Preserves fertility.',
        },
        {
            heading: 'Endometrial Ablation',
            body: 'Destroys the endometrial lining. Only if:\n\u2022 Other treatments ineffective or contraindicated\n\u2022 **Childbearing complete** (pregnancy after ablation is dangerous)\n\u2022 Endometrial/uterine cancer **reliably ruled out**\n\nMultiple techniques: thermal balloon, radiofrequency, cryoablation.',
        },
        {
            heading: 'Uterine Artery Embolization (UAE)',
            body: 'Interventional radiology procedure. Most effective for fibroid-related AUB. Reduces blood supply to fibroids. May affect future fertility \u2014 discuss with patient. Case reports show successful use for acute AUB control.',
        },
        {
            heading: 'Hysterectomy',
            body: '**Definitive treatment** for controlling heavy bleeding. Reserved for:\n\u2022 Failure of all medical and less-invasive surgical options\n\u2022 Completed childbearing\n\u2022 Known malignancy\n\u2022 Patient preference after counseling\n\nMay be performed vaginally, laparoscopically, or via laparotomy depending on clinical context.',
        },
    ],
    citations: [
        { num: 1, text: 'ACOG Committee Opinion No. 557. Management of Acute AUB. Obstet Gynecol. 2013;121(4):891-896.' },
    ],
};
// -------------------------------------------------------------------
// AUB — Long-term Maintenance Options
// -------------------------------------------------------------------
const AUB_MAINTENANCE = {
    id: 'aub-maintenance',
    title: 'Long-term Maintenance Options',
    subtitle: 'After acute AUB is controlled',
    sections: [
        {
            heading: 'Levonorgestrel IUD (Mirena)',
            body: 'Most effective medical option for long-term AUB management. Reduces menstrual blood loss by up to **97%**. Lasts 5\u20138 years. Especially beneficial for obese/PCOS patients \u2014 provides continuous endometrial suppression and reduces endometrial cancer risk.',
        },
        {
            heading: 'Cyclic OCPs',
            body: 'Monthly or extended-cycle regimens. Regulate ovulation, thin endometrium, reduce blood loss. Good first-line for younger patients who also need contraception. Review CDC MEC for eligibility.',
        },
        {
            heading: 'Progestin Therapy',
            body: '\u2022 **Oral progestins** (MPA, norethindrone) \u2014 cyclic (days 14\u201325) or continuous\n\u2022 **Depo-medroxyprogesterone** (DMPA) 150 mg IM q3 months\n\u2022 **Etonogestrel implant** (Nexplanon)\n\nPreferred when estrogen is contraindicated. Critical for obese/PCOS patients to prevent endometrial hyperplasia from chronic unopposed estrogen.',
        },
        {
            heading: 'Tranexamic Acid',
            body: '1.3 g PO TID during menses (first 5 days). Non-hormonal option. Can be combined with hormonal therapies. Does not affect fertility or cycle regularity.',
        },
        {
            heading: 'NSAIDs',
            body: 'Ibuprofen, naproxen, mefenamic acid. Reduce menstrual blood loss by 20\u201350% via prostaglandin inhibition. Take during menses only. **Avoid in patients with bleeding disorders** (impair platelet aggregation).',
        },
    ],
    citations: [
        { num: 1, text: 'NICE. Heavy menstrual bleeding: assessment and management. Clinical guideline CG44. 2007 (updated 2018).' },
        { num: 2, text: 'ACOG Committee Opinion No. 557. Management of Acute AUB. Obstet Gynecol. 2013;121(4):891-896.' },
    ],
};
// -------------------------------------------------------------------
// AUB — Discharge Instructions (shareable)
// -------------------------------------------------------------------
const AUB_DISCHARGE = {
    id: 'aub-discharge',
    title: 'Discharge Instructions',
    shareable: true,
    subtitle: 'Abnormal Uterine Bleeding',
    sections: [
        {
            heading: 'Your Diagnosis',
            body: 'You were seen in the emergency department for abnormal uterine bleeding. You have been started on medication to help control the bleeding.',
        },
        {
            heading: 'Medications',
            body: '\u2022 Take your prescribed medication exactly as directed\n\u2022 Complete the **full course** (usually 7 days) even if bleeding improves\n\u2022 You may experience nausea with hormonal medications \u2014 take with food\n\u2022 If prescribed iron supplements, take on an empty stomach with vitamin C for best absorption (or with food if nausea occurs)',
        },
        {
            heading: 'Return to the ED Immediately If',
            body: '\u2022 Soaking through more than 1 pad or tampon per hour for 2 or more hours in a row\n\u2022 Feeling dizzy, lightheaded, or faint\n\u2022 Passing out (syncope)\n\u2022 Chest pain or difficulty breathing\n\u2022 Fever (temperature above 100.4\u00b0F / 38\u00b0C)\n\u2022 Severe abdominal or pelvic pain\n\u2022 Bleeding does not improve after completing your medication course',
        },
        {
            heading: 'Follow-Up Care',
            body: '\u2022 **See a gynecologist (OB/GYN) within 1\u20132 weeks**\n\u2022 Your doctor may recommend additional testing or long-term treatment to prevent future episodes\n\u2022 If you have obesity or irregular periods, long-term hormonal management is important to reduce your risk of future complications\n\u2022 Continue iron supplements if you were told you are anemic',
        },
        {
            heading: 'Important Reminders',
            body: '\u2022 Do not skip doses of your medication\n\u2022 Avoid aspirin and ibuprofen unless approved by your doctor (they can worsen bleeding)\n\u2022 Stay well hydrated\n\u2022 Rest as needed \u2014 you may feel tired from blood loss\n\u2022 Keep track of your bleeding pattern to share with your gynecologist',
        },
    ],
    citations: [
        { num: 1, text: 'ACOG Committee Opinion No. 557. Management of Acute AUB. Obstet Gynecol. 2013;121(4):891-896.' },
    ],
};
// -------------------------------------------------------------------
// Status Epilepticus
// -------------------------------------------------------------------
const SE_SUMMARY = {
    id: 'se-summary',
    title: 'Status Epilepticus Steps Summary',
    subtitle: 'Time-Critical Treatment Ladder',
    sections: [
        {
            body: 'Quick-reference checklist for the escalating treatment of status epilepticus. Tap any step to jump directly to that decision point in the consult.',
        },
        {
            heading: 'Phase 1: Recognition & Stabilization (0-5 min)',
            body: '• [Confirm SE: seizure >5 min or recurrent without recovery](#/node/se-is-this-se)\n• [ABCs — left lateral decubitus, O2, IV access × 2, monitor](#/node/se-abcs)\n• [Fingerstick glucose STAT — treat hypoglycemia immediately](#/node/se-glucose-labs)\n• [Obtain labs: BMP (Na, Ca, Mg), CBC, UDS, lactate, ASM levels](#/node/se-glucose-labs)',
        },
        {
            heading: 'Phase 2: First-Line Benzodiazepine (0-5 min)',
            body: '• [IV access: Lorazepam 0.1 mg/kg IV (max 4 mg), repeat × 1](#/node/se-iv-bzd)\n• [No IV: Midazolam 0.2 mg/kg IM (max 10 mg)](#/node/se-no-iv-bzd)\n• [Assess response 5 min after BZD — up to 2 doses allowed](#/node/se-bzd-response)',
        },
        {
            heading: 'Phase 3: Screen Special Populations',
            body: '• [Pregnant / eclampsia → Magnesium sulfate first](#/node/se-pregnancy)\n• [Toxic ingestion (INH) → Pyridoxine is specific antidote](#/node/se-substance)\n• [Pediatric → same algorithm, weight-based dosing](#/node/se-peds)',
        },
        {
            heading: 'Phase 4: Second-Line ASM (5-20 min)',
            body: '• [Select 2nd-line agent — ESETT: all three are equivalent](#/node/se-2nd-line-choice)\n• [Levetiracetam 60 mg/kg IV (max 4500 mg) — fewest interactions](#/node/se-levetiracetam)\n• [Valproate 40 mg/kg IV (max 3000 mg) — avoid in pregnancy/liver disease](#/node/se-valproate)\n• [Fosphenytoin 20 mg PE/kg IV (max 1500 mg PE) — cardiac monitoring required](#/node/se-fosphenytoin)\n• [Phenobarbital 15-20 mg/kg IV — if above unavailable](#/node/se-phenobarbital)',
        },
        {
            heading: 'Phase 5: Refractory SE (>20 min)',
            body: '• [Intubate — RSI with short-acting paralytic](#/node/se-rse-prep)\n• [Start continuous EEG monitoring — MANDATORY](#/node/se-rse-prep)\n• [Select continuous infusion: midazolam, propofol, pentobarbital, or ketamine](#/node/se-rse-infusion)\n• [Target burst suppression on EEG × 24-48h before wean attempt](#/node/se-rse-monitoring)',
        },
        {
            heading: 'Phase 6: Disposition',
            body: '• [All SE → ICU admission with continuous EEG](#/node/se-disposition)\n• [Complete etiology workup: MRI, LP if indicated, autoimmune panel](#/node/se-disposition)\n• [Neurology consultation for all SE patients](#/node/se-disposition)',
        },
    ],
    citations: [
        { num: 1, text: 'Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).' },
        { num: 2, text: 'Brophy GM, et al. Guidelines for Status Epilepticus. Neurocrit Care. 2012;17(1):3-23.' },
    ],
};
const SE_LABS = {
    id: 'se-labs',
    title: 'SE Diagnostic Workup',
    subtitle: 'Laboratory Testing, Imaging & EEG',
    sections: [
        {
            body: 'Comprehensive workup for status epilepticus — identify reversible causes and guide management.',
        },
        {
            heading: 'Immediate (Do Not Delay Treatment)',
            body: '• **Fingerstick glucose** — hypoglycemia and hyperglycemia (non-ketotic hyperosmolar) cause seizures\n• **Point-of-care electrolytes** if available — Na, Ca, glucose',
        },
        {
            heading: 'Priority Laboratory Tests',
            body: '• **Complete blood count** — leukocytosis may indicate infection (transient leukocytosis common post-seizure)\n• **Comprehensive metabolic panel** — Na, Ca, Mg, Phos as metabolic seizure etiologies\n• **Urine drug screen** — cocaine, amphetamines, MDMA, marijuana, heroin all associated with seizures\n• **Serum toxicology** — acetaminophen, salicylate, ethanol levels\n• **Lactate** — excess from muscle tissue; if elevated >1h post-seizure, monitor for persistent acidosis. Lactate >2.45 mmol/L distinguishes GTC from syncope/PNES (sensitivity 88%, specificity 87%)\n• **Blood gas (VBG/ABG)** — respiratory acidosis, hypercarbia in depressed mental status\n• **Pregnancy test** — positive test limits certain ASMs due to teratogenicity',
        },
        {
            heading: 'Additional Studies',
            body: '• **ASM levels** — assess medication compliance in known epilepsy patients\n• **Prolactin** — draw 10-20 min post-seizure. Sensitivity 53%, specificity 93% for convulsive SE. Limited by narrow collection window.\n• **Creatine kinase (CK)** — rises 1-12h, peaks 24-72h. Trend for rhabdomyolysis and AKI. Sensitivity 14-87%, specificity 85-100%.\n• **Troponin** — can be elevated with seizures (autonomic features). Prompt cardiac evaluation if elevated.\n• **Cultures** — blood, urine, CSF if infection suspected',
        },
        {
            heading: 'Imaging',
            body: '• **CT head non-contrast** — first-line after stabilization. Evaluate for hemorrhage, mass, edema, herniation. Normal CT does not rule out elevated ICP.\n• **CT/MR venogram** — consider if risk for cerebral venous thrombosis (hypercoagulability, recent pregnancy, OCP use, headache, papilledema)\n• **MRI brain** — superior for structural causes. Obtain when stable. DWI for acute ischemia, FLAIR for edema/encephalitis.',
        },
        {
            heading: 'Lumbar Puncture',
            body: '• **Indications:** Signs of meningitis, critically ill patients, age ≤18 months with febrile seizure, new-onset seizures without obvious cause, antibiotics given prior to evaluation, incomplete/unknown vaccination history\n• Obtain CT head before LP if altered mental status or focal neurologic deficit\n• CSF pleocytosis should prompt further investigation — seizures alone do NOT cause CSF pleocytosis\n• Low threshold to test CSF for infectious causes — delays in treating CNS infection worsen outcomes',
        },
        {
            heading: 'Electroencephalogram (EEG)',
            body: '• **Continuous EEG** recommended when: patient does not return to baseline, concern for NCSE, clinical evaluation limited by sedation or paralysis\n• ESETT: 48% of patients with altered consciousness post-SE had NCSE on EEG\n• **Intermittent EEG** (30-60 min) may miss up to 10% of subclinical seizures\n• High-risk populations for NCSE: ICU patients on neurotoxic medications, history of epilepsy, prior GTC, prior head injury/stroke, female sex',
        },
    ],
    citations: [
        { num: 1, text: 'Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).' },
        { num: 2, text: 'Brophy GM, et al. Guidelines for Status Epilepticus. Neurocrit Care. 2012;17(1):3-23.' },
    ],
};
const SE_ASM_COMPARISON = {
    id: 'se-asm-comparison',
    title: '2nd-Line ASM Comparison',
    subtitle: 'ESETT Trial Results & Clinical Selection',
    sections: [
        {
            body: 'The ESETT trial (2019) randomized 475 patients to levetiracetam, fosphenytoin, or valproate for BZD-refractory SE. **No significant difference in efficacy or adverse events** between the three agents. Choice should be tailored to patient comorbidities. [1]',
        },
        {
            heading: 'Efficacy (ESETT)',
            body: '',
            drugTable: [
                { drug: '[Levetiracetam](#/drug/levetiracetam/status epilepticus)', regimen: '60 mg/kg IV (max 4500 mg) over 10-15 min. **47% seizure cessation at 60 min.** Onset: 5-10 min. [1]' },
                { drug: '[Valproate Sodium](#/drug/valproate/status epilepticus)', regimen: '40 mg/kg IV (max 3000 mg) over 10 min. **46% seizure cessation at 60 min.** Onset: 5-10 min. [1]' },
                { drug: '[Fosphenytoin](#/drug/fosphenytoin/status epilepticus)', regimen: '20 mg PE/kg IV (max 1500 mg PE) at 150 mg PE/min. **45% seizure cessation at 60 min.** Onset: 10-20 min. [1]' },
                { drug: '[Phenobarbital](#/drug/phenobarbital/status epilepticus)', regimen: '15-20 mg/kg IV at 50-100 mg/min (max 2000 mg). Not in ESETT. Use if above unavailable. [2]' },
            ],
        },
        {
            heading: 'When to Choose Each Agent',
            body: '**Levetiracetam** — Best overall safety profile\n• Fewest drug interactions\n• No cardiac effects (no telemetry needed during infusion)\n• Safe in hepatic failure, renal impairment (dose adjust)\n• Safe in pregnancy (preferred 2nd-line)\n• Caution: psychiatric side effects (irritability, agitation)\n\n**Valproate** — Broad-spectrum efficacy\n• Well-tolerated even at rapid infusion rates\n• AVOID in: pregnancy (Category X), liver disease, mitochondrial disorders, thrombocytopenia, pancreatitis, urea cycle disorders\n• Check ammonia if AMS persists\n\n**Fosphenytoin** — When specific indication exists\n• Requires cardiac monitoring during/after infusion\n• INEFFECTIVE for drug/alcohol-induced seizures\n• AVOID in: cardiac conduction disease, hypotension, drug-induced SE\n• Can be given IM (unlike phenytoin)\n\n**Phenobarbital** — Backup option\n• When ESETT agents unavailable\n• Effective for alcohol withdrawal seizures\n• Significant respiratory depression and hypotension\n• Also first-line for neonatal seizures',
        },
        {
            heading: 'Side-Effect Comparison',
            body: '• **Levetiracetam:** Psychiatric symptoms, drowsiness. Caution in mood disorders.\n• **Valproate:** Thrombocytopenia, hyperammonemia, hepatotoxicity, teratogenicity. Caution in liver disease, pregnancy.\n• **Fosphenytoin:** Cardiac arrhythmia, hypotension, Stevens-Johnson syndrome. Caution in cardiac disease.\n• **Lacosamide (adjunct):** PR prolongation, cardiac arrhythmia. Caution in cardiovascular disease. Not yet standard of care.\n• **Phenobarbital:** Respiratory depression, hypotension. Caution with concurrent BZDs. [3]',
        },
    ],
    citations: [
        { num: 1, text: 'Kapur J, et al. ESETT: Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus. N Engl J Med. 2019;381(22):2103-2113.' },
        { num: 2, text: 'Brophy GM, et al. Guidelines for the Evaluation and Management of Status Epilepticus. Neurocrit Care. 2012;17(1):3-23.' },
        { num: 3, text: 'Yasiry Z, Shorvon SD. Relative Effectiveness of Five Antiepileptic Drugs in Treatment of BZD-Resistant Convulsive SE. Epilepsia. 2014;55(9):1349-1361.' },
    ],
};
const SE_INFUSION_COMPARISON = {
    id: 'se-infusion-comparison',
    title: 'RSE Continuous Infusion Comparison',
    subtitle: 'Refractory SE Anesthetic Agents',
    sections: [
        {
            body: 'No large RCTs demonstrate clear superiority between agents for refractory SE. Choice based on clinical factors. All require mechanical ventilation, continuous EEG monitoring, and ICU-level care. [1]',
        },
        {
            heading: 'Agent Comparison',
            body: '',
            drugTable: [
                { drug: '[Midazolam](#/drug/midazolam/refractory status epilepticus)', regimen: 'Load 0.2 mg/kg IV, infuse 0.05-2 mg/kg/hr. Repeat bolus 0.1-0.2 mg/kg for breakthrough. **Lowest hemodynamic impact.** Easiest to wean. Tachyphylaxis may require dose escalation. [1]' },
                { drug: '[Propofol](#/drug/propofol/refractory status epilepticus)', regimen: 'Load 1-2 mg/kg IV, infuse 30-200 mcg/kg/min. Rapid onset/offset. **Watch for PRIS** (propofol infusion syndrome) with doses >80 mcg/kg/min for >48h — rhabdomyolysis, metabolic acidosis, cardiac failure. Check triglycerides q24-48h. [1]' },
                { drug: '[Pentobarbital](#/drug/pentobarbital/refractory status epilepticus)', regimen: 'Load 5-15 mg/kg IV over 1h, infuse 0.5-5 mg/kg/hr. **Deepest cerebral suppression.** Most hemodynamic compromise — vasopressors almost always required. Very long half-life (15-50h). [1]' },
                { drug: '[Ketamine](#/drug/ketamine/refractory status epilepticus)', regimen: 'Load 0.5-3 mg/kg IV, infuse 0.1-5 mg/kg/hr. **NMDA antagonist** — different mechanism from GABAergic agents. May be tried when midazolam and propofol fail. Some reports suggest trial before other anesthetics to potentially avoid intubation. [2]' },
            ],
        },
        {
            heading: 'Clinical Decision Factors',
            body: '**Choose midazolam when:**\n• Hemodynamic instability is a concern\n• Short duration of suppression anticipated\n• Easier ICU nursing management\n\n**Choose propofol when:**\n• Need for rapid onset and frequent neuro assessments\n• Younger patients (lower PRIS risk)\n• Shorter anticipated duration (<48h)\n\n**Choose pentobarbital when:**\n• Other agents have failed\n• Deepest level of suppression required\n• Hemodynamic support is available\n\n**Choose ketamine when:**\n• GABAergic agents have failed (different mechanism)\n• Hemodynamic support is limited (sympathomimetic effect)\n• Consider early trial to potentially avoid intubation',
        },
        {
            heading: 'EEG Targets',
            body: '• **Burst suppression:** 3-10 second bursts, <50% suppression ratio\n• **Seizure suppression:** Complete absence of electrographic seizures\n• Maintain for **24-48 hours** before first wean attempt\n• Wean by reducing infusion 25% every 4-6 hours with continuous EEG monitoring\n• Seizure recurrence on wean → restart at effective dose, extend 24h, retry',
        },
    ],
    citations: [
        { num: 1, text: 'Claassen J, et al. Treatment of Refractory SE with Pentobarbital, Propofol, or Midazolam: A Systematic Review. Epilepsia. 2002;43(2):146-153.' },
        { num: 2, text: 'Betjemann JP, et al. Status Epilepticus. Emergency Medicine Practice. 2025;27(9).' },
    ],
};
const SE_RSE_PRINCIPLES = {
    id: 'se-rse-principles',
    title: 'RSE Management Principles',
    subtitle: 'Intubation, EEG, and ICU Care',
    sections: [
        {
            body: 'Refractory SE requires coordinated critical care management with a focus on seizure suppression, airway protection, and neuroprotection.',
        },
        {
            heading: 'Airway Management',
            body: '• **RSI is indicated** — secure airway before starting continuous anesthetic infusions\n• Use **short-acting paralytic** (succinylcholine preferred over rocuronium) to allow ongoing clinical seizure assessment\n• Avoid prolonged paralysis — masks clinical seizure activity\n• Once paralyzed, **continuous EEG is the ONLY way** to monitor seizure activity\n• Post-intubation sedation with the chosen anesthetic infusion',
        },
        {
            heading: 'Continuous EEG Monitoring',
            body: '• **MANDATORY** for all RSE patients — cannot assess seizure activity in sedated/paralyzed patient\n• Target: burst suppression or complete seizure suppression (per clinical scenario)\n• Duration: maintain suppression × **24-48 hours** before first wean attempt\n• Automated seizure detection algorithms exist but are not yet available in most EDs\n• If continuous EEG unavailable, intermittent EEGs (30-60 min) are helpful but may miss up to 10% of subclinical seizures',
        },
        {
            heading: 'Hemodynamic Support',
            body: '• Anesthetic agents cause significant hypotension — arterial line for continuous BP monitoring\n• Central venous access for vasopressor infusions\n• Pentobarbital almost always requires vasopressors\n• Propofol and midazolam may require vasopressors at higher doses\n• Goal: MAP >65 mmHg (or higher if concern for elevated ICP)',
        },
        {
            heading: 'Supportive ICU Care',
            body: '• Nutrition: enteral feeding when feasible (propofol contributes 1.1 kcal/mL toward caloric intake)\n• DVT prophylaxis (SCD + pharmacologic when safe)\n• Stress ulcer prophylaxis\n• Head of bed elevation 30°\n• Temperature management — fever worsens neuronal injury; target normothermia\n• Daily labs: CBC, CMP, CK, lactate, triglycerides (if propofol), drug levels',
        },
        {
            heading: 'Weaning Protocol',
            body: '• After 24-48h of seizure suppression on EEG:\n• Reduce infusion rate by **25% every 4-6 hours**\n• Maintain continuous EEG monitoring throughout wean\n• If seizures recur → restart at prior effective dose, extend suppression 24h, retry wean\n• **Super-refractory SE (SRSE):** SE that persists/recurs despite 24h of anesthetic therapy\n• SRSE options: switch anesthetic agent, add lacosamide, immunotherapy (if autoimmune suspected), therapeutic hypothermia (32-35°C), ketogenic diet',
        },
    ],
    citations: [
        { num: 1, text: 'Claassen J, et al. Treatment of Refractory SE with Pentobarbital, Propofol, or Midazolam. Epilepsia. 2002;43(2):146-153.' },
        { num: 2, text: 'Brophy GM, et al. Guidelines for Status Epilepticus. Neurocrit Care. 2012;17(1):3-23.' },
    ],
};
const SE_NCSE_CRITERIA = {
    id: 'se-ncse-criteria',
    title: 'NCSE Diagnostic Criteria',
    subtitle: 'Salzburg Criteria & BZD Trial',
    sections: [
        {
            body: 'Nonconvulsive status epilepticus (NCSE) is underrecognized due to lack of overt motor signs. Diagnosis requires EEG, but clinical suspicion and a benzodiazepine trial can guide management while awaiting formal EEG.',
        },
        {
            heading: 'When to Suspect NCSE',
            body: '• Unexplained altered mental status / coma\n• Failure to return to baseline after convulsive seizure treatment\n• Subtle motor signs: nystagmus, gaze deviation, eyelid fluttering, lip smacking, subtle facial twitching, myoclonus\n• Fluctuating level of consciousness\n• Unexplained aphasia or cognitive decline\n• ICU patients on neurotoxic medications (cephalosporins, methotrexate, baclofen, lithium, opioids)\n• History of epilepsy, prior GTC, prior head injury or stroke',
        },
        {
            heading: 'Salzburg Consensus Criteria (2015)',
            body: 'EEG criteria for diagnosing NCSE: [1]\n\n**Primary criteria (any one sufficient):**\n• Epileptiform discharges (EDs) >2.5 Hz\n• EDs ≤2.5 Hz OR rhythmic delta/theta activity with ONE of:\n  — EEG AND clinical improvement after IV BZD\n  — Subtle clinical ictal phenomena during EEG pattern\n  — Typical spatiotemporal evolution (frequency, morphology, or location change)\n\n**Absent primary criteria:** The recording does NOT show NCSE',
        },
        {
            heading: 'Benzodiazepine Trial (Diagnostic + Therapeutic)',
            body: '**Protocol:**\n• Administer lorazepam 1-2 mg IV while monitoring EEG (if available) and clinical status\n• **Positive trial:** Clinical improvement (increased responsiveness, improved cognition) AND/OR EEG improvement (reduction/cessation of epileptiform activity)\n• A positive trial confirms NCSE and initiates treatment\n• **Negative trial:** No clinical or EEG change — does not definitively rule out NCSE but makes it less likely\n• Even without EEG, clinical improvement after BZD trial supports NCSE diagnosis',
        },
        {
            heading: 'Treatment Approach',
            body: '• Same escalating algorithm as convulsive SE (BZD → 2nd-line ASM → anesthetic infusions)\n• **Urgency of aggressive treatment is debated** — NCSE generally has lower mortality than convulsive SE\n• Weigh risks of anesthetic agents and intubation against ongoing subclinical seizure activity\n• Treat underlying etiology aggressively (infection, metabolic, structural)\n• Continuous EEG monitoring throughout treatment to guide escalation/de-escalation\n• Maintain a high index of suspicion — NCSE accounts for up to 48% of post-SE altered consciousness (ESETT) [2]',
        },
    ],
    citations: [
        { num: 1, text: 'Leitinger M, et al. Salzburg Consensus Criteria for Non-Convulsive Status Epilepticus. Epilepsia. 2015;56(10):1515-1523.' },
        { num: 2, text: 'Kapur J, et al. ESETT: Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus. N Engl J Med. 2019;381(22):2103-2113.' },
    ],
};
// -------------------------------------------------------------------
// Acute Diarrhea
// -------------------------------------------------------------------
const DIARRHEA_SUMMARY = {
    id: 'diarrhea-summary',
    title: 'Acute Diarrhea Steps Summary',
    subtitle: 'Quick-reference checklist for ED evaluation of acute diarrhea',
    sections: [
        {
            heading: 'Initial Assessment',
            body: '• [Assess hemodynamic stability — ABCs if unstable](#/node/diarrhea-start)\n• [Resuscitate: 2 large-bore IVs, NS/LR 20 mL/kg, cardiac monitor](#/node/diarrhea-resuscitate)\n• [Targeted history: stool character, duration, travel, meds, contacts](#/node/diarrhea-history)',
        },
        {
            heading: 'Red Flag Evaluation',
            body: '• [Bloody diarrhea — stool culture, avoid antimotility, avoid abx if STEC](#/node/diarrhea-bloody)\n• [Febrile (>38.5°C) — fecal leukocytes/lactoferrin, stool culture](#/node/diarrhea-febrile)\n• [Severe dehydration — IV rehydration, monitor urine output](#/node/diarrhea-dehydration)\n• [Immunocompromised — broader workup, O&P, lower admission threshold](#/node/diarrhea-immunocompromised)\n• [Surgical concern — appendicitis, ischemic bowel, CT abdomen](#/node/diarrhea-surgical-ddx)',
        },
        {
            heading: 'Diagnostics & Treatment',
            body: '• [Selective lab testing — fecal markers, stool culture, C. diff toxin](#/node/diarrhea-labs)\n• [C. difficile — stop offending abx, oral vancomycin first-line](#/node/diarrhea-cdiff)\n• [Traveler\'s diarrhea — fluoroquinolone or azithromycin ± loperamide](#/node/diarrhea-travelers)\n• [Mild/self-limited — ORS, loperamide, ondansetron PRN](#/node/diarrhea-mild)\n• [Empiric antibiotics — ciprofloxacin (adults), TMP-SMX (children)](#/node/diarrhea-empiric-abx)',
        },
        {
            heading: 'Special Populations & Disposition',
            body: '• [Pregnant — loperamide safest, avoid fluoroquinolones](#/node/diarrhea-pregnant)\n• [Pediatric — ORS, ondansetron, no antimotility, watch for HUS](#/node/diarrhea-pediatric)\n• [Elderly — higher risk etiologies, drug interactions, lower admit threshold](#/node/diarrhea-elderly)\n• [Disposition — discharge criteria, admit criteria, follow-up](#/node/diarrhea-disposition)',
        },
    ],
    citations: [
        { num: 1, text: 'Burg MD, Hovanessian HC. Diarrhea: Identifying Serious Illness and Providing Relief. Emergency Medicine Practice. 2004;6(7):1-24.' },
    ],
};
const DIARRHEA_DISCHARGE = {
    id: 'diarrhea-discharge',
    title: 'Diarrhea Discharge Instructions',
    shareable: true,
    subtitle: 'Patient information for managing diarrhea at home',
    sections: [
        {
            heading: 'Return to the ED Immediately If',
            body: '• You are very thirsty, weak, dizzy, or feel faint\n• You have a fever over 101.5°F (38.6°C)\n• You have blood, pus, or mucus in your stool\n• You have black or wine-colored stool\n• You have severe pain in your stomach or abdomen\n• You are vomiting and cannot eat or drink for more than 24 hours\n• Your diarrhea lasts more than 7 days\n• You are not getting better or you are getting worse\n• Your skin is dry, loose, or you feel confused',
        },
        {
            heading: 'How to Stay Hydrated (Adults)',
            body: '**First 1-2 days:**\n• Drink lots of fluids — caffeine-free sodas, oral rehydration solutions (available at pharmacy), or flavored mineral water\n• Nibble on salted crackers or pretzels (your body needs the salt)\n• Drink orange juice or eat bananas for potassium\n• You are drinking enough if you are not thirsty and your urine is pale yellow\n\n**After the first 1-2 days:**\n• Try plain potatoes, noodles, rice, bread, and other bland foods\n• Return to your regular diet as your diarrhea improves\n\n**Avoid:**\n• Milk and dairy products for 2-3 days\n• Caffeine (tea, cola, coffee)\n• Alcohol\n• Fruit juices like prune, apple, or grape juice (these can worsen diarrhea)',
        },
        {
            heading: 'How to Stay Hydrated (Children)',
            body: '• Use an oral rehydration solution (such as Pedialyte) from the pharmacy or supermarket\n• Let your child eat a regular diet as soon as possible\n• If your child is vomiting, try very small, frequent sips of liquid until the vomiting stops\n\n**Do NOT:**\n• Do not use plain water or sports drinks to rehydrate your child — use oral rehydration solution instead\n• Do not withhold dairy products from your child\n• Do not give fruit juices (prune, apple, grape) — these can worsen diarrhea',
        },
        {
            heading: 'Medications',
            body: '• Take all medications exactly as your doctor prescribed\n• Anti-diarrheal medicine (like Imodium) can help adults — take as directed\n• Do NOT use anti-diarrheal medicine if you have a high fever, bloody diarrhea, or if your doctor told you not to\n• Do NOT give anti-diarrheal medicine to children unless prescribed by a doctor',
        },
        {
            heading: 'Preventing Spread',
            body: '• Wash your hands thoroughly with soap and water after using the bathroom and before eating\n• Do not prepare food for others while you are sick\n• Clean and disinfect bathroom surfaces frequently\n• Do not return to work or school until you have been diarrhea-free for at least 24 hours\n• Keep sick children home from day care',
        },
        {
            heading: 'Follow-Up',
            body: '• See your own doctor in 2-3 days if you are not improving\n• See your doctor sooner if you are getting worse\n• If you were prescribed antibiotics, finish the entire course even if you feel better',
        },
    ],
    citations: [
        { num: 1, text: 'Burg MD, Hovanessian HC. Diarrhea: Identifying Serious Illness and Providing Relief. Emergency Medicine Practice. 2004;6(7):1-24.' },
    ],
};
const DIARRHEA_DDX_PITFALLS = {
    id: 'diarrhea-ddx-pitfalls',
    title: 'Differential Diagnosis Pitfalls',
    subtitle: 'Common diagnostic traps in diarrheal illness',
    sections: [
        {
            heading: 'Appendicitis Mimicking Gastroenteritis',
            body: '• Vomiting typically **follows** abdominal pain in appendicitis (precedes pain in gastroenteritis)\n• Appendicitis: 1-2 loose stools, NOT voluminous\n• 15% of appendices are in atypical locations\n• **27% of children** with appendicitis are initially misdiagnosed — diarrhea is a common confounding symptom [1]\n• 57% of children under 3 with appendicitis are initially misdiagnosed [1]\n• **Serial abdominal exams** are key — gastroenteritis improves with fluids, appendicitis does not\n• Gastroenteritis can cause higher fevers (>103°F) than appendicitis',
        },
        {
            heading: 'Ischemic Bowel Disease',
            body: '• Consider in adults **>50 years** or with peripheral vascular disease\n• Severe pain **out of proportion** to physical findings — classic presentation\n• Voluminous diarrhea (small bowel ischemia) or bloody diarrhea (ischemic colitis)\n• Occult blood in up to 75% of patients\n• Risk factors: arrhythmias, CHF, hypovolemia, sepsis, vasoconstrictors (digitalis, pseudoephedrine, cocaine, amphetamines) [2]\n• May progress to **infarction** unless detected early',
        },
        {
            heading: 'Medication-Induced Diarrhea',
            body: '• **Antibiotics** — especially C. difficile risk within past 3 months\n• **Magnesium/calcium antacids**\n• **Colchicine**\n• **Alpha-glucosidase inhibitors** (acarbose, miglitol) — abdominal pain, bloating, diarrhea\n• **Sorbitol/mannitol** (artificial sweeteners) — osmotic diarrhea\n• **Laxative abuse** — consider in patients with eating disorders or weight loss attempts\n• **Enteral tube feedings**\n• Herbal preparations may also cause diarrhea',
        },
        {
            heading: 'Melena Misidentified as Diarrhea',
            body: '• Melanotic stools are usually liquid — patients may describe as "diarrhea"\n• Always ask specifically about **black or tarry stools**\n• Rectal exam can determine stool characteristics\n• GI bleed requires completely different management — see GI Bleeding consult',
        },
        {
            heading: 'Other Diagnostic Traps',
            body: '• **Fecal impaction** — chronic constipation followed by watery diarrhea (overflow)\n• **IBD first presentation** — chronic/recurrent bloody diarrhea, family history, young patient\n• **Hyperthyroidism** — diarrhea as part of thyrotoxicosis\n• **Intussusception** (pediatric) — currant jelly stool, episodic crying\n• **DKA, pneumonia** — extra-abdominal conditions that can present with abdominal complaints',
        },
    ],
    citations: [
        { num: 1, text: 'Rothrock SG, et al. Clinical Features of Misdiagnosed Appendicitis in Children. Ann Emerg Med. 1991;20(1):45-50.' },
        { num: 2, text: 'Burns BJ, Brandt LJ. Intestinal Ischemia. Gastroenterol Clin North Am. 2003;32(4):1127-1143.' },
    ],
};
const DIARRHEA_ABX_CRITERIA = {
    id: 'diarrhea-abx-criteria',
    title: 'Empiric Antibiotic Criteria',
    subtitle: 'When to start antibiotics for acute diarrhea',
    sections: [
        {
            heading: 'When to Give Empiric Antibiotics',
            body: '**1. Fever >38.5°C (101.3°F)** PLUS one of:\n• Guaiac-positive stools\n• Fecal leukocytes or fecal lactoferrin positive\n\n**2. Acute dysentery** (bloody diarrhea with fever and cramping)\n\n**3. Moderate-to-severe traveler\'s diarrhea**\n\n**4. Diarrhea lasting >48 hours** (higher probability of non-viral cause)\n\n**5. Nosocomial diarrhea** with suspected C. difficile — stop offending antibiotic, start metronidazole or vancomycin',
        },
        {
            heading: 'When NOT to Give Antibiotics',
            body: '• **Suspected STEC (E. coli O157:H7)** — antibiotics increase HUS risk. Suspect if: bloody diarrhea + afebrile + exposure to undercooked beef or unpasteurized products\n• **Vomiting as prominent symptom** — viral etiology more likely, antibiotics will have low yield\n• **Mild, self-limited diarrhea** in healthy patient\n• **Salmonellosis** (non-typhoidal) — antibiotics can prolong carrier state and increase relapse rate',
        },
        {
            heading: 'Drug Selection',
            body: '',
            drugTable: [
                { drug: 'Ciprofloxacin 500 mg PO BID × 3-5d', regimen: 'Adults — first-line for most community-acquired and traveler\'s diarrhea' },
                { drug: 'Azithromycin 1g PO ×1 or 500 mg daily ×3d', regimen: 'SE Asia travel (fluoroquinolone-resistant Campylobacter >80%)' },
                { drug: 'TMP-SMX (Bactrim DS) BID × 3-5d', regimen: 'Children — first-line empiric therapy' },
                { drug: 'Metronidazole 250 mg PO TID × 7-10d', regimen: 'Persistent diarrhea 2-4 weeks (covers Giardia)' },
                { drug: 'Vancomycin 125 mg PO QID × 10-14d', regimen: 'C. difficile — first-line (preferred over metronidazole)' },
                { drug: 'Metronidazole 500 mg PO TID × 10-14d', regimen: 'C. difficile — alternative for non-severe cases' },
            ],
        },
        {
            heading: 'Patient Expectations',
            body: 'Antibiotics shorten illness duration by **1-2 days** when effective. This benefit must be weighed against drug side effects, expense, and antibiotic resistance concerns.\n\nStudies show that patient satisfaction with diarrheal illness care correlates **poorly** with receiving antibiotics — physicians are not adept at identifying which patients expect them [1].',
        },
    ],
    citations: [
        { num: 1, text: 'Karras DJ, et al. Antibiotic Use for ED Patients with Acute Diarrhea: Prescribing Practices, Patient Expectations, and Patient Satisfaction. Ann Emerg Med. 2003;42(6):835-842.' },
        { num: 2, text: 'Shane AL, et al. 2017 IDSA Clinical Practice Guidelines for the Diagnosis and Management of Infectious Diarrhea. Clin Infect Dis. 2017;65(12):e45-e80.' },
    ],
};
const DIARRHEA_ANTIMOTILITY_CI = {
    id: 'diarrhea-antimotility-ci',
    title: 'Antimotility Agent Contraindications',
    subtitle: 'When to avoid loperamide, diphenoxylate, and similar agents',
    sections: [
        {
            heading: 'Avoid Antimotility Agents When',
            body: '• **High fever** (>38.5°C / 101.3°F)\n• **Bloody diarrhea** or suspected dysentery\n• **Suspected inflammatory diarrhea** (positive fecal leukocytes/lactoferrin)\n• **Suspected Shiga toxin-producing E. coli (STEC/EHEC)** — can worsen HUS\n• **Sepsis** or severe systemic illness\n• **Immunocompromised patients**\n• **Pediatric patients** — not recommended for children with acute gastroenteritis',
        },
        {
            heading: 'Why Avoid?',
            body: '• **Delayed clearance** of enteric pathogens\n• **Prolonged fever** in invasive bacterial diarrhea\n• **Toxic megacolon** risk — especially with C. difficile and inflammatory bowel disease\n• **Increased HUS risk** with STEC infection\n\nSome authorities argue antimotility agents may be used in **non-dysenteric** forms of diarrhea caused by enteroinvasive pathogens **as long as antibiotics are also prescribed** — but this remains controversial.',
        },
        {
            heading: 'Safe Use',
            body: '• **Afebrile patients** with non-bloody, non-inflammatory diarrhea\n• **Chronic diarrhea** associated with inflammatory bowel disease (with appropriate IBD treatment)\n• **Traveler\'s diarrhea** — loperamide as adjunct WITH antibiotics reduces duration by 1 additional day\n• **Preferred agent:** Loperamide (Imodium) — peripheral opioid, no CNS effects, not habit-forming\n• **Alternative:** Bismuth subsalicylate (Pepto-Bismol) — also has antimicrobial and antiemetic properties',
        },
    ],
    citations: [
        { num: 1, text: 'Thielman NM, Guerrant RL. Acute Infectious Diarrhea. N Engl J Med. 2004;350(1):38-47.' },
        { num: 2, text: 'Gore JI, Surawicz C. Severe Acute Diarrhea. Gastroenterol Clin North Am. 2003;32(4):1249-1267.' },
    ],
};
const DIARRHEA_DEHYDRATION_ASSESSMENT = {
    id: 'diarrhea-dehydration-assessment',
    title: 'Dehydration Assessment Guide',
    subtitle: 'Clinical assessment of volume status in diarrheal illness',
    sections: [
        {
            heading: 'Adult Assessment',
            body: '**Most reliable findings:**\n• **Dry axilla** — supports hypovolemia diagnosis\n• **Moist mucous membranes + tongue without furrows** — argues against hypovolemia\n\n**Unreliable in adults:**\n• Capillary refill time — no proven diagnostic value\n• Skin turgor — no proven diagnostic value\n\n**Other indicators:**\n• Orthostatic vital signs (SBP drop >20 or HR rise >20)\n• Urine output and color\n• BUN/Creatinine ratio >20:1 suggests dehydration\n• Thirst, dizziness, syncope',
        },
        {
            heading: 'Pediatric Assessment',
            body: '**Gold standard:** Acute body weight change (compare to recent known weight)\n\n**Next best measures:**\n• Mucous membrane hydration\n• Capillary refill time (>2 seconds)\n• Absence of tears when crying\n• Altered mental status (lethargy, irritability)\n\n**Also assess:**\n• Sunken anterior fontanelle (infants)\n• Sunken eyes\n• Skin turgor (tenting)\n• Urine output (fewer wet diapers)\n\n**Severity:**\n• **Mild (3-5%):** slightly dry mucous membranes, mildly decreased urine\n• **Moderate (6-9%):** dry mucous membranes, decreased tears, tachycardia, oliguria\n• **Severe (≥10%):** absent tears, sunken eyes, very delayed capillary refill, altered mental status, anuria',
        },
        {
            heading: 'Oral Rehydration Solutions',
            body: '**WHO ORS composition:**\n• Sodium 75 mmol/L\n• Potassium 20 mmol/L\n• Glucose 75 mmol/L\n• Total osmolarity 245 mOsm/L\n\n**Commercial options:** Pedialyte, Lytren, Rehydrolyte\n\n**Sports drinks** (Gatorade, etc.) have inadequate sodium for diarrheal losses. Can supplement with salted crackers or pretzels.\n\n**Plain water** is NOT appropriate for rehydration in children — risk of hyponatremia.\n\n**IV rehydration:** NS or LR 20 mL/kg bolus, repeat as needed. Consider in moderate-severe dehydration or when vomiting prevents oral intake.',
        },
    ],
    citations: [
        { num: 1, text: 'McGee S, Abernethy WB, Simel DL. Is This Patient Hypovolemic? JAMA. 1999;281(11):1022-1029.' },
        { num: 2, text: 'Cincinnati Children\'s Hospital Medical Center. Evidence Based Clinical Practice Guideline for Children with Acute Gastroenteritis (AGE). 2001.' },
    ],
};
// -------------------------------------------------------------------
// First Trimester Emergencies
// -------------------------------------------------------------------
const FT_SUMMARY = {
    id: 'ft-summary',
    title: 'First Trimester Emergency Steps',
    subtitle: 'Quick Reference — Key Decision Points',
    sections: [
        {
            heading: 'Initial Assessment',
            body: '• [Pregnancy test in ALL reproductive-age women with abdominal pain/bleeding](#/node/ft-start)\n• [Hemodynamic stability assessment](#/node/ft-stability)\n• [Unstable → assume ruptured ectopic until proven otherwise](#/node/ft-unstable-ectopic)',
        },
        {
            heading: 'Ectopic Pregnancy',
            body: '• [Bedside US + quantitative beta-hCG](#/node/ft-us-eval)\n• [IUP confirmed → rules out ectopic (except ART patients)](#/node/ft-iup-confirmed)\n• [Pregnancy of unknown location → 48h beta-hCG recheck](#/node/ft-pul)\n• [Ectopic confirmed → methotrexate vs surgery](#/node/ft-ectopic-confirmed)',
        },
        {
            heading: 'Miscarriage',
            body: '• [Classify type: threatened, complete, missed, inevitable, incomplete, septic](#/node/ft-miscarriage-type)\n• [Nonviable → expectant vs medical (misoprostol) vs surgical (D&C)](#/node/ft-nonviable-mgmt)\n• [Rh status → consider RhoGAM if Rh-negative](#/node/ft-rh-rhogam)',
        },
        {
            heading: 'Nausea & Vomiting',
            body: '• [Severity assessment — tolerating PO?](#/node/ft-nvp-assess)\n• [Mild: pyridoxine ± doxylamine (ACOG first-line)](#/node/ft-nvp-oral)\n• [Moderate: add dimenhydrinate, diphenhydramine, or promethazine](#/node/ft-nvp-oral-step2)\n• [Severe/IV: metoclopramide or ondansetron + D5NS + thiamine](#/node/ft-nvp-iv)\n• [Hyperemesis gravidarum → OB consult, admit](#/node/ft-hg-admit)',
        },
        {
            heading: 'Nonobstetric Emergencies',
            body: '• [UTI / bacteriuria — MUST treat in pregnancy](#/node/ft-uti-eval)\n• [Pyelonephritis — admit ALL for IV ceftriaxone](#/node/ft-pyelo)\n• [Appendicitis — surgical, imaging: US → MRI → CT](#/node/ft-appendicitis)',
        },
        {
            heading: 'Disposition',
            body: '• [PUL → discharge with 48h beta-hCG recheck](#/node/ft-dispo-pul)\n• [Miscarriage → discharge with management plan + grief resources](#/node/ft-dispo-miscarriage)\n• [NVP → discharge with prescriptions if tolerating PO](#/node/ft-dispo-nvp)\n• [Admit: ruptured ectopic, pyelonephritis, appendicitis, hyperemesis, septic abortion](#/node/ft-dispo-general)',
        },
    ],
    citations: [
        { num: 1, text: 'Pedigo R. First Trimester Pregnancy Emergencies: Recognition and Management. Emergency Medicine Practice. 2019;21(1):1-28.' },
    ],
};
const FT_ECTOPIC_RISK = {
    id: 'ft-ectopic-risk',
    title: 'Ectopic Pregnancy Sites & Risk Factors',
    subtitle: 'Location Distribution & Clinical Risk Assessment',
    sections: [
        {
            heading: 'Implantation Sites',
            body: '**98% of ectopic pregnancies are tubal** [1]\n\n• **Distal third (ampullary):** most common (~40%)\n• **Middle third (isthmic):** ~37%\n• **Proximal third:** ~12%\n• **Fimbrial:** ~5%\n• **Fimbrial-ovarian:** ~1.5%\n• **Interstitial (cornual):** ~1.2% — high rupture morbidity due to increased vascularity\n• **Abdominal:** ~1.4%\n• **Cervical:** ~0.15%\n• **Ovarian:** ~0.15%',
        },
        {
            heading: 'Major Risk Factors',
            body: '• **Prior ectopic pregnancy** — strongest predictor of recurrence\n• **History of salpingitis / PID** — tubal damage\n• **History of sexually transmitted infections** — chlamydia, gonorrhea\n• **Prior tubal surgery** — sterilization, reversal, salpingostomy\n• **Smoking** — dose-response relationship (>1 pack/day: OR 4) — ciliary dysmotility impairs ovum transport [2]\n• **IUD in situ** — if pregnancy occurs despite IUD, >50% are ectopic [3]\n• **Assisted reproductive technology (ART)** — also increases heterotopic risk to 1 in 100\n• **DES exposure in utero**\n• **Endometriosis**',
        },
        {
            heading: 'Important Caveats',
            body: '**Nearly half of patients with ectopic pregnancy will have NO identifiable risk factors.** [1]\n\nPresence or absence of risk factors should NOT alter the standard diagnostic approach.\n\nNo historical or physical exam features can reliably rule in or rule out ectopic pregnancy. [4]',
        },
        {
            heading: 'Heterotopic Pregnancy',
            body: 'Coexistence of IUP + ectopic pregnancy:\n• **General population:** 1 in 4,000 to 1 in 30,000\n• **ART patients:** ~1 in 100 [5]\n\nConfirming an IUP does NOT exclude ectopic in ART patients. Maintain clinical suspicion if IUP + lateral pain/adnexal mass.',
        },
    ],
    citations: [
        { num: 1, text: 'Pedigo R. First Trimester Pregnancy Emergencies. Emergency Medicine Practice. 2019;21(1):1-28.' },
        { num: 2, text: 'Handler A, Davis F, Ferre C, et al. The relationship of smoking and ectopic pregnancy. Am J Public Health. 1989;79(9):1239-1242.' },
        { num: 3, text: 'Backman T, Rauramo I, Huhtala S, et al. Pregnancy during the use of levonorgestrel intrauterine system. Am J Obstet Gynecol. 2004;190(1):50-54.' },
        { num: 4, text: 'Dart RG, Kaplan B, Varaklis K. Predictive value of history and physical examination in patients with suspected ectopic pregnancy. Ann Emerg Med. 1999;33(3):283-290.' },
        { num: 5, text: 'Tal J, Haddad S, Gordon N, et al. Heterotopic pregnancy after ovulation induction and assisted reproductive technologies. Fertil Steril. 1996;66(1):1-12.' },
    ],
};
const FT_MISCARRIAGE_TYPES = {
    id: 'ft-miscarriage-types',
    title: 'Miscarriage Classification',
    subtitle: 'Types, Physical Exam & Ultrasound Findings',
    sections: [
        {
            heading: 'Threatened Miscarriage',
            body: '**Cervical os:** Closed\n**Ultrasound:** Viable IUP (fetal cardiac activity present)\n**Presentation:** Vaginal bleeding with viable pregnancy\n**Prognosis:** If FCA present, only 3.4% progress to miscarriage. Heavy bleeding → 11-18% miscarriage rate. [1]',
        },
        {
            heading: 'Complete Miscarriage',
            body: '**Cervical os:** Closed\n**Ultrasound:** No IUP (previously confirmed)\n**Presentation:** Passage of all products of conception\n**Management:** Confirm with US. Serial beta-hCG to zero. OB follow-up.',
        },
        {
            heading: 'Missed Miscarriage',
            body: '**Cervical os:** Closed\n**Ultrasound:** CRL ≥7 mm without cardiac motion; OR gestational sac ≥25 mm without embryo [2]\n**Presentation:** Nonviable uterine gestation — often discovered incidentally\n**Management:** Expectant, medical (misoprostol), or surgical (D&C)',
        },
        {
            heading: 'Inevitable Miscarriage',
            body: '**Cervical os:** Open\n**Ultrasound:** IUP present, no passage of products yet\n**Presentation:** Open os indicates process will proceed\n**Management:** Expectant, medical, or surgical — consult OB',
        },
        {
            heading: 'Incomplete Miscarriage',
            body: '**Cervical os:** Open\n**Ultrasound:** Partially expelled products of conception\n**Presentation:** Some tissue has passed, but retained products remain\n**Management:** If tissue visible in cervix — remove with ring forceps at bedside. Medical or surgical management for retained products.',
        },
        {
            heading: 'Septic Abortion',
            body: '**Cervical os:** Any (open or closed)\n**Ultrasound:** Any finding possible\n**Presentation:** Intrauterine infection — **fever, uterine tenderness, purulent discharge**\n**Management:** EMERGENT — IV broad-spectrum antibiotics + surgical evacuation. May progress rapidly to sepsis/septic shock. [3]',
        },
    ],
    citations: [
        { num: 1, text: 'Hasan R, Baird DD, Herring AH, et al. Association between first-trimester vaginal bleeding and miscarriage. Obstet Gynecol. 2009;114(4):860-867.' },
        { num: 2, text: 'ACOG Practice Bulletin No. 150. Early Pregnancy Loss. Obstet Gynecol. 2015;125(5):1258-1267.' },
        { num: 3, text: 'Pedigo R. First Trimester Pregnancy Emergencies. Emergency Medicine Practice. 2019;21(1):1-28.' },
    ],
};
const FT_NVP_PATHWAY = {
    id: 'ft-nvp-pathway',
    title: 'NVP Stepwise Treatment Pathway',
    subtitle: 'ACOG 2018 Recommended Approach',
    sections: [
        {
            heading: 'Step 1 — First-Line Oral (Level A)',
            body: '**Pyridoxine (B6)** 10-25 mg PO TID\n± **Doxylamine** 12.5 mg PO TID\n\nAdjuncts:\n• **Ginger** 250 mg PO QID\n• **P6 acupressure** wristband\n• Convert prenatal vitamin to **folic acid only**\n\n💊 Generic pyridoxine + OTC doxylamine (Unisom SleepTabs) is significantly cheaper than Diclegis/Bonjesta.',
        },
        {
            heading: 'Step 2 — Second-Line Oral',
            body: 'Add one of:\n• **Dimenhydrinate** 50 mg PO QID (max 200 mg/day if taking doxylamine)\n• **Diphenhydramine** 25-50 mg PO QID\n• **Prochlorperazine** 25 mg PR q12h\n• **Promethazine** 12.5 mg PO or PR q6h',
        },
        {
            heading: 'Step 3 — IV Therapy',
            body: '**Rehydration:** D5NS preferred (slightly better than NS for nausea)\n**Thiamine** 100 mg IV before dextrose if protracted vomiting\n\nIV antiemetics — choose one:\n• **Metoclopramide** 10 mg IV q8h — preferred (no fetal malformation risk)\n• **Ondansetron** 4-8 mg IV over 15 min q12h — effective but exhaust other options first\n• **Dimenhydrinate** 50 mg IV in 50 mL NS over 20 min q6h\n• **Promethazine** 12.5 mg IV q6h (dilute, slow push — tissue necrosis risk)',
        },
        {
            heading: 'Step 4 — Admit (Hyperemesis Gravidarum)',
            body: 'If no improvement after IV therapy:\n• **OB consultation**\n• Admit for continued IV rehydration\n• Electrolyte monitoring\n• Daily thiamine\n• Parenteral antiemetic regimen\n• Nutritional assessment\n\n**Definition:** ≥5% loss of prepregnancy body weight + persistent nausea/vomiting + ketonuria',
        },
        {
            heading: 'Key Evidence Notes',
            body: '• No high-quality evidence supports one specific drug over another for NVP [1]\n• Pyridoxine + doxylamine is superior to pyridoxine alone [2]\n• Ondansetron: possible small risk of fetal cardiac abnormalities — use after exhausting alternatives [3]\n• Metoclopramide: no association with fetal malformations — reasonable first-line IV agent [2]\n• NVP is actually protective against pregnancy loss (HR 0.20 for nausea + vomiting) [4]',
        },
    ],
    citations: [
        { num: 1, text: 'Matthews A, Haas DM, O\'Mathuna DP, et al. Interventions for nausea and vomiting in early pregnancy. Cochrane Database Syst Rev. 2015;(9):CD007575.' },
        { num: 2, text: 'ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30.' },
        { num: 3, text: 'Danielsson B, Noor AH, Hoog A, et al. Association of ondansetron use in early pregnancy with congenital malformations. JAMA. 2018;320(23):2429-2437.' },
        { num: 4, text: 'Hinkle SN, Mumford SL, Grantz KL, et al. Association of nausea and vomiting during pregnancy with pregnancy loss. JAMA Intern Med. 2016;176(11):1621-1627.' },
    ],
};
const FT_IMAGING_SAFETY = {
    id: 'ft-imaging-safety',
    title: 'Imaging Safety in Pregnancy',
    subtitle: 'Radiation Doses, Modality Selection & Contrast Considerations',
    sections: [
        {
            heading: 'Key Principles',
            body: '• **Do not withhold indicated imaging** for fear of radiation — missed/delayed diagnosis may cause worse fetal outcomes [1]\n• **Ultrasound and MRI (without gadolinium)** are preferred first-line modalities\n• **Single CT study** does not exceed threshold dose for fetal harm\n• **Document risks/benefits discussion** with patient for studies involving direct fetal radiation',
        },
        {
            heading: 'No Pregnancy Testing Needed (ACR)',
            body: 'These produce negligible fetal exposure: [2]\n• Head or neck imaging (any modality)\n• Extremity radiography or CT (except possibly hip)\n• Chest radiography (first and second trimesters)',
        },
        {
            heading: 'Fetal Radiation Doses',
            body: '**Very low (<0.1 mGy):**\n• C-spine XR: <0.001 mGy\n• Extremity XR: <0.001 mGy\n• Chest XR (2 views): 0.0005-0.01 mGy\n\n**Low to moderate (0.1-10 mGy):**\n• Abdominal XR: 0.1-3.0 mGy\n• Chest CT / CTPA: 0.01-0.66 mGy\n• Head/neck CT: 1.0-10 mGy\n• Bone scan: 4-5 mGy\n\n**Higher (10-50 mGy):**\n• Abdominal CT: 1.3-35 mGy\n• Pelvic CT: 10-50 mGy\n\n**Reference:** Annual background radiation = 1.1-2.5 mGy [3]',
        },
        {
            heading: 'Contrast Media',
            body: '**Iodinated contrast (CT):**\n• Crosses placenta but no known harm in limited data\n• ACOG: use only if "absolutely required" — precautionary, not evidence-based [1]\n\n**Gadolinium (MRI):**\n• **AVOID unless absolutely necessary**\n• Associated with increased stillbirth, neonatal death, and rheumatologic/inflammatory skin conditions [4]\n• MRI for appendicitis should always be ordered WITHOUT contrast\n\n**MRI without gadolinium** is safe — no fetal risk demonstrated through age 4 years in >1.4 million pregnancies [4]',
        },
        {
            heading: 'Appendicitis Imaging Algorithm',
            body: '1. **Ultrasound first** — but visualization rate as low as 7%, sensitivity only 18% in pregnancy [5]\n2. **MRI without contrast** — sensitivity 94%, specificity 97%. Preferred if available. [6]\n3. **CT abdomen/pelvis** — if US indeterminate and MRI unavailable. High sensitivity/specificity. Single study does not exceed threshold. [1]\n\nBoth US and MRI have high specificity (97-99%) — a positive result can be relied upon.',
        },
    ],
    citations: [
        { num: 1, text: 'ACOG Committee Opinion No. 723: Guidelines for Diagnostic Imaging During Pregnancy and Lactation. Obstet Gynecol. 2017;130(4):e210-e216.' },
        { num: 2, text: 'American College of Radiology. ACR-SPR Practice Parameter for Imaging Pregnant or Potentially Pregnant Adolescents and Women with Ionizing Radiation. 2013.' },
        { num: 3, text: 'Tremblay E, Therasse E, Thomassin-Naggara I, Trop I. Quality initiatives: guidelines for use of medical imaging during pregnancy and lactation. RadioGraphics. 2012;32:897-911.' },
        { num: 4, text: 'Ray JG, Vermeulen MJ, Bharatha A, et al. Association between MRI exposure during pregnancy and fetal and childhood outcomes. JAMA. 2016;316(9):952-961.' },
        { num: 5, text: 'Konrad J, Grand D, Lourenco A. MRI: first-line imaging modality for pregnant patients with suspected appendicitis. Abdom Imaging. 2015;40(8):3359-3364.' },
        { num: 6, text: 'Duke E, Kalb B, Arif-Tiwari H, et al. A systematic review and meta-analysis of diagnostic performance of MRI for evaluation of acute appendicitis. AJR Am J Roentgenol. 2016;206(3):508-517.' },
    ],
};
const FT_ABX_SAFETY = {
    id: 'ft-abx-safety',
    title: 'Antibiotic Safety in Pregnancy',
    subtitle: 'First Trimester Considerations for Common Antibiotics',
    sections: [
        {
            heading: 'Generally Safe in All Trimesters',
            body: '• **Amoxicillin** — first-line for UTI in pregnancy\n• **Cephalosporins** (cephalexin, ceftriaxone, cefazolin) — widely used, well-studied\n• **Penicillins** — extensive safety record\n• **Azithromycin** — safe for atypical coverage',
        },
        {
            heading: 'Use with Caution in First Trimester',
            body: '• **Nitrofurantoin** — ACOG 2017: safe in 2nd/3rd trimester but use in 1st trimester only "when no other suitable alternative antibiotics are available" [1]\n• **Sulfonamides (TMP-SMX)** — same ACOG caveat as nitrofurantoin. Theoretical risk of folate antagonism. [1]',
        },
        {
            heading: 'Avoid in Pregnancy',
            body: '• **Fluoroquinolones** (ciprofloxacin, levofloxacin) — cartilage damage in animal studies; avoid if alternatives exist\n• **Tetracyclines** (doxycycline, minocycline) — tooth discoloration and bone growth effects after first trimester\n• **Aminoglycosides** (gentamicin) — ototoxicity risk; use only when benefits clearly outweigh risks (e.g., septic abortion)\n• **Metronidazole** — generally avoided in first trimester (conflicting data, likely safe but alternatives preferred)',
        },
        {
            heading: 'UTI Treatment in Pregnancy',
            body: '**Preferred regimens (7-day course):**\n• Amoxicillin 875 mg PO BID\n• Cephalexin 500 mg PO q6h\n• Nitrofurantoin 100 mg PO BID (if no alternatives — 1st trimester only)\n\n**Key points:**\n• **ALWAYS send urine culture** — negative UA does not exclude bacteriuria [2]\n• **Treat asymptomatic bacteriuria** when found — reduces pyelonephritis risk from 2.4% to 0.6% [3]\n• Shorter courses may be less effective than 7-day regimens [4]\n• Local antibiograms should guide empiric therapy',
        },
        {
            heading: 'Pyelonephritis',
            body: '**Admit ALL pregnant patients** for initial IV antibiotics:\n• Ceftriaxone 1 g IV daily\n• Continue until afebrile 48 hours\n• Transition to oral agent guided by sensitivities\n\nInsufficient evidence for outpatient management in pregnancy. [5]',
        },
    ],
    citations: [
        { num: 1, text: 'ACOG Committee Opinion No. 717: Sulfonamides, Nitrofurantoin, and Risk of Birth Defects. Obstet Gynecol. 2017;130(3):e150-e152.' },
        { num: 2, text: 'Angelescu K, Nussbaumer-Streit B, Sieben W, et al. Benefits and harms of screening for and treatment of asymptomatic bacteriuria in pregnancy. BMC Pregnancy Childbirth. 2016;16(1):336.' },
        { num: 3, text: 'Kazemier BM, et al. Maternal and neonatal consequences of treated and untreated asymptomatic bacteriuria in pregnancy. Lancet Infect Dis. 2015;15(11):1324-1333.' },
        { num: 4, text: 'Guinto VT, De Guia B, Festin MR, et al. Different antibiotic regimens for treating asymptomatic bacteriuria in pregnancy. Cochrane Database Syst Rev. 2010;(9):CD007855.' },
        { num: 5, text: 'Pedigo R. First Trimester Pregnancy Emergencies. Emergency Medicine Practice. 2019;21(1):1-28.' },
    ],
};
const FT_MISCARRIAGE_DISCHARGE = {
    id: 'ft-miscarriage-discharge',
    title: 'Miscarriage Discharge Instructions',
    subtitle: 'Patient Information & Return Precautions',
    sections: [
        {
            heading: 'What Has Happened',
            body: 'You have experienced a miscarriage (also called early pregnancy loss). This is unfortunately common — it occurs in up to 1 in 4 pregnancies. Most miscarriages are caused by genetic abnormalities in the pregnancy and are not caused by anything you did or did not do.',
        },
        {
            heading: 'What to Expect',
            body: '• **Bleeding:** You may have vaginal bleeding and cramping for 1-2 weeks. This is normal.\n• **Pain:** Cramping is expected. Take ibuprofen (Advil/Motrin) 600 mg every 6 hours as needed for pain.\n• **Passing tissue:** You may pass blood clots or tissue. This is part of the natural process.\n• **Bleeding should gradually decrease** over the next 1-2 weeks.',
        },
        {
            heading: 'Activity & Self-Care',
            body: '• **Rest** as needed — there is no strict bed rest requirement\n• **Avoid** placing anything in the vagina (tampons, douching, intercourse) for **2 weeks** or until bleeding stops\n• **Hydrate** well and eat as tolerated\n• You may shower and bathe normally',
        },
        {
            heading: 'Return to the Emergency Department If',
            body: '• **Heavy bleeding** — soaking more than 1 pad per hour for 2 or more hours in a row\n• **Fever** greater than 100.4°F (38°C)\n• **Foul-smelling vaginal discharge**\n• **Severe abdominal pain** not relieved by ibuprofen\n• **Dizziness, lightheadedness, or fainting**\n• **Persistent heavy bleeding** beyond 2 weeks',
        },
        {
            heading: 'Follow-Up',
            body: '• See your OB/GYN within **1-2 weeks**\n• Your doctor may check a blood test (beta-hCG) to confirm the miscarriage is complete\n• Discuss future pregnancy planning with your OB/GYN when you are ready\n• Most women who have a miscarriage go on to have healthy pregnancies in the future',
        },
        {
            heading: 'Emotional Support',
            body: '• A miscarriage is a loss, and it is normal to grieve\n• Everyone experiences grief differently — there is no "right way" to feel\n• Talk to your partner, family, or a trusted friend\n• Your doctor can refer you to a grief counselor or pregnancy loss support group\n• **National support:** Share Pregnancy & Infant Loss Support — www.nationalshare.org',
        },
    ],
    citations: [
        { num: 1, text: 'Catlin A. Interdisciplinary guidelines for care of women presenting to the emergency department with pregnancy loss. MCN Am J Matern Child Nurs. 2018;43(1):13-18.' },
    ],
    shareable: true,
};
// -------------------------------------------------------------------
// HIV ED Management
// -------------------------------------------------------------------
const HIV_STEPS_SUMMARY = {
    id: 'hiv-steps-summary',
    title: 'HIV ED Management Steps Summary',
    subtitle: 'Quick-Reference Checklist',
    sections: [
        {
            body: 'Quick-reference checklist for managing HIV-related presentations in the ED. Tap any step to jump directly to that decision point in the consult.',
        },
        {
            heading: 'Initial Assessment',
            body: '• [Determine HIV status — CD4 count, viral load, current ART regimen](#/node/hiv-status-assess)\n• Route to appropriate pathway based on immune status and presentation',
        },
        {
            heading: 'Acute Seroconversion',
            body: '• [Recognize acute retroviral syndrome: fever + rash + lymphadenopathy + NO respiratory symptoms](#/node/hiv-seroconversion)\n• 4th generation Ag/Ab test (2-week window period)\n• Send HIV RNA viral load if 4th gen negative but clinical suspicion remains high\n• Never rely on antibody-only test in the acute setting',
        },
        {
            heading: 'Well-Controlled HIV',
            body: '• [Treat like immunocompetent patient for most acute complaints](#/node/hiv-well-controlled)\n• Watch for chronic inflammatory complications (CAD, COPD, osteoporosis)\n• Screen for ARV medication side effects and drug interactions\n• Verify ART adherence and recent viral load',
        },
        {
            heading: 'Immunocompromised (CD4 <200)',
            body: '• [High risk for opportunistic infections — low threshold for imaging and admission](#/node/hiv-immunocompromised)\n• PJP (CD4 <200): dyspnea, dry cough, bilateral GGOs, elevated LDH\n• Toxoplasmosis (CD4 <100): ring-enhancing lesions, focal neuro deficits\n• Cryptococcal meningitis (CD4 <100): headache, altered mental status, elevated opening pressure\n• CMV (CD4 <50): retinitis, colitis, esophagitis\n• TB: any CD4 — atypical presentations with low CD4',
        },
        {
            heading: 'Medication Effects',
            body: '• [Know ARV drug classes and their signature toxicities](#/node/hiv-med-overview)\n• NRTI: TDF → Fanconi syndrome, renal tubular acidosis, bone loss\n• NNRTI: efavirenz → neuropsychiatric effects, vivid dreams, SJS\n• PI: atazanavir → jaundice, radiolucent kidney stones, CYP3A4 drug interactions\n• INSTI: generally well-tolerated, fewest interactions',
        },
        {
            heading: 'Prevention',
            body: '• [PEP: post-exposure prophylaxis within 72 hours of exposure](#/tree/pep)\n• [PrEP: refer high-risk patients for pre-exposure prophylaxis](#/node/hiv-prep-referral)\n• Document exposure time, source HIV status, and risk level',
        },
    ],
    citations: [
        { num: 1, text: 'Saag MS, Gandhi RT, Hoy JF, et al. Antiretroviral Drugs for Treatment and Prevention of HIV Infection in Adults: 2020 Recommendations of the International Antiviral Society\u2013USA Panel. JAMA. 2020;324(16):1651-1669.' },
        { num: 2, text: 'Panel on Antiretroviral Guidelines for Adults and Adolescents. Guidelines for the Use of Antiretroviral Agents in Adults and Adolescents with HIV. HHS. 2024.' },
    ],
};
const HIV_SEROCONVERSION_FEATURES = {
    id: 'hiv-seroconversion-features',
    title: 'Acute Retroviral Syndrome',
    subtitle: 'Clinical Features & Testing Approach',
    sections: [
        {
            body: 'Acute HIV seroconversion presents 2\u20134 weeks after exposure and is frequently misdiagnosed as mononucleosis, influenza, or strep pharyngitis. Recognizing the pattern prevents missed diagnosis and ongoing transmission.',
        },
        {
            heading: 'Characteristic Presentation',
            body: '• **Fever** \u2014 present in 80\u201390% of cases, often high-grade\n• **Sore throat** \u2014 pharyngitis WITHOUT exudate (unlike strep or EBV)\n• **Macular rash** \u2014 erythematous, non-pruritic; face, trunk, and upper extremities; appears day 2\u20133 of illness\n• **Lymphadenopathy** \u2014 diffuse, non-tender, symmetric\n• **Mucocutaneous ulcers** \u2014 oral and/or genital; shallow, painful\n• **Myalgia / arthralgia** \u2014 widespread, non-specific\n• **Headache** \u2014 may be severe; consider aseptic meningitis if meningismus present\n• **Weight loss / diarrhea** \u2014 in some cases',
        },
        {
            heading: 'Key Distinguishing Features',
            body: '• **NO respiratory symptoms** \u2014 absence of cough, rhinorrhea, and congestion distinguishes ARS from influenza and URI\n• **NO exudative pharyngitis** \u2014 unlike strep and mononucleosis\n• **Mucocutaneous ulcers** \u2014 highly specific; rare in other viral syndromes\n• **Rash + fever + lymphadenopathy + sore throat** without respiratory symptoms should trigger HIV testing\n• Ask about sexual exposure or needle sharing in the preceding 2\u20136 weeks',
        },
        {
            heading: 'Laboratory Findings',
            body: '• **Lymphopenia** initially (transient CD4 drop), followed by lymphocytosis with atypical lymphocytes\n• **Thrombocytopenia** \u2014 mild, self-limited\n• **Elevated transaminases** \u2014 hepatitis in 20\u201350% of cases\n• **Elevated ESR/CRP** \u2014 non-specific but supports viral syndrome',
        },
        {
            heading: 'Testing Approach',
            body: '• **4th generation Ag/Ab test** (preferred) \u2014 detects p24 antigen + HIV-1/2 antibodies; window period ~2 weeks [1]\n• **If 4th gen negative but clinical suspicion high** \u2014 send HIV RNA viral load (detectable within 10\u201312 days of infection)\n• **Never rely on antibody-only (3rd gen) test alone** \u2014 window period 3\u20134 weeks; will miss acute seroconversion\n• **Rapid point-of-care tests** are antibody-only \u2014 useful for screening but CANNOT rule out acute infection\n• If ARS confirmed: refer for immediate ART initiation (reduces reservoir size and transmission risk)',
        },
        {
            heading: 'Differential Diagnosis',
            body: '• Infectious mononucleosis (EBV) \u2014 exudative pharyngitis, splenomegaly, positive heterophile\n• Influenza \u2014 respiratory symptoms predominate\n• Secondary syphilis \u2014 palmar rash, condylomata lata, positive RPR\n• Strep pharyngitis \u2014 exudate, anterior cervical LAD, positive rapid strep\n• CMV mononucleosis \u2014 heterophile-negative, less pharyngitis\n• Drug reaction \u2014 medication exposure history',
        },
    ],
    citations: [
        { num: 1, text: 'Branson BM, Handsfield HH, Lampe MA, et al. Revised Recommendations for HIV Testing of Adults, Adolescents, and Pregnant Women in Health-Care Settings. MMWR Recomm Rep. 2006;55(RR-14):1-17.' },
        { num: 2, text: 'Cohen MS, Shaw GM, McMichael AJ, Haynes BF. Acute HIV-1 Infection. N Engl J Med. 2011;364(20):1943-1954.' },
        { num: 3, text: 'Daar ES, Little S, Pitt J, et al. Diagnosis of Primary HIV-1 Infection. Ann Intern Med. 2001;134(1):25-29.' },
    ],
};
const HIV_ARV_CLASSES = {
    id: 'hiv-arv-classes',
    title: 'Antiretroviral Drug Classes & Side Effects',
    subtitle: 'ED-Relevant Toxicities & Interactions',
    sections: [
        {
            body: 'Overview of the five major antiretroviral drug classes, their signature toxicities relevant to ED presentations, and critical drug interactions. Most patients on modern ART take a two- or three-drug combination (often as a single pill). [1][2]',
        },
        {
            heading: 'NRTIs / NtRTIs (Nucleoside/Nucleotide Reverse Transcriptase Inhibitors)',
            body: '• **Tenofovir disoproxil fumarate (TDF)** \u2014 Fanconi syndrome (proximal renal tubular acidosis, glycosuria, phosphaturia, proteinuria), decreased bone mineral density\n• **Tenofovir alafenamide (TAF)** \u2014 less renal and bone toxicity than TDF; preferred in renal impairment\n• **Abacavir (ABC)** \u2014 HLA-B*5701 hypersensitivity reaction (fever, rash, GI symptoms \u2014 can be fatal on rechallenge); associated with increased MI risk in some studies\n• **Lamivudine (3TC) / Emtricitabine (FTC)** \u2014 well-tolerated; active against hepatitis B (HBV flare risk if discontinued in co-infected patients)\n• **Zidovudine (AZT)** \u2014 macrocytic anemia, neutropenia, myopathy (legacy drug, rarely used)\n• **Class effect:** lactic acidosis with hepatic steatosis (rare but life-threatening, primarily with older NRTIs)',
        },
        {
            heading: 'NNRTIs (Non-Nucleoside Reverse Transcriptase Inhibitors)',
            body: '• **Efavirenz (EFV)** \u2014 neuropsychiatric effects (vivid dreams, depression, psychosis, suicidality), dizziness, Stevens-Johnson syndrome\n• **Nevirapine (NVP)** \u2014 severe hepatotoxicity (fulminant hepatitis, especially in women with CD4 >250 or men with CD4 >400), SJS/TEN\n• **Doravirine (DOR)** \u2014 fewer CNS side effects than efavirenz; better tolerated\n• **Rilpivirine (RPV)** \u2014 requires food and gastric acid for absorption; avoid PPIs (reduced efficacy)\n• **Class effect:** rash (usually mild, self-limited); low barrier to resistance',
        },
        {
            heading: 'PIs (Protease Inhibitors)',
            body: '• **Atazanavir (ATV)** \u2014 indirect hyperbilirubinemia (jaundice without hepatotoxicity), radiolucent kidney stones (invisible on plain film, visible on CT), cholelithiasis, nephrolithiasis\n• **Darunavir (DRV)** \u2014 rash (contains sulfonamide moiety), GI intolerance; requires pharmacokinetic booster\n• **Ritonavir / Cobicistat** \u2014 used as pharmacokinetic boosters (not for antiviral effect); potent CYP3A4 inhibitors causing major drug interactions\n• **Critical interactions:** Contraindicated with simvastatin, lovastatin, ergot alkaloids, oral midazolam, triazolam, rifampin, St. John\u2019s wort. Significant interactions with calcium channel blockers, warfarin, direct oral anticoagulants, immunosuppressants.\n• **Class effect:** metabolic syndrome (dyslipidemia, insulin resistance, lipodystrophy), GI intolerance (nausea, diarrhea)',
        },
        {
            heading: 'INSTIs (Integrase Strand Transfer Inhibitors)',
            body: '• **Bictegravir (BIC)** \u2014 available only as co-formulated Biktarvy (BIC/TAF/FTC); well-tolerated, high barrier to resistance\n• **Dolutegravir (DTG)** \u2014 neural tube defect concern in periconception period (risk ~0.3%); insomnia, weight gain; rare hypersensitivity\n• **Raltegravir (RAL)** \u2014 fewest drug interactions of any ARV class; CK elevation, myopathy (rare)\n• **Elvitegravir (EVG)** \u2014 requires cobicistat boosting (carries CYP3A4 interaction liability)\n• **Class effect:** generally the best-tolerated ARV class; weight gain (especially with DTG); insomnia and headache',
        },
        {
            heading: 'Entry / Attachment Inhibitors',
            body: '• **Enfuvirtide (T-20)** \u2014 subcutaneous injection-site reactions (nearly universal); used only in heavily treatment-experienced patients\n• **Maraviroc (MVC)** \u2014 CCR5 antagonist; hepatotoxicity (with allergic features), postural hypotension; requires tropism testing before use\n• **Ibalizumab (IBA)** \u2014 monoclonal antibody; IV infusion; hypersensitivity reactions; reserved for multidrug-resistant HIV\n• **Fostemsavir (FTR)** \u2014 attachment inhibitor; QTc prolongation; reserved for multidrug-resistant HIV\n• **Lenacapavir** \u2014 first-in-class capsid inhibitor; subcutaneous q6 months; injection-site reactions',
        },
        {
            heading: 'ED Pearls',
            body: '• **Do not stop ART** in the ED unless directed by HIV specialist \u2014 interruptions promote resistance\n• **Check drug interactions** before prescribing any new medication to a patient on ART (especially PIs and cobicistat-boosted regimens)\n• **Radiolucent stones**: if patient on atazanavir presents with renal colic and negative plain film, order CT\n• **Lactic acidosis**: consider in any HIV patient with unexplained metabolic acidosis, especially on older NRTIs\n• **Immune reconstitution inflammatory syndrome (IRIS)**: paradoxical worsening within weeks of ART initiation \u2014 unmasking of latent OIs',
        },
    ],
    citations: [
        { num: 1, text: 'Saag MS, Gandhi RT, Hoy JF, et al. Antiretroviral Drugs for Treatment and Prevention of HIV Infection in Adults: 2020 Recommendations of the International Antiviral Society\u2013USA Panel. JAMA. 2020;324(16):1651-1669.' },
        { num: 2, text: 'Panel on Antiretroviral Guidelines for Adults and Adolescents. Guidelines for the Use of Antiretroviral Agents in Adults and Adolescents with HIV. HHS. 2024.' },
        { num: 3, text: 'Tseng A, Seet J, Phillips EJ. The Evolution of Three Decades of Antiretroviral Therapy: Challenges, Triumphs and the Promise of the Future. Br J Clin Pharmacol. 2015;79(2):182-194.' },
    ],
};
const HIV_TESTING_GUIDE = {
    id: 'hiv-testing-guide',
    title: 'HIV Testing & Screening Guide',
    subtitle: 'Universal Screening, Technologies & Window Periods',
    sections: [
        {
            body: 'HIV testing in the ED is a critical public health intervention. An estimated 13% of people living with HIV in the US are unaware of their status. ED-based screening programs have identified new diagnoses in 0.1\u20130.7% of tested patients. [1][2]',
        },
        {
            heading: 'Universal Screening Recommendations',
            body: '• **CDC (2006):** Opt-out HIV screening for all patients aged 13\u201364 in healthcare settings, including EDs; repeat at least annually for high-risk patients [1]\n• **USPSTF (2019):** Grade A recommendation for screening all adolescents and adults aged 15\u201365; younger and older if at increased risk [2]\n• **ACEP (2022):** Supports routine opt-out ED-based HIV screening as a public health strategy\n• **Separate written consent is NOT required** in most states \u2014 general medical consent covers HIV testing\n• Pre-test counseling requirements have been eliminated in most jurisdictions to reduce barriers',
        },
        {
            heading: 'Risk-Based Screening Indications',
            body: '• Men who have sex with men (MSM)\n• Injection drug use (IDU) or needle sharing\n• Transactional sex or sex work\n• Sexual contact with known HIV-positive partner\n• Diagnosis of another sexually transmitted infection\n• Diagnosis of tuberculosis or hepatitis B/C\n• Occupational exposure (needlestick, mucous membrane splash)\n• Sexual assault\n• Pregnancy (all trimesters \u2014 opt-out)\n• Patients requesting PEP or PrEP\n• Incarcerated populations\n• Homeless individuals',
        },
        {
            heading: 'Testing Technologies',
            body: '• **4th generation Ag/Ab combination immunoassay** (preferred)\n  \u2014 Detects HIV-1 p24 antigen + HIV-1/2 antibodies simultaneously\n  \u2014 Window period: ~2 weeks (14\u201318 days)\n  \u2014 Sensitivity 99.7%, specificity 99.5%\n  \u2014 Laboratory-based; turnaround time typically 1\u20132 hours\n\n• **3rd generation antibody-only immunoassay**\n  \u2014 Detects HIV-1/2 antibodies (IgM and IgG)\n  \u2014 Window period: 3\u20134 weeks (21\u201328 days)\n  \u2014 Will MISS acute seroconversion during the window period\n\n• **Rapid point-of-care tests** (e.g., OraQuick, INSTI)\n  \u2014 Antibody-only (most are 3rd generation equivalent)\n  \u2014 Results in 1\u201320 minutes\n  \u2014 Useful for screening but CANNOT rule out acute HIV infection\n  \u2014 All reactive rapid tests require confirmatory laboratory testing\n\n• **HIV RNA viral load (PCR/NAAT)**\n  \u2014 Detects viral RNA directly; earliest marker (detectable 10\u201312 days post-infection)\n  \u2014 NOT a screening test \u2014 use when acute seroconversion suspected with negative/indeterminate Ag/Ab\n  \u2014 Quantitative result also useful for monitoring treatment response',
        },
        {
            heading: 'Window Periods Summary',
            body: '• **HIV RNA (NAAT):** 10\u201312 days\n• **4th gen Ag/Ab:** 14\u201318 days (p24 antigen appears first)\n• **3rd gen Ab-only:** 21\u201328 days\n• **Rapid POC tests:** 21\u201390 days (depending on test)\n• **Self-test (OraQuick Home):** ~90 days\n\nA negative test within the window period does NOT exclude infection. Counsel patients with recent high-risk exposure to retest at appropriate intervals.',
        },
        {
            heading: 'Confirmatory Testing Algorithm (CDC)',
            body: '• Reactive 4th gen Ag/Ab \u2192 HIV-1/HIV-2 antibody differentiation immunoassay\n• If differentiation assay is negative or indeterminate \u2192 HIV-1 RNA NAAT\n• Positive NAAT = acute HIV-1 infection (antibodies not yet developed)\n• Negative NAAT + negative differentiation = false-positive initial screen\n• Never diagnose HIV on a single reactive screening test \u2014 always confirm',
        },
        {
            heading: 'ED Pearls',
            body: '• **Opt-out > opt-in:** ED programs using opt-out achieve 2\u20133\u00D7 higher testing rates\n• **Link to care** is essential: a positive result without a warm handoff to HIV care is a missed opportunity\n• **PEP window:** if exposure was <72 hours ago, initiate PEP while confirmatory results are pending\n• **Acute seroconversion:** the highest-transmission-risk period \u2014 viral loads can exceed 10 million copies/mL\n• **Document** exposure history and risk assessment in the chart for all tested patients',
        },
    ],
    citations: [
        { num: 1, text: 'Branson BM, Handsfield HH, Lampe MA, et al. Revised Recommendations for HIV Testing of Adults, Adolescents, and Pregnant Women in Health-Care Settings. MMWR Recomm Rep. 2006;55(RR-14):1-17.' },
        { num: 2, text: 'US Preventive Services Task Force. Screening for HIV Infection: US Preventive Services Task Force Recommendation Statement. JAMA. 2019;321(23):2326-2336.' },
        { num: 3, text: 'Rothman RE, Lyons MS, Haukoos JS. Optimal HIV Testing Strategies for Emergency Departments. Ann Emerg Med. 2018;72(5):533-545.' },
        { num: 4, text: 'Centers for Disease Control and Prevention. Laboratory Testing for the Diagnosis of HIV Infection: Updated Recommendations. CDC. 2014.' },
    ],
};
const HIV_SYSTEM_COMPLICATIONS = {
    id: 'hiv-system-complications',
    title: 'HIV System-Based Complications',
    subtitle: 'Comprehensive Organ-System Reference',
    sections: [
        {
            body: 'People living with HIV face a dual burden: opportunistic infections (primarily when immunocompromised) and chronic inflammatory/metabolic complications (even when virally suppressed). This reference covers ED-relevant complications organized by organ system. [1][2]',
        },
        {
            heading: 'Cardiovascular',
            body: '• **Coronary artery disease** \u2014 1.5\u20132\u00D7 increased risk vs. general population; chronic inflammation, ART metabolic effects (PIs), and traditional risk factors. Treat per standard ACS guidelines. [1]\n• **Heart failure** \u2014 HIV-associated cardiomyopathy (dilated, often subclinical); myocarditis from HIV itself or OIs\n• **Venous thromboembolism** \u2014 2\u201310\u00D7 increased VTE risk; chronic inflammation, endothelial dysfunction, immobility, OIs\n• **Pulmonary hypertension** \u2014 HIV-associated PAH; dyspnea, RV failure; occurs independent of CD4 count\n• **Pericardial disease** \u2014 effusion (TB, lymphoma), pericarditis',
        },
        {
            heading: 'Pulmonary',
            body: '• **PJP (Pneumocystis jirovecii pneumonia)** \u2014 CD4 <200; insidious dyspnea, dry cough, bilateral ground-glass opacities on CT, elevated LDH; diagnose with induced sputum or BAL\n• **COPD** \u2014 accelerated lung aging; increased prevalence even in non-smokers\n• **Pulmonary embolism** \u2014 elevated VTE risk (see Cardiovascular)\n• **Tuberculosis** \u2014 any CD4 count; atypical presentations with low CD4 (lower lobe, miliary, extrapulmonary); always isolate and test\n• **Bacterial pneumonia** \u2014 most common pulmonary infection at any CD4; S. pneumoniae, H. influenzae; recurrent pneumonia is an AIDS-defining illness\n• **Kaposi sarcoma** \u2014 pulmonary KS with bilateral nodular infiltrates, pleural effusions; CD4 typically <100',
        },
        {
            heading: 'Renal',
            body: '• **HIV-associated nephropathy (HIVAN)** \u2014 collapsing FSGS; proteinuria, renal failure; more common in Black patients; improves with ART\n• **Fanconi syndrome** \u2014 TDF-induced proximal renal tubular acidosis; glycosuria, phosphaturia, proteinuria, non-anion gap metabolic acidosis\n• **Radiolucent kidney stones** \u2014 atazanavir (PI); invisible on plain film; CT required for diagnosis\n• **Acute kidney injury** \u2014 multifactorial: medications (TDF, NSAIDs, TMP-SMX), dehydration, sepsis, rhabdomyolysis\n• **Chronic kidney disease** \u2014 prevalence 5\u201330%; TDF, diabetes, hypertension, HIVAN all contribute',
        },
        {
            heading: 'Neurologic',
            body: '• **Stroke** \u2014 increased risk across all age groups; vasculopathy, accelerated atherosclerosis, cardioembolism, opportunistic vasculitis\n• **HIV-associated neurocognitive disorder (HAND)** \u2014 spectrum from asymptomatic to HIV-associated dementia; occurs even with viral suppression\n• **CNS opportunistic infections:**\n  \u2014 Toxoplasmosis (CD4 <100): ring-enhancing lesions, seizures, focal deficits\n  \u2014 Cryptococcal meningitis (CD4 <100): headache, altered mental status, elevated opening pressure >20 cmH\u2082O\n  \u2014 PML/JC virus (CD4 <200): progressive white matter demyelination, no enhancement, no mass effect\n  \u2014 CMV encephalitis (CD4 <50): periventricular enhancement\n• **Primary CNS lymphoma** \u2014 CD4 <50; single ring-enhancing lesion (vs. multiple in toxo); EBV-driven\n• **Peripheral neuropathy** \u2014 distal symmetric polyneuropathy (HIV itself or didanosine/stavudine)',
        },
        {
            heading: 'Gastrointestinal',
            body: '• **Medication-induced diarrhea** \u2014 PIs (especially ritonavir), nelfinavir; common reason for ED visit\n• **C. difficile** \u2014 higher incidence and recurrence rates in HIV patients\n• **Hepatitis C co-infection** \u2014 present in ~25% of HIV patients; accelerated fibrosis; check HCV status\n• **Hepatitis B co-infection** \u2014 TDF/TAF and FTC/3TC treat both; HBV flare if these agents stopped\n• **Esophageal disease** \u2014 Candida esophagitis (CD4 <200; odynophagia, white plaques), CMV esophagitis (CD4 <50; deep ulcers), HSV esophagitis\n• **CMV colitis** \u2014 CD4 <50; bloody diarrhea, abdominal pain; biopsy for diagnosis\n• **HIV enteropathy** \u2014 chronic diarrhea, malabsorption without identifiable pathogen; diagnosis of exclusion',
        },
        {
            heading: 'Hematologic',
            body: '• **Cytopenias** \u2014 anemia (HIV marrow suppression, AZT, parvovirus B19), neutropenia (HIV, AZT, TMP-SMX), thrombocytopenia (immune-mediated, resembles ITP)\n• **Venous thromboembolism** \u2014 2\u201310\u00D7 increased risk; consider in any HIV patient with dyspnea or leg swelling\n• **Thrombotic thrombocytopenic purpura (TTP)** \u2014 rare but classic association; pentad of thrombocytopenia, MAHA, neuro changes, renal failure, fever\n• **Lymphoma** \u2014 non-Hodgkin (Burkitt, DLBCL, primary CNS), Hodgkin lymphoma (not AIDS-defining but increased); B symptoms, lymphadenopathy, cytopenias',
        },
        {
            heading: 'Endocrine & Metabolic',
            body: '• **Metabolic syndrome** \u2014 PI-associated dyslipidemia (elevated TG, LDL), insulin resistance, central lipodystrophy\n• **IRIS thyrotoxicosis** \u2014 Graves disease unmasked by immune reconstitution after ART initiation; presents weeks to months into treatment\n• **Diabetes mellitus** \u2014 PI-associated insulin resistance; increased prevalence\n• **Adrenal insufficiency** \u2014 CMV adrenalitis, ketoconazole use, infiltrative disease; consider in critically ill HIV patient with refractory hypotension\n• **Hypogonadism** \u2014 testosterone deficiency; fatigue, weight loss, decreased bone density\n• **Lactic acidosis** \u2014 NRTI-induced mitochondrial toxicity; unexplained AG metabolic acidosis with hepatic steatosis',
        },
        {
            heading: 'Musculoskeletal',
            body: '• **Osteoporosis / fractures** \u2014 TDF bone loss, chronic inflammation, hypogonadism; 2\u20134\u00D7 increased fracture risk\n• **Avascular necrosis (AVN)** \u2014 corticosteroid use, PI-associated dyslipidemia; hip most common; bilateral in 40\u201380%\n• **Myopathy** \u2014 AZT-associated mitochondrial myopathy; proximal weakness, elevated CK\n• **Septic arthritis / osteomyelitis** \u2014 increased risk when immunocompromised; atypical organisms possible',
        },
        {
            heading: 'Psychiatric',
            body: '• **Depression** \u2014 2\u20133\u00D7 prevalence vs. general population; screen all patients; major barrier to ART adherence\n• **Demoralization / adjustment disorder** \u2014 common at diagnosis and during disease complications\n• **Mania / psychosis** \u2014 efavirenz-induced neuropsychiatric effects; CNS OIs (toxo, PML); HIV-associated mania (late-stage)\n• **Suicidality** \u2014 increased risk, especially at diagnosis and during efavirenz therapy\n• **Substance use disorders** \u2014 high co-occurrence; IDU, methamphetamine, alcohol; critical to address for ART adherence',
        },
        {
            heading: 'Dermatologic',
            body: '• **Drug rashes** \u2014 NNRTIs (SJS/TEN risk with nevirapine, efavirenz), abacavir hypersensitivity, TMP-SMX (10\u00D7 more common in HIV), dapsone\n• **Eosinophilic folliculitis** \u2014 pruritic papules on face, trunk; CD4 <250; improves with ART\n• **Kaposi sarcoma** \u2014 HHV-8\u2013driven; violaceous papules/plaques/nodules; skin, oral mucosa, visceral involvement; AIDS-defining\n• **Molluscum contagiosum** \u2014 giant or widespread lesions when CD4 <200\n• **Herpes zoster** \u2014 multidermatomal or disseminated; may be first sign of immunocompromise\n• **Seborrheic dermatitis** \u2014 severe, widespread; common early indicator\n• **Prurigo nodularis** \u2014 chronic pruritic nodules; associated with advanced immunosuppression',
        },
    ],
    citations: [
        { num: 1, text: 'Feinstein MJ, Hsue PY, Benjamin LA, et al. Characteristics, Prevention, and Management of Cardiovascular Disease in People Living With HIV: A Scientific Statement From the American Heart Association. Circulation. 2019;140(2):e98-e124.' },
        { num: 2, text: 'Saag MS, Gandhi RT, Hoy JF, et al. Antiretroviral Drugs for Treatment and Prevention of HIV Infection in Adults: 2020 Recommendations of the International Antiviral Society\u2013USA Panel. JAMA. 2020;324(16):1651-1669.' },
        { num: 3, text: 'Panel on Antiretroviral Guidelines for Adults and Adolescents. Guidelines for the Use of Antiretroviral Agents in Adults and Adolescents with HIV. HHS. 2024.' },
        { num: 4, text: 'Kaplan JE, Benson C, Holmes KK, et al. Guidelines for Prevention and Treatment of Opportunistic Infections in HIV-Infected Adults and Adolescents. MMWR Recomm Rep. 2009;58(RR-4):1-207.' },
    ],
};
// -------------------------------------------------------------------
// Meningitis / Encephalitis Info Pages
// -------------------------------------------------------------------
const MENING_STEPS_SUMMARY = {
    id: 'mening-steps-summary',
    title: 'Meningitis/Encephalitis Steps Summary',
    subtitle: 'Quick Reference \u2014 Time-Critical ED Management',
    sections: [
        {
            heading: 'Recognition',
            body: '\u2022 [Suspect CNS infection: \u22652 of 4 symptoms (headache, fever, neck stiffness, AMS) present in 95% of cases](#/node/mening-clinical)\n\u2022 [Assess for focal deficits \u2192 encephalitis vs meningitis](#/node/mening-focal-deficits)\n\u2022 Kernig/Brudzinski signs: only 2% sensitive \u2014 do NOT rely on for ruling out',
        },
        {
            heading: 'Workup',
            body: '\u2022 [CT before LP? Only if: GCS \u226412, focal deficits, papilledema, uncontrolled seizures](#/node/mening-ct-decision)\n\u2022 [LP technique: 4 tubes, up to 15 mL safe, opening pressure in lateral decubitus](#/node/mening-lp-technique)\n\u2022 **NEVER delay antibiotics for imaging or LP**',
        },
        {
            heading: 'Empiric Treatment (\u22641 Hour)',
            body: '\u2022 [Immunocompetent <50y: Ceftriaxone 2g IV q12h + Vancomycin + Dexamethasone](#/node/mening-tx-standard)\n\u2022 [Age \u226550 / pregnant / immunocompromised: ADD Ampicillin 2g IV q4h (Listeria coverage)](#/node/mening-tx-expanded)\n\u2022 [Healthcare-associated: Vancomycin + Meropenem 2g IV q8h](#/node/mening-tx-nosocomial)\n\u2022 [Suspected cryptococcal: Amphotericin B + Flucytosine (ID consult)](#/node/mening-tx-crypto)\n\u2022 **Add [Acyclovir](#/drug/acyclovir/encephalitis) 10 mg/kg IV q8h if ANY encephalitis features**',
        },
        {
            heading: 'CSF Interpretation',
            body: '\u2022 [Interpret CSF pattern: bacterial vs viral vs fungal vs equivocal](#/node/mening-csf-pattern)\n\u2022 CSF lactate >35 mg/dL: 93% sensitive for bacterial meningitis\n\u2022 Serum PCT >0.25-0.5 ng/mL: 90-95% sensitive for bacterial etiology\n\u2022 6% of culture-proven ABM has NO elevated WBC \u2014 when in doubt, treat as bacterial',
        },
        {
            heading: 'Adjunctive Therapy',
            body: '\u2022 [Dexamethasone 0.15 mg/kg IV q6h \u00d7 2-4 days \u2014 give with or before first antibiotics](#/node/mening-steroids)\n\u2022 STOP steroids if Listeria or Cryptococcus identified\n\u2022 Contact prophylaxis for N. meningitidis exposures',
        },
        {
            heading: 'Disposition',
            body: '\u2022 [Discharge: low-risk viral meningitis with controlled symptoms and reliable follow-up](#/node/mening-discharge)\n\u2022 [Ward: stable, awaiting CSF results, continued IV antibiotics](#/node/mening-ward)\n\u2022 [ICU: GCS \u22648, hemodynamic instability, seizures, severe encephalitis](#/node/mening-icu)',
        },
    ],
    citations: [
        { num: 1, text: 'van de Beek D, et al. ESCMID guideline: diagnosis and treatment of acute bacterial meningitis. Clin Microbiol Infect. 2016;22:S37-S62.' },
        { num: 2, text: 'Aronin SI, et al. Community-acquired bacterial meningitis: risk stratification for adverse clinical outcome and effect of antibiotic timing. Ann Intern Med. 1998;129(11):862-869.' },
    ],
};
const MENING_CSF_GUIDE = {
    id: 'mening-csf-guide',
    title: 'CSF Interpretation Guide',
    subtitle: 'Cerebrospinal Fluid Analysis for CNS Infections',
    sections: [
        {
            heading: 'Normal CSF Values',
            body: '\u2022 Red blood cells: 0\n\u2022 White blood cells: <5 cells/mcL\n\u2022 CSF:serum glucose ratio: >0.67\n\u2022 Protein: <50 mg/dL\n\u2022 Lactate: <35 mg/dL\n\u2022 Gram stain: no visible organisms\n\u2022 Opening pressure: <20 cm H\u2082O [1]',
        },
        {
            heading: 'Bacterial Meningitis Pattern',
            body: '\u2022 WBC: 10\u201310,000 cells/mcL (usually >100), **neutrophil predominance** [1,2]\n\u2022 CSF:serum glucose ratio: decreased (cutoff <0.36 \u2192 93% sensitivity/specificity) [1]\n\u2022 Protein: elevated, mean ~135 mg/dL [2]\n\u2022 Lactate: >35.1 mg/dL (93% sensitivity, 97% specificity pre-antibiotics) [3]\n\u2022 Opening pressure: often elevated; >40 cm H\u2082O in 39% [1]\n\u2022 Gram stain: 60\u201399% sensitive, 97\u2013100% specific [1]\n\n**Caveats:**\n\u2022 6% of culture-proven ABM lacks elevated WBC [2]\n\u2022 10% have lymphocyte-predominant differentials [2]\n\u2022 25% of L. monocytogenes cases have normal/near-normal CSF [1]\n\u2022 Early disease or prior antibiotics may mask typical pattern',
        },
        {
            heading: 'Viral Meningitis Pattern',
            body: '\u2022 WBC: generally <250 (range 5\u20131000), **lymphocyte predominance** [1,4]\n\u2022 CSF:serum glucose ratio: normal to mildly decreased [2]\n\u2022 Protein: normal to mildly elevated, mean ~56 mg/dL [2]\n\u2022 Lactate: usually normal\n\u2022 Opening pressure: usually normal (<20 cm H\u2082O) [1]\n\u2022 Gram stain: negative',
        },
        {
            heading: 'Fungal Meningitis Pattern',
            body: '\u2022 WBC: variable, lymphocyte predominance\n\u2022 CSF:serum glucose ratio: often very low\n\u2022 Protein: elevated\n\u2022 Opening pressure: often significantly elevated\n\u2022 Subacute presentation (weeks of evolving symptoms)\n\u2022 CSF CrAg: highly sensitive for cryptococcal meningitis\n\u2022 CSF lactate may be elevated [3]',
        },
        {
            heading: 'Traumatic Tap Correction',
            body: 'When RBCs contaminate CSF from traumatic LP:\n\n**Predicted CSF WBCs = CSF RBCs \u00d7 (Blood WBCs / Blood RBCs)**\n\nThis formula is more accurate than the traditional rule of subtracting 1 WBC per 500\u20131500 RBCs. [1]\n\nCompare Tube 1 and Tube 4 cell counts \u2014 decreasing RBCs suggest traumatic tap rather than subarachnoid hemorrhage.',
        },
        {
            heading: 'Key Diagnostic Biomarkers',
            body: '**CSF Lactate:** Independent of serum level (crosses BBB slowly). >35.1 mg/dL strongly favors bacterial cause. Particularly useful in healthcare-associated infections where postoperative inflammation alters conventional markers. [3]\n\n**CSF PCR:** Detects bacterial DNA even days after antibiotics (87\u2013100% sensitive, 98\u2013100% specific). Gold standard for viral pathogen identification. [5]\n\n**Serum PCT:** >0.25\u20130.5 ng/mL has 90\u201395% sensitivity, 98\u2013100% specificity for distinguishing bacterial from viral meningitis. More sensitive than any CSF marker for this purpose. [6]',
        },
    ],
    citations: [
        { num: 1, text: 'Costerus JM, et al. Community-acquired bacterial meningitis. Curr Opin Infect Dis. 2017;30(1):135-141.' },
        { num: 2, text: 'Juli\u00e1n-Jim\u00e9nez A, et al. Usefulness of blood and cerebrospinal fluid laboratory testing to predict bacterial meningitis. Neurologia. 2019;34(2):105-113.' },
        { num: 3, text: 'Sakushima K, et al. Diagnostic accuracy of CSF lactate for differentiating bacterial meningitis from aseptic meningitis: a meta-analysis. J Infect. 2011;62(4):255-262.' },
        { num: 4, text: 'Wright WF, et al. Viral (aseptic) meningitis: a review. J Neurol Sci. 2019;398:176-183.' },
        { num: 5, text: 'McGill F, et al. UK joint specialist societies guideline on acute meningitis. J Infect. 2016;72(4):405-438.' },
        { num: 6, text: 'Vikse J, et al. Serum procalcitonin in the diagnosis of bacterial meningitis: systematic review and meta-analysis. Int J Infect Dis. 2015;38:68-76.' },
    ],
};
const MENING_CT_CRITERIA = {
    id: 'mening-ct-criteria',
    title: 'CT Before Lumbar Puncture',
    subtitle: 'International Guideline Comparison',
    sections: [
        {
            heading: 'Key Principle',
            body: 'CT is NOT sensitive for detecting meningitis or encephalitis. Its purpose is to exclude mass lesions that could cause herniation with LP. **Most patients do NOT need CT before LP.** [1]\n\nHerniation after LP is rare: only 0.1% of patients deteriorated within 1 hour of LP. Of those who deteriorated, 91% had a prior normal CT. [2]',
        },
        {
            heading: 'IDSA 2004 Criteria (United States)',
            body: 'CT before LP recommended if ANY of:\n\u2022 Immunocompromised state\n\u2022 History of CNS disease (mass, stroke, focal infection)\n\u2022 New-onset seizure (within 1 week)\n\u2022 Papilledema\n\u2022 Altered consciousness\n\u2022 Focal neurologic deficit [3]',
        },
        {
            heading: 'Swedish 2009 Criteria (More Permissive)',
            body: 'CT before LP recommended if ANY of:\n\u2022 Focal neurologic signs\n\u2022 Papilledema\n\u2022 GCS <10\n\u2022 Continuous or uncontrolled seizures\n\n**Notably excludes:** altered mental status and self-limited seizures \u2014 evidence suggests these are NOT independent risk factors for herniation. [4]',
        },
        {
            heading: 'UK Joint Specialist Societies 2016 Criteria',
            body: 'CT before LP recommended if ANY of:\n\u2022 Focal neurologic signs\n\u2022 Papilledema\n\u2022 Continuous or uncontrolled seizures\n\u2022 GCS \u226412\n\u2022 Rapidly declining level of consciousness [1]\n\n**Key difference from IDSA:** Does not include immunocompromised state or simple new-onset seizures as indications.',
        },
        {
            heading: 'Practical Approach',
            body: '**ALWAYS start empiric antibiotics before CT if CT is indicated.**\n\nIf NO indications for CT:\n\u2022 Proceed directly to LP\n\u2022 Start antibiotics within 1 hour of suspicion\n\nIf CT IS indicated:\n\u2022 Start empiric antibiotics + dexamethasone IMMEDIATELY\n\u2022 Draw blood cultures before antibiotics if possible\n\u2022 Obtain CT\n\u2022 Perform LP after CT if no contraindication found\n\u2022 Antibiotics given >4 hours before LP reduce culture sensitivity >30% [1]',
        },
    ],
    citations: [
        { num: 1, text: 'McGill F, et al. UK joint specialist societies guideline on the diagnosis and management of acute meningitis. J Infect. 2016;72(4):405-438.' },
        { num: 2, text: 'Costerus JM, et al. Cranial CT, LP, and clinical deterioration in bacterial meningitis: a nationwide cohort study. Clin Infect Dis. 2018;67(6):920-926.' },
        { num: 3, text: 'Tunkel AR, et al. Practice guidelines for the management of bacterial meningitis. Clin Infect Dis. 2004;39(9):1267-1284.' },
        { num: 4, text: 'Glim\u00e5ker M, et al. Early lumbar puncture in adult bacterial meningitis\u2014rationale for revised guidelines. Scand J Infect Dis. 2013;45(9):657-663.' },
    ],
};
const MENING_ABX_TABLE = {
    id: 'mening-abx-table',
    title: 'Empiric Antimicrobial Regimens',
    subtitle: 'By Patient Risk Category',
    sections: [
        {
            heading: 'Immunocompetent Adult <50 Years',
            body: '**Targets:** S. pneumoniae, N. meningitidis [1]',
            drugTable: [
                { drug: '[Ceftriaxone](#/drug/ceftriaxone/meningitis)', regimen: '2 g IV q12h' },
                { drug: '[Vancomycin](#/drug/vancomycin/meningitis)', regimen: '15-20 mg/kg IV q8-12h' },
                { drug: '[Dexamethasone](#/drug/dexamethasone/meningitis)', regimen: '0.15 mg/kg IV q6h \u00d7 2-4 days' },
            ],
        },
        {
            heading: 'Age \u226550, Pregnant, or Immunocompromised',
            body: '**Additional target:** L. monocytogenes (not covered by cephalosporins) [1,2]',
            drugTable: [
                { drug: '[Ceftriaxone](#/drug/ceftriaxone/meningitis)', regimen: '2 g IV q12h' },
                { drug: '[Vancomycin](#/drug/vancomycin/meningitis)', regimen: '15-20 mg/kg IV q8-12h' },
                { drug: '[Ampicillin](#/drug/ampicillin/meningitis)', regimen: '2 g IV q4h (Listeria coverage)' },
                { drug: '[Dexamethasone](#/drug/dexamethasone/meningitis)', regimen: '0.15 mg/kg IV q6h \u00d7 2-4 days' },
            ],
        },
        {
            heading: 'Healthcare-Associated / Post-Neurosurgical',
            body: '**Targets:** MRSA, Pseudomonas, resistant gram-negatives [3]',
            drugTable: [
                { drug: '[Vancomycin](#/drug/vancomycin/meningitis)', regimen: '15-20 mg/kg IV q8-12h' },
                { drug: 'Meropenem', regimen: '2 g IV q8h (or Cefepime 2 g IV q8h)' },
            ],
        },
        {
            heading: 'Suspected Cryptococcal (HIV/AIDS)',
            body: '**Requires ID consultation before initiation** [4]',
            drugTable: [
                { drug: '[Amphotericin B liposomal](#/drug/amphotericin-b/cryptococcal meningitis)', regimen: '3-4 mg/kg/day IV (induction)' },
                { drug: '[Flucytosine](#/drug/flucytosine/cryptococcal meningitis)', regimen: '25 mg/kg PO q6h (induction)' },
                { drug: 'Fluconazole', regimen: '400-800 mg/day (consolidation)' },
            ],
        },
        {
            heading: 'Suspected Encephalitis (Any Risk Category)',
            body: '**Add to ANY regimen above if encephalitis features present:** [5]',
            drugTable: [
                { drug: '[Acyclovir](#/drug/acyclovir/encephalitis)', regimen: '10 mg/kg IV q8h (continue pending PCR)' },
            ],
        },
        {
            heading: 'Key Timing Principles',
            body: '\u2022 **Antibiotics within 1 HOUR of suspicion** \u2014 delayed abx = increased mortality [6,7]\n\u2022 **Dexamethasone** given WITH or up to 15-20 min BEFORE first antibiotic dose [1]\n\u2022 **Do NOT delay antibiotics** for CT or LP\n\u2022 **Meropenem** covers L. monocytogenes \u2014 if used, ampicillin may be omitted [1]\n\u2022 **Do NOT give corticosteroids** if cryptococcal or listerial meningitis strongly suspected [1]',
        },
    ],
    citations: [
        { num: 1, text: 'van de Beek D, et al. ESCMID guideline: diagnosis and treatment of acute bacterial meningitis. Clin Microbiol Infect. 2016;22:S37-S62.' },
        { num: 2, text: 'Hasbun R. Update and advances in community acquired bacterial meningitis. Curr Opin Infect Dis. 2019;32(3):233-238.' },
        { num: 3, text: 'Bardak-Ozcem S, Sipahi OR. An updated approach to healthcare-associated meningitis. Expert Rev Anti Infect Ther. 2014;12(3):333-342.' },
        { num: 4, text: 'Tenforde MW, et al. Treatment for HIV-associated cryptococcal meningitis. Cochrane Database Syst Rev. 2018;7:CD005647.' },
        { num: 5, text: 'Whitley RJ, et al. Vidarabine versus acyclovir therapy in herpes simplex encephalitis. N Engl J Med. 1986;314(3):144-149.' },
        { num: 6, text: 'Aronin SI, et al. Community-acquired bacterial meningitis: risk stratification and effect of antibiotic timing. Ann Intern Med. 1998;129(11):862-869.' },
        { num: 7, text: 'Proulx N, et al. Delays in the administration of antibiotics are associated with mortality from adult ABM. QJM. 2005;98(4):291-298.' },
    ],
};
const MENING_STEROID_GUIDE = {
    id: 'mening-steroid-guide',
    title: 'Corticosteroid Guide',
    subtitle: 'Adjunctive Dexamethasone in Meningitis',
    sections: [
        {
            heading: 'Regimen',
            body: '**[Dexamethasone](#/drug/dexamethasone/meningitis) 0.15 mg/kg IV q6h \u00d7 2-4 days**\n\nGive WITH or up to **15-20 minutes BEFORE** first antibiotic dose. [1]',
        },
        {
            heading: 'Evidence Summary',
            body: '**Cochrane 2015** (25 studies, 4121 participants): [2]\n\u2022 Overall ABM: nonsignificant mortality reduction (17.8% vs 19.9%)\n\u2022 **Pneumococcal meningitis in high-income countries:** significant mortality reduction\n\u2022 Significant reduction in **hearing loss** and other neurological sequelae\n\n**TB meningitis** (Cochrane, 9 trials, 1337 patients): [3]\n\u2022 Corticosteroids reduced mortality by ~25% at 18 months\n\n**Mechanism:** Bactericidal antibiotics cause vigorous subarachnoid inflammatory response. Corticosteroids attenuate this inflammation, reducing secondary neurological injury.',
        },
        {
            heading: 'When to CONTINUE',
            body: '\u2022 *Streptococcus pneumoniae* meningitis (strongest evidence) [2]\n\u2022 *Mycobacterium tuberculosis* meningitis [3]\n\u2022 Unknown pathogen (empiric \u2014 pneumococcus is most common cause of ABM)',
        },
        {
            heading: 'When to STOP Immediately',
            body: '\u2022 ***Listeria monocytogenes*** identified \u2014 nonsignificant trend toward WORSE outcomes (Swedish registry, 1746 patients, 19 years) [4]\n\u2022 ***Cryptococcus neoformans*** identified \u2014 associated with WORSENED outcomes [1]\n\u2022 Pathogen identified is NOT S. pneumoniae or M. tuberculosis [1]\n\n**Caution:** Patients receiving steroids for pneumococcal disease who initially recover face increased risk for **delayed cerebral thrombosis** over subsequent weeks. [1]',
        },
        {
            heading: 'Practical Decision',
            body: 'Because pathogen identification is essentially impossible within the first hour of presentation:\n\u2022 Give dexamethasone empirically to most patients with suspected bacterial meningitis [1]\n\u2022 The likelihood of appropriately treating pneumococcal meningitis outweighs the chance of harming a patient with listerial or cryptococcal disease\n\u2022 If clinical evidence STRONGLY favors Listeria or Cryptococcus, consider withholding\n\u2022 Discontinue immediately once these pathogens are confirmed',
        },
    ],
    citations: [
        { num: 1, text: 'van de Beek D, et al. ESCMID guideline: diagnosis and treatment of acute bacterial meningitis. Clin Microbiol Infect. 2016;22:S37-S62.' },
        { num: 2, text: 'Brouwer MC, et al. Corticosteroids for acute bacterial meningitis. Cochrane Database Syst Rev. 2015(9):CD004405.' },
        { num: 3, text: 'Prasad K, et al. Corticosteroids for managing tuberculous meningitis. Cochrane Database Syst Rev. 2016;4:CD002244.' },
        { num: 4, text: 'Glim\u00e5ker M, et al. Betamethasone and dexamethasone in adult community-acquired bacterial meningitis: a quality registry study from 1995 to 2014. Clin Microbiol Infect. 2016;22(9):814.e811-e814.' },
    ],
};
const MENING_DISPO_CRITERIA = {
    id: 'mening-dispo-criteria',
    title: 'Disposition Criteria',
    subtitle: 'Discharge vs Ward vs ICU Admission',
    sections: [
        {
            heading: 'Discharge Criteria (Low-Risk Viral Meningitis)',
            body: 'Absolute criteria for discharge have NOT been validated in adults. The following are extrapolated from pediatric data and should not replace clinical judgment: [1]\n\n\u2022 Nontoxic clinical appearance\n\u2022 Normal serum WBC count\n\u2022 Mild CSF pleocytosis only\n\u2022 Negative CSF Gram stain\n\u2022 Adequate symptom control (headache, nausea, vomiting)\n\u2022 Reliable support system and follow-up capability\n\u2022 Understands return precautions\n\n**Follow-up:** Primary care within **3 days** for reassessment [1]',
        },
        {
            heading: 'Return Precautions',
            body: 'Discuss thoroughly before any discharge:\n\u2022 Worsening headache\n\u2022 Vomiting\n\u2022 Confusion or behavioral changes\n\u2022 Seizures\n\u2022 High fever (>38.5\u00b0C)\n\u2022 Worsening neck stiffness',
        },
        {
            heading: 'Medical Ward Admission',
            body: '\u2022 Alert enough to maintain airway\n\u2022 Stable vital signs, not requiring titratable medications\n\u2022 Does not require close neurological monitoring\n\u2022 Can receive IV antibiotics while awaiting CSF results\n\u2022 Patients with viral meningitis and severe symptoms (refractory headache, persistent vomiting)',
        },
        {
            heading: 'ICU Admission',
            body: '\u2022 GCS score \u22648\n\u2022 Hemodynamic instability requiring vasopressors\n\u2022 Seizure activity or focal neurological deficits\n\u2022 All cases of **severe encephalitis**\n\u2022 Rapidly declining level of consciousness\n\u2022 Need for continuous EEG monitoring\n\u2022 Need for ICP monitoring\n\u2022 Possible need for advanced airway management [2]',
        },
        {
            heading: 'Therapies NOT Recommended',
            body: '\u2022 **Osmotic agents** for ICP reduction: Cochrane review stopped early due to increased mortality in treatment groups [3]\n\u2022 **Therapeutic hypothermia**: RCT (98 patients) stopped early due to increased mortality in treatment group [3]',
        },
    ],
    citations: [
        { num: 1, text: 'Nigrovic LE, et al. Clinical prediction rule for identifying children with CSF pleocytosis at very low risk of bacterial meningitis. JAMA. 2007;297(1):52-60.' },
        { num: 2, text: 'Venkatesan A, et al. Case definitions, diagnostic algorithms, and priorities in encephalitis: consensus statement of the International Encephalitis Consortium. Clin Infect Dis. 2013;57(8):1114-1128.' },
        { num: 3, text: 'van de Beek D, et al. ESCMID guideline: diagnosis and treatment of acute bacterial meningitis. Clin Microbiol Infect. 2016;22:S37-S62.' },
    ],
};
const MENING_PEP_GUIDE = {
    id: 'mening-pep-guide',
    title: 'Postexposure Prophylaxis',
    subtitle: 'Chemoprophylaxis for Meningococcal and H. influenzae Contacts',
    sections: [
        {
            heading: 'N. meningitidis Postexposure Prophylaxis',
            body: 'Indicated for **close contacts** of confirmed N. meningitidis cases (household members, intimate contacts, healthcare workers with unprotected exposure to respiratory secretions). [1]\n\n**Options (any one):**',
            drugTable: [
                { drug: 'Ceftriaxone', regimen: '250 mg IM \u00d7 1 dose (preferred in pregnancy)' },
                { drug: 'Ciprofloxacin', regimen: '500 mg PO \u00d7 1 dose' },
                { drug: 'Rifampin', regimen: '600 mg PO q12h \u00d7 2 days (4 doses total)' },
            ],
        },
        {
            heading: 'H. influenzae Postexposure Prophylaxis',
            body: 'Indicated for household contacts with **incompletely vaccinated children aged <4 years** or immunocompromised children aged <18 years, regardless of vaccination status. [2]',
            drugTable: [
                { drug: 'Rifampin', regimen: '600 mg PO daily \u00d7 4 days (adults)' },
            ],
        },
        {
            heading: 'Varicella Zoster Virus (VZV)',
            body: 'Consider varicella zoster immunoglobulin for **high-risk individuals** without evidence of immunity who have unprotected exposure to VZV: [3]\n\u2022 Immunocompromised patients\n\u2022 Pregnant women\n\u2022 Neonates\n\n**Administer in consultation with an infectious disease specialist.**',
        },
        {
            heading: 'Prehospital Provider Prophylaxis',
            body: 'EMS professionals with unanticipated exposure to N. meningitidis or H. influenzae should receive appropriate chemoprophylaxis using the regimens above.\n\n**Standard precautions** apply for most CNS infections. **Particulate respirators** should be worn for potentially airborne pathogens (VZV, tuberculosis). [1]',
        },
    ],
    citations: [
        { num: 1, text: 'Cohn AC, et al. Prevention and control of meningococcal disease: ACIP recommendations. MMWR Recomm Rep. 2013;62(RR-2):1-28.' },
        { num: 2, text: 'Briere EC, et al. Prevention and control of H. influenzae type b disease: ACIP recommendations. MMWR Recomm Rep. 2014;63(Rr-01):1-14.' },
        { num: 3, text: 'U.S. CDC. Updated recommendations for use of VariZIG. MMWR Recomm Rep. 2013;62(28):574-576.' },
    ],
};
// -------------------------------------------------------------------
// SAH (Subarachnoid Hemorrhage)
// -------------------------------------------------------------------
const SAH_SUMMARY = {
    id: 'sah-summary',
    title: 'SAH Steps Summary',
    subtitle: 'Subarachnoid Hemorrhage — Quick Reference',
    sections: [
        {
            heading: 'Recognition',
            body: '• [Identify thunderclap headache and risk factors](#/node/sah-presentation)\n• [Apply Ottawa SAH Rule — screen for low-risk patients](#/node/sah-ottawa)',
        },
        {
            heading: 'Diagnostic Workup',
            body: '• [Obtain noncontrast CT head — sensitivity is time-dependent](#/node/sah-ct)\n• [If CT negative ≤6h: may rule out SAH if criteria met](#/node/sah-early-neg)\n• [If CT negative >6h: proceed to lumbar puncture](#/node/sah-lp)\n• [Interpret LP — xanthochromia, RBC analysis](#/node/sah-lp-results)',
        },
        {
            heading: 'Severity Grading',
            body: '• [Confirm SAH — order CTA, consult neurosurgery](#/node/sah-confirmed)\n• [Grade with Hunt & Hess and Modified Fisher scales](#/node/sah-grading)',
        },
        {
            heading: 'ED Management',
            body: '• [Initial care — bed rest, HOB 30°, NPO, cardiac monitoring](#/node/sah-initial-mgmt)\n• [BP control — target SBP <160 with titratable IV agents](#/node/sah-bp-control)\n• [Start nimodipine 60 mg PO q4h for vasospasm prevention](#/node/sah-vasospasm-prev)\n• [Seizure precautions — levetiracetam if needed, avoid phenytoin](#/node/sah-seizure-mgmt)\n• [Monitor for rebleeding — highest risk in first 6 hours](#/node/sah-rebleed-prev)\n• [Watch for cardiac complications — ECG changes, troponin, Takotsubo](#/node/sah-cardiac-comp)',
        },
        {
            heading: 'Disposition',
            body: '• [Definitive repair — coiling vs clipping within 72 hours](#/node/sah-definitive)\n• [Transfer to high-volume center or admit to neuro ICU](#/node/sah-dispo)',
        },
    ],
    citations: [
        { num: 1, text: 'Connolly ES Jr, et al. AHA/ASA Guidelines for management of aneurysmal subarachnoid hemorrhage. Stroke. 2012;43(6):1711-1737.' },
        { num: 2, text: 'Diringer MN, et al. NCS Critical care management after aSAH. Neurocrit Care. 2011;15(2):211-240.' },
    ],
};
const SAH_LP_GUIDE = {
    id: 'sah-lp-guide',
    title: 'LP Interpretation Guide',
    subtitle: 'CSF Analysis for Subarachnoid Hemorrhage',
    sections: [
        {
            heading: 'Technique',
            body: '• Patient in **lateral recumbent position** for accurate opening pressure\n• Measure **opening pressure** — elevated (>20 cm H₂O) in 60% of SAH patients\n• Collect **4 serial tubes** of CSF\n• Send last tube for cell count AND xanthochromia assessment\n• Traumatic tap rate: 10-15% of all LPs',
        },
        {
            heading: 'RBC Analysis',
            body: '• **Zero RBCs in final tube** = traumatic tap (not SAH)\n• **Persistent RBCs constant across tubes 1-4** (usually thousands) = likely SAH\n• **Partial clearing** (e.g., 3,000→400) = equivocal — may be traumatic tap OR SAH\n• **>10,000 RBCs in final tube** = 6× more likely to be SAH than <100 RBCs [1]\n• RBC count is time-dependent — may clear within 48 hours as CSF circulates\n• No absolute cutoff threshold exists; aneurysm rupture reported with only a few hundred cells',
        },
        {
            heading: 'Xanthochromia',
            body: '• Yellow color from hemoglobin breakdown (oxyhemoglobin → methemoglobin → bilirubin)\n• Bilirubin formation is **enzyme-dependent and only occurs in vivo** — highly suggestive of SAH\n• Takes **up to 12 hours** to develop; lasts at least 2 weeks\n• Only 20% have visual xanthochromia if tapped within 6 hours\n• **All patients tapped 12h–2 weeks** after SAH will have xanthochromia [2]\n\n**Visual detection method:**\n• Rapidly centrifuge the last tube of CSF\n• Compare against identical tube of water on a white background\n• Yellowish hue = positive\n• Sensitivity 93%, specificity 95%, NPV 99%',
        },
        {
            heading: 'False Positives for Xanthochromia',
            body: '• Elevated CSF protein (>150 mg/dL)\n• Hyperbilirubinemia (serum bilirubin >10-15 mg/dL)\n• Traumatic tap with delayed processing (in vitro hemolysis)\n• Prior SAH (up to 2-4 weeks)\n• Carotenoids, rifampin, melanoma',
        },
        {
            heading: 'Timing Considerations',
            body: '• **<12 hours from onset:** Xanthochromia may not yet be present — accept RBCs as positive finding\n• **12 hours to 2 weeks:** Both RBCs and xanthochromia should be present if SAH\n• **>2 weeks:** Xanthochromia may no longer be present\n• Finding **normal CSF at any time point** successfully excludes SAH\n• Some authors recommend waiting 12 hours for LP, but early LP with either RBCs or xanthochromia as positive is also acceptable',
        },
    ],
    citations: [
        { num: 1, text: 'Czuczman AD, et al. Interpreting red blood cells in lumbar puncture: distinguishing true subarachnoid hemorrhage from traumatic tap. Acad Emerg Med. 2013;20(3):247-256.' },
        { num: 2, text: 'Vermeulen M, et al. Xanthochromia after subarachnoid haemorrhage needs no revisitation. J Neurol Neurosurg Psychiatry. 1989;52(7):826-828.' },
    ],
};
const SAH_ECG_CHANGES = {
    id: 'sah-ecg-changes',
    title: 'ECG Changes in SAH',
    subtitle: 'Cardiac Manifestations of Subarachnoid Hemorrhage',
    sections: [
        {
            heading: 'Mechanism',
            body: '• **Catecholamine surge** from autonomic stimulation causes subendocardial ischemia\n• Neurocardiogenic mechanism — distinct from coronary thrombosis\n• Coronary angiography is typically normal despite ischemic ECG changes',
        },
        {
            heading: 'Common ECG Findings (50-100% of patients)',
            body: '• Nonspecific **ST-segment and T-wave changes** (most common)\n• **Prolonged QT interval**\n• Prolonged QRS complexes\n• **U waves**\n• ST elevations **mimicking acute MI**\n• Deep T-wave inversions ("cerebral T waves")\n• These changes are usually **benign and transient**',
        },
        {
            heading: 'Arrhythmias',
            body: '• Serious arrhythmias in **<5% of patients**\n• Associated with worse outcomes when present\n• Sinus bradycardia, atrial fibrillation, ventricular tachycardia reported\n• Continuous cardiac monitoring is essential',
        },
        {
            heading: 'Troponin',
            body: '• Elevated in **20-40%** of acute SAH cases\n• Indicates cardiopulmonary complications\n• Associated with worse outcomes\n• Does NOT necessarily indicate acute coronary syndrome',
        },
        {
            heading: 'Neurogenic Stunned Myocardium (Takotsubo)',
            body: '• Also called **stress-induced cardiomyopathy**\n• Acutely depressed ejection fraction (can be **as low as 20%**)\n• Left ventricular **apical akinesis or ballooning**\n• Occurs with **normal coronary arteries**\n• **Transient** — most patients recover function over several weeks\n• May present with pulmonary edema and symptoms mimicking ACS\n• Management: support cardiac dysfunction while focusing on primary neurologic insult',
        },
        {
            heading: 'Key Management Points',
            body: '• SAH is a **contraindication to thrombolytics and anticoagulants**\n• Treat suspected myocardial ischemia conventionally (except thrombolytics/anticoagulation)\n• Focus management on the primary neurologic insult\n• Cardiac dysfunction is usually transient and supportive care is sufficient',
        },
    ],
    citations: [
        { num: 1, text: 'Frontera JA, et al. Cardiac arrhythmias after subarachnoid hemorrhage: risk factors and impact on outcome. Cerebrovasc Dis. 2008;26(1):71-78.' },
        { num: 2, text: 'Naidech AM, et al. Cardiac troponin elevation, cardiovascular morbidity, and outcome after subarachnoid hemorrhage. Circulation. 2005;112(18):2851-2856.' },
    ],
};
// -------------------------------------------------------------------
// Syncope — Discharge Instructions
// -------------------------------------------------------------------
const SYNCOPE_DISCHARGE = {
    id: 'syncope-discharge',
    title: 'Discharge Instructions',
    subtitle: 'Patient Information \u2014 Syncope (Fainting)',
    shareable: true,
    sections: [
        {
            heading: 'What Happened',
            body: 'You were evaluated in the emergency department for syncope (fainting) \u2014 a temporary loss of consciousness caused by a brief drop in blood flow to the brain. Based on your evaluation, including your history, physical exam, and heart tracing (ECG), your fainting episode appears to be low risk.',
        },
        {
            heading: 'Return to the Emergency Department Immediately If',
            body: '\u2022 Fainting again, especially during exercise or while lying down\n\u2022 Chest pain or pressure\n\u2022 Rapid or irregular heartbeat (palpitations)\n\u2022 Shortness of breath\n\u2022 Sudden severe headache\n\u2022 Weakness, numbness, or difficulty speaking\n\u2022 Fainting without any warning signs beforehand',
        },
        {
            heading: 'What to Do at Home',
            body: '**Avoid known triggers:**\n\u2022 Prolonged standing in hot environments\n\u2022 Dehydration \u2014 drink plenty of fluids daily\n\u2022 Skipping meals\n\u2022 Sudden position changes \u2014 sit up slowly, pause before standing\n\n**If you feel faint (warning signs like lightheadedness, sweating, nausea):**\n\u2022 Sit or lie down immediately\n\u2022 Cross your legs and squeeze your thigh muscles\n\u2022 Grip your hands together tightly\n\u2022 These "counterpressure" maneuvers can prevent fainting\n\n**General health:**\n\u2022 Increase fluid and salt intake (unless your doctor has restricted salt)\n\u2022 Avoid alcohol and excessive caffeine\n\u2022 Take all medications as prescribed',
        },
        {
            heading: 'Follow-Up Care',
            body: '\u2022 See your primary care doctor within 1\u20132 weeks\n\u2022 Bring a list of all your medications to your appointment\n\u2022 If fainting happens again, try to note what you were doing, how you felt before, and how long it lasted\n\u2022 Your doctor may recommend additional heart monitoring or testing',
        },
        {
            heading: 'Driving',
            body: 'After a fainting episode, you should not drive until you have been evaluated by your doctor. Some states have specific laws about driving after syncope. Ask your doctor when it is safe to drive again, especially if you drive for work.',
        },
        {
            heading: 'Important Reminders',
            body: '\u2022 Most fainting episodes are not dangerous and do not indicate a serious heart problem\n\u2022 About 1 in 10 people who faint will faint again within 6 months\n\u2022 Avoiding triggers and staying hydrated are the best ways to prevent future episodes\n\u2022 If you have a history of heart disease, follow up with your cardiologist',
        },
    ],
    citations: [
        { num: 1, text: 'Shen WK, et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients with Syncope. J Am Coll Cardiol. 2017;70(5):e39-e110.' },
        { num: 2, text: 'Brignole M, et al. 2018 ESC Guidelines for the Diagnosis and Management of Syncope. Eur Heart J. 2018;39(21):1883-1948.' },
    ],
};
// -------------------------------------------------------------------
// Burns — Discharge Instructions
// -------------------------------------------------------------------
const BURNS_DISCHARGE = {
    id: 'burns-discharge',
    title: 'Discharge Instructions',
    subtitle: 'Patient Information \u2014 Burn Wound Care',
    shareable: true,
    sections: [
        {
            heading: 'What Happened',
            body: 'You were treated in the emergency department for a burn injury. Your burn has been cleaned, treated, and bandaged. Follow these instructions to help your burn heal properly and prevent infection.',
        },
        {
            heading: 'Return to the Emergency Department Immediately If',
            body: '\u2022 Increasing redness spreading away from the burn\n\u2022 Pus or foul-smelling drainage from the wound\n\u2022 Fever (temperature above 100.4\u00B0F / 38\u00B0C)\n\u2022 Increasing pain not controlled by your medication\n\u2022 Numbness or tingling near the burn\n\u2022 Burns on the face, hands, feet, or genitals that worsen',
        },
        {
            heading: 'Wound Care at Home',
            body: '**Daily dressing changes:**\n\u2022 Wash your hands before and after touching the wound\n\u2022 Gently remove the old dressing\n\u2022 Clean the wound with mild soap and water\n\u2022 Pat dry with a clean towel\n\u2022 Apply prescribed ointment and a fresh sterile non-stick dressing\n\u2022 Secure with medical tape or wrap\n\n**Pain management:**\n\u2022 Take pain medication 30 minutes before dressing changes\n\u2022 Cool water (not ice) can help with pain\n\u2022 Keep the burned area elevated when possible',
        },
        {
            heading: 'Healing & Activity',
            body: '\u2022 Partial-thickness (second-degree) burns typically heal in 1\u20133 weeks\n\u2022 Do NOT pop blisters \u2014 they protect healing skin\n\u2022 Do NOT pick at peeling or healing skin\n\u2022 Minimize friction on the healing area\n\u2022 Protect healed skin from sun exposure for at least 1 year (use SPF 30+)',
        },
        {
            heading: 'Follow-Up Care',
            body: '\u2022 Return to your doctor or burn clinic in 3\u20135 days for a wound check\n\u2022 Return sooner if you notice any signs of infection\n\u2022 If your burn is not healing after 2 weeks, you may need a referral to a burn specialist\n\u2022 Once healed, ask about scar prevention options',
        },
    ],
    citations: [
        { num: 1, text: 'American Burn Association. Practice guidelines for burn care. J Burn Care Res. 2016.' },
    ],
};
// -------------------------------------------------------------------
// Chest Tube — Discharge Instructions
// -------------------------------------------------------------------
const CHEST_TUBE_DISCHARGE = {
    id: 'chest-tube-discharge',
    title: 'Discharge Instructions',
    subtitle: 'Patient Information \u2014 After Chest Tube Removal',
    shareable: true,
    sections: [
        {
            heading: 'What Happened',
            body: 'You had a chest tube placed to treat a collapsed lung (pneumothorax) or fluid around your lung. The tube has been removed and your lung is re-expanded on x-ray.',
        },
        {
            heading: 'Return to the Emergency Department Immediately If',
            body: '\u2022 Sudden chest pain or worsening shortness of breath\n\u2022 Difficulty breathing or feeling like you cannot get enough air\n\u2022 Rapid heartbeat\n\u2022 Dizziness or lightheadedness\n\u2022 Fever (temperature above 100.4\u00B0F / 38\u00B0C)\n\u2022 Redness, swelling, or drainage from the tube site',
        },
        {
            heading: 'Wound Care',
            body: '\u2022 Keep the dressing clean and dry for 48 hours\n\u2022 After 48 hours, remove the dressing and gently clean with soap and water\n\u2022 Apply a clean bandage until the site is fully healed\n\u2022 Do not submerge in water (no baths, pools, or hot tubs) until healed',
        },
        {
            heading: 'Activity Restrictions',
            body: '\u2022 **No heavy lifting or straining** for 1\u20132 weeks\n\u2022 **No air travel** until cleared by your doctor (minimum 2 weeks)\n\u2022 **No scuba diving** until cleared by a lung specialist\n\u2022 Gradually return to normal activities as tolerated\n\u2022 Avoid contact sports until cleared by your doctor',
        },
        {
            heading: 'Follow-Up Care',
            body: '\u2022 Follow-up chest x-ray in 2\u20134 weeks to confirm your lung remains fully expanded\n\u2022 See a lung specialist (pulmonologist) if your doctor recommends it\n\u2022 **If you smoke:** This is the most important time to quit \u2014 smoking greatly increases the risk of another collapsed lung',
        },
        {
            heading: 'Important Reminders',
            body: '\u2022 A collapsed lung can happen again \u2014 about 30% chance within the first year\n\u2022 Seek immediate care if you develop sudden chest pain or shortness of breath in the future\n\u2022 Tall, thin individuals and smokers are at higher risk for recurrence',
        },
    ],
    citations: [
        { num: 1, text: 'MacDuff A, et al. Management of Spontaneous Pneumothorax: British Thoracic Society Pleural Disease Guideline. Thorax. 2010;65(Suppl 2):ii18-ii31.' },
    ],
};
// -------------------------------------------------------------------
// Distal Radius — Discharge Instructions
// -------------------------------------------------------------------
const DISTAL_RADIUS_DISCHARGE = {
    id: 'distal-radius-discharge',
    title: 'Discharge Instructions',
    subtitle: 'Patient Information \u2014 Wrist Fracture',
    shareable: true,
    sections: [
        {
            heading: 'What Happened',
            body: 'You were treated in the emergency department for a broken wrist (distal radius fracture). Your wrist has been set and placed in a splint or cast to hold the bones in the correct position while they heal.',
        },
        {
            heading: 'Return to the Emergency Department Immediately If',
            body: '**These could be signs of a serious complication (compartment syndrome):**\n\u2022 Increasing pain that is not relieved by elevation and medication\n\u2022 Numbness, tingling, or loss of feeling in your fingers\n\u2022 Inability to move your fingers\n\u2022 Fingers turning blue, white, or cold\n\u2022 The cast or splint feels too tight',
        },
        {
            heading: 'What to Do at Home',
            body: '**First 48 hours are most important:**\n\u2022 **Elevate** \u2014 keep your hand above the level of your heart as much as possible\n\u2022 **Ice** \u2014 apply ice over the cast padding for 20 minutes on, 20 minutes off\n\u2022 **Finger exercises** \u2014 wiggle and bend your fingers frequently to prevent stiffness\n\u2022 **Check circulation** \u2014 make sure your fingers stay pink, warm, and have normal feeling\n\n**Cast/splint care:**\n\u2022 Keep the cast or splint dry\n\u2022 Do not stick anything inside the cast to scratch\n\u2022 Do not remove or modify the splint yourself',
        },
        {
            heading: 'Follow-Up Care',
            body: '\u2022 **See an orthopedic doctor (bone specialist) in 5\u20137 days** for repeat x-rays\n\u2022 X-rays in the first 2 weeks are important to make sure the bones stay aligned\n\u2022 Bring your discharge paperwork and x-ray images to the appointment\n\u2022 Cast duration is typically 4\u20136 weeks for adults, 3\u20134 weeks for children',
        },
        {
            heading: 'Important Reminders',
            body: '\u2022 Take pain medication as prescribed \u2014 staying ahead of pain helps recovery\n\u2022 Do not drive while in a cast or splint on your dominant hand\n\u2022 Avoid using the injured arm for lifting or carrying\n\u2022 Physical therapy may be recommended after the cast is removed',
        },
    ],
    citations: [
        { num: 1, text: 'Handoll HHG, et al. Interventions for treating distal radial fractures in adults. Cochrane Database Syst Rev. 2003.' },
    ],
};
// -------------------------------------------------------------------
// HIV — Discharge Instructions
// -------------------------------------------------------------------
const HIV_DISCHARGE_INFO = {
    id: 'hiv-ed-discharge',
    title: 'Discharge Instructions',
    subtitle: 'Patient Information \u2014 HIV Follow-Up Care',
    shareable: true,
    sections: [
        {
            heading: 'What Happened',
            body: 'You were evaluated in the emergency department. Your HIV-related concern has been addressed and you are being discharged home. It is very important that you continue your medications and follow up with your HIV care provider.',
        },
        {
            heading: 'Return to the Emergency Department Immediately If',
            body: '\u2022 Fever above 100.4\u00B0F (38\u00B0C) that does not go away\n\u2022 New confusion, severe headache, or vision changes\n\u2022 Difficulty breathing or worsening cough\n\u2022 Inability to keep food or medications down for more than 24 hours\n\u2022 New rash that is spreading or blistering\n\u2022 Severe abdominal pain or bloody diarrhea',
        },
        {
            heading: 'Medications',
            body: '**Do NOT stop your HIV medications unless your doctor tells you to.** Stopping medications can cause the virus to become harder to treat.\n\n\u2022 Take all medications exactly as prescribed\n\u2022 If you miss a dose, take it as soon as you remember (unless it is almost time for your next dose)\n\u2022 Tell your doctor about ALL other medications, vitamins, and supplements you take\n\u2022 If you are having side effects, talk to your HIV provider before making changes',
        },
        {
            heading: 'Follow-Up Care',
            body: '\u2022 See your HIV care provider within 1\u20132 weeks (or sooner if directed)\n\u2022 If you do not have an HIV provider, ask the ED staff for a referral\n\u2022 Keep all lab appointments \u2014 regular blood work monitors your treatment\n\u2022 If you were started on PEP, follow up in 3\u20137 days',
        },
        {
            heading: 'Important Reminders',
            body: '\u2022 Consistent medication use is the single most important thing you can do for your health\n\u2022 When HIV is well-controlled (undetectable viral load), you cannot transmit HIV to sexual partners\n\u2022 Stay up to date on vaccinations \u2014 ask your provider about flu, pneumonia, and hepatitis vaccines\n\u2022 Seek care promptly for any new symptoms \u2014 do not wait for your next scheduled appointment',
        },
    ],
    citations: [
        { num: 1, text: 'Panel on Antiretroviral Guidelines for Adults and Adolescents. Guidelines for the Use of Antiretroviral Agents in Adults and Adolescents with HIV. DHHS. 2024.' },
    ],
};
// -------------------------------------------------------------------
// Meningitis — Discharge Instructions (Viral)
// -------------------------------------------------------------------
const MENINGITIS_DISCHARGE_INFO = {
    id: 'meningitis-discharge',
    title: 'Discharge Instructions',
    subtitle: 'Patient Information \u2014 Viral Meningitis',
    shareable: true,
    sections: [
        {
            heading: 'What Happened',
            body: 'You were evaluated for meningitis (inflammation of the lining around the brain and spinal cord). Based on your test results, your meningitis appears to be caused by a virus. Viral meningitis is usually much less serious than bacterial meningitis and typically gets better on its own within 7\u201310 days.',
        },
        {
            heading: 'Return to the Emergency Department Immediately If',
            body: '\u2022 **Worsening headache** that is not relieved by medication\n\u2022 **Fever** above 101.3\u00B0F (38.5\u00B0C) or fever that returns after improving\n\u2022 **Confusion**, unusual behavior, or difficulty staying awake\n\u2022 **Seizures** or jerking movements\n\u2022 **Stiff neck** that is getting worse\n\u2022 **Vomiting** that prevents you from keeping down fluids or medications\n\u2022 **Rash** \u2014 especially one that does not fade when you press on it\n\u2022 **Sensitivity to light** that is worsening',
        },
        {
            heading: 'What to Do at Home',
            body: '\u2022 Rest in a quiet, dimly lit room\n\u2022 Drink plenty of fluids to stay hydrated\n\u2022 Take over-the-counter pain relievers (acetaminophen or ibuprofen) for headache and fever\n\u2022 You may feel fatigued for several weeks \u2014 this is normal\n\u2022 Viral meningitis can be mildly contagious \u2014 wash hands frequently and avoid close contact for the first few days',
        },
        {
            heading: 'Follow-Up Care',
            body: '\u2022 **See your primary care doctor within 3 days** for reassessment\n\u2022 If your spinal fluid test results are still pending, your doctor will contact you\n\u2022 If symptoms are not improving after 1 week, follow up sooner',
        },
        {
            heading: 'Important Reminders',
            body: '\u2022 Most people with viral meningitis recover completely\n\u2022 Recovery can take 1\u20132 weeks, sometimes longer for fatigue\n\u2022 If any warning signs develop, do not wait for your follow-up \u2014 go to the emergency department immediately',
        },
    ],
    citations: [
        { num: 1, text: 'Tunkel AR, et al. Practice Guidelines for the Management of Bacterial Meningitis. Clin Infect Dis. 2004;39(9):1267-1284.' },
    ],
};
// -------------------------------------------------------------------
// Syncope Evaluation — Steps Summary
// -------------------------------------------------------------------
const SYNCOPE_SUMMARY = {
    id: 'syncope-summary',
    title: 'Syncope Evaluation Steps Summary',
    subtitle: 'Systematic ED Approach to Transient Loss of Consciousness',
    sections: [
        {
            heading: 'Step 1: Exclude Life-Threatening Conditions',
            body: '• [Screen for persistent abnormal vital signs, neuro deficit, chest pain, abdominal pain, hemorrhage](#/node/sync-start)\n• Any positive finding → evaluate for specific life-threatening etiology\n• [Syncope is a diagnosis of exclusion when red flags present](#/node/sync-life-threat)',
        },
        {
            heading: 'Step 2: Seizure vs. Syncope',
            body: '• [Differentiate based on postictal state, tongue laceration, movement pattern, and prodrome](#/node/sync-true-syncope)\n• Myoclonic jerks are common in syncope — do not assume seizure\n• Serum lactate within 2 hours aids differentiation (LR+ 5.8)',
        },
        {
            heading: 'Step 3: ECG (Mandatory for All Patients)',
            body: '• [Obtain 12-lead ECG and place on telemetry](#/node/sync-ecg)\n• Review for conduction disease, ischemia, prolonged QTc, Brugada, HCM\n• 50% of arrhythmic causes detected within 2 hours (low-risk)',
        },
        {
            heading: 'Step 4: Focused History',
            body: '• [Assess triggers, prodrome, position, duration, cardiac history, medications, family history](#/node/sync-history)\n• History is the single most important tool\n• Classic vasovagal or situational → low risk',
        },
        {
            heading: 'Step 5: Classify Etiology',
            body: '• [Neurally mediated (reflex)](#/node/sync-vasovagal) — most common, benign prognosis\n• [Orthostatic hypotension](#/node/sync-orthostatic) — medication-related ~40%\n• [Cardiac syncope](#/node/sync-cardiac-suspect) — highest morbidity',
        },
        {
            heading: 'Step 6: Risk Stratify & Dispose',
            body: '• [Apply CSRS or SFSR for unexplained syncope](#/node/sync-risk-stratify)\n• [High risk → admit to monitored bed](#/node/sync-disposition-high)\n• [Intermediate → observation vs. outpatient with close follow-up](#/node/sync-disposition-intermediate)\n• [Low risk → discharge with reassurance](#/node/sync-disposition-low)',
        },
    ],
    citations: [
        { num: 1, text: 'Shen WK, et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients with Syncope. J Am Coll Cardiol. 2017;70(5):e39-e110.' },
        { num: 2, text: 'Brignole M, et al. 2018 ESC Guidelines for the Diagnosis and Management of Syncope. Eur Heart J. 2018;39(21):1883-1948.' },
    ],
};
// -------------------------------------------------------------------
// Syncope — Differential Diagnosis / Mimics
// -------------------------------------------------------------------
const SYNCOPE_DDX = {
    id: 'syncope-ddx',
    title: 'Syncope Differential Diagnosis',
    subtitle: 'Mimics, Life-Threatening Conditions & Classifications',
    sections: [
        {
            heading: 'Classifications of Syncope',
            body: '**Neurally Mediated (Reflex)**\n• Vasovagal — pain, emotions, blood, medical procedures\n• Situational — Valsalva, post-exercise, coughing, swallowing, defecation\n• Carotid sinus — head-turning, shaving (age >40)\n\n**Orthostatic Hypotension**\n• Drug-induced (most common cause)\n• Volume depletion\n• Autonomic failure (diabetes, Parkinson, MSA)\n\n**Cardiac**\n• Arrhythmia — bradycardia, tachycardia, channelopathies\n• Structural — aortic stenosis, HCM, PE, aortic dissection, tamponade',
        },
        {
            heading: 'Life-Threatening Conditions That Present with TLOC',
            body: '• **Subarachnoid hemorrhage** — thunderclap headache, neuro deficit\n• **Pulmonary embolism** — dyspnea, tachycardia, hypoxia, recent surgery/immobilization\n• **Aortic dissection** — tearing chest/back pain, BP differential between arms\n• **Ruptured AAA** — abdominal/back pain, pulsatile mass, hypotension\n• **Acute MI** — chest pain, ST changes, elevated troponin\n• **Tension pneumothorax** — unilateral absent breath sounds, hypotension\n• **Ectopic pregnancy** — abdominal pain, vaginal bleeding, positive βhCG\n• **GI hemorrhage** — melena, hematemesis, rectal bleeding\n• **Cardiac tamponade** — JVD, muffled heart sounds, hypotension\n• **High-grade AV block** — persistent bradycardia, syncope without warning',
        },
        {
            heading: 'Syncope Mimics (Non-Syncopal TLOC)',
            body: '• **Seizure** — postictal confusion >few seconds, tongue laceration, rhythmic jerks >20\n• **Psychogenic pseudosyncope** — prolonged duration, eyes closed, no injury, psychiatric history\n• **Hypoglycemia** — diabetic medications, altered mentation, rarely resolves spontaneously\n• **Posterior circulation TIA** — vertigo, diplopia, dysarthria, ataxia (rare cause of TLOC)\n• **Toxicologic** — overdose, poisoning (uncommonly resolves spontaneously)\n• **Metabolic** — severe electrolyte derangement, hypoxia',
        },
        {
            heading: 'Key Differentiating Features',
            body: '**Seizure vs. Syncope:**\n• Postictal disorientation >few seconds → seizure\n• Prodrome (lightheadedness, diaphoresis) → syncope\n• Tongue laceration → seizure\n• <10 jerks → syncope; >20 jerks → seizure [1]\n• Urinary incontinence → does NOT differentiate [2]\n• Serum lactate within 2h: elevated → seizure (LR+ 5.8) [3]\n\n**45% of unexplained syncope** patients may have past or current substance abuse history. [4]\nMen with psychiatric illness are more likely to have unexplained syncope. [5]',
        },
    ],
    citations: [
        { num: 1, text: 'Shmuely S, et al. Differentiating Motor Phenomena in Tilt-Induced Syncope and Convulsive Seizures. Neurology. 2018;90(15):e1339-e1346.' },
        { num: 2, text: 'Brigo F, et al. The Diagnostic Value of Urinary Incontinence in the Differential Diagnosis of Seizures. Seizure. 2013;22(2):85-90.' },
        { num: 3, text: 'Matz O, et al. Early Postictal Serum Lactate Concentrations Are Superior to CK in Distinguishing Generalized Tonic-Clonic Seizures from Syncopes. Intern Emerg Med. 2018;13(5):749-755.' },
        { num: 4, text: 'Wiener Z, et al. Substance Abuse in ED Patients with Unexplained Syncope. Intern Emerg Med. 2014;9(3):331-334.' },
        { num: 5, text: 'Wiener Z, et al. The Prevalence of Psychiatric Disease in ED Patients with Unexplained Syncope. Intern Emerg Med. 2013;8(5):427-430.' },
    ],
};
// -------------------------------------------------------------------
// Syncope — High-Risk ECG Findings
// -------------------------------------------------------------------
const SYNCOPE_ECG = {
    id: 'syncope-ecg',
    title: 'High-Risk ECG Findings in Syncope',
    subtitle: 'Brugada, HCM, Long QT, Pre-Excitation & Other Patterns',
    sections: [
        {
            heading: 'ECG Findings Associated with Serious Arrhythmias Within 30 Days',
            body: '• **Nonsinus rhythm** (atrial fibrillation, atrial flutter)\n• **Mobitz II or third-degree AV block**\n• **Bundle branch block** (especially new LBBB)\n• **QTc > 460 ms** (concerning); **> 500 ms** (high risk in elderly — predicts 30-day and 1-year mortality) [1]\n• **Pre-excitation** (delta wave, short PR = WPW)\n• **ST depression or T-wave inversions** (ischemia)\n• **Ventricular ectopy** (frequent PVCs, NSVT)\n\nAtrial fibrillation, IVCD, LVH, and ventricular pacing are **independent predictors of mortality**. [2]\n\nThe ECG is more likely to be diagnostic in patients **>40 years**. [3]',
        },
        {
            heading: 'Brugada Syndrome',
            body: '**Type 1 Brugada pattern** is the only diagnostic pattern — characterized by coved ST-segment elevation ≥2mm in V1-V3 followed by negative T wave. Types 2 and 3 (saddleback morphology) are suggestive but not diagnostic. [4]\n\nPatients with spontaneous type 1 Brugada morphology + syncope are at **high risk for ventricular fibrillation** and may need ICD evaluation. Family history is NOT an independent predictor for future arrhythmic events in the setting of a diagnostic type 1 Brugada pattern. [5]',
        },
        {
            heading: 'Hypertrophic Cardiomyopathy (HCM)',
            body: '**"Dagger" Q waves** — narrow, deep Q waves in leads I, aVL, and/or V4-V6 with associated LVH voltage criteria suggest HCM. [6]\n\nExertional syncope in a young patient with HCM features on ECG is a **high-risk presentation** requiring urgent echocardiography and cardiology evaluation.\n\nFamily history of sudden cardiac death in young relatives (including those classified as drowning or unexplained MVC) may indicate undiagnosed inheritable arrhythmogenic conditions.',
        },
        {
            heading: 'Long QT Syndrome',
            body: '**QTc > 460 ms** on multiple ECGs is concerning for inherited long QT syndrome, especially with family history of sudden cardiac death. [7]\n\nIn pediatric patients, syncope associated with a **loud noise** should prompt evaluation for long QT syndrome (LQTS type 2). [8]\n\n**QTc > 500 ms** in elderly patients predicts both 30-day and 1-year mortality. [1]\n\n25% of elderly patients may have QTc prolongation — age-related and medication-related causes are common.',
        },
        {
            heading: 'Other High-Risk Patterns',
            body: '• **Epsilon waves** — small positive deflections at the end of QRS in V1-V3, pathognomonic for arrhythmogenic right ventricular cardiomyopathy (ARVC)\n• **Early repolarization** — previously considered benign, but inferior or lateral early repolarization with horizontal/descending ST segment may be associated with increased risk\n• **Ventricular pacing** — may mask underlying conduction disease or ischemia\n• **Short QT interval** (QTc < 340 ms) — rare but associated with SCD risk',
        },
    ],
    citations: [
        { num: 1, text: 'White JL, et al. QTc Prolongation as a Marker of 30-Day Serious Outcomes in Older Patients with Syncope. Am J Emerg Med. 2019;37(4):685-689.' },
        { num: 2, text: 'Pérez-Rodon J, et al. Prognostic Value of the ECG in Patients with Syncope: Data from GESINUR. Heart Rhythm. 2014;11(11):2035-2044.' },
        { num: 3, text: 'Sun BC, et al. Low Diagnostic Yield of ECG Testing in Younger Patients with Syncope. Ann Emerg Med. 2008;51(3):240-246.' },
        { num: 4, text: 'Wu W, et al. Risk Factors for Cardiac Events in Patients with Brugada Syndrome: A PRISMA-Compliant Meta-Analysis. Medicine. 2016;95(30):e4214.' },
        { num: 5, text: 'Sarkozy A, et al. The Value of Family History of Sudden Death in Patients with Diagnostic Type I Brugada ECG Pattern. Eur Heart J. 2011;32(17):2153-2160.' },
        { num: 6, text: 'Gatzoulis KA, et al. Correlation of Noninvasive ECG with Invasive Electrophysiology in Syncope of Unknown Origin. Ann Noninvasive Electrocardiol. 2009;14(2):119-127.' },
        { num: 7, text: 'Okamura H, et al. Risk Stratification in Patients with Brugada Syndrome Without Previous Cardiac Arrest. Circ J. 2015;79(2):310-317.' },
        { num: 8, text: 'Sanatani S, et al. Canadian Cardiovascular Society Position Statement on the Approach to Syncope in the Pediatric Patient. Can J Cardiol. 2017;33(2):189-198.' },
    ],
};
// -------------------------------------------------------------------
// Syncope — Historical Features by Etiology
// -------------------------------------------------------------------
const SYNCOPE_HISTORY_FEATURES = {
    id: 'syncope-history-features',
    title: 'Historical Features Suggesting Etiology',
    subtitle: 'Pattern Recognition for Syncope Classification',
    sections: [
        {
            heading: 'Neurally Mediated (Reflex) Syncope',
            body: '• Triggered by pain, blood, emotional distress, medical procedures\n• Prolonged standing (especially in warm environments)\n• **Prodrome present:** nausea, sweating, warmth, lightheadedness, tunnel vision\n• Younger patient (< 40 years)\n• Recurrent episodes with similar triggers\n• Rapid return to baseline\n• Occurs during or after meals (postprandial)',
        },
        {
            heading: 'Situational Syncope',
            body: '• During or immediately after coughing, sneezing, laughing\n• During or after micturition (especially nocturnal)\n• During defecation or straining\n• During swallowing\n• Post-exercise (not during exertion)\n• After prolonged standing at attention (military, choir)',
        },
        {
            heading: 'Orthostatic Hypotension',
            body: '• Occurs on standing from sitting or lying position\n• After prolonged recumbency\n• Temporal relationship with starting or increasing antihypertensives, diuretics, vasodilators\n• History of autonomic neuropathy (diabetes, Parkinson disease)\n• Dehydration, hot weather, alcohol\n• Post-prandial in elderly',
        },
        {
            heading: 'Cardiac Syncope — Arrhythmic',
            body: '• **No prodrome** — abrupt onset, no warning\n• Syncope during exertion\n• Syncope while **supine or sitting** (rules out orthostatic)\n• **Palpitations** immediately preceding syncope\n• History of structural heart disease, prior arrhythmia\n• Family history of sudden cardiac death at young age\n• Family history of drowning, unexplained MVCs, or SIDS',
        },
        {
            heading: 'Cardiac Syncope — Structural',
            body: '• Syncope **during** exertion (HCM, aortic stenosis)\n• Known valvular disease or murmur\n• Recent surgery or immobilization (PE)\n• Dyspnea + chest pain + syncope (PE, aortic dissection)\n• History of heart failure\n• Audible murmur on exam',
        },
    ],
    citations: [
        { num: 1, text: 'Brignole M, et al. 2018 ESC Guidelines for the Diagnosis and Management of Syncope. Eur Heart J. 2018;39(21):1883-1948.' },
        { num: 2, text: 'Shen WK, et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients with Syncope. J Am Coll Cardiol. 2017;70(5):e39-e110.' },
    ],
};
// -------------------------------------------------------------------
// STEMI
// -------------------------------------------------------------------
const STEMI_SUMMARY = {
    id: 'stemi-summary',
    title: 'STEMI Management Steps',
    subtitle: 'Quick Reference — Recognition Through Disposition',
    sections: [
        {
            heading: 'Recognition & ECG',
            body: '• [Obtain ECG within 10 minutes of first medical contact](#/node/stemi-start)\n• [Identify ECG pattern — standard STEMI, posterior, LBBB, aVR](#/node/stemi-ecg-pattern)',
        },
        {
            heading: 'ECG Patterns',
            body: '• [Clear STEMI — activate cath lab immediately](#/node/stemi-confirmed)\n• [Posterior MI — obtain V7-V9 leads](#/node/stemi-posterior)\n• [LBBB/Paced — apply Sgarbossa criteria](#/node/stemi-lbbb)\n• [aVR elevation — assess hemodynamic stability](#/node/stemi-avr)\n• [Nondiagnostic — serial ECGs q15-30 min](#/node/stemi-serial)',
        },
        {
            heading: 'Initial Therapies',
            body: '• [Aspirin 162-325 mg chewed + P2Y12 loading](#/node/stemi-initial-tx)\n• [P2Y12 selection — prasugrel vs ticagrelor vs clopidogrel](#/node/stemi-p2y12)\n• [Anticoagulation — UFH or bivalirudin for PCI](#/node/stemi-anticoag)',
        },
        {
            heading: 'Reperfusion',
            body: '• [PCI available ≤90 min → primary PCI](#/node/stemi-pci)\n• [Transfer achievable ≤120 min → transfer for PCI](#/node/stemi-transfer)\n• [PCI not available → fibrinolytic therapy](#/node/stemi-lytics)\n• [Post-fibrinolysis — transfer for angiography 3-24h](#/node/stemi-post-lytics)',
        },
        {
            heading: 'Complications',
            body: '• [Cardiogenic shock — emergent PCI regardless of time](#/node/stemi-shock)\n• [RV involvement — right-sided leads, avoid nitrates](#/node/stemi-rv)\n• [Reperfusion arrhythmias — AIVR is benign](#/node/stemi-arrhythmia)\n• [Special populations — women, elderly, cocaine, post-arrest](#/node/stemi-special)',
        },
        {
            heading: 'Disposition',
            body: '• [All STEMI patients admitted ICU/CCU](#/node/stemi-dispo)',
        },
    ],
    citations: [],
};
const STEMI_VASCULAR_TERRITORIES = {
    id: 'stemi-vascular-territories',
    title: 'ECG Vascular Territories',
    subtitle: 'Lead Distribution by Coronary Artery',
    sections: [
        {
            heading: 'Anterior Wall — LAD',
            body: '**Leads:** V1, V2, V3, V4\n**Artery:** Left anterior descending (LAD)\n**Reciprocal changes:** ST depression in inferior leads (II, III, aVF)\n\nLargest territory. Anterior STEMI carries highest mortality risk.',
        },
        {
            heading: 'Inferior Wall — RCA (or LCx)',
            body: '**Leads:** II, III, aVF\n**Artery:** Right coronary artery (85%) or left circumflex (15%)\n**Reciprocal changes:** ST depression in aVL (most sensitive early sign), lead I\n\n33-50% involve the right ventricle — get right-sided leads (V4R). [1]',
        },
        {
            heading: 'Lateral Wall — LCx',
            body: '**Leads:** I, aVL (high lateral) and V5, V6 (low lateral)\n**Artery:** Left circumflex (LCx)\n**Reciprocal changes:** ST depression in inferior leads (III, aVF)',
        },
        {
            heading: 'Posterior Wall — LCx (or RCA)',
            body: '**Standard ECG clue:** ST depression in V1-V3 with upright T waves and prominent R wave\n**Posterior leads (V7-V9):** STE ≥0.5 mm diagnostic\n**Artery:** Left circumflex, occasionally RCA\n\nAccounts for ~3% of acute MIs. Frequently missed because posterior leads are not routinely obtained. [2]',
        },
        {
            heading: 'Left Main — LMCA',
            body: '**Pattern:** STE in aVR with diffuse ST depression in multiple leads\n**Note:** Only 10% have acute thrombotic occlusion — pattern also seen in triple vessel disease, diffuse subendocardial ischemia, and tachycardia. [3]\n\nHemodynamic instability strongly favors emergent catheterization.',
        },
        {
            heading: 'PAILS Mnemonic — Reciprocal Changes',
            body: '**P**osterior → **A**nterior (V1-V3 depression)\n**A**nterior → **I**nferior (II, III, aVF depression)\n**I**nferior → **L**ateral (I, aVL depression)\n**L**ateral → **I**nferior + **S**eptal (II, III, aVF + V1 depression)\n\nReciprocal changes help differentiate true STEMI from mimics (e.g., pericarditis has NO reciprocal changes). Presence indicates larger myocardial territory at risk. [4]',
        },
    ],
    citations: [
        { num: 1, text: 'Kinch JW, Ryan TJ. Right Ventricular Infarction. N Engl J Med. 1994;330(17):1211-1217.' },
        { num: 2, text: 'Wong C-K, White HD. Patients with Circumflex Occlusions Miss Out on Reperfusion. Curr Opin Cardiol. 2012;27(4):327-330.' },
        { num: 3, text: 'Harhash AA, et al. aVR ST Segment Elevation: Acute STEMI or Not? Am J Med. 2019;132(5):622-630.' },
        { num: 4, text: 'Kidambi A, et al. Reciprocal ECG Change in Reperfused STEMI Is Associated with Myocardial Salvage and Area at Risk. Heart. 2013;99(22):1658-1662.' },
    ],
};
const STEMI_PERICARDITIS_DIFF = {
    id: 'stemi-pericarditis-diff',
    title: 'Pericarditis vs STEMI',
    subtitle: 'ECG Differentiation',
    sections: [
        {
            body: 'Acute pericarditis can mimic STEMI with ST-segment elevation. Distinguishing features help avoid unnecessary cath lab activation. [1]',
        },
        {
            heading: 'Favors STEMI',
            body: '• **Regional** ST elevation following arterial distribution\n• **Convex (dome-shaped)** ST morphology\n• **Reciprocal ST depression** present\n• Hyperacute T waves\n• Q waves developing\n• Dynamic ECG changes over minutes to hours',
        },
        {
            heading: 'Favors Pericarditis',
            body: '• **Diffuse** ST elevation (not following arterial distribution)\n• **Concave (scooped)** ST morphology\n• **No reciprocal changes** (except aVR)\n• **PR depression** (highly specific, seen in >80% of pericarditis) [2]\n• ST elevation in II > III (suggestive but not reliable alone) [3]\n• Pain worse supine, improved sitting forward\n• Pericardial friction rub on exam',
        },
        {
            heading: 'ECG Evolution in Pericarditis',
            body: '**Phase I:** Diffuse STE + PR depression (>80% of cases)\n**Phase II:** ST and PR normalize\n**Phase III:** T-wave inversion\n**Phase IV:** T-wave normalization\n\nPhase I changes must be differentiated from AMI. [2]',
        },
        {
            heading: 'When in Doubt',
            body: 'If the clinical picture is ambiguous, consider bedside echocardiography to assess for wall motion abnormalities (93% sensitive for AMI) or pericardial effusion. Discuss with cardiology before cath lab activation.',
        },
    ],
    citations: [
        { num: 1, text: 'Lange RA, Hillis LD. Acute Pericarditis. N Engl J Med. 2004;351(21):2195-2202.' },
        { num: 2, text: 'Khandaker MH, et al. Pericardial Disease: Diagnosis and Management. Mayo Clin Proc. 2010;85(6):572-593.' },
        { num: 3, text: 'Henning D, et al. Evaluating the Utility of ST Elevation in Lead II > Lead III in Differentiating Pericardial Disease from STEMI. Scand J Trauma Resus Emerg Med. 2012;20(Suppl 2):P20.' },
    ],
};
const STEMI_LYTIC_CONTRAINDICATIONS = {
    id: 'stemi-lytic-contraindications',
    title: 'Fibrinolytic Contraindications',
    subtitle: 'Absolute and Relative — STEMI',
    sections: [
        {
            heading: 'Absolute Contraindications',
            body: '• Any prior intracranial hemorrhage\n• Known structural cerebrovascular lesion (AVM, aneurysm)\n• Known malignant intracranial neoplasm\n• Ischemic stroke within 3 months\n• Suspected aortic dissection\n• Active bleeding or bleeding diathesis (excluding menses)\n• Significant closed-head or facial trauma within 3 months\n• Intracranial or intraspinal surgery within 2 months\n• Severe uncontrolled hypertension (SBP >180 or DBP >110) unresponsive to therapy [1]',
        },
        {
            heading: 'Relative Contraindications',
            body: '• Chronic severe poorly controlled hypertension\n• Significant hypertension on presentation (SBP >180 or DBP >110)\n• Prior ischemic stroke >3 months ago\n• Dementia or known intracranial pathology not covered in absolute CI\n• Traumatic or prolonged CPR (>10 minutes)\n• Major surgery within 3 weeks\n• Recent internal bleeding (2-4 weeks)\n• Noncompressible vascular punctures\n• Pregnancy\n• Active peptic ulcer\n• Current use of anticoagulants (higher INR = higher bleeding risk) [1]',
        },
        {
            heading: 'If Absolute Contraindication Exists',
            body: 'Patient MUST be transferred for PCI regardless of anticipated time delay. Fibrinolysis cannot be given.\n\nIf relative contraindication exists, weigh bleeding risk against benefit of reperfusion. Consider PCI transfer as alternative.',
        },
    ],
    citations: [
        { num: 1, text: 'O\u2019Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction. Circulation. 2013;127(4):e362-e425.' },
    ],
};
const STEMI_LYTIC_AGENTS = {
    id: 'stemi-lytic-agents',
    title: 'Fibrinolytic Agents',
    subtitle: 'Dosing and Patency Rates — STEMI',
    sections: [
        {
            body: 'Fibrin-specific agents are preferred. All require concomitant anticoagulation for minimum 48 hours. [1]',
        },
        {
            heading: 'Dosing Regimens',
            body: '',
            drugTable: [
                {
                    drug: '[Tenecteplase](#/drug/tenecteplase/stemi) (PREFERRED)',
                    regimen: 'Single IV bolus over 5 sec:\n<60 kg: 30 mg | 60-69 kg: 35 mg | 70-79 kg: 40 mg | 80-89 kg: 45 mg | ≥90 kg: 50 mg\nAge >75y: consider HALF dose.\nPatency: 63% TIMI-3 flow.',
                },
                {
                    drug: '[Alteplase](#/drug/alteplase/stemi) (tPA)',
                    regimen: 'Accelerated 90-min regimen:\n15 mg IV bolus → 0.75 mg/kg (max 50 mg) over 30 min → 0.5 mg/kg (max 35 mg) over 60 min.\nTotal max: 100 mg.\nPatency: 54% TIMI-3 flow.',
                },
                {
                    drug: '[Reteplase](#/drug/reteplase/stemi)',
                    regimen: '10 units IV bolus over 2 min, then repeat 10 units IV bolus 30 min later.\nPatency: 60% TIMI-3 flow.',
                },
            ],
        },
        {
            heading: 'Key Points',
            body: '• Tenecteplase preferred for ease of single-bolus dosing\n• Fibrin-specific agents have significant mortality reduction vs streptokinase (GUSTO trial) [2]\n• Streptokinase is no longer available in the United States\n• Maximum benefit when given within 120 minutes of symptom onset\n• After fibrinolysis: transfer to PCI center for angiography within 3-24 hours (NOT within first 2-3 hours)',
        },
    ],
    citations: [
        { num: 1, text: 'O\u2019Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction. Circulation. 2013;127(4):e362-e425.' },
        { num: 2, text: 'GUSTO Investigators. An International Randomized Trial Comparing Four Thrombolytic Strategies for Acute MI. N Engl J Med. 1993;329(10):673-682.' },
    ],
};
const STEMI_REPERFUSION_PATHWAY = {
    id: 'stemi-reperfusion-pathway',
    title: 'Reperfusion Decision Pathway',
    subtitle: 'PCI vs Fibrinolysis — Time-Based Algorithm',
    sections: [
        {
            heading: 'Step 1: Confirm STEMI',
            body: 'ECG diagnosis of STEMI (or STEMI equivalent) + ischemic symptoms.\nActivate cath lab and start initial therapies simultaneously.',
        },
        {
            heading: 'Step 2: Assess PCI Availability',
            body: '**At PCI-capable hospital?**\n• YES → Primary PCI. Goal: FMC-to-device ≤90 min.\n• NO → Can transfer achieve FMC-to-device ≤120 min?\n  - YES → Transfer for PCI. DIDO ≤30 min.\n  - NO → Fibrinolytic therapy. Door-to-needle ≤30 min.',
        },
        {
            heading: 'Step 3: Time from Symptom Onset',
            body: '**<12 hours:** PCI or fibrinolysis indicated\n**12-24 hours:** PCI reasonable if ongoing ischemia or hemodynamic instability\n**>24 hours, stable, asymptomatic:** PCI NOT recommended (no benefit)\n\n**Exception:** Cardiogenic shock or severe HF → PCI regardless of time from onset [1]',
        },
        {
            heading: 'Step 4: After Fibrinolysis',
            body: '• Transfer to PCI-capable center\n• Angiography within 3-24 hours (pharmaco-invasive approach)\n• NOT within first 2-3 hours after fibrinolytic administration\n• Rescue PCI if fibrinolysis fails (persistent symptoms or STE) [1]',
        },
        {
            heading: 'Special Situations',
            body: '• **Cardiogenic shock:** Immediate PCI regardless of time delay or facility\n• **Absolute lytic CI:** Must transfer for PCI regardless of time\n• **Age >75y:** Half-dose tenecteplase if lytics indicated\n• **Cocaine-associated:** PCI strongly preferred (higher ICH risk with lytics)',
        },
    ],
    citations: [
        { num: 1, text: 'O\u2019Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction. Circulation. 2013;127(4):e362-e425.' },
    ],
};
const STEMI_RECIPROCAL = {
    id: 'stemi-reciprocal',
    title: 'PAILS Mnemonic',
    subtitle: 'Reciprocal Changes in STEMI',
    sections: [
        {
            body: 'Reciprocal changes are ST-segment depression that mirrors the ST-segment elevation. Their presence helps confirm STEMI and differentiate from mimics (pericarditis has NO reciprocal changes). [1]',
        },
        {
            heading: 'PAILS Mnemonic',
            body: '**P**osterior → look for reciprocal changes in **A**nterior leads (V1-V3)\n**A**nterior → look for reciprocal changes in **I**nferior leads (II, III, aVF)\n**I**nferior → look for reciprocal changes in **L**ateral leads (I, aVL)\n**L**ateral → look for reciprocal changes in **I**nferior + **S**eptal leads',
        },
        {
            heading: 'Clinical Significance',
            body: '• aVL is almost completely opposite lead III — reciprocal changes in aVL are the most sensitive early sign of inferior STEMI [2]\n• Reciprocal changes indicate a significantly larger myocardial territory at risk [3]\n• May identify patients with greater potential for salvage with revascularization\n• Early ST depression or T-wave inversion in aVL may appear before STE develops in inferior leads',
        },
    ],
    citations: [
        { num: 1, text: 'Birnbaum Y, et al. ST Segment Depression in aVL: A Sensitive Marker for Acute Inferior Myocardial Infarction. Eur Heart J. 1993;14(1):4-7.' },
        { num: 2, text: 'Hassen GW, et al. Lead aVL on ECG: Emerging as Important Lead in Early Diagnosis of MI. Am J Emerg Med. 2014;32(7):785-788.' },
        { num: 3, text: 'Kidambi A, et al. Reciprocal ECG Change in Reperfused STEMI. Heart. 2013;99(22):1658-1662.' },
    ],
};
const STEMI_MIMICS = {
    id: 'stemi-mimics',
    title: 'STEMI Mimics',
    subtitle: 'Differential Diagnosis of ST-Segment Elevation',
    sections: [
        {
            body: 'ST-segment elevation has many causes beyond acute coronary occlusion. Clinical context, ECG pattern, and serial ECGs help differentiate. [1]',
        },
        {
            heading: 'Benign / Non-Emergency',
            body: '• **Benign early repolarization** — concave STE, young healthy patients, stable\n• **Normal variant** — persistent juvenile pattern, athlete\'s heart\n• **Left ventricular hypertrophy** — strain pattern in lateral leads',
        },
        {
            heading: 'Potentially Life-Threatening',
            body: '• **Pericarditis** — diffuse concave STE, PR depression, no reciprocal changes\n• **Myocarditis** — focal or diffuse STE, may mimic STEMI closely\n• **Takotsubo (stress) cardiomyopathy** — anterior STE, apical ballooning on echo\n• **Aortic dissection** — may cause STEMI if dissection involves coronary ostium\n• **Pulmonary embolism** — right heart strain, STE in V1, S1Q3T3\n• **Hyperkalemia** — peaked T waves, widened QRS, pseudo-STEMI pattern',
        },
        {
            heading: 'Key Differentiating Features',
            body: '• **Reciprocal changes** strongly favor true STEMI (absent in pericarditis)\n• **Regional vs diffuse** STE — regional follows arterial distribution (STEMI)\n• **Convex vs concave** ST morphology — convex more concerning for STEMI\n• **Dynamic changes** on serial ECGs — evolving pattern favors STEMI\n• **Point-of-care echo** — RWMA in 93% of AMI (but also 43% of non-AMI) [2]\n• **Check serum potassium** if hyperkalemia suspected — rapid POC testing',
        },
    ],
    citations: [
        { num: 1, text: 'Thygesen K, et al. Fourth Universal Definition of Myocardial Infarction (2018). Eur Heart J. 2019;40(3):237-269.' },
        { num: 2, text: 'Sabia P, et al. Value of Regional Wall Motion Abnormality in the ER Diagnosis of Acute MI. Circulation. 1991;84(3 Suppl):I85-I92.' },
    ],
};
const STEMI_ANTICOAG_DETAIL = {
    id: 'stemi-anticoag-detail',
    title: 'Anticoagulation for STEMI',
    subtitle: 'PCI and Fibrinolysis Regimens',
    sections: [
        {
            heading: 'For Primary PCI',
            body: '',
            drugTable: [
                {
                    drug: '[UFH](#/drug/ufh/stemi) (standard)',
                    regimen: 'Without GP IIb/IIIa: 70-100 units/kg IV bolus\nWith GP IIb/IIIa: 50-70 units/kg IV bolus\nAdditional boluses PRN for therapeutic ACT',
                },
                {
                    drug: '[Bivalirudin](#/drug/bivalirudin/acs) (high bleed risk)',
                    regimen: '0.75 mg/kg IV bolus, then 1.75 mg/kg/hr infusion\nWith or without prior UFH',
                },
            ],
        },
        {
            heading: 'For Fibrinolytic Therapy (minimum 48 hours)',
            body: '',
            drugTable: [
                {
                    drug: '[UFH](#/drug/ufh/stemi)',
                    regimen: '60 units/kg bolus (max 4,000 units)\n12 units/kg/hr infusion (max 1,000 units/hr)\nTarget aPTT 1.5-2× control',
                },
                {
                    drug: '[Enoxaparin](#/drug/enoxaparin/stemi)',
                    regimen: 'Age <75: 30 mg IV bolus then 1 mg/kg SC q12h\nAge ≥75: No bolus, 0.75 mg/kg SC q12h\nCrCl <30: 1 mg/kg SC q24h',
                },
                {
                    drug: '[Fondaparinux](#/drug/fondaparinux/stemi)',
                    regimen: '2.5 mg IV with first fibrinolytic dose\nThen 2.5 mg SC daily\nAvoid if CrCl <30. Supplement UFH if PCI needed.',
                },
            ],
        },
    ],
    citations: [
        { num: 1, text: 'O\u2019Gara PT, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction. Circulation. 2013;127(4):e362-e425.' },
    ],
};
// -------------------------------------------------------------------
// Acid-Base Info Pages
// -------------------------------------------------------------------
const AB_SUMMARY = {
    id: 'ab-summary',
    title: 'Acid-Base Steps Summary',
    subtitle: 'Quick Reference — Traditional & Stewart Approaches',
    sections: [
        {
            heading: 'Initial Labs',
            body: '[Order labs and choose approach](#/node/ab-start)\n• ABG or VBG, BMP (Na, Cl, HCO3, BUN, Cr, Glucose)\n• Lactate, albumin, beta-hydroxybutyrate, serum osmolality',
        },
        {
            heading: 'Traditional Pathway',
            body: '[Assess pH](#/node/ab-trad-ph) — acidemia / alkalemia / normal\n[Determine pCO2](#/node/ab-acid-co2) — respiratory vs metabolic primary\n[Calculate Anion Gap](#/node/ab-met-acid) — AG = Na − (Cl + HCO3), correct for albumin\n[Apply Delta Gap](#/node/ab-delta) — detect mixed metabolic disorders\n[Winter\'s Formula](#/node/ab-winters) — check respiratory compensation\n[Treatment & Disposition](#/node/ab-treatment)',
        },
        {
            heading: 'Stewart Pathway',
            body: '[Assess pH & CO2](#/node/ab-stew-assess) — respiratory component\n[Calculate SID (Na − Cl)](#/node/ab-stew-sid) — strong ion difference\n[Evaluate Lactate](#/node/ab-stew-lactate) — lactate contribution\n[Calculate SIG](#/node/ab-stew-sig) — unmeasured anions\n[Check Osmolar Gap](#/node/ab-stew-osm) — if SIG elevated and source unclear\n[Treatment & Disposition](#/node/ab-treatment)',
        },
        {
            heading: 'Key Decision Points',
            body: '• **AG > 12** with normal pH → mixed AG acidosis + metabolic alkalosis\n• **Delta < 1** → concurrent non-AG acidosis\n• **Delta > 2** → concurrent metabolic alkalosis\n• **Actual pCO2 > Winter\'s** → concurrent respiratory acidosis\n• **SIG > 2** → unmeasured anions (ketones, uremia, toxins)\n• **Osm gap > 10** → consider toxic alcohol',
        },
    ],
    citations: [
        { num: 1, text: 'Hamm LL et al. Acid-base homeostasis. Clin J Am Soc Nephrol. 2015;10(12):2232-2242.' },
        { num: 2, text: 'Story DA. Stewart acid-base: a simplified bedside approach. Anesth Analg. 2016;123(2):511-515.' },
    ],
};
const AB_COMPENSATION = {
    id: 'ab-compensation',
    title: '6 Rules for Expected Compensation',
    subtitle: 'Predicted Responses to Primary Acid-Base Disturbances',
    sections: [
        {
            heading: 'Respiratory Acidosis',
            body: '**Rule 1 — Acute Respiratory Acidosis:**\nExpected HCO3 = 24 + 1 × (pCO2 − 40)/10\nHCO3 rises ~1 mEq/L for each 10 mmHg rise in pCO2\n[Calculate Rule 1](#/calculator/comp-rule-1)\n\n**Rule 2 — Chronic Respiratory Acidosis (> 3-5 days):**\nExpected HCO3 = 24 + 3.5 × (pCO2 − 40)/10\nHCO3 rises ~3.5 mEq/L for each 10 mmHg rise in pCO2\n[Calculate Rule 2](#/calculator/comp-rule-2)',
        },
        {
            heading: 'Respiratory Alkalosis',
            body: '**Rule 3 — Acute Respiratory Alkalosis:**\nExpected HCO3 = 24 − 2 × (40 − pCO2)/10\nHCO3 drops ~2 mEq/L for each 10 mmHg drop in pCO2\n[Calculate Rule 3](#/calculator/comp-rule-3)\n\n**Rule 4 — Chronic Respiratory Alkalosis (> 3-5 days):**\nExpected HCO3 = 24 − 5 × (40 − pCO2)/10\nHCO3 drops ~5 mEq/L for each 10 mmHg drop in pCO2\n[Calculate Rule 4](#/calculator/comp-rule-4)',
        },
        {
            heading: 'Metabolic Acidosis',
            body: "**Rule 5 — Winter's Formula:**\nExpected pCO2 = 1.5 × [HCO3] + 8 ± 2\n\nVentilatory compensation begins within minutes but takes up to 24 hours for maximal effect. A more robust response is observed in acidemia than in alkalemia.\n[Calculate Rule 5](#/calculator/comp-rule-5)",
        },
        {
            heading: 'Metabolic Alkalosis',
            body: '**Rule 6 — Metabolic Alkalosis:**\nExpected pCO2 = 40 + 0.7 × (HCO3 − 24)\npCO2 rises ~0.7 mmHg per 1 mEq/L increase in HCO3\nMaximum compensatory pCO2 is approximately 55 mmHg\n[Calculate Rule 6](#/calculator/comp-rule-6)',
        },
        {
            heading: 'Base Excess Compensation Rules',
            body: 'For base excess users, expected pCO2 changes can also be estimated: [9]\n\n**Metabolic disturbance:** Expected pCO2 ≈ 40 + Base Excess\n**Chronic respiratory disturbance:** Expected Δ BE ≈ 0.4 × (Chronic change in pCO2)\n\nIf measured values differ from expected → a mixed disturbance is present.',
        },
        {
            heading: 'Interpretation',
            body: 'If the observed compensation **matches** the expected range → **pure** disturbance.\nIf the observed compensation is **more** than expected → an additional process in the same direction.\nIf the observed compensation is **less** than expected → an opposing disturbance is also present.\n\nThese rules apply to simple, single disturbances. Complex patients often have multiple overlapping processes.',
        },
    ],
    citations: [
        { num: 1, text: 'Schwartz WB, Relman AS. A critique of the parameters used in the evaluation of acid-base disorders. NEJM. 1963;268:1382-1388.' },
        { num: 2, text: 'Hamm LL et al. Acid-base homeostasis. Clin J Am Soc Nephrol. 2015;10(12):2232-2242.' },
        { num: 3, text: 'Berend K. Diagnostic use of base excess in acid-base disorders. NEJM. 2018;378(15):1419-1428.' },
    ],
};
const AB_DIFFERENTIAL = {
    id: 'ab-differential',
    title: 'Acid-Base Differential Diagnosis',
    subtitle: 'Comprehensive Etiologies by Disturbance Type',
    sections: [
        {
            heading: 'Anion Gap Metabolic Acidosis (MUDPILES)',
            body: '• **M**ethanol\n• **U**remia (renal failure — phosphate, sulfate, hippurate)\n• **D**iabetic ketoacidosis (also SGLT2 inhibitor-induced euglycemic DKA)\n• **P**araldehyde / Phenformin\n• **I**ron / INH (isoniazid) — both also cause lactic acidosis\n• **L**actic acidosis (Type A: hypoperfusion; Type B: aerobic glycolysis)\n• **E**thylene glycol\n• **S**alicylates (also causes concurrent respiratory alkalosis)\n\n**Most HAGMA is ultimately attributable to lactate, ketone bodies, or renal acids.** [1]',
        },
        {
            heading: 'Non-Anion Gap (Hyperchloremic) Metabolic Acidosis',
            body: '**GI losses (negative urine AG):**\n• Diarrhea (most common)\n• Pancreatic/biliary fistula\n• Ureteroenterostomy\n\n**Renal (positive urine AG — RTA):**\n• Type I (Distal): urine pH > 5.5 — autoimmune, sickle cell, cirrhosis, idiopathic\n• Type II (Proximal): urine pH < 5.5 — myeloma, Wilson\'s, Vit D deficiency, heavy metals\n• Type IV (Hyperkalemic): urine pH < 5.5 — aldosterone deficiency, diabetes\n\n**Iatrogenic:**\n• Normal saline resuscitation (>2L in <24h)\n• Acetazolamide',
        },
        {
            heading: 'Metabolic Alkalosis',
            body: '**Chloride-responsive (UCl < 20):**\n• Vomiting / NG suction\n• Diuretic use (after effect)\n• Post-hypercapnia\n• Laxative abuse\n\n**Chloride-resistant (UCl > 20):**\n• Primary hyperaldosteronism\n• Cushing syndrome\n• Bartter / Gitelman syndrome\n• Severe hypokalemia\n• Licorice ingestion',
        },
        {
            heading: 'Respiratory Acidosis',
            body: '**Acute:** Airway obstruction, CNS depression (opioids, sedatives, stroke), neuromuscular disease (GBS, myasthenia), pneumothorax, massive PE, acute chest wall trauma\n\n**Chronic:** COPD, obesity hypoventilation, kyphoscoliosis, chronic neuromuscular disease',
        },
        {
            heading: 'Respiratory Alkalosis',
            body: '**Acute:** Anxiety, pain, PE, early sepsis, salicylates, pregnancy, hepatic failure\n\n**Chronic:** High altitude, chronic liver disease, pregnancy',
        },
        {
            heading: 'Narrow / Negative Anion Gap (Uncommon)',
            body: '• Hypoalbuminemia (most common — correct AG for albumin)\n• Bromide intoxication (displaces Cl in lab assays)\n• Multiple myeloma (paraproteins exist as cations)\n• Hypercalcemia, hypermagnesemia\n• Lithium intoxication\n• Free water excess (dilutional)',
        },
    ],
    citations: [
        { num: 1, text: 'Emmett M, Narins RG. Clinical use of the anion gap. Medicine. 1977;56(1):38-54.' },
        { num: 2, text: 'Hamm LL et al. Acid-base homeostasis. Clin J Am Soc Nephrol. 2015;10(12):2232-2242.' },
    ],
};
const AB_ABG_VBG = {
    id: 'ab-abg-vbg',
    title: 'ABG vs VBG Evidence',
    subtitle: 'When Is Venous Blood Gas Sufficient?',
    sections: [
        {
            heading: 'Key Studies',
            body: '**Gokel et al. (2000)** — 152 patients with uremia or DKA: mean pH difference between ABG and VBG was only up to 0.05. [1]\n\n**Malatesha et al. (2007)** — 95 heterogeneous ED patients: excellent agreement between arterial and venous pH, pCO2, and bicarbonate. [2]\n\n**McKeever et al. (2016)** — 234 patients with COPD: good agreement between arterial and venous pH and bicarbonate. In the absence of hypercapnia, differences in pH are negligible. [3]',
        },
        {
            heading: 'Clinical Recommendations',
            body: '**VBG is sufficient for most ED acid-base assessment:**\n• pH difference typically ≤ 0.03-0.05\n• HCO3 correlates well between arterial and venous samples\n• pCO2 correlates less well but adequate for screening\n\n**ABG is still useful when:**\n• Precise pCO2 is needed for ventilatory management decisions\n• A-a gradient is required to differentiate causes of hypoxemia\n• PaO2/FiO2 ratio needed for ARDS classification or lung injury assessment\n• Oxygenation index calculation for respiratory failure management\n\nDKA guidelines (ADA) recommend VBG for serial monitoring after initial ABG.',
        },
        {
            heading: 'Cost-Effective Strategy',
            body: 'A VBG with pulse oximetry can replace ABG in most clinical scenarios. This avoids arterial puncture discomfort and complications while providing adequate acid-base data.\n\nConsider end-tidal capnography for rapid noninvasive estimation of pCO2 when significant pulmonary disease is absent.',
        },
    ],
    citations: [
        { num: 1, text: 'Gokel Y et al. Comparison of blood gas and acid-base measurements in arterial and venous blood samples in patients with uremic acidosis and diabetic ketoacidosis. Am J Nephrol. 2000;20(4):319-323.' },
        { num: 2, text: 'Malatesha G et al. Comparison of arterial and venous pH, bicarbonate, PCO2 and PO2 in initial emergency department assessment. Emerg Med J. 2007;24(8):569-571.' },
        { num: 3, text: 'McKeever TM et al. Using venous blood gas analysis in the assessment of COPD exacerbations. Thorax. 2016;71(3):210-215.' },
    ],
};
const AB_LACTATE_KETONES = {
    id: 'ab-lactate-ketones',
    title: 'Lactate & Ketone Pathophysiology',
    subtitle: 'Mechanisms of Lactic Acidosis and Ketoacidosis',
    sections: [
        {
            heading: 'Lactate Metabolism',
            body: 'Lactate serves as a fuel for cellular metabolism, including brain and myocardium. It is the conjugate base of lactic acid. Accumulation does not necessarily result in acidosis as long as buffer systems compensate. Mortality is associated with lactic acidosis (buffer failure), not simple hyperlactatemia. [1]\n\nThe liver clears ~70% of lactate via the Cori cycle (gluconeogenesis). The kidneys clear the remainder via gluconeogenesis and urinary excretion.',
        },
        {
            heading: 'Type A Lactic Acidosis — Tissue Hypoxia',
            body: 'Poor perfusion and acute tissue hypoxia drive anaerobic glycolysis.\n\n**Causes:** Septic shock, cardiogenic shock, hemorrhagic shock, mesenteric ischemia, seizures, cardiac arrest, severe hypoxemia.\n\n44% of ICU patients with acidosis have a lactic acidosis — this subgroup has the highest mortality (56%). [1]',
        },
        {
            heading: 'Type B Lactic Acidosis — Aerobic Glycolysis',
            body: 'Lactate generated WITHOUT overt hypoperfusion or hypoxia.\n\n**Mechanisms:**\n• Hyperadrenergic states (sepsis hyperdynamic phase, pheochromocytoma) — beta-2 receptor activation increases glycolysis, overwhelms TCA cycle\n• Exogenous epinephrine/vasopressors — same mechanism\n• Metformin — reduces hepatic gluconeogenesis, impairs lactate clearance\n• Hepatic failure — reduced Cori cycle capacity\n• Malignancy (Warburg effect)\n• Thiamine deficiency — impaired pyruvate dehydrogenase\n\n**D-lactic acidosis:** Seen in short-gut syndrome/jejunoileal bypass. Colonic bacteria metabolize carbohydrates to D-lactate, which standard L-lactate assays do NOT measure. Presents as AG acidosis with normal serum lactate.',
        },
        {
            heading: 'Ketone Metabolism',
            body: 'Ketone bodies (acetoacetate, beta-hydroxybutyrate, acetone) are produced via beta-oxidation of fatty acids in the liver when carbohydrates are scarce.\n\nIn healthy fed states, ketone levels rarely exceed 0.1-2 mmol/L. Fasting raises levels ~20× normal. Ketoacidosis occurs when levels exceed ~70× normal, overwhelming buffer capacity.\n\nKetosis (elevated ketones) ≠ ketoacidosis (ketones + acidemia).',
        },
        {
            heading: 'Diabetic Ketoacidosis (DKA)',
            body: 'Severe acidemia in DKA is NOT solely from ketone bodies. Concomitant hypovolemia, renal failure, and lactic acidosis compound the acidemia. [2]\n\nNet bicarbonate loss occurs via both buffering AND renal excretion of ketone body salts (sodium/potassium ketonuria). This indirect bicarbonate loss may not be reflected in the AG and often becomes apparent only after volume re-expansion with saline.\n\n**Euglycemic DKA:** Can occur with SGLT2 inhibitors — severe ketoacidosis with near-normal glucose. Maintain high suspicion in patients on empagliflozin, dapagliflozin, canagliflozin.\n\n**Pitfall:** Check K+ before starting insulin — patients with K+ < 3.3 should receive potassium supplementation FIRST.',
        },
        {
            heading: 'Alcoholic Ketoacidosis (AKA)',
            body: 'Complex but often rapidly reversible. Chronic alcohol consumers have depleted glycogen stores. Without adequate glycogenolysis, starvation and hormonal cascades → increased lipolysis → fatty acid oxidation → ketogenesis → acidemia.\n\nPatients may present with absent serum ethanol levels. Shares the parallel insults of profound hypovolemia and lactic acidosis seen in DKA.\n\n**Treatment:** Dextrose-containing IV fluids (D5NS or D5LR) + thiamine 100mg IV + volume repletion. Most patients improve rapidly (3-4 hours). Insulin is NOT indicated.',
        },
    ],
    citations: [
        { num: 1, text: 'Gunnerson KJ et al. Lactate versus non-lactate metabolic acidosis: a retrospective outcome evaluation of critically ill patients. Crit Care. 2006;10(1):R22.' },
        { num: 2, text: 'Kamel KS, Halperin ML. Acid-base problems in diabetic ketoacidosis. NEJM. 2015;372(6):546-554.' },
    ],
};
const AB_STEWART_EXPLAINED = {
    id: 'ab-stewart-explained',
    title: 'Stewart Approach Explained',
    subtitle: 'Strong Ion Difference, Weak Acids, and Quantitative Acid-Base Analysis',
    sections: [
        {
            heading: 'Core Concept',
            body: 'Peter Stewart (1978) argued that it is NOT the gain or loss of HCO3 or H+ that determines pH, but rather three independent variables that influence water dissociation: [1]\n\n1. **Dissolved CO2** (pCO2) — respiratory component\n2. **Strong Ion Difference (SID)** — the gap between strong cations and anions\n3. **Total Weak Acids (ATOT)** — primarily albumin and phosphate\n\nBicarbonate and H+ are DEPENDENT variables — their concentrations are consequences of changes in the independent variables, not causes.',
        },
        {
            heading: 'Strong Ion Difference (SID)',
            body: 'Strong ions dissociate completely in solution at physiologic pH.\n\n**SID = (Na + K + Ca + Mg) − (Cl + Lactate + other strong anions)**\n\nSimplified: **SID ≈ Na − Cl** (normal ~35 mEq/L)\n\nThe excess positive charge (SID) is balanced by buffer anions (primarily HCO3 and albumin). A decreased SID forces bicarbonate down → acidosis. An increased SID allows bicarbonate to rise → alkalosis.\n\n**The Gamblegram** — A visual tool (developed by James Gamble) showing paired columns of cations and anions. Strong anions (Cl, lactate) \"squeeze out\" bicarbonate to maintain electroneutrality.',
        },
        {
            heading: 'Weak Acids — Albumin',
            body: 'Albumin is the most important weak acid in plasma. It has an overall negative charge from histidine residue dissociation.\n\n**Albumin effect ≈ 2.5 × (4.2 − measured albumin g/dL)**\n\nFor every 1 g/dL decrease in albumin → base excess increases by 2.5 mEq/L (alkalosis).\n\nHypoalbuminemia is the most common weak acid change in critically ill and surgical patients. It causes a metabolic alkalosis that can mask a concurrent acidosis. This is why albumin-corrected AG is essential. [2]',
        },
        {
            heading: 'Story Simplified Method',
            body: 'The simplified Stewart approach combines routine plasma chemistry with acid-base analysis using simple arithmetic: [2]\n\n**Base Excess = (Na−Cl−35) + (1−Lactate) + 2.5×(4.2−Albumin) + Other Ions**\n\nRearranged to find unmeasured ions:\n**Other Ions (SIG) = BE − (Na−Cl−35) − (1−Lactate) − 2.5×(4.2−Albumin)**\n\nThis tells you quantitatively HOW MUCH each component contributes to the metabolic disturbance.',
        },
        {
            heading: 'Advantages Over Traditional Approach',
            body: '• **Identifies hyperchloremic component quantitatively** — traditional AG misses relative hyperchloremia in hyponatremic patients\n• **Better in hypoalbuminemia** — traditional AG is falsely normal; Stewart automatically accounts for albumin\n• **Predicts fluid therapy effects** — switching from NS (SID 0) to PlasmaLyte (SID 50) will widen Na-Cl and improve acidosis\n• **From a Stewart perspective:** sodium bicarbonate is chloride-free sodium that increases the SID\n• **Integrates with base excess** — routine blood gas machines already calculate BE via the Van Slyke equation',
        },
        {
            heading: 'Clinical Application Example',
            body: 'Patient with cirrhosis, sepsis, saline resuscitation:\nNa 133, Cl 110, Albumin 2.2 g/dL, Lactate 5, BE −11.5\n\n• Na-Cl effect = 133−110−35 = **−12** (acidosis from relative hyperchloremia)\n• Lactate effect = 1−5 = **−4** (lactic acidosis)\n• Albumin effect = 2.5×(4.2−2.2) = **+5** (alkalosis from hypoalbuminemia)\n• Other Ions = −11.5 − (−12) − (−4) − (+5) = **−0.5** (minimal unmeasured anions)\n\nThis tells us the acidosis is primarily from hyperchloremia (saline resuscitation) and lactic acidosis, partially offset by hypoalbuminemic alkalosis. Unmeasured anions are not significant. Switching to PlasmaLyte would improve the Na-Cl component.',
        },
    ],
    citations: [
        { num: 1, text: 'Stewart PA. Independent and dependent variables of acid-base control. Respir Physiol. 1978;33(1):9-26.' },
        { num: 2, text: 'Story DA. Stewart acid-base: a simplified bedside approach. Anesth Analg. 2016;123(2):511-515.' },
    ],
};
const AB_FLUIDS_GUIDE = {
    id: 'ab-fluids-guide',
    title: 'Fluid Selection Guide',
    subtitle: 'Normal Saline vs Balanced Crystalloids — Acid-Base Implications',
    sections: [
        {
            heading: 'Fluid Compositions',
            body: '**Normal Saline (0.9% NaCl):**\nNa 154, Cl 154 mEq/L | SID = 0 | pH 5.5 | 308 mOsm/L\n\n**Lactated Ringer\'s (Hartmann\'s):**\nNa 130, Cl 109, K 4, Ca 3, Lactate 28 mEq/L | Effective SID ≈ 28 | pH 6.5 | 273 mOsm/L\n\n**PlasmaLyte (Plasma-Lyte A):**\nNa 140, Cl 98, K 5, Mg 3, Acetate 27, Gluconate 23 mEq/L | SID ≈ 50 | pH 7.4 | 294 mOsm/L\n\nPlasma: Na ~140, Cl ~105 | SID ≈ 35-42 | pH 7.40 | ~290 mOsm/L',
        },
        {
            heading: 'How NS Causes Acidosis',
            body: 'Normal saline has equal concentrations of Na and Cl (154 mEq/L each) — a SID of 0. The disproportionately greater rise in plasma chloride vs sodium narrows the strong ion difference, \"squeezing out\" bicarbonate and causing a hyperchloremic metabolic acidosis.\n\nThis also impairs renal perfusion and alters bicarbonate resorption from the kidneys, potentially contributing to acute kidney injury.',
        },
        {
            heading: 'Evidence',
            body: '**SMART Trial (Semler et al., NEJM 2018)** [1] — 15,802 critically ill ICU patients. Balanced crystalloids reduced the composite of death, new renal replacement therapy, or persistent renal dysfunction (MAKE-30) compared to NS: 14.3% vs 15.4% (p = 0.04).\n\n**Self et al. (NEJM 2018)** [2] — 13,347 non-critically ill patients. Benefits of balanced crystalloids were less robust in non-critically ill patients.\n\n**Cochrane Review (Bampoe et al., 2017)** — Perioperative patients receiving < 2L of NS for trauma, burns, sepsis, or surgery are unlikely to suffer lasting consequences.\n\nThe clinical significance of saline-induced acidosis remains debated and is an area of active research.',
        },
        {
            heading: 'Clinical Recommendations',
            body: '**Prefer balanced crystalloids (LR or PlasmaLyte) when:**\n• Large-volume resuscitation anticipated (> 2L)\n• Critically ill / ICU patients\n• Known metabolic acidosis (avoid worsening with NS)\n• Liver disease (already acidotic, low albumin)\n\n**Prefer NS when:**\n• Hyperkalemia (LR contains 4 mEq/L K+)\n• Traumatic brain injury / neurocritical care (LR is hypotonic — 273 mOsm/L — may worsen cerebral edema)\n• Mixing with blood products (Ca in LR can cause clotting in the tubing)\n\n**Avoid expensive resuscitation fluids** — gelatin, starch colloids, and albumin products should not routinely replace inexpensive crystalloids.',
        },
    ],
    citations: [
        { num: 1, text: 'Semler MW et al. Balanced crystalloids versus saline in critically ill adults (SMART). NEJM. 2018;378(9):829-839.' },
        { num: 2, text: 'Self WH et al. Balanced crystalloids versus saline in noncritically ill adults. NEJM. 2018;378(9):819-828.' },
    ],
};
// -------------------------------------------------------------------
// Delirium
// -------------------------------------------------------------------
const DELIRIUM_SUMMARY = {
    id: 'delirium-summary',
    title: 'Delirium Steps Summary',
    subtitle: 'Quick Reference — ED Delirium Management',
    sections: [
        {
            heading: 'Initial Assessment',
            body: '• [Ensure scene safety — team preparation, security if needed](#/node/del-safety)\n• [Fingerstick glucose, SpO2, temperature — correct immediately](#/node/del-rapid-reversible)\n• [RASS score — determine delirium subtype (hypoactive vs hyperactive)](#/node/del-screening)\n• [CAM screening — acute onset + inattention + altered consciousness OR disorganized thinking](#/node/del-screening)',
        },
        {
            heading: 'Etiology Search',
            body: '• [Infection: UTI, pneumonia, skin/soft tissue, bacteremia](#/node/del-infection)\n• [Metabolic: Na, Ca, glucose, hepatic/renal, thyroid](#/node/del-metabolic)\n• [Intracranial: stroke, SDH, SAH, meningitis, seizure/NCSE](#/node/del-intracranial)\n• [Toxic/Medication: anticholinergics, BZDs, opioids, withdrawal](#/node/del-toxic)\n• [Directed workup: BMP, CBC, UA, VBG, ECG (QTc baseline)](#/node/del-workup)',
        },
        {
            heading: 'Nonpharmacological First',
            body: '• [Verbal de-escalation — 10 elements (AAEP Project BETA)](#/node/del-nonpharm)\n• [Environmental modification — reduce stimuli, reorient, glasses/hearing aids](#/node/del-nonpharm)\n• [TADA: Tolerate, Anticipate, Don\'t Agitate](#/node/del-nonpharm)\n• [Physical restraints — last resort, proper technique, continuous monitoring](#/node/del-restraints)',
        },
        {
            heading: 'Pharmacological Management',
            body: '• [Young adult: haloperidol 5-10 mg IM + midazolam, OR droperidol 5 mg, OR olanzapine 10 mg IM](#/node/del-young-adult)\n• [Elderly: half-dose antipsychotic, AVOID benzodiazepines](#/node/del-elderly)\n• [Parkinson\'s/Lewy Body: quetiapine 12.5-25 mg PO (lowest D2 affinity)](#/node/del-parkinsons)\n• [Intoxication/withdrawal: benzodiazepines preferred](#/node/del-intox-withdrawal)\n• [Excited delirium: cool, fluids, midazolam/ketamine, monitor for rhabdo](#/node/del-exds-mgmt)',
        },
        {
            heading: 'Monitoring & Disposition',
            body: '• [Post-sedation: continuous SpO2, ETCO2, telemetry if antipsychotic, RASS q15 min](#/node/del-monitoring)\n• [QTc monitoring after haloperidol/droperidol — stop if >500 ms or Δ>60 ms](#/node/del-monitoring)\n• [Admit: undifferentiated delirium, persistent AMS, elderly with infection](#/node/del-disposition)\n• [Discharge: clear reversible cause corrected, returned to baseline, safe follow-up](#/node/del-discharge)',
        },
    ],
    citations: [
        { num: 1, text: 'Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).' },
    ],
};
const DEL_PRECIPITANTS = {
    id: 'del-precipitants',
    title: 'Precipitating Factors for Delirium',
    subtitle: 'Critical, Emergent, and Iatrogenic Causes',
    sections: [
        {
            heading: 'Critical / Life-Threatening',
            body: '• Hypoxia / respiratory failure\n• Hypoglycemia\n• Hypertensive encephalopathy\n• Intracranial hemorrhage (SDH, SAH, ICH)\n• Meningitis / encephalitis\n• Status epilepticus / NCSE\n• Sepsis / septic shock\n• Myocardial infarction (delirium is ONLY symptom in up to 5% of elderly STEMI) [1]\n• Poisoning (carbon monoxide, cyanide, ethylene glycol)',
        },
        {
            heading: 'Emergent',
            body: '• **Infection** (16-67% of cases) — UTI and pneumonia most common [1]\n• Electrolyte disorders — hypo/hypernatremia, hypercalcemia, hypomagnesemia\n• Hepatic encephalopathy\n• Uremia / renal failure\n• Thyroid disorders (myxedema, thyroid storm)\n• Acute stroke (especially posterior circulation)\n• Pulmonary embolism\n• Dehydration / malnutrition\n• Acute urinary retention / fecal impaction\n• Uncontrolled pain',
        },
        {
            heading: 'Medication-Related (Beers Criteria)',
            body: '**High-risk medications for delirium in elderly:** [1]\n\n• **Anticholinergics** — diphenhydramine, promethazine, scopolamine, oxybutynin, tricyclic antidepressants\n• **Benzodiazepines** — independent risk factor for delirium\n• **Opioids** — especially meperidine (highest delirium risk of all opioids)\n• **Sedative-hypnotics** — zolpidem, eszopiclone\n• **H2-receptor antagonists** — ranitidine, famotidine\n• **Corticosteroids** — especially high-dose pulse therapy\n• **Thioridazine / chlorpromazine** — first-gen antipsychotics with high anticholinergic load\n• **Fluoroquinolones** — CNS effects underrecognized\n\n**ED recommendation:** Avoid meperidine. If opioids necessary, use oxycodone. For other classes, weigh risks vs benefits using clinical judgment. [1]',
        },
        {
            heading: 'Intoxication / Withdrawal',
            body: '• **Alcohol withdrawal** — tremor → hallucinations → seizures → delirium tremens\n• **Benzodiazepine withdrawal** — similar progression to alcohol\n• **Sympathomimetic intoxication** — cocaine, methamphetamine, synthetic cathinones\n• **Anticholinergic toxidrome** — diphenhydramine, jimsonweed, TCA overdose\n• **Serotonin syndrome** — SSRIs + MAOIs, tramadol, linezolid\n• **Opioid intoxication** — decreased consciousness, not typically "delirious"',
        },
        {
            heading: 'Iatrogenic (Hospital/ED-Acquired)',
            body: '• Physical restraints\n• Bladder catheterization\n• Addition of ≥3 new medications\n• Sleep disruption\n• Malnutrition / NPO status\n• Immobilization\n• Sensory deprivation (missing glasses/hearing aids)\n\nOften multiple precipitants coexist. In 13% of cases, no precipitating factor is identified. [1]',
        },
    ],
    citations: [
        { num: 1, text: 'Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).' },
    ],
};
const DEL_VULNERABILITY = {
    id: 'del-vulnerability',
    title: 'Vulnerability Factors for Delirium',
    subtitle: 'Patient Risk Factors That Lower the Delirium Threshold',
    sections: [
        {
            heading: 'Major Risk Factors (ACEP Geriatric ED Guidelines)',
            body: '**Presence of 1-2 factors** increases delirium risk by **2.5×**\n**Presence of 3-4 factors** increases delirium risk by **>9×** [1]\n\n1. **Vision or hearing impairment**\n2. **Decreased cognitive ability** (baseline dementia)\n3. **Severe illness** (high APACHE score)\n4. **Dehydration** (elevated BUN:Cr ratio)',
        },
        {
            heading: 'Patient Factors',
            body: '• Age ≥65 years\n• **Pre-existing cognitive impairment / dementia** — strongest association with delirium. Two-thirds of geriatric delirium patients have underlying dementia. [1]\n• Visual or hearing impairment\n• Multiple comorbidities\n• Male sex\n• History of prior delirium episodes\n• Functional impairment (Katz ADL Score ≤4)\n• Malnutrition / poor nutritional status\n• Depression',
        },
        {
            heading: 'Acute Illness Factors',
            body: '• Severity of acute illness\n• Number of medications (polypharmacy ≥5)\n• Presence of infection\n• Dehydration (BUN:Cr >18)\n• Metabolic derangements\n• Surgery or anesthesia\n• Pain (undertreated)\n• Sleep deprivation',
        },
        {
            heading: 'The Vulnerability × Precipitant Model',
            body: '**Delirium results from the interaction** between vulnerability factors and precipitating factors. [1]\n\n• A **highly vulnerable** patient (elderly, demented, sensory-impaired) may develop delirium from a **minor precipitant** (UTI, single dose of diphenhydramine, Foley catheter)\n• A **low-vulnerability** patient (young, healthy) requires a **major precipitant** to develop delirium (severe sepsis, major intoxication, ICU stay)\n\nThis model explains why delirium is so common in the elderly and why seemingly minor events can trigger it in vulnerable patients.',
        },
    ],
    citations: [
        { num: 1, text: 'Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).' },
        { num: 2, text: 'American College of Emergency Physicians, et al. Geriatric Emergency Department Guidelines. Ann Emerg Med. 2014;63(5):e7-e25.' },
    ],
};
const DEL_VS_DEMENTIA = {
    id: 'del-vs-dementia',
    title: 'Delirium vs Dementia',
    subtitle: 'Key Differentiating Features',
    sections: [
        {
            heading: 'Comparison',
            body: '**Onset:**\n• Delirium: **Acute** (hours to days)\n• Dementia: **Insidious** (months to years)\n\n**Course:**\n• Delirium: **Fluctuating** — waxes and wanes throughout the day\n• Dementia: **Progressive** — gradual decline, relatively stable day-to-day\n\n**Attention:**\n• Delirium: **Impaired** — this is the HALLMARK feature\n• Dementia: **Preserved** until late stages\n\n**Level of Consciousness:**\n• Delirium: **Altered** — clouded, hyperalert, or obtunded\n• Dementia: **Usually clear** until late stages\n\n**Hallucinations:**\n• Delirium: **Common** — especially visual hallucinations\n• Dementia: **Less common** — except Lewy body dementia\n\n**Psychomotor Activity:**\n• Delirium: **Variable** — hyperactive, hypoactive, or mixed\n• Dementia: **Usually normal** until late stages\n\n**Duration:**\n• Delirium: **Hours to weeks** — usually reversible\n• Dementia: **Months to years** — irreversible\n\n**Reversibility:**\n• Delirium: **Usually reversible** with treatment of underlying cause\n• Dementia: **Irreversible** — progressive decline',
        },
        {
            heading: 'Critical Points',
            body: '• **Dementia is the single strongest risk factor FOR delirium** — they frequently coexist [1]\n• Without proper history, differentiating acute vs chronic cognitive change may be impossible\n• **Obtaining baseline mental status** from family, caregivers, or prior documentation is ESSENTIAL\n• **Lewy body dementia** is particularly challenging — fluctuating cognition and hallucinations are baseline features, mimicking delirium\n• When in doubt, **assume delirium** and search for a medical precipitant — delirium is treatable, and missing it carries significant mortality risk\n• **Document current cognitive findings** — this becomes the baseline for future clinicians',
        },
    ],
    citations: [
        { num: 1, text: 'Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).' },
        { num: 2, text: 'Inouye SK, Westendorp RGJ, Saczynski JS. Delirium in Elderly People. Lancet. 2014;383(9920):911-922.' },
    ],
};
const DEL_MEDS_TABLE = {
    id: 'del-meds-table',
    title: 'Medications for Acute Agitation',
    subtitle: 'Drug Comparison — Dosing, Onset, Route, and Side Effects',
    sections: [
        {
            heading: 'Typical Antipsychotics (Butyrophenones)',
            body: '**[Haloperidol](#/drug/haloperidol/agitation)** — 5-10 mg IM/IV (elderly: 0.5-2 mg)\n• Onset: 10-20 min IM, 3-5 min IV\n• Most studied ED agent. High D2 selectivity.\n• Side effects: QTc prolongation, EPS/dystonia, akathisia\n• Contraindicated: Parkinson\'s, Lewy body, QTc >500 ms\n\n**[Droperidol](#/drug/droperidol/agitation)** — 2.5-5 mg IM/IV\n• Onset: 3-10 min (faster than haloperidol)\n• More sedating. ~2-3× more potent than haloperidol.\n• FDA black box for QTc (2001) — but real-world risk appears very low [1]\n• May be preferred when rapid sedation is the goal',
        },
        {
            heading: 'Atypical Antipsychotics',
            body: '**[Olanzapine](#/drug/olanzapine/agitation)** — 10 mg IM (elderly: 2.5-5 mg)\n• Onset: 15-45 min IM\n• **No QTc prolongation. No dystonia.**\n• ⚠️ **DO NOT combine with parenteral BZDs** — fatal respiratory depression risk\n• Use when QTc is borderline/prolonged\n\n**[Quetiapine](#/drug/quetiapine/delirium)** — 25-100 mg PO\n• Onset: 30-60 min (PO only)\n• Lowest D2 affinity — **safest for Parkinson\'s / Lewy body**\n• Primarily sedating at low doses (H1 blockade)\n• Not useful for acute severe agitation\n\n**[Risperidone](#/drug/risperidone/delirium)** — 1-2 mg PO\n• Onset: 30-60 min (PO only)\n• Less sedating than quetiapine/olanzapine\n• Available as orally disintegrating tablet',
        },
        {
            heading: 'Benzodiazepines',
            body: '**[Midazolam](#/drug/midazolam/agitation)** — 2.5-5 mg IM\n• Onset: 5 min IM. Shortest acting BZD.\n• **Preferred for intoxication/withdrawal syndromes**\n• More rapid and adequate sedation than droperidol or haloperidol in one RCT [1]\n\n**[Lorazepam](#/drug/lorazepam/agitation)** — 1-2 mg IV\n• Onset: 2-3 min IV. Duration 10-20 hours.\n• **Preferred IV BZD for alcohol withdrawal**\n• Unpredictable IM absorption — IV preferred\n• Independent risk factor for delirium in elderly — AVOID',
        },
        {
            heading: 'Dissociative',
            body: '**[Ketamine](#/drug/ketamine/agitation)** — 4 mg/kg IM or 1-2 mg/kg IV\n• Onset: 5 min IM\n• **For refractory agitation** only — when antipsychotics and BZDs fail\n• Reliable, rapid sedation\n• Prepare for intubation (29% rate in one prehospital study)\n• Avoid in elderly, heart disease, schizophrenia',
        },
        {
            heading: 'Combination Therapy',
            body: '**Combination therapy is superior** to either class alone for rapid resolution of acute agitation. [1]\n\n• **Haloperidol + Lorazepam** — classic combination. More rapid symptom resolution than either agent alone.\n• **Haloperidol + Midazolam** — "B52" variant (+ diphenhydramine). Effective for undifferentiated severe agitation.\n• **Droperidol or Olanzapine + Midazolam** — adjunctive midazolam achieves more rapid sedation than midazolam alone.\n\n⚠️ **Do NOT combine olanzapine with parenteral BZDs** — use haloperidol instead if both classes needed.\n\nLow-dose combinations minimize side effects of both classes while maximizing efficacy.',
        },
        {
            heading: 'Key Principles',
            body: '• **"Start low and go slow"** — especially in elderly [1]\n• **Treat the underlying etiology first** — pharmacological treatment is for behavioral symptom management\n• **Wait ≥20 min** before redosing antipsychotics\n• **If 10 mg cumulative** of an agent is ineffective, reconsider diagnosis — try a different class\n• **QTc >500 ms?** Use olanzapine or BZDs (no QTc effect)\n• **Parkinson\'s/Lewy body?** Use quetiapine PO\n• **Intoxication/withdrawal?** Use BZDs\n• **Antipsychotics are NOT beneficial** for hypoactive delirium [2]',
        },
    ],
    citations: [
        { num: 1, text: 'Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).' },
        { num: 2, text: 'Girard TD, et al. Haloperidol and Ziprasidone for Treatment of Delirium in Critical Illness (MIND-USA). N Engl J Med. 2018;379(26):2506-2516.' },
        { num: 3, text: 'Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). 2024.' },
    ],
};
const DEL_DEESCALATION = {
    id: 'del-deescalation',
    title: 'Verbal De-escalation: 10 Elements',
    subtitle: 'AAEP Project BETA De-escalation Workgroup Guidelines',
    sections: [
        {
            heading: 'Overview',
            body: 'Verbal de-escalation is a **first-line intervention** for agitated patients. The American Association for Emergency Psychiatry (AAEP) recommends a 3-step approach: [1]\n\n1. **Verbally engage** the agitated patient\n2. **Establish a collaborative relationship** with the patient\n3. **Verbally de-escalate** the patient out of agitation\n\nA show of force (security presence) avoided sedation in **27%** of cases in one study. One-to-one observation had a **perceived efficacy of 48%** among surveyed EDs. [1]',
        },
        {
            heading: 'The 10 Elements',
            body: '**1. Respect the patient\'s personal space**\n   Maintain ≥2 arm lengths distance. Do not tower over the patient. Get at eye level if safe.\n\n**2. Do not be provocative**\n   Use a calm, even tone. Avoid authoritative posture or commands. Uncross arms. Hands visible.\n\n**3. Establish verbal contact**\n   One person speaks to the patient. Introduce yourself by name. Use the patient\'s name.\n\n**4. Be concise**\n   Use short, simple sentences. Avoid jargon. Repeat key messages if needed.\n\n**5. Identify the patient\'s wants and feelings**\n   "What brought you here today?" "What do you need right now?" Validate emotions.\n\n**6. Listen closely to what the patient is saying**\n   Active listening. Paraphrase to demonstrate understanding. Do not interrupt.\n\n**7. Agree or agree to disagree**\n   Find common ground. "I can see you\'re frustrated." Avoid arguing about delusions.\n\n**8. Lay down the law and set clear limits**\n   "I want to help you, but I need you to [specific request]." State consequences clearly but without threat.\n\n**9. Offer choices and optimism**\n   "Would you prefer to sit in this chair or that one?" Empower with small decisions. "We\'re going to figure this out."\n\n**10. Debrief the patient and staff**\n   After de-escalation, review what happened. Allow patient to express remaining concerns. Support staff who were involved.',
        },
        {
            heading: 'When De-escalation Is Not Enough',
            body: 'If verbal de-escalation fails or if the patient presents with **severe agitation posing immediate danger** to self or staff:\n\n• **Show of force** — security activation may de-escalate without physical intervention\n• **Physical restraints** — temporizing measure only. Follow proper technique.\n• **Pharmacological management** — indicated when safety cannot be maintained nonpharmacologically\n\nDe-escalation is an ongoing process — continue verbal engagement even after pharmacological or physical interventions.',
        },
    ],
    citations: [
        { num: 1, text: 'Richmond JS, et al. Verbal De-escalation of the Agitated Patient: Consensus Statement of the AAEP Project BETA. West J Emerg Med. 2012;13(1):17-25.' },
        { num: 2, text: 'Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).' },
    ],
};
const DEL_EXDS_INFO = {
    id: 'del-exds-info',
    title: 'Excited Delirium Syndrome',
    subtitle: 'Recognition, Pathophysiology, and Emergency Management',
    sections: [
        {
            heading: 'Recognition — 6 of 10 Criteria = Probable ExDS',
            body: '1. **Pain tolerance** — unresponsive to painful stimuli\n2. **Tachypnea** — rapid, labored breathing\n3. **Sweating / tactile hyperthermia** — temperature >104°F (40°C) is the **single best predictor of death**\n4. **Agitation** with **unusual strength**\n5. **Noncompliance** with police / first responders\n6. **Lack of tiring** despite prolonged physical struggle\n7. **Inappropriate clothing** — often undressing or naked\n8. **Mirror / glass attraction** — drawn to reflective surfaces\n9. **Bizarre behavior**\n10. **Male sex**\n\nCase fatality rate: **~10%**. Most deaths are from cardiac arrhythmia (PEA, asystole). [1]',
        },
        {
            heading: 'Pathophysiology',
            body: '• Proposed mechanism: **excess dopamine** in the central nervous system\n• Associated with sympathomimetic intoxication (cocaine, methamphetamine) and/or underlying psychiatric illness with medication noncompliance\n• Results in dangerous hyperthermia, severe metabolic acidosis, and autonomic instability\n• Rhabdomyolysis and hyperkalemia are common complications\n• Sudden unexpected death can occur even AFTER apparent clinical stabilization [1]',
        },
        {
            heading: 'Immediate Management',
            body: '**1. Remove from prone position** — positional asphyxia is a major cause of death during restraint\n\n**2. Aggressive cooling** — target temperature <101°F (38.3°C)\n   • Ice packs to axillae, groin, neck\n   • Cold IV fluids\n   • Mist and fan evaporative cooling\n   • Consider cold water immersion if available\n\n**3. IV access and fluids**\n   • Large-bore IV × 2\n   • Aggressive normal saline (goal: prevent renal failure from rhabdomyolysis)\n\n**4. Sedation**\n   • First-line: [Midazolam](#/drug/midazolam/agitation) 5 mg IM, repeat as needed\n   • Refractory: [Ketamine](#/drug/ketamine/agitation) 4 mg/kg IM\n   • Avoid prolonged physical struggle — it worsens hyperthermia and acidosis\n\n**5. Cardiac monitoring** — continuous telemetry. Anticipate PEA/asystole arrest.',
        },
        {
            heading: 'Monitoring & Workup',
            body: '• **CK** — rhabdomyolysis (often massive: >10,000 IU/L). Aggressive IV hydration, target UOP >200 mL/hr.\n• **Potassium** — hyperkalemia from rhabdomyolysis. Treat aggressively (calcium, insulin/glucose, bicarbonate if acidotic).\n• **VBG with lactate** — metabolic acidosis\n• **Core temperature** q15 min — continue cooling until <101°F\n• **Creatinine** — acute kidney injury from rhabdomyolysis\n• **Continuous telemetry** — monitor for arrhythmia\n• **Urine drug screen** — identify causative substance',
        },
        {
            heading: 'Disposition',
            body: '**ICU admission is MANDATORY** — ExDS carries risk of sudden death even after apparent stabilization.\n\n• Cardiac monitoring minimum 24 hours\n• Continue aggressive IV hydration for rhabdomyolysis\n• Serial CK, electrolytes, creatinine\n• Temperature management\n• Psychiatric evaluation when medically stable',
        },
    ],
    citations: [
        { num: 1, text: 'Vilke GM, DeBard ML, Chan TC, et al. Excited Delirium Syndrome (ExDS): Defining Based on a Review of the Literature. J Emerg Med. 2012;43(5):897-905.' },
        { num: 2, text: 'Nassisi D, et al. Managing Delirium in the Emergency Department. Emergency Medicine Practice (EB Medicine).' },
    ],
};
const DEL_CAM_GUIDE = {
    id: 'del-cam-guide',
    title: 'CAM & bCAM Screening Guide',
    subtitle: '2-Tier Delirium Screening Protocol for the Emergency Department',
    sections: [
        {
            heading: 'Step 1: Delirium Triage Screen (DTS)',
            body: '**Quick initial screen** — can be performed by trained nonclinicians with similar performance to clinicians. [1]\n\n**RASS Assessment:**\n• If RASS is anything other than **0 (alert and calm)** → DTS is **POSITIVE** → proceed to Step 2\n• If RASS is **0** → assess for inattention: ask patient to recite months of the year backward from December to July\n• If unable to do so correctly → DTS is **POSITIVE** → proceed to Step 2\n• If RASS 0 and passes attention screen → DTS is **NEGATIVE** — delirium unlikely',
        },
        {
            heading: 'Step 2: Brief CAM (bCAM)',
            body: '**Confirmatory test** — takes ~2 minutes. Administer when DTS is positive. [1]\n\n**Feature 1: Acute Onset or Fluctuating Course** ✓ required\n• Is there an acute change in mental status from baseline? OR\n• Has the mental status fluctuated in the past 24 hours?\n\n**Feature 2: Inattention** ✓ required\n• "Squeeze my hand when I say the letter A" then recite: S-A-V-E-A-H-A-A-R-T\n• ≥2 errors (failed to squeeze on A, or squeezed on non-A) = inattention present\n\n**Feature 3: Altered Level of Consciousness**\n• RASS ≠ 0\n\n**Feature 4: Disorganized Thinking**\n• Ask: "Will a stone float on water?" "Are there fish in the sea?" "Does 1 pound weigh more than 2 pounds?" "Can you use a hammer to pound a nail?"\n• ≥1 incorrect answer + unable to hold up same number of fingers as examiner = disorganized thinking\n\n**DELIRIUM PRESENT** = Feature 1 + Feature 2 + EITHER Feature 3 OR Feature 4',
        },
        {
            heading: 'Performance Characteristics',
            body: '**2-Tier DTS + bCAM approach:** [1]\n• Sensitivity: **82%** (95% CI: 69-90%)\n• Specificity: **95.8%** (95% CI: 93-97%)\n• Comparable performance when administered by trained nonclinician raters\n• Feasibility: 76.5% adherence rate in pilot study\n\n**CAM alone** (all clinical settings): [2]\n• Sensitivity: 94% (range 46-100%)\n• Specificity: 89% (range 63-100%)\n• Performance is better when formal cognitive testing is incorporated\n\n**CAM-ICU** (validated for ED use): [1]\n• Sensitivity: 72%\n• Specificity: 98.6%',
        },
        {
            heading: 'Key Points',
            body: '• The **2-tier approach** (DTS → bCAM) is the current recommended screening strategy [1]\n• Low recognition rates (54-89% missed) are attributed to **lack of education** and **heavy ED workflow** — not inadequacy of available tools\n• **Fluctuating course** means some patients may screen negative initially but positive on re-evaluation\n• **Baseline cognitive status is critical** — obtain from family, caregivers, or prior documentation\n• Altered mental status as chief complaint, when documented, has been noted to be **specific** for delirium\n• If unable to determine baseline, **assume acute change** and screen',
        },
    ],
    citations: [
        { num: 1, text: 'Han JH, et al. Diagnosing Delirium in Older ED Patients: Validity and Reliability of the DTS and bCAM. Ann Emerg Med. 2013;62(5):457-465.' },
        { num: 2, text: 'Wei L, et al. The Confusion Assessment Method: A Systematic Review. J Am Geriatr Soc. 2008;56(5):823-830.' },
    ],
};
const AI_SUMMARY = {
    id: 'ai-summary',
    title: 'Adrenal Insufficiency Steps Summary',
    subtitle: 'Stepwise management of adrenal crisis and chronic AI',
    sections: [
        {
            heading: '1. Crisis Recognition & Resuscitation',
            body: '• [Assess clinical presentation](#/node/ai-start)\n• [Confirm crisis features — SBP ≤100 or ≥20 below baseline](#/node/ai-crisis-confirm)\n• [Immediate IV fluids — 1L NS (peds: 20 mL/kg)](#/node/ai-crisis-fluids)\n• [Emergency steroids — Hydrocortisone 100 mg IV](#/node/ai-crisis-steroid)',
        },
        {
            heading: '2. Crisis Treatment',
            body: '• [Ongoing management — HC 200 mg/24h](#/node/ai-crisis-ongoing)\n• [Response assessment at 1-2 hours](#/node/ai-crisis-response)\n• [Identify and treat precipitant](#/node/ai-precipitant-workup)\n• [Refractory shock — broaden differential](#/node/ai-crisis-refractory)',
        },
        {
            heading: '3. Type Classification',
            body: '• [PAI vs SAI vs TAI](#/node/ai-type-classify)\n• [Primary AI — Addison\'s disease](#/node/ai-pai-workup)\n• [Secondary AI — pituitary](#/node/ai-sai-workup)\n• [Tertiary AI — steroid-induced](#/node/ai-tai-workup)',
        },
        {
            heading: '4. Diagnostic Workup',
            body: '• [Morning cortisol + ACTH](#/node/ai-diagnostic-labs)\n• [Cosyntropin stimulation test](#/node/ai-cosyntropin)',
        },
        {
            heading: '5. Maintenance & Stress Dosing',
            body: '• [Maintenance therapy — HC 15-25 mg PO daily](#/node/ai-maintenance)\n• [Sick-day rules — double/triple dose](#/node/ai-stress-dose)\n• [Medication-related triggers](#/node/ai-med-related)\n• [Crisis prevention & patient education](#/node/ai-prevention)',
        },
        {
            heading: '6. Disposition',
            body: '• [ICU — active crisis / hemodynamic instability](#/node/ai-dispo-icu)\n• [Floor — acute illness / new diagnosis](#/node/ai-dispo-admit)\n• [Discharge — stable with follow-up](#/node/ai-dispo-discharge)',
        },
    ],
    citations: [],
};
const AI_PRECIPITANTS = {
    id: 'ai-precipitants',
    title: 'Precipitating Factors & Differential Diagnosis',
    subtitle: 'Common triggers for adrenal crisis and diagnostic mimics',
    sections: [
        {
            heading: 'Crisis Precipitants',
            body: '**Infection** — #1 trigger overall (viral in children, bacterial in adults) [1]\n**GI illness** — vomiting prevents oral steroid absorption\n**Surgery / trauma** — inadequate stress dosing perioperatively\n**Steroid withdrawal** — abrupt cessation of chronic glucocorticoids\n**CYP3A4 inducers** — rifampin, phenytoin, carbamazepine, phenobarbital accelerate cortisol metabolism\n**Adrenal hemorrhage** — anticoagulation, meningococcemia (Waterhouse-Friderichsen), antiphospholipid syndrome\n**Emotional stress** — significant psychological stressors\n**Temperature extremes** — heat or cold exposure\n**No identifiable trigger** — ~10% of cases [2]',
        },
        {
            heading: 'Differential Diagnosis',
            body: '**Shock** — septic, hypovolemic, cardiogenic, obstructive\n**Endocrine emergencies** — thyroid storm, myxedema coma, DKA, HHS\n**GI** — acute abdomen, gastroenteritis, dehydration\n**Cardiac** — acute MI, Takotsubo cardiomyopathy\n**Other** — anorexia nervosa, TCA overdose (can mimic adrenal crisis)',
        },
        {
            heading: 'Clinical Clues Favoring Adrenal Crisis',
            body: '• Shock refractory to fluids AND vasopressors\n• Hyperpigmentation (palmar creases, buccal mucosa)\n• Hyponatremia + hyperkalemia (PAI)\n• Hypoglycemia without diabetes or insulin use\n• Known chronic steroid use with missed doses\n• History of autoimmune disease\n• Rapid improvement after parenteral hydrocortisone (1-2 hours)',
        },
    ],
    citations: [
        { num: 1, text: 'Rushworth RL, Torpy DJ, Falhammar H. Adrenal Crisis. N Engl J Med. 2019;381(9):852-861.' },
        { num: 2, text: 'Hahner S, et al. High Incidence of Adrenal Crisis in Educated Patients. JCEM. 2015;100(2):407-416.' },
        { num: 3, text: 'Lentz S, et al. Diagnosis and Management of Adrenal Insufficiency in the ED. J Emerg Med. 2022;63(2):212-220.' },
    ],
};
const AI_LAB_FINDINGS = {
    id: 'ai-lab-findings',
    title: 'Lab Findings by AI Type',
    subtitle: 'Distinguishing primary, secondary, and tertiary adrenal insufficiency',
    sections: [
        {
            heading: 'Laboratory Comparison',
            body: '',
            drugTable: [
                { drug: 'Cortisol', regimen: 'LOW in all types. AM cortisol <3 μg/dL virtually confirms AI. >15 μg/dL makes AI unlikely. 3-15 μg/dL requires stimulation test.' },
                { drug: 'ACTH', regimen: 'PAI: HIGH (>2× upper limit — compensatory). SAI/TAI: LOW or normal (pituitary/hypothalamic failure).' },
                { drug: 'Sodium', regimen: 'LOW in all types (84% of crisis patients). PAI: aldosterone deficiency + cortisol-related ADH excess. SAI/TAI: cortisol-related ADH excess only.' },
                { drug: 'Potassium', regimen: 'PAI: HIGH (aldosterone deficiency — unique to PAI). SAI/TAI: NORMAL (aldosterone preserved).' },
                { drug: 'Aldosterone', regimen: 'PAI: LOW (adrenal destruction). SAI/TAI: NORMAL (RAAS intact).' },
                { drug: 'Renin', regimen: 'PAI: HIGH (compensatory for low aldosterone). SAI/TAI: NORMAL.' },
                { drug: 'Glucose', regimen: 'LOW in all types. Worse in SAI (combined GH + cortisol deficiency). Especially common in children.' },
                { drug: 'Calcium', regimen: 'May be ELEVATED in PAI (decreased cortisol-mediated suppression of intestinal absorption, hypovolemia).' },
                { drug: 'CBC', regimen: 'Normocytic anemia, lymphocytosis, eosinophilia (loss of cortisol-mediated eosinophil suppression).' },
                { drug: 'TSH', regimen: 'May be elevated — either from loss of cortisol suppression of TSH, or concomitant autoimmune hypothyroidism (polyglandular syndrome).' },
            ],
        },
        {
            heading: 'Key Distinguishing Features',
            body: '**Only in PAI:** Hyperkalemia, hyperpigmentation, elevated ACTH, elevated renin, low aldosterone\n**Only in SAI:** Other pituitary deficits (TSH, LH/FSH, GH, prolactin abnormalities), visual field defects\n**Suggests TAI:** History of chronic exogenous steroid use (oral, inhaled, topical, intra-articular, opioids)',
        },
    ],
    citations: [
        { num: 1, text: 'Bornstein SR, et al. Endocrine Society Clinical Practice Guideline. JCEM. 2016;101(2):364-389.' },
        { num: 2, text: 'Husebye ES, et al. Adrenal Insufficiency. Lancet. 2021;397(10274):613-629.' },
    ],
};
const AI_SICK_DAY_RULES = {
    id: 'ai-sick-day-rules',
    title: 'Sick-Day Rules for Adrenal Insufficiency',
    subtitle: 'When and how to increase your steroid dose',
    shareable: true,
    sections: [
        {
            heading: 'When to Increase Your Steroid Dose',
            body: 'Your body needs MORE cortisol when you are sick, injured, or under stress. You must increase your steroid dose to prevent a dangerous drop in cortisol called an adrenal crisis.',
        },
        {
            heading: 'Minor Illness (Cold, Mild Stomach Bug)',
            body: '• Fever over 100.4°F (38°C): DOUBLE your daily dose\n• Fever over 102.2°F (39°C): TRIPLE your daily dose\n• Continue the increased dose for 2-3 days until you feel better\n• Then return to your normal dose',
        },
        {
            heading: 'Moderate Illness or Injury',
            body: '• TRIPLE your daily dose or take hydrocortisone 50 mg by mouth twice a day\n• Seek medical attention\n• Continue increased dose until illness resolves, then taper back to normal over 2-3 days',
        },
        {
            heading: 'Unable to Keep Medicine Down (Vomiting)',
            body: '• If you vomit within 30 minutes of taking your steroid pill, you need your EMERGENCY INJECTION\n• Give yourself hydrocortisone 100 mg into your outer thigh muscle (IM injection)\n• GO TO THE EMERGENCY ROOM IMMEDIATELY after the injection\n• You will need IV steroids and fluids',
        },
        {
            heading: 'Surgery or Major Procedure',
            body: '• Tell your surgeon and anesthesiologist that you have adrenal insufficiency\n• You will need extra steroids before, during, and after the procedure\n• Your endocrinologist or surgeon should provide specific dosing instructions',
        },
        {
            heading: 'What to Always Carry',
            body: '• Medical alert bracelet or necklace\n• Steroid emergency card with your diagnosis and medications\n• Emergency hydrocortisone injection kit\n• Written copy of these sick-day rules\n• Extra supply of your oral steroid medication',
        },
        {
            heading: 'When to Go to the Emergency Room',
            body: '• Vomiting and unable to keep your steroid pills down\n• Fever not improving despite increased steroid dose\n• Dizziness, lightheadedness, or fainting\n• Confusion or difficulty staying awake\n• Severe abdominal pain\n• After using your emergency injection',
        },
    ],
    citations: [
        { num: 1, text: 'Bornstein SR, et al. Endocrine Society Clinical Practice Guideline. JCEM. 2016;101(2):364-389.' },
        { num: 2, text: 'Burger-Stritt S, et al. Standardised Patient Education in Adrenal Insufficiency. Eur J Endocrinol. 2020;183(2):119-127.' },
    ],
};
const AI_SPECIAL_POPULATIONS = {
    id: 'ai-special-populations',
    title: 'Special Populations in Adrenal Insufficiency',
    subtitle: 'Pregnancy, pediatric CAH, chronic opioid users, checkpoint inhibitors',
    sections: [
        {
            heading: 'Pregnancy',
            body: '**Hydrocortisone is the glucocorticoid of choice** — inactivated by placental 11β-HSD2 (minimal fetal exposure). [1]\n\n• Increase HC by 20-40% in third trimester (physiologic cortisol rises in late pregnancy)\n• Morning sickness/hyperemesis may prevent oral absorption — use IM HC if vomiting\n• **Labor/delivery:** Stress-dose HC 100 mg IV at onset of labor, then 50 mg IV q8h until 24-48h postpartum\n• Cesarean section: treat as major surgery\n• Fludrocortisone may need increase (progesterone competes for mineralocorticoid receptor)\n• Interpret cortisol levels with caution — total cortisol rises in pregnancy due to increased cortisol-binding globulin',
        },
        {
            heading: 'Pediatric Congenital Adrenal Hyperplasia (CAH)',
            body: '**Most common cause of PAI in children** — 21-hydroxylase deficiency (>90% of cases). [2]\n\n• Maintenance: HC 6-10 mg/m²/day divided TID (lowest effective dose)\n• Fludrocortisone 50-200 μg/day for salt-wasting forms\n• Salt supplementation 1-2 g/day in infants\n• Monitor growth velocity — overtreatment suppresses linear growth\n• Newborn screening available in all US states (but can be missed)\n• Stress dosing: 30-50 mg/m²/day for illness, 50-100 mg/m² IV bolus for surgery\n• Parents must be trained in emergency IM injection technique\n• Sick-day rules education at every visit',
        },
        {
            heading: 'Chronic Opioid-Induced AI',
            body: '**Mechanism:** Opioids suppress hypothalamic CRH release → tertiary AI. [3]\n\n• Prevalence: ~15% of chronic opioid users\n• Higher risk with higher doses (>20 MME/day) and longer duration\n• No patient on <20 morphine milligram equivalents/day developed opioid-induced AI\n• Symptoms overlap with opioid side effects (fatigue, nausea) — easy to miss\n• Screen with AM cortisol in chronic opioid patients with fatigue or hypotension\n• May recover weeks to months after opioid cessation\n• Stress dosing needed until HPA recovery confirmed (AM cortisol >18 μg/dL off replacement)',
        },
        {
            heading: 'Immune Checkpoint Inhibitor-Induced',
            body: '**Ipilimumab (anti-CTLA-4):** Hypophysitis → secondary AI (highest risk, ~10% incidence). [4]\n**Pembrolizumab/nivolumab (anti-PD-1):** Primary adrenalitis → primary AI (less common).\n**Combined checkpoint therapy:** Highest overall endocrine toxicity risk.\n\n• Usually irreversible — lifelong hormone replacement needed\n• Do NOT hold cancer therapy — manage with hormone replacement and oncology co-management\n• Screen with AM cortisol + ACTH if new fatigue, hypotension, hyponatremia\n• MRI pituitary for suspected hypophysitis\n• Full anterior pituitary panel if SAI confirmed',
        },
    ],
    citations: [
        { num: 1, text: 'Lebbe M, Arlt W. What Is the Best Management Strategy for an Addison Patient During Pregnancy? Clin Endocrinol (Oxf). 2013;78(4):497-502.' },
        { num: 2, text: 'Bornstein SR, et al. Endocrine Society Clinical Practice Guideline. JCEM. 2016;101(2):364-389.' },
        { num: 3, text: 'de Vries F, et al. Opioids and Their Endocrine Effects: Systematic Review and Meta-Analysis. JCEM. 2020;105(3):1020-1029.' },
        { num: 4, text: 'Hahner S, et al. Adrenal Insufficiency. Nat Rev Dis Primers. 2021;7(1):19.' },
    ],
};
const AI_STEROID_EQUIVALENCY = {
    id: 'ai-steroid-equivalency',
    title: 'Corticosteroid Equivalency & Alternatives',
    subtitle: 'Glucocorticoid and mineralocorticoid potency comparison',
    sections: [
        {
            heading: 'Glucocorticoid Equivalency Table',
            body: '',
            drugTable: [
                { drug: 'Hydrocortisone', regimen: '20 mg = 1× glucocorticoid potency. Duration: 8-12h. Mineralocorticoid: 1×. Preferred for replacement.' },
                { drug: 'Cortisone', regimen: '25 mg equivalent. Duration: 8-12h. Mineralocorticoid: 0.8×. Requires hepatic conversion to cortisol (less reliable).' },
                { drug: 'Prednis(ol)one', regimen: '5 mg equivalent. Duration: 12-36h. Mineralocorticoid: 0.8×. Once-daily option; liquid available for children.' },
                { drug: 'Methylprednisolone', regimen: '4 mg equivalent. Duration: 12-36h. Mineralocorticoid: 0.5×. IV alternative when HC unavailable.' },
                { drug: 'Dexamethasone', regimen: '0.75 mg equivalent. Duration: 36-54h. Mineralocorticoid: 0×. Once-daily; does not interfere with cortisol assay.' },
                { drug: 'Fludrocortisone', regimen: '— (not used for glucocorticoid replacement). Mineralocorticoid: 125×. Used for mineralocorticoid replacement in PAI only.' },
            ],
        },
        {
            heading: 'Why Hydrocortisone Is Preferred',
            body: '• **Physiologic** — structurally identical to endogenous cortisol\n• **Dual activity** — provides both glucocorticoid AND mineralocorticoid effect\n• **Short half-life** (~8-12h) — allows physiologic diurnal dosing (high AM, low PM)\n• **Lower growth suppression** in children vs longer-acting steroids\n• **Crisis doses (≥50 mg/day)** provide sufficient mineralocorticoid effect — no fludrocortisone needed',
        },
        {
            heading: 'When Alternatives Are Appropriate',
            body: '**Dexamethasone:** When cosyntropin stimulation test is planned (no cortisol assay interference). Once-daily dosing for adherence. Avoid in children long-term (growth suppression).\n\n**Prednisolone:** Once-daily dosing improves adherence. Liquid formulation for young children. Widely available.\n\n**Methylprednisolone:** IV alternative when hydrocortisone is unavailable in crisis setting.\n\n**NOTE:** All non-hydrocortisone alternatives lack adequate mineralocorticoid activity — patients with PAI on these agents MUST also take fludrocortisone.',
        },
    ],
    citations: [
        { num: 1, text: 'Bornstein SR, et al. Endocrine Society Clinical Practice Guideline. JCEM. 2016;101(2):364-389.' },
        { num: 2, text: 'Husebye ES, et al. Adrenal Insufficiency. Lancet. 2021;397(10274):613-629.' },
    ],
};
// -------------------------------------------------------------------
// Thyroid Disorders — Steps Summary
// -------------------------------------------------------------------
const THYROID_SUMMARY = {
    id: 'thyroid-summary',
    title: 'Thyroid Disorders Steps Summary',
    subtitle: 'Stepwise approach to thyroid emergencies',
    sections: [
        {
            heading: 'Initial Assessment',
            body: '[Presentation & Pathway Selection](#/node/thyroid-start)\n[Confirm Decompensated Hypothyroidism](#/node/thyroid-hypo-confirm)\n[Confirm Thyroid Storm](#/node/thyroid-storm-confirm)',
        },
        {
            heading: 'Decompensated Hypothyroidism',
            body: '[Airway & Supportive Care](#/node/thyroid-hypo-airway) — passive rewarming only, avoid sedatives\n[Step 1: Steroids FIRST](#/node/thyroid-hypo-steroids) — HC 100 mg IV before T4\n[Step 2: IV Levothyroxine](#/node/thyroid-hypo-t4) — 200-400 mcg IV load\n[Step 3: Consider IV Liothyronine](#/node/thyroid-hypo-t3) — for critically ill only\n[Lab Workup & Monitoring](#/node/thyroid-hypo-labs)\n[Disposition](#/node/thyroid-hypo-dispo) — ICU vs monitored floor',
        },
        {
            heading: 'Thyroid Storm — 8-Step Protocol',
            body: '[Step 1: Evaluation & Sepsis Workup](#/node/thyroid-storm-eval) — echo BEFORE beta-blockers\n[Step 2: Steroids](#/node/thyroid-storm-steroids) — HC 300 mg IV load → 100 mg q8h\n[Step 3: Thionamide](#/node/thyroid-storm-thionamide) — methimazole 40 mg load or PTU 500-1000 mg\n[Step 4: Iodine](#/node/thyroid-storm-iodine) — SSKI 5 drops q6h (≥1hr after thionamide)\n[Step 5: Cholestyramine](#/node/thyroid-storm-cholestyramine) — 4 g q6h\n[Step 6: Hyperthermia](#/node/thyroid-storm-hyperthermia) — acetaminophen, NO aspirin\n[Step 7: Agitation](#/node/thyroid-storm-agitation) — olanzapine preferred\n[Step 8: Cardiovascular](#/node/thyroid-storm-cardiovascular) — echo first, then decide on beta-blocker',
        },
        {
            heading: 'Special Situations',
            body: '[AFib in Thyroid Storm](#/node/thyroid-storm-afib)\n[Pregnancy](#/node/thyroid-storm-pregnancy) — PTU mandatory in 1st trimester\n[Refractory Storm](#/node/thyroid-storm-refractory) — plasmapheresis, thyroidectomy',
        },
        {
            heading: 'Subclinical Findings',
            body: '[Incidental Lab Abnormality](#/node/thyroid-subclinical)\n[TSH ≥10 — Start Treatment](#/node/thyroid-subclinical-treat)\n[TSH 4.5-10 — Observation](#/node/thyroid-subclinical-observe)\n[Suppressed TSH — Urgent Referral](#/node/thyroid-subclinical-hyper)',
        },
    ],
    citations: [],
};
// -------------------------------------------------------------------
// Thyroid Disorders — Beta-Blocker Controversy
// -------------------------------------------------------------------
const THYROID_BB_CONTROVERSY = {
    id: 'thyroid-bb-controversy',
    title: 'Beta-Blocker Controversy in Thyroid Storm',
    subtitle: 'Traditional vs critical care perspective',
    sections: [
        {
            heading: 'Traditional View (ATA/EMP Guidelines)',
            body: 'Beta-adrenergic blockade is recommended for patients with symptomatic thyrotoxicosis, especially elderly patients and those with resting HR >90 or coexisting cardiovascular disease. [1]\n\n**Propranolol** is preferred — at high doses (>160 mg/day), it also inhibits peripheral T4→T3 conversion. [1]\n\nBeta-blockers are the mainstay of treatment for AFib secondary to hyperthyroidism.\n\nFor critically ill patients, **esmolol** infusion provides titratable, ultra-short-acting rate control.',
        },
        {
            heading: 'Critical View (IBCC / Farkas)',
            body: '**Beta-blockers can be lethal in thyroid storm.** [2]\n\nSome patients develop severe thyrotoxic cardiomyopathy with reduced EF. In this context, beta-blockade may cause cardiac arrest or cardiogenic shock. In one multi-center study, **38% of thyroid storm patients developed cardiogenic shock**. [3]\n\nJapanese guidelines cite increased mortality with propranolol vs esmolol. Retrospective data show **no difference** between beta-1-selective agents and propranolol — arguing against the clinical relevance of propranolol\'s T4→T3 blocking. [4]\n\nThe concept that beta-blockers are a "cornerstone therapy" needs to be debunked. Beta-blockers are excellent for chronic, compensated hyperthyroidism — but potentially lethal in acute, decompensated hyperthyroidism (just as they are excellent for chronic HF but lethal in acute decompensated HF).',
        },
        {
            heading: 'Balanced Approach',
            body: '**1. Echo BEFORE beta-blockers** — mandatory. Assess EF and volume status.\n\n**2. If preserved EF + hypertension:** Beta-blockers are reasonable. Esmolol preferred (titratable, ultra-short acting). Start low, titrate carefully.\n\n**3. If reduced EF or decompensated HF:** Do NOT give beta-blockers. Treat the thyroid storm aggressively (steps 2-7). Sinus tachycardia may be compensatory — targeting HR <130 is more realistic than <110.\n\n**4. Do not use beta-blockers to intentionally slow sinus tachycardia** — treat the underlying cause instead.\n\n**5. If patient deteriorates after beta-blocker:** Stop immediately. This is likely iatrogenic cardiogenic shock.',
        },
        {
            heading: 'Key Evidence',
            body: '\u2022 One meta-analysis concluded that beta-blocker use in thyroid storm was linked to cardiogenic collapse and cardiac arrest [5]\n\u2022 A multi-center French study found 38% of thyroid storm patients developed cardiogenic shock [3]\n\u2022 Retrospective Japanese data: mortality was independently associated with non-use of antithyroid drugs, but NOT with non-use of beta-blockers [6]\n\u2022 No RCTs exist comparing beta-blocker use vs no beta-blocker in thyroid storm',
        },
    ],
    citations: [
        { num: 1, text: 'Ross DS et al. 2016 ATA Guidelines for Diagnosis and Management of Hyperthyroidism. Thyroid. 2016;26(10):1343-1421.' },
        { num: 2, text: 'Farkas J. Thyroid Storm. Internet Book of Critical Care (IBCC). 2025.' },
        { num: 3, text: 'Bourcier S et al. Thyroid Storm in the ICU: A Retrospective Multicenter Study. Crit Care Med. 2020;48(1):83-90.' },
        { num: 4, text: 'Matsuo Y et al. Clinical efficacy of beta-1 selective beta-blockers versus propranolol in thyroid storm. Crit Care Med. 2024;52(7):1077-1086.' },
        { num: 5, text: 'Farooqi S et al. High risk and low prevalence diseases: Thyroid storm. Am J Emerg Med. 2023;69:127-135.' },
        { num: 6, text: 'Ono Y et al. Factors associated with mortality of thyroid storm. Medicine. 2016;95(7):e2848.' },
    ],
};
// -------------------------------------------------------------------
// Thyroid Disorders — Thionamide Comparison
// -------------------------------------------------------------------
const THYROID_THIONAMIDE_COMPARE = {
    id: 'thyroid-thionamide-compare',
    title: 'Thionamide Comparison',
    subtitle: 'Methimazole vs Propylthiouracil (PTU)',
    sections: [
        {
            heading: 'Mechanism',
            body: '**Both** inhibit thyroid peroxidase, blocking new thyroid hormone synthesis.\n\n**Methimazole:** Binds irreversibly to thyroperoxidase \u2192 longer duration of action, less frequent dosing.\n\n**PTU:** Binds reversibly \u2192 shorter duration, requires q4-8h dosing. **Additional benefit:** Blocks peripheral T4\u2192T3 conversion (~45% reduction in 24h). However, IBCC notes no clinical evidence this additional effect is clinically meaningful. [1]',
        },
        {
            heading: 'Dosing in Thyroid Storm',
            body: '',
            drugTable: [
                { drug: 'Methimazole', regimen: 'Load: 40 mg PO. Maintenance: 20 mg PO q6h. After stabilization: 20 mg q12h.' },
                { drug: 'PTU', regimen: 'Load: 500-1000 mg PO. Maintenance: 250 mg PO q4h. Higher doses needed due to shorter duration and reversible binding.' },
            ],
        },
        {
            heading: 'Safety Profile',
            body: '**Hepatotoxicity:**\n\u2022 **Methimazole:** Lower risk. Cholestatic pattern (less severe). Mean onset ~30 days.\n\u2022 **PTU:** Higher risk (~1/1000 severe injury). **FDA Black Box Warning.** Hepatocellular pattern \u2014 can cause fulminant liver failure. Median onset ~120 days. Dose-dependent.\n\n**Agranulocytosis** (~0.2% for both):\n\u2022 Risk is dose-dependent for both drugs\n\u2022 Higher risk with PTU at equivalent doses\n\u2022 Almost always within 90 days of therapy\n\u2022 Presents with high fever + pharyngitis\n\u2022 Cross-reactivity between agents \u2014 do not switch if agranulocytosis occurs\n\n**ANCA-associated vasculitis:** Higher risk with PTU.\n\n**Overall:** Methimazole is safer for long-term use. Transition from PTU to methimazole once stable.',
        },
        {
            heading: 'Pregnancy',
            body: '**1st trimester: PTU is MANDATORY**\n\u2022 Methimazole crosses placenta \u2192 teratogenic (aplasia cutis, choanal atresia, esophageal atresia, cardiac malformations)\n\u2022 PTU: lower risk and less severe anomalies (preauricular cysts, urinary tract defects)\n\n**2nd/3rd trimester: Switch to methimazole**\n\u2022 Risk of congenital anomalies decreases after 1st trimester\n\u2022 Methimazole preferred to reduce maternal hepatotoxicity risk\n\n**Both drugs:** Use lowest effective dose \u2014 both cross placenta and can cause fetal hypothyroidism. [2]',
        },
        {
            heading: 'IBCC vs ATA Recommendation',
            body: '**ATA:** Favors PTU in acute thyroid storm (earlier onset + T4\u2192T3 blocking).\n**IBCC:** Favors methimazole overall (safer, no robust evidence PTU is clinically superior).\n**Japanese Endocrine Society:** No significant outcome benefit of one over the other.\n\n**Pragmatic choice:** Either is acceptable. Use PTU if pregnant (1st trimester) or if specifically preferred by consulting endocrinologist.',
        },
    ],
    citations: [
        { num: 1, text: 'Farkas J. Thyroid Storm. IBCC. 2025.' },
        { num: 2, text: 'Alexander EK et al. 2017 ATA Guidelines for Thyroid Disease During Pregnancy. Thyroid. 2017;27(3):315-389.' },
    ],
};
// -------------------------------------------------------------------
// Thyroid Disorders — Lab Interpretation
// -------------------------------------------------------------------
const THYROID_LABS = {
    id: 'thyroid-labs',
    title: 'Thyroid Lab Interpretation',
    subtitle: 'TSH, free T4, and T3 patterns in thyroid disease',
    sections: [
        {
            heading: 'Key Principle',
            body: '**Both decompensated hypothyroidism and thyroid storm are CLINICAL diagnoses.** Lab values reflect the chronic thyroid state, not acute severity. If clinical suspicion is high, initiate treatment regardless of lab availability. [1][2]',
        },
        {
            heading: 'Lab Patterns by Condition',
            body: '**Primary Hypothyroidism (most common):**\nTSH: \u2191\u2191 High | Free T4: \u2193 Low | T3: \u2193 Low\n\n**Central (Secondary) Hypothyroidism:**\nTSH: Low, normal, or slightly \u2191 | Free T4: \u2193 Low | T3: \u2193 Low\n\u2192 Consider panhypopituitarism, pituitary tumor, or secondary AI\n\n**Overt Hyperthyroidism / Thyroid Storm:**\nTSH: \u2193\u2193 Very low (<0.01 mU/L) | Free T4: \u2191 High | T3: \u2191\u2191 Often disproportionately elevated\n\u2192 T3 may be more elevated than T4 due to preferential T3 secretion by hyperthyroid gland\n\n**Subclinical Hypothyroidism:**\nTSH: \u2191 Mildly elevated (4.5-10+) | Free T4: Normal | T3: Normal\n\n**Subclinical Hyperthyroidism:**\nTSH: \u2193 Low (<0.1) | Free T4: Normal | T3: Normal\n\n**Euthyroid Sick Syndrome (Nonthyroidal Illness):**\nTSH: Low or normal | Free T4: Normal or low | T3: \u2193 Low\n\u2192 Common in acutely ill patients WITHOUT primary thyroid disease. Do NOT treat. Reassess after illness resolves. [1]',
        },
        {
            heading: 'Additional Lab Findings',
            body: '**Decompensated Hypothyroidism:**\n\u2022 Hyponatremia (~50%) \u2014 SIADH + decreased renal blood flow\n\u2022 Hypoglycemia \u2014 may indicate concurrent adrenal insufficiency\n\u2022 Elevated CK \u2014 rhabdomyolysis from hypothermia/immobility\n\u2022 Hypercapnia on ABG \u2014 depressed respiratory drive\n\u2022 Low voltage ECG, bradycardia, QT prolongation\n\u2022 Elevated cholesterol/LDL\n\u2022 Anemia, leukopenia\n\u2022 Acquired von Willebrand syndrome (coagulopathy)\n\n**Thyroid Storm:**\n\u2022 Hyperglycemia (catecholamine-mediated glycogenolysis)\n\u2022 Hypercalcemia (hemoconcentration + bone resorption)\n\u2022 Hypokalemia (especially in thyrotoxic periodic paralysis)\n\u2022 Abnormal LFTs / jaundice (hepatic congestion or hypoperfusion)\n\u2022 DIC (elevated INR, low fibrinogen, thrombocytopenia)\n\u2022 Metabolic acidosis on ABG (hypermetabolic state)',
        },
        {
            heading: 'Random Cortisol',
            body: 'Always obtain in suspected decompensated hypothyroidism. Draw BEFORE giving steroids if possible.\n\n\u2022 <10 \u00B5g/dL during crisis: virtually diagnostic of adrenal insufficiency\n\u2022 <18 \u00B5g/dL during acute stress: suggestive of AI\n\u2022 >18 \u00B5g/dL: AI less likely (steroids may be tapered once confirmed)',
        },
    ],
    citations: [
        { num: 1, text: 'Kruithoff ML, Gigliotti BJ. Thyroid Emergencies: A Narrative Review. Endocr Pract. 2025;31(10):1310-1318.' },
        { num: 2, text: 'Farkas J. Decompensated Hypothyroidism. IBCC. 2025.' },
    ],
};
// -------------------------------------------------------------------
// Thyroid Disorders — Precipitants & DDx
// -------------------------------------------------------------------
const THYROID_PRECIPITANTS = {
    id: 'thyroid-precipitants',
    title: 'Precipitants & Differential Diagnosis',
    subtitle: 'Thyroid emergency triggers and mimics',
    sections: [
        {
            heading: 'Decompensated Hypothyroidism Triggers',
            body: '\u2022 **Levothyroxine noncompliance** (#1 cause \u2014 28% in one series) [1]\n\u2022 **Infection / sepsis** (15%) \u2014 viral in children, bacterial in adults\n\u2022 **Amiodarone-induced hypothyroidism** (11%) [1]\n\u2022 Cold exposure (90% of cases present in winter)\n\u2022 Surgery, trauma, burns\n\u2022 MI, heart failure, stroke, GI bleed\n\u2022 Medications: lithium, immune checkpoint inhibitors (pembrolizumab, nivolumab), IV iohexol contrast\n\u2022 Sedatives, opioids (can trigger decompensation)\n\u2022 Beta-blockers, diuretics, antipsychotics',
        },
        {
            heading: 'Thyroid Storm Triggers',
            body: '\u2022 **Infection** (#1) [2]\n\u2022 Antithyroid medication noncompliance\n\u2022 Acute iodine load (contrast dye, amiodarone)\n\u2022 Thyroid surgery or radioiodine therapy\n\u2022 Trauma, surgery\n\u2022 DKA, hypoglycemia\n\u2022 Pregnancy, labor, postpartum\n\u2022 PE, MI, stroke\n\u2022 Aspirin intoxication (increases free thyroid hormone)\n\u2022 Checkpoint inhibitors, tyrosine kinase inhibitors\n\u2022 **No identifiable trigger in ~30% of cases** [2]',
        },
        {
            heading: 'Drug-Induced Thyroid Dysfunction',
            body: '**Amiodarone** (most important):\n\u2022 Can cause BOTH hypothyroidism AND hyperthyroidism\n\u2022 Type 1 amiodarone-induced thyrotoxicosis: excess iodine \u2192 increased hormone synthesis (treat with thionamide)\n\u2022 Type 2: destructive thyroiditis \u2192 hormone release (treat with steroids)\n\u2022 ~30% of thyroid storm cases in some series are amiodarone-related [1]\n\n**Lithium:** Inhibits thyroid hormone release \u2192 hypothyroidism in 20-40% of users\n\n**Checkpoint inhibitors** (pembrolizumab, nivolumab, ipilimumab): Immune-mediated thyroiditis \u2192 can cause both hyper- and hypothyroidism. Myxedema coma has been reported.',
        },
        {
            heading: 'Differential Diagnosis',
            body: '**Decompensated hypothyroidism mimics:**\n\u2022 Sepsis / septic shock\n\u2022 Stroke\n\u2022 Adrenal crisis\n\u2022 DKA\n\u2022 Drug intoxication (carbon monoxide, beta-blocker, CCB, clonidine, opioid, benzodiazepine)\n\u2022 Environmental hypothermia\n\u2022 Malnutrition\n\u2022 Panhypopituitarism\n\n**Thyroid storm mimics:**\n\u2022 Sepsis / septic shock\n\u2022 Neuroleptic malignant syndrome (NMS)\n\u2022 Serotonin syndrome\n\u2022 Sympathomimetic intoxication (cocaine, amphetamines)\n\u2022 Drug/alcohol withdrawal\n\u2022 Pheochromocytoma\n\u2022 Heat stroke\n\u2022 Malignant hyperthermia\n\u2022 Psychiatric crisis (mania, psychosis)',
        },
    ],
    citations: [
        { num: 1, text: 'Bourcier S et al. Critically ill severe hypothyroidism: a retrospective multicenter cohort study. Ann Intensive Care. 2023;13(1):15.' },
        { num: 2, text: 'Farkas J. Thyroid Storm. IBCC. 2025.' },
    ],
};
// -------------------------------------------------------------------
// Thyroid Disorders — Special Populations
// -------------------------------------------------------------------
const THYROID_SPECIAL_POPS = {
    id: 'thyroid-special-pops',
    title: 'Special Populations',
    subtitle: 'Pregnancy, pediatric, neonatal, and elderly considerations',
    sections: [
        {
            heading: 'Pregnancy',
            body: '**Thyroid physiology changes in pregnancy:**\n\u2022 TSH reference range decreases in 1st trimester (reduce upper limit by ~0.5 mIU/L)\n\u2022 Total T4/T3 increase 50% after 16 weeks (increased TBG) \u2014 use free levels\n\u2022 Gestational transient hyperthyroidism is common (HCG cross-reacts with TSH receptor) \u2014 usually benign\n\n**Hypothyroidism in pregnancy:** Untreated \u2192 pre-eclampsia, preterm birth, placental abruption, stillbirth. Adequate T4 replacement minimizes risks.\n\n**Thyroid storm in pregnancy:**\n\u2022 Treatment similar to non-pregnant + key modifications\n\u2022 **PTU is mandatory in 1st trimester** (methimazole is teratogenic)\n\u2022 Switch to methimazole after 1st trimester (lower hepatotoxicity)\n\u2022 Iodine: cautious use \u2014 crosses placenta, can cause fetal goiter\n\u2022 Propranolol: lowest effective dose (prolonged use \u2192 IUGR risk)\n\u2022 Thyrotoxic heart failure + cardiomyopathy are MORE common in pregnancy\n\u2022 Beta-agonist tocolytics are CONTRAINDICATED\n\u2022 Coordinate with OB/MFM [1]',
        },
        {
            heading: 'Pediatric Thyroid Storm',
            body: 'Thyroid storm is rare in children. Most pediatric hyperthyroidism is Graves disease (onset usually during puberty, ~80% after age 11). [2]\n\n**Presentation:** Fever, tachycardia, failure to gain weight, chronic diarrhea, altered mental status. Febrile seizures reported.\n\n**Treatment:** Based on adult literature + expert opinion. No standard pediatric recommendations exist.\n\u2022 Sepsis workup + resuscitation\n\u2022 Consult pediatric endocrinology\n\u2022 Thionamide dosing: [Methimazole](#/drug/methimazole/thyroid storm) 0.25-1 mg/kg/day divided q8-12h\n\u2022 [PTU](#/drug/ptu/thyroid storm) if methimazole not tolerated: 5-10 mg/kg/day divided q8h\n\u2022 [Propranolol](#/drug/propranolol/thyroid storm) 0.5-2 mg/kg/day divided q6-12h',
        },
        {
            heading: 'Neonatal',
            body: '**Congenital hypothyroidism:** 1 in 2000-4000 newborns. Part of standard newborn screening. Often asymptomatic at birth (maternal T4 present). If symptomatic: lethargy, feeding difficulty, macroglossia, hypothermia, jaundice. Treatment: oral [Levothyroxine](#/drug/levothyroxine/congenital hypothyroidism) 10-15 mcg/kg daily. [1]\n\n**Neonatal thyrotoxicosis:** Rare. Seen in babies born to mothers with Graves disease (maternal TRAb crosses placenta). May present at end of first week (after maternal antithyroid drugs clear). Signs: failure to thrive, persistent tachycardia, heart failure. Treatment: [PTU](#/drug/ptu/thyroid storm) 5-10 mg/kg/day divided q8h, or [Methimazole](#/drug/methimazole/thyroid storm) 0.25-1 mg/kg/day.',
        },
        {
            heading: 'Elderly',
            body: '**Decompensated hypothyroidism:** Most common in women 60-85 years. Higher mortality with age.\n\u2022 Start T4 at lower doses (200 mcg load, 50 mcg/day maintenance)\n\u2022 Higher risk of arrhythmias during thyroid replacement\n\u2022 Lower threshold for T3 \u2014 may exacerbate cardiac disease\n\n**Thyroid storm in elderly:**\n\u2022 May present atypically \u2014 "apathetic thyrotoxicosis" (lethargy rather than agitation)\n\u2022 Higher prevalence of AFib (35% in older vs younger patients)\n\u2022 Greater cardiac sensitivity to beta-blockers \u2014 start low, monitor closely\n\u2022 Goiters more common in younger patients (94% vs 50%)',
        },
        {
            heading: 'Amiodarone-Induced Thyroid Dysfunction',
            body: '**Two types (require different treatment):**\n\n**Type 1 (excess iodine \u2192 increased synthesis):**\n\u2022 Occurs in patients with pre-existing thyroid disease (Graves, toxic adenoma)\n\u2022 Treatment: thionamide (methimazole)\n\u2022 May need potassium perchlorate to block iodine uptake\n\n**Type 2 (destructive thyroiditis \u2192 hormone release):**\n\u2022 Occurs in normal thyroid glands\n\u2022 Treatment: corticosteroids (prednisone 40-60 mg/day)\n\u2022 Thionamides are ineffective (not a synthesis problem)\n\n**Mixed/uncertain:** Treat with both thionamide + steroids.\n\nAmiodarone has extremely long half-life (~40-55 days) \u2014 thyroid effects persist for months after discontinuation.',
        },
    ],
    citations: [
        { num: 1, text: 'Alexander EK et al. 2017 ATA Guidelines for Thyroid Disease During Pregnancy. Thyroid. 2017;27(3):315-389.' },
        { num: 2, text: 'Kruithoff ML, Gigliotti BJ. Thyroid Emergencies: A Narrative Review. Endocr Pract. 2025;31(10):1310-1318.' },
    ],
};
// -------------------------------------------------------------------
// Thyroid Disorders — Airway Management
// -------------------------------------------------------------------
const THYROID_AIRWAY = {
    id: 'thyroid-airway',
    title: 'Airway Management in Thyroid Disease',
    subtitle: 'Anatomic and physiologic challenges',
    sections: [
        {
            heading: 'Anatomic Difficult Airway',
            body: '**Decompensated hypothyroidism:**\n\u2022 Macroglossia (myxedema of tongue)\n\u2022 Posterior pharyngeal myxedema / angioedema\n\u2022 Vocal cord edema\n\u2022 Reduced neck mobility\n\n**Goiter (hypo or hyper):**\n\u2022 Tracheal compression and deviation\n\u2022 Laryngeal displacement\n\u2022 Hypopharynx displacement\n\u2022 May make surgical airway technically challenging\n\n**Approach:** Video laryngoscopy as first device. Fiberoptic available as backup. If stable + predicted difficult airway \u2192 awake intubation with ENT/anesthesia standby. In cannot-intubate-cannot-oxygenate \u2192 surgical airway needed (technically challenging with large goiter \u2014 may need urgent tracheostomy in OR). [1]',
        },
        {
            heading: 'Physiologically Difficult Airway',
            body: '**Decompensated hypothyroidism:**\n\u2022 Severe respiratory muscle weakness\n\u2022 Depressed central ventilatory drive \u2192 CO\u2082 narcosis\n\u2022 Decreased lung elasticity\n\u2022 Pleural effusions \u2192 hypoxemia\n\u2022 Patients may have respiratory alkalosis DESPITE low minute ventilation (due to decreased CO\u2082 production)\n\n**Thyroid storm:**\n\u2022 Significant muscle weakness + high metabolic rate \u2192 progressive respiratory failure\n\u2022 Hemodynamic instability \u2192 peri-intubation arrest risk\n\n**All thyroid emergencies:**\n\u2022 Extreme sensitivity to sedatives and opioids\n\u2022 Use smallest effective doses for RSI medications\n\u2022 Pre-oxygenate aggressively\n\u2022 Have vasopressors ready (anticipate peri-intubation hypotension)',
        },
        {
            heading: 'Post-Intubation Considerations',
            body: '**Decompensated hypothyroidism:**\n\u2022 Prolonged ventilator weaning expected \u2014 respiratory muscle weakness + impaired central drive improve slowly with thyroid replacement\n\u2022 Address respiratory alkalosis by decreasing tidal volume or rate (CO\u2082 production is low)\n\u2022 Consider increased aspiration risk from neurogenic oropharyngeal dysphagia\n\n**Thyroid storm:**\n\u2022 Increased CO\u2082 production from hypermetabolic state \u2014 may need higher minute ventilation\n\u2022 Temperature management critical \u2014 hyperthermia worsens metabolic demand',
        },
    ],
    citations: [
        { num: 1, text: 'Kruithoff ML, Gigliotti BJ. Thyroid Emergencies: A Narrative Review. Endocr Pract. 2025;31(10):1310-1318.' },
    ],
};
// -------------------------------------------------------------------
// Anaphylaxis — Steps Summary
// -------------------------------------------------------------------
const ANAPH_SUMMARY = {
    id: 'anaph-summary',
    title: 'Anaphylaxis Steps Summary',
    subtitle: 'Time-critical epinephrine-first treatment pathway',
    sections: [
        {
            heading: '1. Recognition (0-2 min)',
            body: '• [Assess presentation — multi-organ involvement?](#/node/anaph-start)\n• [Apply WAO 2020 diagnostic criteria](#/node/anaph-diagnosis)\n• [Differential: vasovagal, scombroid, ACE-I angioedema](#/info/anaph-ddx)',
        },
        {
            heading: '2. IM Epinephrine — FIRST (0-5 min)',
            body: '• [Source control + IM Epi 0.5 mg anterolateral thigh](#/node/anaph-source-control)\n• Pediatric: 0.01 mg/kg IM (max 0.5 mg)\n• Repeat every 5 min up to 3 doses',
        },
        {
            heading: '3. Reassessment (5-15 min)',
            body: '• [Assess response to IM epinephrine](#/node/anaph-epi-response)\n• [Good response → adjunctive therapies](#/node/anaph-post-epi-stable)\n• [Poor response → IV epinephrine infusion](#/node/anaph-epi-infusion)\n• [Peri-arrest → push-dose epi 20-50 mcg IV](#/node/anaph-peri-arrest)',
        },
        {
            heading: '4. Resuscitation',
            body: '• [Aggressive IV fluids — up to 35% plasma extravasates](#/node/anaph-fluids)\n• [Airway assessment — stridor, edema, intubation prep](#/node/anaph-airway)\n• [Critical airway — video laryngoscopy, smaller ETT, neb epi](#/node/anaph-airway-critical)',
        },
        {
            heading: '5. Refractory / Special Populations',
            body: '• [Beta-blocked patient — methylene blue, higher epi doses](#/node/anaph-beta-blocked)\n• [Refractory anaphylaxis — methylene blue, vasopressin, ECMO](#/node/anaph-refractory)\n• [Persistent bronchospasm — albuterol, terbutaline](#/node/anaph-bronchospasm)',
        },
        {
            heading: '6. Adjuncts & Disposition',
            body: '• [H1 + H2 antihistamines (second-line only)](#/node/anaph-antihistamines)\n• [Steroids — controversial, single dose if giving](#/node/anaph-steroids)\n• [Tryptase — draw within 3 hours](#/node/anaph-tryptase)\n• [Disposition — 4-6h observe vs admit vs ICU](#/node/anaph-disposition-assess)\n• [Discharge Rx — EpiPen x2 + allergist referral](#/node/anaph-discharge-rx)',
        },
    ],
    citations: [],
};
// -------------------------------------------------------------------
// Anaphylaxis — IV Epinephrine PK Rationale
// -------------------------------------------------------------------
const ANAPH_IV_EPI_PK = {
    id: 'anaph-iv-epi-pk',
    title: 'IV Epinephrine — PK Rationale',
    subtitle: 'PulmCrit approach: Why IV infusion over repeated IM',
    sections: [
        {
            heading: 'IM Epinephrine Pharmacokinetics',
            body: 'IM epinephrine takes ~10 minutes to reach peak blood levels (Simons 2001). Absorption is erratic with biphasic serum levels. [4]\n\nRepeating IM epi at 5-minute intervals risks **dose-stacking** — the second dose is given before the first takes effect, leading to inappropriately large total doses.\n\nPatients in shock may have poor muscle perfusion, further reducing IM absorption.',
        },
        {
            heading: 'Pharmacokinetic Calculation',
            body: 'Based on Abboud et al (septic shock PK data): [4]\n• Volume of distribution (Vd) = 8 liters\n• Half-life = ~3.5 minutes\n• Elimination constant (Ke) = 0.2/min\n\n**Loading dose** = Vd × therapeutic concentration = 8000 mL × 0.005 mcg/mL = **~40 mcg**\n**Maintenance** = Vd × concentration × Ke = **~8-10 mcg/min**',
        },
        {
            heading: 'Clinical Evidence',
            body: 'Brown et al 2014: Prospective study of 19 patients with bee sting anaphylaxis treated with IV epinephrine infusion at 5-15 mcg/min. [10]\n\n• All patients responded rapidly (within 5 minutes)\n• No appreciable adverse effects\n• 9 patients required re-initiation after stopping (recurrence)\n• One patient needed 30 mcg/min (dysfunctional IV line)',
        },
        {
            heading: 'Proposed Protocol',
            body: '**Peri-arrest:** 20-50 mcg IV bolus (push-dose)\n\n**Loading:** 20 mcg/min × 2 minutes (~40 mcg total = 1 Vd loading dose)\n\n**Maintenance:** 10 mcg/min — titrate based on response\n\n**AGGRESSIVELY WEAN** after resolution (~2 hours). The greatest weakness of IV epi infusion is reluctance to wean. [4]\n\nIf symptoms recur during wean → resume immediately, attempt again in 1-2 hours.',
        },
        {
            heading: 'Safety',
            body: '**This approach applies ONLY to:**\n• Patients with pre-existing IV access\n• Managed by experienced resuscitationist\n• IM epinephrine remains first-line for the vast majority\n\n**Dosing errors:** IV bolus overdose risk is 61× greater than IM. [2] Never give cardiac arrest dose (1 mg) to a patient with a pulse. The 1 mg/mL concentration must be further diluted before IV use.',
        },
    ],
    citations: [
        { num: 2, text: 'Nunez J, Santillanes G. Anaphylaxis in Pediatric Patients. Pediatric Emergency Medicine Practice (EB Medicine). 2019;16(6):1-24.' },
        { num: 4, text: 'Farkas J. PulmCrit — How to use IV epinephrine for anaphylaxis. EMCrit/PulmCrit. August 26, 2019.' },
        { num: 10, text: 'Brown SGA, et al. Insect sting anaphylaxis; prospective evaluation of treatment with IV adrenaline and volume resuscitation. Emerg Med J. 2004;21(2):149-154.' },
    ],
};
// -------------------------------------------------------------------
// Anaphylaxis — Differential Diagnosis
// -------------------------------------------------------------------
const ANAPH_DDX = {
    id: 'anaph-ddx',
    title: 'Differential Diagnosis',
    subtitle: 'Distinguishing anaphylaxis from mimics',
    sections: [
        {
            heading: 'Vasovagal Reaction',
            body: '**Key distinction:** Vasovagal = **bradycardia** with hypotension. Anaphylaxis = **tachycardia** with hypotension (distributive shock). [3]\n\nVasovagal: pallor, diaphoresis, no urticaria/wheezing. Resolves rapidly with supine positioning.',
        },
        {
            heading: 'Scombroid (Histamine Fish Poisoning)',
            body: 'Caused by histamine in poorly refrigerated fish. Symptoms within minutes to hours: flushing, headache, peppery taste, GI symptoms. [3]\n\n**Clues:** Multiple people affected after same meal. Patient has eaten same fish before without reaction. Responds to antihistamines alone. Not a true allergy — does NOT require EpiPen or allergist referral.',
        },
        {
            heading: 'ACE-Inhibitor Angioedema',
            body: 'Bradykinin-mediated (not IgE). **Epinephrine is ineffective.** [3]\n\nIsolated angioedema (lips, tongue, oropharynx) WITHOUT urticaria. Can occur at any time during treatment course — weeks to years after starting ACE-I.\n\nManagement: Stop ACE-I permanently. Airway management. Consider icatibant or FFP for severe cases.',
        },
        {
            heading: 'Hereditary Angioedema',
            body: 'C1-esterase inhibitor deficiency → excess bradykinin. [3]\n\nRecurrent episodes, family history. Lacks pruritus of allergy. High GI involvement (93%). Epinephrine ineffective.\n\nDiagnosis: C4 level (low), C1-INH level and function.',
        },
        {
            heading: 'Mastocytosis / Mast Cell Activation',
            body: 'Abnormal mast cell proliferation → endogenous histamine release. [1][3]\n\nRecurrent "idiopathic" anaphylaxis, flushing, pruritus, GI symptoms, hypotension. Male predominance. Severe anaphylaxis with hypotension but absence of urticaria.\n\nSuggestive: elevated baseline tryptase (>8 ng/mL). Definitive: bone marrow biopsy.',
        },
        {
            heading: 'Other Mimics',
            body: '• **Asthma** — wheeze + dyspnea in known asthmatic may mask anaphylaxis [1]\n• **Carcinoid** — flushing syndrome with diarrhea, wheezing\n• **MSG reaction** — nausea, diaphoresis, headache after MSG foods [3]\n• **Panic attack** — dyspnea, tachycardia, but no urticaria/angioedema/hypotension\n• **Vocal cord dysfunction** — stridor without other systemic findings\n• **Pulmonary embolism** — dyspnea + hypotension without skin findings\n• **Sepsis / toxic shock** — distributive shock with skin findings (but different rash)',
        },
    ],
    citations: [
        { num: 1, text: 'Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). September 15, 2025.' },
        { num: 3, text: 'Singer E, Zodda D. Allergy and Anaphylaxis. Emergency Medicine Practice (EB Medicine). 2015;17(8):1-24.' },
    ],
};
// -------------------------------------------------------------------
// Anaphylaxis — Biphasic Reaction Risk Factors
// -------------------------------------------------------------------
const ANAPH_BIPHASIC = {
    id: 'anaph-biphasic',
    title: 'Biphasic Reaction Risk Factors',
    subtitle: 'Who needs prolonged observation?',
    sections: [
        {
            heading: 'Epidemiology',
            body: 'Biphasic reactions occur in ~5% of anaphylaxis cases (range 3-20% depending on definition). [1][8]\n\nMajority occur within 8-10 hours of initial reaction resolution. Median time: 10-11 hours. [3]\n\n**No deaths have been reported from biphasic reactions** in published studies. Although the absolute rate is ~5%, clinically significant biphasic reactions may be <2%. [8]',
        },
        {
            heading: 'Risk Factors',
            body: '• Multiple epinephrine doses required for initial stabilization [2]\n• IV fluid bolus required (initial hypotension) [2]\n• Delayed initial administration of epinephrine [2]\n• Inhaled beta-agonist treatment needed [2]\n• Unknown anaphylaxis trigger [2]\n• Severe initial presentation [2]\n• Wheezing at presentation [1]\n• History of biphasic reactions [1]',
        },
        {
            heading: 'Subtypes of Anaphylaxis',
            body: '**Uniphasic** — Most common. Resolves within ~1 hour. Usually does not require ICU. [1]\n\n**Biphasic** — Recurrence >1 hour after resolution without re-exposure. ~5% of cases. Usually mild. [1]\n\n**Persistent** — Ongoing anaphylaxis >4 hours. ~4% of cases. [1]\n\n**Refractory** — Ongoing despite appropriate epinephrine + adjuncts. Rare (<0.5%). Associated with drug etiology. [1]',
        },
        {
            heading: 'Observation Duration',
            body: '**Standard (most patients):** 4-6 hours from peak reaction. [1][2][3]\n\n**Extended (12-24 hours) for:**\n• Multiple risk factors above\n• Severe initial reaction requiring IV epi\n• Late-evening presentation (biphasic would occur overnight)\n• Asthma history (risk factor for fatal anaphylaxis)\n• Unknown trigger\n\n**UK guidelines:** Minimum 6 hours for adults, minimum 6-12 hours for severe or risk factors. [6]',
        },
    ],
    citations: [
        { num: 1, text: 'Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). September 15, 2025.' },
        { num: 2, text: 'Nunez J, Santillanes G. Anaphylaxis in Pediatric Patients. Pediatric Emergency Medicine Practice (EB Medicine). 2019;16(6):1-24.' },
        { num: 3, text: 'Singer E, Zodda D. Allergy and Anaphylaxis. Emergency Medicine Practice (EB Medicine). 2015;17(8):1-24.' },
        { num: 6, text: 'Dodd A, et al. Evidence update for the treatment of anaphylaxis. Resuscitation. 2021;163:86-96.' },
        { num: 8, text: 'Gorham NP. Anaphylaxis: After the Emergency Department. Emerg Med Clin North Am. 2022;40(1):33-37.' },
    ],
};
// -------------------------------------------------------------------
// Anaphylaxis — Causes of Anaphylaxis
// -------------------------------------------------------------------
const ANAPH_CAUSES = {
    id: 'anaph-causes',
    title: 'Causes of Anaphylaxis',
    subtitle: 'Trigger identification & epidemiology',
    sections: [
        {
            heading: 'Adult Triggers',
            body: '• **Medications (34%)** — beta-lactam antibiotics, NSAIDs, muscle relaxants, monoclonal antibodies, radiocontrast, paralytics, protamine, local anesthetics [1][3]\n• **Food (31%)** — peanuts, tree nuts, seafood, shellfish, egg, red meat (alpha-gal) [1][3]\n• **Insect stings (20%)** — Hymenoptera (bees, wasps, hornets, ants) [1][3]\n• **Environmental (7.5%)** — latex, cold/heat exposure [1][3]\n• **Exercise (1.2%)** — food-dependent, within 1-4 hours of eating trigger foods [3]\n• **Idiopathic (11%)** — no identifiable trigger [3]',
        },
        {
            heading: 'Pediatric Triggers',
            body: 'Food is the most common cause in children (~8% prevalence of food allergy). [2]\n\n**Most common foods:** Peanuts and tree nuts (responsible for 94% of fatal food anaphylaxis). [2]\n\n**Vaccine anaphylaxis:** Very rare (~1.5 per million vaccinations). [2]\n\nAnaphylaxis may be missed in infants — flushing, vomiting, loose stool are nonspecific and easily attributed to other causes. [2]',
        },
        {
            heading: 'Fatal Anaphylaxis Risk Factors',
            body: 'Death from anaphylaxis is rare (<1% of cases, ~1 death per million people/year). [2]\n\n**Time from exposure to death:** [12]\n• IV medications: ~5 minutes\n• Insect venom: ~15 minutes\n• Food: ~30 minutes\n\n**Risk factors for fatal anaphylaxis:** [2]\n• Asthma (especially uncontrolled)\n• Adolescents/young adults (less likely to carry/use EpiPen)\n• Peanut or tree nut allergen\n• Delayed epinephrine\n• Upright posture during symptoms\n• Known allergen re-exposure\n\nIn fatal cases, <15% had cutaneous symptoms — absence of urticaria should NOT delay treatment. [2]',
        },
        {
            heading: 'Exercise-Induced Anaphylaxis',
            body: 'Food-dependent exercise-induced anaphylaxis (FDEIA) occurs during exercise within 1-4 hours of eating trigger foods. More common in women. [3]\n\n**Most common triggers:** Wheat, corn, garlic, celery, vegetables, shellfish. [3]\n\nNeither food NOR exercise alone causes symptoms. Prevention: avoid trigger foods within 4-6 hours before exercise. Carry EpiPen during exercise.',
        },
    ],
    citations: [
        { num: 1, text: 'Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). September 15, 2025.' },
        { num: 2, text: 'Nunez J, Santillanes G. Anaphylaxis in Pediatric Patients. Pediatric Emergency Medicine Practice (EB Medicine). 2019;16(6):1-24.' },
        { num: 3, text: 'Singer E, Zodda D. Allergy and Anaphylaxis. Emergency Medicine Practice (EB Medicine). 2015;17(8):1-24.' },
        { num: 12, text: 'Pumphrey RS. Lessons for management of anaphylaxis from a study of fatal reactions. Clin Exp Allergy. 2000;30(8):1144-50.' },
    ],
};
// -------------------------------------------------------------------
// Anaphylaxis — Discharge Instructions (shareable)
// -------------------------------------------------------------------
const ANAPH_DISCHARGE = {
    id: 'anaph-discharge',
    title: 'Anaphylaxis Discharge Instructions',
    subtitle: 'Patient information sheet',
    shareable: true,
    sections: [
        {
            heading: 'What Happened',
            body: 'You had a severe allergic reaction called **anaphylaxis**. This is a serious, potentially life-threatening condition that requires immediate treatment with epinephrine (EpiPen).',
        },
        {
            heading: 'Your EpiPen',
            body: 'You have been prescribed **two EpiPen auto-injectors**. Carry both with you at ALL times.\n\n**How to use:**\n• Remove the blue safety cap\n• Hold the orange tip against your outer thigh (through clothing is OK)\n• Press firmly until you hear a click\n• Hold in place for 3-10 seconds\n• Call 911 immediately after using',
        },
        {
            heading: 'When to Use Your EpiPen and Call 911',
            body: 'Use your EpiPen immediately AND call 911 if you experience ANY of the following:\n\n• Difficulty breathing or wheezing\n• Swelling of lips, tongue, or throat\n• Feeling faint or dizzy\n• Widespread hives or rash\n• Nausea, vomiting, or abdominal pain after exposure to your trigger\n• Any combination of the above\n\n**Do NOT wait to see if symptoms get worse.** Early use of epinephrine saves lives.',
        },
        {
            heading: 'Avoid Your Trigger',
            body: 'If your allergic trigger was identified, strictly avoid it:\n\n• Read food labels carefully\n• Inform restaurants about your allergy\n• Tell all healthcare providers\n• Avoid areas where your trigger may be present\n• Consider a medical alert bracelet',
        },
        {
            heading: 'Follow-Up',
            body: '• **Allergist appointment** within 2-4 weeks — for trigger testing and long-term management plan\n• **Primary care** follow-up within 1 week\n• Replace your EpiPen before the expiration date\n• Teach family members how to use your EpiPen',
        },
        {
            heading: 'Important Reminders',
            body: '• Allergic reactions can recur within 24-72 hours without new exposure (biphasic reaction)\n• Always carry TWO EpiPens — you may need a second dose\n• Never hesitate to use your EpiPen — the risk of not treating is far greater than the risk of the medication\n• If you used your EpiPen, ALWAYS go to the emergency department even if you feel better',
        },
    ],
    citations: [],
};
// -------------------------------------------------------------------
// Angioedema — Steps Summary
// -------------------------------------------------------------------
const ANGIO_STEPS_SUMMARY = {
    id: 'angio-steps-summary',
    title: 'Angioedema Steps Summary',
    subtitle: 'Quick-reference pathway through the Angioedema consult',
    sections: [
        {
            heading: 'Module 1 — Initial Assessment & Airway',
            body: '• [Assess airway: signs of compromise (stridor, voice change, dyspnea)?](#/node/angio-start)\n• [Secure airway: dual setup, awake fiberoptic, avoid RSI](#/node/angio-airway-secure)\n• [Monitor: supplemental O2, avoid positive pressure, frequent reassessment](#/node/angio-airway-monitor)',
        },
        {
            heading: 'Module 2 — Classification',
            body: '• [Classify: histamine-mediated (urticaria) vs bradykinin-mediated (no urticaria)](#/node/angio-classify)\n• [Bradykinin screen: ACEi? HAE? Post-tPA? Acquired? Idiopathic?](#/node/angio-bradykinin-screen)\n• [Undifferentiated: empiric histamine treatment, reassess in 30-60 min](#/node/angio-empiric)',
        },
        {
            heading: 'Module 3 — Histamine-Mediated Treatment',
            body: '• [Severity assessment: anaphylaxis features vs isolated angioedema](#/node/angio-histamine-treat)\n• [Anaphylaxis: epinephrine IM + H1/H2 blockers + methylprednisolone + IVF](#/node/angio-anaphy-treat)\n• [Isolated: antihistamines, observe 4-6 hours](#/node/angio-histamine-mild)',
        },
        {
            heading: 'Module 4 — Bradykinin-Mediated Treatment',
            body: '• [ACEi-induced: STOP ACEi, TXA or icatibant or FFP, observe](#/node/angio-acei-treat)\n• [HAE acute: C1-INH concentrate (Berinert) first-line, icatibant/ecallantide alternatives](#/node/angio-hae-treat)\n• [First presentation: send C4 level, treat empirically](#/node/angio-hae-new)\n• [Acquired angioedema: low C1q distinguishes from HAE, screen for malignancy](#/node/angio-aae)\n• [Post-tPA: icatibant or C1-INH, AVOID TXA](#/node/angio-tpa)\n• [Pediatric: smaller airway, C1-INH preferred, US over CT for abdominal](#/node/angio-peds)\n• [Pregnancy: Berinert preferred, variable disease course](#/node/angio-pregnancy)',
        },
        {
            heading: 'Module 5 — Abdominal Angioedema',
            body: '• [GI involvement in up to 73% of HAE — mimics acute abdomen](#/node/angio-abdominal)\n• [Treat underlying cause — improvement confirms diagnosis, avoid unnecessary surgery](#/node/angio-abdominal-treat)',
        },
        {
            heading: 'Module 6 — Disposition',
            body: '• [Ishoo staging: Stage 1-4 by anatomic location](#/node/angio-dispo)\n• [Stage 1-2 (face/lip/palate): observe 4-6h, discharge with precautions](#/node/angio-dispo-mild)\n• [Stage 3 (tongue/floor of mouth): admit for monitoring](#/node/angio-dispo-admit)\n• [Stage 4 (laryngeal): ICU — 67% require airway intervention](#/node/angio-dispo-icu)',
        },
    ],
    citations: [],
};
// -------------------------------------------------------------------
// Angioedema — Histamine vs Bradykinin Differentiation
// -------------------------------------------------------------------
const ANGIO_DIFFERENTIATION = {
    id: 'angio-differentiation',
    title: 'Histamine vs Bradykinin Angioedema',
    subtitle: 'Key differentiating features to guide treatment',
    sections: [
        {
            heading: 'Onset & Duration',
            body: '**Histamine-mediated:** Rapid onset (minutes to hours). Episodes typically resolve within 24-37 hours. [1]\n\n**Bradykinin-mediated:** Slow onset (evolves over hours to days). Episodes typically last 48-72 hours, occasionally up to 5 days. [1]',
        },
        {
            heading: 'Distribution',
            body: '**Histamine-mediated:** Diffuse, symmetric. Lips 30%, tongue 33%, eyelids 4%, larynx 3%, extremities 11%. [2]\n\n**Bradykinin-mediated:** Often focal and asymmetric. Tongue 42%, lips 24%, eyelids 2%, larynx 17%, extremities 4%. [2]',
        },
        {
            heading: 'Associated Skin Findings',
            body: '**Histamine-mediated:** Urticaria and/or pruritus often present. Flushing may occur.\n\n**Bradykinin-mediated:** NO urticaria or pruritus. HAE may cause erythema marginatum (non-pruritic erythematous rings on torso).',
        },
        {
            heading: 'Triggers',
            body: '**Histamine-mediated:** Allergic triggers — foods, insect stings, medications, environmental allergens. IgE type I hypersensitivity, direct mast cell degranulation (contrast, opioids), or COX inhibition (NSAIDs). [1]\n\n**Bradykinin-mediated:** Trauma, infections, stress, estrogens (pregnancy). ACEi use (any time from hours to 10+ years after starting). Often no obvious trigger.',
        },
        {
            heading: 'Systemic Involvement',
            body: '**Histamine-mediated:** Other organs commonly involved — hypotension, wheezing (strong indicator of histamine involvement), GI symptoms (nausea/vomiting, diarrhea). [1]\n\n**Bradykinin-mediated:** Usually does NOT involve other organs. GI involvement (bowel edema) may occur in HAE but often not synchronous with upper airway symptoms.',
        },
        {
            heading: 'Response to Treatment',
            body: '**Histamine-mediated:** Responds rapidly to epinephrine, antihistamines, and corticosteroids.\n\n**Bradykinin-mediated:** Does NOT respond to epinephrine, antihistamines, or corticosteroids. Requires targeted therapy: C1-INH concentrate, icatibant, TXA, or FFP.',
        },
    ],
    citations: [
        { num: 1, text: 'Bernstein JA, et al. Angioedema in the emergency department: a practical guide to differential diagnosis and management. Int J Emerg Med. 2017;10(1):15.' },
        { num: 2, text: 'Lenschow M, et al. A score for the differential diagnosis of bradykinin- and histamine-induced head and neck swellings. Eur Arch Otorhinolaryngol. 2018;275(7):1767-1773.' },
    ],
};
// -------------------------------------------------------------------
// Angioedema — Lab Interpretation
// -------------------------------------------------------------------
const ANGIO_LABS = {
    id: 'angio-labs',
    title: 'Angioedema Lab Interpretation',
    subtitle: 'Laboratory findings by angioedema type',
    sections: [
        {
            heading: 'C4 Level (Screening Test)',
            body: '**C4 is the best screening test for C1-INH-mediated angioedema.** [1]\n\n• **96% sensitive during an acute attack** (81% between attacks)\n• Low C4 found in: HAE Type 1, HAE Type 2, Acquired angioedema\n• Normal C4 in: HAE Type 3 (normal C1-INH), ACEi-induced, Idiopathic\n\n**Obtain C4 in the ED during acute attack** if personal/family history suggests HAE — testing is most sensitive during attacks.',
        },
        {
            heading: 'C1-INH Concentration (Antigen Level)',
            body: '• **HAE Type 1:** Low (<30%) — most common type (85% of HAE)\n• **HAE Type 2:** Normal — the protein is present but dysfunctional\n• **HAE Type 3:** Normal\n• **Acquired angioedema:** Low or normal\n• **ACEi-induced:** Normal\n• **Idiopathic:** Normal',
        },
        {
            heading: 'C1-INH Function',
            body: '• **HAE Type 1:** Low (<30%)\n• **HAE Type 2:** Low (<30%) — THIS is the key finding (normal antigen but low function)\n• **HAE Type 3:** Normal\n• **Acquired angioedema:** Low\n• **ACEi-induced:** Normal\n• **Idiopathic:** Normal',
        },
        {
            heading: 'C1q Level',
            body: '**C1q distinguishes HAE from Acquired Angioedema (AAE):** [2]\n\n• **HAE (all types):** Normal C1q\n• **Acquired angioedema:** Low C1q (in ~75% of patients) — the KEY differentiator\n• **ACEi-induced:** Normal\n• **Idiopathic:** Normal',
        },
        {
            heading: 'Other Labs',
            body: '**Tryptase:** Elevated in anaphylaxis/histamine-mediated angioedema (but NOT always — may be normal even in severe cases). Not elevated in bradykinin-mediated angioedema. Draw within 1-4 hours of symptom onset. [1]\n\n**Paraprotein:** Present in most acquired angioedema cases (associated with lymphoproliferative disorders).\n\n**CRP:** Some studies suggest elevation in ACEi-induced angioedema, but not widely adopted for diagnosis.\n\n**NOTE:** There is no rapid point-of-care test to definitively diagnose the type of angioedema in the ED. Definitive testing requires days to weeks.',
        },
    ],
    citations: [
        { num: 1, text: 'Wilkerson RG, Winters ME. Angiotensin-converting enzyme inhibitor-induced angioedema. Immunol Allergy Clin North Am. 2023;43(3):513-532.' },
        { num: 2, text: 'Kesh S, Bernstein JA. Isolated angioedema: a review of classification and update on management. Ann Allergy Asthma Immunol. 2022;129(6):692-702.' },
    ],
};
// -------------------------------------------------------------------
// Angioedema — Ishoo Staging & Disposition
// -------------------------------------------------------------------
const ANGIO_ISHOO_STAGING = {
    id: 'angio-ishoo-staging',
    title: 'Ishoo Staging & Disposition',
    subtitle: 'Predicting airway risk and disposition based on anatomic location',
    sections: [
        {
            heading: 'Modified Ishoo Staging System',
            body: '**Stage 1:** Facial rash, facial edema, lip edema\n**Stage 2:** Soft palate edema\n**Stage 3:** Tongue edema, floor of mouth edema\n**Stage 4:** Laryngeal edema (voice change, hoarseness, stridor, dyspnea)',
        },
        {
            heading: 'Disposition Probabilities (Das 2021, n=320)',
            body: '**Stage 1:**\n• ED discharge: 85%\n• Admission without airway intervention: 2.5%\n• Airway intervention: 0.1%\n\n**Stage 2:**\n• ED discharge: 65%\n• Admission without airway intervention: 8%\n• Airway intervention: 1%\n\n**Stage 3:**\n• ED discharge: 30%\n• Admission without airway intervention: 12%\n• Airway intervention: 8%\n\n**Stage 4:**\n• ED discharge: 0%\n• ICU without airway intervention: 17%\n• Airway intervention: 67% [1][2]',
        },
        {
            heading: 'Key Clinical Correlations',
            body: '• Voice change, hoarseness, dyspnea, and stridor are significantly correlated with need for ICU admission [1]\n• Voice change, hoarseness, dyspnea, and stridor predict need for airway intervention [1]\n• **Edema localized to lips alone = low intubation risk** [1][2]\n• Approximately 40-60% of all angioedema patients are admitted for observation',
        },
        {
            heading: 'General Disposition Recommendations',
            body: '• **All patients:** Strict return precautions if symptoms worsen or airway compromise develops\n• **All patients:** PCP follow-up recommended (ideally next day)\n• **Allergic/immunologic component:** Short course of antihistamines + epinephrine autoinjector\n• **ACEi-induced:** Discontinue ACEi permanently, PCP for alternative antihypertensive\n• **Known HAE:** Discharge with targeted therapy for recurrence prevention, refer to allergist/immunologist\n• **Unknown cause:** Send C4 level (from ED or via PCP), refer for further evaluation',
        },
    ],
    citations: [
        { num: 1, text: 'Ishoo E, et al. Predicting airway risk in angioedema: staging system based on presentation. Otolaryngol Head Neck Surg. 1999;121(3):263-268.' },
        { num: 2, text: 'Das C, et al. Evaluation of staging criteria for disposition and airway intervention in emergency department angioedema patients. Acute Med Surg. 2021;8(1):e704.' },
    ],
};
// -------------------------------------------------------------------
// Angioedema — HAE Classification & Triggers
// -------------------------------------------------------------------
const ANGIO_HAE_TYPES = {
    id: 'angio-hae-types',
    title: 'HAE Classification & Triggers',
    subtitle: 'Hereditary angioedema subtypes and precipitating factors',
    sections: [
        {
            heading: 'HAE Type 1 (85% of HAE)',
            body: '**Deficient C1-INH level** (<30% of normal).\n\nMost common form. Autosomal dominant inheritance — but 25% arise from de novo mutations (no family history). Prevalence: 1:100,000 to 1:150,000.\n\nLab findings: Low C4, Low C1-INH antigen, Low C1-INH function, Normal C1q.',
        },
        {
            heading: 'HAE Type 2 (15% of HAE)',
            body: '**Normal C1-INH level but decreased C1-INH function** (<30% of normal).\n\nThe protein is present but dysfunctional. Key diagnostic clue: normal C1-INH antigen but low C1-INH function.\n\nLab findings: Low C4, Normal C1-INH antigen, Low C1-INH function, Normal C1q.',
        },
        {
            heading: 'HAE Type 3 (Rare — Normal C1-INH)',
            body: 'Previously known as "HAE with normal C1-INH." Linked to genetic mutations in:\n• Factor XII (increases prekallikrein \u2192 kallikrein conversion)\n• Angiopoietin-1\n• Plasminogen gene\n\nClinically associated with predominantly tongue edema. All complement levels are normal — diagnosis requires genetic testing. C1-INH concentrate efficacy is variable. [1]',
        },
        {
            heading: 'Acquired Angioedema (AAE)',
            body: 'Very rare (~1.5 per million). Typically presents after age 40. Acquired C1-INH deficiency.\n\n**Type I:** Associated with lymphoproliferative disorders (CLL, NHL, Waldenstrom, MGUS). Due to increased consumption of C1-INH.\n\n**Type II:** Associated with autoimmune disease (lupus). Due to autoantibodies against C1-INH.\n\n**Key differentiator from HAE:** Low C1q (normal in HAE, low in ~75% of AAE). [1]',
        },
        {
            heading: 'Common Triggers for HAE Attacks',
            body: '• **Infection** (most common trigger in adults — bacterial; in children — viral)\n• **Trauma** (dental procedures, surgery)\n• **Emotional stress**\n• **Estrogens** (oral contraceptives, pregnancy — enhance bradykinin signaling)\n• **Physical stimuli** (cold, pressure, vibration)\n• **Medications** (ACE inhibitors can unmask/worsen subclinical HAE)',
        },
        {
            heading: 'Key Facts',
            body: '• 50-75% of HAE patients have first attack by age 12 (mean onset 5-11 years)\n• 25% of cases arise from de novo mutations — no family history\n• Up to 44% of HAE patients are initially misdiagnosed\n• GI involvement in up to 73% — can mimic acute abdomen\n• Mean delay to diagnosis: 8-10 years',
        },
    ],
    citations: [
        { num: 1, text: 'Kesh S, Bernstein JA. Isolated angioedema: a review of classification and update on management. Ann Allergy Asthma Immunol. 2022;129(6):692-702.' },
    ],
};
// -------------------------------------------------------------------
// Angioedema — Discharge Instructions
// -------------------------------------------------------------------
const ANGIO_DISCHARGE = {
    id: 'angio-discharge',
    title: 'Angioedema Discharge Instructions',
    subtitle: 'Patient information and return precautions',
    shareable: true,
    sections: [
        {
            heading: 'What is Angioedema?',
            body: 'You had swelling beneath the skin, called angioedema. This can be caused by an allergic reaction, a medication side effect, or a genetic condition. Your emergency team treated your swelling and monitored you to make sure it improved.',
        },
        {
            heading: 'Return to the Emergency Department Immediately If',
            body: '• Your swelling returns or gets worse\n• You develop a change in your voice or hoarseness\n• You have difficulty breathing or swallowing\n• You develop swelling of your tongue or throat\n• You feel lightheaded, dizzy, or faint\n• You develop a widespread rash or hives with difficulty breathing',
        },
        {
            heading: 'If You Were Taking an ACE Inhibitor',
            body: 'Your blood pressure medication (such as lisinopril, enalapril, ramipril, or benazepril) may have caused your swelling. This is a side effect, not an allergy.\n\n**You must STOP this medication permanently.** Do NOT restart it or take any other ACE inhibitor.\n\nContact your primary care doctor within 1-2 days to discuss a different blood pressure medication. There are many safe alternatives available.',
        },
        {
            heading: 'If You Were Given an Epinephrine Auto-Injector',
            body: 'You have been prescribed an epinephrine auto-injector (such as an EpiPen). Carry it with you at all times. If you develop sudden swelling, hives, or difficulty breathing, use it immediately and call 911.',
        },
        {
            heading: 'Follow-Up',
            body: '• See your primary care doctor within 1-2 days\n• If a hereditary or genetic cause is suspected, you may be referred to an allergist or immunologist for further testing\n• Keep a record of your episodes — note what you were eating, doing, or taking before the swelling started',
        },
    ],
    citations: [],
};
// -------------------------------------------------------------------
// Angioedema — ACEi Alternative Medications
// -------------------------------------------------------------------
const ANGIO_ACEI_ALTERNATIVES = {
    id: 'angio-acei-alternatives',
    title: 'ACEi Alternative Medications',
    subtitle: 'Blood pressure management after ACEi-induced angioedema',
    sections: [
        {
            heading: 'ACEi-Induced Angioedema — Key Points',
            body: '• ACEi-induced angioedema is a **class effect** — ALL ACE inhibitors carry this risk\n• It is **NOT dose-dependent** — symptoms can occur at any dose, hours to years after starting\n• The patient must **discontinue ALL ACE inhibitors permanently** [1]',
        },
        {
            heading: 'Angiotensin Receptor Blockers (ARBs)',
            body: 'ARBs (losartan, valsartan, irbesartan, candesartan, etc.) have historically been quoted as having ~10% cross-reactivity with ACEi for angioedema. However, more recent data suggest the risk is much lower.\n\nARBs do NOT inhibit ACE directly (they block the angiotensin II receptor), so bradykinin accumulation is less of a concern. ARBs may be considered as an alternative antihypertensive, but this decision should be made by the patient\'s primary care provider with close monitoring, not in the ED. [1]',
        },
        {
            heading: 'Alternative Antihypertensive Classes',
            body: '• **Calcium channel blockers** (amlodipine, nifedipine) — no cross-reactivity concern\n• **Thiazide diuretics** (hydrochlorothiazide, chlorthalidone) — first-line per JNC guidelines\n• **Beta-blockers** (metoprolol, carvedilol) — no cross-reactivity concern\n• **Direct renin inhibitors** (aliskiren) — CAUTION: may also affect bradykinin metabolism\n\n**The choice of alternative should be made by the patient\'s PCP** based on comorbidities, not in the ED.',
        },
        {
            heading: 'ED Discharge Counseling',
            body: '• Stop the ACEi today — do not take any more doses\n• Follow up with PCP within 1-2 days for medication adjustment\n• Inform the patient this is a side effect (not an allergy) — document as "ACEi intolerance" not "ACEi allergy" in the medical record\n• Educate that angioedema can recur even after stopping the ACEi (rare, usually within first few weeks)',
        },
    ],
    citations: [
        { num: 1, text: 'Rosenbaum S, et al. Clinical practice statement: what is the emergency department management of patients with angioedema secondary to an ACE-inhibitor? J Emerg Med. 2021;61(1):105-112.' },
    ],
};
// -------------------------------------------------------------------
// Syphilis
// -------------------------------------------------------------------
const SYPH_STEPS_SUMMARY = {
    id: 'syph-steps-summary',
    title: 'Syphilis ED Evaluation \u2014 Steps Summary',
    subtitle: 'Quick Reference Flowchart',
    sections: [
        {
            heading: 'Initial Assessment',
            body: '\u2022 [Identify presentation and chief complaint](#/node/syph-start)\n\u2022 [Screen for neurologic, ocular, or otic symptoms](#/node/syph-neuro-screen)\n\u2022 [Assess for pregnancy and congenital risk](#/node/syph-pregnancy)',
        },
        {
            heading: 'Stage Classification',
            body: '\u2022 [Classify by stage: primary, secondary, early latent, late latent, tertiary](#/node/syph-stage-classify)\n\u2022 [Primary: painless chancre, 10-90 days after exposure](#/node/syph-primary-exam)\n\u2022 [Secondary: rash (palms/soles), condylomata lata, systemic symptoms](#/node/syph-secondary-exam)\n\u2022 [Tertiary: gummatous, cardiovascular \u2014 rule out neurosyphilis](#/node/syph-tertiary)',
        },
        {
            heading: 'Testing',
            body: '\u2022 [Risk factor assessment and co-testing (HIV, GC/CT, Hep B/C)](#/node/syph-risk-factors)\n\u2022 [Order RPR (quantitative) + treponemal test](#/node/syph-ed-orders)\n\u2022 [Interpret NTT/TT combination in clinical context](#/node/syph-test-interpret)',
        },
        {
            heading: 'Treatment',
            body: '\u2022 [Early syphilis: Benzathine PCN-G 2.4M IM \u00D7 1](#/node/syph-treat-early)\n\u2022 [Late syphilis: Benzathine PCN-G 2.4M IM weekly \u00D7 3](#/node/syph-treat-late)\n\u2022 [Neurosyphilis: IV Penicillin G \u00D7 10-14 days](#/tree/neurosyphilis)\n\u2022 [PCN allergy: Doxycycline or Ceftriaxone alternatives](#/node/syph-pcn-allergy)\n\u2022 [Pregnancy: PCN ONLY \u2014 desensitize if allergic](#/node/syph-treat-pregnancy)',
        },
        {
            heading: 'Disposition',
            body: '\u2022 [Discharge: mandatory reporting, partner notification, RPR follow-up](#/node/syph-discharge)\n\u2022 [Admit: neurosyphilis, ocular/otic, desensitization, pregnancy complications](#/node/syph-admit)',
        },
    ],
    citations: [
        { num: 1, text: 'Hazra A, et al. CDC STI Treatment Guidelines, 2021. JAMA. 2022;327(9):870-871.' },
    ],
};
const SYPH_STAGES = {
    id: 'syph-stages',
    title: 'Syphilis Stage Classification',
    subtitle: 'Clinical Features by Stage',
    sections: [
        {
            heading: 'Primary Syphilis',
            body: '**Incubation:** 10-90 days (average 21 days)\n\n**Classic presentation:** Single, painless, firm, round, indurated ulcer (chancre) at the site of inoculation. Clean base, raised edges.\n\n**Key features:**\n\u2022 Usually single \u2014 multiple chancres possible (especially HIV+)\n\u2022 Sites: penis, vulva, cervix, anus, mouth, fingers\n\u2022 Bilateral painless inguinal lymphadenopathy in ~70%\n\u2022 Heals spontaneously in 3-6 weeks even without treatment\n\u2022 Often unnoticed by patient (painless, may be in non-visible location)\n\n**Atypical:** Painful, multiple, or atypical-appearing lesions can occur',
        },
        {
            heading: 'Secondary Syphilis',
            body: '**Timing:** 4-10 weeks after chancre (which may still be present)\n\n**Rash:** Diffuse, symmetric, maculopapular. Red to red-brown, flat, scaly. Classically involves **palms and soles** (50-80%). Non-pruritic. Can be difficult to identify on darker skin.\n\n**Other findings:**\n\u2022 **Condylomata lata:** moist, flat, broad-based lesions in warm/moist areas \u2014 highly infectious\n\u2022 **Mucous patches:** painless, silvery-gray oral/genital erosions\n\u2022 **Moth-eaten alopecia:** patchy, non-scarring hair loss\n\u2022 **Malignant syphilis (lues maligna):** rare \u2014 cutaneous ulcers with central necrosis\n\n**Systemic:** fever, malaise, weight loss, lymphadenopathy, arthralgias, hepatitis, uveitis\n\nResolves in 3-12 weeks untreated \u2192 enters latent phase',
        },
        {
            heading: 'Latent Syphilis',
            body: '**Asymptomatic** \u2014 diagnosed by serologic testing only.\n\n**Early latent (< 1 year):** Documented seroconversion or exposure within 12 months. Still sexually transmissible \u2014 ~25% may relapse to secondary.\n\n**Late latent (> 1 year or unknown):** Not sexually transmissible (except vertical in pregnancy). Can progress to tertiary in ~30% untreated. If timing unknown \u2192 classified as late latent (conservative treatment).',
        },
        {
            heading: 'Tertiary Syphilis',
            body: '**Timing:** 3-15+ years after initial infection. Rare in developed countries.\n\n**Gummatous (~15%):** Granulomatous nodular lesions \u2014 skin, bone, liver, testes. Destructive but treatable.\n\n**Cardiovascular (~10%):** Aortitis, ascending aortic aneurysm, aortic regurgitation, coronary ostial stenosis. Typically 15-30 years post-infection.\n\n**Neurosyphilis:** Can occur at any stage. See [Neurosyphilis Evaluation](#/tree/neurosyphilis).',
        },
        {
            heading: 'Congenital Syphilis',
            body: 'Vertical transmission from infected mother to fetus. Higher risk with primary/secondary syphilis in pregnancy but can occur at any stage.\n\n**Early congenital (< 2 years):** hepatosplenomegaly, rash, rhinitis (\'snuffles\'), pseudoparalysis, osteochondritis, anemia, low birthweight\n\n**Late congenital (> 2 years):** Hutchinson teeth, interstitial keratitis, eighth nerve deafness (Hutchinson triad), saber shins, saddle nose, frontal bossing\n\n12% higher risk for miscarriage, preterm labor, or stillbirth. ~40% of infected newborns are symptomatic at birth. [3]',
        },
    ],
    citations: [
        { num: 1, text: 'NYC DOHMH. Diagnosis, management, and prevention of syphilis. 2019.' },
        { num: 3, text: 'Eppes CS, et al. Syphilis in pregnancy. Am J Obstet Gynecol. 2022;227(6):822-838.' },
    ],
};
const SYPH_TESTING_ALGORITHM = {
    id: 'syph-testing-algorithm',
    title: 'Syphilis Testing Algorithms',
    subtitle: 'Traditional vs Reverse Sequence',
    sections: [
        {
            heading: 'Traditional Algorithm (NTT First)',
            body: '1. **Screen with NTT** (RPR or VDRL)\n2. If reactive \u2192 **confirm with TT** (TP-PA, FTA-ABS)\n3. Both reactive \u2192 **active or past syphilis** \u2014 quantitative RPR for staging\n4. NTT reactive + TT nonreactive \u2192 **biologic false positive**\n\n**Advantages:** NTT provides quantitative titers for monitoring. Cost-effective screening.\n**Limitations:** May miss early primary (NTT not yet reactive) and late latent (NTT may revert).',
        },
        {
            heading: 'Reverse Sequence Algorithm (TT First)',
            body: '1. **Screen with TT** (EIA or CIA \u2014 automated, high-throughput)\n2. If reactive \u2192 **reflex NTT** (RPR)\n3. Both reactive \u2192 **active or past syphilis**\n4. TT reactive + NTT nonreactive \u2192 **confirm with second, different TT**\n   \u2022 Second TT reactive \u2192 prior treated or late latent\n   \u2022 Second TT nonreactive \u2192 likely false-positive initial TT\n\n**Advantages:** Higher sensitivity for early primary and late latent. Automated testing.\n**Limitations:** Cannot distinguish active from past infection with TT alone.',
        },
        {
            heading: 'Serologic Timeline',
            body: '**Nontreponemal tests (RPR/VDRL):**\n\u2022 Become reactive 3-4 weeks after infection (1-2 weeks after chancre)\n\u2022 Peak during secondary syphilis\n\u2022 Decline after treatment (4-fold drop = cure)\n\u2022 May decline even without treatment in late disease\n\u2022 ~10% remain low-titer positive for life (serofast state)\n\n**Treponemal tests (TP-PA/FTA-ABS):**\n\u2022 Seroconvert slightly earlier than NTTs\n\u2022 Remain positive for **life** regardless of treatment\n\u2022 Cannot monitor treatment response\n\n**Window period:** Both tests may be nonreactive in up to **30%** of primary syphilis. If clinical suspicion is high and both negative \u2192 treat empirically and repeat in 2-4 weeks.',
        },
        {
            heading: 'Key Pitfalls',
            body: '\u2022 **Prozone phenomenon:** Very high NTT titers in secondary syphilis can saturate the assay \u2192 false negative. Request diluted RPR if clinically suspected.\n\u2022 **BFP (biologic false positive):** NTT reactive + TT nonreactive. Causes: pregnancy, SLE, IVDU, HIV, vaccination, liver disease.\n\u2022 **Serofast state:** ~10% of treated patients maintain persistently low NTT titers despite adequate treatment.\n\u2022 **RPR vs VDRL:** Not interchangeable. RPR titers run slightly higher. Always compare same test type. [6]',
        },
    ],
    citations: [
        { num: 6, text: 'Papp JR, et al. CDC Laboratory Recommendations for Syphilis Testing, 2024. MMWR. 2024;73(1):1-32.' },
    ],
};
const SYPH_TREATMENT_TABLE = {
    id: 'syph-treatment-table',
    title: 'Syphilis Treatment Summary',
    subtitle: 'By Stage With Drug Links',
    sections: [
        {
            heading: 'Primary / Secondary / Early Latent',
            body: '**First-line:** [Benzathine Penicillin G](#/drug/benzathine-penicillin/primary) 2.4 million units IM \u00D7 **1 dose**\n\n**PCN allergy (non-pregnant):**\n\u2022 [Doxycycline](#/drug/doxycycline/primary) 100 mg PO BID \u00D7 14 days\n\u2022 [Ceftriaxone](#/drug/ceftriaxone/neurosyphilis) 1-2g IM/IV daily \u00D7 10-14 days (limited data)\n\n**Follow-up:** RPR at 6 and 12 months. Expect 4-fold titer decline.',
        },
        {
            heading: 'Late Latent / Tertiary (Non-Neurologic)',
            body: '**First-line:** [Benzathine Penicillin G](#/drug/benzathine-penicillin/late latent) 2.4 million units IM weekly \u00D7 **3 weeks** (total 7.2M units)\n\n\u2022 Missed dose > 14 days \u2192 restart 3-dose series\n\u2022 Rule out neurosyphilis before treating (especially if RPR \u2265 1:32 or HIV+)\n\n**PCN allergy (non-pregnant):**\n\u2022 [Doxycycline](#/drug/doxycycline/late latent) 100 mg PO BID \u00D7 28 days\n\u2022 Must exclude neurosyphilis first (doxycycline has poor CSF penetration)\n\n**Follow-up:** RPR at 6, 12, and 24 months.',
        },
        {
            heading: 'Neurosyphilis / Ocular / Otic',
            body: '**First-line:** [Penicillin G IV](#/drug/penicillin-g-iv/neurosyphilis) 18-24 million units/day (3-4M units q4h) \u00D7 10-14 days\n\n**Alternative:** [Procaine Penicillin](#/drug/procaine-penicillin/neurosyphilis) 2.4M units IM daily + Probenecid 500mg PO QID \u00D7 10-14 days\n\n**PCN allergy:** [Ceftriaxone](#/drug/ceftriaxone/neurosyphilis) 2g IV daily \u00D7 10-14 days (limited data)\n\nSee [Neurosyphilis Evaluation](#/tree/neurosyphilis) for full workup.\n\n**Follow-up:** CSF re-examination at 6 months.',
        },
        {
            heading: 'Pregnancy (Any Stage)',
            body: '**Penicillin is the ONLY acceptable treatment.**\n\nSame dosing as non-pregnant by stage. If PCN-allergic \u2192 **desensitization is mandatory** (no alternatives proven for congenital syphilis prevention).\n\nMonitor for Jarisch-Herxheimer reaction with fetal monitoring \u00D7 24h if viable gestational age.\n\nInadequate for preventing congenital syphilis:\n\u2022 Non-penicillin regimen used\n\u2022 Treatment < 30 days before delivery\n\u2022 No documented 4-fold titer decline',
        },
        {
            heading: 'Doxycycline Post-Exposure Prophylaxis (DoxyPEP)',
            body: '**Emerging evidence (not yet standard practice):**\n\nSingle 200mg oral doxycycline dose within 72 hours (preferably 24 hours) of unprotected intercourse reduced syphilis by 87% in the DoxyPEP trial (MSM and transgender women). [42][43]\n\nFurther research needed before becoming standard recommendation.',
        },
    ],
    citations: [
        { num: 5, text: 'Hazra A, et al. CDC STI Treatment Guidelines, 2021. JAMA. 2022;327(9):870-871.' },
        { num: 42, text: 'Luetkemeyer AF, et al. Postexposure doxycycline to prevent bacterial STIs. N Engl J Med. 2023;388(14):1296-1306.' },
        { num: 43, text: 'Molina JM, et al. Doxycycline PEP in MSM. Lancet Infect Dis. 2018;18(3):308-317.' },
    ],
};
const SYPH_JARISCH_HERXHEIMER = {
    id: 'syph-jarisch-herxheimer',
    title: 'Jarisch-Herxheimer Reaction',
    subtitle: 'Treatment-Related Immune Response',
    sections: [
        {
            heading: 'Mechanism',
            body: 'Acute febrile reaction caused by **cytokine release from dying spirochetes** after treatment initiation. This is NOT an allergic reaction \u2014 it is an inflammatory immune response to treatment.\n\nDo NOT withhold future doses of treatment.',
        },
        {
            heading: 'Incidence by Stage',
            body: '\u2022 **Primary syphilis:** 10-35%\n\u2022 **Secondary syphilis:** 75-90%\n\u2022 **Late/latent syphilis:** uncommon but possible\n\nMore common with higher spirochete burden.',
        },
        {
            heading: 'Clinical Features',
            body: '**Timing:** Onset 2-8 hours after treatment, resolves within 24 hours.\n\n**Symptoms:**\n\u2022 Fever, rigors, chills\n\u2022 Headache, myalgias, arthralgias\n\u2022 Tachycardia, mild hypotension\n\u2022 Flushing, worsening of existing rash\n\n**Treatment:** Supportive care only\n\u2022 Antipyretics (acetaminophen, NSAIDs)\n\u2022 Oral fluids\n\u2022 Rest\n\u2022 Reassurance \u2014 self-limited',
        },
        {
            heading: 'Pregnancy Considerations',
            body: 'Jarisch-Herxheimer reaction can precipitate:\n\u2022 **Preterm contractions** and labor\n\u2022 **Fetal distress** (variable decelerations)\n\u2022 Rarely, fetal demise\n\n**Management:**\n\u2022 Continuous fetal monitoring \u00D7 24 hours if viable gestational age\n\u2022 OB consultation before or immediately after treatment\n\u2022 **Should NOT prevent or delay treatment** \u2014 untreated syphilis poses greater risk to fetus\n\nTreatment earlier in pregnancy (especially first trimester) is associated with better fetal outcomes and lower Jarisch-Herxheimer severity.',
        },
    ],
    citations: [
        { num: 1, text: 'NYC DOHMH. Diagnosis, management, and prevention of syphilis. 2019.' },
    ],
};
const SYPH_PARTNER_NOTIFICATION = {
    id: 'syph-partner-notification',
    title: 'Partner Notification & Reporting',
    subtitle: 'Public Health Requirements',
    shareable: true,
    sections: [
        {
            heading: 'Mandatory Reporting',
            body: 'Syphilis is a **reportable sexually transmitted infection in all 50 US states**.\n\nAll positive cases must be reported to the state or local public health department.\n\nProvide accurate patient contact information \u2014 public health agencies conduct partner notification and facilitate treatment.',
        },
        {
            heading: 'Contact Tracing Windows',
            body: 'Evaluate and test sexual partners within these exposure windows:\n\n\u2022 **Primary syphilis:** 3 months + symptom duration\n\u2022 **Secondary syphilis:** 6 months + symptom duration\n\u2022 **Early latent:** 1 year\n\n**Presumptive treatment:** Partners exposed within 90 days should be treated presumptively, even if seronegative (may be in window period).\n\n**Partners exposed > 90 days ago:** Test and treat based on results.',
        },
        {
            heading: 'Patient Counseling',
            body: '**During treatment:**\n\u2022 Avoid all sexual contact until **7 days after treatment** AND until all lesions have fully resolved\n\u2022 Syphilis lesions are infectious \u2014 any skin contact can spread the disease\n\n**Prevention:**\n\u2022 Consistent condom use reduces transmission risk (but does not eliminate it \u2014 lesions outside the condom area can transmit)\n\u2022 Regular STI screening for high-risk individuals\n\u2022 Monogamous sexual relationships lower risk\n\u2022 If on PrEP for HIV: test for syphilis at least every 6 months\n\n**Follow-up:**\n\u2022 Return for RPR testing at 6, 12, and 24 months\n\u2022 Return immediately if new symptoms develop (vision changes, hearing changes, neurologic symptoms, new rash or lesion)\n\n**Jarisch-Herxheimer reaction:** Fever, body aches, and worsening rash may occur within 24 hours of treatment. This is expected and self-limited. Take acetaminophen for comfort. Seek care if symptoms are severe.',
        },
    ],
    citations: [
        { num: 5, text: 'Hazra A, et al. CDC STI Treatment Guidelines, 2021. JAMA. 2022;327(9):870-871.' },
    ],
};
const SYPH_CONGENITAL = {
    id: 'syph-congenital',
    title: 'Congenital Syphilis',
    subtitle: 'Prevention, Recognition, and Consequences',
    sections: [
        {
            heading: 'Epidemiology',
            body: 'Congenital syphilis cases in the US have increased **755% from 2012 to 2022** (from ~335 to 3,761 cases), with **282 stillbirths and infant deaths** in 2022 alone. [3][4]\n\nThis increase mirrors rising syphilis rates among reproductive-age women and reflects gaps in prenatal screening and treatment.',
        },
        {
            heading: 'Risk of Transmission',
            body: '\u2022 **Primary/secondary syphilis in pregnancy:** highest vertical transmission risk (60-100%)\n\u2022 **Early latent:** moderate risk (40%)\n\u2022 **Late latent:** lower but still present (10%)\n\nRisk is reduced by:\n\u2022 Treatment before or early in pregnancy (ideally first trimester \u2014 0% congenital syphilis if treated in first trimester in a Chinese cohort of 682 patients) [11]\n\u2022 Treatment \u2265 30 days before delivery\n\u2022 Documented 4-fold titer decline after treatment',
        },
        {
            heading: 'Early Congenital Syphilis (< 2 years)',
            body: 'Approximately **40% of infected newborns are symptomatic at birth.**\n\n**Clinical findings:**\n\u2022 Hepatosplenomegaly\n\u2022 Diffuse rash, desquamation\n\u2022 Rhinitis (\'snuffles\') \u2014 bloody/mucoid nasal discharge\n\u2022 Pseudoparalysis of Parrot (painful limb immobility from osteochondritis)\n\u2022 Anemia, thrombocytopenia\n\u2022 Low birthweight, failure to thrive\n\u2022 Jaundice, nephrotic syndrome\n\n**Neurologic:** Seizures, cranial nerve deficits, hearing loss, blindness',
        },
        {
            heading: 'Late Congenital Syphilis (> 2 years)',
            body: '**Hutchinson Triad:**\n1. **Hutchinson teeth** \u2014 smaller, widely spaced teeth with notching along biting surface\n2. **Interstitial keratitis** \u2014 corneal inflammation causing pain, photophobia, vision loss\n3. **Eighth nerve deafness** \u2014 sensorineural hearing loss\n\n**Other findings:**\n\u2022 **Saber shins** \u2014 anterior tibial bowing from periostitis\n\u2022 **Saddle nose** \u2014 nasal bridge collapse from cartilage destruction\n\u2022 **Frontal bossing** \u2014 prominent forehead\n\u2022 **Clutton joints** \u2014 painless bilateral knee effusions\n\u2022 **Mulberry molars** \u2014 defective first molars',
        },
        {
            heading: 'Prevention',
            body: '**Screen ALL pregnant women:**\n\u2022 First prenatal visit\n\u2022 Third trimester (28 weeks)\n\u2022 At delivery (in high-prevalence areas)\n\n**Treatment:** Penicillin is the ONLY acceptable treatment in pregnancy. Desensitize if allergic.\n\n**Inadequate treatment (infant at risk):**\n\u2022 Mother received non-penicillin regimen\n\u2022 Treatment completed < 30 days before delivery\n\u2022 No documented 4-fold titer decline\n\u2022 No treatment during pregnancy\n\n**Newborn treatment:** Aqueous crystalline penicillin G 50,000 units/kg IV q12h (< 7 days old) or q8h (> 7 days) \u00D7 10 days.',
        },
    ],
    citations: [
        { num: 3, text: 'Eppes CS, et al. Syphilis in pregnancy. Am J Obstet Gynecol. 2022;227(6):822-838.' },
        { num: 4, text: 'CDC. STI Surveillance, 2024 (provisional). 2025.' },
        { num: 11, text: 'Wan Z, et al. Maternal syphilis treatment and pregnancy outcomes. BMC Pregnancy Childbirth. 2020;20(1):648.' },
    ],
};
const SYPH_GENITAL_DDX = {
    id: 'syph-genital-ddx',
    title: 'Differential Diagnosis of Genital Lesions',
    subtitle: 'Syphilis vs Other Causes',
    sections: [
        {
            heading: 'Infectious Causes',
            body: '**Syphilis (T. pallidum):**\n\u2022 Painless, firm, indurated ulcer (chancre)\n\u2022 Usually single, clean base\n\u2022 Bilateral painless lymphadenopathy\n\u2022 Heals in 3-6 weeks\n\n**Herpes Simplex (HSV-1/2):**\n\u2022 **Painful**, grouped vesicles on erythematous base\n\u2022 May coalesce into shallow ulcers\n\u2022 Recurrent episodes common\n\u2022 Tender inguinal lymphadenopathy\n\n**Chancroid (H. ducreyi):**\n\u2022 **Painful**, ragged, undermined ulcer with purulent base\n\u2022 Soft, non-indurated edges\n\u2022 Unilateral tender inguinal bubo (may suppurate)\n\u2022 Rare in US\n\n**Lymphogranuloma Venereum (Chlamydia L1-L3):**\n\u2022 Small painless papule/ulcer (often unnoticed) \u2192 heals\n\u2022 Followed by painful unilateral inguinal/femoral lymphadenopathy (2-6 weeks later)\n\u2022 \'Groove sign\' \u2014 enlarged nodes above and below inguinal ligament\n\n**Granuloma Inguinale (Donovanosis):**\n\u2022 Painless, progressive, beefy-red granulomatous ulcer\n\u2022 Bleeds easily on contact\n\u2022 Rare in US',
        },
        {
            heading: 'Non-Infectious Causes',
            body: '**Fixed drug eruption:**\n\u2022 Recurrent, well-demarcated round lesion in same location\n\u2022 Often related to NSAIDs, tetracyclines, sulfonamides\n\n**Beh\u00E7et disease:**\n\u2022 Recurrent painful oral AND genital ulcers\n\u2022 Associated with uveitis, skin lesions, pathergy\n\n**Traumatic ulcer:**\n\u2022 History of trauma, friction, or sexual activity\n\u2022 Irregular borders, painful\n\n**Squamous cell carcinoma:**\n\u2022 Persistent, non-healing ulcer or nodule\n\u2022 Irregular borders, induration\n\u2022 Risk factors: HPV, immunosuppression\n\u2022 Biopsy indicated for non-healing lesions > 4 weeks',
        },
        {
            heading: 'Clinical Pearl',
            body: '**When in doubt, test for syphilis.** The chancre of primary syphilis is painless and often missed. Consider syphilis testing in ANY sexually active patient with a genital lesion, especially in high-risk populations (MSM, HIV+, PrEP users).\n\nMultiple STIs can coexist \u2014 always test for HIV, GC/CT, and syphilis together.',
        },
    ],
    citations: [
        { num: 1, text: 'NYC DOHMH. Diagnosis, management, and prevention of syphilis. 2019.' },
    ],
};
// -------------------------------------------------------------------
// Sickle Cell Disease
// -------------------------------------------------------------------
const SCD_STEPS_SUMMARY = {
    id: 'scd-steps-summary',
    title: 'SCD Management Steps Summary',
    subtitle: 'Quick-reference — jump to any pathway',
    sections: [
        {
            heading: 'Initial Assessment',
            body: '• [Identify SCD genotype, baseline Hgb, prior complications](#/node/scd-start)\n• Check for individualized pain plan from hematology\n• Use SCD Triage Calculator to classify presentation',
        },
        {
            heading: 'VOC Pain Crisis',
            body: '• [IN Fentanyl at triage BEFORE IV access](#/node/scd-voc-triage)\n• [IV Ketorolac + opioid (Morphine, Hydromorphone, or Fentanyl)](#/node/scd-voc-iv)\n• [NS bolus 10 mL/kg + incentive spirometry (prevents ACS)](#/node/scd-voc-iv)\n• [Reassess q30 min × 3 doses → PO transition or admit](#/node/scd-voc-reassess)',
        },
        {
            heading: 'Fever (Emergency)',
            body: '• [Blood culture BEFORE antibiotics — always](#/node/scd-fever-workup)\n• [Ceftriaxone 50 mg/kg IV IMMEDIATELY](#/node/scd-fever-abx)\n• [Add Vancomycin if meningitis concern](#/node/scd-fever-meningitis)\n• [CXR if any respiratory symptoms (r/o ACS)](#/node/scd-fever-workup)',
        },
        {
            heading: 'Acute Chest Syndrome',
            body: '• [Ceftriaxone + Azithromycin — cover typical + atypical](#/node/scd-acs-treatment)\n• [O2 only for SpO2 <90% — higher O2 blunts marrow response](#/node/scd-acs-treatment)\n• [Simple transfusion if Hgb drops >1 from baseline](#/node/scd-acs-transfusion)\n• [Exchange transfusion if worsening — AVOID steroids](#/node/scd-acs-exchange)',
        },
        {
            heading: 'Stroke (Critical)',
            body: '• [Activate stroke alert + notify hematology STAT](#/node/scd-stroke-start)\n• [Emergent CT head → MRI/MRA if no hemorrhage](#/node/scd-stroke-workup)\n• [Exchange transfusion — target HbS <30%](#/node/scd-stroke-treatment)\n• [tPA NOT recommended <18 years](#/node/scd-stroke-treatment)',
        },
        {
            heading: 'Splenic Sequestration (Critical)',
            body: '• [Emergent CBC, retic, T&C — 2 large-bore IVs](#/node/scd-splenic-start)\n• [pRBC 5 mL/kg aliquots — do NOT exceed Hgb 8 g/dL](#/node/scd-splenic-treatment)\n• [Admit all — 50–78% recurrence rate](#/node/scd-splenic-treatment)',
        },
    ],
    citations: [
        { num: 1, text: 'Jackson KM, et al. Pediatric Sickle Cell Disease: ED Evaluation and Management. Pediatr Emerg Med Pract. 2024;21(11):1-28.' },
        { num: 2, text: 'NHLBI. Evidence-Based Management of Sickle Cell Disease: Expert Panel Report. 2014.' },
    ],
};
const SCD_GENOTYPES = {
    id: 'scd-genotypes',
    title: 'SCD Genotypes & Disease Severity',
    subtitle: 'Genotype determines baseline severity and complication risk',
    sections: [
        {
            heading: 'HbSS (Sickle Cell Anemia)',
            body: '**Most severe phenotype.** Both β-globin genes carry HbS mutation. No HbA produced.\n\n• Baseline Hgb: 6–8 g/dL\n• Highest risk for all complications (ACS, stroke, splenic sequestration)\n• Functional asplenia by 3 months of age\n• Most common genotype\n• Reticulocyte count chronically elevated (10–14 day RBC lifespan vs 120 days normal)',
        },
        {
            heading: 'HbSβ0-Thalassemia',
            body: '**Severe phenotype** (similar to HbSS). No β-globin protein produced.\n\n• Baseline Hgb: 6–8 g/dL\n• Similar complication profile to HbSS\n• Diagnosed by hemoglobin electrophoresis (no HbA present)',
        },
        {
            heading: 'HbSC Disease',
            body: '**Moderate severity.** One HbS gene + one HbC gene.\n\n• Baseline Hgb: 10–15 g/dL\n• Less frequent VOC than HbSS\n• Splenic sequestration can occur later in life (spleen not autoinfarcts as early)\n• Higher risk for retinopathy and avascular necrosis\n• ~50% HbS + ~50% HbC on electrophoresis',
        },
        {
            heading: 'HbSβ+-Thalassemia',
            body: '**Moderate severity** (similar to HbSC). Small amount of β-globin produced.\n\n• Baseline Hgb: 9–12 g/dL\n• Similar morbidity/mortality as HbSC\n• 10–25% HbA present on electrophoresis\n• Splenic sequestration can present later in life',
        },
        {
            heading: 'HbAS (Sickle Cell Trait)',
            body: '**Generally benign carrier state.** One HbS gene + one normal gene.\n\n• Normal hemoglobin levels\n• ~8% of African Americans\n• NOT sickle cell disease — different complications (ECAST, renal)\n• Red blood cells function normally under typical conditions\n• Sickling possible under extreme physiologic stress (altitude, dehydration, intense exertion)',
        },
    ],
    citations: [
        { num: 1, text: 'Ware RE, et al. Sickle cell disease. Lancet. 2017;390(10091):311-323.' },
        { num: 2, text: 'Jackson KM, et al. Pediatric Sickle Cell Disease. Pediatr Emerg Med Pract. 2024;21(11):1-28.' },
    ],
};
const SCD_DIFFERENTIAL = {
    id: 'scd-differential',
    title: 'SCD Differential Diagnosis',
    subtitle: 'DDx by presenting complaint',
    sections: [
        {
            heading: 'Pain',
            body: '• **Vaso-occlusive crisis** — typical pattern, no focal findings\n• **Osteomyelitis** — Salmonella (most common in SCD), S. aureus; focal tenderness, fever\n• **Avascular necrosis** — femoral head (most common), humeral head; point tenderness, pain with ROM\n• **Septic arthritis** — joint effusion, inability to bear weight\n• **Dactylitis (hand-foot syndrome)** — swelling of fingers/toes, age <2 years\n• **Non-SCD trauma** — fracture, sprain (assess for atypical pain location)',
        },
        {
            heading: 'Fever',
            body: '• **Bacteremia/sepsis** — encapsulated organisms (S. pneumoniae #1)\n• **Viral illness** — does NOT exclude bacteremia in SCD\n• **Parvovirus B19** — aplastic crisis (retic <1%, profound anemia)\n• **ACS** — fever + respiratory symptoms + infiltrate\n• **Osteomyelitis** — fever + focal bone pain\n• **UTI** — consider in all febrile SCD patients',
        },
        {
            heading: 'Respiratory / Chest Pain',
            body: '• **Acute chest syndrome** — new infiltrate + fever/resp symptoms; up to 25% of SCD deaths\n• **Pneumonia** — clinically and radiographically similar to ACS\n• **Asthma exacerbation** — common comorbidity; does NOT exclude ACS\n• **Pulmonary embolism** — hypercoagulable state in SCD\n• **Rib/sternal VOC** — chest wall pain without infiltrate\n• **Myocardial infarction** — consider in older teens',
        },
        {
            heading: 'Neurologic',
            body: '• **Ischemic stroke** — 33× increased risk; peak age 2–9 years\n• **Hemorrhagic stroke** — more common in adult SCD\n• **Meningitis** — encapsulated organisms, functional asplenia\n• **Seizure** — may be presenting sign of stroke\n• **Posterior reversible encephalopathy (PRES)** — hypertension + seizures\n• **Transient ischemic attack** — consider even if symptoms resolve',
        },
        {
            heading: 'Abdominal',
            body: '• **Splenic sequestration** — rapid splenomegaly + anemia; age 6mo–5yr for HbSS\n• **Hepatic sequestration** — similar mechanism in liver; RUQ pain + hepatomegaly\n• **Aplastic crisis** — parvovirus B19; profound anemia but LOW reticulocyte count\n• **Cholelithiasis/cholecystitis** — pigment gallstones from chronic hemolysis\n• **Appendicitis** — always consider in abdominal pain',
        },
    ],
    citations: [
        { num: 1, text: 'Jackson KM, et al. Pediatric Sickle Cell Disease. Pediatr Emerg Med Pract. 2024;21(11):1-28.' },
    ],
};
const SCD_VOC_ALGORITHM = {
    id: 'scd-voc-algorithm',
    title: 'VOC Pain Management Algorithm',
    subtitle: 'Based on Dell Children\u2019s EBOC + ASH/NHLBI Guidelines',
    sections: [
        {
            heading: 'Triage (Goal: 0–30 Minutes)',
            body: '• Triage Level 2 (Emergency)\n• Administer Fentanyl 1–1.5 mcg/kg intranasal (max 100 mcg/dose)\n• Place PIV / Access Port\n• Obtain labs: CBC, retic, CMP, urine HCG (females >10 years)\n• If ill-appearing: T&S, Hgb electrophoresis (STAT)\n• If febrile: Use SCD Fever pathway concurrently\n• Offer heat packs to painful sites\n• Continuous pulse oximetry\n\n**Triage Questions:**\n• History of acute chest syndrome?\n• Last pain crisis?\n• Current fever, cough, chest pain?\n• Does patient have an individualized pain plan?',
        },
        {
            heading: 'Initial Analgesia (Goal: 31–60 Minutes)',
            body: '**Opioid (choose one):**\n• Morphine 0.1–0.2 mg/kg IV (max 8 mg)\n• Hydromorphone 0.015–0.02 mg/kg IV (max 1 mg)\n• Fentanyl 2 mcg/kg IV (max 100 mcg) — ED only\n\n**PLUS NSAID:**\n• Ketorolac 0.5 mg/kg IV (<16yo max 15mg, ≥16yo max 30mg) × 1 dose\n\n**PLUS Fluids:**\n• NS 10 mL/kg bolus (max 1L) over 60 min\n• If dehydration concern: 20 mL/kg bolus (max 1L)\n• Then start 1× maintenance IVF\n\nIf unable to obtain IV: Oxycodone 0.1 mg/kg PO (max 10 mg)',
        },
        {
            heading: 'Ketorolac Contraindications',
            body: '• Pregnancy\n• Renal impairment or SCD nephropathy\n• Last dose of ketorolac within 5 days\n• Last dose of ibuprofen within 6 hours\n• Active bleeding or coagulopathy\n• History of peptic ulcer disease',
        },
        {
            heading: 'Reassessment (q30 Minutes)',
            body: 'RN reassess pain 30 minutes after each opioid administration.\n\n• If patient asleep, wake to reassess\n• May give 2nd and 3rd opioid doses\n• Notify provider before each additional dose\n• Start incentive spirometry (prevents ACS development)\n\n**AVOID corticosteroids** — risk of rebound pain, stroke, and other complications [4][5]',
        },
        {
            heading: 'Disposition',
            body: '**Pain Improved → Discharge:**\n• Observe 1 hour post last opioid\n• Encourage PO intake\n• Discharge with home pain regimen (2–3 day opioid supply)\n• Hematology follow-up within 24–48 hours\n\n**Pain Not Improved After 3 Doses → Admit:**\n• Contact hematology for further management\n• Consider sub-dissociative ketamine 0.1–0.3 mg/kg IV\n• PCA morphine or hydromorphone\n• Monitor for ACS development (first 3–4 days)',
        },
    ],
    citations: [
        { num: 1, text: 'Dell Children\u2019s Medical Center EBOC. Pain Management Algorithm for SCD VOC. Updated April 2023.' },
        { num: 2, text: 'Brandow AM, et al. ASH 2020 guidelines for sickle cell disease: management of acute and chronic pain. Blood Adv. 2020;4(12):2656-2701.' },
        { num: 3, text: 'NHLBI. Evidence-Based Management of Sickle Cell Disease: Expert Panel Report. 2014.' },
    ],
};
const SCD_ACS_GUIDE = {
    id: 'scd-acs-guide',
    title: 'ACS Recognition & Management',
    subtitle: 'Acute chest syndrome — up to 25% of SCD deaths',
    sections: [
        {
            heading: 'Diagnostic Criteria',
            body: '**New radiodensity on chest imaging** PLUS any of:\n• Fever\n• Respiratory symptoms (cough, chest pain, dyspnea, tachypnea)\n• Hypoxemia\n\nNote: CXR infiltrate may lag behind clinical symptoms. Consider repeat imaging if high suspicion with initially clear CXR.',
        },
        {
            heading: 'Triggers & Etiology',
            body: '• **Infection** (most common in children) — S. pneumoniae, Mycoplasma, Chlamydia, viral\n• **Fat embolism** — from bone marrow infarction during VOC\n• **In situ sickling** — V/Q mismatch from local hypoxia\n• **Pulmonary infarction** — vaso-occlusion in pulmonary vasculature\n\n**Key:** ACS often develops during days 1–4 of hospitalization for VOC.',
        },
        {
            heading: 'Treatment Algorithm',
            body: '**1. Antibiotics** (cover typical + atypical):\n• Ceftriaxone 50 mg/kg IV (max 2g)\n• Azithromycin 10 mg/kg IV (max 500mg)\n\n**2. Oxygen:**\n• Supplement ONLY for SpO2 <90%\n• Why? Higher O2 in non-hypoxic patients blunts erythropoietic drive — reduces bone marrow response to RBC breakdown\n\n**3. Incentive spirometry** q2h while awake\n\n**4. Bronchodilators** PRN for wheezing\n\n**5. Pain management** per VOC pathway\n\n**6. AVOID corticosteroids** — rebound pain, stroke risk',
        },
        {
            heading: 'Transfusion Strategy',
            body: '**Simple Transfusion:**\n• If Hgb drops >1 g/dL from baseline\n• Target: Hgb ~10 g/dL, HbS <30%\n• Do NOT exceed Hgb 11 g/dL (hyperviscosity)\n\n**Exchange Transfusion Indications:**\n• Worsening respiratory distress on O2\n• Worsening hypoxia despite supplemental O2\n• Progressive pulmonary infiltrates\n• Worsening anemia post-simple transfusion\n• Multilobar disease\n• Rapid clinical deterioration\n\n**Blood Bank:** Extended antigen matching (anti-C, E, Kell), sickle-negative units. Notify early — exchange is resource-intensive.',
        },
    ],
    citations: [
        { num: 1, text: 'Jackson KM, et al. Pediatric Sickle Cell Disease. Pediatr Emerg Med Pract. 2024;21(11):1-28.' },
        { num: 2, text: 'NHLBI. Evidence-Based Management of Sickle Cell Disease. 2014.' },
        { num: 3, text: 'Dolatkhah R, et al. Blood transfusions for ACS in SCD. Cochrane Database Syst Rev. 2020;1(1):CD007843.' },
    ],
};
const SCD_TRANSFUSION = {
    id: 'scd-transfusion',
    title: 'SCD Transfusion Guidelines',
    subtitle: 'Simple vs exchange transfusion thresholds',
    sections: [
        {
            heading: 'Simple Transfusion',
            body: '**Mechanism:** Donor blood given without removing patient\u2019s blood.\n\n**Indications:**\n• Hgb drops >1 g/dL below baseline (ACS)\n• Symptomatic anemia\n• Splenic sequestration (in 5 mL/kg aliquots)\n• Aplastic crisis (parvovirus B19)\n\n**Targets:**\n• Hgb ~10 g/dL\n• Do NOT exceed Hgb 11 g/dL',
        },
        {
            heading: 'Exchange Transfusion',
            body: '**Mechanism:** Patient\u2019s blood removed and replaced with donor blood simultaneously.\n\n**Indications:**\n• Acute ischemic stroke (preferred over simple)\n• Severe/worsening ACS\n• Multiorgan failure\n• Pre-operative (goal HbS <30%)\n\n**Targets:**\n• HbS <30%\n• HbA >70%\n• Hgb ~10 g/dL',
        },
        {
            heading: 'Critical Thresholds (Do NOT Exceed)',
            body: '**Splenic sequestration:** Do NOT transfuse past Hgb **8 g/dL** — sequestered cells re-enter circulation (\u201creverse sequestration\u201d) → hyperviscosity, HTN, CHF, ICH [1]\n\n**Stroke:** Simple transfusion NOT indicated if Hgb >**8.5 g/dL** (hyperviscosity risk). Use exchange transfusion instead. [2]\n\n**All scenarios:** Do NOT exceed Hgb **11 g/dL** — hyperviscosity syndrome [1]\n\n**Stroke with HbS <50%:** Exchange transfusion may not be indicated [2]',
        },
        {
            heading: 'Blood Bank Considerations',
            body: '• **Extended antigen matching** required (anti-C, anti-E, anti-Kell) — reduces alloimmunization\n• **Sickle-negative units** — verify HbS-negative donor blood\n• **Notify blood bank EARLY** — exchange transfusion is resource-intensive\n• **Monitor for delayed hemolytic transfusion reaction** up to 28 days post-transfusion\n• **Hemoglobin electrophoresis** can track HbS% response to transfusion',
        },
    ],
    citations: [
        { num: 1, text: 'NHLBI. Evidence-Based Management of Sickle Cell Disease: Expert Panel Report. 2014.' },
        { num: 2, text: 'DeBaun MR, et al. ASH 2020 guidelines: cerebrovascular disease in SCD. Blood Adv. 2020;4(8):1554-1588.' },
        { num: 3, text: 'Dolatkhah R, et al. Blood transfusions for ACS in SCD. Cochrane Database Syst Rev. 2020.' },
    ],
};
const SCD_FEVER_EVAL = {
    id: 'scd-fever-eval',
    title: 'SCD Fever Evaluation',
    subtitle: 'Fever ≥ 38.5°C is a medical emergency in SCD',
    sections: [
        {
            heading: 'Why Fever Is Dangerous',
            body: '**Functional asplenia** develops by 3 months of age in HbSS disease.\n\n• Impaired clearance of encapsulated bacteria\n• S. pneumoniae is the #1 pathogen\n• H. influenzae, N. meningitidis, Salmonella also high risk\n• Pre-PCV bacteremia risk: 15–20%\n• Post-PCV + penicillin prophylaxis: ~1.1% [1]\n\n**Even with low bacteremia rates, the consequences of missed infection are catastrophic.**',
        },
        {
            heading: 'Antibiotic Algorithm',
            body: '**ALL febrile SCD patients:**\n• Blood culture × 2 BEFORE antibiotics (ALWAYS)\n• Ceftriaxone 50 mg/kg IV (max 2g) — IMMEDIATELY\n\n**If meningitis concern** (meningeal signs, AMS, ill-appearing):\n• Ceftriaxone 100 mg/kg IV (max 2g) — meningitic dose\n• PLUS Vancomycin 20 mg/kg IV (max 1500 mg)\n\n**Timing:** NHLBI recommends antibiotics within 1 hour of presentation [2]\n\n**Caution:** Scheduled acetaminophen/ibuprofen can mask fever. If on scheduled antipyretics with infectious symptoms, evaluate as if febrile.',
        },
        {
            heading: 'Disposition Criteria',
            body: '**Safe to Discharge:**\n• Well-appearing after observation\n• Reliable caregivers\n• Hematology follow-up within 24 hours (confirmed)\n• Completed pneumococcal vaccine series\n• Parenteral antibiotics given in ED\n\n**Must Admit:**\n• Ill-appearing\n• WBC >30,000 or <5,000 /mcL\n• Hypotensive for age\n• Continued fever\n• CXR infiltrate (→ ACS pathway)\n• Age <60 days\n• Unable to ensure 24-hour follow-up\n• Unvaccinated\n\n**Always page hematology before discharge.**',
        },
        {
            heading: 'Parvovirus B19 (Aplastic Crisis)',
            body: '**Transient Red Cell Aplasia (TRCA):**\n• 80% of SCD patients infected with parvovirus B19 develop TRCA\n• Reticulocyte count **<1%** (key diagnostic finding)\n• Hemoglobin drops **>30%** from baseline\n• WBC and platelets may also decline\n• Self-limited: 7–10 days\n\n**Management:**\n• Simple blood transfusion for symptomatic anemia\n• IVIG may be considered\n• Isolation precautions (contagious to other SCD patients and pregnant women)',
        },
    ],
    citations: [
        { num: 1, text: 'Rineer S, et al. Risk of bacteremia in febrile children with SCD. JAMA Netw Open. 2023;6(6):e2318904.' },
        { num: 2, text: 'NHLBI. Evidence-Based Management of Sickle Cell Disease. 2014.' },
        { num: 3, text: 'Baskin MN, et al. Bacteremia risk in febrile patients with SCD. Pediatrics. 2013;131(6):1035-1041.' },
    ],
};
const SCD_SCT_COMPLICATIONS = {
    id: 'scd-sct-complications',
    title: 'Sickle Cell Trait Complications',
    subtitle: 'SCT is NOT SCD — but has specific risks',
    sections: [
        {
            heading: 'ECAST (Exercise Collapse)',
            body: '**Exercise Collapse Associated with Sickle Cell Trait**\n\n• Associated with competitive athletics and military training\n• 28× increased risk of exercise-related death (Kark 1987) [1]\n• Metabolic crisis: dehydration + acidosis + hypoxia + hyperthermia → sickling\n\n**Progression:** Extremity pain → rhabdomyolysis → AKI → AMS → shock → arrhythmias → DIC\n\n**Management:**\n• STOP exercise immediately\n• Cool the patient\n• Aggressive IV fluids (target UO 200–300 mL/hr)\n• Continuous cardiac monitoring\n• Serial: BMP, CK, blood gas, coagulation studies\n\n**Note:** 2016 study of ~48,000 Black US Army soldiers found mortality similar to those without SCT when risk mitigation employed. [2]',
        },
        {
            heading: 'Renal Papillary Necrosis',
            body: '**Most common cause of hematuria in SCT.**\n\n• Painless gross hematuria\n• Microinfarctions in renal medulla — hypoxic, acidotic environment of vasa recta promotes sickling\n\n**Workup:** UA, urine culture, BMP, renal ultrasound with bladder\n\n**Management:**\n• Mild: outpatient — bed rest, oral hydration, urine alkalinization\n• Severe: inpatient — desmopressin infusion, ureteroscopic tamponade, or epsilon aminocaproic acid',
        },
        {
            heading: 'Renal Medullary Carcinoma',
            body: '**Rare but highly aggressive malignancy.**\n\n• Almost exclusively in SCT carriers\n• Predominantly young adults\n• Median survival: **15 weeks** (usually disseminated at diagnosis)\n\n**Red Flag:** Flank pain + hematuria in SCT patient\n→ **CT urography** to evaluate\n\nDo not assume hematuria is benign renal papillary necrosis if flank pain is present.',
        },
        {
            heading: 'Other SCT Complications',
            body: '• **Hyposthenuria** — inability to concentrate urine → chronic dehydration risk. Counsel on increased fluid intake.\n• **Splenic infarction at altitude** — can occur at >8,000 feet; presents with LUQ pain\n• **Exertional rhabdomyolysis** — even without full ECAST, can develop isolated rhabdomyolysis during intense exercise\n\n**Prevention Counseling:**\n• Gradual acclimatization to altitude and heat\n• Adequate hydration before, during, and after exercise\n• Avoid extreme exertion without preparation\n• Routine physical activity IS safe and beneficial',
        },
    ],
    citations: [
        { num: 1, text: 'Kark JA, et al. Sickle-cell trait as a risk factor for sudden death in physical training. NEJM. 1987;317(13):781-787.' },
        { num: 2, text: 'Nelson DA, et al. Sickle cell trait, rhabdomyolysis, and mortality among US Army soldiers. NEJM. 2016;375(5):435-442.' },
        { num: 3, text: 'Alappan N, et al. Renal medullary cancer in a patient with sickle cell trait. Case Rep Oncol Med. 2013.' },
    ],
};
// -------------------------------------------------------------------
// Salicylate Toxicity
// -------------------------------------------------------------------
const SAL_STEPS_SUMMARY = {
    id: 'sal-steps-summary',
    title: 'Salicylate Toxicity Steps Summary',
    subtitle: 'Quick-reference pathway through the Salicylate Toxicity consult',
    sections: [
        {
            heading: 'Module 1 \u2014 Recognition',
            body: '\u2022 [Identify exposure: acute ingestion, chronic toxicity, or unknown timing](#/node/sal-start)\n\u2022 [Estimate dose: <150 mg/kg minimal, 150-300 moderate, >300 severe](#/node/sal-acute-dose)\n\u2022 [Chronic toxicity: lower levels can kill \u2014 clinical status > level](#/node/sal-chronic)',
        },
        {
            heading: 'Module 2 \u2014 Resuscitation',
            body: '\u2022 [Volume resuscitate with D5W or LR \u2014 NEVER normal saline](#/node/sal-resus-assess)\n\u2022 [Seizures: benzodiazepines + empiric dextrose for neuroglycopenia](#/node/sal-seizure)\n\u2022 [CRITICAL: The dangerous airway \u2014 avoid intubation if possible](#/node/sal-airway-warning)\n\u2022 [If must intubate: pre-bolus bicarb, RR 30-35, call for emergent HD](#/node/sal-intubation)',
        },
        {
            heading: 'Module 3 \u2014 Decontamination',
            body: '\u2022 [Activated charcoal 1 g/kg if within 1-2 hours](#/node/sal-charcoal)\n\u2022 [MDAC or WBI for enteric-coated or massive ingestion](#/node/sal-mdac)',
        },
        {
            heading: 'Module 4 \u2014 Alkalinization',
            body: '\u2022 [NaHCO3 bolus 1-2 mEq/kg then infusion in D5W (CORNERSTONE)](#/node/sal-bicarb-bolus)\n\u2022 [CRITICAL: Replete K+ \u2265 4.0 or alkalinization fails](#/node/sal-k-critical)\n\u2022 [Dextrose D50W for neuroglycopenia even with normal glucose](#/node/sal-dextrose)\n\u2022 [Monitor: urine pH hourly, ABG/BMP q2h, salicylate level q2h](#/node/sal-alkalinize-monitor)',
        },
        {
            heading: 'Module 5 \u2014 Hemodialysis',
            body: '\u2022 [EXTRIP indications: level >100, pH <7.2, AMS, pulm edema, renal failure](#/node/sal-hd-indications)\n\u2022 [Continue NaHCO3 during and after HD \u2014 rebound is expected](#/node/sal-hd-rebound)\n\u2022 [Consult nephrology EARLY \u2014 HD takes time to arrange](#/node/sal-hd-consult)',
        },
        {
            heading: 'Module 6 \u2014 Disposition',
            body: '\u2022 [Serial levels q2h until declining, then q4h](#/node/sal-monitor)\n\u2022 [ICU: any HD, intubation, seizures, ongoing alkalinization](#/node/sal-dispo-icu)\n\u2022 [Psychiatric evaluation mandatory for all intentional ingestions](#/node/sal-dispo)',
        },
    ],
    citations: [],
};
const SAL_ACID_BASE = {
    id: 'sal-acid-base',
    title: 'Acid-Base Patterns in Salicylate Toxicity',
    subtitle: 'Classic mixed disorder and its clinical significance',
    sections: [
        {
            heading: 'Classic Pattern',
            body: '**Early:** Primary respiratory alkalosis from direct medullary stimulation \u2014 one of the first signs of toxicity. [1][2]\n\n**Late:** Anion gap metabolic acidosis develops from uncoupled oxidative phosphorylation \u2192 lactic acidosis + ketoacidosis. Most of the AG elevation is NOT from salicylate itself (<5 mEq/L contribution). [5]\n\n**Typical presentation:** Mixed respiratory alkalosis + AG metabolic acidosis with a nearly normal pH.',
        },
        {
            heading: 'Why Bicarb Still Works in Alkalosis',
            body: 'Even when the serum pH is already alkalemic (7.45-7.55) from respiratory alkalosis, sodium bicarbonate is still beneficial. The goal is **urinary alkalinization**, not serum. [2]\n\nAlkaline urine traps ionized salicylate in the renal tubules. This works regardless of the serum pH, as long as the kidneys are producing alkaline urine.',
        },
        {
            heading: 'The pH Trap',
            body: 'A \'normal\' pH of 7.40 may mask severe poisoning if respiratory alkalosis is offsetting metabolic acidosis. **Always check the anion gap and HCO3 independently.** [2][4]\n\nA patient with pH 7.40, pCO2 20, HCO3 12, AG 22 is severely poisoned \u2014 the normal pH is misleading.',
        },
        {
            heading: 'When pH Drops Below 7.35',
            body: '**Acidemia in salicylate toxicity is a DANGER sign indicating imminent demise without intervention.** [1]\n\nAt lower pH, more salicylic acid exists in its non-ionized form \u2192 freely crosses the blood-brain barrier \u2192 worsens CNS toxicity \u2192 further respiratory depression \u2192 more acidosis. This is the **death spiral.** [2]\n\nChildren and severe/late presentations may present with pure metabolic acidosis (worse prognosis). [1]',
        },
        {
            heading: 'Children vs Adults',
            body: '**Adults:** Classic mixed picture (respiratory alkalosis + metabolic acidosis).\n**Children:** Metabolic acidosis may predominate \u2014 may not develop the initial respiratory alkalosis phase. [1][3]\n\nChildren are at higher risk for rapid deterioration.',
        },
    ],
    citations: [
        { num: 1, text: 'Long N. Salicylate Toxicity. LITFL. 2020.' },
        { num: 2, text: 'Farkas J. Salicylate Intoxication. IBCC/EMCrit. 2025.' },
        { num: 3, text: 'Salicylate Toxicity. WikEM. 2026.' },
        { num: 4, text: 'Swaminathan A. Salicylate Toxicity. REBEL EM. 2018.' },
        { num: 5, text: 'Palmer BF, Clegg DJ. Salicylate Toxicity. NEJM. 2020;382(26):2544-2555.' },
    ],
};
const SAL_ALKALINIZE_PROTOCOL = {
    id: 'sal-alkalinize-protocol',
    title: 'Alkalinization Protocol Detail',
    subtitle: 'NaHCO3 preparation, targets, and troubleshooting',
    sections: [
        {
            heading: 'Mechanism \u2014 Ion Trapping',
            body: 'Salicylic acid is a weak acid (pKa 3.0). At alkaline pH, it exists primarily in its ionized form, which cannot cross cell membranes or be reabsorbed by renal tubules. [2][6]\n\nUrinary alkalinization to pH 8.0 increases renal salicylate clearance approximately **10-fold** compared to pH 6.0. [2]',
        },
        {
            heading: 'Recipe',
            body: '**Bolus:** 1-2 mEq/kg IV (2-3 amps of 8.4% NaHCO3).\n\n**Infusion:** 150 mEq NaHCO3 (3 amps of 8.4%) in 1L D5W. Run at 150-200 mL/hr. [2]\n\n**Add KCl:** 20-40 mEq per liter of infusion. [2]\n\nD5W carrier provides dual benefit: vehicle for bicarb AND CNS glucose support.',
        },
        {
            heading: 'Monitoring Targets',
            body: '\u2022 **Urine pH:** 7.5-8.0 (check hourly via Foley catheter) [2]\n\u2022 **Serum pH:** 7.45-7.55 (check q2h, do NOT exceed 7.60) [2]\n\u2022 **Potassium:** \u2265 4.0-4.5 mEq/L (check q2h) [2]\n\u2022 **Salicylate level:** q2h until peaked and declining [1]\n\u2022 **Glucose:** Fingerstick q1h if AMS',
        },
        {
            heading: 'Why K+ Is the Key',
            body: '**This is the #1 reason alkalinization fails.** [2]\n\nWhen K+ is low, the distal collecting duct reabsorbs K+ in exchange for H+ secretion \u2014 producing acidic urine regardless of how much bicarbonate you infuse.\n\nTwo simultaneous measures are required for urinary alkalinization: [2]\n1. Adequate bicarbonate delivery\n2. Aggressive K+ repletion (target \u2265 4.0-4.5 mEq/L)\n\nBicarbonate infusion itself tends to drop K+ further \u2014 preemptive repletion is essential.',
        },
        {
            heading: 'CONTRAINDICATED Agents',
            body: '**Acetazolamide:** ABSOLUTELY CONTRAINDICATED. Causes systemic metabolic acidosis (promotes bicarb excretion from the wrong side) AND displaces salicylate from albumin binding sites, increasing free (toxic) salicylate levels. [2][5]\n\n**Normal saline (0.9% NaCl):** Acidifying solution (strong ion difference = 0). Use D5W or LR for volume resuscitation. Do NOT use NS as carrier for bicarb infusion. [2]',
        },
        {
            heading: 'When to Stop',
            body: 'Discontinue alkalinization when: [2]\n\u2022 Two consecutive salicylate levels showing decline\n\u2022 Level < 30 mg/dL (< 2.2 mmol/L)\n\u2022 Patient asymptomatic with normal respiratory rate\n\n**Taper slowly** \u2014 abrupt discontinuation can cause rebound acidosis.\n\nAfter stopping, follow labs for 2-4 additional hours to ensure no rebound (especially important in chronic toxicity). [2]',
        },
    ],
    citations: [
        { num: 1, text: 'Long N. Salicylate Toxicity. LITFL. 2020.' },
        { num: 2, text: 'Farkas J. Salicylate Intoxication. IBCC/EMCrit. 2025.' },
        { num: 5, text: 'Palmer BF, Clegg DJ. Salicylate Toxicity. NEJM. 2020;382(26):2544-2555.' },
        { num: 6, text: 'Proudfoot AT, et al. Position Paper on Urine Alkalinization. J Toxicol Clin Toxicol. 2004;42(1):1-26.' },
    ],
};
const SAL_EXTRIP_HD = {
    id: 'sal-extrip-hd',
    title: 'EXTRIP Hemodialysis Indications',
    subtitle: 'When to dialyze \u2014 EXTRIP workgroup recommendations',
    sections: [
        {
            heading: 'Strongly Recommended',
            body: 'Hemodialysis is **strongly recommended** for: [1]\n\n\u2022 Salicylate level **> 100 mg/dL** (7.2 mmol/L) in acute ingestion\n\u2022 Salicylate level **> 90 mg/dL** (6.5 mmol/L) with impaired renal function\n\u2022 **Altered mental status** attributable to salicylate (including need for intubation)\n\u2022 **pH \u2264 7.20** despite adequate resuscitation and bicarbonate\n\u2022 New **hypoxemia requiring supplemental O2** (non-cardiogenic pulmonary edema)\n\u2022 **Progressive clinical deterioration** despite aggressive treatment',
        },
        {
            heading: 'Suggested',
            body: 'Hemodialysis is **suggested** for: [1]\n\n\u2022 Salicylate level **> 80 mg/dL** (5.8 mmol/L) in acute ingestion\n\u2022 Salicylate level **> 60 mg/dL** (4.4 mmol/L) in chronic or elderly patients\n\u2022 Renal failure limiting salicylate clearance\n\u2022 Volume overload preventing adequate alkalinization\n\u2022 Clinical deterioration despite appropriate treatment',
        },
        {
            heading: 'Why HD Works',
            body: 'Salicylate is an ideal dialysis candidate: [2]\n\u2022 **Small molecule** (MW 138 Da) \u2014 easily crosses dialysis membrane\n\u2022 **Low volume of distribution** (0.1-0.3 L/kg) \u2014 accessible in blood compartment\n\u2022 **Protein binding saturated in overdose** (90% \u2192 50%) \u2014 more free drug available for removal\n\u2022 **Water-soluble** \u2014 efficiently removed by aqueous dialysate\n\nHD simultaneously **removes salicylate AND corrects metabolic acidosis**.',
        },
        {
            heading: 'Practical Points',
            body: '\u2022 **Standard intermittent HD preferred** over CRRT \u2014 much more efficient clearance [1][2]\n\u2022 HD is safe even in hypotensive patients (no fluid removal, so no hemodynamic compromise) [2]\n\u2022 **Continue NaHCO3** during and after HD \u2014 tissue redistribution continues\n\u2022 Typical session duration: **4-6 hours**\n\u2022 **Expect rebound** \u2014 recheck level 2h post-HD\n\u2022 Some patients need **2-3 sessions** for massive ingestions',
        },
        {
            heading: 'Endpoint',
            body: 'Stop HD when: [1]\n\u2022 Salicylate level **< 30 mg/dL** with no rebound at 2h post-HD\n\u2022 **AND** clinical improvement (resolving AMS, normalizing acid-base)\n\nContinue alkalinization between/after HD sessions.',
        },
    ],
    citations: [
        { num: 1, text: 'Juurlink DN, et al. EXTRIP Workgroup. Ann Emerg Med. 2015;66(2):165-181.' },
        { num: 2, text: 'Farkas J. Salicylate Intoxication. IBCC/EMCrit. 2025.' },
    ],
};
const SAL_DEATH_SPIRAL = {
    id: 'sal-death-spiral',
    title: 'The Dangerous Airway \u2014 Salicylate Death Spiral',
    subtitle: 'Why intubation in salicylate toxicity is extremely dangerous',
    sections: [
        {
            heading: 'The Concept',
            body: 'A salicylate-poisoned patient\'s compensatory hyperventilation (often RR 30-40) is the **ONLY thing maintaining their pH.** The respiratory alkalosis offsets the metabolic acidosis, keeping the patient alive. [1][2]',
        },
        {
            heading: 'The Death Spiral Sequence',
            body: '1. Apneic period during RSI \u2192 **CO2 rises rapidly**\n2. pH crashes \u2192 more salicylic acid shifts to non-ionized form\n3. Non-ionized salicylate **crosses the blood-brain barrier** freely\n4. CNS salicylate concentration rises \u2192 **brainstem depression**\n5. Further loss of respiratory drive \u2192 more CO2 retention\n6. Worsening acidosis \u2192 more CNS penetration \u2192 **cardiac arrest** [1][2][3]\n\nThis cascade can happen within **minutes** of losing respiratory compensation.',
        },
        {
            heading: 'Why Ventilators Can\'t Compensate',
            body: 'Even with aggressive ventilator settings (RR 30-35), matching a patient\'s own hyperventilatory response is extremely difficult: [1][2]\n\n\u2022 Mechanical dead space reduces effective alveolar ventilation\n\u2022 Circuit compliance absorbs tidal volume\n\u2022 Sedation/paralysis eliminates any spontaneous respiratory effort\n\u2022 Auto-PEEP limits achievable respiratory rate\n\nThe result: post-intubation pH is almost always lower than pre-intubation pH.',
        },
        {
            heading: 'If You MUST Intubate',
            body: '**Pre-intubation:** [1][2]\n\u2022 Bolus NaHCO3 1-2 mEq/kg IV \u2014 give **5-10 minutes before paralysis** so the patient can blow off the CO2 generated by bicarbonate\n\u2022 Pre-oxygenate with BVM at high rate\n\n**Intubation:** [2]\n\u2022 Most experienced operator available\n\u2022 Ketamine preferred (maintains respiratory drive longest)\n\u2022 Minimize apneic time \u2014 this is the critical window\n\n**Post-intubation:** [2]\n\u2022 Immediately connect ventilator: TV 8 mL/kg, **RR 30-35**\n\u2022 Target **pH, NOT pCO2** \u2014 get ABG within 10 minutes\n\u2022 Continue NaHCO3 boluses\n\u2022 Switch to spontaneous mode (pressure support) ASAP\n\u2022 Call for **EMERGENT hemodialysis**',
        },
        {
            heading: 'The Bottom Line',
            body: '**Intubation in salicylate toxicity should be a last resort.** [2]\n\nHemodialysis is almost always a better option than intubation for deteriorating patients. A patient who needs intubation almost certainly needs HD too \u2014 and HD without intubation is far safer than intubation without HD.\n\nHFNC may help support breathing without the risks of intubation. [2]',
        },
    ],
    citations: [
        { num: 1, text: 'Farkas J. Salicylate Intoxication. IBCC/EMCrit. 2025.' },
        { num: 2, text: 'Swaminathan A. Salicylate Toxicity. REBEL EM. 2018.' },
        { num: 3, text: 'Stolbach AI, et al. Mechanical Ventilation Was Associated with Acidemia in Salicylate-Poisoned Patients. Acad Emerg Med. 2008;15:866-869.' },
    ],
};
const SAL_CHRONIC_RECOGNITION = {
    id: 'sal-chronic-recognition',
    title: 'Chronic Toxicity Recognition',
    subtitle: 'The underrecognized killer \u2014 especially in elderly patients',
    sections: [
        {
            heading: 'Who Gets It',
            body: 'Elderly patients on chronic aspirin therapy are most commonly affected. Often unintentional \u2014 gradual accumulation from renal impairment, dehydration, or drug interactions. [1][2]\n\nAlso seen with chronic use of: [1]\n\u2022 Bismuth subsalicylate (Pepto-Bismol)\n\u2022 Topical salicylate products (Ben-Gay, Icy Hot)\n\u2022 Combination cold medicines containing aspirin\n\u2022 Oil of wintergreen preparations',
        },
        {
            heading: 'Why It\'s More Deadly Than Acute',
            body: '**Chronic toxicity has HIGHER mortality than acute toxicity** despite LOWER serum levels. [1][2]\n\nReasons:\n\u2022 Greater tissue accumulation \u2014 salicylate has had time to distribute into brain and other compartments\n\u2022 Cerebral and pulmonary edema are more common than in acute toxicity [1]\n\u2022 Diagnosis is frequently delayed (misidentified as sepsis, CHF, dementia)\n\u2022 Underlying comorbidities compound the toxicity\n\n**The Done nomogram does NOT apply** to chronic toxicity. [2]',
        },
        {
            heading: 'Classic Misdiagnoses',
            body: 'Chronic salicylate toxicity is frequently confused with: [1][2]\n\n\u2022 **Sepsis** (tachypnea, tachycardia, metabolic acidosis, AMS)\n\u2022 **CHF exacerbation** (pulmonary edema, dyspnea)\n\u2022 **Dementia/delirium** (confusion, agitation)\n\u2022 **Simple UTI** (elderly with AMS \u2014 don\'t stop at the UA)\n\n**Include salicylate level in your AMS/delirium workup**, especially in elderly patients.',
        },
        {
            heading: 'Red Flags for Chronic Toxicity',
            body: '\u2022 Unexplained anion gap metabolic acidosis in elderly [1]\n\u2022 Tachypnea out of proportion to clinical picture\n\u2022 Non-cardiogenic pulmonary edema without clear cause\n\u2022 AMS + tinnitus (or new hearing loss in elderly) [1]\n\u2022 Metabolic acidosis in a patient taking chronic aspirin\n\u2022 Confusion that doesn\'t fit other diagnoses\n\n**Ask about ALL medications** \u2014 including OTC products.',
        },
    ],
    citations: [
        { num: 1, text: 'Long N. Salicylate Toxicity. LITFL. 2020.' },
        { num: 2, text: 'Farkas J. Salicylate Intoxication. IBCC/EMCrit. 2025.' },
    ],
};
const SAL_LEVEL_INTERPRETATION = {
    id: 'sal-level-interpretation',
    title: 'Level Interpretation & Monitoring',
    subtitle: 'Salicylate levels, limitations, and serial monitoring strategy',
    sections: [
        {
            heading: 'Therapeutic & Toxic Ranges',
            body: '\u2022 **Analgesic/antiplatelet:** 5-15 mg/dL\n\u2022 **Anti-inflammatory (therapeutic):** 15-30 mg/dL (1.1-2.2 mmol/L)\n\u2022 **Mild toxicity:** 30-50 mg/dL\n\u2022 **Moderate toxicity:** 50-80 mg/dL\n\u2022 **Severe toxicity:** 80-100 mg/dL\n\u2022 **Potentially lethal:** > 100 mg/dL (> 7.2 mmol/L) [1][2]\n\n**Unit conversion:** mg/dL \u00D7 0.0724 = mmol/L. Some labs report in mg/L (= mg/dL \u00D7 10).',
        },
        {
            heading: 'Why Single Levels Are Unreliable',
            body: '**A single salicylate level can be dangerously misleading:** [2]\n\n\u2022 **Timing:** Peak levels may not occur until 6+ hours (standard) or 12-24 hours (enteric-coated) after ingestion\n\u2022 **Chronic toxicity:** Levels may be only mildly elevated while tissue toxicity is severe\n\u2022 **pH dependence:** The same total level produces different tissue penetration at different pH values \u2014 a level of 46 mg/dL at pH 7.2 has the same CNS penetration as 100 mg/dL at pH 7.55 [2]\n\u2022 **Bezoar formation:** Levels may continue to rise for 12+ hours',
        },
        {
            heading: 'Serial Level Strategy',
            body: '**Serial levels are essential \u2014 check q2h until peaked and clearly declining:** [1][2]\n\n\u2022 Rising levels \u2192 ongoing absorption (bezoar, enteric-coated, large ingestion)\n\u2022 Plateau \u2192 approaching peak, continue monitoring\n\u2022 Declining levels \u00D7 2 \u2192 absorption complete, switch to q4h\n\u2022 After stopping treatment \u2192 follow 2-4 additional hours for rebound',
        },
        {
            heading: 'Done Nomogram Limitations',
            body: 'The Done nomogram plots salicylate level vs time after ingestion. [4]\n\n**Limitations \u2014 NOT valid for:** [2]\n\u2022 Chronic toxicity (tissue stores far exceed blood level)\n\u2022 Enteric-coated or sustained-release formulations\n\u2022 Unknown time of ingestion\n\u2022 Co-ingestions\n\u2022 Renal impairment\n\n**Clinical assessment always takes priority over nomogram predictions.**',
        },
        {
            heading: 'The Declining-Level Trap',
            body: '**WARNING:** A declining serum level with WORSENING clinical status suggests tissue redistribution \u2014 salicylate is moving from blood into cells (especially brain) where it causes damage. [2]\n\nThis patient needs hemodialysis, not reassurance. The falling level is false comfort \u2014 the salicylate is in a worse place, not a better one.',
        },
    ],
    citations: [
        { num: 1, text: 'Long N. Salicylate Toxicity. LITFL. 2020.' },
        { num: 2, text: 'Farkas J. Salicylate Intoxication. IBCC/EMCrit. 2025.' },
        { num: 3, text: 'Salicylate Toxicity. WikEM. 2026.' },
        { num: 4, text: 'Done AK. Salicylate Intoxication. Pediatrics. 1960;26:800-807.' },
    ],
};
// -------------------------------------------------------------------
// TCA Overdose Info Pages
// -------------------------------------------------------------------
const TCA_STEPS_SUMMARY = {
    id: 'tca-steps-summary',
    title: 'TCA Overdose Steps Summary',
    subtitle: 'Quick reference — tap any step to jump directly',
    sections: [
        {
            heading: 'Module 1: Recognition & Stabilization',
            body: '• [Assess clinical severity — mild vs moderate vs severe](#/node/tca-start)\n• [Anticholinergic toxidrome features](#/node/tca-mild)\n• [Immediate resuscitation for critical patients](#/node/tca-critical)\n• [GI decontamination — activated charcoal decision](#/node/tca-decon)\n• [Intubation considerations — avoid hypoventilation](#/node/tca-intubation)',
        },
        {
            heading: 'Module 2: ECG & Risk Stratification',
            body: '• [12-lead ECG assessment — QRS duration](#/node/tca-ecg)\n• [Normal QRS — monitoring plan](#/node/tca-ecg-low)\n• [R wave in aVR — sensitive marker](#/node/tca-avr)\n• [Serial ECG monitoring protocol](#/node/tca-ecg-monitor)',
        },
        {
            heading: 'Module 3: Sodium Bicarbonate Protocol',
            body: '• [NaHCO₃ bolus — cornerstone of treatment](#/node/tca-bicarb)\n• [Aggressive bicarb for QRS >160 ms](#/node/tca-bicarb-aggressive)\n• [Treatment goals and monitoring](#/node/tca-bicarb-goals)\n• [Maintenance infusion](#/node/tca-bicarb-infusion)\n• [Bicarbonate-refractory management](#/node/tca-bicarb-refractory)',
        },
        {
            heading: 'Module 4: Seizure Management',
            body: '• [Seizure assessment — lethal feedback loop](#/node/tca-seizure)\n• [First-line BZD treatment](#/node/tca-seizure-bzd)\n• [Refractory seizure escalation](#/node/tca-seizure-refractory)\n• [Contraindicated antiepileptics](#/node/tca-seizure-avoid)',
        },
        {
            heading: 'Module 5: Hemodynamic Management',
            body: '• [Hypotension assessment — 3 mechanisms](#/node/tca-hypotension)\n• [Volume resuscitation](#/node/tca-fluids)\n• [Vasopressor selection by heart rate](#/node/tca-vasopressors)\n• [Wide-complex tachycardia management](#/node/tca-vtach)\n• [Lipid emulsion — rescue therapy](#/node/tca-lipid)\n• [ECMO — final rescue](#/node/tca-ecmo)',
        },
        {
            heading: 'Module 6: Disposition',
            body: '• [Disposition decision — ICU vs monitor vs discharge](#/node/tca-disposition)\n• [ICU admission criteria](#/node/tca-icu)\n• [Discharge criteria + psychiatric clearance](#/node/tca-discharge)',
        },
    ],
    citations: [],
};
const TCA_ECG_FINDINGS = {
    id: 'tca-ecg-findings',
    title: 'ECG Findings in TCA Toxicity',
    subtitle: 'Critical markers of sodium channel blockade',
    sections: [
        {
            heading: 'QRS Duration Thresholds',
            body: '• **QRS <100 ms** — Low risk. Monitor with serial ECGs [1]\n• **QRS 100-120 ms** — Increased seizure risk (~10-33%). Give sodium bicarbonate [1]\n• **QRS 120-160 ms** — Significant sodium channel blockade. Seizure risk ~30%. Aggressive bicarb [1]\n• **QRS >160 ms** — High risk of ventricular arrhythmias (~50%). Immediate aggressive treatment [1]\n\n⚠️ In toxicology, "wide QRS" = anything >100 ms (not the standard >120 ms)',
        },
        {
            heading: 'R Wave in aVR',
            body: '• **R wave >3 mm in aVR** — sensitive marker of sodium channel blockade [2]\n• **R/S ratio >0.7 in aVR** — additional marker\n• aVR may be more sensitive than QRS duration for predicting seizures and arrhythmias (sensitivity 81%) [2]\n• Can be positive even when QRS is <100 ms\n• Reflects preferential right bundle branch blockade by sodium channel blockers',
        },
        {
            heading: 'Terminal 40 ms QRS Axis',
            body: '• **Rightward axis deviation of terminal 40 ms of QRS** — characteristic finding\n• Sodium channel blockade preferentially affects the right bundle branch\n• Results in terminal rightward forces visible in leads I and aVR\n• May be the earliest ECG sign of sodium channel blockade',
        },
        {
            heading: 'Brugada-Like Pattern',
            body: '• Coved ST elevation in V1-V3 with RBBB morphology\n• Important NOT to confuse with true Brugada syndrome\n• TCA-induced pattern **resolves with treatment** (unlike genetic Brugada)\n• Present in up to 15% of significant TCA overdoses',
        },
        {
            heading: 'QT Prolongation',
            body: '• Present due to **potassium channel blockade** (separate from sodium channel effects)\n• Less prognostically significant than QRS widening for TCA toxicity\n• Risk of torsades de pointes, but uncommon as long as patient remains tachycardic [3]\n• Treat with magnesium 2g IV if polymorphic VT develops',
        },
        {
            heading: 'Monitoring Protocol',
            body: '• **Serial 12-lead ECGs** every 15-30 min for first 2 hours [4]\n• Then q2h for minimum 6 total hours\n• Continuous telemetry throughout observation period\n• Check ECG after each bicarbonate bolus\n• Check ECG after any clinical change (seizure, hypotension, arrhythmia)\n• Minimum 6 hours after LAST ECG abnormality resolves before considering discharge [5]',
        },
    ],
    citations: [
        { num: 1, text: 'Boehnert MT, Lovejoy FH Jr. Value of the QRS duration versus the serum drug level in predicting seizures and ventricular arrhythmias after an acute overdose of tricyclic antidepressants. N Engl J Med. 1985;313(8):474-479.' },
        { num: 2, text: 'Liebelt EL, et al. ECG lead aVR versus QRS interval in predicting seizures and arrhythmias in acute tricyclic antidepressant toxicity. Ann Emerg Med. 1995;26(2):195-201.' },
        { num: 3, text: 'Weingart S. EMCrit 98 — Cyclic (Tricyclic) Antidepressant Overdose. EMCrit Blog. 2013.' },
        { num: 4, text: 'Kerr GW, et al. TCA overdose: a review. Emerg Med J. 2001;18(4):236-241.' },
        { num: 5, text: 'Body R, et al. GEMNet guideline for TCA overdose management. Emerg Med J. 2011;28(4):347-368.' },
    ],
};
const TCA_BICARB_PROTOCOL = {
    id: 'tca-bicarb-protocol',
    title: 'Sodium Bicarbonate Protocol',
    subtitle: 'Detailed dosing, goals, and troubleshooting',
    sections: [
        {
            heading: 'Mechanism of Action (Dual)',
            body: '1. **Sodium loading** — hypertonic NaHCO₃ (1000 mOsm/L) increases extracellular sodium, which competes for cardiac sodium channels blocked by TCA [1]\n2. **Alkalosis** — increasing serum pH shifts TCA to its protein-bound (non-toxic) form, reducing free drug concentration [1][2]\n\nBoth mechanisms are clinically important — neither alone is sufficient',
        },
        {
            heading: 'Bolus Dosing',
            body: '• **1-2 mEq/kg IV push** over 1-2 minutes\n• Repeat every 3-5 minutes until QRS narrows\n• 1 amp = 50 mEq/50 mL of 8.4% solution\n• Most patients need 1-3 boluses; severe cases may need 5-10+ [3]\n• Case report: 2650 mEq (53 amps) total in severe case with survival [3]',
        },
        {
            heading: 'Maintenance Infusion',
            body: '• **150 mEq (3 amps) in 1L D5W** at 150-250 mL/hr [1][2]\n• This is isotonic bicarbonate — less effective than hypertonic boluses for acute QRS widening\n• Use for maintenance AFTER initial boluses have narrowed the QRS\n• Continue until QRS normal × ≥6 hours, then wean while monitoring ECG\n• Central line preferred for large volumes (8.4% is extremely hypertonic)',
        },
        {
            heading: 'Treatment Goals',
            body: '• **QRS < 100 ms** (may not be achievable if severely/chronically prolonged)\n• **pH 7.50-7.55** — achieve via bicarb ± hyperventilation (if intubated) [1]\n• **Serum Na ≤ 155 mEq/L** — excessive hypernatremia is dangerous [4]\n• **Avoid excessive alkalinization** — pH >7.55 may paradoxically increase arrhythmia or seizure risk [2]',
        },
        {
            heading: 'When Bicarbonate Fails ("Beyond Bicarbonate")',
            body: '**If QRS not narrowing despite adequate bicarb** [1][4]:\n\n1. **Hyperventilation** (if intubated) — fastest way to alkalinize. Target ETCO₂ ~25-30 mmHg [1]\n2. **Hypertonic saline 3%** — additional sodium loading if Na <155 mEq/L [4]\n3. **Lidocaine** 1-1.5 mg/kg IV — Class IB antiarrhythmic that competes for Na channel binding sites [5]\n4. **Lipid emulsion** — rescue for cardiac arrest (see separate protocol)\n5. **ECMO** — final rescue for refractory cardiac arrest\n\n⚠️ If QRS doesn\'t respond despite 100-200 mEq, question the diagnosis [1]',
        },
        {
            heading: 'Complications of Bicarbonate Therapy',
            body: '• **Hypokalemia** — alkalosis shifts K⁺ intracellularly. Replete K⁺ simultaneously [6]\n• **Hypocalcemia** — ionized Ca²⁺ drops with alkalosis. Monitor and replete\n• **Hypernatremia** — each 50 mEq amp delivers 50 mEq sodium. Monitor Na closely\n• **Volume overload** — significant fluid load with multiple boluses\n• **Paradoxical CNS acidosis** — CO₂ crosses BBB faster than HCO₃⁻ [1]\n• **Metabolic alkalosis** — if pH >7.55, hold further bicarb and rely on hyperventilation',
        },
    ],
    citations: [
        { num: 1, text: 'Farkas J. Sodium Channel Blocker Toxicity. IBCC. 2025.' },
        { num: 2, text: 'Murray BP, Carpenter J. Medical Toxicology. Oxford University Press. 2024.' },
        { num: 3, text: 'Amiri H, et al. TCA cardiotoxicity treated by 2650 mEq sodium bicarbonate. JRSM Cardiovasc Dis. 2016.' },
        { num: 4, text: 'Isoardi KZ, Chiew AL. Bicarbonate toxicity in Na channel blocker OD. EMA. 2022.' },
        { num: 5, text: 'Foianini A, et al. Role of lidocaine or phenytoin in TCA cardiotoxicity. Clin Toxicol. 2010;48(4):325-330.' },
        { num: 6, text: 'Swaminathan A. REBEL Core Cast 109.0 — Na Channel Blocker Poisoning. REBEL EM. 2023.' },
    ],
};
const TCA_NA_BLOCKERS = {
    id: 'tca-na-blockers',
    title: 'Agents That Block Sodium Channels',
    subtitle: 'Comprehensive list — all can produce TCA-like ECG findings',
    sections: [
        {
            heading: 'Tricyclic Antidepressants',
            body: '• Amitriptyline, Nortriptyline, Imipramine, Desipramine\n• Doxepin, Clomipramine, Trimipramine, Protriptyline\n• Most commonly discussed sodium channel blockers\n• Often dominate the clinical picture with combined Na channel + anticholinergic + alpha blockade',
        },
        {
            heading: 'Other Antidepressants',
            body: '• Bupropion, Citalopram, Fluoxetine\n• Maprotiline, Paroxetine, Venlafaxine\n• Generally less cardiotoxic than TCAs but can cause sodium channel blockade in overdose',
        },
        {
            heading: 'Antiarrhythmics',
            body: '• **Type Ia:** Procainamide, Quinidine, Disopyramide\n• **Type Ic:** Flecainide, Propafenone\n• These are CONTRAINDICATED in TCA overdose — worsen sodium channel blockade\n• Amiodarone also avoided (QTc prolongation)',
        },
        {
            heading: 'Antihistamines',
            body: '• **Diphenhydramine** — common, can cause TCA-like toxicity in overdose\n• Chlorpheniramine, Dimenhydrinate\n• Doxepin (also classified as TCA)\n• Combined anticholinergic + sodium channel effects',
        },
        {
            heading: 'Other Agents',
            body: '• **Cocaine** — Na channel blockade + sympathomimetic effects\n• **Beta-blockers:** Propranolol, Acebutolol (membrane-stabilizing activity)\n• **Antimalarials:** Chloroquine, Hydroxychloroquine, Quinine\n• **Antiepileptics:** Carbamazepine, Lamotrigine, Phenytoin, Lacosamide\n• **Antipsychotics:** Thioridazine, Loxapine\n• **Muscle relaxants:** Cyclobenzaprine (TCA analogue), Orphenadrine\n• **Miscellaneous:** Amantadine, Tramadol, Topiramate, some insecticides [1]',
        },
        {
            heading: 'Key Clinical Point',
            body: '⚠️ Combinations of multiple sodium channel blockers potentiate toxicity. A "subclinical" dose of diphenhydramine + cyclobenzaprine may produce significant blockade together [1].\n\nWith decreased TCA prescribing, **most patients presenting with Na channel blockade today do NOT have TCA overdose** — diphenhydramine, cocaine, and antiarrhythmics are more common causes [1].\n\nThe management principles (bicarbonate, lidocaine, avoid Class IA/IC) apply to ALL sodium channel blockers.',
        },
    ],
    citations: [
        { num: 1, text: 'Farkas J. Sodium Channel Blocker Toxicity. IBCC. 2025.' },
    ],
};
const TCA_DIFFERENTIAL = {
    id: 'tca-differential',
    title: 'Differential Diagnosis',
    subtitle: 'Other causes of wide QRS and anticholinergic toxidrome',
    sections: [
        {
            heading: 'Other Sodium Channel Blockers',
            body: '• Class IA/IC antiarrhythmics (procainamide, flecainide)\n• Cocaine\n• Diphenhydramine (common — false positive on TCA screen)\n• Carbamazepine\n• Cyclobenzaprine (structural TCA analogue — usually mild cardiac effects)\n• See [Agents That Block Sodium Channels](#/info/tca-na-blockers) for complete list',
        },
        {
            heading: 'Anticholinergic Toxidrome DDx',
            body: '• Antihistamines (diphenhydramine, hydroxyzine)\n• Antipsychotics (quetiapine, olanzapine)\n• Antiparkinsonian agents (benztropine, trihexyphenidyl)\n• Mydriatics (atropine, cyclopentolate)\n• Plants (jimsonweed / Datura, deadly nightshade)\n• Mushrooms (Amanita muscaria)',
        },
        {
            heading: 'Wide-Complex Tachycardia DDx',
            body: '• **Hyperkalemia** — peaked T waves, sine wave (give calcium + bicarb empirically if unsure)\n• **True Brugada syndrome** — genetic, does NOT resolve with bicarbonate\n• **Pre-excitation** (WPW with atrial fibrillation)\n• **Ventricular tachycardia** (ischemic, structural heart disease)\n• **Bundle branch block** with SVT\n• **Drug-induced:** digoxin, theophylline',
        },
        {
            heading: 'Serotonin Syndrome (if Combined Ingestion)',
            body: '• TCA + SSRI/SNRI coingestion can cause serotonin syndrome\n• Key differentiator: **clonus, hyperreflexia, diaphoresis** (wet, not dry like anticholinergic)\n• Mydriasis present in both\n• Treat with cyproheptadine and benzodiazepines',
        },
        {
            heading: 'False Positive TCA Screens',
            body: '⚠️ **Urine drug screen for TCA has many false positives** [1]:\n• Diphenhydramine\n• Cyclobenzaprine\n• Carbamazepine\n• Phenothiazines (chlorpromazine, thioridazine)\n• Quetiapine\n\nTCA levels are NOT useful for acute management — do not correlate with toxicity [1]',
        },
    ],
    citations: [
        { num: 1, text: 'Kerr GW, et al. TCA overdose: a review. Emerg Med J. 2001;18(4):236-241.' },
    ],
};
const TCA_SEIZURE_GUIDE = {
    id: 'tca-seizure-guide',
    title: 'Seizure Management in TCA Overdose',
    subtitle: 'Why seizures are lethal + treatment escalation',
    sections: [
        {
            heading: 'Why Seizures Are Extremely Dangerous',
            body: '🛑 **The acidosis death spiral:**\n\n1. TCA blocks sodium channels → QRS widens\n2. Seizure → lactic acidosis → pH drops\n3. Acidosis increases free (unbound) TCA → more sodium channel blockade\n4. More blockade → wider QRS → arrhythmias → more seizures\n5. Vicious cycle → cardiac arrest\n\n**Seizures must be treated aggressively** — every minute of ongoing seizure worsens cardiac toxicity [1][2]',
        },
        {
            heading: 'First-Line: Benzodiazepines',
            body: '**Choose one:**',
            drugTable: [
                { drug: 'Lorazepam (IV)', regimen: '0.1 mg/kg IV (max 4 mg). Repeat q5 min. Preferred IV BZD.' },
                { drug: 'Midazolam (IM)', regimen: '0.2 mg/kg IM (max 10 mg). When IV access unavailable.' },
                { drug: 'Diazepam (IV)', regimen: '0.15-0.2 mg/kg IV (max 10 mg). Alternative to lorazepam.' },
            ],
        },
        {
            heading: 'Simultaneous Bicarbonate',
            body: '• Give sodium bicarbonate WITH benzodiazepines — not instead of\n• Alkalinization reduces free TCA crossing the blood-brain barrier\n• Counteracts seizure-induced lactic acidosis\n• Do not wait for seizure to stop before giving bicarb',
        },
        {
            heading: 'Second-Line: Refractory Seizures',
            body: '**If BZDs fail after 2-3 doses:**',
            drugTable: [
                { drug: 'Propofol', regimen: '1-2 mg/kg IV bolus → 30-200 mcg/kg/min. Requires intubation. May worsen hypotension.' },
                { drug: 'Phenobarbital', regimen: '15-20 mg/kg IV at ≤50 mg/min. Acts on GABA-A differently than BZDs. Prepare for intubation.' },
                { drug: 'Levetiracetam', regimen: '20 mg/kg IV (max 3000 mg). Maintenance antiepileptic. No sodium channel effects.' },
            ],
        },
        {
            heading: '🚫 Contraindicated Agents',
            body: '**Do NOT use these — they worsen sodium channel blockade:**\n• **Phenytoin / Fosphenytoin** — may precipitate cardiac arrest\n• **Carbamazepine** — sodium channel blocker\n• **Lamotrigine** — sodium channel blocker\n• **Lacosamide** — enhances slow inactivation of sodium channels\n\n**Phenytoin contraindication is ABSOLUTE in TCA overdose** — this is a universally agreed-upon principle across all toxicology guidelines [1][2][3]',
        },
    ],
    citations: [
        { num: 1, text: 'Farkas J. Sodium Channel Blocker Toxicity. IBCC. 2025.' },
        { num: 2, text: 'Long N. TCA Toxicity. LITFL. 2022.' },
        { num: 3, text: 'Woolf AD, et al. TCA poisoning consensus guideline. Clin Toxicol. 2007;45(3):203-233.' },
    ],
};
const TCA_DISPOSITION_CRITERIA = {
    id: 'tca-disposition-criteria',
    title: 'Disposition Criteria',
    subtitle: 'ICU, monitored bed, and discharge guidelines',
    sections: [
        {
            heading: 'ICU Admission',
            body: '**Any of the following** [1][2]:\n• QRS widening (current or resolved within last 6h)\n• Ventricular arrhythmias (current or resolved)\n• Seizures (current or resolved)\n• Hypotension requiring vasopressors\n• Altered mental status\n• Requiring sodium bicarbonate infusion\n• Required intubation\n\n**In the ICU:**\n• Continuous telemetry minimum 6h after last ECG abnormality\n• Serial ABGs and electrolytes to guide bicarbonate therapy\n• Wean bicarb slowly while monitoring ECG',
        },
        {
            heading: 'Monitored Bed (Telemetry)',
            body: '**Criteria** [1]:\n• Asymptomatic or mild anticholinergic features only\n• Normal ECG (QRS <100 ms) at presentation\n• Reported significant ingestion requiring observation\n\n**Protocol:**\n• Serial ECGs q2h for minimum 6 hours\n• Continuous telemetry\n• If ANY QRS widening → escalate to bicarb protocol and ICU',
        },
        {
            heading: 'Discharge Criteria',
            body: '**ALL criteria must be met** [1][2]:\n• Asymptomatic for ≥6 hours of observation\n• QRS persistently <100 ms on serial ECGs\n• Normal mental status\n• Normal hemodynamics (no hypotension, stable HR)\n• **Psychiatric clearance obtained** (MANDATORY for intentional ingestions)\n\n**Before discharge:**\n• Document lethal means counseling\n• Counsel family to remove access to TCAs and other toxic medications\n• Consider safer antidepressant alternatives (SSRIs, SNRIs)\n• Ensure psychiatric follow-up is arranged\n• Provide safety plan',
        },
        {
            heading: 'Poison Control',
            body: '**National Poison Control Center: 1-800-222-1222**\n\nAvailable 24/7 for consultation on any suspected poisoning.\nConsider toxicology consultation for all severe cases.',
        },
    ],
    citations: [
        { num: 1, text: 'Kerr GW, et al. TCA overdose: a review. Emerg Med J. 2001;18(4):236-241.' },
        { num: 2, text: 'Body R, et al. GEMNet guideline for TCA overdose management. Emerg Med J. 2011;28(4):347-368.' },
    ],
};
// -------------------------------------------------------------------
// Acetaminophen Overdose Info Pages
// -------------------------------------------------------------------
const APAP_SUMMARY = {
    id: 'apap-summary',
    title: 'APAP Overdose — Steps Summary',
    subtitle: 'Quick-reference pathway for acetaminophen toxicity management',
    sections: [
        {
            heading: 'Initial Assessment',
            body: '• [Classify ingestion pattern: acute vs chronic vs unknown](#/node/apap-start)\n• [Gather history: dose, timing, formulation, coingestants, risk factors](#/node/apap-acute-hx)\n• [Repeated supratherapeutic ingestion — nomogram does NOT apply](#/node/apap-chronic-hx)',
        },
        {
            heading: 'Risk Stratification',
            body: '• [Draw APAP level at 4h post-ingestion — plot on Rumack-Matthew nomogram](#/node/apap-acute-strat)\n• [Extended-release / coingestant — serial levels if >10 mcg/mL](#/node/apap-er-coingest)\n• [Chronic ingestion — use (ALT)(APAP) product, treat if ALT elevated or APAP detectable](#/node/apap-chronic-eval)\n• [GI decontamination — activated charcoal within 4 hours](#/node/apap-gi-decon)',
        },
        {
            heading: 'NAC Protocol',
            body: '• [IV NAC 21-hour 3-bag protocol (preferred)](#/node/apap-nac-iv)\n• [Oral NAC 72-hour protocol (alternative)](#/node/apap-nac-oral)\n• [Anaphylactoid reaction management — slow rate, antihistamines, NEVER stop permanently](#/node/apap-nac-anaphylactoid)\n• [Stopping criteria: APAP <10 + INR <2 + AST/ALT improving + clinically well](#/node/apap-nac-stop)',
        },
        {
            heading: 'Massive Overdose (>30g or above 300 line)',
            body: '• [High-dose NAC — Hendrickson protocol (2-4× standard Bag 3 rate)](#/node/apap-high-nac)\n• [Fomepizole — CYP2E1 inhibitor, blocks NAPQI formation](#/node/apap-fomepizole)\n• [Hemodialysis — EXTRIP indications, removes APAP and NAPQI](#/node/apap-dialysis)',
        },
        {
            heading: 'Hepatic Failure & Disposition',
            body: '• [Established hepatic failure — continue NAC indefinitely](#/node/apap-hepatic-failure)\n• [King\'s College Criteria — transplant referral](#/node/apap-kings)\n• [Supportive care — coagulopathy, cerebral edema, hypoglycemia, renal failure](#/node/apap-hepatic-support)\n• [Disposition — admit vs ICU vs discharge criteria](#/node/apap-dispo-discharge)',
        },
    ],
    citations: [
        { num: 1, text: 'Dart RC, et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open. 2023;6(8):e2327739. PMID 37552484' },
    ],
};
const APAP_STAGES = {
    id: 'apap-stages',
    title: 'Four Stages of Acetaminophen Toxicity',
    subtitle: 'Clinical timeline and laboratory evolution',
    sections: [
        {
            heading: 'Stage 1: Incubation (0–24 hours)',
            body: 'Often **asymptomatic** or nonspecific: nausea, vomiting, anorexia, diaphoresis.\nLabs generally **normal** during this period.\n\n⚠️ Symptoms during this period (altered mental status, lactic acidosis) suggest **massive ingestion** (>30g) or coingestant — evaluate for high-risk protocol. [1]',
        },
        {
            heading: 'Stage 2: Latent Period (24–72 hours)',
            body: 'Stage 1 symptoms **resolve or improve** — patient may appear well (the "treacherous calm").\nRight upper quadrant pain can develop.\n\n**Labs:** AST elevation nearly universal by 36 hours. AST is the most sensitive early marker. ALT:AST ratio typically 1:1 initially. Nephrotoxicity may begin. [2]',
        },
        {
            heading: 'Stage 3: Peak Hepatotoxicity (72–96 hours)',
            body: 'Systemic symptoms reappear: nausea/vomiting, malaise, jaundice.\n**Hepatic failure emerges:** encephalopathy, coagulopathy (INR elevation), hypoglycemia, lactic acidosis.\n\nAST/ALT may exceed **10,000 IU/L**. Peak occurs 3-4 days post-ingestion.\nGreatest risk of death — usually from **cerebral edema**, multi-organ failure, or sepsis.\n\n**Key pearl:** Patients with peak AST/ALT <1,000 usually do NOT develop clinically significant hepatic dysfunction. [2, 3]\n\n**AST:ALT ratio pearl:** An AST:ALT ratio <0.4 suggests aminotransferases have peaked and are falling — a reassuring sign.',
        },
        {
            heading: 'Stage 4: Recovery (4 days – 2 weeks)',
            body: 'Patients who survive make a **complete recovery** — the liver regenerates fully without chronic sequelae.\nTransaminases normalize over 1-2 weeks.\nNo increased risk of chronic liver disease. [2]',
        },
    ],
    citations: [
        { num: 1, text: 'Fisher ES, Curry SC. Evaluation and treatment of acetaminophen toxicity. Adv Pharmacol. 2019;85:263-272. PMID 31307590' },
        { num: 2, text: 'Chiew AL, Buckley NA. Acetaminophen Poisoning. Crit Care Clin. 2021;37(3):543-561. PMID 34053705' },
        { num: 3, text: 'Chidiac AS, et al. Paracetamol (acetaminophen) overdose and hepatotoxicity. Expert Opin Drug Metab Toxicol. 2023;19(5):297-317. PMID 37436926' },
    ],
};
const APAP_NOMOGRAM = {
    id: 'apap-nomogram',
    title: 'Rumack-Matthew Nomogram',
    subtitle: 'Prerequisites, interpretation, and confounders',
    sections: [
        {
            heading: 'Prerequisites',
            body: 'The nomogram is valid ONLY when ALL of the following are true:\n• **Acute ingestion** — ingestion within a period of <24 hours\n• **Reliable history** — dose, time, and formulation are known\n• **Time since ingestion** is defined as time since the **end** of the ingestion period\n• APAP level drawn at **≥4 hours** post-ingestion [1]',
        },
        {
            heading: 'Interpretation',
            body: '**Treatment Line (150 mcg/mL at 4h):** Levels above this line indicate risk of hepatic failure — start NAC.\n**High-Risk Line (300 mcg/mL at 4h):** Levels above this line indicate massive overdose — high-dose NAC protocol, consider fomepizole and hemodialysis.\n\nBoth lines follow exponential decay with an approximate 4-hour half-life. The US uses the 150-line (lowered from the original 200-line for added safety margin). [1, 2]',
        },
        {
            heading: 'When the Nomogram Does NOT Apply',
            body: '• **Chronic/repeated supratherapeutic ingestion** (ingestions spanning >24 hours) — use (ALT)(APAP) product instead\n• **Unreliable history** — conflicting statements, insufficient detail, symptoms inconsistent with history\n• **Late presentation** (>24 hours post-ingestion)\n• **Unknown timing** of ingestion\n• **Extended-release formulations** — may have delayed peak; if below treatment line but >10 mcg/mL, redraw in 4-6 hours [2]',
        },
        {
            heading: 'Confounders That Increase Risk',
            body: '**CYP2E1 inducers** (increase toxic NAPQI production):\n• Isoniazid, rifampin, phenobarbital, carbamazepine, phenytoin\n• Chronic alcohol ingestion\n\n**Glutathione depletion:**\n• Chronic alcohol use, chronic APAP use, chronic liver disease\n• Malnutrition, fasting\n\n**Decreased glucuronidation:**\n• Gilbert disease, zidovudine, TMP-SMX\n\n⚠️ Lower treatment thresholds in these patients — consider treating below the line if risk factors present. [1, 3]',
        },
        {
            heading: 'Special Situations',
            body: '**Extended-release tablets:** If level at 4-12h is below treatment line but >10 mcg/mL → redraw in 4-6 hours.\n**Opioid/anticholinergic coingestants:** Delay gastric emptying → delayed absorption peak. Same redraw logic if >10 mcg/mL.\n**Level <4h post-ingestion:** Undetectable level after >2h typically excludes significant ingestion. If detectable, redraw at ≥4h. [2]',
        },
    ],
    citations: [
        { num: 1, text: 'Rumack BH. Acetaminophen hepatotoxicity: the first 35 years. J Toxicol Clin Toxicol. 2002;40(1):3-20. PMID 11990202' },
        { num: 2, text: 'Dart RC, et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open. 2023;6(8):e2327739. PMID 37552484' },
        { num: 3, text: 'Bunchorntavakul C, Reddy KR. Acetaminophen and Acute Liver Failure. Clin Liver Dis. 2018;22(2):325-346. PMID 29605069' },
    ],
};
const APAP_NAC_COMPARISON = {
    id: 'apap-nac-comparison',
    title: 'NAC Protocol Comparison',
    subtitle: 'IV 21-Hour vs Oral 72-Hour vs Two-Bag Modified Prescott',
    sections: [
        {
            heading: 'IV 21-Hour Protocol (Preferred)',
            body: '**Bag 1:** 150 mg/kg in 200 mL D5W over 60 min\n**Bag 2:** 50 mg/kg in 500 mL D5W over 4 hours\n**Bag 3:** 100 mg/kg in 1000 mL D5W over 16 hours\n**Total:** 300 mg/kg over 21 hours\n\n**Advantages:** 100% bioavailability, faster completion, avoids vomiting, preferred in pregnancy.\n**Disadvantage:** Anaphylactoid reactions (~10-20%, usually mild, during loading dose). [1]',
        },
        {
            heading: 'Oral 72-Hour Protocol',
            body: '**Loading:** 140 mg/kg PO\n**Maintenance:** 70 mg/kg PO q4h × 17 additional doses\n**Total:** 1,330 mg/kg over 72 hours\n\n**Advantages:** No IV access needed, no anaphylactoid risk, higher hepatic first-pass delivery.\n**Disadvantages:** 72-hour duration, vomiting common (mix with cola), terrible smell/taste, lower systemic bioavailability (4-10%). Repeat dose if vomiting within 1 hour. [1, 2]',
        },
        {
            heading: 'Two-Bag Modified Prescott Protocol',
            body: '**Bag 1:** 200 mg/kg in D5W over 4 hours\n**Bag 2:** 100 mg/kg in D5W over 16 hours\n**Total:** 300 mg/kg over 20 hours\n\nUsed in Australia/New Zealand. **Lower rate of anaphylactoid reactions** than the standard 3-bag protocol (slower initial infusion rate). [3]',
        },
        {
            heading: 'Pregnancy',
            body: 'Pregnancy is **NOT a contraindication** to NAC.\n\n• Acetaminophen poses risk of hepatic failure to **both** mother and fetus\n• NAC is safe and beneficial in pregnancy\n• **IV route preferred** — achieves higher serum levels and avoids vomiting\n• Delayed treatment associated with increased miscarriage and fetal death [4]',
        },
        {
            heading: 'Morbid Obesity',
            body: '**Cap the dose at 100 kg body weight** per consensus guidelines.\n\nUsing actual weight in morbidly obese patients leads to unnecessarily high doses with increased risk of fluid overload and anaphylactoid reactions. [1]',
        },
    ],
    citations: [
        { num: 1, text: 'Dart RC, et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open. 2023;6(8):e2327739. PMID 37552484' },
        { num: 2, text: 'Smilkstein MJ, et al. Efficacy of oral N-acetylcysteine in the treatment of acetaminophen overdose. N Engl J Med. 1988;319(24):1557-1562. PMID 3059186' },
        { num: 3, text: 'Wong A, et al. Comparison of two- versus three-bag IV acetylcysteine protocols. Clin Toxicol. 2013;51(7):676-679.' },
        { num: 4, text: 'Riggs BS, et al. Acute acetaminophen overdose during pregnancy. Obstet Gynecol. 1989;74(2):247-253. PMID 2748061' },
    ],
};
const APAP_ANAPHYLACTOID = {
    id: 'apap-anaphylactoid',
    title: 'NAC Anaphylactoid Reaction Management',
    subtitle: 'Graded response protocol — NOT a true allergy',
    sections: [
        {
            heading: 'Key Principle',
            body: 'NAC anaphylactoid reactions are **histamine-mediated** (direct drug effect), NOT IgE-mediated allergic reactions. They are **NOT a contraindication** to continuing NAC. Liver failure from inappropriately stopping NAC is far more dangerous than the anaphylactoid reaction itself.\n\nIn a study of **6,455 treatment courses**, no deaths were attributed to anaphylactoid reactions. [1]',
        },
        {
            heading: 'Timing',
            body: 'Usually occur during the **loading dose** (first 60 minutes). Almost always within the first **2 hours**, and invariably within **6 hours** of initiation. [1]',
        },
        {
            heading: 'Graded Response Protocol',
            body: '**Flushing only:**\n→ Continue NAC at same rate. Monitor closely.\n\n**Urticaria:**\n→ Diphenhydramine 1 mg/kg IV (max 50 mg). Consider a corticosteroid. **Continue NAC.**\n\n**Angioedema:**\n→ Diphenhydramine 1 mg/kg IV + corticosteroid. **Hold NAC for 1 hour**, then resume at slower rate.\n\n**Respiratory symptoms or hypotension:**\n→ Diphenhydramine 1 mg/kg IV + corticosteroid + **epinephrine** (IM bolus or infusion). Hold NAC for 1 hour, then resume at slower rate. [1, 2]',
        },
        {
            heading: 'After the Reaction',
            body: '• **ALWAYS resume NAC** — this is NOT a true allergy\n• Resume at a **lower initial rate**, then titrate up\n• Previous anaphylactoid reaction does NOT preclude future NAC use — can pre-treat with antihistamines\n• Document as "anaphylactoid reaction to NAC" — NOT as an allergy [2]',
        },
    ],
    citations: [
        { num: 1, text: 'Yarema M, et al. Anaphylactoid Reactions to Intravenous N-Acetylcysteine during Treatment for Acetaminophen Poisoning. J Med Toxicol. 2018;14(2):120-127. PMID 29423816' },
        { num: 2, text: 'Pizon AF, Lovecchio F. Adverse reaction from use of intravenous N-acetylcysteine. J Emerg Med. 2006;31(4):434-435. PMID 17046490' },
    ],
};
const APAP_MASSIVE_OD = {
    id: 'apap-massive-od',
    title: 'High-Dose NAC & Massive Overdose',
    subtitle: 'Hendrickson dosing, fomepizole, and hemodialysis',
    sections: [
        {
            heading: 'Definition of Massive Overdose',
            body: '• >30 grams ingested (or >0.5 g/kg if <60 kg)\n• APAP level above the **300 line** on the Rumack-Matthew nomogram\n\nThese patients may present with **early lactic acidosis** and **altered mental status** within 12 hours — due to mitochondrial dysfunction, BEFORE liver damage occurs. [1]',
        },
        {
            heading: 'High-Dose NAC — Hendrickson Protocol (2019)',
            body: 'Standard NAC may be inadequate — NAC neutralizes NAPQI in a **1:1 molar ratio**, so the dose must scale with the amount of acetaminophen.\n\nKeep Bag 1 + Bag 2 standard. **Increase Bag 3 infusion rate** based on severity:\n\n• **Above 300 line:** 12.5 mg/kg/hr (2× standard)\n• **Above 450 line:** 18.75 mg/kg/hr (3× standard)\n• **Above 600 line:** 25 mg/kg/hr (4× standard)\n\n**During hemodialysis:** Double the rate you would otherwise use (HD removes ~50% of NAC). Maximum rate: 25 mg/kg/hr.\n\nDoubling the rate is increasingly accepted; tripling/quadrupling is more controversial — consult toxicology. [2, 3]',
        },
        {
            heading: 'Fomepizole — CYP2E1 Inhibition',
            body: 'Fomepizole inhibits CYP2E1, which prevents the conversion of acetaminophen to toxic NAPQI. Complementary mechanism to NAC (which detoxifies NAPQI after it forms).\n\n**Dosing:** 15 mg/kg IV over 30 min loading → 10 mg/kg IV q12h × 48h or until APAP undetectable.\n\nGenerally safe. Main drawback is cost. Use for established high-risk ingestions alongside high-dose NAC. [4, 5]',
        },
        {
            heading: 'Hemodialysis — EXTRIP Guidelines',
            body: '**EXTRIP indications for extracorporeal treatment:**\n• APAP level >900 mcg/mL\n• Altered mental status + lactate >3 + pH <7.1\n• Clinical deterioration despite adequate NAC\n\nDialysis removes both APAP and toxic NAPQI metabolites. **NOT a substitute for NAC** — patients on dialysis require HIGHER NAC doses (at minimum 12.5 mg/kg/hr). [6]',
        },
    ],
    citations: [
        { num: 1, text: 'Fisher ES, Curry SC. Evaluation and treatment of acetaminophen toxicity. Adv Pharmacol. 2019;85:263-272. PMID 31307590' },
        { num: 2, text: 'Hendrickson RG. What is the most appropriate dose of N-acetylcysteine after massive acetaminophen overdose? Clin Toxicol. 2019;57(8):686-691. PMID 30777470' },
        { num: 3, text: 'Chiew AL, Buckley NA. Acetaminophen Poisoning. Crit Care Clin. 2021;37(3):543-561. PMID 34053705' },
        { num: 4, text: 'Kang AM, et al. The effect of 4-methylpyrazole on oxidative metabolism of acetaminophen in human volunteers. J Med Toxicol. 2020;16(2):169-176. PMID 31768936' },
        { num: 5, text: 'Shah KR, Beuhler MC. Fomepizole as an adjunctive treatment in severe acetaminophen toxicity. Am J Emerg Med. 2020;38(2):410.e5-410.e6. PMID 31785979' },
        { num: 6, text: 'Gosselin S, et al. Extracorporeal treatment for acetaminophen poisoning: recommendations from the EXTRIP workgroup. Clin Toxicol. 2014;52(8):856-867. PMID 25133498' },
    ],
};
const APAP_RISK_FACTORS = {
    id: 'apap-risk-factors',
    title: 'Risk Factors for Enhanced Toxicity',
    subtitle: 'CYP2E1 induction, glutathione depletion, and decreased conjugation',
    sections: [
        {
            heading: 'CYP2E1 Inducers (Increase Toxic NAPQI Production)',
            body: '• **Isoniazid (INH)** — most clinically significant\n• **Rifampin**\n• **Phenobarbital**\n• **Carbamazepine**\n• **Phenytoin**\n• **Chronic alcohol ingestion** (NOT acute intoxication — acute alcohol actually competes with APAP for CYP2E1 and may be protective)\n\nThese patients produce more NAPQI per dose of acetaminophen, overwhelming glutathione stores faster. [1, 2]',
        },
        {
            heading: 'Glutathione Depletion',
            body: '• **Chronic alcohol use** (double risk: CYP2E1 induction + glutathione depletion)\n• **Chronic acetaminophen use** (subacute glutathione depletion)\n• **Chronic liver disease**\n• **Malnutrition / fasting** — even brief fasting reduces hepatic glutathione\n\nDepleted glutathione stores cannot neutralize NAPQI, leading to hepatocellular necrosis at lower APAP doses. [1, 3]',
        },
        {
            heading: 'Decreased Hepatic Glucuronidation',
            body: '• **Gilbert\'s disease** (genetic decrease in UDP-glucuronosyltransferase)\n• **Zidovudine**\n• **Trimethoprim-sulfamethoxazole (TMP-SMX)**\n\nReduced glucuronidation shifts more acetaminophen through the CYP2E1 pathway → more NAPQI production. [1]',
        },
        {
            heading: 'Clinical Implications',
            body: '**Lower threshold for NAC treatment** in patients with any of these risk factors.\n\n• Consider treating even if APAP level is below the nomogram treatment line\n• The "150 line" was already lowered from the original "200 line" to add a safety margin — but high-risk patients may need treatment even below 150\n• Chronic alcohol + chronic APAP = "alcohol-tylenol syndrome" — hepatotoxicity at doses generally considered safe [3]',
        },
    ],
    citations: [
        { num: 1, text: 'Bunchorntavakul C, Reddy KR. Acetaminophen and Acute Liver Failure. Clin Liver Dis. 2018;22(2):325-346. PMID 29605069' },
        { num: 2, text: 'Internet Book of Critical Care: Acetaminophen Toxicity. Josh Farkas, PulmCrit/IBCC. Updated August 2025.' },
        { num: 3, text: 'Chidiac AS, et al. Paracetamol (acetaminophen) overdose and hepatotoxicity. Expert Opin Drug Metab Toxicol. 2023;19(5):297-317. PMID 37436926' },
    ],
};
const APAP_CHRONIC_INGESTION = {
    id: 'apap-chronic-ingestion',
    title: 'Chronic/Repeated Supratherapeutic Ingestion',
    subtitle: 'When the Rumack-Matthew nomogram does not apply',
    sections: [
        {
            heading: 'Definition',
            body: 'Repeated supratherapeutic ingestion = **multiple ingestions spanning >24 hours**. This includes acute-on-chronic acetaminophen use.\n\nMore common than acute overdose in clinical practice. Often more dangerous than appreciated due to subacute depletion of hepatic glutathione stores. [1]',
        },
        {
            heading: 'The "Alcohol-Tylenol Syndrome"',
            body: 'Chronic alcohol use + chronic acetaminophen ingestion can cause hepatotoxicity at doses that are **generally considered safe** (<4 g/day).\n\nMechanism: chronic alcohol induces CYP2E1 (more NAPQI) + depletes glutathione (less NAPQI neutralization) — a "double hit." [2]',
        },
        {
            heading: 'Why the Nomogram Does Not Apply',
            body: 'The Rumack-Matthew nomogram was validated for a **single acute ingestion** with known timing. In repeated ingestions:\n• There is no single "time of ingestion" to plot\n• Glutathione stores may already be depleted\n• APAP levels may be deceptively low despite significant hepatic injury\n\nUse the **(ALT)(APAP) product** instead: >10,000 strongly predicts hepatotoxicity, <1,500 makes it very unlikely. [1, 3]',
        },
        {
            heading: 'Treatment Approach',
            body: '**Start NAC if:**\n• APAP level is detectable AND ALT is elevated\n• (ALT)(APAP) product >10,000\n• Clinical concern despite normal initial labs (consider risk factors)\n\n**Consult toxicology/poison control** — these cases are often complex.\n\n**Monitor:** Serial APAP levels, AST/ALT, INR q6h. The (ALT)(APAP) product can be recalculated with each set of labs to track trajectory. [1]',
        },
    ],
    citations: [
        { num: 1, text: 'Dart RC, et al. Management of Acetaminophen Poisoning in the US and Canada: A Consensus Statement. JAMA Netw Open. 2023;6(8):e2327739. PMID 37552484' },
        { num: 2, text: 'Chidiac AS, et al. Paracetamol (acetaminophen) overdose and hepatotoxicity. Expert Opin Drug Metab Toxicol. 2023;19(5):297-317. PMID 37436926' },
        { num: 3, text: 'Internet Book of Critical Care: Acetaminophen Toxicity. Josh Farkas, PulmCrit/IBCC. Updated August 2025.' },
    ],
};
// -------------------------------------------------------------------
// Sepsis Info Pages
// -------------------------------------------------------------------
const SEPSIS_SUMMARY = {
    id: 'sepsis-summary',
    title: 'Sepsis Steps Summary',
    subtitle: 'Quick Reference — Recognition → Resuscitation → Monitoring → Disposition',
    sections: [
        {
            heading: 'Recognition & Assessment',
            body: '[Assess hemodynamic status and severity](#/node/sepsis-start)\n• Sepsis-3: infection + organ dysfunction (SOFA ≥2)\n• Septic shock: vasopressor-dependent + lactate >2\n[Source evaluation by organ system](#/node/sepsis-eval)\n[Order labs, cultures, imaging](#/node/sepsis-labs)\n[Identify suspected infectious source](#/node/sepsis-source-id)',
        },
        {
            heading: 'Resuscitation Bundle (First 1-3 Hours)',
            body: '[Airway & breathing stabilization](#/node/sepsis-airway)\n[30 mL/kg IV crystalloid (LR preferred)](#/node/sepsis-fluids)\n[Empiric antibiotics within 1 hour](#/node/sepsis-abx-empiric)\n• Beta-lactam FIRST when also giving vancomycin\n[MRSA coverage if risk factors present](#/node/sepsis-mrsa)\n[Source control within 6-12 hours](#/node/sepsis-source-ctrl)\n[Reassess at 1-3 hours](#/node/sepsis-reassess)',
        },
        {
            heading: 'Hemodynamic Management',
            body: '[Norepinephrine — first-line vasopressor](#/node/sepsis-vp-init)\n• Can start peripherally for <6 hours\n[Second-line: vasopressin or epinephrine](#/node/sepsis-vp-second)\n[MAP targets & personalization](#/node/sepsis-map-target)\n[Fluid responsiveness assessment](#/node/sepsis-fluid-assess)\n[Inotrope for low cardiac output](#/node/sepsis-inotrope)\n[Refractory shock management](#/node/sepsis-refractory)',
        },
        {
            heading: 'Advanced Therapies',
            body: '[Stress-dose hydrocortisone for vasopressor-dependent shock](#/node/sepsis-steroids)\n[Septic cardiomyopathy recognition](#/node/sepsis-cardiomyop)\n[Transfusion threshold: Hgb ≤7 g/dL](#/node/sepsis-transfusion)\n[Sepsis mimics & differential](#/node/sepsis-mimics-node)',
        },
        {
            heading: 'Monitoring & Disposition',
            body: '[Resuscitation endpoints — MAP, CRT, UOP, lactate](#/node/sepsis-monitor)\n[Antibiotic de-escalation at 48-72h](#/node/sepsis-deesc-abx)\n[Fluid & vasopressor weaning](#/node/sepsis-deesc-fluid)\n[ICU admission criteria](#/node/sepsis-dispo-icu)\n[Floor admission criteria](#/node/sepsis-dispo-floor)',
        },
    ],
    citations: [
        { num: 1, text: 'Evans L, et al. Surviving Sepsis Campaign Guidelines 2021. Crit Care Med. 2021;49(11):e1063.' },
        { num: 2, text: 'Farkas J. Septic Shock. IBCC. Nov 2025.' },
    ],
};
const SEPSIS_ABX_TABLE = {
    id: 'sepsis-abx-table',
    title: 'Empiric Antibiotic Selection',
    subtitle: 'By Suspected Source — Sepsis & Septic Shock',
    sections: [
        {
            heading: 'General Principles',
            body: '• Administer **within 1 hour** of sepsis recognition [1]\n• **Beta-lactam FIRST** when also giving vancomycin (improved survival)\n• Full loading dose regardless of renal function\n• Extended infusion for beta-lactam maintenance doses',
        },
        {
            heading: 'Unknown Source / Undifferentiated',
            body: '**Beta-lactam backbone** (choose one):\n• Piperacillin-tazobactam 4.5g IV q6h (broadest anaerobic coverage)\n• Cefepime 2g IV q8h (antipseudomonal, less anaerobic)\n• Meropenem 1g IV q8h (reserve for MDR risk)\n\n**Add MRSA coverage** if risk factors: Vancomycin 25-30 mg/kg IV load',
        },
        {
            heading: 'Pneumonia (Community-Acquired)',
            body: '**Beta-lactam** (ceftriaxone 2g IV or ampicillin-sulbactam)\n**PLUS atypical coverage:**\n• Doxycycline 100 mg IV q12h (preferred) OR\n• Azithromycin 500 mg IV\n\n**If Pseudomonas risk** (structural lung disease, recent abx, immunocompromised): Use antipseudomonal beta-lactam instead',
        },
        {
            heading: 'Urinary Source',
            body: '**Uncomplicated:** Ceftriaxone 2g IV\n**Complicated / Pseudomonas risk:** Piperacillin-tazobactam or cefepime\n**ESBL risk:** Meropenem 1g IV q8h\n\nReview prior urine cultures for resistance patterns',
        },
        {
            heading: 'Intra-Abdominal',
            body: '**Piperacillin-tazobactam 4.5g IV q6h** (covers anaerobes)\nOR **Meropenem 1g IV q8h** (if ESBL/MDR concern)\nOR **Cefepime + Metronidazole** (alternative combination)\n\n**C. difficile:** Oral vancomycin 125 mg QID +/- IV metronidazole 500 mg q8h',
        },
        {
            heading: 'Skin & Soft Tissue',
            body: '**Non-necrotizing:** Vancomycin + piperacillin-tazobactam\n**Necrotizing fasciitis:** Vancomycin + piperacillin-tazobactam + clindamycin (toxin suppression)\n**IVDU / line infection:** Vancomycin + antipseudomonal beta-lactam',
        },
        {
            heading: 'Endovascular / Line Infection',
            body: '**Vancomycin** (MRSA coverage) **+ antipseudomonal beta-lactam**\n• Remove suspected infected catheter after establishing alternative access\n• Draw cultures through line AND peripherally before removal\n\n**Endocarditis suspected:** Add gentamicin for synergy (consult ID)',
        },
        {
            heading: 'MRSA Risk Factors',
            body: '• Prior MRSA infection or colonization\n• Recent hospitalization or long-term care\n• Hemodialysis\n• IV drug use\n• Central line or indwelling device\n• Soft tissue infection with purulence\n• Nosocomial / surgical site infection',
        },
        {
            heading: 'Pseudomonas Risk Factors',
            body: '• Structural lung disease (bronchiectasis, CF)\n• Recent broad-spectrum antibiotic exposure\n• Prolonged hospitalization or ICU stay\n• Neutropenia or immunosuppression\n• Known prior Pseudomonas cultures',
        },
    ],
    citations: [
        { num: 1, text: 'Evans L, et al. Surviving Sepsis Campaign Guidelines 2021. Crit Care Med. 2021;49(11):e1063.' },
        { num: 2, text: 'Hwang et al. Updates in Early Management of Sepsis. EB Medicine. Aug 2025.' },
        { num: 3, text: 'Farkas J. Septic Shock. IBCC. Nov 2025.' },
    ],
};
const SEPSIS_SOURCE_CONTROL = {
    id: 'sepsis-source-control',
    title: 'Source Control Guide',
    subtitle: 'Interventions by Infection Source',
    sections: [
        {
            heading: 'Principles',
            body: '**Source control within 6-12 hours** when feasible. Undrained foci may not respond to antibiotics alone. [1]\n\nBalance: risk of intervention vs. patient stability. Decisions should consider diagnostic uncertainty regarding the source.',
        },
        {
            heading: 'Interventions by Source',
            body: '• **Intravascular catheter infection:** Remove catheter after establishing alternative access\n• **Abscess (any site):** Percutaneous or surgical drainage (thoracic empyema, peritoneal, joint, perirectal)\n• **Ascending cholangitis:** ERCP or percutaneous transhepatic cholangiography\n• **Obstructing nephrolithiasis with infection:** Percutaneous nephrostomy or ureteral stent\n• **Bowel perforation/obstruction:** Surgical repair\n• **Necrotizing fasciitis:** Emergent surgical debridement (do not delay)\n• **Fulminant C. difficile colitis:** Colectomy\n• **Infected implantable device/hardware:** Removal when feasible\n• **Toxic shock syndrome:** Drain or excise any toxin-producing focus, even minor',
        },
    ],
    citations: [
        { num: 1, text: 'Evans L, et al. Surviving Sepsis Campaign Guidelines 2021. Crit Care Med. 2021;49(11):e1063.' },
    ],
};
const SEPSIS_VP_COMPARISON = {
    id: 'sepsis-vp-comparison',
    title: 'Vasopressor Comparison',
    subtitle: 'Agent Selection for Septic Shock',
    sections: [
        {
            heading: 'Norepinephrine (First-Line)',
            body: '**Receptors:** Alpha-1 >> Beta-1\n**Effect:** Vasoconstriction + mild inotropy\n**Dose:** 0.01-3 mcg/kg/min\n**Evidence:** Multiple meta-analyses favor NE over dopamine. Standard of care.\n**Pros:** Reliable, well-studied, improves MAP without excessive tachycardia\n**Cons:** Digital/splanchnic ischemia at high doses',
        },
        {
            heading: 'Vasopressin (Second-Line)',
            body: '**Receptors:** V1 (vascular smooth muscle), V2 (renal)\n**Effect:** Non-adrenergic vasoconstriction\n**Dose:** 0.03-0.04 units/min (FIXED, non-titratable)\n**Evidence:** VASST — NE-sparing, no mortality benefit. VANISH — no renal benefit. Meta-analysis: lower AF risk (RR 0.77)\n**Pros:** NE-sparing, lower AF risk, no tachycardia\n**Cons:** No inotropy, splanchnic ischemia risk',
        },
        {
            heading: 'Epinephrine (Alternative First-Line)',
            body: '**Receptors:** Alpha-1, Beta-1, Beta-2\n**Effect:** Vasoconstriction + inotropy + chronotropy\n**Dose:** 0.01-0.5 mcg/kg/min\n**Evidence:** CAT trial — outcomes similar to NE\n**Pros:** Combines vasopressor + inotrope. Good for bradycardia/cardiac dysfunction\n**Cons:** Increases lactate (aerobic), tachyarrhythmia risk, worsens acidosis if lactate >5',
        },
        {
            heading: 'Phenylephrine (Temporizing / Select Use)',
            body: '**Receptors:** Pure Alpha-1\n**Effect:** Vasoconstriction only — no inotropy, no chronotropy\n**Dose:** 100-200 mcg IV push; infusion 40-200 mcg/min\n**Evidence:** Limited. NOT recommended as primary vasopressor\n**Use:** Push-dose temporizer while preparing NE infusion. Consider for severe tachyarrhythmia (e.g., rapid AF) where beta stimulation is undesirable',
        },
        {
            heading: 'Dopamine (NOT Recommended)',
            body: '**DO NOT USE for septic shock**\n**Evidence:** SOAP-II trial (n=1679) — dopamine associated with **increased arrhythmias and mortality** vs norepinephrine [1]\n**Reason:** Dose-dependent receptor profile (dopaminergic → beta-1 → alpha-1) is unreliable. Higher rates of tachyarrhythmia. No role in modern sepsis management.',
        },
        {
            heading: 'Dobutamine (Inotrope, Not Vasopressor)',
            body: '**Receptors:** Beta-1 >> Beta-2\n**Effect:** Inotropy + mild vasodilation\n**Dose:** 2-20 mcg/kg/min\n**Use:** Low cardiac output despite adequate vasopressors (septic cardiomyopathy)\n**Caution:** May cause hypotension — up-titrate NE if BP drops. Not for supranormal cardiac index.',
        },
        {
            heading: 'Methylene Blue (Salvage)',
            body: '**Mechanism:** iNOS/eNOS inhibition → restores vascular tone\n**Dose:** 1-2 mg/kg IV bolus, then 0.5 mg/kg/h infusion\n**Evidence:** Ibarra-Estrada 2023 RCT — shorter time to vasopressor discontinuation, more pressor-free days\n**Use:** Refractory shock on multiple vasopressors + glucocorticoids',
        },
    ],
    citations: [
        { num: 1, text: 'De Backer D, et al. Comparison of Dopamine and Norepinephrine (SOAP-II). NEJM. 2010;362(9):779-789.' },
        { num: 2, text: 'Evans L, et al. Surviving Sepsis Campaign Guidelines 2021. Crit Care Med. 2021;49(11):e1063.' },
        { num: 3, text: 'Farkas J. Septic Shock. IBCC. Nov 2025.' },
    ],
};
const SEPSIS_FLUID_GUIDE = {
    id: 'sepsis-fluid-guide',
    title: 'Fluid Resuscitation Guide',
    subtitle: 'Volume, Type, and Special Populations',
    sections: [
        {
            heading: 'Initial Volume',
            body: '**30 mL/kg IV crystalloid** within first 3 hours [1]\n• Administer in 500 mL boluses, reassess between each\n• Stop if pulmonary edema develops or no further response\n• CLOVERS trial: restrictive vs liberal — similar mortality [2]\n• CLASSIC trial: restrictive approach safe, trend toward less intubation [3]',
        },
        {
            heading: 'Fluid Choice',
            body: '**Balanced crystalloid preferred** (Lactated Ringer\'s)\n• SMART trial: lower composite of death/RRT/persistent renal dysfunction vs 0.9% NaCl\n• **AVOID HES** — 6S trial: increased mortality (51 vs 43%) and RRT\n• **No benefit to albumin** vs crystalloid (SAFE trial)\n• **No role for hypertonic saline**\n• If bicarb indicated: isotonic bicarbonate (150 mEq NaHCO₃ in 1L D5W)',
        },
        {
            heading: 'Special Populations',
            body: '• **Obesity (BMI >30):** Use ideal body weight for 30 mL/kg calculation\n• **Heart failure:** Smaller initial bolus acceptable — document rationale for CMS\n• **ESRD:** Same initial bolus recommended despite dialysis status\n• **Pneumonia with mild hypotension:** Fluid-conservative + early vasopressors\n• CMS SEP-1 allows <30 mL/kg if clinician documents reasoning',
        },
        {
            heading: 'After Initial Resuscitation',
            body: '**RESTRICT further fluids** — most crystalloid extravasates (~95% leaves vasculature)\n• ICU patients receive ~1.5L/day from infusions + antibiotics alone\n• Track net fluid balance — avoid >4-5L net positive\n• Use dynamic measures for fluid responsiveness (PLR, IVC, PPV)\n• Fluid responsiveness is NORMAL — it does NOT mean give more fluid\n• Absence of fluid responsiveness suggests volume overload',
        },
    ],
    citations: [
        { num: 1, text: 'Evans L, et al. Surviving Sepsis Campaign Guidelines 2021. Crit Care Med. 2021;49(11):e1063.' },
        { num: 2, text: 'CLOVERS Investigators. NEJM. 2023;388(6):499-510.' },
        { num: 3, text: 'CLASSIC Investigators. NEJM. 2022;386(26):2459-2470.' },
    ],
};
const SEPSIS_MIMICS = {
    id: 'sepsis-mimics',
    title: 'Sepsis Mimics & Differential Diagnosis',
    subtitle: 'Consider When Treatment Fails or Source Is Unclear',
    sections: [
        {
            heading: 'When to Suspect a Mimic',
            body: '• No clear infectious source identified\n• Procalcitonin unexpectedly low\n• Atypical clinical course\n• Not responding to appropriate antibiotics and resuscitation',
        },
        {
            heading: 'Infectious Mimics',
            body: '• **Endocarditis** causing valve failure → cardiogenic shock (not distributive)\n• **Tick-borne illness** — anaplasmosis, babesiosis (exposure, thrombocytopenia, hemolysis)\n• **Invasive candidiasis** — ongoing critical illness, central line, colonization, TPN\n• **Invasive aspergillosis** — prolonged neutropenia, heme malignancy, steroids\n• **PJP pneumonia** — diffuse infiltrates, HIV, chronic steroids, immunosuppression',
        },
        {
            heading: 'Endocrine Mimics',
            body: '• **[Adrenal crisis](#/tree/adrenal-insufficiency)** — recent steroid d/c, vasopressor-refractory, eosinophilia, abdominal pain\n• **[Thyroid storm](#/tree/thyroid)** — tremors, thyromegaly, tachycardia, encephalopathy\n• **DKA** — hyperglycemia, anion gap (may coexist with sepsis!)',
        },
        {
            heading: 'GI Mimics',
            body: '• **Acute mesenteric ischemia** — AF, vasculopathy, pain out of proportion → CTA\n• **Bowel obstruction** → CT abdomen\n• **Pancreatitis** — epigastric pain, elevated lipase\n• **Fulminant hepatic failure** — LFTs\n• **Decompensated cirrhosis** — does not exclude concurrent sepsis',
        },
        {
            heading: 'Toxicological Mimics',
            body: '• **Salicylate intoxication** — tachypnea, delirium, elevated AG → check salicylate level\n• **Beta-blocker/CCB overdose** — disproportionate bradycardia\n• **Carbon monoxide** — exposure history → carboxyhemoglobin\n• **Metformin toxicity** — disproportionate lactate elevation',
        },
        {
            heading: 'Other Mimics',
            body: '• **Anaphylaxis** — rapid onset, hives, bronchospasm (treat both if uncertain)\n• **HLH** — cytopenias, hepatosplenomegaly, very high fevers → ferritin\n• **DRESS/AGEP** — skin exam, medication review\n• **Aspiration pneumonitis** — rapid onset AND often rapid recovery',
        },
    ],
    citations: [
        { num: 1, text: 'Farkas J. Septic Shock — Sepsis Mimics. IBCC. Nov 2025.' },
        { num: 2, text: 'Long B, Koyfman A. Clinical Mimics: An EM-Focused Review of Sepsis Mimics. J Emerg Med. 2017;52(1):34-42.' },
    ],
};
const SEPSIS_CARDIOMYOPATHY_PAGE = {
    id: 'sepsis-cardiomyopathy',
    title: 'Septic Cardiomyopathy',
    subtitle: 'Recognition, Diagnosis & Management',
    sections: [
        {
            heading: 'Overview',
            body: 'Occurs in **up to 50%** of septic shock patients. Acute, biventricular myocardial dysfunction that is **reversible within 7-10 days**. Often under-recognized because systemic vasodilation may mask low EF (pseudo-normal LVEF).',
        },
        {
            heading: 'Clinical Clues',
            body: '• Low cardiac output (cool extremities) despite adequate MAP\n• Vasopressor-refractory shock\n• Preload unresponsiveness (not fluid responsive)\n• Narrow pulse pressure (<40 mmHg)\n• Profound systemic inflammation (toxic shock, gram-negative sepsis)\n• Prior history of heart failure\n• Abrupt vasopressor escalation without clear clinical trigger',
        },
        {
            heading: 'Echocardiographic Findings',
            body: '**LV Systolic:**\n• LVEF <45% (may be pseudo-normal from vasodilation)\n• Reduced global longitudinal strain (GLS <-17%)\n• Reduced MAPSE\n\n**LV Diastolic:**\n• Lateral e\' <8 cm/s (strongly predicts mortality)\n• Lateral E/e\' >13 cm/s (suggests elevated LVEDP)\n\n**RV Dysfunction:**\n• TAPSE <16 mm\n• RV/LV ratio >0.6\n• TDI S\' <10 cm/s',
        },
        {
            heading: 'Management',
            body: '• **Avoid excessive vasoconstrictors** — NE + vasopressin without inotropy is suboptimal\n• **Inotrope:** Dobutamine (first choice) or epinephrine\n• **Stress-dose steroids** (inflammatory cytokines worsen cardiomyopathy)\n• Treat fever, agitation, shivering (reduce O₂ demand)\n• **Thiamine** if deficiency possible\n• Fluid removal if significant congestion\n• Consider ECMO for pure cardiogenic failure phenotype\n• Do NOT discontinue dexmedetomidine without considering its sympatholytic effects on HR',
        },
        {
            heading: 'Differential Diagnosis',
            body: '• Acute MI (check ECG, troponin trend)\n• Myocarditis\n• Stress (Takotsubo) cardiomyopathy (usually no RV involvement)\n• LVOTO (LV outflow tract obstruction)\n• RV failure from PE\n• Chronic HF with superimposed septic cardiomyopathy',
        },
    ],
    citations: [
        { num: 1, text: 'Farkas J. Septic Cardiomyopathy. IBCC. Nov 2025.' },
        { num: 2, text: 'L\'Heureux M, et al. Sepsis-Induced Cardiomyopathy: a Comprehensive Review. Curr Cardiol Rep. 2020;22(5):35.' },
    ],
};
const SEPSIS_SEP1_BUNDLE = {
    id: 'sepsis-sep1-bundle',
    title: 'CMS SEP-1 Bundle Requirements',
    subtitle: 'Quality Measure Compliance',
    sections: [
        {
            heading: 'Important Context',
            body: 'CMS SEP-1 uses **Sepsis-2 definitions** (not Sepsis-3). "Severe sepsis" = infection + organ dysfunction or lactate >2. "Septic shock" = SBP <90 not responsive to fluids, OR lactate ≥4 (regardless of hypotension). SEP-1 is currently pay-for-reporting, becoming pay-for-performance in 2026.',
        },
        {
            heading: '3-Hour Bundle (from time zero)',
            body: '1. **Measure serum lactate**\n2. **Obtain 2 sets of blood cultures** prior to antibiotic administration\n3. **Administer broad-spectrum IV antibiotics** (within 1 hour when possible)\n4. **If hypotensive OR lactate ≥4 mmol/L:** Administer 30 mL/kg IV crystalloid\n\n**Notes:**\n• Ideal body weight acceptable for BMI >30\n• <30 mL/kg acceptable if clinician documents reasoning (e.g., CHF concern)\n• Blood cultures should not delay antibiotics in critically ill patients',
        },
        {
            heading: '6-Hour Bundle (from time zero)',
            body: '1. **Remeasure lactate** if initial >2 mmol/L\n2. **If hypotensive OR lactate ≥4 in first 6 hours:**\n   • Administer IV vasopressors to achieve MAP ≥65 mmHg\n   • Reassess intravascular volume status and tissue perfusion\n\n**Reassessment options:**\n• Repeat focused exam (vitals, cardiopulmonary, CRT, skin, UOP)\n• Any two of: CVP, ScvO2, bedside echo, PLR, or fluid challenge',
        },
        {
            heading: 'Key Differences from Sepsis-3',
            body: '• SEP-1 does NOT require vasopressor dependence for "septic shock"\n• SEP-1 uses lactate ≥4 as standalone shock criterion\n• Sepsis-3 requires both vasopressor need + lactate >2\n• SSC 2021 guidelines largely align with Sepsis-3, not CMS criteria',
        },
    ],
    citations: [
        { num: 1, text: 'Hwang et al. Updates and Controversies in Early Management of Sepsis. EB Medicine. Aug 2025.' },
        { num: 2, text: 'Rhee C, et al. Improving Sepsis Outcomes in the Era of Pay-for-Performance (IDSA/ACEP/PIDS/SHEA/SHM/SIDP Position Paper). Clin Infect Dis. 2024;78(3):505-513.' },
    ],
};
// -------------------------------------------------------------------
// Opioid Withdrawal
// -------------------------------------------------------------------
const OW_SUMMARY = {
    id: 'ow-summary',
    title: 'Opioid Withdrawal Steps Summary',
    subtitle: 'Quick Reference — ED Management Pathway',
    sections: [
        {
            heading: '1. Recognition & Assessment',
            body: '\u2022 [Assess for classic signs: mydriasis, yawning, diaphoresis, piloerection, rhinorrhea, lacrimation](#/node/ow-recognize)\n\u2022 History: craving, dysphoria, myalgias, GI symptoms (nausea, vomiting, diarrhea, cramping)\n\u2022 [Calculate COWS score to grade severity](#/node/ow-cows-result)',
        },
        {
            heading: '2. Differential & Workup',
            body: '\u2022 [Rule out ethanol/sedative withdrawal (seizures, hyperthermia = NOT opioid WD)](#/node/ow-ddx-screen)\n\u2022 Labs: BMP if significant vomiting/diarrhea (hypoK, hypoMg \u2192 QT risk)\n\u2022 ECG if methadone use or combining QT-prolonging meds',
        },
        {
            heading: '3. Opioid Agonist Therapy (Preferred)',
            body: '\u2022 [Buprenorphine: 8 mg SL \u2192 reassess 30\u201360 min \u2192 repeat to max 32 mg](#/node/ow-bup-standard)\n\u2022 [Microdosing: 0.5\u20132 mg if on full agonist or fentanyl-dependent](#/node/ow-bup-micro)\n\u2022 [Methadone: 20 mg PO or 10 mg IM (QT risk, not preferred)](#/node/ow-methadone)',
        },
        {
            heading: '4. Non-Opioid Adjuncts',
            body: '\u2022 [Clonidine 0.1\u20130.3 mg PO q1h (max 0.8 mg/day) for autonomic symptoms](#/node/ow-adjuncts-rx)\n\u2022 Lofexidine 0.54 mg PO q5\u20136h (FDA-approved for OW)\n\u2022 Diazepam 5\u201310 mg IV or lorazepam 1\u20132 mg IV for anxiety\n\u2022 Ondansetron 4 mg for nausea; loperamide 4 mg for diarrhea\n\u2022 NSAIDs/acetaminophen for body aches',
        },
        {
            heading: '5. Precipitated Withdrawal',
            body: '\u2022 [Naloxone-precipitated: buprenorphine 16\u201332 mg SL (short-acting, resolves 1\u20132h)](#/node/ow-precip-naloxone)\n\u2022 [Naltrexone-precipitated: aggressive non-opioid adjuncts, IV fluids, consider ICU](#/node/ow-precip-naltrexone)',
        },
        {
            heading: '6. Disposition',
            body: '\u2022 [Discharge with bridge Rx (3\u20137 day buprenorphine) + MOUD referral within 72h](#/node/ow-discharge)\n\u2022 Harm reduction: naloxone kit, fentanyl test strips, overdose risk counseling\n\u2022 [Admit if: hemodynamic instability, intractable vomiting, naltrexone depot WD, pregnancy](#/node/ow-admit)',
        },
    ],
    citations: [
        { num: 1, text: 'Stolbach A, Hoffman RS. Opioid Withdrawal in Adults in the Emergency Setting. UpToDate. Updated Aug 2025.' },
        { num: 2, text: 'Hazekamp CS, Sacco D. Managing Emergency Department Patients With Opioid Use Disorder. Emergency Medicine Practice. 2024;26(6).' },
    ],
};
const OW_COWS_GUIDE = {
    id: 'ow-cows-guide',
    title: 'COWS Score Interpretation',
    subtitle: 'Clinical Opioid Withdrawal Scale \u2014 Scoring Guide',
    sections: [
        {
            body: 'The COWS is an 11-item clinician-administered instrument that rates common signs and symptoms of opioid withdrawal. Designed to be completed within 2 minutes with high interrater reliability (\u03BA > 0.75 for all items). [1][2]',
        },
        {
            heading: 'Score Interpretation',
            body: '**0\u20134: No Withdrawal** \u2014 Observe. Do not initiate buprenorphine (risk of precipitated withdrawal if full agonist still active). Reassess in 1\u20132 hours.\n\n**5\u201312: Mild Withdrawal** \u2014 May initiate buprenorphine if COWS \u2265 8 (traditional threshold). Consider symptomatic treatment alone if patient prefers.\n\n**13\u201324: Moderate Withdrawal** \u2014 Initiate opioid agonist therapy. This is the recommended threshold for fentanyl-dependent patients to reduce BPOW risk. [3]\n\n**25\u201336: Moderately Severe** \u2014 Aggressive treatment. High-dose buprenorphine (up to 32 mg) or methadone + adjunctive medications.\n\n**37\u201347: Severe Withdrawal** \u2014 Emergent treatment. IV fluids for dehydration. Close monitoring for hemodynamic instability.',
        },
        {
            heading: 'Fentanyl-Era Considerations',
            body: 'Fentanyl is highly lipophilic with slow tissue clearance. Traditional COWS \u2265 8 threshold carries higher risk of buprenorphine-precipitated withdrawal (BPOW) in fentanyl-dependent patients. Many experts now recommend:\n\n\u2022 Wait for COWS \u2265 13 before standard buprenorphine induction\n\u2022 Consider microdosing (0.5\u20132 mg) as alternative to avoid BPOW entirely\n\u2022 BPOW rate remains < 1% even in fentanyl-era studies with standard dosing [4]\n\u2022 If BPOW occurs: treat with MORE buprenorphine (up to 16\u201332 mg), not less',
        },
        {
            heading: 'High Interrater Reliability Items',
            body: 'Most reliable signs for clinical assessment (interrater \u03BA):\n\u2022 Piloerection: 0.94\n\u2022 Yawning: 0.93\n\u2022 Mydriasis: 0.90\n\u2022 Perspiration: 0.88\n\u2022 Rhinorrhea: 0.87',
        },
    ],
    citations: [
        { num: 1, text: 'Wesson DR, Ling W. The Clinical Opiate Withdrawal Scale (COWS). J Psychoactive Drugs. 2003;35(2):253-259.' },
        { num: 2, text: 'Handelsman L, Cochrane KJ, Aronson MJ, et al. Two New Rating Scales for Opiate Withdrawal. Am J Drug Alcohol Abuse. 1987;13(3):293-308.' },
        { num: 3, text: 'Greenwald MK, Herring AA, Perrone J, et al. A Neuropharmacological Model to Explain Buprenorphine Induction Challenges. Ann Emerg Med. 2022;80(6):509-524.' },
        { num: 4, text: 'D\u2019Onofrio G, Hawk KF, Perrone J, et al. Incidence of Precipitated Withdrawal During a Multisite Emergency Department-Initiated Buprenorphine Clinical Trial in the Era of Fentanyl. JAMA Netw Open. 2023;6(3):e236108.' },
    ],
};
const OW_MEDS_COMPARE = {
    id: 'ow-meds-compare',
    title: 'Medications for Opioid Withdrawal',
    subtitle: 'Comparison of ED Treatment Options',
    sections: [
        {
            body: 'Opioid agonist therapy (buprenorphine or methadone) is preferred over non-opioid adjuncts for treating opioid withdrawal. Most experts agree buprenorphine is the first-line choice for most patients. [1][2]',
        },
        {
            heading: 'Opioid Agonist Therapy',
            body: '',
            drugTable: [
                {
                    drug: 'Buprenorphine (Preferred)',
                    regimen: '**Partial mu agonist.** 8 mg SL \u2192 reassess 30\u201360 min \u2192 max 32 mg/day. Ceiling effect on respiratory depression. No significant QT prolongation. ED initiation increases 30-day treatment engagement (78% vs 37%). No X-waiver needed since Dec 2022.',
                },
                {
                    drug: 'Methadone',
                    regimen: '**Full mu agonist.** 20 mg PO or 10 mg IM. Better for patients with very high tolerance or already on methadone. **QT prolongation risk.** Respiratory depression without ceiling. Long half-life (24\u201336h) provides extended relief.',
                },
            ],
        },
        {
            heading: 'Non-Opioid Adjuncts',
            body: '',
            drugTable: [
                {
                    drug: 'Clonidine',
                    regimen: '**Alpha-2 agonist.** 0.1\u20130.3 mg PO q1h, max 0.8 mg/day. Targets autonomic symptoms (tachycardia, diaphoresis, anxiety). Check BP before each dose. Off-label but widely used.',
                },
                {
                    drug: 'Lofexidine (Lucemyra)',
                    regimen: '**Alpha-2 agonist.** 0.54 mg PO q5\u20136h, max 2.88 mg/day. First FDA-approved non-opioid for OW (2018). More selective than clonidine, potentially fewer hemodynamic effects.',
                },
                {
                    drug: 'Benzodiazepines',
                    regimen: 'Diazepam 5\u201310 mg IV q5\u201310 min or lorazepam 1\u20132 mg IV q10 min. Good supplement to clonidine. Targets anxiety, muscle cramping, and hemodynamic instability from precipitated WD.',
                },
            ],
        },
        {
            heading: 'Symptomatic Agents',
            body: '',
            drugTable: [
                {
                    drug: 'Ondansetron',
                    regimen: '4 mg IV/PO q6\u20138h PRN nausea. **QT risk** when combined with methadone/loperamide.',
                },
                {
                    drug: 'Loperamide',
                    regimen: '4 mg PO initial, then 2 mg per loose stool (max 16 mg/day). **QT risk** at supratherapeutic doses.',
                },
                {
                    drug: 'Octreotide',
                    regimen: '50 mcg SQ for refractory diarrhea. Second-line when loperamide insufficient.',
                },
                {
                    drug: 'NSAIDs / Acetaminophen',
                    regimen: 'Standard doses for diffuse body aches and arthralgias.',
                },
            ],
        },
    ],
    citations: [
        { num: 1, text: 'D\u2019Onofrio G, O\u2019Connor PG, Pantalon MV, et al. Emergency Department-Initiated Buprenorphine/Naloxone Treatment for Opioid Dependence: A Randomized Clinical Trial. JAMA. 2015;313(16):1636-1644.' },
        { num: 2, text: 'Hawk K, Hoppe J, Ketcham E, et al. Consensus Recommendations on the Treatment of Opioid Use Disorder in the Emergency Department. Ann Emerg Med. 2021;78(3):434-442.' },
    ],
};
const OW_QT_RISK = {
    id: 'ow-qt-risk',
    title: 'QT Prolongation Risk in Opioid Withdrawal',
    subtitle: 'Drug Interactions & Monitoring',
    sections: [
        {
            body: 'Multiple medications used in opioid withdrawal management can prolong the QT interval. Combined use with electrolyte derangements from vomiting/diarrhea creates a high-risk scenario for Torsades de Pointes. [1]',
        },
        {
            heading: 'QT-Prolonging Drugs in OW Management',
            body: '\u2022 **Methadone** \u2014 dose-dependent QT prolongation. Highest risk among OW medications. ECG recommended at doses > 100 mg/day. [2]\n\u2022 **Ondansetron** \u2014 dose-dependent QT prolongation, particularly IV route\n\u2022 **Loperamide** \u2014 QT prolongation at supratherapeutic doses (used recreationally as \u201cpoor man\u2019s methadone\u201d at high doses)\n\u2022 **Lofexidine** \u2014 mild QT prolongation; ECG monitoring recommended',
        },
        {
            heading: 'Electrolyte Risk Factors',
            body: '\u2022 **Hypokalemia** \u2014 from vomiting, diarrhea. Directly prolongs QT.\n\u2022 **Hypomagnesemia** \u2014 from GI losses. Prevents correction of hypokalemia.\n\u2022 Both exacerbate drug-induced QT prolongation\n\u2022 BMP with Mg level recommended before starting methadone',
        },
        {
            heading: 'When to Obtain ECG',
            body: '\u2022 All patients receiving methadone (especially > 40 mg)\n\u2022 When combining 2+ QT-prolonging medications\n\u2022 Significant vomiting or diarrhea (electrolyte depletion)\n\u2022 History of cardiac disease, syncope, or known long QT\n\u2022 QTc > 450 ms: discuss risks/benefits of QT-prolonging agents\n\u2022 QTc > 500 ms: avoid or discontinue QT-prolonging agents',
        },
        {
            heading: 'Safer Alternatives',
            body: '\u2022 **Buprenorphine** does NOT significantly prolong QT \u2014 preferred opioid agonist\n\u2022 **Clonidine** does NOT prolong QT\n\u2022 **Benzodiazepines** do NOT prolong QT\n\u2022 **NSAIDs/acetaminophen** do NOT prolong QT',
        },
    ],
    citations: [
        { num: 1, text: 'Stolbach A, Hoffman RS. Opioid Withdrawal in Adults in the Emergency Setting. UpToDate. Updated Aug 2025.' },
        { num: 2, text: 'Krantz MJ, Martin J, Stimmel B, et al. QTc Interval Screening in Methadone Treatment. Ann Intern Med. 2009;150(6):387-395.' },
    ],
};
const OW_BUP_GUIDE = {
    id: 'ow-bup-guide',
    title: 'Buprenorphine Initiation Guide',
    subtitle: 'Standard, High-Dose & Microdosing Protocols',
    sections: [
        {
            body: 'Three approaches to buprenorphine induction, each suited to different clinical scenarios. All approaches are supported by evidence and endorsed by emergency medicine societies. [1][2]',
        },
        {
            heading: 'Standard Induction',
            body: '**When:** COWS \u2265 8\u201312, short-acting opioid use (heroin, oxycodone)\n\n1. Administer **8 mg SL** buprenorphine\n2. Observe 30\u201360 minutes\n3. If withdrawal persists: give additional **4\u20138 mg SL**\n4. Repeat until symptom control or COWS < 8\n5. Maximum Day 1 total: **32 mg**\n6. Discharge with 3\u20137 day bridge prescription + follow-up\n\n**Key:** If buprenorphine precipitates withdrawal, treat with MORE buprenorphine (not less) \u2014 up to 16\u201332 mg total. [3]',
        },
        {
            heading: 'High-Dose Induction',
            body: '**When:** Fentanyl-dependent patients, severe withdrawal (COWS \u2265 13)\n\n\u2022 Starting dose up to **16 mg SL** (vs traditional 4\u20138 mg)\n\u2022 Total Day 1 dose up to **32 mg SL**\n\u2022 579-patient case series: no respiratory depression at \u2265 12 mg starting doses [4]\n\u2022 439-patient study: safe and effective in confirmed fentanyl exposure [5]\n\u2022 High-dose approach increasingly preferred in the fentanyl era\n\u2022 BPOW rate < 0.5% with 7-day extended-release SQ buprenorphine 24 mg [6]',
        },
        {
            heading: 'Microdosing (Low-Dose Induction)',
            body: '**When:** Patient still on full agonist, early/mild withdrawal, cannot abstain long enough for standard induction\n\n\u2022 Start **0.5\u20132 mg SL** while patient continues opioid use\n\u2022 Gradually increase buprenorphine while tapering full agonist\n\u2022 Dosing frequency based on COWS score\n\u2022 Avoids precipitated withdrawal entirely\n\u2022 Feasibility confirmed in ED setting [7]\n\u2022 Outpatient protocols typically span 6\u201310 days\n\u2022 Particularly valuable for methadone-to-buprenorphine transitions',
        },
        {
            heading: 'Post-Induction',
            body: '\u2022 Prescribe buprenorphine/naloxone (Suboxone) for outpatient use\n\u2022 Bridge supply: 3\u20137 days minimum (longer if follow-up barriers exist)\n\u2022 Typical maintenance: 16 mg/day SL\n\u2022 Follow-up with addiction medicine within 72 hours\n\u2022 No X-waiver required since December 2022\n\u2022 Any clinician with DEA Schedule III authority can prescribe',
        },
    ],
    citations: [
        { num: 1, text: 'Hawk K, Hoppe J, Ketcham E, et al. Consensus Recommendations on the Treatment of Opioid Use Disorder in the Emergency Department. Ann Emerg Med. 2021;78(3):434-442.' },
        { num: 2, text: 'Wax PM, Stolbach AI, Schwarz ES, et al. ACMT Position Statement: Buprenorphine Administration in the Emergency Department. J Med Toxicol. 2019;15(3):215-216.' },
        { num: 3, text: 'Oakley B, Wilson H, Hayes V, Lintzeris N. Managing Opioid Withdrawal Precipitated by Buprenorphine with Buprenorphine. Drug Alcohol Rev. 2021;40(4):567-571.' },
        { num: 4, text: 'Herring AA, Vosooghi AA, Luftig J, et al. High-Dose Buprenorphine Induction in the Emergency Department for Treatment of Opioid Use Disorder. JAMA Netw Open. 2021;4(7):e2117128.' },
        { num: 5, text: 'Snyder H, Chau B, Kalmin MM, et al. High-Dose Buprenorphine Initiation in the Emergency Department Among Patients Using Fentanyl and Other Opioids. JAMA Netw Open. 2023;6(3):e231572.' },
        { num: 6, text: 'D\u2019Onofrio G, Perrone J, Hawk KF, et al. Early Emergency Department Experience with 7-Day Extended-Release Injectable Buprenorphine for Opioid Use Disorder. Acad Emerg Med. 2023;30(12):1264-1271.' },
        { num: 7, text: 'Moe J, Badke K, Pratt M, et al. Microdosing and Standard-Dosing Take-Home Buprenorphine from the Emergency Department: A Feasibility Study. J Am Coll Emerg Physicians Open. 2020;1(6):1712-1722.' },
    ],
};
const OW_DDX = {
    id: 'ow-ddx',
    title: 'Differential Diagnosis of Opioid Withdrawal',
    subtitle: 'Distinguishing OW from Mimics',
    sections: [
        {
            body: 'Opioid withdrawal may mimic other withdrawal syndromes or intoxication states. Most patients have good insight into their condition, so the diagnosis is usually established by history alone. When present, yawning, lacrimation, and piloerection are highly specific for opioid withdrawal. [1]',
        },
        {
            heading: 'Key Differentiators',
            body: '',
            drugTable: [
                {
                    drug: 'Opioid Withdrawal',
                    regimen: '**Mydriasis, yawning, piloerection, lacrimation, rhinorrhea.** Normal temperature. Normal mental status (except severe cases). Vital signs often normal \u2014 tachycardia if present reflects agitation/hypovolemia. **No seizures.** Diarrhea, nausea, myalgias prominent.',
                },
                {
                    drug: 'Ethanol/Sedative WD',
                    regimen: '**Life-threatening.** Significant hypertension AND tachycardia (not just one). **Seizures, hyperthermia** \u2014 never seen in opioid WD alone. Tremor, diaphoresis, agitation. Hallucinations in DT. Normal or mildly dilated pupils.',
                },
                {
                    drug: 'Sympathomimetic Toxicity',
                    regimen: 'Cocaine, amphetamines. Mydriasis, agitation, diaphoresis, tachycardia, hypertension \u2014 but usually **much more severe** than opioid WD. **Hyperthermia.** No yawning, piloerection, or lacrimation.',
                },
                {
                    drug: 'Cholinergic (Muscarinic) Toxicity',
                    regimen: 'Organophosphates, carbamates. SLUDGE: Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis. **Miosis (not mydriasis), bradycardia, altered LOC.** Nicotinic: weakness, fasciculations, paralysis.',
                },
            ],
        },
        {
            heading: 'Clinical Pearl',
            body: 'Many patients in opioid withdrawal have a pulse and blood pressure within normal limits. Only a small minority manifest both hypertension AND tachycardia, and when present, these are almost always from iatrogenically precipitated withdrawal (naloxone/naltrexone). In contrast, normal vital signs in ethanol or sedative withdrawal are the exception rather than the rule.',
        },
    ],
    citations: [
        { num: 1, text: 'Stolbach A, Hoffman RS. Opioid Withdrawal in Adults in the Emergency Setting. UpToDate. Updated Aug 2025.' },
    ],
};
const OW_DISCHARGE = {
    id: 'ow-discharge',
    title: 'Opioid Withdrawal Discharge Instructions',
    subtitle: 'Patient Discharge Instructions \u2014 Opioid Withdrawal',
    shareable: true,
    sections: [
        {
            heading: 'What Happened',
            body: 'You were treated in the emergency department for opioid withdrawal. Your symptoms have improved, and you are being discharged with a plan for follow-up care.',
        },
        {
            heading: 'Your Medications',
            body: 'If you were started on buprenorphine (Suboxone/Subutex):\n\u2022 Take your medication exactly as prescribed\n\u2022 Place the tablet/film under your tongue and let it dissolve completely\n\u2022 Do not swallow, chew, or cut the tablet\n\u2022 Wait at least 30 minutes before eating or drinking\n\u2022 Do NOT use other opioids, benzodiazepines, or alcohol while on this medication \u2014 this can cause life-threatening breathing problems',
        },
        {
            heading: 'Follow-Up Care',
            body: '\u2022 Keep your follow-up appointment with addiction medicine / opioid treatment program\n\u2022 If you were given a bridge prescription, you have a limited supply \u2014 attend your follow-up before it runs out\n\u2022 If you cannot reach your follow-up provider, call the SAMHSA National Helpline: **1-800-662-4357** (free, 24/7)',
        },
        {
            heading: 'Overdose Prevention',
            body: '**Your risk of overdose is highest right now.**\n\nWhen you go through withdrawal, your body loses its tolerance to opioids. If you use the same amount you were using before, it can cause a fatal overdose.\n\n\u2022 If you use again, start with a much smaller amount\n\u2022 Never use alone\n\u2022 Keep your naloxone (Narcan) kit nearby at all times\n\u2022 Teach someone close to you how to use naloxone',
        },
        {
            heading: 'How to Use Naloxone (Narcan)',
            body: '**Nasal spray:**\n1. Lay the person on their back\n2. Insert the nozzle into one nostril\n3. Press the plunger firmly to release the dose\n4. If no response in 2\u20133 minutes, give a second dose in the other nostril\n5. Call 911 immediately\n6. Stay with the person \u2014 naloxone wears off in 30\u201390 minutes and overdose symptoms may return',
        },
        {
            heading: 'Return to the Emergency Department If',
            body: '\u2022 You cannot keep any food or liquids down\n\u2022 You feel dizzy, weak, or faint when standing\n\u2022 You develop chest pain or difficulty breathing\n\u2022 You develop a fever (temperature > 100.4\u00B0F / 38\u00B0C)\n\u2022 You have a seizure\n\u2022 You feel you may harm yourself',
        },
        {
            heading: 'Resources',
            body: '\u2022 **SAMHSA National Helpline:** 1-800-662-4357 (free, 24/7, English/Spanish)\n\u2022 **988 Suicide & Crisis Lifeline:** Call or text 988\n\u2022 **Poison Control:** 1-800-222-1222\n\u2022 Ask your provider about fentanyl test strips and safe use supplies',
        },
    ],
    citations: [
        { num: 1, text: 'SAMHSA TIP 63: Medications for Opioid Use Disorder. Substance Abuse and Mental Health Services Administration. 2021.' },
        { num: 2, text: 'Larochelle MR, Bernson D, Land T, et al. Medication for Opioid Use Disorder After Nonfatal Opioid Overdose and Association With Mortality. Ann Intern Med. 2018;169(3):137-145.' },
    ],
};
// -------------------------------------------------------------------
// Info Page Registry
// -------------------------------------------------------------------
export const INFO_PAGES = {
    'doac-pe': DOAC_PE_PAGE,
    'priapism-return-precautions': PRIAPISM_RETURN_PRECAUTIONS,
    'cardioversion-afib': CARDIOVERSION_AFIB_PAGE,
    'croup-return-precautions': CROUP_RETURN_PRECAUTIONS,
    'afib-discharge': AFIB_DISCHARGE_PAGE,
    'pep-patient-info': PEP_PATIENT_INFO,
    'hbv-serology': HBV_SEROLOGY_PAGE,
    'stroke-contraindications': STROKE_CONTRAINDICATIONS_PAGE,
    'stroke-imaging': STROKE_IMAGING_PAGE,
    'stroke-consent': STROKE_CONSENT_PAGE,
    'nstemi-antiplatelet-cx': NSTEMI_ANTIPLATELET_PAGE,
    'nstemi-conservative': NSTEMI_CONSERVATIVE_PAGE,
    'nstemi-pocus': NSTEMI_POCUS_PAGE,
    'nstemi-minoca': NSTEMI_MINOCA_PAGE,
    'k-hyper-ecg-info': K_HYPER_ECG_PAGE,
    'k-hypo-ecg-info': K_HYPO_ECG_PAGE,
    'uti-definition-info': UTI_DEFINITION_PAGE,
    'pf-hsv-criteria': PF_HSV_CRITERIA_PAGE,
    'pf-ceftriaxone-ci': PF_CEFTRIAXONE_CI_PAGE,
    'pf-abx-dosing': PF_ABX_DOSING_PAGE,
    'pf-uti-risk': PF_UTI_RISK_PAGE,
    'pf-ua-interpret': PF_UA_INTERPRET_PAGE,
    'pf-discharge': PF_DISCHARGE_PAGE,
    'bronch-not-recommended': BRONCH_NOT_RECOMMENDED,
    'bronch-hfnc-protocol': BRONCH_HFNC_PROTOCOL,
    'bronch-hfnc-weaning': BRONCH_HFNC_WEANING,
    'bronch-feeding': BRONCH_FEEDING,
    'bronch-admission-criteria': BRONCH_ADMISSION_CRITERIA,
    'bronch-parent-en': BRONCH_PARENT_EN,
    'bronch-parent-es': BRONCH_PARENT_ES,
    'precip-delivery-summary': PRECIP_DELIVERY_SUMMARY,
    'sd-summary': SD_SUMMARY,
    'afib-summary': AFIB_SUMMARY,
    'pe-summary': PE_SUMMARY,
    'k-summary': K_SUMMARY,
    'stroke-summary': STROKE_SUMMARY,
    'ptx-summary': PTX_SUMMARY,
    'nrp-summary': NRP_SUMMARY,
    'dr-summary': DR_SUMMARY,
    'dr-hema-evidence': DR_HEMA_EVIDENCE,
    'splint-principles': SPLINT_PRINCIPLES,
    'splint-summary': SPLINT_SUMMARY,
    'nstemi-troponin-sensitivity': NSTEMI_TROPONIN_SENSITIVITY_PAGE,
    'na-summary': NA_SUMMARY,
    'na-ddavp-clamp': NA_DDAVP_CLAMP,
    'na-siad-causes': NA_SIAD_CAUSES,
    'na-hyper-causes': NA_HYPER_CAUSES,
    'na-overcorrection': NA_OVERCORRECTION,
    'na-ods-risk': NA_ODS_RISK,
    'na-lab-interpretation': NA_LAB_INTERPRETATION,
    'na-non-hypotonic-info': NA_NON_HYPOTONIC_INFO,
    'rabies-summary': RABIES_SUMMARY,
    'rabies-animal-risk': RABIES_ANIMAL_RISK,
    'rabies-ddx': RABIES_DDX,
    'rabies-dx-guide': RABIES_DX_GUIDE,
    'rabies-patient-info': RABIES_PATIENT_INFO,
    'burns-summary': BURNS_SUMMARY,
    'burns-depth-guide': BURNS_DEPTH_GUIDE,
    'burns-prehospital': BURNS_PREHOSPITAL,
    'burns-dsmc-protocol': BURNS_DSMC_PROTOCOL,
    'burns-escharotomy': BURNS_ESCHAROTOMY,
    'burns-dressing-guide': BURNS_DRESSING_GUIDE,
    'burns-co-cyanide': BURNS_CO_CYANIDE,
    'burns-chemical-detail': BURNS_CHEMICAL_DETAIL,
    'ich-summary': ICH_SUMMARY,
    'ich-ct-markers': ICH_CT_MARKERS,
    'ich-causes': ICH_CAUSES,
    'ich-caa': ICH_CAA,
    'ich-prognostication': ICH_PROGNOSTICATION,
    'aub-coag-screen': AUB_COAG_SCREEN,
    'aub-palm-coein': AUB_PALM_COEIN,
    'aub-endo-cancer-risk': AUB_ENDO_CANCER_RISK,
    'aub-treatment-table': AUB_TREATMENT_TABLE,
    'aub-surgical': AUB_SURGICAL,
    'aub-maintenance': AUB_MAINTENANCE,
    'aub-discharge': AUB_DISCHARGE,
    'se-summary': SE_SUMMARY,
    'se-labs': SE_LABS,
    'se-asm-comparison': SE_ASM_COMPARISON,
    'se-infusion-comparison': SE_INFUSION_COMPARISON,
    'se-rse-principles': SE_RSE_PRINCIPLES,
    'se-ncse-criteria': SE_NCSE_CRITERIA,
    'diarrhea-summary': DIARRHEA_SUMMARY,
    'diarrhea-discharge': DIARRHEA_DISCHARGE,
    'diarrhea-ddx-pitfalls': DIARRHEA_DDX_PITFALLS,
    'diarrhea-abx-criteria': DIARRHEA_ABX_CRITERIA,
    'diarrhea-antimotility-ci': DIARRHEA_ANTIMOTILITY_CI,
    'diarrhea-dehydration-assessment': DIARRHEA_DEHYDRATION_ASSESSMENT,
    'ft-summary': FT_SUMMARY,
    'ft-ectopic-risk': FT_ECTOPIC_RISK,
    'ft-miscarriage-types': FT_MISCARRIAGE_TYPES,
    'ft-nvp-pathway': FT_NVP_PATHWAY,
    'ft-imaging-safety': FT_IMAGING_SAFETY,
    'ft-abx-safety': FT_ABX_SAFETY,
    'ft-miscarriage-discharge': FT_MISCARRIAGE_DISCHARGE,
    'hiv-steps-summary': HIV_STEPS_SUMMARY,
    'hiv-seroconversion-features': HIV_SEROCONVERSION_FEATURES,
    'hiv-arv-classes': HIV_ARV_CLASSES,
    'hiv-testing-guide': HIV_TESTING_GUIDE,
    'hiv-system-complications': HIV_SYSTEM_COMPLICATIONS,
    'mening-steps-summary': MENING_STEPS_SUMMARY,
    'mening-csf-guide': MENING_CSF_GUIDE,
    'mening-ct-criteria': MENING_CT_CRITERIA,
    'mening-abx-table': MENING_ABX_TABLE,
    'mening-steroid-guide': MENING_STEROID_GUIDE,
    'mening-dispo-criteria': MENING_DISPO_CRITERIA,
    'mening-pep-guide': MENING_PEP_GUIDE,
    'sah-summary': SAH_SUMMARY,
    'sah-lp-guide': SAH_LP_GUIDE,
    'sah-ecg-changes': SAH_ECG_CHANGES,
    'scd-steps-summary': SCD_STEPS_SUMMARY,
    'scd-genotypes': SCD_GENOTYPES,
    'scd-differential': SCD_DIFFERENTIAL,
    'scd-voc-algorithm': SCD_VOC_ALGORITHM,
    'scd-acs-guide': SCD_ACS_GUIDE,
    'scd-transfusion': SCD_TRANSFUSION,
    'scd-fever-eval': SCD_FEVER_EVAL,
    'scd-sct-complications': SCD_SCT_COMPLICATIONS,
    'syncope-discharge': SYNCOPE_DISCHARGE,
    'burns-discharge': BURNS_DISCHARGE,
    'chest-tube-discharge': CHEST_TUBE_DISCHARGE,
    'distal-radius-discharge': DISTAL_RADIUS_DISCHARGE,
    'hiv-ed-discharge': HIV_DISCHARGE_INFO,
    'meningitis-discharge': MENINGITIS_DISCHARGE_INFO,
    'syncope-summary': SYNCOPE_SUMMARY,
    'syncope-ddx': SYNCOPE_DDX,
    'syncope-ecg': SYNCOPE_ECG,
    'syncope-history-features': SYNCOPE_HISTORY_FEATURES,
    'stemi-summary': STEMI_SUMMARY,
    'stemi-vascular-territories': STEMI_VASCULAR_TERRITORIES,
    'stemi-pericarditis-diff': STEMI_PERICARDITIS_DIFF,
    'stemi-lytic-contraindications': STEMI_LYTIC_CONTRAINDICATIONS,
    'stemi-lytic-agents': STEMI_LYTIC_AGENTS,
    'stemi-reperfusion-pathway': STEMI_REPERFUSION_PATHWAY,
    'stemi-reciprocal': STEMI_RECIPROCAL,
    'stemi-mimics': STEMI_MIMICS,
    'stemi-anticoag-detail': STEMI_ANTICOAG_DETAIL,
    'ab-summary': AB_SUMMARY,
    'ab-compensation': AB_COMPENSATION,
    'ab-differential': AB_DIFFERENTIAL,
    'ab-abg-vbg': AB_ABG_VBG,
    'ab-lactate-ketones': AB_LACTATE_KETONES,
    'ab-stewart-explained': AB_STEWART_EXPLAINED,
    'ab-fluids-guide': AB_FLUIDS_GUIDE,
    'delirium-summary': DELIRIUM_SUMMARY,
    'del-precipitants': DEL_PRECIPITANTS,
    'del-vulnerability': DEL_VULNERABILITY,
    'del-vs-dementia': DEL_VS_DEMENTIA,
    'del-meds-table': DEL_MEDS_TABLE,
    'del-deescalation': DEL_DEESCALATION,
    'del-exds-info': DEL_EXDS_INFO,
    'del-cam-guide': DEL_CAM_GUIDE,
    'ai-summary': AI_SUMMARY,
    'ai-precipitants': AI_PRECIPITANTS,
    'ai-lab-findings': AI_LAB_FINDINGS,
    'ai-sick-day-rules': AI_SICK_DAY_RULES,
    'ai-special-populations': AI_SPECIAL_POPULATIONS,
    'ai-steroid-equivalency': AI_STEROID_EQUIVALENCY,
    'epss-measurement': EPSS_MEASUREMENT_PAGE,
    'thyroid-summary': THYROID_SUMMARY,
    'thyroid-bb-controversy': THYROID_BB_CONTROVERSY,
    'thyroid-thionamide-compare': THYROID_THIONAMIDE_COMPARE,
    'thyroid-labs': THYROID_LABS,
    'thyroid-precipitants': THYROID_PRECIPITANTS,
    'thyroid-special-pops': THYROID_SPECIAL_POPS,
    'thyroid-airway': THYROID_AIRWAY,
    'anaph-summary': ANAPH_SUMMARY,
    'anaph-iv-epi-pk': ANAPH_IV_EPI_PK,
    'anaph-ddx': ANAPH_DDX,
    'anaph-biphasic': ANAPH_BIPHASIC,
    'anaph-causes': ANAPH_CAUSES,
    'anaph-discharge': ANAPH_DISCHARGE,
    'angio-steps-summary': ANGIO_STEPS_SUMMARY,
    'angio-differentiation': ANGIO_DIFFERENTIATION,
    'angio-labs': ANGIO_LABS,
    'angio-ishoo-staging': ANGIO_ISHOO_STAGING,
    'angio-hae-types': ANGIO_HAE_TYPES,
    'angio-discharge': ANGIO_DISCHARGE,
    'angio-acei-alternatives': ANGIO_ACEI_ALTERNATIVES,
    'syph-steps-summary': SYPH_STEPS_SUMMARY,
    'syph-stages': SYPH_STAGES,
    'syph-testing-algorithm': SYPH_TESTING_ALGORITHM,
    'syph-treatment-table': SYPH_TREATMENT_TABLE,
    'syph-jarisch-herxheimer': SYPH_JARISCH_HERXHEIMER,
    'syph-partner-notification': SYPH_PARTNER_NOTIFICATION,
    'syph-congenital': SYPH_CONGENITAL,
    'syph-genital-ddx': SYPH_GENITAL_DDX,
    'sal-steps-summary': SAL_STEPS_SUMMARY,
    'sal-acid-base': SAL_ACID_BASE,
    'sal-alkalinize-protocol': SAL_ALKALINIZE_PROTOCOL,
    'sal-extrip-hd': SAL_EXTRIP_HD,
    'sal-death-spiral': SAL_DEATH_SPIRAL,
    'sal-chronic-recognition': SAL_CHRONIC_RECOGNITION,
    'sal-level-interpretation': SAL_LEVEL_INTERPRETATION,
    'tca-steps-summary': TCA_STEPS_SUMMARY,
    'tca-ecg-findings': TCA_ECG_FINDINGS,
    'tca-bicarb-protocol': TCA_BICARB_PROTOCOL,
    'tca-na-blockers': TCA_NA_BLOCKERS,
    'tca-differential': TCA_DIFFERENTIAL,
    'tca-seizure-guide': TCA_SEIZURE_GUIDE,
    'tca-disposition-criteria': TCA_DISPOSITION_CRITERIA,
    'apap-summary': APAP_SUMMARY,
    'apap-stages': APAP_STAGES,
    'apap-nomogram': APAP_NOMOGRAM,
    'apap-nac-comparison': APAP_NAC_COMPARISON,
    'apap-anaphylactoid': APAP_ANAPHYLACTOID,
    'apap-massive-od': APAP_MASSIVE_OD,
    'apap-risk-factors': APAP_RISK_FACTORS,
    'apap-chronic-ingestion': APAP_CHRONIC_INGESTION,
    'sepsis-summary': SEPSIS_SUMMARY,
    'sepsis-abx-table': SEPSIS_ABX_TABLE,
    'sepsis-source-control': SEPSIS_SOURCE_CONTROL,
    'sepsis-vp-comparison': SEPSIS_VP_COMPARISON,
    'sepsis-fluid-guide': SEPSIS_FLUID_GUIDE,
    'sepsis-mimics': SEPSIS_MIMICS,
    'sepsis-cardiomyopathy': SEPSIS_CARDIOMYOPATHY_PAGE,
    'sepsis-sep1-bundle': SEPSIS_SEP1_BUNDLE,
    'ow-summary': OW_SUMMARY,
    'ow-cows-guide': OW_COWS_GUIDE,
    'ow-meds-compare': OW_MEDS_COMPARE,
    'ow-qt-risk': OW_QT_RISK,
    'ow-bup-guide': OW_BUP_GUIDE,
    'ow-ddx': OW_DDX,
    'ow-discharge': OW_DISCHARGE,
};
/** Get a single info page by ID (hardcoded fallback) */
export function getInfoPageFallback(id) {
    return INFO_PAGES[id];
}
/** Get all info pages (hardcoded fallback) */
export function getAllInfoPagesFallback() {
    return Object.values(INFO_PAGES);
}
