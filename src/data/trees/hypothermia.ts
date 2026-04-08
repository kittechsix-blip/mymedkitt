// MedKitt — Accidental Hypothermia
// Recognition → Resuscitation Decisions → Rewarming → Cardiac Arrest → ECMO Transport → Disposition
// 6 modules, 32 nodes total
// Sources: EMCrit IBCC, Wilderness Medical Society 2019, ELSO 2025, AHA ACLS

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';

interface Citation {
  num: number;
  text: string;
}

export const HYPOTHERMIA_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Measure core temperature with esophageal or rectal probe', nodeId: 'hypo-start' },
  { text: 'Remember: "No one is dead until they are WARM and dead"', nodeId: 'hypo-start' },
  { text: 'Remove wet clothing and prevent further heat loss immediately', nodeId: 'hypo-rewarming' },
  { text: 'Give warm IV fluids (40-42°C) via Level 1 or Ranger', nodeId: 'hypo-rewarming' },
  { text: 'Start active rewarming with Bair Hugger, warm blankets, heated humidified O2', nodeId: 'hypo-rewarming' },
  { text: 'Avoid defibrillation if temp <30°C (J-wave VF is refractory)', nodeId: 'hypo-cardiac-arrest' },
  { text: 'Continue CPR during rewarming (may need hours of CPR)', nodeId: 'hypo-cardiac-arrest' },
  { text: 'Activate ECMO for cardiac arrest with temp <28°C (best survival)', nodeId: 'hypo-ecmo' },
  { text: 'Calculate HOPE score to guide ECMO futility (K+ >12, asphyxia, trauma)', nodeId: 'hypo-ecmo' },
];

