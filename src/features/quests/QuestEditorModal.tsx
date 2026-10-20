import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import type { AttributeCode, Quest, QuestDifficulty, QuestDraft, QuestType } from "@/types/demo";
import { ATTRIBUTE_LABELS, DIFFICULTY_XP } from "@/services/demoFixtures";
import { GradientActionButton } from "@/components/visual/GradientActionButton";
import { colors, radii, spacing, textStyles, typography } from "@/theme";

const questTypes: QuestType[] = ["Daily", "Weekly", "One-Time", "Milestone"];
const difficulties: QuestDifficulty[] = ["Very Easy", "Easy", "Normal", "Hard", "Epic", "Legendary"];
const attributes: AttributeCode[] = ["STR", "END", "INT", "DIS", "VIT", "WIS"];
type Props = { visible: boolean; initialQuest?: Quest; onClose: () => void; onSave: (draft: QuestDraft) => Promise<void> | void };
const emptyDraft = (): QuestDraft => ({ title: "", description: "", type: "Daily", difficulty: "Normal", primaryAttribute: "DIS", secondaryAttributes: ["WIS"], weekdays: [1,2,3,4,5], target: null, unit: null, deadlineLocalDate: null });

export function QuestEditorModal({ visible, initialQuest, onClose, onSave }: Props) {
  const [draft, setDraft] = useState<QuestDraft>(emptyDraft);
  const [targetText, setTargetText] = useState("");
  const [unitText, setUnitText] = useState("sessions");
  const [deadlineText, setDeadlineText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setSaving(false);
    if (initialQuest) {
      setDraft({ title: initialQuest.title, description: initialQuest.description, type: initialQuest.type, difficulty: initialQuest.difficulty, primaryAttribute: initialQuest.primaryAttribute, secondaryAttributes: initialQuest.secondaryAttributes, weekdays: initialQuest.weekdays, target: initialQuest.target, unit: initialQuest.unit, deadlineLocalDate: initialQuest.deadlineLocalDate ?? null });
      setTargetText(initialQuest.target === null ? "" : String(initialQuest.target));
      setUnitText(initialQuest.unit ?? "sessions");
      setDeadlineText(initialQuest.deadlineLocalDate ?? "");
    } else {
      setDraft(emptyDraft()); setTargetText(""); setUnitText("sessions"); setDeadlineText("");
    }
  }, [visible, initialQuest]);

  const update = (patch: Partial<QuestDraft>) => setDraft((current) => ({ ...current, ...patch }));
  const toggleSecondary = (code: AttributeCode) => {
    if (code === draft.primaryAttribute) return;
    if (draft.secondaryAttributes.includes(code)) update({ secondaryAttributes: draft.secondaryAttributes.filter((value) => value !== code) });
    else if (draft.secondaryAttributes.length < 2) update({ secondaryAttributes: [...draft.secondaryAttributes, code] });
    else Alert.alert("Two secondary attributes maximum", "Choose up to two secondary attributes.");
  };
  async function save() {
    if (saving) return;
    if (draft.title.trim().length < 2) { Alert.alert("Quest title required", "Give this quest a short, clear name."); return; }
    const measured = draft.type === "Weekly" || draft.type === "Milestone";
    const target = measured ? Number(targetText) : null;
    if (measured && (!Number.isFinite(target) || (target ?? 0) <= 0 || !unitText.trim())) { Alert.alert("Target required", "Enter a positive measurable target and a unit."); return; }
    if (draft.type === "Daily" && draft.weekdays.length === 0) { Alert.alert("Choose scheduled days", "Select at least one day for this daily quest."); return; }
    if (draft.type === "One-Time" && deadlineText.trim() && !/^\d{4}-\d{2}-\d{2}$/.test(deadlineText.trim())) { Alert.alert("Deadline format", "Use YYYY-MM-DD for the optional deadline."); return; }
    setSaving(true);
    try {
      await onSave({ ...draft, target, unit: measured ? unitText.trim() : null, deadlineLocalDate: draft.type === "One-Time" ? deadlineText.trim() || null : null, weekdays: draft.type === "Daily" ? draft.weekdays : [] });
    } catch (error) {
      Alert.alert("Quest not saved", error instanceof Error ? error.message : "The local save failed. No success was recorded.");
    } finally { setSaving(false); }
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={() => { if (!saving) onClose(); }}>
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.header}><View><Text style={styles.eyebrow}>{initialQuest ? "QUEST REVISION" : "NEW QUEST"}</Text><Text style={styles.title}>{initialQuest ? "Edit quest" : "Create a quest"}</Text></View><Pressable disabled={saving} accessibilityRole="button" accessibilityLabel="Close quest editor" onPress={onClose} style={styles.close}><Text style={styles.closeText}>×</Text></Pressable></View>
        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>Quest title</Text><TextInput value={draft.title} onChangeText={(value) => update({ title: value })} placeholder="e.g. Read for 30 Minutes" placeholderTextColor={colors.textDisabled} maxLength={80} style={styles.input} />
          <Text style={styles.label}>Description (optional)</Text><TextInput value={draft.description} onChangeText={(value) => update({ description: value })} placeholder="What does completing this look like?" placeholderTextColor={colors.textDisabled} multiline maxLength={240} style={[styles.input, styles.multiline]} />
          <Text style={styles.label}>Quest type</Text><View style={styles.chips}>{questTypes.map((type) => <Chip key={type} label={type} selected={draft.type === type} onPress={() => update({ type })} />)}</View>
          {draft.type === "Daily" ? <>
            <Text style={styles.label}>Scheduled weekdays</Text>
            <View style={styles.chips}>{([["Mon",1],["Tue",2],["Wed",3],["Thu",4],["Fri",5],["Sat",6],["Sun",0]] as const).map(([label, day]) => <Chip key={String(day)} label={label} selected={draft.weekdays.includes(day)} onPress={() => update({ weekdays: draft.weekdays.includes(day) ? draft.weekdays.filter((value) => value !== day) : [...draft.weekdays, day] })} />)}</View>
          </> : null}
          {draft.type === "One-Time" ? <>
            <Text style={styles.label}>Optional deadline</Text><TextInput value={deadlineText} onChangeText={setDeadlineText} placeholder="YYYY-MM-DD" placeholderTextColor={colors.textDisabled} autoCapitalize="none" style={styles.input} /><Text style={styles.helper}>An overdue one-time quest can still be completed for its full configured reward.</Text>
          </> : null}
          {measuredType(draft.type) ? <>
            <Text style={styles.label}>{draft.type === "Weekly" ? "Weekly target" : "Lifetime milestone target"}</Text>
            <View style={styles.targetRow}><TextInput value={targetText} onChangeText={setTargetText} keyboardType="decimal-pad" placeholder="e.g. 5" placeholderTextColor={colors.textDisabled} style={[styles.input, styles.targetInput]} /><TextInput value={unitText} onChangeText={setUnitText} placeholder="sessions" placeholderTextColor={colors.textDisabled} style={[styles.input, styles.unitInput]} /></View>
          </> : null}
          <Text style={styles.label}>Difficulty and XP</Text><View style={styles.chips}>{difficulties.map((difficulty) => <Chip key={difficulty} label={difficulty} selected={draft.difficulty === difficulty} onPress={() => update({ difficulty })} />)}</View>
          <Text style={styles.reward}>Base reward: +{DIFFICULTY_XP[draft.difficulty]} XP on valid completion. Penalties, if active, use the central reward service.</Text>
          <Text style={styles.label}>Primary attribute</Text><View style={styles.chips}>{attributes.map((code) => <Chip key={code} label={code} selected={draft.primaryAttribute === code} onPress={() => update({ primaryAttribute: code, secondaryAttributes: draft.secondaryAttributes.filter((value) => value !== code) })} />)}</View>
          <Text style={styles.label}>Secondary attributes (up to 2)</Text><View style={styles.chips}>{attributes.filter((code) => code !== draft.primaryAttribute).map((code) => <Chip key={code} label={code} selected={draft.secondaryAttributes.includes(code)} onPress={() => toggleSecondary(code)} />)}</View>
          <Text style={styles.helper}>Primary: {ATTRIBUTE_LABELS[draft.primaryAttribute]}. Secondary attributes receive half of the actual awarded XP, rounded half-up.</Text>
        </ScrollView>
        <View style={styles.footer}><GradientActionButton label={initialQuest ? "Save quest changes" : "Add quest"} onPress={() => { void save(); }} loading={saving} loadingLabel="Saving quest..." disabled={saving} /><Pressable disabled={saving} accessibilityRole="button" onPress={onClose} style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable></View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
