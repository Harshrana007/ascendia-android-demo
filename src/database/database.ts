import * as SQLite from "expo-sqlite";

export type AscendiaDatabase = SQLite.SQLiteDatabase;
const DATABASE_NAME = "ascendia.db";
const SCHEMA_VERSION = 1;
let openPromise: Promise<AscendiaDatabase> | null = null;

const migrationOne = `
CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY NOT NULL, applied_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS player_profile (
 id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL CHECK(length(trim(name)) >= 2),
 class_name TEXT NOT NULL, presentation TEXT NOT NULL, interests_json TEXT NOT NULL DEFAULT '[]',
 home_timezone TEXT NOT NULL DEFAULT 'UTC', week_start TEXT NOT NULL DEFAULT 'Monday',
 notifications_enabled INTEGER NOT NULL DEFAULT 0, reduced_motion INTEGER NOT NULL DEFAULT 0,
 onboarding_complete INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS player_progression (
 player_id TEXT PRIMARY KEY NOT NULL REFERENCES player_profile(id) ON DELETE CASCADE,
 total_xp INTEGER NOT NULL DEFAULT 0 CHECK(total_xp >= 0), level INTEGER NOT NULL DEFAULT 1 CHECK(level >= 1),
 rank TEXT NOT NULL DEFAULT 'E', xp_into_level INTEGER NOT NULL DEFAULT 0 CHECK(xp_into_level >= 0),
 xp_to_next_level INTEGER NOT NULL DEFAULT 1000 CHECK(xp_to_next_level > 0),
 daily_streak INTEGER NOT NULL DEFAULT 0 CHECK(daily_streak >= 0), best_streak INTEGER NOT NULL DEFAULT 0 CHECK(best_streak >= 0)
);
CREATE TABLE IF NOT EXISTS player_attributes (
 player_id TEXT NOT NULL REFERENCES player_profile(id) ON DELETE CASCADE,
 code TEXT NOT NULL CHECK(code IN ('STR','END','INT','DIS','VIT','WIS')),
 xp INTEGER NOT NULL DEFAULT 0 CHECK(xp >= 0), PRIMARY KEY(player_id, code)
);
CREATE TABLE IF NOT EXISTS quests (
 id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL CHECK(length(trim(title)) >= 2),
 description TEXT NOT NULL DEFAULT '', type TEXT NOT NULL CHECK(type IN ('Daily','Weekly','One-Time','Milestone')),
 difficulty TEXT NOT NULL CHECK(difficulty IN ('Very Easy','Easy','Normal','Hard','Epic','Legendary')),
 primary_attribute TEXT NOT NULL, secondary_attributes_json TEXT NOT NULL DEFAULT '[]', weekdays_json TEXT NOT NULL DEFAULT '[]',
 target REAL, unit TEXT, deadline_local_date TEXT, current_revision INTEGER NOT NULL DEFAULT 1,
 created_at TEXT NOT NULL, created_local_date TEXT NOT NULL, updated_at TEXT NOT NULL, archived_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_quests_active_type ON quests(type, archived_at);
CREATE TABLE IF NOT EXISTS quest_revisions (
 quest_id TEXT NOT NULL REFERENCES quests(id) ON DELETE CASCADE, revision INTEGER NOT NULL,
 effective_from_local_date TEXT NOT NULL, snapshot_json TEXT NOT NULL, created_at TEXT NOT NULL,
 PRIMARY KEY(quest_id, revision)
);
CREATE INDEX IF NOT EXISTS idx_quest_revisions_effective ON quest_revisions(quest_id, effective_from_local_date);
CREATE TABLE IF NOT EXISTS quest_occurrences (
 id TEXT PRIMARY KEY NOT NULL, occurrence_key TEXT NOT NULL UNIQUE,
 quest_id TEXT NOT NULL REFERENCES quests(id) ON DELETE RESTRICT, type TEXT NOT NULL,
 period_start TEXT NOT NULL, period_end TEXT NOT NULL, local_date TEXT NOT NULL, timezone TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'scheduled' CHECK(status IN ('scheduled','completed','missed','archived','corrected')),
 quest_revision INTEGER NOT NULL, progress REAL NOT NULL DEFAULT 0 CHECK(progress >= 0),
 target REAL, unit TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_occurrences_quest_date ON quest_occurrences(quest_id, local_date);
CREATE INDEX IF NOT EXISTS idx_occurrences_date_type ON quest_occurrences(local_date, type);
CREATE TABLE IF NOT EXISTS progress_entries (
 id TEXT PRIMARY KEY NOT NULL, occurrence_id TEXT NOT NULL REFERENCES quest_occurrences(id) ON DELETE RESTRICT,
 amount REAL NOT NULL CHECK(amount > 0), unit TEXT NOT NULL, note TEXT, created_at TEXT NOT NULL,
 is_valid INTEGER NOT NULL DEFAULT 1, corrected_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_progress_occurrence_created ON progress_entries(occurrence_id, created_at);
CREATE TABLE IF NOT EXISTS completions (
 id TEXT PRIMARY KEY NOT NULL, quest_id TEXT NOT NULL REFERENCES quests(id) ON DELETE RESTRICT,
 occurrence_id TEXT NOT NULL REFERENCES quest_occurrences(id) ON DELETE RESTRICT,
 completed_at TEXT NOT NULL, local_date TEXT NOT NULL, timezone TEXT NOT NULL, quest_revision INTEGER NOT NULL,
 quest_snapshot_json TEXT NOT NULL, is_valid INTEGER NOT NULL DEFAULT 1, corrected_at TEXT, correction_note TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_one_valid_completion_per_occurrence ON completions(occurrence_id) WHERE is_valid = 1;
CREATE INDEX IF NOT EXISTS idx_completions_date ON completions(local_date, completed_at);
CREATE TABLE IF NOT EXISTS reward_ledger (
 id TEXT PRIMARY KEY NOT NULL, reward_key TEXT NOT NULL UNIQUE,
 player_id TEXT NOT NULL REFERENCES player_profile(id) ON DELETE RESTRICT,
 quest_id TEXT NOT NULL REFERENCES quests(id) ON DELETE RESTRICT,
 occurrence_id TEXT NOT NULL REFERENCES quest_occurrences(id) ON DELETE RESTRICT,
 completion_id TEXT REFERENCES completions(id) ON DELETE RESTRICT, reason TEXT NOT NULL,
 difficulty TEXT NOT NULL, quest_revision INTEGER NOT NULL, base_xp INTEGER NOT NULL, awarded_xp INTEGER NOT NULL,
 attribute_allocations_json TEXT NOT NULL, penalty_applied INTEGER NOT NULL DEFAULT 0,
 is_reversal INTEGER NOT NULL DEFAULT 0, reverses_event_id TEXT REFERENCES reward_ledger(id), created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_rewards_player_created ON reward_ledger(player_id, created_at DESC);
CREATE TABLE IF NOT EXISTS streak_history (
 id TEXT PRIMARY KEY NOT NULL, player_id TEXT NOT NULL REFERENCES player_profile(id) ON DELETE CASCADE,
 local_date TEXT NOT NULL, timezone TEXT NOT NULL, week_key TEXT NOT NULL,
 outcome TEXT NOT NULL CHECK(outcome IN ('success','grace','miss')), grace_consumed INTEGER NOT NULL DEFAULT 0,
 evaluated_at TEXT NOT NULL, UNIQUE(player_id, local_date)
);
CREATE TABLE IF NOT EXISTS weekly_grace_usage (
 player_id TEXT NOT NULL REFERENCES player_profile(id) ON DELETE CASCADE, week_key TEXT NOT NULL,
 local_date TEXT NOT NULL, PRIMARY KEY(player_id, week_key), UNIQUE(player_id, local_date)
);
CREATE TABLE IF NOT EXISTS penalty_state (
 player_id TEXT PRIMARY KEY NOT NULL REFERENCES player_profile(id) ON DELETE CASCADE, active INTEGER NOT NULL DEFAULT 0,
 recovery_success_days INTEGER NOT NULL DEFAULT 0, started_at TEXT, ended_at TEXT, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS penalty_events (
 id TEXT PRIMARY KEY NOT NULL, player_id TEXT NOT NULL REFERENCES player_profile(id) ON DELETE CASCADE,
 local_date TEXT NOT NULL, timezone TEXT NOT NULL, event_type TEXT NOT NULL,
 metadata_json TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_penalty_events_player_date ON penalty_events(player_id, local_date);
CREATE TABLE IF NOT EXISTS rank_promotions (
 id TEXT PRIMARY KEY NOT NULL, player_id TEXT NOT NULL REFERENCES player_profile(id) ON DELETE CASCADE,
 from_rank TEXT NOT NULL, to_rank TEXT NOT NULL, level_at_promotion INTEGER NOT NULL,
 successful_scheduled_days INTEGER NOT NULL, policy_snapshot_json TEXT NOT NULL, promoted_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_rank_promotions_player_date ON rank_promotions(player_id, promoted_at DESC);
CREATE TABLE IF NOT EXISTS achievements (
 id TEXT PRIMARY KEY NOT NULL, player_id TEXT NOT NULL REFERENCES player_profile(id) ON DELETE CASCADE,
 achievement_key TEXT NOT NULL, title TEXT NOT NULL, unlocked_at TEXT NOT NULL, metadata_json TEXT NOT NULL DEFAULT '{}',
 UNIQUE(player_id, achievement_key)
);
CREATE TABLE IF NOT EXISTS preference_revisions (
 player_id TEXT NOT NULL REFERENCES player_profile(id) ON DELETE CASCADE, revision INTEGER NOT NULL,
 effective_from_local_date TEXT NOT NULL, timezone TEXT NOT NULL, week_start TEXT NOT NULL, created_at TEXT NOT NULL,
 PRIMARY KEY(player_id, revision)
);
`;

