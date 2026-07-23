"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { NatureIcon } from "@/components/ui/NatureIcons";

interface LandingStepProps {
  onStart: () => void;
}

export function LandingStep({ onStart }: LandingStepProps) {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 pb-14 pt-28 sm:px-10 lg:min-h-svh lg:px-16 lg:pb-20 lg:pt-32">
        <HalftoneBackground accent="var(--color-celadon)" className="opacity-40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-w-xl flex-col items-start"
          >
            <span className="mb-7 text-[0.68rem] font-semibold tracking-[0.22em] text-pine">CHAEUN · PERSONAL LANDSCAPE</span>
            <p className="font-logo text-lg tracking-[0.1em] text-ink/55">Fill Your Space.</p>
            <h1 className="mt-3 font-heading text-4xl font-semibold leading-[1.28] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
              당신의 공간에
              <br />
              좋은 흐름을 채웁니다.
            </h1>
            <p className="mt-7 max-w-md text-sm leading-7 text-ink/65 sm:text-base">
              공간과 취향, 그리고 당신만의 이야기를 담아 한 점의 풍경을 만듭니다.
              오래 바라볼수록 편안해지는 작품을 제안해요.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryButton onClick={onStart} className="px-7 text-base">내 풍경 만들기</PrimaryButton>
              <a href="#collection" className="inline-flex min-h-14 items-center justify-center rounded-full border border-mist bg-paper/70 px-7 text-sm font-medium text-ink transition-colors hover:bg-paper">작품 둘러보기</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="gallery-shadow relative mx-auto w-full max-w-[680px] overflow-hidden rounded-[2rem] border border-mist/80 bg-paper p-3 sm:p-5"
          >
            <Image src="/images/chaeun-hero-landscape.png" alt="소나무와 폭포가 어우러진 채운의 풍경 작품" width={1536} height={1024} priority className="aspect-[3/2] w-full rounded-[1.4rem] object-cover" />
            <div className="absolute bottom-8 left-8 rounded-full border border-paper/80 bg-paper/90 px-4 py-2 text-[0.68rem] font-medium tracking-[0.12em] text-pine backdrop-blur">THE FLOW OF WATER · 01</div>
          </motion.div>
        </div>
      </section>

      <section id="collection" className="relative flex min-h-[70svh] flex-col items-center justify-center gap-6 px-6 text-center">
        <ScrollReveal className="max-w-2xl">
          <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-pine">WHY A PERSONAL LANDSCAPE</p>
          <h2 className="mt-5 font-heading text-2xl font-semibold leading-[1.45] text-ink sm:text-3xl">사주에서 찾은 흐름을,<br />풍수의 언어로 공간에 놓습니다.</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-ink/60">나에게 부족한 기운과 공간의 쓰임, 그리고 좋아하는 풍경의 결을 함께 살펴 한 점의 작품으로 완성합니다.</p>
        </ScrollReveal>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-3">
          {[
            ["sun", "사주 흐름", "태어난 순간의 기운을 차분히 읽습니다."],
            ["waterfall", "공간의 방향", "머무는 공간에 어울리는 배치를 제안합니다."],
            ["pine", "나만의 풍경", "좋아하는 결을 담아 작품으로 완성합니다."],
          ].map(([icon, title, body]) => (
            <div key={title} className="rounded-3xl border border-mist bg-paper p-7 text-left">
              <NatureIcon name={icon as "sun" | "waterfall" | "pine"} className="h-8 w-8 text-pine" />
              <h3 className="mt-8 font-heading text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/60">{body}</p>
            </div>
          ))}
        </div>
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
