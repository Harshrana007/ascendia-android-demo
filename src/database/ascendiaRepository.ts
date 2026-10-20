import type { SQLiteDatabase } from "expo-sqlite";
import type { AscendiaDatabase } from "@/database/database";
import { resetDatabaseContents } from "@/database/database";
import { DIFFICULTY_XP, QUEST_TEMPLATES, createEmptyAttributeXp } from "@/services/demoFixtures";
import { calculateLevel, calculateReward, nextLocalDate, startOfWeek, STREAK_POLICY } from "@/game/progression/rules";
import { resolveScheduledDayOutcome } from "@/game/streaks/policy";
import type { Achievement, AdapterResult, AttributeCode, CompletionSummary, DemoState, HunterRank, OnboardingInput, PlayerProfile, Quest, QuestDraft, QuestType, RewardEvent, WeekStart } from "@/types/demo";

type SqlConnection = Pick<SQLiteDatabase, "runAsync" | "getFirstAsync" | "getAllAsync" | "execAsync">;
type ProfileRow = { id: string; name: string; class_name: PlayerProfile["className"]; presentation: PlayerProfile["presentation"]; interests_json: string; home_timezone: string; week_start: WeekStart; notifications_enabled: number; reduced_motion: number; onboarding_complete: number; created_at: string; updated_at: string };
type ProgressRow = { total_xp: number; level: number; rank: HunterRank; xp_into_level: number; xp_to_next_level: number; daily_streak: number; best_streak: number };
type AttributeRow = { code: AttributeCode; xp: number };
type QuestRow = { id: string; title: string; description: string; type: QuestType; difficulty: Quest["difficulty"]; primary_attribute: AttributeCode; secondary_attributes_json: string; weekdays_json: string; target: number | null; unit: string | null; deadline_local_date: string | null; current_revision: number; created_at: string; created_local_date: string; updated_at: string; archived_at: string | null };
type OccurrenceRow = { id: string; occurrence_key: string; quest_id: string; type: QuestType; period_start: string; period_end: string; local_date: string; timezone: string; status: "scheduled" | "completed" | "missed" | "archived"; quest_revision: number; progress: number; target: number | null; unit: string | null };
type RevisionSnapshot = { title: string; description: string; type: QuestType; difficulty: Quest["difficulty"]; primaryAttribute: AttributeCode; secondaryAttributes: AttributeCode[]; weekdays: number[]; target: number | null; unit: string | null; deadlineLocalDate: string | null };
type Preferences = { timezone: string; weekStart: WeekStart };
type CompletionRow = { id: string; quest_id: string; occurrence_id: string; completed_at: string; local_date: string; timezone: string; quest_revision: number; quest_snapshot_json: string; is_valid: number; corrected_at: string | null; correction_note: string | null };
type RewardRow = { id: string; quest_id: string; occurrence_id: string; completion_id: string | null; reason: string; quest_revision: number; base_xp: number; awarded_xp: number; attribute_allocations_json: string; is_reversal: number; created_at: string; snapshot_json: string | null };
const attributeCodes: AttributeCode[] = ["STR", "END", "INT", "DIS", "VIT", "WIS"];
const isoNow = () => new Date().toISOString();
const makeId = (prefix: string) => prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);

