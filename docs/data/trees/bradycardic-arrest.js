// MedKitt — Bradycardic Arrest
// Recognition → Immediate Pacing → Medications → Reversible Causes → TVP / ROSC / TOR
// 5 modules, ~14 nodes.
export const BRADYCARDIC_ARREST_CRITICAL_ACTIONS = [
    { text: 'Transcutaneous pacing FIRST — do not wait for medications', nodeId: 'brady-tcp' },
    { text: 'Set TCP rate 60-80 bpm, increase mA until electrical capture', nodeId: 'brady-tcp' },
    { text: 'Confirm mechanical capture — electrical capture alone is insufficient', nodeId: 'brady-capture' },
    { text: 'Atropine 1mg IV × 3 doses — often ineffective in infranodal block', nodeId: 'brady-atropine' },
    { text: 'Epinephrine infusion 2-10 mcg/min as bridge', nodeId: 'brady-epi-infusion' },
    { text: 'Hyperkalemia: calcium gluconate 1g IV immediately', nodeId: 'brady-causes' },
    { text: 'Hypothermia exception: defer pacing, active rewarming to >30°C first', nodeId: 'brady-tor' },
];
export const BRADYCARDIC_ARREST_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'brady-start',
        type: 'info',
        module: 1,
        title: 'Bradycardic Arrest: Recognition',
        body: '[Bradycardic Arrest Steps Summary](#/info/brady-steps-summary)\n\nBradycardic arrest: extreme bradycardia (<20 bpm) or asystole causing pulselessness.\n\n**Key steps:**\n• Confirm rhythm in **2 leads** — avoid misdiagnosing lead disconnect artifact as asystole\n• Check gain settings — low gain can mimic flat line\n• True asystole: no electrical activity in any lead\n• Extreme bradycardia: wide QRS escape rhythm, usually <20 bpm',
        images: [
            { src: 'images/cardiac-arrest/asystole-ecg.png', alt: 'Asystole ECG strip', caption: 'Asystole — confirm in 2 leads' },
            { src: 'images/cardiac-arrest/chb-ecg.png', alt: 'Complete heart block ECG', caption: 'Complete heart block with ventricular escape' },
        ],
        citation: [1, 2, 3],
        next: 'brady-confirm',
    },
    {
        id: 'brady-confirm',
        type: 'question',
        module: 1,
        title: 'Rhythm Classification',
        body: 'Asystole or extreme bradycardia with organized rhythm?',
        options: [
            {
                label: 'Asystole',
                description: 'No electrical activity in 2+ leads',
                next: 'brady-asystole-mgmt',
                urgency: 'critical',
            },
            {
                label: 'Extreme bradycardia with QRS',
                description: 'Wide escape rhythm, rate <20 bpm',
                next: 'brady-tcp',
                urgency: 'critical',
            },
        ],
        citation: [2],
    },
    // =====================================================================
    // MODULE 2: IMMEDIATE PACING
    // =====================================================================
    {
        id: 'brady-asystole-mgmt',
        type: 'info',
        module: 2,
        title: 'Asystole Management',
        body: '**Asystole is a non-shockable rhythm — do NOT defibrillate.**\n\n• **CPR immediately** — high-quality compressions\n• [Epinephrine](#/drug/epinephrine/cardiac arrest) 1mg IV/IO ASAP, repeat q3-5 min\n• TCP rarely effective in true asystole — pacing spikes without capture\n• Search aggressively for reversible causes (H\'s and T\'s)\n\n**Futility signal:**\n• ETCO2 <10 mmHg after 20 min of CPR → consider termination of resuscitation',
        citation: [2, 5, 6],
        next: 'brady-causes',
    },
    {
        id: 'brady-tcp',
        type: 'info',
        module: 2,
        title: 'Transcutaneous Pacing',
        body: '**Transcutaneous pacing immediately — don\'t wait for medications.**\n\n**Setup:**\n• Rate: 60-80 bpm\n• Start at 0 mA → increase until electrical capture (usually 50-100 mA)\n• AP pad position preferred (anterior: left parasternal, posterior: left infrascapular)\n\n**Confirm electrical capture:**\n• Pacer spike followed by wide QRS complex on monitor\n• Each spike produces a QRS — not just artifact\n\n**Bridge medication:**\n• [Epinephrine](#/drug/epinephrine/bradycardia) infusion 2-10 mcg/min while setting up pacing\n\n**If conscious patient → sedation required** (TCP is extremely painful)',
        citation: [2, 7, 8, 9],
        next: 'brady-capture',
    },
    {
        id: 'brady-capture',
        type: 'question',
        module: 2,
        title: 'Pacing Capture Assessment',
        body: 'Electrical AND mechanical capture achieved?\n\n**Electrical capture:** pacer spike + wide QRS on monitor\n**Mechanical capture:** palpable pulse AND/OR contractility on POCUS',
        options: [
            {
                label: 'Yes — both electrical and mechanical capture',
                description: 'Pacer spikes producing QRS AND pulse/contractility confirmed',
                next: 'brady-post-capture',
            },
            {
                label: 'Electrical capture only (no pulse/no POCUS contractility)',
                description: 'QRS complexes on monitor but no mechanical output',
                next: 'brady-no-capture',
                urgency: 'urgent',
            },
            {
                label: 'No electrical capture',
                description: 'Pacer spikes without QRS response despite max output',
                next: 'brady-no-capture',
                urgency: 'critical',
            },
        ],
        citation: [8, 9],
    },
    // =====================================================================
    // MODULE 3: MEDICATIONS
    // =====================================================================
    {
        id: 'brady-no-capture',
        type: 'info',
        module: 3,
        title: 'Failure to Capture',
        body: '**No mechanical capture despite electrical:**\n• Increase mA (up to max output)\n• Reposition pads — try AP position if using anterolateral\n• Ensure good skin contact (shave chest hair, dry skin)\n\n**If conscious patient — sedation for pacing:**\n• [Ketamine](#/drug/ketamine/procedural sedation) 1-2 mg/kg IV\n• [Fentanyl](#/drug/fentanyl/procedural) 1-2 mcg/kg IV\n\n**If no electrical capture at max output:**\n• Proceed to medications while arranging transvenous pacing\n• Consider that myocardium may be non-viable (prolonged arrest, severe hyperK)',
        citation: [2, 8],
        next: 'brady-atropine',
    },
    {
        id: 'brady-atropine',
        type: 'info',
        module: 3,
        title: 'Atropine',
        body: '[Atropine](#/drug/atropine/bradycardia) 1mg IV q3-5 min, max 3 doses (3mg total)\n\n**Effective in:**\n• Sinus bradycardia\n• AV nodal block (1° AVB, Mobitz I)\n\n**Limited efficacy in:**\n• Infranodal block (Mobitz II, 3° AVB) — block is below the vagal innervation\n• Transplanted hearts — denervated, no vagal tone to reverse\n• Wide-complex escape rhythms\n\n**Do NOT delay pacing for atropine** — atropine is an adjunct, not a substitute for pacing',
        citation: [2, 5, 6, 7],
        next: 'brady-epi-infusion',
    },
    {
        id: 'brady-epi-infusion',
        type: 'info',
        module: 3,
        title: 'Chronotropic Infusions',
        body: '**First-line:**\n• [Epinephrine](#/drug/epinephrine/bradycardia) infusion 2-10 mcg/min IV — titrate to HR >60 and adequate perfusion\n\n**Alternative (if epi unavailable):**\n• [Dopamine](#/drug/dopamine/bradycardia) 5-20 mcg/kg/min IV infusion\n\n**For denervated hearts (transplant):**\n• Isoproterenol 2-10 mcg/min — direct beta-agonist, bypasses vagal pathway\n\n**Key points:**\n• These are bridges to definitive pacing — not endpoints\n• Titrate to clinical effect (HR, BP, mental status)\n• Push-dose epi (10-20 mcg IV bolus) as temporizing measure while starting drip',
        citation: [2, 5, 7],
        next: 'brady-causes',
    },
    // =====================================================================
    // MODULE 4: REVERSIBLE CAUSES
    // =====================================================================
    {
        id: 'brady-causes',
        type: 'info',
        module: 4,
        title: 'Reversible Causes of Bradycardic Arrest',
        body: 'Treatable causes of bradycardic arrest:\n\n• **Hyperkalemia** (wide QRS, peaked T): [Calcium Gluconate](#/drug/calcium-gluconate/hyperkalemia) 1g IV + bicarb + insulin/dextrose\n• **Hypothermia**: active rewarming, defer pacing until >30°C (myocardium irritable below 30°C)\n• **Drug toxicity**: beta blocker → [Glucagon](#/drug/glucagon/beta blocker overdose) 3-10mg IV; Ca channel blocker → calcium + high-dose insulin; Digoxin → [DigiFab](#/drug/digifab/digoxin toxicity)\n• **AV block** (complete): temporary pacing bridge → TVP → permanent pacer\n• **Hypoxia**: airway + oxygenation first\n• **Myocardial infarction**: inferior STEMI → right-sided ECG\n\n**Remember:** Treat the cause, not just the rhythm',
        citation: [2, 3, 5, 10],
        next: 'brady-cause-check',
    },
    {
        id: 'brady-cause-check',
        type: 'question',
        module: 4,
        title: 'Reversible Cause Identified?',
        body: 'Has a reversible cause been identified?',
        options: [
            {
                label: 'Yes — treating cause',
                description: 'Reversible etiology identified and treatment initiated',
                next: 'brady-treat-cause',
            },
            {
                label: 'No — continue resuscitation',
                description: 'No reversible cause found, ongoing arrest',
                next: 'brady-tvp',
                urgency: 'urgent',
            },
        ],
        citation: [2],
    },
    {
        id: 'brady-treat-cause',
        type: 'info',
        module: 4,
        title: 'Treating Reversible Cause',
        body: 'Continue treating identified cause while maintaining pacing/medications.\n\n• Reassess rhythm and hemodynamics after each intervention\n• If **hyperkalemia** suspected, treat empirically even before labs return — calcium gluconate has minimal downside\n• Monitor for response: narrowing QRS, improving rate, return of pulse\n• May need to treat multiple causes simultaneously',
        citation: [2, 5],
        next: 'brady-tvp',
    },
    // =====================================================================
    // MODULE 5: TVP / ROSC / TOR
    // =====================================================================
    {
        id: 'brady-tvp',
        type: 'info',
        module: 5,
        title: 'Transvenous Pacing',
        body: '**Transvenous pacing (TVP)** — definitive temporary pacing:\n\n**Access:**\n• Right internal jugular (RIJ) — preferred, direct line to RV\n• Femoral vein — alternative, easier access during CPR\n\n**Placement:**\n• RV apex or RVOT\n• Confirm capture on monitor AND by pulse/POCUS\n\n**Emergency TVP:**\n• Float without fluoroscopy if patient unstable\n• Use balloon-tipped catheter for flow-directed placement\n• Confirm position with echocardiography\n\n**Consult:**\n• Cardiology/EP for placement and permanent pacing evaluation',
        citation: [7, 8],
        next: 'brady-rosc-check',
    },
    {
        id: 'brady-post-capture',
        type: 'info',
        module: 5,
        title: 'Post-Capture Management',
        body: 'TCP capture achieved — stabilize and plan:\n\n• **Monitor closely** — TCP can lose capture with patient movement\n• Prepare for **transvenous pacing** as definitive therapy\n• Continue medications as bridge (epi or dopamine infusion)\n• Identify and treat underlying cause\n• **Cardiology consult** for permanent pacing evaluation\n\n**Do not remove TCP pads** — keep as backup even after TVP placed',
        citation: [7, 8],
        next: 'brady-rosc-check',
    },
    {
        id: 'brady-rosc-check',
        type: 'question',
        module: 5,
        title: 'Patient Status',
        body: 'What is the current patient status?',
        options: [
            {
                label: 'ROSC with stable rhythm',
                description: 'Spontaneous circulation restored, paced or intrinsic rhythm',
                next: 'brady-rosc',
            },
            {
                label: 'Deteriorating / re-arrest',
                description: 'Loss of pulse, worsening hemodynamics',
                next: 'brady-rearrest',
                urgency: 'critical',
            },
            {
                label: 'Consider TOR (asystole, no reversible cause)',
                description: 'Prolonged arrest without response to interventions',
                next: 'brady-tor',
            },
        ],
        citation: [2, 3],
    },
    {
        id: 'brady-rosc',
        type: 'result',
        module: 5,
        title: 'ROSC Achieved',
        body: '**ROSC → Post-Cardiac Arrest Care**\n\n• [Post-Cardiac Arrest Care](#/tree/post-rosc)\n• 12-lead ECG — identify cause (STEMI, hyperK pattern, drug toxicity)\n• Continue pacing — do not remove TCP until TVP or stable intrinsic rhythm\n• **Cardiology consult** for permanent pacing evaluation\n• Targeted temperature management per protocol\n• Serial labs: K, lactate, troponin, blood gas',
        recommendation: 'Post-ROSC care: maintain pacing, 12-lead ECG, identify cause, cardiology consult.',
        confidence: 'definitive',
        citation: [2, 3],
    },
    {
        id: 'brady-rearrest',
        type: 'info',
        module: 5,
        title: 'Re-arrest',
        body: '**Re-arrest — return to CPR immediately.**\n\n• Reassess pacing capture — may have lost contact\n• Increase mA if electrical capture lost\n• Reassess reversible causes — something was missed or undertreated\n• Consider ECPR if available and criteria met\n• Continue epinephrine 1mg IV/IO q3-5 min',
        citation: [2],
        next: 'brady-tcp',
    },
    {
        id: 'brady-tor',
        type: 'info',
        module: 5,
        title: 'Termination of Resuscitation',
        body: '**Asystole is the strongest futility signal in cardiac arrest.**\n\nConsider TOR when:\n• ETCO2 <10 mmHg after 20 min of high-quality CPR\n• No reversible cause identified\n• No cardiac activity on POCUS (cardiac standstill)\n• No response to pacing, medications, or cause-directed therapy\n\n**EXCEPTION — Hypothermia:**\n• Rewarm to >30°C before declaring futility\n• **"Not dead until warm and dead"**\n• Active rewarming: warm IV fluids, forced air, lavage, ECMO rewarming\n\n[TOR Rules](#/info/ca-tor-rules)',
        citation: [2, 3, 10],
        next: 'brady-code-called',
    },
    {
        id: 'brady-code-called',
        type: 'result',
        module: 5,
        title: 'Code Called',
        body: 'Code called. Document all interventions, pacing attempts, and reasoning.\n\n**Documentation checklist:**\n• Resuscitation timeline (arrest → interventions → TOR)\n• Pacing parameters attempted (rate, mA, pad positions)\n• ETCO2 values throughout resuscitation\n• Medications given with times\n• Reversible causes evaluated\n• Termination rationale\n• Family communication',
        recommendation: 'Document resuscitation timeline, pacing parameters, ETCO2 values, and termination rationale.',
        confidence: 'definitive',
        citation: [2],
    },
];
export const BRADYCARDIC_ARREST_MODULE_LABELS = [
    'Recognition',
    'Immediate Pacing',
    'Medications',
    'Reversible Causes',
    'TVP / ROSC / TOR',
];
export const BRADYCARDIC_ARREST_CITATIONS = [
    { num: 1, text: 'Farkas J. Bradycardia. EMCrit IBCC. https://emcrit.org/ibcc/bradycardia/' },
    { num: 2, text: 'Panchal AR et al. 2023 AHA Focused Update on ACLS. Circulation. 2023.' },
    { num: 3, text: 'Soar J et al. ERC Guidelines 2021: Advanced Life Support. Resuscitation. 2021;161:115-151.' },
    { num: 4, text: 'First10EM. Bradycardia in the ED. first10em.com.' },
    { num: 5, text: 'Neumar RW et al. Part 8: Adult ACLS. Circulation. 2010.' },
    { num: 6, text: 'Link MS et al. Part 7: Adult ACLS. Circulation. 2015;132(18 Suppl 2):S444-S464.' },
    { num: 7, text: 'Kusumoto FM et al. 2018 ACC/AHA/HRS Guideline on Evaluation and Management of Bradycardia. Circulation. 2019;140(8):e382-e482.' },
    { num: 8, text: 'Weingart S. Transcutaneous Pacing. EMCrit Podcast. 2019.' },
    { num: 9, text: 'Nickson C. Transcutaneous Pacing. Life in the Fast Lane. litfl.com.' },
    { num: 10, text: 'Brown DJA et al. Accidental Hypothermia. NEJM. 2012;367(20):1930-1938.' },
];
