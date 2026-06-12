import type { PathNode } from "@/lib/curriculum";
import type { CertKey, CertLabels } from "@/lib/certificateHtml";
import type { Locale } from "./config";
import { localeToBcp47 } from "./config";
import type { Messages } from "./messages";

const SECTION_KEYS: Record<string, keyof Messages["sections"]> = {
  "Asosiy yo'l": "main",
  "Rivojlanish": "growth",
  "Iqtisodiyot": "economy",
  "AI va kelajak": "ai",
};

export function localizeSection(section: string, messages: Messages): string {
  const key = SECTION_KEYS[section];
  return key ? messages.sections[key] : section;
}

type NodeKey = keyof Messages["nodes"];

export function localizePathNode(node: PathNode, messages: Messages): PathNode {
  const baseId = node.parentLessonId ?? node.id.replace(/^pd-/, "");
  const nodeKey = (node.id === "p4g" ? "p4g" : baseId) as NodeKey;
  const nodeMsg = messages.nodes[nodeKey];

  let title = node.title;
  let description = node.description;

  if (nodeMsg) {
    title = nodeMsg.title;
    description = nodeMsg.desc;
  } else if (node.type === "demo") {
    const demoKey = baseId as keyof Messages["demos"];
    const demoName = messages.demos[demoKey];
    if (typeof demoName === "string") {
      title = `${demoName} ${messages.demos.gameSuffix}`;
    }
    const parentMsg = messages.nodes[baseId as NodeKey];
    if (parentMsg) {
      description = `${parentMsg.title}${messages.path.demoPractice}`;
    }
  } else if (node.type === "gift" && !nodeMsg) {
    title = messages.nodes.p9?.title ?? node.title;
  }

  return {
    ...node,
    title,
    description,
    section: localizeSection(node.section, messages),
  };
}

export function getLevelTitle(level: number, messages: Messages): string {
  const levels = messages.lessons.levels as Record<number, string>;
  return levels[level] ?? `${level}`;
}

export function getCertMetaFromMessages(messages: Messages) {
  return {
    beginner: {
      title: messages.cert.beginner,
      subtitle: messages.cert.beginnerSub,
      level: messages.cert.beginnerLevel,
      courseName: messages.cert.beginnerCourse,
    },
    advanced: {
      title: messages.cert.advanced,
      subtitle: messages.cert.advancedSub,
      level: messages.cert.advancedLevel,
      courseName: messages.cert.advancedCourse,
    },
    ai: {
      title: messages.cert.ai,
      subtitle: messages.cert.aiSub,
      level: messages.cert.aiLevel,
      courseName: messages.cert.aiCourse,
    },
  } as const;
}

export function getDefaultUsername(_locale: Locale, messages: Messages): string {
  return messages.common.defaultUsername;
}

export function buildCertLabels(certKey: CertKey, messages: Messages): CertLabels {
  const meta = getCertMetaFromMessages(messages)[certKey];
  const c = messages.cert;
  return {
    title: meta.title,
    level: meta.level,
    courseName: meta.courseName,
    platform: c.platform,
    tagline: c.tagline,
    declares: c.declares,
    ofCompletion: c.ofCompletion,
    courseText: c.courseText,
    director: c.director,
    eduHead: c.eduHead,
    seal: c.seal,
    qr: c.qr,
    awardDate: c.awardDate,
    sigRole: c.sigRole,
  };
}

export function getLocaleTag(locale: Locale): string {
  return localeToBcp47(locale);
}
