// MedKitt — Severe Sore Throat / Odynophagia Hub (EM canonical, type: 'hub')
//
// 5-Module skeleton per ~/Desktop/claude-brain/patterns/hub-consult-pattern.md v2:
//   1. Sick Check (airway)
//   2. Time-Critical Exclusions (branches -> deep-dive consults)
//   3. Initial Bundle + Reassess
//   4. Imaging Decision
//   5. Disposition
//
// CROSS-LINK DIRECTIONALITY (R8): hub links INTO splits; splits never link back.
// All outbound #/tree/ targets validated against the repo on 2026-07-12.
// GAPS (no consult yet, listed as plain text): epiglottitis, Ludwig angina, retropharyngeal abscess.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const SORE_THROAT_HUB_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Sick Check (Airway)
  // ============================================================
  {
    id: 'st-start',
    type: 'info',
    module: 1,
    title: 'Severe Sore Throat Hub — Is the Airway Threatened?',
    body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Epiglottitis / supraglottitis** \u2014 rapid airway obstruction; sitting-forward, drooling, muffled voice, stridor. Do NOT lie the patient down or examine the throat aggressively.\n2. **Ludwig angina** \u2014 bilateral submandibular swelling, tongue elevation, floor-of-mouth induration; airway emergency.\n3. **Retropharyngeal / deep-neck abscess** \u2014 neck stiffness, fever, dysphagia; can descend to mediastinitis.\n4. **Peritonsillar abscess** \u2014 unilateral, trismus, uvular deviation, \u201chot potato\u201d voice.\n5. **Non-throat killers presenting as sore throat** \u2014 angioedema, caustic/foreign-body ingestion, post-tonsillectomy bleed, MI/ACS referred pain.\n\n**First 60 seconds \u2014 the airway question:** the sore throat that kills is the one obstructing the airway. Screen for the red flags of impending obstruction BEFORE anything else. [1,2]\n\n**Airway red flags (any of these = airway emergency, get help early):**\n- **Stridor** or noisy breathing\n- **Drooling / cannot handle secretions**\n- **Tripod / sitting-forward, refusing to lie flat**\n- **Muffled \u201chot potato\u201d voice**\n- **Trismus** (cannot open mouth)\n- **Tongue elevation / floor-of-mouth swelling** (Ludwig)\n- **Rapidly progressive neck swelling**, subcutaneous crepitus\n\n**If any airway red flag:** minimal-stimulation approach, sit the patient up, high-flow oxygen, call ENT + anesthesia for a difficult-airway/double-setup EARLY, prepare for an awake fiberoptic approach and a surgical airway backup. Do NOT force a tongue-blade throat exam or lay an epiglottitis patient flat. See [Awake Intubation](#/tree/awake-intubation) and [Cricothyrotomy](#/tree/cricothyrotomy) for the difficult-airway pathways.\n\n**Scan in 30 seconds:** [1]\n- Airway red flags above; work of breathing; SpO2; voice quality\n- Vitals \u2014 fever, tachycardia, sepsis physiology\n- Neck \u2014 swelling (unilateral vs bilateral), crepitus, tender adenopathy, meningismus\n- Mouth (gentle) \u2014 uvular deviation, tonsillar exudate, floor-of-mouth induration, lesions\n- Drooling, trismus, ability to swallow saliva\n\n**The 4 questions that change the differential:** [1,2]\n1. **Any airway red flag (stridor, drooling, tripod, muffled voice, trismus)?** (airway emergency \u2014 ENT/anesthesia now)\n2. **Unilateral throat + trismus + deviated uvula?** (peritonsillar abscess)\n3. **Sudden tongue/lip/throat swelling \u00b1 ACE inhibitor / allergen?** (angioedema)\n4. **Ingestion (caustic, foreign body, button battery) or recent tonsillectomy?** (redirect to that pathway)',
    citation: [1, 2],
    next: 'st-exclusions',
    summary: 'Screen for airway red flags FIRST (stridor, drooling, tripod, muffled voice, trismus, tongue elevation). If present: sit up, minimal stimulation, ENT + anesthesia early, do not force a throat exam or lie the patient flat.',
    safetyLevel: 'critical',
  },

  // ============================================================
  // Module 2 — Time-Critical Exclusions
  // ============================================================
  {
    id: 'st-exclusions',
    type: 'question',
    module: 2,
    title: 'Time-Critical Exclusions — Pick the One That Fits',
    body: 'Airway threats first. Each branch routes to a deep-dive (or an airway plan) and the next action.',
    options: [
      {
        label: 'Stridor, drooling, tripod posture, muffled voice \u2014 impending obstruction',
        description: 'Epiglottitis / supraglottitis \u2014 minimal stimulation, ENT + anesthesia NOW',
        next: 'st-exc-epiglottitis',
        urgency: 'critical',
      },
      {
        label: 'Bilateral submandibular swelling, tongue elevation, floor-of-mouth induration',
        description: 'Ludwig angina \u2014 airway emergency, ENT/OMFS + anesthesia, antibiotics',
        next: 'st-exc-ludwig',
        urgency: 'critical',
      },
      {
        label: 'Fever + neck stiffness / pain + dysphagia, ill-appearing',
        description: 'Deep neck / retropharyngeal abscess \u2014 CT neck, ENT, IV antibiotics',
        next: 'st-exc-deepneck',
        urgency: 'critical',
      },
      {
        label: 'Sudden lip/tongue/throat swelling \u00b1 ACE inhibitor or allergen',
        description: 'Angioedema \u2014 airway watch, treat allergic vs bradykinin-mediated',
        next: 'st-exc-angioedema',
        urgency: 'critical',
      },
      {
        label: 'Unilateral throat pain + trismus + uvular deviation + hot-potato voice',
        description: 'Peritonsillar abscess \u2014 drainage + antibiotics',
        next: 'st-exc-pta',
        urgency: 'urgent',
      },
      {
        label: 'Caustic, foreign body, or button-battery ingestion; or recent tonsillectomy',
        description: 'Redirect to the ingestion / post-tonsillectomy pathway',
        next: 'st-exc-ingestion',
        urgency: 'urgent',
      },
      {
        label: 'None of the above \u2014 sore throat without airway threat, stable',
        description: 'Initial bundle + pharyngitis workup',
        next: 'st-rescue',
      },
    ],
    citation: [1, 2, 3],
    summary: 'Airway threats first (epiglottitis, Ludwig, deep-neck, angioedema), then PTA, then redirect ingestions. Each branch links to its deep-dive or airway plan.',
    safetyLevel: 'critical',
  },

  // -------- Time-critical exclusion branch results --------
  {
    id: 'st-exc-epiglottitis',
    type: 'result',
    module: 2,
    title: 'Epiglottitis / Supraglottitis — Airway Emergency',
    body: '**(No dedicated consult yet \u2014 airway pathways linked below.)** Adult epiglottitis is easy to miss because the throat can look unremarkable; the tip-off is severe odynophagia/dysphagia out of proportion to the visible exam, plus a muffled voice, drooling, and a preference to sit forward. Progression to complete obstruction can be sudden. [4]\n\n**The cardinal rule: minimize stimulation.** Do NOT force a tongue-blade exam, do NOT lay the patient flat, do NOT agitate a child \u2014 any of these can precipitate complete obstruction.\n\n**Next 5 minutes:**\n- **Sit the patient up, high-flow humidified oxygen, keep them calm** (especially children \u2014 let a parent hold them).\n- **Call ENT + anesthesia immediately for a difficult-airway / double-setup** in the OR when feasible \u2014 awake fiberoptic intubation with surgical-airway backup. See [Awake Intubation](#/tree/awake-intubation) and [Cricothyrotomy](#/tree/cricothyrotomy).\n- **Do NOT attempt routine RSI** in a threatened epiglottic airway without the difficult-airway team and a surgical-airway plan ready.\n- IV access (without agitating the patient), monitor.\n- **IV antibiotics** covering H. influenzae, Strep, and Staph: ceftriaxone (\u00b1 vancomycin if MRSA risk); add coverage per local patterns.\n- Consider IV steroids (dexamethasone) for airway edema (adjunct, not a substitute for airway readiness).\n- Lateral soft-tissue neck X-ray (\u201cthumbprint sign\u201d) only if the patient is stable and it will not delay definitive airway management \u2014 do not send an unstable airway to radiology.\n\n\ud83d\uded1 Do NOT examine the throat with a tongue blade or lie the patient flat. \ud83d\uded1 The safest place to secure this airway is a controlled setting (OR) with ENT/anesthesia \u2014 involve them BEFORE the patient crashes.',
    recommendation: 'Minimal stimulation, sit up, oxygen, keep calm. ENT + anesthesia NOW for a controlled/awake airway with surgical backup. IV antibiotics (ceftriaxone \u00b1 vancomycin) + steroids. Do not force a throat exam or lie the patient flat.',
    confidence: 'definitive',
    citation: [4],
    safetyLevel: 'critical',
  },
  {
    id: 'st-exc-ludwig',
    type: 'result',
    module: 2,
    title: 'Ludwig Angina — Floor-of-Mouth Airway Threat',
    body: '**(No dedicated consult yet \u2014 airway + antibiotic pathway below.)** Ludwig angina is a rapidly spreading bilateral cellulitis of the submandibular/sublingual spaces, usually from a dental source. It elevates and displaces the tongue posteriorly and threatens the airway. [5]\n\n**Recognize:** bilateral submandibular swelling and induration, elevated/protruding tongue, floor-of-mouth swelling, drooling, trismus, \u201chot potato\u201d voice, fever, ill appearance. The airway can obstruct quickly.\n\n**Next 5 minutes:**\n- **Sit the patient up, oxygen, keep calm; call ENT/OMFS + anesthesia early** for a controlled airway (awake fiberoptic; surgical airway backup) \u2014 see [Awake Intubation](#/tree/awake-intubation) and [Cricothyrotomy](#/tree/cricothyrotomy).\n- Do NOT rely on oral intubation \u2014 tongue displacement makes it difficult; plan a difficult airway.\n- **IV broad-spectrum antibiotics** covering oral flora (aerobes + anaerobes): ampicillin-sulbactam or piperacillin-tazobactam; add vancomycin/clindamycin if MRSA risk; high-dose per local guidance.\n- IV steroids (dexamethasone) as an adjunct for edema.\n- **CT neck with contrast** once the airway is secured/stable to define the extent and any drainable collection or descending spread.\n- ENT/OMFS for source control (dental extraction, drainage) and admission.\n\n\ud83d\uded1 The airway is the priority \u2014 secure it in a controlled setting before it is lost. \ud83d\uded1 Do not send an unstable airway to CT.',
    recommendation: 'Sit up + oxygen + calm; ENT/OMFS + anesthesia early for a controlled/awake airway with surgical backup. IV broad-spectrum antibiotics + steroids. CT neck once stable. Source control and admission.',
    confidence: 'definitive',
    citation: [5],
    safetyLevel: 'critical',
  },
  {
    id: 'st-exc-deepneck',
    type: 'result',
    module: 2,
    title: 'Deep Neck / Retropharyngeal Abscess',
    body: 'Open [Deep Neck Infection](#/tree/deep-neck-infection) for the full imaging, antibiotic, and drainage pathway.\n\n**Retropharyngeal and other deep-neck-space abscesses** present with fever, severe sore throat, odynophagia, neck stiffness/pain, and an ill appearance; retropharyngeal abscess classically causes neck extension posturing and can descend into the mediastinum (mediastinitis) \u2014 a life-threatening complication. [6]\n\n**Next 5 minutes:**\n- Airway assessment first (any red flag \u2192 treat as an airway emergency, ENT + anesthesia).\n- **CT neck with IV contrast** is the key diagnostic test \u2014 localizes the space, differentiates cellulitis/phlegmon from a drainable abscess, and shows mediastinal extension.\n- **IV broad-spectrum antibiotics** covering aerobes + anaerobes (ampicillin-sulbactam or piperacillin-tazobactam; add vancomycin/clindamycin for MRSA/severe).\n- IV fluids, analgesia, blood cultures if septic.\n- **ENT consult** for drainage; watch for descending mediastinitis (chest pain, widened mediastinum, sepsis) \u2192 thoracic surgery.\n- Admit.\n\n\ud83d\uded1 Do not miss descending mediastinitis \u2014 a deep-neck infection with chest pain / sepsis needs chest imaging and surgical involvement. \ud83d\uded1 Secure the airway before CT if there are red flags.',
    recommendation: 'CT neck with contrast to localize and find drainable collection/mediastinal spread. IV broad-spectrum antibiotics + fluids. ENT for drainage; watch for descending mediastinitis. Airway first if red flags. Admit.',
    confidence: 'definitive',
    citation: [6],
    safetyLevel: 'critical',
  },
  {
    id: 'st-exc-angioedema',
    type: 'result',
    module: 2,
    title: 'Angioedema — Sudden Airway Swelling',
    body: 'Open [Angioedema](#/tree/angioedema) for the allergic vs bradykinin-mediated pathway and airway management.\n\n**Sudden swelling of the lips, tongue, or throat \u2014 especially in a patient on an ACE inhibitor or after an allergen exposure \u2014 can obstruct the airway.** Distinguish histaminergic/allergic angioedema (urticaria, itching, responds to epinephrine/antihistamines/steroids) from bradykinin-mediated angioedema (ACE-inhibitor or hereditary; no urticaria, poor response to standard allergy drugs). [7]\n\n**Next 5 minutes:**\n- **Assess the airway continuously**; tongue/floor-of-mouth or laryngeal involvement = high risk. Early ENT/anesthesia for a difficult airway if progressing ([Awake Intubation](#/tree/awake-intubation)).\n- **Allergic/anaphylactic features (urticaria, wheeze, hypotension):** IM epinephrine, antihistamines, corticosteroids \u2014 see [Anaphylaxis](#/tree/anaphylaxis).\n- **ACE-inhibitor / hereditary angioedema (no urticaria):** stop the ACE inhibitor; standard allergy meds often fail \u2014 consider targeted therapy (C1-esterase inhibitor, icatibant) for HAE; supportive airway management is paramount.\n- Position upright, oxygen, monitor.\n\n\ud83d\uded1 Bradykinin-mediated angioedema does NOT reliably respond to epinephrine/steroids/antihistamines \u2014 do not be falsely reassured; the airway plan is what protects the patient. \ud83d\uded1 Always stop the ACE inhibitor.',
    recommendation: 'Continuous airway assessment with early ENT/anesthesia if progressing. Treat allergic angioedema as anaphylaxis (epinephrine); for ACE-inhibitor/hereditary angioedema stop the drug and use targeted therapy \u2014 standard allergy meds often fail.',
    confidence: 'recommended',
    citation: [7],
    safetyLevel: 'critical',
  },
  {
    id: 'st-exc-pta',
    type: 'result',
    module: 2,
    title: 'Peritonsillar Abscess',
    body: 'Open [Peritonsillar Abscess Drainage](#/tree/pta-drainage) for the drainage technique and management pathway.\n\n**Peritonsillar abscess (quinsy)** is the most common deep infection of the head and neck: unilateral severe sore throat, trismus, a \u201chot potato\u201d/muffled voice, uvular deviation away from the affected side, and a bulging, fluctuant peritonsillar swelling. [8]\n\n**Next 5 minutes:**\n- Assess the airway (usually not critically threatened, but trismus + swelling can compromise it \u2014 escalate if red flags).\n- **Drainage** \u2014 needle aspiration or incision and drainage of the abscess (see the PTA consult); ENT if drainage is difficult, recurrent, or the diagnosis is uncertain.\n- **Antibiotics** covering Strep + oral anaerobes (e.g., amoxicillin-clavulanate, or clindamycin; ampicillin-sulbactam IV if unable to tolerate PO/severe).\n- **Analgesia + IV fluids** (odynophagia limits intake); a single dose of IV/oral corticosteroid (dexamethasone) reduces pain and improves recovery.\n- Point-of-care ultrasound (intraoral) can differentiate abscess from cellulitis and guide drainage; CT if deep extension suspected.\n\n\ud83d\uded1 Cellulitis (no drainable pus) is treated with antibiotics + steroids, not drainage \u2014 ultrasound helps avoid a dry, painful stab. \ud83d\uded1 Trismus severe enough to prevent drainage, or bilateral/atypical findings, warrants ENT and imaging.',
    recommendation: 'Drain the abscess (needle aspiration or I&D; ENT if difficult), antibiotics (Strep + anaerobe cover), analgesia, IV fluids, and a dose of dexamethasone. Ultrasound distinguishes abscess from cellulitis. Escalate airway if red flags.',
    confidence: 'recommended',
    citation: [8],
    safetyLevel: 'warning',
  },
  {
    id: 'st-exc-ingestion',
    type: 'result',
    module: 2,
    title: 'Ingestion / Post-Tonsillectomy — Redirect',
    body: 'Some \u201csore throats\u201d are really an ingestion or a post-procedure complication. Redirect to the correct pathway. [1]\n\n**Choose the matching consult:**\n- **Esophageal food bolus** (sudden dysphagia, drooling, chest/throat fullness after eating): [Esophageal Food Bolus](#/tree/esophageal-food-bolus).\n- **Caustic ingestion** (acid/alkali, drooling, oral burns, odynophagia): [Caustic Ingestion](#/tree/caustic-ingestion) \u2014 do NOT induce vomiting or blindly pass an NG; endoscopy timing matters.\n- **Button battery** (especially a child; drooling, refusal to eat): [Button Battery](#/tree/button-battery) \u2014 a lodged esophageal battery is a time-critical emergency (liquefactive necrosis in hours).\n- **Post-tonsillectomy hemorrhage** (recent tonsillectomy, now bleeding/spitting blood): [Post-Tonsillectomy Bleed](#/tree/post-tonsillectomy-bleed) \u2014 can be catastrophic; airway + ENT + type and cross.\n\n**General measures while redirecting:**\n- Airway assessment first; suction available for bleeding/secretions.\n- IV access, monitor; NPO.\n- Escalate to ENT / GI / surgery per the specific pathway.\n\n\ud83d\uded1 A button battery lodged in the esophagus is an emergency \u2014 do not delay for observation. \ud83d\uded1 A post-tonsillectomy bleed can hide ongoing swallowed blood \u2014 assume it is significant, secure the airway, involve ENT.',
    recommendation: 'Redirect to the specific pathway: esophageal food bolus, caustic ingestion, button battery (time-critical), or post-tonsillectomy bleed. Airway first, IV access, NPO, and the matching specialist.',
    confidence: 'recommended',
    citation: [1],
    safetyLevel: 'warning',
  },

  // ============================================================
  // Module 3 — Initial Bundle + Reassess
  // ============================================================
  {
    id: 'st-rescue',
    type: 'info',
    module: 3,
    title: 'Initial Bundle — Sore Throat Without Airway Threat',
    body: 'No airway red flag and no deep-space infection. Standard ED bundle while you sort viral vs bacterial pharyngitis and provide symptom relief: [3,9]\n\n**THE BUNDLE:**\n- **Re-confirm the airway is safe** (no stridor, drooling, muffled voice, trismus) and the patient can swallow saliva.\n- **Risk-stratify pharyngitis** with the Centor / McIsaac score (fever, tonsillar exudate, tender anterior cervical nodes, absence of cough, age) \u2014 see [Adult Pharyngitis](#/tree/adult-pharyngitis) for testing and antibiotic decisions.\n- **Rapid strep antigen \u00b1 throat culture / molecular test** per score; treat confirmed Group A Strep to prevent complications (rheumatic fever, suppurative spread).\n- **Symptom relief (the highest-yield intervention):** acetaminophen and/or NSAIDs; adequate analgesia and hydration.\n- **A single dose of dexamethasone** improves pain in acute pharyngitis and is reasonable for severe odynophagia (avoid if infection needs source control first / immunocompromise concerns).\n- **IV fluids** if the patient cannot swallow due to pain (dehydration from odynophagia is a common admit reason).\n- **Consider mononucleosis** (posterior cervical nodes, splenomegaly, marked fatigue, exudative tonsillitis in a young adult) \u2014 monospot/EBV serology; avoid amoxicillin (rash); counsel on splenic-rupture precautions.\n- **Consider gonococcal/other STIs** if the history fits ([STI Comprehensive](#/tree/sti-comprehensive)).\n\n**Reassess:** improving and swallowing vs escalating pain/swelling, trismus, or new airway signs \u2192 re-enter exclusions.',
    citation: [3, 9],
    next: 'st-rescue-reassess',
    summary: 'Confirm airway safe; Centor/McIsaac + rapid strep for pharyngitis; analgesia (acetaminophen/NSAID) + a dose of dexamethasone + IV fluids if cannot swallow. Consider mono (avoid amoxicillin). Escalate if new airway signs.',
    safetyLevel: 'warning',
  },
  {
    id: 'st-rescue-reassess',
    type: 'question',
    module: 3,
    title: 'Reassess — Swallowing and Airway',
    body: 'Re-examine: airway status, ability to swallow, pain trend, and whether a specific diagnosis has declared itself.',
    options: [
      {
        label: 'Improving, swallowing saliva/fluids, airway safe, benign cause',
        description: 'Discharge pathway with symptomatic treatment',
        next: 'st-dispo-discharge',
      },
      {
        label: 'Cannot swallow / dehydrated / diagnosis unclear needing imaging',
        description: 'Imaging or observation for hydration + workup',
        next: 'st-imaging',
        urgency: 'urgent',
      },
      {
        label: 'New/worsening airway signs, trismus, or neck swelling',
        description: 'STOP \u2014 return to time-critical exclusions; ENT/anesthesia',
        next: 'st-exclusions',
        urgency: 'critical',
      },
      {
        label: 'Specific diagnosis confirmed (PTA, deep-neck, strep, mono)',
        description: 'Leave the hub \u2014 work the deep-dive / matched pathway',
        next: 'st-dispo',
      },
    ],
    citation: [3, 9],
    summary: 'Improving + swallowing + safe airway \u2192 discharge. Cannot swallow/unclear \u2192 image/observe. New airway signs \u2192 STOP, return to exclusions.',
  },

  // ============================================================
  // Module 4 — Imaging Decision
  // ============================================================
  {
    id: 'st-imaging',
    type: 'info',
    module: 4,
    title: 'Imaging Decision',
    body: 'Most sore throats need no imaging; image when a deep-space infection, airway threat, or complication is suspected. [2,6]\n\n**CT neck with IV contrast \u2014 the workhorse for deep-neck disease:**\n- Suspected retropharyngeal / parapharyngeal / other deep-neck abscess (fever + neck pain/stiffness + dysphagia, ill appearance)\n- Peritonsillar swelling with concern for deeper extension or when drainage/diagnosis is uncertain\n- Suspected Ludwig angina (define extent + drainable collection) \u2014 **after** the airway is secured/stable\n- Concern for descending mediastinitis (add chest imaging)\n- Only send a patient with a threatened airway to CT after that airway is controlled.\n\n**Lateral soft-tissue neck X-ray:**\n- Epiglottitis (\u201cthumbprint\u201d sign) or retropharyngeal widening \u2014 only in a stable patient and only if it will not delay definitive airway management. A normal film does not exclude epiglottitis.\n\n**Point-of-care ultrasound:**\n- Intraoral/transcervical US to distinguish peritonsillar abscess from cellulitis and guide drainage.\n\n**Chest X-ray:**\n- If descending infection / mediastinitis or an aspiration/pulmonary concern.\n\n**Labs alongside imaging:** CBC, CMP, CRP, blood cultures if septic; monospot/EBV, rapid strep as indicated; \u03b2-hCG before certain drugs/imaging in reproductive-age females.\n\n**No imaging needed:** classic viral or streptococcal pharyngitis with a safe airway, able to swallow, no deep-space or airway red flags.',
    citation: [2, 6],
    next: 'st-dispo',
    summary: 'CT neck with contrast for deep-neck abscess/Ludwig (after airway secured); lateral neck X-ray only in a stable patient for epiglottitis/retropharyngeal; US to distinguish PTA from cellulitis; chest imaging if mediastinitis. Simple pharyngitis needs none.',
  },

  // ============================================================
  // Module 5 — Disposition
  // ============================================================
  {
    id: 'st-dispo',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Disposition is driven by airway safety, ability to swallow, and the specific diagnosis. Defer to the deep-dive consult once committed.',
    options: [
      {
        label: 'Discharge \u2014 safe airway, swallowing, benign pharyngitis, reliable',
        description: 'Symptomatic treatment + antibiotics if strep + return precautions',
        next: 'st-dispo-discharge',
      },
      {
        label: 'Observe / admit ward \u2014 cannot swallow, IV abx (PTA/deep-neck), hydration',
        description: 'Monitored bed for IV antibiotics + hydration + reassessment',
        next: 'st-dispo-observe',
        urgency: 'urgent',
      },
      {
        label: 'ICU / airway admit \u2014 epiglottitis, Ludwig, deep-neck with airway risk',
        description: 'Airway-monitored bed with ENT/anesthesia; per deep-dive criteria',
        next: 'st-dispo-admit',
        urgency: 'critical',
      },
    ],
    citation: [1, 2],
    summary: 'Discharge safe-airway benign pharyngitis; observe/admit for cannot-swallow or IV-antibiotic infections; ICU/airway admit for epiglottitis, Ludwig, or airway-threatening deep-neck disease.',
  },
  {
    id: 'st-dispo-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge — Benign Pharyngitis, Safe Airway',
    body: 'Safe discharge criteria: [3,9]\n\n1. **Airway is unequivocally safe** \u2014 no stridor, no drooling, no muffled voice, no trismus, handling secretions.\n2. **Able to swallow** fluids and saliva; adequately hydrated or hydrated in the ED.\n3. **Benign cause** \u2014 viral pharyngitis, streptococcal pharyngitis (treated), or drained/uncomplicated PTA with reliable follow-up per that pathway.\n4. **Pain controlled** on oral analgesia.\n5. **Reliable follow-up** and clear instructions.\n\n**Treatment on discharge:**\n- Symptomatic: acetaminophen/NSAIDs, hydration, salt-water gargles, lozenges; consider the single dexamethasone dose given in the ED.\n- Antibiotics ONLY for confirmed/appropriate Group A Strep (penicillin/amoxicillin; azithromycin or cephalexin if penicillin-allergic) \u2014 see [Adult Pharyngitis](#/tree/adult-pharyngitis). Avoid amoxicillin if mononucleosis is suspected (rash).\n\n**Written return precautions (airway-focused):**\n- Difficulty breathing, noisy breathing/stridor, drooling, or inability to swallow saliva \u2014 call 911\n- Muffled voice, worsening one-sided swelling, inability to open the mouth (trismus)\n- High fever, neck stiffness/swelling, spreading redness, chest pain\n- For suspected mono: left-upper-abdominal pain, avoid contact sports (splenic rupture)\n\n**Do NOT discharge if:** any airway red flag, unable to swallow/dehydrated, undrained deep-space infection, ill/septic appearance, immunocompromised with an unclear picture, or unreliable follow-up.',
    recommendation: 'Discharge only with an unequivocally safe airway, ability to swallow, controlled pain, correct treatment (antibiotics only for confirmed strep), airway-focused return precautions, and reliable follow-up.',
    confidence: 'definitive',
    citation: [9],
  },
  {
    id: 'st-dispo-observe',
    type: 'result',
    module: 5,
    title: 'Observe / Admit Ward — Cannot Swallow or IV Antibiotics',
    body: 'Monitored inpatient/observation bed appropriate when: [6,8]\n\n- **Odynophagia severe enough to prevent oral intake** \u2014 dehydration needing IV fluids and IV analgesia, but airway is safe\n- **Peritonsillar or deep-neck infection** requiring IV antibiotics and reassessment, without a threatened airway\n- **Post-drainage observation** (PTA) when oral intake is not yet adequate\n- **Diagnostic uncertainty** requiring serial reassessment and pending imaging/labs\n- **Comorbidity** (immunocompromise, diabetes, poor social support) with a moderate infection\n\n**Inpatient/obs protocol:**\n- Continuous or frequent airway checks; suction available; keep ENT reachable\n- IV antibiotics, IV fluids, analgesia; trial of oral intake before discharge\n- Repeat imaging or ENT re-evaluation if not improving\n- **Escalate to an airway-monitored setting** immediately if any airway red flag develops\n\n**Discharge from observation** once swallowing/hydration is adequate, infection is controlled or drained, and follow-up is arranged.',
    recommendation: 'Monitored ward/obs bed for cannot-swallow dehydration or IV-antibiotic deep-space infection with a safe airway. IV fluids/antibiotics/analgesia, ENT reachable, trial PO before discharge. Escalate if any airway red flag.',
    confidence: 'recommended',
    citation: [6],
  },
  {
    id: 'st-dispo-admit',
    type: 'result',
    module: 5,
    title: 'Admit — Airway-Threatening Infection',
    body: 'Airway-monitored / ICU admission for: [4,5]\n\n- **Epiglottitis / supraglottitis** with any airway compromise or high risk \u2014 airway-monitored bed, ENT/anesthesia immediately available, plan for controlled airway.\n- **Ludwig angina** \u2014 airway threat, IV antibiotics, ENT/OMFS, source control.\n- **Deep-neck / retropharyngeal abscess** with airway compromise, sepsis, or descending mediastinitis.\n- **Angioedema** with laryngeal/airway involvement requiring observation or airway support.\n- **Post-tonsillectomy hemorrhage** with active/recurrent bleeding \u2014 ENT + airway + transfusion readiness.\n\n**Priorities:**\n- **Secure the airway in a controlled setting** (OR/ICU) with ENT + anesthesia \u2014 awake fiberoptic with surgical-airway backup ([Awake Intubation](#/tree/awake-intubation), [Cricothyrotomy](#/tree/cricothyrotomy)).\n- IV broad-spectrum antibiotics + fluids + steroids as indicated; source control (drainage, dental extraction).\n- Continuous airway monitoring; do not send an unstable airway to imaging.\n\n**Service selection:** ENT (\u00b1 OMFS) primary for deep-space/airway infections; anesthesia for airway management; ICU for a threatened/secured airway or sepsis; thoracic surgery for descending mediastinitis.\n\n**Handoff content:** airway status and plan, red flags present, imaging findings + extent, antibiotics/steroids given (drug + time), drainage performed, ENT/anesthesia involvement, hemodynamic status.',
    recommendation: 'Airway-monitored/ICU admission for epiglottitis, Ludwig, airway-threatening deep-neck infection, laryngeal angioedema, or active post-tonsillectomy bleed. Secure the airway in a controlled setting with ENT + anesthesia; IV antibiotics + source control.',
    confidence: 'definitive',
    citation: [4],
    safetyLevel: 'critical',
  },
];

