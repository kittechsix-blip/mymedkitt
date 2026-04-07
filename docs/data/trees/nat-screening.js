// MedKitt — Non-Accidental Trauma (NAT) Screening
// Recognition → TEN-4-FACESp → Imaging → Labs → Documentation → Reporting
export const NAT_SCREENING_MODULE_LABELS = [
    'Recognition & Red Flags',
    'TEN-4-FACESp Assessment',
    'Imaging Workup',
    'Laboratory Workup',
    'Documentation & Reporting',
    'Disposition',
];
export const NAT_SCREENING_CRITICAL_ACTIONS = [
    { text: 'Apply TEN-4-FACESp rule for bruising in children <4 years (any positive finding = abuse risk)', nodeId: 'nat-ten4' },
    { text: 'Skeletal survey mandatory for all children <2 years with suspected abuse', nodeId: 'nat-skeletal-survey' },
    { text: 'Head CT mandatory for all children <1 year with suspected abuse', nodeId: 'nat-imaging' },
    { text: 'MRI brain + cervical spine for abusive head trauma (75% have unsuspected spinal injuries)', nodeId: 'nat-aht-imaging' },
    { text: 'Ophthalmology consult within 24-48 hours for retinal exam (grade 3A/3B hemorrhages highly specific for abuse)', nodeId: 'nat-aht' },
    { text: 'Coagulation studies (CBC, PT, aPTT, Factor VIII/IX) for all cases with bruising or intracranial hemorrhage', nodeId: 'nat-labs' },
    { text: 'Mandatory CPS report for all suspected abuse ("reasonable cause to believe" standard)', nodeId: 'nat-reporting' },
    { text: 'Document complete physical exam with body diagrams/photos (no permission required for medical evaluation)', nodeId: 'nat-documentation' },
    { text: 'Interview caregivers separately with direct quotations and document inconsistencies', nodeId: 'nat-documentation' },
    { text: 'Repeat skeletal survey at 10-14 days if initial negative but high suspicion (fractures only visible during healing)', nodeId: 'nat-skeletal-survey' },
];
export const NAT_SCREENING_CITATIONS = [
    { num: 1, text: 'Pierce MC, et al. Validation of a clinical decision rule to predict abuse in young children based on bruising characteristics. JAMA Netw Open. 2021;4(4):e215832.' },
    { num: 2, text: 'Lindberg DM, et al. Prevalence of abusive injuries in siblings and household contacts of abused children. Pediatrics. 2012;130(2):193-201.' },
    { num: 3, text: 'Maguire SA, et al. Which clinical features distinguish inflicted from non-inflicted brain injury? A systematic review. Arch Dis Child. 2009;94(11):860-867.' },
    { num: 4, text: 'Leventhal JM, et al. Fractures in young children: distinguishing child abuse from unintentional injuries. Am J Dis Child. 1993;147(1):87-92.' },
    { num: 5, text: 'AAP Committee on Child Abuse and Neglect. Evaluation of suspected child physical abuse. Pediatrics. 2015;135(5):e1337-e1354.' },
    { num: 6, text: 'Flaherty EG, et al. Evaluating children with fractures for child physical abuse. Pediatrics. 2014;133(2):e477-e489.' },
    { num: 7, text: 'Anderst JD, et al. Medical evaluation of children with concerning findings of nonaccidental trauma. J Child Sex Abuse. 2022;31(7):787-805.' },
    { num: 8, text: 'Christian CW, et al. Abusive head trauma in infants and children. Pediatrics. 2009;123(5):1409-1411.' },
];
export const NAT_SCREENING_NODES = [
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 0 — Recognition & Red Flags
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'nat-start',
        type: 'question',
        module: 0,
        title: 'Non-Accidental Trauma — Recognition',
        body: `**Sentinel Injuries:**
- 25% of abused children have prior unrecognized injuries
- Bruising in **non-mobile infants** is rare (<0.6% accidental)
- 80% of sentinel injuries are bruises; 11% are intraoral

**History Red Flags:**
- Vague, changing, or inconsistent story
- History inconsistent with developmental stage
- Delay in seeking care without explanation
- History doesn't match injury severity/pattern

**High-Risk Presentations:**
- Any bruising in infant <6 months
- Multiple injuries in various stages of healing
- Injuries in unusual locations (torso, ears, neck)
- Patterned injuries (loop marks, hand prints, bite marks)`,
        citation: [1, 5],
        options: [
            { label: 'Bruising — use TEN-4-FACESp', next: 'nat-ten4' },
            { label: 'Fracture(s) identified', next: 'nat-fractures' },
            { label: 'Abusive head trauma suspected', next: 'nat-aht' },
            { label: 'Multiple concerning findings', next: 'nat-comprehensive' },
        ],
        calculatorLinks: [
            { id: 'nat-ten4-facesp', label: 'TEN-4-FACESp Calculator' },
        ],
    },
    {
        id: 'nat-comprehensive',
        type: 'info',
        module: 0,
        title: 'Comprehensive NAT Workup',
        body: `**When to initiate full workup:**
- Multiple concerning findings
- Single highly suspicious finding (e.g., classic metaphyseal lesion)
- History significantly inconsistent with injury
- Pattern suggesting repeated trauma

**Full Workup Components:**
1. **Complete physical exam** — head to toe, including oral mucosa, genitalia
2. **Skeletal survey** — all children <2 years
3. **Head CT** — all children <1 year
4. **Laboratory studies** — bleeding disorders, metabolic bone disease
5. **Ophthalmology consult** — retinal exam for AHT
6. **Social work involvement**
7. **Child abuse pediatrician consult** (if available)
8. **Mandatory CPS report**

**Interview Technique:**
- Interview caregivers **separately**
- Document direct quotations
- Note demeanor, affect, inconsistencies
- Do NOT conduct investigative interview (CPS role)`,
        citation: [5, 7],
        next: 'nat-imaging',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 1 — TEN-4-FACESp Assessment
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'nat-ten4',
        type: 'info',
        module: 1,
        title: 'TEN-4-FACESp Bruising Rule',
        body: `**First validated clinical decision rule for abuse (2021)**
- **Sensitivity: 96%** | **Specificity: 87%**
- Applicable to children **<4 years** with bruising

**T - Torso** (chest, abdomen, back, buttocks, genitalia)
**E - Ear** (pinna or behind ear)
**N - Neck** (front or sides)
**4 - Any bruise in infant ≤4.99 months**

**F - Frenulum** tear (labial or lingual)
**A - Angle of jaw**
**C - Cheek** (fleshy part)
**E - Eyelid** or periorbital
**S - Subconjunctival** hemorrhage
**p - Patterned** bruising (hand, loop, object shape)

**Interpretation:**
- **ANY positive finding** = increased abuse risk
- Torso, Ear, Neck alone identified 81% of abuse cases
- Single TEN-4-FACESp bruise warrants full evaluation`,
        citation: [1],
        next: 'nat-ten4-action',
        calculatorLinks: [
            { id: 'nat-ten4-facesp', label: 'TEN-4-FACESp Calculator' },
        ],
    },
    {
        id: 'nat-ten4-action',
        type: 'question',
        module: 1,
        title: 'TEN-4-FACESp Result',
        body: `**If TEN-4-FACESp POSITIVE:**
- Initiate comprehensive NAT workup
- Social work consultation
- Consider skeletal survey (all children <2 years)
- Labs for bleeding disorders
- Mandatory CPS report

**If TEN-4-FACESp NEGATIVE but still concerned:**
- Trust clinical judgment
- Document concerns and reasoning
- Consider workup if other red flags present
- Low threshold in non-mobile infants

**Important Limitation:**
- TEN-4-FACESp does NOT distinguish bleeding disorders from abuse
- Always screen for coagulopathy
- Rule only applies to children WITH bruising`,
        citation: [1, 5],
        options: [
            { label: 'TEN-4-FACESp POSITIVE', next: 'nat-comprehensive' },
            { label: 'TEN-4-FACESp Negative, still concerned', next: 'nat-comprehensive' },
            { label: 'TEN-4-FACESp Negative, low suspicion', next: 'nat-low-suspicion' },
        ],
    },
    {
        id: 'nat-low-suspicion',
        type: 'info',
        module: 1,
        title: 'Low Suspicion — Documentation',
        body: `**Even with low suspicion, document:**
- Complete physical exam findings
- Location, size, color of any injuries
- Developmental stage of child
- Caregiver explanation for injuries
- Consistency of history with findings
- Why NAT workup was NOT pursued

**Consider Accidental Trauma If:**
- Developmentally appropriate injury
- Consistent, plausible history
- Injury location typical for accidental trauma
- No pattern or concerning features
- First-time presentation

**Still Recommend:**
- Safety assessment
- Follow-up arranged
- Clear discharge instructions`,
        citation: [5],
        next: 'nat-disposition',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 2 — Fractures
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'nat-fractures',
        type: 'info',
        module: 2,
        title: 'Fracture Patterns in Abuse',
        body: `**Age-Specific Fracture Risk:**

**Infants <18 months:**
- 80% of abuse-related fractures occur in this age group
- Accidental fractures are uncommon
- 100% of humeral fractures in infants <18 mo are abusive

**High-Specificity Fractures:**
| Fracture Type | Abuse Probability |
|---------------|-------------------|
| **Rib fractures** (no major trauma) | 96% |
| Classic metaphyseal lesions | Very high |
| Scapular/spinous process | Very high |
| Multiple fractures in different healing | Very high |

**Concerning Patterns:**
- Femoral shaft fracture in **non-ambulatory** child
- Multiple fractures: 70% abuse if <36 months
- Long bone fractures without explanation

**Less Specific (but still concerning):**
- Linear skull fracture
- Clavicle (unless birth-related)
- Distal extremity fractures`,
        citation: [4, 6],
        next: 'nat-skeletal-survey',
    },
    {
        id: 'nat-skeletal-survey',
        type: 'info',
        module: 2,
        title: 'Skeletal Survey Indications',
        body: `**Mandatory Skeletal Survey:**
- All children **<2 years** with suspected abuse
- Any child with skull fracture/SDH without clear cause
- Metaphyseal lesions, rib, spine, or scapular fractures
- Abusive head trauma findings

**Skeletal Survey Components:**
- AP and lateral skull
- AP chest (oblique views for ribs)
- AP pelvis
- Lateral spine
- AP humeri, forearms, femurs, tibias
- PA hands and feet

**Follow-Up Imaging:**
- If initial survey negative but high suspicion: **repeat at 10-14 days**
- Some fractures only visible during healing

**When to Consider Bone Scan:**
- Equivocal skeletal survey findings
- High clinical suspicion with normal survey`,
        citation: [5, 6],
        next: 'nat-imaging',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 2 — Abusive Head Trauma
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'nat-aht',
        type: 'info',
        module: 2,
        title: 'Abusive Head Trauma (AHT)',
        body: `**Clinical Presentation:**
- Poor feeding, vomiting, lethargy
- Seizures, apnea, altered mental status
- Bulging fontanelle, increasing head circumference
- Retinal hemorrhages
- Subdural hematomas (especially interhemispheric)

**Imaging Findings Highly Associated with AHT:**
- Multiple SDH locations (interhemispheric + convexity + posterior fossa)
- Hypoxic-ischemic injury on MRI
- Skull fractures (especially complex or multiple)

**CT Head — Mandatory:**
- All suspected abuse in children <1 year
- Any child with external head trauma + abnormal neuro exam

**MRI Brain:**
- Required if CT abnormal
- Better for shear injury, ischemia, lesion timing
- Include cervical spine (75% have unsuspected spinal injuries)

**Ophthalmology Consult:**
- Dilated fundoscopic exam
- Retinal hemorrhages strongly associated with AHT
- Grades 3A/3B highly specific for abuse`,
        citation: [3, 8],
        next: 'nat-aht-imaging',
    },
    {
        id: 'nat-aht-imaging',
        type: 'info',
        module: 2,
        title: 'AHT Imaging Protocol',
        body: `**Head CT:**
- Non-contrast, axial images
- Identifies acute blood, fractures, mass effect
- Fast, no sedation needed

**MRI Brain (add when CT abnormal or high suspicion):**
- T1, T2, FLAIR
- Diffusion-weighted imaging (DWI) with ADC
- Susceptibility-weighted imaging (SWI)
- DWI important for hypoxic-ischemic injury (prognostic)

**MRI C-spine:**
- Routine with AHT evaluation
- Unsuspected injuries in 75% of AHT cases
- Include whole spine if abnormal neuro exam

**Key Imaging Points:**
- Do NOT attempt to "date" subdural hematomas
- Multiple locations of SDH significant
- Brain parenchymal injury = major cause of morbidity/mortality

**Retinal Exam:**
- Ophthalmology within 24-48 hours
- Document retinal hemorrhage location, extent, character`,
        citation: [3, 8],
        next: 'nat-labs',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 3 — Imaging Summary
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'nat-imaging',
        type: 'info',
        module: 2,
        title: 'Imaging Summary for NAT Workup',
        body: `**Skeletal Survey:**
- All children <2 years with suspected abuse
- Repeat at 10-14 days if negative but high suspicion

**Head CT:**
- All children <1 year with suspected abuse
- Children >1 year with head trauma or neuro signs

**MRI Brain:**
- Abnormal CT findings
- High suspicion for AHT
- Persistent neurologic symptoms

**MRI Spine:**
- Accompany brain MRI for AHT
- Abnormal neurologic exam

**3D CT:**
- Complex skull fractures (better characterization)

**DO NOT use PECARN rules:**
- PECARN validated for accidental trauma only
- NOT applicable when abuse suspected`,
        citation: [5, 6],
        next: 'nat-labs',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 3 — Laboratory Workup
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'nat-labs',
        type: 'info',
        module: 3,
        title: 'Laboratory Evaluation',
        body: `**Coagulation Studies (for bruising/bleeding):**
- CBC with platelet count
- PT, aPTT, INR
- Factor VIII and IX levels
- Fibrinogen
- Von Willebrand factor (for bruising)

**For Intracranial Hemorrhage:**
- Add: D-dimer, mixing studies if aPTT prolonged

**Metabolic Bone Disease Screen (for fractures):**
- Calcium, phosphorus, alkaline phosphatase
- 25-hydroxyvitamin D
- Intact PTH
- Consider genetics for osteogenesis imperfecta

**When to Order:**
- All cases with unexplained bruising
- All cases with intracranial hemorrhage
- All cases with unexplained fractures

**Note:**
- Coagulation values may be falsely elevated acutely
- Pediatric hematology consultation recommended
- Negative labs do NOT exclude abuse`,
        citation: [5, 7],
        next: 'nat-documentation',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 4 — Documentation & Reporting
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'nat-documentation',
        type: 'info',
        module: 4,
        title: 'Documentation Requirements',
        body: `**Physical Exam Documentation:**
- Complete head-to-toe exam (include oral, genital)
- Body diagram or photodocumentation
- Photos: measurement device, color scale, location ID

**Photo Requirements (medical evaluation):**
- Permission NOT required
- Include ruler/measurement
- Gray scale for color reference
- Identifying photo of child helpful

**History Documentation:**
- Interview caregivers SEPARATELY
- Document who was present
- Use DIRECT QUOTATIONS
- Note inconsistencies between accounts
- Document caregiver demeanor/affect
- Record developmental stage of child

**Critical Documentation:**
- Mechanism described vs. injury observed
- Consistency of explanation
- Presence of injuries in various healing stages
- Prior visits for similar concerns`,
        citation: [5, 7],
        next: 'nat-reporting',
    },
    {
        id: 'nat-reporting',
        type: 'info',
        module: 4,
        title: 'Mandatory Reporting',
        body: `**Legal Requirement:**
- ALL 50 states + DC require reporting of suspected abuse
- **Suspicion sufficient — diagnosis NOT required**
- "Reasonable cause to believe" standard

**Who Must Report:**
- Physicians, nurses, EMS
- All healthcare providers
- Teachers, childcare providers
- Varies by state — check local law

**Reporting Process:**
1. Contact state CPS hotline immediately
2. File written report (usually within 24-48 hours)
3. Document report in medical record

**Protections:**
- Reporter identity confidential (except to law enforcement)
- Good faith reports protected from liability
- Reporting to supervisor does NOT relieve individual duty

**ED Authority:**
- Many states: physician can retain custody until CPS responds
- ED is a protected/sanctuary space for patient

**CPS Hotline:** [Check state-specific number]`,
        citation: [5],
        next: 'nat-disposition',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 5 — Disposition
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'nat-disposition',
        type: 'result',
        module: 5,
        title: 'Disposition',
        body: `**ADMIT:**
- All children <1 year with suspected abuse
- Serious injuries requiring workup
- Unsafe discharge environment
- Neurologic injuries, fractures, ICH
- CPS involvement pending

**Do NOT Discharge:**
- Without CPS involvement/safety plan
- If unsafe home environment suspected
- If siblings at risk (evaluate them too)

**Consultations:**
- Child abuse pediatrician (if available)
- Social work (ALWAYS)
- Ophthalmology (if AHT suspected)
- Orthopedics (if fractures)
- Neurosurgery (if ICH)
- Pediatric hematology (for labs interpretation)

**Follow-Up:**
- Repeat skeletal survey at 10-14 days (if <24 months)
- Outpatient child abuse pediatrician
- Ensure CPS case opened
- Document all plans in chart

**Team Communication:**
- Professional, non-accusatory with family
- Transparent about concerns and reporting obligation
- Do NOT conduct extended investigative interviews`,
        citation: [5, 7],
        calculatorLinks: [
            { id: 'nat-ten4-facesp', label: 'TEN-4-FACESp Calculator' },
        ],
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // Differential Diagnosis
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'nat-differential',
        type: 'info',
        module: 0,
        title: 'Differential Diagnosis (Mimics)',
        body: `**Easy Bruising Differential:**
- Hemophilia (3-12% develop symptomatic ICH)
- Von Willebrand disease
- ITP, leukemia
- Henoch-Schönlein purpura
- Ehlers-Danlos syndrome
- Mongolian spots (congenital dermal melanosis)

**Bone Fragility Differential:**
- Osteogenesis imperfecta
- Rickets (nutritional, hypophosphatemic)
- Metabolic bone disease of infancy (MBDI)
- Osteopenia

**AHT Differential:**
- Accidental head trauma
- Coagulopathies
- Glutaric aciduria type 1
- Cerebral sinovenous thrombosis
- AVM
- Birth trauma
- Bacterial meningitis

**Critical Balance:**
- Misdiagnosis → wrongful family separation
- Missed diagnosis → continued abuse, disability, death
- Thorough workup protects child AND family`,
        citation: [5],
        next: 'nat-start',
    },
];
