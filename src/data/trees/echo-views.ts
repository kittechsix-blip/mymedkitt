// MedKitt — Basic Echo Views Consult
// Stepwise approach to acquiring the 5 essential emergency echocardiography views.
// 5 modules: Overview → PLAX → PSAX → Apical 4-Chamber → Subcostal/IVC
// Based on ACEP Emergency Echocardiography Guidelines and ASE Recommendations.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const ECHO_VIEWS_CRITICAL_ACTIONS = [
  { text: 'PLAX view: "3 L\'s" rule - Parasternal Long axis should have Left ventricle on Left side of screen', nodeId: 'echo-plax' },
  { text: 'D-sign (septal flattening) in PSAX: pressure overload during systole = PE, volume overload during diastole', nodeId: 'echo-psax-assess' },
  { text: 'McConnell sign: RV free wall akinesis WITH apical sparing - highly specific for acute PE', nodeId: 'echo-a4c-assess' },
  { text: 'A4C RV:LV ratio: RV = LV suggests moderate dilation, RV > LV suggests severe dilation (massive PE)', nodeId: 'echo-a4c-assess' },
  { text: 'Subcostal view BEST for visualizing pericardial effusion (liver provides acoustic window)', nodeId: 'echo-subcostal-assess' },
  { text: 'Tamponade physiology: RA systolic collapse (sensitive), RV diastolic collapse (specific)', nodeId: 'echo-subcostal-assess' },
  { text: 'IVC interpretation: <2.1 cm with >50% collapse = low CVP (volume responsive)', nodeId: 'echo-ivc' },
  { text: 'IVC interpretation: >2.1 cm with <50% collapse = elevated CVP (volume overload/RV failure)', nodeId: 'echo-ivc' },
  { text: 'EPSS measurement for quantitative LV function assessment when visual estimation insufficient', nodeId: 'echo-summary' },
];

