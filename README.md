# Ascendia Android Demo

Ascendia turns real-world discipline into an original anime-fantasy progression experience. Cosmic Horizon combines dark celestial environments, hunter identity, luminous cyan/violet accents and fast quest interactions.

## Current implementation

- Welcome and four-step onboarding.
- Five destinations: Home, Quests, Player, Adventures and Profile.
- SQLite persistence for profile, progression, six attributes, quest revisions, occurrences, measured progress, completions, rewards, preferences, streaks and achievements.
- Quest create/edit/archive, filters, direct completion and numeric progress.
- Transaction-protected XP awards with occurrence-level duplicate prevention.
- Historical correction within 48 hours using a compensating reward reversal.
- Local loading/error state and confirmed reset.

## Important limitations

The level curve is a provisional 1,000 XP per level. Rank promotion is disabled until approved level and consistency thresholds are defined. Streak/grace/penalty semantics are provisional. High-resolution rank character art and dedicated backgrounds remain incomplete. This is local-only: no backend, account, cloud sync, AI, social features, subscriptions, inventory, gear or combat.

## Development

Prerequisites: Node.js compatible with Expo SDK 57, npm, Android Studio/SDK, and an Android emulator or physical device. The previous audit machine reported Node.js 22.16.

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

Run these in a network-enabled workspace and generate a lockfile only after dependency resolution succeeds. These checks were not run in the current session.

## Local data

The database is `ascendia.db` in app-private storage. Normal restarts preserve data. Profile has a confirmed local reset. There is no cloud backup; Android data clearing or uninstall may remove local records.

## Key modules

- `src/database/database.ts`: SQLite open, schema migration and reset.
- `src/database/ascendiaRepository.ts`: quest lifecycle, occurrences, rewards, corrections and streak reconciliation.
- `src/game/progression/rules.ts`: XP, level and rank policy.
- `src/game/streaks/policy.ts`: scheduled-day grace/miss decision.
- `src/state/DemoStateProvider.tsx`: shared database-backed state and serialized writes.

See `AGENTS.md`, `ASCENDIA_DEMO_BUILD_STEPS.md` and `docs/` for product rules and validation gaps.

## First-run guest identity

A fresh local database opens the branded welcome screen and asks the player to choose a callsign, class and presentation. The callsign is a local display label, not a unique account. The profile is created through the existing SQLite repository only after validation succeeds. Starter quests are opt-in and begin with no completion history, reward ledger entries, XP or achievements.

The demo does not create cloud accounts or synchronize guest data. Android data clearing or uninstalling may remove the local profile.

## Local adventure objectives

Hollow Crypt tracks three valid Daily quest completions. Iron Bastion requires a valid completed Weekly target. Sage's Labyrinth tracks an active Milestone quest and requires a valid completed Milestone for the completed state. Start, continue, abandon and completion state are saved in the local SQLite database. Adventure completion gives no XP by itself.

An eligible unused quest can be permanently deleted after confirmation. Quests with completion, reward or progress history must be archived.

## Latest verification status

Steps 5 and 5.5 source changes are committed, including a schema v2 migration and source tests. Automated tests, typecheck, lint, Expo diagnostics, EAS APK build, installed Android launch, restart and visual screenshot checks have not been run in the current environment. Do not treat this source commit as proof of a verified build.

## EAS build setup

The app config links to the EAS project `@gutzx007s/ascendiaapp` via `extra.eas.projectId`. The preview profile builds an internal Android APK; production builds an AAB.

The current bootstrap has no committed package-manager lockfile. EAS therefore disables immutable lockfile enforcement via `EAS_NO_FROZEN_LOCKFILE=1` while initial dependencies are resolved. This is an install-stage workaround, not a reproducible dependency baseline. After dependency resolution, commit a verified `yarn.lock` (or switch fully to npm and commit `package-lock.json`), then remove the workaround and verify another cloud build.
