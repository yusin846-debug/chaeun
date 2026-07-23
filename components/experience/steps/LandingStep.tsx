"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { FloatingHalftoneCard } from "@/components/ui/FloatingHalftoneCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

interface LandingStepProps {
  onStart: () => void;
}

const FLOATING_CARDS = [
  { top: "8%", left: "6%", rotate: -12, speed: 60, gradient: "var(--color-oheng-wood)", dotted: true },
  { top: "14%", left: "78%", rotate: 10, speed: -50, gradient: "var(--color-oheng-fire)" },
  { top: "62%", left: "10%", rotate: 8, speed: -70, gradient: "var(--color-oheng-water)", dotted: true },
  { top: "70%", left: "82%", rotate: -8, speed: 55, gradient: "var(--color-oheng-metal)" },
  { top: "36%", left: "4%", rotate: 5, speed: 40, gradient: "var(--color-terracotta)" },
  { top: "4%", left: "42%", rotate: -6, speed: -35, gradient: "var(--color-oheng-earth)" },
  { top: "82%", left: "45%", rotate: 12, speed: 30, gradient: "var(--color-celadon)", dotted: true },
];

export function LandingStep({ onStart }: LandingStepProps) {
  return (
    <div>
      <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
        <HalftoneBackground />
        {FLOATING_CARDS.map((card, i) => (
          <FloatingHalftoneCard
            key={i}
            gradient={card.gradient}
            rotate={card.rotate}
            speed={card.speed}
            dotted={card.dotted}
            style={{ top: card.top, left: card.left }}
            className="hidden sm:block"
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex max-w-sm flex-col items-center gap-6"
        >
          <span className="text-xs font-medium tracking-[0.2em] text-celadon">
            CHAEUN 彩雲
          </span>
          <h1 className="font-heading text-3xl font-bold leading-snug text-ink">
            내 방엔, 내게 필요한
            <br />
            기운이 비어있다
          </h1>
          <p className="text-sm leading-relaxed text-ink/60">
            사주로 부족한 오행을 찾고, 풍수로 채우는
            <br />단 하나뿐인 맞춤 풍경.
          </p>
          <PrimaryButton onClick={onStart} className="mt-2 px-8 py-3.5 text-base">
            내 기운 채우러 가기
          </PrimaryButton>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-8 text-ink/30"
        >
          ⌄
        </motion.div>
      </section>

      <section className="relative flex min-h-[70svh] flex-col items-center justify-center gap-6 px-6 text-center">
        <ScrollReveal className="max-w-md">
          <p className="font-heading text-2xl font-semibold leading-relaxed text-ink">
            누구나 다른 사주를 갖고 태어나지만,
            <br />
            걸어놓은 그림은 다 똑같다.
          </p>
        </ScrollReveal>
        <ScrollReveal className="max-w-sm">
          <p className="text-sm leading-relaxed text-ink/55">
            해바라기, 돈나무 그림은 누구의 방에나 걸려있어요. 정작 이 방에, 지금 당신에게
            필요한 기운이 무엇인지는 아무도 물어보지 않았죠.
          </p>
        </ScrollReveal>
      </section>

      <section className="relative flex min-h-[70svh] flex-col items-center justify-center gap-5 px-6 text-center">
        <ScrollReveal className="max-w-sm">
          <p className="text-xs font-medium tracking-[0.15em] text-celadon">
            彩雲 · 채우다
          </p>
          <p className="mt-3 font-heading text-xl font-semibold leading-relaxed text-ink">
            채운은 &lsquo;채우다&rsquo;와 동양화 속 길조를 뜻하는
            <br />
            &lsquo;채운(彩雲)&rsquo;의 발음을 겹친 이름이에요.
          </p>
        </ScrollReveal>
        <Link
          href="/brand"
          className="text-sm font-medium text-ink/60 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-celadon"
        >
          브랜드 이야기 더 보기 →
        </Link>
      </section>

      <section className="relative flex min-h-[60svh] flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
        <HalftoneBackground accent="var(--color-terracotta)" />
        <ScrollReveal className="relative z-10 flex flex-col items-center gap-5">
          <p className="max-w-xs font-heading text-xl font-semibold text-ink">
            그림 한 점, 당신의 기운을 채우다
          </p>
          <PrimaryButton onClick={onStart} className="px-8 py-3.5 text-base">
            내 기운 채우러 가기
          </PrimaryButton>
        </ScrollReveal>
      </section>
    </div>
  );
}
