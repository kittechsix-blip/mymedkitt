import type { InfoPage } from '../info-pages.js';

export const STOP_PAGES_02: Record<string, InfoPage> = {

  'burns-stop': {
    id: 'burns-stop',
    title: 'Burns — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT skip inhalation injury screening',
        body: 'Inhalation injury can be present with a normal initial exam — stridor, singed nasal hairs, carbonaceous sputum, and a closed-space history are the key flags. Missed inhalation injury leads to fatal airway loss hours later. [See this node](#/node/burn-inhalation-screen).',
      },
      {
        heading: '🛑 Do NOT delay intubation in airway burns',
        body: 'Airway edema progresses rapidly over 12–24 hours. If you see oropharyngeal burns, stridor, or hoarseness, intubate early while anatomy is still recognizable — a delayed airway in a swollen face is a surgical emergency. [See this node](#/node/burn-airway-assess).',
      },
      {
        heading: '🛑 Do NOT forget CO poisoning in house fires',
        body: 'CO is colorless and odorless — pulse oximetry is falsely normal because carboxyhemoglobin reads as oxyhemoglobin. Co-oximetry or ABG is required. Treat with 100% O₂ regardless of SpO₂ reading. [See this node](#/node/burn-co-assess).',
      },
      {
        heading: '🛑 Do NOT miss cyanide toxicity in structure fires',
        body: 'Burning synthetic materials (plastics, upholstery) releases hydrogen cyanide. Patients with altered mental status or refractory lactic acidosis out of proportion to CO level should receive empiric hydroxocobalamin — do not wait for confirmatory testing. [See this node](#/node/burn-cyanide).',
      },
      {
        heading: '🛑 Do NOT use ice water on burns',
        body: 'Ice or cold water causes vasoconstriction, worsens tissue injury, and can induce hypothermia in large burns. Cool (not cold) tap water for 20 minutes is the correct first-aid intervention. [See this node](#/node/burn-wound-care).',
      },
      {
        heading: '🛑 Do NOT over-resuscitate with IV fluids',
        body: '"Fluid creep" — exceeding Parkland formula volumes — causes abdominal compartment syndrome, pulmonary edema, and increased mortality. Target UOP 0.5–1.0 mL/kg/hr and titrate down if exceeding formula. [See this node](#/node/burn-fluids-severe).',
      },
      {
        heading: '🛑 Do NOT under-resuscitate pediatric burns',
        body: 'Children have higher body surface area to mass ratio and limited glycogen stores. Use the pediatric Parkland formula and add maintenance fluids with dextrose — dehydration and hypoglycemia develop faster than in adults. [See this node](#/node/burn-fluids-peds).',
      },
      {
        heading: '🛑 Do NOT miss circumferential burns needing escharotomy',
        body: 'Circumferential full-thickness burns of extremities or the chest can cause compartment syndrome and respiratory failure within hours. Check pulses, assess chest excursion, and act early — escharotomy is a time-critical procedure. [See this node](#/node/burn-eschar-screen).',
      },
      {
        heading: '🛑 Do NOT delay burn center transfer for appropriate patients',
        body: 'Major burns (TBSA ≥20%, full-thickness, hands/face/genitalia, inhalation, chemical, electrical) require burn center expertise. Stabilize the airway and vascular access, then transfer — do not attempt definitive wound management in the ED. [See this node](#/node/burn-transfer).',
      },
      {
        heading: '🛑 Do NOT treat chemical burns without continuous irrigation',
        body: 'Chemical burns require prolonged irrigation (30–60 min for acids, longer for alkalis) — a brief rinse is inadequate. Alkali burns continue to penetrate tissue well after exposure ends. Check pH of runoff to confirm adequacy. [See this node](#/node/burn-chem-start).',
      },
    ],
    citations: [],
  },

  'stroke-stop': {
    id: 'stroke-stop',
    title: 'Stroke — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT miss the last known well time',
        body: 'IV tPA eligibility is based on time from last known well (LKW), NOT time of symptom discovery. Wake-up strokes and unwitnessed events still qualify for imaging-based protocols if the DWI/FLAIR mismatch or CT perfusion shows viable tissue. [See this node](#/node/stroke-timing).',
      },
      {
        heading: '🛑 Do NOT give tPA with BP ≥185/110',
        body: 'Uncontrolled hypertension before tPA dramatically increases hemorrhagic transformation risk. Bring BP to <185/110 before bolusing — if it cannot be maintained there, do not give tPA. [See this node](#/node/stroke-ivt-check).',
      },
      {
        heading: '🛑 Do NOT aggressively lower BP in untreated ischemic stroke',
        body: 'Penumbral tissue depends on collateral flow driven by elevated BP. Unless BP >220/120 (or >185/110 if tPA eligible), do not lower pressure — you will extend the infarct. [See this node](#/node/stroke-ivt-check).',
      },
      {
        heading: '🛑 Do NOT withhold large vessel occlusion workup',
        body: 'Patients with NIHSS ≥6 and proximal deficits should receive CTA head and neck immediately. Missing a large vessel occlusion means missing a thrombectomy candidate — the intervention with the strongest mortality and functional outcome data in all of medicine. [See this node](#/node/stroke-lvo-check).',
      },
      {
        heading: '🛑 Do NOT give aspirin or anticoagulants before hemorrhage is excluded',
        body: 'Antiplatelet and anticoagulant therapy in hemorrhagic stroke is catastrophic. Always obtain non-contrast CT before any antithrombotic treatment. [See this node](#/node/stroke-deficit).',
      },
      {
        heading: '🛑 Do NOT start anticoagulation for AF stroke in the first 24 hours',
        body: 'Immediate anticoagulation after a large cardioembolic stroke converts ischemic infarct to hemorrhagic infarct. The standard approach delays anticoagulation 4–14 days based on infarct size (the 1-3-6-12 rule). [See this node](#/node/stroke-afib).',
      },
      {
        heading: '🛑 Do NOT neglect post-tPA monitoring',
        body: 'After IV alteplase, patients require q15-min neuro checks and blood pressure monitoring for 2 hours, then q30-min for 6 hours. New headache, vomiting, or acute neurological deterioration after tPA = hemorrhagic transformation until proven otherwise — stop the infusion and get a stat CT. [See this node](#/node/stroke-post-treatment).',
      },
      {
        heading: '🛑 Do NOT give tPA for NIHSS 0–5 minor strokes without shared decision',
        body: 'Minor disabling strokes may still warrant tPA, but NIHSS ≤5 non-disabling strokes have a favorable natural history. For minor non-disabling strokes, DAPT (aspirin + clopidogrel for 21 days) is the evidence-based alternative. [See this node](#/node/stroke-minor).',
      },
    ],
    citations: [],
  },

  'ich-stop': {
    id: 'ich-stop',
    title: 'ICH — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT wait for labs before reversing anticoagulation',
        body: 'In ICH on anticoagulation, empiric reversal should begin as soon as the agent is identified — do not wait for INR, anti-Xa level, or anti-IIa level to return. Hematoma expansion risk is highest in the first 3 hours. [See this node](#/node/ich-anticoag).',
      },
      {
        heading: '🛑 Do NOT use platelet transfusion for ICH on antiplatelets',
        body: 'The PATCH trial showed platelet transfusion in ICH patients on antiplatelets leads to significantly WORSE outcomes. Do not reflexively transfuse platelets — it is contraindicated. [See this node](#/node/ich-anticoag).',
      },
      {
        heading: '🛑 Do NOT lower BP below SBP 130 in ICH',
        body: 'Dropping SBP below 130 is potentially harmful in ICH. Target SBP 130–150 for presenting SBP of 150–220. Avoid drops >70 mmHg in the first hour regardless of starting pressure. [See this node](#/node/ich-bp).',
      },
      {
        heading: '🛑 Do NOT use nitroprusside or nitroglycerin for BP control',
        body: 'These agents are vasodilators that increase cerebral blood volume and raise ICP — the opposite of what is needed in ICH. Use clevidipine, nicardipine, or labetalol instead. [See this node](#/node/ich-bp).',
      },
      {
        heading: '🛑 Do NOT prophylactically prescribe antiseizure medications',
        body: 'Seizure prophylaxis is NOT recommended in ICH — phenytoin was shown to have no benefit and may worsen outcomes. Treat only witnessed convulsive seizures or EEG-confirmed seizure activity with levetiracetam. [See this node](#/node/ich-seizures).',
      },
      {
        heading: '🛑 Do NOT use dabigatran reversal agents for Xa inhibitors',
        body: 'Idarucizumab reverses only dabigatran. For rivaroxaban and apixaban, use andexanet alfa or 4-factor PCC — giving the wrong reversal agent wastes time and money. Confirm the specific agent before ordering reversal. [See this node](#/node/ich-dabi-rev).',
      },
      {
        heading: '🛑 Do NOT under-treat cerebellar ICH',
        body: 'Cerebellar hemorrhage >15 mL with brainstem compression or hydrocephalus requires immediate neurosurgical evacuation. EVD alone without posterior fossa decompression risks upward herniation. Rapid deterioration is the rule — act before herniation occurs. [See this node](#/node/ich-cerebellar-surg).',
      },
      {
        heading: '🛑 Do NOT ignore coagulation-adjacent abnormalities',
        body: 'Even mild coagulopathy (INR >1.3) can drive hematoma expansion. Correct all abnormal coagulation including elevated INR, thrombocytopenia, and uremic platelet dysfunction. Check a full coagulation panel including the specific anticoagulant level. [See this node](#/node/ich-coag-adj).',
      },
      {
        heading: '🛑 Do NOT ignore ICP crisis signs',
        body: 'Perihematomal edema peaks at 5–6 days post-ICH — anticipate delayed deterioration. Rising ICP requires osmotic therapy bridge (hypertonic saline bolus), urgent neurosurgical consultation, and consideration of EVD. [See this node](#/node/ich-icp-fever).',
      },
    ],
    citations: [],
  },

  'status-epilepticus-stop': {
    id: 'status-epilepticus-stop',
    title: 'Status Epilepticus — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT underdose benzodiazepines',
        body: 'Lorazepam 0.1 mg/kg IV (up to 4 mg) or diazepam 0.2 mg/kg IV are the evidence-based doses. Subtherapeutic dosing (e.g., "2 mg of Ativan") is the most common error in SE — inadequate dosing fails to terminate seizures and delays the treatment ladder. [See this node](#/node/se-iv-bzd).',
      },
      {
        heading: '🛑 Do NOT delay second-line ASM after BZD failure',
        body: 'If the seizure persists 5 minutes after adequate BZD, administer a second-line agent (levetiracetam, valproate, or fosphenytoin) within 5–10 minutes. The ESETT trial showed all three have equivalent efficacy — just choose one and give it at full dose. [See this node](#/node/se-2nd-line-choice).',
      },
      {
        heading: '🛑 Do NOT use phenytoin as first choice in SE',
        body: 'The ESETT trial demonstrated phenytoin (as fosphenytoin) is equivalent to levetiracetam and valproate but has more adverse effects, drug interactions, and a slower infusion rate. Levetiracetam or valproate are generally preferred first unless specific contraindications exist. [See this node](#/node/se-fosphenytoin).',
      },
      {
        heading: '🛑 Do NOT use long-acting paralytics in refractory SE',
        body: 'Vecuronium and rocuronium abolish motor activity but do not stop electrical seizures — the brain continues to seize even with no visible movement. If you must intubate, use succinylcholine (short-acting) and immediately start continuous EEG monitoring. [See this node](#/node/se-rse-prep).',
      },
      {
        heading: '🛑 Do NOT start RSE infusions without continuous EEG',
        body: 'Refractory SE infusions (propofol, midazolam, ketamine) cannot be titrated without continuous EEG — you have no way to confirm seizure suppression or detect breakthrough seizures in a paralyzed/sedated patient. [See this node](#/node/se-rse-monitoring).',
      },
      {
        heading: '🛑 Do NOT miss metabolic causes before escalating therapy',
        body: 'Hypoglycemia, hyponatremia, and hypocalcemia all cause SE and will not respond to antiseizure medications until corrected. Check a bedside glucose immediately and send full electrolytes and calcium with initial labs. [See this node](#/node/se-glucose-labs).',
      },
      {
        heading: '🛑 Do NOT miss eclampsia in a seizing pregnant patient',
        body: 'Seizure in a pregnant patient should be treated as eclampsia first — magnesium sulfate is the definitive treatment and benzodiazepines are adjunctive. Using BZDs alone without magnesium fails to prevent recurrence. [See this node](#/node/se-pregnancy).',
      },
      {
        heading: '🛑 Do NOT give valproate in pregnancy or suspected mitochondrial disease',
        body: 'Valproate is teratogenic (Class X/D) and is contraindicated in pregnancy. It also precipitates acute liver failure in POLG1 mitochondrial disease — use levetiracetam or fosphenytoin in these patients. [See this node](#/node/se-valproate).',
      },
      {
        heading: '🛑 Do NOT discharge first-time SE without identifying the underlying cause',
        body: 'New-onset SE mandates an urgent workup: LP (if no mass lesion), MRI brain, metabolic panel, toxicology, and neurology consultation. Discharging without a cause identified exposes the patient to recurrent life-threatening events. [See this node](#/node/se-disposition).',
      },
    ],
    citations: [],
  },

  'sah-stop': {
    id: 'sah-stop',
    title: 'SAH — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT discharge thunderclap headache without SAH workup',
        body: 'Up to 5% of SAH patients are missed on initial ED visit — the misdiagnosis rate is highest when the headache is the only symptom (sentinel bleed). Any sudden, severe headache reaching maximum intensity within seconds requires CT and LP or CTA workup. [See this node](#/node/sah-ottawa).',
      },
      {
        heading: '🛑 Do NOT rely on CT alone if it is performed >6 hours after onset',
        body: 'CT sensitivity for SAH drops significantly after 6 hours as blood breaks down. A negative CT >6 hours after onset requires LP (xanthochromia) or CT angiography to exclude SAH. [See this node](#/node/sah-ct-result).',
      },
      {
        heading: '🛑 Do NOT allow BP to spike before aneurysm is secured',
        body: 'Rebleeding from an unsecured aneurysm is catastrophic, with mortality approaching 70%. Target SBP <160 mmHg from time of diagnosis until the aneurysm is secured surgically or endovascularly. [See this node](#/node/sah-bp-control).',
      },
      {
        heading: '🛑 Do NOT give NSAIDs for SAH headache',
        body: 'NSAIDs impair platelet function, which can worsen bleeding in a patient with an unsecured aneurysm. Use acetaminophen and opioids cautiously (impair neuro exam) for pain. [See this node](#/node/sah-initial-mgmt).',
      },
      {
        heading: '🛑 Do NOT start nimodipine before confirming no hemorrhagic contraindication',
        body: 'Nimodipine prevents vasospasm and improves outcomes in SAH — but it is a potent vasodilator that can cause dangerous hypotension, especially in already hypotensive patients. Confirm hemodynamic stability and avoid co-administration with other antihypertensives. [See this node](#/node/sah-vasospasm-prev).',
      },
      {
        heading: '🛑 Do NOT give antifibrinolytics beyond 72 hours',
        body: 'Aminocaproic acid and tranexamic acid reduce rebleeding risk in the very early period but increase the risk of delayed cerebral ischemia and hydrocephalus if continued beyond 72 hours. Definitive aneurysm treatment takes priority over antifibrinolytics. [See this node](#/node/sah-rebleed-prev).',
      },
      {
        heading: '🛑 Do NOT skip ECG and troponin in SAH',
        body: 'SAH causes ECG changes in 50–100% of patients (QT prolongation, T-wave inversions, ST changes) and neurogenic myocardial injury with elevated troponin. These are neurogenic, not ischemic — do not take the patient to the cath lab. [See this node](#/node/sah-cardiac-comp).',
      },
      {
        heading: '🛑 Do NOT perform aggressive seizure prophylaxis',
        body: 'Routine prolonged antiseizure prophylaxis in SAH is not recommended — evidence supports short-term use (≤3 days) at most. Phenytoin in particular is associated with worse cognitive outcomes. [See this node](#/node/sah-seizure-mgmt).',
      },
      {
        heading: '🛑 Do NOT manage SAH at a non-specialized center without transfer',
        body: 'Outcomes in SAH are significantly better at high-volume centers with dedicated neurovascular teams. Stabilize and transfer — do not attempt definitive aneurysm treatment or complex ICP management at a facility without neurosurgical capability. [See this node](#/node/sah-transfer).',
      },
    ],
    citations: [],
  },

  'nstemi-stop': {
    id: 'nstemi-stop',
    title: 'NSTEMI — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT delay anticoagulation while awaiting cardiology',
        body: 'Anticoagulation with heparin or a factor Xa inhibitor should begin in the ED as soon as NSTEMI is confirmed. Waiting for cardiology sign-off or cath lab scheduling before starting anticoagulation leaves the culprit lesion unprotected. [See this node](#/node/nstemi-initial-anticoag).',
      },
      {
        heading: '🛑 Do NOT treat all NSTEMIs the same — emergent PCI is sometimes needed',
        body: 'Ongoing chest pain, hemodynamic instability, signs of heart failure, malignant arrhythmia, or EF ≤35% are indications for emergent (within 2 hours) invasive strategy. These patients should go to the cath lab immediately, not wait for morning rounds. [See this node](#/node/nstemi-emergent).',
      },
      {
        heading: '🛑 Do NOT give morphine routinely for chest pain',
        body: 'Morphine delays P2Y12 inhibitor absorption by slowing gastric motility and is associated with increased mortality in ACS. Reserve opioids for truly refractory pain and rely on nitrates and oxygen first. [See this node](#/node/nstemi-early-invasive).',
      },
      {
        heading: '🛑 Do NOT give routine oxygen if SpO₂ ≥90%',
        body: 'Supplemental oxygen in normoxic ACS patients may increase infarct size through coronary vasoconstriction. Apply O₂ only if SpO₂ <90% or the patient is dyspneic. [See this node](#/node/nstemi-initial-anticoag).',
      },
      {
        heading: '🛑 Do NOT give prasugrel to patients with prior stroke or TIA',
        body: 'Prasugrel is absolutely contraindicated in patients with prior stroke or TIA — the TRITON trial showed a significant net harm in this population due to ICH risk. Use ticagrelor or clopidogrel instead. [See this node](#/node/nstemi-risk-stratify).',
      },
      {
        heading: '🛑 Do NOT use clopidogrel if the anatomy is unknown and CABG is possible',
        body: 'Clopidogrel requires a 5-day washout before CABG. In patients going to early invasive strategy where anatomy is unknown, ticagrelor (3-day washout) or withholding P2Y12 until anatomy is known are preferred strategies to avoid surgical delay. [See this node](#/node/nstemi-timi-stratify).',
      },
      {
        heading: '🛑 Do NOT miss MINOCA as a NSTEMI mimic',
        body: 'Myocardial Infarction with Non-Obstructive Coronary Arteries (MINOCA) causes troponin elevation with a culprit mechanism other than plaque rupture (spasm, dissection, embolism, myocarditis). Standard ACS anticoagulation and P2Y12 therapy may not be appropriate — workup determines treatment. [See this node](#/node/nstemi-minoca).',
      },
      {
        heading: '🛑 Do NOT prescribe triple therapy without explicit indication',
        body: 'Aspirin + P2Y12 inhibitor + oral anticoagulant (triple therapy) dramatically increases bleeding risk. It is only indicated in very specific scenarios (AF + recent PCI + high thrombotic risk). Most patients require dual therapy or anticoagulant alone. [See this node](#/node/nstemi-triple-therapy).',
      },
    ],
    citations: [],
  },

  'stemi-stop': {
    id: 'stemi-stop',
    title: 'STEMI — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT miss posterior STEMI in anterior ST depression',
        body: 'ST depression in V1–V3 with upright T waves and a prominent R wave is posterior STEMI until proven otherwise. Obtain posterior leads V7–V9 immediately — these patients need emergent reperfusion, not medical management. [See this node](#/node/stemi-posterior).',
      },
      {
        heading: '🛑 Do NOT dismiss new LBBB without Sgarbossa criteria evaluation',
        body: 'New LBBB with ongoing ischemic symptoms should be managed as STEMI regardless of whether the LBBB is "new" or "old." Apply Sgarbossa criteria and activate the cath lab when clinical suspicion is high. [See this node](#/node/stemi-lbbb).',
      },
      {
        heading: '🛑 Do NOT give nitroglycerin in suspected RV infarct',
        body: 'Right ventricular infarct (inferior STEMI with right-sided lead STE) depends on preload to maintain output. Nitroglycerin causes catastrophic hypotension in this setting. Obtain right-sided leads in all inferior STEMIs before giving nitrates. [See this node](#/node/stemi-initial-tx).',
      },
      {
        heading: '🛑 Do NOT give oxygen if SpO₂ ≥90%',
        body: 'Routine supplemental oxygen in normoxic STEMI patients may increase infarct size through coronary vasoconstriction and generation of reactive oxygen species. Apply O₂ only if SpO₂ <90%. [See this node](#/node/stemi-initial-tx).',
      },
      {
        heading: '🛑 Do NOT use prasugrel in prior stroke/TIA patients',
        body: 'Prasugrel is absolutely contraindicated in patients with prior stroke or TIA due to excess ICH risk. Use ticagrelor (180 mg) or clopidogrel (600 mg) instead. Verify this contraindication before loading. [See this node](#/node/stemi-p2y12).',
      },
      {
        heading: '🛑 Do NOT give fibrinolytics without checking contraindications',
        body: 'Absolute contraindications to lytics include prior ICH, ischemic stroke within 3 months, known intracranial malignancy, aortic dissection, and significant closed head trauma. Giving fibrinolytics in these patients causes catastrophic hemorrhage. [See this node](#/node/stemi-lytics).',
      },
      {
        heading: '🛑 Do NOT take STEMI patients to the cath lab within 2–3 hours of fibrinolytics',
        body: 'Post-lytic angiography should be performed 3–24 hours after fibrinolysis, not within the first 2–3 hours. Early post-lytic intervention is associated with higher rates of bleeding and reocclusion. [See this node](#/node/stemi-post-lytics).',
      },
      {
        heading: '🛑 Do NOT withhold vasopressors in cardiogenic shock out of fear of worsening ischemia',
        body: 'In cardiogenic shock, coronary perfusion pressure is dependent on MAP. Withholding vasopressors allows hypotension to worsen ischemia. Norepinephrine to maintain coronary perfusion is mandatory while the patient is being prepared for emergent PCI. [See this node](#/node/stemi-shock).',
      },
      {
        heading: '🛑 Do NOT delay transfer for non-PCI center STEMI patients',
        body: 'Door-to-balloon time is the most modifiable mortality predictor. If primary PCI is not available at your facility, the correct move is immediate transfer — not fibrinolytics as a substitute for a PCI-capable center with short transfer times. [See this node](#/node/stemi-transfer).',
      },
    ],
    citations: [],
  },

  'suicide-risk-assessment-stop': {
    id: 'suicide-risk-assessment-stop',
    title: 'Suicide Risk — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT assess suicide risk in an intoxicated patient',
        body: 'An intoxicated patient cannot reliably report suicidal ideation or engage in safety planning. Observe until clinically sober, then re-administer the C-SSRS. Documenting "patient denies SI" in an intoxicated patient is medically and legally inadequate. [See this node](#/node/sui-intox).',
      },
      {
        heading: '🛑 Do NOT discharge without a written safety plan',
        body: 'A verbal safety conversation is insufficient — the patient must leave with a written, personalized safety plan that includes warning signs, coping strategies, support contacts, and 988/crisis line information. The safety plan must be in the chart. [See this node](#/node/sui-safety-plan).',
      },
      {
        heading: '🛑 Do NOT skip lethal means counseling',
        body: 'Means restriction is the single most evidence-based intervention for suicide prevention. Firearms account for 50% of suicides. Ask specifically about firearms, medications, and other means, and create a specific plan for restriction before discharge. [See this node](#/node/sui-lethal-means).',
      },
      {
        heading: '🛑 Do NOT discharge without confirmed outpatient follow-up',
        body: 'The period immediately following ED discharge is highest risk. A specific appointment — not just a referral — within 24–72 hours must be confirmed before discharge. Patients without confirmed follow-up should be reconsidered for hospitalization. [See this node](#/node/sui-discharge-criteria).',
      },
      {
        heading: '🛑 Do NOT leave a high-risk patient unmonitored',
        body: 'High-risk patients require 1:1 observation, removal of all ligature risks, sharps, and medications from the room, and continuous monitoring. A chart note is not a safety measure. [See this node](#/node/sui-high-risk).',
      },
      {
        heading: '🛑 Do NOT dismiss suicidal ideation as "attention seeking"',
        body: 'All expressed suicidal ideation requires structured risk assessment. Prior attempts are the strongest predictor of future attempts — patients with prior high-lethality attempts are at extremely high risk regardless of stated intent at the current visit. [See this node](#/node/sui-high-factors).',
      },
      {
        heading: '🛑 Do NOT discharge without completing documentation',
        body: 'Joint Commission NPSG 15.01.01 requires specific documentation elements including validated screening tool used, risk and protective factors identified, lethal means counseling provided, safety plan in chart, and specific follow-up plan. Suicide within 7 days of ED discharge is now a sentinel event. [See this node](#/node/sui-documentation).',
      },
      {
        heading: '🛑 Do NOT apply adult criteria to adolescent or geriatric patients',
        body: 'Adolescents and elderly patients have distinct risk profiles and social circumstances that require tailored assessment. Elderly men are at particularly high suicide risk but often underreport ideation. [See this node](#/node/sui-special-pops).',
      },
    ],
    citations: [],
  },

  'potassium-stop': {
    id: 'potassium-stop',
    title: 'Potassium — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT treat severe hyperkalemia before getting an ECG',
        body: 'The ECG confirms clinical significance — a K+ of 7.5 with a normal ECG likely represents pseudohyperkalemia and should be repeated before treating. A normal ECG in the face of a critical lab value should trigger a repeat specimen. [See this node](#/node/k-hyper-ecg).',
      },
      {
        heading: '🛑 Do NOT give temporizing therapy without definitive elimination',
        body: 'Calcium, insulin, and albuterol shift potassium into cells temporarily — K+ rebounds in 2–4 hours. These measures must always be paired with definitive elimination therapy (diuretics, kayexalate/patiromer, or dialysis). [See this node](#/node/k-hyper-step1).',
      },
      {
        heading: '🛑 Do NOT give hypertonic bicarbonate (ampules alone) for hyperkalemia',
        body: 'IV bicarbonate ampules alone are ineffective for hyperkalemia per multiple RCTs — osmotic shifts counteract the K-lowering effect. Use isotonic bicarbonate (3 ampules in 1L D5W) as the resuscitative fluid if alkalinization is desired. [See this node](#/node/k-hyper-bicarb).',
      },
      {
        heading: '🛑 Do NOT forget to check and correct magnesium in hypokalemia',
        body: 'Up to 50% of hypokalemic patients have concurrent hypomagnesemia, which renders potassium repletion refractory. Check and correct Mg before assuming K+ replacement is failing. [See this node](#/node/k-hypo-severe).',
      },
      {
        heading: '🛑 Do NOT use glucose-containing fluids for IV potassium replacement',
        body: 'Dextrose-containing IV fluids stimulate insulin release, which drives K+ further into cells and worsens hypokalemia. Use glucose-free normal saline for IV potassium administration. [See this node](#/node/k-hypo-severe).',
      },
      {
        heading: '🛑 Do NOT aggressively replace K+ in hypokalemic periodic paralysis',
        body: 'In hypokalemic periodic paralysis, the hypokalemia is transcellular redistribution — NOT true depletion. Aggressive K+ replacement causes dangerous rebound hyperkalemia as the attack resolves. Small, carefully titrated doses with close monitoring are required. [See this node](#/node/k-hypopp-assess).',
      },
      {
        heading: '🛑 Do NOT miss pseudohyperkalemia before escalating treatment',
        body: 'In vitro hemolysis (most common), prolonged tourniquet time, and extreme leukocytosis or thrombocytosis can all falsely elevate K+. A critical K+ with a normal ECG is pseudohyperkalemia until proven otherwise — repeat the specimen. [See this node](#/node/k-pseudo).',
      },
      {
        heading: '🛑 Do NOT give calcium gluconate via peripheral IV at rapid rates without monitoring',
        body: 'Calcium gluconate in hyperkalemia should be given over 5–10 minutes with continuous cardiac monitoring. Too-rapid infusion causes bradycardia and cardiac arrest. Calcium chloride requires a large-bore or central line due to high risk of tissue necrosis with extravasation. [See this node](#/node/k-hyper-calcium).',
      },
    ],
    citations: [],
  },

  'sodium-stop': {
    id: 'sodium-stop',
    title: 'Sodium — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT correct hyponatremia faster than 10 mEq/L in 24 hours',
        body: 'Overcorrection of chronic hyponatremia causes osmotic demyelination syndrome (ODS) — an irreversible pontine injury causing locked-in syndrome, quadriplegia, or death. In high-risk patients (Na ≤105, alcohol use disorder, liver disease, malnutrition), limit to ≤8 mEq/L per 24 hours. [See this node](#/node/na-hypo-correction-limits).',
      },
      {
        heading: '🛑 Do NOT delay hypertonic saline for severely symptomatic hyponatremia',
        body: 'Seizures, coma, and respiratory distress from cerebral edema are life-threatening. Give 100 mL of 3% NaCl IV over 10–20 minutes immediately — do not delay for central line placement. Peripheral access is acceptable for boluses. [See this node](#/node/na-hypo-emergency).',
      },
      {
        heading: '🛑 Do NOT give normal saline to patients with SIAD',
        body: 'In SIAD, normal saline is excreted as concentrated urine while the free water is retained — it paradoxically worsens hyponatremia. Fluid restriction, oral urea, or salt tabs with furosemide are the appropriate therapies. [See this node](#/node/na-siad-treatment).',
      },
      {
        heading: '🛑 Do NOT use vaptans (tolvaptan) in hyponatremia',
        body: 'Vaptans cause unpredictable and rapid sodium correction with a high risk of ODS, carry risk of serious hepatotoxicity, and have no mortality benefit. European guidelines and IBCC explicitly recommend against their use. [See this node](#/node/na-siad-treatment).',
      },
      {
        heading: '🛑 Do NOT correct hypernatremia faster than 10–12 mEq/L per 24 hours',
        body: 'Rapid correction of chronic hypernatremia causes cerebral edema, seizures, and herniation as osmoles that accumulated to protect neurons are now washed out. Correct chronic hypernatremia over 48–72 hours. [See this node](#/node/na-hyper-fwd).',
      },
      {
        heading: '🛑 Do NOT forget potassium correction counts toward sodium correction',
        body: 'Potassium replacement raises serum sodium — K+ enters cells, displacing Na+ into extracellular fluid. If you give 40 mEq KCl, expect Na+ to rise ~1 mEq/L. Concurrent K+ repletion must be factored into your correction trajectory. [See this node](#/node/na-hypo-correction-limits).',
      },
      {
        heading: '🛑 Do NOT miss non-hypotonic causes of hyponatremia',
        body: 'Hyperglycemia, mannitol, and radiocontrast all cause hyponatremia by osmotic water shift — measured Na+ is low but effective osmolality is normal or high. The corrected sodium for hyperglycemia is: add 1.6 mEq/L for every 100 mg/dL glucose above 100. [See this node](#/node/na-non-hypotonic).',
      },
      {
        heading: '🛑 Do NOT use D5W for hypernatremia if volume depletion is present',
        body: 'Pure free water (D5W) does not expand intravascular volume and will not correct the hemodynamic instability of volume-depleted hypernatremia. Use 0.45% NaCl for concurrent volume and free water replacement when the patient is hemodynamically compromised. [See this node](#/node/na-hyper-fwd).',
      },
      {
        heading: '🛑 Do NOT diagnose SIAD without ruling out adrenal insufficiency',
        body: 'Adrenal insufficiency causes euvolemic hyponatremia that mimics SIAD. Treating adrenal insufficiency with hydrocortisone can rapidly correct sodium — rapid correction via steroid replacement causes ODS if not anticipated and managed. [See this node](#/node/na-hypo-adrenal).',
      },
    ],
    citations: [],
  },

  'neurosyphilis-stop': {
    id: 'neurosyphilis-stop',
    title: 'Neurosyphilis — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT treat neurosyphilis with benzathine penicillin IM',
        body: 'Benzathine penicillin G does NOT achieve adequate CSF drug levels — it is the correct treatment for latent syphilis, not neurosyphilis. Neurosyphilis requires aqueous crystalline penicillin G 18–24 million units/day IV for 10–14 days. [See this node](#/node/ns-confirmed).',
      },
      {
        heading: '🛑 Do NOT skip neurosyphilis treatment for ocular or otosyphilis',
        body: 'Ocular syphilis (uveitis, optic neuritis) and otosyphilis (SNHL, tinnitus) must be treated at the neurosyphilis level — aqueous PCN G IV — regardless of CSF findings. Benzathine dosing will fail to penetrate to the eye or inner ear. [See this node](#/node/ns-ocular-otic).',
      },
      {
        heading: '🛑 Do NOT use CSF-VDRL as a rule-out test',
        body: 'CSF-VDRL is highly specific for neurosyphilis but has low sensitivity (~30–70%). A negative CSF-VDRL does not exclude neurosyphilis in a symptomatic patient. CSF pleocytosis (>5 WBCs) and elevated protein are supportive criteria that should inform treatment even with a negative VDRL. [See this node](#/node/ns-csf-result).',
      },
      {
        heading: '🛑 Do NOT perform LP for routine asymptomatic late latent syphilis',
        body: 'Routine LP is NOT recommended in asymptomatic late latent syphilis. Reserve LP for: treatment failure, HIV co-infection with late latent stage, newly developed neurological symptoms, or tertiary syphilis manifestations. [See this node](#/node/ns-asymptomatic).',
      },
      {
        heading: '🛑 Do NOT skip penicillin desensitization in PCN-allergic patients',
        body: 'Penicillin is the only proven effective treatment for neurosyphilis. In PCN-allergic patients, desensitization is the preferred approach — ceftriaxone has very limited data and should be used only when desensitization is truly impossible. [See this node](#/node/ns-confirmed).',
      },
      {
        heading: '🛑 Do NOT omit infectious disease consultation',
        body: 'Neurosyphilis management involves CSF interpretation nuances, penicillin allergy management, treatment monitoring, and HIV co-infection considerations. Infectious disease consultation is essential for all confirmed or probable neurosyphilis cases. [See this node](#/node/ns-probable).',
      },
    ],
    citations: [],
  },

  'syphilis-stop': {
    id: 'syphilis-stop',
    title: 'Syphilis — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT use azithromycin for syphilis treatment',
        body: 'Azithromycin resistance (macrolide A2058G mutation) is widespread in the United States — treatment failures are well documented. Penicillin G is the only proven curative treatment. Azithromycin should never be used for syphilis. [See this node](#/node/syph-pcn-allergy).',
      },
      {
        heading: '🛑 Do NOT use benzathine penicillin alternatives in pregnancy without desensitization',
        body: 'Penicillin is the only treatment proven to prevent vertical transmission — there are NO adequate alternatives in pregnancy. A PCN-allergic pregnant patient with syphilis requires inpatient penicillin desensitization, not doxycycline or ceftriaxone. [See this node](#/node/syph-pregnancy).',
      },
      {
        heading: '🛑 Do NOT confuse Jarisch-Herxheimer reaction with drug allergy',
        body: 'JHR (fever, rigors, myalgias, worsening rash within 2–8 hours of treatment) occurs in 10–35% of primary and up to 90% of secondary syphilis. It is an immune response to dying spirochetes — NOT a penicillin allergy. Treat supportively and do NOT withhold subsequent doses. [See this node](#/node/syph-treat-early).',
      },
      {
        heading: '🛑 Do NOT miss neurological or ocular symptoms that mandate neurosyphilis workup',
        body: 'Neurosyphilis can occur at ANY stage. Any syphilis patient with headache, visual changes, hearing loss, altered cognition, or focal neurological findings requires evaluation for neurosyphilis and ocular/otosyphilis — not just stage-based benzathine treatment. [See this node](#/node/syph-neuro-screen).',
      },
      {
        heading: '🛑 Do NOT treat early latent syphilis as late latent without establishing duration',
        body: 'Early latent (<1 year) requires 1 dose of benzathine PCN G 2.4M units IM. Late latent (>1 year or unknown duration) requires 3 weekly doses — a single injection is insufficient. Confirm timeline from partner exposure and prior serology. [See this node](#/node/syph-latent-early).',
      },
      {
        heading: '🛑 Do NOT treat partner exposures within 90 days expectantly',
        body: 'Contacts of primary or secondary syphilis within the preceding 90 days should be treated presumptively even if seronegative — early infection may not be detectable yet. Testing alone misses the window period. [See this node](#/node/syph-partner-exposure).',
      },
      {
        heading: '🛑 Do NOT discharge without confirming follow-up serology',
        body: 'Treatment response is monitored by quantitative nontreponemal titer (RPR/VDRL) — expect a 4-fold decline by 6–12 months. Failure to arrange follow-up serology means treatment failure goes undetected. [See this node](#/node/syph-discharge).',
      },
      {
        heading: '🛑 Do NOT give doxycycline for PCN-allergic pregnant patients',
        body: 'Doxycycline is teratogenic and absolutely contraindicated in the second and third trimester. Erythromycin and ceftriaxone have insufficient evidence for preventing congenital syphilis. Desensitization to penicillin is mandatory. [See this node](#/node/syph-treat-pregnancy).',
      },
    ],
    citations: [],
  },

  'pep-stop': {
    id: 'pep-stop',
    title: 'HIV PEP — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT start PEP after 72 hours',
        body: 'PEP has no proven efficacy when started more than 72 hours after exposure. Do not prescribe it — counsel on risk reduction and PrEP for ongoing exposure risk instead. [See this node](#/node/pep-late).',
      },
      {
        heading: '🛑 Do NOT prescribe only a "starter pack"',
        body: 'Starter packs requiring a follow-up visit for refill result in unacceptably high non-completion rates. Prescribe the full 28-day course from the ED — incomplete PEP is significantly less effective than the complete regimen. [See this node](#/node/pep-regimen).',
      },
      {
        heading: '🛑 Do NOT use a 2-drug regimen for PEP',
        body: 'The current standard of care is 3-drug therapy. The preferred regimen is Biktarvy (bictegravir/emtricitabine/TAF) once daily for 28 days. Older 2-drug regimens (AZT + 3TC) are no longer recommended due to inferior efficacy and tolerability. [See this node](#/node/pep-regimen).',
      },
      {
        heading: '🛑 Do NOT skip baseline HIV testing before starting PEP',
        body: 'PEP should not be started if the patient is already HIV-positive — this would constitute monotherapy or suboptimal ART, which drives resistance. Obtain a 4th-generation HIV Ag/Ab test at baseline before prescribing. [See this node](#/node/pep-patient-hiv).',
      },
      {
        heading: '🛑 Do NOT dismiss low-risk exposures without risk stratification',
        body: 'Receptive oral sex, kissing, and urine/feces/saliva exposure are very low-risk exposures. Document the specific exposure type and use the risk stratification framework — not all exposures warrant PEP, and unnecessary PEP has adherence costs and side effects. [See this node](#/node/pep-low-risk).',
      },
      {
        heading: '🛑 Do NOT skip hepatitis B serology and vaccination',
        body: 'Every PEP visit should include hepatitis B surface Ag, Ab, and core Ab. If susceptible (all negative), begin the HBV vaccine series immediately and give HBIG if the source is HBV-positive. Hepatitis C baseline serology is also required. [See this node](#/node/pep-followup).',
      },
      {
        heading: '🛑 Do NOT forget to screen for special populations needing regimen modification',
        body: 'Pregnancy, renal impairment, and pediatric age require PEP regimen modification. TAF-containing regimens may require dose adjustment in renal failure. Always screen for these before prescribing. [See this node](#/node/pep-special).',
      },
      {
        heading: '🛑 Do NOT fail to arrange 2-week follow-up for adherence and side effects',
        body: 'GI side effects are the most common reason patients discontinue PEP prematurely. A 2-week check-in to address tolerability, assess adherence, and recheck renal function is mandatory for completing a successful course. [See this node](#/node/pep-followup).',
      },
    ],
    citations: [],
  },

  'rabies-stop': {
    id: 'rabies-stop',
    title: 'Rabies — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT dismiss bat exposure without considering PEP',
        body: 'Bat bites can be virtually invisible — fang marks may not be seen with the naked eye. PEP is indicated if a bat was found in a room with a sleeping person, unattended child, intoxicated person, or anyone who cannot definitively exclude contact. Do not accept "I didn\'t feel a bite" as exclusion. [See this node](#/node/rabies-bat).',
      },
      {
        heading: '🛑 Do NOT give RIG after day 7 of the vaccine series',
        body: 'Rabies Immune Globulin (RIG) should only be given with the first vaccine dose (Day 0). Giving RIG after Day 7 may actually impair the developing active immune response. If RIG was not available on Day 0, give it as soon as possible — but not after Day 7. [See this node](#/node/rabies-full-pep).',
      },
      {
        heading: '🛑 Do NOT give more than 20 IU/kg of RIG',
        body: 'Exceeding the 20 IU/kg dose of RIG can interfere with the patient\'s active antibody production in response to the vaccine. The correct dose is weight-based — calculate it exactly, infiltrate as much as anatomically possible into the wound, inject the remainder IM at a site distant from the vaccine. [See this node](#/node/rabies-full-pep).',
      },
      {
        heading: '🛑 Do NOT skip wound irrigation — it is the most effective prevention step',
        body: 'Vigorous wound washing with soap and water for at least 15 minutes reduces rabies infection risk by up to 90% in animal studies. This step is more effective than any biological intervention. Do not treat it as optional or abbreviate it. [See this node](#/node/rabies-wound).',
      },
      {
        heading: '🛑 Do NOT primarily close animal bite wounds requiring PEP',
        body: 'Tight primary closure of rabies-risk wounds increases infection risk. Leave wounds open or loosely approximated when possible. If closure is required for cosmesis or hemostasis, infiltrate RIG into the wound bed first, then close loosely. [See this node](#/node/rabies-wound).',
      },
      {
        heading: '🛑 Do NOT give the full PEP regimen (RIG + 4 doses) to previously vaccinated patients',
        body: 'Previously vaccinated patients need only 2 booster doses (Days 0 and 3) — no RIG. Giving RIG to a previously vaccinated patient may suppress the anamnestic immune response that provides the rapid protection they already have. [See this node](#/node/rabies-prevax-immune).',
      },
      {
        heading: '🛑 Do NOT automatically reassure regarding rodent exposures',
        body: 'Squirrels, hamsters, guinea pigs, gerbils, chipmunks, rats, and mice have never been known to cause rabies in the US, and PEP is rarely indicated. However, a rodent bite that broke skin still requires standard wound care and tetanus update — do not dismiss the visit entirely. [See this node](#/node/rabies-rodent).',
      },
      {
        heading: '🛑 Do NOT withhold PEP from immunocompromised patients without consultation',
        body: 'Immunocompromised patients may have a blunted vaccine response — they require a 5-dose schedule AND RIG for full PEP, and rabies serology to confirm immune response. Standard 4-dose protocols may be insufficient. [See this node](#/node/rabies-immunocomp-pep).',
      },
    ],
    citations: [],
  },

};
