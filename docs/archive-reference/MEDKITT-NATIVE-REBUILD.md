# MedKitt Native — Complete Rebuild Planning Document

> **Status:** Planning Complete — Ready to Build
> **Date:** 2026-02-28
> **Project Codename:** MedKitt Native
> **Target:** App Store Launch in 2-4 Weeks

---

## 1. Executive Summary

MedKitt is being rebuilt from a vanilla TypeScript PWA into a native mobile app using React Native (Expo), with Supabase as the backend for content management. The existing PWA (22 consults, 77 drugs, 7 calculators) stays live during the rebuild.

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Platform | React Native (Expo) | App Store presence, native UX, cross-platform |
| Backend | Supabase (PostgreSQL) | Content CMS, future auth/analytics, managed infra |
| UI Framework | NativeWind + custom components | Tailwind speed + full design control for medical UI |
| Offline Strategy | Download all + background sync | Clinical reliability; entire DB is small (~5-10MB) |
| User Accounts | Not in v1 | Ship fast, validate product-market fit first |
| Monetization | Free now, monetize later | Build user base before revenue |
| Content Migration | All 22 consults | Migrate one at a time, reimagine UI for each |
| Brand | MedKitt (kept) | Strong name; internal codename: MedKitt Native |
| Design Direction | Dark + elegant (Ronas IT style) | Dark clinical surfaces with pastel specialty accents |
| Launch Timeline | 2-4 weeks | MVP with reimagined UI, all content migrated |

---

## 2. Product Vision

### What MedKitt Is

MedKitt is a clinical consult app that provides evidence-based, guided decision trees for healthcare professionals at the bedside. Unlike UpToDate (reference lookup), MDCalc (calculators), or Epocrates (drug reference), MedKitt walks clinicians through complex clinical workups step-by-step. This guided approach is genuinely unique in the market — no major competitor does it.

### Target Users (Priority Order)

1. **Trainees** (residents, medical students) — need structured guidance during unfamiliar workups
2. **Generalists** (EM docs, hospitalists) — manage a wide range of conditions, need quick refreshers
3. **Specialists reaching outside their expertise** — when a patient presents with something outside their lane

### Core Value Proposition: The Iceberg UI

Each screen shows only the essential decision point — the tip of the iceberg. Supporting detail (differentials, dosing rationale, evidence, definitions) lives behind hyperlinks. Experts fly through decisions; learners tap into depth. The information is there, but it's **pull, not push**.

### The North Star Experience

A physician running to a precipitous delivery opens MedKitt. They see the consult on their smart dashboard (recently used). They tap it. The first screen shows the critical first step with minimal text. "Common precipitants" is a teal hyperlink for those who need it. The navigator at the top shows all 5 modules. They swipe through the key decisions, tapping deeper only when needed. Three minutes later they have a mental framework. The app got out of their way.

---

## 3. Competitive Landscape

| App | Strengths | Weaknesses | MedKitt Opportunity |
|-----|-----------|------------|---------------------|
| UpToDate ($499/yr) | Gold standard content, GRADE evidence, 10,500+ topics | Terrible mobile UX, broken search, aggressive billing | Superior mobile experience at lower cost |
| MDCalc (Free/CME) | 900+ calculators, fast, clean UI, React Native built | Calculators only, no guided decision support | Decision trees + calculators together |
| Epocrates (Freemium) | Fast drug reference, offline, simple | Dated UI, ads in paid version, limited scope | Modern design, no ads, broader scope |
| Medscape (Free) | Comprehensive content | 2.8 stars, crashes, cluttered, drowning in ads | Everything Medscape fails at |

### The Gap MedKitt Owns

**No major competitor offers guided clinical decision trees.** Every competitor is a reference tool (look it up) or a calculator (compute a score). MedKitt's step-by-step consult approach is the core differentiator. The rebuild should amplify this advantage.

### Patterns to Adopt

