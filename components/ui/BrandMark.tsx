import Link from "next/link";

interface BrandMarkProps {
  compact?: boolean;
  light?: boolean;
}

export function BrandSeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 52" aria-hidden className={className} fill="none">
      <path d="M39.2 35.3c-3.7 6.8-11.8 10.8-19.5 8.6C9.8 41.1 4.1 30.7 7.4 21.1 10.7 11.5 20.9 5.9 30.6 9c1.6.5 3.1 1.2 4.4 2.1-1.4-.5-2.9-.8-4.4-1-8.6-1-16.8 4.2-19.8 12.3-3 8.2.4 17.2 7.9 21.1 7.4 3.8 16.8 1.3 21.2-5.6l-.7-2.6Z" fill="currentColor" />
      <path d="M8.2 19.2c-2.2 7.2-.2 15.4 5.4 20.4-4.3-4.1-6.7-10.1-6.2-16.1.1-1.5.4-2.9.8-4.3Z" fill="var(--color-paper)" opacity=".72" />
      <path d="m38 32.2 2.2-3.5 1 4 2.5.8-2.2 1.5-1.1 3.3-1.2-2.7-2.4.1 1.2-3.5Z" fill="currentColor" />
      <circle cx="38.3" cy="10.2" r="4.4" fill="var(--color-terracotta)" />
    </svg>
  );
}

export function BrandMark({ compact = false, light = false }: BrandMarkProps) {
  const tone = light ? "text-paper" : "text-pine";
  return (
    <Link href="/" aria-label="CHAEUN 홈" className={`group inline-flex ${compact ? "flex-row gap-2.5" : "flex-col gap-1.5"} items-center`}>
      <BrandSeal className={`${compact ? "h-9 w-9" : "h-14 w-14"} transition-transform duration-300 group-hover:rotate-6 ${tone}`} />
      <span className={`flex flex-col ${compact ? "items-start" : "items-center"} leading-none`}>
        <span className={`font-logo ${compact ? "text-[1.35rem]" : "text-[1.65rem]"} font-semibold tracking-[0.12em] ${tone}`}>CHAEUN</span>
        {!compact && <span className={`mt-1.5 font-logo text-[0.72rem] tracking-[0.01em] ${light ? "text-paper/70" : "text-ink/70"}`}>Fill Your Space.</span>}
      </span>
    </Link>
  );
}
