# Test Plan

## Step 0: tests possible now

- Repository metadata and branches inspected through GitHub.
- Initial repository emptiness confirmed.
- Supplied text specification and build-step plan retrieved.
- Image dimensions and file sizes inspected in the working session.
- No app tests, installs, typechecks, lint, Android runtime, or screenshot comparison can run because no application code or local Android environment has been established.

## Later automated unit tests

### Quest rules
- Daily schedules and one completion per scheduled date.
- No miss on unscheduled days.
- Weekly progress, exact target boundary and single reward.
- Milestone progress and single completion reward.
- One-time deadline does not make an overdue quest uncompletable.
- Input validation for target, unit, title, difficulty and attributes.

### XP and progression
- Base XP mapping for all difficulty levels.
- Primary attribute at 100% and up to two distinct secondary attributes at 50%.
- Half-up rounding.
- Player XP is not multiplied by attribute distribution.
- Level thresholds and rank configuration boundaries.
- Class and presentation changes do not alter progression.

### Integrity and scheduling
- Idempotency for duplicate completion and repeated progress submission.
- Atomic rollback if reward or completion write fails.
- Quest revision snapshots remain unchanged after edits.
- Archive preserves history.
- Restart persistence and migration behavior.
- Timezone, week start, midnight and daylight-saving boundaries.
- Grace, weakened state, recovery, and 48-hour correction once rules are approved.

## Later integration tests

- SQLite initialization and migrations.
- Transactional completion with reward ledger.
- Restart persistence for player, quests, attributes and history.
- Reset requires confirmation and reseeds only after reset.
- Export/share behavior only if implemented.

## Later manual Android checks

- Onboarding completion and re-entry/reset.
- All five tabs and active tab states.
- Create, edit, complete and archive quest.
- Daily duplicate attempt.
- Weekly and milestone progress.
- XP, attribute and streak changes.
- Level-up and rank promotion.
- Change class/presentation.
- Restart the app and verify saved progress.
- Offline mode by disabling connectivity on a device when possible.
- Small and tall screen layout, keyboard, safe areas and Android back navigation.
- Image loading, scroll smoothness, reduced motion, text scaling, contrast and screen-reader labels.
- Screenshot comparisons against all supplied references.
- Coming Soon actions remain honest and prohibited inventory or combat mechanics are absent.

## Reporting rules

Record test command, environment, date, result and evidence. Use Not Run when a test did not happen. Passing typecheck does not prove visual quality; screenshots alone do not prove data integrity.
