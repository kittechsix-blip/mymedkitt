// MedKitt — Kratom Withdrawal
// ED management of kratom withdrawal: recognition, COWS assessment,
// treatment selection (buprenorphine vs non-opioid), adjuncts,
// complications monitoring, and disposition.
// 7 modules: Recognition → Assessment → Treatment Selection → Buprenorphine → Non-Opioid → Complications → Disposition
// 24 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction, Citation } from '../../services/tree-service.js';

export const KRATOM_WITHDRAWAL_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Use COWS to assess severity — not validated for kratom but reasonable proxy', nodeId: 'kw-assess' },
  { text: 'Buprenorphine is best-supported treatment for moderate-severe withdrawal', nodeId: 'kw-bup-dosing' },
  { text: 'Clonidine 0.1mg q4-6h is first-line non-opioid option (no cross-dependence)', nodeId: 'kw-clonidine' },
  { text: 'Monitor for cardiac complications — bradycardia, arrhythmias documented at peak (day 3-4)', nodeId: 'kw-cardiac' },
  { text: 'Timeline is LONGER than opioid withdrawal — peak day 3-4, resolution 1-3 weeks', nodeId: 'kw-timeline' },
  { text: 'Ask about product type — high-potency 7-OH products cause more severe withdrawal', nodeId: 'kw-start' },
  { text: 'Avoid naltrexone — can precipitate kratom withdrawal', nodeId: 'kw-precipitated' },
];

