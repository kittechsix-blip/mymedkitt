// Hemolytic anemia calculators (added 2026-11-11): hemolysis lab interpreter, reticulocyte production index.
// Pure logic is exported for tests. Inputs are ephemeral and never persisted.
// Sources: Marchand JAMA 1980 (haptoglobin), Phillips & Henderson AFP 2018, BSH AIHA guideline 2017, Hillman (RPI maturation factors).
const MARCHAND = 'Marchand A, Galen RS, Van Lente F. The predictive value of serum haptoglobin in hemolytic disease. JAMA. 1980;243(19):1909-1911.';
const PHILLIPS = 'Phillips J, Henderson AC. Hemolytic anemia: evaluation and differential diagnosis. Am Fam Physician. 2018;98(6):354-361.';
const BSH = 'Hill QA, Stamps R, Massey E, et al. The diagnosis and management of primary autoimmune haemolytic anaemia. Br J Haematol. 2017;176(3):395-411.';
const HILLMAN = 'Hillman RS, Ault KA, Leporrier M, Rinder HM. Hematology in Clinical Practice. 5th ed. McGraw-Hill; 2010. (Reticulocyte production index and maturation correction.)';
/** LDH plus haptoglobin carry the call; bilirubin, reticulocytes and hemoglobinuria are supporting evidence. */
export function hemolysisCall(l) {
    if (l.ldhHigh < 0 && l.haptoLow < 0)
        return 'incomplete';
    if (l.ldhHigh === 1 && l.haptoLow === 1)
        return 'likely';
    // Raised indirect bilirubin or reticulocytes keep hemolysis possible even with a normal LDH and haptoglobin.
    if (l.ldhHigh === 0 && l.haptoLow === 0 && !l.hemoglobinuria && l.biliHigh !== 1 && l.reticHigh !== 1)
        return 'unlikely';
    return 'possible';
}
/** Count of supporting features present (0-3). */
export function supportCount(l) {
    return (l.biliHigh === 1 ? 1 : 0) + (l.reticHigh === 1 ? 1 : 0) + (l.hemoglobinuria ? 1 : 0);
}
const TRI = (yes, no) => [
    { label: 'Not sent', points: -1 },
    { label: yes, points: 1 },
    { label: no, points: 0 },
];
export const HEMOLYSIS_LABS_CALCULATOR = {
    id: 'hemolysis-labs',
    title: 'Hemolysis Lab Interpreter',
    subtitle: 'Is this anemia hemolytic?',
    description: 'Enter the hemolysis panel. A raised LDH with a haptoglobin of 25 mg/dL or less makes hemolysis likely; a normal LDH and haptoglobin with no supporting features makes it unlikely. Indirect bilirubin, reticulocytes and hemoglobinuria support the call. Whatever the result, the next tests are a peripheral smear and a direct antiglobulin test (DAT).',
    fields: [
        { name: 'ldh', label: 'LDH', type: 'select', points: 0, hideOptionPoints: true, selectOptions: TRI('Above the lab upper limit', 'Normal') },
        { name: 'hapto', label: 'Haptoglobin', type: 'select', points: 0, hideOptionPoints: true, selectOptions: TRI('25 mg/dL or less (or undetectable)', 'Over 25 mg/dL') },
        { name: 'bili', label: 'Indirect (unconjugated) bilirubin', type: 'select', points: 0, hideOptionPoints: true, selectOptions: TRI('Raised', 'Normal') },
        { name: 'retic', label: 'Reticulocytes', type: 'select', points: 0, hideOptionPoints: true, selectOptions: TRI('Raised (or RPI 2 or more)', 'Normal or low') },
        { name: 'hgburia', label: 'Hemoglobinuria', description: 'Dipstick positive for blood with few or no RBCs on microscopy (red or brown urine)', type: 'toggle', points: 1 },
    ],
    results: [],
    thresholdNote: 'Haptoglobin 25 mg/dL or less alone: sensitivity 83%, specificity 96% for hemolysis (Marchand 1980). Haptoglobin rises with inflammation (can hide hemolysis) and falls in cirrhosis or congenital absence. LDH also rises with liver injury, tissue damage and malignancy. A normal or low reticulocyte count does not exclude hemolysis.',
    citations: [MARCHAND, PHILLIPS, BSH],
    computeResult: (values) => {
        const labs = {
            ldhHigh: values['ldh'] ?? -1,
            haptoLow: values['hapto'] ?? -1,
            biliHigh: values['bili'] ?? -1,
            reticHigh: values['retic'] ?? -1,
            hemoglobinuria: (values['hgburia'] || 0) > 0,
        };
        const call = hemolysisCall(labs);
        const s = supportCount(labs);
        const intravascular = labs.hemoglobinuria
            ? '\n\n**Hemoglobinuria = intravascular hemolysis.** Think TMA (TTP, HUS, DIC), acute hemolytic transfusion reaction, G6PD crisis, PNH, cold agglutinins or PCH, severe infection (malaria, Clostridium).'
            : '';
        const lowRetic = labs.reticHigh === 0 && call !== 'unlikely'
            ? '\n\n**Low reticulocytes with hemolysis:** too early (takes 3-5 days), marrow suppression (parvovirus B19, drugs), or antibody against red cell precursors. Dangerous: hemoglobin can fall fast.'
            : '';
        const next = '\n\n**Next:** peripheral smear and DAT (Coombs).';
        if (call === 'incomplete')
            return { value: '--', label: 'Enter LDH or haptoglobin', description: 'LDH and haptoglobin carry the call. Send both with indirect bilirubin, reticulocytes, smear, DAT and urinalysis.', colorVar: '--color-text-muted' };
        if (call === 'likely')
            return { value: 'Hemolysis likely', label: `LDH high + haptoglobin low${s ? `, ${s} supporting feature${s > 1 ? 's' : ''}` : ''}`, description: `Hemolysis is likely. (Haptoglobin 25 mg/dL or less alone has a specificity of 96%; a raised LDH adds support.)${intravascular}${lowRetic}${next}`, colorVar: '--color-danger' };
        if (call === 'unlikely')
            return { value: 'Hemolysis unlikely', label: 'LDH and haptoglobin both normal', description: `Look for another cause of anemia (blood loss, marrow, nutritional). Caveat: haptoglobin is an acute-phase protein, so inflammation can keep it normal during mild hemolysis.${next.replace('Next:', 'If still suspicious:')}`, colorVar: '--color-primary' };
        const why = labs.haptoLow === 1
            ? 'Low haptoglobin without a raised LDH: hemolysis possible. Also consider cirrhosis or congenital absence of haptoglobin.'
            : labs.ldhHigh === 1
                ? 'Raised LDH alone is nonspecific (liver, muscle or tissue injury, malignancy, pneumonia). Send haptoglobin.'
                : labs.ldhHigh === 0 && labs.haptoLow === 0
                    ? 'LDH and haptoglobin are normal, but raised indirect bilirubin or reticulocytes keep hemolysis possible (Gilbert syndrome and blood loss are alternatives). Repeat the panel and check the smear.'
                    : labs.haptoLow < 0
                        ? 'Haptoglobin not sent: send it. LDH alone cannot make the call.'
                        : 'Incomplete or mixed picture.';
        return { value: 'Possible hemolysis', label: s ? `${s} supporting feature${s === 1 ? '' : 's'}` : 'Incomplete panel', description: `${why}${intravascular}${lowRetic}${next}`, colorVar: '--color-warning' };
    },
};
// ---------------------------------------------------------------------------
// Reticulocyte production index
// ---------------------------------------------------------------------------
/** Maturation (shift) correction by hematocrit, continuous: 1.0 at Hct 45, 1.5 at 35, 2.0 at 25, 2.5 at 15 (clamped).
 *  A smooth line avoids a one-point Hct change flipping the result. */
