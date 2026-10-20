# ASCENDIA
## Complete Master Product, Visual Design, Gameplay, Technical and Business Specification

**Product:** Ascendia  
**Category:** Gamified habits, personal development, goal tracking, and AI-assisted coaching  
**Primary platform:** iPhone, distributed as a native App Store application  
**Future platform:** Android  
**Design direction:** Cosmic Horizon — premium anime fantasy RPG  
**Business model:** Free core application with optional Ascendia Pro subscription  
**Development status:** Existing prototype and gameplay foundation; commercial features and final visual design are not complete

---

# 1. THE CORE VISION

Ascendia is a personal development application that makes improving your real life feel like progressing through a fantasy RPG.

Users create a character, choose a class, establish goals, complete real-world quests, earn experience points, develop attributes, advance through ranks, and visually evolve their character.

The application must provide the emotional satisfaction of a role-playing game without distracting from the real-world habits it is intended to reinforce.

**Core philosophy:**

> Every real-world action contributes to your character's progression. As you become stronger, more disciplined, more knowledgeable, and more consistent in real life, your character grows alongside you.

Ascendia should encourage:

- Consistency over perfection.
- Long-term personal development.
- Meaningful, measurable progress.
- Positive motivation and accountability.
- Sustainable habits rather than compulsive engagement.
- Personal ownership of goals.
- Enjoyment of self-improvement.

The experience must be exciting, rewarding, and visually memorable, while requiring very little effort to record completed activities.

## Product priorities

1. Beautiful, immersive RPG visuals.
2. Reliable and intuitive habit tracking.
3. Meaningful long-term progression.
4. Fast quest completion and low-friction interactions.
5. Accurate records and persistent progress.
6. Personalization and social accountability.
7. Useful AI coaching.
8. Sustainable monetization.

A beautiful application that loses user data is unacceptable.

A reliable application that looks like a generic productivity dashboard also fails the product vision.

**Both visual excellence and engineering reliability are mandatory.**

---

# 2. VISUAL IDENTITY — COSMIC HORIZON

## Approved default visual theme

**Cosmic Horizon** is Ascendia's primary visual identity.

It combines:

- Original anime-inspired fantasy characters.
- Celestial landscapes.
- Floating islands and distant castles.
- Massive planets, stars, and cosmic skies.
- Magical energy.
- Dark fantasy architecture.
- RPG progression interfaces.
- Dramatic lighting and depth.
- Rich blue and violet illumination.

The app should feel like an actual fantasy adventure game, not a standard habit tracker with blue buttons.

## Artistic references

The visual direction draws inspiration from:

- High-quality anime fantasy RPG interfaces.
- The sense of character progression found in Solo Leveling.
- Cinematic fantasy character illustrations.
- Premium mobile RPG presentation.
- The visual polish of the original Lovable-built Ascendia prototype.

All final artwork and interface assets should be original or properly licensed. Do not copy copyrighted characters, game interfaces, or proprietary artwork.

## Color palette

Primary colors:

- Midnight navy: `#080D20`
- Deep cosmic blue: `#101B38`
- Electric sapphire: `#428BFF`
- Celestial cyan: `#75D9FF`
- Arcane violet: `#8765F5`
- Luminous lavender: `#B7A0FF`
- Pale starlight: `#E8F1FF`
- Muted silver: `#A7B5D0`
- Restrained gold: `#E9C77A`

These are starting design tokens, not a requirement to use flat fills everywhere. Final colors should be tuned against approved artwork and actual iPhone screenshots.

## Visual principles

### Artwork-first design

The application must use genuine illustrated assets, not attempt to simulate an entire fantasy world using CSS gradients and geometric shapes.

### Seamless character integration

Character artwork should blend naturally into its environment.

Avoid:

- Obvious rectangular portrait backgrounds.
- Poorly masked character images.
- Generic stock character illustrations.
- Low-resolution portraits.
- Giant empty hero panels.
- Random decorative circles.
- Disconnected rank and character components.

Use properly prepared character assets with transparent backgrounds when the composition requires transparency.

### RPG interface components

Use original, detailed visual components such as:

- Rank crystals and insignia.
- Luminous XP bars.
- Ornate fantasy buttons.
- Engraved or illuminated panel borders.
- Magical quest indicators.
- Illustrated class emblems.
- Subtle particles and ambient lighting.
- High-quality progression animations.

The UI should look handcrafted and cohesive.

### Typography

Use a distinctive, readable fantasy display font for headings, ranks, and ceremonial moments.

Use a highly legible modern font for quest details, descriptions, settings, and everyday interactions.

Never sacrifice usability for decorative typography.

