import type { Lesson } from "./lessons";

export interface GuideSection {
  title: string;
  points: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function getLessonGuide(lesson: Lesson): GuideSection[] {
  const topic = lesson.title;
  return [
    {
      title: "Asosiy tushunchalar",
      points: [
        `${topic} mavzusining eng muhim g'oyalari va atamalarini o'rganing.`,
        `Crypto bozorida bu bilimlar qanday qo'llanilishini tushuning.`,
        `NAPP qoidalari va xavfsizlik tamoyillarini yodda tuting.`,
      ],
    },
    {
      title: "Amaliy qo'llanma",
      points: [
        `Videoda ko'rsatilgan bosqichlarni ketma-ket bajaring.`,
        `${lesson.category} bo'yicha real misollarni tahlil qiling.`,
        `Xatolardan qochish uchun ogohlantirishlarga e'tibor bering.`,
      ],
    },
    {
      title: "Xulosa",
      points: [
        `Bugun o'rganilgan mavzularni qisqacha takrorlang.`,
        `Keyingi darslikka o'tish uchun testni yeching.`,
        `To'g'ri javoblar uchun stablecoin mukofot olasiz!`,
      ],
    },
  ];
}

const categoryQuestions: Record<string, Omit<QuizQuestion, "id">[]> = {
  Qonuniyat: [
    { question: "O'zbekistonda kripto bilan ishlashda nima muhim?", options: ["Qonuniy yo'llar", "Yashirin operatsiyalar", "Faqat naqd pul", "Hech narsa"], correctIndex: 0, explanation: "Qonuniy yo'llar va NAPP qoidalariga rioya qilish shart." },
    { question: "P2P operatsiyalarda nima tekshiriladi?", options: ["Shaxs tasdiqlash", "Faqat narx", "Rang", "Vaqt"], correctIndex: 0, explanation: "Shaxs tasdiqlash va xavfsizlik birinchi o'rinda." },
  ],
  Binance: [
    { question: "Binance'da birinchi qadam nima?", options: ["Ro'yxatdan o'tish", "Savdo qilish", "Mining", "Staking"], correctIndex: 0, explanation: "Avval hisob ochish kerak." },
    { question: "Pul kiritishda nima muhim?", options: ["To'g'ri tarmoq tanlash", "Tezlik", "Rang", "Vaqt"], correctIndex: 0, explanation: "Noto'g'ri tarmoq tanlansa pul yo'qolishi mumkin." },
  ],
  Bitcoin: [
    { question: "Bitcoin nima?", options: ["Raqamli valyuta", "Bank notasi", "Oltin", "Aktsiya"], correctIndex: 0, explanation: "Bitcoin decentralizatsiya qilingan raqamli valyutadir." },
    { question: "Blockchain nima vazifasini bajaradi?", options: ["Tranzaksiyalarni yozish", "Video saqlash", "Musiqa", "Rasm"], correctIndex: 0, explanation: "Blockchain tranzaksiyalar reestridir." },
    { question: "Mining nima?", options: ["Tranzaksiyalarni tasdiqlash", "O'yin", "Video", "Musiqa"], correctIndex: 0, explanation: "Mining tarmoqni himoya qiladi." },
  ],
  Treyding: [
    { question: "Treyding nima?", options: ["Aktivlarni sotib olish/sotish", "Faqat saqlash", "O'yin", "Bank"], correctIndex: 0, explanation: "Treyding — bozorda savdo qilish." },
    { question: "Risk boshqaruvi nima uchun kerak?", options: ["Yo'qotishlarni cheklash", "Tez boyish", "O'yin", "Hech narsa"], correctIndex: 0, explanation: "Risk boshqaruvi kapitalni himoya qiladi." },
  ],
  Asoslar: [
    { question: "Kriptovalyuta nima?", options: ["Raqamli aktiv", "Bank depoziti", "Naqd pul", "Aktsiya"], correctIndex: 0, explanation: "Kriptovalyuta — blokcheynda ishlaydigan raqamli aktiv." },
    { question: "Crypto o'rganishda birinchi qadam?", options: ["Asoslarni o'rganish", "Katta kredit olish", "Darhol futures", "Hech narsa"], correctIndex: 0, explanation: "Avval nazariy va qonuniy asoslarni o'rganing." },
  ],
  Web3: [
    { question: "Web3 nima?", options: ["Markazlashmagan internet", "Oddiy veb-sayt", "Televizor", "Bank tizimi"], correctIndex: 0, explanation: "Web3 — foydalanuvchi nazoratidagi decentralizatsiya qilingan internet." },
    { question: "Web3 da nima muhim?", options: ["Hamyon va shaxsiy kalitlar", "Faqat parol", "Faqat email", "Hech narsa"], correctIndex: 0, explanation: "Web3 da shaxsiy kalitlar xavfsizligi muhim." },
  ],
  Ethereum: [
    { question: "Ethereum nima?", options: ["Smart-kontrakt platformasi", "Faqat Bitcoin", "Bank", "O'yin"], correctIndex: 0, explanation: "Ethereum smart-kontraktlar va dApp lar uchun platforma." },
    { question: "MetaMask nima?", options: ["Kripto hamyon", "Bank ilovasi", "O'yin", "Messenger"], correctIndex: 0, explanation: "MetaMask — Ethereum va Web3 hamyoni." },
  ],
  Stablecoin: [
    { question: "USDT nima?", options: ["Dollar bilan bog'langan stablecoin", "O'yin tangasi", "Bank notasi", "Mining apparati"], correctIndex: 0, explanation: "USDT qiymati AQSh dollariga bog'langan." },
    { question: "Stablecoin nima uchun kerak?", options: ["Barqaror qiymat saqlash", "O'yin o'ynash", "Video ko'rish", "Hech narsa"], correctIndex: 0, explanation: "Stablecoin volatillikni kamaytiradi." },
  ],
  DeFi: [
    { question: "DeFi nima?", options: ["Markazlashmagan moliya", "Bank filiali", "O'yin", "Sug'urta"], correctIndex: 0, explanation: "DeFi — blokcheynda ishlaydigan moliya xizmatlari." },
    { question: "Yield farming nima?", options: ["Kripto o'tkazib daromad olish", "O'yin", "Mining apparati sotish", "Bank krediti"], correctIndex: 0, explanation: "Yield farming — likvidlik taqdim etib mukofot olish." },
  ],
  Yangiliklar: [
    { question: "Kripto yangiliklarini kuzatish nima uchun kerak?", options: ["Bozor tendentsiyalarini tushunish", "Faqat ko'ngil ochish", "Hech narsa", "Faqat o'yin"], correctIndex: 0, explanation: "Yangiliklar bozor holatini tushunishga yordam beradi." },
    { question: "Institutsional investorlar Bitcoin sotib olsa nima bo'ladi?", options: ["Bozor qizishi mumkin", "Bitcoin yo'qoladi", "Hech narsa", "Banklar yopiladi"], correctIndex: 0, explanation: "Katta investorlar talabni oshirishi mumkin." },
  ],
  default: [
    { question: "Crypto o'rganishda birinchi qadam nima?", options: ["Asoslarni o'rganish", "Darhol savdo", "Kredit olish", "Hech narsa"], correctIndex: 0, explanation: "Avval nazariyani o'rganish kerak." },
    { question: "Stablecoin nima?", options: ["Barqaror qiymatli kripto", "O'yin tangasi", "Bank notasi", "Aktsiya"], correctIndex: 0, explanation: "Stablecoin qiymati barqaror bo'ladi." },
    { question: "Testdan o'tish uchun nima kerak?", options: ["Videoni to'liq ko'rish va qo'llanmani o'qish", "Faqat taxmin", "To'g'ridan-to'g'ri javob", "Hech narsa"], correctIndex: 0, explanation: "Avval o'rganing, keyin test yeching." },
  ],
};

export function getLessonQuiz(lesson: Lesson): QuizQuestion[] {
  const base = categoryQuestions[lesson.category] ?? categoryQuestions.default;
  const questions: QuizQuestion[] = base.map((q, i) => ({
    ...q,
    id: `${lesson.id}-q${i}`,
  }));

  questions.push({
    id: `${lesson.id}-topic`,
    question: `"${lesson.title}" mavzusining asosiy maqsadi nima?`,
    options: [
      lesson.description.slice(0, 60) + "...",
      "Faqat o'yin o'ynash",
      "Pul yo'qotish",
      "Hech narsa o'rganmaslik",
    ],
    correctIndex: 0,
    explanation: lesson.description,
  });

  return questions.slice(0, 4);
}
