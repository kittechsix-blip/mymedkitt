// MedKitt — Unilateral Leg Swelling / Acute Painful Calf Front Door (Rule-In / Rule-Out Engine, type: 'hub')
//
// 5-Module rule-in/rule-out skeleton (matches dyspnea-hub / abdominal-pain-hub template
// codified in CLAUDE.md "Chief-Complaint Hub Template"):
//   1. Sick Check
//   2. Rule In / Rule Out — per-differential chains: entry -> gate(s) -> verdict
//      (excluded verdicts loop back to uls-triage; confirmed verdicts link out to deep-dive)
//   3. Initial bundle / Reassess
//   4. Imaging
//   5. Disposition
//
// The UNILATERAL swollen-leg front door (distinct from generalized/bilateral anasarca).
// Job: DVT vs the limb-threat / systemic masqueraders.
// EBM-only citations. Wells-DVT + qSOFA live in the bottom toolbar.
// Consult gaps handled as plain-text result nodes: phlegmasia cerulea dolens,
// compartment syndrome, cellulitis, ruptured Baker cyst.
export const UNILATERAL_LEG_SWELLING_HUB_NODES = [
    // ============================================================
    // Module 1 — Sick Check
    // ============================================================
    {
        id: 'uls-sick-check',
        type: 'info',
        module: 1,
        title: 'Unilateral Leg Swelling — Sick Check First',
        body: '**A swollen leg is not just "DVT vs cellulitis."** Before you settle on the common causes, exclude the limb- and life-threats that share the same presentation: a threatened limb (phlegmasia, acute ischemia, compartment syndrome), a necrotizing infection, and a systemic driver (right-heart failure, massive DVT with PE).\n\n**⚠️ 5 DO-NOT-MISS diagnoses**\n1. **DVT with PE** — a swollen calf plus pleuritic chest pain, dyspnea, or hypoxia is a pulmonary embolism until proven otherwise.\n2. **Phlegmasia cerulea dolens** — massive iliofemoral DVT: a tensely swollen, dusky/cyanotic, painful limb; venous gangrene and limb loss follow if not decompressed.\n3. **Necrotizing soft-tissue infection** — pain out of proportion, crepitus, dusky skin, systemic toxicity; a surgical emergency, not "cellulitis."\n4. **Acute limb ischemia** — a cold, pale, pulseless, painful limb; can co-present with swelling. The 6 Ps; salvage is time-critical.\n5. **Compartment syndrome** — a tense compartment with pain on passive stretch, often after trauma/reperfusion; pressure kills muscle and nerve.\n\n**First 60 seconds:** vitals (fever/toxicity → screen sepsis with qSOFA in the toolbar), check the pulses and skin color/temperature of BOTH legs, feel the compartments, look for chest symptoms / hypoxia, and measure calf circumference. **A cold pulseless limb, a dusky tense limb, or pain out of proportion overrides the "it\u2019s probably a DVT" reflex — work the limb-threat first.**',
        citation: [1],
        next: 'uls-triage',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 2 — Rule In / Rule Out
    // ============================================================
    {
        id: 'uls-triage',
        type: 'question',
        module: 2,
        title: 'Rule In / Rule Out — Pick the Thread',
        body: 'Work the limb- and life-threats first, then DVT, then the benign mimics. Each branch runs a validated tool or a tight clinical gate to an explicit verdict; excluded branches return here for the next differential.',
        options: [
            { label: '🔴 Cold / pale / pulseless / painful limb', description: 'Acute limb ischemia', next: 'uls-ischemia-entry', urgency: 'critical' },
            { label: '🔴 Tense, dusky/cyanotic, severely swollen painful limb', description: 'Phlegmasia cerulea dolens (massive DVT)', next: 'uls-phlegmasia-entry', urgency: 'critical' },
            { label: '🔴 Pain out of proportion / crepitus / dusky skin / toxicity', description: 'Necrotizing soft-tissue infection', next: 'uls-necfasc-entry', urgency: 'critical' },
            { label: 'Tense compartment / pain on passive stretch (often post-trauma)', description: 'Compartment syndrome', next: 'uls-compartment-entry', urgency: 'critical' },
            { label: 'Swollen calf, DVT risk factors \u00B1 chest symptoms / hypoxia', description: 'DVT (\u00B1 PE)', next: 'uls-dvt-entry', urgency: 'urgent' },
            { label: 'Asymmetric edema + heart failure / dyspnea / raised JVP', description: 'Right-heart failure', next: 'uls-rhf-entry', urgency: 'urgent' },
            { label: 'Warm/well, no limb threat, no systemic signs', description: 'Benign mimics (cellulitis / Baker cyst / venous)', next: 'uls-benign-entry', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Seven-branch triage: acute ischemia / phlegmasia / necrotizing infection / compartment syndrome / DVT\u00B1PE / right-heart failure / benign.',
    },
    // -------------------- ACUTE LIMB ISCHEMIA --------------------
    {
        id: 'uls-ischemia-entry',
        type: 'question',
        module: 2,
        title: 'Acute Limb Ischemia — 6 Ps Gate',
        body: '**A cold, pulseless, painful limb is acute limb ischemia \u2014 time-critical.** The classic **6 Ps**: Pain, Pallor, Pulselessness, Poikilothermia (cold), Paresthesia, Paralysis. Paresthesia and paralysis mark a threatened/immediately-threatened limb (Rutherford IIa/IIb). Swelling can coexist (reperfusion, coexisting venous disease). **Check pulses / Doppler signals in BOTH legs.**',
        options: [
            { label: 'Cold / pulseless \u00B1 sensorimotor deficit', description: 'Treat as acute limb ischemia', next: 'uls-ischemia-verdict', urgency: 'critical' },
            { label: 'Warm limb with palpable/Doppler pulses', description: 'Ischemia excluded \u2014 move on', next: 'uls-ischemia-excluded', urgency: 'routine' },
        ],
        citation: [2],
        summary: '6 Ps + absent pulses = acute limb ischemia; sensorimotor deficit = threatened limb. Check both legs.',
        safetyLevel: 'critical',
    },
    {
        id: 'uls-ischemia-verdict',
        type: 'result',
        module: 2,
        title: 'Acute Limb Ischemia — Anticoagulate + Emergent Vascular',
        body: 'Open [Acute Limb Ischemia](#/tree/ischemic-limb) for the full pathway.\n\n**Next steps:**\n- **Emergent vascular surgery consult** \u2014 revascularization (surgical embolectomy, thrombolysis, or endovascular) is time-critical; a sensorimotor deficit (Rutherford IIb) means hours, not days.\n- **Immediate systemic anticoagulation with heparin** (unless contraindicated) to prevent clot propagation.\n- Keep the limb dependent and warm; do NOT elevate or apply cold; analgesia.\n- Identify the cause (embolic vs thrombotic): pulse exam of all limbs, cardiac source (AF), aneurysm; CT angiography if it will not delay revascularization.',
        recommendation: 'Emergent vascular surgery + immediate heparin; keep limb warm/dependent; CTA if it won\u2019t delay revascularization. Salvage is time-dependent.',
        citation: [2],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'uls-ischemia-excluded',
        type: 'result',
        module: 2,
        title: 'Acute Limb Ischemia — Excluded',
        body: 'A warm limb with palpable or Doppler-detectable pulses excludes acute arterial ischemia right now. **Re-check pulses if the limb changes** \u2014 pain out of proportion, worsening pallor, or a new sensorimotor deficit warrants immediate re-evaluation (a tense compartment can also abolish pulses late).\n\nReturn to the hub for the next differential.',
        recommendation: 'Ischemia excluded with intact pulses; reassess immediately if pulses, color, or sensation change.',
        citation: [2],
        next: 'uls-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- PHLEGMASIA CERULEA DOLENS (consult gap: plain-text) --------------------
    {
        id: 'uls-phlegmasia-entry',
        type: 'question',
        module: 2,
        title: 'Phlegmasia Cerulea Dolens — Threatened-Limb Gate',
        body: '**Phlegmasia cerulea dolens is a massive iliofemoral DVT that obstructs venous outflow \u2014 the limb becomes tensely swollen, painful, and dusky/cyanotic, and venous gangrene and limb loss follow.** It is a limb-threatening emergency distinct from an ordinary DVT. Look for the whole-leg tense swelling, cyanotic mottling, and severe pain; a compromised limb may lose pulses secondarily from the massive edema. Often associated with malignancy or a prothrombotic state.',
        options: [
            { label: 'Whole-leg tense cyanotic swelling + severe pain', description: 'Treat as phlegmasia \u2014 limb emergency', next: 'uls-phlegmasia-verdict', urgency: 'critical' },
            { label: 'Focal swelling, no cyanosis, limb not threatened', description: 'Not phlegmasia \u2014 assess for ordinary DVT', next: 'uls-phlegmasia-excluded', urgency: 'routine' },
        ],
        citation: [3],
        summary: 'Tense cyanotic whole-leg swelling + pain = phlegmasia (massive iliofemoral DVT); venous gangrene / limb loss without decompression.',
        safetyLevel: 'critical',
    },
    {
        id: 'uls-phlegmasia-verdict',
        type: 'result',
        module: 2,
        title: 'Phlegmasia Cerulea Dolens — Anticoagulate + Emergent Vascular',
        body: '**Phlegmasia cerulea dolens** (no dedicated consult yet \u2014 manage here); it sits on the [DVT](#/tree/dvt) spectrum as its most severe, limb-threatening form:\n\n- **Immediate systemic anticoagulation with heparin** \u2014 the cornerstone; start unless contraindicated.\n- **Emergent vascular surgery / interventional radiology consult** \u2014 catheter-directed thrombolysis or thrombectomy is often required to salvage the limb; surgical thrombectomy in severe cases.\n- **Aggressive limb elevation and fluid resuscitation** \u2014 large third-space losses into the swollen limb can cause hypotension.\n- Monitor for compartment syndrome and reperfusion; treat pain.\n- Investigate for an underlying malignancy / thrombophilia once stabilized.\n- (Consult gap \u2014 managed in-hub.)',
        recommendation: 'Immediate heparin + emergent vascular/IR for catheter-directed thrombolysis/thrombectomy; elevate limb + fluids; watch for compartment syndrome.',
        citation: [3],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'uls-phlegmasia-excluded',
        type: 'result',
        module: 2,
        title: 'Phlegmasia — Excluded',
        body: 'The limb is not tensely swollen or cyanotic and is not threatened \u2014 phlegmasia is not the picture. An ordinary DVT is still very much on the table.\n\nReturn to the hub and run the DVT branch.',
        recommendation: 'Phlegmasia excluded; proceed to risk-stratify for ordinary DVT.',
        citation: [3],
        next: 'uls-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- NECROTIZING SOFT-TISSUE INFECTION --------------------
    {
        id: 'uls-necfasc-entry',
        type: 'question',
        module: 2,
        title: 'Necrotizing Soft-Tissue Infection — Toxicity Gate',
        body: '**"Cellulitis" that hurts far more than it looks is a necrotizing infection until proven otherwise.** The alarm signs: **pain out of proportion to exam, systemic toxicity, crepitus, dusky/bullous/necrotic skin, rapidly spreading erythema, or firm "woody" induration beyond the erythema.** LRINEC can support but must never override clinical suspicion. **Do NOT wait for imaging to consult surgery** when the exam is convincing.',
        options: [
            { label: 'Pain out of proportion + toxicity / crepitus / dusky or bullous skin', description: 'Resuscitate + emergent surgery', next: 'uls-necfasc-verdict', urgency: 'critical' },
            { label: 'Erythema/warmth proportional to pain, no toxicity/crepitus', description: 'Necrotizing infection unlikely \u2014 move on', next: 'uls-necfasc-excluded', urgency: 'routine' },
        ],
        citation: [4],
        summary: 'Pain out of proportion + toxicity + crepitus/skin necrosis = necrotizing infection; emergent surgery, do not wait for imaging.',
        safetyLevel: 'critical',
    },
    {
        id: 'uls-necfasc-verdict',
        type: 'result',
        module: 2,
        title: 'Necrotizing Infection — Resuscitate + Emergent Debridement',
        body: 'Open [Necrotizing Fasciitis](#/tree/necrotizing-fasciitis) for the full pathway.\n\n**Next steps:**\n- **Emergent surgical consult for operative debridement \u2014 do NOT wait for imaging.** Source control is the definitive treatment; mortality rises with every hour of delay.\n- **Broad-spectrum antibiotics:** gram-positive, gram-negative, and anaerobic cover (e.g., vancomycin + piperacillin-tazobactam) **plus clindamycin for toxin suppression.**\n- **Aggressive resuscitation** \u2014 run the [Sepsis](#/tree/sepsis) pathway (IV fluids, blood cultures, lactate); qSOFA in the toolbar.\n- CT/MRI can map extent only if it will not delay the OR; a convincing exam goes straight to surgery.',
        recommendation: 'Emergent operative debridement (do not wait for imaging) + broad-spectrum abx with clindamycin + aggressive sepsis resuscitation.',
        citation: [4],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'uls-necfasc-excluded',
        type: 'result',
        module: 2,
        title: 'Necrotizing Infection — Unlikely',
        body: 'Erythema and warmth proportional to the pain, no systemic toxicity, and no crepitus/skin necrosis make a necrotizing infection unlikely right now. **It evolves fast** \u2014 if pain out of proportion, toxicity, crepitus, or skin necrosis appears on reassessment, resuscitate and consult surgery immediately. (Ordinary cellulitis is handled in the benign branch.)\n\nReturn to the hub for the next differential.',
        recommendation: 'Necrotizing infection unlikely without toxicity/skin signs; re-examine and escalate immediately if it evolves.',
        citation: [4],
        next: 'uls-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- COMPARTMENT SYNDROME (consult gap: plain-text) --------------------
    {
        id: 'uls-compartment-entry',
        type: 'question',
        module: 2,
        title: 'Compartment Syndrome — Pressure Gate',
        body: '**Acute compartment syndrome is rising pressure within a fascial compartment that strangles perfusion \u2014 it destroys muscle and nerve within hours.** Suspect it with a **tense, swollen compartment and pain out of proportion, especially pain on passive stretch** of the muscles in that compartment; paresthesia is an early nerve sign. Classic after fracture, crush, reperfusion, or a tight cast, but also with severe swelling of any cause. **Pulselessness is a LATE finding \u2014 do NOT wait for it.** Measure compartment pressures if the diagnosis is uncertain (delta pressure = diastolic BP \u2212 compartment pressure; <30 mmHg is concerning).',
        options: [
            { label: 'Tense compartment + pain on passive stretch \u00B1 paresthesia', description: 'Treat as compartment syndrome', next: 'uls-compartment-verdict', urgency: 'critical' },
            { label: 'Soft compartments, no stretch pain, normal sensation', description: 'Compartment syndrome unlikely \u2014 move on', next: 'uls-compartment-excluded', urgency: 'routine' },
        ],
        citation: [5],
        summary: 'Tense compartment + pain on passive stretch = compartment syndrome; pulselessness is LATE. Measure pressures if unsure; fasciotomy is definitive.',
        safetyLevel: 'critical',
    },
    {
        id: 'uls-compartment-verdict',
        type: 'result',
        module: 2,
        title: 'Compartment Syndrome — Emergent Fasciotomy',
        body: '**Acute compartment syndrome** (no dedicated consult yet \u2014 manage here):\n\n- **Emergent orthopedic / surgical consult for fasciotomy \u2014 the only definitive treatment.** Time to decompression drives outcome; irreversible damage begins within hours.\n- **Immediate first aid:** remove all constricting casts/dressings, keep the limb at heart level (do NOT elevate above the heart \u2014 it lowers perfusion pressure), supplemental oxygen, correct hypotension.\n- **Measure compartment pressures** to confirm if the diagnosis is uncertain (delta pressure <30 mmHg), but a convincing clinical picture goes to fasciotomy without delay.\n- Analgesia, IV fluids; monitor for rhabdomyolysis (CK, renal function) and treat.\n- (Consult gap \u2014 managed in-hub.)',
        recommendation: 'Emergent fasciotomy; remove constricting dressings, keep limb at heart level, correct hypotension; check pressures if unsure; monitor for rhabdo.',
        citation: [5],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'uls-compartment-excluded',
        type: 'result',
        module: 2,
        title: 'Compartment Syndrome — Unlikely',
        body: 'Soft compartments, no pain on passive stretch, and normal sensation make acute compartment syndrome unlikely right now. **Serial exams are essential** in an at-risk limb (post-fracture, crush, reperfusion) \u2014 escalating analgesia requirements, increasing tension, or new paresthesia warrant repeat assessment \u00B1 pressure measurement.\n\nReturn to the hub for the next differential.',
        recommendation: 'Compartment syndrome unlikely now; serial exams in at-risk limbs and re-check with any escalation of pain/tension/paresthesia.',
        citation: [5],
        next: 'uls-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- DVT (± PE) --------------------
    {
        id: 'uls-dvt-entry',
        type: 'question',
        module: 2,
        title: 'DVT — Wells + Chest-Symptom Gate',
        body: '**Risk-stratify with the Wells DVT score** (in the toolbar), then combine with D-dimer and ultrasound:\n- **Low probability (Wells 0\u20131) + negative high-sensitivity D-dimer \u2192 DVT excluded** (no imaging needed).\n- **Low probability + positive D-dimer, or moderate/high probability \u2192 compression ultrasound.**\n- **First, screen for PE:** any pleuritic chest pain, dyspnea, hypoxia, syncope, or tachycardia with the swollen leg points to a concurrent pulmonary embolism.',
        options: [
            { label: 'Swollen leg + chest pain / dyspnea / hypoxia', description: 'Suspect concurrent PE', next: 'uls-pe-verdict', urgency: 'critical' },
            { label: 'DVT confirmed on ultrasound (or high Wells + positive D-dimer pending US)', description: 'Treat as DVT', next: 'uls-dvt-verdict', urgency: 'urgent' },
            { label: 'Low Wells + negative D-dimer (or negative US)', description: 'DVT excluded \u2014 move on', next: 'uls-dvt-excluded', urgency: 'routine' },
        ],
        citation: [6],
        summary: 'Wells + D-dimer + US: low Wells & neg D-dimer excludes; chest symptoms → screen PE; confirmed DVT → anticoagulate.',
        safetyLevel: 'warning',
    },
    {
        id: 'uls-pe-verdict',
        type: 'result',
        module: 2,
        title: 'Concurrent PE — Work It Up Now',
        body: 'A swollen leg with chest symptoms or hypoxia is a **pulmonary embolism** until excluded. Open [PE Treatment](#/tree/pe-treatment) for the full pathway.\n\n**Next steps:**\n- Assess hemodynamic stability; **if unstable / massive PE, this is a resuscitation** (consider thrombolysis).\n- CT pulmonary angiography (or V/Q) to confirm; ECG, troponin, and echo help risk-stratify (RV strain).\n- **Start anticoagulation** unless contraindicated while the workup proceeds; do not wait for the leg ultrasound.\n- A confirmed DVT + PE is the same treatment thread \u2014 anticoagulate and risk-stratify.',
        recommendation: 'Screen/confirm PE (CTPA), assess stability (thrombolysis if unstable), start anticoagulation while working up; do not wait for leg US.',
        citation: [6],
        next: 'uls-dvt-verdict',
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'uls-dvt-verdict',
        type: 'result',
        module: 2,
        title: 'DVT — Anticoagulate + Risk-Stratify',
        body: 'Open [DVT](#/tree/dvt) for the full pathway.\n\n**Next steps:**\n- **Start anticoagulation** (DOAC first-line for most; LMWH/heparin where a DOAC is unsuitable \u2014 pregnancy, severe renal disease, active cancer per shared decision) unless a contraindication exists.\n- **Determine disposition:** most uncomplicated lower-extremity DVTs are managed as outpatients; admit for phlegmasia, extensive iliofemoral clot, high bleeding risk, poor follow-up, or concurrent PE with RV strain.\n- Consider whether an **unprovoked** DVT warrants a malignancy/thrombophilia workup on follow-up.\n- Provocation review, leg elevation, and return precautions (worsening swelling, chest symptoms).',
        recommendation: 'Anticoagulate (DOAC first-line) + risk-stratify for outpatient vs admission; consider unprovoked-DVT workup; return precautions for PE.',
        citation: [6],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'uls-dvt-excluded',
        type: 'result',
        module: 2,
        title: 'DVT — Excluded',
        body: 'A low Wells score with a negative high-sensitivity D-dimer (or a negative compression ultrasound) excludes DVT with a high negative predictive value. **If the initial ultrasound was negative but clinical suspicion is high, arrange a repeat ultrasound in ~1 week** (to catch propagating calf-vein thrombus).\n\nReturn to the hub for the next differential (benign mimics).',
        recommendation: 'DVT excluded by low Wells + negative D-dimer (or negative US); repeat US in ~1 week if suspicion remains high.',
        citation: [6],
        next: 'uls-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- RIGHT-HEART FAILURE (asymmetric) --------------------
    {
        id: 'uls-rhf-entry',
        type: 'question',
        module: 2,
        title: 'Right-Heart Failure — Systemic Gate',
        body: '**Heart failure classically causes bilateral edema, but it can present asymmetrically** (dependent positioning, prior DVT, venous insufficiency, or unilateral lymphatic disease). Suspect a cardiac driver with dyspnea, orthopnea, a raised JVP, an S3, hepatomegaly, or a known cardiac history. **Do NOT anchor on "cardiac edema" and miss a superimposed DVT** \u2014 they coexist, and stasis in the failing patient raises DVT risk.',
        options: [
            { label: 'Dyspnea / raised JVP / cardiac history + edema, DVT/limb-threat excluded', description: 'Treat as right-heart failure', next: 'uls-rhf-verdict', urgency: 'urgent' },
            { label: 'No cardiopulmonary signs / not the picture', description: 'RHF unlikely \u2014 move on', next: 'uls-rhf-excluded', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Asymmetric edema can still be cardiac (dyspnea, raised JVP, S3); do not miss a superimposed DVT.',
        safetyLevel: 'warning',
    },
    {
        id: 'uls-rhf-verdict',
        type: 'result',
        module: 2,
        title: 'Right-Heart Failure — Treat the Pump',
        body: 'Open [Right-Heart Failure](#/tree/right-heart-failure) and [CHF Exacerbation](#/tree/chf-exacerbation) for the full pathways.\n\n**Next steps:**\n- Work up the cardiac cause: ECG, chest imaging, BNP/NT-proBNP, troponin, and bedside/formal echo (RV size/function, valvular disease, pulmonary hypertension).\n- Treat congestion (diuresis) while respecting preload-dependent RV physiology; treat the underlying driver (ischemia, PE, pulmonary hypertension, valvular disease).\n- **Still exclude a concurrent DVT** if the swelling is asymmetric \u2014 a failing, immobile patient is prothrombotic.\n- Admit / cardiology as dictated by acuity and the underlying cause.',
        recommendation: 'Confirm and treat the cardiac cause (echo, diuresis, treat driver) while excluding a superimposed DVT in the asymmetric leg.',
        citation: [1],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'uls-rhf-excluded',
        type: 'result',
        module: 2,
        title: 'Right-Heart Failure — Unlikely',
        body: 'No dyspnea, no raised JVP, and no cardiac history \u2014 a cardiac driver is unlikely for this asymmetric swelling.\n\nReturn to the hub for the benign mimics.',
        recommendation: 'Cardiac cause unlikely without cardiopulmonary signs; proceed to the benign mimics.',
        citation: [1],
        next: 'uls-triage',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    // -------------------- BENIGN MIMICS (cellulitis / Baker cyst / venous — consult gap: plain-text) --------------------
    {
        id: 'uls-benign-entry',
        type: 'question',
        module: 2,
        title: 'Benign Mimics — Characterize',
        body: '**Once the limb- and life-threats are excluded, sort the common causes** \u2014 but keep the safety nets up (cellulitis can be early necrotizing infection; a "Baker cyst" swelling can hide a DVT).\n- **Cellulitis:** warm, tender, spreading erythema \u00B1 fever, often a portal of entry; **usually unilateral \u2014 bilateral lower-leg "cellulitis" is more often venous stasis dermatitis.**\n- **Ruptured Baker cyst:** sudden calf pain/swelling \u00B1 a crescent bruise below the malleolus (positive Crescent sign); ultrasound distinguishes it from DVT.\n- **Superficial thrombophlebitis:** a tender palpable cord along a superficial vein; assess proximity to the deep system.\n- **Chronic venous insufficiency / lymphedema:** chronic swelling, skin changes, often longstanding \u2014 a diagnosis of exclusion here.',
        options: [
            { label: 'Warm spreading erythema + tenderness \u00B1 fever', description: 'Cellulitis', next: 'uls-cellulitis-verdict', urgency: 'urgent' },
            { label: 'Sudden calf pain/swelling, DVT excluded on US, or chronic venous/lymphedema', description: 'Baker cyst / venous / lymphedema', next: 'uls-benign-verdict', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Sort benign mimics (cellulitis vs Baker cyst / venous / lymphedema); keep DVT and necrotizing infection safety nets up.',
    },
    {
        id: 'uls-cellulitis-verdict',
        type: 'result',
        module: 2,
        title: 'Cellulitis — Antibiotics + Reassess Safety Nets',
        body: '**Cellulitis** (no dedicated consult yet \u2014 manage here):\n\n- **Empiric antibiotics** covering streptococci \u00B1 staphylococci (add MRSA cover for purulence, penetrating trauma, or risk factors); mark the erythema border and reassess.\n- **Re-confirm this is NOT a necrotizing infection** \u2014 pain out of proportion, toxicity, crepitus, or rapid spread \u2192 back to the necrotizing branch and surgery.\n- **Exclude a coexisting DVT** if swelling is prominent \u2014 they can coexist and cellulitis is a DVT risk factor.\n- Elevation, treat the portal of entry (tinea, ulcers), analgesia; admit for systemic toxicity, immunocompromise, or failed outpatient therapy.\n- (Consult gap \u2014 managed in-hub.)',
        recommendation: 'Empiric strep\u00B1staph (MRSA if purulent) abx, mark and reassess; keep necrotizing-infection and DVT safety nets up; admit if toxic/failing.',
        citation: [1],
        next: 'uls-disposition',
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'uls-benign-verdict',
        type: 'result',
        module: 2,
        title: 'Baker Cyst / Venous / Lymphedema — Symptomatic Care + Follow-Up',
        body: '**Ruptured Baker cyst, superficial thrombophlebitis, chronic venous insufficiency, or lymphedema** (no dedicated consult yet \u2014 manage here) in a well patient with the emergencies excluded:\n\n- **Ruptured Baker cyst:** confirm with ultrasound (and exclude DVT), then symptomatic care \u2014 rest, ice, elevation, NSAIDs, compression; treat the underlying knee arthropathy.\n- **Superficial thrombophlebitis:** NSAIDs, warm compresses, compression; **ultrasound if it is near the saphenofemoral junction or extensive** (may warrant anticoagulation to prevent extension into the deep system).\n- **Chronic venous insufficiency / lymphedema:** compression therapy, skin care, elevation, and outpatient vascular/lymphedema follow-up; this is a diagnosis of exclusion once DVT and the emergencies are ruled out.\n- Return precautions for new/worsening swelling, chest symptoms, fever, or increasing pain.\n- (Consult gap \u2014 managed in-hub.)',
        recommendation: 'Symptomatic care + compression + outpatient follow-up for Baker cyst / venous / lymphedema; US-confirm and exclude DVT; treat superficial thrombophlebitis, anticoagulate if near the SFJ.',
        citation: [1],
        next: 'uls-disposition',
        confidence: 'recommended',
    },
    // ============================================================
    // Module 3 — Initial Bundle / Reassess
    // ============================================================
    {
        id: 'uls-rescue',
        type: 'info',
        module: 3,
        title: 'Initial Bundle',
        body: '**The swollen-leg work-up bundle (scale to acuity):**\n- **Focused exam:** pulses and skin color/temperature of BOTH legs, compartment tension, pain on passive stretch, calf circumference, portal of entry, and chest symptoms / hypoxia.\n- **Wells DVT score + D-dimer + compression ultrasound** \u2014 the DVT pathway (Wells in the toolbar).\n- **Vitals + qSOFA** if any toxicity; resuscitate and screen for necrotizing infection / sepsis.\n- **Bloods:** CBC, renal function/electrolytes, CK (compartment/crush), lactate if toxic; consider BNP and troponin if cardiac.\n- **Anticoagulation** early for confirmed DVT / ischemia / phlegmasia (unless contraindicated).\n- Analgesia; NPO + IV access for anyone potentially heading to the OR (ischemia, phlegmasia, necrotizing infection, compartment).',
        citation: [1],
        next: 'uls-reassess',
    },
    {
        id: 'uls-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess After the Bundle',
        body: 'After the focused exam, ultrasound, and initial labs \u2014 where does the patient stand?',
        options: [
            { label: 'Limb threat / necrotizing infection / PE / toxic', description: 'Escalate: OR / vascular / anticoagulate + admit', next: 'uls-imaging', urgency: 'critical' },
            { label: 'Stable, cause identified, benign or treatable', description: 'Move to disposition', next: 'uls-disposition', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'Limb threat / necrotizing infection / PE / toxic → escalate; stable + diagnosed → disposition.',
    },
    // ============================================================
    // Module 4 — Imaging
    // ============================================================
    {
        id: 'uls-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging',
        body: '**Match the study to the question:**\n- **Compression ultrasound with Doppler** \u2014 the primary test for DVT; also distinguishes a ruptured Baker cyst and assesses superficial veins.\n- **CT / CT angiography** \u2014 for acute limb ischemia (arterial anatomy) and CT pulmonary angiography for suspected PE; can map necrotizing infection or an iliofemoral clot (phlegmasia) if it will not delay intervention.\n- **Compartment pressure measurement** \u2014 not imaging, but the confirmatory test for uncertain compartment syndrome (delta pressure <30 mmHg).\n- **Do NOT delay definitive surgery** (ischemia, phlegmasia thrombectomy, necrotizing-infection debridement, fasciotomy) for imaging when the exam is convincing.',
        citation: [1],
        next: 'uls-disposition',
    },
    // ============================================================
    // Module 5 — Disposition
    // ============================================================
    {
        id: 'uls-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Where does this patient go?',
        options: [
            { label: 'Limb threat / necrotizing infection / massive DVT-PE / toxic', description: 'OR / vascular / admit', next: 'uls-dispo-admit', urgency: 'critical' },
            { label: 'Uncomplicated DVT needing anticoagulation, or borderline', description: 'Observe / short stay / start anticoagulation', next: 'uls-dispo-observe', urgency: 'urgent' },
            { label: 'Benign mimic / cellulitis suitable for outpatient care', description: 'Discharge with follow-up', next: 'uls-dispo-discharge', urgency: 'routine' },
        ],
        citation: [1],
        summary: 'OR/admit the limb-threats; observe/anticoagulate the DVTs and borderlines; discharge benign/cellulitis with follow-up.',
    },
    {
        id: 'uls-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit / OR',
        body: '**To the OR / admit** the limb- or life-threat.\n\n- **Acute limb ischemia \u2192 emergent revascularization** (embolectomy / thrombolysis / bypass) + heparin.\n- **Phlegmasia \u2192 heparin + catheter-directed thrombolysis/thrombectomy**, limb elevation, resuscitation.\n- **Necrotizing infection \u2192 emergent debridement** + broad-spectrum abx + resuscitation.\n- **Compartment syndrome \u2192 emergent fasciotomy.**\n- **Massive/high-risk DVT-PE \u2192 admit** for anticoagulation \u00B1 thrombolysis and monitoring.\n- Ongoing resuscitation, analgesia, and specialty (vascular / surgery / cardiology) management; ICU for unstable patients.',
        recommendation: 'OR/emergent intervention for ischemia / phlegmasia / necrotizing infection / compartment syndrome; admit high-risk DVT-PE; ICU if unstable.',
        citation: [1],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'uls-dispo-observe',
        type: 'result',
        module: 5,
        title: 'Observe / Short Stay',
        body: '**Observation / short stay** for the borderline patient \u2014 e.g., a confirmed DVT started on anticoagulation who needs teaching and follow-up arranged, a limb where ischemia/compartment is not fully excluded and needs serial exams, or cellulitis borderline for outpatient failure.\n\n- Serial exams (pulses, compartments), repeat ultrasound if the picture changes, and specialist input before disposition.\n- Ensure reliable, timely follow-up and clear return precautions before any discharge; treat pain.',
        recommendation: 'Short observation + serial exams + specialist input; arrange anticoagulation follow-up, then admit or discharge with tight follow-up.',
        citation: [1],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'uls-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge',
        body: '**Discharge** the well patient with a clear plan.\n\n- **Uncomplicated DVT:** DOAC started, outpatient management confirmed, anticoagulation follow-up, and **strict PE return precautions** (chest pain, dyspnea, syncope).\n- **Cellulitis:** empiric antibiotics, erythema border marked, elevation, follow-up in 48\u201372 h, and return precautions for spread/toxicity (reconsider necrotizing infection) or worsening swelling (reconsider DVT).\n- **Baker cyst / venous / lymphedema:** symptomatic care, compression, and outpatient vascular/lymphedema follow-up.\n- Written return precautions and a named follow-up; explicit DVT/PE and limb-threat red-flag counseling.',
        recommendation: 'Discharge benign/uncomplicated patients with anticoagulation or antibiotics as indicated, compression, and explicit PE / limb-threat return precautions.',
        citation: [1],
        confidence: 'recommended',
    },
];
export const UNILATERAL_LEG_SWELLING_HUB_CRITICAL_ACTIONS = [
    { text: 'Sick Check first — a cold pulseless limb, a tense dusky limb, or pain out of proportion overrides the "it\u2019s probably a DVT" reflex', nodeId: 'uls-sick-check' },
    { text: 'Cold / pale / pulseless painful limb → acute limb ischemia: immediate heparin + emergent vascular surgery, keep limb warm/dependent', nodeId: 'uls-ischemia-entry' },
    { text: 'Pain out of proportion + toxicity + crepitus/skin necrosis → necrotizing infection: resuscitate + emergent debridement, do not wait for imaging', nodeId: 'uls-necfasc-entry' },
    { text: 'Tense compartment + pain on passive stretch → compartment syndrome: emergent fasciotomy; pulselessness is a LATE sign, do not wait for it', nodeId: 'uls-compartment-entry' },
];
export const UNILATERAL_LEG_SWELLING_HUB_CITATIONS = [
    { num: 1, text: 'Ely JW, Osheroff JA, Chambliss ML, Ebell MH. Approach to Leg Edema of Unclear Etiology. J Am Board Fam Med. 2006;19(2):148-160; Tintinalli\u2019s Emergency Medicine, 9th ed. (swollen/painful extremity).' },
    { num: 2, text: 'Björck M, Earnshaw JJ, et al. ESVS 2020 Clinical Practice Guidelines on the Management of Acute Limb Ischaemia. Eur J Vasc Endovasc Surg. 2020;59(2):173-218; Rutherford classification of acute limb ischemia.' },
    { num: 3, text: 'Chinsakchai K, et al. Trends in Management of Phlegmasia Cerulea Dolens. Vasc Endovascular Surg. 2011;45(1):5-14; Mumoli N, Invernizzi C, Luschi R. Phlegmasia cerulea dolens. Circulation. 2012;125(8):1056-1057.' },
    { num: 4, text: 'Stevens DL, Bisno AL, et al. IDSA Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections: 2014 Update. Clin Infect Dis. 2014;59(2):e10-e52.' },
    { num: 5, text: 'von Keudell AG, Weaver MJ, et al. Diagnosis and Treatment of Acute Extremity Compartment Syndrome. Lancet. 2015;386(10000):1299-1310; McQueen MM. Delta pressure threshold (<30 mmHg) for fasciotomy.' },
    { num: 6, text: 'Lim W, Le Gal G, et al. American Society of Hematology 2018 Guidelines for Management of VTE: Diagnosis. Blood Adv. 2018;2(22):3226-3256; Wells PS, et al. Clinical model (Wells score) for DVT. Lancet. 1997;350:1795-1798.' },
];
export const UNILATERAL_LEG_SWELLING_HUB_NODE_COUNT = UNILATERAL_LEG_SWELLING_HUB_NODES.length;
export const UNILATERAL_LEG_SWELLING_HUB_MODULE_LABELS = [
    'Sick Check',
    'Rule In / Rule Out',
    'Initial Bundle / Reassess',
    'Imaging',
    'Disposition',
];
