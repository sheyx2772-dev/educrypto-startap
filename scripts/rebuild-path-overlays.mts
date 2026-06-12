import fs from "node:fs/promises";
import path from "node:path";
import { pathContentById } from "../src/lib/pathContentData";
import { fullVideoCourses } from "../src/lib/pathVideoFullContent";

type Locale = "ru" | "en" | "kk" | "ky" | "tg";

const DEFAULT_LOCALES: Locale[] = ["ru", "en", "kk", "ky", "tg"];
const ROOT = path.resolve(process.cwd(), "src/i18n/content/path/overlays");

const localeNames: Record<Locale, string> = {
  ru: "Ru",
  en: "En",
  kk: "Kk",
  ky: "Ky",
  tg: "Tg",
};

const preserveTokens = ["[[NODE_TITLE]]", "[[NODE_DESC]]"] as const;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function addPathStrings(source: Record<string, string>, nodeId: string, content: any): void {
  content.guide?.forEach((section: any, i: number) => {
    source[`${nodeId}.guide.${i}.title`] = section.title;
    section.points?.forEach((point: string, j: number) => {
      source[`${nodeId}.guide.${i}.points.${j}`] = point;
    });
  });

  content.quiz?.forEach((q: any, i: number) => {
    source[`${nodeId}.quiz.${i}.question`] = q.question;
    q.options?.forEach((opt: string, j: number) => {
      source[`${nodeId}.quiz.${i}.options.${j}`] = opt;
    });
  });

  if (content.game?.title) {
    source[`${nodeId}.game.title`] = content.game.title;
  }
  content.game?.steps?.forEach((step: string, i: number) => {
    source[`${nodeId}.game.steps.${i}`] = step;
  });
  content.game?.pairs?.forEach((pair: any, i: number) => {
    source[`${nodeId}.game.pairs.${i}.term`] = pair.term;
    source[`${nodeId}.game.pairs.${i}.def`] = pair.def;
  });
  content.game?.statements?.forEach((s: any, i: number) => {
    source[`${nodeId}.game.statements.${i}.text`] = s.text;
  });
}

function addVideoStrings(source: Record<string, string>, nodeId: string, steps: any[]): void {
  steps.forEach((step, i) => {
    source[`${nodeId}.${i}.title`] = step.title;
    source[`${nodeId}.${i}.tip`] = step.tip;
    source[`${nodeId}.${i}.guide.title`] = step.guide.title;
    step.guide.points.forEach((point: string, j: number) => {
      source[`${nodeId}.${i}.guide.points.${j}`] = point;
    });
    step.quiz.forEach((q: any, qi: number) => {
      source[`${nodeId}.${i}.quiz.${qi}.question`] = q.question;
      q.options.forEach((opt: string, oi: number) => {
        source[`${nodeId}.${i}.quiz.${qi}.options.${oi}`] = opt;
      });
    });
  });
}

function buildFallbackUz(): Record<string, string> {
  return {
    "guide.0.title": "[[NODE_TITLE]] — kirish",
    "guide.0.points.0": "[[NODE_DESC]]",
    "guide.0.points.1": "Qisqa darsni o'qing.",
    "guide.0.points.2": "Keyingi bosqichga o'ting.",
    "guide.1.title": "Amaliyot",
    "guide.1.points.0": "Video darslikni ko'ring.",
    "guide.1.points.1": "NAPP qoidalariga rioya qiling.",
    "guide.2.title": "Xulosa",
    "guide.2.points.0": "Testni tugating.",
    "guide.2.points.1": "Keyingi demo taxtachada o'yinni bajaring.",
    "guide.2.points.2": "USDT mukofot oling.",
    "quiz.0.question": "\"[[NODE_TITLE]]\" mavzusi nima haqida?",
    "quiz.0.options.0": "[[NODE_DESC]]",
    "quiz.0.options.1": "Hech narsa",
    "quiz.0.options.2": "Faqat o'yin",
    "quiz.0.options.3": "Pul yo'qotish",
    "quiz.1.question": "Testdan o'tish uchun necha foiz kerak?",
    "quiz.1.options.0": "70%",
    "quiz.1.options.1": "30%",
    "quiz.1.options.2": "0%",
    "quiz.1.options.3": "100%",
    "quiz.2.question": "Keyingi qadam?",
    "quiz.2.options.0": "Vazifalarni bajarish",
    "quiz.2.options.1": "Kutish",
    "quiz.2.options.2": "O'tkazib yuborish",
    "quiz.2.options.3": "Hech narsa",
    "game.title": "[[NODE_TITLE]] — moslashtiring",
    "game.pairs.0.term": "Kripto",
    "game.pairs.0.def": "Raqamli aktiv",
    "game.pairs.1.term": "USDT",
    "game.pairs.1.def": "Stablecoin",
    "game.pairs.2.term": "NAPP",
    "game.pairs.2.def": "Regulyator",
  };
}

function protectTokens(value: string): string {
  let text = value;
  preserveTokens.forEach((token) => {
    text = text.replaceAll(token, `__${token.slice(2, -2)}__`);
  });
  return text;
}

function restoreTokens(value: string): string {
  let text = value;
  preserveTokens.forEach((token) => {
    text = text.replaceAll(`__${token.slice(2, -2)}__`, token);
  });
  return text;
}

