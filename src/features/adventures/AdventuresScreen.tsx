import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { GlassFantasyPanel } from "@/components/visual/GlassFantasyPanel";
import { RankCrystal } from "@/components/visual/RankCrystal";
import { useDemoState } from "@/state/DemoStateProvider";
import { colors, radii, spacing, typography } from "@/theme";
const adventureBackground = require("../../../assets/images/backgrounds/cosmic-home-background.webp");
const locations = [
  { name: "Void Nexus", detail: "Face the unknown after your daily foundations are steady.", type: "PORTAL", rank: "E" as const },
  { name: "Iron Bastion", detail: "A fortress of persistence. Consistency opens the next chapter.", type: "TRIAL", rank: "D" as const },
  { name: "Sage's Labyrinth", detail: "A place for patient thinking, learning and reflection.", type: "ARCHIVE", rank: "C" as const },
];
export function AdventuresScreen() {
  const { state } = useDemoState();
  return <ScreenShell title="Adventures" eyebrow="World map / Coming Soon" subtitle="A wider world is waiting. For now, your real-life quests are the ones that count." backgroundSource={adventureBackground}>
    <ImageBackground source={adventureBackground} resizeMode="cover" imageStyle={styles.bannerImage} style={styles.banner}>
      <View style={styles.bannerOverlay} /><View style={styles.bannerCopy}><Text style={styles.kicker}>THE COSMIC FRONTIER</Text><Text style={styles.bannerTitle}>Beyond the Gate</Text><Text style={styles.bannerText}>Hunter {state.profile?.name ?? "Hunter"}, your next level is built in real life. Current level: {state.profile?.level ?? 1}.</Text></View>
    </ImageBackground>
    {locations.map((location, index) => <GlassFantasyPanel key={location.name} tone={index === 0 ? "violet" : "cyan"}>
      <View style={styles.locationRow}><View style={styles.crest}><RankCrystal rank={location.rank} size={56} /></View><View style={styles.locationCopy}><Text style={styles.locationType}>{location.type} / SEALED</Text><Text style={styles.locationTitle}>{location.name}</Text><Text style={styles.locationText}>{location.detail}</Text></View></View>
      <View style={styles.badge}><Text style={styles.badgeText}>COMING SOON</Text></View>
    </GlassFantasyPanel>)}
    <Text style={styles.finePrint}>No simulated battles, loot or bonus XP are hidden behind these portals. The gate stays closed until there is a real feature to open.</Text>
  </ScreenShell>;
}
const styles = StyleSheet.create({
 banner:{minHeight:190,borderRadius:radii.xl,overflow:"hidden",justifyContent:"flex-end",borderWidth:1,borderColor:colors.panelBorderViolet},bannerImage:{opacity:0.68},bannerOverlay:{...StyleSheet.absoluteFillObject,backgroundColor:"rgba(5,9,22,0.38)"},
 bannerCopy:{padding:spacing.lg,gap:spacing.xs},kicker:{color:colors.celestialCyan,fontSize:9,letterSpacing:1.8,fontFamily:typography.fontFamily.bodyMedium},bannerTitle:{color:colors.paleStarlight,fontFamily:typography.fontFamily.display,fontSize:28},bannerText:{color:colors.paleStarlight,fontSize:12,lineHeight:18,maxWidth:270},
 locationRow:{flexDirection:"row",gap:spacing.md,alignItems:"center"},crest:{width:62,alignItems:"center"},locationCopy:{flex:1,gap:spacing.xs},locationType:{color:colors.luminousLavender,fontSize:9,letterSpacing:1.1},locationTitle:{color:colors.paleStarlight,fontFamily:typography.fontFamily.display,fontSize:21},locationText:{color:colors.mutedSilver,fontSize:12,lineHeight:17},
 badge:{alignSelf:"flex-start",marginTop:spacing.md,paddingHorizontal:spacing.md,paddingVertical:spacing.xs,borderRadius:radii.pill,borderWidth:1,borderColor:colors.panelBorderViolet,backgroundColor:"rgba(135,101,245,0.12)"},badgeText:{color:colors.luminousLavender,fontSize:9,fontFamily:typography.fontFamily.bodyMedium,letterSpacing:1.2},finePrint:{color:colors.mutedSilver,fontSize:10,lineHeight:15,textAlign:"center"},
});
