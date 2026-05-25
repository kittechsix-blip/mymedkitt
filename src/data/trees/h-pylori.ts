// MedKitt — Helicobacter pylori
// ED-oriented recognition, testing, eradication regimens, test-of-cure, and failure pathway.
// Sources: ACG 2024 H. pylori guideline, Maastricht VI/Florence consensus.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const H_PYLORI_CRITICAL_ACTIONS = [
  { text: 'Do not use clarithromycin or levofloxacin regimens empirically unless susceptibility is known', nodeId: 'hp-treatment-naive' },
  { text: 'Every treated H. pylori patient needs proof of eradication, not symptom follow-up alone', nodeId: 'hp-test-of-cure' },
  { text: 'Hold PPI/PCAB for 2 weeks and antibiotics/bismuth for 4 weeks before test-of-cure', nodeId: 'hp-testing-basics' },
  { text: 'Alarm features, age >=60 with new dyspepsia, bleeding, or weight loss require EGD pathway', nodeId: 'hp-alarm' },
  { text: 'A positive serology does not prove active infection or cure; avoid using it as the cure test', nodeId: 'hp-testing-basics' },
];

export const H_PYLORI_MODULE_LABELS = [
  'ED Fit',
  'Testing',
  'Treatment',
  'Failure',
  'Disposition',
];

