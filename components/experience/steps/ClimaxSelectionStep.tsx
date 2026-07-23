"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { RevealImage } from "@/components/ui/RevealImage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Card } from "@/components/ui/Card";
import { OHAENG, RESULT_TIERS, ResultTier } from "@/lib/content";
import { useExperienceStore } from "@/lib/store";

interface ClimaxSelectionStepProps {
  onSelect: (tier: ResultTier) => void;
}

export function ClimaxSelectionStep({ onSelect }: ClimaxSelectionStepProps) {
  const [selectedTier, setSelectedTier] = useState<ResultTier | null>(null);
  const resultRevealed = useExperienceStore((s) => s.resultRevealed);
  const revealResult = useExperienceStore((s) => s.revealResult);
  const missingOhaeng = useExperienceStore((s) => s.missingOhaeng);
  const ohaeng = OHAENG[missingOhaeng()];

  return (
    <div className="flex min-h-svh flex-col items-center gap-8 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <span
          className="text-xs font-medium tracking-[0.15em]"
          style={{ color: ohaeng.color }}
        >
          당신에게 부족한 기운은 {ohaeng.label}({ohaeng.hanja})
        </span>
        <h2 className="max-w-xs font-heading text-xl font-semibold text-ink">
          {ohaeng.landscape}
        </h2>
      </div>

      <RevealImage
        accent={ohaeng.color}
        revealed={resultRevealed}
        onReveal={revealResult}
        tier={selectedTier}
      />

      {resultRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex w-full max-w-sm flex-col gap-3"
        >
          <p className="text-center text-xs text-ink/40">
            골라보면 위 미리보기가 그대로 바뀌어요
          </p>
          {RESULT_TIERS.map((tier) => {
            const active = selectedTier === tier.id;
            return (
              <motion.button
                key={tier.id}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.15 }}
                onClick={() => setSelectedTier(tier.id)}
                className="w-full text-left"
              >
                <Card
                  className={`flex items-center justify-between px-4 py-3.5 transition-all duration-150 ${
                    active
                      ? "border-celadon bg-celadon/10 shadow-md"
                      : "hover:shadow-md"
                  }`}
                >
                  <div>
                    <p
                      className={`text-sm font-semibold ${active ? "text-celadon" : "text-ink"}`}
                    >
                      {tier.label}
                    </p>
                    <p className="text-xs text-ink/50">{tier.sub}</p>
                  </div>
                  <span className={active ? "text-celadon" : "text-ink/30"}>
                    {active ? "✓" : "→"}
                  </span>
                </Card>
              </motion.button>
            );
          })}

          {selectedTier && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-2"
            >
              <PrimaryButton
                className="w-full"
                onClick={() => onSelect(selectedTier)}
              >
                이걸로 계속하기
              </PrimaryButton>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
