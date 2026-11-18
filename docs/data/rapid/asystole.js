// RAPID strip (format v3), Asystole. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant (true asystole); tile order = time-critical first, then consult flow. Findings: research/rapid/asystole.findings.json
export const RAPID_ASYSTOLE = {
    treeId: 'asystole',
    variants: [
        {
            id: 'asystole',
            label: 'True asystole',
            tiles: [
                {
                    id: 'start-cpr',
                    layout: 'steps',
                    action: 'Start CPR',
                    figure: 'Activate team, pads on',
                    condition: 'Pulse unsure: limit to 10 seconds',
                    nodeIds: ['asystole-start'],
                    warning: { nodeId: 'asystole-start', text: 'Do not delay CPR, ventilation or early epinephrine to troubleshoot the monitor.' },
                    lines: [
                        { nodeId: 'asystole-start', text: 'activate the team, start CPR and attach defibrillation pads. If pulse assessment is uncertain, limit it to 10 seconds and start CPR.' },
                    ],
                },
                {
                    id: 'epinephrine',
                    layout: 'steps',
                    action: 'Epinephrine',
                    figure: '1 mg IV/IO',
                    condition: 'As soon as feasible',
                    nodeIds: ['asystole-cpr', 'asystole-reassess'],
                    warning: { nodeId: 'asystole-cpr', text: 'No routine shock, atropine, or pacing for true asystole. Calcium, bicarbonate and magnesium are not routine arrest drugs; use only for a specific indication.' },
                    lines: [
                        { nodeId: 'asystole-cpr', text: 'Prefer IV; use IO if IV is not feasible or delayed. Do not wait for a completed CPR cycle to give the first dose.' },
                        { nodeId: 'asystole-reassess', text: 'Continue epinephrine every 3–5 minutes while pulseless.' },
                    ],
                },
                {
                    id: 'confirm-signal',
                    layout: 'steps',
                    action: 'Check signal',
                    figure: 'Second vector, gain',
                    condition: 'At rhythm check, under 10 seconds',
                    nodeIds: ['asystole-confirm'],
                    warning: { nodeId: 'asystole-confirm', text: 'Do not diagnose VF from compression/movement artifact or a filtered CPR waveform alone. A flat second lead does not guarantee VF is excluded.' },
                    lines: [
                        { nodeId: 'asystole-confirm', text: 'Confirm cable connections, pads/electrode adhesion, and absence of a lead-off message. A disconnected lead is not asystole.' },
                        { nodeId: 'asystole-confirm', text: 'inspect a second available ECG vector and increase display gain/size if the trace is very small. Keep interruption under 10 seconds' },
                    ],
                },
                {
                    id: 'shock-vf',
                    layout: 'steps',
                    action: 'Shock if VF',
                    figure: 'Confirmed VF/pVT',
                    condition: 'Includes confirmed fine VF',
                    nodeIds: ['asystole-shockable'],
                    lines: [
                        { nodeId: 'asystole-shockable', text: 'Defibrillate VF/pVT; immediately resume CPR.' },
                        { nodeId: 'asystole-shockable', text: 'Do not delay confirmed fine-VF defibrillation to make VF coarser.' },
                    ],
                },
                {
                    id: 'cpr-quality',
                    layout: 'steps',
                    action: 'Ventilate',
                    figure: '30:2 or 1 per 6 s',
                    condition: 'Advanced airway: continuous compressions',
                    nodeIds: ['asystole-cpr'],
                    lines: [
                        { nodeId: 'asystole-cpr', text: 'Bag-mask with oxygen; 30:2 without an advanced airway. With an advanced airway, continuous compressions and 1 breath every 6 seconds; avoid hyperventilation.' },
                    ],
                },
                {
                    id: 'reversible-causes',
                    layout: 'steps',
                    action: 'Treat reversible causes',
                    figure: 'H\'s and T\'s',
                    nodeIds: ['asystole-causes'],
                    lines: [
                        { nodeId: 'asystole-causes', text: 'Hypoxia: verify ventilation, airway position and oxygen supply.' },
                        { nodeId: 'asystole-causes', text: 'Hypovolemia: control hemorrhage; blood/fluids as indicated.' },
                        { nodeId: 'asystole-causes', text: 'Hypo-/hyperkalemia: review context, point-of-care electrolytes and ECG; use cause-specific treatment.' },
                        { nodeId: 'asystole-causes', text: 'Hypothermia: temperature and rewarming pathway.' },
                        { nodeId: 'asystole-causes', text: 'Tension pneumothorax: decompress when clinically suspected.' },
                        { nodeId: 'asystole-causes', text: 'Tamponade: selected expert ultrasound and drainage pathway.' },
                        { nodeId: 'asystole-causes', text: 'Toxins: exposure-directed resuscitation / toxicology support.' },
                        { nodeId: 'asystole-causes', text: 'Thrombosis: consider PE and coronary causes.' },
                    ],
                },
                {
                    id: 'reassess',
                    layout: 'steps',
                    action: 'Reassess',
                    figure: 'Every 2 minutes',
                    nodeIds: ['asystole-reassess'],
                    lines: [
                        { nodeId: 'asystole-reassess', text: 'Brief rhythm assessment every 2 minutes; check pulse only with an organized rhythm or signs of ROSC.' },
                    ],
                },
            ],
        },
    ],
};
