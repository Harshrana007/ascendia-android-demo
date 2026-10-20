# Decisions and Open Questions

## Decisions already governed by the product brief

1. Android-only local demo. The full master specification describes a broader iOS-first product; the current delivery target is intentionally different.
2. Exactly five primary tabs: Home, Quests, Player, Adventures, Profile.
3. Classes are identity-only with no XP bonus.
4. Character art evolves automatically with rank.
5. No inventory, loot, equipment slots, equippable gear, gear stats, crafting, equipment upgrades, or combat.
6. No backend, login, cloud sync, AI, subscriptions or social services in this demo.
7. SQLite is the intended source of truth for structured local quest and reward data.
8. Persist a completion and its reward transactionally before running visual reward feedback.
9. Supplied visuals control style, while the written rules control behavior.
10. Never report unsupported build or test success.

## Decisions requiring clarification before the affected behavior is finalized

### Progression
- Exact level XP curve.
- Exact hybrid rank requirements based on level and long-term consistency.
- Whether an early demo uses temporary thresholds. If so, label them demo-only and keep them in a single configuration file.
- How a promotion requirement behaves if XP threshold is met but an active-day or consistency gate is not.

### Rewards
- Whether quests always use base XP by difficulty in the demo or whether user-configured rewards are permitted. Default recommendation for faithful implementation: use the approved difficulty table unless the master product owner confirms exceptions.
- Exact rounding and distribution UI wording. Rule: player XP gets the award; attribute XP is separate and not additive to player XP.

### Streaks and corrections
- When a weekly grace miss is consumed and whether it preserves streak, avoids penalty, or both.
- Exact three-successful-day recovery rule for the 10% weakened state.
- How retroactive correction affects the original week versus current week.
- If the ledger cannot safely reverse/reapply derived rewards, disable historical corrections rather than show an unsafe control.

### Schedule and progress editing
- Behavior when a weekly or milestone target is lowered below existing progress.
- Behavior when scheduled days are removed after occurrences exist.
- How home timezone changes affect future schedule generation and preserved historical occurrences.
- How conflicting offline records would merge in a future cloud phase. Not in scope now, but the local occurrence IDs should be designed with a future stable identity.

### Assets and visual treatment
- Approve the initial character art count and grouping of ranks to visual stages.
- Confirm whether the Hunter wording shown in the reference is character title/copy only, not a seventh class. The approved class list remains unchanged.
- The Home reference's "83% to Rank S" wording conflicts with its level XP numbers and with the Player reference's "Next Rank: Reach Level 50". Clarify whether the Home percentage means next level or rank eligibility; do not conflate these progress measures.
- Daily Essence appears in a visual reference but lacks fully specified demo behavior. Keep Coming Soon unless a working behavior is approved.
- Remove Inventory from the Profile reference because product rules prohibit it.

## Repository and environment

- At audit the repo was empty. The current codebase must be created only after user approval of the next step.
- Repository visibility is currently returned as public, despite the initial request for private. The current GitHub actions do not expose a visibility change. Make the repo private in GitHub settings before placing confidential material in it.
- The PNG source files are present in the current session but are not tracked in Git yet. Copy them byte-for-byte to canonical paths before Step 0 is marked complete.
