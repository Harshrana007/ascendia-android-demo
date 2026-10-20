import type { ReactNode } from "react";
import type { ImageSourcePropType } from "react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CosmicBackground } from "@/components/visual";
import { colors, spacing, textStyles, typography } from "@/theme";
type Props = { title: string; eyebrow: string; subtitle?: string; children: ReactNode; backgroundSource?: ImageSourcePropType; scroll?: boolean; headerAction?: ReactNode; hideHeading?: boolean; showFooter?: boolean };
export function ScreenShell({ title, eyebrow, subtitle, children, backgroundSource, scroll=true, headerAction, hideHeading=false, showFooter=true }: Props) {
  const body = <View style={[styles.content, !scroll && styles.fixed]}>
    <View style={styles.brandRow}><View style={styles.brandCopy}><Text style={styles.brand}>ASCENDIA</Text><Text style={styles.tagline}>DISCIPLINE TODAY. A GREATER YOU TOMORROW.</Text></View>{headerAction}</View>
    {!hideHeading ? <View style={styles.heading}><Text style={styles.eyebrow}>{eyebrow}</Text><Text accessibilityRole="header" style={textStyles.screenTitle}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View> : null}
    {children}
    {showFooter ? <Text style={styles.footer}>SYSTEM NOTICE: EVERY SMALL QUEST COUNTS.</Text> : null}
  </View>;
  return <CosmicBackground source={backgroundSource} overlay={backgroundSource ? "strong" : "standard"}><SafeAreaView style={styles.safe} edges={["top","left","right"]}>{scroll ? <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>{body}</ScrollView> : body}</SafeAreaView></CosmicBackground>;
}
const styles = StyleSheet.create({
  safe:{flex:1}, scroll:{paddingBottom:spacing.xl}, content:{paddingHorizontal:spacing.screenGutter,paddingTop:spacing.md,gap:spacing.lg}, fixed:{flex:1},
  brandRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:spacing.md}, brandCopy:{gap:2,flex:1},
  brand:{fontFamily:typography.fontFamily.display,color:colors.paleStarlight,fontSize:26,letterSpacing:3.3},
  tagline:{color:colors.mutedSilver,fontSize:9,letterSpacing:0.7,fontFamily:typography.fontFamily.bodyMedium},
  heading:{gap:spacing.xs}, eyebrow:{color:colors.celestialCyan,fontFamily:typography.fontFamily.bodyMedium,fontSize:10,letterSpacing:1.7,textTransform:"uppercase"},
  subtitle:{color:colors.mutedSilver,...textStyles.secondary}, footer:{color:"rgba(167,181,208,0.72)",fontSize:9,textAlign:"center",letterSpacing:1.1,marginTop:spacing.sm},
});
