// myMedKitt — Stop Pages Batch 12
// Vertigo consult critical pitfalls.

import type { InfoPage } from '../info-pages.js';

const VERTIGO_STOP: InfoPage = {
  id: 'vertigo-stop',
  title: 'Vertigo — Do NOT',
  subtitle: 'Critical pitfalls to avoid',
  sections: [
    {
      heading: '🛑 Do NOT use HINTS on BPPV or episodic vertigo',
      body: 'HINTS is only valid in patients with **continuous vertigo AND spontaneous nystagmus** (true AVS). In a BPPV patient who has no spontaneous nystagmus at rest, the Head Impulse Test will appear "normal" — which HINTS interprets as worrisome for stroke. This leads to unnecessary imaging and false alarm. [See this node](#/node/vert-hints-check).',
    },
    {
      heading: '🛑 Do NOT rely on CT to rule out posterior circulation stroke',
      body: 'CT sensitivity for acute posterior fossa ischemia is only **7-16%**. A negative CT does not rule out stroke — it only rules out hemorrhage. Posterior circulation strokes are missed in ~35% of ED cases, and over-reliance on CT is a leading cause. Use CT to exclude hemorrhage before thrombolytics; use MRI-DWI to evaluate for ischemia. [See this node](#/node/vert-stroke-imaging).',
    },
    {
      heading: '🛑 Do NOT trust a negative early MRI-DWI',
      body: 'DWI misses up to **20-35% of posterior circulation strokes in the first 24-48 hours**, especially small brainstem and lacunar strokes. If clinical suspicion is high but the first MRI is negative, **admit and repeat MRI at 48-72 hours**. Do not discharge based on a single negative early study in a patient with persistent symptoms or central features. [See this node](#/node/vert-stroke-disposition).',
    },
    {
      heading: '🛑 Do NOT assess nystagmus with visual fixation intact',
      body: 'Peripheral nystagmus **suppresses with fixation**. If you don\'t remove fixation (Frenzel goggles, ophthalmoscope trick, or blank paper), you will miss it and misclassify the patient. Always remove fixation before concluding "no nystagmus." [See this node](#/node/vert-hints-nystagmus).',
    },
    {
      heading: '🛑 Do NOT use the Epley maneuver for horizontal canal BPPV',
      body: 'Epley is specific to the **posterior canal**. For horizontal canal BPPV (diagnosed by supine roll test with geotropic or apogeotropic nystagmus), use the **Gufoni maneuver** or **Barbecue Roll**. Doing Epley on a horizontal canal BPPV patient will be ineffective and may worsen symptoms. [See this node](#/node/vert-horizontal-bppv).',
    },
    {
      heading: '🛑 Do NOT continue vestibular suppressants beyond 72 hours',
      body: 'Meclizine, benzodiazepines, and anticholinergics all **delay central vestibular compensation**. Prolonged use paradoxically extends the recovery period. Strict limit: **48-72 hours**. Prescribe for the acute severe phase only and emphasize early mobilization and vestibular rehabilitation. [See this node](#/node/vert-med-principles).',
    },
    {
      heading: '🛑 Do NOT discharge a patient who cannot walk unaided',
      body: '**Truncal ataxia — inability to sit or stand without support — is a red flag for cerebellar stroke.** Peripheral vestibular patients are unsteady but can walk with assistance. A patient who cannot walk unaided needs imaging and likely admission, regardless of HINTS findings. [See this node](#/node/vert-vn-disposition).',
    },
    {
      heading: '🛑 Do NOT dismiss vertigo in a high-risk patient',
      body: '**Age ≥60 + vascular risk factors + new spontaneous vertigo = TIA workup.** Recurrent posterior circulation TIAs are a harbinger of large vessel stroke. Do not label as "vestibular migraine" or "anxiety" without first imaging and obtaining neurology input. [See this node](#/node/vert-sevs-risk).',
    },
    {
      heading: '🛑 Do NOT attribute acute unilateral hearing loss + vertigo to "labyrinthitis"',
      body: 'New unilateral sensorineural hearing loss with vertigo = **AICA stroke** until proven otherwise. The labyrinthine artery is a branch of AICA — infarction causes combined auditory and vestibular symptoms that mimic labyrinthitis. Any acute SNHL + vertigo warrants MRI + MRA head/neck. [See this node](#/node/vert-hints-hearing).',
    },
    {
      heading: '🛑 Do NOT assume "positional" means "benign"',
      body: 'Central positional vertigo (cerebellar lesions) can mimic BPPV. Red flags: **pure vertical (downbeat) nystagmus without torsional component**, direction-changing nystagmus, no latency, no fatigue, duration >1 minute, or associated neurologic signs. Atypical Dix-Hallpike findings → image the posterior fossa. [See this node](#/node/vert-dix-hallpike).',
    },
  ],
  citations: [],
};

