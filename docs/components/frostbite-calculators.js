// Frostbite calculators (added 2026-11-09): Cauchy grade, tPA vs iloprost decision, iloprost pump rate.
// Pure logic is exported for tests. Inputs are ephemeral and never persisted.
// Sources: WMS frostbite guideline 2019 (full text) and 2024 update; FDA AURLUMYN (iloprost) label 2024.
const WMS_2019 = 'McIntosh SE, Freer L, Grissom CK, et al. Wilderness Medical Society Clinical Practice Guidelines for the Prevention and Treatment of Frostbite: 2019 Update. Wilderness Environ Med. 2019;30(4S):S19-S32.';
const WMS_2024 = 'McIntosh SE, Freer L, Grissom CK, et al. Wilderness Medical Society Clinical Practice Guidelines for the Prevention and Treatment of Frostbite: 2024 Update. Wilderness Environ Med. 2024;35(2):183-197.';
const LABEL = 'AURLUMYN (iloprost) injection, for intravenous use. Prescribing information. US Food and Drug Administration; 2024.';
/** The guideline's decision, in code: tPA for grade 3+ within 24 h of thaw, iloprost to 72 h or when tPA cannot be given. */
export function reperfusionDecision(i) {
    if (!Number.isFinite(i.grade) || i.grade < 0)
        return 'incomplete';
    if (i.grade <= 1)
        return 'none';
    if (i.hoursSinceThaw === null || !Number.isFinite(i.hoursSinceThaw) || i.hoursSinceThaw < 0)
        return 'incomplete';
    const h = i.hoursSinceThaw;
    if (h > 72)
        return 'late';
    if (i.grade === 2)
        return 'iloprost-consider';
    if (h <= 24 && !i.tpaContraindicated)
        return i.tpaCapable ? 'tpa' : 'transfer';
    return 'iloprost';
}
const CAUCHY_LEVELS = [
    { label: 'No lesion after rewarming', points: 0 },
    { label: 'Distal phalanx only', points: 1 },
    { label: 'Middle phalanx (or proximal phalanx of the thumb / big toe)', points: 2 },
    { label: 'Proximal phalanx (other digits)', points: 3 },
    { label: 'Metacarpal or metatarsal', points: 4 },
    { label: 'Carpal or tarsal', points: 5 },
];
export const FROSTBITE_REPERFUSION_CALCULATOR = {
    id: 'frostbite-reperfusion',
    title: 'Frostbite: tPA vs Iloprost',
    subtitle: 'Reperfusion decision after rewarming',
    description: 'Applies the Wilderness Medical Society windows: tPA for deep frostbite (Cauchy grade 3 or more, at or beyond the PIP joint) within 24 h of thaw; iloprost (a prostacyclin) up to 72 h, or when tPA is contraindicated. Grade the injury after rewarming.',
    fields: [
        {
            name: 'grade', label: 'Cauchy grade (most proximal level of the lesion)', type: 'select', points: 0, hideOptionPoints: true,
            selectOptions: [{ label: 'Not yet graded', points: -1 }, ...CAUCHY_LEVELS.map((o) => ({ label: `${o.points}: ${o.label}`, points: o.points }))],
        },
        {
            name: 'hours', label: 'Time since thaw', type: 'select', points: 0, hideOptionPoints: true,
            description: 'Since the tissue thawed (in the field or in the ED)',
            selectOptions: [
                { label: 'Not yet entered', points: -1 },
                { label: 'Under 12 h', points: 6 },
                { label: '12 to 24 h', points: 18 },
                { label: '24 to 72 h', points: 48 },
                { label: 'More than 72 h', points: 96 },
            ],
        },
        { name: 'contra', label: 'Bleeding contraindication to tPA', description: 'Intracranial hemorrhage (e.g. subdural hematoma), active bleeding, major trauma, recent surgery', type: 'toggle', points: 1 },
        { name: 'capable', label: 'ICU and angiography or technetium scan available here', type: 'toggle', points: 1 },
    ],
    results: [],
    thresholdNote: 'Each hour of delay to thrombolysis lowers salvage by about 28%; best within 12 h of thaw. Iloprost dosing: see the Iloprost Rate calculator.',
    citations: [WMS_2019, WMS_2024, LABEL],
    computeResult: (values) => {
        const grade = values['grade'] ?? -1;
        const raw = values['hours'] ?? -1;
        const hours = raw < 0 ? null : raw;
        const d = reperfusionDecision({ grade, hoursSinceThaw: hours, tpaContraindicated: (values['contra'] || 0) > 0, tpaCapable: (values['capable'] || 0) > 0 });
        const map = {
            incomplete: { value: '--', label: 'Enter the grade and hours since thaw', description: 'Grade the injury after rewarming, then enter the hours since the tissue thawed.', colorVar: '--color-text-muted' },
            none: { value: 'No reperfusion drug', label: 'Superficial (grade 0-1)', description: 'Supportive care: ibuprofen, analgesia, elevation, blister care. Re-grade if cyanosis persists or spreads.', colorVar: '--color-primary' },
            'iloprost-consider': { value: 'Consider iloprost', label: 'Grade 2, within 72 h', description: 'tPA is not indicated at this depth. The WMS 2024 update extends iloprost to grade 2-4 within 72 h of injury; the trial enrolled grade 3-4, so benefit at grade 2 is extrapolated.', colorVar: '--color-warning' },
            tpa: { value: 'tPA now', label: 'Deep frostbite within 24 h of thaw', description: 'Alteplase 3 mg bolus then 1 mg/h (IV or intra-arterial) with heparin 500 units/h, in an ICU with angiography or technetium scanning. Start as soon as possible.', colorVar: '--color-danger' },
            transfer: { value: 'Transfer for tPA', label: 'Within 24 h, no capability here', description: 'Transfer to a burn, frostbite or vascular centre if tPA can start within 24 h of thaw. If transfer will miss the window, start iloprost here if available.', colorVar: '--color-danger' },
            iloprost: { value: 'Iloprost', label: (values['contra'] || 0) > 0 ? 'tPA contraindicated, within 72 h' : 'Past the 24 h tPA window, within 72 h', description: 'Iloprost IV 0.5 ng/kg/min, up 0.5 every 30 min to a maximum of 2 ng/kg/min, 6 h a day for up to 8 days. Correct hypotension first and monitor blood pressure.', colorVar: '--color-danger' },
            late: { value: 'No proven drug', label: 'More than 72 h', description: 'Past the studied windows. Supportive and wound care, imaging to map viable tissue, and referral to a frostbite-experienced surgeon.', colorVar: '--color-text-muted' },
        };
        return map[d];
    },
};
// ---------------------------------------------------------------------------
// Cauchy grade
// ---------------------------------------------------------------------------
export const FROSTBITE_CAUCHY_CALCULATOR = {
    id: 'frostbite-cauchy',
    title: 'Frostbite: Cauchy Grade',
    subtitle: 'Severity by anatomic level after rewarming',
    description: 'Choose the most proximal level the lesion (persistent cyanosis) reaches after rewarming. Higher grades mean more proximal injury and a greater risk of functionally important amputation. Not formally validated, but correlates well with bone scans and outcomes.',
    fields: [
        { name: 'level', label: 'Most proximal level of the lesion', type: 'select', points: 0, hideOptionPoints: true, selectOptions: CAUCHY_LEVELS },
    ],
    results: [],
    thresholdNote: 'Grade after rewarming, not before. Hemorrhagic blisters also signal deep injury.',
    citations: [WMS_2019, WMS_2024],
    computeResult: (values) => {
        const g = values['level'] ?? 0;
        if (g <= 1)
            return { value: `Grade ${g}`, label: g === 0 ? 'No lesion' : 'Distal phalanx', description: 'No reperfusion drug indicated. Supportive and blister care.', colorVar: '--color-primary' };
        if (g === 2)
            return { value: 'Grade 2', label: 'Middle phalanx', description: 'Deep injury short of the proximal phalanx. No tPA. Consider iloprost within 72 h of injury (WMS 2024).', colorVar: '--color-warning' };
        return { value: `Grade ${g}`, label: g === 3 ? 'Proximal phalanx' : g === 4 ? 'Metacarpal / metatarsal' : 'Carpal / tarsal', description: 'Deep frostbite, time-critical: tPA within 24 h of thaw if no contraindication, otherwise iloprost up to 72 h. Use the tPA vs Iloprost calculator.', colorVar: '--color-danger' };
    },
};
// ---------------------------------------------------------------------------
// Iloprost pump rate
// ---------------------------------------------------------------------------
/** FDA label: 1 mL (100 mcg) in 100 mL 0.9% NaCl = 1,000 ng/mL. */
export const ILOPROST_NG_PER_ML = 1000;
export const ILOPROST_STEPS = [0.25, 0.5, 1, 1.5, 2];
/** mL/h = dose (ng/kg/min) x weight (kg) x 60 / 1,000 ng/mL. Null when inputs are invalid or above the 2 ng/kg/min maximum. */
export function iloprostRate(doseNgKgMin, weightKg) {
    if (!Number.isFinite(doseNgKgMin) || doseNgKgMin <= 0 || doseNgKgMin > 2)
        return null;
    if (!Number.isFinite(weightKg) || weightKg <= 0)
        return null;
    return (doseNgKgMin * weightKg * 60) / ILOPROST_NG_PER_ML;
}
export const FROSTBITE_ILOPROST_RATE_CALCULATOR = {
    id: 'frostbite-iloprost-rate',
    title: 'Iloprost Infusion Rate (Frostbite)',
    subtitle: 'AURLUMYN pump rate by weight and dose',
    description: 'Label preparation: 1 mL (100 mcg) iloprost into 100 mL 0.9% sodium chloride = 1,000 ng/mL. Rate (mL/h) = dose (ng/kg/min) x weight (kg) x 60 / 1,000. Start 0.5 ng/kg/min and increase by 0.5 every 30 min as tolerated to a maximum of 2 ng/kg/min; 6 hours a day for up to 8 days.',
    fields: [
        { name: 'weight', label: 'Weight', type: 'number', points: 0, valueIsPoints: true, unit: 'kg' },
        {
            name: 'dose', label: 'Dose', type: 'select', points: 0, hideOptionPoints: true,
            selectOptions: [
                { label: '0.5 ng/kg/min (usual start)', points: 50 },
                { label: '0.25 ng/kg/min (Child-Pugh B/C start, or not tolerating 0.5)', points: 25 },
                { label: '1 ng/kg/min', points: 100 },
                { label: '1.5 ng/kg/min', points: 150 },
                { label: '2 ng/kg/min (maximum)', points: 200 },
            ],
        },
    ],
    results: [],
    thresholdNote: 'Correct hypotension before starting and monitor blood pressure. Use a pump that delivers 0.1 mL/h steps and a 0.2-0.22 micron in-line filter. Never bolus or flush the line.',
    citations: [LABEL],
    computeResult: (values) => {
        const w = values['weight'] || 0;
        const dose = (values['dose'] || 50) / 100;
        const rate = iloprostRate(dose, w);
        if (rate === null)
            return { value: '--', label: 'Enter weight', description: 'Enter the patient weight in kg.', colorVar: '--color-text-muted' };
        const r1 = (n) => (Math.round(n * 10) / 10).toFixed(1);
        const table = ILOPROST_STEPS.map((d) => `${d} ng/kg/min: ${r1(iloprostRate(d, w))} mL/h`).join('\n');
        return {
            value: `${r1(rate)} mL/h`,
            label: `${dose} ng/kg/min at ${w} kg`,
            description: `**Titration steps (every 30 min as tolerated):**\n${table}\n\nConcentration 1,000 ng/mL. Each later day, start at the dose tolerated the day before.`,
            colorVar: '--color-primary',
        };
    },
};