export const SORE_THROAT_HUB_CRITICAL_ACTIONS = [
  { text: 'Screen for airway red flags FIRST (stridor, drooling, tripod, muffled voice, trismus, tongue elevation). If present: sit up, minimal stimulation, ENT + anesthesia early.', nodeId: 'st-start' },
  { text: 'Epiglottitis: do NOT force a throat exam or lie the patient flat; secure the airway in a controlled setting; IV antibiotics + steroids.', nodeId: 'st-exc-epiglottitis' },
  { text: 'Ludwig angina (bilateral submandibular swelling + tongue elevation) = airway emergency; ENT/OMFS + anesthesia early, IV broad-spectrum antibiotics.', nodeId: 'st-exc-ludwig' },
  { text: 'Fever + neck stiffness + dysphagia = deep-neck/retropharyngeal abscess; CT neck with contrast, IV antibiotics, ENT; watch for descending mediastinitis.', nodeId: 'st-exc-deepneck' },
  { text: 'Sudden lip/tongue/throat swelling: bradykinin-mediated (ACE-i/hereditary) angioedema does NOT respond to epinephrine/steroids \u2014 stop the ACE inhibitor, protect the airway.', nodeId: 'st-exc-angioedema' },
  { text: 'Unilateral throat + trismus + uvular deviation = peritonsillar abscess; drain (US distinguishes abscess from cellulitis) + antibiotics + dexamethasone.', nodeId: 'st-exc-pta' },
  { text: 'Redirect ingestions: esophageal food bolus, caustic ingestion, button battery (time-critical), or post-tonsillectomy bleed.', nodeId: 'st-exc-ingestion' },
  { text: 'Initial bundle: confirm safe airway; Centor/McIsaac + rapid strep; analgesia + dexamethasone + IV fluids if cannot swallow. Consider mono (avoid amoxicillin).', nodeId: 'st-rescue' },
  { text: 'New/worsening airway signs after the bundle = STOP, return to exclusions, ENT/anesthesia.', nodeId: 'st-rescue-reassess' },
  { text: 'Discharge only with an unequivocally safe airway, ability to swallow, correct treatment, and airway-focused return precautions.', nodeId: 'st-dispo-discharge' },
  { text: 'Airway-monitored/ICU admission for epiglottitis, Ludwig, airway-threatening deep-neck infection, laryngeal angioedema, or active post-tonsillectomy bleed.', nodeId: 'st-dispo-admit' },
];

