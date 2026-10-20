import type { ImageSourcePropType } from "react-native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AttributeBadge, CosmicBackground, GlassFantasyPanel, QuestIconTile, RankCrystal, SectionHeader, XPProgressBar } from "@/components/visual";
import { colors, radii, spacing, textStyles, typography } from "@/theme";
type Props = { title: string; eyebrow: string; subtitle: string; backgroundSource?: ImageSourcePropType; characterSource?: ImageSourcePropType; featured?: boolean };
export function FoundationRoute({ title, eyebrow, subtitle, backgroundSource, characterSource, featured = false }: Props) {
  return <CosmicBackground source={backgroundSource} overlay={featured ? "soft" : "strong"}>
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.brand}>ASCENDIA</Text>
        <Text style={styles.brandCaption}>DISCIPLINE TODAY. A GREATER YOU TOMORROW.</Text>
        <View style={styles.rule} />
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text accessibilityRole="header" style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {featured ? <>
          <GlassFantasyPanel tone="violet" padding={spacing.md}>
            <View style={styles.heroRow}>
              {characterSource ? <Image source={characterSource} resizeMode="cover" style={styles.character} /> : null}
              <View style={styles.heroCopy}>
                <Text style={styles.heroEyebrow}>HUNTER PROFILE PREVIEW</Text>
                <Text style={styles.heroTitle}>Shadow Adept</Text>
                <Text style={styles.heroDescription}>Original cosmic hunter artwork</Text>
                <View style={styles.rankRow}><RankCrystal rank="A" size={56} /><View style={styles.rankCopy}><Text style={styles.rankTitle}>Rank A</Text><Text style={styles.rankDescription}>Illustrative sample</Text></View></View>
              </View>
            </View>
          </GlassFantasyPanel>
          <View style={styles.section}>
            <SectionHeader title="Visual system preview" subtitle="Sample numbers below are UI examples, not saved player data." />
            <GlassFantasyPanel tone="cyan" padding={spacing.md}>
              <View style={styles.previewLabelWrap}><Text style={styles.previewLabel}>PREVIEW ONLY</Text></View>
              <XPProgressBar current={68} maximum={100} label="Progress bar preview, not saved XP" showValues={false} />
              <View style={styles.sampleRow}><QuestIconTile icon="book" color={colors.celestialCyan} size={46} /><View style={styles.sampleCopy}><Text style={styles.sampleTitle}>Quest icon tile</Text><Text style={styles.sampleSubtitle}>Reusable task category primitive</Text></View><AttributeBadge attribute="INT" value={26} caption="Sample" /></View>
            </GlassFantasyPanel>
          </View>
        </> : <GlassFantasyPanel tone="cyan"><Text style={styles.systemLabel}>SYSTEM NOTICE</Text><Text style={styles.panelTitle}>This destination is mapped.</Text><Text style={styles.panelCopy}>Navigation is connected. The detailed screen arrives in its approved implementation step.</Text></GlassFantasyPanel>}
        <Text style={styles.footer}>A QUEST CLEARED IS A PROMISE KEPT.</Text>
      </ScrollView>
    </SafeAreaView>
  </CosmicBackground>;
}
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { paddingHorizontal: spacing.screenGutter, paddingTop: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  brand: { color: colors.paleStarlight, fontFamily: typography.fontFamily.display, fontSize: 28, letterSpacing: 3.2 },
  brandCaption: { color: colors.mutedSilver, fontFamily: typography.fontFamily.bodyMedium, fontSize: 9, letterSpacing: 1.2, marginTop: -spacing.sm },
  rule: { height: 1, backgroundColor: colors.panelBorder, marginTop: spacing.xs, marginBottom: spacing.sm },
  eyebrow: { color: colors.celestialCyan, fontFamily: typography.fontFamily.bodyMedium, fontSize: typography.fontSize.xs, letterSpacing: 1.6, textTransform: "uppercase" },
  title: { ...textStyles.display, color: colors.paleStarlight },
  subtitle: { ...textStyles.body, color: colors.mutedSilver },
  heroRow: { flexDirection: "row", alignItems: "stretch", gap: spacing.md },
  character: { width: 112, height: 149, borderRadius: radii.md, backgroundColor: colors.deepCosmicBlue },
  heroCopy: { flex: 1, justifyContent: "center", gap: spacing.sm },
  heroEyebrow: { color: colors.celestialCyan, fontSize: 9, fontFamily: typography.fontFamily.bodyMedium, letterSpacing: 1.1 },
  heroTitle: { ...textStyles.sectionTitle, color: colors.paleStarlight },
  heroDescription: { ...textStyles.secondary, color: colors.mutedSilver },
  rankRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.xs },
  rankCopy: { flex: 1, gap: spacing.xxs },
  rankTitle: { color: colors.paleStarlight, fontFamily: typography.fontFamily.display, fontSize: typography.fontSize.lg },
  rankDescription: { ...textStyles.secondary, color: colors.mutedSilver },
  section: { gap: spacing.md, marginTop: spacing.sm },
  previewLabelWrap: { alignSelf: "flex-start", borderWidth: 1, borderColor: colors.panelBorderViolet, borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  previewLabel: { color: colors.luminousLavender, fontFamily: typography.fontFamily.bodyMedium, fontSize: 9, letterSpacing: 1.2 },
  sampleRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.lg },
  sampleCopy: { flex: 1, gap: spacing.xxs },
  sampleTitle: { ...textStyles.label, color: colors.paleStarlight },
  sampleSubtitle: { ...textStyles.secondary, color: colors.mutedSilver, fontSize: 10 },
  systemLabel: { ...textStyles.label, color: colors.luminousLavender, letterSpacing: 1.5 },
  panelTitle: { ...textStyles.sectionTitle, color: colors.paleStarlight, marginTop: spacing.sm },
  panelCopy: { ...textStyles.secondary, color: colors.mutedSilver, marginTop: spacing.sm },
  footer: { color: colors.mutedSilver, fontFamily: typography.fontFamily.bodyMedium, fontSize: 10, letterSpacing: 1.4, textAlign: "center", marginTop: spacing.lg },
});