export const HYPOTHERMIA_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & CLASSIFICATION
  // =====================================================================

  {
    id: 'hypo-start',
    type: 'info',
    module: 1,
    title: 'Accidental Hypothermia',
    body: '**Definition:** Core temperature <35°C (95°F) due to environmental exposure.\n\n**"No one is dead until they are WARM and dead."**\n\nRemarkable survivals documented:\n- Lowest survivor: **13.7°C** (56.7°F)\n- Longest CPR with intact neuro survival: **6 hours 52 minutes**\n\n**Key principle:** Hypothermia is PROTECTIVE if it occurs BEFORE cardiac arrest. Cold brain = reduced metabolic demand = prolonged tolerance to ischemia. [1][2][3]',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'hypo-temp-convert', label: 'Temp Converter' },
      { id: 'hypo-key-temps', label: 'Key Temperatures' },
      { id: 'hypo-swiss-stage', label: 'Swiss Staging' },
      { id: 'hypo-hope-score', label: 'HOPE Score' },
      { id: 'hypo-resus-criteria', label: 'Resus Criteria' },
      { id: 'hypo-rewarming', label: 'Rewarming Guide' },
      { id: 'hypo-ecmo-transport', label: 'ECMO Transport' },
    ],
    next: 'hypo-temp-measurement',
  },

  {
    id: 'hypo-temp-measurement',
    type: 'info',
    module: 1,
    title: 'Temperature Measurement',
    body: '**Accurate core temperature is ESSENTIAL** — guides all decisions.\n\n**Preferred (most accurate):**\n- **Esophageal probe** — gold standard in intubated patients\n- **Rectal probe** — acceptable, but lags during rapid temp changes\n- **Bladder probe** — acceptable\n\n**DO NOT USE:**\n- Oral thermometry (unreliable)\n- Axillary (unreliable)\n- Temporal/forehead (grossly inaccurate)\n- Tympanic (may be falsely low if ear frozen)\n\n**If no core temp available:** Use Swiss Staging System based on clinical signs. [1][2][3]',
    citation: [1, 2, 3],
    next: 'hypo-classify',
  },

  {
    id: 'hypo-classify',
    type: 'question',
    module: 1,
    title: 'Severity Classification',
    body: '**Temperature-based classification:**\n\n| Severity | Temperature | Features |\n|----------|-------------|----------|\n| **Mild** | 32-35°C (90-95°F) | Conscious, shivering |\n| **Moderate** | 28-32°C (82-90°F) | Altered LOC, shivering stops |\n| **Severe** | 24-28°C (75-82°F) | Unconscious, VS present |\n| **Profound** | <24°C (<75°F) | No vital signs |\n\n**Key sign:** Shivering typically STOPS below 30-32°C. If patient is shivering → temp likely >30°C.\n\nWhat is the patient\'s status? [1][2][3]',
    images: [{ src: 'images/hypothermia/osborn-j-waves.jpg', alt: 'ECG strip showing prominent Osborn J waves — positive deflection at the J-point in a hypothermic patient', caption: "Hypothermia ECG — Osborn (J) waves: positive deflection at the J-point. Amplitude correlates with degree of hypothermia. (CC BY 3.0)" }],
    citation: [1, 2, 3],
    options: [
      {
        label: 'Mild (32-35°C) — alert, shivering',
        description: 'Conscious, shivering present',
        next: 'hypo-mild-mgmt',
      },
      {
        label: 'Moderate (28-32°C) — altered, no shivering',
        description: 'Impaired consciousness, bradycardia',
        next: 'hypo-moderate-mgmt',
        urgency: 'urgent',
      },
      {
        label: 'Severe/Profound (<28°C) — unconscious',
        description: 'Unresponsive, minimal vital signs',
        next: 'hypo-severe-mgmt',
        urgency: 'critical',
      },
      {
        label: 'Cardiac arrest — pulseless',
        description: 'No pulse after 30-45 second check',
        next: 'hypo-arrest-decision',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: RESUSCITATION DECISIONS
  // =====================================================================

  {
    id: 'hypo-arrest-decision',
    type: 'info',
    module: 2,
    title: 'Hypothermic Cardiac Arrest',
    body: '**Check pulse for 30-45 seconds** — pulse may be very slow and difficult to detect.\n\n**Before starting CPR, check for HARD CONTRAINDICATIONS:**\n\n**DO NOT RESUSCITATE if:**\n- ❌ Chest wall frozen solid (incompressible)\n- ❌ Obvious lethal injuries (decapitation, truncal transection)\n- ❌ Decomposition\n- ❌ Avalanche burial >35 min WITH airway packed with snow AND asystole\n- ❌ Potassium >12 mEq/L (no survivors)\n\n**These are NOT contraindications:**\n- ✓ Muscular rigidity\n- ✓ Fixed/dilated pupils\n- ✓ Prolonged down time\n- ✓ Very low temperature [1][2][4]',
    citation: [1, 2, 4],
    next: 'hypo-arrest-contraindications',
  },

  {
    id: 'hypo-arrest-contraindications',
    type: 'question',
    module: 2,
    title: 'Resuscitation Decision',
    body: '**Critical question:** Did hypothermia occur BEFORE or AFTER cardiac arrest?\n\n- **Hypothermia BEFORE arrest** → PROTECTIVE → aggressive resuscitation indicated\n- **Arrest BEFORE hypothermia** → NOT protective → standard futility criteria apply\n\n**Potassium thresholds:**\n| K+ Level | Action |\n|----------|--------|\n| <10 mEq/L | Proceed with aggressive resuscitation |\n| 10-12 mEq/L | Poor prognosis, calculate HOPE score |\n| >12 mEq/L | **Futile** — no documented survivors |\n\n**Caveat:** Rule out hemolysis artifact before using K+ for termination. [1][2][4][5]',
    citation: [1, 2, 4, 5],
    options: [
      {
        label: 'No hard contraindications — proceed with resuscitation',
        description: 'No frozen chest, K+ <12, hypothermia-first scenario',
        next: 'hypo-arrest-cpr',
        urgency: 'critical',
      },
      {
        label: 'Hard contraindication present',
        description: 'Frozen chest, K+ >12, or asphyxia-first scenario',
        next: 'hypo-futile',
      },
    ],
  },

  {
    id: 'hypo-futile',
    type: 'result',
    module: 2,
    title: 'Resuscitation Not Indicated',
    body: '**Hard contraindication to resuscitation identified.**\n\n**Criteria met for termination/non-initiation:**\n- Chest wall frozen and incompressible, OR\n- Obvious lethal injury, OR\n- Signs of prolonged death (decomposition), OR\n- Avalanche >35 min + snow-packed airway + asystole, OR\n- K+ >12 mEq/L (confirmed, non-hemolyzed)\n\n**Documentation:** Document specific contraindication and clinical reasoning.\n\n**Family communication:** Despite remarkable survival stories in hypothermia, specific criteria indicate resuscitation would not be successful in this case.',
    recommendation: 'Resuscitation not indicated due to confirmed futility criteria.',
    confidence: 'definitive',
    citation: [1, 2, 4],
  },

  // =====================================================================
  // MODULE 3: HYPOTHERMIC CARDIAC ARREST MANAGEMENT
  // =====================================================================

  {
    id: 'hypo-arrest-cpr',
    type: 'info',
    module: 3,
    title: 'CPR in Hypothermic Arrest',
    body: '**Start CPR immediately if no hard contraindications.**\n\n**CPR modifications:**\n- Standard compression rate and depth\n- **Mechanical CPR strongly preferred** for prolonged resuscitation/transport\n- **Intermittent CPR acceptable** if continuous not possible (unique to hypothermia)\n\n**Gentle handling:**\n- Physical manipulation can precipitate VF\n- Move patient horizontally\n- Avoid rough movements\n\n**Rhythm check:**\n- VF/VT → Attempt defibrillation (see next)\n- Asystole/PEA → Continue CPR, focus on rewarming [1][2][3][4]',
    citation: [1, 2, 3, 4],
    next: 'hypo-arrest-defib',
  },

  {
    id: 'hypo-arrest-defib',
    type: 'info',
    module: 3,
    title: 'Defibrillation in Hypothermia',
    body: '**VF/VT detected → Attempt defibrillation**\n\n**Temperature-based approach:**\n\n| Core Temp | Defibrillation Strategy |\n|-----------|------------------------|\n| **<30°C** | Attempt 1-3 shocks max, then DEFER until rewarmed |\n| **30-35°C** | Resume standard defibrillation attempts |\n| **>35°C** | Standard ACLS |\n\n**Why limit shocks below 30°C:**\n- Severely hypothermic myocardium is refractory to defibrillation\n- Repeated shocks unlikely to convert and may cause myocardial damage\n- Energy better spent on rewarming\n\n**European approach:** Maximum 3 shocks below 30°C, then wait for rewarming\n**AHA approach:** May be reasonable to continue if no response [1][2][4]',
    citation: [1, 2, 4],
    next: 'hypo-arrest-drugs',
  },

  {
    id: 'hypo-arrest-drugs',
    type: 'info',
    module: 3,
    title: 'Drug Therapy in Hypothermia',
    body: '**Drugs accumulate in hypothermia** — hepatic metabolism markedly reduced.\n\n| Core Temp | Drug Strategy |\n|-----------|---------------|\n| **<30°C** | **WITHHOLD** all vasopressors and antiarrhythmics |\n| **30-35°C** | **DOUBLE intervals** — epinephrine q6-10 min (not q3-5 min) |\n| **≥35°C** | Standard ACLS dosing |\n\n**Why withhold below 30°C:**\n- Effects that last seconds at 37°C can last 5+ minutes at low temps\n- Risk of drug toxicity when patient rewarms\n- Focus should be on REWARMING, not drugs\n\n**Vasopressors in non-arrest hypothermia:**\n- Generally ineffective below 30°C\n- Vasoconstriction impairs rewarming [1][2][3][4]',
    citation: [1, 2, 3, 4],
    next: 'hypo-arrest-ecmo-decision',
  },

  {
    id: 'hypo-arrest-ecmo-decision',
    type: 'question',
    module: 3,
    title: 'ECMO Decision',
    body: '**ECMO/Extracorporeal rewarming is GOLD STANDARD** for hypothermic cardiac arrest.\n\n**Survival benefit:** NNT = 2 (40-90% mortality reduction in appropriate patients)\n\n**ECMO indicated if:**\n- Core temp <30-32°C\n- No confirmed death BEFORE cooling\n- K+ <12 mEq/L\n- No unsurvivable injuries\n- HOPE score suggests reasonable survival\n\n**Calculate HOPE score before transport decision.**\n\n**Is ECMO available?** [1][2][4][5]',
    citation: [1, 2, 4, 5],
    options: [
      {
        label: 'ECMO available — initiate transport',
        description: 'ECMO center accessible',
        next: 'hypo-ecmo-transport',
        urgency: 'critical',
      },
      {
        label: 'No ECMO — use alternative rewarming',
        description: 'ECMO not available or patient not candidate',
        next: 'hypo-invasive-rewarming',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 4: ECMO TRANSPORT
  // =====================================================================

  {
    id: 'hypo-ecmo-transport',
    type: 'info',
    module: 4,
    title: 'ECMO Transport Protocol',
    body: '**Transport to ECMO center EVEN IF NOT CLOSEST HOSPITAL.**\n\n**Pre-transport:**\n1. Calculate HOPE score (≥10% survival → proceed)\n2. Obtain K+ (must be <12 mEq/L)\n3. Activate ECMO team at receiving center\n4. Apply mechanical CPR device if available\n\n**During transport:**\n- **Continuous CPR** — do not stop for loading/unloading\n- **Mechanical CPR preferred** — consistent quality during movement\n- **Horizontal positioning** — avoid orthostatic stress\n- **Gentle handling** — rough movement can precipitate VF\n- **Begin rewarming** — warm IV fluids, heated blankets to TRUNK only [1][2][4][5]',
    citation: [1, 2, 4, 5],
    next: 'hypo-transport-details',
  },

  {
    id: 'hypo-transport-details',
    type: 'info',
    module: 4,
    title: 'Transport Checklist',
    body: '**ECMO Transport Checklist:**\n\n☐ **HOPE score calculated** — document survival probability\n☐ **K+ confirmed <12 mEq/L** — non-hemolyzed sample\n☐ **ECMO team notified** — ETA and patient status\n☐ **Mechanical CPR applied** — LUCAS, AutoPulse, or similar\n☐ **Core temp probe in place** — continuous monitoring\n☐ **Warm IV fluids running** — 40-43°C crystalloid\n☐ **Heated blankets to trunk** — avoid extremities (afterdrop risk)\n☐ **Patient secured horizontally**\n☐ **Team briefed** — continuous CPR, gentle handling\n\n**DO NOT rewarm extremities** — cold blood return causes afterdrop and arrhythmias. [1][2][4][5]',
    citation: [1, 2, 4, 5],
    next: 'hypo-transport-continue',
  },

  {
    id: 'hypo-transport-continue',
    type: 'info',
    module: 4,
    title: 'During Transport',
    body: '**Continuous CPR is critical** — but intermittent is acceptable if continuous impossible.\n\n**Monitor for:**\n- VF conversion (pause briefly to check rhythm)\n- ROSC (check pulse q5 min during CPR pauses)\n- Core temp changes\n\n**If ROSC during transport:**\n- Continue rewarming\n- Standard post-arrest care\n- Still transport to ECMO center (may need ECMO for rewarming or cardiogenic shock)\n\n**Arriving at ECMO center:**\n- Handoff to ECMO team\n- Provide HOPE score, K+, down time, CPR quality\n- ECMO cannulation proceeds under ongoing CPR [1][2][4][5]',
    citation: [1, 2, 4, 5],
    next: 'hypo-ecmo-rewarming',
  },

  {
    id: 'hypo-ecmo-rewarming',
    type: 'info',
    module: 4,
    title: 'ECMO Rewarming',
    body: '**VA-ECMO rewarming protocol:**\n\n**Rewarming rate:** 6-10°C/hour (fastest available method)\n\n**Target:** Core temp 32-34°C initially, then slow to 36-37°C\n\n**During ECMO rewarming:**\n- Monitor K+ frequently (shifts out of cells during rewarming)\n- Watch for reperfusion injury\n- Anticipate coagulopathy correction as temp normalizes\n- Gradual weaning as cardiac function recovers\n\n**Post-ECMO:**\n- Targeted temperature management per post-arrest protocols\n- Neuro-prognostication delayed ≥72 hours\n- Many patients recover excellent neurological function [1][4][5]',
    citation: [1, 4, 5],
    next: 'hypo-disposition',
  },

  // =====================================================================
  // MODULE 5: NON-ECMO REWARMING
  // =====================================================================

  {
    id: 'hypo-invasive-rewarming',
    type: 'info',
    module: 3,
    title: 'Invasive Rewarming (No ECMO)',
    body: '**When ECMO unavailable, use aggressive invasive techniques:**\n\n**Thoracic lavage (most effective non-ECMO method):**\n- Rewarming rate: 3-6°C/hour\n- Bilateral chest tubes\n- Instill 300-500 mL warmed (42°C) crystalloid via anterior tube\n- Drain via posterolateral tube\n- Cycle q15 min or continuous flow\n\n**Peritoneal lavage:**\n- Rewarming rate: 3-4°C/hour\n- 40-42°C crystalloid\n- Continuous or intermittent drainage\n\n**Combine with:**\n- Warm IV fluids (40-43°C)\n- Heated humidified O2\n- Active external warming to TRUNK [1][2][3]',
    citation: [1, 2, 3],
    next: 'hypo-thoracic-lavage',
  },

  {
    id: 'hypo-thoracic-lavage',
    type: 'info',
    module: 3,
    title: 'Thoracic Lavage Technique',
    body: '**Procedure:**\n\n1. **Bilateral chest tube insertion**\n   - Anterior tube (2nd-3rd ICS MCL) for INSTILLATION\n   - Posterolateral tube (5th ICS MAL) for DRAINAGE\n\n2. **Fluid preparation**\n   - Warm crystalloid to 42°C (use fluid warmer or microwave)\n   - LR or NS acceptable\n\n3. **Instillation**\n   - Infuse 300-500 mL via anterior tube\n   - Clamp for 15 minutes\n   - Unclamp and drain via posterior tube\n   - Repeat cycle\n\n4. **Alternative: continuous flow**\n   - Requires two-tube system per hemithorax\n   - Higher flow rates possible\n\n**Monitor:** Core temp, chest tube output, lung sounds [1][2][3]',
    citation: [1, 2, 3],
    next: 'hypo-arrest-terminate',
  },

  {
    id: 'hypo-arrest-terminate',
    type: 'info',
    module: 3,
    title: 'Termination of Resuscitation',
    body: '**When to stop resuscitation:**\n\n**Continue CPR until:**\n- ROSC achieved, OR\n- **Core temp ≥32°C with persistent asystole** = can consider termination, OR\n- K+ confirmed >12 mEq/L during resuscitation, OR\n- Other contraindication identified\n\n**"Warm and dead" = 32°C minimum**\n\n**Do NOT terminate based on:**\n- Prolonged down time alone\n- Fixed/dilated pupils\n- Muscular rigidity\n- Multiple failed defibrillations (while still cold)\n\n**Documentation:** Core temp at termination, total resuscitation time, reason for termination. [1][2][4]',
    citation: [1, 2, 4],
    next: 'hypo-disposition',
  },

  // =====================================================================
  // MODULE 6: NON-ARREST MANAGEMENT
  // =====================================================================

  {
    id: 'hypo-mild-mgmt',
    type: 'info',
    module: 6,
    title: 'Mild Hypothermia (32-35°C)',
    body: '**Swiss Stage HT-I: Alert, shivering**\n\n**Management:**\n- Remove wet clothing\n- Warm, dry environment\n- Warm blankets (passive rewarming)\n- Warm oral fluids if alert and protecting airway\n- Active external warming if slow progress\n\n**Rewarming rate:** 0.5-2°C/hour with passive measures\n\n**Monitoring:**\n- Core temp q30-60 min\n- Cardiac monitor (watch for arrhythmias)\n- Mental status\n\n**Disposition:** May discharge if rewarmed, stable, and cause addressed. [1][2][3]',
    citation: [1, 2, 3],
    treatment: {
      firstLine: {
        drug: 'Passive rewarming',
        dose: 'Warm blankets, warm environment',
        route: 'External',
        frequency: 'Continuous',
        duration: 'Until core temp >35°C',
        notes: 'Add active external warming if not improving in 1-2 hours.',
      },
      monitoring: 'Core temp q30-60 min, cardiac monitoring, serial neuro checks.',
    },
    next: 'hypo-mild-monitoring',
  },

  {
    id: 'hypo-mild-monitoring',
    type: 'question',
    module: 6,
    title: 'Mild Hypothermia Response',
    body: '**Assess response to passive rewarming:**\n\nGood response:\n- Shivering effective\n- Core temp rising 0.5-1°C/hour\n- Improving mental status\n\nPoor response:\n- Shivering ineffective or absent\n- Temp not rising\n- Deteriorating mental status\n- Developing arrhythmias [1][2][3]',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Good response — continue passive rewarming',
        description: 'Temp rising, shivering effective',
        next: 'hypo-mild-dispo',
      },
      {
        label: 'Poor response — escalate to active rewarming',
        description: 'Temp not improving, deteriorating',
        next: 'hypo-moderate-mgmt',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'hypo-mild-dispo',
    type: 'result',
    module: 6,
    title: 'Mild Hypothermia — Discharge Criteria',
    body: '**May consider discharge if:**\n- Core temp normalized (>36°C)\n- Mental status normal\n- Ambulating safely\n- No arrhythmias\n- Underlying cause identified and addressed\n- Safe environment to return to\n- Reliable follow-up\n\n**Admit if:**\n- Elderly or comorbid\n- Underlying illness (sepsis, intoxication, endocrine)\n- Social concerns (homelessness, abuse)\n- Unable to rewarm adequately',
    recommendation: 'Mild hypothermia with good response — may discharge if criteria met.',
    confidence: 'recommended',
    citation: [1, 2, 3],
  },

  {
    id: 'hypo-moderate-mgmt',
    type: 'info',
    module: 6,
    title: 'Moderate Hypothermia (28-32°C)',
    body: '**Swiss Stage HT-II: Altered consciousness, shivering stopped**\n\n**HIGH ARRHYTHMIA RISK — handle gently!**\n\n**Management:**\n- Remove wet clothing (cut off, avoid excessive movement)\n- Horizontal positioning\n- Cardiac monitoring (anticipate bradycardia, AF)\n- Active external rewarming (forced air warming preferred)\n- Warm IV fluids (40-43°C crystalloid)\n- Heated humidified O2 via HFNC or ventilator\n\n**Rewarming rate:** 1-3°C/hour\n\n**Avoid:**\n- Rough handling\n- Cold IV fluids\n- Rewarming extremities before trunk [1][2][3]',
    citation: [1, 2, 3],
    treatment: {
      firstLine: {
        drug: 'Active external rewarming',
        dose: 'Forced air warming (Bair Hugger) to trunk',
        route: 'External',
        frequency: 'Continuous',
        duration: 'Until core temp >35°C',
        notes: 'Avoid warming extremities — causes afterdrop.',
      },
      alternatives: {
        drug: 'Warm IV fluids',
        dose: '40-43°C crystalloid, 500-1000 mL',
        route: 'IV',
        frequency: 'Bolus then maintenance',
        duration: 'Until rewarmed',
        notes: 'Use fluid warmer. Adds ~0.5-1°C/hour rewarming.',
      },
      monitoring: 'Continuous cardiac monitor, core temp q15-30 min, K+.',
    },
    next: 'hypo-moderate-complications',
  },

  {
    id: 'hypo-moderate-complications',
    type: 'info',
    module: 6,
    title: 'Complications to Anticipate',
    body: '**ECG changes:**\n- Sinus bradycardia (universal)\n- Prolonged PR, QRS, QT\n- J waves (Osborn waves) — pathognomonic below 32°C\n- Atrial fibrillation (common)\n- VF risk increases as QRS widens\n\n**Coagulopathy:**\n- Platelet dysfunction + enzyme inhibition below 35°C\n- Lab PT/aPTT run at 37°C — won\'t detect hypothermic coagulopathy\n- Primary treatment: REWARM\n\n**Electrolytes:**\n- Cooling: Hypokalemia (intracellular shift), hyperglycemia\n- Rewarming: **HYPERKALEMIA** (K+ shifts back out)\n- **Do NOT aggressively replace K+ during hypothermia!** [1][2][3]',
    citation: [1, 2, 3],
    next: 'hypo-moderate-dispo',
  },

  {
    id: 'hypo-moderate-dispo',
    type: 'result',
    module: 6,
    title: 'Moderate Hypothermia — Disposition',
    body: '**All moderate hypothermia patients require admission.**\n\n**ICU admission if:**\n- Arrhythmias\n- Hemodynamic instability\n- Requiring invasive rewarming\n- Significant comorbidities\n\n**Telemetry admission if:**\n- Stable hemodynamics\n- Responding to active external rewarming\n- No significant arrhythmias\n\n**Workup for underlying cause:**\n- Toxicology screen\n- TSH, cortisol\n- Blood glucose\n- Infection workup if indicated\n- Social assessment [1][2][3]',
    recommendation: 'Admit all moderate hypothermia patients. ICU if unstable or arrhythmias.',
    confidence: 'definitive',
    citation: [1, 2, 3],
  },

  {
    id: 'hypo-severe-mgmt',
    type: 'info',
    module: 6,
    title: 'Severe Hypothermia (<28°C)',
    body: '**Swiss Stage HT-III: Unconscious, vital signs present**\n\n**EXTREME VF RISK — handle as if "cardiac time bomb"**\n\n**Immediate management:**\n- Minimize all movement\n- Horizontal positioning only\n- Continuous cardiac monitoring\n- Secure airway if GCS ≤8 (RSI acceptable, ketamine preferred)\n- Active internal rewarming required\n\n**If hemodynamically stable:**\n- Warm IV fluids + heated O2 + forced air warming\n- Prepare for ECMO if available\n\n**If hemodynamically unstable:**\n- ECMO strongly preferred\n- If no ECMO: thoracic lavage + peritoneal lavage [1][2][3][4]',
    citation: [1, 2, 3, 4],
    next: 'hypo-severe-decision',
  },

  {
    id: 'hypo-severe-decision',
    type: 'question',
    module: 6,
    title: 'Severe Hypothermia — ECMO Decision',
    body: '**ECMO provides:**\n- Fastest rewarming (6-10°C/hour)\n- Circulatory support\n- Ability to continue if arrest occurs\n\n**Consider ECMO transfer if:**\n- Core temp <28°C\n- Hemodynamically unstable\n- Not responding to standard rewarming\n- High risk of imminent arrest\n\n**ECMO available and patient candidate?** [1][2][4][5]',
    citation: [1, 2, 4, 5],
    options: [
      {
        label: 'Transfer for ECMO',
        description: 'ECMO available, patient is candidate',
        next: 'hypo-ecmo-transport',
        urgency: 'critical',
      },
      {
        label: 'Continue non-ECMO rewarming',
        description: 'ECMO not available or patient not candidate',
        next: 'hypo-invasive-rewarming',
        urgency: 'critical',
      },
      {
        label: 'Patient arrested during evaluation',
        description: 'Lost pulse',
        next: 'hypo-arrest-decision',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // DISPOSITION
  // =====================================================================

  {
    id: 'hypo-disposition',
    type: 'result',
    module: 6,
    title: 'Post-Rewarming Care',
    body: '**After successful rewarming:**\n\n**ICU admission for:**\n- Post-arrest care (TTM protocols)\n- Required ECMO/mechanical support\n- Significant organ dysfunction\n- Persistent arrhythmias\n\n**Monitoring:**\n- Delayed neuro-prognostication (≥72 hours post-arrest)\n- Serial K+ (rewarming hyperkalemia)\n- Coagulation parameters\n- Renal function (rhabdo risk)\n\n**Workup underlying cause:**\n- Intoxication (EtOH, drugs)\n- Infection/sepsis\n- Endocrine (hypothyroid, adrenal insufficiency)\n- Trauma\n- Social factors (homelessness, elder abuse)\n\n**Remarkable recoveries possible** — many hypothermia survivors have excellent neurological outcomes. [1][2][3][4]',
    recommendation: 'ICU admission for post-rewarming monitoring. Investigate underlying cause. Delayed neuro-prognostication.',
    confidence: 'definitive',
    citation: [1, 2, 3, 4],
  },

];

export const HYPOTHERMIA_MODULE_LABELS = [
  'Recognition & Classification',
  'Resuscitation Decisions',
  'Cardiac Arrest Management',
  'ECMO Transport',
  'Non-ECMO Rewarming',
  'Non-Arrest Management',
];

export const HYPOTHERMIA_NODE_COUNT = 32;

export const HYPOTHERMIA_CITATIONS: Citation[] = [
  {
    num: 1,
    text: 'Paal P, et al. Accidental hypothermia-an update. Scand J Trauma Resusc Emerg Med. 2016;24(1):111. Wilderness Medical Society Practice Guidelines.',
  },
  {
    num: 2,
    text: 'Brown DJ, et al. Accidental Hypothermia. N Engl J Med. 2012;367:1930-1938.',
  },
  {
    num: 3,
    text: 'Farkas J. Hypothermia. EMCrit IBCC. 2024. https://emcrit.org/ibcc/hypothermia/',
  },
  {
    num: 4,
    text: 'Lott C, et al. European Resuscitation Council Guidelines 2021: Cardiac arrest in special circumstances. Resuscitation. 2021;161:152-219.',
  },
  {
    num: 5,
    text: 'Pasquier M, et al. Hypothermia outcome prediction after extracorporeal life support for hypothermic cardiac arrest (HOPE). Resuscitation. 2018;126:58-64.',
  },
];
