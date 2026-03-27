// MedKitt — Carbon Monoxide Toxicity
// Occult poisoning from fires, furnaces, generators. Pulse ox FALSELY NORMAL. HBO for severe cases.
// 8 modules: Recognition & Epidemiology → Clinical Severity → Diagnostic Workup → Oxygen Therapy → HBO Therapy → Special Populations → Delayed Neurologic Sequelae → Disposition
// 28 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const CO_TOXICITY_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & EPIDEMIOLOGY
  // =====================================================================

  {
    id: 'co-start',
    type: 'question',
    module: 1,
    title: 'Carbon Monoxide Toxicity — Recognition',
    body: '[CO Toxicity Overview](#/info/co-overview)\n\nCarbon monoxide (CO) is a colorless, odorless gas that binds hemoglobin with **240× greater affinity than oxygen**. CO poisoning causes ~50,000 ED visits and ~400 deaths annually in the US. [1][2]\n\n**Common sources:**\n• Fires and smoke inhalation\n• Furnaces, water heaters, space heaters (especially in winter)\n• Portable generators (garage, enclosed space)\n• Car exhaust in enclosed spaces\n• Charcoal grills/hibachis used indoors\n• Hookah smoking\n\n**Seasonal pattern:** More common in winter months due to heating systems and generator use during power outages. [2]\n\n⚠️ **"Occult CO" cluster:** Multiple patients from the same household presenting with headache, nausea, or "flu-like" symptoms — **think CO poisoning!** [1]\n\nWhat is the clinical presentation?',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'co-level', label: 'COHb Level Interpretation' },
      { id: 'co-hbo', label: 'HBO Criteria Checker' },
      { id: 'co-half-life', label: 'COHb Half-Life Calculator' },
      { id: 'co-pregnancy', label: 'Pregnancy-Specific Guidance' },
      { id: 'co-cyanide', label: 'Cyanide Co-Exposure Checklist' },
    ],
    options: [
      {
        label: 'Mild Symptoms',
        description: 'Headache, nausea, dizziness, fatigue — alert and oriented',
        next: 'co-mild',
      },
      {
        label: 'Moderate Symptoms',
        description: 'Confusion, syncope, chest pain, dyspnea, tachycardia',
        next: 'co-moderate',
        urgency: 'urgent',
      },
      {
        label: 'Severe / Critical',
        description: 'Seizures, coma, arrhythmias, cardiac ischemia',
        next: 'co-severe',
        urgency: 'critical',
      },
      {
        label: 'Asymptomatic / Incidental Finding',
        description: 'Elevated COHb on routine labs, no symptoms',
        next: 'co-asymptomatic',
      },
      {
        label: 'Pregnant Patient',
        description: 'Any CO exposure in pregnancy — special considerations',
        next: 'co-pregnancy',
        urgency: 'urgent',
      },
      {
        label: 'Fire / Smoke Inhalation',
        description: 'Consider cyanide co-intoxication',
        next: 'co-fire',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'co-recognition',
    type: 'info',
    module: 1,
    title: 'Clinical Recognition — Key Pitfalls',
    body: '**Classic triad:** Headache, nausea, dizziness — but these are **nonspecific!** CO poisoning is frequently missed because symptoms mimic viral illness, migraine, or food poisoning. [1]\n\n**Cherry red skin:** This finding is **RARE** and usually seen **postmortem**. Do NOT rely on this for diagnosis. [2]\n\n⚠️ **Pulse oximetry is FALSELY NORMAL** — standard pulse ox cannot distinguish carboxyhemoglobin (COHb) from oxyhemoglobin (O2Hb). A patient with severe CO poisoning will have SpO2 reading 98-100%! [1][3]\n\n**High-risk scenarios that should trigger CO testing:**\n• Headache that improves when patient leaves home/workplace\n• Multiple family members or coworkers with similar symptoms\n• Symptoms in winter with gas heating\n• Symptoms after generator use, fire exposure, or car in garage\n• Suicide attempt in enclosed space with running vehicle [2]',
    citation: [1, 2, 3],
    next: 'co-workup',
  },

  // =====================================================================
  // MODULE 2: CLINICAL SEVERITY
  // =====================================================================

  {
    id: 'co-mild',
    type: 'info',
    module: 2,
    title: 'Mild CO Toxicity (COHb 10-20%)',
    body: '**Typical symptoms:**\n• Headache (most common complaint, often described as "throbbing")\n• Nausea and vomiting\n• Dizziness, lightheadedness\n• Fatigue, malaise\n• Difficulty concentrating\n\n**Physical exam:** Usually unremarkable. Patient is alert and oriented. Vital signs may be normal or show mild tachycardia.\n\n⚠️ **Important:** COHb level does NOT correlate well with symptoms or prognosis. A patient with COHb of 15% may be more symptomatic than one with 25%. More important prognostic factors: [2][3]\n• **Duration of exposure**\n• **Loss of consciousness** (even briefly)\n• **Neurologic symptoms** (confusion, ataxia)\n• **Age >36 years**\n\nMild symptoms with no LOC and no neurologic findings = favorable prognosis with NBO therapy.',
    citation: [2, 3],
    next: 'co-workup',
  },

  {
    id: 'co-moderate',
    type: 'info',
    module: 2,
    title: 'Moderate CO Toxicity (COHb 20-40%)',
    body: '**Symptoms:**\n• Confusion, disorientation, impaired judgment\n• Syncope or near-syncope\n• Chest pain (myocardium is highly sensitive to hypoxia)\n• Dyspnea, tachypnea\n• Tachycardia, palpitations\n• Visual disturbances\n• Ataxia, weakness\n\n**Physical exam:**\n• Altered mental status (GCS may be decreased)\n• Tachycardia\n• Tachypnea\n• May have ECG changes (ischemia, arrhythmias)\n\n⚠️ **Any loss of consciousness — even transient — is an indication for HBO evaluation.** [3][4]\n\n**Cardiac effects:** CO causes direct myocardial toxicity AND reduces oxygen delivery. Troponin elevation is common and correlates with worse outcomes. [2]',
    citation: [2, 3, 4],
    next: 'co-workup',
  },

  {
    id: 'co-severe',
    type: 'info',
    module: 2,
    title: 'Severe CO Toxicity (COHb >40%)',
    body: '**⚠️ CRITICAL — Immediate intervention required**\n\n**Symptoms:**\n• Seizures\n• Coma (GCS ≤8)\n• Cardiac arrhythmias (VT, VF, heart block)\n• Myocardial infarction\n• Cardiovascular collapse\n• Respiratory failure\n• Death\n\n**Immediate actions:**\n1. **100% O2 via NRB or BVM** — do not wait for COHb confirmation\n2. **Intubate** if GCS ≤8 or airway compromise\n3. **Cardiac monitoring** — treat arrhythmias per ACLS\n4. **12-lead ECG** — look for ischemia\n5. **Contact hyperbaric center immediately**\n\n⚠️ **COHb level may be misleadingly low** if significant time has elapsed since exposure or if patient received O2 en route. Treat based on clinical presentation, NOT just COHb level. [1][3]\n\n**HBO is strongly indicated** for severe toxicity. Begin transfer arrangements early.',
    citation: [1, 3],
    next: 'co-workup',
  },

  {
    id: 'co-asymptomatic',
    type: 'info',
    module: 2,
    title: 'Asymptomatic / Incidental Elevated COHb',
    body: '**Incidentally elevated COHb without symptoms:**\n\n**Normal COHb levels:**\n• Non-smoker: <3%\n• Smoker: up to 10% (can be higher in heavy smokers)\n• Urban environment: may have slightly elevated baseline [1]\n\n**If COHb is elevated but patient is asymptomatic:**\n1. Confirm no subtle neurologic symptoms (formal cognitive testing)\n2. Identify and remove from CO source\n3. Apply 100% O2 via NRB\n4. Repeat COHb in 2-4 hours to confirm declining\n5. ECG and troponin to assess cardiac effects\n\n**Low-risk if:**\n• No symptoms\n• No LOC history\n• COHb <10% in non-smoker\n• Normal ECG and troponin\n• Clear source identified and eliminated\n\n**Still need observation** until COHb normalizes (<3%) and asymptomatic.',
    citation: [1],
    next: 'co-workup',
  },

  // =====================================================================
  // MODULE 3: DIAGNOSTIC WORKUP
  // =====================================================================

  {
    id: 'co-workup',
    type: 'info',
    module: 3,
    title: 'Diagnostic Workup',
    body: '**Essential labs:**\n\n**COHb level (co-oximetry):**\n• **Venous or arterial — both are accurate** (venous is easier)\n• Standard ABG and pulse ox CANNOT detect CO — must use co-oximetry [1][3]\n• Normal non-smoker: <3%\n• Smoker: up to 10%\n• Symptomatic: usually >10%\n\n**Cardiac:**\n• **ECG:** Ischemia (ST changes, TWI), arrhythmias — myocardium is highly sensitive to hypoxia\n• **Troponin:** Elevated troponin = worse prognosis, consider HBO even with lower COHb [2][3]\n\n**Metabolic:**\n• **BMP:** Check for metabolic acidosis, lactate elevation\n• **Lactate:** Elevated lactate indicates tissue hypoxia, correlates with severity\n• **VBG/ABG:** pH, lactate; PaO2 will be NORMAL (O2 dissolved in plasma unaffected)\n\n**Additional:**\n• **Pregnancy test** in women of childbearing age — fetal Hb has higher CO affinity\n• **Salicylate level** if coingestant concern\n\n⚠️ **Fire/smoke victims:** Consider cyanide co-exposure.',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'co-level', label: 'COHb Level Interpretation' },
    ],
    next: 'co-treatment-start',
  },

  // =====================================================================
  // MODULE 4: TREATMENT - OXYGEN THERAPY
  // =====================================================================

  {
    id: 'co-treatment-start',
    type: 'question',
    module: 4,
    title: 'Initial Treatment — 100% Oxygen',
    body: '**Immediate treatment for ALL suspected CO poisoning:**\n\n**100% O2 via non-rebreather mask (NRB) or BVM** — start immediately, do not wait for lab confirmation. [1][3]\n\n**COHb half-life:** [1][2]\n• Room air (21% O2): **4-6 hours**\n• 100% O2 via NRB: **60-90 minutes**\n• HBO at 2.5-3 ATA: **20-30 minutes**\n\n**Continue 100% O2 until:**\n• COHb <5% AND\n• Completely asymptomatic\n\n**Intubation indications:**\n• GCS ≤8\n• Respiratory distress/failure\n• Airway compromise\n• Need for airway protection (vomiting, secretions)\n\nDoes this patient meet HBO criteria?',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'co-half-life', label: 'COHb Half-Life Calculator' },
    ],
    options: [
      {
        label: 'Assess for HBO Indications',
        description: 'Evaluate criteria for hyperbaric oxygen therapy',
        next: 'co-hbo-criteria',
      },
      {
        label: 'Mild Case — NBO Adequate',
        description: 'No LOC, no neuro symptoms, no cardiac involvement, COHb <25%',
        next: 'co-nbo-protocol',
      },
      {
        label: 'Needs Intubation',
        description: 'GCS ≤8, respiratory failure, or airway compromise',
        next: 'co-intubation',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'co-nbo-protocol',
    type: 'info',
    module: 4,
    title: 'Normobaric Oxygen (NBO) Protocol',
    body: '**NBO therapy for mild CO poisoning without HBO indications:**\n\n**100% O2 via non-rebreather mask (NRB)** at 15 L/min to maintain reservoir bag inflation.\n\n**Duration:** Continue until:\n• COHb <5% (or <3% ideally) AND\n• Completely asymptomatic\n\n**Monitoring:**\n• Repeat COHb every 2-4 hours until normalized\n• Serial neuro checks\n• Cardiac monitoring (telemetry)\n• Repeat ECG if any cardiac symptoms\n\n**Expected timeline:**\n• COHb should decrease by ~50% every 60-90 minutes on 100% O2\n• Most patients clear CO within 4-6 hours on NBO\n\n**If symptoms persist or worsen despite 4-6 hours of NBO → reassess for HBO.** [1][3]\n\n⚠️ Do not discharge until COHb <5%, asymptomatic, and source addressed.',
    citation: [1, 3],
    treatment: {
      firstLine: {
        drug: 'Oxygen',
        dose: '100%',
        route: 'Inhalation via NRB',
        frequency: 'Continuous',
        duration: 'Until COHb <5% AND asymptomatic',
        notes: 'Flow rate 15 L/min to maintain reservoir bag inflation. Expected COHb half-life 60-90 minutes.',
      },
      monitoring: 'COHb q2-4h, continuous cardiac monitoring, serial neuro checks, ECG if cardiac symptoms.',
    },
    next: 'co-disposition',
  },

  {
    id: 'co-intubation',
    type: 'info',
    module: 4,
    title: 'Intubation — Airway Management',
    body: '**Intubation indications:**\n• GCS ≤8\n• Respiratory failure (hypoxemia, hypercarbia, fatigue)\n• Airway compromise (secretions, vomiting, burns)\n• Unable to tolerate NRB mask\n• Need for transfer to HBO facility\n\n**Post-intubation:**\n• **FiO2 100%** — continue high-flow oxygen\n• Ventilator settings: target normal PaCO2 (avoid hyperventilation)\n• PEEP as needed for oxygenation\n\n**If fire/smoke inhalation:**\n• Assess for thermal airway injury (singed nasal hairs, facial burns, carbonaceous sputum)\n• Early intubation for airway edema concern\n• Consider bronchoscopy if significant inhalation injury\n\n**HBO while intubated:**\n• Intubation is NOT a contraindication to HBO\n• Most HBO chambers can accommodate intubated patients\n• Contact receiving hyperbaric facility early [3][4]',
    citation: [3, 4],
    next: 'co-hbo-criteria',
  },

  // =====================================================================
  // MODULE 5: HYPERBARIC OXYGEN (HBO) THERAPY
  // =====================================================================

  {
    id: 'co-hbo-criteria',
    type: 'question',
    module: 5,
    title: 'HBO Criteria — Does Patient Qualify?',
    body: '[HBO Criteria Overview](#/info/co-hbo-overview)\n\n**HBO accelerates CO elimination** (half-life ~20-30 min at 2.5-3 ATA) and may reduce delayed neurologic sequelae (DNS). [3][4]\n\n**Indications for HBO (ANY ONE of the following):**\n\n✓ **Loss of consciousness** at any time (even transient)\n✓ **COHb >25%** (some sources say >25-40%)\n✓ **Pregnancy** with COHb >15% or any fetal distress\n✓ **Neurologic symptoms:** confusion, ataxia, seizure, focal deficits\n✓ **Cardiac ischemia or arrhythmia:** chest pain, troponin elevation, ECG changes\n✓ **Persistent symptoms** despite 4-6 hours of NBO\n✓ **Severe metabolic acidosis** (pH <7.1)\n\n**Weiss Criteria (commonly used):** [4]\n• LOC\n• COHb >25%\n• Metabolic acidosis (base deficit >2)\n• Age >36 years',
    citation: [3, 4],
    calculatorLinks: [
      { id: 'co-hbo', label: 'HBO Criteria Checker' },
    ],
    options: [
      {
        label: 'HBO Indicated — Arrange Transfer',
        description: 'Patient meets one or more HBO criteria',
        next: 'co-hbo-protocol',
        urgency: 'urgent',
      },
      {
        label: 'HBO Not Indicated — Continue NBO',
        description: 'No LOC, no neuro symptoms, no cardiac involvement, COHb <25%',
        next: 'co-nbo-protocol',
      },
      {
        label: 'Pregnant Patient',
        description: 'Lower threshold for HBO in pregnancy',
        next: 'co-pregnancy',
        urgency: 'urgent',
      },
      {
        label: 'Uncertain — Contact Hyperbaric Center',
        description: 'Discuss with hyperbaric medicine specialist',
        next: 'co-hbo-contact',
      },
    ],
  },

  {
    id: 'co-hbo-protocol',
    type: 'info',
    module: 5,
    title: 'HBO Protocol & Transfer',
    body: '**HBO mechanism:** [3][4]\n• Accelerates CO elimination (half-life ~20-30 min)\n• Increases dissolved O2 in plasma\n• Reduces cerebral edema\n• May prevent/reduce delayed neurologic sequelae (DNS)\n\n**Standard HBO protocol:**\n• Pressure: **2.5-3 ATA**\n• Duration: **90-120 minutes** per session\n• Sessions: **1-3 treatments** (controversial; some give single treatment, others repeat x3)\n\n**Timing matters:**\n• **Most effective within 6 hours** of exposure\n• **May still help up to 24 hours** after exposure\n• Beyond 24 hours: benefit uncertain but may still consider for severe cases [4]\n\n**Relative contraindications:**\n• Untreated pneumothorax (absolute)\n• Active bleomycin or doxorubicin chemotherapy\n• Severe COPD with CO2 retention\n• Claustrophobia (can sedate)\n\n**Continue 100% O2** during transport to HBO facility.',
    citation: [3, 4],
    next: 'co-hbo-contact',
  },

  {
    id: 'co-hbo-contact',
    type: 'info',
    module: 5,
    title: 'Contacting Hyperbaric Center',
    body: '**Contact hyperbaric center EARLY** — transfer arrangements take time.\n\n**Information to provide:**\n• Patient age, weight\n• Time and source of CO exposure\n• Peak COHb level and current level\n• Any loss of consciousness\n• Neurologic symptoms\n• Cardiac involvement (troponin, ECG)\n• Pregnancy status\n• Metabolic acidosis (pH, lactate)\n• Airway status (intubated?)\n• Time since exposure began\n\n**Hyperbaric center locator:**\n• **Divers Alert Network (DAN):** 1-919-684-9111 (24/7)\n• **Undersea & Hyperbaric Medical Society:** www.uhms.org\n• Contact your regional poison control: **1-800-222-1222**\n\n⚠️ **Do not delay transfer** — continue 100% O2 during transport. HBO benefit decreases with time since exposure.',
    citation: [4],
    next: 'co-dns',
  },

  // =====================================================================
  // MODULE 6: SPECIAL POPULATIONS
  // =====================================================================

  {
    id: 'co-pregnancy',
    type: 'info',
    module: 6,
    title: 'CO Toxicity in Pregnancy',
    body: '**⚠️ PREGNANCY = HIGH RISK**\n\n**Fetal vulnerability:** [2][3]\n• Fetal hemoglobin (HbF) binds CO **more tightly** than adult Hb\n• Fetal COHb levels are **10-15% higher** than maternal levels\n• Fetal COHb elimination takes **~5× longer** than maternal\n• CO crosses placenta freely\n\n**Risks:**\n• Fetal hypoxia even with mild maternal symptoms\n• Fetal demise\n• Developmental abnormalities (with early exposure)\n• Neurologic injury\n\n**Lower HBO threshold in pregnancy:**\n• COHb **>15%** (vs >25% in non-pregnant)\n• **Any loss of consciousness**\n• **Any fetal distress** (abnormal FHR, decelerations)\n• **Any neurologic symptoms**\n\n**HBO is safe in pregnancy** and may be fetal-protective. The risk of NOT treating outweighs HBO risks.\n\n**OB consultation** for fetal monitoring. Continue 100% O2 until both mother AND fetus are cleared.',
    citation: [2, 3],
    calculatorLinks: [
      { id: 'co-pregnancy', label: 'Pregnancy-Specific Guidance' },
    ],
    next: 'co-hbo-criteria',
  },

  {
    id: 'co-fire',
    type: 'info',
    module: 6,
    title: 'Fire / Smoke Inhalation — Cyanide Co-Exposure',
    body: '**⚠️ Fire victims: Consider cyanide (CN) co-intoxication**\n\nCyanide is produced by combustion of synthetic materials (plastics, wool, silk, nylon). CN and CO are synergistically toxic. [1][2]\n\n**Suspect cyanide if:**\n• Enclosed space fire\n• Soot in airway/carbonaceous sputum\n• Altered mental status out of proportion to COHb\n• Hypotension\n• Severe lactic acidosis (**lactate >10 mmol/L** is highly suggestive)\n• Cardiovascular collapse\n\n**Empiric treatment with Hydroxocobalamin (Cyanokit):**\n• **Dose:** 5g IV over 15 minutes\n• **Indications:** Smoke inhalation + (AMS OR hypotension OR lactate >10)\n• Can give **concurrently with O2 therapy** — does not interfere with CO treatment\n• Safe empiric use; low side effect profile\n\n⚠️ **Hydroxocobalamin interferes with CO-oximetry** for ~24 hours (causes falsely elevated COHb). Draw COHb BEFORE giving hydroxocobalamin if possible.',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'co-cyanide', label: 'Cyanide Co-Exposure Checklist' },
    ],
    treatment: {
      firstLine: {
        drug: 'Hydroxocobalamin (Cyanokit)',
        dose: '5g IV',
        route: 'IV',
        frequency: 'Over 15 minutes',
        duration: 'Single dose; may repeat 5g if needed',
        notes: 'Empiric for smoke inhalation + AMS/hypotension/lactate >10. Interferes with CO-oximetry for ~24h.',
      },
      monitoring: 'Lactate (should decrease after treatment), blood pressure, mental status. COHb unreliable for ~24h post-administration.',
    },
    next: 'co-hbo-criteria',
  },

  // =====================================================================
  // MODULE 7: DELAYED NEUROLOGIC SEQUELAE (DNS)
  // =====================================================================

  {
    id: 'co-dns',
    type: 'info',
    module: 7,
    title: 'Delayed Neurologic Sequelae (DNS)',
    body: '**DNS occurs in 10-30% of patients** with significant CO exposure. [2][3]\n\n**Timeline:** Symptoms appear **2-40 days** after apparent recovery (most within 2-3 weeks).\n\n**Manifestations:**\n• Cognitive impairment (memory, concentration, executive function)\n• Personality changes (irritability, apathy, depression)\n• Movement disorders (parkinsonism, chorea)\n• Gait disturbances\n• Incontinence\n• Dementia-like syndrome\n\n**Risk factors for DNS:**\n• Loss of consciousness during exposure\n• Age >36 years\n• Prolonged exposure\n• Higher COHb levels\n• Metabolic acidosis\n• Delay in treatment\n\n**HBO may reduce DNS risk** — this is one of the primary rationales for HBO therapy, though evidence remains somewhat controversial. Weaver 2002 trial showed HBO reduced cognitive sequelae at 6 weeks and 12 months. [4]\n\n**Follow-up:** Neuropsychological testing recommended for patients with significant exposures. Symptoms may be permanent but some patients recover over months.',
    citation: [2, 3, 4],
    next: 'co-disposition',
  },

  // =====================================================================
  // MODULE 8: DISPOSITION
  // =====================================================================

  {
    id: 'co-disposition',
    type: 'question',
    module: 8,
    title: 'Disposition Decision',
    body: '**Assess for safe discharge vs admission:**\n\n**Discharge criteria (ALL must be met):**\n• Asymptomatic\n• COHb <5%\n• Normal ECG\n• Normal troponin\n• No history of LOC\n• No neurologic symptoms\n• CO source identified and eliminated\n• Safe environment to return to\n\n**Admit if:**\n• Persistent symptoms\n• Any cardiac involvement (troponin elevation, ECG changes)\n• Pregnancy\n• LOC at any time (even if now resolved)\n• Social concerns (intentional exposure, unsafe home)\n• Unable to confirm CO source eliminated\n\n**HBO referral:**\n• If HBO indicated, patient goes to hyperbaric center\n• Post-HBO: typically observe 4-6 hours, then reassess',
    citation: [1, 3],
    options: [
      {
        label: 'Safe to Discharge',
        description: 'All discharge criteria met',
        next: 'co-discharge',
      },
      {
        label: 'Admit for Observation',
        description: 'Persistent symptoms, cardiac involvement, or social concerns',
        next: 'co-admit',
      },
      {
        label: 'Transfer for HBO',
        description: 'HBO indicated — contact hyperbaric center',
        next: 'co-hbo-protocol',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'co-discharge',
    type: 'result',
    module: 8,
    title: 'Discharge Criteria Met',
    body: '**Safe to discharge if ALL criteria met:**\n\n✅ Asymptomatic (no headache, nausea, dizziness, confusion)\n✅ COHb <5% (ideally <3%)\n✅ Normal ECG\n✅ Normal or negative troponin\n✅ No history of LOC\n✅ No neurologic symptoms\n✅ CO source identified and eliminated\n\n**Discharge instructions:**\n\n**1. Do NOT return to the source** until inspected by fire department or utility company and declared safe.\n\n**2. Install CO detectors** on every level of home, especially near bedrooms.\n\n**3. Return precautions — seek care immediately for:**\n• Headache, dizziness, confusion\n• Chest pain\n• Memory problems or personality changes (may occur 2-4 weeks later)\n\n**4. Follow-up:** PCP within 1 week. Consider neuropsychological testing if significant exposure.\n\n**5. Report to public health** if source is a shared dwelling (apartment building).\n\n**Poison Control: 1-800-222-1222**',
    recommendation: 'Discharge with CO detector counseling and return precautions for delayed neurologic symptoms.',
    confidence: 'recommended',
    citation: [1, 3],
  },

  {
    id: 'co-admit',
    type: 'result',
    module: 8,
    title: 'Admission for Observation',
    body: '**Admit for:**\n• Persistent symptoms despite NBO\n• Cardiac involvement (elevated troponin, ECG changes)\n• Pregnancy (OB co-management)\n• History of LOC (monitor for DNS)\n• Social concerns (intentional exposure, unsafe home)\n• Inability to confirm CO source eliminated\n\n**Admission orders:**\n• Continue 100% O2 until COHb <5% and asymptomatic\n• Telemetry monitoring\n• Serial COHb q4-6h until normalized\n• Serial troponin if cardiac concern\n• Neuro checks q4h\n• Repeat ECG if symptoms change\n\n**If post-HBO:**\n• Observe minimum 4-6 hours\n• May need repeat HBO treatment (discuss with hyperbaric medicine)\n• Discharge when asymptomatic with normal labs\n\n**Psychiatric evaluation** if intentional exposure (suicide attempt).\n\n**Social work consultation** if unsafe home environment.',
    recommendation: 'Admit for continued oxygen therapy, cardiac monitoring, and serial COHb levels.',
    confidence: 'recommended',
    citation: [1, 3],
  },

  {
    id: 'co-summary',
    type: 'info',
    module: 8,
    title: 'CO Toxicity — Key Takeaways',
    body: '**Critical points to remember:**\n\n**1. Pulse ox is FALSELY NORMAL** — must use co-oximetry.\n\n**2. Classic symptoms are nonspecific** — headache, nausea, dizziness mimic many conditions.\n\n**3. "Occult CO"** — think CO when multiple household members have flu-like symptoms.\n\n**4. Start 100% O2 immediately** — do not wait for labs.\n\n**5. COHb level does NOT correlate with prognosis** — LOC and neuro symptoms are more predictive.\n\n**6. HBO indications:** LOC, COHb >25%, neurologic symptoms, cardiac involvement, pregnancy with COHb >15%, persistent symptoms after 4-6h NBO.\n\n**7. Pregnancy = lower threshold** — fetal Hb binds CO more tightly, elimination takes 5× longer.\n\n**8. Fire victims** — consider cyanide co-intoxication (hydroxocobalamin 5g IV if AMS/hypotension/lactate >10).\n\n**9. DNS occurs in 10-30%** — warn patients about delayed cognitive/personality changes at 2-40 days.\n\n**10. Prevention:** CO detectors save lives.',
    citation: [1, 2, 3, 4],
    next: 'co-start',
  },

];

export const CO_TOXICITY_NODE_COUNT = CO_TOXICITY_NODES.length;

export const CO_TOXICITY_MODULE_LABELS = [
  'Recognition & Epidemiology',
  'Clinical Severity',
  'Diagnostic Workup',
  'Oxygen Therapy',
  'HBO Therapy',
  'Special Populations',
  'Delayed Neurologic Sequelae',
  'Disposition',
];

export const CO_TOXICITY_CITATIONS: Citation[] = [
  { num: 1, text: 'Weaver LK. Carbon monoxide poisoning. N Engl J Med. 2009;360(12):1217-1225. PMID 19297574' },
  { num: 2, text: 'Rose JJ, et al. Carbon Monoxide Poisoning: Pathogenesis, Management, and Future Directions of Therapy. Am J Respir Crit Care Med. 2017;195(5):596-606. PMID 27753502' },
  { num: 3, text: 'Wolf SJ, et al. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the Emergency Department With Acute Carbon Monoxide Poisoning. Ann Emerg Med. 2017;69(1):98-107.e6. PMID 28040282' },
  { num: 4, text: 'Hampson NB, et al. Practice Recommendations in the Diagnosis, Management, and Prevention of Carbon Monoxide Poisoning. Am J Respir Crit Care Med. 2012;186(11):1095-1101. PMID 23087025' },
];
