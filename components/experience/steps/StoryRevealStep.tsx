"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { OhaengWheel } from "@/components/ui/OhaengWheel";
import { OHAENG, getStoryLines } from "@/lib/content";
import { useExperienceStore } from "@/lib/store";

interface StoryRevealStepProps {
  onComplete: () => void;
}

const SYNERGY_LINE_INDEX = 4;

export function StoryRevealStep({ onComplete }: StoryRevealStepProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const missingOhaeng = useExperienceStore((s) => s.missingOhaeng);
  const ohaengId = missingOhaeng();
  const ohaeng = OHAENG[ohaengId];
  const lines = useMemo(() => getStoryLines(ohaengId), [ohaengId]);

  useEffect(() => {
    if (visibleCount >= lines.length) {
      const t = setTimeout(onComplete, 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 1150);
    return () => clearTimeout(t);
  }, [visibleCount, lines.length, onComplete]);

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden px-6 py-16 text-center">
      <HalftoneBackground accent={ohaeng.color} />

      <div className="relative z-10">
        <OhaengWheel
          highlight={ohaengId}
          revealConnection={visibleCount > SYNERGY_LINE_INDEX}
          size={180}
        />
      </div>

      <div className="relative z-10 flex max-w-sm flex-col gap-3">
        {lines.slice(0, visibleCount).map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: i === visibleCount - 1 ? 1 : 0.32,
              y: 0,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-base leading-relaxed text-ink sm:text-lg"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
