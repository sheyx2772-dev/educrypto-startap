import type { BuildingId } from "./types";
import { FIELDS } from "./fields";

const BASE = "/game/kripto-shahar";
const V2 = `${BASE}/v2`;

export const MASCOT_TARGET_PX = 64;

export const MASCOT_TEXTURES: Record<string, string> = {
  idle: `${BASE}/mascot-idle.png`,
  happy: `${BASE}/mascot-happy.png`,
  thinking: `${BASE}/mascot-thinking.png`,
  warning: `${BASE}/mascot-warning.png`,
};

export interface SpriteDef {
  key: string;
  path: string;
  heightMultiplier: number;
  yOffset?: number;
}

/** Har bir interaktiv bino — alohida sprite */
export const BUILDING_SPRITES: Record<BuildingId, SpriteDef> = {
  city_square: { key: "bld_school", path: `${V2}/school.png`, heightMultiplier: 2.4 },
  napp_office: { key: "bld_bank_orange", path: `${V2}/bank-orange.png`, heightMultiplier: 2.2 },
  marketplace: { key: "bld_shop_btc", path: `${V2}/shop-bitcoin.png`, heightMultiplier: 2.1 },
  trading_center: { key: "bld_shop_store", path: `${V2}/shop-store.png`, heightMultiplier: 2.0 },
  scam_detective: { key: "bld_shop_purple", path: `${V2}/shop-purple.png`, heightMultiplier: 2.0 },
  bitcoin_mine: { key: "bld_vault", path: `${V2}/vault.png`, heightMultiplier: 2.0 },
  ethereum_lab: { key: "bld_bank_dark", path: `${V2}/bank-dark.png`, heightMultiplier: 2.2 },
  defi_pool: { key: "bld_house", path: `${V2}/house.png`, heightMultiplier: 2.0 },
  guild_hall: { key: "bld_office", path: `${V2}/office.png`, heightMultiplier: 2.3 },
  secret_library: { key: "bld_bank_coins", path: `${V2}/bank-coins.png`, heightMultiplier: 1.9 },
};

/** Maydon ichidagi daraxtlar — faqat 4 ta */
export const TREE_PROPS: Array<SpriteDef & { x: number; y: number }> = [
  { key: "tree_green_a", path: `${V2}/tree-green.png`, x: 7, y: 5, heightMultiplier: 1.7 },
  { key: "tree_green_b", path: `${V2}/tree-green.png`, x: 18, y: 5, heightMultiplier: 1.6 },
  { key: "tree_gold_a", path: `${V2}/tree-gold.png`, x: 7, y: 11, heightMultiplier: 1.7 },
  { key: "tree_gold_b", path: `${V2}/tree-gold.png`, x: 18, y: 11, heightMultiplier: 1.6 },
];

export function getAllAssetPaths(): { key: string; path: string }[] {
  const list: { key: string; path: string }[] = [];
  const seen = new Set<string>();

  const add = (key: string, path: string) => {
    if (seen.has(key)) return;
    seen.add(key);
    list.push({ key, path });
  };

  FIELDS.forEach((f) => add(f.bgKey, f.bgPath));

  Object.values(MASCOT_TEXTURES).forEach((path, i) => {
    add(`mascot_${["idle", "happy", "thinking", "warning"][i]}`, path);
  });

  Object.values(BUILDING_SPRITES).forEach((s) => add(s.key, s.path));
  TREE_PROPS.forEach((t) => add(t.key, t.path));

  return list;
}

export function mascotTextureKey(avatarType: string): string {
  const map: Record<string, string> = {
    idle: "mascot_idle",
    happy: "mascot_happy",
    thinking: "mascot_thinking",
    warning: "mascot_warning",
    suit_m: "mascot_idle",
    suit_f: "mascot_happy",
    teen: "mascot_thinking",
    elder: "mascot_warning",
  };
  return map[avatarType] ?? "mascot_idle";
}

export function scaleToHeight(textureH: number, targetPx: number): number {
  if (textureH <= 0) return 0.2;
  return targetPx / textureH;
}
