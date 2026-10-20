import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GradientActionButton } from "@/components/visual/GradientActionButton";
import { colors, spacing, typography } from "@/theme";

export function DatabaseStatusScreen({ mode, message, onRetry }: { mode: "loading" | "error"; message?: string | null; onRetry?: () => void }) {
  const isLoading = mode === "loading";
  return (
    <View style={styles.root}>
      <View style={styles.insignia}><Text style={styles.crystal}>A</Text></View>
      <Text style={styles.brand}>ASCENDIA</Text>
      <Text style={styles.title}>{isLoading ? "Consulting the System" : "Local System Unavailable"}</Text>
      <Text style={styles.copy}>{isLoading ? "Preparing your saved hunter record. No progress will be invented while storage initializes." : message || "Your local progress could not be loaded. Your data has not been intentionally reset."}</Text>
      {isLoading ? <ActivityIndicator color={colors.celestialCyan} size="large" style={styles.spinner} /> : <View style={styles.button}><GradientActionButton label="Retry local storage" onPress={() => onRetry?.()} /></View>}
      <Text style={styles.footer}>SYSTEM NOTICE / LOCAL DATA ONLY</Text>
    </View>
  );
}
const styles = StyleSheet.create({
 root:{flex:1,backgroundColor:colors.midnightNavy,alignItems:"center",justifyContent:"center",padding:spacing.xl},
 insignia:{width:82,height:82,borderRadius:41,borderWidth:1,borderColor:colors.panelBorderViolet,alignItems:"center",justifyContent:"center",backgroundColor:colors.deepCosmicBlue},
 crystal:{fontFamily:typography.fontFamily.display,fontSize:46,color:colors.luminousLavender},brand:{marginTop:spacing.lg,fontFamily:typography.fontFamily.display,fontSize:31,letterSpacing:4,color:colors.paleStarlight},
 title:{marginTop:spacing.xl,fontFamily:typography.fontFamily.display,fontSize:23,color:colors.paleStarlight,textAlign:"center"},
 copy:{marginTop:spacing.md,color:colors.mutedSilver,fontSize:13,lineHeight:21,textAlign:"center",maxWidth:340},spinner:{marginTop:spacing.xl},
 button:{width:"100%",maxWidth:340,marginTop:spacing.xl},footer:{marginTop:spacing.xxl,color:colors.mutedSilver,fontSize:9,letterSpacing:1.5},
});