- **From MDCalc:** Search-first home screen, specialty personalization, evidence pearls on every tool
- **From UpToDate:** Key Points panels (critical info upfront), GRADE evidence grading, smart cross-linking, breadcrumb navigation
- **From Epocrates:** Speed and simplicity. Load fast. Get out of the way.
- **From Apple Health:** Native iOS design language, smooth animations, premium feel
- **From Ronas IT / All-in-Notes:** Generous whitespace, soft rounded cards, clean typography, elegant simplicity

---

## 4. Design System: Dark Elegance

The visual direction is a **complete redesign**: the polish and elegance of Ronas IT's All-in-Notes aesthetic, adapted to a dark clinical theme with pastel specialty color coding.

### Design Principles

- **Dark-first:** Near-black backgrounds (`#0F0F1A`) for night shifts and clinical environments
- **Generous whitespace:** Nothing feels cramped. Cards breathe. Content has room.
- **Soft, rounded cards:** Large corner radius (12-16px), subtle shadows, elevated surfaces
- **Specialty color coding:** Each medical category gets its own pastel accent color on dark cards
- **Typography-driven hierarchy:** Bold weights for decisions, light weights for detail
- **Minimal chrome:** No heavy borders, no noise. Just content and decisions.

### Specialty Color Palette

| Specialty | Accent Color | Hex |
|-----------|-------------|-----|
| Cardiology | Soft Red / Rose | `#FF6B6B` |
| Neurology | Soft Blue | `#6B9FFF` |
| Pediatrics | Soft Green | `#6BFFB8` |
| Infectious Disease | Soft Yellow | `#FFD66B` |
| OB/GYN | Soft Pink | `#FF9FCF` |
| Trauma/Surgery | Soft Orange | `#FFB86B` |
| Toxicology | Soft Purple | `#B86BFF` |
| Critical Care | Teal | `#6BFFF5` |
| Orthopedics | Warm Tan | `#D4A574` |
| Pharmacy | Forest Green | `#3CB371` |
| Med-Calc | Bronze | `#B87333` |

### Core Surface Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0F0F1A` | App background |
| `--surface` | `#1A1A2E` | Card backgrounds, elevated surfaces |
| `--surface-hover` | `#252542` | Pressed/hover states |
| `--border` | `#2D2D4A` | Subtle borders and dividers |
| `--text-primary` | `#FFFFFF` | Headlines, primary text |
| `--text-secondary` | `#E8E8F0` | Body text |
| `--text-muted` | `#9A9AB0` | Labels, captions, metadata |
| `--primary` | `#3CB371` | Primary action buttons, CTAs |
| `--danger` | `#FF4757` | Critical urgency, errors |
| `--warning` | `#FFA502` | Caution, consider |
| `--info` | `#3498DB` | Informational, decision branches |

### Typography

Primary font: **Inter** (with SF Pro as iOS fallback).

| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| Screen Title | 24px | Bold (700) | Consult name, section headers |
| Card Title | 18px | SemiBold (600) | Decision question text, card headers |
| Body | 16px | Regular (400) | Clinical content, descriptions |
| Caption | 12px | Medium (500) | Labels, metadata, module names |
| Dose Highlight | 14px mono | Regular (400) | Drug dosing values (monospace, green) |
| Hyperlink | 16px | Medium (500) | Tappable depth links (teal, underlined) |

---

## 5. UX Architecture

### Smart Dashboard (Home Screen)

The home screen is a personalized smart dashboard that adapts to the user's behavior.

- **Search bar (top):** Global search across all consults, drugs, and calculators. Type anything, find it instantly.
- **Recent consults:** Horizontal scroll of 3-5 most recently used consults for quick re-access.
- **Favorites / Pinned:** User-pinned consults and drugs. Persistent across sessions (stored locally + Supabase when online).
- **Category grid:** 19 specialty categories with pastel accent colors. Scrollable below favorites.
- **What's New:** Banner when new consults or drug updates are available after a sync.

### The Iceberg UI (Consult Wizard)

Each wizard screen shows the minimum information needed to make a clinical decision. Everything else is a hyperlink away.