const TOXIC_ALCOHOLS_STOP: InfoPage = {
  id: 'toxic-alcohols-stop',
  title: 'Toxic Alcohols — Do NOT',
  subtitle: 'Critical pitfalls to avoid',
  sections: [
    {
      heading: '🛑 Do NOT discharge methanol or ethylene glycol from the ED',
      body: 'Both methanol and EG have **biphasic toxicity** — patients may appear clinically improved as intoxication wanes, only to deteriorate hours later as toxic metabolites accumulate. Formate (methanol) and glycolate/oxalate (EG) cause the organ damage, not the parent compounds. **All suspected methanol/EG ingestions require admission** for serial monitoring, even if initially asymptomatic.',
    },
    {
      heading: '🛑 Do NOT rely on osmolar gap alone to rule out toxic alcohol',
      body: 'Osmolar gap **normalizes as parent compound is metabolized**. A patient presenting late (>12-24h) with severe acidosis may have a normal osmolar gap because all the toxic alcohol has been converted to its toxic metabolite. **Late presentation = anion gap matters more than osmolar gap.** Early presentation = osmolar gap elevated. Late = anion gap elevated, osmolar gap may be normal.',
    },
    {
      heading: '🛑 Do NOT delay fomepizole for level confirmation',
      body: 'Toxic alcohol levels take **hours to days** to return from most labs. If clinical suspicion is high (elevated osmolar gap, AGMA, compatible history), **give fomepizole immediately**. The risk of withholding antidote far exceeds the cost of treating a false positive. Fomepizole is safe; formate blindness and oxalate renal failure are not.',
    },
    {
      heading: '🛑 Do NOT forget to redose fomepizole during hemodialysis',
      body: 'Fomepizole is dialyzable. Standard dosing is Q12H, but **during HD you must dose Q4H**. Missing doses during dialysis allows ADH to resume metabolizing the toxic alcohol to its dangerous metabolites. After HD ends, return to Q12H dosing.',
    },
    {
      heading: '🛑 Do NOT assume "antifreeze" means ethylene glycol',
      body: 'Modern RV/boat antifreeze and some de-icing products use **propylene glycol**, which is far less toxic. Traditional automotive antifreeze is EG. However, propylene glycol can still cause hyperosmolarity and lactic acidosis in massive ingestion. Always try to identify the actual product and its MSDS.',
    },
    {
      heading: '🛑 Do NOT give folic acid for ethylene glycol',
      body: '**Folic acid is for METHANOL** (enhances formate metabolism). For ethylene glycol, give **thiamine and pyridoxine** (shunt glyoxylic acid away from oxalate). Mixing up cofactors does not help the patient. Methanol → folate. EG → thiamine + pyridoxine.',
    },
    {
      heading: '🛑 Do NOT use ethanol therapy if fomepizole is available',
      body: 'Ethanol requires ICU-level monitoring, has a narrow therapeutic window (100-150 mg/dL), causes hypoglycemia, and is difficult to titrate. **Fomepizole is the preferred antidote** — predictable dosing, no CNS depression, does not require serum level monitoring. Use ethanol only if fomepizole is unavailable.',
    },
    {
      heading: '🛑 Do NOT miss isopropanol masquerading as EtOH intoxication',
      body: 'Isopropanol causes intoxication **2x more potent than ethanol** but does NOT cause metabolic acidosis (acetone is not an acid). Classic triad: **inebriation + ketosis WITHOUT acidosis + fruity breath**. Check serum acetone or beta-hydroxybutyrate. Isopropanol is generally supportive care only — no fomepizole needed.',
    },
    {
      heading: '🛑 Do NOT forget to call Poison Control',
      body: 'Toxic alcohol cases benefit from **real-time toxicology consultation**. Poison Control (1-800-222-1222) can help with: level interpretation, dialysis timing, antidote logistics, and disposition planning. They can also help coordinate care if the patient needs transfer for HD.',
    },
    {
      heading: '🛑 Do NOT underestimate lethal doses',
      body: '**Lethal doses are shockingly small.** Methanol: ~15-30 mL (1-2 tablespoons). Ethylene glycol: ~100 mL (~3 oz). Even small intentional ingestions warrant full workup and admission. Do not be falsely reassured by "just a sip" history — patients often underreport.',
    },
  ],
  citations: [],
};

