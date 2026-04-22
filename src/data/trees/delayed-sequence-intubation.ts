// MedKitt — Delayed Sequence Intubation (DSI)
// The "Delirious Desaturator" — procedural sedation where the procedure is preoxygenation
// 5 modules: Indications → Contraindications → Ketamine Sedation → Preoxygenation → Intubation Decision
// EMCrit-based protocol (Weingart)

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const DELAYED_SEQUENCE_INTUBATION_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'DSI is procedural sedation where the procedure is preoxygenation — ketamine preserves spontaneous breathing and airway reflexes', nodeId: 'dsi-start' },
  { text: 'Ketamine 1-1.5 mg/kg IV SLOW PUSH over 15-30 seconds — rapid push risks transient apnea', nodeId: 'dsi-ketamine-dose' },
  { text: 'Keep nasal cannula at 15 L/min throughout entire DSI including during paralysis — only remove at intubation', nodeId: 'dsi-preox-technique' },
  { text: '15-20% of DSI patients avoid intubation entirely once sedation improves oxygenation — reassess before paralysis', nodeId: 'dsi-reassess' },
  { text: 'Abort to RSI if SpO2 remains <95% after 10 minutes of optimal preoxygenation', nodeId: 'dsi-abort-criteria' },
  { text: 'Have RSI drugs drawn and ready throughout — be prepared to convert at any moment', nodeId: 'dsi-setup' },
];

