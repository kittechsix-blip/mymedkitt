import { HTN_CITATIONS } from '../new-content/hypertension-evidence.js';
export const HYPERTENSION_CITATIONS = HTN_CITATIONS;
export const HYPERTENSION_CRITICAL_ACTIONS = [
    { text: 'Look for acute target-organ damage before anything else. The number alone is not an emergency.', nodeId: 'htn-start' },
    { text: 'Severe BP without organ damage: no IV drugs and no rapid lowering. Restart or adjust oral medicine and arrange follow-up.', nodeId: 'htn-severe' },
    { text: 'No ACE inhibitor, ARB, renin inhibitor, MRA or atenolol in pregnancy or when pregnancy is planned.', nodeId: 'htn-r-preg-potential' },
    { text: 'Never combine an ACE inhibitor with an ARB.', nodeId: 'htn-r-combo' },
    { text: 'Check potassium and creatinine 2 to 4 weeks after starting a diuretic, ACE inhibitor, ARB or MRA.', nodeId: 'htn-r-discharge' },
];
export const HYPERTENSION_MODULE_LABELS = ['Triage', 'Severe, no organ damage', 'Who is this patient', 'Pick the drugs', 'On meds, still high', 'Diet & lifestyle', 'Disposition'];
// Drug links (dose cards sourced to the 2025 guideline drug table).
const d = (label, id) => `[${label}](#/drug/${id}/chronic hypertension)`;
const AML = d('amlodipine', 'htn-amlodipine');
const CTD = d('chlorthalidone', 'htn-chlorthalidone');
const IND = d('indapamide', 'htn-indapamide');
const LIS = d('lisinopril', 'htn-lisinopril');
const LOS = d('losartan', 'htn-losartan');
const SPI = d('spironolactone', 'htn-spironolactone');
const CAR = d('carvedilol', 'htn-carvedilol');
const MET = d('metoprolol succinate', 'htn-metoprolol-succinate');
const LAB = d('labetalol', 'htn-labetalol');
const NIF = d('extended-release nifedipine', 'htn-nifedipine-er');
const TOR = d('torsemide', 'htn-torsemide');
const FOOT = '[Drug picker](#/info/htn-picker) • [Doses](#/info/htn-drugs) • [Kidney and labs](#/info/htn-kidney) • [Diet](#/info/htn-diet) • [Discharge checklist](#/info/htn-discharge)';
const GOAL = 'Goal: under 130/80, with encouragement toward a systolic under 120 when tolerated. [1]';
const RECHECK = 'Basic metabolic panel 2 to 4 weeks after starting or changing a diuretic, ACE inhibitor, ARB or MRA. BP recheck monthly until controlled. [1]';
// Prescription card: what to write, why, when not to, and what to recheck.
const card = (c) => `**Rx:** ${c.rx}\n\n**Why:** ${c.why}\n\n**Not if:** ${c.notIf}\n\n**Recheck:** ${c.recheck}\n\n${FOOT}`;
export const HYPERTENSION_NODES = [
    // ------------------------------------------------------------------ MODULE 1: TRIAGE
    {
        id: 'htn-start', type: 'question', module: 1,
        title: 'High blood pressure: is an organ being injured right now?',
        body: 'Adult with high blood pressure, from an incidental reading to a crisis. Sort the patient, then get a specific regimen by kidney function, comorbidity and stage, with diet and a discharge plan.\n\n[Roadmap](#/info/htn-steps) • [Drug picker](#/info/htn-picker) • [Do NOT](#/info/hypertension-stop)\n\n**The number alone does not make an emergency. Look for acute organ damage:** [1]\n• Brain: encephalopathy, seizure, stroke or hemorrhage\n• Heart and aorta: acute heart failure or pulmonary edema, coronary ischemia, aortic dissection\n• Kidney: acute kidney injury\n\nChildren: [pediatric hypertensive emergency](#/tree/peds-hypertensive-emergency).',
        citation: [1, 2],
        options: [
            { label: 'Acute organ damage present or suspected', next: 'htn-emergency', urgency: 'critical' },
            { label: 'Pregnant or postpartum', next: 'htn-pregnant', urgency: 'urgent' },
            { label: 'No acute organ damage', next: 'htn-how-high' },
        ],
    },
    {
        id: 'htn-emergency', type: 'result', module: 1,
        title: 'Hypertensive emergency: use the organ-specific pathway',
        body: '**Hypertensive emergency is BP over 180/120 with acute target-organ damage.** ICU-level monitoring and a titratable IV agent. [1]\n\n**Open the pathway that sets the target:**\n• [Hypertensive emergency (adult)](#/tree/hypertensive-emergency-adult): agents and first-hour targets by organ\n• [Aortic dissection](#/tree/aortic-dissection)\n• [Ischemic stroke](#/tree/stroke) • [Intracerebral hemorrhage](#/tree/ich) • [Subarachnoid hemorrhage](#/tree/sah)\n• [Eclampsia](#/tree/eclampsia)\n\n**General rule when no compelling condition applies:** lower systolic BP by no more than 25% in the first hour; then, if stable, to under 160/100 over the next 2 to 6 hours; then cautiously to 130 to 140 over 24 to 48 hours. [1]\n\n**With a compelling condition:** systolic under 140 in the first hour for most, under 120 in aortic dissection. Stroke and ICH have their own targets in their consults. [1]\n\n**Pregnant or postpartum:** severe range starts at 160/110, not 180/120. [Hypertension in pregnancy](#/tree/htn-pregnancy) [1]',
        citation: [1],
        recommendation: 'Hypertensive emergency: monitored bed, titratable IV agent, target set by the injured organ.',
        confidence: 'definitive',
        calculatorLinks: [{ id: 'hypertensive-emergency-adult', label: 'Emergency pathway', kind: 'tree' }],
    },
    {
        id: 'htn-pregnant', type: 'result', module: 1,
        title: 'Pregnant or postpartum: different thresholds',
        body: `Go to [Hypertension in pregnancy](#/tree/htn-pregnancy). Seizure or suspected eclampsia: [Eclampsia](#/tree/eclampsia).\n\n**Severe range:** systolic 160 or more, or diastolic 110 or more, confirmed on repeat within 15 minutes. Treat to under 160/110 within 30 to 60 minutes. [1]\n\n**Chronic hypertension in pregnancy:** treat to under 140/90. Preferred oral agents are ${LAB} and ${NIF}. Counsel on low-dose aspirin (81 mg/day) to reduce preeclampsia risk. [1]\n\n**Not in pregnancy or when pregnancy is planned:** atenolol, ACE inhibitors, ARBs, direct renin inhibitors, nitroprusside, mineralocorticoid receptor antagonists. [1]`,
        citation: [1],
        recommendation: 'Use the pregnancy pathway. Severe range is 160/110 or more: treat within 30 to 60 minutes.',
        confidence: 'definitive',
        calculatorLinks: [{ id: 'htn-pregnancy', label: 'Pregnancy pathway', kind: 'tree' }],
    },
    {
        id: 'htn-how-high', type: 'question', module: 1,
        title: 'How high is it on a proper repeat?',
        body: 'One reading is not enough to act on. Repeat after 5 minutes seated: back supported, feet flat, arm bare and supported at heart level, correct cuff size, no talking. Use the average. [1]\n\n**Adult categories:** [1]\n• Normal: under 120 and under 80\n• Elevated: 120 to 129 and under 80\n• Stage 1: 130 to 139 or 80 to 89\n• Stage 2: 140 or more, or 90 or more\n• Severe: systolic over 180 or diastolic over 120, without organ damage (formerly “hypertensive urgency”)\n\nA diagnosis needs 2 or more careful readings on 2 or more occasions. An ED reading starts that process; it does not finish it. [1]',
        citation: [1],
        options: [
            { label: 'Systolic over 180 or diastolic over 120', next: 'htn-severe', urgency: 'urgent' },
            { label: 'Stage 1 or stage 2 (130/80 up to 180/120)', next: 'htn-who' },
            { label: 'Under 130/80 on repeat', next: 'htn-r-elevated' },
        ],
    },
    {
        id: 'htn-r-elevated', type: 'result', module: 1,
        title: 'Normal or elevated on repeat: no drug today',
        body: 'The first reading was higher than the patient’s resting BP. No antihypertensive today.\n\n**Elevated (120 to 129 and under 80):** lifestyle measures are the treatment. [Diet page](#/info/htn-diet). [1]\n\n**Tell the patient the number** and ask for a recheck in clinic or with a validated home cuff. Masked hypertension (normal in the office, high outside it) exists, so a normal ED repeat does not close the question for a patient with risk factors. [Home BP](#/info/htn-home-bp) [1]',
        citation: [1],
        recommendation: 'No drug. Lifestyle advice and an outpatient or home recheck.',
        confidence: 'recommended',
    },
    // ------------------------------------------------------------------ MODULE 2: SEVERE, NO ORGAN DAMAGE
    {
        id: 'htn-severe', type: 'info', module: 2,
        title: 'Severe hypertension without organ damage: do not chase the number',
        body: '**This is not an emergency, and treating it like one causes harm.** The 2025 guideline: no aggressive short-term lowering and no IV drugs; restart or intensify oral medicine, preferably as an outpatient. [1]\n\n**Why hold back:**\n• Long-standing hypertension resets autoregulation. A fast drop to normal can underperfuse vital organs. [1]\n• In hospitalized patients with asymptomatic severe readings, BP falls without any drug in 40 to 50%. [1]\n• Office cohort, BP 180/110 or higher, 58,535 patients: in the matched comparison, major cardiac events at 7 days were 0 of 852 sent home vs 2 of 426 sent to hospital (P = .11). Hospital referral did not improve outcomes. [5]\n• Inpatients treated for a high reading had more acute kidney injury (10.3% vs 7.9%) and myocardial injury (1.2% vs 0.6%) than matched untreated patients. [6]\n\n**Do now:** repeat the reading after rest, ask about missed doses and [BP-raising substances](#/info/htn-raisers), and look deliberately for organ damage before calling it asymptomatic. [1,2]',
        citation: [1, 2, 5, 6],
        next: 'htn-severe-test',
    },
    {
        id: 'htn-severe-test', type: 'question', module: 2,
        title: 'Which tests change today’s plan?',
        body: '**Symptoms and exam drive testing.** Chest pain, dyspnea, a neurologic change or low urine output: test that organ now (for example ECG, troponin, chest imaging, head imaging, creatinine, urinalysis). The guideline names the organs to look for [1,2]; this test list is clinical judgment.\n\n**Worth sending when you plan to start or change a drug:**\n• Basic metabolic panel. The guideline wants one at diagnosis and again 2 to 4 weeks after starting a diuretic, ACE inhibitor, ARB or MRA; creatinine and potassium decide which of those fit [1]\n• Pregnancy test before an ACE inhibitor or ARB in anyone who could be pregnant (judgment, following from the guideline’s harm recommendation in pregnancy [1])\n\n**New-diagnosis workup clinic can finish:** CBC, electrolytes and calcium, creatinine with eGFR, lipids, glucose or A1c, TSH, urinalysis, urine albumin-to-creatinine ratio, ECG. [1]',
        citation: [1, 2],
        options: [
            { label: 'Organ damage found', next: 'htn-emergency', urgency: 'critical' },
            { label: 'No organ damage', next: 'htn-who' },
        ],
    },
    // ------------------------------------------------------------------ MODULE 3: WHO IS THIS PATIENT
    {
        id: 'htn-who', type: 'question', module: 3,
        title: 'Who is this patient?',
        body: 'Pick the closest match. The prescription card follows.\n\n**A.** New or never treated\n**B.** Known hypertension, ran out or stopped\n**C.** Taking medicine, still high',
        citation: [1, 2],
        options: [
            { label: 'A. New or never treated', next: 'htn-new' },
            { label: 'B. Known hypertension, ran out or stopped', next: 'htn-ranout' },
            { label: 'C. Taking medicine, still high', next: 'htn-uncontrolled' },
        ],
    },
    {
        id: 'htn-ranout', type: 'question', module: 3,
        title: 'B. Ran out or stopped: restart what worked',
        body: 'For an ED patient with an asymptomatic high reading, the AHA acute-care statement prefers restarting home medicines, with close follow-up, over intensifying the regimen. [2]\n\n**Ask why it stopped:** cost, a side effect, no refills, or never told it was long term. An unaffordable prescription is not a drug failure.\n\n**Restart promptly, never stop abruptly:** clonidine (abrupt withdrawal can cause a hypertensive crisis; it must be tapered) and beta blockers. [1]',
        citation: [1, 2],
        options: [
            { label: 'Regimen known and tolerated', next: 'htn-r-restart' },
            { label: 'Regimen unknown, not tolerated or unaffordable', next: 'htn-comorbid' },
        ],
    },
    {
        id: 'htn-r-restart', type: 'result', module: 3,
        title: 'Restart the prior regimen',
        body: card({
            rx: 'Refill the prior medicines at the prior doses. Where the same drugs exist as one pill or a once-daily form, write that instead.',
            why: 'Restarting home medicines with close follow-up is the preferred ED move for asymptomatic elevated BP. Once-daily dosing and single-pill combinations both improve adherence. [1,2]',
            notIf: 'A side effect or cost is why it stopped: choose a regimen the patient will take instead ([pick by patient](#/node/htn-comorbid)). New pregnancy, new kidney injury or high potassium: recheck that each drug still fits.',
            recheck: RECHECK,
        }),
        citation: [1, 2],
        recommendation: 'Restart the known regimen, simplified to once-daily or single-pill where possible, with early follow-up.',
        confidence: 'recommended',
    },
    {
        id: 'htn-new', type: 'question', module: 3,
        title: 'A. New or never treated: start today or let clinic start?',
        body: '**Who needs medicine at all (on average BP):** [1]\n• 140/90 or higher: everyone\n• 130/80 or higher with cardiovascular disease, diabetes, CKD, or a 10-year PREVENT risk of 7.5% or more\n• 130/80 or higher at lower risk: lifestyle first; medicine if still 130/80 or higher after 3 to 6 months\n\n**Starting from the ED:** ACEP’s 2025 policy says to consider starting an outpatient antihypertensive at discharge for asymptomatic elevated BP, and to refer every such patient for follow-up. It found no Level A or B evidence, so this is a judgment call. [3]\n\n**Leans toward starting today (clinical judgment, not a guideline list):** a severe-range reading; 160/100 or higher (the guideline does not ask for white-coat exclusion at that level [1]); prior documented high readings; known diabetes, CKD or cardiovascular disease; follow-up that is unlikely to happen soon.\n\n**Leans toward clinic (judgment):** a first stage 1 reading taken in pain or distress, reliable follow-up, a home cuff.',
        citation: [1, 3],
        options: [
            { label: 'Start medicine today', next: 'htn-comorbid' },
            { label: 'Lifestyle, home BP log and clinic confirmation', next: 'htn-diet' },
        ],
    },
    // ------------------------------------------------------------------ MODULE 4: PICK THE DRUGS
    {
        id: 'htn-comorbid', type: 'question', module: 4,
        title: 'Pick by the patient: which condition leads?',
        body: 'A compelling condition picks the class. Take the first one that applies, top to bottom. Grid view: [Drug picker](#/info/htn-picker).\n\nWith no compelling condition, the four first-line classes are equal starting points and the stage decides one drug or two. [1]',
        citation: [1],
        options: [
            { label: 'Pregnant, planning pregnancy, or could become pregnant', next: 'htn-r-preg-potential', urgency: 'urgent' },
            { label: 'Heart failure', next: 'htn-hf' },
            { label: 'CKD: eGFR under 60 or albuminuria 30 mg/g or more', next: 'htn-ckd' },
            { label: 'Diabetes', next: 'htn-r-dm' },
            { label: 'Coronary disease or prior MI', next: 'htn-r-cad' },
            { label: 'Prior stroke, TIA or ICH', next: 'htn-r-stroke' },
            { label: 'AF, aortic disease, gout, BPH, obesity or sleep apnea', next: 'htn-r-other' },
            { label: 'None of these', next: 'htn-stage' },
        ],
    },
    {
        id: 'htn-stage', type: 'question', module: 4,
        title: 'No compelling condition: what stage?',
        body: '**Four first-line classes, any of them:** thiazide-type diuretic, long-acting dihydropyridine calcium channel blocker, ACE inhibitor, ARB. Beta blockers are not first-line without coronary disease or heart failure. [1]\n\n**Race:** the 2025 guideline does not choose the drug by race. Older teaching started Black adults on a thiazide or calcium channel blocker [22]; no such recommendation was found in the 2025 text. Race enters this decision once: the guideline’s narrative gives non-Hispanic Black adults as an example of high-risk stage 1 patients for whom starting two drugs is recommended. Risk is estimated with PREVENT, which has no race term. [1]\n\n**Stage decides how many drugs:** [1]\n• Stage 1 (130 to 139 or 80 to 89): one drug, titrate, add as needed\n• Stage 2 (140 or more, or 90 or more): two first-line drugs from different classes, ideally in one pill\n\n**Two sources, both shown:** the category table defines stages with “or”; the two-drug recommendation box prints stage 2 as systolic 140 or more and diastolic 90 or more. For an isolated systolic or isolated diastolic stage 2 reading, either one drug or two is defensible (clinical judgment). [1]\n\n**“High risk” for a two-drug start in stage 1:** the guideline’s narrative examples are non-Hispanic Black adults and a 10-year risk above 7.5%. Separately, its supporting text describes two-drug candidates as non-frail adults with systolic 20 and diastolic 10 mm Hg or more above target, which no stage 1 reading reaches. The guideline does not reconcile the two. [1]',
        citation: [1, 22],
        options: [
            { label: 'Stage 1', next: 'htn-r-mono' },
            { label: 'Stage 2, or stage 1 at high risk', next: 'htn-r-combo' },
            { label: 'Older and frail, or prior hypotension or drug side effects', next: 'htn-r-frail' },
        ],
    },
    {
        id: 'htn-r-mono', type: 'result', module: 4,
        title: 'Stage 1: one first-line drug',
        body: card({
            rx: `One drug, once daily. Any of:\n• ${AML} 2.5 to 10 mg\n• ${CTD} 12.5 to 25 mg\n• ${LIS} 10 to 40 mg\n• ${LOS} 50 to 100 mg`,
            why: 'All four classes prevent cardiovascular events. In ALLHAT (33,357 patients) the primary outcome did not differ between chlorthalidone, amlodipine and lisinopril; heart failure was more frequent with amlodipine (10.2% vs 7.7%) and stroke with lisinopril (6.3% vs 5.6%) than with chlorthalidone. [1,10]',
            notIf: 'Follow-up labs unlikely: amlodipine is not on the guideline’s list of classes needing a 2 to 4 week metabolic panel. Low sodium: not the thiazide. Gout: monitor on a thiazide unless the patient takes urate-lowering therapy, or pick another class. Pregnant or planning pregnancy: use the [pregnancy card](#/node/htn-r-preg-potential). High potassium: not the ACE inhibitor or ARB. Prior ACE inhibitor angioedema: not an ACE inhibitor; an ARB can be started 6 weeks after it was stopped. Troublesome ankle swelling: not amlodipine. [1]',
            recheck: `${RECHECK} ${GOAL}`,
        }),
        citation: [1, 10],
        recommendation: 'Stage 1: one first-line drug once daily; titrate and add a second class as needed.',
        confidence: 'recommended',
    },
    {
        id: 'htn-r-combo', type: 'result', module: 4,
        title: 'Stage 2: two drugs, one pill',
        body: card({
            rx: `Two first-line drugs from different classes, in one pill when possible. Pairs with trial support: an ACE inhibitor or ARB with ${AML}, or an ACE inhibitor or ARB with a thiazide. [1]\n\n**Generic single pills (mg):**\n• Benazepril + amlodipine: 10/2.5, 10/5, 20/5, 20/10, 40/5, 40/10\n• Olmesartan + amlodipine: 20/5, 20/10, 40/5, 40/10\n• Valsartan + amlodipine: 160/5, 160/10, 320/5, 320/10\n• Lisinopril + HCTZ: 10/12.5, 20/12.5, 20/25\n• Losartan + HCTZ: 50/12.5, 100/12.5, 100/25`,
            why: 'Most patients need more than one drug, and one pill improves adherence and time to control. In ACCOMPLISH (11,506 high-risk patients) benazepril + amlodipine had fewer events than benazepril + HCTZ (9.6% vs 11.8%; HR 0.80). An ACE inhibitor or ARB also lessens amlodipine leg swelling and thiazide potassium shifts. [1,11]',
            notIf: `Never an ACE inhibitor with an ARB: ONTARGET found more hypotension and kidney dysfunction and no added benefit. [1,12] Pregnant or planning pregnancy: use the [pregnancy card](#/node/htn-r-preg-potential). ACE inhibitor and ARB both unusable (high potassium, or angioedema on both): ${AML} plus ${CTD} as separate pills. After ACE inhibitor angioedema an ARB can be started 6 weeks after the ACE inhibitor is stopped. Frail or prone to orthostatic drops: start one drug ([stepped care](#/node/htn-r-frail)).`,
            recheck: `${RECHECK} ${GOAL}`,
        }),
        citation: [1, 11, 12],
        recommendation: 'Stage 2: start two first-line drugs of different classes, ideally as a single-pill combination.',
        confidence: 'recommended',
    },
    {
        id: 'htn-r-frail', type: 'result', module: 4,
        title: 'Older and frail: one drug, low and slow',
        body: card({
            rx: `One first-line drug at the low end of its range (${AML} 2.5 mg, ${CTD} 12.5 mg, ${LIS} 10 mg or ${LOS} 50 mg are the bottom of the guideline ranges), then step up. Stepped care is the guideline’s option for older adults and anyone with prior hypotension or multiple drug side effects. [1]`,
            why: 'Treatment still works at older ages. STEP (age 60 to 80; systolic 110 to under 130 vs 130 to under 150): HR 0.74 for cardiovascular events. HYVET (age 80 or older, systolic 160 or more): 21% fewer deaths and 64% less heart failure. Hypotension was more frequent with intensive treatment in STEP. [9,18]',
            notIf: 'Limited life expectancy or institutional care: set the target together with the patient and family rather than defaulting to under 130/80. [1]',
            recheck: `Standing BP before and after starting. Asymptomatic orthostatic hypotension does not rule out a systolic goal under 130; symptomatic drops do need a look for other causes. ${RECHECK}`,
        }),
        citation: [1, 9, 18],
        recommendation: 'Older or frail: single first-line agent at the low end of the range, stepped up with standing BP checks.',
        confidence: 'recommended',
    },
    {
        id: 'htn-ckd', type: 'question', module: 4,
        title: 'CKD: what is the eGFR?',
        body: '**Goal:** systolic under 130 (AHA/ACC). KDIGO suggests under 120 by standardized office measurement when tolerated. The two guidelines differ, so both are shown. [1,15]\n\n**ACE inhibitor or ARB, never both,** when eGFR is under 60 with albuminuria of 30 mg/g or more. Send a urine albumin-to-creatinine ratio if none is on file. [1]\n\n**After starting:** potassium and creatinine in 2 to 4 weeks. An eGFR dip of up to 30% is expected and goes with long-term kidney protection. [1]\n\nFull rules: [Kidney and labs](#/info/htn-kidney).',
        citation: [1, 15],
        options: [
            { label: 'eGFR 30 or higher', next: 'htn-r-ckd' },
            { label: 'eGFR under 30, not on dialysis', next: 'htn-r-ckd-adv' },
            { label: 'Dialysis or kidney transplant', next: 'htn-r-ckd-dialysis' },
        ],
    },
    {
        id: 'htn-r-ckd', type: 'result', module: 4,
        title: 'CKD, eGFR 30 or higher: ACE inhibitor or ARB first',
        body: card({
            rx: `${LIS} 10 to 40 mg once daily, or ${LOS} 50 to 100 mg per day. Stage 2: add ${AML} 2.5 to 10 mg or a thiazide-type diuretic (${CTD} 12.5 to 25 mg).`,
            why: 'With albuminuria of 30 mg/g or more, an ACE inhibitor or ARB lowers cardiovascular events and slows kidney disease. It may be considered with lower albuminuria. SPRINT’s intensive arm lowered events in patients with CKD as well. [1,8]',
            notIf: 'Pregnant or planning pregnancy: use the [pregnancy card](#/node/htn-r-preg-potential). Potassium already high: lead with amlodipine. Prior ACE inhibitor angioedema: no ACE inhibitor; an ARB can be started 6 weeks after it was stopped. No spironolactone, amiloride or triamterene when GFR is under 45. Stop NSAIDs: with an ACE inhibitor or ARB they cause acute kidney injury. [1]',
            recheck: 'Potassium and creatinine in 2 to 4 weeks. Hold or cut the dose and look for another cause if potassium is high, or if eGFR falls more than 30% and stays there. BP monthly until controlled. [1]',
        }),
        citation: [1, 8],
        recommendation: 'CKD with albuminuria: ACE inhibitor or ARB (not both), systolic goal under 130, labs in 2 to 4 weeks.',
        confidence: 'recommended',
    },
    {
        id: 'htn-r-ckd-adv', type: 'result', module: 4,
        title: 'CKD, eGFR under 30: get the diuretic right',
        body: card({
            rx: `Continue an ACE inhibitor or ARB the patient already takes (it can be continued under an eGFR of 30). Diuretic: a loop such as ${TOR} 5 to 10 mg once daily, or ${CTD} 12.5 to 25 mg once daily. ${AML} 2.5 to 10 mg can be added.`,
            why: 'Loop diuretics are preferred over thiazide-type diuretics when GFR is under 30, and the guideline lists chlorthalidone or a loop for CKD stage 4 or greater. In CLICK (stage 4 CKD, mean eGFR 23), chlorthalidone started at 12.5 mg and titrated to as much as 50 mg lowered 24-hour systolic BP 10.5 mm Hg more than placebo. [1,14]',
            notIf: 'CLICK also saw more hypokalemia, reversible creatinine rises, high glucose and dizziness with chlorthalidone. No spironolactone, amiloride or triamterene at this eGFR. [1,14] No lower eGFR limit for an ACE inhibitor or ARB was found in the guideline text read for this build; whether to start a new one here from the ED is a judgment best shared with nephrology.',
            recheck: 'Potassium, sodium and creatinine in 2 to 4 weeks, sooner if volume status is uncertain. Nephrology follow-up. [1]',
        }),
        citation: [1, 14],
        recommendation: 'eGFR under 30: loop diuretic or chlorthalidone, continue existing ACE inhibitor or ARB, close lab follow-up.',
        confidence: 'recommended',
    },
    {
        id: 'htn-r-ckd-dialysis', type: 'result', module: 4,
        title: 'Dialysis or kidney transplant: outside the guideline',
        body: `The guideline’s CKD recommendations apply to CKD that does not require dialysis, and it states there is insufficient evidence for BP targets or preferred agents after kidney transplant. [1]\n\n**From the ED:** restart the home regimen, check for missed dialysis or missed doses, and agree any change with nephrology or the transplant team. Cyclosporine raises BP, and amlodipine, diltiazem and verapamil raise cyclosporine and tacrolimus levels. [1]\n\n${FOOT}`,
        citation: [1],
        recommendation: 'Restart the home regimen and involve nephrology or the transplant team before changing it.',
        confidence: 'consider',
    },
    {
        id: 'htn-r-dm', type: 'result', module: 4,
        title: 'Diabetes: any first-line class, ACE inhibitor or ARB if the kidney is involved',
        body: card({
            rx: `All four first-line classes work. With CKD (eGFR under 60) or albuminuria of 30 mg/g or more: ${LIS} 10 to 40 mg or ${LOS} 50 to 100 mg, and consider one even with lower albuminuria. Stage 2: add ${AML} or a thiazide. [1]`,
            why: 'Start medicine at 130/80 in type 2 diabetes. Goal under 130/80 with encouragement toward systolic under 120: BPROAD (12,821 patients with type 2 diabetes) found fewer events at under 120 vs under 140 (HR 0.79), whereas the older ACCORD trial did not reach significance (HR 0.88) and had more serious adverse events. [1,16,21]',
            notIf: 'Pregnant or planning pregnancy: use the [pregnancy card](#/node/htn-r-preg-potential). High potassium: not the ACE inhibitor or ARB. Prior ACE inhibitor angioedema: no ACE inhibitor; an ARB can be started 6 weeks after it was stopped. Thiazides raise glucose modestly. [1]',
            recheck: `${RECHECK} Urine albumin-to-creatinine ratio if none on file.`,
        }),
        citation: [1, 16, 21],
        recommendation: 'Diabetes: treat from 130/80; ACE inhibitor or ARB when CKD or albuminuria is present.',
        confidence: 'recommended',
    },
    {
        id: 'htn-hf', type: 'question', module: 4,
        title: 'Heart failure: reduced or preserved ejection fraction?',
        body: 'Reduced means an ejection fraction of 40% or lower. In heart failure the disease-modifying medicines are also the BP medicines, so titrating them comes before adding anything else. Systolic goal under 130. [1]',
        citation: [1],
        options: [
            { label: 'Reduced EF (40% or lower)', next: 'htn-r-hfref' },
            { label: 'Preserved EF', next: 'htn-r-hfpef' },
        ],
    },
    {
        id: 'htn-r-hfref', type: 'result', module: 4,
        title: 'HFrEF: titrate guideline-directed therapy',
        body: card({
            rx: `Titrate to the highest tolerated doses: a proven beta blocker (${CAR}, ${MET} or bisoprolol); an ARNI, or an ACE inhibitor or ARB when an ARNI is not feasible; an MRA if eGFR is over 30 and potassium under 5.0 mEq/L; an SGLT2 inhibitor. Diuretic for volume. Still high after that: add ${AML}. [1]`,
            why: 'These four classes reduce death and hospitalization and lower BP as they are titrated. Hydralazine with isosorbide dinitrate is also recommended for patients who self-identify as Black with NYHA class III to IV HFrEF on optimal therapy. [1]',
            notIf: 'No diltiazem or verapamil: negative inotropes, not recommended in HFrEF. [1]',
            recheck: 'From the ED, restart or continue what the heart failure team set and send changes back to them. Potassium and creatinine 2 to 4 weeks after any ACE inhibitor, ARB, ARNI, MRA or diuretic change. [1]',
        }),
        citation: [1],
        recommendation: 'HFrEF: uptitrate beta blocker, ARNI/ACE inhibitor/ARB, MRA and SGLT2 inhibitor; add amlodipine only if still high.',
        confidence: 'recommended',
    },
    {
        id: 'htn-r-hfpef', type: 'result', module: 4,
        title: 'HFpEF: diuretic, then RAAS inhibition',
        body: card({
            rx: 'Diuretic for signs or symptoms of congestion. Then RAAS inhibition toward a systolic under 130: an MRA or ARNI, or an ARB when an ARNI is not feasible. SGLT2 inhibitors are commonly used in HFpEF and lower BP. [1]',
            why: 'Getting volume right is what lets the other antihypertensives work in HFpEF. [1]',
            notIf: 'Beta blockers are not recommended for BP control in HFpEF; keep them for another indication such as an arrhythmia or ACS. When an SGLT2 inhibitor is added, other BP medicines may need trimming if the patient becomes hypotensive. [1]',
            recheck: RECHECK,
        }),
        citation: [1],
        recommendation: 'HFpEF: diuretic for congestion, then MRA, ARNI or ARB toward systolic under 130.',
        confidence: 'recommended',
    },
    {
        id: 'htn-r-cad', type: 'result', module: 4,
        title: 'Coronary disease: ACE inhibitor, ARB and beta blocker lead',
        body: card({
            rx: `The three classes with outcome evidence here: an ACE inhibitor (${LIS} 10 to 40 mg) or ARB (${LOS} 50 to 100 mg), and a beta blocker (${MET} 50 to 200 mg once daily or ${CAR} 12.5 to 50 mg per day in 2 doses). Need more: add ${AML}, a thiazide-type diuretic, or an MRA. [1]`,
            why: 'ACE inhibitors, ARBs and beta blockers reduce cardiovascular events and death in chronic coronary disease with hypertension. Systolic under 130 lowers risk; with that reached, a diastolic of 70 to 80 is associated with fewer events without more serious adverse events. [1]',
            notIf: 'Evidence is conflicting for beta blockers continued beyond 1 year after MI or ACS when ejection fraction is preserved. Do not stop a beta blocker abruptly. No routine beta blocker with diltiazem or verapamil. [1]',
            recheck: RECHECK,
        }),
        citation: [1],
        recommendation: 'Coronary disease: build on an ACE inhibitor or ARB and a beta blocker; add amlodipine, thiazide or MRA as needed.',
        confidence: 'recommended',
    },
    {
        id: 'htn-r-stroke', type: 'result', module: 4,
        title: 'Prior stroke, TIA or ICH: thiazide, ACE inhibitor or ARB',
        body: card({
            rx: `${CTD} 12.5 to 25 mg, ${LIS} 10 to 40 mg or ${LOS} 50 to 100 mg, alone or combined by stage. Office goal under 130/80. [1]`,
            why: 'These three classes lower recurrent stroke and ICH risk after an ischemic stroke, TIA or ICH. Treatment can also benefit patients with no prior hypertension whose average BP is 130/80 or higher after such an event. [1]',
            notIf: 'This card is for prevention after the event, not the acute event. In an untreated acute ischemic stroke with BP under 220/120, starting or restarting BP medicine in the first 48 to 72 hours does not prevent death or disability. Acute targets: [Ischemic stroke](#/tree/stroke) and [ICH](#/tree/ich). [1]',
            recheck: RECHECK,
        }),
        citation: [1],
        recommendation: 'Secondary stroke prevention: thiazide-type diuretic, ACE inhibitor or ARB to an office BP under 130/80.',
        confidence: 'recommended',
    },
    {
        id: 'htn-r-preg-potential', type: 'result', module: 4,
        title: 'Pregnancy possible or planned: labetalol or nifedipine ER',
        body: card({
            rx: `Pregnant or planning pregnancy: ${LAB} (commonly started at 100 to 200 mg twice daily) or ${NIF} (commonly started at 30 to 60 mg once daily). [1]`,
            why: 'These are the guideline’s preferred agents to treat hypertension while minimizing fetal risk. People with hypertension who are planning pregnancy or become pregnant should also be counseled on low-dose aspirin (81 mg/day). [1]',
            notIf: 'Harm recommendation: no atenolol, ACE inhibitor, ARB, direct renin inhibitor, nitroprusside or MRA when planning pregnancy or pregnant. For anyone who could become pregnant without planning to, raise this before choosing an ACE inhibitor or ARB; amlodipine avoids the question. [1]',
            recheck: 'Already pregnant with a high reading: use [Hypertension in pregnancy](#/tree/htn-pregnancy). Otherwise BP monthly until controlled. [1]',
        }),
        citation: [1],
        recommendation: 'Planning pregnancy or pregnant: labetalol or extended-release nifedipine; no ACE inhibitor, ARB, renin inhibitor, MRA or atenolol.',
        confidence: 'definitive',
    },
    {
        id: 'htn-r-other', type: 'result', module: 4,
        title: 'Other conditions that shape the choice',
        body: `**Atrial fibrillation:** general goal under 130/80; no class is mandated. Trials suggest MRAs reduce AF burden and ACE inhibitors or ARBs lower new AF. [1]\n\n**Aortic disease (aneurysm, prior dissection):** under 130/80; a beta blocker is recommended. [1]\n\n**Gout:** thiazides raise uric acid. Choose another class, or monitor closely unless the patient is on urate-lowering therapy. [1]\n\n**Symptomatic BPH:** an alpha-1 blocker can be a second-line add-on. Expect a first-dose orthostatic drop, most in older adults. [1]\n\n**Obesity:** a GLP-1 receptor agonist used for weight management (BMI 27 or more) may also lower BP. [1]\n\n**Sleep apnea:** screen for primary aldosteronism; CPAP can lower BP in resistant hypertension with moderate to severe apnea. [1]\n\nNone of these replaces a first-line class. Choose the regimen by [stage](#/node/htn-stage).\n\n${FOOT}`,
        citation: [1],
        recommendation: 'Adjust for the condition, then choose the regimen by stage.',
        confidence: 'consider',
    },
    // ------------------------------------------------------------------ MODULE 5: ON MEDS, STILL HIGH
    {
        id: 'htn-uncontrolled', type: 'question', module: 5,
        title: 'C. On medicine and still high: is it real?',
        body: '**Rule out pseudoresistance before adding a drug:** [1]\n• Technique: cuff size, rest, arm position\n• Adherence: ask without judgment; cost and pill burden are common reasons\n• White-coat effect: home or ambulatory readings\n• Interfering substances: about 20% of adults with hypertension regularly take one, typically NSAIDs or decongestants. [List](#/info/htn-raisers)\n• Sodium and alcohol intake\n\n**In the ED:** for asymptomatic elevated or markedly elevated BP, the AHA statement prefers restarting home medicines and close follow-up over intensifying the regimen. ACEP’s 2025 policy allows considering a new outpatient drug at discharge. Both are shown; neither rests on strong trials. [2,3]',
        citation: [1, 2, 3],
        options: [
            { label: 'Missed doses, cost, or an interfering substance', next: 'htn-r-fix-first' },
            { label: 'Taking everything and truly high', next: 'htn-step' },
        ],
    },
    {
        id: 'htn-r-fix-first', type: 'result', module: 5,
        title: 'Fix the cause before adding a drug',
        body: `**Missed doses or cost:** restart the same regimen. Convert to once-daily drugs and a single-pill combination where one exists; both improve adherence. [1]\n\n**Interfering substance:** stop or swap it. NSAIDs: avoid systemic use when possible. Decongestants: shortest course, none in severe or uncontrolled hypertension. Stimulants, some antidepressants, steroids, oral contraceptives and cancer drugs are on the [full list](#/info/htn-raisers). If the offending drug is essential, keep it and intensify BP treatment instead. [1]\n\n**Then recheck** in clinic or with [home readings](#/info/htn-home-bp) before the regimen is called a failure.\n\n${FOOT}`,
        citation: [1],
        recommendation: 'Correct adherence, cost and interfering substances first; simplify to once-daily or single-pill dosing.',
        confidence: 'recommended',
    },
    {
        id: 'htn-step', type: 'question', module: 5,
        title: 'How many drugs, at real doses?',
        body: 'Count classes. Each should be at a real dose, and two drugs from one class do not count twice (two beta blockers, two ACE inhibitors, an ACE inhibitor with an ARB). [1]\n\nDose ranges: [Doses](#/info/htn-drugs).',
        citation: [1],
        options: [
            { label: 'One drug', next: 'htn-r-add-second' },
            { label: 'Two drugs', next: 'htn-r-add-third' },
            { label: 'Three or more, including a diuretic', next: 'htn-resistant' },
        ],
    },
    {
        id: 'htn-r-add-second', type: 'result', module: 5,
        title: 'On one drug: titrate or add a second class',
        body: card({
            rx: `Raise the current drug within its range, or add a second first-line class. When BP is 20/10 mm Hg or more above goal in a non-frail adult, go to two drugs. Supported pairs: an ACE inhibitor or ARB with ${AML}, or an ACE inhibitor or ARB with a thiazide; one pill when possible. [1]`,
            why: 'Most patients need more than one drug. Single-pill combinations improve adherence and control. [1,11]',
            notIf: 'Do not add an ARB to an ACE inhibitor. Do not add a second drug from the class already in use. [1,12]',
            recheck: `${RECHECK} ${GOAL}`,
        }),
        citation: [1, 11, 12],
        recommendation: 'Titrate the first drug or add a second first-line class, preferably as a single pill.',
        confidence: 'recommended',
    },
    {
        id: 'htn-r-add-third', type: 'result', module: 5,
        title: 'On two drugs: build the triple',
        body: card({
            rx: `ACE inhibitor or ARB + ${AML} + thiazide-type diuretic. Generic triple pills (mg): olmesartan + amlodipine + HCTZ 20/5/12.5, 40/5/12.5, 40/5/25, 40/10/12.5, 40/10/25; valsartan + amlodipine + HCTZ 160/5/12.5, 160/5/25, 160/10/12.5, 160/10/25, 320/10/25. [1]`,
            why: 'These three classes have complementary mechanisms; this is the base regimen the guideline builds on before calling hypertension resistant. [1]',
            notIf: 'ACE inhibitor and ARB both unusable: use the other two and seek advice for the third. Check each current drug is at a real dose before adding. [1]',
            recheck: `${RECHECK} ${GOAL}`,
        }),
        citation: [1],
        recommendation: 'Add the missing class to reach ACE inhibitor or ARB + amlodipine + thiazide-type diuretic.',
        confidence: 'recommended',
    },
    {
        id: 'htn-resistant', type: 'question', module: 5,
        title: 'Resistant hypertension: what is the eGFR?',
        body: `**Definition:** above goal on 3 drugs with complementary mechanisms including a diuretic, at maximally tolerated doses; or at goal only on 4 or more. [1]\n\n**Before the fourth drug:** [1]\n• Confirm with home or ambulatory readings, and confirm the pills are taken\n• Remove [interfering substances](#/info/htn-raisers)\n• Make the diuretic ${CTD} 12.5 to 25 mg or ${IND} 1.25 to 2.5 mg in place of HCTZ\n• Screen for [secondary causes](#/info/htn-secondary). Everyone with resistant hypertension gets an aldosterone-renin ratio whatever the potassium; continue current drugs for the test except an MRA\n\nThe fourth drug is rarely an ED start. Name the next step in the referral.`,
        citation: [1],
        options: [
            { label: 'eGFR 45 or higher', next: 'htn-r-spiro' },
            { label: 'eGFR under 45, high potassium, or cannot take an MRA', next: 'htn-r-resistant-alt' },
        ],
    },
    {
        id: 'htn-r-spiro', type: 'result', module: 5,
        title: 'Resistant, eGFR 45 or higher: add spironolactone',
        body: card({
            rx: `${SPI} 25 to 50 mg once daily as the fourth drug. [1]`,
            why: 'In PATHWAY-2, spironolactone lowered home systolic BP 8.70 mm Hg more than placebo and about 4 mm Hg more than bisoprolol or doxazosin. [13]',
            notIf: 'eGFR under 45, potassium supplements or another potassium-sparing diuretic, pregnancy. The guideline notes 4% to 40% of patients cannot tolerate it because of hyperkalemia or antiandrogen effects; eplerenone at an equivalent dose (25 to 50 mg twice daily) has fewer of the latter, but trials of 25 to 100 mg daily have not shown a BP reduction against placebo, and effective treatment may need higher doses. [1]',
            recheck: 'Potassium and creatinine in 2 to 4 weeks. In PATHWAY-2, potassium exceeded 6.0 mmol/L once in 6 of 285 patients on spironolactone. [1,13]',
        }),
        citation: [1, 13],
        recommendation: 'Resistant hypertension with eGFR 45 or higher: add spironolactone 25 to 50 mg daily and recheck potassium.',
        confidence: 'recommended',
    },
    {
        id: 'htn-r-resistant-alt', type: 'result', module: 5,
        title: 'Resistant, MRA not possible: the alternatives',
        body: `**Reasonable fourth-line options:** amiloride, a beta blocker, an alpha blocker, a central sympatholytic, aprocitentan 12.5 mg once daily, or a direct vasodilator. [1]\n\n**Notes that change the pick:** [1]\n• Amiloride matched spironolactone in trials at 10 to 20 mg; the guideline’s own drug table lists 5 to 10 mg/day. Both figures are shown. Like spironolactone, it is avoided when GFR is under 45 or potassium is high\n• Hydralazine or minoxidil only with a beta blocker and a loop diuretic already on board\n• Clonidine is a last-line choice: CNS effects, and rebound if stopped abruptly\n• Aprocitentan causes fluid retention in the first 4 to 6 weeks; avoid in pregnancy\n• CKD stage 4 or greater: ${CTD} or a loop diuretic such as ${TOR}\n\n**Refer:** suspected secondary cause, or still uncontrolled after 6 months of treatment. Renal denervation is a specialist-team option for selected patients, not a replacement for medicine. [1]\n\n${FOOT}`,
        citation: [1],
        recommendation: 'MRA not possible: choose an alternative fourth agent by comorbidity and refer to a hypertension specialist.',
        confidence: 'consider',
    },
    // ------------------------------------------------------------------ MODULE 6: DIET & LIFESTYLE
    {
        id: 'htn-diet', type: 'info', module: 6,
        title: 'Diet and lifestyle: what to tell every patient',
        body: 'Recommended for every patient with elevated BP or hypertension, with or without medicine. Approximate systolic drop in people with hypertension: [1]\n• **DASH eating pattern:** 5 to 8 mm Hg. Fruits, vegetables, whole grains, low-fat dairy; less saturated and total fat\n• **Sodium under 2,300 mg/day, ideally under 1,500:** 6 to 8\n• **Potassium-based salt substitute for home cooking:** 5 to 7. Check potassium first in CKD or on an ACE inhibitor, ARB, spironolactone or another potassium-retaining drug\n• **More potassium from food (3,500 to 5,000 mg/day):** about 6; same caution\n• **Weight loss of 5% or more:** 6 to 8; about 1 mm Hg per kg lost\n• **Alcohol: none is best; at most 2 drinks/day for men, 1 for women:** 4 to 6\n• **Aerobic exercise 90 to 150 min/week:** 4 to 8. Resistance training 2 to 7. Isometric hand-grip 5 to 10\n\nThe guideline cautions that these ranges come from different trials and should not be ranked against each other. [1]\n\nPatient wording and detail: [Diet page](#/info/htn-diet).',
        citation: [1, 19, 20],
        next: 'htn-dispo',
    },
    // ------------------------------------------------------------------ MODULE 7: DISPOSITION
    {
        id: 'htn-dispo', type: 'question', module: 7,
        title: 'Safe to go home?',
        body: '**Home when all are true:**\n• No acute organ damage after a deliberate look\n• A regimen the patient can fill and afford today\n• A named follow-up\n• Return precautions understood\n\nA high number without organ damage is not an admission criterion, and the guideline advises against aggressive short-term lowering, so there is no BP that must be reached before discharge. [1,2]',
        citation: [1, 2],
        options: [
            { label: 'Yes: discharge plan', next: 'htn-r-discharge' },
            { label: 'No: organ damage possible, or no safe plan', next: 'htn-r-admit', urgency: 'urgent' },
        ],
    },
    {
        id: 'htn-r-discharge', type: 'result', module: 7,
        title: 'Discharge plan',
        body: '**Follow-up:** the guideline asks for timely outpatient treatment after a severe reading, and monthly visits until controlled once medicine is started or changed. No day count for the first visit was found in the guideline text read for this build (its follow-up figure was not extracted): book the earliest one available, and write the readings and what you started in the note. [1]\n\n**Labs:** basic metabolic panel 2 to 4 weeks after starting or changing a diuretic, ACE inhibitor, ARB or MRA. [1]\n\n**Home BP:** validated upper-arm cuff; 2 readings 1 minute apart in the morning and at bedtime, for 3 to 7 days before the visit. [Technique](#/info/htn-home-bp) [1]\n\n**Diet:** [the plan in patient wording](#/info/htn-diet).\n\n**Return now for:** chest pain, shortness of breath, weakness, numbness or trouble speaking, confusion, severe headache, vision loss, fainting, or very little urine.\n\n[Discharge checklist](#/info/htn-discharge)',
        citation: [1, 2, 3],
        recommendation: 'Discharge with a fillable regimen, earliest available follow-up, labs in 2 to 4 weeks, a home BP log and return precautions.',
        confidence: 'recommended',
    },
    {
        id: 'htn-r-admit', type: 'result', module: 7,
        title: 'Not going home',
        body: '**Organ damage found or still possible:** this is the emergency pathway. [Hypertensive emergency (adult)](#/tree/hypertensive-emergency-adult) [1]\n\n**Admitted for another reason with a high reading and no organ damage:** do not write as-needed IV or extra oral antihypertensives for the number. The guideline classes that as harm. Continue or restart standing oral medicines and monitor. [1]\n• Older veterans given intensive BP treatment in the first 48 hours of a noncardiac admission had more of a composite of death, ICU transfer, stroke, kidney injury and cardiac injury (8.7% vs 6.9%; OR 1.28), worst with IV drugs (OR 1.90). [7]\n\n**No safe plan (cannot obtain medicine, no follow-up, cannot exclude organ damage):** observation and case management are a reasonable choice (clinical judgment; no guideline addresses it). The goal is a plan, not a lower number tonight.',
        citation: [1, 7],
        recommendation: 'Emergency pathway for organ damage. Otherwise standing oral medicines only: no as-needed doses for a number.',
        confidence: 'recommended',
    },
];
export const HYPERTENSION_NODE_COUNT = HYPERTENSION_NODES.length;
