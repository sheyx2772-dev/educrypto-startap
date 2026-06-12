import type { PathNode } from "./curriculum";
import { pathContentById } from "./pathContentData";
import { fullVideoCourses } from "./pathVideoFullContent";

export interface PathGuide {
  title: string;
  points: string[];
}

export interface PathQuizQ {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface EnrichedVideoStep {
  step: number;
  title: string;
  videoId: string;
  tip: string;
  guide: PathGuide;
  quiz: [PathQuizQ, PathQuizQ, PathQuizQ];
}

export type InteractiveLabId =
  | "blockchain"
  | "myth"
  | "mining"
  | "wallet"
  | "payment"
  | "ai"
  | "tanga"
  | "asset"
  | "kripto-shahar"
  | "kripto-sayohat"
  | "kripto-koinot"
  | "kripto-sotib-ol";

export interface PathGame {
  type: "match" | "order" | "tap" | "truefalse" | "chest" | "interactive";
  title: string;
  interactiveId?: InteractiveLabId;
  pairs?: { term: string; def: string }[];
  steps?: string[];
  statements?: { text: string; correct: boolean }[];
}

export interface PathNodeContent {
  guide: PathGuide[];
  quiz: PathQuizQ[];
  game: PathGame;
  /** 6 bosqichli video kurs — har video: qo'llanma + 3 test */
  videoSteps?: EnrichedVideoStep[];
}

const fallbackContent = (node: PathNode): PathNodeContent => ({
  guide: [
    { title: `${node.title} — kirish`, points: [node.description, "Qisqa darsni o'qing.", "Keyingi bosqichga o'ting."] },
    { title: "Amaliyot", points: ["Video darslikni ko'ring.", "NAPP qoidalariga rioya qiling."] },
    { title: "Xulosa", points: ["Testni tugating.", "Keyingi demo taxtachada o'yinni bajaring.", "USDT mukofot oling."] },
  ],
  quiz: [
    { question: `"${node.title}" mavzusi nima haqida?`, options: [node.description, "Hech narsa", "Faqat o'yin", "Pul yo'qotish"], correctIndex: 0 },
    { question: "Testdan o'tish uchun necha foiz kerak?", options: ["70%", "30%", "0%", "100%"], correctIndex: 0 },
    { question: "Keyingi qadam?", options: ["Vazifalarni bajarish", "Kutish", "O'tkazib yuborish", "Hech narsa"], correctIndex: 0 },
  ],
  game: {
    type: "match",
    title: `${node.title} — moslashtiring`,
    pairs: [
      { term: "Kripto", def: "Raqamli aktiv" },
      { term: "USDT", def: "Stablecoin" },
      { term: "NAPP", def: "Regulyator" },
    ],
  },
});

export function getPathContent(node: PathNode): PathNodeContent {
  if (node.type === "demo" && node.parentLessonId) {
    const parent = pathContentById[node.parentLessonId];
    const game = parent?.game ?? fallbackContent(node).game;
    return { guide: [], quiz: [], game };
  }

  const content = pathContentById[node.id] ?? fallbackContent(node);
  if (!content.videoSteps && fullVideoCourses[node.id]) {
    return { ...content, videoSteps: fullVideoCourses[node.id] };
  }
  return content;
}
