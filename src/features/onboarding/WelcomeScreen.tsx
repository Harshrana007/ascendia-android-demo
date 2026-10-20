import { useEffect, useState } from "react";
import { AccessibilityInfo, ImageBackground, StyleSheet, Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { GradientActionButton } from "@/components/visual/GradientActionButton";
import { RankCrystal } from "@/components/visual/RankCrystal";
import { colors, spacing, typography } from "@/theme";
const homeEnvironment = require("../../../assets/images/backgrounds/cosmic-home-background.webp");
export function WelcomeScreen(){
  const router=useRouter();const opacity=useSharedValue(0);const rise=useSharedValue(16);const [reduceMotion,setReduceMotion]=useState(false);
  const animated=useAnimatedStyle(()=>({opacity:opacity.value,transform:[{translateY:rise.value}]}));
  useEffect(()=>{AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(()=>setReduceMotion(false));const sub=AccessibilityInfo.addEventListener("reduceMotionChanged",setReduceMotion);return()=>sub.remove();},[]);
  useEffect(()=>{if(reduceMotion){opacity.value=1;rise.value=0;}else{opacity.value=withTiming(1,{duration:620,easing:Easing.out(Easing.cubic)});rise.value=withTiming(0,{duration:620,easing:Easing.out(Easing.cubic)});}},[opacity,rise,reduceMotion]);
  return <ImageBackground source={homeEnvironment} resizeMode="cover" style={styles.bg}><View style={styles.overlay}/><Animated.View style={[styles.content,animated]}>
    <Text style={styles.kicker}>A NEW JOURNEY AWAITS</Text><Text style={styles.brand}>ASCENDIA</Text>
    <View style={styles.crystal}><RankCrystal rank="E" size={116}/></View>
    <Text accessibilityRole="header" style={styles.title}>Welcome, Hunter.</Text>
    <Text style={styles.subtitle}>Your next evolution begins with the choices you make today.</Text>
    <Text style={styles.quote}>“No legendary transformation without legendary consistency.”</Text>
    <View style={styles.action}><GradientActionButton label="Begin Your Journey" onPress={()=>router.push("/onboarding")}/></View>
    <Text style={styles.notice}>SYSTEM NOTICE: NO GATE REQUIRED. JUST SHOW UP.</Text>
  </Animated.View></ImageBackground>;
}
const styles=StyleSheet.create({
  bg:{flex:1,backgroundColor:colors.midnightNavy},overlay:{...StyleSheet.absoluteFillObject,backgroundColor:"rgba(5,9,22,0.6)"},
  content:{flex:1,paddingHorizontal:spacing.xl,paddingTop:42,paddingBottom:34,alignItems:"center",justifyContent:"center"},
  kicker:{color:colors.celestialCyan,fontSize:10,letterSpacing:2.5,fontFamily:typography.fontFamily.bodyMedium,textAlign:"center"},
  brand:{color:colors.paleStarlight,fontFamily:typography.fontFamily.display,fontSize:40,letterSpacing:5,marginTop:spacing.md,textAlign:"center"},
  crystal:{marginTop:spacing.xl,marginBottom:spacing.xl,padding:spacing.md,borderRadius:100,borderWidth:1,borderColor:"rgba(183,160,255,0.35)",backgroundColor:"rgba(8,13,32,0.45)"},
  title:{color:colors.paleStarlight,fontFamily:typography.fontFamily.display,fontSize:30,textAlign:"center"},
  subtitle:{color:colors.mutedSilver,fontSize:15,lineHeight:23,textAlign:"center",marginTop:spacing.md,maxWidth:330},
  quote:{color:colors.luminousLavender,fontSize:12,fontStyle:"italic",lineHeight:19,textAlign:"center",marginTop:spacing.xl,maxWidth:310},
  action:{width:"100%",maxWidth:340,marginTop:spacing.xxl},notice:{color:"rgba(232,241,255,0.68)",fontSize:9,letterSpacing:1.3,marginTop:spacing.xl,textAlign:"center"},
});
