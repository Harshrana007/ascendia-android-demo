import { StyleSheet, Text, View } from "react-native";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { CharacterHero } from "@/components/fantasy/CharacterHero";
import { AttributeBadge } from "@/components/visual/AttributeBadge";
import { GlassFantasyPanel } from "@/components/visual/GlassFantasyPanel";
import { RankCrystal } from "@/components/visual/RankCrystal";
import { XPProgressBar } from "@/components/visual/XPProgressBar";
import { useDemoState } from "@/state/DemoStateProvider";
import { ATTRIBUTE_LABELS, RANKS } from "@/services/demoFixtures";
import { colors, radii, spacing, textStyles, typography } from "@/theme";
const bg=require("../../../assets/images/backgrounds/cosmic-player-background.webp");
export function PlayerScreen(){
 const {state}=useDemoState();const profile=state.profile;if(!profile)return null;
 return <ScreenShell title="Player Record" eyebrow="Player / Hunter evolution" subtitle="Track the growth that comes from what you do, not what you equip." backgroundSource={bg}>
  <CharacterHero profile={profile} compact/>
  <GlassFantasyPanel tone="cyan"><View style={s.levelRow}><View><Text style={s.overline}>CURRENT LEVEL</Text><Text style={s.level}>Level {profile.level}</Text></View><View style={s.right}><Text style={s.xp}>{profile.totalXp.toLocaleString()} XP</Text><Text style={s.caption}>Total earned</Text></View></View><XPProgressBar current={profile.xpIntoLevel} maximum={profile.xpToNextLevel} label="Demo XP toward next level"/><Text style={s.note}>The current level curve is a demo value. Rank promotion requirements remain disabled until Step 4.</Text></GlassFantasyPanel>
  <View style={s.section}><Text style={s.sectionTitle}>Six attributes</Text><Text style={s.note}>Values show lifetime attribute XP in this demo session, not a gear-based stat bonus.</Text><View style={s.grid}>{(Object.keys(ATTRIBUTE_LABELS) as (keyof typeof ATTRIBUTE_LABELS)[]).map(code=><View key={code} style={s.attribute}><AttributeBadge attribute={code} value={profile.attributeXp[code]} caption={ATTRIBUTE_LABELS[code]}/></View>)}</View></View>
  <GlassFantasyPanel tone="violet"><Text style={s.sectionTitle}>Rank progression</Text><Text style={s.note}>Rank changes are not simulated before the approved rank engine is connected.</Text><View style={s.rankGrid}>{RANKS.map(rank=><View key={rank} style={[s.rankItem,rank===profile.rank&&s.current]}><RankCrystal rank={rank} size={42}/><Text style={[s.rankLabel,rank===profile.rank&&s.rankCurrent]}>{rank===profile.rank?"Current "+rank:rank}</Text>{rank!==profile.rank?<Text style={s.locked}>Awaiting rules</Text>:null}</View>)}</View></GlassFantasyPanel>
  <GlassFantasyPanel tone="subtle"><Text style={s.sectionTitle}>Achievements</Text><Text style={s.note}>{state.rewardLedger.length?state.rewardLedger.length+" reward events recorded during this app session.":"Your first achievement begins with your first cleared quest. No achievements have been fabricated."}</Text></GlassFantasyPanel>
 </ScreenShell>;
}
const s=StyleSheet.create({levelRow:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:spacing.md},overline:{color:colors.celestialCyan,fontSize:10,letterSpacing:1.1},level:{color:colors.paleStarlight,fontFamily:typography.fontFamily.display,fontSize:24,marginTop:3},right:{alignItems:"flex-end"},xp:{color:colors.celestialCyan,fontFamily:typography.fontFamily.numeric,fontSize:18},caption:{color:colors.mutedSilver,fontSize:10,marginTop:3},note:{color:colors.mutedSilver,fontSize:11,lineHeight:16,marginTop:spacing.sm},section:{gap:spacing.md},sectionTitle:{color:colors.paleStarlight,...textStyles.sectionTitle},grid:{flexDirection:"row",flexWrap:"wrap",marginHorizontal:-spacing.xs},attribute:{width:"50%",padding:spacing.xs},rankGrid:{flexDirection:"row",flexWrap:"wrap",gap:spacing.sm,marginTop:spacing.md},rankItem:{minWidth:67,flexGrow:1,alignItems:"center",padding:spacing.xs,borderRadius:radii.md,borderWidth:1,borderColor:colors.divider,backgroundColor:"rgba(8,13,32,0.6)"},current:{borderColor:colors.celestialCyan,backgroundColor:"rgba(66,139,255,0.15)"},rankLabel:{color:colors.mutedSilver,fontSize:11,fontFamily:typography.fontFamily.bodyMedium},rankCurrent:{color:colors.paleStarlight},locked:{color:colors.textDisabled,fontSize:8,marginTop:3,textAlign:"center"}});