async function translateOne(text: string, locale: Locale): Promise<string> {
  if (!text.trim()) return text;
  const protectedText = protectTokens(text);
  const url =
    "https://translate.googleapis.com/translate_a/single" +
    `?client=gtx&sl=uz&tl=${locale}&dt=t&q=${encodeURIComponent(protectedText)}`;

  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const payload = (await response.json()) as any[];
      const translated = (payload?.[0] ?? []).map((chunk: any[]) => chunk?.[0] ?? "").join("");
      return restoreTokens(translated || text);
    } catch (err) {
      if (attempt === 4) {
        throw err;
      }
      await sleep(250 * attempt);
    }
  }
  return text;
}

async function buildLocaleMap(source: Record<string, string>, locale: Locale): Promise<Record<string, string>> {
  const unique = [...new Set(Object.values(source))];
  const translatedBySource = new Map<string, string>();
  for (const [index, value] of unique.entries()) {
    const translated = await translateOne(value, locale);
    translatedBySource.set(value, translated);
    if ((index + 1) % 100 === 0) {
      console.log(`[${locale}] translated ${index + 1}/${unique.length}`);
    }
    await sleep(35);
  }
  const result: Record<string, string> = {};
  for (const key of Object.keys(source).sort()) {
    result[key] = translatedBySource.get(source[key]) ?? source[key];
  }
  return result;
}

function formatRecord(exportName: string, obj: Record<string, string>): string {
  const lines = Object.entries(obj).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`);
  return `export const ${exportName}: Record<string, string> = {\n${lines.join("\n")}\n};\n`;
}

async function writePathFiles(pathBase: Record<string, string>): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  for (const locale of TARGET_LOCALES) {
    const map = await buildLocaleMap(pathBase, locale);
    const exportName = `pathOverlay${localeNames[locale]}`;
    const file = path.join(ROOT, `${locale}.ts`);
    await fs.writeFile(file, formatRecord(exportName, map), "utf8");
    counts[path.basename(file)] = Object.keys(map).length;
  }
  return counts;
}

async function writeVideoFiles(videoBase: Record<string, string>): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  for (const locale of TARGET_LOCALES) {
    const map = await buildLocaleMap(videoBase, locale);
    const exportName = `videoOverlay${localeNames[locale]}`;
    const file = path.join(ROOT, `video-${locale}.ts`);
    await fs.writeFile(file, formatRecord(exportName, map), "utf8");
    counts[path.basename(file)] = Object.keys(map).length;
  }
  return counts;
}

async function writeFallbackFile(fallbackBase: Record<string, string>): Promise<Record<string, number>> {
  const parts: string[] = [];
  const counts: Record<string, number> = {};
  for (const locale of TARGET_LOCALES) {
    const map = await buildLocaleMap(fallbackBase, locale);
    const exportName = `fallbackOverlay${localeNames[locale]}`;
    parts.push(formatRecord(exportName, map));
    counts[`fallback.ts:${locale}`] = Object.keys(map).length;
  }
  await fs.writeFile(path.join(ROOT, "fallback.ts"), parts.join("\n"), "utf8");
  return counts;
}

async function main(): Promise<void> {
  const envLocales = process.env.LOCALES?.split(",").map((x) => x.trim()).filter(Boolean) as Locale[] | undefined;
  const locales = (envLocales?.length ? envLocales : DEFAULT_LOCALES).filter((l): l is Locale =>
    (["ru", "en", "kk", "ky", "tg"] as string[]).includes(l)
  );
  const includePath = process.env.INCLUDE_PATH !== "0";
  const includeVideo = process.env.INCLUDE_VIDEO !== "0";
  const includeFallback = process.env.INCLUDE_FALLBACK !== "0";

  const pathBase: Record<string, string> = {};
  const pathIds = Object.keys(pathContentById).filter((id) => /^p([1-9]|[12][0-9]|3[0-9]|4g)$/.test(id));
  pathIds.sort((a, b) => {
    const na = a === "p4g" ? 4.5 : Number(a.slice(1));
    const nb = b === "p4g" ? 4.5 : Number(b.slice(1));
    return na - nb;
  });
  for (const id of pathIds) {
    addPathStrings(pathBase, id, (pathContentById as Record<string, any>)[id]);
  }

  const videoBase: Record<string, string> = {};
  (["p1", "p2", "p4", "p10"] as const).forEach((id) => {
    addVideoStrings(videoBase, id, fullVideoCourses[id]);
  });

  const fallbackBase = buildFallbackUz();

  const targetBackup = [...TARGET_LOCALES];
  // @ts-expect-error runtime override for targeted regeneration
  TARGET_LOCALES.length = 0;
  // @ts-expect-error runtime override for targeted regeneration
  TARGET_LOCALES.push(...locales);

  const pathCounts = includePath ? await writePathFiles(pathBase) : {};
  const videoCounts = includeVideo ? await writeVideoFiles(videoBase) : {};
  const fallbackCounts = includeFallback ? await writeFallbackFile(fallbackBase) : {};

  // restore default for potential re-use in same process
  // @ts-expect-error runtime override for targeted regeneration
  TARGET_LOCALES.length = 0;
  // @ts-expect-error runtime override for targeted regeneration
  TARGET_LOCALES.push(...targetBackup);

  console.log("PATH_COUNTS", JSON.stringify(pathCounts, null, 2));
  console.log("VIDEO_COUNTS", JSON.stringify(videoCounts, null, 2));
  console.log("FALLBACK_COUNTS", JSON.stringify(fallbackCounts, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
