import type { GameCard, QuizChallenge, RiskChallenge, StablecoinChallenge } from "./types";

export const QUIZZES: QuizChallenge[] = [
  { id: "edu-0", question: "Blockchain nima?", options: ["Zanjirli tranzaksiyalar daftari", "Oddiy bank hisobi", "Ijtimoiy tarmoq", "Video platforma"], correctIndex: 0, xp: 10, olaaTip: "Har blok oldingi blok bilan bog'langan!" },
  { id: "edu-1", question: "Bitcoin qanday turdagi aktiv?", options: ["Kriptovalyuta", "Stablecoin", "Fiat pul", "O'yin tangasi"], correctIndex: 0, xp: 10, olaaTip: "Bitcoin — birinchi va eng mashhur kripto." },
  { id: "edu-2", question: "Proof of Work nima qiladi?", options: ["Tarmoq xavfsizligini ta'minlaydi", "Pul chop etadi", "Video yuklaydi", "Hech narsa"], correctIndex: 0, xp: 12, olaaTip: "Minerlar murakkab hisob-kitob qiladi." },
  { id: "edu-3", question: "Smart-kontrakt nima?", options: ["Avtomatik shartnoma kodi", "Bank qog'ozi", "Telefon ilovasi", "O'yin qoidasi"], correctIndex: 0, xp: 12, olaaTip: "Ethereum smart-kontraktlarni qo'llab-quvvatlaydi." },
  { id: "edu-4", question: "DeFi nimani anglatadi?", options: ["Markazsiz moliya", "Davlat banki", "Naqd pul", "Birja hisobi"], correctIndex: 0, xp: 10, olaaTip: "DeFi — vositachisiz moliyaviy xizmatlar." },
  { id: "edu-5", question: "NFT nima?", options: ["Nozik token (unikal raqamli aktiv)", "Oddiy tanga", "Bank kartasi", "QR kod"], correctIndex: 0, xp: 10, olaaTip: "Har NFT noyob bo'lishi mumkin." },
  { id: "edu-6", question: "Web3 asosiy g'oyasi?", options: ["Foydalanuvchi ma'lumotlari va aktivlari egalik huquqi", "Faqat o'yin", "Faqat video", "Hech narsa"], correctIndex: 0, xp: 10, olaaTip: "Web3 — internetning keyingi bosqichi." },
  { id: "edu-7", question: "Hash funksiyasi nima uchun kerak?", options: ["Ma'lumotni shifrlash va tekshirish", "Rang berish", "Ovoz yozish", "Video tahrirlash"], correctIndex: 0, xp: 12, olaaTip: "Hash — blokcheyn ishonchining asosi." },
  { id: "edu-8", question: "Decentralizatsiya afzalligi?", options: ["Bitta markazga bog'liq emas", "Tezroq internet", "Bepul telefon", "Hech narsa"], correctIndex: 0, xp: 10, olaaTip: "Ma'lumot ko'p joyda nusxalanadi." },
  { id: "edu-9", question: "Mining mukofoti nima?", options: ["Yangi tanga + tranzaksiya to'lovi", "Bepul uy", "Telefon", "Hech narsa"], correctIndex: 0, xp: 10, olaaTip: "Minerlar tarmoqni himoya qiladi." },
  { id: "edu-10", question: "Seed ibora nima?", options: ["Hamyonni tiklash kaliti (12-24 so'z)", "Parol", "Telefon raqami", "Email"], correctIndex: 0, xp: 15, olaaTip: "Seed iborani HECH KIMGA bermang!" },
  { id: "edu-11", question: "Blokda nima saqlanadi?", options: ["Tranzaksiyalar va oldingi blok hashi", "Faqat rasm", "Faqat video", "Hech narsa"], correctIndex: 0, xp: 10, olaaTip: "Har blok zanjirga bog'langan." },
  { id: "edu-12", question: "P2P tarmoq nimani anglatadi?", options: ["Tengdoshlar o'rtasida to'g'ridan-to'g'ri aloqa", "Markaziy server", "Bank filiali", "Hech narsa"], correctIndex: 0, xp: 10, olaaTip: "Bitcoin P2P tarmoqda ishlaydi." },
  { id: "edu-13", question: "ERC-20 nima?", options: ["Ethereum token standarti", "O'yin tangasi", "Bank kartasi", "Hech narsa"], correctIndex: 0, xp: 10, olaaTip: "Ko'p tokenlar ERC-20 standartida." },
  { id: "edu-14", question: "Gas fee nima?", options: ["Tranzaksiya uchun to'lov", "Bepul bonus", "O'yin balli", "Hech narsa"], correctIndex: 0, xp: 10, olaaTip: "Gas — tarmoq resurslari uchun to'lov." },
  { id: "edu-15", question: "Layer 2 yechim nima uchun?", options: ["Tez va arzon tranzaksiyalar", "Video yuklash", "O'yin o'ynash", "Hech narsa"], correctIndex: 0, xp: 12, olaaTip: "Lightning — Bitcoin Layer 2." },
  { id: "edu-16", question: "CBDC nima?", options: ["Markaziy bank raqamli valyutasi", "O'yin tangasi", "Stablecoin", "Hech narsa"], correctIndex: 0, xp: 10, olaaTip: "CBDC — davlat raqamli puli." },
  { id: "edu-17", question: "Bitcoin nechanchi yilda yaratilgan?", options: ["2009", "1999", "2019", "2020"], correctIndex: 0, xp: 10, olaaTip: "Satoshi Nakamoto 2009-yilda Bitcoinni taqdim etdi." },
];

