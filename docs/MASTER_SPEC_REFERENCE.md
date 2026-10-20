# Master Specification Reference

## Source of truth

The user supplied `Ascendia_Master_Specification_Updated.md`, a 1,530-line product specification. Its repository reference copy is `docs/reference/Ascendia_Master_Specification_Updated.md`.

The supplied source was available in the conversation working files at `/mnt/data/Ascendia_Master_Specification_Updated(1).md`. The reference text has been added to this repository for use by future steps. The source file should be treated as product input, not silently rewritten as part of the demo.

The master specification says the broader product vision is iOS-first, with Android as a future platform, and describes an existing prototype. The current request intentionally defines a separate Android-only local demo. Preserve the product requirements and record the platform/prototype difference in `DECISIONS.md`. Do not infer that the remote repository contains an existing prototype: the repository was empty at audit.

## Requirements to preserve

- Cosmic Horizon, premium original anime-inspired fantasy presentation.
- Five primary tabs: Home, Quests, Player, Adventures, Profile.
- Six classes: Warrior, Ranger, Mage, Assassin, Guardian, Scholar.
- Two character presentations: male and female.
- Six attributes: STR, END, INT, DIS, VIT, WIS.
- Eight ranks: E, D, C, B, A, S, SS, SSS.
- Four quest types: Daily, Weekly, One-Time, Milestone.
- Difficulty XP: Very Easy 10, Easy 20, Normal 35, Hard 60, Epic 100, Legendary 200.
- Player receives 100% of awarded quest XP. Primary attribute receives 100%; up to two distinct secondary attributes each receive 50%. Half XP rounds half-up. Attribute XP does not multiply player XP.
- Scheduled daily completion, weekly measurable targets, one-time completion, cumulative milestones.
- Historical reward snapshots and preservation of completed history after quest edits.
- Transparent scheduled-day streaks, one weekly grace miss, possible 10% weakened XP state, recovery after three successful days, and a 48-hour correction window. Some edge cases require decisions before implementation.
- Confirmed home timezone stored as an IANA timezone identifier, Monday week start by default, and scheduling history that does not silently rewrite when preferences change.
- Durable offline-first progress, transaction safety, idempotent XP rewards, migration and regression tests.
- Rank progression designed around both level and sustained consistency, with exact numerical thresholds configurable and not permanently invented without approval.
- Automatic character-art evolution. No inventory, equippable gear, gear statistics, loot, equipment management, or combat loop.
- AI, cloud sync, authentication, social backend, subscriptions, and other commercial infrastructure are roadmap items outside this local demo.

## Conflict rule

The master specification governs behavior and exclusions. The supplied screenshots govern visual style and composition. Where they conflict, follow written product rules and log the discrepancy in `DECISIONS.md`.

## Reference integrity

Do not replace the source specification with a summary. This page is an index and decision aid; the complete supplied text is retained at the path above.
