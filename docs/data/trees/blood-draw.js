// MedKitt - Blood Draw: Rainbow, Tube Additives, Cultures, and VBG
// Bedside collection guide. Tube colors and handling details must be checked
// against the local laboratory test directory and the manufacturer's label.
export const BLOOD_DRAW_NODES = [
    {
        id: 'bd-start',
        type: 'info',
        module: 1,
        title: 'Blood Draw: Rainbow, Tubes, Cultures, VBG',
        body: `Use this consult for bedside specimen collection when you need to decide whether a broad "rainbow" is justified, select the correct tube, or collect a VBG or blood cultures.

**Before drawing:** confirm the clinical question, check existing results, and use the local laboratory test directory. Cap colors, additives, fill volumes, inversion counts, and transport requirements can vary by manufacturer and institution. The label and local policy are the final authority. [1][2][3]

For culture ordering and stewardship rather than collection technique, open the [Blood Culture Stewardship consult](#/tree/blood-culture-stewardship).`,
        citation: [1, 2, 3],
        next: 'bd-rainbow',
        summary: 'Choose the minimum needed specimen, then match the tube or bottle to the test and local lab policy.',
        safetyLevel: 'warning',
    },
    {
        id: 'bd-rainbow',
        type: 'question',
        module: 1,
        title: 'What Are You Collecting?',
        body: 'A rainbow is a set of tubes collected during one venipuncture because several tests may be needed. It is not a substitute for deciding which tests will change management. Unnecessary repetitive phlebotomy can contribute to hospital-acquired anemia, while contaminated cultures can lead to unnecessary antibiotics and longer stays. [8][10]',
        citation: [8, 10],
        summary: 'Draw a rainbow when a broad workup is clinically justified, not automatically for every patient.',
        options: [
            {
                label: 'Several tests are clinically justified',
                description: 'The results are likely to change immediate evaluation or treatment',
                next: 'bd-prep',
            },
            {
                label: 'One or two targeted tests',
                description: 'A focused specimen set answers the clinical question',
                next: 'bd-targeted',
            },
            {
                label: 'Blood cultures only',
                description: 'Use the culture collection pathway and avoid treating cultures as ordinary tubes',
                next: 'bd-cultures',
                urgency: 'urgent',
            },
            {
                label: 'VBG only',
                description: 'Use a blood-gas syringe or other locally validated collection device',
                next: 'bd-vbg',
                urgency: 'urgent',
            },
            {
                label: 'Specimens already collected',
                description: 'Verify identifiers, source, fill, handling, and transport before sending',
                next: 'bd-label',
            },
        ],
    },
    {
        id: 'bd-targeted',
        type: 'info',
        module: 1,
        title: 'Targeted Collection',
        body: `A focused draw is usually safer and more useful than collecting every available tube.

- Name the clinical question and order only the tests that address it.
- Check whether a valid recent result already answers the question.
- Confirm whether the test requires serum, plasma, whole blood, a blood-gas syringe, a culture bottle, or a special tube.
- For coagulation, blood bank, lactate, and send-out testing, use the exact local specimen instructions.

Continue to the collection setup, then use the tube selector. [1][2][10]`,
        citation: [1, 2, 10],
        next: 'bd-prep',
        summary: 'Use the smallest specimen set that answers the clinical question and matches the local test directory.',
    },
    {
        id: 'bd-prep',
        type: 'info',
        module: 1,
        title: 'Prepare Before The Stick',
        body: `**Patient and order verification**
- Explain the draw and position the patient safely.
- Use two patient identifiers at the bedside.
- Match the electronic order, labels, tubes, and required specimen source before puncture.

**Site and equipment**
- Perform hand hygiene and wear gloves.
- Check tube or bottle expiration and inspect for damage.
- Prefer a clean peripheral site. Avoid an arm proximal to a running IV; follow local policy if line collection is unavoidable.
- Avoid prolonged venous stasis and pumping the fist. Release the tourniquet promptly after blood flow is established; do not leave it on longer than one minute when possible.
- Prep the skin with the approved antiseptic and allow it to dry. Do not repalpate the site unless using sterile technique.

The photograph shows a peripheral venipuncture setup. It is a public-domain U.S. Army image. [1][2]`,
        citation: [1, 2],
        images: [
            {
                src: 'images/blood-draw/blood-draw-venipuncture.jpg',
                alt: 'Clinician performing a peripheral venipuncture with a tourniquet and collection equipment',
                caption: 'Peripheral venipuncture. U.S. Army photo, public domain.',
            },
        ],
        next: 'bd-order',
        summary: 'Verify identity and orders, choose a clean site, prep the skin, and avoid IV contamination or prolonged stasis.',
        safetyLevel: 'warning',
    },
    {
        id: 'bd-order',
        type: 'info',
        module: 2,
        title: 'Standard Order Of Draw',
        body: `Use the local laboratory order when it differs. The usual sequence is:

1. **Blood culture bottles or culture tubes**
2. **Light blue** - citrate coagulation tube
3. **Serum tubes** - red and/or gold/SST
4. **Heparin tubes** - green or light green/PST
5. **EDTA tubes** - lavender, purple, or pink
6. **Gray** - fluoride/oxalate or platform-specific glucose tube
7. **Yellow ACD or other specialty tubes** - follow the test directory; placement varies by additive and institution

This order reduces additive carryover. A light-blue tube must be filled to its line. If a light-blue tube is the first tube collected with a butterfly, a discard tube may be needed to clear device dead space according to local policy. Do not rely on cap color alone. [2][3][4]`,
        citation: [2, 3, 4],
        next: 'bd-technique',
        summary: 'Cultures -> citrate blue -> serum -> heparin -> EDTA -> gray; follow local policy for specialty tubes.',
    },
    {
        id: 'bd-technique',
        type: 'info',
        module: 2,
        title: 'Collect, Mix, Label, Transport',
        body: `During collection:
- Use the correct evacuated tube, syringe, or bottle for the ordered test.
- Fill liquid-additive tubes to the required mark. Underfilling is especially important for citrate coagulation specimens.
- Release the tourniquet as soon as practical after flow is established.
- Gently invert tubes the number of times specified by the manufacturer or local laboratory. Do not shake.
- Never force blood from a syringe through a needle into a vacuum tube. Use the approved transfer device or collection system.
- Label specimens at the bedside immediately after collection. Do not pre-label an empty tube.
- Send promptly at the temperature and time specified by the test directory. Never transfer blood between tube types. [1][2][4]`,
        citation: [1, 2, 4],
        next: 'bd-tube-choice',
        summary: 'Fill correctly, gently mix, label at bedside, and send promptly using the local handling instructions.',
    },
    {
        id: 'bd-tube-choice',
        type: 'question',
        module: 2,
        title: 'Which Specimen Type?',
        body: 'Select the specimen that matches the test order. The examples below are common uses, not a replacement for the local laboratory directory.',
        citation: [2, 3, 4],
        summary: 'Match the test to the additive and specimen type, then verify fill and mixing requirements.',
        options: [
            {
                label: 'Coagulation testing',
                description: 'PT/INR, aPTT, fibrinogen, D-dimer, or another citrate-based test',
                next: 'bd-blue',
            },
            {
                label: 'Serum chemistry or serology',
                description: 'BMP/CMP, hepatic panel, lipase, and many antibody or hormone tests',
                next: 'bd-serum',
            },
            {
                label: 'Plasma chemistry',
                description: 'Electrolytes or other tests validated for lithium- or sodium-heparin plasma',
                next: 'bd-green',
            },
            {
                label: 'CBC, HbA1c, or blood bank',
                description: 'Whole blood EDTA specimen; choose lavender or pink as specified',
                next: 'bd-edta',
            },
            {
                label: 'Glucose or a lab-specific lactate protocol',
                description: 'Use the gray tube or other tube specified by the local laboratory',
                next: 'bd-gray',
            },
            {
                label: 'Yellow or other specialty tube',
                description: 'ACD, SPS, HLA, genetics, or another test with a special additive',
                next: 'bd-yellow-specialty',
            },
            {
                label: 'Blood cultures',
                description: 'Use culture bottles, aseptic skin preparation, and the culture pathway',
                next: 'bd-cultures',
                urgency: 'urgent',
            },
            {
                label: 'VBG',
                description: 'Use a heparinized blood-gas syringe or locally validated specimen container',
                next: 'bd-vbg',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'bd-blue',
        type: 'result',
        module: 3,
        title: 'Light Blue: Citrate Coagulation Tube',
        body: `**Additive and why:** buffered sodium citrate reversibly binds calcium. This preserves the coagulation reaction until the laboratory adds calcium during testing.

**Common uses:** PT/INR, aPTT, fibrinogen, D-dimer, and other tests listed by the local laboratory.

**Collection requirements:**
- Fill completely to the marked line to maintain the required 9:1 blood-to-citrate ratio.
- Underfilling can produce falsely prolonged coagulation results.
- Gently invert 3-4 times or follow the manufacturer's instructions.
- If this is the first tube with a butterfly, use a discard tube only if required by local policy to clear tubing dead space.
- Do not collect from a heparinized line unless the laboratory has a validated line-draw protocol.
- Ask the laboratory about high hematocrit adjustment because excess citrate can alter results. [2][3][4]`,
        recommendation: 'Use a full light-blue citrate tube in the correct order. Fill volume and the blood-to-citrate ratio are critical.',
        confidence: 'recommended',
        citation: [2, 3, 4],
        summary: 'Light blue = sodium citrate; fill to the line, preserve the 9:1 ratio, and gently mix.',
        safetyLevel: 'warning',
    },
    {
        id: 'bd-serum',
        type: 'result',
        module: 3,
        title: 'Red Or Gold: Serum Tube',
        body: `**Additive and why:**
- Red tubes may be plain or contain a clot activator, depending on the product.
- Gold or tiger-top SST tubes contain a clot activator and polymer gel. The clot forms above the gel, allowing serum separation after centrifugation.

**Common uses:** BMP/CMP, hepatic panel, lipase, and many serology, endocrine, and therapeutic drug tests. The exact tube depends on the local test directory.

**Collection requirements:**
- Fill to the required volume and gently invert according to the product label, often about 5 times for plastic serum tubes.
- Allow the specimen to clot for the local validated time before centrifugation.
- Do not shake or centrifuge immediately when clotting is required.
- Some tests require a plain red tube, a special transport tube, or a different handling temperature. Verify before drawing. [2][3][4]`,
        recommendation: 'Red and gold are serum tubes, but the additive and clotting requirements are product-specific. Check the test directory.',
        confidence: 'recommended',
        citation: [2, 3, 4],
        summary: 'Red/gold = serum; clot first, mix gently, and verify the exact product for the ordered test.',
    },
    {
        id: 'bd-green',
        type: 'result',
        module: 3,
        title: 'Green Or Light Green: Heparin Plasma',
        body: `**Additive and why:** lithium or sodium heparin inhibits clot formation through antithrombin activity, allowing plasma testing. Light-green PST tubes also contain a separator gel.

**Common uses:** chemistry and electrolyte testing validated for heparinized plasma.

**Collection requirements:**
- Confirm whether the test requires lithium heparin, sodium heparin, or serum. These are not interchangeable.
- Do not use a lithium-heparin tube for a lithium level unless the laboratory specifically validates it; contamination can affect the result.
- Gently invert according to the tube label, commonly 8-10 times for heparin tubes.
- Do not allow the specimen to clot. Follow local centrifugation and transport instructions. [2][3][4]`,
        recommendation: 'Use the heparin additive requested by the test directory and mix gently enough to prevent clotting without hemolysis.',
        confidence: 'recommended',
        citation: [2, 3, 4],
        summary: 'Green = heparin plasma; lithium and sodium heparin have different appropriate uses.',
    },
    {
        id: 'bd-edta',
        type: 'result',
        module: 3,
        title: 'Lavender, Purple, Or Pink: EDTA Whole Blood',
        body: `**Additive and why:** K2EDTA chelates calcium and preserves cellular components for whole-blood testing.

**Common uses:**
- Lavender or purple: CBC, differential, platelets, and HbA1c when validated.
- Pink: transfusion testing, type and screen, and other blood-bank specimens. Pink tubes require blood-bank-specific labeling and identification procedures.

**Collection requirements:**
- Fill to the required volume and gently invert according to the product label, commonly 8-10 times.
- Check for clots, inadequate volume, and hemolysis before sending.
- Do not substitute a lavender tube for a pink blood-bank specimen or vice versa unless the laboratory explicitly permits it.
- Apply the blood-bank label at the bedside using the required identifiers, date/time, and collector information. [2][3][4]`,
        recommendation: 'Use EDTA for the validated whole-blood test, then protect specimen identification and blood-bank labeling requirements.',
        confidence: 'recommended',
        citation: [2, 3, 4],
        summary: 'Lavender/purple/pink = EDTA; mix gently, prevent clots, and follow special blood-bank labeling rules.',
        safetyLevel: 'warning',
    },
    {
        id: 'bd-gray',
        type: 'result',
        module: 3,
        title: 'Gray: Fluoride/Oxalate Or Platform-Specific Tube',
        body: `**Additive and why:** many gray tubes use sodium fluoride to slow glycolysis plus an anticoagulant such as potassium oxalate. Other platforms use a different formulation.

**Common uses:** glucose and selected lactate or metabolic testing when specified by the local laboratory.

**Collection requirements:**
- Use the tube listed in the test directory. Lactate handling, ice requirements, transport time, and acceptable specimen type vary by method.
- Fill to the required volume and gently invert according to the product label, commonly 8-10 times.
- Do not assume that every gray tube is acceptable for lactate or that ice is required for every platform.
- Send promptly using the local transport instructions. [2][3][4]`,
        recommendation: 'Gray usually preserves glucose, but lactate and other handling details are method-specific. Check the local test directory.',
        confidence: 'recommended',
        citation: [2, 3, 4],
        summary: 'Gray often contains fluoride/oxalate; glucose is common, while lactate handling is laboratory-specific.',
    },
    {
        id: 'bd-yellow-specialty',
        type: 'result',
        module: 3,
        title: 'Yellow Or Specialty: Read The Additive',
        body: `Yellow is not one universal specimen type.

- **SPS culture tube or culture bottle:** used for microbiology when specified. Follow the culture bottle protocol rather than treating it like a routine yellow tube.
- **ACD tube:** acid citrate dextrose preserves cells or nucleic acids for selected HLA, genetics, and specialty testing.
- Other colors may identify specialty products from a particular manufacturer.

Read the printed additive and test-directory instructions. Cap color alone does not tell you whether the specimen contains SPS, ACD, clot activator, EDTA, or another additive. Verify order, fill, inversion, temperature, and transport time before collection. [2][3][4]`,
        recommendation: 'For yellow and specialty tubes, read the additive label and local test directory before drawing. Never infer the test from color alone.',
        confidence: 'recommended',
        citation: [2, 3, 4],
        summary: 'Yellow can mean SPS culture or ACD specialty testing; the printed additive and local directory decide.',
        safetyLevel: 'warning',
    },
    {
        id: 'bd-cultures',
        type: 'result',
        module: 4,
        title: 'Blood Cultures: Aseptic Collection',
        body: `Use this pathway when cultures are clinically indicated. For the decision to order cultures and interpretation of positive results, see the [Blood Culture Stewardship consult](#/tree/blood-culture-stewardship).

**Adult collection**
- Collect at least two sets when possible, usually from separate peripheral venipuncture sites. A set commonly includes one aerobic and one anaerobic bottle.
- Collect before antimicrobials when feasible, but do not delay time-critical antibiotics in an unstable patient.
- Use two patient identifiers. Prep the venipuncture site with an alcohol-containing skin disinfectant and allow it to dry. Do not repalpate after prep unless using sterile technique.
- Disinfect each bottle septum with 70% isopropyl alcohol and allow it to dry.
- Aim for the bottle volume specified by the system, commonly 10 mL per adult bottle. Volume is a major determinant of yield; document actual volume if your system requires it.
- Follow local instructions for aerobic versus anaerobic bottle order because the order can differ with a syringe versus a butterfly or other collection device.
- Document date/time, exact collection site, peripheral versus line source, method, collector, and any difficult collection details. Transport immediately.

**Line and pediatric considerations**
- Draw from a line only when line infection is suspected or peripheral access is not possible, and label the source. Paired peripheral and line cultures may be needed.
- Pediatric volumes are weight- and system-dependent. Follow the pediatric blood-culture policy; do not apply adult volumes automatically.

The photograph shows a blood collection tube. It is licensed CC0. [1][5][8]`,
        images: [
            {
                src: 'images/blood-draw/collection-tube.jpg',
                alt: 'Close-up photograph of a blood collection tube used for laboratory specimen collection',
                caption: 'Blood collection tube. Fumikas Sagisavas, CC0.',
            },
        ],
        recommendation: 'Use aseptic skin and bottle preparation, adequate volume, separate sites when possible, complete documentation, and immediate transport.',
        confidence: 'recommended',
        citation: [1, 5, 8],
        summary: 'Adult cultures: at least two sets when possible, adequate bottle volume, aseptic technique, and separate documented sites.',
        safetyLevel: 'critical',
    },
    {
        id: 'bd-vbg',
        type: 'result',
        module: 5,
        title: 'VBG: Collect And Send Promptly',
        body: `A peripheral VBG can help assess pH and carbon dioxide in appropriate clinical contexts. It is not an oxygenation test.

**Collection**
- Use a balanced lithium- or sodium-heparin blood-gas syringe, or another specimen container validated by the local analyzer.
- Prefer a peripheral venous sample when that is the intended source. Avoid drawing from an arm with a running IV; document a line source if a validated line protocol is used.
- Avoid prolonged tourniquet time, fist pumping, and a traumatic draw when possible.
- Fill to the analyzer's required volume. Expel visible air bubbles immediately, cap the syringe, and gently roll or invert to mix the anticoagulant. Do not shake.
- Record collection time and clinically relevant oxygen or ventilatory support. Send for analysis immediately and stay within the local laboratory's validated stability window.

**Interpretation and rejection traps**
- Venous pO2 and oxygen saturation cannot reliably determine arterial oxygenation. Use pulse oximetry and an ABG or other validated method when oxygenation is the question. [6][7][9]
- Delayed analysis, air bubbles, clots, gross hemolysis, IV contamination, or an unvalidated specimen container can make the result unreliable.
- A peripheral VBG protocol is not automatically interchangeable with an arterial or central-line protocol. Follow the analyzer and local laboratory instructions. [2][6][7]`,
        recommendation: 'Expel air immediately, mix gently, and send the VBG promptly. Do not use venous pO2 to assess oxygenation.',
        confidence: 'recommended',
        citation: [2, 6, 7, 9],
        summary: 'VBG pH/PCO2 can be useful; eliminate air and delay, and use ABG or another validated method for oxygenation.',
        safetyLevel: 'critical',
    },
    {
        id: 'bd-label',
        type: 'result',
        module: 6,
        title: 'Final Check: Label, Quality, Send',
        body: `Before the specimen leaves the bedside, verify:

- Patient identity matches the order and the label using the required identifiers.
- Test, specimen type, tube or bottle additive, and source are correct.
- Tube or bottle is filled to the required volume and not clotted, leaking, or grossly hemolyzed.
- Tube has been gently mixed as directed.
- Collection date/time, source, collector, and special handling are documented when required.
- Transport time, temperature, light protection, and delivery method match the test directory.

Do not relabel an unidentified or mismatched specimen away from the bedside. Follow the laboratory's rejection and redraw process. Never transfer a specimen between tube types. [1][2][4][5]`,
        recommendation: 'A correct draw is not complete until the specimen is identified, quality-checked, documented, and transported under the required conditions.',
        confidence: 'recommended',
        citation: [1, 2, 4, 5],
        summary: 'Verify identity, tube/additive, fill, mixing, source, timing, and transport before sending.',
        safetyLevel: 'warning',
    },
];
export const BLOOD_DRAW_MODULE_LABELS = [
    'Decide + Prepare',
    'Order Of Draw',
    'Tube Reference',
    'Blood Cultures',
    'VBG',
    'Verify + Send',
];
export const BLOOD_DRAW_CITATIONS = [
    { num: 1, text: 'World Health Organization. Guidelines on Drawing Blood: Best Practices in Phlebotomy. 2010. https://www.who.int/publications/i/item/9789241599221' },
    { num: 2, text: 'UCSF Clinical Laboratories. Specimen Collection. https://clinlab.ucsf.edu/specimen-collection' },
    { num: 3, text: 'University of Iowa Health Care Pathology Handbook. Phlebotomy Tubes and Order of Draw. https://www.healthcare.uiowa.edu/path_handbook/Appendix/new_tubes/_tube_tops.html' },
    { num: 4, text: 'University of Texas Health Science Center at San Antonio, Department of Pathology. Specimen Collection Guidelines Policy. 2021. https://lsom.uthscsa.edu/pathology/wp-content/uploads/sites/94/2021/12/Specimen-Collection-Guidelines-Policy.pdf' },
    { num: 5, text: 'Centers for Disease Control and Prevention. Collect Adult Blood Culture Sets. Updated 2026. https://www.cdc.gov/lab-quality/php/preventing-adult-blood-culture-contamination/collect.html' },
    { num: 6, text: 'Michigan Medicine Department of Pathology. Point-of-Care Venous Blood Gas, test ID 5688. https://www.pathology.med.umich.edu/handbook/details?print=1&testID=5688' },
    { num: 7, text: 'University of Iowa Health Care Pathology Handbook. Venous (Peripheral) Blood Gas. https://www.healthcare.uiowa.edu/path_handbook/handbook/test3479.html' },
    { num: 8, text: 'Agency for Healthcare Research and Quality. Blood Culture Practices and Stewardship. https://www.ahrq.gov/hai/tools/mrsa-prevention/toolkit/blood-culture.html' },
    { num: 9, text: 'American Association for Respiratory Care. Clinical Practice Guideline: Blood Gas Analysis and Hemoximetry. Respir Care. 2013;58(10):1694-1703. https://journals.sagepub.com/doi/10.4187/respcare.02786' },
    { num: 10, text: 'American Society of Hematology. Choosing Wisely: avoid repetitive CBC and chemistry testing in clinically and lab-stable patients. https://www.hematology.org/education/clinicians/guidelines-and-quality-care/choosing-wisely' },
];
export const BLOOD_DRAW_CRITICAL_ACTIONS = [
    { text: 'Use two patient identifiers and label every specimen at the bedside.', nodeId: 'bd-prep' },
    { text: 'Draw blood cultures with aseptic technique and adequate bottle volume when clinically indicated.', nodeId: 'bd-cultures' },
    { text: 'Fill citrate tubes to the line to preserve the 9:1 blood-to-citrate ratio.', nodeId: 'bd-blue' },
    { text: 'Expel VBG air immediately, mix gently, and send for prompt analysis.', nodeId: 'bd-vbg' },
    { text: 'Never infer an additive from cap color alone or transfer blood between tube types.', nodeId: 'bd-yellow-specialty' },
];
export const BLOOD_DRAW_NODE_COUNT = BLOOD_DRAW_NODES.length;
