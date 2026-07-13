// MedKitt — Seizure Hub (EM canonical + Neurology cross-list, type: 'hub')
//
// 5-Module skeleton per ~/Desktop/claude-brain/patterns/hub-consult-pattern.md v2:
//   1. Sick Check
//   2. Time-Critical Exclusions (branches -> deep-dive consults)
//   3. Initial Bundle + Reassess
//   4. Imaging / Workup Decision
//   5. Disposition
//
// CROSS-LINK DIRECTIONALITY (R8): hub links INTO splits; splits never link back.
// All outbound #/tree/ targets validated against the repo on 2026-07-12.
export const SEIZURE_HUB_NODES = [
    // ============================================================
    // Module 1 — Sick Check
    // ============================================================
    {
        id: 'sz-start',
        type: 'info',
        module: 1,
        title: 'Seizure Hub — Is This Still Seizing?',
        body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Status epilepticus** \u2014 seizing \u22655 min OR back-to-back without recovery. Treat NOW, do not wait.\n2. **Hypoglycemia** \u2014 check a glucose on EVERY seizing patient before anything else.\n3. **Eclampsia** \u2014 pregnant or postpartum (up to 6 weeks) + seizure = magnesium, not just benzos.\n4. **Intracranial catastrophe** \u2014 SAH, ICH, CVST, herpes encephalitis, mass presenting as first seizure.\n5. **Toxic / metabolic** \u2014 hyponatremia, TCA/INH/bupropion overdose, alcohol withdrawal, serotonin syndrome.\n\n**First 60 seconds \u2014 is the patient actively convulsing?**\n- **YES, still seizing:** this is (or is becoming) status epilepticus. Go straight to [Status Epilepticus](#/tree/status-epilepticus). Point-of-care glucose, IV access, benzo NOW (do not wait for the 5-minute clock if convulsing on arrival).\n- **NO, postictal or recovered:** sort sick vs not-sick, then work the cause below.\n\n**Scan in 30 seconds:** [1]\n- **Airway** \u2014 postictal patients obstruct; position, suction, jaw thrust, NPA. Do NOT reflexively intubate a self-resolving seizure.\n- **Glucose** \u2014 fingerstick on EVERYONE. Hypoglycemia is the fastest reversible cause. [Hypoglycemia](#/tree/hypoglycemia)\n- **Vitals** \u2014 fever (CNS infection, serotonin syndrome, sympathomimetic), hypertension (eclampsia, PRES, ICH), hypoxia, temp.\n- **Pregnancy** \u2014 any reproductive-age female: could this be [Eclampsia](#/tree/eclampsia)? Magnesium is the drug.\n- **Trauma** \u2014 tongue laceration, posterior shoulder dislocation, head strike from the fall.\n- **Pupils / focal deficit** \u2014 asymmetry points to structural cause.\n\n**The 4 questions that change everything:** [1,2]\n1. **Known epileptic or first-ever seizure?** (first seizure = broad workup + imaging)\n2. **Pregnant / recently postpartum?** (eclampsia until proven otherwise)\n3. **Alcohol, drugs, or missed anti-seizure meds?** (withdrawal, tox, non-adherence)\n4. **Did they fully return to baseline?** (persistent altered = ongoing (non-convulsive) status, structural, or infectious)',
        citation: [1, 2],
        next: 'sz-exclusions',
        summary: 'Still seizing = status, go now. Glucose on everyone. Pregnant = eclampsia. Airway-position the postictal patient; do not reflexively intubate a self-resolving seizure.',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 2 — Time-Critical Exclusions
    // ============================================================
    {
        id: 'sz-exclusions',
        type: 'question',
        module: 2,
        title: 'Time-Critical Exclusions — Pick the One That Fits',
        body: 'Each branch routes to a deep-dive and tells you the next action while you transition.',
        options: [
            {
                label: 'Still convulsing \u22655 min OR recurrent without recovery',
                description: 'Status epilepticus \u2014 benzo NOW, then load AED',
                next: 'sz-exc-status',
                urgency: 'critical',
            },
            {
                label: 'Glucose low on fingerstick',
                description: 'Hypoglycemia \u2014 D10/D50 or glucagon immediately',
                next: 'sz-exc-hypoglycemia',
                urgency: 'critical',
            },
            {
                label: 'Pregnant or postpartum (up to 6 weeks) + seizure/hypertension',
                description: 'Eclampsia \u2014 magnesium sulfate, not just a benzo',
                next: 'sz-exc-eclampsia',
                urgency: 'critical',
            },
            {
                label: 'Thunderclap headache, focal deficit, or sudden severe headache before seizure',
                description: 'SAH / ICH / CVST / mass \u2014 emergent non-contrast CT head',
                next: 'sz-exc-structural',
                urgency: 'critical',
            },
            {
                label: 'Fever + headache / neck stiffness / altered mentation',
                description: 'CNS infection \u2014 meningitis / HSV encephalitis; abx + acyclovir, LP',
                next: 'sz-exc-cns-infection',
                urgency: 'critical',
            },
            {
                label: 'Overdose, TCA/INH/bupropion, or serotonergic drugs',
                description: 'Toxic seizure \u2014 targeted antidote (bicarb, pyridoxine, cooling)',
                next: 'sz-exc-tox',
                urgency: 'critical',
            },
            {
                label: 'Alcohol history + tremor / tachycardia / last drink 6-48 h ago',
                description: 'Alcohol withdrawal seizure \u2014 benzos, screen for other causes',
                next: 'sz-exc-etoh',
                urgency: 'urgent',
            },
            {
                label: 'Known low sodium, marathon, psychogenic polydipsia, recent diuretic',
                description: 'Hyponatremic seizure \u2014 hypertonic saline, not free water',
                next: 'sz-exc-sodium',
                urgency: 'critical',
            },
            {
                label: 'Non-physiologic features: eyes forced shut, pelvic thrust, no postictal, retained awareness',
                description: 'Consider PNES \u2014 but exclude true seizure and hypoglycemia first',
                next: 'sz-exc-pnes',
            },
            {
                label: 'None of the above \u2014 recovered first or breakthrough seizure, stable',
                description: 'Initial bundle + workup for undifferentiated seizure',
                next: 'sz-rescue',
            },
        ],
        citation: [1, 2, 3],
        summary: 'Pick the most acute hit. Each branch links to its deep-dive + the next action.',
        safetyLevel: 'critical',
    },
    // -------- Time-critical exclusion branch results --------
    {
        id: 'sz-exc-status',
        type: 'result',
        module: 2,
        title: 'Status Epilepticus — Treat the Clock',
        body: 'Open [Status Epilepticus](#/tree/status-epilepticus) for the full timed algorithm (benzo \u2192 second-line AED \u2192 anesthetic infusion \u2192 refractory pathway).\n\n**Definition:** \u22655 min of continuous convulsive activity OR \u22652 seizures without return to baseline between them. Do NOT wait for a "classic" 30-minute definition \u2014 neuronal injury and pharmacoresistance start early. [3]\n\n**Next 5 minutes:**\n- **Benzodiazepine at a REAL dose NOW** \u2014 the most common error is underdosing: lorazepam 0.1 mg/kg IV (usually 4 mg, may repeat once) OR midazolam 10 mg IM/IN if no IV OR diazepam 0.15-0.2 mg/kg IV.\n- Point-of-care glucose; give dextrose if low, thiamine 100-500 mg IV if alcohol/malnourished.\n- IV \u00d7 2, monitor, airway kit at bedside.\n- **Second-line AED right after the benzo (do not wait to see if it works):** levetiracetam 60 mg/kg (max 4.5 g) OR fosphenytoin 20 mg PE/kg OR valproate 40 mg/kg.\n- Labs: CMP, magnesium, calcium, AED levels, tox screen, \u03b2-hCG, lactate, VBG.\n- If still seizing after benzo + second-line \u2192 refractory status: intubate + anesthetic infusion (propofol / midazolam / ketamine), continuous EEG.\n\n\ud83d\uded1 Do NOT underdose the benzo. \ud83d\uded1 Do NOT paralyze for intubation without a plan for continuous EEG \u2014 paralysis masks ongoing electrical seizure.',
        recommendation: 'Full-dose benzo NOW, second-line AED immediately after (do not wait). Glucose + thiamine. If refractory: intubate, anesthetic infusion, continuous EEG.',
        confidence: 'definitive',
        citation: [3],
        safetyLevel: 'critical',
    },
    {
        id: 'sz-exc-hypoglycemia',
        type: 'result',
        module: 2,
        title: 'Hypoglycemic Seizure — Fastest Reversible Cause',
        body: 'Open [Hypoglycemia](#/tree/hypoglycemia) for the full workup (etiology, sulfonylurea/octreotide pathway, refractory management).\n\n**Every seizing patient gets a fingerstick.** A hypoglycemic seizure stops when the sugar is corrected \u2014 do not keep escalating anti-seizure meds against a glucose of 30. [4]\n\n**Next 5 minutes:**\n- **IV access + D10 or D50:** adults 25 g dextrose IV (50 mL D50 or 250 mL D10); repeat glucose in 15 min.\n- **No IV?** glucagon 1 mg IM/IN (slower, ineffective in glycogen-depleted / alcoholic patients \u2014 get IV access).\n- **Thiamine 100 mg IV** before or with dextrose in alcoholic/malnourished patients.\n- Recheck glucose, then start a dextrose infusion if the cause persists (esp. sulfonylurea \u2014 add octreotide, admit).\n- Look for the cause: insulin, sulfonylurea, sepsis, adrenal insufficiency, liver failure, missed meals on diabetic meds.\n\n\ud83d\uded1 A single dextrose bolus is not definitive for sulfonylurea or long-acting insulin \u2014 these rebound. Admit and treat the source.',
        recommendation: 'Dextrose IV now, recheck at 15 min. Thiamine if alcoholic/malnourished. Hunt the cause; sulfonylurea/long-acting insulin needs infusion + admission.',
        confidence: 'definitive',
        citation: [4],
        safetyLevel: 'critical',
    },
    {
        id: 'sz-exc-eclampsia',
        type: 'result',
        module: 2,
        title: 'Eclampsia — Magnesium, Not Just a Benzo',
        body: 'Open [Eclampsia](#/tree/eclampsia) for the full obstetric pathway (magnesium dosing, BP control, delivery planning, HELLP).\n\n**Any seizure in pregnancy or up to 6 weeks postpartum is eclampsia until proven otherwise \u2014 even without a documented history of preeclampsia and even with a normal-appearing BP.** [5]\n\n**Next 5 minutes:**\n- **Magnesium sulfate 4-6 g IV over 15-20 min, then 1-2 g/h infusion.** This is the anticonvulsant of choice \u2014 benzos are adjunct only.\n- IV \u00d7 2, monitor, left lateral tilt, oxygen, glucose.\n- **BP control** if SBP \u2265160 or DBP \u2265110: IV labetalol or hydralazine, or oral nifedipine (goal ~140-150/90-100, avoid precipitous drop).\n- OB consult emergently \u2014 definitive treatment is delivery.\n- Watch for magnesium toxicity: loss of reflexes, respiratory depression \u2014 antidote is calcium gluconate 1 g IV.\n- If refractory to magnesium, reconsider structural cause (CVST, ICH, PRES) and image.\n\n\ud83d\uded1 Do NOT anchor on \u201cno preeclampsia history\u201d \u2014 eclampsia can be the first presentation. \ud83d\uded1 Postpartum eclampsia (up to 6 weeks) is easy to miss.',
        recommendation: 'Magnesium sulfate is the drug (4-6 g load, then 1-2 g/h). Control severe BP. Emergent OB consult \u2014 delivery is definitive. Calcium gluconate for Mg toxicity.',
        confidence: 'definitive',
        citation: [5],
        safetyLevel: 'critical',
    },
    {
        id: 'sz-exc-structural',
        type: 'result',
        module: 2,
        title: 'Structural Catastrophe — Image the Brain',
        body: 'Seizure with thunderclap headache, focal deficit, persistent altered mentation, or trauma = structural cause until imaged.\n\n**The candidates and their consults:**\n- **[Subarachnoid Hemorrhage](#/tree/sah)** \u2014 worst-headache-of-life before the seizure; non-contrast CT, LP if CT negative and within window.\n- **[Intracerebral Hemorrhage](#/tree/ich)** \u2014 focal deficit + hypertension; reverse anticoagulation, BP control.\n- **[Cerebral Venous Sinus Thrombosis](#/tree/cvst)** \u2014 headache + seizure + risk factors (pregnancy/postpartum, OCP, thrombophilia); CT/MR venogram, anticoagulate.\n- **[Acute Stroke](#/tree/stroke)** \u2014 seizure can be a stroke presentation; do not let it delay the stroke pathway if a deficit persists.\n- **Mass / tumor / abscess** \u2014 first seizure with focal features; contrast imaging, neurosurgery.\n\n**Next 5 minutes:**\n- **Emergent non-contrast CT head** for everyone in this branch; add CTA/CTV or MRI/MRV per suspicion.\n- IV access, monitor, treat the seizure (benzo) while arranging imaging.\n- BP management is diagnosis-specific \u2014 do not lower aggressively in ischemic stroke; do control in ICH/SAH.\n- Reverse anticoagulation if hemorrhage confirmed \u2014 see [Anticoagulation Reversal](#/tree/anticoag-reversal).\n- Neurosurgery / neurology consult early.\n\n\ud83d\uded1 A first seizure with a persistent focal deficit or failure to return to baseline is NOT \u201cjust postictal Todd\u2019s paralysis\u201d until you have imaged.',
        recommendation: 'Emergent non-contrast CT head; add CTV/MRV for CVST, CTA for SAH/dissection. Diagnosis-specific BP control. Reverse anticoag if bleed. Early neuro/neurosurgery consult.',
        confidence: 'definitive',
        citation: [2, 6],
        safetyLevel: 'critical',
    },
    {
        id: 'sz-exc-cns-infection',
        type: 'result',
        module: 2,
        title: 'CNS Infection — Do Not Delay Acyclovir',
        body: 'Fever + seizure + headache/neck stiffness/altered mentation = CNS infection until excluded.\n\n**Open [Meningitis](#/tree/meningitis)** for the antibiotic + steroid + LP pathway.\n\n**Next 5 minutes:** [7]\n- **Empiric antibiotics WITHIN 1 HOUR \u2014 do not wait for the LP or CT:** ceftriaxone 2 g IV + vancomycin; add ampicillin if age >50, immunocompromised, or pregnant (Listeria).\n- **Add IV acyclovir 10 mg/kg** if any concern for HSV encephalitis (temporal lobe seizure, personality change, focal features) \u2014 the cost of delay is permanent injury.\n- **Dexamethasone 0.15 mg/kg** before/with the first antibiotic dose if bacterial meningitis suspected.\n- CT head before LP if focal deficit, immunocompromised, papilledema, or persistent altered mentation \u2014 but antibiotics/acyclovir come FIRST, before the CT.\n- LP: cell count, glucose, protein, Gram stain, culture, HSV PCR, opening pressure.\n- Blood cultures \u00d7 2, CBC, CMP, lactate, coags.\n\n\ud83d\uded1 Do NOT delay antibiotics or acyclovir for imaging or LP. \ud83d\uded1 HSV encephalitis is the classic \u201cmissed\u201d febrile seizure in an adult \u2014 empiric acyclovir is cheap insurance.',
        recommendation: 'Antibiotics within 1 h + acyclovir if any HSV concern \u2014 BEFORE CT/LP. Dexamethasone if bacterial. LP when safe. Do not delay drugs for imaging.',
        confidence: 'definitive',
        citation: [7],
        safetyLevel: 'critical',
    },
    {
        id: 'sz-exc-tox',
        type: 'result',
        module: 2,
        title: 'Toxic Seizure — Targeted Antidote',
        body: 'Drug-induced seizures often do not respond to standard AEDs \u2014 they need the antidote and are frequently refractory to phenytoin (avoid phenytoin in tox seizures; it can worsen sodium-channel toxicity).\n\n**Recognize the pattern and open the consult:**\n- **TCA / sodium-channel blocker** \u2014 wide QRS + seizure + hypotension: [TCA Toxidrome](#/tree/tca-toxidrome). Give **sodium bicarbonate** boluses; benzos for seizure.\n- **Isoniazid (INH)** \u2014 refractory seizures: **pyridoxine (vitamin B6) gram-for-gram** of INH ingested (empiric 5 g if unknown).\n- **Bupropion / sympathomimetics / cocaine** \u2014 benzos first-line, cooling, fluids.\n- **Serotonin syndrome** \u2014 hyperthermia + clonus + rigidity: [Serotonin Syndrome](#/tree/serotonin-syndrome). Benzos, aggressive cooling, cyproheptadine.\n- **Toxic alcohols** \u2014 [Toxic Alcohols](#/tree/toxic-alcohols) if anion-gap acidosis + osmolar gap.\n- **Local anesthetic systemic toxicity (LAST)** \u2014 IV lipid emulsion.\n\n**General measures:**\n- Benzodiazepines are the universal first-line for tox-induced seizures.\n- IV, monitor, glucose, temperature, ECG (QRS/QT).\n- Call Poison Control; consider the antidote early.\n\n\ud83d\uded1 Avoid phenytoin/fosphenytoin in suspected tox seizures \u2014 benzos + antidote are the pathway. \ud83d\uded1 A wide QRS after a seizure is sodium-channel blockade until proven otherwise \u2014 give bicarb.',
        recommendation: 'Benzos first-line + specific antidote (bicarb for TCA/wide-QRS, pyridoxine for INH, cyproheptadine + cooling for serotonin syndrome). Avoid phenytoin. Call Poison Control.',
        confidence: 'definitive',
        citation: [2, 8],
        safetyLevel: 'critical',
    },
    {
        id: 'sz-exc-etoh',
        type: 'result',
        module: 2,
        title: 'Alcohol Withdrawal Seizure',
        body: 'Open [Alcohol Withdrawal](#/tree/alcohol-withdrawal) for the full CIWA / benzodiazepine / phenobarbital pathway.\n\n**Typical pattern:** generalized tonic-clonic seizure 6-48 h after the last drink, often in the first 24 h, usually 1-2 brief seizures (\u201crum fits\u201d). But do NOT reflexively attribute every seizure in a drinker to withdrawal. [9]\n\n**Next 5 minutes:**\n- **Benzodiazepines** are the treatment and prevent recurrence: lorazepam or diazepam IV, titrated.\n- **Thiamine 100 mg IV** before glucose (Wernicke prevention); replace magnesium and potassium.\n- Check glucose \u2014 alcoholics are also hypoglycemic.\n- **Phenytoin does NOT prevent alcohol-withdrawal seizures** \u2014 do not reach for it.\n- Screen hard for competing causes: head trauma (subdural from a fall), CNS infection, hyponatremia, hypoglycemia, missed epilepsy meds. A drinker with a first-ever seizure or focal features still needs imaging.\n- Watch for progression to delirium tremens (autonomic instability, hallucinations) \u2014 escalate to phenobarbital / high-dose benzos.\n\n\ud83d\uded1 First seizure or focal features in a drinker still gets imaging \u2014 do not anchor on \u201cwithdrawal.\u201d \ud83d\uded1 Give thiamine before dextrose.',
        recommendation: 'Benzos treat and prevent recurrence; thiamine before glucose; replace Mg/K. Phenytoin does not work here. Image if first-ever or focal. Watch for DTs.',
        confidence: 'recommended',
        citation: [9],
        safetyLevel: 'warning',
    },
    {
        id: 'sz-exc-sodium',
        type: 'result',
        module: 2,
        title: 'Hyponatremic Seizure — Hypertonic Saline',
        body: 'Open [Sodium Disorders](#/tree/sodium) for the full correction-rate and etiology pathway.\n\n**A seizure from hyponatremia is a neurologic emergency and one of the few indications for rapid, deliberate sodium correction.** [10]\n\n**Next 5 minutes:**\n- **Hypertonic saline (3%): 100-150 mL IV bolus over 10 min, may repeat \u00d7 1-2** to raise sodium ~4-6 mmol/L acutely and stop the seizure. Do NOT give free water or hypotonic fluids.\n- Benzodiazepine as adjunct for the active seizure.\n- Send a serum sodium, paired serum + urine osmolality, and urine sodium to sort the cause (SIADH, marathon/exercise-associated, psychogenic polydipsia, thiazide, adrenal, hypothyroid).\n- **After the emergency bolus, cap total correction at ~6-8 mmol/L per 24 h** to avoid osmotic demyelination \u2014 recheck sodium q2h.\n- Admit; involve nephrology/ICU for ongoing correction.\n\n\ud83d\uded1 Treat the SEIZURE with hypertonic saline, but then throttle back \u2014 overcorrection causes osmotic demyelination. \ud83d\uded1 Do NOT give normal maintenance fluids blindly; check the sodium first.',
        recommendation: '3% saline 100-150 mL bolus to break the seizure (may repeat), then cap correction at 6-8 mmol/L/24 h. Recheck Na q2h. Send osmolalities + urine Na. Admit.',
        confidence: 'definitive',
        citation: [10],
        safetyLevel: 'critical',
    },
    {
        id: 'sz-exc-pnes',
        type: 'result',
        module: 2,
        title: 'Consider PNES — But Exclude Real Seizure First',
        body: 'Open [Psychogenic Non-Epileptic Seizures](#/tree/pnes) for the differentiation and management pathway.\n\n**PNES is a diagnosis of caution in the ED, not a snap judgment.** Features that SUGGEST (but never prove) PNES: gradual onset/offset, side-to-side head shaking, forced eye closure with resistance to opening, pelvic thrusting, asynchronous limb movements, retained awareness during bilateral movements, prolonged duration with preserved oxygenation, rapid reorientation without a postictal phase, ictal crying. [11]\n\n**Before you commit:**\n- **Check a glucose and full vitals \u2014 hypoglycemia and true seizure come first, always.**\n- A raised lactate and a true postictal period point toward an epileptic seizure; a normal lactate is suggestive but not diagnostic of PNES.\n- Frontal-lobe epilepsy can mimic PNES (bizarre movements, retained awareness) \u2014 do not dismiss.\n- The definitive diagnosis is video-EEG, not the ED exam.\n\n**Management:**\n- Do NOT escalate benzos/AEDs indefinitely against a non-epileptic event \u2014 that risks iatrogenic sedation and intubation.\n- Compassionate, non-confrontational communication; avoid the word \u201cfaking.\u201d\n- Neurology referral for outpatient video-EEG; screen for psychiatric comorbidity.\n\n\ud83d\uded1 Never label PNES without checking glucose and excluding true status \u2014 the cost of a missed real seizure is far higher than a missed PNES.',
        recommendation: 'Suggestive features only \u2014 confirm glucose and exclude true seizure/status first. Avoid escalating sedation. Non-confrontational communication; neurology for video-EEG.',
        confidence: 'recommended',
        citation: [11],
        safetyLevel: 'warning',
    },
    // ============================================================
    // Module 3 — Initial Bundle + Reassess
    // ============================================================
    {
        id: 'sz-rescue',
        type: 'info',
        module: 3,
        title: 'Initial Bundle — Recovered or Breakthrough Seizure',
        body: 'No active seizing, no immediate life-threat hit. Standard ED bundle while you determine first-vs-breakthrough and hunt the trigger: [1,2]\n\n**THE BUNDLE:**\n- **IV access, monitor, continuous SpO2.** Position for airway protection until fully alert.\n- **Point-of-care glucose** (again, if not already) \u2014 the single most important test.\n- **Focused labs:** CMP (sodium, calcium, magnesium, BUN/Cr, glucose), CBC, \u03b2-hCG (every reproductive-age female), lactate (a raised lactate that clears supports a true generalized seizure), AED levels if known epileptic, tox screen if indicated, VBG.\n- **ECG** \u2014 look for long QT (syncope-mimicking-seizure, drug effect), Brugada, ischemia.\n- **Thiamine + treat any electrolyte deficit found.**\n- **Injury survey:** posterior shoulder dislocation, tongue/cheek laceration, head/C-spine from the fall, aspiration.\n- **Medication history:** missed doses, new interacting drug, recent AED change \u2014 the most common reason a known epileptic breaks through.\n\n**Reassess:** did they return to baseline? Persistent altered mentation \u2192 consider non-convulsive status (get EEG) or a structural/infectious cause and re-enter the exclusions.',
        citation: [1, 2],
        next: 'sz-rescue-reassess',
        summary: 'IV + glucose + focused labs (Na/Ca/Mg, hCG, lactate, AED levels) + ECG + thiamine + injury survey. Persistent altered = suspect non-convulsive status or structural cause.',
        safetyLevel: 'warning',
    },
    {
        id: 'sz-rescue-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess — Back to Baseline?',
        body: 'Re-examine: mental status, focal deficit, vitals, lab results, whether this is a first or breakthrough seizure.',
        options: [
            {
                label: 'Fully recovered, known epileptic, single breakthrough, benign workup',
                description: 'Likely subtherapeutic AED or missed dose \u2014 discharge pathway',
                next: 'sz-dispo-discharge',
            },
            {
                label: 'First-ever seizure, now recovered, no clear reversible cause',
                description: 'Needs imaging + workup before disposition',
                next: 'sz-imaging',
                urgency: 'urgent',
            },
            {
                label: 'Persistent altered mentation or new focal deficit',
                description: 'STOP \u2014 non-convulsive status or structural/infectious cause; re-enter exclusions',
                next: 'sz-exclusions',
                urgency: 'critical',
            },
            {
                label: 'Reversible cause identified and corrected (glucose, sodium, drug)',
                description: 'Treat the cause; disposition follows that pathway',
                next: 'sz-dispo',
            },
        ],
        citation: [1, 2],
        summary: 'Recovered known epileptic \u2192 discharge. First seizure \u2192 image + workup. Persistent altered/focal \u2192 STOP, re-enter exclusions (non-convulsive status).',
    },
    // ============================================================
    // Module 4 — Imaging / Workup Decision
    // ============================================================
    {
        id: 'sz-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging & Workup Decision',
        body: 'Not every seizure needs a scan, but a first seizure and any red flag do. [2,12]\n\n**Emergent non-contrast CT head in the ED if ANY of:**\n- First-ever seizure (ACEP Level B \u2014 image first seizures)\n- New focal deficit or failure to return to baseline\n- Persistent altered mentation\n- Head trauma / fall with the seizure\n- Anticoagulated or bleeding risk\n- Immunocompromised (HIV, transplant, malignancy)\n- Fever with concern for CNS lesion/abscess\n- Age >40 with new seizure, or known malignancy\n- Suspected SAH/CVST \u2192 add CTA/CTV\n\n**Outpatient MRI (higher yield than CT for epileptogenic lesions) is appropriate when:**\n- First unprovoked seizure, now at baseline, normal CT, reliable follow-up \u2014 MRI + outpatient EEG + neurology within days\n\n**Lumbar puncture if:**\n- Fever + seizure, immunocompromised, persistent altered mentation, or concern for SAH with negative CT (after CT clears mass effect)\n\n**Labs to complete the first-seizure workup:**\n- CMP, calcium, magnesium, glucose, \u03b2-hCG, tox screen, prolactin is NOT reliable in the ED\n- AED levels if on therapy\n\n**Do NOT routinely need emergent imaging:**\n- Known epileptic with a typical breakthrough seizure, back to baseline, benign exam, identified trigger (missed dose, illness) \u2014 unless a red flag is present.',
        citation: [2, 12],
        next: 'sz-dispo',
        summary: 'Emergent CT for first seizure, focal deficit, persistent altered, trauma, anticoag, immunocompromised, age >40. Add CTV/CTA per suspicion. Outpatient MRI + EEG + neuro for a resolved first seizure.',
    },
    // ============================================================
    // Module 5 — Disposition
    // ============================================================
    {
        id: 'sz-dispo',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Match disposition to the cause and the recovery. Defer to the deep-dive consult when a specific diagnosis is committed.',
        options: [
            {
                label: 'Discharge \u2014 known epileptic, breakthrough, at baseline, benign workup',
                description: 'AED adjustment + neurology follow-up + return precautions',
                next: 'sz-dispo-discharge',
            },
            {
                label: 'Observe \u2014 first seizure resolved, workup pending, or borderline social/safety',
                description: 'ED obs / short stay for monitoring + workup completion',
                next: 'sz-dispo-observe',
                urgency: 'urgent',
            },
            {
                label: 'Admit \u2014 status, structural/infectious cause, refractory, unresolved altered',
                description: 'Admit per the deep-dive consult criteria; ICU if status/airway',
                next: 'sz-dispo-admit',
                urgency: 'critical',
            },
        ],
        citation: [1, 2],
        summary: 'Discharge a recovered known epileptic; observe a resolved first seizure with pending workup; admit status / structural / infectious / refractory.',
    },
    {
        id: 'sz-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge — Known Epileptic / Provoked & Corrected',
        body: 'Safe discharge criteria: [2]\n\n1. **Returned fully to baseline** mental status and neuro exam.\n2. **Known cause** \u2014 subtherapeutic AED / missed dose, or a provoked seizure whose trigger is corrected (glucose, sodium, fever source treated).\n3. **Benign workup** \u2014 normal glucose/electrolytes, no red flags, imaging (if indicated) unremarkable.\n4. **AED plan** \u2014 restart / adjust dose; if new AED started, coordinate with neurology.\n5. **Reliable follow-up** \u2014 neurology appointment arranged, not just recommended.\n\n**Written return precautions:**\n- Recurrent or prolonged seizure (\u22655 min \u2014 call 911), cluster without recovery\n- New weakness, confusion that does not clear, severe/worst headache, fever, stiff neck\n- Injury from a fall, chest pain, trouble breathing\n\n**Driving & safety counseling (document it):**\n- State-specific driving restriction after a seizure \u2014 advise not to drive and to check local law.\n- Avoid heights, swimming alone, operating dangerous machinery, unsupervised bathing until cleared.\n- Medication adherence; avoid triggers (sleep deprivation, alcohol, missed doses).\n\n**Do NOT discharge if:** first-ever seizure without completed imaging/plan, any persistent deficit, unreliable follow-up, high-risk social situation, or an uncorrected provoking cause.',
        recommendation: 'Discharge only if at baseline, cause known/corrected, workup benign, AED plan set, neurology follow-up arranged. Document driving/safety counseling and return precautions.',
        confidence: 'definitive',
        citation: [2],
    },
    {
        id: 'sz-dispo-observe',
        type: 'result',
        module: 5,
        title: 'Observe — Resolved First Seizure / Pending Workup',
        body: 'ED observation / short-stay appropriate when: [2,12]\n\n- First unprovoked seizure, now at baseline, normal CT, but MRI/EEG/neurology not yet completed and same-day outpatient arrangement is not feasible\n- Provoked seizure whose cause needs a few hours of monitoring (electrolyte correction, resolving intoxication, fever workup)\n- Borderline social/safety situation preventing safe discharge\n- Recurrent seizures in the ED that then settle, requiring a window of observation\n\n**Observation protocol:**\n- Continuous monitoring, seizure precautions (padded rails, suction, airway kit)\n- Serial neuro exams; recheck electrolytes/glucose as indicated\n- Complete the workup (labs, imaging, arrange EEG)\n- Neurology consult for AED decisions\n- Escalate to admission if: another seizure, failure to return to baseline, new deficit, or an unresolved dangerous cause emerges\n\n**Discharge from observation** once at baseline, workup complete or safely deferred to arranged outpatient follow-up, AED plan set, and safety counseling documented.',
        recommendation: 'Obs/short-stay with seizure precautions + serial neuro exams; complete workup and arrange EEG/neurology. Escalate to admit for recurrence or persistent deficit.',
        confidence: 'recommended',
        citation: [12],
    },
    {
        id: 'sz-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit',
        body: 'Admit when: [2,3]\n\n- **Status epilepticus** (any) \u2014 ICU if refractory, intubated, or on anesthetic infusion; continuous EEG.\n- **Structural cause** \u2014 SAH, ICH, CVST, stroke, mass, abscess (neuro/neurosurgery service).\n- **CNS infection** \u2014 meningitis / encephalitis on antibiotics + acyclovir.\n- **Eclampsia** \u2014 OB service, magnesium infusion, delivery planning.\n- **Refractory metabolic cause** \u2014 sulfonylurea/long-acting insulin hypoglycemia, severe hyponatremia needing controlled correction.\n- **Failure to return to baseline** or persistent focal deficit \u2014 rule out non-convulsive status with EEG.\n- **Recurrent seizures** in the ED, or breakthrough not controllable with simple AED adjustment.\n- **High-risk comorbidity** \u2014 pregnancy, immunocompromise, anticoagulation with intracranial concern.\n\n**Service selection:**\n- **ICU:** status epilepticus, intubated, anesthetic infusion, hemodynamic instability.\n- **Neurology:** first seizure needing inpatient EEG/MRI, breakthrough workup, non-convulsive status.\n- **Neurosurgery:** structural hemorrhage/mass requiring intervention.\n- **OB:** eclampsia.\n- **Medicine/ICU:** refractory metabolic/toxic causes.\n\n**Handoff content:** onset/duration, still-seizing vs resolved, drugs given (benzo dose + time, AED loaded), glucose/electrolytes, imaging + findings, pregnancy status, airway status, continuous-EEG plan.',
        recommendation: 'Admit status, structural/infectious cause, eclampsia, refractory metabolic cause, or persistent altered/focal exam. ICU for status/airway; EEG to exclude non-convulsive status.',
        confidence: 'recommended',
        citation: [3],
        safetyLevel: 'warning',
    },
];
export const SEIZURE_HUB_CRITICAL_ACTIONS = [
    { text: 'Still convulsing on arrival or \u22655 min = status epilepticus \u2014 full-dose benzo NOW, do not wait for the clock.', nodeId: 'sz-exc-status' },
    { text: 'Point-of-care glucose on EVERY seizing patient before anything else; treat hypoglycemia immediately.', nodeId: 'sz-exc-hypoglycemia' },
    { text: 'Seizure in pregnancy or up to 6 weeks postpartum = eclampsia; magnesium sulfate is the drug, not just a benzo.', nodeId: 'sz-exc-eclampsia' },
    { text: 'Thunderclap headache / focal deficit / persistent altered = structural catastrophe \u2014 emergent non-contrast CT head.', nodeId: 'sz-exc-structural' },
    { text: 'Fever + seizure = antibiotics within 1 h + acyclovir if any HSV concern, BEFORE CT/LP.', nodeId: 'sz-exc-cns-infection' },
    { text: 'Tox seizure: benzos + specific antidote (bicarb for TCA/wide-QRS, pyridoxine for INH). Avoid phenytoin.', nodeId: 'sz-exc-tox' },
    { text: 'Hyponatremic seizure: 3% saline 100-150 mL bolus to break it, then cap correction at 6-8 mmol/L/24 h.', nodeId: 'sz-exc-sodium' },
    { text: 'Never label PNES without checking glucose and excluding true status first.', nodeId: 'sz-exc-pnes' },
    { text: 'Initial bundle: IV + glucose + Na/Ca/Mg + hCG + lactate + AED levels + ECG + injury survey.', nodeId: 'sz-rescue' },
    { text: 'Persistent altered mentation after a seizure = suspect non-convulsive status \u2014 get EEG, re-enter exclusions.', nodeId: 'sz-rescue-reassess' },
    { text: 'First-ever seizure gets emergent CT in the ED; resolved first seizure gets outpatient MRI + EEG + neurology.', nodeId: 'sz-imaging' },
    { text: 'Discharge only if at baseline, cause corrected, workup benign, AED plan set, neurology follow-up, driving/safety counseled.', nodeId: 'sz-dispo-discharge' },
];
export const SEIZURE_HUB_CITATIONS = [
    { num: 1, text: 'Huff JS, Melnick ER, Tomaszewski CA, et al. Clinical policy: critical issues in the evaluation and management of adult patients presenting to the emergency department with seizures. Ann Emerg Med. 2014;63(4):437-447.' },
    { num: 2, text: 'American College of Emergency Physicians Clinical Policies Subcommittee. Clinical Policy: Adult Patients Presenting to the ED With Seizures (2024 update). Ann Emerg Med. 2024.' },
    { num: 3, text: 'Glauser T, Shinnar S, Gloss D, et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults. Epilepsy Curr. 2016;16(1):48-61.' },
    { num: 4, text: 'Cryer PE, Axelrod L, Grossman AB, et al. Evaluation and management of adult hypoglycemic disorders: an Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab. 2009;94(3):709-728.' },
    { num: 5, text: 'American College of Obstetricians and Gynecologists. Gestational Hypertension and Preeclampsia: ACOG Practice Bulletin No. 222. Obstet Gynecol. 2020;135(6):e237-e260.' },
    { num: 6, text: 'Connolly ES, Rabinstein AA, Carhuapoma JR, et al. Guidelines for the Management of Aneurysmal Subarachnoid Hemorrhage. Stroke. 2012;43(6):1711-1737.' },
    { num: 7, text: 'Tunkel AR, Hartman BJ, Kaplan SL, et al. Practice guidelines for the management of bacterial meningitis. Clin Infect Dis. 2004;39(9):1267-1284.' },
    { num: 8, text: 'Chen HY, Albertson TE, Olson KR. Treatment of drug-induced seizures. Br J Clin Pharmacol. 2016;81(3):412-419.' },
    { num: 9, text: 'Rogawski MA. Update on the neurobiology of alcohol withdrawal seizures. Epilepsy Curr. 2005;5(6):225-230.' },
    { num: 10, text: 'Spasovski G, Vanholder R, Allolio B, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia. Nephrol Dial Transplant. 2014;29(Suppl 2):i1-i39.' },
    { num: 11, text: 'LaFrance WC, Baker GA, Duncan R, et al. Minimum requirements for the diagnosis of psychogenic nonepileptic seizures. Epilepsia. 2013;54(11):2005-2018.' },
    { num: 12, text: 'Krumholz A, Wiebe S, Gronseth GS, et al. Evidence-based guideline: Management of an unprovoked first seizure in adults. Neurology. 2015;84(16):1705-1713.' },
];
export const SEIZURE_HUB_NODE_COUNT = SEIZURE_HUB_NODES.length;
export const SEIZURE_HUB_MODULE_LABELS = [
    'Sick Check',
    'Time-Critical Exclusions',
    'Initial Bundle + Reassess',
    'Imaging & Workup',
    'Disposition',
];
