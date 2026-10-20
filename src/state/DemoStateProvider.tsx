import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import type { AdapterResult, DemoState, OnboardingInput, PlayerProfile, QuestDraft } from "@/types/demo";
import { archiveQuestInState, addQuestProgress, completeQuest, createQuestFromDraft, emptyDemoState, finishOnboarding, updateQuestInState } from "@/services/demoDataAdapter";
type Value = {
  state: DemoState; finishSetup: (input: OnboardingInput, keys: string[]) => void;
  createQuest: (draft: QuestDraft) => void; editQuest: (id: string, draft: QuestDraft) => void;
  archiveQuest: (id: string) => void; complete: (id: string) => AdapterResult; addProgress: (id: string, amount: number) => AdapterResult;
  updateProfile: (patch: Partial<PlayerProfile>) => void; resetDemo: () => void;
};
const Context = createContext<Value | null>(null);
export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(() => emptyDemoState());
  const current = useRef(state);
  const commit = useCallback((next: DemoState) => { current.current = next; setState(next); }, []);
  const finishSetup = useCallback((input: OnboardingInput, keys: string[]) => commit(finishOnboarding(current.current, input, keys)), [commit]);
  const createQuest = useCallback((draft: QuestDraft) => { const old=current.current; const quest=createQuestFromDraft(draft); commit({ ...old, quests:[...old.quests, quest] }); }, [commit]);
  const editQuest = useCallback((id: string, draft: QuestDraft) => commit(updateQuestInState(current.current, id, draft)), [commit]);
  const archiveQuest = useCallback((id: string) => commit(archiveQuestInState(current.current, id)), [commit]);
  const complete = useCallback((id: string) => { const result=completeQuest(current.current, id); commit(result.state); return result; }, [commit]);
  const addProgress = useCallback((id: string, amount: number) => { const result=addQuestProgress(current.current, id, amount); commit(result.state); return result; }, [commit]);
  const updateProfile = useCallback((patch: Partial<PlayerProfile>) => { const old=current.current; if (old.profile) commit({ ...old, profile:{ ...old.profile, ...patch } }); }, [commit]);
  const resetDemo = useCallback(() => commit(emptyDemoState()), [commit]);
  const value = useMemo(() => ({ state, finishSetup, createQuest, editQuest, archiveQuest, complete, addProgress, updateProfile, resetDemo }), [state, finishSetup, createQuest, editQuest, archiveQuest, complete, addProgress, updateProfile, resetDemo]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useDemoState() { const value=useContext(Context); if (!value) throw new Error("useDemoState must be used within DemoStateProvider"); return value; }
