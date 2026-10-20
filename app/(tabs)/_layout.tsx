import { Tabs } from "expo-router";

import { TabIcon } from "@/components/navigation/TabIcon";
import { primaryDestinations } from "@/config/navigation";
import { colors, layout, typography } from "@/theme";

export default function PrimaryTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.celestialCyan,
        tabBarInactiveTintColor: colors.mutedSilver,
        tabBarStyle: {
          height: layout.tabBarHeight,
          paddingTop: layout.tabBarPaddingTop,
          paddingBottom: layout.tabBarPaddingBottom,
          backgroundColor: colors.deepCosmicBlue,
          borderTopColor: colors.panelBorder,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: typography.fontFamily.body,
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.medium,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: primaryDestinations[0].title, tabBarIcon: ({ color, focused }) => <TabIcon name="home" color={color} focused={focused} /> }} />
      <Tabs.Screen name="quests" options={{ title: primaryDestinations[1].title, tabBarIcon: ({ color, focused }) => <TabIcon name="quests" color={color} focused={focused} /> }} />
      <Tabs.Screen name="player" options={{ title: primaryDestinations[2].title, tabBarIcon: ({ color, focused }) => <TabIcon name="player" color={color} focused={focused} /> }} />
      <Tabs.Screen name="adventures" options={{ title: primaryDestinations[3].title, tabBarIcon: ({ color, focused }) => <TabIcon name="adventures" color={color} focused={focused} /> }} />
      <Tabs.Screen name="profile" options={{ title: primaryDestinations[4].title, tabBarIcon: ({ color, focused }) => <TabIcon name="profile" color={color} focused={focused} /> }} />
    </Tabs>
  );
}