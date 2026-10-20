# Android Build and Development Guide

## Current status

No application package or native project exists in the repository at the foundation audit. Therefore there are no verified Node.js, Expo SDK, React Native, Java, Android SDK, emulator, install, launch, test or build commands yet. Choose and document versions after the actual coding workspace and compatibility matrix are inspected.

## Planned workflow

1. Inspect local Node.js, package managers, Java, Android SDK, Android Studio and device availability.
2. Choose the compatible Expo SDK and maintain the existing lockfile if a project is imported later.
3. Set up React Native with TypeScript. Do not put the app inside a WebView.
4. Use Expo Router if an appropriate foundation is needed, or retain a stable existing navigation solution.
5. Verify dependencies against the chosen SDK before adding native modules.
6. Keep Android as the tested target for this demo.
7. Document whether native Android files are committed or generated with Expo Continuous Native Generation.

## Commands to define after project bootstrap

The eventual README must list the actual commands for dependency installation, Metro start, Android launch, typecheck, lint, unit tests, and an Android APK or development build. Do not publish placeholder commands as verified.

Common Expo command patterns may be appropriate after the chosen package manager and SDK are verified:
- `npx expo start`
- `npx expo start --android`
- `npx expo install <compatible-package>`

These are examples only, not evidence that the repository currently runs them.

## Build prerequisites to verify

- A Node.js version compatible with the selected Expo SDK.
- The selected package manager.
- Android Studio and a compatible Android SDK, emulator or a physical Android device.
- Java/JDK where required by the selected native build path.
- Compatible development-build setup if required native modules are not available in Expo Go.

## Security and build integrity

- Never commit service secrets, keystores or signing credentials.
- Do not claim an APK exists unless a real artifact is produced and verified.
- No iOS setup or validation is part of this Android-only demo step.
- Record actual commands and outcomes in `BUILD_STATUS.md` and final QA documentation.
