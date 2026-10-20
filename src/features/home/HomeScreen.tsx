import { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { CharacterHero } from "@/components/fantasy/CharacterHero";
import { QuestCard } from "@/components/quests/QuestCard";
import { QuestEditorModal } from "@/features/quests/QuestEditorModal";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { GlassFantasyPanel } from "@/components/visual/GlassFantasyPanel";
import { GradientActionButton } from "@/components/visual/GradientActionButton";
import { XPProgressBar } from "@/components/visual/XPProgressBar";
import { AscendiaIcon } from "@/components/icons/AscendiaIcon";
import { useDemoState } from "@/state/DemoStateProvider";
import { colors, radii, spacing, textStyles, typography } from "@/theme";
const homeBackground = require("../../../assets/images/backgrounds/cosmic-home-background.webp");
export function HomeScreen(){
 const router=useRouter();const {state,complete,addProgress,createQuest}=useDemoState();const profile=state.profile;const [editor,setEditor]=useState(false);
 const daily=useMemo(()=>state.quests.filter(q=>q.type==="Daily"&&!q.isArchived),[state.quests]);
 const weekly=state.quests.filter(q=>q.type==="Weekly"&&!q.isArchived);const milestones=state.quests.filter(q=>q.type==="Milestone"&&!q.isArchived);if(!profile)return null;
 const done=(id:string)=>{const r=complete(id);Alert.alert(r.status==="completed"?"Quest cleared":"System notice",r.message);};
 const add=(id:string)=>{const r=addProgress(id,1);Alert.alert(r.status==="goal-reached"?"Milestone reached":"Progress updated",r.message);};
 return <ScreenShell title="Home" eyebrow="Home / Hunter dashboard" subtitle="The dungeon is optional. Showing up for yourself is the main quest." backgroundSource={homeBackground} hideHeading showFooter={false} headerAction={<Pressable accessibilityRole="button" accessibilityLabel="Open profile" onPress={()=>router.push("/(tabs)/profile")} style={s.settings}><AscendiaIcon name="settings" color={colors.paleStarlight} size={20}/></Pressable>}>
  <Text style={s.quote}>“Every cleared quest makes the next rank possible.”</Text><CharacterHero profile={profile}/>
  <View style={s.xpPanel}><View style={s.xpHead}><View><Text style={s.rank}>{profile.rank} RANK</Text><Text style={s.level}>Level {profile.level}</Text></View><View style={s.right}><Text style={s.xp}>{profile.totalXp.toLocaleString()}</Text><Text style={s.meta}>TOTAL XP</Text></View></View><XPProgressBar current={profile.xpIntoLevel} maximum={profile.xpToNextLevel} label="Demo XP toward next level"/><Text style={s.note}>Demo level curve: {profile.xpToNextLevel.toLocaleString()} XP per level. Rank rules await Step 4.</Text></View>
  <View style={s.stats}><GlassFantasyPanel tone="violet" padding={spacing.md} style={s.stat}><AscendiaIcon name="streak" color={colors.restrainedGold} size={24}/><Text style={s.number}>{profile.dailyStreak}</Text><Text style={s.statLabel}>Day streak</Text></GlassFantasyPanel><GlassFantasyPanel tone="cyan" padding={spacing.md} style={s.stat}><AscendiaIcon name="achievement" color={colors.restrainedGold} size={24}/><Text style={s.number}>{profile.bestStreak}</Text><Text style={s.statLabel}>Best streak</Text></GlassFantasyPanel></View>
  <Text style={s.streakNote}>Streak and scheduled-day validation activates with the scheduling engine in Step 4.</Text>
  <GlassFantasyPanel tone="cyan"><SectionHeader title="Today's quests" subtitle={daily.filter(q=>q.isCompleted).length+" / "+daily.length+" completed in this session"}/><View style={s.questList}>{daily.length?daily.slice(0,4).map(q=><QuestCard key={q.id} quest={q} compact onComplete={()=>done(q.id)}/>):<Text style={s.empty}>No daily quests yet. A blank slate is still a starting point.</Text>}</View><GradientActionButton label="Create Quest" onPress={()=>setEditor(true)}/><Pressable accessibilityRole="button" onPress={()=>router.push("/(tabs)/quests")} style={s.viewAll}><Text style={s.viewAllText}>View all quests</Text><AscendiaIcon name="chevron" color={colors.celestialCyan} size={16}/></Pressable></GlassFantasyPanel>
  {weekly.length?<View style={s.section}><SectionHeader title="Weekly progress" subtitle="Small sessions add up."/>{weekly.slice(0,2).map(q=><QuestCard key={q.id} quest={q} compact onAddProgress={()=>add(q.id)}/>)}</View>:null}
  {milestones.length?<View style={s.section}><SectionHeader title="Long-term milestones" subtitle="The long game is still the game."/>{milestones.slice(0,2).map(q=><QuestCard key={q.id} quest={q} compact onAddProgress={()=>add(q.id)}/>)}</View>:null}
  <Text style={s.sessionNote}>SYSTEM NOTICE: This demo keeps progress for the current app session only. Durable saves arrive with Step 4.</Text>
  <QuestEditorModal visible={editor} onClose={()=>setEditor(false)} onSave={draft=>{createQuest(draft);setEditor(false);}}/>
 </ScreenShell>;
}
const s=StyleSheet.create({
 settings:{width:42,height:42,alignItems:"center",justifyContent:"center",borderRadius:21,borderWidth:1,borderColor:colors.panelBorder,backgroundColor:"rgba(8,13,32,0.65)"},
 quote:{alignSelf:"center",textAlign:"center",color:colors.luminousLavender,fontSize:11,fontStyle:"italic",lineHeight:17},
 xpPanel:{gap:spacing.md,paddingHorizontal:spacing.md,paddingVertical:spacing.md,borderRadius:radii.lg,borderWidth:1,borderColor:colors.panelBorder,backgroundColor:"rgba(8,13,32,0.8)"},
 xpHead:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},rank:{color:colors.luminousLavender,fontSize:11,letterSpacing:1.4,fontFamily:typography.fontFamily.bodyMedium},
 level:{color:colors.paleStarlight,fontSize:21,fontFamily:typography.fontFamily.display,marginTop:2},right:{alignItems:"flex-end"},xp:{color:colors.celestialCyan,fontFamily:typography.fontFamily.numeric,fontSize:22},meta:{color:colors.mutedSilver,fontSize:9,letterSpacing:1.2},
 note:{color:colors.mutedSilver,fontSize:10,lineHeight:14},stats:{flexDirection:"row",gap:spacing.md},stat:{flex:1,alignItems:"center",gap:spacing.xs},number:{color:colors.paleStarlight,fontSize:25,fontFamily:typography.fontFamily.numeric},statLabel:{color:colors.mutedSilver,fontSize:11},
 streakNote:{color:colors.mutedSilver,fontSize:10,lineHeight:14,textAlign:"center"},questList:{gap:spacing.sm,marginTop:spacing.md,marginBottom:spacing.md},empty:{color:colors.mutedSilver,...textStyles.secondary,paddingVertical:spacing.md},viewAll:{flexDirection:"row",gap:spacing.xs,alignItems:"center",justifyContent:"center",paddingTop:spacing.md},viewAllText:{color:colors.celestialCyan,fontSize:12,fontFamily:typography.fontFamily.bodyMedium},section:{gap:spacing.md},sessionNote:{color:colors.mutedSilver,fontSize:10,lineHeight:15,textAlign:"center"},
});
