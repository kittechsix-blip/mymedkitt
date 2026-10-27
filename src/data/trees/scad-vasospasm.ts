// MedKitt - SCAD and Coronary Vasospasm (Prinzmetal)
// DRAFT: not wired, not deployed. Clinical sign-off required (Andy).
// Node ids use the consult prefix 'scad-vasospasm-' (entry: 'scad-vasospasm-start').
// Source re-check 2026-10-27: see research/new-content/scad-vasospasm/signoff.md (conflicts C1-C10, open questions).
// The SCAD beta-blocker directive is UNSETTLED (see scad-vasospasm-scad-beta). No numeric dose
// is given for vasospasm drugs. The citation list here is copied into scad-vasospasm-info.ts; keep them in sync.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';

interface Citation {
  num: number;
  text: string;
}

export const SCADV_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'ST elevation, ongoing pain, shock, or arrhythmia: go to the STEMI pathway now. Do not hold reperfusion decisions for the SCAD vs spasm question.', nodeId: 'scad-vasospasm-stemi-exit' },
  { text: 'Fibrinolysis is contraindicated in suspected SCAD (ESC-ACCA 2018). Anticoagulation is limited to the indications in the antithrombotic node. The antiplatelet plan is in conflict (sign-off pending).', nodeId: 'scad-vasospasm-scad-antithrombotic' },
  { text: 'Stable SCAD with no ongoing ischemia, no hemodynamic instability, and no high-risk anatomy: conservative care is generally preferred (AHA 2018). Revascularize for ongoing ischemia, instability, or high-risk anatomy.', nodeId: 'scad-vasospasm-scad-stratify' },
  { text: 'Before any stent in SCAD, confirm the lesion with intracoronary imaging (expert opinion; wire-position rule pending sign-off).', nodeId: 'scad-vasospasm-scad-pci' },
  { text: 'Conservatively managed SCAD: 3 to 5 days of in-hospital monitoring is justified (AHA 2018). Do not discharge from the ED without cardiology review (final duration and criteria pending sign-off).', nodeId: 'scad-vasospasm-admit-scad' },
];

