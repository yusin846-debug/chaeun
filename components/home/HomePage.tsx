"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { NatureIcon, type NatureIconName } from "@/components/ui/NatureIcons";
import { BrandMark } from "@/components/ui/BrandMark";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";

const orbitItems: { name: NatureIconName; label: string }[] = [
  { name: "mountain", label: "Mountain" },
  { name: "waterfall", label: "Water" },
  { name: "wind", label: "Wind" },
  { name: "pine", label: "Pine" },
  { name: "sun", label: "Sun" },
  { name: "stone", label: "Stone" },
  { name: "balance", label: "Balance" },
];

const heroBadges = [
  {
    key: "saju",
    radius: "58% 42% 46% 54% / 48% 56% 44% 52%",
    color: "var(--color-terracotta)",
    label: "SAJU",
    sub: "사주",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <circle cx="13" cy="13" r="9.5" fill="none" stroke="var(--color-terracotta)" strokeWidth="1.4" />
        <path d="M13 13V7M13 13l4 3" fill="none" stroke="var(--color-terracotta)" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="13" cy="2.4" r="1.1" fill="var(--color-terracotta)" />
        <circle cx="23.6" cy="13" r="1.1" fill="var(--color-terracotta)" />
        <circle cx="13" cy="23.6" r="1.1" fill="var(--color-terracotta)" />
        <circle cx="2.4" cy="13" r="1.1" fill="var(--color-terracotta)" />
      </svg>
    ),
  },
  {
    key: "pungsu",
    radius: "44% 56% 58% 42% / 56% 46% 54% 44%",
    color: "var(--color-pine)",
    label: "PUNGSU",
    sub: "풍수지리",
    icon: (
      <svg width="28" height="26" viewBox="0 0 28 26" aria-hidden="true">
        <path d="M2 22 11 8l4 6 2-3 9 11H2Z" fill="none" stroke="var(--color-pine)" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M6.5 13.5 8.5 15l2-2" fill="none" stroke="var(--color-pine)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "art",
    radius: "52% 48% 42% 58% / 44% 52% 58% 46%",
    color: "var(--color-celadon)",
    label: "ART",
    sub: "미감",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <path d="M6 20c0-8 3-15 10-16 4.5-.6 8 2.4 6.8 6.4-.8 2.6-3.4 3.6-5.6 2.4-1.6-.9-1.8-3 .2-3.4" fill="none" stroke="var(--color-celadon)" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="6" cy="21.2" r="1.6" fill="var(--color-celadon)" />
      </svg>
    ),
  },
];

const collection = [
  { title: "나의 풍경", caption: "손안에서 만나는 개인의 흐름", image: "/images/my-landscape-set.png" },
  { title: "공간의 작품", caption: "빛과 여백을 완성하는 한 점", image: "/images/space-artwork-new.png" },
  { title: "마음을 담은 선물", caption: "좋은 기운을 건네는 방식", image: "/images/home-collection.png" },
  { title: "곁에 두는 오브제", caption: "청자의 빛으로 이어지는 풍경", image: "/images/ceramic-jar.png" },
  { title: "고요한 침실", caption: "평온이 오래 머무는 자리", image: "/images/space-bedroom.png" },
];

