import { useMemo, useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { GlassFantasyPanel } from "@/components/visual/GlassFantasyPanel";
import { GradientActionButton } from "@/components/visual/GradientActionButton";
import { QuestIconTile } from "@/components/visual/QuestIconTile";
import { useDemoState } from "@/state/DemoStateProvider";
import type { CharacterClass, CharacterPresentation, WeekStart } from "@/types/demo";
import { CLASS_OPTIONS, QUEST_TEMPLATES } from "@/services/demoFixtures";
import { clampGuestName, validateGuestName, GUEST_NAME_MAX_CODE_POINTS } from "@/services/guestIdentity";
import { resolveCharacterArt, getClassPrimaryAttribute } from "@/services/characterArt";
import { AscendiaIcon } from "@/components/icons/AscendiaIcon";
import { colors, radii, spacing, textStyles, typography } from "@/theme";

const interests = [
  { key: "Fitness", title: "Fitness", detail: "Movement, strength and stamina" },
  { key: "Learning", title: "Learning", detail: "Reading, study and new skills" },
  { key: "Wellness", title: "Wellness", detail: "Hydration, recovery and calm" },
  { key: "Mindfulness", title: "Mindfulness", detail: "Reflection, focus and intention" },
];
function deviceTimezone() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; }
  catch { return "UTC"; }
}
function isValidTimezone(value: string) {
  try { new Intl.DateTimeFormat("en-US", { timeZone: value }).format(new Date()); return true; }
  catch { return false; }
}

