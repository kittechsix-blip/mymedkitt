// MedKitt — Emergency Burr Hole Craniostomy
// Life-saving decompression for extra-axial hematoma when neurosurgery unavailable
// Sources: Roberts & Hedges 7th Ed, WikEM, LITFL, EMCrit, Joint Trauma System CPG
// 6 modules: Indications → Anatomy → Equipment → Technique → Complications → Post-Procedure
// ~38 nodes

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const BURR_HOLE_CRITICAL_ACTIONS = [
  { text: 'Use CLUTCH drill bit — auto-disengages at inner table, prevents brain injury', nodeId: 'bh-drill-technique' },
  { text: 'Stay ≥3 cm lateral to midline — avoids sagittal sinus', nodeId: 'bh-anatomy-landmarks' },
  { text: 'Ipsilateral to dilated pupil — correct side in >85% of cases', nodeId: 'bh-side-selection' },
  { text: 'DO NOT tamponade bleeding — loose dressing only (tight packing increases ICP)', nodeId: 'bh-wound-closure' },
  { text: 'This is a BRIDGE, not a cure — patient still requires definitive neurosurgical craniotomy', nodeId: 'bh-post-procedure' },
  { text: 'Time-critical: Outcomes significantly worsen if drainage >70-90 min from herniation signs', nodeId: 'bh-indications' },
  { text: 'If no blood found — DO NOT explore further, close and transport immediately', nodeId: 'bh-no-blood' },
] as const;

