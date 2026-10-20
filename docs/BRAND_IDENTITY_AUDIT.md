# Brand Identity Audit

Date: 2026-10-20
Branch: `main`

## Configured assets
- Launcher icon: `assets/images/branding/ascendia-app-icon.png` (256 x 256 PNG)
- Adaptive foreground: `assets/images/branding/ascendia-adaptive-foreground.png` (256 x 256 PNG with transparency)
- Native splash: `assets/images/branding/ascendia-splash-icon.png` (256 x 256 PNG with transparency)
- Welcome portrait: `assets/images/characters/ascendia-character-hunter-initial.webp` (320 x 427 WebP, opaque RGB)
- Cosmic environment: `assets/images/backgrounds/cosmic-home-background.webp` (320 x 180 WebP, opaque RGB)
- Rank insignia: `src/components/visual/RankCrystal.tsx`

## Integration and limitations
Expo config maps launcher icon, adaptive foreground and native splash artwork to separate PNG files. Welcome uses the committed hunter portrait and crystal motif. Character art resolution is provisional only for Warrior/male/Rank E. Other variants use the class-emblem fallback.

Icon exports are compact demo assets, not production store artwork. Adaptive masking, native splash rendering and installed launcher appearance must be inspected on an actual preview APK. No Android branding screenshots have been produced.

## AAPT2 remediation

The supplied EAS log failed at `:app:mergeReleaseResources` while compiling the previous splash PNG. The old low-resolution brand exports were replaced with validated 256 x 256 PNG exports. Their PNG decoder validation is successful; the native AAPT2 result remains unverified until the next EAS build.