### Motion

Use tasteful animation for:

- XP gains.
- Level-ups.
- Rank promotions.
- Quest completion.
- Character evolution.
- Major achievement unlocks.

Animations should be short, skippable where appropriate, and respectful of Reduce Motion accessibility settings.

Avoid continuous expensive effects that drain battery or reduce responsiveness.

---

# 3. PRIMARY APPLICATION NAVIGATION

Ascendia has **five main tabs**:

1. Home
2. Quests
3. Player
4. Adventures
5. Profile

The AI Coach is accessed through Home and relevant contextual interfaces, not through a sixth primary tab.

Each tab must have a consistent visual identity and intuitive navigation.

## Home

The main dashboard for the player's daily experience.

## Quests

The central location for creating, editing, organizing, and reviewing real-world goals.

## Player

The character's progression, attributes, ranks, achievements, and evolution.

## Adventures

The fantasy adventure layer, containing progression-themed experiences and future RPG systems.

## Profile

Account, preferences, social connections, privacy, character customization, and subscription management.

---

# 4. HOME SCREEN — PRIMARY DESIGN PRIORITY

The Home screen must be the most visually impressive and immediately useful screen in the app.

## Layout

### Header

Display:

- ASCENDIA branding.
- Subtle fantasy ornamentation.
- Relevant account/settings access.
- A clean, compact header.

### Character hero

Feature the player's actual character prominently.

The hero must display the correct:

- Class.
- Presentation.
- Rank.
- Character evolution stage.

The character should feel integrated into a cinematic environment.

### Rank and identity HUD

Show:

- Current rank crystal.
- Current level.
- Player name.
- Class identity.
- Appropriate character title, if supported.

All information must reflect saved player data.

### XP progression

Display:

- Current level XP.
- XP required for the next level.
- A visually distinctive progression bar.
The progress bar should look like an RPG interface element, not a generic web form control.

### Create Quest

A prominent, accessible Create Quest action.

It should be visually distinctive without taking up excessive screen space.

### Today's quests

Show the activities that matter today.

Quest rows should include:

- Quest title.
- Quest type where useful.
- Difficulty.
- Relevant XP reward.
- Completion or progress action.
- Completion state.

Keep quest rows compact.

Users should be able to begin interacting with their quests without scrolling through an oversized character display.

### Weekly and milestone progress

Surface relevant active progress-based goals in a compact format.

### Navigation

Use a polished, persistent five-tab navigation bar with clear active states.

## Home acceptance criteria

A user opening Ascendia should immediately understand:

- Who their character is.
- Their current rank and level.
- How close they are to leveling up.
- What they should do today.
- How to record an accomplishment.

The screen must look excellent on a real iPhone, not only in desktop mockups.

---

# 5. CHARACTER CREATION AND IDENTITY

## Initial onboarding

Keep initial onboarding quick.

Ask for essential information:

- Player name.
- Character class.
- Character presentation.
- A few initial personal goals or interests.
- Optional preferences for suggested quests.

Deeper personalization should be optional and can happen later.

## Character presentations

Support:

- Male.
- Female.

Character art should have clearly distinguishable presentations while maintaining consistent quality.

Users can change their presentation later without losing progress.

## Character classes

Six classes are approved:

### Warrior
Associated with physical strength, perseverance, and overcoming challenges.

### Ranger
Associated with endurance, exploration, consistency, and movement.

### Mage
Associated with intelligence, learning, curiosity, and mastery.

### Assassin
Associated with precision, focus, efficiency, and self-discipline.

### Guardian
Associated with resilience, health, protection, and stability.

### Scholar
Associated with wisdom, reflection, knowledge, and growth.

## Class mechanics

Classes are primarily identity and visual personalization.

**Classes do not provide gameplay advantages or XP bonuses.**

No class should be mathematically superior to another.

Players may change classes without resetting their character.

---

# 6. CHARACTER ART AND EVOLUTION

## Rank-based visual evolution

Characters evolve visually as the player advances through ranks.

The transformation should be dramatic across the full journey but gradual between neighboring ranks.

### E Rank
A novice adventurer.

- Minimal or basic clothing.
- Little or no armor.
- Modest magical effects.
- Simple clothing and minimal weapon details as part of the illustration.
- Weak or inexperienced appearance.

### D Rank
An early adventurer.

- Slightly improved clothing and decorative equipment depicted in the artwork.
- Subtle magical energy.
- Increased confidence.

### C Rank
A developing adventurer.

- More refined clothing or armor.
- Recognizable class identity.
- Stronger visual effects.

### B Rank
An accomplished adventurer.

