import type { AdventureKey, CompletionSummary, Quest } from "@/types/demo";

export const ADVENTURE_DEFINITIONS = [
  {
    key: "hollow-crypt",
    title: "Hollow Crypt",
    rank: "E" as const,
    description: "A quiet passage where small daily acts become a reliable foundation.",
    objective: "Record three valid completions of scheduled Daily quests.",
    sealedHint: "Complete three real Daily quest occurrences. No dungeon grinding or bonus XP is involved.",
  },
  {
    key: "iron-bastion",
    title: "Iron Bastion",
    rank: "D" as const,
    description: "A test of follow-through, built around a real weekly target.",
    objective: "Complete a Weekly quest by reaching its configured target.",
    sealedHint: "Create a Weekly quest and record enough real progress to reach its target.",
  },
  {
    key: "sages-labyrinth",
    title: "Sage's Labyrinth",
    rank: "C" as const,
    description: "A route through patient learning and measurable long-term growth.",
    objective: "Complete a Milestone quest at its configured target.",
    sealedHint: "Create a Milestone quest and make real measured progress to its target.",
  },
] as const;

export type AdventureProgress = { ratio: number; eligible: boolean; progressLabel: string };

function validCount(history: CompletionSummary[], type: CompletionSummary["type"]) {
  return history.filter((item) => item.valid && item.type === type).length;
}

export function deriveAdventureProgress(key: AdventureKey, quests: Quest[], history: CompletionSummary[]): AdventureProgress {
  if (key === "hollow-crypt") {
    const count = validCount(history, "Daily");
    return { ratio: Math.min(1, count / 3), eligible: count >= 3, progressLabel: Math.min(count, 3) + " / 3 valid Daily clears" };
  }
  if (key === "iron-bastion") {
    const count = validCount(history, "Weekly");
    return { ratio: count > 0 ? 1 : 0, eligible: count > 0, progressLabel: count > 0 ? "Weekly target cleared" : "0 / 1 Weekly targets cleared" };
  }
  const cleared = validCount(history, "Milestone");
  if (cleared > 0) return { ratio: 1, eligible: true, progressLabel: "Milestone target cleared" };
  const candidates = quests.filter((quest) => quest.type === "Milestone" && !quest.isArchived && quest.target !== null && quest.target > 0);
  const ratio = candidates.reduce((best, quest) => Math.max(best, Math.max(0, Math.min(0.99, quest.progress / (quest.target ?? 1)))), 0);
  return {
    ratio,
    eligible: false,
    progressLabel: candidates.length ? "Best active milestone: " + Math.round(ratio * 100) + "% of its measured target" : "Create a Milestone quest to begin measured progress",
  };
}
