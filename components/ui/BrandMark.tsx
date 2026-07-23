import Link from "next/link";

interface BrandMarkProps {
  compact?: boolean;
  light?: boolean;
}

export function BrandSeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 52" aria-hidden className={className} fill="none">
      <path d="M38.8 9.4A19.1 19.1 0 1 0 42.5 34" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M42.8 31.4c-.5 2.8-1.6 5.3-3.2 7.6" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="42" cy="13.3" r="4.6" fill="var(--color-terracotta)" stroke="var(--color-paper)" strokeWidth="1.5" />
    </svg>
  );
}

export function BrandMark({ compact = false, light = false }: BrandMarkProps) {
  const tone = light ? "text-paper" : "text-pine";
  return (
    <Link href="/" aria-label="CHAEUN 홈" className="group inline-flex items-center gap-2.5">
      <BrandSeal className={`h-8 w-8 transition-transform duration-300 group-hover:rotate-12 ${tone}`} />
      <span className="flex flex-col leading-none">
        <span className={`font-logo text-[1.45rem] font-semibold tracking-[0.13em] ${tone}`}>CHAEUN</span>
        {!compact && <span className={`mt-1 text-[0.56rem] tracking-[0.12em] ${light ? "text-paper/70" : "text-ink/45"}`}>FILL YOUR SPACE.</span>}
      </span>
    </Link>
  );
}
