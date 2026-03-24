BEGIN;
-- 4. decision_nodes (30 nodes)

-- MODULE 1: INITIAL ASSESSMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-start', 'acetaminophen', 'question', 1,
 'Acetaminophen Overdose — Initial Assessment',
 '[APAP Overdose Steps Summary](#/info/apap-summary)

Acetaminophen is the **most common cause of acute liver failure** in the US and UK. Found in >600 OTC and prescription products (Tylenol, Percocet, Vicodin, NyQuil, Excedrin, Fioricet). [1][3]

**Therapeutic dose:** 10-15 mg/kg per dose (max 4g/day; 2g/day in chronic alcoholics)
**Toxic dose:** >150 mg/kg (single ingestion) or >7.5g total in adults [1]

**Mechanism:** Normal metabolism: 90% glucuronidation/sulfation → nontoxic. ~5% oxidized by CYP2E1 → **NAPQI** (toxic metabolite) → detoxified by glutathione. In overdose: conjugation saturated → excess NAPQI → glutathione depletion → **hepatocellular necrosis**. [1][3]

**N-acetylcysteine (NAC)** is a glutathione precursor — nearly **100% effective** when given within 8 hours of ingestion. [2]

Determine the ingestion pattern:',
 '[1,2,3]'::jsonb, '[{"label":"Acute Single Ingestion","description":"Known or suspected single ingestion within 24 hours","next":"apap-acute-hx"},{"label":"Repeated Supratherapeutic","description":"Multiple ingestions spanning >24 hours (including chronic use)","next":"apap-chronic-hx"},{"label":"Unknown / Unreliable History","description":"Conflicting statements, unknown timing, or insufficient detail","next":"apap-unknown"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"rumack-matthew","label":"Rumack-Matthew Nomogram"},{"id":"nac-dosing","label":"NAC IV Dosing"},{"id":"kings-college","label":"King''s College Criteria"},{"id":"alt-apap-product","label":"(ALT)(APAP) Product"}]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-acute-hx', 'acetaminophen', 'info', 1,
 'Acute Ingestion — History & Risk Factors',
 '**Gather critical history elements:**

• **Dose** — Potentially toxic: >150 mg/kg or >7.5g total (>10g per IBCC). How many pills? What strength?
• **Timing** — When did the ingestion occur? Single ingestion within <24h?
• **Formulation** — Immediate-release or extended-release?
• **Coingestants** — Opioids/anticholinergics delay absorption → delayed peak APAP level
• **Intent** — Intentional vs unintentional (affects disposition — psych eval required for intentional) [6]

[Risk Factors for Enhanced Toxicity](#/info/apap-risk-factors)

**Risk factors for enhanced toxicity (lower threshold for treatment):**
• **CYP2E1 inducers:** Isoniazid, rifampin, phenobarbital, carbamazepine, phenytoin, chronic alcohol
• **Glutathione depletion:** Chronic alcohol, malnutrition/fasting, chronic APAP use, chronic liver disease
• **Decreased glucuronidation:** Gilbert disease, zidovudine, TMP-SMX [4][12]

**Is the history reliable?** History is unreliable if: insufficient detail for dose/time, conflicting statements, or symptoms/labs inconsistent with stated history. When in doubt, treat as unreliable. [6]',
 '[4,6,12]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-acute-strat', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-chronic-hx', 'acetaminophen', 'info', 1,
 'Repeated Supratherapeutic Ingestion',
 '[Chronic/Repeated Supratherapeutic Ingestion](#/info/apap-chronic-ingestion)

Repeated supratherapeutic ingestion = **multiple ingestions spanning >24 hours** (including acute-on-chronic use). More common than acute OD in clinical practice. [6][17]

**The Rumack-Matthew nomogram does NOT apply** — there is no single "time of ingestion" to plot.

Presents with hepatotoxicity **without** early Stage 1 symptoms (nausea/vomiting). Patients may present directly with RUQ pain and elevated transaminases.

**"Alcohol-Tylenol Syndrome":** Chronic alcohol use + chronic acetaminophen = hepatotoxicity at doses generally considered safe (<4g/day). Double mechanism: CYP2E1 induction + glutathione depletion. [17]

**Inadvertent overdose** is especially dangerous — subacute glutathione depletion may not trigger alarm until significant hepatic injury has occurred.',
 '[6,17]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-chronic-eval', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-unknown', 'acetaminophen', 'info', 1,
 'Unknown Ingestion Pattern',
 '**Unreliable history — cannot apply nomogram.**

Criteria for unreliable history: [6]
• Insufficient detail to establish dose and time
• Conflicting statements
• Symptoms, signs, or lab values inconsistent with stated history

**Immediate actions:**
• Draw APAP level + AST/ALT + INR + BMP + lactate NOW
• Salicylate level (coingestion screening)
• If APAP detectable OR ALT elevated → **start NAC empirically**
• If massive ingestion suspected (AMS, early lactic acidosis) → treat as high-risk

**When in doubt → give NAC.** Minimal side effects, potentially life-saving. [2]',
 '[2,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-empiric-nac', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3)
