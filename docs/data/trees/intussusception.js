// MedKitt — Pediatric Intussusception
// Comprehensive consult: recognition, ultrasound diagnosis, reduction, special populations.
// Based on UpToDate, EB Medicine, CHOP Clinical Pathway, Royal Children's Hospital Melbourne, StatPearls.
// 6 modules: Recognition → Ultrasound → Risk Stratification → Reduction → Post-Reduction → Disposition.
export const INTUSSUSCEPTION_CITATIONS = [
    { num: 1, text: 'UpToDate. Intussusception in children. 2024.' },
    { num: 2, text: 'StatPearls. Child Intussusception. NCBI Bookshelf. 2024.' },
    { num: 3, text: 'Children\'s Hospital of Philadelphia. Suspected Ileocolic Intussusception Clinical Pathway. November 2024.' },
    { num: 4, text: 'Royal Children\'s Hospital Melbourne. Clinical Practice Guidelines: Intussusception. 2024.' },
    { num: 5, text: 'ACEP EM Ultrasound Section. Mastering the Intussusception Ultrasound. April 2021.' },
    { num: 6, text: 'Daneman A, et al. Practical Imaging Strategies for Intussusception in Children. AJR. 2020.' },
    { num: 7, text: 'Xie X, et al. Pneumatic versus liquid enema reduction in pediatric intussusception: systematic review and meta-analysis. 2024.' },
    { num: 8, text: 'Jen HC, et al. Clinical prediction rules for failed nonoperative reduction of intussusception. J Pediatr Surg. 2016.' },
    { num: 9, text: 'Jiang J, et al. Current diagnosis and image-guided reduction for intussusception in children. Clin Exp Pediatr. 2023.' },
    { num: 10, text: 'American Pediatric Surgical Association. Management of Intussusception in Children: Systematic Review. 2021.' },
    { num: 11, text: 'Applegate KE. Intussusception in children: evidence-based diagnosis and treatment. Pediatr Radiol. 2009.' },
];
export const INTUSSUSCEPTION_CRITICAL_ACTIONS = [
    { text: 'Consider intussusception in ANY infant with episodic inconsolable crying, lethargy, or altered mental status', nodeId: 'intuss-start' },
    { text: 'Ultrasound is gold standard (>97% sensitivity/specificity) - look for target/donut sign in RUQ', nodeId: 'intuss-ultrasound' },
    { text: 'Classic triad (pain + currant jelly stool + mass) present in <25% - do NOT rely on it', nodeId: 'intuss-presentation' },
    { text: 'ABSOLUTE contraindications to enema reduction: peritonitis, free air, shock', nodeId: 'intuss-contraindications' },
    { text: 'Age <3 months or >5 years = higher risk of pathologic lead point - consider early surgery consultation', nodeId: 'intuss-lead-points' },
    { text: 'Post-reduction: observe 4+ hours, trial PO at 2 hours, recurrence rate is 8-10%', nodeId: 'intuss-post-reduction' },
];
export const INTUSSUSCEPTION_MODULE_LABELS = [
    'Recognition',
    'Ultrasound Diagnosis',
    'Risk Stratification',
    'Reduction',
    'Post-Reduction Care',
    'Disposition',
];
export const INTUSSUSCEPTION_NODES = [
    // =====================================================================
    // MODULE 1: RECOGNITION
    // =====================================================================
    {
        id: 'intuss-start',
        type: 'info',
        module: 1,
        title: 'Pediatric Intussusception',
        body: '[Quick Reference: Red Flags](#/info/intuss-red-flags)\n\n**Definition:** Telescoping of proximal bowel (intussusceptum) into distal bowel (intussuscipiens). Most common is ileocolic (ileum into cecum/colon).\n\n**Epidemiology:**\n- Most common cause of bowel obstruction in children 6-36 months\n- Peak incidence: 4-9 months\n- 80-90% occur before age 2 years\n- Male:Female ratio 3:2\n\n**Pathophysiology:**\n- Venous and lymphatic obstruction → bowel wall edema\n- Progresses to arterial compromise → ischemia → necrosis\n- If untreated: perforation and death within 2-5 days\n\n**This consult guides:** Recognition, ultrasound diagnosis, reduction decisions, and post-reduction management.',
        citation: [1, 2],
        next: 'intuss-presentation',
        summary: 'Intussusception peaks at 4-9 months - most common bowel obstruction in infants',
    },
    {
        id: 'intuss-presentation',
        type: 'question',
        module: 1,
        title: 'Clinical Presentation',
        body: '**Classic Triad (present in <25%):**\n1. Intermittent, colicky abdominal pain with inconsolable crying\n2. "Currant jelly" stool (blood + mucus)\n3. Palpable sausage-shaped abdominal mass (RUQ)\n\n**More Common Presentation:**\n- Episodes of severe, crampy pain (draws legs up, screaming)\n- Pain-free intervals between episodes\n- Vomiting (initially non-bilious, becomes bilious)\n- Lethargy between episodes (may be profound)\n- Decreased oral intake\n\n**Atypical Presentations (younger infants):**\n- **Lethargy or altered mental status** (can be only symptom!)\n- Pallor, hypotonia\n- Painless intussusception\n\n**Late Findings (concerning):**\n- Bloody stool / currant jelly\n- Bilious vomiting\n- Abdominal distension\n- Peritoneal signs',
        citation: [1, 2, 4],
        options: [
            {
                label: 'Classic or typical presentation',
                description: 'Episodic pain, vomiting, +/- mass',
                next: 'intuss-exam',
            },
            {
                label: 'Atypical presentation',
                description: 'Lethargy, AMS, painless',
                next: 'intuss-atypical',
            },
            {
                label: 'Concerning/late findings',
                description: 'Bloody stool, bilious vomiting, distension',
                next: 'intuss-concerning',
                urgency: 'urgent',
            },
        ],
        summary: 'Classic triad present in <25% - lethargy may be only symptom in young infants',
    },
    {
        id: 'intuss-atypical',
        type: 'info',
        module: 1,
        title: 'Atypical Presentation',
        body: '**Lethargy as Presenting Symptom:**\n\nIn young infants, lethargy or altered mental status may be the ONLY presenting symptom. This is a diagnostic pitfall.\n\n**Consider intussusception if:**\n- Unexplained lethargy in infant 3-12 months\n- Episodes of "altered behavior" or "zoning out"\n- Inconsolable crying alternating with listlessness\n- Pallor or hypotonia without clear cause\n\n**Why Lethargy Occurs:**\n- Vagal response to bowel ischemia\n- Endotoxin release\n- Pain exhaustion\n\n**Key Point:** A well-appearing infant between episodes does NOT rule out intussusception. The episodic nature is characteristic.\n\n**Action:** Maintain high suspicion and proceed to ultrasound evaluation.',
        citation: [2, 4],
        next: 'intuss-exam',
        summary: 'Lethargy may be only symptom - episodic altered behavior in infants is a red flag',
    },
    {
        id: 'intuss-concerning',
        type: 'info',
        module: 1,
        title: 'Concerning/Late Findings',
        body: '**Signs of Advanced Disease:**\n\n**Bloody Stool / Currant Jelly:**\n- Mix of blood, mucus, and sloughed mucosa\n- Indicates mucosal ischemia\n- Present in <50% of cases\n- LATE finding - absence does not rule out\n\n**Bilious Vomiting:**\n- Indicates complete small bowel obstruction\n- Urgent surgical concern\n\n**Abdominal Distension:**\n- Progressive obstruction\n- May indicate perforation if sudden\n\n**Peritoneal Signs:**\n- Rebound, guarding, rigidity\n- Indicates possible necrosis/perforation\n- Contraindication to enema reduction\n\n**Shock:**\n- Tachycardia, poor perfusion, hypotension\n- Suggests bowel compromise or sepsis\n- Requires aggressive resuscitation + surgery\n\n**Action:** Immediate surgical consultation, IV access, fluid resuscitation. Do NOT delay for imaging if clinically unstable.',
        citation: [1, 2],
        next: 'intuss-exam',
        summary: 'Bloody stool, bilious vomiting, distension = late findings suggesting ischemia',
    },
    {
        id: 'intuss-exam',
        type: 'info',
        module: 1,
        title: 'Physical Examination',
        body: '**Vital Signs:**\n- May be normal early\n- Tachycardia (pain, dehydration)\n- Fever (later - suggests necrosis/infection)\n\n**General:**\n- Well between episodes vs. lethargic\n- Pallor suggests significant illness\n- Note hydration status\n\n**Abdominal Exam:**\n- **Sausage-shaped mass:** RUQ, palpable in ~60%\n- **Dance\'s sign:** Empty RLQ (cecum displaced)\n- May be soft and non-tender between episodes\n- Distension suggests obstruction\n- Peritonitis = surgical emergency\n\n**Rectal Exam:**\n- Gross blood, currant jelly, or guaiac positive\n- Rarely: prolapsed intussusceptum through rectum\n\n**Key Point:** A normal abdominal exam between episodes does NOT exclude intussusception. The episodic nature is characteristic.',
        citation: [2, 4],
        next: 'intuss-ultrasound',
        summary: 'Sausage mass in RUQ found in 60% - normal exam between episodes does not exclude',
    },
    // =====================================================================
    // MODULE 2: ULTRASOUND DIAGNOSIS
    // =====================================================================
    {
        id: 'intuss-ultrasound',
        type: 'info',
        module: 2,
        title: 'Ultrasound Diagnosis',
        body: '[Ultrasound Findings Guide](#/info/intuss-us-guide)\n\n**Ultrasound is Gold Standard:**\n- Sensitivity: >97%\n- Specificity: >97%\n- Negative predictive value: 99.7%\n\n**Technique:**\n- Linear high-frequency probe (children)\n- Curvilinear for larger children\n- Systematic scan of all quadrants\n- Focus on RUQ (most common location)\n\n**Classic Findings:**\n\n**Transverse View - Target/Donut Sign:**\n- Concentric rings of alternating echogenicity\n- Usually ~3 cm diameter\n- Hypoechoic outer rim (edematous bowel)\n- Hyperechoic center (mesentery/trapped fat)\n\n**Longitudinal View - Pseudokidney Sign:**\n- Elongated, kidney-shaped structure\n- Also called "sandwich" or "hayfork" sign\n\n**Additional Findings:**\n- Trapped lymph nodes within intussusception\n- Free fluid (concerning)\n- Absent blood flow on Doppler (very concerning)',
        citation: [5, 6, 9],
        next: 'intuss-us-findings',
        summary: 'US >97% sensitivity/specificity - look for target/donut sign (~3cm) in RUQ',
    },
    {
        id: 'intuss-us-findings',
        type: 'question',
        module: 2,
        title: 'Ultrasound Findings',
        body: '**Based on ultrasound results:**\n\n**Positive for Intussusception:**\n- Target/donut sign present\n- Pseudokidney sign\n- Typical ~3 cm diameter mass\n\n**Concerning US Features:**\n- Free peritoneal fluid\n- Absent blood flow on color Doppler\n- Large amount of trapped fluid within intussusceptum\n- Intussusception in left colon (advanced)\n\n**Small Bowel-Small Bowel Intussusception:**\n- Usually transient and self-resolving\n- Typically <2.5 cm and no lead point\n- Often incidental finding\n- Generally does NOT require reduction\n\n**Negative Ultrasound:**\n- If clinical suspicion remains high, consider repeat imaging\n- NPV is 99.7% when performed by experienced sonographer',
        citation: [5, 6, 11],
        options: [
            {
                label: 'Positive: Ileocolic intussusception',
                description: 'Target/donut sign, typical location',
                next: 'intuss-risk-assessment',
            },
            {
                label: 'Positive with concerning features',
                description: 'Free fluid, no Doppler flow, left-sided',
                next: 'intuss-high-risk-us',
                urgency: 'urgent',
            },
            {
                label: 'Small bowel-small bowel only',
                description: 'Transient, usually self-resolves',
                next: 'intuss-sbsb',
            },
            {
                label: 'Negative ultrasound',
                description: 'No intussusception identified',
                next: 'intuss-negative',
            },
        ],
        summary: 'Ileocolic requires reduction; SB-SB usually transient and self-resolves',
    },
    {
        id: 'intuss-high-risk-us',
        type: 'info',
        module: 2,
        title: 'High-Risk Ultrasound Features',
        body: '**Features Associated with Failed Reduction / Surgical Need:**\n\n**Free Peritoneal Fluid:**\n- Suggests prolonged/severe intussusception\n- May indicate bowel compromise\n- NOT an absolute contraindication to enema\n\n**Absent Blood Flow on Doppler:**\n- Indicates vascular compromise\n- Higher risk of necrosis\n- Consider surgical consultation before enema attempt\n\n**Large Trapped Fluid:**\n- Fluid trapped within the intussusception\n- Associated with edema and ischemia\n\n**Left-Sided Location:**\n- Intussusception has traveled far into colon\n- Longer duration, more difficult reduction\n\n**Visible Lead Point:**\n- Polyp, Meckel\'s diverticulum, tumor\n- Will likely require surgical intervention\n\n**Action:** Obtain surgical consultation early. Enema may still be attempted if no peritonitis/perforation, but have surgical backup ready.',
        citation: [6, 8, 9],
        next: 'intuss-risk-assessment',
        summary: 'Free fluid, absent Doppler flow, left-sided = higher risk - get early surgical consult',
    },
    {
        id: 'intuss-sbsb',
        type: 'result',
        module: 2,
        title: 'Small Bowel-Small Bowel Intussusception',
        body: '**Transient Small Bowel Intussusception:**\n\n**Characteristics:**\n- Usually <2.5 cm diameter\n- No lead point visible\n- Often found incidentally\n- Common in children with gastroenteritis\n\n**Management:**\n- Usually self-resolves within minutes to hours\n- Does NOT require enema reduction\n- Observation is appropriate\n\n**When to Be Concerned:**\n- Persistent on repeat imaging (>1 hour)\n- Associated with significant symptoms\n- Size >3 cm\n- Visible lead point\n\n**Action:**\n- If symptomatic: repeat US in 1-2 hours\n- If asymptomatic and incidental: reassure, no intervention needed\n- If persistent and symptomatic: surgical consultation',
        citation: [1, 6],
        recommendation: 'Small bowel-small bowel intussusception usually self-resolves. Observe and repeat US if symptomatic. No enema reduction needed.',
        confidence: 'recommended',
        summary: 'SB-SB intussusception usually transient - observe, repeat US if symptomatic',
    },
    {
        id: 'intuss-negative',
        type: 'result',
        module: 2,
        title: 'Negative Ultrasound',
        body: '**Ultrasound Negative for Intussusception:**\n\n**Negative Predictive Value: 99.7%**\n\nIf performed by experienced sonographer with adequate views, a negative ultrasound effectively rules out ileocolic intussusception.\n\n**Consider Alternative Diagnoses:**\n- Gastroenteritis\n- Constipation\n- Colic\n- Incarcerated hernia\n- Testicular torsion (in males)\n- Ovarian pathology (in females)\n- Malrotation with volvulus (more urgent)\n\n**When to Repeat Imaging:**\n- Symptoms persist or worsen\n- Strong clinical suspicion despite negative US\n- Inadequate views on initial study\n\n**Action:** Address alternative diagnoses. If clinical picture strongly suggests intussusception, consider repeat US or CT.',
        citation: [5, 11],
        recommendation: 'Negative US with adequate views has 99.7% NPV. Consider alternative diagnoses. Repeat imaging only if strong clinical suspicion persists.',
        confidence: 'recommended',
        summary: 'Negative US has 99.7% NPV - consider alternate diagnoses',
    },
    // =====================================================================
    // MODULE 3: RISK STRATIFICATION
    // =====================================================================
    {
        id: 'intuss-risk-assessment',
        type: 'question',
        module: 3,
        title: 'Clinical Risk Assessment',
        body: '[Lead Point Risk by Age](#/info/intuss-lead-points)\n\n**Assess for Contraindications to Enema Reduction:**\n\n**ABSOLUTE Contraindications:**\n- Peritonitis (rebound, guarding, rigidity)\n- Pneumoperitoneum (free air on X-ray)\n- Hemodynamic instability / Shock\n\n**Relative Concerns (higher failure risk):**\n- Symptom duration >48 hours\n- Age <3 months or >5 years\n- Rectal bleeding / bloody stool\n- Lethargy or severely ill-appearing\n- Small bowel obstruction on X-ray\n- High-risk US features (free fluid, no flow)\n- Suspected lead point\n\n**Standard Risk (good reduction candidate):**\n- Age 3 months - 3 years\n- Symptoms <24 hours\n- Hemodynamically stable\n- No peritonitis\n- Classic US findings without high-risk features',
        citation: [1, 3, 8],
        options: [
            {
                label: 'Absolute contraindication present',
                description: 'Peritonitis, free air, or shock',
                next: 'intuss-surgery',
                urgency: 'critical',
            },
            {
                label: 'Higher risk features',
                description: 'Prolonged symptoms, age extremes, bleeding',
                next: 'intuss-higher-risk',
                urgency: 'urgent',
            },
            {
                label: 'Standard risk',
                description: 'Good candidate for enema reduction',
                next: 'intuss-reduction',
            },
        ],
        summary: 'Absolute contraindications: peritonitis, free air, shock → straight to surgery',
    },
    {
        id: 'intuss-surgery',
        type: 'result',
        module: 3,
        title: 'Surgical Intervention Required',
        body: '**Immediate Surgical Consultation Required:**\n\n**Indications for Surgery:**\n- Peritonitis\n- Pneumoperitoneum (perforation)\n- Hemodynamic instability despite resuscitation\n- Failed enema reduction (after 2-3 attempts)\n- Confirmed pathologic lead point\n- Recurrent intussusception (3+ episodes)\n\n**Pre-Operative Management:**\n- NPO\n- IV access x 2\n- Fluid resuscitation (NS 20 mL/kg boluses as needed)\n- Type and screen\n- Broad-spectrum antibiotics if perforation suspected\n- NG tube for decompression if obstructed\n\n**Surgical Approach:**\n- Laparoscopic reduction preferred when possible\n- Open laparotomy if unstable or complex\n- Manual reduction vs. resection depending on viability\n- Resection required if necrotic bowel or lead point',
        citation: [1, 2, 10],
        recommendation: 'Immediate surgical consultation. NPO, IV access x 2, fluid resuscitation, type and screen. Antibiotics if perforation suspected.',
        confidence: 'recommended',
        summary: 'Surgery for peritonitis, perforation, shock, failed reduction, or pathologic lead point',
    },
    {
        id: 'intuss-higher-risk',
        type: 'info',
        module: 3,
        title: 'Higher Risk Features',
        body: '**Patients with Higher Failure Risk:**\n\n**Age Extremes:**\n- **<3 months:** Higher risk of pathologic lead point; if intussusception confirmed, surgical consultation early\n- **>5 years:** Lead point present in ~30% (vs 3% in younger); consider CT to evaluate for lead point\n\n**Prolonged Symptoms (>48 hours):**\n- Lower success rate for reduction\n- Higher risk of bowel compromise\n- Still attempt enema if no contraindications\n\n**Clinical Concerns:**\n- Bloody stool (ischemia)\n- Severe lethargy\n- Dehydration\n\n**Management Approach:**\n1. Surgical consultation BEFORE reduction attempt\n2. Have OR on standby\n3. Aggressive IV hydration\n4. Proceed with enema reduction if no absolute contraindications\n5. Lower threshold for operative intervention if reduction fails',
        citation: [8, 10],
        next: 'intuss-reduction',
        summary: 'Age <3mo or >5yr = higher lead point risk. Get surgery consult early, still attempt enema.',
    },
    // =====================================================================
    // MODULE 4: REDUCTION
    // =====================================================================
    {
        id: 'intuss-reduction',
        type: 'info',
        module: 4,
        title: 'Enema Reduction',
        body: '[Reduction Contraindications](#/info/intuss-contraindications)\n\n**Methods:**\n\n**Pneumatic (Air) Reduction:**\n- Most widely used in North America\n- Success rate: 80-95%\n- Faster reduction time\n- Perforation detectable immediately (pneumoperitoneum)\n- Max pressure: 80-120 mmHg\n\n**Hydrostatic (Saline) Reduction:**\n- Under US guidance (no radiation)\n- Success rate: 73-86%\n- Preferred in some institutions\n- Lower perforation risk\n\n**Pre-Reduction:**\n- IV access established\n- NPO\n- Surgical consultation notified\n- Sedation optional (may improve success)\n- Foley catheter/rectal tube placed\n\n**Technique:**\n- Maximum 3 attempts of 3 minutes each\n- Rest periods between attempts (5-10 min)\n- Continue until complete reduction (contrast/air in terminal ileum)\n- Incomplete reduction = surgical referral',
        citation: [7, 9, 11],
        next: 'intuss-reduction-result',
        summary: 'Air enema 80-95% success; hydrostatic 73-86%. Max 3 attempts, 3 min each.',
    },
    {
        id: 'intuss-reduction-result',
        type: 'question',
        module: 4,
        title: 'Reduction Outcome',
        body: '**Assess reduction result:**\n\n**Successful Reduction:**\n- Air/contrast flows freely into terminal ileum\n- No residual mass on imaging\n- Clinical improvement (less pain, more comfortable)\n\n**Incomplete/Failed Reduction:**\n- Unable to reduce after 2-3 attempts\n- Residual mass on imaging\n- Perforation during procedure\n\n**Perforation During Reduction:**\n- Immediate tension pneumoperitoneum (air enema)\n- Abdominal distension\n- Clinical deterioration\n- Requires immediate surgical intervention\n\n**Perforation Rate:** ~0.5-1% with experienced operators',
        citation: [7, 9],
        options: [
            {
                label: 'Successful reduction',
                description: 'Complete reduction confirmed',
                next: 'intuss-post-reduction',
            },
            {
                label: 'Failed reduction',
                description: 'Unable to reduce after multiple attempts',
                next: 'intuss-surgery',
                urgency: 'urgent',
            },
            {
                label: 'Perforation during reduction',
                description: 'Immediate surgical emergency',
                next: 'intuss-perforation',
                urgency: 'critical',
            },
        ],
        summary: 'Success = air in terminal ileum. Failed reduction or perforation → surgery.',
    },
    {
        id: 'intuss-perforation',
        type: 'result',
        module: 4,
        title: 'Perforation During Reduction',
        body: '**Perforation - Surgical Emergency:**\n\n**Immediate Recognition:**\n- Sudden abdominal distension\n- Tension pneumoperitoneum (if air enema)\n- Hemodynamic deterioration\n- Abdominal rigidity\n\n**Immediate Management:**\n1. STOP the procedure\n2. Call for surgical help immediately\n3. Decompress if tension pneumoperitoneum:\n   - Needle decompression (18G, LUQ or midline)\n   - Relieves intra-abdominal pressure\n4. Aggressive fluid resuscitation\n5. Broad-spectrum antibiotics\n6. Emergent laparotomy\n\n**Antibiotic Coverage:**\n- Piperacillin-tazobactam, OR\n- Ceftriaxone + metronidazole\n\n**Prognosis:**\n- With prompt surgical intervention, outcomes are generally good\n- Bowel resection may be required',
        citation: [2, 9],
        recommendation: 'STOP procedure, decompress abdomen if needed, immediate surgical consultation, IV antibiotics, emergent OR.',
        confidence: 'recommended',
        summary: 'Perforation = surgical emergency. Decompress, resuscitate, emergent laparotomy.',
    },
    // =====================================================================
    // MODULE 5: POST-REDUCTION CARE
    // =====================================================================
    {
        id: 'intuss-post-reduction',
        type: 'info',
        module: 5,
        title: 'Post-Reduction Management',
        body: '**After Successful Reduction:**\n\n**Observation Period:**\n- Minimum 4 hours observation (CHOP guideline)\n- Some institutions observe 6-24 hours\n- Monitor for recurrence (8-10% overall)\n\n**Oral Trial:**\n- Begin clear liquids 2 hours post-reduction\n- Advance diet as tolerated\n- If tolerating PO, good sign for discharge\n\n**Monitoring:**\n- Vital signs q1-2 hours initially\n- Abdominal exams\n- Watch for return of symptoms\n\n**Recurrence Indicators:**\n- Return of episodic pain/crying\n- Vomiting\n- Abdominal distension\n- Lethargy\n\n**If Recurrence Suspected:**\n- Repeat ultrasound\n- Most recurrences occur within 24-48 hours\n- Can attempt repeat enema reduction\n- After 3 recurrences: consider surgical intervention',
        citation: [3, 4, 10],
        next: 'intuss-disposition',
        summary: 'Observe 4+ hours, PO trial at 2 hours, watch for recurrence (8-10%)',
    },
    // =====================================================================
    // MODULE 6: DISPOSITION
    // =====================================================================
    {
        id: 'intuss-disposition',
        type: 'question',
        module: 6,
        title: 'Disposition Decision',
        body: '**Consider Disposition Options:**\n\n**ED Discharge (after successful reduction):**\n- Observation period completed (4+ hours)\n- Tolerating oral intake\n- Asymptomatic\n- Reliable caregivers with transportation\n- Close follow-up available\n\n**Admission Considerations:**\n- Age <36 months (some guidelines)\n- Unable to tolerate PO\n- Prolonged symptoms prior to reduction\n- High-risk features\n- Social concerns / poor follow-up access\n- Multiple enema attempts required\n- Concern for lead point\n\n**Recent evidence (APSA 2021):** Hemodynamically stable patients without critical illness can be safely observed in ED after enema reduction without requiring hospital admission.',
        citation: [3, 10],
        options: [
            {
                label: 'Discharge home',
                description: 'Tolerating PO, asymptomatic, reliable caregivers',
                next: 'intuss-discharge',
            },
            {
                label: 'Admit for observation',
                description: 'Young age, not tolerating PO, or other concerns',
                next: 'intuss-admit',
            },
        ],
        summary: 'ED discharge safe if tolerating PO, asymptomatic, reliable follow-up',
    },
    {
        id: 'intuss-discharge',
        type: 'result',
        module: 6,
        title: 'Discharge Instructions',
        body: '**Discharge Criteria Met:**\n- Successful reduction completed\n- Observation period (4+ hours) completed\n- Tolerating oral intake\n- Asymptomatic\n- Reliable caregivers\n\n**Return Precautions (tell caregivers):**\n\n**Return IMMEDIATELY if:**\n- Episodes of severe crying or drawing up legs\n- Vomiting (especially if green/bilious)\n- Bloody stool or "currant jelly" stool\n- Abdominal distension\n- Lethargy or decreased activity\n- Fever\n- Refusal to eat or drink\n\n**Key Points:**\n- Recurrence happens in ~10% of cases\n- Most recurrences occur within 24-48 hours\n- Recurrences can usually be treated with repeat enema\n\n**Follow-up:**\n- PCP within 24-48 hours\n- Pediatric surgery if lead point suspected',
        citation: [3, 4],
        recommendation: 'Discharge with clear return precautions. PCP follow-up in 24-48 hours. Recurrence rate ~10%.',
        confidence: 'recommended',
        summary: 'Clear return precautions - 10% recurrence, most within 24-48 hours',
    },
    {
        id: 'intuss-admit',
        type: 'result',
        module: 6,
        title: 'Admission for Observation',
        body: '**Admission Indicated:**\n\n**Reasons for Admission:**\n- Age <36 months (per some guidelines)\n- Not tolerating oral intake\n- Persistent symptoms despite successful reduction\n- Multiple reduction attempts required\n- Concern for pathologic lead point\n- Social concerns or poor follow-up access\n- Caregiver discomfort with discharge\n\n**Inpatient Monitoring:**\n- Serial abdominal exams\n- Advance diet as tolerated\n- IV fluids until tolerating PO\n- Monitor for recurrence\n\n**Recurrence Management:**\n- If symptoms recur: repeat ultrasound\n- Repeat enema reduction can be attempted\n- After 3 recurrences: surgical consultation for operative management\n\n**Discharge Criteria:**\n- Tolerating regular diet\n- No abdominal symptoms\n- 12-24 hours without recurrence',
        citation: [3, 10],
        recommendation: 'Admit for serial exams, IV fluids, diet advancement. Discharge when tolerating PO and asymptomatic for 12-24 hours.',
        confidence: 'recommended',
        summary: 'Admit if not tolerating PO, very young, or social concerns',
    },
];
