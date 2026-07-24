"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { useExperienceStore } from "@/lib/store";

export function SiteHeader() {
  const pathname = usePathname();
  const step = useExperienceStore((s) => s.step);
  const inWizard = pathname === "/create";

  // 06 Story Reveal.dc.html has no header at all — the reveal is a full-bleed
  // dark transition with zero navigation chrome.
  if (inWizard && step === "story") return null;

  // 05 Info Input.dc.html's header is logo-only (no brand/store nav) while
  // mid-questionnaire; every other screen (including climax) keeps the nav.
  const showNav = !inWizard || step !== "info";

  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-auto flex max-w-[1440px] items-start justify-between px-5 py-2 sm:px-8">
      <BrandMark compact />
      {showNav && (
        <nav aria-label="주요 메뉴" className="paper-surface flex items-center gap-4 rounded-full border border-mist/70 px-4 py-2 text-xs font-medium text-ink/65 shadow-sm">
          <Link href="/brand" className="transition-colors hover:text-celadon">
            브랜드
          </Link>
          <Link href="/store" className="transition-colors hover:text-pine">
            스토어
          </Link>
        </nav>
      )}
    </header>
  );
}
