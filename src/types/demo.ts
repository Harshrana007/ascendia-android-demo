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
 target: number | null; unit: string | null; deadlineLocalDate?: string | null;
};
export type Quest = QuestDraft & {
 id: string; xpReward: number; progress: number; isCompleted: boolean; isArchived: boolean;
 createdAt: string; updatedAt: string; completedAt?: string; rewardedAt?: string;
 occurrenceId?: string; currentRevision?: number; scheduledToday?: boolean;
 latestCompletionId?: string; canCorrect?: boolean; occurrenceKey?: string;
 occurrenceVoided?: boolean; occurrenceCorrectionNote?: string | null;
};
export type RewardEvent = {
 id: string; questId: string; questTitle: string; xp: number; createdAt: string;
 attributeXp: Partial<Record<AttributeCode, number>>; isReversal?: boolean;
};
export type CompletionSummary = {
 completionId: string; questId: string; questTitle: string; type: QuestType; difficulty: QuestDifficulty;
 completedAt: string; localDate: string; timezone: string; xp: number; valid: boolean;
 canCorrect: boolean; correctionNote?: string | null;
};
export type Achievement = { id: string; key: string; title: string; unlockedAt: string };
export type AdventureKey = "hollow-crypt" | "iron-bastion" | "sages-labyrinth";
export type AdventureState = {
 key: AdventureKey; status: "active" | "abandoned" | "completed"; startedAt: string; updatedAt: string; completedAt: string | null;
};
export type DemoState = {
 profile: PlayerProfile | null; quests: Quest[]; rewardLedger: RewardEvent[];
 history?: CompletionSummary[]; achievements?: Achievement[]; adventureStates: AdventureState[];
};
export type OnboardingInput = {
 name: string; className: CharacterClass; presentation: CharacterPresentation; interests: string[];
 homeTimezone: string; weekStart: WeekStart;
};
export type AdapterResult = {
 status: "completed" | "already-completed" | "not-found" | "not-scheduled" | "progress-updated" | "goal-reached" | "not-progress-based";
 xpAwarded: number; message: string;
};
