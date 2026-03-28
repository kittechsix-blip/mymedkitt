// MedKitt - VP Shunt Malfunction Management
// Recognition -> Imaging Strategy -> Malfunction vs Infection -> ICP Management -> Shunt Tap -> Neurosurgery -> Disposition
// 7 modules: Recognition -> Imaging -> Differentiation -> ICP Management -> Shunt Tap -> Neurosurgery Consultation -> Disposition
// 24 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const VP_SHUNT_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'vps-start',
    type: 'info',
    module: 1,
    title: 'VP Shunt Malfunction',
    body: '[VP Shunt Overview](#/info/vp-shunt-overview) - recognize shunt malfunction early to prevent catastrophic outcomes.\n\n**VP Shunt Basics:**\n- ~30,000 VP shunt procedures performed annually in the US\n- **98% failure rate over 10 years**\n- Revision required 1-2 times every 10 years on average\n- ~50% of pediatric shunts fail within 2 years\n\n**Mortality from malfunction: 1-2.7%**\n\n**Three categories of shunt failure:**\n1. **Mechanical failure** (most common): obstruction, disconnection, migration, fracture\n2. **Infection** (5-12% annually): usually within 6 months of placement\n3. **Functional failure**: over-drainage (slit ventricles) or under-drainage\n\n**Most common obstruction site:** Proximal (ventricular) catheter\n\n**Key principle:** Normal imaging does NOT exclude shunt malfunction. Ventricular size may remain unchanged despite obstruction, especially in chronically shunted patients.',
    citation: [1, 2, 3],
    next: 'vps-presentation',
  },

  {
    id: 'vps-presentation',
    type: 'question',
    module: 1,
    title: 'Clinical Presentation',
    body: '**Classic symptoms of shunt malfunction:**\n- Headache (most common presenting symptom)\n- Nausea and vomiting\n- Lethargy, irritability, drowsiness\n- Altered mental status\n- Visual changes (diplopia, blurred vision)\n- Abdominal pain (distal catheter issues)\n\n**Pediatric-specific signs:**\n- Bulging fontanelle (if open)\n- Increasing head circumference\n- Sunset eyes (upward gaze palsy)\n- Macewen sign ("cracked pot" sound on percussion)\n- Poor feeding, irritability\n\n**Red flags for impending herniation:**\n- Cushing triad: hypertension, bradycardia, irregular respirations\n- Unilateral or bilateral pupil dilation\n- Decerebrate/decorticate posturing\n- Seizures\n- Rapid neurologic decline\n\n**Critical point:** Symptoms may be intermittent in partial obstruction. Caregiver assessment of "acting like previous malfunction" should be taken seriously.',
    citation: [1, 2, 4],
    calculatorLinks: [
      { id: 'vps-malfunction-criteria', label: 'Malfunction Risk Score' },
    ],
    options: [
      {
        label: 'Hemodynamically unstable / herniation signs',
        description: 'Cushing triad, pupil changes, posturing, unresponsive',
        next: 'vps-emergent-icp',
        urgency: 'critical',
      },
      {
        label: 'Symptomatic but hemodynamically stable',
        description: 'Headache, vomiting, lethargy, visual changes',
        next: 'vps-physical-exam',
      },
      {
        label: 'Fever present with shunt symptoms',
        description: 'Concern for shunt infection',
        next: 'vps-infection-workup',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'vps-physical-exam',
    type: 'info',
    module: 1,
    title: 'Physical Examination',
    body: '**Shunt palpation (pumping the reservoir):**\n- Locate the reservoir (usually behind the ear)\n- Press down and release\n\n**Interpretation:**\n| Finding | Suggests |\n|---------|----------|\n| Flat or slow refill (>3-5 sec) | Proximal obstruction - CSF not draining from ventricles |\n| Firm or difficult to compress | Distal obstruction - CSF not draining to peritoneum |\n| Easy to compress, refills quickly | May be functional but NOT reliable |\n\n**IMPORTANT: Shunt pumping has poor sensitivity and specificity.**\n- A normal-feeling shunt does NOT exclude malfunction\n- Do not rely solely on this exam\n\n**Complete neurologic examination:**\n- Mental status (compare to baseline)\n- Cranial nerves (especially III, IV, VI - extraocular movements)\n- Papilledema (if fundoscopy available)\n- Motor/sensory exam\n- Document baseline carefully for serial reassessment\n\n**Inspect the shunt tract:**\n- Redness, swelling, warmth (infection)\n- Skin breakdown over tubing\n- CSF leak',
    citation: [1, 2, 5],
    calculatorLinks: [
      { id: 'vps-pump-test', label: 'Pump Test Interpreter' },
    ],
    next: 'vps-imaging',
  },

  // =====================================================================
  // MODULE 2: IMAGING STRATEGY
  // =====================================================================

  {
    id: 'vps-imaging',
    type: 'info',
    module: 2,
    title: 'Imaging Strategy',
    body: '[Shunt Series Guide](#/info/shunt-series) - comprehensive imaging approach for suspected malfunction.\n\n**Two-pronged imaging approach:**\n\n**1. CT Head (non-contrast):**\n- Compare to previous imaging (CRITICAL)\n- Look for ventricular enlargement\n- Periventricular edema suggests acute obstruction\n- Catheter position\n\n**CAUTION: Normal ventricular size does NOT exclude malfunction**\n- Chronically shunted patients may have "stiff" ventricles\n- Ventricles may not dilate despite rising ICP\n- This is a common cause of missed diagnosis\n\n**2. Shunt Series (plain radiographs):**\n- AP and lateral skull\n- Chest (AP)\n- Abdomen (AP)\n\n**Shunt series findings:**\n| Finding | Interpretation |\n|---------|----------------|\n| Discontinuity | Fracture or disconnection |\n| Migration | Catheter has moved from original position |\n| Kinking | Mechanical obstruction |\n| Coiling in peritoneum | May be normal or indicate migration |\n\n**Shunt series sensitivity: 88.6% (adults), only 11% (pediatric)**\n**Shunt series specificity: 62.5% (adults), 98% (pediatric)**\n\nCombined CT + shunt series provides best diagnostic yield.',
    citation: [1, 2, 3],
    next: 'vps-imaging-interpretation',
  },

  {
    id: 'vps-imaging-interpretation',
    type: 'question',
    module: 2,
    title: 'Imaging Interpretation',
    body: 'Assess imaging findings in context of clinical presentation.\n\n**Imaging suggesting malfunction:**\n- Ventricular enlargement compared to baseline\n- New periventricular edema/hypodensity\n- Discontinuity, fracture, or kinking on shunt series\n- Catheter migration (proximal or distal)\n- Distal catheter in unexpected location (bowel, liver, chest)\n\n**Imaging may be normal despite malfunction:**\n- Intermittent obstruction\n- Chronically shunted "stiff" ventricles\n- Early obstruction before ventricular dilation\n\n**KEY PRINCIPLE:**\nIf clinical suspicion remains high despite normal imaging, consult neurosurgery. The physical exam and history may be more reliable than imaging.',
    citation: [1, 2, 4],
    options: [
      {
        label: 'Imaging confirms malfunction',
        description: 'Ventricular enlargement, discontinuity, or obstruction identified',
        next: 'vps-nsgy-consult',
        urgency: 'urgent',
      },
      {
        label: 'Normal imaging but high clinical suspicion',
        description: 'Classic symptoms, caregiver concern, prior malfunction pattern',
        next: 'vps-additional-testing',
      },
      {
        label: 'Normal imaging, low clinical suspicion',
        description: 'Atypical symptoms, reassuring exam, no red flags',
        next: 'vps-observation',
      },
    ],
  },

  {
    id: 'vps-additional-testing',
    type: 'info',
    module: 2,
    title: 'Additional Diagnostic Testing',
    body: '**When imaging is normal but suspicion remains high:**\n\n**Optic Nerve Sheath Diameter (ONSD) Ultrasound:**\n- Non-invasive bedside assessment of ICP\n- ONSD >5mm suggests elevated ICP\n- Correlates with ICP >20 mmHg\n- Quick, repeatable, no radiation\n\n**MRI Brain (if available):**\n- More sensitive for subtle changes\n- Periventricular edema/transependymal CSF flow\n- Better visualization of catheter position\n- Limited by availability and time\n\n**Shunt tap (diagnostic):**\n- Measures opening pressure directly\n- Normal: 8-12 mmHg (lateral decubitus)\n- Elevated pressure suggests obstruction\n- Also provides CSF for infection workup\n- Should generally be performed by neurosurgery\n\n**Radionuclide shuntogram:**\n- Injection of tracer into reservoir\n- Evaluates flow through entire system\n- Can identify site of obstruction\n- Not emergently available at most centers\n\n**If clinical concern persists despite normal testing, consult neurosurgery.**',
    citation: [1, 2, 6],
    next: 'vps-nsgy-consult',
  },

  // =====================================================================
  // MODULE 3: DIFFERENTIATION - MALFUNCTION VS INFECTION
  // =====================================================================

  {
    id: 'vps-infection-workup',
    type: 'info',
    module: 3,
    title: 'Shunt Infection Evaluation',
    body: '[Infection vs Malfunction](#/info/shunt-infection) - differentiate these overlapping presentations.\n\n**Shunt infection basics:**\n- 5-12% annual incidence\n- 90% occur within 6 months of surgery/revision\n- Most common organism: **Staphylococcus epidermidis**\n- Other: S. aureus, gram-negative rods, Propionibacterium\n\n**Clinical features suggesting infection:**\n- Fever (but may be absent)\n- Wound erythema, swelling, drainage\n- Abdominal pain/tenderness (peritonitis from distal catheter)\n- Meningismus\n- Altered mental status with fever\n- Skin breakdown over shunt tract\n\n**Critical distinction:**\nMalfunction can be CAUSED by infection. Shunt infection may present solely as malfunction without classic infection signs.\n\n**When to suspect infection:**\n- Recent surgery (<6 months)\n- Fever + malfunction symptoms\n- CSF leak or wound breakdown\n- Abdominal symptoms with VP shunt\n- Shunt malfunction without clear mechanical cause',
    citation: [1, 7, 8],
    next: 'vps-infection-labs',
  },

  {
    id: 'vps-infection-labs',
    type: 'info',
    module: 3,
    title: 'Laboratory Workup for Infection',
    body: '**Serum laboratories:**\n- CBC with differential (leukocytosis, bandemia)\n- CRP (elevated in infection)\n- Blood cultures x 2 sets\n\n**Distinguishing features (infection vs malfunction only):**\n| Parameter | Infection | Malfunction |\n|-----------|-----------|-------------|\n| Fever | Often present | Usually absent |\n| WBC | Elevated | Normal |\n| CRP | Elevated | Normal |\n| CSF glucose | Decreased | Normal |\n| CSF WBC | Elevated | Normal or mildly elevated |\n\n**CSF analysis (from shunt tap):**\n- Cell count with differential\n- Glucose and protein\n- Gram stain\n- Culture (hold for 10-14 days for slow-growing organisms)\n\n**IMPORTANT:** CSF cultures have 90% negative rate when obtained via reservoir puncture, BUT cultures of removed shunts are positive in 59% of cases.\n\nHalf of infected shunts have negative CSF cultures but positive shunt hardware cultures.\n\n**If infection is suspected:**\n- Consult neurosurgery immediately\n- Shunt removal typically required for definitive treatment\n- Start empiric antibiotics after cultures obtained',
    citation: [7, 8],
    next: 'vps-infection-treatment',
  },

  {
    id: 'vps-infection-treatment',
    type: 'info',
    module: 3,
    title: 'Shunt Infection Treatment',
    body: '**Empiric antibiotic selection:**\nMust cover S. epidermidis, S. aureus, and gram-negatives.\n\n**Empiric regimen:**\n- [Vancomycin](#/drug/vancomycin/shunt infection) 15-20 mg/kg IV (target trough 15-20)\n- PLUS [Cefepime](#/drug/cefepime/shunt infection) 2g IV q8h\n- OR [Meropenem](#/drug/meropenem/shunt infection) 2g IV q8h (if Pseudomonas concern)\n\n**Alternative for beta-lactam allergy:**\n- Vancomycin PLUS Aztreonam 2g IV q8h\n\n**Definitive management requires neurosurgery:**\n1. Shunt externalization or removal\n2. Placement of external ventricular drain (EVD) for temporary CSF drainage\n3. IV antibiotics (typically 10-14 days, longer for certain organisms)\n4. New shunt placement after CSF sterilization\n\n**Do NOT simply treat with antibiotics alone**\n- Biofilm on hardware prevents antibiotic penetration\n- Hardware removal is essential for cure\n- Mortality approaches 60% with untreated infection\n\n**Intrathecal antibiotics:**\n- May be used in select cases\n- Vancomycin 10-20 mg IT daily\n- Gentamicin 4-8 mg IT daily\n- Decision made by neurosurgery/ID',
    citation: [7, 8, 9],
    treatment: {
      firstLine: {
        drug: 'Vancomycin + Cefepime',
        dose: 'Vancomycin 15-20 mg/kg + Cefepime 2g',
        route: 'IV',
        frequency: 'Vancomycin q8-12h (per levels), Cefepime q8h',
        duration: '10-14 days (requires shunt removal)',
        notes: 'Target vancomycin trough 15-20. Hardware removal essential for cure.',
      },
      monitoring: 'Vancomycin trough levels. Daily CSF cell counts if EVD in place. Serial CRP. Repeat cultures until negative.',
    },
    next: 'vps-icp-overview',
  },

  // =====================================================================
  // MODULE 4: ICP MANAGEMENT
  // =====================================================================

  {
    id: 'vps-emergent-icp',
    type: 'info',
    module: 4,
    title: 'Emergent ICP Management',
    body: '[ICP Crisis Protocol](#/info/icp-crisis) - immediate stabilization for impending herniation.\n\n**IMMEDIATE ACTIONS (simultaneously):**\n\n1. **Airway:** Prepare for emergent intubation if GCS <8 or declining\n2. **Breathing:** Maintain SpO2 >94%, avoid hypoxia\n3. **Circulation:** Target MAP >80 mmHg (CPP = MAP - ICP)\n\n**Positioning:**\n- Head of bed elevated 30 degrees\n- Head midline (avoid jugular compression)\n- Loosen cervical collar if present\n\n**Hyperventilation (bridge therapy only):**\n- Target pCO2 30-35 mmHg\n- Short-term only (causes cerebral vasoconstriction)\n- Prolonged hyperventilation causes rebound edema\n\n**Hyperosmolar therapy (choose one):**\n\n**Preferred: [Hypertonic Saline 3%](#/drug/hypertonic-saline-3/icp)**\n- 5 mL/kg IV over 10-15 minutes (pediatric)\n- 250-500 mL IV over 15-20 minutes (adult)\n- Can give via peripheral IV\n\n**Alternative: [Hypertonic Saline 23.4%](#/drug/hypertonic-saline-23/icp)**\n- 30 mL IV over 15-20 minutes\n- Requires central line (preferred) or large bore peripheral\n\n**CALL NEUROSURGERY STAT**',
    citation: [1, 2, 10],
    treatment: {
      firstLine: {
        drug: 'Hypertonic Saline 3%',
        dose: '5 mL/kg (peds) or 250-500 mL (adult)',
        route: 'IV',
        frequency: 'Over 10-15 minutes',
        duration: 'Single dose, may repeat',
        notes: 'Can give peripherally. Preferred over mannitol. Target sodium <=155 mEq/L.',
      },
      monitoring: 'Sodium levels q4h. Serum osmolarity <320 mOsm. Neuro checks q15min.',
    },
    next: 'vps-icp-medications',
  },

  {
    id: 'vps-icp-overview',
    type: 'info',
    module: 4,
    title: 'ICP Management Overview',
    body: '**ICP targets:**\n- Normal ICP: 5-15 mmHg\n- Treatment threshold: ICP >20-22 mmHg sustained >10-15 min\n- CPP goal: 60-70 mmHg (CPP = MAP - ICP)\n\n**Tiered approach to ICP management:**\n\n**Tier 1 (Foundation):**\n- HOB elevation 30 degrees, head midline\n- Adequate sedation, avoid coughing/straining\n- Treat fever, seizures, pain\n- Avoid hypotension (MAP >80 mmHg)\n- Normocapnia (pCO2 35-40 mmHg)\n\n**Tier 2 (Escalation):**\n- Hyperosmolar therapy (hypertonic saline preferred)\n- Mild hyperventilation (pCO2 32-35 mmHg) - bridge only\n- Deeper sedation (propofol for metabolic suppression)\n\n**Tier 3 (Refractory):**\n- Aggressive hyperventilation (pCO2 25-30) - bridge only\n- Barbiturate coma (pentobarbital)\n- Decompressive craniectomy\n- Therapeutic hypothermia (select cases)\n\n**For VP shunt malfunction:**\nDefinitive treatment is shunt revision/repair by neurosurgery. ICP management is a BRIDGE to surgery.',
    citation: [10, 11],
    next: 'vps-icp-medications',
  },

  {
    id: 'vps-icp-medications',
    type: 'info',
    module: 4,
    title: 'ICP Medications',
    body: '**HYPEROSMOLAR THERAPY:**\n\n**Hypertonic Saline (PREFERRED over mannitol):**\n\n[3% Hypertonic Saline](#/drug/hypertonic-saline-3/icp):\n- Dose: 5 mL/kg (peds) or 250-500 mL (adult)\n- Can give via peripheral IV\n- May repeat every 4-6 hours\n- Target sodium: <=155 mEq/L\n\n[23.4% Hypertonic Saline](#/drug/hypertonic-saline-23/icp):\n- Dose: 30 mL over 15-20 minutes\n- Preferably via central line\n- For severe/refractory ICP elevation\n\n**[Mannitol](#/drug/mannitol/icp) (alternative):**\n- 0.25-1 g/kg IV bolus\n- Typically 50g (250 mL of 20%)\n- Causes diuresis - ensure euvolemia\n- Risk of rebound ICP elevation\n- Monitor osmolarity (<320 mOsm)\n- Check osmolal gap (<20 mOsm preferred)\n\n**[Acetazolamide](#/drug/acetazolamide/icp) (adjunct only):**\n- Reduces CSF production by 40-50%\n- 250-500 mg IV/PO BID (adult)\n- 25 mg/kg/day (peds, max 100 mg/kg/day)\n- NOT for acute emergencies\n- May be used as bridge or adjunct\n- Causes metabolic acidosis\n\n**Sedation for intubated patients:**\n- Propofol: reduces cerebral metabolic rate\n- Avoid ketamine (controversial - may increase ICP)',
    citation: [10, 11],
    treatment: {
      firstLine: {
        drug: 'Hypertonic Saline 3%',
        dose: '250-500 mL (adult) or 5 mL/kg (peds)',
        route: 'IV over 10-15 minutes',
        frequency: 'May repeat q4-6h',
        duration: 'Until definitive treatment (surgery)',
        notes: 'Preferred over mannitol. Target sodium <=155 mEq/L.',
      },
      alternative: {
        drug: 'Mannitol 20%',
        dose: '0.25-1 g/kg',
        route: 'IV bolus',
        frequency: 'May repeat q4-6h',
        duration: 'Until definitive treatment (surgery)',
        notes: 'Monitor serum osmolarity <320 mOsm. Ensure adequate volume status.',
      },
      monitoring: 'Sodium q4h. Serum osmolarity. Neurologic checks. ICP monitoring if EVD placed.',
    },
    next: 'vps-shunt-tap-indications',
  },

  // =====================================================================
  // MODULE 5: SHUNT TAP
  // =====================================================================

  {
    id: 'vps-shunt-tap-indications',
    type: 'question',
    module: 5,
    title: 'Shunt Tap - Indications',
    body: '**Shunt tap indications:**\n1. Diagnose infection (obtain CSF)\n2. Measure opening pressure (assess obstruction)\n3. Therapeutically reduce ICP in emergencies\n4. Evaluate shunt function\n\n**Who should perform the tap?**\n- Ideally performed by neurosurgeon\n- EP may perform if patient is critically ill AND neurosurgery unavailable\n- Best performed on shunts with accessible reservoir\n\n**Contraindications:**\n- Infection overlying site\n- Unknown shunt design/reservoir location\n- Coagulopathy (relative)\n\n**Complications:**\n- Infection introduction (<1% but devastating)\n- Choroid plexus occlusion of catheter tip (slit ventricles)\n- Hemorrhage\n- Pneumocephalus',
    citation: [1, 2, 5],
    options: [
      {
        label: 'Critically ill, neurosurgery unavailable',
        description: 'Impending herniation, need emergent ICP reduction',
        next: 'vps-shunt-tap-technique',
        urgency: 'critical',
      },
      {
        label: 'Stable, neurosurgery available',
        description: 'Defer to neurosurgery for tap',
        next: 'vps-nsgy-consult',
      },
      {
        label: 'Concern for infection - need CSF',
        description: 'Fever, meningismus, recent surgery',
        next: 'vps-shunt-tap-technique',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'vps-shunt-tap-technique',
    type: 'info',
    module: 5,
    title: 'Shunt Tap Technique',
    body: '[Shunt Tap Procedure](#/info/shunt-tap-procedure) - step-by-step guide for emergency shunt tapping.\n\n**Equipment:**\n- Sterile gloves, drape, prep solution (chlorhexidine or povidone-iodine)\n- 25-gauge butterfly needle\n- Manometer (from LP kit) for pressure measurement\n- Sterile collection tubes\n\n**Technique:**\n1. Position patient supine, head turned so reservoir faces up\n2. Locate reservoir (smooth dome, usually right retroauricular)\n3. Clip hair if needed (do NOT shave - increases infection risk)\n4. Prep with antiseptic, allow to dry\n5. Insert 25G butterfly at 45-degree angle into center of reservoir\n6. Observe for spontaneous CSF flow\n\n**Measuring opening pressure:**\n- Attach manometer from LP kit\n- Position patient lateral decubitus\n- Hold manometer at ear level\n- Normal: 8-12 mmHg (8-16 cmH2O)\n\n**CSF collection:**\n- Withdraw slowly (<1 mL/min)\n- Maximum: 10 mL/kg total volume\n- Send for: cell count, glucose, protein, gram stain, culture\n\n**Therapeutic drainage:**\n- For acute ICP crisis, drain until pressure normalizes or symptoms improve\n- Watch for aspiration of choroid plexus (slit ventricles)',
    citation: [1, 2, 5],
    next: 'vps-tap-interpretation',
  },

  {
    id: 'vps-tap-interpretation',
    type: 'info',
    module: 5,
    title: 'Shunt Tap Interpretation',
    body: '**Opening pressure interpretation:**\n\n| Pressure (mmHg) | Interpretation |\n|-----------------|----------------|\n| 8-12 | Normal (lateral decubitus, ear level) |\n| >15 | Elevated - suggests obstruction or dysfunction |\n| Very low or no flow | Proximal obstruction or slit ventricles |\n\n**Flow assessment:**\n- Spontaneous brisk flow = proximal catheter likely patent\n- No flow or difficulty aspirating = proximal obstruction\n- Easy aspiration but no spontaneous flow = may be partial obstruction\n\n**Proximal catheter test:**\n- If no CSF obtained, proximal catheter may be obstructed\n- Do NOT force aspiration (risks choroid plexus injury)\n\n**Distal catheter test:**\n- After obtaining CSF, compress reservoir repeatedly\n- If difficult to compress or slow to refill = distal obstruction\n- If compresses easily = distal likely patent\n\n**CSF analysis:**\n- WBC >10 cells/microL = concerning for infection\n- WBC >50 cells/microL = strongly suggests infection (rule out HIV, Lyme)\n- Low glucose (<40 mg/dL or <60% serum) = infection\n- Gram stain positive = infection (low sensitivity)\n- Culture = definitive (may take 10-14 days)',
    citation: [1, 2, 7],
    next: 'vps-nsgy-consult',
  },

  // =====================================================================
  // MODULE 6: NEUROSURGERY CONSULTATION
  // =====================================================================

  {
    id: 'vps-nsgy-consult',
    type: 'info',
    module: 6,
    title: 'Neurosurgery Consultation',
    body: '**All suspected VP shunt malfunction requires neurosurgery consultation.**\n\n**Information to provide:**\n- Patient age, shunt type if known, date of last revision\n- Presenting symptoms and duration\n- Vital signs including any Cushing response\n- GCS, neurologic examination\n- Current imaging findings vs baseline\n- Shunt series findings\n- Any shunt tap results\n- Current interventions (hyperosmolar therapy, intubation)\n\n**Neurosurgical interventions:**\n\n**For malfunction:**\n- Shunt revision (proximal catheter, valve, or distal catheter)\n- External ventricular drain (EVD) placement as temporizing measure\n- Complete shunt replacement\n\n**For infection:**\n- Shunt externalization or removal\n- EVD placement\n- Staged shunt replacement after CSF sterilization\n\n**Indications for emergent surgery:**\n- Clinical signs of herniation\n- Rapidly declining neurologic status\n- Refractory elevated ICP despite medical management\n\n**If no neurosurgeon at facility:**\n- Stabilize patient (airway, ICP management)\n- Emergent transfer to neurosurgical center\n- Consider emergent shunt tap if patient peri-coding',
    citation: [1, 2],
    next: 'vps-evd',
  },

  {
    id: 'vps-evd',
    type: 'info',
    module: 6,
    title: 'External Ventricular Drain (EVD)',
    body: '**EVD as temporizing measure:**\n\nNeurosurgery may place EVD for:\n- Shunt infection requiring hardware removal\n- Temporizing while awaiting definitive shunt revision\n- ICP monitoring and CSF drainage\n- Complex cases requiring staged management\n\n**EVD management basics (typically ICU):**\n\n**Height setting:**\n- Measured from tragus (external auditory meatus)\n- Typical starting height: 10-15 cmH2O\n- Adjustable based on ICP goals and CSF drainage\n\n**Drainage:**\n- Continuous (open to drain at set height)\n- Intermittent (open for ICP spikes, otherwise clamped)\n- Monitor CSF output (normal ~20 mL/hour)\n\n**Monitoring:**\n- Hourly neuro checks and ICP readings\n- Daily CSF sampling for infection monitoring\n- Watch for overdrainage (headache worse sitting up)\n\n**Complications:**\n- Infection (ventriculitis) - 5-10%\n- Hemorrhage at insertion\n- Overdrainage (collapsed ventricles)\n- Catheter occlusion',
    citation: [10, 11],
    next: 'vps-special-populations',
  },

  {
    id: 'vps-special-populations',
    type: 'info',
    module: 6,
    title: 'Special Populations & Considerations',
    body: '**Pediatric considerations:**\n- Open fontanelle: bulging indicates elevated ICP\n- Suture diastasis on imaging\n- Irritability may be primary presentation\n- More rapid decompensation than adults\n- Caregiver history often most reliable\n\n**Slit ventricle syndrome:**\n- Chronic overdrainage leads to small, non-compliant ventricles\n- May present with intermittent symptoms\n- Headaches often positional (worse upright)\n- Imaging shows slit-like ventricles\n- Shunt tap may be difficult (small target)\n- May require valve revision to higher pressure setting\n\n**Programmable shunts:**\n- Valve setting can be changed with external programmer\n- MRI can reset some programmable valves\n- Check setting after any MRI\n- Setting may need adjustment for symptoms\n\n**Other shunt types:**\n- **Ventriculoatrial (VA):** Drains to right atrium\n  - Risk of pulmonary embolism, endocarditis, nephritis\n  - Infection may present as fever, heart murmur\n- **Ventriculopleural (VPl):** Drains to pleural space\n  - Risk of hydrothorax, respiratory distress\n  - CXR may show pleural effusion',
    citation: [1, 2, 3],
    next: 'vps-intubation',
  },

  {
    id: 'vps-intubation',
    type: 'info',
    module: 6,
    title: 'Intubation Considerations',
    body: '**When intubation is needed:**\n- GCS <8 or declining mental status\n- Inability to protect airway\n- Respiratory failure\n- Need for emergent surgical intervention\n\n**RSI considerations for elevated ICP:**\n\n**Goals:**\n- Minimize ICP spikes during laryngoscopy\n- Maintain cerebral perfusion pressure\n- Avoid hypoxia and hypercapnia\n\n**Pre-treatment (optional, controversial):**\n- Lidocaine 1.5 mg/kg IV (blunts ICP response)\n- Fentanyl 1-3 mcg/kg (blunts sympathetic response)\n\n**Induction agents:**\n- **Propofol** 1-2 mg/kg: Reduces ICP, but causes hypotension\n- **Etomidate** 0.3 mg/kg: Hemodynamically stable, minimal ICP effect\n- **Ketamine** 1-2 mg/kg: Previously avoided but now considered safe for ICP\n\n**Paralytic:**\n- Rocuronium 1.2 mg/kg (preferred for rapid onset)\n- Succinylcholine 1.5 mg/kg (OK unless concern for hyperkalemia)\n\n**Post-intubation:**\n- Verify placement\n- Target normocapnia (pCO2 35-40) or mild hypocapnia (30-35)\n- Continue sedation to prevent coughing/straining\n- Elevate HOB 30 degrees',
    citation: [1, 10, 11],
    next: 'vps-disposition',
  },

  // =====================================================================
  // MODULE 7: DISPOSITION
  // =====================================================================

  {
    id: 'vps-disposition',
    type: 'question',
    module: 7,
    title: 'Disposition',
    body: '**Disposition depends on clinical status, imaging findings, and neurosurgery recommendations.**\n\n**ICU admission indications:**\n- Signs of herniation or elevated ICP\n- Hemodynamic instability\n- Post-operative monitoring\n- EVD in place\n- Confirmed infection requiring IV antibiotics\n- Declining neurologic status\n\n**Floor admission:**\n- Confirmed malfunction awaiting OR\n- Stable with mild symptoms, normal ICP\n- Observation for possible intermittent malfunction\n\n**Discharge considerations:**\n- Rare and only with neurosurgery agreement\n- Requires reliable follow-up within 24-48 hours\n- Clear return precautions\n- Low threshold for return with any worsening',
    citation: [1, 2],
    options: [
      {
        label: 'ICU admission',
        description: 'Unstable, post-op, EVD, infection, declining status',
        next: 'vps-icu-management',
      },
      {
        label: 'Floor admission for observation',
        description: 'Stable, awaiting surgery, or observation for intermittent symptoms',
        next: 'vps-observation',
      },
      {
        label: 'Transfer to neurosurgical center',
        description: 'No neurosurgery at current facility',
        next: 'vps-transfer',
      },
    ],
  },

  {
    id: 'vps-observation',
    type: 'info',
    module: 7,
    title: 'Observation Protocol',
    body: '**Observation for suspected intermittent malfunction or normal imaging with clinical concern:**\n\n**Monitoring:**\n- Neurologic checks every 2-4 hours\n- Serial vital signs (watch for Cushing response)\n- Repeat imaging if symptoms recur or worsen\n- Pain assessment and treatment\n\n**Nursing alerts:**\n- Any change in mental status\n- New headache or worsening of existing headache\n- New vomiting\n- Vital sign changes (bradycardia, hypertension)\n- Seizures\n\n**Duration:**\n- Minimum 24 hours observation if discharged\n- Longer if intermittent symptoms or borderline findings\n\n**Before discharge:**\n- Clear follow-up with neurosurgery (24-72 hours)\n- Written return precautions\n- Caregiver education on warning signs\n- Low threshold for return',
    citation: [1, 2],
    next: 'vps-summary',
  },

  {
    id: 'vps-icu-management',
    type: 'info',
    module: 7,
    title: 'ICU Management',
    body: '**ICU management of VP shunt malfunction:**\n\n**Monitoring:**\n- Continuous telemetry\n- Arterial line if hemodynamically unstable\n- Frequent neuro checks (q1-2h or per protocol)\n- ICP monitoring if EVD in place\n\n**ICP management:**\n- HOB elevation 30 degrees\n- Normothermia (treat fever aggressively)\n- Seizure prophylaxis if indicated\n- Continued hyperosmolar therapy as needed\n- EVD drainage per neurosurgery protocol\n\n**Ventilator management (if intubated):**\n- Normocapnia or mild hypocapnia\n- Adequate sedation to prevent coughing\n- Avoid high PEEP if possible (may increase ICP)\n\n**Supportive care:**\n- DVT prophylaxis (mechanical if bleeding concern)\n- Stress ulcer prophylaxis\n- Glycemic control\n- Nutrition (enteral preferred)\n\n**Preparation for surgery:**\n- NPO status\n- Type and screen\n- Correct coagulopathy if present',
    citation: [10, 11],
    next: 'vps-summary',
  },

  {
    id: 'vps-transfer',
    type: 'info',
    module: 7,
    title: 'Transfer to Neurosurgical Center',
    body: '**Preparation for transfer:**\n\n**Before transfer:**\n- Secure airway if GCS <8 or declining\n- Establish IV access (two large-bore)\n- Begin hyperosmolar therapy if elevated ICP\n- Stabilize hemodynamics\n\n**Documentation to send:**\n- Complete H&P with neuro exam\n- All imaging (CT, shunt series)\n- Prior imaging for comparison if available\n- Shunt tap results if performed\n- Labs (CBC, BMP, coags)\n- List of interventions and response\n\n**Communication:**\n- Direct physician-to-physician handoff\n- Confirm accepting neurosurgeon\n- Provide ETA and current status\n- Update during transport if changes\n\n**During transport:**\n- Continuous monitoring\n- HOB elevated if possible\n- Airway equipment readily available\n- Additional hyperosmolar therapy available\n- Transport with RN/paramedic capable of RSI',
    citation: [1, 2],
    next: 'vps-summary',
  },

  {
    id: 'vps-summary',
    type: 'result',
    module: 7,
    title: 'VP Shunt Malfunction Summary',
    body: '**Key Takeaways:**\n\n**1. High index of suspicion:**\n- 98% shunt failure rate over 10 years\n- Symptoms may be subtle or intermittent\n- Caregiver concern for "acting like previous malfunction" is valuable\n\n**2. Normal imaging does NOT exclude malfunction:**\n- Chronically shunted ventricles may not dilate\n- Clinical assessment may be more reliable than imaging\n- Consult neurosurgery if suspicion remains high\n\n**3. Differentiate malfunction from infection:**\n- Infection may present as malfunction alone\n- Fever, recent surgery, elevated inflammatory markers suggest infection\n- Hardware removal required for infected shunts\n\n**4. ICP management is a bridge:**\n- Hypertonic saline preferred over mannitol\n- Definitive treatment requires neurosurgery\n- Early consultation is essential\n\n**5. Shunt tap:**\n- Ideally performed by neurosurgery\n- EP may perform if patient peri-coding and neurosurgery unavailable\n- Provides pressure measurement and CSF for analysis\n\n**6. All suspected malfunction requires neurosurgery consultation.**',
    recommendation: 'Maintain high suspicion for shunt malfunction in any patient with VP shunt presenting with headache, vomiting, or altered mental status. Normal imaging does not exclude obstruction. Consult neurosurgery early. Use hypertonic saline for ICP management. Differentiate malfunction from infection. All patients require admission unless cleared by neurosurgery.',
    confidence: 'recommended',
    citation: [1, 2, 3, 4],
  },

];

export const VP_SHUNT_NODE_COUNT = VP_SHUNT_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const VP_SHUNT_MODULE_LABELS = [
  'Recognition',
  'Imaging',
  'Infection vs Malfunction',
  'ICP Management',
  'Shunt Tap',
  'Neurosurgery',
  'Disposition',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const VP_SHUNT_CITATIONS: Citation[] = [
  { num: 1, text: 'Tunkel R, et al. Ventriculoperitoneal Shunts in the Emergency Department: A Review. Cureus. 2020;12(2):e7054.' },
  { num: 2, text: 'Desai VR, et al. Management of Ventriculoperitoneal Shunts in the Emergency Department. NY ACEP. 2022.' },
  { num: 3, text: 'Browd SR, et al. Failure Rate of Pediatric Ventriculoperitoneal Shunts. Pediatrics. 2006;118(4):1530-1534.' },
  { num: 4, text: 'ACEP Now Case Report. Failure to Diagnose Shunt Malfunction Results in Death. ACEP Now. 2024.' },
  { num: 5, text: 'Sivaganesan A, et al. VP Shunt Tap: Overview, Indications, Contraindications. Medscape. 2023.' },
  { num: 6, text: 'Dubourg J, et al. Ultrasonography of Optic Nerve Sheath Diameter for ICP Monitoring. Intensive Care Med. 2011;37(7):1059-68.' },
  { num: 7, text: 'Prusseit J, et al. Distinct Clinical Phenotypes of Infection and Mechanical Dysfunction in VP Shunt Complications. Cureus. 2024.' },
  { num: 8, text: 'Tunkel AR, et al. Practice Guidelines for Bacterial Meningitis. Clin Infect Dis. 2004;39(9):1267-84.' },
  { num: 9, text: 'van de Beek D, et al. Ventricular Shunt Infections: Immunopathogenesis and Clinical Management. Brain Pathol. 2014;24(6):584-96.' },
  { num: 10, text: 'Farrokh S, et al. EMCrit IBCC: Intracranial Pressure Management. Internet Book of Critical Care. 2024.' },
  { num: 11, text: 'Brain Trauma Foundation. Guidelines for Management of Severe Traumatic Brain Injury. 4th Ed. 2016.' },
];
