// MedKitt - ED Methadone Management
// Methadone in the ED: bridging for OTP patients, initiation under the 72-hour rule,
// dose verification, QTc monitoring, and OTP linkage.
// 5 modules: Patient Assessment -> Verification -> Dosing -> Monitoring -> Disposition
// 28 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from '../../services/tree-service.js';

export const ED_METHADONE_NODES: DecisionNode[] = [

  // ===================================================================
  // MODULE 1 - Patient Assessment (5 nodes)
  // ===================================================================

  {
    id: 'meth-start',
    type: 'info',
    module: 1,
    title: 'ED Methadone Management',
    body: '[ED Methadone Steps Summary](#/info/ed-methadone-summary)\n\nMethadone is a full mu-opioid agonist used for opioid use disorder (OUD) maintenance therapy. Unlike buprenorphine, methadone can only be dispensed for OUD maintenance through licensed Opioid Treatment Programs (OTPs). [1]\n\nHowever, the **72-hour rule** (21 CFR 1306.07(b)) allows any DEA-registered provider to administer or dispense up to a **3-day supply** of methadone for emergency withdrawal management while arranging OTP linkage. [2][3]\n\n**2023 DEA Rule Update:** Practitioners may now **dispense** (provide take-home doses) rather than only administer methadone under this rule, expanding ED flexibility. [3]',
    citation: [1, 2, 3],
    calculatorLinks: [{ id: 'cows', label: 'COWS Score' }],
    next: 'meth-scenario',
    summary: '72-hour rule allows any DEA provider to administer/dispense 3-day methadone for withdrawal',
  },

  {
    id: 'meth-scenario',
    type: 'question',
    module: 1,
    title: 'Clinical Scenario',
    body: 'What is the clinical scenario?',
    options: [
      {
        label: 'Established OTP patient - missed dose',
        description: '"Guest dosing" - patient on methadone maintenance who missed clinic',
        next: 'meth-guest-verify',
      },
      {
        label: 'Opioid withdrawal - initiation candidate',
        description: 'New patient with OUD, not currently on methadone',
        next: 'meth-init-screen',
      },
      {
        label: 'Known methadone patient - unclear dose',
        description: 'Cannot confirm dose with OTP',
        next: 'meth-unclear-dose',
      },
      {
        label: 'Bridging during hospitalization',
        description: 'Inpatient needing methadone continuation',
        next: 'meth-inpatient',
      },
    ],
    summary: 'Determine: established OTP patient, new initiation candidate, unclear dose, or inpatient bridging',
  },

  {
    id: 'meth-init-screen',
    type: 'question',
    module: 1,
    title: 'Initiation Eligibility',
    body: '**Exclusion criteria for ED methadone initiation:**\n\n- Altered mental status (intoxication, psychosis, delirium)\n- Respiratory depression or respiratory rate < 12\n- Known prolonged QTc (> 500 ms) or Torsades history\n- Active sedative/alcohol intoxication\n- Concurrent benzodiazepine or sedative-hypnotic withdrawal\n\n**Note:** Screening ECG is not required for initial low-dose methadone. QTc prolongation risk from a single 30-40 mg dose is minimal. [4][5]',
    citation: [4, 5],
    options: [
      {
        label: 'Eligible for initiation',
        description: 'No exclusion criteria present',
        next: 'meth-vs-bup',
      },
      {
        label: 'Exclusion criteria present',
        description: 'Consider alternatives',
        next: 'meth-alt-approach',
        urgency: 'urgent',
      },
    ],
    summary: 'Exclude AMS, respiratory depression, QTc >500, active sedative intoxication before initiation',
    safetyLevel: 'warning',
  },

  {
    id: 'meth-vs-bup',
    type: 'question',
    module: 1,
    title: 'Methadone vs Buprenorphine',
    body: '**Buprenorphine is generally preferred** for ED-initiated MOUD due to superior safety profile and lower regulatory burden. [6]\n\n**Consider methadone when:**\n- High-potency synthetic opioid (HPSO/fentanyl) use with high precipitated withdrawal risk\n- Prior buprenorphine induction failures\n- Patient preference for methadone\n- Very high opioid tolerance\n- Active fentanyl use with inability to abstain for buprenorphine induction\n\n[Opioid Withdrawal Consult](#/tree/opioid-withdrawal) - includes buprenorphine protocols',
    citation: [6, 7],
    calculatorLinks: [{ id: 'cows', label: 'COWS Score' }],
    options: [
      {
        label: 'Proceed with methadone initiation',
        description: 'Clinical scenario favors methadone',
        next: 'meth-init-dose',
      },
      {
        label: 'Consider buprenorphine instead',
        description: 'Lower risk, more flexible',
        next: 'meth-bup-redirect',
      },
    ],
    summary: 'Buprenorphine generally preferred — methadone when fentanyl use or prior bup induction failures',
  },

  {
    id: 'meth-bup-redirect',
    type: 'result',
    module: 1,
    title: 'Buprenorphine Preferred',
    body: '**Buprenorphine advantages:**\n- Partial agonist ceiling effect (safer in overdose)\n- No QTc prolongation\n- Any DEA-licensed provider can prescribe (no OTP required)\n- Bridge prescription can be written at discharge\n- Better evidence for ED-initiated treatment engagement [6]\n\n**For buprenorphine protocols, see:**\n[Opioid Withdrawal Consult](#/tree/opioid-withdrawal)\n\n**If buprenorphine precipitated withdrawal is a concern:**\n- Consider microdosing (Bernese method)\n- Use methadone for 72-hour bridge during buprenorphine micro-induction',
    recommendation: 'Buprenorphine is first-line for most ED MOUD initiations. See Opioid Withdrawal consult for protocols.',
    confidence: 'recommended',
    citation: [6],
    summary: 'Buprenorphine is safer (partial agonist ceiling), no OTP required, better evidence for ED initiation',
  },

  // ===================================================================
  // MODULE 2 - Verification (5 nodes)
  // ===================================================================

  {
    id: 'meth-guest-verify',
    type: 'info',
    module: 2,
    title: 'OTP Dose Verification',
    body: '**Guest dosing** = administering methadone to a patient who is already enrolled in an OTP but cannot access their usual clinic.\n\n**Verification is critical.** Patients may:\n- Overstate their dose (risk of respiratory depression)\n- Have been discharged from their program\n- Have last-dosed more recently than reported\n\n**To verify:**\n1. Call the OTP directly (patient should have clinic contact info)\n2. Confirm: current enrollment, last dose date, and current daily dose\n3. Document the verification in the chart\n\n**If OTP is closed** (weekend/holiday): proceed to "Unable to Verify" pathway.',
    next: 'meth-verify-result',
    summary: 'Always verify dose with OTP before guest dosing — patients may overstate dose',
    safetyLevel: 'warning',
  },

  {
    id: 'meth-verify-result',
    type: 'question',
    module: 2,
    title: 'Verification Outcome',
    body: 'Were you able to verify the patient\'s methadone dose with their OTP?',
    options: [
      {
        label: 'Dose confirmed by OTP',
        description: 'Clinic confirmed enrollment and current dose',
        next: 'meth-guest-dose',
      },
      {
        label: 'Unable to verify (clinic closed)',
        description: 'Weekend, holiday, or after hours',
        next: 'meth-unverified-dose',
      },
      {
        label: 'Patient not currently enrolled',
        description: 'Discharged or never enrolled at claimed clinic',
        next: 'meth-not-enrolled',
        urgency: 'urgent',
      },
    ],
    summary: 'Determine if OTP verified the dose, clinic is closed, or patient is not enrolled',
  },

  {
    id: 'meth-unclear-dose',
    type: 'info',
    module: 2,
    title: 'Uncertain Methadone Dose',
    body: 'When a patient claims to be on methadone maintenance but dose cannot be verified:\n\n**Do NOT administer the patient\'s claimed full dose.** Risk of respiratory depression if dose is overstated.\n\n**Safe approach:**\n- Give conservative dose (20-30 mg) regardless of claimed dose\n- Explain rationale to patient\n- Document inability to verify\n- Arrange OTP follow-up for proper dosing\n\n**Red flags for dose overstatement:**\n- Very high claimed dose (>120 mg) without tolerance signs\n- No withdrawal symptoms despite claiming to have missed doses\n- History of methadone diversion\n- Recent incarceration or hospitalization (tolerance may have decreased)',
    next: 'meth-unverified-dose',
    summary: 'When dose unverified, give conservative 20-30mg regardless of claimed dose — safety first',
    safetyLevel: 'warning',
  },

  {
    id: 'meth-not-enrolled',
    type: 'result',
    module: 2,
    title: 'Not Currently Enrolled in OTP',
    body: 'Patient is **not enrolled** in claimed methadone program. This changes the clinical approach significantly.\n\n**Options:**\n1. **Treat as new initiation** under 72-hour rule if withdrawal present (COWS >= 8)\n2. **Buprenorphine induction** (preferred for most patients)\n3. **Symptomatic treatment** only with non-opioid adjuncts\n\n**Do NOT give high-dose methadone** without verified tolerance. Risk of fatal respiratory depression.\n\n**Consider why enrollment lapsed:**\n- Administrative discharge (missed doses, positive UDS for other substances)\n- Financial barriers\n- Transportation issues\n- Program capacity',
    recommendation: 'Patient not enrolled in OTP. Treat as new initiation (max 30 mg) or consider buprenorphine. Do not give high-dose methadone without verified tolerance.',
    confidence: 'definitive',
    citation: [4],
    summary: 'Not enrolled in OTP — treat as new initiation (max 30mg) or consider buprenorphine instead',
    safetyLevel: 'warning',
  },

  {
    id: 'meth-inpatient',
    type: 'result',
    module: 2,
    title: 'Inpatient Methadone Continuation',
    body: '**Hospitalized patients on methadone maintenance** should continue their methadone to prevent withdrawal and facilitate treatment of their primary medical condition.\n\n**Verification required:** Confirm dose with OTP before administering.\n\n**If verified:** Continue home dose (QTc monitoring if >100 mg or other risk factors).\n\n**If unverified:** Use conservative dose (30-40 mg) and verify on next business day.\n\n**Key points:**\n- Most hospitals can administer methadone for OUD maintenance to inpatients\n- Inpatient administration is not restricted by OTP regulations\n- Coordinate with OTP for discharge planning\n- Do not abruptly discontinue methadone (severe withdrawal, AMA risk)\n\n**On discharge:** Patient must return to OTP or use 72-hour rule for bridging.',
    recommendation: 'Continue verified methadone dose during hospitalization. Coordinate discharge with OTP. Do not abruptly discontinue.',
    confidence: 'definitive',
    citation: [2, 8],
    summary: 'Continue verified methadone during hospitalization — abrupt discontinuation causes severe withdrawal',
  },

  // ===================================================================
  // MODULE 3 - Dosing (7 nodes)
  // ===================================================================

  {
    id: 'meth-guest-dose',
    type: 'result',
    module: 3,
    title: 'Verified Guest Dose',
    body: '[Methadone](#/drug/methadone/guest dose) - Administer the **verified daily dose**.\n\n**Protocol:**\n1. Give single daily dose as confirmed by OTP\n2. Observe for at least 30 minutes post-administration\n3. Patient may return tomorrow if clinic still closed (72-hour rule)\n4. Document OTP verification, dose given, and plan\n\n**If dose >100 mg:** Consider ECG before administration if not recently checked.\n\n**ED length of stay:** Patients presenting for guest dosing typically have length of stay comparable to other low-acuity visits. [9]',
    recommendation: 'Administer verified OTP dose. Observe 30 min. May return daily for up to 72 hours until OTP reopens.',
    confidence: 'definitive',
    citation: [9],
    treatment: {
      firstLine: {
        drug: 'Methadone',
        dose: 'Verified OTP dose',
        route: 'PO',
        frequency: 'Once daily',
        duration: 'Up to 72 hours until OTP accessible',
        notes: 'Must verify dose with OTP. Observe 30 min post-dose.',
      },
      monitoring: 'Observe 30 minutes. ECG if dose >100 mg or other QTc risk factors. Document OTP verification.',
    },
    summary: 'Administer verified OTP dose, observe 30 min, may return daily for up to 72h',
  },

  {
    id: 'meth-unverified-dose',
    type: 'result',
    module: 3,
    title: 'Unverified/Conservative Dosing',
    body: '[Methadone](#/drug/methadone/unverified dose) **30 mg PO** (conservative dose)\n\n**When dose cannot be verified:**\n- Give 30 mg regardless of claimed dose\n- Explain to patient: "We can\'t verify your dose, so we\'re giving a safe amount that will prevent severe withdrawal"\n- Most patients on maintenance will not experience significant intoxication from 30 mg\n- Arrange verification and proper dosing at next OTP visit\n\n**If symptoms persist after 30 mg:**\n- Wait 2-4 hours before additional dosing\n- May give additional 10 mg (max 40 mg on Day 1 if unverified)\n- Reassess COWS score',
    recommendation: 'Methadone 30 mg PO when dose unverified. May add 10 mg after 2-4h if needed (max 40 mg Day 1 unverified).',
    confidence: 'recommended',
    citation: [4, 10],
    calculatorLinks: [{ id: 'cows', label: 'COWS Score' }],
    treatment: {
      firstLine: {
        drug: 'Methadone',
        dose: '30 mg',
        route: 'PO',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Conservative dose when OTP dose cannot be verified',
      },
      alternative: {
        drug: 'Methadone',
        dose: '10 mg',
        route: 'PO',
        frequency: 'Once after 2-4 hours if needed',
        duration: 'Max 40 mg Day 1 if unverified',
        notes: 'Only if withdrawal symptoms persist',
      },
      monitoring: 'COWS score before and after dosing. Respiratory rate, SpO2, sedation level. Observe 30 min minimum.',
    },
    summary: 'Give 30mg PO when unverified — may add 10mg after 2-4h if COWS still elevated (max 40mg Day 1)',
  },

  {
    id: 'meth-init-dose',
    type: 'info',
    module: 3,
    title: 'Methadone Initiation Dosing',
    body: '**72-Hour Rule Initiation Protocol:**\n\nUnder 21 CFR 1306.07(b), ED physicians may administer or dispense up to 3 days of methadone for withdrawal management while arranging OTP linkage. [2][3]\n\n**Standard starting dose:** 30 mg PO [4]\n\n**Reduce to 20 mg if:**\n- Opioid use within prior 4 hours\n- Currently using sedatives (benzodiazepines, alcohol)\n- Significant drug interactions (CYP3A4 inhibitors)\n- Elderly or debilitated\n- Significant hepatic impairment\n\n**In the HPSO/fentanyl era:** Some protocols use rapid titration with starting doses of 30 mg followed by 10 mg increments to achieve symptom control. [11]',
    citation: [2, 3, 4, 11],
    calculatorLinks: [{ id: 'cows', label: 'COWS Score' }],
    next: 'meth-init-protocol',
    summary: 'Standard starting dose 30mg PO — reduce to 20mg if recent opioid use or concurrent sedatives',
  },

  {
    id: 'meth-init-protocol',
    type: 'result',
    module: 3,
    title: 'ED Methadone Initiation Protocol',
    body: '[Methadone](#/drug/methadone/ed initiation) **30 mg PO** initial dose\n\n**Day 1 Protocol:**\n1. Confirm COWS >= 8 before dosing\n2. Give [Methadone](#/drug/methadone/ed initiation) 30 mg PO\n3. Observe 2-4 hours\n4. If COWS remains >= 13: may give additional 10 mg (max 40 mg Day 1)\n5. Observe 30 min after each dose\n\n**Day 2-3 (if dispensing for take-home):**\n- Day 2: 40 mg\n- Day 3: 40 mg\n- Dispense with clear instructions\n- OTP appointment must be within 72 hours\n\n**If 72-hour linkage not possible:** Consider buprenorphine (can prescribe longer bridge without OTP).\n\n**Documentation:** Record 72-hour rule use, OTP referral, and follow-up plan.',
    recommendation: 'Methadone 30 mg PO Day 1 (max 40 mg). Days 2-3: 40 mg. Must link to OTP within 72 hours.',
    confidence: 'recommended',
    citation: [3, 4, 11],
    treatment: {
      firstLine: {
        drug: 'Methadone',
        dose: '30 mg',
        route: 'PO',
        frequency: 'Day 1 initial dose',
        duration: '72-hour bridge',
        notes: 'May add 10 mg after 2-4h if COWS >= 13 (max 40 mg Day 1)',
      },
      monitoring: 'COWS before and after dosing. Respiratory rate q1h x 4h after first dose. SpO2. Sedation level. QTc if risk factors.',
    },
    summary: 'Day 1: 30mg (max 40mg), Days 2-3: 40mg — must link to OTP within 72 hours',
  },

  {
    id: 'meth-rapid-titration',
    type: 'info',
    module: 3,
    title: 'Rapid Titration (HPSO Era)',
    body: '**In the fentanyl era,** patients with high-potency synthetic opioid (HPSO) dependence often require higher doses for adequate symptom control. [11][12]\n\n**Rapid titration approach:**\n- Start 30 mg\n- Assess COWS every 1-2 hours\n- Additional 10 mg increments as needed\n- Goal: COWS < 8\n- Typical effective range: 50-70 mg by end of Day 1-2 [12]\n\n**Bridge clinic data (2024-2025):**\n- Mean starting dose: 51.6 mg\n- Mean dose at second visit: 60.9 mg\n- Mean dose at third visit: 67.1 mg\n- 96.9% successfully linked to OTP [12]\n\n**Caution:** Higher doses increase QTc and respiratory depression risk. Use with appropriate monitoring.',
    citation: [11, 12],
    calculatorLinks: [{ id: 'cows', label: 'COWS Score' }],
    next: 'meth-monitoring',
    summary: 'Fentanyl-era rapid titration: 30mg start, 10mg increments — typical effective range 50-70mg',
    skippable: true,
  },

  {
    id: 'meth-alt-approach',
    type: 'result',
    module: 3,
    title: 'Alternative Approaches',
    body: '**When methadone is contraindicated or not appropriate:**\n\n**Option 1: Buprenorphine**\n- First-line for most ED MOUD initiations\n- Safer (partial agonist ceiling)\n- No QTc prolongation\n- Can prescribe bridge without OTP linkage\n- [Opioid Withdrawal Consult](#/tree/opioid-withdrawal)\n\n**Option 2: Symptomatic management only**\n- [Clonidine](#/drug/clonidine/opioid withdrawal) 0.1-0.3 mg PO q1h PRN (max 0.8 mg/day)\n- Antiemetics (ondansetron)\n- Antidiarrheals (loperamide)\n- NSAIDs for myalgias\n- Benzodiazepines for severe agitation\n\n**Option 3: Observation + delayed initiation**\n- Treat acute contraindication (intoxication, AMS)\n- Reassess when resolved\n- Then proceed with appropriate MOUD',
    recommendation: 'If methadone contraindicated: consider buprenorphine (preferred) or symptomatic treatment with non-opioid adjuncts.',
    confidence: 'recommended',
    citation: [6],
    summary: 'If methadone contraindicated: buprenorphine preferred, or clonidine + symptomatic management',
  },

  {
    id: 'meth-dosing-special',
    type: 'info',
    module: 3,
    title: 'Special Populations',
    body: '**Pregnancy:**\n- Methadone is preferred over buprenorphine in pregnancy (longer track record)\n- Do NOT discontinue methadone in pregnant patients (risk of fetal distress, preterm labor)\n- Continue home dose and coordinate with OB and OTP\n- Higher doses often needed in third trimester (increased metabolism)\n\n**Hepatic impairment:**\n- Reduce dose by 50% in severe liver disease\n- Monitor for accumulation (long half-life)\n\n**Renal impairment:**\n- Minimal dose adjustment needed (hepatic metabolism)\n- Monitor for accumulation in severe CKD\n\n**Elderly:**\n- Start low (10-20 mg)\n- Slower titration\n- Higher risk of respiratory depression\n- QTc monitoring more important',
    next: 'meth-monitoring',
    summary: 'Pregnancy: methadone preferred, do NOT discontinue. Liver disease: reduce dose 50%',
    skippable: true,
    safetyLevel: 'warning',
  },

  // ===================================================================
  // MODULE 4 - Monitoring (5 nodes)
  // ===================================================================

  {
    id: 'meth-monitoring',
    type: 'info',
    module: 4,
    title: 'Monitoring Protocol',
    body: '**Post-dose monitoring:**\n- Respiratory rate: q15-30 min x 2h, then q1h x 2h\n- SpO2: continuous or q30 min\n- Sedation: assess response to verbal/tactile stimuli\n- COWS score: before and 2-4 hours after dosing\n\n**Observation duration:**\n- First dose: minimum 2-4 hours\n- Subsequent doses: minimum 30-60 minutes if patient known tolerant\n- Guest dosing (verified): 30 minutes minimum\n\n**Red flags requiring intervention:**\n- RR < 10\n- SpO2 < 92%\n- Excessive sedation (difficult to arouse)\n- Slurred speech, ataxia',
    calculatorLinks: [{ id: 'cows', label: 'COWS Score' }],
    next: 'meth-qtc-risk',
    summary: 'Monitor RR q15-30min x 2h, SpO2 continuous, COWS before and 2-4h after dosing',
  },

  {
    id: 'meth-qtc-risk',
    type: 'info',
    module: 4,
    title: 'QTc Prolongation Risk',
    body: '**Methadone prolongs QTc in a dose-dependent manner.** [13]\n\n**When to obtain ECG:**\n- Dose > 100 mg/day\n- Combining with other QT-prolonging drugs\n- History of cardiac disease, syncope, or arrhythmia\n- Family history of long QT syndrome\n- Electrolyte abnormalities (hypoK, hypoMg)\n\n**When ECG NOT required:**\n- Single dose <= 40 mg in otherwise healthy patient\n- Known stable maintenance dose without prior QTc issues\n- Guest dosing at verified usual dose\n\n**QTc thresholds:**\n- < 450 ms: Low risk\n- 450-499 ms: Moderate risk (discuss risks/benefits, monitor)\n- >= 500 ms: High risk (avoid methadone if possible, cardiology consult)',
    citation: [13, 14],
    next: 'meth-qtc-meds',
    summary: 'ECG if dose >100mg or QT-prolonging drugs — QTc ≥500ms: avoid methadone, cardiology consult',
    skippable: true,
    safetyLevel: 'warning',
  },

  {
    id: 'meth-qtc-meds',
    type: 'info',
    module: 4,
    title: 'QT-Prolonging Drug Interactions',
    body: '**Common QT-prolonging medications in OUD patients:**\n\n- [Ondansetron](#/drug/ondansetron/opioid withdrawal) (often used for withdrawal nausea)\n- [Loperamide](#/drug/loperamide/opioid withdrawal) (especially at high/abused doses)\n- **Antipsychotics:** haloperidol, quetiapine, ziprasidone\n- **Antidepressants:** citalopram, escitalopram, amitriptyline\n- **Antibiotics:** fluoroquinolones, azithromycin\n- **Antiemetics:** prochlorperazine, promethazine\n\n**CYP3A4 inhibitors (increase methadone levels):**\n- Fluconazole, ketoconazole\n- Erythromycin, clarithromycin\n- Ritonavir, other HIV PIs\n- Grapefruit juice\n\n**CYP3A4 inducers (decrease methadone levels):**\n- Rifampin (most significant)\n- Phenytoin, carbamazepine, phenobarbital\n- Efavirenz, nevirapine',
    citation: [13],
    next: 'meth-resp-depression',
    summary: 'Common QTc interactions: ondansetron, antipsychotics, fluoroquinolones, CYP3A4 inhibitors',
    skippable: true,
  },

  {
    id: 'meth-resp-depression',
    type: 'info',
    module: 4,
    title: 'Respiratory Depression Management',
    body: '**Methadone respiratory depression:**\n- May be delayed (peak effect 3-4h after PO dosing)\n- Prolonged (half-life 8-59 hours)\n- No ceiling effect (unlike buprenorphine)\n\n**If respiratory depression occurs:**\n1. Stimulate patient, support airway\n2. [Naloxone](#/drug/naloxone/opioid toxicity) - but be prepared for prolonged infusion\n3. Initial: 0.04-0.4 mg IV (titrate to RR, not full reversal)\n4. Infusion may be needed: 0.25-0.5 mg/hour\n5. Monitor for at least 8-12 hours after last methadone dose\n\n**Avoid full reversal** if possible - precipitates severe withdrawal and likely patient leaving AMA.\n\n**Prevention:**\n- Conservative dosing when dose unverified\n- Extended observation after first dose\n- Caution with concurrent sedatives',
    next: 'meth-disposition',
    summary: 'Methadone respiratory depression may be DELAYED (peak 3-4h) and PROLONGED (t1/2 8-59h)',
    safetyLevel: 'critical',
  },

  {
    id: 'meth-overdose',
    type: 'result',
    module: 4,
    title: 'Methadone Toxicity/Overdose',
    body: '**Signs of methadone toxicity:**\n- Miosis, sedation, slurred speech\n- Respiratory depression (RR < 12)\n- Hypotension\n- QTc prolongation, Torsades de Pointes\n\n**Management:**\n1. Airway support (BVM, intubation if needed)\n2. [Naloxone](#/drug/naloxone/opioid overdose) 0.04-0.4 mg IV titrated to respiratory effort\n3. **Continuous naloxone infusion** often needed: 0.25-0.5 mg/hr\n4. Cardiac monitoring (QTc, arrhythmias)\n5. Correct electrolytes (K+, Mg2+)\n6. **Prolonged observation** - minimum 8-12 hours, often 24+ hours\n\n**Torsades de Pointes:**\n- Magnesium sulfate 2g IV\n- Overdrive pacing or isoproterenol if refractory\n- Discontinue methadone and other QT-prolonging drugs\n\n**Do NOT discharge early** - delayed toxicity common with long half-life.',
    recommendation: 'Methadone toxicity requires prolonged observation (8-24h). Naloxone infusion often needed. Monitor for QTc prolongation and arrhythmias.',
    confidence: 'definitive',
    citation: [13, 14],
    treatment: {
      firstLine: {
        drug: 'Naloxone',
        dose: '0.04-0.4 mg',
        route: 'IV',
        frequency: 'Titrate to respiratory effort',
        duration: 'Followed by infusion 0.25-0.5 mg/hr',
        notes: 'Avoid full reversal (precipitates severe withdrawal). Prolonged infusion often needed.',
      },
      monitoring: 'Continuous cardiac monitoring. RR, SpO2, sedation level. QTc monitoring. Electrolytes (K+, Mg2+). Observe minimum 8-12 hours.',
    },
    summary: 'Titrate naloxone to RR not full reversal — continuous infusion often needed, observe 8-24h',
    safetyLevel: 'critical',
  },

  // ===================================================================
  // MODULE 5 - Disposition & OTP Linkage (6 nodes)
  // ===================================================================

  {
    id: 'meth-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Assess patient stability and disposition needs.',
    options: [
      {
        label: 'Stable - discharge with OTP plan',
        description: 'Symptoms controlled, vitals stable, OTP linkage arranged',
        next: 'meth-discharge',
      },
      {
        label: 'Needs observation/admission',
        description: 'High-risk features or ongoing concerns',
        next: 'meth-admit',
        urgency: 'urgent',
      },
    ],
    summary: 'Assess stability for discharge with OTP plan vs observation/admission for high-risk features',
  },

  {
    id: 'meth-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge with OTP Linkage',
    body: '**Discharge checklist:**\n\n1. **OTP appointment scheduled** within 72 hours\n2. **Take-home doses** (if dispensing under 72-hour rule):\n   - Day 2: 40 mg\n   - Day 3: 40 mg\n   - Clear written instructions\n   - Store safely away from children\n3. [Naloxone](#/drug/naloxone/opioid toxicity) kit prescribed or provided\n4. **Return precautions:**\n   - Difficulty breathing\n   - Excessive drowsiness\n   - Chest pain or palpitations\n   - Return of severe withdrawal symptoms\n5. **Documentation:**\n   - 72-hour rule use documented\n   - OTP referral information\n   - Doses administered and dispensed\n\n**OTP Locator:** SAMHSA.gov/otp-locator or call 1-800-662-4357',
    recommendation: 'Discharge with OTP appointment within 72 hours. May dispense up to 3-day supply. Provide naloxone and clear return precautions.',
    confidence: 'definitive',
    citation: [2, 3, 9],
    summary: 'Discharge with OTP appointment within 72h, naloxone kit, and clear return precautions',
  },

  {
    id: 'meth-admit',
    type: 'result',
    module: 5,
    title: 'Admission Criteria',
    body: '**Consider admission if:**\n\n- First-dose observation with any respiratory depression\n- QTc > 500 ms or arrhythmia\n- Concurrent medical condition requiring inpatient care\n- Concurrent intoxication requiring monitoring\n- No safe discharge environment\n- Suicide risk\n- Unable to arrange 72-hour OTP linkage\n\n**Inpatient management:**\n- Continue methadone dosing (can be administered by hospital pharmacy)\n- Telemetry if QTc concerns\n- Addiction medicine or psychiatry consultation\n- Social work for OTP linkage and barriers assessment\n- Do not abruptly discontinue (severe withdrawal, AMA risk)',
    recommendation: 'Admit for respiratory depression, QTc >500 ms, or inability to safely discharge. Continue methadone, do not abruptly stop.',
    confidence: 'recommended',
    citation: [8],
    summary: 'Admit if respiratory concerns, QTc prolongation, polysubstance use, or social instability',
  },

  {
    id: 'meth-linkage-barriers',
    type: 'info',
    module: 5,
    title: 'Linkage Barriers',
    body: '**Common barriers to OTP linkage:**\n\n- **Transportation:** OTPs require daily in-person visits initially\n- **Capacity:** Wait lists at many programs\n- **Hours:** Most open early morning only\n- **Cost:** Insurance, Medicaid coverage varies\n- **Distance:** Rural areas may have limited OTP access\n\n**Predictors of successful 72-hour linkage:** [15]\n- OTP enrollment at time of ED visit (OR 2.63)\n- Higher methadone dose (OR 1.20 per 10 mg)\n- Discharge to post-acute care facility (OR 2.12)\n\n**Negative predictor:**\n- Co-use of opioids and stimulants (OR 0.48)\n\n**If linkage not possible within 72 hours:** Buprenorphine may be better option (can prescribe longer bridge without OTP requirement).',
    summary: 'Common OTP linkage barriers: transportation, wait lists, hours, cost — buprenorphine if linkage impossible',
    skippable: true,
    citation: [15],
    next: 'meth-documentation',
  },

  {
    id: 'meth-documentation',
    type: 'info',
    module: 5,
    title: 'Documentation Requirements',
    body: '**Required documentation for 72-hour rule use:**\n\n1. Clinical indication for methadone (opioid withdrawal, OUD)\n2. COWS score before and after treatment\n3. Doses administered (with times)\n4. Doses dispensed for take-home (if any)\n5. OTP referral made (program name, appointment date/time)\n6. Patient counseling performed (overdose risk, safe storage, naloxone)\n7. Statement that methadone was provided under 21 CFR 1306.07(b)\n\n**For guest dosing:**\n- Document OTP name and phone number\n- Name of person who verified dose\n- Verified dose amount and last dose date\n\n**Prescription (if dispensing):**\n- "Methadone 40 mg PO daily x 2 days for opioid withdrawal under 21 CFR 1306.07(b)"',
    summary: 'Document 72-hour rule use, COWS scores, doses given/dispensed, and OTP referral in chart',
    skippable: true,
    next: 'meth-harm-reduction',
  },

  {
    id: 'meth-harm-reduction',
    type: 'result',
    module: 5,
    title: 'Harm Reduction & Education',
    body: '**Before discharge:**\n\n1. [Naloxone](#/drug/naloxone/opioid toxicity) - prescribe or provide\n2. **Overdose risk counseling:**\n   - Tolerance decreases rapidly during abstinence\n   - Risk of overdose highest in first 2 weeks of treatment\n   - Never use alone\n   - Avoid mixing with benzodiazepines, alcohol\n3. **Fentanyl test strips** if available\n4. **Safe storage:**\n   - Methadone is extremely dangerous to opioid-naive individuals\n   - Keep locked away from children and others\n   - Single dose can be fatal to a child\n5. **SAMHSA Helpline:** 1-800-662-4357\n6. **Return to ED** if unable to reach OTP appointment',
    recommendation: 'Provide naloxone, overdose risk counseling, safe storage education. SAMHSA helpline: 1-800-662-4357.',
    summary: 'Prescribe naloxone, counsel on overdose risk and safe storage — methadone lethal to opioid-naive',
    safetyLevel: 'warning',
    confidence: 'definitive',
    citation: [6, 9],
  },

];

