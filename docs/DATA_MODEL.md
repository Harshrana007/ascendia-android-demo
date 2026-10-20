# Proposed Local Data Model

This is a design proposal for implementation after approval. It is not a statement that a database already exists.

## Entities

### Player profile
- Stable profile identifier.
- Player display name.
- Selected class and presentation.
- Onboarding completion.
- Confirmed IANA home timezone.
- Week-start preference, Monday by default.
- Created and updated timestamps.

### Progression
- Player lifetime XP and current level, or deterministic derivation from saved reward events.
- Rank state or deterministic rank eligibility based on approved configuration.
- Six cumulative attribute XP values.
- Streak and penalty history needed to derive current display state.
- Achievement records for achievements supported by the demo.

### Quest definition and revision
- Stable quest ID.
- Title, description, type, difficulty.
- Primary attribute and up to two distinct secondary attributes.
- Schedule or measurable target.
- Target unit when appropriate.
- Optional deadline for one-time quests.
- Active or archived state.
- Revision number and created/updated timestamps.

### Occurrence, progress and completion
- A stable occurrence ID for each scheduled daily or weekly quest period.
- Local-date and timezone interpretation for scheduled occurrences.
- Progress entries for weekly and milestone quests, including amount, unit and timestamp.
- Completion records, completion time, occurrence key and the applicable quest revision.

### Reward ledger
- Unique reward event ID and unique occurrence or milestone reward key.
- Rewarded XP amount.
- Attribute distribution amounts.
- Snapshot of quest revision, difficulty, selected attributes and reward config.
- Event timestamp and correction linkage if a valid historical correction is supported.

## Integrity requirements

- Quest completion and its reward effects are atomic.
- A unique key prevents the same occurrence from awarding twice.
- Editing a quest affects future occurrences and preserves historical snapshots.
- Archiving hides a quest from active lists but retains history.
- Failed writes do not partially update player XP or attributes.
- Seeding only occurs on first initialization or confirmed reset.
- Schema changes use versioned migrations.
- Recompute derived progress from the authoritative event records where necessary.

## Boundary

No user account, social graph, cloud sync, subscription entitlement, AI history or server-side table belongs in the local demo database unless a separate approved scope is provided.
