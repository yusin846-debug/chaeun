interface HalftoneBackgroundProps {
  accent?: string;
  className?: string;
}

export function HalftoneBackground({
  accent = "var(--color-celadon)",
  className = "",
}: HalftoneBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="halftone-dots"
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill={accent} opacity="0.35" />
          </pattern>
          <linearGradient id="halftone-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={accent} stopOpacity="0" />
            <stop offset="1" stopColor={accent} stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <rect width="800" height="800" fill="var(--color-cream)" />

        <path
          d="M-50,620 Q150,520 320,600 T650,560 T900,600 V850 H-50 Z"
          fill={accent}
          opacity="0.1"
        />
        <path
          d="M-50,680 Q200,600 400,660 T900,640 V850 H-50 Z"
          fill={accent}
          opacity="0.16"
        />
        <circle cx="140" cy="150" r="120" fill="var(--color-oheng-earth)" opacity="0.12" />
        <circle cx="640" cy="220" r="90" fill={accent} opacity="0.1" />

        <rect width="800" height="800" fill="url(#halftone-dots)" opacity="0.6" />
        <rect width="800" height="800" fill="url(#halftone-fade)" />
      </svg>
    </div>
  );
}
