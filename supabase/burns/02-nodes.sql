BEGIN;
DELETE FROM decision_nodes WHERE tree_id = 'burns';
-- 4. decision_nodes (49 nodes)

-- MODULE 1: INITIAL ASSESSMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-start', 'burns', 'info', 1,
 'Burns: Initial Assessment',
 '[Burns Steps Summary](#/info/burns-summary) — stepwise approach to burn assessment and management.

This consult covers the **7-module approach** to burn management: initial assessment, TBSA calculation, fluid resuscitation, airway and inhalation injury, escharotomy, chemical burns, and wound care with disposition planning.

**Burns are trauma patients first.** Complete a primary survey (ABCDE) before focusing on burn-specific assessment. Up to 10% of burn patients have associated traumatic injuries that may take priority. Maintain a low threshold for intubation with any signs of airway involvement — edema progresses rapidly and the window for safe intubation closes within hours.',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-type', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-type', 'burns', 'question', 1,
 'Burn Mechanism',
 'Identify the mechanism of injury. Mechanism determines the initial management pathway and anticipates specific complications.

Thermal burns are most common (>80%). Chemical and electrical burns require agent-specific and mechanism-specific protocols. Radiation burns are rare and require specialized consultation.

**Consider toxic inhalation in ALL burns** — especially enclosed-space fires. CO and cyanide exposure can occur without visible airway injury:
• [CO Poisoning Assessment](#/node/burn-co-assess) — co-oximetry required (pulse ox unreliable)
• [Cyanide Poisoning Assessment](#/node/burn-cyanide) — suspect if lactate >8, AMS, hemodynamic instability',
 '[]'::jsonb, '[{"label":"Thermal (flame, scald, contact, flash)","next":"burn-primary-survey"},{"label":"Chemical (acid, alkali, HF, metals)","next":"burn-chem-start"},{"label":"Electrical (high voltage >1000V, low voltage, lightning)","next":"burn-electrical"},{"label":"Radiation","next":"burn-radiation"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-electrical', 'burns', 'info', 1,
 'Electrical Burns',
 '**Electrical burns cause internal damage far exceeding external appearance.** Current follows the path of least resistance: nerve > blood vessel > muscle > skin > tendon > fat > bone.

**High voltage (>1000V):**
• Entry/exit wounds — look for both
• Deep tissue necrosis along current path
• Rhabdomyolysis — aggressive IVF, target UOP 1-1.5 mL/kg/hr
• Compartment syndrome risk (especially forearm, leg)
• Cardiac: dysrhythmias, myocardial injury
• Vascular thrombosis — delayed presentation possible
• Spinal cord injury (transient or permanent)

**Low voltage (<1000V):**
• Household current (120-240V) — typically hand contact burns
• Cardiac monitoring × 4-6h if any LOC, abnormal ECG, or arrhythmia
• Oral commissure burns in children (biting cords) — delayed labial artery hemorrhage at 5-7 days

**Lightning:**
• Flashover effect — current travels over body surface
• Cardiac arrest: **asystole > VF** (reverse of typical arrest)
• Tympanic membrane rupture (50%)
• Fixed dilated pupils from autonomic dysfunction — do NOT use as prognostic sign
• Keraunoparalysis (transient lower extremity paralysis)

**Labs:** CK, myoglobin, BMP (hyperkalemia from rhabdo), lactate, UA (myoglobinuria), troponin, 12-lead ECG.

If rhabdomyolysis with hyperkalemia → [Potassium Disorders](#/tree/potassium)',
 '[2,9]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-primary-survey', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-radiation', 'burns', 'result', 1,
 'Radiation Burns',
 '**Radiation burns are rare in the ED.** Localized radiation injury typically presents with delayed onset (hours to days after exposure). Severity depends on dose, duration, and type of radiation.

**Immediate actions:**
• Contact **REAC/TS (Radiation Emergency Assistance Center): 865-576-1005** — 24/7 consultation
• **Decontaminate BEFORE treating** — external contamination is the priority
• Remove all clothing (removes ~90% of external contamination)
• Irrigate skin with copious water, paying attention to body folds
• Bag and label all removed clothing and materials

**PPE for providers:** Standard precautions are generally adequate for external contamination. Double glove, gown, shoe covers. Radiation injury itself is NOT contagious.

**Wound management:** Treat the wound as you would a thermal burn of equivalent depth. Monitor for delayed effects — erythema may worsen over days to weeks.',
 '[2]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Radiation burns are rare. Contact REAC/TS (865-576-1005). Decontaminate first — remove clothing (90% decontamination). Treat wound as thermal burn. Monitor for delayed effects.', NULL, 'consider', '[]'::jsonb, '[]'::jsonb, 3)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-primary-survey', 'burns', 'info', 1,
 'Primary Survey (ABCDE)',
 '**A — Airway:** Facial burns, soot in nares/oropharynx, singed nasal/facial hair, hoarse voice, stridor → **early intubation.** Airway edema peaks at 12-24h. If you are considering intubation, do it now — the airway will only get worse.

**B — Breathing:** Circumferential chest burns may restrict ventilation → escharotomy. Assess for inhalation injury. Auscultate for wheezing, stridor.

**C — Circulation:** Establish large-bore IV access — can go through burned skin if necessary. IO access if IV not obtainable. Begin fluid resuscitation early. Circumferential extremity burns → monitor pulses.

**D — Disability:** Enclosed space → suspect CO and cyanide poisoning. Assess GCS. Hypoxia may present as agitation.

**E — Exposure/Environment:** Remove ALL clothing and jewelry (rings, watches — edema will make removal impossible later). Cover with clean dry sheets. **Prevent hypothermia** — burns patients lose thermoregulation. Warm IV fluids, warm room, blankets.

[Prehospital Burn Considerations](#/info/burns-prehospital)',
 '[1,2,16]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-inhalation-screen', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-inhalation-screen', 'burns', 'question', 1,
 'Inhalation Injury Screening',
 '**High-risk signs for inhalation injury:**
• Enclosed space fire
• Facial burns, singed facial/nasal hair
• Soot in nares, mouth, or sputum
• Carbonaceous sputum
• Hoarse voice, stridor, dyspnea
• Wheezing or rales
• Hypoxia or altered mental status

**Inhalation injury significantly worsens prognosis** — increases mortality by 20-60% and fluid requirements by 30-50%. It is the strongest predictor of mortality in burn patients, independent of TBSA and age.

Direct laryngoscopy or bronchoscopy can confirm the diagnosis but should not delay treatment if clinical suspicion is high.',
 '[1,8]'::jsonb, '[{"label":"Yes — signs of inhalation injury","next":"burn-airway-assess","urgency":"critical"},{"label":"No — isolated cutaneous burn","next":"burn-co-assess"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-depth', 'burns', 'info', 1,
 'Burn Depth Assessment',
 '[Burn Depth Classification Guide](#/info/burns-depth-guide)

**Five-tier burn depth classification:**

**1. Epidermal (Superficial):** Red, painful, no blisters, blanches with pressure. Sunburn. Heals 3-5 days. **NOT counted in TBSA.**

**2. Superficial Partial Thickness (2nd degree):** Blisters, moist pink base, very painful, brisk capillary refill. Heals 7-14 days with minimal scarring.

**3. Deep Partial Thickness (2nd degree):** Blisters (may have ruptured), pale/mottled base, decreased sensation, sluggish capillary refill. Heals 14-35 days with scarring. May require excision and grafting.

**4. Full Thickness (3rd degree):** White, waxy, or charred. Leathery, insensate. No capillary refill. No blisters. Requires surgical excision and grafting.

**5. 4th Degree:** Extends into muscle, tendon, or bone. Charred. Requires amputation or extensive reconstruction.

**Key assessment tip:** Speed of capillary refill is the single most useful bedside test. Brisk = superficial partial. Sluggish = deep partial. Absent = full thickness.

**Important:** Optimal depth assessment is at 3-5 days post-burn — initial assessment frequently underestimates depth. Early surgical consultation for burns that may be deep partial or full thickness.',
 '[2,3,23]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-tbsa-age', NULL, NULL, NULL, '[{"src":"images/burns/burns-depth.png","alt":"Burn depth classification cross-section","caption":"Five-tier burn depth classification showing skin layers affected"}]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-tbsa-age', 'burns', 'question', 1,
 'Patient Age for TBSA',
 'Select the appropriate TBSA estimation method based on patient age.

**Only count partial thickness (2nd degree) and full thickness (3rd/4th degree) burns in TBSA.** Epidermal/superficial burns (e.g., sunburn) are NOT included in TBSA calculations.

Accurate TBSA estimation is critical — it drives fluid resuscitation volumes, burn center transfer decisions, and prognosis.',
 '[]'::jsonb, '[{"label":"Adult or adolescent (>14 years)","next":"burn-tbsa-adult"},{"label":"Pediatric (0-14 years)","next":"burn-tbsa-peds"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7)
;


-- MODULE 2: TBSA CALCULATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-tbsa-adult', 'burns', 'info', 2,
 'TBSA — Rule of 9''s (Adult)',
 '**Rule of 9''s — Adult Body Surface Area:**

• **Head & neck:** 9%
• **Each upper extremity:** 9% (entire arm)
• **Anterior trunk:** 18%
• **Posterior trunk:** 18%
• **Each lower extremity:** 18% (entire leg)
• **Perineum/genitalia:** 1%
• **Total:** 100%

**Palm method:** The patient''s palm (fingers together) ≈ **1% TBSA**. Useful for scattered or irregular burn patterns. For scattered burns, use the palm method to supplement the Rule of 9''s.

**Obesity caveat:** The Rule of 9''s underestimates TBSA in obese patients. The trunk accounts for a greater percentage and extremities a lesser percentage. Consider using serial halving or digital planimetry for BMI >30.',
 '[2,20]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-tbsa-result', NULL, NULL, NULL, '[{"src":"images/burns/burns-rule-of-nines.png","alt":"Rule of Nines adult body diagram","caption":"Adult Rule of 9''s — front and back views with region percentages"}]'::jsonb, '[{"id":"tbsa-adult","label":"TBSA Calculator (Adult)"}]'::jsonb, 8)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-tbsa-peds', 'burns', 'info', 2,
 'TBSA — Lund-Browder (Pediatric)',
 '**Children have proportionally larger heads and smaller legs** than adults. The Rule of 9''s is inaccurate for patients ≤14 years. Use the **Lund-Browder chart** for age-adjusted TBSA estimation.

**Age-adjusted percentages (Lund-Browder):**

| Region | 0-1 yr | 1-4 yr | 5-9 yr | 10-14 yr |
|--------|--------|--------|--------|----------|
| Head | 19% | 17% | 13% | 11% |
| Neck | 2% | 2% | 2% | 2% |
| Ant. trunk | 13% | 13% | 13% | 13% |
| Post. trunk | 13% | 13% | 13% | 13% |
| Each buttock | 2.5% | 2.5% | 2.5% | 2.5% |
| Genitalia | 1% | 1% | 1% | 1% |
| Each upper arm | 4% | 4% | 4% | 4% |
| Each forearm | 3% | 3% | 3% | 3% |
| Each hand | 2.5% | 2.5% | 2.5% | 2.5% |
| Each thigh | 5.5% | 6.5% | 8% | 8.5% |
| Each leg | 5% | 5% | 5.5% | 6% |
| Each foot | 3.5% | 3.5% | 3.5% | 3.5% |

**Key point:** As children age, the head proportion decreases and leg proportion increases, converging toward adult values by age 15.

For infants and toddlers, the palm method (1% TBSA) can supplement Lund-Browder for scattered burns.',
 '[2,20,23]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-tbsa-result', NULL, NULL, NULL, '[{"src":"images/burns/burns-lund-browder-infant.png","alt":"Lund-Browder infant chart"},{"src":"images/burns/burns-lund-browder-child.png","alt":"Lund-Browder child chart"}]'::jsonb, '[{"id":"tbsa-peds","label":"TBSA Calculator (Peds)"}]'::jsonb, 9)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-tbsa-result', 'burns', 'question', 2,
 'TBSA-Based Triage',
 'Based on your TBSA calculation, select the appropriate fluid resuscitation pathway.

Formal fluid resuscitation formulas are generally indicated for adults with **≥20% TBSA** and children with **≥10% TBSA**. Smaller burns can usually be managed with oral hydration and maintenance IV fluids.',
 '[]'::jsonb, '[{"label":"TBSA <20% (adult) or <10% (peds)","next":"burn-minor-fluids"},{"label":"TBSA 20-39%","next":"burn-fluids-moderate"},{"label":"TBSA ≥40%","next":"burn-fluids-severe"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-minor-fluids', 'burns', 'info', 2,
 'Minor Burn Fluid Management',
 '**No formal resuscitation formula is needed** for minor burns (adults <20% TBSA, children <10% TBSA).

**Fluid strategy:**
• Encourage **oral fluid intake** — patients with intact GI function and small burns can self-hydrate
• IV maintenance fluids if NPO or unable to tolerate PO
• Standard maintenance rate: 4-2-1 rule (4 mL/kg/hr first 10kg, 2 mL/kg/hr next 10kg, 1 mL/kg/hr thereafter)

**Monitoring:**
• Urine output goal: 0.5-1 mL/kg/hr (adults), 1-1.5 mL/kg/hr (children)
• Monitor oral intake — dehydration risk is underappreciated in minor burns
• If patient cannot maintain adequate PO intake, consider IV supplementation

**Note:** Patients with inhalation injury, extremes of age, or significant comorbidities may require more aggressive hydration even with smaller TBSA burns.',
 '[2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-wound-care', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-palms-scatter', 'burns', 'info', 2,
 'Palm Method for Scattered Burns',
 '**The patient''s palm (including fingers) approximates 1% TBSA.** This method supplements the Rule of 9''s for scattered or irregular burn patterns.

**When to use:**
• Burns covering <15% TBSA — count the number of palms the burn area covers
• Burns covering >85% TBSA — count unburned areas and subtract from 100%
• Scattered or patchy burns where Rule of 9''s regional estimates are imprecise

**Technique:**
• Use the **patient''s** palm size, not the examiner''s
• Include all fingers held together
• Mentally "stamp" the palm over burned areas and count

**Limitations:** Interobserver variability is moderate. Most accurate when used consistently by one examiner. Digital apps (e.g., EasyTBSA) may improve accuracy.',
 '[20]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-tbsa-result', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12)
