# Technical Architecture

## Stack

Expo SDK 57, React Native 0.86.3, React 19, TypeScript, Expo Router and the existing Expo SQLite `~57.0.4` package. Existing Cosmic Horizon tokens and visual components remain the presentation layer.

## Startup and state flow

1. The root provider initializes SQLite asynchronously.
2. Database open, WAL/foreign-key configuration and versioned migrations complete before profile routes render.
3. Loading/error screens prevent fake saved progress while initialization is pending or failed.
4. `readDemoState` projects player, progression, attributes, current occurrences, active quests, reward history and achievements from SQLite.
5. All screens use one shared provider snapshot.
6. Writes are serialized in the provider, run through repository methods, and followed by a database readback. If a write commits but readback fails, the provider reports a reload problem instead of falsely claiming the write failed.

## Modules

- `src/database/database.ts`: open, versioned schema/migration and dependency-safe local reset.
- `src/database/ascendiaRepository.ts`: parameterized queries, revisions, occurrences, completions, rewards, measured progress, corrections and streak reconciliation.
- `src/game/progression/rules.ts`: pure XP allocation, level calculation, disabled rank gate and configurable demo rules.
- `src/game/streaks/policy.ts`: pure scheduled-day success/grace/miss decision.
- `src/services/demoFixtures.ts`: starter quests, attribute labels and base XP mapping.
- `src/state/DemoStateProvider.tsx`: initialization state, shared snapshot and serialized writes.
- `src/services/characterArt.ts`: real asset mapping and clear missing-art fallback.
- `src/services/systemMessages.ts`: original Ascendia system copy.

## Integrity

Completion, measured target rewards and correction use exclusive transactions. A unique reward key and the valid-completion index provide database-level duplicate prevention. The UI never awards XP itself. Corrections use a compensating reward-ledger row instead of deleting the original award.

## Provisional rules and verification

The level curve is a flat 1,000 XP per level for this demo. Rank promotion is disabled pending approval. The current provisional streak policy grants one weekly grace miss, applies 10% less XP to future awards after an additional scheduled miss, and ends after three successful scheduled days. These rules require product approval.

The repository was edited through GitHub tools without a local checkout with installed dependencies. Typecheck, lint, Jest, Expo diagnostics, Metro, Android build/launch, persistence restart and screenshot comparison remain unrun.
