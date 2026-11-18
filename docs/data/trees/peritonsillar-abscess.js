export const PERITONSILLAR_ABSCESS_NODES = [
    {
        id: 'quinsy-start',
        type: 'question',
        module: 1,
        title: 'Can the patient protect the airway?',
        body: 'Unilateral throat pain, ipsilateral otalgia, trismus and a muffled voice suggest quinsy. First assess breathing, secretion handling, neck movement and systemic illness. [1][2]',
        citation: [1, 2],
        options: [
            {
                label: 'Stridor, respiratory distress or failing secretion control',
                next: 'quinsy-airway',
            },
            {
                label: 'Breathing comfortably and handling secretions',
                next: 'quinsy-exam',
            },
        ],
    },
    {
        id: 'quinsy-airway',
        type: 'result',
        module: 1,
        title: 'Mobilize the airway team now',
        body: 'Keep the patient upright if tolerated. Provide oxygen, suction and monitoring. Call ENT and anesthesia to secure the airway with a rescue plan. Defer CT and bedside aspiration until the airway is safe. Begin IV antibiotics and resuscitate sepsis in parallel. [Deep neck infection](#/tree/deep-neck-infection). [1][2]',
        citation: [1, 2],
        recommendation: 'Mobilize the airway team now',
    },
    {
        id: 'quinsy-exam',
        type: 'question',
        module: 1,
        title: 'Is there a localized collection?',
        body: 'Examine the soft palate for unilateral swelling and the uvula for displacement. If the exam is equivocal, intraoral ultrasound can distinguish pus from edema when tolerated. Painful limitation of neck rotation, swelling below the mandibular angle, bilateral findings or toxic appearance raise concern for deep extension. [1][2]',
        citation: [1, 2],
        options: [
            {
                label: 'Localized peritonsillar collection',
                next: 'quinsy-drain',
            },
            {
                label: 'Cellulitis without a collection',
                next: 'quinsy-cellulitis',
            },
            {
                label: 'Possible deep extension or diagnosis uncertain',
                next: 'quinsy-extension',
            },
        ],
    },
    {
        id: 'quinsy-extension',
        type: 'result',
        module: 1,
        title: 'Define the extent and involve ENT',
        body: 'With a stable airway, obtain contrast-enhanced CT of the neck for suspected deep spread or an atypical presentation. Involve ENT early and use IV antibiotics for severe infection. Reassess the airway during workup. [Deep neck infection](#/tree/deep-neck-infection). [1][2]',
        citation: [1, 2],
        recommendation: 'Define the extent and involve ENT',
    },
    {
        id: 'quinsy-drain',
        type: 'info',
        module: 2,
        title: 'Arrange drainage',
        body: 'Most established abscesses need source control. Use suction, monitoring and a clinician trained in drainage. Seek ENT assistance for difficult access, marked trismus, unsuccessful aspiration or bleeding. A dry tap can miss a collection. Reassess with ultrasound or ENT before another attempt. [Open the drainage procedure](#/tree/pta-drainage). [1][2]',
        citation: [1, 2],
        next: 'quinsy-treat',
    },
    {
        id: 'quinsy-cellulitis',
        type: 'info',
        module: 2,
        title: 'Treat peritonsillar cellulitis',
        body: 'Treat the infection medically when imaging and examination support cellulitis. Reassess for an evolving abscess or deeper infection if pain or swelling persists. [1][2]',
        citation: [1, 2],
        next: 'quinsy-treat',
    },
    {
        id: 'quinsy-treat',
        type: 'info',
        module: 2,
        title: 'Treat pain, hydration and infection',
        body: 'Give analgesia and fluids as needed. Cover streptococci and oral anaerobes. In adults able to swallow with appropriate renal function, use [amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/peritonsillar) 875/125 mg by mouth twice daily for 10–14 days. Use IV therapy for severe infection or inability to swallow. For allergy or parenteral options, check the [PTA antibiotic pathway](#/tree/pta-drainage/node/pta-antibiotics) and local susceptibility. [1][2]',
        citation: [1, 2],
        next: 'quinsy-dispo',
    },
    {
        id: 'quinsy-dispo',
        type: 'question',
        module: 3,
        title: 'Reassess before disposition',
        body: 'Observe after drainage. Recheck breathing, bleeding, pain and ability to drink and take oral medication. [1][2]',
        citation: [1, 2],
        options: [
            {
                label: 'Stable, drinking, pain controlled and reliable follow-up',
                next: 'quinsy-home',
            },
            {
                label: 'Airway concern, sepsis, dehydration or failed outpatient treatment',
                next: 'quinsy-admit',
            },
        ],
    },
    {
        id: 'quinsy-admit',
        type: 'result',
        module: 3,
        title: 'Admit with ENT involvement',
        body: 'Continue IV fluids and antibiotics as indicated. Select a monitored setting for airway risk. Immunosuppression, uncontrolled diabetes or inability to arrange safe follow-up lowers the admission threshold. [1][2]',
        citation: [1, 2],
        recommendation: 'Admit with ENT involvement',
    },
    {
        id: 'quinsy-home',
        type: 'result',
        module: 3,
        title: 'Arrange review within 24–36 hours',
        body: 'Confirm access to antibiotics and reassessment. Return immediately for difficulty breathing, drooling, bleeding, worsening swelling or inability to drink. [2]',
        citation: [2],
        recommendation: 'Arrange review within 24–36 hours',
    },
];
export const PERITONSILLAR_ABSCESS_MODULE_LABELS = ['Assessment', 'Treatment', 'Disposition'];
export const PERITONSILLAR_ABSCESS_CRITICAL_ACTIONS = [
    {
        text: 'Escalate a threatened airway before imaging.',
        nodeId: 'quinsy-airway',
    },
    {
        text: 'Reassess a dry aspiration before another attempt.',
        nodeId: 'quinsy-drain',
    },
    {
        text: 'Confirm oral intake before discharge.',
        nodeId: 'quinsy-dispo',
    },
];
export const PERITONSILLAR_ABSCESS_CITATIONS = [
    {
        num: 1,
        text: 'University of Iowa. Peritonsillar Abscess (PTA) Management. Updated 2023. https://iowaprotocols.medicine.uiowa.edu/protocols/peritonsillar-abscess-pta-management',
    },
    {
        num: 2,
        text: 'Galioto NJ. Peritonsillar Abscess. Am Fam Physician. 2017;95:501–506. https://www.aafp.org/pubs/afp/issues/2017/0415/p501.html',
    },
];