export const ECHO_VIEWS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: OVERVIEW
  // =====================================================================

  {
    id: 'echo-views-start',
    type: 'info',
    module: 1,
    title: 'Basic Emergency Echo Views',
    body: '**Focused cardiac ultrasound (FoCUS)** provides rapid assessment of:\n\n• Global cardiac function (LV squeeze)\n• Pericardial effusion / tamponade\n• RV size and strain (PE evaluation)\n• Volume status (IVC assessment)\n\nThe **5 essential views** in emergency echo:\n1. Parasternal Long Axis (PLAX)\n2. Parasternal Short Axis (PSAX)\n3. Apical 4-Chamber (A4C)\n4. Subcostal 4-Chamber\n5. IVC (from subcostal)\n\n**Probe:** Phased-array cardiac transducer (2–5 MHz)\n**Patient position:** Supine or left lateral decubitus',
    images: [
      { src: 'images/echo-views/focus-overview.png', alt: 'Overview diagram showing the 4 basic FoCUS views mapped to probe positions on a human torso', caption: 'The 4 basic FoCUS views: PLAX (upper left), PSAX (upper right), Subxiphoid (lower left), Apical 4-Chamber (lower right). (Patrick J. Lynch, Wikimedia Commons)' },
      { src: 'images/echo-views/probe.png', alt: 'Phased-array cardiac ultrasound transducer (S4-2)', caption: 'Phased-array cardiac probe (2–5 MHz) — the standard transducer for all FoCUS views.' },
      { src: 'images/echo-views/clock-diagram.png', alt: 'Clock diagram showing probe indicator directions for each FoCUS view', caption: 'Probe indicator directions by view: PLAX ~4 o\'clock, PSAX ~8 o\'clock, Subxiphoid/A4C ~9 o\'clock, IVC ~12 o\'clock.' },
    ],
    citation: [1, 2],
    next: 'echo-plax',
  },

  // =====================================================================
  // MODULE 2: PARASTERNAL LONG AXIS (PLAX)
  // =====================================================================

  {
    id: 'echo-plax',
    type: 'info',
    module: 2,
    title: 'Parasternal Long Axis (PLAX)',
    body: '**Position:** Left sternal border, 3rd–4th intercostal space\n**Indicator:** Toward right shoulder (or left hip in some conventions)\n\n**Structures visualized:**\n• Left ventricle (LV)\n• Left atrium (LA)\n• Mitral valve (MV)\n• Aortic valve (AV) and root\n• Right ventricular outflow tract (RVOT)\n• Pericardium\n\n**Remember the 3 L\'s:** Parasternal **L**ong axis should have the **L**eft ventricle on the **L**eft side of the screen.',
    images: [
      { src: 'images/echo-views/plax-labeled.png', alt: 'Parasternal long axis ultrasound with labeled structures alongside cardiac anatomy cross-section', caption: 'PLAX view: LV, LA, mitral valve, aortic valve, RVOT, and interventricular septum. (Patrick J. Lynch, Wikimedia Commons, Modified)' },
      { src: 'images/echo-views/plax-mmode.jpg', alt: 'Parasternal long axis M-mode echocardiogram showing mitral valve motion and ventricular dimensions', caption: 'PLAX M-mode — used for EPSS measurement, LV dimensions, and ventricular function assessment. (Public domain)' },
    ],
    citation: [2, 3],
    next: 'echo-plax-assess',
  },

  {
    id: 'echo-plax-assess',
    type: 'info',
    module: 2,
    title: 'PLAX Assessment',
    body: '**Key findings to assess:**\n\n**1. Pericardial effusion**\n• Anechoic stripe between epicardium and pericardium\n• Posterior effusion most common location\n• Size: small (<10mm), moderate (10–20mm), large (>20mm)\n\n**2. LV function**\n• Visual estimation of global squeeze\n• [EPSS measurement](#/info/epss-measurement) for quantitative assessment\n• Normal EF: walls move in >50% during systole\n\n**3. RV size**\n• RVOT should be <2/3 of LV diameter\n• Enlarged RV suggests right heart strain\n\n**4. Aortic root**\n• Normally <4 cm\n• Look for dissection flap if indicated\n\n**5. Wall motion abnormalities**\n• Regional hypokinesis suggests ischemia',
    citation: [2, 3],
    next: 'echo-psax',
  },

  // =====================================================================
  // MODULE 3: PARASTERNAL SHORT AXIS (PSAX)
  // =====================================================================

  {
    id: 'echo-psax',
    type: 'info',
    module: 3,
    title: 'Parasternal Short Axis (PSAX)',
    body: '**From PLAX:** Rotate probe 90° clockwise\n**Indicator:** Toward left shoulder\n\n**Multiple levels (fan through):**\n\n**1. Base (aortic valve level)**\n• "Mercedes-Benz sign" — aortic valve with 3 cusps\n• See LA, RA, RVOT, TV\n\n**2. Mitral valve level**\n• "Fish mouth" appearance of MV opening\n\n**3. Papillary muscle level**\n• Two papillary muscles visible\n• Best level for assessing LV function\n• LV should appear circular ("O" shape)\n\n**4. Apex**\n• Smallest cavity, look for apical thrombus',
    images: [{ src: 'images/echo-views/psax-anatomy.png', alt: 'Parasternal short axis transverse cross-section anatomy with labeled structures alongside ultrasound image at papillary muscle level', caption: 'PSAX at papillary muscle level — LV should appear circular ("O" shape). RV wraps around LV anteriorly.' }],
    citation: [2, 3],
    next: 'echo-psax-assess',
  },

  {
    id: 'echo-psax-assess',
    type: 'info',
    module: 3,
    title: 'PSAX Assessment',
    body: '**Key findings to assess:**\n\n**1. D-sign (septal flattening)**\n• Normal LV is circular ("O" shape)\n• Pressure overload → D-shape (RV pressure pushes septum)\n• Seen in massive PE, pulmonary hypertension\n• Flattening during systole = pressure overload\n• Flattening during diastole = volume overload\n\n**2. Wall motion**\n• All walls should contract symmetrically\n• Regional hypokinesis/akinesis → coronary territory infarction\n\n**3. LV function**\n• Watch the "squeeze" at papillary muscle level\n• Walls should thicken and move inward\n\n**4. RV size**\n• Compare RV to LV — RV wraps around LV\n• Enlarged RV suggests right heart strain',
    citation: [2, 4],
    next: 'echo-a4c',
  },

  // =====================================================================
  // MODULE 4: APICAL 4-CHAMBER (A4C)
  // =====================================================================

  {
    id: 'echo-a4c',
    type: 'info',
    module: 4,
    title: 'Apical 4-Chamber (A4C)',
    body: '**Position:** Cardiac apex (mid-clavicular line, 5th–6th ICS)\n**Indicator:** Toward patient\'s left flank (3 o\'clock)\n**Technique:** Probe nearly horizontal, pointing toward right shoulder\n\n**Structures visualized (all 4 chambers):**\n• Left ventricle (LV) — apex at top of screen\n• Right ventricle (RV) — to the left of LV on screen\n• Left atrium (LA)\n• Right atrium (RA)\n• Mitral valve (MV)\n• Tricuspid valve (TV)\n• Interatrial and interventricular septa',
    images: [{ src: 'images/echo-views/a4c-anatomy.png', alt: 'Apical 4-chamber long-axis anatomical cross-section with labeled structures alongside ultrasound image showing all four chambers', caption: 'A4C view: all 4 chambers, mitral and tricuspid valves. Apex at top of screen, RV to the left of LV.' }],
    citation: [2, 3],
    next: 'echo-a4c-assess',
  },

  {
    id: 'echo-a4c-assess',
    type: 'info',
    module: 4,
    title: 'A4C Assessment',
    body: '**Key findings to assess:**\n\n**1. RV:LV ratio**\n• Normal: RV < 0.6 × LV size\n• RV = LV suggests moderate RV dilation\n• RV > LV suggests severe RV dilation (massive PE)\n\n**2. McConnell sign**\n• RV free wall akinesis WITH apical sparing\n• Highly specific for acute PE\n• The apex "winks" while the rest of RV doesn\'t move\n\n**3. TAPSE (tricuspid annular plane systolic excursion)**\n• M-mode through lateral tricuspid annulus\n• Normal ≥17 mm\n• <17 mm = RV dysfunction\n\n**4. Global LV function**\n• Visual estimation of ejection fraction\n• Compare to A2C view for comprehensive assessment\n\n**5. Pericardial effusion**\n• May see circumferential effusion from this view\n• RA/RV diastolic collapse = tamponade physiology',
    citation: [2, 4, 5],
    next: 'echo-subcostal',
  },

  // =====================================================================
  // MODULE 5: SUBCOSTAL AND IVC
  // =====================================================================

  {
    id: 'echo-subcostal',
    type: 'info',
    module: 5,
    title: 'Subcostal 4-Chamber',
    body: '**Position:** Just below xiphoid process\n**Technique:** Probe nearly flat against abdomen, angled toward left shoulder\n**Indicator:** Toward patient\'s left\n\n**When to use:**\n• Poor parasternal/apical windows (COPD, obesity, ventilated patients)\n• Best view for pericardial effusion (liver provides acoustic window)\n• Required view for IVC assessment\n\n**Structures visualized:**\n• All 4 chambers (RV is closest to probe)\n• Liver (provides excellent acoustic window)\n• Pericardium (between heart and liver)',
    images: [{ src: 'images/echo-views/subxiphoid-view.png', alt: 'Subxiphoid 4-chamber view showing liver, right ventricle, left ventricle, and atria on ultrasound with labeled anatomy diagram', caption: 'Subxiphoid view: liver provides acoustic window. RV is closest to probe (nearest transducer = top of screen).' }],
    citation: [1, 2],
    next: 'echo-subcostal-assess',
  },

  {
    id: 'echo-subcostal-assess',
    type: 'info',
    module: 5,
    title: 'Subcostal Assessment',
    body: '**Key findings:**\n\n**1. Pericardial effusion**\n• Often the BEST view for posterior effusion\n• Look for anechoic stripe between heart and liver\n• Effusion will be between epicardium and bright pericardial line\n\n**2. Tamponade physiology**\n• RA systolic collapse (very sensitive)\n• RV diastolic collapse (very specific)\n• Swinging heart in large effusion\n\n**3. Global cardiac function**\n• Often easier to see in patients with poor windows\n\n**Pitfall:** Pericardial fat pad can mimic effusion — fat is slightly echogenic, effusion is anechoic.',
    citation: [1, 4],
    next: 'echo-ivc',
  },

  {
    id: 'echo-ivc',
    type: 'info',
    module: 5,
    title: 'IVC Assessment',
    body: '**From subcostal view:** Rotate probe to visualize IVC entering RA\n**Orientation:** Longitudinal view of IVC\n\n**Measure:**\n1. IVC diameter (2–3 cm from RA junction)\n2. Respiratory variation (sniff test or quiet breathing)\n\n**Interpretation:**\n\n| IVC Diameter | Collapse | Estimated CVP |\n|--------------|----------|---------------|\n| <2.1 cm | >50% | 0–5 mmHg (low) |\n| <2.1 cm | <50% | 5–10 mmHg |\n| >2.1 cm | >50% | 5–10 mmHg |\n| >2.1 cm | <50% | 10–20 mmHg (elevated) |\n\n**Clinical applications:**\n• Plethoric IVC (>2.1 cm, <50% collapse) → elevated RA pressure, volume overload, RV failure, tamponade\n• Collapsing IVC → likely volume responsive\n\n**Pitfall:** IVC assessment less reliable in mechanically ventilated patients.',
    images: [{ src: 'images/echo-views/ivc-labeled.png', alt: 'Ultrasound showing IVC entering the right atrium with hepatic vein labeled', caption: 'IVC view from subcostal: measure diameter 2–3 cm from RA junction. Hepatic vein confluence visible.' }],
    citation: [4, 5],
    next: 'echo-summary',
  },

  {
    id: 'echo-summary',
    type: 'result',
    module: 5,
    title: 'Emergency Echo Summary',
    body: '**FOCUSED CARDIAC ULTRASOUND CHECKLIST:**\n\n☐ **Pericardial effusion** — PLAX, subcostal (best)\n☐ **LV function** — PLAX, PSAX, A4C (visual + EPSS)\n☐ **RV size/strain** — A4C (RV:LV ratio, McConnell sign)\n☐ **Volume status** — IVC (diameter + collapse)\n\n**Red flags requiring immediate text:**\n• Large pericardial effusion with tamponade physiology\n• Severely dilated RV with hypotension (massive PE)\n• Severely reduced LV function with cardiogenic shock\n• Plethoric IVC with signs of volume overload\n\n**For quantitative LV assessment:**\n• [EPSS Measurement](#/info/epss-measurement)\n• [Echo-EPSS Consult](#/consult/echo-epss)',
    images: [{ src: 'images/echo-views/better-views-tips.png', alt: 'Tips for better echo views: use more jelly, apply pressure, circular pattern to find window, lateral decubitus position', caption: 'Getting better views: more gel, firm pressure, circular probe motion to find the acoustic window, and left lateral decubitus to bring heart anterior.' }],
    recommendation: 'Complete 5-view focused cardiac ultrasound. Integrate findings with clinical presentation. Formal echocardiography recommended for complex cases or when findings significantly change management.',
    confidence: 'recommended',
    citation: [1, 2, 3, 4, 5],
  },

];