;


-- MODULE 2: RISK STRATIFICATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-acute-strat', 'acetaminophen', 'question', 2,
 'Acute Ingestion — APAP Level & Timing',
 '**Draw serum APAP level at 4 hours post-ingestion** (or immediately if >4 hours since ingestion). Plot on the Rumack-Matthew nomogram. [4][6]

[Rumack-Matthew Nomogram Guide](#/info/apap-nomogram)

**Treatment line:** 150 mcg/mL at 4h (US uses this line; original Rumack line was 200)
**High-risk line:** 300 mcg/mL at 4h (indicates massive overdose)

If level drawn <4h: An undetectable concentration after >2h typically excludes significant ingestion, but repeat at ≥4h to confirm. [6]

**Labs to order:** APAP level, AST/ALT, INR/PT, BMP (Cr, glucose, bicarb), lipase, bilirubin, CBC, salicylate level, lactate, VBG/ABG. [1]',
 '[4,6]'::jsonb, '[{"label":"Below Treatment Line (150)","description":"APAP level below 150 mcg/mL at 4h (or below line at later time)","next":"apap-below-line"},{"label":"Above Treatment Line (150-300)","description":"Between treatment and high-risk lines — start NAC","next":"apap-above-line","urgency":"urgent"},{"label":"Above High-Risk Line (>300)","description":">300 mcg/mL at 4h — massive overdose protocol","next":"apap-high-risk","urgency":"critical"},{"label":"Extended-Release or Coingestant","description":"ER formulation or opioid/anticholinergic coingestant","next":"apap-er-coingest"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"rumack-matthew","label":"Rumack-Matthew Nomogram"}]'::jsonb, 4)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-er-coingest', 'acetaminophen', 'question', 2,
 'Extended-Release / Coingestant Considerations',
 '**Extended-release tablets or opioid/anticholinergic coingestants** may delay peak APAP absorption, making a single level unreliable. [6][13]

**If APAP level at 4-12h is above the treatment line** → treatment is indicated regardless.

**If APAP level at 4-24h is <10 mcg/mL** → no further levels needed, no treatment.

**If APAP level at 4-12h is below treatment line but >10 mcg/mL** → redraw in 4-6 hours. If second level is above the line at its corresponding time point → treat. [6]

⚠️ Modified-release tablets (available outside the US) are more problematic and unpredictable — consult local toxicologists.',
 '[6,13]'::jsonb, '[{"label":"Level Above Treatment Line","description":"Start NAC — treatment indicated","next":"apap-above-line","urgency":"urgent"},{"label":"Level <10 mcg/mL","description":"No further levels or treatment needed","next":"apap-observe"},{"label":"Below Line but >10 mcg/mL","description":"Redraw in 4-6 hours — delayed absorption possible","next":"apap-below-line"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-chronic-eval', 'acetaminophen', 'question', 2,
 'Chronic Ingestion — Lab Evaluation',
 '**Rumack-Matthew nomogram does NOT apply to repeated supratherapeutic ingestion.** [6]

