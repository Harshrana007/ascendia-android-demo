import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Quest } from "@/types/demo";
import { AscendiaIcon } from "@/components/icons/AscendiaIcon";
import { QuestIconTile } from "@/components/visual/QuestIconTile";
import { GlassFantasyPanel } from "@/components/visual/GlassFantasyPanel";
import { colors, radii, spacing, typography } from "@/theme";
type Props = { quest: Quest; compact?: boolean; onComplete?: () => void; onAddProgress?: () => void; onEdit?: () => void; onArchive?: () => void; onDelete?: () => void };
function iconFor(quest: Quest) {
  const title = quest.title.toLowerCase();
  if (title.includes("read") || title.includes("book") || title.includes("study") || title.includes("language")) return "book" as const;
  if (title.includes("run") || title.includes("workout") || title.includes("exercise")) return "run" as const;
  if (title.includes("meditat") || title.includes("reflect")) return "meditation" as const;
  if (title.includes("water")) return "water" as const;
  return "habit" as const;
}
export function QuestCard({ quest, compact = false, onComplete, onAddProgress, onEdit, onArchive, onDelete }: Props) {
  const measurable = quest.type === "Weekly" || quest.type === "Milestone";
  const ratio = measurable ? Math.min(1, quest.progress / Math.max(quest.target ?? 1, 1)) : 0;
  const progressWidth = (Math.round(ratio * 100) + "%") as `${number}%`;
  return <GlassFantasyPanel tone={quest.isCompleted ? "violet" : "cyan"} padding={compact ? spacing.sm : spacing.md} radius="lg">
    <View style={styles.row}>
      <QuestIconTile icon={iconFor(quest)} completed={quest.isCompleted} size={compact ? 42 : 50} />
      <View style={styles.info}>
        <Text style={styles.type}>{quest.type.toUpperCase()} / {quest.difficulty.toUpperCase()}</Text>
        <Text style={[styles.title, quest.isCompleted && styles.doneTitle]}>{quest.title}</Text>
        {!compact && quest.description ? <Text style={styles.description}>{quest.description}</Text> : null}
        <Text style={styles.reward}>{quest.occurrenceVoided ? "CORRECTED / OCCURRENCE VOIDED" : quest.isCompleted ? "CLEARED" : "+ " + quest.xpReward + " XP on completion"}</Text>
        {quest.occurrenceVoided && !compact ? <Text style={styles.progressText}>{quest.occurrenceCorrectionNote || "This occurrence was corrected. Its history remains available."}</Text> : null}
        {quest.type === "Daily" && quest.scheduledToday === false ? <Text style={styles.progressText}>Not scheduled for today</Text> : null}
        {measurable ? <View style={styles.progressArea}><View style={styles.track}><View style={[styles.fill, { width: progressWidth }]} /></View><Text style={styles.progressText}>{quest.progress} / {quest.target} {quest.unit}</Text></View> : null}
      </View>
      {quest.isCompleted ? <View accessibilityRole="image" accessibilityLabel="Completed" style={styles.done}><AscendiaIcon name="habit" color={colors.celestialCyan} size={22} /></View>
        : quest.occurrenceVoided ? null : measurable && onAddProgress ? <Pressable accessibilityRole="button" accessibilityLabel={"Add measured progress to " + quest.title} onPress={onAddProgress} style={styles.action}><Text style={styles.actionText}>+</Text></Pressable>
        : onComplete && quest.scheduledToday !== false ? <Pressable accessibilityRole="button" accessibilityLabel={"Complete " + quest.title} onPress={onComplete} style={styles.action}><AscendiaIcon name="chevron" color={colors.celestialCyan} size={20} /></Pressable> : null}
    </View>
    {!compact && (onEdit || onArchive || onDelete) ? <View style={styles.tools}>{onEdit ? <Pressable accessibilityRole="button" onPress={onEdit} hitSlop={8} style={styles.tool}><Text style={styles.toolText}>Edit</Text></Pressable> : null}{onArchive ? <Pressable accessibilityRole="button" onPress={onArchive} hitSlop={8} style={styles.tool}><Text style={styles.toolText}>Archive</Text></Pressable> : null}{onDelete ? <Pressable accessibilityRole="button" onPress={onDelete} hitSlop={8} style={styles.tool}><Text style={[styles.toolText, { color: colors.error }]}>Delete draft</Text></Pressable> : null}</View> : null}
  </GlassFantasyPanel>;
}
const styles = StyleSheet.create({
 row:{flexDirection:"row",alignItems:"center",gap:spacing.sm},info:{flex:1,gap:3,minWidth:0},type:{color:colors.luminousLavender,fontSize:9,fontFamily:typography.fontFamily.bodyMedium,letterSpacing:0.9},
 title:{color:colors.paleStarlight,fontSize:14,fontFamily:typography.fontFamily.bodyMedium,fontWeight:"600"},doneTitle:{color:colors.celestialCyan,textDecorationLine:"line-through"},
 description:{color:colors.mutedSilver,fontSize:11,lineHeight:15},reward:{color:colors.celestialCyan,fontSize:10,fontFamily:typography.fontFamily.bodyMedium,marginTop:2},
 progressArea:{gap:4,marginTop:4},track:{height:5,borderRadius:radii.pill,overflow:"hidden",backgroundColor:"rgba(117,217,255,0.13)"},fill:{height:5,borderRadius:radii.pill,backgroundColor:colors.celestialCyan},progressText:{color:colors.mutedSilver,fontSize:10},
 done:{width:34,height:34,borderRadius:17,borderWidth:1,borderColor:colors.celestialCyan,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(117,217,255,0.1)"},
 action:{minWidth:36,minHeight:36,alignItems:"center",justifyContent:"center",borderRadius:radii.md,borderWidth:1,borderColor:colors.panelBorder,backgroundColor:"rgba(66,139,255,0.12)"},actionText:{color:colors.celestialCyan,fontSize:20,fontWeight:"700"},
 tools:{flexDirection:"row",justifyContent:"flex-end",gap:spacing.md,borderTopWidth:1,borderTopColor:colors.divider,marginTop:spacing.sm,paddingTop:spacing.xs},tool:{minHeight:30,justifyContent:"center",paddingHorizontal:spacing.sm},toolText:{color:colors.mutedSilver,fontSize:11,fontFamily:typography.fontFamily.bodyMedium},
});
