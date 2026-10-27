// MedKitt - ARDS and Lung-Protective Ventilation
// Not wired, not deployed.
// ED recognition and first-day management: Berlin/global definition, lung-protective
// ventilation, permissive hypercapnia, prone positioning, neuromuscular blockade,
// conservative fluids, and ECMO referral gates.
// Source conflicts (starting VT, blockade, higher-PEEP table) are shown in the node text, not resolved here.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';

export interface Citation {
  num: number;
  text: string;
}

export const ARDS_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Confirm Berlin criteria with an ABG on PEEP or CPAP of at least 5 cmH2O. Screen cardiac and volume causes before labeling ARDS.', nodeId: 'ards-berlin-check' },
  { text: 'Ventilate on predicted body weight, never actual body weight. Default start is 6 mL/kg PBW (ARDSNet 2000 trial arm). The 2008 ARDSNet protocol summary starts at 8 and steps down to 6. Keep plateau pressure at or below 30 cmH2O.', nodeId: 'ards-vent-set' },
  { text: 'When plateau pressure exceeds 30 cmH2O, reduce tidal volume in 1 mL/kg PBW steps, not below 4 mL/kg PBW.', nodeId: 'ards-reduce-vt' },
  { text: 'Start prone ventilation for severe ARDS (P/F <150, FiO2 ≥0.6, PEEP ≥5), invasive ventilation. Session length: ESICM 16 consecutive hours or more per day; ATS more than 12 h/day in severe ARDS.', nodeId: 'ards-prone-result' },
  { text: 'Do not start continuous neuromuscular blockade as routine for non-COVID ARDS (ESICM 2023, strong recommendation against). ATS 2024 conditionally suggests it in early severe ARDS. Treat the dyssynchrony cause first.', nodeId: 'ards-nmb' },
];

