import type { ScamCard } from "./types";

export const SCAM_CARDS: ScamCard[] = [
  {
    id: 1,
    type: "telegram",
    correctAnswer: "scam",
    explanation:
      "Bu klassik 'pul ikkilash' scami. Hech kim 48 soatda 3x daromad kafolatlay olmaydi. 'Bugun oxirgi kun' — bu sizni shoshiltirish uchun bosim. Notanish odamga hech qachon pul yubormang.",
    telegram: {
      username: "crypto_ustoz_official",
      displayName: "Kripto Ustoz",
      message:
        "Assalomu alaykum! Men 3 yildan beri kripto bilan ishlayman. Sizga 100$ bersangiz 48 soatda 300$ qilib beraman. Kafolat beraman! Bugun oxirgi kun, ertaga taklifni yopaman.",
      time: "14:32",
    },
  },
  {
    id: 2,
    type: "website",
    correctAnswer: "scam",
    explanation:
      "URL ga diqqat qiling! Haqiqiy UzNEX manzili uznex.uz. Bu saytda 'uznex-official.uz' deb yozilgan — firibgarlar tomonidan yaratilgan nusxa sayt. Har doim URL ni tekshiring.",
    website: {
      url: "uznex-official.uz",
      title: "UzNEX — Rasmiy Kripto Birjasi",
      preview: "Ro'yxatdan o'ting va 200% bonus oling! Depozit qiling — darhol foyda!",
      badge: "⚠️ Nusxa sayt",
    },
  },
  {
    id: 3,
    type: "ad",
    correctAnswer: "scam",
    explanation:
      "NAPP (Milliy Agentlik) hech qachon bunday reklama bermaydi. Davlat organlari pul yig'ish aksiyasi o'tkazmaydi. 'Faqat 100 ta joy' — bu sizni tez qaror qilishga majbur qilish uchun.",
    ad: {
      headline: "🚀 NAPP RASMIY AKSIYA!",
      body: "Bugun 500,000 so'm yuboring — 30 kunda 2,000,000 so'm oling! Faqat 100 ta joy!",
      cta: "@napp_official_uz",
      brand: "NAPP",
      watermark: "REKLAMA",
    },
  },
  {
    id: 4,
    type: "telegram",
    correctAnswer: "real",
    explanation:
      "Bu haqiqiy! UzNEX rasmiy kanalining belgilari: tasdiqlangan ko'k belgi, rasmiy username @uznex_official, faqat uznex.uz ga havolalar, texnik tilda yozilgan professional post.",
    telegram: {
      username: "uznex_official",
      displayName: "UzNEX Official",
      verified: true,
      message:
        "📢 Yangi savdo juftligi: BTC/USDT. Savdo 10:00 dan boshlanadi. Batafsil: uznex.uz/markets",
      time: "09:15",
    },
  },
  {
    id: 5,
    type: "ad",
    correctAnswer: "scam",
    explanation:
      "Mashhur odamlar ismini ishlatgan scam! Elon Musk bu reklama bermagan. Rasmiy odamlar norasmiy saytlarda reklama bermaydi. Bunday reklamalarga hech qachon ishonmang.",
    ad: {
      headline: "Elon Musk: 'Bitcoin 2024 yilda 500% o'sadi!'",
      body: "Men o'z pulimga qo'shimcha Bitcoin qo'shyapman. Qo'shiling!",
      cta: "bitcoin-elon-official.com",
      watermark: "REKLAMA",
    },
  },
  {
    id: 6,
    type: "website",
    correctAnswer: "real",
    explanation:
      "Bu haqiqiy! Coinpay.uz NAPP tomonidan litsenziyalangan rasmiy kripto do'kondir. Litsenziya raqamini NAPP rasmiy saytida tekshirish mumkin.",
    website: {
      url: "coinpay.uz",
      title: "Coinpay — Kripto Do'kon",
      preview: "NAPP litsenziyasi: №012345. So'm orqali Bitcoin, USDT sotib oling.",
      badge: "✓ Litsenziyalangan",
    },
  },
  {
    id: 7,
    type: "telegram",
    correctAnswer: "scam",
    explanation:
      "'Signal xizmati' scami — hech kim har doim to'g'ri signal bera olmaydi. 'O'rtacha 5,000$' da'vosi isbotlanmagan. 50$ to'lov so'rash — bu asosiy belgi.",
    telegram: {
      username: "kripto_millioner_guruh",
      displayName: "Kripto Millioner Guruh",
      message:
        "Bu guruhda ishtirokchilar o'rtacha oyiga 5,000$ daromad qilyapti! Signal xizmatimizga obuna bo'ling — oyiga faqat 50$. To'lov: USDT yuboring.",
      time: "18:44",
    },
  },
  {
    id: 8,
    type: "website",
    correctAnswer: "scam",
    explanation:
      "Binance O'zbekistonda rasmiy xizmat ko'rsatmaydi va NAPP litsenziyasi yo'q. 'Exclusive bonus 200%' — real birjalar bunday haddan tashqari bonuslar bermaydi. URL binance.com emas.",
    website: {
      url: "binance-uz.com",
      title: "Binance Uzbekistan",
      preview: "🇺🇿 Exclusive bonus 200% on first deposit! Cheklangan vaqt!",
      badge: "⚠️ Soxta",
    },
  },
  {
    id: 9,
    type: "post",
    correctAnswer: "scam",
    explanation:
      "Hashamatli hayot ko'rsatib odamlarni jalb qilish klassik scam usuli. 'Bepul o'rgataman' — keyinchalik pul so'rashadi yoki noqonuniy platformaga yo'naltiradilar.",
    post: {
      username: "crypto_millioner_uz",
      caption:
        "Kripto bilan 3 oyda shu mashinani oldim! 🚗 DM yuboring, usulimni o'rgataman — bepul!",
      likes: "12,4K",
      comments: "892",
      imageEmoji: "🏎️",
    },
  },
  {
    id: 10,
    type: "website",
    correctAnswer: "real",
    explanation:
      "Bu haqiqiy! NAPP (O'zbekiston Milliy Agentligi) rasmiy sayti napp.uz. Hukumat saytlari .uz domenida bo'ladi va rasmiy davlat dizayniga ega.",
    website: {
      url: "napp.uz",
      title: "NAPP — Milliy Agentlik",
      preview: "Litsenziyalangan kripto operatorlar ro'yxati. Rasmiy ma'lumot va qonunlar.",
      badge: "🏛️ Rasmiy",
    },
  },
  {
    id: 11,
    type: "telegram",
    correctAnswer: "scam",
    explanation:
      "Phishing hujumi! Haqiqiy texnik qo'llab-quvvatlash hech qachon login ma'lumotlaringizni so'ramaydi. '.tk' domen — bepul va shubhali. Shoshiltirish ('10 daqiqa') — bosim qo'shish usuli.",
    telegram: {
      username: "uznex_support_fake",
      displayName: "UzNEX texnik qo'llab-quvvatlash",
      message:
        "Hisobingizda shubhali faoliyat aniqlandi! 10 daqiqa ichida uznex-verify.tk ga kiring va login ma'lumotlaringizni kiriting.",
      time: "22:01",
    },
  },
  {
    id: 12,
    type: "ad",
    correctAnswer: "real",
    explanation:
      "Bu haqiqiy reklama! Haqiqiy kripto xizmatlarining belgilari: NAPP litsenziya belgisi, oddiy va haqiqiy va'dalar, rasmiy domen (.uz), haddan tashqari foyda va'dasi yo'q.",
    ad: {
      headline: "Coinpay — O'zbekistonda qonuniy kripto",
      body: "So'm orqali Bitcoin, Ethereum, USDT. NAPP litsenziyasi bilan.",
      cta: "coinpay.uz",
      brand: "Coinpay",
      watermark: "REKLAMA",
    },
  },
  {
    id: 13,
    type: "telegram",
    correctAnswer: "scam",
    explanation:
      "Soxta airdrop! Hech qachon bepul kripto olish uchun wallet private key yoki seed phrase so'ramaydi. 'Cheklangan vaqt' — shoshiltirish usuli.",
    telegram: {
      username: "btc_airdrop_uz",
      displayName: "Bitcoin Airdrop UZ",
      message:
        "🎁 BITCOIN BEPUL TARQATILMOQDA! 0.05 BTC olish uchun wallet seed phrase yoki private key yuboring. Faqat bugun!",
      time: "11:20",
    },
  },
  {
    id: 14,
    type: "telegram",
    correctAnswer: "scam",
    explanation:
      "Pump & dump sxemasi! Guruh a'zolari oldindan sotib olib, keyin sizga 'sotib oling' deb aytishadi, narx tushganda siz zararda qolasiz. Bu noqonuniy manipulyatsiya.",
    telegram: {
      username: "pump_signal_vip",
      displayName: "PUMP SIGNAL VIP",
      message:
        "🚀 PUMP 15:00 da! $SHITCOIN 1000% o'sadi! Hozir sotib oling, keyin sotamiz! VIP obuna: 30 USDT",
      time: "14:55",
    },
  },
  {
    id: 15,
    type: "website",
    correctAnswer: "scam",
    explanation:
      "Soxta ish taklifi! Haqiqiy ish beruvchilar oldindan kripto to'lov talab qilmaydi. 'Uyda 5000$' va'dasi — juda shubhali.",
    website: {
      url: "crypto-job-uz.com",
      title: "Crypto Job UZ — Uydan ish",
      preview: "Ro'yxatdan o'tish uchun 50 USDT yuboring. Oyiga 5000$ maosh kafolati!",
      badge: "⚠️ Soxta",
    },
  },
  {
    id: 16,
    type: "telegram",
    correctAnswer: "real",
    explanation:
      "Bu haqiqiy UzNEX e'lonidir: texnik ishlar haqida oldindan xabar, rasmiy kanal, aniq vaqt, uznex.uz havolasi.",
    telegram: {
      username: "uznex_official",
      displayName: "UzNEX Official",
      verified: true,
      message:
        "🔧 Texnik ishlar: 03:00–05:00 (Toshkent). Savdo vaqtincha to'xtatiladi. uznex.uz/status",
      time: "16:00",
    },
  },
  {
    id: 17,
    type: "telegram",
    correctAnswer: "real",
    explanation:
      "NAPP rasmiy ogohlantirishi! Davlat organi firibgarlik haqida ogohlantiradi — bu haqiqiy va foydali ma'lumot.",
    telegram: {
      username: "napp_uz",
      displayName: "NAPP Rasmiy",
      verified: true,
      message:
        "⚠️ OGOHLANTIRISH: Firibgarlar soxta kripto saytlar va 'tez boylik' takliflari bilan fuqarolarni aldayapti. Faqat napp.uz dagi litsenziyalangan operatorlarga ishoning.",
      time: "10:00",
    },
  },
  {
    id: 18,
    type: "post",
    correctAnswer: "scam",
    explanation:
      "Soxta NFT drop! Wallet ulash orqali tokenlaringizni o'g'irlash mumkin. 'Bepul NFT' va 'cheklangan' — klassik scam belgilari.",
    post: {
      username: "nft_drop_uz",
      caption:
        "🎨 BEPUL NFT DROP! Faqat wallet ulang va mint qiling! 24 soat ichida tugaydi! Link bio da 👆",
      likes: "8,2K",
      comments: "1,1K",
      imageEmoji: "🖼️",
    },
  },
  {
    id: 19,
    type: "ad",
    correctAnswer: "real",
    explanation:
      "Coinpay ning haqiqiy reklamasi: aniq brend, rasmiy domen, NAPP litsenziyasi, haddan tashqari va'dalar yo'q.",
    ad: {
      headline: "Coinpay — Xavfsiz kripto xarid",
      body: "Visa/Mastercard va so'm orqali. NAPP litsenziyasi №012345.",
      cta: "coinpay.uz",
      brand: "Coinpay",
      watermark: "REKLAMA",
    },
  },
  {
    id: 20,
    type: "website",
    correctAnswer: "scam",
    explanation:
      "Soxta mining pool / ICO! 'Kuniga 15%' — matematik jihatdan barqaror emas. Rug pull: pul yig'iladi, sayt yopiladi.",
    website: {
      url: "uzmining-pool.io",
      title: "UZ Mining Pool — ICO",
      preview: "Kuniga 15% daromad! Minimal depozit 100 USDT. Cheklangan joylar!",
      badge: "⚠️ Rug pull xavfi",
    },
  },
];

export const ROUND_SIZE = 10;
export const TIMER_SECONDS = 15;
export const INITIAL_LIVES = 3;

export function pickRoundCards(): ScamCard[] {
  const shuffled = [...SCAM_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, ROUND_SIZE);
}

export function speedBonus(timeLeftSec: number): number {
  if (timeLeftSec >= 10) return 100;
  if (timeLeftSec >= 5) return 75;
  return 50;
}

export function comboBonus(streak: number): number {
  if (streak >= 7) return 300;
  if (streak >= 5) return 150;
  if (streak >= 3) return 50;
  return 0;
}

export function performanceBadge(accuracy: number): { title: string; tier: "gold" | "silver" | "bronze" | "none" } {
  if (accuracy >= 90) return { title: "MASTER DEDEKTIV", tier: "gold" };
  if (accuracy >= 70) return { title: "TAJRIBALI DEDEKTIV", tier: "silver" };
  if (accuracy >= 50) return { title: "YANGI DEDEKTIV", tier: "bronze" };
  return { title: "O'QUVCHI", tier: "none" };
}
