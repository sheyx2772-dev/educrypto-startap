import { create } from "zustand";
import type { AvatarType, BuildingId, ChatMessage, FieldId, GamePhase, PlayerState } from "./types";
import { getLessonForBuilding } from "./interior-lessons";
import {
  canEnterBuilding,
  loadPlayerState,
  savePlayerState,
  setSelectedField,
  visitBuilding,
  completeCourse,
  addXp,
} from "./storage";
import { DAILY_QUESTS } from "./quests";

interface KriptoShaharStore {
  phase: GamePhase;
  player: PlayerState;
  nearBuilding: BuildingId | null;
  activeInterior: BuildingId | null;
  enterBlockedReason: string | null;
  chatMessages: ChatMessage[];
  mockPlayers: never[];
  onlineCount: number;
  questProgress: Record<string, number>;
  showEnterPrompt: boolean;
  pathCompleteFired: boolean;

  setPhase: (phase: GamePhase) => void;
  initPlayer: (username?: string) => void;
  setAvatar: (type: AvatarType) => void;
  setField: (field: FieldId) => void;
  selectedField: FieldId;
  updatePlayerPosition: (x: number, y: number) => void;
  setNearBuilding: (id: BuildingId | null) => void;
  tryEnterBuilding: () => void;
  completeInteriorLesson: (buildingId: BuildingId) => { bits: number; xp: number; leveledUp: boolean };
  exitInterior: () => void;
  sendChat: (message: string) => void;
  addBits: (amount: number) => void;
  spendBits: (amount: number) => boolean;
  incrementQuest: (key: string) => void;
  tickNpcs: () => void;
  markPathComplete: () => void;
}

export const useKriptoShaharStore = create<KriptoShaharStore>((set, get) => ({
  phase: "intro",
  player: loadPlayerState(),
  selectedField: loadPlayerState().selectedField ?? "pixel_park",
  nearBuilding: null,
  activeInterior: null,
  enterBlockedReason: null,
  chatMessages: [
    {
      id: "welcome",
      username: "Tizim",
      message: "Kripto Shaharga xush kelibsiz! Shlyapani bosib suring, bino yonida kirish.",
      zone: "global",
      timestamp: Date.now(),
    },
  ],
  mockPlayers: [],
  onlineCount: 1,
  questProgress: {},
  showEnterPrompt: false,
  pathCompleteFired: false,

  setPhase: (phase) => set({ phase }),

  initPlayer: (username) => {
    const player = loadPlayerState();
    if (username) savePlayerState({ username });
    set({ player: { ...player, username: username ?? player.username } });
  },

  setAvatar: (type) => {
    savePlayerState({ avatarType: type });
    set((s) => ({ player: { ...s.player, avatarType: type } }));
  },

  setField: (field) => {
    setSelectedField(field);
    set((s) => ({ selectedField: field, player: { ...s.player, selectedField: field } }));
  },

  updatePlayerPosition: (x, y) => {
    set((s) => ({ player: { ...s.player, x, y } }));
    savePlayerState({ x, y });
  },

  setNearBuilding: (id) => {
    set({ nearBuilding: id, showEnterPrompt: !!id, enterBlockedReason: null });
  },

  tryEnterBuilding: () => {
    const { nearBuilding, player } = get();
    if (!nearBuilding) return;
    const check = canEnterBuilding(nearBuilding, player);
    if (!check.allowed) {
      set({ enterBlockedReason: check.reason ?? "Kirish mumkin emas" });
      return;
    }
    visitBuilding(nearBuilding);
    const visited = player.visitedBuildings.includes(nearBuilding)
      ? player.visitedBuildings
      : [...player.visitedBuildings, nearBuilding];
    set({
      activeInterior: nearBuilding,
      phase: "interior",
      enterBlockedReason: null,
      player: { ...player, visitedBuildings: visited },
    });
    get().incrementQuest("buildings_visited");
    if (nearBuilding === "city_square") get().incrementQuest("visited_city_square");
  },

  completeInteriorLesson: (buildingId) => {
    const lesson = getLessonForBuilding(buildingId);
    if (!lesson) return { bits: 0, xp: 0, leveledUp: false };

    get().addBits(lesson.bitReward);
    const { leveledUp } = addXp(lesson.xpReward);
    if (lesson.courseKey) completeCourse(lesson.courseKey);

    get().incrementQuest("minigames_played");

    const fresh = loadPlayerState();
    set({ player: { ...get().player, ...fresh } });

    return { bits: lesson.bitReward, xp: lesson.xpReward, leveledUp };
  },

  exitInterior: () => {
    set({ activeInterior: null, phase: "world", enterBlockedReason: null });
    get().incrementQuest("minigames_played");
  },

  sendChat: (message) => {
    const trimmed = message.trim();
    if (!trimmed) return;
    const { player, chatMessages } = get();
    const msg: ChatMessage = {
      id: `chat_${Date.now()}`,
      username: player.username,
      message: trimmed,
      zone: "city_square",
      timestamp: Date.now(),
    };
    set({ chatMessages: [...chatMessages.slice(-49), msg] });
    get().incrementQuest("chat_sent");
  },

  addBits: (amount) => {
    const bits = get().player.bits + amount;
    savePlayerState({ bits });
    set((s) => ({ player: { ...s.player, bits } }));
  },

  spendBits: (amount) => {
    const { bits } = get().player;
    if (bits < amount) return false;
    const next = bits - amount;
    savePlayerState({ bits: next });
    set((s) => ({ player: { ...s.player, bits: next } }));
    return true;
  },

  incrementQuest: (key) => {
    const progress = { ...get().questProgress };
    progress[key] = (progress[key] ?? 0) + 1;
    set({ questProgress: progress });
  },

  tickNpcs: () => {},

  markPathComplete: () => set({ pathCompleteFired: true }),
}));

export function getQuestDisplay() {
  const progress = useKriptoShaharStore.getState().questProgress;
  return DAILY_QUESTS.map((q) => ({
    ...q,
    current: progress[q.progressKey] ?? 0,
    done: (progress[q.progressKey] ?? 0) >= q.target,
  }));
}
