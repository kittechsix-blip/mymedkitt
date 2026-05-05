// myMedKitt — Stop Pages Batch 13
// Psychiatry consult critical pitfalls: psych-triage, acute-psychosis,
// capacity-assessment, catatonia, NMS.
const PSYCH_TRIAGE_STOP = {
    id: 'psych-triage-stop',
    title: 'Psych Triage — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
        {
            heading: '🛑 Do NOT skip a medical workup on a psychiatric presentation',
            body: 'Up to **20% of patients labeled "psychiatric"** have an underlying organic cause — hypoglycemia, hypoxia, infection, electrolyte derangement, intoxication/withdrawal, intracranial pathology. Vital signs, glucose, and a focused neuro exam are mandatory before any psych disposition. "Frequent flyer" status does not exempt the patient from a real evaluation. [See this node](#/node/pst-altered).',
        },
        {
            heading: '🛑 Do NOT lead with chemical restraint for agitation',
            body: 'Verbal de-escalation, environmental control, and offered oral medications (PRN benzo or antipsychotic) come first whenever safety allows. IM/IV chemical restraint risks oversedation, aspiration, QTc prolongation, and trauma during forced administration. Reserve it for imminent danger. [See this node](#/node/pst-agitated).',
        },
        {
            heading: '🛑 Do NOT leave a suicidal patient unobserved',
            body: 'High-risk patients require **1:1 line-of-sight observation**, removal of ligatures, sharps, belts, shoelaces, and a search of personal effects. Bathroom breaks must be supervised. Most ED suicide events occur in unmonitored bathrooms or behind privacy curtains. [See this node](#/node/pst-suicidal).',
        },
        {
            heading: '🛑 Do NOT delay benzodiazepines in alcohol withdrawal',
            body: 'Early symptom-triggered benzodiazepine dosing prevents seizures, delirium tremens, and ICU admission. Tremor + tachycardia + sweating in a known drinker = treat now, do not wait for "psych clearance." Untreated DTs carry **5–15% mortality**. [See this node](#/node/pst-withdrawal).',
        },
        {
            heading: '🛑 Do NOT give antipsychotics if catatonia is on the differential',
            body: 'Antipsychotics in a catatonic patient can precipitate **malignant catatonia or NMS**. If the patient has waxy flexibility, mutism, posturing, staring, negativism, or stereotypy → start with a lorazepam challenge, NOT haloperidol. [See this node](#/node/pst-catatonia).',
        },
        {
            heading: '🛑 Do NOT discharge without an explicit safety plan',
            body: 'Disposition home requires: a sober adult who can supervise, removal of lethal means (especially firearms), 24-hour psych follow-up arranged, written crisis hotline (988), and a documented contingency plan. Verbal "be safe" is not a safety plan. [See this node](#/node/pst-suicidal).',
        },
        {
            heading: '🛑 Do NOT use physical restraints without ongoing reassessment',
            body: 'Restraints require **q15-min vital signs and circulation checks**, time-limited orders, and active de-escalation efforts to remove them. Prolonged restraint causes rhabdomyolysis, DVT, asphyxia, and death. Document medical necessity at every check.',
        },
        {
            heading: '🛑 Do NOT miss an eating-disorder patient who needs medical admission',
            body: 'Refeeding syndrome, electrolyte collapse, and arrhythmia kill these patients in the ED — not the eating disorder itself. **HR <40, BP <80/50, K <3.0, phos <2.5, QTc >500, BMI <14** = medical admission, not psych floor. [See this node](#/node/pst-eating).',
        },
    ],
    citations: [],
};
const ACUTE_PSYCHOSIS_STOP = {
    id: 'acute-psychosis-stop',
    title: 'Acute Psychosis — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
        {
            heading: '🛑 Do NOT skip the organic workup in new-onset psychosis age >45',
            body: 'Primary psychiatric psychosis almost always presents before age 40. **New psychosis after 45 = medical cause until proven otherwise** — stroke, tumor, autoimmune encephalitis, neurosyphilis, dementia with psychosis, metabolic, drug-induced. Get CT head, full labs, urine tox, and consider LP. [See this node](#/node/ap-late-onset).',
        },
        {
            heading: '🛑 Do NOT miss anti-NMDA receptor encephalitis',
            body: 'Classic triad: **young woman, viral prodrome, psychosis + orofacial dyskinesia or autonomic instability**. ~50% have ovarian teratoma. CSF pleocytosis, EEG slowing, MRI often normal. Mimics primary psychosis but progresses to seizures, dystonia, and coma if untreated. Lifesaving: high-dose steroids + IVIG/PLEX + tumor removal. [See this node](#/node/ap-nmda).',
        },
        {
            heading: '🛑 Do NOT confuse delirium with psychosis',
            body: 'Delirium is **acute, fluctuating, with inattention and visual hallucinations**. Primary psychosis is gradual, with preserved attention and predominantly auditory hallucinations. Treating delirium with antipsychotics without addressing the underlying medical cause is malpractice. [See this node](#/node/ap-delirium).',
        },
        {
            heading: '🛑 Do NOT give IV haloperidol without a baseline ECG',
            body: 'IV haloperidol carries a **black-box QTc prolongation warning**. Get an ECG before dosing, especially in elderly, electrolyte-deranged, or polypharmacy patients. QTc >500 ms or co-administration with other QT-prolonging drugs → choose a different agent. [See this node](#/node/ap-antipsychotic).',
        },
        {
            heading: '🛑 Do NOT mix haloperidol + lorazepam in the same syringe',
            body: 'They **precipitate** when combined. Draw and inject in separate syringes (different sites, or sequentially through the same IV with a flush). The "B-52" (haloperidol + lorazepam + diphenhydramine) is given as separate injections, not a true mixture.',
        },
        {
            heading: '🛑 Do NOT give antipsychotics to a catatonic-presenting patient',
            body: 'Catatonia masquerading as "negative symptoms of schizophrenia" can be worsened or converted to **malignant catatonia/NMS** by antipsychotics. If the patient has mutism, immobility, posturing, or echolalia → lorazepam challenge first. [See this node](#/node/ap-treatment).',
        },
        {
            heading: '🛑 Do NOT discharge a first-break psychosis from the ED',
            body: 'First-episode psychosis warrants inpatient psychiatric admission for safety, definitive diagnosis, antipsychotic initiation with monitoring, and family education. Outpatient management of first-break carries higher relapse, suicide, and treatment-disengagement rates. [See this node](#/node/ap-disposition).',
        },
        {
            heading: '🛑 Do NOT forget the basic toxicology workup',
            body: 'Stimulants (methamphetamine, cocaine, bath salts), cannabis (especially synthetic), PCP, hallucinogens, anticholinergics, and steroid use can all produce psychosis. Urine drug screen + targeted history. A negative UDS does NOT rule out designer drugs — they are not on standard panels. [See this node](#/node/ap-workup).',
        },
        {
            heading: '🛑 Do NOT assume known schizophrenia explains every new symptom',
            body: 'Patients with chronic psychosis still get strokes, infections, and intoxications. Anchoring on the chart diagnosis ("schizoaffective, off meds again") misses the new pneumonia, the SDH from a fall, or the DKA. New presentation = full workup, every time. [See this node](#/node/ap-known).',
        },
    ],
    citations: [],
};
const CAPACITY_ASSESSMENT_STOP = {
    id: 'capacity-assessment-stop',
    title: 'Capacity Assessment — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
        {
            heading: '🛑 Do NOT confuse capacity with competency',
            body: '**Capacity is clinical** (assessed by physicians, decision-specific, can fluctuate). **Competency is legal** (determined by a court, global). Any physician can — and must — assess capacity in real time. Do not defer routine medical decisions to a court hearing. [See this node](#/node/cap-definitions).',
        },
        {
            heading: '🛑 Do NOT assume capacity is global',
            body: 'A patient may have capacity to refuse a blood draw but lack it to consent to surgery. **Assess for the SPECIFIC decision in front of you**, with attention to its risk/benefit complexity. A higher-risk decision warrants a higher capacity threshold (sliding scale). [See this node](#/node/cap-start).',
        },
        {
            heading: '🛑 Do NOT equate mental illness with lack of capacity',
            body: 'Schizophrenia, depression, anxiety, dementia, and intellectual disability do **not automatically remove capacity**. Many psychiatric patients retain capacity for many decisions. The diagnosis is not the test — the four abilities are. [See this node](#/node/cap-aid4).',
        },
        {
            heading: '🛑 Do NOT skip the "appreciation" test',
            body: 'Patients can recite a treatment plan back verbatim ("understand") yet still fail to **apply it to themselves** ("appreciate"). Example: "I have cancer and chemo helps, but I don\'t need it because I\'m not really sick." Understanding without appreciation = lacks capacity. [See this node](#/node/cap-questions).',
        },
        {
            heading: '🛑 Do NOT confuse refusal with incapacity',
            body: 'A patient can disagree with the medical team and still have capacity. "Unwise" decisions are not the same as "incapacitated" decisions. The bar is reasoning process, not outcome. [See this node](#/node/cap-refusing).',
        },
        {
            heading: '🛑 Do NOT let an AMA discharge happen without a documented capacity assessment',
            body: 'AMA without capacity documentation is medicolegally indefensible. Note: the specific decision, the four abilities tested, the patient\'s stated reasoning, risks discussed, alternatives offered, and the determination. A signed AMA form is NOT a substitute for this documentation. [See this node](#/node/cap-ama).',
        },
        {
            heading: '🛑 Do NOT use a generic mental status score as your capacity exam',
            body: 'MMSE, MoCA, and orientation checks measure cognition — they do **not** measure decision-specific capacity. A patient can score 30/30 on the MMSE and still lack capacity for a complex decision; another can score 18/30 and retain capacity for a simple one. Test the four abilities directly. [See this node](#/node/cap-assessment).',
        },
        {
            heading: '🛑 Do NOT ignore reversible causes before declaring incapacity',
            body: 'Pain, sedation, hypoxia, hypoglycemia, urinary retention, infection, withdrawal, and benzodiazepine effect can all transiently abolish capacity. **Reassess after the reversible cause is addressed** before final determination. [See this node](#/node/cap-unclear).',
        },
        {
            heading: '🛑 Do NOT skip the documentation',
            body: 'Document the **specific decision**, the abilities tested, the patient\'s actual responses (quote when possible), your reasoning, the determination, and (if lacking) who is now the surrogate decision-maker per state hierarchy. "Patient lacks capacity" alone is not adequate. [See this node](#/node/cap-documentation).',
        },
    ],
    citations: [],
};
const CATATONIA_STOP = {
    id: 'catatonia-stop',
    title: 'Catatonia — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
        {
            heading: '🛑 Do NOT give antipsychotics to a catatonic patient',
            body: 'First- and second-generation antipsychotics can convert simple catatonia into **malignant catatonia or NMS** — autonomic instability, hyperthermia, rigidity, death. Hold all dopamine blockers until catatonia is resolved. Treat with benzodiazepines first. [See this node](#/node/cat-avoid-ap).',
        },
        {
            heading: '🛑 Do NOT skip the lorazepam challenge',
            body: 'IV lorazepam 1–2 mg, with response assessed at 10–15 minutes, is **diagnostic and therapeutic**. A clear response confirms catatonia and predicts ongoing benzodiazepine responsiveness. Skipping the challenge means missed diagnoses and inappropriate antipsychotic exposure. [See this node](#/node/cat-challenge).',
        },
        {
            heading: '🛑 Do NOT miss medical/neurologic causes',
            body: 'Catatonia is a **syndrome, not a diagnosis**. Causes: autoimmune encephalitis (anti-NMDA), infection, metabolic (hyponatremia, uremia, hepatic), stroke, seizure (NCSE), endocrine (hyper/hypothyroid), drug withdrawal, NMS itself. Get CT head, full labs, EEG, and consider LP. [See this node](#/node/cat-etiology).',
        },
        {
            heading: '🛑 Do NOT confuse catatonia with conversion or "uncooperative"',
            body: 'Catatonic patients **cannot** participate, not "will not." Mistaking catatonia for malingering or conversion delays treatment and can be fatal in malignant forms. The Bush-Francis Catatonia Rating Scale takes minutes and clarifies. [See this node](#/node/cat-start).',
        },
        {
            heading: '🛑 Do NOT abruptly stop benzodiazepines once started',
            body: 'Benzodiazepine withdrawal in a catatonic patient can precipitate **malignant catatonia**. Continue scheduled lorazepam (typical: 6–24 mg/day divided) until psychiatry takes over and tapers slowly. [See this node](#/node/cat-positive).',
        },
        {
            heading: '🛑 Do NOT delay ECT referral when benzodiazepines fail',
            body: 'ECT is **highly effective** for catatonia refractory to lorazepam — response rates >85%. It is also the treatment of choice for malignant catatonia. Delay risks rhabdomyolysis, aspiration, DVT/PE, pressure injury, and death. Consult psychiatry early. [See this node](#/node/cat-ect).',
        },
        {
            heading: '🛑 Do NOT forget DVT prophylaxis and pressure-injury care',
            body: 'Immobile catatonic patients develop **DVT, PE, decubitus ulcers, contractures, and aspiration pneumonia**. Pharmacologic prophylaxis (LMWH), pneumatic compression, q2h repositioning, and aspiration precautions are mandatory from admission. [See this node](#/node/cat-disposition).',
        },
        {
            heading: '🛑 Do NOT overlook nutrition and hydration',
            body: 'Catatonic patients often have **profound dehydration, AKI, and refeeding-risk malnutrition** by the time they present. IV fluids, electrolyte replacement, NG feeding if mutism/refusal persists, and refeeding syndrome monitoring are part of the workup, not afterthoughts.',
        },
        {
            heading: '🛑 Do NOT miss the autonomic/hyperthermia red flags',
            body: '**Malignant catatonia** = catatonia + autonomic instability + hyperthermia + rigidity. Mortality ~10–20% if untreated. Looks identical to NMS. Treatment: stop antipsychotics, high-dose benzodiazepines, urgent ECT, ICU. [See this node](#/node/cat-excited).',
        },
    ],
    citations: [],
};
const NMS_STOP = {
    id: 'nms-stop',
    title: 'NMS — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
        {
            heading: '🛑 Do NOT continue the offending agent',
            body: 'Stop **ALL antipsychotics, antiemetics with dopamine antagonism (metoclopramide, prochlorperazine, promethazine), and lithium** immediately. Restart the dopamine agonist if NMS occurred from withdrawal of Parkinson medication. The first treatment is removal of the trigger. [See this node](#/node/nms-stop-agents).',
        },
        {
            heading: '🛑 Do NOT confuse NMS with serotonin syndrome',
            body: '**NMS:** lead-pipe rigidity, hyporeflexia, slow onset (days), trigger = dopamine blocker. **SS:** clonus (especially lower-extremity), hyperreflexia, rapid onset (hours), trigger = serotonergic agent. The treatment differs — bromocriptine helps NMS but worsens SS; cyproheptadine helps SS but does nothing for NMS. [See this node](#/node/nms-vs-ss).',
        },
        {
            heading: '🛑 Do NOT use succinylcholine if rhabdomyolysis is suspected',
            body: 'Severe NMS often produces **CK >5,000–100,000 and hyperkalemia**. Succinylcholine can trigger lethal hyperkalemic cardiac arrest. If intubation is needed, use **rocuronium**. Check K+ and have calcium gluconate, insulin/dextrose, and bicarbonate ready.',
        },
        {
            heading: '🛑 Do NOT miss mild NMS because hyperthermia is absent',
            body: 'Early NMS may present with rigidity, autonomic changes, and mental-status changes BEFORE hyperthermia develops. **Levenson criteria** allow diagnosis without overt fever. Acting early prevents progression to ICU-level disease. [See this node](#/node/nms-criteria).',
        },
        {
            heading: '🛑 Do NOT restart antipsychotics too soon',
            body: 'After NMS resolution, wait **at least 2 weeks (ideally 4–6)** before reintroducing any antipsychotic. Use a low-potency, second-generation agent at the lowest effective dose, with slow titration. Avoid the same agent that caused NMS. Recurrence risk is significant if rechallenged early.',
        },
        {
            heading: '🛑 Do NOT add anticholinergics for "rigidity"',
            body: 'Benztropine, diphenhydramine, and other anticholinergics **impair sweating and worsen hyperthermia**. They do nothing for NMS rigidity (which is dopaminergic, not cholinergic) and increase mortality.',
        },
        {
            heading: '🛑 Do NOT skip aggressive cooling for severe hyperthermia',
            body: 'Core temp >40°C requires **immediate cooling**: ice packs to groin/axilla, evaporative cooling, cold IV fluids, cooling blankets. Antipyretics do not work — NMS hyperthermia is muscle-generated, not hypothalamic. Rapid cooling is the single most important survival intervention. [See this node](#/node/nms-severe).',
        },
        {
            heading: '🛑 Do NOT manage severe NMS outside the ICU',
            body: 'Severe NMS (temp >40°C, AMS, autonomic instability, rhabdo with CK >10,000, AKI) requires ICU-level monitoring for hyperthermia, dysrhythmia, electrolyte management, mechanical ventilation, and renal replacement. Floor admission is inadequate. [See this node](#/node/nms-icu-admit).',
        },
        {
            heading: '🛑 Do NOT forget aggressive IV hydration to protect kidneys',
            body: 'Rhabdomyolysis from rigidity → AKI is a leading cause of NMS mortality. Target UOP **>200 mL/hr** with isotonic crystalloid until CK and creatinine trend down. Consider bicarbonate for urine alkalinization in severe rhabdo. [See this node](#/node/nms-monitoring).',
        },
    ],
    citations: [],
};
export const STOP_PAGES_13 = {
    'psych-triage-stop': PSYCH_TRIAGE_STOP,
    'acute-psychosis-stop': ACUTE_PSYCHOSIS_STOP,
    'capacity-assessment-stop': CAPACITY_ASSESSMENT_STOP,
    'catatonia-stop': CATATONIA_STOP,
    'nms-stop': NMS_STOP,
};
