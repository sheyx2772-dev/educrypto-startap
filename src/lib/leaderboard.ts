export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  coins: number;
  lessonsPassed: number;
  xp: number;
  rank: number;
  isCurrentUser?: boolean;
}

export function calcXp(coins: number, lessonsPassed: number): number {
  return coins * 2 + lessonsPassed * 50;
}

export function getLeaderboard(currentCoins: number, currentPassed: number, username: string): LeaderboardUser[] {
  const currentXp = calcXp(currentCoins, currentPassed);
  const mock: Omit<LeaderboardUser, "rank" | "isCurrentUser">[] = [
    { id: "u1", name: "Jasur K.", avatar: "JK", coins: 420, lessonsPassed: 28, xp: 2240 },
    { id: "u2", name: "Dilnoza M.", avatar: "DM", coins: 380, lessonsPassed: 25, xp: 2010 },
    { id: "u3", name: "Bobur T.", avatar: "BT", coins: 310, lessonsPassed: 22, xp: 1720 },
    { id: "current", name: username || "Siz", avatar: "SZ", coins: currentCoins, lessonsPassed: currentPassed, xp: currentXp },
    { id: "u4", name: "Madina S.", avatar: "MS", coins: 250, lessonsPassed: 18, xp: 1400 },
    { id: "u5", name: "Otabek R.", avatar: "OR", coins: 180, lessonsPassed: 14, xp: 1060 },
    { id: "u6", name: "Nilufar A.", avatar: "NA", coins: 120, lessonsPassed: 10, xp: 740 },
    { id: "u7", name: "Sherzod H.", avatar: "SH", coins: 85, lessonsPassed: 7, xp: 520 },
  ];

  return mock
    .sort((a, b) => b.xp - a.xp)
    .map((u, i) => ({
      ...u,
      rank: i + 1,
      isCurrentUser: u.id === "current",
    }));
}