export const KRATOM_WITHDRAWAL_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'kw-start',
    type: 'info',
    module: 1,
    title: 'Kratom Withdrawal',
    body: '[Kratom Pharmacology](#/info/kw-pharmacology) — mechanism and why withdrawal occurs.\n\n**Kratom** (Mitragyna speciosa) contains alkaloids that act as partial μ-opioid agonists. Chronic use causes dependence with opioid-like withdrawal on cessation.\n\n**Key differences from opioid withdrawal:**\n• **Milder intensity** but **longer duration** (1-3 weeks vs 5-7 days)\n• Peak symptoms day 3-4 (not day 1-2 like opioids)\n• More prominent neuropsychiatric symptoms (depression, brain fog)\n• Cardiac complications documented (bradycardia, arrhythmias)\n\n**Critical question:** What product type?\n• Traditional leaf/powder: lower risk\n• **Extracts, shots, tinctures with 7-OH**: 5-10x more potent, worse withdrawal\n\n**Threshold for withdrawal:** >3g leaf twice daily for extended period, or any regular use of concentrated products.',
    citation: [1, 2],
    next: 'kw-timeline',
    summary: 'Kratom = partial μ-opioid agonist; withdrawal milder but LONGER than opioids (peak day 3-4); ask about product type (7-OH products = worse)',
  },

  {
    id: 'kw-timeline',
    type: 'info',
    module: 1,
    title: 'Withdrawal Timeline',
    body: '[Timeline Comparison Chart](#/info/kw-timeline-chart)\n\n**Onset:** 6-12 hours after last dose (earlier with high-potency products)\n\n**Peak:** Days 3-4 (median 96 hours)\n• Most intense phase: day 4-7\n• This is LATER than opioid withdrawal (24-36h peak)\n\n**Resolution:**\n• Acute phase: 1-3 days, can extend 4-7 days\n• **Post-acute withdrawal (PAWS):** 2+ weeks of lingering symptoms\n• **Full resolution:** Up to 3 months (much longer than opioid ~1 week)\n\n**Severity correlates with:**\n• Daily dose and frequency\n• Duration of use\n• Product potency (7-OH >> leaf)\n• Co-use with opioids',
    citation: [2, 3],
    next: 'kw-symptoms',
    summary: 'Onset 6-12h, peak day 3-4 (later than opioids), acute phase 4-7 days, PAWS up to 3 months',
    skippable: true,
  },

  {
    id: 'kw-symptoms',
    type: 'info',
    module: 1,
    title: 'Symptom Profile',
    body: '**Similar to opioid withdrawal (78% of users report):**\n• Fatigue, insomnia, anxiety, irritability\n• Myalgias, arthralgias, muscle cramps\n• Lacrimation, rhinorrhea, diaphoresis, mydriasis\n• GI: nausea, vomiting, diarrhea, cramping\n• Tachycardia, restlessness, cravings\n\n**Unique to kratom:**\n• **Prominent neurological symptoms:** tremors, jerky movements, coordination issues\n• **Protracted depression and cognitive impairment** ("brain fog")\n• **Severe fatigue** (86% report this as dominant symptom)\n• Possible seizures (rare, high-dose chronic users)\n• **Cardiac complications:** bradycardia, tachycardia documented\n\n**Why different?**\nKratom has multi-receptor activity (α-adrenergic, serotonergic, dopaminergic + partial μ-opioid) → withdrawal is less intense but more protracted.',
    citation: [1, 4],
    next: 'kw-assess',
    summary: 'Opioid-like symptoms PLUS prominent neuro (tremors, brain fog), severe fatigue (86%), potential cardiac complications',
  },

  // =====================================================================
  // MODULE 2: ASSESSMENT
  // =====================================================================

  {
    id: 'kw-assess',
    type: 'info',
    module: 2,
    title: 'Assessment',
    body: '[COWS Score Calculator](#/calculator/cows)\n\n**Use COWS to assess severity:**\n• NOT formally validated for kratom, but reasonable proxy\n• May not capture kratom-unique features (tremors, coordination, brain fog)\n\n**Supplement COWS with:**\n• Vital signs (tachycardia, hypertension early; bradycardia late)\n• Neuro exam: mydriasis, hyperreflexia, tremor, orientation\n• Timeline of last use and daily dose\n• Product type (leaf vs extract/7-OH)\n• Prior opioid use history\n\n**COWS interpretation for kratom:**\n• 0-4: No withdrawal — observe\n• 5-12: Mild — consider symptomatic treatment\n• 13-24: Moderate — initiate treatment\n• 25+: Severe — aggressive treatment, consider admission',
    citation: [5],
    calculatorLinks: [{ id: 'cows', label: 'COWS Score' }],
    next: 'kw-cows-result',
    summary: 'COWS not validated for kratom but reasonable proxy; supplement with vitals, neuro exam, product type, timeline',
  },

  {
    id: 'kw-cows-result',
    type: 'question',
    module: 2,
    title: 'Severity Assessment',
    body: 'What is the COWS score?',
    calculatorLinks: [{ id: 'cows', label: 'COWS Score' }],
    options: [
      {
        label: 'No withdrawal (COWS 0-4)',
        description: 'Observe, reassess in 2-4 hours',
        next: 'kw-observe',
      },
      {
        label: 'Mild (COWS 5-12)',
        description: 'Symptomatic treatment, outpatient',
        next: 'kw-treatment-choice',
      },
      {
        label: 'Moderate (COWS 13-24)',
        description: 'Initiate treatment, ED observation',
        next: 'kw-treatment-choice',
        urgency: 'urgent',
      },
      {
        label: 'Severe (COWS 25+)',
        description: 'Aggressive treatment, consider admission',
        next: 'kw-treatment-choice',
        urgency: 'critical',
      },
    ],
    summary: 'COWS guides treatment intensity: 0-4 observe, 5-12 symptomatic, 13-24 treat in ED, 25+ consider admission',
  },

  {
    id: 'kw-observe',
    type: 'info',
    module: 2,
    title: 'No Active Withdrawal',
    body: 'COWS 0-4 — no objective signs of withdrawal yet.\n\n**Management:**\n• Observe and reassess COWS in 2-4 hours\n• Withdrawal may evolve as kratom clears (onset 6-12h)\n• Do NOT start buprenorphine — risk of precipitated withdrawal\n\n**Screen for:**\n• Daily kratom dose and product type\n• Co-use with opioids or other substances\n• Readiness for treatment\n\n**If patient reports recent kratom use, withdrawal will likely evolve. Plan for observation or return precautions.**',
    citation: [2],
    next: 'kw-dispo-mild',
    summary: 'COWS 0-4: observe, reassess in 2-4h, do NOT start buprenorphine yet',
  },

  // =====================================================================
  // MODULE 3: TREATMENT SELECTION
  // =====================================================================

  {
    id: 'kw-treatment-choice',
    type: 'question',
    module: 3,
    title: 'Treatment Selection',
    body: '[Treatment Comparison](#/info/kw-treatment-comparison)\n\n**Two pathways:**\n\n**1. Buprenorphine** (best-supported)\n• First-line for moderate-severe withdrawal\n• Displaces kratom alkaloids from μ-opioid receptors\n• Case series show efficacy\n• Consider if: prior opioid use, severe symptoms, patient preference\n\n**2. Non-opioid (clonidine/gabapentin)**\n• First-line for mild-moderate withdrawal\n• No risk of iatrogenic opioid dependence\n• Consider if: opioid-naïve, patient declines opioid therapy, contraindication to buprenorphine\n\n**Patient factors to consider:**\n• Prior opioid use history\n• Daily kratom dose and duration\n• Severity (COWS score)\n• Patient preference',
    citation: [6, 7],
    options: [
      {
        label: 'Buprenorphine pathway',
        description: 'Best-supported for moderate-severe withdrawal',
        next: 'kw-bup-dosing',
        urgency: 'urgent',
      },
      {
        label: 'Non-opioid pathway',
        description: 'Clonidine/gabapentin for mild-moderate or opioid-naïve',
        next: 'kw-clonidine',
      },
    ],
    summary: 'Two pathways: buprenorphine (best-supported, moderate-severe) vs non-opioid (clonidine/gabapentin, mild-moderate or opioid-naïve)',
  },

  // =====================================================================
  // MODULE 4: BUPRENORPHINE PATHWAY
  // =====================================================================

  {
    id: 'kw-bup-dosing',
    type: 'info',
    module: 4,
    title: 'Buprenorphine Dosing',
    body: '[Buprenorphine Dosing Tool](#/info/kw-bup-dosing-tool)\n\n**Mechanism:** High-affinity partial μ-opioid agonist displaces kratom alkaloids, suppresses withdrawal.\n\n**Dosing based on daily kratom use:**\n\n**<20g kratom/day:**\n• Start 4-8 mg SL buprenorphine or 4/1 - 8/2 mg buprenorphine-naloxone\n\n**>40g kratom/day:**\n• Start 12-16 mg SL or 12/3 - 16/4 mg buprenorphine-naloxone\n\n**Titration protocol:**\n1. Confirm COWS ≥8 before first dose\n2. Give initial dose (4-8mg based on severity)\n3. Reassess COWS at 60-90 minutes\n4. If COWS still elevated, give additional 4mg\n5. Can repeat up to 16-24mg on day 1\n\n**Combine with clonidine 0.1mg PRN** for residual adrenergic symptoms.',
    citation: [6, 8],
    treatment: {
      firstLine: {
        drug: 'Buprenorphine or Buprenorphine-Naloxone',
        dose: '4-8 mg SL (low-moderate use) or 12-16 mg SL (high use)',
        route: 'SL',
        frequency: 'Initial dose, then q60-90min PRN',
        duration: 'Day 1: up to 16-24mg; taper over 1-2 weeks',
        notes: 'Wait for COWS ≥8 before first dose. Can combine with clonidine for residual symptoms.',
      },
      monitoring: 'Reassess COWS q60-90min. Watch for sedation. Monitor vitals during titration.',
    },
    next: 'kw-bup-cautions',
    summary: 'Buprenorphine dosing by kratom use: <20g/d start 4-8mg, >40g/d start 12-16mg; wait for COWS ≥8; titrate q60-90min',
  },

  {
    id: 'kw-bup-cautions',
    type: 'info',
    module: 4,
    title: 'Buprenorphine Cautions',
    body: '**Precipitated withdrawal risk:**\n• Wait for COWS ≥8 before initiating\n• Starting too early can precipitate withdrawal\n\n**Iatrogenic dependence concern:**\n• In opioid-naïve kratom users, buprenorphine may create new opioid dependence\n• Consider non-opioid pathway if patient has no prior opioid use history\n• Discuss with patient: short-term treatment vs ongoing MOUD\n\n**Monitoring:**\n• Reassess COWS at 60-90 minutes post-dose\n• Watch for sedation, respiratory depression (rare with buprenorphine ceiling)\n• Monitor vitals during titration\n\n**Duration:**\n• Short-term: 3-7 day taper for acute withdrawal\n• Ongoing MOUD: if patient has OUD or prefers maintenance\n• Arrange follow-up within 72 hours',
    citation: [6, 8],
    next: 'kw-complications',
    summary: 'Wait for COWS ≥8 to avoid precipitated WD; consider iatrogenic dependence risk in opioid-naïve; short-term taper vs ongoing MOUD',
  },

  // =====================================================================
  // MODULE 5: NON-OPIOID PATHWAY
  // =====================================================================

  {
    id: 'kw-clonidine',
    type: 'info',
    module: 5,
    title: 'Clonidine',
    body: '**Mechanism:** α-2A adrenergic agonist reduces sympathetic outflow. **Does NOT produce cross-dependence** with kratom.\n\n**Dosing:**\n• 0.1 mg PO q4-6h PRN\n• Typical max 0.8-1.2 mg/day\n• Can give 0.1 mg IV for rapid effect\n\n**Advantages:**\n• Non-opioid — no risk of iatrogenic opioid dependence\n• Can be used as monotherapy in mild-moderate withdrawal\n• Effective for sympathomimetic symptoms\n• Good safety profile\n\n**Cautions:**\n• Hypotension (hold if SBP <90)\n• Bradycardia (caution in kratom — cardiac complications possible)\n• Sedation\n• Rebound hypertension if stopped abruptly after prolonged use\n\n**Monitor:** BP and HR before each dose. Hold if SBP <90 or HR <50.',
    citation: [7, 9],
    treatment: {
      firstLine: {
        drug: 'Clonidine',
        dose: '0.1 mg',
        route: 'PO (or IV for rapid effect)',
        frequency: 'q4-6h PRN',
        duration: '5-7 days typical',
        notes: 'Hold if SBP <90 or HR <50. Max 0.8-1.2 mg/day. No cross-dependence.',
      },
      monitoring: 'BP and HR before each dose. Hold if SBP <90 or HR <50.',
    },
    next: 'kw-gabapentin',
    summary: 'Clonidine 0.1mg q4-6h PRN (max 0.8-1.2mg/d) — non-opioid, no cross-dependence; hold if SBP <90 or HR <50',
  },

  {
    id: 'kw-gabapentin',
    type: 'info',
    module: 5,
    title: 'Gabapentin & Adjuncts',
    body: '**Gabapentin:**\n• Reduces myalgias, chills, dysphoria, diarrhea, muscle tension\n• Dosing: 300-600 mg q6-8h, titrate to effect\n• Evidence: 1600 mg/day superior to 900 mg/day for opioid withdrawal\n• Good safety profile, no respiratory risk\n• Case report: successful kratom withdrawal in LVAD patient\n\n**Other symptomatic adjuncts:**\n\n• [Loperamide](#/drug/loperamide/opioid withdrawal diarrhea) 2mg initial, then 1mg after each loose stool (max 16mg/day)\n  — CAUTION: QTc prolongation at high doses, do not exceed\n\n• [Ondansetron](#/drug/ondansetron/opioid withdrawal) 4-8 mg q6h PRN for nausea\n\n• **Ibuprofen/Acetaminophen** for myalgias\n\n• **Trazodone** 50-100mg or **melatonin** for insomnia\n\n• **Benzodiazepines** (short-term) for severe agitation or seizure risk',
    citation: [10, 11],
    treatment: {
      firstLine: {
        drug: 'Gabapentin',
        dose: '300-600 mg',
        route: 'PO',
        frequency: 'q6-8h',
        duration: '5-7 days',
        notes: 'Target 1600 mg/day for best efficacy. No respiratory risk.',
      },
      alternative: {
        drug: 'Loperamide',
        dose: '2 mg initial, then 1 mg after each loose stool',
        route: 'PO',
        frequency: 'PRN diarrhea',
        duration: 'As needed',
        notes: 'Max 16 mg/day. CAUTION: QTc prolongation at high doses.',
      },
      monitoring: 'Monitor for sedation with gabapentin. ECG if using loperamide in patients on QTc-prolonging meds.',
    },
    next: 'kw-complications',
    summary: 'Gabapentin 300-600mg q6-8h (target 1600mg/d); adjuncts: loperamide (max 16mg/d), ondansetron, NSAIDs, trazodone',
  },

  // =====================================================================
  // MODULE 6: COMPLICATIONS
  // =====================================================================

  {
    id: 'kw-complications',
    type: 'info',
    module: 6,
    title: 'Complications',
    body: '[Complications Reference](#/info/kw-complications-guide)\n\n**Cardiac (monitor closely):**\n• **Bradycardia** — documented at withdrawal peak (day 3-4), can progress to cardiac arrest\n• Tachycardia (early phase)\n• QTc prolongation (especially with 7-OH products)\n• Consider continuous monitoring if admitted\n\n**Neurological:**\n• Seizures (rare, high-dose chronic users)\n• Delirium with hallucinations\n• Tremors, jerky movements, hyperreflexia\n\n**GI:**\n• Severe dehydration from vomiting/diarrhea\n• Electrolyte imbalance → arrhythmias\n\n**Psychiatric:**\n• Severe depression, suicidality\n• Protracted cognitive impairment (brain fog)\n\n**Hepatic:**\n• Kratom-induced liver injury (cholestatic/mixed pattern)\n• Check LFTs if jaundice or RUQ pain',
    citation: [4, 12],
    next: 'kw-cardiac',
    summary: 'Watch for: bradycardia (peak day 3-4), seizures, delirium, severe dehydration, hepatotoxicity; continuous monitoring if admitted',
    safetyLevel: 'critical',
  },

  {
    id: 'kw-cardiac',
    type: 'info',
    module: 6,
    title: 'Cardiac Monitoring',
    body: '**Documented cardiac complications:**\n• Bradycardia progressing to **cardiac arrest** (day 4 of withdrawal in case report)\n• Tachycardia (early withdrawal)\n• QTc prolongation\n• Brugada syndrome exacerbation (chronic high-dose users)\n• Torsades de pointes (rare)\n\n**When to monitor:**\n• COWS ≥25 (severe)\n• Bradycardia (HR <50) or syncope\n• Known cardiac history\n• High-potency 7-OH product use\n• Concern for electrolyte abnormality\n\n**ICU admission if:**\n• HR <50 with symptoms\n• Arrhythmia on ECG\n• Hemodynamic instability\n• Altered mental status\n\n**Obtain ECG** in all moderate-severe presentations to assess QTc.',
    citation: [4, 12],
    next: 'kw-precipitated',
    summary: 'Cardiac arrest documented at peak (day 3-4); ECG for QTc; ICU if HR <50 with symptoms, arrhythmia, or instability',
    safetyLevel: 'critical',
  },

  {
    id: 'kw-precipitated',
    type: 'info',
    module: 6,
    title: 'Precipitated Withdrawal',
    body: '**Naltrexone risk:**\n• Naltrexone can **precipitate kratom withdrawal** similar to opioid withdrawal\n• Documented case report: severe withdrawal symptoms after naltrexone administration\n\n**Management:**\n• If patient on naltrexone and develops kratom withdrawal symptoms, supportive care only\n• If planning to start naltrexone for OUD, **taper kratom first**\n• Use buprenorphine bridge if transition needed\n\n**Buprenorphine precipitated withdrawal:**\n• Less common with kratom than with full opioid agonists\n• Still wait for COWS ≥8 before initiating\n• Start with lower dose (4mg) and titrate',
    citation: [13],
    next: 'kw-severe',
    summary: 'Naltrexone can precipitate kratom withdrawal — taper kratom before starting; wait for COWS ≥8 before buprenorphine',
  },

  {
    id: 'kw-severe',
    type: 'info',
    module: 6,
    title: 'Severe Cases — ICU',
    body: '**Dexmedetomidine for severe agitation/delirium:**\n• Mechanism: Central α-2A agonist, sedating + analgesic\n• Preserves respiratory drive\n• Dosing: 0.5-1.4 μg/kg/h IV infusion\n\n**Case report:** Kratom withdrawal delirium (CIWA-AR 39, confusion, hallucinations) managed with dexmedetomidine + lorazepam; discharged after 48 hours.\n\n**ICU admission criteria:**\n• COWS >24 with vital instability\n• Acute agitation/delirium requiring pharmacologic control\n• Seizures\n• Cardiac arrhythmias, bradycardia with symptoms\n• Intractable vomiting with dehydration\n• Altered mental status, hallucinations\n\n**Methadone:**\n• Alternative to buprenorphine if contraindicated\n• Higher abuse potential, drug-drug interactions\n• Expert consultation recommended',
    citation: [14],
    treatment: {
      firstLine: {
        drug: 'Dexmedetomidine',
        dose: '0.5-1.4 μg/kg/h',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until agitation controlled (typically 24-48h)',
        notes: 'For severe agitation/delirium. Preserves respiratory drive. ICU setting.',
      },
      monitoring: 'Continuous cardiac monitoring. Sedation level. BP for hypotension. Can add lorazepam if needed.',
    },
    next: 'kw-dispo',
    summary: 'Dexmedetomidine 0.5-1.4 μg/kg/h IV for severe agitation/delirium; ICU if COWS >24 + instability, seizures, arrhythmias, AMS',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 7: DISPOSITION
  // =====================================================================

  {
    id: 'kw-dispo',
    type: 'question',
    module: 7,
    title: 'Disposition',
    body: 'Select disposition based on severity and response to treatment.',
    options: [
      {
        label: 'Discharge — mild, responding to treatment',
        description: 'COWS <13, stable vitals, tolerating PO',
        next: 'kw-dispo-mild',
      },
      {
        label: 'ED observation — moderate',
        description: 'COWS 13-24, needs treatment titration',
        next: 'kw-dispo-moderate',
        urgency: 'urgent',
      },
      {
        label: 'Admit — severe or complications',
        description: 'COWS >24, vital instability, cardiac/neuro concerns',
        next: 'kw-dispo-admit',
        urgency: 'critical',
      },
    ],
    summary: 'Disposition by severity: mild=discharge with meds, moderate=ED observation, severe=admit',
  },

  {
    id: 'kw-dispo-mild',
    type: 'result',
    module: 7,
    title: 'Discharge — Mild',
    body: '**Discharge criteria met:**\n• COWS <13 or improving\n• Stable vital signs\n• Tolerating oral intake\n• No cardiac or neurological concerns\n\n**Discharge with:**\n• Clonidine 0.1mg PO q6h PRN x 5-7 days\n• Gabapentin 300mg TID x 5-7 days (if prescribed)\n• Loperamide PRN for diarrhea\n• Ondansetron PRN for nausea\n• Ibuprofen/acetaminophen PRN for myalgias\n\n**Patient education:**\n• Withdrawal peak is day 3-4 — symptoms may worsen before improving\n• Return if: chest pain, palpitations, severe vomiting, confusion, seizure\n• PAWS can last weeks — mood symptoms normal\n\n**Follow-up:**\n• PCP or addiction medicine within 1 week\n• Consider counseling/support resources',
    recommendation: 'Discharge with clonidine 0.1mg q6h PRN, gabapentin 300mg TID, symptomatic meds. Warn: peak day 3-4. Return precautions for cardiac/neuro symptoms. Follow-up in 1 week.',
    confidence: 'recommended',
    citation: [2, 7],
  },

  {
    id: 'kw-dispo-moderate',
    type: 'result',
    module: 7,
    title: 'ED Observation',
    body: '**ED observation indicated:**\n• COWS 13-24\n• Needs treatment titration (buprenorphine or clonidine)\n• Monitoring for complications\n\n**Observation plan:**\n• 6-12 hour observation period\n• Reassess COWS q2-4h\n• Titrate buprenorphine or clonidine as needed\n• IV fluids if dehydrated\n• ECG to assess QTc\n\n**Discharge when:**\n• COWS <13 and stable for 2+ hours\n• Tolerating PO\n• Stable vitals\n• Follow-up arranged\n\n**Escalate to admission if:**\n• COWS worsening despite treatment\n• Vital sign instability\n• Cardiac or neurological concerns emerge',
    recommendation: 'ED observation 6-12h. Titrate treatment, reassess COWS q2-4h. ECG for QTc. Discharge when COWS <13 and stable x2h. Escalate if worsening or complications.',
    confidence: 'recommended',
    citation: [4, 6],
  },

  {
    id: 'kw-dispo-admit',
    type: 'result',
    module: 7,
    title: 'Admit',
    body: '**Admission indicated:**\n• COWS >24 with vital instability\n• Cardiac concerns (bradycardia, arrhythmia, QTc prolongation)\n• Seizure or seizure risk\n• Severe agitation/delirium requiring IV medications\n• Intractable vomiting with dehydration\n• Altered mental status\n• Unable to tolerate PO\n• Inadequate social support for outpatient management\n\n**Admission orders:**\n• Continuous cardiac monitoring\n• Buprenorphine or clonidine per pathway\n• IV fluids, electrolyte repletion\n• Dexmedetomidine if severe agitation\n• Gabapentin, symptomatic adjuncts\n• Serial COWS q4-6h\n• ECG on admission, repeat if QTc prolonged\n\n**Consults:**\n• Addiction medicine (if available)\n• Toxicology (for severe/complicated cases)\n\n**Expected stay:** 24-72 hours for most; longer if ICU-level care needed.',
    recommendation: 'Admit with continuous cardiac monitoring. Buprenorphine or clonidine pathway. IV fluids. Dexmedetomidine if severe agitation. Serial COWS q4-6h. Addiction medicine consult.',
    confidence: 'definitive',
    citation: [4, 14],
  },

];