export const SCADV_NODES: DecisionNode[] = [

  // MODULE 1: RECOGNITION
  {
    id: 'scad-vasospasm-start',
    type: 'question',
    module: 1,
    title: 'SCAD vs Vasospasm - Start Here',
    body: '[SCAD and Vasospasm Steps Summary](#/info/scad-vasospasm-steps)\n\n**Two different diseases can look the same.** SCAD is a tear in the coronary wall. Vasospasm is a reversible spasm of an epicardial artery. Both can cause ACS-type pain, ECG change, and troponin rise, but they need different tests and different drugs. [1,2]\n\n**First, the emergency:** ST elevation, ongoing pain, shock, or arrhythmia go to the STEMI pathway.\n\n**Aortic dissection is a separate branch.** Use the [Chest pain hub](#/tree/chest-pain-hub) for the aortic pathway.\n\n**Pick the closest pattern:**',
    citation: [1, 2],
    options: [
      { label: 'ST elevation now, ongoing pain, or instability', description: 'Reperfusion decision comes first', next: 'scad-vasospasm-stemi-exit', urgency: 'critical' },
      { label: 'Possible ACS: ECG change, troponin rise, or chest pain at rest', description: 'Stabilise, then sort the mechanism', next: 'scad-vasospasm-stabilise', urgency: 'urgent' },
      { label: 'Troponin-positive MI without obstructive CAD on angiography', description: 'MINOCA sorting', next: 'scad-vasospasm-minoca', urgency: 'urgent' },
      { label: 'Mimic suspected: takotsubo, myocarditis, pericarditis, PE', description: 'Check the mimic before the mechanism workup', next: 'scad-vasospasm-mimics', urgency: 'routine' },
    ],
    summary: 'Sort STEMI first, then SCAD vs spasm vs MINOCA vs mimic. Different tests, different drugs.',
    safetyLevel: 'critical',
  },
  {
    id: 'scad-vasospasm-stemi-exit',
    type: 'result',
    module: 1,
    title: 'ST Elevation or Instability: STEMI Pathway',
    body: '**ST elevation, ongoing ischemia, shock, or arrhythmia: STEMI logic applies first.**\n\n• Activate the reperfusion decision per the STEMI pathway.\n• Do not wait for the SCAD vs spasm answer before reperfusion decisions.\n• Angiography identifies the culprit: SCAD, spasm, or plaque rupture. [1,2]',
    recommendation: 'Route to the STEMI pathway now: [STEMI pathway](#/tree/stemi). Return to this consult only if angiography shows no obstructive lesion or a dissection-type lesion.',
    citation: [1, 2],
    confidence: 'definitive',
    summary: 'Ongoing ST elevation or instability goes to the STEMI pathway now.',
    safetyLevel: 'critical',
  },
  {
    id: 'scad-vasospasm-minoca',
    type: 'question',
    module: 1,
    title: 'MINOCA: Sort the Cause',
    body: '**MINOCA: troponin-positive MI without obstructive CAD on angiography.** [5]\n\n**Pooled review (Pasupathy 2015):** in the reviewed MINOCA patients, coronary spasm was inducible in **27%** and thrombophilia disorders were detected in **14%**. Both are identified causes; the review abstract does not rank them. [5]\n\n**Full etiology list:** [MINOCA etiologies page](#/info/nstemi-minoca) (existing page; its beta-blocker line is under review, see sign-off notes).\n\n**Which mechanism points where?**',
    citation: [5, 6],
    options: [
      { label: 'Pattern points to spasm', description: 'Nitrate-responsive episodes or transient ST change', next: 'scad-vasospasm-spasm-recognition', urgency: 'urgent' },
      { label: 'SCAD suspected', description: 'Young or peripartum woman, FMD, or dissection', next: 'scad-vasospasm-scad-recognition', urgency: 'urgent' },
      { label: 'Other cause: takotsubo, myocarditis, embolism, plaque disruption', description: 'Mimic and alternative-cause review', next: 'scad-vasospasm-mimics', urgency: 'routine' },
    ],
    summary: 'MINOCA is an ECG-and-angiogram sort: spasm, SCAD, or another cause.',
  },
  {
    id: 'scad-vasospasm-mimics',
    type: 'info',
    module: 1,
    title: 'Mimics and Alternative Causes',
    body: '**Check the mimic before the mechanism workup.**\n\n• **Takotsubo:** an international expert consensus proposes diagnostic criteria. Serious complications, including death, are reported. [7] (Consensus not re-opened in the 2026-10-27 pass.)\n• **Takotsubo management:** not sourced in this consult. Discuss with cardiology before catecholamines or inotropes (unsourced expert opinion; Andy to rule).\n• **Myocarditis and pericarditis:** a different treatment plan. Cardiology and imaging decide the next step (not sourced in this consult).\n• **Aortic dissection:** separate branch, see [Chest pain hub](#/tree/chest-pain-hub).\n• **Wellens pattern:** a different ACS ECG problem, see [Wellens syndrome](#/tree/wellens-syndrome).\n\n**Takotsubo, myocarditis, and embolism change the drug plan.** Do not assume SCAD or spasm treatment applies.',
    citation: [7],
    next: 'scad-vasospasm-disposition',
    summary: 'Takotsubo, myocarditis, and aortic dissection change the plan. Do not assume SCAD or spasm treatment.',
  },

  // MODULE 2: STABILISE AND DIAGNOSE
  {
    id: 'scad-vasospasm-stabilise',
    type: 'info',
    module: 2,
    title: 'Stabilise: Treat as ACS Until Proven Otherwise',
    body: '**Treat as ACS until the mechanism is known.**\n\n• Serial ECGs and troponin. Continuous monitoring for arrhythmia.\n• Relieve pain. Nitrate response is part of the spasm diagnosis: [Nitroglycerin](#/drug/nitroglycerin/acs) for acute pain per protocol. Check for PDE-5 inhibitor use first (see [vasospasm treatment](#/node/scad-vasospasm-spasm-treat)).\n• **Antiplatelet and anticoagulant decisions before angiography are in conflict between sources (sign-off pending).** See [SCAD antithrombotic plan](#/node/scad-vasospasm-scad-antithrombotic).\n• **Ask about cocaine, methamphetamine, and other stimulant use.** Substance history changes the vasospasm pathway.\n• Ask about recent pregnancy or postpartum status, fibromuscular dysplasia (FMD) history, and genetic or connective-tissue disorders.\n\n**Then sort the pattern:** [Route by mechanism](#/node/scad-vasospasm-route)',
    citation: [1, 2, 6],
    next: 'scad-vasospasm-route',
    summary: 'Treat as ACS, relieve pain, ask about stimulants and pregnancy, then route by mechanism.',
  },
  {
    id: 'scad-vasospasm-route',
    type: 'question',
    module: 2,
    title: 'Route by Mechanism',
    body: '**Which mechanism fits the story?**\n\n• **Spasm:** nitrate-responsive pain, often at rest, with transient ST change on ECG. [1,3]\n• **SCAD:** young or peripartum woman, FMD, or few atherosclerotic risk factors. [1,2]\n• **Atherosclerotic:** obstructive plaque on angiography.\n• **Unclear:** MINOCA sorting.\n\nWellens pattern is a different ACS problem: [Wellens syndrome](#/tree/wellens-syndrome).',
    citation: [1, 3, 5, 6],
    options: [
      { label: 'Nitrate-responsive episodes with transient ST change', description: 'Vasospasm criteria', next: 'scad-vasospasm-spasm-recognition', urgency: 'urgent' },
      { label: 'Young or peripartum woman, FMD, or dissection suspected', description: 'SCAD branch', next: 'scad-vasospasm-scad-recognition', urgency: 'urgent' },
      { label: 'Obstructive atherosclerotic CAD on angiography', description: 'Atherosclerotic pathway', next: 'scad-vasospasm-atherosclerotic-exit', urgency: 'routine' },
      { label: 'Mechanism unclear', description: 'MINOCA sorting', next: 'scad-vasospasm-minoca', urgency: 'routine' },
    ],
  },
  {
    id: 'scad-vasospasm-spasm-recognition',
    type: 'question',
    module: 2,
    title: 'Vasospasm: Diagnostic Criteria',
    body: '**Definitive vasospastic angina needs both:**\n\n• Nitrate-responsive angina during a spontaneous episode, AND\n• Either transient ischemic ECG change during the episode, or documented spasm. [3,6]\n\n**Spasm** = transient total or subtotal coronary constriction (>90%) with angina and ischemic ECG change, spontaneous or provoked. [3,6]\n\n**Is the episode captured?**',
    citation: [3, 6],
    options: [
      { label: 'Both criteria met on the record', description: 'Nitrate response plus captured ST change or documented spasm', next: 'scad-vasospasm-spasm-treat', urgency: 'routine' },
      { label: 'Nitrate-responsive episodes, no captured ECG or spasm', description: 'Provocation testing in the cath lab', next: 'scad-vasospasm-spasm-provocation', urgency: 'urgent' },
      { label: 'Does not fit: no nitrate response, or features of plaque or SCAD', description: 'Reconsider the mechanism', next: 'scad-vasospasm-mimics', urgency: 'routine' },
    ],
    summary: 'Vasospasm needs nitrate response plus captured ST change or documented spasm.',
  },
  {
    id: 'scad-vasospasm-spasm-provocation',
    type: 'question',
    module: 2,
    title: 'Cath-Lab Provocation Testing',
    body: '**Cath-lab provocation with intracoronary acetylcholine or ergonovine** is used to document spasm. The 2023 AHA/ACC table names acetylcholine, ergot, or hyperventilation as provocative stimuli. [3,8,12]\n\n• Spasm criterion: reduction in coronary diameter >90% after intracoronary acetylcholine compared with baseline after intracoronary nitroglycerin, with symptoms and ST deviation. [3]\n• Protocols differ in dose, timing, and procedure, so use your cath lab protocol. No doses are listed in this draft.\n• Ergonovine here is a test agent. It is not the postpartum drug methylergonovine. Do not substitute one for the other.\n• A positive test documents spasm.\n• A negative or inconclusive test means reconsidering mimics and other causes.\n\n**Result of testing:**',
    citation: [3, 8, 12],
    options: [
      { label: 'Provocation reproduces spasm', description: 'Documented spasm: treat as vasospasm', next: 'scad-vasospasm-spasm-treat', urgency: 'urgent' },
      { label: 'Negative or inconclusive', description: 'Reconsider mimics and other causes', next: 'scad-vasospasm-mimics', urgency: 'routine' },
      { label: 'Testing not available or not done', description: 'Unconfirmed: empiric treatment per local protocol, reassess if not responding (Andy to rule)', next: 'scad-vasospasm-spasm-treat', urgency: 'routine' },
    ],
  },
  {
    id: 'scad-vasospasm-scad-recognition',
    type: 'question',
    module: 2,
    title: 'SCAD: Recognition and Angiography',
    body: '**SCAD is a notable cause of ACS and sudden death.** It mainly affects younger women with few conventional atherosclerotic risk factors, and needs different evaluation and treatment from atherosclerotic MI. [1]\n\n• Coronary and peripheral FMD evaluation is part of the SCAD workup. [1]\n• Most pregnancy-associated SCAD occurs in the first 4 weeks after delivery. [1]\n• Peripartum presentations: [Peripartum cardiomyopathy](#/tree/peripartum-cardiomyopathy) is a different diagnosis to exclude.\n\n**What does angiography show?**',
    citation: [1, 2],
    options: [
      { label: 'Dissection on coronary angiography', description: 'SCAD: revascularization vs conservative care', next: 'scad-vasospasm-scad-stratify', urgency: 'urgent' },
      { label: 'Obstructive atherosclerotic CAD', description: 'Atherosclerotic pathway', next: 'scad-vasospasm-atherosclerotic-exit', urgency: 'routine' },
      { label: 'No obstructive CAD and no dissection', description: 'Mimic and alternative-cause review', next: 'scad-vasospasm-mimics', urgency: 'routine' },
    ],
  },
  {
    id: 'scad-vasospasm-atherosclerotic-exit',
    type: 'result',
    module: 2,
    title: 'Atherosclerotic Disease: Not a SCAD or Spasm Workup',
    body: '**Obstructive atherosclerotic disease goes to the ACS pathway.**\n\n• NSTE-ACS: [NSTEMI pathway](#/tree/nstemi).\n• Persistent ST elevation: [STEMI pathway](#/tree/stemi).\n• Do not apply the SCAD antithrombotic plan to plaque disease by default. This consult is for dissection and spasm only.',
    recommendation: 'Manage as atherosclerotic ACS on the NSTE-ACS or STEMI pathway. This consult covers dissection and spasm only.',
    citation: [1],
    confidence: 'definitive',
    summary: 'Obstructive plaque goes to the NSTE-ACS or STEMI pathway.',
  },

  // MODULE 3: TARGETED TREATMENT
  {
    id: 'scad-vasospasm-scad-stratify',
    type: 'question',
    module: 3,
    title: 'SCAD: Revascularize or Conserve?',
    body: '**Conservative management is generally preferred when the patient is clinically stable, with no objective evidence of ongoing ischemia, no hemodynamic instability, and no particularly high-risk anatomy.** A conservative strategy is also appropriate when distal vessels are occluded and not amenable to PCI. [1]\n\n**Revascularization is required for ongoing ischemia, left main or proximal high-risk dissection, hemodynamic instability, or ischemia refractory to medical therapy.** [1]',
    citation: [1],
    options: [
      { label: 'Ongoing ischemia, infarction, hemodynamic instability, or high-risk anatomy', description: 'Revascularization pathway', next: 'scad-vasospasm-scad-pci', urgency: 'critical' },
      { label: 'Stable, no ongoing ischemia, no high-risk anatomy', description: 'Conservative pathway', next: 'scad-vasospasm-scad-conservative', urgency: 'routine' },
    ],
    summary: 'PCI for ongoing ischemia, instability, or high-risk anatomy. Otherwise conservative care is generally preferred.',
  },
  {
    id: 'scad-vasospasm-scad-pci',
    type: 'info',
    module: 3,
    title: 'SCAD: PCI When Ischemia Demands It',
    body: '**PCI for SCAD is for ongoing ischemia, infarction, or high-risk anatomy.** [1]\n\n• Intracoronary imaging confirms an intramural hematoma or multiple lumens. [1]\n• Wire-position confirmation before stenting is expert opinion, pending sign-off.\n• No comparative data show one PCI technique is superior. Long stents covering both edges of the hematoma are one described approach. [1]\n• CABG is considered for left main or proximal dissection, technical failure of PCI, a complication of PCI, or refractory ischemia. [1]\n\n**Antithrombotic plan after PCI:** standard guideline-based antiplatelet therapy after PCI (AHA 2018). See [SCAD antithrombotic plan](#/node/scad-vasospasm-scad-antithrombotic).',
    citation: [1],
    next: 'scad-vasospasm-scad-antithrombotic',
    summary: 'Stent only for ongoing ischemia or high-risk anatomy, after intracoronary imaging.',
    safetyLevel: 'warning',
  },
  {
    id: 'scad-vasospasm-scad-conservative',
    type: 'info',
    module: 3,
    title: 'SCAD: Conservative Care',
    body: '**Conservative care is the usual default when the patient is stable with no ongoing ischemia.** [1]\n\n**Healing:** observational data show angiographic healing in 70% to 97% of patients who were selectively restudied weeks to months after conservative management. No prospective study routinely restudies all patients. [1]\n\n**Monitoring:** the AHA 2018 statement justifies 3 to 5 days of in-hospital monitoring within a conservative strategy, because of an early 5% to 10% hazard of dissection extension or new SCAD. The final duration in this app is pending Andy\'s sign-off. [1]',
    citation: [1],
    next: 'scad-vasospasm-scad-antithrombotic',
    summary: 'Most SCAD heals with conservative care. 3 to 5 days of monitored admission; final duration pending.',
  },
  {
    id: 'scad-vasospasm-scad-antithrombotic',
    type: 'info',
    module: 3,
    title: 'SCAD: Why Antithrombotics Differ',
    body: '**The SCAD antithrombotic plan is not the default STEMI or NSTE-ACS plan.** Sources conflict on several points (see the sign-off file).\n\n**Fibrinolysis: contraindicated.** ESC-ACCA 2018 states thrombolysis is contraindicated for the acute management of SCAD. [2] The AHA 2018 statement does not address fibrinolysis. [1]\n• Do not give [alteplase](#/drug/alteplase/stemi) or other fibrinolytics for suspected SCAD. The link opens the STEMI dosing for reference only; it does not apply here.\n\n**Anticoagulation: limit it.** [1]\n• Early heparin may reduce thrombus burden, but there are theoretical concerns about bleeding into the intramural hematoma and dissection extension.\n• If anticoagulation was started at presentation with no other indication, consider stopping it once SCAD is diagnosed.\n• Examples of a chronic indication (LV thrombus, thromboembolism) are not sourced in this draft (Andy to rule).\n• Conflict: the ESC e-journal summary lists heparin, DAPT, and beta-blockers in initial treatment. [11] See conflict C1.\n\n**IV glycoprotein IIb/IIIa inhibitors: cautious approach.** No data guide their use in emergency SCAD management; theoretical concerns about dissection extension and bleeding. [1]\n\n**Antiplatelet: CONFLICT, Andy to rule.**\n• Position A (ESC e-journal summary [11]): DAPT with [aspirin](#/drug/aspirin/acs) plus [clopidogrel](#/drug/clopidogrel/acs) is generally accepted; there are no data on ticagrelor or prasugrel. Duration is not settled.\n• Position B (AHA 2018 [1]): clear evidence for DAPT in conservatively managed SCAD is lacking. Many practitioners avoid it because of bleeding risk. Some experts recommend DAPT for at least 1 year; others use 1 to 3 months, then aspirin. Most experts recommend aspirin for at least 1 year, often indefinitely. Choose individually.\n• Position C (existing app SCAD row in info-pages.ts; not re-verified here): DAPT controversial, most SCAD heals, avoid anticoagulation.\n• After PCI: standard guideline-based antiplatelet therapy (AHA 2018 [1]).\n\n**Beta-blocker:** see [beta-blocker evidence](#/node/scad-vasospasm-scad-beta) before deciding.',
    citation: [1, 2, 11],
    next: 'scad-vasospasm-scad-beta',
    summary: 'No fibrinolytics. Limit anticoagulation. Antiplatelet position conflicts across sources; Andy to rule.',
    safetyLevel: 'critical',
  },
  {
    id: 'scad-vasospasm-scad-beta',
    type: 'info',
    module: 3,
    title: 'SCAD: Beta-Blocker Evidence (Ruling Pending)',
    body: '**DRAFT: the beta-blocker directive for SCAD is NOT settled. Clinical ruling pending (Andy).** Do not act on this node as a recommendation until it is signed off.\n\n**What the data show (observational):**\n• Vancouver series, 327 patients, median follow-up 3.1 years (AHA 2018 [1]; Saw 2017 [4]). Recurrent SCAD occurred in 10.4%.\n• Multivariable analysis: beta-blocker use HR 0.36 (p=0.004); hypertension HR 2.46 (p=0.011). [4]\n• Other registry figures are not quoted here until checked against their primary papers.\n\n**Expert positions (AHA 2018 [1]):** some experts use beta-blockers routinely after SCAD, extrapolating from MI and aortic dissection; others use them selectively out of concern for worsening vasospasm or symptomatic hypotension. The AHA statement lists LV dysfunction, arrhythmia, and hypertension as indications.\n\n**Conflict:** the ESC e-journal summary says beta-blockers are recommended in all patients. [11] The existing MINOCA page says beta-blockers worsen spasm; that is a separate question from SCAD recurrence.',
    citation: [4, 1, 11],
    next: 'scad-vasospasm-followup',
    summary: 'SCAD beta-blocker evidence is observational. Directive pending sign-off.',
  },
  {
    id: 'scad-vasospasm-spasm-treat',
    type: 'info',
    module: 3,
    title: 'Vasospasm: Treatment',
    body: '**Calcium channel blocker first. Long-acting nitrate added if symptoms persist. Sublingual nitroglycerin for acute pain.** [3,12]\n\n• **First-line: calcium channel blocker.** The 2023 AHA/ACC table lists a calcium channel blocker first, with verapamil as the named example. [3] The JCS 2023 guideline also names calcium channel blockers as first-line (secondary summary only; primary recommendation text not retrieved). [12] Diltiazem and amlodipine are used in practice but are NOT named in the primary text checked here (Andy to rule which agents this consult names). No doses are given here. The app has no vasospasm dosing entry, so there is no drug-store link for a calcium channel blocker. Use the cath lab or pharmacy reference.\n• **Symptoms persist on calcium channel blocker: add a long-acting nitrate.** The 2023 table names isosorbide mononitrate as the example. The linked entry [isosorbide dinitrate](#/drug/isosorbide-dinitrate/angina) is for stable angina prophylaxis, not vasospasm. Naming conflict: see conflict C5. [3]\n• **Third line (2023 table):** change nitrate to nicorandil, which the table marks as unavailable in the United States. [3]\n• **Acute pain:** [nitroglycerin](#/drug/nitroglycerin/acs) per protocol. Sublingual nitroglycerin as needed is also in the baseline therapy of the 2023 table. [3]\n• **PDE-5 inhibitors: check before any nitrate.** Sildenafil or vardenafil: wait 24 hours after the last dose. Tadalafil: wait 48 hours. Nitrate exposure inside these windows can cause profound hypotension. Do not give nitrates until this is excluded. [9,10]\n• **Beta-blockers:** the 2023 table states calcium channel blockers, not beta-blockers, suppress episodes. [3] Caution with non-selective agents rests on expert opinion and a theoretical unopposed alpha effect; it is not proven. [1] Whether labetalol or carvedilol belong in this caution is not settled (Andy to rule).\n• **Stimulants:** ask about cocaine and methamphetamine use and counsel avoidance. Recreational drug use is a listed risk factor for CCD in young adults. [3]\n• **Diagnosis not confirmed (no testing):** empiric treatment per local protocol is an unsourced decision for Andy to rule. Reassess for plaque or mimics if the patient does not respond.\n\n**Next:** [follow-up](#/node/scad-vasospasm-followup)',
    citation: [3, 1, 9, 10, 12],
    next: 'scad-vasospasm-followup',
    summary: 'Calcium channel blocker first, nitrate for symptoms and add-on. Check PDE-5 use before nitrates. Caution with non-selective beta-blockers (expert opinion).',
  },

  // MODULE 4: DISPOSITION
  {
    id: 'scad-vasospasm-followup',
    type: 'info',
    module: 4,
    title: 'Recurrence, Follow-Up, and Pregnancy',
    body: '**SCAD recurrence (observational):**\n• Vancouver series (327 patients, median 3.1 years): recurrent SCAD in 10.4%. [4]\n• Hypertension was associated with higher recurrence (HR 2.46). Beta-blocker use was associated with lower recurrence (HR 0.36). [4]\n\n**Cardiac rehabilitation:** discussed in AHA 2018, with individualized exercise thresholds. Exertion limits are not sourced here. [1]\n\n**Statins:** no association with recurrence was found in the 327-patient cohort. [1]\n\n**Pregnancy and contraception:** [1]\n• Patients with SCAD are generally advised to avoid both pregnancy and exogenous hormones.\n• Preferred contraception in the AHA 2018 text: vasectomy for male partners, tubal ligation (after DAPT is stopped), or a levonorgestrel-releasing IUD.\n• Peripartum presentations: [Peripartum cardiomyopathy](#/tree/peripartum-cardiomyopathy) is a separate diagnosis to exclude.\n\n**Vasospasm follow-up intervals:** not sourced in this draft.',
    citation: [1, 4],
    next: 'scad-vasospasm-disposition',
    summary: 'Recurrence reported in cohorts (Vancouver: 10.4%). Rehab individualized; avoid pregnancy and exogenous hormones per AHA 2018.',
  },
  {
    id: 'scad-vasospasm-disposition',
    type: 'question',
    module: 4,
    title: 'Disposition: Match the Final Diagnosis',
    body: '**Choose the disposition that matches the final diagnosis.**\n\n• Conservatively managed SCAD, or SCAD after PCI: monitored admission.\n• Vasospasm controlled, no ongoing ischemia, reliable follow-up: discharge with a plan.\n• Ongoing ischemia, instability, arrhythmia, or unclear diagnosis: cardiology now, higher level of care.',
    citation: [1, 6],
    options: [
      { label: 'Conservatively managed SCAD, or SCAD after PCI', description: 'Monitored admission', next: 'scad-vasospasm-admit-scad', urgency: 'urgent' },
      { label: 'Vasospasm, symptoms controlled, no ongoing ischemia, reliable follow-up', description: 'Discharge with return plan', next: 'scad-vasospasm-discharge-spasm', urgency: 'routine' },
      { label: 'Ongoing ischemia, instability, arrhythmia, or unclear diagnosis', description: 'Cardiology now, higher level of care', next: 'scad-vasospasm-high-risk', urgency: 'critical' },
    ],
  },
  {
    id: 'scad-vasospasm-admit-scad',
    type: 'result',
    module: 4,
    title: 'Monitored Admission: SCAD',
    body: '**Monitored admission for SCAD.**\n\n• In-hospital monitoring for 3 to 5 days is justified as part of a conservative strategy (AHA 2018). [1] The final duration and ED discharge criteria are pending Andy\'s sign-off.\n• Cardiology co-management.\n• Antithrombotic plan: [SCAD antithrombotic plan](#/node/scad-vasospasm-scad-antithrombotic). No fibrinolytics. Anticoagulation only within the limits in that node. The antiplatelet position is in conflict (see that node).\n• Beta-blocker decision: [pending ruling](#/node/scad-vasospasm-scad-beta).\n• Before discharge: rehab plan, activity limits, pregnancy and contraception counseling, return precautions (expert opinion; not sourced in detail).\n• Recurrent chest pain: management is not sourced in this draft (Andy to rule).',
    recommendation: 'Admit for monitored care with cardiology co-management. AHA 2018 supports 3 to 5 days of in-hospital monitoring within a conservative strategy; final duration and ED discharge criteria are pending sign-off. Do not discharge from the ED without cardiology review (expert opinion; pending sign-off).',
    citation: [1, 2],
    confidence: 'recommended',
    summary: 'Conservative SCAD: monitored admission, cardiology co-management. Duration pending sign-off.',
    safetyLevel: 'critical',
  },
  {
    id: 'scad-vasospasm-discharge-spasm',
    type: 'result',
    module: 4,
    title: 'Discharge: Vasospasm With a Plan',
    body: '**Discharge only when all are true:**\n\n• Pain controlled, and no ongoing ischemia on serial ECG and troponin.\n• A calcium channel blocker plan is in place, with a nitrate for symptoms.\n• No PDE-5 inhibitor exposure that makes nitrates unsafe (sildenafil or vardenafil within 24 hours, or tadalafil within 48 hours). [9,10]\n• Stimulant avoidance is understood.\n• Cardiology follow-up is arranged.\n• The patient can reach care quickly.\n\n**Return precautions:** recurrent rest pain, pain not relieved by the usual nitrate, syncope, palpitations, or shortness of breath.',
    recommendation: 'Discharge only with controlled symptoms, no ongoing ischemia, a calcium channel blocker plan, and prompt cardiology follow-up.',
    citation: [3, 6, 9, 10],
    confidence: 'recommended',
    summary: 'Vasospasm discharge needs controlled symptoms, a CCB plan, and cardiology follow-up.',
  },
  {
    id: 'scad-vasospasm-high-risk',
    type: 'result',
    module: 4,
    title: 'Escalate: Ongoing Ischemia or Unclear Diagnosis',
    body: '**Ongoing ischemia, instability, arrhythmia, shock, or unclear diagnosis.**\n\n• Cardiology and cath lab now.\n• Persistent ST elevation: [STEMI pathway](#/tree/stemi).\n• Obstructive plaque found: [NSTE-ACS pathway](#/tree/nstemi).\n• Keep on monitoring. Higher level of care per local protocol.',
    recommendation: 'Escalate now: cardiology, cath lab, and higher level of care. Use the STEMI or NSTE-ACS pathway if either pattern applies.',
    citation: [1, 2],
    confidence: 'definitive',
    summary: 'Instability, arrhythmia, or ongoing ischemia: escalate now.',
    safetyLevel: 'critical',
  },
];

