"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RollingPicker } from "@/components/ui/RollingPicker";
import { SwipeCard } from "@/components/ui/SwipeCard";
import { ElementIcon } from "@/components/ui/ElementIcons";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { BackButton } from "@/components/ui/BackButton";
import { OHAENG, STYLE_SWATCH, TASTE_ROUNDS } from "@/lib/content";
import { useExperienceStore } from "@/lib/store";

const YEARS = Array.from({ length: 87 }, (_, i) => 1940 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const HOUR_VALUES = [-1, ...Array.from({ length: 24 }, (_, i) => i)];

interface InfoInputStepProps {
  onComplete: () => void;
}

export function InfoInputStep({ onComplete }: InfoInputStepProps) {
  const [phase, setPhase] = useState<"birth" | "taste">("birth");
  const [customScene, setCustomScene] = useState("");
  const birthInfo = useExperienceStore((s) => s.birthInfo);
  const setBirthInfo = useExperienceStore((s) => s.setBirthInfo);
  const gender = useExperienceStore((s) => s.gender);
  const setGender = useExperienceStore((s) => s.setGender);
  const tasteRoundIndex = useExperienceStore((s) => s.tasteRoundIndex);
  const answerTaste = useExperienceStore((s) => s.answerTaste);
  const previousTaste = useExperienceStore((s) => s.previousTaste);
  const goTo = useExperienceStore((s) => s.goTo);

  const handleAnswer = (id: string) => {
    answerTaste(id);
    setCustomScene("");
    if (tasteRoundIndex + 1 >= TASTE_ROUNDS.length) {
      onComplete();
    }
  };

  const submitCustomScene = () => {
    if (customScene.trim()) handleAnswer(`custom:${customScene.trim()}`);
  };

  const handleBack = () => {
    if (phase === "taste") {
      if (tasteRoundIndex > 0) {
        previousTaste();
      } else {
        setPhase("birth");
      }
    } else {
      goTo("landing");
    }
  };

  const round = TASTE_ROUNDS[tasteRoundIndex];

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-8 px-6 py-16">
      <BackButton onClick={handleBack} />
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
            <div className="text-center">
              <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-terracotta">STEP 1 · 사주</p>
              <h2 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.03em] text-ink">운명의 결이 흐르기 시작한<br />당신의 출생 순간을 알려주세요.</h2>
              <p className="mt-3 text-sm leading-6 text-ink/55">생년월일과 시간을 바탕으로 당신에게 필요한 오행의 기운을 찾아드려요.</p>
            </div>

            <div className="flex w-full flex-col gap-2 border-t border-mist pt-5">
              <span className="text-xs font-bold tracking-[0.1em] text-ink">생년월일</span>
              <div className="flex justify-center gap-1">
                <RollingPicker label="년" values={YEARS} value={birthInfo.year} onChange={(v) => setBirthInfo({ year: v })} />
                <RollingPicker label="월" values={MONTHS} value={birthInfo.month} onChange={(v) => setBirthInfo({ month: v })} />
                <RollingPicker label="일" values={DAYS} value={birthInfo.day} onChange={(v) => setBirthInfo({ day: v })} />
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 border-t border-mist pt-5">
              <span className="text-xs font-bold tracking-[0.1em] text-ink">태어난 시각 <span className="font-normal text-ink/40">모르면 &apos;모름&apos;에 맞춰두세요</span></span>
              <div className="flex justify-center">
                <RollingPicker
                  label="시각"
                  values={HOUR_VALUES}
                  value={birthInfo.hour}
                  onChange={(v) => setBirthInfo({ hour: v })}
                  formatItem={(v) => (v === -1 ? "모름" : `${v}시`)}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 border-t border-mist pt-5">
              <span className="text-xs font-bold tracking-[0.1em] text-ink">성별</span>
              <div className="flex gap-2">
                {[{ id: "f" as const, label: "여성" }, { id: "m" as const, label: "남성" }].map((g) => {
                  const active = gender === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGender(g.id)}
                      className={`min-h-12 flex-1 rounded-xl border text-sm font-semibold transition-colors ${active ? "border-pine bg-pine text-paper" : "border-mist bg-paper text-pine"}`}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <PrimaryButton disabled={!gender} onClick={() => setPhase("taste")} className="w-full">다음</PrimaryButton>
          </motion.div>
        ) : (
          <motion.div
            key="taste"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="flex w-full max-w-sm flex-col items-center gap-6 text-center"
          >
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-terracotta">STEP 2 · 취향 · {tasteRoundIndex + 1}/{TASTE_ROUNDS.length}</p>
              <h2 className="mt-3 whitespace-pre-line font-heading text-xl font-semibold leading-[1.5] tracking-[-0.03em] text-ink">{round.question}</h2>
            </div>
            <div className="flex gap-1.5">
              {TASTE_ROUNDS.map((r, i) => (
                <span key={r.id} className={`h-1.5 w-6 rounded-full transition-colors duration-200 ${i <= tasteRoundIndex ? "bg-pine" : "bg-mist"}`} />
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
                {round.kind === "swipe" && (
                  <div className="grid grid-cols-2 gap-4">
                    {round.options.map((opt) => (
                      <SwipeCard key={opt.id} option={opt} onSelect={() => handleAnswer(opt.id)} />
                    ))}
                  </div>
                )}

                {round.kind === "icons" && (
                  <div className="flex flex-wrap justify-center gap-3.5">
                    {round.options.map((opt) => {
                      const color = OHAENG[opt.id].color;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleAnswer(opt.id)}
                          className="flex w-24 flex-col items-center gap-3 rounded-3xl border border-mist bg-paper px-2.5 py-5 transition-transform hover:-translate-y-1"
                        >
                          <div
                            className="grid h-[52px] w-[52px] place-items-center rounded-full"
                            style={{ backgroundColor: `color-mix(in srgb, ${color} 16%, var(--color-paper))` }}
                          >
                            <ElementIcon id={opt.id} className="h-[26px] w-[26px]" style={{ color }} />
                          </div>
                          <span className="text-[11px] font-bold tracking-[0.04em]" style={{ color }}>{opt.hanja}</span>
                          <span className="whitespace-nowrap text-[13px] font-semibold text-ink">{opt.material}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {round.kind === "gallery" && (
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-3.5">
                      {round.options.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleAnswer(opt.id)}
                          className="relative aspect-square overflow-hidden rounded-[18px] shadow-sm transition-transform hover:scale-[1.03]"
                          style={{ backgroundImage: `url(${opt.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 from-55% to-transparent" />
                          <span className="absolute inset-x-3 bottom-3 text-left text-[13px] font-semibold leading-[1.3] text-paper">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-mist bg-paper py-1.5 pl-4 pr-1.5">
                      <input
                        value={customScene}
                        onChange={(e) => setCustomScene(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submitCustomScene()}
                        type="text"
                        placeholder="기타: 마음속 장면을 직접 적어주세요"
                        className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none"
                      />
                      <PrimaryButton
                        onClick={submitCustomScene}
                        disabled={!customScene.trim()}
                        className="min-h-10 flex-none px-4 py-0 text-[13px]"
                      >
                        선택
                      </PrimaryButton>
                    </div>
                  </div>
                )}

                {round.kind === "style" && (
                  <div className="grid grid-cols-2 gap-3">
                    {round.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleAnswer(opt.id)}
                        className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm transition-transform hover:-translate-y-1"
                        style={{ background: STYLE_SWATCH[opt.id] }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 from-45% to-transparent" />
                        <div className="absolute inset-x-3.5 bottom-3 text-left">
                          <p className="text-[15px] font-bold text-paper">{opt.label}</p>
                          <p className="mt-0.5 text-[11px] leading-[1.4] text-paper/85">{opt.sub}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <p className="text-xs text-ink/40">
              {round.kind === "swipe" && "카드를 좌우로 밀거나 탭해서 골라주세요"}
              {round.kind === "icons" && "가장 마음이 끌리는 소재를 골라주세요"}
              {round.kind === "gallery" && "이미지를 고르거나, 직접 적어주세요"}
              {round.kind === "style" && "마음에 드는 화풍을 골라주세요"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
