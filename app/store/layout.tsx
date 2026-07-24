import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "스토어 — 채운",
  description: "오행과 취향으로 둘러보는 채운의 풍경 컬렉션.",
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
