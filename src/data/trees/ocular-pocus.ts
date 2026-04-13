// MedKitt — Ocular POCUS Protocol
// Sources: ACEP Now, NYORA, POCUS 101, Core EM, EMRA, Sonoguide, EMCrit
// 6 modules: Technique → Normal Anatomy → RD vs PVD → Vitreous Hemorrhage → ONSD/ICP → CRAO/Globe Rupture
// Ophthalmology POCUS consult

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';

export interface Citation {
  num: number;
  text: string;
}

export const OCULAR_POCUS_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Use high-frequency linear probe (7.5-15 MHz) with copious gel barrier', nodeId: 'opocus-start' },
  { text: 'CONTRAINDICATED if globe rupture suspected — do NOT apply pressure', nodeId: 'opocus-start' },
  { text: 'ONSD >5mm (adult) suggests elevated ICP — measure 3mm behind globe', nodeId: 'opocus-onsd-measure' },
  { text: 'Retinal detachment: V-shaped, tethered at optic disc, does NOT move', nodeId: 'opocus-rd-findings' },
  { text: 'PVD: Floats freely, undulating "seaweed in water" motion', nodeId: 'opocus-pvd-findings' },
  { text: 'Document lens position, vitreous clarity, and posterior segment', nodeId: 'opocus-normal' },
];

