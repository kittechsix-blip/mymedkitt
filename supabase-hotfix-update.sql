BEGIN;

-- delirium: del-hypoactive
UPDATE decision_nodes SET body = E'RASS -1 to -3. The **most commonly missed** subtype — 32-67% undiagnosed in the ED. **Higher mortality** than hyperactive.\n\nPatients are often dismissed as "tired" or "baseline dementia." Verify with family/prior documentation before attributing to baseline.\n\n**Common causes:** Metabolic derangements, medication effects (opioids, sedatives, anticholinergics), infection (UTI/pneumonia in elderly), dehydration.\n\nAntipsychotics are NOT beneficial — focus on treating the underlying cause.' WHERE id = 'del-hypoactive' AND tree_id = 'delirium';

-- delirium: del-hyperactive
UPDATE decision_nodes SET body = E'RASS +1 to +4. Agitation, combativeness, hyperactivity, hallucinations. **Mixed delirium** fluctuates between subtypes — most persistent course.\n\n**Distinguish from primary psychiatric disorder:**\n• Delirium: acute onset, fluctuating, inattention, altered consciousness\n• Primary psychosis: chronic/subacute, organized delusions, intact attention, stable vitals\n• New-onset "psychiatric" symptoms without psychiatric history → assume medical until proven otherwise\n\nMay require immediate pharmacological management — but always search for underlying etiology concurrently.' WHERE id = 'del-hyperactive' AND tree_id = 'delirium';

-- delirium: del-exds
UPDATE decision_nodes SET body = E'[Excited Delirium Syndrome](#/info/del-exds-info) — full recognition criteria, pathophysiology, and management.\n\n**Medical emergency** — ~10% case fatality rate. Most deaths from cardiac arrhythmia (PEA, asystole). **6 of 10 criteria = probable ExDS.**\n\nTemperature >104°F is the **single best predictor of death.**\n\n**IMMEDIATE:** Remove from prone position → aggressive cooling → IV access → proceed to ExDS management.' WHERE id = 'del-exds' AND tree_id = 'delirium';

-- delirium: del-etiology
UPDATE decision_nodes SET body = E'Multiple causes often coexist. In 13% of cases, no precipitant is identified.\n\n[Precipitating Factors](#/info/del-precipitants) — comprehensive list by category.\n[Vulnerability Factors](#/info/del-vulnerability) — patient risk factors that lower the delirium threshold.\n\nWhich category is most likely based on your clinical assessment?' WHERE id = 'del-etiology' AND tree_id = 'delirium';

-- delirium: del-med-review
UPDATE decision_nodes SET body = E'**Systematic medication reconciliation** — one of the most easily correctable precipitants.\n\n**Check for:**\n• New medications within past 2 weeks\n• Recent dose changes\n• Drug-drug interactions (CYP inhibitors/inducers)\n• Polypharmacy (≥5 meds independently increases risk)\n• Anticholinergic burden — cumulative effect of multiple low-anticholinergic drugs\n• Recent discontinuation (withdrawal risk)\n\nSee [Precipitating Factors](#/info/del-precipitants) for high-risk medication classes (Beers Criteria).\n\n**Iatrogenic ED/hospital precipitants:** Physical restraints, bladder catheter, ≥3 new medications, sleep disruption, malnutrition.' WHERE id = 'del-med-review' AND tree_id = 'delirium';

-- delirium: del-exds-mgmt
UPDATE decision_nodes SET body = E'**Sedation:**\n• [Midazolam](#/drug/midazolam/agitation) 5 mg IM — first-line. Repeat q5-10 min as needed.\n• **Refractory:** [Ketamine](#/drug/ketamine/agitation) 4 mg/kg IM. Prepare for intubation (29% rate in one study).\n\n**Concurrent management:**\n• Aggressive cooling → target <101°F\n• Large-bore IV × 2, aggressive NS\n• Continuous telemetry — anticipate PEA/asystole\n\n**Labs:** CK, K+, VBG/lactate, creatinine. Core temp q15 min.\n\n**Disposition:** ICU mandatory. See [Excited Delirium Syndrome](#/info/del-exds-info) for full protocol.' WHERE id = 'del-exds-mgmt' AND tree_id = 'delirium';

-- delirium: del-population
UPDATE decision_nodes SET body = E'Tailor to patient age, comorbidities, and suspected etiology.\n\n[Medications for Acute Agitation](#/info/del-meds-table) — dosing, onset, and contraindications by agent.\n\nWhich population best describes this patient?' WHERE id = 'del-population' AND tree_id = 'delirium';

-- delirium: del-pharm-decision
UPDATE decision_nodes SET body = E'**Pharmacological treatment is second-line** — only when nonpharmacological interventions fail and safety is at risk.\n\n**Indications:**\n• Severe agitation threatening patient or staff safety\n• Unable to cooperate with essential workup or critical care\n• Physical restraints needed to facilitate evaluation\n\n**Do NOT sedate hypoactive delirium** — treat the underlying cause instead.' WHERE id = 'del-pharm-decision' AND tree_id = 'delirium';

COMMIT;