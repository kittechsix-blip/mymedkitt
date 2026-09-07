// MedKitt — Electrocution & Lightning Injury Consult
// Scene & Resuscitation → Classify Exposure → Cardiac Evaluation → High-Voltage Deep Tissue → Lightning → Special Populations → Disposition
// 7 modules, 30 nodes total.
export const ELECTROCUTION_NODES = [
    // =====================================================================
    // MODULE 1: SCENE & RESUSCITATION
    // =====================================================================
    {
        id: 'electrocution-start',
        type: 'info',
        module: 1,
        title: 'Electrocution & Lightning: Scene Safety',
        body: '[Electrocution Steps Summary](#/info/electrocution-summary) — one-screen checklist for the whole consult.\n\n**Power off before touch.** Confirm the source is de-energized (utility company, breaker, or a trained rescuer with insulated tools). Downed high-voltage lines energize the ground for several meters — nobody approaches until the line is confirmed dead. A rescuer who touches an energized patient becomes the next casualty.\n\n**Treat every unknown exposure as high voltage** until the voltage is confirmed — line workers usually know; otherwise the utility can identify the line.\n\n**Electrical injury is a burn-trauma patient.** Tetany can throw a patient or fracture bone, and lightning victims are often found down. Assume blunt trauma until disproven.',
        citation: [5, 12],
        next: 'elec-arrest',
        summary: 'Power off first — rescuer safety, then treat as burn-trauma patient',
        safetyLevel: 'critical',
    },
    {
        id: 'elec-arrest',
        type: 'question',
        module: 1,
        title: 'Pulseless or Apparently Dead?',
        body: 'Electrical current and lightning cause **primary cardiac and respiratory arrest** in otherwise healthy people. Lightning classically produces **asystole** (simultaneous depolarization of the whole myocardium); high-voltage AC more often produces **VF**.\n\nApparently dead victims of electrical injury have a **better prognosis than any other arrest population** — the heart frequently restarts on its own, and the patient dies only because nobody breathed for them.',
        options: [
            {
                label: 'Yes — pulseless, apneic, or unresponsive',
                next: 'elec-resus',
                urgency: 'critical',
            },
            {
                label: 'No — pulse present',
                next: 'elec-primary',
            },
        ],
        citation: [3, 13],
        summary: 'Electrical arrest has the best prognosis of any arrest — resuscitate aggressively',
    },
    {
        id: 'elec-resus',
        type: 'info',
        module: 1,
        title: 'Resuscitation — Reverse Triage',
        body: '**Lightning multi-casualty = REVERSE TRIAGE.** Treat the apparently dead FIRST. Victims who are breathing and moving will almost certainly survive without immediate intervention; the pulseless victim is the one who can be saved — and only right now (WMS 1C).\n\n**Ventilate, ventilate, ventilate.** Cardiac automaticity usually returns before the medullary respiratory center recovers. A patient who regains a pulse but stays apneic will arrest again from hypoxia within minutes. Provide rescue breathing / BVM until spontaneous respirations return — this is the single most important intervention.\n\n**Prolonged CPR is reasonable.** Young hearts, no underlying disease, and a reversible mechanism justify continuing well beyond usual termination thresholds. Run standard ACLS for VF/asystole (WMS 1B) — [Cardiac Arrest](#/tree/cardiac-arrest).\n\n**Fixed, dilated pupils are NOT a death sign** after lightning — transient autonomic dysfunction mimics brain death. Do not use pupils to stop resuscitation.\n\n**Consider traumatic causes** alongside ACLS: tension pneumothorax and hemorrhage from the throw or fall.',
        citation: [3, 5, 13],
        next: 'elec-primary',
        summary: 'Reverse triage — treat the apparently dead first; ventilate after ROSC',
        safetyLevel: 'critical',
    },
    {
        id: 'elec-primary',
        type: 'info',
        module: 1,
        title: 'Primary Survey',
        body: '**C-spine precautions** for any fall, throw, tetanic contraction, or unwitnessed event — [Cervical Spine Trauma](#/tree/cervical-spine). Lightning and high-voltage AC both cause spinal fractures from violent muscle contraction.\n\n**Airway/Breathing:** oral and facial burns, respiratory arrest from diaphragm and chest-wall tetany, pulmonary contusion from blast.\n\n**Circulation:** large-bore IV access (through burned skin if needed). Start balanced crystalloid at **500 mL/h adult** (250 mL/h age 6–13, 125 mL/h under 6) during the primary survey; titrate later by urine output.\n\n**Disability:** GCS, pupils, gross motor and sensory exam of every limb — document baseline neurovascular status now; it anchors the hourly compartment checks that follow.\n\n**Exposure:** strip and log-roll. Look for contact points on **every surface** including scalp, axillae, perineum, and soles. Remove rings, watches, and metal — edema will make removal impossible later.',
        citation: [5, 14],
        next: 'elec-special',
        summary: 'C-spine precautions, IV access, baseline neuro exam, find every contact point',
    },
    // =====================================================================
    // MODULE 2: CLASSIFY THE EXPOSURE
    // =====================================================================
    {
        id: 'elec-special',
        type: 'question',
        module: 2,
        title: 'Special Population?',
        body: 'Two groups change the workup before the exposure is even classified.',
        options: [
            {
                label: 'Pregnant',
                description: 'Any gestation — fetal monitoring rules apply at ≥20 weeks',
                next: 'elec-pregnancy',
            },
            {
                label: 'Child with oral commissure (cord-bite) burn',
                description: 'Toddler who bit or sucked a live cord or plug',
                next: 'elec-cord-bite',
            },
            {
                label: 'Neither',
                next: 'elec-classify',
            },
        ],
        summary: 'Pregnancy and pediatric cord bite route to dedicated pathways',
    },
    {
        id: 'elec-classify',
        type: 'question',
        module: 2,
        title: 'Classify the Exposure',
        body: 'Voltage is the surrogate for current and therefore for tissue destruction. Everything downstream — labs, monitoring, imaging, disposition — keys off this answer.\n\n• **Low voltage <1000 V:** household 120/240 V AC, most workplace outlets\n• **High voltage ≥1000 V:** power lines, transformers, rail, industrial\n• **Lightning:** ultra-high voltage, microsecond DC — a different disease\n• **Conducted electrical weapon (TASER):** 50,000 V open-circuit but ~2 mA delivered; injury is from probes and falls, not current',
        options: [
            {
                label: 'Low voltage (<1000 V)',
                next: 'elec-exposure',
            },
            {
                label: 'High voltage (≥1000 V)',
                next: 'elec-hv-start',
                urgency: 'critical',
            },
            {
                label: 'Lightning',
                next: 'elec-lightning-start',
                urgency: 'urgent',
            },
            {
                label: 'Conducted electrical weapon (TASER / stun device)',
                next: 'elec-cew',
            },
        ],
        citation: [5, 12],
        summary: '<1000 V low, ≥1000 V high, lightning and CEW are separate diseases',
    },
    {
        id: 'elec-exposure',
        type: 'info',
        module: 2,
        title: 'Low Voltage — Exposure Features That Raise Risk',
        body: 'Low voltage kills through **current × time**, not voltage. Ask specifically about each feature — they decide whether the patient needs telemetry.\n\n• **AC vs DC:** household AC (50–60 Hz) causes **tetany** — the hand grips the source and cannot let go (let-go threshold ~15 mA AC; children 3–5 mA). DC throws the victim off after a single contraction.\n• **Current path:** hand-to-hand or hand-to-foot crosses the heart (**transthoracic**). Hand-to-same-side-foot or leg-to-leg is lower risk.\n• **Wet contact:** water drops skin resistance ~100-fold — household voltage in a bathtub delivers fibrillation-range current.\n• **Tetany or prolonged contact:** current is additive over time; 100 mA for 3 s equals 900 mA for 0.3 s.\n• **Loss of consciousness** at the scene — even brief.\n\nLook for **contact marks** at both ends of the path. With AC every contact point is both entry and exit. A skin mark can be a trivial blister or a punched-out, painless, full-thickness crater — the size of the mark says nothing about the current that passed.',
        images: [
            { src: 'images/electrocution/electrical-burn-hand.jpg', alt: 'Electrical burn on the palm and fingers of a hand showing erythema and bullae from arcing current', caption: 'Electrical burn on the hand — erythema and bullae from arcing current; the internal injury between contact points can far exceed what the skin shows. NIOSH, US Government work (Public Domain), via Wikimedia Commons.' },
            { src: 'images/electrocution/current-mark-20kv-arc.jpg', alt: 'Small punched-out current mark on skin caused by a 20 kV electrical arc', caption: 'Current mark ("Strommarke") from a 20 kV arc — a small, painless, full-thickness contact point. Public Domain, via Wikimedia Commons.' },
        ],
        citation: [5, 12],
        next: 'elec-ecg',
        summary: 'AC tetany, transthoracic path, wet skin, prolonged contact, LOC = higher risk',
    },
    // =====================================================================
    // MODULE 3: CARDIAC EVALUATION & MONITORING DECISION
    // =====================================================================
    {
        id: 'elec-ecg',
        type: 'question',
        module: 3,
        title: '12-Lead ECG — Everyone',
        body: 'Obtain a 12-lead on **every** electrical and lightning exposure regardless of voltage. About one in four patients has an abnormality on arrival (26% in the pooled low-voltage series; sinus tachycardia, sinus bradycardia, nonspecific ST changes, PVCs). Almost all are benign and present on the first tracing.\n\n**Measure the QTc** — open the QTc calculator from the toolbar. Prolonged QT and new AF are the findings that warrant monitoring.\n\n**Troponin is NOT a routine test.** It has no correlation with outcome in stable patients with a normal ECG. Order it only for chest pain, hemodynamic instability, or ischemic ECG changes — in that subgroup a positive troponin predicts major adverse cardiac events (specificity 98%, +LR 37) and should prompt echocardiography.',
        options: [
            {
                label: 'Normal ECG (including normal QTc)',
                next: 'elec-monitor-decision',
            },
            {
                label: 'Abnormal — arrhythmia, ischemic change, QTc prolongation, new AF',
                next: 'elec-monitor',
                urgency: 'urgent',
            },
            {
                label: 'Post-arrest or hemodynamically unstable',
                next: 'elec-monitor',
                urgency: 'critical',
            },
        ],
        calculatorLinks: [
            { id: 'qtc-calculator', label: 'QTc Calculator' },
        ],
        citation: [1, 2, 5, 6],
        summary: 'ECG on everyone; troponin only for chest pain, instability, or ischemic ECG',
    },
    {
        id: 'elec-monitor-decision',
        type: 'question',
        module: 3,
        title: 'Normal ECG — Does This Patient Need Telemetry?',
        body: 'Two large cohorts (480 and 465 patients) and a systematic review of 1,234 low-voltage patients found **zero delayed malignant arrhythmias** in patients whose admission ECG was normal. Arrhythmias that matter are present on the first tracing. Routine monitoring of the low-risk patient is unnecessary.\n\n**Any ONE of these mandates 24 h telemetry:**\n• High voltage (≥1000 V) or lightning\n• Loss of consciousness (any duration)\n• Cardiac arrest at any point\n• Chest pain, dyspnea, or palpitations\n• Known cardiac disease or prior arrhythmia\n• Transthoracic current path, wet contact, or tetany / prolonged contact\n• Pregnancy\n\nOpen the **Admit?** toolbar checklist to run the criteria.',
        options: [
            {
                label: 'None present — low voltage, no LOC, no symptoms, low-risk path',
                next: 'elec-no-monitor',
            },
            {
                label: 'One or more present',
                next: 'elec-monitor',
                urgency: 'urgent',
            },
        ],
        calculatorLinks: [
            { id: 'electrical-monitoring-criteria', label: 'Monitoring Criteria Checklist' },
        ],
        citation: [1, 2, 4, 5, 14],
        summary: 'Normal ECG + no criteria = no telemetry; any criterion = 24 h monitoring',
    },
    {
        id: 'elec-no-monitor',
        type: 'info',
        module: 3,
        title: 'No Monitoring Required',
        body: 'Low-voltage exposure, awake, asymptomatic, normal ECG with normal QTc, no loss of consciousness, no high-risk path. This patient can be **discharged directly from the ED** after wound care — no telemetry, no troponin, no observation period. The historical practice of routine 4–6 h or overnight monitoring for household shocks is not supported.\n\nDelayed presentations (paresthesias, weakness, cataract) still occur after low-voltage injury, so the burn-center follow-up visit and return precautions in disposition still apply.',
        citation: [1, 2, 4, 11],
        next: 'elec-wound',
        summary: 'Discharge from ED after wound care — no telemetry or troponin needed',
    },
    {
        id: 'elec-monitor',
        type: 'info',
        module: 3,
        title: 'Continuous Telemetry × 24 h',
        body: 'Admit to a **monitored bed for 24 h from the time of injury**. High-voltage patients and anyone with critical-care needs go to the burn ICU; a stable low-voltage patient who only needs monitoring can go to telemetry or burn step-down.\n\n• **Troponin + echocardiography** if chest pain, instability, or ischemic ECG — treat myocardial injury as you would ACS with a non-obstructive mechanism; cardiology consult.\n• **Repeat ECG** at 24 h and with any symptom.\n• **Correct potassium and magnesium** promptly — rhabdomyolysis-driven hyperkalemia is the arrhythmia driver after high-voltage injury: [Potassium Disorders](#/tree/potassium).\n• **QTc prolongation** without arrhythmia: avoid QT-prolonging antiemetics; recheck at 24 h.',
        citation: [3, 5, 6, 14],
        next: 'elec-wound',
        summary: 'Telemetry 24 h; troponin/echo only if symptomatic; fix K and Mg',
    },
    // =====================================================================
    // MODULE 4: HIGH-VOLTAGE DEEP TISSUE INJURY
    // =====================================================================
    {
        id: 'elec-hv-start',
        type: 'info',
        module: 4,
        title: 'High Voltage — The Skin Is the Tip of the Iceberg',
        body: 'Current follows the lowest-resistance path: **nerve > vessel > muscle > skin > tendon > fat > bone**. Bone heats like a resistor and cooks the deep muscle around it while the skin looks intact. **TBSA at the contact points grossly underestimates the injury** — a 2% skin burn can hide a dead forearm compartment.\n\nDistal limbs (hands, forearms, feet, lower legs) take the highest current density because their cross-section is small — these are the compartments that die.\n\n**Tissue destruction is progressive** for days. Depth and extent will change; early grafting fails. Wound check at 48–72 h is not optional.',
        images: [
            { src: 'images/electrocution/entrance-wound-back.jpg', alt: 'Electrical burn contact wound on the back of a worker', caption: 'High-voltage contact wound on the back. OSHA, US Government work (Public Domain), via Wikimedia Commons. Low-resolution source image.' },
            { src: 'images/electrocution/exit-wound-foot.jpg', alt: 'Electrical exit wound on the sole of a foot from high-voltage injury; the foot was later amputated', caption: 'Exit wound on the foot from the same class of injury — the foot suffered massive internal injury and was later amputated despite a small skin wound. OSHA, US Government work (Public Domain), via Wikimedia Commons.' },
        ],
        citation: [5, 12, 14],
        next: 'elec-hv-labs',
        summary: 'Small skin wound, dead deep muscle — TBSA underestimates high-voltage injury',
        safetyLevel: 'critical',
    },
    {
        id: 'elec-hv-labs',
        type: 'info',
        module: 4,
        title: 'High-Voltage Labs & Imaging',
        body: '**Labs now and trended:**\n• **CK** on arrival and q6–12 h for 24–48 h — >1000 IU/L (5× normal) defines rhabdomyolysis; peak is usually 24–72 h\n• **Urinalysis for myoglobin** — dipstick heme-positive with no RBCs on microscopy = myoglobinuria; pigmented (tea/cola) urine is late\n• **BMP q6 h** for potassium and creatinine trend; **lactate**; CBC; coags; type & screen\n• **Troponin only if symptomatic** — no correlation with outcome otherwise\n\n**Imaging — the "traumagram":** every high-voltage patient gets trauma imaging by mechanism (throw, fall, tetany). CT head and C-spine if altered, any LOC, or neck pain. Plain films of any painful joint or long bone. MRI later defines deep soft-tissue necrosis if the surgical plan needs it.\n\nOpen the **Rhabdo** toolbar tool (McMahon score) once the first CK and creatinine return.',
        calculatorLinks: [
            { id: 'mcmahon-rhabdo', label: 'McMahon Rhabdo Score' },
        ],
        citation: [5, 14],
        next: 'elec-hv-fluids',
        summary: 'CK, urine myoglobin, BMP q6h, lactate, trauma imaging by mechanism',
    },
    {
        id: 'elec-hv-fluids',
        type: 'info',
        module: 4,
        title: 'Fluids — Titrate to Urine Output, Not TBSA',
        body: '**Do NOT resuscitate high-voltage injury by Parkland/TBSA.** The visible burn is a fraction of the injured tissue and the formula underestimates volume. Start balanced crystalloid (LR) and titrate to a urine-output target:\n\n• **Target UOP 1 mL/kg/h** (roughly 75–100 mL/h adult) when the urine is clear\n• **Target 1–2 mL/kg/h if myoglobinuria** or any ambiguity — until the diagnosis is certain\n• Foley in every high-voltage patient; hourly UOP\n\n**No diuretics before the patient is volume-resuscitated.** Mannitol, furosemide, and bicarbonate are burn-attending decisions after volume is restored, not ED reflexes — they mask under-resuscitation and worsen hypovolemia.\n\nIf the burn center uses a formula to set the starting rate, the Vanderbilt convention is Rule of 10s with **20% added to TBSA** to account for hidden deep injury, then titrate.\n\nRhabdomyolysis, AKI, and hyperkalemia management: [Rhabdomyolysis](#/tree/rhabdomyolysis).',
        calculatorLinks: [
            { id: 'mcmahon-rhabdo', label: 'McMahon Rhabdo Score' },
            { id: 'tbsa-adult', label: 'TBSA (Rule of 9s)' },
        ],
        citation: [5, 12, 14],
        next: 'elec-hv-compartment',
        summary: 'LR titrated to UOP 1 mL/kg/h (1–2 if myoglobinuria); no diuretics until resuscitated',
        safetyLevel: 'warning',
    },
    {
        id: 'elec-hv-compartment',
        type: 'question',
        module: 4,
        title: 'Compartment Checks — Hourly',
        body: 'Examine every limb along the current path **every hour** and document. The classic 5 Ps are **unreliable** after electrical injury — paresthesias come from nerve injury and distracting injuries are everywhere. Pulselessness and paralysis are **late** signs; the diagnosis must precede them.\n\n**Findings that count:**\n• Tense, woody compartment to palpation\n• Pain with passive flexion/extension of the distal digits\n• Fixed flexion posture\n• Progressive sensory or motor loss\n• Compartment pressure >30 mmHg or delta-P (diastolic − compartment) <30 mmHg if measured\n\nRising CK despite adequate UOP is a soft sign of ongoing muscle death.',
        options: [
            {
                label: 'Yes — any finding above',
                next: 'elec-hv-fasciotomy',
                urgency: 'critical',
            },
            {
                label: 'No — soft compartments, exam unchanged',
                next: 'elec-hv-trauma',
            },
        ],
        citation: [5, 14],
        summary: 'Hourly compartment checks; 5 Ps unreliable — tense compartment or stretch pain is enough',
    },
    {
        id: 'elec-hv-fasciotomy',
        type: 'info',
        module: 4,
        title: 'Emergent Fasciotomy / Escharotomy',
        body: '**Call surgery now** — burn, trauma, or orthopedic surgery, whoever is fastest. Fasciotomy is emergent; the amputation rate after high-voltage injury is the highest of any burn mechanism and delay is the driver.\n\n• **Fasciotomy** for compartment syndrome — high-voltage injury spares overlying skin, so a compartment can be dead under normal-looking skin; escharotomy alone is insufficient\n• **Escharotomy** for circumferential full-thickness cutaneous burns with vascular compromise — technique in [Burns](#/tree/burns)\n• Elevate the limb to heart level (not above) while awaiting the OR; continue q1 h neurovascular checks on the other limbs\n\n**Never fasciotomy for keraunoparalysis alone** — the cold, mottled, pulseless limb after lightning is vasospasm and resolves in hours. Reserve surgery for a tense compartment or a documented pressure.',
        citation: [3, 5, 14],
        next: 'elec-hv-trauma',
        summary: 'Emergent surgical consult — fasciotomy, not just escharotomy; never for keraunoparalysis',
        safetyLevel: 'critical',
    },
    {
        id: 'elec-hv-trauma',
        type: 'info',
        module: 4,
        title: 'Associated Trauma, Tetanus & Analgesia',
        body: '**Tetany injuries** — violent contraction fractures bone without a fall:\n• **Posterior shoulder dislocation** — arm adducted and internally rotated, blocked external rotation; missed on AP film alone, get axillary or scapular-Y view — [Shoulder Dislocation](#/tree/shoulder-dislocation)\n• Scapular fractures, bilateral posterior shoulder dislocations, and vertebral compression fractures\n• Long-bone fractures and dislocations from the throw or fall\n\n**Tetanus prophylaxis** — electrical burns are tetanus-prone wounds. [Tdap booster](#/drug/tdap/wound) if last dose >5 years; add [Tetanus Immune Globulin](#/drug/tetanus-immune-globulin/post-exposure) in a different limb if <3 prior doses or unknown status.\n\n**Analgesia** is multimodal and generous — deep tissue injury hurts out of proportion to the skin:\n• [Fentanyl](#/drug/fentanyl/burns iv) or [Morphine](#/drug/morphine/burns adult) IV titrated\n• [Ketamine](#/drug/ketamine/burns sub-dissociative) sub-dissociative for opioid-sparing analgesia and dressing changes\n• **Avoid NSAIDs** — AKI risk with rhabdomyolysis and pending operative intervention\n• [Ondansetron](#/drug/ondansetron/iv) for opioid nausea — recheck QTc first if it was borderline',
        citation: [5, 12, 14],
        next: 'elec-ecg',
        summary: 'Posterior shoulder dislocation, spine fractures; Tdap ± TIG; opioid + ketamine, no NSAIDs',
    },
    // =====================================================================
    // MODULE 5: LIGHTNING-SPECIFIC
    // =====================================================================
    {
        id: 'elec-lightning-start',
        type: 'info',
        module: 5,
        title: 'Lightning — A Different Disease',
        body: 'Lightning is a **microsecond DC discharge** of enormous voltage. Contact is too brief for the deep resistive heating of high-voltage AC; most current **flashes over** the body surface. Deep burns, rhabdomyolysis, and compartment syndrome are **uncommon** — the lethal problems are cardiorespiratory arrest and neurologic injury.\n\n**Six mechanisms:** direct strike (~5%), **side flash** from a struck object (~33%), contact with a struck object, **ground current** through the legs (~50%, the usual multi-casualty mechanism), upward streamer, and **blast** injury from the shock wave (TM rupture, contusion, blunt trauma).\n\n**Fluids — do NOT run a burn resuscitation.** Flashover burns are superficial; aggressive volume causes cerebral edema in a brain that may already be injured. Maintenance rate only unless there are deep burns, hypotension, or myoglobinuria.\n\n**Lichtenberg figures** — feathery, fern-like erythema — are pathognomonic of lightning, appear within an hour, and **fade within 24 h**. They are not burns and need no treatment; photograph them for the record.',
        images: [
            { src: 'images/electrocution/lichtenberg-figure-leg.jpg', alt: 'Fern-like branching red Lichtenberg figure on the leg of a person affected by a nearby lightning strike', caption: 'Lichtenberg figure — branching erythema on the leg after a nearby lightning strike; pathognomonic and fades within 24 h. James Heilman, MD, CC BY-SA 3.0, via Wikimedia Commons.' },
        ],
        citation: [3, 13],
        next: 'elec-lightning-neuro',
        summary: 'Flashover, not deep burn — no burn-formula fluids; Lichtenberg figures fade in 24 h',
        safetyLevel: 'warning',
    },
    {
        id: 'elec-lightning-neuro',
        type: 'question',
        module: 5,
        title: 'Neurologic Findings?',
        body: 'Lightning injures the brain and cord directly and indirectly (arrest, blast, fall).\n\n**Keraunoparalysis:** transient paralysis — usually both legs, sometimes arms — with **cold, mottled, blue, pulseless** limbs from intense vasospasm and sympathetic instability. Resolves over hours (occasionally up to 24 h). It is **not** compartment syndrome and **not** a cord injury — but it can mimic both, and a keraunoparalysis patient can also have a real spinal fracture from the fall.',
        options: [
            {
                label: 'Altered mental status, focal deficit, seizure, or paralysis that is not improving',
                next: 'elec-lightning-ct',
                urgency: 'critical',
            },
            {
                label: 'Neurologically intact, or keraunoparalysis already resolving',
                next: 'elec-lightning-exam',
            },
        ],
        citation: [3, 13],
        summary: 'Keraunoparalysis = cold mottled pulseless limbs, resolves in hours — not a fasciotomy',
    },
    {
        id: 'elec-lightning-ct',
        type: 'info',
        module: 5,
        title: 'CT Head ± Spine, Neurology',
        body: '**Non-contrast CT head** for any altered mental status, focal deficit, seizure, or persistent LOC (WMS 1C). Lightning causes intracranial hemorrhage — classically **basal ganglia and brainstem** — plus cerebral edema, hypoxic injury from the arrest, and skull fracture from the fall.\n\n**CT C-spine and thoracic spine** for persistent paralysis, spine tenderness, or any fall — the cervical and thoracic cord are the segments most often damaged; keep the collar on until cleared.\n\n**Seizures:** treat per [Status Epilepticus](#/tree/status-epilepticus); no routine prophylaxis.\n\n**Neurology consult** early for persistent deficits — late-onset myelopathy and motor neuron syndromes occur weeks later, and the patient needs a documented baseline exam.',
        citation: [3, 13, 14],
        next: 'elec-lightning-exam',
        summary: 'CT head for AMS/deficit; CT spine for persistent paralysis or fall; neurology early',
    },
    {
        id: 'elec-lightning-exam',
        type: 'info',
        module: 5,
        title: 'Ears, Eyes, Skin — The Lightning Exam',
        body: 'Open the **Lightning Exam** toolbar checklist and complete every item — these are the injuries that get missed in the resuscitation bay.\n\n**Otoscopy on everyone — mandatory.** Tympanic membrane rupture from the blast occurs in **50–80%** of lightning victims. Document both TMs; hearing loss, vertigo, and tinnitus are common. Most perforations heal conservatively; ENT follow-up for all ruptures (WMS 1C).\n\n**Eyes:** visual acuity, pupils, slit-lamp or penlight for **hyphema**, corneal injury, and retinal/optic-nerve damage. Counsel every patient that **cataracts** — usually bilateral — can develop anywhere from days to years later; ophthalmology baseline exam before discharge (WMS 1C).\n\n**Skin:** flashover burns are superficial and usually need only standard wound care. Look for **deep contact burns** under metal (belt buckles, jewelry, zippers, underwire) and at the scalp and feet — those are the ones that need burn care.\n\n**Blast:** examine for pulmonary contusion, ruptured viscera, and long-bone fractures from the throw.',
        calculatorLinks: [
            { id: 'lightning-exam-checklist', label: 'Lightning Exam Checklist' },
        ],
        citation: [3, 13],
        next: 'elec-ecg',
        summary: 'Otoscopy mandatory (TM rupture 50–80%); eye exam and cataract counseling; check under metal',
    },
    // =====================================================================
    // MODULE 6: SPECIAL POPULATIONS
    // =====================================================================
    {
        id: 'elec-pregnancy',
        type: 'info',
        module: 6,
        title: 'Electrical Injury in Pregnancy',
        body: 'Amniotic fluid and the fetus are low-resistance and lie in the path of hand-to-foot current. Historical case series reported high fetal loss, but the only **prospective cohort** (31 exposed women, almost all household 110–220 V) found **28 healthy infants**, 2 spontaneous abortions, and 1 VSD — no different from controls. Household-voltage shock without maternal injury is reassuring; high-voltage and lightning exposures remain high risk.\n\n**Every pregnant patient:**\n• **≥20 weeks:** continuous fetal heart rate and tocodynamometry for **at least 4 h**, extended to 24 h for contractions, bleeding, abdominal pain, abnormal tracing, or any maternal high-risk feature\n• **<20 weeks:** confirm fetal heart activity by bedside ultrasound\n• **OB consult** before discharge; Rh immune globulin if Rh-negative with any bleeding or trauma\n• Watch for **placental abruption** — the fetal complication that kills\n\nPregnancy is itself a 24 h telemetry criterion for the mother.',
        citation: [7, 14],
        next: 'elec-classify',
        summary: 'Fetal monitoring ≥4 h at ≥20 wk, OB consult; household shock cohort was reassuring',
    },
    {
        id: 'elec-cord-bite',
        type: 'info',
        module: 6,
        title: 'Pediatric Oral Commissure Burn',
        body: 'A toddler bites or sucks a live cord or plug; saliva completes an arc across the lip. The result is a **painless, gray-white, full-thickness burn at the corner of the mouth**, often with little swelling at first. Edema and eschar develop over 2–3 days.\n\n**The danger is delayed:** when the eschar separates, the **labial artery** is exposed and can bleed briskly — reported in **10–25%** of cases, typically **5–21 days** after injury (peak at 1–2 weeks).\n\n**In the ED:**\n• Assess airway and swallowing; check for burns of the tongue and palate\n• Household voltage with a normal ECG and no LOC does not require telemetry — but still get the ECG\n• Analgesia; soft diet; keep the wound clean — [Bacitracin](#/drug/bacitracin/burns superficial) to the commissure\n• **Plastic surgery or ENT follow-up within 1 week** — splinting decisions and commissuroplasty timing belong to them\n• **Observe (admit) if any bleeding, poor oral intake, or unreliable follow-up**\n\n**Before discharge, teach the parents** the bidirectional pinch technique and give them the written sheet: [Cord-Bite Parent Instructions](#/info/electrocution-peds-cord-bite). Screen for non-accidental trauma if the history does not fit.',
        citation: [9, 10, 12],
        next: 'elec-ecg',
        summary: 'Labial artery bleed 5–21 days in up to 25% — teach pinch compression, plastics/ENT in 1 wk',
        safetyLevel: 'warning',
    },
    {
        id: 'elec-cew',
        type: 'question',
        module: 6,
        title: 'Conducted Electrical Weapon (TASER)',
        body: 'A CEW delivers ~2 mA in 19 pulses/s for 5-second cycles. Human studies of exposures up to 15 s show **no clinically significant arrhythmia, troponin rise, or metabolic derangement**. The injuries are from the **probes** and from the **fall**.\n\nThe patient who dies after a CEW encounter dies from what came before it — agitated delirium, stimulant toxicity, hyperthermia, or restraint asphyxia. Evaluate that, not the electricity.',
        options: [
            {
                label: 'Awake, alert, asymptomatic — probes only',
                next: 'elec-cew-probes',
            },
            {
                label: 'Altered, agitated, hyperthermic, chest pain, LOC, or prolonged / repeated discharges',
                next: 'elec-ecg',
                urgency: 'urgent',
            },
        ],
        citation: [8, 14],
        summary: 'Asymptomatic CEW = no ECG/labs/monitoring; the sick CEW patient is sick for another reason',
    },
    {
        id: 'elec-cew-probes',
        type: 'result',
        module: 6,
        title: 'CEW: Probe Removal & Discharge',
        body: '**No ECG, labs, or monitoring** are indicated for the awake, alert, asymptomatic patient after CEW exposure (Vilke 2019).\n\n**Probe removal — non-sensitive sites:** stabilize the skin around the barb with a V of thumb and index finger, grasp the probe, and pull straight out with one firm motion. Confirm the barb is intact. Treat the site as a puncture wound; universal precautions — the barb is a sharp. Tetanus status per any wound: [Tdap](#/drug/tdap/wound).\n\n**Specialist removal (do NOT pull):**\n• **Eye / orbit** — ophthalmology\n• **Genitals** — urology\n• **Neck or over major vessels** — image first, surgery if near a vessel\n• Face, bone-embedded, or breast in a pregnant patient — consider local anesthesia and procedural removal or consult\n\n**Look for the fall:** head injury, facial fractures, and wrist/shoulder injuries from an unprotected fall while incapacitated. CT head for any LOC or altered mentation.\n\nIf agitation or hyperthermia is part of the picture, this is an [Excited Delirium](#/tree/excited-delirium) patient — manage that pathway.',
        recommendation: 'Asymptomatic awake CEW patient: remove probes from non-sensitive sites, treat as puncture wounds, tetanus per status, assess fall injuries, discharge. Eye, genital, neck, or vascular probes go to the specialist. No ECG, labs, or monitoring required.',
        confidence: 'recommended',
        citation: [8],
        summary: 'Pull probes with a V-stabilization; eye/genital/neck probes to specialist; assess the fall',
    },
    // =====================================================================
    // MODULE 7: DISPOSITION & FOLLOW-UP
    // =====================================================================
    {
        id: 'elec-wound',
        type: 'info',
        module: 7,
        title: 'Wound Care & Burn Center Referral',
        body: '**ABA referral criteria (2022):** **all high-voltage (≥1000 V) injuries and all lightning injuries** warrant burn center consultation and consideration for transfer. **Low-voltage** injuries should receive burn center consultation and a **follow-up visit to screen for delayed symptom onset and vision problems.** Call the burn center for every electrical injury — the conversation costs nothing.\n\n**Contact-point wounds:** clean, debride loose blister roofs, dress by depth — [Bacitracin](#/drug/bacitracin/burns superficial) with a non-adherent dressing for superficial/facial wounds, [Silver Sulfadiazine](#/drug/silver-sulfadiazine/burns deep) for deep partial or full-thickness wounds away from the face. Depth and dressing guide in [Burns](#/tree/burns).\n\n**Tetanus:** electrical burns are tetanus-prone — [Tdap](#/drug/tdap/wound) if last dose >5 years; [TIG](#/drug/tetanus-immune-globulin/post-exposure) if unvaccinated or unknown. (Already given in the high-voltage pathway — do not repeat.)\n\n**Ophthalmology baseline** before discharge for high-voltage and lightning: electrical cataracts occur in 5–8% and are compensable only if documented absent initially.',
        citation: [5, 11, 14],
        next: 'elec-dispo',
        summary: 'ABA: all high-voltage and lightning to burn center; low-voltage gets follow-up',
    },
    {
        id: 'elec-dispo',
        type: 'question',
        module: 7,
        title: 'Disposition',
        body: 'Choose the level of care.',
        options: [
            {
                label: 'Discharge from ED',
                description: 'Low voltage, normal ECG, no LOC, no monitoring criteria, wounds manageable, reliable follow-up',
                next: 'elec-dispo-discharge',
            },
            {
                label: 'Admit — telemetry or burn step-down',
                description: 'Monitoring criterion met, no critical-care needs',
                next: 'elec-dispo-admit',
                urgency: 'urgent',
            },
            {
                label: 'Burn ICU / burn center transfer',
                description: 'High voltage, lightning with deep burns or neuro injury, rhabdomyolysis, compartment syndrome, post-arrest',
                next: 'elec-dispo-burn',
                urgency: 'critical',
            },
        ],
        summary: 'Discharge, telemetry admit, or burn ICU by voltage and monitoring criteria',
    },
    {
        id: 'elec-dispo-discharge',
        type: 'result',
        module: 7,
        title: 'Discharge — Counsel on What Comes Later',
        body: '**Discharge checklist:**\n• Normal ECG and QTc documented; no monitoring criteria\n• Wounds dressed, tetanus addressed, analgesia plan\n• Burn center **follow-up visit arranged** (ABA) — screens for delayed symptoms and vision change\n• Cord-bite families have the written parent sheet and a plastics/ENT appointment\n\n**Delayed sequelae are common and under-recognized — tell the patient explicitly:**\n• **Neuropathic pain, paresthesias, weakness** — peripheral neuropathy can appear weeks later\n• **Cognitive complaints, irritability, sleep disturbance, depression, PTSD** — neuropsychiatric symptoms after electrical injury are frequent and treatable; low threshold for referral\n• **Cataracts** — months to years; any visual change needs ophthalmology\n• **Hearing loss / tinnitus** after lightning\n\n**Return immediately for:** chest pain, palpitations, syncope, dark urine, increasing limb pain or swelling, numbness or weakness, visual change, or any bleeding from an oral burn.',
        recommendation: 'Discharge with wound care, burn center follow-up, and explicit counseling on delayed neurologic, psychiatric, and ocular sequelae. Written return precautions.',
        confidence: 'recommended',
        citation: [5, 11, 12, 14],
        summary: 'Burn center follow-up; warn about neuropathy, neuropsychiatric symptoms, cataracts',
    },
    {
        id: 'elec-dispo-admit',
        type: 'result',
        module: 7,
        title: 'Admit — Telemetry / Burn Step-Down',
        body: '**Orders:**\n• Continuous telemetry 24 h from injury; repeat ECG at 24 h\n• BMP and CK at 12 and 24 h if any muscle involvement; trend until CK is falling\n• Foley and hourly UOP only if myoglobinuria or high-voltage mechanism\n• Wound care per burn center recommendations; q-shift neurovascular checks of involved limbs\n• Fetal monitoring per OB if pregnant\n• Ophthalmology baseline exam before discharge if high voltage or lightning\n• Social work screening for neuropsychiatric sequelae; occupational documentation for workplace injuries\n\n**Escalate to burn ICU** for new arrhythmia, rising CK with falling UOP, any compartment finding, or hyperkalemia.',
        recommendation: 'Monitored bed for 24 h with serial ECG, electrolytes, and CK; wound care per burn center; escalate for arrhythmia, rhabdomyolysis, or compartment findings.',
        confidence: 'recommended',
        citation: [5, 14],
        summary: 'Telemetry 24 h, serial CK/BMP, escalate for arrhythmia or compartment findings',
    },
    {
        id: 'elec-dispo-burn',
        type: 'result',
        module: 7,
        title: 'Burn ICU / Transfer',
        body: '**Before transfer:**\n• Secure airway if facial/oral burns, altered mentation, or ongoing resuscitation\n• Two large-bore IVs; balanced crystalloid running to UOP target with Foley in place\n• Compartment exam documented with time; fasciotomy done or surgeon-to-surgeon handoff arranged if any finding\n• Potassium checked and treated; ECG and rhythm strip sent\n• Spine cleared or immobilized; trauma imaging completed or explicitly deferred\n• Wounds covered with clean dry dressings — no topical agents that obscure depth assessment before the burn team sees them\n• Tetanus, analgesia, and warming addressed\n\n**Handoff must state:** voltage and path, contact time, LOC/arrest, CK trend, UOP, compartment exam times, and everything the patient has received.',
        recommendation: 'Burn ICU for all high-voltage injury, lightning with deep burns or neurologic injury, rhabdomyolysis, compartment syndrome, or post-arrest. Transfer after airway, fluids to UOP target, compartment exam, potassium, and spine are addressed.',
        confidence: 'definitive',
        citation: [5, 11, 14],
        summary: 'Airway, fluids to UOP, compartment exam, potassium, spine — then transfer with a full handoff',
    },
];
export const ELECTROCUTION_MODULE_LABELS = [
    'Scene & Resuscitation',
    'Classify the Exposure',
    'Cardiac Evaluation',
    'High-Voltage Deep Tissue',
    'Lightning',
    'Special Populations',
    'Disposition',
];
export const ELECTROCUTION_CRITICAL_ACTIONS = [
    { text: 'Power off before touching the patient — confirm the source is de-energized', nodeId: 'electrocution-start' },
    { text: 'Lightning multi-casualty: REVERSE TRIAGE — treat the apparently dead first; ventilate after ROSC', nodeId: 'elec-resus' },
    { text: '12-lead ECG on every exposure; troponin only for chest pain, instability, or ischemic ECG', nodeId: 'elec-ecg' },
    { text: 'Normal ECG + no criteria = discharge without telemetry; any criterion = 24 h monitoring', nodeId: 'elec-monitor-decision' },
    { text: 'High voltage: LR titrated to UOP 1 mL/kg/h (1–2 if myoglobinuria); no diuretics until resuscitated', nodeId: 'elec-hv-fluids' },
    { text: 'Hourly compartment checks — tense compartment or stretch pain = emergent fasciotomy', nodeId: 'elec-hv-compartment' },
    { text: 'Lightning: otoscopy on everyone (TM rupture 50–80%); never fasciotomy for keraunoparalysis', nodeId: 'elec-lightning-exam' },
    { text: 'Cord bite: teach parents pinch compression — labial artery bleeds 5–21 days later', nodeId: 'elec-cord-bite' },
    { text: 'ABA: all high-voltage and lightning injuries to a burn center', nodeId: 'elec-wound' },
];
export const ELECTROCUTION_CITATIONS = [
    { num: 1, text: 'Corrall S, Laws S, Rice A. Low-voltage electrical injuries and the electrocardiogram: is a "normal" electrocardiogram sufficient for safe discharge from care? A systematic review. Br Paramed J. 2023;8(3):27-36. doi:10.29045/14784726.2023.12.8.3.27' },
    { num: 2, text: 'Pilecky D, Vamos M, Bogyi P, et al. Risk of cardiac arrhythmias after electrical accident: a single-center study of 480 patients. Clin Res Cardiol. 2019;108(8):901-908. doi:10.1007/s00392-019-01420-2' },
    { num: 3, text: 'Davis C, Engeln A, Johnson EL, et al. Wilderness Medical Society Practice Guidelines for the Prevention and Treatment of Lightning Injuries: 2014 Update. Wilderness Environ Med. 2014;25(4 Suppl):S86-S95. doi:10.1016/j.wem.2014.08.011' },
    { num: 4, text: 'Ahmed J, Stenkula C, Omar S, et al. Patient outcomes after electrical injury — a retrospective study. Scand J Trauma Resusc Emerg Med. 2021;29:114. doi:10.1186/s13049-021-00920-3' },
    { num: 5, text: 'Beyene R (content expert). Electrical Injury Practice Management Guideline. Vanderbilt University Medical Center Burn Center. Approved July 14, 2022. https://www.vumc.org/burn/practice-management-guidelines' },
    { num: 6, text: 'Douillet D, Kalwant S, Amro Y, et al. Use of troponin assay after electrical injuries: a 15-year multicentre retrospective cohort in emergency departments. Scand J Trauma Resusc Emerg Med. 2021;29:141. doi:10.1186/s13049-021-00955-6' },
    { num: 7, text: 'Einarson A, Bailey B, Inocencion G, Ormond K, Koren G. Accidental electric shock in pregnancy: a prospective cohort study. Am J Obstet Gynecol. 1997;176(3):678-681. doi:10.1016/s0002-9378(97)70569-6' },
    { num: 8, text: 'Vilke G, Chan T, Bozeman WP, Childers R. Emergency Department Evaluation After Conducted Energy Weapon Use: Review of the Literature for the Clinician. J Emerg Med. 2019;57(5):740-746. doi:10.1016/j.jemermed.2019.06.037' },
    { num: 9, text: 'Hoffman KA, Trigger CC. Pediatric Oral Commissure Burn. Clin Pract Cases Emerg Med. 2017;1(1):59-60. PMC5965444.' },
    { num: 10, text: 'Emergency Medicine Residents\' Association. Electrical Injuries in Children. EM Resident (adapted from Pediatric Emergency Medicine Practice, September 2013). https://www.emra.org/emresident/article/electrical-injuries-in-children' },
    { num: 11, text: 'American Burn Association. Guidelines for Burn Patient Referral (Advice on Transfer and Consultation). 2022. https://ameriburn.org/burnreferral' },
    { num: 12, text: 'Zemaitis MR, Guirguis M, Cindass R. Electrical Injuries. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; updated July 2025. https://www.ncbi.nlm.nih.gov/books/NBK448087/' },
    { num: 13, text: 'Jensen JD, Thurman J, Vincent AL. Lightning Injuries. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2023. https://www.ncbi.nlm.nih.gov/books/NBK441920/' },
    { num: 14, text: 'Smith I, Kidd S, Kim S, Tennill RM. Assessment and Management of Electrical Injuries in Adults in the Emergency Department. Cureus. 2026;18(4):e107162. doi:10.7759/cureus.107162' },
];
export const ELECTROCUTION_NODE_COUNT = ELECTROCUTION_NODES.length;
