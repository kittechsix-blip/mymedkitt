// MedKitt — Post-Tonsillectomy Hemorrhage (Pediatric)
// Evidence-based management: primary vs secondary, severity assessment, TXA, ENT criteria
// AAO-HNS guidelines, pediatric airway considerations, blood product thresholds
// 6 modules: Initial → Severity → Hemostasis → TXA → Airway → Disposition
// 24 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction, Citation } from '../../services/tree-service.js';

export const PTH_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Primary risk is ASPIRATION, not exsanguination — position upright, suction available', nodeId: 'pth-initial' },
  { text: 'Secondary hemorrhage (days 5-10) more common than primary; sloughing of fibrin clot', nodeId: 'pth-timing' },
  { text: 'TXA 10-15 mg/kg IV (max 1000mg) emerging as effective; can also nebulize 500mg', nodeId: 'pth-txa' },
  { text: 'Fresh clot in tonsillar fossa = 17.3% rebleed risk; needs close monitoring', nodeId: 'pth-severity' },
  { text: 'ENT/OR for: active brisk bleeding, fresh clot with active hemorrhage, airway compromise, shock', nodeId: 'pth-ent-criteria' },
];

export const PTH_MODULE_LABELS: string[] = [
  'Initial Assessment',
  'Severity Classification',
  'Hemostatic Measures',
  'Tranexamic Acid',
  'Airway Management',
  'Disposition',
];

