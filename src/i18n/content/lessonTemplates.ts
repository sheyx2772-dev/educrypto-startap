import type { Locale } from "../config";
import type { Lesson } from "@/lib/lessons";
import type { GuideSection, QuizQuestion } from "@/lib/lessonContent";

interface TemplatePack {
  guide: GuideSection[];
  categories: Record<string, Omit<QuizQuestion, "id">[]>;
  quizExtras: {
    topicQuestion: string;
    wrongOptions: [string, string, string];
    passHint: string;
  };
}

const packs: Record<Locale, TemplatePack> = {
  uz: {
    guide: [
      { title: "Asosiy tushunchalar", points: ["{topic} mavzusining eng muhim g'oyalari va atamalarini o'rganing.", "Crypto bozorida bu bilimlar qanday qo'llanilishini tushuning.", "NAPP qoidalari va xavfsizlik tamoyillarini yodda tuting."] },
      { title: "Amaliy qo'llanma", points: ["Videoda ko'rsatilgan bosqichlarni ketma-ket bajaring.", "{category} bo'yicha real misollarni tahlil qiling.", "Xatolardan qochish uchun ogohlantirishlarga e'tibor bering."] },
      { title: "Xulosa", points: ["Bugun o'rganilgan mavzularni qisqacha takrorlang.", "Keyingi darslikka o'tish uchun testni yeching.", "To'g'ri javoblar uchun stablecoin mukofot olasiz!"] },
    ],
    categories: {
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
    },
    quizExtras: {
      topicQuestion: '"{title}" mavzusining asosiy maqsadi nima?',
      wrongOptions: ["Faqat o'yin o'ynash", "Pul yo'qotish", "Hech narsa o'rganmaslik"],
      passHint: "Videoni to'liq ko'rish va qo'llanmani o'qish",
    },
  },
  ru: {
    guide: [
      { title: "Основные понятия", points: ["Изучите ключевые идеи и термины темы «{topic}».", "Поймите, как эти знания применяются на crypto-рынке.", "Помните правила NAPP и принципы безопасности."] },
      { title: "Практическое руководство", points: ["Выполняйте шаги из видео по порядку.", "Разберите реальные примеры по теме «{category}».", "Обращайте внимание на предупреждения, чтобы избежать ошибок."] },
      { title: "Итог", points: ["Кратко повторите изученное сегодня.", "Пройдите тест, чтобы перейти к следующему уроку.", "За правильные ответы вы получите stablecoin!"] },
    ],
    categories: {
      Qonuniyat: [
        { question: "Что важно при работе с крипто в Узбекистане?", options: ["Законные пути", "Скрытые операции", "Только наличные", "Ничего"], correctIndex: 0, explanation: "Нужно соблюдать закон и правила NAPP." },
        { question: "Что проверяется в P2P?", options: ["Верификация личности", "Только цена", "Цвет", "Время"], correctIndex: 0, explanation: "Безопасность и KYC на первом месте." },
      ],
      Binance: [
        { question: "Первый шаг на Binance?", options: ["Регистрация", "Торговля", "Майнинг", "Стейкинг"], correctIndex: 0, explanation: "Сначала нужно открыть аккаунт." },
        { question: "Что важно при вводе средств?", options: ["Правильная сеть", "Скорость", "Цвет", "Время"], correctIndex: 0, explanation: "Неверная сеть может привести к потере средств." },
      ],
      Bitcoin: [
        { question: "Что такое Bitcoin?", options: ["Цифровая валюта", "Банкнота", "Золото", "Акция"], correctIndex: 0, explanation: "Bitcoin — децентрализованная цифровая валюта." },
        { question: "Зачем нужен blockchain?", options: ["Записывать транзакции", "Хранить видео", "Музыка", "Картинки"], correctIndex: 0, explanation: "Blockchain — реестр транзакций." },
        { question: "Что такое майнинг?", options: ["Подтверждение транзакций", "Игра", "Видео", "Музыка"], correctIndex: 0, explanation: "Майнинг защищает сеть." },
      ],
      Treyding: [
        { question: "Что такое трейдинг?", options: ["Покупка/продажа активов", "Только хранение", "Игра", "Банк"], correctIndex: 0, explanation: "Трейдинг — торговля на рынке." },
        { question: "Зачем нужен риск-менеджмент?", options: ["Ограничить потери", "Быстро разбогатеть", "Игра", "Ничего"], correctIndex: 0, explanation: "Риск-менеджмент защищает капитал." },
      ],
      Asoslar: [
        { question: "Что такое криптовалюта?", options: ["Цифровой актив", "Банковский депозит", "Наличные", "Акция"], correctIndex: 0, explanation: "Криптовалюта работает на блокчейне." },
        { question: "Первый шаг в изучении crypto?", options: ["Изучить основы", "Взять кредит", "Сразу futures", "Ничего"], correctIndex: 0, explanation: "Сначала теория и правовые основы." },
      ],
      Web3: [
        { question: "Что такое Web3?", options: ["Децентрализованный интернет", "Обычный сайт", "Телевизор", "Банковская система"], correctIndex: 0, explanation: "Web3 — интернет под контролем пользователя." },
        { question: "Что важно в Web3?", options: ["Кошелёк и приватные ключи", "Только пароль", "Только email", "Ничего"], correctIndex: 0, explanation: "Безопасность ключей критична." },
      ],
      Ethereum: [
        { question: "Что такое Ethereum?", options: ["Платформа смарт-контрактов", "Только Bitcoin", "Банк", "Игра"], correctIndex: 0, explanation: "Ethereum для dApp и смарт-контрактов." },
        { question: "Что такое MetaMask?", options: ["Криптокошелёк", "Банковское приложение", "Игра", "Мессенджер"], correctIndex: 0, explanation: "MetaMask — кошелёк Ethereum/Web3." },
      ],
      Stablecoin: [
        { question: "Что такое USDT?", options: ["Stablecoin, привязанный к доллару", "Игровая монета", "Банкнота", "Майнер"], correctIndex: 0, explanation: "USDT привязан к USD." },
        { question: "Зачем нужен stablecoin?", options: ["Сохранять стабильную стоимость", "Играть", "Смотреть видео", "Ничего"], correctIndex: 0, explanation: "Stablecoin снижает волатильность." },
      ],
      DeFi: [
        { question: "Что такое DeFi?", options: ["Децентрализованные финансы", "Отделение банка", "Игра", "Страховка"], correctIndex: 0, explanation: "DeFi — финансы на блокчейне." },
        { question: "Что такое yield farming?", options: ["Доход от предоставления ликвидности", "Игра", "Продажа майнеров", "Банковский кредит"], correctIndex: 0, explanation: "Yield farming — награда за ликвидность." },
      ],
      Yangiliklar: [
        { question: "Зачем следить за крипто-новостями?", options: ["Понимать тренды рынка", "Развлечение", "Ничего", "Только игра"], correctIndex: 0, explanation: "Новости помогают понять рынок." },
        { question: "Если институционалы покупают Bitcoin?", options: ["Рынок может оживиться", "Bitcoin исчезнет", "Ничего", "Банки закроются"], correctIndex: 0, explanation: "Крупные инвесторы повышают спрос." },
      ],
      default: [
        { question: "Первый шаг в изучении crypto?", options: ["Изучить основы", "Сразу торговать", "Взять кредит", "Ничего"], correctIndex: 0, explanation: "Сначала теория." },
        { question: "Что такое stablecoin?", options: ["Стабильная криптовалюта", "Игровая монета", "Банкнота", "Акция"], correctIndex: 0, explanation: "Stablecoin имеет стабильную цену." },
        { question: "Что нужно для прохождения теста?", options: ["Посмотреть видео и прочитать гайд", "Только угадать", "Сразу ответ", "Ничего"], correctIndex: 0, explanation: "Сначала учитесь, потом тест." },
      ],
    },
    quizExtras: {
      topicQuestion: "Какова основная цель темы «{title}»?",
      wrongOptions: ["Только играть", "Терять деньги", "Ничему не учиться"],
      passHint: "Посмотреть видео и прочитать руководство",
    },
  },
  en: {
    guide: [
      { title: "Core concepts", points: ["Learn the key ideas and terms of «{topic}».", "Understand how this knowledge applies in the crypto market.", "Remember NAPP rules and security principles."] },
      { title: "Practical guide", points: ["Follow the video steps in order.", "Analyze real examples in «{category}».", "Pay attention to warnings to avoid mistakes."] },
      { title: "Summary", points: ["Briefly review what you learned today.", "Pass the quiz to unlock the next lesson.", "Earn stablecoin rewards for correct answers!"] },
    ],
    categories: {
      Qonuniyat: [
        { question: "What matters when using crypto in Uzbekistan?", options: ["Legal paths", "Hidden operations", "Cash only", "Nothing"], correctIndex: 0, explanation: "Follow laws and NAPP rules." },
        { question: "What is checked in P2P?", options: ["Identity verification", "Price only", "Color", "Time"], correctIndex: 0, explanation: "Security and KYC come first." },
      ],
      Binance: [
        { question: "First step on Binance?", options: ["Sign up", "Trade", "Mining", "Staking"], correctIndex: 0, explanation: "Open an account first." },
        { question: "What matters when depositing?", options: ["Correct network", "Speed", "Color", "Time"], correctIndex: 0, explanation: "Wrong network can lose funds." },
      ],
      Bitcoin: [
        { question: "What is Bitcoin?", options: ["Digital currency", "Banknote", "Gold", "Stock"], correctIndex: 0, explanation: "Bitcoin is decentralized digital money." },
        { question: "What does blockchain do?", options: ["Record transactions", "Store video", "Music", "Images"], correctIndex: 0, explanation: "Blockchain is a transaction ledger." },
        { question: "What is mining?", options: ["Confirming transactions", "A game", "Video", "Music"], correctIndex: 0, explanation: "Mining secures the network." },
      ],
      Treyding: [
        { question: "What is trading?", options: ["Buying/selling assets", "Only holding", "A game", "Bank"], correctIndex: 0, explanation: "Trading means market exchange." },
        { question: "Why risk management?", options: ["Limit losses", "Get rich fast", "Play", "Nothing"], correctIndex: 0, explanation: "Risk management protects capital." },
      ],
      Asoslar: [
        { question: "What is cryptocurrency?", options: ["Digital asset", "Bank deposit", "Cash", "Stock"], correctIndex: 0, explanation: "Crypto runs on blockchain." },
        { question: "First step learning crypto?", options: ["Learn basics", "Take big loan", "Jump to futures", "Nothing"], correctIndex: 0, explanation: "Start with theory and legal basics." },
      ],
      Web3: [
        { question: "What is Web3?", options: ["Decentralized internet", "Simple website", "TV", "Banking system"], correctIndex: 0, explanation: "Web3 is user-controlled decentralized web." },
        { question: "What matters in Web3?", options: ["Wallet and private keys", "Password only", "Email only", "Nothing"], correctIndex: 0, explanation: "Key security is critical." },
      ],
      Ethereum: [
        { question: "What is Ethereum?", options: ["Smart contract platform", "Only Bitcoin", "Bank", "Game"], correctIndex: 0, explanation: "Ethereum powers dApps and contracts." },
        { question: "What is MetaMask?", options: ["Crypto wallet", "Bank app", "Game", "Messenger"], correctIndex: 0, explanation: "MetaMask is an Ethereum/Web3 wallet." },
      ],
      Stablecoin: [
        { question: "What is USDT?", options: ["Dollar-pegged stablecoin", "Game coin", "Banknote", "Miner"], correctIndex: 0, explanation: "USDT tracks the US dollar." },
        { question: "Why use stablecoin?", options: ["Stable value storage", "Play games", "Watch video", "Nothing"], correctIndex: 0, explanation: "Stablecoins reduce volatility." },
      ],
      DeFi: [
        { question: "What is DeFi?", options: ["Decentralized finance", "Bank branch", "Game", "Insurance"], correctIndex: 0, explanation: "DeFi is finance on blockchain." },
        { question: "What is yield farming?", options: ["Earn by providing liquidity", "A game", "Sell miners", "Bank loan"], correctIndex: 0, explanation: "Yield farming rewards liquidity." },
      ],
      Yangiliklar: [
        { question: "Why follow crypto news?", options: ["Understand market trends", "Entertainment", "Nothing", "Only games"], correctIndex: 0, explanation: "News helps read the market." },
        { question: "If institutions buy Bitcoin?", options: ["Market may heat up", "Bitcoin disappears", "Nothing", "Banks close"], correctIndex: 0, explanation: "Big investors can raise demand." },
      ],
      default: [
        { question: "First step learning crypto?", options: ["Learn basics", "Trade immediately", "Get a loan", "Nothing"], correctIndex: 0, explanation: "Learn theory first." },
        { question: "What is a stablecoin?", options: ["Stable-value crypto", "Game coin", "Banknote", "Stock"], correctIndex: 0, explanation: "Stablecoins keep steady value." },
        { question: "What do you need to pass the quiz?", options: ["Watch video and read guide", "Guess only", "Skip to answer", "Nothing"], correctIndex: 0, explanation: "Learn first, then quiz." },
      ],
    },
    quizExtras: {
      topicQuestion: "What is the main goal of «{title}»?",
      wrongOptions: ["Only play games", "Lose money", "Learn nothing"],
      passHint: "Watch the full video and read the guide",
    },
  },
  kk: {} as TemplatePack,
  ky: {} as TemplatePack,
  tg: {} as TemplatePack,
};