export const STABLE_CHALLENGES: StablecoinChallenge[] = [
  {
    id: "stable-0",
    title: "P2P USDT savdosi — xavfsiz algoritm",
    steps: [
      { label: "Sotuvchi reytingini tekshirish", correct: true },
      { label: "Telegram-bot orqali to'lash", correct: false },
      { label: "Escrow (kafolat) tizimidan foydalanish", correct: true },
      { label: "Oldindan to'liq pul yuborish", correct: false },
      { label: "Tranzaksiyani platformada tasdiqlash", correct: true },
    ],
    xp: 15,
    olaaTip: "Bu xavfsiz stablecoin tranzaksiyasi. Sinab ko'ring!",
  },
  {
    id: "stable-1",
    title: "Xavfsiz tranzaksiya tartibi",
    steps: [
      { label: "Manzilni 2 marta tekshirish", correct: true },
      { label: "Noma'lum havoladan kirish", correct: false },
      { label: "2FA (ikki bosqichli himoya) yoqish", correct: true },
      { label: "Parolni chatda yuborish", correct: false },
      { label: "Kichik summada sinab ko'rish", correct: true },
    ],
    xp: 15,
    olaaTip: "Xavfsizlik — birinchi qoida!",
  },
  {
    id: "stable-2",
    title: "Likvidlik pool tushunchasi",
    steps: [
      { label: "Likvidlik = savdo uchun mavjud mablag'", correct: true },
      { label: "Likvidlik = firibgarlik", correct: false },
      { label: "APY foizini tushunish", correct: true },
      { label: "Impermanent loss xavfini bilish", correct: true },
    ],
    xp: 12,
    olaaTip: "Likvidlik — DeFi ning yuragi.",
  },
  {
    id: "stable-3",
    title: "USDT Bridge simulyatsiyasi",
    steps: [
      { label: "Rasmiy bridge saytini tekshirish", correct: true },
      { label: "Noma'lum bridge-ga ulash", correct: false },
      { label: "Tarmoq (network) to'g'riligini tasdiqlash", correct: true },
      { label: "Bridge shartlarini o'qish", correct: true },
    ],
    xp: 12,
    olaaTip: "Noto'g'ri tarmoq = pul yo'qolishi mumkin!",
  },
  {
    id: "stable-4",
    title: "P2P xavfsizlik tekshiruvi",
    steps: [
      { label: "KYC talab qiluvchi platforma", correct: true },
      { label: "Anonim Telegram sotuvchi", correct: false },
      { label: "Shikoyatlar tarixini ko'rish", correct: true },
      { label: "Juda arzon narxga ishonish", correct: false },
    ],
    xp: 15,
    olaaTip: "Agar juda yaxshi ko'rinsa — ehtiyot bo'ling!",
  },
  {
    id: "stable-5",
    title: "Likvidlik pool boshqaruvi",
    steps: [
      { label: "Pool hajmini tekshirish", correct: true },
      { label: "Barcha mablag'ni bir joyga qo'yish", correct: false },
      { label: "Diversifikatsiya qilish", correct: true },
    ],
    xp: 10,
    olaaTip: "Diversifikatsiya — xavfni kamaytiradi.",
  },
  {
    id: "stable-6",
    title: "Stablecoin audit",
    steps: [
      { label: "Zaxira (reserve) hisobotini tekshirish", correct: true },
      { label: "Auditni o'tkazib yuborish", correct: false },
      { label: "Emitent kompaniyani o'rganish", correct: true },
    ],
    xp: 12,
    olaaTip: "USDT — Tether kompaniyasi emitenti.",
  },
  {
    id: "stable-7",
    title: "Cross-chain transfer",
    steps: [
      { label: "Manzil va tarmoq mosligini tekshirish", correct: true },
      { label: "Turli tarmoqlarni aralashtirish", correct: false },
      { label: "Test tranzaksiya yuborish", correct: true },
    ],
    xp: 12,
    olaaTip: "ERC-20 va TRC-20 farq qiladi!",
  },
];