export const PTH_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'pth-start',
    type: 'info',
    module: 1,
    title: 'Post-Tonsillectomy Hemorrhage',
    body: '[PTH Overview](#/info/pth-overview)\n\n**Definition:** Bleeding from tonsillar fossa following tonsillectomy\n\n**Incidence:**\n• Overall: 0.1-7.5% (average ~4.2%)\n• Primary (<24h): 0.1-1%\n• Secondary (days 5-10): 1.5-4.3% — more common\n• Lethal hemorrhage: 7 per 100,000\n\n**⚠️ CRITICAL CONCEPT:**\n**Primary risk is ASPIRATION, not exsanguination**\n• Most deaths from airway compromise, not blood loss\n• Children compensate until 40% blood loss, then rapid decompensation\n\n**Three-Pronged Approach:**\n1. **Resuscitation** — IV access, fluids, blood products if needed\n2. **Temporizing measures** — Stop further bleeding\n3. **ENT consultation** — Early involvement critical',
    citation: [1, 2],
    next: 'pth-initial',
    summary: 'PTH: primary <24h (0.1-1%), secondary days 5-10 (1.5-4.3%); main risk is ASPIRATION not exsanguination',
  },

  {
    id: 'pth-initial',
    type: 'question',
    module: 1,
    title: 'Initial Stabilization',
    body: '**Immediate Actions:**\n\n**Positioning:**\n• Sit patient upright (reduces aspiration risk)\n• Suction at bedside\n• Avoid manipulation, coughing, straining (destabilizes clots)\n\n**Access:**\n• Large-bore IV\n• Labs: CBC, type & screen, consider PT/PTT\n• Estimate blood loss\n\n**Assess Timing:**\n\n**Primary Hemorrhage (<24h):**\n• Usually surgical technique related\n• Often requires OR return\n\n**Secondary Hemorrhage (days 5-10):**\n• Sloughing of fibrin clot\n• Peak at day 6-7\n• May respond to conservative measures\n\n**When did surgery occur?**',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Primary (<24 hours post-op)',
        next: 'pth-primary',
      },
      {
        label: 'Secondary (days 5-10 post-op)',
        next: 'pth-secondary',
      },
      {
        label: 'Late (>14 days) — Unusual',
        next: 'pth-late',
      },
    ],
    summary: 'Upright positioning, suction ready, IV access, labs; primary <24h vs secondary days 5-10',
  },

  {
    id: 'pth-timing',
    type: 'info',
    module: 1,
    title: 'Hemorrhage Timing',
    body: '**Primary Hemorrhage (<24 hours):**\n• Usually surgical technique related\n• More likely to require OR return\n• Associated with: coblation technique, surgeon inexperience\n\n**Secondary Hemorrhage (days 5-10):**\n• Most common type (66% of all bleeds)\n• Caused by sloughing of fibrin eschar\n• Peak incidence: day 6-7\n• May respond to conservative management\n\n**Risk Factors for Any Bleeding:**\n• Age >6 years (11+ years = 2× risk)\n• Recurrent tonsillitis history (4.5× risk)\n• ADHD diagnosis\n• Chronic tonsillitis/tonsilloliths\n\n**Special Population — Coagulopathy:**\n• Hemophilia/VWD: similar primary rate but higher volume\n• Secondary hemorrhage: 15% (vs 4.3% normal)\n\n**Recurrent Hemorrhage:**\n• 7.1% of initial bleeds will rebleed\n• Average rebleed timing: 9.3 days post-op',
    citation: [2, 3],
    next: 'pth-severity',
    summary: 'Secondary more common (66%); peak day 6-7; risk factors: age >6, recurrent tonsillitis, ADHD',
  },

  {
    id: 'pth-primary',
    type: 'info',
    module: 1,
    title: 'Primary Hemorrhage (<24h)',
    body: '**Primary hemorrhage is often surgical in nature.**\n\n**Characteristics:**\n• Within 24 hours of surgery\n• Usually from inadequate intraoperative hemostasis\n• Often requires surgical re-exploration\n• Higher volume bleeds more common\n\n**Management:**\n• Same initial stabilization\n• Lower threshold for OR return\n• ENT consultation immediately\n• These patients are still recovering from anesthesia — watch airway closely\n\n**Most primary hemorrhages will go to OR.**',
    citation: [2, 3],
    next: 'pth-severity',
    summary: 'Primary (<24h): usually surgical, lower threshold for OR return, immediate ENT consult',
  },

  {
    id: 'pth-secondary',
    type: 'info',
    module: 1,
    title: 'Secondary Hemorrhage (Days 5-10)',
    body: '**Most common type — often manageable conservatively.**\n\n**Pathophysiology:**\n• Fibrin eschar sloughs as healing progresses\n• Exposes underlying vessels\n• Peak at day 6-7 post-op\n\n**Characteristics:**\n• May present with minor blood-tinged sputum\n• Or active bleeding\n• ~50% can be managed without surgery\n\n**Favorable Features for Conservative Management:**\n• Blood-tinged sputum only (not active bleeding)\n• No fresh clot in tonsillar fossa\n• Stable vitals\n• Older child who can cooperate\n\n**Unfavorable Features:**\n• Active hemorrhage\n• Fresh clot visible in fossa\n• Hemodynamic instability\n• Young child/poor cooperation',
    citation: [2, 3],
    next: 'pth-severity',
    summary: 'Secondary (days 5-10): fibrin eschar sloughs; ~50% manageable conservatively; peak day 6-7',
  },

  {
    id: 'pth-late',
    type: 'info',
    module: 1,
    title: 'Late Hemorrhage (>14 days)',
    body: '**Unusual presentation — consider other etiologies.**\n\n**Possible Causes:**\n• Delayed eschar separation (rare)\n• Infection at surgical site\n• Foreign body\n• Coagulopathy (undiagnosed)\n• Malignancy (very rare)\n\n**Workup:**\n• Careful examination of tonsillar fossa\n• Coagulation studies if not already done\n• Consider CT if concerning features\n\n**Management:**\n• Same principles as secondary hemorrhage\n• ENT consultation\n• Higher suspicion for underlying pathology',
    citation: [2],
    next: 'pth-severity',
    summary: 'Late (>14d): unusual, consider infection, coagulopathy, underlying pathology; ENT consult',
  },

  // =====================================================================
  // MODULE 2: SEVERITY CLASSIFICATION
  // =====================================================================

  {
    id: 'pth-severity',
    type: 'question',
    module: 2,
    title: 'Bleeding Severity Assessment',
    body: '[Severity Classification](#/info/pth-severity)\n\n**Grade-Based Classification:**\n\n**Grade 0 (Non-hemorrhagic):** 80.8% of cases\n• Concern for bleeding but none visualized\n\n**Grade 1 (Minor):** 11.9%\n• Blood-tinged sputum\n• Small amount of blood in mouth\n• No active oozing\n\n**Grade 2 (Moderate):** 6.0%\n• Active oozing from tonsillar fossa\n• Frank blood in mouth\n• Hemodynamically stable\n\n**Grade 3 (Severe):** 1.3%\n• Brisk, active hemorrhage\n• Fresh clot in tonsillar fossa\n• Hemodynamic instability\n\n**Rebleed Risk:**\n• Blood-tinged sputum: 10.2% rebleed\n• Fresh clot in fossa: **17.3% rebleed**\n\n**What is the severity?**',
    citation: [2, 4],
    options: [
      {
        label: 'Grade 1 — Minor (Blood-Tinged Sputum)',
        next: 'pth-minor',
      },
      {
        label: 'Grade 2 — Moderate (Active Oozing)',
        next: 'pth-moderate',
      },
      {
        label: 'Grade 3 — Severe (Brisk Hemorrhage)',
        next: 'pth-severe',
      },
    ],
    summary: 'Grade 1: blood-tinged; Grade 2: oozing, stable; Grade 3: brisk, unstable; clot = 17.3% rebleed',
  },

  {
    id: 'pth-minor',
    type: 'question',
    module: 2,
    title: 'Grade 1 — Minor Bleeding',
    body: '**Blood-tinged sputum, no active bleeding visible.**\n\n**Risk Assessment:**\n• Rebleed risk: 10.2%\n• Most can be observed\n\n**Initial Management:**\n• Keep NPO\n• IV access, labs\n• Notify ENT\n• Ice chips may be soothing\n\n**Observation Acceptable If:**\n• No active bleeding on exam\n• Hemodynamically stable\n• Older child who can cooperate\n• Can follow instructions (no straining, coughing)\n\n**Consider Discharge If:**\n• Observed 4-6 hours\n• No recurrent bleeding\n• Reliable caregivers\n• Close follow-up available\n\n**What is the plan?**',
    citation: [2, 4],
    options: [
      {
        label: 'Observe in ED',
        next: 'pth-observation',
      },
      {
        label: 'Trial Hemostatic Measures',
        next: 'pth-hemostasis-minor',
      },
    ],
    summary: 'Grade 1: 10.2% rebleed; observe 4-6h; discharge if stable with reliable follow-up',
  },

  {
    id: 'pth-moderate',
    type: 'info',
    module: 2,
    title: 'Grade 2 — Moderate Bleeding',
    body: '**Active oozing, hemodynamically stable.**\n\n**Initial Management:**\n• NPO, IV access\n• Labs: CBC, type & screen\n• ENT notification (not emergent but urgent)\n• Begin hemostatic measures\n\n**Hemostatic Options:**\n• Ice/cold fluids\n• Suction gently (avoid dislodging clot)\n• Consider silver nitrate if appropriate (see next)\n• TXA (emerging evidence)\n\n**Observation Required:**\n• Minimum 12-24 hours\n• Watch for recurrence\n• ~50% can avoid OR with conservative measures',
    citation: [2, 4, 5],
    next: 'pth-hemostasis-choice',
    summary: 'Grade 2: oozing but stable; ENT notification; hemostatic measures; observe 12-24h; ~50% avoid OR',
  },

  {
    id: 'pth-severe',
    type: 'info',
    module: 2,
    title: 'Grade 3 — Severe Hemorrhage',
    body: '**⚠️ ACTIVE BRISK BLEEDING — PREPARE FOR OR**\n\n**Immediate Actions:**\n• Maintain upright position if conscious\n• Suction ready\n• Large-bore IV × 2\n• Type & crossmatch\n• ENT to bedside STAT\n\n**Signs of Shock (may be late in children):**\n• Tachycardia\n• Delayed capillary refill\n• Pallor\n• Altered mental status\n• Hypotension (LATE sign in peds)\n\n**Blood Product Preparation:**\n• Type & crossmatch immediately\n• Consider uncrossmatched if unstable\n• Transfuse if Hgb <7 g/dL or active hemorrhage with shock\n\n**Airway Preparation:**\n• Most deaths from aspiration, not exsanguination\n• Have difficult airway equipment ready\n• Senior provider for intubation\n\n**This patient needs OR.**',
    citation: [2, 4, 6],
    next: 'pth-ent-criteria',
    summary: 'Grade 3: brisk bleeding → OR; 2 large-bore IVs, type & cross, ENT STAT; prepare for difficult airway',
  },

  // =====================================================================
  // MODULE 3: HEMOSTATIC MEASURES
  // =====================================================================

  {
    id: 'pth-hemostasis-minor',
    type: 'info',
    module: 3,
    title: 'Minor Bleeding — Conservative Measures',
    body: '**For blood-tinged sputum without active bleeding:**\n\n**Cold Therapy:**\n• Ice chips\n• Cold fluids (if alert and able to swallow)\n• Ice pack to neck (external)\n\n**Positioning:**\n• Upright or side-lying\n• Avoid supine (aspiration risk)\n\n**Avoid:**\n• Coughing, straining\n• Hot foods/drinks\n• NSAIDs\n\n**Hydrogen Peroxide Gargle:**\n• 3% H2O2 diluted 1:6 with water\n• 20mL gargle (do NOT swallow)\n• **Evidence: NO proven benefit** (10-year retrospective showed no difference)\n• Common practice but NOT evidence-supported\n\n**Observation:**\n• Minimum 4-6 hours\n• If no recurrence → may discharge with close follow-up',
    citation: [2, 7],
    next: 'pth-observation',
    summary: 'Cold therapy, positioning, avoid straining; H2O2 gargle NOT proven effective; observe 4-6h',
  },

  {
    id: 'pth-hemostasis-choice',
    type: 'question',
    module: 3,
    title: 'Hemostatic Intervention',
    body: '[Hemostatic Options](#/info/pth-hemostasis)\n\n**Available Interventions:**\n\n**1. Silver Nitrate Cautery:**\n• 81.4% initial control\n• But 19.3% rebleed → still need OR\n• Best for: older cooperative children, non-brisk bleeding\n• NOT for active hemorrhage or fresh clot\n\n**2. Tranexamic Acid (TXA):**\n• Emerging evidence — increasingly used\n• IV or nebulized\n• May reduce need for operative management\n• See TXA protocol\n\n**3. Direct Pressure:**\n• Difficult in children\n• May temporize before OR\n\n**Which approach?**',
    citation: [5, 8, 9],
    options: [
      {
        label: 'Silver Nitrate (Cooperative Child)',
        next: 'pth-silver-nitrate',
      },
      {
        label: 'TXA Protocol',
        next: 'pth-txa',
      },
      {
        label: 'Proceed to ENT/OR',
        next: 'pth-ent-criteria',
      },
    ],
    summary: 'Silver nitrate: 81% initial control but 19% rebleed; TXA emerging; direct pressure temporizes',
  },

  {
    id: 'pth-silver-nitrate',
    type: 'result',
    module: 3,
    title: 'Silver Nitrate Cautery',
    body: '**Bedside Silver Nitrate Application:**\n\n**Indications:**\n• Older cooperative child/teenager\n• Non-brisk bleeding with visible source\n• NO active hemorrhage or fresh clot\n\n**Technique:**\n• Apply silver nitrate stick directly to bleeding site\n• Hold for 10-15 seconds\n• May need multiple applications\n\n**Success Rate:**\n• 81.4% achieve initial hemostasis\n• BUT 19.3% still require operative control\n• No statistical difference in final OR rate vs observation alone\n\n**After Successful Cautery:**\n• Observe minimum 12-24 hours\n• NPO initially, then clear liquids\n• ENT follow-up\n\n**If Cautery Fails:**\n• Proceed to TXA trial\n• Or direct to OR\n\n**⚠️ Do NOT attempt if:**\n• Active brisk bleeding\n• Fresh clot present\n• Uncooperative child\n• Signs of hemodynamic instability',
    citation: [8],
    recommendation: 'Silver nitrate for cooperative child with non-brisk bleeding. 81% initial success but 19% rebleed.',
    confidence: 'consider',
    summary: 'Silver nitrate: 81% initial control, 19% rebleed; only for cooperative child, non-brisk bleeding',
  },

  // =====================================================================
  // MODULE 4: TRANEXAMIC ACID
  // =====================================================================

  {
    id: 'pth-txa',
    type: 'result',
    module: 4,
    title: 'Tranexamic Acid (TXA) Protocol',
    body: '[TXA Dosing](#/info/pth-txa)\n\n**⚡ EMERGING EVIDENCE — Increasingly Used**\n\n**Mechanism:** Antifibrinolytic — stabilizes clot\n\n**Dosing (Weight-Based):**\n\n**IV Administration:**\n• 10-15 mg/kg IV bolus (max 1000mg)\n• Can repeat q8h (max 30 mg/kg/day or 3000mg/day)\n\n**Nebulized (for active hemorrhage):**\n• 500mg in 5mL NS\n• Nebulize over 15-20 minutes\n• Case reports show effectiveness\n\n**Evidence:**\n• Perioperative TXA reduces intraoperative blood loss\n• Therapeutic use in PTH: growing single-center data shows decreased OR need\n• 2024-2025 scoping reviews support use\n• NOT yet in AAO-HNS guidelines but evidence accumulating\n\n**Safety:**\n• No increase in thromboembolic events in pediatric data\n• Seizure risk is dose-dependent with identifiable risk factors\n\n**Contraindications:**\n• Active thromboembolic disease\n• History of seizures (relative)\n• Subarachnoid hemorrhage',
    citation: [5, 9, 10],
    recommendation: 'TXA 10-15 mg/kg IV (max 1g) or 500mg nebulized. Emerging evidence supports use. May reduce OR need.',
    confidence: 'recommended',
    summary: 'TXA: 10-15 mg/kg IV (max 1g) or 500mg nebulized; emerging evidence; may reduce OR need',
  },

  // =====================================================================
  // MODULE 5: AIRWAY MANAGEMENT
  // =====================================================================

  {
    id: 'pth-airway',
    type: 'info',
    module: 5,
    title: 'Airway Considerations',
    body: '[PTH Airway](#/info/pth-airway)\n\n**⚠️ MOST DEATHS FROM ASPIRATION, NOT EXSANGUINATION**\n\nFatality analysis: aspiration contributed to ~50% of deaths.\n\n**Pre-Intubation:**\n• Keep upright if conscious (reduces aspiration)\n• Suction immediately available\n• Avoid manipulation that dislodges clots\n• Senior provider should intubate\n\n**Difficult Intubation Risk:**\n• 2.7% in surgical cohort\n• Usually due to blood in upper airway, not anatomic\n• Hypoxia during induction MORE common than aspiration in peds\n\n**Approach Options:**\n\n**1. RSI with Cricoid Pressure (Traditional):**\n• Standard approach\n• Risk of hypoxia during apnea\n\n**2. Controlled RSI with Gentle Mask Ventilation:**\n• Low-pressure (<12 cmH2O) ventilation before laryngoscopy\n• May be preferred for slow venous bleed\n• Avoids apnea, allows oxygenation\n\n**Equipment Ready:**\n• Video laryngoscope\n• Bougie\n• Suction (working)\n• Difficult airway cart\n• Surgical airway backup (rare but possible)',
    citation: [6, 11],
    next: 'pth-ent-criteria',
    summary: 'Main risk = aspiration; 2.7% difficult intubation; senior provider; have VL/bougie/suction ready',
  },

  {
    id: 'pth-ent-criteria',
    type: 'question',
    module: 5,
    title: 'ENT/OR Decision',
    body: '**When to call ENT IMMEDIATELY:**\n• ALL post-tonsillectomy bleeding within 3 weeks\n• Fresh blood from operative site\n• Any active hemorrhage\n\n**GO TO OR IMMEDIATELY IF:**\n• Active, brisk hemorrhage\n• Fresh clot in tonsillar fossa with active bleeding\n• Failed bedside hemostatic measures\n• Airway compromise\n• Signs of shock\n\n**OBSERVATION ACCEPTABLE IF:**\n• Non-brisk ooze, stable vitals\n• No active bleeding on exam\n• Blood-tinged sputum only\n• Cooperative older child\n\n**Any fresh bleeding from throat warrants 12-24h observation minimum**, even if stopped.\n\n**What is the decision?**',
    citation: [2, 4],
    options: [
      {
        label: 'OR — Active Bleeding/Unstable',
        next: 'pth-to-or',
      },
      {
        label: 'Observation — Stable, Non-Brisk',
        next: 'pth-observation',
      },
    ],
    summary: 'OR: brisk bleed, clot + active hemorrhage, airway threat, shock; observe if stable, non-brisk',
  },

  {
    id: 'pth-to-or',
    type: 'result',
    module: 5,
    title: 'Proceeding to OR',
    body: '**Preparation for OR:**\n\n**Notify:**\n• ENT surgeon\n• Anesthesia\n• OR staff\n\n**Pre-Op:**\n• Large-bore IV × 2\n• Type & crossmatch (if not already)\n• Blood products available\n• NPO (already in effect)\n\n**Airway Plan:**\n• Senior anesthesiologist\n• RSI with cricoid pressure OR controlled RSI\n• Video laryngoscope available\n• Suction ready\n• Deep plane of anesthesia before laryngoscopy\n\n**In OR:**\n• Suction/cautery of bleeding site\n• May need direct visualization and ligation\n• Rarely requires external approach\n\n**Post-Op:**\n• ICU observation if significant hemorrhage\n• Monitor for rebleeding\n• Continue antibiotics (if started)\n• Oral intake when awake and stable\n\n**Reoperation Rate:** 0.92%\n**Rehospitalization Rate:** 0.88%',
    citation: [2, 6, 11],
    recommendation: 'OR for active bleeding. Senior anesthesia, RSI, VL ready. Post-op ICU if significant hemorrhage.',
    confidence: 'definitive',
    summary: 'OR: senior anesthesia, RSI + VL, suction ready; post-op ICU if significant; reop rate 0.92%',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'pth-observation',
    type: 'question',
    module: 6,
    title: 'Observation Protocol',
    body: '**Observation for Stable Patient:**\n\n**Duration:**\n• Minimum 4-6 hours for minor bleeding\n• 12-24 hours for any active bleeding that stopped\n\n**Monitoring:**\n• Frequent vitals\n• Repeat Hgb if significant blood loss\n• Watch for recurrence\n\n**NPO Initially, Then:**\n• Ice chips\n• Clear cold liquids if stable\n• Advance as tolerated\n\n**Activity:**\n• Bed rest\n• Avoid straining, coughing\n• HOB elevated\n\n**Blood Products:**\n• Transfuse if Hgb <7 g/dL (stable) or <10 g/dL (active bleeding/shock)\n• Pediatric threshold: 7 g/dL for stable, non-bleeding\n\n**After Observation Period:**',
    citation: [2, 4, 12],
    options: [
      {
        label: 'No Recurrence — Discharge',
        next: 'pth-discharge',
      },
      {
        label: 'Rebleeding — Escalate',
        next: 'pth-hemostasis-choice',
      },
    ],
    summary: 'Observe 4-6h (minor) to 12-24h (active stopped); NPO then clear liquids; transfuse if Hgb <7',
  },

  {
    id: 'pth-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge Criteria & Instructions',
    body: '**Discharge Criteria:**\n• No bleeding for minimum 4-6 hours (minor) or 12-24 hours (moderate)\n• Hemodynamically stable\n• Tolerating oral fluids\n• Reliable caregivers\n• Close follow-up available\n• Access to emergency care\n\n**Discharge Instructions:**\n\n**Activity:**\n• Rest for 24-48 hours\n• No strenuous activity for 1 week\n• No contact sports until cleared by ENT\n\n**Diet:**\n• Cold, soft foods\n• Avoid hot, spicy, acidic foods\n• Avoid crunchy/sharp foods (chips, toast)\n• Increase fluids\n\n**Medications:**\n• Avoid NSAIDs (increases bleeding risk)\n• Acetaminophen for pain\n• Complete any antibiotics if prescribed\n\n**Return Immediately If:**\n• Any new bleeding\n• Spitting up blood\n• Difficulty breathing\n• Dizziness or lightheadedness\n• Fever\n\n**Follow-up:**\n• ENT surgeon within 1-2 days\n• Earlier if any concerns',
    citation: [2, 4],
    recommendation: 'Discharge if no bleeding 4-24h, stable, tolerating PO. Avoid NSAIDs. Return for any new bleeding.',
    confidence: 'recommended',
    summary: 'Discharge: no bleeding 4-24h, stable, PO tolerated; avoid NSAIDs; return for any new bleeding; ENT f/u 1-2d',
  },

  {
    id: 'pth-admit',
    type: 'result',
    module: 6,
    title: 'Admission Criteria',
    body: '**Admit for Observation If:**\n• Any active bleeding (even if stopped)\n• Hemoglobin <10 g/dL\n• Required blood transfusion\n• Hemostatic intervention performed\n• Young child (higher aspiration risk)\n• Unreliable follow-up or distant from hospital\n• Coagulopathy\n• Parental/caregiver anxiety\n\n**Admission Orders:**\n• NPO initially\n• IV fluids (maintenance)\n• Frequent vitals (q1-2h initially)\n• Strict intake/output\n• Serial Hgb if significant blood loss\n• ENT consultation (if not already)\n• Activity: bed rest, HOB elevated\n\n**Watch For:**\n• Recurrent bleeding (7.1% rebleed rate)\n• Signs of airway compromise\n• Hemodynamic instability\n\n**Escalation:**\n• Fresh bleeding → ENT bedside\n• Unstable → OR\n\n**Average Hospital Stay for PTH:** 1.6-1.7 days',
    citation: [2, 4],
    recommendation: 'Admit for active bleeding, Hgb <10, transfusion, young child, unreliable follow-up. Average stay 1.6 days.',
    confidence: 'recommended',
    summary: 'Admit if: active bleed, Hgb <10, transfusion, young child, unreliable f/u; 7.1% rebleed; avg stay 1.6d',
  },

  {
    id: 'pth-blood-products',
    type: 'info',
    module: 6,
    title: 'Blood Product Considerations',
    body: '[Pediatric Transfusion](#/info/pth-transfusion)\n\n**Transfusion Thresholds (Pediatric):**\n\n**Standard (Stable, Not Actively Bleeding):**\n• Hemoglobin <7 g/dL\n• Post-transfusion goal: 7.0-9.5 g/dL\n\n**Active Bleeding/Shock:**\n• Hemoglobin <10 g/dL\n• More liberal threshold justified\n\n**Special Populations:**\n• Cyanotic heart disease: maintain >10 g/dL\n• Sickle cell: pre-op transfuse to 9-11.5 g/dL\n\n**Volume:**\n• 10-15 mL/kg pRBCs\n• Should raise Hgb ~2-3 g/dL\n\n**Most PTH patients do NOT require transfusion.**\n\n**Massive Transfusion (Rare):**\n• If >40 mL/kg pRBCs anticipated\n• Activate massive transfusion protocol\n• Consider FFP, platelets in 1:1:1 ratio',
    citation: [12],
    next: 'pth-observation',
    summary: 'Transfuse if Hgb <7 (stable) or <10 (bleeding); 10-15 mL/kg pRBCs; most PTH do NOT need transfusion',
  },

];

