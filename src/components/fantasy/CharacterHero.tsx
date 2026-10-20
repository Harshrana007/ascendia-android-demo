import { Image, StyleSheet, Text, View } from "react-native";
import type { PlayerProfile } from "@/types/demo";
import { getClassPrimaryAttribute, resolveCharacterArt } from "@/services/characterArt";
import { AscendiaIcon } from "@/components/icons/AscendiaIcon";
import { RankCrystal } from "@/components/visual/RankCrystal";
import { GlassFantasyPanel } from "@/components/visual/GlassFantasyPanel";
import { colors, spacing, typography } from "@/theme";
export function CharacterHero({ profile, compact=false }: { profile: PlayerProfile; compact?: boolean }) {
  const art=resolveCharacterArt(profile);
  const code=getClassPrimaryAttribute(profile.className);
  const icon=({ STR:"strength", END:"endurance", INT:"intelligence", DIS:"discipline", VIT:"vitality", WIS:"wisdom" } as const)[code];
  return <GlassFantasyPanel tone="violet" padding={compact ? spacing.md : spacing.lg} radius="xl" style={styles.panel}>
    <View style={styles.row}>
      {art.source ? <Image source={art.source} resizeMode="cover" accessibilityLabel={profile.presentation+" "+profile.className+" initial concept artwork"} style={[styles.portrait,compact && styles.small]} /> :
        <View style={[styles.fallback,compact && styles.fallbackSmall]}><View style={styles.halo}/><AscendiaIcon name={icon} color={colors.celestialCyan} size={compact ? 34 : 45}/><Text style={styles.fallbackRank}>{profile.rank}</Text></View>}
      <View style={styles.copy}><Text style={styles.eyebrow}>{profile.className.toUpperCase()} / {profile.presentation.toUpperCase()}</Text><Text style={styles.name}>{profile.name}</Text><Text style={styles.subtitle}>{profile.className} / Rank {profile.rank}</Text>
        <View style={styles.rankLine}><RankCrystal rank={profile.rank} size={compact ? 43 : 58}/><View style={styles.rankCopy}><Text style={styles.rankName}>Rank {profile.rank}</Text><Text style={styles.rankMeta}>Level {profile.level} / {profile.totalXp.toLocaleString()} total XP</Text></View></View>
        <Text style={styles.artNote}>{art.fallbackLabel}</Text>
      </View>
    </View>
  </GlassFantasyPanel>;
}
const styles=StyleSheet.create({
  panel:{overflow:"hidden"},row:{flexDirection:"row",gap:spacing.md,alignItems:"center"},
  portrait:{width:116,height:178,borderRadius:12,backgroundColor:colors.deepCosmicBlue,borderWidth:1,borderColor:colors.panelBorderViolet},
  small:{width:86,height:126},fallback:{width:112,height:166,alignItems:"center",justifyContent:"center",gap:spacing.md,borderRadius:12,borderWidth:1,borderColor:colors.panelBorderViolet,backgroundColor:"rgba(16,27,56,0.85)",overflow:"hidden"},
  fallbackSmall:{width:82,height:122},halo:{position:"absolute",width:110,height:110,borderRadius:55,backgroundColor:"rgba(135,101,245,0.13)"},
  fallbackRank:{color:colors.luminousLavender,fontFamily:typography.fontFamily.display,fontSize:26},copy:{flex:1,gap:spacing.xs,minWidth:0},
  eyebrow:{color:colors.celestialCyan,fontFamily:typography.fontFamily.bodyMedium,fontSize:9,letterSpacing:1.1},
  name:{color:colors.paleStarlight,fontFamily:typography.fontFamily.display,fontSize:23,lineHeight:28},
  subtitle:{color:colors.mutedSilver,fontSize:12},rankLine:{flexDirection:"row",alignItems:"center",gap:spacing.sm,marginTop:spacing.xs},
  rankCopy:{flex:1,gap:3},rankName:{color:colors.paleStarlight,fontFamily:typography.fontFamily.bodyMedium,fontSize:14},
  rankMeta:{color:colors.mutedSilver,fontSize:10,lineHeight:15},artNote:{color:"rgba(167,181,208,0.82)",fontSize:9,lineHeight:13,marginTop:spacing.xs},
});
