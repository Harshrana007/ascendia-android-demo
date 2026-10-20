import type { ImageSourcePropType } from "react-native";
import { FoundationRoute } from "@/features/foundation/FoundationRoute";
const homeBackground = require("../../assets/images/backgrounds/cosmic-home-background.webp") as ImageSourcePropType;
const hunterArtwork = require("../../assets/images/characters/ascendia-character-hunter-initial.webp") as ImageSourcePropType;
export default function HomeRoute() {
  return <FoundationRoute title="Your next evolution begins today." eyebrow="Home / Visual Foundation" subtitle="Real-world consistency fuels the hunter you are becoming." backgroundSource={homeBackground} characterSource={hunterArtwork} featured />;
}