export const ED_METHADONE_NODE_COUNT = ED_METHADONE_NODES.length;

export const ED_METHADONE_MODULE_LABELS = [
  'Patient Assessment',
  'Verification',
  'Dosing',
  'Monitoring',
  'Disposition',
];

export const ED_METHADONE_CRITICAL_ACTIONS = [
  { text: '72-hour rule: ED can administer/dispense methadone x3 days while arranging OTP referral (DEA 21 CFR 1306.07)', nodeId: 'meth-72hr-rule' },
  { text: 'Verify OTP enrollment and last dose: call OTP directly, check state PDMP, review OTP card', nodeId: 'meth-verify' },
  { text: 'EKG before dosing: QTc >500 ms = contraindication to methadone', nodeId: 'meth-qtc' },
  { text: 'Conservative dosing: 20-30 mg initial dose if OTP dose unverified (max 40 mg first dose)', nodeId: 'meth-dosing-unverified' },
  { text: 'Verified OTP dose: give usual dose if last dose within 72h (stable patients)', nodeId: 'meth-dosing-verified' },
  { text: 'Buprenorphine preferred if no established OTP enrollment (ED can prescribe via X-waiver)', nodeId: 'meth-buprenorphine' },
  { text: 'OTP linkage required: cannot discharge without documented referral and appointment', nodeId: 'meth-otp-linkage' },
  { text: 'Avoid methadone if: prolonged QTc, benzodiazepine use, severe liver disease, respiratory depression', nodeId: 'meth-contraindications' },
  { text: 'Peak respiratory depression 2-4 hours after dose (delayed vs. other opioids)', nodeId: 'meth-respiratory' },
  { text: 'Do NOT combine with benzodiazepines (additive respiratory depression, FDA black box warning)', nodeId: 'meth-benzos' },
];