export function maturationFactor(hct) {
    const f = 1 + (45 - hct) * 0.05;
    return Math.round(Math.min(2.5, Math.max(1, f)) * 100) / 100;
}
/** Returns null for invalid input. Corrected retic = retic% x Hct/45; RPI = corrected / maturation factor. */
export function reticIndex(reticPct, hct) {
    if (!Number.isFinite(reticPct) || reticPct < 0 || reticPct > 60)
        return null;
    if (!Number.isFinite(hct) || hct <= 0 || hct > 70)
        return null;
    const corrected = reticPct * (hct / 45);
    const factor = maturationFactor(hct);
    return { corrected, factor, rpi: corrected / factor };
}
export const RETIC_INDEX_CALCULATOR = {
    id: 'reticulocyte-index',
    title: 'Reticulocyte Production Index',
    subtitle: 'Is the marrow keeping up?',
    description: 'The raw reticulocyte percentage overstates marrow output in anemia. Corrected retic = retic % x (Hct / 45). The RPI then divides by a maturation factor because stressed marrow releases reticulocytes early, and they circulate longer. RPI 2 or more = adequate marrow response (hemolysis or blood loss); under 2 = hypoproliferative.',
    fields: [
        { name: 'retic', label: 'Reticulocytes', type: 'number', points: 0, valueIsPoints: true, unit: '%' },
        { name: 'hct', label: 'Hematocrit', type: 'number', points: 0, valueIsPoints: true, unit: '%' },
    ],
    results: [],
    thresholdNote: 'Maturation factor rises smoothly as Hct falls: 1.0 at 45%, 1.5 at 35%, 2.0 at 25%, 2.5 at 15% or lower. In early hemolysis (first 3-5 days) the RPI can still be low.',
    citations: [HILLMAN, PHILLIPS],
    computeResult: (values) => {
        const r = reticIndex(values['retic'] ?? NaN, values['hct'] ?? NaN);
        if (!r)
            return { value: '--', label: 'Enter reticulocyte % and hematocrit', description: 'Both values from the same CBC.', colorVar: '--color-text-muted' };
        const f1 = (n) => (Math.round(n * 10) / 10).toFixed(1);
        // Never show "RPI 2.0" under the inadequate label: use two decimals just below the cut-off.
        const rpiText = r.rpi < 2 && r.rpi >= 1.95 ? r.rpi.toFixed(2) : f1(r.rpi);
        const detail = `Corrected retic ${f1(r.corrected)}%, maturation factor ${r.factor}.`;
        if (r.rpi >= 2)
            return { value: `RPI ${rpiText}`, label: 'Adequate marrow response', description: `${detail} Fits hemolysis or recent blood loss. Check the hemolysis panel (LDH, haptoglobin, indirect bilirubin).`, colorVar: '--color-primary' };
        return { value: `RPI ${rpiText}`, label: 'Inadequate response (hypoproliferative)', description: `${detail} Marrow not compensating: deficiency (iron, B12, folate), marrow failure or infiltration, renal disease, parvovirus B19. If hemolysis labs are positive, the marrow is failing to keep up (early hemolysis, parvovirus aplastic crisis, antibody against precursors): hemoglobin can fall fast.`, colorVar: '--color-warning' };
    },
};