- Distinctive class-themed visual details, such as illustrated armor or weapons.
- More elaborate costume.
- Noticeably stronger magical presence.

### A Rank
An elite adventurer.

- More elaborate class-themed costume and decorative weapon details.
- Significant magical energy.
- Stronger, more confident appearance.

### S Rank
An extraordinary adventurer.

- Powerful, intricate design.
- Dramatic magical effects.
- Elite armor or robes.

### SS Rank
A legendary adventurer.

- Highly elaborate class-specific design.
- Intense energy effects.
- Exceptional visual presence.

### SSS Rank
The ultimate character evolution.

- Most impressive character art.
- Maximum visual sophistication.
- Legendary presence.
- Distinctive class identity.
- A genuine sense of having earned the transformation.

## Evolution requirements

- Eight rank stages: E, D, C, B, A, S, SS, SSS.
- Six classes.
- Two presentations.
- Consistent visual language.
- Gradual transformations.
- High-resolution assets.
- Clean compositing.
- No accidental reuse of the same character for different ranks.

The full matrix is potentially **96 base character variants**, before optional cosmetic variations.

## Automatic visual evolution — no inventory or equippable gear

Character appearance changes **automatically** when the player reaches the appropriate rank. Optional subtle appearance distinctions may be influenced by developed attributes, but they are presentation-only.

Illustrated weapons, armor, clothing, and magical effects are **parts of the character artwork**, not collectible items or interactive equipment. For example, an E-rank Warrior may wear plain clothing, while an S-rank Warrior is automatically shown wearing elaborate armor with stronger magical effects. The player does not acquire, equip, unequip, upgrade, or manage these elements.

**Explicit exclusions — do not implement:**

- An inventory or item-storage interface, including a simplified inventory.
- Equippable or interchangeable weapons, armor, or gear.
- Equipment slots, gear rarity, loot drops, gear crafting, or equipment upgrades.
- Weapon or armor statistics, equipment-based attribute bonuses, or item-driven combat progression.
- Any requirement to manually equip gear to trigger rank-based character evolution.

These exclusions apply to the complete product vision, **not just the initial release**. They must not be added as assumed features or included in development estimates without explicit approval.

## Optional cosmetics (future expansion)

Optional cosmetics may offer simple, purely visual appearance choices in a future release. If included, customization should work through direct appearance selections or predefined character looks, **not an inventory, equippable gear, or item-management system**.

Rules:

- Cosmetics are entirely optional and must never prevent normal rank-based evolution.
- Any paid cosmetic access should remain available according to the clearly disclosed purchase terms.
- Cosmetics provide no gameplay advantage, attribute bonuses, or faster progression.
- No pay-to-win systems.
- The cosmetic system must not introduce loot collection, equipment slots, or gear management.

## Cost-conscious initial character art

The complete design envisions six classes, two presentations, and eight ranks (up to 96 base variants). **All 96 polished illustrations are not required at initial launch.** A smaller set of attractive, cohesive character assets, with simpler rank treatments or fewer distinct illustrations, is acceptable if agreed during scoping. The character-selection and rank-progression architecture should support adding the complete range of art later without rewriting the progression system.

The **Cosmic Horizon interface quality remains a priority** even if initial character illustration complexity is reduced.

---

# 7. PLAYER ATTRIBUTES

Every player has six core attributes:

| Attribute | Abbreviation | Represents |
|---|---|---|
| Strength | STR | Physical power and strength training |
| Endurance | END | Stamina, cardio, persistence |
| Intelligence | INT | Learning, studying, mental development |
| Discipline | DIS | Consistency, focus, self-control |
| Vitality | VIT | Health, recovery, wellness |
| Wisdom | WIS | Reflection, judgment, personal insight |

## Attribute progression

Completing quests awards attribute XP.

Attributes accumulate over the lifetime of the character.

A single quest may improve multiple attributes.

Attribute progression must be understandable, measurable, and visually rewarding.

The Player screen should show:
- All six attributes.
- Attribute levels or cumulative points.
- Progress toward the next level where applicable.
- Visual distinctions between attributes.
- Lifetime earned progress.
- Relevant progression history.

---

# 8. EXPERIENCE POINT SYSTEM

## Quest difficulty rewards

| Difficulty | Base XP |
|---|---:|
| Very Easy | 10 |
| Easy | 20 |
| Normal | 35 |
| Hard | 60 |
| Epic | 100 |
| Legendary | 200 |

## XP distribution

When a quest is completed:

- The player receives 100% of its awarded XP.
- The primary attribute receives 100% of awarded XP.
- Each selected secondary attribute receives 50% of awarded XP.
- Up to two secondary attributes may be selected.
- Secondary attributes must be distinct from the primary attribute.
- Fractional half-XP is rounded half-up.