;


-- MODULE 3: FLUID RESUSCITATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-fluids-moderate', 'burns', 'question', 3,
 'Fluid Resuscitation Protocol — TBSA 20-39%',
 '**All fluid resuscitation formulas calculate the first 24 hours from the TIME OF BURN, not time of ED arrival.** If the patient arrives 4 hours post-burn, the first 8-hour window has already partially elapsed — adjust accordingly.

**General principles:**
• Use **Lactated Ringer''s (LR)** — isotonic, buffered, less hyperchloremic acidosis than NS
• All formulas are **starting points** — titrate to urine output
• **UOP target:** 0.5-1 mL/kg/hr (adults), 1-1.5 mL/kg/hr (children)
• Place a Foley catheter for all patients receiving formula-based resuscitation

Select a resuscitation formula:',
 '[2,15,18]'::jsonb, '[{"label":"Rule of 10''s (simplest)","next":"burn-rule-of-10"},{"label":"Parkland Formula (most widely used)","next":"burn-parkland"},{"label":"Dell-Seton / DSMC-UT Protocol","next":"burn-dsmc-moderate"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-fluids-severe', 'burns', 'question', 3,
 'Fluid Resuscitation — TBSA ≥40%',
 '**Burns ≥40% TBSA require extremely high fluid volumes** and carry significant risk of **fluid creep** — iatrogenic over-resuscitation leading to compartment syndrome (abdominal, extremity, orbital), pulmonary edema, and cerebral edema.

