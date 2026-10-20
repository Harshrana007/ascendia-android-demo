import { useState } from "react";
import { Alert, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { GlassFantasyPanel } from "@/components/visual/GlassFantasyPanel";
import { RankCrystal } from "@/components/visual/RankCrystal";
import { GradientActionButton } from "@/components/visual/GradientActionButton";
import { useDemoState } from "@/state/DemoStateProvider";
import { ADVENTURE_DEFINITIONS, deriveAdventureProgress } from "@/game/adventures/rules";
import type { AdventureKey } from "@/types/demo";
import { colors, radii, spacing, typography } from "@/theme";

const adventureBackground = require("../../../assets/images/backgrounds/cosmic-home-background.webp");
const statusLabels = { active: "ACTIVE", abandoned: "ABANDONED", completed: "COMPLETED" } as const;

export function AdventuresScreen() {
  const { state, startAdventure, abandonAdventure, completeAdventure } = useDemoState();
  const [expanded, setExpanded] = useState<AdventureKey | null>("hollow-crypt");

  async function perform(action: "start" | "abandon" | "complete", key: AdventureKey) {
    try {
      if (action === "start") await startAdventure(key);
      if (action === "abandon") await abandonAdventure(key);
      if (action === "complete") {
        await completeAdventure(key);
        Alert.alert("Adventure objective met", "The configured real-world objective is saved. No extra XP was awarded for opening the adventure.");
      }
    } catch (error) {
      Alert.alert("Adventure not updated", error instanceof Error ? error.message : "The local adventure record was not changed.");
    }
  }

  return (
    <ScreenShell title="Adventures" eyebrow="World map / Real-world objectives" subtitle="Every gate is tied to your saved quest records. Adventure status never grants arbitrary XP." backgroundSource={adventureBackground}>
      <ImageBackground source={adventureBackground} resizeMode="cover" imageStyle={styles.bannerImage} style={styles.banner}>
        <View style={styles.bannerOverlay} />
        <View style={styles.bannerCopy}>
          <Text style={styles.kicker}>THE COSMIC FRONTIER</Text>
          <Text style={styles.bannerTitle}>Beyond the Gate</Text>
          <Text style={styles.bannerText}>Hunter {state.profile?.name ?? "Hunter"}, the objective is real even when the world around it is fantasy.</Text>
        </View>
      </ImageBackground>
      {ADVENTURE_DEFINITIONS.map((adventure, index) => {
        const record = state.adventureStates.find((item) => item.key === adventure.key);
        const status: "available" | "active" | "abandoned" | "completed" = record?.status ?? "available";
        const objective = deriveAdventureProgress(adventure.key, state.quests, state.history ?? []);
        const fill = (Math.round(objective.ratio * 100) + "%") as `${number}%`;
        const isExpanded = expanded === adventure.key;
        return (
          <GlassFantasyPanel key={adventure.key} tone={index === 1 ? "violet" : "cyan"}>
            <Pressable accessibilityRole="button" accessibilityState={{ expanded: isExpanded }} onPress={() => setExpanded(isExpanded ? null : adventure.key)} style={styles.locationRow}>
              <View style={styles.crest}><RankCrystal rank={adventure.rank} size={56} /></View>
              <View style={styles.locationCopy}>
                <Text style={styles.locationType}>RANK {adventure.rank} / {status === "available" ? "AVAILABLE" : statusLabels[status]}</Text>
                <Text style={styles.locationTitle}>{adventure.title}</Text>
                <Text style={styles.locationText}>{adventure.description}</Text>
              </View>
            </Pressable>
            {isExpanded ? (
              <View style={styles.details}>
                <Text style={styles.objectiveLabel}>REAL-WORLD OBJECTIVE</Text>
                <Text style={styles.locationText}>{adventure.objective}</Text>
                <View style={styles.track}><View style={[styles.fill, { width: fill }]} /></View>
                <Text style={styles.progressText}>{objective.progressLabel}</Text>
                {status === "completed" ? <Text style={styles.completeNote}>OBJECTIVE COMPLETE. Your saved quest records remain the source of truth.</Text>
                  : <>
                    {!objective.eligible ? <Text style={styles.finePrint}>{adventure.sealedHint}</Text> : <Text style={styles.completeNote}>Objective satisfied. You can complete this adventure now.</Text>}
                    <GradientActionButton label={status === "active" ? "Continue Adventure" : status === "abandoned" ? "Restart Adventure" : "Start Adventure"} onPress={() => { void perform("start", adventure.key); }} />
                    {status === "active" && objective.eligible ? <GradientActionButton label="Complete Adventure" onPress={() => { void perform("complete", adventure.key); }} /> : null}
                    {status === "active" ? <Pressable accessibilityRole="button" onPress={() => Alert.alert("Abandon adventure?", "Your quest progress and rewards stay unchanged. You can restart this adventure later.", [{ text: "Keep going", style: "cancel" }, { text: "Abandon", style: "destructive", onPress: () => { void perform("abandon", adventure.key); } }])} style={styles.abandon}><Text style={styles.abandonText}>Abandon adventure</Text></Pressable> : null}
                  </>}
              </View>
            ) : <Pressable accessibilityRole="button" onPress={() => setExpanded(adventure.key)} style={styles.viewDetails}><Text style={styles.viewDetailsText}>View objective and progress</Text></Pressable>}
          </GlassFantasyPanel>
        );
      })}
      <Text style={styles.finePrint}>No battles, loot, equipment, or bonus XP are simulated here. Adventure completion records an objective state only.</Text>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
 banner:{minHeight:174,borderRadius:radii.xl,overflow:"hidden",justifyContent:"flex-end",borderWidth:1,borderColor:colors.panelBorderViolet},
 bannerImage:{opacity:0.68},bannerOverlay:{...StyleSheet.absoluteFillObject,backgroundColor:"rgba(5,9,22,0.45)"},
 bannerCopy:{padding:spacing.lg,gap:spacing.xs},kicker:{color:colors.celestialCyan,fontSize:9,letterSpacing:1.8,fontFamily:typography.fontFamily.bodyMedium},
 bannerTitle:{color:colors.paleStarlight,fontFamily:typography.fontFamily.display,fontSize:28},bannerText:{color:colors.paleStarlight,fontSize:12,lineHeight:18,maxWidth:290},
 locationRow:{flexDirection:"row",gap:spacing.md,alignItems:"center"},crest:{width:62,alignItems:"center"},locationCopy:{flex:1,gap:spacing.xs},locationType:{color:colors.luminousLavender,fontSize:9,letterSpacing:1.1},
 locationTitle:{color:colors.paleStarlight,fontFamily:typography.fontFamily.display,fontSize:21},locationText:{color:colors.mutedSilver,fontSize:12,lineHeight:17},
 details:{gap:spacing.sm,marginTop:spacing.md,borderTopWidth:1,borderTopColor:colors.divider,paddingTop:spacing.md},objectiveLabel:{color:colors.celestialCyan,fontSize:9,letterSpacing:1.3,fontFamily:typography.fontFamily.bodyMedium},
 track:{height:7,borderRadius:radii.pill,overflow:"hidden",backgroundColor:"rgba(117,217,255,0.13)",marginTop:spacing.xs},fill:{height:7,borderRadius:radii.pill,backgroundColor:colors.celestialCyan},
 progressText:{color:colors.paleStarlight,fontSize:11},completeNote:{color:colors.celestialCyan,fontSize:11,lineHeight:16},finePrint:{color:colors.mutedSilver,fontSize:10,lineHeight:15},
 viewDetails:{paddingTop:spacing.md,minHeight:36,justifyContent:"center"},viewDetailsText:{color:colors.celestialCyan,fontSize:11},
 abandon:{minHeight:38,justifyContent:"center",alignItems:"center"},abandonText:{color:colors.error,fontSize:11,fontFamily:typography.fontFamily.bodyMedium},
});
