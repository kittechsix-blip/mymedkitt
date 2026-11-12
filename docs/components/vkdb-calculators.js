// Vitamin K deficiency bleeding (VKDB) calculators (added 2026-11-11): type and risk, infant bleeding lab pattern, VKDB doses.
// Pure logic is exported for tests. Inputs are ephemeral and never persisted.
// Sources: AAP clinical report 2022 (Hand, Noble, Abrams), Shearer Blood Rev 2009, BSH transfusion guideline for neonates and children 2016, phytonadione FDA label.
const AAP = 'Hand I, Noble L, Abrams SA. Vitamin K and the newborn infant. Pediatrics. 2022;149(3):e2021056036.';
const SHEARER = 'Shearer MJ. Vitamin K deficiency bleeding (VKDB) in early infancy. Blood Rev. 2009;23(2):49-59.';
const BSH = 'New HV, Berryman J, Bolton-Maggs PHB, et al. Guidelines on transfusion for fetuses, neonates and older children. Br J Haematol. 2016;175(5):784-828.';
const LABEL = 'Phytonadione injectable emulsion (Vitamin K1 Injection). Prescribing information. Pfizer (Hospira).';
const CDC = 'Centers for Disease Control and Prevention. Notes from the field: late vitamin K deficiency bleeding in infants whose parents declined vitamin K prophylaxis — Tennessee, 2013. MMWR Morb Mortal Wkly Rep. 2013;62(45):901-902.';
export function vkdbType(age) {
    if (age === 0)
        return 'early';
    if (age === 1)
        return 'classic';
    if (age === 2)
        return 'late';
    if (age === 3)
        return 'outside';
    return 'incomplete';
}
export function vkdbLikelihood(i) {
    const t = vkdbType(i.age);
    const acquired = i.cholestasis || i.malabsorption;
    if (t === 'early')
        return i.maternalDrugs ? 'high' : 'possible';
    if (t === 'outside')
        return acquired ? 'possible' : 'low';
    // classic and late
    if (i.vitK === 0)
        return acquired ? 'possible' : 'low';
    if (i.vitK === 1)
        return acquired || i.breastfed ? 'high' : 'possible';
    // none, declined or unknown
    return 'high';
}
export const VKDB_TYPE_RISK_CALCULATOR = {
    id: 'vkdb-type-risk',
    title: 'VKDB Type and Risk',
    subtitle: 'Bleeding infant: how likely is vitamin K deficiency?',
    description: 'Classifies vitamin K deficiency bleeding by age at onset (early: first 24 h; classic: days 2-7; late: 2 weeks to 6 months, most often 3-8 weeks) and weighs the main risk factors: no vitamin K at birth, exclusive breastfeeding, cholestasis or malabsorption, and maternal drugs that block vitamin K. If a bleeding infant may have VKDB, give vitamin K now; do not wait for this or for labs.',
    fields: [
        {
            name: 'age', label: 'Age when bleeding started', type: 'select', points: 0, hideOptionPoints: true,
            selectOptions: [
                { label: 'Not entered', points: -1 },
                { label: 'First 24 hours', points: 0 },
                { label: 'Day 2 to 7', points: 1 },
                { label: '8 days to 6 months', points: 2 },
                { label: 'Over 6 months', points: 3 },
            ],
        },
        {
            name: 'vitk', label: 'Vitamin K at birth', type: 'select', points: 0, hideOptionPoints: true,
            selectOptions: [
                { label: 'Unknown', points: 3 },
                { label: 'IM injection given', points: 0 },
                { label: 'Oral doses only', points: 1 },
                { label: 'None (declined or home birth)', points: 2 },
            ],
        },
        { name: 'breastfed', label: 'Exclusively breastfed', type: 'toggle', points: 1 },
        { name: 'maternal', label: 'Mother took anticonvulsants, warfarin, rifampin or isoniazid in pregnancy', type: 'toggle', points: 1 },
        { name: 'cholestasis', label: 'Signs of cholestasis', description: 'Jaundice past 2 weeks, pale stools, dark urine, raised conjugated bilirubin', type: 'toggle', points: 1 },
        { name: 'malabs', label: 'Malabsorption or prolonged antibiotics', description: 'Cystic fibrosis, chronic diarrhea, celiac, alpha-1 antitrypsin deficiency', type: 'toggle', points: 1 },
    ],
    results: [],
    thresholdNote: 'Without the birth injection, late VKDB is estimated to be 81 times more likely, and 30-60% of late cases present as intracranial hemorrhage. Warning bleeds (umbilical oozing, bruising, blood in stool, oozing after a heel stick) often come first.',
    citations: [AAP, SHEARER, CDC],
    computeResult: (values) => {
        const input = {
            age: values['age'] ?? -1,
            vitK: values['vitk'] ?? 3,
            breastfed: (values['breastfed'] || 0) > 0,
            maternalDrugs: (values['maternal'] || 0) > 0,
            cholestasis: (values['cholestasis'] || 0) > 0,
            malabsorption: (values['malabs'] || 0) > 0,
        };
        const t = vkdbType(input.age);
        if (t === 'incomplete')
            return { value: '--', label: 'Enter the age when bleeding started', description: 'Age at onset sets the VKDB type.', colorVar: '--color-text-muted' };
        const l = vkdbLikelihood(input);
        const typeText = {
            early: 'Early VKDB (first 24 h): usually maternal drugs that cross the placenta. Bleeding can be severe (scalp, intracranial, intra-abdominal).',
            classic: 'Classic VKDB (days 2-7): gut, umbilical stump, circumcision or heel-stick bleeding in a baby who had no vitamin K.',
            late: 'Late VKDB (2 weeks to 6 months, peak 3-8 weeks): 30-60% present with intracranial hemorrhage. Often unmasks hidden cholestasis.',
            outside: 'Beyond the usual VKDB window. Consider malabsorption, liver disease, antibiotics or warfarin/rodenticide ingestion.',
        };
        const work = '\n\n**Now:** PT/INR, PTT, CBC with platelets, fibrinogen, conjugated bilirubin and liver tests, type and crossmatch. Send PIVKA-II before vitamin K if possible, but never delay treatment.';
        const chole = input.cholestasis ? '\n\n**Cholestasis:** check for biliary atresia urgently (conjugated bilirubin, ultrasound, GI). Early surgery changes outcome.' : '';
        const label = { early: 'Early VKDB', classic: 'Classic VKDB', late: 'Late VKDB', outside: 'Older than 6 months' }[t];
        if (l === 'high')
            return { value: 'VKDB likely', label, description: `${typeText[t]}${work}${chole}\n\n**Give vitamin K now** if bleeding. Any lethargy, vomiting, seizure or bulging fontanelle: head CT.`, colorVar: '--color-danger' };
        if (l === 'possible')
            return { value: 'VKDB possible', label, description: `${typeText[t]}${work}${chole}`, colorVar: '--color-warning' };
        return { value: 'VKDB unlikely', label, description: `${input.vitK === 0 ? 'The IM injection at birth makes VKDB rare. ' : ''}${typeText[t]} Look for another cause: thrombocytopenia, hemophilia, liver disease, DIC, or inflicted injury.${work}`, colorVar: '--color-primary' };
    },
};
export function bleedPattern(l) {
    if (l.ptLong < 0 || l.pttLong < 0 || l.pltLow < 0)
        return 'incomplete';
    if (l.pltLow === 1 && (l.ptLong === 1 || l.fibLow === 1))
        return 'dic';
    if (l.ptLong === 1 && l.pltLow === 0 && l.fibLow !== 1)
        return 'vkdb';
    if (l.ptLong === 0 && l.pttLong === 1 && l.pltLow === 0)
        return 'factor-viii-ix';
    if (l.pltLow === 1 && l.ptLong === 0 && l.pttLong === 0)
        return 'platelets';
    if (l.ptLong === 0 && l.pttLong === 0 && l.pltLow === 0 && l.fibLow !== 1)
        return 'normal';
    return 'mixed';
}
const TRI = (yes, no) => [
    { label: 'Not sent', points: -1 },
    { label: yes, points: 1 },
    { label: no, points: 0 },
];
export const VKDB_LAB_PATTERN_CALCULATOR = {
    id: 'vkdb-lab-pattern',
    title: 'Infant Bleeding Lab Pattern',
    subtitle: 'PT, PTT, platelets, fibrinogen → likely cause',
    description: 'Reads the basic coagulation screen in a bleeding infant. Use age-specific reference ranges: PT and PTT run longer in newborns. VKDB classically gives a markedly prolonged PT/INR (PTT often prolonged too) with normal platelets and fibrinogen, and the PT corrects within hours of vitamin K.',
    fields: [
        { name: 'pt', label: 'PT / INR', type: 'select', points: 0, hideOptionPoints: true, selectOptions: TRI('Prolonged for age', 'Normal for age') },
        { name: 'ptt', label: 'PTT', type: 'select', points: 0, hideOptionPoints: true, selectOptions: TRI('Prolonged for age', 'Normal for age') },
        { name: 'plt', label: 'Platelets', type: 'select', points: 0, hideOptionPoints: true, selectOptions: TRI('Low (under 150,000)', 'Normal') },
        { name: 'fib', label: 'Fibrinogen', type: 'select', points: 0, hideOptionPoints: true, selectOptions: TRI('Low', 'Normal') },
    ],
    results: [],
    thresholdNote: 'A normal screen does not explain an intracranial hemorrhage in an infant: evaluate for inflicted injury. A prolonged INR does not exclude it either.',
    citations: [SHEARER, AAP, BSH],
    computeResult: (values) => {
        const p = bleedPattern({ ptLong: values['pt'] ?? -1, pttLong: values['ptt'] ?? -1, pltLow: values['plt'] ?? -1, fibLow: values['fib'] ?? -1 });
        const map = {
            incomplete: { value: '--', label: 'Enter PT, PTT and platelets', description: 'Fibrinogen is optional but helps separate DIC.', colorVar: '--color-text-muted' },
            vkdb: { value: 'Fits VKDB', label: 'Prolonged PT, normal platelets', description: 'Vitamin K deficiency (or liver disease). Give vitamin K: a PT that corrects within hours confirms VKDB. If it does not correct, think liver failure. Check conjugated bilirubin for cholestasis.', colorVar: '--color-danger' },
            dic: { value: 'Think DIC', label: 'Low platelets with prolonged PT or low fibrinogen', description: 'Consumptive coagulopathy: sepsis, asphyxia, necrotizing enterocolitis, severe liver failure. Treat the cause; replace with plasma, cryoprecipitate and platelets as bleeding requires. Vitamin K is still reasonable.', colorVar: '--color-danger' },
            'factor-viii-ix': { value: 'Think hemophilia', label: 'Isolated prolonged PTT', description: 'Factor VIII or IX deficiency (hemophilia A or B; ask about family history in males), or heparin in the sample. Send factor VIII and IX levels and involve hematology. Vitamin K will not correct it.', colorVar: '--color-warning' },
            platelets: { value: 'Thrombocytopenia', label: 'Low platelets only', description: 'Newborn: neonatal alloimmune thrombocytopenia (NAIT), maternal ITP, infection. Older infant: ITP, infection, marrow. Severe NAIT can cause intracranial hemorrhage.', colorVar: '--color-warning' },
            normal: { value: 'Screen normal', label: 'No coagulopathy on screen', description: 'VKDB is very unlikely. Bruising or intracranial bleeding with a normal screen needs an inflicted-injury evaluation. Rare causes (factor XIII deficiency, von Willebrand disease, platelet function disorders) need hematology testing.', colorVar: '--color-primary' },
            mixed: { value: 'Mixed picture', label: 'Pattern does not fit one cause', description: 'Repeat with age-specific ranges, add fibrinogen and a smear, and involve hematology. Give vitamin K if VKDB is possible.', colorVar: '--color-warning' },
        };
        return map[p];
    },
};
// ---------------------------------------------------------------------------
// VKDB doses
// ---------------------------------------------------------------------------
/** Kcentra-type 4F-PCC: about 500 units in 20 mL = 25 units/mL. Products differ: check the vial. */
export const PCC_UNITS_PER_ML = 25;
export function vkdbDoses(weightKg) {
    if (!Number.isFinite(weightKg) || weightKg <= 0 || weightKg > 30)
        return null;
    const r = (n) => Math.round(n);
    const proph = weightKg >= 1.5 ? '1 mg IM' : `${(Math.round(weightKg * 0.3 * 100) / 100)}-${(Math.round(weightKg * 0.5 * 100) / 100)} mg IM (0.3-0.5 mg/kg)`;
    return {
        vitKmg: 1,
        prophylaxisMg: proph,
        pcc: { low: r(weightKg * 20), usual: r(weightKg * 30), high: r(weightKg * 50), usualMl: Math.round((weightKg * 30 / PCC_UNITS_PER_ML) * 10) / 10 },
        ffpMl: { low: r(weightKg * 15), high: r(weightKg * 20) },
    };
}
export const VKDB_DOSES_CALCULATOR = {
    id: 'vkdb-doses',
    title: 'VKDB Doses (Infant)',
    subtitle: 'Vitamin K, 4F-PCC and plasma by weight',
    description: 'Treatment: vitamin K 1 mg (subcutaneous when possible; slow IV, no faster than 1 mg/min, for serious bleeding). Major or intracranial bleeding: add 4-factor PCC (preferred over plasma in the BSH guideline; infant doses of 20-50 units/kg are reported in case series, about 30 units/kg typical) or fresh frozen plasma 15-20 mL/kg. Dose PCC with hematology and pharmacy.',
    fields: [
        { name: 'weight', label: 'Weight', type: 'number', points: 0, valueIsPoints: true, unit: 'kg' },
    ],
    results: [],
    thresholdNote: 'PCC concentration varies by product (about 25 units/mL for a 500-unit vial in 20 mL): check the vial. Recheck PT/INR after treatment; repeat vitamin K if it stays prolonged.',
    citations: [LABEL, BSH, AAP, SHEARER],
    computeResult: (values) => {
        const d = vkdbDoses(values['weight'] ?? NaN);
        if (!d)
            return { value: '--', label: 'Enter weight in kg', description: 'Infant weight (up to 30 kg).', colorVar: '--color-text-muted' };
        return {
            value: `Vitamin K ${d.vitKmg} mg`,
            label: 'SC, or slow IV for serious bleeding',
            description: `**4F-PCC (major / intracranial bleeding):** about ${d.pcc.usual} units (~${d.pcc.usualMl} mL at 25 units/mL); reported range ${d.pcc.low}-${d.pcc.high} units (20-50 units/kg).\n\n**Fresh frozen plasma (if PCC unavailable):** ${d.ffpMl.low}-${d.ffpMl.high} mL (15-20 mL/kg).\n\n**Prophylaxis reference (newborn):** ${d.prophylaxisMg}.`,
            colorVar: '--color-danger',
        };
    },
};