export const BURR_HOLE_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INDICATIONS & DECISION TO PROCEED
  // =====================================================================

  {
    id: 'bh-start',
    type: 'question',
    module: 1,
    title: 'Emergency Burr Hole — Indications',
    body: '**Emergency Burr Hole Craniostomy**\n\nRarely performed but potentially life-saving procedure for evacuating expanding extra-axial hematomas (epidural or subdural) when neurosurgical intervention is unavailable.\n\n⚠️ **This is a LAST RESORT procedure**\n\n**The Question:**\nWill the patient herniate and die before reaching a neurosurgeon?\n\n**Key Time Points:**\n• Outcomes significantly worsen if drainage >70-90 min from first herniation signs\n• If neurosurgery available within 2 hours → aggressive medical management + transport\n\n**Roberts & Hedges:** "The emergency physician should consider burr hole trephination only when faced with a patient who will clearly die during transport to a neurosurgical facility." [1]',
    options: [
      { label: 'Assess indications', description: 'CT-confirmed hematoma with herniation signs', next: 'bh-indications' },
      { label: 'Review anatomy first', description: 'Landmarks, safe entry points', next: 'bh-anatomy-overview' },
      { label: 'Check equipment', description: 'Verify drill and supplies available', next: 'bh-equipment-check' },
    ],
    citation: [1],
    calculatorLinks: [
      { id: 'bh-indication-check', label: 'Indication Check' },
    ],
  },

  {
    id: 'bh-indications',
    type: 'question',
    module: 1,
    title: 'Indications for Emergency Burr Hole',
    body: '**Absolute Indications:**\n\n✅ **CT-confirmed** epidural or subdural hematoma\n✅ **AND** Midline shift on imaging\n✅ **AND** GCS < 8 or rapidly deteriorating\n✅ **AND** Unilateral fixed/dilated pupil (anisocoria)\n✅ **AND** Neurosurgery unavailable within 2 hours\n\n**Classic Herniation Triad:**\n1. Ipsilateral pupil dilation (CN III compression)\n2. Contralateral hemiparesis (cerebral peduncle)\n3. Cushing\'s triad: HTN + bradycardia + irregular respirations\n\n**"Talk and Deteriorate" Pattern:**\n• Lucid interval followed by rapid decline\n• Classic for EDH (but only occurs in 14-21%)\n\n**WITHOUT CT (Austere Settings):**\n• Severe head trauma + unilateral fixed/dilated pupil\n• Obvious skull fracture, especially temporal\n• Clinical suspicion may suffice when CT unavailable [1][2]',
    options: [
      { label: 'Indications met — proceed', description: 'CT+ hematoma, herniation, no neurosurg available', next: 'bh-contraindications', urgency: 'critical' },
      { label: 'GCS > 8 or stable', description: 'Medical management + transport', next: 'bh-medical-management' },
      { label: 'Neurosurgery available', description: 'Transfer for definitive care', next: 'bh-transfer' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'bh-indication-check', label: 'Indication Check' },
    ],
  },

  {
    id: 'bh-contraindications',
    type: 'question',
    module: 1,
    title: 'Contraindications',
    body: '**DO NOT Perform Burr Hole If:**\n\n❌ **GCS 3 with bilateral fixed/dilated pupils**\n• Non-survivable injury\n• Procedure will not change outcome\n\n❌ **Neurosurgery available within reasonable timeframe**\n• Transfer is almost always preferable\n• Even 2-3 hour transport may be better than non-neurosurgeon drilling\n\n❌ **Clinical improvement with medical management**\n• Mannitol, hypertonic saline, hyperventilation working\n• Patient stabilizing — transport\n\n❌ **Intraparenchymal hemorrhage without extra-axial component**\n• Burr hole will not help\n• Requires craniotomy with direct hemostasis\n\n❌ **Posterior fossa lesion**\n• Requires suboccipital approach\n• High risk of brainstem/cerebellar injury\n\nAre contraindications absent?',
    options: [
      { label: 'No contraindications — proceed', description: 'Patient will die without intervention', next: 'bh-side-selection', urgency: 'critical' },
      { label: 'Contraindication present', description: 'Medical management + transfer', next: 'bh-medical-management' },
    ],
    citation: [1, 2],
  },

  {
    id: 'bh-medical-management',
    type: 'info',
    module: 1,
    title: 'Medical ICP Management',
    body: '**Medical Management While Preparing/Transporting:**\n\n**Osmotherapy (choose one):**\n• [Mannitol](#/drug/mannitol/icp) **0.5-1 g/kg IV** over 15-20 min\n  - 20% solution = 1.25-2.5 mL/kg\n  - Onset 15-30 min, peak 60 min\n• [Hypertonic Saline](#/drug/hypertonic-saline/icp) **23.4% 30 mL** or **3% 250 mL** IV\n  - Faster onset, may be preferred in hypotensive patients\n\n**Positioning:**\n• Head of bed 30 degrees\n• Head midline (avoid neck compression)\n• Loosen C-collar temporarily if needed\n\n**Ventilation:**\n• Target EtCO₂ 35-40 mmHg (normocapnia)\n• Brief hyperventilation (EtCO₂ 30-35) ONLY for:\n  - Acute pupil dilation\n  - Impending herniation\n  - Maximum 5-10 minutes (cerebral ischemia risk)\n\n**Avoid:**\n• Hypoxia (SpO₂ >94%)\n• Hypotension (MAP >80)\n• Hyperthermia\n• Hyperglycemia [3][4]',
    citation: [3, 4],
    treatment: {
      firstLine: {
        drug: 'Mannitol 20%',
        dose: '0.5-1 g/kg (1.25-2.5 mL/kg)',
        route: 'IV',
        frequency: 'Once',
        duration: 'Over 15-20 min',
        notes: 'Onset 15-30 min. Can repeat q4-6h. Monitor serum osm <320.',
        confidence: 'standard',
      },
      monitoring: 'Serum osmolality, sodium, urine output. Caution in hypotension.',
    },
    next: 'bh-transfer',
  },

  {
    id: 'bh-transfer',
    type: 'info',
    module: 1,
    title: 'Transfer to Neurosurgery',
    body: '**Transfer is Almost Always Preferred**\n\nEven if neurosurgery is 2-3 hours away, transfer with aggressive medical management is often better than non-neurosurgeon drilling.\n\n**During Transport:**\n• Continuous osmotherapy\n• Close neurologic monitoring (GCS, pupils q15 min)\n• Maintain normocapnia (or brief hyperventilation for acute changes)\n• Pre-hospital notification to receiving facility\n\n**Consider Telemedicine:**\n• Video consult with neurosurgeon during transport\n• If drilling becomes necessary, remote guidance available\n\n**Indications to Turn Back:**\n• New bilateral fixed pupils\n• Loss of all brainstem reflexes\n• Cardiac arrest without ROSC\n\n**Documentation:**\n• Time of injury\n• GCS progression\n• Pupil changes with times\n• Medications given\n• CT findings [1]',
    citation: [1],
    next: undefined,
  },

  // =====================================================================
  // MODULE 2: ANATOMY & LANDMARKS
  // =====================================================================

  {
    id: 'bh-anatomy-overview',
    type: 'info',
    module: 2,
    title: 'Anatomy Overview',
    body: '**Critical Anatomy for Burr Hole Placement**\n\n![Burr Hole Landmarks](https://s3.ap-southeast-2.amazonaws.com/wikem.cf.bucket/images/thumb/Burr_hole.JPG/300px-Burr_hole.JPG)\n*Image: WikEM - Burr hole landmarks*\n\n**Key Craniometric Points:**\n\n| Location | Landmark | Target |\n|----------|----------|--------|\n| **Temporal** | 2 FB above & anterior to tragus | Most common EDH (75%) |\n| **Frontal** | 10 cm above eye, mid-pupillary | Frontal hematomas |\n| **Parietal** | 4 FB posterior & superior to EAC | Convexity lesions |\n| **Kocher\'s** | 11 cm from glabella, 3 cm lateral | Ventriculostomy |\n\n*FB = finger-breadths; EAC = external auditory canal*\n\n**Why These Points?**\n• Avoid major vascular structures\n• Correspond to thinner skull areas\n• Provide access to common hematoma locations [1][2][5]',
    citation: [1, 2, 5],
    next: 'bh-anatomy-landmarks',
  },

  {
    id: 'bh-anatomy-landmarks',
    type: 'info',
    module: 2,
    title: 'Anatomical Landmarks — Detailed',
    body: '**Temporal Point (Most Common for EDH):**\n\n📍 **Location:** 2 finger-breadths (3-4 cm) ABOVE and ANTERIOR to the tragus\n• Above the zygomatic arch\n• Corresponds to pterion region\n• Overlies middle meningeal artery territory\n\n**Why Temporal?**\n• 75% of adult EDH occur in temporal region\n• Middle meningeal artery is the most common source\n• Relatively thin bone (easier drilling)\n\n---\n\n**Frontal Point:**\n\n📍 **Location:** 10 cm above the supraorbital ridge in the mid-pupillary line\n• Approximately 3 cm lateral to midline\n• Access to frontal hematomas\n\n---\n\n**Parietal Point:**\n\n📍 **Location:** 4 finger-breadths (6-8 cm) POSTERIOR and SUPERIOR to external auditory canal\n• Over the parietal eminence\n• Access to convexity lesions\n\n---\n\n**⚠️ DANGER ZONES:**\n\n🚫 **Sagittal Sinus:** Stay ≥3 cm lateral to midline\n🚫 **Asterion:** Over transverse/sigmoid sinus in 61-66%\n🚫 **Pterion:** Thin bone, but MMA runs deep — be careful [1][5]',
    citation: [1, 5],
    next: 'bh-side-selection',
  },

  {
    id: 'bh-side-selection',
    type: 'question',
    module: 2,
    title: 'Side Selection',
    body: '**Which Side to Drill?**\n\n**Rule #1: CT-Guided is ALWAYS Preferred**\n• Count slices from vertex to hematoma center\n• Drill directly over lesion\n\n**Without CT or As Clinical Backup:**\n\n**1. Ipsilateral to Dilated Pupil**\n• Correct side in >85% of extra-axial lesions\n• CN III compression occurs ipsilateral to hematoma\n\n**2. If Both Pupils Dilated**\n• Side of FIRST dilation (if known from serial exams)\n• Side of obvious external trauma\n\n**3. If Pupils Equal**\n• Side of external trauma or skull fracture\n• Side of scalp hematoma/laceration\n\n**4. Contralateral Hemiparesis**\n• Hematoma usually OPPOSITE the weak side\n• Cerebral peduncle compression causes contralateral weakness\n\n⚠️ **False Localizing Signs Occur in 15%**\n• Kernohan\'s notch phenomenon\n• CT is essential when available [1][2]',
    options: [
      { label: 'Side determined — proceed to equipment', description: 'Ready to verify supplies', next: 'bh-equipment-check' },
      { label: 'Review anatomy diagrams', description: 'Need more anatomical guidance', next: 'bh-anatomy-landmarks' },
    ],
    citation: [1, 2],
    calculatorLinks: [
      { id: 'bh-side-selector', label: 'Side Selection' },
    ],
  },

  // =====================================================================
  // MODULE 3: EQUIPMENT
  // =====================================================================

  {
    id: 'bh-equipment-check',
    type: 'question',
    module: 3,
    title: 'Equipment Check',
    body: '**Essential Equipment:**\n\n**✓ Drill (ONE of the following):**\n• **Hudson-Brace** manual drill (hand-cranked)\n• Pneumatic/electric craniotome\n• In extremis: EZ-IO with 25mm needle (case reports)\n\n**✓ Drill Bits:**\n• **14mm perforator with CLUTCH mechanism** (critical)\n• Matchstick/cutting ball bit (backup)\n\n**✓ Instruments:**\n• Scalpel (#10, #15 blade)\n• Self-retaining retractor (Weitlaner)\n• Penfield dissectors (#1-4)\n• Sharp and blunt hooks\n• Leksell rongeur\n\n**✓ Hemostasis:**\n• Bipolar electrocautery\n• Bone wax\n• Gelfoam/Surgicel\n• Suction\n\n**✓ Medications:**\n• Local anesthetic with epinephrine\n• Cefazolin 2g or ceftriaxone 2g IV\n\nDo you have the essential equipment?',
    options: [
      { label: 'Equipment available — proceed', description: 'Have drill with clutch bit', next: 'bh-clutch-importance', urgency: 'critical' },
      { label: 'No clutch drill available', description: 'Manual technique required', next: 'bh-no-clutch-technique' },
      { label: 'Minimal equipment only', description: 'Austere/field conditions', next: 'bh-austere-equipment' },
    ],
    citation: [1, 6],
  },

  {
    id: 'bh-clutch-importance',
    type: 'info',
    module: 3,
    title: 'The Clutch Mechanism — Critical Safety',
    body: '**The Clutch is the Most Important Safety Feature**\n\n**How It Works:**\n• Drill bit automatically DISENGAGES when it penetrates the inner table\n• Detects the sudden drop in resistance\n• Prevents "plunging" into brain tissue\n\n**This is What Allows Non-Neurosurgeons to Perform This Procedure**\n\n**Proper Clutch Drill Technique:**\n1. Position drill perpendicular to skull\n2. Apply firm, STEADY downward pressure\n3. Drill CONTINUOUSLY until spindle stops\n4. ⚠️ **DO NOT stop and restart** — difficult to re-engage clutch\n5. Irrigate with saline during drilling\n\n**Common Clutch Bits:**\n• Codman 26-1221 (14mm perforator)\n• Midas Rex perforator\n• Aesculap perforator\n\n**If Clutch Bit Unavailable:**\n• See [No Clutch Technique](#bh-no-clutch-technique)\n• Much higher risk — requires two-bit technique [1][6]',
    citation: [1, 6],
    next: 'bh-pre-procedure',
  },

  {
    id: 'bh-no-clutch-technique',
    type: 'info',
    module: 3,
    title: 'No Clutch Drill — Two-Bit Technique',
    body: '**⚠️ Higher Risk — Only If Clutch Unavailable**\n\n**Two-Bit Technique:**\n\n**Step 1: Perforator Bit (Outer Table Only)**\n• Use sharp perforator bit\n• Drill through OUTER table only\n• Stop when you feel decreased resistance\n• This is the diploe (spongy middle layer)\n\n**Step 2: Switch to Blunt Burr**\n• Remove perforator bit\n• Insert blunt/ball burr\n• Gently enlarge hole through inner table\n• Use irrigation to visualize\n• Stop immediately when dura visible\n\n**Critical Points:**\n• NEVER continue with perforator through inner table\n• Blunt burr reduces (but doesn\'t eliminate) plunge risk\n• Consider hand-cranked drill for better tactile feedback\n• Have assistant stabilize head\n\n**Alternative — EZ-IO (Case Reports Only):**\n• 25mm (blue) needle\n• Technique described by Marc Grossman on EMCrit\n• Last resort when no drill available [6][7]',
    citation: [6, 7],
    next: 'bh-pre-procedure',
  },

  {
    id: 'bh-austere-equipment',
    type: 'info',
    module: 3,
    title: 'Austere/Field Equipment',
    body: '**Minimal Equipment for Field Conditions:**\n\n**Absolute Minimum:**\n• Cutting instrument (scalpel, knife)\n• Drill of ANY kind with bit\n• Something to retract scalp\n• Irrigation (saline, clean water)\n• Sterile (or cleanest available) dressing\n\n**Improvised Equipment:**\n• **Drill:** Cordless power drill with clean bit\n• **Retractor:** Bent spoon handles, improvised hooks\n• **Hemostasis:** Direct pressure, cautery if available\n\n**EZ-IO Technique (Marc Grossman, EMCrit):**\n• 25mm (blue) EZ-IO needle\n• Drill into skull at safe landmark\n• Remove needle, irrigate\n• Small hole, may need multiple\n• Case reports of successful use\n\n**Risk Assessment:**\n• Without clutch drill, cortical injury risk is HIGH\n• Only proceed if patient will certainly die otherwise\n• Document circumstances carefully [6][7]',
    citation: [6, 7],
    next: 'bh-pre-procedure',
  },

  // =====================================================================
  // MODULE 4: PROCEDURE TECHNIQUE
  // =====================================================================

  {
    id: 'bh-pre-procedure',
    type: 'info',
    module: 4,
    title: 'Pre-Procedure Preparation',
    body: '**Preparation Checklist:**\n\n**□ Airway & Ventilation:**\n• Intubate, sedate, paralyze\n• C-spine immobilization if trauma\n• Target EtCO₂ 35-40 mmHg\n• SpO₂ >94%\n\n**□ Osmotherapy (Start Now):**\n• Mannitol 0.5-1 g/kg IV OR\n• Hypertonic saline 23.4% 30mL\n\n**□ Positioning:**\n• Supine, head elevated above chest\n• Rotate head 30-40° off midline (operative side UP)\n• Generous shoulder bump\n• **Mark midline and incision site BEFORE draping**\n\n**□ Site Preparation:**\n• Shave 5 cm strip at incision site\n• Prep with chlorhexidine or betadine\n• Infiltrate local with epinephrine (if not under GA)\n\n**□ Antibiotics:**\n• Cefazolin 2g IV or Ceftriaxone 2g IV\n\n**□ Telemedicine:**\n• Connect with neurosurgeon if available\n• Video guidance during procedure [1][6]',
    citation: [1, 6],
    next: 'bh-incision',
  },

  {
    id: 'bh-incision',
    type: 'info',
    module: 4,
    title: 'Step 1: Incision',
    body: '**Scalp Incision:**\n\n**Incision Type:**\n• **3-4 cm VERTICAL incision** (linear)\n• Directly down to bone\n• Vertical orientation minimizes vascular injury\n\n**For Temporal Approach:**\n• 2 FB above and anterior to tragus\n• Stay above zygomatic arch\n• Avoid superficial temporal artery (runs anterior)\n\n**Technique:**\n1. Incise skin and subcutaneous tissue\n2. Continue through galea aponeurotica\n3. Incise periosteum (pericranium)\n4. Expose bone directly\n\n**Hemostasis:**\n• Scalp bleeds profusely\n• Apply pressure to wound edges\n• Raney clips if available\n• Electrocautery to individual bleeders\n• Continue — don\'t delay for perfect hemostasis\n\n**Pearl:**\n• Scalp bleeding is impressive but not life-threatening\n• Focus on the brain, not the scalp [1][6]',
    citation: [1, 6],
    next: 'bh-exposure',
  },

  {
    id: 'bh-exposure',
    type: 'info',
    module: 4,
    title: 'Step 2: Expose Skull',
    body: '**Skull Exposure:**\n\n**Clear the Periosteum:**\n• Use scalpel handle or gauze to push periosteum from bone\n• Create 2-3 cm clear area around planned drill site\n• Periosteum is adherent — requires firm scraping\n\n**Insert Retractor:**\n• Place self-retaining retractor (Weitlaner)\n• Retract scalp edges\n• Should see clean, white bone\n\n**Verify Landmark:**\n• Confirm position relative to anatomical landmarks\n• If CT available, correlate with imaging\n• Adjust if needed BEFORE drilling\n\n**Skull Appearance:**\n• Normal: White, smooth outer table\n• Fractured: May see crack, step-off, or blood oozing\n• If fracture present, drill ADJACENT to (not through) fracture\n\n**Prepare for Drilling:**\n• Have suction ready\n• Saline irrigation available\n• Assistant stabilizes patient\'s head [1][6]',
    citation: [1, 6],
    next: 'bh-drill-technique',
  },

  {
    id: 'bh-drill-technique',
    type: 'info',
    module: 4,
    title: 'Step 3: Drilling',
    body: '**Burr Hole Drilling Technique:**\n\n⚠️ **CRITICAL: Use Clutch Bit If Available**\n\n**Clutch Drill Technique:**\n\n1. **Position:** Drill PERPENDICULAR to skull surface\n\n2. **Pressure:** Apply firm, STEADY downward pressure\n   • Assistant stabilizes head from opposite side\n\n3. **Irrigation:** Apply saline during drilling\n   • Prevents thermal injury\n   • Clears bone dust\n   • Improves visualization\n\n4. **Drill Continuously:** Do NOT stop and restart\n   • Clutch disengages when inner table penetrated\n   • Stopping makes re-engagement difficult\n\n5. **Feel for Clutch Engagement:**\n   • Initial resistance (outer table)\n   • Brief easier drilling (diploe)\n   • Clutch STOPS spindle at inner table\n\n6. **Remove Drill:** Lift straight up\n   • Do NOT angle — can tear dura\n\n**Completed Hole:**\n• ~14mm diameter\n• Should see dura (bluish-gray membrane)\n• May see blood if hematoma present [1][6]',
    citation: [1, 6],
    next: 'bh-evacuate-edh',
  },

  {
    id: 'bh-evacuate-edh',
    type: 'question',
    module: 4,
    title: 'Step 4: Evacuate Hematoma',
    body: '**What Do You See?**\n\nAfter completing the burr hole, assess what is visible:\n\n**A. Dark Blood Under Pressure (Epidural Hematoma)**\n• Blood between skull and dura\n• Often clotted\n• May drain spontaneously when hole completed\n\n**B. Dura with Bluish Discoloration (Subdural Hematoma)**\n• Blood UNDER the dura\n• Requires opening dura to drain\n• Dura appears bluish/dark instead of normal gray\n\n**C. Normal Dura (Gray, Pulsating)**\n• No hematoma at this location\n• May need additional burr hole\n• Or hematoma is elsewhere\n\n**D. Brain Tissue Visible**\n• Dura was torn during drilling\n• Stop — do NOT explore further\n• Close and transport\n\nWhat do you see?',
    options: [
      { label: 'Epidural hematoma (blood outside dura)', description: 'Dark blood under pressure', next: 'bh-edh-drainage', urgency: 'critical' },
      { label: 'Subdural hematoma (blood under dura)', description: 'Bluish dura, need to open', next: 'bh-sdh-drainage', urgency: 'critical' },
      { label: 'No blood found', description: 'Normal dura or wrong location', next: 'bh-no-blood' },
      { label: 'Brain tissue visible', description: 'Dural tear — close immediately', next: 'bh-dural-tear' },
    ],
    citation: [1, 6],
  },

  {
    id: 'bh-edh-drainage',
    type: 'info',
    module: 4,
    title: 'Epidural Hematoma Drainage',
    body: '**Evacuating Epidural Hematoma:**\n\n**What to Expect:**\n• Dark, clotted blood between skull and dura\n• May drain spontaneously under pressure\n• Often partially clotted — won\'t all drain through hole\n\n**Technique:**\n\n1. **Allow Spontaneous Drainage:**\n   • Blood under pressure will drain on its own\n   • Do NOT suction aggressively\n\n2. **Gentle Irrigation:**\n   • Use saline to flush clot\n   • Helps liquefy and evacuate\n\n3. **Gentle Suction:**\n   • Use low suction\n   • ⚠️ **NEVER suction brain tissue**\n   • If dura bulges into hole, stop suctioning\n\n4. **Blunt Hook Evacuation:**\n   • Gently break up clot\n   • Remove accessible clot\n   • Do NOT explore beyond visible area\n\n**Incomplete Evacuation:**\n• Some clot will remain — this is expected\n• Goal is decompression, not complete removal\n• Patient still needs definitive craniotomy [1][6]',
    citation: [1, 6],
    next: 'bh-hemostasis',
  },

  {
    id: 'bh-sdh-drainage',
    type: 'info',
    module: 4,
    title: 'Subdural Hematoma Drainage',
    body: '**Evacuating Subdural Hematoma:**\n\n**Subdural = Blood UNDER Dura**\n\nMust open dura to drain.\n\n**Technique:**\n\n1. **Tent the Dura:**\n   • Use sharp hook to lift dura\n   • Elevate a small tent of dura membrane\n   • Do NOT plunge through\n\n2. **Incise Dura:**\n   • Use #15 scalpel blade\n   • Make small CRUCIATE incision (+)\n   • Careful — brain is immediately deep to dura\n\n3. **Drain Hematoma:**\n   • Subdural blood is often more liquid than EDH\n   • Will drain when dura opened\n   • Gentle irrigation to assist\n\n4. **DO NOT:**\n   • ❌ Make large dural incision\n   • ❌ Insert instruments into subdural space\n   • ❌ Suction brain tissue\n   • ❌ Explore blindly\n\n**Acute SDH Often Clotted:**\n• Chronic SDH = liquid, drains easily\n• Acute SDH = clotted, may not drain well\n• This is a limitation of burr hole for acute SDH [1][6]',
    citation: [1, 6],
    next: 'bh-hemostasis',
  },

  {
    id: 'bh-no-blood',
    type: 'question',
    module: 4,
    title: 'No Blood Found',
    body: '**No Hematoma at This Location**\n\n**Possible Explanations:**\n• Wrong location (hematoma elsewhere)\n• Hematoma intraparenchymal (not extra-axial)\n• CT misinterpreted\n• False localizing signs\n\n**Options:**\n\n**1. Close and Transport (Recommended)**\n• Do NOT explore with multiple random holes\n• Patient needs CT and neurosurgery\n• Transport immediately\n\n**2. Single Additional Burr Hole (Consider If):**\n• Strong clinical suspicion\n• CT clearly showed hematoma\n• Different location makes anatomical sense\n• Maximum 2 burr holes total\n\n⚠️ **Avoid "Hunting":**\n• Multiple holes = more complications\n• Each hole risks cortical injury\n• Diminishing returns after 2 holes [1][6]',
    options: [
      { label: 'Close and transport', description: 'Recommended — avoid multiple holes', next: 'bh-wound-closure' },
      { label: 'Single additional burr hole', description: 'Strong suspicion, different location', next: 'bh-second-hole' },
    ],
    citation: [1, 6],
  },

  {
    id: 'bh-second-hole',
    type: 'info',
    module: 4,
    title: 'Second Burr Hole',
    body: '**Placing a Second Burr Hole:**\n\n**When to Consider:**\n• CT showed hematoma but first hole was misplaced\n• Clinical suspicion very high\n• Different anatomical location makes sense\n\n**Maximum: 2 Burr Holes**\n• More than 2 = unacceptable complication risk\n• If 2 holes negative, close and transport\n\n**Location Options:**\n\n1. **If first was temporal → try parietal**\n   • 4 FB posterior and superior to EAC\n\n2. **If first was frontal → try temporal**\n   • 2 FB above and anterior to tragus\n\n3. **Opposite side (ONLY if clinical signs suggest)**\n   • False localizing signs in 15%\n   • Pupil dilation can be contralateral rarely\n\n**Technique:**\n• Same preparation and drilling technique\n• Same assessment of findings\n• If still no blood → close both and transport [1][6]',
    citation: [1, 6],
    next: 'bh-evacuate-edh',
  },

  {
    id: 'bh-dural-tear',
    type: 'info',
    module: 4,
    title: 'Dural Tear / Brain Visible',
    body: '**Brain Tissue Visible = STOP**\n\n**This Means:**\n• Dura was torn during drilling\n• Brain cortex is exposed\n• Risk of cortical injury with further manipulation\n\n**Immediate Actions:**\n\n1. **STOP all drilling/instrumentation**\n\n2. **Do NOT explore further**\n\n3. **Irrigate Gently:**\n   • Saline irrigation to clean debris\n   • Remove bone fragments if visible\n\n4. **Cover with Saline-Soaked Gauze:**\n   • Keep brain moist\n   • Prevent desiccation injury\n\n5. **Close Scalp Over Defect:**\n   • Loose approximation\n   • Do NOT pack tightly\n\n6. **Transport IMMEDIATELY:**\n   • Patient needs neurosurgical evaluation\n   • Document the complication\n\n**Prognosis:**\n• Small dural tears may have minimal consequence\n• Brain exposure requires antibiotics and observation [1][6]',
    citation: [1, 6],
    next: 'bh-wound-closure',
  },

  {
    id: 'bh-hemostasis',
    type: 'info',
    module: 4,
    title: 'Step 5: Hemostasis',
    body: '**Achieving Hemostasis:**\n\n**Identify Bleeding Source:**\n\n**Middle Meningeal Artery:**\n• Arterial pumping from dura or bone\n• Most common cause of EDH\n• Runs in groove on inner skull\n\n**Treatment:**\n• Bipolar electrocautery if visible\n• Bone wax into foramen spinosum\n• May need to extend bone opening\n\n**Bone Edge Bleeding:**\n• Oozing from diploe (spongy bone)\n• Treatment: Bone wax\n• Pack firmly into bleeding bone edges\n\n**Venous Oozing:**\n• Dural surface oozing\n• Treatment: Gelfoam or Surgicel\n• Apply with gentle pressure\n• Do NOT pack tightly against brain\n\n**Scalp Bleeding:**\n• Can be impressive but not dangerous\n• Electrocautery to individual vessels\n• Raney clips if available\n• Will stop with closure [1][6]',
    citation: [1, 6],
    next: 'bh-extend-craniotomy',
  },

  {
    id: 'bh-extend-craniotomy',
    type: 'question',
    module: 4,
    title: 'Extend to Craniectomy?',
    body: '**When to Extend Burr Hole to Craniectomy:**\n\n**Consider Extending If:**\n• Inadequate drainage through single hole\n• Large clot not evacuating\n• Ongoing arterial bleeding requiring visualization\n• Brain herniating through defect (needs decompression)\n\n**Technique to Extend:**\n\n1. **Create Second Burr Hole:**\n   • 3-4 cm from first hole\n   • Same technique\n\n2. **Connect Holes:**\n   • Leksell rongeur to nibble bone between holes\n   • OR Gigli saw (requires neurosurgical training)\n\n3. **Remove Bone Flap:**\n   • Creates larger window\n   • Better visualization and drainage\n\n**⚠️ This Significantly Increases Complexity:**\n• Higher complication risk\n• Longer procedure time\n• Only if truly necessary\n\nDo you need to extend?',
    options: [
      { label: 'Adequate drainage — close', description: 'Hematoma evacuated sufficiently', next: 'bh-wound-closure' },
      { label: 'Need to extend', description: 'Inadequate drainage, ongoing bleeding', next: 'bh-craniectomy-technique' },
    ],
    citation: [1, 6],
  },

  {
    id: 'bh-craniectomy-technique',
    type: 'info',
    module: 4,
    title: 'Extending to Craniectomy',
    body: '**Craniectomy Technique:**\n\n⚠️ **Significantly Higher Risk — Only If Necessary**\n\n**Step 1: Second Burr Hole**\n• Place 3-4 cm from first hole\n• Ideally along planned craniotomy line\n• Same drilling technique\n\n**Step 2: Connect Holes with Rongeur**\n• Use Leksell or Kerrison rongeur\n• Nibble bone between holes\n• Protect dura with Penfield #4 as you go\n• Work slowly — do NOT tear dura\n\n**Step 3: Remove Bone**\n• Lift connecting bone bridge\n• Creates window for better access\n• Size: 4-6 cm typically adequate\n\n**Step 4: Evacuate Under Direct Vision**\n• Now have better access to clot\n• Can visualize bleeding sources\n• Bipolar electrocautery for hemostasis\n\n**Bone Flap:**\n• Save bone flap (can be replaced later)\n• Or leave decompressive craniectomy\n• Neurosurgeon will decide at definitive surgery [1][6]',
    citation: [1, 6],
    next: 'bh-wound-closure',
  },

  // =====================================================================
  // MODULE 5: WOUND CLOSURE & COMPLICATIONS
  // =====================================================================

  {
    id: 'bh-wound-closure',
    type: 'info',
    module: 5,
    title: 'Wound Closure',
    body: '**Closing the Wound:**\n\n⚠️ **CRITICAL: DO NOT Tamponade**\n\n**Loose Dressing ONLY:**\n• Tight packing INCREASES ICP\n• Can cause secondary brain injury\n• Gentle coverage is sufficient\n\n**Closure Technique:**\n\n1. **If Ongoing Hemorrhage:**\n   • Leave self-retaining retractor in place\n   • Cover with saline-moistened gauze\n   • Transport with wound open\n\n2. **If Hemostasis Achieved:**\n   • Irrigate wound thoroughly\n   • Approximate scalp loosely\n   • Interrupted nylon or staples\n   • Do NOT close tightly\n\n3. **Dressing:**\n   • Non-adherent gauze over wound\n   • Loose wrap\n   • Do NOT apply pressure dressing\n\n**If Brain Herniating Through Defect:**\n• This indicates severe edema\n• Close scalp IMMEDIATELY\n• May need additional osmotherapy\n• Transport urgently [1][6]',
    citation: [1, 6],
    next: 'bh-complications',
  },

  {
    id: 'bh-complications',
    type: 'info',
    module: 5,
    title: 'Complications',
    body: '**Intraoperative Complications:**\n\n| Complication | Cause | Management |\n|--------------|-------|------------|\n| **Cortical Injury** | Drill plunge | Use clutch bit; stop if brain seen |\n| **MMA Bleeding** | Temporal drilling | Bipolar; bone wax in foramen |\n| **Sagittal Sinus** | Too medial | Stay ≥3 cm lateral; direct pressure |\n| **Dural Tear** | Aggressive instrumentation | Cover with dural substitute |\n| **Scalp Bleeding** | Incision | Electrocautery, pressure, clips |\n\n**Post-Procedure Complications:**\n\n| Complication | Rate | Notes |\n|--------------|------|-------|\n| **Infection/Meningitis** | 0.2-0.3% | Prophylactic antibiotics reduce risk |\n| **CSF Leak** | Variable | Higher with dural breach |\n| **Rebleeding** | Common | Patient needs definitive craniotomy |\n| **Cerebral Edema** | Expected | Peaks 48-72h |\n| **Seizures** | Variable | Consider prophylaxis |\n\n**Overall Major Complication Rate:** ~2.5% [1][6][8]',
    citation: [1, 6, 8],
    next: 'bh-post-procedure',
  },

  // =====================================================================
  // MODULE 6: POST-PROCEDURE CARE
  // =====================================================================

  {
    id: 'bh-post-procedure',
    type: 'info',
    module: 6,
    title: 'Post-Procedure Care',
    body: '**Immediate Post-Procedure:**\n\n**Remember: This is a BRIDGE, Not a Cure**\n\nPatient still requires:\n• Definitive neurosurgical craniotomy\n• ICU-level care\n• Ongoing ICP management\n\n**Immediate Actions:**\n\n1. **Antibiotics:**\n   • Continue cefazolin 2g IV q8h or ceftriaxone 1g IV q24h\n   • Meningitis prophylaxis\n\n2. **Arrange Immediate Transport:**\n   • Neurosurgical center\n   • Air transport if available and faster\n   • Pre-notify receiving facility\n\n3. **Neuroprotection Bundle:**\n   • Head elevated 30°, midline\n   • MAP >80-90 mmHg\n   • SpO₂ >94%\n   • Normocapnia (EtCO₂ 35-40)\n   • Normothermia\n   • Glucose 140-180 mg/dL\n\n4. **Seizure Prophylaxis:**\n   • Levetiracetam 500mg IV BID\n   • For supratentorial injuries [3][4]',
    citation: [3, 4],
    next: 'bh-monitoring',
  },

  {
    id: 'bh-monitoring',
    type: 'info',
    module: 6,
    title: 'Transport Monitoring',
    body: '**Monitoring During Transport:**\n\n**Serial Neurologic Checks (q15 min):**\n• GCS\n• Pupil size and reactivity\n• Motor response to commands\n\n**Signs of Re-Expansion/Deterioration:**\n• Declining GCS\n• New or worsening anisocoria\n• New seizure\n• Cushing\'s triad (late sign)\n\n**If Patient Deteriorates:**\n\n1. **Brief Hyperventilation:**\n   • EtCO₂ 30-35 mmHg\n   • Maximum 5-10 minutes\n   • Temporizing measure only\n\n2. **Additional Osmotherapy:**\n   • Mannitol 0.5 g/kg IV\n   • Or hypertonic saline\n\n3. **Notify Receiving Facility:**\n   • May need OR on arrival\n   • Update ETA and clinical status\n\n**Documentation for Receiving Team:**\n• Procedure performed\n• Findings (hematoma type, amount drained)\n• Complications\n• Current medications\n• GCS/pupil progression [3][4]',
    citation: [3, 4],
    next: 'bh-documentation',
  },

  {
    id: 'bh-documentation',
    type: 'info',
    module: 6,
    title: 'Documentation',
    body: '**Critical Documentation:**\n\n**Pre-Procedure:**\n• Time of injury (if known)\n• GCS progression with times\n• Pupil changes with times\n• Herniation signs\n• CT findings (if available)\n• Time neurosurgery unavailable\n• Medical management provided\n\n**Consent/Indication:**\n• Emergency procedure performed under implied consent\n• Life-threatening emergency\n• No neurosurgical alternative available\n• Expected outcome without intervention: death\n\n**Procedure:**\n• Time of incision\n• Location of burr hole(s)\n• Equipment used\n• Findings (EDH, SDH, volume estimate)\n• Complications\n• Hemostasis achieved\n\n**Post-Procedure:**\n• Neurologic response to decompression\n• Current GCS and pupils\n• Antibiotics given\n• Transfer destination and ETA\n\n**This documentation is critical for:**\n• Medicolegal protection\n• Receiving neurosurgeon\n• Quality improvement [1]',
    citation: [1],
    next: undefined,
  },

];