export const H_PYLORI_NODES: DecisionNode[] = [
  {
    id: 'hp-start',
    type: 'question',
    module: 1,
    title: 'H. pylori — ED Decision Support',
    body: '[H. pylori Steps](#/info/hp-steps)\n\n**ED purpose:** identify who needs urgent GI workup, who needs outpatient active-infection testing, and what current eradication regimen should be documented or started when treatment is appropriate. [1][2]\n\n**Key point:** H. pylori is a treatable cause of peptic ulcer disease and is recognized as a gastric cancer risk factor, but the ED should not turn this into a generic abdominal pain tool.\n\n**Which lane is this patient in?**',
    citation: [1, 2],
    options: [
      {
        label: 'Alarm / complicated presentation',
        description: 'GI bleed, weight loss, anemia, persistent vomiting, dysphagia, peritonitis, age >=60 new dyspepsia',
        next: 'hp-alarm',
        urgency: 'urgent',
      },
      {
        label: 'Stable dyspepsia or PUD question',
        description: 'No alarm features; deciding whether active-infection testing is indicated',
        next: 'hp-test-candidates',
      },
      {
        label: 'Known positive H. pylori',
        description: 'Documented stool antigen, urea breath test, biopsy, or reliable outside result',
        next: 'hp-treatment-naive',
      },
      {
        label: 'Persistent after prior treatment',
        description: 'Symptoms continue or test-of-cure still positive after eradication attempt',
        next: 'hp-salvage',
      },
    ],
    summary: 'First split: alarm features vs stable testing vs known positive vs failed treatment.',
  },

  {
    id: 'hp-alarm',
    type: 'result',
    module: 1,
    title: 'Alarm Features — Do Not Treat-and-Forget',
    body: '**This is not a simple outpatient H. pylori pathway.** [1][2]\n\n**Alarm / higher-risk features:**\n- Hematemesis, melena, hemodynamic instability, or iron-deficiency anemia\n- Unintentional weight loss\n- Progressive dysphagia or odynophagia\n- Persistent vomiting\n- Palpable abdominal mass or lymphadenopathy\n- Family history of gastric cancer or high gastric cancer risk background\n- New dyspepsia at age >=60\n- Severe focal abdominal pain, peritonitis, or obstruction physiology\n\n**ED actions:**\n1. Stabilize and risk-stratify the acute presentation.\n2. Use [Upper GI Bleed](#/tree/upper-gi-bleed) if bleeding is present.\n3. Arrange urgent GI evaluation / EGD when alarm features are present.\n4. H. pylori testing may be done by biopsy at EGD, or noninvasively later if no endoscopy occurs.\n\n**Do not let an H. pylori plan delay resuscitation, imaging, EGD, or surgical evaluation.**',
    citation: [1, 2],
    recommendation: 'Treat the acute problem first. Alarm features require GI/EGD pathway, not routine ED dyspepsia discharge.',
    confidence: 'recommended',
    summary: 'Alarm features require GI/EGD pathway; do not treat-and-forget.',
    safetyLevel: 'warning',
  },

  {
    id: 'hp-test-candidates',
    type: 'info',
    module: 2,
    title: 'Who Should Be Tested?',
    body: '[Testing Details](#/info/hp-testing)\n\n**Reasonable indications to test for active H. pylori:** [1][2]\n- Current or prior peptic ulcer disease\n- Dyspepsia age <60 without alarm features\n- Dyspepsia age <50 with elevated gastric cancer risk\n- Unexplained iron-deficiency anemia after appropriate evaluation\n- Immune thrombocytopenic purpura\n- Gastric MALT lymphoma or post-endoscopic resection of early gastric cancer\n- Atrophic gastritis, intestinal metaplasia, dysplasia, autoimmune gastritis, or gastric epithelial polyps\n- Adult household members of a person with confirmed H. pylori\n- Chronic NSAID use or starting daily aspirin therapy\n\n**Do not order a test unless you have a plan to treat if positive.**',
    citation: [1, 2],
    next: 'hp-test-choice',
    summary: 'Test when dyspepsia/PUD risk fits, cancer-risk conditions exist, or test result will change care.',
  },

  {
    id: 'hp-test-choice',
    type: 'question',
    module: 2,
    title: 'Testing Route',
    body: '**Choose the testing route by clinical setting.** [1][3]\n\n**Noninvasive active-infection tests:**\n- Urea breath test\n- Stool antigen test\n\n**Endoscopy-based tests:**\n- Biopsy histology, rapid urease, culture, or molecular susceptibility testing when EGD is already indicated\n\n**Avoid routine serology:** antibodies may stay positive after past infection, so serology cannot prove active infection and cannot confirm eradication.\n\n**Which testing route fits?**',
    citation: [1, 3],
    options: [
      {
        label: 'No EGD needed now',
        description: 'Stable outpatient-style dyspepsia/PUD follow-up',
        next: 'hp-testing-basics',
      },
      {
        label: 'EGD indicated',
        description: 'Alarm features, UGIB, ulcer complication, gastric cancer risk workup',
        next: 'hp-egd-testing',
        urgency: 'urgent',
      },
      {
        label: 'Already documented positive',
        description: 'Proceed to eradication regimen selection',
        next: 'hp-treatment-naive',
      },
    ],
    summary: 'Use stool antigen or urea breath for active infection; biopsy if EGD is already indicated.',
  },

  {
    id: 'hp-testing-basics',
    type: 'info',
    module: 2,
    title: 'Active-Infection Testing Rules',
    body: '**Best practical tests:** urea breath test or stool antigen test. [1][2]\n\n**Avoid false negatives:**\n- Hold PPI or PCAB for **2 weeks** before testing.\n- Hold antibiotics and bismuth for **4 weeks** before testing.\n- Bridge symptoms with H2 blocker or antacids if needed.\n\n**What not to do:**\n- Do not use serology for test-of-cure.\n- Do not call symptoms alone a cure.\n- Do not start antibiotics before collecting a valid test unless there is a clear specialist-driven reason.\n\n**ED disposition phrase:** \"No alarm features today. Arrange stool antigen or urea breath testing after holding PPI/PCAB x2 weeks and antibiotics/bismuth x4 weeks; treat if positive and confirm eradication.\"',
    citation: [1, 2],
    next: 'hp-disposition',
    summary: 'Hold PPI/PCAB 2 weeks and antibiotics/bismuth 4 weeks before active-infection testing.',
  },

  {
    id: 'hp-egd-testing',
    type: 'info',
    module: 2,
    title: 'EGD-Based Testing',
    body: '**When EGD is already indicated, biopsy-based testing is appropriate.** [1][3]\n\n**Use this lane for:**\n- Upper GI bleeding with suspected ulcer source\n- Gastric ulcer, complicated ulcer, or malignancy concern\n- Alarm-feature dyspepsia\n- Need for culture or molecular susceptibility after repeated treatment failure\n\n**Practical ED note:** the ED usually does not need to choose the biopsy method. Document the indication and ask GI to test for H. pylori and plan eradication if positive.\n\n**After endoscopy:** all confirmed positives still need eradication therapy and test-of-cure.',
    citation: [1, 3],
    next: 'hp-treatment-naive',
    summary: 'If EGD is already indicated, ask GI to test by biopsy and still plan eradication confirmation.',
  },

  {
    id: 'hp-treatment-naive',
    type: 'question',
    module: 3,
    title: 'Initial Eradication Regimen',
    body: '[Regimen Table](#/info/hp-regimens)\n\n**Current ACG North America default:** optimized bismuth quadruple therapy for 14 days when susceptibility is unknown. [1][2]\n\n**Important change:** do **not** use clarithromycin triple therapy or levofloxacin regimens empirically unless susceptibility is documented. Resistance has made empiric macrolide/quinolone therapy unreliable. [1][2]\n\n**Which situation fits?**',
    citation: [1, 2],
    options: [
      {
        label: 'No true penicillin allergy',
        description: 'Default treatment-naive pathway',
        next: 'hp-bqt',
      },
      {
        label: 'Penicillin allergy',
        description: 'Use BQT if possible; consider allergy testing if future regimens needed',
        next: 'hp-pcn-allergy',
      },
      {
        label: 'Susceptibility known or formulary alternative',
        description: 'Culture/molecular result, vonoprazan pack, rifabutin pack, or GI-directed regimen',
        next: 'hp-alternatives',
      },
    ],
    summary: 'Default is 14-day optimized bismuth quadruple therapy; avoid empiric clarithro/levo regimens.',
  },

  {
    id: 'hp-bqt',
    type: 'result',
    module: 3,
    title: 'Optimized Bismuth Quadruple Therapy',
    body: '**Preferred empiric regimen when susceptibility is unknown:** [1][2]\n\n**14 days:**\n- PPI standard dose **BID**\n- Bismuth subcitrate **120-300 mg QID** OR bismuth subsalicylate **300-524 mg QID**\n- Tetracycline **500 mg QID**\n- Metronidazole **500 mg TID or QID**\n\n**Counseling:**\n- High pill burden; adherence drives cure.\n- Bismuth can turn stool/tongue dark.\n- Avoid alcohol with metronidazole.\n- Tetracycline is contraindicated in pregnancy and generally avoided in young children.\n- Doxycycline is not the recommended substitute for tetracycline in the ACG regimen.\n\n**Always schedule test-of-cure.**',
    citation: [1, 2],
    recommendation: 'Use optimized bismuth quadruple therapy x14 days when H. pylori is confirmed and susceptibility is unknown.',
    confidence: 'recommended',
    next: 'hp-test-of-cure',
    summary: 'BQT x14 days: PPI BID + bismuth QID + tetracycline QID + metronidazole TID/QID.',
  },

  {
    id: 'hp-pcn-allergy',
    type: 'info',
    module: 3,
    title: 'Penicillin Allergy Lane',
    body: '**If true penicillin allergy:** optimized bismuth quadruple therapy is the main empiric option if tetracycline/metronidazole/bismuth are safe. [1][2]\n\n**Do not reflexively use clarithromycin triple therapy** just because the patient reports penicillin allergy. Use clarithromycin only when susceptibility is known.\n\n**Consider penicillin allergy evaluation** when feasible because amoxicillin resistance is uncommon and amoxicillin-containing alternatives are important for salvage therapy. [1][2]\n\n**Pregnancy / lactation:** defer routine eradication and discuss with GI/OB unless treatment is urgent; tetracycline and bismuth subsalicylate may be inappropriate.',
    citation: [1, 2],
    next: 'hp-bqt',
    summary: 'True PCN allergy usually points to BQT; consider allergy testing because amoxicillin matters for salvage.',
  },

  {
    id: 'hp-alternatives',
    type: 'info',
    module: 3,
    title: 'Alternatives & Susceptibility-Guided Therapy',
    body: '**Alternative regimens from the ACG guideline:** [1][2]\n\n| Situation | Option |\n|---|---|\n| Treatment-naive, no PCN allergy, BQT impractical | Vonoprazan-amoxicillin dual therapy x14 days may be used where available |\n| Treatment-naive or salvage option | Rifabutin-amoxicillin-PPI triple therapy x14 days |\n| Clarithromycin susceptible isolate | Clarithromycin-containing therapy may be used |\n| Levofloxacin susceptible isolate | Levofloxacin triple therapy may be used after considering alternatives |\n\n**Common adult doses listed by ACG highlights:**\n- Vonoprazan 20 mg BID + amoxicillin 1000 mg TID x14 days\n- Rifabutin 50 mg TID + amoxicillin 1000 mg TID + omeprazole 40 mg TID x14 days\n- Levofloxacin 500 mg daily + PPI BID + amoxicillin 1000 mg BID x14 days only when susceptible\n\n**Practical ED stance:** if this is not a straightforward first regimen, document the prior regimen and route to GI/PCP for susceptibility-guided choice.',
    citation: [1, 2],
    next: 'hp-test-of-cure',
    summary: 'Alternatives exist, but clarithro/levo require known susceptibility; complex salvage should be GI-directed.',
  },

  {
    id: 'hp-test-of-cure',
    type: 'result',
    module: 5,
    title: 'Test-of-Cure Is Mandatory',
    body: '**All treated patients need proof of eradication.** [1][2]\n\n**Acceptable tests:**\n- Urea breath test\n- Stool antigen test\n- Biopsy-based testing if EGD is being done\n\n**Timing:**\n- At least **4 weeks after antibiotics are completed**\n- Off PPI/PCAB for **2 weeks**\n- Off bismuth and antibiotics for **4 weeks**\n- H2 blocker or antacids may bridge symptoms\n\n**Document before discharge:** \"H. pylori eradication requires test-of-cure; symptom improvement alone does not confirm cure.\"',
    citation: [1, 2],
    recommendation: 'Schedule urea breath or stool antigen test-of-cure at least 4 weeks after antibiotics and after 2 weeks off PPI/PCAB.',
    confidence: 'definitive',
    next: 'hp-disposition',
    summary: 'Proof of eradication is required for every treated patient.',
  },

  {
    id: 'hp-salvage',
    type: 'question',
    module: 4,
    title: 'Persistent H. pylori After Treatment',
    body: '[Failure Pathway](#/info/hp-failure)\n\n**First confirm this is true persistence:** [1][2]\n- Was test-of-cure done at the correct time?\n- Was the patient off PPI/PCAB, antibiotics, and bismuth long enough?\n- Was the test stool antigen, urea breath, or biopsy-based, not serology?\n- What exact regimen and adherence?\n\n**What was the prior regimen?**',
    citation: [1, 2],
    options: [
      {
        label: 'Failed clarithromycin triple/concomitant',
        description: 'Common older regimen; avoid repeating macrolide',
        next: 'hp-bqt',
      },
      {
        label: 'Failed optimized BQT',
        description: 'Needs different antibiotic class or susceptibility-guided regimen',
        next: 'hp-failed-bqt',
      },
      {
        label: 'Multiple failures / unclear regimen',
        description: 'Needs GI-directed susceptibility testing',
        next: 'hp-multiple-failures',
        urgency: 'urgent',
      },
    ],
    summary: 'Confirm true persistence and do not reuse failed antibiotics blindly.',
  },

  {
    id: 'hp-failed-bqt',
    type: 'result',
    module: 4,
    title: 'Failed Optimized BQT',
    body: '**After optimized BQT failure:** avoid repeating the same regimen unless nonadherence was the clear cause and GI agrees. [1][2]\n\n**Reasonable next steps:**\n- Review prior macrolide, quinolone, metronidazole, tetracycline, and rifamycin exposure.\n- Consider rifabutin triple therapy or vonoprazan-amoxicillin dual therapy if no true penicillin allergy.\n- If levofloxacin is considered, use only with documented susceptibility.\n- Arrange GI for culture or molecular susceptibility testing when available.\n\n**ED action:** do not guess a second-line regimen from memory. Document prior treatment, adherence, allergies, and test-of-cure timing.',
    citation: [1, 2],
    recommendation: 'Route for GI/susceptibility-guided salvage unless a clear guideline-supported alternative is available.',
    confidence: 'recommended',
    next: 'hp-disposition',
    summary: 'After BQT failure, move to different class/susceptibility-guided therapy; do not repeat failed antibiotics blindly.',
  },

  {
    id: 'hp-multiple-failures',
    type: 'result',
    module: 4,
    title: 'Multiple Failures or Unclear History',
    body: '**High-risk for resistance or bad history.** [1][3]\n\n**Best next move:** GI follow-up for susceptibility-guided therapy, preferably with culture or molecular testing if EGD is performed.\n\n**Document the missing details:**\n- Prior antibiotics and durations\n- Whether treatment was completed\n- Prior test-of-cure type and date\n- PPI/PCAB, bismuth, and antibiotic holds before testing\n- True drug allergies vs intolerance\n\n**Avoid:** empiric clarithromycin or levofloxacin regimens without susceptibility.',
    citation: [1, 3],
    recommendation: 'Arrange GI-directed salvage with susceptibility testing when possible.',
    confidence: 'recommended',
    next: 'hp-disposition',
    summary: 'Multiple failures need susceptibility-guided GI pathway.',
  },

  {
    id: 'hp-disposition',
    type: 'info',
    module: 5,
    title: 'Disposition & Documentation',
    body: '**Discharge is reasonable when:**\n- No alarm features\n- Stable vitals and benign abdominal exam\n- Can tolerate PO\n- Clear outpatient testing/treatment plan\n- Follow-up available for result review and test-of-cure\n\n**Return precautions:**\n- Vomiting blood or black stools\n- Syncope, worsening weakness, chest pain, dyspnea\n- Severe or focal abdominal pain, persistent vomiting, fever\n- Unintentional weight loss or progressive dysphagia\n\n**Documentation phrase:**\n\"No ED alarm features today. H. pylori plan reviewed: active-infection testing/treatment as indicated, avoid empiric clarithro/levo unless susceptible, and confirm eradication with stool antigen or urea breath test after correct medication hold.\"',
    citation: [1, 2],
    summary: 'Safe outpatient plan requires no alarm features plus explicit test/treat/test-of-cure follow-up.',
  },
];

export const H_PYLORI_CITATIONS: Citation[] = [
  { num: 1, text: 'Chey WD, Howden CW, Moss SF, Morgan DR, Greer KB, Grover S, Shah SC. ACG Clinical Guideline: Treatment of Helicobacter pylori Infection. Am J Gastroenterol. 2024;119(9):1730-1753. doi:10.14309/ajg.0000000000002968.' },
  { num: 2, text: 'American College of Gastroenterology. ACG Guideline Highlights: Treatment of Helicobacter pylori Infection. 2025 summary PDF of 2024 ACG guideline.' },
  { num: 3, text: 'Malfertheiner P, Megraud F, Rokkas T, et al. Management of Helicobacter pylori infection: the Maastricht VI/Florence consensus report. Gut. 2022;71(9):1724-1762.' },
];

export const H_PYLORI_NODE_COUNT = H_PYLORI_NODES.length;
