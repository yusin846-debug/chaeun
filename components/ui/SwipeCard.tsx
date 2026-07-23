"use client";

import { motion, PanInfo } from "motion/react";
import { TasteOption } from "@/lib/content";

const ART_STYLE: Record<string, { image: string; position: string; size?: string }> = {
  dotted: { image: "/images/chaeun-style-collection.png", position: "0% 0%", size: "200% 200%" },
  ink: { image: "/images/chaeun-style-collection.png", position: "100% 0%", size: "200% 200%" },
  modern: { image: "/images/chaeun-style-collection.png", position: "0% 100%", size: "200% 200%" },
  oil: { image: "/images/chaeun-style-collection.png", position: "100% 100%", size: "200% 200%" },
  photo: { image: "/images/chaeun-hero-landscape.png", position: "75% center" },
  watercolor: { image: "/images/chaeun-style-collection.png", position: "100% 100%", size: "200% 200%" },
  warm: { image: "/images/chaeun-style-collection.png", position: "100% 100%", size: "200% 200%" },
  cool: { image: "/images/chaeun-hero-landscape.png", position: "75% center" },
};

interface SwipeCardProps {
  option: TasteOption;
  onSelect: () => void;
}

export function SwipeCard({ option, onSelect }: SwipeCardProps) {
  const art = ART_STYLE[option.id];
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      drag="x"
      dragElastic={0.5}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 80) onSelect();
      }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.15 }}
      className="relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden rounded-3xl border border-mist p-4 text-left shadow-sm"
      style={{
        backgroundImage: `url(${art.image})`,
        backgroundPosition: art.position,
        backgroundSize: art.size ?? "cover",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
      <div className="relative rounded-2xl border border-paper/40 bg-paper/92 px-3 py-2 backdrop-blur-sm">
        <p className="text-base font-semibold text-ink">{option.label}</p>
        <p className="text-xs text-ink/60">{option.sub}</p>
      </div>
    </motion.button>
  );
}

interface TasteRoundCardProps {
  prompt: string;
  options: TasteOption[];
  onAnswer: (id: string) => void;
}

export function TasteRoundCard({
  prompt,
  options,
  onAnswer,
}: TasteRoundCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <p className="text-center font-heading text-lg font-medium text-ink">
        {prompt}
      </p>
      <div className="grid w-full grid-cols-2 gap-4">
        {options.map((opt) => (
          <SwipeCard key={opt.id} option={opt} onSelect={() => onAnswer(opt.id)} />
        ))}
      </div>
      <p className="text-xs text-ink/40">마음에 드는 카드를 탭하거나, 옆으로 밀어보세요</p>
    </div>
  );
}
