"use client";

import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-3 backdrop-blur-sm">
      <Link href="/" className="font-heading text-sm font-bold tracking-wide text-ink">
        채운 <span className="text-celadon">彩雲</span>
      </Link>
      <nav className="flex items-center gap-4 text-xs font-medium text-ink/60">
        <Link href="/brand" className="transition-colors hover:text-celadon">
          브랜드
        </Link>
        <Link href="/store" className="transition-colors hover:text-celadon">
          스토어
        </Link>
      </nav>
    </header>
  );
}
