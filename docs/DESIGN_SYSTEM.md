# Cosmic Horizon Design System

## Visual direction

Cosmic Horizon is an original anime-fantasy RPG interface, not a generic habit tracker with purple gradients. Use cinematic character art and celestial environments as the visual foundation, with fine luminous edges and readable dark surfaces. The supplied references define the target hierarchy, but their PNG files have not yet been transferred to Git, so final screenshot comparison remains blocked.

## Color tokens

All UI colors live in `src/theme/colors.ts`. Additional gradients, border variants, elevation and glow, motion durations, rank accents and attribute accents live in `src/theme/designTokens.ts`.

| Token | Hex | Use |
|---|---|---|
| midnightNavy | #080D20 | Main app background |
| deepCosmicBlue | #101B38 | Navigation and layered backgrounds |
| electricSapphire | #428BFF | Primary action and blue highlight |
| celestialCyan | #75D9FF | Active states, progress and focus |
| arcaneViolet | #8765F5 | Rank and secondary magical accent |
| luminousLavender | #B7A0FF | Secondary glow and selection |
| paleStarlight | #E8F1FF | Primary text |
| mutedSilver | #A7B5D0 | Secondary text |
| restrainedGold | #E9C77A | Rewards and achievements |

Use glow as an accent, never as the only source of contrast. Do not apply the full palette at full intensity to every surface.

## Typography

No approved custom font files were present during the foundation audit. The shared typography module therefore uses Android system fallbacks: `serif` for display titles, `sans-serif` for body copy, `sans-serif-medium` for labels, and `monospace` for progression numbers. Shared type tokens cover display, screen title, section title, body, secondary, label, numeric and rank styles. Custom font binaries should be added only after source and redistribution terms are approved.

## Geometry

`src/theme/spacing.ts` owns spacing, screen gutter, section gap, radii, navigation dimensions, icon sizes, minimum touch target and border widths. Reuse these tokens rather than adding arbitrary per-screen values. Not every element needs the same card shape or a strong neon edge.

## Reusable primitives

- `CosmicBackground`: an optional background image with a controlled overlay or a dark-gradient fallback.
- `GlassFantasyPanel`: a dark layered surface with cyan, violet or subtle border options.
- `GradientActionButton`: a real action with disabled and loading states.
- `XPProgressBar`: an accessible, clamped display of supplied progress. It never calculates XP.
- `RankCrystal`: configurable E through SSS SVG crest. It is an original vector placeholder, not final illustrated rank artwork.
- `AttributeBadge`: consistent attribute code and value treatment.
- `QuestIconTile`: shared icon category and completion treatment.
- `SectionHeader`: title, subtitle and optional action shown only when a callback exists.

The icon family in `src/components/icons/AscendiaIcon.tsx` uses original SVG drawings. Tabs and task types do not use emoji.

## Rank and attribute accents

Ranks E, D, C, B, A, S, SS and SSS use `rankAccents`. Attributes STR, END, INT, DIS, VIT and WIS use `attributeAccents`. They affect presentation only, never game calculations.

## Artwork and Android layout

Keep artwork aspect ratios, crop deliberately, protect contrast with overlay tokens, and adapt to Android safe areas and system bars. Never use a complete reference screenshot as an app screen. Two committed demo art assets are compact 320-pixel WebP files and must be replaced with high-resolution approved art before production. Both images are opaque and do not have alpha transparency.

Respect font scaling, readable contrast, accessible controls and reduced motion. No real Android screenshot comparison has been run in this session.
