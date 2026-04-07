// MedKitt - Measles Management in the Emergency Department
// Recognition -> Isolation -> Clinical Assessment -> Treatment -> Complications -> PEP -> Disposition
// 6 modules: Recognition -> Isolation -> Clinical Assessment -> Treatment -> Complications/PEP -> Disposition
// 23 nodes total.
export const MEASLES_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'measles-start',
        type: 'info',
        module: 1,
        title: 'Measles - Clinical Recognition',
        body: '**Suspect Measles When:**\n\n- Fever (often >104F/40C)\n- Classic triad: **Cough, Coryza, Conjunctivitis** (the 3 Cs)\n- Maculopapular rash spreading cephalocaudally\n- Recent travel or exposure history\n- Unvaccinated or under-vaccinated patient\n\n**Prodrome (2-4 days before rash):**\n- High fever, malaise\n- 3 Cs develop progressively\n- Koplik spots (pathognomonic) may appear 1-2 days before rash\n\n**Epidemiology:**\n- R0 = 12-18 (extremely contagious)\n- 90% attack rate in susceptible household contacts\n- Contagious 4 days before to 4 days after rash onset\n\n**IMMEDIATE ACTION:** If measles suspected, initiate **airborne isolation** before further workup.',
        citation: [1, 2, 3],
        next: 'measles-isolation',
    },
    // =====================================================================
    // MODULE 2: ISOLATION
    // =====================================================================
    {
        id: 'measles-isolation',
        type: 'info',
        module: 2,
        title: 'Airborne Isolation Protocol',
        body: '**IMMEDIATE ISOLATION REQUIRED**\n\n**Room Requirements:**\n- Negative-pressure airborne infection isolation room (AIIR)\n- Minimum 6 air changes per hour (12 preferred)\n- Direct exhaust to outside or HEPA filtration\n\n**PPE for ALL Staff Entering:**\n- N95 respirator (fit-tested) or PAPR\n- Gown and gloves\n- Eye protection if splash risk\n\n**Patient Transport:**\n- Patient wears surgical mask\n- Minimize transport; notify receiving areas\n- Direct route avoiding waiting areas\n\n**Duration:**\n- Maintain isolation for **4 days after rash onset** (immunocompetent)\n- Immunocompromised: duration of illness\n\n**Public Health:**\n- Report to local health department IMMEDIATELY (do not wait for lab confirmation)',
        citation: [1, 2, 4],
        next: 'measles-immunity-check',
    },
    {
        id: 'measles-immunity-check',
        type: 'question',
        module: 2,
        title: 'Assess Presumptive Immunity',
        body: '**Evidence of Immunity (any ONE):**\n\n- Written documentation of 2 doses MMR vaccine (at least 28 days apart, first dose at age >= 12 months)\n- Laboratory evidence of immunity (positive IgG)\n- Laboratory confirmation of prior measles\n- Birth before 1957 in the US (considered immune due to natural exposure)\n\nDoes the patient have evidence of presumptive immunity?',
        citation: [1, 5],
        calculatorLinks: [
            { id: 'measles-immunity', label: 'Immunity Checklist' },
        ],
        options: [
            {
                label: 'Evidence of immunity present',
                description: 'Has documentation of 2 MMR doses, positive IgG, prior disease, or born before 1957',
                next: 'measles-immune-reassess',
            },
            {
                label: 'No evidence of immunity / Unknown',
                description: 'Unvaccinated, 1 dose only, or unknown vaccination status',
                next: 'measles-clinical-dx',
            },
        ],
    },
    {
        id: 'measles-immune-reassess',
        type: 'info',
        module: 2,
        title: 'Consider Alternative Diagnoses',
        body: '**Patient Has Evidence of Immunity**\n\nVaccine effectiveness is 93% (1 dose) to 97% (2 doses). Breakthrough measles is rare but possible.\n\n**Alternative Diagnoses to Consider:**\n- Drug hypersensitivity reaction (no prodrome, recent drug exposure)\n- Roseola infantum (usually <3 years, high fever resolves as rash appears)\n- Rubella (milder, lymphadenopathy prominent)\n- Parvovirus B19 (slapped cheek appearance)\n- Kawasaki disease (in children)\n- Scarlet fever (sandpaper rash, strep pharyngitis)\n\n**If Clinical Suspicion Remains High:**\n- Maintain isolation pending testing\n- Send confirmatory labs (next screen)\n\nPrognosis in vaccinated individuals is typically milder if breakthrough occurs.',
        citation: [1, 6],
        next: 'measles-clinical-dx',
    },
    // =====================================================================
    // MODULE 3: CLINICAL ASSESSMENT
    // =====================================================================
    {
        id: 'measles-clinical-dx',
        type: 'info',
        module: 3,
        title: 'Clinical Diagnosis',
        body: '**Pathognomonic Finding: Koplik Spots**\n\n- 1-3mm grayish-white papules on erythematous base\n- Location: buccal mucosa opposite upper 1st/2nd molars\n- "Salt grains on a red background"\n- Appear 1-2 days BEFORE rash, disappear 1-2 days AFTER rash\n- Present in 60-70% of cases\n\n**Characteristic Rash:**\n- Appears ~14 days post-exposure (3-7 days after prodrome)\n- Starts on face (hairline, behind ears) and neck\n- Spreads cephalocaudally over 24-48 hours to trunk, then extremities (including palms/soles)\n- Erythematous macules become papules, may coalesce\n- Fades in same order (head first) over 5-7 days\n- May leave brownish discoloration and fine desquamation\n\n**Classic Triad at Rash Onset:**\n- Cough (harsh, non-productive)\n- Coryza (rhinorrhea)\n- Conjunctivitis (bilateral, non-purulent)',
        citation: [2, 6, 7],
        next: 'measles-lab-confirm',
    },
    {
        id: 'measles-lab-confirm',
        type: 'info',
        module: 3,
        title: 'Laboratory Confirmation',
        body: '**Required for ALL Suspected Cases**\n\n**Serologic Testing:**\n- Measles-specific IgM antibody\n- Sensitivity 83-89%, specificity 95-99%\n- May be negative first 72 hours after rash (false negative)\n- Obtain during rash or within 30 days\n\n**RT-PCR Testing (Preferred):**\n- Higher early sensitivity (94%), specificity 99%\n- Specimens: nasopharyngeal/throat swab AND urine\n- Urine + NP swab together improves sensitivity\n- Allows genotyping for outbreak investigation\n\n**Specimen Collection:**\n- NP or OP swab in viral transport media\n- Urine: 50-100mL clean catch\n- Collect within 7 days of rash onset (optimal sensitivity)\n\n**Contact your state/local health department for testing coordination.**',
        citation: [1, 2, 8],
        next: 'measles-severity',
    },
    {
        id: 'measles-severity',
        type: 'question',
        module: 3,
        title: 'Severity Assessment',
        body: '**Assess for Severe Measles:**\n\n**High-Risk Populations:**\n- Age <5 years (especially <12 months)\n- Age >20 years\n- Pregnancy\n- Immunocompromised (HIV, chemotherapy, transplant)\n- Malnutrition or vitamin A deficiency\n\n**Signs of Severe Disease:**\n- Respiratory distress or hypoxia\n- Altered mental status\n- Severe dehydration (unable to drink, decreased UOP)\n- High fever refractory to antipyretics\n- Superimposed bacterial infection signs\n\nIs this patient HIGH RISK or showing SEVERE disease?',
        citation: [1, 2, 9],
        options: [
            {
                label: 'High-risk or severe disease',
                description: 'Young child, adult, immunocompromised, pregnant, or showing severe signs',
                next: 'measles-severe-mgmt',
                urgency: 'urgent',
            },
            {
                label: 'Uncomplicated measles',
                description: 'Healthy child/adolescent without severe features',
                next: 'measles-supportive',
            },
        ],
    },
    // =====================================================================
    // MODULE 4: TREATMENT
    // =====================================================================
    {
        id: 'measles-severe-mgmt',
        type: 'info',
        module: 4,
        title: 'Severe Measles Management',
        body: '**Hospitalization Required**\n\n**Supportive Care:**\n- IV fluids for dehydration\n- Supplemental oxygen PRN (target SpO2 >= 92%)\n- Antipyretics for fever control\n- Continuous monitoring\n\n**Vitamin A - MANDATORY for Hospitalized Patients:**\n- Reduces mortality and pneumonia-specific mortality\n- See [Vitamin A Dosing](#/drug/vitamin-a-measles)\n\n**Monitoring:**\n- Watch for respiratory deterioration (pneumonia)\n- Neurologic status changes (encephalitis)\n- Signs of superimposed bacterial infection\n\n**No Specific Antiviral Therapy:**\n- Ribavirin has in-vitro activity but lacks clinical data\n- Reserved for severe/immunocompromised - infectious disease consult\n\n**Antibiotics:** Only for documented secondary bacterial infection, NOT prophylactic.',
        citation: [1, 2, 4, 9],
        next: 'measles-vitamin-a',
    },
    {
        id: 'measles-supportive',
        type: 'info',
        module: 4,
        title: 'Uncomplicated Measles - Supportive Care',
        body: '**Outpatient Management:**\n\n**Supportive Measures:**\n- Adequate oral hydration\n- Antipyretics (acetaminophen or ibuprofen) for fever/discomfort\n- Rest\n- Dim lighting if photophobia present\n\n**Vitamin A Supplementation:**\n- Consider for all children with measles, even in US\n- Especially if: malnutrition risk, recent immigrant, vitamin A deficiency suspected\n- See [Vitamin A Dosing](#/drug/vitamin-a-measles)\n\n**What NOT to Give:**\n- Antibiotics (unless bacterial superinfection documented)\n- Steroids (no benefit, may prolong viral shedding)\n- Antivirals (no proven efficacy for outpatient measles)\n\n**Isolation at Home:**\n- Strict home isolation for 4 days after rash onset\n- Avoid contact with susceptible individuals',
        citation: [1, 2, 4],
        next: 'measles-vitamin-a',
    },
    {
        id: 'measles-vitamin-a',
        type: 'info',
        module: 4,
        title: 'Vitamin A Therapy',
        body: '**WHO/AAP Recommended Dosing:**\n\n| Age | Dose | Schedule |\n|-----|------|----------|\n| <6 months | 50,000 IU PO | Day 1 and Day 2 |\n| 6-11 months | 100,000 IU PO | Day 1 and Day 2 |\n| >= 12 months | 200,000 IU PO | Day 1 and Day 2 |\n\n**Administration:**\n- Give immediately upon diagnosis\n- Repeat dose the following day (total 2 doses)\n- Give 3rd dose 2-4 weeks later if clinical signs of vitamin A deficiency\n\n**Evidence:**\n- 87% reduction in mortality in children <2 years\n- 64% reduction in mortality overall (2 doses of 200,000 IU)\n- Reduces duration of diarrhea by 2 days, fever by 1 day\n\n**Cautions:**\n- Do NOT substitute cod liver oil (variable content, toxicity risk)\n- Avoid high-dose vitamin A in pregnancy (teratogenic)\n- Overdose risk: hepatotoxicity, CNS effects, bone damage',
        citation: [4, 9, 10],
        calculatorLinks: [
            { id: 'measles-vitamin-a', label: 'Vitamin A Dosing' },
        ],
        next: 'measles-complications',
    },
    // =====================================================================
    // MODULE 5: COMPLICATIONS & PEP
    // =====================================================================
    {
        id: 'measles-complications',
        type: 'question',
        module: 5,
        title: 'Complications Assessment',
        body: '**Common Complications:**\n\n**Respiratory (most common):**\n- Otitis media (7-9% of cases)\n- Pneumonia (1 in 20 children) - **leading cause of measles death**\n  - Primary viral (giant cell) pneumonia\n  - Secondary bacterial pneumonia (S. pneumoniae, S. aureus, H. influenzae)\n\n**Neurologic:**\n- Acute encephalitis (1 in 1,000 cases)\n  - Onset 3-10 days after rash\n  - 25% mortality, 25% permanent neurologic sequelae\n- SSPE (subacute sclerosing panencephalitis) - see next screen\n\n**Other:**\n- Diarrhea (8% of cases)\n- Laryngotracheobronchitis (croup)\n- Keratitis (can lead to blindness, especially with vitamin A deficiency)\n\n**Death:** 1-3 per 1,000 cases in developed countries\n\nIs the patient showing signs of complications?',
        citation: [1, 2, 11],
        options: [
            {
                label: 'Respiratory complication suspected',
                description: 'New oxygen requirement, respiratory distress, productive cough',
                next: 'measles-pneumonia',
                urgency: 'urgent',
            },
            {
                label: 'Neurologic complication suspected',
                description: 'Altered mental status, seizures, focal deficits',
                next: 'measles-encephalitis',
                urgency: 'critical',
            },
            {
                label: 'No complications identified',
                description: 'Uncomplicated course',
                next: 'measles-sspe-info',
            },
        ],
    },
    {
        id: 'measles-pneumonia',
        type: 'info',
        module: 5,
        title: 'Measles Pneumonia',
        body: '**Pneumonia - Leading Cause of Measles Death**\n\n**Types:**\n1. **Primary viral (giant cell) pneumonia** - severe, may require ICU\n2. **Secondary bacterial pneumonia** - more common, treatable\n\n**Workup:**\n- CXR (interstitial infiltrates vs lobar consolidation)\n- CBC, procalcitonin\n- Blood cultures\n- Sputum culture if productive\n- Consider respiratory viral panel (co-infection)\n\n**Treatment:**\n- Oxygen therapy (target SpO2 >= 92%)\n- IV fluids\n- Vitamin A (if not already given)\n- **Antibiotics for bacterial superinfection:**\n  - Cover S. pneumoniae, S. aureus, H. influenzae\n  - Ampicillin-sulbactam or ceftriaxone + vancomycin if MRSA concern\n\n**Disposition:**\n- Admit to AIIR\n- ICU if respiratory failure imminent',
        citation: [1, 2, 9],
        next: 'measles-pep-question',
    },
    {
        id: 'measles-encephalitis',
        type: 'info',
        module: 5,
        title: 'Measles Encephalitis',
        body: '**Acute Post-Measles Encephalitis**\n\n**Incidence:** 1 in 1,000 cases\n\n**Timing:** 3-10 days after rash onset\n\n**Presentation:**\n- Fever recrudescence\n- Headache, altered mental status\n- Seizures (50%)\n- Focal neurologic deficits\n- Ataxia\n\n**Workup:**\n- CT head (rule out other causes)\n- LP (lymphocytic pleocytosis, elevated protein)\n- MRI brain (periventricular demyelination)\n- EEG (diffuse slowing, epileptiform activity)\n\n**Treatment:**\n- Supportive care\n- Seizure management\n- ICP monitoring if indicated\n- No proven specific therapy\n\n**Prognosis:**\n- 25% mortality\n- 25% permanent neurologic sequelae (hearing loss, cognitive impairment, motor deficits)\n- 50% full recovery',
        citation: [1, 2, 11],
        next: 'measles-sspe-info',
    },
    {
        id: 'measles-sspe-info',
        type: 'info',
        module: 5,
        title: 'SSPE - Late Complication',
        body: '**Subacute Sclerosing Panencephalitis (SSPE)**\n\n**A devastating late complication (7-10 years after infection)**\n\n**Incidence:**\n- Historical estimate: 1 in 100,000 cases\n- More recent data: may be as high as 1 in 609 for infants <15 months\n- Higher risk: measles infection at age <2 years\n\n**Pathophysiology:**\n- Persistent measles virus infection in CNS\n- Progressive inflammatory and neurodegenerative process\n\n**Clinical Course:**\n- Stage I: Behavioral changes, cognitive decline\n- Stage II: Myoclonic jerks, seizures, dementia\n- Stage III: Rigidity, autonomic instability\n- Stage IV: Coma, death\n\n**Prognosis:**\n- Nearly always fatal within 1-3 years\n- No effective treatment\n\n**Prevention:** Only through measles vaccination\n\n*SSPE is caused only by wild-type measles, NOT vaccine strains.*',
        citation: [11, 12],
        next: 'measles-pep-question',
    },
    {
        id: 'measles-pep-question',
        type: 'question',
        module: 5,
        title: 'Post-Exposure Prophylaxis',
        body: '**Identify Exposed Contacts**\n\nHas anyone without evidence of immunity been exposed to this patient?\n\nExposure = same airspace (room, enclosed area) as infectious patient:\n- 4 days before to 4 days after rash onset\n- Virus remains airborne for up to 2 hours\n\n**Categories of Exposed Individuals:**\n- Healthcare workers\n- Household contacts\n- Waiting room contacts\n- Other hospital patients/visitors\n\nAre there exposed susceptible contacts requiring PEP?',
        citation: [1, 5],
        options: [
            {
                label: 'Yes - PEP needed',
                description: 'Susceptible contacts identified',
                next: 'measles-pep-timing',
            },
            {
                label: 'No exposed contacts / All immune',
                description: 'No susceptible exposures identified',
                next: 'measles-public-health',
            },
        ],
    },
    {
        id: 'measles-pep-timing',
        type: 'question',
        module: 5,
        title: 'PEP Timing Assessment',
        body: '**Timing is Critical for PEP Efficacy**\n\n**Window for MMR Vaccine:** Within 72 hours of exposure\n**Window for Immune Globulin:** Within 6 days of exposure\n\nHow long since exposure occurred?',
        citation: [1, 5, 4],
        calculatorLinks: [
            { id: 'measles-pep', label: 'PEP Decision Tool' },
        ],
        options: [
            {
                label: 'Within 72 hours',
                description: 'MMR vaccine may be effective',
                next: 'measles-pep-mmr',
            },
            {
                label: '72 hours - 6 days',
                description: 'Immune globulin indicated',
                next: 'measles-pep-ig',
            },
            {
                label: '>6 days since exposure',
                description: 'Outside PEP window',
                next: 'measles-pep-late',
            },
        ],
    },
    {
        id: 'measles-pep-mmr',
        type: 'info',
        module: 5,
        title: 'PEP with MMR Vaccine',
        body: '**MMR Vaccine PEP (within 72 hours of exposure)**\n\n**Eligible Patients:**\n- Age >= 6 months (off-label 6-11 months during outbreak)\n- No contraindications to live vaccine\n- Not pregnant\n- Not severely immunocompromised\n\n**Dosing:**\n- Standard MMR dose subcutaneous\n- If age 6-11 months: dose does NOT count toward routine series (revaccinate at 12-15 months)\n- If age >= 12 months: counts as first dose\n\n**NOT Eligible for MMR (use IG instead):**\n- Infants <6 months\n- Pregnant women\n- Severely immunocompromised:\n  - CD4 <15% (children <=5 years)\n  - CD4 <200 or <15% (>5 years)\n  - Active chemotherapy\n  - Transplant recipients on immunosuppression\n\n**Quarantine:** 21 days from last exposure (whether or not PEP given)',
        citation: [1, 5],
        next: 'measles-public-health',
    },
    {
        id: 'measles-pep-ig',
        type: 'info',
        module: 5,
        title: 'PEP with Immune Globulin',
        body: '**Immune Globulin PEP (within 6 days of exposure)**\n\n**Intramuscular IG (IGIM):**\n- Dose: 0.5 mL/kg (max 15 mL)\n- Indicated for:\n  - Infants <6 months of age\n  - Infants 6-11 months if >72 hours post-exposure\n\n**Intravenous IG (IVIG):**\n- Dose: 400 mg/kg\n- Indicated for:\n  - Pregnant women (any trimester)\n  - Severely immunocompromised patients\n  - When IGIM volume would be excessive\n\n**Post-IG Vaccination:**\n- Wait 6 months after IGIM before MMR\n- Wait 8 months after IVIG before MMR\n\n**Quarantine Duration:**\n- Without IG: 21 days from last exposure\n- With IG: **28 days** from last exposure (incubation may be prolonged)\n\n**Healthcare Workers:** Exclude from work day 5-21 (or 28 if IG given) after exposure',
        citation: [1, 4, 5],
        next: 'measles-public-health',
    },
    {
        id: 'measles-pep-late',
        type: 'info',
        module: 5,
        title: 'Exposure >6 Days Ago',
        body: '**Outside PEP Window**\n\nNeither MMR nor IG will prevent infection if >6 days since exposure.\n\n**Management:**\n- Educate about symptoms to watch for\n- Instruct to self-isolate at first sign of illness\n- Provide clear return precautions\n- Coordinate with public health for monitoring\n\n**Symptom Watch:**\n- Fever, cough, runny nose, red eyes\n- Rash starting on face\n- Incubation: typically 10-14 days (rash ~14 days post-exposure)\n\n**If Symptoms Develop:**\n- Call ahead before presenting to healthcare\n- Wear mask\n- Inform triage of measles exposure\n\n**Consider MMR vaccination** to protect against future exposures (if not contraindicated).',
        citation: [1, 5],
        next: 'measles-public-health',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION & PUBLIC HEALTH
    // =====================================================================
    {
        id: 'measles-public-health',
        type: 'info',
        module: 6,
        title: 'Public Health Reporting',
        body: '**MANDATORY IMMEDIATE REPORTING**\n\nMeasles is a nationally notifiable disease requiring IMMEDIATE reporting.\n\n**Report to:**\n- Local health department (same day)\n- State epidemiologist\n- CDC via state health department\n\n**Information to Report:**\n- Patient demographics\n- Vaccination history\n- Travel history (2-3 weeks before symptom onset)\n- Exposure history\n- Contact list for tracing\n- Laboratory results (when available)\n\n**Contact Tracing:**\n- All contacts from 4 days before rash to present\n- Public health will coordinate contact investigation\n- Healthcare facility exposure assessment\n\n**Outbreak Definition:** >= 3 cases linked in time and place\n\n**Do NOT wait for lab confirmation to report suspected cases.**',
        citation: [1, 2],
        next: 'measles-disposition',
    },
    {
        id: 'measles-disposition',
        type: 'question',
        module: 6,
        title: 'Disposition Decision',
        body: '**Admission Criteria:**\n\n- Respiratory compromise or hypoxia\n- Severe dehydration (unable to maintain PO)\n- Altered mental status or neurologic concerns\n- High-risk patient (immunocompromised, pregnant, extremes of age)\n- Social concerns (cannot maintain isolation at home)\n- Suspected or confirmed complication\n\n**Discharge Criteria:**\n\n- Maintaining adequate hydration\n- No respiratory distress\n- No high-risk features\n- Able to isolate at home\n- Reliable follow-up\n- Caregiver understands return precautions\n\nWhat is the appropriate disposition?',
        citation: [1, 2],
        options: [
            {
                label: 'Admit - severe/complicated/high-risk',
                description: 'Meets admission criteria',
                next: 'measles-admit',
                urgency: 'urgent',
            },
            {
                label: 'Discharge - uncomplicated',
                description: 'Stable, can isolate at home, reliable follow-up',
                next: 'measles-discharge',
            },
        ],
    },
    {
        id: 'measles-admit',
        type: 'result',
        module: 6,
        title: 'Admit to AIIR',
        body: '**Admission Orders:**\n\n**Isolation:**\n- Airborne Infection Isolation Room (AIIR)\n- N95/PAPR for all staff entering\n- Maintain isolation 4 days after rash onset (longer if immunocompromised)\n\n**Monitoring:**\n- Continuous pulse oximetry\n- Neuro checks if encephalitis concern\n- Strict I/Os\n\n**Treatment:**\n- Vitamin A (age-based dosing) Day 1 and Day 2\n- IV fluids PRN\n- Antipyretics\n- Antibiotics only for documented bacterial infection\n\n**Consultations:**\n- Infectious disease\n- Public health notification\n- Pulmonology if pneumonia\n- Neurology if encephalitis\n\n**Documentation:**\n- Vaccination history\n- Travel/exposure history\n- Contact list for public health',
        recommendation: 'Admit to AIIR. Vitamin A, supportive care. ID and public health notification.',
        confidence: 'definitive',
        citation: [1, 2, 4, 9],
    },
    {
        id: 'measles-discharge',
        type: 'result',
        module: 6,
        title: 'Discharge with Strict Isolation',
        body: '**Discharge Instructions:**\n\n**Home Isolation - MANDATORY:**\n- Strict isolation for **4 days after rash onset**\n- Stay in separate room from other household members\n- No school, work, public places, or healthcare facilities\n- Other household members should be assessed for immunity\n\n**Supportive Care:**\n- Plenty of fluids\n- Antipyretics for fever\n- Rest\n\n**Vitamin A:**\n- Consider prescribing age-appropriate dose (2 doses)\n\n**Return Precautions:**\n- Difficulty breathing or fast breathing\n- Unable to drink or keep fluids down\n- Confusion or unusual drowsiness\n- Seizure\n- Worsening symptoms after initial improvement\n- New symptoms (ear pain, productive cough)\n\n**Follow-up:**\n- PCP in 2-3 days\n- Public health will contact for case investigation\n\n**IMPORTANT:** Call ahead before any healthcare visit - facility must prepare isolation.',
        recommendation: 'Discharge with 4-day strict home isolation. Return precautions for respiratory distress, dehydration, or neurologic changes.',
        confidence: 'recommended',
        citation: [1, 2],
    },
];
export const MEASLES_NODE_COUNT = MEASLES_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const MEASLES_MODULE_LABELS = [
    'Recognition',
    'Isolation',
    'Clinical Assessment',
    'Treatment',
    'Complications & PEP',
    'Disposition',
];
// -------------------------------------------------------------------
// Critical Actions
// -------------------------------------------------------------------
export const MEASLES_CRITICAL_ACTIONS = [
    { text: 'AIRBORNE ISOLATION immediately if measles suspected (R0 = 12-18, extremely contagious)', nodeId: 'measles-isolation' },
    { text: 'Classic triad: Cough, Coryza, Conjunctivitis (3 Cs) + fever + maculopapular rash', nodeId: 'measles-start' },
    { text: 'Koplik spots (white spots on buccal mucosa) are pathognomonic, appear 1-2 days before rash', nodeId: 'measles-diagnosis' },
    { text: 'Measles IgM and PCR (throat/nasopharyngeal swab) for confirmation', nodeId: 'measles-workup' },
    { text: 'Vitamin A 200,000 IU (100,000 IU if <1 year) PO x2 doses (reduces mortality)', nodeId: 'measles-vitamin-a' },
    { text: 'Notify Public Health Department immediately (reportable disease)', nodeId: 'measles-reporting' },
    { text: 'Post-exposure prophylaxis: MMR within 72h OR IVIG within 6 days for high-risk contacts', nodeId: 'measles-pep' },
    { text: 'Contagious 4 days before to 4 days after rash onset (isolate until day 4 of rash)', nodeId: 'measles-isolation' },
    { text: 'Monitor for complications: pneumonia (most common), encephalitis, subacute sclerosing panencephalitis', nodeId: 'measles-complications' },
    { text: 'Healthcare workers must have documented immunity (2 MMR doses or positive titers)', nodeId: 'measles-hcw-exposure' },
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const MEASLES_CITATIONS = [
    { num: 1, text: 'CDC. Clinical Overview of Measles. Updated 2025. https://www.cdc.gov/measles/hcp/clinical-overview/' },
    { num: 2, text: 'ACEP Now. I Found Measles. Now What? 2025. https://www.acepnow.com/article/i-found-measles-now-what/' },
    { num: 3, text: 'CDC. Healthcare Providers: Stay Alert for Measles Cases. HAN 00522. 2025.' },
    { num: 4, text: 'WHO. Vitamin A for Treating Measles in Children. Cochrane Database Syst Rev. 2022.' },
    { num: 5, text: 'AAP Red Book 2024-2027. Measles Chapter. American Academy of Pediatrics.' },
    { num: 6, text: 'Moss WJ. Measles. Lancet. 2017;390(10111):2490-2502.' },
    { num: 7, text: 'Koplik H. The Diagnosis of the Invasion of Measles From a Study of the Exanthema as It Appears on the Buccal Mucous Membrane. Arch Pediatr. 1896;13:918-922.' },
    { num: 8, text: 'CDC. Measles (Rubeola) Diagnostic Testing. Laboratory Guidelines. 2024.' },
    { num: 9, text: 'Huiming Y, et al. Vitamin A for Treating Measles in Children. Cochrane Database Syst Rev. 2005;(4):CD001479. Updated 2022.' },
    { num: 10, text: 'WHO/UNICEF. Vitamin A Supplementation in Measles. Joint Statement. 1997, updated 2017.' },
    { num: 11, text: 'Gutierrez J, et al. Subacute Sclerosing Panencephalitis: An Update. Dev Med Child Neurol. 2010;52(10):901-907.' },
    { num: 12, text: 'Bellini WJ, et al. Subacute Sclerosing Panencephalitis: More Cases of This Fatal Disease Are Prevented by Measles Immunization than Was Previously Recognized. J Infect Dis. 2005;192(10):1686-1693.' },
];
