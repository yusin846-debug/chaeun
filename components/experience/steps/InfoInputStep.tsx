"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { RollingPicker } from "@/components/ui/RollingPicker";
import { TasteRoundCard } from "@/components/ui/SwipeCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { BackButton } from "@/components/ui/BackButton";
import { SpaceIcon } from "@/components/ui/SpaceIcons";
import { SPACES, TASTE_ROUNDS } from "@/lib/content";
import { useExperienceStore } from "@/lib/store";

const YEARS = Array.from({ length: 87 }, (_, i) => 1940 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const HOURS = Array.from({ length: 24 }, (_, i) => i);

interface InfoInputStepProps {
  onComplete: () => void;
}

export function InfoInputStep({ onComplete }: InfoInputStepProps) {
  const [phase, setPhase] = useState<"space" | "taste" | "birth">("space");
  const birthInfo = useExperienceStore((s) => s.birthInfo);
  const setBirthInfo = useExperienceStore((s) => s.setBirthInfo);
  const space = useExperienceStore((s) => s.product.space);
  const setSpace = useExperienceStore((s) => s.setSpace);
  const tasteRoundIndex = useExperienceStore((s) => s.tasteRoundIndex);
  const answerTaste = useExperienceStore((s) => s.answerTaste);
  const previousTaste = useExperienceStore((s) => s.previousTaste);
  const goTo = useExperienceStore((s) => s.goTo);

  const handleAnswer = (id: string) => {
    answerTaste(id);
    if (tasteRoundIndex + 1 >= TASTE_ROUNDS.length) {
      setTimeout(() => setPhase("birth"), 400);
    }
  };

  const handleBack = () => {
    if (phase === "birth") {
      previousTaste();
      setPhase("taste");
    } else if (phase === "taste") {
      if (tasteRoundIndex > 0) {
        previousTaste();
      } else {
        setPhase("space");
      }
    } else {
      goTo("landing");
    }
  };

  const spaceImage: Record<string, string> = {
    living: "/images/chaeun-showroom.png",
    bedroom: "/images/space-bedroom.png",
    entrance: "/images/chaeun-objects-collection.png",
    study: "/images/space-study.png",
  };

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-8 px-6 py-16">
      <BackButton onClick={handleBack} />
      <AnimatePresence mode="wait">
        {phase === "space" ? (
          <motion.div
            key="space"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="flex w-full max-w-md flex-col items-center gap-8"
          >
            <div className="text-center">
              <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-pine">01 · YOUR SPACE</p>
              <h2 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.03em] text-ink">어느 공간을 위한<br />풍경인가요?</h2>
              <p className="mt-3 text-sm leading-6 text-ink/55">작품이 머무를 장소부터 알려주세요.</p>
            </div>
            <div className="grid w-full grid-cols-2 gap-3">
              {SPACES.map((item) => {
                const active = space === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSpace(item.id)}
                    className={`relative flex min-h-44 flex-col items-start justify-end overflow-hidden rounded-3xl border p-5 text-left transition-colors ${active ? "border-pine text-pine" : "border-mist text-ink hover:border-pine/45"}`}
                  >
                    <Image src={spaceImage[item.id]} alt="" fill className="object-cover" />
                    <div className="absolute inset-0 bg-paper/65" />
                    <div className="relative">
                      <SpaceIcon id={item.id} className="h-6 w-6 stroke-[1.5]" />
                      <span className="mt-5 block text-base font-semibold">{item.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-ink/65">{item.intro}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <PrimaryButton disabled={!space} onClick={() => setPhase("taste")} className="w-full max-w-sm">이 공간의 풍경 고르기</PrimaryButton>
          </motion.div>
        ) : phase === "taste" ? (
          <motion.div
            key="taste"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="flex w-full max-w-sm flex-col items-center gap-6"
          >
            <div className="text-center">
              <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-pine">02 · YOUR TASTE</p>
              <p className="mt-2 text-sm text-ink/55">취향이 작품의 결을 완성합니다.</p>
            </div>
            <div className="flex gap-1.5">
              {TASTE_ROUNDS.map((round, i) => (
                <span
                  key={round.id}
                  className={`h-1.5 w-6 rounded-full transition-colors duration-200 ${
                    i <= tasteRoundIndex ? "bg-pine" : "bg-mist"
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
        ) : (
          <motion.div
            key="birth"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="flex w-full max-w-sm flex-col items-center gap-8"
          >
            <div className="text-center">
              <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-pine">03 · YOUR FLOW</p>
              <h2 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.03em] text-ink">태어난 순간을<br />알려주세요</h2>
              <p className="mt-3 text-xs leading-5 text-ink/50">당신에게 어울리는 풍경의 흐름을 살피는 데만 사용해요.</p>
            </div>
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
            <PrimaryButton onClick={onComplete} className="w-full">
              내 풍경 만나기
            </PrimaryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
