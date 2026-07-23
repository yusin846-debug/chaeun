"use client";

import { CSSProperties } from "react";
import { motion, PanInfo } from "motion/react";
import { TasteOption, TastePattern } from "@/lib/content";

const PATTERN_STYLE: Record<TastePattern, CSSProperties> = {
  dots: {
    backgroundImage:
      "radial-gradient(circle, rgba(44,44,42,0.28) 1px, transparent 1.3px)",
    backgroundSize: "7px 7px",
  },
  grid: {
    backgroundImage:
      "linear-gradient(rgba(44,44,42,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(44,44,42,0.18) 1px, transparent 1px)",
    backgroundSize: "10px 10px",
  },
  plain: {},
};

interface SwipeCardProps {
  option: TasteOption;
  onSelect: () => void;
}

export function SwipeCard({ option, onSelect }: SwipeCardProps) {
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
      className="relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden rounded-2xl border border-ink/10 p-4 text-left shadow-sm"
      style={{ backgroundImage: option.gradient }}
    >
      <div
        className="absolute inset-0"
        style={PATTERN_STYLE[option.pattern ?? "plain"]}
      />
      <div className="relative rounded-xl bg-cream/85 px-3 py-2 backdrop-blur-sm">
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
