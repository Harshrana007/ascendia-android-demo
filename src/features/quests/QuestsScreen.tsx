import { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { QuestCard } from "@/components/quests/QuestCard";
import { QuestEditorModal } from "@/features/quests/QuestEditorModal";
import { GradientActionButton } from "@/components/visual/GradientActionButton";
import { useDemoState } from "@/state/DemoStateProvider";
import type { Quest, QuestDraft, QuestType } from "@/types/demo";
import { colors, radii, spacing, typography } from "@/theme";
type Filter = "All" | QuestType | "Completed";
export function QuestsScreen(){
 const {state,createQuest,editQuest,archiveQuest,complete,addProgress}=useDemoState();
 const [filter,setFilter]=useState<Filter>("All");const [editorOpen,setEditorOpen]=useState(false);const [editing,setEditing]=useState<Quest|undefined>();const [history,setHistory]=useState(false);
 const visible=useMemo(()=>state.quests.filter(q=>{if(history){if(filter==="Completed")return q.isCompleted&&!q.isArchived;const old=q.isArchived||q.isCompleted;return old&&(filter==="All"||q.type===filter);}if(filter==="Completed")return q.isCompleted&&!q.isArchived;if(q.isArchived||q.isCompleted)return false;return filter==="All"||q.type===filter;}),[state.quests,filter,history]);
 const save=(draft:QuestDraft)=>{if(editing)editQuest(editing.id,draft);else createQuest(draft);setEditorOpen(false);setEditing(undefined);};
 const done=(id:string)=>{const r=complete(id);Alert.alert(r.status==="completed"?"Quest cleared":"System notice",r.message);};
 const progress=(id:string)=>{const r=addProgress(id,1);Alert.alert(r.status==="goal-reached"?"Milestone reached":"Progress updated",r.message);};
 return <ScreenShell title="Quest Registry" eyebrow="Quests / Real-world missions" subtitle="Your daily actions are the main storyline. Select a quest type to focus your list.">
  <View style={s.filters}>{(["All","Daily","Weekly","Milestone","One-Time","Completed"] as Filter[]).map(item=><Pressable key={item} onPress={()=>{setFilter(item);setHistory(item==="Completed");}} accessibilityRole="button" accessibilityState={{selected:filter===item}} style={[s.filter,filter===item&&s.active]}><Text style={[s.filterText,filter===item&&s.activeText]}>{item}</Text></Pressable>)}</View>
  <Pressable accessibilityRole="button" onPress={()=>{setHistory(v=>!v);if(filter==="Completed")setFilter("All");}} style={s.history}><Text style={s.historyText}>{history?"Show active quests":"View completed and archived history"}</Text></Pressable>
  <View style={s.header}><Text style={s.count}>{visible.length} {history?"history records":"quests"}</Text><Text style={s.count}>{state.quests.filter(q=>q.isCompleted).length} cleared</Text></View>
  {visible.length?visible.map(q=><QuestCard key={q.id} quest={q} onComplete={!q.isCompleted&&!q.isArchived?()=>done(q.id):undefined} onAddProgress={!q.isCompleted&&!q.isArchived?()=>progress(q.id):undefined} onEdit={!q.isArchived?()=>{setEditing(q);setEditorOpen(true);}:undefined} onArchive={!q.isArchived?()=>Alert.alert("Archive quest?","This quest will leave the active list. Its current session history is retained.",[{text:"Cancel",style:"cancel"},{text:"Archive",onPress:()=>archiveQuest(q.id)}]):undefined}/>):<View style={s.empty}><Text style={s.emptyTitle}>{history?"No history yet":"No quests in this view"}</Text><Text style={s.emptyCopy}>Every hunter starts somewhere. Add a quest when you are ready.</Text></View>}
  <GradientActionButton label="Create Quest" onPress={()=>{setEditing(undefined);setEditorOpen(true);}}/>
  <Text style={s.note}>Demo session only. Weekday selections are stored, but timezone-aware scheduling and streak rules activate in Step 4.</Text>
  <QuestEditorModal visible={editorOpen} initialQuest={editing} onClose={()=>{setEditorOpen(false);setEditing(undefined);}} onSave={save}/>
 </ScreenShell>;
}
const s=StyleSheet.create({filters:{flexDirection:"row",flexWrap:"wrap",gap:spacing.xs},filter:{borderWidth:1,borderColor:colors.divider,paddingVertical:spacing.sm,paddingHorizontal:spacing.md,borderRadius:radii.pill,backgroundColor:"rgba(8,13,32,0.75)"},active:{borderColor:colors.celestialCyan,backgroundColor:"rgba(66,139,255,0.2)"},filterText:{color:colors.mutedSilver,fontSize:11},activeText:{color:colors.paleStarlight,fontFamily:typography.fontFamily.bodyMedium},history:{alignSelf:"flex-start",paddingVertical:spacing.sm,paddingHorizontal:spacing.xs},historyText:{color:colors.celestialCyan,fontSize:12,textDecorationLine:"underline"},header:{flexDirection:"row",justifyContent:"space-between",marginTop:spacing.xs},count:{color:colors.mutedSilver,fontSize:11},empty:{paddingVertical:spacing.xxl,paddingHorizontal:spacing.lg,alignItems:"center",gap:spacing.sm,borderRadius:radii.lg,borderWidth:1,borderStyle:"dashed",borderColor:colors.divider},emptyTitle:{color:colors.paleStarlight,fontSize:17,fontFamily:typography.fontFamily.display},emptyCopy:{color:colors.mutedSilver,textAlign:"center",fontSize:12,lineHeight:18},note:{color:colors.mutedSilver,fontSize:10,lineHeight:15,textAlign:"center"}});
