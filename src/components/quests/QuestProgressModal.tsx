import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { Quest } from "@/types/demo";
import { GradientActionButton } from "@/components/visual/GradientActionButton";
import { colors, radii, spacing, textStyles, typography } from "@/theme";
type Props = { quest: Quest | null; onClose: () => void; onSave: (amount: number) => Promise<void> | void };
export function QuestProgressModal({ quest, onClose, onSave }: Props) {
  const [amount, setAmount] = useState("1");
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (quest) { setAmount("1"); setSaving(false); } }, [quest]);
  async function save() {
    if (saving) return;
    const numeric = Number(amount.trim());
    if (!Number.isFinite(numeric) || numeric <= 0) { Alert.alert("Enter a valid amount", "Progress must be a number greater than zero."); return; }
    setSaving(true);
    try { await onSave(numeric); }
    catch (error) { Alert.alert("Progress not saved", error instanceof Error ? error.message : "The local save failed. Your previous progress is unchanged."); }
    finally { setSaving(false); }
  }
  return (
    <Modal visible={quest !== null} transparent animationType="fade" onRequestClose={() => { if (!saving) onClose(); }}>
      <View style={styles.scrim}><KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.keyboard}>
        <View style={styles.panel}>
          <Text style={styles.eyebrow}>QUEST PROGRESS</Text><Text accessibilityRole="header" style={styles.title}>Record progress</Text>
          <Text style={styles.quest}>{quest?.title}</Text><Text style={styles.helper}>Current progress: {quest?.progress ?? 0} / {quest?.target ?? 0} {quest?.unit ?? ""}</Text>
          <Text style={styles.label}>Amount to add ({quest?.unit ?? "units"})</Text>
          <TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" selectTextOnFocus placeholder="1" placeholderTextColor={colors.textDisabled} style={styles.input} accessibilityLabel="Progress amount" />
          <GradientActionButton label="Save progress" onPress={() => { void save(); }} loading={saving} loadingLabel="Saving progress..." disabled={saving} />
          <Pressable accessibilityRole="button" disabled={saving} onPress={onClose} style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable>
        </View>
      </KeyboardAvoidingView></View>
    </Modal>
  );
}
const styles = StyleSheet.create({
 scrim:{flex:1,justifyContent:"center",padding:spacing.screenGutter,backgroundColor:"rgba(3,6,17,0.82)"},keyboard:{width:"100%"},
 panel:{padding:spacing.lg,borderRadius:radii.xl,borderWidth:1,borderColor:colors.panelBorderViolet,backgroundColor:colors.midnightNavy,gap:spacing.md},
 eyebrow:{color:colors.celestialCyan,fontFamily:typography.fontFamily.bodyMedium,fontSize:10,letterSpacing:1.5},title:{color:colors.paleStarlight,...textStyles.screenTitle},quest:{color:colors.paleStarlight,fontFamily:typography.fontFamily.bodyMedium,fontSize:15},
 helper:{color:colors.mutedSilver,fontSize:11,lineHeight:16},label:{color:colors.mutedSilver,fontSize:11},input:{minHeight:48,borderRadius:radii.md,borderWidth:1,borderColor:colors.panelBorder,backgroundColor:colors.panel,color:colors.paleStarlight,paddingHorizontal:spacing.md,fontSize:16},
 cancel:{alignItems:"center",padding:spacing.xs},cancelText:{color:colors.mutedSilver,fontSize:12},
});
