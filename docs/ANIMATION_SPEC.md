# Animation and Welcome Experience

## Purpose and tone

Make earned progress feel like an anime-fantasy rank advancement without slowing everyday habit entry. Use original hunter and dungeon language sparingly. Suitable original examples include "Quest cleared. Progress secured." and "Rank ascended. Earned through consistency." Do not copy quotations or dialogue from existing anime.

## Ready-to-animate primitives

Theme tokens expose quick, standard and ceremonial durations. RankCrystal is parameterized by rank and size. XPProgressBar exposes a clamped ratio and accessible value. QuestIconTile accepts a completion state. GradientActionButton exposes pressed, disabled and loading states. CosmicBackground accepts an image source and overlay strength.

These are static presentation primitives in Step 2. Complex animation is deferred.

## Welcome sequence direction

1. Reveal the cosmic environment without a fixed delay.
2. Introduce a small number of subtle star or energy accents.
3. Reveal the ASCENDIA wordmark using the approved display typography.
4. Bring in the rank insignia with controlled blue and violet light.
5. Transition to onboarding for a new profile, or Home if a saved local profile exists.

Possible original copy: "Welcome, Hunter.", "Your next chapter begins here.", and "System Notice: Your journey is ready." These are copy directions, not final approved UI strings. Do not imply a server connection or wait for drama if initialization has finished.

## Earned progression motion

Press feedback, small navigation transitions, saved XP bar fills, reward feedback after transaction success, quest completion checkmark, attribute updates, dismissible level-up overlay, promotion ceremony when requirements are met, and character image transition after saved rank change.

Persist first and animate second. Repeated taps must not duplicate transactions or rewards.

## Accessibility and performance

Respect reduced motion where possible. Keep effects interruptible and short. Avoid full-screen continuous particles and heavy glow loops. Do not use animation as evidence of a successful save. Validate animation smoothness on Android once a device or emulator is available.

The welcome animation and earned progression ceremonies are not implemented in Step 2.

## Step 5.5 welcome source implementation

The welcome uses a finite sequence: hunter portrait reveal, crest and wordmark reveal, rank crystal and copy reveal, then the Begin Journey action. Skip Intro jumps to the final state. Android reduced-motion changes reveal the content without staged motion. No fake loading timer or continuous particle loop is used.

The native splash is separate Expo configuration. `NativeSplashGate` releases it when local initialization is ready or exposes a recoverable error. Native splash rendering must still be checked from a preview APK. Rank promotion remains disabled pending approved progression rules.

## Step 5 state-driven interaction notes

The welcome and rank insignia animation now have finite timing with Skip Intro and reduced-motion handling. The native splash is distinct from the welcome experience. Quest and Adventure buttons remain tied to repository outcomes, not animation timers. Rank promotion and level-up ceremony are not claimed implemented because the promotion gate is still disabled and requires approved progression rules.
