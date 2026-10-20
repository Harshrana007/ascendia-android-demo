# Ascendia Android Demo: Step 0 to Step 6

A gated implementation plan for a locally stored, fully interactive React Native demo inspired by the supplied Cosmic Horizon references.

## How to use this file

Run these prompts in order in the same coding-agent session and the same project repository. Do not paste all seven steps at once. At the end of each step, review the files changed, launch the app or run the tests where possible, and fix failures before moving forward.

The demo is Android-only for delivery, but it is built with React Native and Expo using TypeScript. It must not be implemented as a web page inside a WebView. Keep the code structured so iOS may be added later, but do not spend this demo phase configuring or testing iOS.

## Reference files to put in the repository

Create `docs/reference/` and copy the supplied files into it:

- `docs/reference/ascendia-home-reference.png`: the tall Home screen phone mockup.
- `docs/reference/cosmic-horizon-ui-reference.png`: the multi-screen UI board and E to SSS rank progression strip.
- `docs/reference/Ascendia_Master_Specification_Updated.md`: the master product specification.

If those files have different names in the download folder, preserve their bytes and copy them using the names above. Do not redraw, compress or overwrite the original reference files. You may also create optimized app-ready copies in `assets/` after visual inspection.

---

# Step 0: Repository audit, reference setup, and permanent project instructions

## Prompt to give the coding agent

You are the senior React Native architect taking over the Ascendia Android demo. Before writing product code, inspect the entire existing repository and the supplied references. This is a local-only interactive demo, not the production commercial application yet.

### Product intent

Ascendia is an anime-inspired RPG habit tracker. Users complete real-world quests, earn XP, develop six attributes, build streaks, level up and progress across ranks E, D, C, B, A, S, SS and SSS. Character visuals evolve automatically as rank changes. The emotional inspiration is the dramatic rank progression of anime fantasy RPGs, while the real product purpose remains practical self-improvement.

### Mandatory first actions

1. Inspect the repository, package manager, current React Native or Expo setup, routes, existing screen components, assets, tests, lint and typecheck scripts, and current build status.
2. Do not replace working code before understanding it. Identify what can be reused, what is broken and what is absent. If a foundation already exists, adapt it rather than rebuilding by default.
3. Inspect the two UI reference images and the master specification. Treat the supplied images as the primary visual reference. The tall phone Home image is the Home layout reference. The multi-screen board is the reference for Quests, Player, Adventures, Profile and rank evolution.
4. Copy the reference files into `docs/reference/` using the names listed above. If the files are not present in the workspace, stop and report exactly which file is missing. Do not invent a substitute reference.
5. Create or update `AGENTS.md` at the repository root. If a file already exists, preserve unrelated instructions and merge the Ascendia rules into it. Do not silently overwrite another project's agent instructions.
6. Create `docs/ASCENDIA_DEMO_SPEC.md` with the demo scope, navigation, data model, screen requirements, interaction requirements and exclusions.
7. Create `docs/BUILD_STATUS.md` with a checklist for Steps 0 through 6. Mark Step 0 complete only after the audit and reference setup are actually done.
8. Create `docs/DECISIONS.md` to record assumptions that must remain explicit. Do not quietly invent permanent rank thresholds or unapproved formulas.
9. Report the current environment, available Android tooling, existing scripts and the exact command that should launch the app. Do not claim an Android build succeeded unless it did.

### Technology direction

- React Native with Expo and TypeScript.
- Use Expo Router if the repository already uses it or if a new navigation foundation is needed. Otherwise preserve an existing stable React Navigation implementation.
- Use `react-native-reanimated` for polished motion, with `react-native-gesture-handler` where gestures are needed.
- Use `lottie-react-native` only for supplied or deliberately created, appropriately licensed animation assets. Do not make Lottie a hard dependency for every interaction.
- Use `expo-linear-gradient` for restrained gradients and `react-native-svg` for rank crystals, progress rings and vector ornamentation when appropriate.
- Use `expo-sqlite` for durable local structured data. Use AsyncStorage only for small non-critical UI preferences if needed. Do not use AsyncStorage as the primary quest and reward database.
- Use a compatible icon library already installed or an Expo compatible icon package. Keep icons consistent.
- Verify package versions against the current installed Expo SDK and official package compatibility before adding libraries. Avoid dependency sprawl.

### Permanent visual rules

Use the Cosmic Horizon visual language from the references:

