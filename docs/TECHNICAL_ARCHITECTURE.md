# Technical Architecture Proposal

## Status

Proposed architecture only. The repository was empty during audit, so no framework, package manager, navigation library, database, or dependency has yet been installed or verified.

## Target stack

- React Native with Expo and TypeScript.
- Expo Router for file-based routing if suitable for the chosen Expo SDK; otherwise use an established React Navigation setup if there is a reason to prefer it.
- Expo SQLite for structured durable local data.
- AsyncStorage only for lightweight preferences that do not need transactions.
- React Native Reanimated for purpose-driven motion, with Gesture Handler only when gestures are needed.
- React Native SVG and Expo Linear Gradient where they add clear visual value.
- Lottie only if a suitable original or licensed animation asset is available and compatibility is verified.
- Existing package manager and lockfile should be preserved once discovered in the real development workspace.

## Logical boundaries

1. Navigation and screens: onboarding and the five primary tabs.
2. Shared presentation components: panels, buttons, rank crystals, progress bars, quest rows, attributes, navigation and Coming Soon cards.
3. Theme system: color, type, spacing, radii, borders, elevations and motion tokens.
4. Domain logic: quest types, XP distribution, level progression, ranks, scheduling, streaks, penalties, corrections and achievements.
5. Persistence: SQLite schema, versioned migrations, repositories, transactional completion and a reward ledger.
6. Asset registry: class, presentation, rank-stage, resolution and license metadata.
7. Test layer: pure domain unit tests, persistence integration tests where supported, and manual Android UI checks.

## Core state flow

User action -> validation -> domain rule calculation -> transactional SQLite write -> committed result -> view model refresh -> animation tied to the saved result.

The UI must never independently compute or award XP. An animation must not be used as evidence that a transaction succeeded.

## Persistence rules

- SQLite is the authoritative local source for profile, quest, occurrence, progress, completion and reward records.
- Use versioned schema migrations.
- Give each rewardable occurrence a stable idempotency key, backed by a database uniqueness rule or equivalent transactional guard.
- Store reward amounts and the quest revision/configuration snapshot used at the time of earning.
- Preserve history on edit or archive.
- Seed only on fresh database initialization or explicit confirmed reset.
- Keep core quest behavior functional without network connectivity.

## Future services deliberately absent

Do not add authentication, Supabase, Firebase, subscriptions, RevenueCat, AI APIs, analytics services, cloud sync or social systems in this local demo without a separate approved phase.
