// MedKitt — Acute Jaundice Hub (EM canonical + GI cross-list, type: 'hub')
//
// 5-Module skeleton per ~/Desktop/claude-brain/patterns/hub-consult-pattern.md v2:
//   1. Sick Check
//   2. Time-Critical Exclusions (10 branches → deep-dive consults / info pages)
//   3. Initial Bundle + Reassess
//   4. Imaging Decision
//   5. Disposition
//
// CROSS-LINK DIRECTIONALITY (R8): hub links INTO splits; splits never link back.
// Outbound #/tree/ targets validated against the repo on 2026-05-28:
//   acetaminophen, gallbladder, acute-pancreatitis, sepsis, abdominal-pain-hub
// Crown-jewel calculator: kings-college (ALF transplant criteria). Companions:
//   rumack-matthew, nac-dosing, qsofa, bisap.
export const ACUTE_JAUNDICE_HUB_NODES = [
    // ============================================================
    // Module 1 — Sick Check
    // ============================================================
    {
        id: 'aj-start',
        type: 'info',
        module: 1,
        title: 'Acute Jaundice Hub — Sick Check First',
        body: 'Yellow patient at the door. Before any framework, sort sick vs not-sick. The lethal layers stack fast in jaundice — encephalopathy, coagulopathy, septic shock from cholangitis, or a falling APAP-soaked liver.\n\nOpen first:\n- [Hub Steps Summary](#/info/aj-steps)\n- [Hub Stop / Pitfalls](#/info/aj-stop)\n\n**Scan in 60 seconds:** [1,2]\n- **General appearance** — scleral icterus visible at bili ~2.5 (skin ~4-5). Asterixis? Slurred speech? Tremor? End-of-bed ill?\n- **Mental status — West Haven grade** — grade ≥2 (lethargy, disorientation) + jaundice = treat as ALF until proven otherwise.\n- **Vitals trend** — hypotension + jaundice + fever = Reynolds pentad until proven otherwise. Tachypnea = compensating for metabolic acidosis (lactate from shock liver, sepsis, or hepatic failure).\n- **Skin / mucosa** — purpura, petechiae, ecchymosis, fresh IV-site bleeding = coagulopathy. Pallor + jaundice = hemolysis. Spider angiomata, palmar erythema = chronic liver disease overlay.\n- **Abdomen** — Murphy positive (cholangitis spectrum)? Hepatomegaly + ascites (Budd-Chiari, congestion)? Painless palpable gallbladder (Courvoisier sign — malignant obstruction)?\n\n**If ANY of:** West Haven ≥2 encephalopathy, INR ≥1.5 with AMS, Reynolds pentad, hypotension + jaundice, severe coagulopathic bleeding — **start resus parallel to workup.** Bay 1, IV × 2 large-bore, monitor, type and cross, lactate, ammonia, [N-acetylcysteine](#/drug/n-acetylcysteine/alf) ready, transplant center on the line.\n\n**The 4 questions that change the differential in 60 seconds:** [3]\n1. **Any acetaminophen exposure in last 24-72 hours — including therapeutic dosing?** (chronic supra-therapeutic kills as reliably as acute overdose — [APAP consult](#/tree/acetaminophen))\n2. **Fever + RUQ pain?** (Charcot triad → cholangitis until proven otherwise — antibiotics within 1 hour)\n3. **Confused or sleepy?** (encephalopathy + jaundice + no prior cirrhosis = acute liver failure)\n4. **Any prior hypotension / cardiac arrest / shock state in last 48 hours?** (ischemic hepatitis — AST/ALT >1000 with normal bilirubin early)',
        citation: [1, 2, 3],
        next: 'aj-exclusions',
        summary: 'Gestalt sick check + West Haven grade + 4-question screen (APAP, Charcot, encephalopathy, recent shock). Resus parallel if unstable, encephalopathic, or coagulopathic.',
        safetyLevel: 'critical',
    },
    // ============================================================
    // Module 2 — Time-Critical Exclusions
    // ============================================================
    {
        id: 'aj-exclusions',
        type: 'question',
        module: 2,
        title: 'Time-Critical Exclusions — Pick the One That Fits',
        body: 'Ask history first, then anchor on the lab and exam pivot. Each branch routes to a deep-dive or focused result and tells you the next 5-min action while you transition.',
        options: [
            {
                label: 'Fever + RUQ pain + jaundice (Charcot) ± hypotension / AMS (Reynolds)',
                description: 'Ascending cholangitis — antibiotics within 1 hour, GI for emergent ERCP',
                next: 'aj-exc-cholangitis',
                urgency: 'critical',
            },
            {
                label: 'Any acetaminophen exposure (acute or chronic supra-therapeutic) in last 72 h',
                description: 'APAP hepatotoxicity — Rumack-Matthew + NAC threshold; treat early, treat empirically',
                next: 'aj-exc-apap',
                urgency: 'critical',
            },
            {
                label: 'Encephalopathy + INR ≥1.5 + no known cirrhosis',
                description: 'Acute liver failure — Kings College criteria, NAC, transplant center NOW',
                next: 'aj-exc-alf',
                urgency: 'critical',
            },
            {
                label: 'Indirect hyperbili + anemia + ↑LDH + ↓haptoglobin + schistocytes',
                description: 'Massive hemolysis (TTP/HUS/MAHA/sickle/G6PD/AIHA) — type and cross, heme STAT',
                next: 'aj-exc-hemolysis',
                urgency: 'critical',
            },
            {
                label: 'AST/ALT >1000 + recent shock / cardiac arrest / hypotension',
                description: 'Ischemic hepatitis ("shock liver") — fix the upstream perfusion failure',
                next: 'aj-exc-ischemic',
                urgency: 'urgent',
            },
            {
                label: 'Painless jaundice + weight loss + age ≥50 (± Courvoisier sign)',
                description: 'Malignant biliary obstruction until proven otherwise — imaging + GI/onc',
                next: 'aj-exc-obstruction',
                urgency: 'urgent',
            },
            {
                label: 'Age <40 + hemolysis + low alk phos + AST:ALT >2 ± Kayser-Fleischer rings',
                description: 'Wilson disease de novo presentation — ceruloplasmin, 24h urine copper, hepatology',
                next: 'aj-exc-wilson',
                urgency: 'urgent',
            },
            {
                label: 'Abdominal pain + ascites + hepatomegaly + hypercoagulable state',
                description: 'Budd-Chiari syndrome — Doppler US, CT venogram, anticoag, hepatology',
                next: 'aj-exc-budd-chiari',
                urgency: 'urgent',
            },
            {
                label: 'Young female + AST/ALT very high + ↑IgG + ANA/SMA positive',
                description: 'Autoimmune hepatitis flare — steroids per hepatology, biopsy planning',
                next: 'aj-exc-aih',
                urgency: 'urgent',
            },
            {
                label: 'None of the above — stable, no encephalopathy, undifferentiated jaundice',
                description: 'Initial bundle + reassess at 60-90 min with labs back',
                next: 'aj-bundle',
            },
        ],
        citation: [1, 2, 3, 4],
        summary: 'Pick the most acute hit. Each branch links to its deep-dive or focused result + tells you the next 5-min action.',
        safetyLevel: 'critical',
    },
    // -------- Time-critical exclusion branch results --------
    {
        id: 'aj-exc-cholangitis',
        type: 'result',
        module: 2,
        title: 'Ascending Cholangitis — Charcot / Reynolds',
        body: 'Open [Gallbladder Disease](#/tree/gallbladder) for the full biliary pathway with Tokyo TG18 grading and ERCP triage.\n\n**Recognize the spectrum:**\n- **Charcot triad** (fever + jaundice + RUQ pain) — present in ~50-70% of cholangitis. Absence does NOT rule out.\n- **Reynolds pentad** (Charcot + hypotension + AMS) = severe (Tokyo Grade III) cholangitis. Mortality climbs sharply.\n- Use [qSOFA](#/calculator/qsofa) to flag sepsis physiology at triage.\n\n**Tokyo TG18 grading drives disposition speed:** [4]\n- **Grade I (mild):** responds to initial antibiotics; ERCP within 24-72 h.\n- **Grade II (moderate):** any of WBC <4 or >12, fever ≥39°C, age ≥75, bili ≥5, albumin <70% normal — early ERCP (<48 h).\n- **Grade III (severe):** organ dysfunction (CV, neuro, resp, renal, hepatic, heme) — **emergent ERCP / PTBD within 24 h** + ICU.\n\n**Next 5 minutes:** [4]\n- IV × 2 large-bore, monitor, lactate, blood cultures × 2 BEFORE antibiotics\n- CBC, CMP, lipase, INR/PT, GGT, alk phos, fractionated bili, type and screen\n- **Antibiotics within 1 hour:** [piperacillin-tazobactam 4.5 g IV](#/drug/piperacillin-tazobactam/cholangitis) OR [ceftriaxone 2 g IV](#/drug/ceftriaxone/cholangitis) + [metronidazole 500 mg IV](#/drug/metronidazole/cholangitis). Add vancomycin if healthcare-associated or hardware.\n- RUQ US first — dilated CBD, stones, sludge, GB wall thickening. MRCP if US non-diagnostic and ERCP not imminent.\n- **Emergent GI consult for ERCP** — source control is the priority. Grade III gets PTBD if ERCP unavailable.\n- IV fluids titrated to MAP ≥65, lactate clearance\n- Vasopressors if fluid-refractory (norepinephrine first)\n\n🛑 Do NOT delay antibiotics for the ERCP slot — give them within the first hour.\n🛑 Do NOT mistake Reynolds pentad for "encephalopathy from liver failure" — this is septic shock with biliary source. Source control changes the trajectory.',
        recommendation: 'Tokyo TG18 grade. Blood cultures → antibiotics within 1 hour. Emergent GI for ERCP / PTBD in Grade III. ICU if any organ failure.',
        confidence: 'definitive',
        citation: [4],
        safetyLevel: 'critical',
        calculatorLinks: [
            { id: 'qsofa', label: 'qSOFA (sepsis screen)' },
        ],
    },
    {
        id: 'aj-exc-apap',
        type: 'result',
        module: 2,
        title: 'Acetaminophen Hepatotoxicity',
        body: 'Open [Acetaminophen Toxicity](#/tree/acetaminophen) for the full pathway — risk stratification, [Rumack-Matthew](#/calculator/rumack-matthew) plotting, [NAC dosing](#/calculator/nac-dosing) (21-h IV or 72-h PO), King\'s College monitoring, hepatology / transplant escalation.\n\n**Three exposure patterns that all hurt:** [5]\n- **Acute single ingestion** with known time → 4-h-or-later level → plot on Rumack-Matthew nomogram.\n- **Repeated supra-therapeutic dosing** (>4 g/d in healthy adults, >2 g/d in EtOH/malnourished/chronic disease) — the nomogram does NOT apply. Treat empirically based on dose, AST/ALT, and APAP level.\n- **Delayed presentation (>24 h after ingestion)** — APAP level may be low or undetectable while AST/ALT skyrocket. NAC is still indicated; do NOT exclude APAP because the level came back negative late.\n\n**The lab pattern that screams APAP:**\n- **AST and ALT in the thousands** (often >3000-5000) — uncommon outside of APAP, ischemic hepatitis, severe viral hepatitis.\n- **Bili relatively spared early** (rises after Day 2-3).\n- **INR rising** — early marker of hepatocellular failure.\n- **Acidosis + AKI** (Day 2-4) — phase 3 of APAP poisoning.\n\n**Next 5 minutes:**\n- IV × 2, monitor\n- **Send APAP level immediately** (even if delayed presentation, even if patient denies — APAP level is mandatory on every "altered + jaundiced" case)\n- AST, ALT, INR, CMP, lipase, ABG with lactate, ammonia, ALT-APAP product (informs NAC continuation past 21 h)\n- **Start NAC empirically** if any of: ingestion >150 mg/kg, supra-therapeutic chronic dosing with elevated transaminases, delayed presentation with elevated AST/ALT, encephalopathy + jaundice with unclear cause. NAC has minimal harm and is also useful in non-APAP ALF. [6]\n- Activated charcoal 1 g/kg PO ONLY if ingestion within 1-2 hours AND airway protected\n- [Kings-College Criteria](#/calculator/kings-college) — monitor for transplant criteria from arrival\n- Transplant center notified early if encephalopathy, INR climbing, acidosis (pH <7.3 after resuscitation), or Cr rising\n- NPO; consider lactulose only if encephalopathic (controversial in pure ALF — discuss with transplant center)\n\n🛑 Do NOT trust a low APAP level in a delayed presentation. NAC is still indicated based on AST/ALT and clinical pattern.\n🛑 Do NOT discontinue NAC at 21 hours if INR >2, ALT >1000, or encephalopathy — continue until transplant decision or recovery.',
        recommendation: 'Send APAP level + treat empirically with NAC if any clinical concern. Kings College from arrival. Transplant center early if INR climbing or acidotic.',
        confidence: 'definitive',
        citation: [5, 6],
        safetyLevel: 'critical',
        calculatorLinks: [
            { id: 'rumack-matthew', label: 'Rumack-Matthew nomogram' },
            { id: 'nac-dosing', label: 'NAC dosing' },
            { id: 'kings-college', label: "King's College ALF criteria" },
        ],
    },
    {
        id: 'aj-exc-alf',
        type: 'result',
        module: 2,
        title: 'Acute Liver Failure — Any Cause',
        body: '**Definition (AASLD 2023):** encephalopathy + coagulopathy (INR ≥1.5) within 26 weeks of liver injury onset in a patient WITHOUT pre-existing cirrhosis. [7]\n\n**Subtypes by time-to-encephalopathy:**\n- **Hyperacute (<7 d):** APAP, ischemic, HSV — best transplant-free survival (~35%).\n- **Acute (8-28 d):** non-APAP DILI, autoimmune, indeterminate.\n- **Subacute (>28 d):** worst prognosis without transplant — biliary, indeterminate, autoimmune.\n\n**[King\'s College Criteria](#/calculator/kings-college) — the crown jewel for ED triage:** [7,8]\n- **APAP ALF transplant criteria:** arterial pH <7.3 after resuscitation OR (Cr >3.4 mg/dL + INR >6.5 + Grade III-IV encephalopathy).\n- **Non-APAP ALF transplant criteria:** INR >6.5 OR any 3 of: age <10 or >40, non-A/non-B hepatitis or DILI, jaundice-to-encephalopathy >7 d, INR >3.5, bili >17.5 mg/dL.\n- Meeting these = transplant center transfer NOW.\n\n**Next 5 minutes — the ALF bundle:** [7]\n- IV × 2 large-bore, central line if vasopressor needed, arterial line\n- **NAC** for ALL ALF, not just APAP — improves transplant-free survival in non-APAP ALF (Lee 2009 NEJM). [6]\n- Labs: CBC, CMP, INR/PT/PTT/fibrinogen, ammonia, lactate, ABG, APAP level, ceruloplasmin (<40 yo), viral hepatitis panel (HAV/HBV/HCV/HEV), HSV PCR, ANA/SMA/AMA, β-hCG, type and CROSS 4 units\n- Head CT if Grade III-IV encephalopathy (rule out hemorrhage; assess cerebral edema)\n- **Glucose monitoring q1h** (hypoglycemia from failed gluconeogenesis is common and lethal)\n- Avoid sedation unless intubating; if intubated, propofol low-dose, head of bed 30°, normocapnia, target normonatremia (Na 145-150 for ICP)\n- Vitamin K 10 mg IV (correct nutritional component) but DO NOT correct INR with FFP — INR is the prognostic marker; correcting it blinds the team\n- Lactulose for Grade ≥2 encephalopathy (controversial in pure ALF — discuss with transplant center)\n- Empiric broad-spectrum antibiotics if any concern for SBP or aspiration (low threshold)\n- **Transplant center call WITHIN 1 HOUR of recognition** — do not wait for labs to finalize\n\n🛑 Do NOT correct INR with FFP/PCC unless actively bleeding or going for invasive procedure — you erase the prognostic signal.\n🛑 Do NOT delay transplant center call to "stabilize first" — they want the patient early so transfer happens before cerebral edema closes the window.',
        recommendation: 'Kings College from arrival. NAC for ALL ALF. Glucose q1h. Vit K but NOT FFP. Transplant center within 1 hour of recognition.',
        confidence: 'definitive',
        citation: [6, 7, 8],
        safetyLevel: 'critical',
        calculatorLinks: [
            { id: 'kings-college', label: "King's College ALF criteria" },
            { id: 'nac-dosing', label: 'NAC dosing' },
        ],
    },
    {
        id: 'aj-exc-hemolysis',
        type: 'result',
        module: 2,
        title: 'Massive Hemolysis',
        body: 'Indirect hyperbilirubinemia + falling Hgb + ↑LDH + ↓haptoglobin + smear findings drives the workup. Etiology determines the next intervention.\n\n**Recognize the pattern:**\n- **Indirect (unconjugated) hyperbili** dominates — direct fraction <20% of total in pure hemolysis.\n- **LDH >1000** with **haptoglobin <10 mg/dL** = ~90% specific for hemolysis.\n- **Schistocytes on smear** → microangiopathic (TTP, HUS, DIC, malignant HTN, HELLP, mechanical valve).\n- **Spherocytes** → autoimmune hemolytic anemia or hereditary spherocytosis.\n- **Bite cells / Heinz bodies** → G6PD deficiency precipitant (drug, fava bean, infection).\n- **Sickled cells** → sickle cell crisis with hemolytic component.\n\n**Killers in this category:**\n- **TTP** (pentad: MAHA + thrombocytopenia + fever + AMS + renal failure) → emergency plasma exchange. Start steroids while waiting.\n- **HUS** (esp. peds + diarrheal prodrome) — supportive; avoid antibiotics in Shiga-toxin-producing E. coli.\n- **G6PD crisis** — remove precipitant; supportive transfusion.\n- **Sickle cell crisis with hyperhemolysis** — hematology emergent; transfusion can paradoxically worsen.\n- **AIHA with very low Hgb** — steroids, IVIG, transfusion (least-incompatible if needed).\n\n**Next 5 minutes:**\n- IV × 2, type and CROSS 2-4 units (least-incompatible if AIHA), monitor\n- CBC with diff, retic count, peripheral smear, LDH, haptoglobin, indirect bili, fibrinogen, INR/PTT, D-dimer, Coombs (direct antiglobulin)\n- BMP (creatinine for HUS/TTP), urinalysis (hemoglobinuria)\n- **Hematology consult emergent** if TTP or AIHA suspected\n- Plasma exchange line preparation (TTP)\n- IV fluids — avoid over-transfusion in TTP (can worsen)\n- If sickle cell: pain control, [oxygen if SpO2 <95%](#/drug/oxygen/hypoxia), exchange transfusion for severe crisis\n\n🛑 Do NOT delay plasma exchange in suspected TTP — mortality is ~90% untreated, <20% with PEX.\n🛑 Do NOT give platelets in TTP (can worsen microthrombi) unless catastrophic bleeding.',
        recommendation: 'Type and cross. Coombs + smear + LDH/haptoglobin. Heme consult for TTP/AIHA. PEX for TTP, steroids for AIHA.',
        confidence: 'definitive',
        citation: [9],
        safetyLevel: 'critical',
    },
    {
        id: 'aj-exc-ischemic',
        type: 'result',
        module: 2,
        title: 'Ischemic Hepatitis ("Shock Liver")',
        body: '**Pattern recognition:** AST and ALT in the **thousands** (often >25× ULN) within 24-72 hours of a hemodynamic insult — cardiac arrest, septic shock, hemorrhagic shock, severe heart failure exacerbation, post-arrest hypoperfusion, severe hypoxia. LDH is usually elevated proportionally (helpful: AST/LDH ratio <1.5 favors ischemic hepatitis over viral or APAP). [10]\n\n**Key distinguishing features from ALF:**\n- Bilirubin is relatively SPARED early (rises late) — direct contrast to ALF where bili climbs early.\n- INR is moderately elevated, NOT >2 in pure shock liver.\n- Encephalopathy is from the underlying shock state, not liver failure per se.\n- Trajectory: AST/ALT peak within 1-3 days and fall RAPIDLY (halving every 24-48 h) if upstream perfusion is restored. If they don\'t fall, reconsider the diagnosis (APAP, viral, autoimmune).\n\n**Next 5 minutes:**\n- **Fix the upstream cause — this is the only liver-directed therapy that works.**\n- Optimize MAP ≥65 with crystalloid + vasopressors as needed\n- Treat the cardiogenic / septic / hemorrhagic shock per its own pathway: [Sepsis](#/tree/sepsis), [Cardiogenic shock workup], MTP if hemorrhagic\n- Send APAP level (overlap presentations exist — patient in shock who also took APAP looks identical at first)\n- Send viral hepatitis serologies if any uncertainty\n- Echo if any concern for cardiogenic etiology (acute MI, tamponade, severe valve disease)\n- Repeat AST/ALT/INR/bili at 12-24 h — pattern (falling vs climbing) confirms vs refutes the diagnosis\n- Hepatology consult if pattern atypical or trajectory wrong\n\n🛑 Do NOT label as "shock liver" and stop thinking — APAP coingestion, indeterminate ALF, and acute hepatitis B can present identically. Keep the workup open until trajectory confirms.\n🛑 Do NOT give NAC routinely for shock liver — evidence is weak; reserve for cases with high APAP suspicion or persistent transaminitis.',
        recommendation: 'Fix the upstream shock. Send APAP + viral panel. Repeat LFTs at 12-24 h — rapid fall confirms ischemic hepatitis.',
        confidence: 'recommended',
        citation: [10],
        safetyLevel: 'warning',
    },
    {
        id: 'aj-exc-obstruction',
        type: 'result',
        module: 2,
        title: 'Painless Obstructive Jaundice',
        body: 'Painless jaundice + weight loss + age ≥50 = **malignant biliary obstruction until proven otherwise.** [11] Pancreatic head adenocarcinoma is the most common culprit; cholangiocarcinoma, ampullary tumors, and porta hepatis nodes also drive this presentation.\n\n**Recognize the pattern:**\n- **Painless** is the key differentiator from cholangitis or biliary colic.\n- **Courvoisier sign** — palpable, non-tender, distended gallbladder. Specific but not sensitive (<25%).\n- **Dark urine + pale stool** (cholestatic pattern with no urobilinogen reaching the gut).\n- **Pruritus** — bile salt deposition; often the most distressing symptom.\n- **Direct hyperbili dominant** (conjugated fraction >50%).\n- **Alk phos and GGT** elevated out of proportion to AST/ALT.\n- **Weight loss + new-onset DM** in an older adult should specifically trigger pancreatic cancer workup.\n\n**Next steps:**\n- CBC, CMP, fractionated bili, GGT, alk phos, AST/ALT, lipase, INR (cholestatic vit K malabsorption), CA 19-9, CEA\n- **RUQ US first** — dilated CBD (>6 mm in <60 yo, >8 mm in >60 yo) + intrahepatic ductal dilation = obstruction confirmed\n- **CT abdomen/pelvis with pancreatic protocol contrast** — mass identification, staging, vascular involvement, nodes\n- **MRCP** for biliary tree mapping if no clear mass on CT\n- GI consult for ERCP with stenting (decompression + brushings for cytology)\n- Oncology consult for biopsy and staging once mass identified\n- IR consult if ERCP fails — PTBD as backup\n\n**Disposition lane:**\n- Admit for biliary decompression workup unless very stable with rapid outpatient ERCP available (rare in practice — most go in)\n- Discharge home is generally not appropriate at first presentation — bili climbing, infection risk, malnutrition, pruritus, and rapid outpatient mobilization is hard\n\n🛑 Do NOT label this "viral hepatitis" — bili rising with cholestatic LFT pattern + no pain + age ≥50 is malignant until proven otherwise.\n🛑 Do NOT discharge without a clear and rapid outpatient plan for ERCP / oncology — these patients deteriorate quickly.',
        recommendation: 'RUQ US + CT pancreatic protocol. GI for ERCP with brushings. Admit for decompression workup. Outpatient discharge generally inappropriate.',
        confidence: 'recommended',
        citation: [11],
        safetyLevel: 'warning',
    },
    {
        id: 'aj-exc-wilson',
        type: 'result',
        module: 2,
        title: 'Wilson Disease — De Novo Presentation',
        body: 'Young adult (typically <40) with **acute liver failure pattern + Coombs-negative hemolysis + low alkaline phosphatase** is Wilson disease until proven otherwise. [12]\n\n**Pathognomonic lab pattern that should make you call it:**\n- **Alkaline phosphatase <40 IU/L** (low — opposite of obstruction)\n- **Alk phos to total bili ratio <4** (highly specific for Wilsonian ALF)\n- **AST:ALT ratio >2.2** (mitochondrial injury pattern)\n- **Coombs-negative hemolytic anemia** with indirect bili rise\n- **Low serum ceruloplasmin** (<20 mg/dL) — order from ED\n- **24-h urine copper >100 μg** — order from ED\n- **Kayser-Fleischer rings** on slit-lamp (request ophthalmology) — present in ~50% of hepatic-presentation Wilson\n\n**Why this matters:** Wilsonian ALF has the **worst transplant-free survival of any ALF subtype** (<10%). Patients typically need transplant. King\'s College criteria perform poorly; the New Wilson Index (Nazer/Dhawan modified) is preferred but rarely available real-time in the ED.\n\n**Next 5 minutes:**\n- IV × 2, monitor\n- CBC, smear (look for hemolysis), CMP, fractionated bili, INR/PT, ammonia, AST/ALT, alk phos\n- **Ceruloplasmin level + 24-h urine copper + serum copper** (start the 24-h collection from the ED)\n- Slit-lamp evaluation by ophthalmology\n- Echo for cardiomyopathy (Wilson cardiac involvement)\n- Hepatology consult emergent — transplant center transfer\n- Chelation (penicillamine, trientine) is NOT useful in fulminant Wilsonian ALF — transplant is the only definitive therapy\n- Plasma exchange or albumin dialysis (MARS) can bridge to transplant in some centers\n- Supportive ALF care (see ALF branch)\n\n🛑 Do NOT chelate first and "see how it goes" in fulminant Wilsonian ALF — transplant is the definitive therapy and chelation does not rescue the failing liver.\n🛑 Do NOT miss the alk phos:bili ratio — it is a 90-second bedside calculation that can clinch the diagnosis.',
        recommendation: 'Ceruloplasmin + 24-h urine copper + slit-lamp from ED. Hepatology + transplant center now. Chelation does not rescue fulminant Wilsonian ALF.',
        confidence: 'recommended',
        citation: [12],
        safetyLevel: 'warning',
    },
    {
        id: 'aj-exc-budd-chiari',
        type: 'result',
        module: 2,
        title: 'Budd-Chiari Syndrome',
        body: '**Triad:** abdominal pain + ascites + hepatomegaly + jaundice in a patient with hypercoagulable risk factors (myeloproliferative neoplasm, OCP, pregnancy/postpartum, malignancy, antiphospholipid syndrome, Factor V Leiden, paroxysmal nocturnal hemoglobinuria, Behçet disease, hepatic vein web). [13]\n\n**Recognize the pattern:**\n- Subacute: weeks-to-months of worsening abdominal distension, RUQ pain, hepatomegaly, ascites with high SAAG (transudate from portal HTN).\n- Acute: severe RUQ pain + rapid jaundice + ALF-like presentation can occur with sudden complete hepatic vein occlusion.\n- LFTs: variable — moderately elevated AST/ALT, climbing bili, INR rising as hepatocyte loss progresses.\n- Caudate lobe sparing on imaging (caudate has separate venous drainage to IVC).\n\n**Next 5 minutes:**\n- IV × 2, monitor\n- CBC, CMP, fractionated bili, INR/PT, AST/ALT, JAK2 V617F (for MPN), antiphospholipid panel, Factor V Leiden, PNH flow cytometry (CD55/CD59), pregnancy test\n- **Hepatic vein Doppler ultrasound** — non-invasive, sensitive (~85%) — shows absent/reversed flow, web, or thrombus\n- **CT venogram or MR venogram** for confirmation and intervention planning\n- Hepatology + IR consult emergent — TIPS is the typical first-line intervention; transplant if hepatic decompensation\n- **Anticoagulation** — heparin gtt or LMWH while bridging to definitive therapy\n- Manage ascites (diuretics + sodium restriction, large-volume paracentesis if tense)\n\n🛑 Do NOT discharge an unexplained ascites + jaundice + hepatomegaly patient without ruling out Budd-Chiari — Doppler US is fast and sensitive.\n🛑 Do NOT defer the hypercoagulability workup to outpatient — the etiology drives long-term anticoagulation strategy and BC can recur catastrophically.',
        recommendation: 'Hepatic vein Doppler US first. CT/MR venogram for planning. Heparin + hepatology + IR. TIPS / transplant per response.',
        confidence: 'recommended',
        citation: [13],
        safetyLevel: 'warning',
    },
    {
        id: 'aj-exc-aih',
        type: 'result',
        module: 2,
        title: 'Autoimmune Hepatitis Flare',
        body: '**Pattern:** young or middle-aged female + jaundice + AST/ALT often >1000 (sometimes >2000) + elevated IgG + positive ANA / SMA / anti-LKM1. [14] Can present as acute liver failure or sub-fulminant pattern. Co-existing autoimmune disease (Hashimoto, celiac, T1DM, vitiligo) raises pretest probability.\n\n**Recognize the pattern:**\n- AST/ALT-dominant (>1000 not unusual)\n- Elevated IgG (>2× ULN highly suggestive)\n- ANA, SMA, anti-LKM1, anti-SLA, anti-mitochondrial (for overlap with PBC)\n- Globulin gap on protein electrophoresis\n- Often emerges after viral infection, drug exposure (nitrofurantoin, minocycline, statins), or postpartum\n- Liver biopsy (interface hepatitis with plasma cells) is the diagnostic gold standard — usually done after hospitalization, NOT in ED\n\n**Next 5 minutes:**\n- IV × 2, monitor\n- CBC, CMP, fractionated bili, INR/PT/PTT, AST/ALT/GGT/alk phos, IgG, ANA, SMA, anti-LKM1, anti-SLA, anti-mitochondrial, viral hepatitis panel (rule out HBV/HCV), ceruloplasmin (if young), APAP level, β-hCG\n- RUQ US — rule out obstruction\n- Hepatology consult — steroids (prednisone 40-60 mg/d or methylprednisolone) ± azathioprine are mainstays; ED initiation is per hepatology guidance, NOT empiric\n- **AIH-ALF (encephalopathy + INR ≥1.5)** → transplant center transfer; meets King\'s College criteria via non-APAP track\n- NPO until disposition; thromboprophylaxis per bleed risk\n\n🛑 Do NOT start steroids empirically without hepatology buy-in unless ALF physiology and no alternative — steroids can worsen undiagnosed viral hepatitis or HSV hepatitis.\n🛑 Do NOT discharge an AIH-suspect patient with INR rising — disease can progress to ALF over days.',
        recommendation: 'Send ANA/SMA/IgG/LKM/SLA + viral panel from ED. Hepatology drives steroid timing. Transplant center if ALF criteria met.',
        confidence: 'recommended',
        citation: [14],
        safetyLevel: 'warning',
    },
    // ============================================================
    // Module 3 — Initial Bundle + Reassess
    // ============================================================
    {
        id: 'aj-bundle',
        type: 'info',
        module: 3,
        title: 'Initial Bundle — Undifferentiated Acute Jaundice',
        body: 'No life-threat hit yet; pattern fits a more measured workup. The bundle below is BROADER than the typical abdominal-pain bundle because the lethal causes hide in serologies and special studies that take hours to result. [1,2]\n\n**THE BUNDLE:**\n- **IV × 1-2, monitor**\n- **NS or LR 1-2 L bolus** if any volume responsive feature; otherwise maintenance\n- **NPO** until disposition / dietitian / hepatology guidance\n- **Antiemetic:** [Ondansetron 4 mg IV](#/drug/ondansetron/nausea-vomiting). Avoid sedating antiemetics if any AMS risk.\n- **Pain control if needed:** acetaminophen-free preparations only (use opioids sparingly; avoid NSAIDs if cirrhosis suspected). Consult hepatology before benzodiazepines (encephalopathy risk).\n- **Laboratory bundle (do them all at once — turnaround drives disposition):**\n  - CBC with diff, peripheral smear if hemolysis suspected\n  - CMP with **fractionated (direct + indirect) bilirubin**\n  - GGT + alk phos\n  - AST + ALT\n  - INR + PT + PTT + fibrinogen\n  - Lipase + amylase\n  - Ammonia (free-flowing venous sample, on ice)\n  - **APAP level — mandatory, even if patient denies exposure**\n  - Lactate, ABG if any organ dysfunction\n  - Type and screen (CROSS if any bleeding risk)\n  - Blood cultures × 2 if febrile\n  - Hepatitis panel — HAV IgM, HBsAg, anti-HBc IgM, HCV Ab + HCV RNA, HEV IgM\n  - HIV (acute hep workup standard)\n  - Iron studies + ferritin (hemochromatosis / acute iron-related injury)\n  - Ceruloplasmin if <40 yo\n  - ANA, SMA, anti-LKM1, IgG (autoimmune workup)\n  - Anti-mitochondrial Ab if cholestatic pattern (PBC)\n  - β-hCG (every reproductive-age female)\n  - LDH + haptoglobin + reticulocyte count if any hemolysis concern\n- **Imaging triage:** see Module 4\n\n**Reassess at 60-90 minutes** for response to bundle, lab returns, and emergence of red flags.',
        citation: [1, 2],
        next: 'aj-reassess',
        summary: 'IV + NPO + ondansetron + APAP-free analgesia + broad hepatic panel + APAP level (always) + viral / autoimmune / hemolysis workup. Reassess at 60-90 min.',
        safetyLevel: 'warning',
    },
    {
        id: 'aj-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess at 60-90 Minutes',
        body: 'Re-examine: West Haven grade, vitals trend, lab returns, imaging findings, ability to tolerate PO.',
        options: [
            {
                label: 'Lab pivot identified (high APAP / cholangitis / hemolysis / etc.) — branch fits',
                description: 'Return to time-critical exclusions and follow the pivot branch',
                next: 'aj-exclusions',
                urgency: 'urgent',
            },
            {
                label: 'No clear pivot + ongoing concern — needs imaging or extended observation',
                description: 'Proceed to imaging decision or ED obs unit with serial exams + repeat labs',
                next: 'aj-imaging',
            },
            {
                label: 'New encephalopathy / INR climbing / acidosis / hypotension',
                description: 'STOP. Go directly to the ALF pathway. Transplant center call NOW.',
                next: 'aj-exc-alf',
                urgency: 'critical',
            },
            {
                label: 'Stable + benign pattern + isolated unconjugated hyperbili (Gilbert / mild hemolysis)',
                description: 'Discharge bundle with outpatient hepatology follow-up',
                next: 'aj-dispo-discharge',
            },
        ],
        citation: [1, 2],
        summary: 'Pivot identified → exclusions branch. Equivocal → image/observe. New encephalopathy/INR climb → ALF pathway. Benign Gilbert pattern → discharge.',
    },
    // ============================================================
    // Module 4 — Imaging Decision
    // ============================================================
    {
        id: 'aj-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging Decision Cheat-Sheet',
        body: 'Imaging strategy in jaundice is question-driven, NOT shotgun. The question is "obstruction vs hepatocellular vs vascular?" [11]\n\n**RUQ US — first study in nearly every jaundice patient:**\n- Cheap, fast, no radiation, no contrast\n- Detects biliary dilation (sensitivity ~85% for obstruction)\n- Detects gallstones, sludge, cholecystitis features (wall thickening, pericholecystic fluid, sonographic Murphy)\n- Detects gross hepatic mass, ascites\n- Bedside POCUS is acceptable for a quick obstruction screen if formal US delayed\n\n**MRCP — for biliary tree mapping:**\n- Non-invasive, no contrast, gold standard for biliary anatomy\n- Use when: US shows dilation without clear cause; suspected stricture, cholangiocarcinoma, primary sclerosing cholangitis; need to plan ERCP\n- Not first-line in the unstable patient\n\n**CT abdomen/pelvis with IV contrast (pancreatic protocol if mass suspected):**\n- Use when: suspected malignancy, suspected pancreatitis with jaundice overlay, suspected abscess, trauma, indeterminate US with persistent suspicion\n- Identifies pancreatic head mass, hilar cholangiocarcinoma, hepatic metastases, vascular complications\n- IV contrast considerations: hold if Cr rising acutely; usually safe in stable ALF\n\n**CT angiography / venogram:**\n- Use when: suspected Budd-Chiari, portal vein thrombosis, hepatic artery thrombosis (post-transplant)\n- Pairs well with hepatic vein Doppler\n\n**Hepatobiliary scintigraphy (HIDA) / cholescintigraphy:**\n- Use when: clinical cholecystitis with non-diagnostic US, suspected biliary leak, biliary dyskinesia workup (outpatient)\n- Not first-line in the ED for jaundice itself\n\n**ERCP:**\n- Therapeutic + diagnostic combined — choledocholithiasis extraction, stenting for obstruction, biliary decompression in cholangitis, brushings for cytology\n- Performed by GI; not an ED study\n\n**MRI brain (if encephalopathic):**\n- Rule out cerebral edema in Grade III-IV encephalopathy before lumbar puncture or transfer\n- Head CT first (faster), MRI if CT non-diagnostic and concern persists\n\n**Sensitivity caveats:**\n- US misses early obstruction when ducts have not yet dilated — clinical picture overrides\n- CT misses early ischemic hepatitis; lab pattern + clinical context drives that diagnosis\n- "Normal imaging" never excludes hepatocellular causes — APAP, viral, autoimmune are LAB diagnoses',
        citation: [11],
        next: 'aj-dispo',
        summary: 'RUQ US first for nearly everyone. MRCP for biliary tree mapping. CT/CTA for mass / vascular workup. ERCP is therapeutic. "Normal imaging" does not rule out hepatocellular causes.',
    },
    // ============================================================
    // Module 5 — Disposition
    // ============================================================
    {
        id: 'aj-dispo',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Defer to deep-dive consult disposition criteria once a phenotype is committed. The framework below applies to undifferentiated jaundice or after the branch has been chosen.',
        options: [
            {
                label: 'Transplant center NOW — ALF, King\'s College met, Wilsonian ALF, refractory hemolysis with end-organ damage',
                description: 'Transfer to liver transplant center; bridge therapies en route',
                next: 'aj-dispo-transplant',
                urgency: 'critical',
            },
            {
                label: 'ICU admit — septic cholangitis, ischemic hepatitis with shock, ALF not yet meeting transplant criteria but trending wrong',
                description: 'ICU level of care; hourly neuro / glucose / coag monitoring',
                next: 'aj-dispo-icu',
                urgency: 'urgent',
            },
            {
                label: 'GI / Medicine floor — stable obstructive jaundice awaiting ERCP, stable workup-in-progress hepatitis, stable post-transfusion hemolysis',
                description: 'Floor admission with appropriate consult service primary',
                next: 'aj-dispo-floor',
            },
            {
                label: 'Discharge — isolated unconjugated hyperbili (Gilbert pattern), stable known cirrhosis at baseline, very mild non-progressive pattern with reliable f/u',
                description: 'Standard discharge bundle for benign-pattern jaundice with outpatient hepatology',
                next: 'aj-dispo-discharge',
            },
        ],
        citation: [1, 2],
        summary: 'Transplant center if ALF / King\'s College met. ICU for cholangitic shock / shock liver / progressing ALF. Floor for stable workup. Discharge only for Gilbert / mild stable patterns.',
    },
    {
        id: 'aj-dispo-transplant',
        type: 'result',
        module: 5,
        title: 'Transplant Center Transfer — Criteria & Bundle',
        body: '**Indications for emergent transplant center transfer:** [7,8]\n- **Acute liver failure** meeting [King\'s College Criteria](#/calculator/kings-college):\n  - **APAP track:** arterial pH <7.3 after resuscitation OR (Cr >3.4 + INR >6.5 + Grade III-IV encephalopathy)\n  - **Non-APAP track:** INR >6.5 OR any 3 of: age <10 or >40, non-A/non-B/DILI etiology, jaundice-to-encephalopathy >7 d, INR >3.5, bili >17.5\n- **Wilsonian ALF** (poor prognosis without transplant regardless of criteria)\n- **ALF with rapidly progressing encephalopathy or cerebral edema concern**\n- **Refractory metabolic disturbance** despite optimal medical therapy\n\n**Pre-transfer bundle:**\n- Confirm transplant center acceptance and accepting attending name\n- Confirm transport mode (rotor / fixed-wing / ground ALS — based on distance + acuity)\n- Type and CROSS 4 units pRBC + 4 units FFP (for procedural needs at receiving center)\n- Stabilize airway — intubate ahead of transport if Grade III-IV encephalopathy (don\'t crash en route)\n- **NAC continuing** at appropriate rate (do not stop for transfer)\n- Glucose check + D10W infusion if needed\n- **Avoid** sedation that confounds neuro exam at receiving center; if intubated, propofol low-dose\n- Vitamin K 10 mg IV (don\'t correct INR with FFP unless bleeding or procedure imminent)\n- Foley + accurate I/O\n- Empiric broad-spectrum antibiotics if any SBP / aspiration concern\n- Head of bed 30°, normocapnia target, normonatremia target (Na 145-150)\n- Family contact + advance directive review at sending facility\n- Complete handoff document: timeline of injury, all labs trend (especially INR, bili, AST/ALT, ammonia, glucose, Cr), all interventions, current drips, code status, family contacts\n\n🛑 Do NOT delay transfer for confirmatory imaging or "stabilization" — the receiving center wants the patient early.\n🛑 Do NOT extubate or wean drips immediately pre-transport.',
        recommendation: 'Confirm accepting attending + transport. Intubate before transport if Grade III-IV. Continue NAC. Vit K but NOT FFP unless bleeding. Complete handoff doc.',
        confidence: 'definitive',
        citation: [7, 8],
        safetyLevel: 'critical',
        calculatorLinks: [
            { id: 'kings-college', label: "King's College ALF criteria" },
        ],
    },
    {
        id: 'aj-dispo-icu',
        type: 'result',
        module: 5,
        title: 'ICU Admission',
        body: 'ICU level of care for jaundice patients meeting any of: [1,2,7]\n- Septic shock from cholangitis (Tokyo TG18 Grade III)\n- Ischemic hepatitis with ongoing hemodynamic instability\n- ALF not yet meeting transplant criteria but trending wrong (rising INR, climbing ammonia, hypoglycemia despite D10W, falling MAP, rising Cr)\n- Reynolds pentad without immediate ERCP availability — bridge with antibiotics + pressors + PTBD\n- Massive hemolysis with end-organ damage (TTP, HUS with renal failure, AIHA with cardiac strain)\n- Severe coagulopathic bleeding\n- Wilsonian ALF awaiting transplant center transfer\n- Encephalopathy Grade ≥2 with airway protection concern\n\n**ICU bundle:**\n- Arterial line + central line as needed\n- Hourly neuro checks (West Haven grade trend)\n- Hourly glucose checks (ALF gluconeogenesis failure)\n- q2-4 h coag panel (INR trend is prognostic — do NOT correct with FFP unless bleeding or procedure)\n- q6 h ammonia trend\n- Vit K 10 mg IV daily\n- Lactulose for Grade ≥2 encephalopathy (controversial in pure ALF — coordinate with hepatology / transplant center)\n- Empiric broad-spectrum antibiotics threshold low (SBP, aspiration risk)\n- Glucose D10W infusion if any hypoglycemia\n- NPO; nutrition per hepatology\n- Head of bed 30°, normocapnia, normonatremia\n- Hepatology + transplant center daily contact\n- Critical-care nephrology if Cr rising (CRRT preferred over IHD for hemodynamic stability)\n\n🛑 Do NOT correct INR with FFP unless actively bleeding or pre-procedure.\n🛑 Do NOT delay transplant center call to "see if they get better" — patients can crash overnight.',
        recommendation: 'ICU with hourly neuro/glucose, q2-4h coag, q6h ammonia. Vit K daily, NOT FFP. Low threshold for empiric antibiotics. Hepatology + transplant center daily contact.',
        confidence: 'recommended',
        citation: [1, 2, 7],
        safetyLevel: 'critical',
    },
    {
        id: 'aj-dispo-floor',
        type: 'result',
        module: 5,
        title: 'Floor Admission',
        body: 'Floor-level admission appropriate for: [1,2]\n- Stable obstructive jaundice awaiting ERCP (no cholangitis features, no shock, stable vitals)\n- Stable hepatitis workup in progress (viral, autoimmune, drug-induced) without encephalopathy or coagulopathy\n- Stable post-transfusion hemolysis without ongoing hemodynamic concern\n- Acute pancreatitis with mild jaundice (link to [Acute Pancreatitis](#/tree/acute-pancreatitis) for severity scoring)\n- Tokyo Grade I-II cholangitis after antibiotic initiation and clinical improvement (ERCP within 24-72 h)\n\n**Service selection:**\n- **GI / hepatology primary** for: ERCP-pending obstruction, hepatitis workup, decompensated chronic liver disease ruling out ACLF\n- **Surgical service** for: cholecystitis with surgical consult on board, complicated biliary disease with planned operative intervention\n- **Medicine primary with hepatology consult** for: mild hepatitis, mild ischemic hepatitis post-resuscitation, stable autoimmune workup\n- **Hematology consult** for: post-transfusion hemolysis monitoring, AIHA on steroids\n- **Oncology consult** for: confirmed or suspected malignant biliary obstruction\n\n**Floor admission requirements:**\n- Vitals stable (no vasopressor need)\n- West Haven grade 0-1 (no encephalopathy of clinical concern)\n- INR <2 (rising INR ≥2 is not floor-appropriate)\n- No active bleeding\n- Able to protect airway\n- Pain controlled\n- Reliable parameters for escalation (rapid-response criteria established)\n\n**Handoff content (one-pass):**\n1. Etiology committed-to vs differential remaining\n2. APAP level (always state)\n3. AST / ALT / INR / bili / alk phos trends\n4. Imaging results\n5. Antibiotics given (drug + time) + plan duration\n6. Pending serologies (hepatitis panel, autoimmune workup, ceruloplasmin) and expected ETA\n7. ERCP / procedural plan + service contacted\n8. Coagulation status — Vit K given? FFP / PCC given (and why)?\n9. Hepatology / GI / oncology consult names and call-back times\n10. Code status + advance directives',
        recommendation: 'Floor admit per dominant diagnosis. Service primary by diagnosis. Confirm stability criteria. Handoff covers serology ETAs and consult call-back times.',
        confidence: 'recommended',
        citation: [1, 2],
        safetyLevel: 'warning',
    },
    {
        id: 'aj-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge — Universal Checklist',
        body: '**Discharge is rare in acute jaundice and requires:** [1,2]\n\n1. **Isolated indirect hyperbili pattern fitting Gilbert syndrome:**\n   - Indirect bili dominant (direct <20% of total)\n   - Total bili usually <5 mg/dL, often <3\n   - Normal AST / ALT / alk phos / GGT / CBC / smear\n   - Asymptomatic or only mild fatigue\n   - Common triggers identified (fasting, illness, dehydration, exertion)\n   - **Confirm Gilbert with outpatient repeat** — never label on a single ED visit if pattern atypical\n2. **Known stable cirrhosis at baseline** with no acute decompensation (no AMS, no GI bleed, no SBP signs, no Cr rise, no new ascites)\n3. **Very mild non-progressive viral hepatitis** with stable labs, no coagulopathy, no encephalopathy, reliable f/u within 48-72 h\n4. **Mild hemolysis with known stable etiology** (sickle trait, hereditary spherocytosis at baseline) and no end-organ involvement\n\n**Universal prerequisites:**\n- INR <1.5\n- No encephalopathy (West Haven 0)\n- AST / ALT not rising\n- Bili not rapidly climbing\n- Tolerating PO\n- β-hCG documented in reproductive-age females\n- APAP level documented as negligible\n- Hepatitis panel + autoimmune workup pending OR negative (depends on pretest probability)\n- **Written return precautions** covering:\n  - Worsening yellowing\n  - Confusion, drowsiness, personality change\n  - New abdominal pain, especially RUQ + fever\n  - Vomiting that prevents PO\n  - Dark urine + light stool worsening\n  - Bleeding (nose, gums, GI, IV-site)\n  - Itching that does not respond to outpatient measures\n- **48-72 h follow-up arranged with hepatology or PCP** — booked, not just recommended\n- **Avoid hepatotoxic agents** until cleared: NO acetaminophen, NO NSAIDs, NO alcohol, NO new supplements (kava, comfrey, chaparral, jin bu huan, herbal stacks)\n- **Driving / occupational restrictions** if any encephalopathy concern\n\n🛑 **Do NOT discharge if ANY of:**\n- Encephalopathy, even mild\n- INR ≥1.5 of any etiology\n- AST / ALT climbing on serial labs\n- Bili rapidly climbing\n- New jaundice in age ≥50 without clear non-malignant explanation\n- Painless obstructive pattern (these go in)\n- Unable to confirm pregnancy status\n- Unable to arrange rapid outpatient follow-up\n- Unable to abstain from hepatotoxic agents reliably\n- Cannot return reliably for recheck',
        recommendation: 'Discharge only for Gilbert / known stable baseline / very mild non-progressive pattern. INR <1.5, no encephalopathy, PO tolerated, written precautions, 48-72 h hepatology / PCP recheck.',
        confidence: 'definitive',
        citation: [1, 2],
        safetyLevel: 'warning',
    },
];
export const ACUTE_JAUNDICE_HUB_CRITICAL_ACTIONS = [
    { text: 'Sick check FIRST — West Haven grade + 4-question screen (APAP, Charcot, encephalopathy, recent shock). Resus parallel if unstable, encephalopathic, or coagulopathic.', nodeId: 'aj-start' },
    { text: 'Charcot triad (fever + RUQ pain + jaundice) → cholangitis. Blood cultures → antibiotics within 1 hour. Emergent ERCP for Tokyo Grade III.', nodeId: 'aj-exc-cholangitis' },
    { text: 'Send APAP level on EVERY jaundice + altered patient — even with no reported exposure. Start NAC empirically if any clinical concern; do not trust a low level in delayed presentation.', nodeId: 'aj-exc-apap' },
    { text: 'ALF = encephalopathy + INR ≥1.5 + no known cirrhosis. Kings College from arrival. NAC for ALL ALF (not just APAP). Transplant center call within 1 hour.', nodeId: 'aj-exc-alf' },
    { text: 'Do NOT correct INR with FFP in ALF unless actively bleeding or pre-procedure — it erases the prognostic signal.', nodeId: 'aj-exc-alf' },
    { text: 'Massive hemolysis pattern (indirect bili + ↓haptoglobin + ↑LDH + smear) → heme consult; suspected TTP → emergency plasma exchange, NO platelets.', nodeId: 'aj-exc-hemolysis' },
    { text: 'AST/ALT >1000 + recent shock state = ischemic hepatitis. Fix the upstream perfusion failure. Repeat LFTs at 12-24 h — rapid fall confirms diagnosis.', nodeId: 'aj-exc-ischemic' },
    { text: 'Painless jaundice + weight loss + age ≥50 = malignant obstruction until proven otherwise. RUQ US + CT pancreatic protocol + GI for ERCP.', nodeId: 'aj-exc-obstruction' },
    { text: 'Young patient + ALF + low alk phos + Coombs-negative hemolysis = Wilson disease. Order ceruloplasmin + 24-h urine copper + slit-lamp from ED. Transplant is definitive therapy.', nodeId: 'aj-exc-wilson' },
    { text: 'Glucose monitoring q1h in any suspected ALF — hypoglycemia from failed gluconeogenesis is common and lethal.', nodeId: 'aj-exc-alf' },
    { text: 'Initial bundle includes broad serology stack at once (hepatitis panel, ANA/SMA/IgG, ceruloplasmin if <40, APAP level, hemolysis workup) — turnaround drives disposition.', nodeId: 'aj-bundle' },
    { text: 'New encephalopathy or INR climbing after the bundle = STOP, go directly to ALF pathway and call transplant center.', nodeId: 'aj-reassess' },
    { text: 'Discharge requires INR <1.5, no encephalopathy, no rising LFTs/bili, APAP negligible, β-hCG documented, 48-72 h hepatology/PCP recheck booked, written precautions, abstain from hepatotoxic agents.', nodeId: 'aj-dispo-discharge' },
];
export const ACUTE_JAUNDICE_HUB_CITATIONS = [
    { num: 1, text: 'Roche SP, Kobos R. Jaundice in the adult patient. Am Fam Physician. 2004;69(2):299-304.' },
    { num: 2, text: 'Fargo MV, Grogan SP, Saguil A. Evaluation of jaundice in adults. Am Fam Physician. 2017;95(3):164-168.' },
    { num: 3, text: 'EMCrit Podcast 386 — Acute Liver Failure (Pirani H). 2025.' },
    { num: 4, text: 'Kiriyama S, Kozaka K, Takada T, et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholangitis. J Hepatobiliary Pancreat Sci. 2018;25(1):17-30.' },
    { num: 5, text: 'Heard KJ. Acetylcysteine for acetaminophen poisoning. N Engl J Med. 2008;359(3):285-292.' },
    { num: 6, text: 'Lee WM, Hynan LS, Rossaro L, et al. Intravenous N-acetylcysteine improves transplant-free survival in early stage non-acetaminophen acute liver failure. Gastroenterology. 2009;137(3):856-864.' },
    { num: 7, text: 'AASLD Practice Guidance — Acute Liver Failure 2023. Hepatology. 2023;77(3):1036-1065.' },
    { num: 8, text: "O'Grady JG, Alexander GJ, Hayllar KM, Williams R. Early indicators of prognosis in fulminant hepatic failure. Gastroenterology. 1989;97(2):439-445." },
    { num: 9, text: 'Phillips J, Henderson AC. Hemolytic anemia: evaluation and differential diagnosis. Am Fam Physician. 2018;98(6):354-361.' },
    { num: 10, text: 'Henrion J. Hypoxic hepatitis. Liver Int. 2012;32(7):1039-1052.' },
    { num: 11, text: 'EB Medicine — Emergency Department Evaluation and Management of Jaundice. Emerg Med Pract. 2018.' },
    { num: 12, text: 'Schilsky ML, Roberts EA, Bronstein JM, et al. AASLD Practice Guidance on Wilson Disease 2022. Hepatology. 2023;77(4):1428-1455.' },
    { num: 13, text: 'Northup PG, Garcia-Pagan JC, Garcia-Tsao G, et al. Vascular liver disorders, portal vein thrombosis, and procedural bleeding in patients with liver disease: AASLD Practice Guidance. Hepatology. 2021;73(1):366-413.' },
    { num: 14, text: 'Mack CL, Adams D, Assis DN, et al. Diagnosis and management of autoimmune hepatitis in adults and children: 2019 practice guidance. Hepatology. 2020;72(2):671-722.' },
];
export const ACUTE_JAUNDICE_HUB_NODE_COUNT = ACUTE_JAUNDICE_HUB_NODES.length;
export const ACUTE_JAUNDICE_HUB_MODULE_LABELS = [
    'Sick Check',
    'Time-Critical Exclusions',
    'Initial Bundle + Reassess',
    'Imaging',
    'Disposition',
];
