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
    description: '**NAMED REGIMEN ONLY**\n\nChoose a fixed U-100 glargine regimen. Dose-per-kg values are locked. Confirm clinical eligibility and follow-up before using the candidate dose.',
    fields: [
        select('regimen', 'U-100 glargine starting regimen', [['Select regimen', 0], ['Glargine U-100: fixed 10 units once daily', 1], ['Glargine U-100: 0.1 unit/kg once daily', 2], ['Glargine U-100: 0.2 unit/kg once daily', 3]]),
        number('weight', 'Measured weight (required for weight-based regimen)', 'kg'),
        toggle('safetyConfirmed', 'Clinician safety screen complete', basalSafety),
        toggle('insulinNaiveConfirmed', 'Confirmed insulin-naive', 'No existing insulin regimen. Medication history is known and reconciled; this tool cannot convert or restart an uncertain regimen.'),
    ], results: [], thresholdNote: 'Clinician decision support only. Whole units are rounded down. No glucose target or maximum dose is inferred.', citations: [ADA, LANTUS], computeResult: computeBasalStart,
};
export const HG_BASAL_TITRATE_CALCULATOR = {
    id: 'hg-basal-titrate', title: 'Basal Insulin Titration', subtitle: 'Established once-daily U-100 glargine, adult type 2 diabetes',
    description: '**INDIVIDUALIZED FASTING GOAL**\n\nEnter three consecutive fasting readings on the same dose and the clinician-set upper target. Any hypoglycemia overrides routine escalation.',
    fields: [number('currentDose', 'Current once-daily U-100 glargine dose', 'units'), number('fasting1', 'Fasting glucose: day 1', 'mg/dL'), number('fasting2', 'Fasting glucose: day 2', 'mg/dL'), number('fasting3', 'Fasting glucose: day 3', 'mg/dL'), number('target', 'Clinician-selected fasting upper target', 'mg/dL', 'Required individualized goal; no default.'), toggle('hypoglycemia', 'Any hypoglycemia since the last change', 'Include symptomatic episodes, overnight events and any glucose below 70 mg/dL.'), toggle('glargineConfirmed', 'Current U-100 glargine dose reconciled', 'Confirmed once-daily glargine U-100, no missed/duplicate doses or insulin switching.'), toggle('threeDaysConfirmed', 'At least three days since last dose change', 'All three readings are from this unchanged dose; hypoglycemia requires review sooner.'), toggle('safetyConfirmed', 'Clinician safety and follow-up screen complete', basalSafety)],
    results: [], thresholdNote: 'All above target: consider +2 units after clinician review. Mixed readings: no automatic increase. Hypoglycemia: consider 10–20% reduction after cause review; no definitive reduced dose is generated.', citations: [ADA, LANTUS], computeResult: computeBasalTitrate,
};
export const HG_MEAL_CORRECTION_CALCULATOR = {
    id: 'hg-meal-correction', title: 'Meal + Correction Insulin', subtitle: 'Established individualized U-100 rapid-acting injection plan',
    description: '**EXISTING RATIOS ONLY**\n\nArithmetic for a meal using prescribed ICR, ISF and target. No default ratio, target, food carbohydrate estimate or insulin-on-board model. Not for a new insulin regimen or correction-only dosing.',
    fields: [select('insulin', 'Rapid-acting U-100 insulin', [['Select insulin', 0], ['Insulin lispro U-100', 1], ['Insulin aspart U-100', 2]]), select('ratioSource', 'Verified source of ICR, ISF and target', [['Unknown / not confirmed', 0], ['Current written clinician-prescribed plan reviewed', 1], ['Prescribing diabetes clinician directly confirmed plan', 2]]), number('glucose', 'Current glucose', 'mg/dL'), number('carbs', 'Confirmed carbohydrate content of meal', 'g', 'Use a verified label or patient-specific count; meal must be available and tolerated.'), number('icr', 'Established insulin-to-carbohydrate ratio', 'g/unit'), number('isf', 'Established insulin sensitivity factor', 'mg/dL/unit'), number('target', 'Individualized correction target', 'mg/dL'), number('hoursSinceBolus', 'Known hours since last rapid-acting bolus', 'hours', 'At least four hours AND no active bolus confirmed; elapsed time alone is insufficient.'), toggle('hypoglycemia', 'Hypoglycemia present', 'Current symptoms or documented low glucose requires treatment and reassessment first.'), toggle('noActiveBolusConfirmed', 'Clinician confirms no active bolus insulin', 'Last bolus timing and regimen reviewed; no residual/unknown insulin on board and no recent extra corrections.'), toggle('crisisExcluded', 'DKA/HHS and acute metabolic deterioration excluded', 'Separate clinical assessment; neither a normal nor an elevated glucose number alone determines crisis status.'), toggle('safetyConfirmed', 'Clinician confirms established-plan safety', 'Adult, nonpregnant patient on a known injection regimen; no pump/AID, premixed or concentrated insulin plan, falling glucose, vomiting, AKI, inability to eat, hypoglycemia or insulin allergy. Ratios, target, food, dose timing and monitoring plan reviewed.')],
    results: [], thresholdNote: 'Meal/carbohydrate ratio plus positive correction only; floor the combined result to whole units. Unknown active insulin, incomplete ratios or absent safety confirmations withhold the dose.', citations: [ADA], computeResult: computeMealCorrection,
};
export const HYPERGLYCEMIA_CALCULATORS = [HG_BASAL_START_CALCULATOR, HG_BASAL_TITRATE_CALCULATOR, HG_MEAL_CORRECTION_CALCULATOR];
