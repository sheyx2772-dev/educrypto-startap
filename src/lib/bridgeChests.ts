/** Ko'prikdagi sovg'a sandiqlari — har bir bosqichga alohida PNG */
export const CHEST_BY_NODE: Record<string, string> = {
  p4g: "/game/bridge-chests/chest-p4g.png",
  p9: "/game/bridge-chests/chest-1.png",
  p15: "/game/bridge-chests/chest-2.png",
  p18: "/game/bridge-chests/chest-p18.png",
  p25: "/game/bridge-chests/chest-4.png",
  p29: "/game/bridge-chests/chest-5.png",
  p34: "/game/bridge-chests/chest-5.png",
};

export const BRIDGE_CHEST_SIZE = 120;
export const GAME_CHEST_SIZE = 150;

export function getChestImage(nodeId: string): string {
  return CHEST_BY_NODE[nodeId] ?? "/game/bridge-chests/chest-1.png";
}
