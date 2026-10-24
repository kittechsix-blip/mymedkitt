const positiveFinite = (value) => typeof value === 'number' && Number.isFinite(value) && value > 0;
export function calculateInhPyridoxine(input) {
    if (input.patient !== 'adult' && input.patient !== 'child')
        return null;
    if (input.exposure !== 'known' && input.exposure !== 'unknown')
        return null;
    if (input.patient === 'child' && !positiveFinite(input.weightKg))
        return null;
    if (input.exposure === 'known' && !positiveFinite(input.inhMg))
        return null;
    const limit = input.patient === 'child' ? Math.min(70 * input.weightKg, 5000) : 5000;
    const requested = input.exposure === 'known' ? input.inhMg : limit;
    const mg = Math.min(requested, limit);
    return { mg, grams: mg / 1000, capped: requested > limit };
}
/** Structural compatibility with CalculatorDefinition, without importing the UI. */
export const INH_PYRIDOXINE_CALCULATOR = {
    id: 'inh-pyridoxine',
    title: 'INH: Pyridoxine',
    subtitle: 'Initial IV antidote dose',
    description: 'For acute isoniazid poisoning. Select the patient group and whether the ingested amount is known. Give benzodiazepines concurrently for seizures; involve Poison Control and pharmacy immediately.',
    fields: [
        { name: 'patient', label: 'Patient group', type: 'select', points: 0, hideOptionPoints: true,
            selectOptions: [{ label: 'Select patient group', points: 0 }, { label: 'Adult', points: 1 }, { label: 'Child', points: 2 }] },
        { name: 'exposure', label: 'Ingested INH amount', type: 'select', points: 0, hideOptionPoints: true,
            selectOptions: [{ label: 'Select known or unknown', points: 0 }, { label: 'Known amount', points: 1 }, { label: 'Unknown amount', points: 2 }] },
        { name: 'inhMg', label: 'INH ingested', type: 'number', points: 0, unit: 'mg',
            description: 'Required only for known ingestion. Enter milligrams: 1 g = 1000 mg. Do not enter tablet count.' },
        { name: 'weightKg', label: 'Child weight', type: 'number', points: 0, unit: 'kg',
            description: 'Required for children. Not used for the adult initial-dose calculation.' },
    ],
    results: [],
    thresholdNote: 'Initial-dose cap, not a cumulative ceiling. Persistent or recurrent seizures may require additional pyridoxine with a toxicologist. Do not delay treatment while seeking an exact ingestion amount.',
    citations: [
        'Queensland Poisons Information Centre. Pyridoxine. https://www.poisonsinfo.health.qld.gov.au/for-health-professionals/antidote-stocking-recommendations/pyridoxine',
        'CIUSSS de la Capitale-Nationale. Pyridoxine antidote guide. https://www.ciusss-capitalenationale.gouv.qc.ca/en/antidotes/pyridoxine',
    ],
    computeResult(values) {
        const invalid = { value: '—', label: 'Complete required inputs', colorVar: '--color-warning',
            description: '**INPUTS REQUIRED**\n\nSelect adult or child and known or unknown exposure. A known ingestion requires a positive INH amount in mg; a child requires a positive weight in kg. No dose is calculated from missing or invalid inputs.' };
        if (![1, 2].includes(values.patient) || ![1, 2].includes(values.exposure))
            return invalid;
        const dose = calculateInhPyridoxine({ patient: values.patient === 1 ? 'adult' : 'child',
            exposure: values.exposure === 1 ? 'known' : 'unknown', inhMg: values.inhMg, weightKg: values.weightKg });
        if (!dose)
            return invalid;
        const format = (n) => n.toLocaleString('en-US', { maximumFractionDigits: 6 });
        return {
            value: `${format(dose.mg)} mg (${format(dose.grams)} g)`,
            label: 'Initial IV pyridoxine',
            colorVar: '--color-danger',
            description: '**INITIAL DOSE**\n\n' + (values.exposure === 1
                ? 'Match ingested INH milligram for milligram, limited initially to 5 g in adults or the lower of 70 mg/kg and 5 g in children.'
                : 'Unknown ingestion: 5 g in adults; 70 mg/kg in children, initially capped at 5 g.')
                + (dose.capped ? ' This result is limited by the initial-dose cap.' : '')
                + '\n\n**ADMINISTRATION**\n\nGive IV at 500 mg/min (0.5 g/min) while seizures continue. If seizures stop before completion, give the remainder over 1–2 hours. Verify the available concentration and preparation with pharmacy; this calculator does not calculate volume.'
                + '\n\n**REASSESS**\n\nContinue airway support and benzodiazepines. The initial cap is not a cumulative ceiling. Persistent or recurrent seizures require urgent toxicologist-guided reassessment and possible repeat pyridoxine.',
        };
    },
};
