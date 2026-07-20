// MedKitt - Acute Central Cyanosis / Hypoxaemia (Adult) Hub
// Front door for the blue / hypoxaemic adult. Organizing pivot: central vs
// peripheral cyanosis, and the saturation gap (co-oximetry) that unmasks
// CO and methemoglobin. Each differential walks to an explicit verdict.
// Scoring / reference tools live in the bottom toolbar.
export const ACUTE_CYANOSIS_HYPOXEMIA_HUB_CRITICAL_ACTIONS = [
    { text: 'A normal pulse oximeter does NOT exclude CO poisoning or methemoglobinemia - use co-oximetry', nodeId: 'cyanosis-start' },
    { text: 'Central cyanosis (tongue/mucosa) is the hypoxaemic emergency; peripheral cyanosis is usually perfusion', nodeId: 'cyanosis-central-check' },
    { text: 'A saturation gap (SpO2 vs measured SaO2) points to methemoglobin or CO', nodeId: 'cyanosis-tox-entry' },
    { text: 'Tension pneumothorax and massive PE are decompressed / resuscitated before leaving resus for CT', nodeId: 'cyanosis-vascular-entry' },
];
export const ACUTE_CYANOSIS_HYPOXEMIA_HUB_NODES = [
    // ---------------------------------------------------------------------
    // MODULE 1 - SICK CHECK
    // ---------------------------------------------------------------------
    {
        id: 'cyanosis-start',
        type: 'info',
        module: 1,
        title: 'Cyanosis / Hypoxaemia Hub - Sick Check First',
        body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Tension pneumothorax** \u2014 unilateral absent breath sounds + shock \u2192 decompress before imaging.\n2. **Massive / submassive PE** \u2014 hypoxia, RV strain, clear lungs, VTE risk \u2192 echo + CTPA when stable.\n3. **Carbon monoxide** \u2014 fire/smoke/generator, headache, confusion; **pulse ox reads falsely normal**.\n4. **Methemoglobinemia** \u2014 saturation gap, chocolate-brown blood, dapsone/nitrate/topical anaesthetic \u2192 methylene blue.\n5. **Severe pneumonia / ARDS / hypoxaemic respiratory failure** \u2014 diffuse infiltrates, refractory hypoxia.\n\n**First 60 seconds:**\n- Is the cyanosis **central** (tongue, lips, mucous membranes) or **peripheral** (fingers/toes only)? Central = hypoxaemia or abnormal haemoglobin; peripheral = perfusion/cold.\n- Work of breathing, mental status, ability to speak; monitor, IV, ECG.\n- **SpO2 is not enough:** get an ABG/VBG with co-oximetry (measured SaO2, COHb, MetHb). SpO2 vs SaO2 disagreement = saturation gap.\n- High-flow oxygen while you sort the cause; POCUS lung/heart/IVC early when unclear.\n- Oxygen target usually 94-98%; 88-92% if known CO2 retainer.\n\nThis hub does not stop at a differential. For each cause it walks the pathway to an explicit verdict.',
        citation: [1, 2],
        next: 'cyanosis-central-check',
        summary: 'Central vs peripheral cyanosis; co-oximetry not just pulse ox; oxygen + POCUS while sorting the cause.',
        safetyLevel: 'critical',
    },
    {
        id: 'cyanosis-central-check',
        type: 'question',
        module: 1,
        title: 'Central or Peripheral Cyanosis?',
        body: 'The pivot. **Central cyanosis** (blue tongue, lips, oral mucosa) reflects arterial desaturation or abnormal haemoglobin and is the emergency. **Peripheral cyanosis** (blue fingers/toes with pink mucosa) usually reflects low flow / cold / vasoconstriction, not hypoxaemia.',
        options: [
            { label: 'Central (tongue / mucosa blue)', description: 'True hypoxaemia or dyshaemoglobin - work the exclusions', next: 'cyanosis-triage', urgency: 'critical' },
            { label: 'Peripheral only (mucosa pink)', description: 'Perfusion / cold / vasospasm - assess shock & limb', next: 'cyanosis-peripheral', urgency: 'urgent' },
            { label: 'Uncertain / mixed', description: 'Treat as central until proven otherwise', next: 'cyanosis-triage', urgency: 'critical' },
        ],
        citation: [1, 3],
        summary: 'Central cyanosis = hypoxaemia/dyshaemoglobin emergency; peripheral = perfusion problem.',
        safetyLevel: 'critical',
    },
    {
        id: 'cyanosis-peripheral',
        type: 'result',
        module: 1,
        title: 'Peripheral Cyanosis - Assess Perfusion',
        body: 'Isolated peripheral cyanosis with pink mucosa and a normal SaO2 is a **perfusion** problem, not central hypoxaemia.\n\n**Consider:** shock / low cardiac output, cold exposure or Raynaud phenomenon, arterial occlusion (acutely painful, pulseless, cold limb), or venous congestion.\n\n**Do:** re-warm, check bilateral pulses and cap refill, screen for shock (BP, lactate, POCUS IVC/heart). If a limb is acutely ischaemic (pain, pallor, pulselessness), treat as an arterial emergency. If SaO2 is actually low on co-oximetry, return to the central pathway.',
        recommendation: 'Pink mucosa + normal SaO2 = perfusion problem; hunt shock or limb ischaemia, not lung disease.',
        citation: [1, 3],
        next: 'cyanosis-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // ---------------------------------------------------------------------
    // MODULE 2 - TIME-CRITICAL EXCLUSIONS (rule-in / rule-out engine)
    // ---------------------------------------------------------------------
    {
        id: 'cyanosis-triage',
        type: 'question',
        module: 2,
        title: 'Which Cause Are You Working Up?',
        body: 'Pick the mechanism you want to rule in or rule out. Each path runs to a clear verdict and routes to the deep-dive consult. Work through more than one if the picture is mixed. **Anchor on the co-oximetry / ABG:** a saturation gap redirects you to the toxic branch.',
        options: [
            { label: 'Toxic haemoglobin (CO / methemoglobin)', description: 'Saturation gap, exposure history, co-oximetry', next: 'cyanosis-tox-entry', urgency: 'critical' },
            { label: 'Vascular (PE / tension pneumothorax)', description: 'Hypoxia + clear lungs or unilateral silent chest', next: 'cyanosis-vascular-entry', urgency: 'critical' },
            { label: 'Parenchymal (pneumonia / ARDS)', description: 'Infiltrate + hypoxaemic respiratory failure', next: 'cyanosis-parenchymal-entry', urgency: 'urgent' },
            { label: 'Obstructive (COPD / asthma failure)', description: 'Hypercapnic + hypoxaemic decompensation', next: 'cyanosis-obstructive-entry', urgency: 'critical' },
        ],
        citation: [1, 2],
        summary: 'Choose a mechanism; the hub runs its pathway to a verdict. A saturation gap points to the toxic branch.',
        safetyLevel: 'critical',
    },
    // ===================== TOXIC HAEMOGLOBIN =====================
    {
        id: 'cyanosis-tox-entry',
        type: 'question',
        module: 2,
        title: 'Toxic Haemoglobin - Rule In (the Saturation Gap)',
        body: 'Suspect when **cyanosis, pulse-ox reading, and PaO2 do not agree**, or with exposure history. Standard 2-wavelength pulse oximetry is unreliable in CO and methemoglobinemia \u2014 use **co-oximetry** (measures COHb and MetHb directly). Check ABG/VBG with lactate.\n\n- **CO:** COHb elevated; SpO2 falsely normal or high; fire/smoke/generator exposure, headache, confusion, multiple sick contacts.\n- **Methemoglobinemia:** SpO2 tends to plateau ~85%; chocolate-brown blood that does not redden with oxygen; MetHb elevated; dapsone, benzocaine/topical anaesthetics, nitrates.',
        options: [
            { label: 'Fire / smoke / generator, headache, confusion, high COHb', description: 'Carbon monoxide', next: 'cyanosis-tox-verdict', urgency: 'critical' },
            { label: 'Saturation gap, chocolate blood, dapsone/benzocaine/nitrate', description: 'Methemoglobinemia', next: 'cyanosis-tox-verdict', urgency: 'critical' },
            { label: 'Co-oximetry normal, no exposure', description: 'Toxic Hb unlikely - reconsider mechanism', next: 'cyanosis-triage', urgency: 'routine' },
        ],
        citation: [2, 4, 5],
        summary: 'Co-oximetry unmasks CO/MetHb when SpO2, cyanosis, and PaO2 disagree. SpO2 alone misses both.',
        safetyLevel: 'critical',
    },
    {
        id: 'cyanosis-tox-verdict',
        type: 'result',
        module: 2,
        title: 'Toxic Haemoglobin - Treat',
        body: 'Open [CO Toxicity](#/tree/co-toxicity) or [Methemoglobinemia](#/tree/methemoglobinemia).\n\n- **CO:** high-flow 100% oxygen immediately (shortens COHb half-life); consider **hyperbaric oxygen** per criteria (syncope, ischaemia/ECG changes, focal neuro deficit, pregnancy with high COHb, persistent symptoms).\n- **Methemoglobinemia:** **methylene blue 1-2 mg/kg IV** for symptomatic/high levels (usually >20-30%, or symptomatic lower); remove the offending agent. Beware G6PD deficiency (methylene blue can trigger haemolysis and is less effective) \u2014 ascorbic acid / exchange transfusion are alternatives.\n\n**Pitfall:** a normal pulse ox does NOT exclude CO or methemoglobinemia. Trust co-oximetry.',
        recommendation: '100% O2 (\u00B1 HBO) for CO; methylene blue for symptomatic methemoglobinemia; remove the agent.',
        citation: [2, 4, 5],
        safetyLevel: 'critical',
        confidence: 'recommended',
    },
    // ===================== VASCULAR (PE / TENSION PTX) =====================
    {
        id: 'cyanosis-vascular-entry',
        type: 'question',
        module: 2,
        title: 'Vascular - Rule In (PE / Tension Pneumothorax)',
        body: 'Sudden hypoxaemia/cyanosis with **clear or unilateral lungs** points vascular.\n\n- **Massive/submassive PE:** hypoxia, tachycardia, RV strain on ECG/echo, clear lung fields, VTE risk factors. Use **Wells PE** or **Revised Geneva** (toolbar) to anchor pretest probability.\n- **Tension pneumothorax:** unilateral absent breath sounds, hyperresonance, distended neck veins, shock \u2014 this is a **clinical diagnosis**, decompress before imaging.',
        options: [
            { label: 'Unilateral silent chest + shock / peri-arrest', description: 'Tension pneumothorax - decompress NOW', next: 'cyanosis-vascular-verdict', urgency: 'critical' },
            { label: 'Hypoxia + clear lungs + RV strain / VTE risk', description: 'Massive/submassive PE pathway', next: 'cyanosis-vascular-verdict', urgency: 'critical' },
        ],
        citation: [6, 7, 8],
        summary: 'Clear lungs + hypoxia -> PE (score it); unilateral silent chest + shock -> tension PTX, decompress clinically.',
        safetyLevel: 'critical',
    },
    {
        id: 'cyanosis-vascular-verdict',
        type: 'result',
        module: 2,
        title: 'Vascular - Treat',
        body: 'Open [Pneumothorax](#/tree/pneumothorax) for the pleural emergency.\n\n- **Tension pneumothorax:** immediate needle/finger decompression, then tube \u2014 **do not wait for imaging.**\n- **Massive PE (SBP <90 / shock):** resuscitate in place, bedside echo for RV strain, activate PERT; systemic thrombolysis or catheter therapy. Do not send a crashing unresuscitated patient to CT. Submassive PE \u2192 monitored bed + PERT discussion. When stable enough, confirm with CTPA and risk-stratify (PESI, toolbar).\n\nRight-heart decompensation from PE can be anchored with [Right Heart Failure](#/tree/right-heart-failure).',
        recommendation: 'Tension PTX = clinical decompression before imaging; massive PE = resuscitate + lyse/intervene, echo first.',
        citation: [6, 7, 8],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    // ===================== PARENCHYMAL (PNEUMONIA / ARDS) =====================
    {
        id: 'cyanosis-parenchymal-entry',
        type: 'question',
        module: 2,
        title: 'Parenchymal - Rule In (Pneumonia / ARDS)',
        body: 'Hypoxaemic respiratory failure with **infiltrates**. Confirm with CXR (or POCUS consolidation / B-lines). Grade severity and screen for sepsis.\n\n- **Pneumonia:** fever, cough, focal findings + infiltrate. Score disposition with **CURB-65** or **PSI** (toolbar); screen sepsis with **qSOFA** + lactate.\n- **ARDS:** bilateral infiltrates, refractory hypoxia (PaO2/FiO2 low), not fully explained by cardiac failure.',
        options: [
            { label: 'Focal infiltrate, confirmed pneumonia', description: 'Score severity - site of care', next: 'cyanosis-parenchymal-verdict', urgency: 'urgent' },
            { label: 'Bilateral infiltrates + refractory hypoxia', description: 'ARDS physiology - lung-protective support', next: 'cyanosis-parenchymal-verdict', urgency: 'critical' },
            { label: 'Sepsis physiology present', description: 'qSOFA + lactate, treat as sepsis', next: 'cyanosis-parenchymal-verdict', urgency: 'critical' },
        ],
        citation: [9],
        summary: 'Confirm infiltrate; CURB-65/PSI for pneumonia, lung-protective support for ARDS, qSOFA if septic.',
        safetyLevel: 'warning',
    },
    {
        id: 'cyanosis-parenchymal-verdict',
        type: 'result',
        module: 2,
        title: 'Parenchymal - Treat',
        body: 'Open [Pneumonia](#/tree/pneumonia); open [Sepsis Management](#/tree/sepsis) if septic.\n\n- **Pneumonia disposition (ATS/IDSA):** CURB-65 0-1 / PSI I-II outpatient candidate; CURB-65 2 / PSI III observe; CURB-65 \u22653 / PSI IV-V admit, consider ICU by IDSA minor criteria.\n- **Oxygen / support:** titrate to target; escalate HFNC / NIV / intubation for refractory hypoxaemia; lung-protective ventilation for ARDS.\n- **Antibiotics:** timely guideline-concordant therapy by severity; blood cultures + lactate if septic (do not let cultures delay antibiotics).',
        recommendation: 'Severity score sets site of care; oxygen escalation + guideline antibiotics; lung-protective for ARDS.',
        citation: [9],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // ===================== OBSTRUCTIVE (COPD / ASTHMA) =====================
    {
        id: 'cyanosis-obstructive-entry',
        type: 'question',
        module: 2,
        title: 'Obstructive - Severity (COPD / Asthma Failure)',
        body: 'Cyanosis in obstructive disease signals **severe, often hypercapnic, failure**. Grade by physiology (speech, work of breathing, mental status, air movement), not one number. Silent chest, exhaustion, or altered mental status = impending ventilatory failure.',
        options: [
            { label: 'Silent chest / exhaustion / AMS', description: 'Impending failure - NIV, escalate', next: 'cyanosis-obstructive-verdict', urgency: 'critical' },
            { label: 'Severe distress, moving air, alert', description: 'Maximize therapy, reassess response', next: 'cyanosis-obstructive-verdict', urgency: 'urgent' },
        ],
        citation: [10, 11],
        summary: 'Physiologic severity drives therapy; silent chest/AMS + cyanosis = impending ventilatory failure.',
        safetyLevel: 'critical',
    },
    {
        id: 'cyanosis-obstructive-verdict',
        type: 'result',
        module: 2,
        title: 'Obstructive - Treat',
        body: 'Open [Asthma Exacerbation](#/tree/asthma-exacerbation) or [COPD Exacerbation](#/tree/copd-exacerbation).\n\n**Next 5 minutes:** continuous albuterol for severe asthma, ipratropium, systemic steroid, magnesium for severe asthma; **NIV early** for COPD/hypercapnic failure when the patient is cooperative and protecting the airway. Titrate oxygen to 88-92% in the COPD retainer.\n\n**Intubation warning:** severe obstruction is a physiologically difficult airway \u2014 low rate, long expiratory time, permissive hypercapnia; disconnect/allow exhalation if peri-arrest auto-PEEP occurs.',
        recommendation: 'Maximize bronchodilation + steroid; NIV early; controlled oxygen in retainers; avoid rushed intubation.',
        citation: [10, 11],
        safetyLevel: 'critical',
        confidence: 'recommended',
    },
    // ---------------------------------------------------------------------
    // MODULE 3 - RESCUE / REASSESS
    // ---------------------------------------------------------------------
    {
        id: 'cyanosis-rescue',
        type: 'info',
        module: 3,
        title: 'Rescue / Initial Bundle + Reassess',
        body: '**Default bundle while the cause clarifies:**\n- High-flow oxygen (target 94-98%, or 88-92% in known CO2 retainers). In suspected CO, give **100% oxygen regardless of SpO2**.\n- Monitor, IV, ECG.\n- **ABG/VBG with co-oximetry** early \u2014 the single test that unmasks CO and methemoglobin and quantifies ventilation.\n- CXR when stable; lung/cardiac POCUS when the diagnosis is uncertain or the patient is sick (B-lines, pneumothorax, RV strain, effusion).\n- Treat the cause in parallel: decompress tension PTX, methylene blue for symptomatic MetHb, NIV for COPD/CHF physiology, antibiotics for sepsis.\n\n**Reassess every 5-15 minutes:** work of breathing, mental status, RR, SpO2/co-oximetry trend, VBG, and haemodynamics.',
        citation: [1, 2],
        next: 'cyanosis-reassess',
        summary: 'Oxygen + co-oximetry ABG + POCUS; treat the cause in parallel; reassess physiology frequently.',
        safetyLevel: 'critical',
    },
    {
        id: 'cyanosis-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess After Initial Bundle',
        body: 'The hypoxaemic patient can improve or crash quickly. Reassess physiology, not just the diagnosis label.',
        options: [
            { label: 'Worse or tiring: AMS, rising CO2, exhaustion, shock', description: 'Airway/NIV/ICU path; re-run exclusions', next: 'cyanosis-triage', urgency: 'critical' },
            { label: 'Stable but cause unclear', description: 'Use imaging strategy', next: 'cyanosis-imaging' },
            { label: 'Clearly improving with cause and safe follow-up', description: 'Disposition checklist', next: 'cyanosis-disposition' },
        ],
        citation: [1, 2],
        summary: 'Tiring patients need escalation; stable unclear patients need cause-directed imaging.',
    },
    // ---------------------------------------------------------------------
    // MODULE 4 - IMAGING
    // ---------------------------------------------------------------------
    {
        id: 'cyanosis-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging Decision',
        body: '**Imaging by likely cause:**\n- **CXR:** pneumonia, pneumothorax, oedema, effusion, device/tube checks.\n- **Lung POCUS:** B-lines (oedema), absent sliding + lung point (pneumothorax), consolidation, effusion.\n- **Cardiac POCUS:** RV strain (PE), LV function, pericardial effusion/tamponade.\n- **CTPA:** suspected PE when pretest probability and testing support it and the patient is stable enough.\n- **CT chest:** unclear severe disease, ARDS aetiology, complications, or alternate diagnoses.\n\nToxic causes (CO, methemoglobin) are **laboratory diagnoses (co-oximetry), not imaging** \u2014 do not chase a CT when the ABG already explains the hypoxia. Do not send an unstable patient out of resus without an airway, oxygen, pressor, and procedure plan.',
        citation: [1, 6],
        next: 'cyanosis-disposition',
        summary: 'CXR + POCUS first; CTPA when stable and actionable; toxic Hb is a lab diagnosis, not imaging.',
        safetyLevel: 'warning',
    },
    // ---------------------------------------------------------------------
    // MODULE 5 - DISPOSITION
    // ---------------------------------------------------------------------
    {
        id: 'cyanosis-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Disposition follows oxygen requirement, work of breathing, trajectory, and cause.',
        options: [
            { label: 'Persistent hypoxia, NIV/intubation, shock, HBO transfer, high MetHb/COHb', description: 'ICU / resus / transfer', next: 'cyanosis-dispo-icu', urgency: 'critical' },
            { label: 'Improving but ongoing O2 need or unclear cause', description: 'Admit / observe', next: 'cyanosis-dispo-admit' },
            { label: 'Resolved, stable room air, clear plan', description: 'Discharge checklist', next: 'cyanosis-dispo-discharge' },
        ],
        citation: [1, 9],
        summary: 'ICU/transfer for support or HBO, admit for oxygen or uncertainty, discharge only if stable on room air.',
    },
    {
        id: 'cyanosis-dispo-icu',
        type: 'result',
        module: 5,
        title: 'ICU / Resus / Transfer',
        body: 'ICU/resus for NIV or intubation, persistent severe hypoxaemia, shock, rising CO2/acidosis, massive PE, severe asthma/COPD with exhaustion, or ARDS. **Arrange hyperbaric transfer** for CO poisoning meeting HBO criteria (syncope, neuro deficit, ischaemia, pregnancy with high COHb). Severe/refractory methemoglobinemia may need repeat methylene blue, exchange transfusion, or ICU monitoring.',
        recommendation: 'Escalate early. Hypoxaemic deterioration is abrupt; arrange HBO transfer for qualifying CO.',
        citation: [1, 4, 6],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'cyanosis-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit / Observation',
        body: 'Admit or observe for a new oxygen requirement, persistent hypoxaemia, symptomatic CO not meeting HBO criteria (serial neuro checks), resolving methemoglobinemia after methylene blue, pneumonia with risk features, COPD/CHF needing repeated therapy, or PE workup/treatment. Use the cause-specific consult for the final destination and orders.',
        recommendation: 'Use the cause-specific consult for final destination and orders.',
        citation: [9, 10, 11],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'cyanosis-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge Checklist',
        body: 'Discharge only when: stable room-air oxygenation at rest and with ambulation, cyanosis resolved, co-oximetry normalised (COHb/MetHb), clear diagnosis, durable treatment response, no high-risk alternate diagnosis, and return precautions given.\n\n**Return precautions:** worsening breathlessness, recurrent cyanosis, chest pain, syncope, confusion, headache (recurrent CO exposure at home \u2014 check the source and other household members), or oxygen saturation below the patient-specific threshold.',
        recommendation: 'Confirm co-oximetry normalised and the CO source is addressed before discharge.',
        citation: [1, 2],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
];
export const ACUTE_CYANOSIS_HYPOXEMIA_HUB_NODE_COUNT = ACUTE_CYANOSIS_HYPOXEMIA_HUB_NODES.length;
export const ACUTE_CYANOSIS_HYPOXEMIA_HUB_MODULE_LABELS = [
    'Sick Check',
    'Rule In / Rule Out',
    'Rescue / Reassess',
    'Imaging',
    'Disposition',
];
export const ACUTE_CYANOSIS_HYPOXEMIA_HUB_CITATIONS = [
    { num: 1, text: 'Qaseem A, Etxeandia-Ikobaltzeta I, Mustafa RA, et al. Appropriate Use of Point-of-Care Ultrasonography in Patients With Acute Dyspnea in Emergency Department or Inpatient Settings: A Clinical Guideline From the American College of Physicians. Ann Intern Med. 2021;174(7):985-993. doi:10.7326/M20-7844' },
    { num: 2, text: "O'Driscoll BR, Howard LS, Earis J, et al. British Thoracic Society Guideline for oxygen use in adults in healthcare and emergency settings. Thorax. 2017;72(Suppl 1):ii1-ii90. doi:10.1136/thoraxjnl-2016-209729" },
    { num: 3, text: 'McMullen SM, Patrick W. Cyanosis. Am J Med. 2013;126(3):210-212. doi:10.1016/j.amjmed.2012.11.004' },
    { num: 4, text: 'Rose JJ, Wang L, Xu Q, et al. Carbon Monoxide Poisoning: Pathogenesis, Management, and Future Directions of Therapy. Am J Respir Crit Care Med. 2017;195(5):596-606. doi:10.1164/rccm.201606-1275CI' },
    { num: 5, text: 'Cortazzo JA, Lichtman AD. Methemoglobinemia: a review and recommendations for management. J Cardiothorac Vasc Anesth. 2014;28(4):1043-1047. doi:10.1053/j.jvca.2013.02.005' },
    { num: 6, text: 'Konstantinides SV, Meyer G, Becattini C, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism developed in collaboration with the ERS. Eur Heart J. 2020;41(4):543-603. doi:10.1093/eurheartj/ehz405' },
    { num: 7, text: 'Wells PS, Anderson DR, Rodger M, et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism. Thromb Haemost. 2000;83(3):416-420. PMID: 10744147' },
    { num: 8, text: 'MacDuff A, Arnold A, Harvey J; BTS Pleural Disease Guideline Group. Management of spontaneous pneumothorax: British Thoracic Society Pleural Disease Guideline 2010. Thorax. 2010;65(Suppl 2):ii18-ii31. doi:10.1136/thx.2010.136986' },
    { num: 9, text: 'Metlay JP, Waterer GW, Long AC, et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the ATS and IDSA. Am J Respir Crit Care Med. 2019;200(7):e45-e67. doi:10.1164/rccm.201908-1581ST' },
    { num: 10, text: 'Global Initiative for Chronic Obstructive Lung Disease (GOLD). Global Strategy for the Prevention, Diagnosis and Management of COPD: 2026 Report. goldcopd.org' },
    { num: 11, text: 'Global Initiative for Asthma (GINA). Global Strategy for Asthma Management and Prevention: 2026 Update. ginasthma.org' },
];
