"use client";

import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-auto flex max-w-[1440px] items-start justify-between px-5 py-2 sm:px-8">
      <BrandMark compact />
      <nav aria-label="주요 메뉴" className="paper-surface flex items-center gap-4 rounded-full border border-mist/70 px-4 py-2 text-xs font-medium text-ink/65 shadow-sm">
        <Link href="/brand" className="transition-colors hover:text-celadon">
          브랜드
        </Link>
        <Link href="/store" className="transition-colors hover:text-pine">
          스토어
        </Link>
      </nav>
    </header>
  );
}
