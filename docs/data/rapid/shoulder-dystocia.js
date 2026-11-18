// RAPID strip (format v3), Shoulder Dystocia. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant; tile order follows the consult's node FLOW. Findings: research/rapid/shoulder-dystocia.findings.json
export const RAPID_SHOULDER_DYSTOCIA = {
    treeId: 'shoulder-dystocia',
    variants: [
        {
            id: 'shoulder-dystocia',
            label: 'Shoulder dystocia',
            tiles: [
                {
                    id: 'call-for-help',
                    layout: 'steps',
                    action: 'Call for help',
                    figure: '4–5 minutes',
                    condition: 'Start the clock, timekeeper',
                    nodeIds: ['sd-initial'],
                    lines: [
                        { nodeId: 'sd-initial', text: 'Announce "shoulder dystocia" clearly to the room' },
                        { nodeId: 'sd-initial', text: 'Call for help — request a second obstetrician if available' },
                        { nodeId: 'sd-initial', text: 'Call pediatrics/NICU — for neonatal evaluation and potential resuscitation' },
                        { nodeId: 'sd-initial', text: 'Call anesthesia — in case procedural intervention is needed' },
                        { nodeId: 'sd-initial', text: 'Designate a timekeeper — call out elapsed time every 30 seconds' },
                        { nodeId: 'sd-initial', text: 'You have approximately 4–5 minutes to deliver a previously well-oxygenated term infant before the risk of hypoxic brain injury becomes significant.' },
                    ],
                },
                {
                    id: 'mcroberts-suprapubic',
                    layout: 'steps',
                    action: 'McRoberts + suprapubic',
                    figure: 'Rapidly, together',
                    condition: 'First intervention',
                    nodeIds: ['sd-mcroberts'],
                    lines: [
                        { nodeId: 'sd-mcroberts', text: 'McRoberts maneuver and suprapubic pressure should be implemented rapidly and simultaneously as the first intervention.' },
                        { nodeId: 'sd-mcroberts', text: 'Sharply flex the mother\'s legs upon her abdomen (hyperflexion of hips)' },
                        { nodeId: 'sd-mcroberts', text: 'An assistant makes a fist and places it just above the maternal pubic bone' },
                        { nodeId: 'sd-mcroberts', text: 'Push the fetal anterior shoulder to one side (toward the oblique diameter)' },
                    ],
                },
                {
                    id: 'woods-screw',
                    layout: 'steps',
                    action: 'Wood\'s screw',
                    figure: 'Rotate 180°',
                    condition: 'Try both directions',
                    nodeIds: ['sd-rotational'],
                    lines: [
                        { nodeId: 'sd-rotational', text: 'Apply pressure on the anterior surface of the posterior shoulder' },
                        { nodeId: 'sd-rotational', text: 'Progressively rotate the posterior shoulder 180° in a corkscrew fashion' },
                        { nodeId: 'sd-rotational', text: 'Try clockwise and counter-clockwise rotation — one direction may succeed where the other fails.' },
                    ],
                },
                {
                    id: 'posterior-arm',
                    layout: 'steps',
                    action: 'Deliver posterior arm',
                    figure: 'Sweep across chest',
                    condition: 'Forearm or wrist only, never upper arm',
                    nodeIds: ['sd-posterior-arm'],
                    warning: { nodeId: 'sd-posterior-arm', text: 'DO NOT pull on the upper arm — humeral fracture risk is much higher with upper-arm traction' },
                    lines: [
                        { nodeId: 'sd-posterior-arm', text: 'Reach along the posterior vaginal wall — the sacral hollow provides the most room' },
                        { nodeId: 'sd-posterior-arm', text: 'Apply firm pressure to the antecubital fossa' },
                        { nodeId: 'sd-posterior-arm', text: 'Grasp the forearm or wrist only — never the upper arm (humerus)' },
                        { nodeId: 'sd-posterior-arm', text: '"Wipe" the arm across the fetal chest in an arc — NOT straight downward' },
                    ],
                },
                {
                    id: 'zavanelli',
                    layout: 'steps',
                    action: 'Zavanelli maneuver',
                    figure: 'Cephalic replacement',
                    condition: 'Only if all standard maneuvers failed',
                    nodeIds: ['sd-last-resort'],
                    lines: [
                        { nodeId: 'sd-last-resort', text: 'If all standard maneuvers have failed, consider these last-resort options.' },
                        { nodeId: 'sd-last-resort', text: 'Set up for emergency cesarean section first' },
                        { nodeId: 'sd-last-resort', text: 'Rotate fetal head to occiput anterior position' },
                        { nodeId: 'sd-last-resort', text: 'Flex the head and apply constant firm pressure to push it back into the vagina' },
                        { nodeId: 'sd-last-resort', text: 'Perform immediate cesarean section after head replacement' },
                    ],
                },
                {
                    id: 'terbutaline',
                    layout: 'drug',
                    action: 'Terbutaline',
                    figure: '0.25 mg SQ',
                    condition: 'Tocolysis before Zavanelli',
                    nodeIds: ['sd-last-resort'],
                    drug: {
                        id: 'terbutaline',
                        indication: 'Tocolysis (Cord Prolapse / Shoulder Dystocia / Zavanelli)',
                    },
                    lines: [
                        { nodeId: 'sd-last-resort', text: 'Administer tocolytics to relax the uterus: Terbutaline 0.25 mg SQ or Nitroglycerin 0.4 mg SL' },
                    ],
                },
                {
                    id: 'nitroglycerin',
                    layout: 'drug',
                    action: 'Nitroglycerin',
                    figure: '0.4 mg SL',
                    condition: 'Alternative to terbutaline',
                    nodeIds: ['sd-last-resort'],
                    drug: {
                        id: 'nitroglycerin',
                        indication: 'Tocolysis (Cord Prolapse / Shoulder Dystocia / Zavanelli)',
                    },
                    lines: [
                        { nodeId: 'sd-last-resort', text: 'Administer tocolytics to relax the uterus: Terbutaline 0.25 mg SQ or Nitroglycerin 0.4 mg SL' },
                    ],
                },
            ],
        },
    ],
};
