import { deriveAdventureProgress } from "@/game/adventures/rules";
import type { CompletionSummary, Quest } from "@/types/demo";

function completion(type: CompletionSummary["type"], valid = true): CompletionSummary {
  return {
    completionId: type + (valid ? "-valid" : "-corrected"),
    questId: "quest", questTitle: "Real activity", type, difficulty: "Normal",
    completedAt: "2026-10-20T12:00:00.000Z", localDate: "2026-10-20", timezone: "UTC",
    xp: 35, valid, canCorrect: false,
  };
}
function milestone(progress: number, target: number): Quest {
  return {
    id: "milestone", title: "Read a book", description: "", type: "Milestone", difficulty: "Epic",
    primaryAttribute: "INT", secondaryAttributes: ["WIS"], weekdays: [], target, unit: "books",
    deadlineLocalDate: null, xpReward: 100, progress, isCompleted: false, isArchived: false,
    createdAt: "", updatedAt: "",
  };
}

describe("honest local adventure objectives", () => {
  it("opens Hollow Crypt progress only from valid saved Daily completions", () => {
    expect(deriveAdventureProgress("hollow-crypt", [], [completion("Daily"), completion("Daily", false)]).eligible).toBe(false);
    expect(deriveAdventureProgress("hollow-crypt", [], [completion("Daily"), completion("Daily"), completion("Daily")]).eligible).toBe(true);
  });
  it("requires a valid Weekly completion for Iron Bastion", () => {
    expect(deriveAdventureProgress("iron-bastion", [], [completion("Weekly", false)]).eligible).toBe(false);
    expect(deriveAdventureProgress("iron-bastion", [], [completion("Weekly")]).eligible).toBe(true);
  });
  it("derives Sage's Labyrinth progress from a real Milestone quest", () => {
    const partial = deriveAdventureProgress("sages-labyrinth", [milestone(2, 4)], []);
    expect(partial.ratio).toBe(0.5);
    expect(partial.eligible).toBe(false);
    expect(deriveAdventureProgress("sages-labyrinth", [milestone(4, 4)], [completion("Milestone")]).eligible).toBe(true);
  });
});
