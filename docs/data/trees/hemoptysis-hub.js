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
        body: '**\u26A0\uFE0F 7 DO NOT MISS:**\n1. **Massive hemoptysis** \u2014 patients die of asphyxiation, not exsanguination. Airway + bleeding-lung-down are the priorities.\n2. **Is it really from the lungs?** \u2014 exclude pseudohemoptysis (nasopharyngeal / GI source) before committing.\n3. **PE with hemoptysis / pulmonary infarction** \u2014 pleuritic pain + risk factors.\n4. **Active TB / cavitary infection** \u2014 airborne isolate early, protect staff.\n5. **Anticoagulant or coagulopathy** \u2014 an amplifier of any source; reverse if bleeding is life-threatening.\n6. **Diffuse alveolar hemorrhage (DAH) / pulmonary-renal syndrome** \u2014 hypoxemia + bilateral infiltrates + an unexplained hemoglobin drop. Up to **one-third of DAH presents with NO hemoptysis at all**, and mortality is 20-50%. [13]\n7. **Tracheostomy or recent tracheal surgery + ANY bleeding = tracheo-innominate fistula until proven otherwise.** A brief self-limited "sentinel" bleed precedes catastrophic hemorrhage in ~44% of cases, and about a third exsanguinate within 24 h. [14]\n\n**First question that changes everything \u2014 volume and rate:**\n- **Massive / life-threatening hemoptysis.** There is no single accepted volume threshold \u2014 published cut-offs span **100-1000 mL/24 h**. Practical triggers, ANY of which counts: [3,6,10]\n  - **\u2265100 mL/HOUR** (rate matters more than the 24-h total \u2014 this is the criterion that should make you move)\n  - **\u2265150 mL in 24 h** (Society of Chest Imaging & Interventions consensus) or the classic **\u2265600 mL/24 h**; \u2265200 mL in a single episode\n  - **ANY volume** producing gas-exchange failure, airway obstruction, or hemodynamic instability \u2014 the "magnitude of effect" definition, which now dominates the literature\n  - Remember the anatomy: the conducting airways hold only **\u2248150-200 mL**, so a "small" bleed can drown a patient with poor reserve.\n  Go straight to [Massive Hemoptysis](#/tree/massive-hemoptysis) \u2014 airway control, isolate the bleeding lung, call IR/thoracics.\n- **Non-massive hemoptysis** (blood-streaked sputum, small volumes, stable gas exchange): work the cause below.\n\n**Scan in 30 seconds:** [1]\n- **Airway & oxygenation** \u2014 SpO2, work of breathing, ability to clear blood. Blood in the airway kills by asphyxiation. Have suction ready.\n- **Volume & rate** \u2014 quantify (tablespoons vs cupfuls), timeframe, ongoing vs stopped.\n- **Hemodynamics** \u2014 tachycardia, hypotension (late), pallor.\n- **Source confirmation** \u2014 frothy/bright-red with cough + alkaline pH suggests pulmonary; coffee-ground/dark with nausea + acidic pH suggests GI; epistaxis/gum bleeding suggests ENT pseudohemoptysis. (The pH/colour rules are traditional bedside heuristics, not validated tests \u2014 use them to raise suspicion, never to rule out. [1])\n- **Isolation** \u2014 fever + weight loss + night sweats + cough = mask/isolate for TB NOW.\n\n**The 4 questions that change the differential:** [1,2]\n1. **How much and how fast?** (massive vs non-massive triage \u2014 the single most important split)\n2. **On an anticoagulant / antiplatelet, or known bleeding disorder?** (amplifier; may need reversal)\n3. **TB risk (exposure, immunocompromise, travel, incarceration) or known cancer?** (isolate; malignancy is a leading cause)\n4. **Pleuritic chest pain + DVT/PE risk?** (pulmonary embolism with infarction)\n\n**Plus two you will only ask if you remember them:** [13,14]\n5. **Does this patient have a tracheostomy or recent tracheal/airway surgery?** (tracheo-innominate fistula)\n6. **Is there hematuria, AKI, or a falling hemoglobin with bilateral infiltrates?** (DAH / pulmonary-renal syndrome)',
        citation: [1, 2, 3, 6, 10, 13, 14],
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
                label: 'Hypoxemia + bilateral infiltrates + falling hemoglobin, \u00b1 hematuria/AKI',
                description: 'Diffuse alveolar hemorrhage / pulmonary-renal syndrome \u2014 treat before serologies return',
                next: 'hmp-exc-dah',
                urgency: 'critical',
            },
            {
                label: 'Epistaxis, gum bleeding, hematemesis, tracheostomy-site bleeding, or bleeding traced to nose/GI tract',
                description: 'Pseudohemoptysis \u2014 source is NOT the lower airway (but tracheostomy bleeding = innominate fistula until excluded)',
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
        body: 'Open [Massive Hemoptysis](#/tree/massive-hemoptysis) for the full airway-control, lung-isolation, and IR/bronchoscopy pathway.\n\n**The core principle: patients drown, they do not exsanguinate.** Priorities are (1) protect gas exchange, (2) localize and isolate the bleeding lung, (3) definitive control. [3]\n\n**Next 5 minutes:**\n- **Position bleeding-lung-DOWN** (lateral decubitus with the known/suspected bleeding side dependent) to protect the good lung \u2014 if the side is known. **If the bleeding side is NOT known, do not guess \u2014 sit the patient UPRIGHT or semi-recumbent** to minimize soiling of both lungs while you localize. [3,6]\n- **Airway:** high-flow O2; prepare for early intubation with a LARGE ETT (\u22658.0) to allow therapeutic bronchoscopy and suctioning. **Size up if you can:** the companion Massive Hemoptysis consult and most critical-care sources call for **\u22658.5 mm ID (9.0 in an average-to-large adult)**, because a therapeutic bronchoscope plus effective suction will not pass a smaller tube. Place the largest tube you can safely put in. [3,6,10] Consider selective mainstem intubation of the non-bleeding lung, or a bronchial blocker / double-lumen tube if skilled help is available (only ~7% of physicians favour a double-lumen tube as the initial move).\n- **Aggressive suction** at the bedside continuously.\n- IV \u00d7 2 large-bore, monitor, type and CROSS; activate [Massive Transfusion](#/tree/massive-transfusion) if hemodynamically unstable.\n- **Reverse anticoagulation / correct coagulopathy** \u2014 see [Anticoagulation Reversal](#/tree/anticoag-reversal); give platelets/FFP/PCC as indicated; tranexamic acid is a reasonable adjunct. Typical regimens: **nebulized TXA 500-1000 mg (commonly 500 mg in 5 mL) q8h**, or **IV TXA 1 g over 10 min** (an IV loading dose followed by infusion is often used). Note the supporting RCT and the 2025 meta-analyses enrolled **non-massive** hemoptysis \u2014 TXA in massive bleeding is an extrapolation and never a substitute for airway control or embolization. [6,9,12]\n- **Call interventional radiology (bronchial artery embolization) and thoracic surgery / pulmonary (rigid bronchoscopy) NOW.** BAE is the definitive first-line control procedure, but be honest about the numbers: **technical success 81-100%, immediate clinical success 70-99%, and recurrent bleeding in 9.8-57.5%** depending on the underlying disease. It buys time and controls most bleeds; it does not cure the cause. [6,10]\n- **Know the BAE complications before you consent the patient:** post-embolization syndrome (chest pain, fever, dysphagia) in **1.7-31%**, and the feared one \u2014 **spinal cord infarction from inadvertent embolization of a spinal artery arising off the bronchial circulation, 0.2-6.5%**. This is why the procedure needs an experienced operator and careful pre-embolization angiography. [10]\n- CT angiography of the chest once the airway is secured and the patient is stable enough \u2014 localizes the bleeding vessel for embolization.\n\n\ud83d\uded1 Do NOT lay the patient flat/supine with active bleeding \u2014 blood soils both lungs. \ud83d\uded1 Do NOT delay IR/bronchoscopy for a perfect diagnosis \u2014 control the airway and the vessel. \ud83d\uded1 Do NOT treat a "successful" embolization as the end of the story \u2014 up to half rebleed, so admit to an ICU-capable bed and keep IR on standby.',
        recommendation: 'Bleeding-lung-down (upright if side unknown), secure the airway early with the largest ETT you can safely place, suction hard, reverse coagulopathy, TXA, and call IR (embolization) + bronchoscopy NOW. CTA to localize once stable. Expect a 10-58% rebleed rate after BAE.',
        confidence: 'definitive',
        citation: [3, 6, 9, 10, 12],
        safetyLevel: 'critical',
    },
    {
        id: 'hmp-exc-tb',
        type: 'result',
        module: 2,
        title: 'Suspected TB — Isolate Before You Work It Up',
        body: 'Open [Tuberculosis](#/tree/tuberculosis) for the diagnostic + treatment + public-health pathway.\n\n**Hemoptysis with fever, weight loss, night sweats, chronic cough, or TB risk factors (endemic-region origin, HIV/immunocompromise, incarceration, homelessness, known exposure) = active pulmonary TB until excluded.** [4]\n\n**Next 5 minutes:**\n- **Airborne isolation immediately** \u2014 negative-pressure room, N95 for all staff, mask the patient. This protects everyone and is the highest-yield early action.\n- Chest X-ray (upper-lobe infiltrate/cavitation is classic), then CT chest as indicated.\n- Sputum for AFB smear \u00d7 3 (**collected at least 8 hours apart, with at least one early-morning specimen**) and NAAT (rapid molecular test, e.g., Xpert MTB/RIF); mycobacterial culture on every specimen. Smear sensitivity is only ~50-80%; NAAT is ~95-98% sensitive in smear-positive but drops to ~60-77% in smear-negative disease \u2014 **a single negative test does not clear the patient out of isolation.** [7]\n- HIV test; assess for drug resistance risk. In advanced HIV (CD4 <200) add **urine LAM**. [7]\n- Notify public health / infection control. **Isolation duration and de-isolation criteria now follow the 2024 NTCA/IDSA respiratory-isolation guideline, which is more permissive than the older "3 negative smears" reflex and is explicitly risk-stratified \u2014 make the de-isolation call with ID/public health, not unilaterally in the ED.** [17]\n- Treat concurrent bleeding on its own merits (may still be massive \u2014 TB is a leading cause of massive hemoptysis via Rasmussen aneurysm; IR embolization if brisk).\n- **Treatment note:** standard therapy remains RIPE for drug-susceptible disease [4], but CDC 2022 interim guidance endorses a **4-month rifapentine-moxifloxacin regimen** as an option in selected patients \u226512 years old \u2014 the regimen choice belongs to ID/public health, not the ED. [16]\n\n\ud83d\uded1 Do NOT leave a suspected-TB patient in an open ED bay \u2014 isolate first, diagnose second. \ud83d\uded1 A cavitary lesion that bleeds massively (Rasmussen aneurysm) still needs IR embolization regardless of TB status. \ud83d\uded1 Do NOT use one negative AFB smear or NAAT to lift airborne precautions.',
        recommendation: 'Airborne isolate NOW (N95, negative pressure, mask patient). CXR/CT, sputum AFB smear \u00d73 \u22658 h apart + NAAT + culture, HIV test (urine LAM if CD4 <200), notify public health. Do not de-isolate on a single negative test. Treat brisk bleeding as massive.',
        confidence: 'definitive',
        citation: [4, 7, 16, 17],
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
        body: 'Anticoagulants, antiplatelets, and coagulopathy do not usually CAUSE hemoptysis alone \u2014 but they turn a small lesion into a dangerous bleed. Find the underlying source AND correct the coagulopathy if bleeding is significant. [1]\n\n**Next 5 minutes:**\n- Send CBC, PT/INR, aPTT, fibrinogen, type and screen; renal/hepatic function.\n- **If bleeding is life-threatening, reverse:** open [Anticoagulation Reversal](#/tree/anticoag-reversal). Warfarin \u2192 4-factor PCC + vitamin K; DOAC \u2192 andexanet (Xa inhibitors) or idarucizumab (dabigatran); heparin \u2192 protamine. Platelets for antiplatelet-associated bleeding or thrombocytopenia. FFP/cryoprecipitate for factor/fibrinogen deficits. [8]\n- **Andexanet is not a free lunch.** ANNEXA-I (NEJM 2024) improved hemostatic efficacy (67.0% vs 53.1%) but nearly **doubled thrombotic events (10.3% vs 5.6%, p=0.048), with ischemic stroke 6.5% vs 1.5%.** Reserve it for genuinely life-threatening bleeding, and be explicit about the trade with the admitting team. 4F-PCC remains a reasonable alternative where andexanet is unavailable or the thrombotic risk is prohibitive. [15]\n- **Tranexamic acid** is a reasonable adjunct for pulmonary hemorrhage: **nebulized 500-1000 mg (commonly 500 mg in 5 mL) up to q8h**, or **IV 1 g over 10 min**. The evidence base is non-massive hemoptysis. [9,12]\n- Do NOT reverse reflexively for minor blood-streaking \u2014 weigh thrombotic risk (mechanical valve, recent VTE/PE, stent). Reverse when the bleed is life-threatening.\n- Still pursue the source: imaging, bronchoscopy, malignancy/TB/infection workup \u2014 the amplifier is not the diagnosis.\n\n\ud83d\uded1 Reversal is for LIFE-THREATENING bleeding, not blood-tinged sputum. \ud83d\uded1 An anticoagulated patient with hemoptysis still needs a source workup \u2014 do not stop at \u201cit\u2019s the blood thinner.\u201d \ud83d\uded1 Reversing a patient with a mechanical valve or a fresh PE trades one lethal problem for another \u2014 make that call deliberately, not reflexively.',
        recommendation: 'Send coags + type/screen. Reverse (PCC/vitamin K, andexanet/idarucizumab, protamine, platelets) ONLY for life-threatening bleeding; TXA adjunct (neb 500-1000 mg q8h or IV 1 g). Weigh thrombotic risk \u2014 andexanet roughly doubles thrombotic events. Still work the source.',
        confidence: 'recommended',
        citation: [1, 8, 9, 12, 15],
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
        id: 'hmp-exc-dah',
        type: 'result',
        module: 2,
        title: 'Diffuse Alveolar Hemorrhage — The Bleed You Cannot See',
        body: '**Diffuse alveolar hemorrhage (DAH) is the hemoptysis diagnosis that hides.** Bleeding is into the alveoli, not the airways, so **up to one-third of patients have NO hemoptysis at all** \u2014 the tell is hypoxemia + new bilateral infiltrates + an otherwise unexplained hemoglobin drop. Reported mortality is **20-50%**, and it is driven by how fast immunosuppression starts. [13]\n\n**The triad to pattern-match:**\n1. **Hypoxemia / new respiratory failure** out of proportion to the volume of blood you actually see.\n2. **New bilateral, often perihilar, alveolar infiltrates** on CXR or CT.\n3. **A falling hemoglobin** with no external blood loss to explain it.\n\n**Think pulmonary-renal syndrome when hematuria or AKI is also present:** ANCA-associated vasculitis (GPA, MPA), anti-GBM/Goodpasture disease, SLE, antiphospholipid syndrome. Other causes: drugs and toxins, stem-cell transplant, mitral stenosis, and cocaine.\n\n**Next 15 minutes:**\n- **Oxygen and airway support.** These patients decompensate on the DAH timeline, not the hemoptysis timeline \u2014 escalate early, and remember that **PEEP can tamponade alveolar bleeding** in the intubated patient.\n- **Send the panel now, do not wait for the consultant:** CBC with serial hemoglobins, creatinine, **urinalysis with microscopy (dysmorphic RBCs, RBC casts)**, ANCA (PR3, MPO), anti-GBM, ANA, anti-dsDNA, complements, coagulation studies, and a blood gas.\n- **Get CT chest** (ground-glass/consolidative opacities) and involve **pulmonary + nephrology + rheumatology early**.\n- **Bronchoscopy with sequential BAL is the confirmatory test** \u2014 progressively bloodier return across aliquots, and hemosiderin-laden macrophages on later sampling.\n- **Immunosuppression is time-critical.** In a patient with a convincing DAH picture, high-dose (pulse) corticosteroids are typically started **before serologies return**, with plasma exchange and cyclophosphamide/rituximab added per the underlying disease. **Make that call with nephrology/rheumatology \u2014 do not start it unilaterally, and do not sit on it either.** [13]\n\n\ud83d\uded1 Absence of hemoptysis does NOT exclude DAH \u2014 a third of cases never cough up blood. \ud83d\uded1 Do NOT wait for ANCA/anti-GBM results before calling the consultant; the serologies take days and the lung does not. \ud83d\uded1 Bronchial artery embolization does NOT help DAH \u2014 the bleeding is alveolar and diffuse, not from a discrete bronchial vessel.',
        recommendation: 'Hypoxemia + bilateral infiltrates + falling Hgb = DAH until proven otherwise, with or without hemoptysis. Send UA with micro, ANCA, anti-GBM, ANA, complements now; CT chest; call pulm/neph/rheum. Sequential BAL confirms. Pulse steroids \u00b1 plasma exchange are started before serologies return, in conjunction with the consultant. Embolization has no role.',
        confidence: 'recommended',
        citation: [13],
        safetyLevel: 'critical',
    },
    {
        id: 'hmp-exc-pseudo',
        type: 'result',
        module: 2,
        title: 'Pseudohemoptysis — Source Is Not the Lower Airway',
        body: 'Before committing to a pulmonary workup, confirm the blood actually comes from the lungs. Misattributed nasopharyngeal or gastrointestinal bleeding (pseudohemoptysis) sends patients down the wrong pathway. [1]\n\n**Distinguish the source:**\n- **Pulmonary (true hemoptysis)** \u2014 bright red, frothy, mixed with sputum, alkaline pH, preceded by coughing/gurgling, often a history of lung disease.\n- **Upper airway / ENT** \u2014 epistaxis, gum/dental bleeding, oropharyngeal lesion; blood drips posteriorly and is coughed up. Examine the nose and mouth; see [Epistaxis](#/tree/epistaxis), [Post-Tonsillectomy Bleed](#/tree/post-tonsillectomy-bleed), or [Dental Extraction Complications](#/tree/dental-extraction-complications). Control the local source.\n- **Gastrointestinal (hematemesis)** \u2014 dark/coffee-ground, mixed with food, acidic pH, preceded by nausea/vomiting, history of ulcer/varices/alcohol. If this is really a GI bleed, redirect to the GI pathway ([Upper GI Bleed](#/tree/upper-gi-bleed)).\n\n**One "pseudohemoptysis" that is anything but:** a patient with a **tracheostomy** who bleeds from the stoma or tube is NOT an ENT nuisance bleed \u2014 assume **tracheo-innominate fistula** until proven otherwise. See [Tracheo-Innominate Fistula](#/tree/tracheo-innominate-fistula). A self-limited sentinel bleed precedes the fatal one in ~44% of cases, median onset is around 79 days post-tracheostomy, and cuff hyperinflation or the Utley manoeuvre buys the only minutes you get. [14]\n\n**Next 5 minutes:**\n- Direct exam of nose/oropharynx; look for an ENT source you can control at the bedside.\n- If GI source suspected, pivot to the GI-bleed workup (NG lavage is unreliable; endoscopy is definitive).\n- Only after excluding pseudohemoptysis, commit to the pulmonary workup below.\n\n\ud83d\uded1 A missed GI bleed dressed as \u201chemoptysis\u201d delays endoscopy and transfusion \u2014 always ask \u201cvomited or coughed?\u201d and check the pH/color. \ud83d\uded1 Never write off bleeding around a tracheostomy as local granulation tissue without considering tracheo-innominate fistula.',
        recommendation: 'Confirm the blood is pulmonary (bright, frothy, alkaline, coughed) before working it up as hemoptysis. Examine nose/mouth for an ENT source; redirect to the GI-bleed pathway if hematemesis. Bleeding around a tracheostomy = tracheo-innominate fistula until excluded.',
        confidence: 'recommended',
        citation: [1, 14],
    },
    // ============================================================
    // Module 3 — Initial Bundle + Reassess
    // ============================================================
    {
        id: 'hmp-rescue',
        type: 'info',
        module: 3,
        title: 'Initial Bundle — Non-Massive Hemoptysis',
        body: 'No life-threat hit, bleeding is small-volume and stable. Standard ED bundle while you work up the cause: [1,2]\n\n**THE BUNDLE:**\n- **IV access, monitor, continuous SpO2, supplemental O2** to keep saturations up.\n- **Quantify and track** the volume/rate of bleeding \u2014 escalate immediately if it becomes massive (position bleeding-side-down, secure airway).\n- **Focused labs:** CBC (anemia, platelets), CMP, PT/INR + aPTT (coagulopathy), type and screen, D-dimer only if PE is being risk-stratified, sputum studies (Gram stain, AFB, culture, cytology) as indicated.\n- **Chest X-ray** on everyone; **CT chest** (with contrast / CTPA depending on suspicion) for anything beyond simple bronchitis, for smokers \u226540, weight loss, recurrent bleeding, or a mass.\n- **ECG** if any cardiac or PE concern.\n- **Isolate for TB** the moment risk factors appear.\n- **Cough suppression** (e.g., an antitussive) can reduce mechanical trauma from repetitive coughing **in mild, low-volume, non-massive bleeding only.** \u26A0\uFE0F **This is the opposite of what you do in massive hemoptysis** \u2014 the [Massive Hemoptysis](#/tree/massive-hemoptysis) pathway lists avoiding cough suppressants as a critical action, because cough is the only mechanism clearing blood from the airway and suppressing it risks retained clot and obstruction. If the bleeding is brisk, ongoing, or the patient is struggling to clear secretions, do NOT suppress the cough. [3,6]\n- **Nebulized tranexamic acid 500-1000 mg** (commonly 500 mg in 5 mL, up to q8h) is a reasonable adjunct in this non-massive group \u2014 this is exactly the population the RCT and the 2025 meta-analyses studied, with faster bleeding resolution, shorter length of stay, and roughly 43% fewer invasive procedures. [9,12]\n- **Reverse/hold anticoagulation** only if bleeding is significant and thrombotic risk allows.\n\n**Reassess:** stable and self-limited with a benign X-ray vs recurrent/larger bleeding needing CT + bronchoscopy/pulmonary consult.',
        citation: [1, 2, 3, 6, 9, 12],
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
        body: 'The goal is to (1) localize the bleeding, (2) find the cause, (3) risk-stratify for recurrence. [1,2,6]\n\n**Chest X-ray (everyone):** cheap, fast; identifies mass, consolidation, cavity, edema. A normal CXR does NOT exclude a serious cause. **Put a number on that:** among patients with hemoptysis and a normal or non-localizing chest radiograph, roughly **9.6-10% still turn out to have a malignancy**, and in that cohort CT is about **96% sensitive for cancer versus ~54% for bronchoscopy.** A clean film buys you nothing but time. [11]\n\n**CT chest \u2014 the key test for anything beyond trivial bronchitis:**\n- **CT chest with contrast / CT angiography** \u2014 localizes bleeding, defines bronchial artery anatomy for embolization, detects malignancy, bronchiectasis, AVM, aspergilloma.\n- **CT pulmonary angiography (CTPA)** \u2014 when PE is suspected. See [PE Treatment](#/tree/pe-treatment).\n- Indications: massive/moderate hemoptysis, recurrent hemoptysis, abnormal CXR, smoker \u226540, weight loss, or planned embolization.\n- **ACR Appropriateness Criteria adds precision to the smoking trigger:** the classic high-risk imaging cohort is age **\u226540 years AND \u226530 pack-years**, and CT is also indicated for **>30 mL of blood in 24 h** or **recurrent hemoptysis** independent of smoking history. Treat these as additional triggers layered on top of the ones above \u2014 not as a narrower filter. [11]\n\n**Bronchoscopy:**\n- Localizes and can treat active bleeding (topical agents, tamponade, cautery); indicated for massive hemoptysis, unclear source, or suspected endobronchial lesion. Rigid bronchoscopy for large-volume bleeding.\n- **Sequence matters: do the CT first when the patient is stable enough.** CT before bronchoscopy identifies the bleeding source in roughly **75% of cases versus ~50% for bronchoscopy alone**, and the CT map tells the bronchoscopist and the interventional radiologist where to go. In a crashing patient, airway control and bronchoscopy come first. [3,6]\n\n**Sputum studies:** AFB smear/culture + NAAT ([Tuberculosis](#/tree/tuberculosis)), Gram stain/culture ([Pneumonia](#/tree/pneumonia)), cytology for malignancy.\n\n**Labs:** CBC, coags, type and screen; renal/urinalysis if pulmonary-renal syndrome (Goodpasture, ANCA vasculitis) suspected (hemoptysis + hematuria + AKI \u2192 send ANCA, anti-GBM, urinalysis, and take the Diffuse Alveolar Hemorrhage branch in Module 2 \u2014 remember a third of DAH never produces hemoptysis at all). [13]\n\n**When minimal workup suffices:** young, low-risk patient with clear acute bronchitis, small blood-streaking, normal CXR, no red flags \u2014 outpatient follow-up rather than CT.',
        citation: [1, 2, 3, 6, 11, 13],
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
        body: 'Safe discharge criteria: [1,2]\n\n1. **Small volume, now stopped** (blood-streaked sputum, not frank blood; no ongoing bleeding).\n2. **Benign, explained cause** \u2014 e.g., acute bronchitis or an upper-airway source that has been controlled.\n3. **Normal or reassuring CXR**, normal vitals, no hypoxia, no anemia on CBC.\n4. **Low malignancy/TB risk** \u2014 non-smoker or smoker <40 without weight loss, no TB risk, no recurrent bleeding.\n5. **No coagulopathy** driving the bleed (or it has been addressed).\n6. **Reliable follow-up** arranged \u2014 primary care / pulmonary within days, and outpatient CT if any risk features.\n\n**Written return precautions:**\n- Any increase in blood volume, coughing up more than streaks, or frank blood \u2014 return / call 911\n- Shortness of breath, chest pain, fever, light-headedness, worsening cough\n- Recurrent episodes\n\n**Counseling:** smoking cessation; complete the outpatient workup even if bleeding stops (malignancy can present with a single small bleed and a normal X-ray). Smoking cessation is not a throwaway line here \u2014 in hemoptysis cohorts continued smoking carries roughly a **3.9-fold odds of recurrent bleeding**. [11]\n\n**Cryptogenic hemoptysis still needs a plan.** If the bleeding stops and the CT and bronchoscopy find nothing, that is not the end \u2014 **ACR recommends surveillance for about 3 years**, because an occult malignancy can declare itself later. Say this out loud to the patient and write it in the discharge instructions; an unexplained bleed is a diagnosis deferred, not a diagnosis excluded. [11]\n\n**Risk-stratification note:** the ACR high-risk imaging cohort is age **\u226540 years AND \u226530 pack-years**, with **>30 mL in 24 h** or **recurrent bleeding** as independent triggers for CT regardless of smoking. Use these to widen who gets imaged \u2014 never to justify skipping imaging in someone who trips the criteria below. [11]\n\n**Do NOT discharge if:** smoker \u226540, weight loss, recurrent hemoptysis, abnormal imaging, hypoxia, anemia, anticoagulated with ongoing bleeding, TB risk, or unreliable follow-up.',
        recommendation: 'Discharge only if bleeding trivial and stopped, cause benign and explained, CXR/CBC reassuring, low TB/cancer risk, follow-up arranged. Strong return precautions; complete outpatient CT if any risk feature. Cryptogenic hemoptysis needs ~3 years of surveillance; continued smoking carries ~3.9x odds of recurrence.',
        confidence: 'definitive',
        citation: [1, 2, 11],
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
        body: 'ICU admission for: [3,6]\n\n- **Massive / life-threatening hemoptysis** (per [Massive Hemoptysis](#/tree/massive-hemoptysis)) \u2014 actual or impending airway compromise, large volume, or hemodynamic instability\n- **Ongoing active bleeding** requiring airway protection, transfusion, or urgent IR embolization / bronchoscopy\n- **Post-embolization or post-bronchoscopy** monitoring after intervention\n- **Respiratory failure** from blood soiling the airways\n\n**ICU/procedural priorities:**\n- Definitive airway (large ETT; selective intubation / bronchial blocker if needed), aggressive suction, bleeding-lung-down positioning\n- IR for bronchial artery embolization \u2014 **technical success 81-100% and immediate clinical success 70-99%, but 9.8-57.5% rebleed**, so a successful embolization is a reprieve, not a cure. Keep thoracic surgery engaged for embolization failure, rebleeding, or a surgically resectable source. [6,10]\n- Correct coagulopathy, transfuse ([Massive Transfusion](#/tree/massive-transfusion) if unstable), TXA (nebulized 500-1000 mg q8h or IV 1 g over 10 min) [9,12]\n- Treat the underlying cause once stabilized (TB regimen + isolation, antibiotics, anticoagulation decisions for PE)\n\n**Post-embolization monitoring \u2014 know the complications:** post-embolization syndrome (chest pain, fever, dysphagia) in **1.7-31%**, and **spinal cord infarction in 0.2-6.5%** from non-target embolization of a spinal artery arising off the bronchial circulation. **Do a focused neurologic exam of the lower extremities after every BAE** \u2014 new paraparesis or a sensory level is a spinal cord infarct until proven otherwise, and it will not be found if nobody looks. [10]\n\n**Service selection:** ICU with pulmonary / interventional radiology / thoracic surgery co-management. TB \u2192 airborne-isolation negative-pressure ICU bed + public-health notification.\n\n**Handoff content:** volume/rate and trend, side of bleeding if known, airway status and ETT size, interventions done (embolization, bronchoscopy), post-BAE neuro exam, coagulation status and reversal given, transfusion given, presumed cause, isolation status.',
        recommendation: 'ICU with pulmonary + IR + thoracic surgery. Secure airway, isolate the bleeding lung, embolize (IR), correct coagulopathy, transfuse. Expect a 10-58% rebleed rate after BAE and document a post-procedure lower-extremity neuro exam (spinal cord infarction 0.2-6.5%). Airborne isolation if TB.',
        confidence: 'definitive',
        citation: [3, 6, 9, 10, 12],
        safetyLevel: 'critical',
    },
];
export const HEMOPTYSIS_HUB_CRITICAL_ACTIONS = [
    { text: 'Triage by volume/rate FIRST \u2014 massive hemoptysis kills by asphyxiation; position bleeding-lung-down, secure airway, call IR.', nodeId: 'hmp-exc-massive' },
    { text: 'Fever/weight loss/night sweats or TB risk \u2014 airborne isolate immediately (N95, negative pressure, mask patient) before workup.', nodeId: 'hmp-exc-tb' },
    { text: 'Hemoptysis + pleuritic pain + VTE risk = PE; CTPA. Minor bleeding still allows anticoagulation; massive bleeding does not.', nodeId: 'hmp-exc-pe' },
    { text: 'Reverse anticoagulation/coagulopathy only for LIFE-THREATENING bleeding; TXA adjunct. Still work the underlying source.', nodeId: 'hmp-exc-coag' },
    { text: 'Hypoxemia + bilateral infiltrates + falling hemoglobin = diffuse alveolar hemorrhage \u2014 up to a third of DAH has NO hemoptysis. Send UA/ANCA/anti-GBM and call pulm/neph/rheum before serologies return.', nodeId: 'hmp-exc-dah' },
    { text: 'Confirm the blood is truly pulmonary (bright, frothy, alkaline, coughed) \u2014 exclude nasopharyngeal and GI pseudohemoptysis. Bleeding around a tracheostomy = tracheo-innominate fistula until excluded (sentinel bleed in ~44%).', nodeId: 'hmp-exc-pseudo' },
    { text: 'Initial bundle: IV + O2 + quantify bleeding + CBC/coags/type-screen + CXR (CT chest if beyond bronchitis) + ECG.', nodeId: 'hmp-rescue' },
    { text: 'Bleeding escalating to massive or airway compromise = STOP, return to exclusions, airway + IR now.', nodeId: 'hmp-rescue-reassess' },
    { text: 'CT chest/CTA for anything beyond bronchitis, recurrent bleeding, or smokers \u226540; CT BEFORE bronchoscopy when stable (~75% vs ~50% source yield). A normal CXR still misses ~10% malignancy.', nodeId: 'hmp-imaging' },
    { text: 'Discharge only trivial, stopped, benign, low-risk bleeding with follow-up; complete outpatient CT if any risk feature.', nodeId: 'hmp-dispo-discharge' },
    { text: 'Massive/ongoing bleeding = ICU with pulmonary + IR (embolization) + thoracic surgery; airborne isolation if TB. BAE rebleeds in 10-58% and carries a 0.2-6.5% spinal cord infarction risk \u2014 document a post-procedure lower-extremity neuro exam.', nodeId: 'hmp-dispo-admit' },
];
export const HEMOPTYSIS_HUB_CITATIONS = [
    { num: 1, text: "O'Gurek D, Choi HYJ. Hemoptysis: Evaluation and Management. Am Fam Physician. 2022;105(2):144-151. PMID: 35166503. (Current AAFP review; supersedes Earwood & Thompson 2015 \u2014 PMID 25955625 \u2014 which this consult previously cited. No newer AAFP hemoptysis review as of July 2026.)" },
    { num: 2, text: 'Ittrich H, Bockhorn M, Klose H, Simon M. The Diagnosis and Treatment of Hemoptysis. Dtsch Arztebl Int. 2017;114(21):371-381. doi:10.3238/arztebl.2017.0371. PMID: 28625277.' },
    { num: 3, text: 'Radchenko C, Alraiyes AH, Shojaee S. A systematic approach to the management of massive hemoptysis. J Thorac Dis. 2017;9(Suppl 10):S1069-S1086. doi:10.21037/jtd.2017.06.41. PMID: 29214066.' },
    { num: 4, text: 'Nahid P, Dorman SE, Alipanah N, et al. Official ATS/CDC/IDSA Clinical Practice Guidelines: Treatment of Drug-Susceptible Tuberculosis. Clin Infect Dis. 2016;63(7):e147-e195. doi:10.1093/cid/ciw376. PMID: 27516382. (Still the base treatment guideline; see [16] for the 2022 CDC 4-month rifapentine-moxifloxacin option.)' },
    { num: 5, text: 'Konstantinides SV, Meyer G, Becattini C, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism developed in collaboration with the ERS. Eur Heart J. 2020;41(4):543-603. doi:10.1093/eurheartj/ehz405. PMID: 31504429. (No successor ESC PE guideline published as of July 2026.)' },
    { num: 6, text: 'Davidson K, Shojaee S. Managing Massive Hemoptysis. Chest. 2020;157(1):77-88. doi:10.1016/j.chest.2019.07.012. PMID: 31374211.' },
    { num: 7, text: 'Lewinsohn DM, Leonard MK, LoBue PA, et al. Official ATS/IDSA/CDC Clinical Practice Guidelines: Diagnosis of Tuberculosis in Adults and Children. Clin Infect Dis. 2017;64(2):e1-e33. doi:10.1093/cid/ciw694. PMID: 27932390. (Full-text version; the abbreviated print summary is PMID 28052967.)' },
    { num: 8, text: 'Tomaselli GF, Mahaffey KW, Cuker A, et al. 2020 ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants. J Am Coll Cardiol. 2020;76(5):594-622. doi:10.1016/j.jacc.2020.04.053. PMID: 32680646. (Predates the ANNEXA-I andexanet trial \u2014 see [15].)' },
    { num: 9, text: 'Wand O, Guber E, Guber A, et al. Inhaled Tranexamic Acid for Hemoptysis Treatment: A Randomized Controlled Trial. Chest. 2018;154(6):1379-1384. doi:10.1016/j.chest.2018.09.026. PMID: 30321510. (Non-massive hemoptysis only \u2014 massive hemoptysis was an exclusion criterion.)' },
    { num: 10, text: 'Singhal R, Basavaraj SB, Keshava SN, et al. Society of Chest Imaging and Interventions Consensus Guidelines for the Interventional Radiology Management of Hemoptysis. Indian J Radiol Imaging. 2023;33(3):361-372. doi:10.1055/s-0043-1764303. PMID: 37362365. (Most recent multidisciplinary consensus on hemoptysis definitions and bronchial artery embolization outcomes/complications.)' },
    { num: 11, text: 'Expert Panel on Thoracic Imaging; Olsen KM, Manouchehr-Pour S, Donnelly EF, et al. ACR Appropriateness Criteria\u00ae Hemoptysis. J Am Coll Radiol. 2020;17(5S):S148-S159. doi:10.1016/j.jacr.2020.01.043. PMID: 32370959. (Imaging triggers, normal-CXR malignancy yield, and 3-year follow-up recommendation for cryptogenic hemoptysis.)' },
    { num: 12, text: 'Mahalingam S, Rajendran G, Rathinasamy S, et al. Effectiveness of Inhalational Tranexamic Acid in Patients with Nonmassive Hemoptysis \u2014 A Systematic Review and Meta-analysis. Lung. 2025;203(1):19. doi:10.1007/s00408-024-00775-2. PMID: 39751689. See also Ye M, Chen M, et al. Nebulized Tranexamic Acid in the Management of Hemoptysis: An Integrative Review. Lung. 2025;203(1):28. PMID: 39841268.' },
    { num: 13, text: 'Mudgal M, Balaji S, Prasad V, et al. Connective Tissue Disorder-Induced Diffuse Alveolar Hemorrhage: A Comprehensive Review with an Emphasis on Airway Management and Critical Care. Life (Basel). 2025;15(5):769. doi:10.3390/life15050769. PMID: 40430219.' },
    { num: 14, text: 'Joshi KD, Singh A, Sethi RKV, et al. Tracheo-Innominate Artery Fistula: A Systematic Review of Diagnostic and Management Strategies. Otolaryngol Head Neck Surg. 2025;173(4):824-839. doi:10.1002/ohn.1276. PMID: 40504067. (148 pooled cases; sentinel bleed in 43.9%; median 79.5 days post-tracheostomy.)' },
    { num: 15, text: 'Connolly SJ, Sharma M, Cohen AT, et al. Andexanet for Factor Xa Inhibitor-Associated Acute Intracerebral Hemorrhage (ANNEXA-I). N Engl J Med. 2024;390(19):1745-1755. doi:10.1056/NEJMoa2313040. PMID: 38749032. (Better hemostasis but thrombotic events 10.3% vs 5.6% with usual care, p=0.048.)' },
    { num: 16, text: 'Carr W, Kurbatova E, Starks A, et al. Interim Guidance: 4-Month Rifapentine-Moxifloxacin Regimen for the Treatment of Drug-Susceptible Pulmonary Tuberculosis \u2014 United States, 2022. MMWR Morb Mortal Wkly Rep. 2022;71(8):285-289. doi:10.15585/mmwr.mm7108a1. PMID: 35202353.' },
    { num: 17, text: 'Shah M, Dansky Z, Nathavitharana R, et al. NTCA Guidelines for Respiratory Isolation and Restrictions to Reduce Transmission of Pulmonary Tuberculosis in Community Settings. Clin Infect Dis. 2024;ciae199. doi:10.1093/cid/ciae199. PMID: 38632829.' },
];
export const HEMOPTYSIS_HUB_NODE_COUNT = HEMOPTYSIS_HUB_NODES.length;
export const HEMOPTYSIS_HUB_MODULE_LABELS = [
    'Sick Check',
    'Time-Critical Exclusions',
    'Initial Bundle + Reassess',
    'Imaging & Workup',
    'Disposition',
];
