import { StyleSheet, Text, View } from "react-native";
import { attributeAccents, colors, radii, spacing, typography } from "@/theme";
export type AttributeCode = "STR" | "END" | "INT" | "DIS" | "VIT" | "WIS";
const attributeLabels: Record<AttributeCode, string> = { STR: "Strength", END: "Endurance", INT: "Intelligence", DIS: "Discipline", VIT: "Vitality", WIS: "Wisdom" };
type Props = { attribute: AttributeCode; value: number; caption?: string };
export function AttributeBadge({ attribute, value, caption }: Props) {
  const accent = attributeAccents[attribute];
  const safeValue = Number.isFinite(value) ? Math.max(0, value) : 0;
  return <View accessibilityLabel={attributeLabels[attribute] + ": " + safeValue} style={[styles.badge, { borderColor: accent + "88" }]}>
    <View style={[styles.indicator, { backgroundColor: accent }]} />
    <View style={styles.copy}><Text style={[styles.code, { color: accent }]}>{attribute}</Text>{caption ? <Text style={styles.caption}>{caption}</Text> : null}</View>
    <Text style={styles.value}>{Math.round(safeValue)}</Text>
  </View>;
}
const styles = StyleSheet.create({
  badge: { minHeight: 52, flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderWidth: 1, borderRadius: radii.md, backgroundColor: "rgba(8, 13, 32, 0.86)" },
  indicator: { width: 4, height: 28, borderRadius: radii.pill },
  copy: { flex: 1, gap: 1 },
  code: { fontFamily: typography.fontFamily.bodyMedium, fontWeight: typography.fontWeight.bold, fontSize: typography.fontSize.sm, letterSpacing: 0.6 },
  caption: { color: colors.mutedSilver, fontFamily: typography.fontFamily.body, fontSize: 10 },
  value: { color: colors.paleStarlight, fontFamily: typography.fontFamily.numeric, fontSize: typography.fontSize.lg, fontVariant: ["tabular-nums"] },
});