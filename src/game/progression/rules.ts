import type { AttributeCode, HunterRank, QuestDifficulty } from "@/types/demo";
import { DIFFICULTY_XP } from "@/services/demoFixtures";

export const DEMO_LEVEL_RULES = {
  mode: "flat-threshold",
  xpPerLevel: 1000,
  productionApproved: false,
} as const;

export const RANK_POLICY = {
  enabled: false,
  ranks: ["E", "D", "C", "B", "A", "S", "SS", "SSS"] as const,
  thresholds: {} as Partial<Record<HunterRank, { minimumLevel: number; minimumSuccessfulScheduledDays: number }>,
  requiresSustainedConsistency: true,
  productionApproved: false,
} as const;

export const STREAK_POLICY = {
  graceMissesPerWeek: 1,
  futureXpPenaltyPercent: 10,
  recoverySuccessfulScheduledDays: 3,
  provisionalDemoInterpretation: true,
} as const;

export type AttributeAllocation = Partial<Record<AttributeCode, number>>;
export type RewardCalculation = {
  baseXp: number;
  awardedXp: number;
  penaltyApplied: boolean;
  attributeAllocations: AttributeAllocation;
};

export function calculateLevel(totalXp: number) {
  const safe = Number.isFinite(totalXp) ? Math.max(0, Math.floor(totalXp)) : 0;
  const threshold = DEMO_LEVEL_RULES.xpPerLevel;
  const level = Math.floor(safe / threshold) + 1;
  const xpIntoLevel = safe % threshold;
  return { level, xpIntoLevel, xpToNextLevel: threshold, progressRatio: xpIntoLevel / threshold };
}

export function calculateReward(
  difficulty: QuestDifficulty,
  primary: AttributeCode,
  secondary: AttributeCode[],
  penaltyActive: boolean,
): RewardCalculation {
  const baseXp = DIFFICULTY_XP[difficulty];
  const uniqueSecondary = [...new Set(secondary)].filter((attribute) => attribute !== primary).slice(0, 2);
  const awardedXp = penaltyActive
    ? Math.floor(baseXp * (1 - STREAK_POLICY.futureXpPenaltyPercent / 100) + 0.5)
    : baseXp;
  const attributeAllocations: AttributeAllocation = { [primary]: awardedXp };
  for (const attribute of uniqueSecondary) {
    attributeAllocations[attribute] = Math.floor(awardedXp / 2 + 0.5);
  }
  return { baseXp, awardedXp, penaltyApplied: penaltyActive, attributeAllocations };
}

export function evaluateRankPromotion(
  rank: HunterRank,
  level: number,
  successfulScheduledDays: number,
) {
  if (!RANK_POLICY.enabled || !RANK_POLICY.productionApproved) {
    return { eligible: false, currentRank: rank, nextRank: null as HunterRank | null, reason: "Rank thresholds require product approval." };
  }
  const currentIndex = RANK_POLICY.ranks.indexOf(rank);
  const nextRank = RANK_POLICY.ranks[currentIndex + 1] ?? null;
  if (!nextRank) return { eligible: false, currentRank: rank, nextRank: null, reason: "You already hold the highest configured rank." };
  const threshold = RANK_POLICY.thresholds[nextRank];
  if (!threshold) return { eligible: false, currentRank: rank, nextRank, reason: "No approved requirement is configured for the next rank." };
  const eligible = level >= threshold.minimumLevel && successfulScheduledDays >= threshold.minimumSuccessfulScheduledDays;
  return { eligible, currentRank: rank, nextRank, reason: eligible ? "Configured requirements met." : "Keep building level and consistency." };
}

export function startOfWeek(localDate: string, weekStart: "Monday" | "Sunday"): string {
  const date = new Date(localDate + "T12:00:00.000Z");
  const weekday = date.getUTCDay();
  const offset = weekStart === "Monday" ? (weekday + 6) % 7 : weekday;
  date.setUTCDate(date.getUTCDate() - offset);
  return date.toISOString().slice(0, 10);
}

export function nextLocalDate(localDate: string, days = 1): string {
  const date = new Date(localDate + "T12:00:00.000Z");
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
