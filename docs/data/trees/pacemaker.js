// MedKitt — Pacemaker & ICD Emergencies
// Sources: UpToDate, EMCrit, EB Medicine, Roberts & Hedges, LITFL, StatPearls
// 7 modules: Basics → Malfunction → ECG → Magnet → ICD → Shocking → Temp Pacing
// Cardiology consult
export const PACEMAKER_CRITICAL_ACTIONS = [
    { text: 'Magnet on PACEMAKER = asynchronous pacing (VOO/DOO)', nodeId: 'pm-magnet-start' },
    { text: 'Magnet on ICD = disables SHOCKS only (pacing unchanged)', nodeId: 'pm-magnet-icd' },
    { text: 'Failure to capture + hyperkalemia = treat K+ first', nodeId: 'pm-fail-capture' },
    { text: 'ICD storm: Apply magnet, then beta-blocker + amiodarone', nodeId: 'pm-icd-storm' },
    { text: 'Safe to defibrillate with pacemaker - place pads >8cm from generator', nodeId: 'pm-shock-placement' },
    { text: 'Post-shock: Device interrogation required within 24h', nodeId: 'pm-shock-post' },
];
export const PACEMAKER_NODES = [
    // =====================================================================
    // MODULE 1: PACEMAKER BASICS
    // =====================================================================
    {
        id: 'pm-start',
        type: 'info',
        module: 1,
        title: 'Pacemaker Emergencies: Overview',
        body: '**Device emergencies are common and manageable with systematic approach.**\n\n**Key Questions:**\n1. What type of device? (Pacemaker vs ICD vs CRT)\n2. Is there a malfunction? (ECG analysis)\n3. Is the patient stable or unstable?\n4. When to use a magnet?\n\n**Device Types:**\n\n| Device | Function |\n|--------|----------|\n| **Pacemaker** | Prevents bradycardia only |\n| **ICD** | Detects/treats VT/VF (shocks) + may pace |\n| **CRT-P** | Biventricular pacing for heart failure |\n| **CRT-D** | CRT + ICD (shocks + pacing) |\n\n**Generator Location:**\n• Usually left pectoral (subclavicular)\n• Occasionally right-sided or abdominal\n• Look for scar, palpate device\n\n**Device ID Card:** Patient should carry - shows manufacturer, model, leads [1][2]',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'pm-device-id', label: 'Device ID' },
        ],
        images: [
            {
                src: 'images/pacemaker/device-types.png',
                alt: 'Comparison of pacemaker, ICD, and CRT device appearances on chest X-ray',
                caption: 'Device types: Single-chamber pacemaker (1 lead), dual-chamber (2 leads), CRT (3 leads), ICD (thick shock coil visible on lead).',
            },
        ],
        next: 'pm-nbg-code',
        summary: 'Systematic approach: identify device type (pacemaker/ICD/CRT), assess for malfunction on ECG, determine stability, know when to use magnet',
        skippable: true,
    },
    {
        id: 'pm-nbg-code',
        type: 'info',
        module: 1,
        title: 'NBG Pacemaker Code',
        body: '**The NBG/NASPE code describes pacemaker function.**\n\n**5-Position Code:**\n\n| Position | Letter | Meaning |\n|----------|--------|--------|\n| **I** | A/V/D/O | Chamber **Paced** |\n| **II** | A/V/D/O | Chamber **Sensed** |\n| **III** | O/I/T/D | **Response** to sensing |\n| **IV** | O/R | **Rate** modulation |\n| **V** | O/A/V/D | **Multisite** pacing |\n\n**Letters:**\n• **A** = Atrium | **V** = Ventricle | **D** = Dual (both)\n• **O** = None | **I** = Inhibited | **T** = Triggered\n• **R** = Rate-responsive\n\n**Common Modes:**\n\n| Mode | Description | Use |\n|------|-------------|-----|\n| **VVI** | V pace, V sense, Inhibited | Basic single-chamber |\n| **AAI** | A pace, A sense, Inhibited | Sinus node dysfunction, intact AV |\n| **DDD** | Dual pace, Dual sense, Dual response | Most versatile |\n| **VOO/DOO** | Asynchronous (no sensing) | Magnet mode |\n\n[NBG Decoder Calculator](#/calculator/pm-nbg-decoder) [1][3]',
        citation: [1, 3],
        calculatorLinks: [
            { id: 'pm-nbg-decoder', label: 'NBG Decoder' },
        ],
        images: [
            {
                src: 'images/pacemaker/nbg-code.png',
                alt: 'NBG pacemaker code diagram showing the 5 positions and their meanings',
                caption: 'NBG Code: Position I = paced chamber, II = sensed chamber, III = response, IV = rate modulation, V = multisite.',
            },
        ],
        next: 'pm-indications',
        summary: 'NBG code: I=paced, II=sensed, III=response; common modes VVI (basic), DDD (most versatile), VOO/DOO (asynchronous magnet mode)',
        skippable: true,
    },
    {
        id: 'pm-indications',
        type: 'info',
        module: 1,
        title: 'Pacing Indications',
        body: '**Know why the patient has a pacemaker - helps troubleshoot.**\n\n**Sinus Node Dysfunction (Sick Sinus):**\n• Symptomatic sinus bradycardia\n• Sinus pauses >3 seconds\n• Chronotropic incompetence\n• Tachy-brady syndrome\n\n**AV Block:**\n• **Mobitz II** - always needs pacing (high risk of complete block)\n• **3rd degree (complete)** - always needs pacing\n• Advanced AV block (≥2 consecutive non-conducted P waves)\n• Mobitz I with symptoms\n\n**Other:**\n• Bifascicular/trifascicular block + syncope\n• Carotid sinus hypersensitivity\n• Post-ablation\n• Post-TAVR (~10-20% need pacemaker)\n• Selected cardiomyopathy (HCM)\n\n**CRT Indications:**\n• EF ≤35%\n• LBBB with QRS ≥150 ms\n• NYHA Class II-IV despite optimal medical therapy [1][4]',
        citation: [1, 4],
        next: 'pm-approach',
        summary: 'Pacing indications: sick sinus, Mobitz II, complete heart block, post-TAVR; CRT for EF≤35% + LBBB + QRS≥150ms + NYHA II-IV',
        skippable: true,
    },
    {
        id: 'pm-approach',
        type: 'question',
        module: 1,
        title: 'Clinical Scenario',
        body: '**What is the primary concern?**',
        citation: [1, 2],
        summary: 'Select clinical scenario: malfunction, ICD shocks, need to defibrillate, magnet use, ECG interpretation, temporary pacing, or device complication',
        options: [
            {
                label: 'Suspected Pacemaker Malfunction',
                description: 'Bradycardia, syncope, palpitations with device',
                next: 'pm-malfunction-start',
                urgency: 'urgent',
            },
            {
                label: 'ICD Shocks',
                description: 'Patient received one or more shocks',
                next: 'pm-icd-shocks',
                urgency: 'critical',
            },
            {
                label: 'Need to Defibrillate/Cardiovert',
                description: 'Arrest or unstable arrhythmia with device',
                next: 'pm-shock-start',
                urgency: 'critical',
            },
            {
                label: 'Magnet Use Question',
                description: 'When and how to use magnet',
                next: 'pm-magnet-start',
            },
            {
                label: 'ECG Interpretation',
                description: 'Understanding paced rhythms',
                next: 'pm-ecg-start',
            },
            {
                label: 'Temporary Pacing Needed',
                description: 'Transcutaneous or transvenous pacing',
                next: 'pm-temp-start',
                urgency: 'critical',
            },
            {
                label: 'Device Infection/Complication',
                description: 'Pocket infection, lead issues',
                next: 'pm-complications',
                urgency: 'urgent',
            },
        ],
    },
    // =====================================================================
    // MODULE 2: PACEMAKER MALFUNCTION
    // =====================================================================
    {
        id: 'pm-malfunction-start',
        type: 'info',
        module: 2,
        title: 'Pacemaker Malfunction Types',
        body: '**Four Main Types of Malfunction:**\n\n| Type | ECG Finding | Problem |\n|------|-------------|--------|\n| **Failure to Pace** | No spikes when expected | Device not firing |\n| **Failure to Capture** | Spikes WITHOUT QRS | Stimulus ineffective |\n| **Failure to Sense** | Too many spikes (inappropriate pacing) | Not detecting intrinsic activity |\n| **Oversensing** | Pauses without pacing | Inhibited by non-cardiac signals |\n\n**Plus Special Situations:**\n• Pacemaker-mediated tachycardia (PMT)\n• Runaway pacemaker (rare, dangerous)\n\n**Initial Workup:**\n1. **12-lead ECG** - identify malfunction type\n2. **Electrolytes** - K+, Mg++, Ca++\n3. **Chest X-ray** - lead position, fracture\n4. **Device interrogation** - gold standard\n\n[Malfunction Identifier Calculator](#/calculator/pm-malfunction-id) [2][5]',
        citation: [2, 5],
        calculatorLinks: [
            { id: 'pm-malfunction-id', label: 'Malfunction ID' },
        ],
        next: 'pm-malfunction-type',
        summary: 'Four malfunction types: failure to pace (no spikes), failure to capture (spikes without QRS), undersensing (too many spikes), oversensing (pauses)',
    },
    {
        id: 'pm-malfunction-type',
        type: 'question',
        module: 2,
        title: 'Identify Malfunction Type',
        body: '**What pattern do you see on ECG?**',
        citation: [2, 5],
        summary: 'Identify ECG pattern: no spikes = failure to pace, spikes without QRS = failure to capture, too many spikes = undersensing, pauses = oversensing',
        options: [
            {
                label: 'No Pacing Spikes (when expected)',
                description: 'HR below programmed rate, no spikes visible',
                next: 'pm-fail-pace',
                urgency: 'critical',
            },
            {
                label: 'Spikes WITHOUT Capture',
                description: 'Spikes present but no P/QRS after',
                next: 'pm-fail-capture',
                urgency: 'critical',
            },
            {
                label: 'Too Many Spikes (inappropriate pacing)',
                description: 'Pacing despite intrinsic rhythm',
                next: 'pm-undersensing',
                urgency: 'urgent',
            },
            {
                label: 'Pauses Without Pacing',
                description: 'Expected pacing not occurring',
                next: 'pm-oversensing',
                urgency: 'urgent',
            },
            {
                label: 'Regular Tachycardia at Upper Rate',
                description: 'May be PMT',
                next: 'pm-pmt',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'pm-fail-pace',
        type: 'info',
        module: 2,
        title: 'Failure to Pace',
        body: '**No pacing spikes when heart rate is below programmed lower rate.**\n\n**Causes:**\n• **Lead fracture** - most common hardware cause\n• **Lead dislodgment**\n• **Battery depletion** (check magnet rate)\n• **Oversensing** - device thinks heart is beating\n• **Generator failure**\n• **Loose set screw** (connection at header)\n\n**Workup:**\n1. **Chest X-ray** - look for lead fracture, dislodgment\n2. **Apply magnet** - will it pace in asynchronous mode?\n3. **Check magnet rate** - low rate = depleted battery\n4. **Device interrogation** - definitive\n\n**If Magnet Restores Pacing:**\n→ Likely oversensing (magnet bypasses sensing)\n→ Keep magnet on, arrange interrogation\n\n**If Magnet Does NOT Restore Pacing:**\n→ Lead fracture, severe battery depletion, or generator failure\n→ Transcutaneous pacing as bridge [2][5][6]',
        citation: [2, 5, 6],
        images: [
            {
                src: 'images/pacemaker/lead-fracture-xray.png',
                alt: 'Chest X-ray showing pacemaker lead fracture at clavicle-first rib junction',
                caption: 'Lead fracture: Classic location at clavicle-first rib junction (subclavian crush). Look for discontinuity or kinking.',
            },
        ],
        next: 'pm-malfunction-management',
        summary: 'Failure to pace: lead fracture, dislodgment, battery depletion, oversensing — apply magnet (if restores pacing = oversensing), check CXR for lead issues',
    },
    {
        id: 'pm-fail-capture',
        type: 'info',
        module: 2,
        title: 'Failure to Capture',
        body: '**⚠️ Pacing spikes present WITHOUT subsequent P wave or QRS. ⚠️**\n\n**Causes:**\n\n**Lead-Related:**\n• Lead dislodgment (most common early post-implant)\n• Lead fracture\n• Lead perforation\n\n**Threshold-Related:**\n• **Hyperkalemia** - K+ >7 mEq/L classic cause\n• Acidosis\n• Hypoxia\n• Ischemia\n• Exit block (fibrosis at lead tip - late)\n\n**Medication-Related:**\n• Flecainide, propafenone\n• Class I antiarrhythmics\n\n**Device:**\n• Battery depletion\n• Output programmed too low\n\n**⚠️ ALWAYS CHECK POTASSIUM ⚠️**\n\n**Acute Management:**\n1. **Check K+** - treat hyperkalemia aggressively\n2. **Increase output** (if able to reprogram)\n3. **Transcutaneous pacing** if unstable\n4. **Magnet** may help (higher output in some devices) [2][5][6]',
        citation: [2, 5, 6],
        calculatorLinks: [
            { id: 'pm-capture-causes', label: 'Capture Causes' },
        ],
        images: [
            {
                src: 'images/pacemaker/fail-capture-ecg.png',
                alt: 'ECG showing pacing spikes without capture - spikes present but no QRS follows',
                caption: 'Failure to capture: Pacing spikes (arrows) without subsequent QRS complexes. Note underlying slow escape rhythm.',
            },
        ],
        next: 'pm-malfunction-management',
        summary: 'Failure to capture: ALWAYS CHECK POTASSIUM (K>7 classic cause), also acidosis/hypoxia/ischemia; treat hyperkalemia aggressively, TCP if unstable',
        safetyLevel: 'critical',
    },
    {
        id: 'pm-undersensing',
        type: 'info',
        module: 2,
        title: 'Failure to Sense (Undersensing)',
        body: '**Pacing spikes occurring regardless of intrinsic rhythm.**\n\n**ECG Pattern:**\n• Pacing spikes falling during or after native QRS\n• Pacing that ignores intrinsic beats\n• "Competition" between device and native rhythm\n\n**⚠️ DANGER: May pace on T wave → R-on-T → VF ⚠️**\n\n**Causes:**\n• Sensitivity programmed too low\n• Lead dislodgment\n• Lead fracture\n• Inadequate intrinsic signal amplitude\n• Fibrosis at lead-tissue interface\n• New bundle branch block (changes signal)\n\n**Management:**\n1. **Apply magnet** - converts to asynchronous (will still pace, but at least consistent)\n2. **Reprogram sensitivity** (interrogation needed)\n3. If causing hemodynamic issues, may need lead revision\n\n**Note:** Magnet does NOT fix undersensing - it just makes pacing asynchronous. The danger is that the device IS pacing when it shouldn\'t. [2][5]',
        citation: [2, 5],
        images: [
            {
                src: 'images/pacemaker/undersensing-ecg.png',
                alt: 'ECG showing undersensing with pacing spikes falling on native QRS complexes',
                caption: 'Undersensing: Pacing spikes (arrows) occurring despite intrinsic beats. Note spikes falling on or near native QRS - risk of R-on-T.',
            },
        ],
        next: 'pm-malfunction-management',
        summary: 'Undersensing: paces regardless of intrinsic rhythm — DANGER of R-on-T triggering VF; magnet converts to asynchronous but does NOT fix the problem',
        safetyLevel: 'critical',
    },
    {
        id: 'pm-oversensing',
        type: 'info',
        module: 2,
        title: 'Oversensing',
        body: '**Device is inhibited by signals it mistakes for cardiac activity.**\n\n**ECG Pattern:**\n• Pauses without pacing when pacing should occur\n• Intermittent failure to pace\n• Often position-dependent or activity-related\n\n**What Is Being Oversensed?**\n• **Myopotentials** - skeletal muscle (pectoralis)\n• **T-wave sensing** - large T waves mistaken for QRS\n• **EMI** - electromagnetic interference\n• **Lead fracture noise** - random signals\n• **Cross-talk** - atrial spike sensed by ventricular lead\n\n**Clues:**\n• Symptoms with arm movement (myopotentials)\n• Near certain equipment (EMI)\n• Erratic sensing on interrogation (lead fracture)\n\n**Management:**\n1. **Apply magnet** - bypasses sensing, restores pacing\n2. Keep magnet in place until interrogation\n3. **Reprogram sensitivity** or **blanking periods**\n4. Lead repair if fractured\n\n**Magnet is the definitive treatment until reprogramming!** [2][5]',
        citation: [2, 5],
        images: [
            {
                src: 'images/pacemaker/oversensing-ecg.png',
                alt: 'ECG showing oversensing with inappropriate pauses in pacing',
                caption: 'Oversensing: Long pause without pacing. Device is inhibited by non-cardiac signals. Magnet application restores pacing.',
            },
        ],
        next: 'pm-malfunction-management',
        summary: 'Oversensing: device inhibited by non-cardiac signals (myopotentials, T-waves, EMI, lead fracture noise) — magnet bypasses sensing and restores pacing',
    },
    {
        id: 'pm-pmt',
        type: 'info',
        module: 2,
        title: 'Pacemaker-Mediated Tachycardia',
        body: '**PMT (Endless Loop Tachycardia) - DDD pacemakers only.**\n\n**Mechanism:**\n1. PVC or loss of atrial capture\n2. Retrograde conduction to atrium\n3. Atrial lead senses retrograde P wave\n4. Triggers ventricular pacing\n5. Ventricular pace conducts retrograde to atrium\n6. Cycle repeats → tachycardia at upper tracking rate\n\n**ECG Pattern:**\n• Regular tachycardia at or near **upper tracking rate** (usually 110-130 bpm)\n• Ventricular paced morphology\n• Often starts after a PVC\n\n**Treatment:**\n\n**1. Apply Magnet:**\n• Converts to asynchronous mode (VOO/DOO)\n• Breaks the loop immediately\n• Simple and effective\n\n**2. Adenosine:**\n• Blocks AV node, interrupts retrograde conduction\n• Works but less elegant than magnet\n\n**3. Reprogramming:**\n• Extend PVARP (post-ventricular atrial refractory period)\n• Enable PMT termination algorithms\n\n**Key:** Magnet is diagnostic AND therapeutic. [5][7]',
        citation: [5, 7],
        images: [
            {
                src: 'images/pacemaker/pmt-ecg.png',
                alt: 'ECG showing pacemaker-mediated tachycardia at upper tracking rate with ventricular paced morphology',
                caption: 'PMT: Regular tachycardia at upper tracking rate. Note ventricular paced morphology. Magnet application terminates immediately.',
            },
        ],
        next: 'pm-malfunction-management',
        summary: 'PMT in DDD pacemakers: retrograde conduction creates endless loop at upper tracking rate — magnet breaks loop immediately, also try adenosine',
    },
    {
        id: 'pm-malfunction-management',
        type: 'question',
        module: 2,
        title: 'Patient Stability',
        body: '**Is the patient hemodynamically stable?**',
        citation: [2, 5],
        summary: 'Assess hemodynamic stability — unstable needs immediate magnet + K+ check + TCP; stable allows systematic workup and device interrogation',
        options: [
            {
                label: 'UNSTABLE - Hypotension, AMS, Ischemia',
                description: 'Needs immediate intervention',
                next: 'pm-unstable',
                urgency: 'critical',
            },
            {
                label: 'STABLE - Tolerating current state',
                description: 'Time for workup and consultation',
                next: 'pm-stable',
            },
        ],
    },
    {
        id: 'pm-unstable',
        type: 'info',
        module: 2,
        title: 'Unstable Pacemaker Malfunction',
        body: '**⚠️ UNSTABLE PATIENT WITH PACEMAKER MALFUNCTION ⚠️**\n\n**Immediate Actions:**\n\n**1. Apply Magnet:**\n• May restore pacing (oversensing, PMT)\n• Check magnet rate (battery status)\n• Keep on if helpful\n\n**2. Check Potassium:**\n• Hyperkalemia is common reversible cause\n• Treat aggressively: Calcium, insulin/glucose, bicarb\n\n**3. Transcutaneous Pacing:**\n• If magnet doesn\'t help and bradycardic\n• Start at 60-80 ppm, increase mA until capture\n• Sedate if conscious (painful)\n\n**4. Pharmacologic Bridge:**\n• **Atropine** 1 mg IV (limited utility in complete heart block)\n• **Epinephrine** 2-10 mcg/min infusion\n• **Dopamine** 5-20 mcg/kg/min\n\n**5. Prepare for Transvenous Pacing:**\n• If TCP fails or prolonged pacing needed\n\n**6. STAT Cardiology/EP Consultation**\n\n[TCP Settings Calculator](#/calculator/pm-tcp-settings) [2][8]',
        citation: [2, 8],
        calculatorLinks: [
            { id: 'pm-tcp-settings', label: 'TCP Settings' },
        ],
        treatment: {
            firstLine: {
                drug: 'Epinephrine',
                dose: '2-10 mcg/min',
                route: 'IV infusion',
                frequency: 'Continuous',
                duration: 'Until pacing established',
                notes: 'Chronotropic and inotropic support. Titrate to HR and BP.',
            },
            alternative: {
                drug: 'Dopamine',
                dose: '5-20 mcg/kg/min',
                route: 'IV infusion',
                frequency: 'Continuous',
                duration: 'Until pacing established',
                notes: 'Alternative chronotropic support. Higher doses more chronotropic.',
            },
            monitoring: 'Continuous ECG, BP q5min, pulse oximetry. Watch for ischemia from tachycardia.',
        },
        next: 'pm-temp-start',
        summary: 'Unstable: magnet first, check K+ (treat aggressively if high), TCP if bradycardic, epinephrine 2-10mcg/min bridge, prepare for TVP, STAT EP consult',
        safetyLevel: 'critical',
    },
    {
        id: 'pm-stable',
        type: 'info',
        module: 2,
        title: 'Stable Pacemaker Malfunction',
        summary: 'Stable: 12-lead ECG, BMP (K/Mg/Ca), CXR AP+lateral, arrange device interrogation (gold standard), telemetry admission, TCP pads on standby',
        body: '**Stable Patient - Time for Systematic Workup:**\n\n**1. Complete 12-Lead ECG:**\n• Document malfunction type\n• Compare to prior if available\n\n**2. Labs:**\n• BMP (K+, Mg++, Ca++, Cr)\n• Troponin if ischemia concern\n• Consider drug levels (digoxin, antiarrhythmics)\n\n**3. Chest X-ray:**\n• AP and lateral views\n• Compare to prior\n• Look for: lead position, fracture, pneumothorax\n\n**4. Arrange Device Interrogation:**\n• Cardiology/EP consult\n• Device company rep if needed\n• Gold standard for diagnosis\n\n**5. Continuous Monitoring:**\n• Telemetry admission\n• TCP pads on standby\n\n**Disposition:**\n• All confirmed malfunctions need admission\n• Cardiology consultation required\n• May need lead revision or generator replacement [2][5]',
        citation: [2, 5],
        options: [
            {
                label: 'Review ECG Interpretation',
                next: 'pm-ecg-start',
            },
            {
                label: 'Review Magnet Use',
                next: 'pm-magnet-start',
            },
            {
                label: 'Return to Start',
                next: 'pm-start',
            },
        ],
    },
    // =====================================================================
    // MODULE 3: ECG INTERPRETATION
    // =====================================================================
    {
        id: 'pm-ecg-start',
        type: 'info',
        module: 3,
        title: 'Paced Rhythm ECG Basics',
        body: '**Identifying Pacing on ECG:**\n\n**Pacing Spikes:**\n• Vertical deflections, ~2 ms duration\n• Bipolar leads = smaller spikes (may be hard to see)\n• Unipolar leads = larger spikes\n• Not visible in all leads\n\n**Normal Paced QRS Morphology:**\n\n| Pacing Site | Pattern |\n|-------------|--------|\n| **RV apex** | LBBB + left axis deviation |\n| **RV septum** | LBBB, axis may be normal |\n| **LV (via CS)** | RBBB pattern |\n| **BiV (CRT)** | Narrower than RV alone, variable |\n\n**ST-T Changes:**\n• Should be **discordant** (opposite direction from QRS)\n• Concordant ST changes = concerning for ischemia\n\n**Types of Beats:**\n• **Fully paced** - spike + paced morphology\n• **Fusion** - native + paced activation together\n• **Pseudofusion** - spike on native QRS (no contribution)\n• **Native** - intrinsic beat [3][9]',
        citation: [3, 9],
        calculatorLinks: [
            { id: 'pm-ecg-pattern', label: 'ECG Pattern' },
        ],
        images: [
            {
                src: 'images/pacemaker/paced-rhythm-ecg.png',
                alt: 'Normal dual-chamber paced rhythm showing atrial and ventricular spikes with LBBB morphology',
                caption: 'Normal DDD pacing: Atrial spike → P wave, ventricular spike → wide QRS with LBBB pattern. Note discordant ST-T changes.',
            },
        ],
        next: 'pm-ecg-patterns',
        summary: 'Pacing spikes: vertical deflections; RV pacing = LBBB + LAD morphology; discordant ST-T normal; concordant ST changes = concerning for ischemia',
        skippable: true,
    },
    {
        id: 'pm-ecg-patterns',
        type: 'info',
        module: 3,
        title: 'Pacing Patterns by Mode',
        body: '**Recognize Normal Pacing Patterns:**\n\n**AAI (Atrial Only):**\n• Atrial spike → P wave → native QRS\n• QRS is NARROW (native conduction)\n• Used when AV conduction intact\n\n**VVI (Ventricular Only):**\n• Ventricular spike → wide QRS\n• No relationship to P waves\n• AV dissociation may be present\n\n**DDD (Dual Chamber):**\n• Can show 4 patterns:\n  1. **A-sense, V-sense** - no spikes, native rhythm\n  2. **A-pace, V-sense** - atrial spike only\n  3. **A-sense, V-pace** - ventricular spike only\n  4. **A-pace, V-pace** - both spikes\n\n**Fusion Beats:**\n• Native activation + paced activation occur simultaneously\n• Intermediate morphology\n• Normal finding, not malfunction\n\n**Pseudofusion:**\n• Spike falls on native QRS but doesn\'t contribute\n• QRS identical to native beat\n• Also normal [3][9]',
        citation: [3, 9],
        images: [
            {
                src: 'images/pacemaker/fusion-pseudofusion.png',
                alt: 'ECG showing fusion and pseudofusion beats compared to fully paced and native beats',
                caption: 'Beat types: (A) Fully paced, (B) Fusion - intermediate morphology, (C) Pseudofusion - spike on native QRS, (D) Native beat.',
            },
        ],
        next: 'pm-ecg-stemi',
        summary: 'DDD shows 4 patterns (A-sense/V-sense to A-pace/V-pace); fusion beats = intermediate morphology (normal); pseudofusion = spike on native QRS (normal)',
        skippable: true,
    },
    {
        id: 'pm-ecg-stemi',
        type: 'info',
        module: 3,
        title: 'STEMI in Paced Rhythm',
        summary: 'Modified Sgarbossa for paced STEMI: concordant STE ≥1mm, concordant STD V1-V3, or discordant STE ≥25% of S wave — ANY positive = activate cath lab',
        safetyLevel: 'critical',
        body: '**Modified Sgarbossa Criteria for STEMI with Paced Rhythm:**\n\n**Standard Sgarbossa (Original):**\n1. Concordant ST elevation ≥1 mm (5 points)\n2. Concordant ST depression ≥1 mm in V1-V3 (3 points)\n3. Discordant ST elevation ≥5 mm (2 points)\n\n**MODIFIED Criterion (Smith):**\n• Replace rule 3 with:\n• **ST elevation / S wave ratio ≥0.25**\n• (Proportionally excessive discordant STE)\n\n**Interpretation:**\n• ≥3 points = highly specific for STEMI\n• **ANY positive criterion** warrants cath lab activation\n\n**Key Point:**\n• Normal paced rhythm has **discordant** ST-T changes\n• **Concordant** ST changes are ALWAYS abnormal\n• Excessive discordant STE (>25% of S wave) is abnormal\n\n[Sgarbossa Calculator](#/calculator/pm-sgarbossa) [9][10]',
        citation: [9, 10],
        calculatorLinks: [
            { id: 'pm-sgarbossa', label: 'Sgarbossa' },
        ],
        images: [
            {
                src: 'images/pacemaker/sgarbossa-criteria.png',
                alt: 'Sgarbossa criteria diagrams showing concordant STE, concordant STD in V1-V3, and excessive discordant STE',
                caption: 'Sgarbossa criteria: (1) Concordant STE ≥1mm, (2) Concordant STD V1-V3 ≥1mm, (3) Discordant STE ≥25% of S wave depth.',
            },
        ],
        options: [
            {
                label: 'Return to Clinical Scenario',
                next: 'pm-approach',
            },
        ],
    },
    // =====================================================================
    // MODULE 4: MAGNET USE
    // =====================================================================
    {
        id: 'pm-magnet-start',
        type: 'info',
        module: 4,
        title: 'Magnet Application Basics',
        body: '**⚠️ CRITICAL: Magnets affect PACEMAKERS and ICDs DIFFERENTLY! ⚠️**\n\n| Device | Magnet Effect |\n|--------|---------------|\n| **PACEMAKER** | Switches to **asynchronous pacing** (VOO/DOO) |\n| **ICD** | **Disables shock therapy** ONLY (pacing unchanged) |\n\n**Pacemaker + Magnet:**\n• Bypasses sensing → paces regardless of intrinsic rhythm\n• Paces at "magnet rate" (indicates battery status)\n• Useful for: oversensing, PMT, battery check\n\n**ICD + Magnet:**\n• Disables VT/VF detection and shock delivery\n• **Pacing function is UNCHANGED**\n• Useful for: inappropriate shocks, ICD storm, end of life\n• Tones often heard when applied (varies by manufacturer)\n\n**Magnet Placement:**\n• Directly over generator\n• Tape in place if needed to keep effect continuous\n\n**Remove Magnet:**\n• Device returns to programmed mode (usually) [5][11]',
        citation: [5, 11],
        images: [
            {
                src: 'images/pacemaker/magnet-application.png',
                alt: 'Proper magnet placement directly over pacemaker generator in left pectoral region',
                caption: 'Magnet placement: Apply directly over generator. Can tape in place. Effect persists only while magnet is in place.',
            },
        ],
        next: 'pm-magnet-rates',
        summary: 'CRITICAL difference: magnet on PACEMAKER = asynchronous pacing (VOO/DOO); magnet on ICD = disables SHOCKS only (pacing unchanged)',
        safetyLevel: 'critical',
    },
    {
        id: 'pm-magnet-rates',
        type: 'info',
        module: 4,
        title: 'Magnet Rates by Manufacturer',
        body: '**Magnet Rate Indicates Battery Status:**\n\n| Manufacturer | Normal Rate | ERI/Low Battery |\n|--------------|-------------|----------------|\n| **Medtronic** | **85 bpm** | 65 bpm |\n| **Boston Scientific** | **100 bpm** | 90 bpm (ERI), ≤85 bpm (EOL) |\n| **Abbott (St. Jude)** | **100 bpm** | 86 bpm |\n| **Biotronik** | **90 bpm** | 80 bpm |\n\n**ERI** = Elective Replacement Indicator (battery low, replace soon)\n**EOL** = End of Life (replace urgently)\n\n**Notes:**\n• Medtronic: ~1.5 min delay after interrogation before magnet response\n• Boston Scientific: Older devices may beep differently\n• **Leadless pacemakers (Micra):** Do NOT respond to magnets\n\n**If Magnet Rate is Low:**\n• Battery depletion likely\n• Urgent generator replacement needed\n• May explain malfunction\n\n[Magnet Rate Calculator](#/calculator/pm-magnet-rate) [5][11]',
        citation: [5, 11],
        calculatorLinks: [
            { id: 'pm-magnet-rate', label: 'Magnet Rate' },
        ],
        next: 'pm-magnet-when',
        summary: 'Magnet rate = battery status: Medtronic 85bpm (65=ERI), Boston Scientific 100 (90=ERI), Abbott 100 (86=ERI); leadless Micra does NOT respond to magnets',
    },
    {
        id: 'pm-magnet-when',
        type: 'info',
        module: 4,
        title: 'When to Use Magnet',
        body: '**Indications for Magnet in ED:**\n\n**PACEMAKER:**\n✅ **Oversensing** - restores pacing by bypassing sensing\n✅ **PMT (pacemaker-mediated tachycardia)** - breaks the loop\n✅ **Assess battery status** - check magnet rate\n✅ **Confirm device is pacemaker vs ICD** - different response\n\n**ICD:**\n✅ **Inappropriate shocks** - disables therapy immediately\n✅ **ICD storm** - stops shocks while treating underlying cause\n✅ **End-of-life care** - disable shocks for comfort\n✅ **During surgery** - prevent EMI-triggered shocks\n\n**When NOT to Use Magnet:**\n❌ Patient in actual VT/VF who needs ICD therapy\n❌ Failure to capture (magnet won\'t help threshold issues)\n❌ As diagnostic tool when interrogation is available\n\n**Key Points:**\n• Safe to try in most situations\n• Effect is reversible (remove magnet)\n• Does NOT permanently reprogram device [5][11]',
        citation: [5, 11],
        next: 'pm-magnet-icd',
        summary: 'Pacemaker magnet: oversensing, PMT, battery check; ICD magnet: inappropriate shocks, ICD storm, end-of-life, surgery; safe and reversible',
    },
    {
        id: 'pm-magnet-icd',
        type: 'info',
        module: 4,
        title: 'ICD Magnet Specifics',
        summary: 'ICD magnet suspends VT/VF detection and shocks (pacing continues); removing magnet resumes detection; Biotronik may permanently disable after >8h',
        body: '**ICD Magnet Behavior:**\n\n**When Magnet Applied:**\n• Suspends VT/VF detection\n• Suspends shock therapy (ATP and shocks)\n• **Pacing continues normally**\n• Most ICDs emit audible tones\n\n**Manufacturer Differences:**\n\n| Manufacturer | Behavior |\n|--------------|----------|\n| **Medtronic** | Suspends detection while magnet on |\n| **Boston Scientific** | Suspends detection while magnet on |\n| **Abbott (St. Jude)** | Suspends detection while magnet on |\n| **Biotronik** | May permanently disable if magnet held >8 hours |\n\n**After Magnet Removal:**\n• Detection typically resumes\n• Some older devices may need reprogramming\n• Always plan for interrogation\n\n**⚠️ Important:**\n• If patient is in TRUE VT/VF, removing magnet allows appropriate therapy\n• If shocks are inappropriate, keep magnet on until EP can reprogram [5][11]',
        citation: [5, 11],
        options: [
            {
                label: 'Return to Clinical Scenario',
                next: 'pm-approach',
            },
            {
                label: 'Go to ICD Shocks',
                next: 'pm-icd-shocks',
            },
        ],
    },
    // =====================================================================
    // MODULE 5: ICD EMERGENCIES
    // =====================================================================
    {
        id: 'pm-icd-shocks',
        type: 'info',
        module: 5,
        title: 'ICD Shock Evaluation',
        body: '**Patient Received ICD Shock(s) - First Steps:**\n\n**1. Is Patient Stable Now?**\n• ABCs, vital signs, mental status\n• If unstable → treat underlying rhythm\n\n**2. How Many Shocks?**\n• Single shock vs multiple\n• ≥3 shocks in 24h = **ICD Storm** (see below)\n\n**3. Appropriate vs Inappropriate?**\n\n| Appropriate | Inappropriate |\n|-------------|---------------|\n| Device correctly detected and treated VT/VF | Shock when NOT in VT/VF |\n| Look for: ischemia, HF, electrolytes, drugs | Causes: AFib/RVR, SVT, lead fracture, T-wave oversensing |\n\n**4. Initial Workup:**\n• 12-lead ECG\n• BMP, Mg++, troponin\n• Chest X-ray\n• **Device interrogation** (determines appropriate vs inappropriate)\n\n**All ICD shocks warrant ED evaluation and interrogation.** [5][12]',
        citation: [5, 12],
        next: 'pm-icd-appropriate',
        summary: 'ICD shock evaluation: assess stability, count shocks (≥3 in 24h = storm), determine appropriate vs inappropriate, workup ECG/BMP/Mg/troponin/CXR',
    },
    {
        id: 'pm-icd-appropriate',
        type: 'question',
        module: 5,
        title: 'Shock Type',
        body: '**Based on symptoms, rhythm, and interrogation (if available):**',
        citation: [5, 12],
        summary: 'Classify shocks: appropriate (treated real VT/VF), inappropriate (AFib/SVT/lead noise), ICD storm (≥3 in 24h), or unknown pending interrogation',
        options: [
            {
                label: 'Likely APPROPRIATE Shocks',
                description: 'Patient was in VT/VF, shocks were warranted',
                next: 'pm-icd-appropriate-management',
                urgency: 'urgent',
            },
            {
                label: 'Likely INAPPROPRIATE Shocks',
                description: 'Shocks for non-VT/VF rhythm (AFib, SVT, noise)',
                next: 'pm-icd-inappropriate',
                urgency: 'urgent',
            },
            {
                label: 'ICD STORM (≥3 shocks in 24h)',
                description: 'Multiple shocks, needs aggressive management',
                next: 'pm-icd-storm',
                urgency: 'critical',
            },
            {
                label: 'Unknown - Need Interrogation',
                description: 'Cannot determine without device data',
                next: 'pm-icd-unknown',
            },
        ],
    },
    {
        id: 'pm-icd-appropriate-management',
        type: 'info',
        module: 5,
        title: 'Appropriate ICD Shocks',
        summary: 'Appropriate shocks: find the trigger — ischemia, HF, electrolytes, drugs; beta-blocker reduces VT burden, amiodarone for recurrence, admit for monitoring',
        body: '**The ICD Worked - But Why Did Patient Have VT/VF?**\n\n**Workup for Underlying Cause:**\n\n**Ischemia:**\n• ECG, troponin\n• Consider cath if ACS\n\n**Heart Failure:**\n• BNP, chest X-ray\n• Echo if indicated\n• Optimize HF meds\n\n**Electrolytes:**\n• K+, Mg++, Ca++\n• Replete aggressively\n\n**Medications/Drugs:**\n• QT-prolonging drugs\n• Digoxin toxicity\n• Stimulants, cocaine\n\n**Management:**\n• Treat underlying cause\n• Consider beta-blocker (reduces VT burden)\n• Amiodarone for recurrent VT\n• Admission for monitoring and optimization\n• EP follow-up for ICD adjustment\n\n**Single appropriate shock with clear trigger:** May not need prolonged admission if trigger addressed. [5][12]',
        citation: [5, 12],
        options: [
            {
                label: 'Return to Start',
                next: 'pm-start',
            },
        ],
    },
    {
        id: 'pm-icd-inappropriate',
        type: 'info',
        module: 5,
        title: 'Inappropriate ICD Shocks',
        summary: 'Inappropriate shocks: AFib/RVR most common cause, also lead fracture, T-wave oversensing — apply magnet immediately, rate control, arrange interrogation',
        body: '**⚠️ Shocks Delivered When NOT in VT/VF ⚠️**\n\n**Common Causes:**\n\n**Supraventricular Rhythms:**\n• **AFib with RVR** - most common cause\n• Atrial flutter with rapid conduction\n• SVT\n\n**Device/Lead Issues:**\n• **Lead fracture** - generates noise, sensed as VF\n• T-wave oversensing\n• Double counting of QRS\n\n**External:**\n• EMI (electromagnetic interference)\n\n**Immediate Management:**\n\n**1. Apply Magnet:**\n• Disables shock therapy immediately\n• Keep on until reprogramming\n\n**2. Rate Control (if AFib/SVT):**\n• Beta-blocker or diltiazem\n• Reduces rate below detection threshold\n\n**3. Device Interrogation:**\n• Confirms inappropriate shocks\n• Identifies cause\n• Allows reprogramming\n\n**Disposition:** Admit for monitoring and EP adjustment. [5][12]',
        citation: [5, 12],
        options: [
            {
                label: 'Return to Start',
                next: 'pm-start',
            },
        ],
    },
    {
        id: 'pm-icd-storm',
        type: 'info',
        module: 5,
        title: 'ICD Storm',
        summary: 'ICD storm (≥3 shocks/24h) = emergency: apply magnet, beta-blocker + amiodarone 150mg IV, sedate, treat cause; ICU admission, consider ablation',
        safetyLevel: 'critical',
        body: '**⚠️ ELECTRICAL STORM: ≥3 VT/VF episodes requiring ICD therapy in 24 hours ⚠️**\n\n**This is a Medical Emergency.**\n\n**Immediate Management:**\n\n**1. Apply Magnet (if ongoing shocks):**\n• Stops further shocks\n• Allows assessment and treatment\n\n**2. Determine Appropriate vs Inappropriate:**\n• Interrogate device ASAP\n• If inappropriate → keep magnet on\n• If appropriate → need antiarrhythmic therapy\n\n**3. For APPROPRIATE Storm (True VT/VF):**\n\n| Intervention | Rationale |\n|--------------|----------|\n| **Beta-blocker** | Blunts sympathetic surge, first-line |\n| **Amiodarone** | 150mg IV over 10 min, then infusion |\n| **Sedation** | Reduces catecholamines |\n| **Treat cause** | Ischemia, electrolytes, HF |\n\n**4. Advanced Options:**\n• Overdrive pacing (faster than VT rate)\n• Catheter ablation\n• Left cardiac sympathetic denervation\n• Intubation/sedation if refractory\n\n**Admit to ICU.** [5][12][13]',
        citation: [5, 12, 13],
        treatment: {
            firstLine: {
                drug: 'Amiodarone',
                dose: '150 mg over 10 min, then 1 mg/min x 6h, then 0.5 mg/min',
                route: 'IV',
                frequency: 'Continuous infusion',
                duration: 'Until stable',
                notes: 'Can repeat 150mg bolus for breakthrough VT. Max 2.2g/24h.',
            },
            alternative: {
                drug: 'Esmolol',
                dose: '500 mcg/kg bolus, then 50-300 mcg/kg/min',
                route: 'IV',
                frequency: 'Continuous infusion',
                duration: 'Until stable',
                notes: 'Short-acting beta-blocker. Titrate to HR/BP. Can combine with amiodarone.',
            },
            monitoring: 'Continuous telemetry, BP q5min during loading, QTc (amiodarone prolongs), liver function.',
        },
        options: [
            {
                label: 'Return to Start',
                next: 'pm-start',
            },
        ],
    },
    {
        id: 'pm-icd-unknown',
        type: 'info',
        module: 5,
        title: 'ICD Shock - Unknown Type',
        summary: 'Unknown shock type: admit for monitoring, arrange interrogation; if ongoing shocks apply magnet — can always externally defibrillate if needed',
        body: '**Cannot Determine Appropriate vs Inappropriate Without Interrogation:**\n\n**If Stable, Single Shock:**\n• Admit for monitoring\n• Arrange interrogation (EP or device company)\n• Basic workup: ECG, BMP, troponin, CXR\n• Telemetry monitoring\n\n**If Multiple Shocks or Ongoing:**\n1. **Apply magnet** to prevent further shocks\n2. Assess hemodynamics\n3. If in VT/VF after magnet: external cardioversion/defibrillation\n4. Emergent interrogation\n\n**Contact:**\n• Cardiology/EP consult\n• Device company (24/7 technical support)\n• Manufacturer often can provide remote interrogation guidance\n\n**Key Point:**\n• You can ALWAYS apply magnet if unsure\n• If patient is in true VT/VF, you can still externally defibrillate\n• Magnet just disables internal therapy [5][12]',
        citation: [5, 12],
        options: [
            {
                label: 'Return to Start',
                next: 'pm-start',
            },
        ],
    },
    // =====================================================================
    // MODULE 6: EXTERNAL DEFIBRILLATION
    // =====================================================================
    {
        id: 'pm-shock-start',
        type: 'info',
        module: 6,
        title: 'Defibrillating Patients with Devices',
        body: '**YES, you can and SHOULD defibrillate patients with pacemakers/ICDs!**\n\n**Key Points:**\n• **Do NOT delay defibrillation** to check for pacemaker\n• Safe to defibrillate/cardiovert\n• Some current may travel down leads\n• **Device interrogation required after shock**\n\n**If ICD is Actively Shocking:**\n• Wait 30-60 seconds for cycle to complete\n• Then apply AED/defibrillator if still needed\n• You can shock OVER the ICD\'s attempts if necessary\n\n**Post-Shock:**\n• Device may be reset or damaged (rare)\n• **Interrogation within 24 hours** required\n• Check pacing function clinically\n• Watch for failure to capture [2][5][14]',
        citation: [2, 5, 14],
        next: 'pm-shock-placement',
        summary: 'YES defibrillate patients with devices — do NOT delay; device interrogation required within 24h post-shock; some current may travel down leads',
        safetyLevel: 'critical',
    },
    {
        id: 'pm-shock-placement',
        type: 'info',
        module: 6,
        title: 'Pad Placement with Devices',
        body: '**Optimal Pad Placement:**\n\n**Preferred: Anterior-Posterior**\n• Avoids generator entirely\n• Current path away from leads\n• Best option when possible\n\n**Anterior-Lateral (Standard Position):**\n• Place pads **at least 8 cm (3 inches)** from generator\n• If device is left-sided:\n  - Move left (apex) pad more lateral or inferior\n  - Or use A-P position\n\n**Do NOT:**\n• Place pad directly over generator\n• Delay defibrillation to find generator\n\n**Energy Level:**\n• Use standard energy (biphasic 120-200J, monophasic 360J)\n• No need to reduce energy due to pacemaker\n\n**External Cardioversion:**\n• Same pad placement considerations\n• Synchronized cardioversion as usual [2][5][14]',
        citation: [2, 5, 14],
        images: [
            {
                src: 'images/pacemaker/defib-pad-placement.png',
                alt: 'Defibrillator pad placement options avoiding pacemaker generator',
                caption: 'Pad placement: A-P preferred. If anterior-lateral, keep pads ≥8cm from generator. Avoid directly over device.',
            },
        ],
        next: 'pm-shock-post',
        summary: 'A-P pad placement preferred (avoids generator); if anterior-lateral, pads ≥8cm from device; standard energy, no need to reduce for pacemaker',
    },
    {
        id: 'pm-shock-post',
        type: 'info',
        module: 6,
        title: 'Post-Shock Device Care',
        summary: 'Post-shock: check paced rhythm, assess capture, device interrogation within 24h mandatory; TCP bridge if malfunction detected; document shock details',
        body: '**After External Defibrillation/Cardioversion:**\n\n**Immediate Assessment:**\n• Check for paced rhythm on monitor\n• Assess capture (if pacing)\n• Watch for failure to pace or capture\n\n**Potential Issues:**\n• **Sensing changes** - threshold may increase\n• **Capture changes** - threshold may increase\n• **Temporary pacing dysfunction** - usually resolves\n• **Permanent damage** - rare but possible\n\n**Required Follow-up:**\n• **Device interrogation within 24 hours**\n• Full assessment of sensing and capture thresholds\n• Reprogram if needed\n\n**If Pacing Malfunction Post-Shock:**\n• Transcutaneous pacing as bridge\n• Urgent interrogation\n• May need temporary transvenous pacing\n\n**Documentation:**\n• Number of shocks\n• Energy levels used\n• Pad position\n• Post-shock device function [2][5][14]',
        citation: [2, 5, 14],
        options: [
            {
                label: 'Return to Start',
                next: 'pm-start',
            },
        ],
    },
    // =====================================================================
    // MODULE 7: TEMPORARY PACING
    // =====================================================================
    {
        id: 'pm-temp-start',
        type: 'info',
        module: 7,
        title: 'Temporary Pacing Overview',
        body: '**When Permanent Pacemaker Fails, Options for Temporary Pacing:**\n\n| Method | Speed | Duration | Reliability |\n|--------|-------|----------|-------------|\n| **Transcutaneous (TCP)** | Fastest | Short-term | Variable capture |\n| **Transvenous (TVP)** | Moderate | Days | Most reliable |\n| **Pharmacologic** | Fast | Bridge only | Limited efficacy |\n\n**Indications for Temporary Pacing:**\n• Pacemaker malfunction with hemodynamic instability\n• Bradycardia unresponsive to medications\n• Asystole or near-asystole\n• Bridge to permanent pacemaker repair/replacement\n\n**Order of Interventions:**\n1. **Atropine** (limited utility in complete block)\n2. **Transcutaneous pacing** (immediate)\n3. **Chronotropic infusion** (epinephrine or dopamine)\n4. **Transvenous pacing** (definitive) [2][8]',
        citation: [2, 8],
        next: 'pm-tcp',
        summary: 'Temporary pacing options: TCP (fastest), TVP (most reliable), pharmacologic bridge (atropine, epinephrine, dopamine) — order: atropine → TCP → infusion → TVP',
    },
    {
        id: 'pm-tcp',
        type: 'info',
        module: 7,
        title: 'Transcutaneous Pacing',
        body: '**TCP - First-Line for Emergent Pacing:**\n\n**Pad Placement:**\n• **Anterior-Posterior** preferred\n• Avoid pacemaker generator (≥8 cm away)\n• Good skin contact, remove excessive hair\n\n**Initial Settings:**\n\n| Parameter | Starting | Adjustment |\n|-----------|----------|------------|\n| **Rate** | 60-80 ppm | Adjust to hemodynamics |\n| **Output (mA)** | 30-50 mA | Increase by 5-10 mA until capture |\n\n**Finding Capture Threshold:**\n1. Start at 30-50 mA\n2. Increase until consistent capture\n3. Typical threshold: 50-100 mA\n4. Set output **1.25x threshold** (or 5-10 mA above)\n\n**Peri-Arrest/Arrest:**\n• Start at **maximum output** for rapid capture\n• Then titrate down\n\n**Confirming Capture:**\n• Wide QRS after each pacer spike\n• Palpable pulse (NOT just monitor artifact)\n• POCUS showing ventricular contraction\n• Improvement in hemodynamics [2][8]',
        citation: [2, 8],
        calculatorLinks: [
            { id: 'pm-tcp-settings', label: 'TCP Settings' },
        ],
        images: [
            {
                src: 'images/pacemaker/tcp-capture.png',
                alt: 'ECG strip showing transcutaneous pacing with capture - pacer spikes followed by wide QRS complexes',
                caption: 'TCP with capture: Large pacing artifact followed by wide QRS. Confirm with pulse palpation, not just monitor.',
            },
        ],
        next: 'pm-tcp-troubleshoot',
        summary: 'TCP: A-P pads ≥8cm from device, start 30-50mA increase by 5-10 until capture (typical 50-100mA), set 1.25x threshold; confirm with pulse not just monitor',
    },
    {
        id: 'pm-tcp-troubleshoot',
        type: 'info',
        module: 7,
        title: 'TCP Troubleshooting',
        body: '**Not Capturing? Troubleshoot:**\n\n**Check Pads:**\n• Good contact?\n• Dried out?\n• Hair interfering?\n• A-P position?\n\n**Increase Output:**\n• Go up to maximum (usually 140-200 mA)\n• If still no capture at max → TVP\n\n**Check Connections:**\n• Pads connected to pacer?\n• Pacer mode correct?\n\n**Patient Factors:**\n• Large body habitus (higher thresholds)\n• Pericardial effusion\n• Severe metabolic derangement\n\n**Patient Comfort:**\n• TCP is **painful** at effective outputs\n• Sedation required for most conscious patients\n• Options: Fentanyl, midazolam, ketamine, propofol\n\n**When TCP Fails:**\n• Transvenous pacing\n• Continue pharmacologic support (epinephrine/dopamine)\n• Call for expert help [2][8]',
        citation: [2, 8],
        next: 'pm-tvp',
        summary: 'TCP troubleshooting: check pad contact/connections, increase to max mA, try A-P position; TCP is PAINFUL — sedate with fentanyl/midazolam/ketamine',
    },
    {
        id: 'pm-tvp',
        type: 'info',
        module: 7,
        title: 'Transvenous Pacing',
        body: '**TVP - Definitive Temporary Pacing:**\n\n**Indications:**\n• TCP failure or poor capture\n• Prolonged pacing needed (>30 min)\n• Overdrive pacing for torsades\n• More reliable pacing required\n\n**Access Site (Preference Order):**\n1. **Right IJ** - straight path to RV, highest success\n2. **Left subclavian** - reserve for permanent site if possible\n3. **Femoral** - higher infection/thrombosis, patient can\'t sit up\n\n**Equipment:**\n• 5-6 Fr introducer sheath\n• Balloon-tipped pacing catheter\n• Pacing generator\n\n**Procedure Overview:**\n1. Place sheath (ultrasound-guided)\n2. Advance catheter to ~20 cm\n3. Inflate balloon, float to RV\n4. Confirm position: ECG (injury current), POCUS, or fluoro\n5. Deflate balloon, test pacing\n\n**Settings:**\n• Rate: 60-80 ppm\n• Output: Determine threshold, set 2-3x threshold [2][8][15]',
        citation: [2, 8, 15],
        images: [
            {
                src: 'images/pacemaker/tvp-position.png',
                alt: 'Transvenous pacemaker catheter position in right ventricle on fluoroscopy',
                caption: 'TVP catheter position: Tip in RV apex. Can confirm with fluoroscopy, POCUS, or ECG (injury current when in contact).',
            },
        ],
        next: 'pm-pharm-bridge',
        summary: 'TVP: right IJ preferred (straight path to RV), balloon-tipped catheter ~20cm, confirm with injury current/POCUS/fluoro; set output 2-3x threshold',
    },
    {
        id: 'pm-pharm-bridge',
        type: 'info',
        module: 7,
        title: 'Pharmacologic Bridge',
        summary: 'Atropine 1mg IV (ineffective for Mobitz II/CHB), epinephrine 2-10mcg/min, dopamine 5-20mcg/kg/min — bridges to pacing, not definitive treatment',
        body: '**Medications While Preparing for Pacing:**\n\n**Atropine:**\n• Dose: 1 mg IV, repeat q3-5 min, max 3 mg\n• Works for: Sinus bradycardia, some AV block\n• **Ineffective for:** Mobitz II, complete heart block, transplant hearts\n\n**Epinephrine Infusion:**\n• Dose: **2-10 mcg/min**\n• Chronotropic AND inotropic\n• Titrate to heart rate and blood pressure\n\n**Dopamine Infusion:**\n• Dose: **5-20 mcg/kg/min**\n• Higher doses more chronotropic\n• Alternative to epinephrine\n\n**Isoproterenol:**\n• Pure beta-agonist\n• 2-10 mcg/min\n• Increases myocardial oxygen demand\n• Not routinely recommended\n• May be useful in transplant patients\n\n**Key Point:**\n• These are BRIDGES to pacing, not definitive treatment\n• Prepare for TCP/TVP while infusing [2][8]',
        citation: [2, 8],
        treatment: {
            firstLine: {
                drug: 'Atropine',
                dose: '1 mg',
                route: 'IV push',
                frequency: 'q3-5 min',
                duration: 'Max 3 mg total',
                notes: 'First-line for sinus bradycardia. Ineffective in Mobitz II, CHB, transplant hearts.',
            },
            alternative: {
                drug: 'Epinephrine',
                dose: '2-10 mcg/min',
                route: 'IV infusion',
                frequency: 'Continuous',
                duration: 'Until pacing established',
                notes: 'Mix 1 mg in 250 mL (4 mcg/mL). Start at 1-2 mcg/min, titrate to effect.',
            },
            monitoring: 'Continuous ECG, BP q2-5min, watch for ischemia.',
        },
        options: [
            {
                label: 'Return to Start',
                next: 'pm-start',
            },
        ],
    },
    // =====================================================================
    // COMPLICATIONS MODULE (Additional)
    // =====================================================================
    {
        id: 'pm-complications',
        type: 'info',
        module: 7,
        title: 'Device Complications',
        summary: 'Pocket infection: blood cultures, may need complete extraction + IV abx; Twiddler syndrome: leads coiled on CXR; lead fracture at subclavian crush site',
        body: '**Non-Malfunction Complications:**\n\n**Generator Pocket Infection:**\n• Erythema, warmth, discharge, erosion\n• Systemic signs (fever, bacteremia)\n• **Management:**\n  - Blood cultures x 3\n  - Superficial only (<30 days, no systemic signs): Trial oral abx\n  - True pocket infection: **Complete device extraction** + IV abx 10-14 days\n  - With endocarditis: Extraction + 4-6 weeks IV abx\n\n**Twiddler Syndrome:**\n• Patient manipulates generator in pocket\n• Leads coil around generator on X-ray\n• Causes malfunction, lead dislodgment\n• **Treatment:** Lead repositioning, secure generator to fascia\n\n**Lead Fracture:**\n• At clavicle-first rib junction (subclavian crush)\n• X-ray: Discontinuity or kinking of lead\n• Causes failure to capture, oversensing (noise)\n• **Treatment:** Lead replacement\n\n**Pacemaker Syndrome:**\n• Symptoms from loss of AV synchrony (VVI mode)\n• Fatigue, dyspnea, palpitations, hypotension\n• **Treatment:** Upgrade to DDD pacing [5][16][17]',
        citation: [5, 16, 17],
        images: [
            {
                src: 'images/pacemaker/twiddler-xray.png',
                alt: 'Chest X-ray showing Twiddler syndrome with leads coiled around generator',
                caption: 'Twiddler syndrome: Leads coiled around generator from patient manipulation. Note lead retraction from heart.',
            },
        ],
        options: [
            {
                label: 'Return to Start',
                next: 'pm-start',
            },
        ],
    },
];
export const PACEMAKER_MODULE_LABELS = [
    'Device Basics',
    'Malfunction',
    'ECG Interpretation',
    'Magnet Use',
    'ICD Emergencies',
    'External Defib',
    'Temporary Pacing',
];
export const PACEMAKER_CITATIONS = [
    { num: 1, text: 'EB Medicine. Managing Pacemaker-Related Complications in the ED. 2024.' },
    { num: 2, text: 'emDocs. Pacemaker and AICD Management in the Emergency Department. 2024.' },
    { num: 3, text: 'LITFL. Pacemaker Rhythms - Normal Patterns. 2024.' },
    { num: 4, text: 'AHA. 2018 Bradycardia and Conduction Delay Guidelines. Circulation. 2019.' },
    { num: 5, text: 'LITFL. Pacemaker Malfunction ECG Library. 2024.' },
    { num: 6, text: 'PMC. Causes of Failure to Capture in Permanent Pacemakers. 2020.' },
    { num: 7, text: 'StatPearls. Pacemaker Mediated Tachycardia. 2024.' },
    { num: 8, text: 'EMCrit IBCC. Bradycardia. 2024.' },
    { num: 9, text: 'LITFL. Sgarbossa Criteria ECG Library. 2024.' },
    { num: 10, text: 'Ann Emerg Med. Modified Sgarbossa in Ventricular Paced Rhythm. 2021.' },
    { num: 11, text: 'PMC. Magnet Application to Cardiac Implantable Electronic Devices. 2022.' },
    { num: 12, text: 'CJEM. Management of Electrical Storm and Recurrent ICD Shocks. 2021.' },
    { num: 13, text: 'EMCrit 310. Transvenous Pacemakers. 2024.' },
    { num: 14, text: 'Roberts and Hedges. Clinical Procedures in Emergency Medicine. 7th ed.' },
    { num: 15, text: 'StatPearls. Transcutaneous Pacing. 2024.' },
    { num: 16, text: 'PMC. Twiddler Syndrome. 2023.' },
    { num: 17, text: 'StatPearls. Pacemaker Syndrome. 2024.' },
];