export const ARDS_NODES: DecisionNode[] = [
  // ---------------------------------------------------------------
  // Module 1: Recognize
  // ---------------------------------------------------------------
  {
    id: 'ards-start',
    type: 'question',
    module: 1,
    title: 'ARDS - Recognize First',
    body: `[ARDS Steps Summary](#/info/ards-steps) | [Oxygen Delivery](#/tree/oxygen-delivery) | [High-Flow Nasal Cannula](#/tree/hfnc)

**Hypoxemic respiratory failure with bilateral opacities. Treat as ARDS until the label is tested.**

**Berlin criteria (all required):** [1]
- Onset within 1 week of a known insult, or new or worsening respiratory symptoms
- Bilateral opacities not fully explained by effusions, collapse, or nodules
- Not fully explained by cardiac failure or fluid overload
- PaO2/FiO2 ≤300 with PEEP or CPAP ≥5 cmH2O

**Immediate:** get an ABG on the current PEEP. Start lung-protective settings now. The label can follow the ABG.`,
    citation: [1, 2],
    options: [
      { label: 'Hypoxemic with bilateral opacities', description: 'Test the Berlin criteria with an ABG on PEEP', next: 'ards-berlin-check', urgency: 'urgent' },
      { label: 'Cardiac failure or volume overload likely', description: 'Treat the cause and test the ARDS label', next: 'ards-mimics', urgency: 'routine' },
      { label: 'No ABG yet', description: 'Get one on the current PEEP before labeling', next: 'ards-berlin-check', urgency: 'urgent' },
    ],
    calculatorLinks: [
      { id: 'ards-pf-berlin', label: 'P/F Berlin' },
    ],
    summary: 'Hypoxemia with bilateral opacities is ARDS only after the Berlin criteria and mimics are tested.',
    safetyLevel: 'critical',
  },
  {
    id: 'ards-mimics',
    type: 'info',
    module: 1,
    title: 'Mimics to Exclude First',
    body: `**Do not label ARDS when one cause explains the picture.** [1]

**Look for:**
- Cardiogenic pulmonary edema: low EF, new arrhythmia, high filling pressures
- Volume overload: positive balance, renal failure, large IV volume
- Effusion, lobar collapse, or nodules as the source of the opacities

**Treat the cause.** A cardiac or fluid cause means the Berlin exclusion applies. Reassess the ARDS label after treatment instead of assuming it.`,
    citation: [1],
    next: 'ards-not-met',
    summary: 'Cardiac or volume causes are excluded by the Berlin definition.',
  },
  {
    id: 'ards-berlin-check',
    type: 'question',
    module: 1,
    title: 'Berlin Check: P/F on PEEP of 5 or More',
    body: `[P/F Berlin calculator](#/calculator/ards-pf-berlin)

**Ratio = PaO2 / FiO2 (fraction).** Use an ABG on the set PEEP or CPAP.

**Berlin severity cutoffs:** [1]
- Mild: PaO2/FiO2 ≤300 and >200
- Moderate: ≤200 and >100
- Severe: ≤100
- Moderate and severe need invasive ventilation with PEEP of 5 or more. CPAP or NIV qualifies only for mild. [1]

**Non-intubated (2023 global definition, published 2024):** PaO2/FiO2 ≤300, or SpO2/FiO2 ≤315 when SpO2 is ≤97%, on high-flow at ≥30 L/min, or on NIV or CPAP with at least 5 cmH2O. [2]

**If PEEP is below 5 or the ratio is above 300:** Berlin ARDS is not met at this moment.`,
    citation: [1, 2],
    options: [
      { label: 'P/F ≤300 with PEEP or CPAP ≥5', description: 'Berlin criteria met. Grade severity.', next: 'ards-severity', urgency: 'urgent' },
      { label: 'Non-invasive: HFNO ≥30 L/min or NIV or CPAP ≥5', description: 'Global 2023 pathway. Oxygenation criterion as stated above.', next: 'ards-global-2023', urgency: 'urgent' },
      { label: 'P/F >300 or PEEP <5', description: 'Berlin not met at this moment', next: 'ards-not-met', urgency: 'routine' },
    ],
    calculatorLinks: [
      { id: 'ards-pf-berlin', label: 'P/F Berlin' },
    ],
    summary: 'The Berlin ratio is only valid on PEEP or CPAP of at least 5 cmH2O.',
  },
  {
    id: 'ards-global-2023',
    type: 'info',
    module: 1,
    title: '2023 Global Definition (Non-Intubated)',
    body: `**The 2023 global definition adds nonintubated ARDS.** [2]
- Oxygenation: PaO2/FiO2 ≤300, or SpO2/FiO2 ≤315 when SpO2 ≤97%
- Support: on high-flow at ≥30 L/min, or on NIV or CPAP with PEEP at least 5 cmH2O
- Intubated severity keeps Berlin-style PaO2/FiO2 cutoffs: mild 200 to 300, moderate 100 to 200, severe ≤100
- Non-intubated patients: the global definition [2] sets the diagnosis. This app assigns no severity grade beyond mild on CPAP or NIV.

**Practical point:** a non-intubated patient on high-flow still needs the mimic check and a stated reason for ARDS. Hypoxemia alone is not the label. SpO2/FiO2 severity cutoffs for intubated patients are not set here.`,
    citation: [2],
    next: 'ards-severity',
    summary: 'Non-intubated patients meet ARDS criteria on SpO2/FiO2 or PaO2/FiO2 with high-flow or NIV/CPAP; the mimic check still applies.',
  },
  {
    id: 'ards-not-met',
    type: 'result',
    module: 1,
    title: 'ARDS Criteria Not Met',
    body: `**Berlin criteria are not met at this moment.** [1]

**Reassess when one changes:** PEEP set to 5 or more, a repeat ABG, a mimic treated, or new bilateral opacities.

**Keep treating the cause:** cardiac failure, volume overload, pneumonia, aspiration, and atelectasis each need their own path.

**Do not reassure on one ratio.** Repeat the ABG on set PEEP while the picture is still evolving.`,
    recommendation: 'Do not label ARDS yet. Treat the cause, repeat the ABG on set PEEP, and reassess.',
    citation: [1],
    confidence: 'recommended',
    summary: 'Criteria not met means reassess, not discharge.',
  },

  // ---------------------------------------------------------------
  // Module 2: Stabilize
  // ---------------------------------------------------------------
  {
    id: 'ards-severity',
    type: 'info',
    module: 2,
    title: 'Grade Severity and Expected Risk',
    body: `[P/F Berlin calculator](#/calculator/ards-pf-berlin)

**Berlin observed in-cohort mortality:** [1]
- Mild (P/F 200 to 300): 27% (95% CI 24 to 30)
- Moderate (P/F 100 to 200): 32% (95% CI 29 to 34)
- Severe (P/F ≤100): 45% (95% CI 42 to 48)

**These are observational cohort numbers.** They grade risk. They do not set the ventilator plan. Severity drives the prone and ECMO thresholds below.`,
    citation: [1],
    next: 'ards-vent-set',
    summary: 'Severity grades risk; the protective ventilator plan is the same at every tier.',
  },
  {
    id: 'ards-vent-set',
    type: 'info',
    module: 2,
    title: 'Lung-Protective Ventilation Start',
    body: `[PBW and Tidal Volume calculator](#/calculator/ards-pbw-tidal-volume)

**Predicted body weight (PBW), never actual body weight.** [3,4]
- Male: 50 + 2.3 x (height in inches - 60) kg
- Female: 45.5 + 2.3 x (height in inches - 60) kg
- Inches = cm / 2.54

**Starting tidal volume: 6 mL/kg PBW (default).** This is the ARDSNet 2000 trial arm. [3]
- **2008 ARDSNet protocol summary: start 8 mL/kg PBW**, then reduce by 1 mL/kg PBW at intervals of 2 h or less until 6 mL/kg PBW. [4]
- ESICM 2023: 4 to 8 mL/kg PBW. [7]
- ATS 2024: 4 to 8 mL/kg PBW. [8]
- **Floor: 4 mL/kg PBW.** [4]

**Rate:** start near baseline minute ventilation, not above **35/min**. [4]

**Targets:**
- Plateau pressure **≤30 cmH2O** (0.5 s pause, at least every 4 h and after each PEEP or VT change). [4]
- pH **7.30 to 7.45** as the goal. Permissive floor is in the acidosis node. [4]

In the ARDSNet trial, 6 mL/kg PBW reduced mortality against 12 mL/kg PBW (31.0% vs 39.8%). [3]`,
    citation: [3, 4, 7, 8],
    next: 'ards-vt-check',
    summary: 'Size VT on predicted body weight. Start 6 mL/kg PBW; the 2008 protocol summary starts at 8. Plateau at or below 30 cmH2O.',
    safetyLevel: 'critical',
  },
  {
    id: 'ards-vt-check',
    type: 'question',
    module: 2,
    title: 'Plateau and Tidal Volume Check',
    body: `**Pause for 0.5 s. Read plateau pressure and PEEP.** [4]

**Driving pressure = plateau minus PEEP** (approximates VT / compliance when passive). Driving pressure is the ventilator variable most associated with survival across pooled ARDS trials. [5] This app does not set a bedside cutoff for it.

**Decision:**
- Plateau ≤30 at 6 mL/kg PBW: continue.
- Plateau above 30: lower tidal volume.
- Plateau below 25 at VT under 6 mL/kg PBW: the ARDSNet protocol increases VT by 1 mL/kg PBW until plateau is above 25 or VT is 6 mL/kg PBW. Clinician judgment. [4]

**pH below 7.30:** use the acidosis node before changing VT.`,
    citation: [4, 5],
    options: [
      { label: 'Plateau ≤30 cmH2O', description: 'Continue. Go to oxygenation.', next: 'ards-oxygenation', urgency: 'routine' },
      { label: 'Plateau above 30 cmH2O', description: 'Reduce tidal volume', next: 'ards-reduce-vt', urgency: 'critical' },
      { label: 'pH below 7.30', description: 'Permissive hypercapnia rules', next: 'ards-acidosis', urgency: 'urgent' },
    ],
    summary: 'Plateau pressure above 30 cmH2O means reduce VT, one step at a time.',
    safetyLevel: 'critical',
  },
  {
    id: 'ards-reduce-vt',
    type: 'info',
    module: 2,
    title: 'Plateau Above 30: Reduce VT',
    body: `**Reduce tidal volume by 1 mL/kg PBW per step.** [4]
- Do not go below **4 mL/kg PBW**. [4]
- Recheck plateau after each change and at least every 4 h. [4]

**Still above 30 at 4 mL/kg PBW:** stop cutting VT. Look for a bedside cause (chest wall or abdominal loading, auto-PEEP, patient effort). Escalate to the ICU team and move to the rescue pathway if oxygenation is failing.`,
    citation: [4],
    next: 'ards-vt-check',
    summary: 'Cut VT in 1 mL/kg steps to the 4 mL/kg floor, then look for another cause.',
  },
  {
    id: 'ards-acidosis',
    type: 'info',
    module: 2,
    title: 'Permissive Hypercapnia and Acidosis',
    body: `**Permissive hypercapnia is the protocol strategy.** Do not chase a normal PaCO2 with high tidal volume. [4]

**pH 7.15 to 7.30:** raise respiratory rate until pH is above 7.30 or PaCO2 falls below 25 mmHg. Maximum rate **35/min**. [4]

**pH below 7.15:** set rate to **35/min**, then raise VT by 1 mL/kg PBW steps until pH is above 7.15. Plateau may exceed 30 during this step. Sodium bicarbonate may be given per protocol. [4]

**Clinical caution (not from the protocol):** raised intracranial pressure, RV failure, and severe bleeding need a separate decision before accepting high PaCO2. Ask the ICU team.`,
    citation: [4],
    next: 'ards-vt-check',
    summary: 'Raise rate first; raise VT only below pH 7.15, and accept plateau above 30 only in that step.',
    safetyLevel: 'critical',
  },
  {
    id: 'ards-oxygenation',
    type: 'info',
    module: 2,
    title: 'Oxygenation Targets and PEEP/FiO2',
    body: `**Targets:** PaO2 55 to 80 mmHg or SpO2 88 to 95%. [4]

**Minimum PEEP: 5 cmH2O.** [4]

**Lower-PEEP / higher-FiO2 pairs (protocol table):** [4]
- FiO2 0.3: PEEP 5
- FiO2 0.4: PEEP 5 to 8
- FiO2 0.5: PEEP 8 to 10
- FiO2 0.6: PEEP 10
- FiO2 0.7: PEEP 10 to 14
- FiO2 0.8: PEEP 14
- FiO2 0.9: PEEP 14 to 18
- FiO2 1.0: PEEP 18 to 24

The protocol lists these as incremental options, not a requirement. The higher-PEEP / lower-FiO2 table is not transcribed here.

**Caution:** a higher PEEP is not automatically better. Trials of higher vs lower PEEP did not show a clear mortality difference. [14] Recheck plateau after every PEEP change.`,
    citation: [4, 14],
    next: 'ards-fluids',
    summary: 'Pair PEEP and FiO2 from the table; recheck plateau after each change.',
  },
  {
    id: 'ards-fluids',
    type: 'info',
    module: 2,
    title: 'Fluids: Conservative Once Perfusing',
    body: `**Once shock has resolved, use a conservative fluid strategy.** [12]
- FACTT 60-day mortality: 25.5% conservative vs 28.4% liberal (not significant)
- More ventilator-free days (14.6 vs 12.1) and ICU-free days with the conservative strategy
- 7-day cumulative balance about -136 mL vs +6,992 mL [12]

**Do not withhold fluid in shock.** The trial enrolled patients after shock was corrected. Confirm perfusion before diuresing.`,
    citation: [12],
    next: 'ards-prone',
    summary: 'Conservative fluids help lung and ICU days after shock is corrected; not in shock.',
  },

  // ---------------------------------------------------------------
  // Module 3: Ventilate (targeted treatment)
  // ---------------------------------------------------------------
  {
    id: 'ards-prone',
    type: 'question',
    module: 3,
    title: 'Prone Positioning Criteria',
    body: `**Prone when severe enough.** Trial entry: PaO2/FiO2 below 150 on FiO2 ≥0.6 and PEEP ≥5, after screening. [6]

**Prone is a session schedule, not a single event.** Societies differ on hours per day (see the next node). [7,8]

**Before turning, confirm per the unit protocol:**
- Tube, central and arterial lines, and drains are secured, and the transfer team is ready
- Hemodynamics are stable enough for a turn on the current vasopressor plan
- No unstable spine or pelvic fracture, and no recent sternotomy or open abdomen
- No active bleeding, and no raised intracranial pressure concern
- Facial or airway edema assessed

This screening list is expert practice, not taken from a cited trial. Confirm it against the unit protocol before use.`,
    citation: [6, 7, 8],
    options: [
      { label: 'Severe ARDS (P/F <150, FiO2 ≥0.6, PEEP ≥5), invasive ventilation', description: 'Meets prone entry criteria', next: 'ards-prone-result', urgency: 'critical' },
      { label: 'Not severe enough, or screening fails', description: 'Continue protective ventilation', next: 'ards-nmb-check', urgency: 'routine' },
    ],
    summary: 'Prone for severe ARDS meeting the PROSEVA entry ratio on high FiO2 and PEEP.',
  },
  {
    id: 'ards-prone-result',
    type: 'result',
    module: 3,
    title: 'Prone Positioning: Start and Schedule',
    body: `**Start prone for severe ARDS (P/F <150, FiO2 ≥0.6, PEEP ≥5), invasive ventilation.** [6,7,8]

**Session length (sources differ by population):**
- ESICM 2023: prone for prolonged sessions of **16 consecutive hours or more** in moderate to severe ARDS. [7]
- ATS 2024: prone for **more than 12 h/day** in severe ARDS (strong recommendation, moderate certainty). [8]

**Trial data:** PROSEVA randomized severe ARDS to prone sessions of at least 16 h vs supine. 28-day mortality 16.0% vs 32.8% (P<0.001). [6]

**Write the schedule to the local ICU protocol** so the session length is explicit on the board.`,
    recommendation: 'Start prone ventilation for severe ARDS (P/F <150, FiO2 ≥0.6, PEEP ≥5), invasive ventilation. Schedule sessions per the local protocol: ESICM favors 16 consecutive hours or more; ATS favors more than 12 h/day in severe ARDS.',
    citation: [6, 7, 8],
    confidence: 'recommended',
    next: 'ards-nmb-check',
    summary: 'Prone reduces mortality in severe ARDS; session length differs between societies.',
  },
  {
    id: 'ards-nmb-check',
    type: 'question',
    module: 3,
    title: 'Dyssynchrony Despite Sedation?',
    body: `**Routine continuous neuromuscular blockade is not recommended for non-COVID ARDS.** [7]

**Ask first:** is there ventilator dyssynchrony that sedation and analgesia have not fixed?

**Evidence:**
- ACURASYS (cisatracurium 48 h, early moderate to severe ARDS): 90-day mortality 31.6% vs 40.7% crude (P=0.08); adjusted HR 0.68 (95% CI 0.48 to 0.98). [9]
- ROSE (cisatracurium 48 h, moderate to severe ARDS, 1006 patients): 90-day mortality 42.5% vs 42.8% (P=0.93), with more adverse cardiovascular events in the blockade arm. [10]

**Guidelines differ.** The ESICM 2023 guideline (Recommendation 8, strong recommendation against) advises against routine continuous blockade in moderate to severe non-COVID ARDS. That is the position this app follows. [7] ATS 2024 conditionally suggests blockade in early severe ARDS (low certainty). [8]

**The trials disagree on mortality.** Show both positions when deciding. [9,10]`,
    citation: [7, 8, 9, 10],
    options: [
      { label: 'Persistent dyssynchrony despite sedation', description: 'Treat the cause first. Blockade decision is open (see the blockade node).', next: 'ards-nmb', urgency: 'urgent' },
      { label: 'No dyssynchrony', description: 'Skip blockade', next: 'ards-rescue-check', urgency: 'routine' },
    ],
    summary: 'ESICM 2023 recommends against routine continuous blockade in non-COVID ARDS; the trials disagree on mortality.',
  },
  {
    id: 'ards-nmb',
    type: 'result',
    module: 3,
    title: 'Neuromuscular Blockade: Not Routine',
    body: `**Do not start continuous neuromuscular blockade as routine for non-COVID ARDS.** [7]

**If dyssynchrony persists despite sedation and analgesia:**
- Treat the cause first: sedation and analgesia depth, ventilator settings, and patient effort.
- Any blockade decision, its dose, and its reassessment plan are not set here. Follow the local protocol. Drug entry: [Cisatracurium](#/drug/cisatracurium/ARDS neuromuscular blockade) (trial regimens are not labeled dosing).
- If blockade is used, document the reason and a reassessment time. A paralyzed patient cannot show neurologic change.

**Guideline context:** ESICM 2023 recommends against routine use. ATS 2024 conditionally suggests blockade in early severe ARDS (low certainty). [7,8]

**Trial context:** ACURASYS and ROSE both tested continuous cisatracurium for 48 h. The trials disagree on mortality, so the trial results do not support as-needed dosing. [9,10]`,
    recommendation: 'Do not start continuous neuromuscular blockade as routine for non-COVID ARDS (ESICM 2023, strong recommendation against). ATS 2024 conditionally suggests it in early severe ARDS. For persistent dyssynchrony, treat the cause first. Any blockade decision follows the local protocol.',
    citation: [7, 8, 9, 10],
    confidence: 'recommended',
    next: 'ards-rescue-check',
    summary: 'Routine continuous blockade is not recommended for non-COVID ARDS; treat the dyssynchrony cause first.',
    safetyLevel: 'critical',
  },

  // ---------------------------------------------------------------
  // Module 4: Rescue
  // ---------------------------------------------------------------
  {
    id: 'ards-rescue-check',
    type: 'question',
    module: 4,
    title: 'Refractory Hypoxemia: ECMO Gate',
    body: `[ECMO](#/tree/ecmo) | [P/F Berlin calculator](#/calculator/ards-pf-berlin)

**Only after protective ventilation, prone (if eligible), and conservative fluids have been tried.**

**EOLIA entry, despite optimal ventilation (any one):** [13]
- P/F below 50 for more than 3 h
- P/F below 80 for more than 6 h
- pH below 7.25 with PaCO2 ≥60 mmHg for more than 6 h

**Trial caveat:** EOLIA did not significantly reduce 60-day mortality against conventional management (35% vs 46%, P=0.09), and it stopped for futility. ECMO is a referral decision, not a proven survival step.

**Cross-check:** the ECMO consult lists a different VV-ECMO threshold (single P/F below 80 on FiO2 1.0). Use the ECMO consult for the indication and this node for the EOLIA-type trial gates.`,
    citation: [13],
    options: [
      { label: 'Meets EOLIA-type gates', description: 'Refer for ECMO evaluation now', next: 'ards-ecmo-referral', urgency: 'critical' },
      { label: 'Does not meet gates yet', description: 'Continue ICU ventilation and reassess', next: 'ards-icu', urgency: 'urgent' },
    ],
    calculatorLinks: [
      { id: 'ards-pf-berlin', label: 'P/F Berlin' },
    ],
    summary: 'Refractory hypoxemia meeting EOLIA-type gates goes to ECMO evaluation.',
    safetyLevel: 'critical',
  },
  {
    id: 'ards-ecmo-referral',
    type: 'result',
    module: 4,
    title: 'Refer for ECMO Evaluation',
    body: `**Call the ECMO center early when EOLIA-type gates are met.** [13] See [ECMO](#/tree/ecmo).

**Have ready before the call:**
- Ventilator settings: PEEP, FiO2, plateau pressure, driving pressure, and the ABG time
- Prone sessions completed and their timing
- Fluid balance and vasopressor dose
- Contraindications and goals of care

**Trial caveat:** EOLIA showed a non-significant mortality difference (35% vs 46%, P=0.09). Referral buys expert assessment, not a guaranteed survival gain.`,
    recommendation: 'Refer for ECMO evaluation when EOLIA-type gates are met despite optimal ventilation. The trial did not show a significant mortality benefit, so the referral rests on the individual patient.',
    citation: [13],
    confidence: 'consider',
    summary: 'Early referral for assessment; the trial did not prove a mortality benefit.',
    safetyLevel: 'critical',
  },

  // ---------------------------------------------------------------
  // Module 5: Disposition
  // ---------------------------------------------------------------
  {
    id: 'ards-icu',
    type: 'result',
    module: 5,
    title: 'ICU Disposition: Ventilated ARDS',
    body: `**Admit to ICU** with the protective-ventilation plan in the handoff.

**Handoff must include:**
- PBW, tidal volume in mL, plateau pressure, and PEEP
- Prone status and schedule
- Fluid strategy and balance
- Sedation, analgesia, and any blockade with its reassessment time
- The ECMO trigger from the rescue node

**Non-intubated on high-flow or NIV:** manage per [High-Flow Nasal Cannula](#/tree/hfnc) with the same ARDS reassessment. See [Oxygen Delivery](#/tree/oxygen-delivery).`,
    recommendation: 'Admit to ICU. Hand off the ventilation plan, prone schedule, fluid strategy, and ECMO trigger explicitly.',
    citation: [1, 3, 4],
    confidence: 'recommended',
    summary: 'Every ARDS patient needs ICU-level ventilation and an explicit handoff.',
  },
];

