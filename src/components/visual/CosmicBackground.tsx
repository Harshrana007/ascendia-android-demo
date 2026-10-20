import type { ReactNode } from "react";
import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { ImageBackground, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients } from "@/theme";

type Props = { children: ReactNode; source?: ImageSourcePropType; overlay?: "soft" | "standard" | "strong"; style?: StyleProp<ViewStyle> };
const overlays = {
  soft: ["rgba(8, 13, 32, 0.26)", "rgba(8, 13, 32, 0.72)"] as const,
  standard: ["rgba(8, 13, 32, 0.46)", "rgba(8, 13, 32, 0.9)"] as const,
  strong: ["rgba(8, 13, 32, 0.68)", "rgba(8, 13, 32, 0.96)"] as const,
};
export function CosmicBackground({ children, source, overlay = "standard", style }: Props) {
  return <View style={[styles.root, style]}>
    {source ? <ImageBackground source={source} resizeMode="cover" style={StyleSheet.absoluteFill} /> : null}
    {!source ? <LinearGradient colors={gradients.cosmic} style={StyleSheet.absoluteFill} /> : null}
    <LinearGradient colors={overlays[overlay]} locations={[0, 1]} style={StyleSheet.absoluteFill} />
    <View pointerEvents="none" style={styles.ambient} />
    <View style={styles.content}>{children}</View>
  </View>;
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.midnightNavy, overflow: "hidden" },
  content: { flex: 1 },
  ambient: { position: "absolute", top: -80, right: -80, width: 240, height: 240, borderRadius: 120, backgroundColor: "rgba(66, 139, 255, 0.05)" },
});