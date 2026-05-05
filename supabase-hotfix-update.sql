-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-05
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: fti-felon-drainage (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":3,"title":"Felon - Bedside I&D Technique","body":"**Anesthesia:** digital block with **[Lidocaine](#/drug/lidocaine/digital-block)** 1% plain (no epi), 1-2 mL each side at the base of the digit. Allow 5-10 min. Penrose tourniquet at the base for hemostasis.\n\n**Choose the incision based on abscess location:**\n\n**1. Volar longitudinal (preferred for superficial midline pus):**\n- Single midline incision over the point of maximal fluctuance, NOT crossing the DIP flexion crease.\n- Spread with a small hemostat, breaking septa to ensure complete drainage.\n\n**2. Unilateral lateral (preferred for deeper or off-midline pus):**\n- Single longitudinal incision 0.5 cm distal to the DIP crease, parallel to the nail plate, on the **non-pinch side** (ulnar side of thumb/index, radial side of small).\n- Stay dorsal to the digital neurovascular bundle.\n- Extend from lateral nail fold toward the tip; break ALL septa with a hemostat.\n\n**Avoid:**\n- Fishmouth (transverse through-and-through) incision - causes pulp necrosis, unstable pad.\n- Hockey-stick or J-incision - injures the digital nerve.\n- Crossing the DIP crease - flexion contracture.\n\n**After drainage:**\n- Loose iodoform gauze wick, remove at 24-48 h.\n- **[Cephalexin](#/drug/cephalexin/skin)** 500 mg QID x 7-10 days (or **[TMP-SMX](#/drug/tmp-smx/skin)** DS BID if MRSA risk).\n- Warm soaks TID starting day 2; elevate.\n- Hand follow-up at 48-72 h. Get plain film if pain persists past 1 week (osteomyelitis). [2,5]","citation":[2,5],"next":"fti-disposition-outpatient","images":[{"src":"images/fingertip-infections/felon.jpg","alt":"Felon of the thumb with infection in the distal pulp space","caption":"Felon / pulp-space infection of the thumb. James Heilman, MD, CC BY-SA 3.0, Wikimedia Commons."}]}'::jsonb
WHERE id = 'fti-felon-drainage' AND tree_id = 'fingertip-infections';

COMMIT;