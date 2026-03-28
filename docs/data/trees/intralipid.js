// MedKitt - Intralipid / Lipid Emulsion Therapy
// Comprehensive guide to ILE rescue therapy for LAST and lipophilic drug toxicity
// 5 modules: Overview -> Indications -> Dosing Protocol -> Monitoring & Endpoints -> Complications
// 21 nodes total.
export const INTRALIPID_NODES = [
    // =====================================================================
    // MODULE 1: OVERVIEW
    // =====================================================================
    {
        id: 'ile-start',
        type: 'info',
        module: 1,
        title: 'Lipid Emulsion Therapy',
        body: '[ILE Steps Summary](#/info/ile-summary) - quick reference.\n\n**Intravenous Lipid Emulsion (ILE)** is rescue therapy for local anesthetic systemic toxicity (LAST) and other lipophilic drug overdoses. [1][2]\n\n**Key points:**\n- Standard formulation: 20% [Lipid Emulsion](#/drug/lipid-emulsion/LAST)\n- Acts as a "lipid sink" absorbing lipophilic drugs from cardiac tissue\n- May have direct cardiotonic effects independent of drug sequestration [3]\n- ASRA recommended for LAST since 2010; endorsed by AHA 2023 [1][4]\n\n**When to use:**\n- Local anesthetic systemic toxicity (LAST) - any severity\n- Refractory lipophilic drug overdose (BB, CCB, TCAs)\n- Cardiac arrest from lipophilic agents unresponsive to ACLS\n\n**Critical concept:** ILE is NOT first-line for most overdoses. Use as adjunct when conventional therapy fails.',
        citation: [1, 2, 3, 4],
        calculatorLinks: [
            { id: 'ile-dosing', label: 'ILE Dose Calculator' },
        ],
        next: 'ile-mechanism',
    },
    {
        id: 'ile-mechanism',
        type: 'info',
        module: 1,
        title: 'Mechanism of Action',
        body: '**Three proposed mechanisms:** [3][5]\n\n**1. Lipid Sink (Partitioning)**\n- Lipid emulsion creates an expanded lipid compartment in plasma\n- Lipophilic drugs redistribute from tissues (heart, brain) into this compartment\n- Most supported for highly lipophilic agents (log P > 2): bupivacaine, amitriptyline, verapamil\n\n**2. Metabolic/Energetic Effect**\n- Provides fatty acids as alternative fuel source for myocardium\n- May restore mitochondrial function impaired by local anesthetics\n- Explains cardiotonic effects seen even without measurable drug sequestration\n\n**3. Direct Cardiotonic**\n- Increases intracellular calcium in cardiomyocytes\n- Independent positive inotropic effect\n- May work synergistically with catecholamines\n\n**Lipophilicity determines response:**\n| Drug | Log P | Expected ILE Response |\n|------|-------|----------------------|\n| Bupivacaine | 3.4 | Excellent |\n| Amitriptyline | 4.9 | Good |\n| Verapamil | 3.8 | Good |\n| Metoprolol | 1.9 | Modest |\n| Atenolol | 0.2 | Poor |',
        citation: [3, 5],
        next: 'ile-indications-question',
    },
    // =====================================================================
    // MODULE 2: INDICATIONS
    // =====================================================================
    {
        id: 'ile-indications-question',
        type: 'question',
        module: 2,
        title: 'Clinical Indication',
        body: '**Select the clinical scenario:**\n\nILE is indicated for LAST (primary indication) and considered for refractory lipophilic drug toxicity. [1][2][6]\n\n**LAST is the ONLY well-established indication with high-quality evidence.** Other uses are extrapolated from case reports and animal models.',
        citation: [1, 2, 6],
        options: [
            {
                label: 'Local Anesthetic Systemic Toxicity (LAST)',
                description: 'Seizures, arrhythmias, or cardiac arrest after LA injection',
                next: 'ile-last',
                urgency: 'critical',
            },
            {
                label: 'Calcium Channel Blocker Overdose',
                description: 'Refractory shock despite HIET and vasopressors',
                next: 'ile-ccb',
                urgency: 'urgent',
            },
            {
                label: 'Beta-Blocker Overdose',
                description: 'Refractory bradycardia/hypotension despite glucagon and HIET',
                next: 'ile-bb',
                urgency: 'urgent',
            },
            {
                label: 'TCA Overdose',
                description: 'Cardiac arrest or refractory arrhythmias despite bicarbonate',
                next: 'ile-tca',
                urgency: 'critical',
            },
            {
                label: 'Other Lipophilic Drug Toxicity',
                description: 'Diphenhydramine, bupropion, clomipramine, etc.',
                next: 'ile-other',
            },
        ],
    },
    {
        id: 'ile-last',
        type: 'info',
        module: 2,
        title: 'LAST - Local Anesthetic Systemic Toxicity',
        body: '**ILE is the standard of care for LAST** per ASRA and AHA guidelines. [1][4]\n\n**Recognition:**\n- **CNS toxicity (early):** Perioral numbness, metallic taste, tinnitus, agitation, confusion, seizures\n- **Cardiovascular toxicity:** Hypotension, bradycardia, wide QRS, VT/VF, asystole\n- May progress rapidly from CNS to CV collapse\n- Bupivacaine is most cardiotoxic; lidocaine has higher CNS:CV toxicity ratio\n\n**When to give ILE:**\n- **At first signs of severe toxicity:** Do NOT wait for cardiac arrest\n- Seizures refractory to benzodiazepines\n- Significant hemodynamic instability\n- Any cardiac arrhythmia\n- Cardiac arrest\n\n**ASRA checklist:** [1]\n1. Stop LA injection immediately\n2. Call for help and ILE\n3. Airway management (100% O2)\n4. [Midazolam](#/drug/midazolam/seizure) for seizures (avoid propofol initially)\n5. Begin ILE per protocol\n6. If arrest: start CPR, may need prolonged resuscitation\n\n[LAST Treatment Checklist](https://asra.com/docs/default-source/guidelines-articles/local-anesthetic-systemic-toxicity-rgb.pdf)',
        citation: [1, 4],
        next: 'ile-dosing-protocol',
    },
    {
        id: 'ile-ccb',
        type: 'info',
        module: 2,
        title: 'Calcium Channel Blocker Overdose',
        body: '**ILE for refractory CCB toxicity** - use AFTER standard therapies. [6][7]\n\n**First-line treatments (do these first):**\n1. Aggressive IV fluids\n2. IV calcium (calcium chloride 1-2 g or gluconate 3-6 g)\n3. High-dose insulin-euglycemic therapy (HIET) - see [CCB Overdose](#/tree/ccb-od)\n4. Vasopressors (norepinephrine, epinephrine)\n5. Glucagon if concurrent beta-blocker\n\n**When to add ILE:**\n- Shock refractory to fluids + calcium + HIET + vasopressors\n- Cardiac arrest\n- PEA arrest unresponsive to standard ACLS\n\n**Evidence:** [7][8]\n- Case reports and animal models support use\n- One 3-year retrospective: 80% response rate in CCB/BB toxicity treated with ILE\n- No RCTs exist - expert consensus only\n\n**Highly lipophilic CCBs (better ILE candidates):**\n- Verapamil (log P 3.8)\n- Diltiazem (log P 2.8)\n- Amlodipine (log P 3.0)\n\n**ACMT position:** ILE is reasonable for serious instability from highly lipophilic agents.',
        citation: [6, 7, 8],
        next: 'ile-dosing-protocol',
    },
    {
        id: 'ile-bb',
        type: 'info',
        module: 2,
        title: 'Beta-Blocker Overdose',
        body: '**ILE for refractory beta-blocker toxicity** - use AFTER standard therapies. [6][9]\n\n**First-line treatments (do these first):**\n1. IV fluids for preload optimization\n2. Glucagon 3-10 mg IV bolus, then infusion 2-5 mg/hr\n3. Calcium (calcium chloride or gluconate)\n4. High-dose insulin-euglycemic therapy (HIET)\n5. Vasopressors (epinephrine preferred for inotropy)\n6. Transcutaneous pacing if bradycardia\n\nSee [Beta-Blocker Overdose](#/tree/beta-blocker-od)\n\n**When to add ILE:**\n- Shock refractory to glucagon + HIET + vasopressors\n- Cardiac arrest\n- Consider earlier for highly lipophilic agents (propranolol)\n\n**Evidence:** [9]\n- Animal models and case reports support efficacy\n- Best evidence for propranolol (most lipophilic, log P 3.5)\n- Less clear benefit for hydrophilic agents (atenolol, sotalol)\n\n**Lipophilic beta-blockers (better ILE candidates):**\n- Propranolol (log P 3.5)\n- Labetalol (log P 2.3)\n- Carvedilol (log P 4.2)\n\n**Hydrophilic beta-blockers (unlikely to benefit):**\n- Atenolol (log P 0.2)\n- Sotalol (log P -0.6)',
        citation: [6, 9],
        next: 'ile-dosing-protocol',
    },
    {
        id: 'ile-tca',
        type: 'info',
        module: 2,
        title: 'TCA Overdose',
        body: '**ILE for refractory TCA toxicity** - controversial, use after bicarbonate. [6][10]\n\n**First-line treatment is sodium bicarbonate:**\n- Target serum pH 7.50-7.55\n- QRS narrowing is the treatment endpoint\n- Bolus 1-2 mEq/kg, then infusion\n- See [TCA Overdose](#/tree/tca-toxidrome)\n\n**When to consider ILE:**\n- Cardiac arrest refractory to bicarbonate\n- Hemodynamic collapse despite maximal therapy\n- Wide QRS with refractory hypotension\n\n**Evidence is mixed:** [10][11]\n- One swine model showed ILE equivalent to bicarbonate (not superior)\n- Case reports of ROSC with ILE in refractory TCA arrest\n- No proven benefit over bicarbonate as first-line\n\n**TCAs are highly lipophilic (log P 4-5):**\n- Amitriptyline (log P 4.9)\n- Nortriptyline (log P 4.5)\n- Desipramine (log P 4.0)\n\n**ACMT position:** [6]\n"ILE is reasonable to consider in cardiac arrest from TCA overdose when sodium bicarbonate has been administered."',
        citation: [6, 10, 11],
        next: 'ile-dosing-protocol',
    },
    {
        id: 'ile-other',
        type: 'info',
        module: 2,
        title: 'Other Lipophilic Drug Toxicity',
        body: '**Case reports support ILE use for various lipophilic agents:** [6][12]\n\n**Reported successes:**\n- Diphenhydramine (cardiac arrest)\n- Bupropion (refractory seizures, cardiac arrest)\n- Clomipramine\n- Quetiapine\n- Cocaine (with concurrent local anesthetic effects)\n- Flecainide\n- Lamotrigine\n\n**General principle:**\nConsider ILE when:\n1. Agent is highly lipophilic (log P > 2)\n2. Life-threatening toxicity present\n3. Standard antidotes have failed or are unavailable\n4. Cardiac arrest has occurred\n\n**ACMT position statement:** [6]\n"In circumstances where there is serious hemodynamic, or other, instability from a xenobiotic with a high degree of lipid solubility, lipid resuscitation therapy is viewed as a reasonable consideration for therapy, even if the patient is not in cardiac arrest."\n\n**What ILE is NOT indicated for:**\n- Routine overdose without hemodynamic compromise\n- Hydrophilic drug toxicity (digoxin, lithium, salicylates)\n- As alternative to specific antidotes (e.g., DigiFab for digoxin)',
        citation: [6, 12],
        next: 'ile-dosing-protocol',
    },
    // =====================================================================
    // MODULE 3: DOSING PROTOCOL
    // =====================================================================
    {
        id: 'ile-dosing-protocol',
        type: 'info',
        module: 3,
        title: 'ILE Dosing Protocol',
        body: '**Standard ILE Protocol (ASRA 2020):** [1]\n\nUse **20% [Lipid Emulsion](#/drug/lipid-emulsion/LAST)** (Intralipid, Liposyn)\n\n**BOLUS:**\n- **1.5 mL/kg** IV over 1 minute\n- For 70 kg patient: ~100 mL\n\n**INFUSION:**\n- **0.25 mL/kg/min** continuous\n- May double to 0.5 mL/kg/min if unstable\n- Continue for at least 15-30 minutes after hemodynamic stability\n\n**If cardiac arrest or recurrent instability:**\n- Repeat bolus 1-2 times at 5-minute intervals\n- Double infusion rate to 0.5 mL/kg/min\n\n**MAXIMUM DOSE:**\n- **~12 mL/kg** in the first 30 minutes\n- For 70 kg patient: ~840 mL\n\n**Practical tip:** For patients >70 kg, start with ~100 mL bolus. For patients <40 kg or children, use a pump and calculate precisely.',
        citation: [1],
        calculatorLinks: [
            { id: 'ile-dosing', label: 'ILE Dose Calculator' },
        ],
        next: 'ile-admin-details',
        treatment: {
            firstLine: {
                drug: 'Lipid Emulsion 20%',
                dose: '1.5 mL/kg bolus, then 0.25 mL/kg/min infusion',
                route: 'IV',
                frequency: 'Bolus over 1 min, continuous infusion',
                duration: 'Until stable for 15+ minutes',
                notes: 'May repeat bolus x2 at 5 min intervals if unstable. Max ~12 mL/kg in 30 min.',
            },
            monitoring: 'Hemodynamics (BP, HR, rhythm), clinical response, triglycerides if prolonged use.',
        },
    },
    {
        id: 'ile-admin-details',
        type: 'info',
        module: 3,
        title: 'Administration Details',
        body: '**Practical considerations:** [1][2]\n\n**IV Access:**\n- Peripheral IV is acceptable (20% lipid emulsion is safe peripherally)\n- Central line preferred if available but DO NOT delay for access\n- Large bore (18G or larger) recommended for rapid bolus\n\n**Administration:**\n- Draw up in large syringes (60 mL) for bolus\n- Use IV tubing (not a pump) for initial bolus to ensure rapid delivery\n- Switch to pump for infusion phase\n- Bolus should be given over 1 minute (not slower)\n\n**Compatible lines:**\n- Can run through same line as crystalloids\n- Avoid mixing with other medications if possible\n- Flush line before/after if alternating with pressors\n\n**Storage:**\n- Room temperature or refrigerated\n- Protect from light if stored long-term\n- Check expiration date\n- Should be available in OR, ED, procedural areas\n\n**Standard supply:** Most hospitals stock 500 mL bags of 20% lipid emulsion in OR and pharmacy.',
        citation: [1, 2],
        next: 'ile-cpr-modifications',
    },
    {
        id: 'ile-cpr-modifications',
        type: 'info',
        module: 3,
        title: 'CPR Modifications for LAST',
        body: '**LAST-associated cardiac arrest has unique considerations:** [1][4]\n\n**Epinephrine dosing:**\n- Use **smaller doses** than standard ACLS (<1 mcg/kg)\n- Start with 10-100 mcg IV, NOT 1 mg\n- High-dose epinephrine may worsen arrhythmias and reduce ILE efficacy\n- ASRA: "Avoid epinephrine doses >1 mcg/kg"\n\n**Avoid:**\n- **Vasopressin** - may worsen outcomes in LA toxicity\n- **Calcium channel blockers** - contraindicated\n- **Beta-blockers** - contraindicated\n- **Lidocaine or local anesthetics** - will worsen toxicity\n- **Propofol** for seizures initially (lipid vehicle, cardiac depression)\n\n**Prolonged resuscitation:**\n- LAST patients may have ROSC after 60+ minutes of CPR\n- ILE provides ongoing drug sequestration\n- Continue CPR longer than usual before terminating\n- Consider ECMO/ECPR if available\n\n**Defibrillation:**\n- Standard joules for VF/VT\n- May require multiple shocks as ILE takes effect\n- ILE does not interfere with defibrillation',
        citation: [1, 4],
        next: 'ile-monitoring',
    },
    // =====================================================================
    // MODULE 4: MONITORING & ENDPOINTS
    // =====================================================================
    {
        id: 'ile-monitoring',
        type: 'info',
        module: 4,
        title: 'Monitoring During ILE',
        body: '**Real-time monitoring:** [1][2]\n\n**Hemodynamics:**\n- Continuous cardiac monitoring (rhythm, rate)\n- Arterial line if available (BP, waveform)\n- Pulse oximetry\n- Capnography (ROSC detection, ventilation)\n\n**Clinical response markers:**\n- ROSC (in arrest)\n- Blood pressure improvement (MAP >65)\n- Heart rate normalization\n- QRS narrowing (if widened)\n- Resolution of seizures\n- Improved mentation\n\n**When to repeat bolus:**\n- Persistent hemodynamic instability\n- Recurrent arrhythmias\n- No response after 5 minutes\n- May repeat 1-2 additional times\n\n**Duration:**\n- Continue infusion for **at least 15-30 minutes** after stability achieved\n- Some sources recommend up to 60 minutes post-stability\n- Lipophilic drugs may redistribute from lipid compartment as ILE is metabolized\n- Watch for "recrudescence" - return of toxicity after ILE stopped',
        citation: [1, 2],
        next: 'ile-endpoints',
    },
    {
        id: 'ile-endpoints',
        type: 'info',
        module: 4,
        title: 'Treatment Endpoints',
        body: '**When to stop ILE:** [1][2]\n\n**Clinical stability achieved:**\n- Stable blood pressure (MAP >65) for 15+ minutes\n- Stable heart rate and rhythm\n- Resolution of neurologic symptoms\n- No recurrence of toxicity\n\n**Maximum dose reached:**\n- ~12 mL/kg in first 30 minutes\n- Continuing beyond this increases adverse effect risk\n- If still unstable: consider ECMO, other rescue therapies\n\n**Weaning protocol:**\n- Once stable 15-30 minutes, decrease infusion rate by 50%\n- Observe for recurrence\n- Stop if remains stable for additional 15 minutes\n- Monitor for 4-6 hours minimum after discontinuation\n\n**Recrudescence:**\n- Toxicity may return as ILE metabolized (6-12 hours)\n- Particularly with long-acting agents (bupivacaine, extended-release CCB)\n- Consider restarting ILE if symptoms recur\n- Admit to monitored setting',
        citation: [1, 2],
        next: 'ile-lab-interference',
    },
    {
        id: 'ile-lab-interference',
        type: 'info',
        module: 4,
        title: 'Laboratory Interference',
        body: '**ILE causes significant lab interference:** [2][13]\n\n**Lipemia affects these assays:**\n- Electrolytes (falsely elevated or decreased)\n- Troponin (may be falsely elevated)\n- Liver enzymes\n- Lipase\n- Drug levels (may be undetectable or falsely low)\n- Glucose (variable)\n- Magnesium\n\n**Practical approach:**\n- Draw labs BEFORE ILE if possible\n- Note on lab orders that patient received ILE\n- Use point-of-care testing for glucose if available\n- Labs typically normalize 12-24 hours after ILE stopped\n- Triglyceride levels will be markedly elevated\n\n**Monitoring despite interference:**\n- Clinical assessment takes priority\n- Trend values rather than absolute numbers\n- VBG/ABG pH and lactate less affected\n- Repeat labs in 12-24 hours once lipemia clears\n\n**Triglycerides:**\n- Expected to be markedly elevated (>1000 mg/dL)\n- Not a contraindication to additional ILE if clinically needed\n- Check before discharge to ensure clearing',
        citation: [2, 13],
        next: 'ile-complications',
    },
    // =====================================================================
    // MODULE 5: COMPLICATIONS & DISPOSITION
    // =====================================================================
    {
        id: 'ile-complications',
        type: 'info',
        module: 5,
        title: 'Complications & Adverse Effects',
        body: '**ILE is generally safe in acute use, but complications can occur:** [2][6][13]\n\n**Reported adverse effects:**\n\n**Pulmonary:**\n- ARDS (rare, typically with massive doses)\n- Fat embolism syndrome (very rare)\n- Impaired oxygenation\n\n**Metabolic:**\n- Hypertriglyceridemia (expected, usually transient)\n- Acute pancreatitis (rare, dose-related)\n- Hyperglycemia\n\n**Hematologic:**\n- Fat overload syndrome (hepatosplenomegaly, coagulopathy, seizures)\n- Only reported with prolonged infusions >12 mL/kg\n\n**Drug interactions:**\n- May interfere with vasopressor efficacy\n- Propofol is also a lipid emulsion (avoid concurrent use if possible)\n- May affect drug clearance and half-lives\n\n**Contraindications are RELATIVE in cardiac arrest:**\n- Egg/soy allergy - theoretical, NOT contraindication in arrest\n- Severe hyperlipidemia (TG >400) - relative contraindication\n- Proceed with ILE in life-threatening toxicity regardless',
        citation: [2, 6, 13],
        next: 'ile-special-pops',
    },
    {
        id: 'ile-special-pops',
        type: 'info',
        module: 5,
        title: 'Special Populations',
        body: '**Pediatrics:** [1][14]\n- Same dosing: 1.5 mL/kg bolus, 0.25 mL/kg/min infusion\n- Use pump for precise dosing in small children\n- Maximum dose 12 mL/kg applies\n- LAST can occur in children receiving nerve blocks\n\n**Pregnancy:** [1]\n- ILE is indicated for maternal LAST\n- Treat mother first (fetal survival depends on maternal resuscitation)\n- No specific dose adjustments\n- Consider early cesarean if near term and maternal arrest\n\n**Obesity:**\n- Use ideal body weight or lean body mass for dosing\n- Actual body weight may lead to overdosing\n- For cardiac arrest, may use actual weight initially\n\n**Renal/Hepatic impairment:**\n- No dose adjustment needed for acute rescue\n- Lipid clearance may be delayed\n- Monitor triglycerides if prolonged infusion needed\n\n**Elderly:**\n- No specific dose adjustment\n- May have delayed lipid clearance\n- Higher risk of fat overload with prolonged use',
        citation: [1, 14],
        next: 'ile-disposition',
    },
    {
        id: 'ile-disposition',
        type: 'question',
        module: 5,
        title: 'Post-ILE Disposition',
        body: '**All patients receiving ILE require monitored observation:** [1][2]\n\n**Key considerations:**\n- Risk of recrudescence (toxicity recurrence) as ILE metabolized\n- Lab interference resolves over 12-24 hours\n- Ongoing assessment for complications\n- Address underlying cause (needle placement, overdose, etc.)\n\nWhat is the clinical status?',
        citation: [1, 2],
        options: [
            {
                label: 'Stable - ROSC achieved, hemodynamically stable',
                description: 'BP stable, rhythm stable, awake/arousable',
                next: 'ile-dispo-stable',
            },
            {
                label: 'Still requiring vasopressors',
                description: 'Hemodynamics improved but dependent on support',
                next: 'ile-dispo-icu',
                urgency: 'urgent',
            },
            {
                label: 'Refractory/No response to ILE',
                description: 'Persistent arrest or shock despite max ILE',
                next: 'ile-dispo-refractory',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'ile-dispo-stable',
        type: 'result',
        module: 5,
        title: 'Stable - ICU Admission',
        body: '**Admit to ICU or monitored setting for minimum 4-6 hours observation.** [1]\n\n**Monitoring:**\n- Continuous cardiac monitoring\n- Frequent vital signs\n- Neuro checks (if LAST from procedure)\n- Watch for recrudescence\n\n**Labs:**\n- Repeat BMP, troponin, LFTs in 12-24 hours\n- Triglycerides to confirm clearance\n- Drug levels if applicable\n\n**Reporting:**\n- Report all LAST cases to www.lipidrescue.org\n- Quality improvement review if procedural LAST\n\n**Discharge criteria:**\n- 6+ hours observation without recurrence\n- Normal mentation\n- Stable hemodynamics\n- Labs clearing\n- Outpatient follow-up arranged',
        recommendation: 'ICU or monitored admission for minimum 4-6 hours. Watch for recrudescence as ILE is metabolized. Discharge once clinically stable and labs clearing.',
        confidence: 'definitive',
        citation: [1],
    },
    {
        id: 'ile-dispo-icu',
        type: 'result',
        module: 5,
        title: 'Vasopressor-Dependent - ICU Admission',
        body: '**ICU admission required for ongoing hemodynamic support.** [1][2]\n\n**Management:**\n- Continue vasopressors as needed\n- Wean as tolerated\n- May continue low-dose ILE infusion if recurrent instability\n- Optimize volume status\n- Serial labs (despite lipemia)\n\n**Consider:**\n- Toxicology consultation\n- Source control (remove depot LA if applicable)\n- Hemodialysis NOT helpful for lipophilic drugs\n- ECMO if refractory and available\n\n**Prognosis:**\n- Most LAST patients recover completely if ROSC achieved\n- Neurologic outcome depends on duration of arrest\n- BB/CCB overdose may require days of support',
        recommendation: 'ICU admission with continued hemodynamic support. Continue vasopressors, consider ongoing ILE infusion. Toxicology consultation recommended.',
        confidence: 'definitive',
        citation: [1, 2],
    },
    {
        id: 'ile-dispo-refractory',
        type: 'result',
        module: 5,
        title: 'Refractory - Consider ECMO',
        body: '**If ILE + standard measures have failed:** [4][15]\n\n**VA-ECMO/ECPR:**\n- Consider early ECMO cannulation for refractory LAST arrest\n- May provide cardiac support while drug clears\n- Best outcomes when initiated early\n- Contact ECMO center immediately if not on-site\n\n**Continued CPR:**\n- LAST patients may have delayed ROSC (60+ minutes reported)\n- Continue high-quality CPR while arranging ECMO\n- Continue ILE during CPR (at infusion rate)\n\n**Transport:**\n- If ECMO not available, consider transport with ongoing CPR\n- Mechanical CPR device helpful for transport\n\n**Prognosis:**\n- Without ECMO, refractory LAST arrest has poor prognosis\n- With ECMO, case reports of full neurologic recovery\n- Earlier ECMO cannulation associated with better outcomes',
        recommendation: 'Consider VA-ECMO/ECPR for refractory LAST arrest. Continue CPR and ILE while arranging ECMO. Early cannulation associated with better outcomes.',
        confidence: 'recommended',
        citation: [4, 15],
        treatment: {
            firstLine: {
                drug: 'VA-ECMO',
                dose: 'Per ECMO protocol',
                route: 'Cannulation',
                frequency: 'Continuous',
                duration: 'Until cardiac recovery',
                notes: 'Consider early if refractory to ILE + ACLS',
            },
            monitoring: 'ECMO flows, oxygenation, anticoagulation per protocol.',
        },
    },
    // =====================================================================
    // SUMMARY NODE (linked from entry)
    // =====================================================================
    {
        id: 'ile-summary',
        type: 'info',
        module: 1,
        title: 'ILE Quick Reference',
        body: '**LIPID EMULSION 20% (Intralipid) PROTOCOL**\n\n**BOLUS:**\n1.5 mL/kg IV push over 1 minute\n- 70 kg patient: ~100 mL\n- May repeat x2 at 5-minute intervals\n\n**INFUSION:**\n0.25 mL/kg/min (15 mL/kg/hr)\n- 70 kg patient: ~17.5 mL/min or ~1050 mL/hr\n- Double rate to 0.5 mL/kg/min if unstable\n\n**MAXIMUM:**\n~12 mL/kg in first 30 minutes\n- 70 kg patient: ~840 mL max\n\n**DURATION:**\nContinue infusion 15-30 minutes after hemodynamic stability\n\n**CPR MODIFICATIONS:**\n- Low-dose epinephrine (<1 mcg/kg)\n- Avoid vasopressin, lidocaine, calcium blockers\n- Prolonged resuscitation may be needed\n\n**INDICATIONS:**\n- LAST (primary)\n- Refractory BB/CCB/TCA toxicity\n- Cardiac arrest from lipophilic agents',
        citation: [1],
        calculatorLinks: [
            { id: 'ile-dosing', label: 'ILE Dose Calculator' },
        ],
    },
];
// =====================================================================
// MODULE LABELS
// =====================================================================
export const INTRALIPID_MODULE_LABELS = [
    'Overview',
    'Indications',
    'Dosing Protocol',
    'Monitoring & Endpoints',
    'Complications & Disposition',
];
export const INTRALIPID_NODE_COUNT = 21;
// =====================================================================
// CITATIONS
// =====================================================================
export const INTRALIPID_CITATIONS = [
    {
        num: 1,
        text: 'Neal JM, Barrington MJ, Fettiplace MR, et al. The Third American Society of Regional Anesthesia and Pain Medicine Practice Advisory on Local Anesthetic Systemic Toxicity. Reg Anesth Pain Med. 2018;43(2):113-123.',
    },
    {
        num: 2,
        text: 'Fettiplace MR, Weinberg G. The Mechanisms Underlying Lipid Resuscitation Therapy. Reg Anesth Pain Med. 2018;43(2):138-149.',
    },
    {
        num: 3,
        text: 'Weinberg GL. Lipid Emulsion Infusion: Resuscitation for Local Anesthetic and Other Drug Overdose. Anesthesiology. 2012;117(1):180-187.',
    },
    {
        num: 4,
        text: 'Panchal AR, Bartos JA, Cabanas JG, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation. 2020;142(16_suppl_2):S366-S468.',
    },
    {
        num: 5,
        text: 'Fettiplace MR, Akpa BS, Rubinstein I, Bhattaram VK, et al. Redistribution vs. Metabolic Augmentation: Which is the Dominant Mechanism of ILE? Reg Anesth Pain Med. 2015;40(6):563-567.',
    },
    {
        num: 6,
        text: 'American College of Medical Toxicology. ACMT Position Statement: Interim Guidance for the Use of Lipid Resuscitation Therapy. J Med Toxicol. 2017;13(1):123-126.',
    },
    {
        num: 7,
        text: 'Levine M, Hoffman RS, Lavergne V, et al. Systematic Review of the Effect of Intravenous Lipid Emulsion Therapy for Non-Local Anesthetic Toxicity. Clin Toxicol. 2016;54(3):194-221.',
    },
    {
        num: 8,
        text: 'Geib AJ, Liebelt E, Manini AF, et al. Role of ILE in the Management of CCB and BB Overdose: 3 Years Experience. J Med Toxicol. 2015;11(3):346-352.',
    },
    {
        num: 9,
        text: 'Shenoy S, Coleman J, Engelbrecht L, et al. Lipid Emulsion for Beta-Blocker Toxicity: A Systematic Review. Clin Toxicol. 2019;57(7):561-573.',
    },
    {
        num: 10,
        text: 'Varney SM, Manthey DE, Culpepper VE, et al. Intravenous Lipid Emulsion Therapy Does Not Improve Hypotension Compared to Sodium Bicarbonate for TCA Toxicity. Acad Emerg Med. 2014;21(11):1212-1219.',
    },
    {
        num: 11,
        text: 'Harvey M, Cave G. Intralipid Outperforms Sodium Bicarbonate in a Rabbit Model of Clomipramine Toxicity. Ann Emerg Med. 2007;49(2):178-185.',
    },
    {
        num: 12,
        text: 'Gosselin S, Hoegberg LC, Hoffman RS, et al. Evidence-Based Recommendations on the Use of Intravenous Lipid Emulsion Therapy. Clin Toxicol. 2016;54(10):899-923.',
    },
    {
        num: 13,
        text: 'Grunbaum AM, Gilfix BM, Bhojani RK, et al. Laboratory Interference from Lipid Emulsion. Ann Emerg Med. 2012;60(3):255-261.',
    },
    {
        num: 14,
        text: 'Walker BJ, Long JB, De Oliveira GS, et al. Peripheral Nerve Blockade and Local Anesthetic Systemic Toxicity in Pediatric Patients. Reg Anesth Pain Med. 2018;43(2):162-170.',
    },
    {
        num: 15,
        text: 'Mirtallo JM, Dasta JF, Kleinschmidt KC, Varon J. State of the Art Review: Intravenous Fat Emulsions: Current Applications, Safety Profile, and Clinical Implications. Ann Pharmacother. 2010;44(4):688-700.',
    },
];
