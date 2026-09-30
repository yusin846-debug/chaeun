import type { Metadata } from "next";
import { Jua, Bricolage_Grotesque, Cormorant_Garamond, Noto_Serif_KR } from "next/font/google";
import { SiteHeader } from "@/components/nav/SiteHeader";
import "./globals.css";

const gameDisplay = Jua({ variable: "--font-game-display", weight: "400", subsets: ["latin"], display: "swap" });

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], display: "swap" });

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CHAEUN — Fill Your Space.",
  description:
    "사주로 지금의 나와 고민을 읽고, 풍수로 나에게 어울리는 공간과 맞춤 아트를 만나보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${gameDisplay.variable} ${display.variable} ${notoSerifKR.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-ink">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
