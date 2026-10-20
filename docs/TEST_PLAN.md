# Test Plan

## Step 0 and foundation checks

- Repository metadata and branch inspection was performed through GitHub.
- The supplied master specification and build plan were retrieved.
- No app tests could run because the initial repository had no project code.

## Step 1 baseline commands

Configured in `package.json`: `npm run typecheck`, `npm run lint`, `npm test`, `npm run expo:check`, and `npm run doctor`. These have not passed or failed because dependencies are not installed and `package-lock.json` has not been generated.

## Step 2 visual primitive tests

### Pure unit tests

`tests/unit/progress.test.ts` covers ratios below zero, intermediate ratios, values above maximum, non-finite values, non-positive maximum, and progress formatting.

### Manual visual checks still required

- Verify cosmic Home artwork crop and overlay.
- Verify text contrast over artwork.
- Check RankCrystal at multiple sizes for E, A, S and SSS.
- Check XPProgressBar at zero, partial, exact maximum and over maximum.
- Check disabled, loading, pressed and active/inactive navigation states.
- Check all attribute accents and quest icon styles.
- Check small Android portrait layouts, font scaling and safe areas.
- Compare rendered screens against supplied source references after the PNGs are transferred.
- Confirm no missing asset path or import errors.

These checks are planned, not reported results.

## Step 3 screen tests

- Onboarding completion and reset.
- Five-tab navigation.
- Responsive content, scroll and keyboard behavior.
- Every action works or is clearly identified as unavailable.

## Step 4 quest and progression tests

- Daily schedule and one reward per scheduled date.
- Unscheduled days are not missed.
- Weekly and milestone exact-target boundaries and single reward.
- Overdue one-time tasks remain completable.
- Input validation for titles, targets, units, difficulty and attributes.
- Base XP values and primary/secondary attribute distribution.
- Half-XP rounding and no double addition to player XP.
- Level/rank configuration boundaries.
- Duplicate prevention, transactional rollback and history preservation.
- Restart persistence, migration, timezone and daylight-saving boundaries.
- Grace, weakened state, recovery and 48-hour correction after those rules are approved.

## Android acceptance

Check onboarding, all five tabs, quest actions, progression, restart persistence, offline mode, Android back navigation, scaling, keyboard, reduced motion, screen-reader labels, performance and screenshot fidelity on an actual Android target.

## Reporting rules

Record each check with command or device, environment, result and evidence. Use Not Run where appropriate. Source inspection, typecheck, Metro startup, Android launch and visual approval are distinct checks.