- **Primary content:** The question or decision point. Bold, clear, 1-2 sentences max.
- **Hyperlinks for depth:** Terms like "common precipitants," "differential diagnosis," "dosing rationale" are teal hyperlinks. Tap to open a bottom sheet with the full detail.
- **Stackable bottom sheets:** A hyperlink inside a bottom sheet opens another sheet on top. Depth goes as many layers as the content requires.
- **Option buttons:** Large, full-width, color-coded by urgency. One tap advances the tree.
- **Back navigation:** Swipe right or tap the back arrow to return to the previous decision.

### Navigator Component

A persistent horizontal progress bar at the top of the wizard showing your position in the decision tree.

- **Module labels:** Horizontal scrollable row of module names (not just dots). E.g., "Assessment" | "Risk Stratify" | "Treatment" | "Disposition"
- **Current module highlighted:** Active module uses the specialty accent color. Completed modules show a checkmark.
- **Tap to jump:** Tapping any module jumps directly to it. History is preserved for back-navigation.
- **Always visible:** Fixed at top of the wizard view. Never obstructs content.

### Smart Cross-Linking

Every entity in MedKitt is interconnected.

- **Drug links:** Tap any drug name anywhere to open its Pharmacy detail sheet with indication-aware dosing.
- **Calculator links:** Tap a score reference (e.g., "CHA₂DS₂-VASc") to open the calculator inline.
- **Cross-consult links:** A chest tube consult links to the Pneumothorax POCUS consult. Stroke links to anticoagulation.
- **Info page links:** Patient education sheets, procedure steps, differential lists all accessible via hyperlink from any context.

---

## 6. Technical Architecture

### Stack Overview

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React Native + Expo (managed) | Cross-platform native app (iOS + Android) |
| Language | TypeScript | Type safety, developer experience |
| Styling | NativeWind (Tailwind for RN) | Utility-first CSS, rapid iteration |
| Navigation | React Navigation v7 | Native-feeling tab/stack navigation |
| State | Zustand | Lightweight client state (no Redux) |
| Backend | Supabase (PostgreSQL) | Content database, future auth, storage |
| Offline | WatermelonDB or AsyncStorage | Local SQLite for offline-first content cache |
| OTA Updates | Expo Updates (EAS) | Push content + code updates without App Store review |
| Builds | EAS Build | Cloud-based iOS/Android builds (no Xcode needed) |
| Error Tracking | Sentry (when ready) | Production crash/error monitoring |
| Analytics | PostHog (when ready) | Anonymous usage analytics |
| Payments | Stripe (when ready) | Subscriptions when monetizing |

### Why These Choices

- **Expo over bare RN:** EAS Build handles iOS/Android compilation in the cloud. No Xcode, no Android Studio, no manual signing. Push to deploy.
- **Supabase over AWS:** Content CMS: add consults from a dashboard/script, app pulls them down. Managed Postgres, no server management.
- **NativeWind over component libraries:** Custom components give full control over the dark medical aesthetic. No fighting library defaults.
- **Zustand over Redux:** Minimal, fast, handles everything MedKitt needs (current consult, navigation state, favorites).
- **No auth in v1:** Don't build auth for a product nobody has validated. Ship first, add Supabase Auth later.

### Supabase Schema (Core Tables)

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| `categories` | id, name, icon_url, accent_color, sort_order | 19 specialty categories + tool categories |
| `consults` | id, title, subtitle, category_ids[], version, entry_node_id, citations[] | Consult metadata and references |
| `nodes` | id, consult_id, type, module, title, body, options[], next, treatment | Decision tree nodes (the clinical content) |
| `drugs` | id, name, category, indications[], dosing[], weight_calc, image_url | Pharmacy: 77+ drugs with indication-aware dosing |
| `calculators` | id, name, fields[], thresholds[], compute_fn | Med-Calc: scoring tools and formula calculators |
| `info_pages` | id, title, sections[], shareable, consult_id | Reference modals, patient education, procedure steps |

### Offline-First Architecture

All clinical content downloads to the device on first launch and syncs in the background.