- Midnight navy `#080D20` and deep cosmic blue `#101B38` foundations.
- Electric sapphire `#428BFF`, celestial cyan `#75D9FF`, arcane violet `#8765F5` and luminous lavender `#B7A0FF` as accents.
- Pale starlight `#E8F1FF`, muted silver `#A7B5D0` and restrained gold `#E9C77A` for text and rewards.
- Artwork-first screens, cinematic space and fantasy environments, layered depth, carefully controlled glow, rank crystals, fine luminous borders and legible RPG HUDs.
- Use a readable modern font for everyday tasks and a display face for major titles and ranks only if the font can be legally included and loaded correctly.
- Do not simulate the full fantasy world with only gradients, circles and emoji. Use the supplied artwork as the visual anchor.
- Do not stretch the reference images into app backgrounds as a shortcut. The reference images are guides, not entire screen backgrounds. Reconstruct real interactive components and use extracted or separately prepared artwork assets where possible.
- Never let decorative artwork obscure quest text, tappable controls, the Android status bar or bottom navigation.

### Permanent product rules

- Exactly five primary tabs: Home, Quests, Player, Adventures and Profile.
- Six classes: Warrior, Ranger, Mage, Assassin, Guardian and Scholar.
- Two character presentations: male and female.
- Six attributes: Strength (STR), Endurance (END), Intelligence (INT), Discipline (DIS), Vitality (VIT) and Wisdom (WIS).
- Eight ranks: E, D, C, B, A, S, SS and SSS.
- Four quest types: Daily, Weekly, One-Time and Milestone.
- Classes are identity and appearance choices only. They grant no XP bonuses or gameplay advantages.
- Character evolution is automatic and rank-based. Weapons, armor, clothing and magical effects are part of the character art, not items the user collects or equips.
- Absolutely no inventory, loot, equipment slots, equippable gear, gear stats, crafting, equipment upgrades or gear management. Remove the Inventory row shown in the collage because the written product specification explicitly excludes it.
- No combat or compulsory dungeon grinding. Adventures may display real, working demo cards or clearly labelled Coming Soon states, never fake functionality.
- No server, login, cloud sync, payments, real AI service, social backend or admin portal in this demo. All demo data is local to the device. Do not expose fake cloud or subscription success.
- No em dash characters in any user-facing copy, documentation, comments, commit messages or generated source text. Prefer commas, colons, semicolons or simple hyphens. This is a strict text rule.
- Do not claim an unfinished feature is functional. Hide it or label it clearly as a demo placeholder.

### Step 0 acceptance criteria

- Repository audit completed and summarized.
- Original reference files copied and accessible in the repo.
- Root `AGENTS.md`, `docs/ASCENDIA_DEMO_SPEC.md`, `docs/DECISIONS.md` and `docs/BUILD_STATUS.md` created or safely updated.
- Existing build status, constraints and next-step command documented.
- No product code rewritten without an explicit reason.
- Step 0 only is complete. Do not jump to Step 1 until the audit is reported.

### Required response when done

Report: repository summary, existing reusable code, current issues, reference file paths, created documentation files, chosen package manager, launch command, available Android build tooling, decisions awaiting approval and Step 0 checklist status.

---

# Step 1: Stable Android foundation and application architecture

## Prompt to give the coding agent

Continue the Ascendia Android demo from the audited repository. Read `AGENTS.md`, `docs/ASCENDIA_DEMO_SPEC.md`, `docs/DECISIONS.md` and `docs/BUILD_STATUS.md` before modifying anything. Implement the foundation only. Do not attempt all screens in this step.

### Goals

1. Establish or repair the Expo React Native TypeScript app foundation while preserving useful existing behavior.
2. Verify the app opens on Android and the developer can run it using the documented workflow.
3. Create a maintainable file structure with separate navigation, design tokens, reusable components, data models, persistence, domain logic and screens.
4. Add only compatible dependencies that have a clear use in the demo.
5. Make Android the tested target. Do not configure an iOS release pipeline now.

### Suggested structure

Adapt this to the existing repo rather than forcing it mechanically:

