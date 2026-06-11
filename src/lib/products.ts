export interface Product {
  id: number;
  name: string;
  price: number;
  tag: string;
  image: string;
}

/** Arzon, ammo sifatli elektronika — stablecoin (USDT) narxlari */
export const products: Product[] = [
  {
    id: 1,
    name: "AirPods uslubidagi TWS quloqchin",
    price: 32,
    tag: "Quloqchin",
    image: "/products/earbuds.jpg",
  },
  {
    id: 2,
    name: "Simsiz naushnik (shovqinni bostiruvchi)",
    price: 28,
    tag: "Naushnik",
    image: "/products/headphones.jpg",
  },
  {
    id: 3,
    name: "Tez zaryadlovchi USB-C adapter 20W",
    price: 10,
    tag: "Zaryadnik",
    image: "/products/charger.jpg",
  },
  {
    id: 4,
    name: "Sport quloqchin (simsiz buds)",
    price: 18,
    tag: "Quloqchin",
    image: "/products/sport-buds.jpg",
  },
  {
    id: 5,
    name: "Smart soat (qadama va yurak urishi)",
    price: 42,
    tag: "Soat",
    image: "/products/smartwatch.jpg",
  },
  {
    id: 6,
    name: "Elektron sport soati",
    price: 15,
    tag: "Soat",
    image: "/products/watch.jpg",
  },
  {
    id: 7,
    name: "Bluetooth portativ kolonka",
    price: 22,
    tag: "Kolonka",
    image: "/products/speaker.jpg",
  },
  {
    id: 8,
    name: "Gaming sichqoncha (RGB)",
    price: 16,
    tag: "Gaming",
    image: "/products/gaming-mouse.jpg",
  },
  {
    id: 9,
    name: "Gaming gamepad / joystick",
    price: 28,
    tag: "Gaming",
    image: "/products/gamepad.jpg",
  },
  {
    id: 10,
    name: "PowerBank 10000 mAh",
    price: 12,
    tag: "Gadget",
    image: "/products/powerbank.jpg",
  },
  {
    id: 11,
    name: "Ikki portli USB zaryadlovchi",
    price: 8,
    tag: "Zaryadnik",
    image: "/products/usb-charger.jpg",
  },
  {
    id: 12,
    name: "Gaming quloqchin (mikrofonli)",
    price: 24,
    tag: "Gaming",
    image: "/products/gaming-headset.jpg",
  },
  {
    id: 13,
    name: "Fitness braslet (uyqu kuzatuvi)",
    price: 20,
    tag: "Gadget",
    image: "/products/fitness-band.jpg",
  },
  {
    id: 14,
    name: "Mini Bluetooth kolonka (suv o'tkazmaydigan)",
    price: 18,
    tag: "Kolonka",
    image: "/products/mini-speaker.jpg",
  },
  {
    id: 15,
    name: "Avtomobil telefon tutqichi",
    price: 6,
    tag: "Gadget",
    image: "/products/phone-mount.jpg",
  },
  {
    id: 16,
    name: "Simsiz kompakt klaviatura",
    price: 35,
    tag: "Gadget",
    image: "/products/keyboard.jpg",
  },
];
