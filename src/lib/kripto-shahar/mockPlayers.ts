import type { AvatarType, MockPlayer } from "./types";
import { FIELD_BOUNDS } from "./buildings";

const NAMES = [
  "Ali_K", "Malika_T", "Jasur_99", "Dilnoza", "Bobur_UZ",
  "Kamola_B", "Rustam_C", "Nilufar", "Sardor_X", "Madina_7",
];

const AVATARS: AvatarType[] = ["idle", "happy", "thinking", "warning"];

function randInField() {
  const x = FIELD_BOUNDS.minX + Math.random() * (FIELD_BOUNDS.maxX - FIELD_BOUNDS.minX);
  const y = FIELD_BOUNDS.minY + Math.random() * (FIELD_BOUNDS.maxY - FIELD_BOUNDS.minY);
  return { x, y };
}

export function createMockPlayers(count = 4): MockPlayer[] {
  return Array.from({ length: count }, (_, i) => {
    const { x, y } = randInField();
    return {
      id: `npc_${i}`,
      username: NAMES[i % NAMES.length],
      avatarType: AVATARS[i % AVATARS.length],
      x,
      y,
      targetX: x,
      targetY: y,
      zone: "city_square",
    };
  });
}

export function tickMockPlayers(players: MockPlayer[]): MockPlayer[] {
  return players.map((p) => {
    const dx = p.targetX - p.x;
    const dy = p.targetY - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 16) {
      const t = randInField();
      return { ...p, targetX: t.x, targetY: t.y };
    }
    const speed = 1.2;
    return {
      ...p,
      x: p.x + (dx / dist) * speed,
      y: p.y + (dy / dist) * speed,
    };
  });
}
