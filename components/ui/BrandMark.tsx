import Link from "next/link";

interface BrandMarkProps {
  compact?: boolean;
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <Link href="/" aria-label="CHAEUN 홈" className="group inline-flex items-center gap-2.5">
      <span
        aria-hidden
        className="relative block h-7 w-7 rounded-full border-[3px] border-pine border-r-transparent transition-transform duration-300 group-hover:rotate-12"
      >
        <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-terracotta" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-logo text-[1.35rem] font-semibold tracking-[0.12em] text-pine">CHAEUN</span>
        {!compact && <span className="mt-1 text-[0.56rem] tracking-[0.12em] text-ink/45">FILL YOUR SPACE.</span>}
      </span>
    </Link>
  );
}
