const ADA = 'ADA Professional Practice Committee. Pharmacologic Approaches to Glycemic Treatment: Standards of Care in Diabetes—2026. Diabetes Care. 2026;49(Suppl 1):S183–S215. https://doi.org/10.2337/dc26-S009';
const LANTUS = 'LANTUS (insulin glargine U-100) prescribing information. Sanofi. Revised May 2025. Sections 2.1–2.3, 4, 5.3. https://products.sanofi.us/lantus/lantus.html';
const positive = (n) => Number.isFinite(n) && n > 0;
const binary = (n) => n === 0 || n === 1;
const units = (n) => Number.isSafeInteger(n) && n >= 0;
const display = (n) => Number(n.toFixed(2)).toString();
const withheld = (reason) => ({ value: '—', label: 'Dose withheld', description: `**REVIEW REQUIRED**\n\n${reason}`, colorVar: '--color-danger' });
const number = (name, label, unit, description) => ({ name, label, unit, description, type: 'number', points: 0, valueIsPoints: true });
const toggle = (name, label, description) => ({ name, label, description, type: 'toggle', points: 1 });
const select = (name, label, options) => ({ name, label, type: 'select', points: 0, hideOptionPoints: true, selectOptions: options.map(([label, points]) => ({ label, points })) });
const basalSafety = 'Clinician confirms adult, nonpregnant type 2 diabetes; clinically stable, eating/drinking, no DKA/HHS, AKI, acute illness requiring individualized dosing, hypoglycemia or insulin allergy. Medication reconciliation, glucose monitoring, hypoglycemia education and prompt follow-up are arranged. This is not an IV insulin or crisis-treatment tool.';
export function computeBasalStart(v) {
    if (v.safetyConfirmed !== 1 || v.insulinNaiveConfirmed !== 1)
        return withheld('Confirm the adult type 2 safety screen and that the patient is insulin-naive. Existing or unknown insulin therapy requires reconciliation and an individualized plan, not a new-start dose.');
    if (![1, 2, 3].includes(v.regimen))
        return withheld('Select a named U-100 insulin glargine starting regimen. Concentrated insulin, other basal products and insulin switching are not supported.');
    // Weight is optional only for the fixed regimen; reject invalid supplied values even then.
    if (v.regimen !== 1 && !positive(v.weight))
        return withheld('Enter a finite, positive measured weight in kg for the selected weight-based regimen.');
    if (v.regimen === 1 && v.weight !== undefined && (!Number.isFinite(v.weight) || v.weight < 0))
        return withheld('Correct the invalid weight entry.');
    const raw = v.regimen === 1 ? 10 : v.weight * (v.regimen === 2 ? 0.1 : 0.2);
    const dose = Math.floor(raw);
    if (!units(dose) || dose < 1)
        return withheld('This input does not produce a supported positive whole-unit starting dose. Review weight, units and the selected regimen.');
    const arithmetic = v.regimen === 1 ? 'Fixed regimen: 10 units.' : `${v.weight} kg × ${v.regimen === 2 ? '0.1' : '0.2'} units/kg = ${display(raw)} units; rounded down to ${dose} whole units.`;
    return { value: `${dose} units`, label: 'U-100 glargine starting-dose candidate', colorVar: '--color-warning', description: `**STARTING REGIMEN**\n\n${arithmetic} U-100 insulin glargine subcutaneously once daily at the same time each day. This is a clinician-reviewed starting candidate, not a prescription.\n\n**SAFETY AND FOLLOW-UP**\n\nNo automatic maximum dose is imposed; verify unusual weights and results independently. Do not use for type 1 diabetes, pregnancy, children, DKA/HHS, AKI, hypoglycemia or unknown/existing insulin therapy. Confirm product, supplies, monitoring and follow-up before discharge. Do not mix or dilute glargine or give it intravenously.` };
}
export function computeBasalTitrate(v) {
    const readings = [v.fasting1, v.fasting2, v.fasting3];
    if (v.hypoglycemia === 1 || readings.some((n) => positive(n) && n < 70))
        return { value: 'REVIEW', label: 'Hypoglycemia: do not increase basal insulin', colorVar: '--color-danger', description: '**HYPOGLYCEMIA FIRST**\n\nTreat current hypoglycemia and review its cause, food intake, activity, medications and renal function. A 10–20% basal reduction may be appropriate when there is no clear reversible explanation, but requires clinician review. No definitive reduced dose is issued.\n\n**DO NOT WAIT THREE DAYS**\n\nHypoglycemia requires prompt reassessment even if the last dose change was recent. Arrange a revised monitoring and follow-up plan.' };
    if (v.safetyConfirmed !== 1 || v.glargineConfirmed !== 1 || !binary(v.hypoglycemia))
        return withheld('Confirm the adult type 2 safety screen, reconciled once-daily U-100 glargine regimen, and completed hypoglycemia review. Other insulins, pregnancy, type 1 diabetes, AKI and crisis treatment require an individualized plan.');
    if (!positive(v.currentDose) || !units(v.currentDose) || !readings.every(positive) || !Number.isFinite(v.target) || v.target < 70)
        return withheld('Enter the current whole-unit daily dose, three valid fasting glucose readings and the clinician-selected fasting upper target (at least 70 mg/dL). No target is supplied automatically.');
    if (v.threeDaysConfirmed !== 1)
        return withheld('Confirm at least three days on the unchanged basal dose before considering an increase. Do not wait to assess hypoglycemia.');
    if (!readings.every((n) => n > v.target))
        return { value: 'NO INCREASE', label: 'Readings are not all above the individualized target', colorVar: '--color-warning', description: '**NO AUTOMATIC INCREASE**\n\nAt least one fasting reading is at or below the selected target. Review the trend and any below-target readings before deciding whether the current dose is appropriate. Mixed readings do not trigger an increase or an automatic instruction to continue unchanged.\n\n**REASSESS**\n\nInvestigate missed doses, variable intake, technique and hypoglycemia; avoid increasing basal insulin solely to correct post-meal hyperglycemia.' };
    const dose = v.currentDose + 2;
    if (!units(dose))
        return withheld('The entered dose cannot be safely represented. Verify the medication and units.');
    return { value: `${dose} units`, label: 'Clinician-review candidate: add 2 units to daily dose', colorVar: '--color-warning', description: `**TITRATION CANDIDATE**\n\nAll three fasting readings exceed the individualized upper target of ${v.target} mg/dL without reported hypoglycemia. Current U-100 glargine ${v.currentDose} units + 2 units = ${dose} units subcutaneously once daily. Clinician must approve the change.\n\n**MONITORING**\n\nReview fasting glucose daily; reassess after at least three days before another increase. Hypoglycemia or changing health, intake or renal function requires earlier review. Do not use this tool to switch insulin products.` };
}
export function computeMealCorrection(v) {
    if (v.hypoglycemia === 1 || (positive(v.glucose) && v.glucose < 70))
        return withheld('Current glucose is below 70 mg/dL or hypoglycemia is reported. Treat and recheck first; this calculator does not provide a bolus during hypoglycemia.');
    if (v.safetyConfirmed !== 1 || v.crisisExcluded !== 1 || !binary(v.hypoglycemia))
        return withheld('Complete clinician review: adult, nonpregnant, established injection plan, no pump/AID, premixed or concentrated insulin plan, falling glucose, vomiting, inability to eat, AKI or hypoglycemia. DKA/HHS and other acute illness must be separately assessed and excluded. A glucose number alone cannot exclude crisis.');
    if (v.noActiveBolusConfirmed !== 1 || !Number.isFinite(v.hoursSinceBolus) || v.hoursSinceBolus < 4)
        return withheld('Recent or unknown active rapid-acting insulin: no bolus calculation. Confirm the timing of the last bolus (at least four hours) AND that no active bolus remains. Four hours alone does not establish absence of insulin on board.');
    if (![1, 2].includes(v.insulin) || ![1, 2].includes(v.ratioSource))
        return withheld('Select U-100 lispro or U-100 aspart and confirm the source of the established clinician-prescribed ICR, ISF and glucose target. Do not derive new ratios from a population formula.');
    if (![v.glucose, v.carbs, v.icr, v.isf].every(positive) || !Number.isFinite(v.target) || v.target < 70)
        return withheld('Enter current glucose in mg/dL, a positive confirmed carbohydrate amount in grams, established grams/unit ICR, established mg/dL/unit ISF, and an individualized target of at least 70 mg/dL. Zero/unknown denominators and correction-only dosing are not supported.');
    if (v.glucose < v.target)
        return withheld('Glucose is below the individualized target. Review the glucose trend and meal plan manually; this tool does not calculate reduced meal doses or negative corrections. Falling glucose, premixed insulin and concentrated insulin plans are not supported.');
    const meal = v.carbs / v.icr;
    const correction = Math.max(0, (v.glucose - v.target) / v.isf);
    const total = meal + correction;
    const dose = Math.floor(total);
    if (![meal, correction, total].every(Number.isFinite) || !units(dose))
        return withheld('The inputs produce an unsupported result. Verify carbohydrate grams, glucose units and insulin ratios.');
    const insulin = v.insulin === 1 ? 'lispro' : 'aspart';
    return { value: `${dose} units`, label: `U-100 ${insulin}: meal + positive correction candidate`, colorVar: '--color-warning', description: `**COMPONENTS**\n\nMeal: ${v.carbs} g ÷ ${v.icr} g/unit = ${display(meal)} units. Positive correction: max(0, [${v.glucose} − ${v.target}] ÷ ${v.isf}) = ${display(correction)} units. Total ${display(total)} units; floor to ${dose} whole units.\n\n**CLINICIAN REVIEW BEFORE ADMINISTRATION**\n\nThis is arithmetic for an established subcutaneous injection plan, not a new prescription. No insulin-on-board subtraction is modeled; never use with active/unknown bolus insulin or pump/AID. No negative correction is subtracted. If glucose is below the individualized target, review meal dosing manually. A result below one unit must not be rounded up automatically.\n\n**MEAL AND FOLLOW-UP**\n\nConfirm the food will be eaten, carbohydrate count and product-specific meal timing. Use the patient's established monitoring and hypoglycemia plan; do not repeat a correction based only on persistent hyperglycemia. Do not guess food carbohydrate amounts.` };
}
export const HG_BASAL_START_CALCULATOR = {
    id: 'hg-basal-start', title: 'Basal Insulin Start', subtitle: 'Stable insulin-naive adults with type 2 diabetes',
    description: 'NAMED REGIMEN ONLY. Choose a fixed U-100 glargine regimen. Dose-per-kg values are locked. Confirm clinical eligibility and follow-up before using the candidate dose.',
    fields: [
        select('regimen', 'U-100 glargine starting regimen', [['Select regimen', 0], ['Glargine U-100: fixed 10 units once daily', 1], ['Glargine U-100: 0.1 unit/kg once daily', 2], ['Glargine U-100: 0.2 unit/kg once daily', 3]]),
        number('weight', 'Measured weight (required for weight-based regimen)', 'kg'),
        toggle('safetyConfirmed', 'Clinician safety screen complete', basalSafety),
        toggle('insulinNaiveConfirmed', 'Confirmed insulin-naive', 'No existing insulin regimen. Medication history is known and reconciled; this tool cannot convert or restart an uncertain regimen.'),
    ], results: [], thresholdNote: 'Clinician decision support only. Whole units are rounded down. No glucose target or maximum dose is inferred.', citations: [ADA, LANTUS], computeResult: computeBasalStart,
};
export const HG_BASAL_TITRATE_CALCULATOR = {
    id: 'hg-basal-titrate', title: 'Basal Insulin Titration', subtitle: 'Established once-daily U-100 glargine, adult type 2 diabetes',
    description: 'INDIVIDUALIZED FASTING GOAL. Enter three consecutive fasting readings on the same dose and the clinician-set upper target. Any hypoglycemia overrides routine escalation.',
    fields: [number('currentDose', 'Current once-daily U-100 glargine dose', 'units'), number('fasting1', 'Fasting glucose: day 1', 'mg/dL'), number('fasting2', 'Fasting glucose: day 2', 'mg/dL'), number('fasting3', 'Fasting glucose: day 3', 'mg/dL'), number('target', 'Clinician-selected fasting upper target', 'mg/dL', 'Required individualized goal; no default.'), toggle('hypoglycemia', 'Any hypoglycemia since the last change', 'Include symptomatic episodes, overnight events and any glucose below 70 mg/dL.'), toggle('glargineConfirmed', 'Current U-100 glargine dose reconciled', 'Confirmed once-daily glargine U-100, no missed/duplicate doses or insulin switching.'), toggle('threeDaysConfirmed', 'At least three days since last dose change', 'All three readings are from this unchanged dose; hypoglycemia requires review sooner.'), toggle('safetyConfirmed', 'Clinician safety and follow-up screen complete', basalSafety)],
    results: [], thresholdNote: 'All above target: consider +2 units after clinician review. Mixed readings: no automatic increase. Hypoglycemia: consider 10–20% reduction after cause review; no definitive reduced dose is generated.', citations: [ADA, LANTUS], computeResult: computeBasalTitrate,
};
export const HG_MEAL_CORRECTION_CALCULATOR = {
    id: 'hg-meal-correction', title: 'Meal + Correction Insulin', subtitle: 'Established individualized U-100 rapid-acting injection plan',
    description: 'EXISTING RATIOS ONLY. Arithmetic for a meal using prescribed ICR, ISF and target. No default ratio, target, food carbohydrate estimate or insulin-on-board model. Not for a new insulin regimen or correction-only dosing.',
    fields: [select('insulin', 'Rapid-acting U-100 insulin', [['Select insulin', 0], ['Insulin lispro U-100', 1], ['Insulin aspart U-100', 2]]), select('ratioSource', 'Verified source of ICR, ISF and target', [['Unknown / not confirmed', 0], ['Current written clinician-prescribed plan reviewed', 1], ['Prescribing diabetes clinician directly confirmed plan', 2]]), number('glucose', 'Current glucose', 'mg/dL'), number('carbs', 'Confirmed carbohydrate content of meal', 'g', 'Use a verified label or patient-specific count; meal must be available and tolerated.'), number('icr', 'Established insulin-to-carbohydrate ratio', 'g/unit'), number('isf', 'Established insulin sensitivity factor', 'mg/dL/unit'), number('target', 'Individualized correction target', 'mg/dL'), number('hoursSinceBolus', 'Known hours since last rapid-acting bolus', 'hours', 'At least four hours AND no active bolus confirmed; elapsed time alone is insufficient.'), toggle('hypoglycemia', 'Hypoglycemia present', 'Current symptoms or documented low glucose requires treatment and reassessment first.'), toggle('noActiveBolusConfirmed', 'Clinician confirms no active bolus insulin', 'Last bolus timing and regimen reviewed; no residual/unknown insulin on board and no recent extra corrections.'), toggle('crisisExcluded', 'DKA/HHS and acute metabolic deterioration excluded', 'Separate clinical assessment; neither a normal nor an elevated glucose number alone determines crisis status.'), toggle('safetyConfirmed', 'Clinician confirms established-plan safety', 'Adult, nonpregnant patient on a known injection regimen; no pump/AID, premixed or concentrated insulin plan, falling glucose, vomiting, AKI, inability to eat, hypoglycemia or insulin allergy. Ratios, target, food, dose timing and monitoring plan reviewed.')],
    results: [], thresholdNote: 'Meal/carbohydrate ratio plus positive correction only; floor the combined result to whole units. Unknown active insulin, incomplete ratios or absent safety confirmations withhold the dose.', citations: [ADA], computeResult: computeMealCorrection,
};
const BASAL_TITRATION = 'Add 2 units every 3 days while fasting glucose is above 130 (goal 80 to 130). Any glucose under 70: cut the dose 10 to 20% and call. Stop raising if the dose passes 0.5 units/kg (overbasalization).';
const SUPPLY_INSULIN = ['Glucose meter, strips and lancets (check fasting daily)', 'Syringes (vial) or pen needles (pen), sharps container', 'Glucose tablets for lows; teach-back on injection and low treatment', 'Insulin storage: unopened in the fridge, in-use vial or pen at room temperature per label'];
const SUPPLY_PILLS = ['Glucose meter, strips and lancets (essential with glipizide or glimepiride)', 'Written sick-day rules'];
const PHARM = 'per pharmacy/endocrine (no sourced conversion)';
const stop = (stops) => ({ blocked: true, stops, headline: 'Withheld', items: [], avoided: [], notes: [], dontUse: [], supplies: [], followUp: '' });
const sitaDose = (egfr) => egfr >= 45 ? '100 mg once daily' : egfr >= 30 ? '50 mg once daily' : '25 mg once daily';
const flag = (n) => n === 1;
export function planBridge(v) {
    const stops = [];
    if (flag(v.crisis))
        stops.push('Possible DKA/HHS or insulin crisis (vomiting, abdominal pain, deep breathing, altered mental status, ketones or acidosis, glucose 600 or more, weight loss with ketosis): use the DKA/HHS consult.');
    if (flag(v.pregnant))
        stops.push('Pregnant: needs obstetric/endocrine plan; no oral agents or this builder.');
    if (flag(v.under18))
        stops.push('Age under 18: pediatric pathway.');
    if (flag(v.type1Clues))
        stops.push('Looks like type 1 or insulin deficiency (thin or young, rapid weight loss, ketones, autoimmune history, pump): specialist branch, insulin and teaching, not this builder.');
    if (flag(v.dialysis) || (Number.isFinite(v.egfr) && v.egfr > 0 && v.egfr < 15))
        stops.push('eGFR under 15 or dialysis: call nephrology/endocrine; no sourced bridge plan here.');
    if (![1, 2, 3, 4, 5].includes(v.patientType))
        stops.push('Select the patient type (A to E).');
    if (!positive(v.egfr))
        stops.push('Enter a valid eGFR (mL/min/1.73 m2). It decides which drugs are allowed.');
    if (stops.length)
        return stop(stops);
    const type = ['A', 'B', 'C', 'D', 'E'][v.patientType - 1];
    const uninsured = flag(v.uninsured);
    if (type === 'E')
        return planSteroid(v, uninsured);
    if (type === 'D' || (type === 'B' && flag(v.priorInsulin)))
        return planOnInsulin(v, uninsured, type);
    return planMain(v, type, uninsured);
}
function insulinProduct(units, uninsured) {
    if (!uninsured)
        return { rx: `Insulin glargine U-100 (formulary basal analog) ${units} units subcutaneously once daily, same time each day. Disp: 1 pen box or vial plus needles.`, cash: 'Insured: formulary basal analog' };
    return {
        rx: `Basal analog on a $35 program: glargine (Basaglar or Rezvoglar via Lilly Insulin Value Program; Lantus via Sanofi Insulins Valyou, confirm) or Tresiba via NovoCare MyInsulinRx: ${units} units once daily, same time. Not for Medicaid, Medicare, VA or TRICARE patients.`,
        cash: '$35 per 30 days (Lilly card expires 12/31/2026)',
        cheapest: `Cheapest safe version: NPH (ReliOn vial about $25, price unverified, or Novolin N $35 via MyInsulinRx) ${units} units at bedtime plus syringes. Same ADA starting range, but it peaks 4 to 12 hours later: more overnight lows. If the dose grows, the twice-daily split is ${PHARM}.`,
    };
}
function planMain(v, type, uninsured) {
    const egfr = v.egfr;
    const a1c = positive(v.a1c) ? v.a1c : undefined;
    const catabolic = flag(v.weightLoss);
    const symptomatic = flag(v.symptoms);
    const severe = (a1c !== undefined && a1c > 10) || (positive(v.glucose) && v.glucose >= 300 && (symptomatic || catabolic)) || catabolic;
    const severity = severe ? 'severe' : a1c !== undefined && a1c >= 8.5 ? 'moderate' : 'mild';
    const avoided = [];
    const notes = [];
    const dontUse = [];
    const items = [];
    const restart = type === 'B'; // off treatment: restart from label starting doses
    const onMet = !restart && flag(v.onMetformin), onSU = !restart && flag(v.onSU), onSGLT2 = !restart && flag(v.onSGLT2);
    const frail = flag(v.frail), meals = flag(v.mealsUnreliable), alcohol = flag(v.alcohol);
    const liver = v.liver === 2 ? 2 : v.liver === 1 ? 1 : 0;
    const hf = flag(v.hf), indicated = hf || flag(v.ascvd) || flag(v.ckd);
    if (a1c === undefined && !severe)
        notes.push('No A1c: planned as mild from the ED glucose and symptoms. Get an A1c at follow-up and escalate if it is 8.5 or higher.');
    if (type === 'B')
        notes.push('Ran out or stopped: restart the old agents at the label starting dose and retitrate; do not restart at the old maximum.');
    const metNew = egfr >= 45 && liver !== 2 && !alcohol;
    const metKeep = onMet && egfr >= 30 && liver !== 2 && !alcohol;
    const metOk = metNew || metKeep;
    if (!metOk) {
        if (egfr < 30)
            avoided.push('Metformin avoided: eGFR under 30 (contraindicated).');
        else if (egfr < 45)
            avoided.push('Metformin not started: eGFR 30 to 44 (ADA 2026: do not start). Existing users: max 1000 mg/day.');
        if (liver === 2)
            avoided.push('Metformin avoided: decompensated liver disease.');
        if (alcohol)
            avoided.push('Metformin avoided: heavy alcohol use (lactic acidosis risk).');
    }
    const metItem = () => {
        if (onMet) {
            const cap = egfr < 45;
            return { drug: 'Metformin (continue)', rx: cap ? 'Continue metformin but cap at 1000 mg/day total (eGFR under 45).' : flag(v.metforminMaxed) ? 'Continue metformin at the current maximum tolerated dose (up to 2000 mg ER daily).' : 'Increase metformin by 500 mg each week as tolerated, up to 2000 mg ER once daily with dinner (IR up to 1000 mg twice daily).', why: 'Cheap, no lows by itself, decades of safety.', cash: 'About $4 to $10 per month (Walmart $4 list for IR)' };
        }
        return { drug: 'Metformin ER', rx: 'Metformin ER 500 mg by mouth with dinner. Increase by 500 mg every week as tolerated, up to 2000 mg once daily. Disp #120 (500 mg ER). IR option: 500 mg twice daily with meals, up 500 mg weekly, up to 1000 mg twice daily.', why: 'First choice: cheap, no lows by itself, weight neutral. Take with food; ER is gentler on the stomach.', cash: 'About $4 to $10 per month (Walmart $4 list covers IR; confirm ER)' };
    };
    const sguItem = () => {
        const su = (frail || egfr < 60 || liver > 0) ? '2.5 mg' : '5 mg';
        return { drug: 'Glipizide IR', rx: onSU ? 'Continue current glipizide or glimepiride dose; do not raise it if any reading is under 70.' : `Glipizide IR ${su} by mouth 30 minutes before breakfast. Increase by 2.5 to 5 mg after several days only with glucose review. Once-daily max 15 mg. Disp #30.`, why: 'Cheap and strong; only safe because meals are reliable.', cash: 'About $4 per month (Walmart list)' };
    };
    const sitaItem = () => ({ drug: 'Sitagliptin', rx: `Sitagliptin ${sitaDose(egfr)}. Do not combine with a GLP-1 drug. Disp #30.`, why: 'Low lows risk; dose follows the eGFR.', cash: 'Price unknown in 2026, ask the pharmacy' });
    const pioItem = () => ({ drug: 'Pioglitazone', rx: 'Pioglitazone 15 mg by mouth once daily (15 to 30 mg start range; max 45 mg). Slow: full effect takes weeks. Disp #30.', why: liver === 1 ? 'Helps fatty liver; no lows.' : 'No lows; cheap.', cash: 'About $4 to $10 per month' });
    const sgltItem = () => onSGLT2 ? { drug: 'SGLT2 inhibitor (continue)', rx: 'Continue; hold on any sick day, vomiting or fasting.', why: 'Heart and kidney protection.', cash: 'Existing supply' } : { drug: 'SGLT2 inhibitor', rx: `Empagliflozin 10 mg or dapagliflozin 10 mg by mouth every morning. Start for heart/kidney benefit; glucose lowering is weak at eGFR under 45${egfr < 25 ? ' (dapagliflozin label starts CKD therapy at eGFR 25 or more; ADA 2026 allows 20 or more)' : ''}. Disp #30.`, why: hf ? 'Heart failure: lowers admissions.' : 'Heart/kidney benefit (HF, CKD or prior heart attack/stroke).', cash: 'Generic dapagliflozin (FDA approved April 2026, price unknown) or BI Cares for Jardiance (about 200% poverty level)' };
    if (severe) {
        let dose = 10;
        const lowRisk = frail || egfr < 45 || meals || alcohol;
        if (positive(v.weight) && lowRisk)
            dose = Math.min(10, Math.max(1, Math.floor(0.1 * v.weight)));
        if (flag(v.cantInject))
            return { ...stop(['Insulin is needed but the patient cannot self-inject safely (vision, dexterity, no caregiver). Arrange a caregiver or home health, or observe/admit. Do not send home with insulin they cannot give.']), kind: type, severity };
        const prod = insulinProduct(dose, uninsured);
        items.push({ drug: 'Basal insulin', rx: prod.rx, why: 'Severe at presentation (A1c over 10, glucose 300 or more with symptoms, or weight loss): pills are too slow. Many patients can reduce insulin later once glucose toxicity clears.', cash: prod.cash });
        if (prod.cheapest)
            notes.push(prod.cheapest);
        if (metOk)
            items.push(metItem());
        if (onSU)
            avoided.push(frail || meals || alcohol || egfr < 30 ? 'Sulfonylurea stopped: lows risk with insulin and this patient.' : 'Sulfonylurea: reassess; stop if any reading is under 70.');
        if (onSGLT2)
            notes.push('On an SGLT2 inhibitor: check ketones before discharge; hold it if sick or not eating.');
        avoided.push('SGLT2 inhibitor and GLP-1 not started from the ED when severe or catabolic: ketoacidosis and vomiting risk. Start at follow-up.');
        if (positive(v.weight))
            notes.push(`Ceiling: if the dose passes ${Math.floor(0.5 * v.weight)} units (0.5 units/kg), stop raising it and call.`);
        if (egfr < 45)
            notes.push('Low eGFR: insulin clears more slowly and lows are more likely: use the low end of the dose range and follow up early.');
        dontUse.push('Insulin deficiency suspected (thin, young, ketones): do not use; specialist branch.', 'No meter or strips, cannot inject, or cannot be reached within a week.');
        return { blocked: false, stops: [], kind: type, severity, headline: `Basal insulin ${dose} units daily${metOk ? ' + metformin' : ''}`, items, avoided, notes, dontUse, supplies: SUPPLY_INSULIN, followUp: 'Phone check in 2 to 3 days; clinic within 1 week; A1c in 3 months. Return for vomiting, belly pain or deep breathing.', titration: BASAL_TITRATION, basalUnits: dose };
    }
    // Non-severe: choose second-line pieces
    const secondLine = [];
    const suOk = !meals && !frail && !alcohol && liver !== 2 && egfr >= 30;
    const pioOk = !hf && liver !== 2;
    if (liver === 1 && pioOk)
        secondLine.push('PIO');
    if (!metOk)
        secondLine.push('SITA'); // no metformin: sitagliptin first (matches the tree)
    if (suOk)
        secondLine.push('SU');
    if (!secondLine.includes('SITA'))
        secondLine.push('SITA');
    if (pioOk && !secondLine.includes('PIO'))
        secondLine.push('PIO');
    if (!suOk) {
        if (meals)
            avoided.push('Glipizide/glimepiride avoided: meals unreliable (prolonged lows).');
        if (frail)
            avoided.push('Glipizide/glimepiride avoided: age 65+ or frail (lows).');
        if (alcohol)
            avoided.push('Glipizide/glimepiride avoided: heavy alcohol use (lows).');
        if (egfr < 30)
            avoided.push('Glipizide/glimepiride avoided: eGFR under 30.');
    }
    if (hf)
        avoided.push('Pioglitazone avoided: heart failure (fluid retention).');
    if (!indicated) { /* no organ-protection signal */ }
    else if (egfr < 20)
        avoided.push('SGLT2 inhibitor not started: eGFR under 20.');
    const sgltOk = indicated && egfr >= 20;
    const build = (need) => {
        const list = [];
        if (sgltOk)
            list.push('SGLT');
        if (metOk)
            list.push('MET');
        for (const s of secondLine)
            list.push(s);
        // keep current agents that are still allowed before adding new ones
        const have = (a) => (a === 'MET' && onMet) || (a === 'SU' && onSU) || (a === 'SGLT' && onSGLT2);
        const keep = list.filter(have);
        const rest = list.filter((a) => !have(a));
        return [...keep, ...rest].slice(0, need);
    };
    let need = severity === 'moderate' ? 2 : 1;
    let target = build(need);
    if (type === 'C') {
        for (let i = 0; i < 3; i++) {
            const adds = target.filter((a) => !((a === 'MET' && onMet) || (a === 'SU' && onSU) || (a === 'SGLT' && onSGLT2)));
            const titratable = target.includes('MET') && onMet && egfr >= 45 && !flag(v.metforminMaxed);
            if (adds.length || titratable)
                break;
            need += 1;
            target = build(need);
        }
    }
    for (const a of target)
        items.push(a === 'MET' ? metItem() : a === 'SGLT' ? sgltItem() : a === 'SU' ? sguItem() : a === 'SITA' ? sitaItem() : pioItem());
    if (onMet && !target.includes('MET'))
        avoided.push(egfr < 30 ? 'Stop current metformin: eGFR under 30.' : 'Metformin: see the note above; do not exceed the allowed cap.');
    if (onSU && !target.includes('SU'))
        avoided.push('Stop current glipizide/glimepiride (see lows risk above).');
    if (indicated && !target.includes('SGLT') && sgltOk === false) { /* covered above */ }
    if (egfr < 30)
        notes.push('eGFR 15 to 29: pills have little glucose effect; if A1c stays high, ask endocrine about low-dose insulin.');
    if (items.length === 0)
        return { ...stop(['No allowed drug fits this combination. Call pharmacy or endocrine.']), kind: type, severity };
    dontUse.push('DKA/HHS, insulin deficiency or pregnancy (builder blocks these).', 'Vomiting, dehydration or AKI: hold metformin and SGLT2 until recovered.');
    if (target.includes('SU'))
        dontUse.push('Skipping meals, heavy alcohol, or age 65+ with lows (do not use a sulfonylurea).');
    if (target.includes('SGLT'))
        dontUse.push('Sick, vomiting, ketotic or fasting patient (hold SGLT2).');
    return { blocked: false, stops: [], kind: type, severity, headline: items.map((i) => i.drug).join(' + '), items, avoided, notes, dontUse, supplies: SUPPLY_PILLS, followUp: 'Clinic in 1 to 2 weeks (sooner by phone if on glipizide or glimepiride). eGFR and A1c at follow-up; repeat A1c in 3 months. If A1c stays over 10 or symptoms worsen, start basal insulin.' };
}
function planOnInsulin(v, uninsured, type) {
    const scenario = type === 'B' ? 5 : v.dScenario;
    const basal = v.currentBasal;
    const items = [];
    const avoided = [];
    const notes = [];
    const dontUse = ['Insulin deficiency or crisis (builder blocks).', 'Any dose change without a meter, strips and a call-back plan.'];
    const done = (headline, followUp, extra) => ({ blocked: false, stops: [], kind: type, headline, items, avoided, notes, dontUse, supplies: SUPPLY_INSULIN, followUp, ...extra });
    if (flag(v.onSU) && scenario === 2)
        avoided.push('Stop the sulfonylurea: it adds to insulin lows.');
    if (![1, 2, 3, 4, 5].includes(scenario))
        return stop(['Select what is wrong with the current insulin plan (high fasting, lows, cannot afford, high after meals, ran out).']);
    const kind = v.insulinKind;
    const complex = kind === 4 || kind === 3;
    if ([1, 4].includes(scenario) && ![1, 2, 3, 4].includes(kind))
        return stop(['Current insulin product unknown: reconcile the exact product and doses (pharmacy fill history, pen or vial label) before changing any dose.']);
    if (scenario === 1) {
        if (!units(basal) || basal < 1)
            return stop(['Enter the current basal insulin dose in units.']);
        if (complex)
            return stop(['NPH, regular or 70/30 regimen: no sourced titration rule here. Ask pharmacy/endocrine for the split and the increase.']);
        const over = positive(v.weight) && basal >= 0.5 * v.weight;
        if (over) {
            items.push({ drug: 'Do not raise basal', rx: `Current ${basal} units is 0.5 units/kg or more (overbasalization). Look at after-meal glucose; consider a mealtime dose of 4 units or 10% of basal (${Math.max(1, Math.round(0.1 * basal))} units) at the biggest meal, or a GLP-1 referral.`, why: 'More basal stops helping and raises lows.', cash: 'Mealtime insulin: see cost page' });
            return done('Stop raising basal; address meals', 'Clinic or phone check within 1 week.');
        }
        items.push({ drug: 'Basal insulin titration', rx: `Raise basal from ${basal} to ${basal + 2} units once daily. Then add 2 units every 3 days while fasting is above 130 (goal 80 to 130), if there are no lows and every dose was actually taken.`, why: 'Fasting high means basal is too low.', cash: uninsured ? 'Same insulin: check the $35 program' : 'Same product' });
        return done(`Basal ${basal} to ${basal + 2} units`, 'Phone check in 3 days; clinic within 1 to 2 weeks.', { titration: BASAL_TITRATION, basalUnits: basal + 2 });
    }
    if (scenario === 2) {
        const fasting = v.lowTiming !== 2;
        if (![1, 2].includes(v.lowTiming))
            return stop(['Say when the lows happen: fasting/overnight (basal) or after a meal (mealtime dose).']);
        const dose = fasting ? basal : v.currentMeal;
        if (!units(dose) || dose < 1)
            return stop([fasting ? 'Enter the current basal dose in units.' : 'Enter the current mealtime dose in units.']);
        const lo = Math.max(1, Math.round(dose * 0.8)), hi = Math.max(1, Math.round(dose * 0.9));
        items.push({ drug: fasting ? 'Reduce basal' : 'Reduce mealtime dose', rx: `Cut the ${fasting ? 'basal' : 'mealtime'} dose 10 to 20%: from ${dose} to about ${lo} to ${hi} units. Use ${hi} units if the cause is clear and mild; ${lo} units if more than one low or any low needed help.`, why: fasting ? 'Fasting or overnight lows point to basal.' : 'Lows after a meal point to the mealtime dose.', cash: 'No new cost' });
        notes.push('Check the cause first: skipped meal, alcohol, new low kidney function, extra dose, or a recent steroid stop.');
        return done(`Cut ${fasting ? 'basal' : 'mealtime'} insulin 10 to 20%`, 'Phone check in 2 to 3 days; clinic within 1 week.');
    }
    if (scenario === 3) {
        items.push({ drug: 'Keep the same insulin, make it cheaper', rx: 'Enroll in a $35 per 30 day program for the SAME product: Lilly Insulin Value Program (Basaglar, Rezvoglar, Humalog, Humulin R/N/70-30; card expires 12/31/2026), NovoCare MyInsulinRx (NovoLog, Tresiba, Novolin), Sanofi Insulins Valyou (Lantus; confirm). Not for Medicaid, Medicare, VA or TRICARE patients.', why: 'No conversion means no new lows.', cash: '$35 per 30 days' });
        items.push({ drug: 'Fallback only if no program fits: human insulin', rx: `Glargine to NPH: dose and split ${PHARM}. Lispro to regular: regular is injected about 30 minutes before meals; unit conversion ${PHARM}. 70/30: inject 30 to 45 minutes before a meal; start dose ${PHARM}. (Twice-daily NPH to once-daily glargine is 80% of the NPH total, per the Lantus label.)`, why: 'No labeled glargine-to-NPH or lispro-to-regular rule exists.', cash: 'ReliOn vials about $25 each (unverified)' });
        notes.push('Call the pharmacist or endocrine on call with the full regimen before writing any converted dose. Expect more lows with NPH, regular and 70/30.');
        return done('Same insulin via $35 program', 'Phone check in 2 to 3 days after any change; clinic within 1 week.');
    }
    if (scenario === 4) {
        if (!units(basal) || basal < 1)
            return stop(['Enter the current basal insulin dose in units.']);
        if (complex)
            return stop(['NPH, regular or 70/30 regimen: no sourced mealtime add-on rule. Ask pharmacy/endocrine.']);
        if (kind === 2) {
            items.push({ drug: 'Adjust the existing mealtime dose', rx: 'Already on mealtime insulin: raise the dose before the meal that is followed by high readings by 1 to 2 units or 10 to 15%, no more than twice a week. If any reading is under 70, cut that dose 10 to 20% instead. Do not add a second new mealtime injection.', why: 'The mealtime dose is already there; adjust it rather than stack another.', cash: uninsured ? 'Same product via a $35 program' : 'Same product' });
            return done('Adjust the existing mealtime dose', 'Clinic within 1 to 2 weeks with a meal log.');
        }
        const tenPct = Math.max(1, Math.round(0.1 * basal));
        items.push({ drug: 'Add one mealtime dose', rx: `Add rapid-acting insulin at the biggest meal: 4 units or 10% of basal (${tenPct} units). Give within 15 minutes before or right after eating (lispro). Adjust by 1 to 2 units or 10 to 15% twice a week. Do not use when not eating.`, why: 'Fasting is fine, so more basal will not fix after-meal highs.', cash: uninsured ? 'Humalog $35 (Lilly) or NovoLog $35 (MyInsulinRx); cheaper fallback: regular 30 minutes before the meal, start dose per pharmacy/endocrine' : 'Formulary rapid analog' });
        notes.push('If A1c is under 8% when mealtime insulin is added, consider cutting basal by 4 units or 10%.');
        return done('Add mealtime insulin at the biggest meal', 'Clinic within 1 to 2 weeks with a meal log.');
    }
    // scenario 5: ran out
    items.push({ drug: 'Restart the old regimen', rx: units(basal) && basal >= 1 ? `Restart basal at the prior reconciled dose (${basal} units) only if the dose is verified and the patient is eating normally. Never double up to catch up.` : 'Dose unknown or unverified: do not guess. Restart as a new insulin start (10 units or 0.1 to 0.2 units/kg basal) with the standard titration.', why: 'Do not use an old dose you cannot verify.', cash: uninsured ? '$35 program for the same product' : 'Refill same product' });
    notes.push(`If many days were missed, intake is low or the patient is frail, the restart dose is ${PHARM}.`);
    return done('Restart insulin safely', 'Phone check in 2 to 3 days; clinic within 1 week.', { titration: BASAL_TITRATION });
}
function planSteroid(v, uninsured) {
    const pred = v.prednisone;
    const items = [];
    const notes = ['Lower confidence: no guideline consensus. Dosing is from an RCT (NCT03511521), conservative on purpose.'];
    const dontUse = ['Not for DKA/HHS or insulin deficiency.', 'Not for a steroid other than once-daily morning prednisone (ask pharmacy/endocrine).'];
    if (flag(v.shortBurst))
        return { blocked: false, stops: [], kind: 'E', headline: 'Short burst, normal A1c: often no treatment', items: [{ drug: 'No insulin now', rx: 'Check fingerstick glucose before dinner and at bedtime while on the steroid. Return for thirst, urinating a lot, glucose over 300, or vomiting.', why: 'Steroid effect fades with the dose; insulin risks lows when it ends.', cash: 'Meter and strips only' }], avoided: [], notes, dontUse, supplies: SUPPLY_PILLS, followUp: 'Recheck glucose and A1c with primary care after the course.' };
    if (!flag(v.steroidMorningOnce))
        return stop(['Steroid is not once-daily morning prednisone (dexamethasone, split dosing, evening dosing, IV): no sourced rule. Ask pharmacy/endocrine.']);
    if (!positive(pred) || pred < 10)
        return stop(['Enter the prednisone dose in mg (10 mg or more). No sourced insulin dose exists below 10 mg: monitor glucose instead.']);
    if (!positive(v.weight))
        return stop(['Enter the measured weight in kg for weight-based NPH.']);
    if (v.egfr < 30)
        return stop(['eGFR under 30: NPH clearance is slower; dose reduction is not sourced. Ask pharmacy/endocrine.']);
    const perKg = pred <= 40 ? 0.15 : 0.3;
    const dose = Math.floor(perKg * v.weight);
    if (dose < 1)
        return stop(['Weight and dose give under 1 unit: not a usable NPH dose. Monitor glucose and ask pharmacy/endocrine.']);
    items.push({ drug: 'NPH insulin with the morning steroid', rx: `NPH ${dose} units subcutaneously each morning, given with the prednisone dose (${perKg} units/kg x ${v.weight} kg, rounded down). Taper the NPH as the steroid is tapered; stop it the day the steroid stops. Disp: 1 vial plus syringes.`, why: 'NPH peaks several hours after injection, matching the steroid glucose peak.', cash: uninsured ? 'ReliOn NPH vial about $25 (unverified) or Novolin N / Humulin N $35 via MyInsulinRx or Lilly program' : 'Insured: NPH or formulary equivalent' });
    if (flag(v.frail))
        notes.push('Age 65+ or frail: lows are more likely; check before lunch and dinner and call for any reading under 100.');
    notes.push('If any glucose is under 70, cut the NPH dose 10 to 20% and call. If the steroid dose changes, the NPH dose changes with it.');
    return { blocked: false, stops: [], kind: 'E', headline: `NPH ${dose} units with morning steroid`, items, avoided: [], notes, dontUse, supplies: SUPPLY_INSULIN, followUp: 'Phone check in 2 to 3 days and at each steroid taper step; clinic within 1 week.', basalUnits: dose };
}
export function computeBridgePlan(v) {
    const p = planBridge(v);
    if (p.blocked)
        return withheld(p.stops.join('\n\n'));
    const lines = (arr) => arr.map((s) => `• ${s}`).join('\n');
    const parts = [
        `**REGIMEN${p.severity ? ` (${p.severity.toUpperCase()})` : ''}:**\n${p.items.map((i) => `• **${i.drug}:** ${i.rx}`).join('\n')}`,
        `**CHEAPEST SAFE VERSION AND COST:**\n${p.items.map((i) => `• ${i.drug}: ${i.cash}`).join('\n')}${p.notes.filter((n) => n.startsWith('Cheapest')).map((n) => `\n• ${n}`).join('')}`,
        `**WHY EACH CHOICE:**\n${lines(p.items.map((i) => `${i.drug}: ${i.why}`).concat(p.avoided))}`,
    ];
    if (p.titration)
        parts.push(`**TITRATION:**\n• ${p.titration}`);
    const other = p.notes.filter((n) => !n.startsWith('Cheapest'));
    if (other.length)
        parts.push(`**NOTES:**\n${lines(other)}`);
    parts.push(`**DO NOT USE IF:**\n${lines(p.dontUse)}`, `**SUPPLIES:**\n${lines(p.supplies)}`, `**FOLLOW-UP:**\n• ${p.followUp}`, `**CLINICIAN REVIEW:** Decision support, not a prescription. Citations are on this page. Dose pieces with no labeled rule say per pharmacy/endocrine.`);
    return { value: p.headline, label: `Bridge plan (type ${p.kind})`, colorVar: '--color-warning', description: parts.join('\n\n') };
}
export const HG_PLAN_BUILDER_CALCULATOR = {
    id: 'hg-plan-builder', title: 'Bridge Plan Builder', subtitle: 'Adult ED hyperglycemia: regimen, cheapest safe version and why',
    description: 'Enter the patient facts. Output is a starting regimen with doses, the uninsured version, one line of reasoning per choice, supplies and follow-up. Crisis flags, pregnancy, age under 18, type 1 clues and eGFR under 15 or dialysis withhold the plan.',
    fields: [
        select('patientType', 'Who is this patient?', [['Select', 0], ['A. New diagnosis, never treated', 1], ['B. Known diabetes, ran out or stopped', 2], ['C. On pills, still high', 3], ['D. On insulin, still high, lows or cannot afford', 4], ['E. Steroid-induced or illness-driven', 5]]),
        toggle('crisis', 'RED FLAG: vomiting, belly pain, deep breathing, confusion, ketones/acidosis, glucose 600 or more', 'Any of these stops the builder: use the DKA/HHS consult.'),
        toggle('pregnant', 'Pregnant', 'Stops the builder.'), toggle('under18', 'Age under 18', 'Stops the builder.'), toggle('type1Clues', 'Looks like type 1 (thin/young, weight loss with ketones, autoimmune history, pump)', 'Stops the builder.'), toggle('dialysis', 'On dialysis', 'Stops the builder.'),
        number('egfr', 'eGFR', 'mL/min/1.73 m2', 'Required. Under 15 stops the builder.'),
        number('a1c', 'A1c (leave 0 if unknown)', '%'), number('glucose', 'ED glucose', 'mg/dL'),
        toggle('symptoms', 'Symptoms: thirst, urinating a lot, fatigue', 'With glucose 300 or more, counts as severe.'), toggle('weightLoss', 'Unintentional weight loss (catabolic)', 'Counts as severe.'),
        toggle('hf', 'Heart failure', ''), toggle('ascvd', 'Prior heart attack, stroke or PAD', ''), toggle('ckd', 'CKD or albuminuria', ''),
        select('liver', 'Liver', [['None', 0], ['Fatty liver or compensated', 1], ['Decompensated cirrhosis', 2]]),
        toggle('frail', 'Age 65+ or frail', ''), toggle('mealsUnreliable', 'Meals unreliable or food insecure', ''), toggle('alcohol', 'Heavy alcohol use', ''), toggle('cantInject', 'Cannot inject (vision, dexterity, no helper)', ''),
        toggle('uninsured', 'Uninsured', 'Shows the $35 programs and the cheapest safe version.'),
        number('weight', 'Weight', 'kg'),
        toggle('onMetformin', 'Currently taking metformin', 'Types B and C.'), toggle('metforminMaxed', 'Metformin already at max tolerated dose', ''), toggle('onSU', 'Currently taking glipizide/glimepiride', ''), toggle('onSGLT2', 'Currently taking an SGLT2 inhibitor', ''),
        toggle('priorInsulin', 'Type B: was on insulin before', 'Routes to the insulin restart branch.'),
        select('dScenario', 'Type D: what is the problem?', [['Select', 0], ['Fasting glucose high, no lows', 1], ['Having lows', 2], ['Cannot afford the insulin', 3], ['Fasting OK, high after meals', 4]]),
        select('insulinKind', 'Type D: current insulin', [['Unknown', 0], ['Basal analog (glargine, detemir, degludec)', 1], ['Basal plus mealtime analogs', 2], ['NPH or regular', 3], ['70/30 premix', 4]]),
        number('currentBasal', 'Current basal dose', 'units'), number('currentMeal', 'Current mealtime dose (per meal)', 'units'),
        select('lowTiming', 'Lows happen', [['Unknown', 0], ['Fasting or overnight', 1], ['After a meal', 2]]),
        number('prednisone', 'Type E: prednisone dose', 'mg'), toggle('steroidMorningOnce', 'Type E: once-daily MORNING prednisone', ''), toggle('shortBurst', 'Type E: short burst and A1c normal', 'Often needs no insulin.'),
    ],
    results: [], thresholdNote: 'Clinician decision support. Withholds on crisis, pregnancy, age under 18, type 1 clues, eGFR under 15 or dialysis. Unsourced conversions are returned as per pharmacy/endocrine.',
    citations: [ADA, LANTUS, 'DailyMed. Glipizide, metformin ER/IR, glimepiride, sitagliptin, pioglitazone and dapagliflozin labels (see consult citations).', 'ClinicalTrials.gov NCT03511521. https://clinicaltrials.gov/study/NCT03511521'], computeResult: computeBridgePlan,
};
export const HYPERGLYCEMIA_CALCULATORS = [HG_PLAN_BUILDER_CALCULATOR, HG_BASAL_START_CALCULATOR, HG_BASAL_TITRATE_CALCULATOR, HG_MEAL_CORRECTION_CALCULATOR];
