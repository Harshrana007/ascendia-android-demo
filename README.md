# Ascendia Android Demo

Ascendia is an anime-inspired habit tracker where real-world quests drive character progression. The visual direction is Cosmic Horizon: cinematic celestial environments, original fantasy character art, luminous blue and violet UI, and meaningful progression feedback.

This repository is being prepared for an Android-first, local-only demo. The demo is intended to make the interface and core habit-tracking loop tangible without pretending that future cloud, AI, subscription, social, or dungeon features already work.

## Current status

The repository was empty at the initial audit. Step 0 is the foundation and repository-audit stage. No app implementation or successful build is implied by this README.

See `docs/BUILD_STATUS.md` and `docs/FOUNDATION_AUDIT.md` for the recorded status after the foundation documentation is committed.

## Product boundaries

- Five primary tabs: Home, Quests, Player, Adventures, and Profile.
- Six identity-only classes: Warrior, Ranger, Mage, Assassin, Guardian, and Scholar.
- Six attributes: Strength, Endurance, Intelligence, Discipline, Vitality, and Wisdom.
- Eight ranks: E, D, C, B, A, S, SS, and SSS.
- Four quest types: Daily, Weekly, One-Time, and Milestone.
- No inventory, equippable gear, loot, equipment statistics, equipment upgrades, or combat loop.
- The Android demo's core quest and progression behavior is intended to work offline, with SQLite as the structured local source of truth.

## Next steps

Follow the gated build workflow in `AGENTS.md` and `docs/BUILD_STATUS.md`. Complete one step, review its evidence, and commit it before starting the next. Do not proceed beyond Step 0 without explicit approval.

## Reference and ownership notes

The supplied reference material and master specification are user-provided project inputs. Their repository paths and availability are documented in `docs/ASSET_MANIFEST.md` and `docs/MASTER_SPEC_REFERENCE.md`. Do not copy third-party anime characters or protected artwork; commissioned production assets must be original, licensed, or otherwise authorized.
