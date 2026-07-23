import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import { SiteHeader } from "@/components/nav/SiteHeader";
import "./globals.css";

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "채운 — 그림 한 점, 당신의 기운을 채우다",
  description:
    "사주로 부족한 오행을 찾고, 풍수로 보완하는 맞춤 풍경 이미지를 액자·굿즈로 만나보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSerifKR.variable} h-full antialiased`}>
      <body className="min-h-full bg-cream text-ink">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