```text
AGENTS.md
app.json
package.json
src/
  app/ or navigation/
  components/
    buttons/
    panels/
    progress/
    quest/
    navigation/
  screens/
    HomeScreen.tsx
    QuestsScreen.tsx
    PlayerScreen.tsx
    AdventuresScreen.tsx
    ProfileScreen.tsx
    OnboardingScreen.tsx
  theme/
    colors.ts
    spacing.ts
    typography.ts
    radii.ts
    shadows.ts
    motion.ts
  data/
    seedData.ts
    models.ts
  domain/
    xp.ts
    progression.ts
    questRules.ts
    scheduling.ts
  storage/
    database.ts
    migrations.ts
    repositories/
  hooks/
  utils/
assets/
  images/
  characters/
  backgrounds/
  icons/
docs/
  reference/
  ASCENDIA_DEMO_SPEC.md
  DECISIONS.md
  BUILD_STATUS.md
  QA_CHECKLIST.md
```

### Foundation requirements

- Use strict TypeScript. Avoid `any` unless there is a documented reason.
- Set up a stable navigation mechanism with five tabs in the required order and a separate onboarding route when there is no profile.
- Preserve each tab's state where practical. Switching tabs must not visibly reload the entire scene or lose unsaved UI state.
- Add reusable safe-area handling and Android status bar/navigation bar styling suited to the dark theme.
- Create the initial Cosmic Horizon design tokens in code and use them consistently. Do not create a generic white-screen scaffold that will later be thrown away.
- Use a local seed profile and seeded quests for the demo. Until SQLite persistence is wired in Step 4, seed data may be in memory, but structure the app so this temporary state can be replaced cleanly.
- Configure linting, formatting and type checking using the project's current tooling. Avoid adding a new tool if the project already has one.
- Configure Jest or the existing test runner for pure domain functions. Native component tests can be added as the UI grows.
- Create a simple, branded loading state and a deliberate error or empty state. Do not leave a default Expo starter screen.
- Add an explicit demo reset utility placeholder for later connection to storage. Do not silently clear data on reload.

### Android constraints

- Confirm Expo SDK and installed native module compatibility before adding Reanimated, SQLite or SVG.
- Follow the required Reanimated Babel/plugin setup for the installed version.
- Do not mix incompatible animation library versions.
- Do not add native packages that cannot run under the chosen Expo development workflow unless you document the need for a development build.
- If Android SDK, Java or emulator tools are unavailable, still run the available checks and report the exact blocker. Never mark device validation as passed when it was not performed.

### Step 1 acceptance criteria

- App launches into the intended branded entry flow, not the default template.
- Five-tab navigation foundation exists in the approved order.
- Typecheck and lint pass, or existing failures are listed with exact evidence.
- Unit test infrastructure runs at least one real test.
- Android runtime or emulator check is attempted and honestly reported.
- `docs/BUILD_STATUS.md` updated with evidence and commands.
- Stop after the foundation. Do not start detailed screen implementation until this step is accepted.

### Required response when done

List architecture decisions, dependencies added and why, files created or changed, checks run with results, Android runtime status, known issues and Step 1 acceptance status.

---

# Step 2: Visual design system and reference-driven artwork integration

## Prompt to give the coding agent

Read the instructions and spec, then implement the Ascendia Cosmic Horizon design system and asset pipeline. The objective is to get much closer to the supplied references before building out all detailed functionality.

### First study the references

Open `docs/reference/ascendia-home-reference.png` and `docs/reference/cosmic-horizon-ui-reference.png` at full resolution. Identify the layout zones, palette, typography hierarchy, panel borders, character placement, rank crystal, progress bar treatments, glow strength, icon style, tab bar, row heights and density. Record observations in `docs/VISUAL_AUDIT.md`.

Do not treat the supplied phone frame, status bar or other screenshot chrome as literal app content. Reproduce the actual application UI with correct Android safe areas. The tall iPhone image is a visual composition reference only. Android is the demo target.

### Build a cohesive reusable design system

Create reusable components such as:

- `CosmicBackground`
- `ScreenScaffold`
- `AscendiaWordmark` or text treatment if a supplied brand asset exists
- `RankCrystal`
- `XPProgressBar`
- `RankProgressRing`
- `GlassPanel` or dark luminous panel
- `QuestRow`
- `AttributeTile`
- `PrimaryGradientButton`
- `IconActionButton`
- `SectionHeader`
- `BottomTabBar`
- `GlowDivider`
- `ComingSoonCard`

Use the exact palette as the starting point:

