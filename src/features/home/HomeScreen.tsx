import { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { CharacterHero } from "@/components/fantasy/CharacterHero";
import { QuestCard } from "@/components/quests/QuestCard";
import { QuestProgressModal } from "@/components/quests/QuestProgressModal";
import { QuestEditorModal } from "@/features/quests/QuestEditorModal";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { GlassFantasyPanel } from "@/components/visual/GlassFantasyPanel";
import { GradientActionButton } from "@/components/visual/GradientActionButton";
import { XPProgressBar } from "@/components/visual/XPProgressBar";
import { AscendiaIcon } from "@/components/icons/AscendiaIcon";
import { useDemoState } from "@/state/DemoStateProvider";
import type { Quest } from "@/types/demo";
import { colors, radii, spacing, textStyles, typography } from "@/theme";

const homeBackground = require("../../../assets/images/backgrounds/cosmic-home-background.webp");
export function HomeScreen() {
  const router = useRouter();
  const { state, complete, addProgress, createQuest } = useDemoState();
  const profile = state.profile;
  const [editorOpen, setEditorOpen] = useState(false);
  const [progressQuest, setProgressQuest] = useState<Quest | null>(null);
  const daily = useMemo(() => state.quests.filter((quest) => quest.type === "Daily" && !quest.isArchived && quest.scheduledToday), [state.quests]);
  const weekly = state.quests.filter((quest) => quest.type === "Weekly" && !quest.isArchived);
  const milestones = state.quests.filter((quest) => quest.type === "Milestone" && !quest.isArchived);
  if (!profile) return null;

  async function handleComplete(id: string) {
    try {
      const result = await complete(id);
      if (result.status === "completed") Alert.alert("System Notice: Quest Cleared", result.message);
      else Alert.alert("System Notice", result.message);
    } catch (error) {
      Alert.alert("Quest not completed", error instanceof Error ? error.message : "Save failed. Your saved progress is unchanged.");
    }
  }
  async function saveProgress(amount: number) {
    if (!progressQuest) return;
    const result = await addProgress(progressQuest.id, amount);
    setProgressQuest(null);
    Alert.alert(result.status === "goal-reached" ? "Milestone achieved" : "Progress saved", result.message);
  }
  async function saveQuest(draft: import("@/types/demo").QuestDraft) {
    await createQuest(draft);
    setEditorOpen(false);
  }

  return (
    <ScreenShell title="Home" eyebrow="Home / Hunter dashboard" subtitle="The dungeon is optional. Showing up for yourself is the main quest." backgroundSource={homeBackground} hideHeading showFooter={false}
      headerAction={<Pressable accessibilityRole="button" accessibilityLabel="Open profile" onPress={() => router.push("/(tabs)/profile")} style={styles.settings}><AscendiaIcon name="settings" color={colors.paleStarlight} size={20} /></Pressable>}>
      <Text style={styles.quote}>“Every cleared quest makes the next rank possible.”</Text>
      <CharacterHero profile={profile} />
      <View style={styles.xpPanel}>
        <View style={styles.xpHead}>
          <View><Text style={styles.rank}>{profile.rank} RANK</Text><Text style={styles.level}>Level {profile.level}</Text></View>
          <View style={styles.right}><Text style={styles.xp}>{profile.totalXp.toLocaleString()}</Text><Text style={styles.meta}>TOTAL XP</Text></View>
        </View>
        <XPProgressBar current={profile.xpIntoLevel} maximum={profile.xpToNextLevel} label="Current-level XP progress" />
        <Text style={styles.note}>Demo level curve: {profile.xpToNextLevel.toLocaleString()} XP per level. Rank gates stay locked until product rules are approved.</Text>
      </View>

      <View style={styles.stats}>
        <GlassFantasyPanel tone="violet" padding={spacing.md} style={styles.stat}><AscendiaIcon name="streak" color={colors.restrainedGold} size={24} /><Text style={styles.number}>{profile.dailyStreak}</Text><Text style={styles.statLabel}>Day streak</Text></GlassFantasyPanel>
        <GlassFantasyPanel tone="cyan" padding={spacing.md} style={styles.stat}><AscendiaIcon name="achievement" color={colors.restrainedGold} size={24} /><Text style={styles.number}>{profile.bestStreak}</Text><Text style={styles.statLabel}>Best streak</Text></GlassFantasyPanel>
      </View>
      <Text style={styles.streakNote}>Streaks count successful scheduled days. One missed scheduled day per week may use grace in this demo policy.</Text>

      <GlassFantasyPanel tone="cyan">
        <SectionHeader title="Today's quests" subtitle={daily.filter((quest) => quest.isCompleted).length + " / " + daily.length + " cleared today"} />
        <View style={styles.questList}>{daily.length ? daily.slice(0, 4).map((quest) => <QuestCard key={quest.id} quest={quest} compact onComplete={!quest.isCompleted ? () => { void handleComplete(quest.id); } : undefined} />)
          : <Text style={styles.empty}>No quests scheduled for today. The System won't count an unscheduled day against you.</Text>}</View>
        <GradientActionButton label="Create Quest" onPress={() => setEditorOpen(true)} />
        <Pressable accessibilityRole="button" onPress={() => router.push("/(tabs)/quests")} style={styles.viewAll}><Text style={styles.viewAllText}>View all quests</Text><AscendiaIcon name="chevron" color={colors.celestialCyan} size={16} /></Pressable>
      </GlassFantasyPanel>

      {weekly.length ? <View style={styles.section}><SectionHeader title="Weekly progress" subtitle="Small sessions add up." />{weekly.slice(0, 2).map((quest) => <QuestCard key={quest.id} quest={quest} compact onAddProgress={!quest.isCompleted ? () => setProgressQuest(quest) : undefined} />)}</View> : null}
      {milestones.length ? <View style={styles.section}><SectionHeader title="Long-term milestones" subtitle="The long game is still the game." />{milestones.slice(0, 2).map((quest) => <QuestCard key={quest.id} quest={quest} compact onAddProgress={!quest.isCompleted ? () => setProgressQuest(quest) : undefined} />)}</View> : null}

      <GlassFantasyPanel tone="violet" padding={spacing.md}><View style={styles.essenceRow}><AscendiaIcon name="sparkles" color={colors.luminousLavender} size={32} /><View style={styles.essenceCopy}><Text style={styles.essenceTitle}>Daily Essence</Text><Text style={styles.note}>A future daily reward feature.</Text></View><View style={styles.soonBadge}><Text style={styles.soonText}>SOON</Text></View></View></GlassFantasyPanel>
      <Text style={styles.sessionNote}>SYSTEM NOTICE: Your current profile, quests and rewards are saved on this device.</Text>
      <QuestEditorModal visible={editorOpen} onClose={() => setEditorOpen(false)} onSave={saveQuest} />
      <QuestProgressModal quest={progressQuest} onClose={() => setProgressQuest(null)} onSave={saveProgress} />
    </ScreenShell>
  );
}
const styles = StyleSheet.create({
 settings:{width:42,height:42,alignItems:"center",justifyContent:"center",borderRadius:21,borderWidth:1,borderColor:colors.panelBorder,backgroundColor:"rgba(8,13,32,0.65)"},
 quote:{alignSelf:"center",textAlign:"center",color:colors.luminousLavender,fontSize:11,fontStyle:"italic",lineHeight:17},
 xpPanel:{gap:spacing.md,paddingHorizontal:spacing.md,paddingVertical:spacing.md,borderRadius:radii.lg,borderWidth:1,borderColor:colors.panelBorder,backgroundColor:"rgba(8,13,32,0.8)"},
 xpHead:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},rank:{color:colors.luminousLavender,fontSize:11,letterSpacing:1.4,fontFamily:typography.fontFamily.bodyMedium},
 level:{color:colors.paleStarlight,fontSize:21,fontFamily:typography.fontFamily.display,marginTop:2},right:{alignItems:"flex-end"},xp:{color:colors.celestialCyan,fontFamily:typography.fontFamily.numeric,fontSize:22},meta:{color:colors.mutedSilver,fontSize:9,letterSpacing:1.2},
 note:{color:colors.mutedSilver,fontSize:10,lineHeight:14},stats:{flexDirection:"row",gap:spacing.md},stat:{flex:1,alignItems:"center",gap:spacing.xs},number:{color:colors.paleStarlight,fontSize:25,fontFamily:typography.fontFamily.numeric},statLabel:{color:colors.mutedSilver,fontSize:11},
 streakNote:{color:colors.mutedSilver,fontSize:10,lineHeight:14,textAlign:"center"},questList:{gap:spacing.sm,marginTop:spacing.md,marginBottom:spacing.md},empty:{color:colors.mutedSilver,...textStyles.secondary,paddingVertical:spacing.md},
 viewAll:{flexDirection:"row",gap:spacing.xs,alignItems:"center",justifyContent:"center",paddingTop:spacing.md},viewAllText:{color:colors.celestialCyan,fontSize:12,fontFamily:typography.fontFamily.bodyMedium},section:{gap:spacing.md},
 essenceRow:{flexDirection:"row",alignItems:"center",gap:spacing.md},essenceCopy:{flex:1,gap:2},essenceTitle:{color:colors.paleStarlight,fontFamily:typography.fontFamily.display,fontSize:18},
 soonBadge:{paddingHorizontal:spacing.md,paddingVertical:spacing.xs,borderRadius:radii.pill,backgroundColor:"rgba(135,101,245,0.18)",borderWidth:1,borderColor:colors.panelBorderViolet},soonText:{color:colors.luminousLavender,fontSize:9,letterSpacing:1},
 sessionNote:{color:colors.mutedSilver,fontSize:10,lineHeight:15,textAlign:"center"},
});