packs.kk = {
  ...packs.ru,
  guide: [
    { title: "Негізгі ұғымдар", points: ["«{topic}» тақырыбының маңызды идеялары мен терминдерін үйреніңіз.", "Crypto нарығында бұл білімнің қалай қолданылатынын түсініңіз.", "NAPP ережелері мен қауіпсіздік принциптерін есте сақтаңыз."] },
    { title: "Практикалық нұсқаулық", points: ["Видеодағы қадамдарды ретімен орындаңыз.", "«{category}» бойынша нақты мысалдарды талдаңыз.", "Қателерден аулақ болу үшін ескертулерге назар аударыңыз."] },
    { title: "Қорытынды", points: ["Бүгін үйренгендеріңізді қысқаша қайталаңыз.", "Келесі сабаққа өту үшін тестті тапсырыңыз.", "Дұрыс жауаптар үшін stablecoin сыйлық аласыз!"] },
  ],
  quizExtras: { topicQuestion: "«{title}» тақырыбының негізгі мақсаты не?", wrongOptions: ["Тек ойын ойнау", "Ақша жоғалту", "Ештеңе үйренбеу"], passHint: "Видеоны толық көру және нұсқаулықты оқу" },
};
packs.ky = {
  ...packs.ru,
  guide: [
    { title: "Негизги түшүнүктөр", points: ["«{topic}» темасынын негизги идеялары жана терминдерин үйрөнүңүз.", "Crypto рыногунда бул билим кантип колдонуларын түшүнүңүз.", "NAPP эрежелери жана коопсуздук принциптерин эсте сактаңыз."] },
    { title: "Практикалык колдонмо", points: ["Видеодогу кадамдарды ирети менен аткарыңыз.", "«{category}» боюнча чыныгы мисалдарды талдаңыз.", "Каталардан качуу үчүн эскертүүлөргө көңүл буруңуз."] },
    { title: "Жыйынтык", points: ["Бүгүн үйрөнгөндөрүңүздү кыскача кайталаңыз.", "Кийинки сабакка өтүү үчүн тестти тапшырыңыз.", "Туура жооптор үчүн stablecoin сыйлык аласыз!"] },
  ],
  quizExtras: { topicQuestion: "«{title}» темасынын негизги максаты эмне?", wrongOptions: ["Тек оюн ойноо", "Акча жоготуу", "Эч нерсе үйрөнбөө"], passHint: "Видеону толук көрүү жана колдонмону окуу" },
};
packs.tg = {
  ...packs.ru,
  guide: [
    { title: "Мафҳумҳои асосӣ", points: ["Идеяҳо ва терминҳои асосии «{topic}»-ро омӯзед.", "Фаҳмед, ки ин дониш дар бозори crypto чӣ гуна истифода мешавад.", "Қоидаҳои NAPP ва принсипҳои амниятро дар хотир доред."] },
    { title: "Дастури амалӣ", points: ["Қадамҳои видеоро ба тартиб иҷро кунед.", "Мисолҳои воқеии «{category}»-ро таҳлил кунед.", "Барои пешгирӣ аз хатогиҳо ба огоҳиномаҳо диққат диҳед."] },
    { title: "Хулоса", points: ["Мавзӯъҳои имрӯзаро мухтасар такрор кунед.", "Барои гузариш ба дарси навбатӣ тестро гузаронед.", "Барои ҷавобҳои дуруст stablecoin мукофот мегиред!"] },
  ],
  quizExtras: { topicQuestion: "Мақсади асосии «{title}» чист?", wrongOptions: ["Танҳо бозӣ кардан", "Пулро гум кардан", "Ҳеҷ чиз омӯздан"], passHint: "Видеоро пурра тамошо кунед ва дастурро хонед" },
};

function fillTemplate(s: string, vars: Record<string, string>): string {
  return s.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`);
}

export function getLocalizedLessonGuide(lesson: Lesson, locale: Locale): GuideSection[] {
  const pack = packs[locale] ?? packs.uz;
  const vars = { topic: lesson.title, category: lesson.category };
  return pack.guide.map((g) => ({
    title: fillTemplate(g.title, vars),
    points: g.points.map((p) => fillTemplate(p, vars)),
  }));
}

export function getLocalizedLessonQuiz(lesson: Lesson, locale: Locale): QuizQuestion[] {
  const pack = packs[locale] ?? packs.uz;
  const base = pack.categories[lesson.category] ?? pack.categories.default;
  const questions: QuizQuestion[] = base.map((q, i) => ({
    ...q,
    id: `${lesson.id}-q${i}`,
  }));
  const extras = pack.quizExtras;
  questions.push({
    id: `${lesson.id}-topic`,
    question: fillTemplate(extras.topicQuestion, { title: lesson.title }),
    options: [
      lesson.description.slice(0, 60) + "...",
      ...extras.wrongOptions,
    ],
    correctIndex: 0,
    explanation: lesson.description,
  });
  return questions.slice(0, 4);
}