Example:

A Hard quest awards 60 XP.

- Player: +60 XP.
- Primary attribute: +60 XP.
- Secondary attribute 1: +30 XP.
- Secondary attribute 2: +30 XP.

The player does not receive an additional 120 XP because of the attribute distribution.

## XP integrity

XP must never be duplicated through:

- Repeated button taps.
- App restarts.
- Network retries.
- Timezone changes.
- Editing completed quests.
- Historical corrections.
- Synchronization conflicts.

Use durable completion records and idempotent reward transactions.

---

# 9. QUEST SYSTEM

There are **four approved quest types**.

## A. Daily quests

Recurring activities scheduled for selected weekdays.

Examples:

- Exercise.
- Read.
- Study.
- Meditate.
- Complete a morning routine.

Rules:

- Users choose scheduled days.
- One completion per scheduled day.
- Completion earns the quest's configured XP.
- Unscheduled days do not count as missed scheduled completions.
- Completed days remain historically recorded.

## B. Weekly quests

Goals requiring a specified amount of progress within a week.

Examples:

- Run 20 miles.
- Exercise four times.
- Study six hours.
- Complete three strength workouts.

Rules:

- User defines a measurable target.
- Progress is added manually.
- Progress can be recorded in appropriate units.
- The weekly period follows the user's confirmed home timezone and week-start preference.
- A configurable completion target is supported.
- XP is awarded when the target is validly achieved, once per weekly occurrence.
- Repeated progress updates must not duplicate rewards.

The current implementation has supported manual progress before final reward-on-target behavior; a new implementation must explicitly build and test the reward milestone rather than assuming it already exists.

## C. One-Time quests

Single-completion activities.

Examples:

- Finish a book.
- Submit an application.
- Clean the garage.
- Complete a race.

Rules:

- Optional deadline.
- No deadline required.
- Overdue quests remain completable.
- Full XP remains available after the deadline.
- Completing the quest closes its active occurrence.
- Historical completion is preserved.

## D. Milestone quests

Long-term, measurable goals.

Examples:

- Run 100 total miles.
- Read 12 books.
- Save a target amount.
- Complete 100 workouts.

Rules:

- Numeric lifetime target.
- Progress accumulates over time.
- User can record progress in appropriate units.
- XP is awarded once when the milestone target is reached.
- Partial progress does not award the full quest XP.
- Completing the milestone preserves its history.

## Quest fields

Each quest should support:

- Title.
- Optional description.
- Quest type.
- Difficulty.
- Primary attribute.
- Up to two secondary attributes.
- Relevant schedule or target.
- Optional deadline where applicable.
- Unit of measurement where applicable.
- Active/archived state.
- Creation and revision metadata.

## Editing

Users can edit quests without erasing historical progress.

Important rules:

- Historical completions remain intact.
- Past rewards remain associated with the original quest configuration.
- Changes apply to future completions.
- Editing a quest must not retroactively alter previously earned XP.
- Quest revision history should support reliable correction and auditing.

## Archiving and deletion

Users should be able to remove quests from active use without corrupting their historical records.

Preserve completion and reward history.

---

# 10. STREAKS, MISSED QUESTS, AND PENALTIES

Ascendia should encourage accountability without becoming excessively punitive.

## Streaks

- Track consecutive successful scheduled occurrences.
- Display streaks where relevant.
- Preserve accurate streak history.
- Do not count unscheduled days as failures.
- Support recalculation after valid historical corrections.

## Missed quest consequences

Approved balanced penalty model:

- A missed scheduled quest can reset its streak.
- One grace miss is available per week.
- A weakened state can temporarily reduce future XP by 10%.
- The weakened penalty is recovered after three successful days.

The exact interpretation of successful recovery days and grace consumption must be defined consistently and tested against edge cases.

Penalties should be transparent.

No hidden XP deductions or arbitrary punishments.

## Historical corrections

Users may correct genuinely completed quests within a **48-hour correction window**.

Corrections must reconcile:

- Completion state.
- Earned XP.
- Attribute XP.
- Streaks.
- Penalty state.
- Relevant weekly or milestone progress.

Corrections must not generate duplicate rewards.

---

# 11. TIMEZONES, CALENDAR, AND SCHEDULING

The scheduling system must behave predictably during travel and daylight-saving transitions.

## Home timezone

- Suggest the device's current timezone during setup.
- Require the user to confirm their home timezone.
- Store a real IANA timezone identifier.
- Do not silently change the home timezone when the user travels.
- Allow manual timezone changes in Settings.

