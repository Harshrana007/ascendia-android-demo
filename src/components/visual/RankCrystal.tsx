import { View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop, Text as SvgText } from "react-native-svg";
import { colors, rankAccents } from "@/theme";
export type HunterRank = "E" | "D" | "C" | "B" | "A" | "S" | "SS" | "SSS";
type Props = { rank: HunterRank; size?: number; showLabel?: boolean };
export function RankCrystal({ rank, size = 76, showLabel = true }: Props) {
  const accent = rankAccents[rank];
  const id = "rank-" + rank.toLowerCase() + "-crystal";
  return <View accessibilityRole="image" accessibilityLabel={"Rank " + rank + " crystal"} style={{ width: size, alignItems: "center" }}>
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id={id + "-outer"} x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor={colors.paleStarlight} /><Stop offset="0.42" stopColor={accent} /><Stop offset="1" stopColor={colors.arcaneViolet} /></LinearGradient>
        <LinearGradient id={id + "-inner"} x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#FFFFFF" /><Stop offset="0.48" stopColor={accent} /><Stop offset="1" stopColor="#2D4DAA" /></LinearGradient>
      </Defs>
      <Path d="M50 3 63 23 85 16 77 38 97 50 77 62 85 84 63 77 50 97 37 77 15 84 23 62 3 50 23 38 15 16 37 23Z" fill="none" stroke={"url(#" + id + "-outer)"} strokeWidth="2.8" />
      <Path d="M50 12 72 30 70 62 50 83 30 62 28 30Z" fill={"url(#" + id + "-inner)"} stroke={colors.paleStarlight} strokeOpacity="0.8" strokeWidth="1.4" />
      <Path d="M50 12 50 83 30 62 28 30Z" fill={colors.deepCosmicBlue} fillOpacity="0.4" />
      <Path d="M28 30 50 39 72 30M30 62 50 53 70 62" fill="none" stroke={colors.paleStarlight} strokeOpacity="0.65" strokeWidth="1.1" />
      {showLabel ? <SvgText x="50" y="59" textAnchor="middle" fontFamily="serif" fontWeight="700" fontSize="31" fill={colors.paleStarlight}>{rank}</SvgText> : null}
    </Svg>
  </View>;
}