const WIDE_COMPLEX_TACHYCARDIA_STOP: InfoPage = {
  id: 'wide-complex-tachycardia-stop',
  title: 'Wide Complex Tachycardia — Do NOT',
  subtitle: 'Critical pitfalls to avoid',
  sections: [
    {
      heading: '🛑 Do NOT give AV nodal blockers to irregular WCT',
      body: 'Irregular wide complex tachycardia may be **AFib with WPW**. Adenosine, diltiazem, verapamil, beta-blockers, and digoxin are ALL contraindicated — they block the AV node, forcing all conduction down the accessory pathway → VF. If irregular WCT + rate >200 → assume WPW until proven otherwise.',
    },
    {
      heading: '🛑 Do NOT give calcium channel blockers to ANY WCT',
      body: 'Verapamil and diltiazem cause **negative inotropy + vasodilation**. In VT, this combination precipitates hemodynamic collapse and can degenerate to VF. Even if you think it\'s SVT with aberrancy, the risk is too high. Use procainamide or cardioversion instead.',
    },
    {
      heading: '🛑 Do NOT give amiodarone or procainamide for Torsades',
      body: '**Torsades de Pointes (polymorphic VT + long QT) requires MAGNESIUM** — 2-4g IV over 15 minutes. Amiodarone and procainamide both prolong the QT interval, which worsens Torsades and can be lethal. If Torsades recurs → overdrive pacing.',
    },
    {
      heading: '🛑 Do NOT give antiarrhythmics for sodium channel blocker toxicity',
      body: 'WCT from TCA, diphenhydramine, cocaine, or flecainide needs **sodium bicarbonate** (1-2 mEq/kg IV push), NOT antiarrhythmics. Amiodarone, procainamide, and lidocaine all block sodium channels — you will worsen conduction and may cause asystole.',
    },
    {
      heading: '🛑 Do NOT assume hemodynamic stability rules out VT',
      body: '**Stable VT is common.** Blood pressure and mental status do NOT differentiate VT from SVT. A patient with wide complex tachycardia, normal blood pressure, and clear mentation can still be in VT — do not let clinical stability falsely reassure you.',
    },
    {
      heading: '🛑 Do NOT discharge first-episode VT from the ED',
      body: 'ALL patients with VT require admission for monitoring, workup, and cardiology/EP consultation. VT indicates underlying cardiac pathology that needs evaluation. The only exception: established patient with ICD who had appropriate therapy and device interrogation with EP approval.',
    },
    {
      heading: '🛑 Do NOT skip cardioversion if antiarrhythmics fail',
      body: 'If procainamide or amiodarone doesn\'t convert stable VT, don\'t keep waiting — proceed to **synchronized cardioversion** (100J → 200J → 360J). Delaying definitive treatment risks deterioration. Sedate the patient and cardiovert.',
    },
    {
      heading: '🛑 Do NOT forget to confirm sync mode before shocking',
      body: 'Unsynchronized shocks delivered during the vulnerable period (T wave) can induce VF. Always confirm **sync mode is enabled** before cardioverting VT. If the defibrillator cannot sync (artifact, variable morphology), switch to unsync but be prepared to defibrillate if VF results.',
    },
    {
      heading: '🛑 Do NOT stop procainamide at the first sign of success',
      body: 'When procainamide converts VT, stop the bolus but **start a maintenance infusion** (1-4 mg/min). Without maintenance, VT often recurs. Also stop if QRS widens >50% or hypotension develops.',
    },
    {
      heading: '🛑 Do NOT overlook electrolytes',
      body: 'Hypokalemia and hypomagnesemia are common VT triggers. **Target K+ >4.0 mEq/L and Mg2+ >2.0 mEq/L** in all VT patients. Replacing electrolytes is cheap, safe, and prevents recurrence.',
    },
  ],
  citations: [],
};

