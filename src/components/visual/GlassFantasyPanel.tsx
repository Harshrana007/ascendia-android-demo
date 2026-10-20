import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { borderStyles, colors, elevation, radii, spacing } from "@/theme";
type Props = { children: ReactNode; tone?: "cyan" | "violet" | "subtle"; padding?: number; radius?: keyof typeof radii; style?: StyleProp<ViewStyle> };
export function GlassFantasyPanel({ children, tone = "cyan", padding = spacing.lg, radius = "lg", style }: Props) {
  const border = borderStyles[tone === "cyan" ? "cyan" : tone === "violet" ? "violet" : "subtle"];
  return <View style={[styles.panel, { padding, borderColor: border.color, borderWidth: border.width, borderRadius: radii[radius] }, tone === "cyan" && styles.cyanGlow, style]}>{children}</View>;
}
const styles = StyleSheet.create({
  panel: { backgroundColor: colors.panel, ...elevation.panel },
  cyanGlow: { shadowColor: colors.electricSapphire, shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 0 } },
});