**Key considerations for severe burns:**
• Higher initial fluid rates needed, but must titrate aggressively downward
• Consider **early colloid** (albumin or FFP) at 8-12h to reduce total crystalloid volume
• Monitor for abdominal compartment syndrome (bladder pressures)
• Vasopressors may be needed if fluid refractory — this is a marker of very poor prognosis
• ICU admission mandatory

Select a resuscitation formula:',
 '[2,15,18]'::jsonb, '[{"label":"Rule of 10''s","next":"burn-rule-of-10"},{"label":"Parkland Formula","next":"burn-parkland"},{"label":"Dell-Seton / DSMC-UT Protocol (FFP from start)","next":"burn-dsmc-severe"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-rule-of-10', 'burns', 'info', 3,
 'Rule of 10''s',
 '**The Rule of 10''s is the simplest burn resuscitation formula** — designed for rapid initiation in the ED or prehospital setting.

**Step 1:** %TBSA × 10 = **initial LR rate in mL/hr**
• Example: 30% TBSA → 30 × 10 = 300 mL/hr LR

**Step 2:** For patients **>80 kg**, add 100 mL/hr for every 10 kg above 80 kg
• Example: 100 kg patient with 30% TBSA → 300 + 200 = 500 mL/hr

**Titration:** Adjust rate q1-2h to maintain UOP 0.5-1 mL/kg/hr. Increase by 20% if UOP below target, decrease by 20% if above target.

**Advantages:** Simple mental math, no calculator needed, easy to initiate in the field. Produces volumes comparable to Parkland but avoids over-resuscitation in the first 8 hours.

**Limitations:** Less precise than Parkland for very large or very small patients. Not validated for pediatric use.',
 '[2,15]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-fluids-monitoring', NULL, NULL, NULL, '[]'::jsonb, '[{"id":"burn-rule-of-10","label":"Rule of 10''s Calculator"}]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-parkland', 'burns', 'info', 3,
 'Parkland Formula',
 '**Parkland (Baxter) Formula — the most widely used burn resuscitation formula:**

**4 mL × %TBSA × weight (kg) = total volume over first 24 hours**

**Administration:**
• **First 8 hours (from time of burn):** Give **half** of the 24h total
• **Next 16 hours:** Give the remaining **half**
• Use **Lactated Ringer''s** exclusively

**Example:** 80 kg patient, 40% TBSA
→ 4 × 40 × 80 = 12,800 mL in 24h
→ First 8h: 6,400 mL (800 mL/hr)
→ Next 16h: 6,400 mL (400 mL/hr)

**Known issues:**
• The Parkland formula frequently leads to **over-resuscitation** — the original 4 mL/kg/% was derived as an average, but has become a minimum in practice
• Higher initial formula volumes (>4 mL) correlate with higher 24h totals and worse outcomes
• Always titrate to UOP — the formula is a **starting point**, not a target
• Consider colloid supplementation at 8-12h if crystalloid requirements are exceeding predicted volumes',
 '[2,15]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-fluids-monitoring', NULL, NULL, NULL, '[]'::jsonb, '[{"id":"burn-parkland","label":"Parkland Calculator"}]'::jsonb, 16)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-dsmc-moderate', 'burns', 'info', 3,
 'Dell-Seton Protocol — TBSA 20-39%',
 '[Dell-Seton (DSMC-UT) Burn Protocol](#/info/burns-dsmc-protocol)

**The Dell-Seton (DSMC-UT) institutional protocol** uses a modified Parkland approach with early colloid integration and structured titration.

**For TBSA 20-39%:**
• **Initial crystalloid:** 2 mL × %TBSA × weight (kg) = first 8h LR volume
• **Colloid (5% albumin):** Begins at hour 8 if crystalloid requirements remain high
• **Titration:** UOP-based with mandatory q1h nursing documentation
• **Target UOP:** 0.5-1.0 mL/kg/hr (adults)

**Advantages of this protocol:**
• Lower initial crystalloid volumes reduce fluid creep
• Early colloid reduces total 24h fluid volume
• Structured titration prevents both under- and over-resuscitation
• Institution-specific nursing protocols improve compliance',
 '[18]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-fluids-monitoring', NULL, NULL, NULL, '[]'::jsonb, '[{"id":"burn-dell-seton","label":"Dell-Seton Calculator"}]'::jsonb, 17)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-dsmc-severe', 'burns', 'info', 3,
 'Dell-Seton Protocol — TBSA ≥40%',
 '[Dell-Seton (DSMC-UT) Burn Protocol](#/info/burns-dsmc-protocol)

**For TBSA ≥40%, the Dell-Seton protocol initiates FFP from the start** alongside crystalloid to combat the massive capillary leak seen in severe burns.

**Protocol:**
• **Crystalloid (LR):** 2 mL × %TBSA × weight (kg) over first 8h
• **FFP:** Initiated simultaneously — 0.5-1.0 mL × %TBSA × weight (kg) over first 8h
• **Titration:** Aggressive UOP-based adjustments q1h
• **Target UOP:** 0.5-1.0 mL/kg/hr (adults)

**Rationale for early FFP:**
• Burns ≥40% TBSA produce massive capillary leak with loss of plasma proteins
• Crystalloid alone leads to progressive edema and compartment syndrome
• Early FFP replaces lost plasma proteins and maintains oncotic pressure
• Studies show reduced total 24h fluid volumes and fewer escharotomies

**Blood bank considerations:** FFP requires thawing (30-45 min). Notify blood bank early for severe burns. Type-specific preferred but AB universal donor if emergent.',
 '[18]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-fluids-monitoring', NULL, NULL, NULL, '[]'::jsonb, '[{"id":"burn-dell-seton","label":"Dell-Seton Calculator"}]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-fluids-monitoring', 'burns', 'info', 3,
 'Resuscitation Monitoring',
 '**Urine output is the primary endpoint** for titrating burn resuscitation. All formulas are starting points — clinical response determines the actual rate.

**UOP targets:**
• Adults: **0.5-1.0 mL/kg/hr**
• Children: **1.0-1.5 mL/kg/hr**
• Electrical burns / myoglobinuria: **1.0-1.5 mL/kg/hr** (adults) to prevent renal tubular obstruction

**Titration rules:**
• UOP below target → increase rate by **20%** q1h
• UOP above target → decrease rate by **20%** q1h
• Do NOT bolus crystalloid to "catch up" — this drives fluid creep
• If UOP remains <0.5 despite 150% predicted volume → consider colloid, vasopressors, or reassess TBSA

**Fluid creep warning signs:**
• Rising bladder pressures (>20 mmHg = intra-abdominal hypertension)
• Increasing peak airway pressures in ventilated patients
• Progressive extremity edema with loss of pulses
• Orbital compartment syndrome (proptosis, elevated IOP)

**Laboratory monitoring (q4-6h):**
• BMP (sodium, potassium, bicarb)
• Lactate (trending improvement = adequate resuscitation)
• Hematocrit (rising Hct = hemoconcentration from inadequate resuscitation)
• Glucose (especially pediatric patients)
• Base deficit (trending)',
 '[2,15,18]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-fluids-peds', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-fluids-peds', 'burns', 'info', 3,
 'Pediatric Resuscitation Considerations',
 '**Children <30 kg require BOTH maintenance fluids AND resuscitation fluids** — they have limited glycogen stores and are at high risk for hypoglycemia during large-volume crystalloid resuscitation.

