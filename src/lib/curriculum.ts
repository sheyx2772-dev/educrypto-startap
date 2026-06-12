export type PathNodeType = "intro" | "lesson" | "gift" | "certificate" | "demo";

export interface PathNode {
  id: string;
  order: number;
  title: string;
  type: PathNodeType;
  section: string;
  description: string;
  reward: number;
  lessonId?: string;
  certificateKey?: "beginner" | "advanced" | "ai";
  /** Demo taxtacha — qaysi darsdan keyin */
  parentLessonId?: string;
}

/** Demo taxtacha qo'yilmaydigan darslar (faqat o'quv bosqichi) */
const SKIP_DEMO_PLANKS = new Set([
  "p4g", // xazina mukofot sandig'i
  "p9",  // mukofot sandig'i
  "p11", // boshlang'ich sertifikat o'yini
  "p15", // mukofot sandig'i
  "p18", // mukofot sandig'i
  "p25", // mukofot sandig'i
  "p26", // moliyaviy innovatsiyalar I o'yini
  "p28", // soliq II o'yini
  "p29", // mukofot sandig'i
  "p30", // moliyaviy innovatsiyalar II o'yini
  "p34", // mukofot sandig'i
  "p37", // AI foydalari demo
  "p39", // AI sertifikat o'yini
]);

const INTERACTIVE_DEMO_TITLES: Record<string, string> = {
  p1: "Kripto-Sotib Ol",
  p2: "Kripto-Sayohat",
  p3: "Tanga Top",
  p5: "Blokchain Zanjiri",
  p6: "Scam Dedektivi",
  p7: "Mayning demo",
  p8: "Hamyon demo",
  p10: "Kripto-Koinot",
  p12: "Kripto Shahar",
  p13: "Miflar II demo",
  p16: "Yangi aktiv demo",
  p17: "To'lovlar demo",
  p20: "Global to'lovlar demo",
  p32: "AI + Kripto demo",
  p33: "AI asboblari demo",
  p35: "Mashina+Inson demo",
  p38: "PoW + AI demo",
};

function demoPlankTitle(node: Omit<PathNode, "order">): string {
  if (node.type === "gift") return "Mukofot sandig'i";
  const named = INTERACTIVE_DEMO_TITLES[node.id];
  if (named) return named;
  return `${node.title} o'yini`;
}

