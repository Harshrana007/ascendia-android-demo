# Asset Manifest

## Committed original demo assets

| Asset ID | File path | Dimensions | Format / transparency | Source and purpose | Status |
|---|---|---:|---|---|---|
| ART-HUNTER-01 | `assets/images/characters/ascendia-character-hunter-initial.webp` | 320 x 427 | WebP, opaque RGB | Original generated dark-haired cosmic hunter illustration cropped to portrait | Committed and integrated as demo preview; low resolution, not production art |
| ART-BG-HOME-01 | `assets/images/backgrounds/cosmic-home-background.webp` | 320 x 180 | WebP, opaque RGB | Original generated celestial background used under a dark Home overlay | Committed and integrated; low resolution, replace for release |

The original generated source images were available as `/mnt/data/epic_fantasy_sci_fi_anime_illustration_scene_with.png` and `/mnt/data/wide_cinematic_high_detail_fantasy_sci_fi_landsc.png`. The source images remain outside Git; the committed WebP files are compact optimized variants.

The SVG rank crest at `src/components/visual/RankCrystal.tsx` is an original inline vector, not an external asset. It is a placeholder for future detailed illustrated rank crystals.

## Rejected local-only artwork experiments

| Asset ID | Actual local path | Dimensions / format | Purpose | Status and reason |
|---|---|---|---|---|
| EXP-CHAR-01 | `/mnt/data/a_high_detail_anime_style_character_illustration_o.png` | 1312 x 1199, RGB PNG | Original hunter cutout experiment | Not integrated. The checkerboard pattern is baked into RGB pixels; there is no alpha channel, so it is not a transparent cutout. |
| EXP-CHAR-02 | `/mnt/data/a_high_resolution_anime_style_fantasy_character_p.png` | 1312 x 1199, RGB PNG | Alternate original hunter cutout experiment | Not integrated for the same transparency issue. |

These experimental images are not committed to the repository. Do not use them as transparent character layers or describe them as production-ready assets. The source paths are from the current generation workspace, not repository paths.

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

## Step 5.5 brand exports

| Asset | Path | Dimensions | Format | Purpose and status |
|---|---|---:|---|---|
| Launcher icon | `assets/images/branding/ascendia-app-icon.png` | 256 x 256 | PNG | Compact Ascendia crystal for demo builds. Low resolution for production store submission. |
| Adaptive foreground | `assets/images/branding/ascendia-adaptive-foreground.png` | 256 x 256 | PNG with transparency | Matching crystal with transparent safe inset. Android mask not verified. |
| Native splash artwork | `assets/images/branding/ascendia-splash-icon.png` | 256 x 256 | PNG with transparency | Transparent crest on navy splash background. APK rendering not verified. |
| Welcome portrait | `assets/images/characters/ascendia-character-hunter-initial.webp` | 320 x 427 | WebP, opaque RGB | Original hunter concept, not art for every class, presentation or rank. |

The compact crest exports are demo assets, not final high-resolution production artwork. Only Warrior/male/Rank E has an explicit provisional portrait mapping. Other variants use the documented class-emblem fallback.

## Android AAPT2 resource remediation

The three brand PNGs were regenerated as 256 x 256, 8-bit RGBA, non-interlaced PNGs and decoded successfully with an independent image decoder before commit. Expo configuration points the launcher icon, adaptive foreground and splash to their separate files. This remediates the resource reported by EAS, but only a fresh native build can confirm AAPT2 compilation.

- Launcher: `assets/images/branding/ascendia-app-icon.png`
- Adaptive foreground: `assets/images/branding/ascendia-adaptive-foreground.png`
- Native splash: `assets/images/branding/ascendia-splash-icon.png`
