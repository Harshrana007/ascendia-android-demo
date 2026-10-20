# Android Build and Development Guide

## Configured baseline

- Expo SDK `~57.0.21`.
- React Native `0.86.3`.
- React `19.2.3`.
- Node.js `22.13.x` or newer per SDK 57 documentation.
- npm scripts.
- Expo Router.
- App identifier `com.example.ascendia`, a development placeholder to confirm before release.
- Portrait orientation, dark UI and Android edge-to-edge configuration.

Official references: https://docs.expo.dev/versions/v57.0.0/ and https://expo.dev/changelog/sdk-57.

## Run the app

After package installation from a network-enabled machine:

```sh
npm install
npm run start
npm run android
```

Metro starts with `npm run start`. Press `a` in Expo CLI to launch an available Android emulator. A physical Android device can use the development workflow after USB debugging is enabled.

## Validation commands

```sh
npm run typecheck
npm run lint
npm test
npm run expo:check
npm run doctor
```

These commands are configured but have not successfully executed here. Generate and commit `package-lock.json` with `npm install` first.

## Native build prerequisites

- Android Studio and a compatible Android SDK.
- Configured emulator or physical device.
- Java/JDK compatible with generated Gradle and Android Gradle Plugin.
- Development build if later native modules exceed Expo Go support.

The available container has Node.js 22.16 and Java 21 but no Android SDK, `adb`, emulator, or working outbound DNS to npm/GitHub. No Android launch or APK build was performed.

## Native project strategy

Expo Continuous Native Generation is the default unless there is a concrete reason to commit native projects. Native Android files may be generated with Expo prebuild. Do not add a hand-maintained native project during the foundation stage. iOS validation is outside this Android demo.

## Configuration and safety

The package identifier is temporary, not a confirmed production identifier. No unnecessary runtime permissions, credentials, signing material or production service keys are configured.
