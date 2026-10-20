import { useCallback, useEffect, useState } from "react";
import { AccessibilityInfo, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { Easing, cancelAnimation, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { GradientActionButton } from "@/components/visual/GradientActionButton";
import { RankCrystal } from "@/components/visual/RankCrystal";
import { colors, radii, spacing, typography } from "@/theme";

const cosmicEnvironment = require("../../../assets/images/backgrounds/cosmic-home-background.webp");
const welcomeHunter = require("../../../assets/images/characters/ascendia-character-hunter-initial.webp");
const brandEmblem = require("../../../assets/images/branding/ascendia-splash-icon.png");

export function WelcomeScreen() {
  const router = useRouter();
  const [reduceMotion, setReduceMotion] = useState(false);
  const portraitOpacity = useSharedValue(0);
  const portraitY = useSharedValue(18);
  const wordmarkOpacity = useSharedValue(0);
  const detailsOpacity = useSharedValue(0);
  const actionOpacity = useSharedValue(0);
  const portraitStyle = useAnimatedStyle(() => ({ opacity: portraitOpacity.value, transform: [{ translateY: portraitY.value }] }));
  const wordmarkStyle = useAnimatedStyle(() => ({ opacity: wordmarkOpacity.value }));
  const detailsStyle = useAnimatedStyle(() => ({ opacity: detailsOpacity.value }));
  const actionStyle = useAnimatedStyle(() => ({ opacity: actionOpacity.value }));
  const revealImmediately = useCallback(() => {
    cancelAnimation(portraitOpacity); cancelAnimation(portraitY); cancelAnimation(wordmarkOpacity);
    cancelAnimation(detailsOpacity); cancelAnimation(actionOpacity);
    portraitOpacity.value = 1; portraitY.value = 0; wordmarkOpacity.value = 1; detailsOpacity.value = 1; actionOpacity.value = 1;
  }, [actionOpacity, detailsOpacity, portraitOpacity, portraitY, wordmarkOpacity]);
  const playWelcomeSequence = useCallback(() => {
    if (reduceMotion) { revealImmediately(); return; }
    portraitOpacity.value = withTiming(1, { duration: 520, easing: Easing.out(Easing.cubic) });
    portraitY.value = withTiming(0, { duration: 640, easing: Easing.out(Easing.cubic) });
    wordmarkOpacity.value = withDelay(130, withTiming(1, { duration: 420, easing: Easing.out(Easing.quad) }));
    detailsOpacity.value = withDelay(320, withTiming(1, { duration: 420, easing: Easing.out(Easing.quad) }));
    actionOpacity.value = withDelay(480, withTiming(1, { duration: 320, easing: Easing.out(Easing.quad) }));
  }, [actionOpacity, detailsOpacity, portraitOpacity, portraitY, reduceMotion, revealImmediately, wordmarkOpacity]);
  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => { if (mounted) setReduceMotion(enabled); }).catch(() => { if (mounted) setReduceMotion(false); });
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion);
    return () => { mounted = false; subscription.remove(); };
  }, []);
  useEffect(() => { playWelcomeSequence(); }, [playWelcomeSequence]);
  return (
    <ImageBackground source={cosmicEnvironment} resizeMode="cover" style={styles.background}>
      <View pointerEvents="none" style={styles.overlay} />
      <Pressable accessibilityRole="button" accessibilityLabel="Skip welcome animation" onPress={revealImmediately} style={styles.skip}><Text style={styles.skipText}>SKIP INTRO</Text></Pressable>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} bounces={false}>
        <Animated.View style={[styles.portraitFrame, portraitStyle]}>
          <Image source={welcomeHunter} resizeMode="cover" accessibilityLabel="Ascendia original cosmic hunter concept art" style={styles.portrait} />
          <View pointerEvents="none" style={styles.portraitEdge} />
        </Animated.View>
        <Animated.View style={[styles.brandRow, wordmarkStyle]}>
          <Image source={brandEmblem} resizeMode="contain" accessibilityLabel="Ascendia crest" style={styles.brandEmblem} />
          <Text style={styles.brand}>ASCENDIA</Text>
        </Animated.View>
        <Animated.View style={[styles.welcomeCopy, detailsStyle]}>
          <View style={styles.crystal}><RankCrystal rank="E" size={68} /></View>
          <Text accessibilityRole="header" style={styles.title}>Your story begins here.</Text>
          <Text style={styles.subtitle}>Choose your name. Begin your ascent.</Text>
          <Text style={styles.quote}>SYSTEM NOTICE: A new hunter is entering the world.</Text>
          <Text style={styles.localNote}>No account required. Your guest profile stays on this device.</Text>
        </Animated.View>
        <Animated.View style={[styles.action, actionStyle]}><GradientActionButton label="Begin Journey" onPress={() => router.push("/onboarding")} /></Animated.View>
      </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: colors.midnightNavy }, overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(5, 9, 22, 0.48)" },
  skip: { position: "absolute", top: 18, right: spacing.lg, zIndex: 2, minHeight: 44, minWidth: 88, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.sm },
  skipText: { color: colors.celestialCyan, fontSize: 10, letterSpacing: 1.2, fontFamily: typography.fontFamily.bodyMedium },
  content: { flexGrow: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl, paddingTop: 52, paddingBottom: spacing.xl, gap: spacing.md },
  portraitFrame: { width: 186, height: 230, borderRadius: radii.xl, overflow: "hidden", borderWidth: 1, borderColor: "rgba(117, 217, 255, 0.7)", backgroundColor: colors.deepCosmicBlue, shadowColor: colors.electricSapphire, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.38, shadowRadius: 18, elevation: 8 },
  portrait: { width: "100%", height: "100%" }, portraitEdge: { ...StyleSheet.absoluteFillObject, borderWidth: 1, borderColor: "rgba(183, 160, 255, 0.48)", borderRadius: radii.xl },
  brandRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.sm }, brandEmblem: { width: 34, height: 34 },
  brand: { color: colors.paleStarlight, fontFamily: typography.fontFamily.display, fontSize: 29, letterSpacing: 4, textAlign: "center" },
  welcomeCopy: { alignItems: "center", gap: spacing.xs }, crystal: { padding: spacing.xs, borderRadius: 60, borderWidth: 1, borderColor: "rgba(183, 160, 255, 0.28)", backgroundColor: "rgba(8, 13, 32, 0.36)" },
  title: { color: colors.paleStarlight, fontFamily: typography.fontFamily.display, fontSize: 26, lineHeight: 32, textAlign: "center" },
  subtitle: { color: colors.mutedSilver, fontSize: 14, lineHeight: 20, textAlign: "center", marginTop: 2 },
  quote: { color: colors.luminousLavender, fontSize: 10, letterSpacing: 0.7, lineHeight: 16, textAlign: "center", marginTop: spacing.sm },
  localNote: { color: colors.mutedSilver, fontSize: 10, lineHeight: 15, textAlign: "center", marginTop: spacing.xs },
  action: { width: "100%", maxWidth: 340, marginTop: spacing.sm },
});
