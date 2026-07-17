// MedKitt — Acute Proximal Muscle Weakness / Can't-Lift Front Door (Rule-In / Rule-Out Engine, type: 'hub')
//
// 5-Module rule-in/rule-out skeleton (matches dyspnea-hub / painless-scrotal-swelling-hub template
// codified in CLAUDE.md "Chief-Complaint Hub Template"):
//   1. Sick Check
//   2. Rule In / Rule Out — per-differential chains: entry -> gate(s) -> verdict
//      (excluded verdicts loop back to pmw-triage; confirmed verdicts link out to deep-dive)
//   3. Initial bundle / Reassess (NIF / vital-capacity respiratory-failure bundle)
//   4. Imaging / Labs
//   5. Disposition
//
// EBM-only citations. qSOFA (toxic mimic / sepsis screen) lives in the bottom toolbar.
// Distinct from generalized-weakness-hub (fatigue/malaise) and bilateral-leg-weakness-hub (myelopathy/cord).
// Consult gaps handled as plain-text result nodes: hypo/hyperkalemic periodic paralysis.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PROXIMAL_WEAKNESS_HUB_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Sick Check
  // ============================================================
  {
    id: 'pmw-sick-check',
    type: 'info',
    module: 1,
    title: 'Acute Proximal Weakness — Sick Check First',
    body: '**True acute neuromuscular weakness is an airway/breathing emergency until proven otherwise.** The muscles that fail to lift an arm are the same ones (diaphragm, intercostals, bulbar muscles) that fail to breathe and protect the airway. Do not anchor on "just weak" — a patient can talk, look comfortable, and be minutes from respiratory arrest.\n\n**⚠️ 5 DO-NOT-MISS diagnoses**\n1. **Guillain-Barré syndrome (GBS)** — ascending, symmetric, areflexic weakness with progression to respiratory failure and autonomic instability.\n2. **Myasthenic crisis** — fatigable weakness, diplopia, ptosis, bulbar/respiratory failure; can be precipitated by infection or drugs.\n3. **Botulism** — descending, symmetric, bulbar-first weakness with dilated/fixed pupils, dry mouth, and no fever/sensory loss.\n4. **Tick paralysis** — ascending flaccid paralysis with areflexia that reverses when an attached tick is found and removed.\n5. **Periodic paralysis / severe dyskalemia** — flaccid weakness from hypo- or hyperkalemia; the ECG and potassium can be immediately lethal.\n\n**First 60 seconds:** assess **airway/breathing** (single-breath count, respiratory rate, use of accessory muscles, secretions/swallow), get a **bedside NIF and vital capacity** early, check reflexes and the pattern (ascending vs descending), pupils, and a **stat potassium + ECG**. **Deteriorating respiratory mechanics → intubate; do NOT wait for a blood gas to declare failure.**',
    citation: [1],
    next: 'pmw-triage',
    safetyLevel: 'critical',
  },

  // ============================================================
  // Module 2 — Rule In / Rule Out
  // ============================================================
  {
    id: 'pmw-triage',
    type: 'question',
    module: 2,
    title: 'Rule In / Rule Out — Pick the Thread',
    body: 'Pattern is the key: ascending vs descending, reflexes, pupils, fatigability, exposure history, and potassium. Each branch runs a tight clinical gate to an explicit verdict; excluded branches return here for the next differential.',
    options: [
      { label: '🔴 Ascending, symmetric, areflexic ± back pain / progressing', description: 'Guillain-Barré syndrome', next: 'pmw-gbs-entry', urgency: 'critical' },
      { label: '🔴 Fatigable weakness, diplopia / ptosis / bulbar, worse late-day', description: 'Myasthenic crisis', next: 'pmw-mg-entry', urgency: 'critical' },
      { label: '🔴 Descending, bulbar-first, dilated pupils, dry mouth, afebrile', description: 'Botulism', next: 'pmw-botulism-entry', urgency: 'critical' },
      { label: 'Outdoor exposure, ascending flaccid, areflexia', description: 'Tick paralysis', next: 'pmw-tick-entry', urgency: 'urgent' },
      { label: 'Sudden flaccid weakness, abnormal K⁺ / ECG changes', description: 'Periodic paralysis / dyskalemia', next: 'pmw-periodic-entry', urgency: 'critical' },
      { label: 'Proximal weakness with muscle pain / dark urine / systemic illness', description: 'Myopathic / systemic mimic', next: 'pmw-myopathy-entry', urgency: 'urgent' },
    ],
    citation: [1],
    summary: 'Six-branch triage: GBS / myasthenic crisis / botulism / tick paralysis / periodic paralysis-dyskalemia / myopathic mimic.',
  },

  // -------------------- GUILLAIN-BARRÉ SYNDROME --------------------
  {
    id: 'pmw-gbs-entry',
    type: 'question',
    module: 2,
    title: 'Guillain-Barré — Ascending Areflexia Gate',
    body: '**GBS is progressive, relatively symmetric weakness with hyporeflexia/areflexia**, often ascending from the legs, frequently after a preceding infection (Campylobacter, viral, recent vaccination). Watch for **respiratory failure and autonomic instability** (labile BP/HR, arrhythmias). Bedside markers of impending respiratory failure: falling **vital capacity (<20 mL/kg), NIF worse than −30 cmH₂O, MEP <40**, and rapid progression. **Do NOT rely on SpO₂ — it drops late.**',
    options: [
      { label: 'Ascending areflexic weakness ± progression / respiratory decline', description: 'Treat as GBS', next: 'pmw-gbs-verdict', urgency: 'critical' },
      { label: 'Reflexes intact, non-ascending, no progression', description: 'GBS unlikely \u2014 move on', next: 'pmw-gbs-excluded', urgency: 'routine' },
    ],
    citation: [2],
    summary: 'Ascending symmetric areflexia + progression = GBS; watch VC/NIF, autonomics; do not trust SpO2.',
    safetyLevel: 'critical',
  },
  {
    id: 'pmw-gbs-verdict',
    type: 'result',
    module: 2,
    title: 'GBS — Airway Watch + Immunotherapy',
    body: 'Open [Guillain-Barré Syndrome](#/tree/guillain-barre) for the full pathway.\n\n**Next steps:**\n- **Serial respiratory mechanics (VC + NIF) and continuous monitoring** — intubate early for a falling VC (<15–20 mL/kg), NIF worse than −30, bulbar failure, or rapid progression. Do not wait for hypoxia/hypercapnia.\n- **Monitor for autonomic instability** (arrhythmias, labile BP) — telemetry, cautious with vasoactive drugs.\n- **Immunotherapy: IVIG or plasma exchange** (equally effective; do NOT combine). **Steroids do NOT help in GBS.**\n- Neurology admission (often ICU/step-down); LP (albuminocytologic dissociation) and nerve conduction studies support the diagnosis but do not delay supportive care.\n- DVT prophylaxis, pain control (neuropathic), bladder/bowel care.',
    recommendation: 'Serial VC/NIF with early intubation, telemetry for autonomics, IVIG or plasma exchange (not both, no steroids), neuro/ICU admission.',
    citation: [2],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'pmw-gbs-excluded',
    type: 'result',
    module: 2,
    title: 'GBS — Unlikely',
    body: 'Intact reflexes, a non-ascending pattern, and no progression make GBS unlikely right now. **GBS evolves over hours to days** — preserved reflexes early do not fully exclude it, so if weakness ascends or respiratory mechanics decline, re-escalate and get neurology.\n\nReturn to the hub for the next differential.',
    recommendation: 'GBS unlikely with intact reflexes/no progression; re-check reflexes + VC/NIF serially and escalate if it ascends.',
    citation: [2],
    next: 'pmw-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- MYASTHENIC CRISIS --------------------
  {
    id: 'pmw-mg-entry',
    type: 'question',
    module: 2,
    title: 'Myasthenia Gravis — Fatigability + Bulbar Gate',
    body: '**Myasthenia gravis causes fatigable weakness that worsens with use and late in the day**, classically with **ptosis, diplopia, and bulbar symptoms** (dysarthria, dysphagia, nasal speech). **Myasthenic crisis** is respiratory failure from weakness, often triggered by infection, surgery, or drugs (aminoglycosides, fluoroquinolones, beta-blockers, magnesium). Bulbar weakness with a poor cough/swallow is an airway emergency. Distinguish from cholinergic crisis (over-treatment).',
    options: [
      { label: 'Fatigable + bulbar/respiratory weakness ± known MG / trigger', description: 'Treat as myasthenic crisis', next: 'pmw-mg-verdict', urgency: 'critical' },
      { label: 'No fatigability, no bulbar/ocular signs', description: 'MG unlikely \u2014 move on', next: 'pmw-mg-excluded', urgency: 'routine' },
    ],
    citation: [3],
    summary: 'Fatigable ptosis/diplopia/bulbar weakness + trigger = myasthenic crisis; secure airway, avoid unsafe drugs, IVIG/PLEX.',
    safetyLevel: 'critical',
  },
  {
    id: 'pmw-mg-verdict',
    type: 'result',
    module: 2,
    title: 'Myasthenic Crisis — Airway + Immunotherapy',
    body: 'Open [Myasthenia Gravis](#/tree/myasthenia-gravis) for the full crisis pathway.\n\n**Next steps:**\n- **Serial VC/NIF; intubate early** for bulbar failure or declining mechanics — **avoid depolarizing/prolonged neuromuscular blockade pitfalls** (MG patients are resistant to succinylcholine, sensitive to non-depolarizers).\n- **Identify and remove the trigger** — treat infection, stop precipitating drugs (aminoglycosides, fluoroquinolones, beta-blockers, IV magnesium).\n- **Immunotherapy: IVIG or plasma exchange** for crisis.\n- **Steroids can transiently worsen weakness at initiation** — start under neurology guidance with airway support available.\n- Neurology + ICU admission; continue/adjust anticholinesterase per specialist.',
    recommendation: 'Serial VC/NIF + early intubation (mind NMBA pitfalls), remove triggers/unsafe drugs, IVIG or plasma exchange, neuro/ICU; steroids only with airway backup.',
    citation: [3],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'pmw-mg-excluded',
    type: 'result',
    module: 2,
    title: 'Myasthenia — Unlikely',
    body: 'No fatigability and no ocular/bulbar involvement make myasthenia an unlikely driver. If fatigable ptosis/diplopia or bulbar symptoms appear, re-run this gate and involve neurology.\n\nReturn to the hub for the next differential.',
    recommendation: 'MG unlikely without fatigable/ocular/bulbar signs; reassess if fatigability or bulbar symptoms emerge.',
    citation: [3],
    next: 'pmw-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- BOTULISM --------------------
  {
    id: 'pmw-botulism-entry',
    type: 'question',
    module: 2,
    title: 'Botulism — Descending Paralysis Gate',
    body: '**Botulism is a symmetric, DESCENDING flaccid paralysis that starts with the bulbar muscles** — the classic "4 Ds": diplopia, dysarthria, dysphagia, dysphonia — plus **dilated/fixed pupils, dry mouth, and ptosis**, with a **clear sensorium and no fever or sensory loss**. Sources: home-canned/improperly preserved food, wounds (including injection drug use), and infant botulism. **Descending paralysis + normal mental status + no sensory findings is botulism until proven otherwise.**',
    options: [
      { label: 'Descending bulbar-first weakness, dilated pupils, dry mouth, afebrile', description: 'Treat as botulism', next: 'pmw-botulism-verdict', urgency: 'critical' },
      { label: 'Ascending pattern / sensory loss / fever \u2014 not the picture', description: 'Botulism unlikely \u2014 move on', next: 'pmw-botulism-excluded', urgency: 'routine' },
    ],
    citation: [4],
    summary: 'Descending bulbar-first paralysis + dilated pupils + dry mouth + afebrile = botulism; antitoxin early, airway watch, call public health.',
    safetyLevel: 'critical',
  },
  {
    id: 'pmw-botulism-verdict',
    type: 'result',
    module: 2,
    title: 'Botulism — Antitoxin + Airway Support',
    body: 'Open [Botulism](#/tree/botulism) for the full pathway.\n\n**Next steps:**\n- **Give botulinum antitoxin as early as possible** — do NOT wait for confirmatory testing; antitoxin only halts further paralysis, so timing matters. **Obtain it via your state health department / CDC.**\n- **Airway/respiratory support** — serial VC/NIF, intubate for respiratory failure; many patients need prolonged mechanical ventilation.\n- **Notify public health immediately** (reportable; possible outbreak or bioterrorism); send specimens (serum, stool, wound, suspect food).\n- Wound botulism → wound debridement + antibiotics (avoid aminoglycosides, which worsen the blockade).\n- Supportive ICU care; recovery is slow as nerve terminals regenerate.',
    recommendation: 'Early antitoxin via public health (do not wait for tests) + aggressive airway support + report; wound source → debride (avoid aminoglycosides).',
    citation: [4],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'pmw-botulism-excluded',
    type: 'result',
    module: 2,
    title: 'Botulism — Unlikely',
    body: 'An ascending pattern, sensory involvement, or fever argues against botulism (which is descending, purely motor, and afebrile with a clear sensorium). Reconsider GBS/tick paralysis or an infectious cause.\n\nReturn to the hub for the next differential.',
    recommendation: 'Botulism unlikely if ascending/sensory/febrile; pivot back to GBS/tick/infectious causes.',
    citation: [4],
    next: 'pmw-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- TICK PARALYSIS --------------------
  {
    id: 'pmw-tick-entry',
    type: 'question',
    module: 2,
    title: 'Tick Paralysis — Exposure + Search Gate',
    body: '**Tick paralysis is an ascending flaccid paralysis with areflexia that mimics GBS but reverses when the attached tick is removed.** It follows outdoor/wooded exposure, is toxin-mediated (no fever, normal sensation, normal CSF), and progresses over hours to days. **The diagnosis is made by finding and removing the tick** — search the entire scalp/hairline, ears, axillae, groin, and skin folds meticulously.',
    options: [
      { label: 'Outdoor exposure + ascending flaccid weakness \u2014 search & remove tick', description: 'Treat as tick paralysis', next: 'pmw-tick-verdict', urgency: 'urgent' },
      { label: 'No exposure / no tick found after thorough search', description: 'Tick paralysis unlikely \u2014 move on', next: 'pmw-tick-excluded', urgency: 'routine' },
    ],
    citation: [5],
    summary: 'Ascending flaccid paralysis + outdoor exposure → hunt for and remove the tick; recovery follows removal.',
    safetyLevel: 'warning',
  },
  {
    id: 'pmw-tick-verdict',
    type: 'result',
    module: 2,
    title: 'Tick Paralysis — Remove the Tick',
    body: 'Open [Tick Paralysis](#/tree/tick-paralysis) for the full pathway.\n\n**Next steps:**\n- **Find and completely remove the attached tick** (fine forceps, steady traction at the skin surface, remove mouthparts) — this is diagnostic and therapeutic; improvement usually begins within hours to a day.\n- **Support respiration** — serial VC/NIF; intubate if mechanics decline before improvement occurs.\n- **Search thoroughly** — there may be more than one tick; recheck the scalp/hairline and skin folds.\n- Observe for improvement after removal; if none, reconsider GBS/botulism.\n- Educate on tick-bite prevention.',
    recommendation: 'Remove the tick completely (diagnostic + therapeutic), support respiration until recovery, recheck for additional ticks.',
    citation: [5],
    safetyLevel: 'warning',
    confidence: 'definitive',
  },
  {
    id: 'pmw-tick-excluded',
    type: 'result',
    module: 2,
    title: 'Tick Paralysis — Unlikely',
    body: 'No exposure history and no tick found after a thorough head-to-toe search make tick paralysis unlikely. If ascending weakness continues, treat down the GBS pathway and involve neurology.\n\nReturn to the hub for the next differential.',
    recommendation: 'Tick paralysis unlikely with no tick after full search; default to GBS workup for ongoing ascending weakness.',
    citation: [5],
    next: 'pmw-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- PERIODIC PARALYSIS / DYSKALEMIA (consult gap: plain-text) --------------------
  {
    id: 'pmw-periodic-entry',
    type: 'question',
    module: 2,
    title: 'Periodic Paralysis / Dyskalemia — K⁺ + ECG Gate',
    body: '**Sudden flaccid weakness with an abnormal potassium is immediately treatable and immediately dangerous.** Hypokalemic periodic paralysis (often after carbohydrate load, rest after exercise, or thyrotoxicosis — especially Asian men) and hyperkalemic periodic paralysis both present with episodic weakness sparing the respiratory muscles until severe. **Any acute weakness gets a stat potassium and ECG** — the arrhythmia risk from severe dyskalemia is what kills, not the weakness itself.',
    options: [
      { label: 'Flaccid weakness + abnormal K⁺ and/or ECG changes', description: 'Correct the potassium (careful)', next: 'pmw-periodic-verdict', urgency: 'critical' },
      { label: 'Normal potassium and ECG', description: 'Dyskalemia excluded \u2014 move on', next: 'pmw-periodic-excluded', urgency: 'routine' },
    ],
    citation: [6],
    summary: 'Acute weakness → stat K+ and ECG; correct hypo/hyperkalemia cautiously (rebound overshoot), treat thyrotoxicosis if present.',
    safetyLevel: 'critical',
  },
  {
    id: 'pmw-periodic-verdict',
    type: 'result',
    module: 2,
    title: 'Dyskalemic Paralysis — Correct Potassium Carefully',
    body: '**Periodic paralysis / severe dyskalemia** (no dedicated consult yet — manage here). Use the electrolyte pathways: [Potassium Disorders](#/tree/potassium).\n\n**Next steps:**\n- **Continuous ECG monitoring** — the arrhythmia is the lethal threat.\n- **Hypokalemic:** replace potassium **cautiously** — total-body potassium is often normal (it has shifted intracellularly), so aggressive replacement risks **rebound hyperkalemia** as the shift reverses. Small, monitored doses.\n- **Thyrotoxic periodic paralysis:** treat the hyperthyroidism ([Thyroid Emergencies](#/tree/thyroid)); **non-selective beta-blockade (propranolol)** blunts the shift and is often preferred over aggressive potassium.\n- **Hyperkalemic:** membrane stabilization (calcium), shift (insulin/glucose, beta-agonist), and elimination per the potassium pathway.\n- Identify triggers; neurology/endocrine referral for confirmed periodic paralysis.\n- (Consult gap for periodic paralysis — managed in-hub.)',
    recommendation: 'ECG monitoring + cautious K+ correction (avoid rebound); thyrotoxic PP → beta-blocker + treat thyroid; hyperkalemic → stabilize/shift/eliminate.',
    citation: [6],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },
  {
    id: 'pmw-periodic-excluded',
    type: 'result',
    module: 2,
    title: 'Dyskalemia — Excluded',
    body: 'A normal potassium and a normal ECG exclude dyskalemic paralysis as the current driver. Keep it in mind for episodic recurrent weakness and recheck electrolytes if the picture changes.\n\nReturn to the hub for the next differential.',
    recommendation: 'Normal K+/ECG excludes dyskalemic paralysis now; recheck for episodic/recurrent weakness.',
    citation: [6],
    next: 'pmw-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- MYOPATHIC / SYSTEMIC MIMIC --------------------
  {
    id: 'pmw-myopathy-entry',
    type: 'question',
    module: 2,
    title: 'Myopathic / Systemic Mimic — Muscle + Systemic Gate',
    body: '**Proximal weakness with muscle pain, tenderness, or dark urine points to a myopathic or systemic cause** rather than a neuromuscular-junction/nerve emergency. Consider **rhabdomyolysis** (myalgia, dark urine, high CK — renal and electrolyte risk), inflammatory myopathy (polymyositis/dermatomyositis), steroid or statin myopathy, thyroid myopathy, and severe electrolyte disturbance. Also remember an **acute stroke or spinal cord lesion** can masquerade as "can\'t lift" — check for UMN signs and a sensory level.',
    options: [
      { label: 'Myalgia / dark urine / high CK / systemic illness', description: 'Work up myopathy / rhabdo', next: 'pmw-myopathy-verdict', urgency: 'urgent' },
      { label: 'Focal deficit / UMN signs / sensory level \u2014 CNS or cord', description: 'Pivot to CNS/cord workup', next: 'pmw-myopathy-cns', urgency: 'urgent' },
    ],
    citation: [1],
    summary: 'Myalgia/dark urine/high CK → myopathy-rhabdo workup; focal/UMN/sensory-level → CNS or cord pathway.',
  },
  {
    id: 'pmw-myopathy-verdict',
    type: 'result',
    module: 2,
    title: 'Myopathy / Rhabdomyolysis — Workup + Protect the Kidneys',
    body: '**Myopathic proximal weakness** (manage here; use the deep-dive when rhabdo is confirmed):\n\n- **Check CK, potassium, calcium, phosphate, renal function, and urinalysis.** A markedly elevated CK with pigmenturia → [Rhabdomyolysis](#/tree/rhabdomyolysis) — aggressive IV fluids and monitor for hyperkalemia and AKI.\n- **Correct electrolyte disturbances** driving the weakness (potassium, calcium, phosphate, magnesium).\n- **Medication review:** statins, steroids, colchicine; stop the offender.\n- **Inflammatory myopathy** (proximal weakness, elevated CK, ± rash of dermatomyositis) → rheumatology/neurology referral, consider underlying malignancy.\n- **Thyroid myopathy** → check TSH.\n- Treat the underlying cause; supportive care and follow-up.',
    recommendation: 'CK + electrolytes + renal/UA; rhabdo → IV fluids + watch K+/AKI; stop myotoxic drugs; refer inflammatory/endocrine myopathy.',
    citation: [1],
    next: 'pmw-disposition',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'pmw-myopathy-cns',
    type: 'result',
    module: 2,
    title: 'CNS / Cord Mimic — Do Not Miss a Central Lesion',
    body: '**Focal weakness, upper-motor-neuron signs (hyperreflexia, spasticity, Babinski), or a sensory level is NOT a myopathy — it is central.**\n\n- **Acute focal deficit → stroke pathway:** [Stroke](#/tree/stroke) — time-critical, get neuro imaging and consider reperfusion.\n- **Sensory level / bilateral leg weakness / bladder-bowel involvement → cord compression/myelopathy:** emergent MRI of the spine; steroids and neurosurgery if compressive. (See the bilateral-leg-weakness and cauda-equina pathways.)\n- Do not let a "weakness" label delay time-critical CNS imaging and consultation.',
    recommendation: 'Focal/UMN/sensory-level weakness = central lesion: stroke pathway for acute focal deficit, emergent spine MRI for a cord syndrome; do not delay.',
    citation: [1],
    next: 'pmw-disposition',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // ============================================================
  // Module 3 — Initial Bundle / Reassess (respiratory-failure bundle)
  // ============================================================
  {
    id: 'pmw-rescue',
    type: 'info',
    module: 3,
    title: 'Initial Bundle — Respiratory-Failure Watch',
    body: '**The acute-neuromuscular-weakness bundle centers on breathing (scale to acuity):**\n- **Bedside respiratory mechanics up front and serially:** single-breath count, **forced vital capacity (FVC)** and **negative inspiratory force (NIF/MIP)**. Warning thresholds: **FVC <20 mL/kg, NIF worse than −30 cmH₂O, MEP <40 cmH₂O ("20/30/40 rule")**, rapid decline, or weak cough/poor swallow.\n- **Intubate on trending mechanics and bulbar failure — do NOT wait for hypoxia or hypercapnia; SpO₂ and ABG fail late.** Anticipate NMBA pitfalls in MG.\n- **Stat potassium + ECG** on every acute weakness; correct dyskalemia.\n- **Pattern exam:** ascending vs descending, reflexes, pupils, fatigability, sensory level, UMN signs.\n- **Labs:** CK, electrolytes (K/Ca/PO₄/Mg), renal function, TSH; medication review; consider LP/NCS/MRI per suspected cause.\n- Cardiac/telemetry monitoring for autonomic instability (GBS).',
    citation: [1],
    next: 'pmw-reassess',
  },
  {
    id: 'pmw-reassess',
    type: 'question',
    module: 3,
    title: 'Reassess After the Bundle',
    body: 'After bedside mechanics, the pattern exam, and initial labs/ECG — where does the patient stand?',
    options: [
      { label: 'Declining mechanics / bulbar failure / crisis / lethal K⁺', description: 'Escalate: intubate + ICU', next: 'pmw-imaging', urgency: 'critical' },
      { label: 'Stable mechanics, cause identified / treatable', description: 'Move to disposition', next: 'pmw-disposition', urgency: 'routine' },
    ],
    citation: [1],
    summary: 'Declining VC/NIF, bulbar failure, or lethal dyskalemia → intubate + ICU; stable + diagnosed → disposition.',
  },

  // ============================================================
  // Module 4 — Imaging / Labs
  // ============================================================
  {
    id: 'pmw-imaging',
    type: 'info',
    module: 4,
    title: 'Imaging / Diagnostics',
    body: '**Match the test to the suspected level of the lesion:**\n- **Lumbar puncture** — GBS (albuminocytologic dissociation: high protein, normal cell count; may be normal in the first days).\n- **Nerve conduction studies / EMG** — confirm GBS (demyelinating), botulism (incremental response), MG (decremental response/jitter); usually inpatient/specialist.\n- **MRI brain/spine** — when a CNS or cord lesion is possible (focal deficit, UMN signs, sensory level); emergent for suspected cord compression.\n- **ECG + potassium (and repeat)** — dyskalemic paralysis and autonomic/arrhythmia monitoring.\n- **CK, electrolytes, TSH, renal function, UA** — myopathy/rhabdomyolysis and metabolic causes.\n- **CT chest/abdomen** — thymoma in MG; occult malignancy in inflammatory myopathy (specialist-directed).\n- Bedside VC/NIF is the most important "imaging" of all — it dictates the airway decision.',
    citation: [1],
    next: 'pmw-disposition',
  },

  // ============================================================
  // Module 5 — Disposition
  // ============================================================
  {
    id: 'pmw-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Where does this patient go?',
    options: [
      { label: 'GBS / myasthenic crisis / botulism / intubated / lethal K⁺', description: 'ICU / admit', next: 'pmw-dispo-admit', urgency: 'critical' },
      { label: 'Stable neuromuscular process needing monitoring / evolving', description: 'Admit to monitored bed', next: 'pmw-dispo-observe', urgency: 'urgent' },
      { label: 'Reversible cause corrected / benign myopathy', description: 'Discharge with follow-up', next: 'pmw-dispo-discharge', urgency: 'routine' },
    ],
    citation: [1],
    summary: 'ICU/admit crises and intubated/lethal-K patients; monitored bed for evolving processes; discharge corrected reversible causes.',
  },
  {
    id: 'pmw-dispo-admit',
    type: 'result',
    module: 5,
    title: 'ICU / Admit',
    body: '**ICU / admit** the neuromuscular emergency.\n\n- **GBS / myasthenic crisis / botulism** → ICU or step-down with continuous respiratory monitoring, immunotherapy/antitoxin, and airway management.\n- **Any intubated patient** → ICU; anticipate prolonged ventilation in botulism.\n- **Lethal dyskalemia** → monitored bed with continuous ECG until corrected and stable.\n- Neurology (and public health for botulism) involved; ongoing serial mechanics and supportive care.',
    recommendation: 'ICU/step-down for GBS/MG crisis/botulism/intubated/lethal-K; continuous respiratory + cardiac monitoring, immunotherapy/antitoxin, specialist involvement.',
    citation: [1],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'pmw-dispo-observe',
    type: 'result',
    module: 5,
    title: 'Admit to a Monitored Bed',
    body: '**Admission to a monitored bed** for the evolving or uncertain neuromuscular process — e.g., early GBS with stable mechanics, borderline myasthenia needing serial VC/NIF, or tick paralysis after removal awaiting improvement.\n\n- Serial respiratory mechanics and neuro exams; low threshold to escalate to the ICU.\n- Complete the diagnostic workup (LP/NCS/MRI) and involve neurology before disposition.\n- Do not discharge an evolving neuromuscular weakness home.',
    recommendation: 'Monitored-bed admission with serial mechanics/neuro exams and a low escalation threshold; complete workup with neurology.',
    citation: [1],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'pmw-dispo-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge',
    body: '**Discharge** only when the cause is reversible and corrected and respiratory function is normal.\n\n- **Corrected dyskalemia** with a clear trigger, normal repeat ECG, and resolved weakness → discharge with electrolyte/endocrine follow-up and trigger counseling.\n- **Benign/stable myopathy** (e.g., statin myopathy after stopping the drug, mild self-limited myositis) → discharge with the appropriate outpatient workup and referral.\n- Provide explicit return precautions: any recurrence of weakness, shortness of breath, difficulty swallowing/speaking, or palpitations → return immediately.\n- Written return precautions and a named follow-up.',
    recommendation: 'Discharge only reversible, corrected causes with normal breathing; outpatient workup + strict neuromuscular/respiratory return precautions.',
    citation: [1],
    confidence: 'recommended',
  },
];

export const PROXIMAL_WEAKNESS_HUB_CRITICAL_ACTIONS = [
  { text: 'Sick Check first — acute neuromuscular weakness is an airway/breathing emergency; get bedside VC/NIF early', nodeId: 'pmw-sick-check' },
  { text: 'Ascending symmetric areflexic weakness → GBS: serial VC/NIF with early intubation + IVIG or plasma exchange (no steroids)', nodeId: 'pmw-gbs-entry' },
  { text: 'Descending bulbar-first weakness + dilated pupils + afebrile → botulism: early antitoxin via public health + airway support', nodeId: 'pmw-botulism-entry' },
  { text: 'Acute flaccid weakness → stat potassium + ECG; correct dyskalemia cautiously (rebound overshoot)', nodeId: 'pmw-periodic-entry' },
];

export const PROXIMAL_WEAKNESS_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Asimos AW. Weakness: A Systematic Approach to Acute, Non-traumatic, Neurologic and Neuromuscular Causes. Emerg Med Pract; CDEM/SAEM M4 Curriculum "Weakness"; Tintinalli\u2019s Emergency Medicine, Weakness chapter, 9th ed.' },
  { num: 2, text: 'Leonhard SE, et al. Diagnosis and management of Guillain-Barré syndrome in ten steps. Nat Rev Neurol. 2019;15(11):671-683; Hughes RAC, et al. Supportive care for GBS. Arch Neurol. 2005.' },
  { num: 3, text: 'Wendell LC, Levine JM. Myasthenic Crisis. Neurohospitalist. 2011;1(1):16-22; Sanders DB, et al. International consensus guidance for management of myasthenia gravis. Neurology. 2016;87(4):419-425.' },
  { num: 4, text: 'Rao AK, et al. Clinical Guidelines for Diagnosis and Treatment of Botulism, 2021 (CDC). MMWR Recomm Rep. 2021;70(2):1-30.' },
  { num: 5, text: 'Diaz JH. A comparative meta-analysis of tick paralysis in the United States and Australia. Clin Toxicol. 2015;53(9):874-883; Edlow JA, McGillicuddy DC. Tick paralysis. Infect Dis Clin North Am. 2008.' },
  { num: 6, text: 'Statland JM, et al. Review of the Diagnosis and Treatment of Periodic Paralysis. Muscle Nerve. 2018;57(4):522-530; Vijayan J, et al. Thyrotoxic periodic paralysis. J Emerg Med. 2014. Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008.' },
];

export const PROXIMAL_WEAKNESS_HUB_NODE_COUNT = PROXIMAL_WEAKNESS_HUB_NODES.length;

export const PROXIMAL_WEAKNESS_HUB_MODULE_LABELS = [
  'Sick Check',
  'Rule In / Rule Out',
  'Initial Bundle / Reassess',
  'Imaging / Labs',
  'Disposition',
];