**Maintenance fluids (in addition to resuscitation):**
• Use **D5 ½NS** (dextrose-containing) at standard 4-2-1 maintenance rate:
  - First 10 kg: 4 mL/kg/hr
  - 10-20 kg: add 2 mL/kg/hr
  - >20 kg: add 1 mL/kg/hr
• Run maintenance through a separate line from resuscitation LR

**Resuscitation:**
• Parkland formula applies: 4 mL × %TBSA × weight (kg)
• Use LR for resuscitation (no dextrose in resuscitation fluid)
• Target UOP: **1.0-1.5 mL/kg/hr** (higher than adults)

**Glucose monitoring:**
• Check glucose on arrival and q2-4h during resuscitation
• Infants and toddlers are especially vulnerable to hypoglycemia
• D10 bolus (2-4 mL/kg) for glucose <60 mg/dL

**Non-accidental trauma (NAT) screening:**
• **Mandatory consideration in all pediatric burns**, especially:
  - Scald burns with stocking/glove distribution
  - Burns with sharp lines of demarcation
  - Bilateral symmetric burns
  - Delay in presentation (>2 hours)
  - Story inconsistent with burn pattern or developmental age
  - Prior injuries or ED visits
• Document skin exam, photo-document burns, involve social work',
 '[2,23]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-wound-care', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20)
;


-- MODULE 4: AIRWAY & INHALATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-airway-assess', 'burns', 'question', 4,
 'Airway Assessment',
 '**Hard signs of impending airway compromise** (intubate immediately):
• Stridor or progressive hoarseness
• Full-thickness facial/neck burns
• Massive oropharyngeal edema on direct visualization
• Respiratory distress (accessory muscle use, tachypnea)
• Altered mental status with facial burns
• Copious secretions with soot

**Soft signs** (close monitoring, prepare for intubation):
• Facial burns without voice changes
• Singed nasal/facial hair
• Soot in nares without respiratory symptoms
• Mild erythema of oropharynx
• Burns in enclosed space but currently asymptomatic

**If in doubt, intubate early.** Airway edema peaks at 12-24 hours. A patient with soft signs at hour 1 may develop complete obstruction by hour 6. The consequences of unnecessary intubation are far less than the consequences of a lost airway.',
 '[1,8]'::jsonb, '[{"label":"Hard signs present — intubate now","next":"burn-intubation","urgency":"critical"},{"label":"Soft signs only — close monitoring","next":"burn-airway-soft"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-intubation', 'burns', 'info', 4,
 'Intubation for Inhalation Injury',
 '**Use the largest ETT that will pass** — expect significant secretions and potential for mucosal sloughing. A larger tube facilitates suctioning and bronchoscopy.

**Preparation:**
• Video laryngoscopy preferred (edematous landmarks)
• Have **surgical airway kit at bedside** — can''t-intubate-can''t-oxygenate is a real risk
• Suction ready — expect copious carbonaceous secretions
• Bougie available

**Induction:** [Ketamine](#/drug/ketamine/burns) 1-2 mg/kg IV is preferred — maintains hemodynamic stability and provides bronchodilation. Avoid agents that drop blood pressure in patients who are already volume-depleted.

**Paralytic:** Succinylcholine is safe in the **first 24 hours** after burn. **After 24 hours, succinylcholine is CONTRAINDICATED** — upregulation of extrajunctional acetylcholine receptors causes massive potassium release and cardiac arrest. Use rocuronium instead.

**Securing the tube:** Secure with **cloth ties or commercial tube holders** — tape will not adhere to burned or edematous skin. Mark ETT depth. Document and verify position with end-tidal CO2 and CXR.

**Post-intubation:**
• Expect to increase fluid resuscitation by **30-50%** over predicted volumes
• Early bronchoscopy for diagnosis and therapeutic lavage
• HOB 30° to reduce facial/airway edema
• Low tidal volume ventilation (6-8 mL/kg IBW) — inhalation injury causes ARDS',
 '[1,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-co-assess', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-airway-soft', 'burns', 'info', 4,
 'Soft Signs — Close Monitoring',
 '**Serial airway exams are mandatory** when soft signs are present without indication for immediate intubation.

**Monitoring protocol:**
• Re-examine airway **q30-60 minutes** for the first 6-12 hours
• Direct visualization of oropharynx — assess for progressive edema
• Voice quality changes (hoarseness, muffled voice)
• Work of breathing, stridor, wheezing
• Pulse oximetry (continuous) and serial ABGs

**Peak edema occurs at 12-24 hours.** Patients may appear stable initially but deteriorate rapidly. Airway edema from fluid resuscitation compounds thermal edema.

**Keep intubation equipment at bedside:**
• Video laryngoscopy
• Multiple ETT sizes
• Bougie
• Surgical airway kit
• Suction

**Head of bed at 30°** — reduces facial and airway edema.

**Transition to intubation if ANY of:**
• Progressive voice changes
• New stridor
• Increasing work of breathing
• Worsening oropharyngeal edema on exam
• Anticipated transport (intubate before transfer if any concern)',
 '[1,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-co-assess', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 23)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-co-assess', 'burns', 'question', 4,
 'CO Poisoning Assessment',
 '**Carbon monoxide (CO) binds hemoglobin with 240× the affinity of oxygen**, forming carboxyhemoglobin (COHb). It causes cellular hypoxia by displacing O2 and shifting the oxyhemoglobin dissociation curve leftward.

**Diagnosis requires co-oximetry** — standard pulse oximetry is **UNRELIABLE** because it cannot distinguish COHb from oxyhemoglobin. PaO2 on ABG is also normal (measures dissolved O2, not bound).

**COHb levels (co-oximetry):**
• Non-smoker baseline: <3%
• Smoker baseline: up to 10%
• Symptomatic: usually >15-20%
• Severe: >25%
• Lethal: >60-70%

**Note:** COHb levels may be falsely low if the patient received high-flow O2 during transport.

[CO & Cyanide Toxicity Reference](#/info/burns-co-cyanide)',
 '[5,6]'::jsonb, '[{"label":"COHb ≥25% or neurologic symptoms","next":"burn-co-treatment","urgency":"critical"},{"label":"COHb <25%, asymptomatic or mild","next":"burn-co-mild"},{"label":"No CO exposure concern","next":"burn-cyanide"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 24)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-co-treatment', 'burns', 'info', 4,
 'Severe CO Poisoning Management',
 '**Immediate treatment: 100% FiO2 via NRB mask or ventilator.**

**CO half-life by oxygen delivery:**
• Room air (21% O2): ~320 minutes (5+ hours)
• 100% O2 NRB: ~90 minutes
• Hyperbaric oxygen (HBO) at 3 ATA: ~23 minutes

**Hyperbaric oxygen (HBO) criteria** — consider if available within reasonable transport time:
• COHb >25% (>15% in pregnancy)
• Loss of consciousness at any point
• Neurologic deficit (confusion, ataxia, seizure)
• Cardiac ischemia or arrhythmia
• Persistent symptoms despite 4h of 100% O2
• Pregnancy with COHb >15% or any fetal distress

**HBO controversy:** Evidence is mixed. The Weaver trial showed reduced cognitive sequelae at 6 weeks and 12 months with HBO. However, HBO requires transport, is not universally available, and is impractical for critically ill burn patients who need ongoing resuscitation.

**Delayed neuropsychiatric syndrome (DNS):**
• Occurs in 15-40% of significant CO poisonings
• Onset: 2-40 days after exposure
• Symptoms: cognitive impairment, personality changes, movement disorders, focal deficits
• HBO may reduce risk — strongest indication for HBO referral

**Cardiac monitoring:** CO causes direct myocardial toxicity. Troponin, ECG, and telemetry for all patients with COHb >15% or cardiac symptoms.',
 '[5,6,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-cyanide', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 25)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-co-mild', 'burns', 'info', 4,
 'Mild CO Poisoning (COHb <25%)',
 '**Treatment: 100% O2 via non-rebreather mask for at least 6 hours** or until COHb normalizes (<3% non-smoker, <10% smoker).

