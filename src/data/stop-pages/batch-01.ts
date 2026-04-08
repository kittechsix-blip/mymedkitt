import type { InfoPage } from '../info-pages.js';

export const STOP_PAGES_01: Record<string, InfoPage> = {

  'difficult-airway-bougie-stop': {
    id: 'difficult-airway-bougie-stop',
    title: 'Difficult Airway — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT skip the pre-oxygenation step',
        body: 'Skipping preoxygenation dramatically shortens your safe apnea time. Spend 3–5 min on NRB or flush-rate O2 and use apneic oxygenation (15 L/min NC) during laryngoscopy. [See pre-assessment node](#/node/dab-start).',
      },
      {
        heading: '🛑 Do NOT paralyze without backup equipment at bedside',
        body: 'Once you paralyze, the patient cannot protect their airway. Have the surgical airway kit open and the SGA within arm\'s reach before you push any paralytic. [See backup assessment node](#/node/dab-backup).',
      },
      {
        heading: '🛑 Do NOT preload the bougie through the ETT',
        body: 'Preloading locks the bougie in a fixed curve and destroys maneuverability. Hold the bougie separately, railroad the ETT over it only after tracheal placement is confirmed. [See equipment setup node](#/node/dab-equipment).',
      },
      {
        heading: '🛑 Do NOT rely on tracheal clicks alone for confirmation',
        body: 'Clicks are felt in only ~90% of correct placements and are absent in obese patients. Use the hold-up sign AND waveform capnography — clicks alone are insufficient. [See bougie technique node](#/node/dab-technique).',
      },
      {
        heading: '🛑 Do NOT remove the laryngoscope before the ETT clears the cords',
        body: 'Losing your view during ETT advancement over the bougie is a common cause of failed railroad. Maintain laryngoscopy until the tube has clearly passed through the cords. [See bougie technique node](#/node/dab-technique).',
      },
      {
        heading: '🛑 Do NOT accept anything less than sustained waveform capnography',
        body: 'Transient CO2 (2–3 breaths then fade) indicates esophageal placement — the stomach holds some CO2. Insist on a sustained 4-phase waveform over 5–6 ventilations before securing. [See confirmation node](#/node/dab-etco2-check).',
      },
      {
        heading: '🛑 Do NOT attempt more than 3 laryngoscopies',
        body: 'Each attempt causes edema, bleeding, and secretions that worsen the next view. After 3 failed attempts declare a failed airway and move to rescue — more attempts are not rescue. [See max attempts node](#/node/dab-max-attempts).',
      },
      {
        heading: '🛑 Do NOT delay surgical airway once CICV is declared',
        body: 'Cannot-Intubate/Cannot-Ventilate is a surgical emergency. Hesitating on the scalpel while the patient desaturates is the proximate cause of death. Cut early, cut confidently. [See surgical airway node](#/node/dab-failed).',
      },
      {
        heading: '🛑 Do NOT forget ETT rotation on arytenoid hang-up',
        body: 'If the ETT catches after passing the cords, rotate it 90° counterclockwise — the bevel will clear the arytenoid. Forcing the tube without rotation can traumatize the supraglottis. [See bougie technique node](#/node/dab-technique).',
      },
    ],
    citations: [],
  },

  'anaphylaxis-stop': {
    id: 'anaphylaxis-stop',
    title: 'Anaphylaxis — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT delay epinephrine for antihistamines or steroids',
        body: 'Antihistamines and steroids do not treat the life-threatening components of anaphylaxis. Epinephrine IM is the only first-line treatment — every minute of delay increases mortality. [See source control node](#/node/anaph-source-control).',
      },
      {
        heading: '🛑 Do NOT inject epinephrine subcutaneously in anaphylaxis',
        body: 'Subcutaneous injection is slower and less reliable than the anterolateral thigh IM route. The thigh achieves peak plasma levels significantly faster. [See epinephrine node](#/node/anaph-source-control).',
      },
      {
        heading: '🛑 Do NOT give cardiac arrest dose (1 mg IV push) to a patient with a pulse',
        body: 'This is a 61-fold overdose compared to IM dosing and causes hypertensive crisis, arrhythmias, and death. In non-arrest patients requiring IV epinephrine, use a weight-based infusion starting at 10 mcg/min. [See IV access node](#/node/anaph-iv-access).',
      },
      {
        heading: '🛑 Do NOT withhold epinephrine for cardiovascular disease',
        body: 'There are NO absolute contraindications to epinephrine in anaphylaxis — the risk of untreated anaphylaxis always exceeds the risk of the drug. Coronary disease, hypertension, and pregnancy are not contraindications. [See start node](#/node/anaph-start).',
      },
      {
        heading: '🛑 Do NOT discharge after epinephrine without adequate observation',
        body: 'Biphasic reactions occur in up to 20% of patients 1–72 hours after the initial event. Observe a minimum of 4–6 hours; admit patients with severe reactions, asthma, or unreliable access to care. [See diagnosis node](#/node/anaph-diagnosis).',
      },
      {
        heading: '🛑 Do NOT treat angioedema without urticaria as routine anaphylaxis',
        body: 'ACE-inhibitor angioedema (bradykinin-mediated) and hereditary angioedema do not respond to epinephrine. Identify the mechanism before treating. [See airway node](#/node/anaph-airway).',
      },
      {
        heading: '🛑 Do NOT sit or stand a hypotensive anaphylaxis patient upright',
        body: 'Up to 35% of intravascular volume extravasates within minutes during anaphylaxis. Lay the patient flat and elevate legs — positional change from supine to standing can be immediately fatal. [See peri-arrest node](#/node/anaph-peri-arrest).',
      },
      {
        heading: '🛑 Do NOT delay intubation for worsening airway edema',
        body: 'Airway edema from anaphylaxis can close completely within minutes. Call anesthesia and ENT early, use a smaller ETT, and have a surgical airway kit open. Waiting for "further deterioration" is too late. [See critical airway node](#/node/anaph-airway-critical).',
      },
    ],
    citations: [],
  },

  'diarrhea-stop': {
    id: 'diarrhea-stop',
    title: 'Acute Diarrhea — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT give antibiotics if STEC (E. coli O157) is suspected',
        body: 'Antibiotics in Shiga toxin-producing E. coli increase bacterial lysis and toxin release, raising the risk of hemolytic uremic syndrome (HUS) by up to 17-fold. Suspect STEC with bloody diarrhea, afebrile patient, and history of undercooked beef. [See bloody diarrhea node](#/node/diarrhea-bloody).',
      },
      {
        heading: '🛑 Do NOT give antimotility agents in bloody or febrile diarrhea',
        body: 'Loperamide and bismuth delay pathogen clearance in inflammatory diarrhea and increase the risk of systemic spread and HUS in STEC. Reserve antimotility agents for watery, afebrile traveler\'s diarrhea. [See bloody diarrhea node](#/node/diarrhea-bloody).',
      },
      {
        heading: '🛑 Do NOT miss C. difficile in patients on recent antibiotics',
        body: 'Any antibiotic in the past 3 months warrants C. diff testing, not just the stereotypical clindamycin. C. diff can present without pseudomembranes and with near-normal WBC in early disease. [See C. diff node](#/node/diarrhea-cdiff).',
      },
      {
        heading: '🛑 Do NOT use metronidazole alone for severe C. difficile',
        body: 'Metronidazole monotherapy has inferior outcomes for severe C. diff (WBC >15K, Cr >1.5). Oral vancomycin 125 mg QID is first-line for all severities; add IV metronidazole only in fulminant disease. [See C. diff treatment node](#/node/diarrhea-cdiff-treatment).',
      },
      {
        heading: '🛑 Do NOT anchor on gastroenteritis in a patient with severe abdominal pain',
        body: 'Diarrhea is a common early symptom of appendicitis — especially in pediatric patients (27% misdiagnosed). In gastroenteritis, vomiting precedes pain; in appendicitis, pain precedes vomiting. [See surgical differential node](#/node/diarrhea-surgical-ddx).',
      },
      {
        heading: '🛑 Do NOT use fluoroquinolones for traveler\'s diarrhea from Southeast Asia',
        body: 'Campylobacter resistance to fluoroquinolones exceeds 80% in Southeast Asia. Use azithromycin as first-line for all moderate-severe traveler\'s diarrhea from that region. [See traveler\'s diarrhea node](#/node/diarrhea-travelers).',
      },
      {
        heading: '🛑 Do NOT forget HUS screening in bloody diarrhea',
        body: 'Get a CBC with platelets and creatinine in every patient with bloody diarrhea — thrombocytopenia and rising creatinine may be the first sign of HUS before oliguria or neurologic findings develop. [See bloody diarrhea node](#/node/diarrhea-bloody).',
      },
    ],
    citations: [],
  },

  'hiv-stop': {
    id: 'hiv-stop',
    title: 'HIV ED Management — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT stop HAART without HIV specialist guidance',
        body: 'Abruptly discontinuing antiretrovirals causes viral rebound, resistance selection, and immune reconstitution complications. If a drug must be held (e.g., surgery, GI intolerance), consult HIV specialist — all drugs should be stopped simultaneously. [See immunocompromised disposition node](#/node/hiv-immunocompromised-disposition).',
      },
      {
        heading: '🛑 Do NOT stop tenofovir/emtricitabine/lamivudine in HBV co-infection',
        body: 'These NRTIs are active against HBV. Stopping them in a co-infected patient can trigger severe HBV reactivation hepatitis. Screen for HBV co-infection before any ARV changes. [See HBV caution node](#/node/hiv-hbv-caution).',
      },
      {
        heading: '🛑 Do NOT miss ectopic/radiolucent kidney stones in PI-treated patients',
        body: 'Atazanavir and indinavir form radiolucent stones invisible on noncontrast CT. If a PI patient has flank pain and CT shows only secondary signs (hydroureter, stranding), do not discharge as "no stone" — urology consult is warranted. [See renal node](#/node/hiv-renal).',
      },
      {
        heading: '🛑 Do NOT anchor on COPD when an HIV patient has pleuritic chest pain',
        body: 'HIV patients have a 2.5× higher VTE risk from chronic inflammation. Pleuritic chest pain with dyspnea warrants PE evaluation even when COPD is a known diagnosis. PERC criteria were not validated in HIV patients. [See respiratory node](#/node/hiv-respiratory).',
      },
      {
        heading: '🛑 Do NOT use 3rd-generation (antibody-only) test to rule out acute HIV',
        body: '3rd-gen tests cannot detect acute infection during the p24 antigen window (days 5–20 post-exposure). Use a 4th-gen (Ab + p24 Ag) test, and add HIV viral load if acute seroconversion is suspected despite a negative 4th-gen result. [See seroconversion testing node](#/node/hiv-seroconversion-testing).',
      },
      {
        heading: '🛑 Do NOT assume diarrhea in HIV is always medication-related',
        body: 'C. difficile is significantly more common in HIV patients than the general population. Obtain careful antibiotic and hospitalization history before attributing diarrhea to ARVs. [See GI node](#/node/hiv-gi).',
      },
      {
        heading: '🛑 Do NOT dismiss ACS in a young HIV patient based on age alone',
        body: 'HIV independently increases cardiovascular risk independent of traditional risk factors. Abacavir has been associated with increased MI risk. Apply standard ACS evaluation regardless of the patient\'s age. [See cardiovascular node](#/node/hiv-cardiovascular).',
      },
      {
        heading: '🛑 Do NOT delay PEP past 72 hours post-exposure',
        body: 'Post-exposure prophylaxis must start within 72 hours — efficacy drops sharply after this window. Time from exposure is the single most critical variable. [See prevention node](#/node/hiv-prevention).',
      },
    ],
    citations: [],
  },

  'ct-decision-support-stop': {
    id: 'ct-decision-support-stop',
    title: 'CT Decision Support — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT order head CT without applying a validated decision rule',
        body: 'The Canadian CT Head Rule and PECARN are prospectively validated tools with near-100% sensitivity for significant injury. Reflexive CT without applying these rules exposes patients to unnecessary radiation and may paradoxically reduce diagnostic quality. [See CT start node](#/node/ct-start).',
      },
      {
        heading: '🛑 Do NOT apply CCHR to patients on anticoagulation',
        body: 'The Canadian CT Head Rule excludes patients on anticoagulants — even trivial head trauma warrants CT in anticoagulated patients due to the high risk of intracranial hemorrhage. [See CCHR clinical judgment node](#/node/ct-head-clinical-judgment).',
      },
      {
        heading: '🛑 Do NOT skip the PECARN intermediate-risk shared decision step',
        body: 'PECARN intermediate-risk children (0.8–0.9% ciTBI) have a viable observation alternative. Immediately scanning every child with a single intermediate criterion bypasses a legitimate radiation-sparing option. [See PECARN observe node](#/node/ct-pecarn-observe).',
      },
      {
        heading: '🛑 Do NOT use NEXUS instead of Canadian C-Spine Rule when both apply',
        body: 'The Canadian C-Spine Rule has 100% sensitivity for C-spine injury vs 99.6% for NEXUS and is significantly more specific (42.5% vs 12.9%), reducing unnecessary imaging. Prefer CCR in alert, stable trauma patients. [See C-spine alert node](#/node/ct-cspine-alert).',
      },
      {
        heading: '🛑 Do NOT order CT-PE without pre-test probability (Wells or PERC)',
        body: 'Low pre-test probability patients who are PERC-negative have a <2% PE prevalence — CT-PE in this population creates false positives, unnecessary anticoagulation, and incidentaloma cascades. [See PE pre-test node](#/node/ct-pe-pretest).',
      },
      {
        heading: '🛑 Do NOT order CT-PE as the first test in a low-probability patient',
        body: 'D-dimer is the appropriate first test in low-to-moderate pre-test probability. A negative age-adjusted D-dimer rules out PE without radiation exposure or contrast risk. [See PE pre-test node](#/node/ct-pe-pretest).',
      },
      {
        heading: '🛑 Do NOT skip documentation of the clinical decision rule result',
        body: 'Documenting which rule was applied, what criteria were met, and the result protects the patient, guides follow-up providers, and is required by Choosing Wisely and ACR appropriateness criteria. [See CT start node](#/node/ct-start).',
      },
    ],
    citations: [],
  },

  'precip-delivery-stop': {
    id: 'precip-delivery-stop',
    title: 'Precipitous Delivery — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT fail to page OB and Pediatrics immediately',
        body: 'Even if delivery looks minutes away, page OB and Pediatrics the moment you recognize active labor — they need maximum lead time. "She just walked in" is not a reason to wait. [See call for help node](#/node/precip-callhelp).',
      },
      {
        heading: '🛑 Do NOT trust a multiparous patient to have "time left"',
        body: 'Multiparous patients can progress from 4 cm to delivery in minutes. The classic teaching: "Never trust a multip." Assume delivery is more imminent than the patient thinks. [See history node](#/node/precip-history).',
      },
      {
        heading: '🛑 Do NOT pull on the fetal head to speed delivery',
        body: 'Traction on the head during crowning risks brachial plexus injury and perineal tears. Let the uterus do the work — apply only gentle counter-pressure to control the speed of head delivery. [See head delivery node](#/node/precip-head).',
      },
      {
        heading: '🛑 Do NOT routinely suction the airway after delivery',
        body: 'Routine nasopharyngeal suctioning is no longer recommended per NRP 8th edition. Suction only if the airway is visibly obstructed. Vigorous suctioning causes vagal bradycardia. [See head delivery node](#/node/precip-head).',
      },
      {
        heading: '🛑 Do NOT clamp the cord immediately in a vigorous term infant',
        body: 'Delayed cord clamping (30–60 seconds) improves iron stores, hemoglobin, and neurodevelopmental outcomes. Only clamp immediately if the infant requires resuscitation or the cord is too tight to reduce. [See cord clamping node](#/node/precip-cord).',
      },
      {
        heading: '🛑 Do NOT apply traction in the wrong axis during shoulder delivery',
        body: 'Traction must be along the long axis of the fetal neck — lateral bending causes brachial plexus injury (Erb\'s palsy). If the head retracts ("turtle sign"), stop and proceed to the Shoulder Dystocia protocol. [See shoulder delivery node](#/node/precip-shoulders).',
      },
      {
        heading: '🛑 Do NOT give oxytocin before the placenta delivers',
        body: 'Oxytocin given before placenta delivery can trap the placenta if there is an undiagnosed second twin. Confirm single fetus before administering uterotonic agents. [See oxytocin node](#/node/precip-oxytocin).',
      },
      {
        heading: '🛑 Do NOT attempt transfer when delivery is imminent',
        body: 'EMTALA requires stabilization before transfer — and an imminent delivery is not a stable condition. Delivering in an ambulance is significantly more dangerous than delivering in the ED with a team. [See transfer node](#/node/precip-transfer).',
      },
    ],
    citations: [],
  },

  'shoulder-dystocia-stop': {
    id: 'shoulder-dystocia-stop',
    title: 'Shoulder Dystocia — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT pull laterally or twist the fetal head',
        body: 'Lateral traction or twisting the neck while pulling is the primary mechanism of brachial plexus stretch injury (Erb\'s palsy). All traction must be in the long axis of the fetal neck — axial, not lateral. [See traction node](#/node/sd-traction).',
      },
      {
        heading: '🛑 Do NOT panic — call out "shoulder dystocia" and start the clock',
        body: 'The most dangerous response is uncoordinated frantic pulling. Announce shoulder dystocia calmly, designate a timekeeper, and systematically move through your maneuvers. You have 4–5 minutes. [See initial response node](#/node/sd-initial).',
      },
      {
        heading: '🛑 Do NOT apply fundal pressure during shoulder dystocia',
        body: 'Fundal pressure drives the impacted shoulder further into the pelvis and worsens the dystocia. Suprapubic pressure (pushing the shoulder to an oblique position) is the correct adjunct maneuver. [See McRoberts node](#/node/sd-mcroberts).',
      },
      {
        heading: '🛑 Do NOT skip McRoberts + suprapubic as the first-line combination',
        body: 'Together they resolve 50–60% of all shoulder dystocias with minimal risk. Jumping directly to internal maneuvers without first attempting McRoberts + suprapubic wastes time and increases maternal and fetal injury risk. [See McRoberts node](#/node/sd-mcroberts).',
      },
      {
        heading: '🛑 Do NOT forget to try both rotational directions',
        body: 'Wood\'s screw can be rotated clockwise or counterclockwise. One direction often succeeds where the other fails because shoulder anatomy varies. Try both before moving to posterior arm delivery. [See rotational maneuver node](#/node/sd-rotational).',
      },
      {
        heading: '🛑 Do NOT delay attempting posterior arm delivery if rotation fails',
        body: 'Posterior arm delivery has the highest success rate of all second-line maneuvers per Hoffman 2011 data. Humeral fracture risk (~12%) is an acceptable trade-off in a life-threatening situation — these fractures heal. [See posterior arm node](#/node/sd-posterior-arm).',
      },
      {
        heading: '🛑 Do NOT perform Zavanelli without setting up for C-section simultaneously',
        body: 'Zavanelli (cephalic replacement) is only viable if an emergency cesarean section is immediately available. Attempting cephalic replacement without surgical backup ready is not a rescue maneuver. [See last resort node](#/node/sd-last-resort).',
      },
      {
        heading: '🛑 Do NOT fail to document timing and maneuver sequence after delivery',
        body: 'The head-to-body interval and the specific sequence and timing of all maneuvers is medicolegally critical. Designate a note-taker in the room and document immediately after delivery. [See resolved node](#/node/sd-resolved).',
      },
    ],
    citations: [],
  },

  'first-trimester-stop': {
    id: 'first-trimester-stop',
    title: 'First Trimester Emergencies — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT miss ectopic in an unstable patient by waiting for labs',
        body: 'A hemodynamically unstable pregnant patient is a ruptured ectopic until proven otherwise. Free fluid on FAST + no IUP on bedside US = emergent OB surgical consult. Do not wait for a quantitative beta-hCG. [See unstable ectopic node](#/node/ft-unstable-ectopic).',
      },
      {
        heading: '🛑 Do NOT use a rising beta-hCG to rule out ectopic',
        body: 'One-third of ectopics show a ≥53% rise in 48h, and 20% decline like a completed miscarriage. Beta-hCG trends are insufficient to exclude ectopic — serial US and OB follow-up are mandatory. [See PUL node](#/node/ft-pul).',
      },
      {
        heading: '🛑 Do NOT give hormonal therapy without ruling out pregnancy',
        body: 'All hormonal AUB treatments (estrogen, progestins, OCPs) are contraindicated in pregnancy. An hCG must be confirmed negative before any hormonal therapy is initiated. [See AUB pregnancy node](#/node/aub-pregnancy).',
      },
      {
        heading: '🛑 Do NOT withhold Rh immune globulin from an Rh-negative patient with first-trimester bleeding',
        body: 'Any vaginal bleeding or uterine instrumentation in an Rh-negative patient requires RhoGAM (Rh immune globulin) to prevent Rh sensitization that could affect future pregnancies. [See miscarriage complete node](#/node/ft-miscarriage-complete).',
      },
      {
        heading: '🛑 Do NOT give methotrexate if fetal cardiac activity is present',
        body: 'Fetal cardiac activity on ultrasound carries an OR of 9.1 for methotrexate failure and indicates a higher-volume ectopic at greater rupture risk. These patients need surgical management, not medical therapy. [See ectopic medical node](#/node/ft-ectopic-medical).',
      },
      {
        heading: '🛑 Do NOT assume a confirmed IUP rules out ectopic in ART patients',
        body: 'In patients who used assisted reproductive technology, heterotopic pregnancy (simultaneous IUP and ectopic) occurs in 1 in 100 — 30× higher than the general population. Maintain suspicion for ectopic even with a confirmed IUP. [See IUP confirmed node](#/node/ft-iup-confirmed).',
      },
      {
        heading: '🛑 Do NOT use fluoroquinolones for UTI in first-trimester pregnancy',
        body: 'Fluoroquinolones are contraindicated in pregnancy due to fetal cartilage toxicity. Use amoxicillin, nitrofurantoin, or cephalexin — and avoid nitrofurantoin at term due to hemolytic anemia risk. [See UTI eval node](#/node/ft-uti-eval).',
      },
      {
        heading: '🛑 Do NOT give NSAIDs for pain in the first trimester',
        body: 'NSAIDs are associated with early miscarriage and cardiac defects in the first trimester. Use acetaminophen for analgesia. [See NVP assessment node](#/node/ft-nvp-assess).',
      },
    ],
    citations: [],
  },

  'aub-stop': {
    id: 'aub-stop',
    title: 'Abnormal Uterine Bleeding — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT start hormonal therapy without ruling out pregnancy',
        body: 'Estrogen and progestins are contraindicated in pregnancy. Obtain a urine hCG before initiating any hormonal treatment regardless of the patient\'s reported menstrual history. [See pregnancy exclusion node](#/node/aub-pregnancy).',
      },
      {
        heading: '🛑 Do NOT give IV conjugated estrogen without planning a progestin follow-up',
        body: 'IV estrogen (Premarin 25 mg IV) effectively stops bleeding but causes endometrial proliferation. It must be followed within 24 hours by a progestin (e.g., MPA 10 mg PO daily × 10 days) to prevent rebound hemorrhage. [See estrogen treatment node](#/node/aub-rx-estrogen).',
      },
      {
        heading: '🛑 Do NOT use NSAIDs if coagulopathy is suspected',
        body: 'NSAIDs inhibit platelet aggregation and can significantly worsen bleeding in a patient with von Willebrand disease or thrombocytopenia — the two most common coagulopathic causes of heavy menstrual bleeding. [See coagulopathy node](#/node/aub-coagulopathy).',
      },
      {
        heading: '🛑 Do NOT skip endometrial biopsy criteria in older or obese patients',
        body: 'Endometrial biopsy is mandatory for women ≥45 with AUB, and for women <45 with obesity, PCOS, or unopposed estrogen exposure — endometrial cancer is the diagnosis you cannot afford to miss. [See imaging node](#/node/aub-imaging).',
      },
      {
        heading: '🛑 Do NOT overlook coagulopathy as a cause of heavy menstrual bleeding',
        body: 'Up to 20% of women with heavy menstrual bleeding have an underlying coagulopathy — von Willebrand disease accounts for up to 13%. Screen with structured history questions before assuming a hormonal cause. [See coagulopathy node](#/node/aub-coagulopathy).',
      },
      {
        heading: '🛑 Do NOT give DDAVP to a massively hemorrhaging patient receiving IV fluids',
        body: 'Desmopressin causes fluid retention and hyponatremia — combining it with aggressive IV resuscitation can precipitate dangerous dilutional hyponatremia. Use tranexamic acid as first-line in the unstable patient. [See coagulopathy node](#/node/aub-coagulopathy).',
      },
      {
        heading: '🛑 Do NOT delay GYN consult in unstable AUB',
        body: 'Hemodynamically unstable AUB requires emergent GYN consultation for potential procedural intervention (curettage, embolization). ED medications are temporizing — they buy time, not definitive control. [See unstable AUB node](#/node/aub-unstable).',
      },
    ],
    citations: [],
  },

  'distal-radius-stop': {
    id: 'distal-radius-stop',
    title: 'Distal Radius Fracture — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT attempt reduction without adequate analgesia',
        body: 'Pain and muscle spasm prevent successful reduction. A hematoma block (5–10 mL 1% lidocaine, wait 5–10 min) takes less than 15 minutes and dramatically improves success rate without requiring procedural sedation resources. [See analgesia node](#/node/dr-analgesia).',
      },
      {
        heading: '🛑 Do NOT skip traction (disimpaction) before reducing',
        body: 'Impacted distal radius fragments are locked together — you cannot reduce what you cannot separate. Apply longitudinal traction first to recreate length, then reduce. Reduction without prior traction almost always fails. [See traction node](#/node/dr-traction).',
      },
      {
        heading: '🛑 Do NOT inject hematoma block without aspirating first',
        body: 'Aspirating dark blood confirms you are in the fracture hematoma, not a vessel or the wrong compartment. Injecting without confirmation risks systemic local anesthetic toxicity. [See hematoma block node](#/node/dr-hema-block).',
      },
      {
        heading: '🛑 Do NOT use fiberglass for an unstable distal radius fracture',
        body: 'Fiberglass cannot be molded adequately to maintain reduction. Unstable fractures require plaster (10 layers, minimal padding at fracture site) shaped with flat palms to create a three-point bending force. [See splint application node](#/node/dr-apply).',
      },
      {
        heading: '🛑 Do NOT mold the cast with fingertips',
        body: 'Fingertip molding creates focal pressure points that cause pressure sores and compartment syndrome. Mold only with flat palms to distribute pressure evenly and achieve an oval cross-section. [See mold node](#/node/dr-mold).',
      },
      {
        heading: '🛑 Do NOT immobilize the wrist in too much flexion',
        body: 'Extreme wrist flexion increases carpal tunnel pressure and risks median nerve compression. Target 10° of flexion with ulnar deviation — not the historically taught "Cotton-Loder" position of maximum flexion. [See position node](#/node/dr-position).',
      },
      {
        heading: '🛑 Do NOT block elbow, MCP joints, or thumb in the cast',
        body: 'The cast should end at the proximal palmar crease (full MCP flexion) and leave the thumb and elbow free. Immobilizing these joints causes stiffness that can be permanent. [See position node](#/node/dr-position).',
      },
      {
        heading: '🛑 Do NOT discharge without ortho follow-up and repeat x-rays at 5–7 days',
        body: 'Reduced distal radius fractures re-displace in 15–50% of cases as swelling resolves. Repeat films at the first ortho visit are mandatory to catch loss of reduction before the window for re-reduction closes. [See disposition node](#/node/dr-dispo).',
      },
    ],
    citations: [],
  },

  'splinting-stop': {
    id: 'splinting-stop',
    title: 'Splinting — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT splint without a pre-splint neurovascular exam',
        body: 'Document neurovascular status (pulses, capillary refill, 2-point discrimination, nerve function) before applying any splint. If a deficit develops after splinting, you need a pre-splint baseline to determine causation. [See splint start node](#/node/splint-start).',
      },
      {
        heading: '🛑 Do NOT use hot water to dip plaster',
        body: 'Hot water accelerates the setting reaction and generates excess exothermic heat — second-degree burns from plaster casts are a real and preventable complication. Always use lukewarm water. [See general principles node](#/node/splint-start).',
      },
      {
        heading: '🛑 Do NOT apply a circumferential cast over acute swelling',
        body: 'Circumferential casts over acutely injured extremities cause compartment syndrome as swelling peaks at 24–72 hours. Use a splint (3-sided) that allows expansion until swelling resolves. [See splint start node](#/node/splint-start).',
      },
      {
        heading: '🛑 Do NOT mold the splint with fingertips',
        body: 'Focal pressure from fingertips creates pressure points that cause skin ulceration. Use flat palms for molding to distribute force evenly across the splint surface. [See splint start node](#/node/splint-start).',
      },
      {
        heading: '🛑 Do NOT extend the splint past the proximal palmar crease',
        body: 'A splint that blocks the metacarpophalangeal joints prevents finger flexion and causes rapid intrinsic muscle contracture. Ensure full MCP flexion is maintained in every upper extremity splint. [See wrist/hand node](#/node/splint-wrist-hand).',
      },
      {
        heading: '🛑 Do NOT wrap elastic bandage too tightly over a fresh splint',
        body: 'Tight elastic wrap over a fresh plaster splint (which continues to stiffen and contract as it sets) is a common cause of iatrogenic compartment syndrome. Wrap snugly but loosely — the patient should be able to insert a finger. [See splint start node](#/node/splint-start).',
      },
      {
        heading: '🛑 Do NOT send a patient home without written return precautions',
        body: 'Compartment syndrome can develop hours after splinting. Every patient needs written instructions to return immediately for increasing pain despite elevation, numbness/tingling, inability to move fingers/toes, or skin discoloration. [See splint start node](#/node/splint-start).',
      },
    ],
    citations: [],
  },

  'croup-stop': {
    id: 'croup-stop',
    title: 'Croup — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT withhold dexamethasone in mild croup',
        body: 'Dexamethasone reduces return visits by ~50% (NNT = 7) even in mild croup. There is no severity threshold below which steroids should be withheld — all children with croup benefit from a single dose. [See mild treatment node](#/node/croup-mild-tx).',
      },
      {
        heading: '🛑 Do NOT agitate the child with croup',
        body: 'Crying and agitation significantly worsen dynamic subglottic obstruction. Minimize procedures, keep parents at bedside, avoid IV attempts until clinically necessary, and let the child sit in the position of comfort. [See severe treatment node](#/node/croup-severe-tx).',
      },
      {
        heading: '🛑 Do NOT discharge early after epinephrine — observe 2 hours minimum',
        body: 'Nebulized epinephrine has a duration of action of only 1–2 hours. Patients must be observed for a minimum of 2 hours after the last dose to detect rebound stridor before discharge. [See post-epi observation node](#/node/croup-epi-obs).',
      },
      {
        heading: '🛑 Do NOT limit epinephrine to a single dose in severe croup',
        body: 'Repeated doses of nebulized epinephrine can prevent intubation in many patients with severe croup. There is no evidence-based maximum dose limit — clinical response guides repeat dosing. [See repeat epinephrine node](#/node/croup-repeat-epi).',
      },
      {
        heading: '🛑 Do NOT use a standard-size ETT when intubating a croup patient',
        body: 'Subglottic narrowing is the pathological lesion of croup — the standard age-predicted tube will not fit. Use an ETT 0.5–1.0 mm smaller than predicted, and have progressively smaller tubes immediately available. [See respiratory failure node](#/node/croup-failure-tx).',
      },
      {
        heading: '🛑 Do NOT reassure parents that humidified air or cool mist helps',
        body: 'Multiple RCTs have found no benefit from mist therapy or humidified air in croup. Counseling parents to run the shower at home may delay return to care when symptoms are worsening. [See discharge node](#/node/croup-discharge).',
      },
      {
        heading: '🛑 Do NOT anchor on croup when alternative diagnoses are possible',
        body: 'Failure to improve with dexamethasone + epinephrine should trigger consideration of bacterial tracheitis (toxic-appearing, subglottic pseudomembrane), epiglottitis (tripod posture, drooling), or foreign body aspiration (sudden onset without prodrome). [See respiratory failure node](#/node/croup-failure-tx).',
      },
    ],
    citations: [],
  },

  'neonatal-resus-stop': {
    id: 'neonatal-resus-stop',
    title: 'Neonatal Resuscitation — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT delay PPV to suction a meconium-stained non-vigorous infant',
        body: 'Per 2025 NRP guidelines, ventilation is the priority over suctioning in non-vigorous meconium-stained infants. Delaying PPV to perform routine tracheal suctioning worsens acidosis and hypoxia. Suction only if the airway is visibly obstructed. [See meconium node](#/node/nrp-meconium).',
      },
      {
        heading: '🛑 Do NOT start 100% oxygen for term or near-term infants',
        body: 'Hyperoxia is toxic to the neonatal brain and retina. Start PPV at 21% FiO2 for term (≥35 wk) infants and titrate to preductal SpO2 targets — saturations of 60–65% at 1 minute are normal and expected. [See SpO2 targets node](#/node/nrp-spo2-targets).',
      },
      {
        heading: '🛑 Do NOT monitor SpO2 on the left hand or feet',
        body: 'Postductal SpO2 (left hand, feet) is normally 2–3% lower than preductal values in newborns and does not represent cerebral or coronary oxygenation. Always place the pulse oximeter on the right hand or wrist. [See breathing support node](#/node/nrp-breathing-support).',
      },
      {
        heading: '🛑 Do NOT clamp the cord immediately in a vigorous term infant',
        body: 'Delayed cord clamping (30–60 seconds) improves iron stores, hemoglobin, and neurodevelopmental outcomes. Immediate clamping in vigorous infants deprives the neonate of 30–40 mL/kg of placental blood. [See cord management node](#/node/nrp-cord-mgmt).',
      },
      {
        heading: '🛑 Do NOT place infant cord milking in infants <28 weeks',
        body: 'Intact cord milking in very premature infants (<28 weeks) is associated with intraventricular hemorrhage risk. This technique is contraindicated — use delayed cord clamping when feasible. [See cord management node](#/node/nrp-cord-mgmt).',
      },
      {
        heading: '🛑 Do NOT skip PPV corrective steps (MR SOPA) before escalating',
        body: 'Most PPV failure is from a poor mask seal or poor airway position — not from the infant needing chest compressions. Work through Mask adjustment, Reposition, Suction, Open mouth, Pressure increase, and Alternative airway before starting CPR. [See corrective steps node](#/node/nrp-corrective).',
      },
      {
        heading: '🛑 Do NOT give endotracheal epinephrine if IV/IO access is available',
        body: 'ET epinephrine has unpredictable absorption and requires a 10× higher dose. Umbilical venous catheter (UVC) should be established first — it is the preferred access route for all neonatal resuscitation medications. [See UVC node](#/node/nrp-uvc).',
      },
      {
        heading: '🛑 Do NOT allow hyperthermia in a resuscitated neonate',
        body: 'Both hypothermia AND hyperthermia worsen neonatal outcomes. Target normothermia (36.5–37.5°C) strictly. Overheating under the radiant warmer or with excessive blankets is a preventable harm. [See post-resuscitation node](#/node/nrp-postresus).',
      },
    ],
    citations: [],
  },

  'peds-fever-stop': {
    id: 'peds-fever-stop',
    title: 'Pediatric Fever — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT omit LP in neonates 0–21 days with fever',
        body: 'All neonates 0–21 days with fever require a full sepsis workup including lumbar puncture regardless of how well-appearing they seem. Neonatal meningitis can present subtly and is fatal without treatment. [See neonatal labs node](#/node/pf-neo-labs).',
      },
      {
        heading: '🛑 Do NOT miss HSV in a febrile neonate <21 days',
        body: 'Neonatal HSV encephalitis has 70% mortality without acyclovir. Skin vesicles, seizures, CSF pleocytosis, transaminitis, or maternal HSV history mandate acyclovir 20 mg/kg IV q8h while awaiting PCR results. [See HSV workup node](#/node/pf-neo-hsv).',
      },
      {
        heading: '🛑 Do NOT use ceftriaxone in infants 0–7 days old',
        body: 'Ceftriaxone displaces bilirubin from albumin binding sites and can cause bilirubin encephalopathy (kernicterus) in neonates. Use ampicillin + gentamicin in the first week of life. [See neonatal age node](#/node/pf-neo-age).',
      },
      {
        heading: '🛑 Do NOT apply a well-appearing infant "pass" to a febrile neonate',
        body: 'Neonates have limited immune and physiologic reserve — they can appear well and rapidly deteriorate. Well-appearing does not alter the workup or admission decision for infants 0–21 days. [See neonatal screening node](#/node/pf-neo-screen).',
      },
      {
        heading: '🛑 Do NOT anchor on a viral source without completing the age-appropriate workup',
        body: 'A concomitant URI or RSV bronchiolitis does not exclude bacteremia or meningitis in young infants — especially those <60 days. Age-stratified inflammatory markers still guide LP and admission decisions. [See start node](#/node/pf-start).',
      },
      {
        heading: '🛑 Do NOT skip vancomycin in febrile infants 29–60 days with CSF pleocytosis',
        body: 'S. pneumoniae meningitis in this age group increasingly involves penicillin-resistant strains. Add vancomycin to ceftriaxone whenever meningitis is possible, until culture and sensitivity are available. [See toxic infant node](#/node/pf-toxic).',
      },
      {
        heading: '🛑 Do NOT accept a bag urine specimen for culture',
        body: 'Bag specimens have a false-positive rate of 85% for UTI diagnosis. Culture results from bag specimens are uninterpretable. Catheterized or suprapubic aspirate specimens are mandatory for any culture-based diagnosis. [See UTI risk node](#/node/pf-uti-risk).',
      },
    ],
    citations: [],
  },

  'uti-peds-stop': {
    id: 'uti-peds-stop',
    title: 'Pediatric UTI — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT send a bag urine specimen for culture',
        body: 'Bag specimens have a contamination rate so high that culture results are diagnostically meaningless. Any UTI diagnosis that will drive antibiotic therapy requires a catheter or suprapubic aspirate specimen for culture. [See catheter UA node](#/node/uti-ua-cath).',
      },
      {
        heading: '🛑 Do NOT skip UTI screening in uncircumcised febrile males',
        body: 'Uncircumcised males are at 5–20× higher UTI risk than circumcised males. Screen ALL febrile uncircumcised males in the 2–24 month age group regardless of number of risk factors present. [See infant screening node](#/node/uti-infant-screen).',
      },
      {
        heading: '🛑 Do NOT treat a neonatal UTI with oral antibiotics alone',
        body: 'Neonates with UTI have a high rate of concurrent bacteremia. Neonatal UTI requires IV antibiotics: ceftazidime + ampicillin for Pseudomonas and Enterococcus coverage until culture and sensitivity are available. [See neonatal antibiotic node](#/node/uti-neo-abx).',
      },
      {
        heading: '🛑 Do NOT use TMP-SMX empirically for pediatric UTI',
        body: 'E. coli susceptibility to TMP-SMX is only 71% in many regions — empiric use has an unacceptably high treatment failure rate. Use cephalexin or ceftriaxone as empiric first-line until culture-directed therapy is possible. [See ED antibiotic node](#/node/uti-ed-abx).',
      },
      {
        heading: '🛑 Do NOT repeat a urine culture for test of cure in standard UTI',
        body: 'Test-of-cure cultures are not indicated for standard E. coli UTI — they add cost and parental anxiety without clinical benefit. Reserve test-of-cure for Candida UTI or ESBL-producing organisms only. [See neonatal diagnosis node](#/node/uti-neo-dx).',
      },
      {
        heading: '🛑 Do NOT order VCUG after every first febrile UTI',
        body: 'VCUG (voiding cystourethrogram) is indicated after a first febrile UTI only if the renal ultrasound shows abnormalities. Routine VCUG in all first febrile UTI patients is no longer recommended. [See imaging results node](#/node/uti-imaging-results).',
      },
      {
        heading: '🛑 Do NOT routinely prescribe antibiotic prophylaxis post-UTI',
        body: 'Long-term antibiotic prophylaxis after a first febrile UTI is no longer routinely recommended due to lack of benefit and increased antimicrobial resistance. Reserve for recurrent UTI or confirmed high-grade VUR. [See prophylaxis node](#/node/uti-prophylaxis).',
      },
    ],
    citations: [],
  },

};
