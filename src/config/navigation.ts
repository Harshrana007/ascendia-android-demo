export const primaryDestinations = [
  { name: "index", title: "Home" },
  { name: "quests", title: "Quests" },
  { name: "player", title: "Player" },
  { name: "adventures", title: "Adventures" },
  { name: "profile", title: "Profile" },
] as const;

export type PrimaryDestination = (typeof primaryDestinations)[number]["title"];