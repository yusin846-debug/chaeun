import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { OhaengWheel } from "@/components/ui/OhaengWheel";
import { BrandMark } from "@/components/ui/BrandMark";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "브랜드 이야기 — 채운",
  description: "채운이라는 이름의 의미와 오행 철학, 만드는 방식에 대한 이야기.",
};

export default function BrandPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-24">
        <HalftoneBackground accent="var(--color-celadon)" className="opacity-35" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="max-w-lg">
            <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-pine">BRAND STORY · 01</p>
            <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.25] tracking-[-0.04em] text-ink sm:text-5xl">
              풍경으로,
              <br />공간의 결을 채우다.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-ink/65 sm:text-base">
              채운은 개인의 흐름과 공간의 분위기를 한 점의 풍경으로 번역하는 한국적 라이프스타일 브랜드입니다.
            </p>
            <div className="mt-9"><BrandMark /></div>
          </div>
          <div className="gallery-shadow mx-auto w-full max-w-[510px] overflow-hidden rounded-[2rem] border border-mist/80 bg-paper p-3 sm:p-5">
            <Image src="/images/chaeun-hero-landscape.png" alt="소나무와 안개가 깃든 채운의 풍경 작품" width={1536} height={1024} className="aspect-[3/2] w-full rounded-[1.4rem] object-cover" />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-xl">
            <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-pine">THE NAME</p>
            <h2 className="mt-5 font-heading text-3xl font-semibold leading-[1.4] tracking-[-0.03em] text-ink">
              &lsquo;채우다&rsquo;와 &lsquo;채운(彩雲)&rsquo;,
              <br />두 개의 흐름이 만난 이름입니다.
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["FLOW", "공간과 마음에 자연스럽게 스미는 흐름"],
              ["NATURE", "소나무, 물, 빛에서 찾은 편안한 균형"],
              ["PERSONAL", "나와 내 공간을 위한 단 하나의 풍경"],
            ].map(([label, body]) => (
              <Card key={label} className="min-h-44 p-7">
                <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-pine">{label}</p>
                <p className="mt-7 font-heading text-lg leading-7 text-ink">{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-mist bg-paper px-6 py-20 text-ink sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <ScrollReveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-pine">OUR APPROACH</p>
            <h2 className="mt-5 font-heading text-3xl font-semibold leading-[1.4] tracking-[-0.03em]">운세를 말하기보다,<br />당신의 공간을 읽습니다.</h2>
          </ScrollReveal>
          <ScrollReveal className="max-w-xl">
            <p className="text-sm leading-7 text-ink/65 sm:text-base">획일적인 행운의 상징 대신, 공간의 용도와 취향, 당신의 흐름을 함께 살핍니다. 그 결과는 설명이 아니라 오래 곁에 둘 수 있는 작품이어야 한다고 믿습니다.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative flex min-h-[80svh] flex-col items-center justify-center gap-8 px-6 text-center">
        <ScrollReveal className="max-w-md">
          <p className="font-heading text-xl font-semibold leading-relaxed text-ink">
            오행은 서로를 낳고, 서로를 채워요
          </p>
        </ScrollReveal>
        <OhaengWheel size={220} />
        <ScrollReveal className="max-w-sm">
          <p className="text-sm leading-relaxed text-ink/55">
            목(木)은 화(火)를, 화는 토(土)를, 토는 금(金)을, 금은 수(水)를, 수는 다시
            목을 낳아요. 당신에게 부족한 기운을 찾고, 그 기운을 낳아주는 이웃 오행과
            함께 풍경을 완성해요.
          </p>
        </ScrollReveal>
      </section>

      <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <HalftoneBackground accent="var(--color-oheng-wood)" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <ScrollReveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-pine">FROM IMAGE TO OBJECT</p>
            <h2 className="mt-5 font-heading text-3xl font-semibold leading-[1.4] tracking-[-0.03em] text-ink">디지털 풍경은 작품이 되고,<br />국내 제작으로 공간에 머뭅니다.</h2>
          </ScrollReveal>
          <ScrollReveal className="mt-6 max-w-xl">
            <p className="text-sm leading-7 text-ink/60">AI는 개인화된 이미지를 만드는 도구일 뿐입니다. 실물 작품은 편백나무·캔버스·한지처럼 시간이 지날수록 좋아지는 소재와 국내 제작 파트너의 손길로 완성합니다.</p>
          </ScrollReveal>
          <Link href="/" className="mt-9 rounded-full bg-pine px-7 py-4 text-sm font-medium text-paper transition-transform duration-200 hover:scale-[1.02]">내 풍경 만들기</Link>
        </div>
      </section>
    </div>
  );
}
