// MedKitt - ED Procedural Sedation
// Bedside procedure support: readiness, agent choice, monitoring, rescue, recovery.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PROCEDURAL_SEDATION_NODES: DecisionNode[] = [
  {
    id: 'ps-start',
    type: 'info',
    module: 1,
    title: 'ED Procedural Sedation',
    body: 'Use this for short ED procedures when analgesia, anxiolysis, amnesia, or dissociation is needed and the team can immediately rescue airway/ventilation.\n\nOpen first:\n- [Sedation Steps](#/info/ps-steps)\n- [Airway Rescue Setup](#/info/ps-airway)\n- [Agent Selection](#/info/ps-agents)\n- [Monitoring](#/info/ps-monitor)\n- [Stop / Escalate](#/info/ps-stop)',
    citation: [1, 2, 3],
    images: [
      {
        src: 'images/procedural-sedation/ambu-bag-valve-mask.jpg',
        alt: 'Bag-valve-mask airway rescue equipment',
        caption: 'Airway rescue equipment must be immediately available before sedation. Wikimedia Commons, CC BY-SA/GFDL.',
      },
    ],
    next: 'ps-appropriateness',
    summary: 'Short ED sedation workflow: risk, setup, agent, monitor, rescue, recover.',
    safetyLevel: 'critical',
  },
  {
    id: 'ps-appropriateness',
    type: 'question',
    module: 1,
    title: 'Is ED Sedation Appropriate?',
    body: 'Confirm the procedure is urgent/beneficial and can be completed safely with ED airway rescue capability.',
    options: [
      {
        label: 'Appropriate for ED sedation',
        description: 'Brief painful procedure, reduction, cardioversion, abscess drainage, imaging, or wound care',
        next: 'ps-risk-screen',
        urgency: 'urgent',
      },
      {
        label: 'Needs anesthesia/OR/ICU pathway',
        description: 'Anticipated difficult rescue, prolonged procedure, unstable physiology, or inability to monitor/recover safely',
        next: 'ps-stop-escalate',
        urgency: 'critical',
      },
    ],
    citation: [1, 2],
    summary: 'Confirm the procedure fits ED sedation and not anesthesia/OR escalation.',
  },
  {
    id: 'ps-risk-screen',
    type: 'info',
    module: 1,
    title: 'Risk Screen',
    body: 'Screen for: difficult airway features, severe OSA/obesity hypoventilation, active vomiting/aspiration risk, severe cardiopulmonary disease, pregnancy, intoxication, elderly/frail physiology, and prior sedation complication.\n\nDo not delay urgent sedation solely for fasting status, but adjust plan and risk discussion when aspiration risk is high.',
    citation: [1, 2, 4],
    next: 'ps-setup',
    summary: 'Risk screen before drug choice: airway, aspiration, cardiopulmonary reserve, age/frailty.',
  },
  {
    id: 'ps-setup',
    type: 'info',
    module: 2,
    title: 'Setup Before Medication',
    body: 'Minimum setup:\n- Preoxygenate when feasible\n- Continuous pulse oximetry, cardiac monitoring, BP cycling\n- Capnography when available, especially moderate/deep sedation\n- Suction ready\n- BVM, oxygen, oral/nasal airways, and intubation backup immediately available\n- Dedicated monitor separate from procedure operator\n- Resuscitation meds and reversal agents accessible',
    citation: [1, 2, 3],
    images: [
      {
        src: 'images/procedural-sedation/capnography-co2-mixing.png',
        alt: 'Capnography waveform diagram',
        caption: 'Capnography can detect hypoventilation before pulse oximetry falls. Wikimedia Commons, CC BY-SA 4.0.',
      },
    ],
    next: 'ps-agent-choice',
    summary: 'Monitoring and rescue setup must be complete before medication.',
    safetyLevel: 'critical',
  },
  {
    id: 'ps-agent-choice',
    type: 'question',
    module: 3,
    title: 'Choose Sedation Strategy',
    body: 'Match the agent to procedure pain, desired immobility, hemodynamics, airway risk, and clinician familiarity.',
    options: [
      {
        label: 'Dissociation preferred',
        description: 'Painful procedure, need preserved respiratory drive, pediatric or adult dissociative plan',
        next: 'ps-ketamine',
        urgency: 'urgent',
      },
      {
        label: 'Brief deep sedation',
        description: 'Reduction/cardioversion; rapid onset and rapid offset needed',
        next: 'ps-short-acting',
        urgency: 'urgent',
      },
      {
        label: 'Analgesia + anxiolysis only',
        description: 'Less painful procedure, frail patient, or lower depth target',
        next: 'ps-opioid-benzo',
      },
    ],
    citation: [1, 2, 3],
    summary: 'Pick dissociation, brief deep sedation, or analgesia/anxiolysis plan.',
  },
  {
    id: 'ps-ketamine',
    type: 'info',
    module: 3,
    title: 'Dissociative Ketamine Plan',
    body: 'Use [Ketamine](#/drug/ketamine/procedural-sedation) when dissociation is the desired endpoint.\n\nPractical reminders:\n- Dose intentionally; avoid repeated small under-doses that prolong agitation\n- Monitor for vomiting, hypersalivation, emergence reaction, and rare laryngospasm\n- Avoid when severe uncontrolled hypertension, active psychosis, or concerning airway secretions make another strategy safer',
    citation: [2, 3],
    next: 'ps-monitoring',
    summary: 'Ketamine: dissociative option with airway vigilance and emesis/laryngospasm planning.',
  },
  {
    id: 'ps-short-acting',
    type: 'info',
    module: 3,
    title: 'Brief Deep Sedation Plan',
    body: 'Common ED options include [Propofol](#/drug/propofol/procedural-sedation), [Etomidate](#/drug/etomidate/procedural-sedation), or ketofol per local protocol.\n\nPractical reminders:\n- Titrate to effect with immediate airway rescue readiness\n- Expect apnea/hypotension risk with propofol\n- Etomidate has no analgesia; pair with analgesia when needed\n- Avoid casual redosing after procedure completion',
    citation: [1, 2, 3],
    next: 'ps-monitoring',
    summary: 'Short-acting deep sedation needs titration, oxygenation, and rescue readiness.',
  },
  {
    id: 'ps-opioid-benzo',
    type: 'info',
    module: 3,
    title: 'Analgesia + Anxiolysis Plan',
    body: 'Use lower-depth sedation when full dissociation/deep sedation is not needed.\n\nCommon pairings include [Fentanyl](#/drug/fentanyl/procedural-sedation) plus cautious [Midazolam](#/drug/midazolam/procedural-sedation-cardioversion) titration.\n\nAvoid stacking respiratory depressants without reassessing ventilation after each dose.',
    citation: [1, 2],
    next: 'ps-monitoring',
    summary: 'Opioid/benzodiazepine plans require slow titration and ventilation reassessment.',
  },
  {
    id: 'ps-monitoring',
    type: 'info',
    module: 4,
    title: 'During Sedation',
    body: 'Monitor the patient, not only the procedure.\n\nTrack:\n- Airway patency and chest rise\n- SpO2 and capnography trend\n- BP and perfusion\n- Sedation depth\n- Pain response and procedure progress\n\nCall out deterioration early: falling ETCO2 waveform, apnea, obstruction, desaturation, hypotension, or vomiting.',
    citation: [1, 2, 3],
    next: 'ps-complication-check',
    summary: 'Ventilation trend and clinical exam drive rescue decisions.',
  },
  {
    id: 'ps-complication-check',
    type: 'question',
    module: 4,
    title: 'Any Sedation Complication?',
    body: 'Interrupt the procedure if oxygenation, ventilation, perfusion, or airway protection becomes unsafe.',
    options: [
      {
        label: 'Stable sedation course',
        description: 'Ventilation and perfusion remain acceptable',
        next: 'ps-recovery',
      },
      {
        label: 'Airway/ventilation issue',
        description: 'Obstruction, apnea, desaturation, laryngospasm, emesis/aspiration concern',
        next: 'ps-rescue',
        urgency: 'critical',
      },
      {
        label: 'Hemodynamic or recovery concern',
        description: 'Hypotension, prolonged sedation, agitation, inability to discharge safely',
        next: 'ps-stop-escalate',
        urgency: 'urgent',
      },
    ],
    citation: [1, 2],
    summary: 'Complications trigger immediate rescue, not watchful waiting.',
  },
  {
    id: 'ps-rescue',
    type: 'result',
    module: 4,
    title: 'Airway Rescue Sequence',
    body: 'Stop procedure stimulation and restore ventilation.\n\nImmediate sequence:\n1. Reposition airway; jaw thrust\n2. Suction if needed\n3. Supplemental oxygen / BVM ventilation\n4. Oral or nasal airway if tolerated\n5. Treat laryngospasm with airway maneuvers, positive pressure, and escalation per local protocol\n6. Intubate or call airway help if ventilation cannot be restored',
    recommendation: 'Ventilation is the endpoint. Escalate early if BVM ventilation is ineffective.',
    confidence: 'definitive',
    citation: [1, 2, 3],
    summary: 'Rescue airway/ventilation immediately and escalate if BVM fails.',
    safetyLevel: 'critical',
  },
  {
    id: 'ps-recovery',
    type: 'result',
    module: 5,
    title: 'Recovery / Disposition',
    body: 'Recover until the patient has stable airway/ventilation, stable hemodynamics, improving mental status near baseline, controlled pain/nausea, and a safe escort/disposition plan.\n\nDocument: indication, consent/emergency exception, risk screen, ASA/airway assessment, time-out, meds/doses/times, monitoring, complications, recovery status, and discharge instructions.',
    recommendation: 'Discharge only after return to safe baseline and procedure-specific disposition criteria are met.',
    confidence: 'recommended',
    citation: [1, 2],
    summary: 'Recovery requires airway, perfusion, mentation, pain control, and safe disposition.',
  },
  {
    id: 'ps-stop-escalate',
    type: 'result',
    module: 5,
    title: 'Stop / Escalate',
    body: 'Do not proceed with routine ED sedation when risk exceeds ED rescue resources.\n\nEscalate for: anticipated impossible ventilation, severe unstable cardiopulmonary disease, inability to monitor, no recovery space, procedure too long/complex, or complication requiring advanced airway/ICU/OR.',
    recommendation: 'Use anesthesia, OR, ICU, or specialist pathway when the sedation risk is not matched by ED resources.',
    confidence: 'recommended',
    citation: [1, 2, 4],
    summary: 'Escalate when procedure, physiology, or airway risk exceeds ED sedation capacity.',
    safetyLevel: 'critical',
  },
];

