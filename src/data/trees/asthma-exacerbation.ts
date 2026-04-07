// MedKitt — Asthma Exacerbation Decision Tree
// Comprehensive ED management: severity classification, maximizing therapy,
// BiPAP/sedation, intubation approach, ventilator settings, and disposition
// 6 modules: Initial Assessment & Severity → Maximize Medical Therapy → BiPAP & Sedation → Intubation Approach → Ventilator Management → PFT & Disposition
// Sources: EMCrit, UpToDate, EB Medicine, GINA 2024

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const ASTHMA_EXACERBATION_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT & SEVERITY
  // =====================================================================

  {
    id: 'asthma-start',
    type: 'info',
    module: 1,
    title: 'Asthma Exacerbation',
    body: '**Asthma exacerbation** = acute worsening of symptoms requiring escalation of therapy. [1][2]\n\n**Key Principle:** Maximize medical therapy aggressively before considering intubation. Most patients can avoid intubation with proper management.\n\n**This consult covers:**\n• Severity classification\n• Maximizing bronchodilator therapy\n• BiPAP with appropriate sedation\n• Intubation approach (when unavoidable)\n• Ventilator settings for obstructive physiology\n• PFT-based disposition\n\n**EMCrit Pearl:** "The best treatment for status asthmaticus is to not intubate the patient." [3]',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'pef-predicted', label: 'PEF % Predicted' },
      { id: 'asthma-severity-score', label: 'Severity Score' },
    ],
    next: 'asthma-severity',
  },

  {
    id: 'asthma-severity',
    type: 'question',
    module: 1,
    title: 'Severity Classification',
    body: '**Classify severity to guide therapy intensity:** [1][2]\n\n**MILD-MODERATE:**\n• Can speak in phrases/sentences\n• Prefers sitting to lying\n• Not agitated\n• RR <30, HR <120\n• SpO2 90-95%\n• PEF >50% predicted\n\n**SEVERE:**\n• Speaks only in words\n• Sits hunched forward\n• Agitated\n• RR ≥30, HR ≥120\n• SpO2 <90%\n• PEF ≤50% predicted\n\n**LIFE-THREATENING:**\n• **Silent chest** (no wheezing = no air movement)\n• Drowsy, confused, or exhausted\n• Bradycardia or hypotension\n• SpO2 <90% despite O2\n• PEF <25% or unable to perform\n\n**⚠️ Silent chest is a DIRE sign - indicates critically severe obstruction**',
    citation: [1, 2],
    options: [
      { label: 'Mild-Moderate', description: 'PEF >50%, speaks phrases, SpO2 90-95%', next: 'asthma-mild-moderate' },
      { label: 'Severe', description: 'PEF ≤50%, speaks words only, SpO2 <90%', next: 'asthma-severe-immediate' },
      { label: 'Life-Threatening', description: 'Silent chest, AMS, bradycardia, PEF <25%', next: 'asthma-critical' },
    ],
  },

  {
    id: 'asthma-mild-moderate',
    type: 'info',
    module: 1,
    title: 'Mild-Moderate Management',
    body: '**Standard initial treatment:** [1][2][4]\n\n**Immediate Actions:**\n1. **SABA**: Albuterol 2.5-5mg nebulized q20min x 3 doses\n2. **Ipratropium**: 0.5mg nebulized with first 3 albuterol doses\n3. **Steroids**: Prednisone 40-60mg PO or methylpred 125mg IV\n4. **Supplemental O2**: Target SpO2 93-95%\n\n**Response Assessment at 60-90 min:**\n• Good response (PEF >70%) → Discharge pathway\n• Incomplete response (PEF 50-70%) → Continue treatment\n• Poor response (PEF <50%) → Escalate to severe protocol\n\n**Key Points:**\n• Early steroids reduce admission rates [4]\n• Ipratropium adds benefit in first hour only\n• Reassess frequently - patients can deteriorate rapidly',
    citation: [1, 2, 4],
    calculatorLinks: [
      { id: 'pef-predicted', label: 'PEF % Predicted' },
    ],
    next: 'asthma-response-assessment',
  },

  {
    id: 'asthma-response-assessment',
    type: 'question',
    module: 1,
    title: 'Treatment Response',
    body: '**Reassess at 60-90 minutes:**\n\nCheck:\n• Symptom improvement\n• Respiratory rate\n• SpO2 on room air or minimal O2\n• **Peak Expiratory Flow (PEF)**\n\n[PEF Calculator](#/calc/pef-predicted)\n\nWhat is the PEF response?',
    options: [
      { label: 'PEF >70% - Good Response', description: 'Symptom resolution, SpO2 ≥94% RA', next: 'asthma-disposition-criteria' },
      { label: 'PEF 50-70% - Incomplete', description: 'Some improvement, still symptomatic', next: 'asthma-continuous-nebs' },
      { label: 'PEF <50% - Poor Response', description: 'Minimal improvement despite therapy', next: 'asthma-severe-immediate' },
    ],
  },

  {
    id: 'asthma-severe-immediate',
    type: 'info',
    module: 1,
    title: 'Severe - Immediate Actions',
    body: '**Severe exacerbation requires AGGRESSIVE therapy:** [1][3][5]\n\n**IMMEDIATE SIMULTANEOUS ACTIONS:**\n1. **High-flow O2**: NRB or HFNC to maintain SpO2 ≥92%\n2. **Continuous nebs**: Start immediately (not intermittent)\n3. **IV steroids**: Methylprednisolone 125mg IV\n4. **IV access**: Large bore, draw labs\n5. **IV Magnesium**: 2g over 20 minutes\n\n**Labs to Draw:**\n• VBG (pH, pCO2 - rising CO2 is ominous)\n• BMP (K+ often low from beta-agonists)\n• Consider troponin if cardiac history\n\n**Continuous Monitoring:**\n• SpO2, RR, ability to speak\n• Reassess every 15-30 minutes\n• Prepare for escalation if no improvement\n\n**🚨 If no improvement in 30-60 min → escalate therapies**',
    citation: [1, 3, 5],
    next: 'asthma-continuous-nebs',
  },

  {
    id: 'asthma-critical',
    type: 'info',
    module: 1,
    title: 'Life-Threatening - Critical',
    body: '**🚨 CRITICAL STATUS - IMPENDING RESPIRATORY FAILURE:** [3][6]\n\n**Immediate Actions:**\n1. **Call for help** - anesthesia, ICU, RT\n2. **Prepare airway equipment** - but don\'t intubate yet if possible\n3. **Aggressive medical therapy** while preparing\n4. **BiPAP with ketamine sedation** if patient can tolerate\n\n**Signs of Impending Arrest:**\n• Silent chest\n• Altered mental status\n• Bradycardia\n• Hypotension\n• Cyanosis\n\n**If Patient Arrests:**\nProceed immediately to intubation - no time for DSI\n\n**If Patient Still Conscious:**\nTry maximum medical therapy + BiPAP with ketamine first.\n\n"Intubation is often the beginning of the end in severe asthma" [3]',
    citation: [3, 6],
    next: 'asthma-critical-decision',
  },

  {
    id: 'asthma-critical-decision',
    type: 'question',
    module: 1,
    title: 'Critical - Next Step',
    body: 'What is the patient\'s current status?',
    options: [
      { label: 'Still Conscious', description: 'Try max medical therapy + BiPAP', next: 'asthma-bipap-sedation' },
      { label: 'Agonal/Arresting', description: 'Must intubate immediately', next: 'asthma-crash-airway' },
    ],
  },

  // =====================================================================
  // MODULE 2: MAXIMIZE MEDICAL THERAPY
  // =====================================================================

  {
    id: 'asthma-continuous-nebs',
    type: 'info',
    module: 2,
    title: 'Continuous Nebulization',
    body: '**Continuous nebulization is superior to intermittent for severe asthma:** [7]\n\n**Protocol:**\n• **Albuterol**: 10-15mg/hr continuous (undiluted albuterol in nebulizer)\n• **Ipratropium**: Add 0.5mg to first hour only\n• Run continuously until patient improves\n\n**How to Set Up:**\n1. Attach nebulizer to O2 at 8-10 L/min\n2. Add undiluted albuterol 5mg/mL (3-4 mL = 15-20mg)\n3. Run until empty, immediately refill\n4. Use inline nebulizer if on BiPAP/HFNC\n\n**Evidence:**\n• Cochrane review: continuous > intermittent in severe asthma\n• Fewer hospitalizations, greater FEV1 improvement\n• Safe - monitor for tremor, tachycardia, hypokalemia [7]\n\n**Monitor for Beta-Agonist Side Effects:**\n• Tachycardia (usually tolerable)\n• Hypokalemia - check q2-4h, replace aggressively\n• Tremor\n• Lactic acidosis (usually mild)',
    citation: [7],
    next: 'asthma-magnesium',
  },

  {
    id: 'asthma-magnesium',
    type: 'info',
    module: 2,
    title: 'IV Magnesium Sulfate',
    body: '**Magnesium is a bronchodilator for SEVERE asthma:** [5][8]\n\n**Dosing:**\n• **2 grams IV over 20 minutes**\n• Can repeat x1 if severe\n• Max benefit in severe asthma (PEF <25%)\n\n**Mechanism:**\n• Smooth muscle relaxation\n• Inhibits calcium-mediated bronchoconstriction\n• Decreases inflammatory mediator release\n\n**Evidence:**\n• NNT = 4 to prevent hospitalization in severe asthma [8]\n• Most benefit when PEF <25% predicted\n• Safe with minimal side effects\n\n**Side Effects:**\n• Flushing, warmth (common, benign)\n• Hypotension (rare at this dose)\n• Respiratory depression (very rare)\n\n**⚠️ Less effective in mild-moderate asthma - reserve for severe cases**\n\nCheck Mg level only if giving multiple doses or renal impairment',
    citation: [5, 8],
    next: 'asthma-adjunct-decision',
  },

  {
    id: 'asthma-adjunct-decision',
    type: 'question',
    module: 2,
    title: 'Adjunct Therapy',
    body: 'Patient has received continuous nebs and IV magnesium.\n\nWhat is the response?',
    options: [
      { label: 'Improving', description: 'Continue monitoring', next: 'asthma-disposition-criteria' },
      { label: 'Not Improving - Add Ketamine', description: 'Bronchodilatory properties', next: 'asthma-ketamine' },
      { label: 'Not Improving - Add Epinephrine', description: 'SC/IM or IV for critical', next: 'asthma-epinephrine' },
      { label: 'Fatiguing - Need BiPAP', description: 'Non-invasive ventilation', next: 'asthma-bipap-indications' },
    ],
  },

  {
    id: 'asthma-ketamine',
    type: 'info',
    module: 2,
    title: 'Ketamine for Bronchospasm',
    body: '**Ketamine has bronchodilatory properties:** [9]\n\n**Mechanism:**\n• Direct smooth muscle relaxation\n• Catecholamine release (endogenous epinephrine)\n• Inhibits vagal-mediated bronchoconstriction\n\n**Dosing for Bronchospasm (sub-dissociative):**\n• **0.1-0.2 mg/kg IV bolus** (10-20mg for typical adult)\n• Can repeat q10-15 min as needed\n• Or **0.5 mg/kg/hr IV infusion**\n\n**Benefits in Asthma:**\n• Does NOT cause respiratory depression at sub-dissociative doses\n• Bronchodilation without airway collapse\n• Can use as sedation for BiPAP (see next)\n• Maintains airway reflexes\n\n**Side Effects:**\n• Emergence reaction (rare at low doses)\n• Hypersalivation - give glycopyrrolate 0.2mg IV if needed\n• Nystagmus, feeling "weird"\n\n**EMCrit Pearl:** "Ketamine is the sedative of choice in severe asthma - it opens airways rather than collapsing them" [9]',
    citation: [9],
    next: 'asthma-ketamine-next',
  },

  {
    id: 'asthma-ketamine-next',
    type: 'question',
    module: 2,
    title: 'After Ketamine',
    body: 'What is the next step?',
    options: [
      { label: 'Use for BiPAP Sedation', description: 'Patient needs NIV support', next: 'asthma-bipap-sedation' },
      { label: 'Add Epinephrine', description: 'Still not improving', next: 'asthma-epinephrine' },
      { label: 'Reassess', description: 'Check response', next: 'asthma-disposition-criteria' },
    ],
  },

  {
    id: 'asthma-epinephrine',
    type: 'info',
    module: 2,
    title: 'Epinephrine',
    body: '**Epinephrine for severe asthma unresponsive to beta-agonists:** [10][11]\n\n**Routes & Dosing:**\n\n**Subcutaneous/IM:**\n• **0.3-0.5 mg (1:1000) IM/SQ q20min x 3 doses**\n• Same as anaphylaxis dosing\n• Fast-acting, effective for severe asthma\n\n**IV (for critical patients):**\n• **Push-dose epi: 10-20 mcg IV q2-3min**\n• Or infusion: 1-10 mcg/min\n• Reserve for impending arrest\n\n**Nebulized Epinephrine:**\n• L-epinephrine 0.5mL of 2.25% (racemic) in 3mL NS\n• Or regular epinephrine 3-5mg (3-5mL of 1:1000)\n• Add to continuous albuterol\n\n**When to Use:**\n• Severe asthma failing SABA\n• Young patients without cardiac disease\n• Anaphylaxis component suspected\n\n**⚠️ Caution in elderly, cardiac history, hypertension**\n\n**Pearl:** IM epinephrine is safe and underutilized in severe asthma [10]',
    citation: [10, 11],
    next: 'asthma-epi-next',
  },

  {
    id: 'asthma-epi-next',
    type: 'question',
    module: 2,
    title: 'After Epinephrine',
    body: 'What is the response after epinephrine?',
    options: [
      { label: 'Improving', description: 'Continue monitoring', next: 'asthma-disposition-criteria' },
      { label: 'Need BiPAP', description: 'Fatiguing, needs support', next: 'asthma-bipap-indications' },
      { label: 'Need Intubation', description: 'Failing all therapies', next: 'asthma-intubation-indications' },
    ],
  },

  // =====================================================================
  // MODULE 3: BiPAP & SEDATION
  // =====================================================================

  {
    id: 'asthma-bipap-indications',
    type: 'info',
    module: 3,
    title: 'BiPAP - Indications',
    body: '**BiPAP can prevent intubation in severe asthma:** [12]\n\n**Indications for BiPAP:**\n• Severe asthma failing maximal medical therapy\n• Fatigue/respiratory distress despite treatment\n• Rising pCO2 on VBG\n• Patient still alert and cooperative\n\n**Contraindications:**\n• Altered mental status (unless from hypercapnia)\n• Inability to protect airway\n• Facial trauma/burns\n• Uncooperative patient (consider sedation first)\n• Hemodynamic instability\n\n**Evidence:**\n• Cochrane review shows benefit in acute asthma [12]\n• Reduces work of breathing\n• Can deliver nebulized meds through circuit\n• Bridge to allow medications time to work\n\n**Key Concept:**\nBiPAP "buys time" for medications to work. Combine with ketamine sedation if patient is anxious or fighting the mask.',
    citation: [12],
    next: 'asthma-bipap-settings',
  },

  {
    id: 'asthma-bipap-settings',
    type: 'info',
    module: 3,
    title: 'BiPAP Settings',
    body: '**Initial BiPAP Settings for Asthma:** [3][12]\n\n**Starting Settings:**\n• **EPAP (PEEP): 5 cm H2O** - start LOW\n• **IPAP: 10-12 cm H2O** - titrate for comfort\n• **Pressure Support = IPAP - EPAP = 5-7 cm H2O**\n• **FiO2: Start at 100%, wean to SpO2 92-95%**\n\n**Why LOW PEEP in Asthma?**\n• Asthmatics have severe air-trapping (auto-PEEP)\n• External PEEP can worsen hyperinflation\n• Start low, only increase if needed\n\n**Titration:**\n• Increase IPAP by 2 cm q5-10 min for comfort/tidal volume\n• Max IPAP usually 15-18 cm H2O\n• Keep EPAP low (5-8) unless clear benefit\n\n**Add Inline Nebulizer:**\n• Continue continuous albuterol through BiPAP circuit\n• Place nebulizer between mask and expiratory port\n\n**Monitoring:**\n• Respiratory rate (should decrease)\n• Patient comfort\n• VBG at 30-60 min (pCO2 should improve)\n• SpO2 (target 92-95%)',
    citation: [3, 12],
    next: 'asthma-bipap-tolerance',
  },

  {
    id: 'asthma-bipap-tolerance',
    type: 'question',
    module: 3,
    title: 'BiPAP Tolerance',
    body: 'Is the patient tolerating BiPAP?',
    options: [
      { label: 'Yes - Tolerating Well', description: 'Continue monitoring', next: 'asthma-bipap-success' },
      { label: 'No - Anxious/Fighting', description: 'Needs sedation', next: 'asthma-bipap-sedation' },
      { label: 'Failing BiPAP', description: 'Consider intubation', next: 'asthma-intubation-indications' },
    ],
  },

  {
    id: 'asthma-bipap-sedation',
    type: 'info',
    module: 3,
    title: 'Sedation for BiPAP',
    body: '**Ketamine is the IDEAL sedative for BiPAP in asthma:** [9]\n\n**Why Ketamine?**\n• Does NOT cause respiratory depression\n• Bronchodilatory properties\n• Maintains airway reflexes\n• Patient remains arousable\n\n**Dosing for BiPAP Tolerance:**\n• **Bolus: 0.2-0.3 mg/kg IV** (20-30mg for typical adult)\n• **Infusion: 0.5-1 mg/kg/hr** (optional for ongoing sedation)\n• Can repeat bolus q10-15 min as needed\n\n**Goal:**\n• Patient calm but arousable\n• Tolerating mask\n• Not fighting BiPAP\n• Still breathing spontaneously\n\n**Adjuncts if Needed:**\n• **Glycopyrrolate 0.2-0.4mg IV** for hypersalivation\n• Small dose **midazolam 0.5-1mg IV** if emergence concern (rare)\n\n**⚠️ AVOID in asthma:**\n• Propofol (respiratory depression)\n• High-dose benzodiazepines\n• Opioids (respiratory depression)\n\n**Pearl:** "A little ketamine goes a long way - start low"',
    citation: [9],
    next: 'asthma-bipap-settings',
  },

  {
    id: 'asthma-bipap-success',
    type: 'info',
    module: 3,
    title: 'BiPAP Success - Weaning',
    body: '**Signs BiPAP is Working:**\n• Decreased respiratory rate\n• Improved patient comfort\n• Decreased accessory muscle use\n• Improving pCO2 on VBG\n• SpO2 improving or stable\n\n**Weaning BiPAP:**\n1. Continue for 1-2 hours minimum after improvement\n2. Decrease IPAP by 2 cm q30-60 min as tolerated\n3. Trial off BiPAP when:\n   - IPAP ≤10, EPAP ≤5\n   - Comfortable\n   - RR <25\n   - SpO2 >92% on low FiO2\n\n**After BiPAP:**\n• Continue continuous nebs\n• Reassess for disposition\n• Check post-BiPAP PEF\n\n**If BiPAP Tolerated Well:**\n• Most can avoid intubation\n• ICU admission for close monitoring\n• Continue aggressive medical therapy',
    citation: [1, 12],
    next: 'asthma-disposition-criteria',
  },

  // =====================================================================
  // MODULE 4: INTUBATION APPROACH
  // =====================================================================

  {
    id: 'asthma-intubation-indications',
    type: 'info',
    module: 4,
    title: 'Intubation Decision',
    body: '**Intubation in asthma is HIGH RISK - avoid if possible:** [3][6]\n\n**Absolute Indications:**\n• Respiratory arrest\n• Cardiac arrest\n• Severe hypoxemia despite maximal therapy\n• Obtunded/cannot protect airway\n\n**Relative Indications:**\n• Fatigue despite maximal therapy + BiPAP\n• Rapidly rising pCO2 with acidosis\n• Unable to tolerate BiPAP\n\n**Why Is Intubation Dangerous?**\n• Paralysis removes compensatory mechanisms\n• Air trapping worsens → breath stacking → hypotension\n• Difficult to ventilate\n• High mortality in intubated asthmatics\n\n**EMCrit Rule:**\n"If you intubate an asthmatic and they arrest, disconnect the ETT and compress the chest manually for 30-60 seconds to relieve air trapping"\n\n**Before Intubating - Ask:**\n1. Have I maximized continuous nebs?\n2. Have I given IV Mg?\n3. Have I tried ketamine?\n4. Have I tried epinephrine?\n5. Have I tried BiPAP with ketamine sedation?',
    citation: [3, 6],
    next: 'asthma-intubation-decision',
  },

  {
    id: 'asthma-intubation-decision',
    type: 'question',
    module: 4,
    title: 'Intubation Decision',
    body: 'After reviewing all options, what is the best course?',
    options: [
      { label: 'Return to Medical Therapy', description: 'More time for meds to work', next: 'asthma-continuous-nebs' },
      { label: 'Try BiPAP + Ketamine', description: 'Last chance before tube', next: 'asthma-bipap-sedation' },
      { label: 'Must Intubate - DSI', description: 'Patient still conscious', next: 'asthma-dsi' },
      { label: 'Crash Intubation', description: 'Agonal or arresting', next: 'asthma-crash-airway' },
    ],
  },

  {
    id: 'asthma-dsi',
    type: 'info',
    module: 4,
    title: 'Delayed Sequence Intubation',
    body: '**DSI = preoxygenate BEFORE paralyzing:** [13]\n\n**Why DSI in Asthma?**\n• Asthmatics often hypoxemic and hypercapnic\n• BiPAP/HFNC for preoxygenation is superior\n• Ketamine allows preoxygenation without losing reflexes\n• Time to denitrogenate properly\n\n**DSI Protocol:**\n1. **Ketamine 1-1.5 mg/kg IV** - dissociate the patient\n2. **Apply BiPAP or NRB** for 3-5 minutes\n3. **When SpO2 optimal** (ideally >95%), give:\n   - Ketamine 1-2 mg/kg IV (induction)\n   - Rocuronium 1.2 mg/kg IV\n4. **Intubate when paralyzed**\n\n**Why Ketamine for Induction?**\n• Bronchodilatory\n• Maintains hemodynamic stability\n• No histamine release\n\n**Avoid in Asthma Intubation:**\n• ~~Propofol~~ - hypotension, no bronchodilation\n• ~~Etomidate~~ - no bronchodilation\n• ~~Succinylcholine~~ - histamine release\n\n**Tube Selection:**\n• Large ETT (7.5-8.0 for women, 8.0-8.5 for men)\n• Larger tube = less resistance for air trapping',
    citation: [9, 13],
    next: 'asthma-vent-settings',
  },

  {
    id: 'asthma-crash-airway',
    type: 'info',
    module: 4,
    title: 'Crash Airway',
    body: '**Patient Arresting or Agonal - No Time for DSI:** [3]\n\n**Immediate Actions:**\n1. **Bag-mask ventilate** - slow breaths, allow full exhalation\n2. **Intubate immediately** - use ketamine 1.5-2 mg/kg if IV available\n3. **Skip paralytic** if truly agonal/apneic\n4. **Largest ETT possible**\n\n**If Already Intubated and Arrests:**\n1. **Disconnect ETT from ventilator**\n2. **Manual chest compression** for 30-60 seconds\n3. This allows air trapped under pressure to escape\n4. Reconnect and ventilate with LOW rate, LONG expiratory time\n\n**Push-Dose Epinephrine:**\n• If hypotensive: 10-20 mcg IV q2-3min\n• Full arrest: 1mg IV per ACLS\n\n**Post-Intubation:**\n• Immediate post-intubation CXR (pneumothorax?)\n• Continue continuous nebs through vent circuit\n• Very conservative ventilator settings',
    citation: [3],
    next: 'asthma-vent-settings',
  },

  // =====================================================================
  // MODULE 5: VENTILATOR MANAGEMENT
  // =====================================================================

  {
    id: 'asthma-vent-settings',
    type: 'info',
    module: 5,
    title: 'Ventilator Settings',
    body: '**Ventilator strategy: LOW rate, LONG expiratory time:** [14][15]\n\n**Initial Settings:**\n| Parameter | Setting | Rationale |\n|-----------|---------|----------|\n| Mode | Volume Control (AC/VC) | Guaranteed tidal volume |\n| Tidal Volume | 6-8 mL/kg IBW | Avoid overdistension |\n| Rate | **8-12 breaths/min** | LOW rate! |\n| I:E Ratio | **1:4 to 1:5** | Long expiratory time |\n| FiO2 | 100% initially | Wean as tolerated |\n| PEEP | **0-5 cm H2O** | Start VERY low |\n\n**Why These Settings?**\n• **Low rate + long I:E** = time for air to escape\n• Air trapping causes:\n  - Breath stacking\n  - Auto-PEEP\n  - Hypotension\n  - Pneumothorax\n\n**Monitor for Air Trapping:**\n• Plateau pressure >30 (bad)\n• Auto-PEEP >10 (very bad)\n• Hypotension (disconnect test)\n• Worsening oxygenation\n\n**If Hypotensive Post-Intubation:**\n→ Disconnect ETT, compress chest, reconnect at lower rate',
    citation: [14, 15],
    calculatorLinks: [
      { id: 'ideal-body-weight', label: 'IBW Calculator' },
      { id: 'ie-ratio', label: 'I:E Ratio' },
    ],
    next: 'asthma-permissive-hypercapnia',
  },

  {
    id: 'asthma-permissive-hypercapnia',
    type: 'info',
    module: 5,
    title: 'Permissive Hypercapnia',
    body: '**Permissive hypercapnia is REQUIRED in severe asthma:** [14][15]\n\n**Concept:**\n• Accept elevated pCO2 to avoid dangerous ventilator settings\n• Priority: prevent air trapping, not normalize pCO2\n• "Lungs are obstructed, not dead - CO2 will normalize later"\n\n**Acceptable Targets:**\n• **pH >7.15-7.20** (tolerate lower if stable)\n• **pCO2: 60-80 mmHg OK** (even higher if needed)\n• **SpO2 >88-90%**\n\n**What NOT to Do:**\n• ❌ Don\'t increase rate to "fix" pCO2\n• ❌ Don\'t increase tidal volume significantly\n• ❌ Don\'t chase normal ABG numbers\n\n**Contraindications to Permissive Hypercapnia:**\n• Elevated ICP\n• Severe metabolic acidosis (pH already very low)\n• Cardiovascular instability\n\n**Evidence:**\n• Tuxen DV showed permissive hypercapnia dramatically reduced mortality in status asthmaticus [15]\n• Traditional ventilation (normal pCO2) = 38% mortality\n• Permissive hypercapnia = 0% mortality in his series',
    citation: [14, 15],
    next: 'asthma-vent-troubleshoot',
  },

  {
    id: 'asthma-vent-troubleshoot',
    type: 'info',
    module: 5,
    title: 'Vent Troubleshooting',
    body: '**Common Problems and Solutions:** [3][14]\n\n**HYPOTENSION Post-Intubation:**\nMost common cause = air trapping\n1. **Disconnect ETT** from vent for 30-60 sec\n2. **Compress chest** to expel trapped air\n3. **Reconnect** with LOWER rate, LONGER expiratory time\n4. If persists → pneumothorax? → needle decompression\n\n**HIGH PLATEAU PRESSURES (>30):**\n• Auto-PEEP from air trapping\n• Decrease rate further\n• Increase expiratory time\n• Consider sedation if patient fighting vent\n\n**BREATH STACKING:**\n• Patient triggering extra breaths\n• Deep sedation with propofol + fentanyl\n• May need paralysis (cisatracurium)\n• Decrease sensitivity if auto-triggering\n\n**WORSENING OXYGENATION:**\nRule out:\n• Pneumothorax (CXR, ultrasound)\n• Mucus plugging (suction)\n• Right mainstem intubation\n• Atelectasis\n\n**BRONCHOSPASM ON VENT:**\n• Continue continuous nebs through circuit\n• Add ketamine infusion\n• Add magnesium if not given',
    citation: [3, 14],
    next: 'asthma-vent-ongoing',
  },

  {
    id: 'asthma-vent-ongoing',
    type: 'info',
    module: 5,
    title: 'Ongoing Vent Management',
    body: '**Ongoing Management of Intubated Asthmatic:** [6]\n\n**Sedation:**\n• Propofol 25-75 mcg/kg/min + fentanyl 25-100 mcg/hr\n• Deep sedation often required initially\n• RASS -4 to -5 acceptable initially\n\n**Paralysis:**\n• May be needed for severe air trapping\n• Cisatracurium 0.15 mg/kg load, then 2-3 mcg/kg/min\n• Use train-of-four monitoring\n• Wean ASAP (increases ICU complications)\n\n**Continue Bronchodilators:**\n• Continuous albuterol via inline nebulizer\n• IV magnesium (consider infusion 1-2 g/hr)\n• IV methylprednisolone 40-60mg q6h\n\n**Monitoring:**\n• VBG/ABG q4-6h initially\n• Plateau pressure and auto-PEEP\n• CXR daily (pneumothorax)\n• Electrolytes (hypokalemia common)\n\n**Liberation:**\n• Improve bronchospasm before weaning\n• SBT only when airway pressures improved\n• High risk for reintubation - be conservative',
    citation: [6],
    next: 'asthma-disposition-icu',
  },

  // =====================================================================
  // MODULE 6: PFT & DISPOSITION
  // =====================================================================

  {
    id: 'asthma-disposition-criteria',
    type: 'info',
    module: 6,
    title: 'Disposition Criteria',
    body: '**Use PEF to guide disposition:** [1][2][16]\n\n**Peak Expiratory Flow (PEF) Thresholds:**\n\n| PEF (% predicted or personal best) | Disposition |\n|-----------------------------------|-------------|\n| **≥70%** | Discharge home |\n| **50-69%** | Consider observation or discharge with close follow-up |\n| **<50%** | Admission likely |\n| **<25%** | ICU admission |\n\n[PEF Calculator](#/calc/pef-predicted)\n\n**Additional Discharge Criteria:**\n• Symptom resolution or significant improvement\n• SpO2 ≥94% on room air\n• Able to ambulate without distress\n• Able to use inhaler correctly\n• Has medications or prescription\n• Can access follow-up (PCP within 2-7 days)\n• No high-risk features\n\n**High-Risk Features Favoring Admission:**\n• Prior intubation for asthma\n• ICU admission in past year\n• ≥2 hospitalizations or ≥3 ED visits in past year\n• Recent oral steroid use\n• Poor social support\n• Psychiatric comorbidity',
    citation: [1, 2, 16],
    calculatorLinks: [
      { id: 'pef-predicted', label: 'PEF % Predicted' },
    ],
    next: 'asthma-dispo-decision',
  },

  {
    id: 'asthma-dispo-decision',
    type: 'question',
    module: 6,
    title: 'Disposition Decision',
    body: 'Based on PEF and clinical assessment, what is the disposition?',
    options: [
      { label: 'Discharge Home', description: 'PEF ≥70%, symptoms resolved', next: 'asthma-discharge' },
      { label: 'Observation Unit', description: 'PEF 50-69%, improving', next: 'asthma-observation' },
      { label: 'Admit to Floor', description: 'PEF <50%, needs ongoing therapy', next: 'asthma-admit-floor' },
      { label: 'Admit to ICU', description: 'BiPAP, severe features, PEF <25%', next: 'asthma-disposition-icu' },
    ],
  },

  {
    id: 'asthma-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge Planning',
    body: '**Discharge Medications:** [1][2]\n\n**MUST PRESCRIBE:**\n1. **Rescue inhaler**: Albuterol MDI 2 puffs q4-6h PRN\n2. **Oral steroids**:\n   - Prednisone 40-60mg daily x 5-7 days, OR\n   - Dexamethasone 16mg single dose (better compliance)\n3. **Controller medication**: ICS or ICS-formoterol if not already on\n\n**Prescription Tips:**\n• Verify inhaler technique before discharge\n• Spacer improves MDI delivery significantly\n• ICS-formoterol can be used as both maintenance AND rescue (MART therapy)\n\n**Discharge Instructions:**\n• Return immediately if worsening\n• Avoid triggers (smoke, allergens, NSAIDs if aspirin-sensitive)\n• Follow-up with PCP in 2-7 days\n• Follow-up with pulmonology/allergist if recurrent\n\n**Asthma Action Plan:**\n• Provide written action plan\n• Green/Yellow/Red zone system\n• When to increase medications\n• When to seek emergency care\n\n**Consider Referral:**\n• Allergist for allergy testing/immunotherapy\n• Pulmonologist for severe/difficult asthma',
    recommendation: 'Discharge with rescue inhaler, oral steroids (prednisone 5-7 days or dexamethasone single dose), and controller medication. Verify inhaler technique. PCP follow-up in 2-7 days.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'asthma-observation',
    type: 'info',
    module: 6,
    title: 'Observation Unit',
    body: '**Observation unit for borderline cases:**\n\n**Ideal Candidates:**\n• PEF 50-69% predicted\n• Improving but not quite ready for discharge\n• Need additional nebulizer treatments\n• Social factors requiring observation\n\n**Observation Protocol:**\n• Continue nebs q2-4h\n• Reassess PEF q4h\n• Monitor for deterioration\n• Clear discharge criteria\n\n**Discharge from Observation if:**\n• PEF improves to ≥70%\n• Symptom resolution\n• SpO2 ≥94% RA\n• Tolerating PO\n• 6-12 hours symptom-free\n\n**Convert to Admission if:**\n• PEF not improving\n• Recurrent symptoms\n• Requires continuous nebs\n• Unable to wean O2\n\n**Observation is NOT appropriate for:**\n• Severe exacerbation\n• High-risk patients\n• BiPAP requirement\n• Prior intubation/ICU',
    citation: [1, 2],
    next: 'asthma-dispo-decision',
  },

  {
    id: 'asthma-admit-floor',
    type: 'info',
    module: 6,
    title: 'Floor Admission',
    body: '**Floor Admission Criteria:**\n\n**Admit to Medical Floor if:**\n• PEF 25-50% predicted after ED treatment\n• Requiring supplemental O2\n• Requiring nebs more frequently than q4h\n• High-risk features (prior intubation, multiple ED visits)\n• Unable to be safely discharged\n\n**Floor Orders:**\n• Continuous SpO2 monitoring\n• Scheduled albuterol q4h + PRN\n• IV or PO steroids\n• RT to titrate O2 to SpO2 ≥92%\n• Call MD if: RR >30, SpO2 <90%, severe distress\n\n**Monitor For:**\n• Need for escalation to ICU\n• Worsening despite treatment\n• Development of pneumonia\n• Mucus plugging\n\n**Expected LOS:**\n• Most floor admissions 1-3 days\n• Longer if requiring IV steroids\n• Can discharge when PEF >70% and off O2',
    citation: [1, 2],
    next: 'asthma-dispo-decision',
  },

  {
    id: 'asthma-disposition-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU Admission Criteria:** [3][6]\n\n**Mandatory ICU if:**\n• Intubated\n• Requiring BiPAP\n• Hemodynamically unstable\n• Altered mental status\n• PEF <25% predicted\n• Requiring continuous nebulization\n• Rapid deterioration despite ED treatment\n\n**ICU Goals:**\n• Avoid intubation if possible\n• Aggressive bronchodilation\n• Permissive hypercapnia if intubated\n• Minimize ventilator-induced lung injury\n• Early mobilization when stable\n\n**ICU Orders - Non-Intubated:**\n• BiPAP with inline nebulizer\n• Continuous albuterol\n• IV magnesium\n• IV methylprednisolone 125mg then 40mg q6h\n• Ketamine infusion 0.5-1 mg/kg/hr PRN\n• Intubation equipment at bedside\n\n**ICU Orders - Intubated:**\n• Volume control, low rate, long I:E\n• Permissive hypercapnia\n• Deep sedation ± paralysis\n• Continue nebs through vent\n• Daily spontaneous breathing trial when improved\n\n**Communication:**\n• Clear escalation criteria\n• Family meeting regarding prognosis\n• Document code status',
    recommendation: 'Admit to ICU for close monitoring. If on BiPAP: continuous nebs, IV magnesium, IV steroids, ketamine infusion. If intubated: volume control with low rate, long I:E, permissive hypercapnia.',
    confidence: 'recommended',
    citation: [3, 6],
  },
];