## Week start

Default: Monday.

Support configurable week-start behavior.

## Historical scheduling

Previously registered occurrences retain their relevant historical schedule and timezone interpretation.

Changes to schedule or timezone should affect future occurrences without silently rewriting history.
## Edge cases

Test:

- Daylight-saving transitions.
- Travel between timezones.
- Crossing midnight.
- Weekly boundaries.
- Offline completion.
- App restart.
- Repeated completion attempts.
- Historical corrections.
- Changes to quest schedules.

---

# 12. PLAYER SCREEN

The Player screen is the central character progression experience.

## Main sections

### Character display

Show the current character using the correct:

- Class.
- Presentation.
- Rank.
- Visual evolution stage.

### Level and rank

Show current level, rank, XP, and progress.

### Six attributes

Display all six attributes with clear progression.

### Rank progression

Provide a visual path through:

E → D → C → B → A → S → SS → SSS

### Promotion progress

Show progress toward the next rank.

### Achievements

Show unlocked achievements and major milestones.

### Character history

Show meaningful historical progression where supported.

## Rank progression philosophy

Ranks must represent sustained real-world effort.

Approved direction:

- Hybrid level and long-term consistency requirements.
- Meaningful active-day or consistency gates.
- Promotion requirements that are challenging but attainable.
- Target approximately one to two years of sustained engagement for SSS rank.
- Configurable requirements for balancing.

The exact numerical rank thresholds should be stored in configuration and tuned through testing.

Do not invent permanent rank thresholds without approval.

## Promotion trials

Rank promotion trials should advance through normal quest completion.

Avoid requiring users to perform unrelated artificial mini-games merely to advance.

Promotion should feel ceremonial and rewarding.

---

# 13. QUESTS SCREEN

The Quests tab is the complete quest management center.

Required capabilities:

- View active quests.
- Create quests.
- Edit quests.
- Archive quests.
- Inspect completed quests.
- View historical progress.
- Filter by quest type.
- See relevant schedules.
- Track Weekly and Milestone progress.
- Review quest rewards and difficulty.
- Access quest details.

The interface should remain efficient.

Users should not have to navigate multiple menus to complete a simple task.

Use fantasy-themed visuals without compromising readability.

---

# 14. ADVENTURES SCREEN

Adventures provides the fantasy progression layer.

Its purpose is to make real-world development feel like part of a larger journey.

Approved direction includes:

- Themed adventure experiences.
- Fantasy locations and environments.
- Progression-linked achievements.
- Rank-related experiences.
- Future dungeon-style presentation.

Earlier Ascendia concepts included environments such as:

- Hollow Crypt.
- Iron Bastion.
- Sage's Labyrinth.

These are concept examples, not a requirement to implement a complete dungeon engine immediately.

## Important design restriction

Adventures must support habit formation rather than compete with it.

Avoid:

- Time-consuming grinding.
- Pay-to-win mechanics.
- Inventory, loot, equippable gear, or equipment management.
- Gameplay that encourages users to ignore their real-world goals.

If Adventures is not ready at launch, display an attractive, clearly labeled future-feature screen rather than fake working mechanics.

---

# 15. PROFILE SCREEN

Profile is separate from Player.

Player focuses on progression and character development.

Profile focuses on identity, settings, privacy, and social features.

## Profile capabilities

- Player name.
- Character class.
- Character presentation.
- Profile appearance.
- Account settings.
- Home timezone.
- Week-start preference.
- Notification preferences.
- Privacy controls.
- Friends.
- Subscription management.
- Help and support.
- Data management.

Users should be able to change class and presentation without losing progress.

---

# 16. SOCIAL FEATURES

Social interaction is part of the long-term Ascendia vision.

## Initial social scope

- User profiles.
- Friends.
- Friend requests or invitations.
- Customizable sharing preferences.

## Privacy controls

Users choose whether friends can see:

- Level.
- Attributes.
- Streaks.
- Achievements.
- Activity summaries.

**Specific quests are private by default.**

Users should never have to expose sensitive personal goals to participate socially.

## Later social features

- Friendly competitions.
- Group challenges.
- Leaderboards.
- More advanced accountability features.

These are later-phase features, not mandatory for the first private beta.

---

# 17. AI COACH — ASCENDIA PRO

AI coaching is the flagship premium feature.

The AI should provide practical, personalized guidance rather than generic motivational messages.

## Initial AI onboarding

Optional questions may include:

- Current goals.
- Fitness interests.
- Weight or relevant personal metrics.
- Available training days.
- Preferred habit schedule.
- Experience level.
- Nutrition preferences.
- Desired areas of improvement.

