# Game Rules and Progression Specification

## Approved constants

### Classes
Warrior, Ranger, Mage, Assassin, Guardian, Scholar. Classes are identity and appearance choices only.

### Attributes
Strength (STR), Endurance (END), Intelligence (INT), Discipline (DIS), Vitality (VIT), Wisdom (WIS).

### Ranks
E, D, C, B, A, S, SS, SSS.

### Difficulty base XP
| Difficulty | Base XP |
|---|---:|
| Very Easy | 10 |
| Easy | 20 |
| Normal | 35 |
| Hard | 60 |
| Epic | 100 |
| Legendary | 200 |

### Attribute distribution
Player XP receives 100% of the configured award. The primary attribute receives 100%. Up to two distinct secondary attributes each receive 50%. Fractional half-XP rounds half-up. Attribute XP does not increase player XP a second time.

## Quest types

- Daily: one rewarded completion for each scheduled local day. Unscheduled days are not misses.
- Weekly: manual progress toward a measurable target within the configured week. Award once for the valid weekly occurrence when the target is reached.
- One-Time: single completion, optional deadline, overdue tasks remain completable.
- Milestone: cumulative measurable target with one reward when the target is reached. Partial progress does not earn the full reward.

Editing affects future behavior and preserves historical completions and rewards. Archiving removes a quest from active use without corrupting history.

## Rank progression

The specification calls for a hybrid of level and sustained consistency requirements, with promotion aimed at a long-term journey. Exact numerical rank thresholds are not approved. Keep values in central configuration and label any temporary local-demo values as demo-only in the UI and docs. Do not bake provisional thresholds into screen components.

## Streaks, grace and weakened state

The master specification describes scheduled-occurrence streaks, one weekly grace miss, a possible 10% reduction to future XP, and recovery after three successful days. The exact interpretation of grace consumption, recovery counting, time boundaries and retroactive corrections needs explicit decisions before implementing the penalties. Never apply hidden deductions.

## Historical correction window

Genuine completions can be corrected within 48 hours. A correction must reconcile completion state, player XP, attribute XP, streaks, penalties, and related weekly or milestone progress without duplicate rewards. If safe reversible accounting is not implemented, disable the correction action rather than expose a broken control.

## Time and occurrence rules

- Confirm and save the user's home timezone as an IANA identifier.
- Do not silently change the home timezone during travel.
- Monday is the default week start, with a preference to configure it.
- Historical occurrences keep their original schedule interpretation.
- Test local date boundaries, daylight saving, travel, schedule edits, restarts and offline records.
