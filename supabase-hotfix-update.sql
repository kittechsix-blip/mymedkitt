-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-03
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: pn-start (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":1,"title":"Peripheral Neuropathy — ED Evaluation","body":"[Steps Summary](#/info/pn-steps)\n\n**ED Role in Peripheral Neuropathy:**\n1. Identify emergencies (GBS, cord compression, vasculitis)\n2. Rule out dangerous mimics\n3. Determine workup urgency\n4. Initiate symptomatic treatment\n\n**Presentation Patterns:**\n• **Symmetric distal** — most common, \"stocking-glove\"\n• **Asymmetric/multifocal** — vasculitis, mononeuritis multiplex\n• **Proximal weakness** — GBS, CIDP, myopathy\n\n**First Question:** Are RED FLAGS present? [1][2]","citation":[1,2],"options":[{"label":"Red flags present","description":"Acute, rapidly progressive, motor-predominant, autonomic","next":"pn-red-flags","urgency":"critical"},{"label":"Subacute/chronic symptoms","description":"Gradual onset, sensory-predominant, stable","next":"pn-classification"},{"label":"Uncertain — need more info","description":"Characterize the neuropathy first","next":"pn-classification"}]}'::jsonb
WHERE id = 'pn-start' AND tree_id = 'peripheral-neuropathy';

-- Node: pn-standard-workup (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":3,"title":"Standard ED Workup","body":"**Initial Laboratory Evaluation:**\n\n**Tier 1 — Order on ALL patients:**\n• CBC with differential\n• Comprehensive metabolic panel\n• **Fasting glucose** or **HbA1c**\n• **TSH**\n• **Vitamin B12**\n\n**Tier 2 — If Tier 1 unrevealing:**\n• SPEP with immunofixation (paraproteinemia)\n• HIV\n• Hepatitis B and C\n• ESR/CRP\n• RPR/VDRL\n\n**Tier 3 — Specialist-guided:**\n• Anti-ganglioside antibodies (GBS variants)\n• Paraneoplastic panel\n• Genetic testing (CMT, Fabry)\n• Heavy metals (arsenic, lead, thallium)\n\n**Diagnostic Yield (AAFP 2020):**\n| Test | Yield |\n|------|-------|\n| Glucose abnormality | 11% |\n| Abnormal SPEP | 9% |\n| Low B12 | 3.6% |\n| Abnormal TSH | 2% |\n\n**25-46% remain idiopathic** after full workup [1]","citation":[1],"next":"pn-emg-decision"}'::jsonb
WHERE id = 'pn-standard-workup' AND tree_id = 'peripheral-neuropathy';

-- Node: pn-emergent-workup (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":3,"title":"Emergent Workup — Acute Neuropathy","body":"**Emergent Evaluation for Acute Neuropathy:**\n\n**Bedside Respiratory Assessment:**\n• **FVC** (Forced Vital Capacity) — most useful\n  - <20 mL/kg or <1 L = high intubation risk\n  - Decline >30% from baseline = concerning\n• **NIF** (Negative Inspiratory Force)\n  - Worse than −30 cmH2O = impending failure\n• Check q4h if GBS suspected\n\n**Lumbar Puncture:**\n• **Classic GBS finding:** Albuminocytologic dissociation\n  - Elevated protein (>45 mg/dL)\n  - Normal cell count (<10 cells)\n• May be normal in first week\n• Also rules out infectious/malignant meningitis\n\n**Labs:**\n• Standard workup PLUS:\n• Anti-ganglioside antibodies (GM1, GD1a, GQ1b)\n• Consider stool for botulinum toxin\n• Lyme serologies in endemic areas\n\n**Imaging:**\n• MRI spine if cord compression suspected\n• CXR (aspiration risk, pulmonary function)\n\n**Consults:**\n• Neurology — emergent\n• ICU if respiratory compromise [2][3][6]","citation":[2,3,6],"next":"pn-gbs-pathway","safetyLevel":"critical"}'::jsonb
WHERE id = 'pn-emergent-workup' AND tree_id = 'peripheral-neuropathy';

COMMIT;