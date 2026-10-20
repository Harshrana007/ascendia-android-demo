# Test Plan

## Unit tests authored

`tests/unit/progressionRules.test.ts` covers level boundaries, the approved difficulty XP table, primary and secondary allocation, half-up rounding, penalty adjustment, disabled rank promotion, Monday/Sunday week boundaries, next-local-date, grace miss and subsequent miss outcomes. These tests have not been executed in this environment.

## Required automated tests

### Database
- First open creates tables, indexes, constraints and migration record.
- Restart preserves records and reopening does not reset them.
- Unsupported schema version shows the retryable database error state.
- Foreign-key and reward uniqueness constraints reject invalid writes.
- Transaction rollback leaves no partial completion or reward.
- Reset clears dependent data in safe order but preserves the schema.

### Quest and reward engine
- Daily schedule uses home timezone; unscheduled days are ignored.
- One valid completion/reward per occurrence.
- Weekly occurrence remains stable after changing week-start preference mid-period.
- Weekly/milestone partial progress does not grant full reward; reaching target grants once.
- One-Time deadline does not block overdue completion.
- Editing preserves history snapshots; type changes are refused.
- Archiving retains history.
- Correction within 48 hours reverses balances and voids the occurrence.
- Future/out-of-window/repeated correction attempts are rejected.

### XP, level and streaks
- All XP values, primary/secondary allocation and half-up rounding.
- Penalty applies to future awards only.
- Level boundaries; no class bonus.
- Rank remains unchanged while gates are unapproved.
- One weekly grace miss, subsequent miss, three-day recovery and correction-driven recalculation.
- Timezone, midnight, travel, week-start and DST cases.

### UI
- Onboarding persists and is skipped after restart.
- Home, Quests and Player display coherent shared totals.
- Failed writes never show a success reward.
- Corrected occurrences are visibly voided.
- Database error screen retries initialization.
- Reset confirms and clears local data.

## Actual execution status

Not run: dependency installation/lockfile generation, TypeScript, lint, Jest, Expo diagnostics, Metro, Android launch/APK build, SQLite restart tests or Android screenshots. The repository was modified through GitHub tools, not a local installed checkout. Android SDK, adb, emulator and registry access were not available during this session.

## Step 5.5 first-run cases

Added unit source coverage for guest callsign normalization, Unicode code-point limits and validation. These tests are authored but not executed.

In a dependency-enabled checkout, run `npm run typecheck`, `npm run lint`, `npm test`, `npm run expo:check` and `npm run doctor`. On an APK, verify fresh install, blank callsign, required class and presentation, optional quests, zero generated reward history, saved profile after restart, reset, keyboard/back handling, reduced motion, launcher icon and native splash.