Order: APAP level, AST/ALT, INR, BMP, lactate.

Use the **(ALT)(APAP) product** to assess hepatotoxicity risk: [17]
• **>10,000 mcg/mL × IU/L** = strongly associated with hepatotoxicity
• **<1,500 mcg/mL × IU/L** = hepatotoxicity very unlikely

Treat if **any** of the following:
• ALT elevated above normal
• APAP level detectable
• (ALT)(APAP) product >10,000
• Clinical concern despite labs (risk factors present)',
 '[6,17]'::jsonb, '[{"label":"ALT Elevated or APAP Detectable","description":"Start NAC — hepatotoxicity risk","next":"apap-chronic-treat","urgency":"urgent"},{"label":"Normal Labs, Low (ALT)(APAP) Product","description":"ALT normal, APAP undetectable, product <1,500","next":"apap-chronic-discharge"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"alt-apap-product","label":"(ALT)(APAP) Product"}]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-chronic-treat', 'acetaminophen', 'info', 2,
 'Chronic Ingestion — Start NAC',
 '**Initiate IV NAC** — chronic/repeated supratherapeutic ingestion with evidence of hepatotoxicity or ongoing APAP exposure.

Use standard 3-bag IV protocol. Consult toxicology/poison control — these cases are complex. [6]

Serial labs q6h: APAP level, AST/ALT, INR, BMP. Recalculate (ALT)(APAP) product with each set to track trajectory.

Stopping criteria are the same as for acute ingestion: APAP <10 mcg/mL + INR <2 + AST/ALT improving + clinically well.',
 '[6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-nac-iv', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-chronic-discharge', 'acetaminophen', 'result', 2,
 'Chronic Ingestion — Low Risk',
 '**Low risk of hepatotoxicity.**

ALT is normal, APAP is undetectable, and (ALT)(APAP) product <1,500.

• Counsel on safe acetaminophen use: max 4g/day (2g/day with chronic alcohol use)
• Avoid combining multiple APAP-containing products
• If risk factors present (chronic alcohol, malnutrition), consider lower observation threshold
• **Poison Control: 1-800-222-1222**

Consult toxicology if any clinical uncertainty.',
 '[6]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Low-risk chronic ingestion — consider discharge after counseling on safe APAP use', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 8)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-below-line', 'acetaminophen', 'question', 2,
 'Below Treatment Line',
 'APAP level is **below the treatment line** on the Rumack-Matthew nomogram. Low risk of hepatotoxicity **if this is a reliable acute single ingestion**. [4][6]

**However, consider:**
• Extended-release or coingestant → serial levels needed (see above)
• Risk factors (CYP2E1 inducers, alcoholism, malnutrition) → lower threshold to treat
• Any doubt about history reliability → empiric NAC

If <4 hours since ingestion, GI decontamination with activated charcoal may still be beneficial.

**If any doubt → give NAC.** It is extremely safe. [2]',
 '[2,4,6]'::jsonb, '[{"label":"Confident in Low Risk","description":"Reliable history, no risk factors, no coingestants","next":"apap-observe"},{"label":"Within 4 Hours — Give Charcoal","description":"Ingestion <4h ago, patient alert with protected airway","next":"apap-gi-decon"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9)
;


-- MODULE 3: NAC PROTOCOL
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-gi-decon', 'acetaminophen', 'info', 3,
 'GI Decontamination — Activated Charcoal',
 '[Activated Charcoal](#/drug/activated-charcoal/acetaminophen toxicity) **1 g/kg PO (max 50g)**

**Timing:** Within **4 hours** of ingestion (2023 US/Canada consensus extends traditional 1-2h window). [6]

**Massive ingestion (>30g):** Consider activated charcoal even **>4 hours** post-ingestion — greatest benefit in massive poisoning where standard NAC may be inadequate. [9]

