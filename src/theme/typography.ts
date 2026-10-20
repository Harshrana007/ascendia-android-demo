import type { TextStyle } from "react-native";
export const typography = {
  fontFamily: { display: "serif", body: "sans-serif", bodyMedium: "sans-serif-medium", numeric: "monospace" },
  fontSize: { xs: 11, sm: 13, md: 15, lg: 18, xl: 23, display: 34, rank: 42 },
  lineHeight: { tight: 18, normal: 22, relaxed: 27 },
  fontWeight: { regular: "400", medium: "500", semibold: "600", bold: "700" },
} as const;
type TextStyleName = "display" | "screenTitle" | "sectionTitle" | "body" | "secondary" | "label" | "numeric" | "rank";
export const textStyles: Record<TextStyleName, TextStyle> = {
  display: { fontFamily: typography.fontFamily.display, fontSize: typography.fontSize.display, lineHeight: 40, fontWeight: typography.fontWeight.semibold },
  screenTitle: { fontFamily: typography.fontFamily.display, fontSize: typography.fontSize.xl, lineHeight: 29, fontWeight: typography.fontWeight.semibold },
  sectionTitle: { fontFamily: typography.fontFamily.bodyMedium, fontSize: typography.fontSize.lg, lineHeight: typography.lineHeight.normal, fontWeight: typography.fontWeight.semibold },
  body: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.md, lineHeight: typography.lineHeight.relaxed, fontWeight: typography.fontWeight.regular },
  secondary: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal, fontWeight: typography.fontWeight.regular },
  label: { fontFamily: typography.fontFamily.bodyMedium, fontSize: typography.fontSize.xs, lineHeight: typography.lineHeight.tight, fontWeight: typography.fontWeight.medium },
  numeric: { fontFamily: typography.fontFamily.numeric, fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.medium, fontVariant: ["tabular-nums"] },
  rank: { fontFamily: typography.fontFamily.display, fontSize: typography.fontSize.rank, fontWeight: typography.fontWeight.bold },
};