function measuredType(type: QuestType) { return type === "Weekly" || type === "Milestone"; }
function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) { return <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}><Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text></Pressable>; }
const styles = StyleSheet.create({
  root:{flex:1,backgroundColor:colors.midnightNavy,paddingTop:28},header:{paddingHorizontal:spacing.screenGutter,paddingBottom:spacing.md,borderBottomWidth:1,borderBottomColor:colors.divider,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  eyebrow:{color:colors.celestialCyan,fontSize:10,letterSpacing:1.4,fontFamily:typography.fontFamily.bodyMedium},title:{color:colors.paleStarlight,...textStyles.screenTitle},close:{width:42,height:42,borderRadius:21,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:colors.panelBorder},closeText:{color:colors.paleStarlight,fontSize:26,lineHeight:28},
  form:{padding:spacing.screenGutter,gap:spacing.sm,paddingBottom:spacing.xxl},label:{color:colors.paleStarlight,fontSize:12,fontFamily:typography.fontFamily.bodyMedium,marginTop:spacing.sm},
  input:{color:colors.paleStarlight,backgroundColor:colors.panel,borderWidth:1,borderColor:colors.panelBorder,borderRadius:radii.md,minHeight:46,paddingHorizontal:spacing.md,fontSize:14},multiline:{minHeight:84,paddingTop:spacing.md,textAlignVertical:"top"},
  chips:{flexDirection:"row",flexWrap:"wrap",gap:spacing.xs},chip:{borderRadius:radii.pill,borderWidth:1,borderColor:colors.divider,paddingHorizontal:spacing.md,paddingVertical:spacing.sm,backgroundColor:"rgba(8,13,32,0.65)"},chipSelected:{borderColor:colors.celestialCyan,backgroundColor:"rgba(66,139,255,0.2)"},
  chipText:{color:colors.mutedSilver,fontSize:11},chipTextSelected:{color:colors.paleStarlight,fontFamily:typography.fontFamily.bodyMedium},targetRow:{flexDirection:"row",gap:spacing.sm},targetInput:{flex:1},unitInput:{flex:2},
  reward:{color:colors.celestialCyan,fontSize:11,lineHeight:16},helper:{color:colors.mutedSilver,fontSize:11,lineHeight:16},footer:{paddingHorizontal:spacing.screenGutter,paddingTop:spacing.md,paddingBottom:spacing.lg,borderTopWidth:1,borderTopColor:colors.divider,gap:spacing.sm},
  cancel:{alignItems:"center",padding:spacing.xs},cancelText:{color:colors.mutedSilver,fontSize:12},
});