export function localDateAt(instant: Date, timezone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(instant);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "00";
  return part("year") + "-" + part("month") + "-" + part("day");
}
function isValidLocalDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T12:00:00.000Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
function weekdayOf(localDate: string) { return new Date(localDate + "T12:00:00.000Z").getUTCDay(); }
function addDays(localDate: string, days: number) { return nextLocalDate(localDate, days); }
function parseJson<T>(value: string, fallback: T): T { try { return JSON.parse(value) as T; } catch { return fallback; } }
function revisionSnapshot(row: QuestRow): RevisionSnapshot {
  return { title: row.title, description: row.description, type: row.type, difficulty: row.difficulty, primaryAttribute: row.primary_attribute,
    secondaryAttributes: parseJson<AttributeCode[]>(row.secondary_attributes_json, []), weekdays: parseJson<number[]>(row.weekdays_json, []),
    target: row.target, unit: row.unit, deadlineLocalDate: row.deadline_local_date };
}
function jsonSnapshot(snapshot: RevisionSnapshot) { return JSON.stringify(snapshot); }
async function getProfileRow(db: SqlConnection) { return db.getFirstAsync<ProfileRow>("SELECT * FROM player_profile LIMIT 1"); }
async function getProgressRow(db: SqlConnection, playerId: string) { return db.getFirstAsync<ProgressRow>("SELECT * FROM player_progression WHERE player_id = ?", playerId); }
async function getPreferencesAt(db: SqlConnection, playerId: string, date: string, profile: ProfileRow): Promise<Preferences> {
  const row = await db.getFirstAsync<{ timezone: string; week_start: WeekStart }>(
    "SELECT timezone, week_start FROM preference_revisions WHERE player_id = ? AND effective_from_local_date <= ? ORDER BY effective_from_local_date DESC, revision DESC LIMIT 1", playerId, date);
  if (row) return { timezone: row.timezone, weekStart: row.week_start };
  const earliest = await db.getFirstAsync<{ timezone: string; week_start: WeekStart }>(
    "SELECT timezone, week_start FROM preference_revisions WHERE player_id = ? ORDER BY effective_from_local_date ASC, revision ASC LIMIT 1", playerId);
  return earliest ? { timezone: earliest.timezone, weekStart: earliest.week_start } : { timezone: profile.home_timezone, weekStart: profile.week_start };
}
async function getQuestRow(db: SqlConnection, questId: string) { return db.getFirstAsync<QuestRow>("SELECT * FROM quests WHERE id = ?", questId); }
async function getRevisionSnapshot(db: SqlConnection, quest: QuestRow, localDate: string): Promise<{ revision: number; snapshot: RevisionSnapshot }> {
  const row = await db.getFirstAsync<{ revision: number; snapshot_json: string }>(
    "SELECT revision, snapshot_json FROM quest_revisions WHERE quest_id = ? AND effective_from_local_date <= ? ORDER BY effective_from_local_date DESC, revision DESC LIMIT 1", quest.id, localDate);
  return row ? { revision: row.revision, snapshot: parseJson(row.snapshot_json, revisionSnapshot(quest)) } : { revision: quest.current_revision, snapshot: revisionSnapshot(quest) };
}
function occurrenceKey(quest: QuestRow, localDate: string, prefs: Preferences) {
  if (quest.type === "Daily") return "daily:" + quest.id + ":" + localDate;
  if (quest.type === "Weekly") return "weekly:" + quest.id + ":" + startOfWeek(localDate, prefs.weekStart);
  if (quest.type === "Milestone") return "milestone:" + quest.id;
  return "once:" + quest.id;
}
async function ensureOccurrence(db: SqlConnection, quest: QuestRow, localDate: string, prefs: Preferences, revision: number, snapshot: RevisionSnapshot): Promise<OccurrenceRow | null> {
  if (quest.archived_at) {
    const archivedDate = localDateAt(new Date(quest.archived_at), prefs.timezone);
    if (localDate >= archivedDate) return null;
  }
  if (quest.type === "Daily" && !snapshot.weekdays.includes(weekdayOf(localDate))) return null;
  const key = occurrenceKey(quest, localDate, prefs);
  let periodStart = localDate;
  let periodEnd = localDate;
  let occurrenceLocalDate = localDate;
  if (quest.type === "Weekly") {
    periodStart = startOfWeek(localDate, prefs.weekStart);
    periodEnd = addDays(periodStart, 6);
  } else if (quest.type === "One-Time") {
    periodStart = quest.created_local_date;
    periodEnd = snapshot.deadlineLocalDate ?? "9999-12-31";
    occurrenceLocalDate = quest.created_local_date;
  } else if (quest.type === "Milestone") {
    periodStart = quest.created_local_date;
    periodEnd = "9999-12-31";
    occurrenceLocalDate = quest.created_local_date;
  }
  const id = "occ:" + key;
  await db.runAsync(
    "INSERT OR IGNORE INTO quest_occurrences(id, occurrence_key, quest_id, type, period_start, period_end, local_date, timezone, status, quest_revision, progress, target, unit, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'scheduled', ?, 0, ?, ?, ?, ?)",
    id, key, quest.id, quest.type, periodStart, periodEnd, occurrenceLocalDate, prefs.timezone, revision, snapshot.target, snapshot.unit, isoNow(), isoNow());
  return db.getFirstAsync<OccurrenceRow>("SELECT * FROM quest_occurrences WHERE occurrence_key = ?", key);
}
async function insertRevision(db: SqlConnection, questId: string, revision: number, effectiveDate: string, snapshot: RevisionSnapshot) {
  await db.runAsync("INSERT INTO quest_revisions(quest_id, revision, effective_from_local_date, snapshot_json, created_at) VALUES (?, ?, ?, ?, ?)",
    questId, revision, effectiveDate, jsonSnapshot(snapshot), isoNow());
}
function validateDraft(draft: QuestDraft): string | null {
  if (draft.title.trim().length < 2) return "Give the quest a title with at least two characters.";
  if (!DIFFICULTY_XP[draft.difficulty]) return "Choose a valid quest difficulty.";
  if (!attributeCodes.includes(draft.primaryAttribute)) return "Choose a valid primary attribute.";
  if (draft.secondaryAttributes.length > 2 || new Set(draft.secondaryAttributes).size !== draft.secondaryAttributes.length) return "Choose no more than two distinct secondary attributes.";
  if (draft.secondaryAttributes.some((value) => value === draft.primaryAttribute || !attributeCodes.includes(value))) return "Secondary attributes must be valid and different from the primary attribute.";
  if (draft.type === "Daily" && (!draft.weekdays.length || draft.weekdays.some((day) => !Number.isInteger(day) || day < 0 || day > 6))) return "Select at least one valid scheduled weekday.";
  if ((draft.type === "Weekly" || draft.type === "Milestone") && (!Number.isFinite(draft.target) || (draft.target ?? 0) <= 0 || !draft.unit?.trim())) return "Enter a positive target and a measurement unit.";
  if (draft.type === "One-Time" && draft.deadlineLocalDate && !isValidLocalDate(draft.deadlineLocalDate)) return "Use a real calendar date in YYYY-MM-DD format for the optional deadline.";
  return null;
}
function normalizedDraft(draft: QuestDraft): QuestDraft {
  const measurable = draft.type === "Weekly" || draft.type === "Milestone";
  return {
    ...draft, title: draft.title.trim(), description: draft.description.trim(),
    secondaryAttributes: [...new Set(draft.secondaryAttributes)].filter((value) => value !== draft.primaryAttribute).slice(0, 2),
    weekdays: draft.type === "Daily" ? [...new Set(draft.weekdays)].sort((a, b) => a - b) : [],
    target: measurable ? draft.target : null, unit: measurable ? draft.unit?.trim() ?? null : null,
    deadlineLocalDate: draft.type === "One-Time" ? draft.deadlineLocalDate ?? null : null,
  };
}
async function insertQuest(db: SqlConnection, draftInput: QuestDraft, profile: Pick<ProfileRow, "home_timezone">, questId = makeId("quest"), now = new Date()) {
  const draft = normalizedDraft(draftInput);
  const date = localDateAt(now, profile.home_timezone);
  const timestamp = now.toISOString();
  await db.runAsync(
    "INSERT INTO quests(id, title, description, type, difficulty, primary_attribute, secondary_attributes_json, weekdays_json, target, unit, deadline_local_date, current_revision, created_at, created_local_date, updated_at, archived_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, NULL)",
    questId, draft.title, draft.description, draft.type, draft.difficulty, draft.primaryAttribute,
    JSON.stringify(draft.secondaryAttributes), JSON.stringify(draft.weekdays), draft.target, draft.unit, draft.deadlineLocalDate ?? null, timestamp, date, timestamp);
  const row = await getQuestRow(db, questId);
  if (!row) throw new Error("Quest was not saved.");
  await insertRevision(db, questId, 1, date, revisionSnapshot(row));
  return row;
}
async function insertCompletion(db: SqlConnection, player: ProfileRow, occurrence: OccurrenceRow, snapshot: RevisionSnapshot, now: Date): Promise<string> {
  const id = makeId("completion");
  const date = localDateAt(now, occurrence.timezone);
  const existing = await db.getFirstAsync<{ id: string }>("SELECT id FROM completions WHERE occurrence_id = ? AND is_valid = 1", occurrence.id);
  if (existing) throw new Error("This quest occurrence already has a valid completion.");
  await db.runAsync(
    "INSERT INTO completions(id, quest_id, occurrence_id, completed_at, local_date, timezone, quest_revision, quest_snapshot_json, is_valid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)",
    id, occurrence.quest_id, occurrence.id, now.toISOString(), date, player.home_timezone, occurrence.quest_revision, jsonSnapshot(snapshot));
  await db.runAsync("UPDATE quest_occurrences SET status = 'completed', updated_at = ? WHERE id = ?", now.toISOString(), occurrence.id);
  return id;
}
async function unlockAchievement(db: SqlConnection, playerId: string, key: string, title: string, now: Date) {
  await db.runAsync("INSERT OR IGNORE INTO achievements(id, player_id, achievement_key, title, unlocked_at, metadata_json) VALUES (?, ?, ?, ?, ?, '{}')",
    makeId("achievement"), playerId, key, title, now.toISOString());
}
async function awardCompletion(db: SqlConnection, player: ProfileRow, occurrence: OccurrenceRow, snapshot: RevisionSnapshot, completionId: string, now: Date) {
  const existing = await db.getFirstAsync<{ id: string }>("SELECT id FROM reward_ledger WHERE reward_key = ?", "award:" + occurrence.occurrence_key);
  if (existing) throw new Error("A reward already exists for this occurrence. The completion was not duplicated.");
  const penalty = await db.getFirstAsync<{ active: number }>("SELECT active FROM penalty_state WHERE player_id = ?", player.id);
  const reward = calculateReward(snapshot.difficulty, snapshot.primaryAttribute, snapshot.secondaryAttributes, penalty?.active === 1);
  const eventId = makeId("reward");
  await db.runAsync(
    "INSERT INTO reward_ledger(id, reward_key, player_id, quest_id, occurrence_id, completion_id, reason, difficulty, quest_revision, base_xp, awarded_xp, attribute_allocations_json, penalty_applied, is_reversal, created_at) VALUES (?, ?, ?, ?, ?, ?, 'quest-completion', ?, ?, ?, ?, ?, ?, 0, ?)",
    eventId, "award:" + occurrence.occurrence_key, player.id, occurrence.quest_id, occurrence.id, completionId, snapshot.difficulty,
    occurrence.quest_revision, reward.baseXp, reward.awardedXp, JSON.stringify(reward.attributeAllocations), reward.penaltyApplied ? 1 : 0, now.toISOString());
  const progress = await getProgressRow(db, player.id);
  const priorXp = progress?.total_xp ?? 0;
  const nextTotal = Math.max(0, priorXp + reward.awardedXp);
  const level = calculateLevel(nextTotal);
  await db.runAsync(
    "UPDATE player_progression SET total_xp = ?, level = ?, xp_into_level = ?, xp_to_next_level = ? WHERE player_id = ?",
    nextTotal, level.level, level.xpIntoLevel, level.xpToNextLevel, player.id);
  for (const [code, xp] of Object.entries(reward.attributeAllocations)) {
    if (xp === undefined) continue;
    await db.runAsync("UPDATE player_attributes SET xp = xp + ? WHERE player_id = ? AND code = ?", xp, player.id, code);
  }
  await unlockAchievement(db, player.id, "first-quest", "First Quest Cleared", now);
  if (level.level > (progress?.level ?? 1)) {
    await unlockAchievement(db, player.id, "first-level-up", "Level Up", now);
  }
  if (snapshot.type === "Milestone") await unlockAchievement(db, player.id, "first-milestone", "Milestone Reached", now);
  return { ...reward, eventId, levelUp: level.level > (progress?.level ?? 1) };
}
async function reconcileStreaks(db: SqlConnection, player: ProfileRow, now: Date) {
  const today = localDateAt(now, player.home_timezone);
  const dailyQuests = await db.getAllAsync<QuestRow>("SELECT * FROM quests WHERE type = 'Daily' ORDER BY created_local_date, id");
  if (dailyQuests.length === 0) {
    await db.runAsync("DELETE FROM streak_history WHERE player_id = ?", player.id);
    await db.runAsync("DELETE FROM weekly_grace_usage WHERE player_id = ?", player.id);
    await db.runAsync("DELETE FROM penalty_events WHERE player_id = ?", player.id);
    await db.runAsync("UPDATE player_progression SET daily_streak = 0, best_streak = 0 WHERE player_id = ?", player.id);
    await db.runAsync("INSERT INTO penalty_state(player_id, active, recovery_success_days, updated_at) VALUES (?, 0, 0, ?) ON CONFLICT(player_id) DO UPDATE SET active = 0, recovery_success_days = 0, updated_at = excluded.updated_at", player.id, now.toISOString());
    return;
  }
  let earliest = today;
  for (const quest of dailyQuests) {
    if (quest.created_local_date < earliest) earliest = quest.created_local_date;
  }
  const prefStart = await db.getFirstAsync<{ effective_from_local_date: string }>(
    "SELECT effective_from_local_date FROM preference_revisions WHERE player_id = ? ORDER BY effective_from_local_date ASC LIMIT 1", player.id);
  if (prefStart && prefStart.effective_from_local_date < earliest) earliest = prefStart.effective_from_local_date;

  for (const quest of dailyQuests) {
    if (quest.created_local_date > today) continue;
    let date = quest.created_local_date;
    while (date <= today) {
      const prefs = await getPreferencesAt(db, player.id, date, player);
      const rev = await getRevisionSnapshot(db, quest, date);
      if (!quest.archived_at || date < localDateAt(new Date(quest.archived_at), prefs.timezone)) {
        await ensureOccurrence(db, quest, date, prefs, rev.revision, rev.snapshot);
      }
      date = addDays(date, 1);
    }
  }

  await db.runAsync("DELETE FROM streak_history WHERE player_id = ?", player.id);
  await db.runAsync("DELETE FROM weekly_grace_usage WHERE player_id = ?", player.id);
  await db.runAsync("DELETE FROM penalty_events WHERE player_id = ?", player.id);
  let streak = 0;
  let best = 0;
  let penaltyActive = false;
  let penaltyStarted: string | null = null;
  let penaltyEnded: string | null = null;
  let recoveryDays = 0;
  let date = earliest;
  while (date < today) {
    const prefs = await getPreferencesAt(db, player.id, date, player);
    const dayRows = await db.getAllAsync<{ id: string; status: string }>(
      "SELECT id, status FROM quest_occurrences WHERE type = 'Daily' AND local_date = ? AND status != 'archived'", date);
    if (dayRows.length) {
      const success = dayRows.every((row) => row.status === "completed");
      const weekKey = startOfWeek(date, prefs.weekStart);
      const used = success ? null : await db.getFirstAsync<{ week_key: string }>("SELECT week_key FROM weekly_grace_usage WHERE player_id = ? AND week_key = ?", player.id, weekKey);
      const decision = resolveScheduledDayOutcome(success, !!used);
      const outcome = decision.outcome;
      const graceConsumed = decision.consumesGrace ? 1 : 0;
      if (decision.consumesGrace) {
        await db.runAsync("INSERT OR IGNORE INTO weekly_grace_usage(player_id, week_key, local_date) VALUES (?, ?, ?)", player.id, weekKey, date);
      }
      if (outcome === "success") {
        streak += 1;
        best = Math.max(best, streak);
        if (penaltyActive) {
          recoveryDays += 1;
          await db.runAsync("INSERT INTO penalty_events(id, player_id, local_date, timezone, event_type, metadata_json, created_at) VALUES (?, ?, ?, ?, 'recovery-day', ?, ?)",
            "penalty:" + player.id + ":" + date + ":recovery", player.id, date, prefs.timezone, JSON.stringify({ recoverySuccessfulDays: recoveryDays }), date + "T12:00:00.000Z");
          if (recoveryDays >= STREAK_POLICY.recoverySuccessfulScheduledDays) {
            penaltyActive = false;
            recoveryDays = 0;
            penaltyEnded = date + "T23:59:59.000Z";
            await db.runAsync("INSERT INTO penalty_events(id, player_id, local_date, timezone, event_type, metadata_json, created_at) VALUES (?, ?, ?, ?, 'ended', ?, ?)",
              "penalty:" + player.id + ":" + date + ":ended", player.id, date, prefs.timezone, JSON.stringify({ reason: "three successful scheduled days" }), date + "T12:05:00.000Z");
          }
        }
      } else if (outcome === "grace") {
        // The weekly grace protects the chain but does not count toward penalty recovery.
      } else {
        streak = 0;
        recoveryDays = 0;
        if (!penaltyActive) {
          penaltyStarted = date + "T00:00:00.000Z";
          await db.runAsync("INSERT INTO penalty_events(id, player_id, local_date, timezone, event_type, metadata_json, created_at) VALUES (?, ?, ?, ?, 'started', ?, ?)",
            "penalty:" + player.id + ":" + date + ":started", player.id, date, prefs.timezone, JSON.stringify({ futureXpPenaltyPercent: STREAK_POLICY.futureXpPenaltyPercent, policy: "provisional-demo" }), date + "T12:00:00.000Z");
        } else {
          await db.runAsync("INSERT INTO penalty_events(id, player_id, local_date, timezone, event_type, metadata_json, created_at) VALUES (?, ?, ?, ?, 'miss-during-penalty', '{}', ?)",
            "penalty:" + player.id + ":" + date + ":miss", player.id, date, prefs.timezone, date + "T12:00:00.000Z");
        }
        penaltyActive = true;
      }
      if (!success) {
        await db.runAsync("UPDATE quest_occurrences SET status = 'missed', updated_at = ? WHERE type = 'Daily' AND local_date = ? AND status = 'scheduled'", now.toISOString(), date);
      }
      await db.runAsync(
        "INSERT INTO streak_history(id, player_id, local_date, timezone, week_key, outcome, grace_consumed, evaluated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        "streak:" + player.id + ":" + date, player.id, date, prefs.timezone, weekKey, outcome, graceConsumed, now.toISOString());
    }
    date = addDays(date, 1);
  }
  // An open current day counts only after every scheduled daily quest for that day is cleared.
  const todayRows = await db.getAllAsync<{ id: string; status: string }>(
    "SELECT id, status FROM quest_occurrences WHERE type = 'Daily' AND local_date = ? AND status != 'archived'", today);
  if (todayRows.length && todayRows.every((row) => row.status === "completed")) {
    const prefs = await getPreferencesAt(db, player.id, today, player);
    const weekKey = startOfWeek(today, prefs.weekStart);
    streak += 1;
    best = Math.max(best, streak);
    if (penaltyActive) {
      recoveryDays += 1;
      await db.runAsync("INSERT INTO penalty_events(id, player_id, local_date, timezone, event_type, metadata_json, created_at) VALUES (?, ?, ?, ?, 'recovery-day', ?, ?)",
        "penalty:" + player.id + ":" + today + ":recovery", player.id, today, prefs.timezone, JSON.stringify({ recoverySuccessfulDays: recoveryDays }), now.toISOString());
      if (recoveryDays >= STREAK_POLICY.recoverySuccessfulScheduledDays) {
        penaltyActive = false;
        recoveryDays = 0;
        penaltyEnded = now.toISOString();
        await db.runAsync("INSERT INTO penalty_events(id, player_id, local_date, timezone, event_type, metadata_json, created_at) VALUES (?, ?, ?, ?, 'ended', ?, ?)",
          "penalty:" + player.id + ":" + today + ":ended", player.id, today, prefs.timezone, JSON.stringify({ reason: "three successful scheduled days" }), now.toISOString());
      }
    }
    await db.runAsync(
      "INSERT OR REPLACE INTO streak_history(id, player_id, local_date, timezone, week_key, outcome, grace_consumed, evaluated_at) VALUES (?, ?, ?, ?, ?, 'success', 0, ?)",
      "streak:" + player.id + ":" + today, player.id, today, prefs.timezone, weekKey, now.toISOString());
  }
  await db.runAsync("UPDATE player_progression SET daily_streak = ?, best_streak = ? WHERE player_id = ?", streak, best, player.id);
  await db.runAsync(
    "INSERT INTO penalty_state(player_id, active, recovery_success_days, started_at, ended_at, updated_at) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(player_id) DO UPDATE SET active = excluded.active, recovery_success_days = excluded.recovery_success_days, started_at = excluded.started_at, ended_at = excluded.ended_at, updated_at = excluded.updated_at",
    player.id, penaltyActive ? 1 : 0, recoveryDays, penaltyStarted, penaltyEnded, now.toISOString());
}
async function currentWeeklyOccurrence(db: SqlConnection, questId: string, now: Date): Promise<OccurrenceRow | null> {
  const rows = await db.getAllAsync<OccurrenceRow>("SELECT * FROM quest_occurrences WHERE quest_id = ? AND type = 'Weekly' AND status != 'archived' ORDER BY created_at ASC", questId);
  for (const row of rows) {
    const localDate = localDateAt(now, row.timezone);
    if (localDate >= row.period_start && localDate <= row.period_end) return row;
  }
  return null;
}
async function ensureCurrentOccurrences(db: SqlConnection, player: ProfileRow, now: Date) {
  const today = localDateAt(now, player.home_timezone);
  const prefs = await getPreferencesAt(db, player.id, today, player);
  const rows = await db.getAllAsync<QuestRow>("SELECT * FROM quests WHERE archived_at IS NULL ORDER BY created_at");
  for (const quest of rows) {
    if (quest.type === "Daily") continue;
    if (quest.type === "Weekly" && await currentWeeklyOccurrence(db, quest.id, now)) continue;
    const rev = await getRevisionSnapshot(db, quest, today);
    await ensureOccurrence(db, quest, today, prefs, rev.revision, rev.snapshot);
  }
}
export async function initializeRepository(db: AscendiaDatabase, now = new Date()) {
  await db.withExclusiveTransactionAsync(async (tx) => {
    const profile = await getProfileRow(tx);
    if (!profile) return;
    await ensureCurrentOccurrences(tx, profile, now);
    await reconcileStreaks(tx, profile, now);
  });
}
export async function readDemoState(db: AscendiaDatabase, now = new Date()): Promise<DemoState> {
  await initializeRepository(db, now);
  const profileRow = await getProfileRow(db);
  if (!profileRow) return { profile: null, quests: [], rewardLedger: [], history: [], achievements: [] };
  const progress = await getProgressRow(db, profileRow.id);
  const attrRows = await db.getAllAsync<AttributeRow>("SELECT code, xp FROM player_attributes WHERE player_id = ?", profileRow.id);
  const attrXp = createEmptyAttributeXp();
  for (const row of attrRows) attrXp[row.code] = row.xp;
  const level = calculateLevel(progress?.total_xp ?? 0);
  const profile: PlayerProfile = {
    id: profileRow.id, name: profileRow.name, className: profileRow.class_name, presentation: profileRow.presentation,
    homeTimezone: profileRow.home_timezone, weekStart: profileRow.week_start, interests: parseJson(profileRow.interests_json, []),
    rank: progress?.rank ?? "E", level: level.level, totalXp: progress?.total_xp ?? 0, xpIntoLevel: level.xpIntoLevel,
    xpToNextLevel: level.xpToNextLevel, attributeXp: attrXp, dailyStreak: progress?.daily_streak ?? 0,
    bestStreak: progress?.best_streak ?? 0, notificationsEnabled: profileRow.notifications_enabled === 1,
    reducedMotion: profileRow.reduced_motion === 1, onboardingComplete: true,
  };
  const questsRows = await db.getAllAsync<QuestRow>("SELECT * FROM quests ORDER BY created_at DESC");
  const today = localDateAt(now, profile.homeTimezone);
  const prefs = await getPreferencesAt(db, profile.id, today, profileRow);
  const quests: Quest[] = [];
  for (const row of questsRows) {
    let occurrence: OccurrenceRow | null = null;
    const rev = await getRevisionSnapshot(db, row, today);
    if (row.type === "Daily") {
      if (rev.snapshot.weekdays.includes(weekdayOf(today))) occurrence = await db.getFirstAsync<OccurrenceRow>("SELECT * FROM quest_occurrences WHERE occurrence_key = ?", "daily:" + row.id + ":" + today);
    } else {
      const key = occurrenceKey(row, today, prefs);
      occurrence = await db.getFirstAsync<OccurrenceRow>("SELECT * FROM quest_occurrences WHERE occurrence_key = ?", key);
    }
    let latestCompletion: CompletionRow | null = null;
    if (occurrence) latestCompletion = await db.getFirstAsync<CompletionRow>("SELECT * FROM completions WHERE occurrence_id = ? AND is_valid = 1 ORDER BY completed_at DESC LIMIT 1", occurrence.id);
    if (row.type === "One-Time") {
      latestCompletion = await db.getFirstAsync<CompletionRow>("SELECT * FROM completions WHERE quest_id = ? AND is_valid = 1 ORDER BY completed_at DESC LIMIT 1", row.id);
      if (latestCompletion) occurrence = await db.getFirstAsync<OccurrenceRow>("SELECT * FROM quest_occurrences WHERE id = ?", latestCompletion.occurrence_id);
    }
    const reward = occurrence ? await db.getFirstAsync<{ created_at: string }>("SELECT created_at FROM reward_ledger WHERE occurrence_id = ? AND is_reversal = 0 ORDER BY created_at DESC LIMIT 1", occurrence.id) : null;
    const correction = occurrence ? await db.getFirstAsync<{ correction_note: string | null }>("SELECT correction_note FROM completions WHERE occurrence_id = ? AND is_valid = 0 AND corrected_at IS NOT NULL ORDER BY corrected_at DESC LIMIT 1", occurrence.id) : null;
    const todayScheduled = row.type !== "Daily" || rev.snapshot.weekdays.includes(weekdayOf(today));
    const completionAge = latestCompletion ? now.getTime() - new Date(latestCompletion.completed_at).getTime() : -1;
    const canCorrect = !!latestCompletion && latestCompletion.is_valid === 1 && completionAge >= 0 && completionAge <= 48 * 60 * 60 * 1000;
    quests.push({
      id: row.id, title: row.title, description: row.description, type: row.type, difficulty: row.difficulty,
      primaryAttribute: row.primary_attribute, secondaryAttributes: parseJson(row.secondary_attributes_json, []),
      weekdays: parseJson(row.weekdays_json, []), target: occurrence?.target ?? row.target, unit: occurrence?.unit ?? row.unit,
      deadlineLocalDate: row.deadline_local_date, xpReward: DIFFICULTY_XP[row.difficulty], progress: occurrence?.progress ?? 0,
      isCompleted: occurrence?.status === "completed" || (row.type === "One-Time" && !!latestCompletion),
      isArchived: !!row.archived_at, createdAt: row.created_at, updatedAt: row.updated_at,
      occurrenceVoided: !!correction, occurrenceCorrectionNote: correction?.correction_note ?? null,
      completedAt: latestCompletion?.completed_at, rewardedAt: reward?.created_at, occurrenceId: occurrence?.id,
      occurrenceKey: occurrence?.occurrence_key, currentRevision: occurrence?.quest_revision ?? row.current_revision,
      scheduledToday: todayScheduled, latestCompletionId: latestCompletion?.id, canCorrect,
    });
  }
  const rewardRows = await db.getAllAsync<RewardRow>(
    "SELECT r.*, v.snapshot_json FROM reward_ledger r LEFT JOIN quest_revisions v ON v.quest_id = r.quest_id AND v.revision = r.quest_revision WHERE r.player_id = ? ORDER BY r.created_at DESC LIMIT 250", profile.id);
  const rewardLedger: RewardEvent[] = rewardRows.map((row) => {
    const snapshot = row.snapshot_json ? parseJson<RevisionSnapshot>(row.snapshot_json, { title: "Quest", description:"", type:"One-Time", difficulty:"Normal", primaryAttribute:"DIS", secondaryAttributes:[], weekdays:[], target:null, unit:null, deadlineLocalDate:null }) : null;
    const allocation = parseJson<Partial<Record<AttributeCode, number>>>(row.attribute_allocations_json, {});
    return { id: row.id, questId: row.quest_id, questTitle: snapshot?.title ?? "Quest", xp: row.awarded_xp, createdAt: row.created_at, attributeXp: allocation, isReversal: row.is_reversal === 1 };
  });
  const historyRows = await db.getAllAsync<CompletionRow & { current_title: string; current_type: QuestType; current_difficulty: Quest["difficulty"]; xp: number }>(
    "SELECT c.*, q.title AS current_title, q.type AS current_type, q.difficulty AS current_difficulty, COALESCE((SELECT awarded_xp FROM reward_ledger r WHERE r.completion_id = c.id AND r.is_reversal = 0 ORDER BY r.created_at DESC LIMIT 1), 0) AS xp FROM completions c JOIN quests q ON q.id = c.quest_id ORDER BY c.completed_at DESC LIMIT 100");
  const history: CompletionSummary[] = historyRows.map((row) => {
    const snapshot = parseJson<RevisionSnapshot>(row.quest_snapshot_json, { title: row.current_title, description: "", type: row.current_type, difficulty: row.current_difficulty, primaryAttribute: "DIS", secondaryAttributes: [], weekdays: [], target: null, unit: null, deadlineLocalDate: null });
    return {
    completionId: row.id, questId: row.quest_id, questTitle: snapshot.title,
    type: snapshot.type, difficulty: snapshot.difficulty, completedAt: row.completed_at, localDate: row.local_date, timezone: row.timezone,
    xp: row.xp, valid: row.is_valid === 1, canCorrect: row.is_valid === 1 && now.getTime() >= new Date(row.completed_at).getTime() && now.getTime() - new Date(row.completed_at).getTime() <= 48 * 60 * 60 * 1000,
    correctionNote: row.correction_note,
  }; });
  const achievementsRows = await db.getAllAsync<{ id: string; achievement_key: string; title: string; unlocked_at: string }>("SELECT id, achievement_key, title, unlocked_at FROM achievements WHERE player_id = ? ORDER BY unlocked_at DESC", profile.id);
  const achievements: Achievement[] = achievementsRows.map((row) => ({ id: row.id, key: row.achievement_key, title: row.title, unlockedAt: row.unlocked_at }));
  return { profile, quests, rewardLedger, history, achievements };
}
export async function saveOnboarding(db: AscendiaDatabase, input: OnboardingInput, selectedKeys: string[], now = new Date()) {
  if (input.name.trim().length < 2) throw new Error("Enter at least two characters for the hunter name.");
  try { new Intl.DateTimeFormat("en-US", { timeZone: input.homeTimezone }).format(now); } catch { throw new Error("Enter a valid IANA home timezone."); }
  await db.withExclusiveTransactionAsync(async (tx) => {
    const existing = await getProfileRow(tx);
    if (existing) throw new Error("A local hunter profile already exists. Use Profile to update it.");
    const id = makeId("player");
    const timestamp = now.toISOString();
    const zone = input.homeTimezone.trim();
    const date = localDateAt(now, zone);
    await tx.runAsync(
      "INSERT INTO player_profile(id, name, class_name, presentation, interests_json, home_timezone, week_start, notifications_enabled, reduced_motion, onboarding_complete, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 1, ?, ?)",
      id, input.name.trim(), input.className, input.presentation, JSON.stringify(input.interests), zone, input.weekStart, timestamp, timestamp);
    const level = calculateLevel(0);
    await tx.runAsync("INSERT INTO player_progression(player_id, total_xp, level, rank, xp_into_level, xp_to_next_level, daily_streak, best_streak) VALUES (?, 0, ?, 'E', ?, ?, 0, 0)", id, level.level, level.xpIntoLevel, level.xpToNextLevel);
    for (const code of attributeCodes) await tx.runAsync("INSERT INTO player_attributes(player_id, code, xp) VALUES (?, ?, 0)", id, code);
    await tx.runAsync("INSERT INTO preference_revisions(player_id, revision, effective_from_local_date, timezone, week_start, created_at) VALUES (?, 1, ?, ?, ?, ?)", id, date, zone, input.weekStart, timestamp);
    await tx.runAsync("INSERT INTO penalty_state(player_id, active, recovery_success_days, updated_at) VALUES (?, 0, 0, ?)", id, timestamp);
    for (const template of QUEST_TEMPLATES.filter((item) => selectedKeys.includes(item.key))) {
      const draft: QuestDraft = { title: template.title, description: template.description, type: template.type, difficulty: template.difficulty,
        primaryAttribute: template.primaryAttribute, secondaryAttributes: template.secondaryAttributes, weekdays: template.weekdays,
        target: template.target, unit: template.unit, deadlineLocalDate: null };
      await insertQuest(tx, draft, { home_timezone: zone }, template.key, now);
    }
  });
  await initializeRepository(db, now);
}
export async function createQuest(db: AscendiaDatabase, draft: QuestDraft, now = new Date()) {
  const error = validateDraft(draft); if (error) throw new Error(error);
  await db.withExclusiveTransactionAsync(async (tx) => {
    const profile = await getProfileRow(tx); if (!profile) throw new Error("Create your hunter profile first.");
    await insertQuest(tx, draft, profile, makeId("quest"), now);
    await ensureCurrentOccurrences(tx, profile, now);
  });
}
export async function editQuest(db: AscendiaDatabase, questId: string, draftInput: QuestDraft, now = new Date()) {
  const error = validateDraft(draftInput); if (error) throw new Error(error);
  const draft = normalizedDraft(draftInput);
  await db.withExclusiveTransactionAsync(async (tx) => {
    const profile = await getProfileRow(tx); const old = await getQuestRow(tx, questId);
    if (!profile || !old) throw new Error("This quest could not be found.");
    if (old.archived_at) throw new Error("Archived quests cannot be edited.");
    if (old.type !== draft.type) throw new Error("Changing a quest's type changes occurrence history. Archive it and create a new quest with the new type.");
    if (old.type === "Milestone" && old.target !== null && draft.target !== null) {
      const occ = await tx.getFirstAsync<OccurrenceRow>("SELECT * FROM quest_occurrences WHERE occurrence_key = ?", "milestone:" + old.id);
      if (occ && occ.progress > 0 && old.unit !== draft.unit) throw new Error("The unit cannot change after milestone progress has been recorded.");
      if (occ && occ.progress >= draft.target && occ.status !== "completed") throw new Error("The new target is already met. Record progress to complete it before editing the target.");
      if (occ?.status === "completed" && (draft.target !== old.target || draft.unit !== old.unit)) throw new Error("A completed milestone's target and unit are historical. Create a new milestone quest for a new target.");
    }
    const nextRevision = old.current_revision + 1;
    const localToday = localDateAt(now, profile.home_timezone);
    const prefs = await getPreferencesAt(tx, profile.id, localToday, profile);
    let effective = localToday;
    if (old.type === "Daily") effective = addDays(localToday, 1);
    if (old.type === "Weekly") effective = addDays(startOfWeek(localToday, prefs.weekStart), 7);
    await tx.runAsync(
      "UPDATE quests SET title = ?, description = ?, type = ?, difficulty = ?, primary_attribute = ?, secondary_attributes_json = ?, weekdays_json = ?, target = ?, unit = ?, deadline_local_date = ?, current_revision = ?, updated_at = ? WHERE id = ?",
      draft.title, draft.description, draft.type, draft.difficulty, draft.primaryAttribute, JSON.stringify(draft.secondaryAttributes),
      JSON.stringify(draft.weekdays), draft.target, draft.unit, draft.deadlineLocalDate ?? null, nextRevision, now.toISOString(), questId);
    const updated = await getQuestRow(tx, questId); if (!updated) throw new Error("Quest update failed.");
    await insertRevision(tx, questId, nextRevision, effective, revisionSnapshot(updated));
    if ((old.type === "One-Time" && draft.type === "One-Time") || (old.type === "Milestone" && draft.type === "Milestone")) {
      const key = old.type === "One-Time" ? "once:" + old.id : "milestone:" + old.id;
      const occurrence = await tx.getFirstAsync<OccurrenceRow>("SELECT * FROM quest_occurrences WHERE occurrence_key = ?", key);
      if (occurrence?.status !== "completed") {
        await tx.runAsync("UPDATE quest_occurrences SET quest_revision = ?, target = ?, unit = ?, updated_at = ? WHERE occurrence_key = ?", nextRevision, draft.target, draft.unit, now.toISOString(), key);
      }
    }
  });
}
export async function archiveQuest(db: AscendiaDatabase, questId: string, now = new Date()) {
  await db.withExclusiveTransactionAsync(async (tx) => {
    const profile = await getProfileRow(tx); const quest = await getQuestRow(tx, questId);
    if (!profile || !quest) throw new Error("This quest could not be found.");
    if (quest.archived_at) return;
    const date = localDateAt(now, profile.home_timezone);
    await tx.runAsync("UPDATE quests SET archived_at = ?, updated_at = ? WHERE id = ?", now.toISOString(), now.toISOString(), questId);
    await tx.runAsync("UPDATE quest_occurrences SET status = 'archived', updated_at = ? WHERE quest_id = ? AND local_date >= ? AND status = 'scheduled'", now.toISOString(), questId, date);
  });
}
async function insertCurrentOccurrence(db: SqlConnection, questId: string, now: Date) {
  const profile = await getProfileRow(db); const quest = await getQuestRow(db, questId);
  if (!profile || !quest || quest.archived_at) return null;
  const today = localDateAt(now, profile.home_timezone);
  const prefs = await getPreferencesAt(db, profile.id, today, profile);
  if (quest.type === "Weekly") {
    const current = await currentWeeklyOccurrence(db, questId, now);
    if (current) return current;
  }
  const rev = await getRevisionSnapshot(db, quest, today);
  return ensureOccurrence(db, quest, today, prefs, rev.revision, rev.snapshot);
}
export async function completeQuest(db: AscendiaDatabase, questId: string, now = new Date()): Promise<AdapterResult> {
  let result: AdapterResult | null = null;
  await db.withExclusiveTransactionAsync(async (tx) => {
    const profile = await getProfileRow(tx); const quest = await getQuestRow(tx, questId);
    if (!profile || !quest || quest.archived_at) { result = { status: "not-found", xpAwarded: 0, message: "This quest is no longer active." }; return; }
    if (quest.type === "Weekly" || quest.type === "Milestone") { result = { status: "not-progress-based", xpAwarded: 0, message: "Record measured progress to reach this target." }; return; }
    const occurrence = await insertCurrentOccurrence(tx, questId, now);
    if (!occurrence) { result = { status: "not-scheduled", xpAwarded: 0, message: "This quest is not scheduled for the current home-timezone day." }; return; }
    if (occurrence.status === "completed" || await tx.getFirstAsync<{ id: string }>("SELECT id FROM completions WHERE occurrence_id = ? AND is_valid = 1", occurrence.id)) {
      result = { status: "already-completed", xpAwarded: 0, message: "This occurrence has already been cleared. No duplicate reward was added." }; return;
    }
    if (await tx.getFirstAsync<{ id: string }>("SELECT id FROM reward_ledger WHERE reward_key = ?", "award:" + occurrence.occurrence_key)) {
      throw new Error("A reward already exists for this occurrence. The save was stopped to protect XP integrity.");
    }
    const rev = await tx.getFirstAsync<{ snapshot_json: string }>("SELECT snapshot_json FROM quest_revisions WHERE quest_id = ? AND revision = ?", quest.id, occurrence.quest_revision);
    const snapshot = rev ? parseJson<RevisionSnapshot>(rev.snapshot_json, revisionSnapshot(quest)) : revisionSnapshot(quest);
    const completionId = await insertCompletion(tx, profile, occurrence, snapshot, now);
    const reward = await awardCompletion(tx, profile, occurrence, snapshot, completionId, now);
    await reconcileStreaks(tx, profile, now);
    result = { status: "completed", xpAwarded: reward.awardedXp, message: "System Notice: Quest Cleared. +" + reward.awardedXp + " XP recorded." + (reward.penaltyApplied ? " The provisional " + STREAK_POLICY.futureXpPenaltyPercent + "% consistency penalty applied." : "") + (reward.levelUp ? " Level increased." : "") };
  });
  return result ?? { status: "not-found", xpAwarded: 0, message: "No result was returned." };
}
export async function addQuestProgress(db: AscendiaDatabase, questId: string, amount: number, now = new Date()): Promise<AdapterResult> {
  let result: AdapterResult | null = null;
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("Progress must be a finite number greater than zero.");
  await db.withExclusiveTransactionAsync(async (tx) => {
    const profile = await getProfileRow(tx); const quest = await getQuestRow(tx, questId);
    if (!profile || !quest || quest.archived_at) { result = { status: "not-found", xpAwarded: 0, message: "This quest is no longer active." }; return; }
    if (quest.type !== "Weekly" && quest.type !== "Milestone") { result = { status: "not-progress-based", xpAwarded: 0, message: "This quest uses direct completion." }; return; }
    const occurrence = await insertCurrentOccurrence(tx, questId, now);
    if (!occurrence) { result = { status: "not-found", xpAwarded: 0, message: "This measurable quest could not be opened." }; return; }
    if (occurrence.status === "completed") { result = { status: "already-completed", xpAwarded: 0, message: "This target has already been reached. No duplicate reward was added." }; return; }
    if (!occurrence.target || occurrence.target <= 0 || !occurrence.unit?.trim()) throw new Error("This measurable quest has no valid target or unit.");
    const entryId = makeId("progress");
    await tx.runAsync("INSERT INTO progress_entries(id, occurrence_id, amount, unit, note, created_at, is_valid) VALUES (?, ?, ?, ?, NULL, ?, 1)", entryId, occurrence.id, amount, occurrence.unit, now.toISOString());
    const sum = await tx.getFirstAsync<{ total: number }>("SELECT COALESCE(SUM(amount), 0) AS total FROM progress_entries WHERE occurrence_id = ? AND is_valid = 1", occurrence.id);
    const progress = Math.min(occurrence.target, sum?.total ?? 0);
    const reached = progress >= occurrence.target;
    await tx.runAsync("UPDATE quest_occurrences SET progress = ?, status = ?, updated_at = ? WHERE id = ?", progress, reached ? "completed" : "scheduled", now.toISOString(), occurrence.id);
    if (reached) {
      const rev = await tx.getFirstAsync<{ snapshot_json: string }>("SELECT snapshot_json FROM quest_revisions WHERE quest_id = ? AND revision = ?", quest.id, occurrence.quest_revision);
      const snapshot = rev ? parseJson<RevisionSnapshot>(rev.snapshot_json, revisionSnapshot(quest)) : revisionSnapshot(quest);
      const completionId = await insertCompletion(tx, profile, { ...occurrence, progress, status: "completed" }, snapshot, now);
      const reward = await awardCompletion(tx, profile, { ...occurrence, progress, status: "completed" }, snapshot, completionId, now);
      await reconcileStreaks(tx, profile, now);
      result = { status: "goal-reached", xpAwarded: reward.awardedXp, message: "Milestone achieved. +" + reward.awardedXp + " XP recorded." };
    } else {
      result = { status: "progress-updated", xpAwarded: 0, message: "Progress saved: " + progress + " / " + occurrence.target + " " + occurrence.unit + "." };
    }
  });
  return result ?? { status: "not-found", xpAwarded: 0, message: "No result was returned." };
}
export async function updatePlayerProfile(db: AscendiaDatabase, patch: Partial<PlayerProfile>, now = new Date()) {
  await db.withExclusiveTransactionAsync(async (tx) => {
    const profile = await getProfileRow(tx);
    if (!profile) throw new Error("Create your hunter profile first.");
    const name = patch.name?.trim() ?? profile.name;
    if (name.length < 2) throw new Error("Use at least two characters for the hunter name.");
    const timezone = patch.homeTimezone?.trim() ?? profile.home_timezone;
    try { new Intl.DateTimeFormat("en-US", { timeZone: timezone }).format(now); } catch { throw new Error("Enter a valid IANA home timezone."); }
    const weekStart = patch.weekStart ?? profile.week_start;
    const changedPreferences = timezone !== profile.home_timezone || weekStart !== profile.week_start;
    await tx.runAsync("UPDATE player_profile SET name = ?, class_name = ?, presentation = ?, interests_json = ?, home_timezone = ?, week_start = ?, notifications_enabled = ?, reduced_motion = ?, updated_at = ? WHERE id = ?",
      name, patch.className ?? profile.class_name, patch.presentation ?? profile.presentation, JSON.stringify(patch.interests ?? parseJson(profile.interests_json, [])),
      timezone, weekStart, patch.notificationsEnabled === undefined ? profile.notifications_enabled : patch.notificationsEnabled ? 1 : 0,
      patch.reducedMotion === undefined ? profile.reduced_motion : patch.reducedMotion ? 1 : 0, now.toISOString(), profile.id);
    if (changedPreferences) {
      const rev = await tx.getFirstAsync<{ revision: number }>("SELECT COALESCE(MAX(revision), 0) AS revision FROM preference_revisions WHERE player_id = ?", profile.id);
      const effective = localDateAt(now, timezone);
      await tx.runAsync("INSERT INTO preference_revisions(player_id, revision, effective_from_local_date, timezone, week_start, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        profile.id, (rev?.revision ?? 0) + 1, effective, timezone, weekStart, now.toISOString());
    }
    const updated = await getProfileRow(tx);
    if (updated) await reconcileStreaks(tx, updated, now);
  });
}
export async function correctCompletion(db: AscendiaDatabase, completionId: string, note = "Corrected by player within the 48-hour window.", now = new Date()) {
  await db.withExclusiveTransactionAsync(async (tx) => {
    const profile = await getProfileRow(tx);
    const completion = await tx.getFirstAsync<CompletionRow>("SELECT * FROM completions WHERE id = ?", completionId);
    if (!profile || !completion || completion.is_valid !== 1) throw new Error("This completion is no longer eligible for correction.");
    const age = now.getTime() - new Date(completion.completed_at).getTime();
    if (age < 0 || age > 48 * 60 * 60 * 1000) throw new Error("Completions can only be corrected within 48 hours.");
    const event = await tx.getFirstAsync<RewardRow>("SELECT * FROM reward_ledger WHERE completion_id = ? AND is_reversal = 0 ORDER BY created_at DESC LIMIT 1", completionId);
    if (!event) throw new Error("The original reward could not be found. No changes were made.");
    if (await tx.getFirstAsync<{ id: string }>("SELECT id FROM reward_ledger WHERE reward_key = ?", "reverse:" + event.id)) throw new Error("A correction has already reversed this reward.");
    const allocations = parseJson<Partial<Record<AttributeCode, number>>>(event.attribute_allocations_json, {});
    const reversedAllocations: Partial<Record<AttributeCode, number>> = {};
    for (const [code, value] of Object.entries(allocations)) reversedAllocations[code as AttributeCode] = -(value ?? 0);
    await tx.runAsync("UPDATE completions SET is_valid = 0, corrected_at = ?, correction_note = ? WHERE id = ?", now.toISOString(), note, completionId);
    await tx.runAsync("UPDATE progress_entries SET is_valid = 0, corrected_at = ? WHERE occurrence_id = ?", now.toISOString(), completion.occurrence_id);
    await tx.runAsync(
      "INSERT INTO reward_ledger(id, reward_key, player_id, quest_id, occurrence_id, completion_id, reason, difficulty, quest_revision, base_xp, awarded_xp, attribute_allocations_json, penalty_applied, is_reversal, reverses_event_id, created_at) VALUES (?, ?, ?, ?, ?, ?, 'historical-correction-reversal', ?, ?, ?, ?, ?, 0, 1, ?, ?)",
      makeId("reversal"), "reverse:" + event.id, profile.id, completion.quest_id, completion.occurrence_id, completionId, event.difficulty,
      event.quest_revision, -event.base_xp, -event.awarded_xp, JSON.stringify(reversedAllocations), event.id, now.toISOString());
    const progression = await getProgressRow(tx, profile.id);
    const total = Math.max(0, (progression?.total_xp ?? 0) - event.awarded_xp);
    const level = calculateLevel(total);
    await tx.runAsync("UPDATE player_progression SET total_xp = ?, level = ?, xp_into_level = ?, xp_to_next_level = ? WHERE player_id = ?", total, level.level, level.xpIntoLevel, level.xpToNextLevel, profile.id);
    for (const [code, value] of Object.entries(reversedAllocations)) {
      await tx.runAsync("UPDATE player_attributes SET xp = MAX(0, xp + ?) WHERE player_id = ? AND code = ?", value ?? 0, profile.id, code);
    }
    await tx.runAsync("UPDATE quest_occurrences SET status = 'corrected', progress = 0, updated_at = ? WHERE id = ?", now.toISOString(), completion.occurrence_id);
    await reconcileStreaks(tx, profile, now);
  });
}
export async function resetLocalDemo(db: AscendiaDatabase) { await resetDatabaseContents(db); }
export async function getDatabaseSummary(db: AscendiaDatabase) {
  const version = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version;");
  const profileCount = await db.getFirstAsync<{ count: number }>("SELECT COUNT(*) AS count FROM player_profile");
  const questCount = await db.getFirstAsync<{ count: number }>("SELECT COUNT(*) AS count FROM quests");
  const rewardCount = await db.getFirstAsync<{ count: number }>("SELECT COUNT(*) AS count FROM reward_ledger");
  return { schemaVersion: version?.user_version ?? 0, profileCount: profileCount?.count ?? 0, questCount: questCount?.count ?? 0, rewardCount: rewardCount?.count ?? 0 };
}
