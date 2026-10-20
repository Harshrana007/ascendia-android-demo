# File Structure

## Actual structure after Step 0 documentation

```text
ascendia-android-demo/
├── .gitignore
├── AGENTS.md
├── ASCENDIA_DEMO_BUILD_STEPS.md
├── CHANGELOG.md
├── README.md
├── assets/
│   └── references/
│       └── README.md
└── docs/
    ├── README.md
    ├── ANDROID_BUILD.md
    ├── ANIMATION_SPEC.md
    ├── ASSET_MANIFEST.md
    ├── BUILD_STATUS.md
    ├── DATA_MODEL.md
    ├── DECISIONS.md
    ├── DESIGN_SYSTEM.md
    ├── FILE_STRUCTURE.md
    ├── FOUNDATION_AUDIT.md
    ├── GAME_RULES.md
    ├── MASTER_SPEC_REFERENCE.md
    ├── PRODUCT_SCOPE.md
    ├── TECHNICAL_ARCHITECTURE.md
    ├── TEST_PLAN.md
    └── reference/
        └── Ascendia_Master_Specification_Updated.md
```

The visual reference PNGs are not yet in Git. The asset directory contains only a README describing the exact filenames and current blocker. Do not depict these image files as present until verified.

## Intended application structure for later steps

Adapt this proposal after an actual coding workspace audit. Do not create empty directories or placeholder source files only to imitate a tree.

```text
app/ or src/app/
src/
  components/
    common/
    layout/
    fantasy/
    player/
    quests/
    navigation/
  features/
    onboarding/
    home/
    quests/
    player/
    adventures/
    profile/
  game/
    xp/
    attributes/
    ranks/
    streaks/
    rewards/
    rules/
  database/
    schema/
    migrations/
    repositories/
  hooks/
  navigation/
  theme/
  types/
  utils/
  config/
assets/
  images/
  fonts/
  icons/
  animations/
tests/
  unit/
  integration/
  fixtures/
scripts/
docs/
android/ (only if required by the chosen Expo native workflow)
```

Do not add a fake iOS project for this Android-only demo. A generated Expo project may generate native Android files later; document its actual workflow.
