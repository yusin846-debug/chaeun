"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RollingPicker } from "@/components/ui/RollingPicker";
import { TasteRoundCard } from "@/components/ui/SwipeCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TASTE_ROUNDS } from "@/lib/content";
import { useExperienceStore } from "@/lib/store";

const YEARS = Array.from({ length: 87 }, (_, i) => 1940 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const HOURS = Array.from({ length: 24 }, (_, i) => i);

interface InfoInputStepProps {
  onComplete: () => void;
}

export function InfoInputStep({ onComplete }: InfoInputStepProps) {
  const [phase, setPhase] = useState<"birth" | "taste">("birth");
  const birthInfo = useExperienceStore((s) => s.birthInfo);
  const setBirthInfo = useExperienceStore((s) => s.setBirthInfo);
  const tasteRoundIndex = useExperienceStore((s) => s.tasteRoundIndex);
  const answerTaste = useExperienceStore((s) => s.answerTaste);

  const handleAnswer = (id: string) => {
    answerTaste(id);
    if (tasteRoundIndex + 1 >= TASTE_ROUNDS.length) {
      setTimeout(onComplete, 400);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 py-16">
      <AnimatePresence mode="wait">
        {phase === "birth" ? (
          <motion.div
            key="birth"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="flex w-full max-w-sm flex-col items-center gap-8"
          >
            <h2 className="font-heading text-xl font-semibold text-ink">
              태어난 순간을 알려주세요
            </h2>
            <div className="flex justify-center gap-1">
              <RollingPicker
                label="년"
                values={YEARS}
                value={birthInfo.year}
                onChange={(v) => setBirthInfo({ year: v })}
              />
              <RollingPicker
                label="월"
                values={MONTHS}
                value={birthInfo.month}
                onChange={(v) => setBirthInfo({ month: v })}
              />
              <RollingPicker
                label="일"
                values={DAYS}
                value={birthInfo.day}
                onChange={(v) => setBirthInfo({ day: v })}
              />
              <RollingPicker
                label="시"
                values={HOURS}
                value={birthInfo.hour}
                onChange={(v) => setBirthInfo({ hour: v })}
                formatItem={(v) => `${v}시`}
              />
            </div>
            <PrimaryButton onClick={() => setPhase("taste")} className="px-8">
              다음
            </PrimaryButton>
          </motion.div>
        ) : (
          <motion.div
            key="taste"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="flex w-full max-w-sm flex-col items-center gap-6"
          >
            <div className="flex gap-1.5">
              {TASTE_ROUNDS.map((round, i) => (
                <span
                  key={round.id}
                  className={`h-1.5 w-6 rounded-full transition-colors duration-200 ${
                    i <= tasteRoundIndex ? "bg-celadon" : "bg-ink/10"
                  }`}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tasteRoundIndex}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {tasteRoundIndex < TASTE_ROUNDS.length && (
                  <TasteRoundCard
                    prompt={TASTE_ROUNDS[tasteRoundIndex].prompt}
                    options={TASTE_ROUNDS[tasteRoundIndex].options}
                    onAnswer={handleAnswer}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