export const RISK_CHALLENGES: RiskChallenge[] = [
  {
    id: "risk-0",
    title: "Phishing Email aniqlandi!",
    scamType: "Phishing",
    warning: "Sizga soxta Binance emaili keldi. Havola: binance-security-verify.com",
    olaaMessage: "Hushyor bo'ling! Bu firibgarlik. Haqiqiy birjalar bunday email yubormaydi. Rasmiy domen: binance.com",
    ignorePenalty: { xp: 15, safety: 20 },
    backTiles: 2,
  },
  {
    id: "risk-1",
    title: "Fake Airdrop!",
    scamType: "Fake Airdrop",
    warning: "Telegramda: 'Bepul 1000 USDT oling — wallet ulang!'",
    olaaMessage: "Hushyor bo'ling! Bepul airdrop va'dasi — klassik firibgarlik. Hamyoningizni ulamang!",
    ignorePenalty: { xp: 20, safety: 25 },
    backTiles: 2,
  },
  {
    id: "risk-2",
    title: "Rug Pull xavfi!",
    scamType: "Rug Pull",
    warning: "Yangi token 1000% o'sdi. 'Hozir sotib ol!' degan post ko'p.",
    olaaMessage: "Rug Pull — loyiha egasi pulni olib qochishi mumkin. NAPP litsenziyasiz tokenlardan ehtiyot bo'ling!",
    ignorePenalty: { xp: 15, safety: 20 },
    backTiles: 2,
  },
  {
    id: "risk-3",
    title: "Telegram-bot Scam!",
    scamType: "Telegram Scam",
    warning: "t.me/free_crypto_wallet_bot — 'Hamyoningizga kirish uchun seed iborani yuboring'",
    olaaMessage: "HECH QACHON seed iborani yubormang! Bu 100% firibgarlik.",
    ignorePenalty: { xp: 25, safety: 30 },
    backTiles: 3,
  },
  {
    id: "risk-4",
    title: "Noma'lum APK!",
    scamType: "Malware",
    warning: "free-crypto-wallet.apk — 'Bepul hamyon yuklab oling'",
    olaaMessage: "Noma'lum APK yuklamang! Faqat rasmiy App Store / Google Play dan oling.",
    ignorePenalty: { xp: 20, safety: 25 },
    backTiles: 2,
  },
  {
    id: "risk-5",
    title: "Pump & Dump!",
    scamType: "Market Manipulation",
    warning: "Guruhda: 'Hamma hozir sotib oling, 1 soatda 10x!'",
    olaaMessage: "Pump & Dump — narxi sun'iy ko'tariladi, keyin qulab tushadi. Ehtiyot bo'ling!",
    ignorePenalty: { xp: 15, safety: 15 },
    backTiles: 2,
  },
  {
    id: "risk-6",
    title: "Fake Support!",
    scamType: "Impersonation",
    warning: "Telegramda 'MetaMask Support' deb yozishdi va parol so'rashdi.",
    olaaMessage: "Haqiqiy support HECH QACHON parol yoki seed so'ramaydi!",
    ignorePenalty: { xp: 20, safety: 25 },
    backTiles: 2,
  },
  {
    id: "risk-7",
    title: "Seed Phrase so'rovi!",
    scamType: "Seed Theft",
    warning: "Veb-sayt: 'Hamyonni tiklash uchun 12 so'zni kiriting'",
    olaaMessage: "Seed ibora faqat SIZ yozib olishingiz kerak. Hech qayerga kiritmang!",
    ignorePenalty: { xp: 30, safety: 35 },
    backTiles: 3,
  },
];

export const GAME_CARDS: GameCard[] = [
  { type: "bilim", title: "Bilim kartasi", description: "Blockchain zanjiri haqida qo'shimcha bilim!", xp: 8 },
  { type: "bilim", title: "DeFi kartasi", description: "DeFi protokollari haqida bilim oling.", xp: 10 },
  { type: "bilim", title: "NFT kartasi", description: "NFT va unikal aktivlar haqida.", xp: 8 },
  { type: "scam", title: "Scam ogohlantirish", description: "Firibgarlik belgilarini yana bir bor o'qing.", safety: 5 },
  { type: "scam", title: "Risk kartasi", description: "Portfel xavfsizligini tekshiring.", penalty: 5 },
  { type: "imkoniyat", title: "Imkoniyat!", description: "Bonus USDT va XP mukofoti!", xp: 15 },
  { type: "imkoniyat", title: "Xazina!", description: "Sandiqdan qo'shimcha ball!", xp: 20 },
  { type: "imkoniyat", title: "Stablecoin bonus", description: "P2P savdo ko'nikmasi oshdi!", xp: 12, safety: 5 },
];

export function getQuiz(id: string): QuizChallenge {
  const idx = parseInt(id.replace("edu-", ""), 10) || 0;
  return QUIZZES[idx % QUIZZES.length];
}

export function getStable(id: string): StablecoinChallenge {
  const idx = parseInt(id.replace("stable-", ""), 10) || 0;
  return STABLE_CHALLENGES[idx % STABLE_CHALLENGES.length];
}

export function getRisk(id: string): RiskChallenge {
  const idx = parseInt(id.replace("risk-", ""), 10) || 0;
  return RISK_CHALLENGES[idx % RISK_CHALLENGES.length];
}

export function drawRandomCard(): GameCard {
  return GAME_CARDS[Math.floor(Math.random() * GAME_CARDS.length)];
}

export function getCardByType(type: import("./types").CardType): GameCard {
  const match = GAME_CARDS.find((c) => c.type === type);
  return match ?? GAME_CARDS[0];
}
