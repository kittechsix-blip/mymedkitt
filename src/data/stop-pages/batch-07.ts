import type { InfoPage } from '../info-pages.js';

export const STOP_PAGES_07: Record<string, InfoPage> = {

  'deep-neck-infection-stop': {
    id: 'deep-neck-infection-stop',
    title: 'Deep Neck Infection — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT attempt RSI without a surgical airway plan',
        body: 'Sedation and paralysis in Ludwig angina or retropharyngeal abscess can cause complete airway collapse, making both intubation AND cricothyrotomy extremely difficult. Have a surgical airway tray open and ENT/Anesthesia at bedside before any attempt. [See airway decision node](#/node/dni-airway-algorithm).',
      },
      {
        heading: '🛑 Do NOT lay a DNI patient flat',
        body: 'Supine positioning worsens venous congestion, increases tongue/floor-of-mouth displacement, and can precipitate complete obstruction. Keep the patient upright or semi-recumbent at all times. [See airway assessment node](#/node/dni-airway-assess).',
      },
      {
        heading: '🛑 Do NOT perform blind nasal intubation',
        body: 'Blind nasal intubation risks rupturing a retropharyngeal or parapharyngeal abscess, causing aspiration of purulent material. Use awake fiberoptic technique instead. [See airway algorithm node](#/node/dni-airway-algorithm).',
      },
      {
        heading: '🛑 Do NOT skip empiric anaerobic coverage',
        body: 'Deep neck infections are polymicrobial with obligate anaerobes (Bacteroides, Fusobacterium). Ampicillin-sulbactam or piperacillin-tazobactam are first-line — monotherapy with a cephalosporin alone is inadequate. [See antibiotics node](#/node/dni-antibiotics).',
      },
      {
        heading: '🛑 Do NOT assume cellulitis means no abscess',
        body: 'Ludwig angina is predominantly cellulitis, but CT often underestimates abscess in DNIs (sensitivity 100%, specificity only 45%). Clinical deterioration after 48–72h of antibiotics mandates surgical reassessment regardless of imaging. [See surgical node](#/node/dni-surgical).',
      },
      {
        heading: '🛑 Do NOT delay CT for "watchful waiting"',
        body: 'CT neck with IV contrast is required urgently to delineate the infected space, identify drainable collections, and evaluate for mediastinal extension. Clinical exam alone cannot exclude the "danger space" or carotid sheath involvement. [See imaging node](#/node/dni-imaging).',
      },
      {
        heading: '🛑 Do NOT extubate early in Ludwig angina',
        body: 'Swelling resolves over days. Extubating before the cuff leak test is positive risks immediate re-obstruction. Plan for prolonged intubation and ICU airway monitoring. [See ICU disposition node](#/node/dni-dispo-icu).',
      },
      {
        heading: '🛑 Do NOT forget to screen for mediastinitis',
        body: 'Descending necrotizing mediastinitis carries 40–60% mortality. Any chest pain, subcutaneous emphysema below the clavicles, or rapid sepsis worsening requires CT chest with contrast immediately. [See mediastinitis node](#/node/dni-mediastinitis).',
      },
      {
        heading: '🛑 Do NOT anticoagulate Lemierre syndrome routinely',
        body: 'There is no consensus that anticoagulation improves outcomes in IJV thrombosis from Lemierre syndrome. Reserve it for cavernous sinus extension, progressive thrombosis, or no improvement at 72h on antibiotics. [See Lemierre treatment node](#/node/dni-lemierre-tx).',
      },
    ],
    citations: [],
  },

  'delirium-stop': {
    id: 'delirium-stop',
    title: 'Delirium — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT combine IV/IM olanzapine with benzodiazepines',
        body: 'Parenteral olanzapine plus parenteral benzodiazepines carries a risk of fatal respiratory depression and cardiovascular collapse. Use one or the other — not both parenterally. [See young adult agitation node](#/node/del-young-adult).',
      },
      {
        heading: '🛑 Do NOT give benzodiazepines to elderly delirium patients',
        body: 'Benzodiazepines are an independent risk factor for delirium in older adults, cause paradoxical agitation, increase fall risk, and cause respiratory depression. Use low-dose haloperidol or olanzapine instead. [See elderly node](#/node/del-elderly).',
      },
      {
        heading: '🛑 Do NOT give haloperidol or droperidol to Parkinson/Lewy Body patients',
        body: "High-D2 receptor blockade from typical antipsychotics can trigger severe, potentially fatal neuroleptic sensitivity reactions and dramatically worsen motor symptoms. Use quetiapine (lowest D2 affinity) instead. [See Parkinson's node](#/node/del-parkinsons).",
      },
      {
        heading: '🛑 Do NOT give antipsychotics for stimulant-induced agitation',
        body: 'In cocaine or methamphetamine intoxication, antipsychotics lower the seizure threshold, impair thermoregulation, and worsen hyperthermia. Benzodiazepines are the drug of choice. [See intox/withdrawal node](#/node/del-intox-withdrawal).',
      },
      {
        heading: '🛑 Do NOT prone-restrain a delirious patient',
        body: 'Prone restraint causes positional asphyxia and has been associated with patient deaths. Always restrain supine with head of bed elevated. Minimum 5-person team is required. [See restraints node](#/node/del-restraints).',
      },
      {
        heading: '🛑 Do NOT skip the search for reversible causes',
        body: 'Delirium is always secondary to an underlying medical problem. Skipping glucose check, hypoxia assessment, and medication review misses life-threatening and easily reversible causes. [See rapid reversible node](#/node/del-rapid-reversible).',
      },
      {
        heading: '🛑 Do NOT skip QTc monitoring with antipsychotics',
        body: 'Haloperidol and droperidol prolong QTc. A QTc >500 ms is a contraindication to typical antipsychotics — use olanzapine or benzodiazepines instead. [See monitoring node](#/node/del-monitoring).',
      },
      {
        heading: '🛑 Do NOT use physical restraints as first-line management',
        body: 'Restraints paradoxically worsen agitation and increase injury risk. Verbal de-escalation, environmental modifications, and a show of force (security presence) should precede physical restraint. [See safety node](#/node/del-safety).',
      },
    ],
    citations: [],
  },

  'dental-avulsion-stop': {
    id: 'dental-avulsion-stop',
    title: 'Dental Avulsion — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT reimplant a primary (baby) tooth',
        body: 'Reimplanting a primary tooth risks permanent damage to the underlying adult tooth bud, ankylosis, and infection. Always confirm tooth type before any intervention. [See primary tooth node](#/node/avulsion-primary).',
      },
      {
        heading: '🛑 Do NOT touch or scrub the root',
        body: 'The periodontal ligament cells on the root surface are the key to successful reimplantation. Touching, scraping, or drying the root kills these cells and dramatically worsens prognosis. Handle by crown only. [See storage node](#/node/avulsion-storage).',
      },
      {
        heading: '🛑 Do NOT store the tooth in water',
        body: 'Water is hypotonic and rapidly destroys PDL cells. Cold milk (up to 6h), saline (up to 2h), or HBSS (up to 24h) are acceptable media. Dry storage is the worst option. [See storage node](#/node/avulsion-storage).',
      },
      {
        heading: '🛑 Do NOT wait for dentist availability if >15–30 min away',
        body: 'Every minute of dry extraoral time halves reimplantation success. If a dentist is more than 15–30 minutes away, reimplant in the ED immediately. [See reimplantation decision node](#/node/avulsion-reimplant-decision).',
      },
      {
        heading: '🛑 Do NOT use a rigid splint',
        body: 'Rigid splinting causes ankylosis of the reimplanted tooth to the alveolar bone. A flexible splint for 2 weeks is the standard of care — it preserves physiologic micromovement that supports healing. [See splint node](#/node/avulsion-splint).',
      },
      {
        heading: '🛑 Do NOT skip CXR if the tooth cannot be found',
        body: 'A missing tooth can be aspirated into the bronchus, requiring urgent removal. Always obtain CXR (PA and lateral) when the tooth is unaccounted for, especially with any respiratory symptoms. [See missing tooth node](#/node/avulsion-missing).',
      },
      {
        heading: '🛑 Do NOT skip antibiotics after reimplantation',
        body: 'Doxycycline 100 mg BID × 7 days (adults/children >12y) is first-line. It has anti-resorptive properties beyond just antimicrobial coverage. Amoxicillin is the alternative for younger children. [See medications node](#/node/avulsion-meds).',
      },
      {
        heading: '🛑 Do NOT discharge without a 24–48h dental follow-up',
        body: 'Even optimal ED management is a bridge — permanent splinting, root canal planning, and monitoring for resorption all require same-week dental evaluation. Failure to arrange follow-up leaves patients at high risk for tooth loss. [See follow-up node](#/node/avulsion-followup).',
      },
    ],
    citations: [],
  },

  'dental-trauma-stop': {
    id: 'dental-trauma-stop',
    title: 'Dental Trauma — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT reimplant avulsed primary teeth',
        body: 'Reimplanting a baby tooth risks damaging the underlying permanent tooth bud (20–30% risk with severe trauma) and causing ankylosis. Confirm primary vs. permanent before any reimplantation. [See primary avulsion node](#/node/dental-avulsion-primary).',
      },
      {
        heading: '🛑 Do NOT attempt to manually pull out an intruded tooth',
        body: 'Intruded teeth are locked in alveolar bone; forced extraction causes additional trauma and fracture. Management depends on depth — teeth <3 mm are allowed to erupt spontaneously over 4–6 weeks. [See intrusion node](#/node/dental-intrusion).',
      },
      {
        heading: '🛑 Do NOT dismiss an Ellis III fracture as minor dental pain',
        body: 'Pulp exposure is a dental emergency — the pulp is viable for only 3–6 hours. Apply calcium hydroxide paste immediately and arrange same-day dental referral. Delay results in pulp necrosis and mandatory root canal. [See Ellis III node](#/node/dental-ellis3).',
      },
      {
        heading: '🛑 Do NOT skip CXR when a tooth fragment cannot be located',
        body: 'An unaccounted tooth or fragment can be aspirated into the bronchus, especially in children and unconscious patients. Obtain CXR (PA and lateral) before discharge in any trauma with a missing dental fragment. [See start node](#/node/dental-trauma-start).',
      },
      {
        heading: '🛑 Do NOT use a rigid splint for luxation injuries',
        body: 'Rigid splinting causes ankylosis. Flexible wire-composite or resin-bonded splints for 2 weeks are standard for subluxation and extrusive luxation. Alveolar fractures require 3–4 weeks of semi-rigid splinting by the consulting oral surgeon. [See splinting node](#/node/dental-splinting).',
      },
      {
        heading: '🛑 Do NOT ignore malocclusion after dental trauma',
        body: 'A bite that "feels off" suggests alveolar fracture, lateral luxation, or significant displacement requiring repositioning. Multiple teeth moving as a unit confirms alveolar fracture — needs same-day oral surgery referral. [See alveolar node](#/node/dental-alveolar).',
      },
      {
        heading: '🛑 Do NOT discharge lateral luxation without repositioning',
        body: 'Lateral luxation has a 77% pulp necrosis rate and the tooth is locked in displaced bone. Firm digital pressure is needed to disengage the bony lock before splinting, or same-day dental referral. [See lateral luxation node](#/node/dental-lateral).',
      },
    ],
    citations: [],
  },

  'eclampsia-stop': {
    id: 'eclampsia-stop',
    title: 'Eclampsia — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT use phenytoin as first-line seizure prophylaxis',
        body: 'Magnesium sulfate is far superior to phenytoin for eclampsia seizure prevention — it reduces recurrence by 50% (MAGPIE trial). Phenytoin is reserved only for true magnesium allergy or severe toxicity. [See prophylaxis node](#/node/eclampsia-prophylaxis).',
      },
      {
        heading: '🛑 Do NOT give sublingual nifedipine',
        body: 'Sublingual nifedipine has unpredictable absorption and can cause precipitous hypotension with uteroplacental insufficiency. Use oral immediate-release nifedipine, IV labetalol, or IV hydralazine instead. [See nifedipine node](#/node/eclampsia-bp-nifedipine).',
      },
      {
        heading: '🛑 Do NOT overlook absent warning signs',
        body: '20% of eclampsia has NO prodromal symptoms, and 16–38% have minimal or no hypertension at seizure onset. Never use the absence of headache or visual changes to exclude eclampsia risk. [See warning signs node](#/node/eclampsia-warning).',
      },
      {
        heading: '🛑 Do NOT give labetalol in asthma or heart block',
        body: 'Labetalol is first-line for severe hypertension in pregnancy but is contraindicated in severe reactive airway disease, 2nd/3rd degree heart block, decompensated heart failure, and bradycardia <60. Use hydralazine as an alternative. [See labetalol node](#/node/eclampsia-bp-labetalol).',
      },
      {
        heading: '🛑 Do NOT aggressively fluid-resuscitate eclamptic patients',
        body: 'Eclampsia patients are at high risk for pulmonary edema. Limit resuscitation to 1–2L max unless there is hemorrhage. POCUS-guided fluid management is strongly preferred. [See stabilization node](#/node/eclampsia-stabilization).',
      },
      {
        heading: '🛑 Do NOT anticoagulate uremic pericarditis (HD patients)',
        body: 'While this applies to the HD-emergencies consult, eclampsia patients with HELLP syndrome also develop pericardial effusion — anticoagulation risks hemorrhagic tamponade when platelets are already critically low. [See HELLP node](#/node/eclampsia-hellp).',
      },
      {
        heading: '🛑 Do NOT delay delivery for seizure control alone',
        body: 'Definitive treatment of eclampsia is delivery. Seizure control and BP management are bridges — once the patient is stabilized, delivery planning must begin immediately with OB. [See delivery decision node](#/node/eclampsia-delivery-decision).',
      },
      {
        heading: '🛑 Do NOT stop magnesium at 24h postpartum',
        body: 'Eclampsia can occur up to 6 weeks postpartum, and the risk of recurrent seizure is highest in the first 48h after delivery. Continue magnesium infusion 24–48h postpartum per protocol. [See postpartum node](#/node/eclampsia-postpartum).',
      },
    ],
    citations: [],
  },

  'ed-methadone-stop': {
    id: 'ed-methadone-stop',
    title: 'ED Methadone — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT give methadone without verifying OTP enrollment',
        body: 'Federal law (21 CFR §1306.07) limits ED methadone administration to a one-time dose while arranging OTP referral. Always verify enrollment before giving more than one dose — guest dosing at an unverified clinic dose risks overdose. [See guest verify node](#/node/meth-guest-verify).',
      },
      {
        heading: '🛑 Do NOT give methadone with QTc ≥500 ms',
        body: 'Methadone prolongs QTc in a dose-dependent manner. A QTc ≥500 ms is a high-risk threshold — avoid methadone if possible and obtain cardiology consultation. Always get an ECG when dose >100 mg/day or combining with other QT-prolonging drugs. [See QTc risk node](#/node/meth-qtc-risk).',
      },
      {
        heading: '🛑 Do NOT combine methadone with benzodiazepines',
        body: 'The combination carries an FDA black box warning for additive respiratory depression and death. If the patient is on benzodiazepines, reassess whether methadone is the right MOUD choice or reduce other CNS depressants first. [See monitoring node](#/node/meth-monitoring).',
      },
      {
        heading: '🛑 Do NOT assume the stated home dose is accurate',
        body: 'Patients may overreport their dose, OTP records may be unavailable after hours, and tolerance drops during missed doses. If dose is unverified, start at 20–30 mg max (never exceed 40 mg first dose). [See unclear dose node](#/node/meth-unclear-dose).',
      },
      {
        heading: '🛑 Do NOT discharge without observing for ≥2–4h after dosing',
        body: 'Methadone has delayed peak respiratory depression at 2–4h post-dose (much later than other opioids) and a long half-life. Discharging immediately after the dose misses the period of highest overdose risk. [See resp depression node](#/node/meth-resp-depression).',
      },
      {
        heading: '🛑 Do NOT use methadone as first-line if buprenorphine is an option',
        body: 'Buprenorphine is safer (partial agonist ceiling effect), has no QTc risk, and can be prescribed by ED providers without OTP linkage. Reserve methadone for patients already enrolled in an OTP program. [See buprenorphine redirect node](#/node/meth-bup-redirect).',
      },
      {
        heading: '🛑 Do NOT discharge without prescribing naloxone',
        body: 'Methadone tolerance is dose-dependent and drops rapidly during any missed doses. All patients receiving ED methadone must leave with naloxone and overdose risk counseling — a single adult dose can be fatal to a child. [See discharge node](#/node/meth-discharge).',
      },
      {
        heading: '🛑 Do NOT give methadone to actively intoxicated patients',
        body: 'Active opioid or CNS depressant intoxication is a contraindication to methadone initiation — there is no reliable baseline to judge tolerance. Observe until AMS clears, then reassess MOUD options. [See alt approach node](#/node/meth-alt-approach).',
      },
    ],
    citations: [],
  },

  'epistaxis-stop': {
    id: 'epistaxis-stop',
    title: 'Epistaxis — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT tilt the head back during active bleeding',
        body: 'Head tilt causes blood to run posteriorly into the pharynx, increasing swallowing and aspiration risk. The correct position is sitting upright, leaning slightly forward. [See initial measures node](#/node/epi-initial-measures).',
      },
      {
        heading: '🛑 Do NOT skip assessment for hemodynamic instability',
        body: 'Posterior epistaxis can cause significant blood loss that is underestimated because blood is swallowed. Always check vital signs, assess for tachycardia and hypotension, and get a CBC if bleeding is heavy or prolonged. [See stability node](#/node/epi-stability).',
      },
      {
        heading: '🛑 Do NOT immediately hold anticoagulation for nosebleed',
        body: 'Antiplatelet agents should generally NOT be held unless there is severe hemorrhage and no recent coronary stent. For warfarin, hold if INR is supratherapeutic. Reversing anticoagulation has serious thrombotic risks. [See antiplatelet node](#/node/epi-antiplatelet).',
      },
      {
        heading: '🛑 Do NOT discharge anterior-packing patients without antibiotics',
        body: 'Nasal packing creates an anaerobic environment that risks toxic shock syndrome (Staphylococcal). Prescribe cephalexin or amoxicillin-clavulanate for the duration of packing and ensure mandatory ENT follow-up at 24–48h. [See discharge with pack node](#/node/epi-discharge-with-pack).',
      },
      {
        heading: '🛑 Do NOT discharge posterior-packing patients from the ED',
        body: 'Posterior nasal packs cause hypoxia, and patients can desaturate rapidly — especially in those with underlying cardiopulmonary disease. Admission for monitoring is mandatory. [See posterior disposition node](#/node/epi-posterior-disposition).',
      },
      {
        heading: '🛑 Do NOT cauterize both sides of the septum simultaneously',
        body: 'Bilateral chemical cauterization of the nasal septum can cause septal perforation. If bilateral cauterization is needed, perform one side and allow healing before treating the other. [See anterior cautery node](#/node/epi-anterior-cautery).',
      },
      {
        heading: '🛑 Do NOT miss hypertension as a contributing factor',
        body: 'Severe hypertension does not cause epistaxis but worsens it significantly. Treat BP >180/110 acutely to reduce rebleeding risk, using short-acting agents. Do not miss hypertensive emergency as a comorbidity. [See HTN management node](#/node/epi-htn-management).',
      },
    ],
    citations: [],
  },

  'extensor-tendon-stop': {
    id: 'extensor-tendon-stop',
    title: 'Extensor Tendon — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT test extensor function with the wrist flexed',
        body: 'Wrist flexion passively extends the fingers, masking a complete extensor tendon laceration. Always test with the wrist in neutral or slight extension and compare to the contralateral side. [See exam node](#/node/ext-exam).',
      },
      {
        heading: '🛑 Do NOT miss a partial tendon laceration',
        body: 'A patient with >50% tendon laceration may retain near-normal active extension and appear intact on exam. Direct wound exploration with the finger in flexion is required to exclude partial injury. [See exam pearls node](#/node/ext-exam-pearls).',
      },
      {
        heading: '🛑 Do NOT repair Zone I–II injuries in the ED',
        body: 'Zones I and II (distal phalanx/mallet finger area) are managed with static extension splinting or surgical repair — not primary ED tendon repair. Acute primary repair in this zone has high complication rates and is deferred to hand surgery. [See Zone 1 node](#/node/ext-zone-1).',
      },
      {
        heading: '🛑 Do NOT use a cutting needle for tendon repair',
        body: 'Cutting needles traumatize tendon fibers and increase adhesion risk. Use a tapered needle with braided non-absorbable suture (3-0 to 5-0 depending on zone) for all extensor tendon repairs. [See repair overview node](#/node/ext-repair-overview).',
      },
      {
        heading: '🛑 Do NOT immobilize in finger flexion after repair',
        body: 'Post-repair immobilization requires the wrist extended and the MCP joint in slight extension — splinting in flexion gaps the repair. The exact position varies by zone; consult the zone-specific splint protocol. [See splint types node](#/node/ext-splint-types).',
      },
      {
        heading: '🛑 Do NOT delay repair beyond 5–7 days',
        body: 'Optimal outcomes occur with repair within 5 days (97.8% ROM vs. 89.5% if >5 days). If there is a delay, keep the wound clean with loose skin closure, splint, and ensure urgent hand surgery follow-up. [See repair overview node](#/node/ext-repair-overview).',
      },
      {
        heading: '🛑 Do NOT refer without a splint in place',
        body: 'All extensor tendon injuries being referred to hand surgery must leave the ED splinted in the appropriate position. An unsplinted injury allows the tendon ends to retract, increasing surgical complexity. [See refer node](#/node/ext-refer).',
      },
    ],
    citations: [],
  },

  'hd-emergencies-stop': {
    id: 'hd-emergencies-stop',
    title: 'HD Emergencies — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT draw blood from or put a BP cuff on an AV fistula/graft arm',
        body: "Venipuncture and BP cuffs can thrombose a fistula or graft — the patient's lifeline. Always use the contralateral arm. Protecting access is a non-negotiable priority in every ESRD patient. [See access main node](#/node/hd-access-main).",
      },
      {
        heading: '🛑 Do NOT anticoagulate uremic pericarditis',
        body: 'Uremic pericarditis creates hemorrhagic pericardial effusions. Anticoagulation risks hemopericardium and tamponade. Dialyze WITHOUT heparin and consult cardiology for tamponade assessment. NSAIDs are also contraindicated in ESRD. [See uremic pericarditis node](#/node/hd-uremic-pericarditis).',
      },
      {
        heading: '🛑 Do NOT treat hyperkalemia in HD patients without cardiac monitoring',
        body: 'Severe hyperkalemia in ESRD can cause immediate fatal arrhythmias. Get an ECG at first evaluation to identify peaked T waves, widened QRS, or sine wave patterns — findings that mandate emergent treatment before labs return. [See hyperkalemia ECG node](#/node/hd-hyperkalemia-ecg).',
      },
      {
        heading: '🛑 Do NOT use NSAIDs for pain in ESRD patients',
        body: 'NSAIDs worsen residual renal function, increase fluid retention, and raise potassium. They are contraindicated in virtually all dialysis-dependent patients, including for uremic pleuritis and pericarditis. [See uremia main node](#/node/hd-uremia-main).',
      },
      {
        heading: '🛑 Do NOT ignore a clotted or poorly functioning access as "outpatient only"',
        body: 'A clotted fistula or graft that cannot be salvaged leaves the patient without vascular access for dialysis — an immediate emergency. Contact nephrology urgently; time to intervention determines whether the access can be rescued. [See access clotted node](#/node/hd-access-clotted).',
      },
      {
        heading: '🛑 Do NOT miss dialysis disequilibrium syndrome',
        body: 'Rapid fluid removal and osmolar shifts during first dialysis sessions can cause cerebral edema — headache, nausea, seizures, and coma. Prevent with slow, conservative first sessions and consider mannitol. [See uremic encephalopathy node](#/node/hd-uremic-encephalopathy).',
      },
      {
        heading: '🛑 Do NOT delay antibiotics for suspected catheter sepsis',
        body: 'Bacteremia in HD patients with tunneled catheters carries high mortality and can cause endocarditis. Start empiric vancomycin (MRSA coverage) plus gram-negative coverage before cultures result. [See infection main node](#/node/hd-infection-main).',
      },
      {
        heading: '🛑 Do NOT discharge hyperkalemia in HD patients without dialysis scheduled',
        body: 'Medical treatment of hyperkalemia in ESRD (insulin/glucose, kayexalate) is a bridge — potassium will rebound because there is no renal excretion. Dialysis must be arranged before discharge or the patient requires admission. [See electrolyte disposition node](#/node/hd-electrolyte-disposition).',
      },
    ],
    citations: [],
  },

  'heat-stroke-stop': {
    id: 'heat-stroke-stop',
    title: 'Heat Stroke — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT give antipyretics (aspirin or acetaminophen)',
        body: 'Heat stroke hyperthermia is caused by failed thermoregulation, not fever. Antipyretics are ineffective and aspirin may worsen coagulopathy and DIC — a common fatal complication. Active cooling is the only effective treatment. [See recognition node](#/node/hs-recognize).',
      },
      {
        heading: '🛑 Do NOT delay cooling to complete workup',
        body: 'Target core temperature <39°C as rapidly as possible — every degree-minute of hyperthermia above 40°C increases neurological injury. Start ice water immersion or evaporative cooling immediately upon recognition, before labs or CT. [See cooling start node](#/node/hs-cooling-start).',
      },
      {
        heading: '🛑 Do NOT use succinylcholine for intubation',
        body: 'Rhabdomyolysis causes hyperkalemia in heat stroke patients. Succinylcholine-induced potassium efflux can precipitate fatal cardiac arrhythmia. Use rocuronium 1.2 mg/kg instead. [See intubation node](#/node/hs-intubation).',
      },
      {
        heading: '🛑 Do NOT stop cooling at the target temperature',
        body: 'Stop active cooling at 39°C (102.2°F) — not lower. Core temperature continues to drift down after immersion ends ("afterdrop"). Overcooling to <38°C can cause rebound hypothermia. [See cooling endpoint node](#/node/hs-cooling-endpoint).',
      },
      {
        heading: '🛑 Do NOT miss rhabdomyolysis',
        body: 'Rhabdomyolysis occurs in virtually all exertional heat stroke cases and is the primary driver of acute kidney injury and hyperkalemia. Check CK every 6–12h; if CK >5,000, target urine output 200–300 mL/hr with aggressive IV fluids. [See rhabdo node](#/node/hs-rhabdo).',
      },
      {
        heading: '🛑 Do NOT overlook DIC',
        body: 'Heat stroke directly activates the clotting cascade and destroys platelets. Check PT/INR, fibrinogen, and platelets early — DIC is a common cause of death. Treat the underlying hyperthermia; DIC typically resolves with cooling. [See coags node](#/node/hs-coags).',
      },
      {
        heading: '🛑 Do NOT discharge heat exhaustion without reassessment',
        body: 'Heat exhaustion can rapidly progress to heat stroke with continued exertion or inadequate cooling. Monitor temperature trends, mental status, and ensure it is normal before discharge. [See heat exhaustion node](#/node/hs-exhaustion).',
      },
    ],
    citations: [],
  },

  'hypothermia-stop': {
    id: 'hypothermia-stop',
    title: 'Hypothermia — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT use oral, axillary, or tympanic thermometry',
        body: 'Peripheral thermometers are unreliable in hypothermia and may be falsely normal or falsely low. A rectal or esophageal core temperature probe is mandatory to guide all decisions. [See temperature measurement node](#/node/hypo-temp-measurement).',
      },
      {
        heading: '🛑 Do NOT declare death before rewarming to ≥32°C',
        body: '"No one is dead until they are warm and dead." Fixed/dilated pupils, muscular rigidity, and prolonged down time are NOT contraindications to resuscitation in hypothermia. Continue CPR until core temp ≥32°C. [See arrest termination node](#/node/hypo-arrest-terminate).',
      },
      {
        heading: '🛑 Do NOT resuscitate if K+ >12 mEq/L (confirmed)',
        body: 'A serum potassium >12 mEq/L in a hypothermic arrest patient represents a hard contraindication to resuscitation — there are no documented survivors. Rule out hemolysis artifact before using K+ for termination. [See arrest decision node](#/node/hypo-arrest-decision).',
      },
      {
        heading: '🛑 Do NOT rewarm the extremities before the trunk',
        body: 'Warming extremities first mobilizes cold peripheral blood back to the core, causing "afterdrop" — a paradoxical drop in core temperature that can trigger fatal arrhythmias. Always apply warming to the trunk only. [See transport details node](#/node/hypo-transport-details).',
      },
      {
        heading: '🛑 Do NOT handle hypothermic patients roughly',
        body: 'Physical agitation of a hypothermic patient — including rough movement during transport — can precipitate ventricular fibrillation. Always move patients horizontally, gently, and use mechanical CPR during transport. [See CPR node](#/node/hypo-arrest-cpr).',
      },
      {
        heading: '🛑 Do NOT defibrillate more than once if core temp <30°C',
        body: 'The hypothermic heart is refractory to defibrillation below 30°C. Attempt defibrillation once — if unsuccessful, defer repeat attempts until temperature reaches 30°C. Continue CPR and active rewarming. [See defib node](#/node/hypo-arrest-defib).',
      },
      {
        heading: '🛑 Do NOT give repeated doses of ACLS drugs while severely hypothermic',
        body: 'Drug metabolism is severely impaired below 30°C and medications accumulate to toxic levels. Standard ACLS drug intervals are inappropriate — withhold or give at extended intervals per hypothermia protocols. [See ACLS drugs node](#/node/hypo-arrest-drugs).',
      },
      {
        heading: '🛑 Do NOT transport to the nearest hospital if ECMO is needed',
        body: 'Hypothermic cardiac arrest with K+ <12 requires ECMO rewarming for best outcomes. Activate the ECMO team and transport to an ECMO-capable center, even if a closer hospital exists. Continuous mechanical CPR during transport is mandatory. [See ECMO transport node](#/node/hypo-ecmo-transport).',
      },
    ],
    citations: [],
  },

  'awake-intubation-stop': {
    id: 'awake-intubation-stop',
    title: 'Awake Intubation — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT perform RSI without a surgical airway backup plan',
        body: 'When awake intubation is indicated, RSI is contraindicated — paralysis in a patient with structural obstruction risks a cannot-intubate/cannot-oxygenate emergency. Mark the cricothyroid membrane and have a surgical airway tray open before every attempt. [See indications node](#/node/awake-indications).',
      },
      {
        heading: '🛑 Do NOT lay the epiglottitis patient flat',
        body: 'Supine positioning in epiglottitis or supraglottitis worsens edema-related obstruction and can trigger complete obstruction. Keep the patient sitting upright and do not use a tongue depressor. [See epiglottitis node](#/node/awake-epiglottitis).',
      },
      {
        heading: '🛑 Do NOT attempt awake intubation in an uncooperative patient without DSI',
        body: 'An agitated, combative patient cannot cooperate with topicalization or scope guidance. Dissociative sedation with ketamine (DSI — Delayed Sequence Intubation) maintains airway reflexes while enabling cooperation. [See DSI node](#/node/awake-dsi).',
      },
      {
        heading: '🛑 Do NOT skip the antisialagogue',
        body: 'Excessive secretions coat topical anesthetic and prevent adequate mucosal anesthesia, making the procedure fail. Glycopyrrolate 0.2 mg IV (preferred — no CNS penetration) or atropine should be given 10–20 min before topicalization. [See antisialagogue node](#/node/awake-antisialagogue).',
      },
      {
        heading: '🛑 Do NOT pass the scope through active blood or thick secretions',
        body: 'Active airway bleeding is a relative contraindication to nasal fiberoptic intubation — blood obscures the scope and can be aspirated. In severe epistaxis or airway hemorrhage, use video laryngoscopy or consider surgical airway first. [See epistaxis complication node](#/node/awake-epistaxis).',
      },
      {
        heading: '🛑 Do NOT advance the ETT without seeing the cords',
        body: '"See cords, go" — never advance the endotracheal tube over the scope without directly visualizing the vocal cords and confirming the tip is in the trachea. Esophageal intubation with a nasal approach is catastrophic. [See nasal technique node](#/node/awake-nasal-technique).',
      },
      {
        heading: '🛑 Do NOT over-sedate during awake intubation',
        body: 'The goal is a cooperative, spontaneously breathing patient — not a sedated one. Too much ketamine or dexmedetomidine eliminates the protective airway reflexes that make awake intubation safe. Titrate to light dissociation only. [See sedation node](#/node/awake-sedation).',
      },
      {
        heading: '🛑 Do NOT attempt awake intubation in severe metabolic acidosis without preparation',
        body: 'A patient compensating severe acidosis with a high respiratory rate may fatally decompensate during even brief apnea. Plan for apneic oxygenation and have a ventilator ready to match the pre-intubation minute ventilation immediately post-intubation. [See acidosis node](#/node/awake-acidosis).',
      },
    ],
    citations: [],
  },

  'hfnc-stop': {
    id: 'hfnc-stop',
    title: 'HFNC — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT use HFNC as first-line for pure hypercarbic failure',
        body: 'HFNC provides minimal CO2 clearance and is ineffective for COPD exacerbation or obesity hypoventilation with CO2 retention (pH <7.35, PaCO2 rising). Use NIV (BiPAP) instead. [See COPD node](#/node/hfnc-copd).',
      },
      {
        heading: '🛑 Do NOT delay intubation for a prolonged HFNC trial',
        body: 'Clinically deteriorating patients on HFNC who are not improving within 1–2h should be intubated early, while still compensating. Delaying for an extended "trial" leads to crash intubation in extremis with higher mortality. [See intubation node](#/node/hfnc-intubation).',
      },
      {
        heading: '🛑 Do NOT ignore the ROX Index',
        body: 'ROX Index (SpO2/FiO2 ÷ RR) <3.85 at 2–6h predicts HFNC failure with high accuracy. Monitor every 2h and escalate to NIV or intubation when trending downward, not when the patient crashes. [See ROX monitoring node](#/node/hfnc-rox-monitoring).',
      },
      {
        heading: '🛑 Do NOT target SpO2 >96% on HFNC',
        body: 'Hyperoxia worsens outcomes in ARDS, stroke, and post-cardiac arrest. Target SpO2 92–96% and titrate FiO2 to the minimum needed. Starting FiO2 should be 50–60% for moderate hypoxemia, not 100% for all patients. [See titration node](#/node/hfnc-titration).',
      },
      {
        heading: '🛑 Do NOT skip airborne precautions for COVID or TB patients on HFNC',
        body: 'HFNC generates aerosols and significantly increases infectious particle dispersion. Use airborne precautions (N95 minimum) for all suspected or confirmed COVID, TB, or other airborne pathogens. [See setup node](#/node/hfnc-setup).',
      },
      {
        heading: '🛑 Do NOT transition directly from HFNC to standard nasal cannula',
        body: 'Wean HFNC by decreasing FiO2 first, then flow rate. Only transition to standard nasal cannula when tolerating ≤20–30 L/min and FiO2 ≤50%. Abrupt discontinuation risks acute decompensation. [See titration node](#/node/hfnc-titration).',
      },
      {
        heading: '🛑 Do NOT attempt intubation without pre-oxygenating on HFNC',
        body: 'Leave HFNC running at maximum settings during RSI preparation and laryngoscopy. HFNC during apnea provides significant apneic oxygenation, extending the safe apnea window beyond standard pre-oxygenation. [See intubation node](#/node/hfnc-intubation).',
      },
    ],
    citations: [],
  },

  'human-trafficking-stop': {
    id: 'human-trafficking-stop',
    title: 'Human Trafficking — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT interview a trafficking patient in front of their companion',
        body: "Traffickers frequently accompany victims to the ED and answer on their behalf to prevent disclosure. Always separate the patient from any companion before asking sensitive questions — a companion's refusal to leave is itself a red flag. [See separate node](#/node/ht-separate).",
      },
      {
        heading: '🛑 Do NOT ask accusatory or leading questions',
        body: '"Are you being trafficked?" is rarely effective — victims rarely self-identify with that label. Use open-ended, trauma-informed screening questions that build trust without presupposing or labeling their situation. [See screening node](#/node/ht-screen).',
      },
      {
        heading: '🛑 Do NOT force intervention on an adult who declines help',
        body: 'Autonomy must be respected — except for minors. Forced intervention on a competent adult who is not ready to leave can increase danger and permanently destroy trust. Provide resources, leave the door open, and document. [See not ready node](#/node/ht-not-ready).',
      },
      {
        heading: '🛑 Do NOT release a minor identified as a trafficking victim',
        body: 'Minors who screen positive for trafficking require mandatory CPS notification and cannot be discharged to an unverified guardian or companion. Consider admission for safety while child protective services are engaged. [See minor node](#/node/ht-minor).',
      },
      {
        heading: '🛑 Do NOT document trafficking details in chart where companion can access',
        body: 'Documentation should protect the patient — never include details that could identify them to their trafficker if the companion were to view the chart. Use safe language and consult social work on documentation strategy. [See documentation node](#/node/ht-documentation).',
      },
      {
        heading: '🛑 Do NOT dismiss multiple ED visits as drug-seeking or noncompliance',
        body: 'Trafficking victims often present repeatedly with injuries, STIs, or "frequent flyer" patterns that get labeled as non-compliance. Multiple visits by young patients with vague complaints or inconsistent histories should trigger a trafficking screen. [See red flags node](#/node/ht-red-flags).',
      },
      {
        heading: '🛑 Do NOT skip universal screening to "preserve the relationship"',
        body: 'Universal screening for all patients — not just those who fit a stereotype — is the standard. Trafficking victims are of all genders, ages, and demographics. Offering resources universally removes stigma and normalizes the conversation. [See universal node](#/node/ht-universal).',
      },
    ],
    citations: [],
  },

  'intralipid-stop': {
    id: 'intralipid-stop',
    title: 'Intralipid (ILE) — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT wait for cardiac arrest to give ILE in LAST',
        body: 'ILE should be given at the first signs of severe local anesthetic systemic toxicity — seizures refractory to benzodiazepines, significant hemodynamic instability, or any arrhythmia. Waiting for arrest dramatically worsens outcomes. [See LAST node](#/node/ile-last).',
      },
      {
        heading: '🛑 Do NOT use standard ACLS epinephrine doses in LAST arrest',
        body: 'High-dose epinephrine (1 mg IV) may worsen arrhythmias and reduce ILE efficacy in local anesthetic toxicity. Start at 10–100 mcg and titrate slowly — ASRA recommends avoiding doses >1 mcg/kg. [See CPR modifications node](#/node/ile-cpr-modifications).',
      },
      {
        heading: '🛑 Do NOT give vasopressin, CCBs, or beta-blockers in LAST arrest',
        body: 'Vasopressin has been shown to worsen outcomes in local anesthetic toxicity. Calcium channel blockers and beta-blockers are contraindicated — both compound the cardiac depression already caused by the local anesthetic. [See CPR modifications node](#/node/ile-cpr-modifications).',
      },
      {
        heading: '🛑 Do NOT use propofol as the initial treatment for LAST seizures',
        body: 'Propofol is itself a lipid vehicle and carries cardiac depressant properties. Use benzodiazepines (midazolam) for seizures in LAST. Propofol should be a last resort if benzodiazepines fail and only in hemodynamically stable patients. [See CCB/LAST node](#/node/ile-last).',
      },
      {
        heading: '🛑 Do NOT terminate resuscitation early in LAST arrest',
        body: 'LAST patients have recovered neurologically after >60 minutes of CPR as ILE progressively sequesters the drug. Continue CPR far longer than standard protocols before considering termination. [See CPR modifications node](#/node/ile-cpr-modifications).',
      },
      {
        heading: '🛑 Do NOT delay ILE because of egg or soy allergy',
        body: 'In life-threatening LAST, an egg or soy allergy is NOT a contraindication to ILE. The theoretical anaphylaxis risk is far outweighed by the risk of untreated local anesthetic cardiovascular collapse. [See complications node](#/node/ile-complications).',
      },
      {
        heading: '🛑 Do NOT trust labs drawn after ILE administration',
        body: 'ILE causes significant lipemia that interferes with electrolytes, troponin, liver enzymes, and drug levels. Draw critical labs before giving ILE when possible, and note lipemia on all orders. Labs normalize 12–24h after stopping infusion. [See lab interference node](#/node/ile-lab-interference).',
      },
      {
        heading: '🛑 Do NOT discharge after ILE without monitoring for recrudescence',
        body: 'As ILE is metabolized over 4–6h, drug levels in tissues can re-equilibrate and toxicity may recur. All patients receiving ILE for LAST require ICU admission for at minimum 12–24h of cardiac monitoring after stabilization. [See disposition node](#/node/ile-disposition).',
      },
    ],
    citations: [],
  },

};
