# Technical Architecture

## Foundation baseline

- Expo SDK `~57.0.21`.
- React Native `0.86.3`.
- React `19.2.3`.
- Expo Router `~57.0.28`, root Stack and five primary Tabs.
- TypeScript strict mode.
- Prepared local database dependency: `expo-sqlite ~57.0.4`, implementation deferred to Step 4.
- Motion preparation: Reanimated `4.5.1` with Worklets `0.10.1`.
- SVG: `react-native-svg 15.15.4`.
- Gradients: `expo-linear-gradient ~57.0.2`.

SDK 57 is the initial compatibility baseline. SDK 58 was announced on 2026-10-15, but its Expo Go rollout was not yet complete when this choice was made. References: https://expo.dev/changelog/sdk-57 and https://expo.dev/changelog/sdk-58.

## Step 2 presentation modules

- `src/theme/colors.ts`: semantic backgrounds, surfaces, text, feedback and focus.
- `src/theme/typography.ts`: shared type scale and typed text styles.
- `src/theme/spacing.ts`: spacing, radii and layout dimensions.
- `src/theme/designTokens.ts`: gradients, border variants, elevation, glow, motion durations, rank and attribute accents.
- `src/components/visual/CosmicBackground.tsx`: optional image with controlled overlay and dark fallback.
- `src/components/visual/GlassFantasyPanel.tsx`: layered surface with thin luminous border.
- `src/components/visual/GradientActionButton.tsx`: real action with disabled and loading states.
- `src/components/visual/XPProgressBar.tsx`: accessible clamped display only.
- `src/components/visual/RankCrystal.tsx`: configurable original SVG rank marker.
- `src/components/visual/AttributeBadge.tsx`: attribute code and value styling.
- `src/components/visual/QuestIconTile.tsx`: icon category and completion styling.
- `src/components/visual/SectionHeader.tsx`: title, subtitle and optional real action.
- `src/components/icons/AscendiaIcon.tsx`: original SVG icon family.
- `src/components/navigation/PrimaryTabAppearance.ts`: shared tab-bar styling.

## State and behavior boundaries

Route components compose presentation primitives. The XP bar displays supplied values and never awards XP. RankCrystal receives an explicit rank. Attribute colors affect appearance only. The future behavior flow remains: user action -> validation -> domain calculation -> transactional SQLite write -> committed result -> view refresh -> earned animation.

## Asset handling

Two original compact WebP demo assets are committed under `assets/images/`. The supplied reference PNGs remain untracked, so comparison against them is incomplete. System font fallbacks are used until custom font licenses and files are approved.

## Validation limitation

No dependency installation, lockfile generation, typecheck, lint, Jest run, Metro render or Android screenshot has run in this session. See `docs/BUILD_STATUS.md`.