const MESENTERIC_ISCHEMIA_STOP: InfoPage = {
  id: 'mesenteric-ischemia-stop',
  title: 'Mesenteric Ischemia — Do NOT',
  subtitle: 'Critical pitfalls to avoid',
  sections: [
    {
      heading: '🛑 Do NOT wait for lactate to rise before treating',
      body: 'Lactate is a LATE finding in mesenteric ischemia. By the time lactate is elevated, bowel may already be necrotic. **Suspect AMI based on clinical presentation** (pain out of proportion, gut emptying, vascular risk factors) — do not wait for confirmatory labs. Early CTA and surgery consult save bowel.',
    },
    {
      heading: '🛑 Do NOT rely on abdominal exam to rule out AMI',
      body: 'Classic "pain out of proportion to exam" exists because the bowel has VISCERAL innervation only — there is no peritoneal irritation until transmural necrosis occurs. **A benign-appearing abdomen does NOT rule out mesenteric ischemia.** Peritoneal signs are a LATE and ominous finding.',
    },
    {
      heading: '🛑 Do NOT get plain films as initial imaging',
      body: 'Plain radiographs are insensitive for early AMI. Findings like pneumatosis and portal venous gas indicate **advanced necrosis and near-certain mortality**. Get CTA with IV contrast as first-line imaging — it has >95% sensitivity for SMA/SMV occlusion and shows bowel wall changes.',
    },
    {
      heading: '🛑 Do NOT delay anticoagulation for suspected arterial AMI',
      body: 'Once arterial mesenteric ischemia is diagnosed or highly suspected, **start IV heparin immediately** (target aPTT 2-2.5x normal). Anticoagulation prevents clot propagation and may improve collateral flow. Do not wait for surgical consultation to initiate heparin.',
    },
    {
      heading: '🛑 Do NOT forget broad-spectrum antibiotics',
      body: 'Even before perforation, ischemic bowel allows bacterial translocation. **Start piperacillin-tazobactam or carbapenem early.** Do not withhold antibiotics pending imaging — the risk of untreated sepsis from translocation exceeds any downside of empiric coverage.',
    },
    {
      heading: '🛑 Do NOT miss atrial fibrillation as the embolic source',
      body: 'SMA embolism is the most common cause of acute mesenteric ischemia (40-50%). The overwhelming majority of SMA emboli originate from **left atrial thrombus in AFib**. Always get an ECG. If in sinus rhythm, consider echocardiography to evaluate for other embolic sources.',
    },
    {
      heading: '🛑 Do NOT assume NOMI can be treated expectantly',
      body: 'Non-occlusive mesenteric ischemia (NOMI) from low-flow states (cardiogenic shock, vasopressors) carries **60-70% mortality**. Treat the underlying cause aggressively, optimize cardiac output, consider vasodilator infusion (papaverine if available), and maintain a low threshold for surgical exploration.',
    },
    {
      heading: '🛑 Do NOT miss chronic mesenteric ischemia (CMI)',
      body: 'CMI presents with postprandial pain ("intestinal angina"), food fear, and weight loss. These patients have **severely stenotic mesenteric vessels** and are one hemodynamic stress away from acute-on-chronic ischemia. Any patient with CMI and acute worsening should be treated as AMI.',
    },
    {
      heading: '🛑 Do NOT give vasoconstrictors without volume resuscitation',
      body: 'Hypovolemia + vasopressors = worsened splanchnic ischemia. **Resuscitate with crystalloid first.** If vasopressors are needed, prefer norepinephrine over high-dose vasopressin. Vasopressin directly constricts mesenteric vessels and should be minimized or avoided.',
    },
    {
      heading: '🛑 Do NOT delay surgery for "medical optimization"',
      body: 'In acute mesenteric ischemia, **time is bowel**. Every hour of ischemia reduces viable bowel and increases mortality. Once perforation or necrosis is suspected, emergent laparotomy is indicated. Damage-control resuscitation happens in the OR, not the ED.',
    },
  ],
  citations: [],
};