/** Asosiy 39 ta o'quv taxtachasi */
const basePathNodes: Omit<PathNode, "order">[] = [
  { id: "p1", title: "O'quv xaritasi", type: "intro", section: "Asosiy yo'l", description: "Crypto o'rganish yo'lingizni boshlang.", reward: 5, lessonId: "44" },
  { id: "p2", title: "Pul", type: "lesson", section: "Asosiy yo'l", description: "Pulning tarixi va vazifasi.", reward: 8, lessonId: "4" },
  { id: "p3", title: "Tanga", type: "lesson", section: "Asosiy yo'l", description: "Raqamli tangalar tushunchasi.", reward: 8, lessonId: "52" },
  { id: "p4", title: "Xazina", type: "lesson", section: "Asosiy yo'l", description: "Qiymat saqlash va xazina.", reward: 10, lessonId: "5" },
  { id: "p5", title: "Blokcheyn", type: "lesson", section: "Asosiy yo'l", description: "Blokcheyn qanday ishlaydi.", reward: 10, lessonId: "51" },
  { id: "p6", title: "Miflar I", type: "lesson", section: "Asosiy yo'l", description: "Kripto haqidagi noto'g'ri tushunchalar.", reward: 8 },
  { id: "p7", title: "Mayning", type: "lesson", section: "Asosiy yo'l", description: "Mining jarayoni va ahamiyati.", reward: 10, lessonId: "8" },
  { id: "p8", title: "Hamyonlar", type: "lesson", section: "Asosiy yo'l", description: "Crypto hamyon turlari va xavfsizlik.", reward: 10, lessonId: "2" },
  { id: "p9", title: "Sovg'a", type: "gift", section: "Asosiy yo'l", description: "Mukofot sandig'i!", reward: 15 },
  { id: "p10", title: "Cheklovlar", type: "lesson", section: "Asosiy yo'l", description: "Risk cheklovlari va qoidalar.", reward: 8, lessonId: "1" },
  { id: "p11", title: "Boshlang'ich sertifikat", type: "certificate", section: "Asosiy yo'l", description: "NAPP boshlang'ich daraja sertifikati.", reward: 25, certificateKey: "beginner" },

  { id: "p12", title: "Texnologiya investori", type: "lesson", section: "Rivojlanish", description: "Texnologiyaga investitsiya qilish.", reward: 12, lessonId: "13" },
  { id: "p13", title: "Miflar II", type: "lesson", section: "Rivojlanish", description: "Murakkab miflar va haqiqatlar.", reward: 10 },
  { id: "p14", title: "Laytning", type: "lesson", section: "Rivojlanish", description: "Bitcoin Lightning tarmog'i.", reward: 12 },
  { id: "p15", title: "Sovg'a", type: "gift", section: "Rivojlanish", description: "Rivojlanish mukofoti!", reward: 20 },
  { id: "p16", title: "Yangi aktiv I", type: "lesson", section: "Rivojlanish", description: "Yangi kripto aktivlar bilan tanishuv.", reward: 12, lessonId: "66" },
  { id: "p17", title: "Buzuvchi to'lovlar I", type: "lesson", section: "Rivojlanish", description: "Zamonaviy to'lov tizimlari.", reward: 12, lessonId: "69" },
  { id: "p18", title: "Sovg'a", type: "gift", section: "Rivojlanish", description: "To'lovlar mukofoti!", reward: 20 },
  { id: "p19", title: "Yangi aktiv II", type: "lesson", section: "Rivojlanish", description: "DeFi va yangi tokenlar.", reward: 12, lessonId: "73" },
  { id: "p20", title: "Buzuvchi to'lovlar II", type: "lesson", section: "Rivojlanish", description: "Global to'lov inqilobi.", reward: 12 },
  { id: "p21", title: "Ilg'or sertifikat", type: "certificate", section: "Rivojlanish", description: "NAPP ilg'or daraja sertifikati.", reward: 35, certificateKey: "advanced" },

  { id: "p22", title: "Kripto iqtisodchi", type: "lesson", section: "Iqtisodiyot", description: "Kripto iqtisodiyot asoslari.", reward: 15, lessonId: "72" },
  { id: "p23", title: "Iqtisod tamoyillari I", type: "lesson", section: "Iqtisodiyot", description: "Talab, taklif va bozor.", reward: 12, lessonId: "11" },
  { id: "p24", title: "Soliq I", type: "lesson", section: "Iqtisodiyot", description: "Kripto va soliq qonunlari.", reward: 12, lessonId: "45" },
  { id: "p25", title: "Sovg'a", type: "gift", section: "Iqtisodiyot", description: "Iqtisodiyot mukofoti!", reward: 25 },
  { id: "p26", title: "Moliyaviy innovatsiyalar I", type: "lesson", section: "Iqtisodiyot", description: "FinTech va kripto innovatsiyalar.", reward: 12, lessonId: "67" },
  { id: "p27", title: "Iqtisod tamoyillari II", type: "lesson", section: "Iqtisodiyot", description: "Inflyatsiya va qiymat.", reward: 12, lessonId: "12" },
  { id: "p28", title: "Soliq II", type: "lesson", section: "Iqtisodiyot", description: "Qonuniy soliq to'lash.", reward: 12, lessonId: "46" },
  { id: "p29", title: "Sovg'a", type: "gift", section: "Iqtisodiyot", description: "Soliq mukofoti!", reward: 25 },
  { id: "p30", title: "Moliyaviy innovatsiyalar II", type: "lesson", section: "Iqtisodiyot", description: "Kelajak moliya tizimlari.", reward: 15, lessonId: "68" },
  { id: "p31", title: "Iqtisod tamoyillari III", type: "lesson", section: "Iqtisodiyot", description: "Makroiqtisod va kripto.", reward: 15, lessonId: "20" },

  { id: "p32", title: "Sun'iy intellekt va kripto", type: "lesson", section: "AI va kelajak", description: "AI va blockchain uyg'unligi.", reward: 15, lessonId: "65" },
  { id: "p33", title: "AI asboblari", type: "lesson", section: "AI va kelajak", description: "Kripto tahlil uchun AI vositalar.", reward: 12 },
  { id: "p34", title: "Sovg'a", type: "gift", section: "AI va kelajak", description: "AI mukofoti!", reward: 30 },
  { id: "p35", title: "Mashina va inson", type: "lesson", section: "AI va kelajak", description: "AI yordamida o'rganish.", reward: 12 },
  { id: "p36", title: "Mashina va mashina", type: "lesson", section: "AI va kelajak", description: "Avtomatlashtirilgan tizimlar.", reward: 12, lessonId: "64" },
  { id: "p37", title: "AI foydalari", type: "lesson", section: "AI va kelajak", description: "AI ning kriptodagi foydalari.", reward: 12 },
  { id: "p38", title: "PoW va AI", type: "lesson", section: "AI va kelajak", description: "Proof of Work va sun'iy intellekt.", reward: 15 },
  { id: "p39", title: "AI sertifikat", type: "certificate", section: "AI va kelajak", description: "NAPP AI va kripto sertifikati.", reward: 50, certificateKey: "ai" },
];

const XAZINA_GIFT: Omit<PathNode, "order"> = {
  id: "p4g",
  title: "Sovg'a",
  type: "gift",
  section: "Asosiy yo'l",
  description: "Xazina mukofoti!",
  reward: 12,
};

function buildPathWithDemoPlanks(): PathNode[] {
  const result: PathNode[] = [];
  let order = 1;
  for (const node of basePathNodes) {
    result.push({ ...node, order: order++ });
    if (node.id === "p4") {
      result.push({ ...XAZINA_GIFT, order: order++ });
    }
    if (!SKIP_DEMO_PLANKS.has(node.id)) {
      result.push({
        id: `pd-${node.id}`,
        order: order++,
        title: demoPlankTitle(node),
        type: "demo",
        section: node.section,
        description: `${node.title} — amaliy demo va o'yin`,
        reward: Math.max(3, Math.ceil(node.reward * 0.35)),
        parentLessonId: node.id,
      });
    }
  }
  return result;
}

/** 39 ta dars + 27 ta demo = 66 ta taxtacha */
export const pathNodes: PathNode[] = buildPathWithDemoPlanks();

export function getPathNode(id: string): PathNode | undefined {
  return pathNodes.find((n) => n.id === id);
}