export const OCULAR_POCUS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: TECHNIQUE AND SETUP
  // =====================================================================

  {
    id: 'opocus-start',
    type: 'info',
    module: 1,
    title: 'Ocular POCUS: When and Why',
    body: '**Ocular ultrasound is a rapid, bedside tool for diagnosing vision-threatening emergencies when direct visualization is limited.**\n\n**Indications:**\n• Acute vision loss of unknown etiology\n• Eye trauma assessment (if globe rupture excluded)\n• Suspected elevated ICP\n• Cannot visualize fundus (hyphema, cataract, vitreous hemorrhage)\n• Suspected retinal detachment\n\n**Absolute Contraindication:**\n⚠️ **SUSPECTED GLOBE RUPTURE** — ANY pressure risks extrusion of intraocular contents\n\n**Signs of Globe Rupture:**\n• Peaked/teardrop pupil\n• Shallow anterior chamber\n• Visible extrusion of uveal tissue\n• Full-thickness scleral laceration\n• Severely subconjunctival hemorrhage + hypotony\n\n**If rupture suspected:** Place rigid eye shield, avoid any pressure, emergent ophthalmology. [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'opocus-rupture-screen', label: 'Rupture Screen' },
    ],
    next: 'opocus-technique',
  },

  {
    id: 'opocus-technique',
    type: 'info',
    module: 1,
    title: 'Probe Selection & Technique',
    body: '**Equipment:**\n• **High-frequency linear probe** (7.5-15 MHz)\n• Higher frequency = better resolution for superficial structures\n• Acoustic standoff: thick layer of gel or Tegaderm over closed lid\n\n**Patient Position:**\n• Supine with eyes closed\n• Ask patient to look straight ahead (reduces movement artifact)\n• May ask to look in different directions to assess detachments\n\n**Scanning Technique:**\n\n| Plane | Orientation | Purpose |\n|-------|-------------|--------|\n| **Transverse** | Marker temporal | Standard view, assess globe |\n| **Longitudinal** | Marker superior | Sagittal view, ONSD measurement |\n\n**Probe Pressure:**\n• **MINIMAL pressure** — rest probe on gel, not on lid\n• Excessive pressure can compress the globe and alter measurements\n• If trauma: use extra gel as standoff, absolutely no pressure\n\n**Depth:** Start at 4-5 cm to see entire globe and orbit. [1][2][3]',
    citation: [1, 2, 3],
    images: [
      {
        src: 'images/ocular-pocus/probe-position.png',
        alt: 'Linear probe position for ocular ultrasound with thick gel layer over closed eyelid',
        caption: 'Probe position: Linear probe with copious gel over closed lid. Minimal pressure. Marker temporal for transverse view.',
      },
    ],
    next: 'opocus-systematic',
  },

  {
    id: 'opocus-systematic',
    type: 'info',
    module: 1,
    title: 'Systematic Approach',
    body: '**Scan Systematically — 6 Key Structures:**\n\n| Structure | What to Assess |\n|-----------|---------------|\n| **1. Anterior Chamber** | Depth, hyphema, foreign body |\n| **2. Iris & Pupil** | Shape, position |\n| **3. Lens** | Position (dislocation?), clarity |\n| **4. Vitreous** | Echogenicity (normally anechoic) |\n| **5. Retina** | Attachment, detachment |\n| **6. Optic Nerve** | ONSD measurement |\n\n**Dynamic Assessment:**\n• Have patient move eyes side-to-side\n• Observe vitreous/retinal movement\n• Helps differentiate PVD (moves freely) from RD (tethered)\n\n**Documentation:**\n• Lens position\n• Vitreous clarity\n• Retina attachment\n• ONSD measurement\n• Any abnormalities identified [1][2][4]',
    citation: [1, 2, 4],
    calculatorLinks: [
      { id: 'opocus-checklist', label: 'Scan Checklist' },
    ],
    next: 'opocus-normal',
  },

  // =====================================================================
  // MODULE 2: NORMAL ANATOMY
  // =====================================================================

  {
    id: 'opocus-normal',
    type: 'info',
    module: 2,
    title: 'Normal Ocular Anatomy',
    body: '**Normal Sonographic Appearance:**\n\n**Anterior Structures (superficial to deep):**\n• **Eyelid:** Thin hyperechoic line\n• **Cornea:** Thin curved hyperechoic line\n• **Anterior Chamber:** Anechoic space between cornea and iris\n• **Iris:** Echogenic structure surrounding pupil\n• **Lens:** Biconvex, hypoechoic with hyperechoic capsule\n\n**Globe:**\n• **Vitreous:** **Completely anechoic** (dark/black)\n• Any echoes in vitreous = abnormal (hemorrhage, detachment, debris)\n• Globe diameter: ~24 mm (adult)\n\n**Posterior Structures:**\n• **Retina:** Normally adherent to posterior globe wall — NOT visible separately\n• **Optic Nerve:** Hypoechoic band extending posteriorly\n• **Optic Nerve Sheath:** Hyperechoic borders around nerve\n\n**Key Normal Finding:** Vitreous should be completely anechoic. Any echogenicity is abnormal. [1][3][4]',
    citation: [1, 3, 4],
    images: [
      {
        src: 'images/ocular-pocus/normal-anatomy.png',
        alt: 'Normal ocular ultrasound showing anechoic vitreous, lens position, and posterior globe with labeled structures',
        caption: 'Normal eye: Anechoic vitreous, biconvex lens, anterior chamber. Note hyperechoic optic nerve sheath posteriorly.',
      },
    ],
    next: 'opocus-pathology-decision',
  },

  {
    id: 'opocus-pathology-decision',
    type: 'question',
    module: 2,
    title: 'What Are You Evaluating For?',
    body: '**Select the primary indication for ocular ultrasound:**',
    citation: [1, 2],
    options: [
      {
        label: 'Acute Vision Loss / Floaters',
        description: 'Rule out RD, PVD, vitreous hemorrhage',
        next: 'opocus-vision-loss',
      },
      {
        label: 'Elevated ICP / Headache',
        description: 'ONSD measurement for papilledema surrogate',
        next: 'opocus-onsd-indication',
        urgency: 'critical',
      },
      {
        label: 'Eye Trauma',
        description: 'Foreign body, lens dislocation, globe rupture screen',
        next: 'opocus-trauma',
        urgency: 'urgent',
      },
      {
        label: 'Central Retinal Artery Occlusion',
        description: 'Confirm diagnosis, assess for emboli',
        next: 'opocus-crao',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'opocus-vision-loss',
    type: 'info',
    module: 2,
    title: 'Approach to Acute Vision Loss',
    body: '**Ocular POCUS for Acute Vision Loss:**\n\n**Key Question:** Is there something in the vitreous that should not be there?\n\n**Three Main Findings:**\n\n| Finding | Appearance | Movement |\n|---------|------------|----------|\n| **Retinal Detachment** | V-shaped or tent-shaped membrane | Minimal — tethered to disc |\n| **Posterior Vitreous Detachment** | Undulating membrane | Free — "seaweed in water" |\n| **Vitreous Hemorrhage** | Diffuse echoes in vitreous | Swirls with eye movement |\n\n**Clinical Correlation:**\n• **Flashes + Floaters:** PVD most common, but 10-15% have concurrent RD\n• **Curtain/Veil Vision Loss:** Think retinal detachment\n• **Sudden Floaters + Dark Vision:** Vitreous hemorrhage\n\n**Differentiation is Critical:**\n• RD = surgical emergency (needs ophthalmology within hours)\n• PVD = usually benign (outpatient follow-up)\n\n[RD vs PVD Calculator](#/calculator/opocus-rd-vs-pvd) [1][3][5]',
    citation: [1, 3, 5],
    calculatorLinks: [
      { id: 'opocus-rd-vs-pvd', label: 'RD vs PVD' },
    ],
    next: 'opocus-rd-findings',
  },

  // =====================================================================
  // MODULE 3: RETINAL VS VITREOUS DETACHMENT
  // =====================================================================

  {
    id: 'opocus-rd-findings',
    type: 'info',
    module: 3,
    title: 'Retinal Detachment Findings',
    body: '**Retinal Detachment (RD) — SURGICAL EMERGENCY:**\n\n**Classic Appearance:**\n• **V-shaped or tent-shaped** membrane in vitreous\n• **Tethered at optic disc** — does not float freely\n• **Thick, hyperechoic** compared to vitreous\n• May see undulating movement but anchored posteriorly\n\n**Types:**\n\n| Type | Description |\n|------|------------|\n| **Partial RD** | V-shape or fold, attached to disc |\n| **Total RD** | Complete "funnel" or "morning glory" appearance |\n| **Macula-on** | Macula still attached — EMERGENT (preserve central vision) |\n| **Macula-off** | Macula detached — urgent but timing less critical |\n\n**Key Feature:** The retina CANNOT move past the optic disc — it is anatomically tethered.\n\n**Dynamic Test:**\n• Have patient look left/right rapidly\n• RD: Membrane moves but remains attached to disc\n• Movement is restricted, "leashed"\n\n**Sensitivity:** 97-100% | **Specificity:** 83-100% [1][2][5][6]',
    citation: [1, 2, 5, 6],
    images: [
      {
        src: 'images/ocular-pocus/retinal-detachment.png',
        alt: 'Ocular ultrasound showing V-shaped retinal detachment tethered at the optic disc',
        caption: 'Retinal Detachment: V-shaped hyperechoic membrane tethered at optic disc. Does NOT float freely — this is pathognomonic.',
      },
    ],
    next: 'opocus-pvd-findings',
  },

  {
    id: 'opocus-pvd-findings',
    type: 'info',
    module: 3,
    title: 'Posterior Vitreous Detachment',
    body: '**Posterior Vitreous Detachment (PVD) — Usually Benign:**\n\n**What Is PVD?**\n• Separation of vitreous gel from retina\n• Normal aging process (50% by age 50, 75% by age 75)\n• Symptomatic: floaters, flashes\n• Usually benign, but can be associated with RD in 10-15%\n\n**Sonographic Appearance:**\n• **Thin, undulating membrane** in posterior vitreous\n• **NOT tethered to optic disc** — floats freely\n• **"Seaweed in water"** or "kelp" motion\n• Less hyperechoic than RD (thinner membrane)\n\n**Dynamic Test (Critical):**\n• Have patient look side-to-side rapidly, then stop\n• PVD: **Membrane continues to undulate after eye stops moving**\n• RD: Membrane stops when eye stops (tethered)\n\n**Clinical Pearl:**\n"If it floats freely like a jellyfish, it\'s PVD. If it\'s leashed to the disc like a dog on a chain, it\'s RD."\n\n**Still Needs Outpatient F/U:** 10-15% of PVD have concurrent RD, and PVD increases RD risk. [1][3][5]',
    citation: [1, 3, 5],
    images: [
      {
        src: 'images/ocular-pocus/pvd.png',
        alt: 'Posterior vitreous detachment showing freely floating membrane not attached to optic disc',
        caption: 'PVD: Thin membrane floating freely in vitreous. Not tethered to disc. Undulates like "seaweed in water" with eye movement.',
      },
    ],
    next: 'opocus-rd-pvd-comparison',
  },

  {
    id: 'opocus-rd-pvd-comparison',
    type: 'info',
    module: 3,
    title: 'RD vs PVD: Side-by-Side',
    body: '**Key Differentiating Features:**\n\n| Feature | Retinal Detachment | PVD |\n|---------|-------------------|-----|\n| **Shape** | V-shape / tent / funnel | Undulating membrane |\n| **Attachment** | **Tethered to disc** | Floats freely |\n| **Movement** | Restricted, "leashed" | Free, "seaweed" |\n| **Thickness** | Thicker, more echogenic | Thin, less echogenic |\n| **After-movement** | Stops with eye | **Continues after eye stops** |\n| **Urgency** | **SURGICAL EMERGENCY** | Outpatient follow-up |\n\n**Clinical Decision:**\n\n| Finding | Action |\n|---------|---------|\n| **Clear RD** | Emergent ophthalmology consult |\n| **Clear PVD only** | Outpatient ophthalmology 24-48h |\n| **Uncertain** | Treat as RD — emergent consult |\n| **PVD + vision loss** | Urgent consult — rule out concurrent RD |\n\n**When in Doubt:** Call ophthalmology. The consequences of missing RD far outweigh unnecessary consultation. [1][2][5][6]',
    citation: [1, 2, 5, 6],
    calculatorLinks: [
      { id: 'opocus-rd-vs-pvd', label: 'RD vs PVD' },
    ],
    images: [
      {
        src: 'images/ocular-pocus/rd-vs-pvd.png',
        alt: 'Side-by-side comparison of retinal detachment (V-shaped, tethered) versus PVD (floating freely)',
        caption: 'RD (left): V-shaped, tethered to disc. PVD (right): Floating freely, undulating membrane.',
      },
    ],
    next: 'opocus-vitreous-hemorrhage',
  },

  // =====================================================================
  // MODULE 4: VITREOUS HEMORRHAGE & OTHER PATHOLOGY
  // =====================================================================

  {
    id: 'opocus-vitreous-hemorrhage',
    type: 'info',
    module: 4,
    title: 'Vitreous Hemorrhage',
    body: '**Vitreous Hemorrhage — Blood in the Vitreous Cavity:**\n\n**Causes:**\n• Diabetic retinopathy (most common)\n• Trauma\n• Retinal tear with vessel disruption\n• Posterior vitreous detachment\n• Age-related macular degeneration\n• Retinal vein occlusion\n\n**Sonographic Appearance:**\n• **Diffuse echogenic particles** throughout vitreous\n• "Snowstorm" or "starry sky" pattern\n• **Swirling motion** with eye movement ("washing machine sign")\n• May layer inferiorly if large/dense\n• Obscures view of posterior structures\n\n**Grading:**\n\n| Grade | Description |\n|-------|------------|\n| Mild | Scattered echoes, can see retina |\n| Moderate | Dense echoes, partial retinal view |\n| Severe | Complete obscuration of posterior segment |\n\n**Clinical Importance:**\n• Cannot see retina = cannot rule out RD\n• Dense VH + acute vision loss → ophthalmology consult\n• Need to rule out concurrent retinal tear/detachment [1][3][5]',
    citation: [1, 3, 5],
    images: [
      {
        src: 'images/ocular-pocus/vitreous-hemorrhage.png',
        alt: 'Vitreous hemorrhage showing diffuse echogenic particles in vitreous cavity with swirling pattern',
        caption: 'Vitreous Hemorrhage: Diffuse echogenic debris in vitreous. Swirls with eye movement. May obscure retinal view.',
      },
    ],
    next: 'opocus-other-pathology',
  },

  {
    id: 'opocus-other-pathology',
    type: 'info',
    module: 4,
    title: 'Other Ocular Pathology',
    body: '**Additional Findings to Recognize:**\n\n**Lens Dislocation:**\n• Lens not in normal biconvex position\n• May be posterior (in vitreous), anterior, or subluxed\n• Associated with Marfan syndrome, homocystinuria, trauma\n• Can cause acute glaucoma or visual axis obstruction\n\n**Intraocular Foreign Body (IOFB):**\n• Hyperechoic structure with posterior shadowing (metal)\n• May see reverberation artifact (glass, metal)\n• Document location, size, and any associated globe injury\n• Do NOT use MRI if metallic FB suspected\n\n**Globe Rupture Signs:**\n• Irregular globe contour\n• Decreased globe volume\n• Intraocular air (bright echoes)\n• Vitreous hemorrhage (often seen)\n• **If suspected — STOP scanning, protect eye, consult**\n\n**Choroidal Detachment:**\n• Thick, smooth dome-shaped elevations\n• Do NOT extend to optic disc (vs. RD)\n• May be serous (post-surgery) or hemorrhagic (trauma) [1][2][7]',
    citation: [1, 2, 7],
    images: [
      {
        src: 'images/ocular-pocus/lens-dislocation.png',
        alt: 'Posterior lens dislocation with lens visible in vitreous cavity behind normal position',
        caption: 'Posterior lens dislocation: Lens (arrow) displaced into vitreous. Can cause visual axis obstruction or secondary glaucoma.',
      },
    ],
    next: 'opocus-onsd-indication',
  },

  // =====================================================================
  // MODULE 5: ONSD MEASUREMENT FOR ICP
  // =====================================================================

  {
    id: 'opocus-onsd-indication',
    type: 'info',
    module: 5,
    title: 'ONSD for Elevated ICP',
    body: '**Optic Nerve Sheath Diameter (ONSD) — Non-Invasive ICP Surrogate:**\n\n**Why It Works:**\n• Optic nerve is a direct extension of the CNS\n• Optic nerve sheath is continuous with dura mater\n• Increased ICP → CSF distension of optic nerve sheath\n• Changes within minutes of ICP elevation\n\n**Indications:**\n• Suspected elevated ICP\n• Idiopathic intracranial hypertension (IIH)\n• Trauma — cannot obtain CT immediately\n• Post-LP headache assessment\n• Monitoring during neurocritical care\n\n**Advantages:**\n• Non-invasive\n• Bedside, rapid (<5 minutes)\n• No radiation\n• Repeatable for monitoring\n• Can detect papilledema before fundoscopic changes\n\n**Limitations:**\n• Cannot give absolute ICP value\n• Operator dependent\n• Conditions affecting ONSD: prior optic neuritis, glaucoma, optic nerve tumors [1][4][8][9]',
    citation: [1, 4, 8, 9],
    next: 'opocus-onsd-measure',
  },

  {
    id: 'opocus-onsd-measure',
    type: 'info',
    module: 5,
    title: 'ONSD Measurement Technique',
    body: '**Step-by-Step ONSD Measurement:**\n\n**1. Position:**\n• Patient supine, eyes closed, looking straight ahead\n• Ultrasound depth: 4 cm\n\n**2. Obtain View:**\n• Longitudinal/sagittal plane (marker superior)\n• Identify optic nerve as hypoechoic band extending posteriorly from globe\n• Optic nerve sheath = hyperechoic borders surrounding nerve\n\n**3. Measure:**\n• **3 mm posterior to the globe** (this is critical)\n• Measure **outer edge to outer edge** of sheath (OD to OD)\n• Calipers perpendicular to long axis of nerve\n\n**4. Bilateral Measurements:**\n• Measure BOTH eyes\n• Take average of both\n• Or report the higher value\n\n**Threshold Values:**\n\n| Population | ONSD Threshold |\n|------------|---------------|\n| **Adult** | **>5.0 mm** = elevated ICP |\n| **Child (1-15 y)** | **>4.5 mm** |\n| **Infant (<1 y)** | **>4.0 mm** |\n\n**Sensitivity:** 90% | **Specificity:** 85% for ICP >20 mmHg [1][4][8][9]',
    citation: [1, 4, 8, 9],
    calculatorLinks: [
      { id: 'opocus-onsd-calc', label: 'ONSD Calculator' },
    ],
    images: [
      {
        src: 'images/ocular-pocus/onsd-measurement.png',
        alt: 'ONSD measurement technique showing caliper placement 3mm behind globe measuring outer edge to outer edge',
        caption: 'ONSD Measurement: Calipers 3mm behind globe, outer edge to outer edge. Normal <5.0 mm (adult). >5.0 mm suggests elevated ICP.',
      },
    ],
    next: 'opocus-onsd-interpret',
  },

  {
    id: 'opocus-onsd-interpret',
    type: 'question',
    module: 5,
    title: 'ONSD Result',
    body: '**What is the measured ONSD?**\n\nMeasure bilateral and use average or highest value.',
    citation: [1, 4, 8],
    options: [
      {
        label: 'ONSD < 5.0 mm (Adult)',
        description: 'Normal — elevated ICP unlikely',
        next: 'opocus-onsd-normal',
      },
      {
        label: 'ONSD 5.0-5.8 mm',
        description: 'Borderline — correlate clinically',
        next: 'opocus-onsd-borderline',
        urgency: 'urgent',
      },
      {
        label: 'ONSD > 5.8 mm',
        description: 'Strongly suggests elevated ICP',
        next: 'opocus-onsd-elevated',
        urgency: 'critical',
      },
      {
        label: 'Pediatric Assessment',
        description: 'Use age-specific thresholds',
        next: 'opocus-onsd-peds',
      },
    ],
  },

  {
    id: 'opocus-onsd-normal',
    type: 'info',
    module: 5,
    title: 'ONSD Normal',
    body: '**ONSD <5.0 mm — Elevated ICP Unlikely:**\n\n**Interpretation:**\n• Normal optic nerve sheath diameter\n• Elevated ICP is unlikely but not excluded\n• High negative predictive value (95%+)\n\n**Clinical Integration:**\n• ONSD is a screening tool, not definitive\n• If high clinical suspicion despite normal ONSD:\n  - Consider CT head, LP\n  - Serial ONSD monitoring\n  - Formal ophthalmology fundoscopy\n\n**False Negatives Can Occur:**\n• Early/mild ICP elevation\n• Prior optic nerve sheath surgery\n• Anatomic variants\n\n**Recommendation:**\n• Normal ONSD in low-suspicion patient = reassuring\n• Normal ONSD in high-suspicion patient = continue workup [4][8][9]',
    citation: [4, 8, 9],
    next: 'opocus-trauma',
  },

  {
    id: 'opocus-onsd-borderline',
    type: 'info',
    module: 5,
    title: 'ONSD Borderline',
    body: '**ONSD 5.0-5.8 mm — Grey Zone:**\n\n**Interpretation:**\n• Borderline elevation\n• May represent early or mild ICP elevation\n• Clinical correlation essential\n\n**Consider:**\n• Repeat measurement (ensure proper technique)\n• Bilateral assessment\n• Clinical context: symptoms, mechanism, timing\n\n**High Suspicion Signs:**\n• Headache worse supine\n• Pulsatile tinnitus\n• Visual obscurations\n• Papilledema on fundoscopy\n• Cushing\'s triad (late)\n\n**Next Steps:**\n• CT head if not done\n• Consider LP with opening pressure\n• Neurology/Neurosurgery consultation\n• Serial ONSD monitoring (trends more valuable than single measurement)\n\n**Clinical Pearl:** The trend is more informative than a single value — repeat measurements. [4][8][9]',
    citation: [4, 8, 9],
    calculatorLinks: [
      { id: 'opocus-onsd-calc', label: 'ONSD Calculator' },
    ],
    next: 'opocus-trauma',
  },

  {
    id: 'opocus-onsd-elevated',
    type: 'info',
    module: 5,
    title: 'ONSD Elevated — ICP Concern',
    body: '**⚠️ ONSD >5.8 mm — High Likelihood of Elevated ICP ⚠️**\n\n**Interpretation:**\n• Strongly suggests ICP >20 mmHg\n• PPV 88-93% for elevated ICP\n• Warrants urgent further evaluation\n\n**Immediate Actions:**\n1. **HOB 30°** — reduce venous pressure\n2. **Avoid hypoxia/hypercapnia**\n3. **CT Head** — rule out mass lesion, herniation\n4. **Neurosurgery consult** — consider invasive ICP monitoring\n\n**If Herniation Suspected:**\n• Mannitol 1-1.5 g/kg IV\n• Hypertonic saline (23.4% 30mL or 3% 250mL)\n• Hyperventilate to PCO2 30-35 briefly\n• Emergent neurosurgery\n\n**Do NOT:**\n• LP in presence of elevated ICP without imaging\n• Delay intervention while awaiting formal imaging\n\n**ONSD for Monitoring:**\n• Can use serial ONSD to track response to ICP-lowering therapy [4][8][9]',
    citation: [4, 8, 9],
    calculatorLinks: [
      { id: 'opocus-onsd-calc', label: 'ONSD Calculator' },
    ],
    treatment: {
      firstLine: {
        drug: 'Mannitol',
        dose: '1-1.5 g/kg',
        route: 'IV',
        frequency: 'Once (may repeat PRN)',
        duration: 'Single dose, can repeat q6h',
        notes: 'For ICP crisis. Works in 15-30 min. Avoid if hypotensive. Check serum osm.',
      },
      alternative: {
        drug: 'Hypertonic Saline (23.4%)',
        dose: '30 mL',
        route: 'IV (central line preferred)',
        frequency: 'Once',
        duration: 'Single dose for crisis',
        notes: 'Alternative: 3% NaCl 250mL over 20 min via peripheral. Works faster than mannitol.',
      },
      monitoring: 'Serial ONSD q15-30 min, serial neuro exams, serum osmolality (goal <320), Na+ q4h if using HTS.',
    },
    next: 'opocus-trauma',
  },

  {
    id: 'opocus-onsd-peds',
    type: 'info',
    module: 5,
    title: 'Pediatric ONSD Thresholds',
    body: '**Age-Specific ONSD Thresholds:**\n\n| Age Group | Normal ONSD | Elevated ICP |\n|-----------|-------------|-------------|\n| **Infant (<1 year)** | <4.0 mm | ≥4.0 mm |\n| **Child (1-15 years)** | <4.5 mm | ≥4.5 mm |\n| **Adult (>15 years)** | <5.0 mm | ≥5.0 mm |\n\n**Pediatric Considerations:**\n• Open fontanelle may buffer ICP — less reliable in infants\n• Consider fontanelle bulging, suture splaying on imaging\n• Clinical signs: irritability, vomiting, "sunsetting" eyes\n\n**Measurement Technique (same as adult):**\n• 3mm posterior to globe\n• Outer edge to outer edge\n• Bilateral, average values\n\n**Evidence Base:**\n• Fewer pediatric validation studies\n• Thresholds extrapolated from adult data + limited pediatric studies\n• Use as adjunct, not sole decision-maker [4][8][10]',
    citation: [4, 8, 10],
    calculatorLinks: [
      { id: 'opocus-onsd-calc', label: 'ONSD Calculator' },
    ],
    next: 'opocus-trauma',
  },

  // =====================================================================
  // MODULE 6: TRAUMA, CRAO, GLOBE RUPTURE
  // =====================================================================

  {
    id: 'opocus-trauma',
    type: 'info',
    module: 6,
    title: 'Ocular Trauma Assessment',
    body: '**POCUS in Ocular Trauma:**\n\n**⚠️ FIRST: Rule Out Globe Rupture Before Any Scan ⚠️**\n\n**Clinical Globe Rupture Signs:**\n• Teardrop/peaked pupil\n• Severely shallow anterior chamber\n• Hyphema with hypotony\n• Visible scleral laceration\n• Extruding uveal tissue (dark tissue through wound)\n• Subconjunctival hemorrhage 360°\n• Severely reduced visual acuity\n\n**If Rupture Suspected:**\n• **Do NOT scan** — any pressure risks extrusion\n• Place rigid eye shield (not patch)\n• Emergent ophthalmology\n• NPO for OR\n• Antiemetics (prevent vomiting/IOP spike)\n• Update tetanus\n\n**If Rupture Excluded — Safe to Scan for:**\n• Foreign body localization\n• Lens dislocation\n• Retinal detachment\n• Vitreous hemorrhage\n• ONSD for associated head injury\n\n**Use MINIMAL pressure with trauma — extra gel standoff.** [1][2][7]',
    citation: [1, 2, 7],
    calculatorLinks: [
      { id: 'opocus-rupture-screen', label: 'Rupture Screen' },
    ],
    next: 'opocus-trauma-findings',
  },

  {
    id: 'opocus-trauma-findings',
    type: 'info',
    module: 6,
    title: 'Traumatic Findings',
    body: '**Post-Trauma Ocular Pathology:**\n\n**Hyphema:**\n• Blood in anterior chamber\n• Layering red cells with fluid level\n• May completely fill AC (8-ball hyphema)\n• Risk: secondary hemorrhage, glaucoma\n\n**Lens Dislocation:**\n• Posterior dislocation — lens in vitreous\n• Anterior dislocation — lens in AC (can cause pupil block)\n• Subluxation — partial displacement\n• Associated with zonular damage\n\n**Intraocular Foreign Body:**\n• Hyperechoic with posterior acoustic shadow (metal)\n• Reverberation artifact (glass, metal)\n• Document: location, size, trajectory\n• CT orbit if metallic (no MRI)\n\n**Traumatic Retinal Detachment:**\n• Same appearance as spontaneous RD\n• V-shaped, tethered to disc\n• May have associated VH\n\n**Globe Rupture Findings (if you see this — already scanned too much):**\n• Irregular contour\n• Collapsed globe\n• Loss of normal spherical shape [1][2][7]',
    citation: [1, 2, 7],
    images: [
      {
        src: 'images/ocular-pocus/hyphema-us.png',
        alt: 'Hyphema on ocular ultrasound showing blood layering in anterior chamber',
        caption: 'Hyphema: Blood layering in anterior chamber. Can layer inferiorly with gravity. Risk of IOP elevation.',
      },
    ],
    next: 'opocus-crao',
  },

  {
    id: 'opocus-crao',
    type: 'info',
    module: 6,
    title: 'CRAO on Ultrasound',
    body: '**Central Retinal Artery Occlusion — POCUS Role:**\n\n**Primary Diagnosis is Clinical:**\n• Painless, sudden monocular vision loss\n• Cherry-red spot on fundoscopy\n• APD (afferent pupillary defect)\n\n**POCUS Utility:**\n• Confirm diagnosis when fundoscopy limited\n• May see echogenic emboli in central retinal artery (rare)\n• Rule out other pathology (RD, VH, lens dislocation)\n• Assess for vitreous hemorrhage\n\n**Sonographic Findings:**\n• Usually **NORMAL appearing** on standard ultrasound\n• Rarely: hyperechoic spot at CRA = embolus (highly specific but insensitive)\n• Retina itself may appear slightly thickened (edema)\n\n**Color Doppler (if available):**\n• Absent or reduced flow in central retinal artery\n• Helps confirm diagnosis but not routinely available\n\n**Clinical Pearl:**\nOcular POCUS in CRAO is primarily to **rule out other causes** of vision loss rather than confirm CRAO. The diagnosis is clinical. [1][5][11]',
    citation: [1, 5, 11],
    next: 'opocus-disposition',
  },

  {
    id: 'opocus-disposition',
    type: 'question',
    module: 6,
    title: 'Ocular POCUS Disposition',
    body: '**What were the primary findings?**',
    citation: [1, 2],
    options: [
      {
        label: 'Retinal Detachment',
        description: 'V-shaped, tethered membrane',
        next: 'opocus-dispo-rd',
        urgency: 'critical',
      },
      {
        label: 'PVD Only',
        description: 'Floating membrane, undulating',
        next: 'opocus-dispo-pvd',
      },
      {
        label: 'Vitreous Hemorrhage',
        description: 'Diffuse echogenic debris',
        next: 'opocus-dispo-vh',
        urgency: 'urgent',
      },
      {
        label: 'Elevated ONSD',
        description: '>5.0mm suggesting ICP',
        next: 'opocus-onsd-elevated',
        urgency: 'critical',
      },
      {
        label: 'Globe Rupture Signs',
        description: 'Irregular contour, teardrop pupil',
        next: 'opocus-dispo-rupture',
        urgency: 'critical',
      },
      {
        label: 'Normal Exam',
        description: 'No acute pathology identified',
        next: 'opocus-dispo-normal',
      },
    ],
  },

  {
    id: 'opocus-dispo-rd',
    type: 'info',
    module: 6,
    title: 'Retinal Detachment Disposition',
    body: '**⚠️ RETINAL DETACHMENT = SURGICAL EMERGENCY ⚠️**\n\n**Immediate Actions:**\n1. **Emergent ophthalmology consultation**\n2. Position patient with detached area down (if known)\n3. Bilateral eye patching (reduces eye movement)\n4. Keep patient calm, minimal head movement\n\n**Timing:**\n• **Macula-ON (central vision intact):** EMERGENT surgery within 24 hours\n• **Macula-OFF (central vision already lost):** Urgent surgery within 72 hours\n\n**Do NOT:**\n• Discharge without ophthalmology evaluation\n• Delay consultation\n\n**Consult Information:**\n• Symptom onset time\n• Extent of visual field loss\n• Whether central vision is affected\n• History of prior eye surgery, high myopia\n\n**Prognosis:**\n• Macula-on with prompt surgery: good visual outcome\n• Macula-off: central vision recovery less likely [2][5][6]',
    citation: [2, 5, 6],
    options: [
      {
        label: 'Complete — Return to Start',
        next: 'opocus-start',
      },
    ],
  },

  {
    id: 'opocus-dispo-pvd',
    type: 'info',
    module: 6,
    title: 'PVD Disposition',
    body: '**Posterior Vitreous Detachment — Outpatient Follow-Up:**\n\n**PVD is Usually Benign:**\n• Common with age (50% by age 50, 75% by age 75)\n• Causes floaters and photopsia (flashes)\n• Does NOT require emergent treatment\n\n**However, 10-15% Have Concurrent Retinal Tear/Detachment:**\n\n**Discharge with:**\n• Ophthalmology follow-up within **24-48 hours**\n• Detailed return precautions\n\n**Return Precautions:**\n• **Sudden increase in floaters**\n• **New flashes of light**\n• **Curtain or shadow in vision**\n• **Decrease in visual acuity**\n\n**Higher Risk for Concurrent RD:**\n• High myopia\n• Prior cataract surgery\n• Family history of RD\n• Prior RD in other eye\n• Trauma mechanism\n\n**Document:** POCUS findings, patient counseled on return precautions. [3][5]',
    citation: [3, 5],
    options: [
      {
        label: 'Complete — Return to Start',
        next: 'opocus-start',
      },
    ],
  },

  {
    id: 'opocus-dispo-vh',
    type: 'info',
    module: 6,
    title: 'Vitreous Hemorrhage Disposition',
    body: '**Vitreous Hemorrhage — Needs Ophthalmology:**\n\n**Why Urgent:**\n• Cannot visualize retina = cannot rule out retinal tear/detachment\n• VH may be from traction on retinal vessel during RD\n• Dense VH with acute vision loss = ophthalmology consult\n\n**Disposition by Severity:**\n\n| VH Severity | Retina Visible? | Disposition |\n|-------------|-----------------|-------------|\n| Mild | Yes, can see | Outpatient ophtho 24-48h |\n| Moderate | Partially | Urgent ophtho same day |\n| Dense | No | Emergent ophtho consult |\n\n**Causes to Consider:**\n• Diabetic retinopathy\n• Retinal tear with vessel disruption\n• Posterior vitreous detachment\n• Trauma\n• Retinal vein occlusion\n\n**Patient Instructions:**\n• Keep head elevated (allows blood to layer inferiorly)\n• Avoid strenuous activity\n• Urgent ophthalmology follow-up [1][3][5]',
    citation: [1, 3, 5],
    options: [
      {
        label: 'Complete — Return to Start',
        next: 'opocus-start',
      },
    ],
  },

  {
    id: 'opocus-dispo-rupture',
    type: 'info',
    module: 6,
    title: 'Globe Rupture — Emergent',
    body: '**⚠️ GLOBE RUPTURE = SURGICAL EMERGENCY ⚠️**\n\n**Immediate Actions:**\n\n1. **STOP any eye manipulation**\n2. **Rigid eye shield** — tape to forehead, do NOT press on orbit\n3. **NPO** — patient will need OR\n4. **Antiemetics** — prevent vomiting which increases IOP\n5. **Pain control** — avoid crying/straining\n6. **Update tetanus**\n7. **Broad-spectrum antibiotics** — prevent endophthalmitis\n   • Vancomycin 1g IV + Ceftazidime 2g IV\n   • Or Levofloxacin 750mg IV if history of rapid surgery\n8. **Emergent ophthalmology consultation**\n\n**Do NOT:**\n• Apply any pressure to the eye\n• Apply eye patch (use rigid shield)\n• Attempt to remove foreign body\n• Check IOP\n• Instill eye drops\n\n**CT Orbit:**\n• Thin-cut CT to assess extent, IOFB\n• No MRI if metallic FB suspected\n\n**Prognosis depends on:** Wound location, extent, presenting vision [2][7]',
    citation: [2, 7],
    treatment: {
      firstLine: {
        drug: 'Vancomycin + Ceftazidime',
        dose: 'Vancomycin 1g + Ceftazidime 2g',
        route: 'IV',
        frequency: 'Once (pre-op)',
        duration: 'Single dose before OR',
        notes: 'Prevent endophthalmitis. Cover gram-positive and gram-negative organisms including Pseudomonas.',
      },
      alternative: {
        drug: 'Levofloxacin',
        dose: '750mg',
        route: 'IV',
        frequency: 'Once',
        duration: 'Single dose pre-op',
        notes: 'Alternative if rapid surgery anticipated. Excellent ocular penetration.',
      },
      monitoring: 'NPO status for OR, antiemetic effectiveness, pain control. Ophthalmology will manage postoperatively.',
    },
    options: [
      {
        label: 'Complete — Return to Start',
        next: 'opocus-start',
      },
    ],
  },

  {
    id: 'opocus-dispo-normal',
    type: 'info',
    module: 6,
    title: 'Normal Ocular POCUS',
    body: '**Normal Ocular Ultrasound:**\n\n**Findings:**\n• Normal anterior chamber depth\n• Lens in normal position\n• Vitreous anechoic (no hemorrhage, no detachment)\n• Retina adherent to globe wall\n• ONSD within normal limits\n\n**Clinical Correlation:**\n• POCUS normal does NOT exclude all pathology\n• Small peripheral retinal tears may be missed\n• Subtle CRAO may appear normal on standard B-scan\n• Corneal pathology requires slit lamp\n\n**If Vision Loss Persists:**\n• Formal ophthalmology evaluation\n• Consider other causes: optic neuritis, cortical vision loss, CRAO, NAION\n\n**Documentation:**\n• Document structures assessed\n• Note normal findings\n• Include ONSD measurement if obtained\n\n**Disposition:**\n• Depends on clinical context\n• Normal POCUS with persistent symptoms = outpatient ophthalmology referral [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Complete — Return to Start',
        next: 'opocus-start',
      },
    ],
  },

];