Only collect information necessary for requested features.

## Adaptive AI planning

The AI can:

- Recommend quests.
- Suggest realistic schedules.
- Adjust plans based on progress.
- Identify overly ambitious goals.
- Suggest recovery or lighter days.
- Recommend gradual progression.
- Help balance different life priorities.

**AI-generated changes require user approval before modifying quests or schedules.**

## AI Coach interaction

Support:
- On-demand conversation.
- Home screen shortcut.
- Contextual assistance.
- Optional automatic coaching reviews.
- Personalized progress analysis.
- Actionable recommendations.

## Coaching philosophy

The AI should be:

- Supportive.
- Practical.
- Evidence-informed.
- Respectful of user autonomy.
- Transparent about uncertainty.
- Focused on long-term consistency.

Do not provide unsafe training or nutrition recommendations.

Avoid presenting the AI as a substitute for qualified medical care.

---

# 18. NUTRITION FEATURES

Nutrition is part of the premium roadmap.

## First nutrition release

Prioritize:

- AI meal planning.
- Personalized meal suggestions.
- Grocery lists.
- Meal plans aligned with goals.
- Dietary preferences.
- Practical preparation guidance.

## Later nutrition release

Add:

- Nutrition logging.
- Calorie tracking.
- Macronutrient tracking.
- Progress summaries.
- Connections between nutrition goals and relevant quests.

Nutrition tracking should not delay the initial free-core beta.

---

# 19. MONETIZATION

Ascendia uses a hybrid free and premium model.

## Free tier

The free version must provide a genuinely useful experience.

Core capabilities should include:

- Character creation.
- Classes and presentations.
- Core quest tracking.
- XP.
- Attributes.
- Levels.
- Rank progression.
- Basic streaks.
- Basic progression history.
- Essential habit-tracking functionality.

Do not make ordinary habit completion dependent on payment.

## Ascendia Pro

Approved pricing:

**$6.99 per month**

**$59.99 per year**

**7-day free trial**, subject to final billing configuration and store requirements.

Primary Pro benefits:

- Adaptive AI quest planning.
- AI Coach conversations.
- Optional automatic coaching reviews.
- Personalized recommendations.
- AI meal planning.
- Grocery lists.
- Future advanced nutrition features.
- Other genuinely valuable premium functionality.

Pro should feel like a substantial upgrade rather than a collection of cosmetic restrictions.

## Referral rewards

Approved referral direction:

A user who refers a friend receives **one free month of membership when the referred friend purchases a month of membership**.

Implementation requires appropriate safeguards against duplicate referrals, self-referrals, and subscription abuse.

## Rewarded advertisements

Optional rewarded ads are planned for a later release.

Requirements:

- User chooses whether to watch.
- Rewards are clearly disclosed.
- No forced advertising to complete essential quests.
- Rewards must not undermine fair progression.
- No deceptive reward mechanisms.

Exact ad rewards and limits are not finalized.

## Cosmetics

Optional appearance-only cosmetic monetization may be explored in a later phase. It must not involve inventory, item collection, equipment slots, or equippable gear.

Rules:

- No gameplay advantages or attribute bonuses.
- No unfair rank acceleration.
- Continued access to purchases where promised.
- Clear prices and purchase terms.
- Direct visual appearance selection only; no gear-management mechanics.

---

# 20. ONBOARDING EXPERIENCE

The first-time experience should be quick, exciting, and visually impressive.

Suggested sequence:

1. Welcome to Ascendia.
2. Enter player name.
3. Select class.
4. Select character presentation.
5. Choose initial development goals.
6. Confirm home timezone.
7. Create or accept initial quests.
8. Enter the Home dashboard.

Optional AI personalization can follow.

Do not require a lengthy questionnaire before the user can experience the application.

The first completed quest should provide satisfying feedback and demonstrate how XP, attributes, and progression work.

---

# 21. NOTIFICATIONS AND ENGAGEMENT

Planned capabilities include:

- Optional quest reminders.
- Scheduled habit reminders.
- Weekly progress summaries.
- Milestone notifications.
- Rank promotion notifications.
- AI coaching review notifications where enabled.

Notifications must be configurable.

Avoid excessive, guilt-inducing, or manipulative notifications.

Respect quiet hours and device notification permissions.

---

# 22. TECHNICAL ARCHITECTURE

The implementation service may change, but the following engineering requirements remain.

## Preferred application architecture

- Native iOS-first experience.
- React Native and Expo are an established implementation option.
- TypeScript for application logic.
- Clear separation between game engine, persistence, and UI.
- Offline-first behavior.
- Durable local data storage.
- Reliable future account synchronization.
- Automated tests.
- Version-controlled source code.

