# Ascendia Android Demo

Ascendia turns real-world discipline into an original anime-fantasy rank progression experience. Cosmic Horizon combines cinematic celestial environments, a distinct hunter identity, luminous blue and violet light, and fast everyday habit interactions.

## Current stage

- Step 1 established Expo SDK 57, React Native, strict TypeScript and five-destination Expo Router navigation.
- Step 2 adds centralized Cosmic Horizon design tokens, reusable visual primitives and two original compact WebP assets.
- Screen routes remain foundation placeholders. The full five-screen UI and local quest/progression engine are not implemented yet.

## Requirements and commands

- Node.js 22.13 or newer.
- npm, Android Studio and Android SDK, plus an emulator or physical device for Android launch testing.
- Java/JDK compatible with the Expo-generated Android Gradle Plugin for native builds.

Run in a network-enabled development environment:

```sh
npm install
npm run start
npm run android
npm run typecheck
npm run lint
npm test
npm run expo:check
npm run doctor
```

There was no existing package manager or lockfile. Generate and commit `package-lock.json` via `npm install`. This session has not run the listed checks successfully.

## Visual system

Theme tokens are under `src/theme/`. Reusable components are under `src/components/visual/`. Original SVG icons live under `src/components/icons/`. The current bundled art is compact demo material and must be replaced with high-resolution approved assets before production.

No custom font binaries are bundled. The theme uses centralized system serif, sans-serif and monospace fallbacks.

## Product boundaries

No inventory, loot, equippable gear, equipment statistics, combat, backend, login, cloud sync, AI service, social system or subscription is part of this demo. Sample Home progress is visibly marked preview-only, not saved player data.

See `AGENTS.md`, `ASCENDIA_DEMO_BUILD_STEPS.md`, and `docs/` for rules, asset provenance and validation limitations.
