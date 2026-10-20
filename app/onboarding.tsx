import { Redirect } from "expo-router";
import { DatabaseStatusScreen } from "@/components/layout/DatabaseStatusScreen";
import { OnboardingScreen } from "@/features/onboarding/OnboardingScreen";
import { useDemoState } from "@/state/DemoStateProvider";
export default function OnboardingRoute() {
  const { state, status, errorMessage, retryInitialization } = useDemoState();
  if (status === "loading") return <DatabaseStatusScreen mode="loading" />;
  if (status === "error") return <DatabaseStatusScreen mode="error" message={errorMessage} onRetry={() => { void retryInitialization(); }} />;
  return state.profile ? <Redirect href="/(tabs)" /> : <OnboardingScreen />;
}
