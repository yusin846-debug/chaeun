"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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

const energies = [
  { key: "wood", ko: "목", title: "성장의 기운", copy: "소나무의 생명력을 서재와 거실에 두어 새로운 시작을 북돋습니다." },
  { key: "water", ko: "수", title: "순환의 기운", copy: "물과 안개의 흐름으로 막힌 마음을 풀고 공간에 여유를 더합니다." },
  { key: "earth", ko: "토", title: "안정의 기운", copy: "산과 돌의 중심을 생활의 자리에 들여 편안한 균형을 만듭니다." },
  { key: "fire", ko: "화", title: "온기의 기운", copy: "해와 따뜻한 색을 더해 관계와 일상에 생기를 불러옵니다." },
  { key: "metal", ko: "금", title: "정돈의 기운", copy: "맑은 빛과 단정한 여백으로 집중과 결실의 흐름을 돕습니다." },
];

export function HomePage() {
  const filmRef = useRef<HTMLElement>(null);
  const [energy, setEnergy] = useState(0);
  const { scrollYProgress } = useScroll({ target: filmRef, offset: ["start end", "end start"] });
  const filmScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.02, 1.12]);
  const filmRadius = useTransform(scrollYProgress, [0, 0.45], [36, 0]);

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
          <Link className="text-link" href="#film">CHAEUN을 경험하기 <span>↓</span></Link>
        </motion.div>
        <span className="hero-index">01 — FLOW</span>
      </section>

      <section id="film" ref={filmRef} className="film-section">
        <div className="section-intro">
          <span>02 — THE STORY</span>
          <h2>좋은 터에서 시작된<br />하나의 풍경</h2>
        </div>
        <motion.div className="film-frame" style={{ scale: filmScale, borderRadius: filmRadius }}>
          <video autoPlay muted loop playsInline preload="metadata" poster="/images/chaeun-hero-landscape.png" aria-label="한국의 자연과 CHAEUN 풍경 작품이 공간으로 이어지는 브랜드 영상">
            <source src="/videos/chaeun-flow.mp4" type="video/mp4" />
          </video>
          <div className="film-overlay">
            <p>산이 품고, 물이 흐르고,<br />바람이 머무는 곳.</p>
            <Link href="/brand">브랜드 이야기 보기 <span>↗</span></Link>
          </div>
        </motion.div>
      </section>

      <section className="collection-section" aria-labelledby="collection-title">
        <div className="section-intro">
          <span>03 — FOR YOUR SPACE</span>
          <h2 id="collection-title">풍경에서 오브제까지,<br />일상을 채우는 방법</h2>
          <p>화면 속 풍경을 작품과 선물, 오래 곁에 둘 오브제로 이어갑니다.</p>
        </div>
        <div className="collection-track no-scrollbar">
          {collection.map((item, index) => (
            <article className="collection-card" key={item.title}>
              <div className="collection-image">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 78vw, 42vw" />
              </div>
              <div><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.caption}</p></div>
            </article>
          ))}
        </div>
        <p className="swipe-hint">옆으로 넘겨 둘러보세요 <span>→</span></p>
      </section>

      <section className="lifestyle-section">
        <div className="lifestyle-image">
          <Image src="/images/home-lifestyle-living.png" alt="햇살 드는 거실에서 CHAEUN 작품과 함께 쉬는 사람" fill sizes="100vw" />
        </div>
        <div className="lifestyle-copy">
          <span>04 — A BETTER RHYTHM</span>
          <h2>좋은 공간은<br />하루의 리듬을 바꿉니다.</h2>
          <p>그림을 바라보는 짧은 순간, 방 안에 흐르는 빛과 바람, 조금 더 편안해진 마음. CHAEUN은 작품보다 그 작품과 함께 살아갈 시간을 먼저 생각합니다.</p>
          <Link className="outline-link" href="/store">공간별 풍경 둘러보기</Link>
        </div>
      </section>

      <section className="energy-section" aria-labelledby="energy-title">
        <div className="section-intro">
          <span>05 — YOUR ENERGY</span>
          <h2 id="energy-title">나에게 필요한 기운이<br />공간에 머무는 방식</h2>
          <p>사주는 사람의 흐름을 읽고, 풍수는 공간의 흐름을 만듭니다. CHAEUN은 둘을 당신의 미감에 맞는 풍경으로 연결합니다.</p>
        </div>
        <div className="energy-stage">
          <Image src="/images/home-flow-house.png" alt="산과 물 사이의 집으로 다섯 기운이 흘러드는 점묘 일러스트" fill sizes="100vw" />
          <div className="energy-note" aria-live="polite">
            <span>{energies[energy].ko}</span>
            <h3>{energies[energy].title}</h3>
            <p>{energies[energy].copy}</p>
          </div>
        </div>
        <div className="energy-tabs" role="tablist" aria-label="오행의 기운">
          {energies.map((item, index) => (
            <button key={item.key} role="tab" aria-selected={energy === index} onClick={() => setEnergy(index)}>
              <span>{item.ko}</span>{item.title.replace("의 기운", "")}
            </button>
          ))}
        </div>
        <div className="energy-cta">
          <p>당신의 공간에는<br />어떤 풍경이 필요할까요?</p>
          <Link href="/create" className="primary-link">나의 풍경 만들기 <span>↗</span></Link>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-mark"><BrandMark /><p>좋은 터에서 발견한 흐름을<br />당신의 취향으로 그려 공간에 채웁니다.</p></div>
        <nav aria-label="하단 메뉴">
          <Link href="/brand">Brand</Link><Link href="/store">Collection</Link><Link href="/create">Create</Link>
        </nav>
        <div className="footer-bottom"><span>© 2026 CHAEUN</span><span>SEOUL · KOREA</span><span>Fill Your Space.</span></div>
      </footer>
    </main>
  );
}