export const DELAYED_SEQUENCE_INTUBATION_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: DSI OVERVIEW & INDICATIONS
  // =====================================================================

  {
    id: 'dsi-start',
    type: 'info',
    module: 1,
    title: 'Delayed Sequence Intubation (DSI)',
    body: '[DSI Quick Reference](#/info/dsi-summary)\n\n**Core Concept:** DSI is procedural sedation where the procedure is **preoxygenation**. [1]\n\nRather than simultaneously giving sedative + paralytic (RSI), DSI uses a dissociative agent that preserves spontaneous breathing and airway reflexes, allowing adequate oxygen loading BEFORE paralysis.\n\n**Key distinction:**\n- **RSI:** Trust the preoxygenation you already did\n- **DSI:** Secure better preoxygenation in the patient who won\'t tolerate it\n\n**The "Delirious Desaturator":**\nPatients who need intubation but are too agitated, combative, or delirious to tolerate preoxygenation.\n\n**Evidence:**\n- Pre-DSI SpO2: 88.9% → Post-DSI SpO2: 98.8% [2]\n- Trauma RCT: DSI 8% vs RSI 35% peri-intubation hypoxemia (p<0.001) [3]',
    citation: [1, 2, 3],
    next: 'dsi-indications',

    summary: 'DSI = procedural sedation where the procedure is preoxygenation; ketamine preserves spontaneous breathing',
  },

  {
    id: 'dsi-indications',
    type: 'question',
    module: 1,
    title: 'DSI Indications',
    body: '**Primary Indication:** Patient needs intubation but is **intolerant of standard preoxygenation**.\n\n**The "Delirious Desaturator" Phenotypes:** [1]\n\n- Agitated delirium from hypoxia, hypercapnia, or medical condition\n- Refusing nasal cannula, NRB, BVM, or NIV\n- High-risk desaturator (SpO2 ≤93% on high-flow O2)\n- Combative patient on NIV (anxiety-driven)\n- Needs pre-intubation procedures they won\'t tolerate (e.g., NGT in GI bleed)\n\n**Clinical Pearl:** Many patients (15-20%) actually **avoid intubation** after DSI — agitation resolves and oxygenation improves so dramatically that paralysis becomes unnecessary. [1]\n\nDoes this patient meet DSI criteria?',
    citation: [1],
    options: [
      {
        label: 'Yes — Cannot tolerate preoxygenation',
        description: 'Agitated, combative, refusing mask/NIV, delirium',
        next: 'dsi-contraindications',
      },
      {
        label: 'No — Tolerating preoxygenation',
        description: 'Standard RSI appropriate',
        next: 'dsi-use-rsi',
      },
    ],

    summary: 'DSI for patients intolerant of preoxygenation: agitated, combative, refusing mask, delirious desaturators',
  },

  {
    id: 'dsi-use-rsi',
    type: 'result',
    module: 1,
    title: 'Standard RSI Appropriate',
    body: 'Patient is tolerating standard preoxygenation — proceed with RSI.',
    recommendation: '**Standard RSI Indicated**\n\nPatient can tolerate preoxygenation — DSI not required.\n\n**Proceed with RSI:**\n- Preoxygenate with NC 15 L/min + NRB or BVM with PEEP\n- Target SpO2 >95% for 3 minutes\n- Then induction + paralysis + intubation\n\n**Consider the [Physiologically Difficult Airway](#/tree/physiologically-difficult-airway) consult** if:\n- Hypotensive\n- Hypoxemic\n- Severely acidotic\n- RV failure\n- Elevated ICP',

    summary: 'Patient tolerates preoxygenation — use standard RSI, not DSI',
  },

  // =====================================================================
  // MODULE 2: CONTRAINDICATIONS & SETUP
  // =====================================================================

  {
    id: 'dsi-contraindications',
    type: 'question',
    module: 2,
    title: 'DSI Contraindications',
    body: '[DSI Contraindications](#/info/dsi-contraindications)\n\n**Absolute Contraindications:** [1][4]\n\n- **Non-spontaneously breathing** — DSI depends on maintaining spontaneous ventilation\n- **Absent airway reflexes** — comatose, unresponsive\n- **Ketamine allergy**\n- **Very high aspiration risk** — DSI is NOT apneic like RSI, aspiration risk persists longer\n\n**Relative Contraindications:**\n\n- Severe hypertension or tachycardia (ketamine is sympathomimetic) → consider dexmedetomidine\n- Active myocardial ischemia or recent MI\n- Uncontrolled hyperthyroidism\n\n**Operator Requirement:**\nDSI requires experienced airway provider. Not for novices.\n\nAny absolute contraindications?',
    citation: [1, 4],
    options: [
      {
        label: 'No contraindications',
        description: 'Proceed with DSI',
        next: 'dsi-setup',
      },
      {
        label: 'Absolute contraindication present',
        description: 'DSI not appropriate',
        next: 'dsi-contraindicated',
      },
      {
        label: 'Relative contraindication (HTN/tachy)',
        description: 'Consider dexmedetomidine alternative',
        next: 'dsi-dex-alternative',
      },
    ],

    summary: 'DSI contraindications: non-breathing, no reflexes, ketamine allergy, very high aspiration risk',
  },

  {
    id: 'dsi-contraindicated',
    type: 'result',
    module: 2,
    title: 'DSI Contraindicated',
    body: 'DSI is not appropriate for this patient due to absolute contraindication.',
    recommendation: '**DSI Contraindicated**\n\n**Proceed with RSI** despite known desaturation risk:\n\n- Maximize preoxygenation as tolerated\n- Have difficult airway equipment ready\n- Consider apneic oxygenation (NC 15 L/min) during laryngoscopy\n- Be prepared for rapid desaturation\n\n**If patient is apneic/not breathing:**\n- Immediate BVM ventilation\n- Proceed directly to intubation\n\n**If aspiration risk is primary concern:**\n- RSI provides the shortest time from induction to secured airway\n- Cricoid pressure if trained\n- Suction at ready',

    summary: 'DSI contraindicated — proceed with RSI despite desaturation risk',
  },

  {
    id: 'dsi-dex-alternative',
    type: 'info',
    module: 2,
    title: 'Dexmedetomidine Alternative',
    body: '**For patients with severe HTN/tachycardia where ketamine is contraindicated:** [1][5]\n\n**Dexmedetomidine:**\n- Dose: **1 mcg/kg IV over 10 minutes**\n- Preserves airway reflexes and respiratory drive (like ketamine)\n- No sympathomimetic surge\n- Less hypersalivation than ketamine\n\n**Disadvantages:**\n- Onset: 3-5 minutes (slower than ketamine)\n- Less potent against severe combativeness\n- May cause bradycardia/hypotension\n\n**Best use case:**\nAnxious patients with COPD/asthma in anxiety-hyperventilation spiral + BiPAP. Dexmedetomidine can slow RR and restore effective ventilation without intubation.\n\n**If using dex:** Otherwise follow same DSI protocol — preoxygenate during sedation, reassess need for intubation.',
    citation: [1, 5],
    next: 'dsi-setup',

    summary: 'Dexmedetomidine 1 mcg/kg over 10 min — preserves airway reflexes, no sympathomimetic surge, but slower onset',
  },

  {
    id: 'dsi-setup',
    type: 'info',
    module: 2,
    title: 'DSI Setup',
    body: '[DSI Checklist](#/info/dsi-checklist)\n\n**Phase 1: Setup & Positioning**\n\n1. **Position patient:** Head-up 30+ degrees, ramp if obese\n   - Auditory meatus above jugular notch\n\n2. **Assemble full intubation equipment:**\n   - Video laryngoscope + backup direct\n   - ETT sizes + stylet + bougie\n   - Suction x2 (ketamine causes hypersalivation)\n   - BVM with PEEP valve\n   - Supraglottic airway\n   - Surgical airway kit\n\n3. **Draw RSI medications:**\n   - Induction agent (etomidate, propofol, or additional ketamine)\n   - Paralytic (rocuronium 1.2 mg/kg or succinylcholine 1.5 mg/kg)\n   - **Have ready to convert to RSI at any moment**\n\n4. **Draw ketamine:** 1-1.5 mg/kg (dissociative dose)\n\n5. **Monitoring:** SpO2, waveform capnography, continuous cardiac, BP',
    citation: [1, 6],
    next: 'dsi-ketamine-dose',

    summary: 'DSI setup: position head-up, full airway equipment, draw RSI drugs as backup, draw ketamine for dissociation',
  },

  // =====================================================================
  // MODULE 3: KETAMINE SEDATION
  // =====================================================================

  {
    id: 'dsi-ketamine-dose',
    type: 'info',
    module: 3,
    title: 'Ketamine Administration',
    body: '[Ketamine Dosing](#/info/dsi-ketamine)\n\n**This is DISSOCIATIVE sedation, NOT full induction.** [1]\n\nGoal: Calm patient, spontaneous breathing, airway reflexes intact — NOT unconscious.\n\n**IV Ketamine Dosing:**\n\n| Parameter | Value |\n|-----------|-------|\n| Initial dose | **1.0-1.5 mg/kg IV** |\n| Administration | **SLOW push over 15-30 seconds** |\n| Redose | 0.5 mg/kg IV every 5 minutes |\n| Onset | ~30 seconds |\n\n**Why SLOW push?**\nRapid IV push risks transient apnea — which defeats DSI\'s purpose. Slow push allows dissociation without respiratory depression. [4]\n\n**Target Dissociation:**\n- Patient is calm, compliant with preoxygenation\n- Still spontaneously breathing\n- Still protecting airway (gag/cough intact)\n- Nystagmus present (sign of dissociation)\n\n**IM Ketamine (if no IV):** 4-6 mg/kg IM — onset 5-10 min, not preferred',
    citation: [1, 4, 6],
    next: 'dsi-ketamine-give',

    summary: 'Ketamine 1-1.5 mg/kg IV SLOW PUSH over 15-30 sec — goal is dissociation with spontaneous breathing, not unconsciousness',
  },

  {
    id: 'dsi-ketamine-give',
    type: 'question',
    module: 3,
    title: 'Administer Ketamine',
    body: '**Give ketamine 1-1.5 mg/kg IV slow push over 15-30 seconds.**\n\n**Monitor for dissociation (30-60 seconds):**\n- Patient becomes calm\n- Stops fighting oxygen delivery\n- Nystagmus appears\n- Still breathing spontaneously\n- May have subtle purposeful movements\n\n**If not adequately dissociated:**\n- Wait 60-90 seconds before redosing\n- Redose: 0.5 mg/kg IV\n- Repeat until dissociation achieved\n\n**Side effects to anticipate:**\n- Hypersalivation (have suction ready)\n- Transient hypertension/tachycardia (expected)\n- Emergence reactions (post-procedure, benzos if needed)\n\nIs patient adequately dissociated?',
    citation: [1, 4],
    options: [
      {
        label: 'Yes — Dissociated, spontaneously breathing',
        description: 'Proceed to preoxygenation',
        next: 'dsi-preox-technique',
      },
      {
        label: 'No — Still combative/agitated',
        description: 'Redose ketamine 0.5 mg/kg',
        next: 'dsi-ketamine-redose',
      },
      {
        label: 'Apneic — Patient stopped breathing',
        description: 'Immediate BVM, convert to RSI',
        next: 'dsi-apnea-response',
      },
    ],

    summary: 'Give ketamine, wait 30-60 sec for dissociation — look for calm patient with nystagmus, still breathing',
  },

  {
    id: 'dsi-ketamine-redose',
    type: 'info',
    module: 3,
    title: 'Ketamine Redose',
    body: '**Redose: Ketamine 0.5 mg/kg IV slow push**\n\nPatient not yet adequately dissociated.\n\n**Redosing Protocol:**\n- Wait at least 60-90 seconds between doses\n- Ketamine effect peaks at ~30 seconds IV\n- Give 0.5 mg/kg increments\n- Repeat until true dissociation achieved\n\n**Signs of adequate dissociation:**\n- Calm, not fighting\n- Tolerating oxygen delivery\n- Nystagmus present\n- Spontaneous breathing continues\n\n**Max total dose:** Generally 3-4 mg/kg total is safe for dissociation\n\n**If still combative after 3-4 mg/kg:**\n- Consider conversion to RSI\n- Ketamine resistance is rare but possible',
    citation: [1, 4],
    next: 'dsi-ketamine-give',

    summary: 'Ketamine redose 0.5 mg/kg IV — wait 60-90 sec between doses, repeat until dissociation achieved',
  },

  {
    id: 'dsi-apnea-response',
    type: 'info',
    module: 3,
    title: 'Apnea Response',
    body: '**Apnea After Ketamine — Immediate Response:** [4]\n\n**This is rare but reported.** Usually occurs with rapid IV push.\n\n**Immediate Actions:**\n\n1. **Begin BVM ventilation** with 100% O2 immediately\n2. **Jaw thrust / head tilt** to open airway\n3. **Suction** if secretions present\n4. **Prepare for rapid intubation**\n\n**Convert to RSI:**\n- Patient is already sedated with ketamine\n- Give paralytic (rocuronium 1.2 mg/kg or succinylcholine 1.5 mg/kg)\n- Proceed with intubation\n\n**Prevention:**\n- Always give ketamine as SLOW IV push (15-30 seconds)\n- Avoid bolus dosing\n- Have BVM at bedside before ketamine administration',
    citation: [4],
    next: 'dsi-proceed-rsi',

    summary: 'Ketamine-induced apnea: immediate BVM, convert to RSI with paralytic, proceed to intubation',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 4: PREOXYGENATION
  // =====================================================================

  {
    id: 'dsi-preox-technique',
    type: 'info',
    module: 4,
    title: 'Preoxygenation During Dissociation',
    body: '[Preoxygenation Techniques](#/info/dsi-preox)\n\n**The "Triple 15" Strategy (EMCrit):** [1][6]\n\n**Layer 1: Nasal Cannula (CONTINUOUS)**\n- 15 L/min O2 via nasal cannula\n- Keep on throughout ENTIRE procedure including paralysis\n- Only remove at moment of intubation\n\n**Layer 2: Secondary Oxygenation (based on SpO2):**\n\n| If SpO2 | Use |\n|---------|-----|\n| >95% | Non-rebreather mask 15 L/min |\n| ≤95% | BVM + PEEP valve 5-15 cm H2O |\n| ≤95% | OR CPAP/NIV 5-15 cm H2O |\n\n**PEEP is critical** — prevents alveolar collapse, improves FRC.\n\n**Preoxygenation Goals:**\n- SpO2 >95% (target 98% if possible)\n- Regular, spontaneous respirations (RR 12-20)\n- Reduced work of breathing\n- **Minimum 3 minutes** once SpO2 >95% (denitrogenation)',
    citation: [1, 6],
    next: 'dsi-preox-duration',

    summary: 'Triple 15: NC 15 L/min continuous + NRB or BVM/PEEP 15 cm H2O; maintain NC throughout entire procedure',
  },

  {
    id: 'dsi-preox-duration',
    type: 'question',
    module: 4,
    title: 'Preoxygenation Progress',
    body: '**Monitor during preoxygenation:** [1][6]\n\n- SpO2 trending toward >95%\n- Respiratory rate normalizing\n- Work of breathing decreasing\n- Patient tolerating oxygen delivery\n- Capnography confirming adequate ventilation\n\n**Duration Guidelines:**\n\n| Scenario | Preoxygenation Time |\n|----------|--------------------|\n| SpO2 >95% | Continue 3 more minutes (denitrogenation) |\n| SpO2 90-95% | Continue until >95%, then 3 more min |\n| SpO2 <90% | Maximize oxygenation, assess at 10 min |\n\n**10-Minute Rule:**\nIf SpO2 remains <95% after 10 minutes of optimal preoxygenation → consider converting to RSI.\n\nHow is preoxygenation progressing?',
    citation: [1, 6],
    options: [
      {
        label: 'SpO2 >95% achieved',
        description: 'Continue 3 min for denitrogenation, then reassess',
        next: 'dsi-reassess',
      },
      {
        label: 'SpO2 improving but <95%',
        description: 'Continue preoxygenation, reassess at 10 min',
        next: 'dsi-preox-continue',
      },
      {
        label: 'SpO2 <95% after 10 minutes',
        description: 'Consider aborting to RSI',
        next: 'dsi-abort-criteria',
      },
    ],

    summary: 'Preoxygenate until SpO2 >95%, then continue 3 more min for denitrogenation; 10-min limit for decision',
  },

  {
    id: 'dsi-preox-continue',
    type: 'info',
    module: 4,
    title: 'Continue Preoxygenation',
    body: '**SpO2 improving but not yet >95%**\n\n**Optimize:**\n- Ensure tight mask seal\n- Increase PEEP if tolerated (up to 15 cm H2O)\n- Consider repositioning (more upright)\n- Suction secretions if present\n\n**Troubleshoot:**\n- Is patient truly dissociated? (may need ketamine redose)\n- Is there mechanical obstruction? (tongue, secretions)\n- Is there underlying pathology? (pneumonia, ARDS, PE)\n\n**Timeline:**\n- Continue optimizing for up to 10 minutes total\n- If SpO2 remains <95% at 10 minutes → abort to RSI\n- Do NOT delay indefinitely — clinical deterioration risk\n\n**Decision point:** Reassess at 10 minutes from ketamine administration.',
    citation: [1],
    next: 'dsi-preox-duration',

    summary: 'Continue optimizing preoxygenation — tight seal, PEEP, positioning; 10-min limit before abort decision',
  },

  // =====================================================================
  // MODULE 5: INTUBATION DECISION
  // =====================================================================

  {
    id: 'dsi-reassess',
    type: 'question',
    module: 5,
    title: 'Reassess Need for Intubation',
    body: '[DSI Reassessment](#/info/dsi-reassess)\n\n**CRITICAL TEACHING POINT:** [1]\n\n**15-20% of DSI patients avoid intubation entirely** once sedation improves oxygenation.\n\n**Before giving paralytic, ask:**\n\n- Has respiratory status improved dramatically?\n- Is work of breathing now minimal?\n- Has underlying condition (asthma/COPD exacerbation) improved?\n- Can patient maintain this on NIV alone?\n\n**If intubation may no longer be needed:**\n- Allow ketamine to wear off (20-30 minutes)\n- Reassess mental status and work of breathing\n- May avoid intubation entirely\n\n**This is especially true for:**\n- Asthma/COPD with anxiety-driven bronchospasm\n- Agitation from hypoxia that resolved with oxygenation\n\nDoes patient still need intubation?',
    citation: [1],
    options: [
      {
        label: 'Yes — Still needs intubation',
        description: 'Proceed to paralysis and intubation',
        next: 'dsi-proceed-rsi',
      },
      {
        label: 'Maybe not — Dramatically improved',
        description: 'Allow sedation to wear off, reassess',
        next: 'dsi-avoid-intubation',
      },
    ],

    summary: '15-20% of DSI patients avoid intubation — reassess before paralysis, especially asthma/COPD with anxiety',
  },

  {
    id: 'dsi-avoid-intubation',
    type: 'result',
    module: 5,
    title: 'Intubation May Be Avoidable',
    body: 'Patient has improved dramatically with DSI — intubation may not be needed.',
    recommendation: '**Consider Avoiding Intubation**\n\n**Patient Status:**\n- SpO2 now adequate\n- Work of breathing improved\n- Underlying condition (asthma/COPD) responding to treatment\n\n**Management:**\n\n1. **Continue supportive oxygenation:**\n   - CPAP/BiPAP if tolerated\n   - High-flow nasal cannula\n   - Monitor closely\n\n2. **Allow ketamine to wear off:**\n   - Duration: 20-30 minutes\n   - Monitor for agitation returning\n\n3. **Treat underlying condition:**\n   - Bronchodilators for asthma/COPD\n   - Anxiolytics if anxiety-driven\n   - Antibiotics if infection\n\n4. **Disposition:**\n   - ICU admission for close monitoring\n   - May need intubation later if deteriorates\n\n**Document:** "DSI performed for preoxygenation. Patient improved; intubation deferred. Close ICU monitoring."',

    summary: 'Intubation avoided — continue supportive oxygenation, let ketamine wear off, treat underlying condition, ICU admission',
  },

  {
    id: 'dsi-abort-criteria',
    type: 'info',
    module: 5,
    title: 'Abort Criteria — Convert to RSI',
    body: '**Abort DSI and Proceed to RSI if:** [1]\n\n- SpO2 remains <95% after **10 minutes** of optimal preoxygenation\n- Patient develops unexpected apnea\n- Inadequate spontaneous ventilation despite ketamine\n- Equipment failure\n- Clinical instability (severe hypotension, profound bradycardia)\n- Decision made that intubation cannot be delayed any longer\n\n**Conversion Procedure:**\n\n1. RSI drugs should already be drawn and ready\n2. Patient is already on high FiO2 from DSI — better preoxygenation than baseline RSI\n3. Give paralytic immediately:\n   - Rocuronium 1.2 mg/kg IV, OR\n   - Succinylcholine 1.5 mg/kg IV\n4. Maintain nasal cannula during paralysis\n5. Proceed with intubation\n\n**Key point:** Converting from DSI to RSI still leaves patient better oxygenated than if you had done RSI from the start.',
    citation: [1],
    next: 'dsi-proceed-rsi',

    summary: 'Abort to RSI if SpO2 <95% after 10 min, apnea, instability, or cannot delay; patient is still better oxygenated than baseline RSI',
  },

  {
    id: 'dsi-proceed-rsi',
    type: 'info',
    module: 5,
    title: 'Proceed to Intubation',
    body: '[Post-DSI Intubation](#/info/dsi-intubation)\n\n**DSI Phase Complete — Proceed to Paralysis and Intubation:**\n\n**Step 1: Final checks**\n- SpO2 optimized (>95% ideally)\n- Equipment ready\n- Backup airway plan confirmed\n- Suction at hand\n\n**Step 2: Maintain apneic oxygenation**\n- **Keep nasal cannula at 15 L/min** during paralysis and laryngoscopy\n- Only remove at moment of intubation\n\n**Step 3: Administer paralytic**\n\n| Drug | Dose | Onset |\n|------|------|-------|\n| Rocuronium | 1.2 mg/kg IV | 45-60 sec |\n| Succinylcholine | 1.5 mg/kg IV | 30-45 sec |\n\n**Step 4: Wait for paralysis** (45-60 seconds)\n\n**Step 5: Laryngoscopy and intubation**\n- Use video laryngoscopy\n- First-pass success is goal\n\n**Step 6: Confirm placement**\n- Waveform capnography (ETCO2 35-45 mmHg)\n- Bilateral breath sounds\n- Chest rise',
    citation: [1, 6],
    next: 'dsi-post-intubation',

    summary: 'Proceed to intubation: keep NC during paralysis, rocuronium 1.2 mg/kg or succinylcholine 1.5 mg/kg, confirm with capnography',
  },

  {
    id: 'dsi-post-intubation',
    type: 'result',
    module: 5,
    title: 'Post-Intubation Care',
    body: 'Intubation complete — proceed to post-intubation management.',
    recommendation: '**Post-DSI Intubation Checklist:**\n\n**Confirm Placement:**\n- Waveform capnography (ETCO2 35-45 mmHg)\n- Bilateral breath sounds\n- Chest X-ray ordered\n\n**Secure ETT:**\n- Note depth at teeth (typically 21-23 cm adults)\n- Secure with tape or commercial holder\n\n**Post-Intubation Sedation:**\n- Ketamine is wearing off — start continuous sedation\n- Propofol infusion 25-50 mcg/kg/min, OR\n- Fentanyl 1-2 mcg/kg/hr + midazolam 0.02-0.1 mg/kg/hr\n- Consider ketamine infusion 0.1-0.5 mg/kg/hr\n\n**Ventilator Settings:**\n- Lung-protective ventilation (6-8 mL/kg IBW)\n- PEEP 5-10 cm H2O\n- FiO2 to maintain SpO2 92-96%\n\n**Disposition:**\n- ICU admission\n- Arterial line for hemodynamic monitoring\n- Serial ABGs\n\n**Documentation:**\n- DSI technique used\n- Ketamine dose\n- Pre/post SpO2 values\n- Intubation details (view, device, tube size, depth)',

    summary: 'Post-intubation: confirm with capnography, start continuous sedation (ketamine wearing off), ventilator settings, ICU',
  },
];