export const KRATOM_WITHDRAWAL_NODE_COUNT = KRATOM_WITHDRAWAL_NODES.length;

// -------------------------------------------------------------------
// Module Labels
// -------------------------------------------------------------------

export const KRATOM_WITHDRAWAL_MODULE_LABELS = [
  'Recognition',
  'Assessment',
  'Treatment Selection',
  'Buprenorphine',
  'Non-Opioid',
  'Complications',
  'Disposition',
];

// -------------------------------------------------------------------
// Citations
// -------------------------------------------------------------------

export const KRATOM_WITHDRAWAL_CITATIONS: Citation[] = [
  { num: 1, text: 'Prozialeck WC, et al. An update on the clinical pharmacology of kratom: uses, abuse potential, and future considerations. Pharmacol Res. 2024;200:107066.' },
  { num: 2, text: 'Garcia-Romeu A, et al. Kratom withdrawal: Discussions and conclusions of a scientific expert forum. Drug Alcohol Depend. 2023;248:109927.' },
  { num: 3, text: 'American Addiction Centers. Kratom Withdrawal Symptoms, Timeline & Detox Treatment. 2025.' },
  { num: 4, text: 'Eggleston W, et al. The acute adverse health effects of kratom. Front Pharmacol. 2025;16:1620601.' },
  { num: 5, text: 'Wesson DR, Ling W. The Clinical Opiate Withdrawal Scale (COWS). J Psychoactive Drugs. 2003;35(2):253-259.' },
  { num: 6, text: 'Khanna IK, Pillarisetti S. Treatment of Kratom Withdrawal and Dependence With Buprenorphine/Naloxone: A Case Series. J Addict Med. 2020;14(6):e284-e286.' },
  { num: 7, text: 'Caputo F, et al. Methadone, Buprenorphine, and Clonidine Attenuate Mitragynine Withdrawal in Rats. Front Pharmacol. 2021;12:708019.' },
  { num: 8, text: 'Shetty A, et al. The successful use of buprenorphine to manage kratom withdrawal. J Subst Use Addict Treat. 2025;172:209552.' },
  { num: 9, text: 'EMCrit IBCC. Alpha-2 Agonist Toxidrome. 2025.' },
  { num: 10, text: 'Sanders N, et al. Gabapentin for the treatment of opioid withdrawal. Psychiatry Res. 2022;314:114646.' },
  { num: 11, text: 'FDA. Loperamide: Drug Safety Communication. 2018.' },
  { num: 12, text: 'CDC MMWR. Increases in Kratom-Related Reports to Poison Centers. 2025;75(11).' },
  { num: 13, text: 'Veltri CA, et al. Precipitated withdrawal with kratom use following naltrexone. J Opioid Manag. 2023;19(4):335-338.' },
  { num: 14, text: 'ACEP Now. Case Report: Acute Kratom Withdrawal. 2024.' },
];
