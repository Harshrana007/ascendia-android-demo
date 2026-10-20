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
const playerBackground = require("../../../assets/images/backgrounds/cosmic-home-background.webp");

export function PlayerScreen() {
  const { state } = useDemoState();
  const profile = state.profile;
  if (!profile) return null;
  const rewards = state.rewardLedger ?? [];
  const achievements = state.achievements ?? [];
  return (
    <ScreenShell title="Player Record" eyebrow="Player / Hunter evolution" subtitle="Track growth that comes from what you do, not what you equip." backgroundSource={playerBackground}>
      <CharacterHero profile={profile} compact />
      <GlassFantasyPanel tone="cyan">
        <View style={styles.levelRow}><View><Text style={styles.overline}>CURRENT LEVEL</Text><Text style={styles.level}>Level {profile.level}</Text></View><View style={styles.right}><Text style={styles.xp}>{profile.totalXp.toLocaleString()} XP</Text><Text style={styles.caption}>Lifetime balance</Text></View></View>
        <XPProgressBar current={profile.xpIntoLevel} maximum={profile.xpToNextLevel} label="Current-level XP progress" />
        <Text style={styles.note}>Demo level curve: {profile.xpToNextLevel.toLocaleString()} XP per level. Rank gates remain disabled pending product approval.</Text>
      </GlassFantasyPanel>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Six attributes</Text>
        <Text style={styles.note}>These values show saved lifetime attribute XP, not gear-based stat bonuses.</Text>
        <View style={styles.grid}>{(Object.keys(ATTRIBUTE_LABELS) as (keyof typeof ATTRIBUTE_LABELS)[]).map((code) => <View key={code} style={styles.attribute}><AttributeBadge attribute={code} value={profile.attributeXp[code]} caption={ATTRIBUTE_LABELS[code]} /></View>)}</View>
      </View>
      <GlassFantasyPanel tone="violet">
        <Text style={styles.sectionTitle}>Rank progression</Text>
        <Text style={styles.note}>Promotion requirements combine level and consistency in the intended design. Exact gates have not been approved, so the demo does not auto-promote.</Text>
        <View style={styles.rankGrid}>{RANKS.map((rank) => <View key={rank} style={[styles.rankItem, rank === profile.rank && styles.current]}><RankCrystal rank={rank} size={42} /><Text style={[styles.rankLabel, rank === profile.rank && styles.rankCurrent]}>{rank === profile.rank ? "Current " + rank : rank}</Text>{rank !== profile.rank ? <Text style={styles.locked}>Requirements pending</Text> : null}</View>)}</View>
      </GlassFantasyPanel>
      <GlassFantasyPanel tone="subtle">
        <Text style={styles.sectionTitle}>Achievements</Text>
        {achievements.length ? achievements.map((achievement) => <View key={achievement.id} style={styles.historyRow}><View style={styles.achievementMark}><Text style={styles.achievementGlyph}>✦</Text></View><View style={styles.historyCopy}><Text style={styles.historyTitle}>{achievement.title}</Text><Text style={styles.note}>{new Date(achievement.unlockedAt).toLocaleDateString()}</Text></View></View>)
          : <Text style={styles.note}>Your first achievement begins with your first cleared quest. The System does not mint empty medals.</Text>}
      </GlassFantasyPanel>
      <GlassFantasyPanel tone="subtle">
        <Text style={styles.sectionTitle}>Recent reward ledger</Text>
        {rewards.length ? rewards.slice(0, 6).map((reward) => <View key={reward.id} style={styles.ledgerRow}><View style={styles.historyCopy}><Text style={styles.historyTitle}>{reward.questTitle}</Text><Text style={styles.note}>{new Date(reward.createdAt).toLocaleString()}{reward.isReversal ? " / correction reversal" : ""}</Text></View><Text style={[styles.ledgerXp, reward.xp < 0 && styles.reversedXp]}>{reward.xp > 0 ? "+" : ""}{reward.xp} XP</Text></View>)
          : <Text style={styles.note}>No XP has been awarded in this profile yet.</Text>}
      </GlassFantasyPanel>
    </ScreenShell>
  );
}
const styles = StyleSheet.create({
 levelRow:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:spacing.md},overline:{color:colors.celestialCyan,fontSize:10,letterSpacing:1.1},
 level:{color:colors.paleStarlight,fontFamily:typography.fontFamily.display,fontSize:24,marginTop:3},right:{alignItems:"flex-end"},xp:{color:colors.celestialCyan,fontFamily:typography.fontFamily.numeric,fontSize:18},caption:{color:colors.mutedSilver,fontSize:10,marginTop:3},
 note:{color:colors.mutedSilver,fontSize:11,lineHeight:16,marginTop:spacing.sm},section:{gap:spacing.md},sectionTitle:{color:colors.paleStarlight,...textStyles.sectionTitle},
 grid:{flexDirection:"row",flexWrap:"wrap",marginHorizontal:-spacing.xs},attribute:{width:"50%",padding:spacing.xs},
 rankGrid:{flexDirection:"row",flexWrap:"wrap",gap:spacing.sm,marginTop:spacing.md},rankItem:{minWidth:67,flexGrow:1,alignItems:"center",padding:spacing.xs,borderRadius:radii.md,borderWidth:1,borderColor:colors.divider,backgroundColor:"rgba(8,13,32,0.6)"},
 current:{borderColor:colors.celestialCyan,backgroundColor:"rgba(66,139,255,0.15)"},rankLabel:{color:colors.mutedSilver,fontSize:11,fontFamily:typography.fontFamily.bodyMedium},rankCurrent:{color:colors.paleStarlight},locked:{color:colors.textDisabled,fontSize:8,marginTop:3,textAlign:"center"},
 historyRow:{flexDirection:"row",alignItems:"center",gap:spacing.sm,paddingVertical:spacing.sm,borderBottomWidth:1,borderBottomColor:colors.divider},achievementMark:{width:34,height:34,borderRadius:17,borderWidth:1,borderColor:colors.panelBorderViolet,alignItems:"center",justifyContent:"center"},achievementGlyph:{color:colors.luminousLavender,fontSize:17},historyCopy:{flex:1,gap:2},historyTitle:{color:colors.paleStarlight,fontSize:12,fontFamily:typography.fontFamily.bodyMedium},
 ledgerRow:{flexDirection:"row",alignItems:"center",gap:spacing.md,paddingVertical:spacing.sm,borderBottomWidth:1,borderBottomColor:colors.divider},ledgerXp:{color:colors.celestialCyan,fontFamily:typography.fontFamily.numeric,fontSize:13},reversedXp:{color:colors.error},
});
