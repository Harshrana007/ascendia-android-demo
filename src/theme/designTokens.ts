import { colors } from "./colors";
export const gradients = {
  primary: [colors.electricSapphire, colors.arcaneViolet] as const,
  cosmic: [colors.deepCosmicBlue, colors.midnightNavy, "#050916"] as const,
  cyanViolet: [colors.celestialCyan, colors.electricSapphire, colors.arcaneViolet] as const,
  panel: ["rgba(16, 27, 56, 0.96)", "rgba(8, 13, 32, 0.97)"] as const,
  disabled: ["#3A4560", "#252E46"] as const,
} as const;
export const borderStyles = {
  subtle: { color: colors.divider, width: 1 },
  cyan: { color: colors.panelBorder, width: 1 },
  violet: { color: colors.panelBorderViolet, width: 1 },
  focus: { color: colors.focus, width: 1.5 },
} as const;
export const elevation = {
  panel: { elevation: 4, shadowColor: "#030817", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 9 },
  glow: { shadowColor: colors.electricSapphire, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.26, shadowRadius: 12, elevation: 2 },
} as const;
export const glow = { subtleOpacity: 0.16, standardOpacity: 0.28, strongOpacity: 0.42, blurRadius: 16 } as const;
export const motion = { quick: 120, standard: 220, ceremonial: 480 } as const;
export const rankAccents = { E: "#A7B5D0", D: "#75D9FF", C: "#428BFF", B: "#64A8FF", A: "#B7A0FF", S: "#8765F5", SS: "#E9C77A", SSS: "#FFE7AC" } as const;
export const attributeAccents = { STR: "#FF617C", END: "#38E0A8", INT: "#4D8DFF", DIS: "#E9C77A", VIT: "#F46CCF", WIS: "#A879FF" } as const;