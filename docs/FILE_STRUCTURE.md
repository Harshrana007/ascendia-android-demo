# File Structure

## Actual structure after Step 1

```text
ascendia-android-demo/
├── .gitignore
├── .prettierrc.json
├── AGENTS.md
├── ASCENDIA_DEMO_BUILD_STEPS.md
├── CHANGELOG.md
├── README.md
├── app.json
├── app/
│   ├── _layout.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── quests.tsx
│       ├── player.tsx
│       ├── adventures.tsx
│       └── profile.tsx
├── assets/
│   └── references/
│       └── README.md
├── docs/
│   ├── ANDROID_BUILD.md
│   ├── ANIMATION_SPEC.md
│   ├── ASSET_MANIFEST.md
│   ├── BUILD_STATUS.md
│   ├── DATA_MODEL.md
│   ├── DECISIONS.md
│   ├── DESIGN_SYSTEM.md
│   ├── FILE_STRUCTURE.md
│   ├── FOUNDATION_AUDIT.md
│   ├── GAME_RULES.md
│   ├── MASTER_SPEC_REFERENCE.md
│   ├── PRODUCT_SCOPE.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── TEST_PLAN.md
│   └── reference/
├── eslint.config.js
├── expo-env.d.ts
├── package.json
├── src/
│   ├── components/navigation/TabIcon.tsx
│   ├── config/navigation.ts
│   ├── features/foundation/FoundationRoute.tsx
│   └── theme/
│       ├── colors.ts
│       ├── index.ts
│       ├── spacing.ts
│       └── typography.ts
└── tsconfig.json
```

## Later structure

Step 2 adds visual primitives and approved app assets. Step 3 adds screen-specific UI. Database schema, migrations, repositories and progression modules are introduced only when implementing the working quest engine. Do not create empty directories just to imitate the target tree.

The reference PNGs are still absent from the remote Git tree. The asset manifest and `assets/references/README.md` record this unresolved binary transfer blocker.
