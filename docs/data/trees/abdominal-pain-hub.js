// MedKitt — Abdominal Pain Hub (EM canonical + GI cross-list, type: 'hub')
//
// 5-Module skeleton per ~/Desktop/claude-brain/patterns/hub-consult-pattern.md v2:
//   1. Sick Check
//   2. Time-Critical Exclusions (8 branches → deep-dive consults)
//   3. Rescue / Initial Bundle + Reassess
//   4. Imaging Decision
//   5. Disposition
//
// CROSS-LINK DIRECTIONALITY (R8): hub links INTO splits; splits never link back.
// All outbound #/tree/ targets validated against the repo on 2026-05-25.
export const ABDOMINAL_PAIN_HUB_NODES = [
    // ============================================================
    // Module 1 — Sick Check
    // ============================================================
    {
        id: 'ap-start',
        type: 'info',
        module: 1,
        title: 'Abdominal Pain Hub — Sick Check First',
        body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Ruptured AAA** \u2014 age \u226550 + smoker, back/flank pain, pulsatile mass, syncope.\n2. **Mesenteric ischemia** \u2014 pain out of proportion to exam, AF/vascular disease, lactate.\n3. **Ruptured ectopic pregnancy** \u2014 positive \u03B2-hCG + pain/shock.\n4. **Perforated viscus / surgical abdomen** \u2014 rigid peritonitic abdomen, free air.\n5. **Inferior MI / aortic dissection presenting as epigastric pain** \u2014 get an ECG.\n\nWalk into the room. Before any framework, sort sick vs not-sick.\n\nOpen first:\n- [Hub Steps Summary](#/info/aph-steps)\n- [Hub Stop / Pitfalls](#/info/aph-stop)\n\n**Scan in 30 seconds:** [1]\n- **General appearance** — still + quiet (peritoneal pain is positional) vs writhing (colic), diaphoretic, gray, end-of-bed ill?\n- **Vitals trend** (not single snapshot) — tachycardia, hypotension, fever, hypoxia, tachypnea, narrow pulse pressure\n- **Mental status** — confused / drowsy = bad sign in any abdominal pain\n- **Skin** — mottled, cool, jaundice, purpura, Cullen / Grey-Turner\n- **Abdomen at the door** — distended? pulsatile mass? guarding? rigid?\n\n**If ANY of:** hypotension, altered, peritonitic abdomen, pulsatile mass, lactate >4, end-of-life appearance — **start resus parallel to workup.** Bay 1, IV × 2 large-bore, monitor, type and cross, lactate, surgical/IR ready. Don\'t funnel down a "belly pain" pathway when the patient is unstable. [Mesenteric Ischemia](#/tree/mesenteric-ischemia) and [AAA](#/tree/aortic-aneurysm) and ruptured ectopic ([First Trimester Bleeding](#/tree/first-trimester)) all kill in minutes.\n\n**If they look stable + protecting airway:** continue to time-critical exclusions (next node).\n\n**The 4 questions that change the differential immediately:** [2]\n1. **Pregnant or could you be?** (β-hCG on every reproductive-age female — ectopic kills)\n2. **Pain out of proportion to your exam?** (mesenteric ischemia until proven otherwise)\n3. **Any back / flank pain or pulsatile feeling?** (AAA — age ≥50 + smoker = bedside US now)\n4. **Any chest pain or pain above the belt?** (inferior MI / aortic dissection / esophageal rupture all present as "abdominal" pain)',
        citation: [1, 2],
        next: 'ap-exclusions',
        summary: 'Gestalt sick check + vitals trend + 4-question screen (preg, pain-out-of-proportion, AAA, chest pain). If unstable: resus parallel to workup.',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 2 — Time-Critical Exclusions
    // ============================================================
    {
        id: 'ap-exclusions',
        type: 'question',
        module: 2,
        title: 'Time-Critical Exclusions — Pick the One That Fits',
        body: 'Ask history first. Each branch routes to a deep-dive and tells you the next 5-min action while you transition.',
        options: [
            {
                label: 'Age ≥50 + back / flank / pulsatile abdominal pain (± syncope, hypotension)',
                description: 'AAA / ruptured AAA until proven otherwise — bedside US NOW',
                next: 'ap-exc-aaa',
                urgency: 'critical',
            },
            {
                label: 'Pain out of proportion to exam (esp. AF / vascular / postprandial)',
                description: 'Mesenteric ischemia — CTA mesenteric, lactate, vascular consult',
                next: 'ap-exc-mesenteric',
                urgency: 'critical',
            },
            {
                label: 'Reproductive-age female + abdominal/pelvic pain ± bleeding',
                description: 'Ectopic / ruptured ovarian / TOA — β-hCG + pelvic US + OB consult',
                next: 'ap-exc-female',
                urgency: 'critical',
            },
            {
                label: 'RUQ + fever + jaundice (Charcot) OR Murphy positive',
                description: 'Cholangitis / cholecystitis — labs + US + antibiotics if cholangitis',
                next: 'ap-exc-ruq',
                urgency: 'urgent',
            },
            {
                label: 'Epigastric / band-like + vomiting + alcohol or gallstone history',
                description: 'Pancreatitis — lipase, fluid resuscitation, severity scoring',
                next: 'ap-exc-epigastric',
                urgency: 'urgent',
            },
            {
                label: 'RLQ + migration + anorexia + vomit-after-pain',
                description: 'Appendicitis — AAS score, imaging, surgical consult',
                next: 'ap-exc-rlq',
                urgency: 'urgent',
            },
            {
                label: 'LLQ + fever + altered bowel habits (age ≥40)',
                description: 'Diverticulitis vs sigmoid volvulus — CT + antibiotics',
                next: 'ap-exc-llq',
                urgency: 'urgent',
            },
            {
                label: 'Rigid / board-like abdomen, free air on imaging, sepsis physiology',
                description: 'Perforated viscus — emergent surgical consult, broad-spectrum abx',
                next: 'ap-exc-perforation',
                urgency: 'critical',
            },
            {
                label: 'Above-the-belt presentation: chest pain, diaphoresis, dyspnea, prior MI',
                description: 'Inferior MI / aortic dissection / esophageal rupture mimicking abdominal pain',
                next: 'ap-exc-cardiac',
                urgency: 'critical',
            },
            {
                label: 'None of the above — undifferentiated abdominal pain, stable',
                description: 'Initial bundle + reassess at 60-90 min',
                next: 'ap-rescue',
            },
        ],
        citation: [1, 2, 3],
        summary: 'Pick the most acute hit. Each branch links to its deep-dive + tells you the next 5-min action.',
        safetyLevel: 'critical',
    },
    // -------- Time-critical exclusion branch results --------
    {
        id: 'ap-exc-aaa',
        type: 'result',
        module: 2,
        title: 'Suspect AAA / Ruptured AAA',
        body: 'Open [Aortic Aneurysm](#/tree/aortic-aneurysm) for full risk stratification, imaging, and surgical/endovascular pathway.\n\n**Think AAA when:**\n- Age ≥50 + ANY new abdominal, back, or flank pain\n- Pulsatile abdominal mass (sensitivity poor — ~50% — absence does NOT rule out)\n- Syncope + abdominal/back pain (rupture until proven otherwise)\n- Hypotension + abdominal pain in older patient\n- Known AAA on prior imaging\n\n**Next 5 minutes while transitioning:** [4]\n- **Bedside US NOW** — point-of-care abdominal aorta US is ~98% sensitive for AAA presence (does NOT rule out rupture itself but locates aneurysm in <5 min)\n- IV × 2 large-bore (16-18 G)\n- Type and CROSS 4-6 units packed RBCs (not just type-and-screen)\n- **Permissive hypotension:** target SBP 70-90 mmHg if active rupture — over-resuscitation worsens bleeding. Do NOT chase MAP 65 with crystalloid before vascular control.\n- Activate massive transfusion protocol if unstable + rupture confirmed/suspected\n- Vascular surgery + IR (for EVAR) consult NOW\n- CT angiogram only if stable — unstable patient goes to OR/EVAR suite from the ED\n\n🛑 Do NOT delay vascular consult for confirmatory imaging in unstable patient with bedside US showing AAA.\n🛑 Do NOT over-resuscitate before surgical control — permissive hypotension is the rule.',
        recommendation: 'Bedside US now. Type and cross. Permissive hypotension. Vascular + IR consult before imaging if unstable.',
        confidence: 'definitive',
        citation: [4],
        safetyLevel: 'critical',
    },
    {
        id: 'ap-exc-mesenteric',
        type: 'result',
        module: 2,
        title: 'Mesenteric Ischemia — Pain Out of Proportion',
        body: 'Open [Mesenteric Ischemia](#/tree/mesenteric-ischemia) for full pathway — risk stratification, lactate kinetics, CTA, endovascular vs surgical decision.\n\n**Classic triad (incomplete in most patients):**\n- Severe pain out of proportion to a relatively benign exam\n- Cardiac source of embolism (AF, recent MI, valve disease) OR vascular risk factors (atherosclerosis, hypercoagulability, vasoconstrictor use)\n- Postprandial pain pattern (chronic mesenteric ischemia → "food fear")\n\n**Next 5 minutes:** [5]\n- IV × 2, monitor, lactate, ABG, CBC, CMP, type and screen, coags\n- **CTA mesenteric (arterial + venous phases)** — do not delay for renal function unless eGFR <30 (the diagnosis itself is more dangerous than the contrast)\n- Vascular surgery + IR consult early — these patients need endovascular OR open intervention within hours\n- Broad-spectrum antibiotics (transmural ischemia → bacterial translocation)\n- Fluid resuscitation\n- NPO\n- Anticoagulation per vascular service (typically heparin gtt for embolic / venous thrombotic)\n\n🛑 Do NOT anchor on "GI bug" or "ileus" in an AF patient with severe pain and minimal exam findings.\n🛑 A normal lactate does NOT rule out mesenteric ischemia early — lactate rises late, after transmural infarction. Use clinical pretest probability + CTA.',
        recommendation: 'CTA mesenteric NOW. Vascular + IR consult early. Heparin gtt per vascular. Lactate may be normal early — image anyway.',
        confidence: 'definitive',
        citation: [5],
        safetyLevel: 'critical',
    },
    {
        id: 'ap-exc-female',
        type: 'result',
        module: 2,
        title: 'Reproductive-Age Female — Pelvic Emergency Until Proven Otherwise',
        body: '**β-hCG (urine OR serum) on EVERY reproductive-age female with abdominal/pelvic pain.** [6]\n\n**If β-hCG positive:**\n- Open [First Trimester Bleeding](#/tree/first-trimester) for ectopic / threatened abortion / hydatidiform pathway\n- Pelvic US (transvaginal preferred) — visualize IUP vs no IUP\n- OB consult low threshold — ruptured ectopic kills in minutes\n- Type and CROSS if any hemodynamic concern\n- IV × 2, monitor\n- Avoid pelvic exam before US if ruptured ectopic suspected (can precipitate further bleeding)\n\n**If β-hCG negative:**\n- **Ovarian torsion** — pelvic US with Doppler (sensitivity ~70-85% — clinical concern can override negative US, especially if intermittent torsion)\n- **Ruptured ovarian cyst** — pelvic US, free fluid in cul-de-sac\n- **Tubo-ovarian abscess (TOA)** — fever + pelvic pain + adnexal mass; pelvic US, broad-spectrum abx (ceftriaxone + doxycycline + metronidazole), OB consult\n- **PID** — STI screen, ceftriaxone + doxycycline ± metronidazole\n- **Mittelschmerz** — mid-cycle, self-limited; diagnosis of exclusion\n\n**Pelvic exam content** (when not contraindicated):\n- CMT (PID, TOA, ectopic)\n- Adnexal mass (TOA, torsion, ectopic)\n- Bleeding source + amount\n\n**Do NOT discharge a reproductive-age female with abdominal pain without:**\n- Documented β-hCG\n- Pelvic exam OR a documented reason why it was deferred\n- Targeted US in equivocal cases',
        recommendation: 'β-hCG on every reproductive-age female. Pelvic US for any concern. Type and cross if any hemodynamic concern.',
        confidence: 'definitive',
        citation: [6],
        safetyLevel: 'critical',
    },
    {
        id: 'ap-exc-ruq',
        type: 'result',
        module: 2,
        title: 'RUQ — Gallbladder Spectrum',
        body: 'Open [Gallbladder Disease](#/tree/gallbladder) for the full biliary colic → cholecystitis → cholangitis pathway with Tokyo grading.\n\n**Recognize the spectrum:**\n- **Biliary colic** — intermittent RUQ pain after fatty meal, no fever, normal WBC, normal LFTs. Disposition: PO challenge → outpatient cholecystectomy referral.\n- **Acute cholecystitis** — Murphy positive + fever + leukocytosis ± LFT bump. US shows GB wall thickening, pericholecystic fluid, sonographic Murphy. Antibiotics + surgical consult.\n- **Choledocholithiasis** — RUQ + elevated bili + dilated CBD. MRCP / ERCP.\n- **Acute cholangitis (Charcot triad: fever + jaundice + RUQ pain; Reynolds pentad adds shock + AMS)** — surgical/GI emergency. Broad-spectrum antibiotics (pip-tazo or ceftriaxone + metronidazole), GI consult for emergent ERCP within 24 h. Source control is the priority.\n\n**Next 5 minutes:**\n- IV access, CBC, CMP, lipase, lactate, blood cultures × 2 if febrile\n- RUQ US\n- Antibiotics within 1 h if cholangitis or septic cholecystitis\n- Surgical / GI consult\n\n🛑 Do NOT discharge an RUQ pain patient without checking lipase (overlap with pancreatitis) and at minimum a CBC + CMP if any fever, jaundice, or rebound.',
        recommendation: 'Open Gallbladder consult. US + labs. Antibiotics within 1 h if cholangitis/septic cholecystitis. GI consult for ERCP.',
        confidence: 'definitive',
        citation: [7],
        safetyLevel: 'warning',
    },
    {
        id: 'ap-exc-epigastric',
        type: 'result',
        module: 2,
        title: 'Epigastric Band-Like Pain — Pancreatitis',
        body: 'Open [Acute Pancreatitis](#/tree/acute-pancreatitis) for the full pathway — diagnosis (2 of 3 Atlanta criteria), severity scoring (BISAP/Ranson/APACHE), resuscitation, complications, intervention.\n\n**Atlanta diagnostic criteria — need 2 of 3:** [8]\n1. Classic abdominal pain (epigastric, band-like, radiates to back, worse supine, better leaning forward)\n2. Lipase >3× ULN\n3. Imaging consistent with pancreatitis (US, CT, MRI)\n\n**Most common etiologies:** gallstones (40%), alcohol (30%), hypertriglyceridemia (>1000 mg/dL), post-ERCP, drugs (azathioprine, valproate, GLP-1 agonists), idiopathic.\n\n**Next 5 minutes:**\n- IV × 2, **aggressive but goal-directed fluid resuscitation** (LR preferred over NS — meta-analyses favor LR for less SIRS) — target UOP 0.5-1 mL/kg/h, HR <120, MAP >65\n- Labs: lipase, CBC, CMP, triglycerides, calcium, magnesium, ABG, lactate, type and screen\n- RUQ US to evaluate for gallstones / dilated CBD\n- Pain control (opioid PRN — no good evidence morphine causes sphincter of Oddi spasm of clinical significance; use what works)\n- Antiemetic\n- NPO initially; advance enteral nutrition as tolerated (early enteral feeding improves outcomes — do NOT keep NPO unnecessarily)\n- **Severity scoring** (BISAP at 24 h, APACHE-II) to triage ICU vs floor\n\n🛑 Do NOT use the old "rest the gut" NPO-for-days approach — early enteral nutrition is now standard.\n🛑 Do NOT miss hypocalcemia (saponification) — check ionized calcium.',
        recommendation: 'Open Acute Pancreatitis consult. LR resuscitation + early enteral nutrition + severity scoring. Image for gallstone source.',
        confidence: 'definitive',
        citation: [8],
        safetyLevel: 'warning',
    },
    {
        id: 'ap-exc-rlq',
        type: 'result',
        module: 2,
        title: 'RLQ — Appendicitis Spectrum',
        body: 'Open [Adult Appendicitis](#/tree/adult-appendicitis) for AAS scoring, imaging strategy, antibiotic + surgical decision pathway. Pediatric patients → [Pediatric Appendicitis](#/tree/peds-appendicitis).\n\n**Classic sequence (commit when you see this):**\n- Anorexia\n- Periumbilical / epigastric dull pain\n- Migration to RLQ over 6-24 h\n- Nausea + vomiting AFTER pain (reverse order favors gastroenteritis)\n- Low-grade fever, McBurney tenderness, Markle (cough/hop) sign\n\n**Next 5 minutes:** [9]\n- CBC + CMP + lipase + UA + β-hCG (always in reproductive-age female)\n- IV access, analgesia (does NOT mask the exam — old dogma debunked)\n- AAS or Alvarado score\n- Imaging: US first (lean / young / female / pregnant); CT first (older / obese / equivocal); MRI for pregnant if US non-diagnostic\n- Surgical consult early in high pretest probability — don\'t wait for CT in AAS ≥16\n- Preop antibiotics within 1 h of OR decision\n\n**Atypical populations to image early:**\n- Elderly (mortality 5-10% if missed)\n- Pregnant (appendix migrates cephalad; MRI no-gad preferred)\n- Immunocompromised (blunted exam)',
        recommendation: 'Open Adult Appendicitis (or Peds) consult. AAS score, image by patient profile, surgical consult early.',
        confidence: 'definitive',
        citation: [9],
        safetyLevel: 'warning',
    },
    {
        id: 'ap-exc-llq',
        type: 'result',
        module: 2,
        title: 'LLQ — Diverticulitis (and Sigmoid Volvulus)',
        body: '**Diverticulitis** is the dominant LLQ diagnosis in age ≥40 — left-sided "appendicitis."\n\n**Recognition:**\n- LLQ pain ± low-grade fever\n- Altered bowel habits (constipation > diarrhea)\n- Localized tenderness ± palpable mass\n- WBC + CRP elevated\n\n**Imaging:** CT abdomen/pelvis with IV contrast (oral not required) confirms + stratifies complicated (abscess, perforation, fistula) vs uncomplicated.\n\n**Hinchey classification:**\n- I: pericolic abscess\n- II: distant abscess\n- III: purulent peritonitis (perforation without fecal contamination)\n- IV: feculent peritonitis\n\n**Management:**\n- **Uncomplicated outpatient candidates:** ciprofloxacin + metronidazole × 7-10 d (or amoxicillin-clavulanate) + clear liquids → discharge with follow-up. Recent evidence supports antibiotics-free management in selected uncomplicated cases — shared decision.\n- **Complicated / unable to tolerate PO / immunocompromised / elderly:** admit, IV antibiotics (ceftriaxone + metronidazole or pip-tazo), bowel rest, surgical consult\n- **Abscess ≥3-4 cm:** IR drainage\n- **Hinchey III-IV / sepsis / free air:** emergent surgical consult\n\n**Differential to keep alive:**\n- **Sigmoid volvulus** — elderly, abdominal distension, "coffee bean" sign on plain film, can decompress endoscopically initially; surgical consult\n- **Colorectal cancer** — first-time diverticulitis episode warrants outpatient colonoscopy 6 weeks after recovery to rule out malignancy mimic\n- **Ischemic colitis** — older + vascular risk + bloody diarrhea + LLQ pain; CT may show "thumbprinting"; supportive care; vascular consult if severe',
        recommendation: 'CT confirms. Outpatient abx for uncomplicated; admit + IV abx for complicated. IR drain abscess ≥3-4 cm. Colonoscopy 6 wk post-recovery for first episode.',
        confidence: 'recommended',
        citation: [10],
        safetyLevel: 'warning',
    },
    {
        id: 'ap-exc-perforation',
        type: 'result',
        module: 2,
        title: 'Perforated Viscus — Surgical Emergency',
        body: 'Rigid abdomen + free air on imaging + sepsis physiology = perforated viscus until proven otherwise. Etiology: peptic ulcer (most common), diverticular, malignancy, ischemic, iatrogenic (post-procedure), foreign body, appendicitis with perforation.\n\n**Next 5 minutes:**\n- **Emergent surgical consult — do not delay for imaging if peritoneal signs + sepsis + free air on bedside CXR/US**\n- IV × 2 large-bore, NS / LR 1-2 L bolus, type and CROSS\n- Broad-spectrum IV antibiotics within 1 h: **piperacillin-tazobactam 4.5 g IV** OR **ceftriaxone 2 g IV + metronidazole 500 mg IV**\n- NPO, NG tube for decompression if obstruction features\n- Foley + monitor UOP\n- Lactate, CBC, CMP, coags, type and CROSS 4 units\n- Imaging: upright CXR (free air under diaphragm — sensitivity ~75%) OR CT abdomen/pelvis with IV contrast (more sensitive for free air, identifies source)\n- Reverse anticoagulation if surgery imminent\n- Pain control (do NOT withhold)\n\n🛑 Do NOT delay surgical consult for confirmatory CT if the patient is septic with peritoneal signs and any concern for perforation. The CT can happen in parallel.\n\n**Special case — boerhaave (esophageal rupture):** vomiting + chest/epigastric pain + sepsis ± subcutaneous emphysema. CT chest/abdomen with oral water-soluble contrast (Gastrografin). Surgical + thoracic consult emergent.',
        recommendation: 'Emergent surgical consult. Broad-spectrum abx within 1 h. CT abdomen/pelvis. Reverse anticoag.',
        confidence: 'definitive',
        citation: [14],
        safetyLevel: 'critical',
    },
    {
        id: 'ap-exc-cardiac',
        type: 'result',
        module: 2,
        title: 'Above-the-Belt Presentation — Cardiac / Aortic / Esophageal',
        body: 'Several thoracic catastrophes present as "abdominal" pain — especially **inferior MI** (epigastric pain, diaphoresis, nausea), **aortic dissection** (tearing pain radiating to back), and **esophageal rupture (Boerhaave)** (vomiting + chest/epigastric pain).\n\n**ECG on every middle-aged-or-older patient with epigastric pain, especially with diaphoresis, dyspnea, or nausea.**\n\n**Inferior STEMI mimicking GI:**\n- Open [STEMI](#/tree/stemi) immediately for activation pathway\n- ST elevation in II, III, aVF — get right-sided leads (V4R for RV infarction — fluid loading required, nitroglycerin contraindicated)\n- Aspirin 325 mg chewed, ECG repeat in 15 min if initial non-diagnostic, troponin\n\n**Aortic dissection presenting as abdominal pain:**\n- Tearing pain, BP differential between arms (>20 mmHg), pulse deficit, new aortic regurg murmur\n- CT angiogram chest/abdomen/pelvis\n- BP control (esmolol or labetalol first to control HR, then nitroprusside — HR FIRST or you accelerate the dissection)\n- Cardiothoracic surgery consult\n\n**Boerhaave (esophageal rupture):**\n- Mackler triad: vomiting + lower chest/epigastric pain + subcutaneous emphysema (incomplete in most patients)\n- CT chest/abdomen with water-soluble oral contrast\n- Broad-spectrum antibiotics, surgical / thoracic consult, NPO, drainage as needed\n\n**Other thoracic mimics:** pericarditis with referred pain, lower lobe pneumonia (especially RLL with diaphragmatic irritation), PE with diaphragmatic involvement.',
        recommendation: 'ECG on every middle-aged-or-older patient with epigastric pain. Open STEMI consult if inferior STE. Image aorta if dissection features.',
        confidence: 'definitive',
        citation: [11],
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 3 — Initial Bundle + Reassess
    // ============================================================
    {
        id: 'ap-rescue',
        type: 'info',
        module: 3,
        title: 'Initial Bundle — Undifferentiated Abdominal Pain',
        body: 'No life-threat hit; pain pattern fits common workup. Standard ED bundle while you wait for labs/imaging: [1,12]\n\n**THE BUNDLE:**\n- **IV access × 1-2, monitor** (× 2 large-bore if any concern for surgical/hemorrhagic process)\n- **NS or LR 1-2 L bolus** (LR preferred if pancreatitis suspected)\n- **Antiemetic:** [Ondansetron 4 mg IV](#/drug/ondansetron/nausea-vomiting) (caution QT — get baseline ECG if other QT-prolonging meds)\n- **Analgesia:** opioid PRN for moderate-severe pain — does NOT mask the exam (this dogma is dead). Morphine 0.1 mg/kg IV OR fentanyl 1 mcg/kg IV. Toradol 15-30 mg IV is reasonable for mild-moderate non-surgical pain (avoid if AKI, GI bleed, perforation risk).\n- **Labs (focused, not shotgun):**\n  - CBC + CMP + lipase + lactate\n  - UA (UTI, pyelonephritis, nephrolithiasis)\n  - β-hCG (every reproductive-age female)\n  - LFTs if RUQ pain or jaundice\n  - Type and screen if surgical concern or hemorrhage possibility\n  - Coags if anticoagulated or surgery anticipated\n  - Blood cultures × 2 if febrile + abdominal source suspected\n  - Troponin + ECG if any "above-the-belt" features\n- **Imaging triage:** see Module 4\n- **NPO** until disposition\n\n**Reassess at 60-90 minutes** for response to bundle + emergence of red flags.',
        citation: [1, 12],
        next: 'ap-rescue-reassess',
        summary: 'IV + LR/NS bolus + ondansetron + analgesia (does NOT mask exam) + focused labs + β-hCG. NPO. Reassess at 60-90 min.',
        safetyLevel: 'warning',
    },
    {
        id: 'ap-rescue-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess at 60-90 Minutes',
        body: 'Re-examine: pain trend, vitals trend, exam evolution, lab/imaging results back, ability to tolerate PO.',
        options: [
            {
                label: 'Pain improving + benign exam + labs unremarkable + tolerating PO',
                description: 'Likely benign — discharge bundle with strict 24 h recheck',
                next: 'ap-dispo-discharge',
            },
            {
                label: 'Equivocal — needs imaging or extended observation',
                description: 'Proceed to imaging or ED obs unit with serial exams',
                next: 'ap-imaging',
                urgency: 'urgent',
            },
            {
                label: 'New peritoneal signs / vitals worsening / new red flag emerged',
                description: 'STOP. Return to time-critical exclusions. Surgical consult.',
                next: 'ap-exclusions',
                urgency: 'critical',
            },
            {
                label: 'Specific diagnosis confirmed on labs/imaging',
                description: 'Leave the hub — work the deep-dive consult for that diagnosis',
                next: 'ap-dispo',
            },
        ],
        citation: [1, 12],
        summary: 'Reassess at 60-90 min. Improving + benign → discharge. Equivocal → image/observe. New red flag → STOP, return to exclusions.',
    },
    // ============================================================
    // Module 4 — Imaging Decision
    // ============================================================
    {
        id: 'ap-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging Decision Cheat-Sheet',
        body: 'You should NOT image every abdominal pain. Image when ANY of: [13]\n\n**Indications for CT abdomen/pelvis with IV contrast (oral not required):**\n- Older patients (≥50) with new or unexplained abdominal pain\n- Suspected appendicitis with non-diagnostic US (or skip US in older/obese)\n- Suspected diverticulitis (esp. complicated features)\n- Suspected SBO / LBO (distension, vomiting, no flatus)\n- Suspected perforation (rigid abdomen, free air on plain film)\n- Trauma\n- Postoperative abdomen with concern for complication\n- Hematuria + flank pain (renal mass / clot)\n- Sepsis with abdominal source\n\n**Indications for CT angiography (CTA mesenteric):**\n- Suspected [Mesenteric Ischemia](#/tree/mesenteric-ischemia) — arterial + venous phase\n- Suspected [AAA](#/tree/aortic-aneurysm) with rupture concern (if stable)\n- Suspected aortic dissection extending into abdomen\n\n**Indications for US (first-line):**\n- RUQ pain → gallbladder US ([Gallbladder Disease](#/tree/gallbladder))\n- Pregnant patient with abdominal pain (radiation stewardship)\n- Young, lean, female suspected appendicitis ([Adult Appendicitis](#/tree/adult-appendicitis))\n- Suspected ectopic / ovarian pathology — transvaginal pelvic US\n- Hydronephrosis from suspected ureteral stone\n- Bedside aorta US for AAA\n\n**Indications for MRI (no-gadolinium preferred when possible):**\n- Pregnant patient with non-diagnostic US and ongoing suspicion (appendicitis, biliary, ovarian)\n- Suspected biliary obstruction needing MRCP\n\n**Indications for KUB / upright CXR:**\n- Suspected SBO / LBO (distended loops, air-fluid levels)\n- Suspected perforation (free air under diaphragm — sensitivity ~75%)\n- Suspected sigmoid volvulus (coffee bean sign)\n- Foreign body localization\n\n**No imaging needed:**\n- Reproducible muscular abdominal wall pain with normal vitals + normal exam + no red flags\n- Benign-pattern recurrent IBS in known patient with no new features\n- Improving undifferentiated pain after fluids + analgesia in a young patient with normal exam, normal labs, and reliable follow-up\n\n**Sensitivity caveats:**\n- US for cholecystitis: ~80-85% sensitive — clinically suspected cholecystitis with negative US warrants HIDA scan\n- Plain film for perforation: misses 25% — CT if any clinical concern persists\n- CT can miss early mesenteric ischemia — clinical suspicion overrides\n- US for appendicitis non-visualization is NOT a negative study — escalate if suspicion remains',
        citation: [13],
        next: 'ap-dispo',
        summary: 'CT abd/pelvis with IV contrast (no oral) for most older / equivocal. US first in RUQ / pregnant / lean female. MRI for pregnant non-diagnostic. Image only when indicated.',
    },
    // ============================================================
    // Module 5 — Disposition
    // ============================================================
    {
        id: 'ap-dispo',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Defer to deep-dive consult\'s admit criteria once a phenotype is committed. The framework below applies to undifferentiated patients.',
        options: [
            {
                label: 'Discharge — pain controlled + tolerating PO + no red flags + reliable',
                description: 'Standard discharge bundle for undifferentiated benign-pattern pain',
                next: 'ap-dispo-discharge',
            },
            {
                label: 'Observe — partial response, awaiting labs/imaging, equivocal',
                description: 'ED observation unit; serial exams + repeat labs at 4-6 h',
                next: 'ap-dispo-observe',
            },
            {
                label: 'Admit — diagnosis-driven (perforation, ischemia, sepsis, complicated diagnosis)',
                description: 'Admit per the deep-dive consult\'s admit criteria',
                next: 'ap-dispo-admit',
                urgency: 'urgent',
            },
        ],
        citation: [1, 12],
        summary: 'Discharge if controlled + PO + no flags + reliable. Observe if equivocal/pending. Admit per deep-dive criteria.',
    },
    {
        id: 'ap-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge — Universal Checklist',
        body: 'Before discharge:\n\n1. **Pain reduced** to acceptable level (typically ≤3/10 or returned to baseline)\n2. **Tolerating PO** (give a PO challenge — even just water + crackers)\n3. **Vitals normal** including orthostatic if any concern for hypovolemia/bleeding\n4. **No new exam findings** on recheck — no new tenderness, no new peritoneal signs\n5. **Labs reviewed and unremarkable** (or trending favorably with clear plan for outpatient follow-up)\n6. **β-hCG documented** in reproductive-age females\n7. **WRITTEN return precautions** covering:\n   - Worsening or migrating pain\n   - Fever ≥38°C or chills\n   - Persistent vomiting (>4-6 h or unable to tolerate any PO)\n   - Bloody / black stool, blood in vomitus\n   - Abdominal rigidity or distension\n   - Inability to walk normally / writhing in pain\n   - Light-headedness / fainting\n   - For females: vaginal bleeding heavier than menses, shoulder-tip pain (referred from ruptured ectopic)\n8. **24-48 h follow-up arranged** — booked, not just recommended\n9. **NSAIDs discouraged** if any surgical/bleeding concern (mask perforation signs, AKI risk); acetaminophen + antiemetic acceptable\n10. **Counseling:** "Abdominal pain can evolve over 6-24 hours. A reassuring ED visit today does not rule out a problem tomorrow. The recheck is the safety net."\n\n**Do NOT discharge if:**\n- Pain pattern unclear or atypical for benign cause\n- Any peritoneal sign on exam\n- Labs elevated and rising\n- Cannot return reliably for recheck\n- Pregnant without clear OB plan\n- Elderly with vague pain (mortality climbs sharply with missed AAA / mesenteric / perforation)\n- Immunocompromised\n- Active anticoagulation with any concerning feature',
        recommendation: 'Discharge only after pain controlled, PO tolerated, no red flags, β-hCG documented, written precautions, 24-48 h recheck.',
        confidence: 'definitive',
        citation: [1, 12],
    },
    {
        id: 'ap-dispo-observe',
        type: 'result',
        module: 5,
        title: 'Observe — Partial Response or Pending Workup',
        body: 'ED observation unit appropriate when: [12]\n\n- Equivocal exam + intermediate clinical concern\n- Awaiting imaging (US, CT, MRI)\n- Awaiting lab trends (WBC, CRP, lactate)\n- Pain partially controlled but social/safety barriers to discharge\n- Reliable patient with caregiver/transport\n\n**Observation protocol:**\n- Serial exam every 2-4 h by same provider when possible\n- Document exam findings explicitly each time\n- Repeat WBC + CRP at 4-6 h if initial values intermediate\n- Repeat lactate at 2-4 h if any sepsis concern\n- Continue IV fluids, analgesia, antiemetic\n- Reassess vitals trend (especially HR + BP)\n- Escalate to imaging or surgical consult if:\n  - New peritoneal signs\n  - Labs trending wrong\n  - Vitals destabilizing\n  - Patient subjectively worse\n- Discharge with strict 24 h recheck if:\n  - Pain resolving\n  - Exam unchanged or improving\n  - Labs trending favorably\n  - Tolerating PO\n  - Reliable follow-up secured',
        recommendation: 'Obs unit + q2-4h serial exams + repeat labs at 4-6 h. Escalate if any worsening; discharge with strict 24 h recheck if improving.',
        confidence: 'recommended',
        citation: [12],
    },
    {
        id: 'ap-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit',
        body: 'Admit when: [1,12]\n\n- **Specific diagnosis driving admission** — defer to that consult\'s admit criteria (acute pancreatitis with severity ≥mild-moderate, cholangitis, complicated appendicitis, complicated diverticulitis, perforation, ischemia, sepsis, AAA, etc.)\n- **Surgical service required** for OR or observation\n- **Sepsis** with abdominal source — broad-spectrum abx, source control plan, ICU vs floor by severity\n- **Inability to control pain** in ED\n- **Inability to tolerate PO** with ongoing fluid resuscitation needs\n- **Refractory vomiting** with electrolyte derangement\n- **Elderly with vague abdominal pain** — low threshold to admit for serial exams + imaging trend\n- **Immunocompromised** with any persistent finding\n- **Pregnant** with any concerning feature — OB consult, low threshold to admit\n- **Active hemorrhage** (GI bleed, ruptured AAA, ectopic) — see specific deep-dive\n\n**Service selection:**\n- **Surgical service** primary for: appendicitis, complicated diverticulitis, perforated viscus, complicated cholecystitis, SBO requiring surgery, mesenteric ischemia, ruptured AAA\n- **Medicine service** primary for: uncomplicated pancreatitis, uncomplicated diverticulitis requiring IV abx, gastroenteritis with dehydration, IBD flare without surgical features\n- **GI service** consult for: ERCP-needing biliary disease, IBD flare with biologic decisions, severe GI bleed\n- **OB service** for: ovarian torsion (surgical), TOA, ectopic pregnancy, hyperemesis gravidarum\n- **ICU** for: severe pancreatitis, septic shock, ruptured AAA pre-OR, mesenteric ischemia with shock, hemodynamically unstable GI bleed\n\n**Handoff content** (one-pass):\n1. Time of symptom onset\n2. Exam findings (specifically peritoneal signs?)\n3. Lab values + trend\n4. Imaging done + findings\n5. Antibiotics given (drug + time)\n6. Fluid resuscitation given (volume + response)\n7. Pregnancy status (always state)\n8. Anticoagulation, last meal, allergies, prior abdominal surgery\n9. Vital signs trend',
        recommendation: 'Admit per deep-dive consult criteria. Match service to dominant diagnosis. ICU for instability. Standard handoff content.',
        confidence: 'recommended',
        citation: [1, 12],
        safetyLevel: 'warning',
    },
];
export const ABDOMINAL_PAIN_HUB_CRITICAL_ACTIONS = [
    { text: 'Sick check FIRST — vitals trend + 4-question screen (preg, pain-out-of-proportion, AAA, chest pain). Resus parallel if unstable.', nodeId: 'ap-start' },
    { text: 'Age ≥50 + abdominal/back pain → bedside aorta US NOW. AAA / ruptured AAA until proven otherwise.', nodeId: 'ap-exc-aaa' },
    { text: 'Pain out of proportion to exam + cardiac/vascular risk → mesenteric ischemia. CTA + vascular consult. Normal lactate does NOT rule out.', nodeId: 'ap-exc-mesenteric' },
    { text: 'β-hCG on EVERY reproductive-age female with abdominal pain. Ectopic kills in minutes.', nodeId: 'ap-exc-female' },
    { text: 'RUQ + fever + jaundice = cholangitis. Antibiotics within 1 h; GI consult for emergent ERCP.', nodeId: 'ap-exc-ruq' },
    { text: 'Epigastric band-like pain → lipase. Atlanta criteria for pancreatitis; LR resuscitation + early enteral nutrition.', nodeId: 'ap-exc-epigastric' },
    { text: 'RLQ + migration + anorexia → AAS score; analgesia does NOT mask the exam (dogma debunked).', nodeId: 'ap-exc-rlq' },
    { text: 'LLQ + fever in age ≥40 → diverticulitis. CT confirms; abscess ≥3-4 cm gets IR drain.', nodeId: 'ap-exc-llq' },
    { text: 'Rigid abdomen + free air + sepsis = perforated viscus. Emergent surgical consult; abx within 1 h.', nodeId: 'ap-exc-perforation' },
    { text: 'ECG on every middle-aged-or-older patient with epigastric pain. Inferior MI / dissection / Boerhaave mimic GI.', nodeId: 'ap-exc-cardiac' },
    { text: 'Initial bundle: IV + LR/NS + ondansetron + analgesia + focused labs + β-hCG. NPO. Reassess at 60-90 min.', nodeId: 'ap-rescue' },
    { text: 'New peritoneal signs after the bundle = STOP, return to time-critical exclusions, surgical consult.', nodeId: 'ap-rescue-reassess' },
    { text: 'Discharge requires: pain controlled + PO tolerated + no red flags + β-hCG documented + written precautions + 24-48 h recheck.', nodeId: 'ap-dispo-discharge' },
];
export const ABDOMINAL_PAIN_HUB_CITATIONS = [
    { num: 1, text: 'Macaluso CR, McNamara RM. Evaluation and management of acute abdominal pain in the emergency department. Int J Gen Med. 2012;5:789-797.' },
    { num: 2, text: 'Cervellin G, Mora R, Ticinesi A, et al. Epidemiology and outcomes of acute abdominal pain in a large urban Emergency Department: retrospective analysis of 5,340 cases. Ann Transl Med. 2016;4(19):362.' },
    { num: 3, text: 'Ross SO, Forsmark CE. Pancreatic and biliary disorders in the elderly. Gastroenterol Clin North Am. 2001;30(2):531-545.' },
    { num: 4, text: 'Chaikof EL, Dalman RL, Eskandari MK, et al. The Society for Vascular Surgery practice guidelines on the care of patients with an abdominal aortic aneurysm. J Vasc Surg. 2018;67(1):2-77.' },
    { num: 5, text: 'Bala M, Kashuk J, Moore EE, et al. Acute mesenteric ischemia: guidelines of the World Society of Emergency Surgery. World J Emerg Surg. 2017;12:38.' },
    { num: 6, text: 'American College of Obstetricians and Gynecologists. ACOG Practice Bulletin No. 193: Tubal ectopic pregnancy. Obstet Gynecol. 2018;131(3):e91-e103.' },
    { num: 7, text: 'Yokoe M, Hata J, Takada T, et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholecystitis. J Hepatobiliary Pancreat Sci. 2018;25(1):41-54.' },
    { num: 8, text: 'Crockett SD, Wani S, Gardner TB, Falck-Ytter Y, Barkun AN. American Gastroenterological Association Institute Guideline on Initial Management of Acute Pancreatitis. Gastroenterology. 2018;154(4):1096-1101.' },
    { num: 9, text: 'Di Saverio S, Podda M, De Simone B, et al. Diagnosis and treatment of acute appendicitis: 2020 update of the WSES Jerusalem guidelines. World J Emerg Surg. 2020;15(1):27.' },
    { num: 10, text: 'Hall J, Hardiman K, Lee S, et al. The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Treatment of Left-Sided Colonic Diverticulitis. Dis Colon Rectum. 2020;63(6):728-747.' },
    { num: 11, text: 'O\'Gara PT, Kushner FG, Ascheim DD, et al. 2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction. Circulation. 2013;127(4):e362-e425.' },
    { num: 12, text: 'Gans SL, Pols MA, Stoker J, Boermeester MA. Guideline for the diagnostic pathway in patients with acute abdominal pain. Dig Surg. 2015;32(1):23-31.' },
    { num: 13, text: 'American College of Radiology. ACR Appropriateness Criteria: Acute Nonlocalized Abdominal Pain. J Am Coll Radiol. 2018;15(11S):S217-S231.' },
    { num: 14, text: 'Søreide K, Thorsen K, Harrison EM, et al. Perforated peptic ulcer. Lancet. 2015;386(10000):1288-1298.' },
];
export const ABDOMINAL_PAIN_HUB_NODE_COUNT = ABDOMINAL_PAIN_HUB_NODES.length;
export const ABDOMINAL_PAIN_HUB_MODULE_LABELS = [
    'Sick Check',
    'Time-Critical Exclusions',
    'Initial Bundle + Reassess',
    'Imaging',
    'Disposition',
];