export const OCULAR_POCUS_MODULE_LABELS = [
  'Technique',
  'Normal Anatomy',
  'RD vs PVD',
  'Vitreous Hemorrhage',
  'ONSD / ICP',
  'Trauma & CRAO',
];

export const OCULAR_POCUS_CITATIONS: Citation[] = [
  { num: 1, text: 'ACEP Sonoguide. Ocular Ultrasound. 2024.' },
  { num: 2, text: 'ACEP Now. Point-of-Care Ocular Ultrasound in the ED. 2023.' },
  { num: 3, text: 'POCUS 101. Ocular Ultrasound Made Easy. 2024.' },
  { num: 4, text: 'Core EM. ONSD for Elevated ICP. 2024.' },
  { num: 5, text: 'EMRA Ultrasound Guide. Eye Emergencies. 2024.' },
  { num: 6, text: 'StatPearls. Retinal Detachment. 2024.' },
  { num: 7, text: 'EB Medicine. Ocular Emergencies in the ED. 2024.' },
  { num: 8, text: 'Dubourg J, et al. Ultrasonography of optic nerve sheath diameter for ICP. Intensive Care Med. 2011.' },
  { num: 9, text: 'Robba C, et al. Optic nerve sheath diameter measured sonographically as non-invasive estimator of ICP. Intensive Care Med. 2018.' },
  { num: 10, text: 'Padayachy LC, et al. Optic nerve sheath diameter threshold for ICP in children. Childs Nerv Syst. 2016.' },
  { num: 11, text: 'EyeWiki. Central Retinal Artery Occlusion. 2024.' },
];
