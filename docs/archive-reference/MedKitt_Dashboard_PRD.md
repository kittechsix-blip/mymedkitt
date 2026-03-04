# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 1. Introduction
### 1.1 Project Name
MedKitt (Medical App)

### 1.2 Purpose
This document specifies the Product Requirements (PRD) for building the primary application navigation dashboard for the MedKitt iOS native application.

### 1.3 Vision
To create a "medically very knowledgeable but highly intuitive" user experience, where the UX is the primary selling point of the app. The primary screen must feel "simplistic, beautiful," professional, and engineered for rapid knowledge retrieval for medical professionals in high-stakes environments (Emergency Medicine, Generalists).

## 2. Branding Assets (Visual Reference)
- **Definitive Logo (Master Mark):** A polished gunmetal Gladstone doctor's bag with a custom Burnt Umber metallic base and an integrated interlocking 'MK' monogram. (Use the provided logo asset `logo.png` uploaded in the chat).
- **Visual Dashboard Reference:** The primary specification for the main screen layout, colors, and 3D textures against a Pearl Crisp White background.
- **Clean Layout Template:** An isolated schematic of the 3D card geometry, material finish, and colors, stripped of dynamic labels and icons. (Use the provided 3D medical icon sheet `icons.png` uploaded in the chat for category icons).

## 3. User Experience (UX) Specification
### 3.1 Device
Apple iPhone Pro (iOS Native UI).

### 3.2 Main Screen Structure
The screen is composed of four (4) core sections, operating in 'Pearl Crisp White Mode' (background color: `#FFFFFF` / Absolute White):
1. **Top Header (Static Branding):** Centered branding.
2. **Main Content (Dynamic Scroller):** The vertical list of 3D Consultation Cards.
3. **Bottom Navigation (Static, Fixed):** Global shortcuts.
4. **Ad Category (Dynamic):** A specific card embedded in the list for ads.

## 4. UI Component Technical Specifications
### 4.1 Global Aesthetic: '3D Tactile Rolodex'
- **Background:** Pearl Crisp White (`#FFFFFF`). No background images or gradients.
- **Key Material:** Highly polished, glossy deep colors with tactile 3D depth. Lighting must be clean and frontal, creating soft shadows and specular highlights. The entire main list should behave like a physical Rolodex, layered slightly.

### 4.2 Top Header (Static)
**Composition:**
- Centered `UIImageView` containing the Definitive Logo (the gunmetal MK bag with Burnt Umber base - use the uploaded `logo.png` asset).
- Below the logo, a centered `UILabel`:
  - **Text:** "MedKitt"
  - **Font:** System Sans-Serif, modern, elegant (e.g., SF Pro Display, Medium weight).
  - **Color:** Dark Gray (`#555555`).

### 4.3 Main Content: 3D Consultation Cards (Dynamic)
**Implementation:** A `UITableView`, `UICollectionView`, or SwiftUI `ScrollView/LazyVStack` optimized for smooth performance and vertical scrolling. The view must emulate a 'Rolodex effect' with 3D layering and slight perspective as cards move out of view.

### 4.4 3D Card (The 'Consultation Cell')
**Component Structure:**
- **CardBody:** A horizontal view with significant 3D depth, glossy sheen, and slight layering. The card background must be the specific deep color (defined per category).
- **CardContent (Horizontal Stack):**
  - **Left - Icon (Dynamic):** A small, high-quality, minimalistic 3D icon representing the category (extracted from the uploaded `icons.png` sheet).
  - **Center - CategoryLabel (Dynamic):**
    - Text: Category Name (e.g., "CARDIOLOGY").
    - Font: System Sans-Serif, Bold.
    - Color: White (`#FFFFFF`).
  - **BottomBanner (Dynamic):**
    - A subtle banner integrated into the lower card body.
    - TextLabel: "XX CONSULTS" (where XX is the dynamic number of consultations).
    - Font: System Sans-Serif, Small.
    - Color: White (`#FFFFFF`).

### 4.5 Category Specifics (Example List)
All cards must use deep, glossy colors with 3D depth. Categories should include: Anesthesia/Airway, Cardiology, Critical Care, Emergency Medicine, Gastroenterology, Heme/Onc, Infectious Disease, Nephro/Rheum/Endo, Neurology, OB-Gyn, Ortho, Pediatrics, Procedures, Toxicology, Trauma/Surgery, Ultrasound/Radiology, Urology, Ophthalmology.

*Examples:*
- **Cardiology:**
  - Color: Deep Crimson Red (`#990000`).
  - Icon: Anatomical 3D Heart.
- **Anesthesia/Airway:**
  - Color: Deep Sapphire Blue (`#003366`).
  - Icon: 3D Endotracheal Tube.
- **Critical Care:**
  - Color: Deep Velvet Purple (`#4C0099`).
  - Icon: 3D ICU Monitor.
- **Emergency Medicine:**
  - Color: Deep Earthy Orange-Red (`#CC5500`, referencing the Burnt Umber of the logo base).
  - Icon: 3D Star of Life.

### 4.6 Bottom Navigation Bar (Fixed)
**Composition:**
- A fixed horizontal bar at the screen bottom (`#FFFFFF` background).
- Contains three centered, evenly spaced 3D icons (clean wireframe templates):
  1. **Left (Home):** Stylized Clinic/Building icon.
  2. **Center (Pharmacy):** Mortar and Pestle icon.
  3. **Right (Med-Calc):** Calculator icon with Sigma sign.

### 4.7 Ad Category (Dynamic)
**Implementation:** An AdCell (Card) that is dynamically inserted into the list.
- **Design:** Must possess the same deep color, glossy depth, and 3D properties as the Consultation Cards.
- **Content:**
  - Text: Clearly labeled as "AD."
  - Color: Distinct from consultation categories (e.g., a neutral deep gray or a color determined by the ad provider).
  - Icon: Appropriate to the advertisement content.

## 5. Interaction Specification
### 5.1 Scrolling (The 'Rolodex' Effect)
- **Behavior:** Smooth vertical scrolling. As cards approach the top of the viewport, they must subtly overlay/layer on top of each other and slightly compress (reduce perspective angle), mimicking a physical Rolodex. As cards move down, they must expand. This effect must prioritize speed and responsiveness.

### 5.2 Card Action
- **Behavior:** When a Consultation Card is tapped, the app must navigate (push) the view to the consultations pathway for that specific category. The card must have a brief 'pressed' 3D animation effect.

### 5.3 Bottom Navigation Actions
- **Home:** Navigates back to the main navigation screen.
- **Pharmacy:** Opens the Pharmacy reference module.
- **Med-Calc:** Opens the medical calculator module.