// =====================================================================
// MODULE LABELS
// =====================================================================

export const ASTHMA_EXACERBATION_MODULE_LABELS = [
  'Initial Assessment & Severity',
  'Maximize Medical Therapy',
  'BiPAP & Sedation',
  'Intubation Approach',
  'Ventilator Management',
  'PFT & Disposition',
];

export const ASTHMA_EXACERBATION_NODE_COUNT = 36;

// =====================================================================
// CRITICAL ACTIONS
// =====================================================================

export const ASTHMA_EXACERBATION_CRITICAL_ACTIONS = [
  { text: 'Severity: silent chest = severe', nodeId: 'asthma-severity' },
  { text: 'Continuous nebs > intermittent', nodeId: 'asthma-continuous-nebs' },
  { text: 'IV Mg 2g over 20 min for severe', nodeId: 'asthma-magnesium' },
  { text: 'Ketamine for bronchospasm', nodeId: 'asthma-ketamine' },
  { text: 'BiPAP: EPAP 5, IPAP 10-12 start', nodeId: 'asthma-bipap-settings' },
  { text: 'Ketamine sedation for BiPAP', nodeId: 'asthma-bipap-sedation' },
  { text: 'DSI: ketamine + preoxygenate', nodeId: 'asthma-dsi' },
  { text: 'Vent: low rate, long expiratory time', nodeId: 'asthma-vent-settings' },
  { text: 'Permissive hypercapnia OK', nodeId: 'asthma-permissive-hypercapnia' },
  { text: 'PEF >70% predicted = discharge', nodeId: 'asthma-disposition-criteria' },
];

