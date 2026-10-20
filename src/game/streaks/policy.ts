import { STREAK_POLICY } from "@/game/progression/rules";

export type ScheduledDayOutcome = "success" | "grace" | "miss";

/**
 * A scheduled day is successful only when every scheduled Daily occurrence is cleared.
 * One missed scheduled day per week consumes grace and preserves the chain without
 * counting toward recovery. Further misses break the chain and start the provisional
 * future-XP penalty. Days with no scheduled Daily occurrences are not evaluated.
 */
export function resolveScheduledDayOutcome(success: boolean, graceAlreadyUsedThisWeek: boolean): {
  outcome: ScheduledDayOutcome;
  consumesGrace: boolean;
} {
  if (success) return { outcome: "success", consumesGrace: false };
  if (!graceAlreadyUsedThisWeek && STREAK_POLICY.graceMissesPerWeek > 0) {
    return { outcome: "grace", consumesGrace: true };
  }
  return { outcome: "miss", consumesGrace: false };
}
