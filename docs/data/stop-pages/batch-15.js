// myMedKitt - Stop Pages Batch 15
// Airway consult critical pitfalls.
const SUPRAGLOTTIC_AIRWAY_STOP = {
    id: 'supraglottic-airway-stop',
    title: 'Supraglottic Airway - Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
        {
            heading: 'Do NOT confuse ventilation with airway protection',
            body: 'An SGA can ventilate but does not seal the trachea like a cuffed ETT. If aspiration risk or prolonged ventilation matters, use it as a bridge while preparing the definitive airway. [See this node](#/node/sga-definitive-airway).',
        },
        {
            heading: 'Do NOT ignore RODS predictors',
            body: 'Restricted mouth opening, obstruction, distorted anatomy, and stiff lungs/spine predict SGA failure. In a crash airway, RODS does not forbid an attempt, but it should trigger early backup planning. [See this node](#/node/sga-rods-screen).',
        },
        {
            heading: 'Do NOT keep repeating the same failed insertion',
            body: 'Limit SGA placement to 3 attempts total. Change size, device, position, depth, or operator. Repeated attempts add trauma and can worsen BVM, intubation, and cric options. [See this node](#/node/sga-failed-sga).',
        },
        {
            heading: 'Do NOT rely on SGA for obstruction below the glottis',
            body: 'An SGA sits above the glottis. It will not bypass subglottic stenosis, tracheal obstruction, tumor, foreign body, or severe distal bronchospasm. [See this node](#/node/sga-troubleshoot-obstruction).',
        },
        {
            heading: 'Do NOT delay cric in CICO',
            body: 'Failed intubation plus failed SGA plus failed BVM is CICO. Declare it and move to emergency front-of-neck access. More supraglottic attempts are not the rescue. [See this node](#/node/sga-cico).',
        },
        {
            heading: 'Do NOT skip confirmation',
            body: 'Use chest rise, EtCO2, SpO2 trend, bilateral breath sounds, and leak assessment. A device sitting in the mouth is not enough. [See this node](#/node/sga-confirmation).',
        },
    ],
    citations: [],
};
const THORACOTOMY_PROCEDURE_STOP = {
    id: 'thoracotomy-procedure-stop',
    title: 'Thoracotomy Procedure - Do NOT',
    subtitle: 'Critical pitfalls during resuscitative thoracotomy',
    sections: [
        {
            heading: 'Do NOT perform thoracotomy outside survivable criteria',
            body: 'Confirm mechanism, signs of life, CPR duration, rhythm, and cardiac motion when available. Avoid nonbeneficial thoracotomy when there is no realistic path to reversible physiology or definitive source control. [See indications](#/info/thorac-indications).',
        },
        {
            heading: 'Do NOT let procedure setup delay HOTT treatment',
            body: 'Airway/oxygenation, bilateral chest decompression, hemorrhage control/MTP, and tamponade decision-making should run in parallel. Thoracotomy is not a replacement for correcting the other traumatic arrest causes. [Open traumatic arrest HOTT tool](#/info/ta-hott).',
        },
        {
            heading: 'Do NOT make a small incision',
            body: 'A limited incision slows exposure and delays the lifesaving steps. Make a large left anterolateral incision at the 4th/5th intercostal space and extend to clamshell when exposure is inadequate or right chest/mediastinal access is needed. [See incision](#/info/thorac-incision).',
        },
        {
            heading: 'Do NOT injure the phrenic nerve during pericardiotomy',
            body: 'Identify the phrenic nerve on the lateral pericardium. Tent the pericardium anterior to the nerve, make a controlled opening, then extend longitudinally from apex toward aortic root while staying anterior to the nerve. [See pericardium](#/info/thorac-pericardium).',
        },
        {
            heading: 'Do NOT forget this is a bridge to source control',
            body: 'Relieving tamponade, temporary cardiac wound control, open massage, and aortic cross-clamping are temporizing maneuvers. Move immediately to OR/trauma surgery for definitive repair when there is ROSC or physiologic response.',
        },
        {
            heading: 'Do NOT continue indefinitely without response',
            body: 'If thoracotomy does not reveal or correct a survivable cause, cardiac motion remains absent, and there is no physiologic response after reversible causes are addressed, transition to termination per local traumatic arrest policy.',
        },
    ],
    citations: [],
};
const H_PYLORI_STOP = {
    id: 'h-pylori-stop',
    title: 'H. pylori - Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
        {
            heading: 'Do NOT use clarithromycin triple therapy empirically',
            body: 'Current ACG guidance recommends against empiric clarithromycin-containing therapy unless susceptibility is documented. Clarithromycin resistance can make the classic PPI + clarithromycin + amoxicillin regimen fail. [See regimen node](#/node/hp-treatment-naive).',
        },
        {
            heading: 'Do NOT use levofloxacin empirically',
            body: 'Levofloxacin-containing therapy should be reserved for documented susceptibility or specialist-directed salvage. Reusing quinolones blindly adds harm and may fail due to resistance. [See alternatives](#/node/hp-alternatives).',
        },
        {
            heading: 'Do NOT call symptom improvement a cure',
            body: 'Every treated patient needs proof of eradication with stool antigen, urea breath test, or biopsy-based testing. Persistent infection matters even when dyspepsia improves. [See test-of-cure](#/node/hp-test-of-cure).',
        },
        {
            heading: 'Do NOT test too early or while acid suppression masks infection',
            body: 'False negatives occur if testing is done too soon. Wait at least 4 weeks after antibiotics; hold PPI/PCAB for 2 weeks and antibiotics/bismuth for 4 weeks before test-of-cure. [See testing rules](#/node/hp-testing-basics).',
        },
        {
            heading: 'Do NOT use serology for test-of-cure',
            body: 'Serology can remain positive after eradicated infection and does not prove active disease or cure. Use stool antigen, urea breath test, or biopsy-based testing. [See testing route](#/node/hp-test-choice).',
        },
        {
            heading: 'Do NOT miss alarm features',
            body: 'GI bleeding, iron-deficiency anemia, weight loss, persistent vomiting, dysphagia, peritonitis, or age >=60 with new dyspepsia should trigger an EGD/acute workup lane, not simple outpatient H. pylori discharge. [See alarm lane](#/node/hp-alarm).',
        },
    ],
    citations: [],
};
export const STOP_PAGES_15 = {
    'supraglottic-airway-stop': SUPRAGLOTTIC_AIRWAY_STOP,
    'thoracotomy-procedure-stop': THORACOTOMY_PROCEDURE_STOP,
    'h-pylori-stop': H_PYLORI_STOP,
};
