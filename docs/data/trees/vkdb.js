// MedKitt: Vitamin K Deficiency Bleeding (VKDB) in Infants (added 2026-11-11)
// Recognition → Intracranial hemorrhage screen → Labs → Treatment → Inflicted injury and differential → Underlying cause → Prevention and refusal → Disposition
// 8 modules. Doses live in drug entries and the VKDB Doses calculator; type/risk and lab pattern live in calculators.
// Sources: AAP clinical report 2022 (Hand, Noble, Abrams), CDC MMWR 2013 (Tennessee cluster), Shearer Blood Rev 2009, BSH neonatal/pediatric transfusion
// guideline 2016, Cochrane (Puckett & Offringa) 2000, AAP child abuse evaluation 2015, NASPGHAN cholestasis 2017, phytonadione FDA label.
export const VKDB_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'vkdb-start',
        type: 'info',
        module: 1,
        title: 'VKDB: Recognition',
        body: '[VKDB Steps Summary](#/info/vkdb-summary): stepwise approach and counseling.\n\n**Newborns are born low in vitamin K**, and breast milk contains little. Without the vitamin K shot at birth, the clotting factors that need it (II, VII, IX, X) can fall low enough to bleed.\n\n**Think VKDB** in any bleeding infant who **did not get the IM vitamin K shot** (declined, home or birthing-center birth), especially if **exclusively breastfed**, and in any infant with **cholestasis** (prolonged jaundice, pale stools), even after the shot. [1][3]\n\n**Warning bleeds often come first:** oozing from the umbilical stump, bruising, blood in stool or vomit, nosebleed, oozing after a heel stick, vaccination or circumcision. Take them seriously.\n\n**Without the shot, late VKDB affects about 4.4-7.2 per 100,000 infants** (the CDC estimated the risk at up to 81 times that with the shot), and 30-60% of late cases present as an intracranial hemorrhage. [2]',
        citation: [1, 2, 3],
        images: [{
                src: 'images/vkdb/vkdb-timeline.svg',
                alt: 'Timeline from birth to 6 months showing three types of vitamin K deficiency bleeding. Early, first 24 hours: maternal anticonvulsants, warfarin, rifampin or isoniazid; scalp, intracranial and intra-abdominal bleeding. Classic, days 2 to 7: no vitamin K at birth; gut, umbilical, circumcision and heel-stick bleeding. Late, 2 weeks to 6 months with a peak at 3 to 8 weeks: exclusively breastfed without IM vitamin K, or cholestasis; intracranial bleeding in 30 to 60 percent.',
                caption: 'The three types of VKDB by age at onset. (myMedKitt original diagram, after Shearer 2009 and AAP 2022.)',
            }],
        calculatorLinks: [
            { id: 'vkdb-type-risk', label: 'VKDB Type and Risk' },
        ],
        next: 'vkdb-ich-screen',
        summary: 'No vitamin K shot + bleeding infant = VKDB until proven otherwise',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 2: INTRACRANIAL HEMORRHAGE SCREEN
    // =====================================================================
    {
        id: 'vkdb-ich-screen',
        type: 'question',
        module: 2,
        title: 'Signs of Intracranial Bleeding?',
        body: 'Late VKDB often presents with a brain bleed, and the signs can be subtle in an infant: **lethargy, irritability, poor feeding, vomiting, pallor, seizures, apnea, a bulging fontanelle or a growing head**. [1][3]',
        citation: [1, 3],
        options: [
            {
                label: 'Yes, or any neurologic change',
                description: 'Lethargy, vomiting, seizure, apnea, bulging fontanelle',
                next: 'vkdb-ich',
                urgency: 'critical',
            },
            {
                label: 'No: skin, mucosal, gut or umbilical bleeding only',
                description: 'Still treat now; head CT if any doubt',
                next: 'vkdb-labs',
            },
        ],
        summary: 'Any neurologic sign: treat as intracranial hemorrhage',
    },
    {
        id: 'vkdb-ich',
        type: 'info',
        module: 2,
        title: 'Intracranial Hemorrhage',
        body: '**Treat before the scan result.** Draw labs first (PT/INR, PTT, CBC, fibrinogen, type and crossmatch, PIVKA-II if available), then give treatment without waiting for results:\n\n• [Vitamin K](#/drug/vitamin-k/vkdb treatment) **1 mg slow IV** (no faster than 1 mg/min): SC absorption is unreliable when perfusion is poor, and a brain bleed is the case where SC is not feasible. **Boxed warning:** severe and fatal anaphylactoid reactions can occur with IV (and IM) vitamin K, even when diluted and given slowly and on the first dose; the label reserves IV for when SC is not feasible. Give no faster than 1 mg/min and be ready to treat anaphylaxis.\n• **Plus factor replacement** for a brain bleed: [4-factor PCC](#/drug/pcc-4factor/vkdb) (off-label in infants; low-quality evidence, case series) or [fresh frozen plasma](#/drug/ffp/vkdb) 15-20 mL/kg. Choose with hematology and pharmacy. [4][5]\n• **Non-contrast head CT**, PICU and pediatric neurosurgery.\n• Treat seizures, protect the airway, keep normal temperature, glucose and blood pressure.\n\nRecheck the PT/INR after treatment. Use the [VKDB Doses](#/calculator/vkdb-doses) calculator for weight-based doses.',
        citation: [4, 5],
        calculatorLinks: [
            { id: 'vkdb-doses', label: 'VKDB Doses' },
        ],
        recommendation: 'Infant with suspected VKDB and intracranial hemorrhage: give vitamin K 1 mg slow IV (boxed warning: anaphylactoid reactions) plus factor replacement (4-factor PCC, off-label, or fresh frozen plasma) without waiting for coagulation results; obtain head CT and involve PICU and neurosurgery.',
        confidence: 'recommended',
        next: 'vkdb-abuse',
        summary: 'Vitamin K IV + PCC (or FFP) now, head CT, PICU, neurosurgery',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 3: LABS
    // =====================================================================
    {
        id: 'vkdb-labs',
        type: 'info',
        module: 3,
        title: 'Labs',
        body: '**Send:** PT/INR, PTT, CBC with platelets, fibrinogen, conjugated (direct) bilirubin and liver tests, type and crossmatch. Send **PIVKA-II** (protein induced by vitamin K absence) before vitamin K if your lab offers it, but **never delay treatment** for it. [3]\n\n**Classic VKDB pattern:** markedly prolonged PT/INR (PTT often prolonged too), **normal platelets and normal fibrinogen**. [3]\n\n**The diagnostic test is the response:** the PT should improve within hours of vitamin K. If it does not, think liver failure or another cause. Use age-specific reference ranges, because PT and PTT run longer in newborns.',
        citation: [3],
        calculatorLinks: [
            { id: 'vkdb-lab-pattern', label: 'Lab Pattern' },
        ],
        next: 'vkdb-treat',
        summary: 'Long PT, normal platelets and fibrinogen; PT corrects with vitamin K',
    },
    // =====================================================================
    // MODULE 4: TREATMENT
    // =====================================================================
    {
        id: 'vkdb-treat',
        type: 'question',
        module: 4,
        title: 'How Severe Is the Bleeding?',
        body: 'Give vitamin K to every bleeding infant with suspected VKDB, after labs are drawn. Severity decides whether factors are also needed.',
        options: [
            {
                label: 'Major bleeding',
                description: 'Intracranial, hemodynamic instability, large gut bleed, falling hemoglobin',
                next: 'vkdb-treat-major',
                urgency: 'critical',
            },
            {
                label: 'Minor bleeding',
                description: 'Oozing, bruising, small amounts of blood in stool, stable',
                next: 'vkdb-treat-minor',
            },
        ],
        summary: 'Vitamin K for all; factors for major bleeding',
    },
    {
        id: 'vkdb-treat-major',
        type: 'info',
        module: 4,
        title: 'Major Bleeding',
        body: '• [Vitamin K](#/drug/vitamin-k/vkdb treatment) **1 mg slow IV** (subcutaneous absorption is unreliable in shock). **Boxed warning:** severe and fatal anaphylactoid reactions can occur with IV (and IM) vitamin K, even when diluted and given slowly and on the first dose; the label reserves IV for when SC is not feasible. Give no faster than 1 mg/min and be ready to treat anaphylaxis.\n• **Factor replacement now:** [4-factor PCC](#/drug/pcc-4factor/vkdb), about 30 units/kg (20-50 units/kg reported in infant case series; off-label, low-quality evidence; dose with hematology and pharmacy), or [fresh frozen plasma](#/drug/ffp/vkdb) 15-20 mL/kg. Vitamin K takes hours to work; factors work in minutes. [4][5]\n• Packed red cells for significant blood loss.\n• Recheck PT/INR after factors and again at about 6-12 hours; repeat vitamin K if still prolonged. [3]',
        citation: [3, 4, 5],
        calculatorLinks: [
            { id: 'vkdb-doses', label: 'VKDB Doses' },
        ],
        recommendation: 'Major VKDB bleeding: vitamin K 1 mg slow IV (boxed warning: anaphylactoid reactions) plus 4-factor PCC (off-label) or fresh frozen plasma 15-20 mL/kg; recheck PT/INR and repeat vitamin K if prolonged.',
        confidence: 'recommended',
        next: 'vkdb-abuse',
        summary: 'Vitamin K IV + PCC or FFP; recheck INR',
        safetyLevel: 'critical',
    },
    {
        id: 'vkdb-treat-minor',
        type: 'info',
        module: 4,
        title: 'Minor Bleeding',
        body: '• [Vitamin K](#/drug/vitamin-k/vkdb treatment) **1 mg subcutaneously** (the label\'s preferred route; the label also allows IM for treating newborn bleeding). Use slow IV only if SC is not feasible: the boxed warning reports severe and fatal reactions with IV and IM use. [5]\n• Local pressure for oozing sites.\n• Recheck PT/INR in about 6-12 hours: it should be improving. Repeat vitamin K if it remains prolonged. [3]\n• A baby with a "minor" bleed and no vitamin K can still have a brain bleed: low threshold for head imaging if there is any neurologic change, vomiting or irritability.',
        citation: [3, 5],
        recommendation: 'Minor VKDB bleeding: vitamin K 1 mg subcutaneously (IM allowed by the label; IV only if SC is not feasible), local measures, and recheck PT/INR within hours.',
        confidence: 'recommended',
        next: 'vkdb-abuse',
        summary: 'Vitamin K 1 mg SC; recheck INR; low threshold for CT',
    },
    // =====================================================================
    // MODULE 5: INFLICTED INJURY AND DIFFERENTIAL
    // =====================================================================
    {
        id: 'vkdb-abuse',
        type: 'info',
        module: 5,
        title: 'Inflicted Injury and Other Causes',
        body: '**VKDB and abuse can look alike** (subdural hemorrhage, bruising, retinal bleeding in severe cases), and **one does not exclude the other**. [7]\n\n• **Normal coagulation screen + intracranial bleed or bruising** in a non-mobile infant: full inflicted-injury evaluation (skeletal survey, ophthalmology, child protection team) per your protocol.\n• **Prolonged PT that corrects with vitamin K**, no vitamin K at birth, and injuries limited to bleeding: supports VKDB, but the child protection team still decides when injuries are unexplained. [7]\n\n**Other causes of a bleeding infant:**\n• **Isolated long PTT:** hemophilia A or B.\n• **Low platelets:** neonatal alloimmune thrombocytopenia, maternal ITP, infection.\n• **Low platelets with a long PT or low fibrinogen:** DIC (sepsis).\n• **Long PT that does not correct:** liver failure.',
        citation: [7],
        calculatorLinks: [
            { id: 'vkdb-lab-pattern', label: 'Lab Pattern' },
        ],
        next: 'vkdb-cause',
        summary: 'VKDB does not exclude abuse; normal coags + ICH = abuse workup',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 6: UNDERLYING CAUSE
    // =====================================================================
    {
        id: 'vkdb-cause',
        type: 'info',
        module: 6,
        title: 'Find the Underlying Cause',
        body: '**Late VKDB often unmasks hidden cholestasis.** Vitamin K is fat-soluble, so poor bile flow means poor absorption, even in babies who had the shot. [3]\n\n• **Check conjugated bilirubin in every case.** Raised conjugated bilirubin, prolonged jaundice, pale stools or dark urine: urgent workup for **biliary atresia** (ultrasound, pediatric GI). Surgery before about 2 months of age gives the best outcome. [8]\n• Other causes: alpha-1 antitrypsin deficiency, cystic fibrosis, chronic diarrhea or malabsorption, prolonged antibiotics.\n• **Early VKDB (first 24 h):** review maternal drugs (anticonvulsants, warfarin, rifampin, isoniazid). [3]',
        citation: [3, 8],
        next: 'vkdb-prevention',
        summary: 'Check conjugated bilirubin: late VKDB can be the first sign of biliary atresia',
    },
    // =====================================================================
    // MODULE 7: PREVENTION AND REFUSAL
    // =====================================================================
    {
        id: 'vkdb-prevention',
        type: 'info',
        module: 7,
        title: 'Prevention and Parents Who Decline',
        body: '**Standard prophylaxis (AAP):** a single [vitamin K](#/drug/vitamin-k/vkdb prophylaxis) dose **1 mg IM** soon after birth (within 6 hours per AAP; the label says within 1 hour) for infants over 1500 g; **0.3-0.5 mg/kg IM** for 1500 g or less. [1]\n\n**Oral vitamin K is less protective** against late VKDB, and there is no FDA-approved oral neonatal product in the US. Oral regimens used in Europe need repeated doses for weeks and fail more often, especially with cholestasis. [1][3]\n\n**Counseling families who decline:**\n• Without the shot, late VKDB affects about 4.4-7.2 per 100,000 babies (CDC estimate: up to 81 times the risk with the shot), and it often presents as a brain bleed. [2]\n• The single IM dose is safe; the old concern about childhood cancer was not confirmed. [1]\n• Most parents in the Tennessee cluster had not known the risk before their baby bled. [2]\n• Make sure the next sibling gets the shot.',
        citation: [1, 2, 3],
        next: 'vkdb-dispo',
        summary: '1 mg IM at birth; oral is less protective; counsel declining families',
    },
    // =====================================================================
    // MODULE 8: DISPOSITION
    // =====================================================================
    {
        id: 'vkdb-dispo',
        type: 'info',
        module: 8,
        title: 'Disposition',
        body: '• **PICU:** intracranial hemorrhage, hemodynamic instability, major gut bleeding, seizures.\n• **Admit all other infants with confirmed or suspected VKDB** to observe the response to vitamin K, recheck PT/INR, and complete the cholestasis and safety workup.\n• **Before discharge:** PT/INR normal, bleeding stopped, cause identified (cholestasis excluded or referred), and the family counseled. Arrange follow-up and, if cholestatic, ongoing vitamin K supplementation with GI. [1][3]',
        citation: [1, 3],
        recommendation: 'Admit all infants with suspected VKDB; PICU for intracranial or major bleeding. Discharge only after the PT/INR has normalized, bleeding has stopped and cholestasis has been addressed.',
        confidence: 'recommended',
        summary: 'Admit all; PICU for ICH or major bleeding',
    },
];
export const VKDB_MODULE_LABELS = [
    'Recognition',
    'Intracranial Hemorrhage',
    'Labs',
    'Treatment',
    'Inflicted Injury & Differential',
    'Underlying Cause',
    'Prevention & Refusal',
    'Disposition',
];
export const VKDB_CITATIONS = [
    { num: 1, text: 'Hand I, Noble L, Abrams SA. Vitamin K and the newborn infant. Pediatrics. 2022;149(3):e2021056036.' },
    { num: 2, text: 'Centers for Disease Control and Prevention. Notes from the field: late vitamin K deficiency bleeding in infants whose parents declined vitamin K prophylaxis — Tennessee, 2013. MMWR Morb Mortal Wkly Rep. 2013;62(45):901-902.' },
    { num: 3, text: 'Shearer MJ. Vitamin K deficiency bleeding (VKDB) in early infancy. Blood Rev. 2009;23(2):49-59.' },
    { num: 4, text: 'New HV, Berryman J, Bolton-Maggs PHB, et al. Guidelines on transfusion for fetuses, neonates and older children. Br J Haematol. 2016;175(5):784-828.' },
    { num: 5, text: 'Phytonadione injectable emulsion (Vitamin K1 Injection). Prescribing information. Pfizer (Hospira).' },
    { num: 6, text: 'Puckett RM, Offringa M. Prophylactic vitamin K for vitamin K deficiency bleeding in neonates. Cochrane Database Syst Rev. 2000;(4):CD002776.' },
    { num: 7, text: 'Christian CW; Committee on Child Abuse and Neglect. The evaluation of suspected child physical abuse. Pediatrics. 2015;135(5):e1337-e1354.' },
    { num: 8, text: 'Fawaz R, Baumann U, Ekong U, et al. Guideline for the evaluation of cholestatic jaundice in infants: joint recommendations of NASPGHAN and ESPGHAN. J Pediatr Gastroenterol Nutr. 2017;64(1):154-168.' },
];
export const VKDB_CRITICAL_ACTIONS = [
    { text: 'Bleeding infant without the vitamin K shot: give vitamin K now, do not wait for labs', nodeId: 'vkdb-start' },
    { text: 'Any neurologic sign: vitamin K IV + PCC (or FFP), head CT, PICU, neurosurgery', nodeId: 'vkdb-ich' },
    { text: 'Major bleeding: factor replacement (PCC preferred) as well as vitamin K', nodeId: 'vkdb-treat-major' },
    { text: 'VKDB does not exclude inflicted injury; normal coags + ICH needs abuse evaluation', nodeId: 'vkdb-abuse' },
    { text: 'Check conjugated bilirubin: late VKDB can unmask biliary atresia', nodeId: 'vkdb-cause' },
];
export const VKDB_NODE_COUNT = VKDB_NODES.length;
