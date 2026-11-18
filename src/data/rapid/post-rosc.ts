import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Post-Cardiac Arrest Care. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant; tile order follows the consult's node FLOW. Findings: research/rapid/post-rosc.findings.json

export const RAPID_POST_ROSC: RapidStrip = {
  treeId: 'post-rosc',
  variants: [
    {
      id: 'post-rosc',
      label: 'Post-ROSC',
      tiles: [
        {
          id: 'ecg',
          layout: 'steps',
          action: '12-lead ECG',
          figure: 'STEMI',
          condition: 'Immediately after ROSC',
          nodeIds: ['rosc-start'],
          lines: [
            { nodeId: 'rosc-start', text: 'Immediate Workup:' },
            { nodeId: 'rosc-start', text: '12-lead ECG — STEMI identification is the #1 priority' },
            { nodeId: 'rosc-start', text: 'Airway & Ventilation:' },
            { nodeId: 'rosc-start', text: 'Secure airway if not already — intubate if GCS ≤8' },
            { nodeId: 'rosc-start', text: 'Waveform capnography to confirm ETT placement' },
            { nodeId: 'rosc-start', text: 'Target ETCO2 35-45 mmHg — guides ventilation' },
          ],
        },
        {
          id: 'pci',
          layout: 'steps',
          action: 'Emergent PCI',
          figure: 'STEMI + ROSC',
          condition: 'Do not delay for CT head',
          nodeIds: ['rosc-cath'],
          warning: { nodeId: 'rosc-cath', text: 'STEMI + ROSC → emergent PCI. Do not delay for CT head or other workup.' },
          lines: [
            { nodeId: 'rosc-cath', text: 'Activate cath lab immediately' },
            { nodeId: 'rosc-cath', text: 'TTM can be initiated in cath lab' },
            { nodeId: 'rosc-cath', text: 'Transfer to PCI-capable center if not available' },
          ],
        },
        {
          id: 'map',
          layout: 'steps',
          action: 'Hold MAP',
          figure: 'MAP ≥65 mmHg',
          condition: 'Avoid hypotension',
          nodeIds: ['rosc-hemo'],
          lines: [
            { nodeId: 'rosc-hemo', text: 'MAP ≥65 mmHg — avoid hypotension; use fluids and vasopressor/inotrope support as clinically indicated' },
          ],
        },
        {
          id: 'oxygen',
          layout: 'steps',
          action: 'Titrate oxygen',
          figure: 'SpO₂ 90-98%',
          condition: 'Avoid hypoxemia and hyperoxemia',
          nodeIds: ['rosc-hemo'],
          lines: [
            { nodeId: 'rosc-hemo', text: 'SpO2 90-98% or PaO2 60-105 mmHg — avoid hypoxemia and severe hyperoxemia (PaO2 >250 mmHg has been associated with worse outcomes)' },
            { nodeId: 'rosc-hemo', text: 'PaCO2 35-45 mmHg — avoid hypocapnia (cerebral vasoconstriction)' },
            { nodeId: 'rosc-hemo', text: 'Once a reliable oxygenation measurement is available, titrate FiO2 to the target range.' },
            { nodeId: 'rosc-hemo', text: 'Use 100% oxygen until SpO2 or PaO2 can be measured reliably.' },
          ],
        },
        {
          id: 'temperature',
          layout: 'steps',
          action: 'Control temperature',
          figure: '32°C and 37.5°C',
          condition: 'Not following commands after ROSC',
          nodeIds: ['rosc-ttm-coma'],
          lines: [
            { nodeId: 'rosc-ttm-coma', text: 'Patient not following commands after ROSC: initiate deliberate temperature control.' },
            { nodeId: 'rosc-ttm-coma', text: 'AHA 2025:' },
            { nodeId: 'rosc-ttm-coma', text: 'Maintain a controlled temperature between 32°C and 37.5°C' },
            { nodeId: 'rosc-ttm-coma', text: 'Maintain temperature control for at least 36 hours' },
            { nodeId: 'rosc-ttm-coma', text: 'If using a normothermia strategy, actively prevent fever and keep temperature below 37.5°C' },
          ],
        },
        {
          id: 'prognosis',
          layout: 'steps',
          action: 'Wait to prognosticate',
          figure: 'At least 72 hours',
          condition: 'Not before confounders clear',
          nodeIds: ['rosc-neuro'],
          warning: { nodeId: 'rosc-neuro', text: 'Premature withdrawal of care can cause an avoidable death.' },
          lines: [
            { nodeId: 'rosc-neuro', text: 'No single test is sufficient.' },
          ],
        },
        {
          id: 'eeg',
          layout: 'steps',
          action: 'EEG for seizures',
          figure: 'No routine prophylaxis',
          condition: 'Not following commands',
          nodeIds: ['rosc-seizure'],
          warning: { nodeId: 'rosc-seizure', text: 'Do not give routine antiseizure prophylaxis when there is no seizure or ictal-interictal EEG pattern' },
          lines: [
            { nodeId: 'rosc-seizure', text: 'Obtain continuous or repeated EEG in patients who do not follow commands and when seizures are suspected' },
          ],
        },
      ],
    },
  ],
};
