export const colors = {
  primary: "#FFD700",
  secondary: "#2C3E50",
  accent: "#48C9A3",
  background: "#FFFDF5",
  warning: "#E74C3C",
  white: "#FFFFFF",
} as const;

export const typography = {
  h1: { size: "2.25rem", weight: 700 },
  h2: { size: "1.75rem", weight: 600 },
  body: { size: "1rem", weight: 500 },
  caption: { size: "0.75rem", weight: 400 },
} as const;

export const onboardingSteps = [
  { id: 1, label: "Ro'yxatdan o'tish", icon: "user" },
  { id: 2, label: "KYC", icon: "id" },
  { id: 3, label: "Video darslik", icon: "video" },
  { id: 4, label: "Mikro-vazifalar", icon: "tasks" },
  { id: 5, label: "Sovg'alar", icon: "gift" },
] as const;
