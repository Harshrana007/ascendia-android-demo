import type { AttributeCode, QuestDifficulty, QuestDraft } from "@/types/demo";
export const DEMO_PROGRESS_RULES = { levelXp: 1000, rankPromotionEnabled: false } as const;
export const CLASS_OPTIONS = ["Warrior", "Ranger", "Mage", "Assassin", "Guardian", "Scholar"] as const;
export const RANKS = ["E", "D", "C", "B", "A", "S", "SS", "SSS"] as const;
export const ATTRIBUTE_LABELS: Record<AttributeCode, string> = {
  STR: "Strength", END: "Endurance", INT: "Intelligence", DIS: "Discipline", VIT: "Vitality", WIS: "Wisdom",
};
export const DIFFICULTY_XP: Record<QuestDifficulty, number> = {
  "Very Easy": 10, Easy: 20, Normal: 35, Hard: 60, Epic: 100, Legendary: 200,
};
export type QuestTemplate = QuestDraft & { key: string; xpReward: number; shortLabel: string };
const weekdays = [1, 2, 3, 4, 5];
export const QUEST_TEMPLATES: QuestTemplate[] = [
  { key:"read-30", title:"Read for 30 Minutes", shortLabel:"Reading", description:"Give one chapter or a few pages your full attention.", type:"Daily", difficulty:"Normal", primaryAttribute:"INT", secondaryAttributes:["DIS"], weekdays, target:null, unit:null, xpReward:35 },
  { key:"morning-workout", title:"Morning Workout", shortLabel:"Fitness", description:"Move with intention, even if today's session is short.", type:"Daily", difficulty:"Hard", primaryAttribute:"END", secondaryAttributes:["STR"], weekdays, target:null, unit:null, xpReward:60 },
  { key:"water-intake", title:"Drink Water", shortLabel:"Wellness", description:"Make hydration part of your daily routine.", type:"Daily", difficulty:"Very Easy", primaryAttribute:"VIT", secondaryAttributes:["DIS"], weekdays:[0,1,2,3,4,5,6], target:null, unit:null, xpReward:10 },
  { key:"meditation", title:"Meditate for 10 Minutes", shortLabel:"Mindfulness", description:"Pause, breathe, and return to the present.", type:"Daily", difficulty:"Easy", primaryAttribute:"WIS", secondaryAttributes:["DIS"], weekdays, target:null, unit:null, xpReward:20 },
  { key:"study-language", title:"Study a Language", shortLabel:"Learning", description:"Record focused study sessions this week.", type:"Weekly", difficulty:"Normal", primaryAttribute:"INT", secondaryAttributes:["DIS"], weekdays:[], target:5, unit:"sessions", xpReward:35 },
  { key:"run-20-miles", title:"Run 20 Miles", shortLabel:"Running", description:"Build weekly distance at a sustainable pace.", type:"Weekly", difficulty:"Hard", primaryAttribute:"END", secondaryAttributes:["STR"], weekdays:[], target:20, unit:"miles", xpReward:60 },
  { key:"finish-a-book", title:"Finish a Book", shortLabel:"Milestone", description:"Finish one book and log the milestone.", type:"Milestone", difficulty:"Epic", primaryAttribute:"INT", secondaryAttributes:["WIS"], weekdays:[], target:1, unit:"books", xpReward:100 },
  { key:"first-personal-goal", title:"Complete a Personal Goal", shortLabel:"One-Time", description:"Add one important task you want off your mind.", type:"One-Time", difficulty:"Normal", primaryAttribute:"DIS", secondaryAttributes:["WIS"], weekdays:[], target:null, unit:null, xpReward:35 },
];
export const createEmptyAttributeXp = (): Record<AttributeCode, number> => ({ STR:0, END:0, INT:0, DIS:0, VIT:0, WIS:0 });
