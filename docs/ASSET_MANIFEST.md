# Asset Manifest

## Committed original demo assets

| Asset ID | File path | Dimensions | Format / transparency | Source and purpose | Status |
|---|---|---:|---|---|---|
| ART-HUNTER-01 | `assets/images/characters/ascendia-character-hunter-initial.webp` | 320 x 427 | WebP, opaque RGB | Original generated dark-haired cosmic hunter illustration cropped to portrait | Committed and integrated as demo preview; low resolution, not production art |
| ART-BG-HOME-01 | `assets/images/backgrounds/cosmic-home-background.webp` | 320 x 180 | WebP, opaque RGB | Original generated celestial background used under a dark Home overlay | Committed and integrated; low resolution, replace for release |

The original generated source images were available as `/mnt/data/epic_fantasy_sci_fi_anime_illustration_scene_with.png` and `/mnt/data/wide_cinematic_high_detail_fantasy_sci_fi_landsc.png`. The source images remain outside Git; the committed WebP files are compact optimized variants.

The SVG rank crest at `src/components/visual/RankCrystal.tsx` is an original inline vector, not an external asset. It is a placeholder for future detailed illustrated rank crystals.

## Supplied source references

| Asset ID | Source filename | Dimensions | Intended use | Git status |
|---|---|---:|---|---|
| REF-HOME-01 | `ChatGPT Image Oct 18, 2026, 03_30_47 PM-1(2).png` | 863 x 1822 | Home screen composition reference | Not tracked |
| REF-BOARD-01 | `cosmic-horizon-ui-reference(2).png` | 1536 x 1024 | Five-screen board and rank evolution strip | Not tracked |
| REF-STEP01-01 | `Ascendia Step One Project Foundation(1).png` | 1536 x 1024 | Foundation visual reference | Not tracked |
| SPEC-01 | `docs/reference/Ascendia_Master_Specification_Updated.md` | 1,530 lines | Product behavior and exclusions | Tracked |
| BUILD-01 | `ASCENDIA_DEMO_BUILD_STEPS.md` | 736 lines | Gated implementation plan | Tracked |

Canonical paths intended for later byte-for-byte transfer:

- `assets/references/ascendia-home-reference.png`
- `assets/references/cosmic-horizon-ui-reference.png`
- `assets/references/ascendia-step-one-foundation-reference.png`

The original PNG files are not yet present at those paths.

## Art still required

Higher-resolution Home and Player scenes; dedicated Quests, Player, Adventures and Profile environments; cleanly composited character art; detailed original rank crystals; an approved app icon and wordmark; expanded quest and attribute icons; and licensed display/body font assets.

All asset entries must record real paths, dimensions, format, source, transparency, integration and quality limitations. Do not claim alpha transparency when it is absent. Never use complete reference screenshots as app screens or copy protected anime characters, logos or interfaces.