1. **First Launch:** App downloads all consults, drugs, calculators, and info pages from Supabase to local storage.
2. **Offline Use:** All reads come from local storage. The app is 100% functional with no network.
3. **Background Sync:** When the app detects connectivity, it checks for updated/new content and pulls changes.
4. **Version Tracking:** Each content record has a `version` field. Sync only pulls records with newer versions.
5. **Total Payload:** Even at 1,000 consults, the content database is estimated at 5-10MB. Fast to download, trivial to store.

---

## 7. Content Authoring Workflow

New consults are authored using the same AI-assisted workflow you use today, but stored in Supabase instead of hardcoded files.

### The Authoring Pipeline

1. **Source Content:** Andy provides clinical guidelines, protocols, or journal articles to Claude Code.
2. **AI-Assisted Tree Building:** Claude Code generates the decision tree node structure (same collaborative process as today).
3. **Data Validation:** The generated tree is validated against the schema (node types, required fields, cross-links).
4. **Push to Supabase:** A CLI script pushes the validated consult data to Supabase.
5. **App Sync:** The next time any user's app syncs, the new consult appears automatically. No App Store review needed.

### Content Update Strategy

- **Clinical content updates:** Push to Supabase. App picks them up on next sync. No redeployment.
- **App code updates:** Use Expo OTA (EAS Updates) for bug fixes and UI tweaks. No App Store review.
- **Major app updates:** Full EAS Build + App Store submission for new features or native module changes.

---

## 8. Content Migration Plan

All 22 existing consults, 77 drugs, 7 calculators, and info pages will be migrated. Each consult is migrated one at a time, reimagined with the new Iceberg UI approach.

### Migration Priority

1. **A-Fib RVR** (Cardiology) — Complex tree, good test of the Iceberg UI. 20 nodes, 6 modules, 10 citations.
2. **Neurosyphilis** (Infectious Disease) — The original flagship. 42 nodes, 6 modules, 17 citations.
3. **PE Treatment** (Critical Care) — 29 nodes, 5 modules. Tests multi-pathway branching.
4. **Precipitous Delivery** (OB/GYN) — 20 nodes, 5 modules, 6 images. Tests image-heavy consults.
5. **Fever < 6 Months** (Pediatrics) — 37 nodes, 5 modules. Tests the largest consult.
6. **Remaining 17 consults** — Migrated in batches after the first 5 validate the pattern.

### Migration Process Per Consult

1. **Extract:** Pull the existing TypeScript node data from the PWA codebase.
2. **Reimagine:** Apply the Iceberg UI pattern — strip detail from primary screens, convert to hyperlinks.
3. **Transform:** Convert to the new Supabase schema format (JSON).
4. **Cross-Link:** Verify all drug links, calculator links, cross-consult links, and info page links work.
5. **Push:** Upload to Supabase.
6. **Test:** Verify the consult renders correctly in the native app, all paths work, offline works.

---

## 9. Build Phases (2-4 Week Roadmap)

### Week 1: Foundation + Core Experience

**Goal:** Working app with one complete consult and the core navigation experience.

- Day 1-2: Project scaffolding (Expo init, NativeWind setup, React Navigation, Zustand, Supabase client)
- Day 2-3: Design system implementation (dark theme tokens, card components, typography, specialty colors)
- Day 3-4: Smart Dashboard (home screen with search, recents placeholder, category grid)
- Day 4-5: Consult Wizard v1 (Iceberg UI, hyperlink bottom sheets, option buttons, back navigation)
- Day 5-6: Navigator component (horizontal module progress bar with tap-to-jump)
- Day 6-7: First consult migration (A-Fib RVR — reimagined with Iceberg UI)

### Week 2: Features + Content

**Goal:** Pharmacy, calculators, cross-linking, and 5+ consults migrated.

- Day 8-9: Pharmacy module (drug reference bottom sheets with indication-aware dosing, weight calculator)
- Day 9-10: Med-Calc module (calculator bottom sheets with real-time scoring)
- Day 10-11: Smart cross-linking engine (drug links, calculator links, cross-consult links, info pages)
- Day 11-12: Global search (across consults, drugs, calculators)
- Day 12-14: Migrate consults 2-5 (Neurosyphilis, PE Treatment, Precipitous Delivery, Peds Fever)

