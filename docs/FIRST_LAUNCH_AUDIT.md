# First Launch Audit

Date: 2026-10-20
Repository: `Harshrana007/ascendia-android-demo`
Branch: `main`

## Findings before remediation
- `app/index.tsx` routed to Home only when shared SQLite state contained a saved profile; otherwise it routed to Welcome.
- Onboarding prefilled `Astra`, preselected starter quests and did not require explicit class/presentation choices.
- Welcome used a basic fade/rise without the committed hunter portrait or Skip Intro.
- `app.json` lacked explicit launcher icon, adaptive foreground and splash image paths.
- The provider refreshed data after writes but did not specifically refresh the shared snapshot when Android resumed.

## Source changes
- Callsign now begins blank and uses a shared helper at onboarding, Profile and repository write boundaries. The rule requires at least two characters to preserve the current SQLite constraint and caps at 32 Unicode code points.
- Starter quests default to none and can be opted into. Existing onboarding persistence begins at Rank E, level 1, zero XP and zero attribute XP and does not create fake completions or rewards.
- Class and presentation are explicit required choices.
- Welcome uses the existing hunter concept, crest, finite Reanimated reveal, Skip Intro and reduced-motion handling.
- Native splash is configured separately and hides after database initialization reaches ready or error state.

## Expected transitions
Fresh install -> native splash -> local initialization -> welcome -> onboarding -> SQLite profile and only accepted quest records -> Home.
Returning launch -> splash -> database hydration -> tabs without replaying welcome.
Confirmed reset -> existing reset clears local profile/gameplay -> Welcome.

## Verification
Source/config changes committed. Android first-launch, resume, restart, reset, keyboard, splash, icon and screenshot tests have NOT been run in this environment.
