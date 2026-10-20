import { calculateLevel, calculateReward, evaluateRankPromotion, nextLocalDate, startOfWeek, STREAK_POLICY } from "@/game/progression/rules";
import { DIFFICULTY_XP } from "@/services/demoFixtures";
import { resolveScheduledDayOutcome } from "@/game/streaks/policy";

describe("centralized XP and level rules", () => {
  it("derives demo level and current-level XP at boundaries", () => {
    expect(calculateLevel(0)).toEqual({ level: 1, xpIntoLevel: 0, xpToNextLevel: 1000, progressRatio: 0 });
    expect(calculateLevel(999)).toEqual({ level: 1, xpIntoLevel: 999, xpToNextLevel: 1000, progressRatio: 0.999 });
    expect(calculateLevel(1000)).toEqual({ level: 2, xpIntoLevel: 0, xpToNextLevel: 1000, progressRatio: 0 });
    expect(calculateLevel(-10)).toEqual({ level: 1, xpIntoLevel: 0, xpToNextLevel: 1000, progressRatio: 0 });
  });
  it("retains every approved difficulty XP value", () => {
    expect(DIFFICULTY_XP).toEqual({ "Very Easy": 10, Easy: 20, Normal: 35, Hard: 60, Epic: 100, Legendary: 200 });
  });
  it("allocates primary and secondary XP without multiplying player XP", () => {
    const result = calculateReward("Hard", "STR", ["END", "VIT"], false);
    expect(result.baseXp).toBe(60); expect(result.awardedXp).toBe(60);
    expect(result.attributeAllocations).toEqual({ STR: 60, END: 30, VIT: 30 });
  });
  it("rounds secondary attribute XP half-up and removes duplicate/primary selections", () => {
    expect(calculateReward("Normal", "INT", ["DIS", "WIS", "DIS", "INT"], false).attributeAllocations).toEqual({ INT: 35, DIS: 18, WIS: 18 });
  });
  it("applies penalty only to future awards and allocates from actual awarded XP", () => {
    const result = calculateReward("Normal", "INT", ["DIS"], true);
    expect(STREAK_POLICY.futureXpPenaltyPercent).toBe(10);
    expect(result.baseXp).toBe(35); expect(result.awardedXp).toBe(32); expect(result.penaltyApplied).toBe(true);
    expect(result.attributeAllocations).toEqual({ INT: 32, DIS: 16 });
  });
  it("keeps rank promotion disabled while thresholds need approval", () => {
    expect(evaluateRankPromotion("E", 999, 900).eligible).toBe(false);
    expect(evaluateRankPromotion("E", 999, 900).nextRank).toBeNull();
  });
  it("calculates Monday and Sunday week boundaries from local date labels", () => {
    expect(startOfWeek("2026-10-20", "Monday")).toBe("2026-10-19");
    expect(startOfWeek("2026-10-20", "Sunday")).toBe("2026-10-18");
    expect(startOfWeek("2026-10-18", "Sunday")).toBe("2026-10-18");
    expect(nextLocalDate("2026-10-31")).toBe("2026-11-01");
  });
});
describe("provisional scheduled-day policy", () => {
  it("uses one grace miss per week, then breaks the chain", () => {
    expect(resolveScheduledDayOutcome(true, false)).toEqual({ outcome: "success", consumesGrace: false });
    expect(resolveScheduledDayOutcome(false, false)).toEqual({ outcome: "grace", consumesGrace: true });
    expect(resolveScheduledDayOutcome(false, true)).toEqual({ outcome: "miss", consumesGrace: false });
  });
});