// =====================================================================
// MODULE LABELS
// =====================================================================

export const DELAYED_SEQUENCE_INTUBATION_MODULE_LABELS = [
  'DSI Overview',
  'Contraindications',
  'Ketamine Sedation',
  'Preoxygenation',
  'Intubation Decision',
];

// =====================================================================
// CITATIONS
// =====================================================================

export const DELAYED_SEQUENCE_INTUBATION_CITATIONS: Citation[] = [
  { num: 1, text: 'Weingart SD, et al. Delayed sequence intubation: a prospective observational study. Ann Emerg Med. 2015;65(4):349-355. https://emcrit.org/dsi/' },
  { num: 2, text: 'Weingart SD. EMCrit Episode 366: DSI for All - Delayed Sequence Intubation. EMCrit.org. 2023.' },
  { num: 3, text: 'DSI vs RSI in Trauma Patients RCT. Canadian Journal of Emergency Medicine. 2023. DOI: 10.1007/s43678-024-00730-3' },
  { num: 4, text: 'Merelman AH, et al. Apnea after low-dose ketamine during delayed sequence intubation. Am J Emerg Med. 2016;34(11):2228.e1-2228.e2.' },
  { num: 5, text: 'Weingart SD. Alternatives to RSI: Contemporary airway management with ketamine. West J Emerg Med. 2019.' },
  { num: 6, text: 'Weingart SD. EMCrit Episode 137: DSI Update - Delayed Sequence Intubation. EMCrit.org. 2019.' },
  { num: 7, text: 'LITFL: Delayed Sequence Intubation. Life in the Fast Lane. https://litfl.com/delayed-sequence-intubation-dsi/' },
];