// =====================================================================
// CITATIONS
// =====================================================================

export const PTH_CITATIONS: Citation[] = [
  { num: 1, text: 'Mitchell RB, et al. Clinical Practice Guideline: Tonsillectomy in Children (Update). Otolaryngol Head Neck Surg. 2019;160(1_suppl):S1-S42.' },
  { num: 2, text: 'Sarny S, et al. Post-tonsillectomy hemorrhage in children: a comprehensive review. Pediatrics. 2023;152(4):e2023062.' },
  { num: 3, text: 'Windfuhr JP, et al. Post-tonsillectomy hemorrhage — Still a challenge to the surgeon. Auris Nasus Larynx. 2018;45(1):67-73.' },
  { num: 4, text: 'Wall JJ, et al. Post-Tonsillectomy Hemorrhage: A Three-Pronged Approach. ACEP Now. 2021.' },
  { num: 5, text: 'Rollins MD, et al. Use of Tranexamic Acid for Post-tonsillectomy Hemorrhage: A Scoping Review. Ann Otol Rhinol Laryngol. 2025;134(2):167-178.' },
  { num: 6, text: 'Fields RG, et al. Pediatric anesthesia management for post-tonsillectomy hemorrhage. Paediatr Anaesth. 2022;32(2):139-147.' },
  { num: 7, text: 'Mathiasen RA, et al. Hydrogen peroxide in post-tonsillectomy hemorrhage: A 10-year review. Otolaryngol Head Neck Surg. 2005;133(2):P82.' },
  { num: 8, text: 'Shay S, et al. Efficacy of silver nitrate cauterization for post-tonsillectomy hemorrhage. Int J Pediatr Otorhinolaryngol. 2022;155:111101.' },
  { num: 9, text: 'Iowa Head and Neck Protocols. Tonsillectomy Bleed Management Including TXA Dosing. University of Iowa. 2024.' },
  { num: 10, text: 'Chan DK, et al. Efficacy of Tranexamic Acid in Pediatric Tonsillectomy: A Meta-Analysis. Otolaryngol Head Neck Surg. 2024;171(3):789-799.' },
  { num: 11, text: 'Windfuhr JP, et al. Serious post-tonsillectomy hemorrhage with and without lethal outcome in children and adolescents. Int J Pediatr Otorhinolaryngol. 2008;72(7):1029-1040.' },
  { num: 12, text: 'Texas Children\'s Hospital. Red Blood Cell Transfusion Evidence-Based Guideline. 2023.' },
];
