import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { AdapterResult, DemoState, OnboardingInput, PlayerProfile, QuestDraft } from "@/types/demo";
import { openAscendiaDatabase, type AscendiaDatabase } from "@/database/database";
import { archiveQuest, addQuestProgress, completeQuest, correctCompletion, createQuest, editQuest, readDemoState, resetLocalDemo, saveOnboarding, updatePlayerProfile } from "@/database/ascendiaRepository";

export type DatabaseStatus = "loading" | "ready" | "error";
type Value = {
  state: DemoState; status: DatabaseStatus; errorMessage: string | null;
  retryInitialization: () => Promise<void>;
  finishSetup: (input: OnboardingInput, keys: string[]) => Promise<void>;
  createQuest: (draft: QuestDraft) => Promise<void>; editQuest: (id: string, draft: QuestDraft) => Promise<void>;
  archiveQuest: (id: string) => Promise<void>; complete: (id: string) => Promise<AdapterResult>;
  addProgress: (id: string, amount: number) => Promise<AdapterResult>;
  correct: (completionId: string, note?: string) => Promise<void>;
  updateProfile: (patch: Partial<PlayerProfile>) => Promise<void>; resetDemo: () => Promise<void>;
};
const emptyState = (): DemoState => ({ profile: null, quests: [], rewardLedger: [], history: [], achievements: [] });
const Context = createContext<Value | null>(null);

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(emptyState);
  const [status, setStatus] = useState<DatabaseStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const databaseRef = useRef<AscendiaDatabase | null>(null);
  const mounted = useRef(true);

  const retryInitialization = useCallback(async () => {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const database = await openAscendiaDatabase();
      databaseRef.current = database;
      const snapshot = await readDemoState(database);
      if (mounted.current) { setState(snapshot); setStatus("ready"); }
    } catch (error) {
      if (mounted.current) {
        setErrorMessage(error instanceof Error ? error.message : "The local database could not be opened.");
        setStatus("error");
      }
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    void retryInitialization();
    return () => { mounted.current = false; };
  }, [retryInitialization]);

  const refreshSnapshot = useCallback(async () => {
    const database = databaseRef.current;
    if (!database) throw new Error("Local storage is not ready. Retry initialization before saving.");
    const snapshot = await readDemoState(database);
    if (mounted.current) setState(snapshot);
    return snapshot;
  }, []);

  const writeQueue = useRef<Promise<unknown>>(Promise.resolve());
  const runWrite = useCallback(async <T,>(operation: (database: AscendiaDatabase) => Promise<T>): Promise<T> => {
    const perform = async () => {
      const database = databaseRef.current;
      if (status !== "ready" || !database) throw new Error("Local storage is not ready. Retry initialization before saving.");
      const result = await operation(database);
      try {
        await refreshSnapshot();
      } catch {
        // The transaction committed. Report a reload problem, not a failed write.
        if (mounted.current) {
          setErrorMessage("A local change was committed, but the updated state could not be reloaded. Retry to verify saved progress.");
          setStatus("error");
        }
      }
      return result;
    };
    const task = writeQueue.current.then(perform, perform);
    writeQueue.current = task.then(() => undefined, () => undefined);
    return task;
  }, [refreshSnapshot, status]);

  const finishSetup = useCallback((input: OnboardingInput, keys: string[]) => runWrite((database) => saveOnboarding(database, input, keys)), [runWrite]);
  const create = useCallback((draft: QuestDraft) => runWrite((database) => createQuest(database, draft)), [runWrite]);
  const edit = useCallback((id: string, draft: QuestDraft) => runWrite((database) => editQuest(database, id, draft)), [runWrite]);
  const archive = useCallback((id: string) => runWrite((database) => archiveQuest(database, id)), [runWrite]);
  const complete = useCallback((id: string) => runWrite((database) => completeQuest(database, id)), [runWrite]);
  const addProgress = useCallback((id: string, amount: number) => runWrite((database) => addQuestProgress(database, id, amount)), [runWrite]);
  const correct = useCallback((completionId: string, note?: string) => runWrite((database) => correctCompletion(database, completionId, note)), [runWrite]);
  const updateProfile = useCallback((patch: Partial<PlayerProfile>) => runWrite((database) => updatePlayerProfile(database, patch)), [runWrite]);
  const resetDemo = useCallback(async () => {
    await runWrite(async (database) => resetLocalDemo(database));
    if (mounted.current) setState(emptyState());
  }, [runWrite]);

  const value = useMemo(() => ({
    state, status, errorMessage, retryInitialization, finishSetup, createQuest: create,
    editQuest: edit, archiveQuest: archive, complete, addProgress, correct, updateProfile, resetDemo,
  }), [state, status, errorMessage, retryInitialization, finishSetup, create, edit, archive, complete, addProgress, correct, updateProfile, resetDemo]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useDemoState() {
  const value = useContext(Context);
  if (!value) throw new Error("useDemoState must be used within DemoStateProvider");
  return value;
}
