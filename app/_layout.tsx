import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DemoStateProvider } from "@/state/DemoStateProvider";
import { colors } from "@/theme";

export default function RootLayout() {
  return <DemoStateProvider><GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.midnightNavy }}><SafeAreaProvider>
    <StatusBar style="light" />
    <Stack initialRouteName="index" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.midnightNavy } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" options={{ animation: "fade" }} />
      <Stack.Screen name="onboarding" options={{ animation: "slide_from_right" }} />
      <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
    </Stack>
  </SafeAreaProvider></GestureHandlerRootView></DemoStateProvider>;
}
