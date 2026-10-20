import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radii, spacing, typography } from "@/theme";

type FoundationRouteProps = {
  title: string;
  eyebrow: string;
  subtitle: string;
  featured?: boolean;
};

export function FoundationRoute({ title, eyebrow, subtitle, featured = false }: FoundationRouteProps) {
  return (
    <View style={styles.root}>
      <LinearGradient colors={[colors.deepCosmicBlue, colors.midnightNavy, "#050916"]} locations={[0, 0.54, 1]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.brand}>ASCENDIA</Text>
          <Text style={styles.brandCaption}>DISCIPLINE TODAY. A GREATER YOU TOMORROW.</Text>
          <View style={styles.rule} />
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text accessibilityRole="header" style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.panel}>
            <Text style={styles.systemLabel}>SYSTEM NOTICE</Text>
            <Text style={styles.panelTitle}>{featured ? "The foundation is ready." : "This destination is mapped."}</Text>
            <Text style={styles.panelCopy}>
              {featured
                ? "Hunter, your next level begins with a working foundation. The full Cosmic Horizon experience is being built one verified step at a time."
                : "Navigation is connected. The detailed screen arrives in its approved implementation step."}
            </Text>
            <LinearGradient colors={[colors.electricSapphire, colors.arcaneViolet]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.accent} />
          </View>
          <Text style={styles.footer}>A QUEST CLEARED IS A PROMISE KEPT.</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.midnightNavy },
  safeArea: { flex: 1 },
  content: { paddingHorizontal: spacing.screenGutter, paddingTop: spacing.lg, paddingBottom: spacing.xxl },
  brand: { color: colors.paleStarlight, fontFamily: typography.fontFamily.display, fontSize: 28, letterSpacing: 3.2 },
  brandCaption: { color: colors.mutedSilver, fontFamily: typography.fontFamily.bodyMedium, fontSize: 9, letterSpacing: 1.2, marginTop: 3 },
  rule: { height: 1, backgroundColor: colors.panelBorder, marginTop: spacing.lg, marginBottom: spacing.xl },
  eyebrow: { color: colors.celestialCyan, fontFamily: typography.fontFamily.bodyMedium, fontSize: typography.fontSize.xs, letterSpacing: 1.6, textTransform: "uppercase" },
  title: { color: colors.paleStarlight, fontFamily: typography.fontFamily.display, fontSize: typography.fontSize.display, lineHeight: 40, marginTop: spacing.sm },
  subtitle: { color: colors.mutedSilver, fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.md, lineHeight: typography.lineHeight.relaxed, marginTop: spacing.md },
  panel: { marginTop: spacing.xl, padding: spacing.lg, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.panelBorder, backgroundColor: colors.panel },
  systemLabel: { color: colors.luminousLavender, fontFamily: typography.fontFamily.bodyMedium, letterSpacing: 1.5, fontSize: typography.fontSize.xs },
  panelTitle: { color: colors.paleStarlight, fontSize: typography.fontSize.lg, fontFamily: typography.fontFamily.bodyMedium, marginTop: spacing.sm },
  panelCopy: { color: colors.mutedSilver, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal, marginTop: spacing.sm },
  accent: { width: 72, height: 3, borderRadius: 2, marginTop: spacing.lg },
  footer: { color: colors.mutedSilver, fontFamily: typography.fontFamily.bodyMedium, fontSize: 10, letterSpacing: 1.4, textAlign: "center", marginTop: spacing.xxl },
});