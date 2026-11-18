import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Massive Transfusion Protocol. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant; tile order follows the consult's node FLOW. Findings: research/rapid/massive-transfusion.findings.json

export const RAPID_MASSIVE_TRANSFUSION: RapidStrip = {
  treeId: 'massive-transfusion',
  variants: [
    {
      id: 'massive-hemorrhage',
      label: 'Massive hemorrhage',
      tiles: [
        {
          id: 'activate-mtp',
          layout: 'steps',
          action: 'Activate MTP',
          figure: 'ABC Score ≥2',
          condition: 'Trauma: any one criterion',
          nodeIds: ['mtp-trauma-assess'],
          lines: [
            { nodeId: 'mtp-trauma-assess', text: 'Activate MTP if ANY of the following:' },
            { nodeId: 'mtp-trauma-assess', text: 'ABC Score ≥2' },
            { nodeId: 'mtp-trauma-assess', text: 'Shock Index >1.0 with evidence of hemorrhage' },
            { nodeId: 'mtp-trauma-assess', text: 'SBP <90 mmHg with suspected hemorrhage' },
            { nodeId: 'mtp-trauma-assess', text: 'Penetrating torso trauma with hypotension' },
          ],
        },
        {
          id: 'limit-crystalloid',
          layout: 'steps',
          action: 'Limit crystalloid',
          figure: 'max 1-2 L',
          condition: 'SBP 80-90 in trauma, except TBI',
          nodeIds: ['mtp-initial-resus', 'mtp-permissive-hypotension'],
          lines: [
            { nodeId: 'mtp-initial-resus', text: 'Large-bore IV access: 2 × 16-18G peripheral or IO access' },
            { nodeId: 'mtp-initial-resus', text: 'Type and crossmatch STAT (use rapid sample tube if available)' },
            { nodeId: 'mtp-initial-resus', text: 'Crystalloid: 1-2 L LR or NS (avoid excessive crystalloid — dilutional coagulopathy)' },
            { nodeId: 'mtp-initial-resus', text: 'Consider permissive hypotension (SBP 80-90) in trauma, except TBI' },
            { nodeId: 'mtp-permissive-hypotension', text: 'Minimize crystalloid (max 1-2 L)' },
          ],
        },
        {
          id: 'blood-products',
          layout: 'drug',
          action: 'Give pRBCs 1:1:1',
          figure: '6 units; 1:1:1 FFP, plt',
          condition: 'O-neg if female <50 or Rh unknown',
          nodeIds: ['mtp-products', 'mtp-cooler-contents'],
          drug: { id: 'packed-rbcs', indication: 'Massive transfusion protocol' },
          lines: [
            { nodeId: 'mtp-products', text: 'Practical 1:1:1:' },
            { nodeId: 'mtp-products', text: '6 units pRBCs : 6 units FFP : 1 apheresis platelet (or 6-pack random donor)' },
            { nodeId: 'mtp-cooler-contents', text: 'Released q15-30 min as long as MTP active' },
            { nodeId: 'mtp-cooler-contents', text: 'Switch to type-specific blood ASAP (preserves O-negative supply)' },
          ],
        },
        {
          id: 'calcium',
          layout: 'steps',
          action: 'Calcium chloride',
          figure: '1 g IV per 4 units',
          condition: 'Target iCa >1.0 mmol/L',
          nodeIds: ['mtp-calcium'],
          lines: [
            { nodeId: 'mtp-calcium', text: 'Dosing rule of thumb:' },
            { nodeId: 'mtp-calcium', text: 'Calcium Chloride 1 g IV per 4 units blood products' },
            { nodeId: 'mtp-calcium', text: 'Target: iCa >1.0 mmol/L (ideally >1.1)' },
            { nodeId: 'mtp-calcium', text: 'Check iCa with each ABG during MTP' },
          ],
        },
        {
          id: 'txa',
          layout: 'drug',
          action: 'Tranexamic acid',
          figure: '1 g IV over 10 min',
          condition: 'Within 3 hours of injury',
          nodeIds: ['mtp-txa'],
          drug: { id: 'tranexamic-acid', indication: 'Pelvic fracture / trauma hemorrhage' },
          warning: { nodeId: 'mtp-txa', text: 'Do NOT delay MTP activation to give TXA — give concurrently.' },
          lines: [
            { nodeId: 'mtp-txa', text: 'Critical timing: Give within 3 hours of injury/onset!' },
            { nodeId: 'mtp-txa', text: 'Tranexamic Acid 1 g IV over 10 min, then 1 g IV over 8 hours (CRASH-2 protocol)' },
            { nodeId: 'mtp-txa', text: 'Alternative: 2 g IV/IO single bolus (no infusion required)' },
          ],
        },
        {
          id: 'warm-products',
          layout: 'steps',
          action: 'Warm products',
          figure: 'Temp <36°C impairs clotting',
          condition: 'Lethal triad of trauma',
          nodeIds: ['mtp-complications'],
          lines: [
            { nodeId: 'mtp-complications', text: 'Lethal triad of trauma: Hypothermia + Acidosis + Coagulopathy' },
            { nodeId: 'mtp-complications', text: 'Core temp <36°C impairs clotting enzymes' },
            { nodeId: 'mtp-complications', text: 'Warm all products, active rewarming' },
          ],
        },
        {
          id: 'stop-mtp',
          layout: 'steps',
          action: 'Stop MTP criteria',
          figure: 'MAP >65, HR <100',
          condition: 'Bleeding controlled, lactate falling',
          nodeIds: ['mtp-when-stop'],
          warning: { nodeId: 'mtp-when-stop', text: 'Do NOT stop MTP prematurely:' },
          lines: [
            { nodeId: 'mtp-when-stop', text: 'Criteria for MTP deactivation:' },
            { nodeId: 'mtp-when-stop', text: 'Surgical/procedural bleeding control achieved' },
            { nodeId: 'mtp-when-stop', text: 'Hemodynamic stability without ongoing transfusion (MAP >65, HR <100)' },
            { nodeId: 'mtp-when-stop', text: 'Lactate trending down' },
            { nodeId: 'mtp-when-stop', text: 'No clinical evidence of ongoing hemorrhage' },
            { nodeId: 'mtp-when-stop', text: 'Patient may appear stable but still be compensating' },
            { nodeId: 'mtp-when-stop', text: 'Watch for rebleeding in first 6-12 hours' },
          ],
        },
      ],
    },
  ],
};
