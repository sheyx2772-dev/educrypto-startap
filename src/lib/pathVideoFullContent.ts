import type { EnrichedVideoStep, PathQuizQ } from "./pathContent";
import { shuffleQuizTriple } from "./quizShuffle";
import { videoGuideExtras } from "./pathVideoGuideExtras";

type Q3 = [PathQuizQ, PathQuizQ, PathQuizQ];

function step(
  nodeId: string,
  stepNum: number,
  title: string,
  videoId: string,
  tip: string,
  guidePoints: string[],
  quiz: Q3
): EnrichedVideoStep {
  const extras = videoGuideExtras[`${nodeId}-${stepNum}`] ?? [];
  return {
    step: stepNum,
    title,
    videoId,
    tip,
    guide: { title, points: [...guidePoints, ...extras] },
    quiz: shuffleQuizTriple(quiz, stepNum),
  };
}

/** Har bir video uchun mos qo'llanma va 3 ta noyob test */
export const fullVideoCourses: Record<string, EnrichedVideoStep[]> = {
  p1: [
    step("p1", 1, "Bitcoin va blockchain kirish", "-5cmcfv-WEM", "Bitcoin — markazsiz raqamli pul tizimi.",
      [
        "Bitcoin 2009-yilda Satoshi Nakamoto tomonidan yaratilgan — birinchi muvaffaqiyatli kripto tanga.",
        "Markaziy banksiz ishlaydi: tranzaksiyalar peer-to-peer tarmoq orqali tasdiqlanadi.",
        "Blockchain — barcha tranzaksiyalar yozilgan ochiq daftar; o'zgartirib bo'lmaydi.",
        "Bitcoin cheklangan: maksimum 21 million BTC qazib olinadi — inflyatsiyaga chidamli.",
        "Kripto o'rganishda birinchi qadam: Bitcoin nima va nega u muhimligini tushunish.",
      ],
      [
        { question: "Bitcoin kim tomonidan yaratilgan?", options: ["Satoshi Nakamoto", "Mark Zuckerberg", "Elon Musk", "NAPP"], correctIndex: 0 },
        { question: "Blockchain nima?", options: ["O'zgartirib bo'lmaydigan tranzaksiya daftari", "Oddiy bank hisobi", "Video o'yin", "Telegram bot"], correctIndex: 0 },
        { question: "Bitcoin maksimum miqdori qancha?", options: ["21 million BTC", "Cheksiz", "1 million", "100 BTC"], correctIndex: 0 },
      ]),
    step("p1", 2, "Bitcoin qanday ishlaydi?", "qFYXCHHcmwY", "Tranzaksiyalar qanday tasdiqlanadi va narx qanday shakllanadi.",
      [
        "Har bir tranzaksiya minerlar tomonidan tekshiriladi va blokga qo'shiladi.",
        "Proof of Work (PoW): minerlar murakkab hisob-kitob yechadi — tarmoq xavfsizligi shundan.",
        "Narx talab va taklif qonuniga bo'ysunadi: ko'p talab — narx oshishi mumkin.",
        "Halving: har 4 yilda miner mukofoti yarmiga kamayadi — yangi BTC chiqishi sekinlashadi.",
        "Bitcoin manzili — umumiy kalitdan hosil bo'ladi; shaxsiy kalitni hech kimga bermang.",
      ],
      [
        { question: "Bitcoin tarmog'ini himoya qiluvchi mexanizm?", options: ["Proof of Work", "Proof of Stake", "Faqat parol", "SMS kod"], correctIndex: 0 },
        { question: "Bitcoin narxi nimaga bog'liq?", options: ["Talab va taklif", "Faqat hukumat", "Faqat miner xohishi", "Hech narsaga"], correctIndex: 0 },
        { question: "Halving nima qiladi?", options: ["Miner mukofotini kamaytiradi", "Bitcoinni o'chiradi", "Narxni qotib qo'yadi", "Hamyonni ochadi"], correctIndex: 0 },
      ]),
    step("p1", 3, "Raqamli pul mexanizmi", "On2tfIxQJrc", "Pul evolyutsiyasi: tovar pul → qog'oz → raqamli → kripto.",
      [
        "Tovar pul (tuz, qo'yi) to'g'ridan-to'g'ri almashinuv — lekin saqlash qiyin.",
        "Qog'oz pul va banklar iqtisodiyotni tezlashtirdi — lekin markazlashtirish xavfi bor.",
        "Raqamli pul (bank kartasi, Payme) qulay, lekin bank orqali o'tadi.",
        "Kripto pul — internetda markazsiz uzatish imkonini beradi.",
        "Yaxshi pul: bo'linuvchan, transport qilinadigan, tan olinadigan, kamroq o'zgaruvchan bo'lishi kerak.",
      ],
      [
        { question: "Tovar pulning kamchiligi?", options: ["Saqlash va transport qiyin", "Juda arzon", "Cheksiz miqdor", "Raqamli"], correctIndex: 0 },
        { question: "Raqamli bank puli qayerdan o'tadi?", options: ["Bank va to'lov tizimi orqali", "Faqat blockchain", "Faqat pochta", "Hech qayerdan"], correctIndex: 0 },
        { question: "Kripto pulning asosiy farqi?", options: ["Markazsiz uzatish imkoniyati", "Faqat qog'ozda", "Faqat oltinda", "Faqat o'yinda"], correctIndex: 0 },
      ]),
    step("p1", 4, "Blockchain amaliyoti", "WaaOY3T3mJM", "Bloklar, zanjir va konsensus — amaliy tushuncha.",
      [
        "Har bir blok oldingi blok hashini o'z ichiga oladi — zanjir hosil bo'ladi.",
        "Tranzaksiya yuborilganda mempoolga tushadi — minerlar uni tanlaydi.",
        "Konsensus: tarmoq a'zolari qaysi blok yaroqli ekaniga kelishadi.",
        "O'zgartirish urinishi butun zanjirni qayta hisoblashni talab qiladi — amalda mumkin emas.",
        "Blockchain nafaqat Bitcoinda: Ethereum, supply chain, shifokorlik yozuvlari.",
      ],
      [
        { question: "Bloklar qanday bog'lanadi?", options: ["Oldingi blok hash orqali", "Telefon orqali", "Pochta orqali", "Tasodifan"], correctIndex: 0 },
        { question: "Mempool nima?", options: ["Kutilayotgan tranzaksiyalar joyi", "Hamyon paroli", "Video fayl", "Bank filiali"], correctIndex: 0 },
        { question: "Nega blockchainni o'zgartirish qiyin?", options: ["Butun zanjirni qayta hisoblash kerak", "Chunki parol yo'q", "Chunki internet sekin", "Chunki bepul"], correctIndex: 0 },
      ]),
    step("p1", 5, "Kripto ekotizimi", "S-t6Snin7oY", "Birjalar, hamyonlar, minerlar va foydalanuvchilar.",
      [
        "Birjalar (Binance, Coinbase) — BTC sotib olish va sotish maydoni.",
        "Hamyonlar — kalitlarni saqlash vositasi: issiq (online) va sovuq (offline).",
        "Minerlar va validatorlar tarmoq xavfsizligini ta'minlaydi — mukofot oladi.",
        "Stablecoin (USDT) — kripto bozorida barqaror qiymat uchun ishlatiladi.",
        "Ekotizim: loyihalar, dasturchilar, investorlar va regulatorlar o'zaro ta'sir qiladi.",
      ],
      [
        { question: "Kripto birja nima qiladi?", options: ["Aktivlarni sotib olish/sotish imkonini beradi", "Faqat video ko'rsatadi", "Faqat soliq to'laydi", "Faqat o'yin"], correctIndex: 0 },
        { question: "Sovuq hamyon afzalligi?", options: ["Internetdan uzilgan — xakerlar uchun qiyinroq", "Har doim tezroq", "Bepul BTC beradi", "Parol kerak emas"], correctIndex: 0 },
        { question: "USDT stablecoin nima uchun kerak?", options: ["Bozorda barqaror qiymat saqlash", "Faqat o'yin uchun", "Faqat mining", "Hech narsa uchun"], correctIndex: 0 },
      ]),
    step("p1", 6, "Hamyon va xavfsizlik", "mgSWagEPNRI", "Kalitlar, seed phrase va xavfsiz saqlash.",
      [
        "Shaxsiy kalit (private key) — tangalaringizga egalik huquqi; yo'qotsangiz — pul yo'qoladi.",
        "Seed phrase (12-24 so'z) — hamyonni tiklash kaliti; hech qachon onlayn ulashmang.",
        "2FA (ikki bosqichli tasdiq) — birja va hamyonlarda qo'shimcha himoya.",
        "Phishing: soxta saytlar va xabarlar — URLni tekshiring, rasmiy manbadan kiring.",
        "NAPP qoidalari: O'zbekistonda faqat litsenziyali platformalar orqali operatsiya qiling.",
      ],
      [
        { question: "Seed phrase nima uchun muhim?", options: ["Hamyonni yo'qotganda tiklash uchun", "Video ko'rish uchun", "O'yin ochish uchun", "Hech narsa uchun"], correctIndex: 0 },
        { question: "Private keyni kim bilan bo'lish mumkin?", options: ["Hech kim bilan — faqat sizda", "Telegram do'stlar", "Barcha forumlar", "Birja operatori so'rasa"], correctIndex: 0 },
        { question: "Phishingdan himoya?", options: ["Rasmiy URL va 2FA ishlatish", "Parolni chatda yozish", "Har qanday havolani bosish", "Seedni emailga yuborish"], correctIndex: 0 },
      ]),
  ],

  p2: [
    step("p2", 1, "Pulning tarixi", "On2tfIxQJrc", "Pul iqtisodiyotning asosi — evolyutsiya va vazifalar.",
      [
        "Pul uch vazifani bajaradi: almashuv vositasi, hisob birligi, qiymat saqlash.",
        "Barterdan pulga o'tish savdoni soddalashtirdi — ikki tomonlama talab muammosi hal bo'ldi.",
        "Metall tangalar (oltin, kumush) o'z qiymatiga ega edi — davlat tangalari paydo bo'ldi.",
        "Fiat pul — hukumat tomonidan e'lon qilingan, qonuniy to'lov vositasi (so'm, dollar).",
        "Bugun raqamli va kripto pul yangi bosqich — internet asrida moliya.",
      ],
      [
        { question: "Pulning uch vazifasidan biri?", options: ["Almashuv vositasi", "Faqat bezak", "Faqat sport", "Faqat o'yin"], correctIndex: 0 },
        { question: "Fiat pul nima?", options: ["Hukumat e'lon qilgan qonuniy pul", "Faqat oltin tanga", "Faqat kripto", "Faqat barter"], correctIndex: 0 },
        { question: "Barter muammosi nima edi?", options: ["Ikki tomonlama talab topish qiyinligi", "Juda arzon", "Internet yo'qligi", "Bank ko'p"], correctIndex: 0 },
      ]),
    step("p2", 2, "Bitcoin — yangi pul?", "-5cmcfv-WEM", "Markazsiz pul tushunchasi va iqtisodiy jihatlari.",
      [
        "Bitcoin hech bir davlat yoki bankka bog'liq emas — decentralizatsiya.",
        "Cheklangan taklif (21 mln) — qisqa muddatli chop etish siyosatidan farq qiladi.",
        "Global uzatish: chegarasiz, 24/7, o'rtacha komissiya bilan.",
        "Volatillik yuqori — qisqa muddatda narx tebranishi katta bo'lishi mumkin.",
        "Bitcoin pul emas, balki raqamli aktiv sifatida ham qaraladi — mamlakat qonunlariga qarab.",
      ],
      [
        { question: "Bitcoin markazlashtirilganmi?", options: ["Yo'q — decentralizatsiya", "Ha — faqat NAPP", "Ha — faqat bank", "Ha — faqat Apple"], correctIndex: 0 },
        { question: "Bitcoin taklifi qanday?", options: ["Cheklangan — 21 million", "Cheksiz har kuni", "Faqat 100 ta", "Hukumat belgilaydi"], correctIndex: 0 },
        { question: "Bitcoin volatilligi nimani anglatadi?", options: ["Narx tez o'zgarishi mumkin", "Narx hech qachon o'zgarmaydi", "Bepul", "Faqat pasayadi"], correctIndex: 0 },
      ]),
    step("p2", 3, "Qiymat va inflyatsiya", "qFYXCHHcmwY", "Narxlar nega o'zgaradi va pul qiymati qanday eriydi.",
      [
        "Inflyatsiya — pul birligi sotib olish qobiliyatining pasayishi; narxlar oshadi.",
        "Markaziy banklar foiz stavkasi va pul massasini boshqaradi — iqtisodiyotni sozlash.",
        "Hyperinflatsiya — pul ishonchi yo'qolganda (Zimbabwe, Venezuela misollari).",
        "Bitcoin maximalistlari: cheklangan taklif inflyatsiyaga qarshi himoya deb ko'radi.",
        "Stablecoin (USDT) inflyatsiyadan himoyalanish uchun emas — kripto bozorida barqarorlik uchun.",
      ],
      [
        { question: "Inflyatsiya nima?", options: ["Pul sotib olish qobiliyati pasayishi", "Pul ko'payishi faqat yaxshi", "Bank yopilishi", "Faqat kripto"], correctIndex: 0 },
        { question: "Markaziy bank asosan nima boshqaradi?", options: ["Pul massasi va foiz stavkasi", "Faqat video", "Faqat o'yin", "Faqat iPhone"], correctIndex: 0 },
        { question: "USDT asosan nima uchun ishlatiladi?", options: ["Kripto bozorida barqaror qiymat", "Inflyatsiyadan 100% himoya", "Faqat soliq", "Faqat mining"], correctIndex: 0 },
      ]),
    step("p2", 4, "Moliya bozoriga kirish", "815j8fg1mKE", "Aksiyalar, obligatsiyalar va kripto bozori.",
      [
        "Moliya bozori — kapital jalb qilish va investorlarga daromad imkoniyati.",
        "Aksiya — kompaniya ulushi; obligatsiya — qarz qog'ozi.",
        "Kripto bozori 24/7 ishlaydi — an'anaviy fond bozoridan farqli.",
        "DYOR (Do Your Own Research) — hech qachon tekshirilmagan 'signal'ga ishonmang.",
        "Diversifikatsiya — barcha mablag'ni bitta aktivga qo'ymang.",
      ],
      [
        { question: "DYOR nimani anglatadi?", options: ["O'zingiz tadqiq qiling", "Do'stingizga ishon", "Faqat Telegram", "Hech narsa qilma"], correctIndex: 0 },
        { question: "Aksiya nima?", options: ["Kompaniya ulushi", "Davlat qarzi", "Faqat kripto", "Faqat o'yin"], correctIndex: 0 },
        { question: "Diversifikatsiya nima uchun kerak?", options: ["Xavfni kamaytirish", "Barcha pulni bitta joyga", "Faqat o'yin", "Soliqdan qochish"], correctIndex: 0 },
      ]),
    step("p2", 5, "Bozor turlari", "m6UFY6iCIak", "Spot, derivativlar va DeFi bozori.",
      [
        "Spot bozor — hozirgi narxda sotib olish/sotish (BTC/USDT).",
        "Futures — kelajakdagi narxga tikish; yuqori xavf — yangi boshlovchilar ehtiyot bo'lsin.",
        "DeFi (Decentralized Finance) — bank o'rnini smart-kontraktlar bosadi.",
        "Liquidity pool — foydalanuvchilar likvidlik beradi, foiz oladi.",
        "Har bir bozor turi turli xavf va bilim talab qiladi.",
      ],
      [
        { question: "Spot bozor nima?", options: ["Hozirgi narxda savdo", "Faqat kelajak tikish", "Faqat o'yin", "Faqat bank"], correctIndex: 0 },
        { question: "DeFi nimani anglatadi?", options: ["Markazsiz moliya", "Davlat banki", "Faqat Payme", "Faqat Instagram"], correctIndex: 0 },
        { question: "Futures yangi boshlovchi uchun?", options: ["Yuqori xavf — ehtiyot kerak", "Xavfsiz va oson", "Bepul pul", "Majburiy"], correctIndex: 0 },
      ]),
    step("p2", 6, "Investitsiya asoslari", "p8G8SilJEY8", "Uzoq muddatli fikrlash va risk boshqaruvi.",
      [
        "Faqat yo'qotishga tayyor mablag' bilan investitsiya qiling — qarz olib kripto olmang.",
        "Uzoq muddatli (HODL) strategiya ko'p investorlar uchun Bitcoin bilan ishlagan.",
        "Dollar-cost averaging (DCA) — har oy bir xil miqdor sotib olish, narx o'rtachalash.",
        "Emotsiya — FOMO va panik sotishdan qoching; reja tuzing.",
        "Ta'lim — avval o'rganing, keyin investitsiya; NAPP qoidalariga rioya qiling.",
      ],
      [
        { question: "DCA strategiyasi nima?", options: ["Muntazam bir xil miqdor sotib olish", "Bir martada hammasi", "Faqat o'yin", "Qarz olish"], correctIndex: 0 },
        { question: "FOMO nima?", options: ["O'tkazib yuborishdan qo'rquv — xato qaror", "Xavfsiz strategiya", "Bank xizmati", "Soliq turi"], correctIndex: 0 },
        { question: "Investitsiya oldin nima qilish kerak?", options: ["Ta'lim olish va reja tuzish", "Darhol sotib olish", "Telegram signallari", "Hech narsa"], correctIndex: 0 },
      ]),
  ],

  p4: [
    step("p4", 1, "Qiymat saqlash", "qFYXCHHcmwY", "Nega odamlar boylikni saqlashga harakat qiladi.",
      [
        "Kelajakdagi xarajatlar uchun pul yig'iladi — pensiya, ta'lim, favqulodda holat.",
        "Yaxshi xazina aktivining xususiyatlari: barqaror, likvid, qabul qilingan.",
        "Naqd pul inflatsiyadan eriydi — yig'ilgan mablag' qiymati vaqt o'tishi kamayishi mumkin.",
        "Oltin tarixan xazina aktiv sifatida tan olingan — fizik saqlash kerak.",
        "Bitcoin 'raqamli oltin' deb atalishi — cheklangan taklif va global uzatish.",
      ],
      [
        { question: "Xazina aktivining xususiyati?", options: ["Qiymatni uzoq saqlash qobiliyati", "Faqat o'yin", "Faqat tez sarflash", "Hech narsa"], correctIndex: 0 },
        { question: "Naqd pul xavfi?", options: ["Inflyatsiyadan qiymat yo'qotishi", "Juda ko'p foiz", "Faqat kripto", "Hech qanday"], correctIndex: 0 },
        { question: "Nega Bitcoin xazina sifatida tilga olinadi?", options: ["Cheklangan taklif va global uzatish", "Cheksiz chop", "Faqat o'yin", "Faqat bank"], correctIndex: 0 },
      ]),
    step("p4", 2, "Bitcoin va xazina", "F53mHXTa1sY", "Digital gold narrativi — afzallik va kamchilik.",
      [
        "Scarcity (kamchilik) — 21 million BTC cheklovi ta'minot tomondan qattiqlik yaratadi.",
        "Portativlik: million dollar qiymat USB-flashkada saqlash mumkin (kalitlar bilan).",
        "Bölünish: 1 BTC = 100 million satoshi — kichik miqdorlarda ishlatish mumkin.",
        "Volatillik hali yuqori — qisqa muddatli xazina sifatida oltindan farq qiladi.",
        "Institutsional investorlar Bitcoinni balansga qo'shishni ko'rib chiqmoqda.",
      ],
      [
        { question: "1 BTC necha satoshi?", options: ["100 million satoshi", "1000", "1 million", "Cheksiz"], correctIndex: 0 },
        { question: "Bitcoin xazina afzalligi?", options: ["Portativ va cheklangan taklif", "Cheksiz chop", "Faqat bankda", "Faqat qog'oz"], correctIndex: 0 },
        { question: "Qisqa muddatli xazina uchun Bitcoin xavfi?", options: ["Yuqori volatillik", "Hech qanday", "Faqat soliq", "Faqat o'yin"], correctIndex: 0 },
      ]),
    step("p4", 3, "Oltin vs Bitcoin", "-LdcrU2B93Q", "An'anaviy va raqamli xazina taqqoslash.",
      [
        "Oltin: 5000 yillik tarix, fizik aktiv, urush vaqtida ham qiymat saqlagan.",
        "Bitcoin: 2009-yildan, raqamli, internet orqali uzatiladi, saqlash arzonroq.",
        "Oltin markaziy banklar zaxirasida; Bitcoin hali institutsional qabul jarayonida.",
        "Ikkalasi ham taklif cheklangan aktivlar — inflatsiyaga qarshi himoya narrativi.",
        "Portfel diversifikatsiyasi: ikkalasi ham turli xavf profili bilan qo'shilishi mumkin.",
      ],
      [
        { question: "Oltin afzalligi?", options: ["Uzoq tarix va fizik ishonch", "Cheksiz miqdor", "Faqat internet", "Faqat o'yin"], correctIndex: 0 },
        { question: "Bitcoin uzatish afzalligi?", options: ["Internet orqali tez global uzatish", "Faqat pochta", "Faqat bank", "Faqat qo'lda"], correctIndex: 0 },
        { question: "Ikkala aktiv uchun umumiy narrativ?", options: ["Cheklangan taklif", "Cheksiz chop", "Faqat o'yin", "Hech narsa"], correctIndex: 0 },
      ]),
    step("p4", 4, "Bozor tahlili", "DaSBt0FWHa0", "Fundamental va texnik tahlil asoslari.",
      [
        "Fundamental tahlil — loyiha qiymati, jamoa, texnologiya, qo'llanilish.",
        "Texnik tahlil — grafik va tarixiy narx harakatlari (support/resistance).",
        "On-chain tahlil — blockchain ma'lumotlari: aktiv manzillar, oqimlar.",
        "Hech bir tahlil 100% bashorat bermaydi — xavf doim bor.",
        "Ta'lim maqsadida tahlil o'rganing; 'signal guru'ga ishonmang.",
      ],
      [
        { question: "Fundamental tahlil nimani ko'radi?", options: ["Loyiha qiymati va asoslari", "Faqat ranglar", "Faqat o'yin", "Faqat emoji"], correctIndex: 0 },
        { question: "On-chain tahlil nima?", options: ["Blockchain ma'lumotlarini tahlil", "Faqat video", "Faqat bank", "Faqat Instagram"], correctIndex: 0 },
        { question: "Tahlil haqida to'g'ri fikr?", options: ["100% kafolat bermaydi", "Har doim aniq", "Faqat o'yin", "Pul kafolati"], correctIndex: 0 },
      ]),
    step("p4", 5, "Makroiqtisod", "4bSw146jznA", "Global iqtisodiyot va kriptoga ta'sir.",
      [
        "Foiz stavkalari oshsa — riskli aktivlarga talab kamayishi mumkin.",
        "Dollar kuchaysa — global bozorda kripto narxi ta'sirlanishi mumkin.",
        "Geosiyosiy voqealar (urush, sanktsiya) Bitcoin xavfsiz aktiv narrativini kuchaytiradi.",
        "Recessiya — iqtisodiyot susayishi; investorlar xavfsiz aktivlarga o'tishi mumkin.",
        "Kripto hali an'anaviy bozorlar bilan bog'lanish rivojlanmoqda — korelatsiya o'zgaradi.",
      ],
      [
        { question: "Foiz stavkasi oshganda nima bo'lishi mumkin?", options: ["Riskli aktivlarga talab kamayishi", "Har doim BTC oshadi", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
        { question: "Makroiqtisodiyot nimani o'rganadi?", options: ["Butun iqtisodiyot katta ko'rinishda", "Faqat bitta hamyon", "Faqat o'yin", "Faqat video"], correctIndex: 0 },
        { question: "Geosiyosiy stressda investorlar?", options: ["Xavfsiz aktivlarga o'tishi mumkin", "Har doim sotadi", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
      ]),
    step("p4", 6, "Xavfsiz saqlash", "WIfMKnZe83Q", "Xazina aktivlarini himoya qilish usullari.",
      [
        "Sovuq hamyon (Ledger, Trezor) — uzoq muddatli saqlash uchun tavsiya etiladi.",
        "Issiq hamyon — kundalik tranzaksiya uchun qulay, lekin internet xavfi bor.",
        "Ko'p imzoli (multisig) hamyon — bir nechta kalit talab qiladi, xavfsizroq.",
        "Zaxira nusxa: seed phrase qog'ozda, xavfsiz joyda — bulutda EMAS.",
        "Merkezlashtirilgan birjada uzoq muddat saqlash tavsiya etilmaydi — 'Not your keys, not your coins'.",
      ],
      [
        { question: "Uzoq muddatli saqlash uchun?", options: ["Sovuq hamyon", "Birja hisobi faqat", "Telegram", "Email"], correctIndex: 0 },
        { question: "'Not your keys, not your coins' nimani anglatadi?", options: ["Kalit sizda bo'lmasa — tangalar ham sizniki emas", "Birja har doim xavfsiz", "Faqat o'yin", "Hech narsa"], correctIndex: 0 },
        { question: "Seed phrase qayerda saqlanmasligi kerak?", options: ["Bulut va onlayn chat", "Qog'oz zaxira", "Metall plastinka", "Xavfsiz seyf"], correctIndex: 0 },
      ]),
  ],

  p10: [
    step("p10", 1, "Qonuniy ishlash", "xaVaqhTEcbw", "O'zbekistonda kripto qoidalari va NAPP.",
      [
        "O'zbekistonda kripto faoliyati NAPP (Milliy agentlik) nazorati ostida tartibga solinmoqda.",
        "Litsenziyasiz platformalar va 'tez boylik' takliflaridan uzoq turing.",
        "KYC (Know Your Customer) — shaxsni tasdiqlash qonuniy operatsiya uchun talab.",
        "Kripto daromad soliq to'lash talablariga bo'ysunishi mumkin — hujjat saqlang.",
        "Faqat rasmiy va tushunarli kanallar orqali operatsiya qiling.",
      ],
      [
        { question: "O'zbekistonda kripto nazorati kimda?", options: ["NAPP", "FIFA", "Instagram", "Telegram guru"], correctIndex: 0 },
        { question: "KYC nima uchun kerak?", options: ["Shaxsni tasdiqlash va qonuniylik", "O'yin ochish", "Bepul BTC", "Hech narsa"], correctIndex: 0 },
        { question: "Litsenziyasiz platforma?", options: ["Xavfli — ishlatmaslik kerak", "Eng yaxshi", "Majburiy", "Bepul"], correctIndex: 0 },
      ]),
    step("p10", 2, "Birja va litsenziya", "WIfMKnZe83Q", "Qonuniy kripto birja va pul yechish.",
      [
        "Litsenziyali birja — davlat talablariga javob beradi, shaffof operatsiya.",
        "Pul yechish: bank kartasi yoki hisob raqamiga — KYC talab qilinadi.",
        "Komissiya va limitlar har bir platformada boshqacha — solishtiring.",
        "P2P savdo qo'shimcha ehtiyotkorlik talab qiladi — firibgarlik xavfi.",
        "Operatsiya tarixini saqlang — soliq va nizolar uchun kerak bo'ladi.",
      ],
      [
        { question: "Litsenziyali birja afzalligi?", options: ["Qonuniy va nazorat ostida", "Bepul pul", "Anonim", "Hech qanday qoida yo'q"], correctIndex: 0 },
        { question: "Pul yechishda odatda nima talab qilinadi?", options: ["KYC tasdiqlash", "Hech narsa", "Faqat Telegram", "Faqat o'yin"], correctIndex: 0 },
        { question: "P2P savdo xavfi?", options: ["Firibgarlik — ehtiyot kerak", "Xavfsiz va kafolat", "Majburiy", "Hech qanday"], correctIndex: 0 },
      ]),
    step("p10", 3, "Soliq va hisobot", "aSozFQytJCg", "Kripto daromad va soliq to'lash.",
      [
        "Kripto sotib olish/sotishdan foyda — soliq to'lash talabi bo'lishi mumkin.",
        "Har bir tranzaksiya tarixini saqlang: sana, miqdor, kurs, maqsad.",
        "Soliq deklaratsiyasi muddatlarini kuzating — kechikish jarima keltiradi.",
        "Hisobchi yoki soliq mutaxassisi bilan maslahat — murakkab holatlar uchun.",
        "Qonuniy to'lash — uzoq muddatda himoya va ishonch beradi.",
      ],
      [
        { question: "Nega tranzaksiya tarixi kerak?", options: ["Soliq hisobot va dalil uchun", "Faqat o'yin", "Hech narsa", "Faqat video"], correctIndex: 0 },
        { question: "Kripto foyda bo'lsa?", options: ["Soliq to'lash talabi bo'lishi mumkin", "Hech qachon soliq yo'q", "Faqat bank", "Faqat o'yin"], correctIndex: 0 },
        { question: "Qonuniy soliq to'lash?", options: ["Uzoq muddatda himoya beradi", "Kerak emas", "Xavfli", "Majburiy emas"], correctIndex: 0 },
      ]),
    step("p10", 4, "Depozit xavfsizligi", "yhuQnsJ4kuE", "Birjada mablag' saqlash xavflari.",
      [
        "Birja hacklari tarixda bo'lgan (Mt.Gox, FTX) — mablag'ni uzoq saqlamang.",
        "2FA majburiy yoqing — SMS yoki Google Authenticator.",
        "Kuchli parol va alohida email — birja uchun maxsus.",
        "Katta mablag' — sovuq hamyonga yechib oling muntazam.",
        "Insurance va proof-of-reserve — birja tanlashda tekshiring.",
      ],
      [
        { question: "Birja hack xavfi?", options: ["Tarixda bo'lgan — ehtiyot kerak", "Hech qachon bo'lmagan", "Faqat o'yin", "Faqat bank"], correctIndex: 0 },
        { question: "2FA nima beradi?", options: ["Qo'shimcha xavfsizlik qatlami", "Bepul BTC", "Hech narsa", "Faqat video"], correctIndex: 0 },
        { question: "Katta mablag' qayerda saqlash yaxshi?", options: ["Sovuq hamyon", "Birjada abadiy", "Telegram", "Email"], correctIndex: 0 },
      ]),
    step("p10", 5, "Psixologiya va risk", "SCl-Ije6O-c", "Emotsiyali qarorlar va FOMO.",
      [
        "FOMO — boshqalar boyayotganini ko'rib xato sotib olish.",
        "Panik sotish — narx tushganda qo'rquv bilan zarar realizatsiya.",
        "Revenge trading — yo'qotishni tez qoplashga urinish, yanada katta xato.",
        "Reja tuzing: qancha investitsiya, qachon sotish, qancha yo'qotishga tayyor.",
        "Emotsiyasiz qaror — ta'lim va reja eng yaxshi himoya.",
      ],
      [
        { question: "FOMO nima?", options: ["O'tkazib yuborish qo'rquvi — xato qaror", "Xavfsiz strategiya", "Bank xizmati", "Soliq"], correctIndex: 0 },
        { question: "Panik sotish?", options: ["Qo'rquv bilan zarar realizatsiya", "Eng yaxshi strategiya", "Majburiy", "Faqat o'yin"], correctIndex: 0 },
        { question: "Emotsiyadan himoya?", options: ["Oldindan reja tuzish", "Telegram signallari", "Har kuni yangi coin", "Qarz olish"], correctIndex: 0 },
      ]),
    step("p10", 6, "Keng tarqalgan xatolar", "Faz_6Zdo4Zk", "Cheklovlar va xavfsizlik qoidalari.",
      [
        "Seed phrase hech kimga bermang — 'support' ham so'ramaydi.",
        "'Kafolatli 100x' takliflar — 100% scam.",
        "Faqat rasmiy ilova va sayt — App Store / rasmiy domen.",
        "Leverage (qaldiroq) yangi boshlovchi uchun xavfli — katta yo'qotish.",
        "Ta'lim tugagach ham yangiliklarni kuzating — kripto tez o'zgaradi.",
      ],
      [
        { question: "Seed phrase'ni kim so'rashi mumkin?", options: ["Hech kim — 100% scam", "Bank xodimi", "Support email", "Do'st"], correctIndex: 0 },
        { question: "'100x kafolat' taklifi?", options: ["Scam — ishonmang", "Ishonchli", "Davlat dasturi", "Majburiy"], correctIndex: 0 },
        { question: "Yangi boshlovchi uchun leverage?", options: ["Juda xavfli", "Xavfsiz", "Majburiy", "Bepul"], correctIndex: 0 },
      ]),
  ],
};
