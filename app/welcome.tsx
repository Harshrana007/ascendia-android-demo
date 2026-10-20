import { Redirect } from "expo-router";
import { DatabaseStatusScreen } from "@/components/layout/DatabaseStatusScreen";
import { WelcomeScreen } from "@/features/onboarding/WelcomeScreen";
import { useDemoState } from "@/state/DemoStateProvider";
export default function WelcomeRoute() {
  const { state, status, errorMessage, retryInitialization } = useDemoState();
  if (status === "loading") return <DatabaseStatusScreen mode="loading" />;
  if (status === "error") return <DatabaseStatusScreen mode="error" message={errorMessage} onRetry={() => { void retryInitialization(); }} />;
  return state.profile ? <Redirect href="/(tabs)" /> : <WelcomeScreen />;
}
