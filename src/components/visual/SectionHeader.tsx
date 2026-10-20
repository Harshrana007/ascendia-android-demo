import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing, textStyles } from "@/theme";
type Props = { title: string; subtitle?: string; actionLabel?: string; onActionPress?: () => void; leading?: ReactNode };
export function SectionHeader({ title, subtitle, actionLabel, onActionPress, leading }: Props) {
  const canAct = Boolean(actionLabel && onActionPress);
  return <View style={styles.row}>
    {leading ? <View style={styles.leading}>{leading}</View> : null}
    <View style={styles.copy}><Text style={[textStyles.sectionTitle, styles.title]}>{title}</Text>{subtitle ? <Text style={[textStyles.secondary, styles.subtitle]}>{subtitle}</Text> : null}</View>
    {canAct ? <Pressable accessibilityRole="button" accessibilityLabel={actionLabel} onPress={onActionPress} hitSlop={8} style={({ pressed }) => [styles.action, pressed && styles.pressed]}><Text style={styles.actionLabel}>{actionLabel}</Text></Pressable> : null}
  </View>;
}
const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  leading: { flexShrink: 0 },
  copy: { flex: 1, gap: spacing.xxs },
  title: { color: colors.paleStarlight },
  subtitle: { color: colors.mutedSilver },
  action: { minHeight: 36, paddingHorizontal: spacing.sm, justifyContent: "center", borderRadius: 10, borderWidth: 1, borderColor: colors.panelBorder },
  actionLabel: { color: colors.celestialCyan, ...textStyles.label },
  pressed: { opacity: 0.78 },
});