import { Redirect, Tabs } from "expo-router";
import { TabIcon } from "@/components/navigation/TabIcon";
import { primaryTabAppearance } from "@/components/navigation/PrimaryTabAppearance";
import { primaryDestinations } from "@/config/navigation";
import { useDemoState } from "@/state/DemoStateProvider";
export default function PrimaryTabsLayout() {
  const { state } = useDemoState();
  if (!state.profile) return <Redirect href="/welcome" />;
  return <Tabs screenOptions={primaryTabAppearance}>
    <Tabs.Screen name="index" options={{ title: primaryDestinations[0].title, tabBarIcon: ({ color, focused }) => <TabIcon name="home" color={color} focused={focused} /> }} />
    <Tabs.Screen name="quests" options={{ title: primaryDestinations[1].title, tabBarIcon: ({ color, focused }) => <TabIcon name="quests" color={color} focused={focused} /> }} />
    <Tabs.Screen name="player" options={{ title: primaryDestinations[2].title, tabBarIcon: ({ color, focused }) => <TabIcon name="player" color={color} focused={focused} /> }} />
    <Tabs.Screen name="adventures" options={{ title: primaryDestinations[3].title, tabBarIcon: ({ color, focused }) => <TabIcon name="adventures" color={color} focused={focused} /> }} />
    <Tabs.Screen name="profile" options={{ title: primaryDestinations[4].title, tabBarIcon: ({ color, focused }) => <TabIcon name="profile" color={color} focused={focused} /> }} />
  </Tabs>;
}
