// MedKitt — Tree Data Service
// Three-tier fallback: Supabase → IndexedDB → hardcoded static data.
// Loads tree data on demand (per tree) instead of all 22 trees upfront.
import { supabaseFetch } from './supabase.js';
import { cacheGetFiltered, cachePutMany, setLastSync, getLastSync } from './cache-db.js';
// In-memory cache keyed by tree ID
const treeCache = new Map();
const STALE_MS = 60 * 60 * 1000;
function mapNodeRow(row) {
    const node = {
        id: row.id,
        type: row.type,
        module: row.module,
        title: row.title,
        body: row.body,
    };
    if (row.citation && row.citation.length > 0)
        node.citation = row.citation;
    if (row.options && row.options.length > 0)
        node.options = row.options;
    if (row.inputs && row.inputs.length > 0)
        node.inputs = row.inputs;
    if (row.next)
        node.next = row.next;
    if (row.recommendation)
        node.recommendation = row.recommendation;
    if (row.treatment)
        node.treatment = row.treatment;
    if (row.confidence)
        node.confidence = row.confidence;
    if (row.images && row.images.length > 0)
        node.images = row.images;
    if (row.calculator_links && row.calculator_links.length > 0)
        node.calculatorLinks = row.calculator_links;
    return node;
}
/** Try loading a tree from IndexedDB cache */
async function loadFromCache(treeId) {
    try {
        const nodes = await cacheGetFiltered('decision_nodes', r => r.tree_id === treeId);
        if (nodes.length === 0)
            return null;
        const citations = await cacheGetFiltered('tree_citations', r => r.tree_id === treeId);
        // We need tree metadata (module_labels, entry_node_id) — stored in category service's cache
        // For simplicity, extract from the cached category_trees or fall back
        const meta = await getTreeMeta(treeId);
        if (!meta)
            return null;
        // Load critical actions from hardcoded tree files (not stored in DB)
        const criticalActions = await loadCriticalActionsOnly(treeId);
        return {
            nodes: nodes.sort((a, b) => a.sort_order - b.sort_order).map(mapNodeRow),
            entryNodeId: meta.entry_node_id,
            categoryId: '', // Not critical — only used for reference panel routing
            moduleLabels: meta.module_labels,
            citations: citations.sort((a, b) => a.num - b.num).map(c => ({ num: c.num, text: c.text })),
            criticalActions,
        };
    }
    catch {
        return null;
    }
}
/** Get tree metadata from Supabase cache or fetch */
async function getTreeMeta(treeId) {
    try {
        const result = await supabaseFetch('decision_trees', `select=*&id=eq.${treeId}`);
        if (result.data && result.data.length > 0)
            return result.data[0];
    }
    catch {
        // offline
    }
    return null;
}
/** Fetch a tree from Supabase and cache it */
async function fetchFromSupabase(treeId) {
    const [nodesResult, citationsResult, metaResult] = await Promise.all([
        supabaseFetch('decision_nodes', `select=*&tree_id=eq.${treeId}&order=sort_order`),
        supabaseFetch('tree_citations', `select=*&tree_id=eq.${treeId}&order=num`),
        supabaseFetch('decision_trees', `select=*&id=eq.${treeId}`),
    ]);
    if (!nodesResult.data || nodesResult.data.length === 0 || !metaResult.data || metaResult.data.length === 0) {
        return null;
    }
    const meta = metaResult.data[0];
    // Load critical actions from hardcoded tree files (not stored in DB)
    const criticalActions = await loadCriticalActionsOnly(treeId);
    const config = {
        nodes: nodesResult.data.map(mapNodeRow),
        entryNodeId: meta.entry_node_id,
        categoryId: '',
        moduleLabels: meta.module_labels,
        citations: (citationsResult.data ?? []).map(c => ({ num: c.num, text: c.text })),
        criticalActions,
    };
    // Cache for offline
    await cachePutMany('decision_nodes', nodesResult.data);
    await cachePutMany('tree_citations', citationsResult.data ?? []);
    await setLastSync(`tree:${treeId}`);
    return config;
}
/** Load only critical actions from hardcoded tree files */
async function loadCriticalActionsOnly(treeId) {
    const CRITICAL_ACTIONS_IMPORTS = {
        'difficult-airway-bougie': async () => (await import('../data/trees/difficult-airway-bougie.js')).DIFFICULT_AIRWAY_BOUGIE_CRITICAL_ACTIONS,
        'pneumothorax': async () => (await import('../data/trees/pneumothorax.js')).PNEUMOTHORAX_CRITICAL_ACTIONS,
        'pe-treatment': async () => (await import('../data/trees/pe-treatment.js')).PE_TREATMENT_CRITICAL_ACTIONS,
        'priapism': async () => (await import('../data/trees/priapism.js')).PRIAPISM_CRITICAL_ACTIONS,
        'afib-rvr': async () => (await import('../data/trees/afib-rvr.js')).AFIB_RVR_CRITICAL_ACTIONS,
        'chest-tube': async () => (await import('../data/trees/chest-tube.js')).CHEST_TUBE_CRITICAL_ACTIONS,
        'chs': async () => (await import('../data/trees/chs.js')).CHS_CRITICAL_ACTIONS,
        'pep': async () => (await import('../data/trees/pep.js')).PEP_CRITICAL_ACTIONS,
        'stroke': async () => (await import('../data/trees/stroke.js')).STROKE_CRITICAL_ACTIONS,
        'nstemi': async () => (await import('../data/trees/nstemi.js')).NSTEMI_CRITICAL_ACTIONS,
        'stemi': async () => (await import('../data/trees/stemi.js')).STEMI_CRITICAL_ACTIONS,
        'syncope': async () => (await import('../data/trees/syncope.js')).SYNCOPE_CRITICAL_ACTIONS,
        'potassium': async () => (await import('../data/trees/potassium.js')).POTASSIUM_CRITICAL_ACTIONS,
        'sodium': async () => (await import('../data/trees/sodium.js')).SODIUM_CRITICAL_ACTIONS,
        'acid-base': async () => (await import('../data/trees/acid-base.js')).ACID_BASE_CRITICAL_ACTIONS,
        'adrenal-insufficiency': async () => (await import('../data/trees/adrenal-insufficiency.js')).ADRENAL_INSUFFICIENCY_CRITICAL_ACTIONS,
        'thyroid': async () => (await import('../data/trees/thyroid.js')).THYROID_CRITICAL_ACTIONS,
        'croup': async () => (await import('../data/trees/croup.js')).CROUP_CRITICAL_ACTIONS,
        'uti-peds': async () => (await import('../data/trees/uti-peds.js')).UTI_PEDS_CRITICAL_ACTIONS,
        'peds-fever': async () => (await import('../data/trees/peds-fever.js')).PEDS_FEVER_CRITICAL_ACTIONS,
        'bronchiolitis': async () => (await import('../data/trees/bronchiolitis.js')).BRONCHIOLITIS_CRITICAL_ACTIONS,
        'echo-epss': async () => (await import('../data/trees/echo-epss.js')).ECHO_EPSS_CRITICAL_ACTIONS,
        'echo-views': async () => (await import('../data/trees/echo-views.js')).ECHO_VIEWS_CRITICAL_ACTIONS,
        'shoulder-dystocia': async () => (await import('../data/trees/shoulder-dystocia.js')).SHOULDER_DYSTOCIA_CRITICAL_ACTIONS,
        'precip-delivery': async () => (await import('../data/trees/precip-delivery.js')).PRECIP_DELIVERY_CRITICAL_ACTIONS,
        'neonatal-resus': async () => (await import('../data/trees/neonatal-resus.js')).NEONATAL_RESUS_CRITICAL_ACTIONS,
        'distal-radius': async () => (await import('../data/trees/distal-radius.js')).DISTAL_RADIUS_CRITICAL_ACTIONS,
        'splinting': async () => (await import('../data/trees/splinting.js')).SPLINTING_CRITICAL_ACTIONS,
        'neurosyphilis': async () => (await import('../data/trees/neurosyphilis.js')).NEUROSYPHILIS_CRITICAL_ACTIONS,
        'syphilis': async () => (await import('../data/trees/syphilis.js')).SYPHILIS_CRITICAL_ACTIONS,
        'rabies': async () => (await import('../data/trees/rabies.js')).RABIES_CRITICAL_ACTIONS,
        'burns': async () => (await import('../data/trees/burns.js')).BURNS_CRITICAL_ACTIONS,
        'psych-assessment': async () => (await import('../data/trees/psych-assessment.js')).PSYCH_ASSESSMENT_CRITICAL_ACTIONS,
        'ich': async () => (await import('../data/trees/ich.js')).ICH_CRITICAL_ACTIONS,
        'sah': async () => (await import('../data/trees/sah.js')).SAH_CRITICAL_ACTIONS,
        'aub': async () => (await import('../data/trees/aub.js')).AUB_CRITICAL_ACTIONS,
        'status-epilepticus': async () => (await import('../data/trees/status-epilepticus.js')).STATUS_EPILEPTICUS_CRITICAL_ACTIONS,
        'opioid-withdrawal': async () => (await import('../data/trees/opioid-withdrawal.js')).OPIOID_WITHDRAWAL_CRITICAL_ACTIONS,
        'alcohol-withdrawal': async () => (await import('../data/trees/alcohol-withdrawal.js')).ALCOHOL_WITHDRAWAL_CRITICAL_ACTIONS,
        'first-trimester': async () => (await import('../data/trees/first-trimester.js')).FIRST_TRIMESTER_CRITICAL_ACTIONS,
        'acute-pancreatitis': async () => (await import('../data/trees/acute-pancreatitis.js')).ACUTE_PANCREATITIS_CRITICAL_ACTIONS,
        'upper-gi-bleed': async () => (await import('../data/trees/upper-gi-bleed.js')).UPPER_GI_BLEED_CRITICAL_ACTIONS,
        'diarrhea': async () => (await import('../data/trees/diarrhea.js')).DIARRHEA_CRITICAL_ACTIONS,
        'hiv': async () => (await import('../data/trees/hiv.js')).HIV_CRITICAL_ACTIONS,
        'meningitis': async () => (await import('../data/trees/meningitis.js')).MENINGITIS_CRITICAL_ACTIONS,
        'delirium': async () => (await import('../data/trees/delirium.js')).DELIRIUM_CRITICAL_ACTIONS,
        'anaphylaxis': async () => (await import('../data/trees/anaphylaxis.js')).ANAPHYLAXIS_CRITICAL_ACTIONS,
        'angioedema': async () => (await import('../data/trees/angioedema.js')).ANGIOEDEMA_CRITICAL_ACTIONS,
        'sickle-cell': async () => (await import('../data/trees/sickle-cell.js')).SICKLE_CELL_CRITICAL_ACTIONS,
        'hemophilia': async () => (await import('../data/trees/hemophilia.js')).HEMOPHILIA_CRITICAL_ACTIONS,
        'anticoag-reversal': async () => (await import('../data/trees/anticoag-reversal.js')).ANTICOAG_REVERSAL_CRITICAL_ACTIONS,
        'tca-toxidrome': async () => (await import('../data/trees/tca-toxidrome.js')).TCA_TOXIDROME_CRITICAL_ACTIONS,
        'salicylate': async () => (await import('../data/trees/salicylate.js')).SALICYLATE_CRITICAL_ACTIONS,
        'acetaminophen': async () => (await import('../data/trees/acetaminophen.js')).ACETAMINOPHEN_OD_CRITICAL_ACTIONS,
        'dka': async () => (await import('../data/trees/dka.js')).DKA_CRITICAL_ACTIONS,
        'diabetes-management': async () => (await import('../data/trees/diabetes-management.js')).DIABETES_MANAGEMENT_CRITICAL_ACTIONS,
        'sepsis': async () => (await import('../data/trees/sepsis.js')).SEPSIS_CRITICAL_ACTIONS,
        'tuberculosis': async () => (await import('../data/trees/tuberculosis.js')).TUBERCULOSIS_CRITICAL_ACTIONS,
        'combative-patient': async () => (await import('../data/trees/combative-patient.js')).COMBATIVE_PATIENT_CRITICAL_ACTIONS,
        'chf-exacerbation': async () => (await import('../data/trees/chf-exacerbation.js')).CHF_EXACERBATION_CRITICAL_ACTIONS,
        'migraine': async () => (await import('../data/trees/migraine.js')).MIGRAINE_CRITICAL_ACTIONS,
        'vertigo': async () => (await import('../data/trees/vertigo.js')).VERTIGO_CRITICAL_ACTIONS,
        'snake-envenomation': async () => (await import('../data/trees/snake-envenomation.js')).SNAKE_ENVENOMATION_CRITICAL_ACTIONS,
        'aacg': async () => (await import('../data/trees/aacg.js')).AACG_CRITICAL_ACTIONS,
        'chemical-burn': async () => (await import('../data/trees/chemical-burn.js')).CHEMICAL_BURN_CRITICAL_ACTIONS,
        'orbital-cellulitis': async () => (await import('../data/trees/orbital-cellulitis.js')).ORBITAL_CELLULITIS_CRITICAL_ACTIONS,
        'crao': async () => (await import('../data/trees/crao.js')).CRAO_CRITICAL_ACTIONS,
        'globe-rupture': async () => (await import('../data/trees/globe-rupture.js')).GLOBE_RUPTURE_CRITICAL_ACTIONS,
        'ocular-pocus': async () => (await import('../data/trees/ocular-pocus.js')).OCULAR_POCUS_CRITICAL_ACTIONS,
        'diplopia': async () => (await import('../data/trees/diplopia.js')).DIPLOPIA_CRITICAL_ACTIONS,
        'pacemaker': async () => (await import('../data/trees/pacemaker.js')).PACEMAKER_CRITICAL_ACTIONS,
        'urinary-retention': async () => (await import('../data/trees/urinary-retention.js')).URINARY_RETENTION_CRITICAL_ACTIONS,
        'caustic-ingestion': async () => (await import('../data/trees/caustic-ingestion.js')).CAUSTIC_INGESTION_CRITICAL_ACTIONS,
        'epistaxis': async () => (await import('../data/trees/epistaxis.js')).EPISTAXIS_CRITICAL_ACTIONS,
        'psychiatry-assessment': async () => (await import('../data/trees/psychiatry-assessment.js')).PSYCHIATRY_ASSESSMENT_CRITICAL_ACTIONS,
        'massive-transfusion': async () => (await import('../data/trees/massive-transfusion.js')).MASSIVE_TRANSFUSION_CRITICAL_ACTIONS,
        'pelvic-fracture': async () => (await import('../data/trees/pelvic-fracture.js')).PELVIC_FRACTURE_CRITICAL_ACTIONS,
        'serotonin-syndrome': async () => (await import('../data/trees/serotonin-syndrome.js')).SEROTONIN_SYNDROME_CRITICAL_ACTIONS,
        'digoxin-toxicity': async () => (await import('../data/trees/digoxin-toxicity.js')).DIGOXIN_TOXICITY_CRITICAL_ACTIONS,
        'beta-blocker-od': async () => (await import('../data/trees/beta-blocker-od.js')).BETA_BLOCKER_OD_CRITICAL_ACTIONS,
        'ccb-od': async () => (await import('../data/trees/ccb-od.js')).CCB_OD_CRITICAL_ACTIONS,
        'iron-od': async () => (await import('../data/trees/iron-od.js')).IRON_OD_CRITICAL_ACTIONS,
        'co-toxicity': async () => (await import('../data/trees/co-toxicity.js')).CO_TOXICITY_CRITICAL_ACTIONS,
        'guillain-barre': async () => (await import('../data/trees/guillain-barre.js')).GUILLAIN_BARRE_CRITICAL_ACTIONS,
        'myasthenia-gravis': async () => (await import('../data/trees/myasthenia-gravis.js')).MYASTHENIA_GRAVIS_CRITICAL_ACTIONS,
        'botulism': async () => (await import('../data/trees/botulism.js')).BOTULISM_CRITICAL_ACTIONS,
        'ecmo': async () => (await import('../data/trees/ecmo.js')).ECMO_CRITICAL_ACTIONS,
        'push-dose-pressors': async () => (await import('../data/trees/push-dose-pressors.js')).PUSH_DOSE_PRESSORS_CRITICAL_ACTIONS,
        'aortic-aneurysm': async () => (await import('../data/trees/aortic-aneurysm.js')).AORTIC_ANEURYSM_CRITICAL_ACTIONS,
        'measles': async () => (await import('../data/trees/measles.js')).MEASLES_CRITICAL_ACTIONS,
        'trach-emergency': async () => (await import('../data/trees/trach-emergency.js')).TRACH_EMERGENCY_CRITICAL_ACTIONS,
        'methemoglobinemia': async () => (await import('../data/trees/methemoglobinemia.js')).METHEMOGLOBINEMIA_CRITICAL_ACTIONS,
        'extensor-tendon': async () => (await import('../data/trees/extensor-tendon.js')).EXTENSOR_TENDON_CRITICAL_ACTIONS,
        'deep-neck-infection': async () => (await import('../data/trees/deep-neck-infection.js')).DEEP_NECK_INFECTION_CRITICAL_ACTIONS,
        'vp-shunt': async () => (await import('../data/trees/vp-shunt.js')).VP_SHUNT_CRITICAL_ACTIONS,
        'peds-osteomyelitis': async () => (await import('../data/trees/peds-osteomyelitis.js')).PEDS_OSTEOMYELITIS_CRITICAL_ACTIONS,
        'copd-exacerbation': async () => (await import('../data/trees/copd-exacerbation.js')).COPD_EXACERBATION_CRITICAL_ACTIONS,
        'septic-arthritis': async () => (await import('../data/trees/septic-arthritis.js')).SEPTIC_ARTHRITIS_CRITICAL_ACTIONS,
        'hfnc': async () => (await import('../data/trees/hfnc.js')).HFNC_CRITICAL_ACTIONS,
        'oxygen-delivery': async () => (await import('../data/trees/oxygen-delivery.js')).OXYGEN_DELIVERY_CRITICAL_ACTIONS,
        'peds-stec-hus': async () => (await import('../data/trees/peds-stec-hus.js')).PEDS_STEC_HUS_CRITICAL_ACTIONS,
        'nail-bed-injuries': async () => (await import('../data/trees/nail-bed-injuries.js')).NAIL_BED_INJURIES_CRITICAL_ACTIONS,
        'eclampsia': async () => (await import('../data/trees/eclampsia.js')).ECLAMPSIA_CRITICAL_ACTIONS,
        'aortic-dissection': async () => (await import('../data/trees/aortic-dissection.js')).AORTIC_DISSECTION_CRITICAL_ACTIONS,
        'intralipid': async () => (await import('../data/trees/intralipid.js')).INTRALIPID_CRITICAL_ACTIONS,
        'rhabdomyolysis': async () => (await import('../data/trees/rhabdomyolysis.js')).RHABDOMYOLYSIS_CRITICAL_ACTIONS,
        'viral-myositis': async () => (await import('../data/trees/viral-myositis.js')).VIRAL_MYOSITIS_CRITICAL_ACTIONS,
        'ed-methadone': async () => (await import('../data/trees/ed-methadone.js')).ED_METHADONE_CRITICAL_ACTIONS,
        'cvst': async () => (await import('../data/trees/cvst.js')).CVST_CRITICAL_ACTIONS,
        'shoulder-dislocation': async () => (await import('../data/trees/shoulder-dislocation.js')).SHOULDER_DISLOCATION_CRITICAL_ACTIONS,
        'peds-submersion': async () => (await import('../data/trees/peds-submersion.js')).PEDS_SUBMERSION_CRITICAL_ACTIONS,
        'brugada-syndrome': async () => (await import('../data/trees/brugada-syndrome.js')).BRUGADA_SYNDROME_CRITICAL_ACTIONS,
        'hd-emergencies': async () => (await import('../data/trees/hd-emergencies.js')).HD_EMERGENCIES_CRITICAL_ACTIONS,
        'marine-envenomation': async () => (await import('../data/trees/marine-envenomation.js')).MARINE_ENVENOMATION_CRITICAL_ACTIONS,
        'button-battery': async () => (await import('../data/trees/button-battery.js')).BUTTON_BATTERY_CRITICAL_ACTIONS,
        'nat-screening': async () => (await import('../data/trees/nat-screening.js')).NAT_SCREENING_CRITICAL_ACTIONS,
        'massive-hemoptysis': async () => (await import('../data/trees/massive-hemoptysis.js')).MASSIVE_HEMOPTYSIS_CRITICAL_ACTIONS,
        'xylazine-toxicity': async () => (await import('../data/trees/xylazine-toxicity.js')).XYLAZINE_TOXICITY_CRITICAL_ACTIONS,
        'laryngeal-trauma': async () => (await import('../data/trees/laryngeal-trauma.js')).LARYNGEAL_TRAUMA_CRITICAL_ACTIONS,
        'refractory-vfvt': async () => (await import('../data/trees/refractory-vfvt.js')).REFRACTORY_VFVT_CRITICAL_ACTIONS,
        'vad': async () => (await import('../data/trees/vad.js')).VAD_CRITICAL_ACTIONS,
        'torsades-de-pointes': async () => (await import('../data/trees/torsades-de-pointes.js')).TORSADES_DE_POINTES_CRITICAL_ACTIONS,
        'cardiac-arrest': async () => (await import('../data/trees/cardiac-arrest.js')).CARDIAC_ARREST_CRITICAL_ACTIONS,
        'pea-arrest': async () => (await import('../data/trees/pea-arrest.js')).PEA_ARREST_CRITICAL_ACTIONS,
        'bradycardic-arrest': async () => (await import('../data/trees/bradycardic-arrest.js')).BRADYCARDIC_ARREST_CRITICAL_ACTIONS,
        'ventricular-tachycardia': async () => (await import('../data/trees/ventricular-tachycardia.js')).VENTRICULAR_TACHYCARDIA_CRITICAL_ACTIONS,
        'post-rosc': async () => (await import('../data/trees/post-rosc.js')).POST_ROSC_CRITICAL_ACTIONS,
        'cardiogenic-shock': async () => (await import('../data/trees/cardiogenic-shock.js')).CARDIOGENIC_SHOCK_CRITICAL_ACTIONS,
        'pe-pregnancy': async () => (await import('../data/trees/pe-pregnancy.js')).PE_PREGNANCY_CRITICAL_ACTIONS,
        'cervical-artery-dissection': async () => (await import('../data/trees/cervical-artery-dissection.js')).CERVICAL_ARTERY_DISSECTION_CRITICAL_ACTIONS,
        'code-status': async () => (await import('../data/trees/code-status.js')).CODE_STATUS_CRITICAL_ACTIONS,
        'human-trafficking': async () => (await import('../data/trees/human-trafficking.js')).HUMAN_TRAFFICKING_CRITICAL_ACTIONS,
        'dental-avulsion': async () => (await import('../data/trees/dental-avulsion.js')).DENTAL_AVULSION_CRITICAL_ACTIONS,
        'dental-trauma': async () => (await import('../data/trees/dental-trauma.js')).DENTAL_TRAUMA_CRITICAL_ACTIONS,
        'pta-drainage': async () => (await import('../data/trees/pta-drainage.js')).PTA_DRAINAGE_CRITICAL_ACTIONS,
        'heat-stroke': async () => (await import('../data/trees/heat-stroke.js')).HEAT_STROKE_CRITICAL_ACTIONS,
        'hypothermia': async () => (await import('../data/trees/hypothermia.js')).HYPOTHERMIA_CRITICAL_ACTIONS,
        'awake-intubation': async () => (await import('../data/trees/awake-intubation.js')).AWAKE_INTUBATION_CRITICAL_ACTIONS,
        'ear-fb': async () => (await import('../data/trees/ear-fb.js')).EAR_FB_CRITICAL_ACTIONS,
        'suicide-risk-assessment': async () => (await import('../data/trees/suicide-risk-assessment.js')).SUICIDE_RISK_CRITICAL_ACTIONS,
        'ct-decision-support': async () => (await import('../data/trees/ct-decision-support.js')).CT_DECISION_SUPPORT_CRITICAL_ACTIONS,
        'dfsa-workup': async () => (await import('../data/trees/dfsa-workup.js')).DFSA_WORKUP_CRITICAL_ACTIONS,
        'urinary-sphincter': async () => (await import('../data/trees/urinary-sphincter.js')).URINARY_SPHINCTER_CRITICAL_ACTIONS,
        'eating-disorders': async () => (await import('../data/trees/eating-disorders.js')).EATING_DISORDERS_CRITICAL_ACTIONS,
        'peds-trauma': async () => (await import('../data/trees/peds-trauma.js')).PEDS_TRAUMA_CRITICAL_ACTIONS,
        'ohss': async () => (await import('../data/trees/ohss.js')).OHSS_CRITICAL_ACTIONS,
        'rhogam-early-pregnancy': async () => (await import('../data/trees/rhogam-early-pregnancy.js')).RHOGAM_EARLY_PREGNANCY_CRITICAL_ACTIONS,
        'sti-comprehensive': async () => (await import('../data/trees/sti-comprehensive.js')).STI_COMPREHENSIVE_CRITICAL_ACTIONS,
        'approach-to-arthritis': async () => (await import('../data/trees/approach-to-arthritis.js')).APPROACH_TO_ARTHRITIS_CRITICAL_ACTIONS,
        'diabetic-foot-wounds': async () => (await import('../data/trees/diabetic-foot-wounds.js')).DIABETIC_FOOT_WOUNDS_CRITICAL_ACTIONS,
        'pediatric-arthritis': async () => (await import('../data/trees/pediatric-arthritis.js')).PEDIATRIC_ARTHRITIS_CRITICAL_ACTIONS,
        'gout': async () => (await import('../data/trees/gout.js')).GOUT_CRITICAL_ACTIONS,
        'hop-killers': async () => (await import('../data/trees/hop-killers.js')).HOP_KILLERS_CRITICAL_ACTIONS,
        'tia-workup': async () => (await import('../data/trees/tia-workup.js')).TIA_WORKUP_CRITICAL_ACTIONS,
        'peripartum-cardiomyopathy': async () => (await import('../data/trees/peripartum-cardiomyopathy.js')).PERIPARTUM_CARDIOMYOPATHY_CRITICAL_ACTIONS,
        'ciguatera': async () => (await import('../data/trees/ciguatera.js')).CIGUATERA_CRITICAL_ACTIONS,
        'traveler-infections': async () => (await import('../data/trees/traveler-infections.js')).TRAVELER_INFECTIONS_CRITICAL_ACTIONS,
        'malaria': async () => (await import('../data/trees/malaria.js')).MALARIA_CRITICAL_ACTIONS,
        'tetanus': async () => (await import('../data/trees/tetanus.js')).TETANUS_CRITICAL_ACTIONS,
        'asthma-exacerbation': async () => (await import('../data/trees/asthma-exacerbation.js')).ASTHMA_EXACERBATION_CRITICAL_ACTIONS,
        'adult-uti': async () => (await import('../data/trees/adult-uti.js')).ADULT_UTI_CRITICAL_ACTIONS,
        'ttp': async () => (await import('../data/trees/ttp.js')).TTP_CRITICAL_ACTIONS,
        'tracheo-innominate-fistula': async () => (await import('../data/trees/tracheo-innominate-fistula.js')).TRACHEO_INNOMINATE_FISTULA_CRITICAL_ACTIONS,
        'le-fort-fracture': async () => (await import('../data/trees/le-fort-fracture.js')).LE_FORT_FRACTURE_CRITICAL_ACTIONS,
        'lumbar-puncture': async () => (await import('../data/trees/lumbar-puncture.js')).LUMBAR_PUNCTURE_CRITICAL_ACTIONS,
        'multiple-sclerosis': async () => (await import('../data/trees/multiple-sclerosis.js')).MULTIPLE_SCLEROSIS_CRITICAL_ACTIONS,
        'burr-hole': async () => (await import('../data/trees/burr-hole.js')).BURR_HOLE_CRITICAL_ACTIONS,
        'rv-assessment': async () => (await import('../data/trees/rv-assessment.js')).RV_ASSESSMENT_CRITICAL_ACTIONS,
        'cervical-spine': async () => (await import('../data/trees/cervical-spine.js')).CERVICAL_SPINE_CRITICAL_ACTIONS,
        'dvt': async () => (await import('../data/trees/dvt.js')).DVT_CRITICAL_ACTIONS,
        'intussusception': async () => (await import('../data/trees/intussusception.js')).INTUSSUSCEPTION_CRITICAL_ACTIONS,
        'fishhook-removal': async () => (await import('../data/trees/fishhook-removal.js')).FISHHOOK_REMOVAL_CRITICAL_ACTIONS,
        'vafei': async () => (await import('../data/trees/vafei.js')).VAFEI_CRITICAL_ACTIONS,
        'blood-culture-stewardship': async () => (await import('../data/trees/blood-culture-stewardship.js')).BLOOD_CULTURE_STEWARDSHIP_CRITICAL_ACTIONS,
    };
    const loader = CRITICAL_ACTIONS_IMPORTS[treeId];
    if (!loader)
        return undefined;
    try {
        return await loader();
    }
    catch {
        return undefined;
    }
}
/** Hardcoded fallback — dynamically import the tree file */
async function loadHardcodedFallback(treeId) {
    const TREE_IMPORTS = {
        'difficult-airway-bougie': async () => {
            const m = await import('../data/trees/difficult-airway-bougie.js');
            return { nodes: m.DIFFICULT_AIRWAY_BOUGIE_NODES, entryNodeId: 'dab-start', categoryId: 'anesthesia-airway', moduleLabels: m.DIFFICULT_AIRWAY_BOUGIE_MODULE_LABELS, citations: m.DIFFICULT_AIRWAY_BOUGIE_CITATIONS, criticalActions: m.DIFFICULT_AIRWAY_BOUGIE_CRITICAL_ACTIONS };
        },
        'pneumothorax': async () => {
            const m = await import('../data/trees/pneumothorax.js');
            return { nodes: m.PNEUMOTHORAX_NODES, entryNodeId: 'pneumothorax-start', categoryId: 'us-rads', moduleLabels: m.PNEUMOTHORAX_MODULE_LABELS, citations: m.PNEUMOTHORAX_CITATIONS, criticalActions: m.PNEUMOTHORAX_CRITICAL_ACTIONS };
        },
        'pe-treatment': async () => {
            const m = await import('../data/trees/pe-treatment.js');
            return { nodes: m.PE_TREATMENT_NODES, entryNodeId: 'pe-start', categoryId: 'critical-care', moduleLabels: m.PE_TREATMENT_MODULE_LABELS, citations: m.PE_TREATMENT_CITATIONS, criticalActions: m.PE_TREATMENT_CRITICAL_ACTIONS };
        },
        'priapism': async () => {
            const m = await import('../data/trees/priapism.js');
            return { nodes: m.PRIAPISM_NODES, entryNodeId: 'priapism-start', categoryId: 'procedures', moduleLabels: m.PRIAPISM_MODULE_LABELS, citations: m.PRIAPISM_CITATIONS, criticalActions: m.PRIAPISM_CRITICAL_ACTIONS };
        },
        'afib-rvr': async () => {
            const m = await import('../data/trees/afib-rvr.js');
            return { nodes: m.AFIB_RVR_NODES, entryNodeId: 'afib-start', categoryId: 'cardiology', moduleLabels: m.AFIB_RVR_MODULE_LABELS, citations: m.AFIB_RVR_CITATIONS, criticalActions: m.AFIB_RVR_CRITICAL_ACTIONS };
        },
        'chest-tube': async () => {
            const m = await import('../data/trees/chest-tube.js');
            return { nodes: m.CHEST_TUBE_NODES, entryNodeId: 'ctube-start', categoryId: 'trauma-surg', moduleLabels: m.CHEST_TUBE_MODULE_LABELS, citations: m.CHEST_TUBE_CITATIONS, criticalActions: m.CHEST_TUBE_CRITICAL_ACTIONS };
        },
        'chs': async () => {
            const m = await import('../data/trees/chs.js');
            return { nodes: m.CHS_NODES, entryNodeId: 'chs-start', categoryId: 'gastroenterology', moduleLabels: m.CHS_MODULE_LABELS, citations: m.CHS_CITATIONS, criticalActions: m.CHS_CRITICAL_ACTIONS };
        },
        'pep': async () => {
            const m = await import('../data/trees/pep.js');
            return { nodes: m.PEP_NODES, entryNodeId: 'pep-start', categoryId: 'infectious-disease', moduleLabels: m.PEP_MODULE_LABELS, citations: m.PEP_CITATIONS, criticalActions: m.PEP_CRITICAL_ACTIONS };
        },
        'stroke': async () => {
            const m = await import('../data/trees/stroke.js');
            return { nodes: m.STROKE_NODES, entryNodeId: 'stroke-start', categoryId: 'neurology', moduleLabels: m.STROKE_MODULE_LABELS, citations: m.STROKE_CITATIONS, criticalActions: m.STROKE_CRITICAL_ACTIONS };
        },
        'nstemi': async () => {
            const m = await import('../data/trees/nstemi.js');
            return { nodes: m.NSTEMI_NODES, entryNodeId: 'nstemi-start', categoryId: 'cardiology', moduleLabels: m.NSTEMI_MODULE_LABELS, citations: m.NSTEMI_CITATIONS, criticalActions: m.NSTEMI_CRITICAL_ACTIONS };
        },
        'stemi': async () => {
            const m = await import('../data/trees/stemi.js');
            return { nodes: m.STEMI_NODES, entryNodeId: 'stemi-start', categoryId: 'cardiology', moduleLabels: m.STEMI_MODULE_LABELS, citations: m.STEMI_CITATIONS, criticalActions: m.STEMI_CRITICAL_ACTIONS };
        },
        'syncope': async () => {
            const m = await import('../data/trees/syncope.js');
            return { nodes: m.SYNCOPE_NODES, entryNodeId: 'sync-start', categoryId: 'cardiology', moduleLabels: m.SYNCOPE_MODULE_LABELS, citations: m.SYNCOPE_CITATIONS, criticalActions: m.SYNCOPE_CRITICAL_ACTIONS };
        },
        'potassium': async () => {
            const m = await import('../data/trees/potassium.js');
            return { nodes: m.POTASSIUM_NODES, entryNodeId: 'k-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.POTASSIUM_MODULE_LABELS, citations: m.POTASSIUM_CITATIONS, criticalActions: m.POTASSIUM_CRITICAL_ACTIONS };
        },
        'sodium': async () => {
            const m = await import('../data/trees/sodium.js');
            return { nodes: m.SODIUM_NODES, entryNodeId: 'na-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.SODIUM_MODULE_LABELS, citations: m.SODIUM_CITATIONS, criticalActions: m.SODIUM_CRITICAL_ACTIONS };
        },
        'acid-base': async () => {
            const m = await import('../data/trees/acid-base.js');
            return { nodes: m.ACID_BASE_NODES, entryNodeId: 'ab-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.ACID_BASE_MODULE_LABELS, citations: m.ACID_BASE_CITATIONS, criticalActions: m.ACID_BASE_CRITICAL_ACTIONS };
        },
        'adrenal-insufficiency': async () => {
            const m = await import('../data/trees/adrenal-insufficiency.js');
            return { nodes: m.ADRENAL_INSUFFICIENCY_NODES, entryNodeId: 'ai-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.ADRENAL_INSUFFICIENCY_MODULE_LABELS, citations: m.ADRENAL_INSUFFICIENCY_CITATIONS, criticalActions: m.ADRENAL_INSUFFICIENCY_CRITICAL_ACTIONS };
        },
        'thyroid': async () => {
            const m = await import('../data/trees/thyroid.js');
            return { nodes: m.THYROID_NODES, entryNodeId: 'thyroid-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.THYROID_MODULE_LABELS, citations: m.THYROID_CITATIONS, criticalActions: m.THYROID_CRITICAL_ACTIONS };
        },
        'croup': async () => {
            const m = await import('../data/trees/croup.js');
            return { nodes: m.CROUP_NODES, entryNodeId: 'croup-start', categoryId: 'pediatrics', moduleLabels: m.CROUP_MODULE_LABELS, citations: m.CROUP_CITATIONS, criticalActions: m.CROUP_CRITICAL_ACTIONS };
        },
        'uti-peds': async () => {
            const m = await import('../data/trees/uti-peds.js');
            return { nodes: m.UTI_PEDS_NODES, entryNodeId: 'uti-start', categoryId: 'pediatrics', moduleLabels: m.UTI_PEDS_MODULE_LABELS, citations: m.UTI_PEDS_CITATIONS, criticalActions: m.UTI_PEDS_CRITICAL_ACTIONS };
        },
        'peds-fever': async () => {
            const m = await import('../data/trees/peds-fever.js');
            return { nodes: m.PEDS_FEVER_NODES, entryNodeId: 'pf-start', categoryId: 'pediatrics', moduleLabels: m.PEDS_FEVER_MODULE_LABELS, citations: m.PEDS_FEVER_CITATIONS, criticalActions: m.PEDS_FEVER_CRITICAL_ACTIONS };
        },
        'bronchiolitis': async () => {
            const m = await import('../data/trees/bronchiolitis.js');
            return { nodes: m.BRONCHIOLITIS_NODES, entryNodeId: 'bronch-start', categoryId: 'pediatrics', moduleLabels: m.BRONCHIOLITIS_MODULE_LABELS, citations: m.BRONCHIOLITIS_CITATIONS, criticalActions: m.BRONCHIOLITIS_CRITICAL_ACTIONS };
        },
        'echo-epss': async () => {
            const m = await import('../data/trees/echo-epss.js');
            return { nodes: m.ECHO_EPSS_NODES, entryNodeId: 'epss-start', categoryId: 'us-rads', moduleLabels: m.ECHO_EPSS_MODULE_LABELS, citations: m.ECHO_EPSS_CITATIONS, criticalActions: m.ECHO_EPSS_CRITICAL_ACTIONS };
        },
        'echo-views': async () => {
            const m = await import('../data/trees/echo-views.js');
            return { nodes: m.ECHO_VIEWS_NODES, entryNodeId: 'echo-views-start', categoryId: 'us-rads', moduleLabels: m.ECHO_VIEWS_MODULE_LABELS, citations: m.ECHO_VIEWS_CITATIONS, criticalActions: m.ECHO_VIEWS_CRITICAL_ACTIONS };
        },
        'shoulder-dystocia': async () => {
            const m = await import('../data/trees/shoulder-dystocia.js');
            return { nodes: m.SHOULDER_DYSTOCIA_NODES, entryNodeId: 'sd-start', categoryId: 'ob-gyn', moduleLabels: m.SHOULDER_DYSTOCIA_MODULE_LABELS, citations: m.SHOULDER_DYSTOCIA_CITATIONS, criticalActions: m.SHOULDER_DYSTOCIA_CRITICAL_ACTIONS };
        },
        'precip-delivery': async () => {
            const m = await import('../data/trees/precip-delivery.js');
            return { nodes: m.PRECIP_DELIVERY_NODES, entryNodeId: 'precip-start', categoryId: 'ob-gyn', moduleLabels: m.PRECIP_DELIVERY_MODULE_LABELS, citations: m.PRECIP_DELIVERY_CITATIONS, criticalActions: m.PRECIP_DELIVERY_CRITICAL_ACTIONS };
        },
        'neonatal-resus': async () => {
            const m = await import('../data/trees/neonatal-resus.js');
            return { nodes: m.NEONATAL_RESUS_NODES, entryNodeId: 'nrp-start', categoryId: 'pediatrics', moduleLabels: m.NEONATAL_RESUS_MODULE_LABELS, citations: m.NEONATAL_RESUS_CITATIONS, criticalActions: m.NEONATAL_RESUS_CRITICAL_ACTIONS };
        },
        'distal-radius': async () => {
            const m = await import('../data/trees/distal-radius.js');
            return { nodes: m.DISTAL_RADIUS_NODES, entryNodeId: 'dr-start', categoryId: 'orthopedics', moduleLabels: m.DISTAL_RADIUS_MODULE_LABELS, citations: m.DISTAL_RADIUS_CITATIONS, criticalActions: m.DISTAL_RADIUS_CRITICAL_ACTIONS };
        },
        'splinting': async () => {
            const m = await import('../data/trees/splinting.js');
            return { nodes: m.SPLINTING_NODES, entryNodeId: 'splint-start', categoryId: 'orthopedics', moduleLabels: m.SPLINTING_MODULE_LABELS, citations: m.SPLINTING_CITATIONS, criticalActions: m.SPLINTING_CRITICAL_ACTIONS };
        },
        'neurosyphilis': async () => {
            const m = await import('../data/trees/neurosyphilis.js');
            return { nodes: m.NEUROSYPHILIS_NODES, entryNodeId: 'ns-start', categoryId: 'infectious-disease', moduleLabels: m.NEUROSYPHILIS_MODULE_LABELS, citations: m.NEUROSYPHILIS_CITATIONS, criticalActions: m.NEUROSYPHILIS_CRITICAL_ACTIONS };
        },
        'syphilis': async () => {
            const m = await import('../data/trees/syphilis.js');
            return { nodes: m.SYPHILIS_NODES, entryNodeId: 'syph-start', categoryId: 'infectious-disease', moduleLabels: m.SYPHILIS_MODULE_LABELS, citations: m.SYPHILIS_CITATIONS, criticalActions: m.SYPHILIS_CRITICAL_ACTIONS };
        },
        'rabies': async () => {
            const m = await import('../data/trees/rabies.js');
            return { nodes: m.RABIES_NODES, entryNodeId: 'rabies-start', categoryId: 'infectious-disease', moduleLabels: m.RABIES_MODULE_LABELS, citations: m.RABIES_CITATIONS, criticalActions: m.RABIES_CRITICAL_ACTIONS };
        },
        'burns': async () => {
            const m = await import('../data/trees/burns.js');
            return { nodes: m.BURNS_NODES, entryNodeId: 'burn-start', categoryId: 'trauma-surg', moduleLabels: m.BURNS_MODULE_LABELS, citations: m.BURNS_CITATIONS, criticalActions: m.BURNS_CRITICAL_ACTIONS };
        },
        'psych-assessment': async () => {
            const m = await import('../data/trees/psych-assessment.js');
            return { nodes: m.PSYCH_ASSESSMENT_NODES, entryNodeId: 'psych-start', categoryId: 'emergency-medicine', moduleLabels: m.PSYCH_ASSESSMENT_MODULE_LABELS, citations: m.PSYCH_ASSESSMENT_CITATIONS, criticalActions: m.PSYCH_ASSESSMENT_CRITICAL_ACTIONS };
        },
        'ich': async () => {
            const m = await import('../data/trees/ich.js');
            return { nodes: m.ICH_NODES, entryNodeId: 'ich-start', categoryId: 'neurology', moduleLabels: m.ICH_MODULE_LABELS, citations: m.ICH_CITATIONS, criticalActions: m.ICH_CRITICAL_ACTIONS };
        },
        'sah': async () => {
            const m = await import('../data/trees/sah.js');
            return { nodes: m.SAH_NODES, entryNodeId: 'sah-start', categoryId: 'neurology', moduleLabels: m.SAH_MODULE_LABELS, citations: m.SAH_CITATIONS, criticalActions: m.SAH_CRITICAL_ACTIONS };
        },
        'aub': async () => {
            const m = await import('../data/trees/aub.js');
            return { nodes: m.AUB_NODES, entryNodeId: 'aub-start', categoryId: 'ob-gyn', moduleLabels: m.AUB_MODULE_LABELS, citations: m.AUB_CITATIONS, criticalActions: m.AUB_CRITICAL_ACTIONS };
        },
        'status-epilepticus': async () => {
            const m = await import('../data/trees/status-epilepticus.js');
            return { nodes: m.STATUS_EPILEPTICUS_NODES, entryNodeId: 'se-start', categoryId: 'neurology', moduleLabels: m.STATUS_EPILEPTICUS_MODULE_LABELS, citations: m.STATUS_EPILEPTICUS_CITATIONS, criticalActions: m.STATUS_EPILEPTICUS_CRITICAL_ACTIONS };
        },
        'opioid-withdrawal': async () => {
            const m = await import('../data/trees/opioid-withdrawal.js');
            return { nodes: m.OPIOID_WITHDRAWAL_NODES, entryNodeId: 'ow-start', categoryId: 'emergency-medicine', moduleLabels: m.OPIOID_WITHDRAWAL_MODULE_LABELS, citations: m.OPIOID_WITHDRAWAL_CITATIONS, criticalActions: m.OPIOID_WITHDRAWAL_CRITICAL_ACTIONS };
        },
        'alcohol-withdrawal': async () => {
            const m = await import('../data/trees/alcohol-withdrawal.js');
            return { nodes: m.ALCOHOL_WITHDRAWAL_NODES, entryNodeId: 'aw-start', categoryId: 'emergency-medicine', moduleLabels: m.ALCOHOL_WITHDRAWAL_MODULE_LABELS, citations: m.ALCOHOL_WITHDRAWAL_CITATIONS, criticalActions: m.ALCOHOL_WITHDRAWAL_CRITICAL_ACTIONS };
        },
        'first-trimester': async () => {
            const m = await import('../data/trees/first-trimester.js');
            return { nodes: m.FIRST_TRIMESTER_NODES, entryNodeId: 'ft-start', categoryId: 'ob-gyn', moduleLabels: m.FIRST_TRIMESTER_MODULE_LABELS, citations: m.FIRST_TRIMESTER_CITATIONS, criticalActions: m.FIRST_TRIMESTER_CRITICAL_ACTIONS };
        },
        'acute-pancreatitis': async () => {
            const m = await import('../data/trees/acute-pancreatitis.js');
            return { nodes: m.ACUTE_PANCREATITIS_NODES, entryNodeId: 'ap-start', categoryId: 'gastroenterology', moduleLabels: m.ACUTE_PANCREATITIS_MODULE_LABELS, citations: m.ACUTE_PANCREATITIS_CITATIONS, criticalActions: m.ACUTE_PANCREATITIS_CRITICAL_ACTIONS };
        },
        'upper-gi-bleed': async () => {
            const m = await import('../data/trees/upper-gi-bleed.js');
            return { nodes: m.UPPER_GI_BLEED_NODES, entryNodeId: 'ugib-start', categoryId: 'gastroenterology', moduleLabels: m.UPPER_GI_BLEED_MODULE_LABELS, citations: m.UPPER_GI_BLEED_CITATIONS, criticalActions: m.UPPER_GI_BLEED_CRITICAL_ACTIONS };
        },
        'diarrhea': async () => {
            const m = await import('../data/trees/diarrhea.js');
            return { nodes: m.DIARRHEA_NODES, entryNodeId: 'diarrhea-start', categoryId: 'gastroenterology', moduleLabels: m.DIARRHEA_MODULE_LABELS, citations: m.DIARRHEA_CITATIONS, criticalActions: m.DIARRHEA_CRITICAL_ACTIONS };
        },
        'hiv': async () => {
            const m = await import('../data/trees/hiv.js');
            return { nodes: m.HIV_NODES, entryNodeId: 'hiv-start', categoryId: 'infectious-disease', moduleLabels: m.HIV_MODULE_LABELS, citations: m.HIV_CITATIONS, criticalActions: m.HIV_CRITICAL_ACTIONS };
        },
        'meningitis': async () => {
            const m = await import('../data/trees/meningitis.js');
            return { nodes: m.MENINGITIS_NODES, entryNodeId: 'mening-start', categoryId: 'infectious-disease', moduleLabels: m.MENINGITIS_MODULE_LABELS, citations: m.MENINGITIS_CITATIONS, criticalActions: m.MENINGITIS_CRITICAL_ACTIONS };
        },
        'delirium': async () => {
            const m = await import('../data/trees/delirium.js');
            return { nodes: m.DELIRIUM_NODES, entryNodeId: 'delirium-start', categoryId: 'neurology', moduleLabels: m.DELIRIUM_MODULE_LABELS, citations: m.DELIRIUM_CITATIONS, criticalActions: m.DELIRIUM_CRITICAL_ACTIONS };
        },
        'organic-vs-psych': async () => {
            const m = await import('../data/trees/organic-vs-psych.js');
            return { nodes: m.ORGANIC_PSYCH_NODES, entryNodeId: 'ovp-start', categoryId: 'neurology', moduleLabels: m.ORGANIC_PSYCH_MODULE_LABELS, citations: m.ORGANIC_PSYCH_CITATIONS, criticalActions: m.ORGANIC_PSYCH_CRITICAL_ACTIONS };
        },
        'anaphylaxis': async () => {
            const m = await import('../data/trees/anaphylaxis.js');
            return { nodes: m.ANAPHYLAXIS_NODES, entryNodeId: 'anaph-start', categoryId: 'emergency-medicine', moduleLabels: m.ANAPHYLAXIS_MODULE_LABELS, citations: m.ANAPHYLAXIS_CITATIONS, criticalActions: m.ANAPHYLAXIS_CRITICAL_ACTIONS };
        },
        'angioedema': async () => {
            const m = await import('../data/trees/angioedema.js');
            return { nodes: m.ANGIOEDEMA_NODES, entryNodeId: 'angio-start', categoryId: 'emergency-medicine', moduleLabels: m.ANGIOEDEMA_MODULE_LABELS, citations: m.ANGIOEDEMA_CITATIONS, criticalActions: m.ANGIOEDEMA_CRITICAL_ACTIONS };
        },
        'sickle-cell': async () => {
            const m = await import('../data/trees/sickle-cell.js');
            return { nodes: m.SICKLE_CELL_NODES, entryNodeId: 'scd-start', categoryId: 'heme-onc', moduleLabels: m.SICKLE_CELL_MODULE_LABELS, citations: m.SICKLE_CELL_CITATIONS, criticalActions: m.SICKLE_CELL_CRITICAL_ACTIONS };
        },
        'hemophilia': async () => {
            const m = await import('../data/trees/hemophilia.js');
            return { nodes: m.HEMOPHILIA_NODES, entryNodeId: 'hemo-start', categoryId: 'heme-onc', moduleLabels: m.HEMOPHILIA_MODULE_LABELS, citations: m.HEMOPHILIA_CITATIONS, criticalActions: m.HEMOPHILIA_CRITICAL_ACTIONS };
        },
        'anticoag-reversal': async () => {
            const m = await import('../data/trees/anticoag-reversal.js');
            return { nodes: m.ANTICOAG_REVERSAL_NODES, entryNodeId: 'acr-start', categoryId: 'heme-onc', moduleLabels: m.ANTICOAG_REVERSAL_MODULE_LABELS, citations: m.ANTICOAG_REVERSAL_CITATIONS, criticalActions: m.ANTICOAG_REVERSAL_CRITICAL_ACTIONS };
        },
        'tca-toxidrome': async () => {
            const m = await import('../data/trees/tca-toxidrome.js');
            return { nodes: m.TCA_TOXIDROME_NODES, entryNodeId: 'tca-start', categoryId: 'toxicology', moduleLabels: m.TCA_TOXIDROME_MODULE_LABELS, citations: m.TCA_TOXIDROME_CITATIONS, criticalActions: m.TCA_TOXIDROME_CRITICAL_ACTIONS };
        },
        'salicylate': async () => {
            const m = await import('../data/trees/salicylate.js');
            return { nodes: m.SALICYLATE_NODES, entryNodeId: 'sal-start', categoryId: 'toxicology', moduleLabels: m.SALICYLATE_MODULE_LABELS, citations: m.SALICYLATE_CITATIONS, criticalActions: m.SALICYLATE_CRITICAL_ACTIONS };
        },
        'acetaminophen': async () => {
            const m = await import('../data/trees/acetaminophen.js');
            return { nodes: m.ACETAMINOPHEN_OD_NODES, entryNodeId: 'apap-start', categoryId: 'toxicology', moduleLabels: m.ACETAMINOPHEN_OD_MODULE_LABELS, citations: m.ACETAMINOPHEN_OD_CITATIONS, criticalActions: m.ACETAMINOPHEN_OD_CRITICAL_ACTIONS };
        },
        'dka': async () => {
            const m = await import('../data/trees/dka.js');
            return { nodes: m.DKA_NODES, entryNodeId: 'dka-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.DKA_MODULE_LABELS, citations: m.DKA_CITATIONS, criticalActions: m.DKA_CRITICAL_ACTIONS };
        },
        'diabetes-management': async () => {
            const m = await import('../data/trees/diabetes-management.js');
            return { nodes: m.DIABETES_MANAGEMENT_NODES, entryNodeId: 'dm-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.DIABETES_MANAGEMENT_MODULE_LABELS, citations: m.DIABETES_MANAGEMENT_CITATIONS, criticalActions: m.DIABETES_MANAGEMENT_CRITICAL_ACTIONS };
        },
        'sepsis': async () => {
            const m = await import('../data/trees/sepsis.js');
            return { nodes: m.SEPSIS_NODES, entryNodeId: 'sepsis-start', categoryId: 'infectious-disease', moduleLabels: m.SEPSIS_MODULE_LABELS, citations: m.SEPSIS_CITATIONS, criticalActions: m.SEPSIS_CRITICAL_ACTIONS };
        },
        'necrotizing-fasciitis': async () => {
            const m = await import('../data/trees/necrotizing-fasciitis.js');
            return { nodes: m.NECROTIZING_FASCIITIS_NODES, entryNodeId: 'nf-start', categoryId: 'infectious-disease', moduleLabels: m.NECROTIZING_FASCIITIS_MODULE_LABELS, citations: m.NECROTIZING_FASCIITIS_CITATIONS, criticalActions: m.NECROTIZING_FASCIITIS_CRITICAL_ACTIONS };
        },
        'tuberculosis': async () => {
            const m = await import('../data/trees/tuberculosis.js');
            return { nodes: m.TUBERCULOSIS_NODES, entryNodeId: 'tb-start', categoryId: 'infectious-disease', moduleLabels: m.TUBERCULOSIS_MODULE_LABELS, citations: m.TUBERCULOSIS_CITATIONS, criticalActions: m.TUBERCULOSIS_CRITICAL_ACTIONS };
        },
        'combative-patient': async () => {
            const m = await import('../data/trees/combative-patient.js');
            return { nodes: m.COMBATIVE_PATIENT_NODES, entryNodeId: 'comb-start', categoryId: 'emergency-medicine', moduleLabels: m.COMBATIVE_PATIENT_MODULE_LABELS, citations: m.COMBATIVE_PATIENT_CITATIONS, criticalActions: m.COMBATIVE_PATIENT_CRITICAL_ACTIONS };
        },
        'chf-exacerbation': async () => {
            const m = await import('../data/trees/chf-exacerbation.js');
            return { nodes: m.CHF_EXACERBATION_NODES, entryNodeId: 'chf-start', categoryId: 'cardiology', moduleLabels: m.CHF_EXACERBATION_MODULE_LABELS, citations: m.CHF_EXACERBATION_CITATIONS, criticalActions: m.CHF_EXACERBATION_CRITICAL_ACTIONS };
        },
        'migraine': async () => {
            const m = await import('../data/trees/migraine.js');
            return { nodes: m.MIGRAINE_NODES, entryNodeId: 'migraine-start', categoryId: 'neurology', moduleLabels: m.MIGRAINE_MODULE_LABELS, citations: m.MIGRAINE_CITATIONS, criticalActions: m.MIGRAINE_CRITICAL_ACTIONS };
        },
        'vertigo': async () => {
            const m = await import('../data/trees/vertigo.js');
            return { nodes: m.VERTIGO_NODES, entryNodeId: 'vert-start', categoryId: 'neurology', moduleLabels: m.VERTIGO_MODULE_LABELS, citations: m.VERTIGO_CITATIONS, criticalActions: m.VERTIGO_CRITICAL_ACTIONS };
        },
        'snake-envenomation': async () => {
            const m = await import('../data/trees/snake-envenomation.js');
            return { nodes: m.SNAKE_ENVENOMATION_NODES, entryNodeId: 'snake-start', categoryId: 'emergency-medicine', moduleLabels: m.SNAKE_ENVENOMATION_MODULE_LABELS, citations: m.SNAKE_ENVENOMATION_CITATIONS, criticalActions: m.SNAKE_ENVENOMATION_CRITICAL_ACTIONS };
        },
        'aacg': async () => {
            const m = await import('../data/trees/aacg.js');
            return { nodes: m.AACG_NODES, entryNodeId: 'aacg-start', categoryId: 'ophthalmology', moduleLabels: m.AACG_MODULE_LABELS, citations: m.AACG_CITATIONS, criticalActions: m.AACG_CRITICAL_ACTIONS };
        },
        'chemical-burn': async () => {
            const m = await import('../data/trees/chemical-burn.js');
            return { nodes: m.CHEMICAL_BURN_NODES, entryNodeId: 'chemburn-start', categoryId: 'ophthalmology', moduleLabels: m.CHEMICAL_BURN_MODULE_LABELS, citations: m.CHEMICAL_BURN_CITATIONS, criticalActions: m.CHEMICAL_BURN_CRITICAL_ACTIONS };
        },
        'orbital-cellulitis': async () => {
            const m = await import('../data/trees/orbital-cellulitis.js');
            return { nodes: m.ORBITAL_CELLULITIS_NODES, entryNodeId: 'orbital-start', categoryId: 'ophthalmology', moduleLabels: m.ORBITAL_CELLULITIS_MODULE_LABELS, citations: m.ORBITAL_CELLULITIS_CITATIONS, criticalActions: m.ORBITAL_CELLULITIS_CRITICAL_ACTIONS };
        },
        'crao': async () => {
            const m = await import('../data/trees/crao.js');
            return { nodes: m.CRAO_NODES, entryNodeId: 'crao-start', categoryId: 'ophthalmology', moduleLabels: m.CRAO_MODULE_LABELS, citations: m.CRAO_CITATIONS, criticalActions: m.CRAO_CRITICAL_ACTIONS };
        },
        'globe-rupture': async () => {
            const m = await import('../data/trees/globe-rupture.js');
            return { nodes: m.GLOBE_RUPTURE_NODES, entryNodeId: 'globe-start', categoryId: 'ophthalmology', moduleLabels: m.GLOBE_RUPTURE_MODULE_LABELS, citations: m.GLOBE_RUPTURE_CITATIONS, criticalActions: m.GLOBE_RUPTURE_CRITICAL_ACTIONS };
        },
        'ocular-pocus': async () => {
            const m = await import('../data/trees/ocular-pocus.js');
            return { nodes: m.OCULAR_POCUS_NODES, entryNodeId: 'opocus-start', categoryId: 'ophthalmology', moduleLabels: m.OCULAR_POCUS_MODULE_LABELS, citations: m.OCULAR_POCUS_CITATIONS, criticalActions: m.OCULAR_POCUS_CRITICAL_ACTIONS };
        },
        'diplopia': async () => {
            const m = await import('../data/trees/diplopia.js');
            return { nodes: m.DIPLOPIA_NODES, entryNodeId: 'diplopia-start', categoryId: 'ophthalmology', moduleLabels: m.DIPLOPIA_MODULE_LABELS, citations: m.DIPLOPIA_CITATIONS, criticalActions: m.DIPLOPIA_CRITICAL_ACTIONS };
        },
        'pacemaker': async () => {
            const m = await import('../data/trees/pacemaker.js');
            return { nodes: m.PACEMAKER_NODES, entryNodeId: 'pm-start', categoryId: 'cardiology', moduleLabels: m.PACEMAKER_MODULE_LABELS, citations: m.PACEMAKER_CITATIONS, criticalActions: m.PACEMAKER_CRITICAL_ACTIONS };
        },
        'urinary-retention': async () => {
            const m = await import('../data/trees/urinary-retention.js');
            return { nodes: m.URINARY_RETENTION_NODES, entryNodeId: 'aur-start', categoryId: 'urology', moduleLabels: m.URINARY_RETENTION_MODULE_LABELS, citations: m.URINARY_RETENTION_CITATIONS, criticalActions: m.URINARY_RETENTION_CRITICAL_ACTIONS };
        },
        'caustic-ingestion': async () => {
            const m = await import('../data/trees/caustic-ingestion.js');
            return { nodes: m.CAUSTIC_INGESTION_NODES, entryNodeId: 'caustic-start', categoryId: 'toxicology', moduleLabels: m.CAUSTIC_INGESTION_MODULE_LABELS, citations: m.CAUSTIC_INGESTION_CITATIONS, criticalActions: m.CAUSTIC_INGESTION_CRITICAL_ACTIONS };
        },
        'epistaxis': async () => {
            const m = await import('../data/trees/epistaxis.js');
            return { nodes: m.EPISTAXIS_NODES, entryNodeId: 'epi-start', categoryId: 'emergency-medicine', moduleLabels: m.EPISTAXIS_MODULE_LABELS, citations: m.EPISTAXIS_CITATIONS, criticalActions: m.EPISTAXIS_CRITICAL_ACTIONS };
        },
        'psychiatry-assessment': async () => {
            const m = await import('../data/trees/psychiatry-assessment.js');
            return { nodes: m.PSYCHIATRY_ASSESSMENT_NODES, entryNodeId: 'mse-start', categoryId: 'emergency-medicine', moduleLabels: m.PSYCHIATRY_ASSESSMENT_MODULE_LABELS, citations: m.PSYCHIATRY_ASSESSMENT_CITATIONS, criticalActions: m.PSYCHIATRY_ASSESSMENT_CRITICAL_ACTIONS };
        },
        'massive-transfusion': async () => {
            const m = await import('../data/trees/massive-transfusion.js');
            return { nodes: m.MASSIVE_TRANSFUSION_NODES, entryNodeId: 'mtp-start', categoryId: 'trauma-surg', moduleLabels: m.MASSIVE_TRANSFUSION_MODULE_LABELS, citations: m.MASSIVE_TRANSFUSION_CITATIONS, criticalActions: m.MASSIVE_TRANSFUSION_CRITICAL_ACTIONS };
        },
        'pelvic-fracture': async () => {
            const m = await import('../data/trees/pelvic-fracture.js');
            return { nodes: m.PELVIC_FRACTURE_NODES, entryNodeId: 'pelvic-start', categoryId: 'trauma-surg', moduleLabels: m.PELVIC_FRACTURE_MODULE_LABELS, citations: m.PELVIC_FRACTURE_CITATIONS, criticalActions: m.PELVIC_FRACTURE_CRITICAL_ACTIONS };
        },
        'serotonin-syndrome': async () => {
            const m = await import('../data/trees/serotonin-syndrome.js');
            return { nodes: m.SEROTONIN_SYNDROME_NODES, entryNodeId: 'ss-start', categoryId: 'toxicology', moduleLabels: m.SEROTONIN_SYNDROME_MODULE_LABELS, citations: m.SEROTONIN_SYNDROME_CITATIONS, criticalActions: m.SEROTONIN_SYNDROME_CRITICAL_ACTIONS };
        },
        'digoxin-toxicity': async () => {
            const m = await import('../data/trees/digoxin-toxicity.js');
            return { nodes: m.DIGOXIN_TOXICITY_NODES, entryNodeId: 'dig-start', categoryId: 'toxicology', moduleLabels: m.DIGOXIN_TOXICITY_MODULE_LABELS, citations: m.DIGOXIN_TOXICITY_CITATIONS, criticalActions: m.DIGOXIN_TOXICITY_CRITICAL_ACTIONS };
        },
        'beta-blocker-od': async () => {
            const m = await import('../data/trees/beta-blocker-od.js');
            return { nodes: m.BETA_BLOCKER_OD_NODES, entryNodeId: 'bb-start', categoryId: 'toxicology', moduleLabels: m.BETA_BLOCKER_OD_MODULE_LABELS, citations: m.BETA_BLOCKER_OD_CITATIONS, criticalActions: m.BETA_BLOCKER_OD_CRITICAL_ACTIONS };
        },
        'ccb-od': async () => {
            const m = await import('../data/trees/ccb-od.js');
            return { nodes: m.CCB_OD_NODES, entryNodeId: 'ccb-start', categoryId: 'toxicology', moduleLabels: m.CCB_OD_MODULE_LABELS, citations: m.CCB_OD_CITATIONS, criticalActions: m.CCB_OD_CRITICAL_ACTIONS };
        },
        'iron-od': async () => {
            const m = await import('../data/trees/iron-od.js');
            return { nodes: m.IRON_OD_NODES, entryNodeId: 'iron-start', categoryId: 'toxicology', moduleLabels: m.IRON_OD_MODULE_LABELS, citations: m.IRON_OD_CITATIONS, criticalActions: m.IRON_OD_CRITICAL_ACTIONS };
        },
        'co-toxicity': async () => {
            const m = await import('../data/trees/co-toxicity.js');
            return { nodes: m.CO_TOXICITY_NODES, entryNodeId: 'co-start', categoryId: 'toxicology', moduleLabels: m.CO_TOXICITY_MODULE_LABELS, citations: m.CO_TOXICITY_CITATIONS, criticalActions: m.CO_TOXICITY_CRITICAL_ACTIONS };
        },
        'guillain-barre': async () => {
            const m = await import('../data/trees/guillain-barre.js');
            return { nodes: m.GUILLAIN_BARRE_NODES, entryNodeId: 'gbs-start', categoryId: 'neurology', moduleLabels: m.GUILLAIN_BARRE_MODULE_LABELS, citations: m.GUILLAIN_BARRE_CITATIONS, criticalActions: m.GUILLAIN_BARRE_CRITICAL_ACTIONS };
        },
        'myasthenia-gravis': async () => {
            const m = await import('../data/trees/myasthenia-gravis.js');
            return { nodes: m.MYASTHENIA_GRAVIS_NODES, entryNodeId: 'mg-start', categoryId: 'neurology', moduleLabels: m.MYASTHENIA_GRAVIS_MODULE_LABELS, citations: m.MYASTHENIA_GRAVIS_CITATIONS, criticalActions: m.MYASTHENIA_GRAVIS_CRITICAL_ACTIONS };
        },
        'botulism': async () => {
            const m = await import('../data/trees/botulism.js');
            return { nodes: m.BOTULISM_NODES, entryNodeId: 'bot-start', categoryId: 'neurology', moduleLabels: m.BOTULISM_MODULE_LABELS, citations: m.BOTULISM_CITATIONS, criticalActions: m.BOTULISM_CRITICAL_ACTIONS };
        },
        'ecmo': async () => {
            const m = await import('../data/trees/ecmo.js');
            return { nodes: m.ECMO_NODES, entryNodeId: 'ecmo-start', categoryId: 'critical-care', moduleLabels: m.ECMO_MODULE_LABELS, citations: m.ECMO_CITATIONS, criticalActions: m.ECMO_CRITICAL_ACTIONS };
        },
        'push-dose-pressors': async () => {
            const m = await import('../data/trees/push-dose-pressors.js');
            return { nodes: m.PUSH_DOSE_PRESSORS_NODES, entryNodeId: 'pdp-start', categoryId: 'pharmacist', moduleLabels: m.PUSH_DOSE_PRESSORS_MODULE_LABELS, citations: m.PUSH_DOSE_PRESSORS_CITATIONS, criticalActions: m.PUSH_DOSE_PRESSORS_CRITICAL_ACTIONS };
        },
        'aortic-aneurysm': async () => {
            const m = await import('../data/trees/aortic-aneurysm.js');
            return { nodes: m.AORTIC_ANEURYSM_NODES, entryNodeId: 'aortic-start', categoryId: 'cardiology', moduleLabels: m.AORTIC_ANEURYSM_MODULE_LABELS, citations: m.AORTIC_ANEURYSM_CITATIONS, criticalActions: m.AORTIC_ANEURYSM_CRITICAL_ACTIONS };
        },
        'measles': async () => {
            const m = await import('../data/trees/measles.js');
            return { nodes: m.MEASLES_NODES, entryNodeId: 'measles-start', categoryId: 'infectious-disease', moduleLabels: m.MEASLES_MODULE_LABELS, citations: m.MEASLES_CITATIONS, criticalActions: m.MEASLES_CRITICAL_ACTIONS };
        },
        'trach-emergency': async () => {
            const m = await import('../data/trees/trach-emergency.js');
            return { nodes: m.TRACH_EMERGENCY_NODES, entryNodeId: 'trach-start', categoryId: 'emergency-medicine', moduleLabels: m.TRACH_EMERGENCY_MODULE_LABELS, citations: m.TRACH_EMERGENCY_CITATIONS, criticalActions: m.TRACH_EMERGENCY_CRITICAL_ACTIONS };
        },
        'methemoglobinemia': async () => {
            const m = await import('../data/trees/methemoglobinemia.js');
            return { nodes: m.METHEMOGLOBINEMIA_NODES, entryNodeId: 'methb-start', categoryId: 'toxicology', moduleLabels: m.METHEMOGLOBINEMIA_MODULE_LABELS, citations: m.METHEMOGLOBINEMIA_CITATIONS, criticalActions: m.METHEMOGLOBINEMIA_CRITICAL_ACTIONS };
        },
        'extensor-tendon': async () => {
            const m = await import('../data/trees/extensor-tendon.js');
            return { nodes: m.EXTENSOR_TENDON_NODES, entryNodeId: 'ext-start', categoryId: 'procedures', moduleLabels: m.EXTENSOR_TENDON_MODULE_LABELS, citations: m.EXTENSOR_TENDON_CITATIONS, criticalActions: m.EXTENSOR_TENDON_CRITICAL_ACTIONS };
        },
        'deep-neck-infection': async () => {
            const m = await import('../data/trees/deep-neck-infection.js');
            return { nodes: m.DEEP_NECK_INFECTION_NODES, entryNodeId: 'dni-start', categoryId: 'infectious-disease', moduleLabels: m.DEEP_NECK_INFECTION_MODULE_LABELS, citations: m.DEEP_NECK_INFECTION_CITATIONS, criticalActions: m.DEEP_NECK_INFECTION_CRITICAL_ACTIONS };
        },
        'vp-shunt': async () => {
            const m = await import('../data/trees/vp-shunt.js');
            return { nodes: m.VP_SHUNT_NODES, entryNodeId: 'vps-start', categoryId: 'neurology', moduleLabels: m.VP_SHUNT_MODULE_LABELS, citations: m.VP_SHUNT_CITATIONS, criticalActions: m.VP_SHUNT_CRITICAL_ACTIONS };
        },
        'peds-osteomyelitis': async () => {
            const m = await import('../data/trees/peds-osteomyelitis.js');
            return { nodes: m.PEDS_OSTEOMYELITIS_NODES, entryNodeId: 'osteo-start', categoryId: 'pediatrics', moduleLabels: m.PEDS_OSTEOMYELITIS_MODULE_LABELS, citations: m.PEDS_OSTEOMYELITIS_CITATIONS, criticalActions: m.PEDS_OSTEOMYELITIS_CRITICAL_ACTIONS };
        },
        'copd-exacerbation': async () => {
            const m = await import('../data/trees/copd-exacerbation.js');
            return { nodes: m.COPD_EXACERBATION_NODES, entryNodeId: 'copd-start', categoryId: 'emergency-medicine', moduleLabels: m.COPD_EXACERBATION_MODULE_LABELS, citations: m.COPD_EXACERBATION_CITATIONS, criticalActions: m.COPD_EXACERBATION_CRITICAL_ACTIONS };
        },
        'septic-arthritis': async () => {
            const m = await import('../data/trees/septic-arthritis.js');
            return { nodes: m.SEPTIC_ARTHRITIS_NODES, entryNodeId: 'sa-start', categoryId: 'orthopedics', moduleLabels: m.SEPTIC_ARTHRITIS_MODULE_LABELS, citations: m.SEPTIC_ARTHRITIS_CITATIONS, criticalActions: m.SEPTIC_ARTHRITIS_CRITICAL_ACTIONS };
        },
        'hfnc': async () => {
            const m = await import('../data/trees/hfnc.js');
            return { nodes: m.HFNC_NODES, entryNodeId: 'hfnc-start', categoryId: 'critical-care', moduleLabels: m.HFNC_MODULE_LABELS, citations: m.HFNC_CITATIONS, criticalActions: m.HFNC_CRITICAL_ACTIONS };
        },
        'oxygen-delivery': async () => {
            const m = await import('../data/trees/oxygen-delivery.js');
            return { nodes: m.OXYGEN_DELIVERY_NODES, entryNodeId: 'o2-start', categoryId: 'critical-care', moduleLabels: m.OXYGEN_DELIVERY_MODULE_LABELS, citations: m.OXYGEN_DELIVERY_CITATIONS, criticalActions: m.OXYGEN_DELIVERY_CRITICAL_ACTIONS };
        },
        'peds-stec-hus': async () => {
            const m = await import('../data/trees/peds-stec-hus.js');
            return { nodes: m.PEDS_STEC_HUS_NODES, entryNodeId: 'stec-start', categoryId: 'pediatrics', moduleLabels: m.PEDS_STEC_HUS_MODULE_LABELS, citations: m.PEDS_STEC_HUS_CITATIONS, criticalActions: m.PEDS_STEC_HUS_CRITICAL_ACTIONS };
        },
        'nail-bed-injuries': async () => {
            const m = await import('../data/trees/nail-bed-injuries.js');
            return { nodes: m.NAIL_BED_INJURIES_NODES, entryNodeId: 'nail-start', categoryId: 'procedures', moduleLabels: m.NAIL_BED_INJURIES_MODULE_LABELS, citations: m.NAIL_BED_INJURIES_CITATIONS, criticalActions: m.NAIL_BED_INJURIES_CRITICAL_ACTIONS };
        },
        'eclampsia': async () => {
            const m = await import('../data/trees/eclampsia.js');
            return { nodes: m.ECLAMPSIA_NODES, entryNodeId: 'eclampsia-start', categoryId: 'ob-gyn', moduleLabels: m.ECLAMPSIA_MODULE_LABELS, citations: m.ECLAMPSIA_CITATIONS, criticalActions: m.ECLAMPSIA_CRITICAL_ACTIONS };
        },
        'aortic-dissection': async () => {
            const m = await import('../data/trees/aortic-dissection.js');
            return { nodes: m.AORTIC_DISSECTION_NODES, entryNodeId: 'dissect-start', categoryId: 'cardiology', moduleLabels: m.AORTIC_DISSECTION_MODULE_LABELS, citations: m.AORTIC_DISSECTION_CITATIONS, criticalActions: m.AORTIC_DISSECTION_CRITICAL_ACTIONS };
        },
        'intralipid': async () => {
            const m = await import('../data/trees/intralipid.js');
            return { nodes: m.INTRALIPID_NODES, entryNodeId: 'ile-start', categoryId: 'pharmacist', moduleLabels: m.INTRALIPID_MODULE_LABELS, citations: m.INTRALIPID_CITATIONS, criticalActions: m.INTRALIPID_CRITICAL_ACTIONS };
        },
        'rhabdomyolysis': async () => {
            const m = await import('../data/trees/rhabdomyolysis.js');
            return { nodes: m.RHABDOMYOLYSIS_NODES, entryNodeId: 'rhabdo-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.RHABDOMYOLYSIS_MODULE_LABELS, citations: m.RHABDOMYOLYSIS_CITATIONS, criticalActions: m.RHABDOMYOLYSIS_CRITICAL_ACTIONS };
        },
        'viral-myositis': async () => {
            const m = await import('../data/trees/viral-myositis.js');
            return { nodes: m.VIRAL_MYOSITIS_NODES, entryNodeId: 'vm-start', categoryId: 'pediatrics', moduleLabels: m.VIRAL_MYOSITIS_MODULE_LABELS, citations: m.VIRAL_MYOSITIS_CITATIONS, criticalActions: m.VIRAL_MYOSITIS_CRITICAL_ACTIONS };
        },
        'ed-methadone': async () => {
            const m = await import('../data/trees/ed-methadone.js');
            return { nodes: m.ED_METHADONE_NODES, entryNodeId: 'meth-start', categoryId: 'emergency-medicine', moduleLabels: m.ED_METHADONE_MODULE_LABELS, citations: m.ED_METHADONE_CITATIONS, criticalActions: m.ED_METHADONE_CRITICAL_ACTIONS };
        },
        'cvst': async () => {
            const m = await import('../data/trees/cvst.js');
            return { nodes: m.CVST_NODES, entryNodeId: 'cvst-start', categoryId: 'emergency-medicine', moduleLabels: m.CVST_MODULE_LABELS, citations: m.CVST_CITATIONS, criticalActions: m.CVST_CRITICAL_ACTIONS };
        },
        'shoulder-dislocation': async () => {
            const m = await import('../data/trees/shoulder-dislocation.js');
            return { nodes: m.SHOULDER_DISLOCATION_NODES, entryNodeId: 'shoulder-start', categoryId: 'orthopedics', moduleLabels: m.SHOULDER_DISLOCATION_MODULE_LABELS, citations: m.SHOULDER_DISLOCATION_CITATIONS, criticalActions: m.SHOULDER_DISLOCATION_CRITICAL_ACTIONS };
        },
        'wrist-injuries': async () => {
            const m = await import('../data/trees/wrist-injuries.js');
            return { nodes: m.WRIST_INJURIES_NODES, entryNodeId: 'wrist-start', categoryId: 'orthopedics', moduleLabels: m.WRIST_INJURIES_MODULE_LABELS, citations: m.WRIST_INJURIES_CITATIONS };
        },
        'peds-submersion': async () => {
            const m = await import('../data/trees/peds-submersion.js');
            return { nodes: m.PEDS_SUBMERSION_NODES, entryNodeId: 'submersion-start', categoryId: 'pediatrics', moduleLabels: m.PEDS_SUBMERSION_MODULE_LABELS, citations: m.PEDS_SUBMERSION_CITATIONS, criticalActions: m.PEDS_SUBMERSION_CRITICAL_ACTIONS };
        },
        'brugada-syndrome': async () => {
            const m = await import('../data/trees/brugada-syndrome.js');
            return { nodes: m.BRUGADA_SYNDROME_NODES, entryNodeId: 'brugada-start', categoryId: 'cardiology', moduleLabels: m.BRUGADA_SYNDROME_MODULE_LABELS, citations: m.BRUGADA_SYNDROME_CITATIONS, criticalActions: m.BRUGADA_SYNDROME_CRITICAL_ACTIONS };
        },
        'hd-emergencies': async () => {
            const m = await import('../data/trees/hd-emergencies.js');
            return { nodes: m.HD_EMERGENCIES_NODES, entryNodeId: 'hd-start', categoryId: 'critical-care', moduleLabels: m.HD_EMERGENCIES_MODULE_LABELS, citations: m.HD_EMERGENCIES_CITATIONS, criticalActions: m.HD_EMERGENCIES_CRITICAL_ACTIONS };
        },
        'marine-envenomation': async () => {
            const m = await import('../data/trees/marine-envenomation.js');
            return { nodes: m.MARINE_ENVENOMATION_NODES, entryNodeId: 'marine-start', categoryId: 'toxicology', moduleLabels: m.MARINE_ENVENOMATION_MODULE_LABELS, citations: m.MARINE_ENVENOMATION_CITATIONS, criticalActions: m.MARINE_ENVENOMATION_CRITICAL_ACTIONS };
        },
        'button-battery': async () => {
            const m = await import('../data/trees/button-battery.js');
            return { nodes: m.BUTTON_BATTERY_NODES, entryNodeId: 'battery-start', categoryId: 'pediatrics', moduleLabels: m.BUTTON_BATTERY_MODULE_LABELS, citations: m.BUTTON_BATTERY_CITATIONS, criticalActions: m.BUTTON_BATTERY_CRITICAL_ACTIONS };
        },
        'nat-screening': async () => {
            const m = await import('../data/trees/nat-screening.js');
            return { nodes: m.NAT_SCREENING_NODES, entryNodeId: 'nat-start', categoryId: 'pediatrics', moduleLabels: m.NAT_SCREENING_MODULE_LABELS, citations: m.NAT_SCREENING_CITATIONS, criticalActions: m.NAT_SCREENING_CRITICAL_ACTIONS };
        },
        'massive-hemoptysis': async () => {
            const m = await import('../data/trees/massive-hemoptysis.js');
            return { nodes: m.MASSIVE_HEMOPTYSIS_NODES, entryNodeId: 'hemo-start', categoryId: 'critical-care', moduleLabels: m.MASSIVE_HEMOPTYSIS_MODULE_LABELS, citations: m.MASSIVE_HEMOPTYSIS_CITATIONS, criticalActions: m.MASSIVE_HEMOPTYSIS_CRITICAL_ACTIONS };
        },
        'xylazine-toxicity': async () => {
            const m = await import('../data/trees/xylazine-toxicity.js');
            return { nodes: m.XYLAZINE_TOXICITY_NODES, entryNodeId: 'xyl-start', categoryId: 'toxicology', moduleLabels: m.XYLAZINE_TOXICITY_MODULE_LABELS, citations: m.XYLAZINE_TOXICITY_CITATIONS, criticalActions: m.XYLAZINE_TOXICITY_CRITICAL_ACTIONS };
        },
        'laryngeal-trauma': async () => {
            const m = await import('../data/trees/laryngeal-trauma.js');
            return { nodes: m.LARYNGEAL_TRAUMA_NODES, entryNodeId: 'larynx-start', categoryId: 'trauma-surg', moduleLabels: m.LARYNGEAL_TRAUMA_MODULE_LABELS, citations: m.LARYNGEAL_TRAUMA_CITATIONS, criticalActions: m.LARYNGEAL_TRAUMA_CRITICAL_ACTIONS };
        },
        'refractory-vfvt': async () => {
            const m = await import('../data/trees/refractory-vfvt.js');
            return { nodes: m.REFRACTORY_VFVT_NODES, entryNodeId: 'rvf-start', categoryId: 'cardiology', moduleLabels: m.REFRACTORY_VFVT_MODULE_LABELS, citations: m.REFRACTORY_VFVT_CITATIONS, criticalActions: m.REFRACTORY_VFVT_CRITICAL_ACTIONS };
        },
        'vad': async () => {
            const m = await import('../data/trees/vad.js');
            return { nodes: m.VAD_NODES, entryNodeId: 'vad-start', categoryId: 'cardiology', moduleLabels: m.VAD_MODULE_LABELS, citations: m.VAD_CITATIONS, criticalActions: m.VAD_CRITICAL_ACTIONS };
        },
        'torsades-de-pointes': async () => {
            const m = await import('../data/trees/torsades-de-pointes.js');
            return { nodes: m.TORSADES_DE_POINTES_NODES, entryNodeId: 'tdp-start', categoryId: 'cardiology', moduleLabels: m.TORSADES_DE_POINTES_MODULE_LABELS, citations: m.TORSADES_DE_POINTES_CITATIONS, criticalActions: m.TORSADES_DE_POINTES_CRITICAL_ACTIONS };
        },
        'cardiac-arrest': async () => {
            const m = await import('../data/trees/cardiac-arrest.js');
            return { nodes: m.CARDIAC_ARREST_NODES, entryNodeId: 'ca-start', categoryId: 'emergency-medicine', moduleLabels: m.CARDIAC_ARREST_MODULE_LABELS, citations: m.CARDIAC_ARREST_CITATIONS, criticalActions: m.CARDIAC_ARREST_CRITICAL_ACTIONS };
        },
        'pea-arrest': async () => {
            const m = await import('../data/trees/pea-arrest.js');
            return { nodes: m.PEA_ARREST_NODES, entryNodeId: 'pea-start', categoryId: 'emergency-medicine', moduleLabels: m.PEA_ARREST_MODULE_LABELS, citations: m.PEA_ARREST_CITATIONS, criticalActions: m.PEA_ARREST_CRITICAL_ACTIONS };
        },
        'bradycardic-arrest': async () => {
            const m = await import('../data/trees/bradycardic-arrest.js');
            return { nodes: m.BRADYCARDIC_ARREST_NODES, entryNodeId: 'brady-start', categoryId: 'emergency-medicine', moduleLabels: m.BRADYCARDIC_ARREST_MODULE_LABELS, citations: m.BRADYCARDIC_ARREST_CITATIONS, criticalActions: m.BRADYCARDIC_ARREST_CRITICAL_ACTIONS };
        },
        'ventricular-tachycardia': async () => {
            const m = await import('../data/trees/ventricular-tachycardia.js');
            return { nodes: m.VENTRICULAR_TACHYCARDIA_NODES, entryNodeId: 'vt-start', categoryId: 'emergency-medicine', moduleLabels: m.VENTRICULAR_TACHYCARDIA_MODULE_LABELS, citations: m.VENTRICULAR_TACHYCARDIA_CITATIONS, criticalActions: m.VENTRICULAR_TACHYCARDIA_CRITICAL_ACTIONS };
        },
        'post-rosc': async () => {
            const m = await import('../data/trees/post-rosc.js');
            return { nodes: m.POST_ROSC_NODES, entryNodeId: 'rosc-start', categoryId: 'emergency-medicine', moduleLabels: m.POST_ROSC_MODULE_LABELS, citations: m.POST_ROSC_CITATIONS, criticalActions: m.POST_ROSC_CRITICAL_ACTIONS };
        },
        'cardiogenic-shock': async () => {
            const m = await import('../data/trees/cardiogenic-shock.js');
            return { nodes: m.CARDIOGENIC_SHOCK_NODES, entryNodeId: 'cs-start', categoryId: 'critical-care', moduleLabels: m.CARDIOGENIC_SHOCK_MODULE_LABELS, citations: m.CARDIOGENIC_SHOCK_CITATIONS, criticalActions: m.CARDIOGENIC_SHOCK_CRITICAL_ACTIONS };
        },
        'pe-pregnancy': async () => {
            const m = await import('../data/trees/pe-pregnancy.js');
            return { nodes: m.PE_PREGNANCY_NODES, entryNodeId: 'pep-start', categoryId: 'ob-gyn', moduleLabels: m.PE_PREGNANCY_MODULE_LABELS, citations: m.PE_PREGNANCY_CITATIONS, criticalActions: m.PE_PREGNANCY_CRITICAL_ACTIONS };
        },
        'cervical-artery-dissection': async () => {
            const m = await import('../data/trees/cervical-artery-dissection.js');
            return { nodes: m.CERVICAL_ARTERY_DISSECTION_NODES, entryNodeId: 'cad-start', categoryId: 'neurology', moduleLabels: m.CERVICAL_ARTERY_DISSECTION_MODULE_LABELS, citations: m.CERVICAL_ARTERY_DISSECTION_CITATIONS, criticalActions: m.CERVICAL_ARTERY_DISSECTION_CRITICAL_ACTIONS };
        },
        'code-status': async () => {
            const m = await import('../data/trees/code-status.js');
            return { nodes: m.CODE_STATUS_NODES, entryNodeId: 'code-start', categoryId: 'emergency-medicine', moduleLabels: m.CODE_STATUS_MODULE_LABELS, citations: m.CODE_STATUS_CITATIONS, criticalActions: m.CODE_STATUS_CRITICAL_ACTIONS };
        },
        'human-trafficking': async () => {
            const m = await import('../data/trees/human-trafficking.js');
            return { nodes: m.HUMAN_TRAFFICKING_NODES, entryNodeId: 'ht-start', categoryId: 'emergency-medicine', moduleLabels: m.HUMAN_TRAFFICKING_MODULE_LABELS, citations: m.HUMAN_TRAFFICKING_CITATIONS, criticalActions: m.HUMAN_TRAFFICKING_CRITICAL_ACTIONS };
        },
        'dental-avulsion': async () => {
            const m = await import('../data/trees/dental-avulsion.js');
            return { nodes: m.DENTAL_AVULSION_NODES, entryNodeId: 'avulsion-start', categoryId: 'emergency-medicine', moduleLabels: m.DENTAL_AVULSION_MODULE_LABELS, citations: m.DENTAL_AVULSION_CITATIONS, criticalActions: m.DENTAL_AVULSION_CRITICAL_ACTIONS };
        },
        'dental-trauma': async () => {
            const m = await import('../data/trees/dental-trauma.js');
            return { nodes: m.DENTAL_TRAUMA_NODES, entryNodeId: 'dental-trauma-start', categoryId: 'emergency-medicine', moduleLabels: m.DENTAL_TRAUMA_MODULE_LABELS, citations: m.DENTAL_TRAUMA_CITATIONS, criticalActions: m.DENTAL_TRAUMA_CRITICAL_ACTIONS };
        },
        'pta-drainage': async () => {
            const m = await import('../data/trees/pta-drainage.js');
            return { nodes: m.PTA_DRAINAGE_NODES, entryNodeId: 'pta-start', categoryId: 'procedures', moduleLabels: m.PTA_DRAINAGE_MODULE_LABELS, citations: m.PTA_DRAINAGE_CITATIONS, criticalActions: m.PTA_DRAINAGE_CRITICAL_ACTIONS };
        },
        'heat-stroke': async () => {
            const m = await import('../data/trees/heat-stroke.js');
            return { nodes: m.HEAT_STROKE_NODES, entryNodeId: 'hs-start', categoryId: 'emergency-medicine', moduleLabels: m.HEAT_STROKE_MODULE_LABELS, citations: m.HEAT_STROKE_CITATIONS, criticalActions: m.HEAT_STROKE_CRITICAL_ACTIONS };
        },
        'hypothermia': async () => {
            const m = await import('../data/trees/hypothermia.js');
            return { nodes: m.HYPOTHERMIA_NODES, entryNodeId: 'hypo-start', categoryId: 'emergency-medicine', moduleLabels: m.HYPOTHERMIA_MODULE_LABELS, citations: m.HYPOTHERMIA_CITATIONS, criticalActions: m.HYPOTHERMIA_CRITICAL_ACTIONS };
        },
        'awake-intubation': async () => {
            const m = await import('../data/trees/awake-intubation.js');
            return { nodes: m.AWAKE_INTUBATION_NODES, entryNodeId: 'awake-start', categoryId: 'anesthesia-airway', moduleLabels: m.AWAKE_INTUBATION_MODULE_LABELS, citations: m.AWAKE_INTUBATION_CITATIONS, criticalActions: m.AWAKE_INTUBATION_CRITICAL_ACTIONS };
        },
        'ear-fb': async () => {
            const m = await import('../data/trees/ear-fb.js');
            return { nodes: m.EAR_FB_NODES, entryNodeId: 'earfb-start', categoryId: 'procedures', moduleLabels: m.EAR_FB_MODULE_LABELS, citations: m.EAR_FB_CITATIONS, criticalActions: m.EAR_FB_CRITICAL_ACTIONS };
        },
        'suicide-risk-assessment': async () => {
            const m = await import('../data/trees/suicide-risk-assessment.js');
            return { nodes: m.SUICIDE_RISK_NODES, entryNodeId: 'sui-start', categoryId: 'emergency-medicine', moduleLabels: m.SUICIDE_RISK_MODULE_LABELS, citations: m.SUICIDE_RISK_CITATIONS, criticalActions: m.SUICIDE_RISK_CRITICAL_ACTIONS };
        },
        'ct-decision-support': async () => {
            const m = await import('../data/trees/ct-decision-support.js');
            return { nodes: m.CT_DECISION_SUPPORT_NODES, entryNodeId: 'ct-start', categoryId: 'us-rads', moduleLabels: m.CT_DECISION_SUPPORT_MODULE_LABELS, citations: m.CT_DECISION_SUPPORT_CITATIONS, criticalActions: m.CT_DECISION_SUPPORT_CRITICAL_ACTIONS };
        },
        'dfsa-workup': async () => {
            const m = await import('../data/trees/dfsa-workup.js');
            return { nodes: m.DFSA_WORKUP_NODES, entryNodeId: 'dfsa-start', categoryId: 'emergency-medicine', moduleLabels: m.DFSA_WORKUP_MODULE_LABELS, citations: m.DFSA_WORKUP_CITATIONS, criticalActions: m.DFSA_WORKUP_CRITICAL_ACTIONS };
        },
        'urinary-sphincter': async () => {
            const m = await import('../data/trees/urinary-sphincter.js');
            return { nodes: m.URINARY_SPHINCTER_NODES, entryNodeId: 'sphincter-start', categoryId: 'urology', moduleLabels: m.URINARY_SPHINCTER_MODULE_LABELS, citations: m.URINARY_SPHINCTER_CITATIONS, criticalActions: m.URINARY_SPHINCTER_CRITICAL_ACTIONS };
        },
        'eating-disorders': async () => {
            const m = await import('../data/trees/eating-disorders.js');
            return { nodes: m.EATING_DISORDERS_NODES, entryNodeId: 'ed-start', categoryId: 'emergency-medicine', moduleLabels: m.EATING_DISORDERS_MODULE_LABELS, citations: m.EATING_DISORDERS_CITATIONS, criticalActions: m.EATING_DISORDERS_CRITICAL_ACTIONS };
        },
        'peds-trauma': async () => {
            const m = await import('../data/trees/peds-trauma.js');
            return { nodes: m.PEDS_TRAUMA_NODES, entryNodeId: 'peds-trauma-start', categoryId: 'trauma-surg', moduleLabels: m.PEDS_TRAUMA_MODULE_LABELS, citations: m.PEDS_TRAUMA_CITATIONS, criticalActions: m.PEDS_TRAUMA_CRITICAL_ACTIONS };
        },
        'ohss': async () => {
            const m = await import('../data/trees/ohss.js');
            return { nodes: m.OHSS_NODES, entryNodeId: 'ohss-start', categoryId: 'ob-gyn', moduleLabels: m.OHSS_MODULE_LABELS, citations: m.OHSS_CITATIONS, criticalActions: m.OHSS_CRITICAL_ACTIONS };
        },
        'rhogam-early-pregnancy': async () => {
            const m = await import('../data/trees/rhogam-early-pregnancy.js');
            return { nodes: m.RHOGAM_EARLY_PREGNANCY_NODES, entryNodeId: 'rhogam-start', categoryId: 'ob-gyn', moduleLabels: m.RHOGAM_EARLY_PREGNANCY_MODULE_LABELS, citations: m.RHOGAM_EARLY_PREGNANCY_CITATIONS, criticalActions: m.RHOGAM_EARLY_PREGNANCY_CRITICAL_ACTIONS };
        },
        'sti-comprehensive': async () => {
            const m = await import('../data/trees/sti-comprehensive.js');
            return { nodes: m.STI_COMPREHENSIVE_NODES, entryNodeId: 'sti-start', categoryId: 'infectious-disease', moduleLabels: m.STI_COMPREHENSIVE_MODULE_LABELS, citations: m.STI_COMPREHENSIVE_CITATIONS, criticalActions: m.STI_COMPREHENSIVE_CRITICAL_ACTIONS };
        },
        'approach-to-arthritis': async () => {
            const m = await import('../data/trees/approach-to-arthritis.js');
            return { nodes: m.APPROACH_TO_ARTHRITIS_NODES, entryNodeId: 'arth-start', categoryId: 'rheumatology', moduleLabels: m.APPROACH_TO_ARTHRITIS_MODULE_LABELS, citations: m.APPROACH_TO_ARTHRITIS_CITATIONS, criticalActions: m.APPROACH_TO_ARTHRITIS_CRITICAL_ACTIONS };
        },
        'diabetic-foot-wounds': async () => {
            const m = await import('../data/trees/diabetic-foot-wounds.js');
            return { nodes: m.DIABETIC_FOOT_WOUNDS_NODES, entryNodeId: 'dfw-start', categoryId: 'trauma-surg', moduleLabels: m.DIABETIC_FOOT_WOUNDS_MODULE_LABELS, citations: m.DIABETIC_FOOT_WOUNDS_CITATIONS, criticalActions: m.DIABETIC_FOOT_WOUNDS_CRITICAL_ACTIONS };
        },
        'pediatric-arthritis': async () => {
            const m = await import('../data/trees/pediatric-arthritis.js');
            return { nodes: m.PEDIATRIC_ARTHRITIS_NODES, entryNodeId: 'peds-arth-start', categoryId: 'pediatrics', moduleLabels: m.MODULE_LABELS, citations: m.CITATIONS, criticalActions: m.PEDIATRIC_ARTHRITIS_CRITICAL_ACTIONS };
        },
        'gout': async () => {
            const m = await import('../data/trees/gout.js');
            return { nodes: m.GOUT_NODES, entryNodeId: 'gout-start', categoryId: 'rheumatology', moduleLabels: m.GOUT_MODULE_LABELS, citations: m.GOUT_CITATIONS, criticalActions: m.GOUT_CRITICAL_ACTIONS };
        },
        'hop-killers': async () => {
            const m = await import('../data/trees/hop-killers.js');
            return { nodes: m.HOP_KILLERS_NODES, entryNodeId: 'hop-start', categoryId: 'anesthesia-airway', moduleLabels: m.HOP_KILLERS_MODULE_LABELS, citations: m.HOP_KILLERS_CITATIONS, criticalActions: m.HOP_KILLERS_CRITICAL_ACTIONS };
        },
        'tia-workup': async () => {
            const m = await import('../data/trees/tia-workup.js');
            return { nodes: m.TIA_WORKUP_NODES, entryNodeId: 'tia-start', categoryId: 'neurology', moduleLabels: m.TIA_WORKUP_MODULE_LABELS, citations: m.TIA_WORKUP_CITATIONS, criticalActions: m.TIA_WORKUP_CRITICAL_ACTIONS };
        },
        'peripartum-cardiomyopathy': async () => {
            const m = await import('../data/trees/peripartum-cardiomyopathy.js');
            return { nodes: m.PERIPARTUM_CARDIOMYOPATHY_NODES, entryNodeId: 'ppcm-start', categoryId: 'ob-gyn', moduleLabels: m.PERIPARTUM_CARDIOMYOPATHY_MODULE_LABELS, citations: m.PERIPARTUM_CARDIOMYOPATHY_CITATIONS, criticalActions: m.PERIPARTUM_CARDIOMYOPATHY_CRITICAL_ACTIONS };
        },
        'ciguatera': async () => {
            const m = await import('../data/trees/ciguatera.js');
            return { nodes: m.CIGUATERA_NODES, entryNodeId: 'cig-start', categoryId: 'toxicology', moduleLabels: m.CIGUATERA_MODULE_LABELS, citations: m.CIGUATERA_CITATIONS, criticalActions: m.CIGUATERA_CRITICAL_ACTIONS };
        },
        'traveler-infections': async () => {
            const m = await import('../data/trees/traveler-infections.js');
            return { nodes: m.TRAVELER_INFECTIONS_NODES, entryNodeId: 'ti-start', categoryId: 'infectious-disease', moduleLabels: m.TRAVELER_INFECTIONS_MODULE_LABELS, citations: m.TRAVELER_INFECTIONS_CITATIONS, criticalActions: m.TRAVELER_INFECTIONS_CRITICAL_ACTIONS };
        },
        'malaria': async () => {
            const m = await import('../data/trees/malaria.js');
            return { nodes: m.MALARIA_NODES, entryNodeId: 'mal-start', categoryId: 'infectious-disease', moduleLabels: m.MALARIA_MODULE_LABELS, citations: m.MALARIA_CITATIONS, criticalActions: m.MALARIA_CRITICAL_ACTIONS };
        },
        'tetanus': async () => {
            const m = await import('../data/trees/tetanus.js');
            return { nodes: m.TETANUS_NODES, entryNodeId: 'tet-start', categoryId: 'infectious-disease', moduleLabels: m.TETANUS_MODULE_LABELS, citations: m.TETANUS_CITATIONS, criticalActions: m.TETANUS_CRITICAL_ACTIONS };
        },
        'asthma-exacerbation': async () => {
            const m = await import('../data/trees/asthma-exacerbation.js');
            return { nodes: m.ASTHMA_EXACERBATION_NODES, entryNodeId: 'asthma-start', categoryId: 'critical-care', moduleLabels: m.ASTHMA_EXACERBATION_MODULE_LABELS, citations: m.ASTHMA_EXACERBATION_CITATIONS, criticalActions: m.ASTHMA_EXACERBATION_CRITICAL_ACTIONS };
        },
        'adult-uti': async () => {
            const m = await import('../data/trees/adult-uti.js');
            return { nodes: m.ADULT_UTI_NODES, entryNodeId: 'uti-start', categoryId: 'urology', moduleLabels: m.ADULT_UTI_MODULE_LABELS, citations: m.ADULT_UTI_CITATIONS, criticalActions: m.ADULT_UTI_CRITICAL_ACTIONS };
        },
        'ttp': async () => {
            const m = await import('../data/trees/ttp.js');
            return { nodes: m.TTP_NODES, entryNodeId: 'ttp-start', categoryId: 'heme-onc', moduleLabels: m.TTP_MODULE_LABELS, citations: m.TTP_CITATIONS, criticalActions: m.TTP_CRITICAL_ACTIONS };
        },
        'tracheo-innominate-fistula': async () => {
            const m = await import('../data/trees/tracheo-innominate-fistula.js');
            return { nodes: m.TRACHEO_INNOMINATE_FISTULA_NODES, entryNodeId: 'tif-start', categoryId: 'anesthesia-airway', moduleLabels: m.TRACHEO_INNOMINATE_FISTULA_MODULE_LABELS, citations: m.TRACHEO_INNOMINATE_FISTULA_CITATIONS, criticalActions: m.TRACHEO_INNOMINATE_FISTULA_CRITICAL_ACTIONS };
        },
        'le-fort-fracture': async () => {
            const m = await import('../data/trees/le-fort-fracture.js');
            return { nodes: m.LE_FORT_FRACTURE_NODES, entryNodeId: 'lefort-start', categoryId: 'trauma-surg', moduleLabels: m.LE_FORT_FRACTURE_MODULE_LABELS, citations: m.LE_FORT_FRACTURE_CITATIONS, criticalActions: m.LE_FORT_FRACTURE_CRITICAL_ACTIONS };
        },
        'lumbar-puncture': async () => {
            const m = await import('../data/trees/lumbar-puncture.js');
            return { nodes: m.LUMBAR_PUNCTURE_NODES, entryNodeId: 'lp-start', categoryId: 'procedures', moduleLabels: m.LUMBAR_PUNCTURE_MODULE_LABELS, citations: m.LUMBAR_PUNCTURE_CITATIONS, criticalActions: m.LUMBAR_PUNCTURE_CRITICAL_ACTIONS };
        },
        'multiple-sclerosis': async () => {
            const m = await import('../data/trees/multiple-sclerosis.js');
            return { nodes: m.MULTIPLE_SCLEROSIS_NODES, entryNodeId: 'ms-start', categoryId: 'neurology', moduleLabels: m.MULTIPLE_SCLEROSIS_MODULE_LABELS, citations: m.MULTIPLE_SCLEROSIS_CITATIONS, criticalActions: m.MULTIPLE_SCLEROSIS_CRITICAL_ACTIONS };
        },
        'burr-hole': async () => {
            const m = await import('../data/trees/burr-hole.js');
            return { nodes: m.BURR_HOLE_NODES, entryNodeId: 'bh-start', categoryId: 'procedures', moduleLabels: m.BURR_HOLE_MODULE_LABELS, citations: m.BURR_HOLE_CITATIONS, criticalActions: m.BURR_HOLE_CRITICAL_ACTIONS };
        },
        'rv-assessment': async () => {
            const m = await import('../data/trees/rv-assessment.js');
            return { nodes: m.RV_ASSESSMENT_NODES, entryNodeId: 'rv-start', categoryId: 'anesthesia-airway', moduleLabels: m.RV_ASSESSMENT_MODULE_LABELS, citations: m.RV_ASSESSMENT_CITATIONS, criticalActions: m.RV_ASSESSMENT_CRITICAL_ACTIONS };
        },
        'cervical-spine': async () => {
            const m = await import('../data/trees/cervical-spine.js');
            return { nodes: m.CERVICAL_SPINE_NODES, entryNodeId: 'cspine-start', categoryId: 'trauma-surg', moduleLabels: m.CERVICAL_SPINE_MODULE_LABELS, citations: m.CERVICAL_SPINE_CITATIONS, criticalActions: m.CERVICAL_SPINE_CRITICAL_ACTIONS };
        },
        'neurogenic-shock': async () => {
            const m = await import('../data/trees/neurogenic-shock.js');
            return { nodes: m.NEUROGENIC_SHOCK_NODES, entryNodeId: 'neuro-shock-start', categoryId: 'trauma-surg', moduleLabels: m.NEUROGENIC_SHOCK_MODULE_LABELS, citations: m.NEUROGENIC_SHOCK_CITATIONS, criticalActions: m.NEUROGENIC_SHOCK_CRITICAL_ACTIONS };
        },
        'cauda-equina': async () => {
            const m = await import('../data/trees/cauda-equina.js');
            return { nodes: m.CAUDA_EQUINA_NODES, entryNodeId: 'ces-start', categoryId: 'trauma-surg', moduleLabels: m.CAUDA_EQUINA_MODULE_LABELS, citations: m.CAUDA_EQUINA_CITATIONS, criticalActions: m.CAUDA_EQUINA_CRITICAL_ACTIONS };
        },
        'brain-herniation': async () => {
            const m = await import('../data/trees/brain-herniation.js');
            return { nodes: m.BRAIN_HERNIATION_NODES, entryNodeId: 'hern-start', categoryId: 'trauma-surg', moduleLabels: m.BRAIN_HERNIATION_MODULE_LABELS, citations: m.BRAIN_HERNIATION_CITATIONS, criticalActions: m.BRAIN_HERNIATION_CRITICAL_ACTIONS };
        },
        'dvt': async () => {
            const m = await import('../data/trees/dvt.js');
            return { nodes: m.DVT_NODES, entryNodeId: 'dvt-start', categoryId: 'heme-onc', moduleLabels: m.DVT_MODULE_LABELS, citations: m.DVT_CITATIONS, criticalActions: m.DVT_CRITICAL_ACTIONS };
        },
        'intussusception': async () => {
            const m = await import('../data/trees/intussusception.js');
            return { nodes: m.INTUSSUSCEPTION_NODES, entryNodeId: 'intuss-start', categoryId: 'pediatrics', moduleLabels: m.INTUSSUSCEPTION_MODULE_LABELS, citations: m.INTUSSUSCEPTION_CITATIONS, criticalActions: m.INTUSSUSCEPTION_CRITICAL_ACTIONS };
        },
        'fishhook-removal': async () => {
            const m = await import('../data/trees/fishhook-removal.js');
            return { nodes: m.FISHHOOK_REMOVAL_NODES, entryNodeId: 'fh-start', categoryId: 'procedures', moduleLabels: m.FISHHOOK_REMOVAL_MODULE_LABELS, citations: m.FISHHOOK_REMOVAL_CITATIONS, criticalActions: m.FISHHOOK_REMOVAL_CRITICAL_ACTIONS };
        },
        'vafei': async () => {
            const m = await import('../data/trees/vafei.js');
            return { nodes: m.VAFEI_NODES, entryNodeId: 'vafei-start', categoryId: 'anesthesia-airway', moduleLabels: m.VAFEI_MODULE_LABELS, citations: m.VAFEI_CITATIONS, criticalActions: m.VAFEI_CRITICAL_ACTIONS };
        },
        'blood-culture-stewardship': async () => {
            const m = await import('../data/trees/blood-culture-stewardship.js');
            return { nodes: m.BLOOD_CULTURE_STEWARDSHIP_NODES, entryNodeId: 'bcs-start', categoryId: 'infectious-disease', moduleLabels: m.BLOOD_CULTURE_STEWARDSHIP_MODULE_LABELS, citations: m.BLOOD_CULTURE_STEWARDSHIP_CITATIONS, criticalActions: m.BLOOD_CULTURE_STEWARDSHIP_CRITICAL_ACTIONS };
        },
    };
    const loader = TREE_IMPORTS[treeId];
    if (!loader)
        return null;
    return loader();
}
/**
 * Get a tree config by ID. Tries: memory → IndexedDB → Supabase → hardcoded.
 * Returns null if tree doesn't exist.
 */
export async function getTreeConfig(treeId) {
    // 1. In-memory
    const cached = treeCache.get(treeId);
    if (cached)
        return cached;
    // 2. IndexedDB
    const fromCache = await loadFromCache(treeId);
    if (fromCache) {
        treeCache.set(treeId, fromCache);
        // Background refresh if stale
        refreshIfStale(treeId);
        return fromCache;
    }
    // 3. Supabase
    const fromSupabase = await fetchFromSupabase(treeId).catch(() => null);
    if (fromSupabase) {
        treeCache.set(treeId, fromSupabase);
        return fromSupabase;
    }
    // 4. Hardcoded fallback
    const fallback = await loadHardcodedFallback(treeId);
    if (fallback) {
        treeCache.set(treeId, fallback);
    }
    return fallback;
}
/** Background refresh for a specific tree */
function refreshIfStale(treeId) {
    getLastSync(`tree:${treeId}`).then(lastSync => {
        const isStale = !lastSync || (Date.now() - lastSync) > STALE_MS;
        if (isStale) {
            fetchFromSupabase(treeId).then(config => {
                if (config)
                    treeCache.set(treeId, config);
            }).catch(() => { });
        }
    }).catch(() => { });
}