export async function openAscendiaDatabase(): Promise<AscendiaDatabase> {
 if (!openPromise) {
  openPromise = (async () => {
   const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
   await db.execAsync("PRAGMA foreign_keys = ON;");
   await db.execAsync("PRAGMA journal_mode = WAL;");
   const version = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version;");
   const currentVersion = version?.user_version ?? 0;
   if (currentVersion > SCHEMA_VERSION) throw new Error("This app cannot read database version " + currentVersion + ".");
   if (currentVersion < 1) {
    await db.withExclusiveTransactionAsync(async (tx) => {
     await tx.execAsync(migrationOne);
     await tx.runAsync("INSERT OR IGNORE INTO schema_migrations(version, applied_at) VALUES (?, ?)", 1, new Date().toISOString());
     await tx.execAsync("PRAGMA user_version = 1;");
    });
   }
   const fk = await db.getFirstAsync<{ foreign_keys: number }>("PRAGMA foreign_keys;");
   if (fk?.foreign_keys !== 1) throw new Error("SQLite foreign-key enforcement could not be enabled.");
   return db;
  })().catch((error) => { openPromise = null; throw error; });
 }
 return openPromise;
}

export async function resetDatabaseContents(db: AscendiaDatabase): Promise<void> {
 await db.withExclusiveTransactionAsync(async (tx) => {
  await tx.execAsync(`
   DELETE FROM reward_ledger WHERE is_reversal = 1;
   DELETE FROM reward_ledger; DELETE FROM completions; DELETE FROM progress_entries; DELETE FROM streak_history;
   DELETE FROM weekly_grace_usage; DELETE FROM penalty_events; DELETE FROM penalty_state; DELETE FROM rank_promotions;
   DELETE FROM achievements; DELETE FROM quest_occurrences;
   DELETE FROM quest_revisions; DELETE FROM quests; DELETE FROM preference_revisions; DELETE FROM player_attributes;
   DELETE FROM player_progression; DELETE FROM player_profile;
  `);
 });
}
