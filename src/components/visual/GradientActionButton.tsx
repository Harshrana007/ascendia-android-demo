import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients, radii, spacing, typography } from "@/theme";
type Props = { label: string; onPress: () => void; disabled?: boolean; loading?: boolean; loadingLabel?: string; variant?: "primary" | "secondary" };
export function GradientActionButton({ label, onPress, disabled = false, loading = false, loadingLabel = "Please wait", variant = "primary" }: Props) {
  const unavailable = disabled || loading;
  const palette = unavailable ? gradients.disabled : variant === "primary" ? gradients.primary : ["#182748", "#101B38"] as const;
  const text = loading ? loadingLabel : label;
  return <Pressable accessibilityRole="button" accessibilityLabel={text} accessibilityState={{ disabled: unavailable, busy: loading }} disabled={unavailable} onPress={onPress} style={({ pressed }) => [styles.pressable, pressed && !unavailable && styles.pressed, unavailable && styles.unavailable]}>
    <LinearGradient colors={palette} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.gradient}>
      <View style={styles.content}>{loading ? <ActivityIndicator color={colors.paleStarlight} size="small" /> : null}<Text style={styles.label}>{text}</Text></View>
    </LinearGradient>
  </Pressable>;
}
const styles = StyleSheet.create({
  pressable: { minHeight: 48, borderRadius: radii.pill, overflow: "hidden" },
  gradient: { minHeight: 48, justifyContent: "center", paddingHorizontal: spacing.xl },
  content: { minHeight: 48, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.sm },
  label: { color: colors.paleStarlight, fontFamily: typography.fontFamily.bodyMedium, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.md, textAlign: "center" },
  pressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
  unavailable: { opacity: 0.72 },
});