export const ECHO_VIEWS_NODE_COUNT = ECHO_VIEWS_NODES.length;

// -------------------------------------------------------------------
// Module Labels
// -------------------------------------------------------------------

export const ECHO_VIEWS_MODULE_LABELS = [
  'Overview',
  'PLAX',
  'PSAX',
  'Apical 4-Chamber',
  'Subcostal/IVC',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const ECHO_VIEWS_CITATIONS: Citation[] = [
  { num: 1, text: 'American College of Emergency Physicians. Emergency Echocardiography: Policy Statement. ACEP. 2017.' },
  { num: 2, text: 'Lang RM, Badano LP, Mor-Avi V, et al. Recommendations for Cardiac Chamber Quantification by Echocardiography in Adults. J Am Soc Echocardiogr. 2015;28(1):1-39.' },
  { num: 3, text: 'Moore CL, Rose GA, Tayal VS, et al. Focused Cardiac Ultrasound in the Emergent Setting. J Am Soc Echocardiogr. 2002;15(7):684-91.' },
  { num: 4, text: 'Expert Round Table on Echocardiography in ICU. International Consensus Statement on Training Standards for Advanced Critical Care Echocardiography. Intensive Care Med. 2014;40(5):654-66.' },
  { num: 5, text: 'Rudski LG, Lai WW, Afilalo J, et al. Guidelines for the Echocardiographic Assessment of the Right Heart in Adults. J Am Soc Echocardiogr. 2010;23(7):685-713.' },
];

// Keep the old export for backwards compatibility but mark as deprecated
export const echoViewsConsult = {
  id: 'echo-views',
  title: 'Basic Emergency Echocardiography Views',
  nodes: ECHO_VIEWS_NODES,
};

export default echoViewsConsult;