const ED_EXTUBATION_STOP: InfoPage = {
  id: 'ed-extubation-stop',
  title: 'ED Extubation — Do NOT',
  subtitle: 'Critical pitfalls to avoid',
  sections: [
    {
      heading: '🛑 Do NOT extubate if the original indication has not improved',
      body: 'Extubation is elective unless it is part of a documented goals-of-care plan. If the patient still needs invasive ventilation for hypoxemia, hypercapnia, shock, airway protection, procedure safety, or incomplete diagnostic workup, keep the tube and reassess later. [See this node](#/node/extub-context).',
    },
    {
      heading: '🛑 Do NOT extubate a hard-to-regain airway without backup',
      body: 'Predicted difficult reintubation changes the threshold. If the airway was difficult, anatomy is distorted, edema is likely, or the rescue path is weak, delay extubation or perform it with airway-skilled help, RT, suction, BVM, drugs, and rescue equipment at bedside. [See this node](#/node/extub-red-flags).',
    },
    {
      heading: '🛑 Do NOT let a passed SBT override poor airway protection',
      body: 'Ventilator mechanics do not prove the patient can protect the airway. Poor cough, heavy secretions, persistent depressed mental status, active vomiting, aspiration risk, or uncontrolled airway bleeding should stop extubation even if the SBT looks acceptable. [See this node](#/node/extub-airway-protection).',
    },
    {
      heading: '🛑 Do NOT extubate through shock or severe physiology',
      body: 'Ongoing shock, escalating vasopressors, severe hypoxemia, high ventilator needs, persistent severe acidosis, uncontrolled bronchospasm, deep sedation, or residual paralysis should push the plan toward continued ventilation and ICU handoff. [See this node](#/node/extub-defer-icu).',
    },
    {
      heading: '🛑 Do NOT use RSBI as a standalone decision',
      body: 'RSBI can support the assessment, but it should not drive extubation alone. Use a structured SBT plus bedside assessment of work of breathing, oxygenation, ventilation, hemodynamics, mentation, secretion burden, and rescue feasibility. [See this node](#/node/extub-sbt-setup).',
    },
    {
      heading: '🛑 Do NOT use cuff leak testing as a universal screen',
      body: 'Cuff leak testing is most useful for patients at high risk of post-extubation stridor. A leak does not guarantee safety, and an absent leak is not a diagnosis, but a failed leak in a high-risk patient should trigger delay and steroid prophylaxis when feasible. [See this node](#/node/extub-cuff-leak-result).',
    },
    {
      heading: '🛑 Do NOT remove the tube before the support device is ready',
      body: 'Choose NIV, HFNC, or standard oxygen before tube removal. Have the device set up, suction available, BVM connected, airway cart nearby, and reintubation medications/equipment ready. Post-extubation support is part of the procedure, not an afterthought. [See this node](#/node/extub-support-plan).',
    },
    {
      heading: '🛑 Do NOT let rescue NIV delay reintubation in severe failure',
      body: 'Preventive NIV or HFNC can be appropriate for selected high-risk patients. Established severe or worsening post-extubation failure is different. Poor mentation, shock, exhaustion, severe hypoxemia, aspiration, or inability to protect the airway should trigger early reintubation. [See this node](#/node/extub-reintubate).',
    },
  ],
  citations: [],
};

export const STOP_PAGES_12: Record<string, InfoPage> = {
  'vertigo-stop': VERTIGO_STOP,
  'toxic-alcohols-stop': TOXIC_ALCOHOLS_STOP,
  'wide-complex-tachycardia-stop': WIDE_COMPLEX_TACHYCARDIA_STOP,
  'mesenteric-ischemia-stop': MESENTERIC_ISCHEMIA_STOP,
  'ed-extubation-stop': ED_EXTUBATION_STOP,
};