- Midnight navy `#080D20`
- Deep cosmic blue `#101B38`
- Electric sapphire `#428BFF`
- Celestial cyan `#75D9FF`
- Arcane violet `#8765F5`
- Luminous lavender `#B7A0FF`
- Pale starlight `#E8F1FF`
- Muted silver `#A7B5D0`
- Restrained gold `#E9C77A`
Use gradients and glow intentionally. Borders should read as thin illuminated edges, not thick neon frames on every element. Preserve readable contrast over artwork. Keep a consistent spacing scale, corner radii, typography, elevation and icon sizes.

### Artwork handling

- Place app-ready local image assets under `assets/` with meaningful names.
- Preserve source reference files untouched in `docs/reference/`.
- Use the supplied reference imagery only in accordance with the user's permission and as demonstration references.
- If extracting an illustration from a composite image, ensure that it can be legally and cleanly used for the demo. Do not falsely claim a crop is transparent or production-ready if it has a rectangular background.
- If the exact character artwork cannot be separated cleanly, use the supplied composition as a visual placeholder within a panel and document the limitation. Do not substitute unrelated stock art or copy actual copyrighted anime characters.
- Generate no new images unless explicitly authorized in this task. Prioritize assets already supplied.
- Add image sizing and compression notes to `docs/ASSET_GUIDE.md`.

### Match the references without copying the whole screenshot

- Create actual layout components, readable text and functioning controls.
- Use absolute positioning only where it supports a measured hero composition. Use responsive layout for quest rows and cards.
- Keep the Home hero cinematic, but reserve visible space for Today's Quests and the Create Quest action.
- Avoid oversized hero content that forces the main action far below the fold on common Android screens.
- Keep Android safe areas, cutouts, system bars and bottom navigation correct.
- Support narrow and taller aspect ratios without text clipping.
- Never use a single flattened screenshot as the whole Home screen.

### Motion foundation

Use Reanimated for short, purposeful motion, including:

- Gentle hero artwork entrance.
- Subtle low-frequency ambient movement only where inexpensive.
- XP bar fill transitions.
- Rank crystal shimmer using lightweight native transforms or opacity.
- Press feedback for buttons and quest rows.
- Panel entrance with restrained stagger.

Do not create continuous full-screen particle effects that affect battery or scrolling. Keep motion interruptible and respect Reduce Motion where possible. Do not use arbitrary animations just to make every component move.

### Step 2 acceptance criteria

- `docs/VISUAL_AUDIT.md` explains observations from both references and any deviations.
- Design tokens and reusable visual components exist.
- Home uses the appropriate supplied visual assets and looks recognizably close to the reference.
- UI is real React Native content, not a screenshot background.
- At least one screenshot on Android or emulator is captured if the tools are available.
- A visual gap list records remaining differences rather than claiming exact perfection.
- Typecheck and lint pass, or failures are documented.
- Update `docs/BUILD_STATUS.md` and stop after the visual foundation.

### Required response when done

Provide the design system inventory, paths to assets, visual choices, screenshot evidence, known mismatches and Step 2 acceptance status.

---

# Step 3: Implement all five high-fidelity screens and navigation

## Prompt to give the coding agent

Continue from Steps 0 through 2. Read the docs first. Implement the five primary Ascendia screens so they closely follow the supplied references and form one cohesive Android application. Prioritize visual fidelity, real mobile spacing and usable interactions. Do not start cloud services or server roles.

## A. Home screen

Implement these sections in this general visual order:

1. Compact ASCENDIA branding and optional account or settings action.
2. Large character hero integrated into a cosmic environment.
3. Player name, class title and rank crystal.
4. Current level and XP progress toward the next level.
5. Day streak and best streak summary cards.
6. Today's Quests panel with completion count and progress bar.
7. Compact quest rows with icon, title, reward and completion state.
8. Prominent Create Quest gradient action.
9. Weekly progress panel with active tracked goals.
10. Daily Essence or a similar reward teaser only if clearly labeled as not implemented or soon, unless a defined working demo behavior is delivered.
11. Persistent five-tab navigation.

On smaller Android screens, use a performant scroll container. Keep quest actions easy to reach. Avoid stacking giant hero artwork and pushing the task list too far down.

## B. Quests screen

Follow the multi-screen reference. Include:

- Title and a filter/settings action.
- Filters for Daily, Weekly, Milestone and One-Time.
- Active quest list with distinct categories and compact cards.
- Progress or completion state for each item.
- Add Quest action.
- Quest creation and edit form route or modal.
- An easy way to reach completed and archived quests.
- Empty states for filters with no items.

A quest row tap should open its details or edit flow. A completion control should complete the relevant occurrence only once. Weekly and milestone quests should have a progress entry action instead of behaving like daily checkbox rows.