export const PROCEDURAL_SEDATION_CRITICAL_ACTIONS = [
  { text: 'Complete airway rescue setup before medication.', nodeId: 'ps-setup' },
  { text: 'Use a dedicated monitor who is not the procedure operator.', nodeId: 'ps-setup' },
  { text: 'Choose agent based on procedure pain, hemodynamics, airway risk, and desired depth.', nodeId: 'ps-agent-choice' },
  { text: 'Treat apnea/obstruction immediately; ventilation is the endpoint.', nodeId: 'ps-rescue' },
  { text: 'Do not discharge until airway, hemodynamics, mentation, pain, and escort plan are safe.', nodeId: 'ps-recovery' },
];

export const PROCEDURAL_SEDATION_CITATIONS: Citation[] = [
  { num: 1, text: 'Godwin SA, Burton JH, Gerardo CJ, et al. Clinical policy: procedural sedation and analgesia in the emergency department. Ann Emerg Med. 2014;63(2):247-258.e18.' },
  { num: 2, text: 'American College of Emergency Physicians. Unscheduled procedural sedation: patient care policy statement. ACEP Policy Statement.' },
  { num: 3, text: 'Green SM, Roback MG, Kennedy RM, Krauss B. Clinical practice guideline for emergency department ketamine dissociative sedation. Ann Emerg Med. 2011;57(5):449-461.' },
  { num: 4, text: 'Practice Guidelines for Moderate Procedural Sedation and Analgesia 2018: a report by the American Society of Anesthesiologists Task Force. Anesthesiology. 2018;128(3):437-479.' },
];

export const PROCEDURAL_SEDATION_NODE_COUNT = PROCEDURAL_SEDATION_NODES.length;
export const PROCEDURAL_SEDATION_MODULE_LABELS = ['Indication', 'Setup', 'Agent', 'Monitor', 'Recovery'];
