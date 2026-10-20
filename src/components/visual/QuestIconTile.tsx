import { StyleSheet, View } from "react-native";
import { AscendiaIcon, type AscendiaIconName } from "@/components/icons/AscendiaIcon";
import { colors, radii, spacing } from "@/theme";
type Props = { icon: AscendiaIconName; color?: string; completed?: boolean; size?: number };
export function QuestIconTile({ icon, color = colors.luminousLavender, completed = false, size = 52 }: Props) {
  const accent = completed ? colors.success : color;
  return <View accessibilityRole="image" accessibilityLabel={completed ? "Quest completed" : "Quest icon"} style={[styles.tile, { width: size, height: size, borderColor: accent + "CC", backgroundColor: accent + "16" }]}>
    <AscendiaIcon name={completed ? "habit" : icon} color={accent} size={Math.round(size * 0.48)} />
  </View>;
}
const styles = StyleSheet.create({ tile: { alignItems: "center", justifyContent: "center", borderWidth: 1, borderRadius: radii.md, padding: spacing.xs } });