## C. Player screen

Follow the reference with:

- Character artwork and class identity.
- Rank crystal and current rank.
- Player level and XP bar.
- Six colorful attribute tiles: STR, END, INT, DIS, VIT and WIS.
- Rank ladder E, D, C, B, A, S, SS, SSS.
- Current rank progress and next-rank requirement summary.
- Achievement history or a concise achievement section.

Any rank threshold shown as final must come from approved configuration. If thresholds are demo-only, label them as demo balancing values in `docs/DECISIONS.md` and keep them editable from one configuration file. Do not encode them inside UI components.

## D. Adventures screen

Create a cinematic portal or fantasy environment selection screen aligned with the collage. Use cards such as Void Nexus, Astral Spire, Hollow Crypt, Iron Bastion or Sage's Labyrinth only as themed demo content. If an adventure is not implemented, show a clear Coming Soon state. Do not claim that a card runs a real dungeon, battle, loot or equipment system.

## E. Profile screen

Include:

- Character avatar, player name, class and rank.
- A short editable status line if useful.
- Settings.
- Notifications preferences if implemented locally.
- Data and demo controls.
- About and app version.
- Clearly marked Coming Soon rows for unimplemented account, sync, social and subscription features.

Do not include an Inventory row. The master spec explicitly forbids inventory or gear management. Do not invent Admin, Staff or customer roles. This is a single-player local demo and has no server-backed role model.

## Navigation and responsive rules

- Exactly five primary tabs: Home, Quests, Player, Adventures and Profile.
- Maintain a stable selected-tab state and preserve relevant scroll position when practical.
- Tab icons need consistent active and inactive visual states.
- Use native pressable areas with accessible labels and sensible touch sizes.
- Reuse components rather than copying slightly different card code into every screen.
- The entire app must adapt to common Android portrait aspect ratios and avoid clipped content.

## Demo onboarding

Create a short first-run onboarding flow with:

1. Welcome to Ascendia.
2. Player name.
3. Character class selection from the six approved classes.
4. Male or female character presentation.
5. Selection of a small set of initial goals or interests.
6. Home timezone confirmation using a supported local method, or a clearly documented simplified demo timezone choice if a dependable selector is not feasible.
7. Create or accept seeded quests.
8. Enter Home.

Never force AI onboarding or account creation. Class and presentation changes in Profile must not reset XP or quest progress.

## Step 3 acceptance criteria

- All five screens are implemented using shared visual components.
- Navigation works from every tab and returns to the correct screen.
- Home, Quests, Player, Adventures and Profile are visually consistent with the supplied references.
- Onboarding can be completed and revisited through a clearly available demo reset.
- Buttons either perform the displayed action or visibly explain that the feature is not available in the demo.
- No inventory, equipment, fake combat, fake admin roles or fake backend.
- Android screenshot review performed where possible.
- Typecheck and lint pass, or failures are documented.
- Update `docs/BUILD_STATUS.md` and stop after all five screens are represented.

### Required response when done

Summarize each screen, route structure, responsive checks, implemented versus placeholder actions, screenshot evidence and Step 3 acceptance status.

---

# Step 4: Working quests, progression engine, and local SQLite persistence

## Prompt to give the coding agent

Implement the real working demo behaviors now. Read the master product spec and all project decisions before coding. The app must work offline with local phone storage. This is a local single-player demo, not a cloud-connected commercial release.

### Data storage

Use `expo-sqlite` for structured durable records and explicit migrations. Avoid using a single giant JSON object as the only source of truth. Use a repository layer between UI and SQLite. Implement transactions for completion and reward changes.

At minimum model:

- Profile and character identity.
- Player XP, level and rank state or a deterministic way to derive them.
- Six attribute progression values.
- Quest definition with stable ID, type, difficulty, attributes, schedule or target, units, active or archived state and revision.
- Completion records or scheduled occurrences.
- Progress entries for weekly and milestone quests.
- Reward ledger with unique event identity, XP amount, attribute distribution, quest revision snapshot and timestamp.
- Streak state or derivation data.
- User preferences including home timezone and week-start preference.
- Achievements where the demo uses them.

Add schema migrations and seed data. Seeding must happen only when the database is first initialized or after an explicit reset. Never replace a user's local data on every app launch.

### Quest behavior

Support all four types:

**Daily quests**
- User chooses scheduled weekdays.
- Permit one rewarded completion for each scheduled local date.
- Unscheduled days do not count as misses.
- Preserve past completions.

**Weekly quests**
- User sets a measurable target and unit.
- User can add manual progress increments.
- Follow the configured week start and confirmed home timezone.
- Award quest XP once per weekly occurrence when the target is reached.
- Repeated progress updates do not duplicate the reward.

**One-Time quests**
- Optional deadline.
- Overdue quests remain completable.
- Completion closes the active occurrence and preserves history.

**Milestone quests**
- Cumulative measurable target.
- Partial progress does not earn the full completion reward.
- Award once when the target is reached.
- Preserve the final history.

### XP and attribute rules

Use the approved difficulty base XP values from the specification:

- Very Easy: 10
- Easy: 20
- Normal: 35
- Hard: 60
- Epic: 100
- Legendary: 200

A completed quest awards the configured quest XP to the player, 100% of that award to the primary attribute and 50% to each of up to two distinct secondary attributes. Round half XP half-up. Attribute distribution does not multiply player XP.

The mockups contain some inconsistent reward examples. Record this in `docs/DECISIONS.md`. For the demo, use a clear difficulty-driven reward mapping unless the repository or user explicitly approves custom fixed XP. Put the mapping in one domain configuration file.

### Level and rank logic

- Keep level progression and rank progression deterministic.
- Avoid permanent invented rank thresholds. Store demo balancing thresholds in one config file and label them demo-only until approved.
- Follow the product direction that rank progression considers both level and long-term consistency. If full balance is beyond the prototype, implement a clear simple gate model and document its limits.
- Ranks must be displayed in the order E, D, C, B, A, S, SS, SSS.
- Character art selection should derive from rank, class and presentation. No gear, inventory, equipment or item mechanics.

### Streaks and missed goals

Implement scheduled-day streak behavior and a clear demo version of the grace and weakened-state rules only after defining the behavior in `docs/DECISIONS.md`. The specification mentions one weekly grace miss, a possible 10% future XP reduction and recovery after three successful days. Since some edge cases are not completely defined, keep the implementation conservative, visible to the user and easy to tune. Do not quietly apply hidden deductions.

Support correcting a genuine completion inside the specified 48-hour correction window. Reconcile the completion and reward ledger so XP and attributes are not duplicated. If full reversible reward-ledger reconciliation is not safe to implement in this step, disable historical correction rather than offer a broken correction action, and document it as an unresolved acceptance item.

### Atomicity and duplicate prevention
- Complete a quest and create its reward ledger event within one database transaction.
- Put a unique constraint or equivalent idempotency guard on the quest occurrence reward key.
- Disable the completion action while an operation is pending, but do not rely on UI disabling alone for duplicate prevention.
- On failure, roll back partial changes and show a readable error.
- Preserve the exact quest revision and reward details associated with historical completions.
- Editing a quest affects future completions only.
- Archiving removes a quest from active lists but preserves completion history.

### Local-first requirements

- No login required.
- No network required for core functionality.
- Reopening the app retains the player's profile, quests, progress and reward history.
- Provide Export Demo Data as a JSON file if a reliable local export path is available in the chosen Expo setup. Otherwise provide a deliberate copy or share path and document it. Never claim backup exists if it does not.
- Provide a clearly labeled Reset Demo Data action with a confirmation step. It should reseed only after the user confirms.

### User interactions to wire up

- Create a quest.
- Edit an active quest.
- Complete a daily or one-time quest.
- Add weekly progress.
- Add milestone progress.
- Archive a quest.
- Filter quests.
- Review completion history.
- Change class or presentation without resetting progression.
- View XP and attribute changes after completion.
- Trigger level-up and rank-promotion feedback when earned.

### Step 4 acceptance criteria

- Core data is stored in SQLite and survives a full app restart.
- All four quest types work according to the agreed demo rules.
- Repeated taps or retried completion calls cannot award duplicate XP.
- Quest edits do not rewrite historical reward snapshots.
- Weekly and milestone completion rewards are awarded once.
- The Home, Quests and Player screens render values from saved data, not hard-coded display values.
- Automated unit tests cover reward calculations, idempotency, quest scheduling boundaries, weekly targets and milestone targets.
- Database tests or integration tests verify transactional behavior where the test environment supports it.
- Offline mode has been checked by disabling network connectivity on a test device when possible.
- Update `docs/BUILD_STATUS.md` and stop after the local gameplay engine works.

