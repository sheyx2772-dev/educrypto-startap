import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduCrypto — Crypto o'yin orqali o'rganing",
  description:
    "O'zbekiston uchun crypto ta'lim platformasi. Bitcoin, Ethereum, stablecoin va boshqa coinlarni o'rganing",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
