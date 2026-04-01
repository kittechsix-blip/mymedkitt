// MedKitt — Suicide Risk Assessment
// ED approach to suicidal ideation and self-harm evaluation
// Screening → Risk Stratification → Safety Planning → Lethal Means → Disposition
// 6 modules, 28 nodes total.
export const SUICIDE_RISK_NODES = [
    // =====================================================================
    // MODULE 1: SCREENING & INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'sui-start',
        type: 'info',
        module: 1,
        title: 'Suicide Risk Assessment',
        body: '**Universal screening is standard of care** — Joint Commission requires validated screening for all behavioral health presentations. [1][2]\n\n**ED-SAFE Study:** Universal screening doubled detection (2.9% → 5.7%) and reduced subsequent attempts by 30%. [3]\n\n**Key principles:**\n• Ask directly — asking does NOT increase risk\n• Use validated tool (C-SSRS)\n• Obtain collateral from family/friends\n• Document thoroughly\n\n**ICAR2E mnemonic (ACEP):**\n• **I**dentify risk using validated screening\n• **C**ommunicate with patient about risk\n• **A**ssess warning signs and protective factors\n• **R**educe access to lethal means\n• **R**efer to mental health resources\n• **E**ducate patient and family [4]',
        citation: [1, 2, 3, 4],
        calculatorLinks: [
            { id: 'cssrs-screen', label: 'C-SSRS Screener' },
            { id: 'safety-plan-builder', label: 'Safety Plan Builder' },
        ],
        next: 'sui-cssrs',
    },
    {
        id: 'sui-cssrs',
        type: 'question',
        module: 1,
        title: 'C-SSRS Screening Questions',
        body: '**Columbia Suicide Severity Rating Scale** — ask in order: [1]\n\n**Q1:** Have you wished you were dead or wished you could go to sleep and not wake up? *(Past month)*\n\n**Q2:** Have you actually had any thoughts of killing yourself? *(Past month)*\n\nIf NO to Q2 → skip to Q6\nIf YES to Q2 → ask Q3-Q5\n\n**Q3:** Have you been thinking about how you might do this? *(Plan)*\n\n**Q4:** Have you had these thoughts and had some intention of acting on them? *(Intent)*\n\n**Q5:** Have you started to work out the details of how to kill yourself? *(Planning)*\n\n**Q6:** Have you done anything, started to do anything, or prepared to do anything to end your life? *(Past 3 months - Behavior)*',
        citation: [1],
        options: [
            {
                label: 'YES to Q6 — Recent suicidal behavior',
                description: 'Action, preparation, or attempt in past 3 months',
                next: 'sui-high-risk',
                urgency: 'critical',
            },
            {
                label: 'YES to Q4 or Q5 — Intent or active planning',
                description: 'Thoughts with intention or worked out details',
                next: 'sui-high-risk',
                urgency: 'critical',
            },
            {
                label: 'YES to Q2 or Q3 — Ideation with or without method',
                description: 'Thoughts of killing self, possibly with method in mind',
                next: 'sui-moderate-assess',
            },
            {
                label: 'YES to Q1 only — Passive ideation',
                description: 'Wishes to be dead but no active thoughts of suicide',
                next: 'sui-low-assess',
            },
            {
                label: 'NO to all — Negative screen',
                description: 'No suicidal ideation or behavior',
                next: 'sui-negative-screen',
            },
        ],
    },
    {
        id: 'sui-negative-screen',
        type: 'result',
        module: 1,
        title: 'Negative Suicide Screen',
        body: '**No current suicidal ideation or recent behavior identified.**\n\n**Continue standard care** for presenting complaint.\n\n**Still consider:**\n• Why did this patient present? Address underlying stressors\n• Provide 988 Suicide & Crisis Lifeline information\n• Brief supportive counseling if appropriate\n\n**Document:**\n• C-SSRS screening performed, negative\n• No current suicidal ideation\n• Crisis resources provided',
        recommendation: 'Negative suicide screen. Continue standard care. Provide crisis resources.',
        confidence: 'recommended',
        citation: [1, 2],
    },
    // =====================================================================
    // MODULE 2: RISK STRATIFICATION
    // =====================================================================
    {
        id: 'sui-high-risk',
        type: 'info',
        module: 2,
        title: 'HIGH Risk — Active SI with Intent/Plan/Behavior',
        body: '**This patient is at HIGH risk for suicide.** [5][6]\n\n**Immediate actions:**\n• 1:1 observation / suicide precautions\n• Remove all potential means from room (cords, sharps, medications)\n• Do NOT leave patient alone\n• Contact psychiatric consultation\n\n**Assess for markers of serious intent:**\n• High-lethality method planned (firearm, hanging, jumping)\n• Steps taken to avoid discovery\n• Final acts (note, giving away possessions)\n• Prior high-lethality attempt\n\n**Evaluate for medical stability:**\n• Any ingestion or self-harm requiring medical treatment?\n• Intoxication level — can patient participate in psychiatric evaluation?',
        citation: [5, 6],
        next: 'sui-high-factors',
    },
    {
        id: 'sui-high-factors',
        type: 'question',
        module: 2,
        title: 'High-Risk Factor Assessment',
        body: '**Non-modifiable risk factors:**\n• Prior suicide attempt (STRONGEST predictor)\n• Family history of suicide\n• Male sex, older age\n• Chronic pain or terminal illness\n\n**Modifiable risk factors:**\n• Access to lethal means (especially firearms)\n• Untreated psychiatric illness\n• Hopelessness\n• Substance use/intoxication\n• Social isolation\n• Recent loss or stressor\n• Sleep disturbance\n\n**Protective factors:**\n• Strong social support\n• Reasons for living (children, family)\n• Future-oriented thinking\n• Treatment engagement\n• Religious/spiritual beliefs against suicide [5][6]',
        citation: [5, 6],
        options: [
            {
                label: 'Multiple high-risk factors, few protective',
                next: 'sui-admit',
                urgency: 'critical',
            },
            {
                label: 'Some risk factors but strong protective factors',
                next: 'sui-psych-eval',
            },
        ],
    },
    {
        id: 'sui-moderate-assess',
        type: 'info',
        module: 2,
        title: 'MODERATE Risk — Ideation Without Clear Intent',
        body: '**Suicidal ideation present but no clear intent or recent behavior.**\n\n**Full assessment required:**\n• Duration and frequency of thoughts\n• Specific method considered?\n• What has prevented acting?\n• Access to means?\n• Support system availability\n• Psychiatric history\n• Substance use\n\n**Key question:** *"What has kept you from acting on these thoughts?"*\n\nThis identifies protective factors and reasons for living. [5][6]',
        citation: [5, 6],
        next: 'sui-moderate-factors',
    },
    {
        id: 'sui-moderate-factors',
        type: 'question',
        module: 2,
        title: 'Moderate Risk Assessment',
        body: '**Evaluate the balance of risk vs. protective factors.**\n\n**Questions to determine disposition:**\n• Can patient contract for safety? (Limited value as sole criterion)\n• Is there a reliable support person who can supervise?\n• Can lethal means be restricted?\n• Is outpatient follow-up available within 24-72 hours?\n• Is patient sober and able to engage in safety planning?\n\n**If uncertain:** Err on the side of psychiatric consultation/admission.',
        citation: [5, 6],
        options: [
            {
                label: 'Concerning features — escalate to high risk',
                description: 'Method available, poor support, can\'t contract for safety',
                next: 'sui-admit',
                urgency: 'critical',
            },
            {
                label: 'Manageable risk — can proceed to safety planning',
                description: 'Good support, can restrict means, follow-up available',
                next: 'sui-safety-plan',
            },
        ],
    },
    {
        id: 'sui-low-assess',
        type: 'info',
        module: 2,
        title: 'LOWER Risk — Passive Ideation Only',
        body: '**Passive ideation (wishes to be dead) without active suicidal thoughts.**\n\n**Still requires:**\n• Full assessment of risk/protective factors\n• Exploration of underlying causes\n• Safety planning\n• Lethal means counseling\n• Outpatient referral\n\n**Consider hospitalization if:**\n• Recent escalation\n• Poor insight\n• Severe depression or psychosis\n• No social support\n• History of rapid escalation in past',
        citation: [5, 6],
        next: 'sui-safety-plan',
    },
    // =====================================================================
    // MODULE 3: SAFETY PLANNING
    // =====================================================================
    {
        id: 'sui-safety-plan',
        type: 'info',
        module: 3,
        title: 'Stanley-Brown Safety Planning',
        body: '**Evidence-based 6-step collaborative safety plan** [7]\n\nCreate WITH the patient, not FOR them. Give copy to patient AND support person.\n\n**Step 1: Warning Signs**\n*"What thoughts, moods, or situations tell you a crisis is starting?"*\n\n**Step 2: Internal Coping**\n*"What can you do by yourself to take your mind off problems?"*\n(Exercise, music, journaling, deep breathing)\n\n**Step 3: Social Distractions**\n*"Who can you be around that helps you feel better?"*\n(People/places that distract without discussing crisis)\n\n**Step 4: Support Contacts**\n*"Who can you call when you need help?"*\n(Names + phone numbers of friends/family)\n\n**Step 5: Professional Resources**\n• 988 Suicide & Crisis Lifeline\n• Local crisis team number\n• ED callback number\n• Outpatient provider\n\n**Step 6: Lethal Means Restriction**\n*"How will you limit access to things that could harm you?"*',
        citation: [7],
        calculatorLinks: [
            { id: 'safety-plan-builder', label: 'Safety Plan Builder' },
        ],
        next: 'sui-lethal-means',
    },
    {
        id: 'sui-lethal-means',
        type: 'info',
        module: 3,
        title: 'Lethal Means Counseling (CALM)',
        body: '**Reducing access to lethal means during crisis saves lives.** [8]\n\n**Firearms (50% of suicides):**\n• Store outside home temporarily (trusted friend, family, gun range, police)\n• Lock in safe with ammunition stored separately\n• Cable lock through action\n• Remove firing pin\n\n**Medications:**\n• Give to family member to dispense\n• Lock in safe or lockbox\n• Dispose of unused medications\n• Limit quantities prescribed\n\n**Other means:**\n• Secure sharps, ropes, cords\n• Car keys to support person if driving into traffic considered\n\n**Involve support person:**\n• Family/friend takes possession or supervises access\n• Educate them on importance\n• Plan follow-up call at 48-72h to verify implementation',
        citation: [8],
        next: 'sui-discharge-criteria',
    },
    // =====================================================================
    // MODULE 4: DISPOSITION
    // =====================================================================
    {
        id: 'sui-admit',
        type: 'result',
        module: 4,
        title: 'Psychiatric Admission Indicated',
        body: '**This patient requires inpatient psychiatric admission.** [5][6]\n\n**Indications:**\n• Active suicidal ideation with intent and plan\n• Recent serious attempt\n• Unable to contract for safety\n• No social support\n• Psychotic symptoms\n• Severe intoxication with persistent SI when sober\n• Unable to engage in safety planning\n\n**Actions:**\n• Maintain 1:1 observation\n• Medical clearance per local protocol\n• Contact inpatient psychiatry for bed\n• If no beds, patient remains in ED on precautions\n• Document risk assessment and rationale for admission\n\n**If patient refuses:**\n• Evaluate capacity\n• Consider emergency detention/hold per state law\n• Document imminent danger to self',
        recommendation: 'Psychiatric admission indicated. Maintain suicide precautions. Contact inpatient psychiatry.',
        confidence: 'definitive',
        citation: [5, 6],
    },
    {
        id: 'sui-psych-eval',
        type: 'info',
        module: 4,
        title: 'Psychiatric Consultation Required',
        body: '**Consult psychiatry for formal evaluation and disposition recommendation.**\n\n**Prepare for consultant:**\n• C-SSRS results\n• Risk and protective factors identified\n• Collateral information obtained\n• Medical clearance completed\n• Patient\'s stated wishes\n\n**While awaiting consult:**\n• Maintain appropriate observation level\n• Continue supportive care\n• Avoid confrontational approach\n• Allow support person presence if calming',
        citation: [5, 6],
        next: 'sui-psych-decision',
    },
    {
        id: 'sui-psych-decision',
        type: 'question',
        module: 4,
        title: 'Psychiatry Recommendation',
        body: '**What did the psychiatric consultant recommend?**\n\nConsultant should provide:\n• Risk level assessment\n• Specific disposition recommendation\n• Follow-up plan if discharging\n• Treatment recommendations',
        options: [
            {
                label: 'Admit to inpatient psychiatry',
                next: 'sui-admit',
            },
            {
                label: 'Safe for discharge with plan',
                next: 'sui-discharge-criteria',
            },
            {
                label: 'Partial hospitalization or IOP',
                next: 'sui-partial',
            },
        ],
    },
    {
        id: 'sui-partial',
        type: 'result',
        module: 4,
        title: 'Partial Hospitalization / IOP',
        body: '**Intensive outpatient treatment recommended.**\n\n**Appropriate when:**\n• Moderate risk but stable\n• Good support system at home\n• Able to contract for safety overnight\n• Can attend daily programming\n\n**Discharge requirements:**\n• Safety plan completed\n• Lethal means counseling done\n• Program intake scheduled for next business day\n• 24/7 crisis resources provided\n• Support person educated\n• Follow-up call planned',
        recommendation: 'Discharge to partial hospitalization or intensive outpatient. Safety plan and means restriction completed.',
        confidence: 'recommended',
        citation: [5, 6],
    },
    {
        id: 'sui-discharge-criteria',
        type: 'question',
        module: 4,
        title: 'Safe Discharge Checklist',
        body: '**ALL criteria must be met for safe ED discharge:** [5][6]\n\n☐ Low-to-moderate risk after full assessment\n☐ Patient engaged in safety planning\n☐ Written safety plan given to patient AND support person\n☐ Lethal means counseling completed with specific plan\n☐ Reliable support person present and educated\n☐ Outpatient follow-up confirmed within 24-72 hours\n☐ 988 and crisis resources provided\n☐ Patient is sober\n☐ Post-discharge call planned (24-72 hours)\n\n**Missing ANY criterion → reconsider discharge or consult psychiatry.**',
        citation: [5, 6],
        options: [
            {
                label: 'All criteria met — safe to discharge',
                next: 'sui-discharge-final',
            },
            {
                label: 'Criteria not met — need intervention',
                next: 'sui-discharge-barriers',
            },
        ],
    },
    {
        id: 'sui-discharge-barriers',
        type: 'question',
        module: 4,
        title: 'Address Discharge Barriers',
        body: '**What barrier(s) prevent safe discharge?**\n\nAddress each before discharging or escalate care level.',
        options: [
            {
                label: 'No support person available',
                description: 'Social work consult, consider admission',
                next: 'sui-no-support',
            },
            {
                label: 'Cannot restrict lethal means',
                description: 'Firearms in home, won\'t give up access',
                next: 'sui-means-barrier',
            },
            {
                label: 'No follow-up available',
                description: 'No insurance, no outpatient access',
                next: 'sui-no-followup',
            },
            {
                label: 'Patient intoxicated',
                description: 'Re-evaluate when sober',
                next: 'sui-intox',
            },
        ],
    },
    {
        id: 'sui-no-support',
        type: 'info',
        module: 4,
        title: 'No Support Person Available',
        body: '**Absence of support increases risk significantly.**\n\n**Options:**\n• Social work consult to identify resources\n• Contact family/friends patient hasn\'t considered\n• Crisis respite programs if available locally\n• Extended ED observation with intensive safety planning\n• Consider admission if truly no support\n\n**Document:**\n• Efforts made to identify support\n• Resources offered\n• Rationale for final disposition',
        citation: [5, 6],
        next: 'sui-discharge-criteria',
    },
    {
        id: 'sui-means-barrier',
        type: 'info',
        module: 4,
        title: 'Lethal Means Restriction Barrier',
        body: '**If patient or family refuses means restriction:**\n\n**For firearms:**\n• Explain that temporary removal saves lives\n• Offer alternatives: gun safe with code held by friend, store at range or PD\n• If patient insists on keeping at home, strongly document counseling provided and refusal\n• Consider whether this refusal indicates higher risk → admission\n\n**Involve family/support:**\n• Can they secure means without patient\'s agreement?\n• Legal implications vary by state\n\n**If means cannot be restricted and risk is elevated:**\n• This is grounds for psychiatric admission or extended observation\n• Document thoroughly',
        citation: [8],
        next: 'sui-discharge-criteria',
    },
    {
        id: 'sui-no-followup',
        type: 'info',
        module: 4,
        title: 'No Outpatient Follow-up Available',
        body: '**Follow-up within 24-72 hours is critical** — highest risk is first 30 days post-discharge.\n\n**Options:**\n• Federally Qualified Health Center (FQHC) — sliding scale\n• Community mental health center\n• Crisis stabilization unit\n• Hospital outpatient psychiatry clinic\n• ED-based case management to establish care\n• Telehealth psychiatry options\n\n**If truly no options:**\n• Schedule phone follow-up with ED\n• Longer observation period in ED\n• Consider admission for stabilization until follow-up arranged',
        citation: [3, 5],
        next: 'sui-discharge-criteria',
    },
    {
        id: 'sui-intox',
        type: 'info',
        module: 4,
        title: 'Patient Intoxicated',
        body: '**Patients cannot be accurately assessed for suicide risk while intoxicated.**\n\n**Management:**\n• Observe until clinically sober\n• Re-administer C-SSRS when sober\n• Reassess risk level and protective factors\n• Many patients will have resolution of acute SI with sobriety\n\n**Document:**\n• Initial presentation and SI\n• Reassessment when sober\n• Change in risk level\n\n**Note:** Chronic alcohol or substance use is a risk factor — address even if acute SI resolves.',
        citation: [5, 6],
        next: 'sui-cssrs',
    },
    // =====================================================================
    // MODULE 5: DISCHARGE & DOCUMENTATION
    // =====================================================================
    {
        id: 'sui-discharge-final',
        type: 'result',
        module: 5,
        title: 'Safe Discharge with Follow-up',
        body: '**Patient meets criteria for safe ED discharge.** [5][6]\n\n**Discharge packet includes:**\n• Written safety plan (patient copy + chart copy)\n• 988 Suicide & Crisis Lifeline card\n• Local crisis line number\n• Appointment confirmation for outpatient follow-up\n• ED callback number\n\n**Support person education:**\n• Reviewed warning signs\n• Knows to call 911 or bring back if SI worsens\n• Has copy of safety plan\n• Understands lethal means restriction plan\n\n**Post-discharge call:**\n• Schedule for 24-72 hours\n• Check on safety plan adherence\n• Verify follow-up appointment kept\n• Assess current mental status',
        recommendation: 'Safe for discharge. Safety plan completed. Lethal means counseling done. Follow-up scheduled within 72 hours.',
        confidence: 'recommended',
        citation: [5, 6],
        next: 'sui-documentation',
    },
    {
        id: 'sui-documentation',
        type: 'info',
        module: 5,
        title: 'Documentation Requirements',
        body: '**Joint Commission (NPSG.15.01.01) requirements:** [2]\n\n**Document all of:**\n☐ Validated screening tool used (C-SSRS) and results\n☐ Risk factors identified (list specific ones)\n☐ Protective factors identified\n☐ Collateral obtained (family, records, outpatient providers)\n☐ Mental status examination\n☐ Lethal means assessment and counseling provided\n☐ Risk stratification with rationale\n☐ Safety plan completed (copy in chart)\n☐ Disposition decision and clinical rationale\n☐ Specific follow-up plan with appointment details\n☐ Crisis resources provided\n\n**Sentinel Event Note:**\nSuicide within **7 days** of ED discharge is now a sentinel event (updated 2024). [2]\n\n**Key phrases for documentation:**\n• "Patient denied active suicidal ideation with intent or plan"\n• "Lethal means counseling provided regarding [specific means]"\n• "Safety plan completed collaboratively with patient"',
        citation: [2],
    },
    // =====================================================================
    // MODULE 6: SPECIAL POPULATIONS
    // =====================================================================
    {
        id: 'sui-special-pops',
        type: 'question',
        module: 6,
        title: 'Special Populations',
        body: '**Some populations require modified approach.**\n\nSelect if applicable:',
        options: [
            {
                label: 'Pediatric/Adolescent (12-17)',
                next: 'sui-peds',
            },
            {
                label: 'Geriatric (65+)',
                next: 'sui-geriatric',
            },
            {
                label: 'Veteran / Military',
                next: 'sui-veteran',
            },
            {
                label: 'None — return to standard assessment',
                next: 'sui-cssrs',
            },
        ],
    },
    {
        id: 'sui-peds',
        type: 'info',
        module: 6,
        title: 'Pediatric/Adolescent Considerations',
        body: '**Mental health now 1 in 7 pediatric ED visits.** [5]\n\n**Key differences:**\n• Involve parents/guardians in ALL lethal means counseling\n• Parents often unaware of access to means in home\n• Social media and cyberbullying assessment\n• School performance and peer relationships\n• LGBTQ+ youth at elevated risk — affirming approach essential\n\n**Lethal means in homes with children:**\n• 40% of US homes with children have firearms\n• Many parents underestimate children\'s knowledge of location\n• Ask specifically: "Do you have firearms in the home? Are they locked? Where is the ammunition?"\n\n**Disposition:**\n• Lower threshold for admission given limited coping skills\n• Require parental supervision at all times post-discharge\n• School-based counseling referral',
        citation: [5],
        next: 'sui-cssrs',
    },
    {
        id: 'sui-geriatric',
        type: 'info',
        module: 6,
        title: 'Geriatric Considerations',
        body: '**Elderly have highest suicide completion rate.** [5][6]\n\n**Key differences:**\n• 81.9% hospitalization rate for suicidal ideation/self-harm\n• More likely to use highly lethal methods (firearms)\n• Less likely to disclose SI — actively screen\n• Physical illness and chronic pain major contributors\n• Social isolation and loss of independence\n• Cognitive impairment may limit insight\n\n**Assessment:**\n• Depression screening (PHQ-9, GDS)\n• Functional assessment\n• Social support network\n• Caregiver burden if applicable\n\n**Disposition:**\n• Lower threshold for admission\n• Geriatric psychiatry consultation if available\n• Home safety evaluation\n• Visiting nurse or home health referral',
        citation: [5, 6],
        next: 'sui-cssrs',
    },
    {
        id: 'sui-veteran',
        type: 'info',
        module: 6,
        title: 'Veteran/Military Considerations',
        body: '**Veterans have elevated suicide risk.** [5]\n\n**Risk factors:**\n• Combat exposure and moral injury\n• PTSD and TBI\n• Military sexual trauma\n• Transition to civilian life\n• Loss of unit cohesion and identity\n• High firearm ownership\n\n**Assessment:**\n• C-SSRS with attention to PTSD symptoms\n• Lethal means counseling — veterans often own multiple firearms\n• VA connection status\n\n**Resources:**\n• Veterans Crisis Line: 988, then press 1\n• VA Same Day Mental Health Access\n• Vet Centers (community-based, not VA facilities)\n\n**Coordination:**\n• If patient has VA connection, contact VA for care coordination\n• Many veterans prefer VA care — facilitate warm handoff',
        citation: [5],
        next: 'sui-cssrs',
    },
];
// ---------------------------------------------------------------------------
// Module Labels
// ---------------------------------------------------------------------------
export const SUICIDE_RISK_MODULE_LABELS = [
    'Screening',
    'Risk Stratification',
    'Safety Planning',
    'Disposition',
    'Discharge',
    'Special Populations',
];
// ---------------------------------------------------------------------------
// Citations
// ---------------------------------------------------------------------------
export const SUICIDE_RISK_CITATIONS = [
    { num: 1, text: 'Posner K, et al. The Columbia-Suicide Severity Rating Scale: Initial Validity and Internal Consistency Findings. Am J Psychiatry. 2011;168(12):1266-1277.' },
    { num: 2, text: 'The Joint Commission. R3 Report Issue 18: National Patient Safety Goal for Suicide Prevention. Joint Commission; 2024.' },
    { num: 3, text: 'Boudreaux ED, et al. Improving Suicide Risk Screening and Detection in the Emergency Department (ED-SAFE). Am J Emerg Med. 2016;34(4):722-729.' },
    { num: 4, text: 'ACEP. Suicide Prevention Resources for Emergency Clinicians. ACEP.org; 2024.' },
    { num: 5, text: 'Caring for Adult Patients with Suicide Risk: A Consensus Guide for Emergency Departments. Suicide Prevention Resource Center; 2023.' },
    { num: 6, text: 'Emergency Department Best Practices for Suicide Prevention. National Action Alliance for Suicide Prevention; 2024.' },
    { num: 7, text: 'Stanley B, Brown GK. Safety Planning Intervention: A Brief Intervention to Mitigate Suicide Risk. Cogn Behav Pract. 2012;19(2):256-264.' },
    { num: 8, text: 'Barber CW, Miller MJ. Reducing a Suicidal Person\'s Access to Lethal Means of Suicide (CALM). Zero Suicide; 2023.' },
];
