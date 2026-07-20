// MedKitt — Epigastric Pain / Dyspepsia Hub (Rule-In / Rule-Out Engine, type: 'hub')
//
// "It's just my stomach / heartburn" is a classic dangerous undifferentiated complaint.
// Epigastric pain is where inferior MI, aortic catastrophe, mesenteric ischemia, perforation,
// pancreatitis, and Boerhaave all masquerade as indigestion.
//
// 5-Module rule-in/rule-out skeleton (matches abdominal-pain-hub / chest-pain-hub template):
//   1. Sick Check
//   2. Rule In / Rule Out — per-differential chains: entry -> gate(s) -> verdict
//      (excluded verdicts loop back to dysp-triage; confirmed verdicts link out to deep-dive)
//   3. Rescue / Reassess
//   4. Imaging
//   5. Disposition
//
// EBM-only citations. Decision instruments (Alvarado, BISAP, Glasgow-Blatchford, HEART) live
// in the bottom toolbar and are named in the nodes.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const ACUTE_DYSPEPSIA_EPIGASTRIC_HUB_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Sick Check
  // ============================================================
  {
    id: 'dysp-start',
    type: 'info',
    module: 1,
    title: 'Epigastric Pain / Dyspepsia — Sick Check First',
    body: '**\u26A0\uFE0F "Just indigestion" is where killers hide. 5 DO NOT MISS:**\n1. **Inferior / atypical ACS** \u2014 epigastric pain + diaphoresis / dyspnea / nausea. **Get an ECG first.**\n2. **Aortic catastrophe** \u2014 dissection (tearing pain, BP differential) or ruptured AAA (age \u226550, back/flank, pulsatile mass, syncope).\n3. **Mesenteric ischemia** \u2014 pain out of proportion to exam, AF / vascular disease; normal lactate does NOT exclude early.\n4. **Perforated viscus** \u2014 rigid peritonitic abdomen, free air (PUD is the classic source).\n5. **Boerhaave** \u2014 forceful vomiting \u2192 severe epigastric / lower-chest pain \u00B1 subcutaneous emphysema.\n\n**First 60 seconds:**\n- **General appearance** \u2014 still + quiet (peritoneal) vs writhing (colic), diaphoretic, gray, end-of-bed ill?\n- **Vitals trend** \u2014 tachycardia, hypotension, fever, narrow pulse pressure, hypoxia.\n- **The 4 screening questions:** (1) Any chest pressure, diaphoresis, or dyspnea? (2) Pain radiate to back / tearing? (3) Pain out of proportion to exam? (4) Forceful vomiting before the pain?\n\n**If ANY of:** hypotension, altered, peritonitic abdomen, pulsatile mass, ischemic ECG, lactate >4 \u2014 **resuscitate in parallel with the workup.** Bay 1, two large-bore IVs, monitor, ECG in <10 min, type and screen, lactate. Do not funnel a sick patient down a "dyspepsia" pathway.\n\n**If stable + protecting airway:** go to Rule In / Rule Out.',
    citation: [1, 2],
    next: 'dysp-triage',
    summary: 'Gestalt sick check + vitals + ECG-first mindset. If unstable: resuscitate in parallel with workup.',
    safetyLevel: 'critical',
  },

  // ============================================================
  // Module 2 — Rule In / Rule Out
  // ============================================================
  {
    id: 'dysp-triage',
    type: 'question',
    module: 2,
    title: 'Rule In / Rule Out — Pick the Differential',
    body: 'Work the dangerous causes to an explicit verdict, one at a time. Each differential walks its instrument (ECG, US, score, or imaging) to **excluded**, **test further**, or **rule in + treat**. Excluded loops back here for the next differential.',
    options: [
      { label: 'Cardiac / ACS (inferior MI mimic)', description: 'Epigastric pain + diaphoresis / dyspnea; ECG first', next: 'dysp-cardiac-entry', urgency: 'critical' },
      { label: 'Aortic catastrophe (dissection / AAA)', description: 'Tearing/back pain, BP differential, age \u226550 pulsatile', next: 'dysp-aorta-entry', urgency: 'critical' },
      { label: 'Mesenteric ischemia', description: 'Pain out of proportion; AF / vascular / postprandial', next: 'dysp-mesenteric-entry', urgency: 'critical' },
      { label: 'Perforated viscus (PUD)', description: 'Rigid abdomen, free air, sepsis physiology', next: 'dysp-perf-entry', urgency: 'critical' },
      { label: 'Boerhaave / esophageal rupture', description: 'Forceful vomiting + subcut emphysema (Mackler triad)', next: 'dysp-boerhaave-entry', urgency: 'critical' },
      { label: 'Acute pancreatitis (epigastric band)', description: 'Lipase >3\u00D7 ULN + classic pain; BISAP severity', next: 'dysp-panc-entry', urgency: 'urgent' },
      { label: 'Upper GI bleed masked as dyspepsia', description: 'Melena / coffee-ground emesis; Glasgow-Blatchford', next: 'dysp-gib-entry', urgency: 'urgent' },
      { label: 'Biliary (RUQ overlap)', description: 'Murphy / fever / jaundice; US + labs', next: 'dysp-biliary-entry', urgency: 'urgent' },
      { label: 'None fit — likely PUD / gastritis / GERD, stable', description: 'Initial bundle + reassess', next: 'dysp-rescue' },
    ],
    citation: [1, 2, 3],
    summary: 'Pick the most acute differential; walk its instrument to an explicit verdict. Excluded loops back.',
    safetyLevel: 'critical',
  },

  // -------------------- CARDIAC / ACS --------------------
  {
    id: 'dysp-cardiac-entry',
    type: 'question',
    module: 2,
    title: 'Cardiac Mimic — ECG Gate',
    body: '**Get a 12-lead ECG within 10 minutes on every middle-aged-or-older patient with epigastric pain**, especially with diaphoresis, dyspnea, nausea, or exertional onset. Inferior MI classically presents as "indigestion." A single normal ECG + troponin does NOT clear ACS \u2014 serial testing or a validated pathway (HEART) is required.',
    options: [
      { label: 'STE (esp. inferior II/III/aVF), or high-risk ACS story / rising troponin', description: 'Treat as ACS \u2014 activate pathway', next: 'dysp-cardiac-verdict', urgency: 'critical' },
      { label: 'ECG non-ischemic + low-risk story (HEART low)', description: 'ACS low probability \u2014 move on', next: 'dysp-cardiac-excluded', urgency: 'routine' },
    ],
    citation: [4],
    summary: 'ECG in <10 min. Inferior STE / high-risk story = ACS pathway; non-ischemic + HEART-low = low probability.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-cardiac-verdict',
    type: 'result',
    module: 2,
    title: 'Acute Coronary Syndrome — Treat',
    body: '**Inferior STEMI:** open [STEMI](#/tree/stemi). ST elevation II/III/aVF \u2014 get **right-sided leads (V4R)**; RV infarction needs fluid loading and **nitroglycerin is contraindicated** if RV involved. Aspirin 325 mg chewed, activate cath lab.\n\n**NSTEMI / unstable angina:** open [NSTEMI](#/tree/nstemi). Aspirin, anticoagulation, risk-stratify (HEART / GRACE), serial troponin, cardiology.\n\n**Myocarditis mimic** (younger, viral prodrome, diffuse changes): open [Myocarditis](#/tree/myocarditis).',
    recommendation: 'ECG-driven ACS pathway. Inferior MI \u2192 V4R, no nitrate if RV. ASA 325 chewed. Serial troponin if NSTEMI.',
    citation: [4],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'dysp-cardiac-excluded',
    type: 'result',
    module: 2,
    title: 'ACS — Low Probability',
    body: 'A non-ischemic ECG with a low-risk story (HEART low, normal/negative troponin per your accelerated pathway) makes ACS unlikely as the driver. **Do not clear ACS on a single ECG in a diabetic, elderly, or female patient with a convincing story** \u2014 use serial troponin + repeat ECG.\n\nReturn to the hub for the next differential.',
    recommendation: 'ACS low probability by ECG + accelerated pathway; serial troponin if the story stays concerning.',
    citation: [4],
    next: 'dysp-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- AORTIC CATASTROPHE --------------------
  {
    id: 'dysp-aorta-entry',
    type: 'question',
    module: 2,
    title: 'Aortic Catastrophe — Dissection / AAA Gate',
    body: 'Epigastric / back pain can be aortic. **Dissection:** abrupt tearing pain, inter-arm BP differential, pulse deficit, widened mediastinum. **AAA:** age \u226550 + back/flank pain \u2014 bedside aorta US is ~98% sensitive for AAA presence; a pulsatile mass has poor sensitivity (~50%), so its absence does not rule out AAA.',
    options: [
      { label: 'Tearing/back pain + BP differential, OR aorta \u22653 cm + symptoms / unstable', description: 'Aortic emergency \u2014 treat', next: 'dysp-aorta-verdict', urgency: 'critical' },
      { label: 'No dissection features, aorta <3 cm / low suspicion', description: 'Aortic emergency excluded \u2014 move on', next: 'dysp-aorta-excluded', urgency: 'routine' },
    ],
    citation: [5, 6],
    summary: 'Dissection features or aorta \u22653 cm + symptoms = treat. <3 cm + no dissection features = excluded.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-aorta-verdict',
    type: 'result',
    module: 2,
    title: 'Aortic Emergency — Treat',
    body: '**Ruptured / symptomatic AAA:** open [Aortic Aneurysm](#/tree/aortic-aneurysm). Two large-bore IVs, **type and CROSS 4-6 units**, **permissive hypotension (SBP 70-90)**, vascular surgery + IR now; do NOT delay for CT if unstable with a bedside AAA.\n\n**Aortic dissection:** open [Aortic Dissection](#/tree/aortic-dissection). **Rate before pressure** \u2014 esmolol / labetalol to HR ~60 BEFORE a vasodilator; CTA chest/abdomen/pelvis; cardiothoracic surgery. **Do NOT anticoagulate or give antiplatelets** if dissection is the leading diagnosis.',
    recommendation: 'AAA \u2192 type/cross, permissive hypotension, vascular+IR before CT if unstable. Dissection \u2192 rate before pressure + CTA, no anticoagulation.',
    citation: [5, 6],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'dysp-aorta-excluded',
    type: 'result',
    module: 2,
    title: 'Aortic Emergency — Excluded',
    body: 'No tearing pain / BP differential and a normal bedside aorta make an aortic catastrophe unlikely. **Document aortic diameter and the absence of dissection features.** If the pain is migratory or the mediastinum is wide on CXR, image with CTA regardless of aortic diameter.\n\nReturn to the hub for the next differential.',
    recommendation: 'Aortic emergency excluded; document diameter + absence of dissection features; CTA if features emerge.',
    citation: [5, 6],
    next: 'dysp-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- MESENTERIC ISCHEMIA --------------------
  {
    id: 'dysp-mesenteric-entry',
    type: 'question',
    module: 2,
    title: 'Mesenteric Ischemia — Pretest Probability Gate',
    body: 'There is **no validated exclusion score** \u2014 this is a pretest-probability + CTA diagnosis. Suspect it with pain out of proportion to a benign exam plus an embolic source (AF, recent MI, valve disease) or vascular risk / postprandial "food fear." **A normal lactate does NOT rule it out early** \u2014 lactate rises only after transmural infarction.',
    options: [
      { label: 'Pain out of proportion + embolic/vascular risk', description: 'High suspicion \u2014 CTA now', next: 'dysp-mesenteric-verdict', urgency: 'critical' },
      { label: 'Low suspicion, benign exam, no vascular risk', description: 'Mesenteric ischemia unlikely \u2014 move on', next: 'dysp-mesenteric-excluded', urgency: 'routine' },
    ],
    citation: [7],
    summary: 'Pretest probability + CTA. Normal lactate does not exclude. High suspicion = image now.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-mesenteric-verdict',
    type: 'result',
    module: 2,
    title: 'Mesenteric Ischemia — Image + Treat',
    body: 'Open [Mesenteric Ischemia](#/tree/mesenteric-ischemia).\n\n**Next 5 minutes:**\n- **CTA mesenteric (arterial + venous phases)** \u2014 do not delay for renal function unless eGFR <30; the diagnosis is more dangerous than the contrast.\n- Vascular surgery + IR early \u2014 endovascular or open intervention within hours.\n- Broad-spectrum antibiotics (transmural ischemia \u2192 bacterial translocation).\n- Fluid resuscitation, NPO, anticoagulation per vascular service (heparin gtt for embolic / venous thrombotic).',
    recommendation: 'CTA now, vascular + IR early, heparin per vascular. Normal lactate does not exclude \u2014 image anyway.',
    citation: [7],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'dysp-mesenteric-excluded',
    type: 'result',
    module: 2,
    title: 'Mesenteric Ischemia — Low Probability',
    body: 'With a benign exam, no vascular / embolic risk, and pain that fits the exam, mesenteric ischemia is unlikely and does not warrant immediate CTA. **Do not anchor on "gastritis" in an AF patient with severe pain and minimal findings** \u2014 if that picture emerges, come back and image.\n\nReturn to the hub for the next differential.',
    recommendation: 'Low probability; no immediate CTA. Re-image if out-of-proportion pain or vascular risk emerges.',
    citation: [7],
    next: 'dysp-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- PERFORATED VISCUS --------------------
  {
    id: 'dysp-perf-entry',
    type: 'question',
    module: 2,
    title: 'Perforated Viscus — Peritonitis Gate',
    body: 'Rigid / board-like abdomen + sepsis physiology + free air = perforation until proven otherwise. **Perforated peptic ulcer** is the classic epigastric source (sudden severe pain, often on an NSAID). Free air on upright CXR is ~75% sensitive; CT with IV contrast is more sensitive and finds the source.',
    options: [
      { label: 'Peritoneal signs + sepsis, or free air on imaging', description: 'Perforated viscus \u2014 surgery now', next: 'dysp-perf-verdict', urgency: 'critical' },
      { label: 'Soft abdomen, no peritoneal signs, no free air', description: 'Perforation unlikely \u2014 move on', next: 'dysp-perf-excluded', urgency: 'routine' },
    ],
    citation: [8],
    summary: 'Peritonitis + sepsis or free air = perforation pathway; soft abdomen = unlikely.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-perf-verdict',
    type: 'result',
    module: 2,
    title: 'Perforated Viscus — Surgical Emergency',
    body: '**Emergent surgical consult \u2014 do not delay for confirmatory CT if the patient is septic with peritoneal signs.** The CT can run in parallel.\n\n**Next 5 minutes:**\n- Two large-bore IVs, LR/NS 1-2 L bolus, type and CROSS.\n- Broad-spectrum antibiotics within 1 h: **piperacillin-tazobactam 4.5 g IV**, OR **ceftriaxone 2 g IV + metronidazole 500 mg IV**.\n- IV PPI, NPO, NG tube if obstructive features, Foley + UOP.\n- Upright CXR (free air) or CT abdomen/pelvis with IV contrast (more sensitive, finds source).\n- Reverse anticoagulation if surgery imminent; do not withhold analgesia.',
    recommendation: 'Emergent surgery, broad-spectrum abx within 1 h, IV PPI, CT in parallel, reverse anticoagulation.',
    citation: [8],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'dysp-perf-excluded',
    type: 'result',
    module: 2,
    title: 'Perforated Viscus — Unlikely',
    body: 'A soft, non-peritonitic abdomen without free air makes perforation unlikely at this moment. **Peritonitis can evolve** \u2014 if the exam changes on reassessment, come back and treat as perforation.\n\nReturn to the hub for the next differential.',
    recommendation: 'Perforation unlikely now; re-examine and re-image if peritoneal signs evolve.',
    citation: [8],
    next: 'dysp-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- BOERHAAVE --------------------
  {
    id: 'dysp-boerhaave-entry',
    type: 'question',
    module: 2,
    title: 'Boerhaave / Esophageal Rupture — Mackler Gate',
    body: '**Mackler triad:** forceful vomiting \u2192 severe lower-chest / epigastric pain \u2192 subcutaneous emphysema (crepitus in neck/chest). Often follows retching, alcohol, or an eating binge. High mortality if delayed \u2014 minutes count. Look for Hamman crunch, pleural effusion (often left), pneumomediastinum on CXR.',
    options: [
      { label: 'Vomiting + severe chest/epigastric pain + subcut emphysema / pneumomediastinum', description: 'Boerhaave \u2014 treat', next: 'dysp-boerhaave-verdict', urgency: 'critical' },
      { label: 'No forceful-vomiting history, no emphysema / mediastinal air', description: 'Boerhaave unlikely \u2014 move on', next: 'dysp-boerhaave-excluded', urgency: 'routine' },
    ],
    citation: [9],
    summary: 'Mackler triad (vomiting + pain + subcut emphysema). Water-soluble contrast CT confirms.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-boerhaave-verdict',
    type: 'result',
    module: 2,
    title: 'Boerhaave — Surgical Emergency',
    body: '**Time-critical \u2014 mortality climbs sharply after ~24 h.**\n\n**Next 5 minutes:**\n- **CT chest/abdomen with water-soluble oral contrast** (Gastrografin) \u2014 avoid barium if perforation suspected.\n- **Broad-spectrum antibiotics + antifungal** within 1 h (mediastinitis): piperacillin-tazobactam \u00B1 fluconazole.\n- IV PPI, strict NPO, IV fluids, analgesia, antiemetic.\n- **Emergent thoracic / surgical consult** \u2014 operative repair vs endoscopic stent depending on timing and stability.\n- Admit to ICU.',
    recommendation: 'Water-soluble contrast CT, broad-spectrum abx + antifungal within 1 h, NPO + PPI, emergent thoracic surgery, ICU.',
    citation: [9],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'dysp-boerhaave-excluded',
    type: 'result',
    module: 2,
    title: 'Boerhaave — Unlikely',
    body: 'No forceful-vomiting history and no subcutaneous emphysema / mediastinal air make esophageal rupture unlikely. Keep it alive if there is a hard vomiting history with pain out of proportion \u2014 a normal plain CXR does not exclude an early contained perforation.\n\nReturn to the hub for the next differential.',
    recommendation: 'Boerhaave unlikely; image with water-soluble contrast if the vomiting-then-pain story is strong.',
    citation: [9],
    next: 'dysp-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- PANCREATITIS --------------------
  {
    id: 'dysp-panc-entry',
    type: 'question',
    module: 2,
    title: 'Pancreatitis — Atlanta + BISAP Gate',
    body: '**Atlanta diagnosis needs 2 of 3:** (1) classic pain (epigastric, band-like, radiates to back, better leaning forward), (2) **lipase >3\u00D7 ULN**, (3) imaging consistent with pancreatitis. If diagnosed, open **BISAP** in the toolbar to triage severity (ICU vs floor).',
    options: [
      { label: 'Meets Atlanta criteria (2 of 3)', description: 'Resuscitate, score severity (BISAP)', next: 'dysp-panc-verdict', urgency: 'urgent' },
      { label: 'Lipase normal, pain not classic', description: 'Pancreatitis unlikely \u2014 move on', next: 'dysp-panc-excluded', urgency: 'routine' },
    ],
    citation: [10],
    summary: 'Atlanta 2-of-3 (lipase >3x ULN). BISAP for severity. Normal lipase + atypical pain = unlikely.',
    safetyLevel: 'warning',
  },
  {
    id: 'dysp-panc-verdict',
    type: 'result',
    module: 2,
    title: 'Acute Pancreatitis — Treat',
    body: 'Open [Acute Pancreatitis](#/tree/acute-pancreatitis).\n\n**Next 5 minutes:**\n- **Goal-directed fluids \u2014 LR preferred over NS** (less SIRS); target UOP 0.5-1 mL/kg/h.\n- Labs: lipase, CBC, CMP, **triglycerides, ionized calcium, magnesium**, lactate, type and screen.\n- RUQ US for a gallstone source (commonest etiology).\n- Analgesia (opioid PRN), antiemetic; **early enteral nutrition as tolerated** (the old "NPO for days" approach is obsolete).\n- **BISAP** at presentation to triage ICU vs floor. Watch for hypocalcemia (saponification).',
    recommendation: 'LR resuscitation + early enteral nutrition + BISAP severity. Image for gallstone source; check ionized calcium.',
    citation: [10],
    safetyLevel: 'warning',
    confidence: 'definitive',
  },
  {
    id: 'dysp-panc-excluded',
    type: 'result',
    module: 2,
    title: 'Pancreatitis — Unlikely',
    body: 'A normal lipase with atypical pain makes acute pancreatitis unlikely (lipase >3\u00D7 ULN is one of the Atlanta pillars). If pain is classic but lipase is borderline, imaging can still satisfy the criteria.\n\nReturn to the hub for the next differential.',
    recommendation: 'Pancreatitis unlikely with normal lipase + atypical pain; image if the story is classic.',
    citation: [10],
    next: 'dysp-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- UPPER GI BLEED --------------------
  {
    id: 'dysp-gib-entry',
    type: 'question',
    module: 2,
    title: 'Upper GI Bleed — Glasgow-Blatchford Gate',
    body: 'Dyspepsia can be the herald of a bleeding ulcer. Ask about **melena, coffee-ground emesis, hematemesis, NSAID use, and anticoagulation**; check for pallor / tachycardia / orthostasis and do a rectal exam. Open **Glasgow-Blatchford (GBS)** in the toolbar \u2014 **GBS 0-1 identifies very-low-risk patients** who may be managed as outpatients; use **AIMS65** for mortality risk.',
    options: [
      { label: 'Unstable, active bleeding, or GBS \u22652 / high AIMS65', description: 'Resuscitate + admit + endoscopy', next: 'dysp-gib-verdict', urgency: 'critical' },
      { label: 'No bleeding signs, GBS 0-1, stable', description: 'Bleed unlikely / very low risk \u2014 move on', next: 'dysp-gib-excluded', urgency: 'routine' },
    ],
    citation: [11],
    summary: 'Glasgow-Blatchford. GBS 0-1 = outpatient candidate; GBS \u22652 / unstable = resuscitate + endoscopy.',
    safetyLevel: 'critical',
  },
  {
    id: 'dysp-gib-verdict',
    type: 'result',
    module: 2,
    title: 'Upper GI Bleed — Resuscitate + Treat',
    body: 'Open [GI Bleed Hub](#/tree/gi-bleed-hub).\n\n**Next 5 minutes:**\n- Two large-bore IVs, monitor, **type and cross**; transfuse to a **restrictive threshold (Hb ~7 g/dL**, higher if active ischemia).\n- **IV PPI**; if cirrhotic add **octreotide + ceftriaxone**; GI for endoscopy within 24 h (urgently if unstable).\n- Reverse anticoagulation / correct coagulopathy per severity.\n- Massive transfusion protocol if exsanguinating; consider IR / surgery for uncontrolled bleeding.',
    recommendation: 'Two large-bore IVs, type and cross, restrictive transfusion (Hb ~7), IV PPI \u00B1 octreotide/ceftriaxone if cirrhotic, endoscopy.',
    citation: [11],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'dysp-gib-excluded',
    type: 'result',
    module: 2,
    title: 'Upper GI Bleed — Very Low Risk',
    body: 'No melena / hematemesis, a normal rectal exam, and a **Glasgow-Blatchford score of 0-1** identify patients at very low risk who may be considered for outpatient management \u2014 provided vitals are normal, Hb is reassuring, and follow-up is reliable. Any melena with anemia, hemodynamic change, or anticoagulation raises the risk tier.\n\nReturn to the hub if another differential remains open.',
    recommendation: 'GBS 0-1 + no bleeding signs = very low risk; document rectal exam / Hb before clearing.',
    citation: [11],
    next: 'dysp-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // -------------------- BILIARY (RUQ overlap) --------------------
  {
    id: 'dysp-biliary-entry',
    type: 'question',
    module: 2,
    title: 'Biliary — RUQ / Epigastric Overlap Gate',
    body: 'Epigastric pain radiating to the right shoulder, worse after fatty meals, points biliary. Recognize the spectrum: **biliary colic** (intermittent, afebrile, normal labs) \u2192 **cholecystitis** (Murphy + fever + leukocytosis, US wall thickening) \u2192 **cholangitis** (Charcot: fever + jaundice + RUQ pain). Get CBC, CMP, **lipase** (overlap with pancreatitis), and RUQ US.',
    options: [
      { label: 'Cholangitis (Charcot/Reynolds) or septic cholecystitis', description: 'Antibiotics + urgent source control', next: 'dysp-biliary-verdict', urgency: 'critical' },
      { label: 'Cholecystitis \u2014 Murphy + US findings', description: 'Antibiotics + surgical consult', next: 'dysp-biliary-verdict', urgency: 'urgent' },
      { label: 'Biliary colic \u2014 afebrile, normal labs, normal US', description: 'PO challenge \u2192 outpatient surgery referral', next: 'dysp-biliary-excluded', urgency: 'routine' },
    ],
    citation: [12],
    summary: 'RUQ US + labs incl lipase. Cholangitis = abx + ERCP; cholecystitis = abx + surgery; colic = outpatient.',
    safetyLevel: 'warning',
  },
  {
    id: 'dysp-biliary-verdict',
    type: 'result',
    module: 2,
    title: 'Biliary Disease — Treat',
    body: '**Cholangitis** is a surgical/GI emergency: broad-spectrum antibiotics (pip-tazo, or ceftriaxone + metronidazole), blood cultures \u00D7 2, **GI consult for emergent ERCP within 24 h** \u2014 source control is the priority.\n\n**Acute cholecystitis:** antibiotics + surgical consult for cholecystectomy; percutaneous cholecystostomy if a poor surgical candidate.\n\n**Choledocholithiasis:** elevated bili + dilated CBD \u2192 MRCP / ERCP.',
    recommendation: 'Cholangitis \u2192 abx within 1 h + urgent ERCP. Cholecystitis \u2192 abx + surgery. Check lipase in all epigastric/RUQ pain.',
    citation: [12],
    safetyLevel: 'warning',
    confidence: 'definitive',
  },
  {
    id: 'dysp-biliary-excluded',
    type: 'result',
    module: 2,
    title: 'Biliary Colic — Outpatient',
    body: 'Uncomplicated biliary colic: afebrile, normal WBC, normal LFTs, normal or gallstones-only US. **PO challenge**, analgesia, antiemetic, and outpatient cholecystectomy referral with strict return precautions (fever, jaundice, persistent pain).\n\n**Do not discharge epigastric pain without checking lipase** (pancreatitis overlap) and LFTs if any jaundice.\n\nReturn to the hub if another differential remains open.',
    recommendation: 'Biliary colic \u2192 PO challenge + outpatient surgery referral. Confirm lipase and LFTs are clean first.',
    citation: [12],
    next: 'dysp-triage',
    safetyLevel: 'warning',
    confidence: 'recommended',
  },

  // ============================================================
  // Module 3 — Rescue / Reassess
  // ============================================================
  {
    id: 'dysp-rescue',
    type: 'info',
    module: 3,
    title: 'Initial Bundle — Undifferentiated Dyspepsia',
    body: 'No life-threat ruled in; the picture fits **PUD / gastritis / GERD / functional dyspepsia**. Standard ED bundle while labs / ECG cook:\n\n- **ECG + single troponin** if any above-the-belt features or age/risk (do this before committing to "dyspepsia").\n- **IV access, monitor** if any concern; PO route fine if well.\n- **Antiemetic:** [Ondansetron 4 mg IV](#/drug/ondansetron/nausea-vomiting) (QT caution).\n- **Empiric acid suppression:** PPI (e.g., pantoprazole 40 mg IV/PO). A "GI cocktail" (antacid \u00B1 viscous lidocaine) response does NOT rule out cardiac pain \u2014 do not use it as a diagnostic test.\n- **Focused labs:** CBC, CMP, **lipase**, lactate if any sepsis concern, LFTs if RUQ/jaundice, type and screen if surgical concern, troponin/ECG for above-the-belt features.\n- **Ask about NSAIDs, alcohol, anticoagulation, prior ulcer, weight loss / dysphagia (alarm features).**\n\n**Reassess at 60-90 minutes** for bundle response + emerging red flags.',
    citation: [1, 3],
    next: 'dysp-reassess',
    summary: 'ECG/troponin if any above-belt risk + antiemetic + PPI + focused labs incl lipase. GI cocktail is NOT a cardiac rule-out. Reassess 60-90 min.',
    safetyLevel: 'warning',
  },
  {
    id: 'dysp-reassess',
    type: 'question',
    module: 3,
    title: 'Reassess at 60-90 Minutes',
    body: 'Re-examine: pain trend, vitals trend, exam evolution, ECG/troponin/lab results back, ability to tolerate PO.',
    options: [
      { label: 'Improving + benign exam + labs/ECG unremarkable + tolerating PO', description: 'Likely benign dyspepsia \u2014 discharge bundle', next: 'dysp-disposition' },
      { label: 'Equivocal \u2014 needs imaging or extended observation', description: 'Imaging decision', next: 'dysp-imaging', urgency: 'urgent' },
      { label: 'New peritoneal signs / vitals worsening / ischemic ECG / new red flag', description: 'STOP \u2014 return to Rule In / Rule Out', next: 'dysp-triage', urgency: 'critical' },
      { label: 'Specific diagnosis confirmed on labs/imaging', description: 'Leave the hub \u2014 work that deep-dive consult', next: 'dysp-disposition' },
    ],
    citation: [1, 3],
    summary: 'Improving = discharge; equivocal = image/observe; new red flag = STOP and return to triage.',
  },

  // ============================================================
  // Module 4 — Imaging
  // ============================================================
  {
    id: 'dysp-imaging',
    type: 'info',
    module: 4,
    title: 'Imaging Decision Cheat-Sheet',
    body: 'Do NOT image every case of dyspepsia. Choose by suspected pathology:\n\n**ECG (not imaging, but first):** every older / at-risk patient with epigastric pain \u2014 rules in the cardiac mimic.\n\n**CT abdomen/pelvis with IV contrast (oral not required):** suspected perforation, older/unexplained pain, sepsis with abdominal source, SBO.\n\n**CT angiography:** [Mesenteric Ischemia](#/tree/mesenteric-ischemia) (arterial + venous), dissection extending into abdomen, AAA rupture concern if stable.\n\n**CT chest/abdomen with WATER-SOLUBLE oral contrast:** suspected [Boerhaave](#/tree/esophageal-food-bolus) / esophageal perforation (avoid barium).\n\n**US (first-line):** RUQ / biliary; bedside aorta.\n\n**Upright CXR:** free air under diaphragm (~75% sensitive), pneumomediastinum (Boerhaave).\n\n**Endoscopy (GI, usually admitted / urgent outpatient):** upper GI bleed, refractory ulcer, alarm features (weight loss, dysphagia, anemia, age >60 new dyspepsia).',
    citation: [13],
    next: 'dysp-disposition',
    summary: 'ECG first; CT-IV for perforation/older; CTA for vascular; water-soluble contrast CT for Boerhaave; US for biliary/aorta.',
  },

  // ============================================================
  // Module 5 — Disposition
  // ============================================================
  {
    id: 'dysp-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Defer to the deep-dive consult\u2019s admit criteria once a phenotype is committed. The framework below applies to undifferentiated / benign-appearing dyspepsia.',
    options: [
      { label: 'Admit \u2014 diagnosis-driven (ACS, perforation, ischemia, pancreatitis, GI bleed, cholangitis)', description: 'Admit per the deep-dive consult\u2019s criteria', next: 'dysp-dispo-admit', urgency: 'urgent' },
      { label: 'Observe \u2014 partial response, awaiting labs/ECG/imaging, equivocal', description: 'ED observation + serial exams', next: 'dysp-dispo-observe' },
      { label: 'Discharge \u2014 benign dyspepsia, controlled, tolerating PO, no red flags, reliable', description: 'Standard discharge bundle', next: 'dysp-dispo-discharge' },
    ],
    citation: [1, 3],
    summary: 'Admit per deep-dive criteria; observe if equivocal; discharge if benign + PO + no flags + reliable.',
  },
  {
    id: 'dysp-dispo-admit',
    type: 'result',
    module: 5,
    title: 'Admit',
    body: 'Admit for a specific diagnosis (ACS, perforation, mesenteric ischemia, moderate/severe pancreatitis, upper GI bleed, cholangitis, Boerhaave), surgical need, uncontrolled pain, inability to tolerate PO, or hemodynamic concern.\n\n**Service:** Cardiology / Medicine (ACS); Surgery (perforation, Boerhaave, complicated biliary, mesenteric ischemia, ruptured AAA); GI (variceal / severe upper GI bleed, ERCP-needing biliary); ICU (severe pancreatitis, septic shock, unstable GI bleed, mesenteric ischemia with shock, aortic emergency pre-OR).\n\n**Handoff:** onset time, ECG + troponin trend, exam (peritoneal signs?), lab trend (esp. lipase, Hb), imaging + findings, antibiotics given (drug + time), fluids given + response, anticoagulation / last meal / allergies / prior ulcer or surgery, vitals trend.',
    recommendation: 'Admit per deep-dive criteria; match service to dominant diagnosis; ICU for instability; standard handoff.',
    citation: [1, 3],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'dysp-dispo-observe',
    type: 'result',
    module: 5,
    title: 'Observe — Partial Response or Pending Workup',
    body: 'ED observation when: equivocal exam + intermediate concern, awaiting serial troponin / imaging, pain partially controlled with social/safety barriers, reliable patient.\n\n**Protocol:** serial exam q2-4h (same provider when possible), documented each time; serial troponin + repeat ECG if any cardiac concern; repeat lactate at 2-4 h if any sepsis concern; continue PPI / analgesia / antiemetic.\n\n**Escalate** (imaging or admit) for new peritoneal signs, rising troponin, labs trending wrong, vitals destabilizing, or subjectively worse. **Discharge** with strict recheck if pain resolving, exam unchanged/improving, troponin/labs favorable, tolerating PO, reliable follow-up.',
    recommendation: 'Obs + serial exams + serial troponin if cardiac concern; escalate if worsening, discharge with recheck if improving.',
    citation: [3],
    confidence: 'recommended',
  },
  {
    id: 'dysp-dispo-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge — Benign Dyspepsia Checklist',
    body: 'Before discharge: (1) pain reduced to acceptable/baseline, (2) **ECG + troponin reassuring** if there was any above-the-belt feature or cardiac risk, (3) **tolerating PO** (PO challenge), (4) vitals normal, (5) no new exam findings on recheck, (6) lipase / relevant labs reviewed, (7) **written return precautions**, (8) **primary-care / GI follow-up** for empiric therapy + alarm-feature workup.\n\n**Empiric plan for likely PUD / GERD:** PPI, avoid NSAIDs / alcohol, **test-and-treat H. pylori** as outpatient. **Alarm features requiring GI referral / endoscopy:** age >60 new-onset dyspepsia, weight loss, dysphagia/odynophagia, anemia / GI bleeding, persistent vomiting, family history of GI cancer.\n\n**Return precautions:** chest pressure / diaphoresis / dyspnea, black or bloody stool / blood in vomit, worsening or radiating-to-back pain, fever, persistent vomiting, fainting. Counsel: "Indigestion can be the first sign of something dangerous \u2014 if you get chest pressure, black stools, or the pain changes, come back immediately."',
    recommendation: 'Discharge only after cardiac features cleared, PO tolerated, no alarm features; empiric PPI + H. pylori test-and-treat + GI follow-up.',
    citation: [1, 3],
    confidence: 'definitive',
  },
];

export const ACUTE_DYSPEPSIA_EPIGASTRIC_HUB_CRITICAL_ACTIONS = [
  { text: 'ECG within 10 min on every older / at-risk patient with epigastric pain \u2014 inferior MI masquerades as indigestion.', nodeId: 'dysp-cardiac-entry' },
  { text: 'Tearing/back pain, BP differential, or age \u226550 + back pain \u2192 bedside aorta US + consider dissection before calling it "dyspepsia".', nodeId: 'dysp-aorta-entry' },
  { text: 'Pain out of proportion + AF / vascular risk \u2192 CTA for mesenteric ischemia. A normal lactate does NOT rule it out.', nodeId: 'dysp-mesenteric-entry' },
  { text: 'A GI cocktail response does NOT rule out cardiac pain. Never use symptom relief as a diagnostic test.', nodeId: 'dysp-rescue' },
];

export const ACUTE_DYSPEPSIA_EPIGASTRIC_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Macaluso CR, McNamara RM. Evaluation and management of acute abdominal pain in the emergency department. Int J Gen Med. 2012;5:789-797.' },
  { num: 2, text: 'Cervellin G, Mora R, Ticinesi A, et al. Epidemiology and outcomes of acute abdominal pain in a large urban Emergency Department. Ann Transl Med. 2016;4(19):362.' },
  { num: 3, text: 'Moayyedi P, Lacy BE, Andrews CN, et al. ACG and CAG Clinical Guideline: Management of Dyspepsia. Am J Gastroenterol. 2017;112(7):988-1013.' },
  { num: 4, text: 'Amsterdam EA, Wenger NK, Brindis RG, et al. 2014 AHA/ACC Guideline for the Management of Patients With Non-ST-Elevation Acute Coronary Syndromes. Circulation. 2014;130(25):e344-e426.' },
  { num: 5, text: 'Hiratzka LF, Bakris GL, Beckman JA, et al. 2010 ACCF/AHA Guidelines for the Diagnosis and Management of Patients With Thoracic Aortic Disease. Circulation. 2010;121(13):e266-e369.' },
  { num: 6, text: 'Chaikof EL, Dalman RL, Eskandari MK, et al. The Society for Vascular Surgery practice guidelines on the care of patients with an abdominal aortic aneurysm. J Vasc Surg. 2018;67(1):2-77.' },
  { num: 7, text: 'Bala M, Kashuk J, Moore EE, et al. Acute mesenteric ischemia: guidelines of the World Society of Emergency Surgery. World J Emerg Surg. 2017;12:38.' },
  { num: 8, text: 'S\u00F8reide K, Thorsen K, Harrison EM, et al. Perforated peptic ulcer. Lancet. 2015;386(10000):1288-1298.' },
  { num: 9, text: 'Brinster CJ, Singhal S, Lee L, et al. Evolving options in the management of esophageal perforation. Ann Thorac Surg. 2004;77(4):1475-1483.' },
  { num: 10, text: 'Crockett SD, Wani S, Gardner TB, Falck-Ytter Y, Barkun AN. American Gastroenterological Association Institute Guideline on Initial Management of Acute Pancreatitis. Gastroenterology. 2018;154(4):1096-1101.' },
  { num: 11, text: 'Stanley AJ, Laine L, Dalton HR, et al. Comparison of risk scoring systems for patients presenting with upper gastrointestinal bleeding: international multicentre prospective study. BMJ. 2017;356:i6432.' },
  { num: 12, text: 'Yokoe M, Hata J, Takada T, et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholecystitis / cholangitis. J Hepatobiliary Pancreat Sci. 2018;25(1):41-54.' },
  { num: 13, text: 'American College of Radiology. ACR Appropriateness Criteria: Acute Nonlocalized Abdominal Pain. J Am Coll Radiol. 2018;15(11S):S217-S231.' },
];

export const ACUTE_DYSPEPSIA_EPIGASTRIC_HUB_NODE_COUNT = ACUTE_DYSPEPSIA_EPIGASTRIC_HUB_NODES.length;
export const ACUTE_DYSPEPSIA_EPIGASTRIC_HUB_MODULE_LABELS = [
  'Sick Check',
  'Rule In / Rule Out',
  'Rescue / Reassess',
  'Imaging',
  'Disposition',
];
