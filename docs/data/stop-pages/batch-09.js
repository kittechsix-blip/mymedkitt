export const STOP_PAGES_09 = {
    'refractory-vfvt-stop': {
        id: 'refractory-vfvt-stop',
        title: 'Refractory VF/VT — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT skip vector change after 3 failed shocks',
                body: 'Standard anterolateral pad position may deliver insufficient energy through scar or obesity. Switch to AP position (left parasternal + left infrascapular) before escalating to a second defibrillator — it\'s faster and may be sufficient alone. [See vector change node](#/node/rvf-vector-change).',
            },
            {
                heading: '🛑 Do NOT use high-dose epinephrine routinely',
                body: 'High-dose epinephrine in VF/VT is Class 3: No Benefit per 2025 AHA. Excessive catecholamines actually impair defibrillation and worsen post-ROSC myocardial dysfunction. Stick to 1 mg IV/IO every 3–5 min. [See epinephrine timing node](#/node/rvf-epi-timing).',
            },
            {
                heading: '🛑 Do NOT delay searching for reversible causes',
                body: 'Hyperkalemia, toxins, PE, and tension pneumothorax are all correctable causes of refractory VF. Treating the underlying cause is what allows defibrillation to succeed — VF caused by hyperK will not respond to shocks alone. [See H\'s and T\'s node](#/node/rvf-hs-ts).',
            },
            {
                heading: '🛑 Do NOT give amiodarone in magnesium-responsive VF',
                body: 'If TdP or hypomagnesemia is suspected, give magnesium sulfate 2 g IV first. Amiodarone is appropriate for VF/pVT but is contraindicated in TdP — always verify QTc and exclude torsades before choosing amiodarone. [See antiarrhythmic selection node](#/node/rvf-amio-lido).',
            },
            {
                heading: '🛑 Do NOT withhold esmolol out of fear of bradycardia',
                body: 'After 3 shocks + 3 mg epinephrine + 300 mg amiodarone, esmolol may dramatically improve ROSC rates by reducing catecholamine-driven VF threshold elevation. Its very short half-life (~9 min) makes it safe to trial. [See esmolol protocol node](#/node/rvf-esmolol-dose).',
            },
            {
                heading: '🛑 Do NOT activate ECPR too late',
                body: 'The window for ECPR closes fast — collapse to ECMO flow must occur within 60 minutes. Waiting to see if "one more round of ACLS works" before calling the ECMO team is a common fatal delay. Activate simultaneously with ongoing resuscitation if criteria are met. [See ECPR assessment node](#/node/rvf-ecpr-assess).',
            },
            {
                heading: '🛑 Do NOT attempt DSD without two operators',
                body: 'Double sequential defibrillation requires two defibrillators and two operators delivering near-simultaneous shocks (<1 second apart). One operator attempting both machines in sequence negates the benefit and risks equipment damage. [See DSD setup node](#/node/rvf-dsd-setup).',
            },
            {
                heading: '🛑 Do NOT use beta-blockers in cocaine-associated VF',
                body: 'Cocaine causes unopposed alpha-adrenergic vasoconstriction when beta receptors are blocked, precipitating severe hypertension, coronary spasm, and worsening VF. Use benzodiazepines and sodium bicarbonate instead. [See toxin-induced VF node](#/node/rvf-toxin).',
            },
        ],
        citations: [],
    },
    'vad-stop': {
        id: 'vad-stop',
        title: 'VAD Emergency — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT call no pulse "cardiac arrest" without Doppler',
                body: 'Continuous-flow LVADs produce minimal or zero pulsatility — absence of a palpable pulse is NORMAL. Checking for pulse with a standard technique will falsely trigger a cardiac arrest response. Always use Doppler to measure MAP in LVAD patients. [See VAD start node](#/node/vad-start).',
            },
            {
                heading: '🛑 Do NOT manage any VAD visit without calling the VAD coordinator',
                body: 'VAD coordinators know the patient\'s baseline parameters, anticoagulation targets, and device history. Missing this call leads to treating numbers out of context — what looks like "high flow" may be normal for that patient. Call immediately, every visit, no exceptions. [See VAD coordinator node](#/node/vad-coordinator).',
            },
            {
                heading: '🛑 Do NOT ignore absence of pump hum',
                body: 'A missing pump hum means the pump is not running — this is a critical emergency. The patient now depends only on severely impaired native cardiac function. Immediately troubleshoot connections and power before reaching for vasopressors. [See no-hum node](#/node/vad-no-hum).',
            },
            {
                heading: '🛑 Do NOT clamp the outflow graft',
                body: 'Clamping the LVAD outflow graft causes acute, severe aortic regurgitation and immediate cardiogenic shock. This is never an appropriate intervention regardless of circumstances. Emergent transfer to the VAD center is the correct action. [See no-hum node](#/node/vad-no-hum).',
            },
            {
                heading: '🛑 Do NOT allow MAP to exceed 90 mmHg',
                body: 'Hypertension in LVAD patients dramatically increases hemorrhagic stroke risk and reduces pump efficiency by increasing afterload. Target MAP is 70–80 mmHg. Do not use standard automated BP cuffs — use Doppler. [See MAP check node](#/node/vad-map-check).',
            },
            {
                heading: '🛑 Do NOT transfuse non-irradiated blood products',
                body: 'VAD patients require ONLY leukoreduced, irradiated blood products. Using standard blood products causes HLA allosensitization that may permanently disqualify the patient from future heart transplantation. [See active bleeding node](#/node/vad-bleeding-active).',
            },
            {
                heading: '🛑 Do NOT order MRI for a VAD patient with stroke',
                body: 'MRI is absolutely contraindicated in all current LVAD patients. The magnetic field will damage the pump electronics and is immediately life-threatening. For stroke workup use CT head and CTA head/neck only. [See VAD stroke node](#/node/vad-stroke).',
            },
            {
                heading: '🛑 Do NOT increase pump speed during a suction event',
                body: 'When the LV is too empty and a suction event occurs, increasing pump speed worsens the problem by pulling the septum harder against the inflow cannula. Give a 250–500 mL volume challenge first and assess with bedside echo. [See suction event node](#/node/vad-suction).',
            },
            {
                heading: '🛑 Do NOT use IV beta-blockers for VAD hypertension',
                body: 'Beta-blockers reduce native cardiac contractility in patients whose hearts are already severely impaired. For acute VAD hypertension, use hydralazine PO or IV nicardipine/clevidipine. [See VAD hypertension node](#/node/vad-hypertension).',
            },
        ],
        citations: [],
    },
    'rhabdomyolysis-stop': {
        id: 'rhabdomyolysis-stop',
        title: 'Rhabdomyolysis — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT use normal saline without watching for acidosis',
                body: 'Large volumes of NS cause hyperchloremic metabolic acidosis (NAGMA) which counteracts urine alkalinization goals and worsens tubular myoglobin precipitation. Lactated Ringers is preferred for rhabdomyolysis — the 4 mEq/L potassium does NOT clinically worsen hyperkalemia, contrary to common belief. [See fluid choice node](#/node/rhabdo-fluid-choice).',
            },
            {
                heading: '🛑 Do NOT target urine output less than 1 mL/kg/hr',
                body: 'Inadequate fluid resuscitation is the most common cause of AKI in rhabdomyolysis. The target is 1–3 mL/kg/hr (200–300 mL/hr) — not "adequate urine." Patients require a Foley catheter and aggressive rate adjustments. CK >15,000 carries a 5–14% dialysis rate. [See fluid resus node](#/node/rhabdo-fluid-resus).',
            },
            {
                heading: '🛑 Do NOT aggressively replace asymptomatic hypocalcemia',
                body: 'Early hypocalcemia in rhabdomyolysis is caused by calcium depositing into injured muscle — it is protective, not dangerous. Aggressive IV calcium replacement worsens heterotopic calcification and may not even raise serum levels. Only treat symptomatic hypocalcemia (tetany, seizures, QT changes). [See hypocalcemia node](#/node/rhabdo-hypocalcemia-tx).',
            },
            {
                heading: '🛑 Do NOT delay fasciotomy when compartment syndrome is present',
                body: 'Crush injury patients with pain disproportionate to exam, paresthesias, and compartment pressure >30 mmHg (or delta pressure <30 mmHg) require urgent fasciotomy. A 6-hour delay leads to irreversible muscle necrosis. Do not wait for complete pressure measurements if clinical suspicion is high. [See compartment eval node](#/node/rhabdo-compartment-eval).',
            },
            {
                heading: '🛑 Do NOT rely on bicarbonate for urine alkalinization',
                body: 'Multiple RCTs and a 2025 meta-analysis show urine alkalinization with bicarbonate does NOT significantly prevent AKI or reduce dialysis rates compared to fluids alone. Aggressive LR resuscitation is the evidence-based priority — bicarbonate is only for severe acidosis (pH <7.1). [See bicarbonate evidence node](#/node/rhabdo-bicarb).',
            },
            {
                heading: '🛑 Do NOT ignore the statin medication list',
                body: 'Statin-induced rhabdomyolysis is severely worsened by fibrate combinations, CYP3A4 inhibitors (cyclosporine, macrolides, azoles), and high-intensity formulations. Stop the statin immediately and screen for drug interactions. [See drug-induced node](#/node/rhabdo-drug-induced).',
            },
            {
                heading: '🛑 Do NOT give beta-blockers in cocaine-induced rhabdomyolysis',
                body: 'Cocaine-associated sympathomimetic excess causes rhabdomyolysis through hyperthermia and vasoconstriction. Beta-blockers cause unopposed alpha-adrenergic vasoconstriction, worsening both the cocaine toxidrome and muscle ischemia. Benzodiazepines and aggressive cooling are the correct approach. [See drug-induced node](#/node/rhabdo-drug-induced).',
            },
        ],
        citations: [],
    },
    'septic-arthritis-stop': {
        id: 'septic-arthritis-stop',
        title: 'Septic Arthritis — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT delay joint aspiration to start antibiotics',
                body: 'Joint fluid Gram stain and culture are essential for guiding therapy — they cannot be interpreted after antibiotic administration. Aspiration must precede antibiotics unless the patient is septic and critically unstable. Diagnosis without synovial fluid analysis leads to empiric therapy that may miss atypical organisms. [See workup overview node](#/node/sa-workup-overview).',
            },
            {
                heading: '🛑 Do NOT rely on synovial WBC alone to exclude septic arthritis',
                body: 'Synovial WBC >50,000 is classically cited, but septic joints can have lower counts — particularly in immunocompromised patients, early infection, and gonococcal arthritis (which can have WBC <20,000). Clinical suspicion and culture results drive the diagnosis. [See synovial fluid node](#/node/sa-synovial-fluid).',
            },
            {
                heading: '🛑 Do NOT miss gonococcal arthritis in sexually active patients',
                body: 'Gonococcal arthritis is the most common cause of septic arthritis in sexually active adults under 40. It presents with a migratory polyarthralgia, tenosynovitis, and sometimes a characteristic rash — not always a monoarthritis. Culture yield is low; treat empirically if suspected. [See gonococcal node](#/node/sa-gonococcal).',
            },
            {
                heading: '🛑 Do NOT forget prosthetic joint criteria',
                body: 'Prosthetic joint infections require different empiric antibiotics and different surgical management than native joints. Never treat a prosthetic joint infection the same as a native one without orthopedic consultation. [See prosthetic joint node](#/node/sa-prosthetic).',
            },
            {
                heading: '🛑 Do NOT prescribe oral antibiotics without drainage for purulent joints',
                body: 'Purulent septic arthritis requires mechanical drainage — either serial aspiration or surgical washout — in addition to antibiotics. Antibiotics alone are insufficient; pus under pressure causes cartilage destruction within hours. [See drainage node](#/node/sa-drainage).',
            },
            {
                heading: '🛑 Do NOT miss the diagnosis after prior antibiotic treatment',
                body: 'Patients who received partial antibiotic courses before presentation will have falsely reassuring synovial cultures. Clinical features still indicate septic arthritis — do not let a negative culture talk you out of the diagnosis when WBC and clinical features are compelling. [See prior antibiotics node](#/node/sa-prior-abx).',
            },
            {
                heading: '🛑 Do NOT discharge without orthopedics consultation',
                body: 'All confirmed or strongly suspected septic arthritis requires orthopedics consultation and admission for surgical assessment and IV antibiotics. Outpatient management is not appropriate for purulent native joint infections. [See disposition node](#/node/sa-dispo).',
            },
        ],
        citations: [],
    },
    'shoulder-dislocation-stop': {
        id: 'shoulder-dislocation-stop',
        title: 'Shoulder Dislocation — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT attempt reduction without a pre-reduction X-ray',
                body: 'Fracture-dislocations (humeral neck fracture, Hill-Sachs lesion, bankart fracture) require modified technique or orthopedic consultation before manipulation. Reducing a shoulder with an unrecognized proximal humerus fracture can convert a stable fracture into a displaced one or cause neurovascular injury. [See imaging decision node](#/node/shoulder-imaging-decision).',
            },
            {
                heading: '🛑 Do NOT skip a neurovascular exam before AND after reduction',
                body: 'Axillary nerve injury (C5-C6 dermatome — lateral deltoid numbness) occurs in up to 42% of anterior dislocations. Documenting neurovascular status before reduction establishes baseline and ensures post-reduction deficits are recognized and not missed. [See neurovascular exam node](#/node/shoulder-neurovascular).',
            },
            {
                heading: '🛑 Do NOT use procedural sedation unnecessarily for first-time dislocations',
                body: 'Scapular manipulation and the Cunningham technique achieve >80% success rates without any analgesia or sedation when performed correctly. Intra-articular lidocaine injection is an effective alternative to procedural sedation. Reserve PSA for failed attempts or extremely anxious patients. [See analgesia choice node](#/node/shoulder-analgesia-choice).',
            },
            {
                heading: '🛑 Do NOT attempt reduction of a fracture-dislocation without consultation',
                body: 'Greater tuberosity fractures, surgical neck fractures, and Bankart lesions found on imaging change the management plan entirely. Forced reduction can displace fragments into the joint, damage the rotator cuff insertion, or injure the axillary artery. Get orthopedics on the phone first. [See fracture-dislocation node](#/node/shoulder-fracture-dislocation).',
            },
            {
                heading: '🛑 Do NOT immobilize in internal rotation for first-time dislocators',
                body: 'Traditional slings in internal rotation do NOT reduce recurrence risk and may worsen outcome. Evidence supports external rotation bracing (arm at side, palm forward) for 3 weeks to reduce recurrence, particularly in young patients. Counsel on recurrence rates at the time of discharge. [See immobilization node](#/node/shoulder-immobilization).',
            },
            {
                heading: '🛑 Do NOT discharge without post-reduction X-ray',
                body: 'Post-reduction imaging confirms concentric reduction and identifies occult fractures only visible once the humeral head is back in position. Sending a patient home without post-reduction films misses this safety check entirely. [See post-reduction node](#/node/shoulder-post-reduction).',
            },
            {
                heading: '🛑 Do NOT miss a posterior dislocation',
                body: 'Posterior dislocations are commonly missed on AP X-ray — the "light bulb sign" (symmetric humeral head) is subtle and often overlooked. Posterior dislocations cause an arm fixed in internal rotation and are associated with seizures and electrocution. When in doubt, obtain an axillary view. [See X-ray findings node](#/node/shoulder-xray-findings).',
            },
        ],
        citations: [],
    },
    'urinary-retention-stop': {
        id: 'urinary-retention-stop',
        title: 'Urinary Retention — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT catheterize urethral trauma without a retrograde urethrogram',
                body: 'Blood at the urethral meatus, perineal ecchymosis, high-riding prostate, or a pelvic fracture mechanism all indicate possible urethral injury. Blind Foley catheterization through a urethral disruption converts a partial tear into a complete one. Get a retrograde urethrogram first; call urology for suprapubic catheter if disrupted. [See urethral trauma node](#/node/aur-trauma).',
            },
            {
                heading: '🛑 Do NOT miss cauda equina syndrome as the cause of retention',
                body: 'New urinary retention in a patient with back pain, saddle anesthesia, bilateral leg weakness, or fecal incontinence is a surgical emergency — not a BPH problem. Emergent MRI spine and neurosurgery consult are required. Time to decompression determines neurologic recovery. [See neuro emergency node](#/node/aur-neuro-emergency).',
            },
            {
                heading: '🛑 Do NOT drain more than 1000 mL immediately in chronic retention',
                body: 'Rapid decompression of a chronically overdistended bladder (>800–1000 mL) can cause hematuria, reflex hypotension, and post-obstructive diuresis. Drain to 500–1000 mL, clamp 15–30 minutes, then continue. Place a Foley for ongoing monitoring in high-volume retention. [See high-volume node](#/node/aur-high-volume).',
            },
            {
                heading: '🛑 Do NOT skip tamsulosin at the time of catheterization',
                body: 'Alpha-blockers started at the time of catheter placement significantly improve the trial-without-catheter (TWOC) success rate. Discharging a BPH patient with a catheter and no alpha-blocker leads to a failed TWOC and unnecessary return visits. [See BPH medications node](#/node/aur-bph-meds).',
            },
            {
                heading: '🛑 Do NOT miss post-obstructive diuresis in high-volume retention',
                body: 'Post-obstructive diuresis (>200 mL/hr urine output after decompression) is a medical emergency that requires IV fluid replacement at 50–75% of hourly output. Patients can become severely volume-depleted, hyponatremic, and hypotensive if sent home or watched passively. [See POD management node](#/node/aur-pod-management).',
            },
            {
                heading: '🛑 Do NOT forget to review the medication list',
                body: 'Anticholinergics, opioids, antihistamines, alpha-agonists (decongestants), TCAs, and antipsychotics are all common causes of medication-induced urinary retention. Discharging a patient without identifying and stopping the offending agent guarantees recurrence. [See causes node](#/node/aur-causes).',
            },
        ],
        citations: [],
    },
    'viral-myositis-stop': {
        id: 'viral-myositis-stop',
        title: 'Viral Myositis — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT give NSAIDs for pain in viral myositis',
                body: 'NSAIDs are contraindicated in viral myositis because they reduce renal prostaglandin synthesis and impair the renal blood flow needed to safely clear myoglobin. In a patient already at risk for AKI, NSAIDs can precipitate acute tubular necrosis. Use acetaminophen for analgesia instead. [See pain management node](#/node/vm-pain-antiemetics).',
            },
            {
                heading: '🛑 Do NOT discharge a child with BACM without checking CK',
                body: 'Most children with BACM resolve without complication, but CK >10,000 or myoglobinuria flags a subset at risk for AKI who need admission and IV fluids. Never diagnose "benign" myositis without verifying CK level. [See pediatric high risk node](#/node/vm-peds-high).',
            },
            {
                heading: '🛑 Do NOT use diuretics to increase urine output in rhabdomyolysis',
                body: 'Diuretics worsen hemoconcentration, increase myoglobin concentration in tubules, and raise VTE risk in an already immobilized patient. Urine output goals are achieved through aggressive IV fluid resuscitation alone. [See rhabdo treatment node](#/node/vm-rhabdo-treatment).',
            },
            {
                heading: '🛑 Do NOT miss Guillain-Barré syndrome masquerading as myositis',
                body: 'GBS can present with leg weakness following a viral illness — exactly the same context as BACM. Ascending weakness (proximal > distal, then spreading up), areflexia, and cranial nerve involvement are the key differentiators. Missing GBS and discharging the patient is a catastrophic error. [See peds exclusion node](#/node/vm-peds-exclude).',
            },
            {
                heading: '🛑 Do NOT withhold oseltamivir in confirmed influenza myositis',
                body: 'Influenza is the most common cause of viral myositis. Oseltamivir within 48 hours of symptom onset reduces viral replication, shortens illness duration, and may reduce the severity of the myositic process. It should not be withheld in admitted patients with influenza-associated myositis regardless of timing. [See influenza node](#/node/vm-influenza).',
            },
            {
                heading: '🛑 Do NOT reassure parents based on CK level alone in BACM',
                body: 'Pediatric BACM can have markedly elevated CK (sometimes >50,000) with an excellent prognosis, while adults with similar CK levels have much higher AKI risk. The pediatric rhabdomyolysis threshold is less aggressive — but only for classic BACM presentations, not for ill-appearing children. [See rhabdo threshold node](#/node/vm-rhabdo).',
            },
        ],
        citations: [],
    },
    'vp-shunt-stop': {
        id: 'vp-shunt-stop',
        title: 'VP Shunt — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT rule out shunt malfunction based on normal imaging',
                body: 'Chronically shunted ventricles may have lost compliance and will NOT dilate despite rising ICP. Normal CT and normal shunt series do not exclude malfunction. If clinical suspicion is high — headache, vomiting, lethargy, altered mental status — neurosurgery consultation is mandatory. [See imaging node](#/node/vps-imaging).',
            },
            {
                heading: '🛑 Do NOT attempt a shunt tap without neurosurgery',
                body: 'Shunt taps are a neurosurgical procedure with specific sterile technique requirements and risks of introducing infection or causing hardware damage. An emergency physician should never attempt to tap a shunt. Get neurosurgery to the bedside. [See shunt tap indications node](#/node/vps-shunt-tap-indications).',
            },
            {
                heading: '🛑 Do NOT dismiss the parent or caregiver who says "this feels like a malfunction"',
                body: 'Caregivers of shunted patients are highly accurate at identifying malfunctions — they have seen it before. Caregiver report of "acting like the last malfunction" should significantly raise clinical suspicion and lower your threshold for neurosurgery consultation, even with initially reassuring imaging. [See presentation node](#/node/vps-presentation).',
            },
            {
                heading: '🛑 Do NOT delay ICP reduction when herniation signs are present',
                body: 'Cushing triad (hypertension, bradycardia, irregular respirations), pupil dilation, or posturing indicate impending herniation. Immediate ICP reduction with mannitol or hypertonic saline is indicated while neurosurgery is activated — do not wait for imaging to return first. [See emergent ICP node](#/node/vps-emergent-icp).',
            },
            {
                heading: '🛑 Do NOT rely on shunt pumping to assess function',
                body: 'Manually compressing and releasing the shunt reservoir (pump test) has poor sensitivity and specificity. A "normal" pumping shunt does not exclude malfunction. This exam can be misleading in both directions and should never be the primary basis for clearing a patient with symptoms. [See physical exam node](#/node/vps-physical-exam).',
            },
            {
                heading: '🛑 Do NOT start antibiotics before blood cultures in suspected shunt infection',
                body: 'Shunt infections require identification of the causative organism to guide prolonged antibiotic therapy and hardware revision decisions. Starting empiric antibiotics before blood cultures renders culture results uninterpretable and complicates management. [See infection workup node](#/node/vps-infection-workup).',
            },
            {
                heading: '🛑 Do NOT overlook abdominal symptoms in VP shunt patients',
                body: 'The distal peritoneal catheter can cause abdominal pseudocysts, ascites, bowel obstruction, peritoneal irritation, and catheter migration into abdominal viscera. Abdominal pain in a shunted patient is a VP shunt problem until proven otherwise. [See imaging strategy node](#/node/vps-imaging).',
            },
        ],
        citations: [],
    },
    'xylazine-toxicity-stop': {
        id: 'xylazine-toxicity-stop',
        title: 'Xylazine Toxicity — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT withhold naloxone in xylazine overdose',
                body: 'Xylazine itself is not reversed by naloxone, but 95% of xylazine exposures involve fentanyl co-ingestion. Withholding naloxone because "it won\'t work" will miss the fentanyl component and allow the patient to die from opioid-induced respiratory arrest. Always give naloxone. [See naloxone node](#/node/xyl-naloxone).',
            },
            {
                heading: '🛑 Do NOT titrate naloxone to wakefulness in xylazine OD',
                body: 'Unlike pure opioid overdose, xylazine causes persistent sedation that does NOT resolve with naloxone — titrating to wakefulness will require dangerous naloxone doses that precipitate acute withdrawal and aspiration risk. Titrate to respiratory rate >12 and adequate airway protection, then stop. [See naloxone node](#/node/xyl-naloxone).',
            },
            {
                heading: '🛑 Do NOT use atropine for xylazine-induced bradycardia',
                body: 'Xylazine causes central alpha-2 agonist bradycardia + peripheral vasoconstriction. Atropine blocks the bradycardia but not the vasoconstriction, resulting in a hypertensive crisis from unopposed alpha-mediated vasoconstriction. Use IV fluids and supportive care; only treat hemodynamically significant bradycardia with caution. [See bradycardia node](#/node/xyl-bradycardia).',
            },
            {
                heading: '🛑 Do NOT aggressively debride xylazine wounds',
                body: 'Xylazine-associated wounds (XAW) contain islands of viable tissue within necrotic-appearing areas. Aggressive debridement destroys this healing potential and worsens outcomes. These wounds are NOT necrotizing fasciitis. Staged wound care with TMP-SMX for MRSA coverage is the standard approach. [See stage 1 wound node](#/node/xyl-wound-stage1).',
            },
            {
                heading: '🛑 Do NOT send standard hospital tox screen and call it done',
                body: 'Xylazine is NOT detected on standard urine immunoassay drug screens. A negative urine drug screen does not exclude xylazine. Forensic GC-MS/LC-MS confirmation is required for definitive detection. Treat clinically based on the OA2A toxidrome. [See OA2A toxidrome node](#/node/xyl-oa2a).',
            },
            {
                heading: '🛑 Do NOT ignore xylazine withdrawal as a distinct syndrome',
                body: 'Xylazine withdrawal includes severe anxiety, agitation, tachycardia, and diaphoresis that is distinct from — and additive to — opioid withdrawal. Standard MOUD protocols alone will not control xylazine withdrawal. Clonidine 0.1–0.3 mg PO q4–6h is first-line; hold if SBP <90 or HR <50. [See withdrawal treatment node](#/node/xyl-withdrawal-tx).',
            },
            {
                heading: '🛑 Do NOT miss xylazine wounds remote from injection sites',
                body: 'Unlike typical injection site wounds, xylazine wounds can appear anywhere on the body — even in patients who smoke or snort the drug rather than inject it. Mechanism is systemic vasoconstriction and direct tissue cytotoxicity, not local injection injury. Full skin inspection is mandatory. [See wound assessment node](#/node/xyl-wound-assess).',
            },
        ],
        citations: [],
    },
    'ecmo-stop': {
        id: 'ecmo-stop',
        title: 'ECMO — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT use VV-ECMO for cardiogenic shock',
                body: 'VV-ECMO provides oxygenation and CO₂ removal only — it provides zero hemodynamic support. A patient with cardiogenic shock placed on VV-ECMO will continue to deteriorate hemodynamically despite excellent oxygenation. If there is any doubt about cardiac function, choose VA-ECMO. [See ECMO selection node](#/node/ecmo-selection-decision).',
            },
            {
                heading: '🛑 Do NOT delay ECPR activation in refractory arrest',
                body: 'For ECPR to be successful, CPR time to ECMO flow must be under 60 minutes and no-flow time under 5 minutes. Waiting to see if ACLS resolves the arrest before calling the ECMO team is a fatal delay. Activate the team simultaneously with ongoing resuscitation. [See ECPR node](#/node/ecmo-ecpr).',
            },
            {
                heading: '🛑 Do NOT initiate VA-ECMO in severe aortic regurgitation',
                body: 'VA-ECMO generates retrograde aortic blood flow. In the setting of severe AR, this retrograde flow dramatically increases left ventricular diastolic volume and pressure, causing acute LV distension and pulmonary edema — the exact opposite of the intended support. This is an absolute contraindication. [See contraindications node](#/node/ecmo-contraindications).',
            },
            {
                heading: '🛑 Do NOT miss Harlequin syndrome in VA-ECMO patients',
                body: 'Harlequin (differential hypoxia) syndrome occurs when the ECMO provides oxygenated blood to the lower body via the femoral artery, but native cardiac function is pumping deoxygenated blood to the coronary arteries and brain. Upper body cyanosis with lower body pink = LV failure on VA-ECMO requiring urgent intervention. [See Harlequin node](#/node/ecmo-va-harlequin).',
            },
            {
                heading: '🛑 Do NOT put a patient on ECMO without prognostic scoring',
                body: 'RESP score >3 predicts 75% VV-ECMO survival; RESP score <-2 predicts only 18% survival. Initiating ECMO in patients with non-reversible underlying disease (metastatic cancer, severe chronic organ failure, septic shock without reversible cause) leads to futile care and iatrogenic suffering. Use prognostic tools to guide candidacy decisions. [See scores node](#/node/ecmo-scores).',
            },
            {
                heading: '🛑 Do NOT increase recirculation by raising VV-ECMO flow without repositioning cannulas',
                body: 'In VV-ECMO, recirculation (oxygenated blood returning directly to the drainage cannula without passing through the patient) significantly reduces effective oxygenation. Simply increasing pump flow worsens recirculation. Reposition cannulas to increase the distance between drainage and return ports. [See VV recirculation node](#/node/ecmo-vv-recirculation).',
            },
            {
                heading: '🛑 Do NOT forget LV venting in VA-ECMO with poor LV ejection',
                body: 'VA-ECMO increases afterload, which can lead to LV distension if native cardiac function is severely impaired. An overdistended LV causes pulmonary edema and myocardial injury. LV venting (via Impella or IABP) may be required — evaluate with bedside echo. [See LV distension node](#/node/ecmo-va-lv-distension).',
            },
        ],
        citations: [],
    },
    'torsades-de-pointes-stop': {
        id: 'torsades-de-pointes-stop',
        title: 'Torsades de Pointes — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT give amiodarone for TdP',
                body: 'Amiodarone prolongs the QT interval and will worsen torsades de pointes. This is a fundamental error — TdP is polymorphic VT in the context of QT prolongation, and adding a QT-prolonging drug can precipitate fatal ventricular fibrillation. Magnesium is the correct first-line drug. [See pulseless TdP node](#/node/tdp-pulseless).',
            },
            {
                heading: '🛑 Do NOT give procainamide for TdP',
                body: 'Procainamide also prolongs the QT interval and is contraindicated in TdP just like amiodarone. This mistake is common because procainamide is a standard antiarrhythmic for polymorphic VT without QT prolongation — always check the baseline QTc before choosing an antiarrhythmic. [See drugs to avoid node](#/node/tdp-avoid).',
            },
            {
                heading: '🛑 Do NOT use synchronized cardioversion for pulseless TdP',
                body: 'Pulseless TdP is a cardiac arrest — it requires unsynchronized defibrillation, not synchronized cardioversion. Attempting synchronization on a chaotic polymorphic rhythm will fail to detect the R-wave and result in dangerous delays and potential arrhythmia triggering. [See pulseless TdP node](#/node/tdp-pulseless).',
            },
            {
                heading: '🛑 Do NOT correct potassium to normal — target K >4.5 mEq/L',
                body: 'Hypokalemia dramatically increases TdP risk by reducing the repolarization reserve. The target is not just "normal" (3.5–5.0) — you must replace to >4.5 mEq/L to provide adequate protection against recurrence. The same principle applies to magnesium (target Mg >2.0 mg/dL). [See electrolytes node](#/node/tdp-electrolytes).',
            },
            {
                heading: '🛑 Do NOT miss QT-prolonging drugs as the causative agent',
                body: 'Acquired QT prolongation from drugs is the most common cause of TdP in the ED. Antibiotics (macrolides, fluoroquinolones), antipsychotics (haloperidol, quetiapine), antiemetics (ondansetron, metoclopramide), and antiarrhythmics must all be reviewed and stopped. Continuing the offending drug guarantees recurrence. [See drug cessation node](#/node/tdp-stop-drugs).',
            },
            {
                heading: '🛑 Do NOT discharge recurrent TdP without monitored admission',
                body: 'Recurrent TdP — even if self-terminating — indicates high risk of degeneration to VF and sudden cardiac death. All patients with documented TdP require admission for cardiac monitoring, electrolyte correction, QT-prolonging drug review, and electrophysiology consultation. [See disposition node](#/node/tdp-disposition).',
            },
            {
                heading: '🛑 Do NOT confuse TdP with regular polymorphic VT',
                body: 'Polymorphic VT without QT prolongation (e.g., in acute MI or catecholaminergic VT) requires completely different treatment — including amiodarone and beta-blockers, which are contraindicated in TdP. Always obtain and interpret the baseline QTc before treating any polymorphic VT. [See etiology node](#/node/tdp-etiology).',
            },
        ],
        citations: [],
    },
    'dfsa-workup-stop': {
        id: 'dfsa-workup-stop',
        title: 'DFSA Workup — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT send standard hospital tox screen and consider it done',
                body: 'Standard hospital urine immunoassay drug screens miss most DFSA agents — GHB, benzodiazepines (especially non-prescribed), ketamine, scopolamine, and most sedative-hypnotics require forensic GC-MS/LC-MS confirmation. Send specimens directly to the state crime lab or forensic reference lab. [See panel selection node](#/node/dfsa-panel-select).',
            },
            {
                heading: '🛑 Do NOT delay GHB collection beyond 6 hours from the assault',
                body: 'GHB has an extremely short detection window — undetectable in blood after 6 hours and in urine after 12 hours. Delaying specimen collection while waiting for social work, SANE, or consent resolution will permanently lose the most time-sensitive forensic evidence. Collect urgently, consent discussions can continue simultaneously. [See urgent collection node](#/node/dfsa-collect-urgent).',
            },
            {
                heading: '🛑 Do NOT store clothing in plastic bags',
                body: 'Plastic bags create a humid environment that degrades DNA evidence and promotes bacterial growth. All clothing must be placed in paper bags to preserve biological material. This is a chain-of-custody standard that affects prosecutorial outcomes. [See clothing collection node](#/node/dfsa-clothing).',
            },
            {
                heading: '🛑 Do NOT use a grey-top tube for standard labs — use it for GHB',
                body: 'Standard red-top or gold-top serum tubes allow in-vitro production of GHB by bacteria, creating false positives and degrading true samples. GHB specimens require grey-top tubes (sodium fluoride/potassium oxalate) which inhibit microbial production and preserve the sample. [See urgent collection node](#/node/dfsa-collect-urgent).',
            },
            {
                heading: '🛑 Do NOT require a police report before providing STI prophylaxis',
                body: 'Consent to exam, consent to specimen collection, and consent to prophylaxis are each independent decisions. A patient who declines to involve law enforcement still deserves full STI prophylaxis, emergency contraception, and HIV PEP assessment. Never withhold medical care on the basis of reporting decisions. [See consent introduction node](#/node/dfsa-consent-intro).',
            },
            {
                heading: '🛑 Do NOT skip HIV PEP assessment',
                body: 'Sexual assault carries HIV transmission risk that must be assessed within 72 hours for PEP eligibility. Failing to offer HIV PEP counseling and initiation to eligible patients who were assaulted within 72 hours is a missed preventive opportunity with lifelong consequences. [See HIV PEP node](#/node/dfsa-hiv-pep).',
            },
            {
                heading: '🛑 Do NOT break chain of custody for forensic specimens',
                body: 'Forensic specimens are only legally admissible if chain of custody is maintained from collection through transport. Every specimen must be labeled, sealed in tamper-evident packaging, and all transfers documented with signature and time. A single undocumented handoff can render the entire specimen set inadmissible. [See urgent collection node](#/node/dfsa-collect-urgent).',
            },
        ],
        citations: [],
    },
    'eating-disorders-stop': {
        id: 'eating-disorders-stop',
        title: 'Eating Disorders — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT replace electrolytes aggressively without monitoring for refeeding',
                body: 'Aggressive refeeding in severely malnourished patients causes refeeding syndrome — rapid intracellular shifts of phosphate, potassium, and magnesium leading to fatal cardiac arrhythmias, respiratory failure, and rhabdomyolysis. Start feeds slowly, replete electrolytes first, and check levels every 6 hours when initiating refeeding. [See refeeding protocol node](#/node/ed-refeeding-protocol).',
            },
            {
                heading: '🛑 Do NOT discharge bradycardia below 40 bpm from the ED',
                body: 'Sinus bradycardia <40 bpm (or <50 bpm with QTc >450 ms) in anorexia nervosa is a MARSIPAN high-risk threshold that mandates inpatient admission for cardiac monitoring. The arrhythmia is a direct consequence of malnutrition-driven electrolyte disturbance and autonomic dysfunction. [See cardiac monitoring node](#/node/ed-cardiac-monitoring).',
            },
            {
                heading: '🛑 Do NOT give ipecac or allow the patient to vomit post-ingestion',
                body: 'Ipecac contains emetine, which causes irreversible cardiomyopathy in patients with eating disorders who use it chronically. Even a single dose in a patient with pre-existing myocardial damage from malnutrition can be fatal. Never use ipecac in eating disorder patients under any circumstance. [See BN assessment node](#/node/ed-bn-assessment).',
            },
            {
                heading: '🛑 Do NOT treat the psychiatric disorder before stabilizing the medical one',
                body: 'Psychiatric disposition decisions cannot be made until the patient is medically stable. A patient with HR <40, SBP <90, or QTc >450 ms needs inpatient medical admission before any psychiatric evaluation. Medical instability takes absolute precedence. [See acute management node](#/node/ed-acute-mgmt).',
            },
            {
                heading: '🛑 Do NOT normalize a low BMI without addressing the refeeding risk',
                body: 'BMI <15 kg/m² is a high-risk threshold — BMI <13 is extreme risk with ICU-level physiologic vulnerability. These patients cannot simply be fed normally; caloric increases must be gradual (starting 20–30 kcal/kg/day) with electrolyte monitoring. Aggressive normalization causes preventable death. [See BMI classification node](#/node/ed-bmi-classification).',
            },
            {
                heading: '🛑 Do NOT miss potassium <3.0 mEq/L as a QT risk in bulimia',
                body: 'Chronic purging causes severe hypokalemia, hypomagnesemia, and hypochloremic alkalosis. Hypokalemia with QTc >470 ms in a bulimic patient is a setup for Torsades de Pointes. Aggressively replace K and Mg, obtain ECG, and reassess QTc before discharge. [See electrolytes node](#/node/ed-electrolytes).',
            },
            {
                heading: '🛑 Do NOT discharge without a psychiatric safety assessment',
                body: 'Eating disorders carry the highest mortality of any psychiatric illness — partly from medical complications but also from suicide. Every eating disorder patient requires a structured suicide risk assessment and safety plan before discharge. A "medically stable" patient with active suicidal ideation requires psychiatric admission. [See psychiatric assessment node](#/node/ed-psych-assess).',
            },
        ],
        citations: [],
    },
    'peds-trauma-stop': {
        id: 'peds-trauma-stop',
        title: 'Pediatric Trauma — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT use adult vital sign norms to assess pediatric hemodynamic status',
                body: 'Children maintain blood pressure until 25–30% blood volume is lost — by the time hypotension appears, the child is in late decompensated shock. Tachycardia is the EARLY sign. Using adult BP thresholds as reassurance in a tachycardic child will cause you to miss hemorrhagic shock. [See primary survey node](#/node/peds-trauma-primary).',
            },
            {
                heading: '🛑 Do NOT give a 1 mg/kg epinephrine dose without weight',
                body: 'All pediatric resuscitation is weight-based — a dose error in a 10 kg child versus a 30 kg child is a 3-fold difference. Use Broselow tape immediately for all pediatric trauma activations. Guessing weight causes preventable medication errors. [See weight estimation node](#/node/peds-trauma-weight).',
            },
            {
                heading: '🛑 Do NOT dismiss a history inconsistent with the injury pattern',
                body: 'Non-accidental trauma (NAT/child abuse) must be considered in ALL pediatric trauma patients, especially injuries that do not match developmental stage, multiple injuries at different healing stages, or delay in presentation. Mandatory reporting to CPS is required when NAT is suspected. [See NAT report node](#/node/peds-trauma-nat-report).',
            },
            {
                heading: '🛑 Do NOT apply adult fluid resuscitation principles to pediatric shock',
                body: 'The pediatric massive transfusion trigger is different from adults — activate MTP early based on clinical assessment of shock, not just vital signs. TXA must be given within 3 hours of injury at 15 mg/kg IV. The damage control resuscitation principle (1:1:1 PRBC:FFP:platelets) applies. [See transfusion node](#/node/peds-trauma-transfusion).',
            },
            {
                heading: '🛑 Do NOT order CT head without using the PECARN rule for mild TBI',
                body: 'CT radiation in children carries meaningful lifetime cancer risk. The PECARN decision rule identifies children with <1% risk of clinically important TBI who can safely be observed without CT. Over-imaging children with mild TBI exposes them to unnecessary radiation. [See PECARN node](#/node/peds-trauma-pecarn).',
            },
            {
                heading: '🛑 Do NOT elevate a limb with suspected compartment syndrome',
                body: 'Elevation reduces perfusion pressure in an already-ischemic compartment and worsens compartment syndrome. Keep the limb at heart level. Remove constrictive dressings. Measure compartment pressure and contact orthopedics immediately if delta pressure <30 mmHg. [See compartment node](#/node/peds-trauma-compartment).',
            },
            {
                heading: '🛑 Do NOT manage significant solid organ injuries without pediatric surgery consultation',
                body: 'Children with solid organ injuries (liver, spleen, kidney) that are hemodynamically stable are managed non-operatively — but this requires pediatric surgery oversight, serial exams, and specific activity restrictions. An emergency physician alone cannot safely discharge or determine disposition for these injuries. [See solid organ node](#/node/peds-trauma-solid-organ).',
            },
        ],
        citations: [],
    },
    'urinary-sphincter-stop': {
        id: 'urinary-sphincter-stop',
        title: 'Urinary Sphincter — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT treat new bladder dysfunction without ruling out cauda equina syndrome',
                body: 'New urinary retention or incontinence + back pain + any leg weakness or saddle anesthesia = cauda equina syndrome until proven otherwise. This is a surgical emergency requiring emergent MRI and neurosurgery consult. Missing this diagnosis and attributing symptoms to BPH or UTI causes permanent neurologic injury. [See cauda equina node](#/node/sphincter-cauda-equina).',
            },
            {
                heading: '🛑 Do NOT catheterize without checking for urethral trauma signs',
                body: 'Blood at the meatus, perineal hematoma, high-riding prostate, or pelvic fracture mechanism all indicate possible urethral disruption. Blind Foley insertion through a urethral tear completes the disruption and makes definitive repair far more complex. Assess for these signs before any catheter attempt. [See retention neuro node](#/node/sphincter-retention-neuro).',
            },
            {
                heading: '🛑 Do NOT leave high-volume retention without monitoring for post-obstructive diuresis',
                body: 'Patients with chronic high-volume retention (>800–1000 mL) are at risk for post-obstructive diuresis after catheter drainage, losing >200 mL/hr and developing severe volume depletion, electrolyte disturbances, and hemodynamic instability. They cannot be safely discharged without a period of monitored urine output. [See high-volume node](#/node/sphincter-high-volume).',
            },
            {
                heading: '🛑 Do NOT skip spinal cord compression in patients with acute paraparesis and retention',
                body: 'Spinal cord compression from epidural abscess, epidural hematoma, or malignant cord compression causes urinary retention with ascending sensory and motor deficits. This is a distinct emergency from cauda equina — management and prognosis differ. Emergent MRI and neurosurgery are required immediately. [See cord compression node](#/node/sphincter-cord-compression).',
            },
            {
                heading: '🛑 Do NOT dismiss new incontinence as "stress incontinence" in the ED',
                body: 'New-onset incontinence in the ED deserves investigation. Overflow incontinence from high PVR, neurogenic incontinence from spinal pathology, and urge incontinence from UTI or detrusor instability are the ED-relevant diagnoses. Stress incontinence is a chronic outpatient diagnosis that should not be made in the acute setting. [See incontinence type node](#/node/sphincter-incontinence-type).',
            },
            {
                heading: '🛑 Do NOT initiate alpha-blockers without ruling out neurogenic retention',
                body: 'Alpha-blockers are effective for BPH-related retention but are ineffective and potentially harmful in neurogenic retention from cord injury or cauda equina syndrome. Starting tamsulosin without first characterizing the etiology delays appropriate imaging and surgical intervention for neurogenic causes. [See alpha blocker node](#/node/sphincter-alpha-blocker).',
            },
            {
                heading: '🛑 Do NOT discharge a post-op urinary retention patient without evaluating for surgical complications',
                body: 'Post-operative urinary retention can be caused by epidural hematoma, spinal cord injury, or procedural complications in addition to common benign causes. Retention following spinal, pelvic, or perineal surgery warrants a focused neurologic exam and low threshold for imaging before discharge. [See postop node](#/node/sphincter-postop).',
            },
        ],
        citations: [],
    },
};
