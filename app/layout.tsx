import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_KR } from "next/font/google";
import { SiteHeader } from "@/components/nav/SiteHeader";
import "./globals.css";

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
    "사주로 부족한 오행을 찾고, 풍수로 보완하는 맞춤 풍경 이미지를 액자·굿즈로 만나보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSerifKR.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-ink">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
