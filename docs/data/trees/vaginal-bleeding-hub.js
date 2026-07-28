// MedKitt - Vaginal Bleeding Hub
//
// EVIDENTIARY BASIS DISCLOSURE (FDA 21st Century Cures Act CDS exemption, Prong 4):
// Every recommendation node in this hub carries a citation array indexing
// VAGINAL_BLEEDING_HUB_CITATIONS below. Each reference is listed with issuing body or
// authors, journal, year, volume/pages, and a machine-readable identifier (DOI, PMID,
// or a resolvable URL) so a clinician can independently retrieve and review the basis
// for every recommendation shown. This hub is a triage/navigation aid; definitive
// diagnosis, dosing, and treatment remain the responsibility of the treating clinician
// and the consulting obstetrics/gynecology service.
//
// Primary basis by lane:
//   Stable nonpregnant AUB .......... ACOG CO 557 [1]; ACOG PB 128 [11]
//   Early pregnancy / ectopic / loss  ACEP Early Pregnancy 2017 [2]; NICE NG126 [3];
//                                     ACOG PB 193 [7]; ACOG PB 200 [8]
//   Adolescent heavy menstrual ...... ACOG CO 785 [4]
//   Postpartum / post-procedure ..... ACOG PB 183 [5]; AIM/NPMS hemorrhage bundle [12]
//   Bleeding >=20 weeks / previa .... RCOG Green-top 27a [6] (and Green-top 63)
//   Postmenopausal / malignancy ..... ACOG CO 734 [9] + 2026 ACOG update
//   Rh status and alloimmunization .. ACOG PB 181 [10]
//   Tranexamic acid in PPH .......... WOMAN trial [13]
//   Assault / forensic pathway ...... ACOG CO 777 [14]
//   Anticoagulant-associated bleed .. 2020 ACC bleeding ECDP [15]
//
// Citations last verified against source records: 2026-07-28 (Louis Litt CDS audit).
// Ref 2 was superseded (2012 -> 2017 ACEP policy). Ref 6 replaced an uncitable tertiary
// summary. Refs 7-15 added to source directives that previously carried no primary basis
// or rested on a wrong-instrument citation.
export const VAGINAL_BLEEDING_HUB_CRITICAL_ACTIONS = [
    { text: 'Hemodynamic instability or shock physiology from vaginal bleeding needs hemorrhage control posture, not routine outpatient AUB care', nodeId: 'vb-shock' },
    { text: 'Pregnancy test is mandatory in reproductive-age vaginal bleeding because ectopic can present with bleeding and minimal pain', nodeId: 'vb-start' },
    { text: 'Bleeding after 20 weeks, postpartum bleeding, and postmenopausal bleeding are separate high-risk lanes', nodeId: 'vb-exclusions' },
    { text: 'Do not perform digital cervical exam until placenta previa is excluded', nodeId: 'vb-late-pregnancy' },
];
export const VAGINAL_BLEEDING_HUB_NODES = [
    {
        id: 'vb-start',
        type: 'info',
        module: 1,
        title: 'Vaginal Bleeding Hub - Sick Check First',
        body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Ruptured ectopic pregnancy** \u2014 positive \u03B2-hCG + bleeding/shock.\n2. **Hemorrhagic shock from any source** \u2014 pads/hour, clots, shock index; resuscitate first.\n3. **Postpartum hemorrhage / retained products** \u2014 recent delivery, boggy uterus.\n4. **Late-pregnancy bleeding (placenta previa/abruption)** \u2014 do NOT do a digital/speculum exam until previa excluded.\n5. **Coagulopathy or gynecologic malignancy** \u2014 anticoagulants/bleeding disorder, or postmenopausal bleeding.\n\nOpen first:\n- [Hub Steps Summary](#/info/vb-steps)\n- [Hub Stop / Pitfalls](#/info/vb-stop)\n\n**First 60 seconds:**\n- Vitals, shock index, mental status, perfusion, syncope/presyncope.\n- Estimate bleeding: pads/hour, clots, soaked clothing/bedding, ongoing active bleeding.\n- Pregnancy test for reproductive potential. Do not rely on reported contraception, tubal ligation, lactation, or age alone.\n- LMP, gestational age if pregnant, postpartum status, fertility treatment, prior ectopic, anticoagulants, bleeding disorder history.\n- Pain, shoulder pain, fever, discharge, trauma/assault, tissue passage, postmenopausal status.\n- Pelvic exam when it changes care and patient consents; inspect for non-uterine sources.\n\nThe ED job is to separate hemorrhage, pregnancy-related emergencies, postpartum/late pregnancy bleeding, coagulopathy, malignancy-risk bleeding, and stable AUB.',
        citation: [1, 2, 3, 4, 5, 6, 7, 9],
        next: 'vb-exclusions',
        summary: 'Vitals, bleeding volume, pregnancy test, pain, postpartum/late pregnancy, anticoag/coagulopathy, and malignancy-risk lanes first.',
        safetyLevel: 'critical',
    },
    {
        id: 'vb-exclusions',
        type: 'question',
        module: 2,
        title: 'Time-Critical Exclusions - Pick the Best Fit',
        body: 'Choose the most dangerous lane first. You can return after the immediate action.',
        options: [
            { label: 'Hypotension, syncope, tachycardia, pallor, ongoing heavy bleeding, altered perfusion', description: 'Hemorrhage / unstable bleeding', next: 'vb-shock', urgency: 'critical' },
            { label: 'Positive pregnancy test or pregnancy possible with pain, bleeding, syncope, shoulder pain, tissue passage', description: 'Early pregnancy bleeding / ectopic / miscarriage', next: 'vb-early-pregnancy', urgency: 'critical' },
            { label: 'Known or suspected pregnancy >=20 weeks', description: 'Placenta/abruption/vasa/uterine rupture lane', next: 'vb-late-pregnancy', urgency: 'critical' },
            { label: 'Postpartum bleeding, recent delivery, miscarriage management, abortion, or uterine procedure', description: 'Postpartum/procedure hemorrhage or infection', next: 'vb-postpartum', urgency: 'critical' },
            { label: 'Adolescent heavy menstrual bleeding, easy bruising, epistaxis, family bleeding history', description: 'Bleeding disorder / severe adolescent AUB', next: 'vb-adolescent', urgency: 'urgent' },
            { label: 'Anticoagulant/antiplatelet use, liver disease, thrombocytopenia, chemotherapy, known coagulopathy', description: 'Medication/coagulopathy bleeding', next: 'vb-coagulopathy', urgency: 'critical' },
            { label: 'Postmenopausal bleeding or cancer risk', description: 'Malignancy-risk bleeding', next: 'vb-postmenopausal', urgency: 'urgent' },
            { label: 'Trauma, foreign body, sexual assault, laceration, retained product/tissue at os', description: 'Genital tract injury or assault pathway', next: 'vb-trauma-assault', urgency: 'critical' },
            { label: 'Stable nonpregnant reproductive-age bleeding', description: 'Abnormal uterine bleeding pathway', next: 'vb-aub' },
        ],
        citation: [1, 2, 3, 4, 5, 6, 9, 14, 15],
        summary: 'Unstable hemorrhage, pregnancy-related bleeding, postpartum/late pregnancy, coagulopathy, adolescent, postmenopausal, trauma, and stable AUB are separate lanes.',
        safetyLevel: 'critical',
    },
    {
        id: 'vb-shock',
        type: 'result',
        module: 2,
        title: 'Unstable Bleeding / Hemorrhage',
        body: 'Open [Massive Transfusion](#/tree/massive-transfusion) when hemorrhagic shock is possible.\n\n**Immediate actions:** two large-bore IVs or IO, type and cross, CBC/coags/fibrinogen if severe or obstetric, pregnancy test, bedside US when skilled, pelvic exam/speculum if it will identify a controllable source, OB/GYN early, TXA when postpartum hemorrhage or institutional hemorrhage protocol supports it, and blood products for shock rather than crystalloid-heavy resuscitation.\n\nDo not delay resuscitation for complete diagnostic sorting.',
        recommendation: 'Treat unstable vaginal bleeding as hemorrhage first, diagnosis second.',
        citation: [1, 5, 12, 13],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'vb-early-pregnancy',
        type: 'result',
        module: 2,
        title: 'Early Pregnancy Bleeding / Ectopic / Miscarriage',
        body: 'Open [First Trimester Emergencies](#/tree/first-trimester).\n\n**Core workup:** quantitative beta-hCG, transvaginal ultrasound, CBC, Rh status, type and screen when moderate bleeding or pain, OB/GYN for unstable, ectopic suspicion, concerning free fluid, or pregnancy of unknown location with high-risk features.\n\n**Critical rule:** a pregnancy of unknown location is not a benign diagnosis. Ectopic precautions and follow-up must be explicit if discharge is considered.',
        recommendation: 'Bleeding with positive pregnancy test requires ectopic-safe documentation and follow-up.',
        citation: [2, 3, 7, 8, 10],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'vb-late-pregnancy',
        type: 'result',
        module: 2,
        title: 'Bleeding at >=20 Weeks Pregnancy',
        body: 'Open [Pregnancy Trauma](#/tree/pregnancy-trauma) when trauma is involved, and involve OB urgently.\n\n**Do not perform digital cervical exam until placenta previa is excluded.** Priorities are maternal stabilization, fetal assessment when viable, Rh status, type and cross, CBC/coags/fibrinogen if significant bleeding, ultrasound for placental location, and OB/OR readiness.\n\nConsider placenta previa, placental abruption, vasa previa, uterine rupture, preterm labor, cervical lesions, and trauma.',
        recommendation: 'Late-pregnancy bleeding is OB-led after maternal stabilization; avoid digital exam until previa excluded.',
        citation: [5, 6, 10],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'vb-postpartum',
        type: 'result',
        module: 2,
        title: 'Postpartum / Post-Procedure Bleeding',
        body: 'Recent delivery, miscarriage management, abortion, D&C, IUD insertion/removal, or gynecologic procedure changes the risk.\n\n**Think:** uterine atony, retained products, laceration, uterine rupture/perforation, endometritis/sepsis, coagulopathy, secondary postpartum hemorrhage.\n\n**Actions:** resuscitate, uterine massage if postpartum atony suspected, OB/GYN early, type and cross, CBC/coags/fibrinogen when significant, pelvic ultrasound for retained products, CT if procedural/surgical injury is plausible, antibiotics if infection/sepsis is present.',
        recommendation: 'Postpartum or procedural bleeding deserves early OB/GYN involvement and hemorrhage/infection posture.',
        citation: [5, 8, 12],
        safetyLevel: 'critical',
        confidence: 'recommended',
    },
    {
        id: 'vb-adolescent',
        type: 'result',
        module: 2,
        title: 'Adolescent Heavy Menstrual Bleeding',
        body: 'ACOG recommends considering an underlying bleeding disorder in adolescents with heavy menstrual bleeding, especially anemia, flooding, bleeding through products quickly, easy bruising, epistaxis, surgical/dental bleeding, or family history.\n\n**ED priorities:** pregnancy test, CBC/ferritin when appropriate, hemodynamics, bleeding severity, medication safety, and gynecology/hematology involvement for severe anemia, unstable bleeding, suspected bleeding disorder, or need for high-dose hormonal therapy.',
        recommendation: 'Heavy adolescent bleeding is a bleeding-disorder screen, not only a period complaint.',
        citation: [1, 4],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'vb-coagulopathy',
        type: 'result',
        module: 2,
        title: 'Anticoagulant / Coagulopathy Bleeding',
        body: 'Identify DOAC/warfarin/heparin/antiplatelet exposure, last dose, renal/liver disease, thrombocytopenia, cancer therapy, inherited bleeding disorder, and anemia symptoms.\n\nOpen [Anticoagulation Reversal](#/tree/anticoag-reversal) when bleeding is major, unstable, or reversal is being considered.\n\n**Workup:** CBC, type and screen, pregnancy test, PT/INR/aPTT when relevant, fibrinogen in severe obstetric bleeding, renal/liver function, and medication-specific reversal pathway.',
        recommendation: 'Major vaginal bleeding on anticoagulants is major bleeding until proven otherwise.',
        citation: [1, 5, 15],
        safetyLevel: 'critical',
        confidence: 'recommended',
    },
    {
        id: 'vb-postmenopausal',
        type: 'result',
        module: 2,
        title: 'Postmenopausal Bleeding / Malignancy-Risk Lane',
        body: 'Postmenopausal bleeding requires outpatient gynecology evaluation even if ED bleeding has stopped. The ED role is to stabilize, exclude severe anemia/hemorrhage, identify obvious non-uterine sources, and arrange timely follow-up.\n\n**Red flags for urgent escalation:** heavy ongoing bleeding, symptomatic anemia, pelvic mass, anticoagulation, infection, pain, or unreliable follow-up.',
        recommendation: 'Do not label postmenopausal bleeding benign without gynecology follow-up.',
        citation: [9, 15],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'vb-trauma-assault',
        type: 'result',
        module: 2,
        title: 'Trauma / Laceration / Foreign Body / Assault',
        body: 'Open [DFSA / SANE Workup](#/tree/dfsa-workup) when sexual assault or drug-facilitated assault is possible.\n\n**Actions:** trauma-informed consent, stabilize bleeding, inspect for laceration/foreign body only with consent and appropriate support, forensic/SANE pathway, STI/pregnancy prophylaxis when indicated, mandatory reporting rules for minors/vulnerable adults, and surgical/OB/GYN help for deep laceration, expanding hematoma, or uncontrolled bleeding.',
        recommendation: 'Use trauma-informed care and forensic preservation when assault is possible.',
        citation: [14],
        safetyLevel: 'critical',
        confidence: 'recommended',
    },
    {
        id: 'vb-aub',
        type: 'result',
        module: 2,
        title: 'Stable Nonpregnant Abnormal Uterine Bleeding',
        body: 'Open [Abnormal Uterine Bleeding](#/tree/aub).\n\n**Stable AUB priorities:** pregnancy excluded, anemia assessed, bleeding severity estimated, contraindications to estrogen/progestin/TXA considered, malignancy risk and follow-up arranged.\n\nACOG frames acute AUB treatment around hemodynamic status, medical therapy when stable, and procedural/surgical management when unstable or refractory.',
        recommendation: 'Stable nonpregnant AUB can usually be medically managed, but pregnancy and instability must be excluded first.',
        citation: [1, 11],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'vb-rescue',
        type: 'info',
        module: 3,
        title: 'Rescue / Initial Bundle + Reassess',
        body: '**Default ED bundle:**\n- Pregnancy test, vitals trend, orthostatics only if safe.\n- CBC; type and screen/cross when moderate/heavy bleeding, pregnancy, anemia symptoms, or instability.\n- Rh status when pregnant or pregnancy status uncertain by local protocol.\n- Coags/fibrinogen when severe bleeding, anticoagulants, liver disease, postpartum/obstetric bleeding, or suspected coagulopathy.\n- Pelvic exam/speculum when it changes care and patient consents: source, laceration, products/tissue, cervix, active bleeding.\n- Ultrasound by pregnancy status and suspected source.\n\nReassess bleeding rate, vitals, pain, syncope, Hgb trend when needed, and response to therapy.',
        citation: [1, 2, 3, 5, 10],
        next: 'vb-reassess',
        summary: 'Pregnancy test, bleeding quantification, CBC/type and screen, targeted coags, pelvic exam when useful, and ultrasound by lane.',
        safetyLevel: 'warning',
    },
    {
        id: 'vb-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess After Initial Bundle',
        body: 'Recheck vitals, ongoing bleeding, pain, dizziness/syncope, Hgb risk, and imaging/workup results.',
        options: [
            { label: 'Unstable, ongoing heavy bleeding, ectopic/late pregnancy/postpartum concern, severe anemia', description: 'Return to time-critical exclusions', next: 'vb-exclusions', urgency: 'critical' },
            { label: 'Stable but imaging, serial exam, Hgb trend, or specialty plan needed', description: 'Use imaging/workup strategy', next: 'vb-imaging' },
            { label: 'Stable, pregnancy risk addressed, bleeding controlled, follow-up reliable', description: 'Disposition checklist', next: 'vb-disposition' },
        ],
        citation: [1, 2, 3],
        summary: 'Ongoing bleeding or pregnancy-related concern should reset the pathway to high risk.',
    },
    {
        id: 'vb-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging / Workup Strategy',
        body: '**Positive pregnancy test:** transvaginal ultrasound for IUP/ectopic/free fluid, with quantitative beta-hCG interpreted carefully.\n\n**Pregnancy >=20 weeks:** ultrasound for placental location/fetal status, OB-led pathway; avoid digital cervical exam until previa excluded.\n\n**Nonpregnant AUB:** ultrasound is helpful for structural causes when ED result changes disposition or urgent follow-up; many stable cases can be arranged outpatient.\n\n**Postpartum/procedural:** ultrasound for retained products; CT when perforation, abscess, hematoma, or surgical injury is plausible.',
        citation: [1, 2, 3, 5, 6, 7, 11],
        next: 'vb-disposition',
        summary: 'Image by pregnancy status, bleeding severity, and whether the result changes urgent management.',
        safetyLevel: 'warning',
    },
    {
        id: 'vb-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Disposition depends on physiology, pregnancy/postpartum status, bleeding control, anemia symptoms, diagnosis, and follow-up.',
        options: [
            { label: 'Unstable, severe anemia/symptoms, ectopic concern, late pregnancy, postpartum hemorrhage, uncontrolled bleeding, coagulopathy', description: 'Admit/consult/transfer', next: 'vb-dispo-admit', urgency: 'critical' },
            { label: 'Stable but urgent gyn follow-up, repeat beta-hCG/US, Hgb trend, or medication plan needed', description: 'Urgent follow-up / observation', next: 'vb-dispo-urgent' },
            { label: 'Bleeding controlled, low-risk diagnosis, pregnancy plan explicit, reliable follow-up', description: 'Discharge checklist', next: 'vb-dispo-discharge' },
        ],
        citation: [1, 2, 3, 4, 5],
        summary: 'Admit unstable or high-risk pregnancy/postpartum/coagulopathy bleeding. Discharge only controlled, explained, and followed.',
    },
    {
        id: 'vb-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit / Consult / Transfer',
        body: 'Admit, transfer, or urgently consult for hemorrhagic shock, ongoing heavy bleeding, severe symptomatic anemia, ectopic concern, pregnancy >=20 weeks bleeding, postpartum hemorrhage, suspected retained products with infection/hemorrhage, major anticoagulant/coagulopathy bleeding, unstable adolescent bleeding, or inability to ensure follow-up.',
        recommendation: 'High-risk vaginal bleeding needs specialty and hemorrhage support, not routine discharge.',
        citation: [1, 2, 4, 5, 6, 7, 15],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'vb-dispo-urgent',
        type: 'result',
        module: 5,
        title: 'Urgent Follow-Up / Observation',
        body: 'Use observation or urgent follow-up for pregnancy of unknown location, improving but still significant bleeding, anemia without instability, new heavy menstrual bleeding needing medication initiation, postmenopausal bleeding, or coagulopathy medication adjustment.\n\nGive exact repeat beta-hCG/US timing when early pregnancy is unresolved.',
        recommendation: 'The follow-up plan is part of the treatment, especially for pregnancy of unknown location.',
        citation: [1, 2, 3, 7, 8, 9],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'vb-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge Checklist',
        body: 'Discharge only when vitals are stable, bleeding is controlled, pregnancy status and ectopic risk have a written plan, Hgb risk is acceptable, pain is controlled, no late-pregnancy/postpartum/coagulopathy danger remains, and follow-up is realistic.\n\n**Return now for:** soaking pads rapidly, syncope, worsening pain, shoulder pain, dizziness, fever, pregnancy symptoms with bleeding, passing large clots, shortness of breath, chest pain, or inability to obtain follow-up.',
        recommendation: 'Document pregnancy test result, bleeding control, anemia assessment, and follow-up timing.',
        citation: [1, 2, 3, 7],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
];
export const VAGINAL_BLEEDING_HUB_NODE_COUNT = VAGINAL_BLEEDING_HUB_NODES.length;
export const VAGINAL_BLEEDING_HUB_MODULE_LABELS = [
    'Sick Check',
    'Time-Critical Exclusions',
    'Rescue / Reassess',
    'Imaging',
    'Disposition',
];
export const VAGINAL_BLEEDING_HUB_CITATIONS = [
    { num: 1, text: 'ACOG Committee on Gynecologic Practice. Committee Opinion No. 557: Management of Acute Abnormal Uterine Bleeding in Nonpregnant Reproductive-Aged Women. Obstet Gynecol. 2013 Apr;121(4):891-896. Reaffirmed 2019. doi:10.1097/01.AOG.0000428646.67925.9a. PMID 23635706' },
    { num: 2, text: 'ACEP Clinical Policies Subcommittee on Early Pregnancy (Hahn SA, Promes SB, Brown MD, et al). Clinical Policy: Critical Issues in the Initial Evaluation and Management of Patients Presenting to the Emergency Department in Early Pregnancy. Ann Emerg Med. 2017 Feb;69(2):241-250.e20. doi:10.1016/j.annemergmed.2016.11.002. PMID 28126120. Correction: Ann Emerg Med. 2017;70(5):758 (PMID 28395924). SUPERSEDED - this replaces the prior 2012 policy (Ann Emerg Med. 2012;60(3):381-390), which was the version formerly cited here.' },
    { num: 3, text: 'NICE Guideline NG126. Ectopic pregnancy and miscarriage: diagnosis and initial management. Published 17 April 2019; last updated 17 June 2026 (anti-D immunoglobulin prophylaxis). https://www.nice.org.uk/guidance/ng126' },
    { num: 4, text: 'ACOG Committee on Adolescent Health Care. Committee Opinion No. 785: Screening and Management of Bleeding Disorders in Adolescents With Heavy Menstrual Bleeding. Obstet Gynecol. 2019 Sep;134(3):e71-e83. doi:10.1097/AOG.0000000000003411. PMID 31441825. Correction: Obstet Gynecol. 2023;141(1):228 (PMID 36701629).' },
    { num: 5, text: 'ACOG Committee on Practice Bulletins-Obstetrics. Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017 Oct;130(4):e168-e186. doi:10.1097/AOG.0000000000002351. PMID 28937571. Focused update: ACOG Clinical Practice Update: Use of Nonsurgical Hemorrhage-Control Devices for Postpartum Hemorrhage Management. Obstet Gynecol. 2025;146(4):569-571. doi:10.1097/AOG.0000000000006024.' },
    { num: 6, text: 'Jauniaux E, Alfirevic Z, Bhide AG, et al; Royal College of Obstetricians and Gynaecologists. Placenta Praevia and Placenta Accreta: Diagnosis and Management: Green-top Guideline No. 27a. BJOG. 2019 Jan;126(1):e1-e48. doi:10.1111/1471-0528.15306. PMID 30260097. See also RCOG Green-top Guideline No. 63, Antepartum Haemorrhage, November 2011 (avoid vaginal/rectal examination in known or suspected placenta praevia). https://www.rcog.org.uk/media/pwdi1tef/gtg_63.pdf' },
    { num: 7, text: 'ACOG Committee on Practice Bulletins-Gynecology. Practice Bulletin No. 193: Tubal Ectopic Pregnancy. Obstet Gynecol. 2018 Mar;131(3):e91-e103. doi:10.1097/AOG.0000000000002560. PMID 29470343. Correction: PMID 31022116.' },
    { num: 8, text: 'ACOG Committee on Practice Bulletins-Gynecology. Practice Bulletin No. 200: Early Pregnancy Loss. Obstet Gynecol. 2018 Nov;132(5):e197-e207. doi:10.1097/AOG.0000000000002899. PMID 30157093.' },
    { num: 9, text: 'ACOG Committee on Gynecologic Practice. Committee Opinion No. 734: The Role of Transvaginal Ultrasonography in Evaluating the Endometrium of Women With Postmenopausal Bleeding. Obstet Gynecol. 2018 May;131(5):e124-e129. doi:10.1097/AOG.0000000000002631. PMID 29683909. SUPERSEDED IN PART - see ACOG Clinical Practice Update: Updated Guidance Regarding the Role of Transvaginal Ultrasonography in Evaluating the Endometrium of Individuals With Postmenopausal Bleeding. Obstet Gynecol. Published online 2026 Apr 16. doi:10.1097/AOG.0000000000006275. PMID 41990335 (transvaginal ultrasonography alone is no longer sufficient initial evaluation for most patients).' },
    { num: 10, text: 'ACOG Committee on Practice Bulletins-Obstetrics. Practice Bulletin No. 181: Prevention of Rh D Alloimmunization. Obstet Gynecol. 2017 Aug;130(2):e57-e70. Reaffirmed 2021. doi:10.1097/AOG.0000000000002232. PMID 28742673.' },
    { num: 11, text: 'ACOG Committee on Practice Bulletins-Gynecology. Practice Bulletin No. 128: Diagnosis of Abnormal Uterine Bleeding in Reproductive-Aged Women. Obstet Gynecol. 2012 Jul;120(1):197-206. Reaffirmed 2024. doi:10.1097/AOG.0b013e318262e320. PMID 22914421.' },
    { num: 12, text: 'Main EK, Goffman D, Scavone BM, et al; National Partnership for Maternal Safety, Council on Patient Safety in Women\u2019s Health Care. Consensus Bundle on Obstetric Hemorrhage. Obstet Gynecol. 2015 Jul;126(1):155-162. doi:10.1097/AOG.0000000000000869. PMID 26241269. Erratum: PMID 31743213.' },
    { num: 13, text: 'WOMAN Trial Collaborators. Effect of early tranexamic acid administration on mortality, hysterectomy, and other morbidities in women with post-partum haemorrhage (WOMAN): an international, randomised, double-blind, placebo-controlled trial. Lancet. 2017 May 27;389(10084):2105-2116. doi:10.1016/S0140-6736(17)30638-4. PMID 28456509. PMCID PMC5446563.' },
    { num: 14, text: 'ACOG Committee on Health Care for Underserved Women. Committee Opinion No. 777: Sexual Assault. Obstet Gynecol. 2019 Apr;133(4):e296-e302. doi:10.1097/AOG.0000000000003178. PMID 30913202.' },
    { num: 15, text: 'Tomaselli GF, Mahaffey KW, Cuker A, et al. 2020 ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants. J Am Coll Cardiol. 2020 Aug 4;76(5):594-622. doi:10.1016/j.jacc.2020.04.053. PMID 32680646. Correction: J Am Coll Cardiol. 2021;77(21):2760 (PMID 34045036).' },
];