**Monitoring:**
• Repeat co-oximetry every 2 hours until normalized
• Continuous cardiac monitoring
• Serial neurologic exams — assess orientation, cognition, gait

**Expected symptom resolution timeline:**
• Headache: usually resolves within 4-6h of O2 therapy
• Nausea/dizziness: resolves within 2-4h
• Confusion: if present, should clear within 4-6h — persistent confusion warrants reassessment

**Disposition considerations:**
• If symptoms resolve and COHb normalizes: can be managed as part of overall burn disposition
• If symptoms persist despite 4-6h of 100% O2: consider HBO referral
• Counsel all patients about delayed neuropsychiatric syndrome (DNS) — return for cognitive changes, personality changes, or new neurologic symptoms over the next 2-6 weeks',
 '[5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-cyanide', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 26)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-cyanide', 'burns', 'question', 4,
 'Cyanide Poisoning Assessment',
 '**Suspect cyanide poisoning in ALL enclosed-space fire victims.** Cyanide is produced by combustion of synthetic materials (plastics, wool, silk, nylon, polyurethane). It inhibits cytochrome oxidase, blocking cellular oxygen utilization.

**Key findings:**
• Persistent hemodynamic instability despite fluid resuscitation
• **Lactate >8 mmol/L** (highly suggestive — cells can''t use O2)
• Altered mental status out of proportion to COHb level
• Seizures
• Cardiac arrest (especially with combined CO + cyanide)

**This is a CLINICAL DIAGNOSIS.** Cyanide levels are NOT available in a useful timeframe (send but don''t wait). Whole blood cyanide >1 mg/L is toxic; >3 mg/L is potentially lethal.

**Concurrent CO + cyanide is synergistic** — worse outcomes than either alone. Treat both simultaneously.',
 '[7,10]'::jsonb, '[{"label":"Suspected (lactate >8, AMS, hemodynamic instability)","next":"burn-cyanide-rx","urgency":"critical"},{"label":"Low suspicion / no enclosed-space fire","next":"burn-depth"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 27)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-cyanide-rx', 'burns', 'info', 4,
 'Cyanide Poisoning Treatment',
 '**First-line antidote: [Hydroxocobalamin](#/drug/hydroxocobalamin/cyanide) (Cyanokit)**
• Adult dose: **5 g IV over 15 minutes**
• May repeat × 1 if clinical response is inadequate
• Pediatric dose: **70 mg/kg IV** (max 5 g)

**Mechanism:** Hydroxocobalamin (vitamin B12a) binds cyanide directly to form cyanocobalamin (vitamin B12), which is renally excreted. Does not affect oxygen-carrying capacity — safe to use with concurrent CO poisoning.

**Side effects:**
• Turns skin and urine **deep RED** for 2-5 days — warn the patient and staff
• Interferes with colorimetric lab assays (total bilirubin, creatinine, glucose) — **draw labs BEFORE administration** when possible
• Hypertension (usually transient)

**Alternative: Sodium thiosulfate**
• 12.5 g (50 mL of 25% solution) IV over 10-20 min
• Slower onset than hydroxocobalamin
• Use as adjunct or when hydroxocobalamin unavailable

**AVOID sodium nitrite in concurrent CO poisoning** — nitrite induces methemoglobinemia, which combined with COHb critically reduces oxygen delivery. Hydroxocobalamin is the preferred agent specifically because it does not form methemoglobin.',
 '[7,10]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-depth', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 28)
;


-- MODULE 5: ESCHAROTOMY
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-eschar-screen', 'burns', 'question', 5,
 'Circumferential Burn Assessment',
 '**Circumferential deep partial-thickness or full-thickness burns create a tourniquet effect** as the inelastic eschar cannot expand with progressive tissue edema beneath it. This compromises perfusion (extremities) or ventilation (chest).

**Assessment timing:** Compartment syndrome from circumferential burns typically develops **4-6 hours post-burn** as resuscitation fluids drive tissue edema. Serial assessment is mandatory during the resuscitation phase.

**Does the patient have circumferential or near-circumferential deep partial/full-thickness burns?**',
 '[11,12]'::jsonb, '[{"label":"Yes — circumferential extremity burn","next":"burn-eschar-extremity"},{"label":"Yes — circumferential chest/trunk burn","next":"burn-eschar-chest"},{"label":"No circumferential burns","next":"burn-transfer"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 29)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-eschar-extremity', 'burns', 'info', 5,
 'Extremity Escharotomy — Indications',
 '[Escharotomy Technique](#/info/burns-escharotomy)

**The 6 P''s of compartment syndrome** (though in burn eschar, pain may be absent due to nerve damage):
• **Pain** — pain out of proportion, pain with passive stretch (unreliable in full-thickness)
• **Pressure** — tense, firm compartment
• **Paresthesias** — numbness, tingling (early sign)
• **Pallor** — pale or cyanotic distal extremity
• **Pulselessness** — LATE finding. Do not wait for this.
• **Paralysis** — LATE finding indicating muscle ischemia

**Objective measures:**
• **Doppler ultrasound** — loss of arterial signal in digital arteries is the most reliable non-invasive indicator
• **Pulse oximetry** — loss of plethysmographic waveform in a burned digit
• **Compartment pressure** — >30 mmHg or within 30 mmHg of diastolic
• **Capillary refill** — >3 seconds in burned tissue (difficult to assess)

**Indications for escharotomy:**
• Absent or diminishing distal pulses/Doppler signals
• Progressive paresthesias or neurologic deficit
• Compartment pressures >30 mmHg
• Increasing pain (if sensation preserved)

**Do NOT wait for pulselessness** — by the time pulses are lost, irreversible ischemia may have occurred.',
 '[11,12,13,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-eschar-technique', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 30)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-eschar-technique', 'burns', 'info', 5,
 'Escharotomy Technique — Extremity',
 '[Escharotomy Technique](#/info/burns-escharotomy)

**Escharotomy is an emergency bedside procedure** — performed through insensate full-thickness eschar. If the patient has full-thickness burns, the incision should be painless (no local anesthesia needed in the eschar). Provide sedation/analgesia for patient comfort.

**Incision lines — medial and lateral mid-axial lines:**

**Upper extremity:**
• Lateral: axilla → lateral epicondyle → dorsal wrist
• Medial: axilla → medial epicondyle → volar wrist
• Avoid the ulnar nerve at the medial epicondyle
• If hand involved: incisions on dorsum between metacarpals, NOT on palmar surface

**Lower extremity:**
• Lateral: groin → lateral malleolus
• Medial: groin → medial malleolus (posterior to medial malleolus to avoid saphenous vein/nerve)
• Avoid the common peroneal nerve at the fibular head

**Technique:**
1. Incise through eschar down to subcutaneous fat — the wound should visibly open/separate
2. Use electrocautery or scalpel
3. Extend incisions proximally and distally until eschar releases
4. If crossing a joint, use a Z-incision or S-curve to prevent contracture
5. Hemostasis with electrocautery or topical hemostatic agents
6. Cover with silver sulfadiazine or moist dressings

**Post-procedure:** Reassess with Doppler every 15 min × 1 hr. If no improvement → consider **fasciotomy** (deeper decompression requiring OR).',
 '[11,12,14,21,22]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-transfer', NULL, NULL, NULL, '[{"src":"images/burns/burns-escharotomy-lines.png","alt":"Escharotomy incision lines","caption":"Incision lines with neurovascular structures to avoid"}]'::jsonb, '[]'::jsonb, 31)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-eschar-chest', 'burns', 'info', 5,
 'Chest Escharotomy',
 '[Escharotomy Technique](#/info/burns-escharotomy)

