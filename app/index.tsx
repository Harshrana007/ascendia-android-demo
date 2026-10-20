import { Redirect } from "expo-router";
import { DatabaseStatusScreen } from "@/components/layout/DatabaseStatusScreen";
import { useDemoState } from "@/state/DemoStateProvider";
export default function IndexRoute() {
  const { state, status, errorMessage, retryInitialization } = useDemoState();
  if (status === "loading") return <DatabaseStatusScreen mode="loading" />;
  if (status === "error") return <DatabaseStatusScreen mode="error" message={errorMessage} onRetry={() => { void retryInitialization(); }} />;
  return <Redirect href={state.profile ? "/(tabs)" : "/welcome"} />;
}
