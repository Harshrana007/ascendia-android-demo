import type { AdapterResult, DemoState, OnboardingInput, Quest, QuestDraft, RewardEvent } from "@/types/demo";
import { DEMO_PROGRESS_RULES, DIFFICULTY_XP, QUEST_TEMPLATES, createEmptyAttributeXp } from "./demoFixtures";
export const emptyDemoState = (): DemoState => ({ profile: null, quests: [], rewardLedger: [] });
const makeId = (prefix: string) => prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
const nowIso = () => new Date().toISOString();

export function createPlayer(input: OnboardingInput) {
  return {
    id: makeId("player"), name: input.name.trim(), className: input.className, presentation: input.presentation,
    homeTimezone: input.homeTimezone.trim() || "UTC", weekStart: input.weekStart, interests: input.interests,
    rank: "E" as const, level: 1, totalXp: 0, xpIntoLevel: 0, xpToNextLevel: DEMO_PROGRESS_RULES.levelXp,
    attributeXp: createEmptyAttributeXp(), dailyStreak: 0, bestStreak: 0, notificationsEnabled: false,
    reducedMotion: false, onboardingComplete: true as const,
  };
}
export function createQuestFromDraft(draft: QuestDraft, id = makeId("quest")): Quest {
  return {
    ...draft, title: draft.title.trim(), description: draft.description.trim(),
    secondaryAttributes: draft.secondaryAttributes.filter((code) => code !== draft.primaryAttribute).slice(0, 2),
    weekdays: draft.type === "Daily" ? [...draft.weekdays] : [],
    target: draft.type === "Weekly" || draft.type === "Milestone" ? Math.max(1, draft.target ?? 1) : null,
    unit: draft.type === "Weekly" || draft.type === "Milestone" ? (draft.unit?.trim() || "sessions") : null,
    id, xpReward: DIFFICULTY_XP[draft.difficulty], progress: 0, isCompleted: false, isArchived: false,
    createdAt: nowIso(), updatedAt: nowIso(),
  };
}
export function finishOnboarding(_state: DemoState, input: OnboardingInput, selectedKeys: string[]): DemoState {
  const quests = QUEST_TEMPLATES.filter((item) => selectedKeys.includes(item.key)).map((item) => createQuestFromDraft({
    title:item.title, description:item.description, type:item.type, difficulty:item.difficulty,
    primaryAttribute:item.primaryAttribute, secondaryAttributes:item.secondaryAttributes, weekdays:item.weekdays,
    target:item.target, unit:item.unit,
  }, item.key));
  return { profile: createPlayer(input), quests, rewardLedger: [] };
}
function applyReward(state: DemoState, quest: Quest, now: Date): DemoState {
  if (!state.profile) return state;
  const xp = quest.xpReward;
  const attributeXp: RewardEvent["attributeXp"] = { [quest.primaryAttribute]: xp };
  for (const code of quest.secondaryAttributes) attributeXp[code] = Math.floor(xp / 2 + 0.5);
  const profile = { ...state.profile, totalXp: state.profile.totalXp + xp, attributeXp: { ...state.profile.attributeXp } };
  let level = profile.level;
  let currentXp = profile.xpIntoLevel + xp;
  while (currentXp >= profile.xpToNextLevel) { currentXp -= profile.xpToNextLevel; level += 1; }
  profile.level = level; profile.xpIntoLevel = currentXp;
  for (const [code, amount] of Object.entries(attributeXp)) profile.attributeXp[code as keyof typeof profile.attributeXp] += amount ?? 0;
  const event: RewardEvent = { id: makeId("reward"), questId: quest.id, questTitle: quest.title, xp, createdAt: now.toISOString(), attributeXp };
  return { ...state, profile, rewardLedger: [...state.rewardLedger, event] };
}
export function completeQuest(state: DemoState, questId: string, now = new Date()): AdapterResult {
  const quest = state.quests.find((item) => item.id === questId && !item.isArchived);
  if (!quest) return { state, status:"not-found", xpAwarded:0, message:"This quest is no longer active." };
  if (quest.isCompleted) return { state, status:"already-completed", xpAwarded:0, message:"This occurrence has already been cleared." };
  if (quest.type === "Weekly" || quest.type === "Milestone") return { state, status:"not-progress-based", xpAwarded:0, message:"Add measured progress to reach this target." };
  let next: DemoState = { ...state, quests: state.quests.map((item) => item.id === questId ? { ...item, isCompleted:true, completedAt:now.toISOString(), rewardedAt:now.toISOString(), updatedAt:now.toISOString() } : item) };
  next = applyReward(next, quest, now);
  return { state:next, status:"completed", xpAwarded:quest.xpReward, message:"Quest cleared. +" + quest.xpReward + " XP added to this demo session." };
}
export function addQuestProgress(state: DemoState, questId: string, amount: number, now = new Date()): AdapterResult {
  const quest = state.quests.find((item) => item.id === questId && !item.isArchived);
  if (!quest) return { state, status:"not-found", xpAwarded:0, message:"This quest is no longer active." };
  if (quest.type !== "Weekly" && quest.type !== "Milestone") return { state, status:"not-progress-based", xpAwarded:0, message:"This quest uses direct completion." };
  if (quest.isCompleted) return { state, status:"already-completed", xpAwarded:0, message:"This target has already been reached." };
  const validAmount = Number.isFinite(amount) && amount > 0 ? amount : 0;
  if (!validAmount) return { state, status:"not-progress-based", xpAwarded:0, message:"Enter progress greater than zero." };
  const target = Math.max(1, quest.target ?? 1);
  const progress = Math.min(target, quest.progress + validAmount);
  const reached = progress >= target;
  const updated = { ...quest, progress, isCompleted:reached, completedAt:reached ? now.toISOString() : undefined, rewardedAt:reached ? now.toISOString() : undefined, updatedAt:now.toISOString() };
  let next: DemoState = { ...state, quests: state.quests.map((item) => item.id === questId ? updated : item) };
  if (reached) next = applyReward(next, updated, now);
  return { state:next, status:reached ? "goal-reached" : "progress-updated", xpAwarded:reached ? quest.xpReward : 0,
    message: reached ? "Target reached. +" + quest.xpReward + " XP added to this demo session." : "Progress updated: " + progress + " of " + target + " " + (quest.unit ?? "units") + "." };
}
export function updateQuestInState(state: DemoState, id: string, draft: QuestDraft): DemoState {
  const old = state.quests.find((item) => item.id === id);
  if (!old) return state;
  const fresh = createQuestFromDraft(draft, old.id);
  return { ...state, quests: state.quests.map((item) => item.id !== id ? item : {
    ...fresh, xpReward: old.isCompleted ? old.xpReward : fresh.xpReward, createdAt: old.createdAt, updatedAt: nowIso(),
    progress: old.type === fresh.type ? old.progress : 0, isCompleted: old.isCompleted, isArchived: old.isArchived,
    completedAt: old.completedAt, rewardedAt: old.rewardedAt,
  }) };
}
export function archiveQuestInState(state: DemoState, id: string): DemoState {
  return { ...state, quests: state.quests.map((item) => item.id === id ? { ...item, isArchived:true, updatedAt:nowIso() } : item) };
}
