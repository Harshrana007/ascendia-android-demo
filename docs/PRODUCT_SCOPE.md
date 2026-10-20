# Product Scope: Ascendia Android Demo

## Implemented source scope
- Welcome and onboarding for name, six classes, presentation, interests, timezone, week start and starter quests.
- Five tabs: Home, Quests, Player, Adventures and Profile.
- SQLite-backed profile, progression, attributes, quests/revisions, occurrences, progress, completion and reward history, preferences, streaks and achievements.
- All four quest types with creation, editing, archiving, filters, direct completion or numeric progress.
- Transaction-protected XP/attribute rewards with unique occurrence identities.
- Historical correction within 48 hours with compensating reward entries.
- Local reset and database initialization/error recovery.

## Provisional behavior
The demo uses a 1,000 XP per-level curve, no automatic rank promotion, one weekly grace miss, a 10% reduction in future XP after an additional scheduled miss, and recovery after three successful scheduled days. The interpretation requires product approval.

## Coming Soon
Adventures are illustrative destination cards. Daily Essence, scheduled notifications, accounts, social features, subscriptions and AI do not perform actions or award XP.

## Excluded
No inventory, loot, equipment, gear-based bonuses, crafting, combat, backend, authentication, cloud sync or subscription processing.

## Validation
Unit test sources are authored but not run. TypeScript, lint, Jest, Metro, Android launch, restart persistence and screenshot comparison remain pending.
