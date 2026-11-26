// MedKitt: Primary Care Screening engine (added 2026-11-26).
// Pure rules: a patient (age, sex, pregnancy, tobacco, condition flags) goes in, a list of preventive-care
// recommendations comes out. No DOM, no network, no storage. Tested by scripts/primary-care-screening.test.mjs.
//
// Sourcing rules for this file:
//  - Every recommendation carries at least one key into PCS_SOURCES, the issuing body's own page.
//  - USPSTF drives the tier when it has a statement. Where another body differs (ACS, ADA, AAFP, ACOG),
//    its position is shown in `other`; the engine never picks between them silently.
//  - CDC's adult immunization schedule in force (July 2, 2025 version, amended April 27, 2026) drives vaccines.
//  - The tool cannot see history. Wording says what is due by guideline, never that it is overdue.
export const PCS_FLAG_GROUPS = [
    { label: 'Smoking history', flags: [
            { id: 'py20', label: '20 or more pack-years', tobacco: ['current', 'former'] },
            { id: 'quit15', label: 'Quit within the last 15 years', tobacco: ['former'] },
        ] },
    { label: 'Heart and metabolic', flags: [
            { id: 'diabetes', label: 'Diabetes' },
            { id: 'htn', label: 'High blood pressure' },
            { id: 'lipids', label: 'High cholesterol' },
            { id: 'cvd', label: 'Heart disease or stroke' },
            { id: 'overweight', label: 'BMI 25 or more', hint: '23 or more if Asian American' },
            { id: 'obesity', label: 'BMI 30 or more' },
            { id: 'bmi40', label: 'BMI 40 or more' },
        ] },
    { label: 'Lung, kidney, liver, bowel', flags: [
            { id: 'lung', label: 'Chronic lung disease' },
            { id: 'ckd', label: 'Chronic kidney disease' },
            { id: 'dialysis', label: 'On dialysis' },
            { id: 'liver', label: 'Chronic liver disease' },
            { id: 'cirrhosis', label: 'Cirrhosis' },
            { id: 'hepB', label: 'Chronic hepatitis B' },
            { id: 'ibd', label: 'Ulcerative colitis or Crohn disease' },
        ] },
    { label: 'Immune system', flags: [
            { id: 'hiv', label: 'HIV' },
            { id: 'immunocomp', label: 'Immunocompromised', hint: 'transplant, chemotherapy, long-term immunosuppressants' },
            { id: 'asplenia', label: 'No spleen or sickle cell disease', hint: 'or complement deficiency' },
        ] },
    { label: 'Exposures', flags: [
            { id: 'alcohol', label: 'Alcohol use disorder' },
            { id: 'idu', label: 'Injects drugs' },
            { id: 'homeless', label: 'Homeless or in a shelter' },
            { id: 'msm', label: 'Man who has sex with men', sex: 'male' },
            { id: 'stiRisk', label: 'New or multiple partners, or a recent STI' },
            { id: 'tbRisk', label: 'TB exposure risk', hint: 'born or lived where TB is common; shelter or jail' },
        ] },
    { label: 'Family and personal history', flags: [
            { id: 'fhCrcYoung', label: 'Close relative with colon cancer before 60', hint: 'or advanced polyp; or 2 close relatives at any age' },
            { id: 'fhCrcOld', label: 'One close relative with colon cancer at 60 or older', hint: 'or advanced polyp' },
            { id: 'fhBreast', label: 'Breast or ovarian cancer in self or family', hint: 'or BRCA-linked ancestry', sex: 'female' },
            { id: 'noCervix', label: 'Hysterectomy with cervix removed', hint: 'no history of high-grade lesion', sex: 'female' },
            { id: 'postmenoRisk', label: 'Past menopause with fracture risk', sex: 'female' },
            { id: 'priorGdm', label: 'Past gestational diabetes', sex: 'female' },
        ] },
];
export const PCS_GROUP_LABELS = {
    pregnancy: 'Pregnancy',
    diabetes: 'Diabetes care',
    vaccines: 'Vaccines',
    cancer: 'Cancer screening',
    cardio: 'Heart, vessels and metabolism',
    infection: 'Infection screening',
    behavior: 'Mental health and substance use',
    bone: 'Bones and falls',
};
export const PCS_GROUP_ORDER = ['pregnancy', 'diabetes', 'vaccines', 'cancer', 'cardio', 'infection', 'behavior', 'bone'];
const U = 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/';
const CDC_NOTES = 'https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-notes.html';
// Years are stated only where the page's own date was confirmed.
export const PCS_SOURCES = {
    'uspstf-crc': { cite: 'US Preventive Services Task Force. Colorectal cancer: screening. Final recommendation, May 18, 2021.', url: `${U}colorectal-cancer-screening` },
    'uspstf-breast': { cite: 'US Preventive Services Task Force. Breast cancer: screening. Final recommendation, April 30, 2024.', url: `${U}breast-cancer-screening` },
    'uspstf-cervical': { cite: 'US Preventive Services Task Force. Cervical cancer: screening. Final recommendation, August 21, 2018 (update in progress).', url: `${U}cervical-cancer-screening` },
    'uspstf-lung': { cite: 'US Preventive Services Task Force. Lung cancer: screening. Final recommendation, March 9, 2021.', url: `${U}lung-cancer-screening` },
    'uspstf-prostate': { cite: 'US Preventive Services Task Force. Prostate cancer: screening. Final recommendation, May 8, 2018 (update in progress).', url: `${U}prostate-cancer-screening` },
    'uspstf-brca': { cite: 'US Preventive Services Task Force. BRCA-related cancer: risk assessment, genetic counseling, and genetic testing. 2019.', url: `${U}brca-related-cancer-risk-assessment-genetic-counseling-and-genetic-testing` },
    'uspstf-breast-meds': { cite: 'US Preventive Services Task Force. Breast cancer: medication use to reduce risk. 2019.', url: `${U}breast-cancer-medications-for-risk-reduction` },
    'uspstf-skin': { cite: 'US Preventive Services Task Force. Skin cancer: screening. 2023.', url: `${U}skin-cancer-screening` },
    'uspstf-oral': { cite: 'US Preventive Services Task Force. Oral cancer: screening. 2013.', url: `${U}oral-cancer-screening` },
    'uspstf-thyroid-ca': { cite: 'US Preventive Services Task Force. Thyroid cancer: screening. 2017.', url: `${U}thyroid-cancer-screening` },
    'uspstf-ovarian': { cite: 'US Preventive Services Task Force. Ovarian cancer: screening. 2018.', url: `${U}ovarian-cancer-screening` },
    'uspstf-pancreatic': { cite: 'US Preventive Services Task Force. Pancreatic cancer: screening. 2019.', url: `${U}pancreatic-cancer-screening` },
    'uspstf-testicular': { cite: 'US Preventive Services Task Force. Testicular cancer: screening. 2011.', url: `${U}testicular-cancer-screening` },
    'uspstf-bladder': { cite: 'US Preventive Services Task Force. Bladder cancer in adults: screening. 2011.', url: `${U}bladder-cancer-in-adults-screening` },
    'mstf-crc': { cite: 'Rex DK, et al. Colorectal cancer screening: recommendations for physicians and patients from the U.S. Multi-Society Task Force on Colorectal Cancer. 2017.', url: 'https://acgcdn.gi.org/wp-content/uploads/2018/04/Multi-Society-Task-Force-Colorectal-Cancer-Screening-Recommendations-Guideline-Summary.pdf' },
    'aasld-hcc': { cite: 'Singal AG, et al. AASLD Practice Guidance on prevention, diagnosis, and treatment of hepatocellular carcinoma. Hepatology. 2023.', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/' },
    'acs-breast': { cite: 'American Cancer Society. Recommendations for the early detection of breast cancer.', url: 'https://www.cancer.org/cancer/types/breast-cancer/screening-tests-and-early-detection/american-cancer-society-recommendations-for-the-early-detection-of-breast-cancer.html' },
    'acs-cervical': { cite: 'American Cancer Society. Cervical cancer screening guidelines. 2025.', url: 'https://www.cancer.org/cancer/types/cervical-cancer/detection-diagnosis-staging/cervical-cancer-screening-guidelines.html' },
    'acs-prostate': { cite: 'American Cancer Society. Recommendations for prostate cancer early detection. Revised November 12, 2026.', url: 'https://www.cancer.org/cancer/types/prostate-cancer/detection-diagnosis-staging/acs-recommendations.html' },
    'acs-lung': { cite: 'American Cancer Society. Lung cancer screening guidelines. 2023.', url: 'https://www.cancer.org/health-care-professionals/american-cancer-society-prevention-early-detection-guidelines/lung-cancer-screening-guidelines.html' },
    'uspstf-htn': { cite: 'US Preventive Services Task Force. Hypertension in adults: screening. April 27, 2021.', url: `${U}hypertension-in-adults-screening` },
    'uspstf-dm': { cite: 'US Preventive Services Task Force. Prediabetes and type 2 diabetes: screening. August 24, 2021.', url: `${U}screening-for-prediabetes-and-type-2-diabetes` },
    'uspstf-statin': { cite: 'US Preventive Services Task Force. Statin use for the primary prevention of cardiovascular disease in adults. 2022.', url: `${U}statin-use-in-adults-preventive-medication` },
    'uspstf-aspirin': { cite: 'US Preventive Services Task Force. Aspirin use to prevent cardiovascular disease. 2022.', url: `${U}aspirin-to-prevent-cardiovascular-disease-preventive-medication` },
    'uspstf-aaa': { cite: 'US Preventive Services Task Force. Abdominal aortic aneurysm: screening. December 10, 2019.', url: `${U}abdominal-aortic-aneurysm-screening` },
    'uspstf-osteo': { cite: 'US Preventive Services Task Force. Osteoporosis to prevent fractures: screening. January 14, 2025.', url: `${U}osteoporosis-screening` },
    'uspstf-hcv': { cite: 'US Preventive Services Task Force. Hepatitis C virus infection in adolescents and adults: screening. March 2, 2020.', url: `${U}hepatitis-c-screening` },
    'uspstf-hbv': { cite: 'US Preventive Services Task Force. Hepatitis B virus infection in adolescents and adults: screening. December 15, 2020.', url: `${U}hepatitis-b-virus-infection-screening` },
    'uspstf-hiv': { cite: 'US Preventive Services Task Force. Human immunodeficiency virus (HIV) infection: screening. June 11, 2019.', url: `${U}human-immunodeficiency-virus-hiv-infection-screening` },
    'uspstf-prep': { cite: 'US Preventive Services Task Force. Prevention of acquisition of HIV: preexposure prophylaxis. August 22, 2023.', url: `${U}prevention-of-human-immunodeficiency-virus-hiv-infection-pre-exposure-prophylaxis` },
    'uspstf-syphilis': { cite: 'US Preventive Services Task Force. Syphilis infection in nonpregnant adolescents and adults: screening. September 27, 2022.', url: `${U}syphilis-infection-nonpregnant-adults-adolescents-screening` },
    'uspstf-syphilis-preg': { cite: 'US Preventive Services Task Force. Syphilis infection during pregnancy: screening. May 13, 2025.', url: `${U}syphilis-infection-in-pregnancy-screening` },
    'uspstf-ctgc': { cite: 'US Preventive Services Task Force. Chlamydia and gonorrhea: screening. September 14, 2021.', url: `${U}chlamydia-and-gonorrhea-screening` },
    'uspstf-ltbi': { cite: 'US Preventive Services Task Force. Latent tuberculosis infection in adults: screening. May 2, 2023.', url: `${U}latent-tuberculosis-infection-screening` },
    'uspstf-depression': { cite: 'US Preventive Services Task Force. Depression and suicide risk in adults: screening. June 20, 2023.', url: `${U}screening-depression-suicide-risk-adults` },
    'uspstf-anxiety': { cite: 'US Preventive Services Task Force. Anxiety disorders in adults: screening. June 20, 2023.', url: `${U}anxiety-adults-screening` },
    'uspstf-alcohol': { cite: 'US Preventive Services Task Force. Unhealthy alcohol use in adolescents and adults: screening and behavioral counseling interventions. November 13, 2018.', url: `${U}unhealthy-alcohol-use-in-adolescents-and-adults-screening-and-behavioral-counseling-interventions` },
    'uspstf-drugs': { cite: 'US Preventive Services Task Force. Unhealthy drug use: screening. 2020.', url: `${U}drug-use-illicit-screening` },
    'uspstf-tobacco': { cite: 'US Preventive Services Task Force. Tobacco smoking cessation in adults, including pregnant persons: interventions. January 19, 2021.', url: `${U}tobacco-use-in-adults-and-pregnant-women-counseling-and-interventions` },
    'uspstf-ipv': { cite: 'US Preventive Services Task Force. Intimate partner violence and caregiver abuse of older or vulnerable adults: screening. June 24, 2025.', url: `${U}intimate-partner-violence-and-abuse-of-elderly-and-vulnerable-adults-screening` },
    'uspstf-obesity': { cite: 'US Preventive Services Task Force. Weight loss to prevent obesity-related morbidity and mortality in adults: behavioral interventions. 2018.', url: `${U}obesity-in-adults-interventions` },
    'uspstf-diet': { cite: 'US Preventive Services Task Force. Healthy diet and physical activity for cardiovascular disease prevention in adults with cardiovascular risk factors: behavioral counseling interventions. 2020.', url: `${U}healthy-diet-and-physical-activity-counseling-adults-with-high-risk-of-cvd` },
    'uspstf-falls': { cite: 'US Preventive Services Task Force. Falls prevention in community-dwelling older adults: interventions. June 4, 2024.', url: `${U}falls-prevention-community-dwelling-older-adults-interventions` },
    'uspstf-folic': { cite: 'US Preventive Services Task Force. Folic acid supplementation to prevent neural tube defects: preventive medication. August 1, 2023.', url: `${U}folic-acid-for-the-prevention-of-neural-tube-defects-preventive-medication` },
    'uspstf-asa-preg': { cite: 'US Preventive Services Task Force. Aspirin use to prevent preeclampsia and related morbidity and mortality: preventive medication. September 28, 2021.', url: `${U}low-dose-aspirin-use-for-the-prevention-of-morbidity-and-mortality-from-preeclampsia-preventive-medication` },
    'uspstf-gdm': { cite: 'US Preventive Services Task Force. Gestational diabetes: screening. 2021.', url: `${U}gestational-diabetes-screening` },
    'uspstf-rh': { cite: 'US Preventive Services Task Force. Rh(D) incompatibility: screening.', url: `${U}rh-d-incompatibility-screening` },
    'uspstf-bacteriuria': { cite: 'US Preventive Services Task Force. Asymptomatic bacteriuria in adults: screening. 2019.', url: `${U}asymptomatic-bacteriuria-in-adults-screening` },
    'uspstf-perinatal': { cite: 'US Preventive Services Task Force. Perinatal depression: preventive interventions.', url: `${U}perinatal-depression-preventive-interventions` },
    'uspstf-carotid': { cite: 'US Preventive Services Task Force. Asymptomatic carotid artery stenosis: screening.', url: `${U}carotid-artery-stenosis-screening` },
    'uspstf-ecg': { cite: 'US Preventive Services Task Force. Cardiovascular disease risk: screening with electrocardiography. 2018.', url: `${U}cardiovascular-disease-risk-screening-with-electrocardiography` },
    'uspstf-vitd': { cite: 'US Preventive Services Task Force. Vitamin D deficiency in adults: screening.', url: `${U}vitamin-d-deficiency-screening` },
    'uspstf-thyroid-fn': { cite: 'US Preventive Services Task Force. Thyroid dysfunction: screening. 2015.', url: `${U}thyroid-dysfunction-screening` },
    'uspstf-copd': { cite: 'US Preventive Services Task Force. Chronic obstructive pulmonary disease: screening.', url: `${U}chronic-obstructive-pulmonary-disease-screening` },
    'uspstf-afib': { cite: 'US Preventive Services Task Force. Atrial fibrillation: screening. 2021.', url: `${U}atrial-fibrillation-screening` },
    'uspstf-vision': { cite: 'US Preventive Services Task Force. Impaired visual acuity in older adults: screening. May 24, 2022.', url: `${U}impaired-visual-acuity-screening-older-adults` },
    'uspstf-hearing': { cite: 'US Preventive Services Task Force. Hearing loss in older adults: screening. March 23, 2021.', url: `${U}hearing-loss-in-older-adults-screening` },
    'uspstf-cognitive': { cite: 'US Preventive Services Task Force. Cognitive impairment in older adults: screening. February 25, 2020.', url: `${U}cognitive-impairment-in-older-adults-screening` },
    'uspstf-hbv-preg': { cite: 'US Preventive Services Task Force. Hepatitis B virus infection in pregnant women: screening. July 23, 2019.', url: `${U}hepatitis-b-virus-infection-in-pregnant-women-screening` },
    'uspstf-vitd-supp': { cite: 'US Preventive Services Task Force. Vitamin D, calcium, or combined supplementation for the primary prevention of fractures in community-dwelling adults: preventive medication. April 17, 2018.', url: `${U}vitamin-d-calcium-or-combined-supplementation-for-the-primary-prevention-of-fractures-in-adults-preventive-medication` },
    'cdc-hbv': { cite: 'Conners EE, et al. Screening and testing for hepatitis B virus infection: CDC recommendations, United States, 2023. MMWR Recomm Rep. 2023;72(RR-1):1-25.', url: 'https://www.cdc.gov/mmwr/volumes/72/rr/rr7201a1.htm' },
    'cdc-hcv': { cite: 'Schillie S, et al. CDC recommendations for hepatitis C screening among adults, United States, 2020. MMWR Recomm Rep. 2020;69(RR-2):1-17.', url: 'https://www.cdc.gov/mmwr/volumes/69/rr/rr6902a1.htm' },
    'cdc-hiv': { cite: 'CDC. HIV Nexus: clinical testing guidance for HIV. Updated August 17, 2026.', url: 'https://www.cdc.gov/hivnexus/hcp/diagnosis-testing/index.html' },
    'cdc-sti': { cite: 'CDC. Sexually Transmitted Infections Treatment Guidelines, 2021: screening recommendations and considerations.', url: 'https://www.cdc.gov/std/treatment-guidelines/screening-recommendations.htm' },
    'acs-crc': { cite: 'American Cancer Society. Guideline for colorectal cancer screening. Revised May 27, 2026.', url: 'https://www.cancer.org/cancer/types/colon-rectal-cancer/detection-diagnosis-staging/acs-recommendations.html' },
    'aasld-masld': { cite: 'Rinella ME, et al. AASLD Practice Guidance on the clinical assessment and management of nonalcoholic fatty liver disease. Hepatology. 2023;77(5):1797-1835.', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10735173/' },
    'fda-tamoxifen': { cite: 'Tamoxifen citrate tablets, prescribing information (boxed warning and pregnancy sections). DailyMed, National Library of Medicine.', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8f642753-9e12-433c-a0bc-ab33dac41ddf' },
    'ada-dx': { cite: 'American Diabetes Association Professional Practice Committee. 2. Diagnosis and classification of diabetes: Standards of Care in Diabetes 2026. Diabetes Care. 2026;49(Suppl 1):S27.', url: 'https://diabetesjournals.org/care/article/49/Supplement_1/S27/163926/2-Diagnosis-and-Classification-of-Diabetes' },
    'ada-care': { cite: 'American Diabetes Association Professional Practice Committee. Standards of Care in Diabetes 2026, sections 6 (glycemic goals), 10 (cardiovascular disease), 11 (chronic kidney disease) and 12 (retinopathy, neuropathy, foot care). Diabetes Care. 2026;49(Suppl 1).', url: 'https://diabetesjournals.org/care/issue/49/Supplement_1' },
    'acc-lipid': { cite: '2026 ACC/AHA Guideline on the Management of Dyslipidemia. J Am Coll Cardiol. 2026. doi:10.1016/j.jacc.2025.11.016', url: 'https://doi.org/10.1016/j.jacc.2025.11.016' },
    'kdigo-ckd': { cite: 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int. 2024;105(4S).', url: 'https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf' },
    'cdc-vax': { cite: 'CDC. Adult Immunization Schedule by Age and Notes, United States, 2025 (July 2, 2025 version, amended April 27, 2026; the schedule in force under the March 16, 2026 court order).', url: CDC_NOTES },
    'aafp-vax': { cite: 'American Academy of Family Physicians. Adults 19 and older immunization schedules. 2026.', url: 'https://www.aafp.org/clinical-insights/immunizations-and-vaccines/immunizations-schedules-resources/adult-immunization-schedules' },
    'acog-vax': { cite: 'American College of Obstetricians and Gynecologists. Maternal Immunization Schedule. 2026.', url: 'https://www.acog.org/clinical/resources/maternal-immunization-schedule/' },
};
export const PCS_CITATIONS = Object.values(PCS_SOURCES).map(s => `${s.cite} ${s.url}`);
export const PCS_FOOTER = 'This list shows what guidelines recommend for an adult with the features you entered. It cannot see what has already been done, symptoms, or the full history. Screening is for people without symptoms: work up symptoms on their own terms. Confirm history, then decide with the patient. Source for every item is one tap away.';
/** Under 50 the pregnancy control starts on "could become pregnant"; the clinician can change it. A display default, not a guideline cutoff. */
export function defaultPreg(age) {
    return age < 50 ? 'possible' : 'no';
}
const WHY_ALL = 'Applies to all adults.';
export function screenPatient(p) {
    if (!Number.isFinite(p.age) || p.age < 0 || p.age > 120)
        return { notice: 'Enter an age between 18 and 120.', recs: [] };
    if (p.age < 18)
        return { notice: 'This tool covers adults 18 and older. Children and teens follow the pediatric schedules.', recs: [] };
    const recs = [];
    const add = (r) => { recs.push(r); };
    const f = new Set(p.flags);
    const has = (x) => f.has(x);
    const { age } = p;
    const female = p.sex === 'female';
    const male = !female;
    const pregnant = female && p.preg === 'pregnant';
    const couldConceive = female && p.preg === 'possible';
    const smokes = p.tobacco === 'current';
    const everSmoked = p.tobacco !== 'never';
    const obese = has('obesity') || has('bmi40');
    const overweight = has('overweight') || obese;
    const ckd = has('ckd') || has('dialysis');
    const liver = has('liver') || has('cirrhosis') || has('hepB');
    const weakImmune = has('immunocomp');
    // Sex-limited flags are ignored when they do not match, whatever the caller passes.
    const msm = male && f.has('msm');
    const sexRisk = msm || has('stiRisk');
    const within = (lo, hi) => age >= lo && age <= hi;
    const ageWhy = (lo, hi) => `${female ? 'Woman' : 'Man'} aged ${age}; the recommendation covers ${hi === undefined ? `${lo} and older` : `${lo} to ${hi}`}.`;
    // ───────────────────────── Vaccines (CDC adult schedule, age 19+) ─────────────────────────
    if (age === 18) {
        add({ id: 'vax-18', group: 'vaccines', tier: 'unknown', title: 'Vaccines at age 18', action: `Age 18 follows the child and adolescent schedule, which this tool does not cover.${pregnant ? ' In pregnancy at any age: Tdap at 27 to 36 weeks, inactivated flu vaccine, and RSV vaccine at 32 to 36 weeks in season; no MMR or varicella until after delivery.' : ''}`, why: 'The adult schedule starts at 19.', strength: 'CDC schedule', where: 'either', src: ['cdc-vax'] });
    }
    else {
        const live = pregnant || weakImmune;
        add({ id: 'vax-flu', group: 'vaccines', tier: 'do', title: 'Flu vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
            action: age >= 65 ? 'One dose every year. At 65 and older, high-dose, recombinant or adjuvanted vaccine is preferred; give any age-appropriate flu vaccine if none is available.'
                : pregnant ? 'One dose every year, inactivated or recombinant. The nasal live vaccine is contraindicated in pregnancy.'
                    : `One dose every year, any vaccine appropriate for age and health status.${weakImmune || has('hiv') ? ' Not the nasal live vaccine.' : ''}`,
            why: WHY_ALL,
            other: age >= 65 ? 'AAFP 2026 lists the same three options and adds an mRNA flu vaccine as preferred.' : undefined });
        if (pregnant) {
            add({ id: 'vax-covid', group: 'vaccines', tier: 'discuss', title: 'COVID-19 vaccine in pregnancy', where: 'either', src: ['cdc-vax', 'aafp-vax', 'acog-vax'], strength: 'Sources differ',
                action: 'The CDC schedule in force gives no pregnancy recommendation: its routine line reads "age 19 to 64 years (not pregnant)". ACOG and AAFP recommend vaccination in pregnancy. Decide with the patient.',
                why: 'Pregnant.',
                other: 'ACOG 2026 lists COVID-19 vaccine among vaccines given in every pregnancy, at any gestational age. AAFP 2026 recommends it during pregnancy, in any trimester.' });
        }
        else {
            add({ id: 'vax-covid', group: 'vaccines', tier: 'do', title: 'COVID-19 vaccine', where: 'either', src: ['cdc-vax', 'aafp-vax'], strength: 'CDC schedule',
                action: weakImmune ? 'Routine vaccination. With moderate or severe immunocompromise, a multi-dose series applies and further doses are a shared decision, at least 2 months apart.'
                    : age >= 65 ? 'Routine vaccination. At 65 and older the schedule lists a second dose about 6 months after the first.'
                        : 'Routine vaccination with the current vaccine.',
                why: weakImmune ? 'Immunocompromised.' : WHY_ALL,
                other: 'The CDC notes still carry 2024 to 2025 product wording. AAFP 2026: an updated dose each respiratory season for all adults.' });
        }
        add({ id: 'vax-tdap', group: 'vaccines', tier: 'do', title: pregnant ? 'Tdap in this pregnancy' : 'Tetanus booster (Td or Tdap)', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
            action: pregnant ? 'One dose of Tdap in every pregnancy, preferably early in gestational weeks 27 to 36.'
                : 'Td or Tdap every 10 years. If the patient has never had Tdap as an adolescent or adult, give one dose of Tdap now.',
            why: pregnant ? 'Pregnant.' : WHY_ALL });
        const pneumoRisk = [
            [has('alcohol'), 'alcohol use disorder'], [has('cvd'), 'chronic heart disease'], [liver, 'chronic liver disease'], [has('lung'), 'chronic lung disease'],
            [ckd, 'chronic kidney disease'], [smokes, 'smoking'], [has('asplenia'), 'no spleen or sickle cell disease'], [has('diabetes'), 'diabetes'],
            [has('hiv'), 'HIV'], [weakImmune, 'immunocompromise'],
        ];
        const pneumoWhy = pneumoRisk.filter(r => r[0]).map(r => r[1]);
        if (age >= 50 || pneumoWhy.length) {
            if (pregnant)
                add({ id: 'vax-pneumo', group: 'vaccines', tier: 'discuss', title: 'Pneumococcal vaccine in pregnancy', where: 'either', src: ['cdc-vax', 'acog-vax'], strength: 'Sources differ',
                    action: 'The CDC schedule makes no recommendation for pneumococcal vaccine in pregnancy because data are limited. Otherwise give it after delivery.',
                    why: `Pregnant, with an indication outside pregnancy: ${age >= 50 ? 'age 50 or older' : pneumoWhy.join(', ')}.`,
                    other: 'ACOG 2026 lists pneumococcal vaccine among those given to specific groups during pregnancy.' });
            else
                add({ id: 'vax-pneumo', group: 'vaccines', tier: 'do', title: 'Pneumococcal vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                    action: 'If never given a conjugate vaccine, or history unknown: one dose of PCV20 or PCV21, or PCV15 followed by PPSV23 at least 1 year later. No further dose after PCV20 or PCV21.',
                    why: age >= 50 ? `Aged ${age}; recommended for everyone 50 and older.` : `Under 50 with a risk condition: ${pneumoWhy.join(', ')}.` });
        }
        if (age >= 50 || weakImmune || has('hiv')) {
            add({ id: 'vax-zoster', group: 'vaccines', tier: pregnant ? 'discuss' : 'do', title: 'Shingles vaccine (recombinant)', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                action: pregnant ? 'Two doses, 2 to 6 months apart. In pregnancy, consider waiting until after delivery.' : 'Two doses, 2 to 6 months apart, whether or not the patient has had shingles or the older live vaccine.',
                why: age >= 50 ? `Aged ${age}; recommended for everyone 50 and older.` : 'Aged 19 or older with immunocompromise or HIV.' });
        }
        const rsvRisk = [
            [has('cvd'), 'chronic heart disease (a past stroke alone does not count)'], [has('lung'), 'chronic lung disease'], [has('dialysis'), 'dialysis'], [has('diabetes'), 'diabetes'],
            [liver, 'chronic liver disease'], [has('bmi40'), 'BMI 40 or more'], [weakImmune, 'immunocompromise'],
        ];
        const rsvWhy = rsvRisk.filter(r => r[0]).map(r => r[1]);
        if (pregnant) {
            // Pregnancy uses the maternal card below; the older-adult indication does not apply.
        }
        else if (age >= 75) {
            add({ id: 'vax-rsv', group: 'vaccines', tier: 'do', title: 'RSV vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule', action: 'One dose, once. No further doses.', why: `Aged ${age}; recommended for everyone 75 and older.` });
        }
        else if (age >= 50 && rsvWhy.length) {
            add({ id: 'vax-rsv', group: 'vaccines', tier: 'do', title: 'RSV vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule', action: `One dose, once. No further doses.${has('diabetes') ? ' Diabetes counts only with end-organ damage, or when treated with insulin or an SGLT2 inhibitor.' : ''}`, why: `Aged 50 to 74 with a condition that raises the risk of severe RSV: ${rsvWhy.join(', ')}.` });
        }
        if (pregnant) {
            add({ id: 'vax-rsv-preg', group: 'vaccines', tier: 'do', title: 'RSV vaccine in pregnancy (Abrysvo)', where: 'either', src: ['cdc-vax', 'acog-vax', 'aafp-vax'], strength: 'CDC schedule',
                action: 'One dose at 32 weeks 0 days to 36 weeks 6 days, given in season. The CDC schedule gives the season as September through January in most of the continental US. Not if it was given in an earlier pregnancy: additional doses are not recommended.',
                why: 'Pregnant.', other: 'ACOG and AAFP 2026 give a longer season: September 1 through March 1.' });
        }
        if (age <= 45) {
            if (pregnant) {
                add({ id: 'vax-hpv', group: 'vaccines', tier: 'avoid', title: 'HPV vaccine: wait until after pregnancy', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule', action: 'HPV vaccination is not recommended until after pregnancy.', why: 'Pregnant.' });
            }
            else if (age <= 26) {
                add({ id: 'vax-hpv', group: 'vaccines', tier: 'do', title: 'HPV vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                    action: weakImmune || has('hiv') ? 'Complete a 3-dose series (0, 1 to 2, and 6 months).' : 'Complete the series if not done: 3 doses (0, 1 to 2, and 6 months) when started at 15 or older; 2 doses count as complete if the first was given at 9 to 14.',
                    why: `Aged ${age}; catch-up vaccination runs through age 26.` });
            }
            else {
                add({ id: 'vax-hpv', group: 'vaccines', tier: 'discuss', title: 'HPV vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule, shared decision',
                    action: 'Not routine at this age. A shared decision for adults 27 to 45 who were not fully vaccinated.', why: `Aged ${age}; shared decision-making covers 27 to 45.` });
            }
        }
        const hbvRisk = [[has('liver') || has('cirrhosis'), 'chronic liver disease'], [has('hiv'), 'HIV'], [has('idu'), 'injection drug use'], [sexRisk, 'sexual exposure risk'], [ckd, 'dialysis or kidney disease before dialysis']];
        const hbvWhy = hbvRisk.filter(r => r[0]).map(r => r[1]);
        const hbvDialysis = 'On dialysis, if not vaccinated: 3 doses of Recombivax HB dialysis formulation (40 mcg) at 0, 1 and 6 months, or 4 doses of Engerix-B 2 mL at 0, 1, 2 and 6 months.';
        if (!has('hepB')) {
            if (age <= 59) {
                add({ id: 'vax-hepb', group: 'vaccines', tier: 'do', title: 'Hepatitis B vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                    action: has('dialysis') ? hbvDialysis : `Complete a 2-, 3- or 4-dose series if not vaccinated (Heplisav-B is 2 doses at least 4 weeks apart).${pregnant ? ' PreHevbrio is not recommended in pregnancy.' : ''}`,
                    why: `Aged ${age}; recommended for all adults 19 through 59.` });
            }
            else if (hbvWhy.length) {
                add({ id: 'vax-hepb', group: 'vaccines', tier: 'do', title: 'Hepatitis B vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                    action: has('dialysis') ? hbvDialysis : 'Complete a 2-, 3- or 4-dose series if not vaccinated.', why: `Aged 60 or older with a risk factor: ${hbvWhy.join(', ')}.` });
            }
            else {
                add({ id: 'vax-hepb', group: 'vaccines', tier: 'discuss', title: 'Hepatitis B vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                    action: has('diabetes') ? 'At 60 and older with diabetes, vaccination is a shared decision. Vaccinate if the patient asks.' : 'Adults 60 and older without known risk factors may be vaccinated, and should be if they ask or a risk factor is present.',
                    why: has('diabetes') ? `Aged ${age} with diabetes.` : `Aged ${age} with no hepatitis B risk factor entered.` });
            }
        }
        const havRisk = [[liver, 'chronic liver disease'], [has('hiv'), 'HIV'], [msm, 'men who have sex with men'], [has('idu'), 'drug use'], [has('homeless'), 'homelessness']];
        const havWhy = havRisk.filter(r => r[0]).map(r => r[1]);
        if (havWhy.length) {
            add({ id: 'vax-hepa', group: 'vaccines', tier: 'do', title: 'Hepatitis A vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                action: 'Two-dose hepatitis A series, or the 3-dose combined hepatitis A and B vaccine.', why: `Risk group: ${havWhy.join(', ')}.` });
        }
        // Evidence of immunity by birth year: before 1957 (MMR) and before 1980 (varicella). Age alone leaves a one-year
        // ambiguity at the boundary, so the card is shown unless the patient was certainly born before the cutoff.
        const bornBefore = (cutoff) => p.year - age < cutoff;
        const notPregCheck = couldConceive ? ' Live vaccine: confirm not pregnant first.' : '';
        if (!bornBefore(1957)) {
            if (live) {
                add({ id: 'vax-mmr', group: 'vaccines', tier: 'avoid', title: 'MMR: do not give now', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                    action: pregnant ? 'MMR is contraindicated in pregnancy. If there is no evidence of rubella immunity, give one dose after delivery, before discharge.' : 'MMR is contraindicated with severe immunocompromise.',
                    why: pregnant ? 'Pregnant.' : 'Immunocompromised.' });
            }
            else {
                add({ id: 'vax-mmr', group: 'vaccines', tier: 'do', title: 'MMR vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                    action: has('hiv') ? `If no evidence of immunity: 2 doses at least 4 weeks apart, only when CD4 is at least 15% and at least 200 cells/mm3 for 6 months or more. Contraindicated below that.${notPregCheck}`
                        : `If no evidence of immunity (documented dose, lab evidence, or lab-confirmed disease): one dose.${notPregCheck}`,
                    why: 'Born in 1957 or later; birth before 1957 counts as immunity.' });
            }
        }
        // Pregnant women are excluded from the born-before-1980 rule: the stop card shows at any age.
        if (!bornBefore(1980) || pregnant) {
            if (live) {
                add({ id: 'vax-var', group: 'vaccines', tier: 'avoid', title: 'Varicella vaccine: do not give now', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                    action: pregnant ? 'Varicella vaccine is contraindicated in pregnancy. Vaccinate after pregnancy if there is no evidence of immunity.' : 'Varicella vaccine is contraindicated with severe immunocompromise.',
                    why: pregnant ? 'Pregnant.' : 'Immunocompromised.' });
            }
            else {
                add({ id: 'vax-var', group: 'vaccines', tier: has('hiv') ? 'discuss' : 'do', title: 'Varicella (chickenpox) vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                    action: has('hiv') ? `If no evidence of immunity, may be considered when CD4 is at least 15% and at least 200 cells/mm3: 2 doses 3 months apart. Contraindicated below that.${notPregCheck}`
                        : `If no evidence of immunity (2 documented doses, a clinician diagnosis of chickenpox or shingles, or lab evidence): 2 doses 4 to 8 weeks apart.${notPregCheck}`,
                    why: 'Born in 1980 or later; US birth before 1980 counts as immunity.' });
            }
        }
        else if (!live) {
            add({ id: 'vax-var', group: 'vaccines', tier: 'discuss', title: 'Varicella (chickenpox) vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                action: has('hiv') ? `Birth in the US before 1980 counts as immunity. If born elsewhere with no evidence of immunity, may be considered only when CD4 is at least 15% and at least 200 cells/mm3: 2 doses 3 months apart. Contraindicated below that.${notPregCheck}`
                    : `Birth in the US before 1980 counts as immunity. If born elsewhere with no history of chickenpox, shingles or vaccination and no lab evidence: 2 doses 4 to 8 weeks apart.${notPregCheck}`,
                why: 'Born before 1980; the birth-year rule covers US-born adults only.' });
        }
        if (has('asplenia') || has('hiv')) {
            add({ id: 'vax-menacwy', group: 'vaccines', tier: 'do', title: 'Meningococcal ACWY vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                action: 'Two doses at least 8 weeks apart, then a booster every 5 years while the risk remains.', why: has('asplenia') ? 'No spleen, sickle cell disease or complement deficiency.' : 'HIV.' });
        }
        if (has('asplenia')) {
            add({ id: 'vax-menb', group: 'vaccines', tier: pregnant ? 'discuss' : 'do', title: 'Meningococcal B vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                action: `${pregnant ? 'Delay until after pregnancy for lack of safety data; may be given if the benefit outweighs the risk. ' : ''}Three doses (0, 1 to 2, and 6 months), a booster at 1 year, then every 2 to 3 years while the risk remains.`, why: 'No spleen, sickle cell disease or complement deficiency.' });
            add({ id: 'vax-hib', group: 'vaccines', tier: 'do', title: 'Hib vaccine', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                action: 'One dose if never given. Before a planned splenectomy, give it at least 14 days ahead. Not indicated for complement deficiency alone.', why: 'No spleen or sickle cell disease.' });
        }
        if (msm) {
            add({ id: 'vax-mpox', group: 'vaccines', tier: has('stiRisk') ? 'do' : 'discuss', title: 'Mpox vaccine (JYNNEOS)', where: 'either', src: ['cdc-vax'], strength: 'CDC schedule',
                action: 'Two doses 28 days apart for men who have sex with men who, in the past 6 months, had a new STI, more than one partner, or sex at a commercial venue or large event in an area with transmission.',
                why: has('stiRisk') ? 'Man who has sex with men, with new or multiple partners or a recent STI.' : 'Man who has sex with men; applies if one of the listed exposures is present.' });
        }
    }
    // ───────────────────────── Cancer screening ─────────────────────────
    // Editorial judgment, not a quoted guideline sentence: surveillance past 75 is individualized.
    const crcOld = age > 75 ? ' Over 75: weigh overall health and life expectancy before colonoscopy.' : '';
    if (has('ibd')) {
        add({ id: 'crc-ibd', group: 'cancer', tier: age > 75 ? 'discuss' : 'do', title: 'Colon cancer: surveillance colonoscopy', where: 'refer', src: ['acs-crc', 'uspstf-crc'], strength: 'American Cancer Society 2026',
            action: `Average-risk tests do not apply. Colonoscopy starting at least 8 years after the bowel disease diagnosis, then every 1 to 3 years depending on risk factors and earlier findings.${crcOld}`, why: 'Inflammatory bowel disease is outside the average-risk recommendation.' });
    }
    else if (has('fhCrcYoung') && age <= 85) {
        add({ id: 'crc-fh', group: 'cancer', tier: age > 75 ? 'discuss' : 'do', title: 'Colon cancer: colonoscopy every 5 years', where: 'refer', src: ['mstf-crc'], strength: 'US Multi-Society Task Force 2017',
            action: `Colonoscopy every 5 years, starting at age 40 or 10 years before the youngest affected relative was diagnosed, whichever comes first.${age > 75 ? ' Multi-Society Task Force: consider stopping at 75 if up to date with negative prior tests or if life expectancy is under 10 years; people never screened may be considered up to 85.' : ''}`,
            why: 'A first-degree relative with colorectal cancer or an advanced adenoma before 60, or two first-degree relatives at any age.' });
    }
    else if (has('fhCrcOld') && within(40, 44)) {
        add({ id: 'crc-fh', group: 'cancer', tier: 'do', title: 'Colon cancer screening from age 40', where: 'either', src: ['mstf-crc'], strength: 'US Multi-Society Task Force 2017',
            action: 'Start at 40 with the same tests and intervals used for average risk: FIT every year or colonoscopy every 10 years.',
            why: 'One first-degree relative diagnosed at 60 or older; screening starts at 40.' });
    }
    else if (within(45, 75)) {
        add({ id: 'crc', group: 'cancer', tier: 'do', title: 'Colon cancer screening', where: 'either', src: ['uspstf-crc'], strength: `USPSTF grade ${age <= 49 ? 'B' : 'A'}`,
            action: 'Any one of: FIT or high-sensitivity stool blood test every year; stool DNA-FIT every 1 to 3 years; colonoscopy every 10 years; CT colonography every 5 years; flexible sigmoidoscopy every 5 years (or every 10 years with yearly FIT).',
            why: `Aged ${age}; average-risk screening covers 45 to 75.` });
    }
    else if (within(76, 85)) {
        add({ id: 'crc', group: 'cancer', tier: 'discuss', title: 'Colon cancer screening', where: 'either', src: ['uspstf-crc'], strength: 'USPSTF grade C',
            action: 'Screen selectively at 76 to 85, weighing overall health, prior screening and the patient\'s preference.', why: `Aged ${age}; a selective decision at 76 to 85.` });
    }
    else if (age > 85) {
        add({ id: 'crc', group: 'cancer', tier: 'avoid', title: 'Colon cancer screening: stop after 85', where: 'either', src: ['uspstf-crc', 'acs-crc'], strength: 'USPSTF (no grade); American Cancer Society', action: 'USPSTF: at 86 and older evidence is lacking and competing causes of death likely preclude a benefit. The American Cancer Society says screening should stop.', why: `Aged ${age}.` });
    }
    if (female) {
        if (within(40, 74)) {
            add({ id: 'breast', group: 'cancer', tier: 'do', title: 'Mammogram', where: 'refer', src: ['uspstf-breast', 'acs-breast'], strength: 'USPSTF grade B',
                action: 'Screening mammogram every 2 years. Does not apply to known BRCA carriers, chest radiation at a young age, or a prior breast cancer or high-risk biopsy: those need an individual plan.', why: ageWhy(40, 74),
                other: 'American Cancer Society: option to start yearly at 40 to 44, yearly at 45 to 54, then every 1 or 2 years from 55.' });
        }
        else if (age >= 75) {
            add({ id: 'breast', group: 'cancer', tier: 'unknown', title: 'Mammogram at 75 and older', where: 'refer', src: ['uspstf-breast'], strength: 'USPSTF: insufficient evidence',
                action: 'Evidence is insufficient to weigh benefit and harm of screening mammography at 75 and older.', why: `Woman aged ${age}.` });
        }
        if (has('fhBreast')) {
            add({ id: 'brca', group: 'cancer', tier: 'do', title: 'BRCA risk assessment', where: 'either', src: ['uspstf-brca'], strength: 'USPSTF grade B',
                action: 'Apply a brief familial risk tool. If positive, refer for genetic counseling and, if indicated, testing.',
                why: 'Personal or family history of breast, ovarian, tubal or peritoneal cancer, or ancestry linked to BRCA1/2 mutations.' });
            if (age >= 35) {
                add({ id: 'breast-meds', group: 'cancer', tier: 'discuss', title: 'Medication to lower breast cancer risk', where: 'refer', src: couldConceive ? ['uspstf-breast-meds', 'fda-tamoxifen'] : ['uspstf-breast-meds'], strength: 'USPSTF grade B if at increased risk',
                    action: `If a formal assessment shows increased risk and the risk of adverse effects is low, offer risk-reducing medication. Before menopause only tamoxifen is indicated; raloxifene and aromatase inhibitors are for postmenopausal women.${couldConceive ? ' Tamoxifen can harm a fetus: not for a woman planning pregnancy. Exclude pregnancy before starting and use reliable nonhormonal contraception during treatment and for about 2 months after.' : ''}`,
                    why: 'Woman 35 or older with a breast cancer risk factor entered.' });
            }
        }
        if (!has('noCervix')) {
            const cxRisk = has('hiv') || weakImmune ? ' With HIV or a compromised immune system, follow-up is individualized rather than the routine interval.' : '';
            const cxOther = 'American Cancer Society 2025: start at 25; primary HPV test every 5 years preferred; a self-collected HPV test every 3 years is acceptable.';
            if (age < 21) {
                add({ id: 'cervical', group: 'cancer', tier: 'avoid', title: 'Cervical cancer screening: not before 21', where: 'either', src: ['uspstf-cervical'], strength: 'USPSTF grade D', action: 'Do not screen women younger than 21.', why: `Woman aged ${age}.` });
            }
            else if (age <= 29) {
                add({ id: 'cervical', group: 'cancer', tier: 'do', title: 'Cervical cancer screening', where: 'either', src: ['uspstf-cervical', 'acs-cervical'], strength: 'USPSTF grade A',
                    action: `Cervical cytology (Pap) alone every 3 years.${cxRisk}`, why: ageWhy(21, 29), other: cxOther });
            }
            else if (age <= 65) {
                add({ id: 'cervical', group: 'cancer', tier: 'do', title: 'Cervical cancer screening', where: 'either', src: ['uspstf-cervical', 'acs-cervical'], strength: 'USPSTF grade A',
                    action: `One of: cytology (Pap) alone every 3 years; high-risk HPV test alone every 5 years; or both together every 5 years.${cxRisk}`, why: ageWhy(30, 65), other: cxOther });
            }
            else {
                add({ id: 'cervical', group: 'cancer', tier: 'discuss', title: 'Cervical cancer screening after 65: depends on past screening', where: 'either', src: ['uspstf-cervical'], strength: 'USPSTF grade D if adequately screened',
                    action: `Stop if prior screening was adequate: 3 negative cytology results in a row, or 2 negative cotests in a row, within the past 10 years, the latest within 5 years. Screening may be clinically indicated when the history is inadequate or unknown.${cxRisk}`,
                    why: `Woman aged ${age}; the stop rule depends on documented prior screening.` });
            }
        }
        else {
            add({ id: 'cervical', group: 'cancer', tier: 'avoid', title: 'Cervical cancer screening: not needed', where: 'either', src: ['uspstf-cervical'], strength: 'USPSTF grade D',
                action: 'Do not screen after hysterectomy with removal of the cervix when there is no history of a high-grade precancerous lesion or cervical cancer.', why: 'Hysterectomy with cervix removed.' });
        }
    }
    if (within(50, 80) && everSmoked && has('py20')) {
        if (smokes || has('quit15')) {
            add({ id: 'lung', group: 'cancer', tier: 'do', title: 'Lung cancer screening', where: 'refer', src: ['uspstf-lung'], strength: 'USPSTF grade B',
                action: 'Low-dose CT of the chest every year. Stop once the patient has not smoked for 15 years, or has a health problem that limits life expectancy or the ability or willingness to have curative lung surgery.',
                why: `Aged ${age} (covers 50 to 80), 20 or more pack-years, and ${smokes ? 'smokes now' : 'quit within the past 15 years'}.` });
        }
        else {
            add({ id: 'lung', group: 'cancer', tier: 'discuss', title: 'Lung cancer screening', where: 'refer', src: ['uspstf-lung', 'acs-lung'], strength: 'Sources differ',
                action: 'If the patient quit more than 15 years ago: not eligible under USPSTF, which stops screening once a person has not smoked for 15 years. The American Cancer Society removed the years-since-quitting limit.',
                why: `Aged ${age}, 20 or more pack-years; "quit within the last 15 years" not selected.`,
                other: 'American Cancer Society 2023: yearly low-dose CT for ages 50 to 80 with 20 or more pack-years, whether smoking now or formerly.' });
        }
    }
    if (male) {
        const psaOther = 'American Cancer Society (revised November 2026): PSA every 2 years at 50 to 69; yearly from 45 to 69 for Black men and men with a strong family history; discuss at 70 to 74; not recommended at 75 and older.';
        if (within(55, 69)) {
            add({ id: 'prostate', group: 'cancer', tier: 'discuss', title: 'Prostate cancer screening (PSA)', where: 'either', src: ['uspstf-prostate', 'acs-prostate'], strength: 'USPSTF grade C',
                action: 'An individual decision after discussing benefits and harms. Do not screen men who do not express a preference for it.', why: ageWhy(55, 69), other: psaOther });
        }
        else if (age >= 70) {
            add({ id: 'prostate', group: 'cancer', tier: 'avoid', title: 'Prostate cancer screening (PSA): not at 70 and older', where: 'either', src: ['uspstf-prostate', 'acs-prostate'], strength: 'USPSTF grade D',
                action: 'USPSTF recommends against PSA-based screening in men 70 and older.', why: ageWhy(70), other: psaOther });
        }
        else if (within(45, 54)) {
            add({ id: 'prostate', group: 'cancer', tier: 'discuss', title: 'Prostate cancer screening (PSA)', where: 'either', src: ['uspstf-prostate', 'acs-prostate'], strength: 'Sources differ',
                action: 'The USPSTF statement addresses men 55 and older. The American Cancer Society starts earlier.', why: age >= 50 ? `Man aged ${age}; below the USPSTF age range. The American Cancer Society screens average-risk men from 50.` : `Man aged ${age}; below the USPSTF age range. The American Cancer Society starts at 45 for Black men and men with a strong family history.`, other: psaOther });
        }
    }
    if (has('cirrhosis')) {
        add({ id: 'hcc', group: 'cancer', tier: 'do', title: 'Liver cancer surveillance', where: 'refer', src: ['aasld-hcc'], strength: 'AASLD 2023, strong',
            action: 'Liver ultrasound plus AFP about every 6 months. Applies to Child-Pugh A or B cirrhosis of any cause; Child-Pugh C only if a transplant candidate.', why: 'Cirrhosis.' });
    }
    else if (has('hepB')) {
        add({ id: 'hcc', group: 'cancer', tier: 'discuss', title: 'Liver cancer surveillance', where: 'refer', src: ['aasld-hcc'], strength: 'AASLD 2023',
            action: 'Without cirrhosis, surveillance (ultrasound plus AFP about every 6 months) applies to at-risk chronic hepatitis B: men over 40 or women over 50 from an endemic country, people from Africa at a younger age, or a family history of liver cancer.',
            why: 'Chronic hepatitis B without cirrhosis entered.' });
    }
    // ───────────────────────── Heart, vessels, metabolism ─────────────────────────
    if (!has('htn')) {
        add({ id: 'bp', group: 'cardio', tier: 'do', title: 'Blood pressure check', where: 'today', src: ['uspstf-htn'], strength: 'USPSTF grade A',
            action: pregnant ? 'Measure blood pressure. The routine screening intervals are written for nonpregnant adults.' : `Screen with an office blood pressure. ${age >= 40 || overweight ? 'Yearly at 40 and older, and for adults at increased risk (overweight or obesity, high-normal pressure, Black persons).' : 'Every 3 to 5 years at 18 to 39 with a prior normal reading and no added risk; yearly if at increased risk.'} Confirm a high reading with measurements outside the clinical setting before starting treatment.`, why: 'No diagnosis of high blood pressure entered; applies to all adults 18 and older.' });
    }
    if (!has('diabetes') && !pregnant) {
        const adaOther = 'ADA 2026: test all adults from 35; test earlier with overweight plus a risk factor; repeat at least every 3 years if normal, yearly with prediabetes.';
        const dmTest = 'Fasting glucose, A1c, or a 2-hour 75 g glucose tolerance test.';
        if (female && has('priorGdm')) {
            add({ id: 'dm', group: 'cardio', tier: 'do', title: 'Diabetes screening', where: 'today', src: ['ada-dx'], strength: 'ADA 2026', action: `${dmTest} Repeat every 1 to 3 years.`, why: 'Past gestational diabetes.' });
        }
        else if (within(35, 70) && overweight) {
            add({ id: 'dm', group: 'cardio', tier: 'do', title: 'Diabetes and prediabetes screening', where: 'today', src: ['uspstf-dm', 'ada-dx'], strength: 'USPSTF grade B', action: `${dmTest} Every 3 years is a reasonable interval when results are normal.`, why: `Aged ${age} (covers 35 to 70) with overweight or obesity.`, other: adaOther });
        }
        else if (age >= 35) {
            add({ id: 'dm', group: 'cardio', tier: 'do', title: 'Diabetes and prediabetes screening', where: 'today', src: ['ada-dx', 'uspstf-dm'], strength: 'ADA 2026', action: `${dmTest} Repeat at least every 3 years if normal.`,
                why: `Aged ${age}; ADA tests all adults from 35.`, other: 'USPSTF (grade B) covers ages 35 to 70 with overweight or obesity only.' });
        }
        else if (overweight && (has('htn') || has('cvd') || has('lipids'))) {
            add({ id: 'dm', group: 'cardio', tier: 'do', title: 'Diabetes and prediabetes screening', where: 'today', src: ['ada-dx'], strength: 'ADA 2026', action: `${dmTest} Repeat at least every 3 years if normal.`,
                why: 'Under 35 with overweight or obesity plus a risk factor (high blood pressure, heart disease, or abnormal lipids).' });
        }
    }
    if (age >= 19 && !pregnant) {
        // With diabetes the yearly ADA lipid panel in the diabetes group replaces this card.
        if (!has('diabetes'))
            add({ id: 'lipids', group: 'cardio', tier: 'do', title: 'Cholesterol panel', where: 'today', src: ['acc-lipid'], strength: 'ACC/AHA 2026, class 1',
                action: 'Lipid profile at least every 5 years, more often with added cardiovascular risk factors.', why: 'Applies to adults from age 19.' });
        add({ id: 'lpa', group: 'cardio', tier: 'do', title: 'Lipoprotein(a), once', where: 'today', src: ['acc-lipid'], strength: 'ACC/AHA 2026, class 1',
            action: 'Measure Lp(a) at least once for cardiovascular risk assessment. A level of 125 nmol/L (50 mg/dL) or higher is a risk-enhancing factor.', why: 'Applies to all adults.' });
    }
    const cvdRisk = [[has('lipids'), 'abnormal lipids'], [has('diabetes'), 'diabetes'], [has('htn'), 'high blood pressure'], [smokes, 'smoking']];
    const cvdWhy = cvdRisk.filter(r => r[0]).map(r => r[1]);
    if (!has('cvd') && !has('diabetes') && !pregnant && within(40, 75) && cvdWhy.length) {
        add({ id: 'statin', group: 'cardio', tier: 'do', title: 'Statin decision: estimate 10-year heart risk', where: 'today', src: ['uspstf-statin'], strength: 'USPSTF grade B (10% or more), C (7.5% to under 10%)',
            action: `Calculate 10-year cardiovascular risk. At 10% or higher, prescribe a statin. At 7.5% to under 10%, offer one selectively.${couldConceive ? ' Exclude pregnancy before prescribing.' : ''}`, why: `Aged ${age} (covers 40 to 75) with a risk factor: ${cvdWhy.join(', ')}.` });
    }
    if (!has('cvd') && !pregnant) {
        if (age >= 60) {
            add({ id: 'aspirin', group: 'cardio', tier: 'avoid', title: 'Aspirin for primary prevention: do not start', where: 'either', src: ['uspstf-aspirin'], strength: 'USPSTF grade D',
                action: 'Do not start low-dose aspirin to prevent a first heart attack or stroke in adults 60 and older.', why: `Aged ${age} with no heart disease or stroke entered.` });
        }
        else if (within(40, 59) && cvdWhy.length) {
            add({ id: 'aspirin', group: 'cardio', tier: 'discuss', title: 'Aspirin for primary prevention', where: 'either', src: ['uspstf-aspirin'], strength: 'USPSTF grade C',
                action: 'Only if 10-year cardiovascular risk is 10% or higher, and then an individual decision. The net benefit is small.', why: `Aged ${age} (covers 40 to 59) with a cardiovascular risk factor.` });
        }
    }
    if (within(65, 75)) {
        if (male && everSmoked) {
            add({ id: 'aaa', group: 'cardio', tier: 'do', title: 'Aortic aneurysm ultrasound, once', where: 'either', src: ['uspstf-aaa'], strength: 'USPSTF grade B', action: 'One-time abdominal ultrasound for aortic aneurysm.', why: 'Man aged 65 to 75 who has ever smoked (commonly defined as 100 or more cigarettes).' });
        }
        else if (male) {
            add({ id: 'aaa', group: 'cardio', tier: 'discuss', title: 'Aortic aneurysm ultrasound', where: 'either', src: ['uspstf-aaa'], strength: 'USPSTF grade C', action: 'Offer selectively rather than routinely to men 65 to 75 who have never smoked.', why: 'Man aged 65 to 75 who has never smoked.' });
        }
        else if (everSmoked) {
            add({ id: 'aaa', group: 'cardio', tier: 'unknown', title: 'Aortic aneurysm ultrasound', where: 'either', src: ['uspstf-aaa'], strength: 'USPSTF: insufficient evidence', action: 'Evidence is insufficient for women 65 to 75 who have ever smoked or have a family history of aneurysm.', why: 'Woman aged 65 to 75 who has ever smoked.' });
        }
        else {
            add({ id: 'aaa', group: 'cardio', tier: 'avoid', title: 'Aortic aneurysm ultrasound: not recommended', where: 'either', src: ['uspstf-aaa'], strength: 'USPSTF grade D', action: 'Do not screen women who have never smoked and have no family history of aneurysm.', why: 'Woman aged 65 to 75 who has never smoked.' });
        }
    }
    if (!ckd && !has('diabetes') && (has('htn') || has('cvd'))) {
        add({ id: 'ckd', group: 'cardio', tier: 'do', title: 'Kidney check', where: 'today', src: ['kdigo-ckd'], strength: 'KDIGO 2024, practice statement',
            action: 'Check eGFR (creatinine) and urine albumin for early kidney disease. KDIGO gives no fixed interval here.', why: `High-risk group for kidney disease: ${has('htn') ? 'high blood pressure' : 'cardiovascular disease'}.` });
    }
    const fibWhy = [[has('diabetes'), 'type 2 diabetes'], [obese && (has('htn') || has('lipids') || has('diabetes')), 'obesity with metabolic complications'], [has('alcohol'), 'more than mild alcohol use']].filter(r => r[0]).map(r => r[1]);
    if (fibWhy.length && !has('cirrhosis') && !pregnant) {
        add({ id: 'fib4', group: 'cardio', tier: 'do', title: 'Liver fibrosis check (FIB-4)', where: 'today', src: ['aasld-masld'], strength: 'AASLD 2023',
            action: `Calculate FIB-4 from age, AST, ALT and platelets. Below 1.3: low risk. At 1.3 or higher: elastography or an ELF test to exclude advanced fibrosis. Repeat every 1 to 2 years with prediabetes, diabetes, or 2 or more metabolic risk factors.${age < 35 ? ' FIB-4 is inaccurate under age 35.' : ''}`,
            why: `High-risk group for advanced liver fibrosis: ${fibWhy.join(', ')}.` });
    }
    if (obese && !pregnant) {
        add({ id: 'obesity', group: 'cardio', tier: 'do', title: 'Weight: intensive behavioral program', where: 'refer', src: ['uspstf-obesity'], strength: 'USPSTF grade B',
            action: 'Offer or refer to an intensive, multicomponent behavioral intervention.', why: 'BMI 30 or more.' });
    }
    if (has('htn') || has('lipids')) {
        add({ id: 'diet', group: 'cardio', tier: 'do', title: 'Diet and activity counseling', where: 'either', src: ['uspstf-diet'], strength: 'USPSTF grade B',
            action: 'Provide or refer for behavioral counseling to promote a healthy diet and physical activity.', why: 'Increased cardiovascular risk: high blood pressure or abnormal lipids.' });
    }
    // ───────────────────────── Diabetes care (ADA 2026) ─────────────────────────
    if (has('diabetes')) {
        const d = (id, title, action, where, strength = 'ADA 2026') => add({ id, group: 'diabetes', tier: 'do', title, action, where, strength, src: ['ada-care'], why: 'Diabetes.' });
        d('dm-a1c', 'A1c', 'At least twice a year; every 3 months when not at goal or after a treatment change.', 'today');
        d('dm-kidney', 'Urine albumin-creatinine ratio and eGFR', 'At least once a year in type 2 diabetes, and in type 1 after 5 years.', 'today');
        d('dm-eye', 'Dilated eye exam', 'Type 2: at diagnosis. Type 1: within 5 years of onset. Then yearly; every 1 to 2 years may be considered when there is no retinopathy and glucose is well controlled.', 'refer');
        d('dm-foot', 'Foot exam', 'Comprehensive foot evaluation at least once a year to find risk factors for ulcers and amputation.', 'today');
        d('dm-lipids', 'Lipid panel', 'At diagnosis, then yearly. Recheck 4 to 12 weeks after starting or changing a statin.', 'today');
        const conceiveNote = couldConceive ? ' Avoid if pregnancy is possible and contraception is not reliable.' : '';
        if (pregnant) {
            add({ id: 'dm-statin', group: 'diabetes', tier: 'avoid', title: 'Statin: not in pregnancy', where: 'either', strength: 'ADA 2026, grade B', src: ['ada-care'],
                action: 'In most circumstances lipid-lowering drugs are stopped before conception and avoided in pregnancy. Exceptions are a specialist decision.', why: 'Pregnant, with diabetes.' });
        }
        else if (!has('cvd')) {
            if (within(40, 75))
                d('dm-statin', 'Statin', `Moderate-intensity statin for diabetes at 40 to 75 without cardiovascular disease; high-intensity when cardiovascular risk is higher.${conceiveNote}`, 'today', 'ADA 2026, grade A');
            else if (within(20, 39))
                add({ id: 'dm-statin', group: 'diabetes', tier: 'discuss', title: 'Statin', action: `May be reasonable at 20 to 39 when additional cardiovascular risk factors are present.${conceiveNote}`, where: 'today', strength: 'ADA 2026, grade C', src: ['ada-care'], why: `Diabetes, aged ${age}.` });
            else if (age > 75)
                add({ id: 'dm-statin', group: 'diabetes', tier: 'discuss', title: 'Statin', action: 'Over 75: reasonable to continue a statin already in use; starting a moderate-intensity statin may be reasonable after discussion.', where: 'today', strength: 'ADA 2026, grade B to C', src: ['ada-care'], why: `Diabetes, aged ${age}.` });
        }
    }
    // ───────────────────────── Infection screening ─────────────────────────
    const hivRisk = sexRisk || has('idu');
    if (!has('hiv')) {
        const hivOther = 'CDC: test everyone aged 13 to 64 at least once; at least yearly with ongoing risk; every 3 to 6 months may benefit sexually active men who have sex with men.';
        if (pregnant) {
            add({ id: 'hiv', group: 'infection', tier: 'do', title: 'HIV test', where: 'today', src: ['uspstf-hiv', 'cdc-hiv'], strength: 'USPSTF grade A', action: 'Screen all pregnant persons.', why: 'Pregnant.' });
        }
        else if (age <= 65) {
            add({ id: 'hiv', group: 'infection', tier: 'do', title: 'HIV test', where: 'today', src: ['uspstf-hiv', 'cdc-hiv'], strength: 'USPSTF grade A',
                action: hivRisk ? 'Test now, and repeat at least yearly while the risk continues.' : 'Screen at least once if never tested.',
                why: hivRisk ? 'Ongoing exposure risk entered.' : `Aged ${age}; screening covers ages 15 to 65.`, other: hivOther });
        }
        else if (hivRisk) {
            add({ id: 'hiv', group: 'infection', tier: 'do', title: 'HIV test', where: 'today', src: ['uspstf-hiv', 'cdc-hiv'], strength: 'USPSTF grade A', action: 'Screen: adults older than 65 should be screened when they have risk factors. Repeat at least yearly while the risk continues.', why: 'Over 65 with an exposure risk entered.', other: hivOther });
        }
        if (hivRisk) {
            add({ id: 'prep', group: 'infection', tier: has('stiRisk') ? 'do' : 'discuss', title: 'HIV prevention (PrEP)', where: 'either', src: ['uspstf-prep'], strength: 'USPSTF grade A if at increased risk',
                action: 'Offer preexposure prophylaxis after a negative HIV test when, in the past 6 months, there was a sex partner with HIV, a bacterial STI, or inconsistent condom use with a partner of unknown status; or when injection equipment is shared.',
                why: `Exposure risk entered: ${[[sexRisk, 'sexual exposure'], [has('idu'), 'injection drug use']].filter(r => r[0]).map(r => r[1]).join(', ')}.` });
        }
    }
    const hcvOngoing = has('idu') || has('dialysis');
    const hcvRepeat = hcvOngoing ? ' Repeat periodically while the risk continues.' : '';
    if (pregnant) {
        add({ id: 'hcv', group: 'infection', tier: 'do', title: 'Hepatitis C test', where: 'today', src: ['cdc-hcv', 'uspstf-hcv'], strength: 'CDC 2020', action: `Screen during each pregnancy.${hcvRepeat}`, why: 'Pregnant.' });
    }
    else if (age <= 79) {
        add({ id: 'hcv', group: 'infection', tier: 'do', title: 'Hepatitis C test', where: 'today', src: ['uspstf-hcv', 'cdc-hcv'], strength: 'USPSTF grade B', action: `Screen once if never tested.${hcvRepeat}`,
            why: hcvOngoing ? `Aged ${age}, with an ongoing risk (${has('idu') ? 'injection drug use' : 'hemodialysis'}).` : `Aged ${age}; screening covers ages 18 to 79.`, other: 'CDC 2020: at least once in a lifetime for all adults 18 and older, with no upper age limit.' });
    }
    else {
        add({ id: 'hcv', group: 'infection', tier: 'do', title: 'Hepatitis C test', where: 'today', src: ['cdc-hcv', 'uspstf-hcv'], strength: 'CDC 2020', action: `Screen once if never tested.${hcvRepeat}`,
            why: `Aged ${age}; CDC screens all adults 18 and older at least once.`, other: 'The USPSTF statement (grade B) covers ages 18 to 79.' });
    }
    if (!has('hepB')) {
        if (pregnant) {
            add({ id: 'hbv', group: 'infection', tier: 'do', title: 'Hepatitis B test (HBsAg)', where: 'today', src: ['uspstf-hbv-preg', 'cdc-hbv'], strength: 'USPSTF grade A',
                action: 'HBsAg in each pregnancy, at the first prenatal visit, whatever the vaccination or testing history. Screen at delivery admission if status is unknown or risk is ongoing.', why: 'Pregnant.' });
        }
        else {
            const hbvScreenRisk = has('idu') || msm || has('hiv');
            add({ id: 'hbv', group: 'infection', tier: 'do', title: 'Hepatitis B test, once', where: 'today', src: ['cdc-hbv', 'uspstf-hbv'], strength: hbvScreenRisk ? 'CDC 2023; USPSTF grade B' : 'CDC 2023',
                action: 'Three-test panel at least once in a lifetime: HBsAg, anti-HBs, and total anti-HBc.',
                why: hbvScreenRisk ? 'All adults 18 and older, and this patient is in a higher-risk group.' : 'Applies to all adults 18 and older.',
                other: 'USPSTF (grade B) covers increased-risk groups only: born where hepatitis B is common, injection drug use, men who have sex with men, and household or sexual contacts of people with hepatitis B.' });
        }
    }
    if (pregnant) {
        add({ id: 'syphilis', group: 'infection', tier: 'do', title: 'Syphilis test', where: 'today', src: ['uspstf-syphilis-preg'], strength: 'USPSTF grade A', action: 'Screen early in pregnancy. If not yet screened, test at the first opportunity, including today.', why: 'Pregnant.',
            other: 'ACOG: rescreen every pregnant patient in the third trimester and at birth. CDC and AAP: rescreen at 28 weeks and at delivery when at high risk.' });
    }
    else if (sexRisk || has('hiv') || has('idu')) {
        add({ id: 'syphilis', group: 'infection', tier: 'do', title: 'Syphilis test', where: 'today', src: ['uspstf-syphilis', 'cdc-sti'], strength: 'USPSTF grade A',
            action: msm || has('hiv') ? 'Screen at least yearly; every 3 to 6 months while risk stays high.' : 'Screen people who have been sexually active and are at increased risk.',
            why: `Increased risk: ${has('hiv') ? 'HIV' : msm ? 'man who has sex with men' : has('stiRisk') ? 'new or multiple partners, or a recent STI' : 'drug use'}.` });
    }
    if (female && (age <= 24 || has('stiRisk'))) {
        add({ id: 'ctgc', group: 'infection', tier: 'do', title: 'Chlamydia and gonorrhea test', where: 'today', src: ['uspstf-ctgc'], strength: 'USPSTF grade B',
            action: 'Screen if sexually active.', why: age <= 24 ? `Woman aged ${age}; covers sexually active women 24 and younger.` : 'Woman 25 or older at increased risk.' });
    }
    else if (msm || has('hiv')) {
        add({ id: 'ctgc', group: 'infection', tier: 'do', title: 'Chlamydia and gonorrhea test', where: 'today', src: ['cdc-sti', 'uspstf-ctgc'], strength: 'CDC STI guidelines',
            action: msm ? 'If sexually active: at least yearly at each site of contact (urethra, rectum, and throat for gonorrhea); every 3 to 6 months at increased risk.' : 'If sexually active: at the first HIV evaluation and at least yearly after.',
            why: msm ? 'Man who has sex with men.' : 'Living with HIV.', other: male ? 'USPSTF: evidence is insufficient to weigh screening in men.' : undefined });
    }
    if (male && !msm && !has('hiv') && has('stiRisk')) {
        add({ id: 'ctgc', group: 'infection', tier: 'unknown', title: 'Chlamydia and gonorrhea test in men', where: 'today', src: ['uspstf-ctgc'], strength: 'USPSTF: insufficient evidence',
            action: 'Evidence is insufficient to weigh screening for chlamydia and gonorrhea in men.', why: 'Man with new or multiple partners, or a recent STI.' });
    }
    if (has('tbRisk') || has('homeless')) {
        add({ id: 'ltbi', group: 'infection', tier: 'do', title: 'Latent TB test', where: 'today', src: ['uspstf-ltbi'], strength: 'USPSTF grade B',
            action: 'Screen with an interferon-gamma release assay or a tuberculin skin test. The blood test suits patients who had BCG vaccine or are unlikely to return for a skin test reading.',
            why: has('tbRisk') ? 'Born in or formerly lived in a country where TB is common, or lives or lived in a shelter or correctional facility.' : 'Lives or has lived in a high-risk congregate setting such as a homeless shelter.' });
    }
    // ───────────────────────── Mental health and substance use ─────────────────────────
    add({ id: 'depression', group: 'behavior', tier: 'do', title: 'Depression screen', where: 'today', src: ['uspstf-depression'], strength: 'USPSTF grade B', action: 'Screen with a brief validated questionnaire.', why: pregnant ? 'Applies to all adults, including during and after pregnancy.' : WHY_ALL });
    if (age <= 64) {
        add({ id: 'anxiety', group: 'behavior', tier: 'do', title: 'Anxiety screen', where: 'today', src: ['uspstf-anxiety'], strength: 'USPSTF grade B', action: 'Screen with a brief validated questionnaire.', why: `Aged ${age}; covers adults 64 and younger.` });
    }
    add({ id: 'alcohol', group: 'behavior', tier: 'do', title: 'Alcohol use screen', where: 'today', src: ['uspstf-alcohol'], strength: 'USPSTF grade B', action: 'Screen for unhealthy alcohol use and give brief counseling to people with risky drinking.', why: 'Applies to all adults 18 and older.' });
    add({ id: 'drugs', group: 'behavior', tier: 'do', title: 'Drug use screen', where: 'today', src: ['uspstf-drugs'], strength: 'USPSTF grade B', action: 'Ask about unhealthy drug use.', why: 'Applies to all adults 18 and older.' });
    if (smokes) {
        add({ id: 'tobacco', group: 'behavior', tier: 'do', title: 'Help to quit smoking', where: 'today', src: ['uspstf-tobacco'], strength: 'USPSTF grade A',
            action: pregnant ? 'Advise to stop and provide behavioral support. Evidence on cessation medication in pregnancy is insufficient.' : 'Advise to stop, and offer both behavioral support and FDA-approved cessation medication.', why: 'Smokes now.' });
    }
    // The statement gives no age range for "reproductive age"; under 50 mirrors defaultPreg and is not tied to fertility.
    if (female && (age < 50 || p.preg !== 'no')) {
        add({ id: 'ipv', group: 'behavior', tier: 'do', title: 'Partner violence screen', where: 'today', src: ['uspstf-ipv'], strength: 'USPSTF grade B', action: 'Screen for intimate partner violence and connect those who screen positive with support services.', why: 'Woman of reproductive age.' });
    }
    // ───────────────────────── Bones and falls ─────────────────────────
    if (female && (age >= 65 || has('postmenoRisk'))) {
        add({ id: 'osteo', group: 'bone', tier: 'do', title: 'Bone density test', where: 'refer', src: ['uspstf-osteo'], strength: 'USPSTF grade B',
            action: age >= 65 ? 'Screen for osteoporosis to prevent fractures.' : 'Under 65: look for a risk factor first (low body weight, parental hip fracture, smoking, excess alcohol), then confirm increased risk with a tool such as FRAX, OST or ORAI before testing.', why: age >= 65 ? 'Woman 65 or older.' : 'Postmenopausal woman under 65 with a fracture risk factor.' });
    }
    if (age >= 65) {
        add({ id: 'falls', group: 'bone', tier: 'do', title: 'Falls: exercise program if at risk', where: 'refer', src: ['uspstf-falls'], strength: 'USPSTF grade B',
            action: 'For community-dwelling adults 65 and older at increased risk of falls, recommend exercise interventions. Multifactorial interventions are an individual decision (grade C).', why: `Aged ${age}.` });
    }
    // ───────────────────────── Pregnancy and preconception ─────────────────────────
    if (couldConceive) {
        add({ id: 'folic', group: 'pregnancy', tier: 'do', title: 'Folic acid', where: 'today', src: ['uspstf-folic'], strength: 'USPSTF grade A', action: 'A daily supplement with 0.4 to 0.8 mg (400 to 800 mcg) of folic acid.', why: 'Plans to or could become pregnant.' });
    }
    if (pregnant) {
        const pg = (id, title, action, src, strength, tier = 'do', where = 'today') => add({ id, group: 'pregnancy', tier, title, action, where, strength, src: [src], why: 'Pregnant.' });
        pg('pg-rh', 'Blood type and antibody screen', 'Rh(D) typing and antibody testing at the first pregnancy visit. Repeat antibody testing at 24 to 28 weeks if Rh(D) negative and unsensitized.', 'uspstf-rh', 'USPSTF grade A');
        pg('pg-urine', 'Urine culture', 'Screen for asymptomatic bacteriuria with a urine culture.', 'uspstf-bacteriuria', 'USPSTF grade B');
        if (!has('diabetes'))
            pg('pg-gdm', 'Gestational diabetes screen', 'Screen at 24 weeks of gestation or later.', 'uspstf-gdm', 'USPSTF grade B', 'do', 'refer');
        const peRisk = [[has('htn'), 'chronic hypertension'], [has('diabetes'), 'pregestational diabetes'], [ckd, 'kidney disease']].filter(r => r[0]).map(r => r[1]);
        add({ id: 'pg-asa', group: 'pregnancy', tier: peRisk.length ? 'do' : 'discuss', title: 'Low-dose aspirin', where: 'either', strength: 'USPSTF grade B', src: ['uspstf-asa-preg'],
            action: 'Aspirin 81 mg daily after 12 weeks of gestation when at high risk for preeclampsia: prior preeclampsia, multifetal pregnancy, chronic hypertension, pregestational diabetes, kidney disease, or autoimmune disease (lupus, antiphospholipid syndrome). More than one moderate-risk factor can also qualify.',
            why: peRisk.length ? `Pregnant with a high-risk factor: ${peRisk.join(', ')}.` : 'Pregnant; applies if a high-risk factor is present.' });
        pg('pg-counsel', 'Counseling to prevent perinatal depression', 'If at increased risk of perinatal depression, provide or refer for counseling.', 'uspstf-perinatal', 'USPSTF grade B', 'discuss', 'refer');
    }
    // ───────────────────────── Not recommended, or evidence unclear ─────────────────────────
    const no = (id, group, title, action, src, tier = 'avoid') => add({ id, group, tier, title, action, where: 'either', src: [src], strength: tier === 'avoid' ? 'USPSTF grade D' : 'USPSTF: insufficient evidence', why: 'Applies to adults without symptoms.' });
    no('no-thyroid-ca', 'cancer', 'Thyroid cancer screening', 'USPSTF recommends against screening for thyroid cancer in adults without symptoms.', 'uspstf-thyroid-ca');
    no('no-pancreatic', 'cancer', 'Pancreatic cancer screening', 'USPSTF recommends against screening for pancreatic cancer in adults without symptoms.', 'uspstf-pancreatic');
    if (female)
        no('no-ovarian', 'cancer', 'Ovarian cancer screening', 'USPSTF recommends against screening for ovarian cancer in women without symptoms.', 'uspstf-ovarian');
    if (male)
        no('no-testicular', 'cancer', 'Testicular cancer screening', 'USPSTF recommends against screening for testicular cancer in adult men.', 'uspstf-testicular');
    no('no-carotid', 'cardio', 'Carotid artery ultrasound', 'USPSTF recommends against screening for carotid stenosis in the general adult population.', 'uspstf-carotid');
    no('no-ecg', 'cardio', 'Screening ECG', 'USPSTF recommends against a resting or exercise ECG to screen adults at low cardiovascular risk.', 'uspstf-ecg');
    if (!has('lung'))
        no('no-copd', 'cardio', 'COPD screening', 'USPSTF recommends against screening for COPD in adults without symptoms.', 'uspstf-copd');
    if (!pregnant)
        no('no-bacteriuria', 'infection', 'Urine culture without symptoms', 'USPSTF recommends against screening for asymptomatic bacteriuria in nonpregnant adults.', 'uspstf-bacteriuria');
    no('un-skin', 'cancer', 'Skin cancer check', 'Evidence is insufficient to weigh a clinician skin exam for screening.', 'uspstf-skin', 'unknown');
    no('un-oral', 'cancer', 'Oral cancer screening', 'Evidence is insufficient to weigh screening for oral cancer.', 'uspstf-oral', 'unknown');
    no('un-bladder', 'cancer', 'Bladder cancer screening', 'Evidence is insufficient to weigh screening for bladder cancer.', 'uspstf-bladder', 'unknown');
    if (!pregnant)
        no('un-vitd', 'bone', 'Vitamin D level', 'Evidence is insufficient to weigh screening for vitamin D deficiency.', 'uspstf-vitd', 'unknown');
    if (!pregnant)
        no('un-thyroid-fn', 'cardio', 'Thyroid function (TSH)', 'Evidence is insufficient to weigh screening for thyroid dysfunction.', 'uspstf-thyroid-fn', 'unknown');
    if (male)
        no('un-osteo-men', 'bone', 'Bone density test in men', 'Evidence is insufficient to weigh osteoporosis screening in men.', 'uspstf-osteo', 'unknown');
    no('un-suicide', 'behavior', 'Suicide risk screen', 'Evidence is insufficient to weigh screening for suicide risk in adults without symptoms. This does not apply to a patient presenting with a mental health complaint.', 'uspstf-depression', 'unknown');
    if (female && (age >= 65 || has('postmenoRisk')))
        no('no-vitd-supp', 'bone', 'Low-dose vitamin D and calcium for fracture prevention', 'USPSTF recommends against daily vitamin D of 400 IU or less with calcium of 1000 mg or less to prevent fractures in community-dwelling postmenopausal women.', 'uspstf-vitd-supp');
    if (age >= 65)
        no('un-anxiety', 'behavior', 'Anxiety screen at 65 and older', 'Evidence is insufficient to weigh anxiety screening in adults 65 and older.', 'uspstf-anxiety', 'unknown');
    if (age >= 50) {
        no('un-afib', 'cardio', 'Atrial fibrillation screening', 'Evidence is insufficient to weigh screening for atrial fibrillation in adults 50 and older.', 'uspstf-afib', 'unknown');
        no('un-hearing', 'bone', 'Hearing screen', 'Evidence is insufficient to weigh screening for hearing loss in adults 50 and older.', 'uspstf-hearing', 'unknown');
    }
    if (age >= 65) {
        no('un-vision', 'bone', 'Vision screen', 'Evidence is insufficient to weigh screening for impaired vision in adults 65 and older.', 'uspstf-vision', 'unknown');
        no('un-cognitive', 'behavior', 'Memory and thinking screen', 'Evidence is insufficient to weigh screening for cognitive impairment in community-dwelling adults 65 and older.', 'uspstf-cognitive', 'unknown');
    }
    if (pregnant) {
        // Routine cancer screening, lipid and statin decisions, diabetes maintenance intervals and bone health are written for
        // nonpregnant adults. In pregnancy they are left out rather than shown with wording no source supports.
        const keepGroups = ['pregnancy', 'vaccines', 'infection', 'behavior'];
        const keepIds = ['bp', 'cervical', 'dm-statin'];
        const kept = recs.filter(r => keepGroups.includes(r.group) || keepIds.includes(r.id) || (r.group !== 'bone' && (r.id.startsWith('no-') || r.id.startsWith('un-'))));
        return { recs: kept, scopeNote: 'Pregnant: this list covers pregnancy care, vaccines, infection screening and behavioral screening. Routine cancer screening, cholesterol and statin decisions, diabetes maintenance intervals and bone health are written for nonpregnant adults and are left out. Screening that was left out can be revisited after delivery. Monitoring of existing conditions (diabetes, kidney, liver or bowel disease) is not deferred: it continues in pregnancy on a pregnancy-specific plan with the prenatal team.' };
    }
    return { recs };
}
/** Plain-text list for the chart or discharge papers. Carries age and sex only, no identifiers. */
export function summaryText(p, recs, scopeNote) {
    const lines = [`Preventive care due by guideline: ${p.sex}, age ${p.age}${p.preg === 'pregnant' ? ', pregnant' : ''}. Confirm what has already been done.`];
    if (scopeNote)
        lines.push(scopeNote);
    for (const tier of ['do', 'discuss']) {
        const items = recs.filter(r => r.tier === tier);
        if (!items.length)
            continue;
        lines.push('', tier === 'do' ? 'RECOMMENDED' : 'TO DISCUSS');
        for (const g of PCS_GROUP_ORDER) {
            for (const r of items.filter(i => i.group === g))
                lines.push(`• ${r.title}: ${r.action} (${r.strength})`);
        }
    }
    const stops = recs.filter(isPatientStop);
    if (stops.length) {
        lines.push('', 'DO NOT GIVE, START OR SCREEN');
        for (const r of stops)
            lines.push(`• ${r.title}: ${r.action} (${r.strength})`);
    }
    return lines.join('\n');
}
/** An "avoid" that fired because of this patient (a live vaccine in pregnancy, PSA at 70+), as opposed to the standing list of screens nobody should get. */
export function isPatientStop(r) {
    return r.tier === 'avoid' && !r.id.startsWith('no-');
}
export function avoidLabel(r) {
    if (r.group === 'vaccines')
        return 'Do not give';
    if (r.id === 'aspirin' || r.id === 'dm-statin')
        return 'Do not start';
    return 'Do not screen';
}
