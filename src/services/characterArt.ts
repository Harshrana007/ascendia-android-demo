import type { ImageSourcePropType } from "react-native";
import type { CharacterClass, CharacterPresentation, HunterRank, PlayerProfile } from "@/types/demo";
const warriorMaleE = require("../../assets/images/characters/ascendia-character-hunter-initial.webp") as ImageSourcePropType;
const known: Partial<Record<string, ImageSourcePropType>> = { "Warrior:male:E": warriorMaleE };
export function resolveCharacterArt(identity: Pick<PlayerProfile, "className" | "presentation" | "rank">) {
  const key = identity.className + ":" + identity.presentation + ":" + identity.rank;
  const source = known[key];
  return source
    ? { source, variantLabel:"Provisional initial Warrior artwork", isExact:false, fallbackLabel:"Concept art only. This image is not a finalized rank-specific evolution stage." }
    : { variantLabel:"Class emblem fallback", isExact:false, fallbackLabel:"Original " + identity.presentation + " " + identity.className + " rank artwork is not available yet." };
}
export function getClassPrimaryAttribute(className: CharacterClass) {
  return ({ Warrior:"STR", Ranger:"END", Mage:"INT", Assassin:"DIS", Guardian:"VIT", Scholar:"WIS" } as const)[className];
}
export function getCharacterIdentityKey(className: CharacterClass, presentation: CharacterPresentation, rank: HunterRank) { return className + ":" + presentation + ":" + rank; }
