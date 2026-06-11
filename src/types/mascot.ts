export type MascotState = "idle" | "happy" | "warning" | "thinking" | "talking";

export interface MascotMessage {
  state: MascotState;
  text: string;
}

export const mascotAssets: Record<MascotState, string> = {
  idle: "/assets/mascot/idle.png",
  happy: "/assets/mascot/happy.png",
  warning: "/assets/mascot/warning.png",
  thinking: "/assets/mascot/thinking.png",
  talking: "/assets/mascot/talking.png",
};

export const mascotMessages: Record<MascotState, string> = {
  idle: "Salom! Bugun nima o'rganamiz?",
  happy: "Ura! Siz stablecoin yutdingiz!",
  warning: "Ehtiyot bo'ling! Bu firibgar koin.",
  thinking: "Crypto qanday ishlaydi?",
  talking: "Hamyonlar ochiq kalit va shaxsiy kalit orqali ishlaydi.",
};

export const mascotLabels: Record<MascotState, string> = {
  idle: "TINCH",
  happy: "QUVONISH",
  warning: "OGOHLANTIRISH",
  thinking: "O'YLASH",
  talking: "GAPIRISH",
};
