/**
 * MedKitt Consult Trees Index
 * Export all consult trees for use in the application
 */
export { NEUROSYPHILIS_NODES, NEUROSYPHILIS_MODULE_LABELS, NEUROSYPHILIS_CITATIONS } from './neurosyphilis';
export { PE_TREATMENT_NODES, PE_TREATMENT_MODULE_LABELS, PE_TREATMENT_CITATIONS } from './pe-treatment';
export { PNEUMOTHORAX_NODES, PNEUMOTHORAX_MODULE_LABELS, PNEUMOTHORAX_CITATIONS } from './pneumothorax';
export { echoViewsConsult } from './echo-views';
/**
 * Registry of all available consult trees
 */
export const consultRegistry = {
    // pneumothorax now uses new flat DecisionNode[] format — loaded via tree-service.ts
    'echo-views': () => import('./echo-views'),
};
/**
 * Get a consult tree by ID
 */
export async function getConsult(consultId) {
    const loader = consultRegistry[consultId];
    if (!loader)
        return null;
    try {
        const module = await loader();
        return module.default;
    }
    catch (error) {
        console.error(`Failed to load consult: ${consultId}`, error);
        return null;
    }
}
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