A different service or framework may be used if it can meet the same quality, data integrity, visual, and App Store requirements.

## Existing architecture to preserve conceptually

The current Codex implementation uses:

- React Native.
- Expo.
- TypeScript.
- SQLite.
- Deterministic quest scheduling.
- Transactional completion records.
- Revisioned quest definitions.
- Historical reward snapshots.
- Local-first operation.
- Automated regression tests.

A restart should preserve these behavioral guarantees, even if the implementation is rewritten.

## Future services under consideration

- Supabase for accounts, synchronization, and social data.
- RevenueCat for subscription management.
- Secure backend services for AI features.
- Expo Application Services for builds and distribution.
- Automated CI and device testing.

These are implementation choices, not permission to add cloud services unnecessarily during the design prototype.

---

# 23. DATA INTEGRITY AND PERSISTENCE

This is a non-negotiable engineering requirement.

## Core principles

- User progress must survive app restarts.
- Completing a quest must be atomic.
- Duplicate taps must not duplicate XP.
- Reward history must remain auditable.
- Quest edits must preserve past rewards.
- Failed operations must not partially apply.
- Historical corrections must reconcile rewards correctly.
- Offline use must remain reliable.
- Synchronization must not silently erase local progress.

## Data entities

At minimum, model:

- Player profile.
- Character identity.
- Attributes.
- Level and XP.
- Rank progression.
- Quest definitions.- Quest revisions.
- Scheduled occurrences.
- Completion records.
- Progress entries.
- Reward ledger.
- Streak history.
- Penalty state.
- Promotion progress.
- Achievements.
- Privacy settings.
- Friends and invitations.
- Subscription entitlements.
- AI preferences and recommendations.

## Device migration

Expo Go prototype data must not be assumed to transfer automatically to the eventual App Store application.

Plan a deliberate migration or onboarding approach.

When cloud sync is introduced, document how local and remote records are reconciled.

---

# 24. SECURITY AND PRIVACY

Protect user data by design.

Requirements:

- Private quests by default.
- Explicit sharing controls.
- Secure account authentication when accounts launch.
- Appropriate encryption in transit.
- Minimal collection of personal information.
- Secure storage of tokens and credentials.
- No exposed AI provider secrets in client code.
- Appropriate access controls for social data.
- Account deletion and data export paths.
- Clear privacy disclosures.
- Secure subscription entitlement verification.

AI features should receive only the data necessary for the requested coaching task.

Avoid sending entire private quest histories to third parties without clear purpose and disclosure.

---

# 25. ACCESSIBILITY

The application must support:

- Dynamic Type or appropriate text scaling.
- VoiceOver.
- Adequate color contrast.
- Accessible button labels.
- Usable touch targets.
- Reduced Motion.
- Safe-area layouts.
- Keyboard accessibility where relevant.
- Readable quest content over artwork.

Fantasy styling must never make ordinary interactions difficult.

---

# 26. PERFORMANCE REQUIREMENTS

Ascendia should feel fast and polished on an actual iPhone.

Important requirements:

- Home background should not visibly reload on every tab switch.
- Character artwork should not cause obvious delays.
- Avoid unnecessary image remounting.
- Keep scrolling smooth.
- Minimize memory-heavy full-screen artwork.
- Use properly sized and compressed assets.
- Avoid excessive continuous animations.
- Keep quest completion responsive.
- Prevent expensive UI operations from blocking gameplay actions.

The original prototype experienced slow background appearance when returning to Home. This is a known issue that a new implementation should explicitly test.

Automated tests cannot replace real-device performance testing.

---

# 27. VISUAL DESIGN DELIVERY REQUIREMENTS

Before implementing a production screen, create a high-fidelity approved design.

## Required design deliverables

For each main screen:

- Full iPhone portrait mockup.
- Accurate layout measurements.
- Typography specifications.
- Color and gradient tokens.
- Original artwork assets.
- Rank and class variants.
- Interaction states.
- Empty states.
- Completed states.
- Error states.
- Responsive rules.
- Accessibility considerations.
- Animation specifications.

## Design-to-code workflow

1. Create visual concept.
2. Review against the Cosmic Horizon direction.
3. Refine until approved.
4. Produce reusable assets and a design specification.
5. Implement using real application components.
6. Connect actual game data.
7. Test on iPhone.
8. Compare screenshot against approved design.
9. Fix discrepancies.
10. Approve and commit.

Do not treat a successful build or passing test suite as visual approval.

---

# 28. RELEASE ROADMAP