// =====================================================================
// CITATIONS
// =====================================================================

export const ASTHMA_EXACERBATION_CITATIONS: Citation[] = [
  {
    num: 1,
    text: 'GINA 2024 Report: Global Strategy for Asthma Management and Prevention. ginasthma.org',
  },
  {
    num: 2,
    text: 'UpToDate: Acute severe asthma exacerbation in adults: Treatment. uptodate.com',
  },
  {
    num: 3,
    text: 'Weingart SD. EMCrit Podcast 6 - Severe Asthma & Status Asthmaticus. emcrit.org',
  },
  {
    num: 4,
    text: 'Rodrigo GJ et al. Early systemic corticosteroids in acute asthma. Chest 2006;129(6):1478-1485.',
  },
  {
    num: 5,
    text: 'Rowe BH et al. IV magnesium for acute asthma in the ED. Cochrane Database Syst Rev 2017.',
  },
  {
    num: 6,
    text: 'Corbridge TC, Hall JB. The assessment and management of adults with status asthmaticus. Am J Respir Crit Care Med 1995;151(5):1296-1316.',
  },
  {
    num: 7,
    text: 'Camargo CA et al. Continuous versus intermittent beta-agonists for acute asthma. Cochrane Database Syst Rev 2003.',
  },
  {
    num: 8,
    text: 'Kew KM et al. IV magnesium sulfate for treating adults with acute asthma in the ED. Cochrane Database Syst Rev 2014.',
  },
  {
    num: 9,
    text: 'Weingart SD. EMCrit - Ketamine for Severe Asthma. emcrit.org',
  },
  {
    num: 10,
    text: 'Howton JC et al. Randomized, double-blind, placebo-controlled trial of epinephrine in acute asthma. Ann Emerg Med 1993;22(12):1842-1846.',
  },
  {
    num: 11,
    text: 'Cydulka RK et al. Comparison of single dose epinephrine to albuterol in the treatment of acute asthma. Am J Emerg Med 1993;11(3):235-238.',
  },
  {
    num: 12,
    text: 'Lim WJ et al. Non-invasive positive pressure ventilation for treatment of respiratory failure due to severe acute exacerbations of asthma. Cochrane Database Syst Rev 2012.',
  },
  {
    num: 13,
    text: 'Weingart SD. Delayed Sequence Intubation. EMCrit Blog. emcrit.org',
  },
  {
    num: 14,
    text: 'Brenner B et al. EMCrit - Ventilator Management in Obstructive Lung Disease. emcrit.org',
  },
  {
    num: 15,
    text: 'Tuxen DV, Lane S. The effects of ventilatory pattern on hyperinflation, airway pressures, and circulation in mechanical ventilation of patients with severe air-flow obstruction. Am Rev Respir Dis 1987;136(4):872-879.',
  },
  {
    num: 16,
    text: 'Gupta D et al. Guidelines for diagnosis and management of bronchial asthma: Joint ICS/NCCP (I) recommendations. Lung India 2015;32(Suppl 1):S3-S42.',
  },
];
