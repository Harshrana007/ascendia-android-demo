export type CharacterClass = "Warrior" | "Ranger" | "Mage" | "Assassin" | "Guardian" | "Scholar";
export type CharacterPresentation = "male" | "female";
export type HunterRank = "E" | "D" | "C" | "B" | "A" | "S" | "SS" | "SSS";
export type QuestType = "Daily" | "Weekly" | "One-Time" | "Milestone";
export type QuestDifficulty = "Very Easy" | "Easy" | "Normal" | "Hard" | "Epic" | "Legendary";
export type AttributeCode = "STR" | "END" | "INT" | "DIS" | "VIT" | "WIS";
export type WeekStart = "Monday" | "Sunday";
export type PlayerProfile = {
  id: string; name: string; className: CharacterClass; presentation: CharacterPresentation;
  homeTimezone: string; weekStart: WeekStart; interests: string[]; rank: HunterRank;
  level: number; totalXp: number; xpIntoLevel: number; xpToNextLevel: number;
  attributeXp: Record<AttributeCode, number>; dailyStreak: number; bestStreak: number;
  notificationsEnabled: boolean; reducedMotion: boolean; onboardingComplete: true;
};
export type QuestDraft = {
  title: string; description: string; type: QuestType; difficulty: QuestDifficulty;
  primaryAttribute: AttributeCode; secondaryAttributes: AttributeCode[]; weekdays: number[];
  target: number | null; unit: string | null;
};
export type Quest = QuestDraft & {
  id: string; xpReward: number; progress: number; isCompleted: boolean; isArchived: boolean;
  createdAt: string; updatedAt: string; completedAt?: string; rewardedAt?: string;
};
export type RewardEvent = {
  id: string; questId: string; questTitle: string; xp: number; createdAt: string;
  attributeXp: Partial<Record<AttributeCode, number>>;
};
export type DemoState = { profile: PlayerProfile | null; quests: Quest[]; rewardLedger: RewardEvent[] };
export type OnboardingInput = {
  name: string; className: CharacterClass; presentation: CharacterPresentation; interests: string[];
  homeTimezone: string; weekStart: WeekStart;
};
export type AdapterResult = {
  state: DemoState;
  status: "completed" | "already-completed" | "not-found" | "progress-updated" | "goal-reached" | "not-progress-based";
  xpAwarded: number; message: string;
};
