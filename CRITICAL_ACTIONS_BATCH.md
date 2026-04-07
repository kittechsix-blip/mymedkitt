# CRITICAL_ACTIONS Batch Implementation Plan

## Files to Update (21 total)

1. human-trafficking.ts
2. peds-trauma.ts
3. hiv.ts
4. refractory-vfvt.ts
5. trach-emergency.ts
6. shoulder-dystocia.ts
7. urinary-retention.ts
8. diarrhea.ts
9. echo-epss.ts
10. ciguatera.ts
11. precip-delivery.ts
12. vp-shunt.ts
13. adrenal-insufficiency.ts
14. guillain-barre.ts
15. button-battery.ts
16. splinting.ts
17. hop-killers.ts
18. push-dose-pressors.ts
19. first-trimester.ts
20. laryngeal-trauma.ts
21. torsades-de-pointes.ts

## Critical Actions Format

For each file, add BEFORE the NODES export:

```typescript
export const [TREE_NAME]_CRITICAL_ACTIONS = [
  { text: 'Action description', nodeId: 'node-id' },
  // ... 5-10 actions total
];
```

## Critical Actions Identified

### human-trafficking.ts
- Separate patient from companion
- Screen using VERA tool
- Call National Hotline 1-888-373-7888
- Activate social work and hospital trafficking team
- Do NOT release minor to suspected trafficker
- Document thoroughly with patient's own words

### peds-trauma.ts
- Obtain weight (Broselow tape)
- 20 mL/kg NS/LR bolus if unstable
- Intubate if GCS ≤8
- Activate MTP if hemorrhage
- CT head for moderate-severe TBI
- CPS reporting for NAT
- Transfer to pediatric trauma center

### hiv.ts
- Check CD4 and viral load
- Screen for OIs if CD4 <200
- Do NOT stop HAART without specialist
- TMP-SMX prophylaxis if CD4 <200
- PJP treatment: TMP-SMX + prednisone
- Start ART same-day for new diagnosis
- PEP within 72 hours

### refractory-vfvt.ts
- Change pad position to AP after 3 shocks
- Double sequential defibrillation
- Amiodarone 300 mg IV or lidocaine
- Esmolol 500 mcg/kg if refractory
- Activate ECPR if criteria met
- Treat H's and T's

### trach-emergency.ts
- Apply O2 to both face AND stoma
- Remove inner cannula first
- Deflate cuff if obstruction
- Do NOT blind replace fresh trach
- Hyperinflate cuff for TIF bleeding
- Oral intubation for fresh trach dislodgement

### shoulder-dystocia.ts
- Call for help - announce "shoulder dystocia"
- McRoberts + suprapubic pressure
- Wood's screw maneuver
- Deliver posterior arm
- Zavanelli + emergency C-section
- No excessive traction

### urinary-retention.ts
- Bladder scan to confirm >300 mL
- Coude catheter for BPH
- Start tamsulosin immediately
- Urology consult if failed attempts
- Monitor for post-obstructive diuresis
- Replace 50-75% of urine output

### diarrhea.ts
- IV rehydration 20 mL/kg bolus
- Stool culture if bloody or febrile
- C. diff testing if recent antibiotics
- Do NOT give antibiotics if STEC suspected
- Oral vancomycin for C. diff
- Ciprofloxacin for traveler's diarrhea

## Implementation Script

For each file:
1. Read the tree nodes
2. Identify 5-10 critical clinical actions
3. Map to specific nodeIds
4. Add CRITICAL_ACTIONS export before NODES
5. Update tree-service.ts loader

## Next Steps

Execute batch edits on all 21 files, then update tree-service.ts.
