import { Redirect } from "expo-router";
import { OnboardingScreen } from "@/features/onboarding/OnboardingScreen";
import { useDemoState } from "@/state/DemoStateProvider";
export default function OnboardingRoute() {
  const { state } = useDemoState();
  return state.profile ? <Redirect href="/(tabs)" /> : <OnboardingScreen />;
}
