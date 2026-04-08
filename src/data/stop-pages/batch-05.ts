import type { InfoPage } from '../info-pages.js';

export const STOP_PAGES_05: Record<string, InfoPage> = {

  // ─────────────────────────────────────────────
  // ORBITAL CELLULITIS
  // ─────────────────────────────────────────────
  'orbital-cellulitis-stop': {
    id: 'orbital-cellulitis-stop',
    title: 'Orbital Cellulitis — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT mistake preseptal for orbital cellulitis',
        body: 'Proptosis, limited/painful EOM, or afferent pupillary defect means orbital involvement — treat as orbital, not preseptal. Preseptal can be managed outpatient; orbital requires admission and IV antibiotics. [See differentiation node](#/node/orbital-differentiate).',
      },
      {
        heading: '🛑 Do NOT discharge orbital cellulitis from the ED',
        body: 'All true orbital cellulitis requires admission for IV antibiotics. Outpatient treatment risks progressive infection, subperiosteal abscess formation, and cavernous sinus thrombosis. [See disposition node](#/node/orbital-dispo).',
      },
      {
        heading: '🛑 Do NOT skip CT orbits with contrast when orbital is suspected',
        body: 'CT with contrast is mandatory to identify subperiosteal or orbital abscess requiring surgical drainage. Clinical exam alone cannot reliably distinguish cellulitis from abscess. [See imaging/findings node](#/node/orbital-ct-findings).',
      },
      {
        heading: '🛑 Do NOT delay treatment for cavernous sinus thrombosis signs',
        body: 'Bilateral eye findings, high fever, sepsis, or CN palsies (III, IV, VI) suggest cavernous sinus thrombosis — a life-threatening complication. Start IV antibiotics immediately and consider anticoagulation. [See CST node](#/node/orbital-cst).',
      },
      {
        heading: '🛑 Do NOT use oral antibiotics alone for true orbital cellulitis',
        body: 'Oral antibiotics are insufficient for orbital cellulitis (Chandler II+). IV vancomycin plus a broad-spectrum beta-lactam is the standard of care to ensure adequate tissue penetration. [See treatment node](#/node/orbital-treatment).',
      },
      {
        heading: '🛑 Do NOT fail to get ophthalmology consultation immediately',
        body: 'Ophthalmology must evaluate all orbital cellulitis cases urgently. Delay risks vision loss from compressive optic neuropathy or elevated intraocular pressure. [See admit node](#/node/orbital-admit).',
      },
      {
        heading: '🛑 Do NOT miss a subperiosteal abscess that needs drainage',
        body: 'Medial subperiosteal abscesses in children may be managed medically initially, but lack of 24–48h improvement mandates surgical drainage. Delay worsens prognosis. [See SPA node](#/node/orbital-spa).',
      },
      {
        heading: '🛑 Do NOT overlook dental or sinus source',
        body: 'Periorbital and orbital infections most commonly arise from paranasal sinusitis (especially ethmoid). Identify and treat the source — isolated antibiotic therapy without source control risks recurrence. [See adjuncts node](#/node/orbital-adjuncts).',
      },
      {
        heading: '🛑 Do NOT discharge pediatric preseptal cellulitis without clear follow-up',
        body: 'Young children (especially <1 year) with preseptal cellulitis should be admitted even if mild. Outpatient management requires reliable caregiver, clear return precautions, and next-day follow-up. [See peds preseptal node](#/node/preseptal-peds).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // CRAO
  // ─────────────────────────────────────────────
  'crao-stop': {
    id: 'crao-stop',
    title: 'CRAO — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT treat CRAO as an eye problem only',
        body: 'CRAO is classified as a CNS stroke by AHA/ASA. 30%+ of patients have concurrent cerebral ischemia. Activate stroke protocol immediately — the patient needs a full stroke workup, not just ophthalmology. [See recognition node](#/node/crao-start).',
      },
      {
        heading: '🛑 Do NOT delay for ocular massage or eye drops',
        body: 'Traditional ocular maneuvers (massage, paracentesis, carbogen, IOP drops) have no proven benefit per 2009 Cochrane Review. Wasting time on these delays tPA administration in patients within the 4.5-hour window. [See stroke protocol node](#/node/crao-stroke-protocol).',
      },
      {
        heading: '🛑 Do NOT give tPA to a patient with GCA-CRAO',
        body: 'Arteritic CRAO from Giant Cell Arteritis is treated with IV methylprednisolone 1000 mg, NOT tPA. tPA is ineffective for an inflammatory vasculitic mechanism. Confirm GCA status in ALL patients ≥50 years before giving tPA. [See GCA treatment node](#/node/crao-gca-treatment).',
      },
      {
        heading: '🛑 Do NOT wait for biopsy before treating suspected GCA',
        body: 'Temporal artery biopsy can wait up to 2 weeks after starting steroids without losing diagnostic accuracy. The fellow eye is at 25–50% risk of blindness within days — give IV methylprednisolone immediately. [See GCA treatment node](#/node/crao-gca-treatment).',
      },
      {
        heading: '🛑 Do NOT skip GCA evaluation in patients ≥50 years',
        body: 'GCA must be ruled out in every CRAO patient ≥50. Send ESR and CRP (both elevated = 99% sensitive). Ask about jaw claudication, scalp tenderness, and PMR symptoms. [See GCA symptom node](#/node/crao-gca-symptoms).',
      },
      {
        heading: '🛑 Do NOT discharge CRAO from the ED',
        body: 'ALL CRAO patients must be admitted. Stroke and MI risk peak in the first 1–7 days. Patients require MRI brain, carotid ultrasound, echocardiography, and telemetry for AFib. [See disposition node](#/node/crao-dispo).',
      },
      {
        heading: '🛑 Do NOT give tPA beyond the 4.5-hour window',
        body: 'There is no proven benefit for IV tPA after 4.5 hours from symptom onset. Using last-known-well time if the patient woke with symptoms. Beyond the window, focus on embolic workup and secondary prevention. [See tPA decision node](#/node/crao-tpa-decision).',
      },
      {
        heading: '🛑 Do NOT skip antiplatelet and statin at discharge',
        body: 'Aspirin and high-intensity statin (atorvastatin 40–80 mg) reduce future stroke and MI risk and should be initiated during the admission. These are as important as treating the acute event. [See secondary prevention node](#/node/crao-secondary-prevention).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // GLOBE RUPTURE
  // ─────────────────────────────────────────────
  'globe-rupture-stop': {
    id: 'globe-rupture-stop',
    title: 'Globe Rupture — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT apply a pressure patch to an open globe',
        body: 'Any pressure on an open globe can extrude intraocular contents, causing irreversible vision loss. Use a rigid Fox shield (or cut Styrofoam cup) taped to the brow and cheek — zero contact with the globe. [See protect node](#/node/globe-protect).',
      },
      {
        heading: '🛑 Do NOT check intraocular pressure (tonometry)',
        body: 'Tonometers require direct applanation of the cornea — applying any pressure risks catastrophic extrusion of globe contents. Tonometry is absolutely contraindicated in open globe. [See what NOT to do node](#/node/globe-donot).',
      },
      {
        heading: '🛑 Do NOT perform ocular ultrasound on an open globe',
        body: 'The transducer probe exerts direct pressure on the globe. Ultrasound is contraindicated until the globe is repaired. Use CT orbits (non-contrast, thin cuts) for imaging. [See imaging node](#/node/globe-imaging).',
      },
      {
        heading: '🛑 Do NOT order MRI if metallic IOFB is possible',
        body: 'Metal-on-metal mechanisms (hammering, grinding) have a high rate of metallic intraocular foreign bodies. MRI can mobilize a metallic IOFB and destroy the eye. CT orbits is the mandatory first-line imaging. [See imaging node](#/node/globe-imaging).',
      },
      {
        heading: '🛑 Do NOT use succinylcholine for RSI in open globe',
        body: 'Succinylcholine causes fasciculations that raise intraocular pressure up to 10 mmHg, risking extrusion. Use rocuronium for RSI. Ketamine also raises IOP via extraocular muscle contraction and should be avoided. [See what NOT to do node](#/node/globe-donot).',
      },
      {
        heading: '🛑 Do NOT remove a visible intraocular foreign body in the ED',
        body: 'Foreign body removal requires a controlled OR environment with ophthalmology. ED removal risks catastrophic extrusion and loss of the eye. Shield the eye and transport. [See what NOT to do node](#/node/globe-donot).',
      },
      {
        heading: '🛑 Do NOT skip IV antibiotic prophylaxis',
        body: 'Endophthalmitis without prophylaxis occurs in ~6.8% of cases; with IV antibiotics it falls to <1%. Give vancomycin 15 mg/kg + ceftazidime 50 mg/kg IV immediately. Farm/organic injuries require even broader coverage. [See antibiotics node](#/node/globe-antibiotics).',
      },
      {
        heading: '🛑 Do NOT delay ophthalmology consultation',
        body: 'Ideal globe repair is within 12–24 hours. Each hour of delay increases risk of endophthalmitis, choroidal hemorrhage, and sympathetic ophthalmia (bilateral autoimmune uveitis). Call ophthalmology the moment open globe is suspected. [See consult node](#/node/globe-consult).',
      },
      {
        heading: '🛑 Do NOT let the patient eat or drink',
        body: 'All open globe injuries require emergent surgical repair. Keep the patient strictly NPO from first suspicion onward — aspiration under emergency anesthesia is a preventable complication. [See protect node](#/node/globe-protect).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // MASSIVE TRANSFUSION
  // ─────────────────────────────────────────────
  'massive-transfusion-stop': {
    id: 'massive-transfusion-stop',
    title: 'Massive Transfusion — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT delay MTP activation waiting for lab confirmation',
        body: 'Clinical gestalt and the ABC Score (≥2 predicts need with ~75% sensitivity) guide activation. Waiting for coagulation labs delays life-saving blood products by critical minutes. Activate early and stand down if not needed. [See activation node](#/node/mtp-indications).',
      },
      {
        heading: '🛑 Do NOT use crystalloid as the primary resuscitation fluid',
        body: 'Large-volume crystalloid dilutes clotting factors and worsens the lethal triad (coagulopathy, acidosis, hypothermia). Damage control resuscitation uses balanced blood products (1:1:1 pRBC:FFP:platelets) from the start. [See blood products node](#/node/mtp-products).',
      },
      {
        heading: '🛑 Do NOT forget TXA — give it within 3 hours of injury',
        body: 'Tranexamic acid 1 g IV over 10 min (then 1 g over 8 h) significantly reduces mortality in traumatic hemorrhage but loses benefit and may increase thrombotic risk if given after 3 hours. Time is critical. [See TXA node](#/node/mtp-txa).',
      },
      {
        heading: '🛑 Do NOT skip calcium replacement during massive transfusion',
        body: 'Citrate in blood products chelates ionized calcium, causing hypocalcemia, myocardial depression, and coagulopathy. Give calcium gluconate 1 g IV (or calcium chloride 500 mg) every 4 units transfused. [See calcium node](#/node/mtp-calcium).',
      },
      {
        heading: '🛑 Do NOT allow permissive hypotension in TBI patients',
        body: 'Permissive hypotension (SBP 80–90) is standard for hemorrhagic shock but is contraindicated with concomitant traumatic brain injury. TBI requires MAP ≥80 mmHg to maintain cerebral perfusion pressure. [See permissive hypotension node](#/node/mtp-permissive-hypotension).',
      },
      {
        heading: '🛑 Do NOT transfuse Rh-positive blood to Rh-negative females of childbearing age without consideration',
        body: 'In true emergency use O-negative pRBCs for Rh-negative females of reproductive potential if Rh status unknown. Rh sensitization from a single transfusion can cause hemolytic disease of the fetus in future pregnancies. [See Rh node](#/node/mtp-rh).',
      },
      {
        heading: '🛑 Do NOT ignore TEG/ROTEM when available',
        body: 'Goal-directed resuscitation using viscoelastic testing (TEG/ROTEM) reduces blood product use and improves outcomes over empiric 1:1:1 ratios. Use these results to guide targeted factor replacement. [See TEG node](#/node/mtp-teg-interpret).',
      },
      {
        heading: '🛑 Do NOT continue MTP after hemorrhage control',
        body: 'Ongoing MTP beyond hemorrhage control causes transfusion-associated circulatory overload (TACO), TRALI, and electrolyte crises. Reassess termination criteria once surgical or IR control is achieved. [See termination node](#/node/mtp-termination-q).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // PELVIC FRACTURE
  // ─────────────────────────────────────────────
  'pelvic-fracture-stop': {
    id: 'pelvic-fracture-stop',
    title: 'Pelvic Fracture — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT rock the pelvis repeatedly to assess stability',
        body: 'A single gentle exam is acceptable; repeated pelvic rocking dislodges clots and dramatically worsens venous hemorrhage. Document instability once and move on — imaging confirms the fracture pattern. [See initial assessment node](#/node/pelvic-start).',
      },
      {
        heading: '🛑 Do NOT place the pelvic binder at the iliac crests',
        body: 'The binder must be positioned at the level of the greater trochanters, not the iliac crests. Incorrect placement at the crests fails to close the pelvic ring and may worsen the injury. [See unstable node](#/node/pelvic-unstable).',
      },
      {
        heading: '🛑 Do NOT take a FAST-positive unstable patient to angiography first',
        body: 'Hemodynamic instability plus positive FAST (significant intraperitoneal blood) means the abdomen is the bleeding source — go to OR for laparotomy. Angiography is for hemodynamically transient or improving patients with pelvic source. [See FAST positive node](#/node/pelvic-fast-positive).',
      },
      {
        heading: '🛑 Do NOT place a Foley before ruling out urethral injury',
        body: 'Blood at the meatus, high-riding prostate, or scrotal hematoma requires a retrograde urethrogram (RUG) before any urethral instrumentation. Forcing a Foley through a partial urethral tear converts it to a complete disruption. [See urethral injury node](#/node/pelvic-urethral-injury).',
      },
      {
        heading: '🛑 Do NOT skip TXA in traumatic pelvic hemorrhage',
        body: 'TXA 1 g IV over 10 min (then 1 g over 8 h) has mortality benefit in traumatic hemorrhage and must be given within 3 hours of injury. The benefit disappears and harm increases after 3 hours. [See unstable node](#/node/pelvic-unstable).',
      },
      {
        heading: '🛑 Do NOT assume most pelvic hemorrhage requires angiography',
        body: '90% of pelvic hemorrhage is venous in origin and controlled with pelvic binder + damage control resuscitation. Only ~10% have arterial bleeding needing angioembolization. Rushing to IR when FAST is positive wastes lethal time. [See FAST negative node](#/node/pelvic-fast-negative).',
      },
      {
        heading: '🛑 Do NOT miss an open pelvic fracture (perineal laceration)',
        body: 'Any perineal, vaginal, or rectal laceration in the setting of pelvic fracture is an open fracture until proven otherwise — mortality approaches 50%. Requires emergent surgical debridement and diverting colostomy. [See classification management node](#/node/pelvic-classification-management).',
      },
      {
        heading: '🛑 Do NOT leave REBOA inflated beyond the recommended window',
        body: 'Zone 3 REBOA buys 60–90 minutes of hemostasis but causes ischemic injury beyond that window. It is a bridge to PPP or angiography — not a definitive intervention. [See REBOA node](#/node/pelvic-reboa).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // LE FORT FRACTURE
  // ─────────────────────────────────────────────
  'le-fort-fracture-stop': {
    id: 'le-fort-fracture-stop',
    title: 'Le Fort Fracture — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT nasally intubate a Le Fort II or III fracture',
        body: 'Le Fort II and III fractures involve the cribriform plate. Nasotracheal intubation risks intracranial tube placement through the fractured skull base. Oral RSI or surgical airway (cricothyrotomy) are the safe alternatives. [See airway decision node](#/node/lefort-airway-decision).',
      },
      {
        heading: '🛑 Do NOT dismiss midface mobility as benign',
        body: 'Grasping the anterior maxilla and feeling movement of the midface independent of the skull confirms Le Fort fracture. This is a surgical emergency with airway and hemorrhage implications — immediate ENT/OMFS and trauma surgery consultation required. [See exam node](#/node/lefort-exam).',
      },
      {
        heading: '🛑 Do NOT delay airway management in midface fractures',
        body: 'Hemorrhage from midface fractures rapidly distorts anatomy. Edema, blood, and ongoing bleeding make delayed airway access exponentially harder. Secure the airway early, before anatomic landmarks are obscured. [See airway check node](#/node/lefort-airway-check).',
      },
      {
        heading: '🛑 Do NOT pack a nasal passage with suspected CSF leak',
        body: 'Nasal packing in the setting of a CSF leak (clear rhinorrhea, halo sign) risks retrograde bacterial contamination causing meningitis. Identify CSF leak clinically and manage conservatively pending neurosurgery input. [See CSF node](#/node/lefort-csf).',
      },
      {
        heading: '🛑 Do NOT miss posterior epistaxis requiring emergent embolization',
        body: 'Midface fractures can lacerate the internal maxillary artery or sphenopalatine branches, causing massive hemorrhage uncontrolled by anterior packing. Refractory bleeding requires IR angioembolization urgently. [See refractory hemorrhage node](#/node/lefort-hemorrhage-refractory).',
      },
      {
        heading: '🛑 Do NOT clear the c-spine clinically in high-energy midface fractures',
        body: 'The force required to produce a Le Fort fracture is severe. All patients need cervical spine imaging (CT C-spine) — the mechanism obligates it regardless of neurological exam. [See c-spine node](#/node/lefort-cspine).',
      },
      {
        heading: '🛑 Do NOT neglect ocular injury evaluation',
        body: 'Le Fort II and III fractures frequently involve the orbit and can cause globe injury, retrobulbar hematoma (lateral canthotomy indication), or traumatic optic neuropathy. Formal ocular exam is mandatory. [See ocular node](#/node/lefort-ocular).',
      },
      {
        heading: '🛑 Do NOT skip CT maxillofacial with fine cuts',
        body: 'Plain films cannot characterize Le Fort fracture patterns reliably. CT with 3D reconstruction is mandatory to guide surgical planning and identify associated injuries (orbital walls, skull base, c-spine). [See imaging node](#/node/lefort-imaging).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // DIABETES MANAGEMENT
  // ─────────────────────────────────────────────
  'diabetes-management-stop': {
    id: 'diabetes-management-stop',
    title: 'Diabetes Management — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT give insulin without checking for DKA/HHS first',
        body: 'Hyperglycemic patients must be screened for DKA (anion gap, ketones, pH) and HHS (osm >320, altered mental status) before starting a diabetes management protocol. The treatment pathways differ significantly. [See DKA screen node](#/node/dm-dka-screen).',
      },
      {
        heading: '🛑 Do NOT correct hypoglycemia with IV dextrose and then discharge without identifying the cause',
        body: 'Sulfonylurea- and long-acting insulin-induced hypoglycemia can recur hours later. These patients require observation (minimum 4–8 hours) or admission. Identify and address the cause — dose error, new renal failure, or intentional overdose. [See hypoglycemia cause node](#/node/dm-hypo-cause).',
      },
      {
        heading: '🛑 Do NOT continue an insulin pump in an altered or critically ill patient',
        body: 'Insulin pumps must be disconnected when a patient cannot manage them independently. Ongoing basal infusion in an NPO, critically ill, or altered patient risks severe recurrent hypoglycemia. Transition to IV insulin drip or scheduled SC dosing. [See pump disconnect node](#/node/dm-pump-disconnect).',
      },
      {
        heading: '🛑 Do NOT use a sliding scale alone for inpatient glycemic control',
        body: 'Reactive sliding-scale insulin alone is associated with poor glycemic control and worse outcomes. All admitted diabetic patients should receive a basal-bolus protocol as the primary regimen, with sliding scale only for correction. [See inpatient regimen node](#/node/dm-inpatient-regimen).',
      },
      {
        heading: '🛑 Do NOT target normal glucose in critically ill patients',
        body: 'Intensive glucose control (target <110 mg/dL) in ICU patients increases mortality from hypoglycemia (NICE-SUGAR trial). Target glucose 140–180 mg/dL in critically ill patients. [See inpatient target node](#/node/dm-inpatient-target).',
      },
      {
        heading: '🛑 Do NOT give subcutaneous insulin to a hemodynamically unstable patient',
        body: 'SC insulin has unpredictable absorption in shock or poor perfusion states. Use IV regular insulin infusion for glycemic control in any hemodynamically unstable patient. [See IV insulin node](#/node/dm-iv-insulin).',
      },
      {
        heading: '🛑 Do NOT start metformin in patients with AKI, contrast exposure, or sepsis',
        body: 'Metformin is contraindicated in eGFR <30 and should be held for contrast studies and during acute illness. Failure to hold it risks lactic acidosis — a potentially fatal complication. [See oral agents node](#/node/dm-oral-agents).',
      },
      {
        heading: '🛑 Do NOT overlap SC insulin and IV insulin infusion',
        body: 'When transitioning from IV to SC insulin, give the first SC basal dose 1–2 hours before stopping the infusion to prevent rebound hyperglycemia. Running both simultaneously risks additive hypoglycemia. [See IV to SC node](#/node/dm-iv-to-sc).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // CAUSTIC INGESTION
  // ─────────────────────────────────────────────
  'caustic-ingestion-stop': {
    id: 'caustic-ingestion-stop',
    title: 'Caustic Ingestion — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT induce emesis in caustic ingestion',
        body: 'Vomiting re-exposes the esophagus and oropharynx to caustic material, worsening mucosal injury. Never give ipecac or attempt NG-induced emesis after caustic ingestion. [See symptoms node](#/node/caustic-symptoms).',
      },
      {
        heading: '🛑 Do NOT attempt neutralization (acids + alkalis)',
        body: 'Mixing acids and alkalis generates an exothermic reaction that adds thermal burn injury to chemical injury. Do not give baking soda for acid ingestion or vinegar for alkali — it makes things worse. [See type node](#/node/caustic-type).',
      },
      {
        heading: '🛑 Do NOT place a nasogastric tube blindly after caustic ingestion',
        body: 'Blind NG tube insertion can perforate an already-weakened esophagus. If gastric decontamination or lavage is needed, do it under direct endoscopic guidance only, and only in specific high-ingestion scenarios. [See airway/GI assess node](#/node/caustic-airway-assess).',
      },
      {
        heading: '🛑 Do NOT perform early EGD in signs of perforation',
        body: 'Endoscopy is contraindicated if perforation is suspected (pneumomediastinum, peritonitis, free air). Send to surgery immediately. Performing EGD risks worsening perforation with insufflation. [See perforation node](#/node/caustic-perforation).',
      },
      {
        heading: '🛑 Do NOT assume an asymptomatic patient has no significant injury',
        body: 'Absence of oropharyngeal burns does not rule out esophageal or gastric injury — up to 30% of patients with significant distal injury have no visible oral burns. EGD is required to grade injury accurately. [See EGD timing node](#/node/caustic-egd-timing).',
      },
      {
        heading: '🛑 Do NOT use steroids routinely for alkali ingestion',
        body: 'Steroids were once recommended to prevent stricture formation but evidence does not support routine use and they may mask signs of perforation. Steroids are not standard of care in most guidelines. [See grade 2A node](#/node/caustic-grade-2a).',
      },
      {
        heading: '🛑 Do NOT delay securing the airway in stridor or respiratory distress',
        body: 'Supraglottic and laryngeal edema from caustic ingestion can progress rapidly. Early intubation before complete obstruction is far safer than a crash airway. Have a surgical airway kit at bedside. [See airway secure node](#/node/caustic-airway-secure).',
      },
      {
        heading: '🛑 Do NOT discharge Zargar grade 2b or 3 injuries',
        body: 'Grade 2b (deep circumferential) and grade 3 injuries have high complication rates (perforation, stricture, death) requiring ICU-level care, surgical consultation, and prolonged monitoring. [See grade 3 node](#/node/caustic-grade-3).',
      },
      {
        heading: '🛑 Do NOT skip psychiatric evaluation after intentional ingestion',
        body: 'Intentional caustic ingestion is a serious self-harm behavior. All patients require psychiatric evaluation before discharge — safety planning and mental health follow-up are mandatory. [See psych node](#/node/caustic-psych).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // ACUTE PANCREATITIS
  // ─────────────────────────────────────────────
  'acute-pancreatitis-stop': {
    id: 'acute-pancreatitis-stop',
    title: 'Acute Pancreatitis — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT give aggressive crystalloid resuscitation in all pancreatitis',
        body: 'The WATERFALL trial showed aggressive LR resuscitation (250–500 mL/hr) increases SIRS and organ failure compared to moderate resuscitation (1.5 mL/kg/hr). Moderate goal-directed fluid resuscitation with lactated Ringer\'s is preferred. [See moderate resus node](#/node/ap-moderate-resus).',
      },
      {
        heading: '🛑 Do NOT use normal saline as the resuscitation fluid',
        body: 'Isotonic saline causes hyperchloremic metabolic acidosis that worsens pancreatic inflammation. Lactated Ringer\'s is the preferred resuscitation fluid for acute pancreatitis based on multiple RCTs. [See mild resus node](#/node/ap-mild-resus).',
      },
      {
        heading: '🛑 Do NOT delay ERCP in gallstone pancreatitis with cholangitis',
        body: 'Gallstone pancreatitis with concurrent acute cholangitis (fever, jaundice, RUQ pain) requires urgent ERCP within 24 hours. Delays worsen sepsis and mortality. ERCP is NOT indicated for uncomplicated gallstone pancreatitis. [See gallstone node](#/node/ap-gallstone).',
      },
      {
        heading: '🛑 Do NOT use prophylactic antibiotics routinely',
        body: 'Prophylactic antibiotics do not prevent infectious complications in pancreatitis and contribute to antibiotic resistance. Reserve antibiotics for confirmed infected necrosis (gas in necrosis on CT, positive cultures) or cholangitis. [See infected necrosis node](#/node/ap-infected-necrosis).',
      },
      {
        heading: '🛑 Do NOT perform early CT in mild acute pancreatitis',
        body: 'CT with contrast is not needed in mild pancreatitis with clear clinical diagnosis. Early CT does not change management and the contrast may worsen pancreatic necrosis in poorly perfused glands. Reserve CT for severity assessment at 48–72h or when diagnosis is uncertain. [See severity node](#/node/ap-severity).',
      },
      {
        heading: '🛑 Do NOT keep patients NPO unnecessarily',
        body: 'Early oral feeding (within 24–48h of pain onset if tolerated) is associated with shorter hospital stay and fewer complications. Only keep NPO for ileus, severe nausea/vomiting, or anticipated procedural need. [See mild resus node](#/node/ap-mild-resus).',
      },
      {
        heading: '🛑 Do NOT drain sterile pancreatic necrosis',
        body: 'Sterile necrosis does not require intervention. Early surgical or endoscopic debridement of sterile collections worsens outcomes. Operate only for infected necrosis failing conservative management (step-up approach). [See sterile necrosis node](#/node/ap-sterile-necrosis-mgmt).',
      },
      {
        heading: '🛑 Do NOT discharge moderate-severe pancreatitis from the ED',
        body: 'BISAP ≥3, organ failure, or CT evidence of necrosis/collections requires ICU or step-down admission with close monitoring for deterioration, infectious complications, and respiratory failure. [See complicated dispo node](#/node/ap-dispo-complicated).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // UPPER GI BLEED
  // ─────────────────────────────────────────────
  'upper-gi-bleed-stop': {
    id: 'upper-gi-bleed-stop',
    title: 'Upper GI Bleed — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT transfuse to Hgb >8 in stable non-variceal UGIB',
        body: 'Liberal transfusion strategy (Hgb >9–10) worsens outcomes in UGIB, especially variceal bleeds. A restrictive threshold (Hgb 7–8 g/dL) improves survival. Avoid over-transfusion — it raises portal pressure and worsens variceal hemorrhage. [See transfusion node](#/node/ugib-transfusion).',
      },
      {
        heading: '🛑 Do NOT give terlipressin or octreotide only — add antibiotics in cirrhosis',
        body: 'Cirrhotic patients with variceal bleeding have a 20% 5-day infection risk. Antibiotic prophylaxis (ceftriaxone 1 g/day × 7 days) reduces bacterial infections AND rebleeding — it\'s a survival intervention, not optional. [See variceal antibiotics node](#/node/ugib-variceal-abx).',
      },
      {
        heading: '🛑 Do NOT delay PPI in non-variceal UGIB',
        body: 'High-dose IV PPI (esomeprazole 80 mg bolus → 8 mg/hr infusion) before endoscopy reduces stigmata of recent hemorrhage and may decrease need for endoscopic therapy. Give it early — don\'t wait for EGD results. [See PPI node](#/node/ugib-ppi).',
      },
      {
        heading: '🛑 Do NOT discharge low-risk UGIB without validating the score',
        body: 'Glasgow-Blatchford Score 0 is the validated threshold for safe discharge. Hgb, BUN, SBP, HR, and comorbidities must all meet criteria. Clinical gestalt alone is insufficient — calculate the GBS. [See risk stratification node](#/node/ugib-risk-stratify).',
      },
      {
        heading: '🛑 Do NOT place a Blakemore tube without a protected airway',
        body: 'Sengstaken-Blakemore tube placement should only be done in intubated patients. Tube migration causing esophageal balloon inflation in the airway is fatal. Intubate first, then place the tube. [See Blakemore prep node](#/node/ugib-blakemore-prep).',
      },
      {
        heading: '🛑 Do NOT use vasopressors as the first-line therapy for variceal bleed',
        body: 'Vasoactive agents (octreotide, terlipressin) reduce portal pressure and splanchnic flow — they are first-line for variceal hemorrhage. Norepinephrine for MAP alone ignores the portal hypertensive mechanism. [See octreotide node](#/node/ugib-octreotide).',
      },
      {
        heading: '🛑 Do NOT delay endoscopy beyond 24h in high-risk patients',
        body: 'Hemodynamically unstable patients and high-risk scores (AIMS65 ≥2, GBS ≥12) require endoscopy within 12–24 hours. Delay beyond 24h in any admitted UGIB patient worsens rebleeding risk. [See EGD timing node](#/node/ugib-egd-timing).',
      },
      {
        heading: '🛑 Do NOT forget to correct coagulopathy in variceal bleeding',
        body: 'INR >2.5 in cirrhotic patients worsens hemostasis. Give FFP and platelets as needed before endoscopy. Cryoprecipitate for fibrinogen <100 mg/dL. TEG/ROTEM guides transfusion in the most complex cases. [See variceal resus node](#/node/ugib-variceal-resus).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // SEROTONIN SYNDROME
  // ─────────────────────────────────────────────
  'serotonin-syndrome-stop': {
    id: 'serotonin-syndrome-stop',
    title: 'Serotonin Syndrome — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT give antipsychotics (haloperidol) for agitation in serotonin syndrome',
        body: 'Haloperidol has weak 5-HT2A antagonist properties but its dopamine blockade can precipitate NMS overlap states and impair heat dissipation. Use benzodiazepines as the first-line agent for agitation and autonomic instability in SS. [See severity/treatment node](#/node/ss-severity).',
      },
      {
        heading: '🛑 Do NOT confuse serotonin syndrome with NMS — treatment differs',
        body: 'NMS develops over days (bradykinesia, lead-pipe rigidity, no clonus), SS develops over hours (hyperreflexia, clonus, agitation). Bromocriptine used in NMS is useless in SS and wastes time. Differentiate carefully before treatment. [See SS vs NMS node](#/node/ss-vs-nms-q).',
      },
      {
        heading: '🛑 Do NOT use physical restraints without sedation in hyperthermia',
        body: 'Physical struggling against restraints in a patient with serotonin syndrome dramatically increases heat production, accelerating hyperthermia to fatal levels. Sedate with benzodiazepines before or concurrent with any physical restraint. [See severe treatment node](#/node/ss-severe-tx).',
      },
      {
        heading: '🛑 Do NOT miss linezolid and methylene blue as serotonergic triggers',
        body: 'Linezolid (an antibiotic with MAO-I properties) and methylene blue (used for methemoglobinemia) are potent serotonergic agents that can precipitate SS when combined with SSRIs or other serotonergic drugs. Review ALL medications carefully. [See drug history node](#/node/ss-drug-history).',
      },
      {
        heading: '🛑 Do NOT use succinylcholine for intubation in rhabdomyolysis',
        body: 'Serotonin syndrome with severe rigidity and rhabdomyolysis causes hyperkalemia. Succinylcholine in the setting of rhabdomyolysis risks fatal hyperkalemic cardiac arrest. Use rocuronium for RSI. [See severe treatment node](#/node/ss-severe-tx).',
      },
      {
        heading: '🛑 Do NOT restart serotonergic medications before 24h of symptom resolution',
        body: 'Restarting the offending agent(s) before full symptom resolution guarantees relapse. All serotonergic medications should remain held until the patient is symptom-free and a safe outpatient plan is confirmed with their prescriber. [See complete node](#/node/ss-complete).',
      },
      {
        heading: '🛑 Do NOT allow temperature >41°C to persist without aggressive cooling',
        body: 'Hyperthermia above 41°C causes rhabdomyolysis, DIC, multi-organ failure, and death within hours. Active external cooling plus ice packs to groin/axilla/neck, and sedation with benzodiazepines (or intubation/paralysis if refractory) are life-saving. [See severe treatment node](#/node/ss-severe-tx).',
      },
      {
        heading: '🛑 Do NOT rely on cyproheptadine alone in severe serotonin syndrome',
        body: 'Cyproheptadine (5-HT2A antagonist) has benefit in mild-moderate SS but is oral only and not effective in severe cases where patients cannot swallow safely. Severe SS requires ICU admission, benzodiazepines, and likely intubation. [See severe dispo node](#/node/ss-dispo-severe).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // DIGOXIN TOXICITY
  // ─────────────────────────────────────────────
  'digoxin-toxicity-stop': {
    id: 'digoxin-toxicity-stop',
    title: 'Digoxin Toxicity — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT cardiovert digoxin-toxic arrhythmias with electricity',
        body: 'DC cardioversion in digoxin toxicity can trigger refractory ventricular fibrillation due to increased automaticity. If cardioversion is absolutely unavoidable, use the lowest effective energy and give DigiFab first if available. [See treatments to avoid node](#/node/dig-avoid).',
      },
      {
        heading: '🛑 Do NOT give calcium to treat hyperkalemia in digoxin toxicity',
        body: 'Calcium in the setting of digoxin toxicity (the "stone heart" phenomenon) can cause fatal ventricular arrhythmias by synergizing with digoxin\'s calcium effects on myocardial cells. Use sodium bicarbonate, insulin/dextrose, or kayexalate instead. [See hyperkalemia node](#/node/dig-hyperkalemia).',
      },
      {
        heading: '🛑 Do NOT withhold DigiFab for fear of the dose or cost',
        body: 'DigiFab (digoxin-specific Fab) is the definitive antidote with rapid effect. Indications include hemodynamic instability, life-threatening arrhythmia, K+ >5.5, or severe bradycardia. Do not delay due to uncertainty about the dose — empiric dosing (10–20 vials) is acceptable. [See DigiFab node](#/node/dig-fab).',
      },
      {
        heading: '🛑 Do NOT give atropine as primary therapy for bradycardia',
        body: 'Atropine may worsen digoxin toxicity by increasing AV nodal conduction at a time when ventricular automaticity is already dangerously elevated. Transcutaneous pacing and DigiFab are preferred over atropine for bradyarrhythmias. [See bradycardia node](#/node/dig-brady).',
      },
      {
        heading: '🛑 Do NOT treat PVCs or "PAT with block" with class IA or IC antiarrhythmics',
        body: 'Quinidine, procainamide, and flecainide are contraindicated in digoxin toxicity — they increase QT prolongation and myocardial depression synergistically. Lidocaine or phenytoin are the only acceptable antiarrhythmics if DigiFab is not available. [See treatments to avoid node](#/node/dig-avoid).',
      },
      {
        heading: '🛑 Do NOT interpret the digoxin level in isolation',
        body: 'Toxicity is a clinical diagnosis. Patients can be toxic at "therapeutic" levels (0.8–2.0 ng/mL) if hypokalemic, hypothyroid, or elderly. And some patients with levels >2 are asymptomatic. Treat the patient, not the number. [See risk stratification node](#/node/dig-risk-strat).',
      },
      {
        heading: '🛑 Do NOT draw a digoxin level within 6 hours of the last dose',
        body: 'Digoxin undergoes a distribution phase lasting 6–8 hours after ingestion. Levels drawn before distribution is complete are falsely elevated and misleading. For acute ingestions, draw levels at 6+ hours. [See ECG/labs node](#/node/dig-ecg).',
      },
      {
        heading: '🛑 Do NOT discharge chronic toxicity without addressing precipitants',
        body: 'Chronic digoxin toxicity is almost always caused by a precipitant — new renal impairment, dehydration, hypokalemia, hypothyroidism, or drug interactions (amiodarone, verapamil, quinidine). Identify and correct the cause before discharge. [See chronic toxicity node](#/node/dig-chronic).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // BETA-BLOCKER OVERDOSE
  // ─────────────────────────────────────────────
  'beta-blocker-od-stop': {
    id: 'beta-blocker-od-stop',
    title: 'Beta-Blocker OD — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT use atropine as the primary treatment for BB-induced bradycardia',
        body: 'Atropine works on muscarinic receptors and is largely ineffective for beta-blocker toxicity. Brief use while escalating therapy is acceptable, but relying on atropine delays HIET, calcium, and glucagon — the therapies that work. [See atropine node](#/node/bb-atropine).',
      },
      {
        heading: '🛑 Do NOT give glucagon without preparing for vomiting',
        body: 'Glucagon commonly causes vomiting, which risks aspiration in a bradycardic, obtunded patient. Have suction available and consider airway protection before giving glucagon bolus (3–10 mg IV). [See glucagon node](#/node/bb-glucagon).',
      },
      {
        heading: '🛑 Do NOT miss that sotalol requires QT/torsades monitoring',
        body: 'Sotalol is a beta-blocker AND a class III antiarrhythmic (QT prolongation). Overdose causes bradycardia AND torsades de pointes. Treat QTc prolongation with magnesium and overdrive pacing — different from other beta-blockers. [See sotalol node](#/node/bb-sotalol).',
      },
      {
        heading: '🛑 Do NOT delay High-Dose Insulin Euglycemic Therapy (HIET)',
        body: 'HIET (regular insulin 1 unit/kg IV bolus → 0.5–1 unit/kg/hr infusion) is the most effective therapy for hemodynamic instability in BB overdose. It should be started early rather than after multiple failed medication trials. [See HIET node](#/node/bb-hiet).',
      },
      {
        heading: '🛑 Do NOT forget dextrose supplementation with HIET',
        body: 'High-dose insulin infusions cause profound hypoglycemia without glucose co-administration. Give dextrose 25–50 g IV bolus and maintain a dextrose infusion throughout HIET. Monitor glucose every 30 minutes. [See HIET dosing node](#/node/bb-hiet-dosing).',
      },
      {
        heading: '🛑 Do NOT discharge "asymptomatic" extended-release BB ingestion early',
        body: 'Extended-release propranolol and metoprolol succinate have delayed peak toxicity (8–12 hours or longer). An initially asymptomatic patient can become critically bradycardic hours after ED arrival. All intentional BB overdoses require minimum 6–8h observation. [See disposition node](#/node/bb-disposition).',
      },
      {
        heading: '🛑 Do NOT use intralipid emulsion as first-line (lipophilic BB overdose exception)',
        body: 'Intralipid therapy is an adjunct for refractory shock, primarily useful in lipophilic BB overdoses (propranolol). It should not replace HIET, calcium, or vasopressors but can be added as a salvage therapy when these fail. [See lipid node](#/node/bb-lipid).',
      },
      {
        heading: '🛑 Do NOT withhold ECMO consideration in refractory cardiogenic shock',
        body: 'Venoarterial ECMO is the ultimate rescue therapy for BB-induced refractory cardiogenic shock. Do not delay consultation — bridge therapies (pacing, HIET, lipid, pressors) should be maximized concurrently while ECMO is arranged. [See ECMO node](#/node/bb-ecmo).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // CCB OVERDOSE
  // ─────────────────────────────────────────────
  'ccb-od-stop': {
    id: 'ccb-od-stop',
    title: 'CCB Overdose — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT give more IV fluids as the primary treatment for CCB shock',
        body: 'CCB toxicity causes vasodilatory and cardiogenic shock — volume loading alone is ineffective and causes pulmonary edema. Start HIET and vasopressors early rather than repeated fluid boluses. [See initial stabilization node](#/node/ccb-initial-stab).',
      },
      {
        heading: '🛑 Do NOT skip GI decontamination for extended-release CCB ingestion',
        body: 'Extended-release amlodipine, diltiazem, and verapamil have prolonged absorption. Whole-bowel irrigation with polyethylene glycol (1–2 L/hr until clear effluent) is indicated for extended-release ingestion presenting within 4–6 hours. [See GI decontamination node](#/node/ccb-gi-decon).',
      },
      {
        heading: '🛑 Do NOT delay High-Dose Insulin Euglycemic Therapy',
        body: 'HIET (insulin 1 unit/kg bolus → 0.5–2 units/kg/hr infusion) is the cornerstone of CCB OD management. Myocardial cells in CCB toxicity are insulin-resistant and HIET overcomes this by shifting to carbohydrate metabolism. Start it before pressors are maxed out. [See HIET intro node](#/node/ccb-hiet-intro).',
      },
      {
        heading: '🛑 Do NOT forget calcium chloride over calcium gluconate for severe toxicity',
        body: 'Calcium chloride provides 3× the elemental calcium per vial compared to calcium gluconate and should be used preferentially for hemodynamically unstable patients. Central line placement is ideal to avoid extravasation injury. [See calcium node](#/node/ccb-calcium).',
      },
      {
        heading: '🛑 Do NOT miss an extended-release tablet presentation on imaging',
        body: 'Some extended-release CCB tablets are radiopaque and visible on abdominal X-ray. Identifying pill burden guides decontamination decisions and prognosis. [See extended release node](#/node/ccb-extended-release).',
      },
      {
        heading: '🛑 Do NOT use glucagon as a primary agent — it is less effective in CCB than in BB OD',
        body: 'Glucagon is modestly effective in beta-blocker toxicity but has limited evidence in CCB overdose. Give it as a temporizing bridge while HIET and calcium are initiated, not as a definitive treatment. [See glucagon node](#/node/ccb-glucagon).',
      },
      {
        heading: '🛑 Do NOT withhold methylene blue for refractory vasodilatory shock',
        body: 'In amlodipine-predominant (dihydropyridine) toxicity with profound vasodilation refractory to vasopressors, methylene blue (1–2 mg/kg IV) inhibits NO synthase and can dramatically improve vascular tone. Use it before declaring ECMO the only option. [See methylene blue node](#/node/ccb-methylene-blue).',
      },
      {
        heading: '🛑 Do NOT discharge CCB ingestion without extended observation',
        body: 'Extended-release CCB toxicity peaks at 12–18 hours after ingestion. All intentional or high-dose unintentional CCB overdoses require ICU admission with continuous monitoring — not a few hours of observation. [See disposition node](#/node/ccb-disposition).',
      },
    ],
    citations: [],
  },

  // ─────────────────────────────────────────────
  // IRON OVERDOSE
  // ─────────────────────────────────────────────
  'iron-od-stop': {
    id: 'iron-od-stop',
    title: 'Iron Overdose — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT use activated charcoal for iron overdose',
        body: 'Activated charcoal does not adsorb iron. Giving it delays definitive treatment, risks aspiration in an already-nauseated patient, and provides no benefit. It is contraindicated in iron ingestion. [See GI decontamination node](#/node/iron-gi-decon).',
      },
      {
        heading: '🛑 Do NOT be reassured by a "latent period" of apparent improvement',
        body: 'Stage 2 of iron toxicity (2–12 hours) is a deceptive period of apparent improvement despite ongoing cellular injury. Patients who seem better after Stage 1 GI symptoms are NOT safe to discharge — Stage 3 systemic toxicity (shock, acidosis) follows. [See stages node](#/node/iron-stages).',
      },
      {
        heading: '🛑 Do NOT delay deferoxamine in severe toxicity waiting for the iron level',
        body: 'Deferoxamine should be started immediately in any patient with hemodynamic instability, altered mental status, severe metabolic acidosis, or seizures regardless of iron level. Clinical severity — not a number — is the indication. [See deferoxamine node](#/node/iron-deferoxamine).',
      },
      {
        heading: '🛑 Do NOT continue deferoxamine beyond 24 hours without reassessment',
        body: 'Prolonged deferoxamine infusion (>24–48 hours) causes pulmonary toxicity (deferoxamine-associated acute lung injury/ARDS). Stop or reduce the infusion as soon as clinical improvement allows. [See DFO duration node](#/node/iron-dfo-duration).',
      },
      {
        heading: '🛑 Do NOT use whole bowel irrigation for iron with hemodynamic instability',
        body: 'Whole bowel irrigation is appropriate for early large ingestions without systemic toxicity. In a hemodynamically unstable patient, endoscopy or surgical removal is safer. WBI is a decontamination strategy, not a treatment for established toxicity. [See WBI node](#/node/iron-wbi).',
      },
      {
        heading: '🛑 Do NOT dismiss a normal iron level as ruling out toxicity',
        body: 'Iron levels should be drawn 4–6 hours after ingestion (peak absorption). An early level (<4h) may be falsely reassuring. Furthermore, tissue toxicity correlates with free iron — not total serum iron — and levels can fall as iron distributes intracellularly. [See workup node](#/node/iron-workup).',
      },
      {
        heading: '🛑 Do NOT miss that the "vin rosé" urine color on deferoxamine confirms toxicity',
        body: 'Ferrioxamine (deferoxamine-iron complex) turns urine pink or orange-red ("vin rosé"). Its presence confirms systemic iron absorption and justifies continued deferoxamine therapy. If urine stays clear during DFO, free iron burden may be low. [See DFO dosing node](#/node/iron-dfo-dosing).',
      },
      {
        heading: '🛑 Do NOT skip ICU admission for severe or symptomatic iron toxicity',
        body: 'Any patient with hemodynamic instability, metabolic acidosis, altered mental status, or iron level >500 mcg/dL requires ICU-level care. Multi-organ failure in iron toxicity evolves rapidly and requires continuous monitoring. [See ICU dispo node](#/node/iron-dispo-icu).',
      },
    ],
    citations: [],
  },

};
