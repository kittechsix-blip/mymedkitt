import { HTN_CITATIONS } from './hypertension-evidence.js';
const SUB = 'Adult hypertension: ED to clinic';
const page = (id, title, sections, subtitle = SUB) => ({ id, title, subtitle, sections, citations: HTN_CITATIONS, shareable: false });
// The comparison-table component is wider than a phone and scrolls sideways, which hides the answer column.
// These pages render the same row data as stacked text instead.
const lines = (t, fmt) => t.rows.map(r => fmt(r.cells)).join('\n');
const dl = (label, id) => `[${label}](#/drug/${id}/chronic hypertension)`;
const PICKER = {
    columns: [
        { key: 'who', label: 'Patient' },
        { key: 'use', label: 'Lead with' },
        { key: 'avoid', label: 'Avoid or watch' },
    ],
    rows: [
        { cells: { who: 'No compelling condition, stage 1', use: 'One of: thiazide-type, amlodipine, ACE inhibitor, ARB', avoid: 'Beta blocker as first drug' } },
        { cells: { who: 'No compelling condition, stage 2', use: 'Two classes in one pill: ACE inhibitor or ARB + amlodipine, or + thiazide', avoid: 'ACE inhibitor + ARB together' } },
        { cells: { who: 'CKD with albuminuria 30 mg/g or more', use: 'ACE inhibitor or ARB', avoid: 'Both together; NSAIDs; MRA or amiloride for BP if GFR under 45' } },
        { cells: { who: 'CKD, eGFR under 30', use: 'Loop diuretic or chlorthalidone; continue existing ACE inhibitor or ARB', avoid: 'Spironolactone, eplerenone, amiloride, triamterene' } },
        { cells: { who: 'Diabetes', use: 'Any first-line class; ACE inhibitor or ARB if CKD or albuminuria', avoid: 'Thiazides raise glucose modestly' } },
        { cells: { who: 'Heart failure, reduced EF', use: 'Beta blocker, ARNI or ACE inhibitor or ARB, MRA, SGLT2 inhibitor; then amlodipine', avoid: 'Diltiazem, verapamil' } },
        { cells: { who: 'Heart failure, preserved EF', use: 'Diuretic, then MRA, ARNI or ARB', avoid: 'Beta blocker for BP alone' } },
        { cells: { who: 'Coronary disease or prior MI', use: 'ACE inhibitor or ARB, and a beta blocker', avoid: 'Stopping a beta blocker abruptly' } },
        { cells: { who: 'Prior stroke, TIA or ICH', use: 'Thiazide-type, ACE inhibitor or ARB', avoid: 'Starting in the first 48 to 72 h of an untreated acute ischemic stroke under 220/120' } },
        { cells: { who: 'Pregnant or planning pregnancy', use: 'Labetalol or extended-release nifedipine', avoid: 'ACE inhibitor, ARB, renin inhibitor, MRA, atenolol, nitroprusside. Overrides every other row' } },
        { cells: { who: 'Older and frail', use: 'One first-line drug, low end of range, stepped up', avoid: 'Two-drug start; alpha blockers and clonidine' } },
        { cells: { who: 'Gout', use: 'Amlodipine, ACE inhibitor or ARB', avoid: 'Thiazide needs monitoring unless on urate-lowering therapy' } },
        { cells: { who: 'Symptomatic BPH', use: 'First-line class; alpha-1 blocker as second-line add-on', avoid: 'First-dose orthostatic drop' } },
        { cells: { who: 'Aortic disease', use: 'Beta blocker', avoid: '' } },
        { cells: { who: 'Resistant, eGFR 45 or higher', use: 'Add spironolactone 25 to 50 mg', avoid: 'Potassium supplements; high potassium; recheck potassium in 2 to 4 weeks' } },
    ],
};
const DOSES = {
    columns: [
        { key: 'drug', label: 'Drug' },
        { key: 'dose', label: 'Usual range' },
        { key: 'note', label: 'Key point' },
    ],
    rows: [
        { cells: { drug: 'Amlodipine', dose: '2.5 to 10 mg once daily', note: 'Leg swelling, dose related' } },
        { cells: { drug: 'Nifedipine ER', dose: '30 to 90 mg once daily', note: 'Long-acting product only' } },
        { cells: { drug: 'Chlorthalidone', dose: '12.5 to 25 mg once daily', note: 'Longer acting and more potent than HCTZ' } },
        { cells: { drug: 'Hydrochlorothiazide', dose: '25 to 50 mg once daily', note: 'In most single pills' } },
        { cells: { drug: 'Indapamide', dose: '1.25 to 2.5 mg once daily', note: 'Thiazide-like' } },
        { cells: { drug: 'Lisinopril', dose: '10 to 40 mg once daily', note: 'Not with an ARB; not in pregnancy' } },
        { cells: { drug: 'Losartan', dose: '50 to 100 mg/day in 1 or 2 doses', note: 'Not with an ACE inhibitor; not in pregnancy' } },
        { cells: { drug: 'Valsartan', dose: '80 to 320 mg once daily', note: 'ARB' } },
        { cells: { drug: 'Olmesartan', dose: '20 to 40 mg once daily', note: 'ARB' } },
        { cells: { drug: 'Telmisartan', dose: '20 to 80 mg once daily', note: 'ARB' } },
        { cells: { drug: 'Spironolactone', dose: '25 to 100 mg once daily', note: 'Fourth drug at 25 to 50 mg; GFR 45 or more' } },
        { cells: { drug: 'Eplerenone', dose: '50 to 100 mg/day in 1 or 2 doses', note: 'Often needs twice-daily dosing' } },
        { cells: { drug: 'Amiloride', dose: '5 to 10 mg/day in 1 or 2 doses', note: 'Avoid if GFR under 45' } },
        { cells: { drug: 'Carvedilol', dose: '12.5 to 50 mg/day in 2 doses', note: 'One of 3 beta blockers proven in HFrEF' } },
        { cells: { drug: 'Metoprolol succinate', dose: '50 to 200 mg once daily', note: 'Do not stop abruptly' } },
        { cells: { drug: 'Bisoprolol', dose: '2.5 to 10 mg once daily', note: 'Proven in HFrEF' } },
        { cells: { drug: 'Labetalol', dose: '200 to 1200 mg/day in 2 doses', note: 'Preferred in pregnancy' } },
        { cells: { drug: 'Torsemide', dose: '5 to 10 mg once daily', note: 'Preferred loop for hypertension' } },
        { cells: { drug: 'Furosemide', dose: '20 to 80 mg/day in 2 doses', note: 'Loop; GFR under 30 or heart failure' } },
        { cells: { drug: 'Hydralazine', dose: '100 to 200 mg/day in 2 or 3 doses', note: 'Needs a beta blocker and diuretic' } },
        { cells: { drug: 'Doxazosin', dose: '1 to 16 mg once daily', note: 'Orthostatic drop; BPH add-on' } },
        { cells: { drug: 'Clonidine (oral)', dose: '0.1 to 0.8 mg/day in 2 doses', note: 'Last line; must be tapered' } },
        { cells: { drug: 'Aprocitentan', dose: '12.5 mg once daily', note: 'Resistant hypertension; fluid retention' } },
    ],
};
// Links keep the picker wording intact and use the modal's existing section anchors.
const doseAnchor = (name) => 'trick-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const EXTRA_PICKER_DRUGS = ['Triamterene', 'Diltiazem', 'Verapamil', 'Atenolol', 'Nitroprusside', 'Isosorbide dinitrate'];
// Class links open a class-specific chooser; each listed drug opens its dose section.
const PICKER_CLASSES = [
    { heading: 'First-line classes', aliases: ['first-line class', 'first-line classes', 'first-line drug'], drugs: ['Amlodipine', 'Chlorthalidone', 'Hydrochlorothiazide', 'Indapamide', 'Lisinopril', 'Losartan', 'Valsartan', 'Olmesartan', 'Telmisartan'], note: 'Choose the class for the patient using the Drug Picker.' },
    { heading: 'Thiazide-type diuretics', aliases: ['thiazide-type', 'thiazides', 'thiazide'], drugs: ['Chlorthalidone', 'Hydrochlorothiazide', 'Indapamide'] },
    { heading: 'ACE inhibitors', aliases: ['ACE inhibitor', 'ACE inhibitors'], drugs: ['Lisinopril'] },
    { heading: 'ARBs', aliases: ['ARB', 'ARBs'], drugs: ['Losartan', 'Valsartan', 'Olmesartan', 'Telmisartan'] },
    { heading: 'Calcium channel blockers', aliases: ['calcium channel blocker', 'calcium channel blockers'], drugs: ['Amlodipine', 'Nifedipine ER', 'Diltiazem', 'Verapamil'], note: 'Preserve the patient-specific cautions in the Drug Picker; these drugs are not interchangeable.' },
    { heading: 'Beta blockers', aliases: ['beta blocker', 'beta blockers'], drugs: ['Carvedilol', 'Metoprolol succinate', 'Bisoprolol', 'Labetalol', 'Atenolol'], note: 'Use the compelling indication and the Drug Picker cautions to choose the agent.' },
    { heading: 'Loop diuretics', aliases: ['loop diuretic', 'loop diuretics'], drugs: ['Torsemide', 'Furosemide'] },
    { heading: 'Diuretics', aliases: ['diuretic', 'diuretics'], drugs: ['Chlorthalidone', 'Hydrochlorothiazide', 'Indapamide', 'Torsemide', 'Furosemide', 'Spironolactone', 'Eplerenone', 'Amiloride', 'Triamterene'] },
    { heading: 'Mineralocorticoid receptor antagonists (MRA)', aliases: ['MRA', 'MRAs'], drugs: ['Spironolactone', 'Eplerenone'] },
    { heading: 'Alpha-1 blockers', aliases: ['alpha-1 blocker', 'alpha-1 blockers', 'alpha blocker', 'alpha blockers'], drugs: ['Doxazosin'] },
    { heading: 'ARNI', aliases: ['ARNI'], drugs: [], note: 'This hypertension table does not provide ARNI doses. [Open the HFrEF guidance](#/node/htn-r-hfref).' },
    { heading: 'SGLT2 inhibitors', aliases: ['SGLT2 inhibitor', 'SGLT2 inhibitors'], drugs: [], note: 'This hypertension table does not provide SGLT2 inhibitor doses. [Open the HFrEF guidance](#/node/htn-r-hfref).' },
    { heading: 'Renin inhibitors', aliases: ['renin inhibitor', 'renin inhibitors'], drugs: [], note: 'Mentioned in the pregnancy and combination cautions, not as a dosing option in this table. [Review combinations to avoid](#/info/htn-drugs#trick-combinations-to-avoid).' },
    { heading: 'NSAIDs', aliases: ['NSAID', 'NSAIDs'], drugs: [], note: 'This is an avoid/watch entry. [Review medicines that raise BP](#/info/htn-raisers).' },
    { heading: 'Potassium supplements', aliases: ['potassium supplements'], drugs: [], note: 'This is an avoid/watch entry. [Review potassium and kidney precautions](#/info/htn-kidney#trick-potassium).' },
];
const classTargets = Object.fromEntries(PICKER_CLASSES.flatMap(c => c.aliases.map(alias => [alias, c.heading])));
const pickerTargets = Object.fromEntries([
    ...DOSES.rows.map(r => [r.cells.drug.replace(' (oral)', ''), r.cells.drug]),
    ...EXTRA_PICKER_DRUGS.map(name => [name, name]),
    ['extended-release nifedipine', 'Nifedipine ER'],
    ...Object.entries(classTargets),
]);
const pickerPattern = new RegExp('\\b(' + Object.keys(pickerTargets).sort((a, b) => b.length - a.length).join('|') + ')\\b', 'gi');
const linkPickerDrugs = (text) => text.replace(pickerPattern, label => {
    const key = Object.keys(pickerTargets).find(name => name.toLowerCase() === label.toLowerCase());
    const pageId = key in classTargets ? 'htn-drug-classes' : 'htn-drugs';
    return `[${label}](#/info/${pageId}#${doseAnchor(pickerTargets[key])})`;
});
const LIFESTYLE = {
    columns: [
        { key: 'what', label: 'Change' },
        { key: 'goal', label: 'Goal' },
        { key: 'effect', label: 'Systolic drop' },
    ],
    rows: [
        { cells: { what: 'DASH eating pattern', goal: 'Fruits, vegetables, whole grains, low-fat dairy; less saturated and total fat', effect: '5 to 8' } },
        { cells: { what: 'Less sodium', goal: 'Under 2,300 mg/day; ideal under 1,500', effect: '6 to 8' } },
        { cells: { what: 'Salt substitute', goal: 'Replace table and cooking salt with a potassium-based substitute', effect: '5 to 7' } },
        { cells: { what: 'More potassium', goal: '3,500 to 5,000 mg/day, from food where possible', effect: 'about 6' } },
        { cells: { what: 'Weight loss', goal: '5% or more of body weight; about 1 mm Hg per kg lost', effect: '6 to 8' } },
        { cells: { what: 'Less alcohol', goal: 'None is best; at most 2 drinks/day men, 1 women', effect: '4 to 6' } },
        { cells: { what: 'Aerobic exercise', goal: '90 to 150 min/week', effect: '4 to 8' } },
        { cells: { what: 'Resistance training', goal: '90 to 150 min/week', effect: '2 to 7' } },
        { cells: { what: 'Isometric hand-grip', goal: '4 x 2 min, 3 sessions/week', effect: '5 to 10' } },
    ],
};
const HOME_EQUIV = {
    columns: [
        { key: 'office', label: 'Office' },
        { key: 'home', label: 'Home' },
        { key: 'day', label: '24-hour ambulatory' },
    ],
    rows: [
        { cells: { office: '120/80', home: '120/80', day: '115/75' } },
        { cells: { office: '130/80', home: '130/80', day: '125/75' } },
        { cells: { office: '140/90', home: '135/85', day: '130/80' } },
        { cells: { office: '160/100', home: '145/90', day: '145/90' } },
    ],
};
export const HTN_INFO_PAGES = {
    'htn-steps': page('htn-steps', 'Hypertension: rapid roadmap', [
        { heading: 'The 6 steps', body: '1. [Organ damage?](#/node/htn-start) Brain, heart and aorta, kidney. Yes means the emergency pathway.\n2. [Proper repeat reading](#/node/htn-how-high) and the category: stage 1, stage 2, or severe (systolic over 180 or diastolic over 120).\n3. [Severe without organ damage](#/node/htn-severe): no IV drugs, no rapid lowering.\n4. [Who is this patient?](#/node/htn-who) New, ran out, or on medicine and still high.\n5. [Pick by the patient](#/node/htn-comorbid): compelling condition first, then stage decides one drug or two.\n6. [Diet](#/node/htn-diet), then [disposition](#/node/htn-dispo): fillable regimen, follow-up, labs in 2 to 4 weeks.' },
        { heading: 'One-tap references', body: '[Drug picker](#/info/htn-picker) • [Doses](#/info/htn-drugs) • [Kidney and labs](#/info/htn-kidney) • [Diet](#/info/htn-diet) • [BP raisers](#/info/htn-raisers) • [Secondary causes](#/info/htn-secondary) • [Home BP](#/info/htn-home-bp) • [Discharge](#/info/htn-discharge) • [Evidence](#/info/htn-evidence) • [Do NOT](#/info/hypertension-stop)' },
    ]),
    'hypertension-stop': page('hypertension-stop', 'Hypertension: Do NOT', [
        { heading: '🛑 Do NOT treat the number as the emergency', body: 'A hypertensive emergency needs acute organ damage, not a threshold reading. Look for it deliberately, then decide. [Organ damage check](#/node/htn-start) [1]' },
        { heading: '🛑 Do NOT give IV drugs or lower BP fast when there is no organ damage', body: 'Severe hypertension without organ damage gets oral medicine restarted or adjusted, preferably as an outpatient. Rapid lowering can underperfuse brain, heart and kidney. [Why](#/node/htn-severe) [1]' },
        { heading: '🛑 Do NOT write as-needed antihypertensives for an inpatient number', body: 'Extra IV or oral doses for asymptomatic severe readings in patients admitted for noncardiac reasons are classed as harm. Use standing medicines. [Details](#/node/htn-r-admit) [1,7]' },
        { heading: '🛑 Do NOT combine an ACE inhibitor with an ARB', body: 'More hypotension, hyperkalemia and kidney dysfunction, with no added benefit. The same applies to either one with a renin inhibitor. [Combination card](#/node/htn-r-combo) [1,12]' },
        { heading: '🛑 Do NOT give an ACE inhibitor, ARB, renin inhibitor or MRA in pregnancy or when it is planned', body: 'Atenolol and nitroprusside are on the same harm list. Labetalol and extended-release nifedipine are preferred. [Pregnancy card](#/node/htn-r-preg-potential) [1]' },
        { heading: '🛑 Do NOT stop clonidine or a beta blocker abruptly', body: 'Clonidine withdrawal can cause a hypertensive crisis; it must be tapered. A patient who ran out needs it restarted promptly. [Ran out](#/node/htn-ranout) [1]' },
        { heading: '🛑 Do NOT use diltiazem or verapamil in HFrEF, or routinely with a beta blocker', body: 'Negative inotropy in a weak ventricle; bradycardia and heart block with a beta blocker. [HFrEF card](#/node/htn-r-hfref) [1]' },
        { heading: '🛑 Do NOT add spironolactone or amiloride for blood pressure when GFR is under 45 or with potassium supplements', body: 'Hyperkalemia. The add-on recommendation for resistant hypertension requires an eGFR of 45 or more. In HFrEF the MRA threshold is different: eGFR over 30 with potassium under 5.0 mEq/L. [Resistant hypertension](#/node/htn-resistant) [1]' },
        { heading: '🛑 Do NOT stop an ACE inhibitor or ARB for an eGFR dip of 30% or less', body: 'That dip is expected and goes with long-term kidney protection. Act when the decline stays above 30%. High potassium is a separate reason to reduce or hold the drug. [CKD](#/node/htn-ckd) [1]' },
        { heading: '🛑 Do NOT call it resistant before checking adherence, technique and interfering substances', body: 'About 1 in 5 adults with hypertension regularly takes a drug that raises BP, typically an NSAID or decongestant. [Is it real?](#/node/htn-uncontrolled) [1]' },
    ], 'Critical pitfalls to avoid'),
    'htn-picker': page('htn-picker', 'Drug picker: choose by the patient', [
        { heading: 'How to read it', body: 'Find the first patient below that fits. “Lead with” is the class the 2025 guideline favors; “avoid or watch” is the trap for that patient. Stage then decides one drug or two. Tap a drug for its dose section, or a class for its agents. [Browse classes](#/info/htn-drug-classes) • [All doses](#/info/htn-drugs). [1]' },
        ...PICKER.rows.map(r => ({ heading: r.cells.who, body: linkPickerDrugs(`**Lead with:** ${r.cells.use}${r.cells.avoid ? `\n**Avoid or watch:** ${r.cells.avoid}` : ''}`) })),
        { heading: 'Race', body: 'The 2025 guideline does not select a drug class by race. Its only race-specific treatment notes are that its narrative gives non-Hispanic Black adults as an example of high-risk stage 1 patients for whom starting two drugs is recommended, and that hydralazine with isosorbide dinitrate is recommended for self-identified Black patients with advanced HFrEF. It also notes a larger DASH effect and more masked and resistant hypertension in Black adults. The older rule (thiazide or calcium channel blocker first) was not found in the 2025 text. [1,22]' },
        { heading: 'Age', body: 'No age-based drug class. Older and frail adults start with one drug at a low dose and step up, with standing BP checks; the goal stays under 130/80 when tolerated, and is individualized with limited life expectancy. [1]' },
    ]),
    'htn-drug-classes': page('htn-drug-classes', 'Drug picker: classes and agents', PICKER_CLASSES.map(c => ({
        heading: c.heading,
        body: `${c.note ?? 'Agents with entries in this hypertension dosing reference:'}\n${c.drugs.map(name => `[${name}](#/info/htn-drugs#${doseAnchor(name)})`).join(' • ')}\n[Back to Drug Picker](#/info/htn-picker)`,
    }))),
    'htn-drugs': page('htn-drugs', 'Doses: oral antihypertensives', [
        { heading: 'First-line dose cards', body: `${dl('Amlodipine', 'htn-amlodipine')} • ${dl('Chlorthalidone', 'htn-chlorthalidone')} • ${dl('Hydrochlorothiazide', 'htn-hctz')} • ${dl('Indapamide', 'htn-indapamide')} • ${dl('Lisinopril', 'htn-lisinopril')} • ${dl('Losartan', 'htn-losartan')} • ${dl('Nifedipine ER', 'htn-nifedipine-er')}` },
        { heading: 'Add-on and compelling-indication cards', body: `${dl('Spironolactone', 'htn-spironolactone')} • ${dl('Carvedilol', 'htn-carvedilol')} • ${dl('Metoprolol succinate', 'htn-metoprolol-succinate')} • ${dl('Labetalol', 'htn-labetalol')} • ${dl('Torsemide', 'htn-torsemide')}` },
        { heading: 'Usual ranges (2025 AHA/ACC drug table)', body: 'These are usual daily ranges, not first doses. Start low in the range and titrate; lower and slower in older or frail adults. [1]' },
        ...DOSES.rows.map(r => ({ heading: r.cells.drug, body: `**${r.cells.drug}:** ${r.cells.dose}. ${r.cells.note}. [1]\nUsual range, not a starting dose. [Back to Drug Picker](#/info/htn-picker)` })),
        ...EXTRA_PICKER_DRUGS.map(name => ({ heading: name, body: 'This medicine is mentioned in the picker, but an individual dosage range is not provided in this hypertension table. Review the indication-specific guidance before prescribing. [Back to Drug Picker](#/info/htn-picker)' })),
        { heading: 'Generic single pills (mg)', body: '**ACE inhibitor or ARB + amlodipine:** benazepril + amlodipine 10/2.5, 10/5, 20/5, 20/10, 40/5, 40/10; olmesartan + amlodipine 20/5, 20/10, 40/5, 40/10; telmisartan + amlodipine 40/5, 40/10, 80/5, 80/10; valsartan + amlodipine 160/5, 160/10, 320/5, 320/10.\n**ACE inhibitor or ARB + HCTZ:** lisinopril + HCTZ 10/12.5, 20/12.5, 20/25; losartan + HCTZ 50/12.5, 100/12.5, 100/25; valsartan + HCTZ 80/12.5, 160/12.5, 160/25, 320/12.5, 320/25.\n**Triple:** olmesartan + amlodipine + HCTZ 20/5/12.5, 40/5/12.5, 40/5/25, 40/10/12.5, 40/10/25; valsartan + amlodipine + HCTZ 160/5/12.5, 160/5/25, 160/10/12.5, 160/10/25, 320/10/25. [1]' },
        { heading: 'Combinations to avoid', body: 'ACE inhibitor + ARB, or either with a renin inhibitor. Two drugs from one class. Diltiazem or verapamil with a beta blocker. Clonidine with a non-selective beta blocker (crisis if the beta blocker is withdrawn). Any antihypertensive is blunted by NSAIDs. [1]' },
    ]),
    'htn-kidney': page('htn-kidney', 'Kidney function and labs', [
        { heading: 'Before the first prescription', body: 'A basic metabolic panel at diagnosis: creatinine with eGFR, potassium and sodium. Add a urine albumin-to-creatinine ratio; the 2025 guideline recommends it for every adult with hypertension. [1]' },
        { heading: 'Drug choice by eGFR', body: '**60 or more:** any first-line class.\n**Under 60 with albuminuria 30 mg/g or more:** ACE inhibitor or ARB, not both.\n**Under 45:** avoid spironolactone, eplerenone, amiloride and triamterene for blood pressure. In HFrEF the MRA threshold is eGFR over 30 with potassium under 5.0 mEq/L.\n**Under 30:** a loop diuretic is preferred over a thiazide-type diuretic; chlorthalidone is the thiazide with trial support here (CLICK). An ACE inhibitor or ARB already in use can be continued.\n**Dialysis or transplant:** outside these recommendations; involve nephrology. [1,14]' },
        { heading: 'After starting or changing a dose', body: 'Basic metabolic panel in 2 to 4 weeks for diuretics, ACE inhibitors, ARBs and MRAs. Calcium channel blockers are not on that list. [1]' },
        { heading: 'The creatinine bump', body: 'An ACE inhibitor, ARB or MRA can lower eGFR by up to 30%. That is expected and goes with long-term preservation of kidney function. Do not stop the drug unless the decline stays above 30%; then reduce or hold it and look for another cause (volume depletion, NSAIDs, renal artery stenosis), with nephrology. [1]' },
        { heading: 'Potassium', body: 'High potassium comes from ACE inhibitors, ARBs, MRAs and potassium-sparing diuretics, more so in combination or with CKD. Trimethoprim-sulfamethoxazole and potassium supplements add to it. Potassium binders are an option to keep a needed drug; give other medicines at least 3 hours apart from patiromer. Low potassium and low sodium come from thiazides. [1]' },
        { heading: 'BP goals in CKD: two guidelines', body: 'AHA/ACC 2025: systolic under 130. KDIGO 2021: systolic under 120 when tolerated, using standardized office measurement. They differ; choose with the patient’s tolerance in mind. [1,15]' },
    ]),
    'htn-diet': page('htn-diet', 'Diet and lifestyle plan', [
        { heading: 'What each change is worth', body: `Approximate systolic drop in people with hypertension. The ranges come from different trials and should not be ranked against each other. [1]\n${lines(LIFESTYLE, c => `**${c.what}:** ${c.goal}. Lowers systolic ${c.effect} mm Hg`)}` },
        { heading: 'DASH in plain words', body: 'Build meals around vegetables, fruit, whole grains and low-fat dairy, and cut back on saturated fat. In the DASH-Sodium trial, DASH with low sodium lowered systolic BP 11.5 mm Hg in people with hypertension compared with a typical diet at high sodium. The effect is larger in Black adults, with higher starting BP, and with higher sodium intake. [1,20]' },
        { heading: 'Sodium', body: 'Under 2,300 mg a day, moving toward 1,500. Most of it is already in the food: restaurant meals, processed meats, canned soups, bread, sauces. Read the label for milligrams of sodium per serving and count the servings. Sodium restriction may not suit a patient with severe symptomatic orthostatic hypotension. [1]' },
        { heading: 'Salt substitutes and potassium', body: 'A potassium-based salt substitute (about 25% to 30% potassium chloride) at the stove and table lowers BP, and in the SSaSS trial (20,995 people) lowered stroke (rate ratio 0.86) and death (0.88) over 4.7 years. Potassium-rich foods help the same way.\n**Check potassium first, and monitor, in CKD or with an ACE inhibitor, ARB, spironolactone, eplerenone, amiloride, triamterene, cyclosporine or tacrolimus.** [1,19]' },
        { heading: 'Weight, alcohol, activity', body: 'Lose 5% or more of body weight if overweight: about 1 mm Hg per kilogram. Alcohol: none is best; no more than 2 drinks a day for men or 1 for women. One drink is 12 oz beer, 5 oz wine or 1.5 oz spirits. Move 90 to 150 minutes a week; brisk walking counts, and resistance or hand-grip training adds to it. [1]' },
        { heading: 'Things that quietly raise BP', body: 'NSAIDs, decongestants, stimulants, black licorice, some supplements, and caffeine over about 300 mg a day. [Full list](#/info/htn-raisers) [1]' },
        { heading: 'Say it in one breath', body: '“Eat more plants and less salt, cook with a salt substitute if your kidneys and medicines allow, drink less alcohol, walk most days, and check your pressure at home.”' },
    ]),
    'htn-raisers': page('htn-raisers', 'Medicines and substances that raise BP', [
        { heading: 'Over the counter and recreational', body: '**NSAIDs:** avoid systemic use when possible; consider topical NSAIDs or another analgesic. Acetaminophen: keep under 4 g/day.\n**Decongestants (pseudoephedrine, phenylephrine):** shortest course; avoid in severe or uncontrolled hypertension. Nasal saline, intranasal steroids or antihistamines instead.\n**Alcohol:** none, or at most 1 drink/day women, 2 men.\n**Caffeine:** under 300 mg/day; no more than 1 cup daily with severe uncontrolled hypertension.\n**Black licorice; ephedra, Ma Huang, yohimbine:** avoid.\n**Cocaine, methamphetamine, “bath salts”:** stop. [1]' },
        { heading: 'Prescription', body: '**Stimulants (amphetamine, methylphenidate and relatives):** stop or reduce; consider non-stimulants.\n**Antidepressants (MAOIs, SNRIs, tricyclics):** consider an SSRI.\n**Atypical antipsychotics (risperidone, olanzapine):** limit when possible.\n**Systemic corticosteroids:** limit; inhaled or topical routes when feasible.\n**Oral contraceptives:** low-dose estrogen or progestin-only, or a non-hormonal method; avoid in uncontrolled hypertension.\n**Cyclosporine:** tacrolimus may affect BP less.\n**Cancer drugs (bevacizumab, sunitinib, sorafenib; abiraterone, enzalutamide):** limit when possible.\n**Clonidine or tizanidine withdrawal:** taper, never stop abruptly. [1]' },
        { heading: 'When the drug is needed', body: 'If the offending medicine is the best option for the patient, keep it and start or intensify antihypertensive treatment. [1]' },
    ]),
    'htn-secondary': page('htn-secondary', 'Secondary hypertension: who to screen', [
        { heading: 'Suspect it when', body: 'Resistant hypertension; abrupt onset or sudden worsening; hypertension in a young adult; hypokalemia; an adrenal mass; stroke before 40; or symptoms that fit a cause below. A positive screen goes to a specialist in that condition. [1]' },
        { heading: 'Primary aldosteronism (5% to 25%)', body: '**Screen:** resistant hypertension whatever the potassium, hypokalemia (spontaneous or diuretic induced), sleep apnea, incidental adrenal mass, family history of early hypertension, stroke under 40. May be considered in stage 2.\n**Test:** plasma aldosterone, renin activity and their ratio. Continue current antihypertensives; an MRA should ideally be off for at least 4 weeks. Potassium should be normal for the test. [1]' },
        { heading: 'Common causes and the screening test', body: '**Sleep apnea (25% to 50%):** snoring, daytime sleepiness, large neck. STOP-Bang or Berlin questionnaire, overnight oximetry.\n**CKD (14%):** creatinine, urinalysis, urine albumin, renal ultrasound.\n**Drug or alcohol induced (2% to 20%):** [review the list](#/info/htn-raisers).\n**Renovascular (0.1% to 5%):** abrupt or worsening hypertension, flash pulmonary edema, abdominal bruit, early onset in women. Renal duplex, MR or CT angiography. [1]' },
        { heading: 'Uncommon causes', body: '**Pheochromocytoma:** spells of headache, sweating and palpitations; labile BP. Plasma or 24-hour urine fractionated metanephrines.\n**Cushing syndrome:** central weight gain, proximal weakness, hyperglycemia. Overnight 1 mg dexamethasone suppression test.\n**Thyroid disease:** TSH and free T4.\n**Aortic coarctation:** hypertension under 30, arm BP higher than leg, weak femoral pulses. Echocardiogram.\n**Hyperparathyroidism:** serum calcium. [1]' },
        { heading: 'From the ED', body: 'Send what is cheap and changes the next visit (potassium, creatinine, TSH, urinalysis) and write the suspicion in the referral. The rest belongs to clinic.' },
    ]),
    'htn-home-bp': page('htn-home-bp', 'Home BP: technique and schedule', [
        { heading: 'The cuff', body: 'A validated upper-arm device with the right cuff size (validatebp.org lists validated devices). Cuffless watches and rings are not recommended for diagnosis or management. [1]' },
        { heading: 'Technique', body: 'No smoking, caffeine or exercise for 30 minutes before. Empty the bladder. Sit in a chair with back supported, feet flat and legs uncrossed, for at least 5 minutes. Bare arm resting at heart level, cuff just above the elbow crease. No talking, phone or television. [1]' },
        { heading: 'Schedule', body: 'Two readings 1 minute apart in the morning (before medicine and breakfast) and two at bedtime. Do this for 3 days at minimum, 7 preferred, before the appointment. Write every reading down and bring the list. [1]' },
        { heading: 'What home numbers mean', body: `Home thresholds run lower than office thresholds at the higher end. A home average of 130/80 or more is high. [1]\n${lines(HOME_EQUIV, c => `**Office ${c.office}** = home ${c.home} = 24-hour ambulatory ${c.day}`)}` },
        { heading: 'White-coat and masked', body: 'White-coat hypertension: high in the office, normal outside. Masked hypertension: normal in the office, high outside. Out-of-office readings are recommended to confirm the diagnosis before lifelong treatment, except that exclusion of white-coat hypertension is not asked for at 160/100 or higher. [1]' },
    ]),
    'htn-discharge': page('htn-discharge', 'Hypertension: discharge checklist', [
        { heading: 'Before leaving', body: 'No acute organ damage after a deliberate look. Repeat reading documented. Pain, distress and missed doses addressed. No target BP has to be reached in the ED. [1,2]' },
        { heading: 'Prescription', body: 'Drug, strength, dose, once-daily timing, quantity, refills to cover the gap until clinic. One pill instead of two where a combination exists. Say which old medicines continue and which stop. Confirm the patient can afford and pick it up today. [1]' },
        { heading: 'Labs', body: 'Baseline creatinine and potassium on the chart when starting an ACE inhibitor, ARB, thiazide or MRA. Order or request the 2 to 4 week recheck. [1]' },
        { heading: 'Follow-up', body: 'Earliest available primary care visit, named and dated (no day count was found in the guideline text read for this build); monthly visits until controlled once treatment starts or changes. The note should carry the readings, what was started and what is still needed (urine albumin-to-creatinine ratio, lipids, A1c, ECG). [1]' },
        { heading: 'Teaching', body: '[Home BP log](#/info/htn-home-bp). [Diet plan](#/info/htn-diet). Stop NSAIDs and decongestants. High BP usually has no symptoms: the medicine is long term even when the patient feels well.' },
        { heading: 'Return now for', body: 'Chest pain, shortness of breath, weakness, numbness or trouble speaking, confusion, severe headache, vision loss, fainting, or very little urine. Lip, tongue or throat swelling on an ACE inhibitor or ARB: stop it and return. [1]' },
    ]),
    'htn-evidence': page('htn-evidence', 'Evidence behind the recommendations', [
        { heading: 'Key points of the 2025 guideline', body: '“Hypertensive urgency” became “severe hypertension”. Treatment threshold moved from pooled-cohort risk to PREVENT 7.5% or more. Goal under 130/80 for all adults, with encouragement toward systolic under 120. Stage 2 starts on two drugs in one pill. No race-based drug choice. Urine albumin-to-creatinine ratio for everyone. Aldosterone screening for all resistant hypertension. As-needed dosing for asymptomatic inpatient readings classed as harm. [1]' },
        { heading: 'How low: intensive targets', body: '**SPRINT** (9,361, no diabetes): systolic under 120 vs under 140, HR 0.75 for the primary outcome and 0.73 for death; more hypotension, syncope, electrolyte problems and kidney injury. [8]\n**STEP** (8,511, age 60 to 80): 110 to under 130 vs 130 to under 150, HR 0.74. [9]\n**ESPRIT** (11,255): under 120 vs under 140, HR 0.88; syncope 0.4% vs 0.1%. [17]\n**BPROAD** (12,821 with type 2 diabetes): under 120 vs under 140, HR 0.79. [16]\n**ACCORD** (4,733 with type 2 diabetes): under 120 vs under 140, HR 0.88, not significant; fewer strokes; more serious adverse events. [21]\n**HYVET** (3,845, age 80 or older): 21% fewer deaths, 64% less heart failure. [18]' },
        { heading: 'Which drug', body: '**ALLHAT** (33,357): chlorthalidone, amlodipine and lisinopril did not differ on the primary outcome; more heart failure with amlodipine, more stroke and heart failure with lisinopril. [10]\n**ACCOMPLISH** (11,506): benazepril + amlodipine beat benazepril + HCTZ, HR 0.80. [11]\n**ONTARGET** (25,620): ramipril + telmisartan gave more hypotension and kidney dysfunction than ramipril alone, no added benefit. [12]\n**PATHWAY-2** (335, resistant): spironolactone lowered home systolic 8.70 mm Hg vs placebo and beat bisoprolol and doxazosin. [13]\n**CLICK** (160, stage 4 CKD): chlorthalidone lowered 24-hour systolic 10.5 mm Hg more than placebo. [14]' },
        { heading: 'Asymptomatic high readings', body: '**Office cohort** (58,535 with BP 180/110 or higher): 7-day cardiac events 0 of 852 sent home vs 2 of 426 sent to hospital; more admissions with referral, no better control at 6 months. This was an office population, not an ED one. [5]\n**Inpatients** (22,834 noncardiac admissions): treating high readings was followed by more kidney injury (10.3% vs 7.9%) and myocardial injury (1.2% vs 0.6%); no BP band did better with treatment. [6]\n**Older veterans** (66,140): intensive treatment in the first 48 hours, composite harm 8.7% vs 6.9%; IV drugs OR 1.90. [7]\nAll three are observational. No randomized trial has tested acute lowering of asymptomatic high BP in the ED. [2]' },
        { heading: 'ACEP policies', body: 'The 2025 policy asks one question: is starting outpatient antihypertensives from the ED safe and effective for asymptomatic elevated BP? Its answer is a Level C recommendation to consider it, and a consensus recommendation to refer every such patient for follow-up. The 2013 policy addressed screening for organ injury and ED treatment of asymptomatic markedly elevated BP; this consult cites it but does not quote it, because its recommendation text was not re-read for this build. [3,4]' },
        { heading: 'Diet', body: '**DASH-Sodium** (412): DASH with low sodium vs control diet with high sodium, systolic 11.5 mm Hg lower with hypertension and 7.1 lower without. [20]\n**SSaSS** (20,995): potassium salt substitute, stroke rate ratio 0.86, death 0.88; hyperkalemia events not increased. The trial did not target people with CKD. [19]' },
    ], 'Trials and policies'),
};
for (const section of HTN_INFO_PAGES['htn-picker'].sections) {
    if (section.heading === 'Race' || section.heading === 'Age')
        section.body = linkPickerDrugs(section.body);
}
