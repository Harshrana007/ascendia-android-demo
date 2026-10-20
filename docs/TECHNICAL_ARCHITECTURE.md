# Technical Architecture

## Implemented foundation

- Expo SDK: `~57.0.21`.
- React Native: `0.86.3`.
- React: `19.2.3`.
- Navigation: Expo Router `~57.0.28`, one root Stack and five primary Tabs.
- Language: TypeScript strict mode.
- Theme: centralized `src/theme` tokens for colors, typography, spacing, radii, layout and navigation dimensions.
- Icons: custom SVG tab icon component using `react-native-svg`.
- Animation preparation: React Native Reanimated `4.5.1` plus `react-native-worklets 0.10.1`. The Expo preset configures Reanimated's worklet integration; no copied Babel override has been added.
- Local database dependency prepared: `expo-sqlite ~57.0.4`; schema and repositories are deferred to Step 4.
- Gradient support: `expo-linear-gradient ~57.0.2`.

SDK 57 is the chosen initial compatibility baseline. SDK 58 was announced on 2026-10-15, and its release note said its Expo Go distribution would roll out later. Reevaluate the SDK choice when the first Android runtime is available. Official references: https://expo.dev/changelog/sdk-57 and https://expo.dev/changelog/sdk-58.

## Routing

- `app/_layout.tsx`: root stack, status bar and safe-area provider.
- `app/(tabs)/_layout.tsx`: shared five-tab navigation and selected states.
- `app/(tabs)/index.tsx`: Home foundation placeholder.
- `app/(tabs)/quests.tsx`
- `app/(tabs)/player.tsx`
- `app/(tabs)/adventures.tsx`
- `app/(tabs)/profile.tsx`

Screen content is not the complete product UI. Domain logic and persistence remain outside route components.

## Module boundaries

- `src/theme/`: central palette, typography and geometry tokens.
- `src/components/navigation/`: tab icons and navigation appearance.
- `src/features/foundation/`: temporary shared route scaffold.
- `src/config/`: navigation metadata.
- `src/components/visual/`: to be added in Step 2 for shared Cosmic Horizon primitives.
- `src/game/` and `src/database/`: reserved for later quest/progression implementation, not placeholders.

## Validation status

The initial repository was empty and this work was applied using GitHub's tree/blob API. The container cannot resolve GitHub or npm hosts, and no Android SDK or emulator is available. A package lockfile cannot be generated in this session. Run `npm install` in a network-enabled workspace, commit the generated lockfile, and execute the documented checks before declaring the foundation validated.