### Week 3: Data Layer + Remaining Content

**Goal:** Supabase integration, offline sync, all 22 consults migrated.

- Day 15-16: Supabase schema setup (tables, seed data from migrated consults)
- Day 16-17: Offline-first data layer (local cache, background sync, version tracking)
- Day 17-18: Favorites / bookmarks (pin consults and drugs, persisted locally)
- Day 18-21: Migrate remaining 17 consults in batches (reimagine each with Iceberg UI)

### Week 4: Polish + Ship

**Goal:** App Store submission with a polished, complete product.

- Day 22-23: Animation and transitions (smooth bottom sheets, card transitions, navigator animations)
- Day 23-24: Accessibility pass (VoiceOver, Dynamic Type, color contrast verification)
- Day 24-25: Legal/compliance (FDA disclaimer, privacy policy, terms of use, App Store medical app requirements)
- Day 25-26: Testing (all 22 consults end-to-end, offline mode, multiple devices)
- Day 26-27: EAS Build (iOS + Android), TestFlight beta, bug fixes
- Day 28: App Store submission

---

## 10. What NOT to Build

Know what not to build. These features are explicitly deferred.

| Feature | Status | When to Add |
|---------|--------|-------------|
| User authentication | Deferred | After product-market fit validated (use Supabase Auth) |
| Payment system | Deferred | After user base established (use Stripe, never build your own) |
| Custom analytics | Deferred | After launch (use PostHog for anonymous analytics) |
| Error monitoring | Deferred | Add Sentry after first 100 users |
| Push notifications | Deferred | After user accounts exist |
| Admin web dashboard | Deferred | CLI scripts for content management in v1 |
| AI conversational layer | Deferred | Explore after core product is solid |
| EHR integration | Deferred | Institutional feature for later growth phase |
| Social features | Not planned | MedKitt is a clinical tool, not a social platform |
| Custom search engine | Never | Use built-in search / Supabase full-text search |
| Custom auth system | Never | Always use Supabase Auth when ready |
| Custom payment system | Never | Always use Stripe when ready |

---

## 11. App Store Considerations

### Apple App Store (Medical Apps)

- **Medical disclaimer required:** The app must clearly state it is not a substitute for clinical judgment. MedKitt already has a 3-layer disclaimer system — port it.
- **Privacy policy required:** Must be accessible from within the app and on the App Store listing.
- **No patient data collection:** MedKitt stores no patient data. This simplifies HIPAA/privacy requirements significantly.
- **Content accuracy:** Apple may review medical content claims. All MedKitt content is evidence-based with citations.
- **App Review timing:** First submission typically takes 24-48 hours. Medical apps may get additional scrutiny.

### Google Play Store

- Similar requirements to Apple but generally faster review process.
- Health Connect integration is optional but may be relevant for future features.
- Target API level requirements must be met (currently API 34+).

---

## 12. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| 2-4 week timeline is aggressive for 22 consult migrations | High | Medium | Launch with 5-10 consults. Add remaining via OTA updates post-launch. |
| React Native learning curve (first RN project) | Medium | Medium | Expo reduces complexity. NativeWind is familiar (Tailwind). Start with simple screens. |
| Offline sync complexity | Medium | High | Use AsyncStorage for v1 (simpler). Upgrade to WatermelonDB if performance requires it. |
| App Store rejection (medical content) | Low | High | Clear disclaimers, evidence citations, no diagnostic claims. Follow Apple guidelines. |
| Supabase schema changes during migration | Medium | Low | Schema is flexible (JSON columns for node options/treatments). Iterate as needed. |
| Design system implementation time | Medium | Medium | Build 5 core components first (Card, Button, BottomSheet, Navigator, SearchBar). Everything else composes from these. |

---

## 13. Success Metrics

### Launch Criteria (v1.0)

- App available on iOS App Store (Android can follow)
- All 22 consults migrated with Iceberg UI
- 77 drugs in Pharmacy with indication-aware dosing
- 7 calculators functional
- Global search working across all content
- Favorites/bookmarks functional
- Full offline capability
- Smart dashboard with recents and category grid

