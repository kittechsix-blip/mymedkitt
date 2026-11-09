// Adrogué-Madias: predicted change in serum sodium from an IV fluid (added 2026-11-09).
// Pure math is exported for tests. Inputs are ephemeral and never persisted.
//
// Formula (Adrogué & Madias, NEJM 2000): change in Na after 1 L =
//   (infusate Na + infusate K - serum Na) / (TBW + 1)
// For a volume V liters the same mixing logic gives V x (infusate - serum) / (TBW + V); at V = 1 this is the
// published formula. The 24-hour limits come from the sodium consult itself (10 mEq/L, 8 for high ODS risk;
// 10 for chronic hypernatremia), so the calculator never states a different number from the consult.
/** TBW fractions, Adrogué & Madias NEJM 2000 (children and non-elderly men 0.6, women 0.5, elderly men 0.5, elderly women 0.45). */
export const TBW_FACTORS = { child: 0.6, man: 0.6, woman: 0.5, olderMan: 0.5, olderWoman: 0.45 };
/** Sodium + potassium (mEq/L) in common fluids. LR and Plasma-Lyte include their potassium. */
export const FLUIDS = {
    hypertonic3: 513,
    ns: 154,
    plasmaLyte: 145, // Na 140 + K 5
    lr: 134, // Na 130 + K 4
    halfNs: 77,
    d5w: 0,
};
export function totalBodyWater(weightKg, tbwFactor) {
    if (!Number.isFinite(weightKg) || weightKg <= 0 || !Number.isFinite(tbwFactor) || tbwFactor <= 0)
        return null;
    return weightKg * tbwFactor;
}
/** Predicted change in serum Na (mEq/L) after `liters` of the fluid. Null when inputs are invalid. */
export function sodiumChange(input, liters = 1) {
    const tbw = totalBodyWater(input.weightKg, input.tbwFactor);
    if (tbw === null || !Number.isFinite(input.serumNa) || input.serumNa <= 0)
        return null;
    if (!Number.isFinite(liters) || liters <= 0)
        return null;
    const infusate = input.fluidNaK + (input.addedK || 0);
    return (liters * (infusate - input.serumNa)) / (tbw + liters);
}
/** Liters that move Na by `limit` mEq/L in the fluid's direction; null if the fluid cannot get there. */
export function litersToLimit(input, limit) {
    const tbw = totalBodyWater(input.weightKg, input.tbwFactor);
    if (tbw === null || !Number.isFinite(limit) || limit <= 0)
        return null;
    const gap = Math.abs(input.fluidNaK + (input.addedK || 0) - input.serumNa);
    if (gap <= limit)
        return null; // even unlimited volume of this fluid cannot move Na that far
    return (limit * tbw) / (gap - limit);
}
const r1 = (n) => Math.round(n * 10) / 10;
const signed = (n) => `${n >= 0 ? '+' : '−'}${Math.abs(r1(n))}`;
export const ADROGUE_MADIAS_CALCULATOR = {
    id: 'adrogue-madias',
    title: 'Sodium Change per Liter (Adrogué-Madias)',
    subtitle: 'How far a bag of IV fluid will move the serum sodium',
    description: 'Predicts the change in serum sodium from one liter of a chosen fluid: (infusate Na + K − serum Na) ÷ (TBW + 1). Also shows the effect of a planned volume and the volume that reaches the 24-hour correction limit. An estimate only: it ignores urine output.',
    fields: [
        { name: 'serum-na', label: 'Serum Sodium', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L', description: 'Current serum sodium' },
        { name: 'weight', label: 'Weight', type: 'number', points: 0, valueIsPoints: true, unit: 'kg', description: 'Patient weight in kilograms' },
        {
            name: 'tbw', label: 'Patient (TBW fraction)', type: 'select', points: 0, hideOptionPoints: true,
            description: 'Total body water = weight × fraction',
            selectOptions: [
                { label: 'Adult man (0.6)', points: 60 },
                { label: 'Adult woman (0.5)', points: 50 },
                { label: 'Older man, 65+ (0.5)', points: 50 },
                { label: 'Older woman, 65+ (0.45)', points: 45 },
                { label: 'Child (0.6)', points: 60 },
            ],
        },
        {
            name: 'fluid', label: 'Fluid', type: 'select', points: 0, hideOptionPoints: true,
            description: 'Sodium + potassium per liter',
            selectOptions: [
                { label: '3% saline (Na 513)', points: FLUIDS.hypertonic3 },
                { label: '0.9% saline (Na 154)', points: FLUIDS.ns },
                { label: 'Plasma-Lyte (Na 140 + K 5)', points: FLUIDS.plasmaLyte },
                { label: "Lactated Ringer's (Na 130 + K 4)", points: FLUIDS.lr },
                { label: '0.45% saline (Na 77)', points: FLUIDS.halfNs },
                { label: 'D5W (Na 0)', points: FLUIDS.d5w },
            ],
        },
        { name: 'added-k', label: 'Added Potassium (optional)', type: 'number', points: 0, valueIsPoints: true, unit: 'mEq/L', description: 'KCl added per liter; potassium counts like sodium' },
        { name: 'volume', label: 'Planned Volume (optional)', type: 'number', points: 0, valueIsPoints: true, unit: 'mL', description: 'For example 100 for one 3% bolus' },
        {
            name: 'limit', label: '24-Hour Limit', type: 'select', points: 0, hideOptionPoints: true,
            description: 'From this consult’s correction limits',
            selectOptions: [
                { label: 'Hyponatremia, standard risk: 10 mEq/L', points: 10 },
                { label: 'Hyponatremia, high ODS risk: 8 mEq/L', points: 8 },
                { label: 'Chronic hypernatremia: 10 mEq/L', points: 10 },
            ],
        },
    ],
    results: [],
    thresholdNote: 'Estimate only. The formula treats the body as a closed system and ignores urine. The dangerous overcorrections usually come from a water diuresis once the ADH stimulus goes away (volume repletion, stopping a thiazide, treating nausea or pain), so sodium can rise much faster than predicted. Recheck Na+ every 2 hours during active correction and follow urine output.',
    citations: [
        'Adrogué HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342(21):1581-1589.',
        'Adrogué HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342(20):1493-1499.',
        'Mohmand HK, Issa D, Ahmad Z, et al. Hypertonic saline for hyponatremia: risk of inadvertent overcorrection. Clin J Am Soc Nephrol. 2007;2(6):1110-1117.',
    ],
    computeResult: (values) => {
        const input = {
            serumNa: values['serum-na'] || 0,
            weightKg: values['weight'] || 0,
            tbwFactor: (values['tbw'] || 60) / 100,
            fluidNaK: values['fluid'] ?? FLUIDS.hypertonic3,
            addedK: values['added-k'] || 0,
        };
        const limit = values['limit'] || 10;
        const perLiter = sodiumChange(input, 1);
        if (perLiter === null) {
            return { value: '--', label: 'Enter values', description: 'Enter serum sodium and weight to estimate the change.', colorVar: '--color-text-muted' };
        }
        const tbw = totalBodyWater(input.weightKg, input.tbwFactor);
        const per100 = sodiumChange(input, 0.1);
        const direction = perLiter >= 0 ? 'rise' : 'fall';
        const toLimit = litersToLimit(input, limit);
        const mL = values['volume'] || 0;
        const planned = mL > 0 ? sodiumChange(input, mL / 1000) : null;
        let label = `${direction === 'rise' ? 'Raises' : 'Lowers'} Na per liter`;
        let colorVar = '--color-primary';
        if (planned !== null) {
            const size = Math.abs(planned);
            label = size > limit ? `Planned volume exceeds the ${limit} mEq/L limit` : size > 0.75 * limit ? 'Planned volume is close to the limit' : 'Planned volume within the limit';
            colorVar = size > limit ? '--color-danger' : size > 0.75 * limit ? '--color-warning' : '--color-primary';
        }
        const lines = [
            `**TOTAL BODY WATER:** ${r1(tbw)} L (${input.weightKg} kg × ${input.tbwFactor})`,
            `**PER LITER:** ${signed(perLiter)} mEq/L`,
            `**PER 100 mL:** ${signed(per100)} mEq/L`,
        ];
        if (planned !== null)
            lines.push(`**PLANNED ${mL} mL:** ${signed(planned)} mEq/L → predicted Na ${r1(input.serumNa + planned)} mEq/L`);
        lines.push(toLimit !== null
            ? `**VOLUME TO REACH THE ${limit} mEq/L LIMIT:** about ${Math.round(toLimit * 1000)} mL of this fluid, if nothing else changed`
            : `**${limit} mEq/L LIMIT:** this fluid cannot move Na that far on its own`);
        lines.push('**CAUTION:** ignores urine output. A water diuresis can raise Na far faster than predicted; recheck Na+ every 2 hours during active correction.');
        return { value: `${signed(perLiter)} mEq/L per L`, label, description: lines.join('\n\n'), colorVar };
    },
};
