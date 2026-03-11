BEGIN;
-- 4. decision_nodes (33 nodes)

-- MODULE 1: INITIAL ASSESSMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-start', 'first-trimester', 'info', 1,
 'First Trimester Emergencies',
 '[First Trimester Emergency Steps](#/info/ft-summary) — quick reference.

ED approach to pregnancy-related emergencies in the **first trimester** (<14 weeks).

Common presentations:
• **Vaginal bleeding** — miscarriage (7-27%), ectopic pregnancy (2%)
• **Nausea/vomiting** — NVP (85%), hyperemesis gravidarum (3%)
• **Dysuria/flank pain** — UTI, asymptomatic bacteriuria, pyelonephritis
• **Abdominal pain** — appendicitis, ovarian torsion, ectopic

**Step 1: Pregnancy test** in ALL reproductive-age women with abdominal pain or vaginal bleeding. [1]',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ft-stability', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-stability', 'first-trimester', 'question', 1,
 'Hemodynamic Assessment',
 'Assess for hemodynamic instability:
• Hypotension (SBP <90)
• Tachycardia (HR >100)
• Altered mental status
• Signs of peritonitis

**Paradoxical bradycardia** may occur with hemoperitoneum due to vagal stimulation from peritoneal blood irritation. [3]',
 '[1,3]'::jsonb, '[{"label":"Hemodynamically unstable","next":"ft-unstable-ectopic","urgency":"critical"},{"label":"Hemodynamically stable","next":"ft-stable-branch"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-unstable-ectopic', 'first-trimester', 'info', 1,
 'Unstable — Assume Ruptured Ectopic',
 '**Unstable first trimester patient = ruptured ectopic until proven otherwise.** [1]

**Immediate actions:**
• 2 large-bore IVs, aggressive fluid resuscitation
• Type & crossmatch, activate MTP if needed
• **Bedside FAST exam** — free intraperitoneal fluid?
• **Bedside pelvic ultrasound** — IUP present?

**If free fluid + no IUP → ruptured ectopic:**
• O-negative blood transfusion
• **Emergent OB consult for surgical intervention**
• Do NOT delay for beta-hCG or formal imaging

94% of all ectopic pregnancy-related deaths are from hemorrhagic shock due to rupture. [2]

Rupture can occur at **very low beta-hCG levels**. Beta-hCG <1500 mIU/mL carries 2× higher risk of ectopic. [4]',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ft-ectopic-surgical', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-stable-branch', 'first-trimester', 'question', 1,
 'Chief Complaint',
 'Determine the primary presentation to guide workup.

