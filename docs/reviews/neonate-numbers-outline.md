# Neonate Numbers (<3 kg): build outline (for Andy's approval)

Calculator id: `neo-numbers` · lives inside Pedi Resus Numbers (replaces the current "under 3 kg, go to NRP consult" dead end) and is linked from the Neonatal Resuscitation consult toolbar. Status: OUTLINE, nothing built.

Primary source read in full: Lee HC, Strand ML, et al. Part 5: Neonatal Resuscitation. 2025 AHA/AAP Guidelines. Circulation 2025;152(16 suppl 2):S385-S423 (PMID 41122887). Size and depth tables come from neonatal references (below) because the guideline does not tabulate them.

## 1. What the clinician sees

- One input: weight (`1.8kg` or `1800g`) and/or gestational age (`32wk`). Either works; both is best. Typing `newborn` or an age under 1 month opens this screen and asks for weight.
- Neonate color band (teal), with weight, GA and "preterm / term" label.
- Tabs: **Airway · Breathe · Circulate · Drugs · After ROSC**. Same mg + mL row style as the pedi tool.

## 2. Content (2025 AHA/AAP unless noted)

**Airway (by weight, GA as tiebreak)**

| Weight | GA | ETT (uncuffed) | Depth at lip (Kempley GA table; weight + 6 cm check) | Blade | Suction | OG |
|---|---|---|---|---|---|---|
| <1 kg | <28 wk | 2.5 | 5.5-6.5 cm | 00 | 5-6 Fr | 5 Fr |
| 1-2 kg | 28-34 wk | 3.0 | 6.5-7.5 cm | 0 | 6-8 Fr | 5-8 Fr |
| 2-3 kg | 34-38 wk | 3.5 | 7.5-8.5 cm | 0-1 | 8 Fr | 8 Fr |
| >3 kg | >38 wk | 3.5-4.0 | 8.5-9 cm | 1 | 8-10 Fr | 8 Fr |

- Laryngeal mask: size 1 if ≥34 wk and ≥2 kg (guideline: evidence ≥34 wk; most devices list 2 kg lower limit); can be used during compressions.
- Confirm with CO2 detector + rising HR. Max 30 s per attempt.

**Breathe**
- Start PPV if apneic/gasping or HR <100 after initial steps: **30-60 inflations/min**, PIP **20-30 cm H2O** (higher if no rise in HR), PEEP 5.
- Starting oxygen: **21%** ≥35 wk; **21-30%** 32-35 wk; **30-100%** <32 wk, titrate by right-hand SpO2.
- Preductal SpO2 targets by minute (as in the current NRP consult): 1 min 60-65, 2 min 65-70, 3 min 70-75, 4 min 75-80, 5 min 80-85, 10 min 85-95.
- MR SOPA corrective steps; sustained inflations >5 s not recommended in preterm.
- Cord: defer clamping **≥60 s** in vigorous infants; intact cord milking only 28+0 to 36+6 wk when deferral impossible (not <28 wk).

**Circulate**
- Compressions if HR <60 after 30 s of ventilation that moves the chest (ideally via ETT or LMA): **3:1, 90 compressions + 30 inflations/min**, 2-thumb encircling, 1/3 AP depth, **100% O2** during compressions then titrate after ROSC.
- Access: UVC (preferred) or IO. UVC 3.5 Fr if <1.5 kg, 5 Fr otherwise; emergency low-lying: insert 2-4 cm past skin until free blood return (current consult).

**Drugs (mg and mL for the entered weight)**
- Epinephrine IV/IO/UVC **0.01-0.03 mg/kg** of 0.1 mg/mL (0.1-0.3 mL/kg), then **3 mL NS flush regardless of weight**; q3-5 min.
- Epinephrine ETT **0.05-0.1 mg/kg** (0.5-1 mL/kg of 0.1 mg/mL) only while IV/IO is being placed.
- Volume (blood loss, no response to epi): **10-20 mL/kg** NS or O-neg PRBC, repeat if needed.
- Dextrose D10 **2 mL/kg** for low glucose (existing app value).
- Not recommended: naloxone and sodium bicarbonate during delivery-room resuscitation.

**After ROSC / ED neonate**
- Temperature 36.5-37.5 °C; glucose check; consider therapeutic hypothermia referral (≥36 wk, within 6 h).
- First doses (from the app's existing drug entries, by postnatal age): ampicillin 50 mg/kg, gentamicin 4 mg/kg (0-7 d, ≥35 wk; dosing interval note for preterm), acyclovir 20 mg/kg, PGE1 0.05-0.1 mcg/kg/min for duct-dependent lesions (apnea risk: be ready to intubate), phenobarbital 20 mg/kg for seizures.
- Stopping: if all steps done and no heart rate by about 20 min, discuss redirection of care.

## 3. Fixes to existing content (same deploy)

1. Neonatal Resuscitation consult: make cord clamping **≥60 s** everywhere (now says 30-60 s in two places; critical action already says ≥60 s). Calculator `calculator.ts:36948` too.
2. Consult FiO2: replace "21-30% for <35 wk" with the 2025 three-band rule above (two lines currently disagree).
3. Consult PPV rate 40-60 → **30-60**; PIP 20-25 → **20-30**; volume 10 → **10-20 mL/kg**; epinephrine flush 1-3 mL → **3 mL**.
4. Old `peds-ett-size` calculator: its <1 month branch (3.0 cuffed, 9-10 cm) contradicts NRP sizing; send <1 month to the neonate tool.
5. Pedi Resus Numbers: an age under 1 month currently skips the neonate screen (APLS floor 4 kg); route it to the neonate tool.

## 4. Search

"newborn ett", "2 kg neonate tube", "32 week ett depth", "neonatal epi dose", "1500 g epinephrine", "uvc size" → neonate answer card (teal) that opens the tool prefilled.

## 5. Unverified (shown with a note, or omitted)

- NRP 9th ed reportedly moves depth measurement to the gum line; not confirmed in primary text. Tool shows lip depth (Kempley) with that note until confirmed.
- Antibiotic intervals for preterm infants: show first dose only, with "interval per pharmacy/Neofax".

## Sources

1. Lee HC, Strand ML, et al. Part 5: Neonatal Resuscitation. Circulation 2025;152(16 suppl 2):S385-S423. PMID 41122887.
2. Kempley ST, Moreiras JW, Petrone FL. Endotracheal tube length for neonatal intubation. Resuscitation 2008;77:369-373.
3. NSW Royal Hospital for Women neonatal intubation guideline; Safer Care Victoria neonatal intubation guideline (sizes, blades, catheters).
4. Existing myMedKitt neonatal-resus consult and drug entries (ampicillin, gentamicin, acyclovir, alprostadil, dextrose).