**Extended-release formulations:** May benefit beyond 4h if evidence of ongoing absorption (rising APAP levels). [6]

**Contraindications:**
• Unprotected airway or altered mental status (aspiration risk)
• Caustic coingestant
• GI perforation or obstruction

⚠️ **Do NOT delay NAC** for charcoal administration. Give charcoal and start NAC concurrently if indicated. [6]',
 '[6,9]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-nac-choice', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-nac-choice', 'acetaminophen', 'question', 3,
 'NAC — Route Selection',
 '**N-Acetylcysteine (NAC)** is the definitive antidote. [2][3]

[NAC Protocol Comparison](#/info/apap-nac-comparison)

**Indications for NAC:**
• APAP level above treatment line on nomogram
• Time of ingestion unknown and APAP level detectable
• Elevated transaminases with history of APAP ingestion
• Ingestion >150 mg/kg and level won''t be available within 8 hours
• **Any doubt → give NAC** (minimal side effects, potentially life-saving) [6]

**Pregnancy is NOT a contraindication** — NAC is safe and beneficial. Delayed treatment increases risk of miscarriage/fetal death. IV preferred in pregnancy. [10]

Select route:',
 '[2,3,6,10]'::jsonb, '[{"label":"IV NAC — 21-Hour Protocol (Preferred)","description":"100% bioavailability, faster, avoids emesis","next":"apap-nac-iv"},{"label":"Oral NAC — 72-Hour Protocol","description":"No IV access or patient preference","next":"apap-nac-oral"},{"label":"Two-Bag Modified Prescott","description":"Lower anaphylactoid rate, used in Australia/NZ","next":"apap-nac-twobag"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"nac-dosing","label":"NAC IV Dosing Calculator"}]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-nac-iv', 'acetaminophen', 'info', 3,
 'IV NAC — 21-Hour Protocol (Preferred)',
 '[N-Acetylcysteine](#/drug/n-acetylcysteine/acetaminophen iv)

**Standard 3-Bag IV Protocol:**

**Bag 1 (Loading):** 150 mg/kg IV in 200 mL D5W over **60 minutes**
**Bag 2:** 50 mg/kg IV in 500 mL D5W over **4 hours** (12.5 mg/kg/hr)
**Bag 3:** 100 mg/kg IV in 1000 mL D5W over **16 hours** (6.25 mg/kg/hr)

**Total: 300 mg/kg over 21 hours** [3][6]

**Cap dose at 100 kg** for morbid obesity. [6]

**Anaphylactoid reactions** (flushing, urticaria, bronchospasm) most common during Bag 1. These are histamine-mediated (NOT IgE allergy). Slow or pause infusion; treat with antihistamines. **Do NOT permanently stop NAC.** [11]

NAC itself may cause mild INR prolongation — do not confuse with hepatic synthetic failure.',
 '[3,6,11]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-nac-anaphylactoid', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-nac-oral', 'acetaminophen', 'info', 3,
 'Oral NAC — 72-Hour Protocol',
 '[N-Acetylcysteine](#/drug/n-acetylcysteine/acetaminophen oral)

**Oral NAC Protocol:** [2]

**Loading:** 140 mg/kg PO
**Maintenance:** 70 mg/kg PO every 4 hours × 17 additional doses
**Total: 1,330 mg/kg over 72 hours**

Mix with **cola or juice** to improve palatability (oral NAC has a terrible smell and taste).
If patient **vomits within 1 hour** of dose → repeat the dose.
Consider [Ondansetron](#/drug/ondansetron/nausea) 30 minutes prior to reduce vomiting. [2]

**Advantages:** No IV access needed, no anaphylactoid risk, higher hepatic first-pass delivery.
**Disadvantages:** 72-hour duration, vomiting, low systemic bioavailability (4-10%). Activated charcoal may reduce oral NAC absorption — IV preferred when both are given.',
 '[2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-nac-stop', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-nac-twobag', 'acetaminophen', 'info', 3,
 'Two-Bag Modified Prescott Protocol',
 '**Simplified 2-bag regimen** (used in Australia/New Zealand): [7][13]

**Bag 1:** 200 mg/kg IV in D5W over **4 hours**
**Bag 2:** 100 mg/kg IV in D5W over **16 hours**
**Total: 300 mg/kg over 20 hours**

**Lower rate of anaphylactoid reactions** compared to the standard 3-bag protocol — the slower initial infusion rate reduces histamine release. [7]

Same total dose as the standard protocol. To avoid dosing errors, use the protocol your pharmacy is familiar with.

[NAC Protocol Comparison](#/info/apap-nac-comparison)',
 '[7,13]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-nac-stop', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-nac-anaphylactoid', 'acetaminophen', 'info', 3,
 'Anaphylactoid Reaction Management',
 '[NAC Anaphylactoid Reaction Management](#/info/apap-anaphylactoid)

**NOT a true allergy** — histamine-mediated, not IgE. Usually within first 2 hours, almost always within 6 hours. In a study of **6,455 NAC treatment courses**, no deaths were attributed to anaphylactoid reactions. [11]

**Graded response:**

**Flushing only** → Continue NAC, monitor closely

**Urticaria** → [Diphenhydramine](#/drug/diphenhydramine/angioedema) 1 mg/kg IV (max 50 mg). Consider steroid. **Continue NAC.**

**Angioedema** → Diphenhydramine + steroid. **Hold NAC for 1 hour**, then resume at slower rate.

**Respiratory symptoms or hypotension** → Diphenhydramine + steroid + [Epinephrine](#/drug/epinephrine/anaphylaxis) IM. Hold NAC for 1 hour, then resume.

⚠️ **NEVER permanently discontinue NAC.** Liver failure from stopping NAC is far more dangerous than the anaphylactoid reaction. Previous reaction is NOT a contraindication to future use — can pre-treat with antihistamines. [11]',
 '[11]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-nac-stop', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-nac-stop', 'acetaminophen', 'question', 3,
 'When to Stop NAC',
 '**Continue NAC until ALL stopping criteria are met:** [6][13]

✅ **1.** APAP level <10 mcg/mL (undetectable)
✅ **2.** INR <2
✅ **3.** AST/ALT meets ONE of:
   • Normal
   • At patient''s baseline
   • Decreased **>25-50% from peak** value
✅ **4.** Clinically well

**Note:** Small fluctuations in ALT (±20 IU/L or ±10%) are common and do not necessarily indicate ongoing injury, especially if the ALT level is low. [13]

If criteria are NOT met → continue NAC by **repeating the 3rd bag** (100 mg/kg over 16 hours) indefinitely.',
 '[6,13]'::jsonb, '[{"label":"Criteria Met — Stop NAC","description":"APAP undetectable, INR <2, AST/ALT improving, clinically well","next":"apap-dispo-admit"},{"label":"Criteria NOT Met — Continue NAC","description":"Repeat Bag 3 (100 mg/kg over 16h) indefinitely","next":"apap-hepatic-failure","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16)
;


-- MODULE 4: MASSIVE OVERDOSE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-above-line', 'acetaminophen', 'info', 4,
 'Above Treatment Line — Start NAC',
 '**APAP level is above the treatment line (150 mcg/mL at 4h).** Start NAC immediately. [4][6]

NAC is nearly **100% effective** when given within 8 hours of ingestion. Efficacy decreases with delay but still provides benefit even after hepatic failure is established. [2]

**Concurrent actions:**
• GI decontamination with [Activated Charcoal](#/drug/activated-charcoal/acetaminophen toxicity) if within 4 hours
• Labs: APAP level q4-6h, AST/ALT, INR, BMP, lactate
• Salicylate level (coingestion screen)

If the level is **below** the 300 line → standard NAC protocol.
If the level is **above** the 300 line → massive overdose protocol (high-dose NAC).',
 '[2,4,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-nac-choice', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-high-risk', 'acetaminophen', 'question', 4,
 'High-Risk (Massive) Overdose',
 '[High-Dose NAC & Massive Overdose](#/info/apap-massive-od)

**Definition of massive overdose:** [8][14]
• >30 grams ingested (or >0.5 g/kg if <60 kg)
• APAP level above the **300 line** on the nomogram

**Clinical presentation:** Early **lactic acidosis** + **altered mental status** within 12 hours — due to mitochondrial dysfunction, **BEFORE liver damage occurs**. Other symptoms during Stage 1 (within 24h) suggest massive ingestion or coingestant. [8][16]

**Standard NAC may be INADEQUATE** — NAC neutralizes NAPQI in a 1:1 molar ratio, so the dose must scale with the amount of acetaminophen. [8]

**Activate all four interventions:**',
 '[8,14,16]'::jsonb, '[{"label":"High-Dose NAC Protocol","description":"Hendrickson dosing — increase Bag 3 rate based on severity","next":"apap-high-nac","urgency":"critical"},{"label":"Fomepizole","description":"CYP2E1 inhibitor — blocks NAPQI formation","next":"apap-fomepizole","urgency":"urgent"},{"label":"Hemodialysis Evaluation","description":"EXTRIP criteria — removes APAP and NAPQI","next":"apap-dialysis","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-high-nac', 'acetaminophen', 'info', 4,
 'High-Dose NAC — Hendrickson Protocol',
 '[N-Acetylcysteine](#/drug/n-acetylcysteine/massive acetaminophen)

**Hendrickson 2019:** Keep Bag 1 + Bag 2 standard. **INCREASE Bag 3 infusion rate** based on severity: [8]

• **Above 300 line:** 12.5 mg/kg/hr (**2× standard**)
• **Above 450 line:** 18.75 mg/kg/hr (**3× standard**)
• **Above 600 line:** 25 mg/kg/hr (**4× standard**)

**During hemodialysis:** Double whatever rate you would otherwise use. HD removes ~50% of NAC. Minimum rate during HD: 12.5 mg/kg/hr. Maximum: 25 mg/kg/hr. [6][9]

⚠️ **Doubling the rate** is increasingly accepted. Tripling/quadrupling remains more controversial — **consult toxicology/poison control.** [14]

**Activated charcoal:** Give even if >4 hours post-ingestion for massive overdose. [6][9]

**Also give:** Activated charcoal (even >4h) + fomepizole + evaluate for hemodialysis.',
 '[6,8,9,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-fomepizole', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-fomepizole', 'acetaminophen', 'info', 4,
 'Fomepizole — CYP2E1 Inhibition',
 '[Fomepizole](#/drug/fomepizole/massive acetaminophen)

**Mechanism:** Inhibits CYP2E1 → **prevents conversion of acetaminophen to toxic NAPQI**. Complementary to NAC (which detoxifies NAPQI after it forms). [15]

**Dosing:** 15 mg/kg IV over 30 minutes (loading) → 10 mg/kg IV q12h for 48 hours or until APAP level is undetectable. [15]

Fomepizole has shown benefit in animal models, primary human hepatocytes, and a human volunteer study (reduced toxic metabolite generation). [15]

**Generally safe.** Main drawback is cost. Headache, nausea, dizziness are common but mild. Transient transaminase elevation in ~20%.

**Indications:** Established high-risk/massive acetaminophen ingestion. Use alongside high-dose NAC. [14][15]

Consult toxicology/poison control for all massive ingestions.',
 '[14,15]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-dialysis', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-dialysis', 'acetaminophen', 'info', 4,
 'Hemodialysis — EXTRIP Guidelines',
 'Hemodialysis removes both **APAP and toxic NAPQI metabolites**. May be beneficial in massive poisoning where NAC alone is inadequate. [9]

**EXTRIP indications for extracorporeal treatment:** [9]
• APAP level **>900 mcg/mL**
• Altered mental status + lactate >3 + **pH <7.1**
• Clinical deterioration despite adequate NAC
• Mitochondrial dysfunction (early lactic acidosis, altered consciousness)

⚠️ **Hemodialysis is NOT a substitute for NAC.** Patients on dialysis require **HIGHER NAC doses** because HD removes ~50% of NAC. Minimum 12.5 mg/kg/hr during intermittent HD. [6][9]

**Coordinate with nephrology early** for massive ingestions. Continuous renal replacement therapy (CRRT) is an alternative if hemodynamically unstable.',
 '[6,9]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-hepatic-failure', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;


-- MODULE 5: HEPATIC FAILURE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-hepatic-failure', 'acetaminophen', 'info', 5,
 'Established Hepatic Failure — Management',
 '[Four Stages of Acetaminophen Toxicity](#/info/apap-stages)

[N-Acetylcysteine](#/drug/n-acetylcysteine/hepatic failure)

**Continue IV NAC indefinitely** — repeat Bag 3 (100 mg/kg over 16 hours) until the patient recovers or dies. [5][10]

NAC provides benefit **even in established hepatic failure** — proven **28% mortality benefit** in an RCT of patients with acetaminophen-induced fulminant hepatic failure (Keays 1991). [10]

⚠️ **Do NOT allow the NAC infusion to stop** until the liver is clearly improving AND the APAP level is zero.

**Assess for transplant referral immediately:**',
 '[5,10]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-kings', NULL, NULL, NULL, '[]'::jsonb, '[{"id":"kings-college","label":"King''s College Criteria"}]'::jsonb, 22)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-kings', 'acetaminophen', 'info', 5,
 'King''s College Criteria — Transplant Referral',
 '**APAP-induced acute liver failure — transplant referral criteria:** [5]

**pH <7.30** after adequate fluid resuscitation (regardless of encephalopathy grade) — **alone is sufficient**

**OR all three:**
• INR **>6.5** (PT >100 sec)
• Creatinine **>3.4 mg/dL**
• Grade **III-IV** hepatic encephalopathy

**Additional poor prognostic markers:**
• Lactate >3.5 mmol/L after resuscitation
• Phosphate >3.75 mg/dL at 48-96 hours

**Contact transplant center EARLY** — do not wait for full criteria to be met. Patients with severe liver injury (encephalopathy, pH <7.3, INR >3, renal failure) should be discussed with a transplant team. [5]

Patients with acute hepatic failure **CAN be transplant candidates** even after recent suicidal ingestion.',
 '[5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-hepatic-support', NULL, NULL, NULL, '[]'::jsonb, '[{"id":"kings-college","label":"King''s College Criteria"}]'::jsonb, 23)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-hepatic-support', 'acetaminophen', 'info', 5,
 'Supportive Care — Complications',
 '**Manage complications of hepatic failure:** [1][12][16]

**Coagulopathy:**
• FFP only if **ACTIVE bleeding** — FFP obscures INR trending, which is the single best prognostic marker
• Vitamin K may be given but rarely helps in acute liver failure

**Cerebral edema** (greatest risk of death in Stage 3):
• Elevate HOB 30°
• Hypertonic saline 23.4% for herniation
• Mannitol 0.5-1 g/kg
• Avoid stimulation, maintain normothermia

**Hypoglycemia:**
• D10W continuous infusion
• Frequent glucose monitoring (q1-2h)

**Renal failure** (occurs in 10-25% of patients, >50% with hepatic failure):
• Supportive care, dialysis PRN
• Hepatorenal syndrome management if applicable
• Renal recovery generally occurs if patient survives [12]

**Infection:**
• Low threshold for broad-spectrum antibiotics — hepatic failure patients are immunocompromised',
 '[1,12,16]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-dispo-icu', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 24)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-empiric-nac', 'acetaminophen', 'info', 5,
 'Empiric NAC — Unknown Ingestion',
 '**Start NAC empirically** when:
• History is unreliable AND APAP is detectable
• History is unreliable AND ALT is elevated
• Ingestion >150 mg/kg and level won''t be available within 8 hours
• Any clinical doubt

**When in doubt → give NAC.** [2][6]

Minimal side effects. Potentially life-saving. NAC has no absolute contraindications for acetaminophen toxicity.

Draw labs now: APAP level, AST/ALT, INR, BMP, lactate, salicylate level. Results will guide further management while NAC is already running.',
 '[2,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-nac-iv', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 25)
;


-- MODULE 6: DISPOSITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-dispo-admit', 'acetaminophen', 'result', 6,
 'Admit — Ward Level Care',
 '**Admit to medical floor if:**
• NAC initiated (continue per protocol)
• Elevated transaminases (AST/ALT monitoring q6-12h)
• Altered mental status
• Significant coingestant requiring monitoring
• Unreliable history with ongoing concern

**Continue monitoring:**
• APAP level, AST/ALT, INR, BMP q6-12h
• Reassess NAC stopping criteria at each lab check
• Serial clinical assessments

Escalate to ICU if evidence of hepatic failure (coagulopathy, encephalopathy, acidosis, renal failure).

**Psychiatric evaluation** for all intentional ingestions — can be completed during admission.',
 '[1,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit for NAC completion and serial lab monitoring. Escalate to ICU if signs of hepatic failure.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 26)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-dispo-icu', 'acetaminophen', 'result', 6,
 'Admit — ICU Level Care',
 '**ICU admission for:**
• Evidence of hepatic failure: coagulopathy (INR >3), encephalopathy, acidosis (pH <7.3), renal failure
• Massive ingestion with early lactic acidosis or altered mental status
• King''s College Criteria met — transfer to transplant center
• Hemodialysis required
• Hemodynamic instability

**ICU management:**
• Continue IV NAC indefinitely (repeat Bag 3)
• Serial labs q6h: APAP, AST/ALT, INR, BMP, lactate, glucose
• Cerebral edema monitoring and management
• Early transplant center discussion
• D10W infusion for hypoglycemia
• Low threshold for antibiotics

**Poison Control: 1-800-222-1222**',
 '[1,5,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'ICU admission for hepatic failure management. Continue NAC indefinitely. Contact transplant center early.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 27)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-observe', 'acetaminophen', 'info', 6,
 'Observation & Monitoring',
 '**Observation period: 4-6 hours** from time of ingestion with repeat labs before disposition. [1][6]

Recheck at end of observation:
• APAP level (should be trending down if detectable)
• AST/ALT (any elevation warrants NAC regardless of APAP level)
• INR
• Creatinine

**Reassess for:**
• Delayed absorption (extended-release, coingestants)
• Late-rising APAP levels
• New symptoms

If all labs remain normal and patient is asymptomatic → proceed to discharge evaluation.',
 '[1,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'apap-dispo-discharge', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 28)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('apap-dispo-discharge', 'acetaminophen', 'result', 6,
 'Discharge Criteria',
 '**Safe to discharge if ALL of the following are met:** [1][6]

✅ APAP level below treatment line at ≥4 hours post-ingestion
✅ Normal AST/ALT
✅ Normal INR
✅ Normal creatinine
✅ 4-6 hour observation complete
✅ Asymptomatic

⚠️ **Psychiatric evaluation is MANDATORY for ALL intentional ingestions** before discharge. [1]

**Discharge counseling:**
• Safe acetaminophen use: max 4g/day (2g/day with chronic alcohol use or liver disease)
• Avoid combining multiple APAP-containing products
• Read labels — APAP is in >600 products
• Return for: RUQ pain, nausea/vomiting, jaundice, dark urine, confusion

**Poison Control: 1-800-222-1222**',
 '[1,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Discharge after observation if all labs normal, asymptomatic, and psychiatric clearance obtained for intentional ingestions.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 29)
;
COMMIT;
