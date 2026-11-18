import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Asthma Exacerbation. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// One variant (the consult forks by severity, not into different resuscitation paths). Tile order follows the consult's node FLOW.
// Findings: research/rapid/asthma-exacerbation.findings.json

export const RAPID_ASTHMA_EXACERBATION: RapidStrip = {
  treeId: 'asthma-exacerbation',
  variants: [
    {
      id: 'asthma',
      label: 'Asthma exacerbation',
      tiles: [
        {
          id: 'continuous-nebs',
          layout: 'steps',
          action: 'Continuous nebs',
          figure: 'albuterol 10-15mg/hr',
          condition: 'severe asthma; not intermittent',
          nodeIds: ['asthma-continuous-nebs', 'asthma-severe-immediate'],
          lines: [
            { nodeId: 'asthma-severe-immediate', text: 'Continuous nebs: Start immediately (not intermittent)' },
            { nodeId: 'asthma-continuous-nebs', text: 'Protocol:' },
            { nodeId: 'asthma-continuous-nebs', text: 'Albuterol: 10-15mg/hr continuous (undiluted albuterol in nebulizer)' },
            { nodeId: 'asthma-continuous-nebs', text: 'Run continuously until patient improves' },
          ],
        },
        {
          id: 'magnesium',
          layout: 'drug',
          action: 'IV magnesium',
          figure: '2 g IV over 20 minutes',
          condition: 'Max benefit in severe asthma (PEF <25%)',
          nodeIds: ['asthma-magnesium'],
          warning: { nodeId: 'asthma-magnesium', text: '⚠️ Less effective in mild-moderate asthma - reserve for severe cases' },
          drug: { id: 'magnesium-sulfate-asthma', indication: 'Severe asthma (Adult)' },
          lines: [
            { nodeId: 'asthma-magnesium', text: '2 grams IV over 20 minutes' },
            { nodeId: 'asthma-magnesium', text: 'Can repeat x1 if severe' },
          ],
        },
        {
          id: 'ketamine-bronchodilator',
          layout: 'drug',
          action: 'Ketamine bronchodilator',
          figure: 'Sub-dissociative bolus',
          condition: 'Not improving',
          nodeIds: ['asthma-ketamine'],
          drug: {
            id: 'ketamine-asthma',
            indication: 'Bronchodilation (sub-dissociative)',
            weightCalcs: [{ dosePerKg: 0.3, unit: 'mg', label: 'Bronchodilation bolus' }],
          },
          lines: [
            { nodeId: 'asthma-ketamine', text: 'Dosing for Bronchospasm (sub-dissociative):' },
            { nodeId: 'asthma-ketamine', text: '0.1-0.2 mg/kg IV bolus (10-20mg for typical adult)' },
            { nodeId: 'asthma-ketamine', text: 'Can repeat q10-15 min as needed' },
            { nodeId: 'asthma-ketamine', text: 'Does NOT cause respiratory depression at sub-dissociative doses' },
          ],
        },
        {
          id: 'bipap-low-peep',
          layout: 'steps',
          action: 'BiPAP low PEEP',
          figure: 'EPAP 5, IPAP 10-12',
          condition: 'Patient still alert and cooperative',
          nodeIds: ['asthma-bipap-settings', 'asthma-bipap-indications'],
          warning: { nodeId: 'asthma-bipap-settings', text: 'External PEEP can worsen hyperinflation' },
          lines: [
            { nodeId: 'asthma-bipap-indications', text: 'Patient still alert and cooperative' },
            { nodeId: 'asthma-bipap-settings', text: 'Starting Settings:' },
            { nodeId: 'asthma-bipap-settings', text: 'EPAP (PEEP): 5 cm H2O - start LOW' },
            { nodeId: 'asthma-bipap-settings', text: 'IPAP: 10-12 cm H2O - titrate for comfort' },
          ],
        },
        {
          id: 'dsi-ketamine',
          layout: 'drug',
          action: 'DSI ketamine',
          figure: '1-2 mg/kg IV',
          condition: 'Patient still conscious',
          nodeIds: ['asthma-dsi'],
          drug: {
            id: 'ketamine-asthma',
            indication: 'DSI (Delayed Sequence Intubation)',
            weightCalcs: [{ dosePerKg: 1.5, unit: 'mg', label: 'DSI dose' }],
          },
          warning: { nodeId: 'asthma-dsi', text: 'AVOID propofol, etomidate, succinylcholine' },
          lines: [
            { nodeId: 'asthma-dsi', text: 'Ketamine 1-1.5 mg/kg IV - dissociate the patient' },
            { nodeId: 'asthma-dsi', text: 'Apply BiPAP or NRB for 3-5 minutes' },
            { nodeId: 'asthma-dsi', text: 'Ketamine 1-2 mg/kg IV (induction)' },
            { nodeId: 'asthma-dsi', text: 'Rocuronium 1.2 mg/kg IV' },
          ],
        },
        {
          id: 'disconnect-ett',
          layout: 'steps',
          action: 'Disconnect ETT',
          figure: 'Compress chest',
          condition: 'Intubated and arrests',
          nodeIds: ['asthma-crash-airway'],
          lines: [
            { nodeId: 'asthma-crash-airway', text: 'If Already Intubated and Arrests:' },
            { nodeId: 'asthma-crash-airway', text: 'Disconnect ETT from ventilator' },
            { nodeId: 'asthma-crash-airway', text: 'Manual chest compression for 30-60 seconds' },
            { nodeId: 'asthma-crash-airway', text: 'This allows air trapped under pressure to escape' },
            { nodeId: 'asthma-crash-airway', text: 'Reconnect and ventilate with LOW rate, LONG expiratory time' },
          ],
        },
        {
          id: 'vent-low-rate',
          layout: 'steps',
          action: 'Low-rate ventilation',
          figure: '8-12 breaths/min',
          condition: 'Intubated asthmatic',
          nodeIds: ['asthma-vent-settings', 'asthma-permissive-hypercapnia'],
          warning: { nodeId: 'asthma-permissive-hypercapnia', text: '❌ Don\'t increase rate to "fix" pCO2' },
          lines: [
            { nodeId: 'asthma-vent-settings', text: 'Ventilator strategy: LOW rate, LONG expiratory time:' },
            { nodeId: 'asthma-vent-settings', text: 'Low rate + long I:E = time for air to escape' },
            { nodeId: 'asthma-vent-settings', text: 'LOW rate 8-12, I:E 1:4-1:5, PEEP 0-5 — if hypotensive post-intubation, disconnect ETT and compress chest' },
          ],
        },
      ],
    },
  ],
};
