import { colors, layout, typography } from "@/theme";
export const primaryTabAppearance = {
  headerShown: false,
  tabBarActiveTintColor: colors.celestialCyan,
  tabBarInactiveTintColor: colors.mutedSilver,
  tabBarStyle: { height: layout.tabBarHeight, paddingTop: layout.tabBarPaddingTop, paddingBottom: layout.tabBarPaddingBottom, backgroundColor: colors.deepCosmicBlue, borderTopColor: colors.panelBorder, borderTopWidth: 1 },
  tabBarLabelStyle: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium },
} as const;