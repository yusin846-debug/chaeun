import Link from "next/link";
import type { Metadata } from "next";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { OhaengWheel } from "@/components/ui/OhaengWheel";

export const metadata: Metadata = {
  title: "브랜드 이야기 — 채운",
  description: "채운이라는 이름의 의미와 오행 철학, 만드는 방식에 대한 이야기.",
};

export default function BrandPage() {
  return (
    <div>
      <section className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
        <HalftoneBackground />
        <div className="relative z-10 flex max-w-md flex-col items-center gap-4">
          <span className="text-xs font-medium tracking-[0.2em] text-celadon">
            BRAND STORY
          </span>
          <h1 className="font-heading text-3xl font-bold leading-snug text-ink">
            채운, 彩雲
          </h1>
          <p className="text-sm leading-relaxed text-ink/60">
            그림 한 점, 당신의 기운을 채우다
          </p>
        </div>
      </section>

      <section className="relative flex min-h-[70svh] flex-col items-center justify-center gap-6 px-6 text-center">
        <ScrollReveal className="max-w-md">
          <p className="font-heading text-xl font-semibold leading-relaxed text-ink">
            &lsquo;채우다&rsquo;와 &lsquo;채운(彩雲)&rsquo;,
            <br />두 발음을 겹쳐 지은 이름이에요
          </p>
        </ScrollReveal>
        <ScrollReveal className="max-w-sm">
          <p className="text-sm leading-relaxed text-ink/55">
            채운(彩雲)은 동양화에서 길조를 상징하는 채색 구름을 뜻해요. 부족한 기운을
            채운다는 뜻의 &lsquo;채우다&rsquo;와 발음이 겹치죠. 사용자의 사주를 분석해
            부족한 오행을 찾고, 그 기운을 채우는 풍경을 그려드려요.
          </p>
        </ScrollReveal>
      </section>

      <section className="relative flex min-h-[70svh] flex-col items-center justify-center gap-6 px-6 text-center">
        <ScrollReveal className="max-w-md">
          <p className="font-heading text-xl font-semibold leading-relaxed text-ink">
            기존 풍수 인테리어 시장엔
            <br />
            빈 자리가 있었어요
          </p>
        </ScrollReveal>
        <ScrollReveal className="max-w-sm">
          <p className="text-sm leading-relaxed text-ink/55">
            한쪽엔 해바라기·돈나무 같은 획일화된 저가 템플릿 그림이, 반대쪽엔 가격이
            비공개인 고가의 1:1 컨설팅이 있었어요. 그 사이, &lsquo;합리적인 가격의
            맞춤형 상품&rsquo;이라는 공백을 자동화된 개인화 파이프라인으로 채웠어요.
          </p>
        </ScrollReveal>
      </section>

      <section className="relative flex min-h-[85svh] flex-col items-center justify-center gap-8 px-6 text-center">
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

      <section className="relative flex min-h-[70svh] flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
        <HalftoneBackground accent="var(--color-oheng-wood)" />
        <ScrollReveal className="relative z-10 max-w-md">
          <p className="font-heading text-xl font-semibold leading-relaxed text-ink">
            그림은 AI가, 액자는 국내 장인이
          </p>
        </ScrollReveal>
        <ScrollReveal className="relative z-10 max-w-sm">
          <p className="text-sm leading-relaxed text-ink/55">
            이미지는 AI로 빠르게 생성해 합리적인 가격을 만들고, 실물 액자와 굿즈는
            국내 제작 파트너와 함께 편백나무·캔버스·한지 같은 소재로 정성껏
            완성해요.
          </p>
        </ScrollReveal>
        <Link
          href="/"
          className="relative z-10 rounded-full bg-celadon px-6 py-3 text-sm font-medium text-cream shadow-sm transition-transform hover:scale-[1.02]"
        >
          내 기운 채우러 가기
        </Link>
      </section>
    </div>
  );
}
