export type LessonSource = "HBS Akademiyasi" | "NAPP.uz" | "Texnoplov" | "YouTube" | "Javohir Group";

export interface Lesson {
  id: string;
  order: number;
  level: number;
  title: string;
  videoId: string;
  source: LessonSource;
  category: string;
  duration: string;
  reward: number;
  description: string;
}

export const levelTitles: Record<number, string> = {
  0: "0-bosqich — Crypto bilan tanishish",
  1: "1-bosqich — Bitcoin va blockchain asoslari",
  2: "2-bosqich — Treydingga kirish",
  3: "3-bosqich — Binance va amaliy ish",
  4: "4-bosqich — Bozor tahlili",
  5: "5-bosqich — Treyding strategiyalari",
  6: "6-bosqich — Professional daraja",
};

export const lessons: Lesson[] = [
  // ── 0-bosqich: Tanishuv ──
  { id: "1", order: 1, level: 0, title: "O'zbekistonda kripto bilan qonuniy ishlash", videoId: "xaVaqhTEcbw", source: "YouTube", category: "Qonuniyat", duration: "~25 daqiqa", reward: 10, description: "P2P, soliq va birja tanlash — O'zbekiston bozori uchun." },
  { id: "2", order: 2, level: 0, title: "Binance to'liq ro'yxatdan o'tish", videoId: "mgSWagEPNRI", source: "YouTube", category: "Binance", duration: "~15 daqiqa", reward: 10, description: "Binance'da hisob ochish — bosqichma-bosqich qo'llanma." },
  { id: "3", order: 3, level: 0, title: "Binance platformasi bilan tanishuv", videoId: "U-yd-J36PnU", source: "YouTube", category: "Binance", duration: "~20 daqiqa", reward: 10, description: "Binance interfeysi va asosiy funksiyalar." },

  // ── 1-bosqich: Bitcoin asoslari ──
  { id: "4", order: 4, level: 1, title: "Bitcoin nima? Blockchain nima?", videoId: "-5cmcfv-WEM", source: "Texnoplov", category: "Bitcoin", duration: "~15 daqiqa", reward: 10, description: "Bitcoin va blockchain asosiy tushunchalari." },
  { id: "5", order: 5, level: 1, title: "Bitcoin qanday ishlaydi? Narxi nega oshadi?", videoId: "qFYXCHHcmwY", source: "Javohir Group", category: "Bitcoin", duration: "~20 daqiqa", reward: 12, description: "Bitcoin ishlash printsipi va narx dinamikasi." },
  { id: "6", order: 6, level: 1, title: "Bitcoin haqida to'liq ma'lumot va mining", videoId: "F53mHXTa1sY", source: "YouTube", category: "Bitcoin", duration: "~30 daqiqa", reward: 15, description: "Bitcoin ishlash printsipi va mayning jarayoni." },
  { id: "7", order: 7, level: 1, title: "Bitkoin qanday ishlaydi? Raqamli pul", videoId: "On2tfIxQJrc", source: "YouTube", category: "Bitcoin", duration: "~20 daqiqa", reward: 12, description: "Kriptovalyuta va raqamli pul mexanizmi." },
  { id: "8", order: 8, level: 1, title: "Bitkoin qazib olish (mining) nima?", videoId: "8w3wbv8IVC0", source: "YouTube", category: "Bitcoin", duration: "~15 daqiqa", reward: 10, description: "Mining jarayoni batafsil tushuntiriladi." },

  // ── 2-bosqich: Treyding kirish ──
  { id: "9", order: 9, level: 2, title: "Treyding nima?", videoId: "V_LwBPo6k-c", source: "Texnoplov", category: "Treyding", duration: "~12 daqiqa", reward: 10, description: "Treyding tushunchasi va asoslari." },
  { id: "10", order: 10, level: 2, title: "Treydingni 0 dan to'g'ri o'rganish", videoId: "fou_OuEDYaI", source: "YouTube", category: "Treyding", duration: "~40 daqiqa", reward: 15, description: "Noldan treydingni to'g'ri boshlash." },
  { id: "11", order: 11, level: 2, title: "1-DARS | Moliya bozoriga kirib boramiz", videoId: "815j8fg1mKE", source: "HBS Akademiyasi", category: "Asoslar", duration: "~45 daqiqa", reward: 15, description: "Moliya bozori va crypto dunyosiga kirish." },
  { id: "12", order: 12, level: 2, title: "2-DARS | Bozor turlarini o'rganamiz", videoId: "m6UFY6iCIak", source: "HBS Akademiyasi", category: "Asoslar", duration: "~40 daqiqa", reward: 15, description: "Turli moliya va crypto bozor turlari." },
  { id: "13", order: 13, level: 2, title: "3-DARS | Kriptovalyutalarga investitsiya", videoId: "p8G8SilJEY8", source: "HBS Akademiyasi", category: "Asoslar", duration: "~45 daqiqa", reward: 20, description: "Kriptovalyutalarga to'g'ri investitsiya qilish." },
  { id: "14", order: 14, level: 2, title: "70 daqiqada treydingni to'liq o'rganing", videoId: "W2TT1MwjJ20", source: "YouTube", category: "Treyding", duration: "70 daqiqa", reward: 25, description: "Treyding asoslarini qisqa vaqt ichida o'rganish." },
  { id: "15", order: 15, level: 2, title: "Kriptovalyutalarda daromad qilish yo'llari", videoId: "Oa2d1dK4boc", source: "YouTube", category: "Treyding", duration: "~45 daqiqa", reward: 20, description: "Treyding bo'yicha bepul dars — daromad yo'llari." },

  // ── 3-bosqich: Binance amaliyot ──
  { id: "16", order: 16, level: 3, title: "Binance pul kiritish va chiqarish", videoId: "aSozFQytJCg", source: "YouTube", category: "Binance", duration: "~20 daqiqa", reward: 12, description: "Binance'da pul operatsiyalari qo'llanmasi." },
  { id: "17", order: 17, level: 3, title: "Binance qonuniy ishlash — pul solish va yechish", videoId: "WIfMKnZe83Q", source: "YouTube", category: "Binance", duration: "~25 daqiqa", reward: 15, description: "Qonuniy ravishda pul kiritish va chiqarish." },
  { id: "18", order: 18, level: 3, title: "Binance'da eng kam komissiya bilan depozit", videoId: "yhuQnsJ4kuE", source: "YouTube", category: "Binance", duration: "~15 daqiqa", reward: 10, description: "Minimal komissiya bilan depozit qilish usullari." },
  { id: "19", order: 19, level: 3, title: "Treyding telefon orqali ishlash", videoId: "QtqXza6o4qw", source: "YouTube", category: "Amaliyot", duration: "~20 daqiqa", reward: 12, description: "Mobil qurilmada treyding qilish bo'yicha qo'llanma." },

  // ── 4-bosqich: Bozor tahlili ──
  { id: "20", order: 20, level: 4, title: "4-DARS | Bozorni tahlil qilish", videoId: "DaSBt0FWHa0", source: "HBS Akademiyasi", category: "Tahlil", duration: "~50 daqiqa", reward: 20, description: "Fundamental, texnik va sentiment tahlillar." },
  { id: "21", order: 21, level: 4, title: "5-DARS | Bozorga qachon kirish kerak?", videoId: "bfwWZOgMtKc", source: "HBS Akademiyasi", category: "Tahlil", duration: "~35 daqiqa", reward: 15, description: "Bozorga to'g'ri vaqtda kirish strategiyalari." },
  { id: "22", order: 22, level: 4, title: "Bozor tahlili: BTC va XAU narx yo'nalishi", videoId: "-LdcrU2B93Q", source: "YouTube", category: "Tahlil", duration: "~30 daqiqa", reward: 18, description: "BTC va oltin narxi tahlili, kutilayotgan targetlar." },
  { id: "23", order: 23, level: 4, title: "XAU/USD va BTC/USDT tahlili", videoId: "4bSw146jznA", source: "YouTube", category: "Tahlil", duration: "~35 daqiqa", reward: 18, description: "Global bozorlarning umumiy kartasi." },
  { id: "24", order: 24, level: 4, title: "Savdo psixologiyasi — muvaffaqiyatli treyderlar", videoId: "SCl-Ije6O-c", source: "YouTube", category: "Psixologiya", duration: "~25 daqiqa", reward: 15, description: "Muvaffaqiyatli treyderlarning ruhiy sirlari." },
  { id: "25", order: 25, level: 4, title: "Bu darsni ko'rmasangiz tradingda pul yo'qotasiz", videoId: "Faz_6Zdo4Zk", source: "YouTube", category: "Psixologiya", duration: "~20 daqiqa", reward: 15, description: "Treydingda muhim xatolar va ulardan qochish." },

  // ── 5-bosqich: Strategiyalar (ketma-ket) ──
  { id: "26", order: 26, level: 5, title: "Yapon shamlari — aslida birinchi dars", videoId: "Nib1O7ZPWfQ", source: "YouTube", category: "Strategiya", duration: "~40 daqiqa", reward: 20, description: "Yapon shamlari — treydingning asosi." },
  { id: "27", order: 27, level: 5, title: "Bozor strukturasi 1-DARS — treyding alifbosi", videoId: "Skqw_5VUg5o", source: "YouTube", category: "Strategiya", duration: "~45 daqiqa", reward: 22, description: "Treydingning haqiqiy alifbosi — 1-qism." },
  { id: "28", order: 28, level: 5, title: "Bozor strukturasi 2-DARS — treyding alifbosi", videoId: "CUYYp1ArUTo", source: "YouTube", category: "Strategiya", duration: "~45 daqiqa", reward: 22, description: "Treydingning haqiqiy alifbosi — 2-qism." },
  { id: "29", order: 29, level: 5, title: "M.BOSS/I.BOSS/BOSS 3-DARS — mexanik strategiya", videoId: "1XA2Q8yWuIk", source: "YouTube", category: "Strategiya", duration: "~40 daqiqa", reward: 20, description: "Mexanik strategiya yaratish." },
  { id: "30", order: 30, level: 5, title: "Consolidation 4-DARS — ranglarda ishlash", videoId: "CU_VFtT1mEQ", source: "YouTube", category: "Strategiya", duration: "~35 daqiqa", reward: 18, description: "Konsolidatsiya zonalarida savdo qilish." },
  { id: "31", order: 31, level: 5, title: "Discount/Premium 5-DARS — impulsiv harakatlar", videoId: "AGNtIL8muJk", source: "YouTube", category: "Strategiya", duration: "~40 daqiqa", reward: 20, description: "Impulsiv harakatlarni ushlash texnikasi." },
  { id: "32", order: 32, level: 5, title: "Order Flow 7-DARS — savdo qilish muammo emas", videoId: "4pADFYsz0ck", source: "YouTube", category: "Strategiya", duration: "~45 daqiqa", reward: 22, description: "Order Flow orqali bozorni o'qish." },
  { id: "33", order: 33, level: 5, title: "Order Block 8-DARS — yashirin sirlarni bilib oling", videoId: "HQzmL6DpYTI", source: "YouTube", category: "Strategiya", duration: "~40 daqiqa", reward: 20, description: "Order Block strategiyasi batafsil." },
  { id: "34", order: 34, level: 5, title: "Fraktallar 9-DARS — hech kim ko'rsatmagan sirlari", videoId: "frnRajkTGJo", source: "YouTube", category: "Strategiya", duration: "~40 daqiqa", reward: 20, description: "Fraktal tahlil usullari." },
  { id: "35", order: 35, level: 5, title: "IDM 10-DARS — mexanik savdo strategiyasi", videoId: "U-QE5af2ctg", source: "YouTube", category: "Strategiya", duration: "~45 daqiqa", reward: 22, description: "Bozorda mexanik tarzda harakatlanish." },
  { id: "36", order: 36, level: 5, title: "OTE Zona 11-DARS — optimal sotib olish nuqtalari", videoId: "4KvcolWzq5o", source: "YouTube", category: "Strategiya", duration: "~40 daqiqa", reward: 20, description: "O'suvchan va tushuvchan harakatlarda optimal nuqtalar." },
  { id: "37", order: 37, level: 5, title: "Order Blocklar 13-DARS — bozor holatida ishlashi", videoId: "uElsbJTQLX8", source: "YouTube", category: "Strategiya", duration: "~40 daqiqa", reward: 20, description: "Order Blocklarning turli bozor holatlarida qo'llanilishi." },

  // ── 6-bosqich: Professional ──
  { id: "38", order: 38, level: 6, title: "Tradingni noldan boshlash — to'liq dars", videoId: "a5lxXwo56T4", source: "YouTube", category: "Professional", duration: "~90 daqiqa", reward: 30, description: "Tradingni noldan boshlab o'rganish — to'liq kurs." },
  { id: "39", order: 39, level: 6, title: "Digash strategiyasi — tradingda minus qilmaysiz", videoId: "jZebD-smPIg", source: "YouTube", category: "Professional", duration: "~30 daqiqa", reward: 18, description: "Digash strategiyasi yordamida xavfsiz treyding." },
  { id: "40", order: 40, level: 6, title: "Kriptoda 2026 yilda daromadga chiqish strategiyasi", videoId: "Bvxy_9gla0s", source: "YouTube", category: "Professional", duration: "~60 daqiqa", reward: 25, description: "Noldan boshlab kriptoda daromad strategiyasi." },
  { id: "41", order: 41, level: 6, title: "Kripto birjada pul ishlash yo'llari", videoId: "tYhhPOZ1ZDc", source: "YouTube", category: "Professional", duration: "~35 daqiqa", reward: 20, description: "Kripto birjada daromad olish usullari." },
  { id: "42", order: 42, level: 6, title: "Crypto Futures bozorida daromad qilish", videoId: "KGHBw-qQHWU", source: "YouTube", category: "Futures", duration: "~40 daqiqa", reward: 25, description: "Futures bozorida xavfsiz ishlash qo'llanmasi." },
  { id: "43", order: 43, level: 6, title: "Risk va Money Management — stabil daromad yo'li", videoId: "T_i9XmcOhfA", source: "YouTube", category: "Professional", duration: "~50 daqiqa", reward: 30, description: "Risk boshqaruvi, prop shotlar va stabil daromad." },

  // ── 0-bosqich: Yangi tanishuv darslari ──
  { id: "44", order: 44, level: 0, title: "Kriptovalyuta nima? Nima maqsadda ishlatiladi?", videoId: "S-t6Snin7oY", source: "YouTube", category: "Asoslar", duration: "~15 daqiqa", reward: 10, description: "Kriptovalyuta tushunchasi va foydalanish maqsadlari." },
  { id: "45", order: 45, level: 0, title: "O'zbekistonda kripto ishlash mumkinmi? Qonun nima deydi?", videoId: "I50KM3HXlZk", source: "YouTube", category: "Qonuniyat", duration: "~20 daqiqa", reward: 12, description: "O'zbekistonda kripto qonunchiligi va ruxsat etilgan yo'llar." },
  { id: "46", order: 46, level: 0, title: "O'zbekistonda kripto bilan qonuniy ishlash yo'li", videoId: "Ngkyvt3wSyA", source: "YouTube", category: "Qonuniyat", duration: "~15 daqiqa", reward: 10, description: "Qonuniy ravishda kriptovalyuta bilan ishlash bo'yicha yo'riqnoma." },
  { id: "47", order: 47, level: 0, title: "Cryptoni o'rganmoqchimisiz?", videoId: "lehoWBTqF7o", source: "YouTube", category: "Asoslar", duration: "Short", reward: 5, description: "Crypto o'rganishni qayerdan boshlash kerakligi haqida qisqa maslahat." },
  { id: "48", order: 48, level: 0, title: "Kriptovalyutani qancha pul bilan boshlash kerak?", videoId: "EnU7GdeLDvw", source: "YouTube", category: "Asoslar", duration: "Short", reward: 5, description: "Boshlang'ich kapital va minimal investitsiya haqida." },
  { id: "49", order: 49, level: 0, title: "O'zbekistonda kripto bilan ishlasangiz qamalasiz", videoId: "Wxvd7gWFb9o", source: "YouTube", category: "Qonuniyat", duration: "Short", reward: 5, description: "Qonuniy cheklovlar va ogohlantirishlar haqida qisqa ma'lumot." },
  { id: "50", order: 50, level: 0, title: "Kripto bilan shug'ullanayotganlar diqqatiga!", videoId: "lFhibvvoOTQ", source: "YouTube", category: "Qonuniyat", duration: "Short", reward: 5, description: "Kripto investorlar uchun muhim ogohlantirishlar." },

  // ── 1-bosqich: Yangi Bitcoin va blockchain darslari ──
  { id: "51", order: 51, level: 1, title: "Blokcheyn nima? Qanday ishlaydi?", videoId: "WaaOY3T3mJM", source: "YouTube", category: "Bitcoin", duration: "~20 daqiqa", reward: 12, description: "Blokcheyn texnologiyasi oddiy tilda tushuntiriladi." },
  { id: "52", order: 52, level: 1, title: "Bitcoin o'zi nima?", videoId: "C1y_6cRWglY", source: "YouTube", category: "Bitcoin", duration: "~15 daqiqa", reward: 10, description: "Bitcoin tushunchasi va asosiy xususiyatlari." },
  { id: "53", order: 53, level: 1, title: "Bitcoin qachon tugaydi? Oddiy tilda", videoId: "2Y-8Ke6qEVU", source: "YouTube", category: "Bitcoin", duration: "~15 daqiqa", reward: 10, description: "Bitcoin ta'minoti va chegaralangan miqdor haqida." },
  { id: "54", order: 54, level: 1, title: "Kriptovalyutalar orasidagi farqlar", videoId: "bWp5GQ-8yt0", source: "YouTube", category: "Bitcoin", duration: "Short", reward: 5, description: "Bitcoin, BNB va boshqa coinlar farqi." },
  { id: "55", order: 55, level: 1, title: "Bitcoin yaratgan odam kim?", videoId: "zwxNcdyd4vw", source: "YouTube", category: "Bitcoin", duration: "Short", reward: 5, description: "Satoshi Nakamoto va Bitcoin tarixidagi sir." },
  { id: "56", order: 56, level: 1, title: "1 Bitcoin qazish uchun qancha pul kerak?", videoId: "TpvT1A6obtQ", source: "YouTube", category: "Bitcoin", duration: "Short", reward: 5, description: "ASIC minerlar va mining xarajatlari haqida." },
  { id: "57", order: 57, level: 1, title: "Bitcoin $0 bo'ladimi?", videoId: "KJFVpDRsMvM", source: "YouTube", category: "Bitcoin", duration: "~10 daqiqa", reward: 8, description: "Bitcoin kelajagi va narx prognozlari muhokamasi." },

  // ── 2-bosqich: Yangi treyding kirish darslari ──
  { id: "58", order: 58, level: 2, title: "Kriptovalyuta xarid qilish — 3 qadam", videoId: "x3eaFINPl6U", source: "YouTube", category: "Treyding", duration: "Short", reward: 5, description: "Binance orqali kripto sotib olishning 3 oddiy qadami." },
  { id: "59", order: 59, level: 2, title: "Treyding bepul dars — 0 dan o'rganish", videoId: "Ih2pNigr67M", source: "YouTube", category: "Treyding", duration: "~30 daqiqa", reward: 15, description: "Treydingni noldan boshlab o'rganish bo'yicha bepul dars." },
  { id: "60", order: 60, level: 2, title: "Kuninga $100 kriptovalyutada — oson va tushunarli", videoId: "7f6f5DWxnRc", source: "YouTube", category: "Treyding", duration: "~25 daqiqa", reward: 15, description: "Kriptovalyutada daromad olish yo'llari oddiy tilda." },

  // ── 3-bosqich: Amaliy platformalar ──
  { id: "61", order: 61, level: 3, title: "MetaTrader telefonda — demo va real savdo", videoId: "kPUqxieZLAY", source: "YouTube", category: "Amaliyot", duration: "~25 daqiqa", reward: 15, description: "MetaTrader mobil ilovasida hisob ochish va savdo qilish." },

  // ── 4-bosqich: Yangi tahlil darslari ──
  { id: "62", order: 62, level: 4, title: "1-dars — Patternlarni to'liq ko'rib chiqamiz", videoId: "IRIJ0ORKa6I", source: "YouTube", category: "Tahlil", duration: "~40 daqiqa", reward: 18, description: "Grafik patternlari va ularni o'qish usullari." },
  { id: "63", order: 63, level: 4, title: "95% odam buni bilmaydi!", videoId: "RwV3Vn7LZn8", source: "YouTube", category: "Tahlil", duration: "~20 daqiqa", reward: 12, description: "Ko'pchilik bilmasdan qo'yadigan muhim tahlil sirrlari." },

  // ── 5-bosqich: Strategiya va botlar ──
  { id: "64", order: 64, level: 5, title: "Kuniga $100 topadigan treyding bot", videoId: "e21qXTfixvA", source: "YouTube", category: "Strategiya", duration: "~30 daqiqa", reward: 18, description: "Avtomatik treyding botlari va ularning ishlash printsipi." },

  // ── 6-bosqich: Professional va yangiliklar ──
  { id: "65", order: 65, level: 6, title: "Web3 nima degani? Animatsiya formatida", videoId: "yyA9-9BTp8I", source: "YouTube", category: "Web3", duration: "~10 daqiqa", reward: 10, description: "Web3 tushunchasi vizual va oddiy tilda." },
  { id: "66", order: 66, level: 6, title: "Ethereum CEO rejalar — ETH, Linea, MetaMask", videoId: "_DOWAMp8c_A", source: "YouTube", category: "Ethereum", duration: "~20 daqiqa", reward: 12, description: "Ethereum ekotizimi va yangi loyihalar haqida." },
  { id: "67", order: 67, level: 6, title: "Coinbase va yangi tizim — Brian Armstrong", videoId: "RG7fJgTLXC8", source: "YouTube", category: "Yangiliklar", duration: "~25 daqiqa", reward: 12, description: "Coinbase rivojlanishi va kripto bozoridagi o'zgarishlar." },
  { id: "68", order: 68, level: 6, title: "Bybit asoschisi — crypto o'zgarganini ta'kidlamoqda", videoId: "wQV3ZVySVRw", source: "YouTube", category: "Yangiliklar", duration: "~20 daqiqa", reward: 12, description: "Bybit va kripto bozoridagi so'nggi tendentsiyalar." },
  { id: "69", order: 69, level: 6, title: "USDT asoschisi — Tether, Plasma va Juventus", videoId: "2WP9JE2CsXQ", source: "YouTube", category: "Stablecoin", duration: "~20 daqiqa", reward: 12, description: "Stablecoin va Tether kompaniyasining yangi yo'nalishlari." },
  { id: "70", order: 70, level: 6, title: "Amerikaliklar Bitcoin orqali muammoni hal qiladi", videoId: "zYLjCLTdpBI", source: "YouTube", category: "Yangiliklar", duration: "~20 daqiqa", reward: 12, description: "Bitcoin institutsional qabul qilinishi va global tendentsiyalar." },
  { id: "71", order: 71, level: 6, title: "HASH HEDGE to'liq obzor — Crypto Prop nima?", videoId: "88AnMdX0Cjw", source: "YouTube", category: "Professional", duration: "~30 daqiqa", reward: 20, description: "Crypto prop trading va HASH HEDGE platformasi haqida." },
  { id: "72", order: 72, level: 6, title: "Kriptovalyuta bo'yicha 5 ta taxmin [2025]", videoId: "aSLdTxGpRxk", source: "YouTube", category: "Yangiliklar", duration: "~25 daqiqa", reward: 15, description: "2025 yil uchun kripto bozor prognozlari va o'sish sabablari." },
  { id: "73", order: 73, level: 6, title: "Kriptovalyutalar meva berishni boshladi — Solana", videoId: "eCsaJw8Te6I", source: "YouTube", category: "DeFi", duration: "Short", reward: 5, description: "Solana va DeFi yield strategiyalari haqida qisqa ma'lumot." },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsByLevel(): { level: number; title: string; lessons: Lesson[] }[] {
  const levels = Array.from(new Set(lessons.map((l) => l.level))).sort((a, b) => a - b);
  return levels.map((level) => ({
    level,
    title: levelTitles[level] ?? `${level}-bosqich`,
    lessons: lessons.filter((l) => l.level === level),
  }));
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}
