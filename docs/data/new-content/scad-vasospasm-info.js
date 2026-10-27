// MedKitt - SCAD and Coronary Vasospasm info pages (DRAFT, not wired).
// Stop page (Do NOT list) and Steps summary. Every item links to a node in scad-vasospasm.ts.
// Register both ids in INFO_PAGES; the stop overlay is opened from the toolbar.
// Citations are inlined (same text as SCADV_CITATIONS in trees/scad-vasospasm.ts) so this module
// does not import the tree and the tree does not load eagerly. Keep the two lists in sync.
const SCADV_INFO_CITATIONS = [
    { num: 1, text: 'Hayes SN, Kim ESH, Saw J, et al. Spontaneous Coronary Artery Dissection: Current State of the Science. Circulation. 2018;137(19):e523-e557. doi:10.1161/CIR.0000000000000564.' },
    { num: 2, text: 'Adlam D, Alfonso F, Maas A, Vrints C, et al. ESC-ACCA position paper on spontaneous coronary artery dissection. Eur Heart J. 2018;39(36):3353-3368. doi:10.1093/eurheartj/ehy080.' },
    { num: 3, text: 'Virani SS, Newby LK, Arnold SV, et al. 2023 AHA/ACC/ACCP/ASPC/NLA/PCNA Guideline for the Management of Patients With Chronic Coronary Disease. Circulation. 2023;148(9):e9-e119. doi:10.1161/CIR.0000000000001168. Tables 16-17 (vasospastic angina).' },
    { num: 4, text: 'Saw J, Aymong E, Sedlak T, et al. Spontaneous Coronary Artery Dissection: Clinical Outcomes and Risk of Recurrence. J Am Coll Cardiol. 2017;70(10):1148-1158. doi:10.1016/j.jacc.2017.06.053. PMID 28838364.' },
    { num: 5, text: 'Pasupathy S, Air T, Dreyer RP, Tavella R, Beltrame JF. Systematic review of patients presenting with suspected myocardial infarction and nonobstructive coronary arteries. Circulation. 2015;131(10):861-870. doi:10.1161/circulationaha.114.011201.' },
    { num: 6, text: 'Beltrame JF, Crea F, Kaski JC, et al. International standardization of diagnostic criteria for vasospastic angina. Eur Heart J. 2017;38(33):2565-2568.' },
    { num: 7, text: 'Tadalafil (CIALIS) US prescribing information. Eli Lilly and Company. Nitrates contraindicated. Time interval after the last dose not confirmed in the 2026-10-27 re-audit (label PDF unreadable).' },
    { num: 8, text: 'Sildenafil citrate (VIAGRA) US prescribing information. Pfizer. Contraindicated with nitric oxide donors including organic nitrates and nitrites; the label states the safe interval after a dose is unknown.' },
    { num: 9, text: 'European Society of Cardiology e-journal (volume 14), Spontaneous coronary artery dissection: summary page. Secondary summary of ESC initial-treatment and antiplatelet positions.' },
];
export const INFO_PAGES_SCADV = {
    'scad-vasospasm-stop': {
        id: 'scad-vasospasm-stop',
        title: 'SCAD and Vasospasm: Do NOT',
        subtitle: 'Critical pitfalls to avoid',
        citations: SCADV_INFO_CITATIONS,
        sections: [
            {
                heading: '🛑 Do NOT give fibrinolytics for suspected SCAD',
                body: 'Fibrinolysis is contraindicated in suspected SCAD per ESC-ACCA 2018. The AHA 2018 statement does not address fibrinolysis. [Antithrombotic plan](#/node/scad-vasospasm-scad-antithrombotic).',
            },
            {
                heading: '🛑 Do NOT anticoagulate SCAD by default',
                body: 'If anticoagulation was started at presentation with no other indication, consider stopping it once SCAD is diagnosed (AHA 2018). Chronic indications are not sourced in this draft. [Antithrombotic plan](#/node/scad-vasospasm-scad-antithrombotic).',
            },
            {
                heading: '🛑 Do NOT stent a SCAD lesion without intracoronary imaging',
                body: 'Intracoronary imaging confirms an intramural hematoma or multiple lumens (AHA 2018). Requiring it before every stent, and the wire-position rule, are expert opinion pending sign-off. [PCI node](#/node/scad-vasospasm-scad-pci).',
            },
            {
                heading: '🛑 Do NOT rush a stable SCAD patient to PCI',
                body: 'Conservative care is generally preferred when the patient is stable with no ongoing ischemia, no hemodynamic instability, and no high-risk anatomy (AHA 2018). Angiographic healing is reported in most restudied patients (observational). [Revascularize or conserve](#/node/scad-vasospasm-scad-stratify).',
            },
            {
                heading: '🛑 Do NOT discharge conservatively managed SCAD from the ED without cardiology review',
                body: 'Monitored admission for conservatively managed SCAD; duration and discharge criteria with cardiology. [Monitored admission](#/node/scad-vasospasm-admit-scad).',
            },
            {
                heading: '🛑 Do NOT give a nitrate before checking for a PDE-5 inhibitor',
                body: 'Nitrates are contraindicated with sildenafil, vardenafil, and tadalafil. The sildenafil label gives no safe interval after a dose. The tadalafil label contraindicates nitrates. The post-dose interval is not confirmed in this review; do not give a nitrate without a documented PDE-5 washout set by pharmacy or cardiology. Nitrates can cause profound hypotension. Nitroglycerin is a named acute-pain drug in this consult. [Vasospasm treatment](#/node/scad-vasospasm-spasm-treat).',
            },
            {
                heading: '🛑 Do NOT assume non-selective beta-blockers are safe in vasospasm',
                body: 'Caution is expert opinion based on a theoretical unopposed alpha effect (AHA 2018 notes concern about worsening vasospasm). Separately, the SCAD beta-blocker question is discussed with cardiology on its own page. [Vasospasm treatment](#/node/scad-vasospasm-spasm-treat). [SCAD beta-blocker evidence](#/node/scad-vasospasm-scad-beta).',
            },
            {
                heading: '🛑 Do NOT skip the stimulant history in young rest-pain patients',
                body: 'Ask about cocaine, methamphetamine, and other stimulants. Substance history changes the vasospasm pathway. [Stabilise](#/node/scad-vasospasm-stabilise).',
            },
            {
                heading: '🛑 Do NOT confuse ergonovine with methylergonovine',
                body: 'Ergonovine is an intracoronary test agent for provocation. Methylergonovine is a postpartum hemorrhage drug. [Provocation testing](#/node/scad-vasospasm-spasm-provocation).',
            },
        ],
    },
    'scad-vasospasm-steps': {
        id: 'scad-vasospasm-steps',
        title: 'SCAD and Vasospasm: Steps Summary',
        subtitle: 'Tap a step to jump to it',
        citations: SCADV_INFO_CITATIONS,
        sections: [
            {
                heading: 'Recognize',
                body: '• [Triage: STEMI pattern, ACS, MINOCA, or mimic](#/node/scad-vasospasm-start)\n• [Stabilise: treat as ACS, ask about stimulants and pregnancy](#/node/scad-vasospasm-stabilise)\n• [Route by mechanism](#/node/scad-vasospasm-route)',
            },
            {
                heading: 'Diagnose',
                body: '• [Spasm criteria: nitrate response plus captured ECG or spasm](#/node/scad-vasospasm-spasm-recognition)\n• [Cath-lab provocation for spasm](#/node/scad-vasospasm-spasm-provocation)\n• [SCAD: dissection on angiography](#/node/scad-vasospasm-scad-recognition)\n• [MINOCA sorting](#/node/scad-vasospasm-minoca)',
            },
            {
                heading: 'Treat',
                body: '• [SCAD stable, no ongoing ischemia: conservative](#/node/scad-vasospasm-scad-conservative)\n• [SCAD ongoing ischemia: PCI with intracoronary imaging](#/node/scad-vasospasm-scad-pci)\n• [SCAD antithrombotic limits: no fibrinolytics, antiplatelet conflict](#/node/scad-vasospasm-scad-antithrombotic)\n• [SCAD beta-blocker: evidence](#/node/scad-vasospasm-scad-beta)\n• [Vasospasm: CCB first, nitrate add-on, PDE-5 check](#/node/scad-vasospasm-spasm-treat)',
            },
            {
                heading: 'Disposition',
                body: '• [Recurrence, follow-up, pregnancy](#/node/scad-vasospasm-followup)\n• [Disposition by final diagnosis](#/node/scad-vasospasm-disposition)\n• [Monitored admission: SCAD](#/node/scad-vasospasm-admit-scad)\n• [Discharge: vasospasm with a plan](#/node/scad-vasospasm-discharge-spasm)\n• [Escalate: ongoing ischemia or unclear diagnosis](#/node/scad-vasospasm-high-risk)',
            },
        ],
    },
};