export const BURR_HOLE_MODULE_LABELS: string[] = [
  'Indications',
  'Anatomy',
  'Equipment',
  'Technique',
  'Closure & Complications',
  'Post-Procedure',
];

export const BURR_HOLE_CITATIONS: Citation[] = [
  { num: 1, text: 'Roberts JR, Hedges JR. Roberts and Hedges\' Clinical Procedures in Emergency Medicine. 7th ed. Elsevier; 2018. Chapter 65: Skull Trephination.' },
  { num: 2, text: 'WikEM. Burr Hole. https://wikem.org/wiki/Burr_hole. Accessed 2024.' },
  { num: 3, text: 'Farkas J. Post-craniotomy care. IBCC/EMCrit. https://emcrit.org/ibcc/crani/. 2025.' },
  { num: 4, text: 'Brain Trauma Foundation. Guidelines for the Management of Severe Traumatic Brain Injury. 4th ed. 2016.' },
  { num: 5, text: 'LITFL. Procedure: Craniostomy. https://litfl.com/procedure-craniostomy-instructions/. 2024.' },
  { num: 6, text: 'Springer. Emergency burr holes: "How to do it". Scand J Trauma Resusc Emerg Med. 2012;20:24.' },
  { num: 7, text: 'EMCrit. Intraosseous Device Burr Holes with Marc Grossman. https://emcrit.org/emcrit/burr-holes-craniotomy/. 2019.' },
  { num: 8, text: 'Joint Trauma System. Emergency Cranial Procedures by Non-Neurosurgeons. Clinical Practice Guideline. 2025.' },
];
