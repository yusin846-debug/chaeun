"use client";

import { motion } from "motion/react";
import { SPACES, STRUCTURES, SpaceId, StructureId } from "@/lib/content";
import { SpaceIcon } from "./SpaceIcons";

interface SpaceSelectorProps {
  space: SpaceId | null;
  structure: StructureId | null;
  onSelectSpace: (id: SpaceId) => void;
  onSelectStructure: (id: StructureId) => void;
}

export function SpaceSelector({
  space,
  structure,
  onSelectSpace,
  onSelectStructure,
}: SpaceSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium text-ink/50">어느 공간에 걸어둘까요</span>
        <div className="grid grid-cols-4 gap-2">
          {SPACES.map((s) => {
            const active = space === s.id;
            return (
              <motion.button
                key={s.id}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => onSelectSpace(s.id)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 transition-colors duration-150 ${
                  active
                    ? "border-celadon bg-celadon/10 text-celadon"
                    : "border-ink/10 bg-cream text-ink/70 hover:border-ink/20"
                }`}
              >
                <SpaceIcon id={s.id} className="h-5 w-5" />
                <span className="text-[11px] font-medium">{s.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium text-ink/50">집 구조는요</span>
        <div className="flex gap-2">
          {STRUCTURES.map((s) => {
            const active = structure === s.id;
            return (
              <motion.button
                key={s.id}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => onSelectStructure(s.id)}
                className={`flex-1 rounded-full border px-3 py-2 text-xs font-medium transition-colors duration-150 ${
                  active
                    ? "border-celadon bg-celadon text-cream"
                    : "border-ink/10 bg-cream text-ink/70 hover:border-ink/20"
                }`}
              >
                {s.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
