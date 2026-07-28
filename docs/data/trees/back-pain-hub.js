// MedKitt - Back Pain Hub
//
// EVIDENTIARY BASIS DISCLOSURE (FDA 21st Century Cures Act CDS exemption, Prong 4)
// Every recommendation node in this hub carries a citation array resolving into
// BACK_PAIN_HUB_CITATIONS below. Each reference in that list carries a DOI, PMID,
// or resolvable URL so a clinician can independently retrieve and review the basis
// for any recommendation shown. This tool supports, and does not replace, independent
// clinical judgment.
//
// Primary basis by lane:
//   Imaging appropriateness ......... ACR Appropriateness Criteria Low Back Pain 2021 [1]
//   Nonpharmacologic / pharmacologic  ACP 2017 guideline [2]; Chou 2017 systematic review [10]
//   General acute LBP red flags ..... AAFP 2025 review [11] (supersedes AAFP 2012 [3])
//   Cauda equina / conus ............ Lavy BMJ 2009 [4]; Todd Br J Neurosurg 2017 [5]
//   Spine infection (SEA / NVO) ..... IDSA NVO 2015 [6]; Davis J Emerg Med 2004 [7]; Tande NEJM 2026 [12]
//   Aortic (AAA / dissection) ....... 2022 ACC/AHA aortic disease guideline [8]
//   Malignant cord compression ...... Cole & Patchell Lancet Neurol 2008 [9]
//   Renal / urinary mimics .......... ACR AC Urolithiasis 2023 [13]; ACR AC Acute Pyelonephritis 2022 [14]
//
// Citations last verified against source records: 2026-07-28 (Louis Litt CDS audit).
export const BACK_PAIN_HUB_CRITICAL_ACTIONS = [
    { text: 'Back pain plus urinary retention, saddle symptoms, or progressive weakness needs emergency MRI posture', nodeId: 'bp-cauda' },
    { text: 'Back pain plus fever, IVDU, bacteremia, immunosuppression, or focal tenderness needs spine infection consideration', nodeId: 'bp-spine-infection' },
    { text: 'Older vascular-risk patient with abrupt severe back pain, syncope, hypotension, or abdominal pain needs AAA/dissection posture', nodeId: 'bp-aaa-dissection' },
];
export const BACK_PAIN_HUB_NODES = [
    {
        id: 'bp-start',
        type: 'info',
        module: 1,
        title: 'Back Pain Hub - Sick Check First',
        body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Ruptured / leaking AAA** \u2014 age \u226550 + smoker, pulsatile mass, syncope; bedside US now.\n2. **Spinal epidural abscess** \u2014 fever, IVDU/immunosuppression, point tenderness, deficit.\n3. **Cauda equina syndrome** \u2014 saddle anesthesia, urinary retention, bilateral leg weakness.\n4. **Cord compression from malignancy** \u2014 cancer history, night pain, progressive deficit.\n5. **Aortic dissection / pyelonephritis-urosepsis** \u2014 tearing pain/pulse deficit, or fever + CVA tenderness.\n\nOpen first:\n- [Hub Steps Summary](#/info/bp-steps)\n- [Hub Stop / Pitfalls](#/info/bp-stop)\n\n**First 60 seconds:**\n- General appearance: pale, diaphoretic, unable to sit still, toxic, septic, severe distress?\n- Vitals trend: hypotension, fever, tachycardia, hypoxia.\n- Neuro: leg strength, sensation, reflexes, gait if safe, saddle sensation, bowel/bladder symptoms.\n- Vascular/abdominal: abdominal pain, pulsatile mass, syncope, unequal pulses, tearing pain.\n- Infection risk: IVDU, diabetes, immunosuppression, recent bacteremia, dialysis, spinal injection/procedure, indwelling catheter.\n- Fracture/cancer risk: trauma, osteoporosis, steroids, age, malignancy, weight loss, night pain.\n\nMost back pain is mechanical. The ED job is to rapidly find the few that are spine, vascular, infectious, renal, traumatic, or malignant emergencies.\n\n**Basis:** each of the five do-not-miss lanes above is sourced separately in this hub - AAA/dissection from the 2022 ACC/AHA aortic disease guideline, spinal epidural abscess from IDSA 2015 plus the 2026 NEJM review, cauda equina from Lavy (BMJ 2009) and Todd (2017), malignant cord compression from Cole and Patchell (Lancet Neurol 2008), and imaging thresholds from ACR Appropriateness Criteria. Open the references list on any card to retrieve and review the source directly.',
        citation: [1, 3, 4, 6, 7, 8, 9, 11, 12],
        next: 'bp-exclusions',
        summary: 'Vitals, neuro/bowel/bladder, vascular/abdominal, infection, trauma, cancer risk first.',
        safetyLevel: 'critical',
    },
    {
        id: 'bp-exclusions',
        type: 'question',
        module: 2,
        title: 'Time-Critical Exclusions - Pick the Best Fit',
        body: 'Choose the first dangerous lane. Do not start with "sciatica" until these are screened.',
        options: [
            { label: 'Urinary retention/incontinence, saddle symptoms, bilateral sciatica, progressive leg weakness', description: 'Cauda equina / conus medullaris', next: 'bp-cauda', urgency: 'critical' },
            { label: 'Fever, IVDU, diabetes, immunosuppression, recent bacteremia/procedure, focal spine tenderness', description: 'SEA / vertebral osteomyelitis / discitis', next: 'bp-spine-infection', urgency: 'critical' },
            { label: 'Older vascular risk, abrupt severe back/abdominal pain, syncope, hypotension, pulse deficit', description: 'AAA rupture/leak or aortic dissection', next: 'bp-aaa-dissection', urgency: 'critical' },
            { label: 'Trauma, osteoporosis, chronic steroids, cancer, weight loss, night pain', description: 'Fracture / malignancy / metastatic cord compression', next: 'bp-fracture-cancer', urgency: 'urgent' },
            { label: 'Flank pain, fever, urinary symptoms, stone-like colic, solitary kidney, pregnancy', description: 'Renal/urinary or intra-abdominal mimic', next: 'bp-renal', urgency: 'urgent' },
            { label: 'Unilateral radicular pain, positive straight-leg, no red flags, normal strength/bladder', description: 'Radiculopathy / mechanical pattern', next: 'bp-radiculopathy' },
            { label: 'No immediate exclusion hit', description: 'Initial back pain bundle and reassess', next: 'bp-rescue' },
        ],
        citation: [1, 4, 5, 6, 7, 8, 9, 11, 13, 14],
        summary: 'Cauda, spine infection, AAA/dissection, fracture/cancer, renal mimics, and radiculopathy are the main lanes.',
        safetyLevel: 'critical',
    },
    {
        id: 'bp-cauda',
        type: 'result',
        module: 2,
        title: 'Cauda Equina / Conus Medullaris',
        body: 'Open [Cauda Equina Syndrome](#/tree/cauda-equina).\n\n**Next 5 minutes:** bladder scan/PVR, focused sacral exam when feasible, leg motor/reflex/sensation exam, urgent MRI lumbar spine, early spine/neurosurgery call if symptoms fit.\n\n**Red flags:** urinary retention or new overflow incontinence, saddle anesthesia, bilateral sciatica, progressive bilateral leg weakness, fecal incontinence, severe neurologic deficit.\n\n**Pitfall:** pain may be improving while bladder/neurologic injury is worsening. Do not reassure based on pain response.',
        recommendation: 'Suspected cauda equina needs emergency MRI and spine pathway.',
        citation: [1, 4, 5],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'bp-spine-infection',
        type: 'result',
        module: 2,
        title: 'Spinal Epidural Abscess / Vertebral Osteomyelitis',
        body: 'Open [Low Back Pain Decision Support](#/tree/low-back-pain) while using spine infection posture.\n\n**Next 5 minutes:** neuro exam, ESR/CRP, blood cultures when febrile/high suspicion, MRI spine with and without contrast; consider whole-spine MRI when symptoms do not localize or risk is high. Antibiotics after cultures when stable; do not delay antibiotics for sepsis or neurologic deficit.\n\n**Pitfall:** the classic triad is insensitive. No fever does not clear SEA.',
        recommendation: 'MRI is the key diagnostic test when spine infection is plausible.',
        citation: [1, 6, 7, 12],
        safetyLevel: 'critical',
        confidence: 'recommended',
    },
    {
        id: 'bp-aaa-dissection',
        type: 'result',
        module: 2,
        title: 'AAA / Aortic Dissection Back-Pain Variant',
        body: 'Open [Aortic Aneurysm ED Management](#/tree/aortic-aneurysm) or [Aortic Dissection](#/tree/aortic-dissection).\n\n**Next 5 minutes:** two large-bore IVs, type/screen or MTP posture if unstable, bedside aorta ultrasound if rapid and available, CTA chest/abdomen/pelvis when stable, vascular/cardiothoracic surgery early. For dissection, impulse control before vasodilator when perfusing.\n\n**Pitfall:** do not anchor on musculoskeletal pain in an older vascular-risk patient with syncope, hypotension, abdominal pain, pulse deficit, or abrupt maximal pain.',
        recommendation: 'Vascular back pain is a resuscitation diagnosis. Image and consult early.',
        citation: [8],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'bp-fracture-cancer',
        type: 'result',
        module: 2,
        title: 'Fracture / Malignancy / Metastatic Cord Compression',
        body: 'Open [Low Back Pain Decision Support](#/tree/low-back-pain).\n\n**Next 5 minutes:** neuro exam, pain control, CT or radiographs for trauma/fracture by risk, MRI when cancer with neurologic symptoms, severe progressive pain, suspected cord/cauda compression, or epidural disease. Consider steroids after specialist discussion when metastatic cord compression is suspected.\n\n**Pitfall:** new severe back pain in a cancer patient is malignant spinal disease until reasonably excluded.',
        recommendation: 'Cancer, fracture risk, or neuro findings should trigger imaging beyond routine mechanical back pain care.',
        citation: [1, 9, 11],
        safetyLevel: 'critical',
        confidence: 'recommended',
    },
    {
        id: 'bp-renal',
        type: 'result',
        module: 2,
        title: 'Renal / Urinary / Intra-Abdominal Mimic',
        body: 'Open [Adult UTI](#/tree/adult-uti) or [Urinary Retention](#/tree/urinary-retention) when those fit.\n\n**Next 5 minutes:** UA, pregnancy test when applicable, renal function, bedside bladder scan if retention, CT/ultrasound strategy for stone/obstruction/pyelo complication by risk. Reconsider abdominal pathology when pain is not reproducible/mechanical or vitals are abnormal.\n\n**Pitfall:** flank/back pain plus fever, solitary kidney, AKI, pregnancy, uncontrolled pain/vomiting, or sepsis physiology is not simple outpatient back pain.',
        recommendation: 'Treat renal/urinary mimics by obstruction, infection severity, pregnancy, and renal risk.',
        citation: [13, 14],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'bp-radiculopathy',
        type: 'result',
        module: 2,
        title: 'Radiculopathy / Mechanical Pattern',
        body: 'Open [Low Back Pain Decision Support](#/tree/low-back-pain).\n\nOpen [L4/L5/S1 Radiculopathy Localization](#/info/bp-radic-localization) for the bedside dermatome/myotome/reflex map.\n\n**Next 5 minutes:** confirm no red flags, document motor/reflex/sensation, treat pain to enable mobility, avoid routine advanced imaging for uncomplicated acute low back pain/radiculopathy, encourage activity as tolerated.\n\n**Pitfall:** radicular pain does not equal cauda equina. Cauda requires bowel/bladder/saddle/progressive bilateral weakness screening every time.',
        recommendation: 'Mechanical/radicular pain can be outpatient only after red flags and function are reassessed.',
        citation: [1, 2, 4, 5, 10, 11],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'bp-rescue',
        type: 'info',
        module: 3,
        title: 'Rescue / Initial Bundle + Reassess',
        body: '**Default bundle when no killer has declared itself:**\n- Analgesia: acetaminophen, NSAID if safe, topical/local measures, muscle relaxer selectively; avoid routine opioids when alternatives work.\n- Neuro exam before and after analgesia: gait, strength, reflexes, sensation.\n- Bladder scan/PVR when urinary symptoms, severe bilateral symptoms, or cauda concern.\n- ESR/CRP when infection risk exists; normal labs do not overrule high clinical suspicion.\n- Encourage movement as tolerated; avoid prolonged bedrest instructions for uncomplicated mechanical pain.\n\n**Reassess in 30-60 minutes:** ability to stand/walk, neuro exam, bladder symptoms, pain control, vitals.',
        citation: [1, 2, 6, 7, 10, 11],
        next: 'bp-reassess',
        summary: 'Analgesia, repeat neuro/gait, PVR when indicated, ESR/CRP by infection risk, then reassess.',
        safetyLevel: 'warning',
    },
    {
        id: 'bp-reassess',
        type: 'question',
        module: 3,
        title: 'Reassess After Initial Bundle',
        body: 'Disposition depends on function and the repeat neurologic exam.',
        options: [
            { label: 'Worse, cannot walk, new neuro/bladder/fever/vascular feature', description: 'Return to time-critical exclusions', next: 'bp-exclusions', urgency: 'critical' },
            { label: 'Persistent severe pain or red-flag uncertainty', description: 'Use imaging strategy', next: 'bp-imaging' },
            { label: 'Improved, ambulatory, no red flags, stable exam', description: 'Disposition checklist', next: 'bp-disposition' },
        ],
        citation: [1, 2, 4, 11],
        summary: 'New neuro/bladder/fever/vascular features reset the workup.',
    },
    {
        id: 'bp-imaging',
        type: 'info',
        module: 4,
        title: 'Imaging Decision',
        body: '**Image by suspected emergency:**\n- **MRI lumbar spine:** cauda/conus, progressive neurologic deficit, suspected epidural abscess/vertebral osteomyelitis, malignancy with neuro signs, cord/cauda compression.\n- **MRI with contrast / whole spine:** infection, malignancy, nonlocalizing spinal infection symptoms.\n- **CTA chest/abdomen/pelvis:** aortic dissection or unstable vascular back-pain phenotype when stable enough.\n- **Bedside aorta ultrasound:** rapid screen for AAA in older vascular-risk patients; do not let a limited scan delay CTA/surgery when unstable.\n- **CT/radiographs:** trauma or compression fracture risk.\n- **No routine imaging:** uncomplicated acute low back pain or radiculopathy without red flags.\n\nImage because the result changes management, not because the pain is severe.',
        citation: [1, 4, 5, 6, 8, 9, 12, 13, 14],
        next: 'bp-disposition',
        summary: 'MRI for cauda/infection/cancer/neuro, CTA/US for aorta, CT/XR for fracture, no imaging for uncomplicated mechanical pain.',
        safetyLevel: 'warning',
    },
    {
        id: 'bp-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition',
        body: 'Disposition follows neurologic safety, infection/vascular risk, mobility, and pain control.',
        options: [
            { label: 'Cauda/SEA/aorta/fracture/cancer/neuro deficit/unstable vitals', description: 'Admit/transfer/specialty pathway', next: 'bp-dispo-admit', urgency: 'critical' },
            { label: 'Persistent severe pain, equivocal red flags, pending MRI/CTA/labs', description: 'Observe/admit', next: 'bp-dispo-observe' },
            { label: 'Mechanical pattern, ambulatory, no red flags, safe follow-up', description: 'Discharge checklist', next: 'bp-dispo-discharge' },
        ],
        citation: [1, 4, 6, 8, 11],
        summary: 'Danger signs admit; uncertainty observes; uncomplicated mechanical pain discharges after function and red flags are checked.',
    },
    {
        id: 'bp-dispo-admit',
        type: 'result',
        module: 5,
        title: 'Admit / Transfer / Specialty Pathway',
        body: 'Admit/transfer for cauda/conus symptoms, progressive neurologic deficit, suspected or confirmed SEA/NVO, sepsis, AAA/dissection, unstable vitals, fracture needing intervention, malignancy/cord compression concern, inability to ambulate safely, urinary retention with neurologic concern, or pain requiring inpatient control.',
        recommendation: 'Admit or transfer when the diagnosis threatens neurologic function, vascular survival, infection control, or safe mobility.',
        citation: [1, 4, 5, 6, 7, 8, 9, 12],
        safetyLevel: 'critical',
        confidence: 'definitive',
    },
    {
        id: 'bp-dispo-observe',
        type: 'result',
        module: 5,
        title: 'Observation / Serial Exam',
        body: 'Observe when MRI/CTA/labs are pending, pain prevents a reliable exam or ambulation test, symptoms are evolving, infection risk is moderate with unclear labs, or social support/transport is unsafe after treatment.',
        recommendation: 'Observation is for serial neuro/gait/vitals and completion of targeted testing.',
        citation: [1, 2, 4, 7, 11],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
    {
        id: 'bp-dispo-discharge',
        type: 'result',
        module: 5,
        title: 'Discharge Checklist',
        body: 'Discharge only when: no red flags, normal or baseline neuro exam, no bowel/bladder/saddle symptoms, ambulatory or baseline mobility restored, pain controlled enough for function, no infection/vascular/trauma/cancer concern, and follow-up is realistic.\n\n**Return precautions:** urinary retention/incontinence, saddle numbness, leg weakness, inability to walk, fever, worsening severe pain, abdominal pain/syncope, new numbness, cancer red flags, or uncontrolled vomiting/pain.',
        recommendation: 'Document red-flag screen, repeat neuro/gait exam, and explicit cauda/infection/vascular return precautions.',
        citation: [1, 2, 4, 5, 11],
        safetyLevel: 'warning',
        confidence: 'recommended',
    },
];
export const BACK_PAIN_HUB_NODE_COUNT = BACK_PAIN_HUB_NODES.length;
export const BACK_PAIN_HUB_MODULE_LABELS = [
    'Sick Check',
    'Time-Critical Exclusions',
    'Rescue / Reassess',
    'Imaging',
    'Disposition',
];
export const BACK_PAIN_HUB_CITATIONS = [
    { num: 1, text: 'Expert Panel on Neurological Imaging; Hutchins TA, Peckham M, Shah LM, Parsons MS, et al. ACR Appropriateness Criteria Low Back Pain: 2021 Update. J Am Coll Radiol. 2021;18(11S):S361-S379. doi:10.1016/j.jacr.2021.08.002. PMID: 34794594' },
    { num: 2, text: 'Qaseem A, Wilt TJ, McLean RM, Forciea MA; Clinical Guidelines Committee of the American College of Physicians. Noninvasive treatments for acute, subacute, and chronic low back pain: a clinical practice guideline from the American College of Physicians. Ann Intern Med. 2017;166(7):514-530. doi:10.7326/M16-2367. PMID: 28192789' },
    { num: 3, text: 'SUPERSEDED - replaced by reference 11 (AAFP 2025 review). Casazza BA. Diagnosis and treatment of acute low back pain. Am Fam Physician. 2012;85(4):343-350. PMID: 22335313' },
    { num: 4, text: 'Lavy C, James A, Wilson-MacDonald J, Fairbank J. Cauda equina syndrome. BMJ. 2009;338:b936. doi:10.1136/bmj.b936. PMID: 19336488' },
    { num: 5, text: 'Todd NV. Guidelines for cauda equina syndrome. Red flags and white flags. Systematic review and implications for triage. Br J Neurosurg. 2017;31(3):336-339. doi:10.1080/02688697.2017.1297364. PMID: 28637110' },
    { num: 6, text: 'Berbari EF, Kanj SS, Kowalski TJ, et al. 2015 Infectious Diseases Society of America (IDSA) clinical practice guidelines for the diagnosis and treatment of native vertebral osteomyelitis in adults. Clin Infect Dis. 2015;61(6):e26-e46. doi:10.1093/cid/civ482. PMID: 26229122' },
    { num: 7, text: 'Davis DP, Wold RM, Patel RJ, et al. The clinical presentation and impact of diagnostic delays on emergency department patients with spinal epidural abscess. J Emerg Med. 2004;26(3):285-291. doi:10.1016/j.jemermed.2003.11.013. PMID: 15028325' },
    { num: 8, text: 'Isselbacher EM, Preventza O, Hamilton Black J, et al. 2022 ACC/AHA Guideline for the Diagnosis and Management of Aortic Disease. Circulation. 2022;146(24):e334-e482. doi:10.1161/CIR.0000000000001106' },
    { num: 9, text: 'Cole JS, Patchell RA. Metastatic epidural spinal cord compression. Lancet Neurol. 2008;7(5):459-466. doi:10.1016/S1474-4422(08)70089-9. PMID: 18420159' },
    { num: 10, text: 'Chou R, Deyo R, Friedly J, et al. Systemic pharmacologic therapies for low back pain: a systematic review for an American College of Physicians clinical practice guideline. Ann Intern Med. 2017;166(7):480-492. doi:10.7326/M16-2458. PMID: 28192790' },
    { num: 11, text: 'Earwood JS, Doles NA, Russell RS. Acute low back pain: diagnosis and management. Am Fam Physician. 2025;112(5):526-536C. https://www.aafp.org/pubs/afp/issues/2025/1100/acute-low-back-pain.html' },
    { num: 12, text: 'Tande AJ, Currier BL, Osmon DR. Spinal epidural abscess. N Engl J Med. 2026;394(16):1621-1633. doi:10.1056/NEJMra2412728' },
    { num: 13, text: 'Expert Panel on Urological Imaging; Gupta RT, Kalisz K, Khatri G, et al. ACR Appropriateness Criteria Acute Onset Flank Pain-Suspicion of Stone Disease (Urolithiasis). J Am Coll Radiol. 2023;20(11S):S315-S328. doi:10.1016/j.jacr.2023.08.020' },
    { num: 14, text: 'Expert Panel on Urological Imaging; Smith AD, Nikolaidis P, Khatri G, et al. ACR Appropriateness Criteria Acute Pyelonephritis: 2022 Update. J Am Coll Radiol. 2022;19(11S):S224-S239. doi:10.1016/j.jacr.2022.09.017' },
];
