// MedKitt - Critical Care Drips
// Comprehensive ICU/ED medication infusions: vasopressors, inotropes, sedation, analgesia, antihypertensives, endocrine, antiarrhythmics
// Evidence-based dosing from EMCrit, UpToDate, SCCM 2021 guidelines
// 10 modules: Overview -> Vasopressors -> Inotropes -> Hypertensive Emergency -> Sedation -> Analgesia -> Endocrine -> Antiarrhythmics -> Rate Control -> Quick Reference
// Pharmacist category consult
export const CRITICAL_CARE_DRIPS_CRITICAL_ACTIONS = [
    { text: 'Norepinephrine is FIRST-LINE vasopressor for septic shock (SCCM 2021)', nodeId: 'ccd-norepinephrine' },
    { text: 'Vasopressin 0.04 U/min is FIXED dose - do NOT titrate', nodeId: 'ccd-vasopressin' },
    { text: 'Propofol infusion syndrome (PRIS): avoid >50 mcg/kg/min or >4-7 days', nodeId: 'ccd-propofol' },
    { text: 'Aortic dissection: esmolol FIRST (target HR <60, SBP <120), then add vasodilator', nodeId: 'ccd-dissection' },
    { text: 'DKA insulin: do NOT stop when glucose reaches 250 - reduce rate and add dextrose', nodeId: 'ccd-insulin-dka' },
    { text: 'Amiodarone max 2.2g/24h; lidocaine max 4.5 mg/kg (toxicity threshold)', nodeId: 'ccd-amiodarone' },
];
export const CRITICAL_CARE_DRIPS_MODULE_LABELS = [
    'Overview & Selection',
    'Vasopressors',
    'Inotropes',
    'Hypertensive Emergency',
    'Sedation',
    'Analgesia',
    'Endocrine',
    'Antiarrhythmics',
    'Rate Control',
    'Quick Reference',
];
export const CRITICAL_CARE_DRIPS_NODES = [
    // =====================================================================
    // MODULE 1: OVERVIEW & SELECTION
    // =====================================================================
    {
        id: 'ccd-start',
        type: 'question',
        module: 1,
        title: 'Critical Care Drips',
        body: '**Comprehensive ICU/ED Infusion Guide**\n\nEvidence-based dosing for critically ill patients. Select the clinical scenario:\n\n**Shock States:**\n- Vasopressors (septic, distributive, hypovolemic)\n- Inotropes (cardiogenic, RV failure)\n\n**Hypertensive Emergencies:**\n- Stroke, dissection, eclampsia, ACS protocols\n\n**Sedation/Analgesia:**\n- Propofol, dexmedetomidine, ketamine, opioids\n\n**Endocrine:**\n- DKA/HHS insulin, adrenal crisis, variceal bleeding\n\n**Antiarrhythmics:**\n- Amiodarone, lidocaine, rate control',
        citation: [1, 2],
        options: [
            { label: 'Vasopressors (Shock)', next: 'ccd-vasopressor-overview' },
            { label: 'Inotropes (Low Output)', next: 'ccd-inotrope-overview' },
            { label: 'Hypertensive Emergency', next: 'ccd-htn-overview' },
            { label: 'Sedation', next: 'ccd-sedation-overview' },
            { label: 'Analgesia', next: 'ccd-analgesia-overview' },
            { label: 'Endocrine Emergencies', next: 'ccd-endocrine-overview' },
            { label: 'Antiarrhythmics', next: 'ccd-antiarrhythmic-overview' },
            { label: 'Quick Reference Table', next: 'ccd-quick-reference' },
        ],
        summary: 'Comprehensive critical care drip guide: vasopressors, inotropes, sedation, analgesia, HTN, endocrine, antiarrhythmics',
    },
    // =====================================================================
    // MODULE 2: VASOPRESSORS
    // =====================================================================
    {
        id: 'ccd-vasopressor-overview',
        type: 'question',
        module: 2,
        title: 'Vasopressor Selection',
        body: '**SCCM 2021 Guidelines for Septic Shock:**\n\n**First-Line: Norepinephrine**\n- Alpha-1 dominant + beta-1 moderate\n- Fewer arrhythmias than dopamine\n- Target MAP ≥65 mmHg\n\n**Second-Line Options:**\n- **Vasopressin 0.04 U/min** - catecholamine-sparing, fixed dose\n- **Epinephrine** - if refractory to norepi + vasopressin\n\n**Special Situations:**\n- **Phenylephrine** - pure alpha, use if arrhythmias on norepi\n- **Dopamine** - only if bradycardic hypotension\n\nSelect agent:',
        citation: [1, 2, 3],
        options: [
            { label: 'Norepinephrine (First-Line)', next: 'ccd-norepinephrine' },
            { label: 'Vasopressin (Adjunct)', next: 'ccd-vasopressin' },
            { label: 'Epinephrine (Refractory)', next: 'ccd-epinephrine' },
            { label: 'Phenylephrine (Pure Alpha)', next: 'ccd-phenylephrine' },
            { label: 'Dopamine (Bradycardic)', next: 'ccd-dopamine' },
        ],
        summary: 'Norepinephrine first-line for septic shock; vasopressin adjunct; epinephrine for refractory',
    },
    {
        id: 'ccd-norepinephrine',
        type: 'info',
        module: 2,
        title: 'Norepinephrine (Levophed)',
        body: '**FIRST-LINE VASOPRESSOR - SEPTIC SHOCK**\n\n**Mechanism:**\n- Alpha-1 dominant (vasoconstriction)\n- Beta-1 moderate (inotropy)\n- Minimal beta-2 effects\n\n**Dosing:**\n- **Start:** 2-5 mcg/min (0.01-0.03 mcg/kg/min)\n- **Titrate:** +2-5 mcg/min every 5-10 min\n- **Target:** MAP ≥65 mmHg\n- **No absolute max** (refractory shock may need higher)\n\n**Administration:**\n- Central line preferred\n- Peripheral acceptable <48h at <15 mcg/min\n- Typical concentration: 16-128 mcg/mL\n\n**Titration Protocol:**\n- Check BP every 2-3 min during initial titration\n- Once stable, check every 5 min\n- If MAP >65 on high dose, consider adding vasopressin\n\n**Advantages:**\n- Fewer dysrhythmias vs dopamine\n- Better outcomes than dopamine in septic shock',
        citation: [1, 2, 3],
        options: [
            { label: 'Add Vasopressin (Refractory)', next: 'ccd-vasopressin' },
            { label: 'Switch to Epinephrine', next: 'ccd-epinephrine' },
            { label: 'Back to Vasopressor Selection', next: 'ccd-vasopressor-overview' },
        ],
        summary: 'Norepi: start 2-5 mcg/min, titrate by 2-5 q5-10min to MAP ≥65; first-line septic shock',
    },
    {
        id: 'ccd-vasopressin',
        type: 'info',
        module: 2,
        title: 'Vasopressin (ADH)',
        body: '**CATECHOLAMINE-SPARING ADJUNCT**\n\n**Mechanism:**\n- V1 receptor agonist (vascular smooth muscle)\n- Increases SVR without increasing PVR\n- NO direct inotropy\n- Non-catecholamine - works when catecholamines failing\n\n**Dosing:**\n- **FIXED DOSE: 0.04 U/min**\n- **DO NOT TITRATE**\n- Weight-independent\n- If needed: max 0.08-0.1 U/min (monitor for ischemia)\n\n**When to Add:**\n- Patient on high-dose norepinephrine\n- Goal: reduce norepinephrine requirement\n- Vasodilation is primary problem\n\n**Cautions:**\n- Mesenteric ischemia\n- Coronary vasoconstriction\n- Digital ischemia (more than catecholamines)\n- NO reversal agent for extravasation\n- Prefer central line\n\n**Key Point:** Add to norepi, don\'t replace',
        citation: [2, 3],
        options: [
            { label: 'Add Epinephrine (Still Refractory)', next: 'ccd-epinephrine' },
            { label: 'Back to Vasopressor Selection', next: 'ccd-vasopressor-overview' },
        ],
        summary: 'Vasopressin: FIXED 0.04 U/min - do NOT titrate; add to norepi as catecholamine-sparing agent',
    },
    {
        id: 'ccd-epinephrine',
        type: 'info',
        module: 2,
        title: 'Epinephrine (Adrenaline)',
        body: '**REFRACTORY SHOCK / ANAPHYLAXIS**\n\n**Mechanism:** Dose-dependent receptor effects\n- **Low dose (1-4 mcg/min):** Beta effects dominate (↑CO, ↓SVR)\n- **Medium (5-10 mcg/min):** Mixed alpha/beta\n- **High (>10 mcg/min):** Alpha effects dominate (↑SVR)\n\n**Dosing:**\n- **Start:** 1-4 mcg/min (0.01-0.04 mcg/kg/min)\n- **Titrate:** +1-2 mcg/min every 20 min\n- **Typical range:** 2-10 mcg/min\n- **Max:** 0.5 mcg/kg/min\n\n**Half-life:** ~2 minutes (extremely rapid)\n\n**Indications:**\n- **Anaphylaxis** (after IM epi)\n- **Cardiac arrest** (VF/pVT/asystole)\n- **Refractory shock** on max norepi + vasopressin\n- **Severe bradycardia** with hypotension\n\n**Cautions:**\n- High doses increase myocardial O2 demand\n- Worsens post-resuscitation myocardial dysfunction\n- Arrhythmogenic at high doses',
        citation: [1, 2],
        options: [
            { label: 'Back to Vasopressor Selection', next: 'ccd-vasopressor-overview' },
            { label: 'Consider Inotropes', next: 'ccd-inotrope-overview' },
        ],
        summary: 'Epinephrine: start 1-4 mcg/min, titrate +1-2 q20min; dose-dependent alpha/beta effects',
    },
    {
        id: 'ccd-phenylephrine',
        type: 'info',
        module: 2,
        title: 'Phenylephrine (Neosynephrine)',
        body: '**PURE ALPHA-1 AGONIST**\n\n**Mechanism:**\n- Exclusively alpha-1 adrenergic\n- Pure vasoconstriction, no direct inotropy\n- NO beta effects\n\n**Dosing:**\n- **Start:** 100-200 mcg/min\n- **Maintenance:** 40-80 mcg/min (taper once BP controlled)\n- **Push-dose:** 100 mcg boluses PRN\n\n**Indications:**\n- Norepinephrine-induced arrhythmias\n- High cardiac output + hypotension (pure distributive)\n- Adjunct to vasopressin/inotropes\n\n**Cautions:**\n- **Reflex bradycardia** - can decrease CO\n- Mesenteric/renal/coronary ischemia risk\n- Peripheral tissue necrosis (central line preferred)\n\n**When to Use:**\n- Patient tachycardic on norepinephrine\n- Arrhythmias limiting norepi dose\n- Pure vasodilation without cardiac dysfunction',
        citation: [2],
        options: [
            { label: 'Back to Vasopressor Selection', next: 'ccd-vasopressor-overview' },
        ],
        summary: 'Phenylephrine: pure alpha-1; start 100-200 mcg/min, maintain 40-80 mcg/min; causes reflex bradycardia',
    },
    {
        id: 'ccd-dopamine',
        type: 'info',
        module: 2,
        title: 'Dopamine',
        body: '**DOSE-DEPENDENT EFFECTS - NOT FIRST-LINE**\n\n**SCCM 2021: Recommends AGAINST dopamine as first-line** (more arrhythmogenic than norepi)\n\n**Mechanism:** Dose-dependent receptors\n- **Low (2-5 mcg/kg/min):** DA effects (splanchnic vasodilation)\n- **Medium (5-10 mcg/kg/min):** Beta-1 (↑CO, ↑HR, ↑SVR)\n- **High (>15 mcg/kg/min):** Alpha-1 (pure vasoconstriction)\n\n**Dosing:**\n- **Start:** 2-5 mcg/kg/min\n- **Titrate:** q5-10 min as needed\n- **Max:** 20 mcg/kg/min\n\n**Limited Indications:**\n- **Bradycardic hypotension** (best use case)\n- When arrhythmias are not a concern\n\n**Why Avoid:**\n- More arrhythmogenic than norepinephrine\n- Worse outcomes in septic shock trials\n- "Renal-dose dopamine" is a myth - no benefit proven',
        citation: [1, 2],
        options: [
            { label: 'Use Norepinephrine Instead', next: 'ccd-norepinephrine' },
            { label: 'Back to Vasopressor Selection', next: 'ccd-vasopressor-overview' },
        ],
        summary: 'Dopamine: NOT first-line (more arrhythmias); reserve for bradycardic hypotension only',
    },
    // =====================================================================
    // MODULE 3: INOTROPES
    // =====================================================================
    {
        id: 'ccd-inotrope-overview',
        type: 'question',
        module: 3,
        title: 'Inotrope Selection',
        body: '**For Cardiogenic Shock / Low Output States**\n\n**Dobutamine:**\n- Beta-1/beta-2 agonist\n- ↑Contractility, ↑HR, causes vasodilation\n- Risk: hypotension, tachycardia\n\n**Milrinone:**\n- PDE-3 inhibitor ("inodilator")\n- ↑Contractility + vasodilation\n- Better for RV failure, pulmonary HTN\n- Fewer arrhythmias than dobutamine\n\n**Key Difference:**\n- Milrinone: 32.8% significant arrhythmias\n- Dobutamine: 62.9% significant arrhythmias\n\nSelect agent:',
        citation: [4, 5],
        options: [
            { label: 'Dobutamine', next: 'ccd-dobutamine' },
            { label: 'Milrinone', next: 'ccd-milrinone' },
            { label: 'Back to Overview', next: 'ccd-start' },
        ],
        summary: 'Cardiogenic shock inotropes: dobutamine (beta agonist) vs milrinone (PDE-3 inhibitor, fewer arrhythmias)',
    },
    {
        id: 'ccd-dobutamine',
        type: 'info',
        module: 3,
        title: 'Dobutamine',
        body: '**BETA-1/BETA-2 AGONIST INOTROPE**\n\n**Mechanism:**\n- Beta-1 dominant (↑contractility, ↑HR, ↑CO)\n- Beta-2 secondary (peripheral vasodilation)\n- Minimal alpha effects\n\n**Dosing:**\n- **Start:** 2.5-5 mcg/kg/min\n- **Titrate:** +2.5 mcg/kg/min increments\n- **Max:** 20+ mcg/kg/min (titrate to effect)\n\n**Indications:**\n- Cardiogenic shock (with hypotension)\n- Low output heart failure\n- When norepinephrine alone insufficient\n\n**Cautions:**\n- Tachycardia and arrhythmias (especially >10 mcg/kg/min)\n- Worsens myocardial ischemia in CAD\n- Peripheral vasodilation may worsen hypotension\n- Often needs norepinephrine alongside\n\n**Clinical Pearl:**\n- If patient becomes MORE hypotensive, switch to milrinone or add vasopressor',
        citation: [4, 5],
        options: [
            { label: 'Switch to Milrinone', next: 'ccd-milrinone' },
            { label: 'Add Vasopressor', next: 'ccd-vasopressor-overview' },
            { label: 'Back to Inotrope Selection', next: 'ccd-inotrope-overview' },
        ],
        summary: 'Dobutamine: start 2.5-5 mcg/kg/min, max 20; beta agonist causes tachycardia and hypotension',
    },
    {
        id: 'ccd-milrinone',
        type: 'info',
        module: 3,
        title: 'Milrinone (Primacor)',
        body: '**PDE-3 INHIBITOR - "INODILATOR"**\n\n**Mechanism:**\n- Phosphodiesterase-3 inhibitor\n- ↑Inotropy (independent of adrenergic receptors)\n- ↑Lusitropy (diastolic function)\n- Peripheral vasodilation (↓afterload/PVR)\n\n**Dosing:**\n- **NO loading dose** (hypotension risk)\n- **Start:** 0.25 mcg/kg/min\n- **Titrate:** +0.125-0.25 mcg/kg/min every 5-15 min\n- **Range:** 0.25-0.75 mcg/kg/min\n- **Max:** 1.13 mcg/kg/min\n\n**Indications:**\n- Cardiogenic shock with elevated SVR\n- Acute heart failure with elevated afterload\n- **RV dysfunction / pulmonary HTN** (preferred)\n- Septic shock (not first-line)\n\n**Advantages vs Dobutamine:**\n- Fewer arrhythmias (32.8% vs 62.9%)\n- Better for pulmonary hypertension\n- No increase in myocardial O2 demand\n\n**Caution:** More hypotension than dobutamine',
        citation: [4, 5],
        options: [
            { label: 'Add Vasopressor', next: 'ccd-vasopressor-overview' },
            { label: 'Back to Inotrope Selection', next: 'ccd-inotrope-overview' },
        ],
        summary: 'Milrinone: start 0.25 mcg/kg/min (no bolus), max 0.75; fewer arrhythmias, good for RV/pulm HTN',
    },
    // =====================================================================
    // MODULE 4: HYPERTENSIVE EMERGENCY
    // =====================================================================
    {
        id: 'ccd-htn-overview',
        type: 'question',
        module: 4,
        title: 'Hypertensive Emergency',
        body: '**General Principle:** Reduce MAP by 20-25% over first hour using short-acting, titratable IV agents.\n\n**Condition-Specific Targets:**\n\n**Aortic Dissection:**\n- SBP <120, HR <60 ASAP\n- Esmolol FIRST, then vasodilator\n\n**Acute Ischemic Stroke (tPA candidate):**\n- SBP <185, DBP <110\n- Nicardipine or labetalol\n\n**Eclampsia/Preeclampsia:**\n- SBP <160, DBP <110\n- Labetalol or hydralazine\n\n**ACS with Hypertension:**\n- Reduce afterload, preserve coronary flow\n- Nicardipine or nitroglycerin\n\nSelect clinical scenario:',
        citation: [6, 7],
        options: [
            { label: 'Aortic Dissection', next: 'ccd-dissection' },
            { label: 'Stroke (tPA candidate)', next: 'ccd-stroke-htn' },
            { label: 'Eclampsia', next: 'ccd-eclampsia' },
            { label: 'ACS with HTN', next: 'ccd-acs-htn' },
            { label: 'General HTN Emergency', next: 'ccd-htn-agents' },
        ],
        summary: 'HTN emergency: reduce MAP 20-25% over 1h; specific targets for dissection, stroke, eclampsia',
    },
    {
        id: 'ccd-dissection',
        type: 'info',
        module: 4,
        title: 'Aortic Dissection Protocol',
        body: '**TARGET: SBP <120 mmHg, HR <60 bpm ASAP**\n\nGoal: Reduce dP/dt (aortic shear stress)\n\n**STEP 1: BETA-BLOCKER FIRST**\n\n**Esmolol (preferred - ultra-short acting):**\n- Load: 500-1000 mcg/kg over 1 min\n- Infusion: 50 mcg/kg/min, titrate to 200-300 mcg/kg/min\n- Onset: 60 seconds\n- Duration: 10-20 min (if problems, wears off fast)\n\n**Labetalol (alternative):**\n- 20 mg IV bolus, then 20-80 mg q10min (max 300mg)\n- OR infusion 1-3 mg/min\n\n**STEP 2: ADD VASODILATOR IF BP STILL ELEVATED**\n\n**After HR controlled (<60):**\n- Nicardipine 5-15 mg/hr OR\n- Nitroprusside 0.3-2 mcg/kg/min (with beta-blocker!)\n\n**CRITICAL:** Never give vasodilator alone (reflex tachycardia worsens dissection)',
        citation: [6, 7],
        options: [
            { label: 'Esmolol Details', next: 'ccd-esmolol' },
            { label: 'Nicardipine Details', next: 'ccd-nicardipine' },
            { label: 'Back to HTN Overview', next: 'ccd-htn-overview' },
        ],
        summary: 'Dissection: esmolol FIRST (HR <60), then add nicardipine/nitroprusside; NEVER vasodilator alone',
    },
    {
        id: 'ccd-stroke-htn',
        type: 'info',
        module: 4,
        title: 'Stroke HTN Management',
        body: '**tPA CANDIDATE: SBP <185, DBP <110**\n\n**First-Line: Nicardipine**\n- Start: 5 mg/hr\n- Titrate: +2.5 mg/hr every 5 min\n- Max: 15 mg/hr\n- 91.7% reach target in 30 min\n\n**Alternative: Labetalol**\n- 10-20 mg IV push over 1-2 min\n- Can repeat or start infusion\n- 82.5% reach target in 30 min\n\n**Post-tPA Goals:**\n- Maintain BP <180/105 for 24 hours\n- Avoid excessive reduction (worsens ischemia)\n\n**Non-tPA Candidate:**\n- Only treat if BP >220/120\n- Or with end-organ damage\n- Reduce by 15% over 24 hours\n\n**WARNING:** Do NOT over-correct BP in stroke (worsens penumbral perfusion)',
        citation: [6, 7],
        options: [
            { label: 'Nicardipine Details', next: 'ccd-nicardipine' },
            { label: 'Labetalol Details', next: 'ccd-labetalol' },
            { label: 'Back to HTN Overview', next: 'ccd-htn-overview' },
        ],
        summary: 'Stroke tPA: SBP <185, DBP <110; nicardipine preferred (faster to goal); avoid over-correction',
    },
    {
        id: 'ccd-eclampsia',
        type: 'info',
        module: 4,
        title: 'Eclampsia/Preeclampsia',
        body: '**TARGET: SBP <160, DBP <110**\n(Less aggressive than other HTN emergencies)\n\n**First-Line: Labetalol**\n- 20 mg IV bolus\n- Then 20-80 mg q10min (max 300 mg cumulative)\n- OR infusion 1-2 mg/min\n- Safe in pregnancy\n\n**Alternative: Hydralazine**\n- 5-10 mg IV q20-30min\n- Onset 10-20 min (less predictable)\n- Max 300 mg/24h\n- Traditional choice but slower onset\n\n**Second-Line: Nifedipine (oral)**\n- 10-20 mg PO q20-30min\n- Immediate-release formulation\n- Can use if IV access difficult\n\n**AVOID in Pregnancy:**\n- ACE inhibitors, ARBs (fetal toxicity)\n- Nitroprusside (cyanide crosses placenta)\n\n**Don\'t forget:** Magnesium sulfate for seizure prophylaxis',
        citation: [6, 7],
        options: [
            { label: 'Labetalol Details', next: 'ccd-labetalol' },
            { label: 'Back to HTN Overview', next: 'ccd-htn-overview' },
        ],
        summary: 'Eclampsia: SBP <160, DBP <110; labetalol or hydralazine; AVOID ACE-I, ARBs, nitroprusside',
    },
    {
        id: 'ccd-acs-htn',
        type: 'info',
        module: 4,
        title: 'ACS with Hypertension',
        body: '**GOAL: Reduce afterload while preserving coronary perfusion**\n\n**Preferred Agents:**\n\n**Nicardipine:**\n- Preserves/increases coronary blood flow\n- Start 5 mg/hr, titrate to 15 mg/hr\n- No reflex tachycardia\n\n**Nitroglycerin:**\n- Increases coronary blood flow\n- Reduces preload (helpful if pulmonary edema)\n- Start 5-10 mcg/min, titrate to effect\n- Tolerance develops >12-24h continuous\n\n**Esmolol (if tachycardic):**\n- Negative inotrope = beneficial in ACS\n- Load 500 mcg/kg, then 50-200 mcg/kg/min\n\n**AVOID:**\n- Hydralazine (reflex tachycardia worsens ischemia)\n- Nitroprusside (coronary steal phenomenon)',
        citation: [6, 7],
        options: [
            { label: 'Nicardipine Details', next: 'ccd-nicardipine' },
            { label: 'Nitroglycerin Details', next: 'ccd-nitroglycerin' },
            { label: 'Back to HTN Overview', next: 'ccd-htn-overview' },
        ],
        summary: 'ACS HTN: nicardipine or nitroglycerin (preserve coronary flow); avoid hydralazine, nitroprusside',
    },
    {
        id: 'ccd-htn-agents',
        type: 'question',
        module: 4,
        title: 'HTN Emergency Agents',
        body: '**Titratable IV Antihypertensives**\n\n**Fastest to Goal:**\n- **Nicardipine:** 91.7% at target in 30 min\n- **Labetalol:** 82.5% at target in 30 min\n\n**Ultra-Short Acting:**\n- **Clevidipine:** Onset 1-4 min, offset 5-15 min\n- **Esmolol:** Onset 60 sec, offset 10-20 min\n\n**Traditional:**\n- **Nitroprusside:** Potent but cyanide toxicity risk\n- **Nitroglycerin:** Best for pulmonary edema/ACS\n- **Hydralazine:** Pregnancy, unpredictable\n\nSelect agent for details:',
        citation: [6, 7],
        options: [
            { label: 'Nicardipine', next: 'ccd-nicardipine' },
            { label: 'Labetalol', next: 'ccd-labetalol' },
            { label: 'Esmolol', next: 'ccd-esmolol' },
            { label: 'Clevidipine', next: 'ccd-clevidipine' },
            { label: 'Nitroprusside', next: 'ccd-nitroprusside' },
            { label: 'Nitroglycerin', next: 'ccd-nitroglycerin' },
        ],
        summary: 'HTN agents: nicardipine fastest to goal; clevidipine/esmolol ultra-short; nitroprusside has toxicity',
    },
    {
        id: 'ccd-nicardipine',
        type: 'info',
        module: 4,
        title: 'Nicardipine (Cardene)',
        body: '**DIHYDROPYRIDINE CCB - MOST COMMONLY RECOMMENDED**\n\n**Mechanism:** Selective arteriolar vasodilation, reduces SVR/afterload\n\n**Dosing:**\n- **Start:** 5 mg/hr IV infusion\n- **Titrate:** +2.5 mg/hr every 5 minutes\n- **Range:** 5-15 mg/hr\n- **Max:** 15 mg/hr\n- **Onset:** 10-15 min\n- **Duration:** 3-8 hours\n\n**Advantages:**\n- **Fastest to goal** (91.7% at target in 30 min)\n- Preserves/increases coronary blood flow\n- No reflex tachycardia\n- Safe in MI, heart failure\n\n**Cautions:**\n- Avoid in severe LV dysfunction (aggressive afterload reduction)\n\n**Clinical Pearl:** Start at 5, bump to 7.5 after 5 min, then 10 if needed. Most patients controlled at 10-15 mg/hr.',
        citation: [6, 7],
        options: [
            { label: 'Back to HTN Agents', next: 'ccd-htn-agents' },
            { label: 'Back to HTN Overview', next: 'ccd-htn-overview' },
        ],
        summary: 'Nicardipine: start 5 mg/hr, titrate +2.5 q5min, max 15; fastest to goal, preserves coronary flow',
    },
    {
        id: 'ccd-labetalol',
        type: 'info',
        module: 4,
        title: 'Labetalol (Normodyne)',
        body: '**COMBINED ALPHA/BETA BLOCKER**\n\n**Mechanism:** Beta-blockade (HR/CO control) + alpha-blockade (vasodilation)\n\n**IV Push Dosing:**\n- **Start:** 20 mg IV over 2 min\n- **Repeat:** 20-80 mg q10min\n- **Max cumulative:** 300 mg\n- **Onset:** 2-5 min, peak 5-15 min\n- **Duration:** 2-4 hours\n\n**IV Infusion:**\n- 1-2 mg/min, titrate to effect\n- Range: 1-3 mg/min\n- Max: 3 mg/kg/h\n\n**Best Uses:**\n- Aortic dissection (dual alpha/beta = reduces dP/dt)\n- Eclampsia/pregnancy (safe)\n- HTN with tachycardia\n\n**Avoid:**\n- Asthma/COPD (beta-blockade)\n- Severe bradycardia/heart block\n- Acute MI with cardiogenic shock',
        citation: [6, 7],
        options: [
            { label: 'Back to HTN Agents', next: 'ccd-htn-agents' },
            { label: 'Back to HTN Overview', next: 'ccd-htn-overview' },
        ],
        summary: 'Labetalol: 20mg IV bolus, repeat q10min (max 300mg); OR infusion 1-3 mg/min; safe in pregnancy',
    },
    {
        id: 'ccd-esmolol',
        type: 'info',
        module: 4,
        title: 'Esmolol (Brevibloc)',
        body: '**ULTRA-SHORT ACTING BETA-1 BLOCKER**\n\n**Mechanism:** Rapid beta-1 blockade (reduces HR, contractility, dP/dt)\n\n**Dosing:**\n- **Load:** 500-1000 mcg/kg over 1 min\n- **Infusion:** 50 mcg/kg/min, titrate up\n- **Range:** 50-300 mcg/kg/min\n- **Onset:** 60 seconds\n- **Duration:** 10-20 min (esterase metabolism)\n\n**Best Uses:**\n- **Aortic dissection** (DRUG OF CHOICE)\n- Perioperative HTN/tachycardia\n- ACS with HTN/tachycardia\n- Thyroid storm\n\n**Key Advantage:**\n- Ultra-short half-life allows rapid titration\n- If complications occur, wears off in 10-20 min\n- No accumulation even with prolonged infusion\n\n**Avoid:**\n- Asthma/severe COPD\n- Severe bradycardia/AV block',
        citation: [6, 7],
        options: [
            { label: 'Back to HTN Agents', next: 'ccd-htn-agents' },
            { label: 'Aortic Dissection Protocol', next: 'ccd-dissection' },
        ],
        summary: 'Esmolol: load 500-1000 mcg/kg, infuse 50-300 mcg/kg/min; ultra-short acting, ideal for dissection',
    },
    {
        id: 'ccd-clevidipine',
        type: 'info',
        module: 4,
        title: 'Clevidipine (Cleviprex)',
        body: '**ULTRA-SHORT ACTING CCB**\n\n**Mechanism:** Rapid arteriolar vasodilation (selective vascular smooth muscle)\n\n**Dosing:**\n- **Start:** 1-2 mg/hr\n- **Titrate:** DOUBLE every 90 seconds until approaching goal\n- **Maintenance:** 4-6 mg/hr typical\n- **Max:** 32 mg/hr (rarely needed)\n- **Onset:** 1-4 minutes\n- **Offset:** 5-15 minutes\n\n**Advantages:**\n- **Fastest onset/offset** of all IV agents\n- No cyanide/thiocyanate toxicity\n- Better BP control than nitroglycerin\n- Lower mortality than nitroprusside\n\n**Cautions:**\n- Lipid emulsion formulation (pancreatitis if TG >1000)\n- **Contraindicated:** Egg/soybean allergy\n- More expensive than alternatives\n\n**Clinical Pearl:** Great rescue agent when other drugs failing - can double dose every 90 sec',
        citation: [6, 7],
        options: [
            { label: 'Back to HTN Agents', next: 'ccd-htn-agents' },
        ],
        summary: 'Clevidipine: start 1-2 mg/hr, double q90sec; ultra-fast onset/offset; lipid formulation (egg allergy CI)',
    },
    {
        id: 'ccd-nitroprusside',
        type: 'info',
        module: 4,
        title: 'Nitroprusside (Nipride)',
        body: '**DIRECT VASODILATOR - CYANIDE TOXICITY RISK**\n\n**Mechanism:** Releases NO, causing arterial + venous dilation\n\n**Dosing:**\n- **Start:** 0.3-0.5 mcg/kg/min\n- **Titrate:** +0.5 mcg/kg/min q2-3 min\n- **Range:** 0.5-2 mcg/kg/min\n- **Max:** 10 mcg/kg/min\n- **Onset:** <1 minute\n- **Offset:** 1-3 minutes\n\n**TOXICITY - CRITICAL:**\n- **Cyanide toxicity:** >2 mcg/kg/min for >4 hours\n- **Thiocyanate toxicity:** Prolonged use (>1 week) or renal failure\n- **Signs:** Agitation, seizures, tachycardia, metabolic acidosis\n\n**Limited Indications:**\n- Acute decompensated HF with HTN\n- Hypertensive encephalopathy\n- Dissection (ONLY with beta-blocker!)\n\n**Many institutions phasing out** in favor of nicardipine/clevidipine',
        citation: [6, 7],
        options: [
            { label: 'Use Nicardipine Instead', next: 'ccd-nicardipine' },
            { label: 'Back to HTN Agents', next: 'ccd-htn-agents' },
        ],
        summary: 'Nitroprusside: start 0.3 mcg/kg/min, max 10; CYANIDE TOXICITY >2 mcg/kg/min x 4h; avoid if possible',
    },
    {
        id: 'ccd-nitroglycerin',
        type: 'info',
        module: 4,
        title: 'Nitroglycerin (IV)',
        body: '**ORGANIC NITRATE - BEST FOR ACS/PULM EDEMA**\n\n**Mechanism:**\n- Primarily venous dilation (↓preload)\n- Higher doses: arteriolar dilation\n- Preserves/increases coronary blood flow\n\n**Dosing:**\n- **Start:** 5-10 mcg/min\n- **Titrate:** +5-10 mcg/min q3-5 min\n- **Range:** 20-50 mcg/min typical\n- **Max:** 100+ mcg/min possible\n- **Onset:** 1-3 min\n- **Duration:** 5-10 min\n\n**Best Uses:**\n- HTN with acute pulmonary edema\n- Acute MI with HTN/ischemia\n- Acute heart failure with HTN\n\n**Limitations:**\n- Tolerance develops with continuous >12-24h\n- Variable response (some nitrate-resistant)\n- Less effective for pure afterload reduction vs nicardipine\n\n**Caution:** Avoid if recent PDE-5 inhibitor (sildenafil, etc.) - severe hypotension',
        citation: [6, 7],
        options: [
            { label: 'Back to HTN Agents', next: 'ccd-htn-agents' },
        ],
        summary: 'Nitroglycerin: start 5-10 mcg/min, titrate q3-5min; best for ACS/pulm edema; tolerance >12-24h',
    },
    // =====================================================================
    // MODULE 5: SEDATION
    // =====================================================================
    {
        id: 'ccd-sedation-overview',
        type: 'question',
        module: 5,
        title: 'ICU Sedation',
        body: '**Modern Approach: Light Sedation Preferred**\n\nTarget RASS -1 to 0 (unless paralyzed/specific indication)\n\n**Agent Selection:**\n\n**Propofol:**\n- Rapid on/off, allows neuro checks\n- Risk: PRIS if >50 mcg/kg/min or >4-7 days\n- Hypotension common\n\n**Dexmedetomidine:**\n- NO respiratory depression\n- Can continue through extubation\n- Lower delirium than propofol\n- Limit to 5 days (tachyphylaxis)\n\n**Ketamine:**\n- Preserves BP (hemodynamically unstable)\n- Preserves respiratory drive\n- Good for sepsis/shock\n\n**Midazolam:**\n- Falling out of favor (metabolite accumulation)\n- Reserve when others unavailable\n\nSelect agent:',
        citation: [8, 9, 10],
        options: [
            { label: 'Propofol', next: 'ccd-propofol' },
            { label: 'Dexmedetomidine', next: 'ccd-dexmedetomidine' },
            { label: 'Ketamine', next: 'ccd-ketamine' },
            { label: 'Midazolam', next: 'ccd-midazolam' },
        ],
        summary: 'ICU sedation: propofol (rapid on/off), dex (no resp depression), ketamine (preserves BP), avoid midazolam',
    },
    {
        id: 'ccd-propofol',
        type: 'info',
        module: 5,
        title: 'Propofol (Diprivan)',
        body: '**GABA-A AGONIST - RAPID ON/OFF**\n\n**Dosing:**\n- **Start:** 5 mcg/kg/min\n- **Titrate:** +5 mcg/kg/min q5-10 min to target RASS\n- **Range:** 5-50 mcg/kg/min\n- **MAX:** 50 mcg/kg/min (toxicity risk above)\n- **Onset:** <60 sec\n- **Offset:** 5-15 min\n\n**Advantages:**\n- Rapid wake-up for neuro checks\n- Anticonvulsant properties\n- Anti-inflammatory\n\n**PROPOFOL INFUSION SYNDROME (PRIS):**\n- Risk: >4-7 days OR >65 mcg/kg/min\n- Signs: Severe metabolic acidosis, rhabdo, hyperkalemia, arrhythmias, cardiac collapse\n- Mortality up to 85%\n- **Prevention:** Limit <50 mcg/kg/min, <48-72h duration\n\n**Cautions:**\n- Hypotension (direct myocardial depression)\n- Hypertriglyceridemia (10 kcal/mL lipid)\n- Egg lecithin (egg allergy contraindicated)',
        citation: [8, 9],
        options: [
            { label: 'Switch to Dexmedetomidine', next: 'ccd-dexmedetomidine' },
            { label: 'Switch to Ketamine', next: 'ccd-ketamine' },
            { label: 'Back to Sedation Overview', next: 'ccd-sedation-overview' },
        ],
        summary: 'Propofol: 5-50 mcg/kg/min; PRIS risk >50 mcg/kg/min or >4-7 days; rapid on/off but hypotension',
    },
    {
        id: 'ccd-dexmedetomidine',
        type: 'info',
        module: 5,
        title: 'Dexmedetomidine (Precedex)',
        body: '**ALPHA-2 AGONIST - NO RESPIRATORY DEPRESSION**\n\n**Dosing:**\n- **Loading:** 0.5-1 mcg/kg over 10 min (optional - causes hypotension)\n- **Better:** Start infusion at 1-1.4 mcg/kg/hr, titrate down\n- **Range:** 0.3-1.4 mcg/kg/hr\n- **Onset:** 5-15 min\n- **Max duration:** 5 days (delirium risk if prolonged)\n\n**Advantages:**\n- **NO respiratory depression** (ideal for neuro checks)\n- Maintains airway reflexes, patient arousable\n- Analgesic properties (opioid-sparing)\n- **Can continue through extubation**\n- Lower delirium vs propofol\n\n**Cautions:**\n- Hypotension and bradycardia (especially with bolus)\n- **Skip bolus in unstable patients**\n- Hypertension possible at high rates (biphasic)\n- Tachyphylaxis with prolonged use\n- Limit to 5 days for maintenance\n\n**Clinical Pearl:** Start high, titrate down (avoids bolus hypotension)',
        citation: [8, 9, 10],
        options: [
            { label: 'Back to Sedation Overview', next: 'ccd-sedation-overview' },
        ],
        summary: 'Dexmedetomidine: 0.3-1.4 mcg/kg/hr (skip bolus if unstable); NO respiratory depression; limit 5 days',
    },
    {
        id: 'ccd-ketamine',
        type: 'info',
        module: 5,
        title: 'Ketamine (Ketalar)',
        body: '**NMDA ANTAGONIST - PRESERVES BP**\n\n**Mechanism:**\n- NMDA receptor antagonist\n- Maintains catecholamine levels (sympathomimetic)\n- Unique preserved hemodynamics\n\n**Dosing:**\n- **Low-dose sedation:** 0.1-0.3 mg/kg/hr\n- **Standard range:** 1-2 mg/kg/hr\n- **High-dose/refractory:** 1-5 mg/kg/hr\n- **Onset:** <1 min\n- **Duration:** 15-30 min per dose\n\n**Advantages:**\n- **PRESERVES/INCREASES BP** (unlike propofol/dex)\n- **Preserves respiratory drive**\n- Analgesia + sedation (opioid-sparing)\n- Less hypotension: 34.6% vs 63.5% (propofol/dex)\n- Excellent for hemodynamically unstable/septic patients\n\n**Cautions:**\n- Dissociation/hallucinations\n- Increased salivation (may need antisialagogue)\n- Avoid in ACS (increased catecholamines)\n- ICP may increase (use cautiously in head injury)\n\n**Combinations:**\n- **Ketofol:** Ketamine + propofol 1:1 (hemodynamic stability)\n- **Ketamine + Dex:** Reduces dissociative effects',
        citation: [8, 9, 10],
        options: [
            { label: 'Back to Sedation Overview', next: 'ccd-sedation-overview' },
        ],
        summary: 'Ketamine: 0.1-2 mg/kg/hr; PRESERVES BP and respiratory drive; ideal for sepsis/shock sedation',
    },
    {
        id: 'ccd-midazolam',
        type: 'info',
        module: 5,
        title: 'Midazolam (Versed)',
        body: '**BENZODIAZEPINE - FALLING OUT OF FAVOR**\n\n**Dosing:**\n- **Load:** 10-50 mcg/kg (optional)\n- **Infusion:** 1-7 mg/hr (2.1-14 mg/hr for 70kg)\n- **Onset:** 1-3 min\n- **Duration:** 15-80 min (highly variable)\n\n**Why Avoid as First-Line:**\n- **Metabolite accumulation** in renal failure (half-life 7.6-13h in ARF)\n- Delayed emergence with prolonged infusions\n- Tolerance develops rapidly\n- Withdrawal possible with abrupt stop\n- Active metabolites prolong effects\n\n**Advantages:**\n- Reversible with flumazenil\n- Anxiolytic\n- Relatively cheap\n\n**Modern Use:**\n- Reserve for propofol/dex unavailable or contraindicated\n- Avoid in acute renal failure\n- Avoid for prolonged sedation (>24-48h)\n\n**Reversal:** Flumazenil 0.2 mg IV q1min (max 3 mg)',
        citation: [8, 9],
        options: [
            { label: 'Use Dexmedetomidine Instead', next: 'ccd-dexmedetomidine' },
            { label: 'Back to Sedation Overview', next: 'ccd-sedation-overview' },
        ],
        summary: 'Midazolam: 1-7 mg/hr; avoid as first-line (metabolite accumulation, delayed emergence); reversible',
    },
    // =====================================================================
    // MODULE 6: ANALGESIA
    // =====================================================================
    {
        id: 'ccd-analgesia-overview',
        type: 'question',
        module: 6,
        title: 'ICU Analgesia',
        body: '**Analgesia-First Approach**\n\nStart with PRN analgesia, reserve infusions for refractory pain.\n\n**Agent Selection:**\n\n**Fentanyl (preferred):**\n- Fastest onset (<1 min)\n- NO active metabolites (renal-safe)\n- Most commonly used (83.7% of vented patients)\n\n**Hydromorphone:**\n- Alternative to fentanyl\n- No active metabolites\n- Slower onset (10-15 min)\n\n**Morphine:**\n- AVOID in renal failure (active metabolites)\n- AVOID continuous infusions\n- Histamine release → hypotension\n\n**Equianalgesic:**\n100 mcg fentanyl = 10 mg morphine = 1.5 mg hydromorphone\n\nSelect agent:',
        citation: [8, 9],
        options: [
            { label: 'Fentanyl', next: 'ccd-fentanyl' },
            { label: 'Hydromorphone', next: 'ccd-hydromorphone' },
            { label: 'Back to Overview', next: 'ccd-start' },
        ],
        summary: 'ICU analgesia: fentanyl preferred (fast, renal-safe); avoid morphine infusions (metabolite toxicity)',
    },
    {
        id: 'ccd-fentanyl',
        type: 'info',
        module: 6,
        title: 'Fentanyl Infusion',
        body: '**SYNTHETIC OPIOID - ICU PREFERRED**\n\n**Potency:** 80-100x morphine\n100 mcg fentanyl = 10 mg morphine IV\n\n**Dosing:**\n- **PRN bolus:** 25-200 mcg IV q30-60min\n- **Infusion:** 50-150 mcg/hr (typical range)\n- **Onset:** <1 minute\n- **Duration:** 30-60 min per bolus\n\n**Advantages:**\n- **Fastest onset** of opioids\n- **NO active metabolites** (safe in renal failure)\n- Minimal histamine release\n- No accumulation even with prolonged infusion\n- Preferred in renal failure\n\n**Cautions:**\n- Not for opioid-naive (start with bolus, assess)\n- Respiratory depression (requires vent or close monitoring)\n- Bradycardia (mu-opioid effect)\n- Tolerance develops with prolonged use\n\n**Clinical Pearl:** 83.7% of mechanically ventilated patients receive fentanyl',
        citation: [8, 9],
        options: [
            { label: 'Back to Analgesia Overview', next: 'ccd-analgesia-overview' },
        ],
        summary: 'Fentanyl: 50-150 mcg/hr infusion; fastest onset, NO active metabolites, safe in renal failure',
    },
    {
        id: 'ccd-hydromorphone',
        type: 'info',
        module: 6,
        title: 'Hydromorphone (Dilaudid)',
        body: '**SYNTHETIC OPIOID - FENTANYL ALTERNATIVE**\n\n**Potency:** 5-7x morphine\n1.5 mg hydromorphone = 10 mg morphine = 100 mcg fentanyl\n\n**Dosing:**\n- **PRN bolus:** 0.3-2 mg IV q1-2h\n- **Infusion:** 0.2-1 mg/hr\n- **Onset:** 10-15 min (slower than fentanyl)\n- **Duration:** 3-4 hours\n\n**Advantages:**\n- Excellent analgesia\n- NO active metabolites (safe in renal failure)\n- Can substitute for fentanyl allergy\n\n**Cautions:**\n- Slower onset than fentanyl (10-15 min vs <1 min)\n- Respiratory depression\n- Tolerance develops\n\n**Comparison to Fentanyl:**\n- No demonstrated advantage in reducing vent days\n- No difference in ICU length of stay\n- Use based on preference or fentanyl intolerance',
        citation: [8, 9],
        options: [
            { label: 'Back to Analgesia Overview', next: 'ccd-analgesia-overview' },
        ],
        summary: 'Hydromorphone: 0.2-1 mg/hr infusion; fentanyl alternative, slower onset, no active metabolites',
    },
    // =====================================================================
    // MODULE 7: ENDOCRINE
    // =====================================================================
    {
        id: 'ccd-endocrine-overview',
        type: 'question',
        module: 7,
        title: 'Endocrine Emergencies',
        body: '**Critical Care Endocrine Drips**\n\n**DKA/HHS:**\n- Insulin infusion protocols\n- When to reduce rate (glucose 250)\n- Transition to subcutaneous\n\n**Adrenal Crisis:**\n- Hydrocortisone 100 mg IV bolus\n- 200 mg/24h replacement\n\n**Variceal Bleeding:**\n- Octreotide infusion\n- Reduces splanchnic blood flow\n\nSelect condition:',
        citation: [11, 12],
        options: [
            { label: 'DKA/HHS Insulin Protocol', next: 'ccd-insulin-dka' },
            { label: 'Adrenal Crisis', next: 'ccd-adrenal-crisis' },
            { label: 'Variceal Bleeding (Octreotide)', next: 'ccd-octreotide' },
        ],
        summary: 'Endocrine emergencies: DKA insulin drip, adrenal crisis hydrocortisone, variceal octreotide',
    },
    {
        id: 'ccd-insulin-dka',
        type: 'info',
        module: 7,
        title: 'DKA Insulin Protocol',
        body: '**DIABETIC KETOACIDOSIS INSULIN DRIP**\n\n**Starting:**\n- Bolus: 0.1 U/kg IV (optional, can omit)\n- **Infusion: 0.1 U/kg/hr** (range 0.07-0.14)\n- Max for nursing: 15 U/hr (notify provider if higher needed)\n\n**Titration Goal:**\n- Glucose drop: 50-70 mg/dL/hr\n- Too fast → reduce rate\n- Not dropping → increase q1-2h\n\n**WHEN GLUCOSE REACHES 250:**\n- **DO NOT STOP INSULIN** (need to clear ketoacidosis)\n- Reduce rate to 0.05 U/kg/hr\n- Add D5-1/2 NS at 150 mL/hr\n\n**DKA Resolution Criteria:**\n- pH >7.3\n- Anion gap ≤12\n- Bicarb ≥18 mEq/L OR BHB <0.6 mmol/L\n\n**Transition to SQ:**\n- Estimate: (current U/hr) x 24 = daily SQ dose\n- Give first SQ dose, continue drip 1-2h overlap\n- Stop drip 2h after SQ given\n\n**CRITICAL - POTASSIUM:**\n- **Cannot give insulin if K <2.5** (fatal arrhythmias)\n- Replete K aggressively before/during insulin',
        citation: [11],
        options: [
            { label: 'Back to Endocrine Overview', next: 'ccd-endocrine-overview' },
        ],
        summary: 'DKA: insulin 0.1 U/kg/hr; at glucose 250 REDUCE rate (don\'t stop) + add dextrose; K must be >2.5',
    },
    {
        id: 'ccd-adrenal-crisis',
        type: 'info',
        module: 7,
        title: 'Adrenal Crisis',
        body: '**ACUTE ADRENAL INSUFFICIENCY**\n\n**Emergency Treatment - DO NOT DELAY:**\n\n**Hydrocortisone:**\n- **Initial:** 100 mg IV/IM IMMEDIATELY\n- **24h replacement:** 200 mg total\n  - Option 1: 100 mg infusion over 24h + 50 mg q6h boluses\n  - Option 2: 100 mg in 100 mL NS at 10-12 mL/hr\n- **Repeat** 100 mg in first few hours if needed\n\n**Fluid Resuscitation:**\n- 1 L 0.9% NaCl IV over 30 min\n- Continue aggressive fluids\n- Add vasopressors as needed\n\n**After Stabilization (Days 2-3):**\n- Reduce to 100-150 mg/day\n- Taper over 4-5 days to maintenance (15-20 mg/day)\n- No separate mineralocorticoid if hydrocortisone ≥100 mg/day\n\n**Alternative if No Hydrocortisone:**\n- Methylprednisolone 40 mg IV daily\n- Less mineralocorticoid activity\n\n**Response:** BP improvement expected within 4-6 hours',
        citation: [12],
        options: [
            { label: 'Back to Endocrine Overview', next: 'ccd-endocrine-overview' },
        ],
        summary: 'Adrenal crisis: hydrocortisone 100 mg IV immediately, then 200 mg/24h; aggressive fluids; taper after stabilization',
    },
    {
        id: 'ccd-octreotide',
        type: 'info',
        module: 7,
        title: 'Octreotide (Variceal Bleeding)',
        body: '**SOMATOSTATIN ANALOG - VARICEAL HEMORRHAGE**\n\n**Mechanism:**\n- Decreases splanchnic blood flow\n- Reduces portal pressure\n- Safer than vasopressin\n\n**Dosing:**\n- **Bolus:** 50-100 mcg IV\n- **Infusion:** 50 mcg/hr for 3-5 days\n- Alternative: 25 mcg/hr (also effective, cheaper)\n\n**When to Start:**\n- **IMMEDIATELY** upon clinical suspicion\n- Do NOT wait for endoscopy confirmation\n\n**Duration:** Continue 3-5 days\n- Paired with endoscopic therapy\n- NOT a replacement for sclerotherapy/banding\n\n**Efficacy:** Controls bleeding in ~80% of variceal hemorrhage\n\n**Combine With:**\n- Antibiotics (ceftriaxone 1g IV daily)\n- PPI\n- Endoscopic therapy\n\n**Advantages over Vasopressin:**\n- Fewer complications\n- Better outcomes\n- No need for nitrate co-administration',
        citation: [12],
        options: [
            { label: 'Back to Endocrine Overview', next: 'ccd-endocrine-overview' },
        ],
        summary: 'Octreotide: 50 mcg bolus then 50 mcg/hr x 3-5 days; start immediately for suspected varices; safer than vasopressin',
    },
    // =====================================================================
    // MODULE 8: ANTIARRHYTHMICS
    // =====================================================================
    {
        id: 'ccd-antiarrhythmic-overview',
        type: 'question',
        module: 8,
        title: 'Antiarrhythmics',
        body: '**Life-Threatening Arrhythmia Management**\n\n**VF/pVT (Cardiac Arrest):**\n- Amiodarone 300 mg IV or Lidocaine 1-1.5 mg/kg\n- Either acceptable per AHA 2018\n\n**Wide-Complex Tachycardia (Stable):**\n- Amiodarone or procainamide\n\n**Amiodarone:**\n- Max 2.2 g/24h\n- Multiple class effects (I, II, III, IV)\n- Long half-life (15-100 days)\n\n**Lidocaine:**\n- Max 4.5 mg/kg (toxicity threshold)\n- Faster onset than amiodarone\n- Shorter duration (10-20 min)\n\nSelect agent:',
        citation: [13, 14],
        options: [
            { label: 'Amiodarone', next: 'ccd-amiodarone' },
            { label: 'Lidocaine', next: 'ccd-lidocaine' },
            { label: 'Rate Control (AFib)', next: 'ccd-rate-control-overview' },
        ],
        summary: 'Antiarrhythmics: amiodarone or lidocaine for VF/pVT; either acceptable per AHA 2018',
    },
    {
        id: 'ccd-amiodarone',
        type: 'info',
        module: 8,
        title: 'Amiodarone',
        body: '**CLASS III ANTIARRHYTHMIC (+ I, II, IV properties)**\n\n**ACLS Dosing (VF/pVT):**\n- **First dose:** 300 mg IV/IO bolus\n- **Second dose:** 150 mg if VF persists\n- **Max 24h:** 2.2 g\n\n**ICU Infusion Protocol:**\n- **Bolus:** 150 mg IV over 10 min\n- **Phase 1:** 1 mg/min for 6 hours (360 mg)\n- **Phase 2:** 0.5 mg/min for 18+ hours\n- Repeat 150 mg bolus q10-30 min for breakthrough\n\n**Onset:** 15-30 min (slower than lidocaine)\n**Half-life:** 15-100 days (very long!)\n\n**Adverse Effects:**\n- Bradycardia, heart block (2-5%)\n- Hypotension (especially IV bolus)\n- QT prolongation (torsades risk 2-5%)\n- Thyroid dysfunction (long-term)\n- Pulmonary toxicity (long-term)\n- Phlebitis (use central line if possible)\n\n**Avoid if:** Baseline QT prolongation',
        citation: [13, 14],
        options: [
            { label: 'Use Lidocaine Instead', next: 'ccd-lidocaine' },
            { label: 'Back to Antiarrhythmic Overview', next: 'ccd-antiarrhythmic-overview' },
        ],
        summary: 'Amiodarone: 300 mg VF/pVT, then 150 mg over 10min + 1 mg/min x 6h + 0.5 mg/min; max 2.2 g/24h',
    },
    {
        id: 'ccd-lidocaine',
        type: 'info',
        module: 8,
        title: 'Lidocaine',
        body: '**CLASS IB ANTIARRHYTHMIC**\n\n**ACLS Dosing (VF/pVT):**\n- **First dose:** 1-1.5 mg/kg IV bolus\n- **Repeat:** 0.5-0.75 mg/kg q5-10 min\n- **MAX CUMULATIVE:** 4.5 mg/kg (toxicity threshold)\n\n**Example (70 kg):**\n- First: 70-105 mg\n- Repeat: 35-52 mg\n- Max total: 315 mg\n\n**ICU Infusion:**\n- Load: 1-1.5 mg/kg\n- Maintenance: 1-4 mg/min\n- Max: 3 mg/min in heart disease/elderly/liver failure\n\n**Onset:** <1 minute (FASTER than amiodarone)\n**Duration:** 10-20 min (short, allows rapid titration)\n\n**Toxicity Signs (dose-dependent):**\n- 5-10 mcg/mL: Drowsiness, paresthesias\n- 10-15 mcg/mL: Tremors, confusion, tinnitus\n- 15-25 mcg/mL: Seizures, LOC\n- >25 mcg/mL: Cardiovascular collapse\n\n**Management:** Stop drug, benzos for seizures, lipid emulsion if severe',
        citation: [13, 14],
        options: [
            { label: 'Use Amiodarone Instead', next: 'ccd-amiodarone' },
            { label: 'Back to Antiarrhythmic Overview', next: 'ccd-antiarrhythmic-overview' },
        ],
        summary: 'Lidocaine: 1-1.5 mg/kg bolus, max 4.5 mg/kg total; infusion 1-4 mg/min; faster onset than amio',
    },
    // =====================================================================
    // MODULE 9: RATE CONTROL
    // =====================================================================
    {
        id: 'ccd-rate-control-overview',
        type: 'question',
        module: 9,
        title: 'Rate Control (AFib/Flutter)',
        body: '**For Stable AFib/Aflutter with RVR**\n\n**Diltiazem:**\n- Non-dihydropyridine CCB\n- 30% HR reduction by 30 min\n- First-line in COPD/asthma (vs beta-blockers)\n\n**Esmolol:**\n- Ultra-short acting beta-blocker\n- Onset 60 sec, offset 10-20 min\n- Preferred in ACS\n\n**Both agents:**\n- Avoid in decompensated heart failure\n- Avoid if WPW with AF (use procainamide)\n\nSelect agent:',
        citation: [15],
        options: [
            { label: 'Diltiazem', next: 'ccd-diltiazem' },
            { label: 'Esmolol', next: 'ccd-esmolol-rate' },
        ],
        summary: 'Rate control: diltiazem (OK in COPD) vs esmolol (ultra-short, preferred in ACS)',
    },
    {
        id: 'ccd-diltiazem',
        type: 'info',
        module: 9,
        title: 'Diltiazem (Rate Control)',
        body: '**NON-DIHYDROPYRIDINE CCB - AV NODAL BLOCKER**\n\n**IV Bolus Dosing:**\n- **First:** 0.25 mg/kg over 2 min (e.g., 17.5 mg for 70 kg)\n- **Second (if needed):** 0.35 mg/kg after 15 min (~24.5 mg)\n- **Max single bolus:** 30 mg\n\n**IV Infusion:**\n- Start after bolus controls rate\n- **Range:** 5-15 mg/hr\n- **Typical:** 10 mg/hr\n\n**Onset:** 2-3 min\n**Duration:** 30 min to 2 hours\n\n**Advantages:**\n- First-line in COPD/asthma (vs beta-blockers)\n- ~30% HR reduction by 30 min\n\n**Avoid:**\n- Decompensated heart failure\n- SBP <90\n- Severe bradycardia/AV block\n- WPW with AF (use procainamide)\n\n**Alternative Protocol:**\n- IV diltiazem bolus + PO diltiazem 60 mg\n- Avoids continuous infusion',
        citation: [15],
        options: [
            { label: 'Use Esmolol Instead', next: 'ccd-esmolol-rate' },
            { label: 'Back to Rate Control Overview', next: 'ccd-rate-control-overview' },
        ],
        summary: 'Diltiazem: 0.25 mg/kg bolus, then infusion 5-15 mg/hr; first-line in COPD; avoid in HF/WPW',
    },
    {
        id: 'ccd-esmolol-rate',
        type: 'info',
        module: 9,
        title: 'Esmolol (Rate Control)',
        body: '**ULTRA-SHORT ACTING BETA-1 BLOCKER**\n\n**Dosing:**\n- **Load:** 0.25-0.5 mg/kg IV bolus (lower than HTN dosing)\n- **Infusion:** 50 mcg/kg/min, titrate up q5 min\n- **Range:** 50-300 mcg/kg/min\n- **Max:** 300 mcg/kg/min\n\n**Onset:** 60 seconds\n**Offset:** 10-20 min (esterase metabolism)\n\n**Best Uses:**\n- AFib/flutter with RVR in ACS\n- Perioperative tachycardia\n- When rapid titration needed\n- When complications from beta-blockade are a concern\n\n**Key Advantage:**\n- If hypotension/bradycardia occurs, wears off in 10-20 min\n- No accumulation with prolonged use\n\n**Avoid:**\n- Asthma/severe COPD\n- Decompensated heart failure\n- Severe bradycardia/AV block\n- WPW with AF',
        citation: [15],
        options: [
            { label: 'Use Diltiazem Instead', next: 'ccd-diltiazem' },
            { label: 'Back to Rate Control Overview', next: 'ccd-rate-control-overview' },
        ],
        summary: 'Esmolol rate control: load 0.25-0.5 mg/kg, infuse 50-300 mcg/kg/min; ultra-short, ideal for ACS',
    },
    // =====================================================================
    // MODULE 10: QUICK REFERENCE
    // =====================================================================
    {
        id: 'ccd-quick-reference',
        type: 'info',
        module: 10,
        title: 'Quick Reference Table',
        body: '**VASOPRESSORS:**\n| Agent | Start | Range | Max |\n|-------|-------|-------|-----|\n| Norepinephrine | 2-5 mcg/min | 2-20 mcg/min | No limit |\n| Vasopressin | 0.04 U/min | FIXED | 0.1 U/min |\n| Epinephrine | 1-4 mcg/min | 2-10 mcg/min | 0.5 mcg/kg/min |\n| Phenylephrine | 100-200 mcg/min | 40-80 mcg/min | Titrate |\n\n**INOTROPES:**\n| Agent | Start | Max |\n|-------|-------|-----|\n| Dobutamine | 2.5-5 mcg/kg/min | 20 mcg/kg/min |\n| Milrinone | 0.25 mcg/kg/min | 0.75 mcg/kg/min |\n\n**HTN EMERGENCY:**\n| Agent | Start | Max |\n|-------|-------|-----|\n| Nicardipine | 5 mg/hr | 15 mg/hr |\n| Esmolol | 50 mcg/kg/min | 300 mcg/kg/min |\n| Labetalol | 20 mg bolus | 300 mg cumulative |\n\n**SEDATION:**\n| Agent | Range | Limit |\n|-------|-------|-------|\n| Propofol | 5-50 mcg/kg/min | <50 (PRIS) |\n| Dexmed | 0.3-1.4 mcg/kg/hr | 5 days |\n| Ketamine | 0.1-2 mg/kg/hr | 5 mg/kg/hr |',
        citation: [1, 2, 6, 8],
        options: [
            { label: 'Back to Overview', next: 'ccd-start' },
        ],
        summary: 'Quick reference: vasopressor, inotrope, HTN, sedation dosing tables',
    },
];
export const CRITICAL_CARE_DRIPS_CITATIONS = [
    { num: 1, text: 'SCCM 2021 Surviving Sepsis Campaign Guidelines. Critical Care Medicine 2021.' },
    { num: 2, text: 'EMCrit Project. Shock & Vasoactive Medications. emcrit.org/ibcc/shock' },
    { num: 3, text: 'Khanna A, et al. Angiotensin II for Vasodilatory Shock. NEJM 2017;377:419-430.' },
    { num: 4, text: 'Mathew R, et al. Milrinone vs Dobutamine in Cardiogenic Shock. NEJM 2021;385:516-525.' },
    { num: 5, text: 'De Backer D, et al. Comparison of Dopamine and Norepinephrine. NEJM 2010;362:779-789.' },
    { num: 6, text: 'EMCrit Project. Hypertensive Emergency Management. emcrit.org/ibcc/htn' },
    { num: 7, text: 'Peacock WF, et al. CLUE Trial: Clevidipine vs Standard Care. Am Heart J 2013;165:701-707.' },
    { num: 8, text: 'EMCrit Project. Analgesia and Sedation for Critically Ill. emcrit.org/ibcc/pain' },
    { num: 9, text: 'Hughes CG, et al. Dexmedetomidine vs Propofol in Sepsis. NEJM 2021;385:2302-2311.' },
    { num: 10, text: 'Perbet S, et al. Ketamine in the ICU: Hemodynamic Effects. Anaesthesia 2011;66:368-377.' },
    { num: 11, text: 'Kitabchi AE, et al. Hyperglycemic Crises in Adult Patients. Diabetes Care 2009;32:1335-1343.' },
    { num: 12, text: 'Bornstein SR, et al. Adrenal Crisis Management. JCEM 2016;101:364-389.' },
    { num: 13, text: 'Link MS, et al. 2018 AHA Focused Update on ACLS. Circulation 2018;138:e731-e739.' },
    { num: 14, text: 'Kudenchuk PJ, et al. Amiodarone vs Lidocaine in Cardiac Arrest. NEJM 2016;374:1711-1722.' },
    { num: 15, text: 'January CT, et al. 2019 AHA/ACC/HRS AF Guidelines Update. Circulation 2019;140:e125-e151.' },
];
