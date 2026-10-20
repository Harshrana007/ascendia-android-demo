# File Structure

## Current implementation

```text
app/
├── _layout.tsx
├── index.tsx
├── welcome.tsx
├── onboarding.tsx
└── (tabs)/
    ├── _layout.tsx
    ├── index.tsx
    ├── quests.tsx
    ├── player.tsx
    ├── adventures.tsx
    └── profile.tsx

src/
├── database/
│   ├── database.ts
│   └── ascendiaRepository.ts
├── game/
│   ├── progression/rules.ts
│   └── streaks/policy.ts
├── state/DemoStateProvider.tsx
├── types/demo.ts
├── services/
│   ├── demoFixtures.ts
│   ├── characterArt.ts
│   └── systemMessages.ts
├── components/
│   ├── layout/DatabaseStatusScreen.tsx
│   ├── layout/ScreenShell.tsx
│   ├── fantasy/CharacterHero.tsx
│   ├── quests/QuestCard.tsx
│   ├── quests/QuestProgressModal.tsx
│   └── visual/
├── features/
│   ├── onboarding/
│   ├── home/
│   ├── quests/
│   ├── player/
│   ├── adventures/
│   └── profile/

tests/unit/
├── progressionRules.test.ts
└── progress.test.ts
```

The obsolete in-memory adapter and its test were removed to avoid a competing gameplay source of truth. Expo Continuous Native Generation remains the Android workflow; the native `android/` directory is not committed.
