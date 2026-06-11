export interface PathVideoStep {
  step: number;
  title: string;
  videoId: string;
  tip: string;
}

/** 6 bosqichli video dars — Asosiy yo'l bosqichlari */
export const pathVideoCourses: Record<string, PathVideoStep[]> = {
  p1: [
    { step: 1, title: "Bitcoin va blockchain kirish", videoId: "-5cmcfv-WEM", tip: "Ko'prik yo'lining birinchi qadami — asosiy tushuncha." },
    { step: 2, title: "Bitcoin qanday ishlaydi?", videoId: "qFYXCHHcmwY", tip: "Narx va texnologiya bog'liqligini tushuning." },
    { step: 3, title: "Raqamli pul mexanizmi", videoId: "On2tfIxQJrc", tip: "Pul evolyutsiyasidan kriptoga o'tish." },
    { step: 4, title: "Blockchain amaliyoti", videoId: "WaaOY3T3mJM", tip: "Zanjir qanday ishlashini kuzating." },
    { step: 5, title: "Kripto ekotizimi", videoId: "S-t6Snin7oY", tip: "Tarmoq va ishtirokchilar." },
    { step: 6, title: "Hamyon va xavfsizlik", videoId: "mgSWagEPNRI", tip: "Keyingi bosqichlarga tayyorlaning." },
  ],
  p2: [
    { step: 1, title: "Pulning tarixi", videoId: "On2tfIxQJrc", tip: "Tovar puldan raqamli pulgacha." },
    { step: 2, title: "Bitcoin — yangi pul?", videoId: "-5cmcfv-WEM", tip: "Markazsiz pul tushunchasi." },
    { step: 3, title: "Qiymat va inflyatsiya", videoId: "qFYXCHHcmwY", tip: "Narxlar nega o'zgaradi?" },
    { step: 4, title: "Moliya bozoriga kirish", videoId: "815j8fg1mKE", tip: "Bozor ishtirokchilari." },
    { step: 5, title: "Bozor turlari", videoId: "m6UFY6iCIak", tip: "Turli aktivlar va ularning o'rni." },
    { step: 6, title: "Investitsiya asoslari", videoId: "p8G8SilJEY8", tip: "Pulni qanday ishlatish kerak." },
  ],
  p4: [
    { step: 1, title: "Qiymat saqlash", videoId: "qFYXCHHcmwY", tip: "Nima uchun odamlar pul tejaydi?" },
    { step: 2, title: "Bitcoin va xazina", videoId: "F53mHXTa1sY", tip: "Digital gold narrativi." },
    { step: 3, title: "Oltin vs Bitcoin", videoId: "-LdcrU2B93Q", tip: "An'anaviy va raqamli xazina." },
    { step: 4, title: "Bozor tahlili", videoId: "DaSBt0FWHa0", tip: "Qiymatni baholash." },
    { step: 5, title: "Makroiqtisod", videoId: "4bSw146jznA", tip: "Global iqtisodiy ta'sir." },
    { step: 6, title: "Xavfsiz saqlash", videoId: "WIfMKnZe83Q", tip: "Xazinani qanday himoya qilish." },
  ],
  p10: [
    { step: 1, title: "Qonuniy ishlash", videoId: "xaVaqhTEcbw", tip: "O'zbekistonda kripto qoidalari." },
    { step: 2, title: "Birja va litsenziya", videoId: "WIfMKnZe83Q", tip: "Qonuniy pul operatsiyalari." },
    { step: 3, title: "Soliq va hisobot", videoId: "aSozFQytJCg", tip: "Hujjatlarni saqlash." },
    { step: 4, title: "Depozit xavfsizligi", videoId: "yhuQnsJ4kuE", tip: "Komissiya va xavf." },
    { step: 5, title: "Psixologiya va risk", videoId: "SCl-Ije6O-c", tip: "Emotsiyasiz qaror." },
    { step: 6, title: "Keng tarqalgan xatolar", videoId: "Faz_6Zdo4Zk", tip: "Cheklovlarni bilish — muhim!" },
  ],
};
