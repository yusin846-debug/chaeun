"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { NatureIcon, type NatureIconName } from "@/components/ui/NatureIcons";
import { BrandMark } from "@/components/ui/BrandMark";

const orbitItems: { name: NatureIconName; label: string }[] = [
  { name: "mountain", label: "Mountain" },
  { name: "waterfall", label: "Water" },
  { name: "wind", label: "Wind" },
  { name: "pine", label: "Pine" },
  { name: "sun", label: "Sun" },
  { name: "stone", label: "Stone" },
  { name: "balance", label: "Balance" },
];

const collection = [
  { title: "나의 풍경", caption: "손안에서 만나는 개인의 흐름", image: "/images/chaeun-style-collection.png" },
  { title: "공간의 작품", caption: "빛과 여백을 완성하는 한 점", image: "/images/space-study.png" },
  { title: "마음을 담은 선물", caption: "좋은 기운을 건네는 방식", image: "/images/home-collection.png" },
  { title: "곁에 두는 오브제", caption: "청자의 빛으로 이어지는 풍경", image: "/images/chaeun-objects-collection.png" },
  { title: "고요한 침실", caption: "평온이 오래 머무는 자리", image: "/images/space-bedroom.png" },
];

export function HomePage() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const moveSlider = (direction: number) => sliderRef.current?.scrollBy({ left: direction * Math.min(window.innerWidth * 0.72, 620), behavior: "smooth" });

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
          <p className="eyebrow">SAJU · PUNGSU · ART</p>
          <h1 id="hero-title">좋은 흐름을<br />당신의 공간에.</h1>
          <p>사주의 흐름을 읽고, 풍수의 원리를 담아<br className="hidden sm:block" /> 복이 머무는 하나의 풍경을 그립니다.</p>
          <Link className="text-link" href="#collection">CHAEUN을 경험하기 <span>↓</span></Link>
        </motion.div>
        <span className="hero-index">01 — FLOW</span>
      </section>

      <section id="collection" className="collection-section" aria-labelledby="collection-title">
        <div className="section-intro">
          <span>02 — FOR YOUR SPACE</span>
          <h2 id="collection-title">큰 결정을 하는 사람들은<br />왜 벽의 풍경을 고를까요?</h2>
          <p>오래전부터 집과 집무실의 그림은 단순한 장식이 아니었습니다. 산은 든든한 배경을, 물은 막힘없는 순환을, 소나무는 오래가는 성장을 상징했습니다.</p>
        </div>
        <div className="fortune-story">
          <p>성공한 이들이 중요한 공간에 작품을 신중히 두는 이유도 여기에 있습니다. 매일 시선이 머무는 풍경이 마음의 방향을 다듬고, 공간의 인상과 기운을 결정한다고 믿기 때문입니다.</p>
          <p>CHAEUN은 그 오래된 풍수의 지혜를 오늘의 미감으로 번역합니다. 당신의 사주에 필요한 흐름을 읽고, 살아갈 공간에 어울리는 한 점의 풍경으로 완성합니다.</p>
        </div>
      </section>

      <section className="lifestyle-section">
        <div className="lifestyle-image">
          <Image src="/images/home-lifestyle-living.png" alt="햇살 드는 거실에서 CHAEUN 작품과 함께 쉬는 사람" fill sizes="100vw" />
        </div>
        <div className="lifestyle-copy">
          <span>03 — A BETTER RHYTHM</span>
          <h2>좋은 공간은<br />하루의 리듬을 바꿉니다.</h2>
          <p>그림을 바라보는 짧은 순간, 방 안에 흐르는 빛과 바람, 조금 더 편안해진 마음. CHAEUN은 작품보다 그 작품과 함께 살아갈 시간을 먼저 생각합니다.</p>
        </div>
        <Link className="lifestyle-link" href="/store">공간별 풍경 둘러보기 <span>↗</span></Link>
      </section>

      <section className="slider-section" aria-labelledby="slider-title">
        <div className="section-intro">
          <span>04 — THE COLLECTION</span>
          <h2 id="slider-title">풍경에서 오브제까지,<br />일상을 채우는 방법</h2>
        </div>
        <div className="slider-controls">
          <button onClick={() => moveSlider(-1)} aria-label="이전 컬렉션">←</button>
          <button onClick={() => moveSlider(1)} aria-label="다음 컬렉션">→</button>
        </div>
        <div ref={sliderRef} className="collection-track no-scrollbar">
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

      <footer className="site-footer">
        <Image src="/images/chaeun-hero-landscape.png" alt="" fill sizes="100vw" />
        <div className="footer-content">
          <p>사주의 흐름을 읽고, 풍수의 원리를 담아<br />당신만의 풍경을 완성합니다.</p>
          <BrandMark />
          <Link href="/create">나의 풍경 만들기 <span>→</span></Link>
          <div className="footer-bottom"><span>© 2026 CHAEUN</span><nav aria-label="하단 메뉴"><Link href="/brand">Brand</Link><Link href="/store">Collection</Link></nav></div>
        </div>
      </footer>
    </main>
  );
}