All stable patients need:
• Urine pregnancy test (if not done)
• Focused obstetric history — [gravida/parity (TPAL)](#/info/ft-ob-history), prior ectopic, assisted reproductive technology
• Focused physical exam including pelvic if indicated',
 '[1]'::jsonb, '[{"label":"Vaginal bleeding or pelvic pain","description":"Evaluate for ectopic vs miscarriage","next":"ft-us-eval"},{"label":"Nausea and vomiting","description":"NVP vs hyperemesis gravidarum","next":"ft-nvp-assess"},{"label":"Dysuria, flank pain, or fever","description":"UTI, pyelonephritis evaluation","next":"ft-uti-eval"},{"label":"Right lower quadrant pain","description":"Appendicitis evaluation in pregnancy","next":"ft-appendicitis"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3)
;


-- MODULE 2: ECTOPIC PREGNANCY
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-us-eval', 'first-trimester', 'question', 2,
 'Ultrasound & Beta-hCG',
 '**Bedside or formal transvaginal ultrasound** + quantitative beta-hCG.

Emergency physicians have **99.96% negative predictive value** for ectopic when IUP identified on bedside US. [5]

[Ectopic Pregnancy Sites & Risk Factors](#/info/ft-ectopic-risk)

**Risk factors:** prior ectopic, PID/STI history, salpingitis, IUD in situ, smoking (>1 pack/day OR 4), assisted reproductive technology.

Nearly **half of patients** with ectopic will have NO risk factors. [1]',
 '[1,5,6]'::jsonb, '[{"label":"Definitive IUP on ultrasound","description":"Gestational sac with yolk sac or embryo in uterus","next":"ft-iup-confirmed"},{"label":"No IUP — beta-hCG below discriminatory zone","description":"Beta-hCG <3500 mIU/mL, no IUP visualized","next":"ft-pul"},{"label":"No IUP — beta-hCG above discriminatory zone","description":"Beta-hCG ≥3500, highly suggestive of nonviable pregnancy","next":"ft-no-iup-high"},{"label":"Definitive ectopic on ultrasound","description":"Extrauterine yolk sac or embryo identified","next":"ft-ectopic-confirmed","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[{"src":"images/first-trimester/ectopic-sites.png","alt":"Sites of ectopic pregnancy implantation with frequency data","caption":"Ectopic pregnancy implantation sites — 97.72% tubal (Breen, 1970)"}]'::jsonb, '[]'::jsonb, 4)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-iup-confirmed', 'first-trimester', 'question', 2,
 'IUP Confirmed',
 'Intrauterine pregnancy confirmed on ultrasound.

In the **general population**, this essentially **rules out ectopic** (heterotopic risk: 1 in 4,000-30,000).

**Exception — Assisted Reproductive Technology (ART):** Heterotopic pregnancy risk is **1 in 100**. Maintain suspicion if ART patient with IUP + concerning symptoms. [7]

If the patient has **vaginal bleeding with confirmed IUP**, evaluate for miscarriage spectrum.',
 '[1,7]'::jsonb, '[{"label":"Vaginal bleeding present","description":"Evaluate miscarriage type","next":"ft-miscarriage-type"},{"label":"No bleeding — other complaint","description":"Evaluate non-bleeding complaint with known IUP","next":"ft-nonob-branch"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-pul', 'first-trimester', 'info', 2,
 'Pregnancy of Unknown Location',
 'No IUP visualized. Beta-hCG below the **discriminatory zone**.

**Discriminatory zone:** ACOG recommends conservatively ≥3500 mIU/mL (transvaginal US). Below this, a normal IUP may simply be too early to visualize. [8]

**Serial beta-hCG monitoring:**
• Normal viable IUP: beta-hCG rises **≥53% in 48 hours** [9]
• Slower rise or plateau: concerning for ectopic or nonviable IUP
• Declining levels: may indicate completed miscarriage

**CRITICAL:** One-third of patients eventually diagnosed with ectopic had a beta-hCG rise of ≥53% at 48h, and 20% had decline mimicking miscarriage. [10]

**Trends CANNOT reliably exclude ectopic.** Continue serial monitoring until definitive diagnosis.',
 '[8,9,10]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ft-dispo-pul', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-no-iup-high', 'first-trimester', 'info', 2,
 'No IUP Above Discriminatory Zone',
 'Beta-hCG **≥3500 mIU/mL** with no IUP visualized.

This strongly suggests a **nonviable pregnancy** — either:
• Nonviable IUP (missed miscarriage, complete miscarriage)
• Ectopic pregnancy

**Does not definitively diagnose ectopic.** OB consultation recommended for further evaluation and management.

Patient should have close follow-up with serial beta-hCG and ultrasound until diagnosis is established.',
 '[8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ft-ectopic-confirmed', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-ectopic-confirmed', 'first-trimester', 'question', 2,
 'Ectopic Pregnancy — Management',
 'Confirmed or highly suspected ectopic pregnancy.

**All management in consultation with OB.**

Determine if patient is a candidate for medical vs surgical management.',
 '[1,11]'::jsonb, '[{"label":"Stable — medical management candidate","description":"Hemodynamically stable, reliable for follow-up","next":"ft-ectopic-medical"},{"label":"Unstable or medical therapy contraindicated","description":"Hemodynamic instability, high beta-hCG, or contraindications to methotrexate","next":"ft-ectopic-surgical","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 8)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-ectopic-medical', 'first-trimester', 'result', 2,
 'Methotrexate for Ectopic Pregnancy',
 '[Methotrexate](#/drug/methotrexate/ectopic pregnancy) — single-dose IM regimen in consultation with OB.

**Candidates (all must apply):**
• Hemodynamically stable
• No fetal cardiac activity (FCA has OR 9.1 for failure) [12]
• Beta-hCG <5000 mIU/mL (>5000 has OR 5.45 for failure) [11]
• Reliable for follow-up
• No contraindications to methotrexate

**Absolute contraindications to methotrexate:**
• Immunodeficiency
• Cytopenia (anemia, leukopenia, thrombocytopenia)
• Active pulmonary disease
• Active peptic ulcer disease
• Hepatic or renal dysfunction
• Breastfeeding [13]

**Follow-up:** Serial beta-hCG at day 4 and day 7 post-injection. Expect decline. If inadequate decline, repeat dose or surgical intervention.',
 '[11,12,13]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Medical management with IM methotrexate in consultation with OB. Requires reliable follow-up for serial beta-hCG monitoring.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 9)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-ectopic-surgical', 'first-trimester', 'result', 2,
 'Surgical Management — Ectopic',
 '**Emergent OB consult for surgical intervention.**

**Indications:**
• Hemodynamic instability / ruptured ectopic
• Contraindications to methotrexate
• Beta-hCG >5000 mIU/mL
• Fetal cardiac activity present
• Failed medical management
• Unreliable for follow-up

**Procedures (OB to determine):**
• **Salpingostomy** — removes ectopic, preserves tube (consider if contralateral tube damaged)
• **Salpingectomy** — removes entire tube with ectopic (preferred in most cases)

For ruptured ectopic: **emergent laparotomy**. Do not delay for additional workup.',
 '[1,13]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Emergent OB surgical consultation. Salpingostomy or salpingectomy. Laparotomy for ruptured ectopic with hemoperitoneum.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 10)
;


-- MODULE 3: MISCARRIAGE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-miscarriage-type', 'first-trimester', 'question', 3,
 'Miscarriage Classification',
 'Classify based on **cervical os status** and **ultrasound findings**.

[Miscarriage Types & Findings](#/info/ft-miscarriage-types)

Miscarriage rates: 9-17% (age 20-30), 20% (age 35), 40% (age 40). Approximately half are due to fetal chromosomal abnormalities. [14]

**If fever + uterine tenderness → suspect septic abortion** — emergent OB consult, broad-spectrum IV antibiotics, surgical evacuation.',
 '[1,14]'::jsonb, '[{"label":"Threatened — viable IUP, closed os","description":"Vaginal bleeding with viable IUP","next":"ft-threatened"},{"label":"Complete — all products passed","description":"Closed os, empty uterus (previously had IUP)","next":"ft-complete"},{"label":"Nonviable — missed, inevitable, or incomplete","description":"CRL ≥7mm without cardiac motion, open os, or partial passage","next":"ft-nonviable-mgmt","urgency":"urgent"},{"label":"Septic abortion","description":"Fever, uterine tenderness, purulent discharge","next":"ft-septic","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-threatened', 'first-trimester', 'info', 3,
 'Threatened Miscarriage',
 'Vaginal bleeding with a **viable IUP** (closed cervical os, fetal cardiac activity detected).

**Prognosis:** If fetal cardiac activity is present, only **3.4%** progress to miscarriage. However, heavy bleeding may increase this to 11-18%. [15]

Spotting alone has no significant increase in miscarriage risk (OR 1.1). Heavy bleeding + pain increases risk (OR 3.0). [15]

**Management:**
• Reassurance — most will have normal pregnancy
• No evidence supports bed rest
• Strict return precautions
• Close OB follow-up

**NOTE:** 2-fold increased risk of subsequent adverse outcomes (preterm birth, low birth weight) — ensure OB is aware. [16]',
 '[15,16]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ft-rh-rhogam', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-complete', 'first-trimester', 'info', 3,
 'Complete Miscarriage',
 'All products of conception have passed. Uterus is empty on ultrasound. Cervical os is closed.

**Management:**
• Confirm with ultrasound — empty uterus, closed os
• No further ED intervention needed
• Serial beta-hCG should trend to zero
• OB follow-up for confirmation of completed miscarriage
• Emotional support and grief resources

[Managing Communication Around Pregnancy Loss](#/info/ft-miscarriage-communication)',
 '[1]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ft-rh-rhogam', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-nonviable-mgmt', 'first-trimester', 'question', 3,
 'Nonviable Pregnancy — Management Options',
 '**OB consultation** for definitive management plan.

Options for the stable patient (no clear superiority among them): [17]

**If visible products in cervix:** Remove at bedside with ring forceps. Consider sending to pathology (especially in recurrent miscarriage).

**Surgical management is MANDATORY** for patients with significant hemorrhage or hemodynamic instability.',
 '[17,18]'::jsonb, '[{"label":"Expectant management","description":"50-80% complete within 7-10 days","next":"ft-expectant"},{"label":"Medical management","description":"Misoprostol 800 mcg intravaginal (91% effective in 7 days)","next":"ft-medical-miscarriage"},{"label":"Surgical management","description":"D&C — lowest rates of incomplete miscarriage and bleeding","next":"ft-surgical-miscarriage","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-expectant', 'first-trimester', 'info', 3,
 'Expectant Management',
 'Allow natural passage of products of conception.

**Success rate:** 50-80% will have complete miscarriage within **7-10 days**.

Higher success in incomplete miscarriage (already-open os) vs missed miscarriage.

Up to **40%** of patients initially managed expectantly or medically may ultimately require unplanned surgical management. [19]

**Counsel patient:**
• Expect cramping and bleeding (may be heavy)
• Return to ED if soaking >1 pad/hour for 2+ hours, fever, or lightheadedness
• OB follow-up within 1 week

[Miscarriage Discharge Instructions](#/info/ft-miscarriage-discharge)',
 '[17,19]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ft-rh-rhogam', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-medical-miscarriage', 'first-trimester', 'info', 3,
 'Medical Management — Misoprostol',
 '[Misoprostol](#/drug/misoprostol/miscarriage) **800 mcg intravaginally** — single dose.

**Efficacy:** 91% effective within 7 days. [18]

High patient satisfaction rates when compared to surgical management.

Up to 40% may require unplanned admission or surgical management. [19]

**Contraindications:**
• Hemodynamic instability (needs surgical evacuation)
• Septic abortion
• Confirmed ectopic pregnancy

**Counsel patient:** Expect significant cramping and bleeding. Return precautions for heavy bleeding, fever, or worsening pain.

[Miscarriage Discharge Instructions](#/info/ft-miscarriage-discharge)',
 '[17,18,19]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ft-rh-rhogam', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-surgical-miscarriage', 'first-trimester', 'info', 3,
 'Surgical Management — D&C',
 '**Dilation & Curettage (D&C)** — most effective option.

**Indications:**
• Hemodynamic instability or significant hemorrhage (MANDATORY)
• Patient preference
• Failed medical or expectant management
• Septic abortion

**Advantages:**
• Lowest rates of incomplete miscarriage, bleeding, and need for transfusion [17]
• Definitive and rapid

Arranged through OB consultation — typically same-day or next-day procedure.

Consider sending products to pathology for analysis, especially in recurrent miscarriage.',
 '[17,18]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ft-rh-rhogam', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-septic', 'first-trimester', 'result', 3,
 'Septic Abortion',
 '**Intrauterine infection** in the setting of miscarriage or therapeutic abortion.

**Presentation:** fever, uterine tenderness, purulent cervical discharge.

**EMERGENT management:**
• Large-bore IV access, fluid resuscitation
• Blood cultures
• Broad-spectrum IV antibiotics (gentamicin + clindamycin + ampicillin)
• **Emergent OB consult for surgical evacuation**
• May progress rapidly to sepsis/septic shock

Do not delay surgical evacuation for antibiotic therapy to take effect.',
 '[1]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Emergent OB consult. IV broad-spectrum antibiotics and surgical evacuation. ICU admission if septic.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-rh-rhogam', 'first-trimester', 'info', 3,
 'Rh Status & Anti-D Immune Globulin',
 '**Check Rh status** in all patients with first trimester vaginal bleeding or miscarriage.

ACOG 2017: Whether to administer anti-D immune globulin in threatened miscarriage **at or before 12 weeks is controversial** — no evidence-based recommendation can be made. [20]

**Reasonable approach:**
• **Minimal bleeding, early first trimester:** May withhold
• **Heavy bleeding or near 12 weeks:** Consider administration
• **Discuss with your hospital OB department** for institutional policy

**If indicated:**
• [Rh(D) Immune Globulin](#/drug/rh-immune-globulin/first trimester) 50 mcg IM within 72 hours
• If 50 mcg unavailable, 300 mcg dose can be substituted

**Only for Rh(D)-negative AND unsensitized patients.**',
 '[20]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ft-dispo-miscarriage', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19)
;


-- MODULE 4: NVP / HYPEREMESIS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-nvp-assess', 'first-trimester', 'question', 4,
 'NVP Severity Assessment',
 '**Nausea and vomiting of pregnancy (NVP)** affects 85% of pregnant women. **Hyperemesis gravidarum** (3%) is the most severe form.

NVP is a **diagnosis of exclusion** — rule out other causes first.

NVP is actually **protective** against pregnancy loss (nausea HR 0.44; nausea + vomiting HR 0.20). [21]

[NVP Stepwise Treatment Pathway](#/info/ft-nvp-pathway)

**Assess:** Can the patient tolerate oral medications?',
 '[21,22]'::jsonb, '[{"label":"Mild — tolerating oral intake","description":"Start with oral therapies","next":"ft-nvp-oral"},{"label":"Moderate to severe — unable to tolerate PO","description":"Requires IV rehydration and parenteral antiemetics","next":"ft-nvp-iv","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-nvp-oral', 'first-trimester', 'question', 4,
 'Oral NVP Therapy — Stepwise',
 '**First-line (ACOG Level A):** [22]
• [Pyridoxine (B6)](#/drug/pyridoxine/nvp) 10-25 mg PO TID
• OR [Pyridoxine](#/drug/pyridoxine/nvp) + [Doxylamine](#/drug/doxylamine/nvp) 12.5 mg PO TID

**Non-pharmacologic adjuncts:**
• **Ginger capsules** 250 mg PO QID
• **P6 acupressure** wristband (reduced nausea, vomiting, ketonuria in RCT) [23]
• Convert prenatal vitamin to **folic acid only** (reduces nausea trigger)

Pyridoxine + doxylamine is **superior** to pyridoxine alone. [22]

Did first-line therapy improve symptoms?',
 '[22,23]'::jsonb, '[{"label":"Symptoms improved","description":"Discharge with prescriptions","next":"ft-dispo-nvp"},{"label":"Persistent symptoms","description":"Escalate to second-line oral agents","next":"ft-nvp-oral-step2"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-nvp-oral-step2', 'first-trimester', 'question', 4,
 'Second-Line Oral Antiemetics',
 'Add one of the following to pyridoxine ± doxylamine:

• [Dimenhydrinate](#/drug/dimenhydrinate/nvp) 50 mg PO QID (max 200 mg/day if also taking doxylamine)
• [Diphenhydramine](#/drug/diphenhydramine/nvp) 50 mg PO QID
• [Prochlorperazine](#/drug/prochlorperazine/nvp) 25 mg PR q12h
• [Promethazine](#/drug/promethazine/nvp) 12.5 mg PO or PR q6h

No high-quality evidence supports one specific agent over another. [24]

Did second-line therapy improve symptoms?',
 '[22,24]'::jsonb, '[{"label":"Symptoms improved","description":"Discharge with prescriptions","next":"ft-dispo-nvp"},{"label":"Persistent symptoms — needs IV therapy","description":"Escalate to IV antiemetics and hydration","next":"ft-nvp-iv","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-nvp-iv', 'first-trimester', 'question', 4,
 'IV Therapy for NVP / Hyperemesis',
 '**IV fluid resuscitation:**
• **D5NS** preferred over NS (slightly decreased nausea at 8-16h) [25]
• Consider adding [Thiamine](#/drug/thiamine/hyperemesis) 100 mg IV if protracted vomiting (prevents Wernicke encephalopathy before glucose administration) [22]

**Lab workup:** BMP (electrolytes, renal function), LFTs, urinalysis (ketonuria)

**IV antiemetics — choose one:**
• [Metoclopramide](#/drug/metoclopramide/nvp) 10 mg IV q8h — reasonable first choice, no fetal malformation risk
• [Ondansetron](#/drug/ondansetron/nvp) 8 mg IV over 15 min q12h — effective but possible small risk of fetal cardiac abnormalities [26]
• [Dimenhydrinate](#/drug/dimenhydrinate/nvp iv) 50 mg IV in 50 mL NS over 20 min q6h
• [Promethazine](#/drug/promethazine/nvp iv) 12.5 mg IV q6h

**Ondansetron:** Exhaust other options first given possible fetal cardiac risk. [26]

Did IV therapy improve symptoms?',
 '[22,25,26]'::jsonb, '[{"label":"Symptoms improved — tolerating PO","description":"Discharge with oral antiemetic prescriptions","next":"ft-dispo-nvp"},{"label":"Refractory — hyperemesis gravidarum","description":"Admit for continued IV therapy","next":"ft-hg-admit","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 23)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-hg-admit', 'first-trimester', 'result', 4,
 'Hyperemesis Gravidarum — Admit',
 '**Hyperemesis gravidarum** — loss of ≥5% prepregnancy body weight with persistent nausea, vomiting, and ketonuria.

**OB consultation and admission for:**
• Continued IV rehydration (D5NS at 125 mL/hr)
• Electrolyte monitoring and repletion
• [Thiamine](#/drug/thiamine/hyperemesis) 100 mg IV daily (prevent Wernicke encephalopathy)
• Parenteral antiemetic regimen
• Nutritional assessment

One quarter of women with severe NVP have considered pregnancy termination due to symptoms. [21]',
 '[21,22,25]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'OB consult. Admit for IV rehydration, thiamine, parenteral antiemetics, and electrolyte monitoring.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 24)
;


-- MODULE 5: NONOBSTETRIC
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-nonob-branch', 'first-trimester', 'question', 5,
 'Nonobstetric Evaluation',
 'First trimester patients can present with **nonobstetric conditions** that require modified diagnostic and treatment approaches.

[Imaging Safety in Pregnancy](#/info/ft-imaging-safety)
[Antibiotic Safety in Pregnancy](#/info/ft-abx-safety)',
 '[1]'::jsonb, '[{"label":"UTI / Asymptomatic bacteriuria","description":"Dysuria, frequency, or incidental positive UA","next":"ft-uti-eval"},{"label":"Pyelonephritis","description":"Flank pain, fever, costovertebral angle tenderness","next":"ft-pyelo","urgency":"urgent"},{"label":"Suspected appendicitis","description":"RLQ pain ± fever","next":"ft-appendicitis"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 25)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-uti-eval', 'first-trimester', 'info', 5,
 'UTI & Asymptomatic Bacteriuria',
 '**In pregnancy, asymptomatic bacteriuria MUST be treated** if discovered. Untreated asymptomatic bacteriuria has a 2.4% risk of progression to pyelonephritis (vs 0.6% with treatment). [27]

**Send urine culture** — negative urinalysis does not reliably exclude bacteriuria.

**First-line antibiotics (7-day course):**
• [Amoxicillin](#/drug/amoxicillin/uti pregnancy) 875 mg PO BID
• [Cephalexin](#/drug/cephalexin/uti pregnancy) 500 mg PO q6h
• [Nitrofurantoin](#/drug/nitrofurantoin/uti pregnancy) 100 mg PO BID — likely safe, but ACOG recommends use in first trimester only "when no other suitable alternatives are available" [28]

[Antibiotic Safety in Pregnancy](#/info/ft-abx-safety)

Local antibiotic resistance patterns should guide empiric therapy.',
 '[27,28]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ft-dispo-general', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 26)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-pyelo', 'first-trimester', 'result', 5,
 'Pyelonephritis in Pregnancy — Admit',
 '**Admit ALL pregnant patients with pyelonephritis** for initial IV antibiotics. Insufficient evidence for outpatient management. [29]

**Treatment:**
• [Ceftriaxone](#/drug/ceftriaxone/pyelonephritis pregnancy) 1 g IV daily
• Continue IV until afebrile 48 hours
• Transition to oral antibiotics (e.g., [Cephalexin](#/drug/cephalexin/uti pregnancy)) guided by culture sensitivities

Bilateral mild hydronephrosis is **normal** in pregnancy (from hormonal changes + uterine compression). Do not over-interpret this finding.

Pregnant patients with pyelonephritis have **increased rates of sepsis and septic shock** compared to nonpregnant patients. [1]',
 '[1,29]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit for IV ceftriaxone. Continue until afebrile 48h, then oral step-down guided by cultures.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 27)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-appendicitis', 'first-trimester', 'info', 5,
 'Appendicitis in Pregnancy',
 'Most common surgical problem in pregnancy, though pregnant women are actually **less likely** to have appendicitis than age-matched nonpregnant women. [30]

**Despite traditional teaching, RLQ pain is the most common location** at all gestational ages. [31]

Peritonitis is more common in pregnant patients with appendicitis (OR 1.3). Peritonitis → 4× higher rate of preterm birth. [32]

**Imaging algorithm:**
1. **Ultrasound first** — but visualization rate as low as 7%, sensitivity only 18% [33]
2. **MRI without contrast** — 94% sensitivity, 97% specificity. First trimester MRI is safe (no fetal risk to age 4). [34, 35]
3. **CT abdomen/pelvis** — if US indeterminate and MRI unavailable. Single study does NOT exceed threshold for fetal harm. Discuss risks/benefits with patient. [36]

**AVOID gadolinium** — associated with stillbirth, neonatal death, and rheumatologic conditions. [35]

[Imaging Safety in Pregnancy](#/info/ft-imaging-safety)

**Treatment: surgical.** No data support antibiotics-only strategy in pregnancy. All patients need surgical consultation. [1]',
 '[30,31,32,33,34,35,36]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ft-dispo-general', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 28)
;


-- MODULE 6: DISPOSITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-dispo-pul', 'first-trimester', 'result', 6,
 'Discharge — Pregnancy of Unknown Location',
 '**48-hour follow-up** for repeat beta-hCG and ultrasound.

**Discharge criteria:**
• Hemodynamically stable
• Normal vital signs
• No US evidence of ruptured ectopic
• Reliable for follow-up

**Strict return precautions:**
• Severe or worsening abdominal pain
• Heavy vaginal bleeding (soaking >1 pad/hour)
• Lightheadedness, dizziness, or syncope
• Fever
• Shoulder pain (referred from diaphragmatic irritation)

Continue serial monitoring until definitive diagnosis established (IUP confirmed, ectopic diagnosed, or beta-hCG reaches zero confirming completed miscarriage). [1]',
 '[1,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Discharge with 48-hour beta-hCG recheck and ultrasound. Strict return precautions. Continue serial monitoring until definitive diagnosis.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 29)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-dispo-miscarriage', 'first-trimester', 'result', 6,
 'Discharge — Miscarriage',
 '[Miscarriage Discharge Instructions](#/info/ft-miscarriage-discharge) — shareable patient handout

**Provide:**
• Clear explanation of diagnosis in compassionate, culturally sensitive manner [37]
• Prescription for chosen management (misoprostol if medical, or expectant instructions)
• Pain management: ibuprofen 600 mg PO q6h PRN
• Grief counseling resources and pregnancy-loss support groups [37]

**OB follow-up** within 1-2 weeks.

**Return precautions:**
• Soaking >1 pad/hour for 2+ consecutive hours
• Fever >100.4°F (38°C)
• Foul-smelling discharge
• Lightheadedness or syncope
• Persistent heavy bleeding beyond 2 weeks

Grief takes different forms — give permission to grieve in their own way. [37]',
 '[1,37]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Discharge with management plan, pain control, grief resources, and OB follow-up in 1-2 weeks.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 30)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-dispo-nvp', 'first-trimester', 'result', 6,
 'Discharge — NVP',
 '**Discharge criteria:**
• Tolerating oral intake
• Normal vital signs
• Electrolytes corrected (if checked)
• Able to keep down oral medications

**Prescriptions:**
• [Pyridoxine](#/drug/pyridoxine/nvp) 25 mg PO TID ± [Doxylamine](#/drug/doxylamine/nvp) 12.5 mg PO TID
• Consider generic pyridoxine + doxylamine instead of brand combination (significantly cheaper)
• Second-line agent if needed

**Counsel:**
• Small, frequent meals
• Avoid triggers (strong smells, fatty/spicy foods)
• Ginger (250 mg capsules QID) and P6 acupressure wristband as adjuncts
• OB follow-up within 1 week

**Return if:** unable to keep down fluids for >12 hours, persistent vomiting, lightheadedness, dark urine.',
 '[22]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Discharge with pyridoxine ± doxylamine. Generic prescriptions preferred for cost savings. OB follow-up in 1 week.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 31)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ft-dispo-general', 'first-trimester', 'result', 6,
 'General Disposition Criteria',
 '**Admit if:**
• Hemodynamic instability
• Ruptured ectopic (OR)
• Pyelonephritis (IV antibiotics)
• Appendicitis (surgical)
• Hyperemesis gravidarum refractory to ED treatment
• Septic abortion

**Discharge if:**
• Hemodynamically stable
• Diagnosis established or safe plan for outpatient follow-up
• Able to tolerate oral intake and medications
• Reliable for follow-up (especially PUL patients — 48h recheck)
• Adequate pain control

**ALL patients:** OB follow-up arranged. Clear return precautions documented.',
 '[1]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Disposition based on diagnosis and clinical stability. Ensure OB follow-up for all pregnant patients.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 32)
;


COMMIT;
