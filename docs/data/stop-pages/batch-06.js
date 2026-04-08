export const STOP_PAGES_06 = {
    // ─── CO Toxicity ─────────────────────────────────────────────────────────────
    'co-toxicity-stop': {
        id: 'co-toxicity-stop',
        title: 'CO Toxicity — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT trust pulse oximetry',
                body: 'Standard SpO₂ reads falsely normal in CO poisoning — carboxyhemoglobin looks identical to oxyhemoglobin. A patient with COHb 40% will show SpO₂ 99%. You must order co-oximetry (venous or arterial). [See recognition node](#/node/co-recognition).',
            },
            {
                heading: '🛑 Do NOT wait for labs to start 100% O₂',
                body: 'Start 100% O₂ via non-rebreather immediately on any clinical suspicion. Do not wait for COHb confirmation — every minute of delay extends CO half-life. [See treatment node](#/node/co-treatment-start).',
            },
            {
                heading: '🛑 Do NOT use COHb level alone to triage',
                body: 'COHb does NOT correlate reliably with clinical severity or prognosis. A patient with COHb 15% who lost consciousness is at higher risk than one with COHb 30% who is asymptomatic. Neurologic symptoms and LOC are far more predictive. [See severity node](#/node/co-mild).',
            },
            {
                heading: '🛑 Do NOT miss fire-victim cyanide co-exposure',
                body: 'Combustion of synthetic materials (plastics, wool, nylon) releases cyanide gas. Any enclosed-space fire victim with altered mental status, hypotension, or lactate >10 should receive empiric hydroxocobalamin 5g IV — even before COHb results. [See fire node](#/node/co-fire).',
            },
            {
                heading: '🛑 Do NOT give hydroxocobalamin before drawing COHb',
                body: 'Hydroxocobalamin interferes with co-oximetry for ~24 hours, causing falsely elevated COHb readings. Draw the COHb sample first whenever possible, then give the antidote. [See fire node](#/node/co-fire).',
            },
            {
                heading: '🛑 Do NOT miss the "occult CO" cluster',
                body: 'Multiple household members presenting with headache, nausea, or flu-like symptoms — especially in winter — is CO poisoning until proven otherwise. Ask about shared living space, heating sources, and generators. [See start node](#/node/co-start).',
            },
            {
                heading: '🛑 Do NOT discharge a pregnant patient without HBO evaluation',
                body: 'Fetal hemoglobin binds CO more tightly than adult Hb; fetal COHb runs 10–15% higher than maternal, and CO elimination takes 5× longer in the fetus. The HBO threshold in pregnancy is COHb >15% (vs >25% in non-pregnant). HBO is safe in pregnancy. [See pregnancy node](#/node/co-pregnancy).',
            },
            {
                heading: '🛑 Do NOT forget delayed neurologic sequelae counseling',
                body: 'DNS occurs in 10–30% of significant CO exposures, appearing 2–40 days after apparent full recovery. Every discharged patient must receive explicit return precautions for memory changes, personality changes, or cognitive decline at 2–4 weeks. [See DNS node](#/node/co-dns).',
            },
            {
                heading: '🛑 Do NOT discharge until CO source is eliminated',
                body: 'Returning a patient to a CO-contaminated home is immediately life-threatening. Confirm the source has been inspected and cleared by fire department or utility company before discharge. Provide CO detector instructions. [See discharge node](#/node/co-discharge).',
            },
            {
                heading: '🛑 Do NOT delay HBO transfer for borderline cases',
                body: 'HBO benefit decreases rapidly with time since exposure — most effective within 6 hours. If the patient meets even one HBO criterion (LOC, COHb >25%, neurologic symptoms, cardiac involvement, pregnancy), call the hyperbaric center early and initiate transfer. [See HBO criteria node](#/node/co-hbo-criteria).',
            },
        ],
        citations: [],
    },
    // ─── Guillain-Barré Syndrome ─────────────────────────────────────────────────
    'guillain-barre-stop': {
        id: 'guillain-barre-stop',
        title: 'Guillain-Barré Syndrome — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT use succinylcholine for intubation',
                body: 'Denervated muscle in GBS releases massive potassium when exposed to succinylcholine — fatal hyperkalemia can result. Always use rocuronium 1.2 mg/kg for RSI. [See intubation node](#/node/gbs-intubation).',
            },
            {
                heading: '🛑 Do NOT wait until SpO₂ drops to intubate',
                body: 'GBS patients fail from muscle weakness, not lung disease — SpO₂ stays normal until the very end, giving false reassurance. Intubate electively when FVC <20 mL/kg or NIF is weaker than −30 cmH₂O. Emergent intubation in a crashing GBS patient is far more dangerous. [See respiratory monitoring node](#/node/gbs-respiratory-monitoring).',
            },
            {
                heading: '🛑 Do NOT give corticosteroids',
                body: 'Multiple RCTs confirm steroids provide no benefit in GBS and may actually delay recovery. Treatment is IVIG or plasmapheresis — never steroids. [See treatment node](#/node/gbs-treatment-decision).',
            },
            {
                heading: '🛑 Do NOT combine IVIG and plasmapheresis',
                body: 'Combining both therapies offers no additional benefit, and plasmapheresis may remove the IVIG that was just infused — reducing efficacy of both. Choose one modality. [See treatment node](#/node/gbs-treatment-decision).',
            },
            {
                heading: '🛑 Do NOT discharge any GBS patient from the ED',
                body: 'All suspected GBS patients require admission for serial respiratory monitoring every 4–6 hours. Respiratory deterioration can be precipitous and unpredictable — even "mild" presentations can progress rapidly. [See disposition node](#/node/gbs-disposition).',
            },
            {
                heading: '🛑 Do NOT rely on a normal LP to rule out GBS in week 1',
                body: 'CSF protein may be entirely normal in the first week of GBS. Do not rule out GBS based on normal CSF — the classic albuminocytologic dissociation often takes 1–2 weeks to develop. [See workup node](#/node/gbs-workup).',
            },
            {
                heading: '🛑 Do NOT ignore bulbar symptoms',
                body: 'Patients with pharyngeal-cervical-brachial GBS variant can develop fatal aspiration despite preserved leg strength and adequate FVC. Bulbar weakness is an independent indication for early intubation. [See presentation node](#/node/gbs-presentation).',
            },
            {
                heading: '🛑 Do NOT use long-acting antihypertensives for autonomic BP spikes',
                body: 'Blood pressure in GBS is wildly labile — hypertension and hypotension alternate unpredictably. Long-acting agents cause rebound hypotension. Use only short-acting drugs for BP management. [See autonomic node](#/node/gbs-autonomic).',
            },
        ],
        citations: [],
    },
    // ─── Myasthenia Gravis ───────────────────────────────────────────────────────
    'myasthenia-gravis-stop': {
        id: 'myasthenia-gravis-stop',
        title: 'Myasthenia Gravis — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT miss cholinergic vs myasthenic crisis',
                body: 'These two crises are treated oppositely. Myasthenic crisis needs more anticholinesterase; cholinergic crisis (excess pyridostigmine) is WORSENED by more anticholinesterase. Look for SLUDGE/BBB symptoms (wet secretions, miosis, fasciculations) to identify cholinergic excess. [See crisis differentiation node](#/node/mg-crisis-vs-cholinergic).',
            },
            {
                heading: '🛑 Do NOT give IV magnesium to MG patients',
                body: 'Magnesium blocks neuromuscular transmission and can precipitate acute myasthenic crisis. Avoid IV magnesium even for standard indications (seizure prophylaxis, torsades) unless absolutely no alternative. [See triggers node](#/node/mg-triggers).',
            },
            {
                heading: '🛑 Do NOT give aminoglycosides or fluoroquinolones',
                body: 'Both antibiotic classes impair neuromuscular transmission and can trigger crisis in MG patients. Respiratory fluoroquinolones (levofloxacin, moxifloxacin) are especially dangerous. Use penicillins, cephalosporins, or carbapenems instead. [See triggers node](#/node/mg-triggers).',
            },
            {
                heading: '🛑 Do NOT forget ophthalmic beta-blockers',
                body: 'Topical timolol eye drops are beta-blockers with systemic absorption sufficient to precipitate MG crisis. Always ask specifically about eye drops when reviewing medications — patients often don\'t mention them as "real" medications. [See triggers node](#/node/mg-triggers).',
            },
            {
                heading: '🛑 Do NOT start high-dose steroids without IVIG/PLEX cover',
                body: 'Corticosteroids cause transient worsening in up to 50% of MG patients during the first 1–2 weeks — enough to precipitate crisis. In moderate-to-severe disease, always initiate IVIG or plasmapheresis first to "bridge" through the steroid-induced dip. [See steroids node](#/node/mg-steroids).',
            },
            {
                heading: '🛑 Do NOT wait for SpO₂ to drop before intubating',
                body: 'In myasthenic crisis, muscle weakness impairs ventilation before hypoxia develops. Intubate electively when FVC falls below 15–20 mL/kg or NIF is weaker than −20 to −25 cmH₂O. Use rocuronium at reduced dose (0.3–0.5 mg/kg) — MG patients are exquisitely sensitive to NMBs. [See airway node](#/node/mg-airway).',
            },
            {
                heading: '🛑 Do NOT use standard rocuronium dosing',
                body: 'MG patients are extremely sensitive to non-depolarizing NMBs — use 1/3 the standard dose (0.3–0.5 mg/kg instead of 1.2 mg/kg). Full-dose rocuronium can cause prolonged paralysis lasting hours. [See airway node](#/node/mg-airway).',
            },
            {
                heading: '🛑 Do NOT stop anticholinesterase when diagnosis is unclear',
                body: 'If you cannot distinguish myasthenic from cholinergic crisis, STOP all anticholinesterase medications (pyridostigmine) and support the airway. Do not continue dosing when uncertain — it is safer to hold and reassess. [See uncertain crisis node](#/node/mg-uncertain-crisis).',
            },
        ],
        citations: [],
    },
    // ─── Botulism ────────────────────────────────────────────────────────────────
    'botulism-stop': {
        id: 'botulism-stop',
        title: 'Botulism — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT wait for lab confirmation to give antitoxin',
                body: 'Botulism is a clinical diagnosis. Antitoxin neutralizes only circulating toxin — once toxin is bound to nerve terminals it cannot be reversed. Every hour of delay means more irreversible binding and longer ventilator dependence. Call CDC (770-488-7100) immediately on clinical suspicion. [See antitoxin node](#/node/bot-antitoxin).',
            },
            {
                heading: '🛑 Do NOT give antibiotics to infants with botulism',
                body: 'In infant botulism, the bacteria are in the gut producing toxin in vivo. Antibiotics can lyse the bacteria, releasing a massive bolus of additional toxin. Aminoglycosides also potentiate neuromuscular blockade. Use BabyBIG (human botulism immune globulin) and supportive care only. [See infant node](#/node/bot-antitoxin-infant).',
            },
            {
                heading: '🛑 Do NOT give aminoglycosides in any botulism type',
                body: 'Aminoglycosides potentiate neuromuscular blockade and can dramatically accelerate respiratory failure. This applies to all forms of botulism — foodborne, wound, and infant. [See wound node](#/node/bot-supportive-wound).',
            },
            {
                heading: '🛑 Do NOT confuse descending (botulism) with ascending (GBS) paralysis',
                body: 'Botulism starts with cranial nerve symptoms (diplopia, dysarthria, dysphagia) and descends. GBS starts in the legs and ascends. Botulism also has fixed dilated pupils and prominent autonomic features; GBS has sensory abnormalities and elevated CSF protein. [See DDx node](#/node/bot-ddx).',
            },
            {
                heading: '🛑 Do NOT miss wound botulism in IV drug users',
                body: 'Black tar heroin users who skin-pop or muscle can develop wound botulism with a benign-appearing wound and NO GI symptoms. Incubation is 4–14 days. Inspect all injection sites carefully and consider sinus involvement in cocaine users. [See wound type node](#/node/bot-wound).',
            },
            {
                heading: '🛑 Do NOT use edrophonium to diagnose botulism',
                body: 'The Tensilon test is unreliable for botulism — it may show minimal response (vs. robust improvement in MG) but cannot confirm or exclude botulism. Use it only to help differentiate from myasthenia gravis, and do not rely on it as a primary diagnostic tool. [See workup node](#/node/bot-workup-imaging).',
            },
            {
                heading: '🛑 Do NOT delay public health notification',
                body: 'Botulism is a Category A bioterrorism agent and a nationally notifiable disease. Even one case requires immediate notification of state health department and CDC. Multiple cases without a common food source must trigger a bioterrorism investigation. [See public health node](#/node/bot-public-health).',
            },
            {
                heading: '🛑 Do NOT discharge any suspected botulism patient',
                body: 'All suspected botulism requires ICU admission with continuous respiratory monitoring (FVC q4h), cardiac telemetry, and rapid access to intubation. Respiratory decline can be sudden. There is no outpatient management of suspected botulism. [See disposition node](#/node/bot-disposition).',
            },
        ],
        citations: [],
    },
    // ─── Aortic Aneurysm ─────────────────────────────────────────────────────────
    'aortic-aneurysm-stop': {
        id: 'aortic-aneurysm-stop',
        title: 'Aortic Aneurysm — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT require the classic triad to act',
                body: 'The classic AAA triad of hypotension + back pain + pulsatile mass is present in fewer than 50% of ruptured AAAs. A hemodynamically unstable patient with abdominal or back pain should be assumed to have a ruptured aortic aneurysm until proven otherwise. [See AAA eval node](#/node/aortic-aaa-eval).',
            },
            {
                heading: '🛑 Do NOT over-resuscitate with fluids before OR',
                body: 'Aggressive IV fluid resuscitation in ruptured AAA raises blood pressure, disrupts the retroperitoneal tamponade, and causes "popping the clot." Target permissive hypotension (SBP 70–90 mmHg) until definitive surgical control. [See ruptured AAA node](#/node/aortic-aaa-ruptured).',
            },
            {
                heading: '🛑 Do NOT delay surgical consultation for imaging',
                body: 'In an unstable patient with suspected ruptured AAA, surgical consultation must happen simultaneously with or even before imaging — not after. An unstable patient should go directly to OR for bedside ultrasound confirmation if needed. CT scanning an unstable AAA patient risks death in the scanner. [See AAA surgical node](#/node/aortic-aaa-surgical).',
            },
            {
                heading: '🛑 Do NOT forget malperfusion in aortic emergencies',
                body: 'Aortic emergencies can cause end-organ ischemia via branch vessel involvement: stroke (carotid), paraplegia (spinal), mesenteric ischemia (SMA/celiac), limb ischemia (iliac). These branch vessel complications change management and prognosis. [See malperfusion node](#/node/aortic-malperfusion).',
            },
            {
                heading: '🛑 Do NOT use a positive D-dimer to confirm dissection',
                body: 'D-dimer is useful only to RULE OUT dissection (negative D-dimer with low ADD-RS). A positive D-dimer is non-specific (elevated in PE, MI, infection, etc.) and cannot confirm aortic dissection — proceed to CTA. [See D-dimer node](#/node/aortic-ddimer).',
            },
            {
                heading: '🛑 Do NOT discharge an incidental aneurysm without vascular follow-up',
                body: 'An incidentally found aortic aneurysm requires documented vascular surgery referral and clear size-based surveillance intervals. Patients need explicit return instructions for any new abdominal, back, or flank pain. [See incidental node](#/node/aortic-incidental).',
            },
            {
                heading: '🛑 Do NOT classify a symptomatic aneurysm as stable',
                body: 'A known aneurysm that is now painful — even with stable hemodynamics — is a symptomatic aneurysm and requires urgent vascular consultation. New pain may indicate contained leak or impending rupture; these patients can deteriorate rapidly. [See symptomatic node](#/node/aortic-symptomatic).',
            },
        ],
        citations: [],
    },
    // ─── Aortic Dissection ───────────────────────────────────────────────────────
    'aortic-dissection-stop': {
        id: 'aortic-dissection-stop',
        title: 'Aortic Dissection — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT give thrombolytics for STEMI pattern',
                body: 'Aortic dissection involving the coronary ostia causes true myocardial infarction with ST-elevation. Giving tPA or other thrombolytics is immediately fatal — it turns a contained dissection into a catastrophic hemorrhage. Always consider dissection before administering thrombolytics for STEMI, especially in patients with atypical features. [See atypical presentations node](#/node/dissect-atypical).',
            },
            {
                heading: '🛑 Do NOT give a vasodilator before a beta-blocker',
                body: 'In dissection, vasodilators (nitroprusside, nicardipine) used alone increase heart rate and aortic wall stress via reflex tachycardia. Always establish heart rate control with a beta-blocker first (target HR <60 bpm), then add a vasodilator if further BP reduction is needed. [See anti-impulse node](#/node/dissect-beta-blocker).',
            },
            {
                heading: '🛑 Do NOT aggressively resuscitate hypotensive Type A',
                body: 'Hypotension in Type A dissection usually means tamponade or aortic rupture — aggressive fluid resuscitation increases wall stress and can accelerate catastrophe. The definitive treatment is emergent surgery. Minimal resuscitation while mobilizing the OR. [See hypotension node](#/node/dissect-hypotension).',
            },
            {
                heading: '🛑 Do NOT delay diagnosis in painless presentation',
                body: 'Up to 6% of dissections are painless — presenting with syncope, stroke, or acute heart failure only. Elderly and diabetic patients are at highest risk for painless dissection. Always consider dissection in unexplained stroke in young patients or new aortic regurgitation. [See atypical node](#/node/dissect-atypical).',
            },
            {
                heading: '🛑 Do NOT skip CTA because D-dimer is "slightly elevated"',
                body: 'The ADD-RS + D-dimer strategy allows ruling OUT dissection — not ruling it in. If clinical suspicion is moderate or high (ADD-RS ≥1), CTA chest/abdomen/pelvis with contrast is required regardless of D-dimer value. [See D-dimer node](#/node/dissect-ddimer).',
            },
            {
                heading: '🛑 Do NOT medically manage Type A dissection',
                body: 'Stanford Type A dissection (involving ascending aorta) carries 1–2% per hour mortality untreated — 50% dead at 48 hours. Medical management is not definitive therapy for Type A; it buys minutes while the OR is mobilized. Call cardiac surgery immediately. [See Type A node](#/node/dissect-type-a).',
            },
            {
                heading: '🛑 Do NOT measure only one arm blood pressure',
                body: 'A BP differential >20 mmHg between arms (LR 5.7) is a high-specificity finding for dissection. Always check both arms in any patient with chest or back pain. Document both readings. [See presentation node](#/node/dissect-presentation).',
            },
            {
                heading: '🛑 Do NOT anticoagulate Type B without vascular input',
                body: 'Anticoagulation for incidental findings or branch vessel thrombosis in aortic dissection requires vascular surgery guidance. Uncontrolled anticoagulation in the setting of dissection can cause catastrophic hemorrhage into the false lumen. [See Type B node](#/node/dissect-type-b-uncomplicated).',
            },
        ],
        citations: [],
    },
    // ─── Bronchiolitis ───────────────────────────────────────────────────────────
    'bronchiolitis-stop': {
        id: 'bronchiolitis-stop',
        title: 'Bronchiolitis — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT give albuterol',
                body: 'Multiple RCTs and meta-analyses confirm that bronchodilators (albuterol, salbutamol) provide no benefit in viral bronchiolitis and are not recommended. They increase heart rate and agitation without improving oxygenation or reducing hospitalizations. [See severity node](#/node/bronch-severity).',
            },
            {
                heading: '🛑 Do NOT give systemic corticosteroids',
                body: 'Steroids have no proven benefit in bronchiolitis and are explicitly not recommended. Giving dexamethasone or prednisolone for bronchiolitis is guideline-non-adherent practice. [See moderate node](#/node/bronch-moderate).',
            },
            {
                heading: '🛑 Do NOT routinely order chest X-rays',
                body: 'Routine CXR in bronchiolitis increases radiation exposure, drives antibiotic overuse (by identifying "infiltrates" that are atelectasis), and does not change management. CXR is only indicated when the diagnosis is uncertain or the patient is deteriorating unexpectedly. [See start node](#/node/bronch-start).',
            },
            {
                heading: '🛑 Do NOT give antibiotics empirically',
                body: 'Bronchiolitis is viral. Antibiotics provide no benefit, increase adverse effects, and select for resistant organisms. Do not prescribe antibiotics unless a concomitant bacterial infection (e.g., UTI) is specifically identified. [See start node](#/node/bronch-start).',
            },
            {
                heading: '🛑 Do NOT use SpO₂ as the sole discharge criterion',
                body: 'Discharge readiness requires clinical assessment of work of breathing, feeding ability, and parental capability — not just SpO₂ ≥90-92%. Infants with good clinical appearance may tolerate mild desaturation during sleep without requiring hospitalization. [See discharge node](#/node/bronch-ed-dc).',
            },
            {
                heading: '🛑 Do NOT manage high-risk infants on the standard pathway',
                body: 'Infants with congenital heart disease, chronic lung disease, immunodeficiency, neuromuscular disease, or prematurity require individualized management — the standard bronchiolitis pathway does not apply. These patients deteriorate faster and may need earlier escalation. [See exclusion node](#/node/bronch-exclude).',
            },
            {
                heading: '🛑 Do NOT delay HFNC for severe respiratory distress',
                body: 'High-flow nasal cannula is the preferred escalation step for severe bronchiolitis failing standard oxygen. It reduces work of breathing, improves oxygenation, and can prevent intubation. Do not delay it while awaiting clinical deterioration. [See HFNC node](#/node/bronch-hfnc-init).',
            },
        ],
        citations: [],
    },
    // ─── Brugada Syndrome ────────────────────────────────────────────────────────
    'brugada-syndrome-stop': {
        id: 'brugada-syndrome-stop',
        title: 'Brugada Syndrome — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT miss Brugada phenocopy',
                body: 'Type 1 Brugada ECG pattern can be caused by fever, electrolyte abnormalities, cocaine, ischemia, or sodium channel-blocking drugs — not the genetic syndrome. Treat the underlying cause. A Type 1 pattern that normalizes after fever reduction does not require the same workup as true Brugada syndrome. [See phenocopy node](#/node/brugada-phenocopy-check).',
            },
            {
                heading: '🛑 Do NOT underprescribe antipyretics in Brugada patients',
                body: 'Fever unmasks the Type 1 Brugada pattern 20× more frequently and can directly trigger VF. In any known Brugada patient with fever, treat aggressively with acetaminophen and ibuprofen — do not wait for a high temperature. These patients require admission. [See fever node](#/node/brugada-fever).',
            },
            {
                heading: '🛑 Do NOT give sodium-channel blocking drugs',
                body: 'Class IC antiarrhythmics (flecainide, propafenone), tricyclics, some antihistamines, and cocaine all unmask or worsen Brugada pattern by blocking sodium channels. Always check the Brugada drugs-to-avoid list before prescribing any new medication. [See drug exposure node](#/node/brugada-drug-exposure).',
            },
            {
                heading: '🛑 Do NOT discharge a Brugada patient after electrical storm',
                body: 'VF storm (≥3 separate VF episodes in 24 hours) in Brugada requires emergent electrophysiology consultation and isoproterenol infusion. These patients need ICU-level care, not monitoring on a telemetry floor. [See storm node](#/node/brugada-storm).',
            },
            {
                heading: '🛑 Do NOT use an ICD as the only therapy for VF storm',
                body: 'Repeated ICD shocks for Brugada VF storm cause pain, anxiety, and myocardial injury — and do not suppress the arrhythmia substrate. Isoproterenol (which increases inward calcium current and outward potassium) is the pharmacologic bridge while EP consultation is obtained. [See storm node](#/node/brugada-storm).',
            },
            {
                heading: '🛑 Do NOT diagnose Type 1 Brugada from a right-precordial lead alone',
                body: 'Type 1 Brugada pattern requires classic coved morphology (not just saddle-back) in V1–V2. Misidentifying Type 2 (saddle-back) as diagnostic Type 1 leads to incorrect risk stratification and unnecessary workup. Use the Shanghai Score systematically. [See ECG patterns node](#/node/brugada-ecg-patterns).',
            },
            {
                heading: '🛑 Do NOT discharge a newly diagnosed Brugada patient without cardiac referral',
                body: 'Even asymptomatic Type 1 Brugada requires electrophysiology follow-up for risk stratification, family screening, and drug avoidance counseling. ED discharge without a clear cardiology referral plan is unsafe. [See disposition node](#/node/brugada-disposition).',
            },
        ],
        citations: [],
    },
    // ─── Button Battery ──────────────────────────────────────────────────────────
    'button-battery-stop': {
        id: 'button-battery-stop',
        title: 'Button Battery — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT induce vomiting',
                body: 'Induced vomiting prolongs contact between the battery and the esophageal mucosa, accelerating liquefactive necrosis. It is contraindicated regardless of timing or battery location. [See avoidance node](#/node/battery-avoid).',
            },
            {
                heading: '🛑 Do NOT delay endoscopy for NPO status in esophageal batteries',
                body: 'An esophageal button battery is generating hydroxide ions and burning through tissue every minute. Do not wait the standard 6–8 hours for an "empty stomach." Emergent endoscopy is required regardless of when the child last ate. [See esophageal node](#/node/battery-esophageal).',
            },
            {
                heading: '🛑 Do NOT give activated charcoal or laxatives',
                body: 'Activated charcoal has no role in button battery ingestion and may interfere with endoscopic visualization. Laxatives and PEG solution do not accelerate battery passage through the esophagus and delay definitive action. [See avoidance node](#/node/battery-avoid).',
            },
            {
                heading: '🛑 Do NOT miss aortoesophageal fistula signs',
                body: 'A sentinel bleed (small hematemesis that resolves) after esophageal battery removal can signal impending aortoesophageal fistula — a rapidly fatal complication. Any post-removal bleeding requires emergent imaging and surgical consultation. Do not discharge after a sentinel bleed. [See AEF node](#/node/battery-aef).',
            },
            {
                heading: '🛑 Do NOT assume a "small" battery is low risk in the esophagus',
                body: 'Even batteries <20mm can cause significant esophageal injury. Battery diameter, location, duration of contact, and patient age all factor into risk. Any battery confirmed or suspected in the esophagus requires emergent removal — not watchful waiting. [See esophageal node](#/node/battery-esophageal).',
            },
            {
                heading: '🛑 Do NOT attempt blind balloon catheter removal',
                body: 'Blind removal without direct visualization risks pushing the battery deeper, causing perforation, or missing a battery that has already eroded into surrounding structures. Only endoscopic removal under direct vision is appropriate. [See avoidance node](#/node/battery-avoid).',
            },
            {
                heading: '🛑 Do NOT discharge symptomatic battery ingestions without imaging',
                body: 'Any child with symptoms after button battery ingestion (drooling, vomiting, gagging, chest pain, wheezing) must be imaged immediately to localize the battery. Symptomatic patients have esophageal batteries until proven otherwise. [See symptomatic node](#/node/battery-symptomatic).',
            },
            {
                heading: '🛑 Do NOT allow honey or sucralfate to delay endoscopy',
                body: 'Honey and sucralfate are studied as temporizing measures to buffer tissue injury, but they do NOT substitute for endoscopic removal. Administering them must not create a false sense of security or delay definitive treatment. [See esophageal removal node](#/node/battery-esophageal-removal).',
            },
        ],
        citations: [],
    },
    // ─── Cardiogenic Shock ───────────────────────────────────────────────────────
    'cardiogenic-shock-stop': {
        id: 'cardiogenic-shock-stop',
        title: 'Cardiogenic Shock — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT fluid-bolus cardiogenic shock',
                body: 'A patient in cardiogenic shock is already volume overloaded with a failing pump. Aggressive fluid resuscitation increases preload, worsens pulmonary edema, and accelerates deterioration. Distinguish cardiogenic from distributive shock before giving any fluids. [See hemodynamics node](#/node/cs-hemodynamics).',
            },
            {
                heading: '🛑 Do NOT use phenylephrine or vasopressin as monotherapy',
                body: 'Pure vasoconstrictors increase afterload without improving contractility — they make a failing heart work harder against a higher resistance. In cardiogenic shock, norepinephrine (vasopressor + mild inotrope) is the preferred first-line agent; add dobutamine or epinephrine for low cardiac output. [See pressors node](#/node/cs-pressors).',
            },
            {
                heading: '🛑 Do NOT use milrinone if BP is borderline or low',
                body: 'Milrinone is a potent vasodilator as well as an inotrope. In hypotensive cardiogenic shock, milrinone will drop the blood pressure further. Reserve milrinone for patients with adequate or elevated SVR who need additional inotropy without further vasopressor effect. [See pressor choice node](#/node/cs-pressor-choice).',
            },
            {
                heading: '🛑 Do NOT miss right ventricular failure as the etiology',
                body: 'RV failure from RV MI, massive PE, or severe pulmonary hypertension requires a fundamentally different approach — fluids (cautiously), afterload reduction for the RV, and avoidance of vasodilators that drop RV perfusion. Always assess RV function before initiating shock treatment. [See RV failure node](#/node/cs-rv-failure).',
            },
            {
                heading: '🛑 Do NOT delay catheterization for AMI-CS',
                body: 'In acute MI-related cardiogenic shock, early revascularization (PCI) is the only therapy proven to reduce mortality. Delays for stabilization, hemodynamic optimization, or MCS placement should not prevent timely catheterization. [See cath node](#/node/cs-cath).',
            },
            {
                heading: '🛑 Do NOT intubate cardiogenic shock without vasopressor coverage',
                body: 'Induction agents cause vasodilation and myocardial depression in an already failing heart. Intubating cardiogenic shock without active vasopressor infusion running is a common cause of peri-intubation cardiac arrest. Have norepinephrine infusing before laryngoscopy. [See initial Rx node](#/node/cs-initial-rx).',
            },
            {
                heading: '🛑 Do NOT wait for the "full picture" before escalating',
                body: 'Cardiogenic shock deteriorates rapidly. If initial resuscitation (vasopressors, inotropy, revascularization) is failing, escalate to MCS early rather than late. Patients in SCAI Stage D or E who survive are more likely to recover if MCS is deployed before multi-organ failure sets in. [See MCS node](#/node/cs-mcs-decision).',
            },
        ],
        citations: [],
    },
    // ─── Cervical Artery Dissection ──────────────────────────────────────────────
    'cervical-artery-dissection-stop': {
        id: 'cervical-artery-dissection-stop',
        title: 'Cervical Artery Dissection — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT miss strangulation as a cause',
                body: 'Non-fatal strangulation can dissect the carotid or vertebral artery even with no visible neck injury — 50% of strangulation victims have no external marks. Ask directly about choking. Any patient with unilateral headache, neck pain, or Horner syndrome after neck trauma needs vascular imaging. [See strangulation node](#/node/cad-strangulation).',
            },
            {
                heading: '🛑 Do NOT anchor to a single diagnosis before imaging',
                body: 'Cervical artery dissection mimics migraine (ipsilateral headache), cluster headache, and benign neck pain. The diagnosis requires vessel imaging — MRA or CTA of the neck and brain. Any unexplained Horner syndrome, pulsatile tinnitus, or "worst headache" after neck trauma warrants imaging. [See red flags node](#/node/cad-red-flags).',
            },
            {
                heading: '🛑 Do NOT withhold anticoagulation for ICH in dissection',
                body: 'Small ischemic strokes from dissection are the primary harm — not the vessel itself. Anticoagulation for dissection-related stroke prevention is generally continued even with small hemorrhagic transformation. Discuss with neurology, but do not reflexively withhold. [See treatment node](#/node/cad-treatment).',
            },
            {
                heading: '🛑 Do NOT miss ipsilateral Horner syndrome',
                body: 'Ptosis + miosis + anhidrosis on the same side as headache or neck pain is Horner syndrome and is the classic sign of internal carotid or vertebral dissection (sympathetic fibers travel with the carotid). This finding warrants emergent vascular imaging. [See red flags node](#/node/cad-red-flags).',
            },
            {
                heading: '🛑 Do NOT discharge without stroke precautions and follow-up',
                body: 'Cervical artery dissection has significant risk of ischemic stroke in the days to weeks after the initial event. Every patient diagnosed with dissection needs a clear safety plan, anticoagulation or antiplatelet therapy, repeat imaging at follow-up, and explicit return instructions for any new neurologic symptoms. [See safety node](#/node/cad-safety).',
            },
            {
                heading: '🛑 Do NOT forget IPV screening in spontaneous dissection',
                body: 'Cervical artery dissection in young patients with vague or inconsistent trauma history should trigger a thoughtful inquiry about intimate partner violence. The CAD consult includes IPV safety planning resources for this reason. [See IPV node](#/node/cad-mechanism).',
            },
        ],
        citations: [],
    },
    // ─── Code Status ─────────────────────────────────────────────────────────────
    'code-status-stop': {
        id: 'code-status-stop',
        title: 'Code Status — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT conflate DNR with "do not treat"',
                body: 'A DNR order means only that the patient does not want CPR or defibrillation. It does NOT mean withholding antibiotics, IV fluids, vasopressors, pain management, or any other treatment. Patients and families must understand this distinction. [See DNR/treatment node](#/node/code-dnr-treatment).',
            },
            {
                heading: '🛑 Do NOT have a goals-of-care conversation in code mode',
                body: 'A critically ill patient who is actively decompensating cannot make informed decisions about their goals of care. Stabilize first. When the immediate crisis has passed, then have the conversation thoughtfully and without time pressure. [See "when" node](#/node/code-when).',
            },
            {
                heading: '🛑 Do NOT ask "do you want us to do everything?"',
                body: '"Everything" is not a defined medical treatment. Patients who say "yes" to everything often do not want prolonged mechanical ventilation or CPR when they understand what it involves. Ask instead what the patient values and fears — then translate that into medical orders. [See key phrases node](#/node/code-key-phrases).',
            },
            {
                heading: '🛑 Do NOT present code status as a binary choice',
                body: 'Offering only "full code" or "DNR/DNI" misses the nuance of what patients actually want. Most patients want comfort and dignity — the medical order is a translation of those values. Present options in terms of goals, not procedures. [See reframing node](#/node/code-reframe).',
            },
            {
                heading: '🛑 Do NOT skip capacity assessment before GOC discussion',
                body: 'Goals-of-care decisions require patient decision-making capacity. Before engaging in any GOC conversation, confirm the patient understands their situation, appreciates consequences, can reason, and can communicate a consistent choice. [See capacity node](#/node/code-capacity).',
            },
            {
                heading: '🛑 Do NOT make a surrogate feel blamed for the patient\'s condition',
                body: 'Surrogates are often overwhelmed with guilt and grief. Language that implies their decision caused or will cause harm is counterproductive. Reframe: "You are helping us understand what [patient name] would want — that is the most loving thing you can do." [See surrogate node](#/node/code-surrogate).',
            },
            {
                heading: '🛑 Do NOT omit documentation after GOC conversations',
                body: 'A verbal GOC discussion that is not documented is legally and medically invisible. Document the exact conversation in the medical record: who was present, what was discussed, what decision was reached, and whether a POLST/MOLST was completed. [See documentation node](#/node/code-documentation).',
            },
        ],
        citations: [],
    },
    // ─── Oxygen Delivery ─────────────────────────────────────────────────────────
    'oxygen-delivery-stop': {
        id: 'oxygen-delivery-stop',
        title: 'Oxygen Delivery — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT target SpO₂ >96% in COPD patients',
                body: 'Hyperoxia in COPD suppresses the hypoxic ventilatory drive and causes V/Q mismatch by releasing hypoxic pulmonary vasoconstriction — worsening CO₂ retention and hypercapnia. Target SpO₂ 88–92% in COPD and other hypercapnic patients. [See COPD device node](#/node/o2-copd-device).',
            },
            {
                heading: '🛑 Do NOT use NRB for COPD exacerbation',
                body: 'Non-rebreather mask delivers uncontrolled FiO₂ near 100% — dangerous in COPD because it will drive SpO₂ well above target and risk hypercapnic respiratory failure. Use a Venturi mask to deliver precise, controlled FiO₂ (24–28%) in COPD exacerbation. [See Venturi node](#/node/o2-venturi-info).',
            },
            {
                heading: '🛑 Do NOT forget SpO₂ is unreliable in severe anemia or hypoperfusion',
                body: 'Pulse oximetry requires adequate perfusion and hemoglobin to be accurate. In severe anemia, carbon monoxide exposure, methemoglobinemia, or shock states, SpO₂ may be falsely normal. Clinical assessment and ABG/co-oximetry are needed in these situations. [See monitoring node](#/node/o2-monitoring).',
            },
            {
                heading: '🛑 Do NOT escalate oxygen without considering NIV first',
                body: 'Patients failing standard oxygen therapy (NC/simple mask) and approaching intubation have a window for NIV (BiPAP or HFNC). This window closes once the patient becomes too exhausted or uncooperative. Do not skip the NIV step by going from low-flow O₂ directly to intubation. [See escalation node](#/node/o2-escalation).',
            },
            {
                heading: '🛑 Do NOT use HFNC as a bridge to delayed intubation',
                body: 'HFNC can mask deterioration in patients who are actually worsening. If the ROX index (SpO₂/FiO₂ ÷ RR) is not improving or is <3.85 at 2 hours, escalate promptly — do not let HFNC delay a necessary intubation. [See HFNC titration node](#/node/o2-titrate-hfnc).',
            },
            {
                heading: '🛑 Do NOT overlook intubation criteria while titrating O₂',
                body: 'Clinical worsening (agitation, accessory muscle use, paradoxical breathing, inability to speak in sentences) signals impending respiratory arrest even when SpO₂ appears acceptable. Do not wait for SpO₂ to drop before moving to intubation. [See intubation criteria node](#/node/o2-intubation-criteria).',
            },
        ],
        citations: [],
    },
    // ─── COPD Exacerbation ───────────────────────────────────────────────────────
    'copd-exacerbation-stop': {
        id: 'copd-exacerbation-stop',
        title: 'COPD Exacerbation — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT give uncontrolled high-flow oxygen',
                body: 'High-flow oxygen in COPD exacerbation worsens hypercapnia by suppressing hypoxic drive and causing V/Q mismatch. Target SpO₂ 88–92% using a Venturi mask or titrated nasal cannula. SpO₂ >95% in a COPD patient receiving supplemental O₂ is a warning sign of over-oxygenation. [See start node](#/node/copd-start).',
            },
            {
                heading: '🛑 Do NOT intubate before a trial of NIV',
                body: 'Bilevel NIV (BiPAP) is the standard of care for moderate-to-severe COPD exacerbation with respiratory acidosis (pH <7.35, pCO₂ >45). It reduces intubation rates by ~65%, ICU length of stay, and mortality. Intubation should be reserved for NIV failure or contraindications. [See NIV indication node](#/node/copd-niv-indication).',
            },
            {
                heading: '🛑 Do NOT use ketamine alone to intubate COPD',
                body: 'While ketamine is preferred for induction (bronchodilation, hemodynamics preserved), you must also optimize the patient hemodynamically before laryngoscopy. COPD patients have air trapping and high intrinsic PEEP — they can crash catastrophically at the moment of intubation. Have vasopressors available. [See intubation node](#/node/copd-intubation).',
            },
            {
                heading: '🛑 Do NOT set a fast respiratory rate post-intubation',
                body: 'In obstructive physiology (COPD, asthma), high respiratory rates cause auto-PEEP (breath stacking) — trapped gas generates extreme intrathoracic pressure, impairs venous return, and causes hypotension or cardiac arrest. Target RR 10–14/min and allow prolonged expiration. [See vent management node](#/node/copd-vent-management).',
            },
            {
                heading: '🛑 Do NOT withhold antibiotics in moderate-severe exacerbation',
                body: 'Approximately 50–70% of AECOPD exacerbations are triggered by bacterial infection. Patients with purulent sputum, increased sputum volume, or increased dyspnea (Anthonisen criteria) benefit from antibiotics. Withholding them in moderate-severe exacerbations is associated with worse outcomes. [See antibiotics node](#/node/copd-antibiotics).',
            },
            {
                heading: '🛑 Do NOT discharge with incomplete inhaler technique education',
                body: 'Most COPD readmissions within 30 days involve poor inhaler technique and medication non-adherence. Before discharge, demonstrate proper inhaler technique and confirm the patient can perform it. Prescribe a spacer for MDIs when possible. [See discharge node](#/node/copd-discharge).',
            },
            {
                heading: '🛑 Do NOT confuse auto-PEEP for primary hypotension',
                body: 'Post-intubation hypotension in COPD is auto-PEEP (obstructive shock) until proven otherwise. The treatment is to disconnect the ventilator and allow passive exhalation — not to give fluids or vasopressors as first line. [See vent management node](#/node/copd-vent-management).',
            },
        ],
        citations: [],
    },
    // ─── CVST ────────────────────────────────────────────────────────────────────
    'cvst-stop': {
        id: 'cvst-stop',
        title: 'CVST — Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        sections: [
            {
                heading: '🛑 Do NOT withhold anticoagulation because of ICH',
                body: 'Intracranial hemorrhage in CVST is a consequence of venous congestion — NOT a contraindication to anticoagulation. Treating the underlying thrombosis with heparin or LMWH prevents further hemorrhage and is supported by AHA/ASA and ESO guidelines. Withholding anticoagulation for CVST-associated ICH is a critical error. [See ICH/anticoag node](#/node/cvst-ich-anticoag).',
            },
            {
                heading: '🛑 Do NOT diagnose CVST on CT alone',
                body: 'Standard non-contrast CT brain is normal in up to 30% of CVST cases. The "dense triangle sign" (thrombosed sinus) is insensitive. MRI with MR venography (MRV) or CT venography is required to confirm or exclude CVST in any patient with unexplained headache, papilledema, or focal deficits. [See imaging node](#/node/cvst-diagnosis).',
            },
            {
                heading: '🛑 Do NOT anchor exclusively on thunderclap headache for diagnosis',
                body: 'CVST classically presents with progressive headache over days — not sudden thunderclap onset. Missing CVST by only evaluating for SAH and sending the patient home with a "negative workup" is a critical diagnostic error. Include CVST in the headache differential when headache is subacute, focal deficits are present, or risk factors exist. [See clinical syndromes node](#/node/cvst-clinical-syndrome).',
            },
            {
                heading: '🛑 Do NOT use direct oral anticoagulants as first-line in acute CVST',
                body: 'Acute CVST is treated with IV heparin as first-line because of reliable reversibility and monitoring. DOACs can be used for outpatient step-down anticoagulation, but IV heparin is the standard of care in the acute in-hospital phase. [See treatment node](#/node/cvst-treatment).',
            },
            {
                heading: '🛑 Do NOT stop anticoagulation after initial improvement',
                body: 'CVST requires prolonged anticoagulation (typically 3–12 months depending on etiology and thrombophilia workup) to prevent rethrombosis and propagation. Early discontinuation — even after apparent clinical recovery — risks recurrence. Duration is guided by the underlying cause. [See duration node](#/node/cvst-duration).',
            },
            {
                heading: '🛑 Do NOT miss CVST in pregnancy or the postpartum period',
                body: 'Pregnancy and the postpartum period are major risk factors for CVST. A new headache in a postpartum patient — especially with any focal symptoms, seizure, or altered mental status — requires venous imaging. LMWH is the anticoagulant of choice in pregnancy and lactation. [See pregnancy node](#/node/cvst-pregnancy).',
            },
            {
                heading: '🛑 Do NOT dismiss seizures as unrelated in CVST',
                body: 'Seizures occur in up to 40% of CVST patients and are often the presenting symptom. They require prompt antiseizure medication and should trigger evaluation for CVST when the cause is not immediately apparent. [See seizure management node](#/node/cvst-seizure-management).',
            },
        ],
        citations: [],
    },
};
