// RAPID strip (format v3), Upper GI Bleed. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// One variant (the consult forks on stability and on cirrhosis, but not into separate resuscitation paths).
// Findings: research/rapid/upper-gi-bleed.findings.json
export const RAPID_UPPER_GI_BLEED = {
    treeId: 'upper-gi-bleed',
    variants: [
        {
            id: 'upper-gi-bleed',
            label: 'Upper GI bleed',
            tiles: [
                {
                    id: 'no-txa',
                    layout: 'steps',
                    action: 'Withhold TXA',
                    figure: 'TXA NOT recommended',
                    condition: 'GI bleeding',
                    nodeIds: ['ugib-start'],
                    lines: [
                        { nodeId: 'ugib-start', text: 'Hemorrhage proximal to Treitz — TXA NOT recommended (HALT-IT: no benefit, increased VTE/seizures)' },
                    ],
                },
                {
                    id: 'access-airway',
                    layout: 'steps',
                    action: 'Access, airway',
                    figure: '2 large-bore IVs',
                    condition: 'Unstable; intubate if GCS <8',
                    nodeIds: ['ugib-unstable-resus'],
                    lines: [
                        { nodeId: 'ugib-unstable-resus', text: '2 large-bore IVs (16-18G) or central line' },
                        { nodeId: 'ugib-unstable-resus', text: 'Type and crossmatch (4+ units if massive)' },
                        { nodeId: 'ugib-unstable-resus', text: 'Consider MTP activation if exsanguinating' },
                        { nodeId: 'ugib-unstable-resus', text: 'Intubate if: GCS <8, massive hematemesis, inability to protect airway' },
                    ],
                },
                {
                    id: 'transfuse',
                    layout: 'steps',
                    action: 'Restrictive transfusion',
                    figure: 'Hgb <7 g/dL',
                    condition: 'ACS: target >8 g/dL',
                    nodeIds: ['ugib-transfusion', 'ugib-unstable-resus'],
                    warning: { nodeId: 'ugib-transfusion', text: 'Excessive transfusion increases portal pressure' },
                    lines: [
                        { nodeId: 'ugib-unstable-resus', text: 'Transfuse when Hgb <7 g/dL (not <9)' },
                        { nodeId: 'ugib-unstable-resus', text: 'Target Hgb 7-8 g/dL' },
                        { nodeId: 'ugib-unstable-resus', text: 'Exception: ACS patients, target Hgb >8 g/dL' },
                    ],
                },
                {
                    id: 'octreotide',
                    layout: 'steps',
                    action: 'Octreotide',
                    figure: '50 mcg, then 50 mcg/hr',
                    condition: 'Start before EGD if varices suspected',
                    nodeIds: ['ugib-octreotide'],
                    lines: [
                        { nodeId: 'ugib-octreotide', text: '50 mcg IV bolus' },
                        { nodeId: 'ugib-octreotide', text: '50 mcg/hr continuous infusion' },
                        { nodeId: 'ugib-octreotide', text: 'Start immediately when varices suspected' },
                    ],
                },
                {
                    id: 'ceftriaxone',
                    layout: 'steps',
                    action: 'Ceftriaxone',
                    figure: '1g IV daily',
                    condition: 'Cirrhosis + GI bleeding',
                    nodeIds: ['ugib-variceal-abx'],
                    lines: [
                        { nodeId: 'ugib-variceal-abx', text: 'MANDATORY for all cirrhotic patients with GI bleeding:' },
                        { nodeId: 'ugib-variceal-abx', text: 'Ceftriaxone 1g IV daily up to 7 days' },
                    ],
                },
                {
                    id: 'limit-fluids',
                    layout: 'steps',
                    action: 'Limit fluids',
                    figure: 'SBP 90-100 mmHg',
                    condition: 'Variceal bleeding',
                    nodeIds: ['ugib-variceal-resus'],
                    warning: { nodeId: 'ugib-variceal-resus', text: 'Excessive fluid increases portal pressure' },
                    lines: [
                        { nodeId: 'ugib-variceal-resus', text: 'Permissive hypotension: SBP 90-100 mmHg acceptable' },
                        { nodeId: 'ugib-variceal-resus', text: 'Avoid crystalloid boluses if possible' },
                    ],
                },
                {
                    id: 'balloon',
                    layout: 'steps',
                    action: 'Balloon tamponade',
                    figure: 'Esophageal max 45 mmHg',
                    condition: 'Uncontrolled bleed; intubate first',
                    nodeIds: ['ugib-blakemore-indications', 'ugib-blakemore-prep', 'ugib-blakemore-technique', 'ugib-esophageal-balloon'],
                    warning: { nodeId: 'ugib-blakemore-prep', text: 'Airway protection is MANDATORY before placement' },
                    lines: [
                        { nodeId: 'ugib-blakemore-indications', text: 'Massive, exsanguinating variceal bleeding uncontrolled by medical/endoscopic therapy' },
                        { nodeId: 'ugib-blakemore-prep', text: 'INTUBATE THE PATIENT — aspiration risk is high' },
                        { nodeId: 'ugib-blakemore-technique', text: 'STOP — Obtain CXR to confirm position BEFORE inflation' },
                        { nodeId: 'ugib-esophageal-balloon', text: 'NEVER exceed 45 mmHg (esophageal necrosis/rupture risk)' },
                    ],
                },
            ],
        },
    ],
};