export function OnboardingScreen() {
  const router = useRouter();
  const { finishSetup } = useDemoState();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [classChosen, setClassChosen] = useState(false);
  const [presentationChosen, setPresentationChosen] = useState(false);
  const [className, setClassName] = useState<CharacterClass>("Warrior");
  const [presentation, setPresentation] = useState<CharacterPresentation>("male");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Learning", "Wellness"]);
  const [timezone, setTimezone] = useState(deviceTimezone());
  const [weekStart, setWeekStart] = useState<WeekStart>("Monday");
  const [selectedQuests, setSelectedQuests] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const selectedTemplates = useMemo(() => QUEST_TEMPLATES.filter((item) => selectedQuests.includes(item.key)), [selectedQuests]);
  const previewArt = resolveCharacterArt({ className, presentation, rank: "E" });
  const previewAttribute = getClassPrimaryAttribute(className);
  const previewIcon = ({ STR: "strength", END: "endurance", INT: "intelligence", DIS: "discipline", VIT: "vitality", WIS: "wisdom" } as const)[previewAttribute];
  const steps = ["Identity", "Presentation", "Interests", "Starting quests"];

  function toggle(value: string, values: string[], setValues: (next: string[]) => void) {
    setValues(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }
  async function finish() {
    if (saving) return;
    const callsign = validateGuestName(name);
    if (!callsign.valid) { setNameError(callsign.message); setStep(0); return; }
    if (!classChosen) { Alert.alert("Choose your class", "Select a class to define your hunter identity."); setStep(0); return; }
    if (!presentationChosen) { Alert.alert("Choose your presentation", "Select a presentation before continuing."); setStep(1); return; }
    if (!isValidTimezone(timezone.trim())) { Alert.alert("Valid timezone required", "Enter an IANA timezone such as Asia/Kolkata."); setStep(2); return; }
    setSaving(true);
    try {
      await finishSetup({ name: callsign.value, className, presentation, interests: selectedInterests, homeTimezone: timezone.trim(), weekStart }, selectedQuests);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Hunter record not saved", error instanceof Error ? error.message : "The local save failed. Your form is still available to retry.");
    } finally { setSaving(false); }
  }
  function nextStep() {
    if (step === 0) {
      const callsign = validateGuestName(name);
      if (!callsign.valid) { setNameError(callsign.message); return; }
      if (!classChosen) { Alert.alert("Choose your class", "Select one of the six classes to continue."); return; }
    }
    if (step === 1 && !presentationChosen) { Alert.alert("Choose your presentation", "Select male or female presentation to continue."); return; }
    if (step === 2 && !isValidTimezone(timezone.trim())) { Alert.alert("Valid timezone required", "Enter an IANA timezone such as Asia/Kolkata."); return; }
    setStep((value) => Math.min(3, value + 1));
  }

  return (
    <ScreenShell title={step === 0 ? "Choose Your Callsign" : "Create your hunter"} eyebrow={"Onboarding / 0" + (step + 1) + " of 04"} subtitle="A few choices to make Ascendia feel like yours. You can change these later." scroll={false} showFooter={false}>
      <Image source={require("../../../assets/images/branding/ascendia-splash-icon.png")} resizeMode="contain" accessibilityLabel="Ascendia crest" style={{ width: 42, height: 42, alignSelf: "center" }} />
      <View style={styles.stepper}>
        {steps.map((label, index) => <View key={label} style={styles.stepItem}><View style={[styles.dot, index === step && styles.dotActive, index < step && styles.dotDone]} /><Text style={[styles.stepLabel, index === step && styles.stepLabelActive]}>{label}</Text></View>)}
      </View>
      <ScrollView style={styles.scroller} contentContainerStyle={styles.form} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {step === 0 ? <>
          <Text style={styles.sectionTitle}>Every hunter begins with a name.</Text>
          <TextInput value={name} onChangeText={(value) => { setName(clampGuestName(value)); setNameError(null); }} maxLength={GUEST_NAME_MAX_CODE_POINTS * 2} autoCapitalize="words" autoCorrect={false} returnKeyType="done" placeholder="Choose a callsign" placeholderTextColor={colors.textDisabled} accessibilityLabel="Guest callsign" accessibilityHint="Stored locally on this device. Up to 32 characters." onSubmitEditing={nextStep} style={styles.input} />
          {nameError ? <Text accessibilityRole="alert" style={{ color: colors.error, fontSize: 12, lineHeight: 17 }}>{nameError}</Text> : <Text style={styles.helper}>Stored on this device only. You can change it later.</Text>}
          <Text style={styles.sectionTitle}>Choose your class</Text>
          <Text style={styles.helper}>Class is identity and appearance only. No class grants XP bonuses.</Text>
          <View style={styles.grid}>{CLASS_OPTIONS.map((item) => <Choice key={item} title={item} detail={classDetail(item)} selected={classChosen && className === item} onPress={() => { setClassName(item); setClassChosen(true); }} />)}</View>
        </> : null}
        {step === 1 ? <>
          <Text style={styles.sectionTitle}>Choose your character presentation</Text>
          <Text style={styles.helper}>Missing artwork uses a class emblem instead of unrelated high-rank art.</Text>
          <View style={styles.row}>{(["male", "female"] as const).map((item) => <Choice key={item} title={item === "male" ? "Male" : "Female"} detail="Character presentation" selected={presentationChosen && presentation === item} onPress={() => { setPresentation(item); setPresentationChosen(true); }} />)}</View>
          <GlassFantasyPanel tone="violet">
            <Text style={styles.sectionTitle}>{className} / {presentation}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
              {previewArt.source
                ? <Image source={previewArt.source} resizeMode="cover" accessibilityLabel={presentation + " " + className + " provisional rank E concept art"} style={{ width: 94, height: 126, borderRadius: 10, borderWidth: 1, borderColor: colors.panelBorderViolet }} />
                : <View style={{ width: 94, height: 126, alignItems: "center", justifyContent: "center", borderRadius: 10, borderWidth: 1, borderColor: colors.panelBorderViolet, backgroundColor: colors.deepCosmicBlue }}><AscendiaIcon name={previewIcon} color={colors.celestialCyan} size={42} /></View>}
              <Text style={[styles.helper, { flex: 1 }]}>{previewArt.fallbackLabel}</Text>
            </View>
            <Text style={styles.helper}>Rank E Initiate. Class changes affect identity and appearance only, not XP or gameplay advantages.</Text>
          </GlassFantasyPanel>
        </> : null}
        {step === 2 ? <>
          <Text style={styles.sectionTitle}>What would you like to grow?</Text>
          <View style={styles.stack}>{interests.map((item) => <Choice key={item.key} title={item.title} detail={item.detail} selected={selectedInterests.includes(item.key)} onPress={() => toggle(item.key, selectedInterests, setSelectedInterests)} />)}</View>
          <Text style={styles.sectionTitle}>Confirm your home timezone</Text>
          <Text style={styles.helper}>Suggested from this device. Travel will not silently change your saved home timezone.</Text>
          <TextInput value={timezone} onChangeText={setTimezone} autoCapitalize="none" autoCorrect={false} placeholder="Asia/Kolkata" placeholderTextColor={colors.textDisabled} accessibilityLabel="Home timezone" style={styles.input} />
          <Text style={styles.sectionTitle}>Week starts on</Text>
          <View style={styles.row}>{(["Monday", "Sunday"] as const).map((item) => <Choice key={item} title={item} selected={weekStart === item} onPress={() => setWeekStart(item)} compact />)}</View>
        </> : null}
        {step === 3 ? <>
          <Text style={styles.sectionTitle}>Select your starting quests</Text>
          <Text style={styles.helper}>Rewards use the approved difficulty table. Saved schedules and progress load from SQLite on future launches.</Text>
          {QUEST_TEMPLATES.map((item) => {
            const selected = selectedQuests.includes(item.key);
            const icon = item.key.includes("read") || item.key.includes("book") || item.key.includes("study") ? "book" as const
              : item.key.includes("workout") || item.key.includes("run") ? "run" as const
              : item.key.includes("water") ? "water" as const : "habit" as const;
            return <Pressable key={item.key} accessibilityRole="checkbox" accessibilityState={{ checked: selected }} onPress={() => toggle(item.key, selectedQuests, setSelectedQuests)} style={[styles.questChoice, selected && styles.choiceSelected]}>
              <QuestIconTile icon={icon} size={40} completed={selected} />
              <View style={styles.questCopy}><Text style={styles.questTitle}>{item.title}</Text><Text style={styles.helper}>{item.type} / {item.difficulty} / +{item.xpReward} XP</Text></View>
              <Text style={styles.check}>{selected ? "✓" : "○"}</Text>
            </Pressable>;
          })}
          <Text style={styles.summary}>{selectedTemplates.length} starting quests selected.</Text>
        </> : null}
      </ScrollView>
      <View style={styles.controls}>
        {step > 0 ? <Pressable accessibilityRole="button" disabled={saving} onPress={() => setStep((value) => value - 1)} style={styles.back}><Text style={styles.backText}>Back</Text></Pressable> : null}
        <View style={styles.primary}><GradientActionButton label={step === 3 ? "Enter Ascendia" : "Continue"} onPress={() => step === 3 ? void finish() : nextStep()} loading={saving} loadingLabel="Saving hunter..." disabled={saving} /></View>
      </View>
    </ScreenShell>
  );
}
function classDetail(item: CharacterClass) {
  const details: Record<CharacterClass, string> = { Warrior:"Strength and perseverance", Ranger:"Endurance and exploration", Mage:"Learning and mastery", Assassin:"Precision and focus", Guardian:"Resilience and wellness", Scholar:"Wisdom and reflection" };
  return details[item];
}
function Choice({ title, detail, selected, onPress, compact = false }: { title: string; detail?: string; selected: boolean; onPress: () => void; compact?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={[styles.choice, selected && styles.choiceSelected, compact && styles.choiceCompact]}><Text style={[styles.choiceTitle, selected && styles.choiceTitleSelected]}>{title}</Text>{detail ? <Text style={styles.helper}>{detail}</Text> : null}</Pressable>;
}
const styles = StyleSheet.create({
  stepper:{flexDirection:"row",justifyContent:"space-between",gap:spacing.xs,paddingTop:spacing.sm},stepItem:{flex:1,alignItems:"center",gap:spacing.xs},
  dot:{width:8,height:8,borderRadius:4,backgroundColor:colors.textDisabled},dotActive:{width:21,backgroundColor:colors.celestialCyan},dotDone:{backgroundColor:colors.arcaneViolet},
  stepLabel:{color:colors.mutedSilver,fontSize:9,textAlign:"center"},stepLabelActive:{color:colors.paleStarlight},scroller:{flex:1,marginTop:spacing.md},
  form:{gap:spacing.md,paddingBottom:spacing.lg},sectionTitle:{color:colors.paleStarlight,...textStyles.sectionTitle,marginTop:spacing.xs},helper:{color:colors.mutedSilver,fontSize:11,lineHeight:16},
  input:{minHeight:48,borderRadius:radii.md,borderWidth:1,borderColor:colors.panelBorder,backgroundColor:"rgba(8,13,32,0.82)",color:colors.paleStarlight,paddingHorizontal:spacing.md,fontSize:15},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:spacing.sm},row:{flexDirection:"row",gap:spacing.md},stack:{gap:spacing.sm},
  choice:{flexGrow:1,flexBasis:"46%",borderWidth:1,borderColor:colors.divider,borderRadius:radii.md,padding:spacing.md,backgroundColor:"rgba(8,13,32,0.74)",gap:spacing.xs,minHeight:64,justifyContent:"center"},
  choiceCompact:{flexBasis:"auto",minWidth:112},choiceSelected:{borderColor:colors.celestialCyan,backgroundColor:"rgba(66,139,255,0.17)"},
  choiceTitle:{color:colors.mutedSilver,fontFamily:typography.fontFamily.bodyMedium,fontSize:13},choiceTitleSelected:{color:colors.paleStarlight},
  questChoice:{flexDirection:"row",alignItems:"center",gap:spacing.sm,borderWidth:1,borderColor:colors.divider,borderRadius:radii.md,padding:spacing.sm,backgroundColor:"rgba(8,13,32,0.72)"},
  questCopy:{flex:1,gap:3},questTitle:{color:colors.paleStarlight,fontSize:12,fontFamily:typography.fontFamily.bodyMedium},check:{color:colors.celestialCyan,fontSize:18},
  summary:{color:colors.luminousLavender,fontSize:12,fontFamily:typography.fontFamily.bodyMedium},controls:{flexDirection:"row",gap:spacing.sm,alignItems:"center",paddingTop:spacing.sm,paddingBottom:spacing.md,borderTopWidth:1,borderTopColor:colors.divider},
  back:{minHeight:48,minWidth:64,paddingHorizontal:spacing.md,justifyContent:"center",alignItems:"center",borderRadius:radii.pill,borderWidth:1,borderColor:colors.panelBorder},backText:{color:colors.paleStarlight,fontSize:13},primary:{flex:1},
});
