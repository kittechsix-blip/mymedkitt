/**
 * MedKitt Consult Trees Index
 * Export all consult trees for use in the application
 */
export { NEUROSYPHILIS_NODES, NEUROSYPHILIS_MODULE_LABELS, NEUROSYPHILIS_CITATIONS } from './neurosyphilis';
export { PE_TREATMENT_NODES, PE_TREATMENT_MODULE_LABELS, PE_TREATMENT_CITATIONS } from './pe-treatment';
export { PNEUMOTHORAX_NODES, PNEUMOTHORAX_MODULE_LABELS, PNEUMOTHORAX_CITATIONS } from './pneumothorax';
export { RABIES_NODES, RABIES_MODULE_LABELS, RABIES_CITATIONS } from './rabies';
export { ECHO_VIEWS_NODES, ECHO_VIEWS_MODULE_LABELS, ECHO_VIEWS_CITATIONS } from './echo-views';
export { ICH_NODES, ICH_MODULE_LABELS, ICH_CITATIONS } from './ich';
export { STATUS_EPILEPTICUS_NODES, STATUS_EPILEPTICUS_MODULE_LABELS, STATUS_EPILEPTICUS_CITATIONS } from './status-epilepticus';
export { FIRST_TRIMESTER_NODES, FIRST_TRIMESTER_MODULE_LABELS, FIRST_TRIMESTER_CITATIONS } from './first-trimester';
export { HIV_NODES, HIV_MODULE_LABELS, HIV_CITATIONS } from './hiv';
export { MENINGITIS_NODES, MENINGITIS_MODULE_LABELS, MENINGITIS_CITATIONS } from './meningitis';
export { SAH_NODES, SAH_MODULE_LABELS, SAH_CITATIONS } from './sah';
export { ACID_BASE_NODES, ACID_BASE_MODULE_LABELS, ACID_BASE_CITATIONS } from './acid-base';
export { DELIRIUM_NODES, DELIRIUM_MODULE_LABELS, DELIRIUM_CITATIONS } from './delirium';
export { ADRENAL_INSUFFICIENCY_NODES, ADRENAL_INSUFFICIENCY_MODULE_LABELS, ADRENAL_INSUFFICIENCY_CITATIONS } from './adrenal-insufficiency';
// Note: All consult trees are now loaded via tree-service.ts using the flat DecisionNode[] format.
// The consultRegistry below is kept for backwards compatibility but is not actively used.
/**
 * List all available consults
 */
export function listConsults() {
    // This would normally dynamically load, but for now return static list
    return [
        {
            id: 'neurosyphilis',
            title: 'Neurosyphilis Evaluation & Treatment',
            category: 'Infectious Disease'
        },
        {
            id: 'pe-treatment',
            title: 'Pulmonary Embolism Treatment',
            category: 'Emergency Medicine / Cardiology'
        },
        {
            id: 'pneumothorax',
            title: 'Pneumothorax Evaluation with POCUS',
            category: 'Emergency Medicine / Critical Care Ultrasound'
        },
        {
            id: 'echo-views',
            title: 'Basic Emergency Echocardiography Views',
            category: 'Emergency Medicine / Critical Care Ultrasound'
        }
    ];
}
