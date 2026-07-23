interface LandscapeArtworkProps {
  className?: string;
}

export function LandscapeArtwork({ className = "" }: LandscapeArtworkProps) {
  return (
    <svg
      viewBox="0 0 760 900"
      role="img"
      aria-label="소나무와 폭포가 있는 채운의 풍경 작품"
      className={className}
    >
      <defs>
        <pattern id="chaeun-dot-fine" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.15" fill="currentColor" />
        </pattern>
        <pattern id="chaeun-dot-soft" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.35" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="760" height="900" fill="var(--color-paper)" />
      <circle cx="135" cy="146" r="47" fill="var(--color-terracotta)" opacity="0.92" />
      <g color="var(--color-mist)" opacity="0.9">
        <path d="M-50 560C92 465 166 477 310 556c120 66 250 31 500-66v410H-50Z" fill="url(#chaeun-dot-soft)" />
        <path d="M-40 610c155-82 258-83 390-7 111 64 240 47 458-34v341H-40Z" fill="url(#chaeun-dot-fine)" />
      </g>
      <g color="var(--color-celadon)" opacity="0.86">
        <path d="M-20 695c156-106 298-96 431 3 106 78 231 87 380 47v185H-20Z" fill="url(#chaeun-dot-soft)" />
        <path d="M283 584c16 44 1 91-13 134-13 40 6 85 13 125 7 38-4 66-26 96h94c-20-28-27-57-20-89 8-40 31-77 18-121-15-48-24-98-3-145Z" fill="var(--color-paper)" />
      </g>
      <path d="M535 870c-53-178-62-336-39-483 18-114 24-221-30-298" fill="none" stroke="var(--color-terracotta)" strokeWidth="26" strokeLinecap="round" />
      <path d="M509 375c-79-83-133-91-193-62M522 274c53-70 97-94 153-82M500 167c-43-45-90-58-145-34M529 466c55-56 111-69 170-45" fill="none" stroke="var(--color-terracotta)" strokeWidth="12" strokeLinecap="round" />
      <g fill="var(--color-pine)">
        <path d="M314 96c74-70 167-51 209 49-55 33-144 29-209-49Z" />
        <path d="M378 198c77-75 168-56 214 42-61 35-153 31-214-42Z" />
        <path d="M510 118c69-57 142-34 174 37-55 26-127 18-174-37Z" />
        <path d="M598 310c59-49 124-31 151 29-47 27-111 22-151-29Z" />
        <path d="M284 284c64-49 133-28 164 41-53 27-118 19-164-41Z" />
        <path d="M538 412c70-55 142-31 175 39-58 29-131 20-175-39Z" />
      </g>
      <g color="var(--color-paper)" opacity="0.45">
        <path d="M314 96c74-70 167-51 209 49-55 33-144 29-209-49Z" fill="url(#chaeun-dot-fine)" />
        <path d="M378 198c77-75 168-56 214 42-61 35-153 31-214-42Z" fill="url(#chaeun-dot-fine)" />
        <path d="M510 118c69-57 142-34 174 37-55 26-127 18-174-37Z" fill="url(#chaeun-dot-fine)" />
      </g>
    </svg>
  );
}
