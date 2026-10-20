# Changelog

## Unreleased

### Step 4: Local gameplay and progression
- Added Expo SQLite schema and versioned initialization.
- Persisted player/profile, six attributes, quest revisions and occurrences, progress, completions, reward ledger, preferences and local histories.
- Added transaction-based quest lifecycle, centralized XP allocation and database-level duplicate reward protection.
- Added provisional streak/grace/future-XP penalty policy and 48-hour correction with compensating reward events.
- Connected UI state to the local repository and added loading/error retry plus confirmed reset.
- Added progression/streak unit tests. Test execution and Android acceptance remain pending.

### Step 3: Screens and onboarding
- Added Welcome and four-step onboarding.
- Connected Home, Quests, Player, Adventures and Profile to shared state.
- Added quest management, measured progress, history and preferences.

### Step 2: Cosmic Horizon design foundation
- Centralized design tokens and reusable fantasy components.
- Integrated compact original cosmic and character artwork.

### Step 1: React Native foundation
- Established Expo SDK 57, TypeScript, Expo Router and five-tab navigation.

### Step 0: Foundation documentation
- Added scope, architecture, asset and validation documentation.
