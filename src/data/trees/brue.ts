// MedKitt — Brief Resolved Unexplained Event (BRUE)
// Replaces ALTE terminology per AAP 2016 guidelines.
// Risk stratification → Workup → Evaluation → Disposition
// 6 modules: Recognition → Risk Stratification → Low-Risk → High-Risk → Etiology → Disposition
// Evidence: AAP CPG 2016, AAP Higher-Risk Framework 2019, StatPearls

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const BRUE_MODULE_LABELS: string[] = [
  'Recognition',
  'Risk Stratification',
  'Low-Risk Management',
  'High-Risk Workup',
  'Etiology',
  'Disposition',
];

export const BRUE_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'brue-start',
    type: 'info',
    module: 1,
    title: 'Brief Resolved Unexplained Event (BRUE)',
    body: '**BRUE replaced ALTE in 2016** — more precise definition, less alarming terminology.\n\n**BRUE Definition (ALL criteria):**\n\nInfant **<1 year** with a **sudden, brief (<1 min), NOW RESOLVED** episode of ≥1:\n\n| Feature | Description |\n|---------|-------------|\n| **Cyanosis or pallor** | Central (not acrocyanosis) |\n| **Breathing change** | Absent, decreased, or irregular |\n| **Tone change** | Hypertonia or hypotonia |\n| **Responsiveness** | Altered level of consciousness |\n\n**Key distinction:** Event must be **UNEXPLAINED** after H&P — if a cause is identified, it\'s not a BRUE.\n\n⚠️ **NOT BRUE if:** Fever, respiratory infection, GER with vomiting, choking on food, or witnessed seizure explains the event.',
    citation: [1, 2],
    next: 'brue-exclude',
    summary: 'BRUE = sudden, brief (<1 min), resolved episode of cyanosis/pallor, breathing change, tone change, or altered responsiveness in infant <1 year, unexplained after H&P.',
    skippable: true,
  },

  {
    id: 'brue-exclude',
    type: 'question',
    module: 1,
    title: 'Does This Meet BRUE Criteria?',
    body: '**Exclusion Criteria — NOT a BRUE if:**\n\n❌ Fever present (consider sepsis workup)\n❌ Respiratory infection symptoms (bronchiolitis, URI)\n❌ GER with witnessed vomiting/regurgitation\n❌ Choking on feeding or foreign body\n❌ Witnessed seizure activity\n❌ Event NOT resolved (still symptomatic)\n❌ Age ≥1 year\n\n**If any exclusion present:** Diagnose and treat the underlying cause instead.\n\nDoes this infant meet BRUE criteria?',
    citation: [1],
    options: [
      { label: 'Yes — Meets BRUE Criteria', next: 'brue-risk-assessment', description: 'Event resolved, unexplained after H&P' },
      { label: 'No — Explained Event', next: 'brue-not-brue', description: 'Cause identified or exclusion present' },
    ],
    summary: 'BRUE only if unexplained after H&P. Fever, infection, GER, choking, seizure = not BRUE.',
  },

  {
    id: 'brue-not-brue',
    type: 'result',
    module: 1,
    title: 'Not a BRUE — Explained Event',
    body: '**Cause identified — manage underlying condition:**\n\n| Cause | Management |\n|-------|------------|\n| **Fever** | [Peds Fever Pathway](#/tree/peds-fever) |\n| **Bronchiolitis/URI** | [Bronchiolitis Pathway](#/tree/bronchiolitis) |\n| **GER with event** | Feeding modifications, positioning, consider GI referral |\n| **Choking** | Feeding evaluation, consider swallow study |\n| **Seizure** | Neurology referral, consider EEG |\n| **Pertussis** | Test + treat per guidelines |\n\n**Document** the identified cause and manage accordingly.',
    recommendation: 'This is NOT a BRUE. Manage the identified cause per appropriate pathway. BRUE terminology only applies when no cause is found after thorough H&P.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  // =====================================================================
  // MODULE 2: RISK STRATIFICATION
  // =====================================================================

  {
    id: 'brue-risk-assessment',
    type: 'info',
    module: 2,
    title: 'BRUE Risk Stratification',
    body: '**Lower-Risk BRUE — ALL criteria must be met:**\n\n| Criterion | Requirement |\n|-----------|-------------|\n| **Age** | >60 days old |\n| **Prematurity** | If preterm: GA >32 weeks AND corrected age >45 weeks |\n| **Event count** | First BRUE (no prior events, no cluster) |\n| **Duration** | <1 minute |\n| **CPR** | None required by trained medical provider |\n| **Exam** | Normal, no concerning findings |\n\n**Higher-Risk BRUE — ANY of the following:**\n\n• Age ≤60 days\n• Preterm <32 weeks OR corrected age <45 weeks\n• Multiple events or cluster\n• Duration ≥1 minute\n• CPR by trained provider\n• Abnormal exam findings\n• Concerning history (FH of SIDS, prematurity, social concerns)\n\n⚠️ **>90% of BRUEs are classified as higher-risk** — the low-risk category is intentionally narrow.',
    citation: [1, 3],
    next: 'brue-risk-question',
    summary: 'Low-risk BRUE: >60 days, not very preterm, first event, <1 min, no CPR, normal exam. Any deviation = higher-risk.',
    skippable: true,
  },

  {
    id: 'brue-risk-question',
    type: 'question',
    module: 2,
    title: 'Risk Category',
    body: '**Assess ALL lower-risk criteria:**\n\n☐ Age **>60 days**\n☐ If preterm: GA **>32 weeks** AND corrected age **>45 weeks**\n☐ **First** BRUE (no prior, no cluster)\n☐ Event duration **<1 minute**\n☐ **No CPR** by trained medical provider\n☐ **Normal** physical exam\n☐ **No** concerning history (FH of SIDS, social concerns)\n\n**ALL boxes must be checked for lower-risk.**\n\nWhich risk category?',
    citation: [1],
    options: [
      { label: 'Lower-Risk', next: 'brue-low-risk-mgmt', description: 'ALL criteria met' },
      { label: 'Higher-Risk', next: 'brue-high-risk-intro', description: 'ANY criterion not met', urgency: 'urgent' },
    ],
    summary: 'All criteria met = lower-risk (minimal workup). Any criterion not met = higher-risk (extended evaluation).',
  },

  // =====================================================================
  // MODULE 3: LOW-RISK MANAGEMENT
  // =====================================================================

  {
    id: 'brue-low-risk-mgmt',
    type: 'info',
    module: 3,
    title: 'Lower-Risk BRUE — Management',
    body: '**AAP Strong Recommendations AGAINST:**\n\n❌ Routine CBC, BMP, blood gas\n❌ Chest X-ray\n❌ Echocardiogram\n❌ EEG\n❌ Neuroimaging (CT/MRI)\n❌ Upper GI series\n❌ LP / CSF analysis\n❌ Empiric acid suppression (PPI/H2)\n❌ Admission solely for monitoring\n\n**MAY Consider (weak recommendations):**\n\n✓ **ECG** — to screen for long QT, WPW\n✓ **Pertussis testing** — if underimmunized or outbreak area\n✓ **Brief observation** (1-4 hours) with pulse oximetry\n\n**Education is KEY:**\n• Reassure parents — recurrence rate ~5%, serious underlying condition rare (~1%)\n• Teach infant CPR\n• Safe sleep counseling\n• When to return',
    citation: [1, 4, 5],
    next: 'brue-low-risk-workup',
    summary: 'Low-risk BRUE: Avoid routine testing. May do ECG and pertussis test. Observe 1-4 hrs. Educate and reassure.',
    skippable: true,
  },

  {
    id: 'brue-low-risk-workup',
    type: 'question',
    module: 3,
    title: 'Low-Risk Workup',
    body: '**Consider these tests (not required):**\n\n| Test | Rationale |\n|------|----------|\n| **12-lead ECG** | Screen for long QT, WPW (channelopathies can cause apnea) |\n| **Pertussis PCR** | If underimmunized or pertussis exposure |\n\n**Observation:**\n• 1-4 hours with continuous pulse oximetry\n• Serial exams — watch for recurrence\n• Document normal VS and exam at discharge\n\n**Parent Education:**\n• Infant CPR training (offer before discharge)\n• Safe sleep (supine, no co-sleeping, firm mattress)\n• Return precautions: repeat event, fever, poor feeding, color change\n\nProceed to disposition:',
    citation: [1],
    options: [
      { label: 'Observation Complete — No Concerns', next: 'brue-low-risk-discharge', description: 'Normal obs, ready for discharge' },
      { label: 'Recurrent Event During Observation', next: 'brue-high-risk-intro', description: 'Now higher-risk — escalate workup' },
    ],
    summary: 'Low-risk: ECG optional, pertussis if indicated, observe 1-4 hrs, parent education on CPR and safe sleep.',
  },

  {
    id: 'brue-low-risk-discharge',
    type: 'result',
    module: 3,
    title: 'Lower-Risk BRUE — Discharge',
    body: '**Discharge Criteria:**\n✓ Normal observation period (1-4 hours)\n✓ No recurrent events\n✓ Normal vital signs and exam\n✓ Parent education completed\n✓ Follow-up arranged (PCP within 24-48 hours)\n\n**Discharge Instructions:**\n\n**Return immediately if:**\n• Another similar event\n• Color change (blue/pale)\n• Breathing difficulty\n• Feeding problems\n• Lethargy or decreased responsiveness\n• Fever\n\n**Safe Sleep Reminders:**\n• Back to sleep (supine)\n• Firm, flat mattress\n• No loose bedding, pillows, or soft toys\n• Room sharing (not bed sharing)\n• No smoking exposure\n\n**Prognosis:** Excellent. Recurrence ~5%, serious underlying condition ~1% in true low-risk BRUE.',
    recommendation: 'DISCHARGE HOME with close PCP follow-up in 24-48 hours. Provide infant CPR resources. No routine testing needed.',
    confidence: 'definitive',
    citation: [1, 4],
    calculatorLinks: [{ id: 'brue-risk', label: 'BRUE Risk Calculator' }],
  },

  // =====================================================================
  // MODULE 4: HIGH-RISK WORKUP
  // =====================================================================

  {
    id: 'brue-high-risk-intro',
    type: 'info',
    module: 4,
    title: 'Higher-Risk BRUE — Evaluation Framework',
    body: '**2019 AAP Framework: Tiered, Hypothesis-Driven Approach**\n\nHigher-risk infants need extended evaluation, but **avoid indiscriminate testing** — low yield, high false-positive rate.\n\n**Prioritize TIME-SENSITIVE conditions:**\n\n| Priority | Condition | Why Time-Sensitive |\n|----------|-----------|--------------------|\n| 1 | **Child maltreatment** | Ongoing harm, missed diagnosis |\n| 2 | **Feeding/aspiration** | Recurrent events, failure to thrive |\n| 3 | **Cardiac arrhythmia** | Sudden death risk |\n| 4 | **Serious infection** | Sepsis, meningitis, pertussis |\n| 5 | **Congenital anomaly** | Airway, cardiac, metabolic |\n\n**Secondary (less time-sensitive):**\n• Dysphagia\n• Intermittent airway obstruction\n• Epilepsy\n• Metabolic disorders',
    citation: [3, 6],
    next: 'brue-high-risk-history',
    summary: 'Higher-risk BRUE: Tiered workup prioritizing time-sensitive conditions — NAT, feeding issues, arrhythmia, infection, congenital anomaly.',
    skippable: true,
  },

  {
    id: 'brue-high-risk-history',
    type: 'info',
    module: 4,
    title: 'Focused History — Higher-Risk BRUE',
    body: '**Event History:**\n• Exactly what did the caregiver observe?\n• What was infant doing? (feeding, sleeping, awake)\n• Color change? (central cyanosis vs acrocyanosis vs pallor)\n• Tone? (limp vs stiff)\n• Eye deviation? Rhythmic movements? (seizure)\n• Duration? (usually overestimated)\n• What did caregiver do? (stimulation, CPR)\n• How quickly did infant return to baseline?\n\n**Feeding History:**\n• Breastfed or bottle?\n• Choking, gagging, coughing with feeds?\n• Vomiting, spitting up?\n• Recent feeding before event?\n\n**PMH:**\n• Prematurity? (GA, corrected age)\n• Prior similar events?\n• Birth complications?\n• Recent illness?\n\n**Family History:**\n• SIDS, sudden death <50 years\n• Arrhythmia, long QT, cardiomyopathy\n• Seizure disorder\n• Metabolic disease\n\n**Social History:**\n• Who was present? (same caregiver always?)\n• Other children? History with CPS?\n• Smoking exposure?',
    citation: [3, 6],
    next: 'brue-high-risk-exam',
    summary: 'Detailed event history, feeding history, PMH (prematurity), FH (SIDS, arrhythmia), social history (NAT red flags).',
    skippable: true,
  },

  {
    id: 'brue-high-risk-exam',
    type: 'info',
    module: 4,
    title: 'Physical Exam — Higher-Risk BRUE',
    body: '**Vital Signs:**\n• Temperature (fever → infection pathway)\n• HR, RR, BP, SpO2\n• Weight (FTT = feeding issues, NAT)\n\n**General:**\n• Well-appearing vs ill-appearing\n• Dysmorphic features (syndromes)\n• Interaction, tone, alertness\n\n**HEENT:**\n• Anterior fontanelle (bulging = ICP, sunken = dehydration)\n• Retinal hemorrhages (NAT — dilated fundoscopy if concern)\n• Oral lesions (HSV)\n• Stridor, noisy breathing (airway anomaly)\n\n**Cardiac:**\n• Murmur (structural heart disease)\n• Rhythm irregularity\n\n**Respiratory:**\n• Work of breathing\n• Adventitious sounds\n\n**Abdomen:**\n• Hepatosplenomegaly (metabolic, infection)\n\n**Skin:**\n• Bruising (NAT — concerning in non-mobile infant)\n• Petechiae (infection, coagulopathy)\n• Rash\n\n**Neuro:**\n• Tone, reflexes, suck\n• Movement asymmetry',
    citation: [3, 6],
    next: 'brue-high-risk-workup',
    summary: 'Complete PE: fontanelle, retinal exam if NAT concern, cardiac (murmur), skin (bruising in non-mobile = NAT red flag).',
    skippable: true,
  },

  {
    id: 'brue-high-risk-workup',
    type: 'info',
    module: 4,
    title: 'Higher-Risk BRUE — Testing',
    body: '**Initial Tier (feasible without admission):**\n\n| Test | Indication |\n|------|------------|\n| **Continuous pulse ox** | All higher-risk — 4+ hours |\n| **12-lead ECG** | All — screen long QT, WPW |\n| **Pertussis PCR** | Underimmunized, exposure, outbreak |\n| **Respiratory viral panel** | Respiratory symptoms |\n| **Blood glucose** | All — hypoglycemia |\n| **VBG or BMP** | Metabolic screen (acidosis, electrolytes) |\n| **CBC** | Infection, anemia |\n| **Lactate** | If metabolic concern |\n\n**If NAT Concern:**\n• Head CT or MRI (subdural, SAH)\n• Skeletal survey\n• Retinal exam (ophthalmology)\n• Social work consult\n• Report to CPS\n\n**If Cardiac Concern:**\n• ECG (long QT, WPW, arrhythmia)\n• Consider echo if murmur or structural concern\n• Cardiology consult if abnormal\n\n**If Seizure Concern:**\n• EEG\n• Neurology consult\n\n**If GI/Feeding Concern:**\n• Observed feeding\n• Consider swallow study\n• GI consult',
    citation: [3, 6, 7],
    next: 'brue-high-risk-admit',
    summary: 'Tier 1: Pulse ox, ECG, glucose, BMP/VBG, CBC, pertussis. Add head imaging + skeletal survey if NAT concern.',
    skippable: true,
  },

  {
    id: 'brue-high-risk-admit',
    type: 'result',
    module: 4,
    title: 'Higher-Risk BRUE — Admission',
    body: '**Admission Indications:**\n\n✓ Age ≤60 days\n✓ Preterm <32 weeks or corrected age <45 weeks\n✓ Multiple/cluster events\n✓ Event duration ≥1 minute\n✓ CPR required by trained provider\n✓ Abnormal exam or vital signs\n✓ Concern for NAT\n✓ Abnormal testing\n✓ Parental anxiety/unable to monitor at home\n\n**Admission Orders:**\n• Continuous cardiorespiratory monitoring\n• Pulse oximetry\n• Apnea monitoring\n• Observed feedings\n• Social work if NAT concern\n• Subspecialty consults as indicated\n\n**Workup Guided by History:**\n\n| Concern | Additional Testing |\n|---------|--------------------|\n| NAT | Head CT/MRI, skeletal survey, retinal exam, CPS |\n| Seizure | EEG, neurology |\n| Cardiac | Echo, Holter, cardiology |\n| Metabolic | Ammonia, lactate, acylcarnitine, urine organic acids |\n| Infection | LP if meningitis concern |',
    recommendation: 'ADMIT for continuous monitoring and hypothesis-driven workup. Social work consult if any NAT concern. Subspecialty consults based on clinical suspicion.',
    confidence: 'recommended',
    citation: [3, 6],
    calculatorLinks: [{ id: 'brue-risk', label: 'BRUE Risk Calculator' }],
  },

  // =====================================================================
  // MODULE 5: ETIOLOGY
  // =====================================================================

  {
    id: 'brue-ddx',
    type: 'info',
    module: 5,
    title: 'BRUE Differential Diagnosis',
    body: '**Common Causes (when identified, no longer a "BRUE"):**\n\n| Category | Causes |\n|----------|--------|\n| **GI** | GER with laryngospasm, swallowing dysfunction, aspiration |\n| **Respiratory** | Pertussis, RSV, bronchiolitis, URI, laryngomalacia |\n| **Neurologic** | Seizure, breath-holding spell, apnea of infancy |\n| **Cardiac** | Long QT, WPW, SVT, structural heart disease |\n| **Infection** | UTI, meningitis, sepsis |\n| **Metabolic** | Hypoglycemia, inborn errors of metabolism |\n| **NAT** | Suffocation, shaking, Munchausen by proxy |\n| **Other** | Choking, airway obstruction, medication/toxin |\n\n**Serious Underlying Condition:** ~1% of low-risk, ~5% of high-risk\n\n**Most common identifiable causes:**\n1. GER-related laryngospasm\n2. Lower respiratory infection\n3. Seizure\n4. Child maltreatment',
    citation: [2, 6, 8],
    next: 'brue-nat-screen',
    summary: 'DDx: GER/laryngospasm most common, then LRI, seizure. Serious underlying condition ~1-5%. Always consider NAT.',
    skippable: true,
  },

  {
    id: 'brue-nat-screen',
    type: 'info',
    module: 5,
    title: 'Non-Accidental Trauma (NAT) Screening',
    body: '**NAT Red Flags in BRUE:**\n\n⚠️ **High-Risk Features:**\n• Recurrent events with same caregiver\n• Inconsistent or changing history\n• Delay in seeking care\n• Bruising in non-mobile infant (TEN-4 FACES)\n• Unexplained injuries\n• Prior CPS involvement\n• Domestic violence in home\n• Substance abuse\n• Young, isolated, or stressed caregivers\n\n**TEN-4 FACES Bruising Rule:**\nBruising on **T**orso, **E**ar, **N**eck in any child **<4 years** OR\n**F**ace, **A**rm, **C**heek, **E**yes, **S**oft tissue in infant <4 months\n→ Highly suspicious for abuse\n\n**If NAT Suspected:**\n• Head CT or MRI (subdural hematoma)\n• Skeletal survey (fractures)\n• Dilated fundoscopic exam (retinal hemorrhages)\n• Social work consult\n• Report to CPS (mandated)\n• Document carefully\n• Admit for safety',
    citation: [6, 9],
    next: 'brue-pertussis',
    summary: 'NAT red flags: recurrent events same caregiver, bruising in non-mobile infant, inconsistent history. TEN-4 FACES bruising rule.',
    skippable: true,
  },

  {
    id: 'brue-pertussis',
    type: 'info',
    module: 5,
    title: 'Pertussis Consideration',
    body: '**Pertussis in Infants — The "Silent" Cause of BRUE:**\n\nInfants <3 months may not have classic "whoop" — present with:\n• Apnea\n• Cyanosis\n• Paroxysmal cough\n• Post-tussive emesis\n• Poor feeding\n\n**Test for Pertussis if:**\n• Underimmunized (0-2 DTaP doses)\n• Pertussis exposure\n• Outbreak in community\n• Paroxysmal cough present\n• Any respiratory symptoms\n\n**Testing:**\n• Nasopharyngeal PCR (gold standard)\n• Results typically 4-24 hours\n\n**Treatment (if positive):**\n• [Azithromycin](#/drug/azithromycin) 10 mg/kg/day x 5 days\n• Admit infants <3 months (apnea risk)\n• Contact precautions\n• Prophylaxis for close contacts',
    citation: [1, 10],
    next: 'brue-cardiac',
    summary: 'Pertussis in young infants: apnea, cyanosis without classic whoop. Test NP PCR if underimmunized or exposure. Admit <3 months.',
    skippable: true,
  },

  {
    id: 'brue-cardiac',
    type: 'info',
    module: 5,
    title: 'Cardiac Causes of BRUE',
    body: '**Arrhythmias Presenting as BRUE:**\n\n| Condition | ECG Finding | Risk |\n|-----------|-------------|------|\n| **Long QT** | QTc >460 ms (>480 concerning) | Sudden death, torsades |\n| **WPW** | Delta wave, short PR | SVT, sudden death |\n| **SVT** | Narrow complex, rate >220 | Shock if prolonged |\n| **Heart block** | AV dissociation | Syncope, bradycardia |\n\n**ECG Screening:**\n• Recommended for ALL higher-risk BRUE\n• "May consider" for lower-risk\n• Pediatric cardiology interpretation if abnormal\n\n**QTc Calculation:**\n• Bazett formula: QTc = QT / √RR\n• Normal: <440 ms\n• Borderline: 440-460 ms\n• Prolonged: >460 ms\n\n**If Abnormal ECG:**\n• Cardiology consult\n• Consider echo\n• Consider Holter monitor\n• Family screening for inherited conditions\n\n**Family History Red Flags:**\n• Sudden death <50 years\n• Syncope with exercise\n• Known channelopathy\n• Defibrillator/pacemaker in family',
    citation: [1, 11],
    summary: 'ECG for all higher-risk BRUE. Long QT (QTc >460), WPW, SVT can cause BRUE. Cardiology consult if abnormal.',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'brue-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition Decision',
    body: '**Discharge Criteria (Low-Risk BRUE):**\n✓ Meets ALL low-risk criteria\n✓ 1-4 hour observation without events\n✓ Normal vital signs and exam\n✓ Parent education completed (CPR, safe sleep)\n✓ Close follow-up arranged (24-48 hours)\n✓ Parents comfortable with discharge\n\n**Admission Criteria:**\n✓ Higher-risk BRUE (any criterion)\n✓ Recurrent events during observation\n✓ Abnormal testing\n✓ NAT concern\n✓ Unable to arrange close follow-up\n✓ Significant parental anxiety\n\nSelect disposition:',
    citation: [1, 3],
    options: [
      { label: 'Discharge — Low-Risk, Observation Complete', next: 'brue-dc-instructions', description: 'Ready for home with follow-up' },
      { label: 'Admit — Higher-Risk or Ongoing Workup', next: 'brue-admit-orders', description: 'Needs monitoring or evaluation' },
      { label: 'Transfer — Needs Higher Level of Care', next: 'brue-transfer', description: 'PICU or children\'s hospital' },
    ],
    summary: 'Low-risk + normal observation = discharge. Higher-risk or recurrent = admit. Transfer if needs subspecialty or PICU.',
  },

  {
    id: 'brue-dc-instructions',
    type: 'result',
    module: 6,
    title: 'Discharge Instructions',
    body: '**Parent Education Checklist:**\n\n☐ **Infant CPR** — hands-on training or video demonstration\n☐ **Safe Sleep** — supine, firm mattress, no bedding\n☐ **When to Return** — written instructions provided\n\n**Return Immediately If:**\n• Another similar event\n• Color change (blue, gray, pale)\n• Breathing difficulty\n• Not feeding well\n• Hard to wake up\n• Fever\n• Stiff or floppy\n\n**Follow-Up:**\n• PCP visit within 24-48 hours\n• Document observation findings\n• Provide copy of any testing (ECG)\n\n**Reassurance:**\n• Recurrence rate ~5% in low-risk\n• Serious underlying condition ~1%\n• "No news is good news" — most do well\n\n**Home Apnea Monitoring:**\n• NOT routinely recommended (AAP)\n• Does not prevent SIDS\n• Consider only in specific high-risk situations',
    recommendation: 'DISCHARGE with close PCP follow-up in 24-48 hours. Provide infant CPR resources (AHA/Red Cross). Written return precautions.',
    confidence: 'definitive',
    citation: [1, 4],
  },

  {
    id: 'brue-admit-orders',
    type: 'result',
    module: 6,
    title: 'Admission Orders — Higher-Risk BRUE',
    body: '**Admission Location:**\n• General pediatrics (most cases)\n• PICU if: recurrent apnea, respiratory failure, hemodynamic instability\n\n**Monitoring:**\n• Continuous cardiorespiratory monitor\n• Pulse oximetry\n• Apnea alarm\n• Frequent VS checks\n\n**Initial Orders:**\n• Blood glucose (bedside)\n• CBC, BMP or VBG\n• 12-lead ECG\n• Continuous SpO2\n\n**Tier 2 Testing (based on suspicion):**\n\n| Concern | Testing |\n|---------|--------|\n| Infection | RSV, pertussis PCR, UA, LP if indicated |\n| NAT | Head CT, skeletal survey, ophthalmology, SW |\n| Seizure | EEG, neurology consult |\n| Cardiac | Echo, Holter, cardiology |\n| Metabolic | Ammonia, lactate, acylcarnitine, urine organic acids |\n| Feeding | Observed feeds, swallow study |\n\n**Consults as Indicated:**\n• Cardiology, neurology, GI, genetics\n• Social work (always if NAT concern)\n• Child life for family support',
    recommendation: 'ADMIT for continuous monitoring. Workup guided by clinical suspicion — avoid indiscriminate testing. Social work if any NAT concern.',
    confidence: 'recommended',
    citation: [3, 6],
  },

  {
    id: 'brue-transfer',
    type: 'result',
    module: 6,
    title: 'Transfer Considerations',
    body: '**Transfer to Children\'s Hospital/PICU if:**\n\n• Recurrent apnea requiring intervention\n• Respiratory failure\n• Hemodynamic instability\n• Suspected NAT requiring child abuse team\n• Complex cardiac, metabolic, or neurologic workup\n• Need for subspecialty expertise not available locally\n\n**Stabilize Before Transfer:**\n• Ensure airway patency\n• Adequate oxygenation (SpO2 >92%)\n• Glucose check and correct if low\n• IV access\n• Continuous monitoring during transport\n\n**Documentation for Accepting Team:**\n• Detailed event description\n• Who witnessed, what they observed\n• Exam findings\n• Testing completed and results\n• Clinical suspicion/concern',
    recommendation: 'TRANSFER if recurrent apnea, instability, or need for subspecialty expertise. Stabilize and provide detailed documentation.',
    confidence: 'recommended',
    citation: [6],
  },

];