## Phase A — Visual and product foundation

- Finalize Cosmic Horizon design system.
- Approve all five primary screens.
- Establish character artwork direction.
- Build reusable fantasy UI components.
- Define accessibility and responsive behavior.

## Phase B — Free core

- Onboarding.
- Character creation.
- Classes and presentations.
- Four quest types.
- XP and attributes.
- Levels and ranks.
- Streaks and penalties.
- Historical corrections.
- Local persistence.
- Core Player and Quests interfaces.

## Phase C — Private beta

- Test with real users.
- Validate usability.
- Test scheduling edge cases.
- Confirm progression balance.
- Measure performance.
- Fix critical bugs.
- Improve visual polish.

## Phase D — Commercial infrastructure

- Accounts.
- Cloud synchronization.
- Social profiles.
- Friends.
- Subscription infrastructure.
- Privacy and security controls.
- Reliable entitlement handling.

## Phase E — Ascendia Pro

- AI Coach.
- Adaptive quest planning.
- Coaching reviews.
- AI meal plans.
- Grocery lists.
- Premium onboarding.

## Phase F — Expanded features

- Nutrition tracking.
- Advanced social competitions.
- Rewarded ads.
- More cosmetics.
- Expanded Adventures.
- Additional progression content.

Features may be rearranged when dependencies or user testing justify it, but the first private beta should prioritize a stable free core.

---

# 29. BUSINESS GOALS

Ascendia is intended to become a real revenue-generating application.

It is not merely a personal habit tracker.

The business should focus on:

- Strong free-user experience.
- Meaningful paid upgrades.
- User retention through genuine progress.
- Referrals and organic growth.
- Attractive visual identity.
- Sustainable subscription revenue.
- Trustworthy data handling.
- Long-term user satisfaction.

Avoid monetization that undermines the product's motivational purpose.

The visual design should be strong enough to stand out in App Store screenshots and marketing.

---

# 30. STRICT PRODUCT EXCLUSIONS

Do not:

- Turn Ascendia into a generic checklist app.
- Replace original fantasy artwork with random gradients and circles.
- Build **any** inventory, collectible/equippable gear, equipment-slot, loot, or equipment-stat system.
- Add pay-to-win mechanics.
- Make classes mechanically unequal.
- Change XP formulas without approval.
- Award duplicate XP.
- Erase progress when editing quests.
- Silently change the user's home timezone.
- Make private quests publicly visible by default.
- Invent functionality that is not implemented.
- Make AI-generated changes without user approval.
- Require extensive onboarding before first use.
- Overload the interface with unnecessary interactions.
- Treat passing tests as proof of good visual design.
- Change the approved five-tab navigation without approval.

---

# 31. DEFINITION OF SUCCESS

Ascendia is successful when:

**Visually:** It looks and feels like a premium fantasy RPG, with beautiful original character art, cinematic environments, and distinctive UI.

**Functionally:** Users can create, track, and complete goals quickly and reliably.

**Motivationally:** Character progression makes real-world consistency feel rewarding.

**Technically:** Progress is durable, XP is correct, scheduling is predictable, and the app performs smoothly.
**Commercially:** The free experience attracts users, while Ascendia Pro provides genuinely useful AI coaching and other premium benefits.

**Emotionally:** Users look forward to opening Ascendia because they are excited to see themselves and their character progress.

---

# 32. MASTER INSTRUCTION TO ANY NEW APP BUILDER

Build Ascendia as a production-quality, iOS-first, anime-inspired RPG personal development application.

Use the Cosmic Horizon design language: cinematic celestial fantasy environments, premium original anime character artwork, luminous blue and violet magical interfaces, ornate rank crystals, immersive character progression, and visually exceptional screen composition.

Implement five main tabs: Home, Quests, Player, Adventures, and Profile.

Support six character classes, two character presentations, six attributes, eight ranks from E to SSS, four quest types, deterministic XP rewards, scheduling, streaks, balanced penalties, historical corrections, and reliable offline-first persistence.

Design the interface so that real-world habit completion is fast, clear, and satisfying.

Keep classes and cosmetics free of gameplay advantages.

Build toward private profiles, friends, AI coaching, nutrition planning, and Ascendia Pro subscriptions at $6.99 monthly or $59.99 yearly with a seven-day trial.

Do not sacrifice visual quality for convenience or engineering integrity for aesthetics.

**The ultimate objective is to combine the visual quality of a polished anime RPG with the dependable functionality of a professional personal development application.**

Do not begin a full production implementation by inventing screen designs.

First deliver a beautiful, high-fidelity, cohesive visual prototype for approval, then implement it against the approved design specification.