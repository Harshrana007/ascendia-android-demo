import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { CharacterHero } from "@/components/fantasy/CharacterHero";
import { GlassFantasyPanel } from "@/components/visual/GlassFantasyPanel";
import { GradientActionButton } from "@/components/visual/GradientActionButton";
import { useDemoState } from "@/state/DemoStateProvider";
import { CLASS_OPTIONS } from "@/services/demoFixtures";
import type { CharacterClass, CharacterPresentation, WeekStart } from "@/types/demo";
import { colors, radii, spacing, textStyles, typography } from "@/theme";
const profileBackground = require("../../../assets/images/backgrounds/cosmic-home-background.webp");
function validTimezone(value: string) { try { new Intl.DateTimeFormat("en-US", { timeZone: value }).format(new Date()); return true; } catch { return false; } }

export function ProfileScreen() {
  const router = useRouter();
  const { state, updateProfile, resetDemo } = useDemoState();
  const profile = state.profile;
  const [name, setName] = useState(profile?.name ?? "");
  const [timezone, setTimezone] = useState(profile?.homeTimezone ?? "UTC");
  const [weekStart, setWeekStart] = useState<WeekStart>(profile?.weekStart ?? "Monday");
  const [saving, setSaving] = useState(false);
  useEffect(() => { setName(profile?.name ?? ""); setTimezone(profile?.homeTimezone ?? "UTC"); setWeekStart(profile?.weekStart ?? "Monday"); }, [profile?.name, profile?.homeTimezone, profile?.weekStart]);
  if (!profile) return null;

  async function save() {
    if (saving) return;
    if (name.trim().length < 2) { Alert.alert("Name too short", "Use at least two characters for your hunter name."); return; }
    if (!validTimezone(timezone.trim())) { Alert.alert("Valid timezone required", "Enter an IANA timezone such as Asia/Kolkata."); return; }
    setSaving(true);
    try { await updateProfile({ name: name.trim(), homeTimezone: timezone.trim(), weekStart }); Alert.alert("Profile saved", "Your local hunter record has been updated."); }
    catch (error) { Alert.alert("Profile not saved", error instanceof Error ? error.message : "Your saved profile is unchanged."); }
    finally { setSaving(false); }
  }
  async function changeIdentity(patch: { className?: CharacterClass; presentation?: CharacterPresentation }) {
    try { await updateProfile(patch); }
    catch (error) { Alert.alert("Change not saved", error instanceof Error ? error.message : "Your previous identity is unchanged."); }
  }
  async function changePreference(patch: { notificationsEnabled?: boolean; reducedMotion?: boolean }) {
    try { await updateProfile(patch); }
    catch (error) { Alert.alert("Preference not saved", error instanceof Error ? error.message : "Your previous preference is unchanged."); }
  }
  const reset = () => Alert.alert("Reset local demo data?", "This removes your local profile, quests, completion history and XP from this device. There is no cloud backup.", [
    { text: "Cancel", style: "cancel" },
    { text: "Reset local data", style: "destructive", onPress: () => { void (async () => { try { await resetDemo(); router.replace("/welcome"); } catch (error) { Alert.alert("Reset failed", error instanceof Error ? error.message : "The local data was not reset."); } })(); } },
  ]);

  return (
    <ScreenShell title="Hunter Profile" eyebrow="Profile / Identity and settings" subtitle="Your settings should support your journey, not become another quest." backgroundSource={profileBackground}>
      <CharacterHero profile={profile} compact />
      <GlassFantasyPanel tone="cyan">
        <Text style={styles.section}>Identity</Text>
        <Text style={styles.label}>Hunter name</Text><TextInput value={name} onChangeText={setName} maxLength={32} placeholder="Hunter name" placeholderTextColor={colors.textDisabled} style={styles.input} />
        <Text style={styles.label}>Class</Text><View style={styles.chips}>{CLASS_OPTIONS.map((item) => <Choice key={item} label={item} selected={profile.className === item} disabled={saving} onPress={() => { void changeIdentity({ className: item as CharacterClass }); }} />)}</View>
        <Text style={styles.label}>Character presentation</Text><View style={styles.chips}>{(["male", "female"] as const).map((item) => <Choice key={item} label={item === "male" ? "Male" : "Female"} selected={profile.presentation === item} disabled={saving} onPress={() => { void changeIdentity({ presentation: item as CharacterPresentation }); }} />)}</View>
        <Text style={styles.helper}>Class and presentation updates preserve XP and quest history. Missing artwork uses the class emblem fallback.</Text>
      </GlassFantasyPanel>
      <GlassFantasyPanel tone="violet">
        <Text style={styles.section}>Schedule preferences</Text>
        <Text style={styles.label}>Home timezone</Text><TextInput value={timezone} onChangeText={setTimezone} autoCapitalize="none" autoCorrect={false} placeholder="Asia/Kolkata" placeholderTextColor={colors.textDisabled} style={styles.input} />
        <Text style={styles.helper}>The home timezone is stored explicitly. Travel does not silently change it.</Text>
        <Text style={styles.label}>Week starts on</Text><View style={styles.chips}>{(["Monday", "Sunday"] as const).map((item) => <Choice key={item} label={item} selected={weekStart === item} disabled={saving} onPress={() => setWeekStart(item)} />)}</View>
        <GradientActionButton label="Save profile details" onPress={() => { void save(); }} loading={saving} loadingLabel="Saving profile..." disabled={saving} />
      </GlassFantasyPanel>
      <GlassFantasyPanel tone="subtle">
        <Text style={styles.section}>Preferences</Text>
        <Preference label="Reminders enabled" detail="Preference only. Scheduled Android notifications are not implemented." value={profile.notificationsEnabled} onChange={(value) => { void changePreference({ notificationsEnabled: value }); }} />
        <Preference label="Reduced motion" detail="Stored locally. The Welcome screen also respects Android system reduced-motion settings." value={profile.reducedMotion} onChange={(value) => { void changePreference({ reducedMotion: value }); }} />
      </GlassFantasyPanel>
      <GlassFantasyPanel tone="subtle">
        <Text style={styles.section}>Account and sync</Text><Text style={styles.helper}>Cloud accounts, social features and subscriptions are not part of this offline demo.</Text>
        <View style={styles.soonLine}><Text style={styles.soonLabel}>Account and Sync</Text><Text style={styles.soon}>COMING SOON</Text></View>
        <View style={styles.soonLine}><Text style={styles.soonLabel}>Friends and Leaderboards</Text><Text style={styles.soon}>COMING SOON</Text></View>
      </GlassFantasyPanel>
      <GlassFantasyPanel tone="subtle">
        <Text style={styles.section}>Local demo data</Text><Text style={styles.helper}>Saved data stays on this device. Android system data clearing or uninstalling the app may remove it.</Text>
        <Pressable accessibilityRole="button" onPress={reset} style={styles.reset}><Text style={styles.resetLabel}>Reset local demo data</Text></Pressable>
      </GlassFantasyPanel>
    </ScreenShell>
  );
}
function Choice({ label, selected, onPress, disabled = false }: { label: string; selected: boolean; onPress: () => void; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected, disabled }} disabled={disabled} onPress={onPress} style={[styles.chip, selected && styles.chipActive, disabled && styles.disabled]}><Text style={[styles.chipText, selected && styles.chipTextActive]}>{label}</Text></Pressable>;
}
function Preference({ label, detail, value, onChange }: { label: string; detail: string; value: boolean; onChange: (value: boolean) => void }) {
  return <View style={styles.preference}><View style={styles.preferenceCopy}><Text style={styles.preferenceTitle}>{label}</Text><Text style={styles.helper}>{detail}</Text></View><Switch value={value} onValueChange={onChange} trackColor={{ false: "#39435C", true: colors.arcaneViolet }} thumbColor={value ? colors.paleStarlight : colors.mutedSilver} accessibilityLabel={label} /></View>;
}
const styles = StyleSheet.create({
 section:{color:colors.paleStarlight,...textStyles.sectionTitle,marginBottom:spacing.sm},label:{color:colors.mutedSilver,fontSize:11,marginTop:spacing.sm,marginBottom:spacing.xs},
 input:{minHeight:46,borderRadius:radii.md,borderWidth:1,borderColor:colors.panelBorder,backgroundColor:"rgba(8,13,32,0.74)",color:colors.paleStarlight,paddingHorizontal:spacing.md,fontSize:14},
 chips:{flexDirection:"row",flexWrap:"wrap",gap:spacing.xs,marginBottom:spacing.sm},chip:{borderWidth:1,borderColor:colors.divider,borderRadius:radii.pill,paddingHorizontal:spacing.md,paddingVertical:spacing.sm,backgroundColor:"rgba(8,13,32,0.65)"},
 chipActive:{borderColor:colors.celestialCyan,backgroundColor:"rgba(66,139,255,0.18)"},chipText:{color:colors.mutedSilver,fontSize:11},chipTextActive:{color:colors.paleStarlight,fontFamily:typography.fontFamily.bodyMedium},disabled:{opacity:0.5},
 helper:{color:colors.mutedSilver,fontSize:11,lineHeight:16,marginTop:spacing.xs},preference:{flexDirection:"row",alignItems:"center",gap:spacing.md,paddingVertical:spacing.sm,borderBottomWidth:1,borderBottomColor:colors.divider},
 preferenceCopy:{flex:1,gap:2},preferenceTitle:{color:colors.paleStarlight,fontSize:13,fontFamily:typography.fontFamily.bodyMedium},
 soonLine:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:spacing.sm,paddingVertical:spacing.md,borderTopWidth:1,borderTopColor:colors.divider},
 soonLabel:{color:colors.mutedSilver,fontSize:12},soon:{color:colors.luminousLavender,fontSize:9,letterSpacing:1},
 reset:{minHeight:44,marginTop:spacing.md,borderWidth:1,borderColor:colors.error,borderRadius:radii.md,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(255,110,145,0.08)"},
 resetLabel:{color:colors.error,fontFamily:typography.fontFamily.bodyMedium,fontSize:12},
});
