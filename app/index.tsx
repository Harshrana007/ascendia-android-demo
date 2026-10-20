import { Redirect } from "expo-router";
import { useDemoState } from "@/state/DemoStateProvider";
export default function IndexRoute() {
  const { state } = useDemoState();
  return <Redirect href={state.profile ? "/(tabs)" : "/welcome"} />;
}
