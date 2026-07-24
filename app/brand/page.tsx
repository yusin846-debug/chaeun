import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { OhaengWheel } from "@/components/ui/OhaengWheel";

export const metadata: Metadata = {
  title: "브랜드 이야기 — 채운",
  description: "채운이라는 이름의 의미와 오행 철학, 만드는 방식에 대한 이야기.",
};

const nameCards = [
  { label: "FLOW", body: "공간과 마음에 자연스럽게 스미는 흐름", bg: "/images/name-flow-bg.png" },
  { label: "NATURE", body: "소나무, 물, 빛에서 찾은 편안한 균형", bg: "/images/name-nature-bg.png" },
  { label: "PERSONAL", body: "나와 내 공간을 위한 단 하나의 풍경", bg: "/images/name-personal-bg.png" },
];

export default function BrandPage() {
  return (
    <div>
      <section className="px-6 pb-24 pt-32 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="max-w-lg">
            <h2 className="font-heading text-2xl font-bold leading-[1.3] tracking-[-0.02em] text-ink sm:text-3xl lg:text-4xl">
              좋은 흐름이<br />풍경이 되는 순간
            </h2>
          </ScrollReveal>
          <div className="mt-9 grid gap-10 sm:grid-cols-2">
            <p className="text-sm leading-[1.85] text-ink/60">채운은 고객의 개성 있는 취향과 라이프스타일을 존중합니다. 사주에서 읽은 흐름과 풍수의 원리가 결합된 풍경은, 단순히 걸어두는 그림을 넘어 공간에 새로운 기운을 불어넣는 존재감을 지닙니다.</p>
            <p className="text-sm leading-[1.85] text-ink/60">채운에서 완성하는 풍경은 저마다 다른 결과 색을 지닙니다. 매일의 삶 속에서 당신이 더 편안한 하루를 보낼 수 있도록, 개인의 흐름과 공간의 분위기를 살펴 늘 새로운 제안을 드립니다.</p>
          </div>
          <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-3xl bg-pine shadow-sm">
            <video className="block h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/images/chaeun-showroom.png">
              <source src="/videos/chaeun-brand-film.mp4#t=0.1" type="video/mp4" />
            </video>
            <Image src="/images/chaeun-logo-official-transparent.png" alt="CHAEUN" width={120} height={40} className="absolute bottom-4 right-5 h-10 w-auto object-contain opacity-90" />
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 pt-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-lg">
            <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-terracotta">THE NAME</p>
            <h2 className="mt-4 font-heading text-2xl font-semibold leading-[1.4] tracking-[-0.02em] text-ink sm:text-3xl">
              &lsquo;채우다&rsquo;와 &lsquo;채운(彩雲)&rsquo;,<br />두 개의 흐름이 만난 이름입니다.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {nameCards.map((card) => (
              <div key={card.label} className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-sm">
                <Image src={card.bg} alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-pine/0 from-40% to-pine/75" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p className="text-[0.68rem] font-bold tracking-[0.16em] text-paper">{card.label}</p>
                  <p className="mt-2.5 font-heading text-base leading-[1.55] text-paper">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-mist bg-[#efebe0] px-6 py-20 text-ink sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-[0.9fr_1.1fr] sm:items-end">
          <ScrollReveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-terracotta">OUR APPROACH</p>
            <h2 className="mt-4 font-heading text-2xl font-semibold leading-[1.4] tracking-[-0.02em]">운세를 말하기보다,<br />당신의 공간을 읽습니다.</h2>
          </ScrollReveal>
          <ScrollReveal className="max-w-md">
            <p className="text-base leading-[1.85] text-ink/60">획일적인 행운의 상징 대신, 공간의 용도와 취향, 당신의 흐름을 함께 살핍니다. 그 결과는 설명이 아니라 오래 곁에 둘 수 있는 작품이어야 한다고 믿습니다.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-9 px-6 py-28 text-center">
        <ScrollReveal className="max-w-xs">
          <p className="font-heading text-xl font-semibold leading-[1.7] text-ink">
            오행은 서로를 낳고, 서로를 채워요
          </p>
        </ScrollReveal>
        <OhaengWheel showCycleArrows revealConnection={false} size={280} />
        <ScrollReveal className="max-w-md">
          <p className="text-sm leading-[1.85] text-ink/60">
            목(木)은 화(火)를, 화는 토(土)를, 토는 금(金)을, 금은 수(水)를, 수는 다시
            목을 낳아요. 당신에게 부족한 기운을 찾고, 그 기운을 낳아주는 이웃 오행과
            함께 풍경을 완성해요.
          </p>
        </ScrollReveal>
      </section>

      <section className="flex flex-col items-center gap-7 px-6 pb-28 text-center">
        <div>
          <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-terracotta">SHOWROOM</p>
          <h2 className="mt-4 font-heading text-xl font-semibold text-ink sm:text-2xl">공간에 놓인 채운의 풍경</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-[1.85] text-ink/60">사주에서 부족한 오행을 찾아 보완하면, 그 자리에서 새로운 흐름이 시작됩니다. 매일 눈길이 머무는 벽 하나가, 당신의 공간에 좋은 운을 조용히 채워갑니다.</p>
        </div>
        <div className="relative aspect-[16/8] w-full max-w-5xl overflow-hidden rounded-3xl shadow-sm">
          <Image src="/images/chaeun-showroom.png" alt="채운 작품이 놓인 거실 쇼룸" fill className="object-cover" />
        </div>
      </section>

      <section className="relative flex flex-col items-center justify-center gap-6 overflow-hidden px-6 py-28 text-center">
        <HalftoneBackground accent="var(--color-oheng-wood)" className="opacity-45" />
        <div className="relative max-w-xl">
          <ScrollReveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-terracotta">FROM IMAGE TO OBJECT</p>
            <h2 className="mt-4 font-heading text-2xl font-semibold leading-[1.4] tracking-[-0.02em] text-ink sm:text-3xl">디지털 풍경은 작품이 되고,<br />국내 제작으로 공간에 머뭅니다.</h2>
          </ScrollReveal>
          <ScrollReveal className="mt-5">
            <p className="mx-auto max-w-lg text-sm leading-[1.8] text-ink/60">AI는 개인화된 이미지를 만드는 도구일 뿐입니다. 실물 작품은 편백나무·캔버스·한지처럼 시간이 지날수록 좋아지는 소재와 국내 제작 파트너의 손길로 완성합니다.</p>
          </ScrollReveal>
        </div>
        <Link href="/create" className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full bg-pine px-7 py-4 text-sm font-semibold text-paper transition-transform duration-200 hover:scale-[1.03]">내 풍경 만들기</Link>
      </section>
    </div>
  );
}
