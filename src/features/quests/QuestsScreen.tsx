import { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { QuestCard } from "@/components/quests/QuestCard";
import { QuestProgressModal } from "@/components/quests/QuestProgressModal";
import { QuestEditorModal } from "@/features/quests/QuestEditorModal";
import { GradientActionButton } from "@/components/visual/GradientActionButton";
import { GlassFantasyPanel } from "@/components/visual/GlassFantasyPanel";
import { useDemoState } from "@/state/DemoStateProvider";
import type { Quest, QuestDraft, QuestType } from "@/types/demo";
import { colors, radii, spacing, typography } from "@/theme";
type Filter = "All" | QuestType | "Completed";
const questsBackground = require("../../../assets/images/backgrounds/cosmic-home-background.webp");

export function QuestsScreen() {
  const { state, createQuest, editQuest, archiveQuest, deleteQuest, complete, addProgress, correct } = useDemoState();
  const [filter, setFilter] = useState<Filter>("All");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Quest | undefined>();
  const [showHistory, setShowHistory] = useState(false);
  const [progressQuest, setProgressQuest] = useState<Quest | null>(null);

  const visibleQuests = useMemo(() => state.quests.filter((quest) => {
    if (quest.isArchived) return false;
    return filter === "All" || filter === "Completed" || quest.type === filter;
  }), [state.quests, filter]);
  const history = useMemo(() => (state.history ?? []).filter((item) => filter === "All" || filter === "Completed" || item.type === filter), [state.history, filter]);

  async function saveQuest(draft: QuestDraft) {
    if (editing) await editQuest(editing.id, draft);
    else await createQuest(draft);
    setEditorOpen(false);
    setEditing(undefined);
  }
  async function finishQuest(id: string) {
    try {
      const result = await complete(id);
      Alert.alert(result.status === "completed" ? "System Notice: Quest Cleared" : "System Notice", result.message);
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
  function askCorrection(completionId: string) {
    Alert.alert("Correct this completion?", "This will reverse the saved reward and keep an audit record. Corrections are allowed only within 48 hours.", [
      { text: "Cancel", style: "cancel" },
      { text: "Correct completion", style: "destructive", onPress: () => { void (async () => {
        try { await correct(completionId, "Player corrected completion within the 48-hour window."); Alert.alert("Correction saved", "The original reward was reversed and the audit trail was preserved."); }
        catch (error) { Alert.alert("Correction not saved", error instanceof Error ? error.message : "The saved state is unchanged."); }
      })(); } },
    ]);
  }

  return (
    <ScreenShell title="Quest Registry" eyebrow="Quests / Real-world missions" subtitle="Your daily actions are the main storyline. Filter by type, or inspect the saved completion record." backgroundSource={questsBackground}>
      <View style={styles.filters}>{(["All", "Daily", "Weekly", "Milestone", "One-Time", "Completed"] as Filter[]).map((item) => (
        <Pressable key={item} onPress={() => { setFilter(item); if (item === "Completed") setShowHistory(true); }} accessibilityRole="button" accessibilityState={{ selected: filter === item }} style={[styles.filter, filter === item && styles.active]}>
          <Text style={[styles.filterText, filter === item && styles.activeText]}>{item}</Text>
        </Pressable>
      ))}</View>
      <Pressable accessibilityRole="button" onPress={() => setShowHistory((value) => !value)} style={styles.historyToggle}><Text style={styles.historyText}>{showHistory ? "Show active quests" : "View saved completion history"}</Text></Pressable>
      {!showHistory ? <>
        <View style={styles.countRow}><Text style={styles.count}>{visibleQuests.filter((quest) => filter === "All" || filter === "Completed" || quest.type === filter).length} active quest records</Text><Text style={styles.count}>{(state.history ?? []).filter((record) => record.valid).length} completions recorded</Text></View>
        {visibleQuests.filter((quest) => filter !== "Completed" && (filter === "All" || quest.type === filter)).length
          ? visibleQuests.filter((quest) => filter !== "Completed" && (filter === "All" || quest.type === filter)).map((quest) => (
            <QuestCard key={quest.id} quest={quest}
              onComplete={!quest.isCompleted && (quest.type !== "Daily" || quest.scheduledToday) ? () => { void finishQuest(quest.id); } : undefined}
              onAddProgress={!quest.isCompleted && (quest.type === "Weekly" || quest.type === "Milestone") ? () => setProgressQuest(quest) : undefined}
              onEdit={!quest.isArchived ? () => { setEditing(quest); setEditorOpen(true); } : undefined}
              onArchive={!quest.isArchived ? () => Alert.alert("Archive quest?", "This removes the quest from active use but preserves completion and reward history.", [{ text: "Cancel", style: "cancel" }, { text: "Archive", style: "destructive", onPress: () => { void archiveQuest(quest.id).catch((error: unknown) => Alert.alert("Archive failed", error instanceof Error ? error.message : "The quest was not archived.")); } }]) : undefined}
              onDelete={!quest.isArchived && !quest.isCompleted && !quest.occurrenceVoided && quest.progress === 0 && !(state.history ?? []).some((record) => record.questId === quest.id) && !(state.rewardLedger ?? []).some((record) => record.questId === quest.id) ? () => Alert.alert("Delete draft quest?", "This permanently removes only a quest with no completion, progress, or reward history. Archive quests with history instead.", [{ text: "Cancel", style: "cancel" }, { text: "Delete draft", style: "destructive", onPress: () => { void deleteQuest(quest.id).then(() => Alert.alert("Draft deleted", "The unused quest was removed.")).catch((error: unknown) => Alert.alert("Draft not deleted", error instanceof Error ? error.message : "The saved quest was not changed.")); } }]) : undefined}
            />
          ))
          : <View style={styles.empty}><Text style={styles.emptyTitle}>No quests in this view</Text><Text style={styles.emptyCopy}>Every hunter starts somewhere. Add a quest when you are ready.</Text></View>}
        <GradientActionButton label="Create Quest" onPress={() => { setEditing(undefined); setEditorOpen(true); }} />
      </> : <>
        <View style={styles.countRow}><Text style={styles.count}>{history.length} completion records</Text><Text style={styles.count}>Correction window: 48 hours</Text></View>
        {history.length ? history.map((record) => (
          <GlassFantasyPanel key={record.completionId} tone={record.valid ? "cyan" : "subtle"} padding={spacing.md} radius="lg">
            <Text style={styles.historyType}>{record.type.toUpperCase()} / {record.difficulty.toUpperCase()} / {record.localDate}</Text>
            <Text style={styles.historyTitle}>{record.questTitle}</Text>
            <Text style={styles.historyMeta}>{record.valid ? "+" + record.xp + " XP recorded" : "Completion corrected. Original reward reversed."}</Text>
            <Text style={styles.historyMeta}>{new Date(record.completedAt).toLocaleString()} / {record.timezone}</Text>
            {record.correctionNote ? <Text style={styles.historyMeta}>Audit note: {record.correctionNote}</Text> : null}
            {record.canCorrect ? <Pressable accessibilityRole="button" onPress={() => askCorrection(record.completionId)} style={styles.correct}><Text style={styles.correctText}>Correct completion</Text></Pressable> : null}
          </GlassFantasyPanel>
        )) : <View style={styles.empty}><Text style={styles.emptyTitle}>No completion history yet</Text><Text style={styles.emptyCopy}>Your first cleared quest will appear here with its reward record.</Text></View>}
        {state.quests.some((quest) => quest.isArchived) ? <View style={styles.archivedSection}><Text style={styles.archivedTitle}>Archived quests</Text>{state.quests.filter((quest) => quest.isArchived).map((quest) => <QuestCard key={quest.id} quest={quest} compact />)}</View> : null}
      </>}
      <Text style={styles.note}>System Notice: saved records survive app restarts. Daily occurrences use the confirmed home timezone; schedule edits apply to future dates.</Text>
      <QuestEditorModal visible={editorOpen} initialQuest={editing} onClose={() => { setEditorOpen(false); setEditing(undefined); }} onSave={saveQuest} />
      <QuestProgressModal quest={progressQuest} onClose={() => setProgressQuest(null)} onSave={saveProgress} />
    </ScreenShell>
  );
}
const styles = StyleSheet.create({
 filters:{flexDirection:"row",flexWrap:"wrap",gap:spacing.xs},filter:{borderWidth:1,borderColor:colors.divider,paddingVertical:spacing.sm,paddingHorizontal:spacing.md,borderRadius:radii.pill,backgroundColor:"rgba(8,13,32,0.75)"},
 active:{borderColor:colors.celestialCyan,backgroundColor:"rgba(66,139,255,0.2)"},filterText:{color:colors.mutedSilver,fontSize:11},activeText:{color:colors.paleStarlight,fontFamily:typography.fontFamily.bodyMedium},
 historyToggle:{alignSelf:"flex-start",paddingVertical:spacing.sm,paddingHorizontal:spacing.xs},historyText:{color:colors.celestialCyan,fontSize:12,textDecorationLine:"underline"},
 countRow:{flexDirection:"row",justifyContent:"space-between",gap:spacing.sm,marginTop:spacing.xs},count:{color:colors.mutedSilver,fontSize:10},empty:{paddingVertical:spacing.xxl,paddingHorizontal:spacing.lg,alignItems:"center",gap:spacing.sm,borderRadius:radii.lg,borderWidth:1,borderStyle:"dashed",borderColor:colors.divider},
 emptyTitle:{color:colors.paleStarlight,fontSize:17,fontFamily:typography.fontFamily.display},emptyCopy:{color:colors.mutedSilver,textAlign:"center",fontSize:12,lineHeight:18},
 historyType:{color:colors.luminousLavender,fontSize:9,letterSpacing:0.9},historyTitle:{color:colors.paleStarlight,fontFamily:typography.fontFamily.bodyMedium,fontSize:14,marginTop:spacing.xs},
 historyMeta:{color:colors.mutedSilver,fontSize:10,lineHeight:15,marginTop:spacing.xs},correct:{alignSelf:"flex-start",marginTop:spacing.sm,paddingHorizontal:spacing.md,paddingVertical:spacing.sm,borderWidth:1,borderColor:colors.error,borderRadius:radii.pill},correctText:{color:colors.error,fontSize:11,fontFamily:typography.fontFamily.bodyMedium},
 archivedSection:{gap:spacing.sm},archivedTitle:{color:colors.luminousLavender,fontFamily:typography.fontFamily.display,fontSize:18},note:{color:colors.mutedSilver,fontSize:10,lineHeight:15,textAlign:"center"},
});
