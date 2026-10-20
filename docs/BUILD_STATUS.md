# Build Status

## Current stage

Step 5 and Step 5.5 source remediation committed. Runtime and Android release verification remain pending.

Source and documentation are being committed as the Step 4 implementation. This is not a verified Android build. TypeScript, lint, Jest, Metro, Android launch, restart persistence and screenshot checks were not run in this environment.

## Source implementation

- [x] Asynchronous SQLite open with schema version tracking and migration.
- [x] Profile, progression, six attributes, quests/revisions, occurrences, progress, completions, reward ledger, streak/grace/penalty history, rank history, achievements and preference-revision tables.
- [x] Persistent onboarding and profile controls.
- [x] Database-backed create/edit/archive, daily and one-time completion, weekly/milestone progress.
- [x] Transaction-protected XP/attribute updates and unique occurrence/reward protections.
- [x] Historical corrections within 48 hours with compensating reward events.
- [x] Centralized XP calculation, demo-only level curve and disabled rank gate.
- [x] Provisional grace/streak/future-penalty policy and recovery.
- [x] Database loading/error state with retry and confirmed reset.
- [x] Pure unit tests authored for XP/level/rank and scheduled-day policy.
- [x] Legacy in-memory adapter and obsolete tests removed.

## Provisional rules

1,000 XP per level; promotion disabled; one weekly grace miss; 10% reduction on future rewards after an additional scheduled miss; recovery after three successful scheduled days. A successful day requires all active Daily quests scheduled that day to be cleared. Product approval is still required.

## Validation record

Not run: dependency installation and lockfile generation; TypeScript; lint; Jest; Expo diagnostics; Metro; Android build/launch; SQLite restart persistence; device-level timezone tests; screenshots.

This session edited through GitHub repository tools rather than a local clone with installed dependencies. Android SDK/adb/emulator tools and package registry access were unavailable.

## Remaining limitations

- Schema is version 1; future schema modifications require another migration.
- Rank promotions are not enabled.
- Penalty event history is reconciled from occurrences rather than being an immutable remote audit service.
- Timezone and DST behavior need device acceptance testing.
- Production-resolution character/rank artwork and final visual screenshot comparison remain separate open work.

## Step 5.5 source change status

Source now includes blank guest callsign, optional starter quests, explicit class and presentation selections, shared callsign validation, character-aware preview with honest fallback, finite animated welcome with Skip Intro, and Expo icon/adaptive/splash paths with a database initialization gate.

The compact brand exports require replacement with approved high-resolution art before release. Only the initial Warrior/male/Rank E character portrait is explicitly mapped. TypeScript, lint, Jest, Expo diagnostics, EAS build, Android launch, restart and screenshots remain unrun.

## Step 5 source additions

- SQLite schema version 2 adds the local adventure-state table with its own migration.
- Adventures screen now has Hollow Crypt, Iron Bastion and Sage's Labyrinth with saved start/abandon/completed state and objectives derived from valid saved Daily, Weekly and Milestone completions.
- Quest list exposes a confirmed permanent-delete path for eligible unused drafts; the repository rejects removal when protected history or progress exists.
- DemoStateProvider refreshes the saved SQLite snapshot when Android returns to the active state, queued behind existing writes.
- Unit source tests cover guest identity validation and pure adventure objective rules.

## Release gates still open
TypeScript, ESLint, Jest, Expo configuration and dependency diagnostics, Metro, EAS profile validation, APK build/download, Android install/launch, resume/restart, SQLite migration/device tests and screenshot review have NOT been run here. Character art remains provisional for Warrior/male/Rank E only. The compact 128-pixel icon/splash exports need production-quality replacements before release.
