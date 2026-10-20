# Android Build and Validation

## Prerequisites

- Node.js compatible with Expo SDK 57. The previous environment audit reported Node.js 22.16.
- npm, Android Studio and Android SDK/platform tools.
- Compatible Java runtime and an Android emulator or physical Android device.
- The repository has no verified committed package lock yet. Generate it only after successful dependency installation.

## Install and run

```sh
npm install
npm run start
npm run android
```

## Code checks

```sh
npm run typecheck
npm run lint
npm test
npm run expo:check
npm run doctor
```

Check the actual `package.json` scripts before executing.

## SQLite acceptance checklist

1. First launch creates the database and schema, then shows Welcome.
2. Finish onboarding, kill/relaunch the app and verify the saved profile skips Welcome.
3. Complete a Daily quest and verify completion, reward ledger, XP and attributes update together.
4. Submit it twice and confirm no second reward.
5. Add partial Weekly/Milestone progress, restart, and verify it remains.
6. Reach a target, restart, and verify the reward remains singular.
7. Correct a completion within 48 hours and inspect the reversal plus voided occurrence.
8. Reject correction outside the allowed window.
9. Reset local data, verify records are cleared and schema remains.
10. Test timezone, week-start, midnight and daylight-saving boundaries on Android.

## Current verification limits

npm install, lockfile generation, typecheck, lint, Jest, Expo diagnostics, Metro, Android launch/APK build, restart persistence and screenshots were not run. The repo was edited through GitHub tools rather than a local checkout with installed dependencies. Android SDK, adb, emulator and package registry access were unavailable in this session.
