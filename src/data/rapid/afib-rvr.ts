import type { RapidStrip } from './types.js';

// RAPID strip (format v3), A-Fib RVR. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Fork at afib-stability. Tile order follows the consult's node FLOW. Findings: research/rapid/afib-rvr.findings.json

export const RAPID_AFIB_RVR: RapidStrip = {
  treeId: 'afib-rvr',
  forkNodeId: 'afib-stability',
  variants: [
    {
      id: 'unstable',
      label: 'Hemodynamically unstable',
      tiles: [
        {
          id: 'wpw',
          layout: 'steps',
          action: 'Screen for WPW',
          figure: 'No AV nodal blockers',
          condition: 'WPW / pre-excitation suspected',
          nodeIds: ['afib-unstable-wpw', 'afib-wpw-result'],
          warning: { nodeId: 'afib-wpw-result', text: 'AV nodal blocking agents are ABSOLUTELY CONTRAINDICATED — including beta-blockers, calcium channel blockers, digoxin, and IV amiodarone' },
          lines: [
            { nodeId: 'afib-unstable-wpw', text: 'irregular wide-complex tachycardia, rate >200, variable QRS morphology, delta waves on prior ECG' },
            { nodeId: 'afib-wpw-result', text: 'Immediate synchronized cardioversion (200J biphasic). If cardioversion is not immediately available, Procainamide may be used as a temporizing measure.' },
          ],
        },
        {
          id: 'cardiovert',
          layout: 'steps',
          action: 'Cardiovert',
          figure: '200J biphasic',
          condition: 'Hemodynamically unstable',
          nodeIds: ['afib-cardioversion-protocol', 'afib-stability'],
          lines: [
            { nodeId: 'afib-stability', text: 'Hypotension, acute HF, ongoing ischemia, altered mental status, or shock' },
            { nodeId: 'afib-cardioversion-protocol', text: 'Confirm synchronization is enabled on defibrillator' },
            { nodeId: 'afib-cardioversion-protocol', text: 'Midazolam 3–5 mg IV bolus, additional 2 mg q2min PRN to adequate sedation' },
            { nodeId: 'afib-cardioversion-protocol', text: 'Start at 200J biphasic (use maximal energy available)' },
            { nodeId: 'afib-cardioversion-protocol', text: 'Escalate energy if initial attempt unsuccessful' },
          ],
        },
      ],
    },
    {
      id: 'stable',
      label: 'Hemodynamically stable',
      tiles: [
        {
          id: 'workup',
          layout: 'steps',
          action: 'Check TSH, troponin',
          figure: 'all patients',
          nodeIds: ['afib-start'],
          lines: [
            { nodeId: 'afib-start', text: 'TSH — thyrotoxicosis is a critical reversible precipitant' },
            { nodeId: 'afib-start', text: 'Troponin — screen for ACS as precipitant' },
            { nodeId: 'afib-start', text: 'Consider PE workup if clinical suspicion' },
          ],
        },
        {
          id: 'check-ef',
          layout: 'steps',
          action: 'Check EF',
          figure: 'EF ≤40%',
          condition: 'EF ≤40% = CCBs CONTRAINDICATED',
          nodeIds: ['afib-ef-screen', 'afib-ef-unknown'],
          lines: [
            { nodeId: 'afib-ef-screen', text: 'Does the patient have reduced ejection fraction (EF ≤40%)?' },
            { nodeId: 'afib-ef-screen', text: 'Calcium channel blockers (diltiazem, verapamil) are contraindicated in HFrEF (Class 3: Harm)' },
            { nodeId: 'afib-ef-unknown', text: 'When EF is unknown, avoid calcium channel blockers (diltiazem, verapamil) until EF is confirmed >40%' },
          ],
        },
        {
          id: 'metoprolol',
          layout: 'drug',
          action: 'IV metoprolol',
          figure: '2.5-5 mg',
          condition: 'First-line if EF ≤40%; safe at any EF',
          nodeIds: ['afib-hfref-drugs', 'afib-ef-unknown', 'afib-stable-drugs'],
          warning: { nodeId: 'afib-stable-drugs', text: 'Diltiazem 0.25mg/kg IV (90% rate control) or metoprolol 2.5-5mg IV — do NOT combine BB with CCB' },
          drug: { id: 'metoprolol', indication: 'A-Fib rate control (acute)' },
          lines: [
            { nodeId: 'afib-hfref-drugs', text: 'FIRST-LINE — Beta-Blockers:' },
            { nodeId: 'afib-hfref-drugs', text: 'Metoprolol 2.5–5 mg IV q5min, up to 15 mg total' },
            { nodeId: 'afib-ef-unknown', text: 'Safe first-line options regardless of EF:' },
            { nodeId: 'afib-ef-unknown', text: 'Metoprolol 2.5–5 mg IV q5min (use lower doses if concerned for HF)' },
          ],
        },
        {
          id: 'diltiazem',
          layout: 'drug',
          action: 'IV diltiazem',
          figure: '0.25 mg/kg',
          condition: 'CONTRAINDICATED if EF ≤40%',
          nodeIds: ['afib-stable-drugs'],
          warning: { nodeId: 'afib-stable-drugs', text: 'Diltiazem 0.25mg/kg IV (90% rate control) or metoprolol 2.5-5mg IV — do NOT combine BB with CCB' },
          drug: {
            id: 'diltiazem',
            indication: 'A-Fib rate control (acute)',
            weightCalcs: [
              { dosePerKg: 0.25, unit: 'mg', label: 'Initial bolus' },
              { dosePerKg: 0.35, unit: 'mg', label: 'Second bolus (if needed)' },
            ],
          },
          lines: [
            { nodeId: 'afib-stable-drugs', text: 'Calcium Channel Blockers:' },
            { nodeId: 'afib-stable-drugs', text: 'Diltiazem — 0.25 mg/kg IV bolus, onset within minutes' },
            { nodeId: 'afib-stable-drugs', text: '⚠️ CONTRAINDICATED if EF ≤40% or decompensated HF (Class 3: Harm)' },
            { nodeId: 'afib-stable-drugs', text: 'Obtain echo or check history for EF if unknown' },
          ],
        },
        {
          id: 'anticoag',
          layout: 'steps',
          action: 'Anticoagulate',
          figure: '≥2 (men) or ≥3 (women)',
          condition: 'CHA₂DS₂-VASc; known/chronic AF',
          nodeIds: ['afib-cha2ds2vasc'],
          lines: [
            { nodeId: 'afib-cha2ds2vasc', text: 'Anticoagulation Recommendations:' },
            { nodeId: 'afib-cha2ds2vasc', text: 'Score ≥2 (men) or ≥3 (women) → Anticoagulate (strong recommendation)' },
            { nodeId: 'afib-cha2ds2vasc', text: 'Score 1 (men) or 2 (women) → Consider anticoagulation' },
            { nodeId: 'afib-cha2ds2vasc', text: 'Score 0 (men) or 1 (women) → May omit anticoagulation' },
          ],
        },
        {
          id: 'tee-48h',
          layout: 'steps',
          action: 'TEE before cardioversion',
          figure: '>48 hours',
          condition: 'patient is NOT anticoagulated',
          nodeIds: ['afib-cha2ds2vasc'],
          lines: [
            { nodeId: 'afib-cha2ds2vasc', text: '⚠️ If AF duration >48 hours and patient is NOT anticoagulated:' },
            { nodeId: 'afib-cha2ds2vasc', text: 'Consider TEE to exclude left atrial appendage thrombus before cardioversion' },
            { nodeId: 'afib-cha2ds2vasc', text: 'Or initiate anticoagulation for ≥3 weeks before elective cardioversion' },
          ],
        },
        {
          id: 'digoxin',
          layout: 'drug',
          action: 'IV digoxin',
          figure: '0.25 mg',
          condition: 'use as adjunct, not sole agent',
          nodeIds: ['afib-refractory-dig', 'afib-hfref-drugs'],
          drug: { id: 'digoxin', indication: 'A-Fib rate control (acute)' },
          lines: [
            { nodeId: 'afib-hfref-drugs', text: 'SECOND-LINE — Digoxin:' },
            { nodeId: 'afib-hfref-drugs', text: 'Digoxin 0.25–0.5 mg IV' },
            { nodeId: 'afib-hfref-drugs', text: 'Slow onset (~3 hours) — use as adjunct, not sole agent' },
            { nodeId: 'afib-refractory-dig', text: 'Useful when hypotension limits further titration of beta-blockers or CCBs' },
          ],
        },
      ],
    },
  ],
};