export const ARDS_NODE_COUNT = ARDS_NODES.length;

export const ARDS_MODULE_LABELS = [
  'Recognize',
  'Stabilize',
  'Ventilate',
  'Rescue',
  'Disposition',
];

// Citation 11 (COVID-19 Surviving Sepsis guideline) was removed: it does not support ARDS blockade
// statements. Numbering is kept stable, so there is intentionally no entry 11.
export const ARDS_CITATIONS: Citation[] = [
  { num: 1, text: 'ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin Definition. JAMA. 2012;307(23):2526-2533.' },
  { num: 2, text: 'Matthay MA, Arabi Y, et al. A New Global Definition of Acute Respiratory Distress Syndrome. Am J Respir Crit Care Med. 2024;209(1):37-47. doi:10.1164/rccm.202303-0558WS.' },
  { num: 3, text: 'ARDS Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and the acute respiratory distress syndrome. N Engl J Med. 2000;342(18):1301-1308.' },
  { num: 4, text: 'NHLBI ARDS Clinical Network. Mechanical Ventilation Protocol Summary (July 2008 update). ardsnet.org/files/ventilator_protocol_2008-07.pdf.' },
  { num: 5, text: 'Amato MBP, Meade MO, Slutsky AS, et al. Driving pressure and survival in the acute respiratory distress syndrome. N Engl J Med. 2015;372(8):747-755.' },
  { num: 6, text: 'Guerin C, Reignier J, Richard JC, et al. Prone positioning in severe acute respiratory distress syndrome. N Engl J Med. 2013;368(23):2159-2168.' },
  { num: 7, text: 'Grasselli G, et al. ESICM guidelines on acute respiratory distress syndrome: definition, phenotyping and respiratory support strategies. Intensive Care Med. 2023;49(7):727-759. doi:10.1007/s00134-023-07050-7.' },
  { num: 8, text: 'Qadir N, Sahetya S, Munshi L, et al. An Update on Management of Adult Patients with Acute Respiratory Distress Syndrome: An Official American Thoracic Society Clinical Practice Guideline. Am J Respir Crit Care Med. 2024;209(1):24-36.' },
  { num: 9, text: 'Papazian L, Forel JM, Gacouin A, et al. Neuromuscular blockers in early acute respiratory distress syndrome. N Engl J Med. 2010;363(12):1107-1116.' },
  { num: 10, text: 'Moss M, Huang DT, Brower RG, et al. Early Neuromuscular Blockade in the Acute Respiratory Distress Syndrome. N Engl J Med. 2019;380(21):1997-2008. doi:10.1056/NEJMoa1901686.' },
  { num: 12, text: 'Wiedemann HP, Wheeler AP, Bernard GR, et al. Comparison of two fluid-management strategies in acute lung injury. N Engl J Med. 2006;354(24):2564-2575.' },
  { num: 13, text: 'Combes A, Hajage D, Capellier G, et al. Extracorporeal membrane oxygenation for severe acute respiratory distress syndrome. N Engl J Med. 2018;378(21):1965-1975. doi:10.1056/NEJMoa1800385.' },
  { num: 14, text: 'Brower RG, Lanken PN, MacIntyre N, et al. Higher versus lower positive end-expiratory pressures in patients with the acute respiratory distress syndrome. N Engl J Med. 2004;351(4):327-336.' },
];
