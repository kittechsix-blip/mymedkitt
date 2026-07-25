// MedKitt — Hemoptysis Hub (EM canonical + Pulm/Critical Care cross-list, type: 'hub')
//
// 5-Module skeleton per ~/Desktop/claude-brain/patterns/hub-consult-pattern.md v2:
//   1. Sick Check
//   2. Time-Critical Exclusions (branches -> deep-dive consults)
//   3. Initial Bundle + Reassess
//   4. Imaging / Workup Decision
//   5. Disposition
//
// CROSS-LINK DIRECTIONALITY (R8): hub links INTO splits; splits never link back.
// All outbound #/tree/ targets validated against the repo on 2026-07-25.
export const HEMOPTYSIS_HUB_NODES = [
    // ============================================================
    // Module 1 — Sick Check
    // ============================================================
    {
        id: 'hmp-start',
        type: 'info',
        module: 1,
        title: 'Hemoptysis Hub — How Much Blood, How Fast?',
        body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Massive hemoptysis** \u2014 patients die of asphyxiation, not exsanguination. Airway + bleeding-lung-down are the priorities.\n2. **Is it really from the lungs?** \u2014 exclude pseudohemoptysis (nasopharyngeal / GI source) before committing.\n3. **PE with hemoptysis / pulmonary infarction** \u2014 pleuritic pain + risk factors.\n4. **Active TB / cavitary infection** \u2014 airborne isolate early, protect staff.\n5. **Anticoagulant or coagulopathy** \u2014 an amplifier of any source; reverse if bleeding is life-threatening.\n\n**First question that changes everything \u2014 volume and rate:**\n- **Massive / life-threatening hemoptysis** (variably defined: \u2265100-200 mL in 24 h, any rate causing gas-exchange or hemodynamic compromise, or \u2265 the anatomic dead space \u2248150 mL that can drown the patient). Go straight to [Massive Hemoptysis](#/tree/massive-hemoptysis) \u2014 airway control, isolate the bleeding lung, call IR/thoracics.\n- **Non-massive hemoptysis** (blood-streaked sputum, small volumes, stable gas exchange): work the cause below.\n\n**Scan in 30 seconds:** [1]\n- **Airway & oxygenation** \u2014 SpO2, work of breathing, ability to clear blood. Blood in the airway kills by asphyxiation. Have suction ready.\n- **Volume & rate** \u2014 quantify (tablespoons vs cupfuls), timeframe, ongoing vs stopped.\n- **Hemodynamics** \u2014 tachycardia, hypotension (late), pallor.\n- **Source confirmation** \u2014 frothy/bright-red with cough + alkaline pH suggests pulmonary; coffee-ground/dark with nausea + acidic pH suggests GI; epistaxis/gum bleeding suggests ENT pseudohemoptysis.\n- **Isolation** \u2014 fever + weight loss + night sweats + cough = mask/isolate for TB NOW.\n\n**The 4 questions that change the differential:** [1,2]\n1. **How much and how fast?** (massive vs non-massive triage \u2014 the single most important split)\n2. **On an anticoagulant / antiplatelet, or known bleeding disorder?** (amplifier; may need reversal)\n3. **TB risk (exposure, immunocompromise, travel, incarceration) or known cancer?** (isolate; malignancy is a leading cause)\n4. **Pleuritic chest pain + DVT/PE risk?** (pulmonary embolism with infarction)',
        citation: [1, 2],
        next: 'hmp-exclusions',
        summary: 'Triage by VOLUME and RATE first. Massive hemoptysis kills by asphyxiation, not blood loss \u2014 airway + isolate bleeding lung. Confirm it is truly pulmonary. Isolate for TB early.',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 2 — Time-Critical Exclusions
    // ============================================================
    {
        id: 'hmp-exclusions',
        type: 'question',
        module: 2,
        title: 'Time-Critical Exclusions — Pick the One That Fits',
        body: 'Sort by rate first, then by cause. Each branch routes to a deep-dive and the next action.',
        options: [
            {
                label: 'Massive / life-threatening: large volume, gas-exchange or hemodynamic compromise',
                description: 'Airway + bleeding-lung-down + IR/thoracics \u2014 do not delay',
                next: 'hmp-exc-massive',
                urgency: 'critical',
            },
            {
                label: 'Fever, weight loss, night sweats, cavitary risk, or known/likely TB',
                description: 'Active TB \u2014 airborne isolation NOW, protect staff, notify public health',
                next: 'hmp-exc-tb',
                urgency: 'critical',
            },
            {
                label: 'Pleuritic chest pain + DVT/PE risk (immobility, cancer, prior VTE, surgery)',
                description: 'PE with pulmonary infarction \u2014 CTPA, anticoagulate if no contraindication',
                next: 'hmp-exc-pe',
                urgency: 'critical',
            },
            {
                label: 'On anticoagulant / antiplatelet or known coagulopathy, bleeding brisk',
                description: 'Coagulopathy amplifier \u2014 reverse if life-threatening bleeding',
                next: 'hmp-exc-coag',
                urgency: 'urgent',
            },
            {
                label: 'Productive cough + fever + focal consolidation',
                description: 'Pneumonia / lung abscess / bronchitis \u2014 antibiotics + imaging',
                next: 'hmp-exc-infection',
                urgency: 'urgent',
            },
            {
                label: 'Pink frothy sputum + orthopnea / edema / known heart failure',
                description: 'Cardiac pulmonary edema / mitral disease \u2014 not true hemoptysis mimic',
                next: 'hmp-exc-cardiac',
                urgency: 'urgent',
            },
            {
                label: 'Epistaxis, gum bleeding, hematemesis, or bleeding traced to nose/GI tract',
                description: 'Pseudohemoptysis \u2014 source is NOT the lower airway',
                next: 'hmp-exc-pseudo',
            },
            {
                label: 'None of the above \u2014 non-massive hemoptysis, stable',
                description: 'Initial bundle + structured workup',
                next: 'hmp-rescue',
            },
        ],
        citation: [1, 2, 3],
        summary: 'Rate first (massive?), then cause. Each branch links to its deep-dive + the next action.',
        safetyLevel: 'critical',
    },
    // -------- Time-critical exclusion branch results --------
    {
        id: 'hmp-exc-massive',
        type: 'result',
        module: 2,
        title: 'Massive Hemoptysis — Asphyxiation Kills First',
        body: 'Open [Massive Hemoptysis](#/tree/massive-hemoptysis) for the full airway-control, lung-isolation, and IR/bronchoscopy pathway.\n\n**The core principle: patients drown, they do not exsanguinate.** Priorities are (1) protect gas exchange, (2) localize and isolate the bleeding lung, (3) definitive control. [3]\n\n**Next 5 minutes:**\n- **Position bleeding-lung-DOWN** (lateral decubitus with the known/suspected bleeding side dependent) to protect the good lung \u2014 if the side is known.\n- **Airway:** high-flow O2; prepare for early intubation with a LARGE ETT (\u22658.0) to allow therapeutic bronchoscopy and suctioning. Consider selective mainstem intubation of the non-bleeding lung, or a bronchial blocker / double-lumen tube if skilled help is available.\n- **Aggressive suction** at the bedside continuously.\n- IV \u00d7 2 large-bore, monitor, type and CROSS; activate [Massive Transfusion](#/tree/massive-transfusion) if hemodynamically unstable.\n- **Reverse anticoagulation / correct coagulopathy** \u2014 see [Anticoagulation Reversal](#/tree/anticoag-reversal); give platelets/FFP/PCC as indicated; tranexamic acid (IV or nebulized) is a reasonable adjunct. [6,9]\n- **Call interventional radiology (bronchial artery embolization is definitive for ~90%) and thoracic surgery / pulmonary (rigid bronchoscopy) NOW.**\n- CT angiography of the chest once the airway is secured and the patient is stable enough \u2014 localizes the bleeding vessel for embolization.\n\n\ud83d\uded1 Do NOT lay the patient flat/supine with active bleeding \u2014 blood soils both lungs. \ud83d\uded1 Do NOT delay IR/bronchoscopy for a perfect diagnosis \u2014 control the airway and the vessel.',
        recommendation: 'Bleeding-lung-down, secure the airway early with a large ETT, suction hard, reverse coagulopathy, TXA, and call IR (embolization) + bronchoscopy NOW. CTA to localize once stable.',
        confidence: 'definitive',
        citation: [3, 6, 9],
        safetyLevel: 'critical',
    },
    {
        id: 'hmp-exc-tb',
        type: 'result',
        module: 2,
        title: 'Suspected TB — Isolate Before You Work It Up',
        body: 'Open [Tuberculosis](#/tree/tuberculosis) for the diagnostic + treatment + public-health pathway.\n\n**Hemoptysis with fever, weight loss, night sweats, chronic cough, or TB risk factors (endemic-region origin, HIV/immunocompromise, incarceration, homelessness, known exposure) = active pulmonary TB until excluded.** [4]\n\n**Next 5 minutes:**\n- **Airborne isolation immediately** \u2014 negative-pressure room, N95 for all staff, mask the patient. This protects everyone and is the highest-yield early action.\n- Chest X-ray (upper-lobe infiltrate/cavitation is classic), then CT chest as indicated.\n- Sputum for AFB smear \u00d7 3 and NAAT (rapid molecular test, e.g., Xpert MTB/RIF); mycobacterial culture. [7]\n- HIV test; assess for drug resistance risk. [7]\n- Notify public health / infection control.\n- Treat concurrent bleeding on its own merits (may still be massive \u2014 TB is a leading cause of massive hemoptysis via Rasmussen aneurysm; IR embolization if brisk).\n\n\ud83d\uded1 Do NOT leave a suspected-TB patient in an open ED bay \u2014 isolate first, diagnose second. \ud83d\uded1 A cavitary lesion that bleeds massively (Rasmussen aneurysm) still needs IR embolization regardless of TB status.',
        recommendation: 'Airborne isolate NOW (N95, negative pressure, mask patient). CXR/CT, sputum AFB smear \u00d73 + NAAT + culture, HIV test, notify public health. Treat brisk bleeding as massive.',
        confidence: 'definitive',
        citation: [4, 7],
        safetyLevel: 'critical',
    },
    {
        id: 'hmp-exc-pe',
        type: 'result',
        module: 2,
        title: 'PE with Pulmonary Infarction',
        body: 'Open [Pulmonary Embolism Treatment](#/tree/pe-treatment) for risk stratification, anticoagulation, and thrombolysis pathway.\n\n**Hemoptysis + pleuritic chest pain + VTE risk factors suggests pulmonary embolism with infarction.** Hemoptysis is a recognized (if less common) PE presentation and creates a management tension: PE needs anticoagulation, but the patient is bleeding. [5]\n\n**Next 5 minutes:**\n- Risk-stratify (Wells / PERC as appropriate); if not low-risk, **CT pulmonary angiography** is the test of choice.\n- IV access, monitor, oxygen, ECG (right-heart strain), troponin/BNP if PE confirmed.\n- **Anticoagulation** if PE confirmed AND bleeding is limited to minor hemoptysis \u2014 the infarct bleeding is usually self-limited and does NOT contraindicate anticoagulation.\n- **If hemoptysis is massive/brisk, anticoagulation is relatively contraindicated** \u2014 weigh clot burden vs bleeding; consider IVC filter and involve pulmonary/hematology; treat the bleeding first.\n- Assess for right-heart strain / hemodynamic instability \u2192 the PE consult\u2019s thrombolysis pathway.\n\n\ud83d\uded1 Minor infarct-related hemoptysis does NOT automatically preclude anticoagulating a confirmed PE. \ud83d\uded1 But massive hemoptysis flips the calculus \u2014 do not anticoagulate into a life-threatening pulmonary bleed.',
        recommendation: 'CTPA to confirm. Minor hemoptysis + confirmed PE \u2192 anticoagulate. Massive hemoptysis \u2192 anticoagulation relatively contraindicated; treat bleeding first, consider IVC filter, involve pulm/heme.',
        confidence: 'recommended',
        citation: [5],
        safetyLevel: 'warning',
    },
    {
        id: 'hmp-exc-coag',
        type: 'result',
        module: 2,
        title: 'Coagulopathy / Anticoagulant Amplifier',
        body: 'Anticoagulants, antiplatelets, and coagulopathy do not usually CAUSE hemoptysis alone \u2014 but they turn a small lesion into a dangerous bleed. Find the underlying source AND correct the coagulopathy if bleeding is significant. [1]\n\n**Next 5 minutes:**\n- Send CBC, PT/INR, aPTT, fibrinogen, type and screen; renal/hepatic function.\n- **If bleeding is life-threatening, reverse:** open [Anticoagulation Reversal](#/tree/anticoag-reversal). Warfarin \u2192 4-factor PCC + vitamin K; DOAC \u2192 andexanet (Xa inhibitors) or idarucizumab (dabigatran); heparin \u2192 protamine. Platelets for antiplatelet-associated bleeding or thrombocytopenia. FFP/cryoprecipitate for factor/fibrinogen deficits. [8]\n- **Tranexamic acid** (IV or nebulized) is a reasonable adjunct for pulmonary hemorrhage. [9]\n- Do NOT reverse reflexively for minor blood-streaking \u2014 weigh thrombotic risk (mechanical valve, recent VTE/PE, stent). Reverse when the bleed is life-threatening.\n- Still pursue the source: imaging, bronchoscopy, malignancy/TB/infection workup \u2014 the amplifier is not the diagnosis.\n\n\ud83d\uded1 Reversal is for LIFE-THREATENING bleeding, not blood-tinged sputum. \ud83d\uded1 An anticoagulated patient with hemoptysis still needs a source workup \u2014 do not stop at \u201cit\u2019s the blood thinner.\u201d',
        recommendation: 'Send coags + type/screen. Reverse (PCC/vitamin K, andexanet/idarucizumab, protamine, platelets) ONLY for life-threatening bleeding; TXA adjunct. Weigh thrombotic risk. Still work the source.',
        confidence: 'recommended',
        citation: [1, 8, 9],
        safetyLevel: 'warning',
    },
    {
        id: 'hmp-exc-infection',
        type: 'result',
        module: 2,
        title: 'Infectious Cause — Pneumonia / Bronchitis / Abscess',
        body: 'Acute bronchitis is the single most common cause of mild hemoptysis; pneumonia, lung abscess, and necrotizing infection cause larger volumes. [1,2]\n\n**Open [Pneumonia](#/tree/pneumonia)** for the CURB-65/severity, antibiotic, and disposition pathway when consolidation is present.\n\n**Recognize:**\n- **Acute bronchitis** \u2014 blood-streaked sputum with a viral/post-viral cough, no consolidation, otherwise well. Usually self-limited; reassurance + follow-up.\n- **Bacterial pneumonia** \u2014 fever, focal crackles, consolidation on imaging \u2192 antibiotics per severity.\n- **Lung abscess / necrotizing pneumonia** \u2014 indolent, foul sputum, cavity on CT; prolonged antibiotics, drainage if needed.\n- **Fungal (aspergilloma in an old cavity)** \u2014 can bleed massively; CT, pulmonary consult, IR if brisk.\n- **Bronchiectasis exacerbation** \u2014 chronic productive cough with recurrent hemoptysis.\n\n**Next 5 minutes:**\n- CBC, CMP, CRP, blood cultures if febrile/septic, sputum Gram stain + culture.\n- Chest X-ray; CT chest if abscess/cavity/mass suspected or bleeding recurrent.\n- Antibiotics targeted to the syndrome and severity.\n- Screen for TB risk in parallel \u2014 isolate if any concern.\n\n\ud83d\uded1 Do NOT assume \u201cjust bronchitis\u201d in a smoker \u226540, with weight loss, or with recurrent hemoptysis \u2014 image and arrange follow-up to exclude malignancy.',
        recommendation: 'Match to the syndrome: bronchitis (supportive), pneumonia (antibiotics per severity), abscess/cavity (CT + prolonged abx \u00b1 drainage). Screen TB. Image + follow up if smoker/weight loss/recurrent.',
        confidence: 'recommended',
        citation: [1, 2],
        safetyLevel: 'warning',
    },
    {
        id: 'hmp-exc-cardiac',
        type: 'result',
        module: 2,
        title: 'Cardiac Cause — Pulmonary Edema / Mitral Disease',
        body: 'Pink, frothy sputum with orthopnea, PND, and edema is usually cardiogenic pulmonary edema rather than true bronchial-artery hemoptysis; mitral stenosis and severe heart failure can cause frank hemoptysis from pulmonary venous hypertension. [1]\n\n**Open [CHF Exacerbation](#/tree/chf-exacerbation)** for the diuresis / afterload-reduction / disposition pathway when heart failure is the driver.\n\n**Recognize:**\n- **Acute pulmonary edema** \u2014 pink frothy secretions, bilateral crackles, hypoxia, elevated BNP; treat the failure (oxygen/NIV, nitrates, diuresis), not the \u201cbleeding.\u201d\n- **Mitral stenosis** \u2014 hemoptysis from ruptured bronchial-pulmonary venous anastomoses; diastolic murmur, atrial fibrillation, echocardiography.\n- **Left atrial / pulmonary venous hypertension** of any cause.\n\n**Next 5 minutes:**\n- ECG, chest X-ray, BNP, troponin, echo as available.\n- Treat the underlying cardiac process (see CHF consult); manage hypoxia with oxygen/NIV.\n- Do not chase a \u201cbronchial source\u201d workup when the picture is clearly cardiogenic edema \u2014 but keep true hemoptysis on the differential if bleeding is frank or recurrent.\n\n\ud83d\uded1 Frothy pink edema fluid is not the same as bronchial hemorrhage \u2014 treat the pump. \ud83d\uded1 New AF + hemoptysis + diastolic murmur \u2192 think mitral stenosis, get an echo.',
        recommendation: 'Treat the cardiac cause (CHF consult: oxygen/NIV, nitrates, diuresis). Get ECG, CXR, BNP, echo. Consider mitral stenosis with AF + diastolic murmur. Keep true hemoptysis on the differential if frank/recurrent.',
        confidence: 'recommended',
        citation: [1],
        safetyLevel: 'warning',
    },
    {
        id: 'hmp-exc-pseudo',
        type: 'result',
        module: 2,
        title: 'Pseudohemoptysis — Source Is Not the Lower Airway',
        body: 'Before committing to a pulmonary workup, confirm the blood actually comes from the lungs. Misattributed nasopharyngeal or gastrointestinal bleeding (pseudohemoptysis) sends patients down the wrong pathway. [1]\n\n**Distinguish the source:**\n- **Pulmonary (true hemoptysis)** \u2014 bright red, frothy, mixed with sputum, alkaline pH, preceded by coughing/gurgling, often a history of lung disease.\n- **Upper airway / ENT** \u2014 epistaxis, gum/dental bleeding, oropharyngeal lesion; blood drips posteriorly and is coughed up. Examine the nose and mouth; consider [Angioedema](#/tree/angioedema) or [Epistaxis](#/tree/epistaxis). Control the local source.\n- **Gastrointestinal (hematemesis)** \u2014 dark/coffee-ground, mixed with food, acidic pH, preceded by nausea/vomiting, history of ulcer/varices/alcohol. If this is really a GI bleed, redirect to the GI pathway ([Upper GI Bleed](#/tree/upper-gi-bleed)).\n\n**Next 5 minutes:**\n- Direct exam of nose/oropharynx; look for an ENT source you can control at the bedside.\n- If GI source suspected, pivot to the GI-bleed workup (NG lavage is unreliable; endoscopy is definitive).\n- Only after excluding pseudohemoptysis, commit to the pulmonary workup below.\n\n\ud83d\uded1 A missed GI bleed dressed as \u201chemoptysis\u201d delays endoscopy and transfusion \u2014 always ask \u201cvomited or coughed?\u201d and check the pH/color.',
        recommendation: 'Confirm the blood is pulmonary (bright, frothy, alkaline, coughed) before working it up as hemoptysis. Examine nose/mouth for an ENT source; redirect to the GI-bleed pathway if hematemesis.',
        confidence: 'recommended',
        citation: [1],
    },
    // ============================================================
    // Module 3 — Initial Bundle + Reassess
    // ============================================================
    {
        id: 'hmp-rescue',
        type: 'info',
        module: 3,
        title: 'Initial Bundle — Non-Massive Hemoptysis',
        body: 'No life-threat hit, bleeding is small-volume and stable. Standard ED bundle while you work up the cause: [1,2]\n\n**THE BUNDLE:**\n- **IV access, monitor, continuous SpO2, supplemental O2** to keep saturations up.\n- **Quantify and track** the volume/rate of bleeding \u2014 escalate immediately if it becomes massive (position bleeding-side-down, secure airway).\n- **Focused labs:** CBC (anemia, platelets), CMP, PT/INR + aPTT (coagulopathy), type and screen, D-dimer only if PE is being risk-stratified, sputum studies (Gram stain, AFB, culture, cytology) as indicated.\n- **Chest X-ray** on everyone; **CT chest** (with contrast / CTPA depending on suspicion) for anything beyond simple bronchitis, for smokers \u226540, weight loss, recurrent bleeding, or a mass.\n- **ECG** if any cardiac or PE concern.\n- **Isolate for TB** the moment risk factors appear.\n- **Cough suppression** (e.g., an antitussive) can reduce mechanical trauma from repetitive coughing in mild cases.\n- **Reverse/hold anticoagulation** only if bleeding is significant and thrombotic risk allows.\n\n**Reassess:** stable and self-limited with a benign X-ray vs recurrent/larger bleeding needing CT + bronchoscopy/pulmonary consult.',
        citation: [1, 2],
        next: 'hmp-rescue-reassess',
        summary: 'IV + O2 + quantify bleeding + CBC/coags/type-screen + CXR (CT chest if beyond bronchitis) + ECG. Isolate for TB on any risk. Escalate instantly if bleeding turns massive.',
        safetyLevel: 'warning',
    },
    {
        id: 'hmp-rescue-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess — Rate and Workup',
        body: 'Re-examine: is the bleeding continuing, what does the imaging show, is a source identified?',
        options: [
            {
                label: 'Bleeding stopped, benign CXR, low-risk patient, cause explained (e.g., bronchitis)',
                description: 'Discharge pathway with follow-up',
                next: 'hmp-dispo-discharge',
            },
            {
                label: 'Recurrent / moderate bleeding or abnormal imaging needing CT + bronchoscopy',
                description: 'Admit or observe for workup and monitoring',
                next: 'hmp-imaging',
                urgency: 'urgent',
            },
            {
                label: 'Bleeding escalating to massive / airway compromise / instability',
                description: 'STOP \u2014 return to time-critical exclusions; airway + IR now',
                next: 'hmp-exclusions',
                urgency: 'critical',
            },
            {
                label: 'Specific diagnosis confirmed (PE, TB, pneumonia, cancer)',
                description: 'Leave the hub \u2014 work the deep-dive consult for that diagnosis',
                next: 'hmp-dispo',
            },
        ],
        citation: [1, 2],
        summary: 'Stopped + benign + low-risk \u2192 discharge. Recurrent/abnormal \u2192 CT + admit/observe. Escalating \u2192 STOP, return to exclusions (airway + IR).',
    },
    // ============================================================
    // Module 4 — Imaging / Workup Decision
    // ============================================================
    {
        id: 'hmp-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging & Workup Decision',
        body: 'The goal is to (1) localize the bleeding, (2) find the cause, (3) risk-stratify for recurrence. [1,2,6]\n\n**Chest X-ray (everyone):** cheap, fast; identifies mass, consolidation, cavity, edema. A normal CXR does NOT exclude a serious cause.\n\n**CT chest \u2014 the key test for anything beyond trivial bronchitis:**\n- **CT chest with contrast / CT angiography** \u2014 localizes bleeding, defines bronchial artery anatomy for embolization, detects malignancy, bronchiectasis, AVM, aspergilloma.\n- **CT pulmonary angiography (CTPA)** \u2014 when PE is suspected. See [PE Treatment](#/tree/pe-treatment).\n- Indications: massive/moderate hemoptysis, recurrent hemoptysis, abnormal CXR, smoker \u226540, weight loss, or planned embolization.\n\n**Bronchoscopy:**\n- Localizes and can treat active bleeding (topical agents, tamponade, cautery); indicated for massive hemoptysis, unclear source, or suspected endobronchial lesion. Rigid bronchoscopy for large-volume bleeding.\n\n**Sputum studies:** AFB smear/culture + NAAT ([Tuberculosis](#/tree/tuberculosis)), Gram stain/culture ([Pneumonia](#/tree/pneumonia)), cytology for malignancy.\n\n**Labs:** CBC, coags, type and screen; renal/urinalysis if pulmonary-renal syndrome (Goodpasture, ANCA vasculitis) suspected (hemoptysis + hematuria + AKI \u2192 send ANCA, anti-GBM, urinalysis).\n\n**When minimal workup suffices:** young, low-risk patient with clear acute bronchitis, small blood-streaking, normal CXR, no red flags \u2014 outpatient follow-up rather than CT.',
        citation: [1, 2, 6],
        next: 'hmp-dispo',
        summary: 'CXR for all; CT chest/CTA for anything beyond bronchitis, recurrent bleeding, smokers \u226540, or planned embolization. CTPA if PE. Bronchoscopy localizes/treats. Send ANCA/anti-GBM if pulmonary-renal picture.',
    },
    // ============================================================
    // Module 5 — Disposition
    // ============================================================
    {
        id: 'hmp-dispo',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Disposition is driven by bleeding volume/rate, the cause, and recurrence risk. Defer to the deep-dive consult once a diagnosis is committed.',
        options: [
            {
                label: 'Discharge \u2014 trivial self-limited bleeding, benign cause, low-risk, reliable',
                description: 'Outpatient workup + strict return precautions',
                next: 'hmp-dispo-discharge',
            },
            {
                label: 'Observe / admit ward \u2014 moderate or recurrent bleeding, workup pending',
                description: 'Monitored bed for serial assessment + CT/bronchoscopy',
                next: 'hmp-dispo-observe',
                urgency: 'urgent',
            },
            {
                label: 'ICU / admit \u2014 massive or ongoing bleeding, airway risk, instability',
                description: 'ICU with IR/thoracics available; per deep-dive criteria',
                next: 'hmp-dispo-admit',
                urgency: 'critical',
            },
        ],
        citation: [1, 2],
        summary: 'Discharge trivial/benign/low-risk; observe or admit moderate/recurrent; ICU for massive/ongoing bleeding or airway risk.',
    },
    {
        id: 'hmp-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge — Trivial Self-Limited Hemoptysis',
        body: 'Safe discharge criteria: [1,2]\n\n1. **Small volume, now stopped** (blood-streaked sputum, not frank blood; no ongoing bleeding).\n2. **Benign, explained cause** \u2014 e.g., acute bronchitis or an upper-airway source that has been controlled.\n3. **Normal or reassuring CXR**, normal vitals, no hypoxia, no anemia on CBC.\n4. **Low malignancy/TB risk** \u2014 non-smoker or smoker <40 without weight loss, no TB risk, no recurrent bleeding.\n5. **No coagulopathy** driving the bleed (or it has been addressed).\n6. **Reliable follow-up** arranged \u2014 primary care / pulmonary within days, and outpatient CT if any risk features.\n\n**Written return precautions:**\n- Any increase in blood volume, coughing up more than streaks, or frank blood \u2014 return / call 911\n- Shortness of breath, chest pain, fever, light-headedness, worsening cough\n- Recurrent episodes\n\n**Counseling:** smoking cessation; complete the outpatient workup even if bleeding stops (malignancy can present with a single small bleed and a normal X-ray).\n\n**Do NOT discharge if:** smoker \u226540, weight loss, recurrent hemoptysis, abnormal imaging, hypoxia, anemia, anticoagulated with ongoing bleeding, TB risk, or unreliable follow-up.',
        recommendation: 'Discharge only if bleeding trivial and stopped, cause benign and explained, CXR/CBC reassuring, low TB/cancer risk, follow-up arranged. Strong return precautions; complete outpatient CT if any risk feature.',
        confidence: 'definitive',
        citation: [1, 2],
    },
    {
        id: 'hmp-dispo-observe',
        type: 'result',
        module: 5,
        title: 'Observe / Admit Ward — Moderate or Recurrent',
        body: 'Monitored inpatient bed appropriate when: [1,6]\n\n- Moderate-volume or recurrent hemoptysis that has settled but could recur\n- Abnormal imaging requiring CT chest and/or bronchoscopy\n- Pneumonia/abscess needing IV antibiotics\n- Anticoagulated patient with ongoing minor bleeding needing observation and possible reversal decisions\n- PE confirmed with hemoptysis requiring careful anticoagulation monitoring\n- Anemia requiring transfusion or serial hemoglobins\n\n**Inpatient protocol:**\n- Continuous monitoring, suction available, blood typed and available\n- Serial hemoglobin, quantify ongoing bleeding\n- Complete CT chest \u00b1 bronchoscopy; pulmonary consult\n- Treat the identified cause (antibiotics, TB regimen with isolation, anticoagulation for PE)\n- Keep IR/thoracic surgery aware if there is any risk of escalation\n\n**Escalate to ICU** if bleeding becomes massive, gas exchange deteriorates, or hemodynamics destabilize \u2014 position bleeding-side-down and secure the airway.',
        recommendation: 'Monitored ward bed with suction/typed blood, serial hemoglobin, CT \u00b1 bronchoscopy, pulmonary consult, and cause-directed treatment. Escalate to ICU if bleeding turns massive.',
        confidence: 'recommended',
        citation: [1, 6],
    },
    {
        id: 'hmp-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit ICU — Massive or Ongoing Bleeding',
        body: 'ICU admission for: [3,6]\n\n- **Massive / life-threatening hemoptysis** (per [Massive Hemoptysis](#/tree/massive-hemoptysis)) \u2014 actual or impending airway compromise, large volume, or hemodynamic instability\n- **Ongoing active bleeding** requiring airway protection, transfusion, or urgent IR embolization / bronchoscopy\n- **Post-embolization or post-bronchoscopy** monitoring after intervention\n- **Respiratory failure** from blood soiling the airways\n\n**ICU/procedural priorities:**\n- Definitive airway (large ETT; selective intubation / bronchial blocker if needed), aggressive suction, bleeding-lung-down positioning\n- IR for bronchial artery embolization (definitive in ~90%); thoracic surgery backup for embolization failure or a surgically resectable source\n- Correct coagulopathy, transfuse ([Massive Transfusion](#/tree/massive-transfusion) if unstable), TXA [9]\n- Treat the underlying cause once stabilized (TB regimen + isolation, antibiotics, anticoagulation decisions for PE)\n\n**Service selection:** ICU with pulmonary / interventional radiology / thoracic surgery co-management. TB \u2192 airborne-isolation negative-pressure ICU bed + public-health notification.\n\n**Handoff content:** volume/rate and trend, side of bleeding if known, airway status and ETT size, interventions done (embolization, bronchoscopy), coagulation status and reversal given, transfusion given, presumed cause, isolation status.',
        recommendation: 'ICU with pulmonary + IR + thoracic surgery. Secure airway, isolate the bleeding lung, embolize (IR), correct coagulopathy, transfuse. Airborne isolation if TB. Definitive treatment of the source once stabilized.',
        confidence: 'definitive',
        citation: [3, 6, 9],
        safetyLevel: 'critical',
    },
];
export const HEMOPTYSIS_HUB_CRITICAL_ACTIONS = [
    { text: 'Triage by volume/rate FIRST \u2014 massive hemoptysis kills by asphyxiation; position bleeding-lung-down, secure airway, call IR.', nodeId: 'hmp-exc-massive' },
    { text: 'Fever/weight loss/night sweats or TB risk \u2014 airborne isolate immediately (N95, negative pressure, mask patient) before workup.', nodeId: 'hmp-exc-tb' },
    { text: 'Hemoptysis + pleuritic pain + VTE risk = PE; CTPA. Minor bleeding still allows anticoagulation; massive bleeding does not.', nodeId: 'hmp-exc-pe' },
    { text: 'Reverse anticoagulation/coagulopathy only for LIFE-THREATENING bleeding; TXA adjunct. Still work the underlying source.', nodeId: 'hmp-exc-coag' },
    { text: 'Confirm the blood is truly pulmonary (bright, frothy, alkaline, coughed) \u2014 exclude nasopharyngeal and GI pseudohemoptysis.', nodeId: 'hmp-exc-pseudo' },
    { text: 'Initial bundle: IV + O2 + quantify bleeding + CBC/coags/type-screen + CXR (CT chest if beyond bronchitis) + ECG.', nodeId: 'hmp-rescue' },
    { text: 'Bleeding escalating to massive or airway compromise = STOP, return to exclusions, airway + IR now.', nodeId: 'hmp-rescue-reassess' },
    { text: 'CT chest/CTA for anything beyond bronchitis, recurrent bleeding, or smokers \u226540; bronchoscopy localizes and treats.', nodeId: 'hmp-imaging' },
    { text: 'Discharge only trivial, stopped, benign, low-risk bleeding with follow-up; complete outpatient CT if any risk feature.', nodeId: 'hmp-dispo-discharge' },
    { text: 'Massive/ongoing bleeding = ICU with pulmonary + IR (embolization) + thoracic surgery; airborne isolation if TB.', nodeId: 'hmp-dispo-admit' },
];
export const HEMOPTYSIS_HUB_CITATIONS = [
    { num: 1, text: 'Earwood JS, Thompson TD. Hemoptysis: evaluation and management. Am Fam Physician. 2015;91(4):243-249.' },
    { num: 2, text: 'Ittrich H, Bockhorn M, Klose H, Simon M. The diagnosis and treatment of hemoptysis. Dtsch Arztebl Int. 2017;114(21):371-381.' },
    { num: 3, text: 'Radchenko C, Alraiyes AH, Shojaee S. A systematic approach to the management of massive hemoptysis. J Thorac Dis. 2017;9(Suppl 10):S1069-S1086.' },
    { num: 4, text: 'Nahid P, Dorman SE, Alipanah N, et al. Official ATS/CDC/IDSA Clinical Practice Guidelines: Treatment of Drug-Susceptible Tuberculosis. Clin Infect Dis. 2016;63(7):e147-e195.' },
    { num: 5, text: 'Konstantinides SV, Meyer G, Becattini C, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism. Eur Heart J. 2020;41(4):543-603.' },
    { num: 6, text: 'Davidson K, Shojaee S. Managing Massive Hemoptysis. Chest. 2020;157(1):77-88.' },
    { num: 7, text: 'Lewinsohn DM, Leonard MK, LoBue PA, et al. Official ATS/IDSA/CDC Clinical Practice Guidelines: Diagnosis of Tuberculosis in Adults and Children. Clin Infect Dis. 2017;64(2):e1-e33.' },
    { num: 8, text: 'Tomaselli GF, Mahaffey KW, Cuker A, et al. 2020 ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants. J Am Coll Cardiol. 2020;76(5):594-622.' },
    { num: 9, text: 'Wand O, Guber E, Guber A, et al. Inhaled Tranexamic Acid for Hemoptysis Treatment: A Randomized Controlled Trial. Chest. 2018;154(6):1379-1384.' },
];
export const HEMOPTYSIS_HUB_NODE_COUNT = HEMOPTYSIS_HUB_NODES.length;
export const HEMOPTYSIS_HUB_MODULE_LABELS = [
    'Sick Check',
    'Time-Critical Exclusions',
    'Initial Bundle + Reassess',
    'Imaging & Workup',
    'Disposition',
];
