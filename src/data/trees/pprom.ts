// MedKitt - Possible Rupture of Membranes / PPROM
// ED diagnostic pathway: emergency triage -> sterile speculum examination ->
// targeted fluid testing -> gestational-age and OB disposition.
// This is a diagnostic aid. Delivery and PPROM management remain OB/MFM-led.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PPROM_CRITICAL_ACTIONS = [
  { text: 'Maternal instability, heavy bleeding, cord prolapse, nonreassuring fetal status, suspected infection, or imminent birth outranks ROM testing', nodeId: 'pprom-emergency' },
  { text: 'Use a sterile speculum examination first; avoid digital cervical examination unless delivery is imminent or OB directs it', nodeId: 'pprom-speculum' },
  { text: 'Frank pooling of fluid from the cervical os supports a clinical diagnosis; no additional ROM test is required when pooling is clearly seen', nodeId: 'pprom-confirmed' },
  { text: 'At Dell Seton, the local AmniSure/PAMG-1 workflow is the order named Rupture of Fetal Membranes', nodeId: 'pprom-confirmation-tests' },
  { text: 'A negative test does not overrule ongoing high clinical suspicion; reassess sampling and involve OB/MFM', nodeId: 'pprom-reassess' },
];

export const PPROM_NODES: DecisionNode[] = [
  {
    id: 'pprom-start',
    type: 'info',
    module: 1,
    title: 'Possible Rupture of Membranes',
    body: `**Prelabor rupture of membranes (PROM)** means rupture of the fetal membranes before the onset of labor. **Preterm PROM (PPROM)** means PROM before 37+0 weeks.

In the ED, first decide whether the mother or fetus needs immediate action. If stable, use the history and a **sterile speculum examination** to look for pooling of fluid, then use targeted testing when the exam is equivocal.

[PROM Steps](#/info/pprom-steps)  |  [Ferning Photo](#/info/pprom-ferning)  |  [Dell Seton AmniSure](#/info/pprom-amnisure)  |  [Do NOT](#/info/pprom-stop)`,
    citation: [1, 2, 3],
    next: 'pprom-sick-check',
    summary: 'Triage immediate maternal/fetal threats, then sterile speculum exam, targeted fluid testing, and OB disposition.',
    safetyLevel: 'critical',
    skippable: true,
  },

  {
    id: 'pprom-sick-check',
    type: 'question',
    module: 1,
    title: 'Immediate Maternal or Fetal Threat?',
    body: 'Look for **maternal instability, heavy bleeding or suspected abruption, umbilical cord prolapse, nonreassuring fetal status, suspected intra-amniotic infection, active labor, or imminent delivery**. Do not delay an emergency response to complete a ROM test.',
    citation: [1, 6],
    options: [
      {
        label: 'Yes - threat present or delivery may be imminent',
        description: 'Activate OB/L&D and neonatal support; treat the emergency first',
        next: 'pprom-emergency',
        urgency: 'critical',
      },
      {
        label: 'No - stable and no immediate delivery concern',
        description: 'Proceed with focused history and sterile speculum examination',
        next: 'pprom-history',
        urgency: 'urgent',
      },
    ],
    summary: 'Threats to mother, fetus, or cord take priority over confirming membrane status.',
    safetyLevel: 'critical',
  },

  {
    id: 'pprom-emergency',
    type: 'result',
    module: 1,
    title: 'Emergency OB Response',
    body: `Activate **OB/L&D now** and add neonatal/MFM support based on gestational age and local capability. Start continuous fetal monitoring when feasible, obtain IV access, and resuscitate the mother.

**Do not delay delivery, cord-prolapse treatment, hemorrhage control, or transfer for AmniSure, ferning, nitrazine, or ultrasound.** Avoid a digital cervical examination. If cord prolapse is present, relieve pressure on the cord and prepare immediate obstetric delivery. Suspected intra-amniotic infection, abruption, fetal compromise, active labor, or imminent birth requires an OB delivery plan rather than a diagnostic-only pathway. [1][6]`,
    recommendation: 'Treat the time-critical obstetric problem first. Confirm ROM only if it will not delay definitive care.',
    confidence: 'definitive',
    citation: [1, 6],
    next: 'pprom-handoff',
    summary: 'Call OB/L&D, monitor and resuscitate, and do not delay definitive care for ROM testing.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 2: HISTORY AND STERILE SPECULUM EXAMINATION
  // =====================================================================

  {
    id: 'pprom-history',
    type: 'info',
    module: 2,
    title: 'Focused History',
    body: `Ask:

• Gestational age, due date, gravida/para, and prenatal complications
• Gush versus intermittent trickle; exact onset and continued leakage
• Fluid color, odor, and amount; clear versus green/brown or blood-tinged
• Contractions, pelvic pressure, back pain, or urge to push
• Vaginal bleeding, fever/chills, uterine tenderness, or feeling unwell
• Fetal movement and any prior nonreassuring fetal assessment
• Urinary incontinence, dysuria, increased discharge, vaginitis symptoms, and recent intercourse/semen exposure
• Group B streptococcus status, cerclage, prior PPROM, uterine surgery, and recent cervical examination

PROM is a clinical diagnosis. The history changes the pretest probability, but a report of leaking fluid alone does not establish ROM. [1][2]`,
    citation: [1, 2],
    next: 'pprom-speculum',
    summary: 'Characterize the leak, assess infection/bleeding/labor, and capture gestational age and pregnancy risk factors.',
    skippable: true,
  },

  {
    id: 'pprom-speculum',
    type: 'info',
    module: 2,
    title: 'Sterile Speculum Examination',
    body: `**Avoid a digital cervical examination** when ROM is suspected unless delivery is imminent or OB specifically directs it. Digital examination increases ascending-infection exposure and can shorten latency in PPROM. [1][3]

Use a sterile speculum and adequate lighting:

1. Inspect the vagina and cervix for blood, purulence, meconium, lesions, cervicitis, and a visible cord.
2. Look for **clear fluid pooling in the posterior fornix or leaking through the cervical os**. Ask the patient to cough or bear down if safe.
3. If fluid is present but the diagnosis is not visually clear, collect the posterior-fornix/pooling-site sample for ferning and/or the local biochemical test.
4. Document cervical appearance and dilation only when clinically indicated. If significant bleeding or suspected placenta previa is present, coordinate the examination with OB.

If frank pooling is seen, move to the clinical-diagnosis branch. [1][3]`,
    citation: [1, 3],
    next: 'pprom-pooling',
    summary: 'Sterile speculum: look for pooling, cord, blood, and infection; avoid digital examination.',
    safetyLevel: 'warning',
  },

  {
    id: 'pprom-pooling',
    type: 'question',
    module: 2,
    title: 'What Did the Speculum Examination Show?',
    body: 'Choose the finding that best matches the examination. If the exam is incomplete or unsafe, choose the equivocal pathway and involve OB.',
    options: [
      {
        label: 'Frank pooling or fluid visibly passing through the cervical os',
        description: 'Clinical diagnosis of ruptured membranes',
        next: 'pprom-confirmed',
        urgency: 'urgent',
      },
      {
        label: 'No pooling, but ongoing leakage or meaningful clinical suspicion',
        description: 'Use targeted fluid testing; AmniSure is the Dell Seton order',
        next: 'pprom-confirmation-tests',
        urgency: 'urgent',
      },
      {
        label: 'No pooling and low clinical suspicion',
        description: 'ROM is not established; evaluate alternate sources of wetness',
        next: 'pprom-not-confirmed',
      },
    ],
    summary: 'Pooling establishes the clinical diagnosis; no pooling requires context-sensitive testing or reassessment.',
  },

  {
    id: 'pprom-confirmed',
    type: 'result',
    module: 3,
    title: 'ROM Confirmed Clinically',
    body: `Visible pooling of amniotic fluid or fluid passing through the cervical os supports a **clinical diagnosis of ROM**. When pooling is clearly observed, NICE recommends no additional diagnostic test before initiating care consistent with PPROM. [3]

Do not add a digital examination simply to document dilation. Continue maternal and fetal assessment, record the time and character of leakage, and move to gestational-age and OB disposition planning.`,
    recommendation: 'Treat as ruptured membranes and obtain an OB/L&D plan. No additional ROM test is required when frank pooling is clearly seen.',
    confidence: 'definitive',
    citation: [1, 3],
    next: 'pprom-gestation',
    summary: 'Frank pooling is a clinical diagnosis; proceed to gestational-age routing and OB disposition.',
  },

  // =====================================================================
  // MODULE 3: CONFIRMATION TESTING
  // =====================================================================

  {
    id: 'pprom-confirmation-tests',
    type: 'info',
    module: 3,
    title: 'Equivocal Examination: Order the Right Test',
    body: `**Dell Seton workflow:** order **Rupture of Fetal Membranes** for the AmniSure/PAMG-1 test when the sterile speculum examination does not establish ROM.

Use the test as an adjunct to the history and examination. A positive PAMG-1 result supports ROM, but it does not assess fetal status, infection, abruption, or labor. A negative result lowers the likelihood but does not overrule persistent high suspicion or a poorly collected sample. [1][2][4]

**Ferning:** if a clean sample is available, allow the slide to air-dry and inspect for arborization. [Ferning photo and technique](#/info/pprom-ferning)

**Nitrazine:** may be an adjunct where used locally, but blood, semen, urine, cervical mucus, vaginitis, and alkaline antiseptics can produce misleading results. Ultrasound showing low fluid supports the diagnosis; normal fluid does not exclude a small or intermittent leak. Do not use fetal fibronectin as a stand-alone test to diagnose ROM. [1][2][4]`,
    citation: [1, 2, 4],
    next: 'pprom-test-result',
    summary: 'At Dell Seton, use Rupture of Fetal Membranes for AmniSure/PAMG-1 when pooling is absent or equivocal.',
    safetyLevel: 'warning',
  },

  {
    id: 'pprom-test-result',
    type: 'question',
    module: 3,
    title: 'Fluid Test Result and Clinical Fit',
    body: 'Interpret the result alongside the speculum examination, history, gestational age, and maternal/fetal status.',
    options: [
      {
        label: 'AmniSure/PAMG-1 positive or convincing ferning',
        description: 'ROM is supported; proceed to OB disposition',
        next: 'pprom-confirmed-test',
        urgency: 'urgent',
      },
      {
        label: 'Negative testing and low ongoing suspicion',
        description: 'ROM is not established at this encounter',
        next: 'pprom-not-confirmed',
      },
      {
        label: 'Negative or discordant test, but ongoing leakage or high suspicion',
        description: 'Recheck sampling and involve OB/MFM rather than dismissing ROM',
        next: 'pprom-reassess',
        urgency: 'urgent',
      },
    ],
    summary: 'A test result must fit the clinical picture; discordance is a reason to reassess, not to anchor.',
  },

  {
    id: 'pprom-confirmed-test',
    type: 'result',
    module: 3,
    title: 'ROM Supported by Fluid Testing',
    body: `A positive AmniSure/PAMG-1 or convincing arborization supports the presence of amniotic fluid in the vaginal sample. PAMG-1 has generally performed better than nitrazine or ferning in diagnostic studies, but reported accuracy varies by population and reference standard. [2][4]

Correlate the result with the examination and do not treat a positive result as a diagnosis of infection or fetal compromise. Begin OB/L&D disposition planning, continue fetal and maternal assessment, and do not perform repeated digital examinations.`,
    recommendation: 'Treat ROM as supported and obtain an OB/L&D plan. The test confirms membrane status, not the absence of other obstetric emergencies.',
    confidence: 'recommended',
    citation: [1, 2, 4],
    next: 'pprom-gestation',
    summary: 'Positive AmniSure or convincing ferning supports ROM; continue full maternal/fetal assessment.',
  },

  {
    id: 'pprom-reassess',
    type: 'info',
    module: 3,
    title: 'High Suspicion Despite a Negative or Discordant Test',
    body: `Do not close the case on a negative test when the history remains convincing or the sample may have been scant or contaminated.

• Recheck the timeline and ongoing leakage.
• Review how and where the specimen was collected; a dry or poorly sampled swab can be falsely negative.
• Repeat targeted testing or obtain OB/MFM input according to local protocol.
• Use ultrasound as supportive information, not as a stand-alone rule-out test.
• If the diagnosis remains consequential and unresolved, specialist-directed dye testing is rarely considered; it is not a routine ED test.

Avoid repeated digital examinations while the diagnosis is being clarified. [1][3][4]`,
    citation: [1, 3, 4],
    next: 'pprom-handoff',
    summary: 'Persistent high suspicion overrides false reassurance from a single negative or poorly collected test.',
    safetyLevel: 'warning',
  },

  {
    id: 'pprom-not-confirmed',
    type: 'result',
    module: 3,
    title: 'ROM Not Established at This Encounter',
    body: `No pooling and negative or low-concern testing do not establish ROM at this encounter. Consider urinary leakage, physiologic leukorrhea, cervical mucus, semen, vaginitis/cervicitis, or other vaginal discharge. See [Differential and Test Pitfalls](#/info/pprom-differential).

If leakage continues, the history remains convincing, or gestational age is preterm, obtain an OB plan for observation, repeat examination/testing, or follow-up. Do not discharge solely because one test is negative when clinical suspicion remains high. Give explicit return precautions for continued leakage, fever, bleeding, contractions, decreased fetal movement, or worsening pain.`,
    recommendation: 'ROM is not confirmed, but follow-up must match the residual clinical suspicion and gestational age.',
    confidence: 'consider',
    citation: [1, 2, 3, 4],
    next: 'pprom-handoff',
    summary: 'A negative evaluation lowers likelihood but does not excuse follow-up when symptoms or gestational risk persist.',
  },

  // =====================================================================
  // MODULE 4: GESTATIONAL AGE AND DISPOSITION
  // =====================================================================

  {
    id: 'pprom-gestation',
    type: 'question',
    module: 4,
    title: 'Gestational-Age Routing',
    body: 'Use the best documented gestational age and the patient\'s maternal/fetal condition. If gestational age is uncertain, treat the uncertainty as clinically important and involve OB/MFM.',
    options: [
      {
        label: '37+0 weeks or later',
        description: 'Term PROM: move to OB/L&D delivery planning',
        next: 'pprom-term',
        urgency: 'urgent',
      },
      {
        label: 'Before 37+0 weeks and within the local neonatal-care pathway',
        description: 'PPROM: OB/MFM admission or transfer to appropriate capability',
        next: 'pprom-preterm',
        urgency: 'urgent',
      },
      {
        label: 'Previable/periviable, or gestational age is uncertain',
        description: 'Urgent individualized OB/MFM and neonatal counseling',
        next: 'pprom-previable',
        urgency: 'critical',
      },
    ],
    citation: [1, 5, 6],
    summary: 'Term, preterm, and previable/periviable ROM follow different OB pathways; gestational age drives disposition.',
  },

  {
    id: 'pprom-term',
    type: 'result',
    module: 4,
    title: 'Term PROM: OB/L&D Plan',
    body: `Confirmed ROM at or beyond 37+0 weeks requires an **OB/L&D plan**, including timing and mode of delivery, GBS status, fetal status, and infection assessment. Coordinate directly with the receiving OB team; do not treat a stable ED appearance or a positive test as a reason to bypass L&D planning.

Reassess for fever, uterine tenderness, fetal tachycardia, purulent fluid, bleeding, contractions, or nonreassuring fetal status. Those findings change the urgency and may require delivery rather than routine transfer.`,
    recommendation: 'Contact OB/L&D for term PROM management and disposition. Continue maternal and fetal monitoring while the plan is made.',
    confidence: 'recommended',
    citation: [1, 2],
    next: 'pprom-handoff',
    summary: 'Term PROM needs an OB/L&D delivery plan with GBS, infection, contractions, bleeding, and fetal-status review.',
  },

  {
    id: 'pprom-preterm',
    type: 'result',
    module: 4,
    title: 'PPROM: OB/MFM and Appropriate Capability',
    body: `Confirmed PPROM before 37+0 weeks requires **OB/MFM involvement and admission or transfer to a facility with the needed maternal and neonatal capability**. Gestational age, fetal status, maternal status, infection, labor, and local protocol determine antibiotics, antenatal corticosteroids, magnesium sulfate, latency versus delivery, and monitoring.

Suspected intra-amniotic infection, abruption, nonreassuring fetal status, active labor, or maternal deterioration are delivery triggers. Do not use this diagnostic pathway to delay an OB delivery decision. [1][5]`,
    recommendation: 'OB/MFM disposition is required. Transfer to appropriate obstetric and neonatal capability if the current facility cannot provide it.',
    confidence: 'recommended',
    citation: [1, 5],
    next: 'pprom-handoff',
    summary: 'PPROM requires OB/MFM disposition; gestational age and maternal/fetal condition determine the management lane.',
    safetyLevel: 'critical',
  },

  {
    id: 'pprom-previable',
    type: 'result',
    module: 4,
    title: 'Previable or Periviable PPROM',
    body: `Call OB/MFM and neonatal specialists urgently. Do not apply a later-gestation PPROM algorithm without individualized counseling. Current SMFM guidance, endorsed by ACOG, recommends counseling about maternal and fetal risks and benefits; both immediate delivery/abortion care and expectant management may be offered when no contraindication requires immediate delivery. [5][6]

Discuss maternal risks including intra-amniotic infection, endometritis, hemorrhage, retained placenta, and sepsis. The patient's goals, gestational age, local neonatal capability, and evolving maternal/fetal status must guide the plan. ACOG's 2025 advisory emphasizes that clinicians must recognize deterioration early and intervene before critical illness.`,
    recommendation: 'Urgent OB/MFM-led shared decision-making and disposition. Escalate immediately for infection, hemorrhage, instability, or fetal compromise.',
    confidence: 'recommended',
    citation: [5, 6],
    next: 'pprom-handoff',
    summary: 'Previable/periviable PPROM requires urgent specialist counseling and maternal-safety surveillance, not a one-size-fits-all algorithm.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 5: HANDOFF
  // =====================================================================

  {
    id: 'pprom-handoff',
    type: 'info',
    module: 5,
    title: 'OB Handoff Checklist',
    body: `Give OB/L&D the following in one concise handoff:

• Gestational age, gravida/para, prenatal complications, and GBS status
• Time and character of leakage; contractions, bleeding, fever, fetal movement
• Maternal vitals, uterine tenderness, and infection/abruption concern
• Fetal heart-rate pattern and monitoring status
• Sterile speculum findings: pooling, cervix, cord, blood, purulence
• Testing: ferning, nitrazine if used, and the **Rupture of Fetal Membranes** AmniSure/PAMG-1 result
• Ultrasound findings if obtained and any cervical assessment that was clinically necessary
• Treatments already given, IV access, blood products if relevant, and the accepting service/facility

Document the clinical reasoning when tests and examination disagree. The final plan should specify monitoring, location of care, and return/escalation triggers.`,
    citation: [1, 2, 5],
    summary: 'Handoff gestational age, leak history, maternal/fetal status, speculum findings, tests, treatments, and destination.',
  },
];

export const PPROM_MODULE_LABELS = [
  'Triage / Safety',
  'History / Speculum',
  'Confirm ROM',
  'Gestational Age / Disposition',
  'Handoff',
];

export const PPROM_CITATIONS: Citation[] = [
  {
    num: 1,
    text: 'ACOG Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol. 2020;135(3):e80-e97. Reaffirmed 2023. PubMed PMID: 32080050. https://pubmed.ncbi.nlm.nih.gov/32080050/',
  },
  {
    num: 2,
    text: 'American College of Obstetricians and Gynecologists. Premature Rupture of Membranes (PROM) Evaluation. Cases in High Value Care. Accessed 2026-08-16. https://www.acog.org/education-and-events/creog/curriculum-resources/cases-in-high-value-care/premature-rupture-of-membranes-prom-evaluation',
  },
  {
    num: 3,
    text: 'National Institute for Health and Care Excellence. Preterm labour and birth (NG25), recommendation 1.3.1. Updated 2022. https://www.nice.org.uk/guidance/ng25/chapter/Recommendations',
  },
  {
    num: 4,
    text: 'Jamil M, et al. Comparison between Amnisure placental alpha microglobulin-1 rapid immunoassay and standard diagnostic methods for detection of rupture of membranes. BioMed Res Int. 2013;2013:588980. PMCID: PMC3773890. https://pmc.ncbi.nlm.nih.gov/articles/PMC3773890/',
  },
  {
    num: 5,
    text: 'Society for Maternal-Fetal Medicine Consult Series #71: Management of previable and periviable preterm prelabor rupture of membranes. Am J Obstet Gynecol. 2024;231:B2-B15. Endorsed by ACOG. https://publications.smfm.org/publications/573-society-for-maternal-fetal-medicine-consult-series-71/',
  },
  {
    num: 6,
    text: 'ACOG. Increased Risk of Maternal Morbidity Associated With Previable and Periviable Preterm Prelabor Rupture of Membranes. Practice Advisory. May 2025. https://www.acog.org/clinical/clinical-guidance/practice-advisory/articles/2025/05/increased-risk-of-maternal-morbidity-associated-with-previable-and-periviable-preterm-prelabor-rupture-of-membranes',
  },
  {
    num: 7,
    text: 'Centers for Disease Control and Prevention. Provider Performed Microscopy Procedures, Appendix L4: Fern Test. July 2026. U.S. Department of Health and Human Services. https://www.cdc.gov/lab-quality/media/pdfs/2025/07/PPMP_2025_Final-508c.pdf',
  },
];

export const PPROM_NODE_COUNT = PPROM_NODES.length;
