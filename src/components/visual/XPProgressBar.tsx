import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { colors, gradients, radii, spacing, typography } from "@/theme";
import { clampProgress, formatProgress } from "@/utils/progress";
type Props = { current: number; maximum: number; label?: string; showValues?: boolean; compact?: boolean };
export function XPProgressBar({ current, maximum, label = "Experience progress", showValues = true, compact = false }: Props) {
  const ratio = clampProgress(current, maximum);
  const safeCurrent = Number.isFinite(current) ? Math.max(0, current) : 0;
  const safeMaximum = Number.isFinite(maximum) ? Math.max(0, maximum) : 0;
  const percent = Math.round(ratio * 100);
  return <View style={styles.container}>
    {showValues ? <View style={styles.values}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{formatProgress(safeCurrent)} / {formatProgress(safeMaximum)} XP</Text></View> : null}
    <View accessible accessibilityRole="progressbar" accessibilityLabel={label} accessibilityValue={{ min: 0, max: Math.max(safeMaximum, 1), now: Math.min(safeCurrent, Math.max(safeMaximum, 1)), text: percent + "%" }} style={[styles.track, compact && styles.compactTrack]}>
      <LinearGradient colors={gradients.cyanViolet} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={[styles.fill, { width: percent + "%" }]} />
    </View>
  </View>;
}
const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  values: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.sm },
  label: { color: colors.mutedSilver, fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm },
  value: { color: colors.paleStarlight, fontFamily: typography.fontFamily.numeric, fontSize: typography.fontSize.xs, fontVariant: ["tabular-nums"] },
  track: { height: 10, borderRadius: radii.pill, backgroundColor: "rgba(66, 139, 255, 0.16)", borderWidth: 1, borderColor: "rgba(135, 101, 245, 0.36)", overflow: "hidden" },
  compactTrack: { height: 6 },
  fill: { height: "100%", borderRadius: radii.pill, minWidth: 0 },
});