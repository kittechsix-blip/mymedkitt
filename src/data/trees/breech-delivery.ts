// MedKitt — Breech Delivery
// Stepwise approach to recognizing breech presentation and managing imminent vaginal breech delivery in the ED.
// 6 modules: Recognition → Classification → Delivery Decision → Vaginal Breech — Body → Aftercoming Head → Complications & Postpartum
// Source: ACOG Committee Opinion 745 (2018), RCOG Green-top Guideline No. 20b (2017), Tintinalli's 9e, Hannah (Term Breech Trial 2000), NRP 8e

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const BREECH_DELIVERY_CRITICAL_ACTIONS = [
  { text: 'Call OB and Pediatrics/NICU STAT — breech is an obstetric emergency in the ED', nodeId: 'breech-callhelp' },
  { text: 'Transfer to OR if any chance of C-section — do NOT commit to vaginal if alternative exists', nodeId: 'breech-decision' },
  { text: 'Check for cord prolapse immediately (footling breech = 20% risk)', nodeId: 'breech-cord-check' },
  { text: 'HANDS OFF THE BREECH — no traction until scapulae visible', nodeId: 'breech-hands-off' },
  { text: 'Let body deliver spontaneously to umbilicus via maternal pushing only', nodeId: 'breech-body-spontaneous' },
  { text: 'Keep back ANTERIOR — rotate if it turns posterior', nodeId: 'breech-back-anterior' },
  { text: 'Løvset maneuver for nuchal arms — 180° rotation delivers each arm', nodeId: 'breech-lovset' },
  { text: 'Mauriceau-Smellie-Veit for aftercoming head — finger in mouth, shoulders between fingers', nodeId: 'breech-msv' },
  { text: 'Never pull on the fetal body — causes head extension and entrapment', nodeId: 'breech-head-entrapment' },
];