### Required response when done

Describe the storage schema and migration strategy, quest rules implemented, test commands and outcomes, local restart test, duplicate XP test, known limitations and Step 4 acceptance status.

---

# Step 5: Premium motion, progression feedback, edge cases, and functional polish

## Prompt to give the coding agent

Polish the interactive experience. Read `AGENTS.md`, all docs, the references and the current implementation first. Do not replace reliable game logic with animation-specific shortcuts. Animation must react to confirmed state changes. The persisted data remains authoritative.

### Animation approach

Use React Native Reanimated for UI transitions and gestures. Use Lottie only where a suitable, legally usable asset exists and package size is acceptable. Use SVG and gradients for lightweight vector ornaments. Do not add a heavy game engine for this demo.

Implement these animations with restraint:

1. Screen entrance and tab changes with short fades or small translations.
2. Press feedback for buttons and quest cards.
3. Animated XP bar fill after a reward has been saved successfully.
4. Small XP gain text or spark effect tied to the confirmed reward result.
5. Quest completion state transition and checkmark animation.
6. Attribute tile value update.
7. Level-up overlay with readable level change and dismiss action.
8. Rank promotion ceremony with crystal glow, short scale or rotation, particles used sparingly, and clear Continue action.
9. Automatic character art transition when rank changes.
10. Subtle animated accent on active navigation and selected filters.

Animations should be short, interruption-safe and performant. Avoid constant large glowing loops, giant particle emitters or animations that make text hard to read. Do not delay quest saving until an animation finishes.

### Visual refinement

Compare Android screenshots against both reference images. Fix layout, typography, card density, borders, gradients, artwork cropping, scroll behavior and selected states. Keep the hero composition recognizably close to the reference while making controls genuinely usable. Avoid generic templates.

Tune for:

- Common Android portrait sizes and aspect ratios.
- Status bar and navigation bar contrast.
- Touch targets and scrolling.
- Text scaling and readable contrast.
- Image loading and tab state retention.
- Reduced motion preference where practical.
- Avoiding flicker or background image reload on tab switching.

### Working demo details

- All visible actionable controls must do something real or clearly say Coming Soon.
- Empty states and validation states must be designed, not left blank.
- Forms must validate titles, targets, units and attribute selections.
- Confirmation is required before resetting demo data or archiving if it could be accidental.
- Show useful feedback on success and failure.
- Provide a demo profile or seed data that resembles the reference state, including a Hunter-style identity, an illustrative rank, active daily quests, a weekly running goal, a language-study goal and a workout goal. Mark sample stats as demo data and ensure they are real local records.
- Make it possible to complete a quest and see the saved XP and attribute changes. If a level or rank promotion threshold is crossed, show the matching transition.
- Do not promise the Daily Essence feature works unless it has an implemented local reward behavior. It is safe to show it as Coming Soon.

### Validation and QA

Create `docs/QA_CHECKLIST.md` with manual test cases and run relevant checks. Include:

- First launch and onboarding completion.
- Restart persistence.
- All five tabs.
- Create, edit, complete and archive quests.
- Daily completion repeated twice.
- Weekly target reached exactly once.
- Milestone target reached exactly once.
- Incorrect input handling.
- Change class and presentation without data loss.
- Reset with confirmation.
- Rank promotion.
- Small-screen layout and scroll.
- App background and foreground.
- Reduced motion and accessibility labels where supported.

Run typecheck, lint, unit tests and any available Android build. Do not report visual QA complete from a build-only result. Capture screenshots of all five screens if a runtime is available. List any checks that could not be run and why.

### Step 5 acceptance criteria

- Progress animations are driven by saved, confirmed state.
- Rank evolution and level-up feedback play only when earned.
- Interactions remain responsive and don't duplicate state changes.
- No visible control is accidentally inert.
- Main screen layout matches the references as closely as possible within the real Android layout.
- Typecheck, lint and unit tests pass, or remaining failures are clearly documented.
- The manual QA checklist exists and has been used.
- `docs/BUILD_STATUS.md` updated and Step 5 stopped for review.

### Required response when done

Report each animation implemented, screenshot comparisons, QA results, performance issues, untested cases and Step 5 acceptance status.

---

# Step 6: Final hardening, Android demo build, handover, and definition of done

## Prompt to give the coding agent

