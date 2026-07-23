"use client";

import { motion } from "motion/react";

export interface SelectorOption {
  id: string;
  label: string;
  sub: string;
}

interface OptionSelectorProps {
  label: string;
  options: SelectorOption[];
  selected: string | string[];
  onToggle: (id: string) => void;
  multiple?: boolean;
  columns?: number;
}

export function OptionSelector({
  label,
  options,
  selected,
  onToggle,
  multiple = false,
  columns,
}: OptionSelectorProps) {
  const isSelected = (id: string) =>
    multiple ? (selected as string[]).includes(id) : selected === id;

  const gridCols = columns ?? Math.min(options.length, 3);

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium text-ink/50">{label}</span>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
      >
        {options.map((opt) => {
          const active = isSelected(opt.id);
          return (
            <motion.button
              key={opt.id}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggle(opt.id)}
              className={`flex flex-col items-start gap-0.5 rounded-xl border px-3 py-2.5 text-left transition-colors duration-150 ${
                active
                  ? "border-celadon bg-celadon/10"
                  : "border-ink/10 bg-cream hover:border-ink/20"
              }`}
            >
              <span
                className={`text-sm font-semibold ${active ? "text-celadon" : "text-ink"}`}
              >
                {opt.label}
              </span>
              <span className="text-[11px] text-ink/50">{opt.sub}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