export const SORE_THROAT_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Somro A, Akram M, Ibrahim M, et al. Acute sore throat: assessment and management in the emergency department. Emerg Med Clin North Am. 2019;37(1):73-85.' },
  { num: 2, text: 'Vieira F, Allen SM, Stocks RMS, Thompson JW. Deep neck infection. Otolaryngol Clin North Am. 2008;41(3):459-483.' },
  { num: 3, text: 'Shulman ST, Bisno AL, Clegg HW, et al. Clinical practice guideline for the diagnosis and management of group A streptococcal pharyngitis: 2012 update by the IDSA. Clin Infect Dis. 2012;55(10):1279-1282.' },
  { num: 4, text: 'Guerra AM, Waseem M. Epiglottitis. StatPearls. Treasure Island (FL): StatPearls Publishing; 2023.' },
  { num: 5, text: 'Bridwell R, Gottlieb M, Koyfman A, Long B. Diagnosis and management of Ludwig\u2019s angina: An evidence-based review. Am J Emerg Med. 2021;41:1-5.' },
  { num: 6, text: 'Gottlieb M, Long B, Koyfman A. Clinical Mimics: An Emergency Medicine-Focused Review of Deep Neck Infections. J Emerg Med. 2018;54(5):683-692.' },
  { num: 7, text: 'Long BJ, Koyfman A, Gottlieb M. Evaluation and Management of Angioedema in the Emergency Department. West J Emerg Med. 2019;20(4):587-600.' },
  { num: 8, text: 'Galioto NJ. Peritonsillar Abscess. Am Fam Physician. 2017;95(8):501-506.' },
  { num: 9, text: 'Sykes EA, Wu V, Beyea MM, et al. Pharyngitis: Approach to diagnosis and treatment. Can Fam Physician. 2020;66(4):251-257.' },
];

export const SORE_THROAT_HUB_NODE_COUNT = SORE_THROAT_HUB_NODES.length;
export const SORE_THROAT_HUB_MODULE_LABELS = [
  'Sick Check (Airway)',
  'Time-Critical Exclusions',
  'Initial Bundle + Reassess',
  'Imaging',
  'Disposition',
];
