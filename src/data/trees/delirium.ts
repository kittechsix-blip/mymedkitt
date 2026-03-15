// MedKitt — Delirium Management
// Initial assessment & safety → Etiology workup → Nonpharmacological → Pharmacological → Monitoring → Disposition.
// 6 modules: Initial Assessment & Safety → Etiology Workup → Nonpharmacological Management → Pharmacological Management → Monitoring → Disposition
// 30 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const DELIRIUM_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT & SAFETY
  // =====================================================================

  {
    id: 'delirium-start',
    type: 'info',
    module: 1,
    title: 'Delirium Management',
    body: '[Delirium Steps Summary](#/info/delirium-summary) — rapid assessment and management pathway.\n\nDelirium is acute brain dysfunction — DSM-5 defines as acute/fluctuating disturbance in attention and cognition. **7-24% of elderly ED patients** have delirium; up to **80% of ICU patients**. Missed diagnosis rate **54-89%**. Mortality comparable to sepsis and MI.\n\nDelirium is a **SYMPTOM** requiring urgent etiology search, not just behavioral management.',
    citation: [1, 3],
    next: 'del-safety',
  },

  {
    id: 'del-safety',
    type: 'info',
    module: 1,
    title: 'Scene Safety & Team Preparation',
    body: 'Personal and team safety first. For agitated patients: remove sharps/equipment from reach, ensure adequate staffing (minimum 5 for physical restraint), activate security if needed. Approach calmly, non-threateningly. One person speaks.\n\n[Verbal De-escalation: 10 Elements](#/info/del-deescalation) — AAEP Project BETA guidelines for engaging the agitated patient.\n\nPosition yourself near the exit. Do not corner the patient. Show of force (security presence) is effective nonpharmacological intervention — avoided sedation in 27% of cases in one study.',
    citation: [8],
    next: 'del-rapid-reversible',
  },

  {
    id: 'del-rapid-reversible',
    type: 'question',
    module: 1,
    title: 'Rapid Reversible Causes',
    body: 'Primary survey: ABCs, vital signs, fingerstick glucose. Check for immediately correctable causes before proceeding with delirium workup.\n\n**Fingerstick glucose** — hypoglycemia is common and immediately reversible. D50W 25g IV if <60 mg/dL.\n\n**SpO2** — supplement O2 if hypoxic. Hypoxia causes direct brain insult.\n\n**Temperature** — fever suggests infection; >104°F (40°C) raises concern for excited delirium syndrome or CNS infection.\n\n**Naloxone** — consider if opioid features present (miosis, respiratory depression, decreased consciousness). 0.4-2 mg IV/IN.\n\n**Thiamine** — give before dextrose in suspected alcohol use disorder to prevent Wernicke encephalopathy.',
    citation: [1, 4],
    options: [
      {
        label: 'Reversible cause identified',
        description: 'Hypoglycemia, hypoxia, opioid toxicity, or hypothermia',
        next: 'del-correct-reversible',
      },
      {
        label: 'No immediate reversible cause',
        description: 'Proceed to delirium screening and subtype assessment',
        next: 'del-screening',
      },
    ],
  },

  {
    id: 'del-correct-reversible',
    type: 'info',
    module: 1,
    title: 'Correct Reversible Cause',
    body: 'Treat the identified cause with standard emergency care:\n\n• **Hypoglycemia:** D50W 25g IV (adults) or D10W 2-5 mL/kg (peds). Recheck glucose in 15 min.\n• **Hypoxia:** Supplemental O2 to SpO2 >94%. Evaluate for pneumonia, PE, CHF.\n• **Opioid toxicity:** Naloxone 0.4-2 mg IV/IN. May repeat q2-3 min. Consider infusion if recurrent (2/3 of effective dose per hour).\n• **Hypothermia:** Active warming. Evaluate for underlying cause.\n• **Hypotension:** IV fluid bolus. Evaluate for sepsis, hemorrhage, cardiac cause.\n\nIf mental status does not improve after correction, proceed with full delirium evaluation — multiple precipitants often coexist.',
    citation: [1],
    next: 'del-screening',
  },

  {
    id: 'del-screening',
    type: 'question',
    module: 1,
    title: 'Delirium Screening & Subtype Assessment',
    body: '**RASS (Richmond Agitation-Sedation Scale)** — assess level of agitation or sedation to determine delirium subtype and guide management.\n\n**CAM (Confusion Assessment Method)** — gold standard ED screening tool. Delirium is present when ALL of:\n1. **Acute onset** or **fluctuating course** (change from baseline)\n2. **Inattention** (unable to recite months backward, spell WORLD backward, or count backward from 20)\nPLUS EITHER:\n3. **Altered level of consciousness** (RASS ≠ 0)\n4. **Disorganized thinking** (incoherent, illogical, or unpredictable thought process)\n\n[CAM & bCAM Screening Guide](#/info/del-cam-guide) — detailed 2-tier screening protocol.\n[Delirium vs Dementia](#/info/del-vs-dementia) — key differentiating features.\n\n**Critical:** Obtain baseline mental status from family/caregivers/prior records. Without baseline, diagnosis is unreliable.',
    citation: [1, 6, 7],
    calculatorLinks: [{ id: 'rass', label: 'RASS Score' }],
    options: [
      {
        label: 'Hypoactive (RASS -1 to -3)',
        description: 'Quiet, withdrawn, decreased alertness — most commonly MISSED subtype',
        next: 'del-hypoactive',
        urgency: 'urgent',
      },
      {
        label: 'Hyperactive (RASS +1 to +4)',
        description: 'Agitated, combative, psychomotor hyperactivity',
        next: 'del-hyperactive',
        urgency: 'urgent',
      },
      {
        label: 'Excited delirium syndrome suspected',
        description: 'Extreme agitation + hyperthermia + unusual strength + pain tolerance',
        next: 'del-exds',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: ETIOLOGY WORKUP
  // =====================================================================

  {
    id: 'del-hypoactive',
    type: 'info',
    module: 2,
    title: 'Hypoactive Delirium',
    body: 'RASS -1 to -3. The **most commonly missed** delirium subtype — 32-67% undiagnosed in the ED.\n\n**Presentation:** Quiet, withdrawn, inattentive, decreased psychomotor activity, apathetic, drowsy but arousable.\n\n**Higher mortality** than hyperactive subtype — patients are often dismissed as "tired," "depressed," or confused from baseline dementia.\n\n**Common causes:** Metabolic derangements (hepatic/renal encephalopathy), medication effects (opioids, sedatives, anticholinergics), infection (especially UTI/pneumonia in elderly), dehydration.\n\n**Key principle:** Hypoactive delirium is NOT benign — it requires the same urgent etiology search as hyperactive delirium. Do not attribute to "baseline" without verifying with family or prior documentation.\n\nAntipsychotics are generally NOT beneficial for hypoactive delirium — focus on identifying and treating the underlying cause.',
    citation: [1, 3, 4],
    next: 'del-etiology',
  },

  {
    id: 'del-hyperactive',
    type: 'info',
    module: 2,
    title: 'Hyperactive / Mixed Delirium',
    body: 'RASS +1 to +4. Agitation, combativeness, psychomotor hyperactivity, hallucinations, delusions.\n\n**Higher recognition rate** than hypoactive subtype — these patients are obvious. Immediate safety concern for patient and staff.\n\n**Mixed delirium** fluctuates between hyperactive and hypoactive states — most persistent course.\n\n**Distinguish from primary psychiatric disorder:**\n• Delirium: acute onset, fluctuating, inattention, known medical precipitant, altered consciousness\n• Primary psychosis: chronic/subacute, organized delusions, intact attention, stable vital signs\n• Key: new-onset "psychiatric" symptoms in a patient without psychiatric history should be assumed medical until proven otherwise\n\n**Common causes:** Drug intoxication/withdrawal, pain, infection/sepsis, metabolic crisis, CNS pathology.\n\nMay require immediate pharmacological management to ensure safety — but always search for underlying etiology concurrently.',
    citation: [1, 4],
    next: 'del-etiology',
  },

  {
    id: 'del-exds',
    type: 'info',
    module: 2,
    title: 'Excited Delirium Syndrome',
    body: '[Excited Delirium Syndrome](#/info/del-exds-info) — full recognition criteria and management.\n\n**Medical emergency** with ~10% case fatality rate. Most deaths from cardiac arrhythmia (PEA, asystole).\n\n**Recognition — 6 of 10 criteria = probable ExDS:**\n1. Pain tolerance\n2. Tachypnea\n3. Sweating / tactile hyperthermia\n4. Agitation with unusual strength\n5. Noncompliance with police/first responders\n6. Lack of tiring despite prolonged struggle\n7. Inappropriate clothing (often undressing)\n8. Mirror/glass attraction\n9. Bizarre behavior\n10. Male sex\n\n**Underlying etiologies:** Sympathomimetic intoxication (cocaine, methamphetamine), psychiatric illness with medication noncompliance, or combination.\n\n**Metabolic derangements:** Rhabdomyolysis, hyperkalemia, acidosis, dehydration. Temperature >104°F is the single best predictor of death.\n\n**IMMEDIATE:** Remove from prone position (positional asphyxia risk), begin active cooling, establish IV access → proceed to ExDS management.',
    citation: [1, 12],
    next: 'del-exds-mgmt',
  },

  {
    id: 'del-etiology',
    type: 'question',
    module: 2,
    title: 'Etiology Assessment',
    body: 'Delirium is a SYMPTOM — always search for the underlying precipitant. Multiple causes often coexist. In 13% of cases, no precipitant is identified.\n\n[Precipitating Factors for Delirium](#/info/del-precipitants) — comprehensive list of critical, emergent, and iatrogenic causes.\n[Vulnerability Factors](#/info/del-vulnerability) — patient risk factors that lower the threshold for delirium.\n\n**Most common precipitants:**\n• **Infection** (16-67% of cases) — UTI and pneumonia predominate\n• **Medications** — anticholinergics, sedatives, opioids, polypharmacy\n• **Metabolic** — Na, Ca, glucose, hepatic/renal failure\n• **Intracranial** — stroke, hemorrhage, seizure\n• **Intoxication/withdrawal** — alcohol, benzodiazepines, stimulants\n\nWhich category is most likely based on your clinical assessment?',
    citation: [1, 3],
    options: [
      {
        label: 'Infection suspected',
        description: 'Fever, UTI symptoms, pneumonia signs, immunocompromised',
        next: 'del-infection',
      },
      {
        label: 'Metabolic / endocrine',
        description: 'Electrolyte abnormality, hepatic/renal failure, thyroid, glucose',
        next: 'del-metabolic',
      },
      {
        label: 'Intracranial pathology',
        description: 'Focal deficits, trauma, anticoagulation, seizure, meningeal signs',
        next: 'del-intracranial',
      },
      {
        label: 'Toxic / medication-related',
        description: 'New medications, polypharmacy, intoxication, withdrawal',
        next: 'del-toxic',
      },
      {
        label: 'Multifactorial or unclear',
        description: 'No single clear etiology — proceed with broad workup',
        next: 'del-workup',
      },
    ],
  },

  {
    id: 'del-infection',
    type: 'info',
    module: 2,
    title: 'Infection-Precipitated Delirium',
    body: '**Infection is the most common precipitant** — cited in 16-67% of cases, particularly in the elderly.\n\n**Most common sources:**\n• **Urinary tract infection** — most common infectious cause in elderly. Delirium may be the ONLY presenting sign — fever is absent in up to 50% of elderly patients with UTI.\n• **Pneumonia** — second most common. Cough and dyspnea may be absent. Tachypnea or hypoxia may be the only clue.\n• **Skin/soft tissue infection** — cellulitis, infected wounds, decubitus ulcers\n• **Bacteremia/sepsis** — check lactate, blood cultures\n• **Intra-abdominal** — cholecystitis, appendicitis, diverticulitis, C. diff\n\n**Workup:** CBC, UA with culture, CXR, blood cultures if febrile. Lactate. Consider CT abdomen/pelvis if no clear source. LP if meningeal signs, immunocompromised, or no clear source in elderly with fever.\n\n**Treatment:** Empiric antibiotics based on suspected source. IV fluids for dehydration. Delirium often resolves with treatment of infection, though resolution may lag behind clinical improvement by days.',
    citation: [1, 3],
    next: 'del-nonpharm',
  },

  {
    id: 'del-metabolic',
    type: 'info',
    module: 2,
    title: 'Metabolic / Endocrine Causes',
    body: '**Common metabolic precipitants:**\n\n• **Sodium disorders** — hypo- and hypernatremia. [Sodium Disorders](#/tree/sodium) consult for management.\n• **Hypercalcemia** — malignancy, hyperparathyroidism. "Stones, bones, groans, moans, psychiatric overtones."\n• **Hepatic encephalopathy** — check ammonia level. Lactulose, rifaximin.\n• **Uremia** — BUN/Cr ratio >18 associated with increased delirium risk.\n• **Hypoglycemia / hyperglycemia** — DKA, HHS\n• **Thyroid** — myxedema coma (hypothyroid), thyroid storm (hyperthyroid)\n• **B12 / folate deficiency** — subacute, but worth checking in undifferentiated cases\n• **Hypoxia / hypercarbia** — ABG if respiratory disease or unreliable SpO2\n\n**Workup:** BMP (Na, K, Ca, Mg, Phos, glucose, BUN/Cr), LFTs, ammonia, TSH, VBG/ABG, lactate.\n\n**Predictive markers for delirium:** Elevated serum bicarbonate, elevated glucose, elevated BUN:Cr ratio, low hemoglobin, low chloride.',
    citation: [1, 5],
    next: 'del-nonpharm',
  },

  {
    id: 'del-intracranial',
    type: 'info',
    module: 2,
    title: 'Intracranial Pathology',
    body: '**Structural and neurologic causes of delirium:**\n\n• **Stroke** — both ischemic and hemorrhagic. Delirium can be the presenting symptom, especially posterior circulation strokes.\n• **Subdural hematoma** — especially in elderly on anticoagulants. May present without clear trauma history.\n• **Subarachnoid hemorrhage** — "worst headache of life" may be absent in elderly; delirium may predominate.\n• **Meningitis / encephalitis** — fever + meningeal signs + AMS. [Meningitis/Encephalitis](#/tree/meningitis) consult for workup.\n• **Seizure / postictal state** — consider NCSE if persistent AMS without convulsions. EEG when available.\n• **Space-occupying lesion** — tumor, abscess.\n• **Normal pressure hydrocephalus** — triad: wet, wacky, wobbly (incontinence, dementia, gait disturbance).\n\n**Workup:** CT head non-contrast if: focal neurologic deficits, anticoagulation, trauma history, new-onset seizure. LP if: fever + meningeal signs, immunocompromised, or no clear cause. CT yield for undifferentiated delirium without focal deficits is only ~5%.\n\n**Neurologic exam:** Focus on focal/lateralizing signs, cranial nerves, cerebellar signs (gait, truncal ataxia). Mental status exam: orientation, attention, recall, language.',
    citation: [1, 4],
    next: 'del-nonpharm',
  },

  {
    id: 'del-toxic',
    type: 'info',
    module: 2,
    title: 'Toxic / Medication-Related Delirium',
    body: '**Medications are a particularly prevalent cause** — especially in the elderly. Even without new prescriptions, dose changes and OTC interactions can precipitate delirium.\n\n**Beers Criteria high-risk medications:**\n• **Anticholinergics** — diphenhydramine, promethazine, scopolamine, oxybutynin, TCAs\n• **Benzodiazepines** — independent risk factor for delirium\n• **Opioids** — especially meperidine (highest risk)\n• **Sedative-hypnotics** — zolpidem, eszopiclone\n• **H2-receptor antagonists** — ranitidine, famotidine\n• **Corticosteroids** — especially high-dose pulse therapy\n• **Fluoroquinolones** — CNS effects underrecognized\n\n**Intoxication syndromes:**\n• Sympathomimetic (cocaine, meth): agitation, tachycardia, hyperthermia, mydriasis\n• Anticholinergic: "red as a beet, dry as a bone, hot as a hare, blind as a bat, mad as a hatter"\n• Serotonin syndrome: altered mental status + neuromuscular excitability + autonomic instability\n\n**Withdrawal syndromes:**\n• Alcohol: tremor, tachycardia, hallucinations, seizures, DT\n• Benzodiazepine: similar to alcohol withdrawal\n• Opioid: NOT typically delirious, more dysphoria/GI symptoms\n\n**Workup:** Detailed medication reconciliation. Urine drug screen (interpret cautiously — false positives/negatives). Serum ethanol. Acetaminophen/salicylate levels if intentional ingestion suspected.',
    citation: [1, 3],
    next: 'del-nonpharm',
  },

  {
    id: 'del-workup',
    type: 'info',
    module: 2,
    title: 'Directed Diagnostic Workup',
    body: '**Directed by history, physical, and differential** — not a shotgun approach. Clinical judgment and common sense are the consensus recommendation.\n\n**For ALL patients with suspected delirium:**\n• Fingerstick glucose (already done)\n• BMP: Na, K, Ca, Mg, glucose, BUN/Cr\n• CBC with differential\n• Urinalysis with culture\n• VBG or ABG with lactate\n• **ECG** — arrhythmia, MI (delirium is the ONLY symptom in up to 5% of elderly STEMI), QTc baseline (needed before antipsychotics)\n\n**Consider based on clinical suspicion:**\n• LFTs, lipase, ammonia — hepatic/abdominal causes\n• TSH — thyroid disorders\n• Blood cultures — if febrile or suspected bacteremia\n• Troponin — if cardiac cause suspected\n• CK — if rhabdomyolysis risk (prolonged agitation, restraints, ExDS)\n• Urine drug screen — co-ingestions, atypical presentations (interpret with caution)\n• Blood gas — if hypercarbia suspected (COPD, hypoventilation)\n\n**Imaging:**\n• CT head non-contrast: if focal neuro deficits, anticoagulated, trauma, new seizure. Yield ~5% in undifferentiated delirium without focal findings, but subacute/chronic findings (hydrocephalus, old infarcts, SDH) may guide care.\n• CXR: if respiratory symptoms or fever\n\n**Lower threshold for LP:** Undifferentiated elderly with fever, immunocompromised, suspected NCSE, or encephalitis.',
    citation: [1, 4, 5],
    next: 'del-med-review',
  },

  {
    id: 'del-med-review',
    type: 'info',
    module: 2,
    title: 'Medication Review',
    body: '**Systematic medication review is essential** — medications are one of the most common and most easily correctable precipitants.\n\n**Check for:**\n• New medications started within past 2 weeks\n• Recent dose changes (up or down)\n• Drug-drug interactions (especially CYP inhibitors/inducers)\n• Polypharmacy (≥5 medications independently increases delirium risk)\n• Anticholinergic burden — cumulative effect of multiple low-anticholinergic drugs\n• Recent discontinuation of chronic medications (withdrawal risk)\n\n**High-risk medication classes (Beers Criteria):**\n• Anticholinergics (diphenhydramine, oxybutynin, TCAs)\n• Benzodiazepines (alprazolam, lorazepam, diazepam)\n• Opioids (especially meperidine — highest delirium risk)\n• Sedative-hypnotics (zolpidem)\n• First-generation antihistamines\n• H2 blockers (ranitidine, famotidine)\n• Corticosteroids\n• Muscle relaxants (cyclobenzaprine, methocarbamol)\n\n**ED recommendation:** Avoid meperidine — prescribe oxycodone if opioids are necessary. For other classes, weigh risks vs benefits using clinical judgment. Document medication review in chart.\n\n**Iatrogenic precipitants in ED/hospital:** Physical restraints, bladder catheter, addition of ≥3 new medications, sleep disruption, malnutrition.',
    citation: [1, 3],
    next: 'del-nonpharm',
  },

  // =====================================================================
  // MODULE 3: NONPHARMACOLOGICAL MANAGEMENT
  // =====================================================================

  {
    id: 'del-nonpharm',
    type: 'info',
    module: 3,
    title: 'Nonpharmacological Interventions',
    body: '**First-line treatment for mild-moderate agitation** in cooperative patients. Also used to prevent iatrogenic delirium.\n\n[Verbal De-escalation: 10 Elements](#/info/del-deescalation) — AAEP Project BETA evidence-based guidelines.\n\n**Environmental modifications:**\n• Reduce excessive stimulation (noise, bright lights, alarms)\n• Reorient patient frequently — clock, calendar, familiar objects\n• Facilitate verbal orientation from family members\n• Provide visual and hearing assistive devices (glasses, hearing aids)\n• Maintain sleep-wake cycle — adequate daytime lighting, minimize nighttime interruptions\n• Ensure adequate hydration and nutrition\n\n**Minimize iatrogenic triggers:**\n• Remove unnecessary lines, leads, and catheters (Foley catheters are a known delirium precipitant)\n• Avoid medications known to precipitate delirium\n• Limit tethering and medical procedures when possible\n• Allow patient mobility within safety bounds\n\n**TADA approach:** Tolerate, Anticipate, Don\'t Agitate — allow patient leeway to mobilize and voice discontent within safety bounds. Stop reorientation when it exacerbates agitation.\n\n**One-to-one observation** — perceived efficacy of 48%. Dedicated sitter for high-risk patients.\n\nFor patients requiring physical restraint, see: [Physical Restraints](#/node/del-restraints)',
    citation: [1, 8],
    next: 'del-pharm-decision',
  },

  {
    id: 'del-restraints',
    type: 'info',
    module: 3,
    title: 'Physical Restraints',
    body: '**Temporizing measure only** — physical restraints can paradoxically INCREASE agitation and risk of injury. Associated with significant injuries and death by asphyxiation.\n\n**Indications:**\n• Imminent danger to patient or staff despite verbal de-escalation\n• Violent/severely agitated patient requiring medical workup\n• To facilitate pharmacological management in dangerous agitation\n\n**Proper technique:**\n• Minimum 5-person team (1 per extremity + team leader at head)\n• Remove all objects that could be used as weapons\n• Supine position with **head of bed elevated** to prevent aspiration\n• Team leader controls head while others secure extremities in extension\n• **Soft restraints** preferred over leather (less injury risk)\n• Secure to bed frame, not side rails\n\n**Monitoring requirements:**\n• Reassess q15 minutes: neurovascular checks, position, basic needs\n• Re-evaluate need for restraints q1-2 hours\n• Anticipate basic needs (voiding, hydration, repositioning)\n• **NEVER prone positioning** — risk of positional asphyxia\n• Document indication, type, and monitoring\n\n**Concurrent pharmacological management** should be initiated to facilitate restraint removal as quickly as possible.',
    citation: [1, 8],
    next: 'del-pharm-decision',
  },

  {
    id: 'del-pharm-decision',
    type: 'question',
    module: 3,
    title: 'Pharmacological Treatment Needed?',
    calculatorLinks: [{ id: 'rass', label: 'RASS Score' }],
    body: '**Pharmacological treatment is second-line** — used when nonpharmacological interventions are ineffective and patient/staff safety is at risk.\n\n**Consider pharmacological management when:**\n• Severe agitation threatening patient or staff safety\n• Physical restraints required to facilitate medical evaluation\n• Patient unable to cooperate with essential diagnostic workup\n• Agitation interfering with critical medical care (preventing IV access, ET tube, etc.)\n\n**Do NOT routinely sedate hypoactive delirium** — antipsychotics are not beneficial in hypoactive delirium (MIND-USA trial: haloperidol was ineffective when 89% of patients had hypoactive delirium). Focus on treating the underlying cause.\n\n[Medications for Acute Agitation](#/info/del-meds-table) — drug comparison table with dosing, onset, and side effects.',
    citation: [1, 2, 11],
    options: [
      {
        label: 'Yes — agitated, danger to self or staff',
        description: 'Requires pharmacological sedation to facilitate safe evaluation',
        next: 'del-population',
        urgency: 'urgent',
      },
      {
        label: 'Not acutely needed',
        description: 'Hypoactive, controlled with nonpharmacological measures, or etiology being treated',
        next: 'del-monitoring',
      },
    ],
  },

  // =====================================================================
  // MODULE 4: PHARMACOLOGICAL MANAGEMENT
  // =====================================================================

  {
    id: 'del-population',
    type: 'question',
    module: 4,
    title: 'Patient Population',
    body: '**Pharmacological management should be tailored** to the patient\'s age, comorbidities, and suspected etiology. The ideal agent targets the underlying etiology, has rapid onset, and minimal side effects.\n\n**Key principle:** "Start low and go slow" — especially in elderly patients. Use the minimum effective dose.\n\n[Medications for Acute Agitation](#/info/del-meds-table) — dosing, onset, contraindications by agent.\n\nWhich population best describes this patient?',
    citation: [1, 2],
    options: [
      {
        label: 'Young adult / undifferentiated',
        description: 'Age <65, no Parkinson\'s, no active intoxication/withdrawal',
        next: 'del-young-adult',
      },
      {
        label: 'Elderly (age ≥65)',
        description: 'Reduce all doses by 50%. Avoid benzodiazepines.',
        next: 'del-elderly',
      },
      {
        label: 'Parkinson\'s disease or Lewy body dementia',
        description: 'Avoid typical antipsychotics — use quetiapine',
        next: 'del-parkinsons',
      },
      {
        label: 'Intoxication or withdrawal syndrome',
        description: 'Alcohol, benzodiazepine, or stimulant related',
        next: 'del-intox-withdrawal',
      },
      {
        label: 'Excited delirium syndrome',
        description: 'Extreme agitation + hyperthermia + metabolic crisis',
        next: 'del-exds-mgmt',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'del-young-adult',
    type: 'info',
    module: 4,
    title: 'Standard Adult Agitation',
    body: '**First-line options (choose one):**\n\n**Option 1 — Butyrophenone + benzodiazepine:**\n• [Haloperidol](#/drug/haloperidol/agitation) 5-10 mg IM + [Midazolam](#/drug/midazolam/agitation) 2.5-5 mg IM\n• Classic "B52" variant. Combination therapy achieves more rapid symptom resolution than either agent alone.\n• QTc monitoring required after haloperidol.\n\n**Option 2 — Droperidol monotherapy:**\n• [Droperidol](#/drug/droperidol/agitation) 5 mg IM\n• Faster onset (3-10 min) and more sedating than haloperidol. FDA black box for QTc, but real-world risk is very low.\n\n**Option 3 — Olanzapine monotherapy:**\n• [Olanzapine](#/drug/olanzapine/agitation) 10 mg IM\n• **No QTc prolongation.** No dystonia. Equally effective as haloperidol.\n• **⚠️ DO NOT combine with parenteral benzodiazepines** — risk of fatal respiratory depression and hypotension.\n\nWait ≥20 min before redosing. If 10 mg cumulative of any agent produces no response, reconsider etiology and try a different class.\n\n**QTc >500 ms?** Use olanzapine (no QTc effect) or benzodiazepines alone.',
    citation: [1, 2, 9, 10],
    next: 'del-response',
  },

  {
    id: 'del-elderly',
    type: 'info',
    module: 4,
    title: 'Elderly / Geriatric Agitation',
    body: '**Reduce ALL doses by 50%.** Elderly patients are more sensitive to both therapeutic and adverse effects.\n\n**First-line:**\n• [Haloperidol](#/drug/haloperidol/elderly agitation) 0.5-2 mg IM or IV\n• OR [Olanzapine](#/drug/olanzapine/elderly agitation) 2.5-5 mg IM\n\n**AVOID benzodiazepines in elderly delirium:**\n• Independent risk factor for delirium\n• Increased fall risk\n• Paradoxical agitation\n• Respiratory depression\n• Oversedation\n\n**For mild agitation (cooperative patient):**\n• [Quetiapine](#/drug/quetiapine/delirium) 25-50 mg PO — significant sedation at low doses\n• [Risperidone](#/drug/risperidone/delirium) 0.5-1 mg PO — less sedating\n\n**⚠️ Black box warning:** All antipsychotics carry increased mortality risk (1.6-1.7×) in elderly patients with dementia-related psychosis. However, acute delirium management in the ED represents a different risk-benefit calculation — untreated delirium also carries significant mortality.\n\n**Document:** Risk-benefit discussion, lowest effective dose used, monitoring plan.',
    citation: [1, 2, 3],
    next: 'del-response',
  },

  {
    id: 'del-parkinsons',
    type: 'info',
    module: 4,
    title: 'Parkinson\'s Disease / Lewy Body Dementia',
    body: '**AVOID typical antipsychotics** (haloperidol, droperidol) — high D2 receptor blockade worsens motor symptoms and can trigger severe neuroleptic sensitivity reactions in Lewy body dementia.\n\n**First-line — Quetiapine:**\n• [Quetiapine](#/drug/quetiapine/parkinsons) 12.5-25 mg PO\n• **Lowest D2 receptor affinity** of all antipsychotics — least likely to worsen motor symptoms\n• Shown NOT to affect motor symptoms of Parkinson disease\n• PO only — limits use in severe agitation\n\n**If severe agitation and PO not feasible:**\n• Low-dose [Midazolam](#/drug/midazolam/agitation) 1-2 mg IM — avoid high doses\n• Low-dose [Olanzapine](#/drug/olanzapine/parkinsons) 2.5 mg IM — moderate D2 affinity, still safer than typical antipsychotics. Use with caution.\n\n**Lewy body dementia specifics:**\n• Fluctuating cognition and visual hallucinations are baseline features — can mimic delirium\n• Extreme sensitivity to antipsychotics — even "safe" agents can trigger life-threatening reactions\n• Diagnosis of exclusion — always evaluate for underlying medical precipitant first\n\n**Key:** Consult neurology early for these patients.',
    citation: [1, 2],
    next: 'del-response',
  },

  {
    id: 'del-intox-withdrawal',
    type: 'info',
    module: 4,
    title: 'Intoxication / Withdrawal Syndromes',
    body: '**Benzodiazepines are the drug of choice** for agitation related to intoxication or withdrawal.\n\n**Alcohol / sedative withdrawal:**\n• [Lorazepam](#/drug/lorazepam/agitation) 1-2 mg IV or [Midazolam](#/drug/midazolam/agitation) 2.5-5 mg IM\n• May require large, repeated doses for delirium tremens\n• Benzodiazepines have protective benefit against alcohol withdrawal seizures\n• For severe alcohol withdrawal, see phenobarbital protocol\n\n**Sympathomimetic intoxication (cocaine, methamphetamine):**\n• **Benzodiazepines preferred** — [Midazolam](#/drug/midazolam/agitation) 5 mg IM or [Lorazepam](#/drug/lorazepam/agitation) 2 mg IV\n• **AVOID antipsychotics** in acute stimulant intoxication — lower seizure threshold, impair thermoregulation, may worsen hyperthermia\n• Active cooling if hyperthermic. IV fluids aggressively.\n\n**Anticholinergic toxidrome:**\n• Physostigmine 0.5-2 mg IV slow push if classic toxidrome and no contraindications\n• Benzodiazepines for agitation if physostigmine unavailable or contraindicated\n• Avoid antipsychotics (additional anticholinergic effects with typical agents)\n\n**Serotonin syndrome:**\n• Benzodiazepines for agitation and muscle rigidity\n• Cyproheptadine 12 mg PO/NG, then 4 mg q4-6h\n• Active cooling. Avoid antipsychotics.',
    citation: [1, 2],
    next: 'del-response',
  },

  {
    id: 'del-exds-mgmt',
    type: 'info',
    module: 4,
    title: 'Excited Delirium Syndrome — Management',
    body: '**Medical emergency — high mortality.** Most deaths from cardiac arrhythmia (PEA, asystole). Sudden unexpected death can occur even after apparent stabilization.\n\n**IMMEDIATE actions:**\n• **Remove from prone position** — positional asphyxia risk\n• **Aggressive cooling** — target temperature <101°F (38.3°C). Ice packs to axillae/groin, cold IV fluids, mist + fan\n• **Large-bore IV access** — establish early. Aggressive IV normal saline\n• **Continuous cardiac monitoring** — anticipate arrhythmia\n\n**Sedation:**\n• [Midazolam](#/drug/midazolam/agitation) 5 mg IM — first-line. Repeat as needed q5-10 min.\n• For **refractory agitation:** [Ketamine](#/drug/ketamine/agitation) 4 mg/kg IM (onset 5 min, reliable sedation). Prepare for possible intubation (29% intubation rate in one study).\n\n**Monitoring and workup:**\n• CK (rhabdomyolysis) — aggressive IV fluids if elevated\n• K+ (hyperkalemia from rhabdomyolysis) — treat aggressively\n• VBG with lactate (acidosis)\n• Creatinine (renal failure)\n• Core temperature q15 min\n• Continuous telemetry — monitor for arrhythmia\n\n**Disposition:** ICU admission mandatory. Cardiac monitoring minimum 24 hours. Continue aggressive hydration and temperature management.',
    citation: [1, 2, 12],
    next: 'del-response',
  },

  {
    id: 'del-response',
    type: 'question',
    module: 4,
    title: 'Treatment Response',
    calculatorLinks: [{ id: 'rass', label: 'RASS Score' }],
    body: '**Reassess 15-20 minutes after pharmacological intervention.**\n\nTarget RASS score: **0 to -1** (alert and calm to drowsy). Oversedation increases aspiration risk, delays evaluation, and masks clinical deterioration.\n\nMonitor: respiratory rate, SpO2, blood pressure, level of consciousness. Maintain head of bed elevated.',
    citation: [1],
    options: [
      {
        label: 'Adequate sedation achieved',
        description: 'RASS 0 to -1, patient and staff safe, able to proceed with evaluation',
        next: 'del-monitoring',
      },
      {
        label: 'Inadequate — needs escalation',
        description: 'Persistent severe agitation despite initial treatment',
        next: 'del-escalation',
        urgency: 'urgent',
      },
    ],
  },

  // =====================================================================
  // MODULE 5: MONITORING
  // =====================================================================

  {
    id: 'del-escalation',
    type: 'info',
    module: 5,
    title: 'Treatment Escalation',
    body: '**If initial agent ineffective after adequate dose and time:**\n\n1. **Redose** at the same or slightly higher dose after appropriate interval (≥20 min for antipsychotics, ≥10 min for BZDs)\n2. **Switch routes** — IV if IM not effective (faster, more reliable absorption)\n3. **Add a second class:**\n   • If antipsychotic alone failed → add benzodiazepine (unless olanzapine was used — switch to haloperidol first, THEN add BZD)\n   • If benzodiazepine alone failed → add antipsychotic\n   • Combination therapy (antipsychotic + BZD) is superior to either class alone for rapid resolution\n4. **Ketamine** for refractory agitation: [Ketamine](#/drug/ketamine/agitation) 1-2 mg/kg IV or 4 mg/kg IM\n   • Use when traditional agents fail\n   • Prepare for possible intubation\n   • Avoid in elderly and patients with heart disease or schizophrenia\n\n**If unable to protect airway** — intubation may be required. This is a management endpoint, not a failure.\n\n**If cumulative dose of any single agent exceeds reasonable range** (haloperidol >20 mg, midazolam >15 mg), reconsider the diagnosis — is there an untreated underlying cause driving persistent agitation?',
    citation: [1, 2],
    next: 'del-monitoring',
  },

  {
    id: 'del-monitoring',
    type: 'info',
    module: 5,
    title: 'Post-Treatment Monitoring',
    calculatorLinks: [{ id: 'rass', label: 'RASS Score' }],
    body: '**All patients receiving pharmacological sedation require close monitoring:**\n\n**Respiratory:**\n• Continuous pulse oximetry\n• **Capnography (ETCO2) recommended** — detects hypoventilation earlier than SpO2, especially after benzodiazepines\n• Supplemental O2 as needed\n• Have BVM, suction at bedside\n\n**Cardiac:**\n• Continuous telemetry if antipsychotic administered\n• **QTc monitoring:** Obtain ECG post-treatment for haloperidol/droperidol. QTc >500 ms or increase >60 ms from baseline → discontinue agent, correct electrolytes (K, Mg)\n• Monitor for arrhythmia (torsades de pointes risk with typical antipsychotics)\n\n**Neurologic:**\n• Reassess RASS q15 min — target 0 to -1\n• Watch for **extrapyramidal symptoms (EPS):** acute dystonia (neck/jaw rigidity, oculogyric crisis) → treat with diphenhydramine 50 mg IV/IM or benztropine 1-2 mg IV\n• Watch for **akathisia** (restlessness) — can be misdiagnosed as worsening agitation. Do NOT escalate antipsychotic dose.\n\n**General:**\n• Blood pressure, temperature q15-30 min\n• Position: head of bed elevated, lateral positioning if aspiration risk\n• Continue etiology workup while patient is sedated\n• Reassess need for restraints — remove as soon as safe\n• Document all medications, doses, times, and monitoring',
    citation: [1, 2],
    next: 'del-disposition',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'del-disposition',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: '**Delirium is an independent risk factor for increased morbidity and mortality.** Up to 37% of delirious ED patients are discharged home. Mortality for discharged delirium patients is 2-3× higher at 3-6 months compared to nondelirious patients.\n\n**Key disposition factors:**\n• Has the etiology been identified and treated?\n• Has the patient returned to baseline mental status?\n• Are vital signs stable?\n• Is the patient safe for discharge (not living alone with new cognitive impairment)?\n• Can reliable follow-up be arranged?\n\n**Observation units** may NOT be optimal — one study showed similar 30% mortality rate for delirious patients in observation vs 10% for nondelirious patients.\n\n**Team-based disposition** is recommended — consider geriatric consult, social work, care coordination for complex elderly patients.',
    citation: [1, 3, 5],
    options: [
      {
        label: 'Admit — ICU',
        description: 'Excited delirium, intubated, hemodynamic instability, refractory agitation, arrhythmia',
        next: 'del-admit',
        urgency: 'critical',
      },
      {
        label: 'Admit — floor or observation',
        description: 'New-onset delirium, persistent AMS, elderly with infection, unable to maintain PO, fall risk',
        next: 'del-admit',
        urgency: 'urgent',
      },
      {
        label: 'Discharge candidate',
        description: 'Clear reversible cause corrected, returned to baseline, safe environment, reliable follow-up',
        next: 'del-discharge',
      },
    ],
  },

  {
    id: 'del-admit',
    type: 'result',
    module: 6,
    title: 'Admission',
    body: '**ICU admission criteria:**\n• Excited delirium syndrome\n• Intubated for airway protection\n• Hemodynamic instability\n• Cardiac arrhythmia (post-sedation or underlying)\n• Refractory agitation requiring continuous infusion\n• Rhabdomyolysis with renal failure\n\n**Floor / observation admission criteria:**\n• New-onset delirium without clear reversible cause\n• Persistent altered mental status\n• Elderly with infection + delirium (even if "just UTI")\n• Unable to maintain adequate oral intake\n• Fall risk / unsafe for discharge\n• Need for inpatient medication adjustment\n• Pending further workup (LP, MRI, EEG)\n\n**Communicate to admitting team:**\n• Baseline cognitive status and timeline of changes\n• Medications administered in ED and response\n• Current RASS score and QTc\n• Suspected etiology and workup results\n• Medications to AVOID (Beers criteria, patient-specific contraindications)\n• Recommend multicomponent nonpharmacological delirium prevention protocol',
    citation: [1, 3],
    recommendation: 'Admit for further evaluation and management of delirium. Communicate baseline status, ED interventions, and suspected etiology to admitting team.',
    confidence: 'recommended',
  },

  {
    id: 'del-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge with Follow-Up',
    body: '**Discharge may be appropriate when ALL of the following are met:**\n• Clear reversible cause identified AND corrected (e.g., hypoglycemia, UTI in young patient)\n• Patient has returned to documented baseline mental status\n• Vital signs stable and normalizing\n• Safe home environment with capable caregiver present\n• Reliable follow-up arranged within 24-48 hours\n• Patient and caregiver understand return precautions\n\n**Discharge planning:**\n• Medication reconciliation — discontinue or adjust delirium-precipitating medications\n• Written discharge instructions (but recognize that delirious/recently delirious patients have markedly decreased comprehension of discharge instructions)\n• Ensure caregiver understands the diagnosis and return precautions\n• PCP follow-up within 24-48 hours\n• Consider geriatric referral for elderly patients\n\n**⚠️ Caution:** Patients with delirium have increased 30-day readmission rates and 2-3× increased mortality at 3-6 months even after discharge. Lower your threshold for admission in elderly patients with multiple vulnerability factors.\n\n**Document:** Baseline mental status, return to baseline confirmed, etiology identified and treated, safe disposition plan, follow-up arranged.',
    citation: [1, 3, 5],
    recommendation: 'Discharge with close follow-up. Ensure caregiver understands return precautions and follow-up plan.',
    confidence: 'recommended',
  },

];

// -------------------------------------------------------------------
// Module Labels
// -------------------------------------------------------------------

export const DELIRIUM_MODULE_LABELS = [
  'Initial Assessment & Safety',
  'Etiology Workup',
  'Nonpharmacological Management',
  'Pharmacological Management',
  'Monitoring',
  'Disposition',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const DELIRIUM_CITATIONS: Citation[] = [
  { num: 1, text: 'Nassisi D, Okuda Y, Koyfman A, et al. Managing Delirium in the Emergency Department: Tools for Targeting Underlying Etiology. Emergency Medicine Practice (EB Medicine).' },
  { num: 2, text: 'Farkas J. Antipsychotic Pharmacology. Internet Book of Critical Care (IBCC). PulmCrit. 2024.' },
  { num: 3, text: 'Inouye SK, Westendorp RGJ, Saczynski JS. Delirium in Elderly People. Lancet. 2014;383(9920):911-922.' },
  { num: 4, text: 'Han JH, Wilber ST. Altered Mental Status in Older Emergency Department Patients. Clin Geriatr Med. 2013;29(1):101-136.' },
  { num: 5, text: 'Kennedy M, Enander R, Tadiri SP, et al. Delirium Risk Prediction, Healthcare Use and Mortality of Elderly Adults in the Emergency Department. J Am Geriatr Soc. 2014;62(3):462-469.' },
  { num: 6, text: 'Wei L, Fearing M, Sternberg EJ, et al. The Confusion Assessment Method: A Systematic Review of Current Usage. J Am Geriatr Soc. 2008;56(5):823-830.' },
  { num: 7, text: 'Han JH, Wilson A, Vasilevskis EE, et al. Diagnosing Delirium in Older Emergency Department Patients: Validity and Reliability of the Delirium Triage Screen and the Brief Confusion Assessment Method. Ann Emerg Med. 2013;62(5):457-465.' },
  { num: 8, text: 'Richmond JS, Berlin JS, Fishkind AB, et al. Verbal De-escalation of the Agitated Patient: Consensus Statement of the American Association for Emergency Psychiatry Project BETA De-escalation Workgroup. West J Emerg Med. 2012;13(1):17-25.' },
  { num: 9, text: 'Chase PB, Biros MH. A Retrospective Review of the Use and Safety of Droperidol in a Large, High-Risk, Inner-City Emergency Department Patient Population. Acad Emerg Med. 2002;9(12):1402-1410.' },
  { num: 10, text: 'Chan EW, Taylor DM, Knott JC, et al. Intravenous Droperidol or Olanzapine as an Adjunct to Midazolam for the Acutely Agitated Patient: A Multicenter, Randomized, Double-Blind, Placebo-Controlled Clinical Trial. Ann Emerg Med. 2013;61(1):72-81.' },
  { num: 11, text: 'Girard TD, Exline MC, Carson SS, et al. Haloperidol and Ziprasidone for Treatment of Delirium in Critical Illness (MIND-USA). N Engl J Med. 2018;379(26):2506-2516.' },
  { num: 12, text: 'Vilke GM, DeBard ML, Chan TC, et al. Excited Delirium Syndrome (ExDS): Defining Based on a Review of the Literature. J Emerg Med. 2012;43(5):897-905.' },
];

// -------------------------------------------------------------------
// Node Count
// -------------------------------------------------------------------

export const DELIRIUM_NODE_COUNT = DELIRIUM_NODES.length;
