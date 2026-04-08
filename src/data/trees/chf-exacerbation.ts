// MedKitt — CHF Exacerbation (Acute Decompensated Heart Failure)
// Sources: EMCRIT SCAPE, EB Medicine, UpToDate, ACC/AHA Guidelines
// 6 modules: Initial Assessment → SCAPE Protocol → Diuretic Strategy → Vasodilator/Inotrope → Renal Dysfunction → Disposition
// ~35 nodes total

import type { DecisionNode } from '../../models/types.js';

export interface Citation {
  num: number;
  text: string;
}

export const CHF_EXACERBATION_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'chf-start',
    type: 'info',
    module: 1,
    title: 'CHF Exacerbation: Initial Assessment',
    body: '**Acute Decompensated Heart Failure (ADHF)** — rapid onset of signs/symptoms requiring urgent treatment.\n\n**Key Question:** Is this **SCAPE** (Sympathetic Crashing Acute Pulmonary Edema) or **FOPE** (Fluid Overload Pulmonary Edema)?\n\n| Feature | SCAPE | FOPE |\n|---------|-------|------|\n| Onset | Minutes to hours | Days to weeks |\n| SBP | Often >180 | Variable |\n| Volume status | Euvolemic or dry | True volume overload |\n| Edema | Minimal | Significant |\n| Primary treatment | NTG + BiPAP | Diuretics |\n\n**Common precipitants:**\n- Medication non-adherence (diuretics, ACE-I)\n- ACS / new ischemia\n- Uncontrolled hypertension\n- Arrhythmia (new A-Fib)\n- Infection / sepsis\n- Renal dysfunction\n\nAlways identify and treat the precipitant. [1][2]',
    images: [{ src: 'images/chf-exacerbation/pulmonary-edema-cxr.jpg', alt: 'AP chest X-ray showing acute pulmonary edema with cardiomegaly, bilateral pleural effusions, and vascular redistribution', caption: 'Acute cardiogenic pulmonary edema — cardiomegaly, vascular redistribution, bilateral pleural effusions. (CC BY-SA 3.0, James Heilman MD)' }],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'chf-ehmrg', label: 'EHMRG 7-Day Mortality' },
    ],
    next: 'chf-scape-screen',
  },

  {
    id: 'chf-scape-screen',
    type: 'question',
    module: 1,
    title: 'Is This SCAPE?',
    body: '**SCAPE = Sympathetic Crashing Acute Pulmonary Edema**\n\nNOT volume overload — it\'s a vicious sympathetic spiral:\n- Sympathetic surge → vasoconstriction → massive afterload\n- High afterload → LV can\'t eject → acute backward failure\n- Pulmonary edema → hypoxia → MORE sympathetic surge\n\n**SCAPE Criteria (any 2+):**\n- Acute onset (minutes to hours)\n- SBP >160 mmHg\n- Diaphoretic, restless, severe dyspnea\n- Minimal peripheral edema\n- Pink frothy sputum\n- No recent weight gain\n\n**Is this SCAPE?**',
    citation: [1, 3],
    options: [
      {
        label: 'Yes — SCAPE',
        description: 'Acute onset, hypertensive, minimal edema',
        next: 'chf-scape-treatment',
        urgency: 'critical',
      },
      {
        label: 'No — Volume Overload (FOPE)',
        description: 'Gradual onset, weight gain, peripheral edema',
        next: 'chf-hemodynamic',
      },
      {
        label: 'Hypotensive (SBP <90)',
        description: 'Cardiogenic shock presentation',
        next: 'chf-cardiogenic-shock',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: SCAPE PROTOCOL
  // =====================================================================

  {
    id: 'chf-scape-treatment',
    type: 'info',
    module: 2,
    title: 'SCAPE: Immediate Treatment',
    body: '**SCAPE is NOT volume overload.** The problem is fluid redistribution into lungs from massive afterload. Treatment = break the sympathetic spiral.\n\n**Simultaneous actions (do ALL at once):**\n\n**1. BiPAP/CPAP — Immediate**\n- Start CPAP 8-10 cm H₂O OR BiPAP 12/6\n- Titrate UP aggressively: goal CPAP 15-20 or BiPAP 20-24/10-12\n- Higher pressures = greater hemodynamic benefit\n- Reduces preload AND afterload\n\n**2. High-Dose Nitroglycerin — Aggressive**\n- [See NTG Protocol](#/info/chf-ntg-protocol)\n- Bolus: 400-800 mcg/min x 2-2.5 min (OR 1000-2000 mcg IV bolus)\n- Then infusion: start 100-200 mcg/min, titrate to 400+ mcg/min\n- Goal: SBP <140 within 10 minutes\n\n**By 10 minutes, patient should be "out of the water."** [1][3]',
    citation: [1, 3],
    calculatorLinks: [
      { id: 'chf-ntg-calc', label: 'SCAPE NTG Calculator' },
      { id: 'chf-bipap', label: 'BiPAP Quick Start' },
    ],
    treatment: {
      firstLine: {
        drug: 'Nitroglycerin',
        dose: '400-800 mcg/min x 2-2.5 min bolus, then 100-200 mcg/min infusion',
        route: 'IV',
        frequency: 'Continuous infusion',
        duration: 'Until SBP <140 and symptoms improve',
        notes: 'Titrate to 400+ mcg/min as needed. No ceiling dose in SCAPE. Goal SBP <140 within 10 minutes.',
      },
      alternative: {
        drug: 'BiPAP',
        dose: 'Start 12/6, titrate to 20-24/10-12',
        route: 'Non-invasive ventilation',
        frequency: 'Continuous',
        duration: 'Until work of breathing improves',
        notes: 'Use simultaneously with NTG. Higher pressures = greater hemodynamic benefit.',
      },
      monitoring: 'BP every 2-5 min during titration. SpO2, respiratory effort, mental status. Watch for hypotension as SCAPE breaks.',
    },
    next: 'chf-scape-avoid',
  },

  {
    id: 'chf-scape-avoid',
    type: 'info',
    module: 2,
    title: 'SCAPE: What to AVOID',
    body: '**Critical: These can HARM your SCAPE patient:**\n\n| Agent | Why Harmful |\n|-------|-------------|\n| **Beta-blockers** | Impair pump function — absolutely contraindicated |\n| **Morphine** | MIMO trial stopped early for harm — increased cardiac arrest and shock |\n| **Routine diuretics** | Only if TRUE volume overload. Many SCAPE patients are intravascularly depleted |\n\n**When to give diuretics in SCAPE:**\n- Only AFTER vasodilator therapy working\n- Only if evidence of true volume overload (weight gain, weeks of edema)\n- Use low dose initially (20-40 mg furosemide)\n\n**Intubation:**\n- AVOID if possible — these patients often turn around dramatically\n- BiPAP buys time for NTG to work\n- If must intubate: ketamine > propofol (less hypotension) [1][3]',
    citation: [1, 3],
    next: 'chf-scape-response',
  },

  {
    id: 'chf-scape-response',
    type: 'question',
    module: 2,
    title: 'SCAPE Response Assessment',
    body: '**Assess at 10-15 minutes:**\n\n**Good response:**\n- SBP dropping toward 140\n- Respiratory effort improving\n- Less diaphoretic\n- SpO₂ improving on BiPAP\n- Patient less agitated\n\n**Poor response:**\n- SBP still >180\n- No improvement in work of breathing\n- Worsening hypoxia despite BiPAP\n- Altered mental status\n\n**Flash = fast both ways** — rapid deterioration but also rapid improvement with correct treatment.\n\nWhat is the response?',
    citation: [1, 3],
    options: [
      {
        label: 'Good Response',
        description: 'BP improving, respiratory status better',
        next: 'chf-scape-continue',
      },
      {
        label: 'Partial Response',
        description: 'Some improvement but still hypertensive/distressed',
        next: 'chf-scape-escalate',
        urgency: 'urgent',
      },
      {
        label: 'No Response / Deteriorating',
        description: 'Refractory to NTG + BiPAP',
        next: 'chf-scape-refractory',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'chf-scape-continue',
    type: 'info',
    module: 2,
    title: 'SCAPE: Continue Treatment',
    body: '**Patient responding — continue current therapy:**\n\n- Maintain NTG infusion at effective rate\n- Keep BiPAP at current settings\n- Monitor BP closely — when SCAPE breaks, BP can crash\n- Reduce NTG rate sharply as BP normalizes\n\n**Transition plan:**\n- Wean BiPAP as tolerated → high-flow NC → regular NC\n- Transition NTG drip to oral/patch as stabilizes\n- NOW can consider gentle diuresis if volume overloaded\n- Address precipitant (ACS workup, arrhythmia, etc.)\n\n**Disposition:** ICU admission for NTG drip monitoring. [1]',
    citation: [1],
    next: 'chf-disposition',
  },

  {
    id: 'chf-scape-escalate',
    type: 'info',
    module: 2,
    title: 'SCAPE: Escalate Therapy',
    body: '**Partial response — escalate:**\n\n**1. Increase NTG further:**\n- Push to 400-800 mcg/min if BP allows\n- No ceiling dose in SCAPE\n\n**2. BiPAP settings:**\n- Increase to BiPAP 24/20 if tolerated\n- Patient compliance key — may need sedation\n\n**3. Add second vasodilator:**\n- [Clevidipine](#/drug/clevidipine/chf) — calcium channel blocker, very titratable\n- [Nicardipine](#/drug/nicardipine/chf) — alternative IV CCB\n- [Enalaprilat](#/drug/enalaprilat/chf) — if normal renal function\n\n**4. Consider nitroprusside:**\n- Guideline-recommended alternative\n- Risk: cyanide toxicity with prolonged use\n- Requires arterial line monitoring [1][3]',
    citation: [1, 3],
    treatment: {
      firstLine: {
        drug: 'Nitroglycerin (escalated)',
        dose: '400-800 mcg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until SBP <140 and symptoms improve',
        notes: 'No ceiling dose in SCAPE. Push aggressively if BP allows.',
      },
      alternative: {
        drug: 'Clevidipine OR Nicardipine',
        dose: 'Clevidipine 1-2 mg/hr (max 32 mg/hr) OR Nicardipine 5-15 mg/hr',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until BP controlled',
        notes: 'Add as second vasodilator. Clevidipine very titratable (1-2 min onset). Enalaprilat 0.625-1.25 mg IV if normal renal function.',
      },
      monitoring: 'Arterial line preferred. BP q2-5 min during titration. Watch for precipitous hypotension. ECG monitoring.',
    },
    next: 'chf-scape-response',
  },

  {
    id: 'chf-scape-refractory',
    type: 'info',
    module: 2,
    title: 'SCAPE: Refractory — Prepare for Intubation',
    body: '**Refractory SCAPE — patient failing BiPAP + high-dose NTG:**\n\n**Before intubation:**\n- Push NTG to maximum (800+ mcg/min)\n- Ensure BiPAP settings maximized\n- Rule out pneumothorax, PE, tamponade\n\n**If must intubate:**\n- **Ketamine** preferred induction (less hypotension)\n- Avoid propofol (profound hypotension)\n- Have vasopressor ready (norepinephrine)\n- Post-intubation: continue aggressive vasodilation\n\n**Consider:**\n- Emergent cardiology consult\n- ECMO evaluation if available\n- Mechanical circulatory support\n\n**This is now cardiogenic shock territory.** [1][3]',
    citation: [1, 3],
    treatment: {
      firstLine: {
        drug: 'Ketamine (for RSI)',
        dose: '1-2 mg/kg IV',
        route: 'IV push',
        frequency: 'Once for induction',
        duration: 'Single dose',
        notes: 'Preferred induction agent in SCAPE - maintains BP. AVOID propofol (profound hypotension).',
      },
      alternative: {
        drug: 'Norepinephrine (push-dose)',
        dose: '10-20 mcg IV push',
        route: 'IV push',
        frequency: 'PRN for peri-intubation hypotension',
        duration: 'As needed',
        notes: 'Have ready before intubation. May need infusion post-intubation. Continue NTG despite low BP if possible.',
      },
      monitoring: 'Continuous BP, SpO2, ETCO2. Post-intubation: continue aggressive vasodilation, monitor for post-intubation hypotension.',
    },
    next: 'chf-cardiogenic-shock',
  },

  // =====================================================================
  // MODULE 3: STANDARD CHF (FOPE) — DIURETIC STRATEGY
  // =====================================================================

  {
    id: 'chf-hemodynamic',
    type: 'question',
    module: 3,
    title: 'Hemodynamic Profile — Warm/Cold + Wet/Dry',
    body: '**Assess perfusion (warm vs cold) and congestion (wet vs dry):**\n\n| Profile | Perfusion | Congestion | Treatment |\n|---------|-----------|------------|------------|\n| Warm & Wet | Good | Yes | Diuretics first |\n| Cold & Wet | Poor | Yes | Inotropes + careful diuretics |\n| Cold & Dry | Poor | No | Fluids + inotropes |\n| Warm & Dry | Good | No | Not acute CHF |\n\n**Signs of poor perfusion (COLD):**\n- Cool extremities\n- Narrow pulse pressure\n- Altered mental status\n- Oliguria\n- Rising lactate\n\n**Signs of congestion (WET):**\n- Orthopnea, PND\n- JVD, hepatojugular reflux\n- Peripheral edema\n- Pulmonary crackles\n\nWhat is the hemodynamic profile?',
    citation: [1, 2],
    options: [
      {
        label: 'Warm & Wet',
        description: 'Good perfusion + congestion — most common',
        next: 'chf-diuretic-strategy',
      },
      {
        label: 'Cold & Wet',
        description: 'Poor perfusion + congestion',
        next: 'chf-cardiogenic-shock',
        urgency: 'critical',
      },
      {
        label: 'Cold & Dry',
        description: 'Poor perfusion, no congestion — rare',
        next: 'chf-cold-dry',
        urgency: 'critical',
      },
      {
        label: 'Warm & Dry',
        description: 'Not acute decompensation',
        next: 'chf-warm-dry',
      },
    ],
  },

  {
    id: 'chf-warm-dry',
    type: 'result',
    module: 3,
    title: 'Warm & Dry — No Acute Decompensation',
    body: 'Patient is euvolemic with adequate perfusion — this is NOT acute CHF exacerbation.\n\n**Possible scenarios:**\n- Chronic stable CHF presenting for other reason\n- Symptoms resolved prior to ED arrival\n- Alternative diagnosis (COPD, anxiety, anemia)\n\n**Management:**\n- Outpatient optimization of CHF medications\n- Cardiology follow-up if not recent\n- Address actual presenting complaint\n- Daily weight monitoring education',
    recommendation: 'Outpatient management. Ensure CHF medications optimized. Cardiology follow-up.',
    confidence: 'recommended',
    citation: [1],
  },

  {
    id: 'chf-cold-dry',
    type: 'info',
    module: 3,
    title: 'Cold & Dry — Pure Cardiogenic Shock',
    body: '**Rare presentation:** Poor perfusion WITHOUT congestion.\n\n**Suggests:**\n- Acute MI with cardiogenic shock\n- Fulminant myocarditis\n- Acute valve pathology\n- End-stage cardiomyopathy\n\n**Management:**\n- **DO NOT give diuretics** — patient is hypovolemic\n- Cautious IV fluids (250-500 mL boluses)\n- Inotropic support (dobutamine, milrinone)\n- Vasopressor if SBP <80 (norepinephrine)\n- Emergent cardiology + ICU\n- ECMO evaluation',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Crystalloid (cautious)',
        dose: '250-500 mL bolus',
        route: 'IV',
        frequency: 'Reassess after each bolus',
        duration: 'Until perfusion improves or signs of congestion develop',
        notes: 'Patient is hypovolemic. DO NOT give diuretics. Reassess frequently for fluid responsiveness.',
      },
      alternative: {
        drug: 'Dobutamine',
        dose: '2.5-20 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until hemodynamics stabilize',
        notes: 'Add inotrope after initial fluid resuscitation. Norepinephrine if SBP <80.',
      },
      monitoring: 'Continuous telemetry, BP q5 min, reassess volume status after each fluid bolus. Emergent cardiology consult. Consider ECMO evaluation.',
    },
    next: 'chf-cardiogenic-shock',
  },

  {
    id: 'chf-diuretic-strategy',
    type: 'info',
    module: 3,
    title: 'Diuretic Strategy — Warm & Wet',
    body: '**Goal:** Reduce intravascular volume, relieve congestion.\n\n**IV Loop Diuretic (Furosemide):**\n- **Dose:** 1-2.5x home oral dose IV\n- If no home diuretic: start 40-80 mg IV\n- If home dose >80 mg: give 1-2x as IV\n\n**Monitoring targets:**\n- Urine output: >100-150 mL/hr by 6 hours\n- Urine spot sodium: >50-70 mEq/L at 2 hours\n- Daily weight loss: 0.5-1 kg/day\n\n**Bolus vs Infusion:**\n- DOSE trial: no significant difference\n- Bolus q8-12h often sufficient\n- Infusion (5-10 mg/hr) if high-dose needed\n\n**Adjunctive vasodilator:**\n- Add NTG if SBP >100 for faster symptom relief\n- Reduces preload, speeds diuresis [2][4]',
    citation: [2, 4],
    calculatorLinks: [
      { id: 'chf-lasix-calc', label: 'Lasix Dose Calculator' },
    ],
    treatment: {
      firstLine: {
        drug: 'Furosemide',
        dose: '40-80 mg IV (or 1-2.5x home oral dose)',
        route: 'IV',
        frequency: 'q8-12h bolus OR 5-10 mg/hr infusion',
        duration: 'Until euvolemic (target -0.5 to -1 kg/day)',
        notes: 'If home dose >80 mg PO, give 1-2x as IV. Monitor urine output target >100-150 mL/hr.',
      },
      alternative: {
        drug: 'Bumetanide',
        dose: '1-2 mg IV (40:1 furosemide:bumetanide)',
        route: 'IV',
        frequency: 'q8-12h',
        duration: 'Until euvolemic',
        notes: 'Alternative loop diuretic. Better bioavailability than furosemide.',
      },
      monitoring: 'Urine output q1-2h, daily weights, electrolytes (K+, Mg++) q12-24h, creatinine daily. Spot urine Na >50-70 mEq/L at 2h indicates adequate response.',
    },
    next: 'chf-diuretic-response',
  },

  {
    id: 'chf-diuretic-response',
    type: 'question',
    module: 3,
    title: 'Diuretic Response Assessment',
    body: '**Assess at 4-6 hours:**\n\n**Good response:**\n- Urine output >150 mL/hr\n- Symptoms improving\n- Creatinine stable\n\n**Partial response:**\n- Urine output 50-150 mL/hr\n- Slow symptom improvement\n\n**Poor response (Diuretic Resistance):**\n- Urine output <50 mL/hr\n- Symptoms not improving\n- Rising creatinine\n\nWhat is the response?',
    citation: [2],
    options: [
      {
        label: 'Good Response',
        description: 'Good urine output, symptoms improving',
        next: 'chf-continue-diuretic',
      },
      {
        label: 'Partial Response',
        description: 'Slow improvement',
        next: 'chf-escalate-diuretic',
      },
      {
        label: 'Diuretic Resistance',
        description: 'Poor urine output despite adequate dosing',
        next: 'chf-diuretic-resistance',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'chf-continue-diuretic',
    type: 'info',
    module: 3,
    title: 'Continue Diuretic Therapy',
    body: '**Patient responding — continue current regimen:**\n\n- Continue IV loop diuretic until euvolemic\n- Monitor daily weights (goal -0.5 to -1 kg/day)\n- Check electrolytes q12-24h (K+, Mg++)\n- Track creatinine (transient rise acceptable)\n\n**Transition to oral:**\n- Once euvolemic, switch to PO\n- Discharge dose = dose that achieved euvolemia\n- Often higher than pre-admission dose\n\n**Add guideline-directed medical therapy (GDMT):**\n- ACE-I/ARB/ARNI\n- Beta-blocker (once euvolemic)\n- MRA (spironolactone)\n- SGLT2i (dapagliflozin, empagliflozin)',
    citation: [1, 2],
    next: 'chf-renal-assessment',
  },

  {
    id: 'chf-escalate-diuretic',
    type: 'info',
    module: 3,
    title: 'Escalate Diuretic Therapy',
    body: '**Partial response — escalate:**\n\n**Option 1: Increase dose**\n- Double the IV furosemide dose\n- Repeat q2-4h until response\n\n**Option 2: Switch to infusion**\n- Furosemide 5-10 mg/hr continuous\n- Better control, less peaks/troughs\n\n**Option 3: Add thiazide (sequential nephron blockade)**\n- [Metolazone](#/drug/metolazone/chf) 2.5-5 mg PO\n- Give 30 min BEFORE loop diuretic\n- Synergistic effect on different nephron segments\n- Watch closely for hypotension, hypokalemia\n\n**Option 4: Add low-dose NTG**\n- 10-20 mcg/min if SBP >100\n- Improves renal perfusion, augments diuresis [2]',
    citation: [2],
    treatment: {
      firstLine: {
        drug: 'Furosemide (escalated)',
        dose: 'Double previous dose OR 5-10 mg/hr infusion',
        route: 'IV',
        frequency: 'q2-4h bolus OR continuous infusion',
        duration: 'Until adequate diuresis achieved',
        notes: 'Infusion provides better control with less peak/trough variation.',
      },
      alternative: {
        drug: 'Metolazone',
        dose: '2.5-5 mg PO',
        route: 'PO',
        frequency: 'Once daily, 30 min BEFORE loop diuretic',
        duration: 'PRN for diuretic resistance',
        notes: 'Sequential nephron blockade. Synergistic with loop diuretics. Watch for hypotension and hypokalemia.',
      },
      monitoring: 'Urine output, BP q1h, K+ and Mg++ q8-12h (higher frequency with metolazone). Creatinine daily.',
    },
    next: 'chf-diuretic-response',
  },

  {
    id: 'chf-diuretic-resistance',
    type: 'info',
    module: 3,
    title: 'Diuretic Resistance',
    body: '**Definition:** Inadequate diuresis despite adequate loop diuretic dosing.\n\n**Causes:**\n- Cardiorenal syndrome (poor renal perfusion)\n- Hypoalbuminemia (drug binding)\n- NSAID use\n- Excessive sodium intake\n- True renal failure\n\n**Management stepwise:**\n\n1. **Verify dose adequate** — may need very high doses (160-200 mg furosemide)\n\n2. **Add thiazide** — metolazone 2.5-10 mg PO before loop diuretic\n\n3. **Optimize perfusion:**\n   - Vasodilator if SBP >100\n   - Low-dose inotrope (dobutamine 2.5-5 mcg/kg/min)\n\n4. **Consider ultrafiltration:**\n   - Mechanical fluid removal\n   - Reserved for refractory cases\n   - Requires nephrology consult\n\n5. **Albumin infusion:**\n   - If albumin <2.5, may improve diuretic delivery\n   - 25g albumin + loop diuretic [2][4]',
    citation: [2, 4],
    treatment: {
      firstLine: {
        drug: 'Furosemide (high-dose)',
        dose: '160-200 mg IV',
        route: 'IV',
        frequency: 'q6-8h bolus OR 20-40 mg/hr infusion',
        duration: 'Until diuresis achieved or ultrafiltration initiated',
        notes: 'May need very high doses in diuretic resistance. No ceiling dose.',
      },
      alternative: {
        drug: 'Metolazone + Furosemide + Albumin',
        dose: 'Metolazone 2.5-10 mg PO + Albumin 25g IV + Furosemide',
        route: 'PO/IV',
        frequency: 'Metolazone 30 min before loop diuretic. Albumin once.',
        duration: 'PRN for diuretic resistance',
        notes: 'Sequential nephron blockade with albumin to improve diuretic delivery if albumin <2.5 g/dL.',
      },
      monitoring: 'Strict I/Os, daily weights, electrolytes q8h, creatinine q12-24h. Consider nephrology for ultrafiltration if refractory.',
    },
    next: 'chf-renal-assessment',
  },

  // =====================================================================
  // MODULE 4: CARDIOGENIC SHOCK
  // =====================================================================

  {
    id: 'chf-cardiogenic-shock',
    type: 'question',
    module: 4,
    title: 'Cardiogenic Shock Management',
    body: '**Cold & Wet = cardiogenic shock + congestion**\n\n**Immediate actions:**\n- IV access, cardiac monitor, labs (lactate, troponin, BNP)\n- Arterial line if available\n- Gentle or no diuretics (worsen hypotension)\n- Low-dose vasodilator only if SBP >90\n\n**Inotrope selection:**\n\n| Agent | SBP | Mechanism |\n|-------|-----|------------|\n| Dobutamine | 80-100 | Beta-1 inotrope, mild vasodilation |\n| Milrinone | 80-100 | PDE-3 inhibitor, inotrope + vasodilator |\n| Dopamine | <80 | Dose-dependent: low=renal, med=inotrope, high=pressor |\n| Norepinephrine | <80 | Pure vasopressor + mild inotrope |\n\nSelect based on BP:',
    citation: [1, 2],
    options: [
      {
        label: 'SBP 80-100 — Start Dobutamine',
        description: 'First-line inotrope for cardiogenic shock',
        next: 'chf-dobutamine',
        urgency: 'critical',
      },
      {
        label: 'SBP <80 — Vasopressor + Inotrope',
        description: 'Profound shock, need BP support first',
        next: 'chf-vasopressor',
        urgency: 'critical',
      },
      {
        label: 'Milrinone Preferred',
        description: 'Diastolic dysfunction, HFpEF, or beta-blocker toxicity',
        next: 'chf-milrinone',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'chf-dobutamine',
    type: 'info',
    module: 4,
    title: 'Dobutamine for Cardiogenic Shock',
    body: '**[Dobutamine](#/drug/dobutamine/cardiogenic-shock)**\n\n**Dosing:** 2.5-20 mcg/kg/min IV infusion\n\n**Mechanism:**\n- Beta-1: increased contractility, increased HR\n- Beta-2: mild vasodilation (reduces afterload)\n- Result: improved cardiac output\n\n**Monitoring:**\n- Target SBP >90\n- Watch HR (tachycardia common)\n- Lactate trend (should improve)\n- Urine output (should increase)\n- ECG for arrhythmias\n\n**Advantages:** Improves contractility + reduces afterload\n**Disadvantages:** Tachycardia, arrhythmia risk, increases O2 demand\n\n**Once SBP >100:** Can add low-dose NTG for afterload reduction [1][2]',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Dobutamine',
        dose: '2.5-20 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until hemodynamics stabilize and can wean',
        notes: 'Start 2.5-5 mcg/kg/min, titrate to effect. Beta-1 agonist with mild beta-2 vasodilation.',
      },
      alternative: {
        drug: 'Milrinone',
        dose: '0.25-0.75 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until hemodynamics stabilize',
        notes: 'Preferred in HFpEF, beta-blocker toxicity, or pulmonary HTN. No loading dose in shock.',
      },
      monitoring: 'Continuous telemetry, BP q5-15 min during titration, HR (tachycardia common), lactate q2-4h, urine output hourly, ECG for arrhythmias.',
    },
    next: 'chf-shock-response',
  },

  {
    id: 'chf-milrinone',
    type: 'info',
    module: 4,
    title: 'Milrinone for Cardiogenic Shock',
    body: '**[Milrinone](#/drug/milrinone/cardiogenic-shock)**\n\n**Dosing:** 0.25-0.75 mcg/kg/min IV (no loading dose in shock)\n\n**Mechanism:**\n- PDE-3 inhibitor → increases cAMP\n- Positive inotropy + lusitropy (improved relaxation)\n- Systemic + pulmonary vasodilation\n\n**Best for:**\n- Diastolic dysfunction / HFpEF\n- Beta-blocker toxicity (works independent of beta receptors)\n- Pulmonary hypertension\n- Right heart failure\n\n**Monitoring:**\n- Hypotension common (vasodilation)\n- May need concurrent vasopressor\n- Less tachycardia than dobutamine\n\n**Caution:** Long half-life (2-3 hrs) — effects persist after stopping [1][2]',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Milrinone',
        dose: '0.25-0.75 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until hemodynamics stabilize and can wean',
        notes: 'NO loading dose in cardiogenic shock. PDE-3 inhibitor, works independent of beta receptors. Long half-life (2-3 hrs).',
      },
      alternative: {
        drug: 'Dobutamine',
        dose: '2.5-20 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until hemodynamics stabilize',
        notes: 'Use if milrinone causes excessive hypotension. Shorter half-life, more titratable.',
      },
      monitoring: 'Continuous telemetry, BP q5-15 min (hypotension common), may need concurrent vasopressor. Less tachycardia than dobutamine. Monitor for arrhythmias.',
    },
    next: 'chf-shock-response',
  },

  {
    id: 'chf-vasopressor',
    type: 'info',
    module: 4,
    title: 'Profound Shock — Vasopressor First',
    body: '**SBP <80 — need BP support before inotrope can work**\n\n**[Norepinephrine](#/drug/norepinephrine/cardiogenic-shock)**\n- Start 0.1-0.5 mcg/kg/min\n- Strong alpha (vasoconstriction) + beta-1 (mild inotropy)\n- First-line vasopressor in cardiogenic shock\n\n**[Dopamine](#/drug/dopamine/cardiogenic-shock)**\n- 5-20 mcg/kg/min for combined inotrope + pressor\n- Higher doses = more alpha effect\n- More arrhythmias than norepinephrine\n\n**Once SBP >80:**\n- Add dobutamine or milrinone for inotropic support\n- Goal: wean vasopressor as cardiac output improves\n\n**Consider ECMO/mechanical support if:**\n- Refractory to 2+ vasopressors/inotropes\n- Lactate rising despite treatment\n- Transfer to ECMO center [1][2]',
    citation: [1, 2],
    treatment: {
      firstLine: {
        drug: 'Norepinephrine',
        dose: '0.1-0.5 mcg/kg/min',
        route: 'IV infusion (central line preferred)',
        frequency: 'Continuous',
        duration: 'Until SBP >80, then add inotrope and wean',
        notes: 'First-line vasopressor in cardiogenic shock. Strong alpha + mild beta-1 effect.',
      },
      alternative: {
        drug: 'Dopamine',
        dose: '5-20 mcg/kg/min',
        route: 'IV infusion',
        frequency: 'Continuous',
        duration: 'Until hemodynamics stabilize',
        notes: 'Combined inotrope + pressor. Higher doses = more alpha effect. More arrhythmias than norepinephrine.',
      },
      monitoring: 'Continuous arterial line BP, telemetry, lactate q2h, urine output hourly. Goal SBP >80 then add inotrope.',
    },
    next: 'chf-shock-response',
  },

  {
    id: 'chf-shock-response',
    type: 'question',
    module: 4,
    title: 'Shock Response Assessment',
    body: '**Assess at 30-60 minutes:**\n\n**Improving:**\n- SBP >90\n- Urine output increasing\n- Lactate declining\n- Mental status improving\n- Extremities warming\n\n**Not improving:**\n- SBP still <90 despite inotrope\n- Lactate rising\n- Worsening end-organ function\n\nWhat is the response?',
    citation: [1],
    options: [
      {
        label: 'Improving',
        description: 'BP stable, perfusion improving',
        next: 'chf-renal-assessment',
      },
      {
        label: 'Not Improving',
        description: 'Refractory shock',
        next: 'chf-mechanical-support',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'chf-mechanical-support',
    type: 'info',
    module: 4,
    title: 'Mechanical Circulatory Support',
    body: '**Refractory cardiogenic shock — consider mechanical support:**\n\n**Options:**\n- **VA-ECMO:** Full cardiac + pulmonary support. Rapid deployment.\n- **IABP:** Reduces afterload, improves coronary perfusion. Temporizing.\n- **Impella:** Percutaneous LVAD. Unloads LV.\n- **Ultrafiltration:** If volume overload refractory to diuretics.\n\n**Indications:**\n- Refractory to 2+ inotropes/vasopressors\n- Lactate rising >4 mmol/L\n- Multi-organ failure developing\n- Bridge to recovery or transplant\n\n**Actions:**\n- Activate cardiology + CT surgery\n- Transfer to ECMO center if not available\n- Continue maximal medical therapy during transport [1]',
    citation: [1],
    next: 'chf-disposition',
  },

  // =====================================================================
  // MODULE 5: RENAL ASSESSMENT
  // =====================================================================

  {
    id: 'chf-renal-assessment',
    type: 'question',
    module: 5,
    title: 'Renal Function Assessment',
    body: '**Cardiorenal syndrome is common in ADHF.**\n\n**Check:**\n- Baseline creatinine vs current\n- BUN/Cr ratio (>20 = prerenal)\n- Urine output trend\n- Potassium (diuretics cause hypokalemia, ACE-I cause hyperkalemia)\n\n**AKI Staging:**\n- Stage 1: Cr 1.5-1.9x baseline\n- Stage 2: Cr 2-2.9x baseline\n- Stage 3: Cr ≥3x baseline OR >4.0\n\n**Transient Cr rise is acceptable** if diuresis effective and patient improving.\n\nIs there significant AKI?',
    citation: [2, 4],
    options: [
      {
        label: 'Creatinine Stable',
        description: 'No significant change from baseline',
        next: 'chf-disposition',
      },
      {
        label: 'Mild AKI (Stage 1)',
        description: 'Cr rising 1.5-1.9x baseline',
        next: 'chf-mild-aki',
      },
      {
        label: 'Moderate/Severe AKI (Stage 2-3)',
        description: 'Cr >2x baseline',
        next: 'chf-severe-aki',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'chf-mild-aki',
    type: 'info',
    module: 5,
    title: 'Mild AKI — Cardiorenal Syndrome',
    body: '**Cardiorenal syndrome:** AKI from poor renal perfusion in CHF.\n\n**Management:**\n- **Continue diuretics** if patient still volume overloaded\n- Transient Cr rise is acceptable ("permissive worsening renal function")\n- **Hold ACE-I/ARB** during acute episode (restart once stable)\n- **Avoid NSAIDs, contrast** if possible\n- **Optimize perfusion:** maintain SBP >90, consider low-dose inotrope\n- **Monitor K+** closely — supplement if <3.5, hold diuretics if >5.5\n\n**Expect:**\n- Cr may rise 0.3-0.5 mg/dL during aggressive diuresis\n- Should plateau and improve as cardiac output improves\n- If Cr keeps rising despite stable hemodynamics → nephrology consult [2][4]',
    citation: [2, 4],
    next: 'chf-disposition',
  },

  {
    id: 'chf-severe-aki',
    type: 'info',
    module: 5,
    title: 'Severe AKI — Consider RRT',
    body: '**Stage 2-3 AKI with ADHF — high risk:**\n\n**Optimize first:**\n- Hold diuretics temporarily if anuric\n- Optimize hemodynamics (inotropes if needed)\n- Stop all nephrotoxins\n- Check for obstruction (Foley, bladder scan)\n\n**RRT Indications:**\n- K+ >6.5 unresponsive to medical therapy\n- Severe metabolic acidosis (pH <7.15)\n- Volume overload refractory to diuretics\n- Uremic symptoms (encephalopathy, pericarditis)\n\n**RRT Options:**\n- CVVH/CVVHD if hemodynamically unstable\n- Intermittent HD if stable\n- Ultrafiltration for pure volume removal\n\n**Consult nephrology early.** [2][4]',
    citation: [2, 4],
    next: 'chf-disposition',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'chf-disposition',
    type: 'result',
    module: 6,
    title: 'CHF Exacerbation — Disposition',
    body: '**ICU Admission:**\n- Cardiogenic shock (inotropes/vasopressors)\n- SCAPE requiring NTG drip\n- Respiratory failure (BiPAP or intubation)\n- Severe AKI (Stage 3, RRT consideration)\n- ACS as precipitant\n\n**Telemetry/Stepdown:**\n- Warm & wet with good diuretic response\n- Stable hemodynamics\n- Mild AKI improving\n- No inotrope requirement\n\n**Observation (if available):**\n- Mild exacerbation, rapid response to IV diuretics\n- Low EHMRG/OHFRS score\n- Good social support\n\n**Before discharge:**\n- Address precipitant\n- Optimize GDMT (ACE-I, BB, MRA, SGLT2i)\n- Cardiology follow-up within 7 days\n- Daily weight monitoring education\n- Sodium restriction counseling\n- Medication reconciliation',
    recommendation: 'Disposition based on hemodynamic stability, diuretic response, and risk stratification. ICU for shock or NTG drip. Address precipitant. GDMT optimization. Cardiology follow-up within 7 days.',
    confidence: 'recommended',
    citation: [1, 2, 5],
    calculatorLinks: [
      { id: 'chf-ehmrg', label: 'EHMRG Risk Score' },
      { id: 'chf-dispo', label: 'Dispo Decision Guide' },
    ],
  },
];

export const CHF_EXACERBATION_NODE_COUNT = CHF_EXACERBATION_NODES.length;

export const CHF_EXACERBATION_MODULE_LABELS = [
  'Initial Assessment',
  'SCAPE Protocol',
  'Diuretic Strategy',
  'Cardiogenic Shock',
  'Renal Assessment',
  'Disposition',
];

export const CHF_EXACERBATION_CRITICAL_ACTIONS = [
  { text: 'NIV (BiPAP/CPAP) 10-15 cm H₂O for severe respiratory distress', nodeId: 'chf-bipap' },
  { text: 'Furosemide 40-80 mg IV (or 2× home dose) within 30 minutes', nodeId: 'chf-diuretic' },
  { text: 'Nitroglycerin 0.4 mg SL q5min × 3 or infusion 10-20 mcg/min for afterload reduction', nodeId: 'chf-nitro' },
  { text: 'Intubate if severe hypoxia (SpO₂ <90%) despite NIV + maximal oxygen', nodeId: 'chf-intubate' },
  { text: 'Push-dose pressors if hypotensive: norepinephrine 10-20 mcg IVP q2-3min', nodeId: 'chf-cardiogenic-shock' },
  { text: 'Check BNP/NT-proBNP to confirm diagnosis (BNP >400 or NT-proBNP >900)', nodeId: 'chf-bnp' },
  { text: 'POCUS to assess IVC, LV function, B-lines for volume status', nodeId: 'chf-pocus' },
  { text: 'Avoid aggressive IV fluids in volume overload (may worsen pulmonary edema)', nodeId: 'chf-diuretic' },
];

export const CHF_EXACERBATION_CITATIONS: Citation[] = [
  { num: 1, text: 'Weingart S. EMCrit IBCC: Sympathetic Crashing Acute Pulmonary Edema (SCAPE). emcrit.org/ibcc/scape. Accessed 2024.' },
  { num: 2, text: 'Hollander JE, et al. EB Medicine: Acute Decompensated Heart Failure in the Emergency Department. 2023.' },
  { num: 3, text: 'Weingart S. EMCrit Podcast #1: SCAPE. emcrit.org/emcrit/scape. Original SCAPE protocol.' },
  { num: 4, text: 'Felker GM, et al. DOSE Trial: Diuretic Optimization Strategies Evaluation in ADHF. N Engl J Med. 2011;364:797-805.' },
  { num: 5, text: 'Heidenreich PA, et al. 2022 AHA/ACC/HFSA Guideline for Management of Heart Failure. J Am Coll Cardiol. 2022;79(17):e263-e421.' },
];
