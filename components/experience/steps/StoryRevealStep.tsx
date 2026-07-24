"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getStoryLineColors, getStoryLines } from "@/lib/content";
import { useExperienceStore } from "@/lib/store";

interface StoryRevealStepProps {
  onComplete: () => void;
}

function readDuration(text: string) {
  return Math.min(3400, Math.max(1500, 700 + text.replace(/\n/g, "").length * 55));
}

export function StoryRevealStep({ onComplete }: StoryRevealStepProps) {
  const [index, setIndex] = useState(0);
  const missingOhaeng = useExperienceStore((s) => s.missingOhaeng);
  const ohaengId = missingOhaeng();
  const lines = useMemo(() => getStoryLines(ohaengId), [ohaengId]);
  const colors = useMemo(() => getStoryLineColors(ohaengId), [ohaengId]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (index + 1 >= lines.length) {
        setTimeout(onComplete, 1400);
      } else {
        setIndex((i) => i + 1);
      }
    }, readDuration(lines[index]));
    return () => clearTimeout(t);
  }, [index, lines, onComplete]);

  return (
    <div className="story-reveal">
      <div className="story-glow" style={{ background: `radial-gradient(circle, ${colors[index]} 0%, transparent 70%)` }} />

      <div className="relative max-w-lg text-center">
        <p className="text-[0.68rem] font-bold tracking-[0.28em] text-paper/50">READING YOUR FLOW</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-6 flex min-h-[120px] items-center justify-center whitespace-pre-line font-heading text-lg font-semibold leading-[1.7] text-paper sm:text-xl"
          >
            {lines[index]}
          </motion.p>
        </AnimatePresence>

        <div className="mt-10 flex justify-center gap-2">
          {lines.map((line, i) => (
            <span
              key={line}
              className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
              style={{ background: i <= index ? colors[i] : "rgba(246,244,238,.25)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