**Circumferential chest burns restrict chest wall excursion**, leading to progressive respiratory failure. In ventilated patients, this manifests as rising peak airway pressures and decreasing tidal volumes.

**Indications:**
• Rising peak airway pressures (ventilated patients)
• Decreased chest wall compliance
• Hypoxia or hypercarbia despite adequate ventilator settings
• Visible restriction of chest wall movement

**Technique — bilateral anterior axillary line incisions:**
1. **Bilateral vertical incisions** along the anterior axillary lines from the clavicle to the costal margin
2. **Transverse connecting incision** along the costal margin (creating an "H" or clamshell pattern)
3. For severe restriction, add a **transverse subclavicular incision** connecting the two vertical incisions
4. Incise through eschar to subcutaneous fat — the chest wall should visibly expand
5. Immediately reassess ventilation (tidal volumes, peak pressures, SpO2)

**If abdomen is also involved:** Extend incisions inferiorly to the inguinal ligaments to decompress the abdominal wall — abdominal compartment syndrome from burn edema + massive fluid resuscitation.',
 '[11,12,21]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-transfer', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 32)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-eschar-fasciotomy', 'burns', 'result', 5,
 'Fasciotomy Indications',
 '**Escharotomy releases skin-level constriction. Fasciotomy addresses deep compartment pressure** — these are distinct procedures.

**Fasciotomy is indicated when:**
• Escharotomy fails to restore distal perfusion
• **Electrical burns** with deep tissue injury (current travels through muscle — eschar release alone is insufficient)
• Compartment pressures remain **>30 mmHg** (or within 30 mmHg of diastolic) after adequate escharotomy
• Crush injury or prolonged extrication with circumferential burn

**Fasciotomy requires:**
• Operating room or procedural suite
• Surgical consultation (burn surgery, orthopedic surgery, or general surgery)
• Full-length compartment release — all compartments in the affected extremity
• Forearm: volar and dorsal compartments
• Lower leg: all 4 compartments (anterior, lateral, deep posterior, superficial posterior)

**Post-fasciotomy management:** Open wound with wet dressings, delayed primary closure or skin grafting at 48-72h, aggressive physical therapy.',
 '[11,12]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Fasciotomy requires OR and surgical consultation. Indicated when escharotomy fails to restore perfusion, in electrical burns with deep compartment involvement, or when compartment pressures remain >30 mmHg post-escharotomy.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 33)
;


-- MODULE 6: CHEMICAL BURNS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-chem-start', 'burns', 'question', 6,
 'Chemical Burn Agent',
 '**Universal first step for chemical burns: copious water irrigation for ≥20-30 minutes** (with specific exceptions noted below). Begin irrigation IMMEDIATELY — do not delay for agent identification.

**Exceptions to water irrigation:**
• **Elemental metals (Na, K, Li)** — react violently with water → remove mechanically first, then irrigate
• **Dry powder** — brush off before irrigating
• **Cement** — brush off dry powder, then irrigate

**Provider safety:** Wear appropriate PPE. Chemical burns can injure providers through secondary contact. Irrigate in a well-ventilated area. Contain runoff.

[Chemical Burns Agent-Specific Guide](#/info/burns-chemical-detail)',
 '[9,19]'::jsonb, '[{"label":"Acid (sulfuric, hydrochloric, nitric)","next":"burn-chem-acid"},{"label":"Alkali (lye/NaOH, cement, ammonia)","next":"burn-chem-alkali"},{"label":"Hydrofluoric (HF) acid","next":"burn-chem-hf","urgency":"urgent"},{"label":"Elemental metals (Na, K, Li, Mg, phosphorus)","next":"burn-chem-metals"},{"label":"Unknown agent","next":"burn-chem-unknown"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 34)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-chem-acid', 'burns', 'info', 6,
 'Acid Burns',
 '**Acids cause coagulation necrosis** — proteins denature and form a coagulum that limits penetration depth. This is why acid burns are generally less destructive than alkali burns of equivalent concentration.

**Treatment:**
• **Copious water irrigation for 20-30 minutes** — begin immediately
• **Do NOT attempt to neutralize** — exothermic reaction will cause additional thermal injury
• Monitor wound pH with litmus paper — irrigate until tissue pH is **7.0-7.5**
• Remove all contaminated clothing during irrigation

**Specific acids:**
• **Sulfuric acid (H2SO4):** Battery acid, drain cleaners. Exothermic on water contact — irrigate copiously despite heat generation
• **Hydrochloric acid (HCl):** Pool chemicals, masonry. Standard irrigation protocol
• **Nitric acid (HNO3):** Industrial. Yellow-stained tissue (xanthoproteic reaction). Standard irrigation
• **Phenol (carbolic acid):** Industrial solvent. Poorly water-soluble — irrigate with low-molecular-weight PEG (polyethylene glycol) if available, otherwise copious water. Risk of systemic toxicity (seizures, cardiac dysrhythmias, hepatorenal failure)

**Ocular acid exposure:** Irrigate with NS or balanced salt solution for at least 30 minutes. Check pH at 10-minute intervals. Emergency ophthalmology consult.',
 '[9,19]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-chem-wound-care', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 35)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-chem-alkali', 'burns', 'info', 6,
 'Alkali Burns',
 '**Alkali burns cause liquefaction necrosis — more dangerous and penetrating than acid burns.** Alkalis saponify fats and dissolve proteins, allowing progressive deep tissue penetration. The injury continues to deepen until the agent is completely removed.

**Treatment:**
• **Prolonged irrigation: 30-60+ minutes** (longer than acid burns)
• Alkali binds to tissue — copious, prolonged irrigation is essential to wash out residual chemical
• Monitor pH — irrigate until tissue pH reaches **7.0-7.5**
• Multiple irrigation cycles may be needed — recheck pH 15 minutes after stopping

**Specific alkalis:**
• **Sodium hydroxide (NaOH/lye):** Oven cleaners, drain openers. Extremely destructive. Prolonged irrigation.
• **Calcium hydroxide (cement/lime):** Construction workers. **Brush off dry cement FIRST**, then irrigate. Cement continues to burn while wet against skin. Chrome content can cause contact dermatitis.
• **Ammonia (NH3):** Industrial, cleaning products. Highly volatile — inhalation injury risk. Irrigate eyes and skin copiously.
• **Sodium hypochlorite (bleach):** Household concentration (3-6%) usually causes only irritation. Industrial concentration (10-15%) can cause significant burns.

**Ocular alkali exposure is an EMERGENCY** — alkali penetrates rapidly through the cornea. Irrigate immediately and continuously for ≥30 min with NS. Emergency ophthalmology consult. Worse prognosis than acid exposure.',
 '[9,19]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-chem-wound-care', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 36)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-chem-hf', 'burns', 'info', 6,
 'Hydrofluoric (HF) Acid Burns',
 '**HF acid is uniquely dangerous** — the fluoride ion penetrates tissue and binds calcium and magnesium, causing both deep tissue destruction and potentially fatal systemic toxicity (hypocalcemia, hypomagnesemia, hyperkalemia → cardiac arrest).

**Concentration determines presentation:**
• >50% HF: immediate pain and tissue destruction
• 20-50% HF: delayed 1-8 hours
• <20% HF: may be delayed up to 24 hours — patients may not seek care until significant damage has occurred

**Treatment ladder:**

**Step 1 — Immediate irrigation:** Copious water for 15-30 minutes

