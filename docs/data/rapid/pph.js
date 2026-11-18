// RAPID strip (format v3), Postpartum Hemorrhage. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// One variant (the consult's only fork, pph-initial-assess, rejoins the same path). Tile order follows the consult's node FLOW.
// Findings: research/rapid/pph.findings.json
export const RAPID_PPH = {
    treeId: 'pph',
    variants: [
        {
            id: 'pph',
            label: 'Postpartum hemorrhage',
            tiles: [
                {
                    id: 'call-help',
                    layout: 'steps',
                    action: 'Call for help',
                    figure: 'OB, anesthesia, blood bank',
                    nodeIds: ['pph-call-team', 'pph-unstable'],
                    lines: [
                        { nodeId: 'pph-unstable', text: 'OB attending, anesthesia, charge nurse, blood bank ("MTP on standby for OB hemorrhage"), OR if not already aware.' },
                        { nodeId: 'pph-call-team', text: 'OB attending — definitive management, surgical decisions' },
                        { nodeId: 'pph-call-team', text: 'Blood bank — activate MTP, confirm sample available, send emergency-release cooler' },
                        { nodeId: 'pph-call-team', text: 'Pharmacy — mix uterotonics, prepare TXA' },
                    ],
                },
                {
                    id: 'access-labs',
                    layout: 'steps',
                    action: 'Access and labs',
                    figure: '2 IVs, T&C 4-6 units',
                    nodeIds: ['pph-access-labs'],
                    lines: [
                        { nodeId: 'pph-access-labs', text: '2 large-bore IVs (16-18g) minimum — IO if peripheral access fails' },
                        { nodeId: 'pph-access-labs', text: 'CBC with platelets, fibrinogen, PT/PTT, INR' },
                        { nodeId: 'pph-access-labs', text: 'Type & crossmatch 4-6 units pRBC (if not already typed, draw and send)' },
                        { nodeId: 'pph-access-labs', text: '2 units pRBC emergency release (O-negative or type-specific if known)' },
                    ],
                },
                {
                    id: 'fundal-massage',
                    layout: 'steps',
                    action: 'Fundal massage',
                    figure: 'Do not wait for uterotonics',
                    nodeIds: ['pph-massage-fundus'],
                    lines: [
                        { nodeId: 'pph-massage-fundus', text: 'Do not wait for uterotonics to mix.' },
                        { nodeId: 'pph-massage-fundus', text: 'Massage firmly in a circular motion — "cup" the fundus and knead' },
                        { nodeId: 'pph-massage-fundus', text: 'Continue until the uterus feels firm, globular, and well-contracted' },
                        { nodeId: 'pph-massage-fundus', text: 'Place a Foley catheter if not already done. This alone often reduces bleeding.' },
                    ],
                },
                {
                    id: 'txa',
                    layout: 'drug',
                    action: 'Tranexamic acid',
                    figure: '1 g',
                    condition: 'NO BENEFIT if given >3 hours',
                    nodeIds: ['pph-txa'],
                    warning: { nodeId: 'pph-txa', text: 'DO NOT DELAY uterotonics or mechanical measures to give TXA — it is an adjunct, not a substitute.' },
                    drug: { id: 'tranexamic-acid', indication: 'Postpartum Hemorrhage / Resuscitative Hysterotomy' },
                    lines: [
                        { nodeId: 'pph-txa', text: 'Give Tranexamic Acid 1 g IV over 10 minutes as soon as PPH is diagnosed.' },
                        { nodeId: 'pph-txa', text: '1 g IV over 10 minutes (infuse at 1 mL/min — faster infusion causes hypotension)' },
                        { nodeId: 'pph-txa', text: 'Repeat 1 g IV at 30 minutes if bleeding continues or restarts within 24 hours' },
                    ],
                },
                {
                    id: 'four-ts',
                    layout: 'steps',
                    action: "Check 4 T's",
                    figure: 'Always check Tone first',
                    nodeIds: ['pph-four-ts', 'pph-four-ts-q'],
                    lines: [
                        { nodeId: 'pph-four-ts', text: 'Always check Tone first. If the uterus is firm and well-contracted but bleeding continues — think Trauma or Tissue.' },
                        { nodeId: 'pph-four-ts-q', text: 'Tone = boggy/soft uterus' },
                        { nodeId: 'pph-four-ts-q', text: 'Trauma = firm uterus, active bleeding from canal, or signs of inversion/rupture' },
                        { nodeId: 'pph-four-ts-q', text: 'Tissue = incomplete placenta or persistent bleeding despite firm uterus and no lacerations' },
                        { nodeId: 'pph-four-ts-q', text: 'Thrombin = generalized oozing (IV sites, mucosa) or known coagulopathy/Amniotic Fluid Embolism' },
                    ],
                },
                {
                    id: 'oxytocin',
                    layout: 'drug',
                    action: 'Oxytocin infusion',
                    figure: '20 units, 250 mL/hr',
                    condition: 'NEVER IV push',
                    nodeIds: ['pph-oxytocin'],
                    warning: { nodeId: 'pph-oxytocin', text: 'NEVER give IV push — causes profound hypotension and can trigger cardiac arrest' },
                    drug: { id: 'oxytocin', indication: 'Postpartum Hemorrhage / Resuscitative Hysterotomy' },
                    lines: [
                        { nodeId: 'pph-oxytocin', text: '20 units in 1 L NS or LR — infuse at 250 mL/hr (≈83 mU/min)' },
                        { nodeId: 'pph-oxytocin', text: 'Alternative if no IV access: 10 units IM' },
                        { nodeId: 'pph-oxytocin', text: 'MAX 40 units / 500 mL (higher concentrations trigger hypotension)' },
                    ],
                },
                {
                    id: 'bakri',
                    layout: 'steps',
                    action: 'Bakri balloon',
                    figure: '300-500 mL saline',
                    condition: 'CI: rupture, infection, anomaly',
                    nodeIds: ['pph-bakri'],
                    lines: [
                        { nodeId: 'pph-bakri', text: 'Persistent uterine atony despite maximal medical therapy' },
                        { nodeId: 'pph-bakri', text: 'CONTRAINDICATIONS' },
                        { nodeId: 'pph-bakri', text: 'Uterine rupture' },
                        { nodeId: 'pph-bakri', text: 'Active uterine infection' },
                        { nodeId: 'pph-bakri', text: 'Known uterine anomaly preventing balloon placement' },
                        { nodeId: 'pph-bakri', text: 'Inflate with 300-500 mL sterile saline (max 500 mL — Bakri)' },
                        { nodeId: 'pph-bakri', text: 'Monitor drainage port — >100 mL/hr of ongoing bloody drainage = tamponade failure → escalate' },
                    ],
                },
            ],
        },
    ],
};
