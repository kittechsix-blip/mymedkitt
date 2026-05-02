// MedKitt — Typhoid Fever Management
// Recognition & Travel History → Diagnosis → Resistance-Based Treatment → Complications → Disposition → Prevention
// 6 modules: Recognition → Diagnosis → Treatment → Complications → Disposition → Prevention
// ~28 nodes total.
export const TYPHOID_FEVER_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION & TRAVEL HISTORY
    // =====================================================================
    {
        id: 'typhoid-start',
        type: 'question',
        module: 1,
        title: 'Typhoid Fever — Recognition',
        body: '[Typhoid Fever Steps Summary](#/info/typhoid-steps)\n\n**Typhoid fever** is a systemic infection caused by *Salmonella enterica* serovar Typhi. Endemic in South Asia, Africa, Latin America, and the Caribbean. [1][2]\n\n**Key Principles:**\n• **Travel history is critical** — 85% of US cases are travelers returning from endemic areas\n• Classic presentation (stepladder fever, rose spots, bradycardia) is **rare now** — present in <12% of contemporary cases\n• **Blood cultures before antibiotics** — gold standard\n• **Avoid fluoroquinolones empirically** — >70% resistance in US cases\n• **XDR typhoid** (Pakistan/Iraq) — resistant to ceftriaxone; use azithromycin or meropenem\n\n**Red flags for complications (week 2-3):**\n• Severe abdominal pain → intestinal perforation\n• GI bleeding → hemorrhage from ulcers\n• Altered mental status → typhoid encephalopathy\n\nHas the patient traveled to an endemic region within the past 60 days?',
        citation: [1, 2],
        calculatorLinks: [
            { id: 'typhoid-endemic-regions', label: 'Endemic Regions' },
            { id: 'typhoid-xdr-risk', label: 'XDR Risk Assessment' },
        ],
        options: [
            {
                label: 'Yes — Pakistan or Iraq',
                description: 'High risk of XDR typhoid — requires different empiric therapy',
                next: 'typhoid-xdr-path',
                urgency: 'urgent',
            },
            {
                label: 'Yes — Other Endemic Area',
                description: 'South Asia (India, Bangladesh), Africa, Latin America, Caribbean',
                next: 'typhoid-presentation',
            },
            {
                label: 'No Travel / Unknown',
                description: 'Consider alternative diagnoses; rare exceptions exist',
                next: 'typhoid-no-travel',
            },
        ],
        summary: 'Travel history drives empiric therapy — Pakistan/Iraq = XDR risk; avoid fluoroquinolones (>70% resistant)',
        safetyLevel: 'critical',
    },
    {
        id: 'typhoid-xdr-path',
        type: 'info',
        module: 1,
        title: 'XDR Typhoid Alert — Pakistan/Iraq',
        body: '**Extensively Drug-Resistant (XDR) Typhoid** is endemic in Pakistan and Iraq since 2016 outbreak. [3][4]\n\n**XDR Definition:**\nResistant to:\n• Ampicillin\n• Chloramphenicol\n• Trimethoprim-sulfamethoxazole\n• Fluoroquinolones\n• **Third-generation cephalosporins** (ceftriaxone)\n\n**Only effective agents:**\n• **[Azithromycin](#/drug/azithromycin/typhoid)** — first-line for uncomplicated XDR\n• **[Meropenem](#/drug/meropenem/typhoid)** — for complicated/severe XDR\n\n**Clinical Outcomes:**\n• Defervescence time similar to non-XDR (~6-7 days)\n• Mortality still <1% with appropriate therapy\n• Vaccine highly effective (97% in Pakistan outbreak)\n\n**Empiric therapy for Pakistan/Iraq travelers:**\n• Uncomplicated → Azithromycin\n• Complicated/severe → Meropenem ± Azithromycin\n• **Do NOT use ceftriaxone empirically**',
        citation: [3, 4],
        next: 'typhoid-presentation',
        summary: 'XDR typhoid: ceftriaxone will fail — use azithromycin (uncomplicated) or meropenem (severe)',
        safetyLevel: 'critical',
    },
    {
        id: 'typhoid-no-travel',
        type: 'info',
        module: 1,
        title: 'No Travel History — Low Probability',
        body: '**Without endemic travel, typhoid is very rare in the US.** [1][2]\n\n**Rare exceptions:**\n• Contact with a chronic carrier (1-4% of infected become carriers)\n• Consumption of contaminated food from endemic region\n• Laboratory exposure\n• Non-endemic traveler visiting friends/relatives who traveled\n\n**Alternative diagnoses to consider:**\n• Malaria (if mosquito-endemic area)\n• Dengue, Zika, chikungunya\n• Leptospirosis\n• Rickettsial infections\n• Bacterial sepsis\n• Influenza, COVID-19\n• Enteric fever from paratyphoid (*S. Paratyphi A/B/C*)\n\n**If clinical suspicion remains high:**\n• Re-confirm travel history (ask about food sources)\n• Obtain blood cultures\n• Consider infectious disease consultation',
        citation: [1, 2],
        next: 'typhoid-presentation',
        summary: 'No travel: typhoid rare — consider malaria, dengue, rickettsial infections, or bacterial sepsis',
        skippable: true,
    },
    {
        id: 'typhoid-presentation',
        type: 'info',
        module: 1,
        title: 'Clinical Presentation',
        body: '**Classic presentation is now rare** — maintain high index of suspicion in travelers with fever. [1][2][5]\n\n**Timeline by Week:**\n\n| Week | Findings |\n|------|----------|\n| **Week 1** | Insidious fever (rises gradually), headache, profound fatigue, myalgias |\n| **Week 2** | Persistent high fever (39-40°C), rose spots, relative bradycardia, hepatosplenomegaly |\n| **Week 3+** | Complications: perforation, hemorrhage, encephalopathy |\n\n**Common ED presentation:**\n• Fever (95%)\n• Headache (48%)\n• Abdominal pain (43%)\n• Diarrhea (29%) — or constipation\n• Average 7.9 days of symptoms before ED visit\n\n**Classic findings (now uncommon):**\n• Stepladder fever — **<12%** of cases\n• Rose spots (pink 2-3mm papules on trunk) — **<10%** of US cases\n• Relative bradycardia (Faget sign) — **~50%** of cases\n• "Pea soup" diarrhea — late finding\n\n**Lab findings:**\n• Leukopenia (NOT leukocytosis) — 33%\n• Mild transaminitis\n• Thrombocytopenia',
        citation: [1, 2, 5],
        next: 'typhoid-diagnosis',
        summary: 'Classic presentation rare now — fever + headache + abdominal pain in traveler = suspect typhoid',
    },
    // =====================================================================
    // MODULE 2: DIAGNOSIS
    // =====================================================================
    {
        id: 'typhoid-diagnosis',
        type: 'info',
        module: 2,
        title: 'Diagnostic Workup',
        body: '**Blood culture is the gold standard** — send BEFORE antibiotics. [1][2][6]\n\n**Blood Culture:**\n• Sensitivity 60-80% in week 1 of untreated illness\n• Sensitivity drops to 20-30% after week 1\n• Takes 3-5 days for final result\n• Draw 2-3 sets before initiating antibiotics\n\n**Bone Marrow Culture:**\n• Sensitivity ~80% even in week 2+ of illness\n• Can remain positive despite antibiotic therapy\n• Rarely obtained in ED but valuable if blood cultures negative + high suspicion\n\n**Stool Culture:**\n• Lower sensitivity than blood culture\n• May be positive in later stages\n• Useful for identifying chronic carriers\n\n**Adjunct Labs:**\n• CBC (leukopenia, thrombocytopenia common)\n• BMP (AKI in severe cases)\n• LFTs (mild transaminitis)\n• Lactate, glucose if severe\n• CRP/ESR elevated\n\n**Imaging:**\n• CT abdomen if perforation suspected (week 2-3 complication)',
        citation: [1, 2, 6],
        next: 'typhoid-widal-warning',
        summary: 'Blood culture BEFORE antibiotics — 60-80% sensitive week 1; repeat if negative + high suspicion',
    },
    {
        id: 'typhoid-widal-warning',
        type: 'info',
        module: 2,
        title: 'Widal Test — Do NOT Use',
        body: '**The Widal test is unreliable and should NOT be used for acute diagnosis.** [6][7]\n\n**Why Widal fails:**\n• Poor sensitivity (63-82%) and specificity (18-73%)\n• Single positive test unreliable — especially in endemic areas (high baseline antibodies)\n• Takes 7-14 days for antibodies to rise (useless for acute decision-making)\n• Cross-reacts with non-typhoidal Salmonella, malaria, dengue\n• False positives from prior vaccination\n\n**In endemic countries:**\n• Widal remains widely used due to availability/cost\n• Should NOT influence ED management decisions\n• Treat based on clinical suspicion + blood culture results\n\n**Newer rapid tests:**\n• Typhidot: faster, more sensitive; not standard in US\n• PCR: 82.7% sensitivity, 100% specificity; limited availability\n• Point-of-care antibody tests: insufficient sensitivity/specificity\n\n**Bottom line:** Clinical diagnosis + blood cultures. Do NOT wait for or rely on Widal test.',
        citation: [6, 7],
        next: 'typhoid-severity',
        summary: 'Widal test is a trap — poor sensitivity/specificity; do NOT use for acute diagnosis',
        safetyLevel: 'warning',
    },
    // =====================================================================
    // MODULE 3: RESISTANCE-BASED TREATMENT
    // =====================================================================
    {
        id: 'typhoid-severity',
        type: 'question',
        module: 3,
        title: 'Severity Assessment',
        body: '**Assess severity to guide treatment intensity and disposition.** [1][2][8]\n\n**Complicated/Severe Typhoid:**\n• Altered mental status (typhoid encephalopathy)\n• Hemodynamic instability (SBP <100 mmHg, tachycardia)\n• Signs of sepsis or septic shock\n• GI bleeding or suspected perforation\n• Unable to tolerate oral medications\n• Severe dehydration unresponsive to oral fluids\n• Immunocompromised patient\n• Age >50 or very young children\n\n**Uncomplicated Typhoid:**\n• Stable vital signs\n• Tolerating oral intake\n• No end-organ dysfunction\n• No altered mental status\n• Reliable access to follow-up\n\nIs the patient hemodynamically stable with no complications?',
        citation: [1, 2, 8],
        options: [
            {
                label: 'Uncomplicated — Stable',
                description: 'Stable vitals, tolerating PO, no altered mental status',
                next: 'typhoid-uncomplicated-tx',
            },
            {
                label: 'Complicated/Severe',
                description: 'Hemodynamic instability, altered mental status, GI bleeding, or unable to take PO',
                next: 'typhoid-complicated-tx',
                urgency: 'urgent',
            },
        ],
        summary: 'Complicated = AMS, shock, GI bleeding, unable to take PO; uncomplicated = stable + tolerating oral',
    },
    {
        id: 'typhoid-uncomplicated-tx',
        type: 'question',
        module: 3,
        title: 'Uncomplicated Typhoid — Treatment by Region',
        body: '**Empiric antibiotic selection depends on travel region due to resistance patterns.** [3][4][8]\n\n**Key Resistance Patterns:**\n\n| Region | Resistance | Empiric Therapy |\n|--------|------------|------------------|\n| **Pakistan/Iraq** | XDR (ceftriaxone-resistant) | Azithromycin |\n| **India, Bangladesh** | MDR + FQ-resistant | Ceftriaxone or Azithromycin |\n| **Africa, Latin America** | Variable MDR | Ceftriaxone or Azithromycin |\n\n**AVOID empirically:**\n• **Fluoroquinolones** — >70% resistance in US cases\n• Ampicillin, chloramphenicol, TMP-SMX — global MDR\n\n**Duration:**\n• Uncomplicated: 7 days total (can be IV→oral)\n• Mean time to defervescence: 5-7 days\n\nWhere did the patient travel?',
        citation: [3, 4, 8],
        options: [
            {
                label: 'Pakistan or Iraq',
                description: 'XDR risk — azithromycin first-line',
                next: 'typhoid-xdr-treatment',
            },
            {
                label: 'India, Bangladesh, or Other South Asia',
                description: 'MDR risk — ceftriaxone or azithromycin',
                next: 'typhoid-mdr-treatment',
            },
            {
                label: 'Africa, Latin America, Caribbean',
                description: 'Variable resistance — ceftriaxone or azithromycin',
                next: 'typhoid-mdr-treatment',
            },
        ],
        summary: 'Pakistan/Iraq = XDR (use azithromycin); other endemic = MDR (ceftriaxone or azithromycin)',
    },
    {
        id: 'typhoid-xdr-treatment',
        type: 'info',
        module: 3,
        title: 'XDR Typhoid Treatment — Azithromycin',
        body: '**For uncomplicated XDR typhoid (Pakistan/Iraq travelers):** [3][4][8]\n\n**First-Line:**\n• **[Azithromycin](#/drug/azithromycin/typhoid)** 1g PO day 1, then 500mg PO daily × 6 days (7 days total)\n• Pediatric: 20mg/kg/day PO daily × 7 days\n\n**Why azithromycin works:**\n• Intracellular concentration exceeds MIC\n• Mean defervescence: 7.1 days\n• Oral bioavailability allows outpatient treatment\n\n**If unable to take PO:**\n• [Azithromycin](#/drug/azithromycin/typhoid) 500mg IV daily, transition to PO when able\n• OR escalate to [Meropenem](#/drug/meropenem/typhoid) if severe\n\n**Monitoring:**\n• Defervescence expected by day 5-7\n• If no improvement by day 7-10: verify susceptibilities, consider escalation\n\n**Emerging concern:**\n• Azithromycin resistance emerging in Pakistan XDR strains\n• Culture susceptibilities critical\n• If azithromycin-resistant: meropenem is only option',
        citation: [3, 4, 8],
        calculatorLinks: [
            { id: 'typhoid-antibiotic-dosing', label: 'Antibiotic Dosing' },
        ],
        treatment: {
            firstLine: {
                drug: 'Azithromycin',
                dose: '1g PO day 1, then 500mg PO daily',
                route: 'PO',
                frequency: 'Daily',
                duration: '7 days total',
                notes: 'First-line for XDR typhoid (Pakistan/Iraq). Peds: 20mg/kg/day.',
            },
            monitoring: 'Expect defervescence by day 5-7; if no improvement by day 7-10, verify susceptibilities',
        },
        next: 'typhoid-disposition',
        summary: 'XDR: Azithromycin 1g day 1 → 500mg daily × 6 days; defervescence expected by day 5-7',
    },
    {
        id: 'typhoid-mdr-treatment',
        type: 'info',
        module: 3,
        title: 'MDR Typhoid Treatment — Ceftriaxone or Azithromycin',
        body: '**For uncomplicated MDR typhoid (India, Bangladesh, Africa, Latin America):** [4][8][9]\n\n**First-Line Options:**\n\n**[Ceftriaxone](#/drug/ceftriaxone/typhoid):**\n• Adults: 2g IV once daily × 5-7 days, then transition to oral azithromycin to complete 7-14 days\n• Pediatric: 50-100mg/kg/day IV (max 4g)\n• Mean defervescence: 5-7 days\n\n**OR [Azithromycin](#/drug/azithromycin/typhoid):**\n• Adults: 1g PO day 1, then 500mg PO daily × 6 days (7 days total)\n• Pediatric: 20mg/kg/day PO daily × 7 days\n• Can be used as monotherapy for outpatients\n\n**AVOID:**\n• Fluoroquinolones (ciprofloxacin, levofloxacin) — >70% resistant\n• Ampicillin, chloramphenicol, TMP-SMX — MDR global\n\n**Treatment Duration:**\n• Uncomplicated: 7 days total\n• May need IV→oral stepdown\n\n**If defervescence delayed (>7 days):**\n• Verify susceptibilities from culture\n• Consider switching agents or combination therapy',
        citation: [4, 8, 9],
        calculatorLinks: [
            { id: 'typhoid-antibiotic-dosing', label: 'Antibiotic Dosing' },
        ],
        treatment: {
            firstLine: {
                drug: 'Ceftriaxone',
                dose: '2g IV once daily',
                route: 'IV',
                frequency: 'Daily',
                duration: '5-7 days IV, then oral azithromycin to complete 7-14 days',
                notes: 'First-line for MDR typhoid. Transition to oral when clinically improved.',
            },
            alternative: {
                drug: 'Azithromycin',
                dose: '1g PO day 1, then 500mg PO daily',
                route: 'PO',
                frequency: 'Daily',
                duration: '7 days total',
                notes: 'Alternative first-line. Can be used for outpatient management.',
            },
            monitoring: 'Expect defervescence by day 5-7; culture susceptibilities guide therapy adjustments',
        },
        next: 'typhoid-disposition',
        summary: 'MDR: Ceftriaxone 2g IV daily OR Azithromycin PO; avoid fluoroquinolones',
    },
    {
        id: 'typhoid-complicated-tx',
        type: 'info',
        module: 3,
        title: 'Complicated/Severe Typhoid Treatment',
        body: '**Complicated typhoid requires IV antibiotics, admission, and close monitoring.** [4][8][9]\n\n**For severe typhoid from Pakistan/Iraq (XDR risk):**\n• **[Meropenem](#/drug/meropenem/typhoid)** 1g IV q8h (or 20mg/kg IV q8h peds)\n• Duration: 10-14 days\n• Mean defervescence: 6.7 days\n• Consider adding azithromycin for dual coverage\n\n**For severe typhoid from other endemic regions:**\n• **[Ceftriaxone](#/drug/ceftriaxone/typhoid)** 2g IV q12-24h (total 2-4g/day)\n• Duration: 10-14 days\n• If no response: escalate to meropenem\n\n**Adjunctive therapy for encephalopathy:**\n• **[Dexamethasone](#/drug/dexamethasone/typhoid)** 3mg/kg IV loading, then 1mg/kg IV q6h × 48h (4 days total)\n• Reduces mortality in severe cases with altered mental status [10]\n• Only use if NO suspicion of intestinal perforation\n\n**Supportive care:**\n• IV fluid resuscitation\n• Correct electrolyte abnormalities\n• NPO if perforation suspected\n• Blood transfusion if GI hemorrhage\n• Surgical consult for perforation',
        citation: [4, 8, 9, 10],
        treatment: {
            firstLine: {
                drug: 'Meropenem',
                dose: '1g IV q8h (adults) or 20mg/kg IV q8h (peds)',
                route: 'IV',
                frequency: 'Every 8 hours',
                duration: '10-14 days',
                notes: 'First-line for severe XDR typhoid. Consider adding azithromycin.',
            },
            alternative: {
                drug: 'Ceftriaxone',
                dose: '2g IV q12-24h (total 2-4g/day)',
                route: 'IV',
                frequency: 'q12-24h',
                duration: '10-14 days',
                notes: 'For severe non-XDR typhoid. Escalate to meropenem if no response.',
            },
            monitoring: 'ICU admission for shock/encephalopathy; daily labs; surgical consult if perforation suspected',
        },
        next: 'typhoid-complications',
        summary: 'Severe XDR: Meropenem IV; severe non-XDR: Ceftriaxone IV; dexamethasone for encephalopathy',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 4: COMPLICATIONS
    // =====================================================================
    {
        id: 'typhoid-complications',
        type: 'question',
        module: 4,
        title: 'Complications — Week 2-3',
        body: '**Complications occur in 10-15% of hospitalized patients, typically weeks 2-3.** [1][2][11]\n\n**Major Complications:**\n\n**Intestinal Perforation (TIP):**\n• Occurs ~day 14 of untreated illness\n• Necrosis of Peyer\'s patches → ulceration → perforation\n• Sudden severe abdominal pain, peritoneal signs, rapid deterioration\n• Mortality: 5-20%\n\n**GI Hemorrhage:**\n• Source: Terminal ileum ulcers, ileocecal valve, colon\n• Massive bleeding from eroded vessels\n• Melena or bright red blood per rectum\n\n**Typhoid Encephalopathy:**\n• Delirium in 25% of hospitalized cases\n• Blood-brain barrier disruption from typhoid toxin\n• Risk factors: age >50, dehydration, elevated WBC\n\n**Other:**\n• Myocarditis (arrhythmias, heart failure)\n• Hepatitis, cholecystitis\n• Acute kidney injury\n• DIC (rare, high mortality)\n\nDoes the patient have evidence of complications?',
        citation: [1, 2, 11],
        options: [
            {
                label: 'Intestinal Perforation',
                description: 'Sudden severe abdominal pain, peritoneal signs',
                next: 'typhoid-perforation',
                urgency: 'critical',
            },
            {
                label: 'GI Hemorrhage',
                description: 'Melena, BRBPR, hemodynamic instability',
                next: 'typhoid-hemorrhage',
                urgency: 'critical',
            },
            {
                label: 'Encephalopathy / Delirium',
                description: 'Altered mental status, confusion, psychosis',
                next: 'typhoid-encephalopathy',
                urgency: 'urgent',
            },
            {
                label: 'No Complications',
                description: 'Proceed to disposition',
                next: 'typhoid-disposition',
            },
        ],
        summary: 'Complications week 2-3: perforation, hemorrhage, encephalopathy — each requires specific management',
    },
    {
        id: 'typhoid-perforation',
        type: 'result',
        module: 4,
        title: 'Intestinal Perforation',
        body: '**Typhoid intestinal perforation is a surgical emergency.** [11][12]\n\n**Pathophysiology:**\n• Necrosis of Peyer\'s patches in terminal ileum\n• Ulceration progresses to full-thickness perforation\n• Typically occurs day 10-14 of untreated illness\n• Multiple perforations in 30% of cases\n\n**Presentation:**\n• Sudden severe abdominal pain (may initially localize to RLQ)\n• Abdominal rigidity, rebound tenderness\n• Rapid clinical deterioration\n• Free air on imaging\n\n**Immediate Management:**\n1. **NPO, NG tube decompression**\n2. **IV fluid resuscitation**\n3. **Broad-spectrum antibiotics** — add anaerobic coverage:\n   • Continue meropenem (already covers anaerobes) OR\n   • Add metronidazole 500mg IV q8h to ceftriaxone\n4. **STAT surgical consult** — operative repair required\n5. **CT abdomen** if stable; skip if unstable\n\n**Mortality:** 5-20% (higher in resource-limited settings)',
        recommendation: 'Surgical emergency — NPO, IV fluids, broad-spectrum antibiotics with anaerobic coverage, immediate surgical consult.',
        confidence: 'recommended',
        citation: [11, 12],
        summary: 'Perforation = surgical emergency — NPO, fluids, anaerobic coverage, immediate OR consult',
        safetyLevel: 'critical',
    },
    {
        id: 'typhoid-hemorrhage',
        type: 'result',
        module: 4,
        title: 'GI Hemorrhage',
        body: '**GI hemorrhage complicates ~12% of severe typhoid cases.** [11][12]\n\n**Source:**\n• Terminal ileum ulcers (100%)\n• Ileocecal valve (57%)\n• Colon (29-43%)\n• Erosion of blood vessels adjacent to necrotic Peyer\'s patches\n\n**Presentation:**\n• Melena or bright red blood per rectum\n• Hemodynamic instability\n• Falling hemoglobin\n\n**Management:**\n1. **Two large-bore IVs, type and screen**\n2. **IV fluid resuscitation**\n3. **Transfusion protocol** — activate MTP if massive hemorrhage\n4. **NPO**\n5. **GI consultation** — endoscopy may be needed if bleeding persists\n6. **Continue antibiotics** — essential for source control\n7. **Surgical consult** if uncontrolled bleeding or concurrent perforation\n\n**Prognosis:**\n• Most hemorrhages are self-limited with supportive care\n• Massive hemorrhage rare but can be fatal\n• Concurrent perforation worsens prognosis',
        recommendation: 'Resuscitation, transfusion if needed, NPO, GI consult. Continue antibiotics. Surgery if uncontrolled.',
        confidence: 'recommended',
        citation: [11, 12],
        summary: 'GI hemorrhage: IV access, transfuse, NPO, GI consult — most self-limited but can be massive',
        safetyLevel: 'critical',
    },
    {
        id: 'typhoid-encephalopathy',
        type: 'info',
        module: 4,
        title: 'Typhoid Encephalopathy',
        body: '**Typhoid encephalopathy (typhoid state) occurs in ~25% of hospitalized cases.** [10][11]\n\n**Pathophysiology:**\n• Blood-brain barrier disruption from typhoid toxin\n• Direct CNS invasion uncommon but can cause meningitis\n\n**Risk Factors:**\n• Age >50 years\n• Delayed treatment\n• Dehydration\n• High Widal titers (if obtained)\n• Elevated WBC (uncommon in typhoid)\n\n**Presentation:**\n• Muttering delirium (picking at bedclothes)\n• Disorientation, confusion\n• Psychosis (rare)\n• Coma (severe cases)\n• Ataxia (rare in adults)\n\n**Adjunctive Dexamethasone:** [10]\n• **Loading:** 3mg/kg IV × 1\n• **Maintenance:** 1mg/kg IV q6h × 48h (total 4 days)\n• Shown to reduce mortality in severe cases with altered mental status\n• **Contraindication:** Suspected intestinal perforation (steroids mask peritoneal signs)\n\n**Monitoring:**\n• ICU admission recommended\n• Frequent neuro checks\n• Supportive care: hydration, temperature control',
        citation: [10, 11],
        treatment: {
            firstLine: {
                drug: 'Dexamethasone',
                dose: '3mg/kg IV load, then 1mg/kg IV q6h',
                route: 'IV',
                frequency: 'q6h after loading dose',
                duration: '48 hours (total 4 days treatment)',
                notes: 'For severe encephalopathy only. Do NOT use if perforation suspected.',
            },
            monitoring: 'ICU admission; frequent neuro checks; watch for signs of perforation (abdominal pain)',
        },
        next: 'typhoid-admit',
        summary: 'Encephalopathy: Dexamethasone 3mg/kg load → 1mg/kg q6h × 48h reduces mortality; avoid if perforation suspected',
    },
    // =====================================================================
    // MODULE 5: DISPOSITION
    // =====================================================================
    {
        id: 'typhoid-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: '**Determine appropriate disposition based on severity and reliability of follow-up.** [1][2][8]\n\nMost uncomplicated typhoid can be managed as outpatient with oral azithromycin if:\n• Hemodynamically stable\n• Tolerating oral medications\n• No complications\n• Reliable follow-up available\n• Able to return if symptoms worsen',
        citation: [1, 2, 8],
        options: [
            {
                label: 'Discharge — Outpatient',
                description: 'Stable, uncomplicated, tolerating PO, reliable follow-up',
                next: 'typhoid-discharge',
            },
            {
                label: 'Admit — Inpatient',
                description: 'Complicated, unable to take PO, unreliable follow-up, or severe',
                next: 'typhoid-admit',
            },
        ],
        summary: 'Uncomplicated + stable + reliable follow-up = outpatient; otherwise admit',
    },
    {
        id: 'typhoid-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge — Outpatient Management',
        body: '**Discharge criteria met — outpatient treatment appropriate.** [1][2][8]\n\n**Discharge Medications:**\n• **[Azithromycin](#/drug/azithromycin/typhoid)** 1g PO day 1 (taken in ED), then 500mg PO daily × 6 more days\n• Consider antiemetic if nausea\n• Encourage oral hydration\n\n**Patient Instructions:**\n• Complete full 7-day antibiotic course — do NOT stop early\n• Rest; avoid strenuous activity\n• Return for: high fever unresponsive to antipyretics, severe abdominal pain, bloody stool, confusion, inability to keep medications down\n• Food/water precautions for future travel\n\n**Follow-Up:**\n• Primary care or infectious disease in 2-3 days\n• Repeat if fever persists beyond day 7\n• Stool cultures × 3 to document clearance (public health requirement in some areas)\n\n**Public Health:**\n• Typhoid is a reportable disease in the US\n• Health department notification required\n• Food handlers require documented clearance',
        recommendation: 'Discharge on azithromycin × 7 days. Follow-up in 2-3 days. Return precautions for severe abdominal pain, bleeding, or confusion.',
        confidence: 'recommended',
        citation: [1, 2, 8],
        treatment: {
            firstLine: {
                drug: 'Azithromycin',
                dose: '1g PO day 1 (in ED), then 500mg PO daily',
                route: 'PO',
                frequency: 'Daily',
                duration: '7 days total',
                notes: 'Complete full course. Return if fever persists >7 days or new complications.',
            },
            monitoring: 'Follow-up in 2-3 days; stool cultures × 3 to document clearance if food handler',
        },
        summary: 'Azithromycin 1g then 500mg daily × 6d; follow-up 2-3 days; return for abdominal pain/bleeding/confusion',
    },
    {
        id: 'typhoid-admit',
        type: 'result',
        module: 5,
        title: 'Admit — Inpatient Management',
        body: '**Admission criteria met — inpatient treatment required.** [1][2][8]\n\n**Admission Indications:**\n• Altered mental status or encephalopathy\n• Hemodynamic instability\n• Signs of sepsis or septic shock\n• GI bleeding or suspected perforation\n• Unable to tolerate oral medications\n• Severe dehydration\n• Immunocompromised patient\n• Age >50 or very young children\n• Unreliable outpatient follow-up\n\n**Inpatient Management:**\n• IV antibiotics based on region (see treatment nodes)\n• IV fluid resuscitation\n• Enteric precautions (stool isolation)\n• Daily labs: CBC, BMP, LFTs\n• Monitor for complications (week 2-3 highest risk)\n• Infectious disease consultation recommended\n\n**Step-Down Criteria:**\n• Afebrile × 24-48h\n• Tolerating oral medications\n• No signs of complications\n• Transition to oral azithromycin to complete course\n\n**Duration:**\n• Uncomplicated: 7 days total\n• Complicated: 10-14 days',
        recommendation: 'Admit for IV antibiotics, hydration, and monitoring. ID consult recommended. Watch for complications weeks 2-3.',
        confidence: 'recommended',
        citation: [1, 2, 8],
        summary: 'Admit: IV antibiotics, fluids, enteric precautions, ID consult; monitor for perforation/hemorrhage/encephalopathy',
    },
    // =====================================================================
    // MODULE 6: PREVENTION
    // =====================================================================
    {
        id: 'typhoid-prevention',
        type: 'info',
        module: 6,
        title: 'Prevention & Vaccination Counseling',
        body: '**Counsel patients on prevention for future travel to endemic areas.** [1][2][13]\n\n**Vaccination:**\n\n| Vaccine | Route | Age | Schedule | Booster |\n|---------|-------|-----|----------|----------|\n| **Typhim Vi** (ViCPS) | IM | ≥2 years | 1 dose ≥2 weeks before travel | Every 2 years |\n| **Vivotif** (Ty21a) | PO | ≥6 years | 4 capsules every other day | Every 5 years |\n\n**Vaccine Effectiveness:**\n• 50-80% protective (not 100%)\n• Typhoid conjugate vaccine (TCV): 97% effective against XDR in Pakistan\n\n**Who Should Be Vaccinated:**\n• All travelers to endemic regions (especially South Asia)\n• Travelers visiting friends/relatives in endemic areas\n• Laboratory workers handling *S. Typhi*\n• Close contacts of chronic carriers\n\n**Food/Water Precautions:**\n• "Boil it, cook it, peel it, or forget it"\n• Avoid ice, tap water, raw vegetables, street food\n• Bottled water with intact seal\n• Hot, thoroughly cooked food\n\n**Important Counseling Point:**\n• Vaccination does NOT eliminate risk — still need food/water precautions\n• No antibiotic prophylaxis recommended (poor efficacy, promotes resistance)',
        citation: [1, 2, 13],
        next: 'typhoid-relapse',
        summary: 'Vaccinate travelers to endemic areas (50-80% effective); food/water precautions essential — vaccination alone not sufficient',
    },
    {
        id: 'typhoid-relapse',
        type: 'info',
        module: 6,
        title: 'Relapse & Chronic Carriage',
        body: '**Relapse and chronic carriage are important long-term considerations.** [1][2]\n\n**Relapse:**\n• Occurs in ~10% of inadequately treated patients\n• Typically 1-3 weeks after apparent recovery\n• Usually milder than initial illness\n• Risk factors: short treatment course, poor compliance\n• Treatment: Repeat full antibiotic course\n\n**Chronic Carriage:**\n• 1-4% of infected persons become chronic carriers\n• Shed *S. Typhi* in stool for >1 year\n• Often asymptomatic\n• Public health concern — can transmit to others\n• Risk factors: gallbladder disease (gallstones harbor bacteria)\n\n**Carriage Treatment:**\n• Prolonged antibiotics (ciprofloxacin × 28 days if susceptible)\n• Cholecystectomy may be required if gallstones present and antibiotics fail\n\n**Documentation of Clearance:**\n• Stool cultures × 3 (24h apart) after completing therapy\n• Required for food handlers in many jurisdictions\n• Report to local public health department',
        citation: [1, 2],
        summary: '10% relapse if undertreated; 1-4% become chronic carriers; stool cultures × 3 to document clearance',
    },
];
// =====================================================================
// MODULE LABELS
// =====================================================================
export const TYPHOID_FEVER_MODULE_LABELS = [
    'Recognition & Travel History',
    'Diagnosis',
    'Treatment',
    'Complications',
    'Disposition',
    'Prevention',
];
// =====================================================================
// CRITICAL ACTIONS
// =====================================================================
export const TYPHOID_FEVER_CRITICAL_ACTIONS = [
    { text: 'Travel history drives empiric therapy — Pakistan/Iraq = XDR (use azithromycin, NOT ceftriaxone)', nodeId: 'typhoid-start' },
    { text: 'Blood cultures BEFORE antibiotics — gold standard (60-80% sensitive week 1)', nodeId: 'typhoid-diagnosis' },
    { text: 'AVOID fluoroquinolones empirically — >70% resistance in US cases', nodeId: 'typhoid-uncomplicated-tx' },
    { text: 'Widal test is unreliable — do NOT use for acute diagnosis', nodeId: 'typhoid-widal-warning' },
    { text: 'Watch for complications weeks 2-3: perforation, hemorrhage, encephalopathy', nodeId: 'typhoid-complications' },
    { text: 'Dexamethasone 3mg/kg for severe encephalopathy — reduces mortality', nodeId: 'typhoid-encephalopathy' },
];
// =====================================================================
// CITATIONS
// =====================================================================
export const TYPHOID_FEVER_CITATIONS = [
    { num: 1, text: 'CDC Yellow Book 2026 — Typhoid and Paratyphoid Fever.' },
    { num: 2, text: 'CDC Clinical Guidance — Typhoid Fever. Updated 2025.' },
    { num: 3, text: 'Klemm EJ, et al. Emergence of XDR Salmonella Typhi. mBio. 2018;9(1):e00105-18.' },
    { num: 4, text: 'Chatham-Stephens K, et al. XDR Typhoid in Travelers from Pakistan. MMWR. 2019;68(1):11-13.' },
    { num: 5, text: 'Typhoid Fever — StatPearls / NCBI. Updated 2024.' },
    { num: 6, text: 'Parry CM, et al. Typhoid fever. N Engl J Med. 2002;347(22):1770-82.' },
    { num: 7, text: 'Olopoenia LA, King AL. Widal test limitations. Postgrad Med J. 2000;76(892):80-4.' },
    { num: 8, text: 'Crump JA, et al. Invasive Salmonella Infections. Clin Microbiol Rev. 2015;28(4):901-37.' },
    { num: 9, text: 'Treatment of Enteric Fever with Cephalosporins: Systematic Review. PMC. 2022.' },
    { num: 10, text: 'Hoffman SL, et al. Dexamethasone in severe typhoid. N Engl J Med. 1984;310(2):82-8.' },
    { num: 11, text: 'Azmatullah A, et al. Typhoid intestinal perforation. Trans R Soc Trop Med Hyg. 2015.' },
    { num: 12, text: 'MSF Medical Guidelines — Enteric Fevers. 2024.' },
    { num: 13, text: 'CDC — Typhoid Vaccination Information. Updated 2025.' },
];
