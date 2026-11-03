# Image Manifest

Drop each photo into this `images/` folder using the **exact filename** below, then make the one-line swap in `index.html` (find the matching step in the `STEPS` array and replace its `<div class="photo">…</div>` placeholder).

> I couldn't save the photos you pasted in chat — they exist only in our conversation, not as files I can reach. Re-attach them here or save them manually with these names and everything lines up.

| In-app label (`.ph-tag`) | Save as filename | Step | Your photo |
|--------------------------|------------------|------|------------|
| Equipment tray + Pleur-Evac | `00-equipment.jpg` | Before you start | *(optional — lay-out shot)* |
| Triangle of Safety | `02-triangle-of-safety.jpg` | Step 2 · Locate | Triangle of Safety diagram |
| Sectional view — needle | `03-anesthetize.jpg` | Step 3 · Anesthetize | 4-panel illustration, panel 2 (needle infiltrating) |
| PHOTO 1 — patient, arm behind head | `01-position.jpg` | Step 1 · Position | Cartoon: supine, arm up, chest tube |
| PHOTO 2 — incision | `04-incision.jpg` | Step 4 · The cut | 4-panel illustration, panel 1 (transverse incision marked) |
| PHOTO 3 — Kelly spreading | `05-blunt-dissection.jpg` | Step 5 · Blunt dissection | Clinical photo a/b: Kelly opening the skin track |
| Finger sweep illustration | `06-finger-sweep.jpg` | Step 6 · Poke + sweep | "Finger sweep below diaphragm" drawing |
| PHOTO 4 — tube on Kelly | `07-tube-insertion.jpg` | Step 7 · The tube | Sectional drawing: tube clamped on Kelly through interspace |
| Tube + connector / fogging | `08-confirm.jpg` | Step 8 · Confirm | *(optional)* |
| PHOTO 5 — suture / drain stitch | `09-secure.jpg` | Step 9 · Secure | "Ends wrapped around tube, tightly tied" drawing |
| PHOTO 6 — tape job | `10-dress.jpg` | Step 10 · Dress | Mesentery tape photo + final taped tube |
| CXR + marked Pleur-Evac | `11-confirm-document.jpg` | Step 11 · Confirm & document | *(optional — CXR / Atrium unit)* |

## Toolbar images (optional)
| Tool | Save as | Your photo |
|------|---------|------------|
| Drainage & Pleur-Evac | `tool-drainage-diagram.jpg` | 3-bottle setup / chamber diagram / Atrium Express |

## The one-line swap

In `index.html`, each step object has a placeholder. To use a real image, replace the generated photo block. The simplest route: search the `photoHTML` function and change it so that when a step has an `img` field it renders `<img src="images/…">`. Or hand-edit per step. Example for Step 1:

```html
<!-- was the grey placeholder; becomes: -->
<div class="photo"><img src="images/01-position.jpg" alt="Patient positioned, arm behind head"></div>
```

Tell me to wire this up and I'll patch `index.html` to auto-load every file above once you've dropped them in.
