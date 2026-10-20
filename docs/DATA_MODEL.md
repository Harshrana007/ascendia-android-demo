# Local Data Model

## Database initialization

The app opens `ascendia.db` asynchronously through Expo SQLite. The schema is version 2, tracked with `PRAGMA user_version` and `schema_migrations`. Startup requests WAL mode, enables and verifies foreign keys, applies the migration transactionally, then loads saved player state. An initialization error is shown with a retry action instead of inventing sample progress.

## Tables

| Table | Purpose |
|---|---|
| `schema_migrations` | Applied schema version and timestamp. |
| `player_profile` | One local player, identity, class/presentation, interests, home timezone, week start and preferences. |
| `player_progression` | Lifetime player XP, rank, level fields and streak summary. Total XP is authoritative; level values derive from the central demo rule. |
| `player_attributes` | Six attribute balances: STR, END, INT, DIS, VIT and WIS. |
| `quests` | Current definition, type, difficulty, attributes, schedule or target, deadline, current revision and archive time. |
| `quest_revisions` | Historical quest configuration snapshots with revision and effective local date. |
| `quest_occurrences` | Daily date, weekly period, one-time occurrence or lifetime milestone. The occurrence key is unique. Status includes scheduled, completed, missed, archived and corrected. |
| `progress_entries` | Positive measured additions linked to an occurrence and unit, with correction validity. |
| `completions` | Completion time, occurrence, local date, timezone, revision and original quest snapshot. A partial unique index allows one valid completion per occurrence; corrected rows remain as history. |
| `reward_ledger` | Unique reward key, base XP, actual XP, attribute-allocation snapshot, reason and optional reversal relationship. |
| `streak_history` | Reconciled scheduled-day outcome, timezone, period key and grace usage. |
| `weekly_grace_usage` | Unique player/week grace record. |
| `penalty_state` | Current provisional penalty and recovery progress. |
| `penalty_events` | Reconciled penalty start, miss, recovery-day and end timeline. |
| `rank_promotions` | Reserved promotion history. No rows are written while rank gates are disabled. |
| `achievements` | Local unlock records unique by player and achievement key. |
| `preference_revisions` | Historical timezone and week-start snapshots. |
| `adventure_states` | Local single-player state for the three curated adventures, including status and timestamps. Adventure records do not create XP rewards. |

## Constraints and transactions

Foreign keys connect profiles, quests, occurrences, completions, rewards and history. Indexes support active-quest lookup, occurrence dates, progress and completion history. User-entered values use parameterized queries.

Onboarding, quest create/edit/archive, completion, measured progress, XP allocation and correction use exclusive transactions. A reward key and a partial unique index for valid completion are database-level duplicate protections. Correction invalidates the original completion and progress entries, adds a compensating reward reversal, restores XP/attribute balances and reconciles streak state.

## Reset and limitations

Reset is confirmed in Profile. Reversal rewards are deleted before their parent rewards, followed by dependent completions, progress, occurrences and profile records. The schema remains. There is no cloud backup, and Android data clearing or uninstall may remove local records.

Schema version 2 adds `adventure_states` with a versioned migration from schema version 1. Future schema changes need another versioned migration. Penalty event rows are rebuilt as a projection from saved occurrences; the completion and reward ledger remain the primary audit trail. Timezone travel and DST behavior need device-level validation.

## Adventure state semantics

Adventure state is a local presentation/workflow record only. The objective projection uses valid completion history for Daily and Weekly activities and valid Milestone completions, with partial milestone progress sourced from live quest occurrences. Adventure rows are deleted during confirmed local reset. Adventure completion does not insert reward-ledger events and does not change XP or attributes.
