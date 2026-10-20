# Cosmic Horizon Design System

## Visual direction

The supplied references define a premium anime-fantasy mobile interface: original character artwork integrated into cosmic scenery, deep celestial backdrops, illuminated rank crystals, tightly composed dark panels, electric blue and violet light, polished progress controls, and compact everyday interactions.

It should not look like a generic task list with a few game icons. It should also remain readable and efficient for someone recording a habit in real life.

## Approved starting palette

| Token | Hex | Intended use |
|---|---|---|
| midnightNavy | #080D20 | Primary background |
| deepCosmicBlue | #101B38 | Layered panels and secondary background |
| electricSapphire | #428BFF | Primary highlight and focus |
| celestialCyan | #75D9FF | Progress and selected actions |
| arcaneViolet | #8765F5 | Secondary highlight and magical accents |
| luminousLavender | #B7A0FF | Secondary glow and rank accents |
| paleStarlight | #E8F1FF | Main readable text |
| mutedSilver | #A7B5D0 | Secondary text |
| restrainedGold | #E9C77A | Reward accents |

These are starting tokens. Validate the finished palette against supplied artwork and real Android screenshots.

## Typography

- Use one readable modern text family for quest titles, descriptions, settings, labels, and daily controls.
- Use one suitable display face for brand/title/rank moments only if its license and native font loading are verified.
- Keep a consistent type scale, weights and line heights across all screens.
- Do not use decorative type for long task descriptions or small controls.
- The supplied screenshots' dense layout must be adapted for Android dimensions and text scaling, rather than copied as tiny unreadable text.

## Components to design as reusable primitives

- CosmicBackground and ScreenScaffold.
- Wordmark treatment, RankCrystal and AttributeTile.
- XPProgressBar and RankProgressRing.
- Dark glass panel, fine luminous border, and subtle GlowDivider.
- QuestRow and SectionHeader.
- Primary gradient action and IconActionButton.
- BottomTabBar with clear active and inactive states.
- ComingSoonCard and purpose-built empty, error and confirmation states.

## Layout principles

1. The Home sequence is compact branding, character hero, identity/rank HUD, level XP, streak summaries, today's quests, weekly progress, Create Quest, then persistent five-tab navigation.
2. The hero must be visually memorable without pushing the main quest action out of reach.
3. Preserve original artwork and do not stretch a full screenshot as a background.
4. Fine illuminated borders should establish structure; not every panel needs a strong neon edge.
5. Use artwork-specific crops and overlays so all quest text remains legible.
6. Use safe areas and Android system bars correctly.
7. Retain tab state and avoid unnecessary background image reloads.
8. Provide touch areas, contrast, reduced-motion behavior and accessible labels.
9. Use shared tokens, not duplicated arbitrary per-screen styling.

## Rank and attribute treatment

- Ranks follow E, D, C, B, A, S, SS, SSS.
- Attribute badges distinguish STR, END, INT, DIS, VIT and WIS, while retaining text labels so color is not the only signal.
- Rank-specific colors or glows are presentational. They must not silently affect reward calculations.

## Motion principles

See `ANIMATION_SPEC.md`. Prioritize short, event-driven motion tied to saved state. Continuous particle fields and heavy glow loops are not a substitute for compelling artwork.
