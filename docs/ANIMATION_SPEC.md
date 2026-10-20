# Animation and Welcome Experience

## Intent

The app should feel like an original anime-fantasy progression experience. The dramatic language is welcome for earned promotions, but the primary job remains recording real-world habits quickly. Use original narrative copy and light humor where appropriate; never copy quotes or dialogue from existing anime.

Possible original copy:
- Welcome: "Your next evolution begins today."
- Quest completion: "Quest cleared. Progress secured."
- Level-up: "Level up. The work is becoming you."
- Rank promotion: "Rank ascended. Earned through consistency."
- Missed habit recovery: "Reset your focus. Your journey continues."

These are optional original examples, not approved final copy. Keep ordinary UI copy literal and clear.

## Welcome sequence

1. Load the cosmic environment without an unnecessary fixed delay.
2. Reveal a restrained number of stars or energy accents.
3. Introduce the ASCENDIA wordmark.
4. Reveal the rank crystal or energy ring.
5. Transition to onboarding on first launch or Home when a valid local profile already exists.

The screen must not pretend that a server connection is occurring. If initialization is complete, skip the loading display rather than delaying the user for drama.

## Progression motion

- Short screen entrance and tab selection transitions.
- Responsive button press feedback.
- XP bar fill after a reward transaction is confirmed.
- Brief earned XP feedback.
- Quest completion and checkmark transition.
- Attribute updates tied to the persisted result.
- Dismissible level-up overlay when a level genuinely changes.
- Rank-promotion ceremony when the configured requirements are met.
- Automatic character illustration transition based on selected identity and saved rank.

Do not delay persistence until animations finish. Repeated taps must not trigger duplicate transactions or repeated earned rewards.

## Accessibility and performance

- Respect reduced-motion preference where possible.
- Keep animations short, interruptible and skippable where appropriate.
- Avoid full-screen constant particles, large permanent glows and effects that impair scrolling or text contrast.
- Use Reanimated for state-driven motion. Use Lottie only for a suitable original or licensed asset when justified.
- Test on a real Android device when possible and report unavailable testing honestly.