**Step 2 — Topical calcium gluconate:** [Calcium Gluconate 2.5% Gel](#/drug/calcium-gluconate-gel/hf burn) applied liberally to the burn and surrounding area, massaged in with a gloved hand. Reapply every 15-30 min. Can be made by mixing 3.5g calcium gluconate powder in 150mL water-soluble lubricant (e.g., KY jelly).

**Step 3 — Subcutaneous/intradermal injection:** If pain persists despite topical therapy: 5% calcium gluconate (dilute 10% to 5%) injected **0.5 mL per cm²** of affected skin using a 27-30g needle. Maximum 0.5 mL per injection site.

**Step 4 — Intra-arterial calcium:** For hand/digit burns unresponsive to above: [Calcium Gluconate](#/drug/calcium-gluconate/hf burn) 10 mL of 10% in 40 mL NS infused via radial artery catheter over 4 hours. Requires vascular access and monitoring.

**Step 5 — Surgical:** Excision of necrotic tissue if all above measures fail.

**Systemic monitoring (MANDATORY for burns >25 cm² or >50% HF):**
• Continuous cardiac monitoring — watch for QT prolongation, widened QRS, bradycardia
• Serial calcium, magnesium, potassium q2-4h
• Replace calcium aggressively: calcium gluconate 10% IV if serum Ca <8 or symptomatic
• Replace magnesium
• Treat hyperkalemia per standard protocol → [Potassium Disorders](#/tree/potassium)',
 '[9,19]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-chem-wound-care', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 37)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-chem-metals', 'burns', 'info', 6,
 'Elemental Metal Burns',
 '**Elemental metals react violently with water** — standard irrigation can worsen the injury. Agent-specific management is critical.

**Sodium (Na), Potassium (K), Lithium (Li):**
• **WATER REACTIVE** — produces exothermic reaction, hydrogen gas (explosion risk), and alkali byproduct
• **Step 1:** Cover with **mineral oil** to prevent further reaction with air moisture
• **Step 2:** Mechanically remove all visible metal fragments with forceps while submerged in mineral oil
• **Step 3:** Once ALL metal is removed, THEN irrigate copiously with water
• Do NOT irrigate until metal is removed

**White phosphorus:**
• **Burns in air** — self-ignites when dry
• **Keep wound SUBMERGED in water** or covered with saline-soaked dressings continuously
• Remove visible particles with forceps under water — they will glow in a darkened room
• **1% copper sulfate solution** can be applied briefly to aid identification (turns particles black) — limit exposure to prevent copper toxicity
• Debridement under water immersion in OR
• Risk of systemic phosphorus toxicity: hepatorenal failure, hypocalcemia

**Magnesium:**
• Burns intensely, reacts with water (produces hydrogen gas)
• **Smother with sand, dry chemical, or Class D fire extinguisher**
• Once burning stops, irrigate with copious water
• Risk of systemic hypomagnesemia paradoxically low (metal form, not ionic)',
 '[9,19]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-chem-wound-care', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 38)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-chem-unknown', 'burns', 'info', 6,
 'Unknown Chemical Agent',
 '**When the chemical agent is unknown, default to copious water irrigation** — this is the safest approach for the vast majority of chemical exposures.

**Immediate actions:**
1. **PPE for providers** — double glove, gown, eye protection, N95 minimum. If vapor hazard suspected, move to well-ventilated area or use PAPR.
2. **Remove all clothing** — bag and label for hazmat identification
3. **Copious water irrigation for 30+ minutes** — assume the worst-case scenario until agent is identified
4. **Monitor pH** of wound surface — continue irrigating until pH 7.0-7.5

**Agent identification resources:**
• **Poison Control: 1-800-222-1222** — 24/7, can assist with chemical identification and treatment guidance
• SDS (Safety Data Sheets) — request from employer/workplace if occupational exposure
• Container labels, if available
• CHEMTREC: 1-800-424-9300 (hazmat transport emergencies)

**The only time to withhold water:** If you strongly suspect elemental reactive metals (Na, K, Li) — these will be obvious as the metal reacts visibly with water. In all other cases, irrigate first and identify later.',
 '[9]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-chem-wound-care', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 39)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-chem-wound-care', 'burns', 'info', 6,
 'Chemical Burn Wound Care',
 '**After thorough decontamination, manage the chemical burn wound as you would a thermal burn of equivalent depth.**

**Important considerations specific to chemical burns:**

**Depth may be underestimated initially.** Chemical burns often appear superficial on presentation but progress significantly over **24-72 hours**, especially alkali burns. Reassess depth at 48-72h before final wound management decisions.

**Document the agent, concentration, duration of contact, and area involved.** This information is critical for burn center consultation and ongoing management.

**Wound assessment after decontamination:**
• Assess burn depth using same criteria as thermal burns
• Calculate TBSA (same rules — only count partial/full thickness)
• If TBSA meets resuscitation threshold → fluid resuscitation as per thermal burn protocols

**Systemic toxicity screen** — some chemicals have significant systemic effects beyond the local burn:
• HF acid → hypocalcemia, hypomagnesemia, hyperkalemia
• Phenol → hepatorenal toxicity, seizures, cardiac dysrhythmias
• Phosphorus → hepatorenal failure, hypocalcemia
• Chromic acid → renal failure
• Formic acid → metabolic acidosis, hemolysis

Proceed to wound care and dressing selection.',
 '[9,19]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-wound-care', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 40)
;


-- MODULE 7: WOUND CARE & DISPOSITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-wound-care', 'burns', 'info', 7,
 'Emergent Burn Wound Care',
 '[Burn Dressing Guide](#/info/burns-dressing-guide)

**Step 1 — Cool the burn:** Apply cool (not ice-cold) running water for **20 minutes** within the first 3 hours of injury. This is the **single most effective first aid measure** — reduces pain, limits burn depth progression, and improves outcomes at 30 days. Do NOT use ice (causes vasoconstriction and frostbite risk).

**Step 2 — Clean the wound:**
• Gentle irrigation with NS or clean lukewarm water
• Remove loose debris and necrotic tissue
• Debride ruptured blisters — leave intact blisters that are small, tense, and not in a functional area
• Large, flaccid, or contaminated blisters should be debrided
• Gentle scrub with gauze if needed

**Step 3 — Avoid harmful home remedies:**
• **No butter, toothpaste, egg whites, or "folk" remedies** — these trap heat and introduce bacteria
• **No ice application** — causes vasoconstriction and secondary injury
• **No adhesive bandages directly on burns** — use nonadherent dressings only

**Tetanus prophylaxis:** Update if >5 years since last dose or unknown status. Tdap preferred if not previously received.',
 '[3,4,16,17]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-dressings', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 41)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-dressings', 'burns', 'info', 7,
 'Dressing Selection',
 '[Burn Dressing Guide](#/info/burns-dressing-guide)

**Dressing selection by burn depth:**

**Epidermal (superficial):** No dressing needed. Moisturizing lotion (aloe vera is reasonable). Will heal in 3-5 days.

