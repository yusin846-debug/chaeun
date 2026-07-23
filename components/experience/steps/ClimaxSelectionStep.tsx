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
    <div className="min-h-svh px-6 pb-16 pt-28 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(300px,0.9fr)_minmax(360px,1fr)] lg:items-center lg:gap-20">
        <div className="order-2 flex flex-col items-center lg:order-1">
          <div className="mb-4 w-full max-w-xs text-left text-[0.65rem] font-semibold tracking-[0.18em] text-pine">CHAEUN PERSONAL LANDSCAPE · 01</div>
          <RevealImage accent={ohaeng.color} revealed={resultRevealed} onReveal={revealResult} tier={selectedTier} />
          {!resultRevealed && <p className="mt-4 text-xs text-ink/45">안개가 걷히면, 당신의 풍경이 드러납니다.</p>}
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-[0.68rem] font-semibold tracking-[0.2em]" style={{ color: ohaeng.color }}>
            YOUR FLOW · {ohaeng.label.toUpperCase()} {ohaeng.hanja}
          </span>
          <h2 className="mt-4 max-w-md font-heading text-3xl font-semibold leading-[1.35] tracking-[-0.04em] text-ink sm:text-4xl">
            {resultRevealed ? <>당신의 공간을 위한<br />{ohaeng.landscape}</> : <>당신에게 어울리는<br />풍경을 펼쳐볼까요?</>}
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-ink/60">{resultRevealed ? `${ohaeng.mood}을 담은 풍경입니다. ${ohaeng.wallHint}에 두면 공간과 하루의 리듬이 더 편안해질 수 있어요.` : "공간과 취향, 태어난 순간의 흐름을 조용히 엮어 한 점의 작품을 만들었습니다."}</p>

          {resultRevealed && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-8 flex flex-col gap-3">
              <Card className="grid grid-cols-[5rem_1fr] gap-4 px-5 py-4">
                <p className="text-xs font-medium text-pine">추천 위치</p>
                <p className="text-sm leading-6 text-ink/70">{ohaeng.wallHint}</p>
              </Card>
              <Card className="grid grid-cols-[5rem_1fr] gap-4 px-5 py-4">
                <p className="text-xs font-medium text-pine">작품의 결</p>
                <p className="text-sm leading-6 text-ink/70">{ohaeng.mood}</p>
              </Card>

              <div className="mt-4">
                <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-ink/45">HOW WOULD YOU LIKE TO KEEP IT?</p>
                <div className="mt-3 flex flex-col gap-2">
                  {RESULT_TIERS.map((tier) => {
                    const active = selectedTier === tier.id;
                    return (
                      <motion.button key={tier.id} whileTap={{ scale: 0.98 }} onClick={() => setSelectedTier(tier.id)} className="w-full text-left">
                        <Card className={`flex items-center justify-between px-5 py-4 transition-colors ${active ? "border-pine bg-pine/5" : "hover:border-pine/40"}`}>
                          <div>
                            <p className={`text-sm font-semibold ${active ? "text-pine" : "text-ink"}`}>{tier.label}</p>
                            <p className="mt-0.5 text-xs text-ink/50">{tier.sub}</p>
                          </div>
                          <div className="ml-3 flex shrink-0 flex-col items-end gap-1">
                            <span className={`text-xs font-semibold ${active ? "text-pine" : "text-ink/65"}`}>{tier.price}</span>
                            <span className={active ? "text-pine" : "text-ink/30"}>{active ? "✓" : "→"}</span>
                          </div>
                        </Card>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {selectedTier && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="pt-2"><PrimaryButton className="w-full" onClick={() => onSelect(selectedTier)}>이 작품을 공간에 들이기</PrimaryButton></motion.div>}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
