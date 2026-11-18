import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Hypoglycemia. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant (the consult's only fork is oral vs IV/IM route, not two resuscitation paths).
// Findings: research/rapid/hypoglycemia.findings.json

export const RAPID_HYPOGLYCEMIA: RapidStrip = {
  treeId: 'hypoglycemia',
  variants: [
    {
      id: 'hypoglycemia',
      label: 'Hypoglycemia',
      tiles: [
        {
          id: 'iv-dextrose',
          layout: 'drug',
          action: 'IV dextrose',
          figure: '25 g IV push',
          condition: 'Altered, seizing, or unable to swallow',
          nodeIds: ['hypoglycemia-iv-im-treatment', 'hypoglycemia-start'],
          drug: { id: 'dextrose', indication: 'Hypoglycemia — Adult' },
          lines: [
            { nodeId: 'hypoglycemia-start', text: 'If symptomatic, altered, seizing, or unable to swallow, treat immediately.' },
            { nodeId: 'hypoglycemia-iv-im-treatment', text: 'IV access:' },
            { nodeId: 'hypoglycemia-iv-im-treatment', text: 'D50W 25 g IV push, usually 50 mL of D50W' },
            { nodeId: 'hypoglycemia-iv-im-treatment', text: 'Alternative: D10W 100-250 mL IV, titrated to mental status and glucose response' },
          ],
        },
        {
          id: 'glucagon',
          layout: 'drug',
          action: 'IM glucagon',
          figure: '1 mg',
          condition: 'No IV access',
          nodeIds: ['hypoglycemia-iv-im-treatment'],
          drug: { id: 'glucagon', indication: 'Hypoglycemia' },
          lines: [
            { nodeId: 'hypoglycemia-iv-im-treatment', text: 'No IV access:' },
            { nodeId: 'hypoglycemia-iv-im-treatment', text: 'Glucagon 1 mg IM/SC, or intranasal glucagon 3 mg if available' },
            { nodeId: 'hypoglycemia-iv-im-treatment', text: 'Continue attempts at IV/IO access if severe or not rapidly improving' },
          ],
        },
        {
          id: 'recheck',
          layout: 'steps',
          action: 'Recheck glucose',
          figure: '15 minutes',
          condition: 'After any treatment',
          nodeIds: ['hypoglycemia-recheck'],
          warning: { nodeId: 'hypoglycemia-recheck', text: 'Do not let one normal glucose drive discharge.' },
          lines: [
            { nodeId: 'hypoglycemia-recheck', text: 'After any treatment:' },
            { nodeId: 'hypoglycemia-recheck', text: 'Recheck glucose in 15 minutes.' },
            { nodeId: 'hypoglycemia-recheck', text: 'Repeat therapy until glucose is >70 mg/dL and symptoms improve.' },
          ],
        },
        {
          id: 'infusion',
          layout: 'steps',
          action: 'Start D10W infusion',
          figure: 'glucose generally >100',
          condition: 'Persistent or recurrent hypoglycemia',
          nodeIds: ['hypoglycemia-recurrent', 'hypoglycemia-recheck'],
          lines: [
            { nodeId: 'hypoglycemia-recheck', text: 'If recurrent: start a dextrose infusion while identifying the cause.' },
            { nodeId: 'hypoglycemia-recheck', text: 'D10W titrated to maintain glucose generally >100 mg/dL while definitive cause is addressed.' },
            { nodeId: 'hypoglycemia-recurrent', text: 'Stabilize:' },
            { nodeId: 'hypoglycemia-recurrent', text: 'Start D10W infusion and titrate.' },
            { nodeId: 'hypoglycemia-recurrent', text: 'Check glucose q15-30 min until stable, then q1h or per protocol.' },
          ],
        },
        {
          id: 'octreotide',
          layout: 'drug',
          action: 'Octreotide',
          figure: '50-100 mcg',
          condition: 'Recurrent sulfonylurea/meglitinide',
          nodeIds: ['hypoglycemia-sulfonylurea'],
          warning: { nodeId: 'hypoglycemia-sulfonylurea', text: 'Avoid chasing recurrence with repeated D50 alone.' },
          drug: { id: 'octreotide', indication: 'Sulfonylurea-induced hypoglycemia' },
          lines: [
            { nodeId: 'hypoglycemia-sulfonylurea', text: 'If recurrent or high-risk exposure, give octreotide.' },
            { nodeId: 'hypoglycemia-sulfonylurea', text: 'Adult octreotide:' },
            { nodeId: 'hypoglycemia-sulfonylurea', text: '50-100 mcg SC or IV every 6 hours' },
          ],
        },
        {
          id: 'insulin-overdose',
          layout: 'steps',
          action: 'Titrate D10W',
          figure: 'to glucose trend',
          condition: 'Long-acting insulin, pump, overdose',
          nodeIds: ['hypoglycemia-insulin-overdose'],
          lines: [
            { nodeId: 'hypoglycemia-insulin-overdose', text: 'Management:' },
            { nodeId: 'hypoglycemia-insulin-overdose', text: 'Oral carbohydrate if awake and able to eat.' },
            { nodeId: 'hypoglycemia-insulin-overdose', text: 'D10W infusion titrated to glucose trend.' },
            { nodeId: 'hypoglycemia-insulin-overdose', text: 'Consider higher concentration dextrose through central access if large ongoing requirements.' },
            { nodeId: 'hypoglycemia-insulin-overdose', text: 'Monitor potassium, magnesium, phosphate, and volume status.' },
            { nodeId: 'hypoglycemia-insulin-overdose', text: 'Remove or suspend pump if overdose or malfunction suspected.' },
          ],
        },
        {
          id: 'admit',
          layout: 'steps',
          action: 'Observe or admit',
          figure: 'recurrent <70 mg/dL',
          condition: 'Secretagogue or long-acting insulin',
          nodeIds: ['hypoglycemia-admit', 'hypoglycemia-disposition'],
          lines: [
            { nodeId: 'hypoglycemia-disposition', text: 'Observe or admit if any are present' },
            { nodeId: 'hypoglycemia-admit', text: 'Observation/admission triggers:' },
            { nodeId: 'hypoglycemia-admit', text: 'Recurrent glucose <70 mg/dL after treatment' },
            { nodeId: 'hypoglycemia-admit', text: 'Sulfonylurea or meglitinide exposure' },
            { nodeId: 'hypoglycemia-admit', text: 'Long-acting insulin, concentrated insulin, pump malfunction, or intentional overdose' },
            { nodeId: 'hypoglycemia-admit', text: 'Need for dextrose infusion' },
          ],
        },
      ],
    },
  ],
};
