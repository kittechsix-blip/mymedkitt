// MedKitt — Difficult Airway / Bougie-First Intubation
// Pre-assessment → Approach Decision → Bougie Technique → Confirmation → Failed Airway → Surgical Airway.
// 6 modules: Pre-Assessment → Approach → Bougie Technique → Confirmation → Failed Airway → Surgical Airway
// 28 nodes total.
export const DIFFICULT_AIRWAY_BOUGIE_NODES = [
    // =====================================================================
    // MODULE 1: AIRWAY PRE-ASSESSMENT
    // =====================================================================
    {
        id: 'dab-start',
        type: 'info',
        module: 1,
        title: 'Difficult Airway — Bougie-First Approach',
        body: '[Airway Steps Summary](#/info/dab-summary) — rapid-reference stepwise pathway.\n\n**Bougie-first intubation** achieves **98% first-pass success** vs 87% with stylet in difficult airways (BEAM trial, JAMA 2018). The benefit is strongest in poor laryngoscopic views (CL III–IV): RR **1.60** for first-pass success.\n\n**Critical context:** The BOUGIE trial (JAMA 2021) showed no benefit at sites with low bougie experience (median 10 prior uses) — **operator skill, not device alone, drives success.** Video laryngoscopy adds 14.3% absolute improvement in first-pass success over direct laryngoscopy (DEVICE trial, NEJM 2023).\n\n**Before paralysis:** Assess predicted difficulty using validated mnemonics. Have backup equipment at bedside — including surgical airway kit — before induction.',
        citation: [1, 2, 3, 5],
        next: 'dab-lemon',
    },
    {
        id: 'dab-lemon',
        type: 'info',
        module: 1,
        title: 'LEMON — Difficult Intubation Assessment',
        body: '[LEMON/MOANS/RODS/SHORT Quick Reference](#/info/dab-lemon-card)\n\n**L — Look Externally:** Facial trauma, short neck, small mouth, prominent teeth, large tongue, beard, obesity, blood/secretions\n\n**E — Evaluate 3-3-2 Rule:**\n• **3** fingers between incisors (mouth opening ≥4.5 cm)\n• **3** fingers from mentum to hyoid (mandibular length)\n• **2** fingers from hyoid to thyroid notch (larynx position)\n\n**M — Mallampati Score:**\n• I: full soft palate + uvula + pillars\n• II: soft palate + uvula\n• III: soft palate + base of uvula only\n• IV: hard palate only\n\n**O — Obstruction:** Tumor, abscess, angioedema, epiglottitis, Ludwig angina. Signs: stridor, muffled voice, dysphagia\n\n**N — Neck Mobility:** C-spine injury, ankylosing spondylitis, prior radiation, arthritis. **Single strongest predictor** of difficult intubation.\n\n**LEMON score ≥4** predicts difficult intubation.',
        citation: [14, 9],
        next: 'dab-backup',
    },
    {
        id: 'dab-backup',
        type: 'info',
        module: 1,
        title: 'Backup Plan Assessment — MOANS / RODS / SHORT',
        body: '**MOANS — Difficult Bag-Mask Ventilation:**\n• **M**ask seal — beard, blood, disrupted anatomy\n• **O**besity/Obstruction — BMI >26, angioedema, Ludwig\n• **A**ge >55\n• **N**o teeth — edentulous (leave dentures in for seal)\n• **S**tiff lungs / Sleep apnea — COPD, ARDS, asthma\n\n**RODS — Difficult Supraglottic Airway:**\n• **R**estricted mouth opening (<2 cm)\n• **O**bstruction (supraglottic mass, edema)\n• **D**isrupted/distorted anatomy\n• **S**tiff lungs / cervical Spine immobility\n\n**SHORT — Difficult Cricothyrotomy:**\n• **S**urgery — prior neck surgery\n• **H**ematoma / infection in neck\n• **O**besity / fixed flexion\n• **R**adiation to neck (fibrosis)\n• **T**umor involving airway\n\n**No absolute contraindications exist for emergency cricothyrotomy.**',
        citation: [7, 14],
        next: 'dab-predicted',
    },
    {
        id: 'dab-predicted',
        type: 'question',
        module: 1,
        title: 'Predicted Difficulty Level',
        body: 'Based on LEMON, MOANS, RODS, and SHORT assessments — what is the predicted difficulty?\n\nConsider: history of difficult airway, multiple overlapping predictors, ability to tolerate apnea, and whether rescue pathways (mask, SGA, surgical) are also predicted difficult.',
        citation: [7, 8, 14],
        options: [
            {
                label: 'Low risk',
                description: 'No difficult airway predictors, normal anatomy',
                next: 'dab-standard-rsi',
            },
            {
                label: 'Moderate risk',
                description: 'Some LEMON predictors (score 1-3), adequate backup options',
                next: 'dab-bougie-rsi',
                urgency: 'urgent',
            },
            {
                label: 'High risk',
                description: 'LEMON ≥4, multiple backup pathways compromised',
                next: 'dab-bougie-rsi',
                urgency: 'critical',
            },
            {
                label: 'Extreme risk — consider awake',
                description: 'Predicted fail intubation + fail mask + fail SGA, or cannot tolerate apnea',
                next: 'dab-awake',
                urgency: 'critical',
            },
        ],
    },
    // =====================================================================
    // MODULE 2: APPROACH DECISION
    // =====================================================================
    {
        id: 'dab-standard-rsi',
        type: 'info',
        module: 2,
        title: 'Standard RSI — Bougie Available as Rescue',
        body: '[RSI Drug Quick Reference](#/info/dab-rsi-drugs)\n\n**Positioning:** Ear-to-sternal-notch alignment (NOT just "sniffing position"). External auditory meatus at or above sternal notch. Obese patients need significant ramping.\n\n**Preoxygenation:** 3-5 min NRB or flush-rate O2. Apneic oxygenation with 15 L/min NC during laryngoscopy.\n\n**Induction (choose one):**\n• [Ketamine](#/drug/ketamine/rsi induction) **1.5-2 mg/kg IV** — hemodynamically supportive, preferred in hypotension\n• [Etomidate](#/drug/etomidate/rsi induction) **0.3 mg/kg IV** — hemodynamically neutral\n• [Propofol](#/drug/propofol/rsi induction) **1.5-2.5 mg/kg IV** — causes hypotension, reduce dose if fragile\n\n**Paralytic (choose one):**\n• [Succinylcholine](#/drug/succinylcholine/rsi) **1.5 mg/kg IV** — fastest onset (30-60s), short duration (3-8 min)\n• [Rocuronium](#/drug/rocuronium/rsi) **1.2 mg/kg IV** — no contraindications to succinylcholine, reversible with sugammadex\n\n**Bougie at bedside** for immediate use if Grade IIb+ view encountered.',
        citation: [1, 3, 4, 15, 16],
        next: 'dab-rsi-complete',
    },
    {
        id: 'dab-bougie-rsi',
        type: 'info',
        module: 2,
        title: 'Bougie-First RSI Protocol',
        body: '[RSI Drug Quick Reference](#/info/dab-rsi-drugs)\n\n**Predicted difficult airway — plan bougie-first from the start.**\n\n**Positioning:** Ear-to-sternal-notch alignment. Face plane parallel to ceiling.\n\n**Equipment at bedside:**\n• 15 Fr × 60 cm **coude-tip bougie** (Frova or SunMed)\n• Video laryngoscope (standard geometry preferred for bougie — C-MAC or standard GlideScope)\n• ETT: 7.0-7.5 mm (women), 7.5-8.0 mm (men), lubricated\n• Backup: second ETT, i-gel SGA, surgical airway kit (#10 scalpel + 6.0 ETT)\n\n**RSI drugs — same as standard:**\n• [Ketamine](#/drug/ketamine/rsi induction) **1.5-2 mg/kg IV** or [Etomidate](#/drug/etomidate/rsi induction) **0.3 mg/kg IV**\n• [Rocuronium](#/drug/rocuronium/rsi) **1.2 mg/kg IV** (preferred — longer working time for difficult airway) or [Succinylcholine](#/drug/succinylcholine/rsi) **1.5 mg/kg IV**\n\n**Optional pretreatment (3 min before induction):**\n• [Fentanyl](#/drug/fentanyl/rsi pretreatment) 1-3 mcg/kg IV — blunts sympathetic response (elevated ICP, aortic dissection)\n• [Lidocaine](#/drug/lidocaine/rsi pretreatment) 1.5 mg/kg IV — elevated ICP (weak evidence)',
        citation: [1, 2, 3, 4, 15, 16, 17],
        next: 'dab-rsi-complete',
    },
    {
        id: 'dab-awake',
        type: 'info',
        module: 2,
        title: 'Awake Intubation — When to Consider',
        body: '**Awake intubation** comprises <2-3% of all ED intubations. Consider when:\n\n• Predicted difficult intubation **AND** difficult mask ventilation\n• Predicted difficult intubation **AND** cannot tolerate brief apnea\n• Predicted difficult intubation **AND** difficult surgical airway\n• Known history of failed intubation\n• Upper airway obstruction with maintained spontaneous ventilation\n• Severe hemodynamic instability (fear of irreversible compromise with RSI)\n• Significant facial/neck trauma with distorted anatomy\n\n**Only absolute contraindication:** Patient refusal\n\n**Call for help early:**\n• Anesthesiology for awake fiberoptic intubation\n• ENT for potential surgical airway\n• Trauma surgery backup\n\nIf awake intubation not feasible and RSI required despite high risk, proceed to bougie-first RSI with surgical airway kit open at bedside.',
        citation: [7, 8],
        next: 'dab-bougie-rsi',
    },
    {
        id: 'dab-rsi-complete',
        type: 'question',
        module: 2,
        title: 'Laryngoscopic View — Cormack-Lehane Grade',
        body: '**After induction and paralysis — what is the laryngoscopic view?**\n\n| Grade | View | Action |\n|-------|------|--------|\n| **I** | Full glottis visible | Pass ETT directly |\n| **IIa** | Partial cords visible | Pass ETT directly |\n| **IIb** | Only arytenoids visible | **Bougie indicated** |\n| **III** | Only epiglottis visible | **Bougie strongly indicated** |\n| **IV** | No glottis or epiglottis | **Bougie or rescue** |\n\n~95% of ED patients present with CL Grade I-IIa. Bougie benefit is strongest in CL III-IV (RR 1.60 for first-pass success).',
        citation: [1, 5, 9, 10],
        options: [
            {
                label: 'CL I–IIa — Good view',
                description: 'Full or partial cords visible — pass ETT directly or use bougie',
                next: 'dab-attempt-result',
            },
            {
                label: 'CL IIb–III — Poor view, bougie indicated',
                description: 'Only arytenoids or epiglottis visible — bougie is the tool of choice',
                next: 'dab-equipment',
                urgency: 'urgent',
            },
            {
                label: 'CL IV — No view',
                description: 'Cannot see epiglottis or glottis — blind bougie pass or rescue',
                next: 'dab-equipment',
                urgency: 'critical',
            },
        ],
    },
    // =====================================================================
    // MODULE 3: PRIMARY BOUGIE TECHNIQUE
    // =====================================================================
    {
        id: 'dab-equipment',
        type: 'info',
        module: 3,
        title: 'Bougie Equipment Setup',
        body: '| Item | Specification |\n|------|---------------|\n| **Bougie** | 15 Fr × 60 cm coude-tip (Frova or SunMed) |\n| **Laryngoscope** | Video preferred (DEVICE trial: 85% vs 71% first-pass). C-MAC or standard geometry GlideScope for bougie compatibility |\n| **ETT** | 7.0-7.5 mm (women), 7.5-8.0 mm (men), pre-lubricated |\n| **Backup** | Second ETT, i-gel SGA (size 3: 30-60 kg, size 4: 50-90 kg, size 5: >90 kg), surgical airway kit |\n\n**Do NOT preload** the bougie through the ETT — it restricts maneuverability. (EMCrit 388: "Nope!!!")\n\n**Coude tip orientation:** The angled tip must face **anteriorly** (toward ceiling / patient\'s nose). Most bougies have a visual indicator for tip direction.',
        citation: [3, 17],
        next: 'dab-technique',
    },
    {
        id: 'dab-technique',
        type: 'info',
        module: 3,
        title: 'Bougie Insertion — Step by Step',
        body: '**1. Laryngoscopy** — Obtain best possible view. Identify epiglottis or cords.\n\n**2. Insert bougie** — Coude tip anterior, advance along midline under epiglottis into trachea.\n• CL III view: advance bougie behind epiglottis tip (blind pass beneath)\n\n**3. Confirm tracheal placement:**\n• **Tracheal clicks** — felt at ~15-25 cm (unreliable — do not rely solely)\n• **Hold-up sign** — bougie meets resistance at ~30-35 cm (carina). In esophagus, advances freely past 40 cm.\n\n**4. Railroad ETT:**\n• Slide pre-lubricated ETT over bougie\n• **90° counterclockwise rotation** of ETT if it catches on arytenoids\n• **Maintain laryngoscopy** during advancement — keep view until tube passes cords\n\n**5. Remove bougie** once ETT at appropriate depth.\n\n**6. Confirm** with waveform capnography immediately.',
        citation: [1, 16, 17],
        next: 'dab-adjuncts',
    },
    {
        id: 'dab-adjuncts',
        type: 'info',
        module: 3,
        title: 'Key Adjuncts & Common Errors',
        body: '**Adjunct maneuvers:**\n• **Jaw thrust** by assistant — lifts mandible, improves view\n• **External Laryngeal Manipulation (ELM):** Operator-directed movement of larynx to optimize view (superior to BURP)\n• **BURP** (Backward, Upward, Rightward Pressure): assistant applies to thyroid cartilage\n\n**Common errors (EMCrit 388 — Weingart/Barnicle/Driver):**\n• ❌ Preloading bougie through ETT\n• ❌ Not maintaining coude tip anterior orientation\n• ❌ Advancing too aggressively (esophageal placement)\n• ❌ Failing to rotate ETT when it catches on arytenoids\n• ❌ Removing laryngoscope before ETT passes cords\n• ❌ Relying on tracheal clicks alone for confirmation\n\n**ETT depth check:** 21 cm at teeth (women), 23 cm at teeth (men).',
        citation: [17],
        next: 'dab-attempt-result',
    },
    {
        id: 'dab-attempt-result',
        type: 'question',
        module: 3,
        title: 'ETT Passed Successfully?',
        body: 'Was the endotracheal tube successfully advanced into the trachea?\n\nIf uncertain, proceed to confirmation (Module 4) — waveform capnography is the gold standard.',
        options: [
            {
                label: 'Yes — ETT placed',
                description: 'Tube passed through cords, proceed to confirmation',
                next: 'dab-confirm',
            },
            {
                label: 'No — Failed attempt',
                description: 'Could not pass bougie or ETT',
                next: 'dab-max-attempts',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'dab-max-attempts',
        type: 'question',
        module: 3,
        title: 'Attempt Count — Escalation Decision',
        body: '**Limit intubation attempts.** Each attempt causes airway trauma, edema, and bleeding — making subsequent attempts harder.\n\n**Between attempts:**\n• Mask ventilate / apneic oxygenation\n• Reposition (optimize ear-to-sternal-notch)\n• Change device (DL → VL, or different blade)\n• Change operator (most experienced available)\n• Use bougie if not already attempted\n• Suction aggressively',
        citation: [7, 11],
        options: [
            {
                label: '1st failed — Optimize and retry',
                description: 'Reposition, change blade/device, use bougie, different operator',
                next: 'dab-equipment',
            },
            {
                label: '2nd failed — Final attempt',
                description: 'Most experienced operator, best device, bougie, all adjuncts',
                next: 'dab-equipment',
                urgency: 'urgent',
            },
            {
                label: '3rd failed — Declare failed airway',
                description: 'Maximum attempts reached — move to rescue pathway',
                next: 'dab-failed',
                urgency: 'critical',
            },
        ],
    },
    // =====================================================================
    // MODULE 4: CONFIRMATION
    // =====================================================================
    {
        id: 'dab-confirm',
        type: 'info',
        module: 4,
        title: 'Tube Confirmation — Algorithm',
        body: '**Confirmation hierarchy (most to least reliable):**\n\n**1. Waveform Capnography (GOLD STANDARD)**\n• Sensitivity: 100% (non-arrest), 96.8% (cardiac arrest)\n• Specificity: 99-100%\n• Look for **sustained 4-phase waveform** × 5-6 breaths\n• Brief CO₂ from esophageal placement tapers after 2-3 breaths — must be sustained\n• **False negatives:** cardiac arrest (low pulmonary blood flow), massive PE\n• **Mandatory** per AHA/ACEP/ASA guidelines\n\n**2. Esophageal Detector Device (EDD) — Adjunct Only**\n• Bulb re-inflates rapidly in trachea (rigid rings), stays collapsed in esophagus\n• In-hospital sensitivity 99-100%; pre-hospital only 50-80%\n• Cardiac arrest: sensitivity drops to 70-73%\n\n**3. Clinical Confirmation:**\n• Bilateral breath sounds, symmetric chest rise\n• Misting of ETT\n• Absence of epigastric sounds or gastric distension\n\n**4. Depth Check:** 21 cm (women), 23 cm (men) at teeth',
        citation: [12, 13],
        next: 'dab-etco2-check',
    },
    {
        id: 'dab-etco2-check',
        type: 'question',
        module: 4,
        title: 'Sustained ETCO₂ Waveform?',
        body: 'Connect waveform capnography immediately after intubation. Look for sustained 4-phase waveform over at least 5-6 ventilations.\n\n**If ANY doubt about tube placement — remove the tube.**',
        citation: [12],
        options: [
            {
                label: 'Yes — Sustained waveform confirmed',
                description: 'Tracheal placement confirmed. Secure tube.',
                next: 'dab-confirmed',
            },
            {
                label: 'No ETCO₂ / Waveform absent',
                description: 'Esophageal until proven otherwise — remove tube immediately',
                next: 'dab-no-etco2',
                urgency: 'critical',
            },
            {
                label: 'Equivocal — transient CO₂ then loss',
                description: 'Brief CO₂ that tapers = likely esophageal. Re-evaluate.',
                next: 'dab-no-etco2',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'dab-confirmed',
        type: 'result',
        module: 4,
        title: 'Tube Confirmed — Post-Intubation Management',
        body: '**Tube placement confirmed by waveform capnography.**\n\n**Immediate post-intubation:**\n• **Secure tube** — commercial holder or tape\n• **Depth check:** 21 cm at teeth (women), 23 cm at teeth (men)\n• **CXR** — confirm position, rule out right mainstem, pneumothorax\n• **Continuous waveform capnography** monitoring\n\n**Ventilator settings (initial):**\n• Mode: AC/VC or AC/PC\n• TV: 6-8 mL/kg IBW (lung-protective)\n• RR: 14-18\n• FiO₂: 100% initially, wean to SpO₂ 92-96%\n• PEEP: 5 cm H₂O (titrate as needed)\n\n**Post-intubation sedation:**\n• [Ketamine](#/drug/ketamine/procedural sedation) 0.5-2 mg/kg/hr infusion, or\n• [Propofol](#/drug/propofol/refractory se) 5-50 mcg/kg/min, or\n• [Fentanyl](#/drug/fentanyl/burn pain) 25-100 mcg/hr + midazolam\n\n**Continue paralytic only if needed** (e.g., ARDS proning, ventilator dyssynchrony).',
        recommendation: 'Tube confirmed. Secure, verify depth, obtain CXR, initiate sedation and lung-protective ventilation.',
        citation: [3, 12],
    },
    {
        id: 'dab-no-etco2',
        type: 'info',
        module: 4,
        title: 'No ETCO₂ — Esophageal Intubation',
        body: '**No sustained ETCO₂ waveform = esophageal placement until proven otherwise.**\n\n**Immediate actions:**\n1. **Remove the tube** — do not delay\n2. **Mask ventilate** with BVM — two-person technique preferred\n3. **Apneic oxygenation** — 15 L/min NC during prep for next attempt\n4. **Reassess:** How many attempts? Can you oxygenate?\n\n**If this was attempt #3 or patient is desaturating → proceed to Failed Airway Rescue.**',
        citation: [12, 7],
        next: 'dab-max-attempts',
    },
    // =====================================================================
    // MODULE 5: FAILED AIRWAY RESCUE
    // =====================================================================
    {
        id: 'dab-failed',
        type: 'info',
        module: 5,
        title: 'Failed Airway — Vortex Approach',
        body: '**Declare: "This is a failed airway."** Communicate clearly to entire team.\n\n**The Vortex Approach** — three upper airway "lifelines":\n1. **Face mask** (BVM)\n2. **Supraglottic airway** (SGA / LMA)\n3. **Endotracheal tube** (ETT)\n\n**Green Zone** = adequate oxygenation by ANY lifeline. Time to think, plan, call for help.\n\n**CICO** (Can\'t Intubate, Can\'t Oxygenate) = ALL three lifelines failed after best effort. → **Immediate front-of-neck access (eFONA).**\n\n2024 Canadian Airway Focus Group update: trigger changed from CICO to **CICV** (Can\'t Intubate, Can\'t Ventilate) — do not wait for desaturation to declare and act.\n\n**The hardest part is making the decision to cut** — procedures performed too late are the primary cause of bad outcomes.',
        citation: [6, 7, 11, 18],
        next: 'dab-can-oxygenate',
    },
    {
        id: 'dab-can-oxygenate',
        type: 'question',
        module: 5,
        title: 'Can You Oxygenate?',
        body: 'Can the patient be oxygenated by ANY method — BVM, SGA, or apneic oxygenation?\n\n**If SpO₂ is falling and you cannot ventilate by any method — this is CICO. Proceed immediately to surgical airway.**',
        citation: [7, 11],
        options: [
            {
                label: 'Yes — Can oxygenate (CI/CO)',
                description: 'BVM or SGA maintaining oxygenation. Green Zone — time to plan.',
                next: 'dab-cico-green',
            },
            {
                label: 'No — Cannot oxygenate (CICO)',
                description: 'All three lifelines failed. SpO₂ falling. Immediate surgical airway.',
                next: 'dab-cric-go',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'dab-cico-green',
        type: 'info',
        module: 5,
        title: 'CI/CO — Green Zone Rescue',
        body: '**You can oxygenate — you have time.** Use it wisely.\n\n**SGA Rescue:**\n• **i-gel preferred** (no cuff inflation needed, faster placement)\n• LMA Supreme/ProSeal as alternative\n• Sizing: size 3 (30-60 kg), size 4 (50-90 kg), size 5 (>90 kg)\n• Success rate: >95% for ventilation rescue after failed intubation\n\n**While oxygenating via SGA:**\n• Call for help — anesthesiology, ENT\n• Consider awake technique if patient can be woken\n• Consider intubation through SGA (fiberoptic)\n• Prepare surgical airway kit as backup\n• **Do NOT make repeated blind intubation attempts** — each attempt worsens airway',
        citation: [7, 11],
        next: 'dab-sga-result',
    },
    {
        id: 'dab-sga-result',
        type: 'question',
        module: 5,
        title: 'SGA Ventilation Successful?',
        body: 'Is the supraglottic airway providing adequate oxygenation and ventilation?\n\nCheck: chest rise, ETCO₂ waveform through SGA, SpO₂ trend.',
        citation: [7],
        options: [
            {
                label: 'Yes — SGA ventilating',
                description: 'Maintain oxygenation, plan definitive airway with help',
                next: 'dab-sga-success',
            },
            {
                label: 'No — SGA failed, cannot oxygenate',
                description: 'This is now CICO — proceed to surgical airway immediately',
                next: 'dab-cric-go',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'dab-sga-success',
        type: 'result',
        module: 5,
        title: 'SGA Bridge — Plan Definitive Airway',
        body: '**SGA is maintaining oxygenation — stable for now.**\n\n**Next steps:**\n• **Maintain SGA** and continuous monitoring\n• Consult anesthesiology and/or ENT urgently\n• Consider intubation through SGA via fiberoptic scope\n• If patient can be awakened — consider awake intubation\n• Prepare surgical airway kit at bedside\n• Document failed airway — notify all future providers\n\n**Disposition:** ICU admission with airway plan documented. The SGA is a bridge, not a definitive airway for most situations.',
        recommendation: 'SGA maintaining oxygenation. Consult anesthesiology/ENT for definitive airway plan. ICU admission.',
        citation: [7, 11],
    },
    // =====================================================================
    // MODULE 6: SURGICAL AIRWAY
    // =====================================================================
    {
        id: 'dab-cric-go',
        type: 'info',
        module: 6,
        title: 'CICO — Emergency Cricothyrotomy',
        body: '[Scalpel-Finger-Bougie Cric Steps](#/info/dab-cric-steps)\n\n**Announce: "Can\'t intubate, can\'t oxygenate — performing cricothyrotomy."**\n\n**NAP4 Audit (Cook 2011):**\n• Needle cricothyrotomy: **60% failure rate**\n• Surgical cricothyrotomy: **100% success rate**\n• DAS 2015 explicitly recommends **scalpel-bougie technique over needle/cannula**\n\n**Equipment:**\n| Item | Specification |\n|------|---------------|\n| **Scalpel** | #10 blade (broad — matches tracheal tube width) |\n| **Bougie** | Standard 15 Fr coude-tip, lubricated |\n| **ETT** | **6.0 mm cuffed** (DAS guideline) |\n| **Other** | 10 mL syringe (cuff), capnography, ties for securing |\n\nAssign second provider to continue rescue oxygenation attempts while you perform the procedure.',
        citation: [6, 7, 19],
        next: 'dab-cric-landmarks',
    },
    {
        id: 'dab-cric-landmarks',
        type: 'info',
        module: 6,
        title: 'Cricothyroid Membrane — Identification',
        body: '**Cricothyroid Membrane (CTM):**\n• Located between thyroid cartilage (superior) and cricoid cartilage (inferior)\n• Dimensions: **9-19 mm horizontal × 9-20 mm vertical** in adults\n\n**Laryngeal Handshake (palpation technique):**\n1. Non-dominant hand stabilizes larynx\n2. Thumb and 3rd finger grasp lateral thyroid cartilage\n3. Index finger palpates downward to find CTM depression\n4. Brace wrist against sternum for stability\n\n**Obese patients:**\n• CTM may be difficult to palpate — use ultrasound if immediately available\n• Vertical skin incision (~4 cm) to expose landmarks before cutting CTM\n• Full head extension (unless c-spine precaution) improves palpation\n\n**Key landmark:** The CTM is the soft depression below the thyroid cartilage prominence (Adam\'s apple) and above the cricoid ring.',
        citation: [6, 7],
        next: 'dab-cric-technique',
    },
    {
        id: 'dab-cric-technique',
        type: 'info',
        module: 6,
        title: 'Scalpel-Finger-Bougie Technique',
        body: '**Step 1:** **Stabilize larynx** with non-dominant hand (laryngeal handshake)\n\n**Step 2:** **Vertical skin incision** (~4 cm) over CTM — exposes landmarks even if anatomy is obscured. If anatomy is clear, single horizontal stab may suffice.\n\n**Step 3:** **Palpate CTM** with finger through incision — confirm depression between thyroid and cricoid\n\n**Step 4:** **Horizontal stab** through CTM (lower half to avoid superior vessels and vocal cords)\n\n**Step 5:** **Extend incision** — rotate scalpel 180° and extend in opposite direction (blade stays in)\n\n**Step 6:** **Finger in** — replace scalpel with non-dominant index finger through CTM into airway lumen\n\n**Step 7:** **Bougie insertion** — slide lubricated bougie alongside finger into trachea, advance until resistance at 10-15 cm\n\n**Step 8:** **Railroad ETT** (6.0 mm cuffed) over bougie — advance until cuff disappears into airway\n\n**Step 9:** **Inflate cuff**, remove bougie\n\n**Step 10:** **Confirm** with waveform capnography',
        citation: [6, 7, 19],
        next: 'dab-cric-confirm',
    },
    {
        id: 'dab-cric-confirm',
        type: 'question',
        module: 6,
        title: 'ETCO₂ Confirmed After Cric?',
        body: 'Connect waveform capnography immediately. Look for sustained 4-phase waveform.\n\n**If no ETCO₂:** Recheck tube position — may need to advance further or re-examine incision site. The bougie may have tracked into a false passage.',
        citation: [12],
        options: [
            {
                label: 'Yes — ETCO₂ confirmed',
                description: 'Surgical airway successful — proceed to post-procedure care',
                next: 'dab-cric-post',
            },
            {
                label: 'No ETCO₂ — Troubleshoot',
                description: 'Recheck position, advance tube, verify bougie was in airway lumen',
                next: 'dab-cric-technique',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'dab-cric-post',
        type: 'result',
        module: 6,
        title: 'Post-Cricothyrotomy Management',
        body: '**Surgical airway confirmed by waveform capnography.**\n\n**Immediate:**\n• **Secure tube with ties** (not tape — blood on skin prevents adhesion)\n• **CXR** — confirm position, rule out pneumothorax\n• **Continuous waveform capnography** monitoring\n• Monitor for: subcutaneous emphysema, bleeding, posterior wall perforation\n\n**ICU management:**\n• Convert to formal tracheostomy within **24-72 hours** — consult ENT/surgery\n• Document: reason for surgical airway, number of attempts, complications\n• Ventilator settings: lung-protective as per standard post-intubation\n\n**Notify all future providers:** Patient had a failed airway requiring surgical cricothyrotomy. Future intubations require advanced planning and experienced airway management.',
        recommendation: 'Surgical airway successful. Secure with ties, CXR, continuous capnography. Consult ENT for conversion to tracheostomy within 24-72h. ICU admission.',
        citation: [6, 7],
    },
];
export const DIFFICULT_AIRWAY_BOUGIE_NODE_COUNT = DIFFICULT_AIRWAY_BOUGIE_NODES.length;
export const DIFFICULT_AIRWAY_BOUGIE_MODULE_LABELS = [
    'Pre-Assessment',
    'Approach Decision',
    'Bougie Technique',
    'Confirmation',
    'Failed Airway',
    'Surgical Airway',
];
export const DIFFICULT_AIRWAY_BOUGIE_CITATIONS = [
    { num: 1, text: 'Driver BE, Prekker ME, Klein LR, et al. Effect of Use of a Bougie vs Endotracheal Tube and Stylet on First-Attempt Intubation Success Among Patients With Difficult Airways Undergoing Emergency Intubation (BEAM). JAMA. 2018;319(21):2179-2189.' },
    { num: 2, text: 'Driver BE, Prekker ME, Klein LR, et al. Effect of Use of a Bougie vs Endotracheal Tube With Stylet on Successful Intubation on the First Attempt Among Critically Ill Patients (BOUGIE). JAMA. 2021;327(1):62-71.' },
    { num: 3, text: 'Prekker ME, et al. Video versus Direct Laryngoscopy for Tracheal Intubation of Critically Ill Adults (DEVICE trial). N Engl J Med. 2023;389:418-429.' },
    { num: 4, text: 'Matchett G, et al. Ketamine versus Etomidate for Endotracheal Intubation of Critically Ill Adults (KeNIK). N Engl J Med. 2023.' },
    { num: 5, text: 'Systematic Review and Meta-Analysis: Effect of Bougie Use on First-Attempt Success in Tracheal Intubations (18 studies, 9,151 patients). Ann Emerg Med. 2023.' },
    { num: 6, text: 'Cook TM, et al. Major Complications of Airway Management in the UK: Results of the Fourth National Audit Project (NAP4). Br J Anaesth. 2011;106(5):632-42.' },
    { num: 7, text: 'Frerk C, et al. Difficult Airway Society 2015 Guidelines for Management of Unanticipated Difficult Intubation in Adults. Br J Anaesth. 2015;115(6):827-48.' },
    { num: 8, text: 'Ahmad I, et al. Difficult Airway Society Guidelines for Awake Tracheal Intubation (ATI) in Adults. Anaesthesia. 2020;75:509-528.' },
    { num: 9, text: 'Cormack RS, Lehane J. Difficult Tracheal Intubation in Obstetrics. Anaesthesia. 1984;39:1105-1111.' },
    { num: 10, text: 'Yentis SM, Lee DJH. Evaluation of an Improved Scoring System for the Grading of Direct Laryngoscopy. Anaesthesia. 1998;53:1041-1044.' },
    { num: 11, text: 'Chrimes N. The Vortex: A Universal High-Acuity Implementation Tool for Emergency Airway Management. Br J Anaesth. 2016;117 Suppl 1:i20-i27.' },
    { num: 12, text: 'Silvestri S, et al. Endotracheal Tube Placement Confirmation: 100% Sensitivity and Specificity With Sustained Four-Phase Capnographic Waveforms in a Cadaveric Experimental Model. Resuscitation. 2017;115:192-198.' },
    { num: 13, text: 'Salem MR, et al. Efficacy of the Self-Inflating Bulb in Detecting Esophageal Intubation. Anesth Analg. 2001;92:487-93.' },
    { num: 14, text: 'Reed MJ, et al. Can an Airway Assessment Score Predict Difficulty at Intubation in the Emergency Department? Emerg Med J. 2005;22:99-102.' },
    { num: 15, text: 'Semler MW, et al. A Multicenter, Randomized Trial of Ramped Position vs Sniffing Position During Endotracheal Intubation of Critically Ill Adults. Chest. 2017;152(4):712-722.' },
    { num: 16, text: 'Weingart SD. EMCrit Podcast 226: Bougie and Patient Positioning for Emergency Intubation. emcrit.org.' },
    { num: 17, text: 'Weingart SD, Barnicle R, Driver BE. EMCrit Podcast 388: The Experts\' Guide to the Bougie. emcrit.org.' },
    { num: 18, text: 'Canadian Airway Focus Group 2024 Update: Transition from CICO to CICV (Can\'t Intubate, Can\'t Ventilate) Trigger for Front-of-Neck Access.' },
    { num: 19, text: 'DAS 2015 Guidelines: Scalpel-Bougie Technique Recommended Over Needle/Cannula Cricothyroidotomy Based on NAP4 Evidence.' },
];