export function HomePage() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const whySectionRef = useRef<HTMLDivElement>(null);
  const houseIconRef = useRef<HTMLDivElement>(null);
  const frameIconRef = useRef<HTMLDivElement>(null);

  const moveSlider = (direction: number) =>
    sliderRef.current?.scrollBy({ left: direction * Math.min(window.innerWidth * 0.72, 620), behavior: "smooth" });

  useEffect(() => {
    const bounceKeyframes: Keyframe[] = [
      { transform: "scale(1) rotate(0deg)" },
      { transform: "scale(1.4) rotate(-8deg)" },
      { transform: "scale(.88) rotate(5deg)" },
      { transform: "scale(1.15) rotate(-3deg)" },
      { transform: "scale(1) rotate(0deg)" },
    ];
    const section = whySectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          houseIconRef.current?.animate(bounceKeyframes, { duration: 800, easing: "cubic-bezier(.34,1.4,.64,1)" });
          setTimeout(() => {
            frameIconRef.current?.animate(bounceKeyframes, { duration: 800, easing: "cubic-bezier(.34,1.4,.64,1)" });
          }, 130);
          io.disconnect();
        });
      },
      { threshold: 0.15 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const el = sliderRef.current;
      if (!el || isPausedRef.current) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: Math.min(window.innerWidth * 0.72, 620), behavior: "smooth" });
      }
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="overflow-x-clip">
      <section className="hero-orbit" aria-labelledby="hero-title">
        <div className="orbit-field" aria-hidden="true">
          {orbitItems.map((item, index) => (
            <motion.div
              className="orbit-item"
              key={item.label}
              style={{
                "--x": `${50 + Math.cos((Math.PI * 2 * index) / orbitItems.length) * 47}%`,
                "--y": `${50 + Math.sin((Math.PI * 2 * index) / orbitItems.length) * 47}%`,
              } as React.CSSProperties}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.13, duration: 0.7 }}
            >
              <NatureIcon name={item.name} />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div className="hero-badges">
            {heroBadges.map((badge) => (
              <div className="hero-badge" key={badge.key}>
                <div className="hero-badge-shape" style={{ borderRadius: badge.radius }}>
                  {badge.icon}
                </div>
                <span style={{ color: badge.color }}>
                  {badge.label}
                  <br />
                  <span className="hero-badge-sub">{badge.sub}</span>
                </span>
              </div>
            ))}
          </div>
          <p className="eyebrow">SAJU · PUNGSU · ART</p>
          <h1 id="hero-title">좋은 흐름을<br />당신의 공간에.</h1>
          <p>사주의 흐름을 읽고, 풍수의 원리를 담아<br className="hidden sm:block" /> 복이 머무는 하나의 풍경을 그립니다.</p>
          <Link className="text-link" href="#collection">CHAEUN을 경험하기 <span>↓</span></Link>
        </motion.div>
        <span className="hero-index">01 — FLOW</span>
      </section>

      <section id="collection" className="collection-section" aria-labelledby="collection-title" ref={whySectionRef}>
        <div className="why-row">
          <div className="why-icon" ref={houseIconRef}>
            <Image src="/images/icon-house.png" alt="집 아이콘" width={88} height={88} />
          </div>
          <div className="section-intro" style={{ padding: 0, margin: 0 }}>
            <span>02 — FOR YOUR SPACE</span>
            <h2 id="collection-title">이사한 새집에,<br />왜 그림 한 점부터 걸까요?</h2>
            <p>대기업 총수의 집무실에도, 갓 이사한 신혼집에도 그림 한 점은 늘 신중하게 골라집니다. 매일 눈에 담는 풍경이 그 사람의 하루를, 나아가 삶의 방향을 조용히 바꿔놓기 때문이에요.</p>
          </div>
          <div className="why-icon" ref={frameIconRef} style={{ animationDelay: ".2s" }}>
            <Image src="/images/icon-frame-v2.png" alt="그림 아이콘" width={88} height={88} />
          </div>
        </div>
        <div className="fortune-story">
          <p>나에게 맞는 그림은 단순한 취향의 문제가 아니에요. 내 기운의 결을 알고 고른 풍경은, 눈이 마주칠 때마다 마음을 편안하게 다독이고 흔들리는 날엔 중심을 잡아줍니다.</p>
          <p>CHAEUN은 당신의 사주에서 읽은 흐름을 그림으로 옮겨요. 그렇게 완성된 한 점은 오래 곁에 두어도 질리지 않고, 살아가는 동안 좋은 기운을 은은하게 채워줍니다.</p>
        </div>
      </section>

      <section className="lifestyle-section">
        <div className="lifestyle-image">
          <Image src="/images/home-lifestyle-living.png" alt="햇살 드는 거실에서 CHAEUN 작품과 함께 쉬는 사람" fill sizes="100vw" style={{ transform: "scaleX(-1)" }} />
        </div>
        <div className="lifestyle-copy">
          <span className="lifestyle-label">
            <svg width="30" height="20" viewBox="0 0 30 20" aria-hidden="true">
              <path d="M2 16 Q15 2 28 16" fill="none" stroke="rgba(246,244,238,.4)" strokeWidth="1.5" />
              <circle r="3" fill="var(--color-terracotta)">
                <animateMotion dur="4.5s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" path="M2 16 Q15 2 28 16" />
              </circle>
            </svg>
            03 — A BETTER RHYTHM
          </span>
          <h2>좋은 공간은<br />하루의 리듬을 바꿉니다.</h2>
          <p>그림을 바라보는 짧은 순간, 방 안에 흐르는 빛과 바람, 조금 더 편안해진 마음. CHAEUN은 작품보다 그 작품과 함께 살아갈 시간을 먼저 생각합니다.</p>
        </div>
        <Link className="lifestyle-link" href="/store">공간별 풍경 둘러보기 <span>↗</span></Link>
      </section>

      <section className="slider-section" aria-labelledby="slider-title">
        <div className="section-intro" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", maxWidth: 1280, textAlign: "left", padding: "0 1.5rem 2.5rem", margin: "0 auto" }}>
          <div>
            <span>04 — THE COLLECTION</span>
            <h2 id="slider-title" style={{ margin: "1rem 0 0" }}>풍경에서 오브제까지,<br />일상을 채우는 방법</h2>
          </div>
        </div>
        <div className="slider-controls">
          <button onClick={() => moveSlider(-1)} aria-label="이전 컬렉션">←</button>
          <button onClick={() => moveSlider(1)} aria-label="다음 컬렉션">→</button>
        </div>
        <div
          ref={sliderRef}
          onMouseEnter={() => (isPausedRef.current = true)}
          onMouseLeave={() => (isPausedRef.current = false)}
          onTouchStart={() => (isPausedRef.current = true)}
          className="collection-track no-scrollbar"
        >
          {collection.map((item, index) => (
            <article className="collection-card" key={item.title}>
              <div className="collection-image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 82vw, 42vw" /></div>
              <div><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.caption}</p></div>
            </article>
          ))}
        </div>
        <div className="energy-cta">
          <p>당신의 공간에는<br />어떤 풍경이 필요할까요?</p>
          <Link href="/create" className="primary-link">나의 풍경 만들기 <span>↗</span></Link>
        </div>
      </section>

      <section className="brand-teaser">
        <div className="brand-teaser-inner">
          <p className="brand-teaser-eyebrow">彩雲 · 채우다</p>
          <p className="brand-teaser-copy">채운은 &lsquo;채우다&rsquo;와 동양화 속 길조를 뜻하는 &lsquo;채운(彩雲)&rsquo;의 발음을 겹친 이름이에요.</p>
          <div className="brand-teaser-image">
            <Image src="/images/meaning-icons-v2.png" alt="Flow(흐름), Energy(기운), Nature(자연)" width={420} height={210} />
          </div>
          <Link href="/brand" className="brand-teaser-link">브랜드 이야기 더 보기 →</Link>
        </div>
      </section>

      <section className="ignite-cta">
        <HalftoneBackground accent="var(--color-terracotta)" className="opacity-50" />
        <div className="ignite-glow" aria-hidden="true" />
        <div className="ember" style={{ left: "44%", bottom: "18%", animationDelay: "0s", animationDuration: "4.5s" }} aria-hidden="true" />
        <div className="ember" style={{ left: "52%", bottom: "14%", animationDelay: "1.2s", animationDuration: "5.2s", background: "var(--color-gold)" }} aria-hidden="true" />
        <div className="ember" style={{ left: "48%", bottom: "22%", animationDelay: "2.4s", animationDuration: "4.8s" }} aria-hidden="true" />
        <div className="ember" style={{ left: "58%", bottom: "16%", animationDelay: ".6s", animationDuration: "5.6s", background: "var(--color-gold)" }} aria-hidden="true" />
        <p className="ignite-copy">그림 한 점, 당신의 기운을 채우다</p>
        <Link href="/create" className="ignite-link">내 기운 채우러 가기</Link>
      </section>

      <footer className="site-footer">
        <HalftoneBackground accent="var(--color-paper)" className="opacity-10" />
        <div className="footer-grid">
          <div>
            <BrandMark compact light />
            <p>사주의 흐름을 읽고, 풍수의 원리를 담아<br />당신만의 풍경을 완성합니다.</p>
            <Link href="/create" className="footer-cta">나의 풍경 만들기 →</Link>
          </div>
          <div className="footer-nav">
            <div>
              <p className="footer-nav-label">EXPLORE</p>
              <Link href="/brand">브랜드 이야기</Link>
              <Link href="/store">스토어</Link>
              <Link href="/create">나의 풍경 만들기</Link>
            </div>
            <div>
              <p className="footer-nav-label">CONTACT</p>
              <a href="#">카카오톡 채널</a>
              <a href="#">인스타그램</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 CHAEUN</span>
          <nav aria-label="하단 메뉴"><Link href="/brand">Brand</Link><Link href="/store">Collection</Link></nav>
        </div>
      </footer>
    </main>
  );
}