export const BRUE_CITATIONS: Citation[] = [
  { num: 1, text: 'Tieder JS, et al. Brief Resolved Unexplained Events (Formerly Apparent Life-Threatening Events) and Evaluation of Lower-Risk Infants. Pediatrics. 2016;137(5):e20160590. AAP Clinical Practice Guideline.' },
  { num: 2, text: 'Brand DA, et al. Brief Resolved Unexplained Event. StatPearls. 2024. NCBI Bookshelf NBK441897.' },
  { num: 3, text: 'Tieder JS, et al. A Framework for Evaluation of the Higher-Risk Infant After a Brief Resolved Unexplained Event. Pediatrics. 2019;144(2):e20184101.' },
  { num: 4, text: 'Children\'s Hospital of Philadelphia. Brief Resolved Unexplained Event (BRUE) Clinical Pathway. 2024.' },
  { num: 5, text: 'Texas Children\'s Hospital. BRUE Evidence-Based Outcomes Center Guideline. 2019.' },
  { num: 6, text: 'Ramgopal S, et al. Brief Resolved Unexplained Events: Practical Evaluation and Management in the Emergency Department. EB Medicine. 2023.' },
  { num: 7, text: 'Hopkins Medicine. Lower-Risk Brief Resolved Unexplained Event (BRUE) Clinical Pathway. 2024.' },
  { num: 8, text: 'Merritt JL, et al. Diagnostic testing for evaluation of brief resolved unexplained events. Pediatr Pulmonol. 2023.' },
  { num: 9, text: 'Pierce MC, et al. TEN-4 FACESp Bruising Rule for Identifying Abuse. Pediatrics. 2021.' },
  { num: 10, text: 'CDC. Pertussis (Whooping Cough) Clinical Features. 2024.' },
  { num: 11, text: 'Ackerman MJ, et al. HRS/EHRA Expert Consensus Statement on Genetic Testing for Channelopathies. Heart Rhythm. 2011.' },
];

export const BRUE_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'BRUE = <1 year, sudden, brief (<1 min), resolved, unexplained — if cause found, not a BRUE', nodeId: 'brue-start' },
  { text: 'Low-risk: >60 days, first event, <1 min, no CPR, normal exam — minimal workup, discharge OK', nodeId: 'brue-low-risk-mgmt' },
  { text: 'Higher-risk (>90% of BRUEs): Admit, tiered workup, prioritize NAT, cardiac, infection', nodeId: 'brue-high-risk-intro' },
  { text: 'ECG for all — screen for long QT, WPW (arrhythmia can cause apnea/BRUE)', nodeId: 'brue-cardiac' },
  { text: 'NAT screening essential — bruising in non-mobile infant = red flag, use TEN-4 FACES', nodeId: 'brue-nat-screen' },
  { text: 'Pertussis test if underimmunized — young infants present with apnea, not classic whoop', nodeId: 'brue-pertussis' },
];