export const SCADV_NODE_COUNT = SCADV_NODES.length;

export const SCADV_MODULE_LABELS = [
  'Recognition',
  'Stabilise & Diagnose',
  'Targeted Treatment',
  'Disposition',
];

export const SCADV_CITATIONS: Citation[] = [
  { num: 1, text: 'Hayes SN, Kim ESH, Saw J, et al. Spontaneous Coronary Artery Dissection: Current State of the Science. Circulation. 2018;137(19):e523-e557. doi:10.1161/CIR.0000000000000564 (AHA scientific statement; text re-read 2026-10-27).' },
  { num: 2, text: 'Adlam D, Alfonso F, Maas A, Vrints C, et al. ESC-ACCA position paper on spontaneous coronary artery dissection. Eur Heart J. 2018;39(36):3353-3368. doi:10.1093/eurheartj/ehy080 (thrombolysis statement re-checked from the journal page excerpt; full text not re-read).' },
  { num: 3, text: 'Virani SS, Newby LK, Arnold SV, et al. 2023 AHA/ACC/ACCP/ASPC/NLA/PCNA Guideline for the Management of Patients With Chronic Coronary Disease. Circulation. 2023;148(9):e9-e119. doi:10.1161/CIR.0000000000001168 (Section 6.1.2 and Tables 16-17 re-read 2026-10-27).' },
  { num: 4, text: 'Saw J, Aymong E, Sedlak T, et al. Spontaneous Coronary Artery Dissection: Clinical Outcomes and Risk of Recurrence. J Am Coll Cardiol. 2017;70(10):1148-1158. doi:10.1016/j.jacc.2017.06.053. PMID 28838364 (recurrence 10.4%, beta-blocker HR 0.36 p=0.004, hypertension HR 2.46 p=0.011 re-checked from abstract; author list abbreviated, confirm full list from PubMed).' },
  { num: 5, text: 'Pasupathy S, Air T, Dreyer RP, Tavella R, Beltrame JF. Systematic review of patients presenting with suspected myocardial infarction and nonobstructive coronary arteries. Circulation. 2015;131(10):861-870. doi:10.1161/circulationaha.114.011201 (spasm 27%, thrombophilia 14% re-checked from abstract).' },
  { num: 6, text: 'Beltrame JF, Crea F, Kaski JC, et al. International standardization of diagnostic criteria for vasospastic angina. Eur Heart J. 2017;38(33):2565-2568. (Criteria cross-checked against the 2023 AHA/ACC Table 16; primary text not re-read.)' },
  { num: 7, text: 'Ghadri JR, Wittstein IS, Prasad A, et al. International Expert Consensus Document on Takotsubo Syndrome (Part I). Eur Heart J. 2018;39(22):2032-2046. (Not re-verified in the 2026-10-27 pass.)' },
  { num: 8, text: 'Ong P, Athanasiadis A, Borgulya G, et al. Clinical usefulness, angiographic characteristics, and safety evaluation of intracoronary acetylcholine provocation testing among 921 consecutive white patients with unobstructed coronary arteries. Circulation. 2014;129(17):1723-1730. PMID 24573349. (Not re-verified in the 2026-10-27 pass.)' },
  { num: 9, text: 'Drug interactions with phosphodiesterase-5 inhibitors used in the treatment of erectile dysfunction and pulmonary arterial hypertension (ACC/AHA-cited review). Circulation. 2011. doi:10.1161/circulationaha.110.944603. Source of the 24-hour (sildenafil, vardenafil) and 48-hour (tadalafil) nitrate windows. Authors to confirm from PubMed.' },
  { num: 10, text: 'Sildenafil citrate (VIAGRA) US prescribing information. Pfizer. Section 4.1 contraindication: nitric oxide donors including organic nitrates and nitrites. The retrieved text gives no time window; windows are from reference 9. Label version to be pinned at sign-off.' },
  { num: 11, text: 'European Society of Cardiology e-journal (volume 14), Spontaneous coronary artery dissection: summary page. Used only for the stated ESC initial-treatment and antiplatelet positions that conflict with AHA 2018 (secondary ESC summary, not the full guideline text).' },
  { num: 12, text: 'JCS/CVIT/JCC 2023 guideline focused update on diagnosis and treatment of vasospastic angina (coronary spastic angina) and coronary microvascular dysfunction. J Cardiol. 2023. PubMed 37597878. Used for the provocation agents (acetylcholine or ergonovine) and first-line calcium channel blocker statement. Primary recommendation text not retrieved; re-check before sign-off.' },
];
