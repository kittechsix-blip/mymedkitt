// MedKitt — Parkinson Disease ED Management
// Med Reconciliation → Off-State vs Crisis → Aspiration Risk → Avoid Dopamine Blockers → Levodopa Restart → Disposition
// 6 modules, 20 nodes total.
export const PARKINSON_ED_CRITICAL_ACTIONS = [
    { text: 'NEVER give haloperidol, prochlorperazine, metoclopramide, or promethazine — all block dopamine and worsen PD', nodeId: 'pd-avoid-blockers' },
    { text: 'Time-critical med: levodopa must be given within 30 minutes of scheduled dose to prevent off-state', nodeId: 'pd-med-rec' },
    { text: 'NMS-like syndrome (fever + rigidity + autonomic) after abrupt levodopa stop — restart levodopa, supportive care, dantrolene/bromocriptine if severe', nodeId: 'pd-pdh' },
    { text: 'Aspiration risk: head-of-bed up, NPO if dysphagia screen failed, swallow eval before any PO med', nodeId: 'pd-aspiration' },
    { text: 'Acceptable antiemetics: ondansetron, granisetron, trimethobenzamide. Acceptable antipsychotics: quetiapine, clozapine, pimavanserin', nodeId: 'pd-safe-alternatives' },
    { text: 'If NPO: use rotigotine patch 4-8 mg/24h OR apomorphine SC OR IV/NG levodopa via NG tube', nodeId: 'pd-npo-bridge' },
    { text: 'Sudden dose reduction or substitution increases fall, aspiration, and PDH risk — match home dose exactly', nodeId: 'pd-med-rec' },
];
export const PARKINSON_ED_NODES = [
    // =====================================================================
    // MODULE 1: MEDICATION RECONCILIATION
    // =====================================================================
    {
        id: 'pd-start',
        type: 'info',
        module: 1,
        title: 'Parkinson Disease in the ED',
        body: '**Parkinson disease (PD)** patients in the ED have higher mortality, longer admissions, and 2-3x more complications than age-matched peers. The two biggest drivers are **medication errors** and **dopamine-blocker exposure**.\n\n**The ED-critical rule:** PD is a **time-sensitive dopamine deficiency**. Every missed or delayed levodopa dose risks:\n- Off-state with rigidity, akinesia, fall risk\n- Parkinsonism-hyperpyrexia (PDH) — NMS-like syndrome from abrupt withdrawal\n- Aspiration from dysphagia worsening\n- Behavioral deterioration\n\n**Three first moves in every PD ED visit:**\n1. **Med rec the exact home regimen** including dose, drug, and timing\n2. **Screen for dysphagia** before any PO\n3. **Flag the chart** with PD-unsafe medications list\n\nThis consult walks the most common ED-relevant pathways: med reconciliation, off-state vs hyperpyrexic crisis, aspiration risk, dopamine-blocker avoidance, levodopa restart in the NPO patient, and disposition.',
        citation: [1, 2],
        next: 'pd-med-rec',
        summary: 'PD is time-sensitive dopamine deficiency. Med rec, dysphagia screen, and flag PD-unsafe drugs immediately.',
    },
    {
        id: 'pd-med-rec',
        type: 'info',
        module: 1,
        title: 'Medication Reconciliation — Get It Right',
        body: '**The single most important ED action in PD is matching the home regimen exactly.** [1][2][3]\n\n**What to capture (drug, dose, time, last dose taken):**\n- **Levodopa/carbidopa** (Sinemet, Rytary, Duopa, Inbrija): immediate-release vs CR vs extended-release vs inhaled\n- **Dopamine agonists:** pramipexole, ropinirole, rotigotine patch, apomorphine\n- **MAO-B inhibitors:** selegiline, rasagiline, safinamide\n- **COMT inhibitors:** entacapone, opicapone, tolcapone\n- **Amantadine** (immediate or ER for dyskinesia)\n- **Anticholinergics:** trihexyphenidyl, benztropine (mostly older patients with tremor-predominant)\n\n**Critical dosing detail:**\n- Levodopa schedule is patient-specific (q3h, q4h, q5h, with/without food)\n- Many patients take levodopa 30 minutes BEFORE meals (protein competes for absorption)\n- "1 Sinemet" can mean 25/100, 25/250, or CR 50/200 — ALWAYS clarify the strength\n\n**The 30-minute rule:**\nIf scheduled dose is missed by >30 minutes, expect off-state. Order levodopa as a stat medication, not a routine.\n\n**Pharmacy verification:**\nCall the patient pharmacy or use prescription history in the EMR — patient recall is unreliable in off-states.',
        citation: [1, 2, 3],
        next: 'pd-on-time-meds',
        summary: 'Capture exact drug/dose/time/last dose. Levodopa is a stat medication on a strict schedule. Verify with pharmacy.',
        safetyLevel: 'critical',
    },
    {
        id: 'pd-on-time-meds',
        type: 'info',
        module: 1,
        title: 'On-Time Medication Order Set',
        body: '**Build PD home meds into ED order set as STAT and SCHEDULED, not PRN.** [2][3]\n\n**Order set template:**\n```\nLevodopa/carbidopa [exact strength] PO STAT NOW\nLevodopa/carbidopa [exact strength] PO Q[home interval] starting at [next home dose time]\nRotigotine patch [home dose] topical daily (if home med)\nSelegiline/rasagiline [home dose] PO QAM (if home med)\nEntacapone [home dose] PO with each levodopa (if home med)\nAmantadine [home dose] PO BID (if home med)\n```\n\n**If admission is anticipated:**\n- Write inpatient orders to match exact home schedule\n- Add nursing note: "DO NOT substitute levodopa formulations or change timing without neurology consult"\n- Add allergy/intolerance flag for: haloperidol, metoclopramide, prochlorperazine, promethazine, droperidol\n\n**EMR best practice:** many institutions now have a "PD-friendly" order set — use it if available.\n\n**Get patient pharmacy involved early** — many ED pharmacies do not stock all levodopa formulations (especially Rytary, Inbrija, Duopa). Patient may need to use their own home supply with pharmacy verification.',
        citation: [2, 3],
        next: 'pd-off-vs-crisis',
        summary: 'Schedule levodopa as STAT + ongoing q-interval. Flag chart for PD-unsafe drugs. Verify formulation availability.',
        skippable: true,
    },
    // =====================================================================
    // MODULE 2: OFF-STATE VS CRISIS
    // =====================================================================
    {
        id: 'pd-off-vs-crisis',
        type: 'question',
        module: 2,
        title: 'Off-State or Hyperpyrexic Crisis?',
        body: 'Two distinct PD emergencies share overlapping features. The distinction matters because management diverges.\n\n**Off-state (common, expected, treatable):**\n- Rigidity, bradykinesia, tremor return\n- May have dystonia (especially morning off)\n- Temperature normal\n- No autonomic instability\n- Mental status intact\n- Triggered by missed dose, wearing-off, dose failure (e.g., high-protein meal blocked absorption)\n\n**Parkinsonism-hyperpyrexia (PDH, rare, life-threatening):**\n- NMS-like syndrome from abrupt dopamine withdrawal\n- **Fever** (often >101°F)\n- **Severe rigidity** (lead-pipe)\n- **Autonomic instability** (BP swings, tachycardia, diaphoresis)\n- **Altered mental status** (delirium → stupor)\n- **CK elevated**, AKI risk\n- Mortality 4-25% without treatment\n\n**Trigger history:** abrupt levodopa stop, sudden dose reduction, switch to a different formulation, deep brain stimulator battery failure, or surgical NPO without bridge therapy.',
        citation: [4, 5],
        options: [
            {
                label: 'Off-state only — afebrile, stable autonomics, alert',
                next: 'pd-off-management',
            },
            {
                label: 'Hyperpyrexic crisis (PDH) — fever + rigidity + autonomic instability + AMS',
                next: 'pd-pdh',
            },
        ],
        summary: 'Off-state = missed dose, treat with levodopa. PDH = NMS-like withdrawal syndrome, requires aggressive supportive care.',
    },
    {
        id: 'pd-off-management',
        type: 'info',
        module: 2,
        title: 'Off-State — Acute Rescue',
        body: '**First-line rescue (if able to swallow):** [4][6]\n- **Inbrija (inhaled levodopa)** 84 mg via inhaler — onset 10 minutes, ideal for ED rescue\n- OR **levodopa/carbidopa ODT (Parcopa)** 25/100 mg — dissolves on tongue, useful with mild dysphagia\n- OR **standard levodopa/carbidopa** 25/100 mg PO — onset 30-60 minutes\n\n**If NPO or severe dysphagia:** [6]\n- **Apomorphine SC** 2-6 mg (start low, titrate to effect, premedicate with trimethobenzamide or domperidone if available)\n- OR **rotigotine 4-8 mg/24h patch** (bridge until oral resumes, onset 4-6 hours)\n- OR **NG tube levodopa** (crush IR tablets — do NOT crush CR or sustained-release)\n\n**Reassessment timing:**\n- Inhaled levodopa: reassess at 10-20 minutes\n- PO levodopa: reassess at 30-60 minutes\n- Apomorphine: reassess at 10-20 minutes\n- Rotigotine: bridge therapy, full effect at 24+ hours\n\n**Resume home schedule** as soon as patient is able. Do NOT skip subsequent doses.\n\n**Apomorphine cautions:** profound hypotension, severe nausea. Always give first dose under monitoring with antiemetic on board (use trimethobenzamide or ondansetron, NOT metoclopramide or prochlorperazine).',
        citation: [4, 6],
        next: 'pd-aspiration',
        summary: 'PO/inhaled levodopa first. NPO patients: apomorphine SC, rotigotine patch, or NG levodopa. Reassess in 30-60 min.',
        safetyLevel: 'critical',
        treatment: {
            firstLine: {
                drug: 'Inhaled levodopa (Inbrija)',
                dose: '84 mg',
                route: 'Inhaled (oral inhaler)',
                frequency: 'Once for rescue; may repeat per neurology',
                duration: 'Single dose for ED rescue',
                notes: 'Onset 10 minutes; ideal ED off-state rescue if patient can use inhaler.',
            },
            secondLine: 'Apomorphine SC 2-6 mg (start low). Premedicate with trimethobenzamide 300 mg PO or ondansetron 4-8 mg IV. NOT with metoclopramide/prochlorperazine. Monitor for hypotension.',
            monitoring: 'Reassess motor function at 10-20 min (inhaled/apomorphine), 30-60 min (PO levodopa). Resume home schedule when able.',
        },
    },
    {
        id: 'pd-pdh',
        type: 'info',
        module: 2,
        title: 'Parkinsonism-Hyperpyrexia (PDH) — NMS-Like Crisis',
        body: '**PDH is a neuro-emergency.** Mortality 4-25% without aggressive treatment. [4][5][7]\n\n**Pathophysiology:** Abrupt central dopamine deficit produces a syndrome clinically indistinguishable from neuroleptic malignant syndrome (NMS).\n\n**Diagnostic clues vs NMS:**\n- PDH: PD patient with recent levodopa change/stop or DBS battery failure\n- NMS: typically antipsychotic exposure (haloperidol, risperidone, others)\n- Otherwise indistinguishable clinically\n\n**Acute management (parallel tracks):** [4][5]\n\n**Track 1 — Restore dopamine NOW:**\n- **Resume home levodopa at full home dose** via NG tube (crush IR tablets, dissolve in water) if patient cannot swallow\n- OR **rotigotine patch 8-12 mg/24h** (faster onset than oral if GI shut down)\n- OR **apomorphine SC** 2-6 mg q2-4h\n- Do NOT wait for confirmatory labs — empiric dopamine replacement is first-line\n\n**Track 2 — Supportive care:**\n- **Aggressive cooling:** evaporative + ice packs to groin/axillae; target <38.5°C\n- **IV fluids:** crystalloid 1-2 L bolus, then maintenance — protect kidneys from rhabdomyolysis\n- **Monitor CK, BUN/Cr, K+, lactate, CBC, coags, LFTs** q6h\n- **Treat rhabdo:** consider mannitol or bicarbonate if CK >5,000 or AKI\n- **ICU admission** for severe cases\n\n**Adjuncts for severe rigidity/hyperthermia:** [5][7]\n- **Dantrolene 1-2.5 mg/kg IV** q6h (max 10 mg/kg/24h) — direct muscle relaxant\n- **Bromocriptine 2.5-5 mg PO/NG** q8h (dopamine agonist)\n- **Benzodiazepines** for agitation (lorazepam 1-2 mg IV)\n\n**Do NOT use:** haloperidol, droperidol, or any typical antipsychotic for agitation — these worsen PDH.\n\n**Consult:** Neurology and ICU immediately.',
        citation: [4, 5, 7],
        next: 'pd-aspiration',
        summary: 'PDH = NMS-like crisis from dopamine withdrawal. Restart levodopa NOW + dantrolene + bromocriptine + cooling + IVF + ICU.',
        safetyLevel: 'critical',
        treatment: {
            firstLine: {
                drug: 'Levodopa/carbidopa (IR) via NG tube',
                dose: 'Resume home dose (do not under-dose)',
                route: 'NG tube (crush IR tablets, dissolve in 30 mL water)',
                frequency: 'Per home schedule (typically q4-6h)',
                duration: 'Until oral resumed and crisis resolves',
                notes: 'NEVER crush CR/ER/Rytary/Duopa. Alternates: rotigotine patch 8-12 mg/24h OR apomorphine SC 2-6 mg q2-4h.',
            },
            secondLine: 'Dantrolene 1-2.5 mg/kg IV q6h (max 10 mg/kg/24h) for severe rigidity. Bromocriptine 2.5-5 mg PO/NG q8h. Aggressive cooling, IVF, ICU admission.',
            monitoring: 'CK, BUN/Cr, K+, lactate, CBC, LFTs, coags q6h. Continuous cardiac monitoring. Target temp <38.5°C. ICU admission.',
        },
    },
    // =====================================================================
    // MODULE 3: ASPIRATION RISK
    // =====================================================================
    {
        id: 'pd-aspiration',
        type: 'info',
        module: 3,
        title: 'Aspiration Risk — Screen Before PO',
        body: '**Aspiration pneumonia is the leading cause of death in PD.** [1][8][9]\n\n**Dysphagia prevalence:** up to 80% of PD patients, often silent (no cough or choking visible).\n\n**Quick ED dysphagia screen (Yale Swallow Protocol):** [9]\n1. Alert and able to follow commands?\n2. No history of recent aspiration pneumonia?\n3. Sit patient upright, give 3 oz water uninterrupted\n4. PASS = no cough, throat clear, wet voice within 1 minute = safe for PO\n5. FAIL = NPO, swallow eval, NG or alternative route for meds\n\n**Red flags for high aspiration risk:** [8]\n- Wet/gurgly voice quality\n- Drooling, pocketing food\n- Coughing or throat-clearing with intake\n- Recent weight loss\n- Recurrent pneumonia\n- Severe off-state (worsens dysphagia)\n- Advanced PD (Hoehn-Yahr ≥3)\n\n**HOB up to 30-45° minimum, 90° during meals.**\n\n**If failed screen:**\n- **NPO** until formal speech/swallow eval\n- **NG tube** for crushed levodopa IR (NEVER crush CR/ER)\n- **Rotigotine patch** as parallel coverage if any delay in NG\n- **Aspiration precautions:** suction setup, HOB elevated, oral care q4h\n\n**Treat presumed aspiration pneumonia** with ampicillin-sulbactam 3 g IV q6h OR ceftriaxone 2 g IV daily + metronidazole 500 mg IV q8h. Avoid agents that worsen PD (none common in this class).',
        citation: [1, 8, 9],
        next: 'pd-npo-bridge',
        summary: 'Yale Swallow Protocol before PO. HOB 30-45° baseline, 90° for meals. NPO + NG/rotigotine if fail.',
        safetyLevel: 'critical',
    },
    {
        id: 'pd-npo-bridge',
        type: 'info',
        module: 3,
        title: 'NPO Patient — Bridge Therapy',
        body: '**The "NPO PD patient" is at highest risk for off-state and PDH.** Bridge therapy is mandatory. [4][6]\n\n**Bridge options (ranked by ED ease):**\n\n**1. Rotigotine patch (Neupro)** — FIRST CHOICE for most ED NPO patients [6]\n- Dose: convert total daily levodopa equivalent (LED) — see LED calculator\n- Rough conversion: 1 mg rotigotine ≈ 30 mg levodopa\n- Patches: 1, 2, 3, 4, 6, 8 mg/24h\n- Onset: 4-6 hours to therapeutic level\n- Site: rotate q24h, apply to clean dry skin (upper arm, shoulder, abdomen, flank)\n- Most ED-available, no GI tract needed\n\n**2. Apomorphine SC** — for rapid rescue [6]\n- 2-6 mg SC, may repeat q2-4h\n- Premedicate with trimethobenzamide 300 mg PO/PR or ondansetron 4-8 mg IV\n- Onset 10-20 minutes\n- Reserve for severe off-state with hemodynamic stability (causes hypotension)\n\n**3. NG tube levodopa** [4]\n- Crush IR levodopa/carbidopa tablets ONLY (Sinemet 25/100 or 25/250)\n- DO NOT crush CR, ER, Rytary, Duopa, or any sustained-release formulation\n- Dissolve in 30 mL water, flush NG, follow with water flush\n- Resume home schedule\n\n**4. Inhaled levodopa (Inbrija)** [6]\n- 84 mg inhaled — bypasses GI, useful if patient can use inhaler\n- Rescue only, not maintenance\n\n**5. Continuous IV levodopa** (off-label, ICU only, neuro consult)\n\n**Rotigotine + apomorphine PRN is the most ED-friendly combo for the unstable NPO PD patient.**\n\nResume PO levodopa as soon as swallow safe — continue rotigotine for 12-24h overlap.',
        citation: [4, 6],
        next: 'pd-avoid-blockers',
        summary: 'NPO bridge: rotigotine patch first-choice (LED conversion), apomorphine SC for rescue, NG levodopa IR if NG placed.',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 4: AVOID DOPAMINE BLOCKERS
    // =====================================================================
    {
        id: 'pd-avoid-blockers',
        type: 'info',
        module: 4,
        title: 'DO NOT GIVE — PD-Unsafe Medications',
        body: '**These medications cause acute parkinsonism, off-states, or PDH in PD patients. NEVER give without explicit neurology approval.** [1][2][10]\n\n**ABSOLUTELY AVOID:**\n\n**Antipsychotics (typical + most atypicals):**\n- Haloperidol\n- Droperidol\n- Risperidone\n- Olanzapine\n- Ziprasidone\n- Aripiprazole (partial agonist but still risky)\n\n**Antiemetics (dopamine blockers):**\n- Metoclopramide (Reglan)\n- Prochlorperazine (Compazine)\n- Promethazine (Phenergan)\n- Droperidol\n\n**Other dopamine blockers:**\n- Methyldopa (BP)\n- Reserpine (BP, rare)\n- Tetrabenazine (chorea)\n\n**Common ED triggers to flag:** [10]\n- "Migraine cocktail" with metoclopramide or prochlorperazine\n- Agitation orders defaulting to haloperidol\n- Sedation defaulting to droperidol\n- Vertigo defaulting to promethazine\n- Nausea defaulting to prochlorperazine\n\n**What happens if given:**\n- Immediate worsening of rigidity, bradykinesia, freezing\n- Risk of NMS or PDH if severe\n- Can persist for days to weeks after exposure (especially long-acting depot forms)\n\n**Document allergy/intolerance flags for all listed medications** in the chart.\n\n**Pearl:** **Quetiapine, clozapine, and pimavanserin** are the only antipsychotics safe in PD (low/no D2 affinity). **Trimethobenzamide, ondansetron, and granisetron** are safe antiemetics.',
        citation: [1, 2, 10],
        next: 'pd-safe-alternatives',
        summary: 'NEVER: haloperidol, metoclopramide, prochlorperazine, promethazine, risperidone, olanzapine. Flag chart with allergy/intolerance.',
        safetyLevel: 'critical',
    },
    {
        id: 'pd-safe-alternatives',
        type: 'info',
        module: 4,
        title: 'PD-Safe Alternatives Cheat Sheet',
        body: '**Common ED scenarios and PD-safe substitutes:** [1][2][10]\n\n**Nausea/vomiting:**\n- **Ondansetron** 4-8 mg IV/PO q8h ✓\n- **Granisetron** 1 mg IV/PO ✓\n- **Trimethobenzamide** (Tigan) 300 mg PO or 200 mg IM q6-8h ✓\n- **Domperidone** (if available, not US-licensed) ✓\n- AVOID: metoclopramide, prochlorperazine, promethazine\n\n**Psychosis/agitation:**\n- **Quetiapine** 12.5-25 mg PO q6h PRN (start low) ✓\n- **Clozapine** (specialist-managed, ANC monitoring required) ✓\n- **Pimavanserin** (long onset, not for acute) ✓\n- **Lorazepam** 0.5-1 mg PO/IV PRN agitation (use sparingly — fall risk) ✓\n- AVOID: haloperidol, droperidol, risperidone, olanzapine, ziprasidone, aripiprazole\n\n**Migraine cocktail:**\n- **Sumatriptan** 6 mg SC or 100 mg PO ✓\n- **Ketorolac** 30 mg IV/IM ✓\n- **Acetaminophen** 1 g IV/PO ✓\n- **Ondansetron** instead of metoclopramide/prochlorperazine ✓\n\n**Sedation for procedures:**\n- **Midazolam, fentanyl, ketamine, propofol, etomidate** all OK ✓\n- Avoid prolonged droperidol or haloperidol-based regimens\n\n**Sleep/anxiety:**\n- **Lorazepam, melatonin, trazodone** OK ✓\n- **Mirtazapine** OK ✓\n\n**Hypertension:**\n- **Labetalol, hydralazine, clevidipine, nicardipine** OK ✓\n- AVOID: methyldopa, reserpine\n\n**Vertigo:**\n- **Meclizine** OK ✓\n- AVOID: promethazine, prochlorperazine\n\n**Pin this list to the chart.**',
        citation: [1, 2, 10],
        next: 'pd-levodopa-restart',
        summary: 'Antiemetic = ondansetron/granisetron/trimethobenzamide. Antipsychotic = quetiapine/clozapine. Migraine = no metoclopramide/prochlorperazine.',
        skippable: true,
    },
    // =====================================================================
    // MODULE 5: LEVODOPA RESTART
    // =====================================================================
    {
        id: 'pd-levodopa-restart',
        type: 'info',
        module: 5,
        title: 'Restarting Levodopa After NPO / Withdrawal',
        body: '**Three restart scenarios:** [4][6]\n\n**Scenario A — Short NPO (<12 hours) without crisis:**\n- Resume home schedule at next scheduled dose\n- If late: give the missed dose now AND continue schedule\n- No taper needed, no dose adjustment\n\n**Scenario B — Prolonged NPO (>12-24 hours) or off-state:**\n- Resume home dose immediately (do NOT under-dose)\n- Consider rotigotine 24h overlap to ensure steady state\n- Watch for transient nausea (often returns at restart, treat with ondansetron NOT metoclopramide)\n\n**Scenario C — After PDH or severe withdrawal:**\n- Restart at FULL HOME DOSE immediately (do NOT taper up)\n- Add rotigotine 4-8 mg/24h patch as safety net for 48-72h\n- Neurology consult before discharge\n\n**Common mistakes to avoid:** [4]\n- **Holding "until tomorrow"** — this triggers PDH\n- **Substituting CR for IR or vice versa without dose conversion** — bioavailability differs\n- **Adding a "low-dose start"** in a chronic patient — they need their tolerated dose, not a naive one\n- **Switching to generic in an extended-release patient** — formulations are NOT bioequivalent\n\n**Bioavailability pearls:** [6]\n- Sinemet IR 25/100: 100% reference\n- Sinemet CR: ~75% bioavailability — increase dose 20-30% if converting from IR\n- Rytary (ER capsules): ~70% — specific conversion table required\n- Duopa (intestinal gel): continuous infusion — do NOT substitute oral acutely\n- Inbrija (inhaled): rescue only, NOT a maintenance substitute\n\n**Check inpatient pharmacy stock** before assuming a formulation will be available — many hospitals stock only IR.',
        citation: [4, 6],
        next: 'pd-protein-timing',
        summary: 'Resume home dose immediately, no taper, no substitution. Sinemet IR vs CR vs Rytary are NOT bioequivalent.',
        safetyLevel: 'critical',
    },
    {
        id: 'pd-protein-timing',
        type: 'info',
        module: 5,
        title: 'Protein-Levodopa Timing Pearl',
        body: '**Large neutral amino acids (LNAAs) in dietary protein compete with levodopa for transport across the gut and blood-brain barrier.** [6][11]\n\n**Clinical consequence:** Protein-rich meal within 30 minutes of levodopa can reduce effective brain dose by 30-50%, producing an unexpected off-state.\n\n**Home dosing pattern most PD patients use:**\n- Levodopa 30 minutes BEFORE meals\n- OR 60-90 minutes AFTER meals\n- Some patients shift dietary protein to evening only ("protein redistribution diet")\n\n**ED implication:**\n- If patient brought levodopa with breakfast tray and is suddenly off, ask about timing\n- Order: "Levodopa 30 min BEFORE meals" as standard\n- For NPO patients on enteral feeds: hold tube feed 30 min before and after levodopa dose, or use low-protein formula\n\n**Iron supplements:** also bind levodopa — separate by 2+ hours.\n\n**Carbidopa rationale:** carbidopa is a peripheral decarboxylase inhibitor that lets more L-dopa cross the BBB; it does not affect the LNAA competition issue.',
        citation: [6, 11],
        next: 'pd-dispo-decision',
        summary: 'Levodopa 30 min before OR 60+ min after protein meal. Iron supplements separate by 2h. Tube feeds: pause around dose.',
        skippable: true,
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'pd-dispo-decision',
        type: 'question',
        module: 6,
        title: 'Disposition Decision',
        body: 'Most PD patients with off-state alone go home. Hyperpyrexic crisis, aspiration pneumonia, and uncontrolled symptoms admit.\n\n**Choose the closest match:**',
        citation: [1, 2],
        options: [
            {
                label: 'Off-state resolved, returned to baseline, home meds on board',
                next: 'pd-dispo-home',
            },
            {
                label: 'Aspiration pneumonia, unable to PO, or moderate symptoms not controlled',
                next: 'pd-dispo-admit',
            },
            {
                label: 'PDH, severe rigidity with autonomic instability, or respiratory compromise',
                next: 'pd-dispo-icu',
            },
        ],
        summary: 'Three buckets: home (off-state resolved), floor (aspiration/uncontrolled), ICU (PDH/respiratory/autonomic).',
    },
    {
        id: 'pd-dispo-home',
        type: 'info',
        module: 6,
        title: 'Discharge Home — Checklist',
        body: '**Safe discharge requires ALL of the following:** [1][2]\n\n☐ Returned to baseline motor function (patient/family confirms)\n☐ Tolerating PO including home medications\n☐ Yale Swallow Protocol passed (or not previously failed)\n☐ Home medication list confirmed and unchanged\n☐ Caregiver/family understands which medications to AVOID\n☐ Follow-up with neurology within 1-2 weeks\n☐ Return precautions reviewed:\n  - Fever + rigidity + confusion → ED (PDH)\n  - Choking, recurrent aspiration → ED\n  - Severe off-state not responsive to home rescue → ED\n  - New psychotic symptoms or falls → urgent neurology\n\n**Discharge prescription pearls:**\n- Do NOT change levodopa formulation at discharge\n- If new antiemetic needed: ondansetron only\n- If new sleep aid: trazodone, melatonin, or lorazepam (NOT diphenhydramine in older adults)\n- Hand patient a printed "PD-unsafe medication list" for future ED visits\n\n**Caregiver education:** Provide a written list of medications to refuse if offered at future ED visits — haloperidol, metoclopramide, prochlorperazine, promethazine, droperidol.',
        citation: [1, 2],
        summary: 'Discharge if baseline + PO tolerating + meds confirmed. Hand patient printed PD-unsafe drug list for future ED visits.',
    },
    {
        id: 'pd-dispo-admit',
        type: 'info',
        module: 6,
        title: 'Admit — Floor or Step-Down',
        body: '**Admit for:** [1][2]\n- Aspiration pneumonia\n- Moderate off-state not resolving with rescue\n- New dysphagia requiring formal swallow eval\n- Falls with injury\n- Functional decline at home with caregiver burnout\n\n**Admission orders checklist:** [2][3]\n\n☐ **Home med schedule reproduced EXACTLY** (drug, dose, time)\n☐ Mark levodopa as **STAT and SCHEDULED**, not PRN\n☐ NPO status with rotigotine patch bridge if dysphagia\n☐ Allergy/intolerance: haloperidol, metoclopramide, prochlorperazine, promethazine, droperidol, risperidone, olanzapine\n☐ Antiemetic: ondansetron only (NOT prochlorperazine, NOT metoclopramide)\n☐ Antipsychotic if needed: quetiapine 12.5-25 mg PO q6h PRN\n☐ Aspiration precautions: HOB 30-45°, NPO until swallow eval\n☐ PT/OT consult for fall prevention\n☐ Speech/swallow consult if dysphagia screen failed\n☐ Neurology consult (especially for medication adjustments)\n☐ Pharmacy consult for formulation verification\n☐ DVT prophylaxis\n☐ Skin care for rotigotine patch rotation\n\n**Reassess motor function q4h** and document any off-states with timing relative to medication.',
        citation: [1, 2, 3],
        summary: 'Floor admit: exact home meds STAT+scheduled, allergy flags, ondansetron only, quetiapine only, swallow eval, neurology.',
    },
    {
        id: 'pd-dispo-icu',
        type: 'info',
        module: 6,
        title: 'ICU Admission — PDH or Critical PD',
        body: '**ICU criteria:** [4][5][7]\n- PDH (parkinsonism-hyperpyrexia syndrome)\n- Severe autonomic instability\n- Hypoventilation, hypercapnia, intubation\n- Severe rhabdomyolysis (CK >10,000 or rising AKI)\n- Severe aspiration pneumonia with septic shock\n- Failure to oxygenate on the floor\n\n**ICU-specific orders:** [5][7]\n\n☐ **Continuous cardiac monitoring** (autonomic instability)\n☐ **Foley** for I/O monitoring (rhabdo, AKI)\n☐ **Aggressive IVF** (1-2 L bolus then maintenance)\n☐ **Active cooling** if T >38.5°C (evaporative + ice packs)\n☐ **NG tube** for levodopa if NPO\n☐ **Rotigotine 8 mg/24h** patch in parallel to NG levodopa\n☐ **Apomorphine SC** 2-6 mg q2-4h available as PRN rescue\n☐ **Dantrolene 1-2.5 mg/kg IV q6h** if severe rigidity\n☐ **Bromocriptine 2.5-5 mg PO/NG q8h** for severe PDH\n☐ **CK, BUN/Cr, K+, lactate, CBC, LFTs, coags q6h** initially\n☐ **Neurology consult immediately**\n☐ **Avoid ALL dopamine blockers** — chart flagged\n☐ **Sedation if needed:** propofol, dexmedetomidine, midazolam — NOT haloperidol, NOT droperidol\n\n**Intubation considerations:**\n- Rocuronium or succinylcholine for RSI both OK in PD\n- Avoid prolonged droperidol-based sedation\n- Propofol drip is preferred for ongoing sedation\n- Dexmedetomidine is PD-friendly (see Dexmedetomidine consult)\n\n**If DBS in place:** check device interrogation; battery failure can precipitate PDH.\n\n**Mortality 4-25% for PDH.** Aggressive early intervention saves lives.',
        citation: [4, 5, 7],
        summary: 'ICU: continuous monitoring, aggressive IVF/cooling, restart levodopa via NG + rotigotine, dantrolene + bromocriptine for severe, neurology immediately.',
        safetyLevel: 'critical',
    },
];
export const PARKINSON_ED_MODULE_LABELS = [
    'Medication Reconciliation',
    'Off-State vs Hyperpyrexic Crisis',
    'Aspiration Risk Screening',
    'Avoid Dopamine Blockers',
    'Levodopa Restart & Bridge',
    'Disposition',
];
export const PARKINSON_ED_NODE_COUNT = 20;
export const PARKINSON_ED_CITATIONS = [
    { num: 1, text: 'Aminoff MJ, Christine CW, Friedman JH, et al. Management of the hospitalized patient with Parkinson disease: current state of the field and need for guidelines. Parkinsonism Relat Disord. 2011;17(3):139-145. https://pubmed.ncbi.nlm.nih.gov/21159538/' },
    { num: 2, text: 'Gerlach OH, Winogrodzka A, Weber WE. Clinical problems in the hospitalized Parkinson\'s disease patient: systematic review. Mov Disord. 2011;26(2):197-208. https://pubmed.ncbi.nlm.nih.gov/21284037/' },
    { num: 3, text: 'Magdalinou KN, Martin A, Kessel B. Prescribing medications in Parkinson\'s disease (PD) patients during acute admissions to a District General Hospital. Parkinsonism Relat Disord. 2007;13(8):539-540. https://pubmed.ncbi.nlm.nih.gov/17347022/' },
    { num: 4, text: 'Newman EJ, Grosset DG, Kennedy PG. The parkinsonism-hyperpyrexia syndrome. Neurocrit Care. 2009;10(1):136-140. https://pubmed.ncbi.nlm.nih.gov/18712508/' },
    { num: 5, text: 'Mizuno Y, Takubo H, Mizuta E, Kuno S. Malignant syndrome in Parkinson\'s disease: concept and review of the literature. Parkinsonism Relat Disord. 2003;9 Suppl 1:S3-S9. https://pubmed.ncbi.nlm.nih.gov/12735909/' },
    { num: 6, text: 'Fox SH, Katzenschlager R, Lim SY, et al. International Parkinson and Movement Disorder Society evidence-based medicine review: update on treatments for the motor symptoms of Parkinson\'s disease. Mov Disord. 2018;33(8):1248-1266. https://pubmed.ncbi.nlm.nih.gov/29570866/' },
    { num: 7, text: 'Ikebe S, Harada T, Hashimoto T, et al. Prevention and treatment of malignant syndrome in Parkinson\'s disease: a consensus statement of the malignant syndrome research group. Parkinsonism Relat Disord. 2003;9 Suppl 1:S47-S49. https://pubmed.ncbi.nlm.nih.gov/12735915/' },
    { num: 8, text: 'Suttrup I, Warnecke T. Dysphagia in Parkinson\'s disease. Dysphagia. 2016;31(1):24-32. https://pubmed.ncbi.nlm.nih.gov/26590572/' },
    { num: 9, text: 'Suiter DM, Sloggy J, Leder SB. Validation of the Yale Swallow Protocol: a prospective double-blinded videofluoroscopic study. Dysphagia. 2014;29(2):199-203. https://pubmed.ncbi.nlm.nih.gov/24233810/' },
    { num: 10, text: 'Bohlega SA, Al-Foghom NB. Drug-induced Parkinson\'s disease: a clinical review. Neurosciences (Riyadh). 2013;18(3):215-221. https://pubmed.ncbi.nlm.nih.gov/23887211/' },
    { num: 11, text: 'Cereda E, Barichella M, Pedrolli C, Pezzoli G. Low-protein and protein-redistribution diets for Parkinson\'s disease patients with motor fluctuations: a systematic review. Mov Disord. 2010;25(13):2021-2034. https://pubmed.ncbi.nlm.nih.gov/20669318/' },
];
