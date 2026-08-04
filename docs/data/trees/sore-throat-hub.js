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
export const SORE_THROAT_HUB_NODES = [
    // ============================================================
    // Module 1 — Sick Check (Airway)
    // ============================================================
    {
        id: 'st-start',
        type: 'info',
        module: 1,
        title: 'Severe Sore Throat Hub — Is the Airway Threatened?',
        body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Epiglottitis / supraglottitis** \u2014 rapid airway obstruction; sitting-forward, drooling, muffled voice, stridor. Do NOT lie the patient down or examine the throat aggressively.\n2. **Ludwig angina** \u2014 bilateral submandibular swelling, tongue elevation, floor-of-mouth induration; airway emergency.\n3. **Retropharyngeal / deep-neck abscess** \u2014 neck stiffness, fever, dysphagia; can descend to mediastinitis.\n4. **Peritonsillar abscess** \u2014 unilateral, trismus, uvular deviation, \u201chot potato\u201d voice.\n5. **Non-throat killers presenting as sore throat** \u2014 angioedema, caustic/foreign-body ingestion, post-tonsillectomy bleed, MI/ACS referred pain.\n\n**First 60 seconds \u2014 the airway question:** the sore throat that kills is the one obstructing the airway. Screen for the red flags of impending obstruction BEFORE anything else. [1,2]\n\n**Airway red flags (any of these = airway emergency, get help early):**\n- **Stridor** or noisy breathing\n- **Drooling / cannot handle secretions**\n- **Tripod / sitting-forward, refusing to lie flat**\n- **Muffled \u201chot potato\u201d voice**\n- **Trismus** (cannot open mouth)\n- **Tongue elevation / floor-of-mouth swelling** (Ludwig)\n- **Rapidly progressive neck swelling**, subcutaneous crepitus\n\n**If any airway red flag:** minimal-stimulation approach, sit the patient up, high-flow oxygen, call ENT + anesthesia for a difficult-airway/double-setup EARLY, prepare for an awake fiberoptic approach and a surgical airway backup. Do NOT force a tongue-blade throat exam or lay an epiglottitis patient flat. See [Awake Intubation](#/tree/awake-intubation) and [Cricothyrotomy](#/tree/cricothyrotomy) for the difficult-airway pathways.\n\n**Scan in 30 seconds:** [1]\n- Airway red flags above; work of breathing; SpO2; voice quality\n- Vitals \u2014 fever, tachycardia, sepsis physiology\n- Neck \u2014 swelling (unilateral vs bilateral), crepitus, tender adenopathy, meningismus\n- Mouth (gentle) \u2014 uvular deviation, tonsillar exudate, floor-of-mouth induration, lesions\n- Drooling, trismus, ability to swallow saliva\n\n**The 4 questions that change the differential:** [1,2]\n1. **Any airway red flag (stridor, drooling, tripod, muffled voice, trismus)?** (airway emergency \u2014 ENT/anesthesia now)\n2. **Unilateral throat + trismus + deviated uvula?** (peritonsillar abscess)\n3. **Sudden tongue/lip/throat swelling \u00b1 ACE inhibitor / allergen?** (angioedema)\n4. **Ingestion (caustic, foreign body, button battery) or recent tonsillectomy?** (redirect to that pathway)\n\n---\n\n*Basis:* the airway red-flag list, the minimal-stimulation rule and the 30-second scan in this node are **consensus criteria** compiled from emergency-medicine reviews of the sore throat presentation and oropharyngeal infection [1,10] and a deep neck space infection review [2]. **They are not a validated decision rule.** No prospectively validated instrument exists to predict which sore throat patient will obstruct, so the red flags should be read as findings that mandate early airway expertise \u2014 not as a scored triage tool with a published sensitivity. The direction to involve ENT and anaesthesia before the patient deteriorates reflects reported airway-loss events in observational series rather than trial evidence.',
        citation: [1, 2, 10],
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
        body: 'Airway threats first. Each branch routes to a deep-dive (or an airway plan) and the next action.\n\n---\n\n*Basis:* this is a **routing node** \u2014 each branch label is a recognition pattern, not a treatment recommendation, and the evidence for what to do sits in the destination node and its linked consult. The branch set and the airway-first ordering derive from emergency-medicine reviews of the sore throat presentation and of oropharyngeal and neck-space infection [1,2,10]; the non-emergent branch routes to pharyngitis assessment governed by the IDSA guideline [3]. The ordering is consensus, not a validated triage sequence.',
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
        citation: [1, 2, 3, 10],
        summary: 'Airway threats first (epiglottitis, Ludwig, deep-neck, angioedema), then PTA, then redirect ingestions. Each branch links to its deep-dive or airway plan.',
        safetyLevel: 'critical',
    },
    // -------- Time-critical exclusion branch results --------
    {
        id: 'st-exc-epiglottitis',
        type: 'result',
        module: 2,
        title: 'Epiglottitis / Supraglottitis — Airway Emergency',
        body: '**(No dedicated consult yet \u2014 airway pathways linked below.)** Adult epiglottitis is easy to miss because the throat can look unremarkable; the tip-off is severe odynophagia/dysphagia out of proportion to the visible exam, plus a muffled voice, drooling, and a preference to sit forward. Progression to complete obstruction can be sudden. [4]\n\n**The cardinal rule: minimize stimulation.** Do NOT force a tongue-blade exam, do NOT lay the patient flat, do NOT agitate a child \u2014 any of these can precipitate complete obstruction.\n\n**Next 5 minutes:**\n- **Sit the patient up, high-flow humidified oxygen, keep them calm** (especially children \u2014 let a parent hold them).\n- **Call ENT + anesthesia immediately for a difficult-airway / double-setup** in the OR when feasible \u2014 awake fiberoptic intubation with surgical-airway backup. See [Awake Intubation](#/tree/awake-intubation) and [Cricothyrotomy](#/tree/cricothyrotomy).\n- **Do NOT attempt routine RSI** in a threatened epiglottic airway without the difficult-airway team and a surgical-airway plan ready.\n- IV access (without agitating the patient), monitor.\n- **IV antibiotics** covering H. influenzae, Strep, and Staph: ceftriaxone (\u00b1 vancomycin if MRSA risk); add coverage per local patterns.\n- Consider IV steroids (dexamethasone) for airway edema (adjunct, not a substitute for airway readiness).\n- Lateral soft-tissue neck X-ray (\u201cthumbprint sign\u201d) only if the patient is stable and it will not delay definitive airway management \u2014 do not send an unstable airway to radiology.\n\n\ud83d\uded1 Do NOT examine the throat with a tongue blade or lie the patient flat. \ud83d\uded1 The safest place to secure this airway is a controlled setting (OR) with ENT/anesthesia \u2014 involve them BEFORE the patient crashes.\n\n---\n\n*Basis:* the minimal-stimulation rule, the preference for a controlled/awake airway and the surgical-airway backup requirement derive from peer-reviewed emergency-medicine reviews of adult epiglottitis [12,13] and from a systematic review and meta-analysis of airway management in adult epiglottitis [14]; the StatPearls chapter [4] supplies descriptive and epidemiologic background only. **Evidence quality across this node is low.** There are no randomised trials in epiglottitis \u2014 every recommendation here is derived from observational cohorts, case series and pooled retrospective data, and represents a consensus airway-safety pathway rather than a trial-derived protocol. Antibiotic selection is empiric, class-based coverage of *H. influenzae*, streptococci and staphylococci, with an anti-MRSA agent added by local risk; the agents named are used per FDA-approved labelling [26] and **no trial establishes a preferred regimen.** **Corticosteroids in adult epiglottitis are supported only by observational data and expert opinion [13,14]** \u2014 consistent with the framing above, they are an adjunct and do not alter the need for airway readiness. Lateral neck radiography has limited sensitivity and a normal film does not exclude the diagnosis [13].',
        recommendation: 'Minimal stimulation, sit up, oxygen, keep calm. ENT + anesthesia NOW for a controlled/awake airway with surgical backup. IV antibiotics (ceftriaxone \u00b1 vancomycin) + steroids. Do not force a throat exam or lie the patient flat.',
        confidence: 'definitive',
        citation: [4, 12, 13, 14, 26],
        safetyLevel: 'critical',
    },
    {
        id: 'st-exc-ludwig',
        type: 'result',
        module: 2,
        title: 'Ludwig Angina — Floor-of-Mouth Airway Threat',
        body: '**(No dedicated consult yet \u2014 airway + antibiotic pathway below.)** Ludwig angina is a rapidly spreading bilateral cellulitis of the submandibular/sublingual spaces, usually from a dental source. It elevates and displaces the tongue posteriorly and threatens the airway. [5]\n\n**Recognize:** bilateral submandibular swelling and induration, elevated/protruding tongue, floor-of-mouth swelling, drooling, trismus, \u201chot potato\u201d voice, fever, ill appearance. The airway can obstruct quickly.\n\n**Next 5 minutes:**\n- **Sit the patient up, oxygen, keep calm; call ENT/OMFS + anesthesia early** for a controlled airway (awake fiberoptic; surgical airway backup) \u2014 see [Awake Intubation](#/tree/awake-intubation) and [Cricothyrotomy](#/tree/cricothyrotomy).\n- Do NOT rely on oral intubation \u2014 tongue displacement makes it difficult; plan a difficult airway.\n- **IV broad-spectrum antibiotics** covering oral flora (aerobes + anaerobes): ampicillin-sulbactam or piperacillin-tazobactam; add vancomycin/clindamycin if MRSA risk; high-dose per local guidance.\n- IV steroids (dexamethasone) as an adjunct for edema.\n- **CT neck with contrast** once the airway is secured/stable to define the extent and any drainable collection or descending spread.\n- ENT/OMFS for source control (dental extraction, drainage) and admission.\n\n\ud83d\uded1 The airway is the priority \u2014 secure it in a controlled setting before it is lost. \ud83d\uded1 Do not send an unstable airway to CT.\n\n---\n\n*Basis:* the recognition features, the early-controlled-airway rule, the warning against relying on oral intubation, and the antibiotic classes named in this node derive from an evidence-based emergency-medicine review of Ludwig angina [5] and an emergency-medicine review of neck-space infections [11]; the named parenteral agents are used per FDA-approved labelling [26]. **Evidence quality is low \u2014 the base is entirely observational** (case series and narrative review). **There are no randomised trials of airway strategy, corticosteroid use or antibiotic regimen in Ludwig angina**, and the direction to secure the airway early reflects consensus derived from reported airway-loss events rather than comparative data. Source control and CT timing likewise reflect expert consensus.',
        recommendation: 'Sit up + oxygen + calm; ENT/OMFS + anesthesia early for a controlled/awake airway with surgical backup. IV broad-spectrum antibiotics + steroids. CT neck once stable. Source control and admission.',
        confidence: 'definitive',
        citation: [5, 11, 26],
        safetyLevel: 'critical',
    },
    {
        id: 'st-exc-deepneck',
        type: 'result',
        module: 2,
        title: 'Deep Neck / Retropharyngeal Abscess',
        body: 'Open [Deep Neck Infection](#/tree/deep-neck-infection) for the full imaging, antibiotic, and drainage pathway.\n\n**Retropharyngeal and other deep-neck-space abscesses** present with fever, severe sore throat, odynophagia, neck stiffness/pain, and an ill appearance; retropharyngeal abscess classically causes neck extension posturing and can descend into the mediastinum (mediastinitis) \u2014 a life-threatening complication. [6]\n\n**Next 5 minutes:**\n- Airway assessment first (any red flag \u2192 treat as an airway emergency, ENT + anesthesia).\n- **CT neck with IV contrast** is the key diagnostic test \u2014 localizes the space, differentiates cellulitis/phlegmon from a drainable abscess, and shows mediastinal extension.\n- **IV broad-spectrum antibiotics** covering aerobes + anaerobes (ampicillin-sulbactam or piperacillin-tazobactam; add vancomycin/clindamycin for MRSA/severe).\n- IV fluids, analgesia, blood cultures if septic.\n- **ENT consult** for drainage; watch for descending mediastinitis (chest pain, widened mediastinum, sepsis) \u2192 thoracic surgery.\n- Admit.\n\n\ud83d\uded1 Do not miss descending mediastinitis \u2014 a deep-neck infection with chest pain / sepsis needs chest imaging and surgical involvement. \ud83d\uded1 Secure the airway before CT if there are red flags.\n\n---\n\n*Basis:* CT neck with IV contrast as the diagnostic test of choice, the aerobe-plus-anaerobe empiric antibiotic strategy, and the descending-mediastinitis warning derive from otolaryngology and emergency-medicine reviews of deep neck space infection [2,11,12] and the pharyngitis-mimics review [6]; the named parenteral agents are used per FDA-approved labelling [26]. **Evidence is observational** \u2014 retrospective cohorts, case series and narrative review. **No randomised trial compares imaging strategies, antibiotic regimens or drainage timing in deep neck infection**, and the abscess-versus-phlegmon distinction on CT is imperfect. Full imaging, antibiotic and drainage detail is owned by the linked Deep Neck Infection consult, which is the governing source for this branch.',
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
export const SORE_THROAT_HUB_CITATIONS = [
    { num: 1, text: 'Klein MR. Infections of the Oropharynx. Emerg Med Clin North Am. 2019;37(1):69-80. doi:10.1016/j.emc.2018.09.002. PMID: 30454781. (Replaces a prior entry in this slot \u2014 "Somro A, et al. Acute sore throat: assessment and management in the emergency department. Emerg Med Clin North Am. 2019;37(1):73-85" \u2014 which does not exist: no such author, title or page range in that journal. This is the real same-issue, same-topic article. Scope: oropharyngeal infection recognition; does not cover angioedema, ingestions or disposition rules.)' },
    { num: 2, text: 'Vieira F, Allen SM, Stocks RM, Thompson JW. Deep neck infection. Otolaryngol Clin North Am. 2008;41(3):459-483, vii. doi:10.1016/j.otc.2008.01.002. PMID: 18435993. (Scope: deep neck space anatomy, imaging and drainage. Narrative otolaryngology review; it does not address angioedema, pharyngitis testing or ED discharge criteria \u2014 those claims are sourced separately below.)' },
    { num: 3, text: 'Shulman ST, Bisno AL, Clegg HW, et al. Clinical practice guideline for the diagnosis and management of group A streptococcal pharyngitis: 2012 update by the Infectious Diseases Society of America. Clin Infect Dis. 2012;55(10):1279-1282. doi:10.1093/cid/cis847. PMID: 23091044. (This is the abridged guideline; the full-text version is Clin Infect Dis. 2012;55(10):e86-e102, doi:10.1093/cid/cis629, PMID: 22965026. Source of the GAS testing thresholds and antibiotic regimens referenced from this hub. The 2025 IDSA update (PMID: 41343363) revises risk assessment and clinical scoring ONLY \u2014 treatment recommendations still derive from this 2012 document.)' },
    { num: 4, text: 'Sutton AE, Waseem M. Epiglottitis. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2026 Jan-. NCBI Bookshelf ID: NBK430960. PMID: 28613691. https://www.ncbi.nlm.nih.gov/books/NBK430960/ (Author string corrected \u2014 this chapter was previously cited here as "Guerra AM, Waseem M"; the NLM Bookshelf record lists Sutton AE and Waseem M. Scope: descriptive and epidemiologic background. Non-peer-reviewed point-of-care reference; the airway-management recommendations in this hub are sourced to the peer-reviewed reviews at [13] and [14].)' },
    { num: 5, text: 'Bridwell R, Gottlieb M, Koyfman A, Long B. Diagnosis and management of Ludwig\u2019s angina: An evidence-based review. Am J Emerg Med. 2021;41:1-5. doi:10.1016/j.ajem.2020.12.030. PMID: 33383265.' },
    { num: 6, text: 'Gottlieb M, Long B, Koyfman A. Clinical Mimics: An Emergency Medicine-Focused Review of Streptococcal Pharyngitis Mimics. J Emerg Med. 2018;54(5):619-629. doi:10.1016/j.jemermed.2018.01.031. PMID: 29523424. (Title and page range corrected \u2014 previously cited here as "Clinical Mimics: An Emergency Medicine-Focused Review of Deep Neck Infections. J Emerg Med. 2018;54(5):683-692", which is not a real article; no "Deep Neck Infections" entry exists in the Clinical Mimics series and pages 683-692 of that issue are unrelated papers. The real article does cover the deep neck space and airway mimics of streptococcal pharyngitis, which is the use made of it here.)' },
    { num: 7, text: 'Long BJ, Koyfman A, Gottlieb M. Evaluation and Management of Angioedema in the Emergency Department. West J Emerg Med. 2019;20(4):587-600. doi:10.5811/westjem.2019.5.42650. PMID: 31316698.' },
    { num: 8, text: 'Galioto NJ. Peritonsillar Abscess. Am Fam Physician. 2017;95(8):501-506. PMID: 28409615. (No DOI assigned by the publisher; PMID is the machine identifier.) https://pubmed.ncbi.nlm.nih.gov/28409615/' },
    { num: 9, text: 'Sykes EA, Wu V, Beyea MM, Simpson MTW, Beyea JA. Pharyngitis: Approach to diagnosis and treatment. Can Fam Physician. 2020;66(4):251-257. PMID: 32273409. (No DOI assigned by the publisher; PMID is the machine identifier.) https://pubmed.ncbi.nlm.nih.gov/32273409/' },
    { num: 10, text: 'Cirilli AR. Emergency evaluation and management of the sore throat. Emerg Med Clin North Am. 2013;31(2):501-515. doi:10.1016/j.emc.2013.01.002. PMID: 23601485. (Emergency-medicine review covering the whole sore throat presentation \u2014 the hub-scope source for the airway-first structure, the reassessment trigger and the disposition framing.)' },
    { num: 11, text: 'Li RM, Kiemeney M. Infections of the Neck. Emerg Med Clin North Am. 2019;37(1):95-107. doi:10.1016/j.emc.2018.09.003. PMID: 30454783. (Emergency-medicine source for the neck-space branches: Ludwig angina, retropharyngeal and parapharyngeal abscess, descending mediastinitis, and admission-level assignment.)' },
    { num: 12, text: 'Akhavan M. Ear, Nose, Throat: Beyond Pharyngitis \u2014 Retropharyngeal Abscess, Peritonsillar Abscess, Epiglottitis, Bacterial Tracheitis, and Postoperative Tonsillectomy. Emerg Med Clin North Am. 2021;39(3):661-675. doi:10.1016/j.emc.2021.04.012. PMID: 34215408. (Scoped to the can\u2019t-miss exclusion branches and the imaging node; it does not source the pharyngitis testing or discharge criteria.)' },
    { num: 13, text: 'Bridwell RE, Koyfman A, Long B. High risk and low prevalence diseases: Adult epiglottitis. Am J Emerg Med. 2022;57:14-20. doi:10.1016/j.ajem.2022.04.018. PMID: 35489220. (Peer-reviewed evidence-based source for the adult epiglottitis recognition features, imaging limitations, antibiotic strategy and the low-quality nature of the corticosteroid evidence.)' },
    { num: 14, text: 'Booth AWG, Pungsornruk K, Llewellyn S, Sturgess D, Vidhani K. Airway management of adult epiglottitis: a systematic review and meta-analysis. BJA Open. 2024;9:100250. doi:10.1016/j.bjao.2023.100250. PMID: 38230383. (Highest-quality available evidence on airway strategy in adult epiglottitis; pooled observational data, no randomised trials exist.)' },
    { num: 15, text: 'Centor RM, Witherspoon JM, Dalton HP, Brody CE, Link K. The diagnosis of strep throat in adults in the emergency room. Med Decis Making. 1981;1(3):239-246. doi:10.1177/0272989X8100100304. PMID: 6763125. (Original derivation of the 4-point Centor score: tonsillar exudate, tender anterior cervical adenopathy, absence of cough, history of fever.)' },
    { num: 16, text: 'McIsaac WJ, Kellner JD, Aufricht P, Vanjaka A, Low DE. Empirical validation of guidelines for the management of pharyngitis in children and adults. JAMA. 2004;291(13):1587-1595. doi:10.1001/jama.291.13.1587. PMID: 15069046. (Validation of the modified/McIsaac score, including the age adjustment that this hub refers to as the "age" criterion.)' },
    { num: 17, text: 'Sadeghirad B, Siemieniuk RAC, Brignardello-Petersen R, et al. Corticosteroids for treatment of sore throat: systematic review and meta-analysis of randomised trials. BMJ. 2017;358:j3887. doi:10.1136/bmj.j3887. PMID: 28931508. (Randomised-trial basis for the single corticosteroid dose in acute sore throat.)' },
    { num: 18, text: 'de Cassan S, Thompson MJ, Perera R, Glasziou PP, Del Mar CB, Heneghan CJ, Hayward G. Corticosteroids as standalone or add-on treatment for sore throat. Cochrane Database Syst Rev. 2020;5(5):CD008268. doi:10.1002/14651858.CD008268.pub3. PMID: 32356360.' },
    { num: 19, text: 'Chau JK, Seikaly HR, Harris JR, Villa-Roel C, Brick C, Rowe BH. Corticosteroids in peritonsillar abscess treatment: a blinded placebo-controlled clinical trial. Laryngoscope. 2014;124(1):97-103. doi:10.1002/lary.24283. PMID: 23794382. (Randomised-trial basis for the single corticosteroid dose in peritonsillar abscess specifically.)' },
    { num: 20, text: 'Powell J, Wilson JA. An evidence-based review of peritonsillar abscess. Clin Otolaryngol. 2012;37(2):136-145. doi:10.1111/j.1749-4486.2012.02452.x. PMID: 22321140.' },
    { num: 21, text: 'Ba\u015f M, Greve J, Stelter K, et al. A randomized trial of icatibant in ACE-inhibitor-induced angioedema. N Engl J Med. 2015;372(5):418-425. doi:10.1056/NEJMoa1312524. PMID: 25629740. (Single-centre randomised trial reporting faster symptom resolution with icatibant; see [22] for the conflicting larger trial.)' },
    { num: 22, text: 'Sinert R, Levy P, Bernstein JA, et al. Randomized Trial of Icatibant for Angiotensin-Converting Enzyme Inhibitor-Induced Upper Airway Angioedema. J Allergy Clin Immunol Pract. 2017;5(5):1402-1409.e3. doi:10.1016/j.jaip.2017.03.003. PMID: 28552382. (Larger multicentre randomised trial finding no benefit of icatibant over placebo in ACE-inhibitor-induced upper airway angioedema; directly conflicts with [21].)' },
    { num: 23, text: 'Chovel-Sella A, Ben Tov A, Lahav E, et al. Incidence of rash after amoxicillin treatment in children with infectious mononucleosis. Pediatrics. 2013;131(5):e1424-e1427. doi:10.1542/peds.2012-1575. PMID: 23589810. (Contemporary rash-incidence data for aminopenicillin exposure during EBV infection; reported ~33%, lower than the historically quoted >80%.)' },
    { num: 24, text: 'Toti JMA, Gatti B, Hunjan I, et al. Splenic rupture or infarction associated with Epstein-Barr virus infectious mononucleosis: a systematic literature review. Swiss Med Wkly. 2023;153:40081. doi:10.57187/smw.2023.40081. PMID: 37245117. (Basis for the splenic-rupture precaution and contact-sport restriction advice given at discharge.)' },
    { num: 25, text: 'Litovitz T, Whitaker N, Clark L, White NC, Marsolek M. Emerging battery-ingestion hazard: clinical implications. Pediatrics. 2010;125(6):1168-1177. doi:10.1542/peds.2009-3037. PMID: 20498173. (National Battery Ingestion Hotline case series establishing that oesophageal button-battery impaction can cause severe injury within hours \u2014 the basis for the time-critical framing in the ingestion redirect.)' },
    { num: 26, text: 'FDA-approved prescribing information (DailyMed) for the antimicrobial and corticosteroid agents named in this hub. Ceftriaxone for injection: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=86ec0a92-a552-4a6d-9125-a54f95e43392 | Vancomycin hydrochloride for injection: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b01aaa02-8f1d-4b57-96a5-337503428af1 | Ampicillin and sulbactam for injection: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a67ae347-487d-4751-a841-b321e81db26f | Piperacillin and tazobactam for injection: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4d3f4b69-b0b9-494f-9cda-4537fa420d47 | Amoxicillin and clavulanate potassium: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f10634cb-6505-43f1-9b70-314c58673016 | Clindamycin hydrochloride capsules: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=24595bb3-07ea-4d5f-9bb3-2c2332a1fc62 | Dexamethasone sodium phosphate injection: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2b626a48-c7aa-4443-9164-a08ff069ccd1 (No randomised trial establishes a preferred empiric regimen for epiglottitis, Ludwig angina or deep neck infection; agent selection in this hub is class-based and consensus-driven.)' },
    { num: 27, text: 'FDA-approved prescribing information (DailyMed) for the targeted bradykinin-mediated angioedema agents named in this hub. Firazyr (icatibant acetate) injection: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ed6657ca-ab68-477a-9968-e12dc928b540 | Berinert (human C1-esterase inhibitor): https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8ea0c7fe-da9d-4218-a080-0509e09bedc6 | Cinryze (human C1-esterase inhibitor): https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d53a911f-070d-498a-8a61-baab72b9d0fe | Ruconest (C1 esterase inhibitor, recombinant): https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=66d3fecb-32a4-7781-e053-2a91aa0a83ca (All are labelled for hereditary angioedema. Use in ACE-inhibitor-induced angioedema is off-label \u2014 see [21] and [22].)' },
];
export const SORE_THROAT_HUB_NODE_COUNT = SORE_THROAT_HUB_NODES.length;
export const SORE_THROAT_HUB_MODULE_LABELS = [
    'Sick Check (Airway)',
    'Time-Critical Exclusions',
    'Initial Bundle + Reassess',
    'Imaging',
    'Disposition',
];
