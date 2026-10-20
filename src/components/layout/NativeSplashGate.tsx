import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useDemoState } from "@/state/DemoStateProvider";

void SplashScreen.preventAutoHideAsync().catch((error: unknown) => {
  if (__DEV__) console.warn("Ascendia could not hold the native splash during local initialization.", error);
});

export function NativeSplashGate() {
  const { status } = useDemoState();
  useEffect(() => {
    if (status !== "ready" && status !== "error") return;
    void SplashScreen.hideAsync().catch((error: unknown) => {
      if (__DEV__) console.warn("Ascendia could not dismiss the native splash screen.", error);
    });
  }, [status]);
  return null;
}
