/**
 * MedKitt Consult Trees Index
 * Export all consult trees for use in the application
 */
export { ACUTE_PANCREATITIS_NODES, ACUTE_PANCREATITIS_MODULE_LABELS, ACUTE_PANCREATITIS_CITATIONS } from './acute-pancreatitis';
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
export { ANAPHYLAXIS_NODES, ANAPHYLAXIS_MODULE_LABELS, ANAPHYLAXIS_CITATIONS } from './anaphylaxis';
export { ANGIOEDEMA_NODES, ANGIOEDEMA_MODULE_LABELS, ANGIOEDEMA_CITATIONS } from './angioedema';
export { THYROID_NODES, THYROID_MODULE_LABELS, THYROID_CITATIONS } from './thyroid';
export { SYPHILIS_NODES, SYPHILIS_MODULE_LABELS, SYPHILIS_CITATIONS } from './syphilis';
export { SICKLE_CELL_NODES, SICKLE_CELL_MODULE_LABELS, SICKLE_CELL_CITATIONS } from './sickle-cell';
export { TCA_TOXIDROME_NODES, TCA_TOXIDROME_MODULE_LABELS, TCA_TOXIDROME_CITATIONS } from './tca-toxidrome';
export { ACETAMINOPHEN_OD_NODES, ACETAMINOPHEN_OD_MODULE_LABELS, ACETAMINOPHEN_OD_CITATIONS } from './acetaminophen';
export { SALICYLATE_NODES, SALICYLATE_MODULE_LABELS, SALICYLATE_CITATIONS } from './salicylate';
export { DKA_NODES, DKA_MODULE_LABELS, DKA_CITATIONS } from './dka';
export { DIABETES_MANAGEMENT_NODES, DIABETES_MANAGEMENT_MODULE_LABELS, DIABETES_MANAGEMENT_CITATIONS } from './diabetes-management';
export { SEPSIS_NODES, SEPSIS_MODULE_LABELS, SEPSIS_CITATIONS } from './sepsis';
export { OPIOID_WITHDRAWAL_NODES, OPIOID_WITHDRAWAL_MODULE_LABELS, OPIOID_WITHDRAWAL_CITATIONS } from './opioid-withdrawal';
export { ALCOHOL_WITHDRAWAL_NODES, ALCOHOL_WITHDRAWAL_MODULE_LABELS, ALCOHOL_WITHDRAWAL_CITATIONS } from './alcohol-withdrawal';
export { TUBERCULOSIS_NODES, TUBERCULOSIS_MODULE_LABELS, TUBERCULOSIS_CITATIONS } from './tuberculosis';
export { HEMOPHILIA_NODES, HEMOPHILIA_MODULE_LABELS, HEMOPHILIA_CITATIONS } from './hemophilia';
export { ANTICOAG_REVERSAL_NODES, ANTICOAG_REVERSAL_MODULE_LABELS, ANTICOAG_REVERSAL_CITATIONS } from './anticoag-reversal';
export { COMBATIVE_PATIENT_NODES, COMBATIVE_PATIENT_MODULE_LABELS, COMBATIVE_PATIENT_CITATIONS } from './combative-patient';
export { URINARY_RETENTION_NODES, URINARY_RETENTION_MODULE_LABELS, URINARY_RETENTION_CITATIONS } from './urinary-retention';
export { CAUSTIC_INGESTION_NODES, CAUSTIC_INGESTION_MODULE_LABELS, CAUSTIC_INGESTION_CITATIONS } from './caustic-ingestion';
export { EPISTAXIS_NODES, EPISTAXIS_MODULE_LABELS, EPISTAXIS_CITATIONS } from './epistaxis';
export { PELVIC_FRACTURE_NODES, PELVIC_FRACTURE_MODULE_LABELS, PELVIC_FRACTURE_CITATIONS } from './pelvic-fracture';
export { MASSIVE_TRANSFUSION_NODES, MASSIVE_TRANSFUSION_MODULE_LABELS, MASSIVE_TRANSFUSION_CITATIONS } from './massive-transfusion';
export { PSYCHIATRY_ASSESSMENT_NODES, PSYCHIATRY_ASSESSMENT_MODULE_LABELS, PSYCHIATRY_ASSESSMENT_CITATIONS } from './psychiatry-assessment';
export { SEROTONIN_SYNDROME_NODES, SEROTONIN_SYNDROME_MODULE_LABELS, SEROTONIN_SYNDROME_CITATIONS } from './serotonin-syndrome';
export { DIGOXIN_TOXICITY_NODES, DIGOXIN_TOXICITY_MODULE_LABELS, DIGOXIN_TOXICITY_CITATIONS } from './digoxin-toxicity';
export { BETA_BLOCKER_OD_NODES, BETA_BLOCKER_OD_MODULE_LABELS, BETA_BLOCKER_OD_CITATIONS } from './beta-blocker-od';
export { CCB_OD_NODES, CCB_OD_MODULE_LABELS, CCB_OD_CITATIONS } from './ccb-od';
export { IRON_OD_NODES, IRON_OD_MODULE_LABELS, IRON_OD_CITATIONS } from './iron-od';
export { CO_TOXICITY_NODES, CO_TOXICITY_MODULE_LABELS, CO_TOXICITY_CITATIONS } from './co-toxicity';
export { BOTULISM_NODES, BOTULISM_MODULE_LABELS, BOTULISM_CITATIONS } from './botulism';
export { GUILLAIN_BARRE_NODES, GUILLAIN_BARRE_MODULE_LABELS, GUILLAIN_BARRE_CITATIONS } from './guillain-barre';
export { MYASTHENIA_GRAVIS_NODES, MYASTHENIA_GRAVIS_MODULE_LABELS, MYASTHENIA_GRAVIS_CITATIONS } from './myasthenia-gravis';
export { ECMO_NODES, ECMO_MODULE_LABELS, ECMO_CITATIONS } from './ecmo';
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
