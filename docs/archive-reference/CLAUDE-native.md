# MedKitt Native

Clinical consult app for emergency medicine physicians. React Native + Expo, targeting App Store launch.

## Project Context

- **Source:** `~/Desktop/medkitt-native/`
- **GitHub:** https://github.com/kittechsix-blip/medkitt-native (private)
- **Tech Stack:** Expo SDK 54, TypeScript, Zustand, Supabase
- **Design:** Clean light theme with 3D specialty-colored cards, Iceberg UI pattern

## Content Scope

- 22 clinical consults
- 77 drugs (Pharmacy)
- 7+ calculators (Med-Calc)
- 8 critical value alerts
- 11 specialty categories

## Copyright Rules (MANDATORY)

These rules come from legal review. Do not violate them.

### What You CAN Do

- State medical facts in your own words (facts are not copyrightable)
- Synthesize knowledge from multiple sources into original expression
- Reference drug dosages, diagnostic criteria, treatment algorithms
- Create original organizational structures, decision trees, UI flows
- Build on standard-of-care protocols

### What You CANNOT Do

- Copy distinctive phrasing from EMCrit, EMRap, UpToDate, or any source
- Reproduce proprietary mnemonics or branded teaching frameworks
- Copy organizational structures wholesale from other apps/resources
- Use trademarked terms (EMCrit, EMRap, UpToDate) except in References section
- Copy images, diagrams, or visual content from any source
- Assume citation cures infringement (it does not)

### Content Test

Before writing any clinical content, ask:
1. "Can I trace this paragraph to a specific source because I can almost hear them saying it?"
2. If yes, REWRITE it in your own voice.

### Source Handling

- **Safe:** Peer-reviewed journals, clinical guidelines (ACEP, AHA), standard textbooks
- **Caution:** EMCrit, EMRap, UpToDate - learn from them, but express in your own words
- **Never copy:** Specific phrasings, unique organizational schemes, visual content

### Attribution Approach

- Include a "Sources Consulted" page listing types of resources (not specific episodes/articles)
- Cite specific studies only when referencing specific data
- Do NOT cite in a way that suggests endorsement

## Design System

- **Background:** Crisp white
- **Cards:** 3D specialty-colored with shadows, bottom border, top highlight
- **Specialty colors:** Dark, crisp (Cardiology: #C41E3A, Neuro: #2563EB, Med-Calc: #78350F)
- **Primary accent:** Forest green #3CB371

## Iceberg UI Pattern

Each screen shows minimum needed for clinical decision. Everything else is a hyperlink to a bottom sheet.

- Primary content: 1-2 sentences max
- Teal hyperlinks open stacking bottom sheets
- Option buttons: full-width, color-coded by urgency
- Navigator: horizontal module progress bar

## Key Files

- `app/(tabs)/index.tsx` - Home screen with category cards
- `app/(tabs)/med-calc.tsx` - Calculators and critical value alerts
- `app/consults/[category].tsx` - Consult list by specialty
- `app/consults/detail/[id].tsx` - Individual consult (Iceberg UI)
- `constants/Colors.ts` - Design tokens

## Commands

```bash
# Start dev server
npx expo start --ios

# Build for TestFlight
eas build --platform ios --profile preview
```

## Disclaimer

All consults must include: "NOT FDA CLEARED - Clinical decision support only"
