import type { InfoPage } from '../info-pages.js';

export const STOP_PAGES_03: Record<string, InfoPage> = {

  'priapism-stop': {
    id: 'priapism-stop',
    title: 'Priapism — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT miss ischemic vs non-ischemic',
        body: 'Treating a non-ischemic (high-flow) priapism like an emergency wastes time and causes harm. Non-ischemic is painless, partially tumescent, and post-traumatic — aspiration and phenylephrine are NOT indicated. [See classification node](#/node/priapism-differential).',
      },
      {
        heading: '🛑 Do NOT delay treatment past 4–6 hours',
        body: 'Smooth muscle necrosis begins at 4–6 hours of ischemic priapism. Delayed treatment beyond 24 hours carries 30–70% risk of permanent erectile dysfunction. Time is function. [See emergency node](#/node/priapism-ischemic-confirm).',
      },
      {
        heading: '🛑 Do NOT use epinephrine-containing local anesthetic',
        body: 'The penis is an end-artery territory. Using lidocaine WITH epinephrine for the dorsal penile nerve block risks ischemic necrosis. Always use 1% lidocaine WITHOUT epinephrine. [See penile block node](#/node/priapism-penile-block-intro).',
      },
      {
        heading: '🛑 Do NOT rely on aspiration alone',
        body: 'Aspiration without phenylephrine has only a 36% success rate. Proceed to intracavernosal phenylephrine if rigidity persists after aspiration. Do not consider aspiration alone a complete treatment. [See aspiration response node](#/node/priapism-aspiration-response).',
      },
      {
        heading: '🛑 Do NOT exceed phenylephrine dosing limits',
        body: 'Phenylephrine is 200 mcg (2 mL of 100 mcg/mL) intracavernosal every 5 minutes, max 5 total doses — not per side. Hold if SBP >160 or HR >110. Check BP and HR between every injection. [See phenylephrine dose node](#/node/priapism-phenylephrine-dose).',
      },
      {
        heading: '🛑 Do NOT use RBC transfusion to treat SCD priapism',
        body: 'RBC transfusion does not treat sickle cell priapism and is not indicated for this indication. For SCD priapism under 4 hours, try supportive care first (IV hydration, analgesia, O2). Proceed to aspiration if no improvement. [See SCD supportive node](#/node/priapism-scd-supportive).',
      },
      {
        heading: '🛑 Do NOT let conservative measures delay intervention',
        body: 'For post-ICI priapism, ice packs and exercise are reasonable for 30–60 minutes maximum. If the patient is fully rigid and painful, proceed directly to phenylephrine — do not let conservatism cause preventable erectile dysfunction. [See post-ICI node](#/node/priapism-post-ici).',
      },
      {
        heading: '🛑 Do NOT treat non-ischemic with vasoconstrictors',
        body: 'Phenylephrine is contraindicated in non-ischemic (high-flow) priapism. Most cases resolve spontaneously (62%). If intervention is needed, selective arterial embolization by interventional radiology is the correct approach. [See non-ischemic result node](#/node/priapism-nonischemic-result).',
      },
    ],
    citations: [],
  },

  'chest-tube-stop': {
    id: 'chest-tube-stop',
    title: 'Chest Tube — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT use trocars for insertion',
        body: 'Trocar insertion carries an unacceptable rate of visceral injury including cardiac and aortic perforation. All chest tubes must be placed by blunt dissection with a Kelly clamp and finger sweep — never use a trocar, ever. [See insertion node](#/node/ctube-tube-insert).',
      },
      {
        heading: '🛑 Do NOT delay needle decompression for imaging',
        body: 'Tension pneumothorax is a clinical diagnosis. If the patient has hemodynamic compromise with absent breath sounds, do not wait for a chest X-ray. Needle decompress immediately at the 4th–5th ICS anterior axillary line, then place a chest tube. [See tension node](#/node/ctube-tension).',
      },
      {
        heading: '🛑 Do NOT insert below the 6th ICS',
        body: 'Inserting below the 6th intercostal space risks intra-abdominal placement — liver on the right, spleen on the left. Stay within the triangle of safety: 4th–5th ICS, mid-axillary line. [See anatomy node](#/node/ctube-anatomy).',
      },
      {
        heading: '🛑 Do NOT strip the chest tube',
        body: 'Stripping a chest tube generates pressures of –300 to –400 cmH2O — dangerously high and with zero evidence of clinical benefit. It can cause lung injury and bleeding. Never strip. [See air leak node](#/node/ctube-air-leak).',
      },
      {
        heading: '🛑 Do NOT clamp a functioning tube with an air leak',
        body: 'Clamping a chest tube in the setting of an ongoing air leak risks tension pneumothorax. Never clamp without attending-level approval and never in a patient with a bronchopleural fistula or active air leak. [See air leak node](#/node/ctube-air-leak).',
      },
      {
        heading: '🛑 Do NOT reflexively tube every traumatic PTX',
        body: 'Traumatic pneumothorax less than 35 mm on CT in a stable, non-ventilated patient is safe to observe. Evidence supports watchful waiting with serial imaging. Reserve tube thoracostomy for larger, symptomatic, or ventilated patients. [See traumatic observe node](#/node/ctube-traumatic-observe).',
      },
      {
        heading: '🛑 Do NOT use small-bore tube for hemothorax',
        body: 'A pigtail or small-bore catheter is insufficient for draining blood and clot. Hemothorax requires a minimum 28 Fr large-bore chest tube to ensure adequate evacuation and prevent retained hemothorax. [See hemothorax node](#/node/ctube-hemothorax).',
      },
      {
        heading: '🛑 Do NOT skip adequate analgesia',
        body: 'Inadequate local anesthetic is the most common cause of procedural difficulty and patient harm during chest tube insertion. Anesthetize skin, subcutaneous tissue, intercostal muscles, rib periosteum (above AND below), and parietal pleura — the most sensitive layer. [See anesthesia node](#/node/ctube-anesthesia).',
      },
    ],
    citations: [],
  },

  'chs-stop': {
    id: 'chs-stop',
    title: 'Cannabinoid Hyperemesis Syndrome — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT use ondansetron as first-line therapy',
        body: 'Ondansetron typically fails in CHS. The HaVOC trial demonstrated that haloperidol 0.05 mg/kg IV is superior to ondansetron 4 mg IV. Using ondansetron alone perpetuates the diagnostic cycle of repeat ED visits without relief. [See antiemetic node](#/node/chs-first-line).',
      },
      {
        heading: '🛑 Do NOT give opioids for CHS nausea',
        body: 'Opioids worsen gastroparesis, promote dependence, and do not treat the underlying mechanism of CHS. GRACE-4 guidelines explicitly recommend against opioid use in CHS. [See avoid node](#/node/chs-avoid).',
      },
      {
        heading: '🛑 Do NOT give benzodiazepines for CHS nausea',
        body: 'Benzodiazepines are ineffective for CHS-mediated nausea. They cause sedation without antiemetic benefit and carry dependence risk in this population. [See avoid node](#/node/chs-avoid).',
      },
      {
        heading: '🛑 Do NOT give butyrophenones without checking QTc first',
        body: 'Haloperidol and droperidol prolong the QT interval. Obtain an ECG and confirm QTc before administering. If QTc >500 ms, use olanzapine instead — it carries no significant QTc prolongation risk. [See QTc node](#/node/chs-ecg).',
      },
      {
        heading: '🛑 Do NOT combine IM olanzapine with parenteral benzodiazepines',
        body: 'Combining IM/IV olanzapine with parenteral benzodiazepines carries a risk of fatal respiratory depression and cardiorespiratory arrest. This combination is contraindicated. [See olanzapine node](#/node/chs-olanzapine).',
      },
      {
        heading: '🛑 Do NOT diagnose CHS without ruling out organic causes',
        body: 'CHS is a diagnosis of exclusion. Before attributing vomiting to CHS, screen for appendicitis, cholecystitis, pancreatitis, bowel obstruction, and pregnancy. Red flags (fever >38.5°C, peritoneal signs, bilious emesis, no cannabis use) mandate workup. [See red flags node](#/node/chs-red-flags).',
      },
      {
        heading: '🛑 Do NOT apply heating pad over capsaicin cream',
        body: 'Topical capsaicin causes a burning sensation that is intensified by heat. Applying a heating pad over capsaicin cream causes severe burns and intense pain. Counsel patients on this before application. [See capsaicin application node](#/node/chs-capsaicin-apply).',
      },
      {
        heading: '🛑 Do NOT discharge without cessation counseling',
        body: 'Cannabis cessation is the only definitive cure for CHS. Symptoms recur with any resumed use, including reduced amounts and CBD products containing trace THC. Every discharge must include formal cessation counseling and SAMHSA referral. [See discharge node](#/node/chs-discharge).',
      },
    ],
    citations: [],
  },

  'pneumothorax-stop': {
    id: 'pneumothorax-stop',
    title: 'Pneumothorax POCUS — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT delay decompression for imaging',
        body: 'Tension pneumothorax is a clinical diagnosis. Hypotension + absent breath sounds + JVD = act now. Waiting for a chest X-ray or CT in a deteriorating patient is dangerous and potentially fatal. [See needle decompression node](#/node/needle-decompression).',
      },
      {
        heading: '🛑 Do NOT misinterpret absent sliding as diagnostic',
        body: 'Absent lung sliding is not pathognomonic for pneumothorax — it also occurs with mainstem intubation, pleural adhesions, apnea, and severe ARDS. Always search for the lung point to confirm. Absent sliding alone without lung point = equivocal. [See stratosphere sign node](#/node/stratosphere-sign).',
      },
      {
        heading: '🛑 Do NOT dismiss B-lines on the ipsilateral side',
        body: 'The presence of B-lines (comet tails) at any scanned location excludes pneumothorax at that site with >99% NPV. If B-lines are present, the lung is in contact with the pleura — there is no pneumothorax there. [See normal findings node](#/node/normal-findings).',
      },
      {
        heading: '🛑 Do NOT overlook occult PTX before intubation',
        body: 'An occult pneumothorax visible on POCUS but not CXR requires chest tube placement before initiating positive pressure ventilation. Failing to do so risks tension physiology once PPV begins. [See eFAST node](#/node/trauma-efast).',
      },
      {
        heading: '🛑 Do NOT withhold supplemental O2 in small PTX',
        body: 'High-flow O2 accelerates pneumothorax reabsorption from approximately 2%/day to 4%/day by replacing nitrogen in the pleural space with absorbable oxygen. Use it unless COPD or other contraindication. [See small PTX node](#/node/small-ptx).',
      },
      {
        heading: '🛑 Do NOT scan only the anterior chest',
        body: 'Scanning a single zone can miss a pneumothorax. Assess multiple rib spaces and slide the probe laterally to search for the lung point. Lung point location also estimates size — more lateral means a larger PTX. [See lung point node](#/node/lung-point).',
      },
    ],
    citations: [],
  },

  'echo-views-stop': {
    id: 'echo-views-stop',
    title: 'Basic Echo Views — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT flip the LV to the right in PLAX',
        body: 'In a correct parasternal long axis view, the left ventricle must be on the LEFT side of the screen. If the LV appears on the right, the probe orientation is inverted — apply the 3 L\'s rule: Parasternal Long axis, Left ventricle on Left. [See PLAX node](#/node/echo-plax).',
      },
      {
        heading: '🛑 Do NOT confuse D-sign timing',
        body: 'Septal flattening (D-sign) during systole indicates pressure overload (PE, pulmonary hypertension). Flattening during diastole indicates volume overload. Getting the timing wrong leads to the wrong diagnosis and treatment. [See PSAX assessment node](#/node/echo-psax-assess).',
      },
      {
        heading: '🛑 Do NOT diagnose tamponade without RV diastolic collapse',
        body: 'RA systolic collapse is sensitive but not specific for tamponade physiology. RV diastolic collapse is the specific finding that confirms tamponade. Effusion alone without collapse is not tamponade. [See subcostal assessment node](#/node/echo-subcostal-assess).',
      },
      {
        heading: '🛑 Do NOT rely on a single echo view for PE',
        body: 'McConnell sign (RV free wall akinesis with apical sparing) is highly specific for acute PE but not sensitive. Combine PSAX D-sign, A4C RV:LV ratio, and IVC assessment before concluding RV strain is absent. [See A4C assessment node](#/node/echo-a4c-assess).',
      },
      {
        heading: '🛑 Do NOT over-interpret IVC in mechanically ventilated patients',
        body: 'IVC collapsibility index is only valid in spontaneously breathing patients. In mechanically ventilated patients, IVC collapsibility loses its predictive value for fluid responsiveness — use different metrics. [See IVC node](#/node/echo-ivc).',
      },
      {
        heading: '🛑 Do NOT use visual EF estimation as the sole function assessment',
        body: 'Visual estimation of LV function is unreliable without experience and training. For a more objective assessment, measure EPSS — a gap >7 mm suggests EF <50%, and >10 mm indicates severe dysfunction. [See echo summary node](#/node/echo-summary).',
      },
    ],
    citations: [],
  },

  'echo-epss-stop': {
    id: 'echo-epss-stop',
    title: 'Echo-EPSS — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT measure EPSS in aortic regurgitation',
        body: 'In aortic regurgitation, the AR jet pushes the anterior mitral leaflet away from the septum, artificially widening the EPSS and falsely suggesting systolic dysfunction. EPSS is invalid in AR, mitral stenosis, HCM, and non-sinus rhythms. [See EPSS overview node](#/node/epss-start).',
      },
      {
        heading: '🛑 Do NOT place the M-mode cursor through the valve body',
        body: 'The M-mode cursor must pass through the TIPS of the mitral valve leaflets — not the base or annulus. Incorrect cursor placement produces a false measurement. Verify both the septum and anterior leaflet tips are clearly visible on the tracing. [See M-mode node](#/node/epss-mmode).',
      },
      {
        heading: '🛑 Do NOT measure the A-point instead of the E-point',
        body: 'EPSS is measured at the E-point — the TALLEST peak of anterior mitral leaflet motion, representing early passive filling. The A-point is the smaller second peak from atrial contraction. Measuring the A-point gives a false, smaller EPSS. [See measurement node](#/node/epss-measure).',
      },
      {
        heading: '🛑 Do NOT use EPSS as the sole determinant of cardiac function',
        body: 'EPSS has moderate specificity (52%) — it is best used as one component of a focused echo assessment combined with visual estimation and other views. A normal EPSS does not exclude heart failure if clinical suspicion is high. [See interpretation node](#/node/epss-interpret).',
      },
      {
        heading: '🛑 Do NOT apply adult thresholds to young children',
        body: 'Adult EPSS cutoff of 7 mm does not apply to children. Pediatric thresholds are 6.0 mm for children overall and 4.9 mm for children ages 0–3. Using adult values will underdiagnose dysfunction in small patients. [See EPSS overview node](#/node/epss-start).',
      },
      {
        heading: '🛑 Do NOT get PLAX with the marker pointing toward the right shoulder',
        body: 'In standard cardiac imaging, the probe marker points toward the patient\'s LEFT hip in PLAX view. Pointing toward the right shoulder inverts the image. Confirm orientation with the 3 L\'s rule before measuring. [See PLAX node](#/node/epss-plax).',
      },
    ],
    citations: [],
  },

  'syncope-stop': {
    id: 'syncope-stop',
    title: 'Syncope Evaluation — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT skip the ECG',
        body: 'An ECG is mandatory for every syncope patient without exception — including those with an apparently classic vasovagal history. Abnormal ECG is a high-risk feature in every validated syncope risk tool. QTc >460 ms is concerning; >500 ms is high risk for arrhythmia. [See ECG assessment node](#/node/sync-ecg).',
      },
      {
        heading: '🛑 Do NOT diagnose vasovagal before excluding life threats',
        body: 'TLOC with persistent abnormal vital signs, neurologic deficit, chest pain, or abdominal pain is NOT simple syncope until serious diagnoses are excluded. Syncope is a diagnosis of exclusion when life-threatening features are present. [See life threat node](#/node/sync-life-threat).',
      },
      {
        heading: '🛑 Do NOT order a head CT for asymptomatic syncope',
        body: 'Head CT has no diagnostic value in syncope without neurologic symptoms or head trauma. Ordering it wastes resources, exposes the patient to radiation, and delays disposition. Reserve CT for focal deficits, persistent altered mental status, or suspected SAH. [See labs node](#/node/sync-labs).',
      },
      {
        heading: '🛑 Do NOT order a D-dimer reflexively',
        body: 'Routine D-dimer is not indicated in syncope workup unless PE is independently suspected based on PERC rule or Wells score. An isolated D-dimer positive result in low-pretest-probability syncope leads to unnecessary CT pulmonary angiography. [See labs node](#/node/sync-labs).',
      },
      {
        heading: '🛑 Do NOT rely on orthostatic vitals alone in the elderly',
        body: 'Normal orthostatic vital signs do NOT predict 30-day outcomes in elderly patients. Orthostatic hypotension may be absent in the ED even when it is the cause. Do not use normal orthostatics to justify early discharge without full risk stratification in older patients. [See orthostatic node](#/node/sync-orthostatic).',
      },
      {
        heading: '🛑 Do NOT misdiagnose convulsive syncope as epilepsy',
        body: 'Myoclonic jerks occur in syncope whenever the patient cannot become supine — they are not seizures. Features favoring syncope: brief jerks (<10), rapid return to baseline, prodrome. Prolonged postictal confusion and lateral tongue laceration favor true seizure. [See TLOC differentiation node](#/node/sync-true-syncope).',
      },
      {
        heading: '🛑 Do NOT discharge without troponin in unclear cases',
        body: 'An elevated high-sensitivity troponin is an independent predictor of 30-day mortality in syncope patients. In any patient without a clearly benign cause identified, check troponin and BNP before disposition. [See labs node](#/node/sync-labs).',
      },
    ],
    citations: [],
  },

  'pe-treatment-stop': {
    id: 'pe-treatment-stop',
    title: 'PE Treatment — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT give thrombolytics without confirming massive PE',
        body: 'Systemic thrombolysis carries a 2–3% risk of intracranial hemorrhage. It is indicated only for massive PE (sustained hypotension, cardiogenic shock, or cardiac arrest) — not for submassive PE unless the patient is deteriorating despite anticoagulation. [See massive PE node](#/node/pe-massive-tx).',
      },
      {
        heading: '🛑 Do NOT use LMWH if thrombolysis is anticipated',
        body: 'If systemic thrombolysis may be needed (massive PE), use UFH not LMWH. UFH has a short half-life, is reversible with protamine, and can be stopped immediately before thrombolysis. Enoxaparin cannot be reliably reversed in time. [See immediate interventions node](#/node/pe-massive-tx).',
      },
      {
        heading: '🛑 Do NOT give aggressive IV fluids in massive PE',
        body: 'Volume loading in massive PE worsens right ventricular failure by increasing RV preload and shifting the interventricular septum. Limit to 500 mL and use vasopressors (norepinephrine preferred) for hemodynamic support. [See massive PE node](#/node/pe-massive-tx).',
      },
      {
        heading: '🛑 Do NOT use LMWH with CrCl <30',
        body: 'Enoxaparin and other LMWH agents accumulate in renal failure, causing unpredictable anticoagulation and bleeding risk. Use UFH for patients with CrCl <30 mL/min — it is renally cleared and its activity is directly monitored with aPTT. [See anticoag selection node](#/node/pe-anticoag-selection).',
      },
      {
        heading: '🛑 Do NOT use DOACs in pregnancy',
        body: 'Direct oral anticoagulants (apixaban, rivaroxaban, edoxaban, dabigatran) are contraindicated in pregnancy due to teratogenicity and fetal bleeding risk. Use LMWH exclusively throughout pregnancy for VTE treatment. [See anticoag selection node](#/node/pe-anticoag-selection).',
      },
      {
        heading: '🛑 Do NOT discharge submassive PE without monitoring',
        body: 'Submassive PE (normotensive with RV dysfunction AND elevated biomarkers — intermediate-high risk) requires ICU monitoring for hemodynamic deterioration requiring rescue thrombolysis. These patients can decompensate rapidly. [See submassive high risk node](#/node/pe-submassive-high).',
      },
      {
        heading: '🛑 Do NOT forget Hestia criteria before outpatient discharge',
        body: 'Low-risk PE may be appropriate for outpatient management, but only after systematically applying Hestia criteria: hemodynamic stability, no O2 requirement, no active bleeding, CrCl >30, reliable follow-up, and ability to take oral medications. [See outpatient check node](#/node/pe-outpatient-check).',
      },
    ],
    citations: [],
  },

  'acid-base-stop': {
    id: 'acid-base-stop',
    title: 'Acid-Base Disorders — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT dismiss hyperventilation as a panic attack',
        body: 'Respiratory alkalosis must prompt a workup for PE, sepsis, and salicylate toxicity before labeling it anxiety. Severe alkalemia causes cerebral and coronary vasoconstriction that can precipitate ischemia and seizures. [See respiratory alkalosis node](#/node/ab-resp-alk).',
      },
      {
        heading: '🛑 Do NOT miss anion gap acidosis in hypoalbuminemia',
        body: 'The standard anion gap formula underestimates the true gap when albumin is low. Apply the Figge correction: add 2.5 × (4.2 – measured albumin) to the calculated AG. Failing to correct in a malnourished or critically ill patient can mask a life-threatening HAGMA. [See anion gap node](#/node/ab-met-acid).',
      },
      {
        heading: '🛑 Do NOT intubate a compensating metabolic acidosis patient without matching minute ventilation',
        body: 'A patient with severe metabolic acidosis (e.g., DKA) may be maintaining a pH of 7.20 only because they are hyperventilating to a pCO2 of 15. Post-intubation hypoventilation causes a precipitous pH drop and cardiovascular collapse. Match or exceed the pre-intubation minute ventilation immediately. [See acute respiratory acidosis node](#/node/ab-resp-acid-acute).',
      },
      {
        heading: '🛑 Do NOT use a high pCO2 alone as an intubation indication',
        body: 'A COPD patient with chronic respiratory acidosis and an appropriately elevated HCO3 may have a pCO2 of 70 mmHg at their baseline. Base intubation decisions on mental status, work of breathing, and clinical trajectory — not a single pCO2 number. [See chronic respiratory acidosis node](#/node/ab-resp-acid-chronic).',
      },
      {
        heading: '🛑 Do NOT use normal saline for ongoing resuscitation in AG acidosis',
        body: 'Large volumes of 0.9% NS cause hyperchloremic metabolic acidosis, worsening a mixed metabolic picture and creating a delta ratio <1. Use balanced crystalloids (Lactated Ringer\'s, PlasmaLyte) to avoid iatrogenic non-AG acidosis. [See mixed AG + non-AG node](#/node/ab-delta-low).',
      },
      {
        heading: '🛑 Do NOT skip the Delta Gap in HAGMA',
        body: 'A pure anion gap acidosis from a single process has a delta ratio near 1. If the delta ratio is <1, a concurrent non-AG acidosis is hidden. If >2, a metabolic alkalosis is masking the severity. Missing the mixed disorder leads to undertreating the second process. [See delta gap node](#/node/ab-delta).',
      },
      {
        heading: '🛑 Do NOT aggressively correct severe metabolic alkalosis',
        body: 'Rapid correction of metabolic alkalosis can cause rebound acidosis. Severe alkalemia may cause decreased coronary and cerebral perfusion — but the correction should be deliberate, not aggressive. [See respiratory alkalosis node](#/node/ab-resp-alk).',
      },
    ],
    citations: [],
  },

  'adrenal-insufficiency-stop': {
    id: 'adrenal-insufficiency-stop',
    title: 'Adrenal Insufficiency — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT delay hydrocortisone for lab results',
        body: 'Adrenal crisis is immediately life-threatening. Draw cortisol and ACTH before giving steroids if possible — but do not delay treatment waiting for results. Hydrocortisone 100 mg IV/IM should be given immediately when crisis is clinically suspected. [See emergency steroid node](#/node/ai-crisis-steroid).',
      },
      {
        heading: '🛑 Do NOT miss adrenal crisis in unexplained shock',
        body: 'Adrenal crisis can be the first presentation of previously undiagnosed adrenal insufficiency in up to 50% of cases. Any shock refractory to fluids and vasopressors must include AI on the differential, especially in patients on chronic steroids or with autoimmune disease. [See initial assessment node](#/node/ai-start).',
      },
      {
        heading: '🛑 Do NOT aggressively correct hyperkalemia in primary AI',
        body: 'Hyperkalemia in primary adrenal insufficiency (PAI) will self-correct as hydrocortisone replacement restores mineralocorticoid activity. Aggressive potassium correction risks rebound hypokalemia once steroids take effect. Monitor — do not over-treat. [See ongoing crisis node](#/node/ai-crisis-ongoing).',
      },
      {
        heading: '🛑 Do NOT add fludrocortisone during acute crisis',
        body: 'At hydrocortisone doses of 50 mg/day or higher, sufficient mineralocorticoid activity is present. Fludrocortisone is not needed during the acute phase — add it only when tapering to maintenance doses in confirmed primary AI. [See steroid node](#/node/ai-crisis-steroid).',
      },
      {
        heading: '🛑 Do NOT miss CYP3A4 inducers as a precipitant',
        body: 'Rifampin, phenytoin, carbamazepine, and phenobarbital accelerate cortisol metabolism via CYP3A4 induction and can precipitate adrenal crisis in patients on maintenance steroid replacement. Always review medications as a potential trigger. [See crisis precipitants node](#/node/ai-crisis-confirm).',
      },
      {
        heading: '🛑 Do NOT discharge adrenal crisis from the ED',
        body: 'All adrenal crises require ICU-level admission. These patients are hemodynamically unstable, may have unidentified infectious precipitants, and require glucose and electrolyte monitoring for 24–48 hours. Outpatient management is not appropriate. [See admission node](#/node/ai-crisis-admit).',
      },
      {
        heading: '🛑 Do NOT forget stress dosing during illness or procedures',
        body: 'Patients with known AI who develop fever, vomiting, or significant illness need 2–3× their maintenance steroid dose. Failure to stress-dose during physiologic stress is the most common preventable trigger of adrenal crisis outside the hospital. [See stress dose node](#/node/ai-stress-dose).',
      },
    ],
    citations: [],
  },

  'thyroid-stop': {
    id: 'thyroid-stop',
    title: 'Thyroid Emergencies — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT delay thyroid treatment for lab confirmation',
        body: 'Decompensated hypothyroidism and thyroid storm are clinical diagnoses — lab values reflect the chronic state, not acute severity. Mortality for both exceeds 25% without treatment. Treat empirically when the clinical picture is convincing. [See initial assessment node](#/node/thyroid-start).',
      },
      {
        heading: '🛑 Do NOT give thyroid hormone before steroids in decompensated hypothyroidism',
        body: 'Thyroid hormone accelerates cortisol metabolism. Giving T4 before hydrocortisone in a patient with concurrent adrenal insufficiency (present in 5–10%) can precipitate adrenal crisis. Always give hydrocortisone 100 mg IV FIRST. [See steroids first node](#/node/thyroid-hypo-steroids).',
      },
      {
        heading: '🛑 Do NOT use active external rewarming in decompensated hypothyroidism',
        body: 'Heating blankets and forced warm air cause peripheral vasodilation in a patient with a profoundly depressed myocardium, precipitating cardiovascular collapse. Use passive rewarming only: warm room, blankets, warm IV fluids. [See airway/supportive node](#/node/thyroid-hypo-airway).',
      },
      {
        heading: '🛑 Do NOT give aspirin for hyperthermia in thyroid storm',
        body: 'Aspirin displaces thyroid hormone from protein binding, increasing free (active) T3/T4 and worsening thyroid storm. Use acetaminophen and cooling measures for hyperthermia. Aspirin is contraindicated. [See cooling node](#/node/thyroid-storm-cooling).',
      },
      {
        heading: '🛑 Do NOT give iodine before PTU or methimazole',
        body: 'Iodine (SSKI, Lugol\'s) must be administered at least 1 hour AFTER the first dose of PTU or methimazole. Giving iodine first provides substrate for new thyroid hormone synthesis, transiently worsening the storm before blocking can occur. [See iodine node](#/node/thyroid-storm-iodine).',
      },
      {
        heading: '🛑 Do NOT give sedatives or opioids in decompensated hypothyroidism',
        body: 'Patients with decompensated hypothyroidism have extreme sensitivity to CNS depressants. Benzodiazepines, opioids, and antipsychotics can precipitate life-threatening respiratory depression and further decompensation. [See monitoring node](#/node/thyroid-hypo-monitoring).',
      },
      {
        heading: '🛑 Do NOT use propranolol in thyroid storm with decompensated heart failure',
        body: 'Propranolol is first-line for tachycardia and peripheral T4→T3 conversion blockade in thyroid storm. However, it is contraindicated in decompensated heart failure. If HF is present, use a short-acting agent like esmolol under careful monitoring. [See beta-blockade node](#/node/thyroid-storm-betablock).',
      },
    ],
    citations: [],
  },

  'angioedema-stop': {
    id: 'angioedema-stop',
    title: 'Angioedema — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT wait for respiratory symptoms to secure the airway',
        body: 'Angioedema airway obstruction can be rapid and unexpected. Patients with active tongue and floor-of-mouth swelling may rapidly lose a manageable airway. Set up for intubation AND cricothyrotomy simultaneously. Do not paralyze until a clear view is obtained. [See airway node](#/node/angio-airway-secure).',
      },
      {
        heading: '🛑 Do NOT use CPAP or BiPAP for airway support in angioedema',
        body: 'Positive pressure ventilation (NIPPV) worsens angioedema by causing barotrauma and increasing edema. Use supplemental oxygen and prepare for definitive airway management. NIPPV is contraindicated. [See monitoring node](#/node/angio-airway-monitor).',
      },
      {
        heading: '🛑 Do NOT treat ACEi-induced angioedema with epinephrine and antihistamines alone',
        body: 'ACEi-induced angioedema is bradykinin-mediated, not histamine-mediated. Epinephrine, antihistamines, and corticosteroids are generally ineffective. Stop the ACEi permanently and consider tranexamic acid or icatibant. [See ACEi treatment node](#/node/angio-acei-treat).',
      },
      {
        heading: '🛑 Do NOT restart ACEi after angioedema',
        body: 'ACEi-induced angioedema is a class effect and is not dose-dependent. It can occur after years on the same agent. The ACEi must be stopped permanently. Document the allergy and arrange PCP follow-up for an alternative antihypertensive. [See ACEi node](#/node/angio-acei).',
      },
      {
        heading: '🛑 Do NOT diagnose HAE without considering age of onset and family history',
        body: 'Hereditary angioedema typically presents before age 20, often with a family history. Up to 44% of HAE patients are initially misdiagnosed. No urticaria, no response to epinephrine, and recurrent episodes in a young patient should trigger workup for C1-INH deficiency. [See HAE classification node](#/node/angio-bradykinin-screen).',
      },
      {
        heading: '🛑 Do NOT rely on epinephrine alone for HAE attacks',
        body: 'HAE attacks are bradykinin-mediated and do not respond reliably to epinephrine or antihistamines. Definitive treatment requires C1-INH concentrate, icatibant, or ecallantide. Epinephrine may provide temporary partial relief but does not treat the underlying mechanism. [See HAE classification node](#/node/angio-bradykinin-screen).',
      },
      {
        heading: '🛑 Do NOT assess risk by lip/periorbital swelling alone',
        body: 'Edema localized to the lips alone does NOT confer elevated intubation risk. The true airway threat is posterior tongue, larynx, and supraglottic structures. Serial flexible laryngoscopy is more accurate than visual lip inspection for risk stratification. [See airway monitoring node](#/node/angio-airway-monitor).',
      },
    ],
    citations: [],
  },

  'sickle-cell-stop': {
    id: 'sickle-cell-stop',
    title: 'Sickle Cell Disease — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT delay antibiotics in febrile SCD patients',
        body: 'Fever ≥38.5°C in sickle cell disease is a medical emergency due to functional asplenia. Ceftriaxone 50 mg/kg IV must be given within 1 hour of triage. A positive viral test does NOT exclude bacteremia — treat all febrile SCD patients as potentially septic. [See fever node](#/node/scd-fever-start).',
      },
      {
        heading: '🛑 Do NOT delay analgesia in VOC',
        body: 'The pain management goal is analgesia within 30 minutes of triage and 60 minutes of ED arrival. Give intranasal fentanyl 1–1.5 mcg/kg before IV access is established. Undertreating pain causes suffering and increases VOC duration. [See triage node](#/node/scd-voc-triage).',
      },
      {
        heading: '🛑 Do NOT use corticosteroids for VOC pain',
        body: 'Corticosteroids are contraindicated in sickle cell vaso-occlusive crisis. They cause rebound pain on discontinuation, increase stroke risk, and do not address the underlying pathophysiology. [See IV analgesia node](#/node/scd-voc-iv).',
      },
      {
        heading: '🛑 Do NOT overhydrate in VOC',
        body: 'While IV fluids are part of VOC management, overhydration worsens acute chest syndrome by promoting pulmonary vascular congestion. Use 10–20 mL/kg NS bolus (max 1L) and then transition to 1× maintenance. Avoid free water administration. [See IV analgesia node](#/node/scd-voc-iv).',
      },
      {
        heading: '🛑 Do NOT transfuse beyond Hgb 8 g/dL in splenic sequestration',
        body: 'Transfusing beyond hemoglobin 8 g/dL in splenic sequestration risks reversal of sequestration — the spleen releases sequestered red cells back into circulation, causing acute hyperviscosity and fatal complications. Transfuse in 5 mL/kg aliquots. [See splenic treatment node](#/node/scd-splenic-treatment).',
      },
      {
        heading: '🛑 Do NOT skip incentive spirometry in VOC patients',
        body: 'Incentive spirometry every 2 hours while awake is evidence-based for preventing the development of acute chest syndrome during VOC. Start in the ED for all VOC patients — do not wait for admission. [See IV analgesia node](#/node/scd-voc-iv).',
      },
      {
        heading: '🛑 Do NOT diagnose ACS without a chest X-ray',
        body: 'Acute chest syndrome requires a NEW radiodensity on chest imaging PLUS fever and/or respiratory symptoms. You cannot diagnose ACS clinically without the radiographic component. Obtain a CXR for any SCD patient with respiratory symptoms, chest pain, or hypoxia. [See ACS node](#/node/scd-acs-start).',
      },
      {
        heading: '🛑 Do NOT use RBC transfusion to treat SCD priapism',
        body: 'Transfusion does not treat the priapism mechanism in sickle cell disease. For priapism under 4 hours, use supportive care (hydration, analgesia, O2). If >4 hours or refractory, proceed to corporal aspiration with phenylephrine per the Priapism consult. [See priapism route node](#/node/scd-priapism-route).',
      },
    ],
    citations: [],
  },

  'tca-toxidrome-stop': {
    id: 'tca-toxidrome-stop',
    title: 'TCA Overdose — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT use phenytoin or fosphenytoin for TCA seizures',
        body: 'Phenytoin is a sodium channel blocker — giving it in TCA toxicity adds more sodium channel blockade and may precipitate cardiac arrest. For TCA-induced seizures, use benzodiazepines first, then phenobarbital or propofol. Levetiracetam is safe for maintenance. [See refractory seizure node](#/node/tca-seizure-refractory).',
      },
      {
        heading: '🛑 Do NOT be reassured by normal QRS initially',
        body: 'TCA toxicity can progress from alert to cardiac arrest within 1 hour. A normal QRS at triage does not exclude significant ingestion. Check the R wave in aVR (>3 mm is a sensitive marker), perform serial ECGs every 15–30 minutes for at least 2 hours, and maintain continuous telemetry. [See normal QRS node](#/node/tca-ecg-low).',
      },
      {
        heading: '🛑 Do NOT allow hypoventilation post-intubation',
        body: 'Respiratory acidosis increases free (unbound) TCA drug levels, worsening sodium channel blockade in a lethal positive feedback loop. Post-intubation, hyperventilate immediately targeting ETCO2 ~25–30 mmHg while sodium bicarbonate takes effect. [See intubation node](#/node/tca-intubation).',
      },
      {
        heading: '🛑 Do NOT use TCA serum levels to guide management',
        body: 'TCA blood levels do not correlate with toxicity severity and are not useful for acute management decisions. Clinical features and ECG findings are the only reliable guides to treatment. Waiting for levels delays necessary treatment. [See resuscitation node](#/node/tca-critical).',
      },
      {
        heading: '🛑 Do NOT allow alkalosis to exceed pH 7.55',
        body: 'The target pH with sodium bicarbonate therapy is 7.50–7.55. Over-alkalinization beyond pH 7.55 increases arrhythmia and seizure risk, and can cause paradoxical CNS acidosis. Monitor serial ABG/VBG and titrate bicarbonate carefully. [See goals node](#/node/tca-bicarb-goals).',
      },
      {
        heading: '🛑 Do NOT stop bicarbonate after initial QRS narrowing',
        body: 'TCA half-life is 24–36 hours. QRS widening can recur after initial response as bicarbonate is metabolized. Continue the bicarbonate infusion until QRS remains <100 ms for at least 6 hours. Wean slowly with serial ECG monitoring. [See infusion node](#/node/tca-bicarb-infusion).',
      },
      {
        heading: '🛑 Do NOT underestimate TCA seizures',
        body: 'TCA-induced seizures cause lactic acidosis, which increases free drug levels, worsening cardiac toxicity in a lethal cycle. Treat with benzodiazepines AND simultaneous sodium bicarbonate. A TCA seizure that causes metabolic acidosis is a cardiac emergency. [See seizure assessment node](#/node/tca-seizure).',
      },
    ],
    citations: [],
  },

  'acetaminophen-stop': {
    id: 'acetaminophen-stop',
    title: 'Acetaminophen Overdose — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT delay NAC beyond 8 hours post-ingestion',
        body: 'N-acetylcysteine is nearly 100% effective when given within 8 hours of acetaminophen ingestion. Efficacy drops sharply after 8 hours as hepatocellular necrosis progresses. When the 8-hour mark is approaching and labs are pending, start NAC empirically — do not wait. [See initial assessment node](#/node/apap-start).',
      },
      {
        heading: '🛑 Do NOT apply the Rumack-Matthew nomogram to chronic ingestions',
        body: 'The Rumack-Matthew nomogram is only valid for acute single ingestions with a known time of ingestion. For repeated supratherapeutic ingestion or unknown timing, use the (ALT)(APAP) product and clinical judgment — the nomogram is meaningless in these scenarios. [See chronic evaluation node](#/node/apap-chronic-eval).',
      },
      {
        heading: '🛑 Do NOT stop NAC for anaphylactoid reaction',
        body: 'Flushing, urticaria, and bronchospasm during the NAC loading bag are histamine-mediated reactions — NOT IgE-mediated allergy. Slow or pause the infusion, treat with antihistamines, then resume at a slower rate. Permanently stopping NAC in an untreated APAP overdose is dangerous. [See IV NAC node](#/node/apap-nac-iv).',
      },
      {
        heading: '🛑 Do NOT use a single level drawn before 4 hours',
        body: 'An APAP level drawn before 4 hours post-ingestion cannot be plotted reliably on the Rumack-Matthew nomogram. Draw the level at 4 hours or later. An early undetectable level does not rule out significant ingestion. [See acute stratification node](#/node/apap-acute-strat).',
      },
      {
        heading: '🛑 Do NOT miss extended-release formulations',
        body: 'Extended-release acetaminophen tablets (Tylenol ER) have a delayed absorption profile. A single APAP level below the treatment line at 4–8 hours does NOT exclude toxicity — repeat the level 4–6 hours later to detect a rising concentration from delayed absorption. [See ER coingestant node](#/node/apap-er-coingest).',
      },
      {
        heading: '🛑 Do NOT treat chronic alcoholics with standard safe dose thresholds',
        body: 'Chronic alcohol use causes CYP2E1 induction and glutathione depletion — both increase NAPQI production and reduce detoxification capacity. In chronic alcoholics, hepatotoxicity can occur at doses generally considered safe (<4g/day). The maximum dose should not exceed 2g/day in this population. [See risk factors node](#/node/apap-acute-hx).',
      },
      {
        heading: '🛑 Do NOT delay charcoal while waiting for APAP level',
        body: 'If the patient presents within 4 hours of ingestion with a protected airway, give activated charcoal 1 g/kg immediately — do not wait for the APAP level to return before deciding. Delay reduces adsorption efficacy. [See GI decontamination node](#/node/apap-gi-decon).',
      },
      {
        heading: '🛑 Do NOT confuse NAC-related INR elevation with hepatic failure',
        body: 'NAC itself causes a mild, transient INR elevation through a direct effect on the clotting cascade — this does not represent hepatic synthetic failure. Treating this NAC-induced INR change with FFP is unnecessary and misleading. Track INR trends in context of the clinical picture. [See IV NAC node](#/node/apap-nac-iv).',
      },
    ],
    citations: [],
  },

};
