import type { QuestDef, CityMilestone } from "./types";

export const DAILY_QUESTS: QuestDef[] = [
  { id: "visit_3", title: "3 ta binoga kir", reward: 30, target: 3, progressKey: "buildings_visited" },
  { id: "chat_5", title: "5 ta xabar yoz", reward: 20, target: 5, progressKey: "chat_sent" },
  { id: "minigame_1", title: "1 ta mini-o'yin o'yna", reward: 50, target: 1, progressKey: "minigames_played" },
  { id: "explore_center", title: "Shahar Maydoniga bor", reward: 15, target: 1, progressKey: "visited_city_square" },
];

export const CITY_MILESTONES: CityMilestone[] = [
  {
    id: "nft_gallery",
    name: "NFT Galereyasi",
    required: 500,
    current: 127,
    reward: "Yangi bino ochiladi",
  },
  {
    id: "trade_port",
    name: "Xalqaro Savdo Porti",
    required: 1000,
    current: 342,
    reward: "Trading zona kengayadi",
  },
  {
    id: "crypto_uni",
    name: "Kripto Universiteti",
    required: 100000,
    current: 12450,
    reward: "Guild maqsadi",
  },
];
