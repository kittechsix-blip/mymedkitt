# Image slots — Resuscitative Thoracotomy

Drop a photo into this `images/` folder with the exact filename below and it auto-lights its card
(no code change needed — `IMG_BY_INDEX` in `index.html` already maps every slot). Missing files show a
labeled camera placeholder. Recommended ~4:3, ≤500 KB.

| Slide | Filename | Status | What goes here |
|------|----------|--------|----------------|
| Prep | `rt-00-tray.png` | ✅ FILLED | ED thoracotomy tray laid out |
| Step 1 · Position | `rt-01-position.png` | ✅ FILLED | Supine, ET tube, left arm up |
| Step 2 · Incision | `rt-02-incision.png` | ✅ FILLED | Left anterolateral incision, 4th/5th ICS, sternum → posterior axillary line |
| Step 3 · Intercostals | `rt-03-intercostals.png` | ✅ FILLED | Mayo scissors cutting muscle along the top of the rib |
| Step 4 · Retractor | `rt-04-retractor.png` | ✅ FILLED | Rib spreader in, handle/ratchet bar facing downward |
| Step 5 · Clamshell | `rt-05-clamshell.png` | ✅ FILLED | Finochietto rib spreader in place (hand-crank/long bar lateral) |
| Step 6 · Pericardium | `rt-06-pericardium.png` + `rt-06-pericardium-2.png` | ✅ FILLED (pair) | Pericardiotomy illustration + phrenic-nerve illustration, shown side-by-side |
| Step 7 · Tamponade | `rt-07-deliver-heart.jpg` | needed | Pericardium folded back, clot evacuated, heart delivered |
| Step 8 · Massage | `rt-08-massage.jpg` | needed | Two flat palms compressing the heart |
| Step 9 · Cross-clamp | `rt-09-crossclamp.png` | ✅ FILLED | Blunt-dissect fascia, aortic clamp on the descending aorta |
| Step 10 · Defib | `rt-10-defib.png` | ✅ FILLED | Internal paddles on the open heart |
| Step 11 · To the OR | `rt-11-to-or.jpg` | needed | Hilar clamp / packaging for the OR |

**Still needed (3):** `rt-07-deliver-heart`, `rt-08-massage`, `rt-11-to-or` (placeholders show until added; either `.jpg` or `.png` works — match the `IMG_BY_INDEX` entry in `index.html`).

Tool images:
- `rt-heart-repair.png` — ✅ FILLED — photo in the **Heart Repair** tool (L/RV exposed heart).
- `rt-anatomy.png` — ✅ FILLED — posterior-mediastinum + aortic cross-clamp diagram in the **Anatomy** tool.
- `rt-hilum-clamp.png` — ✅ FILLED — vascular clamp across the hilum (**Hilum** tool).
- `rt-hilar-twist.png` — ✅ FILLED — lung rotated 180° (**Hilum** tool).
- `rt-share-qr.png` — optional QR for https://resus-thoracotomy.vercel.app (Share tool hides it until present).

Original source images for everything used are archived in `images/source/`.

A card can hold two side-by-side photos: in `index.html`, set the slot in `IMG_BY_INDEX` to an array, e.g.
`6:['rt-06-pericardium.jpg','rt-06-pericardium-2.jpg']`.

> Leftover chest-tube `.jpg/.png` files from the clone are unused (the thoracotomy slots all use the `rt-`
> prefix) and can be deleted at cleanup/deploy time.
