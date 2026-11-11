// MedKitt: Hemolytic Anemia Consult (added 2026-11-11)
// Confirm hemolysis → Can't-miss causes → DAT and smear → Warm AIHA → Cold agglutinin disease → G6PD / drug-induced / DAT-negative → Transfusion → Disposition
// 8 modules. Doses live in drug entries; lab interpretation and RPI live in calculators.
// Sources: BSH primary AIHA guideline 2017, BSH drug-induced and secondary AIHA guideline 2017, First International Consensus on AIHA (Blood Rev 2020),
// Phillips & Henderson AFP 2018, Marchand JAMA 1980, Roth NEJM 2021 (sutimlimab), Luzzatto Blood 2020 (G6PD), Carson JAMA 2023 (transfusion thresholds).
export const HEMOLYTIC_ANEMIA_NODES = [
    // =====================================================================
    // MODULE 1: IS IT HEMOLYSIS?
    // =====================================================================
    {
        id: 'hemolytic-anemia-start',
        type: 'info',
        module: 1,
        title: 'Hemolytic Anemia: Is It Hemolysis?',
        body: '[Hemolytic Anemia Steps Summary](#/info/hemolytic-anemia-summary): stepwise approach.\n\n**Hemolysis = red cells destroyed early.** It shows as anemia with signs of red cell breakdown and a marrow trying to keep up.\n\n**Send the hemolysis panel:** CBC, reticulocytes, LDH, haptoglobin, indirect bilirubin, peripheral smear, direct antiglobulin test (DAT, Coombs), urinalysis, type and screen.\n\n**Reading it:**\n• **LDH high + haptoglobin under 25 mg/dL:** hemolysis likely.\n• **LDH and haptoglobin both normal:** hemolysis unlikely.\n• **Hemoglobinuria** (dipstick blood, few RBCs) = intravascular hemolysis.\n• A **low reticulocyte count does not exclude it** (early, or marrow suppression). [1][2]\n\n**DO-NOT-MISS:**\n• **Schistocytes + low platelets = TMA** (TTP until proven otherwise).\n• **Hemolysis during a transfusion:** stop the transfusion.\n• **Falling hemoglobin with a low reticulocyte count** can crash fast.',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'hemolysis-labs', label: 'Hemolysis Labs' },
            { id: 'reticulocyte-index', label: 'Reticulocyte Index' },
        ],
        next: 'hemolytic-anemia-danger',
        summary: 'LDH high + haptoglobin low = hemolysis; then smear and DAT',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 2: CAN'T-MISS CAUSES
    // =====================================================================
    {
        id: 'hemolytic-anemia-danger',
        type: 'question',
        module: 2,
        title: 'Danger Screen',
        body: 'Before working out the cause, rule out the three emergencies.',
        options: [
            {
                label: 'Schistocytes with low platelets',
                description: 'Microangiopathic hemolysis (MAHA): TTP, HUS, DIC, HELLP, malignant hypertension',
                next: 'hemolytic-anemia-tma',
                urgency: 'critical',
            },
            {
                label: 'Started during or after a transfusion',
                description: 'Fever, back pain, red urine, hypotension, or hemoglobin falling 3-14 days after transfusion',
                next: 'hemolytic-anemia-transfusion-rxn',
                urgency: 'critical',
            },
            {
                label: 'None of these',
                description: 'Go to DAT and smear',
                next: 'hemolytic-anemia-dat',
            },
        ],
        summary: 'TMA and transfusion reactions first',
    },
    {
        id: 'hemolytic-anemia-tma',
        type: 'info',
        module: 2,
        title: 'Microangiopathic Hemolysis (TMA)',
        body: '**Schistocytes + thrombocytopenia + hemolysis = thrombotic microangiopathy** until proven otherwise. Untreated TTP is often fatal, so do not wait for ADAMTS13.\n\n• Check the [PLASMIC score](#/calculator/ttp-plasmic), coagulation tests (DIC), creatinine, pregnancy status and blood pressure.\n• **High PLASMIC: urgent hematology for plasma exchange.** Open the [TTP consult](#/tree/ttp).\n• Bloody diarrhea, especially in a child: STEC-HUS.\n• **Avoid platelet transfusion in suspected TTP** unless there is life-threatening bleeding. [1][3]',
        citation: [1, 3],
        images: [{
                src: 'images/hemolytic-anemia/schistocytes-smear.jpg',
                alt: 'Peripheral blood smear: mostly round red cells with pale centres, plus several small fragmented and helmet-shaped red cells (schistocytes) scattered among them.',
                caption: 'Schistocytes (fragmented red cells) among normal cells; cropped. (CC0, Prof. Osaro Erhabor, via Wikimedia Commons.)',
            }],
        calculatorLinks: [
            { id: 'ttp-plasmic', label: 'PLASMIC Score' },
            { id: 'ttp-tma-ddx', label: 'TMA Differential' },
            { id: 'ttp', label: 'TTP Consult', kind: 'tree' },
        ],
        recommendation: 'Schistocytes with thrombocytopenia: treat as TMA. Calculate PLASMIC and involve hematology urgently for plasma exchange if TTP is likely; avoid platelet transfusion unless life-threatening bleeding.',
        confidence: 'recommended',
        summary: 'TMA: PLASMIC, urgent hematology, plasma exchange; no platelets in TTP',
        safetyLevel: 'critical',
    },
    {
        id: 'hemolytic-anemia-transfusion-rxn',
        type: 'info',
        module: 2,
        title: 'Hemolytic Transfusion Reaction',
        body: '**Acute (during or within 24 h):** usually ABO incompatibility. **Stop the transfusion**, keep the line open with saline, check patient and unit identity, and send the bag with fresh samples (DAT, repeat type and screen, hemolysis panel, urinalysis) to the blood bank. Support the blood pressure, keep urine output up, and watch for DIC.\n\n**Delayed (3-14 days):** falling hemoglobin, jaundice and a new positive DAT from an alloantibody. Tell the blood bank so future units are antigen-negative.\n\n**Sickle cell disease:** a delayed reaction can destroy the patient\'s own cells too (hyperhemolysis), so hemoglobin ends up lower than before the transfusion. Further transfusion can make it worse: get hematology involved early. [4][5]',
        citation: [4, 5],
        calculatorLinks: [
            { id: 'blood-transfusions', label: 'Acute Hemolytic Reaction', kind: 'tree', node: 'bt-ahtr' },
            { id: 'sickle-cell', label: 'Sickle Cell Consult', kind: 'tree' },
        ],
        recommendation: 'Suspected acute hemolytic transfusion reaction: stop the transfusion, check identity, return the unit with fresh samples to the blood bank, and support blood pressure and urine output.',
        confidence: 'recommended',
        summary: 'Stop the transfusion, check identity, send the bag; delayed reactions at 3-14 days',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 3: DAT AND SMEAR
    // =====================================================================
    {
        id: 'hemolytic-anemia-dat',
        type: 'question',
        module: 3,
        title: 'Direct Antiglobulin Test (DAT)',
        body: 'The DAT shows whether antibody or complement is coating the red cells. The pattern sorts the cause.\n\n• **IgG (with or without C3):** warm autoimmune hemolytic anemia (AIHA).\n• **C3 only:** cold agglutinin disease (or PCH in a child after a viral illness).\n• **Negative:** non-immune cause; let the smear guide you.\n\n**Always ask:** any new drug? Recent transfusion? [1][4]',
        citation: [1, 4],
        images: [{
                src: 'images/hemolytic-anemia/smear-clues.svg',
                alt: 'Schematic of six red cell shapes with their causes: normal cell with central pallor; spherocyte, small and dense with no pallor (warm AIHA, hereditary spherocytosis); schistocyte, helmet-shaped fragment (TTP, HUS, DIC, valve, HELLP); bite cell with a bite out of the edge (G6PD deficiency); agglutinated clump (cold agglutinin disease); sickle cell crescent.',
                caption: 'Smear clues to the cause of hemolysis. Schematic, not to scale. (myMedKitt original diagram.)',
            }],
        options: [
            {
                label: 'DAT positive: IgG (± C3)',
                description: 'Spherocytes on smear',
                next: 'hemolytic-anemia-warm',
            },
            {
                label: 'DAT positive: C3 only',
                description: 'Agglutination on smear, worse in the cold, acrocyanosis',
                next: 'hemolytic-anemia-cold',
            },
            {
                label: 'DAT negative',
                description: 'Smear-guided: bite cells, spherocytes, sickle cells, parasites',
                next: 'hemolytic-anemia-dat-negative',
            },
            {
                label: 'New drug started in the last weeks',
                description: 'Ceftriaxone, piperacillin, cefotetan, oxidant drugs',
                next: 'hemolytic-anemia-drug',
            },
        ],
        summary: 'IgG = warm AIHA; C3 only = cold; negative = smear-guided',
    },
    // =====================================================================
    // MODULE 4: WARM AIHA
    // =====================================================================
    {
        id: 'hemolytic-anemia-warm',
        type: 'info',
        module: 4,
        title: 'Warm AIHA: Recognition',
        body: '**IgG autoantibody, cleared in the spleen.** Smear shows **spherocytes**. About half are secondary: look for **lymphoma or CLL, lupus, immunodeficiency, recent drugs, and infection**. Send a blood film review, HIV, hepatitis B and C (before rituximab), and consider CT for lymphoma in older adults.\n\n**Severity markers:** hemoglobin under 8 g/dL, falling fast, low reticulocytes, chest pain, syncope or heart failure. These patients need treatment now and close monitoring. [1][6]',
        citation: [1, 6],
        next: 'hemolytic-anemia-warm-tx',
        summary: 'Spherocytes; look for lymphoma, CLL, lupus, drugs',
    },
    {
        id: 'hemolytic-anemia-warm-tx',
        type: 'info',
        module: 4,
        title: 'Warm AIHA: Treatment',
        body: '**First line:** [Prednisone](#/drug/prednisone/warm autoimmune hemolytic anemia) **1 mg/kg/day PO**. Expect a response within about 3 weeks; hematology then tapers slowly over months. [1][6]\n\n**Severe or rapidly falling hemoglobin:**\n• [Methylprednisolone](#/drug/methylprednisolone/warm autoimmune hemolytic anemia) IV for fulminant cases (evidence limited to case reports).\n• [IVIG](#/drug/ivig/warm autoimmune hemolytic anemia) or plasma exchange as a temporary rescue.\n• Consider adding [rituximab](#/drug/rituximab-ttp/warm autoimmune hemolytic anemia) early with the steroid. [1][6][7]\n\n**For everyone:**\n• [Folic acid](#/drug/folic-acid/hemolytic anemia) supplementation.\n• **VTE prophylaxis** with [enoxaparin](#/drug/enoxaparin/vte prophylaxis) for in-patients with active hemolysis; clots are common in AIHA.\n• Stop any suspect drug. [1]\n\n**Transfusion:** do not withhold blood from a patient with life-threatening anemia because the crossmatch is "incompatible". See [Transfusion](#/node/hemolytic-anemia-transfusion).',
        citation: [1, 6, 7],
        recommendation: 'Warm AIHA: prednisone 1 mg/kg/day; for severe disease add rescue therapy (IVIG or plasma exchange) and consider early rituximab with hematology. Give folic acid and LMWH prophylaxis to in-patients with active hemolysis.',
        confidence: 'recommended',
        summary: 'Prednisone 1 mg/kg/day; rituximab early if severe; folic acid and LMWH',
    },
    // =====================================================================
    // MODULE 5: COLD AGGLUTININ DISEASE
    // =====================================================================
    {
        id: 'hemolytic-anemia-cold',
        type: 'info',
        module: 5,
        title: 'Cold Agglutinin Disease',
        body: '**IgM antibody that binds red cells in the cold, then fixes complement.** DAT is C3-positive. Clues: **acrocyanosis**, symptoms worse in winter, and a **clumped smear or a CBC with falsely high MCV and low RBC count** (the sample agglutinates at room temperature).\n\n**Secondary causes:** Mycoplasma pneumoniae, EBV and other infections, and lymphoma (B-cell clone in primary disease).\n\n**Lab tip:** keep the samples at 37 °C until separated, or the results will be wrong. [1][8]',
        citation: [1, 8],
        next: 'hemolytic-anemia-cold-tx',
        summary: 'C3-only DAT, acrocyanosis, clumped smear; Mycoplasma, EBV, lymphoma',
    },
    {
        id: 'hemolytic-anemia-cold-tx',
        type: 'info',
        module: 5,
        title: 'Cold Agglutinin Disease: Treatment',
        body: '**Keep the patient warm:** warm room, warm IV fluids, and a **blood warmer for transfusion**. Avoid active cooling. [1]\n\n**Steroids usually do not work** in cold agglutinin disease (partial, unsustained responses). A trial can be considered only as rescue. [1]\n\n**When treatment is needed** (symptomatic anemia, transfusion dependence): [rituximab](#/drug/rituximab-ttp/cold agglutinin disease), alone or with bendamustine, is first line. [Sutimlimab](#/drug/sutimlimab/cold agglutinin disease) (a C1s complement inhibitor) stops hemolysis and raises hemoglobin while given. [6][9]\n\n**Life-threatening:** plasma exchange can bridge (the circuit must be kept warm). Treat the trigger (e.g. Mycoplasma). [Folic acid](#/drug/folic-acid/hemolytic anemia) for chronic hemolysis. [1]',
        citation: [1, 6, 9],
        recommendation: 'Cold agglutinin disease: keep warm and transfuse through a blood warmer; steroids are generally ineffective. Rituximab (with or without bendamustine) or sutimlimab under hematology; plasma exchange as a bridge for life-threatening hemolysis.',
        confidence: 'recommended',
        summary: 'Keep warm, blood warmer; steroids rarely help; rituximab or sutimlimab',
    },
    // =====================================================================
    // MODULE 6: DAT-NEGATIVE AND DRUG-INDUCED
    // =====================================================================
    {
        id: 'hemolytic-anemia-dat-negative',
        type: 'question',
        module: 6,
        title: 'DAT-Negative Hemolysis',
        body: 'Non-immune causes, sorted by the smear and the story. A small number of AIHA cases are DAT-negative, so ask the blood bank for more sensitive testing if spherocytes are present and nothing else fits. [2][4]',
        citation: [2, 4],
        options: [
            {
                label: 'Bite or blister cells, after an oxidant trigger',
                description: 'Fava beans, infection, dapsone, primaquine, rasburicase, methylene blue',
                next: 'hemolytic-anemia-g6pd',
            },
            {
                label: 'Parasites or sepsis',
                description: 'Malaria, babesiosis, Clostridium perfringens',
                next: 'hemolytic-anemia-other',
                urgency: 'critical',
            },
            {
                label: 'Spherocytes, sickle cells, or other',
                description: 'Hereditary spherocytosis, sickle cell disease, PNH, Wilson disease, burns, valves',
                next: 'hemolytic-anemia-other',
            },
        ],
        summary: 'Bite cells = G6PD; parasites or sepsis are urgent; then inherited and rare causes',
    },
    {
        id: 'hemolytic-anemia-g6pd',
        type: 'info',
        module: 6,
        title: 'G6PD Deficiency',
        body: '**X-linked; red cells cannot handle oxidant stress.** Hemolysis starts 1-3 days after a trigger: infection, fava beans, or drugs such as **dapsone, primaquine, tafenoquine, rasburicase, nitrofurantoin and methylene blue**. Smear: bite and blister cells (Heinz bodies with special stain).\n\n• **Stop the trigger** and treat infection. Usually self-limited; transfuse for severe anemia.\n• **G6PD level can be falsely normal during a crisis** (young cells have more enzyme). Repeat about 3 months later if negative.\n• **Methylene blue can cause hemolysis** and does not work in G6PD deficiency: methemoglobinemia needs another plan. [10]',
        citation: [10],
        calculatorLinks: [
            { id: 'methb-g6pd-risk', label: 'MetHb / G6PD Risk' },
        ],
        recommendation: 'G6PD deficiency: stop the oxidant trigger, treat infection, and transfuse for severe anemia. Avoid methylene blue and rasburicase. A normal G6PD level during acute hemolysis does not exclude deficiency.',
        confidence: 'recommended',
        summary: 'Stop the trigger; G6PD level falsely normal in a crisis; no methylene blue',
    },
    {
        id: 'hemolytic-anemia-other',
        type: 'info',
        module: 6,
        title: 'Other DAT-Negative Causes',
        body: '**Urgent:**\n• **Malaria** (travel) and **babesiosis** (ticks, asplenia): thick and thin smears. Severe disease may need exchange.\n• **Clostridium perfringens sepsis:** massive intravascular hemolysis, very fast. Antibiotics and source control now.\n\n**Inherited:** hereditary spherocytosis (family history, splenomegaly, DAT-negative spherocytes), [sickle cell disease](#/tree/sickle-cell) (aplastic crisis with parvovirus B19, splenic sequestration).\n\n**Acquired:** **PNH** (hemoglobinuria, clots in unusual sites, cytopenias; send flow cytometry), **Wilson disease** (young patient with liver failure and hemolysis), mechanical valves, burns, snake envenomation, march hemoglobinuria. [2]',
        citation: [2],
        next: 'hemolytic-anemia-transfusion',
        summary: 'Malaria, babesiosis, Clostridium are urgent; consider PNH, Wilson, inherited causes',
    },
    {
        id: 'hemolytic-anemia-drug',
        type: 'info',
        module: 6,
        title: 'Drug-Induced Immune Hemolysis',
        body: '**Stop the drug.** This is the main treatment. Hemolysis usually settles once the drug is gone.\n\n• **Most common culprits:** ceftriaxone, piperacillin and other penicillins, cefotetan.\n• **Ceftriaxone** can cause sudden, severe intravascular hemolysis within minutes of a dose, especially in children and in sickle cell disease. It can be fatal: stop it and avoid it in the future.\n• Other agents: NSAIDs, fludarabine, oxaliplatin, checkpoint inhibitors.\n• DAT is often positive. Tell the blood bank the drug name so they can test for drug-dependent antibodies.\n• Steroids are often given but evidence of benefit is limited. [4]',
        citation: [4],
        recommendation: 'Suspected drug-induced immune hemolytic anemia: stop the drug immediately and record it as an allergy. Treat severe anemia with transfusion.',
        confidence: 'recommended',
        next: 'hemolytic-anemia-transfusion',
        summary: 'Stop the drug; ceftriaxone can cause fatal acute hemolysis',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 7: TRANSFUSION
    // =====================================================================
    {
        id: 'hemolytic-anemia-transfusion',
        type: 'info',
        module: 7,
        title: 'Transfusion in Hemolysis',
        body: '**Thresholds:** hemoglobin under 7 g/dL for most stable patients, under 8 g/dL with heart disease. Transfuse for symptoms (chest pain, syncope, heart failure, rapid fall) whatever the number. [11]\n\n**Autoimmune hemolysis:** the autoantibody makes every crossmatch look "incompatible", and full workup can take 4-6 hours. **If anemia is life-threatening in that time, transfuse ABO, Rh and K matched red cells; do not withhold blood.** Call the blood bank early and tell them the diagnosis. Most patients tolerate these units. [1]\n\n**Cold agglutinin disease:** use a **blood warmer** and keep the patient warm. [1]\n\nGive small volumes (1 unit at a time) and recheck: [packed red cells](#/drug/packed-rbcs/adult transfusion).',
        citation: [1, 11],
        calculatorLinks: [
            { id: 'blood-transfusions', label: 'AIHA Transfusion', kind: 'tree', node: 'bt-aiha' },
        ],
        recommendation: 'In AIHA with life-threatening anemia, do not delay transfusion for full compatibility testing: give ABO, Rh and K matched red cells, and use a blood warmer in cold agglutinin disease.',
        confidence: 'recommended',
        next: 'hemolytic-anemia-dispo',
        summary: 'Hb <7 (or <8 cardiac) or symptoms; never withhold blood in AIHA',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 8: DISPOSITION
    // =====================================================================
    {
        id: 'hemolytic-anemia-dispo',
        type: 'info',
        module: 8,
        title: 'Disposition',
        body: '**ICU or step-down:** TMA, hemolytic transfusion reaction, Clostridium sepsis, severe malaria, hemoglobin under 6 g/dL or falling fast, cardiac ischemia or heart failure.\n\n**Admit with hematology:** new AIHA or cold agglutinin disease needing treatment, hemoglobin under 8 g/dL, low reticulocyte count with hemolysis, transfusion need, or unclear cause.\n\n**Discharge** only when hemoglobin is stable, the cause is clear and self-limited (e.g. mild G6PD episode after the trigger is stopped), and follow-up with a repeat CBC is arranged within a few days. Give a list of drugs and foods to avoid in G6PD deficiency. [1][2]',
        citation: [1, 2],
        recommendation: 'Admit new autoimmune hemolysis, hemoglobin under 8 g/dL, inadequate reticulocyte response or transfusion need; ICU for TMA, transfusion reactions and fulminant hemolysis. Discharge only stable, self-limited cases with a repeat CBC in days.',
        confidence: 'recommended',
        summary: 'ICU for TMA or fulminant hemolysis; admit new AIHA or Hb <8',
    },
];
export const HEMOLYTIC_ANEMIA_MODULE_LABELS = [
    'Is It Hemolysis?',
    "Can't-Miss Causes",
    'DAT and Smear',
    'Warm AIHA',
    'Cold Agglutinin Disease',
    'DAT-Negative & Drug-Induced',
    'Transfusion',
    'Disposition',
];
export const HEMOLYTIC_ANEMIA_CITATIONS = [
    { num: 1, text: 'Hill QA, Stamps R, Massey E, et al. The diagnosis and management of primary autoimmune haemolytic anaemia. Br J Haematol. 2017;176(3):395-411.' },
    { num: 2, text: 'Phillips J, Henderson AC. Hemolytic anemia: evaluation and differential diagnosis. Am Fam Physician. 2018;98(6):354-361.' },
    { num: 3, text: 'Zheng XL, Vesely SK, Cataland SR, et al. ISTH guidelines for the diagnosis of thrombotic thrombocytopenic purpura. J Thromb Haemost. 2020;18(10):2486-2495.' },
    { num: 4, text: 'Hill QA, Stamps R, Massey E, et al. Guidelines on the management of drug-induced immune and secondary autoimmune, haemolytic anaemia. Br J Haematol. 2017;177(2):208-220.' },
    { num: 5, text: 'Chou ST, Alsawas M, Fasano RM, et al. American Society of Hematology 2020 guidelines for sickle cell disease: transfusion support. Blood Adv. 2020;4(2):327-355.' },
    { num: 6, text: 'Jäger U, Barcellini W, Broome CM, et al. Diagnosis and treatment of autoimmune hemolytic anemia in adults: recommendations from the First International Consensus Meeting. Blood Rev. 2020;41:100648.' },
    { num: 7, text: 'Zanella A, Barcellini W. Treatment of autoimmune hemolytic anemias. Haematologica. 2014;99(10):1547-1554.' },
    { num: 8, text: 'Berentsen S, Barcellini W, D’Sa S, et al. Cold agglutinin disease revisited: a multinational, observational study of 232 patients. Blood. 2020;136(4):480-488.' },
    { num: 9, text: 'Röth A, Barcellini W, D’Sa S, et al. Sutimlimab in cold agglutinin disease. N Engl J Med. 2021;384(14):1323-1334.' },
    { num: 10, text: 'Luzzatto L, Ally M, Notaro R. Glucose-6-phosphate dehydrogenase deficiency. Blood. 2020;136(11):1225-1240.' },
    { num: 11, text: 'Carson JL, Stanworth SJ, Guyatt G, et al. Red blood cell transfusion: 2023 AABB international guidelines. JAMA. 2023;330(19):1892-1902.' },
];
export const HEMOLYTIC_ANEMIA_CRITICAL_ACTIONS = [
    { text: 'Schistocytes + low platelets: treat as TMA, calculate PLASMIC, urgent hematology', nodeId: 'hemolytic-anemia-tma' },
    { text: 'Hemolysis during a transfusion: stop it and return the unit to the blood bank', nodeId: 'hemolytic-anemia-transfusion-rxn' },
    { text: 'Never withhold blood in life-threatening AIHA: give ABO, Rh and K matched units', nodeId: 'hemolytic-anemia-transfusion' },
    { text: 'Warm AIHA: prednisone 1 mg/kg/day, folic acid, LMWH prophylaxis', nodeId: 'hemolytic-anemia-warm-tx' },
    { text: 'Cold agglutinin disease: keep warm, blood warmer; steroids rarely help', nodeId: 'hemolytic-anemia-cold-tx' },
    { text: 'Stop the culprit drug (ceftriaxone, piperacillin) or oxidant trigger (G6PD)', nodeId: 'hemolytic-anemia-drug' },
];
export const HEMOLYTIC_ANEMIA_NODE_COUNT = HEMOLYTIC_ANEMIA_NODES.length;