**Superficial partial thickness:** Topical antimicrobial + nonadherent dressing. Options:
• [Bacitracin](#/drug/bacitracin/burns) ointment + nonadherent gauze (Adaptic/Xeroform) — simple, inexpensive, preferred for face and small burns
• Biosynthetic dressings (Biobrane, Suprathel) — reduce pain and dressing changes, good for pediatric scalds
• Honey-based dressings (Medihoney) — antimicrobial properties, evidence for superficial partial burns

**Deep partial thickness:** Requires more protective dressing. Options:
• [Silver Sulfadiazine](#/drug/silver-sulfadiazine/burns) (SSD) 1% cream — broad-spectrum antimicrobial, easy to apply. **Avoid on the face** (cosmetic staining) and **avoid on superficial burns** (may impair healing). Requires daily dressing changes.
• Silver-containing foam dressings (Mepilex Ag, Aquacel Ag) — can stay in place 3-7 days, reduce dressing changes, good for outpatient management
• Referral for surgical consultation (may need excision and grafting)

**Full thickness:** Clean dry dressings pending surgical management. SSD or antimicrobial dressing. These burns require excision and grafting — wound care is bridging to definitive surgery.

**Tetanus:** Update if >5 years or unknown. Burns are tetanus-prone wounds.',
 '[3,4,17]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-pain', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 42)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-pain', 'burns', 'info', 7,
 'Burn Pain Management',
 '**Burns are among the most painful injuries encountered in the ED.** Adequate pain control is not optional — undertreated pain impairs wound care, increases anxiety, and worsens outcomes.

**Mild burns (superficial, small partial):**
• **Ibuprofen** 400-800 mg PO q6-8h + **Acetaminophen** 1000 mg PO q6-8h
• Cooling, elevation, and appropriate dressings significantly reduce pain
• Topical lidocaine preparations for small areas

**Moderate-severe burns:**
• [Morphine](#/drug/morphine/burns) 0.1 mg/kg IV q2-4h PRN — titrate to effect
• [Ketamine](#/drug/ketamine/burns) 0.1-0.3 mg/kg IV (sub-dissociative) — excellent for burns, reduces opioid requirements, does not cause respiratory depression at sub-dissociative doses
• Combine opioid + ketamine for synergistic effect with lower total doses of each

**Procedural pain (dressing changes, debridement):**
• [Ketamine](#/drug/ketamine/burns) 1-2 mg/kg IV for dissociative sedation
• Procedural sedation for major debridement

**Anxiolysis:**
• [Midazolam](#/drug/midazolam/burns) 0.5-2 mg IV — for procedure-related anxiety
• Burns cause intense psychological distress — address anxiety alongside pain

**Pediatric pain management:**
• [Fentanyl](#/drug/fentanyl/burns) IN (intranasal) 1.5 mcg/kg — needle-free, rapid onset (5-10 min), ideal for initial pain control in children
• Oral sucrose for infants during dressing changes
• Distraction techniques (tablets, videos) as adjunct

**Key principle:** Treat pain aggressively early. It is much easier to maintain comfort than to regain it once pain is out of control.',
 '[2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-eschar-screen', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 43)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-transfer', 'burns', 'info', 7,
 'Burn Center Transfer Criteria',
 '**American Burn Association (ABA) criteria for burn center referral:**

1. **Partial thickness burns >10% TBSA**
2. **Burns involving face, hands, feet, genitalia, perineum, or major joints**
3. **Full thickness (3rd degree) burns of any size**
4. **Electrical burns** (including lightning)
5. **Chemical burns**
6. **Inhalation injury**
7. **Burns in patients with significant comorbidities** (diabetes, immunosuppression, etc.)
8. **Burns with concomitant trauma** where the burn is the greater risk
9. **Burns in children** at hospitals without pediatric burn capability
10. **Burns requiring social, emotional, or rehabilitative intervention** (suspected abuse, psychiatric, long-term rehab)

**Contact the burn center early** — even before all initial assessment is complete. Early communication facilitates bed availability and transport coordination.

**Pre-transfer management:**
• Continue IV fluid resuscitation — do NOT stop or reduce during transport
• **Clean, dry dressings** for transport (no wet dressings — hypothermia risk during transport)
• Warming measures — warm blankets, warm IV fluids, warm ambulance
• Elevate burned extremities above heart level
• Document all medications, fluids given, urine output, and interventions
• Send copies of labs, imaging, and clinical notes',
 '[2,16]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'burn-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 44)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-disposition', 'burns', 'question', 7,
 'Disposition',
 'Based on the patient''s burn severity, associated injuries, and social situation, determine the appropriate disposition.

Consider: TBSA, burn depth, burn location, mechanism, age, comorbidities, social factors (ability to perform dressing changes, follow-up access, abuse concerns), and inhalation injury status.',
 '[]'::jsonb, '[{"label":"Meets burn center criteria — transfer","next":"burn-transfer-result"},{"label":"Admit (non-burn-center hospital)","next":"burn-admit-result"},{"label":"Discharge with follow-up","next":"burn-discharge-result"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 45)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-transfer-result', 'burns', 'result', 7,
 'Burn Center Transfer',
 '**Initiate burn center transfer per ABA criteria.** Contact the nearest verified burn center early for bed availability and transport coordination.

**Pre-transfer checklist:**
• Secure airway if any concern for inhalation injury (intubate BEFORE transport)
• Continue IV LR resuscitation — document rate and total volume given
• Place Foley catheter — document urine output for receiving team
• Clean, dry dressings — **no wet dressings during transport** (hypothermia risk)
• Warming measures: warm blankets, warm IV fluids, heated ambulance
• Analgesia — ensure adequate pain control for transport
• NG/OG tube for burns >20% TBSA (ileus risk)
• Elevate burned extremities
• Send documentation: labs, imaging, medication list, fluid totals, I/O record, interventions performed',
 '[2,16]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Initiate burn center transfer. Continue IV resuscitation. Clean dry dressings (no wet dressings during transport — hypothermia). Warming measures. Analgesia. Send all documentation.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 46)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-admit-result', 'burns', 'result', 7,
 'Admission — Non-Burn Center',
 '**Admit for ongoing monitoring and management when burn center transfer is not indicated or not immediately available.**

**Admission indications:**
• Continued fluid resuscitation with UOP monitoring
• Serial wound assessment — burn depth frequently worsens over 24-72 hours
• IV pain management requirements
• Inhalation injury observation (even soft signs)
• Circumferential burns requiring serial neurovascular checks
• Social concerns (suspected NAT, inability to manage outpatient care)
• Extremes of age with moderate burns

**Inpatient orders:**
• Fluid resuscitation protocol with q1h UOP documentation
• Serial neurovascular checks for circumferential burns
• Wound care: daily dressing changes with antimicrobial agent
• Pain regimen: scheduled NSAID + acetaminophen, PRN opioid
• Surgical consult for deep partial/full thickness burns
• Nutrition consult — burn patients are hypermetabolic (may need 2-3× baseline caloric intake)
• Occupational/physical therapy for burns involving joints or hands
• DVT prophylaxis
• Stress ulcer prophylaxis for severe burns',
 '[2,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit for: continued resuscitation/UOP monitoring, serial wound assessment (depth may worsen 24-72h), IV pain management, inhalation injury observation, circumferential burns, social concerns (NAT). Surgical consult for deep partial/full thickness. Nutrition consult (hypermetabolic).', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 47)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('burn-discharge-result', 'burns', 'result', 7,
 'Discharge with Follow-up',
 '**Appropriate for superficial or small partial-thickness burns <5% TBSA** in patients with reliable follow-up, adequate social support, and ability to perform dressing changes.

**Discharge criteria:**
• Pain controlled with oral medications
• Patient/family demonstrates ability to perform dressing changes
• No signs of inhalation injury
• No circumferential burns
• No concern for NAT
• Adequate follow-up arranged

**Discharge instructions:**
• **Daily dressing changes:** Gentle wash with soap and water, apply bacitracin ointment, cover with nonadherent dressing and gauze wrap
• **Keep burned area elevated** above heart level when possible
• **Pain management:** Ibuprofen 400-800mg q6-8h + acetaminophen 1000mg q6-8h around the clock for first 48-72h
• **Avoid sun exposure** on healing burns for 12 months (permanent hyperpigmentation)

**Return precautions:**
• Increasing pain, redness, or swelling around the burn
• Purulent drainage or foul odor
• Fever >100.4°F (38°C)
• Burn appearance worsening (deepening)
• Inability to manage pain at home

**Follow-up:** 24-48 hours for wound reassessment. Earlier if concern for deepening. Tetanus update if >5 years or unknown.',
 '[3,4,23]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Superficial or small partial thickness <5% TBSA. Adequate oral pain control. Daily dressing changes (bacitracin + nonadherent). Keep elevated. Return if increasing pain/redness/drainage/fever. Follow-up 24-48h. Tetanus if >5y or unknown.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 48)
;

COMMIT;

COMMIT;
