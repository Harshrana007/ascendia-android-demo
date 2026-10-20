# Product Scope: Ascendia Android Demo

## Objective

Produce a convincing interactive Android demo that follows the supplied Cosmic Horizon screens and proves the real-life habit to RPG progression loop. The interface should be recognizably faithful to the references, with cohesive typography, art placement, illuminated borders, rank crystals, readable quest rows, and consistent navigation.

The demo is not the full commercial application. Step 0 documents the foundation; later steps implement one layer at a time.

## Expected local demo functionality

After the implementation steps are approved, the demo should support:

- First-run onboarding with player name, approved class, character presentation, selected goals, confirmed home timezone, and initial quests.
- Five primary tabs: Home, Quests, Player, Adventures, Profile.
- Quest creation, editing, archiving, type filters, and history.
- Daily and one-time completion; weekly and milestone progress entry.
- Difficulty-configured XP awards, six attribute progress values, level updates, configured rank progression, and clear reward feedback.
- Scheduled-day streaks and any approved, transparent demo rules for grace and weakened states.
- Locally persisted profile, quests, progress, reward history, preferences, and relevant achievements.
- A deliberately confirmed reset action.
- Clearly identified Coming Soon screens for features outside scope.

## Visual acceptance

- Treat the supplied Home screenshot as the primary Home composition reference.
- Treat the multi-screen board as the reference for Quests, Player, Adventures, Profile, and rank evolution.
- Reconstruct actual native UI components. Do not use a whole screenshot as the app screen.
- Keep the cinematic hero while allowing real quest actions to remain reachable.
- Maintain a consistent type system, icons, spacings, panel shapes, borders, backgrounds and active navigation.
- Use the supplied original references during screenshot comparisons. Do not claim exact fidelity without comparison evidence.

## Explicitly excluded

- iOS setup, testing, or delivery in this demo step.
- Backend, login, cloud synchronization, social features, AI services, subscriptions, revenue systems, or admin portal.
- A complete combat or dungeon engine, mandatory grinding, loot, inventory, equippable items, gear slots, equipment stats, equipment crafting or upgrades.
- Fake success states for unavailable services.
- Unapproved permanent rank thresholds or reward rules.
- Production-ready 96-character artwork set. The system should support future asset expansion; the initial collection is deliberately scoped.

## Working versus illustrative content

A demo card may show an original fantasy place such as Void Nexus or Astral Spire, but it must be marked Coming Soon unless the experience is implemented. Reference stats can be used as seed data, provided they are real local records, not hardcoded display values. Daily Essence is a placeholder unless its rules and behavior are approved.

## Release boundary

Step 6 should deliver a reproducible Android demo and handover, not an App Store-ready commercial application. Production account security, billing, cloud operations, AI safety, social privacy and store release need separately scoped work.