This is the final hardening step for the Ascendia local demo. Read the root instructions, product spec, decisions, asset guide, visual audit, QA checklist and build status. Do not sneak in new product features. Focus on stability, reproducibility, clean handover and an Android deliverable.

### Final code audit

1. Review changed files and remove abandoned code, unused dependencies, starter assets and debug-only UI that is not part of the demo.
2. Check for `console.log`, placeholder handlers, `TODO` markers, dead buttons, broken image paths and silent error swallowing.
3. Verify that no em dash character appears in app copy, project documentation or generated text files. Search the repository and replace any occurrences.
4. Verify there is no inventory, loot, equippable gear, equipment statistics, gear management, combat loop or fake admin feature.
5. Verify that no API key, service secret or production credential exists in the repository.
6. Confirm that no backend or network service is required for the core demo.
7. Confirm local reset is deliberate and data is not cleared at startup.
8. Confirm the client can own the source repository and build the project without a developer-specific secret.

### Final functional validation

- First launch and onboarding.
- Five-tab navigation.
- Quest creation and editing.
- Daily quest completion and duplicate prevention.
- Weekly and milestone progress.
- XP and attribute distribution.
- Level and rank progression.
- Saved data after force-close and relaunch.
- Class or presentation changes.
- Reset demo flow.
- No internet required for core features.
- Key UI layouts and animations on Android.

### Android build and launch

- Use the build path already supported by the project's Expo setup.
- If Expo Go is sufficient for testing, document that route. If a native development build is required by installed modules, document the exact Android build command and prerequisites.
- Attempt an Android APK build if the environment and credentials allow it. If not possible, provide exact build instructions for the user's machine and explain the blocker honestly.
- Do not say an APK is available unless an actual APK file was produced and verified.
- Do not set up or claim iOS validation in this Android-only phase.

### Handover documents

Complete these files:

- `README.md`: overview, prerequisites, install command, run command, tests and Android build instructions.
- `AGENTS.md`: permanent project rules and phase workflow.
- `docs/ASCENDIA_DEMO_SPEC.md`: final delivered scope.
- `docs/DECISIONS.md`: remaining assumptions, demo-only progression numbers and unresolved product choices.
- `docs/ASSET_GUIDE.md`: image locations, formats, licensing notes and replacement instructions.
- `docs/VISUAL_AUDIT.md`: final reference comparison and deviations.
- `docs/QA_CHECKLIST.md`: results, not just an empty checklist.
- `docs/BUILD_STATUS.md`: final status of every step.
- `docs/KNOWN_LIMITATIONS.md`: clear list of local-only data behavior, future features and anything not tested.

### Final delivery summary

Give a factual summary of:

1. What works in the demo.
2. Which five screens and flows are complete.
3. How local SQLite storage works and how demo data can be reset.
4. Which animations are implemented.
5. Exact commands used for typecheck, lint, tests, Android launch and APK build.
6. Actual pass or fail results.
7. Android APK path only if a real file was generated and verified.
8. Anything that still needs work.
9. Clear separation between working features, demo-only values, Coming Soon features and production-only future scope.

### Step 6 acceptance criteria

- Source is organized and reproducible.
- All automated checks that are available have been run and reported accurately.
- Key flows are tested manually or their unavailable test environment is disclosed.
- Reference files and project instructions are included.
- README and handover documents are complete.
- No em dashes remain in project text.
- No prohibited inventory or gear system exists.
- Android delivery status is factual and unambiguous.

Stop after the handover report. Do not add AI, subscriptions, social cloud features, or other roadmap items without a separate request.

---

# Master rules to keep in every step

1. Build one step at a time. Do not skip acceptance criteria.
2. Read `AGENTS.md` and the latest build status before every step.
3. Preserve existing work unless there is a verified reason to change it.
4. After each step, run the strongest checks possible and report their actual outcomes.
5. Never claim a build, emulator test, screenshot review or test passed without evidence.
6. Keep UI, domain rules and persistence separated.
7. SQLite is the authoritative local source of truth for quest progress and reward records.
8. The five primary tabs are fixed: Home, Quests, Player, Adventures and Profile.
9. No inventory or equippable gear, in any phase of this demo.
10. No em dashes in any generated user-facing or project text.
11. Treat the supplied artwork as the visual direction and reconstruct real UI components around it.
12. Keep the core demo useful with no internet connection.
13. Do not pretend cloud, AI, subscription, social or adventure gameplay has been implemented when it has not.
14. Optimize for visual fidelity and reliable day-to-day interactions, not feature count.