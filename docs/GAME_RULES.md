# Gameplay Rules

## Base XP

| Difficulty | Base XP |
|---|---:|
| Very Easy | 10 |
| Easy | 20 |
| Normal | 35 |
| Hard | 60 |
| Epic | 100 |
| Legendary | 200 |

The shared `DIFFICULTY_XP` table is the source of truth. The UI does not calculate rewards.

## Attribute distribution

Player XP receives 100% of actual awarded XP. The primary attribute receives 100%; each of up to two distinct secondary attributes receives 50%, rounded half-up. A primary cannot also be secondary. Attribute balances do not multiply player XP. If the provisional penalty is active, XP is adjusted first and attribute allocations use that actual award.

## Levels and ranks

- The demo uses a flat 1,000 XP per level. This is not approved production balancing.
- Ranks are E, D, C, B, A, S, SS and SSS.
- Rank promotion is disabled until numerical level and sustained-consistency requirements are approved.
- The schema includes promotion history for future use, but no promotions are written in this demo.

## Quest occurrence rules

- Daily: one occurrence for each selected weekday in the confirmed home timezone. Unscheduled days are not misses.
- Weekly: one measurable target per configured week. The current period retains its original timezone and period if week-start settings change mid-period.
- One-Time: one lifetime occurrence with an optional deadline. Overdue tasks remain completable for full configured XP.
- Milestone: one lifetime numeric target. Partial progress earns no full target reward.
- Daily and One-Time use direct completion; Weekly and Milestone use positive numeric progress and award only at the target.
- Editing creates a revision snapshot. Past completions use the snapshot that existed at the occurrence.
- Quest type changes are refused because they would reinterpret occurrence history. Archive and create a replacement instead.
- Archiving removes a quest from active use but preserves history.

## Duplicate rewards and transactions

Completion and reward writes are grouped in a single exclusive transaction. The reward ledger has a unique reward key for an occurrence, and SQLite allows one valid completion per occurrence. Retries and double taps cannot award the same occurrence twice.

## Provisional streak policy requiring approval

1. A successful scheduled day means every active Daily quest scheduled for that local day is complete.
2. Days with no scheduled Daily occurrences are ignored.
3. The first missed scheduled day per configured week consumes grace and preserves the chain, but does not count as a recovery success.
4. A further miss in the same week breaks the streak and activates a 10% reduction on future XP rewards only. XP already earned is not silently deducted.
5. Three successful scheduled days end the penalty.
6. The policy is configurable and provisional. It requires product approval before production.

## Timezone and corrections

The profile stores an IANA home timezone and a Monday-default week start, with Sunday also supported. Device timezone changes do not silently overwrite the home timezone. Each occurrence retains its timezone and period interpretation.

A valid completion can be corrected within 48 hours. Correction invalidates the completion and associated progress entries, appends a compensating reward reversal, restores player and attribute balances, recalculates streak state, and voids the affected occurrence so it cannot earn a second reward. Original records remain visible. Repeated, future-dated or out-of-window corrections are rejected.