### Post-Launch Metrics to Track

- App Store downloads and ratings
- Which consults are most opened (once analytics added)
- Which hyperlinks are most tapped (measures Iceberg UI effectiveness)
- Session duration (are users finding answers quickly?)
- Retention (do users come back?)

---

## 14. Immediate Next Steps

1. Share this document with your developer for feedback on the technical architecture.
2. Set up the Expo project: `npx create-expo-app medkitt-native --template tabs`
3. Install core dependencies: NativeWind, React Navigation, Zustand, Supabase JS client
4. Create the Supabase project and define the initial schema
5. Build the design system: dark theme tokens, 5 core components
6. Migrate the first consult (A-Fib RVR) with the Iceberg UI pattern
7. Test on a physical iPhone to validate the experience

---

## Current MedKitt PWA (Reference)

### What Exists Today

- **Live:** https://kittechsix-blip.github.io/medkitt/
- **Repo:** https://github.com/kittechsix-blip/medkitt
- **Version:** v1.29
- **Tech:** Vanilla TypeScript, CSS custom properties, Service Worker, LocalStorage, GitHub Pages
- **Content:** 22 consults, 77 drugs, 7 calculators, 19 categories
- **Source:** ~2,600 lines TypeScript + ~850 lines CSS
- **Deploy size:** 176KB total

### Consults to Migrate

1. Neurosyphilis (ID) — 42 nodes, 6 modules
2. Pneumothorax POCUS (U/S) — 13 nodes, 4 modules
3. PE Treatment (CC/EM) — 29 nodes, 5 modules
4. Basic Echo Views (U/S) — 8 nodes, 6 modules
5. Priapism Treatment (Procedures/Urology) — 44 nodes, 7 modules
6. A-Fib RVR (Cardiology) — 20 nodes, 6 modules
7. Chest Tube (Trauma/Procedures) — 40 nodes, 4 modules
8. Post Exposure Prophylaxis (ID/EM) — 15 nodes, 4 modules
9. Acute Ischemic Stroke (Neuro/EM) — 20 nodes, 5 modules
10. NSTEMI Management (Cardiology/EM) — 17 nodes, 5 modules
11. Potassium Disorders (Nephro/EM) — 24 nodes, 6 modules
12. Croup (Peds) — 13 nodes, 4 modules
13. UTI First Febrile/Neonatal (Peds/EM) — 28 nodes, 5 modules
14. Fever < 6 Months (Peds/EM) — 37 nodes, 5 modules
15. Bronchiolitis (Peds/EM) — 19 nodes, 4 modules
16. Echo-EPSS (U/S) — 10 nodes, 5 modules
17. Precipitous Delivery (OB/GYN) — 20 nodes, 5 modules
18. Shoulder Dystocia (OB/GYN) — 11 nodes, 5 modules
19. Neonatal Resuscitation NRP (Peds/EM) — 27 nodes, 6 modules
20. Distal Radius Fracture Reduction (Ortho) — 17 nodes, 5 modules
21. Splint Recommendations Adults (Ortho) — 16 nodes, 5 modules
22. Sodium Disorders (Nephro/EM) — 28 nodes, 6 modules

### Data Model (Current — Reference for Migration)

```typescript
interface DecisionNode {
  id: string;
  type: 'question' | 'info' | 'result' | 'input';
  module: number;
  title: string;
  body: string;
  citation?: number[];
  options?: NodeOption[];
  next?: string;
  recommendation?: string;
  treatment?: TreatmentRegimen;
  confidence?: 'definitive' | 'recommended' | 'consider';
}

interface NodeOption {
  label: string;
  description?: string;
  next: string;
  urgency?: 'routine' | 'urgent' | 'critical';
}

interface TreatmentRegimen {
  firstLine: DrugRegimen;
  alternative?: DrugRegimen;
  pcnAllergy?: DrugRegimen;
  monitoring: string;
}

interface DrugRegimen {
  drug: string;
  dose: string;
  route: string;
  frequency: string;
  duration: string;
  notes?: string;
}
```

---

*MedKitt Native — Built for clinicians, by a clinician.*
