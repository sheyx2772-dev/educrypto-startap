export type AdCategory = "birja" | "hamyon" | "oquv";

export interface SponsorAd {
  id: string;
  brand: string;
  title: string;
  category: AdCategory;
  videoId: string;
  cta: string;
  color: string;
}

export const categoryLabels: Record<AdCategory, string> = {
  birja: "Crypto birja",
  hamyon: "Crypto hamyon",
  oquv: "O'quv markazi",
};

export const sponsorAds: SponsorAd[] = [
  {
    id: "binance",
    brand: "Binance",
    title: "O'zbekistonda #1 crypto birja — xavfsiz savdo",
    category: "birja",
    videoId: "U-yd-J36PnU",
    cta: "Binance'ga o'tish",
    color: "#F0B90B",
  },
  {
    id: "bybit",
    brand: "Bybit",
    title: "Professional treyding platformasi",
    category: "birja",
    videoId: "wQV3ZVySVRw",
    cta: "Bybit bilan tanishing",
    color: "#F7A600",
  },
  {
    id: "metamask",
    brand: "MetaMask",
    title: "Web3 hamyon — Ethereum va DeFi",
    category: "hamyon",
    videoId: "_DOWAMp8c_A",
    cta: "Hamyon o'rganish",
    color: "#E2761B",
  },
  {
    id: "trustwallet",
    brand: "Trust Wallet",
    title: "Mobil crypto hamyon — xavfsiz saqlash",
    category: "hamyon",
    videoId: "yyA9-9BTp8I",
    cta: "Hamyon qo'llanmasi",
    color: "#3375BB",
  },
  {
    id: "hbs",
    brand: "HBS Akademiyasi",
    title: "Professional treyding kurslari",
    category: "oquv",
    videoId: "815j8fg1mKE",
    cta: "Kursni ko'rish",
    color: "#48C9A3",
  },
  {
    id: "texnoplov",
    brand: "Texnoplov",
    title: "Bitcoin va blockchain — oddiy tilda",
    category: "oquv",
    videoId: "-5cmcfv-WEM",
    cta: "Darsni boshlash",
    color: "#FFD700",
  },
];
