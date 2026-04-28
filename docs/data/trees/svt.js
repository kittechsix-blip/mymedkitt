// MedKitt — SVT (Supraventricular Tachycardia)
// Evidence-based SVT management: vagal maneuvers, adenosine, rate control, cardioversion
// Types: AVNRT, AVRT, atrial flutter, atrial tachycardia, WPW considerations
// 7 modules: Initial → Vagal → Adenosine → Rate Control → Unstable → WPW → Disposition
// 28 nodes total.
export const SVT_CRITICAL_ACTIONS = [
    { text: 'Unstable SVT (hypotension, AMS, chest pain, pulmonary edema) → synchronized cardioversion', nodeId: 'svt-unstable' },
    { text: 'Modified Valsalva (REVERT): 43% conversion vs 17% standard (NNT 3.8)', nodeId: 'svt-valsalva' },
    { text: 'Adenosine: 6mg rapid IV push → 12mg if no response; NOT for WPW with pre-excited AF', nodeId: 'svt-adenosine' },
    { text: 'WPW with AF: AVOID adenosine, diltiazem, beta-blockers → use procainamide or cardiovert', nodeId: 'svt-wpw-af' },
    { text: 'Diltiazem 15-20mg IV over 2 min preferred for rate control (98% success)', nodeId: 'svt-diltiazem' },
];
export const SVT_MODULE_LABELS = [
    'Initial Assessment',
    'Vagal Maneuvers',
    'Adenosine',
    'Rate Control',
    'Unstable SVT',
    'WPW Considerations',
    'Disposition',
];
export const SVT_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'svt-start',
        type: 'question',
        module: 1,
        title: 'SVT Assessment',
        body: '[SVT Overview](#/info/svt-overview)\n\n**Supraventricular Tachycardia:** Regular, narrow-complex tachycardia originating above the ventricles.\n\n**Common Types:**\n• **AVNRT** (50-60%): Dual AV nodal pathways, pseudo S-wave in II/III/aVF\n• **AVRT** (30%): Accessory pathway (includes WPW), short PR at baseline\n• **Atrial tachycardia** (10%): P-wave before/after QRS\n• **Atrial flutter**: Saw-tooth pattern, typically 150 bpm (2:1 block)\n\n**Typical HR:** 140-250 bpm depending on type\n\n**First Step:** Assess hemodynamic stability.',
        citation: [1, 2],
        options: [
            {
                label: 'Stable — Proceed with Vagal Maneuvers',
                next: 'svt-vagal-choice',
            },
            {
                label: 'Unstable — Immediate Cardioversion',
                next: 'svt-unstable',
            },
            {
                label: 'Suspected WPW',
                next: 'svt-wpw-assess',
            },
        ],
        summary: 'SVT types: AVNRT (50-60%), AVRT (30%), atrial tach (10%), flutter; assess stability first',
    },
    // =====================================================================
    // MODULE 2: VAGAL MANEUVERS
    // =====================================================================
    {
        id: 'svt-vagal-choice',
        type: 'question',
        module: 2,
        title: 'Vagal Maneuver Selection',
        body: '[Modified Valsalva Technique](#/info/svt-valsalva)\n\n**Vagal maneuvers are first-line for stable SVT (Class I, ACC/AHA 2015).**\n\n**Modified Valsalva (REVERT Trial):**\n• 43% conversion vs 17% standard Valsalva\n• NNT = 3.8\n• Zero-cost, no adverse effects\n\n**Carotid Sinus Massage:**\n• 20-40% success for AVNRT\n• Risk: 1 in 1,000 stroke risk\n• Contraindicated: carotid bruits, recent TIA/stroke, MI <3 months\n\n**Which maneuver?**',
        citation: [3, 4],
        options: [
            {
                label: 'Modified Valsalva (Preferred)',
                next: 'svt-valsalva',
            },
            {
                label: 'Carotid Sinus Massage',
                next: 'svt-csm',
            },
            {
                label: 'Skip to Adenosine',
                next: 'svt-adenosine',
            },
        ],
        summary: 'Vagal maneuvers first-line; modified Valsalva preferred (43% vs 17% conversion)',
    },
    {
        id: 'svt-valsalva',
        type: 'question',
        module: 2,
        title: 'Modified Valsalva Technique (REVERT)',
        body: '[REVERT Trial](#/info/svt-revert)\n\n**Technique (REVERT Trial):**\n\n**Step 1:** Patient sitting upright at 45°\n**Step 2:** Blow into 10mL syringe (move plunger) for 15 seconds (~40 mmHg pressure)\n**Step 3:** IMMEDIATELY lie patient flat\n**Step 4:** Elevate legs to 45° for 15 seconds\n**Step 5:** Return to sitting, check rhythm\n\n**Success Rate:** 43% conversion to NSR\n\n**Tips:**\n• Can repeat 2-3 times\n• Works best for AVNRT and AVRT\n• Patient may feel brief chest pressure during maneuver\n\n**Did the rhythm convert?**',
        citation: [3],
        options: [
            {
                label: 'Yes — Converted to NSR',
                next: 'svt-converted',
            },
            {
                label: 'No — Proceed to Adenosine',
                next: 'svt-adenosine',
            },
        ],
        summary: 'REVERT: blow into syringe 15s → immediately flat → legs up 15s; 43% success',
    },
    {
        id: 'svt-csm',
        type: 'question',
        module: 2,
        title: 'Carotid Sinus Massage',
        body: '**Technique:**\n\n**Positioning:** Patient supine, neck extended, head turned away\n\n**Location:** Below angle of jaw, at level of thyroid cartilage (over carotid bifurcation)\n\n**Pressure:** Firm circular pressure for 5-10 seconds\n\n**Sequence:** Try RIGHT side first, wait 1 minute, then LEFT if needed\n\n**⚠️ NEVER bilateral simultaneous massage**\n\n**Success Rate:** 20-40% for AVNRT\n\n**Contraindications:**\n• Carotid bruits\n• Recent TIA/stroke (<3 months)\n• Recent MI (<3 months)\n• Age >65 (relative)\n\n**Stroke Risk:** 1 in 1,000\n\n**Did the rhythm convert?**',
        citation: [4],
        options: [
            {
                label: 'Yes — Converted to NSR',
                next: 'svt-converted',
            },
            {
                label: 'No — Proceed to Adenosine',
                next: 'svt-adenosine',
            },
        ],
        summary: 'CSM: firm pressure 5-10s at carotid bifurcation; 20-40% success; 1:1000 stroke risk',
    },
    // =====================================================================
    // MODULE 3: ADENOSINE
    // =====================================================================
    {
        id: 'svt-adenosine',
        type: 'info',
        module: 3,
        title: 'Adenosine Administration',
        body: '[Adenosine Dosing](#/info/svt-adenosine-info)\n\n**Dosing:**\n• **Initial:** 6mg rapid IV push (1-2 seconds)\n• **Repeat:** 12mg if no response in 1-2 minutes\n• **Max:** 12mg × 2 (some sources allow 18mg)\n\n**Administration Technique (Critical):**\n1. Use proximal IV (antecubital preferred)\n2. Rapid bolus over 1-2 seconds (half-life ~10 seconds)\n3. Immediately follow with 20mL NS flush\n4. Optional: elevate arm to 90° for 10-20 seconds\n\n**Single-Syringe Method:**\n• 6mg adenosine + 18mL NS in one syringe\n• Higher success (100% with up to 3 doses vs 70% two-syringe)\n\n**Dose Modifications:**\n• **Reduce to 3mg:** Central line, transplanted heart, carbamazepine, dipyridamole\n• **Increase to 12mg:** Theophylline, high caffeine intake\n\n**Pediatric:** 0.1 mg/kg initial, 0.2 mg/kg repeat',
        citation: [1, 5],
        next: 'svt-adenosine-response',
        summary: '6mg rapid IV push + 20mL flush; repeat 12mg if needed; reduce to 3mg for central line',
    },
    {
        id: 'svt-adenosine-response',
        type: 'question',
        module: 3,
        title: 'Adenosine Response',
        body: '**Expected Effects (warn patient):**\n• Transient asystole (1-3 seconds) — normal\n• Chest pressure, warmth, dyspnea (5-10 seconds)\n• Sensation of "impending doom"\n• ALL symptoms resolve within seconds\n\n**Interpretation:**\n\n**Abrupt termination during push:**\n→ AVNRT or AVRT (reentrant mechanism)\n\n**Slowing then revealing underlying rhythm:**\n→ Atrial tachycardia or flutter (transient AV block reveals atrial activity)\n\n**No response:**\n→ Consider atrial flutter, VT, or inadequate dose/technique\n\n**What was the response?**',
        citation: [1, 5],
        options: [
            {
                label: 'Converted to NSR',
                next: 'svt-converted',
            },
            {
                label: 'Revealed Flutter Waves',
                next: 'svt-flutter',
            },
            {
                label: 'No Response — Rate Control',
                next: 'svt-rate-control',
            },
            {
                label: 'Recurrent SVT After Conversion',
                next: 'svt-rate-control',
            },
        ],
        summary: 'Abrupt termination = reentrant (AVNRT/AVRT); slowing reveals flutter; no response = consider VT',
    },
    {
        id: 'svt-flutter',
        type: 'info',
        module: 3,
        title: 'Atrial Flutter Identified',
        body: '**Adenosine revealed flutter waves — this is atrial flutter, not AVNRT/AVRT.**\n\n**Atrial Flutter Characteristics:**\n• Saw-tooth pattern in II, III, aVF\n• Atrial rate typically 280-320 bpm\n• Ventricular rate typically 150 bpm (2:1 block) or irregular\n\n**Management Differs from Other SVT:**\n\n**Rate Control:**\n• Diltiazem or beta-blocker (same as other SVT)\n• Goal: ventricular rate <110 bpm\n\n**Rhythm Control:**\n• Cardioversion highly effective (50-100J)\n• Consider ibutilide for pharmacologic conversion\n\n**Anticoagulation:**\n• Same stroke risk as atrial fibrillation\n• Assess CHA2DS2-VASc score\n• Anticoagulation before cardioversion if >48h or unknown duration\n\n**Refer to A-Fib RVR consult for detailed flutter management.**',
        citation: [1, 2],
        next: 'svt-rate-control',
        summary: 'Flutter revealed: saw-tooth waves, 150 bpm (2:1 block); rate control or cardiovert; anticoagulation needed',
    },
    // =====================================================================
    // MODULE 4: RATE CONTROL
    // =====================================================================
    {
        id: 'svt-rate-control',
        type: 'question',
        module: 4,
        title: 'Rate Control Options',
        body: '[Rate Control Agents](#/info/svt-rate-control)\n\n**If adenosine fails or SVT recurs, rate control agents are next.**\n\n**Diltiazem (Preferred):**\n• 15-20mg (0.25 mg/kg) IV over 2 minutes\n• Repeat 20-25mg (0.35 mg/kg) in 15 min if needed\n• Infusion: 5-15 mg/hr\n• **98% reach target HR; 50% at 5 min**\n• Caution: more hypotension than metoprolol (39% vs 24%)\n\n**Metoprolol:**\n• 5mg IV every 5 minutes × 3 doses (max 15mg)\n• Slower onset but less hypotension\n\n**Amiodarone (if above fail):**\n• 150mg IV over 10-15 minutes\n• Infusion: 1 mg/min × 6h, then 0.5 mg/min\n\n**Which agent?**',
        citation: [1, 6],
        options: [
            {
                label: 'Diltiazem (First-Line)',
                next: 'svt-diltiazem',
            },
            {
                label: 'Metoprolol',
                next: 'svt-metoprolol',
            },
            {
                label: 'Amiodarone (Refractory)',
                next: 'svt-amiodarone',
            },
        ],
        summary: 'Diltiazem preferred (98% success, faster onset); metoprolol if hypotension concern; amiodarone if refractory',
    },
    {
        id: 'svt-diltiazem',
        type: 'result',
        module: 4,
        title: 'Diltiazem for SVT',
        body: '[Diltiazem Dosing](#/info/svt-diltiazem)\n\n**Initial Bolus:**\n• 15-20mg (0.25 mg/kg) IV over 2 minutes\n• Flush with saline\n\n**Repeat Bolus (if needed):**\n• 20-25mg (0.35 mg/kg) IV in 15 minutes\n\n**Maintenance Infusion:**\n• 5-15 mg/hr (titrate to HR <100)\n• Start at 5 mg/hr, increase as needed\n\n**Response:**\n• 50% reach HR <100 by 5 minutes\n• 95% reach target by 30 minutes\n• 98% overall success\n\n**Monitor For:**\n• Hypotension (39% experience drop)\n• Bradycardia\n• AV block\n\n**Contraindications:**\n• WPW with pre-excited AF\n• Hypotension (SBP <90)\n• Severe LV dysfunction\n• Sick sinus syndrome\n\n**If converted → disposition. If rate controlled → consider admission vs discharge based on context.**',
        citation: [6],
        recommendation: 'Diltiazem 15-20mg IV over 2 min, repeat 20-25mg if needed. Infusion 5-15 mg/hr. 98% success.',
        confidence: 'recommended',
        summary: 'Diltiazem 15-20mg IV bolus, repeat 20-25mg; infusion 5-15 mg/hr; 98% success, 50% at 5 min',
    },
    {
        id: 'svt-metoprolol',
        type: 'result',
        module: 4,
        title: 'Metoprolol for SVT',
        body: '**Dosing:**\n• 5mg IV over 2 minutes\n• Repeat every 5 minutes × 3 doses (max 15mg total)\n\n**Onset:** Slower than diltiazem (46% at target HR by 30 min vs 50% at 5 min)\n\n**Advantages:**\n• Less hypotension than diltiazem (24% vs 39%)\n• Better for patients with borderline BP\n\n**Monitor For:**\n• Bradycardia\n• Hypotension\n• Bronchospasm (avoid in asthma/COPD)\n\n**Contraindications:**\n• Decompensated heart failure\n• Severe asthma/COPD\n• Hypotension\n• Bradycardia/heart block\n• WPW with pre-excited AF\n\n**Oral Transition:**\n• Metoprolol tartrate 25-50mg PO BID\n• Or metoprolol succinate 50-100mg PO daily',
        citation: [1, 6],
        recommendation: 'Metoprolol 5mg IV q5min × 3 doses. Slower onset but less hypotension than diltiazem.',
        confidence: 'recommended',
        summary: 'Metoprolol 5mg IV q5min × 3 doses (max 15mg); slower onset but less hypotension; avoid in asthma',
    },
    {
        id: 'svt-amiodarone',
        type: 'result',
        module: 4,
        title: 'Amiodarone for Refractory SVT',
        body: '**Use when diltiazem/metoprolol fail or contraindicated.**\n\n**Loading Dose:**\n• 150mg IV over 10-15 minutes\n• Mix in D5W (precipitates in NS at high concentrations)\n\n**Maintenance Infusion:**\n• 1 mg/min × 6 hours\n• Then 0.5 mg/min × 18 hours\n• Max 2.2g in 24 hours\n\n**Advantages:**\n• Works in structural heart disease\n• Less negative inotropy than other agents\n• Both rate and rhythm control\n\n**Side Effects (Acute):**\n• Hypotension (most common)\n• Bradycardia\n• QT prolongation\n• Phlebitis (use central line if available)\n\n**Requires Monitoring:**\n• Continuous telemetry\n• QTc monitoring\n• Blood pressure\n\n**Contraindications:**\n• Baseline QTc >500ms\n• Iodine allergy\n• Severe sinus node dysfunction',
        citation: [1, 7],
        recommendation: 'Amiodarone 150mg IV over 10-15 min, then 1 mg/min × 6h. Use for refractory SVT or structural heart disease.',
        confidence: 'consider',
        summary: 'Amiodarone 150mg IV load, 1 mg/min infusion; for refractory SVT; works with structural heart disease',
    },
    // =====================================================================
    // MODULE 5: UNSTABLE SVT
    // =====================================================================
    {
        id: 'svt-unstable',
        type: 'info',
        module: 5,
        title: 'Unstable SVT — Cardioversion',
        body: '[Cardioversion Protocol](#/info/svt-cardiovert)\n\n**Indications for Immediate Cardioversion:**\n• Hypotension (SBP <90)\n• Altered mental status\n• Chest pain/ischemic ECG changes\n• Pulmonary edema\n• Signs of shock\n\n**Do NOT delay for vagal maneuvers or adenosine if truly unstable.**\n\n**Synchronized Cardioversion Protocol:**\n\n**1. Sedation (if time permits):**\n• Propofol 0.5-1 mg/kg IV, OR\n• Etomidate 0.2-0.3 mg/kg IV, OR\n• Midazolam 0.05-0.1 mg/kg IV + fentanyl\n\n**2. Energy Selection (Narrow Complex):**\n• **Start: 50-100J**\n• Escalate: 100 → 200 → 360J if unsuccessful\n\n**3. Ensure SYNC mode is ON**\n\n**4. Clear patient and deliver shock**\n\n**Pediatric:** 0.5-2 J/kg',
        citation: [1, 8],
        next: 'svt-cardiovert-result',
        summary: 'Unstable = hypotension, AMS, chest pain, pulmonary edema; sedate → synchronized cardioversion 50-100J',
    },
    {
        id: 'svt-cardiovert-result',
        type: 'question',
        module: 5,
        title: 'Post-Cardioversion',
        body: '**Assess rhythm after cardioversion:**\n\n**If converted to NSR:**\n• Monitor for recurrence\n• Consider rate control agent to prevent recurrence\n• Evaluate for underlying cause (electrolytes, thyroid, drugs)\n\n**If unsuccessful:**\n• Verify SYNC mode was ON\n• Increase energy and repeat\n• Consider adenosine between shocks\n• Rule out WPW if not responding\n\n**What was the result?**',
        citation: [8],
        options: [
            {
                label: 'Converted to NSR',
                next: 'svt-converted',
            },
            {
                label: 'Not Converted — Increase Energy',
                next: 'svt-unstable',
            },
            {
                label: 'Suspect WPW',
                next: 'svt-wpw-assess',
            },
        ],
        summary: 'Post-cardioversion: monitor for recurrence; if unsuccessful, increase energy and verify sync mode',
    },
    // =====================================================================
    // MODULE 6: WPW CONSIDERATIONS
    // =====================================================================
    {
        id: 'svt-wpw-assess',
        type: 'question',
        module: 6,
        title: 'WPW Assessment',
        body: '[WPW Overview](#/info/svt-wpw)\n\n**Wolff-Parkinson-White Syndrome:**\nAccessory pathway bypasses AV node → risk of rapid conduction in AF/flutter.\n\n**Baseline ECG Clues:**\n• Short PR interval (<120ms)\n• Delta wave (slurred QRS upstroke)\n• Wide QRS (>120ms)\n\n**WPW + SVT Presentation:**\n\n**Orthodromic AVRT (90%):**\n• Narrow complex (antegrade through AV node)\n• AV nodal blockers may be used cautiously\n\n**Antidromic AVRT (10%):**\n• Wide complex (antegrade through accessory pathway)\n• Avoid AV nodal blockers\n\n**WPW + Atrial Fibrillation:**\n• Irregular, wide complex, very fast (>200 bpm)\n• **MOST DANGEROUS — AV nodal blockers can cause VF**\n\n**What is the presentation?**',
        citation: [9, 10],
        options: [
            {
                label: 'Narrow Complex (Orthodromic AVRT)',
                next: 'svt-wpw-orthodromic',
            },
            {
                label: 'Wide Complex / Pre-excited AF',
                next: 'svt-wpw-af',
            },
        ],
        summary: 'WPW: short PR, delta wave; orthodromic = narrow (safe for AV blockers); pre-excited AF = AVOID AV blockers',
    },
    {
        id: 'svt-wpw-orthodromic',
        type: 'result',
        module: 6,
        title: 'WPW — Orthodromic AVRT',
        body: '**Orthodromic AVRT (narrow complex):**\nConduction goes antegrade through AV node, retrograde through accessory pathway.\n\n**Management:**\n• Vagal maneuvers (safe, try first)\n• Adenosine (generally safe — blocks AV node)\n• Diltiazem/metoprolol (acceptable)\n• Cardioversion if unstable\n\n**Why it\'s safer:**\n• AV nodal blockers slow the normal pathway\n• Accessory pathway is only conducting retrograde\n• No risk of accelerating ventricular rate\n\n**Caveat:**\n• If rhythm converts and then goes into AF, accessory pathway becomes dangerous\n• Have procainamide available\n• Monitor closely after conversion\n\n**Long-term:** Refer for EP study + ablation (curative)',
        citation: [9, 10],
        recommendation: 'Orthodromic AVRT: vagal → adenosine → diltiazem acceptable. Monitor for AF after conversion.',
        confidence: 'recommended',
        summary: 'Orthodromic AVRT: narrow complex, AV blockers generally safe; refer for EP study + ablation',
    },
    {
        id: 'svt-wpw-af',
        type: 'result',
        module: 6,
        title: 'WPW + Pre-excited AF — DANGER',
        body: '[WPW + AF Protocol](#/info/svt-wpw-af)\n\n**⚠️ THIS IS A CRITICAL DIAGNOSIS**\n\n**ECG Features:**\n• Irregular rhythm (AF)\n• Very fast (often >200 bpm)\n• Wide QRS (pre-excited)\n• Variable QRS morphology\n\n**🚫 AVOID THESE DRUGS (can cause VF):**\n• Adenosine\n• Diltiazem/Verapamil\n• Beta-blockers\n• Digoxin\n\n**Why dangerous:** AV nodal blockers remove the "brakes" — AF conducts rapidly down accessory pathway → VF\n\n**✅ SAFE TREATMENTS:**\n\n**1. Synchronized Cardioversion (preferred if unstable):**\n• 100-200J synchronized\n\n**2. Procainamide (if stable):**\n• 20-50 mg/min IV (max 17 mg/kg)\n• Slows accessory pathway conduction\n\n**3. Ibutilide:**\n• 1mg IV over 10 min\n• Can repeat once\n\n**Admission:** All WPW + AF requires cardiology consult and admission.',
        citation: [9, 10],
        recommendation: 'WPW + AF: AVOID adenosine/diltiazem/beta-blockers. Cardiovert if unstable. Procainamide if stable.',
        confidence: 'definitive',
        summary: 'WPW + pre-excited AF: AVOID AV nodal blockers (causes VF); cardiovert or procainamide; admit for EP',
    },
    // =====================================================================
    // MODULE 7: DISPOSITION
    // =====================================================================
    {
        id: 'svt-converted',
        type: 'question',
        module: 7,
        title: 'SVT Converted — Disposition',
        body: '**SVT has converted to normal sinus rhythm.**\n\n**Evaluate for discharge criteria:**\n\n**Discharge Appropriate If:**\n• Known SVT history with similar episodes\n• Hemodynamically stable throughout\n• No chest pain or ischemic ECG changes\n• No elevated troponin (or demand ischemia only)\n• Reliable follow-up available\n• No WPW identified\n\n**Admit If:**\n• First episode of SVT\n• Failed conversion (required multiple agents)\n• Hemodynamic compromise during episode\n• Underlying structural heart disease\n• Elevated troponin with concern for ACS\n• WPW identified\n• Unreliable follow-up\n\n**What is the disposition plan?**',
        citation: [1, 11],
        options: [
            {
                label: 'Discharge — Known SVT, Stable',
                next: 'svt-discharge',
            },
            {
                label: 'Admit — First Episode or Concerning Features',
                next: 'svt-admit',
            },
        ],
        summary: 'Discharge if: known SVT history, stable, no ischemia, reliable follow-up; admit first episode or complications',
    },
    {
        id: 'svt-discharge',
        type: 'result',
        module: 7,
        title: 'SVT Discharge',
        body: '**Discharge Instructions:**\n\n**Patient Education:**\n• Teach modified Valsalva for home use\n• Avoid triggers: caffeine, alcohol, decongestants, stimulants\n• Return if: palpitations persist >30 min, chest pain, syncope, SOB\n\n**Medications (optional, per cardiology preference):**\n• Metoprolol 25-50mg PO BID, OR\n• Diltiazem ER 120-180mg PO daily\n• "Pill in pocket" approach for infrequent episodes\n\n**Follow-up:**\n• Cardiology/PCP within 1-2 weeks\n• Consider Holter monitor or event recorder\n• EP referral for recurrent SVT (ablation curative in >95%)\n\n**Troponin Note:**\n• Mild troponin elevation from demand ischemia is common\n• Resolves after rate control\n• Does NOT independently predict worse outcomes if no other ACS features',
        citation: [1, 11],
        recommendation: 'Teach modified Valsalva. Avoid triggers. Follow-up cardiology 1-2 weeks. Consider EP referral for ablation.',
        confidence: 'recommended',
        summary: 'Discharge: teach Valsalva, avoid triggers, cardiology follow-up 1-2 weeks, consider EP referral for ablation',
    },
    {
        id: 'svt-admit',
        type: 'result',
        module: 7,
        title: 'SVT Admission',
        body: '**Admission Criteria Met:**\n\n**Monitoring:**\n• Continuous telemetry\n• Serial ECGs\n• Electrolyte monitoring (K, Mg)\n• Consider echo if structural heart disease suspected\n\n**Workup:**\n• TSH (hyperthyroidism can cause SVT)\n• Electrolytes (hypokalemia, hypomagnesemia)\n• Drug screen if appropriate\n• Echo if first presentation or suspected structural disease\n\n**Cardiology Consult For:**\n• EP study and ablation consideration\n• Ongoing rate/rhythm control management\n• WPW evaluation\n\n**If WPW Identified:**\n• Avoid AV nodal blockers for maintenance\n• EP study mandatory — ablation curative\n• Restrict competitive sports until ablated',
        citation: [1, 11],
        recommendation: 'Admit for telemetry, workup (TSH, lytes, echo), cardiology consult, EP referral if WPW.',
        confidence: 'recommended',
        summary: 'Admit: telemetry, check TSH/lytes, echo if needed, cardiology consult, EP referral for ablation',
    },
];
// =====================================================================
// CITATIONS
// =====================================================================
export const SVT_CITATIONS = [
    { num: 1, text: 'Page RL, et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia. Circulation. 2016;133(14):e506-e574.' },
    { num: 2, text: 'Brugada J, et al. 2019 ESC Guidelines for the management of patients with supraventricular tachycardia. Eur Heart J. 2020;41(5):655-720.' },
    { num: 3, text: 'Appelboam A, et al. Postural modification to the standard Valsalva manoeuvre for emergency treatment of supraventricular tachycardias (REVERT): a randomised controlled trial. Lancet. 2015;386(10005):1747-1753.' },
    { num: 4, text: 'Smith G, et al. The use of the Valsalva manoeuvre in the management of supraventricular tachycardia. Emerg Med J. 2012;29(9):707-709.' },
    { num: 5, text: 'DiMarco JP, et al. Adenosine for paroxysmal supraventricular tachycardia: dose ranging and comparison with verapamil. Ann Intern Med. 1990;113(2):104-110.' },
    { num: 6, text: 'Fromm C, et al. Diltiazem vs. metoprolol in the management of atrial fibrillation or flutter with rapid ventricular rate in the emergency department. J Emerg Med. 2015;49(2):175-182.' },
    { num: 7, text: 'Goldschlager N, et al. A practical guide for clinicians who treat patients with amiodarone. Heart Rhythm. 2007;4(9):1250-1259.' },
    { num: 8, text: 'Link MS, et al. Part 7: Adult Advanced Cardiovascular Life Support: 2015 American Heart Association Guidelines Update. Circulation. 2015;132(18 Suppl 2):S444-S464.' },
    { num: 9, text: 'Al-Khatib SM, et al. Wolff-Parkinson-White Syndrome. N Engl J Med. 2023;388(25):2349-2362.' },
    { num: 10, text: 'Pappone C, et al. Wolff-Parkinson-White syndrome: a review. Ann Intern Med. 2014;160(10):716-725.' },
    { num: 11, text: 'Murman DH, et al. Evaluation and Management of Paroxysmal Supraventricular Tachycardia in the Emergency Department. Emerg Med Clin North Am. 2019;37(3):387-401.' },
];
