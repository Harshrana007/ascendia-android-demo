# Decisions and Open Questions

## Confirmed decisions

1. Current delivery target is an Android-first, local-only demo, even though the broader master specification describes an iOS-first commercial product.
2. Exactly five primary tabs: Home, Quests, Player, Adventures, Profile.
3. Classes are identity-only with no XP bonus.
4. Character art evolves automatically with rank.
5. No inventory, loot, equipment slots, equippable gear, gear stats, crafting, equipment upgrades, or combat.
6. No backend, login, cloud sync, AI, subscriptions or social services in this demo.
7. SQLite is the intended source of truth for structured quest and reward data.
8. The first repository code uses Expo Router, strict TypeScript and a centralized theme module.
9. Expo SDK 57 with React Native 0.86.3 and React 19.2.3 is the initial compatibility baseline. SDK 58 was announced on 2026-10-15; its release note said Expo Go distribution would roll out later. Reevaluate before a major SDK change. See https://expo.dev/changelog/sdk-57 and https://expo.dev/changelog/sdk-58.
10. The app identifier `com.example.ascendia` is a development placeholder, not a confirmed production package ID.
11. The starter theme uses system serif, sans-serif and monospace fallbacks. No custom font has been bundled or license-checked.
12. The repository uses npm scripts because the initial audit found no package manager or lockfile. Generate the lockfile in a network-enabled environment.

## Decisions requiring clarification before progression behavior is finalized

### Progression
- Exact level XP curve.
- Exact hybrid rank requirements based on level and long-term consistency.
- Whether the early demo uses temporary thresholds. If so, label them demo-only and keep them in a single configuration file.
- Behavior when the XP threshold is met but an active-day or consistency gate is not.

### Rewards
- Whether quests always use difficulty XP in the demo or can have user-configured rewards. Default recommendation: use the approved difficulty table unless the product owner confirms exceptions.
- Distribution display language. Player XP receives the award; attribute XP is separate and does not multiply player XP.

### Streaks and corrections
- When weekly grace is consumed and whether it preserves a streak, avoids a penalty, or both.
- The exact three-successful-day recovery rule for the 10% weakened state.
- How retroactive correction affects the original week versus current week.
- If the reward ledger cannot be reversed safely, disable historical correction rather than expose a broken control.

### Scheduling and edits
- Behavior when a weekly or milestone target is lowered below existing progress.
- Behavior when scheduled days are removed after occurrences exist.
- How home timezone changes affect future schedules and preserve historical occurrences.
- Future cloud conflict handling remains out of scope.

### Assets and visual treatment
- Approve initial character art count and rank-to-art mapping.
- "Hunter" in the screenshot is display copy, not a seventh class.
- Home's "83% to Rank S" conflicts with displayed level XP and Player's next-rank label. Clarify next-level versus rank eligibility.
- Daily Essence remains Coming Soon unless its behavior is approved.
- Remove Inventory from the Profile reference because product rules prohibit it.

## Repository and environment

- The initial repository audit found no code to preserve.
- The repo is reported as public despite the initial private-repository request. Change visibility in GitHub settings before adding confidential material.
- The reference PNGs remain outside the Git tree until transferred unchanged through a binary upload route.