export const ED_METHADONE_CITATIONS: Citation[] = [
  { num: 1, text: 'Substance Abuse and Mental Health Services Administration. Medications for Opioid Use Disorder. Treatment Improvement Protocol (TIP) Series 63. HHS Publication No. (SMA) 21-PEP21-02-01-002. Rockville, MD: SAMHSA; 2021.' },
  { num: 2, text: 'Code of Federal Regulations. Title 21, Part 1306.07(b) - Administering or dispensing of narcotic drugs.' },
  { num: 3, text: 'Drug Enforcement Administration. Implementation of the Easy Medication Access and Treatment for Opioid Addiction Act of 2023. 88 FR 52053. August 8, 2023.' },
  { num: 4, text: 'Brown Emergency Medicine. ED Methadone Guideline. September 2024. https://brownphysicians.org/wp-content/uploads/2024/10/ED-Methadone-Guideline_9_16_24.pdf' },
  { num: 5, text: 'Krantz MJ, Martin J, Stimmel B, et al. QTc Interval Screening in Methadone Treatment. Ann Intern Med. 2009;150(6):387-395.' },
  { num: 6, text: 'Hawk K, Hoppe J, Ketcham E, et al. Consensus Recommendations on the Treatment of Opioid Use Disorder in the Emergency Department. Ann Emerg Med. 2021;78(3):434-442.' },
  { num: 7, text: 'Herring AA, Perrone J, Nelson LS. Managing Opioid Withdrawal in the Emergency Department with Buprenorphine. Ann Emerg Med. 2019;73(5):481-487.' },
  { num: 8, text: 'Donroe JH, Holt SR, O\'Connor PG, et al. Caring for Patients with Opioid Use Disorder in the Hospital. CMAJ. 2017;189(43):E1328-E1334.' },
  { num: 9, text: 'Calcaterra SL, Martin M, Engel K, et al. Emergency Department Utilization of the Methadone "72-Hour Rule" to Bridge or Initiate and Link to Outpatient Treatment. Am J Emerg Med. 2025;87:78-83.' },
  { num: 10, text: 'Su MK, Lopez JH, Crossa A, Hoffman RS. Low Dose Intramuscular Methadone for Acute Mild to Moderate Opioid Withdrawal Syndrome. Am J Emerg Med. 2018;36(11):1951-1956.' },
  { num: 11, text: 'Zhang Y, Wakeman SE, Young-Wolff KC, et al. Linkage to Outpatient Methadone Treatment From the Emergency Department and Hospital. Acad Emerg Med. 2025;32(4):e14535.' },
  { num: 12, text: 'Applewhite D, Regan S, Pierre W, et al. Utilizing the "72-Hour Rule" to Expand Rapid, Higher Dose Initiation of Methadone in a Hospital-Based Bridge Clinic. J Addict Med. 2026;20(1):1-8.' },
  { num: 13, text: 'Chou R, Cruciani RA, Fiellin DA, et al. Methadone Safety: A Clinical Practice Guideline From the American Pain Society and College on Problems of Drug Dependence. J Pain. 2014;15(4):321-337.' },
  { num: 14, text: 'Stringer J, Welsh C, Tommasello A. Methadone-Associated QT Interval Prolongation and Torsades de Pointes. Am J Health Syst Pharm. 2009;66(9):825-833.' },
  { num: 15, text: 'Weiss AJ, Heslin KC. Leveraging the 72-Hour Rule Change to Support Transition From Hospital to Opioid Treatment Program. JAMA Netw Open. 2025;8(6):e2516234.' },
];
