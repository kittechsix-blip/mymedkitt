// MedKitt - Push-Dose Pressors (Cardiac Pressors / Push-Dose Vasopressors)
// Indications -> Push-Dose Epinephrine -> Push-Dose Phenylephrine -> Push-Dose Norepinephrine -> Troubleshooting & Escalation
// 5 modules: Indications & Patient Selection -> Push-Dose Epinephrine -> Push-Dose Phenylephrine -> Push-Dose Norepinephrine -> Troubleshooting & Escalation
// 24 nodes total.
export const PUSH_DOSE_PRESSORS_CRITICAL_ACTIONS = [
    { text: 'Push-dose epi preferred over phenylephrine for most scenarios', nodeId: 'pdp-start' },
    { text: 'Epinephrine: 10 mcg (1 mL of 10 mcg/mL) IV push q2-5min', nodeId: 'pdp-epi-dosing' },
    { text: 'Phenylephrine: 100 mcg (1 mL of 100 mcg/mL) IV push q2-5min', nodeId: 'pdp-phenyl-dosing' },
    { text: 'Mix 1 mL cardiac epi (1:10,000) + 9 mL NS = 100 mcg/10 mL', nodeId: 'pdp-epi-mixing' },
    { text: 'Do NOT give 1 mg epi to patient with pulse', nodeId: 'pdp-start' },
    { text: 'Label syringes clearly to prevent dosing errors', nodeId: 'pdp-safety' },
    { text: 'Bridge to continuous infusion within 10-15 minutes', nodeId: 'pdp-troubleshooting' },
];
export const PUSH_DOSE_PRESSORS_NODES = [
    // =====================================================================
    // MODULE 1: INDICATIONS & PATIENT SELECTION
    // =====================================================================
    {
        id: 'pdp-start',
        type: 'question',
        module: 1,
        title: 'Push-Dose Pressors - Indications',
        body: '**Push-Dose Pressors Summary**\n\n**Definition:** Vasopressors administered as IV bolus doses for immediate blood pressure support, bridging to continuous infusion.\n\n**Key principle:** Push-dose pressors provide immediate hemodynamic support when continuous infusions cannot be established within 5-8 minutes. [1][2]\n\n**Epinephrine has won:** Dr. Weingart now recommends push-dose epinephrine over phenylephrine for most situations due to its combined inotropic and vasopressor effects. [1][6]\n\n**CRITICAL SAFETY:** These are NOT cardiac arrest doses. Do NOT give 1 mg IV epinephrine to a patient with a pulse. [1][2][3]\n\nWhat is the clinical scenario?',
        citation: [1, 2, 3, 6],
        calculatorLinks: [
            { id: 'map-calculator', label: 'MAP Calculator' },
            { id: 'pdp-epi-quick', label: 'Epi Quick Card' },
            { id: 'pdp-phenyl-quick', label: 'Phenyl Quick Card' },
        ],
        options: [
            {
                label: 'Peri-Intubation Hypotension',
                description: 'RSI in critically ill patient, anticipated or actual post-induction hypotension',
                next: 'pdp-peri-intubation',
                urgency: 'critical',
            },
            {
                label: 'Septic Shock - Bridge to Infusion',
                description: 'Hypotensive patient awaiting vasopressor drip from pharmacy',
                next: 'pdp-sepsis-bridge',
                urgency: 'urgent',
            },
            {
                label: 'Anaphylaxis - Refractory to IM Epi',
                description: 'No response after 2-3 doses of IM epinephrine',
                next: 'pdp-anaphylaxis',
                urgency: 'critical',
            },
            {
                label: 'Bradycardia with Hypotension',
                description: 'Symptomatic bradycardia requiring immediate chronotropic support',
                next: 'pdp-bradycardia',
                urgency: 'urgent',
            },
            {
                label: 'Procedural Hypotension',
                description: 'Sedation-induced, post-cardioversion, or procedure-related',
                next: 'pdp-procedural',
            },
        ],
        summary: 'Push-dose pressors bridge immediate hemodynamic support — epinephrine preferred over phenylephrine, NEVER give 1mg arrest dose to patient with pulse',
        safetyLevel: 'critical',
    },
    {
        id: 'pdp-peri-intubation',
        type: 'info',
        module: 1,
        title: 'Peri-Intubation Hypotension',
        body: '**Hypotension affects ~40% of critically ill patients undergoing emergency intubation** and is independently associated with increased mortality. [4][7]\n\n**Mechanism:** Multifactorial - loss of sympathetic drive, induction agent vasodilation, apnea worsening acidosis, reduced venous return after positive pressure ventilation. [4][7]\n\n**Prevention strategy:** [7]\n1. Optimize preload with IV fluids BEFORE induction\n2. Have push-dose pressor drawn up and at bedside\n3. Start vasopressor infusion peripherally if time permits\n4. Use hemodynamically stable induction agent (ketamine, etomidate)\n5. Use reduced sedative doses in shocked patients\n\n**Evidence:** In one case series of 11 patients receiving PDPs, mean SBP increased 41.3%, DBP 44.3%, and MAP 35.1% with no adverse events. [4]\n\n**Agent selection:** Epinephrine preferred (provides both alpha and beta effects). Phenylephrine may decrease cardiac output due to pure vasoconstriction. [4][7]',
        citation: [4, 7],
        next: 'pdp-epi-prep',
        summary: 'Peri-intubation hypotension in ~40% of critically ill — optimize preload, have push-dose pressor drawn up before induction, epinephrine preferred',
        skippable: true,
    },
    {
        id: 'pdp-sepsis-bridge',
        type: 'info',
        module: 1,
        title: 'Septic Shock - Bridge to Infusion',
        body: '**The problem:** Pharmacy-mixed vasopressor drips take 10-15 minutes minimum. Untreated hypotension kills. [1][2]\n\n**Bridge indication:** Push-dose pressors bridge the gap while waiting for continuous infusion or central line placement. [2][3]\n\n**Key points:**\n- Start peripheral vasopressors immediately (SSC 2021: peripheral NE is safe for <6 hours) [9]\n- Push-dose pressors provide temporary support, NOT definitive treatment\n- Continue aggressive volume resuscitation\n- Target MAP >=65 mmHg\n\n**Diastolic BP <40 mmHg** strongly suggests profound vasoplegia - vasopressor needed immediately. [9]\n\n**Agent selection:** \n- **Epinephrine preferred** (inotrope + pressor, especially if cardiac output may be impaired) [1]\n- **Phenylephrine** for pure vasodilatory shock with adequate cardiac output and tachycardia [1][3]',
        citation: [1, 2, 3, 9],
        next: 'pdp-agent-select',
        summary: 'Bridge to infusion while awaiting pharmacy drip — peripheral NE safe <6h per SSC 2021, diastolic <40 suggests severe vasoplegia',
        skippable: true,
    },
    {
        id: 'pdp-anaphylaxis',
        type: 'info',
        module: 1,
        title: 'Anaphylaxis - Refractory to IM Epinephrine',
        body: '**Refractory anaphylaxis:** Persistent symptoms despite 2-3 doses of IM epinephrine. Occurs in <1% of cases. [5][10]\n\n**CRITICAL:** Do NOT give cardiac arrest dose (1 mg IV) to patient with a pulse. This is a 61-fold dosing error compared to IM dosing. [5]\n\n**IV Epinephrine Protocol (PulmCrit approach):** [5][10]\n1. Mix 1 mg epinephrine in 100 mL NS = **10 mcg/mL**\n2. Loading: 20 mcg/min x 2 minutes (~40 mcg total)\n3. Maintenance: 10 mcg/min (= 60 mL/hr)\n4. Titrate based on response\n5. **AGGRESSIVELY WEAN** after symptom resolution\n\n**Brown et al 2004:** 19 patients with bee sting anaphylaxis treated with 5-15 mcg/min IV epinephrine - all responded within 5 minutes. [10]\n\n**Peri-arrest:** Push-dose epinephrine 20-50 mcg IV push, repeat every 1-2 minutes. [5]\n\n[Anaphylaxis Consult](#/tree/anaphylaxis)',
        citation: [5, 10],
        next: 'pdp-epi-prep',
        summary: 'Refractory anaphylaxis: IV epi 10-20mcg/min NOT cardiac arrest dose — 61-fold dosing error giving 1mg to patient with pulse',
        safetyLevel: 'critical',
    },
    {
        id: 'pdp-bradycardia',
        type: 'info',
        module: 1,
        title: 'Bradycardia with Hypotension',
        body: '**Push-dose epinephrine for symptomatic bradycardia** provides immediate chronotropic and inotropic support. [1][2]\n\n**Indications:**\n- Symptomatic bradycardia with hypotension\n- Bradycardia not responsive to atropine\n- Bridge to transcutaneous or transvenous pacing\n- Beta-blocker or calcium channel blocker toxicity\n\n**Why epinephrine?** Beta-1 agonism provides chronotropy (increased heart rate) AND inotropy (increased contractility). [1]\n\n**Dosing:** Push-dose epinephrine 10-20 mcg IV every 1-5 minutes, titrate to effect. [1][2]\n\n**Phenylephrine is NOT appropriate here** - pure alpha agonist may worsen bradycardia via reflex parasympathetic response. [1][3]\n\n**Definitive treatment:** Transcutaneous pacing, transvenous pacing, epinephrine infusion, or treatment of underlying cause.',
        citation: [1, 2, 3],
        next: 'pdp-epi-prep',
        summary: 'Push-dose epi for symptomatic bradycardia — beta-1 provides chronotropy + inotropy, phenylephrine is NOT appropriate (worsens bradycardia)',
    },
    {
        id: 'pdp-procedural',
        type: 'info',
        module: 1,
        title: 'Procedural Hypotension',
        body: '**Common scenarios:**\n- Post-propofol hypotension (propofol causes vasodilation + negative inotropy)\n- Post-cardioversion transient hypotension\n- Sedation for procedures in hemodynamically fragile patients\n\n**Key principle:** Anticipated transient hypotension can often be managed with a single push-dose, avoiding the need for continuous infusion. [2][3]\n\n**Agent selection:**\n- **Epinephrine:** Preferred for most situations, provides both chronotropy and vasoconstriction [1]\n- **Phenylephrine:** Reasonable for vasodilation with preserved cardiac function and tachycardia [3]\n\n**Prevention:**\n- Pre-hydrate with 250-500 mL crystalloid\n- Use reduced sedation doses\n- Have push-dose pressor drawn up before procedure\n- Consider ketamine for induction (hemodynamically stable)',
        citation: [1, 2, 3],
        next: 'pdp-agent-select',
        summary: 'Procedural hypotension often manageable with single push-dose — pre-hydrate, have pressor drawn up, use hemodynamically stable induction agent',
        skippable: true,
    },
    {
        id: 'pdp-agent-select',
        type: 'question',
        module: 1,
        title: 'Agent Selection',
        body: '**Choose the appropriate agent based on clinical scenario:**\n\n**Epinephrine (PREFERRED for most situations):** [1][6]\n- Combined alpha + beta agonist (inopressor)\n- Increases cardiac output AND vasoconstriction\n- Works in all circumstances\n- Safer to mix than phenylephrine (cardiac amp is 1:10,000)\n\n**Phenylephrine:** [1][3]\n- Pure alpha-1 agonist (pure vasoconstrictor)\n- NO cardiac output increase (may decrease it)\n- Best indication: hypotension with rapid AF or tachycardia where you want to avoid further HR increase\n- May cause reflex bradycardia\n\n**Norepinephrine:** [8]\n- Predominantly alpha-1 with some beta-1\n- Traditional first-line continuous infusion\n- Push-dose use emerging but less common than epi/phenyl',
        citation: [1, 3, 6, 8],
        options: [
            {
                label: 'Push-Dose Epinephrine',
                description: 'Preferred for most situations (inopressor)',
                next: 'pdp-epi-prep',
            },
            {
                label: 'Push-Dose Phenylephrine',
                description: 'Pure vasodilation with tachycardia, or patient already on beta-blockers',
                next: 'pdp-phenyl-prep',
            },
            {
                label: 'Push-Dose Norepinephrine',
                description: 'Less common; consider if already using NE infusion',
                next: 'pdp-norepi-prep',
            },
        ],
        summary: 'Epi preferred (inopressor for most), phenylephrine for tachycardia + pure vasodilation, NE emerging but primarily anesthesia',
    },
    // =====================================================================
    // MODULE 2: PUSH-DOSE EPINEPHRINE
    // =====================================================================
    {
        id: 'pdp-epi-prep',
        type: 'info',
        module: 2,
        title: 'Push-Dose Epinephrine - Preparation',
        body: '**EXACT DILUTION (EMCrit Method):** [1][2]\n\n**Step 1:** Take a 10 mL syringe filled with 9 mL of normal saline\n\n**Step 2:** Draw up 1 mL from the **cardiac epinephrine amp** (NOT the anaphylaxis amp)\n- Cardiac amp = 1:10,000 = 100 mcg/mL (0.1 mg/mL)\n- Contains 10 mL at 100 mcg/mL\n\n**Step 3:** Mix well (shake syringe)\n\n**Result:** 10 mL of epinephrine at **10 mcg/mL** (1:100,000)\n\n**Memory aid:** This is the same concentration as lidocaine with epinephrine (1:100,000) - very safe for extravasation. [2]\n\n**SAFETY:** Do NOT use pre-filled saline flush syringes - FDA prohibits using these to reconstitute medications (device classification issue). [6]\n\n**Pre-mixed syringes:** If your pharmacy provides pre-mixed epinephrine 10 mcg/mL syringes, use these preferentially to eliminate mixing errors. [6]',
        citation: [1, 2, 6],
        next: 'pdp-epi-dose',
        summary: '1mL cardiac epi (1:10,000) + 9mL NS = 10mcg/mL — same concentration as lido with epi, safe peripherally, LABEL syringe clearly',
        safetyLevel: 'critical',
        treatment: {
            firstLine: {
                drug: 'Epinephrine (push-dose)',
                dose: '1 mL cardiac amp + 9 mL NS',
                route: 'Syringe preparation',
                frequency: 'Make fresh for each patient',
                duration: 'Single patient use',
                notes: 'Cardiac amp is 1:10,000 (100 mcg/mL). Final concentration: 10 mcg/mL (1:100,000)',
            },
            monitoring: 'LABEL SYRINGE CLEARLY. Double-check concentration before each dose.',
        },
    },
    {
        id: 'pdp-epi-dose',
        type: 'info',
        module: 2,
        title: 'Push-Dose Epinephrine - Dosing',
        body: '**Dosing (from 10 mcg/mL syringe):** [1][2][3]\n\n**Standard dose:** 0.5-2 mL (5-20 mcg) IV push every 1-5 minutes\n\n**Typical starting dose:** 10-20 mcg (1-2 mL)\n\n**Pharmacokinetics:**\n- **Onset:** <1 minute\n- **Duration:** 5-10 minutes (usually effects gone within 5 min)\n- Redose as needed every 2-5 minutes\n\n**Titration:**\n- Start with 10 mcg if not in extremis\n- May increase to 20 mcg per push if inadequate response\n- Can give every 1-2 minutes in crashing patient\n\n**Bridge to infusion:**\n- Push-dose is temporary - prepare continuous infusion simultaneously\n- Typical transition: once stable for 5-10 minutes, wean push-dose as infusion takes effect\n\n**Monitoring:**\n- Continuous BP (cycle q2-3 min during acute phase)\n- Continuous cardiac monitoring (watch for tachyarrhythmias)\n- Reassess MAP after each push',
        citation: [1, 2, 3],
        calculatorLinks: [
            { id: 'epi-infusion', label: 'Epi Infusion Calculator' },
        ],
        next: 'pdp-epi-safety',
        summary: '5-20mcg (0.5-2mL) IV push q1-5min, onset <1min, duration 5-10min — bridge to continuous infusion, reassess MAP after each push',
        treatment: {
            firstLine: {
                drug: 'Epinephrine',
                dose: '5-20 mcg (0.5-2 mL of 10 mcg/mL)',
                route: 'IV push',
                frequency: 'Every 1-5 minutes',
                duration: 'Until stable or infusion established',
                notes: 'Onset <1 min, duration 5-10 min. Typical starting dose 10-20 mcg.',
                confidence: 'standard',
            },
            monitoring: 'BP q2-3 min during titration, continuous cardiac monitoring, watch for tachyarrhythmias.',
        },
    },
    {
        id: 'pdp-epi-safety',
        type: 'info',
        module: 2,
        title: 'Push-Dose Epinephrine - Safety',
        body: '**CRITICAL SAFETY - The 1 mg Error:** [1][2][5]\n\nGiving a full cardiac amp (1 mg = 1000 mcg) to a patient with a pulse can cause:\n- Malignant hypertension\n- Tachyarrhythmias (VT, VF)\n- Myocardial ischemia\n- Intracranial hemorrhage\n- Death\n\n**Prevention:**\n1. ALWAYS dilute the cardiac amp\n2. ALWAYS label the syringe clearly\n3. ALWAYS double-check concentration before each dose\n4. Use pre-mixed syringes when available\n5. Pharmacy oversight of protocols when feasible\n\n**Human error data:** Medication errors occurred in 19% of patients receiving push-dose pressors in one study. One reported case: 50 mg phenylephrine given instead of 50 mcg (1000x overdose). [6]\n\n**Peripheral IV safety:** Push-dose epinephrine at 10 mcg/mL is safe peripherally. This is the same concentration as lidocaine with epinephrine - extravasation is NOT a major concern. [1][2]',
        citation: [1, 2, 5, 6],
        next: 'pdp-epi-efficacy',
        summary: 'Full cardiac amp (1mg=1000mcg) to patient with pulse causes malignant HTN, VT/VF, ICH, death — ALWAYS dilute, ALWAYS label',
        safetyLevel: 'critical',
    },
    {
        id: 'pdp-epi-efficacy',
        type: 'info',
        module: 2,
        title: 'Push-Dose Epinephrine - Efficacy',
        body: '**Evidence for push-dose epinephrine:** [3][6][11]\n\n**Response rates:**\n- 71.8% of patients achieved >25% SBP increase with push-dose epinephrine [11]\n- Mean SBP increase 41.3%, DBP 44.3%, MAP 35.1% in peri-intubation case series [4]\n\n**Predictors of response:** [11]\n- History of CHF associated with better response (OR 11.889)\n- Likely due to inotropic effects beneficial in low-output states\n\n**Advantages over phenylephrine:** [1][6]\n- Provides both alpha AND beta effects (inopressor)\n- Increases cardiac output\n- Drugs circulate faster due to increased CO\n- Safer to mix (cardiac amp is already diluted)\n- Works in bradycardic patients (phenyl may worsen)\n\n**Adverse events:**\n- No serious adverse events in epinephrine cohort in large study [11]\n- Tachycardia (>30% HR increase) may occur\n- Monitor for dysrhythmias',
        citation: [1, 3, 4, 6, 11],
        next: 'pdp-troubleshoot',
        summary: '71.8% achieve >25% SBP increase — CHF patients respond better (inotropic effect), advantages over phenylephrine: alpha + beta effects',
        skippable: true,
    },
    // =====================================================================
    // MODULE 3: PUSH-DOSE PHENYLEPHRINE
    // =====================================================================
    {
        id: 'pdp-phenyl-prep',
        type: 'info',
        module: 3,
        title: 'Push-Dose Phenylephrine - Preparation',
        body: '**EXACT DILUTION (EMCrit Method):** [1][2]\n\n**Step 1:** Draw up 1 mL of phenylephrine from the vial\n- Vial concentration: 10 mg/mL\n- This equals 10 mg (10,000 mcg)\n\n**Step 2:** Inject into a 100 mL bag of normal saline\n\n**Step 3:** Mix well by inverting bag several times\n\n**Result:** 100 mL of phenylephrine at **100 mcg/mL**\n\n**Step 4:** Draw up into syringe for administration\n- Each 1 mL = 100 mcg\n\n**CAUTION:** Phenylephrine mixing requires more manipulation and has higher error potential than epinephrine. [1][6]\n\n**Pre-mixed syringes:** If your pharmacy provides pre-mixed phenylephrine 100 mcg/mL syringes, use these preferentially. [6]\n\n**Alternative preparation:** Some EDs stock pre-diluted phenylephrine vials (0.1 mg/mL = 100 mcg/mL). Check your formulary.',
        citation: [1, 2, 6],
        next: 'pdp-phenyl-dose',
        summary: '1mL phenylephrine (10mg/mL) in 100mL NS = 100mcg/mL — higher error potential than epi, use pre-mixed syringes when available',
        safetyLevel: 'warning',
        treatment: {
            firstLine: {
                drug: 'Phenylephrine (push-dose)',
                dose: '1 mL of 10 mg/mL + 100 mL NS',
                route: 'Bag preparation',
                frequency: 'Make fresh for each patient',
                duration: 'Single patient use',
                notes: 'Final concentration: 100 mcg/mL. Each 1 mL = 100 mcg.',
            },
            monitoring: 'LABEL BAG AND SYRINGE CLEARLY. Higher error potential than epinephrine preparation.',
        },
    },
    {
        id: 'pdp-phenyl-dose',
        type: 'info',
        module: 3,
        title: 'Push-Dose Phenylephrine - Dosing',
        body: '**Dosing (from 100 mcg/mL syringe):** [1][2][3]\n\n**Standard dose:** 0.5-2 mL (50-200 mcg) IV push every 3-5 minutes\n\n**Typical starting dose:** 100-200 mcg (1-2 mL)\n\n**Pharmacokinetics:**\n- **Onset:** <1 minute\n- **Duration:** 5-20 minutes (usually effects gone within 5 min)\n- Longer duration than epinephrine in some cases\n\n**Titration:**\n- Start with 100 mcg\n- May increase to 200 mcg if inadequate response\n- Redose every 3-5 minutes as needed\n\n**Clinical context for phenylephrine:** [1][3]\n- Pure alpha-1 agonist (vasoconstriction only)\n- NO chronotropy, NO inotropy\n- May cause reflex bradycardia\n- Best for: vasodilated patient with adequate cardiac output and tachycardia\n- Avoid if: bradycardia, cardiogenic component, impaired contractility\n\n**Response rate:** 55.9% achieved >25% SBP increase (vs 71.8% for epinephrine) [11]',
        citation: [1, 2, 3, 11],
        next: 'pdp-phenyl-safety',
        summary: '50-200mcg (0.5-2mL) IV push q3-5min — pure alpha agonist, no inotropy, may cause reflex bradycardia, 55.9% response rate',
        treatment: {
            firstLine: {
                drug: 'Phenylephrine',
                dose: '50-200 mcg (0.5-2 mL of 100 mcg/mL)',
                route: 'IV push',
                frequency: 'Every 3-5 minutes',
                duration: 'Until stable or infusion established',
                notes: 'Onset <1 min, duration 5-20 min. Pure alpha agonist - may cause reflex bradycardia.',
                confidence: 'caution',
            },
            monitoring: 'BP q3-5 min, watch for reflex bradycardia, ensure adequate cardiac output.',
        },
    },
    {
        id: 'pdp-phenyl-safety',
        type: 'info',
        module: 3,
        title: 'Push-Dose Phenylephrine - Safety',
        body: '**Peripheral IV safety:** [1][2]\n\nPhenylephrine is approved for IM and subcutaneous use, so extravasation from a peripheral IV is NOT a major concern.\n\n**Potential adverse effects:**\n- **Reflex bradycardia** - pure alpha agonism triggers baroreceptor-mediated parasympathetic response\n- **Decreased cardiac output** - increased afterload without inotropy can reduce stroke volume\n- **Hypertension** - overcorrection possible, especially in elderly\n\n**When to AVOID phenylephrine:** [1]\n- Bradycardia (may worsen)\n- Suspected low cardiac output / cardiogenic component\n- Impaired contractility (CHF, cardiomyopathy)\n- When chronotropy is desired\n\n**Medication error risk:** [6]\nHigher error potential than epinephrine:\n- Stock vial is HIGHLY concentrated (10 mg/mL)\n- Requires more dilution steps\n- Case report: 50 mg given instead of 50 mcg (1000x error)\n- Use pre-mixed syringes when available',
        citation: [1, 2, 6],
        next: 'pdp-phenyl-indications',
        summary: 'Avoid phenylephrine in bradycardia, low CO, or impaired contractility — case report of 1000x overdose (50mg vs 50mcg), use pre-mixed',
        safetyLevel: 'warning',
    },
    {
        id: 'pdp-phenyl-indications',
        type: 'info',
        module: 3,
        title: 'Push-Dose Phenylephrine - Best Indications',
        body: '**Best indications for phenylephrine over epinephrine:** [1][3]\n\n**1. Hypotension with tachyarrhythmia:**\n- Rapid atrial fibrillation with hypotension\n- SVT with hypotension\n- Sinus tachycardia >130 where additional chronotropy is undesirable\n\n**2. Pure vasodilatory state with preserved cardiac function:**\n- Post-spinal anesthesia hypotension\n- Drug-induced vasodilation (propofol, sedatives)\n- Distributive shock with hyperdynamic circulation\n\n**3. Patient on beta-blockers:**\n- Beta receptors already blocked\n- Alpha-mediated vasoconstriction still effective\n- (Though methylene blue may be better for refractory cases)\n\n**Clinical Pearl:** Even in these scenarios, epinephrine remains a reasonable choice - its beta effects are beneficial in most shock states. Weingart now prefers epinephrine for almost all situations. [1][6]\n\n**When phenylephrine fails:** Consider that cardiac output may be inadequate. Switch to epinephrine or add dobutamine. [1]',
        citation: [1, 3, 6],
        next: 'pdp-troubleshoot',
        summary: 'Best for: tachyarrhythmia with hypotension, pure vasodilation with preserved CO, patient on beta-blockers — Weingart now prefers epi for almost all',
        skippable: true,
    },
    // =====================================================================
    // MODULE 4: PUSH-DOSE NOREPINEPHRINE
    // =====================================================================
    {
        id: 'pdp-norepi-prep',
        type: 'info',
        module: 4,
        title: 'Push-Dose Norepinephrine - Overview',
        body: '**Push-dose norepinephrine is LESS COMMON** than push-dose epinephrine or phenylephrine, but emerging evidence supports its safety and efficacy. [8][12]\n\n**Why less common?**\n- Norepinephrine is primarily alpha-1 (like phenylephrine) with some beta-1\n- Epinephrine provides more robust beta effects\n- Mixing is similar complexity to phenylephrine\n- Historical concerns about extravasation (though peripheral use is now accepted)\n\n**Evidence base:** [8][12]\n- Scoping review (2024): 7 RCTs comparing NE to phenylephrine in cesarean section spinal hypotension\n- NE showed LESS bradycardia than phenylephrine\n- Fewer boluses needed to correct hypotension\n- Higher cardiac output and stroke volume maintained\n- No safety concerns with peripheral use at diluted concentrations\n\n**SSC 2021 supports peripheral norepinephrine** for up to 6 hours while central access is obtained. [9]',
        citation: [8, 9, 12],
        next: 'pdp-norepi-dose',
        summary: 'Push-dose NE emerging but less common — less bradycardia than phenylephrine, maintains CO better, peripheral NE safe <6h per SSC 2021',
        skippable: true,
    },
    {
        id: 'pdp-norepi-dose',
        type: 'info',
        module: 4,
        title: 'Push-Dose Norepinephrine - Preparation & Dosing',
        body: '**Preparation (if using push-dose NE):**\n\nNorepinephrine stock: typically 4 mg/4 mL (1 mg/mL) or 4 mg/250 mL (16 mcg/mL premix)\n\n**For push-dose use:**\n1. Use a pre-diluted concentration of **16 mcg/mL** or similar\n2. Alternatively: Draw 1 mL of 1 mg/mL NE + 99 mL NS = 10 mcg/mL\n\n**Dosing:**\n- Typical push-dose: 4-8 mcg IV push\n- Cesarean section studies used 4-8 mcg boluses [8][12]\n- May repeat every 1-2 minutes as needed\n\n**Peripheral IV safety:** [8][9][12]\n- Surviving Sepsis Campaign 2021: Peripheral NE is safe for limited duration (<6 hours)\n- Cleveland Clinic study: 51.6% of patients never needed central line\n- Incidence of extravasation complications is LOW at diluted concentrations\n- Have phentolamine available for extravasation management\n\n**Note:** For most ED scenarios, push-dose epinephrine is simpler and equally effective. Push-dose NE is primarily used in anesthesia settings.',
        citation: [8, 9, 12],
        next: 'pdp-norepi-peripheral',
        summary: '4-8mcg IV push q1-2min, use diluted concentration (10-16mcg/mL) — primarily anesthesia settings, epi simpler for most ED scenarios',
        treatment: {
            firstLine: {
                drug: 'Norepinephrine (push-dose)',
                dose: '4-8 mcg IV push',
                route: 'IV push',
                frequency: 'Every 1-2 minutes PRN',
                duration: 'Until stable or infusion established',
                notes: 'Less common than epi/phenyl. Use diluted concentration (10-16 mcg/mL).',
            },
            monitoring: 'Continuous BP and cardiac monitoring. Watch IV site for extravasation.',
        },
    },
    {
        id: 'pdp-norepi-peripheral',
        type: 'info',
        module: 4,
        title: 'Peripheral Norepinephrine - Safety Evidence',
        body: '**2024-2025 Evidence supports peripheral norepinephrine:** [8][9][12]\n\n**Cleveland Clinic Prospective Study (CHEST 2024):**\n- Implementing peripheral NE protocol avoided 1 CVC day per patient\n- 51.6% of patients never required central line insertion\n- Safe, feasible, and associated with decreased CVC utilization\n\n**2025 Follow-up data:**\n- Peripheral NE appears safe for up to 48 hours\n- Supports SSC guideline that vasopressors should start peripherally rather than delaying for central access\n\n**Systematic Review (2025):**\n- 83 articles reviewed\n- Noradrenaline CAN be administered peripherally\n- Complications (thrombophlebitis, cellulitis, tissue necrosis) are possible but incidence is LOW\n- Phentolamine is first-line for extravasation\n\n**Practical guidance:**\n- Use large-bore IV in proximal location (antecubital preferred)\n- Monitor IV site every 1-2 hours\n- Have phentolamine ready (5-10 mg diluted in 10 mL NS for local infiltration)\n- Transition to central line when stable and practical',
        citation: [8, 9, 12],
        next: 'pdp-troubleshoot',
        summary: 'Peripheral NE safe up to 48h per 2024-25 data — 51.6% never needed central line, use large-bore proximal IV, have phentolamine ready',
        skippable: true,
    },
    // =====================================================================
    // MODULE 5: TROUBLESHOOTING & ESCALATION
    // =====================================================================
    {
        id: 'pdp-troubleshoot',
        type: 'question',
        module: 5,
        title: 'Troubleshooting - Poor Response',
        body: '**If push-dose pressors are not achieving adequate MAP:**\n\nReassess the situation systematically.\n\n**Common issues:**\n1. **Hypovolemia** - pressors work poorly in empty tank\n2. **Inadequate dose** - may need more frequent or larger doses\n3. **Wrong agent** - switch from phenyl to epi if cardiac output low\n4. **Ongoing hemorrhage** - source control + transfusion\n5. **Acidosis** - severe acidosis impairs pressor response\n6. **Tension pneumothorax** - decompress immediately\n7. **Cardiac tamponade** - pericardiocentesis\n8. **Adrenal insufficiency** - stress-dose steroids\n\nWhat is the current clinical situation?',
        citation: [1, 3, 9],
        options: [
            {
                label: 'Suspected hypovolemia - needs more fluid',
                description: 'Empty tank, IVC collapsed, volume responsive',
                next: 'pdp-hypovolemia',
            },
            {
                label: 'Phenylephrine not working - switch agents',
                description: 'Possible low cardiac output or beta-blockade',
                next: 'pdp-switch-agent',
            },
            {
                label: 'Refractory despite adequate push-dose',
                description: 'Multiple agents, high doses, still hypotensive',
                next: 'pdp-refractory',
                urgency: 'critical',
            },
            {
                label: 'Ready to transition to continuous infusion',
                description: 'Patient stabilizing, infusion now available',
                next: 'pdp-transition',
            },
        ],
        summary: 'Systematic troubleshooting: hypovolemia (empty tank), wrong agent (phenyl failing = try epi), acidosis, obstructive causes',
    },
    {
        id: 'pdp-hypovolemia',
        type: 'info',
        module: 5,
        title: 'Hypovolemia - Volume First',
        body: '**Pressors work poorly in an empty tank.** [9]\n\n**POCUS assessment:**\n- IVC collapse on inspiration suggests volume responsiveness\n- Hyperdynamic, empty-appearing LV\n- Passive leg raise increases stroke volume\n\n**Volume resuscitation:**\n- Crystalloid: 500-1000 mL bolus, reassess\n- Blood products if hemorrhagic shock\n- LR preferred for large-volume resuscitation\n\n**Evidence from PRESSURE study:** [4]\nPatients who received >30 mL/kg fluids before phenylephrine required fewer and lower cumulative pressor doses.\n\n**Balance:**\n- Initial resuscitation: 30 mL/kg for sepsis (SSC 2021)\n- After initial resuscitation: be restrictive [9]\n- Most crystalloid extravasates (~95% leaves vasculature)\n- Track net fluid balance - avoid >4-5L net positive\n\n**Key insight:** Adequate preload + vasopressor is more effective than vasopressor alone.',
        citation: [4, 9],
        next: 'pdp-troubleshoot',
        summary: 'Pressors work poorly in empty tank — POCUS IVC, give 500-1000mL crystalloid, >30mL/kg initial sepsis resuscitation then restrict',
    },
    {
        id: 'pdp-switch-agent',
        type: 'info',
        module: 5,
        title: 'Switch Agents - Phenylephrine to Epinephrine',
        body: '**When phenylephrine fails, consider switching to epinephrine.** [1][11]\n\n**Reasons phenylephrine may fail:**\n1. **Low cardiac output** - phenylephrine increases afterload without inotropy, can worsen CO\n2. **Bradycardia** - phenylephrine may cause reflex bradycardia\n3. **Septic cardiomyopathy** - needs inotropic support\n4. **Beta-blocker toxicity** - may benefit from combined approach\n\n**Epinephrine advantages:** [1][6]\n- Provides alpha (vasoconstriction) AND beta (inotropy, chronotropy)\n- Increases cardiac output AND perfusion pressure\n- Better response rate: 71.8% vs 55.9% for phenyl [11]\n\n**If epinephrine also failing:**\n- Consider vasopressin (non-catecholamine mechanism)\n- Stress-dose steroids for refractory shock\n- Methylene blue for NO-mediated vasodilation\n- Reassess diagnosis (sepsis mimic? cardiogenic? obstructive?)\n\n[Sepsis Consult](#/tree/sepsis)',
        citation: [1, 6, 11],
        next: 'pdp-troubleshoot',
        summary: 'Phenylephrine failing: likely low CO — epi has 71.8% vs 55.9% response rate, consider vasopressin or methylene blue if refractory',
    },
    {
        id: 'pdp-refractory',
        type: 'info',
        module: 5,
        title: 'Refractory Shock',
        body: '**If shock persists despite adequate push-dose pressors + fluids:** [9]\n\n**Reassess diagnosis:**\n- Is this truly distributive shock?\n- Rule out obstructive causes (PE, tamponade, tension PTX)\n- Consider cardiogenic component\n- Sepsis mimics (adrenal crisis, thyroid storm)\n\n**Escalation ladder:**\n1. **Maximize push-dose pressor** (more frequent dosing)\n2. **Start continuous norepinephrine infusion** (can be peripheral)\n3. **Add vasopressin** 0.03-0.04 units/min (non-titratable)\n4. **Stress-dose hydrocortisone** 50 mg IV q6h or 200 mg/day\n5. **Consider methylene blue** 1-2 mg/kg IV for NO-mediated vasodilation\n6. **VA-ECMO** for refractory cardiogenic/mixed shock\n\n**Methylene Blue:** [9]\n- Ibarra-Estrada 2023 RCT: Shorter time to vasopressor discontinuation\n- Inhibits NO synthase, restores vascular tone\n- Consider when on multiple vasopressors + steroids\n\n[Sepsis Consult - Refractory Shock](#/tree/sepsis)',
        citation: [9],
        next: 'pdp-transition',
        summary: 'Refractory shock: escalation ladder — maximize pressor, add vasopressin, stress-dose hydrocortisone, methylene blue, consider VA-ECMO',
        safetyLevel: 'critical',
    },
    {
        id: 'pdp-transition',
        type: 'info',
        module: 5,
        title: 'Transition to Continuous Infusion',
        body: '**Bridge to infusion - the goal of push-dose pressors.** [1][2]\n\n**Timing:**\n- Push-dose is temporary (5-15 minutes max duration as primary therapy)\n- Continuous infusion should be prepared SIMULTANEOUSLY with push-dose administration\n- Once infusion available, transition promptly\n\n**Norepinephrine infusion (first-line for most shock):** [9]\n- Start 0.05 mcg/kg/min (4-6 mcg/min)\n- Titrate by 0.02-0.05 mcg/kg/min to MAP >=65\n- Can start peripherally for up to 6 hours (SSC 2021)\n\n**Epinephrine infusion (for bradycardia/low CO):**\n- Start 0.01-0.05 mcg/kg/min\n- Titrate to effect\n- Increases lactate (expected, often positive prognostic sign)\n\n**Transition technique:**\n1. Start continuous infusion at low rate\n2. Wait 5-10 minutes for steady state\n3. Wean push-dose as infusion takes effect\n4. Up-titrate infusion as needed\n5. Monitor closely during transition period',
        citation: [1, 2, 9],
        next: 'pdp-summary',
        summary: 'Push-dose is 5-15min bridge — prepare continuous infusion simultaneously, start low rate, wait 5-10min, wean push-dose as infusion takes effect',
    },
    {
        id: 'pdp-summary',
        type: 'result',
        module: 5,
        title: 'Push-Dose Pressors - Summary',
        body: '**Key takeaways:**\n\n**Agent Selection:**\n- **Epinephrine** - preferred for most situations (inopressor)\n- **Phenylephrine** - reserved for tachycardia with pure vasodilation\n- **Norepinephrine** - emerging push-dose use, primarily anesthesia settings\n\n**Preparation:**\n- Epi: 1 mL cardiac amp + 9 mL NS = 10 mcg/mL\n- Phenyl: 1 mL (10 mg) + 100 mL NS = 100 mcg/mL\n- LABEL SYRINGES CLEARLY\n\n**Dosing:**\n- Epi: 5-20 mcg IV push q1-5 min\n- Phenyl: 50-200 mcg IV push q3-5 min\n\n**Safety:**\n- NEVER give cardiac arrest dose (1 mg epi) to patient with pulse\n- Both safe peripherally at these concentrations\n- Use pre-mixed syringes when available\n\n**Transition:**\n- Push-dose is a BRIDGE - prepare infusion simultaneously\n- Once stable, transition to continuous norepinephrine or epinephrine infusion',
        recommendation: 'Push-dose pressors bridge the critical gap while continuous infusions are prepared. Epinephrine is preferred for most situations. ALWAYS dilute properly and label syringes. Transition to continuous infusion as soon as practical.',
        confidence: 'definitive',
        citation: [1, 2, 3, 6, 9],
    },
];
// =====================================================================
// MODULE LABELS
// =====================================================================
export const PUSH_DOSE_PRESSORS_MODULE_LABELS = [
    'Indications & Patient Selection',
    'Push-Dose Epinephrine',
    'Push-Dose Phenylephrine',
    'Push-Dose Norepinephrine',
    'Troubleshooting & Escalation',
];
export const PUSH_DOSE_PRESSORS_NODE_COUNT = 24;
// =====================================================================
// CITATIONS
// =====================================================================
export const PUSH_DOSE_PRESSORS_CITATIONS = [
    {
        num: 1,
        text: 'Weingart S. EMCrit Podcast 6 - Push-Dose Pressors. EMCrit. Updated 2023.',
    },
    {
        num: 2,
        text: 'Weingart S. EMCrit Podcast 205 - Push-Dose Pressors Update. EMCrit. 2018.',
    },
    {
        num: 3,
        text: 'Acquisto NM, Bodkin RP, Goyette RE. Push-Dose Pressors in the Emergency Department. ACEP Now. 2021.',
    },
    {
        num: 4,
        text: 'Panchal AR, Satyanarayan A, Baird JS, et al. Push-Dose Pressors During Peri-intubation Hypotension in the Emergency Department: A Case Series. West J Emerg Med. 2021;22(6):1304-1308.',
    },
    {
        num: 5,
        text: 'Farkas J. PulmCrit - How to use IV epinephrine for anaphylaxis. EMCrit. Aug 2019.',
    },
    {
        num: 6,
        text: 'Seybert AL, Sweeney BP. Push-Dose Vasopressors: Safety and Efficacy in Critically Ill Adults. REBEL EM. 2023.',
    },
    {
        num: 7,
        text: 'Heffner AC, Swords DS, Neale MN, Jones AE. Incidence and factors associated with cardiac arrest complicating emergency airway management. Resuscitation. 2013;84(11):1500-1504.',
    },
    {
        num: 8,
        text: 'Multiple Authors. Scoping Review: Is Push-Dose Norepinephrine a Better Choice? PMC. 2024.',
    },
    {
        num: 9,
        text: 'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
    },
    {
        num: 10,
        text: 'Brown SGA, Blackman KE, Stenlake V, Heddle R. Insect sting anaphylaxis; prospective evaluation of treatment with intravenous adrenaline and volume resuscitation. Emerg Med J. 2004;21(2):149-154.',
    },
    {
        num: 11,
        text: 'Rotando A, Picard L, Bhatt S, et al. The Safety and Efficacy of Push Dose Vasopressors in Critically Ill Adults. Ann Pharmacother. 2023;57(4):413-421.',
    },
    {
        num: 12,
        text: 'Loubani OM, Green RS. A Systematic Review of Extravasation and Local Tissue Injury from Administration of Vasopressors Through Peripheral Intravenous Catheters. J Crit Care. 2015;30(3):653.e9-653.e17.',
    },
];
