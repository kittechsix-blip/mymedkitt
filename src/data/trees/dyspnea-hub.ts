// MedKitt - Shortness of Breath / Dyspnea Hub
// Rule-in / rule-out engine. Each differential walks its validated decision
// instrument to an explicit verdict. Scoring tools live in the bottom toolbar.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const DYSPNEA_HUB_CRITICAL_ACTIONS = [
  { text: 'Work of breathing and mental status outrank pulse ox alone', nodeId: 'dysp-start' },
  { text: 'In LOW pretest probability, PERC-negative rules out PE with no D-dimer', nodeId: 'dysp-pe-perc' },
  { text: 'HIGH pretest probability PE goes straight to CTPA - D-dimer cannot rule it out', nodeId: 'dysp-pe-highprob' },
  { text: 'Tension pneumothorax is decompressed clinically before imaging', nodeId: 'dysp-ptx-verdict' },
];

export const DYSPNEA_HUB_NODES: DecisionNode[] = [
  // ---------------------------------------------------------------------
  // MODULE 1 - SICK CHECK
  // ---------------------------------------------------------------------
  {
    id: 'dysp-start',
    type: 'info',
    module: 1,
    title: 'Shortness of Breath Hub - Sick Check First',
    body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Tension pneumothorax** \u2014 unilateral absent breath sounds + shock \u2192 decompress before imaging.\n2. **Pulmonary embolism** \u2014 hypoxia, RV strain, clear lungs, VTE risk factors.\n3. **Acute pulmonary edema / SCAPE** \u2014 crackles, hypoxia, hypertension \u2192 NIV + nitrates early.\n4. **Anaphylaxis / airway angioedema** \u2014 stridor, urticaria, exposure \u2192 IM epinephrine now.\n5. **Toxic/metabolic dyspnea (CO, methemoglobin, DKA, salicylate)** \u2014 co-oximetry, ABG, gaps.\n\n**First 60 seconds:**\n- Can they speak? Single words, tripod, diaphoresis, exhaustion, agitation, cyanosis?\n- Work of breathing: accessory muscles, paradoxical breathing, silent chest.\n- SpO2 is not enough: check waveform, consider CO/methemoglobin, watch ventilation.\n- Monitor, IV, ECG, CXR when stable, POCUS early when the diagnosis is unclear.\n- Position upright. Oxygen target usually 94-98%; 88-92% if known CO2 retainer or hypercapnic risk.\n- If impending failure: call airway help early, prepare NIV vs intubation while treating the cause.\n\nThis hub does not stop at a differential. For each diagnosis it walks the **validated rule-in / rule-out pathway** to an explicit verdict.',
    citation: [1, 2],
    next: 'dysp-triage',
    summary: 'Work of breathing, mental status, and ventilation first; oxygen target depends on hypercapnia risk.',
    safetyLevel: 'critical',
  },

  // ---------------------------------------------------------------------
  // MODULE 2 - TIME-CRITICAL EXCLUSIONS (rule-in / rule-out engine)
  // ---------------------------------------------------------------------
  {
    id: 'dysp-triage',
    type: 'question',
    module: 2,
    title: 'Which Diagnosis Are You Working Up?',
    body: 'Pick the differential you want to rule in or rule out. Each path runs its validated decision instrument (Wells, Geneva, PERC, CURB-65, and others in the bottom toolbar) to a clear verdict. Work through more than one if the picture is mixed.',
    options: [
      { label: 'Pulmonary embolism', description: 'Wells / revised Geneva -> PERC -> age-adjusted D-dimer -> CTPA', next: 'dysp-pe-entry', urgency: 'critical' },
      { label: 'Acute pulmonary edema / SCAPE', description: 'Clinical + POCUS B-lines + BNP -> NIV / nitrates', next: 'dysp-scape-entry', urgency: 'critical' },
      { label: 'Pneumonia / lower respiratory infection', description: 'CXR + CURB-65 / PSI -> admit vs discharge', next: 'dysp-pna-entry', urgency: 'urgent' },
      { label: 'Pneumothorax', description: 'Exam + POCUS -> tension decompress vs size-based', next: 'dysp-ptx-entry', urgency: 'critical' },
      { label: 'COPD / asthma exacerbation', description: 'Severity + bronchodilator response -> NIV vs admit', next: 'dysp-obstructive-entry', urgency: 'critical' },
      { label: 'ACS presenting as dyspnea', description: 'ECG + troponin (Sgarbossa if paced/LBBB)', next: 'dysp-acs-entry', urgency: 'critical' },
      { label: 'Anaphylaxis', description: 'NIAID/FAAN criteria -> IM epinephrine now', next: 'dysp-anaphylaxis-entry', urgency: 'critical' },
      { label: 'Toxic / metabolic (CO, methemoglobin, acidosis)', description: 'Co-oximetry + ABG + gaps', next: 'dysp-tox-entry', urgency: 'critical' },
    ],
    citation: [1, 2],
    summary: 'Choose a differential; the hub runs its validated rule-in/rule-out instrument to a verdict.',
    safetyLevel: 'critical',
  },

  // ===================== PE PATHWAY =====================
  {
    id: 'dysp-pe-entry',
    type: 'question',
    module: 2,
    title: 'PE - Step 1: Establish Pretest Probability',
    body: 'Anchor the entire PE workup on pretest probability. Use a **validated score, not gestalt alone** (open **Wells PE** or **Revised Geneva** in the toolbar). The result decides whether PERC, D-dimer, or straight-to-CTPA is correct.\n\n- **Wells PE:** \u22644 = PE unlikely; >4 = PE likely.\n- **Revised Geneva:** 0-3 low, 4-10 intermediate, \u226511 high (fully objective, no judgment call).',
    options: [
      { label: 'LOW / unlikely (Wells \u22644 or Geneva low)', description: 'Eligible for PERC or age-adjusted D-dimer', next: 'dysp-pe-perc', urgency: 'urgent' },
      { label: 'INTERMEDIATE (Geneva 4-10)', description: 'Go to age-adjusted D-dimer', next: 'dysp-pe-ddimer', urgency: 'urgent' },
      { label: 'HIGH / likely (Wells >4 or Geneva \u226511)', description: 'CTPA directly - do NOT D-dimer', next: 'dysp-pe-highprob', urgency: 'critical' },
    ],
    citation: [3, 4, 6],
    summary: 'Score first (Wells or Geneva). Probability tier selects PERC vs D-dimer vs CTPA.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-pe-perc',
    type: 'question',
    module: 2,
    title: 'PE - Step 2 (LOW prob): Apply PERC',
    body: 'Only in **low pretest probability** (gestalt <15% or Wells \u22644). Open **PERC** in the toolbar. All 8 criteria must be negative to rule out PE without any testing.\n\nPERC: age <50, HR <100, SpO2 \u226595%, no hemoptysis, no estrogen, no prior VTE, no unilateral leg swelling, no recent surgery/trauma.',
    options: [
      { label: 'PERC negative (all 8 met)', description: 'PE ruled OUT - no D-dimer, no CT', next: 'dysp-pe-excluded', urgency: 'routine' },
      { label: 'PERC positive (any criterion fails)', description: 'Cannot rule out - go to D-dimer', next: 'dysp-pe-ddimer', urgency: 'urgent' },
    ],
    citation: [5],
    summary: 'PERC-negative in low probability rules out PE with zero further testing (sensitivity ~97.4%).',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-pe-ddimer',
    type: 'question',
    module: 2,
    title: 'PE - Step 3: Age-Adjusted D-Dimer',
    body: 'For low/intermediate probability that is not PERC-negative. Use an **age-adjusted threshold** in patients >50: cutoff = age \u00D7 10 ng/mL (FEU). This safely raises the negative rate without missing PE (ADJUST-PE).\n\n**Example:** a 70-year-old uses 700 ng/mL, not 500.\n\nThe **YEARS** algorithm is an accepted alternative (0 items + D-dimer <1000 rules out).',
    options: [
      { label: 'D-dimer below age-adjusted cutoff', description: 'PE ruled OUT', next: 'dysp-pe-excluded', urgency: 'routine' },
      { label: 'D-dimer at/above cutoff', description: 'Proceed to CTPA', next: 'dysp-pe-ctpa', urgency: 'urgent' },
    ],
    citation: [7, 8],
    summary: 'Age-adjusted D-dimer (age x 10 if >50). Below cutoff rules out; at/above -> CTPA.',
    safetyLevel: 'warning',
  },
  {
    id: 'dysp-pe-highprob',
    type: 'info',
    module: 2,
    title: 'PE - HIGH Probability: CTPA Directly',
    body: 'In **high pretest probability, D-dimer cannot rule out PE** and only delays diagnosis. Go straight to CTPA (or V/Q if contrast-contraindicated).\n\n- If unstable / suspected massive PE: **bedside echo for RV strain** while arranging definitive care; do not send an unresuscitated crashing patient to CT.\n- Consider empiric anticoagulation before imaging if the delay is meaningful and bleeding risk is acceptable.',
    citation: [4, 6],
    next: 'dysp-pe-ctpa',
    summary: 'High probability -> CTPA. Never use D-dimer to rule out high-probability PE.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-pe-ctpa',
    type: 'result',
    module: 2,
    title: 'PE - Confirmed / Imaging Positive: Risk-Stratify + Treat',
    body: 'PE confirmed on CTPA. Now **risk-stratify severity** to choose disposition and therapy (open **PESI** in the toolbar).\n\n- **Unstable (SBP <90 / shock):** massive PE \u2192 systemic thrombolysis or catheter therapy; activate PERT. Open [PE Treatment](#/tree/pe-treatment).\n- **Stable + RV strain (echo/CT) or elevated troponin:** submassive \u2192 monitored bed, PERT discussion.\n- **Low-risk (PESI I-II / sPESI 0):** anticoagulation; consider outpatient/observation if criteria met.',
    recommendation: 'Confirmed PE: anticoagulate; stratify with PESI; lyse/intervene if massive.',
    citation: [4, 9],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'dysp-pe-excluded',
    type: 'result',
    module: 2,
    title: 'PE - Ruled Out',
    body: 'PE is excluded by this validated pathway. **Document the pathway** (score tier + PERC or age-adjusted D-dimer result) so the reasoning is independently reviewable.\n\nReturn to the hub and rule in/out the next differential if dyspnea is unexplained \u2014 a negative PE workup is not a diagnosis.',
    recommendation: 'PE excluded by validated pathway; document and pursue alternate cause.',
    citation: [5, 7],
    next: 'dysp-triage',
    safetyLevel: 'warning',
    confidence: 'definitive',
  },

  // ===================== SCAPE / PULMONARY EDEMA =====================
  {
    id: 'dysp-scape-entry',
    type: 'question',
    module: 2,
    title: 'Acute Pulmonary Edema - Rule In',
    body: 'Rule in cardiogenic pulmonary edema at the bedside. **Diffuse bilateral B-lines on lung POCUS** are ~94% sensitive / ~92% specific for cardiogenic edema and beat CXR early. BNP helps when the picture is mixed (<100 pg/mL argues against; >500 supports).',
    options: [
      { label: 'Hypertensive, diffuse B-lines, severe distress', description: 'SCAPE phenotype', next: 'dysp-scape-verdict', urgency: 'critical' },
      { label: 'B-lines but normotensive / uncertain', description: 'Edema likely - treat and reassess', next: 'dysp-scape-verdict', urgency: 'urgent' },
      { label: 'No B-lines / A-lines predominate', description: 'Cardiogenic edema unlikely - reconsider', next: 'dysp-triage', urgency: 'routine' },
    ],
    citation: [1, 10],
    summary: 'Diffuse B-lines + hypertension rule in SCAPE; A-line pattern argues against edema.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-scape-verdict',
    type: 'result',
    module: 2,
    title: 'SCAPE / Pulmonary Edema - Treat',
    body: 'Open [CHF Exacerbation](#/tree/chf-exacerbation) and consider [SCAPE High-Dose Nitroglycerin](#/tree/scape-nitroglycerin).\n\n**Next 5 minutes:** upright, **NIV now**, high-dose nitrates for the hypertensive SCAPE phenotype, ECG/troponin, POCUS for B-lines/LV function. Avoid reflex large fluid boluses.\n\n**Pitfall:** wheeze can be cardiac asthma. Diffuse B-lines + hypertension + acute distress push toward NIV/nitrates, not just nebulizers.',
    recommendation: 'NIV + nitrates for the hypertensive pulmonary edema phenotype.',
    citation: [1, 10],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },

  // ===================== PNEUMONIA =====================
  {
    id: 'dysp-pna-entry',
    type: 'question',
    module: 2,
    title: 'Pneumonia - Rule In + Severity',
    body: 'Diagnosis needs a compatible syndrome (fever, cough, focal findings) **plus** an infiltrate (CXR, or POCUS consolidation/air-bronchograms when CXR lags). Once confirmed, decide disposition with a **validated severity tool** (open **CURB-65** or **PSI/PORT** in the toolbar).',
    options: [
      { label: 'Confirmed - score severity', description: 'CURB-65 / PSI decides site of care', next: 'dysp-pna-verdict', urgency: 'urgent' },
      { label: 'Sepsis physiology present', description: 'qSOFA + lactate, treat as sepsis', next: 'dysp-pna-verdict', urgency: 'critical' },
    ],
    citation: [11],
    summary: 'Confirm infiltrate, then CURB-65/PSI (and qSOFA if septic) to place the patient.',
    safetyLevel: 'warning',
  },
  {
    id: 'dysp-pna-verdict',
    type: 'result',
    module: 2,
    title: 'Pneumonia - Disposition + Treat',
    body: 'Open [Pneumonia](#/tree/pneumonia); open [Sepsis Management](#/tree/sepsis) if septic.\n\n**Disposition (ATS/IDSA):**\n- **CURB-65 0-1 / PSI I-II:** outpatient candidate.\n- **CURB-65 2 / PSI III:** observation vs short admission.\n- **CURB-65 \u22653 / PSI IV-V:** admit; consider ICU (use IDSA minor criteria / need for pressors or ventilation).\n\n**Treat:** oxygen, timely guideline-concordant antibiotics by severity and risk, lactate + blood cultures if septic (do not let cultures delay antibiotics), cautious fluids with frequent lung/IVC reassessment.',
    recommendation: 'Severity score sets site of care; antibiotics by ATS/IDSA severity tier.',
    citation: [11],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // ===================== PNEUMOTHORAX =====================
  {
    id: 'dysp-ptx-entry',
    type: 'question',
    module: 2,
    title: 'Pneumothorax - Rule In',
    body: 'Lung POCUS beats supine CXR for pneumothorax: **absent lung sliding + absent B-lines + a lung point** rules it in (lung point ~100% specific). Sudden pleuritic pain, unilateral hyperresonance, or a positive-pressure/procedure context raises suspicion.',
    options: [
      { label: 'Hypotension / severe distress / peri-arrest', description: 'Tension - decompress NOW before imaging', next: 'dysp-ptx-verdict', urgency: 'critical' },
      { label: 'POCUS/CXR positive, hemodynamically stable', description: 'Size-based management', next: 'dysp-ptx-verdict', urgency: 'urgent' },
      { label: 'Lung sliding present / no lung point', description: 'Pneumothorax effectively excluded', next: 'dysp-triage', urgency: 'routine' },
    ],
    citation: [12],
    summary: 'Absent sliding + lung point rules in PTX; present sliding rules it out. Tension is clinical.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-ptx-verdict',
    type: 'result',
    module: 2,
    title: 'Pneumothorax - Treat',
    body: 'Open [Pneumothorax](#/tree/pneumothorax).\n\n- **Tension physiology (hypotension, severe distress):** immediate needle/finger decompression, then tube \u2014 **do not wait for imaging.**\n- **Stable:** size and symptom-based management per BTS (observation, aspiration, or small-bore drain). Watch ventilated and severe COPD/asthma patients closely \u2014 positive pressure can convert a small PTX into tension.',
    recommendation: 'Tension is decompressed clinically before imaging; stable PTX is size-based.',
    citation: [12],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },

  // ===================== COPD / ASTHMA =====================
  {
    id: 'dysp-obstructive-entry',
    type: 'question',
    module: 2,
    title: 'COPD / Asthma - Severity Assessment',
    body: 'Grade severity by physiology (speech, work of breathing, mental status, air movement), not by a single number. Silent chest, exhaustion, or altered mental status = impending ventilatory failure.',
    options: [
      { label: 'Silent chest / exhaustion / AMS', description: 'Impending failure - NIV, escalate', next: 'dysp-obstructive-verdict', urgency: 'critical' },
      { label: 'Severe distress, moving air, alert', description: 'Maximize therapy, reassess response', next: 'dysp-obstructive-verdict', urgency: 'urgent' },
    ],
    citation: [13, 14],
    summary: 'Physiologic severity drives therapy; silent chest/AMS signals impending failure.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-obstructive-verdict',
    type: 'result',
    module: 2,
    title: 'COPD / Asthma - Treat',
    body: 'Open [Asthma Exacerbation](#/tree/asthma-exacerbation) or [COPD Exacerbation](#/tree/copd-exacerbation).\n\n**Next 5 minutes:** continuous albuterol for severe asthma, ipratropium, systemic steroid, magnesium for severe asthma; **NIV early** for COPD/hypercapnic failure when cooperative and protecting the airway.\n\n**Intubation warning:** severe obstruction is a physiologically difficult airway. Use a low rate, long expiratory time, permissive hypercapnia, and disconnect/allow exhalation if peri-arrest auto-PEEP occurs.',
    recommendation: 'Maximize bronchodilation and NIV early; avoid rushed intubation unless failing.',
    citation: [13, 14],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },

  // ===================== ACS AS DYSPNEA =====================
  {
    id: 'dysp-acs-entry',
    type: 'question',
    module: 2,
    title: 'ACS as Dyspnea - ECG First',
    body: 'Dyspnea can be an anginal equivalent, especially in older, diabetic, or female patients. **12-lead ECG within 10 minutes.** If paced or LBBB, apply **Sgarbossa** (toolbar) to detect occlusion.',
    options: [
      { label: 'STEMI / Sgarbossa-positive', description: 'Occlusion MI - activate cath lab', next: 'dysp-acs-verdict', urgency: 'critical' },
      { label: 'Ischemic changes / high suspicion, no STEMI', description: 'Serial troponin + NSTEMI pathway', next: 'dysp-acs-verdict', urgency: 'urgent' },
    ],
    citation: [15, 16],
    summary: 'ECG in 10 min; Sgarbossa for paced/LBBB; troponin for the rest.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-acs-verdict',
    type: 'result',
    module: 2,
    title: 'ACS - Treat',
    body: 'Open [STEMI](#/tree/stemi) or [NSTEMI](#/tree/nstemi).\n\n**Next 5 minutes:** ECG, monitor, troponin, POCUS for LV/RV/pericardium/lungs. Treat dysrhythmia instability immediately. Keep **PE and aortic dissection** in the differential when dyspnea and chest pain travel together.',
    recommendation: 'ECG + troponin (+ POCUS) guides the ACS-as-dyspnea patient.',
    citation: [15, 16],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },

  // ===================== ANAPHYLAXIS =====================
  {
    id: 'dysp-anaphylaxis-entry',
    type: 'question',
    module: 2,
    title: 'Anaphylaxis - Clinical Criteria',
    body: 'Anaphylaxis is a **clinical diagnosis** (NIAID/FAAN). It is likely with acute onset of any ONE of:\n1. Skin/mucosa + respiratory OR hypotension.\n2. Two or more systems (skin, respiratory, GI, cardiovascular) after a likely allergen.\n3. Hypotension after a known allergen for that patient.',
    options: [
      { label: 'Criteria met', description: 'IM epinephrine NOW', next: 'dysp-anaphylaxis-verdict', urgency: 'critical' },
      { label: 'Isolated bronchospasm, no allergen/multisystem', description: 'Reconsider - treat obstruction path', next: 'dysp-obstructive-entry', urgency: 'urgent' },
    ],
    citation: [17],
    summary: 'Meet NIAID/FAAN criteria -> IM epinephrine without delay.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-anaphylaxis-verdict',
    type: 'result',
    module: 2,
    title: 'Anaphylaxis - Treat',
    body: 'Open [Anaphylaxis Management](#/tree/anaphylaxis).\n\n**Next 5 minutes:** **IM epinephrine now** for airway/breathing/circulation involvement; repeat q5-15 min as needed. Oxygen, fluids, albuterol for bronchospasm, early epinephrine infusion for refractory shock.\n\n**Pitfall:** antihistamines and steroids are adjuncts. They do not rescue airway, bronchospasm, or shock.',
    recommendation: 'IM epinephrine first. Do not delay for adjuncts.',
    citation: [17],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },

  // ===================== TOXIC / METABOLIC =====================
  {
    id: 'dysp-tox-entry',
    type: 'question',
    module: 2,
    title: 'Toxic / Metabolic Dyspnea - Rule In',
    body: 'Suspect when saturation, cyanosis, and PaO2 do not agree, or with exposure history. **Standard pulse oximetry misleads in CO and methemoglobinemia** \u2014 use co-oximetry. Check ABG/VBG with lactate and an anion gap.',
    options: [
      { label: 'Fire/smoke/generator exposure, headache, confusion', description: 'Carbon monoxide', next: 'dysp-tox-verdict', urgency: 'critical' },
      { label: 'Cyanosis with normal PaO2, chocolate blood, dapsone/nitrate/topical anesthetic', description: 'Methemoglobinemia', next: 'dysp-tox-verdict', urgency: 'critical' },
      { label: 'Tachypnea compensating a metabolic acidosis (DKA, salicylate, toxic alcohol)', description: 'Wide-gap acidosis', next: 'dysp-tox-verdict', urgency: 'critical' },
    ],
    citation: [2],
    summary: 'Co-oximetry + ABG + gaps when saturation/cyanosis/PaO2 disagree or exposure is plausible.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-tox-verdict',
    type: 'result',
    module: 2,
    title: 'Toxic / Metabolic - Treat',
    body: 'Open [CO Toxicity](#/tree/co-toxicity) or [Methemoglobinemia](#/tree/methemoglobinemia).\n\n- **CO:** 100% oxygen immediately; consider hyperbaric per criteria (syncope, ischemia, neuro deficit, pregnancy, high COHb).\n- **Methemoglobinemia:** methylene blue for symptomatic levels; remove the offending agent.\n- **Metabolic acidosis:** treat the cause (DKA, salicylate, toxic alcohol); a tiring compensatory tachypnea is an intubation trap \u2014 match minute ventilation if you must intubate.\n\n**Pitfall:** a normal pulse ox does not exclude CO poisoning.',
    recommendation: 'Use co-oximetry; treat the specific toxin; beware intubating compensated acidosis.',
    citation: [2],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },

  // ---------------------------------------------------------------------
  // MODULE 3 - RESCUE / REASSESS
  // ---------------------------------------------------------------------
  {
    id: 'dysp-rescue',
    type: 'info',
    module: 3,
    title: 'Rescue / Initial Bundle + Reassess',
    body: '**Default bundle while the diagnosis clarifies:**\n- Upright positioning.\n- Oxygen target: 94-98% for most; 88-92% for hypercapnic risk.\n- Monitor, IV, ECG.\n- CXR when stable.\n- Lung/cardiac POCUS when the diagnosis is uncertain or the patient is sick.\n- VBG/ABG when ventilatory failure, severe COPD/asthma, tox, or altered mental status is possible.\n- Nebulizers if wheeze, NIV if COPD/CHF physiology and no contraindication, antibiotics if infection/sepsis, epinephrine if anaphylaxis.\n\n**Reassess every 5-15 minutes** in severe dyspnea: work of breathing, mental status, RR, ETCO2/VBG trend, oxygen requirement, and hemodynamics.',
    citation: [1, 2],
    next: 'dysp-reassess',
    summary: 'Position, oxygen target, ECG/CXR/POCUS, VBG when ventilation matters, treat the cause in parallel.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-reassess',
    type: 'question',
    module: 3,
    title: 'Reassess After Initial Bundle',
    body: 'The dyspnea patient can improve quickly or crash quickly. Reassess physiology, not just the diagnosis label.',
    options: [
      { label: 'Worse or tiring: AMS, rising CO2, exhaustion, shock', description: 'Airway/NIV/ICU path; re-run exclusions', next: 'dysp-triage', urgency: 'critical' },
      { label: 'Stable but diagnosis unclear', description: 'Use imaging strategy', next: 'dysp-imaging' },
      { label: 'Clearly improving with diagnosis and safe follow-up', description: 'Disposition checklist', next: 'dysp-disposition' },
    ],
    citation: [1, 2],
    summary: 'Tiring patients need escalation; stable unclear patients need diagnosis-directed imaging.',
  },

  // ---------------------------------------------------------------------
  // MODULE 4 - IMAGING
  // ---------------------------------------------------------------------
  {
    id: 'dysp-imaging',
    type: 'info',
    module: 4,
    title: 'Imaging Decision',
    body: '**Imaging by likely cause:**\n- **CXR:** pneumonia, pneumothorax, edema, effusion, device/tube checks.\n- **Lung POCUS:** B-lines, pneumothorax, pleural effusion, consolidation.\n- **Cardiac POCUS:** LV function, RV strain, pericardial effusion/tamponade.\n- **CTPA:** suspected PE when pretest probability and testing support it and the patient is stable enough.\n- **CT chest:** unclear severe disease, complications, malignancy, occult pneumonia, or alternate diagnoses.\n\nDo not send an unstable dyspnea patient away from resus without an airway, oxygen, pressor, and procedure plan.',
    citation: [1, 4],
    next: 'dysp-disposition',
    summary: 'CXR plus POCUS first for many; CT/CTPA only when stable enough and actionable.',
    safetyLevel: 'warning',
  },

  // ---------------------------------------------------------------------
  // MODULE 5 - DISPOSITION
  // ---------------------------------------------------------------------
  {
    id: 'dysp-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Disposition follows oxygen requirement, work of breathing, trajectory, and cause.',
    options: [
      { label: 'Persistent distress, NIV/intubation, shock, rising CO2, high O2 need', description: 'ICU / resus admission', next: 'dysp-dispo-icu', urgency: 'critical' },
      { label: 'Improving but ongoing O2 need or unclear diagnosis', description: 'Admit/observe', next: 'dysp-dispo-admit' },
      { label: 'Resolved or mild, stable room air, clear plan', description: 'Discharge checklist', next: 'dysp-dispo-discharge' },
    ],
    citation: [1, 11],
    summary: 'ICU for support/escalation, admit for oxygen or uncertainty, discharge only if stable on room air with a clear plan.',
  },
  {
    id: 'dysp-dispo-icu',
    type: 'result',
    module: 5,
    title: 'ICU / Resus Admission',
    body: 'ICU/resus for NIV or intubation, persistent severe work of breathing, shock, rising CO2/acidosis, massive PE, severe asthma/COPD with exhaustion, SCAPE not rapidly improving, anaphylaxis needing infusion, or unclear diagnosis with unstable physiology.',
    recommendation: 'Escalate early. Dyspnea deterioration is often abrupt.',
    citation: [1, 4, 11],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'dysp-dispo-admit',
    type: 'result',
    module: 5,
    title: 'Admit / Observation',
    body: 'Admit or observe for a new oxygen requirement, persistent tachypnea, recurrent symptoms after treatment, pneumonia with risk features, COPD/CHF needing repeated therapy, PE workup/treatment, social inability to manage therapy, or diagnostic uncertainty that remains actionable.',
    recommendation: 'Use the cause-specific consult for final destination and orders.',
    citation: [11, 13, 14],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'dysp-dispo-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge Checklist',
    body: 'Discharge only when: stable room-air oxygenation at rest and with ambulation as appropriate, work of breathing resolved or mild, clear diagnosis, durable treatment response, no high-risk alternate diagnosis, meds/equipment available, and return precautions given.\n\n**Return precautions:** worsening dyspnea, chest pain, syncope, fever/rigors, hemoptysis, new confusion, inability to speak full sentences, or oxygen saturation below the patient-specific threshold.',
    recommendation: 'Document ambulation/room-air status when relevant.',
    citation: [1, 2],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
];

export const DYSPNEA_HUB_NODE_COUNT = DYSPNEA_HUB_NODES.length;

export const DYSPNEA_HUB_MODULE_LABELS = [
  'Sick Check',
  'Rule In / Rule Out',
  'Rescue / Reassess',
  'Imaging',
  'Disposition',
];

export const DYSPNEA_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Qaseem A, Etxeandia-Ikobaltzeta I, Mustafa RA, et al. Appropriate Use of Point-of-Care Ultrasonography in Patients With Acute Dyspnea in Emergency Department or Inpatient Settings: A Clinical Guideline From the American College of Physicians. Ann Intern Med. 2021;174(7):985-993. doi:10.7326/M20-7844' },
  { num: 2, text: "O'Driscoll BR, Howard LS, Earis J, et al. British Thoracic Society Guideline for oxygen use in adults in healthcare and emergency settings. Thorax. 2017;72(Suppl 1):ii1-ii90. doi:10.1136/thoraxjnl-2016-209729" },
  { num: 3, text: 'Wells PS, Anderson DR, Rodger M, et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism. Thromb Haemost. 2000;83(3):416-420. PMID: 10744147' },
  { num: 4, text: 'Konstantinides SV, Meyer G, Becattini C, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism developed in collaboration with the ERS. Eur Heart J. 2020;41(4):543-603. doi:10.1093/eurheartj/ehz405' },
  { num: 5, text: 'Kline JA, Courtney DM, Kabrhel C, et al. Prospective multicenter evaluation of the pulmonary embolism rule-out criteria. J Thromb Haemost. 2008;6(5):772-780. doi:10.1111/j.1538-7836.2008.02944.x' },
  { num: 6, text: 'Le Gal G, Righini M, Roy PM, et al. Prediction of pulmonary embolism in the emergency department: the revised Geneva score. Ann Intern Med. 2006;144(3):165-171. PMID: 16461960' },
  { num: 7, text: 'Righini M, Van Es J, Den Exter PL, et al. Age-adjusted D-dimer cutoff levels to rule out pulmonary embolism: the ADJUST-PE study. JAMA. 2014;311(11):1117-1124. doi:10.1001/jama.2014.2135' },
  { num: 8, text: 'van der Hulle T, Cheung WY, Kooij S, et al. Simplified diagnostic management of suspected pulmonary embolism (the YEARS study): a prospective, multicentre, cohort study. Lancet. 2017;390(10091):289-297. doi:10.1016/S0140-6736(17)30885-1' },
  { num: 9, text: 'Aujesky D, Obrosky DS, Stone RA, et al. Derivation and validation of a prognostic model for pulmonary embolism (PESI). Am J Respir Crit Care Med. 2005;172(8):1041-1046. doi:10.1164/rccm.200506-862OC' },
  { num: 10, text: 'Al Deeb M, Barbic S, Featherstone R, et al. Point-of-care ultrasonography for the diagnosis of acute cardiogenic pulmonary edema in patients presenting with acute dyspnea: a systematic review and meta-analysis. Acad Emerg Med. 2014;21(8):843-852. doi:10.1111/acem.12435' },
  { num: 11, text: 'Metlay JP, Waterer GW, Long AC, et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the ATS and IDSA. Am J Respir Crit Care Med. 2019;200(7):e45-e67. doi:10.1164/rccm.201908-1581ST' },
  { num: 12, text: 'MacDuff A, Arnold A, Harvey J; BTS Pleural Disease Guideline Group. Management of spontaneous pneumothorax: British Thoracic Society Pleural Disease Guideline 2010. Thorax. 2010;65(Suppl 2):ii18-ii31. doi:10.1136/thx.2010.136986' },
  { num: 13, text: 'Global Initiative for Chronic Obstructive Lung Disease (GOLD). Global Strategy for the Prevention, Diagnosis and Management of COPD: 2026 Report. goldcopd.org' },
  { num: 14, text: 'Global Initiative for Asthma (GINA). Global Strategy for Asthma Management and Prevention: 2026 Update. ginasthma.org' },
  { num: 15, text: 'Byrne RA, Rossello X, Coughlan JJ, et al. 2023 ESC Guidelines for the management of acute coronary syndromes. Eur Heart J. 2023;44(38):3720-3826. doi:10.1093/eurheartj/ehad191' },
  { num: 16, text: 'Smith SW, Dodd KW, Henry TD, et al. Diagnosis of ST-elevation myocardial infarction in the presence of left bundle branch block with the modified Sgarbossa criteria. Ann Emerg Med. 2012;60(6):766-776. doi:10.1016/j.annemergmed.2012.07.119' },
  { num: 17, text: 'Sampson HA, Munoz-Furlong A, Campbell RL, et al. Second symposium on the definition and management of anaphylaxis: summary report - NIAID/FAAN symposium. J Allergy Clin Immunol. 2006;117(2):391-397. doi:10.1016/j.jaci.2005.12.1303' },
];
