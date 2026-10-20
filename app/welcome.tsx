import { Redirect } from "expo-router";
import { WelcomeScreen } from "@/features/onboarding/WelcomeScreen";
import { useDemoState } from "@/state/DemoStateProvider";
export default function WelcomeRoute() {
  const { state } = useDemoState();
  return state.profile ? <Redirect href="/(tabs)" /> : <WelcomeScreen />;
}
