import Svg, { Circle, Line, Path, Rect } from "react-native-svg";

import { layout } from "@/theme";

type TabIconName = "home" | "quests" | "player" | "adventures" | "profile";

type TabIconProps = {
  name: TabIconName;
  color: string;
  focused: boolean;
};

export function TabIcon({ name, color, focused }: TabIconProps) {
  const strokeWidth = focused ? 2.1 : 1.65;

  return (
    <Svg width={layout.iconMd} height={layout.iconMd} viewBox="0 0 24 24" accessibilityLabel={name}>
      {name === "home" && (
        <>
          <Path d="M3 10.8 12 3.5l9 7.3" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M5.5 10v10h5v-6h3v6h5V10" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        </>
      )}
      {name === "quests" && (
        <>
          <Rect x="5" y="4.5" width="14" height="16" rx="2" fill="none" stroke={color} strokeWidth={strokeWidth} />
          <Path d="M9 4.5v-1h6v1M8.5 10h7M8.5 14h7M8.5 17h4" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      )}
      {name === "player" && (
        <>
          <Rect x="4" y="13" width="4" height="7" rx="1" fill={color} opacity={focused ? 1 : 0.76} />
          <Rect x="10" y="8" width="4" height="12" rx="1" fill={color} opacity={focused ? 1 : 0.76} />
          <Rect x="16" y="3.5" width="4" height="16.5" rx="1" fill={color} opacity={focused ? 1 : 0.76} />
        </>
      )}
      {name === "adventures" && (
        <>
          <Circle cx="12" cy="12" r="8.5" fill="none" stroke={color} strokeWidth={strokeWidth} />
          <Path d="m15.8 8.2-2.4 5.2-5.2 2.4 2.4-5.2z" fill={color} />
        </>
      )}
      {name === "profile" && (
        <>
          <Circle cx="12" cy="8" r="3.3" fill="none" stroke={color} strokeWidth={strokeWidth} />
          <Path d="M4.5 20c.4-4 3.4-6.2 7.5-6.2s7.1 2.2 7.5 6.2" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      )}
      {focused && <Line x1="9" y1="22" x2="15" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />}
    </Svg>
  );
}