export const BREECH_DELIVERY_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'breech-start',
    type: 'info',
    module: 1,
    title: 'Breech Delivery',
    body: '[Breech Delivery Steps Summary](#/info/breech-delivery-summary) — quick-reference checklist of maneuvers.\n[Types of Breech](#/info/breech-types-atlas) — Frank, Complete, Footling (with images).\n[Maneuvers Atlas](#/info/breech-maneuvers-atlas) — Pinard, Løvset, Mauriceau-Smellie-Veit.\n\n**Breech presentation** = fetal buttocks or feet present first. Occurs in **3–4% of term pregnancies** and up to **25% at 28 weeks** — most convert spontaneously. [1][2]\n\n**This is an obstetric emergency in the ED.** Since the Term Breech Trial (Hannah 2000), planned **Cesarean delivery is the preferred mode** for term breech — associated with significantly lower perinatal mortality and serious morbidity. [3][4]\n\n**When you face an ED breech:**\n• Fetus head-down? Proceed as standard delivery ([Precipitous Delivery](#/tree/precip-delivery))\n• Fetus breech + delivery NOT imminent → transfer to OR for C-section\n• Fetus breech + delivery IMMINENT (body already delivering) → manage vaginally with maneuvers below\n\nThis consult walks through:\n• Module 1: Recognition — when to suspect breech\n• Module 2: Classification — Frank, Complete, Footling types\n• Module 3: Delivery Decision — C-section vs imminent vaginal\n• Module 4: Vaginal Breech — Delivery of body to umbilicus\n• Module 5: Aftercoming Head — Mauriceau-Smellie-Veit and Burns-Marshall\n• Module 6: Complications & Postpartum',
    citation: [1, 2, 3, 4],
    next: 'breech-suspect',
    summary: 'Breech = fetal buttocks/feet present first. 3-4% at term. C-section preferred; vaginal only if delivery imminent.',
    skippable: true,
  },

  {
    id: 'breech-suspect',
    type: 'info',
    module: 1,
    title: 'When to Suspect Breech',
    body: 'CLINICAL SIGNS SUGGESTING BREECH\n\n• **Fetal heart tones heard above the umbilicus** (normal cephalic = below umbilicus)\n• **Leopold maneuvers:** hard, round head palpable at the fundus (top of uterus)\n• **Irregular softer presenting part** at the pelvic brim (buttocks feel softer than head)\n• **Meconium passage without fetal distress** — physiologic pressure on fetal abdomen\n• **Vaginal exam:** palpation of buttocks, sacrum, feet, or genitalia instead of hard skull\n• **Maternal complaint of subcostal fetal kicking** (feet up near mom\'s ribs)\n\n**CONFIRM WITH BEDSIDE ULTRASOUND** if time permits. POCUS in the ED takes <60 seconds to establish presentation — the single most important piece of imaging in active labor. [1][5]\n\n**POCUS findings:**\n• Vertex (head down): round, hypoechoic skull with midline falx at pelvic inlet\n• Breech: irregular soft tissue, spine extending upward, visible lower limbs at pelvic inlet\n• Transverse lie: spine horizontal, neither head nor breech at inlet',
    citation: [1, 5],
    next: 'breech-pocus-confirm',
    summary: 'HR above umbilicus, head palpable at fundus, soft presenting part — confirm with bedside US in <60 sec',
    images: [
      {
        src: 'images/breech-delivery/hirst-1898-fig136-breech-head.jpg',
        alt: 'Diagram of a breech presentation with the fetal head at the uterine fundus',
        caption: 'Breech presentation: fetal head lies at the uterine fundus (opposite of cephalic). Hirst Obstetrics, 1898 — Public Domain.',
      },
      {
        src: 'images/breech-delivery/smellie-1792-breech-presentation.jpg',
        alt: 'Historical illustration of breech presentation showing fetal buttocks and feet at the cervical os',
        caption: 'Breech presentation — fetal buttocks and feet at the cervix. Smellie, A Sett of Anatomical Tables, 1792 — Public Domain.',
      },
    ],
  },

  {
    id: 'breech-pocus-confirm',
    type: 'question',
    module: 1,
    title: 'Is the Fetus Confirmed Breech?',
    body: 'After POCUS or vaginal exam:\n\n• If vertex confirmed → proceed with standard [Precipitous Delivery](#/tree/precip-delivery)\n• If breech confirmed → continue this consult\n• If transverse lie → **C-section is the only safe option** — vaginal delivery of transverse is not possible without internal version, which is beyond ED scope',
    citation: [1],
    options: [
      {
        label: 'Breech confirmed',
        description: 'Continue — classify breech type next',
        next: 'breech-callhelp',
      },
      {
        label: 'Vertex — go to Precipitous Delivery',
        description: 'Proceed to standard delivery tree',
        next: 'breech-redirect-vertex',
      },
      {
        label: 'Transverse lie — C-section only',
        description: 'Immediate OR/OB — vaginal not possible',
        next: 'breech-transverse',
        urgency: 'critical',
      },
    ],
    summary: 'Breech confirmed → continue. Vertex → standard delivery. Transverse → C-section only.',
  },

  {
    id: 'breech-redirect-vertex',
    type: 'result',
    module: 1,
    title: 'Proceed with Vertex Delivery',
    body: 'POCUS or exam shows vertex presentation. Proceed with the [Precipitous Delivery](#/tree/precip-delivery) consult for standard ED vaginal delivery.',
    recommendation: 'Vertex presentation confirmed — use Precipitous Delivery consult for standard stepwise management.',
    confidence: 'recommended',
  },

  {
    id: 'breech-transverse',
    type: 'result',
    module: 1,
    title: 'Transverse Lie — C-Section',
    body: 'TRANSVERSE LIE\n\nIn transverse lie the fetal long axis is perpendicular to the maternal spine (fetal back horizontal). **Vaginal delivery is not possible** and any attempt risks uterine rupture and fetal death. [2]\n\n**MANAGEMENT:**\n• Stat OB/Anesthesia page\n• Prepare for emergency C-section\n• **Do NOT attempt internal podalic version** — outside ED scope and carries high maternal morbidity\n• If delivery is imminent (bulging membranes, active pushing), consider tocolysis with [Terbutaline](#/drug/terbutaline/tocolysis) 0.25 mg SQ while arranging OR\n• Position in knee-chest or lateral decubitus to reduce cord compression if membranes rupture\n\n**Transverse + ruptured membranes + prolapsed cord is a catastrophic combination — requires immediate C-section.** [1][2]',
    recommendation: 'Transverse lie — immediate C-section. Tocolysis with Terbutaline 0.25 mg SQ if delivery imminent to buy OR time.',
    confidence: 'definitive',
    citation: [1, 2],
    images: [
      {
        src: 'images/breech-delivery/hirst-1898-fig557-combined-version-by-breech.jpg',
        alt: 'Historical illustration of internal podalic version where the fetus is rotated by pulling on the feet',
        caption: 'Combined version by the breech (internal podalic version) — historically performed for transverse lie. OUTSIDE modern ED scope; shown for education. Hirst, 1898 — PD.',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: CLASSIFICATION
  // =====================================================================

  {
    id: 'breech-callhelp',
    type: 'info',
    module: 2,
    title: 'Call for Help — Now',
    body: 'CALL FOR HELP IMMEDIATELY\n\n• **OB STAT** — need OR capability within minutes\n• **Pediatrics / NICU** — neonate is at high risk for resuscitation\n• **Anesthesia** — for possible emergent C-section\n• **Additional nursing** — minimum 2 nurses (one for mom, one for baby)\n\n**CONFIRM OR READINESS:**\n• Anesthesia en route\n• OR suite being prepared\n• Blood bank notified (consider type and crossmatch)\n\n**Even if you plan to deliver vaginally, OB and OR backup must be available.** Breech deliveries can convert to emergencies (head entrapment, cord prolapse, nuchal arms) within minutes — you need surgical rescue capability if anything goes wrong. [1][4]',
    citation: [1, 4],
    next: 'breech-classify',
    summary: 'OB + Peds/NICU + Anesthesia STAT — OR must be available as backup even if delivering vaginally',
  },

  {
    id: 'breech-classify',
    type: 'info',
    module: 2,
    title: 'Classify the Breech Type',
    body: 'THREE MAIN TYPES OF BREECH\n\n**1. FRANK BREECH (50–70% of term breech)**\n• Hips flexed, both knees extended\n• Fetal feet up near face ("pike position")\n• Buttocks present — feels like a smooth oval on exam\n• **Most favorable type for vaginal delivery** — buttocks dilate cervix like a wedge\n\n**2. COMPLETE BREECH (5–10%)**\n• Hips AND knees flexed ("cannonball" or cross-legged)\n• Both buttocks and feet present at the pelvic outlet\n• **Acceptable for vaginal delivery** in select cases\n\n**3. INCOMPLETE (FOOTLING) BREECH (10–40% at term, more common preterm)**\n• One or both hips extended — foot/feet present first\n• **HIGHEST risk of cord prolapse (~20%)**\n• **Relative contraindication to vaginal delivery** — cervix may not dilate fully around the small foot, trapping body/head\n\n**4. KNEELING BREECH (rare)**\n• Hips extended, knees flexed — knees present first\n• Managed like footling\n\n**Critical classification impact:**\n• Frank + Complete → may proceed vaginally IF imminent\n• Footling → C-section strongly preferred (even if delivery seems imminent)\n\n[See Types of Breech Atlas](#/info/breech-types-atlas) for annotated diagrams. [1][2][4][6]',
    citation: [1, 2, 4, 6],
    next: 'breech-imminent',
    summary: 'Frank (50-70%, best) / Complete (5-10%) / Footling (10-40%, high cord prolapse risk — prefer C-section)',
    images: [
      {
        src: 'images/breech-delivery/hirst-1898-fig237-breech-anterior-posterior-positions.jpg',
        alt: 'Classification of breech presentations showing anterior and posterior positions',
        caption: 'Breech presentation classification — anterior and posterior positions. Hirst Obstetrics, 1898 — Public Domain.',
      },
      {
        src: 'images/breech-delivery/hirst-1898-fig234-breech-right-sacroposterior.jpg',
        alt: 'Breech presentation in the right sacroposterior position',
        caption: 'Right sacroposterior breech. Fetal sacrum faces maternal right-posterior — suboptimal; rotate anteriorly before delivery. Hirst, 1898 — PD.',
      },
      {
        src: 'images/breech-delivery/hirst-1898-fig235-breech-left-sacroanterior.jpg',
        alt: 'Breech presentation in the left sacroanterior position',
        caption: 'Left sacroanterior breech — favorable orientation (sacrum forward). Hirst Obstetrics, 1898 — Public Domain.',
      },
    ],
  },

  {
    id: 'breech-imminent',
    type: 'question',
    module: 2,
    title: 'Is Delivery Imminent?',
    body: 'DELIVERY IS IMMINENT IF:\n• Breech is crowning (buttocks or feet visible at introitus)\n• Cervix fully dilated (10 cm) AND mother actively bearing down\n• Body has begun to deliver\n\n**If NOT imminent → emergent C-section is preferred** (better perinatal outcomes per Term Breech Trial). [3]\n\n**If imminent → you must deliver vaginally.** Stopping an active breech delivery is not safe; continue with maneuvers below. [1][4]',
    citation: [1, 3, 4],
    options: [
      {
        label: 'Imminent — deliver vaginally',
        description: 'Body delivering — manage with maneuvers',
        next: 'breech-cord-check',
        urgency: 'critical',
      },
      {
        label: 'Not imminent — OR for C-section',
        description: 'Preferred — C-section has better outcomes',
        next: 'breech-csection',
      },
    ],
    summary: 'Imminent = crowning/body delivering → manage vaginally. Not imminent → C-section preferred.',
  },

  {
    id: 'breech-csection',
    type: 'result',
    module: 2,
    title: 'Transfer for Emergent C-Section',
    body: 'TRANSFER FOR C-SECTION\n\nPer the **Term Breech Trial (Hannah et al., Lancet 2000)**, planned Cesarean delivery for term breech reduces perinatal mortality and serious neonatal morbidity from 5.0% to 1.6% (RR 0.33, NNT ~30). [3]\n\n**SUBSEQUENT COMMITTEE OPINIONS:**\n• **ACOG Committee Opinion 745 (2018):** Cesarean is the preferred mode for most term breech fetuses, with planned vaginal breech delivery considered only in centers with specific protocols and experienced providers. [4]\n• **RCOG Green-top Guideline No. 20b (2017):** Vaginal breech may be offered in selected cases but only in units able to deliver this service safely. [6]\n\n**PRE-TRANSFER MANAGEMENT:**\n• Continuous fetal monitoring (or frequent auscultation)\n• Left lateral tilt to offload IVC\n• IV access × 2, NPO, type and screen\n• Do not rupture membranes\n• Do not attempt manual cephalic version (**ECV** is outside ED scope)\n\n**If delivery becomes imminent during OR prep → return to vaginal delivery module** of this consult. Never force an in-progress breech delivery to stop.',
    recommendation: 'C-section strongly preferred for term breech (Term Breech Trial, ACOG 745, RCOG 20b). Transfer to OR with OB. Continuous monitoring, left lateral tilt, IV access ×2, NPO, type and screen. Do not rupture membranes.',
    confidence: 'definitive',
    citation: [3, 4, 6],
    images: [
      {
        src: 'images/breech-delivery/hirst-1898-fig228-schatz-cephalic-version.jpg',
        alt: 'Illustration of external cephalic version demonstrating manual rotation of the fetus from breech to cephalic presentation',
        caption: 'External cephalic version (Schatz method): offered by OB before term at 36–37 weeks. NOT an ED procedure. Hirst, 1898 — PD.',
      },
    ],
  },

  // =====================================================================
  // MODULE 3: PREPARATION & CORD CHECK
  // =====================================================================

  {
    id: 'breech-cord-check',
    type: 'question',
    module: 3,
    title: 'Immediate Cord Prolapse Check',
    body: 'Perform a sterile vaginal exam **immediately** to rule out cord prolapse.\n\n**Cord prolapse risk by type:**\n• Frank breech: ~0.5%\n• Complete breech: ~5%\n• Footling breech: ~15–20%\n\n**If you palpate a pulsatile cord at or below the presenting part → cord prolapse.** This is a separate emergency — see [Cord Emergencies](#/tree/cord-emergencies).',
    citation: [1, 2],
    options: [
      {
        label: 'No cord palpated',
        description: 'Continue to preparation',
        next: 'breech-prep',
      },
      {
        label: 'Cord palpated — prolapse',
        description: 'Elevate presenting part; see Cord Emergencies',
        next: 'breech-cord-prolapse',
        urgency: 'critical',
      },
    ],
    summary: 'Check for cord prolapse on first exam. Footling = 15-20% risk. If prolapsed → Cord Emergencies consult.',
  },

  {
    id: 'breech-cord-prolapse',
    type: 'result',
    module: 3,
    title: 'Cord Prolapse Management',
    body: 'CORD PROLAPSE WITH BREECH\n\nWhen the cord presents ahead of the fetus, compression during descent can cause rapid fetal hypoxia and death. **This is a true emergency.**\n\n**IMMEDIATE STEPS:**\n1. **Elevate the presenting part** — insert a gloved hand into the vagina and manually push the fetal breech upward, off the cord\n2. **Knee-chest or Trendelenburg position** — relieves cord pressure\n3. **Tocolysis:** [Terbutaline](#/drug/terbutaline/tocolysis) 0.25 mg SQ × 1 to relax the uterus\n4. **Continuous fetal monitoring**\n5. **STAT C-section** — the only definitive treatment\n\n**Do NOT attempt to replace the cord.** Cover with warm saline-soaked gauze to prevent vasospasm from cooling.\n\n**See [Cord Emergencies](#/tree/cord-emergencies) consult for full management.** [1][2]',
    recommendation: 'Cord prolapse + breech = emergency C-section. Elevate presenting part manually, knee-chest/Trendelenburg, Terbutaline 0.25 mg SQ, cover cord with warm saline gauze.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  {
    id: 'breech-prep',
    type: 'info',
    module: 3,
    title: 'Preparation for Vaginal Breech',
    body: 'EQUIPMENT\n• Sterile gloves × 2 pairs\n• Sterile towels, drapes\n• Sterile warm saline (for wrapping fetal body during delivery)\n• Cord clamps × 2\n• Sterile scissors\n• Neonatal warmer — **ON** and prewarming\n• Full [Neonatal Resuscitation](#/tree/neonatal-resus) setup\n• Suction, O2, bag-valve-mask (neonatal)\n\n**PERSONNEL — minimum 4:**\n• **Delivering provider** (you)\n• **Assistant** (OB or second ED provider) — for Løvset rotation and MSV if needed\n• **Nurse 1** — mother (vitals, fundal pressure on cue, IV access)\n• **Nurse/Provider 2** — baby (warmer, NRP if needed)\n\n**MATERNAL POSITIONING:**\n• **Dorsal lithotomy** — feet in stirrups, buttocks at the very edge of the bed\n• Bed at a height that lets you work comfortably\n• Drape the perineum\n• Empty the bladder (straight cath)\n• IV access × 2 large-bore\n• Type and screen blood available',
    citation: [1, 2, 4],
    next: 'breech-episiotomy',
    summary: 'Dorsal lithotomy, buttocks at edge, empty bladder, IV ×2, type and screen, full NRP setup, minimum 4 personnel',
    skippable: true,
  },

  {
    id: 'breech-episiotomy',
    type: 'info',
    module: 3,
    title: 'Episiotomy Consideration',
    body: 'EPISIOTOMY IN VAGINAL BREECH\n\n**Routine episiotomy is NOT recommended** (same as for cephalic delivery).\n\n**Selective episiotomy** may be considered when:\n• Perineum is rigid and obstructing descent\n• After fetal body delivers to umbilicus and additional room is needed for arms or aftercoming head\n• Primigravida with tight introitus\n\n**Timing:** Perform after the buttocks are crowning but before the body delivers — earlier, you cannot see anatomy well; later, you cannot create additional space. [1][2][6]\n\n**If you do not routinely perform episiotomies, skip this step.** The absence of episiotomy does not compromise breech delivery outcomes. Anesthesia may be pudendal block, local infiltration, or existing epidural.',
    citation: [1, 2, 6],
    next: 'breech-hands-off',
    summary: 'Routine episiotomy NOT recommended. Selective if rigid perineum or needed room after umbilical delivery.',
    skippable: true,
  },

  // =====================================================================
  // MODULE 4: VAGINAL BREECH — BODY DELIVERY
  // =====================================================================

  {
    id: 'breech-hands-off',
    type: 'info',
    module: 4,
    title: 'HANDS OFF THE BREECH',
    body: '**THE MOST IMPORTANT RULE IN VAGINAL BREECH DELIVERY: HANDS OFF.**\n\nDo NOT touch the fetus until the scapulae are visible at the introitus.\n\n**WHY "HANDS OFF" MATTERS:**\n• Traction on the body causes the fetal head to **extend** (go from flexed to extended)\n• An extended head cannot pass through the pelvis → **head entrapment** = catastrophic\n• Uterine contractions + maternal pushing alone deliver the body in the correct flexed position\n• Manipulation also risks **nuchal arm** (one or both arms trapped behind the head)\n\n**YOUR JOB:** Watch. Support ONLY by letting the body hang passively. Do NOT pull. Do NOT grip the abdomen (can damage spleen, kidneys, or adrenals — fetal adrenal hemorrhage is a known complication). [1][2][4][6]\n\n**COACH MOTHER:** Strong, sustained pushes with each contraction. Fetal descent happens with maternal effort.',
    citation: [1, 2, 4, 6],
    next: 'breech-body-spontaneous',
    summary: 'HANDS OFF until scapulae visible. Traction → head extension → entrapment. Let uterus and maternal pushing deliver.',
    safetyLevel: 'critical',
  },

  {
    id: 'breech-body-spontaneous',
    type: 'info',
    module: 4,
    title: 'Spontaneous Delivery to Umbilicus',
    body: 'STAGES OF SPONTANEOUS BREECH DESCENT\n\n1. **Buttocks crown and deliver** — sacrum should be anterior (facing the mother\'s symphysis)\n2. **Body delivers to the umbilicus** via maternal pushing\n3. **Legs deliver** — may need Pinard maneuver for frank breech with extended legs (see next node)\n4. **Cord visible and pulsating** — do NOT clamp yet; baby is still oxygenating\n\n**WHAT TO WATCH FOR:**\n• **Back should rotate anteriorly** (fetal sacrum facing mom\'s symphysis). If back rotates posteriorly → gently rotate baby so back is anterior (see [Keep Back Anterior](#/node/breech-back-anterior))\n• **Cord pulsating** = baby perfusing. Avoid cord compression during further maneuvers.\n• **Observe for nuchal arms** — if one arm is seen crossing the face, you will need Løvset maneuver after shoulders present\n\n**Wrap the delivered body in a warm, moist sterile towel.** Prevents hypothermia and gives you a non-slip grip when maneuvers are eventually needed. [1][2]',
    citation: [1, 2],
    next: 'breech-back-anterior',
    summary: 'Buttocks → body to umbilicus via maternal pushing only. Wrap body in warm moist towel. Keep back anterior.',
    images: [
      {
        src: 'images/breech-delivery/hirst-1898-fig238-descent-of-breech.jpg',
        alt: 'Descent of the fetal breech through the maternal pelvic canal',
        caption: 'Spontaneous descent of the breech through the pelvic canal. Hirst Obstetrics, 1898 — Public Domain.',
      },
      {
        src: 'images/breech-delivery/hirst-1898-fig241-breech-rotation-of-hips.jpg',
        alt: 'Mechanism of labor showing internal rotation of the fetal hips during breech delivery',
        caption: 'Internal rotation of the fetal hips during breech descent — the bitrochanteric diameter rotates to the anteroposterior plane. Hirst, 1898 — PD.',
      },
    ],
  },

  {
    id: 'breech-back-anterior',
    type: 'info',
    module: 4,
    title: 'Keep Fetal Back Anterior',
    body: 'KEEP THE FETAL BACK ANTERIOR\n\n**Sacro-anterior position** (fetal sacrum facing mother\'s pubic symphysis) is the safest orientation for breech delivery. It allows:\n• Proper rotation of the shoulders under the pubic arch\n• Head to flex naturally as it delivers over the perineum\n\n**If the back rotates posteriorly** (sacrum facing maternal spine) → head is likely extended and delivery becomes dangerous.\n\n**HOW TO ROTATE:**\n1. Grasp the bony pelvis of the fetus — one hand on each iliac crest (NEVER on the abdomen — abdominal pressure damages spleen, kidneys, adrenals)\n2. Gently rotate so the back comes anterior\n3. Do not use any traction — pure rotation only\n\n**Thumbs on sacrum, fingers on iliac crests = the standard grip for breech manipulation.** Use this same hold for Løvset later. [1][2][6]',
    citation: [1, 2, 6],
    next: 'breech-extended-legs',
    summary: 'Keep back anterior (sacrum to mom\'s symphysis). Grip fetal iliac crests with thumbs on sacrum — NEVER abdomen.',
    safetyLevel: 'warning',
    images: [
      {
        src: 'images/breech-delivery/hirst-1898-fig565-method-of-seizing-breech.jpg',
        alt: 'Illustration showing the proper grip of the fetal pelvis with thumbs on the sacrum and fingers around the iliac crests',
        caption: 'Method of seizing the breech: thumbs on sacrum, fingers wrapping the iliac crests. Never grip the abdomen. Hirst, 1898 — PD.',
      },
    ],
  },

  {
    id: 'breech-extended-legs',
    type: 'question',
    module: 4,
    title: 'Are the Legs Extended? (Frank Breech)',
    body: 'After buttocks deliver and you see the hips, are the legs extended (hips flexed, knees straight — frank breech) or flexed (knees up — complete breech)?\n\n• Complete breech — legs deliver spontaneously\n• Frank breech with extended legs — may need **Pinard maneuver** to flex each leg at the knee and deliver one foot at a time',
    citation: [1, 2],
    options: [
      {
        label: 'Legs flexed — deliver spontaneously',
        description: 'Complete breech — no maneuver needed',
        next: 'breech-umbilicus',
      },
      {
        label: 'Legs extended — Pinard maneuver',
        description: 'Frank breech — flex each leg at knee',
        next: 'breech-pinard',
      },
    ],
    summary: 'Flexed legs (complete) → deliver spontaneously. Extended legs (frank) → Pinard maneuver.',
  },

  {
    id: 'breech-pinard',
    type: 'info',
    module: 4,
    title: 'Pinard Maneuver — Delivering Extended Legs',
    body: 'PINARD MANEUVER\n\nUsed to deliver extended legs in frank breech presentation.\n\n**STEPS:**\n1. **Introduce two fingers** into the vagina alongside one extended fetal leg\n2. **Press behind the knee** (popliteal fossa) — this causes reflex knee flexion\n3. **Sweep the foot laterally** (abduct) and deliver the foot\n4. **Repeat on the contralateral leg**\n\n**Once both feet are out**, the body will continue descent with maternal pushing. Do not pull on the legs. [1][2][6]\n\nNamed after French obstetrician Adolphe Pinard (1844–1934).',
    citation: [1, 2, 6],
    next: 'breech-umbilicus',
    summary: 'Two fingers behind knee → reflex flexion → sweep foot laterally. Repeat other leg. Do not pull.',
  },

  {
    id: 'breech-umbilicus',
    type: 'info',
    module: 4,
    title: 'At the Umbilicus — Check the Cord',
    body: 'ONCE THE UMBILICUS IS DELIVERED\n\n**Bring a loop of cord down gently** — this relieves traction on the cord as the thorax delivers. Do NOT clamp yet — baby is still receiving oxygenated blood.\n\n**ASSESS CORD PULSATION:**\n• Strongly pulsating → baby well-perfused, continue\n• Weakly pulsating or absent → delivery must proceed faster; proceed to arms and head\n\n**NEXT: Shoulders.** With further maternal pushing, the scapulae will appear at the introitus. Once you see the scapulae, you may proceed with arm delivery (Løvset) if needed.\n\n**TIMING AWARE:** From umbilicus to delivery of head, you have **5–10 minutes maximum** before significant fetal hypoxia. Work efficiently. [1][2][4][6]',
    citation: [1, 2, 4, 6],
    next: 'breech-arms-assess',
    summary: 'Loop cord down gently after umbilicus — do NOT clamp. 5-10 min window to deliver head after umbilicus.',
    safetyLevel: 'warning',
  },

  {
    id: 'breech-arms-assess',
    type: 'question',
    module: 4,
    title: 'Arms — Spontaneous or Nuchal?',
    body: 'After the scapulae appear at the introitus, assess the arms:\n\n• **Arms flexed across chest** — will deliver spontaneously with the next contraction (most common)\n• **One or both arms trapped behind head ("nuchal arms")** — must be freed with **Løvset maneuver**\n\nA nuchal arm is recognized by:\n• Elbow visible behind the fetal occiput on either side\n• Inability of body to descend further\n• Arm appears extended upward toward the fetal head',
    citation: [1, 2, 6],
    options: [
      {
        label: 'Arms flexed — spontaneous delivery',
        description: 'Let arms deliver with next contraction',
        next: 'breech-msv',
      },
      {
        label: 'Nuchal arm — Løvset maneuver',
        description: 'Rotate 180° to deliver each arm',
        next: 'breech-lovset',
        urgency: 'urgent',
      },
    ],
    summary: 'Arms flexed → spontaneous. Nuchal arm (elbow above neck) → Løvset maneuver.',
  },

  {
    id: 'breech-lovset',
    type: 'info',
    module: 4,
    title: 'Løvset Maneuver — Delivering Nuchal Arms',
    body: 'LØVSET MANEUVER (pronounced "LOVE-set")\n\n**Rotates the fetal body 180° in each direction to bring each nuchal arm under the pubic arch for delivery.**\n\n**GRIP:** Two hands on fetal pelvis — thumbs on sacrum, fingers wrapped around the iliac crests. **Never grip the abdomen.**\n\n**STEPS (for a nuchal anterior arm):**\n\n1. **Apply gentle downward traction** while rotating the body **180° clockwise** (viewed from below). This brings the previously-posterior arm anteriorly under the pubic arch.\n2. **Sweep the now-anterior arm out:** Two fingers along the humerus, sweep the arm across the face and chest downward. The arm should deliver.\n3. **Reverse rotate 180° counter-clockwise** — this brings the other arm anteriorly under the pubic arch.\n4. **Sweep the second arm out** the same way.\n\n**KEY POINTS:**\n• Rotation must occur during gentle downward traction — otherwise body stays stuck\n• Always sweep the arm across the fetal face/chest — not laterally (risk humerus fracture)\n• Back must remain anterior throughout (rotate the whole body, not just the shoulders) [1][2][6]\n\nNamed after Norwegian obstetrician Jørgen Løvset (1896–1981).',
    citation: [1, 2, 6],
    next: 'breech-msv',
    summary: 'Grip iliac crests, thumbs on sacrum. Rotate 180° CW → sweep arm across chest. Reverse rotate → sweep 2nd arm.',
    safetyLevel: 'warning',
    images: [
      {
        src: 'images/breech-delivery/hirst-1898-fig541-manual-extraction-of-breech.jpg',
        alt: 'Illustration of manual extraction of the fetal breech showing operator grip and body rotation',
        caption: 'Manual extraction of the breech — operator rotates body to deliver each shoulder/arm. Same grip and rotation principle as modern Løvset. Hirst, 1898 — PD.',
      },
    ],
  },

  // =====================================================================
  // MODULE 5: AFTERCOMING HEAD
  // =====================================================================

  {
    id: 'breech-msv',
    type: 'info',
    module: 5,
    title: 'Mauriceau-Smellie-Veit Maneuver',
    body: 'MAURICEAU-SMELLIE-VEIT (MSV) MANEUVER\n\n**The standard technique for delivery of the aftercoming head in vaginal breech.** Keeps the head flexed — the key to avoiding entrapment.\n\n**SETUP:**\n• Let the fetal body "ride" on the operator\'s dominant forearm (face-down, straddling the arm)\n• The body provides natural weight to encourage head flexion\n\n**HAND POSITIONING (this is critical):**\n\n**DOMINANT HAND (body-supporting):**\n• Middle finger into the fetal mouth onto the maxilla (the upper jaw bone, NOT the mandible)\n• Index and ring fingers on the malar/cheek bones\n• **Purpose:** flex the head by gentle pressure on the maxilla\n• **Do NOT pull on the mandible** — can dislocate the jaw\n\n**NON-DOMINANT HAND (shoulder-straddling):**\n• Middle finger on the fetal occiput\n• Index and ring fingers on each scapula/shoulder\n• **Purpose:** apply downward traction on the shoulders\n\n**DELIVERY:**\n1. With the body straddling your arm and the two hands in position, apply **gentle downward traction** while your mouth-finger keeps the head flexed\n2. As the occiput emerges under the symphysis, **elevate the body upward** toward the maternal abdomen\n3. The head delivers — face first sweeps over the perineum last\n\n**ASSISTANT:** Gentle **suprapubic pressure** (from above) to encourage further head flexion if needed. [1][2][4][6]',
    citation: [1, 2, 4, 6],
    next: 'breech-burns-marshall-option',
    summary: 'MSV: Body straddles arm, middle finger in mouth on MAXILLA (not mandible), other hand on shoulders. Downward traction → elevate.',
    safetyLevel: 'critical',
    images: [
      {
        src: 'images/breech-delivery/hirst-1898-fig542-forceps-on-breech.jpg',
        alt: 'Illustration of forceps applied to the aftercoming fetal head during breech delivery, similar to Piper forceps technique',
        caption: 'Forceps on the aftercoming head (Piper-style application) — alternative to MSV when manual head flexion fails. Hirst, 1898 — PD.',
      },
    ],
  },

  {
    id: 'breech-burns-marshall-option',
    type: 'question',
    module: 5,
    title: 'Burns-Marshall as Alternative',
    body: 'Was MSV successful in delivering the aftercoming head?',
    citation: [1, 2],
    options: [
      {
        label: 'Head delivered — continue',
        description: 'Skip to postpartum',
        next: 'breech-complete',
      },
      {
        label: 'Head retained — try Burns-Marshall',
        description: 'Hold ankles, let body arc upward',
        next: 'breech-burns-marshall',
        urgency: 'urgent',
      },
      {
        label: 'Head entrapment — emergency',
        description: 'MSV and Burns-Marshall failed',
        next: 'breech-head-entrapment',
        urgency: 'critical',
      },
    ],
    summary: 'MSV successful → postpartum. Failed → try Burns-Marshall. Still stuck → head entrapment emergency.',
  },

  {
    id: 'breech-burns-marshall',
    type: 'info',
    module: 5,
    title: 'Burns-Marshall Technique',
    body: 'BURNS-MARSHALL TECHNIQUE\n\nAlternative for delivery of the aftercoming head when MSV has not succeeded.\n\n**STEPS:**\n1. **Grasp the fetal ankles** with one hand\n2. **Let the body hang vertically** from the mother\'s perineum — the weight of the body encourages head flexion and descent\n3. **Wait 30–60 seconds** for the occiput to appear under the symphysis — you will see the hairline emerge\n4. Once the occiput is visible, **arc the body upward** (over the maternal abdomen) in a wide slow sweep\n5. The head delivers chin, mouth, nose, forehead, occiput as the body comes up and over\n\n**ASSISTANT:** Suprapubic pressure during the arc to flex the fetal head.\n\n**CAUTION:** Do not rush. Rapid decompression of the head can cause tentorial tears and intracranial hemorrhage. Move the body slowly through the arc. [1][2][6]',
    citation: [1, 2, 6],
    next: 'breech-complete',
    summary: 'Hold ankles, let body hang, wait 30-60 sec, arc body upward slowly over mom\'s abdomen. Slow arc avoids ICH.',
    safetyLevel: 'warning',
  },

  {
    id: 'breech-head-entrapment',
    type: 'info',
    module: 5,
    title: 'Head Entrapment — Last-Resort Maneuvers',
    body: 'HEAD ENTRAPMENT — TRUE EMERGENCY\n\nHead entrapment occurs when the fetal body has delivered but the head remains trapped above the cervix or at the pelvic outlet. **Fetal death in 5–10 minutes without rescue.**\n\n**IMMEDIATE RESCUE OPTIONS — escalate rapidly:**\n\n**1. TOCOLYSIS** (buy time by relaxing uterus)\n• [Terbutaline](#/drug/terbutaline/tocolysis) 0.25 mg SQ OR Nitroglycerin 50–200 mcg IV\n• Works within 1–5 minutes\n\n**2. DÜHRSSEN INCISIONS** (if head trapped above an incompletely dilated cervix — rare now that C-section is preferred)\n• Sharp incisions in the cervix at 2, 6, and 10 o\'clock positions\n• Risk: maternal hemorrhage from cervical branch of uterine artery\n• Requires significant OB expertise — **OB should perform**\n\n**3. SYMPHYSIOTOMY** (last resort — used where C-section unavailable)\n• Surgical division of the pubic symphysis under local anesthesia\n• Creates 2–3 cm additional pelvic diameter\n• Rarely performed in modern US/European EDs\n\n**4. EMERGENCY CESAREAN DELIVERY**\n• Even with fetal body already delivered, C-section to deliver the head IS possible\n• Involves pushing the body back into the uterus transiently or delivering through the uterine incision\n• **OB/OR required** — this is beyond ED solo management\n\n**PREFERRED PATHWAY IN THE MODERN ED:**\n**Tocolysis → OB/Anesthesia STAT → emergent OR for C-section rescue.** Trying multiple vaginal maneuvers without OR backup risks fetal death and maternal injury. [1][2][4][6]',
    citation: [1, 2, 4, 6],
    next: 'breech-complete',
    summary: 'Terbutaline tocolysis → emergent OR for C-section rescue. Dührssen and symphysiotomy are last-resort only.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 6: COMPLICATIONS & POSTPARTUM
  // =====================================================================

  {
    id: 'breech-complete',
    type: 'info',
    module: 6,
    title: 'Delivery Complete — Neonatal Assessment',
    body: 'NEONATAL ASSESSMENT\n\nBreech neonates have a **higher rate of resuscitation needs** than cephalic — even in uncomplicated vaginal breech. Anticipate the need for bag-mask ventilation.\n\n**IMMEDIATE NEONATAL CARE:**\n1. **Clamp and cut cord** (two clamps ~3 cm apart; delayed cord clamping 30–60 sec if vigorous)\n2. **Dry and stimulate** the baby\n3. **APGAR at 1 and 5 minutes**\n4. **Transfer to neonatal warmer**\n5. **If HR <100 or not breathing → initiate [Neonatal Resuscitation](#/tree/neonatal-resus) (NRP)**\n\n**SPECIFIC INJURY ASSESSMENT FOR BREECH NEONATE:**\n• **Brachial plexus palsy** (Erb-Duchenne or Klumpke) — from arm traction during Løvset. Check movement of both arms.\n• **Humerus / clavicle fracture** — palpate both arms for crepitus or pain response\n• **Femur fracture** — palpate both legs\n• **Cephalohematoma / caput** — expected from head compression\n• **Hip dysplasia** (developmental) — common after breech; will need screening exam and US\n• **Genital / scrotal bruising** (males) or **labial bruising** (females) — from pelvic crowning\n• **Adrenal hemorrhage** — suspect if pallor, abdominal distension, hypotension (flank grip damage)\n• **Intracranial hemorrhage** — monitor for seizures, bulging fontanelle, apnea [1][2][4][6]',
    citation: [1, 2, 4, 6],
    next: 'breech-maternal-postpartum',
    summary: 'Higher resus need than cephalic. Check for brachial plexus palsy, fractures, adrenal hemorrhage, ICH.',
  },

  {
    id: 'breech-maternal-postpartum',
    type: 'info',
    module: 6,
    title: 'Maternal Postpartum Management',
    body: 'MATERNAL POSTPARTUM CARE\n\n**PLACENTAL DELIVERY:** Same as [Precipitous Delivery](#/tree/precip-delivery) — gentle cord traction with fundal counter-pressure until placenta delivers.\n\n**UTEROTONIC:**\n• [Oxytocin](#/drug/oxytocin/precipitous delivery) 20 units in 1L NS at 250 mL/hr **after placenta delivers**\n• Breech deliveries have higher postpartum hemorrhage risk due to greater uterine manipulation\n\n**LACERATION ASSESSMENT:**\n• Inspect perineum, vagina, and cervix carefully — breech deliveries have higher laceration rates\n• Repair 1st/2nd degree in ED if comfortable\n• 3rd/4th degree → OB for repair\n• **Cervical lacerations** more common in breech — bimanual inspection after placenta\n\n**MONITORING:**\n• Maternal vitals q15 min × 1 hour\n• Uterine tone (firm vs boggy) — massage until firm\n• Blood loss — quantify with weighing chux\n• PPH = >1000 mL or signs of hypovolemia\n\n**DISPOSITION:**\n• Admit to OB for postpartum observation\n• Neonate to nursery or NICU (based on assessment)\n• Document: times, maneuvers used, APGAR, cord gas if obtained, personnel [1][2][4][8]',
    citation: [1, 2, 4, 8],
    next: 'breech-final',
    summary: 'Oxytocin 20u/L NS @ 250 mL/hr after placenta. Inspect cervix (high lac risk). Monitor q15min × 1hr. Admit to OB.',
  },

  {
    id: 'breech-final',
    type: 'result',
    module: 6,
    title: 'Breech Delivery — Complete',
    body: 'Delivery complete.\n\n**POSTDELIVERY CHECKLIST**\n✓ Neonate assessed — APGAR at 1 and 5 min, brachial plexus exam, limb palpation\n✓ Umbilical cord blood gas (if available)\n✓ Placenta delivered and examined\n✓ Maternal uterine tone firm\n✓ Lacerations addressed\n✓ Oxytocin infusing\n✓ Mother and baby warm\n\n**DISPOSITION**\n• Admit mother to OB service for postpartum observation (minimum 24 h)\n• Admit neonate to nursery or NICU based on clinical status\n• Neonatology to follow for orthopedic/neurologic assessment (developmental hip dysplasia screening, BPI if suspected)\n• If delivered at facility without pediatric capability — arrange neonatal transfer\n\n**DOCUMENTATION**\n• Type of breech (Frank, Complete, Footling)\n• All maneuvers performed with timestamps (Pinard, Løvset, MSV, Burns-Marshall, tocolysis)\n• Estimated blood loss\n• All personnel present\n• Any neonatal complications\n\nBreech deliveries in the ED are high-acuity events. Debrief with the team after — review what went well and what could improve. Consider reporting to hospital OB quality committee. [1][2][4][6]',
    recommendation: 'Breech delivery complete. Admit mom to OB × 24h minimum. Admit neonate to nursery/NICU. Document type of breech, maneuvers used, and timestamps. Screen neonate for brachial plexus palsy, fractures, and hip dysplasia.',
    confidence: 'definitive',
    citation: [1, 2, 3, 4, 6, 8],
  },

];

export const BREECH_DELIVERY_NODE_COUNT = BREECH_DELIVERY_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const BREECH_DELIVERY_MODULE_LABELS = [
  'Recognition',
  'Classification',
  'Preparation & Cord',
  'Body Delivery',
  'Aftercoming Head',
  'Complications & Postpartum',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const BREECH_DELIVERY_CITATIONS: Citation[] = [
  { num: 1, text: 'Desai S, Henderson SO. Labor and Delivery and Their Complications. In: Walls RM, ed. Rosen\'s Emergency Medicine. 9th ed. Elsevier; 2018.' },
  { num: 2, text: 'VanRooyen MJ, Scott JA. Ch 105: Emergency Delivery. Tintinalli\'s Emergency Medicine: A Comprehensive Study Guide. 9th ed. McGraw-Hill; 2020.' },
  { num: 3, text: 'Hannah ME, Hannah WJ, Hewson SA, et al. Planned caesarean section versus planned vaginal birth for breech presentation at term: a randomised multicentre trial. Term Breech Trial Collaborative Group. Lancet. 2000;356(9239):1375-1383. https://pubmed.ncbi.nlm.nih.gov/11052579/' },
  { num: 4, text: 'ACOG Committee Opinion No. 745: Mode of Term Singleton Breech Delivery. Obstet Gynecol. 2018;132(2):e60-e63. https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/08/mode-of-term-singleton-breech-delivery' },
  { num: 5, text: 'Blaivas M, Lyon M, Duggal S. A prospective comparison of supine and prone ultrasound for fetal presentation in the emergency department. Am J Emerg Med. 2006;24(5):534-537.' },
  { num: 6, text: 'RCOG Green-top Guideline No. 20b: Management of Breech Presentation. BJOG. 2017;124(7):e151-e177. https://www.rcog.org.uk/guidance/browse-all-guidance/green-top-guidelines/management-of-breech-presentation-green-top-guideline-no-20b/' },
  { num: 7, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation (NRP). 8th ed. AAP; 2021.' },
  { num: 8, text: 'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186.' },
];
