"use client";

import { motion, PanInfo } from "motion/react";
import { SwipeTasteOption } from "@/lib/content";

interface SwipeCardProps {
  option: SwipeTasteOption;
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
      className="relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden rounded-3xl border border-mist p-4 text-left shadow-sm"
      style={{
        backgroundImage: `url(${option.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
      <div className="relative rounded-2xl border border-paper/40 bg-paper/92 px-3 py-2 backdrop-blur-sm">
        <p className="text-base font-semibold text-ink">{option.label}</p>
      </div>
    </motion.button>
  );
}
