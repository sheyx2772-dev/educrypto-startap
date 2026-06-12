import type { PathNode } from "@/lib/curriculum";
import type { PathNodeContent } from "@/lib/pathContent";
import { pathContentById } from "@/lib/pathContentData";
import { fullVideoCourses } from "@/lib/pathVideoFullContent";
import type { Locale } from "../config";
import { applyStringMap } from "./applyStrings";
import { pathOverlayEn } from "./path/overlays/en";
import { pathOverlayKk } from "./path/overlays/kk";
import { pathOverlayKy } from "./path/overlays/ky";
import { pathOverlayRu } from "./path/overlays/ru";
import { pathOverlayTg } from "./path/overlays/tg";
import { videoOverlayEn } from "./path/overlays/video-en";
import { videoOverlayKk } from "./path/overlays/video-kk";
import { videoOverlayKy } from "./path/overlays/video-ky";
import { videoOverlayRu } from "./path/overlays/video-ru";
import { videoOverlayTg } from "./path/overlays/video-tg";
import { fallbackOverlayEn, fallbackOverlayKk, fallbackOverlayKy, fallbackOverlayRu, fallbackOverlayTg } from "./path/overlays/fallback";

const pathOverlays: Record<Locale, Record<string, string>> = {
  uz: {},
  ru: pathOverlayRu,
  en: pathOverlayEn,
  kk: pathOverlayKk,
  ky: pathOverlayKy,
  tg: pathOverlayTg,
};

const videoOverlays: Record<Locale, Record<string, string>> = {
  uz: {},
  ru: videoOverlayRu,
  en: videoOverlayEn,
  kk: videoOverlayKk,
  ky: videoOverlayKy,
  tg: videoOverlayTg,
};

const fallbackOverlays: Record<Locale, Record<string, string>> = {
  uz: {},
  ru: fallbackOverlayRu,
  en: fallbackOverlayEn,
  kk: fallbackOverlayKk,
  ky: fallbackOverlayKy,
  tg: fallbackOverlayTg,
};

function localizeContent(content: PathNodeContent, locale: Locale, nodeId: string): PathNodeContent {
  if (locale === "uz") return content;
  let result = content;
  const pathMap = pathOverlays[locale];
  const nodePaths = Object.fromEntries(
    Object.entries(pathMap).filter(([k]) => k.startsWith(`${nodeId}.`))
  );
  if (Object.keys(nodePaths).length > 0) {
    result = applyStringMap(result, nodePaths);
  }
  if (result.videoSteps) {
    const vidPaths = Object.fromEntries(
      Object.entries(videoOverlays[locale]).filter(([k]) => k.startsWith(`${nodeId}.`))
    );
    if (Object.keys(vidPaths).length > 0) {
      result = { ...result, videoSteps: applyStringMap(result.videoSteps, vidPaths) };
    }
  }
  return result;
}

function fallbackContent(node: PathNode, locale: Locale): PathNodeContent {
  const uz: PathNodeContent = {
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
  };
  if (locale === "uz") return uz;
  return applyStringMap(uz, fallbackOverlays[locale]);
}

export function getLocalizedPathContent(node: PathNode, locale: Locale): PathNodeContent {
  if (node.type === "demo" && node.parentLessonId) {
    const parent = pathContentById[node.parentLessonId];
    const game = parent?.game ?? fallbackContent(node, locale).game;
    return { guide: [], quiz: [], game: localizeContent({ guide: [], quiz: [], game }, locale, node.parentLessonId).game };
  }

  const raw = pathContentById[node.id] ?? fallbackContent(node, locale);
  let content = { ...raw };
  if (!content.videoSteps && fullVideoCourses[node.id]) {
    content = { ...content, videoSteps: fullVideoCourses[node.id] };
  }
  return localizeContent(content, locale, node.id);
}
