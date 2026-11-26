export const PRIMARY_CARE_SCREENING_NODES = [
    {
        id: 'pcs-start', type: 'question', module: 1,
        title: 'Primary Care Screening: What Is This Patient Due For?',
        body: '**For the adult in front of you who has no regular care.** Open the calculator, enter age, sex and the conditions that change the answer, and it lists the vaccines, cancer screening, labs and counseling that guidelines recommend. [1,2]\n\n**EACH ITEM SHOWS:**\n• What to do, and how often\n• Why it applies to this patient\n• The guideline and its grade, with the source one tap away\n• Whether it can start today or needs a referral\n\n**THE TOOL CANNOT SEE:** what has already been done, symptoms, or the full history. Confirm history before ordering.',
        citation: [1, 2],
        calculatorLinks: [{ id: 'primary-care-screening', label: 'Open Primary Care Screening' }],
        options: [
            { label: 'What can start in the ED today', next: 'pcs-today' },
            { label: 'What needs a referral', next: 'pcs-refer' },
            { label: 'Where the guidelines disagree', next: 'pcs-conflicts' },
            { label: 'Pitfalls: do NOT', next: 'pcs-pitfalls' },
        ],
        summary: 'Enter age, sex and conditions in the calculator; it lists guideline-recommended vaccines, cancer screening, labs and counseling with a source on each.',
    },
    {
        id: 'pcs-today', type: 'info', module: 2,
        title: 'What Can Start in the ED Today',
        body: '**The calculator marks each item "Can start today" or "Today or clinic".** These need only a blood draw, a blood pressure cuff, a few questions, or a dose from stock. [1,2]\n\n**BLOOD TESTS:**\n• HIV, hepatitis C and hepatitis B (one draw) [1,3,4]\n• Syphilis when at increased risk or pregnant [1]\n• A1c or glucose for diabetes screening [1,5]\n• Lipid panel [6]\n\n**AT THE BEDSIDE:**\n• Blood pressure, with out-of-office confirmation before treatment [1]\n• Brief screens: depression, anxiety, alcohol, drug use, partner violence [1]\n• Tobacco: advise to quit, offer medication and support [1]\n\n**IF STOCKED:**\n• Flu, Tdap or Td, and other adult vaccines [2]\n\n**BEFORE YOU ORDER:** every test sent from the ED needs someone who will see the result and reach the patient.',
        citation: [1, 2, 3, 4, 5, 6],
        calculatorLinks: [{ id: 'primary-care-screening', label: 'Open Primary Care Screening' }],
        next: 'pcs-start',
        summary: 'Blood tests (HIV, hepatitis B and C, syphilis, A1c, lipids), blood pressure, brief screens, tobacco help and stocked vaccines can start in the ED.',
    },
    {
        id: 'pcs-refer', type: 'info', module: 2,
        title: 'What Needs a Referral',
        body: '**Items marked "Needs referral" cannot be finished in the ED.** Put them in the discharge papers so the next clinician sees them. [1]\n\n**IMAGING AND PROCEDURES:**\n• Mammogram [1]\n• Colonoscopy, or a take-home stool test with a result pathway [1]\n• Low-dose CT for lung cancer screening [1]\n• Bone density test [1]\n• Aortic aneurysm ultrasound [1]\n• Liver ultrasound for cirrhosis surveillance [7]\n\n**ONGOING CARE:**\n• Dilated eye exam in diabetes [5]\n• Intensive weight or exercise programs [1]\n• Genetic counseling after a positive family-risk screen [1]\n\n**USE THE COPY BUTTON:** the calculator copies the full list as plain text for the chart or discharge instructions. It carries age and sex only.',
        citation: [1, 5, 7],
        calculatorLinks: [{ id: 'primary-care-screening', label: 'Open Primary Care Screening' }],
        next: 'pcs-start',
        summary: 'Mammogram, colonoscopy, lung CT, bone density, aneurysm ultrasound, eye exams and programs need referral; copy the list into discharge papers.',
    },
    {
        id: 'pcs-conflicts', type: 'info', module: 3,
        title: 'Where the Guidelines Disagree',
        body: '**The calculator never picks between guideline bodies silently.** One source sets the tier and the other appears on the same card as "Other guidance".\n\n**VACCINES:**\n• CDC\'s adult schedule in force is the July 2, 2025 version, amended April 27, 2026, kept in place by a March 2026 court order [2]\n• AAFP and ACOG publish their own 2026 schedules [8,9]\n• COVID-19 in pregnancy: CDC\'s schedule has no pregnancy line; ACOG and AAFP recommend it [2,8,9]\n• RSV in pregnancy (32 to 36 weeks): CDC season is September through January; ACOG and AAFP say September 1 through March 1 [2,8,9]\n\n**CANCER SCREENING:**\n• USPSTF sets the tier; the American Cancer Society differs on prostate, cervical, breast and lung [1,10]\n• The USPSTF cervical and prostate statements date from 2018 and are being updated [1]\n\n**DIABETES AND HEPATITIS:**\n• Diabetes screening: USPSTF covers 35 to 70 with overweight; ADA tests all adults from 35 [1,5]\n• Hepatitis B and C: USPSTF is risk- or age-limited; CDC tests all adults once [1,3,4]',
        citation: [1, 2, 3, 4, 5, 8, 9, 10],
        next: 'pcs-start',
        summary: 'CDC and AAFP/ACOG differ on COVID-19 and RSV vaccine in pregnancy; USPSTF and ACS differ on prostate, cervical, breast and lung screening. Both are shown.',
    },
    {
        id: 'pcs-pitfalls', type: 'info', module: 4,
        title: 'Pitfalls: Do NOT',
        body: '**🛑 DO NOT use a screening interval on a patient with symptoms.** Screening recommendations apply to people without symptoms. A breast lump, rectal bleeding or weight loss needs a diagnostic workup. [1]\n\n**🛑 DO NOT give live vaccines in pregnancy or severe immunocompromise.** MMR, varicella and the nasal flu vaccine are contraindicated. With HIV, MMR and varicella depend on the CD4 count. [2]\n\n**🛑 DO NOT start aspirin for primary prevention at 60 or older.** USPSTF grade D. [1]\n\n**🛑 DO NOT order a PSA at 70 or older, or without a discussion at 55 to 69.** USPSTF grade D and C. [1]\n\n**🛑 DO NOT stop cervical screening at 65 on age alone.** The stop rule needs documented adequate prior screening. [1]\n\n**🛑 DO NOT assume nothing has been done.** The tool cannot see prior vaccines or tests. Ask, and check records.\n\n**🛑 DO NOT send a test with no one to follow it up.** Arrange who receives the result before ordering.',
        citation: [1, 2],
        next: 'pcs-start',
        summary: 'Screening is for patients without symptoms; no live vaccines in pregnancy or severe immunocompromise; no new aspirin at 60+; no PSA at 70+; confirm history and follow-up.',
    },
];
export const PRIMARY_CARE_SCREENING_NODE_COUNT = PRIMARY_CARE_SCREENING_NODES.length;
export const PRIMARY_CARE_SCREENING_MODULE_LABELS = ['Screening Calculator', 'Using It in the ED', 'Source Conflicts', 'Pitfalls'];
export const PRIMARY_CARE_SCREENING_CRITICAL_ACTIONS = [
    { text: 'Open the calculator and enter age, sex and the conditions that change preventive care', nodeId: 'pcs-start' },
    { text: 'Confirm what has already been done before ordering: the tool cannot see history', nodeId: 'pcs-pitfalls' },
    { text: 'Start what the ED can do today: blood tests, blood pressure, brief screens, stocked vaccines', nodeId: 'pcs-today' },
    { text: 'Copy the referral items into the discharge papers', nodeId: 'pcs-refer' },
    { text: 'Screening intervals apply only to patients without symptoms', nodeId: 'pcs-pitfalls' },
];
export const PRIMARY_CARE_SCREENING_CITATIONS = [
    { num: 1, text: 'US Preventive Services Task Force. Published recommendations (grade A, B, C, D and I statements for adults). Each statement is linked from its card in the calculator. https://www.uspreventiveservicestaskforce.org/uspstf/recommendation-topics' },
    { num: 2, text: 'CDC. Adult Immunization Schedule by Age and Notes, United States, 2025 (July 2, 2025 version, amended April 27, 2026). https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-notes.html' },
    { num: 3, text: 'Conners EE, et al. Screening and testing for hepatitis B virus infection: CDC recommendations, United States, 2023. MMWR Recomm Rep. 2023;72(RR-1):1-25. https://www.cdc.gov/mmwr/volumes/72/rr/rr7201a1.htm' },
    { num: 4, text: 'Schillie S, et al. CDC recommendations for hepatitis C screening among adults, United States, 2020. MMWR Recomm Rep. 2020;69(RR-2):1-17. https://www.cdc.gov/mmwr/volumes/69/rr/rr6902a1.htm' },
    { num: 5, text: 'American Diabetes Association Professional Practice Committee. Standards of Care in Diabetes 2026. Diabetes Care. 2026;49(Suppl 1). https://diabetesjournals.org/care/issue/49/Supplement_1' },
    { num: 6, text: '2026 ACC/AHA Guideline on the Management of Dyslipidemia. J Am Coll Cardiol. 2026. https://doi.org/10.1016/j.jacc.2025.11.016' },
    { num: 7, text: 'Singal AG, et al. AASLD Practice Guidance on prevention, diagnosis, and treatment of hepatocellular carcinoma. Hepatology. 2023;78(6):1922-1965. https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/' },
    { num: 8, text: 'American Academy of Family Physicians. Adults 19 and older immunization schedules. 2026. https://www.aafp.org/clinical-insights/immunizations-and-vaccines/immunizations-schedules-resources/adult-immunization-schedules' },
    { num: 9, text: 'American College of Obstetricians and Gynecologists. Maternal Immunization Schedule. 2026. https://www.acog.org/clinical/resources/maternal-immunization-schedule/' },
    { num: 10, text: 'American Cancer Society. Guidelines for the early detection of cancer (breast, cervical, colorectal, prostate, lung). https://www.cancer.org/cancer/screening/american-cancer-society-guidelines-for-the-early-detection-of-cancer.html' },
];
