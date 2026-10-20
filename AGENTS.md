# Ascendia Project Instructions

## Mission

Build Ascendia as an Android-first, local-only React Native demo that combines premium Cosmic Horizon anime-fantasy presentation with trustworthy habit tracking. The fantasy layer motivates. The saved records and deterministic rules are the source of truth.

Follow the staged workflow in `ASCENDIA_DEMO_BUILD_STEPS.md`. Work on one step at a time. Review changed files, run applicable checks, record evidence, make a descriptive Git commit for the completed step, and stop for review. Never continue to the next step without explicit user approval.

## Product rules

1. Product name: Ascendia. Visual identity: Cosmic Horizon.
2. This demo targets Android only. Do not set up or claim iOS validation in this phase.
3. The five primary tabs, in order, are Home, Quests, Player, Adventures, and Profile.
4. Approved classes are Warrior, Ranger, Mage, Assassin, Guardian, and Scholar.
5. Support the two approved character presentations, male and female.
6. Attributes are Strength (STR), Endurance (END), Intelligence (INT), Discipline (DIS), Vitality (VIT), and Wisdom (WIS).
7. Ranks are E, D, C, B, A, S, SS, and SSS.
8. Quest types are Daily, Weekly, One-Time, and Milestone.
9. Class selection is identity and appearance only. It grants no XP bonuses or gameplay advantage.
10. Character evolution is automatic and rank-based. Illustrated weapons, clothes, armor, and magical effects are part of the art, not collectible items.
11. Never implement inventory, loot collection, equippable gear, equipment slots, equipment statistics, crafting, equipment upgrades, or gear management.
12. Do not add combat loops, mandatory dungeon grinding, fake administrative roles, or invented backend behavior.
13. AI coaching, social services, subscriptions, cloud synchronization, and production services are outside this local demo unless the user approves a separate phase.
14. Coming Soon experiences must be clearly identified. Do not make nonfunctional controls look completed.
15. The master product specification governs behavior and exclusions. Supplied references govern visual direction. Document any conflicts instead of silently reconciling them.
16. Never permanently invent progression or rank thresholds that require product approval. Demo-only assumptions must be configured centrally and disclosed.

## Engineering rules

1. Use TypeScript with strict typing when app code is introduced.
2. Audit and preserve working project patterns and the current package manager. Do not replace lockfiles without evidence and a documented reason.
3. Separate UI, domain rules, persistence, assets, and configuration.
4. Use SQLite as the authoritative local store for structured quest, completion, and reward data.
5. Use database transactions for operations that must succeed or fail atomically.
6. Make reward operations idempotent. UI button disabling alone is not duplicate protection.
7. Preserve quest revisions and historical reward snapshots. Editing a quest must not rewrite past rewards.
8. Do not seed over user data on app launch. Reset requires explicit confirmation.
9. Do not let an animation determine whether a save succeeded. Persist confirmed state first, then animate.
10. Use accessible touch targets, readable copy, safe areas, Android system-bar handling, keyboard behavior, and back navigation.
11. Add only dependencies verified compatible with the installed Expo SDK and React Native version.
12. Test the strongest available cases and report exact commands and results. Never claim unrun builds, emulator checks, screenshot comparisons, or tests passed.
13. Do not expose credentials, tokens, private data, or secret values in source, logs, screenshots, or documentation.
14. Keep failures visible and recoverable. Do not silently swallow errors.

## Visual rules

1. Match supplied references as closely as practical and review rendered Android screenshots against them.
2. Use the supplied references as guides, not as flattened full-screen screenshots.
3. Prioritize cinematic original fantasy artwork, integrated characters, celestial depth, fine luminous borders, rank crystals, clear progress bars, and coherent visual hierarchy.
4. Starting palette: #080D20, #101B38, #428BFF, #75D9FF, #8765F5, #B7A0FF, #E8F1FF, #A7B5D0, and #E9C77A.
5. Use display typography for short headings and rank moments only where readable. Everyday quest text must remain highly legible and consistent.
6. Keep gradients and glow restrained enough to protect contrast and readability.
7. Respect reduced-motion preferences. Avoid expensive continuous effects.
8. Home must keep quest actions reachable and must not let oversized art crowd out the habit tracker.
9. Do not claim pixel-perfect fidelity without actual screenshot comparison.
10. Use original or properly licensed artwork. Anime is an inspiration for tone, not permission to copy protected characters, logos, or interfaces.

## Writing and communication rules

1. Do not use the em dash character in generated application copy, project documentation, source comments, or commit messages. Prefer commas, colons, semicolons, or a hyphen.
2. Write clear, concise, professional English with a human voice.
3. In suitable character feedback or promotional moments, original anime-fantasy phrasing and occasional light humor are welcome. Keep ordinary interactions calm and fast.
4. Do not invent functionality, imply unimplemented features work, or use placeholder marketing copy.
5. Use the exact approved product terminology consistently.

## Git and delivery rules

1. Inspect repository status, branch, and recent commits before making changes.
2. Preserve existing changes. Never reset, clean, force-push, rewrite history, or delete branches without explicit approval.
3. Do not stage or commit unrelated changes.
4. Each completed step gets a meaningful commit message explaining the change.
5. Keep the repository owned and controlled by the user. Do not publish secrets or add developer-controlled lock-in.
6. Update `docs/BUILD_STATUS.md` after each step with evidence, blockers, and the next approved action.
7. Stop after Step 0 and wait for explicit approval before Step 1.
