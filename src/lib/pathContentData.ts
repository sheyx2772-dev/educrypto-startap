import type { PathNodeContent } from "./pathContent";

/** Simple Bitcoin uslubida: qisqa dars → tekshiruv → interaktiv o'yin */
export const pathContentById: Record<string, PathNodeContent> = {
  p1: {
    guide: [
      {
        title: "Crypto ko'prik yo'li nima?",
        points: [
          "66 ta taxtacha: darslar va kerakli demo o'yinlar — Simple Bitcoin kabi o'qing, mukofot oling.",
          "Dars taxtachasi: qo'llanma → test. Keyingi demo taxtachada o'yin.",
          "Yog'och taxtachadan tilla gishtga o'ting, sovg'alar va NAPP sertifikatlarini oching.",
        ],
      },
      {
        title: "Qanday mukofot olasiz?",
        points: [
          "Har bosqichda USDT stablecoin qo'shiladi.",
          "Sovg'a sandiqlari katta bonus beradi.",
          "3 ta NAPP sertifikat: boshlang'ich, ilg'or va AI daraja.",
        ],
      },
      {
        title: "Boshlash",
        points: [
          "Video darsliklar bilan birga o'qing.",
          "Testdan 70% dan oshiq ball bilan o'ting.",
          "Do'stingizni taklif qilib qo'shimcha USDT oling!",
        ],
      },
    ],
    quiz: [
      {
        question: "Ko'prik yo'lida dars taxtachasida nima bajariladi?",
        options: ["Qo'llanma va test", "Faqat o'yin", "Faqat to'lov", "Hech narsa"],
        correctIndex: 0,
      },
      {
        question: "Testdan o'tish uchun necha foiz kerak?",
        options: ["70%", "30%", "100%", "0%"],
        correctIndex: 0,
      },
      {
        question: "NAPP sertifikatlari qayerda beriladi?",
        options: ["Maxsus sertifikat bosqichlarida", "Birinchi kundan", "Faqat to'lovdan keyin", "Hech qachon"],
        correctIndex: 0,
      },
    ],
    game: {
      type: "interactive",
      interactiveId: "kripto-sotib-ol",
      title: "Kripto-Sotib Ol: Hisob-kitob Ustasi",
    },
  },

  p2: {
    guide: [
      {
        title: "Pulning vazifasi",
        points: [
          "Pul — almashuv vositasi: narsa va xizmatlarni sotib olish uchun.",
          "Hisob birligi: narxlarni ifodalash (so'm, dollar).",
          "Qiymat saqlash: kelajakda ishlatish uchun saqlash.",
        ],
      },
      {
        title: "Pul tarixi",
        points: [
          "Avval tovar pul (tuz, qo'zi) ishlatilgan.",
          "Keyin metall tangalar va qog'oz pullar paydo bo'lgan.",
          "Bugun raqamli pul va kripto tangalar mavjud.",
        ],
      },
      {
        title: "Nima uchun muhim?",
        points: [
          "Kripto tushunish uchun avval pul nima ekanini bilish kerak.",
          "Inflyatsiya pul qiymatini pasaytirishi mumkin.",
          "Yaxshi pul barqaror va ishonchli bo'lishi kerak.",
        ],
      },
    ],
    quiz: [
      {
        question: "Pulning uchta asosiy vazifasidan biri qaysi?",
        options: ["Almashuv vositasi", "Faqat bezak", "Faqat o'yin", "Hech narsa"],
        correctIndex: 0,
      },
      {
        question: "Inflyatsiya nima?",
        options: ["Narxlar oshishi", "Pul ko'payishi", "Tanga yig'ish", "Bank yopilishi"],
        correctIndex: 0,
      },
      {
        question: "Zamonaviy pul qanday shakllarda bo'ladi?",
        options: ["Naqd, raqamli va kripto", "Faqat qog'oz", "Faqat oltin", "Faqat tuz"],
        correctIndex: 0,
      },
    ],
    game: {
      type: "interactive",
      interactiveId: "kripto-sayohat",
      title: "Kripto-Sayohat — 40 katakli Blockchain yo'li",
    },
  },

  p3: {
    guide: [
      {
        title: "Tanga nima?",
        points: [
          "Tanga — belgilangan qiymatga ega pul birligi.",
          "Milliy valyuta: so'm, dollar, yevro.",
          "Kripto tanga: Bitcoin, USDT va boshqalar.",
        ],
      },
      {
        title: "Raqamli tanga",
        points: [
          "Kripto tangalar blokcheynda yaratiladi va saqlanadi.",
          "Har tanga o'z tarmog'iga ega bo'lishi mumkin.",
          "Stablecoin — barqaror qiymatli tanga (USDT).",
        ],
      },
      {
        title: "Farqlar",
        points: [
          "Fiat tanga hukumat tomonidan chiqariladi.",
          "Kripto tanga markazsiz tarmoqda ishlaydi.",
          "Har ikkisi ham raqamli ko'rinishda mavjud.",
        ],
      },
    ],
    quiz: [
      {
        question: "USDT qanday turdagi tanga?",
        options: ["Stablecoin", "O'yin tangasi", "Faqat naqd", "Oltin tangasi"],
        correctIndex: 0,
      },
      {
        question: "Kripto tanga qayerda saqlanadi?",
        options: ["Blokcheynda", "Faqat bankda", "Faqat qog'ozda", "Pochta orqali"],
        correctIndex: 0,
      },
      {
        question: "Fiat tanga kim tomonidan chiqariladi?",
        options: ["Hukumat / markaziy bank", "Faqat shaxs", "Hech kim", "Faqat AI"],
        correctIndex: 0,
      },
    ],
    game: {
      type: "interactive",
      interactiveId: "tanga",
      title: "Tanga Top — fiat, kripto, stablecoin saralash",
    },
  },

  p4: {
    guide: [
      {
        title: "Xazina — qiymat saqlash",
        points: [
          "Odamlar pulni kelajakda ishlatish uchun saqlaydi.",
          "Yaxshi xazina qiymatini uzoq saqlashi kerak.",
          "Oltin tarixan xazina sifatida ishlatilgan.",
        ],
      },
      {
        title: "Zamonaviy xazina",
        points: [
          "Bank depozitlari va obligatsiyalar.",
          "Kripto — yangi xazina shakli (Bitcoin).",
          "Stablecoin qisqa muddatli xazina bo'lishi mumkin.",
        ],
      },
      {
        title: "Xavflar",
        points: [
          "Inflyatsiya xazina qiymatini kamaytiradi.",
          "Kripto narxi o'zgaruvchan bo'lishi mumkin.",
          "Diversifikatsiya — xavfni kamaytiradi.",
        ],
      },
    ],
    quiz: [
      {
        question: "Xazina vazifasi nima?",
        options: ["Qiymatni saqlash", "Faqat sarflash", "Faqat yig'ish", "Hech narsa"],
        correctIndex: 0,
      },
      {
        question: "Inflyatsiya xazinaga qanday ta'sir qiladi?",
        options: ["Qiymatni pasaytiradi", "Qiymatni oshiradi", "Ta'sir qilmaydi", "Faqat oltinni oshiradi"],
        correctIndex: 0,
      },
      {
        question: "Bitcoin nima sifatida ko'riladi?",
        options: ["Raqamli xazina", "Faqat to'lov tizimi", "Faqat o'yin", "Hech narsa"],
        correctIndex: 0,
      },
    ],
    game: {
      type: "order",
      title: "Xazina tanlash tartibi",
      steps: ["Maqsadni aniqlash", "Xavfni baholash", "Muddatni belgilash", "Aktiv tanlash"],
    },
  },

  p5: {
    guide: [
      {
        title: "Blokcheyn asoslari",
        points: [
          "Blokcheyn — tranzaksiyalar yozilgan zanjirli daftar.",
          "Har blok oldingi blok bilan bog'langan.",
          "Ma'lumotlar ko'p kompyuterlarda nusxalanadi.",
        ],
      },
      {
        title: "Nega ishonchli?",
        points: [
          "O'zgartirish juda qiyin — hammaga ko'rinadi.",
          "Markaziy serverga bog'liq emas.",
          "Kriptografiya ma'lumotni himoya qiladi.",
        ],
      },
      {
        title: "Qo'llanilishi",
        points: [
          "Bitcoin va boshqa kripto tangalar.",
          "Smart-kontraktlar va DeFi.",
          "Ta'lim sertifikatlari (NAPP).",
        ],
      },
    ],
    quiz: [
      {
        question: "Blokcheyn nima?",
        options: ["Zanjirli tranzaksiyalar daftari", "Oddiy bank hisobi", "O'yin platformasi", "Ijtimoiy tarmoq"],
        correctIndex: 0,
      },
      {
        question: "Decentralizatsiya nimani anglatadi?",
        options: ["Markazsiz tarmoq", "Bitta bank boshqaradi", "Faqat hukumat", "Hech kim ko'rmaydi"],
        correctIndex: 0,
      },
      {
        question: "Bloklar qanday bog'langan?",
        options: ["Zanjir bo'ylab ketma-ket", "Tasodifiy", "Faqat telefon orqali", "Hech qanday"],
        correctIndex: 0,
      },
    ],
    game: {
      type: "interactive",
      interactiveId: "blockchain",
      title: "Blokchain Zanjiri — maydonlarni tartibga soling",
    },
  },

  p6: {
    guide: [
      {
        title: "Kripto miflari I",
        points: [
          "Mif: 'Kripto — faqat firibgarlik'. Haqiqat: texnologiya qonuniy loyihalarda ishlatiladi.",
          "Mif: 'Bitcoin anonim'. Haqiqat: pseudonim — tranzaksiyalar ko'rinadi.",
          "Mif: 'Kripto tez boyitadi'. Haqiqat: xavf bor, o'rganish kerak.",
        ],
      },
      {
        title: "Haqiqatlar",
        points: [
          "Kripto — yangi moliya texnologiyasi.",
          "NAPP O'zbekistonda tartibga soladi.",
          "Ta'lim va ehtiyotkorlik muhim.",
        ],
      },
      {
        title: "O'zingiz tekshiring",
        points: [
          "Ishonchli manbalardan o'qing.",
          "Rasmiy qonunlarga rioya qiling.",
          "Shubhali takliflardan uzoq turing.",
        ],
      },
    ],
    quiz: [
      {
        question: "Kripto haqida eng to'g'ri fikr qaysi?",
        options: ["Texnologiya, lekin xavf bor", "Har doim xavfsiz boylik", "Faqat firibgarlik", "Hech qanday qoida yo'q"],
        correctIndex: 0,
      },
      {
        question: "NAPP vazifasi nima?",
        options: ["Bozorni tartibga solish", "Bepul pul berish", "O'yin yaratish", "Hech narsa"],
        correctIndex: 0,
      },
      {
        question: "Bitcoin tranzaksiyalari qanday?",
        options: ["Ommaviy daftarda ko'rinadi", "Butunlay yashirin", "Faqat bankda", "Hech qayerda"],
        correctIndex: 0,
      },
    ],
    game: {
      type: "interactive",
      interactiveId: "myth",
      title: "Scam Dedektivi — firibgarliklarni aniqlang",
    },
  },

  p7: {
    guide: [
      {
        title: "Mayning nima?",
        points: [
          "Mayning — tranzaksiyalarni tasdiqlash va blok yaratish.",
          "Maxsus kompyuterlar murakkab masalalarni yechadi.",
          "Mukofot sifatida yangi tanga chiqariladi.",
        ],
      },
      {
        title: "Proof of Work",
        points: [
          "Bitcoin PoW tizimida ishlaydi.",
          "Energiya sarflanadi — xavfsizlik uchun.",
          "Maynerlar tarmoqni himoya qiladi.",
        ],
      },
      {
        title: "O'zbekiston konteksti",
        points: [
          "Mayning qonuniy chegaralar mavjud.",
          "NAPP qoidalari bilan tanishing.",
          "Uy sharoitida mayning qiyin bo'lishi mumkin.",
        ],
      },
    ],
    quiz: [
      {
        question: "Mayning asosiy vazifasi?",
        options: ["Tranzaksiyalarni tasdiqlash", "Faqat o'yin o'ynash", "Pul chop etish", "Video yuklash"],
        correctIndex: 0,
      },
      {
        question: "Bitcoin qaysi tizimda ishlaydi?",
        options: ["Proof of Work", "Faqat bank", "Faqat qog'oz", "Hech qanday"],
        correctIndex: 0,
      },
      {
        question: "Maynerlar nima oladi?",
        options: ["Blok mukofoti", "Bepul uy", "Faqat sertifikat", "Hech narsa"],
        correctIndex: 0,
      },
    ],
    game: {
      type: "interactive",
      interactiveId: "mining",
      title: "Crypto mayning rig — demo mayning",
    },
  },

  p8: {
    guide: [
      {
        title: "Hamyon turlari",
        points: [
          "Hot wallet — internetga ulangan, tez ishlatish uchun.",
          "Cold wallet — oflayn, uzoq muddatli saqlash.",
          "Birjalar ham hamyon vazifasini bajaradi.",
        ],
      },
      {
        title: "Kalitlar",
        points: [
          "Public key — manzilingiz (pul qabul qilish).",
          "Private key — maxfiy kalit, HECH KIMGA bermang!",
          "Seed phrase — 12-24 so'z, hamyonni tiklash uchun.",
        ],
      },
      {
        title: "Xavfsizlik",
        points: [
          "2FA yoqing.",
          "Katta summalarni cold walletda saqlang.",
          "Phishing havolalaridan ehtiyot bo'ling.",
        ],
      },
    ],
    quiz: [
      {
        question: "Private key nima?",
        options: ["Maxfiy kirish kaliti", "Ommaviy manzil", "Telefon raqami", "Parol tiklash"],
        correctIndex: 0,
      },
      {
        question: "Cold wallet afzalligi?",
        options: ["Oflayn xavfsizlik", "Tezroq internet", "Bepul tanga", "Hech narsa"],
        correctIndex: 0,
      },
      {
        question: "Seed phrase nima uchun kerak?",
        options: ["Hamyonni tiklash", "Video ko'rish", "O'yin o'ynash", "Hech narsa"],
        correctIndex: 0,
      },
    ],
    game: {
      type: "interactive",
      interactiveId: "wallet",
      title: "Hamyonlar demo — tanlash, yaratish, yuborish",
    },
  },

  p9: {
    guide: [
      {
        title: "Sovg'a sandig'i!",
        points: [
          "Asosiy yo'lning birinchi mukofoti — tabriklaymiz!",
          "Sandiqni ochib USDT bonus oling.",
          "Do'stingizni taklif qilib qo'shimcha 10 USDT olishingiz mumkin.",
        ],
      },
      {
        title: "Taklif mukofoti",
        points: [
          "Do'stingiz ro'yxatdan o'tsa — ikkalangiz mukofot olasiz.",
          "Taklif havolasini ulashing.",
          "Simple Bitcoin kabi o'rganishni tarqating!",
        ],
      },
      { title: "Davom eting", points: ["Keyingi bosqich: Cheklovlar", "Xavfsizlik qoidalarini o'rganing", "Boshlang'ich sertifikatga yaqinlashyapsiz!"] },
    ],
    quiz: [
      {
        question: "Sovg'a sandig'i qachon ochiladi?",
        options: ["Oldingi bosqichlar tugaganda", "Ro'yxatdan oldin", "Hech qachon", "Faqat to'lovdan keyin"],
        correctIndex: 0,
      },
      {
        question: "Do'stni taklif qilish nima beradi?",
        options: ["Qo'shimcha USDT mukofot", "Bepul iPhone", "Hech narsa", "Faqat badge"],
        correctIndex: 0,
      },
      { question: "Keyingi mavzu?", options: ["Cheklovlar va xavfsizlik", "Faqat o'yin", "Hech narsa", "Chiqish"], correctIndex: 0 },
    ],
    game: {
      type: "chest",
      title: "🎁 Sovg'a sandig'ini oching!",
      statements: [
        { text: "Sandiqni bosing — 1/3", correct: true },
        { text: "Yana bosing — 2/3", correct: true },
        { text: "Oxirgi bosish — oching!", correct: true },
      ],
    },
  },

  p10: {
    guide: [
      {
        title: "Risk cheklovlari",
        points: [
          "Faqat yo'qotishga tayyor summani invest qiling.",
          "Bir joyga bog'lanmang — diversifikatsiya.",
          "Leverage (qarz) xavfini tushuning.",
        ],
      },
      {
        title: "NAPP qoidalari",
        points: [
          "Litsenziyali platformalardan foydalaning.",
          "Soliq va hisobot talablariga rioya qiling.",
          "Shubhali ICO va 'tez boylik' takliflaridan uzoq turing.",
        ],
      },
      {
        title: "Xavfsiz o'rganish",
        points: [
          "Ta'lim birinchi — investitsiya keyin.",
          "Ikki faktorli autentifikatsiya majburiy.",
          "Shaxsiy kalitlarni hech kimga bermang.",
        ],
      },
    ],
    quiz: [
      {
        question: "Investitsiya qoidasi #1?",
        options: ["Faqat yo'qotishga tayyor pul", "Hammasini tikish", "Qarz olish", "Hech narsa"],
        correctIndex: 0,
      },
      {
        question: "NAPP nima uchun kerak?",
        options: ["Bozorni tartibga solish", "Pul berish", "O'yin", "Hech narsa"],
        correctIndex: 0,
      },
      {
        question: "Private key bilan nima qilish kerak?",
        options: ["Maxfiy saqlash", "Telegramda ulashish", "E-mail yuborish", "E'lon qilish"],
        correctIndex: 0,
      },
    ],
    game: {
      type: "interactive",
      interactiveId: "kripto-koinot",
      title: "Kripto-Koinot: Simulyator — orbita fizikasi",
    },
  },

  p11: {
    guide: [
      {
        title: "Boshlang'ich sertifikat",
        points: [
          "Asosiy yo'l bosqichlarini muvaffaqiyatli tugatdingiz!",
          "NAPP boshlang'ich daraja sertifikatini olish vaqti.",
          "PDF yuklab oling va profilga qo'shing.",
        ],
      },
      {
        title: "Nima o'rgandingiz?",
        points: ["Pul, tanga va blokcheyn asoslari", "Hamyon va xavfsizlik", "Mayning va miflar haqida haqiqat"],
      },
      { title: "Keyingi qadam", points: ["Rivojlanish bo'limiga o'ting", "Lightning va DeFi o'rganing", "Ilg'or sertifikatga intiling"] },
    ],
    quiz: [
      {
        question: "Boshlang'ich sertifikat nimani tasdiqlaydi?",
        options: ["Crypto asoslarini o'zlashtirish", "Professional treyderlik", "Bank direktori", "Hech narsa"],
        correctIndex: 0,
      },
      {
        question: "Sertifikatni qanday olish mumkin?",
        options: ["Vazifalarni tugatib PDF yuklab olish", "Faqat pul to'lash", "Hech qanday", "Tasodifiy"],
        correctIndex: 0,
      },
      { question: "Keyingi bo'lim?", options: ["Rivojlanish", "Hech qayer", "Faqat do'kon", "Chiqish"], correctIndex: 0 },
    ],
    game: {
      type: "order",
      title: "Sertifikat olish tartibi",
      steps: ["Barcha bosqichlarni tugatish", "Testdan 70% o'tish", "O'yinni bajarish", "NAPP PDF yuklab olish"],
    },
  },

  // ─── RIVOJLANISH ───
  p12: {
    guide: [
      { title: "Texnologiya investori", points: ["Blockchain — uzoq muddatli texnologiya", "Erkin investitsiya o'rniga avval o'rganing", "Loyiha jamoasi va texnologiyani baholang"] },
      { title: "DYOR prinsipi", points: ["Do Your Own Research — o'zingiz tekshiring", "Whitepaper o'qing", "Jamoa ijtimoiy tarmoqlarini ko'ring"] },
      { title: "Portfolio", points: ["Bitcoin — asosiy aktiv sifatida", "Altcoinlar — yuqori xavf", "Stablecoin — barqaror qism"] },
    ],
    quiz: [
      { question: "DYOR nimani anglatadi?", options: ["O'zingiz tadqiq qiling", "Boshqalarga ishon", "Hech narsa qilma", "Faqat video"], correctIndex: 0 },
      { question: "Whitepaper nima?", options: ["Loyiha hujjati", "O'yin qoidasi", "Bank cheki", "Hech narsa"], correctIndex: 0 },
      { question: "Eng xavfsiz yondashuv?", options: ["Avval o'rganish", "Hammasini tikish", "Qarz olish", "Hech narsa"], correctIndex: 0 },
    ],
    game: {
      type: "interactive",
      interactiveId: "kripto-shahar",
      title: "Kripto Shahar — O'z kripto karyerangni qur",
    },
  },

  p13: {
    guide: [
      { title: "Miflar II — murakkab", points: ["'Kripto yo'q qilinadi' — texnologiya rivojlanmoqda", "'Faqat jinoyatchilar ishlatadi' — qonuniy loyihalar ko'p", "'Energiya behuda' — xavfsizlik uchun sarflanadi"] },
      { title: "Haqiqatlar", points: ["Davlatlar qonun chiqarmoqda", "Institutsional investorlar kiryapti", "Ta'lim loyihalari ko'paymoqda"] },
      { title: "Tanqidiy fikrlash", points: ["Har ikkala tomondan o'qing", "Manbani tekshiring", "Emotsiyaga emas, faktlarga qarang"] },
    ],
    quiz: [
      { question: "Kripto bozori qanday rivojlanmoqda?", options: ["Qonuniy va institutsional", "To'xtab qolgan", "Yo'q qilingan", "Hech qanday"], correctIndex: 0 },
      { question: "Energiya sarfi nima uchun?", options: ["Tarmoq xavfsizligi", "Behuda", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
      { question: "To'g'ri yondashuv?", options: ["Faktlarga asoslanish", "Faqat mish-mish", "Hech narsa", "Faqat reklama"], correctIndex: 0 },
    ],
    game: { type: "interactive", interactiveId: "myth", title: "Murakkab miflar — interaktiv tekshiruv" },
  },

  p14: {
    guide: [
      { title: "Lightning Network", points: ["Bitcoin ustida tez to'lov qatlami", "Kichik to'lovlar uchun ideal", "Kanallar orqali ishlaydi"] },
      { title: "Afzalliklar", points: ["Past komissiya", "Tez tranzaksiya", "Mikroto'lovlar mumkin"] },
      { title: "Cheklovlar", points: ["Kanal ochish kerak", "Hali rivojlanmoqda", "O'rganish talab qiladi"] },
    ],
    quiz: [
      { question: "Lightning nima uchun kerak?", options: ["Tez va arzon to'lovlar", "Mayning", "Faqat o'yin", "Hech narsa"], correctIndex: 0 },
      { question: "Lightning qaysi tarmoq ustida?", options: ["Bitcoin", "Faqat bank", "Hech qanday", "Faqat Ethereum"], correctIndex: 0 },
      { question: "Asosiy afzallik?", options: ["Past komissiya", "Yuqori komissiya", "Sekin", "Hech narsa"], correctIndex: 0 },
    ],
    game: { type: "order", title: "Lightning to'lov tartibi", steps: ["Kanal ochish", "To'lov yuborish", "Tasdiqlash", "Mukofot / qabul"] },
  },

  p15: {
    guide: [
      { title: "Rivojlanish sovg'asi!", points: ["Lightning va miflar bo'limini tugatdingiz", "Bonus USDT sandig'i ochiladi", "Do'stni taklif qiling!"] },
      { title: "Taklif", points: ["Havolani ulashing", "Birgalikda o'rganing", "Mukofot ikkalangizga"] },
      { title: "Davom", points: ["Yangi aktivlar bo'limi", "DeFi bilan tanishing", "Ilg'or sertifikatga yaqin"] },
    ],
    quiz: [
      { question: "Sovg'a qachon?", options: ["Bo'lim vazifalari tugaganda", "Hech qachon", "Faqat to'lov", "Tasodifiy"], correctIndex: 0 },
      { question: "Taklif foydasi?", options: ["Qo'shimcha USDT", "Hech narsa", "Faqat reklama", "Jarima"], correctIndex: 0 },
      { question: "Keyingi mavzu?", options: ["Yangi aktiv I", "Faqat chiqish", "Hech narsa", "Do'kon"], correctIndex: 0 },
    ],
    game: { type: "chest", title: "🎁 Rivojlanish mukofoti!", statements: [{ text: "1-bosish", correct: true }, { text: "2-bosish", correct: true }, { text: "Sandiqni oching!", correct: true }] },
  },

  p16: {
    guide: [
      { title: "Yangi aktivlar I", points: ["Altcoin — Bitcoin dan boshqa tangalar", "Har biri turli maqsadga ega", "Ethereum — smart-kontrakt platformasi"] },
      { title: "Token vs Coin", points: ["Coin — o'z blokcheyni", "Token — boshqa tarmoqda", "USDT ko'pincha token"] },
      { title: "Xavf", points: ["Ko'p loyihalar muvaffaqiyatsiz", "Tadqiqotsiz kirmang", "Faqat tushunganlaringizga invest qiling"] },
    ],
    quiz: [
      { question: "Altcoin nima?", options: ["Bitcoin dan boshqa tanga", "Faqat Bitcoin", "Faqat bank", "Hech narsa"], correctIndex: 0 },
      { question: "Ethereum nima?", options: ["Smart-kontrakt platformasi", "Faqat o'yin", "Bank", "Hech narsa"], correctIndex: 0 },
      { question: "Token farqi?", options: ["Boshqa tarmoqda yaratiladi", "O'z blokcheyni", "Faqat naqd", "Hech narsa"], correctIndex: 0 },
    ],
    game: { type: "interactive", interactiveId: "asset", title: "Yangi aktivlar — tadqiq va tanlash demo" },
  },

  p17: {
    guide: [
      { title: "Buzuvchi to'lovlar I", points: ["An'anaviy to'lovlar sekin va qimmat", "Kripto 24/7 ishlaydi", "Xalqaro o'tkazmalar tezlashmoqda"] },
      { title: "Stablecoin to'lovlari", points: ["USDT — barqaror qiymat", "Kichik bizneslar qabul qilmoqda", "Komissiya pastroq bo'lishi mumkin"] },
      { title: "Kelajak", points: ["CBDC — raqamli milliy valyutalar", "Kripto va bank birga ishlaydi", "O'zbekiston ham rivojlanmoqda"] },
    ],
    quiz: [
      { question: "Kripto to'lov afzalligi?", options: ["24/7 va tez", "Faqat ish kuni", "Juda qimmat", "Hech narsa"], correctIndex: 0 },
      { question: "USDT to'lovda nima uchun qulay?", options: ["Barqaror qiymat", "Har kuni o'zgaradi", "Faqat o'yin", "Hech narsa"], correctIndex: 0 },
      { question: "CBDC nima?", options: ["Raqamli milliy valyuta", "O'yin tangasi", "Hech narsa", "Faqat Bitcoin"], correctIndex: 0 },
    ],
    game: { type: "interactive", interactiveId: "payment", title: "Buzuvchi to'lovlar — qonuniy yo'l tanlash" },
  },

  p18: {
    guide: [
      { title: "To'lovlar sovg'asi!", points: ["To'lovlar bo'limi mukofoti", "Sandiqni oching", "Do'stni taklif qiling"] },
      { title: "Nima o'rgandingiz?", points: ["Stablecoin to'lovlari", "Xalqaro o'tkazmalar", "CBDC tushunchasi"] },
      { title: "Davom", points: ["Yangi aktiv II", "DeFi chuqurroq", "Ilg'or sertifikat"] },
    ],
    quiz: [
      { question: "Mukofot turi?", options: ["USDT bonus", "Faqat badge", "Hech narsa", "Jarima"], correctIndex: 0 },
      { question: "Taklif orqali?", options: ["Qo'shimcha USDT", "Hech narsa", "Faqat reklama", "To'lov"], correctIndex: 0 },
      { question: "Keyingi?", options: ["Yangi aktiv II", "Chiqish", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
    ],
    game: { type: "chest", title: "🎁 To'lovlar mukofoti!", statements: [{ text: "Tayyorman!", correct: true }, { text: "Ochish...", correct: true }, { text: "Mukofotni oling!", correct: true }] },
  },

  p19: {
    guide: [
      { title: "Yangi aktivlar II — DeFi", points: ["DeFi — markazsiz moliya", "Lending, staking, swap", "Smart-kontraktlar asosida"] },
      { title: "Staking", points: ["Tangalarni blokirovka qilish", "Mukofot olish", "Tarmoq xavfsizligiga yordam"] },
      { title: "Xavflar", points: ["Smart-kontrakt xatolari", "Impermanent loss", "Faqat tushunganlaringizda ishtirok eting"] },
    ],
    quiz: [
      { question: "DeFi nima?", options: ["Markazsiz moliya", "Oddiy bank", "Faqat o'yin", "Hech narsa"], correctIndex: 0 },
      { question: "Staking nima?", options: ["Tanga blokirovka + mukofot", "Faqat sotib olish", "Hech narsa", "Faqat mayning"], correctIndex: 0 },
      { question: "DeFi xavfi?", options: ["Smart-kontrakt xatolari", "Xavfsiz 100%", "Hech qanday", "Faqat bonus"], correctIndex: 0 },
    ],
    game: { type: "match", title: "DeFi atamalari", pairs: [{ term: "DeFi", def: "Markazsiz moliya" }, { term: "Staking", def: "Tanga blokirovka" }, { term: "Swap", def: "Tangalar almashinuvi" }] },
  },

  p20: {
    guide: [
      { title: "Buzuvchi to'lovlar II", points: ["Global remittance — arzon o'tkazmalar", "Xalqaro savdo tezlashmoqda", "Stablecoin — ko'prik vazifasi"] },
      { title: "O'zbekiston", points: ["NAPP litsenziyali operatorlar", "Qonuniy yo'l bilan ishlash", "Ta'lim va sertifikat muhim"] },
      { title: "Kelajak trendlari", points: ["Instant settlement", "Cross-border stablecoin", "Bank + kripto integratsiyasi"] },
    ],
    quiz: [
      { question: "Remittance nima?", options: ["Xalqaro pul o'tkazmasi", "Faqat mahalliy", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
      { question: "Stablecoin roli?", options: ["Barqaror ko'prik", "Faqat o'yin", "Hech narsa", "Faqat mayning"], correctIndex: 0 },
      { question: "O'zbekistonda qanday ishlash kerak?", options: ["NAPP qoidalariga rioya", "Qonunsiz", "Hech qanday", "Faqat chet el"], correctIndex: 0 },
    ],
    game: { type: "interactive", interactiveId: "payment", title: "Global to'lovlar — xavfsiz kanal tanlash" },
  },

  p21: {
    guide: [
      { title: "Ilg'or sertifikat", points: ["Rivojlanish bo'limi tugadi!", "Lightning, DeFi, to'lovlar o'zlashtirildi", "NAPP ilg'or daraja PDF"] },
      { title: "Ko'nikmalar", points: ["Texnologiya tahlili", "DeFi asoslari", "Global to'lov trendlari"] },
      { title: "Keyingi", points: ["Iqtisodiyot bo'limi", "Soliq va innovatsiyalar", "AI va kelajak"] },
    ],
    quiz: [
      { question: "Ilg'or sertifikat nimani ko'rsatadi?", options: ["Rivojlanish bosqichini tugatish", "Faqat boshlang'ich", "Hech narsa", "Faqat to'lov"], correctIndex: 0 },
      { question: "DeFi nima edi?", options: ["Markazsiz moliya", "Bank", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
      { question: "Keyingi bo'lim?", options: ["Iqtisodiyot", "Hech qayer", "Chiqish", "Faqat do'kon"], correctIndex: 0 },
    ],
    game: { type: "order", title: "Ilg'or sertifikat tartibi", steps: ["Rivojlanish vazifalarini tugatish", "Testdan o'tish", "O'yinni bajarish", "NAPP PDF yuklab olish"] },
  },

  // ─── IQTISODIYOT ───
  p22: {
    guide: [
      { title: "Kripto iqtisodchi", points: ["Kripto bozori — talab va taklif qonuni", "Halving — Bitcoin taklifini kamaytiradi", "Bozor tsikllari mavjud"] },
      { title: "Tahlil", points: ["Fundamental — loyiha qiymati", "Texnik — grafik tahlil", "On-chain — blokcheyn ma'lumotlari"] },
      { title: "Maslahat", points: ["Emotsiyasiz qaror", "Uzoq muddatli fikrlash", "Ta'lim davom etadi"] },
    ],
    quiz: [
      { question: "Talab oshsa nima bo'ladi?", options: ["Narx ko'tarilishi mumkin", "Narx har doim tushadi", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
      { question: "Halving nima?", options: ["Taklif kamayishi", "Narx oshishi", "Hech narsa", "Faqat soliq"], correctIndex: 0 },
      { question: "On-chain tahlil?", options: ["Blokcheyn ma'lumotlari", "Faqat mish-mish", "Hech narsa", "Faqat video"], correctIndex: 0 },
    ],
    game: { type: "match", title: "Iqtisodiyot atamalari", pairs: [{ term: "Talab", def: "Xaridorlar istagi" }, { term: "Taklif", def: "Bozordagi miqdor" }, { term: "Halving", def: "Mukofot kamayishi" }] },
  },

  p23: {
    guide: [
      { title: "Iqtisod tamoyillari I", points: ["Scarcity — tanqislik qiymat yaratadi", "21 mln Bitcoin — cheklangan taklif", "Opportunity cost — tanlov narxi"] },
      { title: "Bozor mexanizmi", points: ["Erkin bozor — narx balanslash", "Regulyatsiya — NAPP roli", "Inflyatsiya vs deflyatsiya"] },
      { title: "Kripto konteksti", points: ["Bitcoin deflyatsion model", "Stablecoin inflatsiyaga qarshi", "Iqtisodiy savodxonlik muhim"] },
    ],
    quiz: [
      { question: "Bitcoin maksimal miqdori?", options: ["21 million", "Cheksiz", "100 ta", "1 million"], correctIndex: 0 },
      { question: "Tanqislik nima beradi?", options: ["Qiymat", "Hech narsa", "Faqat o'yin", "Bepul pul"], correctIndex: 0 },
      { question: "Opportunity cost?", options: ["Tanlov narxi", "Bepul pul", "Hech narsa", "Faqat soliq"], correctIndex: 0 },
    ],
    game: { type: "truefalse", title: "Iqtisod haqiqatlari", statements: [{ text: "Bitcoin taklifi cheklangan", correct: true }, { text: "Inflyatsiya har doim yaxshi", correct: false }, { text: "Talab va taklif muhim", correct: true }] },
  },

  p24: {
    guide: [
      { title: "Soliq I", points: ["Kripto daromad soliqqa tortilishi mumkin", "O'zbekiston qonunlariga rioya qiling", "Hujjatlarni saqlang"] },
      { title: "Hisobot", points: ["Tranzaksiya tarixini yuriting", "Birja hisobotlari", "Professional maslahat oling"] },
      { title: "Qonuniylik", points: ["NAPP litsenziyasi tekshiring", "Soliq deklaratsiyasi", "Shaffoflik muhim"] },
    ],
    quiz: [
      { question: "Kripto daromad?", options: ["Soliqqa tortilishi mumkin", "Hech qachon", "Faqat chet elda", "Hech narsa"], correctIndex: 0 },
      { question: "Nima saqlash kerak?", options: ["Tranzaksiya hujjatlari", "Hech narsa", "Faqat parol", "Faqat video"], correctIndex: 0 },
      { question: "NAPP roli?", options: ["Tartibga solish", "Soliq to'lash o'rniga", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
    ],
    game: { type: "order", title: "Soliq tartibi", steps: ["Daromadni hisoblash", "Hujjatlar yig'ish", "Deklaratsiya", "To'lov / hisobot"] },
  },

  p25: {
    guide: [
      { title: "Iqtisodiyot sovg'asi!", points: ["Iqtisod va soliq bo'limi mukofoti", "Sandiq oching", "Do'stni taklif qiling"] },
      { title: "Esga tushiring", points: ["Talab-taklif", "Soliq qoidalari", "NAPP muhimligi"] },
      { title: "Davom", points: ["Moliyaviy innovatsiyalar", "Ilg'or iqtisod", "AI bo'limi yaqin"] },
    ],
    quiz: [
      { question: "Sovg'a sababi?", options: ["Bo'lim tugadi", "Hech narsa", "Jarima", "Faqat to'lov"], correctIndex: 0 },
      { question: "Taklif?", options: ["Qo'shimcha USDT", "Hech narsa", "Faqat badge", "To'lov"], correctIndex: 0 },
      { question: "Keyingi?", options: ["Moliyaviy innovatsiyalar I", "Chiqish", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
    ],
    game: { type: "chest", title: "🎁 Iqtisodiyot mukofoti!", statements: [{ text: "Bosing 1", correct: true }, { text: "Bosing 2", correct: true }, { text: "Oching!", correct: true }] },
  },

  p26: {
    guide: [
      { title: "Moliyaviy innovatsiyalar I", points: ["FinTech — bank + texnologiya", "Mobil to'lovlar: Click, Payme", "Kripto — keyingi bosqich"] },
      { title: "Open Banking", points: ["API orqali ma'lumot ulashish", "Raqobat va innovatsiya", "Mijoz uchun qulaylik"] },
      { title: "Kripto integratsiyasi", points: ["Birja + bank hamkorligi", "Stablecoin hisob raqamlari", "Kelajak trend"] },
    ],
    quiz: [
      { question: "FinTech nima?", options: ["Moliya + texnologiya", "Faqat o'yin", "Hech narsa", "Faqat bank"], correctIndex: 0 },
      { question: "Open Banking?", options: ["API orqali ulashish", "Bank yopish", "Hech narsa", "Faqat kripto"], correctIndex: 0 },
      { question: "O'zbekistonda mobil to'lov?", options: ["Click, Payme", "Hech narsa", "Faqat naqd", "Faqat chet el"], correctIndex: 0 },
    ],
    game: { type: "match", title: "FinTech atamalari", pairs: [{ term: "FinTech", def: "Moliya texnologiyasi" }, { term: "API", def: "Dastur interfeysi" }, { term: "Open Banking", def: "Ochiq ma'lumot ulashish" }] },
  },

  p27: {
    guide: [
      { title: "Iqtisod tamoyillari II", points: ["Inflyatsiya — pul sotib olish qobiliyati pasayishi", "Deflyatsiya — aksincha", "Kripto ikkala holatni ko'radi"] },
      { title: "Qiymat saqlash", points: ["Yaxshi pul uzoq saqlanadi", "Bitcoin — digital gold narrativi", "Stablecoin — qisqa muddat"] },
      { title: "Makroiqtisod", points: ["Foiz stavkalari ta'sir qiladi", "Geosiyosat muhim", "Diversifikatsiya"] },
    ],
    quiz: [
      { question: "Inflyatsiya?", options: ["Sotib olish qobiliyati pasayishi", "Pul ko'payishi", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
      { question: "Digital gold?", options: ["Bitcoin narrativi", "Faqat oltin", "Hech narsa", "Faqat USDT"], correctIndex: 0 },
      { question: "Diversifikatsiya?", options: ["Xavfni taqsimlash", "Hammasi bir joyga", "Hech narsa", "Faqat qarz"], correctIndex: 0 },
    ],
    game: { type: "truefalse", title: "Inflyatsiya va qiymat", statements: [{ text: "Inflyatsiya tejashni qiyinlashtiradi", correct: true }, { text: "Barcha aktivlar bir xil", correct: false }, { text: "Diversifikatsiya tavsiya etiladi", correct: true }] },
  },

  p28: {
    guide: [
      { title: "Soliq II", points: ["Kripto savdo — daromad hisobi", "Mining daromadi", "Staking mukofoti"] },
      { title: "Qonuniy yo'l", points: ["Litsenziyali birjalar", "Hisobot yuritish", "Soliq maslahatchisi"] },
      { title: "Xalqaro", points: ["Turli mamlakat qoidalari", "FATF talablari", "O'zbekiston rivojlanmoqda"] },
    ],
    quiz: [
      { question: "Staking mukofoti?", options: ["Daromad bo'lishi mumkin", "Hech qachon soliq", "Faqat o'yin", "Hech narsa"], correctIndex: 0 },
      { question: "Qonuniy savdo?", options: ["Litsenziyali platforma", "Qora bozor", "Hech narsa", "Faqat Telegram"], correctIndex: 0 },
      { question: "Hisobot?", options: ["Hujjatlar saqlash", "Hech narsa", "Faqat o'chirish", "Faqat video"], correctIndex: 0 },
    ],
    game: { type: "order", title: "Qonuniy savdo tartibi", steps: ["Litsenziya tekshirish", "Savdo qilish", "Hisob yuritish", "Soliq hisoboti"] },
  },

  p29: {
    guide: [
      { title: "Soliq sovg'asi!", points: ["Soliq bo'limi mukofoti", "Qonuniy yo'l — eng yaxshi yo'l", "Sandiq oching"] },
      { title: "Taklif", points: ["Do'stlaringizni o'rganishga chorlang", "Birgalikda mukofot", "Simple Bitcoin uslubida"] },
      { title: "Davom", points: ["Moliyaviy innovatsiyalar II", "Makroiqtisod", "AI bo'limi"] },
    ],
    quiz: [
      { question: "Sovg'a?", options: ["USDT bonus", "Hech narsa", "Jarima", "Faqat badge"], correctIndex: 0 },
      { question: "Qonuniy ishlash?", options: ["Majburiy va xavfsiz", "Ixtiyoriy emas", "Hech narsa", "Faqat chet el"], correctIndex: 0 },
      { question: "Keyingi?", options: ["Moliyaviy innovatsiyalar II", "Chiqish", "Hech narsa", "Faqat do'kon"], correctIndex: 0 },
    ],
    game: { type: "chest", title: "🎁 Soliq mukofoti!", statements: [{ text: "Tayyorman", correct: true }, { text: "Ochish", correct: true }, { text: "Bonus!", correct: true }] },
  },

  p30: {
    guide: [
      { title: "Moliyaviy innovatsiyalar II", points: ["CBDC — markaziy bank raqam valyutasi", "Tokenizatsiya — aktivlarni raqamlashtirish", "RWA — haqiqiy aktivlar blokcheynda"] },
      { title: "Kelajak bank", points: ["TradFi + DeFi integratsiyasi", "Instant settlement", "Programmable money"] },
      { title: "O'zbekiston", points: ["Raqamli iqtisodiyot strategiyasi", "NAPP innovatsiyalar", "Ta'lim va sertifikat"] },
    ],
    quiz: [
      { question: "CBDC?", options: ["Raqamli milliy valyuta", "O'yin tangasi", "Hech narsa", "Faqat Bitcoin"], correctIndex: 0 },
      { question: "Tokenizatsiya?", options: ["Aktivlarni raqamlashtirish", "Faqat o'chirish", "Hech narsa", "Faqat naqd"], correctIndex: 0 },
      { question: "RWA?", options: ["Haqiqiy aktivlar on-chain", "Faqat o'yin", "Hech narsa", "Faqat mish-mish"], correctIndex: 0 },
    ],
    game: { type: "match", title: "Innovatsiya atamalari", pairs: [{ term: "CBDC", def: "Raqamli milliy valyuta" }, { term: "RWA", def: "Haqiqiy aktiv tokeni" }, { term: "Tokenizatsiya", def: "Raqamlashtirish" }] },
  },

  p31: {
    guide: [
      { title: "Iqtisod tamoyillari III", points: ["Makroiqtisod — butun iqtisodiyot", "Kripto — global bozor", "Korrelyatsiya — boshqa aktivlar bilan"] },
      { title: "Tsikllar", points: ["Bull market — o'sish", "Bear market — tushish", "Uzoq muddatli trend"] },
      { title: "Strategiya", points: ["DCA — muntazam sotib olish", "HODL — uzoq muddat", "Ta'lim birinchi"] },
    ],
    quiz: [
      { question: "Bull market?", options: ["O'sish bozori", "Tushish bozori", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
      { question: "DCA?", options: ["Muntazam sotib olish", "Hammasi bir kunda", "Hech narsa", "Faqat sotish"], correctIndex: 0 },
      { question: "Makroiqtisod?", options: ["Butun iqtisodiyot", "Faqat bir shaxs", "Hech narsa", "Faqat bank"], correctIndex: 0 },
    ],
    game: { type: "order", title: "Bozor tsikli", steps: ["Bull market", "Korreksiya", "Bear market", "Tiklanish"] },
  },

  // ─── AI VA KELAJAK ───
  p32: {
    guide: [
      { title: "AI va kripto", points: ["AI — ma'lumot tahlili, bashorat", "Kripto — AI training to'lovlari", "Ikkalasi birga kuchli"] },
      { title: "Qo'llanilish", points: ["Fraud detection", "Trading botlar (ehtiyot!)", "Ta'lim shaxsiylashtirish"] },
      { title: "Xavflar", points: ["AI firibgarlik", "Deepfake", "O'zingiz tekshiring"] },
    ],
    quiz: [
      { question: "AI kriptoda?", options: ["Tahlil va avtomatlashtirish", "Faqat o'yin", "Hech narsa", "Faqat mayning"], correctIndex: 0 },
      { question: "Deepfake xavfi?", options: ["Firibgarlik", "Hech narsa", "Faqat foyda", "Faqat o'yin"], correctIndex: 0 },
      { question: "Ta'limda AI?", options: ["Shaxsiylashtirilgan o'rganish", "Hech narsa", "Faqat reklama", "Faqat to'lov"], correctIndex: 0 },
    ],
    game: { type: "interactive", interactiveId: "ai", title: "AI + Kripto — xavfsiz javob tanlash" },
  },

  p33: {
    guide: [
      { title: "AI asboblari", points: ["ChatGPT — savol-javob, o'rganish", "Trading signal botlar — ehtiyotkor bo'ling", "On-chain AI tahlil"] },
      { title: "EduCrypto da AI", points: ["Shaxsiylashtirilgan yo'l", "Quiz tushuntirishlari", "Kelajakda ko'proq"] },
      { title: "Xavfsiz foydalanish", points: ["AI maslahat — faqat yordam", "Qaror sizda", "Manbani tekshiring"] },
    ],
    quiz: [
      { question: "AI asbob vazifasi?", options: ["Yordam va tahlil", "100% kafolat", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
      { question: "Trading bot?", options: ["Ehtiyotkor bo'lish kerak", "Har doim ishonchli", "Hech narsa", "Majburiy"], correctIndex: 0 },
      { question: "Qaror kimda?", options: ["Foydalanuvchida", "Faqat AI da", "Hech kimda", "Faqat bankda"], correctIndex: 0 },
    ],
    game: { type: "interactive", interactiveId: "ai", title: "AI asboblari — chatbot demo" },
  },

  p34: {
    guide: [
      { title: "AI sovg'asi!", points: ["AI bo'limi boshlandi — mukofot!", "Eng katta bonuslardan biri", "Sandiq oching"] },
      { title: "Taklif", points: ["Do'stni AI + kripto o'rganishga taklif qiling", "Birgalikda sertifikat", "USDT bonus"] },
      { title: "Davom", points: ["Mashina va inson", "PoW va AI", "AI sertifikat"] },
    ],
    quiz: [
      { question: "AI sovg'asi?", options: ["Katta USDT bonus", "Hech narsa", "Jarima", "Faqat badge"], correctIndex: 0 },
      { question: "Taklif?", options: ["Qo'shimcha mukofot", "Hech narsa", "To'lov", "Faqat reklama"], correctIndex: 0 },
      { question: "Keyingi?", options: ["Mashina va inson", "Chiqish", "Hech narsa", "Faqat do'kon"], correctIndex: 0 },
    ],
    game: { type: "chest", title: "🎁 AI mukofoti!", statements: [{ text: "AI bonus 1", correct: true }, { text: "AI bonus 2", correct: true }, { text: "Oching!", correct: true }] },
  },

  p35: {
    guide: [
      { title: "Mashina va inson", points: ["AI o'rganishni tezlashtiradi", "Inson qaror va axloq beradi", "Hamkorlik — eng yaxshi model"] },
      { title: "Ta'lim", points: ["Simple Bitcoin uslubi — qisqa darslar", "AI savollaringizga javob beradi", "Siz amaliyot qilasiz"] },
      { title: "Kelajak kasblar", points: ["Blockchain mutaxassisi", "AI + kripto tahlilchi", "NAPP sertifikatli mutaxassis"] },
    ],
    quiz: [
      { question: "AI va inson?", options: ["Hamkorlik", "AI almashtiradi", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
      { question: "Ta'limda AI roli?", options: ["Yordamchi", "O'qituvchi o'rniga 100%", "Hech narsa", "Faqat to'lov"], correctIndex: 0 },
      { question: "Kelajak kasb?", options: ["Blockchain mutaxassisi", "Faqat mayner", "Hech narsa", "Faqat bankir"], correctIndex: 0 },
    ],
    game: { type: "interactive", interactiveId: "ai", title: "Mashina + Inson — AI hamkorlik demo" },
  },

  p36: {
    guide: [
      { title: "Mashina va mashina", points: ["IoT + blockchain", "Avtomatik to'lovlar", "Smart-kontraktlar o'rtasida"] },
      { title: "M2M to'lovlar", points: ["Avtomobil — zaryad stantsiya", "Sensor — ma'lumot sotish", "Kelajak iqtisodiyoti"] },
      { title: "Xavfsizlik", points: ["Avtomatlashtirish xavflari", "Smart-kontrakt audit", "Inson nazorati"] },
    ],
    quiz: [
      { question: "M2M nima?", options: ["Mashina o'rtasida to'lov", "Faqat inson", "Hech narsa", "Faqat bank"], correctIndex: 0 },
      { question: "IoT + blockchain?", options: ["Avtomatik tranzaksiyalar", "Hech narsa", "Faqat o'yin", "Faqat video"], correctIndex: 0 },
      { question: "Xavfsizlik?", options: ["Audit va nazorat", "Hech narsa", "Faqat ishonish", "Faqat AI"], correctIndex: 0 },
    ],
    game: { type: "match", title: "M2M atamalari", pairs: [{ term: "M2M", def: "Mashina to'lovi" }, { term: "IoT", def: "Narsalar interneti" }, { term: "Smart-kontrakt", def: "Avtomatik shartnoma" }] },
  },

  p37: {
    guide: [
      { title: "AI foydalari", points: ["Tez tahlil — katta ma'lumot", "Shaxsiylashtirilgan ta'lim", "Fraud oldini olish"] },
      { title: "Kripto ekotizimida", points: ["Bozor tahlili", "Risk baholash", "Ta'lim chatbotlari"] },
      { title: "Cheklovlar", points: ["AI xato qilishi mumkin", "Bias — tarafkashlik", "Inson nazorati kerak"] },
    ],
    quiz: [
      { question: "AI ta'lim foydasi?", options: ["Shaxsiylashtirish", "Hech narsa", "Faqat reklama", "Faqat to'lov"], correctIndex: 0 },
      { question: "AI xatosi?", options: ["Mumkin — tekshiring", "Hech qachon", "Faqat inson", "Hech narsa"], correctIndex: 0 },
      { question: "Bias?", options: ["Tarafkashlik xavfi", "Hech narsa", "Faqat foyda", "Faqat o'yin"], correctIndex: 0 },
    ],
    game: { type: "interactive", interactiveId: "ai", title: "AI foydalari — xavfsiz foydalanish demo" },
  },

  p38: {
    guide: [
      { title: "PoW va AI", points: ["Mayning — GPU/ASIC quvvat", "AI training — GPU talab", "Resurslar raqobati"] },
      { title: "Yashil energetika", points: ["Qayta tiklanuvchi energiya", "Energiya samaradorligi", "Barqaror mayning"] },
      { title: "Kelajak", points: ["PoS — kamroq energiya", "AI optimizatsiyasi", "Ikkalasi ham rivojlanadi"] },
    ],
    quiz: [
      { question: "PoW energiyasi?", options: ["Xavfsizlik uchun", "Behuda", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
      { question: "AI va GPU?", options: ["Training uchun kerak", "Hech narsa", "Faqat mayning", "Faqat o'yin"], correctIndex: 0 },
      { question: "Yashil mayning?", options: ["Qayta tiklanuvchi energiya", "Hech narsa", "Faqat ko'mir", "Faqat neft"], correctIndex: 0 },
    ],
    game: { type: "interactive", interactiveId: "mining", title: "PoW + AI — GPU mayning demo" },
  },

  p39: {
    guide: [
      { title: "AI sertifikat — master daraja!", points: ["Barcha 39 bosqich tugadi!", "NAPP AI va kripto sertifikati", "Eng yuqori mukofot"] },
      { title: "Nima erishdingiz?", points: ["Crypto asoslari → iqtisodiyot → AI", "3 ta NAPP sertifikat yo'li", "Simple Bitcoin uslubida o'rganish"] },
      { title: "Keyingi qadamlar", points: ["Do'stlarni taklif qiling", "Do'konda mukofot sarflang", "Bozorda davom eting!"] },
    ],
    quiz: [
      { question: "AI sertifikat darajasi?", options: ["Master", "Boshlang'ich", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
      { question: "Jami taxtachalar?", options: ["66 ta (dars + demo)", "10 ta", "5 ta", "100 ta"], correctIndex: 0 },
      { question: "Keyingi qadam?", options: ["Bilimni amalda qo'llash", "To'xtash", "Hech narsa", "Faqat o'yin"], correctIndex: 0 },
    ],
    game: { type: "order", title: "Master sertifikat tartibi", steps: ["Barcha yo'lni tugatish", "AI testdan o'tish", "O'yinni bajarish", "NAPP AI PDF yuklab olish"] },
  },
};
