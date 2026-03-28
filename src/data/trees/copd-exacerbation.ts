// MedKitt - COPD Exacerbation (Acute Exacerbation of COPD)
// Sources: GOLD 2024, EMCrit IBCC AECOPD, UpToDate, EBMedicine, Cochrane Reviews
// 6 modules: Initial Assessment -> Severity -> Bronchodilators/Steroids -> Antibiotics -> NIV/Intubation -> Disposition
// ~28 nodes total

import type { DecisionNode } from '../../models/types.js';

export interface Citation {
  num: number;
  text: string;
}

export const COPD_EXACERBATION_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'copd-start',
    type: 'info',
    module: 1,
    title: 'COPD Exacerbation: Initial Assessment',
    body: '**Acute Exacerbation of COPD (AECOPD)** - acute worsening of respiratory symptoms requiring additional therapy.\n\n**Cardinal Symptoms (Anthonisen Criteria):**\n- Increased dyspnea\n- Increased sputum volume\n- Increased sputum purulence\n\n**Common Triggers:**\n- Viral infection (50-70%)\n- Bacterial infection (30-50%)\n- Environmental pollutants\n- Medication non-adherence\n- Unknown (30%)\n\n**Initial Actions:**\n1. IV access, cardiac monitor, SpO2\n2. Target SpO2 **88-92%** (avoid hyperoxia)\n3. Discontinue home inhalers initially\n4. Labs: CBC, BMP, VBG/ABG, procalcitonin\n5. CXR (rule out pneumonia, CHF, PTX)\n6. ECG (arrhythmia, RV strain)\n\n**Key Question:** How sick is this patient? [1][2]',
    citation: [1, 2],
    next: 'copd-severity',
  },

  {
    id: 'copd-severity',
    type: 'question',
    module: 1,
    title: 'AECOPD Severity Assessment',
    body: '**Rome Classification (GOLD 2024):**\n\n| Severity | Criteria |\n|----------|----------|\n| **Mild** | SpO2 >92%, RR <24, HR <95 |\n| **Moderate** | SpO2 88-92%, RR 24-30, accessory muscle use |\n| **Severe** | SpO2 <88%, RR >30, altered mental status, hemodynamic instability |\n\n**Clinical Red Flags:**\n- Respiratory rate >30/min\n- Accessory muscle use\n- Paradoxical breathing\n- Cyanosis\n- New arrhythmia\n- Hemodynamic instability\n- Acute confusion/somnolence\n\n**Select severity level:**',
    citation: [1, 3],
    calculatorLinks: [
      { id: 'copd-severity', label: 'COPD Severity Calculator' },
      { id: 'anthonisen-criteria', label: 'Anthonisen Criteria' },
    ],
    options: [
      {
        label: 'Mild Exacerbation',
        description: 'SpO2 >92%, RR <24, no distress',
        next: 'copd-mild',
      },
      {
        label: 'Moderate Exacerbation',
        description: 'SpO2 88-92%, RR 24-30, accessory muscle use',
        next: 'copd-moderate',
        urgency: 'urgent',
      },
      {
        label: 'Severe Exacerbation',
        description: 'SpO2 <88%, RR >30, AMS, impending respiratory failure',
        next: 'copd-severe',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: SEVERITY-BASED INITIAL MANAGEMENT
  // =====================================================================

  {
    id: 'copd-mild',
    type: 'info',
    module: 2,
    title: 'Mild AECOPD: Outpatient Management',
    body: '**Mild exacerbation - often managed outpatient:**\n\n**Bronchodilators:**\n- Increase SABA frequency (albuterol MDI 4-8 puffs q4h)\n- Add SAMA if not already using (ipratropium MDI 2 puffs q4h)\n\n**Systemic Corticosteroids:**\n- [Prednisone](#/drug/prednisone/copd) 40 mg PO daily x 5 days\n- No taper needed for 5-day course\n\n**Antibiotics:**\n- Consider if 2+ cardinal symptoms WITH purulent sputum\n- [Azithromycin](#/drug/azithromycin/copd) 500 mg PO x 3 days OR\n- [Doxycycline](#/drug/doxycycline/copd) 100 mg PO BID x 5 days\n\n**Discharge with:**\n- Action plan for worsening\n- PCP follow-up within 7 days\n- Pulmonology referral if frequent exacerbations\n- Smoking cessation counseling [1][2][4]',
    citation: [1, 2, 4],
    treatment: {
      firstLine: {
        drug: 'Prednisone',
        dose: '40 mg PO daily',
        route: 'PO',
        frequency: 'Once daily',
        duration: '5 days',
        notes: 'No taper needed for 5-day course. Equivalent to methylprednisolone 32 mg IV.',
      },
      alternative: {
        drug: 'Albuterol MDI + Ipratropium MDI',
        dose: 'Albuterol 4-8 puffs + Ipratropium 2 puffs',
        route: 'Inhaled (MDI with spacer)',
        frequency: 'q4-6h',
        duration: 'Until symptoms improve',
        notes: 'Increase frequency from baseline. Spacer recommended for optimal delivery.',
      },
      monitoring: 'Return precautions for worsening dyspnea, fever, or altered mental status.',
    },
    next: 'copd-disposition',
  },

  {
    id: 'copd-moderate',
    type: 'info',
    module: 2,
    title: 'Moderate AECOPD: ED Treatment',
    body: '**Moderate exacerbation - requires ED treatment:**\n\n**Simultaneous interventions:**\n\n**1. Oxygen Therapy:**\n- Target SpO2 **88-92%** (not higher!)\n- Hyperoxia worsens V/Q mismatch and CO2 retention\n\n**2. Nebulized Bronchodilators:**\n- [Albuterol](#/drug/albuterol/copd) 2.5-5 mg + [Ipratropium](#/drug/ipratropium/copd) 0.5 mg nebulized\n- Schedule q4-6h, PRN albuterol q2h\n- Can give through BiPAP without removing mask\n\n**3. Systemic Corticosteroids:**\n- Methylprednisolone 125 mg IV (ED dose)\n- Then prednisone 40-60 mg PO daily x 5 days\n\n**4. Consider NIV early:**\n- If RR >24-28 after initial bronchodilators\n- If accessory muscle use persists\n- If hypercapnia suspected\n\n**Reassess in 1-2 hours.** [1][2][5]',
    citation: [1, 2, 5],
    treatment: {
      firstLine: {
        drug: 'Albuterol + Ipratropium',
        dose: 'Albuterol 2.5-5 mg + Ipratropium 0.5 mg',
        route: 'Nebulized',
        frequency: 'q4-6h scheduled, albuterol q2h PRN',
        duration: 'Until stable',
        notes: 'Can deliver through BiPAP in-line. DuoNeb contains both agents.',
      },
      alternative: {
        drug: 'Methylprednisolone',
        dose: '125 mg IV',
        route: 'IV',
        frequency: 'Once in ED',
        duration: 'Then transition to PO prednisone 40-60 mg daily x 5 days',
        notes: 'Higher initial dose for moderate-severe exacerbations. No benefit to prolonged IV.',
      },
      monitoring: 'RR, SpO2 (target 88-92%), work of breathing. Reassess for NIV need in 1-2 hours.',
    },
    next: 'copd-response-moderate',
  },

  {
    id: 'copd-response-moderate',
    type: 'question',
    module: 2,
    title: 'Response to Initial Treatment',
    body: '**Reassess at 1-2 hours:**\n\n**Good Response:**\n- RR improving (<24)\n- Less accessory muscle use\n- Patient more comfortable\n- SpO2 maintained 88-92% on low-flow O2\n\n**Partial/No Response:**\n- RR still >24-28\n- Persistent accessory muscle use\n- Worsening or unchanged dyspnea\n- Rising CO2 or respiratory acidosis\n\n**What is the response?**',
    citation: [1, 2],
    options: [
      {
        label: 'Good Response',
        description: 'RR improving, less work of breathing',
        next: 'copd-antibiotics',
      },
      {
        label: 'Partial/No Response',
        description: 'Still tachypneic, distressed',
        next: 'copd-niv-indication',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'copd-severe',
    type: 'info',
    module: 2,
    title: 'Severe AECOPD: Immediate Interventions',
    body: '**Severe exacerbation - imminent respiratory failure:**\n\n**Immediate simultaneous actions:**\n\n**1. BiPAP - Start NOW:**\n- Initial: 10 cm iPAP / 5 cm ePAP\n- Titrate to: 18-20 cm iPAP / 8 cm ePAP\n- FiO2 to target SpO2 88-92%\n\n**2. Nebulized bronchodilators:**\n- [Albuterol](#/drug/albuterol/copd) + [Ipratropium](#/drug/ipratropium/copd) through BiPAP\n- Continuous albuterol 10-15 mg/hr if severe\n\n**3. IV Methylprednisolone:**\n- 125 mg IV push\n\n**4. IV Magnesium (if refractory):**\n- 2g IV over 20 minutes\n- May reduce hospitalizations\n\n**5. ABG/VBG:**\n- Check for respiratory acidosis\n- pH <7.25 concerning\n\n**Do NOT delay BiPAP for ABG!**\nEven patients who look terrible often improve rapidly on BiPAP. [1][2][6]',
    citation: [1, 2, 6],
    treatment: {
      firstLine: {
        drug: 'BiPAP',
        dose: 'Start 10/5, titrate to 18-20/8 cm H2O',
        route: 'Non-invasive ventilation',
        frequency: 'Continuous',
        duration: 'Until work of breathing improves',
        notes: 'FiO2 to target SpO2 88-92%. Monitor tidal volume >300-400 mL, minute ventilation >5-6 L/min.',
      },
      alternative: {
        drug: 'Magnesium Sulfate',
        dose: '2g IV',
        route: 'IV over 20 minutes',
        frequency: 'Once',
        duration: 'Single dose',
        notes: 'Consider if refractory to bronchodilators. Reduces hospitalizations in severe cases.',
      },
      monitoring: 'Continuous SpO2, RR, mental status. ABG/VBG within 2 hours of BiPAP initiation.',
    },
    next: 'copd-niv-management',
  },

  // =====================================================================
  // MODULE 3: BRONCHODILATORS & STEROIDS
  // =====================================================================

  {
    id: 'copd-bronchodilators',
    type: 'info',
    module: 3,
    title: 'Bronchodilator Therapy',
    body: '**SABA + SAMA Combination:**\n\n**Nebulized (preferred in acute setting):**\n- [Albuterol](#/drug/albuterol/copd) 2.5-5 mg + [Ipratropium](#/drug/ipratropium/copd) 0.5 mg\n- DuoNeb = combination product\n- Schedule: q4-6h, with albuterol q2h PRN\n\n**MDI with spacer (equally effective):**\n- Albuterol 4-8 puffs + Ipratropium 2-4 puffs\n- May be difficult in severe respiratory distress\n\n**Key Points:**\n- Combination SABA + SAMA superior to either alone [7]\n- Can deliver through BiPAP in-line without removing mask\n- Nebulizer may be easier in sicker patients\n- MDI + spacer equally effective if patient can coordinate\n\n**Continuous nebulization:**\n- Reserved for severe/refractory cases\n- Albuterol 10-15 mg/hr continuous\n- Watch for tachycardia, tremor, hypokalemia [1][2][7]',
    citation: [1, 2, 7],
    treatment: {
      firstLine: {
        drug: 'Albuterol + Ipratropium (DuoNeb)',
        dose: 'Albuterol 2.5-5 mg + Ipratropium 0.5 mg',
        route: 'Nebulized',
        frequency: 'q4-6h scheduled, albuterol q2h PRN',
        duration: 'Until symptoms improve',
        notes: 'Combination superior to either alone. Can deliver through BiPAP in-line.',
      },
      alternative: {
        drug: 'Continuous Albuterol',
        dose: '10-15 mg/hr',
        route: 'Continuous nebulization',
        frequency: 'Continuous',
        duration: 'Until improved, then switch to intermittent',
        notes: 'For severe/refractory cases. Monitor for tachycardia, tremor, hypokalemia.',
      },
      monitoring: 'HR (tachycardia common), tremor, K+ if prolonged use. Response assessed by RR, work of breathing.',
    },
    next: 'copd-steroids',
  },

  {
    id: 'copd-steroids',
    type: 'info',
    module: 3,
    title: 'Systemic Corticosteroids',
    body: '**Systemic steroids improve outcomes in AECOPD:**\n- Shorten recovery time\n- Improve FEV1 and oxygenation\n- Reduce treatment failure\n- Reduce hospitalization duration [8]\n\n**GOLD 2024 Recommendation:**\n- [Prednisone](#/drug/prednisone/copd) 40 mg PO daily x **5 days**\n- No taper needed\n- Longer courses offer no additional benefit\n\n**Severe/ICU patients:**\n- Methylprednisolone 125 mg IV initially\n- If critically ill: 125 mg IV daily x 1-2 days\n- Then transition to prednisone 40-60 mg PO\n\n**IV vs PO:**\n- IV not superior to PO\n- Use IV if patient cannot take PO\n\n**Adverse effects (short course):**\n- Hyperglycemia (monitor glucose)\n- Insomnia, agitation\n- Rarely: psychosis, GI bleed [1][2][8]',
    citation: [1, 2, 8],
    treatment: {
      firstLine: {
        drug: 'Prednisone',
        dose: '40 mg PO daily',
        route: 'PO',
        frequency: 'Once daily',
        duration: '5 days (no taper)',
        notes: 'GOLD 2024 standard. Longer courses not beneficial. Monitor glucose.',
      },
      alternative: {
        drug: 'Methylprednisolone',
        dose: '125 mg IV',
        route: 'IV',
        frequency: 'Once daily',
        duration: '1-2 days if critically ill, then transition to PO',
        notes: 'Use if unable to take PO. IV not superior to PO. Transition to prednisone 40-60 mg when able.',
      },
      monitoring: 'Blood glucose (especially diabetics). Mental status changes. GI symptoms.',
    },
    next: 'copd-antibiotics',
  },

  // =====================================================================
  // MODULE 4: ANTIBIOTICS
  // =====================================================================

  {
    id: 'copd-antibiotics',
    type: 'question',
    module: 4,
    title: 'Antibiotic Indications',
    body: '**When to use antibiotics in AECOPD:**\n\n**Anthonisen Criteria (GOLD 2024):**\n- 3 cardinal symptoms (dyspnea, sputum volume, sputum purulence) OR\n- 2 cardinal symptoms IF one is **purulent sputum** OR\n- Requires mechanical ventilation (NIV or invasive)\n\n**Point System:**\n| Symptom | Points |\n|---------|--------|\n| Increased dyspnea | 1 |\n| Increased sputum volume | 1 |\n| Purulent sputum | 2 |\n\n**Antibiotics indicated if score >=3**\n\n**All ICU-level AECOPD warrants antibiotics.**\n\n**Key Pathogens:**\n- *H. influenzae* (most common)\n- *S. pneumoniae*\n- *M. catarrhalis*\n- Pseudomonas (if severe COPD, frequent exacerbations, recent antibiotics)\n\n**Does this patient meet antibiotic criteria?**',
    citation: [1, 4, 9],
    options: [
      {
        label: 'Yes - Antibiotics Indicated',
        description: 'Purulent sputum + 1 other symptom, OR 3 symptoms, OR on NIV',
        next: 'copd-antibiotic-choice',
      },
      {
        label: 'No - Viral/No Antibiotics',
        description: 'Does not meet criteria',
        next: 'copd-niv-indication',
      },
      {
        label: 'ICU/Ventilated Patient',
        description: 'All ICU patients warrant antibiotics',
        next: 'copd-antibiotic-icu',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'copd-antibiotic-choice',
    type: 'info',
    module: 4,
    title: 'Antibiotic Selection - Standard',
    body: '**Uncomplicated AECOPD:**\n\nAge <65, no cardiac disease, <3 exacerbations/year, FEV1 >50%\n\n**First-Line Options (5 days):**\n\n- [Azithromycin](#/drug/azithromycin/copd) 500 mg PO daily x 3 days\n  - Preferred if not recent use\n  - Long half-life provides 7+ days coverage\n\n- [Doxycycline](#/drug/doxycycline/copd) 100 mg PO BID x 5 days\n  - Excellent tolerability\n  - Low C. difficile risk\n  - Good H. influenzae coverage\n\n- Amoxicillin-clavulanate 875/125 mg PO BID x 5 days\n  - Good if recent macrolide use\n\n**Narrow-spectrum antibiotics are sufficient.**\nGoal is suppressing chronic airway colonization, not sterilization.\nAvoid broad-spectrum escalation based on sputum cultures. [1][4][9]',
    citation: [1, 4, 9],
    treatment: {
      firstLine: {
        drug: 'Azithromycin',
        dose: '500 mg PO daily',
        route: 'PO',
        frequency: 'Once daily',
        duration: '3 days',
        notes: 'Long half-life provides 7+ days coverage. Preferred if not used recently. Watch QTc.',
      },
      alternative: {
        drug: 'Doxycycline',
        dose: '100 mg PO BID',
        route: 'PO',
        frequency: 'Twice daily',
        duration: '5 days',
        notes: 'Excellent tolerability, low C. diff risk. Good H. influenzae coverage. Take with food.',
      },
      monitoring: 'Clinical improvement expected in 48-72 hours. Reassess if no improvement.',
    },
    next: 'copd-niv-indication',
  },

  {
    id: 'copd-antibiotic-icu',
    type: 'info',
    module: 4,
    title: 'Antibiotic Selection - ICU/Complicated',
    body: '**Complicated AECOPD (any of):**\n- Age >65\n- FEV1 <50% predicted\n- >=3 exacerbations/year\n- Cardiac comorbidity\n- Recent antibiotic use\n- Recent hospitalization\n\n**Consider Pseudomonas coverage if:**\n- Frequent antibiotic exposure\n- Recent hospitalization\n- Severe COPD (FEV1 <30%)\n- Prior Pseudomonas isolation\n\n**Standard Complicated:**\n- Levofloxacin 750 mg PO/IV daily x 5 days OR\n- Amoxicillin-clavulanate 875/125 mg PO BID\n\n**Pseudomonas Risk:**\n- Piperacillin-tazobactam 4.5g IV q6h OR\n- Cefepime 2g IV q8h OR\n- Levofloxacin 750 mg IV daily\n\n**Duration:** 5 days (7 days if Pseudomonas) [1][4][9]',
    citation: [1, 4, 9],
    treatment: {
      firstLine: {
        drug: 'Levofloxacin',
        dose: '750 mg PO/IV daily',
        route: 'PO or IV',
        frequency: 'Once daily',
        duration: '5 days',
        notes: 'Good respiratory penetration. Covers atypicals and most Pseudomonas. Watch tendon issues.',
      },
      alternative: {
        drug: 'Piperacillin-Tazobactam',
        dose: '4.5g IV q6h',
        route: 'IV',
        frequency: 'q6h',
        duration: '5-7 days',
        notes: 'For Pseudomonas risk factors. Extended infusion (4 hours) preferred if available.',
      },
      monitoring: 'Cultures if intubated. Procalcitonin trend. Clinical response in 48-72 hours.',
    },
    next: 'copd-niv-management',
  },

  // =====================================================================
  // MODULE 5: NIV & INTUBATION
  // =====================================================================

  {
    id: 'copd-niv-indication',
    type: 'question',
    module: 5,
    title: 'NIV (BiPAP) Indications',
    body: '**BiPAP strongly recommended in AECOPD with:**\n\n- Respiratory acidosis (pH <7.35, PaCO2 >45)\n- Severe dyspnea with signs of increased work of breathing\n- Respiratory rate >30/min\n- Hypercapnic encephalopathy (somnolence from CO2)\n- Persistent hypoxemia despite supplemental O2\n\n**Evidence for BiPAP:**\n- Reduces intubation (RR 0.41, NNT 4)\n- Reduces mortality (RR 0.52, NNT 10)\n- Reduces complications [10]\n\n**Contraindications:**\n- Immediate need for intubation\n- Vomiting/high aspiration risk\n- Facial trauma/surgery\n- Uncooperative patient (consider sedation first)\n\n**Does this patient need BiPAP?**',
    citation: [1, 2, 10],
    calculatorLinks: [
      { id: 'bipap-titration', label: 'BiPAP Settings Guide' },
    ],
    options: [
      {
        label: 'Yes - Start BiPAP',
        description: 'RR >30, respiratory acidosis, or severe dyspnea',
        next: 'copd-niv-management',
        urgency: 'urgent',
      },
      {
        label: 'No - Continue Medical Therapy',
        description: 'Improving on bronchodilators/steroids',
        next: 'copd-disposition',
      },
      {
        label: 'Contraindication to NIV',
        description: 'Vomiting, unable to protect airway',
        next: 'copd-hfnc',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'copd-niv-management',
    type: 'info',
    module: 5,
    title: 'BiPAP Management',
    body: '**Initial BiPAP Settings:**\n- iPAP: 10 cm H2O\n- ePAP: 5 cm H2O\n- FiO2: Titrate to SpO2 88-92%\n\n**Titration:**\n- Increase iPAP by 2-3 cm every 5-10 min\n- Target: iPAP 18-20 cm / ePAP 8 cm\n- Max practical: ~20 cm iPAP / 8-10 cm ePAP\n\n**Monitoring on BiPAP:**\n- Tidal volume >300-400 mL\n- Minute ventilation >5-6 L/min\n- Respiratory rate trending down\n- Patient comfort and synchrony\n\n**Sedation for BiPAP intolerance:**\n- [Dexmedetomidine](#/drug/dexmedetomidine/copd) preferred (no respiratory depression)\n- Haloperidol 2-5 mg IV if agitated\n- Avoid benzodiazepines/opioids\n\n**Reassess in 2 hours:**\n- If pH improving and RR decreasing - continue\n- If no improvement or worsening - consider intubation [1][2][6]',
    citation: [1, 2, 6],
    treatment: {
      firstLine: {
        drug: 'BiPAP',
        dose: 'Start 10/5, titrate to 18-20/8 cm H2O',
        route: 'Non-invasive ventilation',
        frequency: 'Continuous',
        duration: '12-24 hours typical, avoid >48 hours continuous',
        notes: 'FiO2 to SpO2 88-92%. Monitor TV >300-400 mL, MV >5-6 L/min. Can give nebs in-line.',
      },
      alternative: {
        drug: 'Dexmedetomidine',
        dose: '0.2-0.7 mcg/kg/hr',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'While on BiPAP',
        notes: 'For BiPAP intolerance. No respiratory depression. Very titratable. BiPAPidex = powerful combination.',
      },
      monitoring: 'Continuous SpO2, RR, TV/MV on device. ABG/VBG at 2 hours. If pH not improving, escalate care.',
    },
    next: 'copd-niv-response',
  },

  {
    id: 'copd-niv-response',
    type: 'question',
    module: 5,
    title: 'BiPAP Response Assessment',
    body: '**Assess at 1-2 hours:**\n\n**Improvement on BiPAP:**\n- pH improving (should see change by 2 hours)\n- PaCO2 trending down\n- RR decreasing\n- Less accessory muscle use\n- Patient more alert/comfortable\n\n**Failure of BiPAP:**\n- pH <7.25 or worsening\n- Rising PaCO2\n- Persistent tachypnea >30\n- Worsening mental status\n- Hemodynamic instability\n- Unable to tolerate despite sedation\n\n**Key principle:** Improvement in pH and PCO2 within 2 hours predicts NIV success.\n\n**What is the response?**',
    citation: [1, 2, 6],
    options: [
      {
        label: 'Improving',
        description: 'pH improving, RR down, less distressed',
        next: 'copd-niv-continue',
      },
      {
        label: 'Failing BiPAP',
        description: 'No improvement or worsening',
        next: 'copd-intubation',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'copd-niv-continue',
    type: 'info',
    module: 5,
    title: 'Continue BiPAP - Weaning Plan',
    body: '**Patient improving on BiPAP:**\n\n**Continue therapy:**\n- Maintain current BiPAP settings\n- Continue scheduled bronchodilators through BiPAP\n- Complete steroid course\n- Antibiotics if indicated\n\n**Weaning approach:**\n- Avoid continuous BiPAP >48 hours (nasal ulceration)\n- Trial breaks as tolerated (meals, communication)\n- Gradually reduce support over 24-48 hours\n- Step down: BiPAP -> HFNC -> NC\n\n**When to attempt off BiPAP:**\n- RR <25 on BiPAP\n- SpO2 maintained on FiO2 <40%\n- Alert, cooperative\n- Secretions manageable\n\n**Admission:** ICU or step-down for BiPAP monitoring. [1][2]',
    citation: [1, 2],
    next: 'copd-disposition',
  },

  {
    id: 'copd-hfnc',
    type: 'info',
    module: 5,
    title: 'HFNC as Alternative',
    body: '**High-Flow Nasal Cannula (HFNC):**\n\n**Use when:**\n- BiPAP contraindicated (vomiting, facial issues)\n- BiPAP not tolerated\n- Not sick enough for BiPAP, but needs more than NC\n- Weaning from BiPAP\n\n**Settings:**\n- Flow: Start 40-50 L/min, maximize to 60 L/min as tolerated\n- FiO2: Titrate to SpO2 88-92%\n\n**Benefits:**\n- Better tolerated than BiPAP\n- Allows eating, speaking\n- Some PEEP effect (2-5 cm H2O)\n- Washes out dead space\n\n**Limitations:**\n- Less pressure support than BiPAP\n- Less effective for severe hypercapnia\n- Consider as bridge, not replacement for BiPAP in severe cases [1][2]',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'HFNC',
        dose: 'Flow 40-60 L/min, FiO2 to SpO2 88-92%',
        route: 'High-flow nasal cannula',
        frequency: 'Continuous',
        duration: 'Until ready to wean to NC',
        notes: 'Maximize flow first for CO2 washout. Better tolerated than BiPAP. Second-line to BiPAP in severe AECOPD.',
      },
      monitoring: 'Continuous SpO2, RR, work of breathing. Escalate to BiPAP if worsening or no improvement.',
    },
    next: 'copd-niv-response',
  },

  {
    id: 'copd-intubation',
    type: 'info',
    module: 5,
    title: 'Intubation - Last Resort',
    body: '**Intubation in AECOPD - proceed if:**\n\n- NIV contraindicated or failed\n- Respiratory arrest\n- Unable to protect airway\n- Multiorgan failure/shock\n- Deteriorating despite maximal NIV\n\n**Pre-intubation considerations:**\n\n**Hemodynamics:**\n- Optimize with fluids/vasopressors before intubation\n- These patients crash with induction\n\n**Induction agents:**\n- [Ketamine](#/drug/ketamine/copd) 1-2 mg/kg IV (bronchodilation, BP preserved)\n- Propofol (causes hypotension - have vasopressor ready)\n\n**Post-intubation ventilator:**\n- Volume control: TV 6-8 mL/kg IBW\n- Rate: 12-14/min (allow long expiratory time)\n- PEEP: 5-8 cm H2O\n- Watch for auto-PEEP!\n\n**Permissive hypercapnia acceptable** - target pH 7.25-7.35, not normal CO2. [1][2][6]',
    citation: [1, 2, 6],
    treatment: {
      firstLine: {
        drug: 'Ketamine (induction)',
        dose: '1-2 mg/kg IV',
        route: 'IV push',
        frequency: 'Once',
        duration: 'Single induction dose',
        notes: 'Bronchodilator properties. Preserves BP better than propofol. Have vasopressor ready regardless.',
      },
      alternative: {
        drug: 'Norepinephrine (post-intubation)',
        dose: '0.05-0.1 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'As needed post-intubation',
        notes: 'Have ready for post-intubation hypotension. Auto-PEEP and positive pressure ventilation cause hypotension.',
      },
      monitoring: 'Post-intubation ABG. Watch for auto-PEEP (persistent expiratory flow). Plateau pressure <30.',
    },
    next: 'copd-vent-management',
  },

  {
    id: 'copd-vent-management',
    type: 'info',
    module: 5,
    title: 'Ventilator Management in COPD',
    body: '**Initial ventilator settings:**\n\n| Parameter | Setting |\n|-----------|----------|\n| Mode | Volume Control (AC) |\n| TV | 6-8 mL/kg IBW |\n| RR | 12-14/min (low!) |\n| PEEP | 5-8 cm H2O |\n| FiO2 | Titrate to SpO2 88-92% |\n\n**Critical: Prevent Auto-PEEP**\n\n- Use low RR (12-14) to allow complete exhalation\n- Watch expiratory flow on vent waveform\n- If persistent flow at end-expiration = auto-PEEP\n- Reduce RR further, sedate adequately\n\n**Permissive hypercapnia:**\n- Target pH 7.25-7.35 (not normal CO2)\n- Accept elevated CO2 if pH acceptable\n- Match patient\'s chronic baseline\n\n**Weaning:**\n- Rest patient 24 hours minimum\n- Aggressive weaning at 36-48 hours\n- Consider extubation to HFNC or BiPAP [1][2][6]',
    citation: [1, 2, 6],
    next: 'copd-disposition',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'copd-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition Decision',
    body: '**Determine appropriate level of care:**\n\n**ICU Admission:**\n- Requiring NIV (BiPAP)\n- Intubated/mechanically ventilated\n- Hemodynamic instability\n- Altered mental status\n- Refractory hypoxemia\n\n**Telemetry/Floor:**\n- Moderate exacerbation responding to treatment\n- Stable on low-flow O2 (SpO2 88-92%)\n- No NIV requirement\n- Stable mental status\n\n**Observation (if available):**\n- Mild-moderate responding well\n- May be discharge candidate in <24 hours\n\n**ED Discharge:**\n- Mild exacerbation\n- Good response to treatment\n- Return to baseline or near-baseline\n- Reliable follow-up\n\n**Select disposition:**',
    citation: [1, 2, 11],
    options: [
      {
        label: 'ICU Admission',
        description: 'NIV, intubated, or unstable',
        next: 'copd-admit-icu',
        urgency: 'critical',
      },
      {
        label: 'Telemetry/Floor Admission',
        description: 'Moderate, stable, no NIV',
        next: 'copd-admit-floor',
      },
      {
        label: 'ED Discharge',
        description: 'Mild, returned to baseline',
        next: 'copd-discharge',
      },
    ],
  },

  {
    id: 'copd-admit-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU admission for severe AECOPD:**\n\n**Continue:**\n- BiPAP or mechanical ventilation\n- Scheduled bronchodilators\n- Steroids (methylprednisolone 125 mg IV daily x 1-2 days, then PO)\n- Antibiotics if indicated\n\n**Orders:**\n- Continuous SpO2, cardiac monitoring\n- ABG/VBG q4-6h until stable\n- Respiratory therapy q4-6h\n- NPO if on BiPAP/intubated\n- DVT prophylaxis\n- Stress ulcer prophylaxis if intubated\n\n**Consults:**\n- Pulmonology\n- Respiratory therapy\n\n**Goals:**\n- Wean NIV/ventilator as tolerated\n- Identify and treat precipitant\n- Transition to oral therapy when able',
    recommendation: 'ICU admission for BiPAP or mechanical ventilation. Continue bronchodilators, steroids, antibiotics. Goal: wean respiratory support, identify precipitant.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'copd-admit-floor',
    type: 'result',
    module: 6,
    title: 'Telemetry/Floor Admission',
    body: '**Floor admission for moderate AECOPD:**\n\n**Orders:**\n- Supplemental O2 to SpO2 88-92%\n- [Albuterol](#/drug/albuterol/copd) + [Ipratropium](#/drug/ipratropium/copd) neb q4-6h scheduled, albuterol q2h PRN\n- [Prednisone](#/drug/prednisone/copd) 40 mg PO daily (5-day total course)\n- Antibiotics if indicated\n- Continue home maintenance inhalers\n\n**Monitoring:**\n- SpO2 checks q4h\n- RR assessment\n- Escalate to BiPAP if worsening\n\n**Before discharge:**\n- Inhaler technique education\n- Smoking cessation counseling\n- Action plan for future exacerbations\n- PCP follow-up within 7 days\n- Pulmonology referral if frequent exacerbations\n\n**Average length of stay:** 3-5 days',
    recommendation: 'Telemetry/floor admission. Complete steroid course, bronchodilators, antibiotics if indicated. Discharge when stable on room air or baseline O2.',
    confidence: 'recommended',
    citation: [1, 2, 11],
  },

  {
    id: 'copd-discharge',
    type: 'result',
    module: 6,
    title: 'ED Discharge - Mild AECOPD',
    body: '**Discharge criteria:**\n- Mild exacerbation\n- Returned to baseline or near-baseline\n- SpO2 >90% on room air (or baseline O2)\n- Able to take oral medications\n- Reliable follow-up\n- Adequate home support\n\n**Discharge medications:**\n- [Prednisone](#/drug/prednisone/copd) 40 mg PO daily x 5 days\n- Increase SABA frequency as needed\n- Antibiotics if criteria met (azithromycin 500 mg x 3d OR doxycycline 100 mg BID x 5d)\n- Continue home maintenance inhalers\n\n**Discharge instructions:**\n- Smoking cessation (most important intervention!)\n- Return if worsening dyspnea, fever, confusion\n- Flu + pneumococcal vaccination if due\n- PCP follow-up within 7 days\n\n**Red flags for return:**\n- Cannot speak in full sentences\n- Persistent dyspnea despite rescue inhaler\n- Fever >101F\n- New confusion or drowsiness [1][2][11][12]',
    recommendation: 'ED discharge with 5-day prednisone, increased bronchodilators, antibiotics if indicated. PCP follow-up within 7 days. Smoking cessation counseling.',
    confidence: 'recommended',
    citation: [1, 2, 11, 12],
  },
];

export const COPD_EXACERBATION_NODE_COUNT = COPD_EXACERBATION_NODES.length;

export const COPD_EXACERBATION_MODULE_LABELS = [
  'Initial Assessment',
  'Severity-Based Management',
  'Bronchodilators & Steroids',
  'Antibiotics',
  'NIV & Intubation',
  'Disposition',
];

export const COPD_EXACERBATION_CITATIONS: Citation[] = [
  { num: 1, text: 'Global Initiative for Chronic Obstructive Lung Disease (GOLD). 2024 Report: Global Strategy for Prevention, Diagnosis, and Management of COPD. goldcopd.org. Accessed 2024.' },
  { num: 2, text: 'Farkas J. EMCrit IBCC: Acute Exacerbation of COPD (AECOPD). emcrit.org/ibcc/aecopd. Accessed 2024.' },
  { num: 3, text: 'Celli BR, et al. An Updated Definition and Severity Classification of COPD Exacerbations: The Rome Proposal. Am J Respir Crit Care Med. 2021;204(11):1251-1258.' },
  { num: 4, text: 'Anthonisen NR, et al. Antibiotic Therapy in Exacerbations of Chronic Obstructive Pulmonary Disease. Ann Intern Med. 1987;106(2):196-204.' },
  { num: 5, text: 'Leuppi JD, et al. Short-term vs Conventional Glucocorticoid Therapy in Acute Exacerbations of COPD: The REDUCE Randomized Clinical Trial. JAMA. 2013;309(21):2223-2231.' },
  { num: 6, text: 'Osadnik CR, et al. Non-invasive Ventilation for the Management of Acute Hypercapnic Respiratory Failure Due to Exacerbation of COPD. Cochrane Database Syst Rev. 2017;7:CD004104.' },
  { num: 7, text: 'Appleton S, et al. Ipratropium Bromide versus Short-Acting Beta-2 Agonists for Stable COPD. Cochrane Database Syst Rev. 2006;(2):CD001387.' },
  { num: 8, text: 'Walters JA, et al. Systemic Corticosteroids for Acute Exacerbations of COPD. Cochrane Database Syst Rev. 2014;(9):CD001288.' },
  { num: 9, text: 'Vollenweider DJ, et al. Antibiotics for Exacerbations of COPD. Cochrane Database Syst Rev. 2018;10:CD010257.' },
  { num: 10, text: 'Lightowler JV, et al. Non-invasive Positive Pressure Ventilation to Treat Respiratory Failure Resulting from Exacerbations of COPD. BMJ. 2003;326(7382):185.' },
  { num: 11, text: 'Wedzicha JA, et al. Management of COPD Exacerbations: A European Respiratory Society/American Thoracic Society Guideline. Eur Respir J. 2017;49(3):1600791.' },
  { num: 12, text: 'Criner GJ, et al. Prevention of Acute Exacerbations of COPD: American College of Chest Physicians and Canadian Thoracic Society Guideline. Chest. 2015;147(4):894-942.' },
];
